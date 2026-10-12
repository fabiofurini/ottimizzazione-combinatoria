/* Laboratorio di «Ottimizzazione combinatoria / Combinatorial Optimization»: lo zaino 0/1 (KP) dalla forza bruta
 * all'approssimazione.
 *
 *   oc-kp-enum     forza bruta: i 2^n sottoinsiemi dell'istanza di riferimento del capitolo «Knapsack problems»
 *                  (esempio 2.1: c = 9, p = (6, 5, 8, 9, 6, 7), w = (2, 3, 6, 7, 5, 9)) uno alla volta, in ordine
 *                  binario del vettore x; ammissibili, incumbent x̄, conteggio 2^n contro ammissibili, ± oggetti
 *   oc-kp-lp       rilassamento continuo LP_KP (capitolo «Formulations of knapsack problems», KP_ILP.tex): oggetti
 *                  per efficienza come barre larghe w_j e alte p_j/w_j, oggetto critico s tagliato da rc,
 *                  x̃(LP_KP), z(LP_KP), bound di Dantzig UB_D = ⌊z(LP_KP)⌋ e di Martello-Toth UB_MT = max{UB_0, UB_1}
 *   oc-kp-approx   capitolo «Approximation algorithms for the knapsack problem»: GR, GR^e (Ext-Greedy), H^2 e
 *                  Basic-FPTAS FP^ε (profitti scalati p'_j = ⌊p_j / K⌋, K = ε GR^e(I) / n, PD sui profitti u(j,q))
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
  const { PASSO, parPasso, vaiA, clamp, somma, lista, nuovoId, osservaDimensioni, nuovaVoce, dim, pix, disegno, daIndirizzo, chiedi, interi } = O;
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
  /** decimale esatto se il denominatore ha solo i fattori 2 e 5, altrimenti frazione ≈ decimale */
  function decTex(q) {
    let d = q.d;
    while (d % 2 === 0) d /= 2;
    while (d % 5 === 0) d /= 5;
    if (d === 1) return GI.num(q.n / q.d, 4);
    return `${M.Qtex(q)} \\approx ${GI.num(q.n / q.d, 3)}`;
  }
  /** rapporto a/b in TeX, con «=» se esatto a due decimali e «≈» altrimenti */
  const rapp = (a, b) => (Math.abs(Math.round(a / b * 100) - a / b * 100) < 1e-9 ? "= " : "\\approx ") + GI.num(a / b, 2);
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
  /** le carte degli oggetti, in fila: stato(j) -> {col, op, bordo, spesso, righe: [testo, …], sotto} */
  function carte(d, C, fs, n, x0, y, L, h, stato) {
    const gap = clamp(L * 0.012, 4, 10), cw = Math.min((L - gap * (n - 1)) / n, 150);
    const tot = n * cw + (n - 1) * gap, xs = x0 + (L - tot) / 2;
    for (let j = 1; j <= n; j++) {
      const s = stato(j), x = xs + (j - 1) * (cw + gap);
      d.rect(x, y, cw, h, { strokeColor: s.bordo || C.line, strokeWidth: s.spesso ? 3.5 : 1.4, fillColor: s.col || "none", fillOpacity: s.col ? s.op ?? 0.3 : 0, dash: s.dash || 0 });
      const righe = s.righe;
      righe.forEach((r, i) => d.text(x + cw / 2, y + h * (i + 0.75) / (righe.length + 0.5), r, { fontSize: i === 0 ? fs * 1.08 : fs, strokeColor: i === 0 ? C.testo : C.muted, cssStyle: i === 0 ? "font-weight:800" : "" }));
      if (s.sotto) d.text(x + cw / 2, y + h + fs * 0.95, s.sotto, { fontSize: fs * 0.88, strokeColor: s.sottoCol || C.muted, cssStyle: "font-weight:700" });
    }
    return { cw, xs, gap };
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

  // =================================================================
  // 3. ALGORITMI DI APPROSSIMAZIONE (capitolo «Approximation algorithms for the knapsack problem»)
  // =================================================================
  const SPLIT = { p: [6, 5, 8, 9, 6, 7, 3], w: [2, 3, 6, 7, 5, 9, 4] };
  const AP_ES = {
    gr: [
      { nome: T("esempio 35.2 (c = 9)", "Example 35.2 (c = 9)"), p: SPLIT.p, w: SPLIT.w, c: 9 },
      { nome: T("esempio 35.3 (c = 10)", "Example 35.3 (c = 10)"), p: [6, 8, 19, 4], w: [2, 3, 9, 5], c: 10 },
      { nome: T("esempio 35.4 (c = 10)", "Example 35.4 (c = 10)"), p: [4, 6, 5, 12, 3], w: [1, 2, 2, 6, 2], c: 10 },
      { nome: T("esempio 35.5 (c = 21)", "Example 35.5 (c = 21)"), p: [4, 6, 4, 3, 2, 20], w: [1, 2, 2, 2, 2, 21], c: 21 },
      { nome: T("esercizio 35.1 (c = 15)", "Exercise 35.1 (c = 15)"), p: [12, 6, 6, 8, 6], w: [3, 2, 3, 9, 7], c: 15 },
      { nome: T("esercizio 35.2 (c = 13)", "Exercise 35.2 (c = 13)"), p: [10, 6, 3, 7, 11, 2], w: [1, 1, 1, 4, 8, 3], c: 13 },
      { nome: T("esercizio 35.3 (c = 12)", "Exercise 35.3 (c = 12)"), p: [8, 7, 18, 14, 10], w: [3, 3, 9, 8, 7], c: 12 },
    ],
    gre: [
      { nome: T("esempio 35.6 (c = 9)", "Example 35.6 (c = 9)"), p: SPLIT.p, w: SPLIT.w, c: 9 },
      { nome: T("esempio 35.7 (c = 10)", "Example 35.7 (c = 10)"), p: [6, 8, 19, 4], w: [2, 3, 9, 5], c: 10 },
      { nome: T("esercizio 35.4 (c = 22)", "Exercise 35.4 (c = 22)"), p: [11, 5, 3, 4, 3], w: [8, 4, 3, 9, 8], c: 22 },
      { nome: T("esercizio 35.5 (c = 8)", "Exercise 35.5 (c = 8)"), p: [16, 19, 18, 14, 8], w: [5, 8, 8, 7, 6], c: 8 },
      { nome: T("esercizio 35.6 (c = 16)", "Exercise 35.6 (c = 16)"), p: [2, 8, 8], w: [1, 8, 8], c: 16 },
    ],
    h2: [
      { nome: T("esempio 35.8 (c = 12)", "Example 35.8 (c = 12)"), p: SPLIT.p, w: SPLIT.w, c: 12 },
      { nome: T("esercizio 35.7 (c = 11)", "Exercise 35.7 (c = 11)"), p: [8, 9, 2, 3, 2], w: [5, 8, 3, 7, 9], c: 11 },
      { nome: T("esercizio 35.8 (c = 15)", "Exercise 35.8 (c = 15)"), p: [14, 9, 5, 10, 15], w: [1, 1, 2, 5, 8], c: 15 },
      { nome: T("esercizio 35.9 (c = 10)", "Exercise 35.9 (c = 10)"), p: [13, 5, 8, 5, 7], w: [1, 1, 3, 2, 5], c: 10 },
    ],
    fp: [
      { nome: T("esempio 35.10 (c = 8, ε = 1/2)", "Example 35.10 (c = 8, ε = 1/2)"), p: [19, 19, 14, 14], w: [2, 4, 3, 3], c: 8, e20: 10 },
      { nome: T("esercizio 35.13 (c = 13, ε = 1/2)", "Exercise 35.13 (c = 13, ε = 1/2)"), p: [24, 11, 23, 5], w: [2, 3, 9, 3], c: 13, e20: 10 },
      { nome: T("esercizio 35.14 (c = 16, ε = 1/2)", "Exercise 35.14 (c = 16, ε = 1/2)"), p: [14, 12, 14, 18], w: [3, 4, 5, 7], c: 16, e20: 10 },
      { nome: T("esercizio 35.15 (c = 16, ε = 1/4)", "Exercise 35.15 (c = 16, ε = 1/4)"), p: [14, 12, 14, 18], w: [3, 4, 5, 7], c: 16, e20: 5 },
    ],
  };
  const AP_NMAX = { gr: 8, gre: 8, h2: 7, fp: 6 };
  const AP_FUNZ = {
    gr: { etichetta: T("Greedy \\(GR\\)", "Greedy \\(GR\\)") },
    gre: { etichetta: "Ext-Greedy \\(GR^e\\)" },
    h2: { etichetta: "\\(H^2\\)" },
    fp: { etichetta: "Basic-FPTAS \\(FP^{\\varepsilon}\\)" },
  };
  /** GR sugli oggetti idx (già in ordine di efficienza), capacità c: passi, insieme, valore */
  function grTraccia(p, w, c, idx) {
    let rc = c;
    const passi = [], S = [];
    for (const j of idx) {
      const ok = w[j - 1] <= rc;
      passi.push({ j, ok, rcPrima: rc, rcDopo: ok ? rc - w[j - 1] : rc });
      if (ok) { S.push(j); rc -= w[j - 1]; }
    }
    return { passi, S, val: S.reduce((a, j) => a + p[j - 1], 0), rc };
  }
  /** GR^e sugli oggetti idx: il migliore fra GR e il miglior oggetto singolo (a pari profitto, il primo) */
  function greCalcola(p, w, c, idx) {
    if (!idx.length) return { gr: { passi: [], S: [], val: 0, rc: c }, im: null, pmax: 0, S: [], val: 0, singolo: false };
    const g = grTraccia(p, w, c, idx);
    let im = idx[0];
    for (const j of idx) if (p[j - 1] > p[im - 1]) im = j;
    const singolo = g.val < p[im - 1];
    return { gr: g, im, pmax: p[im - 1], S: singolo ? [im] : g.S, val: singolo ? p[im - 1] : g.val, singolo };
  }
  function h2Calcola(p, w, c) {
    const n = p.length, tutti = [...Array(n).keys()].map((j) => j + 1);
    const g0 = greCalcola(p, w, c, tutti);
    let lb = g0.pmax, best = [g0.im], ib = -1;
    const coppie = [];
    for (let i = 1; i <= n; i++) for (let k = i + 1; k <= n; k++) {
      const q = { i, k, peso: w[i - 1] + w[k - 1] };
      if (q.peso > c) { q.ok = false; q.lb = lb; q.best = best; q.ib = ib; coppie.push(q); continue; }
      q.ok = true; q.rc = c - q.peso;
      q.res = tutti.filter((j) => j !== i && j !== k && p[j - 1] <= Math.min(p[i - 1], p[k - 1]) && w[j - 1] <= q.rc);
      q.g = greCalcola(p, w, q.rc, q.res);
      q.val = p[i - 1] + p[k - 1] + q.g.val;
      q.sol = [i, k].concat(q.g.S).sort((a, b) => a - b);
      q.lbPrima = lb;
      q.migliora = q.val > lb;
      if (q.migliora) { lb = q.val; best = q.sol; ib = coppie.length; }
      q.lb = lb; q.best = best; q.ib = ib;
      coppie.push(q);
    }
    return { g0, coppie, lb, best };
  }
  function fpCalcola(p, w, c, e20) {
    const n = p.length, tutti = [...Array(n).keys()].map((j) => j + 1), g = greCalcola(p, w, c, tutti), lb = g.val;
    const K = M.Q(e20 * lb, 20 * n), ps = p.map((pj) => Math.floor((pj * 20 * n) / (e20 * lb)));
    const Qmax = Math.floor((40 * n) / e20), Pp = somma(ps), Pm = Math.min(Pp, Qmax);
    const u = [new Array(Pm + 1).fill(Infinity)];
    u[0][0] = 0;
    for (let j = 1; j <= n; j++) {
      const r = u[j - 1].slice();
      for (let q = 0; q <= Pm; q++) if (ps[j - 1] <= q && u[j - 1][q - ps[j - 1]] + w[j - 1] < r[q]) r[q] = u[j - 1][q - ps[j - 1]] + w[j - 1];
      u.push(r);
    }
    let qs = 0;
    for (let q = 0; q <= Pm; q++) if (u[n][q] <= c) qs = q;
    const S = [], cammino = [];
    let q = qs;
    for (let j = n; j >= 1; j--) { cammino.push([j, q]); if (u[j][q] !== u[j - 1][q]) { S.push(j); q -= ps[j - 1]; } }
    cammino.push([0, q]);
    S.reverse();
    const att = [];
    for (let qq = 0; qq <= Pm; qq++) if (u[n][qq] < Infinity) att.push(qq);
    const colonne = Pm + 1 <= 24 ? [...Array(Pm + 1).keys()] : att;
    return { g, lb, K, ps, Qmax, Pp, Pm, u, qs, S, cammino, colonne, tutteColonne: colonne.length === Pm + 1, val: S.reduce((a, j) => a + p[j - 1], 0), e20 };
  }
  const epsTex = (e20) => M.Qtex(M.Q(e20, 20));
  /** stato dell'app di approssimazione: istanza della voce, calcolo, passo */
  function apStato(st) {
    const D = st.dati, voce = st.chiave() || "gr";
    D.istA = D.istA || {};
    if (!D.istA[voce]) D.istA[voce] = Object.assign(copia(AP_ES[voce][0]), { id: nuovoId(), es: 0 });
    const I = D.istA[voce], e20 = voce === "fp" ? clamp(Math.round((st.p().varepsilon || 0.5) * 20), 1, 19) : 0;
    const firma = [voce, I.id, e20].join("|");
    if (D.apFirma !== firma) {
      D.apFirma = firma;
      const Or = ordina(I), { p, w, c } = Or, n = p.length, tutti = [...Array(n).keys()].map((j) => j + 1);
      const R = { voce, Or, p, w, c, n, opt: ottimo(p, w, c) };
      if (voce === "gr" || voce === "gre") { R.g = greCalcola(p, w, c, tutti); R.K = voce === "gr" ? n : n + 2; }
      else if (voce === "h2") { R.h = h2Calcola(p, w, c); R.K = R.h.coppie.length + 1; }
      else { R.f = fpCalcola(p, w, c, e20); R.K = n + 3; }
      D.ap = R;
    }
    const R = D.ap, k = M.passoK(st, R.K, PASSO);
    return { D, R, k, I, voce };
  }

  window.GI_RICETTE["oc-kp-approx"] = {
    titolo: T("Zaino 0/1: algoritmi di approssimazione", "0/1 KP: approximation algorithms"),
    funzioni: AP_FUNZ,
    etichettaFunzioni: T("Algoritmo", "Algorithm"),
    parametri: [
      parPasso(T("◀ ▶ un passo alla volta, «Esegui» per vederli tutti", "◀ ▶ one step at a time, «Run» to watch them all"), 0),
      { k: "varepsilon", nome: "\\varepsilon", min: 0.1, max: 0.9, step: 0.05, val: 0.5, colore: "d", cifre: 2, descr: T("accuratezza dell'FPTAS: garanzia \\(\\frac{1}{1-\\varepsilon}\\), tabella di \\(n \\times \\lfloor 2n/\\varepsilon \\rfloor\\) celle al più", "accuracy of the FPTAS: guarantee \\(\\frac{1}{1-\\varepsilon}\\), table of at most \\(n \\times \\lfloor 2n/\\varepsilon \\rfloor\\) cells") },
    ],
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [-1, 10, 20, -2],
    legenda: (st) => {
      const C = M.COL(st), v = st.chiave();
      const L = [[C.a, T("oggetto o passo corrente", "current item or step"), ""]];
      if (v === "gr" || v === "gre") L.push([C.b, T("scelto da \\(GR\\)", "selected by \\(GR\\)"), "pieno"], [C.grigio, T("scartato: \\(w_j > \\mathit{rc}\\)", "rejected: \\(w_j > \\mathit{rc}\\)"), "pieno"]);
      if (v === "gre") L.push([C.viola, T("miglior oggetto singolo \\(\\bar{S}\\)", "best single item \\(\\bar{S}\\)"), "pieno"]);
      if (v === "h2") L.push([C.viola, T("coppia \\((i,k)\\) fissata", "fixed pair \\((i,k)\\)"), "pieno"], [C.b, T("insieme residuo \\(\\mathscr{I}(i,k)\\) e scelta di \\(GR^e\\)", "residual set \\(\\mathscr{I}(i,k)\\) and choice of \\(GR^e\\)"), "dashed"]);
      if (v === "fp") L.push([C.b, T("righe della tabella \\(u(j,q)\\) già calcolate", "rows of the table \\(u(j,q)\\) already computed"), "pieno"], [C.a, T("soluzione di \\(FP^{\\varepsilon}\\)", "solution of \\(FP^{\\varepsilon}\\)"), "pieno"]);
      L.push([C.blu, T("migliore soluzione / ottimo \\(\\tilde{S}\\)", "best solution / optimum \\(\\tilde{S}\\)"), "pieno"]);
      return L;
    },
    monta(board, st) {
      const D = st.dati;
      nuovaVoce(st, 0);
      const voce = st.chiave();
      O.mostraCursore(st, "varepsilon", voce === "fp");
      const nuova = (I, es = -1) => {
        D.istA[st.chiave()] = Object.assign(I, { id: nuovoId(), es });
        if (I.e20) { const i = M.inputDi(st, "varepsilon"); if (i) i.value = I.e20 / 20; }
        vaiA(st, 0); M.ferma(st); st.aggiorna();
      };
      M.comandi(st, [
        [T("Casuale", "Random"), T("dati casuali con le ipotesi del capitolo", "random data with the assumptions of the chapter"), () => nuova(casuale(4, AP_NMAX[st.chiave()] - 1, st.chiave() === "fp" ? 16 : 24))],
        [T("Modifica…", "Edit…"), T("scrivi profitti, pesi e capacità", "type profits, weights and capacity"), () => {
          const v = st.chiave(), J = modifica(D.istA[v], 3, AP_NMAX[v], v === "fp" ? 30 : 60);
          if (J) nuova(J);
        }],
      ], { k: PASSO, ritmo: 900 });
      apStato(st);
      O.menuIstanze(st, AP_ES[voce].map((e) => [e.nome, ""]), () => (D.istA && D.istA[st.chiave()] ? D.istA[st.chiave()].es : 0),
        (i) => { const E = AP_ES[st.chiave()][i], I = copia(E); if (E.e20) I.e20 = E.e20; nuova(I, i); });
      if (voce === "fp" && D.istA.fp && D.istA.fp.e20 && D.istA.fp.es >= 0 && !D.epsFatto) {
        D.epsFatto = true;
        const i = M.inputDi(st, "varepsilon");
        if (i) i.value = D.istA.fp.e20 / 20;
      }
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = apStato(st), C = M.COL(st), [W, H] = dim(board), { R, k, voce } = S;
      O.mostraCursore(st, "varepsilon", voce === "fp");
      M.ridisegna(board, st, [S.D.apFirma, k, M.scuro(), W, H].join("|"), (crea) => {
        pix(board);
        const d = disegno(crea, H), fs = clamp(Math.min(W / 58, H / 36), 11, 15), pad = 16;
        const { p, w, c, n } = R, L = W - 2 * pad, ch = clamp(H * 0.19, 56, 100), cy = 14;
        const riga2 = (j) => `p=${p[j - 1]}  w=${w[j - 1]}`;
        const lw = clamp(W * 0.2, 120, 220), tx0 = pad + lw, TL = W - tx0 - pad - 30, th = clamp(H * 0.09, 28, 54);
        const etichetta = (y, testo, col) => d.text(tx0 - 10, y + th / 2, testo, { anchorX: "right", fontSize: fs, strokeColor: col, cssStyle: "font-weight:700" });
        const blocchiDi = (Sx, col, op = 0.4) => Sx.map((j) => ({ w: w[j - 1], col, op, corto: String(j), lungo: `${j}: p=${p[j - 1]}` }));
        const residuo = (y, v, rc) => { if (rc > 0) d.text((v.fine + tx0 + c * v.u) / 2, y + th / 2, `rc = ${rc}`, { fontSize: fs * 0.9, strokeColor: C.muted, cssStyle: "font-style:italic" }); };
        if (voce === "gr" || voce === "gre") {
          const G = R.g, gp = G.gr.passi, kk = Math.min(k, n);
          carte(d, C, fs, n, pad, cy, L, ch, (j) => {
            const st1 = gp[j - 1], fatto = j <= kk, att = j === kk && k <= n;
            const fin = voce === "gre" && k === n + 2, inSol = fin && G.S.includes(j);
            const s1 = { righe: [`${T("oggetto", "item")} ${j}`, riga2(j), `p/w = ${frTxt(M.Q(p[j - 1], w[j - 1]))}`] };
            if (fatto) Object.assign(s1, st1.ok ? { col: C.b, op: 0.32, sotto: "✓" } : { col: C.grigio, op: 0.25, sotto: `✗ w > rc = ${st1.rcPrima}` });
            if (att) Object.assign(s1, { bordo: C.a, spesso: true });
            if (voce === "gre" && k >= n + 1 && j === G.im) Object.assign(s1, { bordo: C.viola, spesso: true, sotto: (st1.ok ? "✓ " : "") + "pₘₐₓ", sottoCol: C.viola });
            if (inSol) Object.assign(s1, { bordo: C.blu, spesso: true });
            return s1;
          });
          let y = cy + ch + fs * 2.8;
          const Sg = gp.slice(0, kk).filter((q) => q.ok).map((q) => q.j), rcg = kk ? gp[kk - 1].rcDopo : c;
          etichetta(y, `GR: ${T("valore", "value")} ${somma(Sg.map((j) => p[j - 1]))}`, C.b);
          let v = vassoio(d, C, fs, tx0, y, TL, th, c, blocchiDi(Sg, C.b));
          residuo(y, v, rcg);
          d.text(tx0 + TL + 6, y - 8, `c = ${c}`, { anchorX: "right", fontSize: fs * 0.85, strokeColor: C.muted });
          if (voce === "gre" && k >= n + 1) {
            y += th * 1.7;
            etichetta(y, `${T("oggetto singolo", "single item")}: ${G.pmax}`, C.viola);
            v = vassoio(d, C, fs, tx0, y, TL, th, c, blocchiDi([G.im], C.viola));
          }
          if (k === R.K) {
            y += th * 1.7;
            if (voce === "gre") {
              etichetta(y, `GRᵉ: ${G.val}`, C.a);
              vassoio(d, C, fs, tx0, y, TL, th, c, blocchiDi(G.S, C.a, 0.45));
              y += th * 1.7;
            }
            etichetta(y, `${T("ottimo", "optimum")} z(I) = ${R.opt.z}`, C.blu);
            v = vassoio(d, C, fs, tx0, y, TL, th, c, blocchiDi(R.opt.S, C.blu, 0.4));
          }
        } else if (voce === "h2") {
          const Hh = R.h, cp = Hh.coppie, q = k >= 1 && k <= cp.length ? cp[k - 1] : null, fin = k === R.K;
          carte(d, C, fs, n, pad, cy, L, ch, (j) => {
            const s1 = { righe: [`${T("oggetto", "item")} ${j}`, riga2(j), `p/w = ${frTxt(M.Q(p[j - 1], w[j - 1]))}`] };
            if (q && (j === q.i || j === q.k)) Object.assign(s1, { col: C.viola, op: 0.38, bordo: q.ok ? C.viola : C.grigio, spesso: true, sotto: T("fissato", "fixed"), sottoCol: C.viola });
            else if (q && q.ok && q.res.includes(j)) Object.assign(s1, { bordo: C.b, spesso: true, dash: 2, col: q.g.S.includes(j) ? C.b : null, op: 0.32, sotto: q.g.S.includes(j) ? T("✓ GRᵉ", "✓ GRᵉ") : T("residuo", "residual"), sottoCol: C.b });
            if (fin && Hh.best.includes(j)) Object.assign(s1, { bordo: C.blu, spesso: true, col: C.blu, op: 0.25, dash: 0 });
            return s1;
          });
          // a sinistra i vassoi, a destra la matrice delle coppie
          const mx0 = Math.round(W * 0.6), y0 = cy + ch + fs * 2.8;
          const lw2 = clamp(W * 0.15, 100, 170), t0 = pad + lw2, TL2 = mx0 - t0 - 40;
          const et2 = (y, testo, col) => d.text(t0 - 10, y + th / 2, testo, { anchorX: "right", fontSize: fs, strokeColor: col, cssStyle: "font-weight:700" });
          let y = y0;
          if (q && q.ok) {
            et2(y, `(${q.i},${q.k}): lb = ${q.val}`, C.a);
            const v = vassoio(d, C, fs, t0, y, TL2, th, c, blocchiDi([q.i, q.k], C.viola).concat(blocchiDi(q.g.S, C.b)));
            if (c - q.peso - somma(q.g.S.map((j) => w[j - 1])) > 0) d.text((v.fine + t0 + c * v.u) / 2, y + th / 2, `rc = ${c - q.peso - somma(q.g.S.map((j) => w[j - 1]))}`, { fontSize: fs * 0.85, strokeColor: C.muted, cssStyle: "font-style:italic" });
          } else if (q) {
            et2(y, `(${q.i},${q.k})`, C.grigio);
            vassoio(d, C, fs, t0, y, TL2, th, c, blocchiDi([q.i, q.k], C.grigio, 0.35), { scala: Math.max(c, q.peso) * 1.0 });
            d.text(t0 + TL2 / 2, y + th + fs * 0.9, T(`wᵢ + wₖ = ${q.peso} > c = ${c}: coppia non ammissibile`, `wᵢ + wₖ = ${q.peso} > c = ${c}: infeasible pair`), { fontSize: fs * 0.9, strokeColor: C.muted });
          }
          y += th * 2;
          const best = q ? q.best : fin ? Hh.best : [Hh.g0.im], lbv = q ? q.lb : Hh.lb;
          et2(y, `${T("migliore", "best")}: lb = ${lbv}`, C.blu);
          vassoio(d, C, fs, t0, y, TL2, th, c, blocchiDi(best, C.blu, 0.4));
          if (fin) {
            y += th * 2;
            et2(y, `${T("ottimo", "optimum")} z(I) = ${R.opt.z}`, C.blu);
            vassoio(d, C, fs, t0, y, TL2, th, c, blocchiDi(R.opt.S, C.blu, 0.25));
          }
          // matrice delle coppie (i, k), i < k
          const mL = W - mx0 - pad, mH = H - y0 - fs * 2, cs = Math.min((mL - 24) / (n - 1), (mH - 24) / (n - 1), 54);
          const gx = mx0 + 24, gy = y0 + 18;
          d.text(gx + (n - 1) * cs / 2, y0 - fs * 0.4, T("le coppie (i, k): lb(i, k)", "the pairs (i, k): lb(i, k)"), { fontSize: fs * 0.9, strokeColor: C.muted, cssStyle: "font-style:italic" });
          for (let kk = 2; kk <= n; kk++) d.text(gx + (kk - 2 + 0.5) * cs, gy - 8, `k=${kk}`, { fontSize: fs * 0.92, strokeColor: C.muted });
          for (let i = 1; i < n; i++) d.text(gx - 4, gy + (i - 0.5) * cs, `i=${i}`, { anchorX: "right", fontSize: fs * 0.92, strokeColor: C.muted });
          cp.forEach((c1, idx) => {
            const xx = gx + (c1.k - 2) * cs, yy = gy + (c1.i - 1) * cs, vista = idx < k, att = idx === k - 1;
            const ib = q ? q.ib : fin && cp.length ? cp[cp.length - 1].ib : -1, migl = vista && idx === ib;
            d.rect(xx + 1, yy + 1, cs - 2, cs - 2, { strokeColor: att ? C.a : C.line, strokeWidth: att ? 3.5 : 1, fillColor: migl ? C.blu : !vista ? "none" : c1.ok ? C.b : C.grigio, fillOpacity: !vista ? 0 : migl ? 0.5 : c1.ok ? 0.22 : 0.25 });
            if (vista) d.text(xx + cs / 2, yy + cs / 2, c1.ok ? String(c1.val) : "✗", { fontSize: clamp(cs * 0.34, 8, 14), strokeColor: c1.ok ? C.testo : C.muted, cssStyle: migl ? "font-weight:800" : "" });
          });
        } else {
          const F = R.f, scalati = k >= 2, riga = k >= 3 ? Math.min(n, k - 2) : -1, fin = k === R.K;
          carte(d, C, fs, n, pad, cy, L, ch, (j) => {
            const s1 = { righe: [`${T("oggetto", "item")} ${j}`, riga2(j), scalati ? `p′ = ${F.ps[j - 1]}` : `p/w = ${frTxt(M.Q(p[j - 1], w[j - 1]))}`] };
            if (k === 1 && F.g.S.includes(j)) Object.assign(s1, { col: C.b, op: 0.3, sotto: "GRᵉ", sottoCol: C.b });
            if (riga === j && !fin) Object.assign(s1, { bordo: C.a, spesso: true });
            if (fin) {
              if (F.S.includes(j)) Object.assign(s1, { col: C.a, op: 0.35, sotto: "FPᵋ", sottoCol: C.a });
              if (R.opt.S.includes(j)) Object.assign(s1, { bordo: C.blu, spesso: true });
            }
            return s1;
          });
          const y0 = cy + ch + fs * 2.6;
          if (k === 0) {
            d.text(W / 2, y0 + fs * 2, T(`ε = ${GI.numTxt(F.e20 / 20, 2)}: prima il lower bound GRᵉ(I), poi i profitti scalati, poi la PD sui profitti`, `ε = ${GI.numTxt(F.e20 / 20, 2)}: first the lower bound GRᵉ(I), then the scaled profits, then the DP by profits`), { fontSize: fs, strokeColor: C.muted });
          } else if (k === 1) {
            etichetta(y0, `GRᵉ(I) = ${F.lb}`, C.b);
            vassoio(d, C, fs, tx0, y0, TL, th, c, blocchiDi(F.g.S, C.b));
          } else {
            // la tabella u(j, q)
            const cols = F.colonne, lwt = clamp(W * 0.17, 104, 170), tx = pad + lwt, tw = W - tx - pad, ty = y0 + fs * 0.6;
            const cw = Math.min(tw / cols.length, 54), rh = Math.min((H - ty - fs * 2.6) / (n + 2), 40), fc = clamp(Math.min(cw * 0.42, rh * 0.5), 7, 14);
            d.text(tx - 8, ty + rh / 2, "q →", { anchorX: "right", fontSize: fs, strokeColor: C.muted, cssStyle: "font-style:italic" });
            cols.forEach((qq, i) => d.text(tx + (i + 0.5) * cw, ty + rh / 2, String(qq), { fontSize: fc, strokeColor: qq === F.qs && fin ? C.blu : C.muted, cssStyle: "font-weight:700" }));
            const percorso = new Set(F.cammino.map(([j, qq]) => j + ":" + qq));
            for (let j = 0; j <= n; j++) {
              const yy = ty + (j + 1) * rh, calc = j === 0 || j <= riga, att = j === riga && !fin;
              d.text(tx - 8, yy + rh / 2, j === 0 ? "u(0, q)" : `u(${j}, q)  p′=${F.ps[j - 1]}, w=${w[j - 1]}`, { anchorX: "right", fontSize: fs * 0.88, strokeColor: att ? C.a : C.testo, cssStyle: att ? "font-weight:800" : "" });
              if (calc) d.rect(tx, yy, cols.length * cw, rh, { strokeColor: att ? C.a : C.line, strokeWidth: att ? 2.5 : 1, fillColor: att ? C.a : C.b, fillOpacity: att ? 0.22 : 0.08 });
              cols.forEach((qq, i) => {
                const xx = tx + i * cw, v = F.u[j][qq];
                d.rect(xx, yy, cw, rh, { strokeColor: C.line, strokeWidth: 0.8 });
                if (fin && percorso.has(j + ":" + qq)) d.rect(xx + 1, yy + 1, cw - 2, rh - 2, { strokeColor: C.blu, strokeWidth: 2.5, fillColor: C.blu, fillOpacity: j === n ? 0.45 : 0.18 });
                if (calc) d.text(xx + cw / 2, yy + rh / 2, v === Infinity ? "∞" : String(v), { fontSize: fc, strokeColor: v === Infinity ? C.muted : fin && j === n && v <= c ? C.testo : C.testo, cssStyle: fin && j === n && v <= c ? "font-weight:800" : "" });
              });
            }
            const nota = F.tutteColonne ? T(`q = 0, …, ${F.Pm}`, `q = 0, …, ${F.Pm}`) : T(`solo i valori di q raggiungibili (q fino a ${F.Pm})`, `only the attainable values of q (q up to ${F.Pm})`);
            d.text(tx, ty + (n + 2) * rh + fs * 0.9, nota + `;  Q = ⌊2n/ε⌋ = ${F.Qmax}` + (fin ? T(`;  in blu il percorso della ricostruzione da u(${n}, ${F.qs})`, `;  in blue the reconstruction path from u(${n}, ${F.qs})`) : ""), { anchorX: "left", fontSize: fs * 0.85, strokeColor: C.muted });
          }
        }
      });
    },
    formula(pp, st) {
      const { R, k, voce } = apStato(st), { p, w, c, n } = R;
      if (voce === "gr" || voce === "gre") {
        const G = R.g, gp = G.gr.passi;
        if (k === 0) return `\\mathit{rc} = c = ${c}, \\qquad x_j = 0 \\ \\text{${T("per ogni", "for every")} } j`;
        if (k <= n) {
          const q = gp[k - 1], j = q.j;
          return q.ok ? `w_{${j}} = ${w[j - 1]} \\le \\mathit{rc} = ${q.rcPrima} \\;\\Rightarrow\\; x_{${j}} = 1, \\quad \\mathit{rc} = ${q.rcPrima} - ${w[j - 1]} = ${q.rcDopo}`
            : `w_{${j}} = ${w[j - 1]} > \\mathit{rc} = ${q.rcPrima} \\;\\Rightarrow\\; x_{${j}} = 0`;
        }
        if (k === n + 1) return `p_{\\max} = \\max\\{p_i : i \\in \\mathscr{I}\\} = p_{${G.im}} = ${G.pmax}, \\qquad \\bar{S} = \\{${G.im}\\}`;
        return `GR^e(I) = \\max\\{GR(I),\\ p_{\\max}\\} = \\max\\{${G.gr.val},\\ ${G.pmax}\\} = ${G.val}, \\qquad \\frac{z(I)}{GR^e(I)} = \\frac{${R.opt.z}}{${G.val}} ${rapp(R.opt.z, G.val)} \\le 2`;
      }
      if (voce === "h2") {
        const Hh = R.h, cp = Hh.coppie;
        if (k === 0) return `lb = p_{\\max} = ${Hh.g0.pmax}, \\qquad |\\mathscr{P}| = ${cp.filter((q) => q.ok).length} \\ \\text{${T("coppie ammissibili su", "feasible pairs out of")} } \\tbinom{${n}}{2} = ${cp.length}`;
        if (k <= cp.length) {
          const q = cp[k - 1];
          if (!q.ok) return `(${q.i},${q.k}):\\quad w_{${q.i}} + w_{${q.k}} = ${q.peso} > c = ${c}`;
          return `(${q.i},${q.k}):\\ \\mathit{rc} = ${c} - ${w[q.i - 1]} - ${w[q.k - 1]} = ${q.rc},\\ \\mathscr{I}(${q.i},${q.k}) = ${setTex(q.res)},\\ GR^e\\big(I(${q.i},${q.k})\\big) = ${q.g.val},\\ lb(${q.i},${q.k}) = ${p[q.i - 1]} + ${p[q.k - 1]} + ${q.g.val} = ${q.val}`;
        }
        return `H^2(I) = ${Hh.lb}, \\qquad z(I) = ${R.opt.z}, \\qquad \\frac{z(I)}{H^2(I)} ${rapp(R.opt.z, Hh.lb)} \\le \\tfrac{4}{3}`;
      }
      const F = R.f, eps = epsTex(F.e20);
      if (k === 0) return `\\varepsilon = ${eps}, \\qquad n = ${n}, \\qquad c = ${c}`;
      if (k === 1) return `lb = GR^e(I) = ${F.lb} \\qquad (S = ${setTex(F.g.S)})`;
      if (k === 2) return `K = \\frac{\\varepsilon\\, GR^e(I)}{n} = \\frac{${eps} \\cdot ${F.lb}}{${n}} = ${decTex(F.K)}, \\quad p'_j = \\left\\lfloor \\frac{p_j}{K} \\right\\rfloor:\\ p' = (${F.ps.join(", ")}), \\quad Q = \\lfloor 2n/\\varepsilon \\rfloor = ${F.Qmax}`;
      if (k <= n + 2) { const j = k - 2; return `u(${j},q) = \\min\\big\\{u(${j - 1},q),\\ w_{${j}} + u(${j - 1},q - p'_{${j}})\\big\\} = \\min\\big\\{u(${j - 1},q),\\ ${w[j - 1]} + u(${j - 1},q - ${F.ps[j - 1]})\\big\\}`; }
      const g = 1 / (1 - F.e20 / 20);
      return `\\max\\{q : u(${n},q) \\le ${c}\\} = ${F.qs}, \\ S = ${setTex(F.S)}, \\ FP^{\\varepsilon}(I) = ${F.val}, \\ \\frac{z(I)}{FP^{\\varepsilon}(I)} = \\frac{${R.opt.z}}{${F.val}} ${rapp(R.opt.z, F.val)} \\le \\frac{1}{1-\\varepsilon} = ${GI.num(g, 2)}`;
    },
    letture(pp, st) {
      const { R, k, voce } = apStato(st), C = M.COL(st), { p, w, c, n } = R;
      let nota = "", righe = [];
      if (voce === "gr" || voce === "gre") {
        const G = R.g, gp = G.gr.passi;
        if (k === 0) nota = (voce === "gr"
          ? T("Il greedy \\(GR\\) esamina gli oggetti in ordine di efficienza non crescente e inserisce ogni oggetto che entra nella capacità residua \\(\\mathit{rc}\\).", "The greedy algorithm \\(GR\\) examines the items by non-increasing efficiency and inserts every item that fits in the residual capacity \\(\\mathit{rc}\\).")
          : T("Ext-Greedy \\(GR^e\\): prima il greedy \\(GR\\), poi il confronto con il miglior oggetto singolo; restituisce la migliore delle due soluzioni.", "Ext-Greedy \\(GR^e\\): first the greedy \\(GR\\), then the comparison with the best single item; it returns the better of the two solutions.")) + nota0(R.Or);
        else if (k <= n) {
          const q = gp[k - 1];
          nota = q.ok ? T(`Oggetto ${q.j}: \\(w_{${q.j}} = ${w[q.j - 1]} \\le \\mathit{rc} = ${q.rcPrima}\\), ${M.tinta(C.b, "scelto")}; ora \\(\\mathit{rc} = ${q.rcDopo}\\).`, `Item ${q.j}: \\(w_{${q.j}} = ${w[q.j - 1]} \\le \\mathit{rc} = ${q.rcPrima}\\), ${M.tinta(C.b, "selected")}; now \\(\\mathit{rc} = ${q.rcDopo}\\).`)
            : T(`Oggetto ${q.j}: \\(w_{${q.j}} = ${w[q.j - 1]} > \\mathit{rc} = ${q.rcPrima}\\), ${M.tinta(C.muted, "non entra")}; il greedy prosegue con gli altri.`, `Item ${q.j}: \\(w_{${q.j}} = ${w[q.j - 1]} > \\mathit{rc} = ${q.rcPrima}\\), ${M.tinta(C.muted, "it does not fit")}; the greedy goes on with the others.`);
          if (k === n) nota += T(` Fine: \\(S = ${setTex(G.gr.S)}\\), \\(GR(I) = ${sommaTex(G.gr.S.map((j) => p[j - 1]))} = ${G.gr.val}\\), un lower bound su \\(z(I)\\).`, ` End: \\(S = ${setTex(G.gr.S)}\\), \\(GR(I) = ${sommaTex(G.gr.S.map((j) => p[j - 1]))} = ${G.gr.val}\\), a lower bound on \\(z(I)\\).`)
            + (voce === "gr" ? T(` L'ottimo è \\(z(I) = ${R.opt.z}\\) (\\(\\tilde{S} = ${setTex(R.opt.S)}\\)). \\(GR\\) non ha una garanzia costante: il rapporto \\(z(I)/GR(I)\\) può essere grande quanto si vuole.`, ` The optimum is \\(z(I) = ${R.opt.z}\\) (\\(\\tilde{S} = ${setTex(R.opt.S)}\\)). \\(GR\\) has no constant guarantee: the ratio \\(z(I)/GR(I)\\) can be arbitrarily large.`) : "");
        } else if (k === n + 1) nota = T(`Il miglior oggetto singolo è ${M.tinta(C.viola, `\\(\\bar{S} = \\{${G.im}\\}\\)`)}, con \\(p_{\\max} = ${G.pmax}\\): entra da solo perché \\(w_{${G.im}} \\le c\\).`, `The best single item is ${M.tinta(C.viola, `\\(\\bar{S} = \\{${G.im}\\}\\)`)}, with \\(p_{\\max} = ${G.pmax}\\): it fits alone since \\(w_{${G.im}} \\le c\\).`);
        else nota = (G.singolo ? T(`\\(${G.gr.val} < ${G.pmax}\\): \\(GR^e\\) sostituisce la soluzione greedy con \\(\\bar{S} = \\{${G.im}\\}\\).`, `\\(${G.gr.val} < ${G.pmax}\\): \\(GR^e\\) replaces the greedy solution with \\(\\bar{S} = \\{${G.im}\\}\\).`)
          : T(`\\(${G.gr.val} \\ge ${G.pmax}\\): \\(GR^e\\) tiene la soluzione greedy \\(S = ${setTex(G.gr.S)}\\).`, `\\(${G.gr.val} \\ge ${G.pmax}\\): \\(GR^e\\) keeps the greedy solution \\(S = ${setTex(G.gr.S)}\\).`))
          + T(` L'ottimo è \\(z(I) = ${R.opt.z}\\) (\\(\\tilde{S} = ${setTex(R.opt.S)}\\)); la garanzia di \\(GR^e\\) è \\(z(I)/GR^e(I) \\le 2\\).`, ` The optimum is \\(z(I) = ${R.opt.z}\\) (\\(\\tilde{S} = ${setTex(R.opt.S)}\\)); the guarantee of \\(GR^e\\) is \\(z(I)/GR^e(I) \\le 2\\).`);
        const fGR = k >= n, fGRe = k === n + 2;
        righe = [["\\(GR(I)\\)", fGR ? `\\(${G.gr.val}\\)` : "—"]];
        if (voce === "gre") righe.push(["\\(p_{\\max}\\)", k >= n + 1 ? `\\(${G.pmax}\\)` : "—"], ["\\(GR^e(I)\\)", fGRe ? `\\(${G.val}\\)` : "—"]);
        const fine = k === R.K, val = voce === "gr" ? G.gr.val : G.val;
        righe.push(["\\(z(I)\\)", fine ? `\\(${R.opt.z}\\)` : "—"], [voce === "gr" ? "\\(z(I)/GR(I)\\)" : "\\(z(I)/GR^e(I)\\)", fine ? `\\(${GI.num(R.opt.z / val, 3)}\\)` : "—"],
          [T("garanzia", "guarantee"), voce === "gr" ? T("nessuna costante", "no constant") : "\\(2\\)"]);
      } else if (voce === "h2") {
        const Hh = R.h, cp = Hh.coppie;
        if (k === 0) nota = T(`\\(H^2\\) prova tutte le coppie \\((i,k)\\), \\(i<k\\): fissa \\(i\\) e \\(k\\) nello zaino e completa con \\(GR^e\\) sull'istanza residua \\(I(i,k)\\), che tiene solo gli oggetti con \\(p_j \\le \\min\\{p_i,p_k\\}\\) e \\(w_j \\le \\mathit{rc}\\). Si parte da \\(lb = p_{\\max} = ${Hh.g0.pmax}\\).`,
          `\\(H^2\\) tries all the pairs \\((i,k)\\), \\(i<k\\): it fixes \\(i\\) and \\(k\\) in the knapsack and completes with \\(GR^e\\) on the residual instance \\(I(i,k)\\), which keeps only the items with \\(p_j \\le \\min\\{p_i,p_k\\}\\) and \\(w_j \\le \\mathit{rc}\\). It starts from \\(lb = p_{\\max} = ${Hh.g0.pmax}\\).`) + nota0(R.Or);
        else if (k <= cp.length) {
          const q = cp[k - 1];
          if (!q.ok) nota = T(`Coppia \\((${q.i},${q.k})\\): \\(w_{${q.i}} + w_{${q.k}} = ${q.peso} > c\\), non ammissibile.`, `Pair \\((${q.i},${q.k})\\): \\(w_{${q.i}} + w_{${q.k}} = ${q.peso} > c\\), not feasible.`);
          else nota = T(`Coppia \\((${q.i},${q.k})\\): capacità residua \\(${q.rc}\\), insieme residuo \\(\\mathscr{I}(${q.i},${q.k}) = ${setTex(q.res)}\\), \\(GR^e\\) vi sceglie \\(${setTex(q.g.S)}\\) di valore \\(${q.g.val}\\). Quindi \\(lb(${q.i},${q.k}) = ${q.val}\\)`, `Pair \\((${q.i},${q.k})\\): residual capacity \\(${q.rc}\\), residual set \\(\\mathscr{I}(${q.i},${q.k}) = ${setTex(q.res)}\\), \\(GR^e\\) selects \\(${setTex(q.g.S)}\\) of value \\(${q.g.val}\\). Hence \\(lb(${q.i},${q.k}) = ${q.val}\\)`)
            + (q.migliora ? T(` \\(> ${q.lbPrima}\\): ${M.tinta(C.blu, "lb diventa " + q.val)}.`, ` \\(> ${q.lbPrima}\\): ${M.tinta(C.blu, "lb becomes " + q.val)}.`) : ` \\(\\le lb = ${q.lb}\\).`);
        } else nota = T(`Tutte le coppie esaminate: \\(H^2(I) = ${Hh.lb}\\) con \\(S = ${setTex(Hh.best)}\\). L'ottimo è \\(z(I) = ${R.opt.z}\\) (\\(\\tilde{S} = ${setTex(R.opt.S)}\\)); la garanzia di \\(H^2\\) è \\(\\tfrac43\\).`,
          `All the pairs examined: \\(H^2(I) = ${Hh.lb}\\) with \\(S = ${setTex(Hh.best)}\\). The optimum is \\(z(I) = ${R.opt.z}\\) (\\(\\tilde{S} = ${setTex(R.opt.S)}\\)); the guarantee of \\(H^2\\) is \\(\\tfrac43\\).`);
        const q = k >= 1 && k <= cp.length ? cp[k - 1] : null, fine = k === R.K;
        righe = [[T("coppie esaminate", "pairs examined"), `\\(${Math.min(k, cp.length)} / ${cp.length}\\)`], ["\\(lb\\)", `\\(${q ? q.lb : fine ? Hh.lb : Hh.g0.pmax}\\)`],
          ["\\(GR^e(I)\\)", `\\(${Hh.g0.val}\\)`], ["\\(z(I)\\)", fine ? `\\(${R.opt.z}\\)` : "—"], ["\\(z(I)/H^2(I)\\)", fine ? `\\(${GI.num(R.opt.z / Hh.lb, 3)}\\)` : "—"], [T("garanzia", "guarantee"), "\\(\\tfrac43\\)"]];
      } else {
        const F = R.f, eps = epsTex(F.e20), g = 1 / (1 - F.e20 / 20);
        if (k === 0) nota = T(`Basic-FPTAS \\(FP^{\\varepsilon}\\) con \\(\\varepsilon = ${eps}\\): scala i profitti (non i pesi) e risolve l'istanza scalata in modo esatto con la PD sui profitti. Le soluzioni ammissibili non cambiano, cambia solo la funzione obiettivo.`,
          `Basic-FPTAS \\(FP^{\\varepsilon}\\) with \\(\\varepsilon = ${eps}\\): it scales the profits (not the weights) and solves the scaled instance exactly with the DP by profits. The feasible solutions do not change, only the objective function does.`) + nota0(R.Or);
        else if (k === 1) nota = T(`Il lower bound è \\(GR^e(I) = ${F.lb}\\) (\\(S = ${setTex(F.g.S)}\\)): serve a fissare la scala, e \\(z(I) \\le 2\\,GR^e(I)\\).`, `The lower bound is \\(GR^e(I) = ${F.lb}\\) (\\(S = ${setTex(F.g.S)}\\)): it fixes the scale, and \\(z(I) \\le 2\\,GR^e(I)\\).`);
        else if (k === 2) nota = T(`Fattore di scala \\(K = ${decTex(F.K)}\\) e profitti scalati \\(p'_j = \\lfloor p_j/K \\rfloor\\). Il profitto scalato totale è \\(P' = ${F.Pp}\\)${F.Pp <= F.Qmax ? `, non più di \\(Q = ${F.Qmax}\\): il troncamento non agisce` : `: la tabella si tronca a \\(Q = ${F.Qmax}\\)`}.`,
          `Scaling factor \\(K = ${decTex(F.K)}\\) and scaled profits \\(p'_j = \\lfloor p_j/K \\rfloor\\). The total scaled profit is \\(P' = ${F.Pp}\\)${F.Pp <= F.Qmax ? `, not larger than \\(Q = ${F.Qmax}\\): the truncation does not act` : `: the table is truncated at \\(Q = ${F.Qmax}\\)`}.`)
          + T(` Riga \\(j = 0\\): \\(u(0,0) = 0\\), \\(u(0,q) = \\infty\\) per \\(q \\ge 1\\).`, ` Row \\(j = 0\\): \\(u(0,0) = 0\\), \\(u(0,q) = \\infty\\) for \\(q \\ge 1\\).`);
        else if (k <= n + 2) { const j = k - 2; nota = T(`Riga \\(j = ${j}\\): \\(u(${j},q)\\) è il peso minimo di un sottoinsieme di \\(\\{1,\\dots,${j}\\}\\) con profitto scalato esattamente \\(q\\); l'oggetto ${j} ha \\(p'_{${j}} = ${F.ps[j - 1]}\\) e \\(w_{${j}} = ${w[j - 1]}\\).`, `Row \\(j = ${j}\\): \\(u(${j},q)\\) is the minimum weight of a subset of \\(\\{1,\\dots,${j}\\}\\) with scaled profit exactly \\(q\\); item ${j} has \\(p'_{${j}} = ${F.ps[j - 1]}\\) and \\(w_{${j}} = ${w[j - 1]}\\).`); }
        else nota = T(`Il più grande \\(q\\) con \\(u(${n},q) \\le c = ${c}\\) è \\(q = ${F.qs}\\), di peso \\(${F.u[n][F.qs]}\\): \\(FP^{\\varepsilon}\\) restituisce \\(S = ${setTex(F.S)}\\), di profitto vero \\(${F.val}\\). L'ottimo è \\(z(I) = ${R.opt.z}\\) (\\(\\tilde{S} = ${setTex(R.opt.S)}\\))${F.val === R.opt.z ? ": la soluzione è ottima." : ": la scala ha nascosto la differenza."}`,
          `The largest \\(q\\) with \\(u(${n},q) \\le c = ${c}\\) is \\(q = ${F.qs}\\), of weight \\(${F.u[n][F.qs]}\\): \\(FP^{\\varepsilon}\\) returns \\(S = ${setTex(F.S)}\\), of true profit \\(${F.val}\\). The optimum is \\(z(I) = ${R.opt.z}\\) (\\(\\tilde{S} = ${setTex(R.opt.S)}\\))${F.val === R.opt.z ? ": the solution is optimal." : ": the scaling has hidden the difference."}`);
        const fine = k === R.K;
        righe = [["\\(\\varepsilon\\)", `\\(${eps}\\)`], ["\\(GR^e(I)\\)", k >= 1 ? `\\(${F.lb}\\)` : "—"], ["\\(K\\)", k >= 2 ? `\\(${decTex(F.K)}\\)` : "—"],
          ["\\(FP^{\\varepsilon}(I)\\)", fine ? `\\(${F.val}\\)` : "—"], ["\\(z(I)\\)", fine ? `\\(${R.opt.z}\\)` : "—"], ["\\(z(I)/FP^{\\varepsilon}(I)\\)", fine ? `\\(${GI.num(R.opt.z / F.val, 3)}\\)` : "—"],
          [T("garanzia \\(\\frac{1}{1-\\varepsilon}\\)", "guarantee \\(\\frac{1}{1-\\varepsilon}\\)"), `\\(${GI.num(g, 3)}\\)`], [T("celle della tabella", "cells of the table"), k >= 2 ? `\\(${n} \\times ${F.Pm + 1}\\)` : "—"]];
      }
      return nota + M.tab([T("algoritmo", "algorithm"), T("valore", "value")], righe, -1, C.a);
    },
    domanda: T("Confronta i quattro algoritmi sull'istanza degli esempi 35.1 e 35.8 (stessi oggetti, \\(c = 9\\) e \\(c = 12\\)). Nell'FPTAS sposta \\(\\varepsilon\\): come cambiano \\(K\\), i profitti scalati e la larghezza della tabella?",
      "Compare the four algorithms on the instance of Examples 35.1 and 35.8 (same items, \\(c = 9\\) and \\(c = 12\\)). In the FPTAS move \\(\\varepsilon\\): how do \\(K\\), the scaled profits and the width of the table change?"),
  };

  window.GI_OC_D = { ordina, ottimo, enumCalcola, lpCalcola, grTraccia, greCalcola, h2Calcola, fpCalcola, ENUM_ES, LP_ES, AP_ES };
})();
