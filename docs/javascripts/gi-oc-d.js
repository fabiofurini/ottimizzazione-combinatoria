/* Laboratorio di «Problemi di ottimizzazione combinatoria / Combinatorial Optimization Problems»: lo zaino 0/1 (KP),
 * dalla forza bruta al rilassamento continuo (l'app dell'approssimazione è passata al modulo Algoritmi di
 * approssimazione, 2026-11-21).
 *
 *   oc-kp-enum     forza bruta: i 2^n sottoinsiemi dell'istanza di riferimento del capitolo «Knapsack problems»
 *                  (esempio 2.1: c = 9, p = (6, 5, 8, 9, 6, 7), w = (2, 3, 6, 7, 5, 9)) uno alla volta, in ordine
 *                  binario del vettore x; ammissibili, incumbent x̄, conteggio 2^n contro ammissibili, ± oggetti
 *   oc-kp-lp       rilassamento continuo LP_KP (capitolo «Formulations of knapsack problems», KP_ILP.tex): oggetti
 *                  per efficienza come barre larghe w_j e alte p_j/w_j, oggetto critico s tagliato da rc,
 *                  x̃(LP_KP), z(LP_KP), bound di Dantzig UB_D = ⌊z(LP_KP)⌋ e di Martello-Toth UB_MT = max{UB_0, UB_1}
 *
 * Gli oggetti si suppongono ordinati per efficienza non crescente, come nei capitoli: un'istanza scritta a mano o
 * casuale che non lo è viene rinumerata (a pari efficienza, l'indice più piccolo prima) e la nota lo dice.
 * I numeri sono esatti (frazioni di GI_MIP) e coincidono con quelli dei capitoli: verifica in Python nella
 * cartella di lavoro (check.py). Le funzioni di calcolo sono anche in window.GI_OC_D, per le prove.
 */
(function () {
  "use strict";
  const GI = window.GI, M = window.GI_MIP, O = window.GI_OC;
  const T = GI.T;
  const { PASSO, parPasso, vaiA, clamp, somma, lista, nuovoId, osservaDimensioni, dim, pix, disegno, daIndirizzo, chiedi, interi } = O;
  window.GI_RICETTE = window.GI_RICETTE || {};

  // =================================================================
  // 0. STRUMENTI COMUNI
  // =================================================================
  const copia = (E) => ({ p: E.p.slice(), w: E.w.slice(), c: E.c });
  /** gli oggetti rinumerati per efficienza non crescente (a pari efficienza, l'indice più piccolo prima) */
  function ordina(I) {
    const n = I.p.length, idx = [...Array(n).keys()].sort((i, j) => (I.p[j] * I.w[i] - I.p[i] * I.w[j]) || (i - j));
    return { p: idx.map((i) => I.p[i]), w: idx.map((i) => I.w[i]), c: I.c, orig: idx.map((i) => i + 1), cambiato: idx.some((v, k) => v !== k) };
  }
  /** z(I) e un insieme ottimo (PD sulle capacità, ricostruzione dall'ultima riga) */
  function ottimo(p, w, c) {
    const n = p.length, V = Array.from({ length: n + 1 }, () => new Array(c + 1).fill(0));
    for (let j = 1; j <= n; j++) for (let k = 0; k <= c; k++) {
      V[j][k] = V[j - 1][k];
      if (w[j - 1] <= k && V[j - 1][k - w[j - 1]] + p[j - 1] > V[j][k]) V[j][k] = V[j - 1][k - w[j - 1]] + p[j - 1];
    }
    const S = [];
    let k = c;
    for (let j = n; j >= 1; j--) if (V[j][k] !== V[j - 1][k]) { S.push(j); k -= w[j - 1]; }
    return { z: V[n][c], S: S.reverse() };
  }
  /** le due ipotesi del capitolo: w_j ≤ c per ogni j e Σ w_j > c */
  const ipotesi = (I) => I.w.every((x) => x <= I.c) && somma(I.w) > I.c;
  function casuale(nmin, nmax, cmax = 24) {
    for (let t = 0; t < 500; t++) {
      const n = M.casuale(nmin, nmax), p = [], w = [];
      for (let j = 0; j < n; j++) { w.push(M.casuale(1, 9)); p.push(M.casuale(2, 20)); }
      const lo = Math.max(...w), hi = Math.min(cmax, somma(w) - 1);
      if (hi < lo) continue;
      const I = { p, w, c: M.casuale(lo, hi) };
      if (ipotesi(I)) return I;
    }
    return copia({ p: [6, 5, 8, 9, 6, 7], w: [2, 3, 6, 7, 5, 9], c: 9 });
  }
  /** finestra «Modifica…»: profitti ; pesi ; capacità, con le ipotesi del capitolo */
  function modifica(I, nmin, nmax, cmax) {
    const s = chiedi(T(`Profitti, pesi e capacità separati da «;» (da ${nmin} a ${nmax} oggetti, c fino a ${cmax}), per esempio: 6 5 8 9 6 7 ; 2 3 6 7 5 9 ; 9`,
      `Profits, weights and capacity separated by «;» (${nmin} to ${nmax} items, c up to ${cmax}), for example: 6 5 8 9 6 7 ; 2 3 6 7 5 9 ; 9`), I.p.join(" ") + " ; " + I.w.join(" ") + " ; " + I.c);
    if (!s) return null;
    const [a, b, c] = s.split(";"), p = interi(a || ""), w = interi(b || ""), cc = interi(c || "");
    const J = p && w && cc && cc.length === 1 && p.length === w.length && p.length >= nmin && p.length <= nmax && cc[0] <= cmax ? { p, w, c: cc[0] } : null;
    if (!J || !ipotesi(J)) {
      window.alert(T(`Dati non validi: interi positivi, tanti profitti quanti pesi (da ${nmin} a ${nmax}), c fino a ${cmax}; le ipotesi del capitolo: ogni w_j ≤ c e Σ w_j > c.`,
        `Invalid data: positive integers, as many profits as weights (${nmin} to ${nmax}), c up to ${cmax}; the assumptions of the chapter: every w_j ≤ c and Σ w_j > c.`));
      return null;
    }
    return J;
  }
  const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹", sup = (n) => String(n).replace(/\d/g, (c) => SUP[c]);
  const setTex = (S) => (S.length ? `\\{${S.join(",")}\\}` : "\\varnothing");
  const sommaTex = (v) => (v.length ? v.join("+") : "0");
  const frTxt = (q) => (q.d === 1 ? String(q.n) : `${q.n}/${q.d}`);
  const xTex = (q) => M.Qtex(q);
  /** rettangoli pieni tutti insieme (una sola curva, con NaN fra un rettangolo e l'altro) */
  function rettangoli(crea, H, R, attr) {
    if (!R.length) return;
    const X = [], Y = [];
    for (const [x, y, w, h] of R) { X.push(x, x + w, x + w, x, x, NaN); Y.push(H - y, H - y, H - y - h, H - y - h, H - y, NaN); }
    crea("curve", [X, Y], Object.assign({ fixed: true, highlight: false, strokeWidth: 1 }, attr));
  }
  const HTML = (attr) => Object.assign({ display: "html", cssStyle: "white-space:nowrap" }, attr);
  const nota0 = (Or) => (Or.cambiato ? T(` Gli oggetti sono stati rinumerati per efficienza non crescente (numeri originali, nell'ordine: ${lista(Or.orig)}).`,
    ` The items have been renumbered by non-increasing efficiency (original numbers, in order: ${lista(Or.orig)}).`) : "");

  /** il vassoio dello zaino: scatola lunga c, blocchi di larghezza w_j (come nei disegni dei capitoli) */
  function vassoio(d, C, fs, x0, y, L, h, c, blocchi, opz = {}) {
    const u = L / (opz.scala || c);
    d.rect(x0, y, c * u, h, { strokeColor: C.muted, strokeWidth: 1.6 });
    let x = x0;
    for (const b of blocchi) {
      const wpx = b.w * u, lim = x0 + L;
      const vis = Math.max(0, Math.min(wpx, lim - x));
      if (vis > 0) d.rect(x, y, vis, h, { strokeColor: b.col, strokeWidth: 1.5, fillColor: b.col, fillOpacity: b.op ?? 0.35, dash: b.dash || 0 });
      if (vis > fs * 0.9) d.text(x + vis / 2, y + h / 2, vis > fs * 5 && b.lungo ? b.lungo : b.corto, { fontSize: fs, strokeColor: C.testo, cssStyle: "font-weight:700" });
      x += wpx;
      if (x > lim) { d.text(lim + 4, y + h / 2, "→", { anchorX: "left", fontSize: fs * 1.2, strokeColor: b.col, cssStyle: "font-weight:800" }); break; }
    }
    return { u, fine: x };
  }
  // =================================================================
  // 1. FORZA BRUTA (capitolo «Knapsack problems», esempio 2.1)
  // =================================================================
  const ENUM_ES = [
    { nome: T("esempio 2.1 (c = 9)", "Example 2.1 (c = 9)"), p: [6, 5, 8, 9, 6, 7], w: [2, 3, 6, 7, 5, 9], c: 9 },
    { nome: T("esercizio 2.1 (c = 12)", "Exercise 2.1 (c = 12)"), p: [6, 12, 5, 13, 8], w: [3, 4, 5, 6, 8], c: 12 },
    { nome: T("esercizio 2.6 (c = 14)", "Exercise 2.6 (c = 14)"), p: [14, 9, 15, 13, 11], w: [7, 2, 9, 6, 8], c: 14 },
  ];
  const ENUM_NMAX = 10;
  /** i 2^n sottoinsiemi in ordine binario di x = (x_1, …, x_n) (x_1 cifra più significativa) */
  function enumCalcola(I) {
    const { p, w, c } = I, n = p.length, N = 1 << n, sub = [], inc = [{ ib: -1, nf: 0, best: null }];
    let best = null, ib = -1, nf = 0;
    for (let m = 0; m < N; m++) {
      const x = [];
      for (let j = 0; j < n; j++) x.push((m >> (n - 1 - j)) & 1);
      const S = x.map((v, j) => (v ? j + 1 : 0)).filter(Boolean);
      const Wt = S.reduce((a, j) => a + w[j - 1], 0), P = S.reduce((a, j) => a + p[j - 1], 0), ok = Wt <= c;
      const prima = best;
      let nuovo = false;
      if (ok) { nf++; if (best === null || P > best) { best = P; ib = m; nuovo = true; } }
      sub.push({ m, x, S, W: Wt, P, ok, nuovo, prima });
      inc.push({ ib, nf, best });
    }
    return { n, N, sub, inc, nf, best, ib };
  }
  function enumStato(st) {
    const D = st.dati;
    if (!D.istE) D.istE = Object.assign(copia(ENUM_ES[0]), { id: nuovoId(), es: 0 });
    if (D.enId !== D.istE.id) { D.enId = D.istE.id; D.en = enumCalcola(D.istE); }
    const R = D.en, k = M.passoK(st, R.N, PASSO);
    return { D, I: D.istE, R, k, cur: k >= 1 ? R.sub[k - 1] : null, inc: R.inc[k] };
  }
  /** 2^n come testo: esatto fino a 2^40, poi in notazione scientifica */
  function potenza(n) {
    if (n <= 40) return GI.EN ? (2 ** n).toLocaleString("en-US") : (2 ** n).toLocaleString("it-IT");
    const e = Math.floor(n * Math.log10(2)), m = 2 ** n / 10 ** e;
    return `${GI.numTxt(m, 1)}·10^${e}`;
  }
  /** tempo per esaminare 2^n sottoinsiemi a 10^9 al secondo */
  function tempo(n) {
    const s = 2 ** n / 1e9;
    if (s < 1e-3) return T("meno di 1 ms", "less than 1 ms");
    if (s < 1) return GI.numTxt(s * 1000, 0) + " ms";
    if (s < 120) return GI.numTxt(s, 1) + " s";
    if (s < 7200) return GI.numTxt(s / 60, 0) + " min";
    if (s < 172800) return GI.numTxt(s / 3600, 0) + T(" ore", " hours");
    if (s < 3.15e7 * 2) return GI.numTxt(s / 86400, 0) + T(" giorni", " days");
    const a = s / 3.156e7;
    if (a < 1e6) return (GI.EN ? Math.round(a).toLocaleString("en-US") : Math.round(a).toLocaleString("it-IT")) + T(" anni", " years");
    const e = Math.floor(Math.log10(a));
    return `${GI.numTxt(a / 10 ** e, 1)}·10^${e}` + T(" anni", " years");
  }

  window.GI_RICETTE["oc-kp-enum"] = {
    titolo: T("Forza bruta sul problema dello zaino 0/1", "Brute force on the 0/1 knapsack problem"),
    parametri: [parPasso(T("◀ ▶ un sottoinsieme alla volta, «Esegui» per vederli tutti", "◀ ▶ one subset at a time, «Run» to watch them all"), 0)],
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [-1, 10, 20, -2],
    legenda: (st) => {
      const C = M.COL(st);
      return [
        [C.a, T("sottoinsieme corrente", "current subset"), "pieno"],
        [C.b, T("ammissibile (\\(\\sum w_j \\le c\\))", "feasible (\\(\\sum w_j \\le c\\))"), "pieno"],
        [C.grigio, T("non ammissibile (\\(\\sum w_j > c\\))", "infeasible (\\(\\sum w_j > c\\))"), "pieno"],
        [C.blu, T("incumbent \\(\\bar{x}\\): il migliore finora", "incumbent \\(\\bar{x}\\): the best so far"), "pieno"],
        [C.muted, T("capacità \\(c\\)", "capacity \\(c\\)"), "dashed"],
      ];
    },
    monta(board, st) {
      const D = st.dati;
      const nuova = (I, es = -1) => { D.istE = Object.assign(I, { id: nuovoId(), es }); vaiA(st, 0); M.ferma(st); st.aggiorna(); };
      M.comandi(st, [
        [T("Casuale", "Random"), T("dati casuali con le ipotesi del capitolo", "random data with the assumptions of the chapter"), () => nuova(casuale(4, 7, 20))],
        [T("Modifica…", "Edit…"), T("scrivi profitti, pesi e capacità", "type profits, weights and capacity"), () => { const J = modifica(D.istE, 2, ENUM_NMAX, 40); if (J) nuova(J); }],
        [T("+ oggetto", "+ item"), T(`aggiungi un oggetto casuale (al più ${ENUM_NMAX}): i sottoinsiemi raddoppiano`, `add a random item (at most ${ENUM_NMAX}): the subsets double`), () => {
          const I = D.istE;
          if (I.p.length >= ENUM_NMAX) return;
          nuova({ p: I.p.concat([M.casuale(2, 12)]), w: I.w.concat([M.casuale(1, Math.min(9, I.c))]), c: I.c });
        }],
        [T("− oggetto", "− item"), T("togli l'ultimo oggetto (almeno 2): i sottoinsiemi si dimezzano", "remove the last item (at least 2): the subsets halve"), () => {
          const I = D.istE;
          if (I.p.length > 2) nuova({ p: I.p.slice(0, -1), w: I.w.slice(0, -1), c: I.c });
        }],
        [T("⏭ Fine", "⏭ End"), T("salta all'ultimo sottoinsieme", "jump to the last subset"), () => { const i = M.inputDi(st, PASSO); if (i) st.imposta(PASSO, +i.max); }],
      ], { k: PASSO, ritmo: 700 });
      O.menuIstanze(st, ENUM_ES.map((e) => [e.nome, ""]), () => (D.istE ? D.istE.es : 0), (i) => nuova(copia(ENUM_ES[i]), i));
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = enumStato(st), C = M.COL(st), [W, H] = dim(board), { I, R, k, cur, inc } = S, n = R.n;
      if (st.dati.menu) st.dati.menu.value = String(I.es);
      M.ridisegna(board, st, [S.D.enId, k, M.scuro(), W, H].join("|"), (crea) => {
        pix(board);
        const d = disegno(crea, H), fs = clamp(Math.min(W / 56, H / 34), 11, 15), pad = 16;
        // ---- lo zaino con il sottoinsieme corrente
        const scala = Math.max(I.c * 1.6, I.c + Math.max(...I.w)), lw = clamp(W * 0.16, 96, 170);
        const x0 = pad + lw, L = W - x0 - pad - 24, ty = 30, th = clamp(H * 0.1, 30, 54);
        d.text(x0 - 10, ty + th / 2, T(`zaino, c = ${I.c}`, `knapsack, c = ${I.c}`), { anchorX: "right", fontSize: fs, strokeColor: C.testo, cssStyle: "font-weight:700" });
        const blocchi = cur ? cur.S.map((j) => ({ w: I.w[j - 1], col: cur.ok ? C.a : C.grigio, op: cur.ok ? 0.45 : 0.4, corto: String(j), lungo: `${j}: p=${I.p[j - 1]}, w=${I.w[j - 1]}` })) : [];
        const v = vassoio(d, C, fs, x0, ty, L, th, I.c, blocchi, { scala });
        const xc = x0 + I.c * v.u;
        d.line(xc, ty - 8, xc, ty + th + 8, { strokeColor: C.muted, strokeWidth: 2, dash: 2 });
        d.text(xc, ty - 16, `c = ${I.c}`, { fontSize: fs * 0.95, strokeColor: C.muted, cssStyle: "font-weight:700" });
        if (cur && !cur.S.length) d.text(x0 + 8, ty + th / 2, T("insieme vuoto", "empty set"), { anchorX: "left", fontSize: fs, strokeColor: C.muted, cssStyle: "font-style:italic" });
        // ---- il vettore x
        const yx = ty + th + 20, bx = clamp(fs * 1.9, 20, 28);
        d.text(x0 - 10, yx + bx / 2, "x =", { anchorX: "right", fontSize: fs * 1.1, strokeColor: C.testo, cssStyle: "font-weight:700" });
        for (let j = 0; j < n; j++) {
          const uno = cur && cur.x[j] === 1, xx = x0 + j * (bx + 4);
          d.rect(xx, yx, bx, bx, { strokeColor: uno ? C.a : C.line, strokeWidth: 1.4, fillColor: uno ? C.a : "none", fillOpacity: uno ? 0.4 : 0 });
          d.text(xx + bx / 2, yx + bx / 2, cur ? String(cur.x[j]) : "·", { fontSize: fs, strokeColor: C.testo, cssStyle: "font-weight:700" });
          d.text(xx + bx / 2, yx + bx + fs * 0.7, String(j + 1), { fontSize: fs * 0.75, strokeColor: C.muted });
        }
        if (cur) {
          const testo = `W = ${cur.W} ${cur.ok ? "≤" : ">"} ${I.c}` + (cur.ok ? `,  P = ${cur.P}` : T(": non ammissibile", ": infeasible"));
          d.text(x0 + n * (bx + 4) + 14, yx + bx / 2, testo, { anchorX: "left", fontSize: fs, strokeColor: cur.ok ? C.testo : C.muted, cssStyle: "font-weight:700" });
        }
        // ---- la griglia dei 2^n sottoinsiemi
        const cols = 1 << Math.ceil(n / 2), rows = R.N / cols;
        const gy0 = yx + bx + fs * 2.4, gh = H - gy0 - fs * 2.2, gw = W - 2 * pad;
        const cs = Math.max(4, Math.min(gw / cols, gh / rows, 76)), gx0 = (W - cols * cs) / 2, g = cs > 12 ? 2 : cs > 6 ? 1 : 0;
        const cella = (m) => [gx0 + (m % cols) * cs + g / 2, gy0 + Math.floor(m / cols) * cs + g / 2, cs - g, cs - g];
        for (let r = 0; r <= rows; r++) d.line(gx0, gy0 + r * cs, gx0 + cols * cs, gy0 + r * cs, { strokeColor: C.line, strokeWidth: 1 });
        for (let q = 0; q <= cols; q++) d.line(gx0 + q * cs, gy0, gx0 + q * cs, gy0 + rows * cs, { strokeColor: C.line, strokeWidth: 1 });
        const fatti = R.sub.slice(0, Math.max(0, k - 1));
        rettangoli(crea, H, fatti.filter((s) => s.ok && s.m !== inc.ib).map((s) => cella(s.m)), { strokeColor: C.b, fillColor: C.b, fillOpacity: 0.3, strokeOpacity: 0.5 });
        rettangoli(crea, H, fatti.filter((s) => !s.ok).map((s) => cella(s.m)), { strokeColor: C.grigio, fillColor: C.grigio, fillOpacity: 0.28, strokeOpacity: 0.5 });
        if (inc.ib >= 0 && (!cur || inc.ib !== cur.m)) { const [a, b, c2, e] = cella(inc.ib); d.rect(a, b, c2, e, { strokeColor: C.blu, strokeWidth: 2, fillColor: C.blu, fillOpacity: 0.55 }); }
        if (cur) {
          const [a, b, c2, e] = cella(cur.m), col = cur.nuovo ? C.blu : cur.ok ? C.b : C.grigio;
          d.rect(a, b, c2, e, { strokeColor: C.a, strokeWidth: 3.5, fillColor: col, fillOpacity: 0.55 });
        }
        if (cs >= 22) {
          const fc = clamp(cs * 0.36, 8, 14);
          for (const s of R.sub.slice(0, k)) {
            const [a, b, c2, e] = cella(s.m);
            d.text(a + c2 / 2, b + e / 2, s.ok ? String(s.P) : "✗", { fontSize: fc, strokeColor: s.ok ? C.testo : C.muted, cssStyle: s.m === inc.ib ? "font-weight:800" : "" });
          }
        }
        d.text(W / 2, gy0 + rows * cs + fs * 1.1, T(`i 2${sup(n)} = ${potenza(n)} sottoinsiemi, riga per riga in ordine binario di x (nella cella: il profitto, ✗ se non ammissibile)`,
          `the 2${sup(n)} = ${potenza(n)} subsets, row by row in binary order of x (in the cell: the profit, ✗ if infeasible)`), { fontSize: fs * 0.88, strokeColor: C.muted });
      });
    },
    formula(p, st) {
      const { I, R, k, cur } = enumStato(st), n = R.n;
      if (!cur) return T(`2^{n} = 2^{${n}} = ${potenza(n).replace(/,/g, "{,}").replace(/\./g, "{.}")} \\ \\text{sottoinsiemi di } \\mathscr{I} = \\{1, \\dots, ${n}\\}`,
        `2^{n} = 2^{${n}} = ${potenza(n).replace(/,/g, "{,}")} \\ \\text{subsets of } \\mathscr{I} = \\{1, \\dots, ${n}\\}`);
      const ws = cur.S.map((j) => I.w[j - 1]), ps = cur.S.map((j) => I.p[j - 1]);
      return `S = ${setTex(cur.S)}:\\quad \\sum_{j \\in S} w_j = ${sommaTex(ws)} = ${cur.W} ${cur.ok ? "\\le" : ">"} c = ${I.c}` + (cur.ok ? `,\\quad \\sum_{j \\in S} p_j = ${sommaTex(ps)} = ${cur.P}` : "");
    },
    letture(p, st) {
      const { I, R, k, cur, inc } = enumStato(st), C = M.COL(st), n = R.n, best = inc.ib >= 0 ? R.sub[inc.ib] : null;
      let nota;
      if (!cur) nota = T(`Ogni sottoinsieme \\(S \\subseteq \\mathscr{I}\\) è una soluzione candidata: con \\(n = ${n}\\) oggetti sono \\(2^{${n}} = ${potenza(n)}\\). La forza bruta li esamina tutti, in ordine binario del vettore \\(x\\), e tiene il migliore ammissibile trovato finora, l'incumbent \\(\\bar{x}\\).`,
        `Every subset \\(S \\subseteq \\mathscr{I}\\) is a candidate solution: with \\(n = ${n}\\) items there are \\(2^{${n}} = ${potenza(n)}\\) of them. Brute force examines them all, in binary order of the vector \\(x\\), and keeps the best feasible one found so far, the incumbent \\(\\bar{x}\\).`);
      else {
        nota = T(`Sottoinsieme ${k} di ${R.N}: \\(S = ${setTex(cur.S)}\\), peso \\(${cur.W}\\). `, `Subset ${k} of ${R.N}: \\(S = ${setTex(cur.S)}\\), weight \\(${cur.W}\\). `);
        if (!cur.ok) nota += T(`\\(${cur.W} > c = ${I.c}\\): ${M.tinta(C.muted, "non ammissibile")}.`, `\\(${cur.W} > c = ${I.c}\\): ${M.tinta(C.muted, "infeasible")}.`);
        else if (cur.nuovo) nota += cur.prima === null ? T(`Ammissibile, profitto \\(${cur.P}\\): è il primo, ${M.tinta(C.blu, "nuovo incumbent")}.`, `Feasible, profit \\(${cur.P}\\): the first one, ${M.tinta(C.blu, "new incumbent")}.`)
          : T(`Ammissibile, profitto \\(${cur.P} > ${cur.prima}\\): ${M.tinta(C.blu, "nuovo incumbent")} \\(\\bar{x}\\).`, `Feasible, profit \\(${cur.P} > ${cur.prima}\\): ${M.tinta(C.blu, "new incumbent")} \\(\\bar{x}\\).`);
        else nota += T(`Ammissibile, profitto \\(${cur.P} \\le ${cur.prima}\\): l'incumbent non cambia.`, `Feasible, profit \\(${cur.P} \\le ${cur.prima}\\): the incumbent does not change.`);
        if (k === R.N) nota += T(` Fine: ${R.nf} sottoinsiemi ammissibili su ${R.N}. La soluzione ottima è \\(\\tilde{S} = ${setTex(R.sub[R.ib].S)}\\), con \\(z(I) = ${R.best}\\).`,
          ` End: ${R.nf} feasible subsets out of ${R.N}. The optimal solution is \\(\\tilde{S} = ${setTex(R.sub[R.ib].S)}\\), with \\(z(I) = ${R.best}\\).`);
      }
      const righe = [
        [T("sottoinsiemi esaminati", "subsets examined"), `\\(${k} / ${R.N}\\)`],
        [T("ammissibili", "feasible"), `\\(${inc.nf}\\)`],
        [T("non ammissibili", "infeasible"), `\\(${k - inc.nf}\\)`],
        [T("incumbent \\(\\bar{x}\\)", "incumbent \\(\\bar{x}\\)"), best ? `\\(${setTex(best.S)}\\)` : "—"],
        [T("valore \\(z(\\bar{x})\\)", "value \\(z(\\bar{x})\\)"), best ? `\\(${best.P}\\)` : "—"],
      ];
      const ns = [...new Set([n, 20, 30, 40, 50, 60, 100])].filter((x) => x >= n).sort((a, b) => a - b).slice(0, 6);
      const esplosione = M.tab(["\\(n\\)", "\\(2^n\\)", T("tempo a \\(10^9\\)/s", "time at \\(10^9\\)/s")], ns.map((x) => [x === n ? `<strong>${x}</strong>` : String(x), potenza(x), tempo(x)]), 0, C.a);
      return nota + M.tab([T("forza bruta", "brute force"), T("valore", "value")], righe, -1, C.a)
        + `<div style="margin:.4em 0 .1em">${T("L'esplosione combinatoria: un oggetto in più raddoppia i sottoinsiemi.", "The combinatorial explosion: one more item doubles the subsets.")}</div>` + esplosione;
    },
    domanda: T("Con «+ oggetto» e «− oggetto» guarda come cresce la griglia. Sull'esempio 2.1 i sottoinsiemi con tre o più oggetti sono tutti non ammissibili: perché? (Somma i tre pesi più piccoli.)",
      "Use «+ item» and «− item» to watch the grid grow. In Example 2.1 all the subsets with three or more items are infeasible: why? (Add up the three smallest weights.)"),
  };

  // =================================================================
  // 2. RILASSAMENTO CONTINUO E UPPER BOUND (capitolo «Formulations of knapsack problems»)
  // =================================================================
  const LP_ES = [
    { nome: T("esempio 9.1 (c = 9)", "Example 9.1 (c = 9)"), p: [6, 5, 8, 9, 6, 7], w: [2, 3, 6, 7, 5, 9], c: 9 },
    { nome: T("esercizio 9.1 (c = 11)", "Exercise 9.1 (c = 11)"), p: [8, 6, 14, 6, 2], w: [3, 3, 9, 5, 2], c: 11 },
    { nome: T("esercizio 9.2 (c = 8)", "Exercise 9.2 (c = 8)"), p: [40, 42, 25, 12], w: [4, 7, 5, 3], c: 8 },
    { nome: T("esercizio 9.3 (c = 15)", "Exercise 9.3 (c = 15)"), p: [24, 17, 12, 6], w: [10, 8, 6, 5], c: 15 },
    { nome: T("esercizio 9.5 (c = 21)", "Exercise 9.5 (c = 21)"), p: [24, 25, 13, 10, 9, 2], w: [2, 6, 8, 7, 10, 3], c: 21 },
  ];
  /** oggetto critico s (1-based), rc, x̃(LP_KP), z(LP_KP), UB_D, UB_0, UB_1, UB_MT, soluzione duale; ottimo intero per confronto */
  function lpCalcola(I0) {
    const Or = ordina(I0), { p, w, c } = Or, n = p.length;
    let Wc = 0, s0 = n - 1;
    for (let j = 0; j < n; j++) { if (Wc + w[j] > c) { s0 = j; break; } Wc += w[j]; }
    const s = s0 + 1, rc = c - Wc, prima = p.slice(0, s0), P = somma(prima);
    const xs = M.Q(rc, w[s0]), frazione = M.Q(p[s0] * rc, w[s0]);
    const z = M.Qadd(M.Q(P), frazione), UBD = P + M.Qfloor(frazione);
    const e1 = s < n ? M.Q(p[s], w[s]) : M.Q(0), t0 = M.Qmul(M.Q(rc), e1), UB0 = P + M.Qfloor(t0);
    const em1 = M.Q(p[s0 - 1], w[s0 - 1]), t1 = M.Q(p[s0] * w[s0 - 1] - (w[s0] - rc) * p[s0 - 1], w[s0 - 1]), UB1 = P + M.Qfloor(t1);
    const pi = M.Q(p[s0], w[s0]), mu = p.map((pj, j) => (j < s0 ? M.Q(pj * w[s0] - w[j] * p[s0], w[s0]) : M.Q(0)));
    const cum = [0];
    w.forEach((x) => cum.push(cum[cum.length - 1] + x));
    const x = p.map((_, j) => (j < s0 ? M.Q(1) : j === s0 ? xs : M.Q(0)));
    return { Or, p, w, c, n, s, rc, P, prima, xs, frazione, z, UBD, e1, t0, UB0, em1, t1, UB1, UBMT: Math.max(UB0, UB1), pi, mu, cum, x, opt: ottimo(p, w, c), K: s + 5 };
  }
  function lpStato(st) {
    const D = st.dati;
    if (!D.istL) D.istL = Object.assign(copia(LP_ES[0]), { id: nuovoId(), es: 0 });
    if (D.lpId !== D.istL.id) { D.lpId = D.istL.id; D.lp = lpCalcola(D.istL); }
    const R = D.lp, k = M.passoK(st, R.K, PASSO);
    return { D, R, k };
  }
  const UBtxt = { D: "UB<sub>D</sub>", 0: "UB<sub>0</sub>", 1: "UB<sub>1</sub>", MT: "UB<sub>MT</sub>", LP: "z(LP<sub>KP</sub>)", ILP: "z(ILP<sub>KP</sub>)" };
  const UBtex = { D: "\\mathrm{UB}_{\\mathrm{D}}", 0: "\\mathrm{UB}_0", 1: "\\mathrm{UB}_1", MT: "\\mathrm{UB}_{\\mathrm{MT}}", LP: "z(\\mathrm{LP}_{\\mathrm{KP}})", ILP: "z(\\mathrm{ILP}_{\\mathrm{KP}})" };

  window.GI_RICETTE["oc-kp-lp"] = {
    titolo: T("Rilassamento continuo e upper bound per lo zaino 0/1", "LP relaxation and upper bounds for the 0/1 KP"),
    parametri: [parPasso(T("◀ ▶ un passo alla volta, «Esegui» per vederli tutti", "◀ ▶ one step at a time, «Run» to watch them all"), 0)],
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [-1, 10, 20, -2],
    legenda: (st) => {
      const C = M.COL(st);
      return [
        [C.b, T("\\(\\tilde{x}_j = 1\\)", "\\(\\tilde{x}_j = 1\\)"), "pieno"],
        [C.a, T("oggetto critico \\(s\\), \\(\\tilde{x}_s = \\mathit{rc}/w_s\\)", "split item \\(s\\), \\(\\tilde{x}_s = \\mathit{rc}/w_s\\)"), "pieno"],
        [C.viola, T("\\(\\mathrm{UB}_0\\): \\(s\\) fuori", "\\(\\mathrm{UB}_0\\): \\(s\\) out"), "pieno"],
        [C.rosso, T("\\(\\mathrm{UB}_1\\): \\(s\\) dentro, peso tolto", "\\(\\mathrm{UB}_1\\): \\(s\\) in, weight removed"), "dashed"],
        [C.muted, T("capacità \\(c\\)", "capacity \\(c\\)"), "dashed"],
      ];
    },
    monta(board, st) {
      const D = st.dati;
      const nuova = (I, es = -1) => { D.istL = Object.assign(I, { id: nuovoId(), es }); vaiA(st, 0); M.ferma(st); st.aggiorna(); };
      M.comandi(st, [
        [T("Casuale", "Random"), T("dati casuali con le ipotesi del capitolo", "random data with the assumptions of the chapter"), () => nuova(casuale(4, 7, 24))],
        [T("Modifica…", "Edit…"), T("scrivi profitti, pesi e capacità", "type profits, weights and capacity"), () => { const J = modifica(D.istL, 3, 8, 60); if (J) nuova(J); }],
      ], { k: PASSO, ritmo: 900 });
      O.menuIstanze(st, LP_ES.map((e) => [e.nome, ""]), () => (D.istL ? D.istL.es : 0), (i) => nuova(copia(LP_ES[i]), i));
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const { D, R, k } = lpStato(st), C = M.COL(st), [W, H] = dim(board), { n, s, c, cum, p, w } = R;
      if (D.menu) D.menu.value = String(D.istL.es);
      M.ridisegna(board, st, [D.lpId, k, M.scuro(), W, H].join("|"), (crea) => {
        pix(board);
        const d = disegno(crea, H), fs = clamp(Math.min(W / 58, H / 36), 11, 15), pad = 18;
        const x0 = pad + 34, x1 = W - pad - 10, yt = 46, yb = Math.round(H * 0.6);
        const ux = (x1 - x0) / cum[n], emax = p[0] / w[0], uy = (yb - yt - fs * 3) / emax;
        const X = (q) => x0 + q * ux, Y = (e) => yb - e * uy;
        d.line(x0, yb, x1, yb, { strokeColor: C.muted, strokeWidth: 1.4 });
        d.line(x0, yb, x0, yt - 10, { strokeColor: C.muted, strokeWidth: 1.4 });
        crea("text", [x0 + 6, H - (yt - 26), T("efficienza p<sub>j</sub>/w<sub>j</sub> (area della barra = p<sub>j</sub>)", "efficiency p<sub>j</sub>/w<sub>j</sub> (bar area = p<sub>j</sub>)")],
          HTML({ fixed: true, highlight: false, anchorX: "left", anchorY: "middle", fontSize: fs * 0.92, strokeColor: C.muted, cssStyle: "white-space:nowrap;font-style:italic" }));
        d.text(x1, yb + fs * 2.6, T("peso cumulato →", "cumulative weight →"), { anchorX: "right", fontSize: fs * 0.9, strokeColor: C.muted, cssStyle: "font-style:italic" });
        let ultimoTick = -1e9;
        for (let j = 0; j <= n; j++) {
          const xx = X(cum[j]);
          if (xx - ultimoTick >= fs * 1.8) { d.text(xx, yb + fs * 1.1, String(cum[j]), { fontSize: fs * 0.85, strokeColor: C.muted }); ultimoTick = xx; }
        }
        const fase = k <= s ? "riempi" : k === s + 1 ? "z" : k === s + 2 ? "D" : k === s + 3 ? "0" : k === s + 4 ? "1" : "MT";
        for (let j = 1; j <= n; j++) {
          const e = p[j - 1] / w[j - 1], a = X(cum[j - 1]), b = X(cum[j]), top = Y(e), hh = yb - top;
          const pieno = j < s && k >= j, critico = j === s && k >= s;
          if (pieno) d.rect(a, top, b - a, hh, { strokeColor: C.b, strokeWidth: 1.5, fillColor: C.b, fillOpacity: k === j ? 0.6 : 0.35 });
          else if (critico && fase === "1") d.rect(a, top, b - a, hh, { strokeColor: C.a, strokeWidth: 2, fillColor: C.a, fillOpacity: 0.5 });
          else if (critico && fase !== "0") {
            const xcut = X(c);
            d.rect(a, top, xcut - a, hh, { strokeColor: C.a, strokeWidth: 2, fillColor: C.a, fillOpacity: k === s ? 0.65 : 0.5 });
            d.rect(xcut, top, b - xcut, hh, { strokeColor: C.a, strokeWidth: 1.4, dash: 2 });
          } else d.rect(a, top, b - a, hh, { strokeColor: j === s && k >= s ? C.a : C.grigio, strokeWidth: 1.3, dash: j === s && k >= s ? 2 : 0 });
          if (b - a > fs * 0.9) {
            d.text((a + b) / 2, top - fs * 0.75, frTxt(M.Q(p[j - 1], w[j - 1])), { fontSize: fs * 0.9, strokeColor: C.muted, cssStyle: "font-weight:700" });
            if (hh > fs * 1.6) d.text((a + b) / 2, yb - fs * 0.8, String(j), { fontSize: fs, strokeColor: C.testo, cssStyle: "font-weight:800" });
          }
          if (k >= s + 1 && j > s && b - a > fs * 2.2 && hh > fs * 3.4) d.text((a + b) / 2, yb - fs * 2.1, "x̃ = 0", { fontSize: fs * 0.82, strokeColor: C.muted });
        }
        // UB_0: la capacità residua riempita con l'efficienza dell'oggetto s+1
        if (fase === "0" && R.rc > 0) {
          const a = X(cum[s - 1]), b = X(c), e = M.Qv(R.e1);
          if (e > 0) d.rect(a, Y(e), b - a, yb - Y(e), { strokeColor: C.viola, strokeWidth: 2, fillColor: C.viola, fillOpacity: 0.35, dash: 2 });
          crea("text", [(a + b) / 2, H - (e > 0 && yb - Y(e) > fs * 4 ? (Y(e) + yb) / 2 - fs * 0.6 : Y(Math.max(e, 0)) - fs * 3.2), s < n ? `rc · p<sub>${s + 1}</sub>/w<sub>${s + 1}</sub>` : T("nessun oggetto s+1: 0", "no item s+1: 0")],
            HTML({ fixed: true, highlight: false, anchorX: "middle", anchorY: "middle", fontSize: fs * 0.95, strokeColor: C.viola, cssStyle: "white-space:nowrap;font-weight:700" }));
        }
        // UB_1: l'oggetto s per intero, e tolto un peso w_s - rc con l'efficienza dell'oggetto s-1
        if (fase === "1") {
          const tw = w[s - 1] - R.rc, b = X(cum[s - 1]), a = X(Math.max(0, cum[s - 1] - tw)), e = M.Qv(R.em1);
          d.rect(a, Y(e), b - a, yb - Y(e), { strokeColor: C.rosso, strokeWidth: 2.2, fillColor: C.rosso, fillOpacity: 0.22, dash: 2 });
          crea("text", [(a + b) / 2, H - (Y(e) - fs * 2.6), `−(w<sub>${s}</sub> − rc) · p<sub>${s - 1}</sub>/w<sub>${s - 1}</sub>`],
            HTML({ fixed: true, highlight: false, anchorX: "middle", anchorY: "middle", fontSize: fs * 0.95, strokeColor: C.rosso, cssStyle: "white-space:nowrap;font-weight:700" }));
        }
        // la capacità c e la capacità residua rc
        const xc = X(c);
        d.line(xc, yt - 14, xc, yb + 6, { strokeColor: C.testo, strokeWidth: 2, dash: 2 });
        d.text(xc + 6, yt - 8, `c = ${c}`, { anchorX: "left", fontSize: fs, strokeColor: C.testo, cssStyle: "font-weight:800" });
        if (k >= s && R.rc > 0) {
          const a = X(cum[s - 1]), yr = yb + fs * 2.6;
          d.line(a, yr, xc, yr, { strokeColor: C.a, strokeWidth: 2 });
          d.line(a, yr - 5, a, yr + 5, { strokeColor: C.a, strokeWidth: 2 });
          d.line(xc, yr - 5, xc, yr + 5, { strokeColor: C.a, strokeWidth: 2 });
          d.text((a + xc) / 2, yr + fs * 1.1, `rc = ${R.rc}`, { fontSize: fs, strokeColor: C.a, cssStyle: "font-weight:800" });
        }
        // ---- la retta dei bound
        const voci = [];
        if (k >= s + 1) voci.push(["LP", M.Qv(R.z), M.Qtex(R.z).replace(/\\tfrac\{(\d+)\}\{(\d+)\}/, "$1/$2")]);
        if (k >= s + 2) voci.push(["D", R.UBD, String(R.UBD)]);
        if (k >= s + 3) voci.push(["0", R.UB0, String(R.UB0)]);
        if (k >= s + 4) voci.push(["1", R.UB1, String(R.UB1)]);
        if (k >= s + 5) voci.push(["MT", R.UBMT, String(R.UBMT)], ["ILP", R.opt.z, String(R.opt.z)]);
        const yl = Math.round(yb + (H - yb) * 0.62), lx0 = x0 + 10, lx1 = x1 - 10;
        d.text(lx0, yl - fs * 3.4, T("i bound sulla retta dei valori", "the bounds on the value line"), { anchorX: "left", fontSize: fs * 0.92, strokeColor: C.muted, cssStyle: "font-style:italic" });
        if (voci.length) {
          const vals = voci.map((v) => v[1]), lo = Math.floor(Math.min(...vals, R.opt.z)) - 1, hi = Math.ceil(Math.max(...vals)) + 1;
          const gx = (v) => lx0 + (v - lo) / (hi - lo) * (lx1 - lx0), passo = hi - lo > 30 ? 5 : hi - lo > 14 ? 2 : 1;
          d.line(lx0, yl, lx1, yl, { strokeColor: C.muted, strokeWidth: 1.4 });
          for (let v = lo; v <= hi; v++) {
            d.line(gx(v), yl - 3, gx(v), yl + 3, { strokeColor: C.muted, strokeWidth: 1 });
            if ((v - lo) % passo === 0) d.text(gx(v), yl + fs * 1.1, String(v), { fontSize: fs * 0.8, strokeColor: C.muted });
          }
          const gruppi = [];
          for (const v of voci) { const g = gruppi.find((q) => Math.abs(q.v - v[1]) < 1e-9); if (g) g.nomi.push(v[0]); else gruppi.push({ v: v[1], txt: v[2], nomi: [v[0]] }); }
          gruppi.sort((a, b) => a.v - b.v).forEach((g, i) => {
            const col = g.nomi.includes("ILP") ? C.blu : g.nomi.includes("LP") ? C.a : C.testo, su = i % 2 === 0;
            d.dot(gx(g.v), yl, 4, { fillColor: col, strokeColor: col });
            crea("text", [gx(g.v), H - (yl + (su ? -fs * 1.6 : fs * 2.5)), g.nomi.map((q) => UBtxt[q]).join(" = ") + " = " + g.txt],
              HTML({ fixed: true, highlight: false, anchorX: "middle", anchorY: "middle", fontSize: fs * 0.95, strokeColor: col, cssStyle: "white-space:nowrap;font-weight:700" }));
          });
        }
      });
    },
    formula(pp, st) {
      const { R, k } = lpStato(st), { s, p, w, c, rc } = R, sp = `\\sum_{j=1}^{${s - 1}} p_j`, somP = sommaTex(R.prima);
      if (k === 0) return T("\\text{efficienze: }\\ ", "\\text{efficiencies: }\\ ") + p.map((pj, j) => M.Qtex(M.Q(pj, w[j]))).join(" \\ge ");
      if (k < s) return `\\tilde{x}_{${k}} = 1, \\qquad \\sum_{j=1}^{${k}} w_j = ${sommaTex(w.slice(0, k))} = ${R.cum[k]} \\le c = ${c}`;
      if (k === s) return `\\sum_{j=1}^{${s}} w_j = ${R.cum[s]} > ${c} \\;\\Rightarrow\\; s = ${s},\\quad \\mathit{rc} = ${c} - ${R.cum[s - 1]} = ${rc},\\quad \\tilde{x}_{${s}} = \\frac{\\mathit{rc}}{w_{${s}}} = \\frac{${rc}}{${w[s - 1]}}` + (M.Q(rc, w[s - 1]).d !== w[s - 1] ? ` = ${xTex(R.xs)}` : "");
      if (k === s + 1) return `${UBtex.LP} = ${sp} + p_{${s}} \\frac{\\mathit{rc}}{w_{${s}}} = ${somP} + ${p[s - 1]} \\cdot ${xTex(R.xs)} = ${M.Qtex(R.z)}`;
      if (k === s + 2) return `${UBtex.D} = ${sp} + \\left\\lfloor p_{${s}} \\frac{\\mathit{rc}}{w_{${s}}} \\right\\rfloor = ${somP} + \\left\\lfloor ${M.Qtex(R.frazione)} \\right\\rfloor = ${R.UBD}`;
      if (k === s + 3) return s < R.n ? `${UBtex[0]} = ${sp} + \\left\\lfloor \\mathit{rc}\\, \\frac{p_{${s + 1}}}{w_{${s + 1}}} \\right\\rfloor = ${somP} + \\left\\lfloor ${rc} \\cdot ${M.Qtex(M.Q(p[s], w[s]))} \\right\\rfloor = ${R.P} + \\left\\lfloor ${M.Qtex(R.t0)} \\right\\rfloor = ${R.UB0}`
        : `${UBtex[0]} = ${sp} = ${R.UB0} \\qquad (p_{${s + 1}}/w_{${s + 1}} := 0)`;
      if (k === s + 4) return `${UBtex[1]} = ${sp} + \\left\\lfloor p_{${s}} - (w_{${s}} - \\mathit{rc}) \\frac{p_{${s - 1}}}{w_{${s - 1}}} \\right\\rfloor = ${somP} + \\left\\lfloor ${p[s - 1]} - (${w[s - 1]} - ${rc}) \\cdot ${M.Qtex(M.Q(p[s - 2], w[s - 2]))} \\right\\rfloor = ${R.P} + \\left\\lfloor ${M.Qtex(R.t1)} \\right\\rfloor = ${R.UB1}`;
      return `${UBtex.MT} = \\max\\{${R.UB0},\\ ${R.UB1}\\} = ${R.UBMT} \\;${R.UBMT < R.UBD ? "<" : "="}\\; ${UBtex.D} = ${R.UBD}, \\qquad ${UBtex.ILP} = ${R.opt.z}`;
    },
    letture(pp, st) {
      const { R, k } = lpStato(st), C = M.COL(st), { s, n, p, w, c, rc } = R;
      let nota;
      if (k === 0) nota = T(`Il rilassamento \\(\\mathrm{LP}_{\\mathrm{KP}}\\) sostituisce \\(x_j \\in \\{0,1\\}\\) con \\(0 \\le x_j \\le 1\\). Gli oggetti sono in ordine di efficienza \\(p_j/w_j\\) non crescente: la barra di \\(j\\) è larga \\(w_j\\) e alta \\(p_j/w_j\\), quindi la sua area è \\(p_j\\). Lo zaino si riempie da sinistra fino a \\(c = ${c}\\).`,
        `The relaxation \\(\\mathrm{LP}_{\\mathrm{KP}}\\) replaces \\(x_j \\in \\{0,1\\}\\) with \\(0 \\le x_j \\le 1\\). The items are sorted by non-increasing efficiency \\(p_j/w_j\\): the bar of \\(j\\) has width \\(w_j\\) and height \\(p_j/w_j\\), so its area is \\(p_j\\). The knapsack is filled from the left up to \\(c = ${c}\\).`) + nota0(R.Or);
      else if (k < s) nota = T(`L'oggetto ${k} entra per intero: \\(\\tilde{x}_{${k}} = 1\\), peso cumulato \\(${R.cum[k]} \\le ${c}\\).`, `Item ${k} fits entirely: \\(\\tilde{x}_{${k}} = 1\\), cumulative weight \\(${R.cum[k]} \\le ${c}\\).`);
      else if (k === s) nota = T(`L'oggetto ${s} non entra per intero (\\(${R.cum[s]} > ${c}\\)): è l'${M.tinta(C.a, "oggetto critico")} \\(s = ${s}\\). La capacità residua è \\(\\mathit{rc} = ${rc}\\) e ne entra la frazione \\(\\tilde{x}_{${s}} = ${xTex(R.xs)}\\), cioè l'oggetto è tagliato in \\(c\\).`,
        `Item ${s} does not fit entirely (\\(${R.cum[s]} > ${c}\\)): it is the ${M.tinta(C.a, "split item")} \\(s = ${s}\\). The residual capacity is \\(\\mathit{rc} = ${rc}\\) and the fraction \\(\\tilde{x}_{${s}} = ${xTex(R.xs)}\\) fits: the item is cut at \\(c\\).`);
      else if (k === s + 1) nota = T(`Gli oggetti dopo \\(s\\) restano fuori: \\(\\tilde{x}_j = 0\\) per \\(j > ${s}\\). Il valore \\(z(\\mathrm{LP}_{\\mathrm{KP}}) = ${M.Qtex(R.z)}\\) è l'area colorata a sinistra di \\(c\\), un upper bound su \\(z(\\mathrm{ILP}_{\\mathrm{KP}})\\). Soluzione duale: \\(\\tilde{\\pi} = p_s/w_s = ${M.Qtex(R.pi)}\\), \\(\\tilde{\\mu}_j = p_j - w_j \\tilde{\\pi}\\) per \\(j < s\\).`,
        `The items after \\(s\\) stay out: \\(\\tilde{x}_j = 0\\) for \\(j > ${s}\\). The value \\(z(\\mathrm{LP}_{\\mathrm{KP}}) = ${M.Qtex(R.z)}\\) is the coloured area to the left of \\(c\\), an upper bound on \\(z(\\mathrm{ILP}_{\\mathrm{KP}})\\). Dual solution: \\(\\tilde{\\pi} = p_s/w_s = ${M.Qtex(R.pi)}\\), \\(\\tilde{\\mu}_j = p_j - w_j \\tilde{\\pi}\\) for \\(j < s\\).`);
      else if (k === s + 2) nota = T(`I profitti sono interi, quindi anche \\(z(\\mathrm{ILP}_{\\mathrm{KP}})\\) lo è: si arrotonda per difetto e si ottiene il bound di Dantzig \\(\\mathrm{UB}_{\\mathrm{D}} = ${R.UBD}\\).`,
        `The profits are integer, hence so is \\(z(\\mathrm{ILP}_{\\mathrm{KP}})\\): rounding down gives the Dantzig upper bound \\(\\mathrm{UB}_{\\mathrm{D}} = ${R.UBD}\\).`);
      else if (k === s + 3) nota = T(`Martello-Toth, primo caso: l'oggetto critico ${M.tinta(C.viola, "resta fuori")}; la capacità residua \\(\\mathit{rc}\\) si riempie al più con l'efficienza \\(p_{s+1}/w_{s+1}\\) dell'oggetto successivo: \\(\\mathrm{UB}_0 = ${R.UB0}\\).`,
        `Martello-Toth, first case: the split item ${M.tinta(C.viola, "stays out")}; the residual capacity \\(\\mathit{rc}\\) is filled at most at the efficiency \\(p_{s+1}/w_{s+1}\\) of the next item: \\(\\mathrm{UB}_0 = ${R.UB0}\\).`);
      else if (k === s + 4) nota = T(`Secondo caso: l'oggetto critico ${M.tinta(C.a, "entra per intero")}; per fargli posto si toglie un peso di almeno \\(w_s - \\mathit{rc} = ${w[s - 1] - rc}\\), con efficienza al più bassa \\(p_{s-1}/w_{s-1}\\) (${M.tinta(C.rosso, "rettangolo tratteggiato")}): \\(\\mathrm{UB}_1 = ${R.UB1}\\).`,
        `Second case: the split item ${M.tinta(C.a, "is in entirely")}; to make room, a weight of at least \\(w_s - \\mathit{rc} = ${w[s - 1] - rc}\\) is removed, at the lowest efficiency \\(p_{s-1}/w_{s-1}\\) (${M.tinta(C.rosso, "dashed rectangle")}): \\(\\mathrm{UB}_1 = ${R.UB1}\\).`);
      else nota = T(`Una soluzione intera ottima sta in uno dei due casi, quindi \\(\\mathrm{UB}_{\\mathrm{MT}} = \\max\\{\\mathrm{UB}_0, \\mathrm{UB}_1\\} = ${R.UBMT}\\), mai peggiore di \\(\\mathrm{UB}_{\\mathrm{D}} = ${R.UBD}\\): ${R.UBMT < R.UBD ? "qui è più forte" : "qui sono uguali"}. L'ottimo, ${M.tinta(C.blu, `\\(z(\\mathrm{ILP}_{\\mathrm{KP}}) = ${R.opt.z}\\)`)}, si ottiene con \\(\\tilde{S} = ${setTex(R.opt.S)}\\).`,
        `An optimal integer solution falls in one of the two cases, hence \\(\\mathrm{UB}_{\\mathrm{MT}} = \\max\\{\\mathrm{UB}_0, \\mathrm{UB}_1\\} = ${R.UBMT}\\), never weaker than \\(\\mathrm{UB}_{\\mathrm{D}} = ${R.UBD}\\): ${R.UBMT < R.UBD ? "here it is stronger" : "here they are equal"}. The optimum, ${M.tinta(C.blu, `\\(z(\\mathrm{ILP}_{\\mathrm{KP}}) = ${R.opt.z}\\)`)}, is attained by \\(\\tilde{S} = ${setTex(R.opt.S)}\\).`);
      const corr = k >= 1 && k <= s ? k - 1 : -1;
      const righe = p.map((pj, j) => [String(j + 1), String(pj), String(w[j]), `\\(${M.Qtex(M.Q(pj, w[j]))}\\)`,
        k >= Math.min(j + 1, s + 1) ? `\\(${M.Qtex(R.x[j])}\\)` : "—"]);
      const valori = [
        ["\\(s\\)", k >= s ? `\\(${s}\\)` : "—"], ["\\(\\mathit{rc}\\)", k >= s ? `\\(${rc}\\)` : "—"],
        [`\\(${UBtex.LP}\\)`, k >= s + 1 ? `\\(${M.Qtex(R.z)}\\)` : "—"], [`\\(${UBtex.D}\\)`, k >= s + 2 ? `\\(${R.UBD}\\)` : "—"],
        [`\\(${UBtex[0]}\\)`, k >= s + 3 ? `\\(${R.UB0}\\)` : "—"], [`\\(${UBtex[1]}\\)`, k >= s + 4 ? `\\(${R.UB1}\\)` : "—"],
        [`\\(${UBtex.MT}\\)`, k >= s + 5 ? `\\(${R.UBMT}\\)` : "—"], [`\\(${UBtex.ILP}\\)`, k >= s + 5 ? `\\(${R.opt.z}\\)` : "—"],
      ];
      return nota + M.tab(["\\(j\\)", "\\(p_j\\)", "\\(w_j\\)", "\\(p_j/w_j\\)", "\\(\\tilde{x}_j\\)"], righe, corr, C.a)
        + `<div style="height:.4em"></div>` + M.tab([T("rilassamento e bound", "relaxation and bounds"), T("valore", "value")], valori, -1, C.a);
    },
    domanda: T("Nell'esercizio 9.2 il bound di Martello-Toth è più forte di quello di Dantzig, nell'esempio 9.1 sono uguali: guarda i due rettangoli di \\(\\mathrm{UB}_0\\) e \\(\\mathrm{UB}_1\\) e spiega da dove viene la differenza.",
      "In Exercise 9.2 the Martello-Toth bound is stronger than the Dantzig bound, in Example 9.1 they are equal: look at the two rectangles of \\(\\mathrm{UB}_0\\) and \\(\\mathrm{UB}_1\\) and explain where the difference comes from."),
  };

  window.GI_OC_D = { ordina, ottimo, enumCalcola, lpCalcola, ENUM_ES, LP_ES };
})();
