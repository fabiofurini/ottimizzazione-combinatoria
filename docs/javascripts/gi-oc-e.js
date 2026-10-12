/* Laboratorio di «Ottimizzazione combinatoria / Combinatorial Optimization»: lot sizing e colorazione esatta.
 *
 *   oc-wagner-whitin  lot sizing senza capacità (ULS): la ricorrenza v(t) = min_j {v(j-1) + c_{j,t}} di Wagner e
 *                     Whitin, un confronto alla volta (DP_WW_InfoSol del capitolo «DP for the uncapacitated lot
 *                     sizing problem»), sulla matrice c[j][t] e sulla rete dei lotti di produzione (nodi 0..m,
 *                     arco (j-1, t) di costo c_{j,t}); poi la ricostruzione con r[t] (DP_WW_SolComputation)
 *   oc-dsatur-bb      colorazione dei vertici: il branch-and-bound DSATUR del capitolo «Vertex coloring: the DSATUR
 *                     branch-and-bound», nodo per nodo, con la stessa numerazione della tabella del capitolo
 *                     (riferimento: DSATUR_BB_CODE/dsatur_bb.py)
 *
 * Notazione del corso: d_t, sc_t, vc_t, hc_t, D_{j,t}, c_{j,t}, v(t), r[t]; colorazione: q(k), sat_k(v), du_k(v),
 * F_k(v), UB (DSATUR), LB = |K| (clique greedy pre-colorata). Le funzioni di calcolo sono in window.GI_OC_E.
 * Verde riservato ai tagli: qui non si usa.
 */
(function () {
  "use strict";
  const GI = window.GI, M = window.GI_MIP, O = window.GI_OC;
  const T = GI.T;
  const { PASSO, parPasso, vaiA, clamp, lista, nuovoId, osservaDimensioni, dim, pix, disegno, daIndirizzo, chiedi } = O;
  window.GI_RICETTE = window.GI_RICETTE || {};
  /** spezzata in pixel (origine in alto a sinistra) */
  const spezz = (crea, H, P, a) => crea("curve", [P.map((p) => p[0]), P.map((p) => H - p[1])], Object.assign({ fixed: true, highlight: false, strokeWidth: 1 }, a));
  /** interi ≥ 0 da una stringa; null se non validi */
  const naturali = (s) => {
    const v = String(s).split(/[\s,]+/).filter(Boolean).map(Number);
    return v.length && v.every((x) => Number.isInteger(x) && x >= 0) ? v : null;
  };
  const INF = "+\\infty";

  // =================================================================
  // 1. WAGNER-WHITIN PER IL LOT SIZING SENZA CAPACITÀ (ULS)
  // =================================================================
  const WW_ES = [
    { nome: T("esempio 1 del capitolo (m = 5)", "Example 1 of the chapter (m = 5)"), d: [20, 10, 30, 40, 10], sc: [50, 50, 50, 50, 50], vc: [0, 0, 0, 0, 0], hc: [1, 1, 1, 1, 1] },
    { nome: T("esercizio 25.1 (m = 4)", "Exercise 25.1 (m = 4)"), d: [30, 10, 40, 10], sc: [50, 80, 70, 60], vc: [2, 3, 1, 2], hc: [1, 2, 2, 1] },
    { nome: T("esercizio 25.2 (m = 4)", "Exercise 25.2 (m = 4)"), d: [30, 40, 10, 20], sc: [50, 80, 80, 50], vc: [1, 3, 2, 1], hc: [1, 1, 1, 2] },
    { nome: T("esercizio 25.3 (m = 5)", "Exercise 25.3 (m = 5)"), d: [10, 30, 40, 30, 40], sc: [70, 80, 50, 80, 50], vc: [1, 1, 1, 1, 2], hc: [1, 1, 2, 1, 2] },
  ];
  /** CostMatrix, DP_WW_InfoSol (un passo per ogni confronto e uno per ogni v[t]) e DP_WW_SolComputation */
  function wwCalcola(I) {
    const { d, sc, vc, hc } = I, m = d.length;
    const D = (j, t) => { let s = 0; for (let k = j; k <= t; k++) s += d[k - 1]; return s; };
    const c = Array.from({ length: m + 1 }, () => new Array(m + 1).fill(null));
    for (let j = 1; j <= m; j++) {
      let u = vc[j - 1], g = sc[j - 1] + vc[j - 1] * d[j - 1];
      c[j][j] = g;
      for (let t = j + 1; t <= m; t++) { u += hc[t - 2]; g += u * d[t - 1]; c[j][t] = g; }
    }
    const v = [0], r = [null], passi = [];
    for (let t = 1; t <= m; t++) {
      let b = Infinity, a = 0;
      for (let j = 1; j <= t; j++) {
        const val = v[j - 1] + c[j][t], prima = b, agg = val < b;
        if (agg) { b = val; a = j; }
        passi.push({ tipo: "j", t, j, val, prima, agg, b, a });
      }
      v[t] = b; r[t] = a;
      passi.push({ tipo: "v", t, b, a });
    }
    const N = passi.length, x = new Array(m).fill(0);
    let t = m;
    while (t > 0) {
      const j = r[t];
      x[j - 1] = D(j, t);
      passi.push({ tipo: "r", t, j, q: x[j - 1], x: x.slice() });
      t = j - 1;
    }
    const s = [];
    let cum = 0;
    for (let k = 1; k <= m; k++) { cum += x[k - 1] - d[k - 1]; s.push(cum); }
    const setup = x.reduce((acc, xi, i) => acc + (xi > 0 ? sc[i] : 0), 0);
    const prod = x.reduce((acc, xi, i) => acc + vc[i] * xi, 0);
    const hold = s.reduce((acc, si, i) => acc + hc[i] * si, 0);
    return { m, c, v, r, D, passi, N, K: passi.length, x, s, setup, prod, hold };
  }
  /** c_{j,t} = sc_j + vc_j D_{j,t} + Σ_{k=j}^{t-1} hc_k D_{k+1,t}, scritto per esteso (TeX) */
  function costoTex(I, R, j, t) {
    const pz = [`${I.sc[j - 1]}`, `${I.vc[j - 1]}\\cdot ${R.D(j, t)}`];
    for (let k = j; k < t; k++) pz.push(`${I.hc[k - 1]}\\cdot ${R.D(k + 1, t)}`);
    return `c_{${j},${t}} = ${pz.join(" + ")} = ${R.c[j][t]}`;
  }
  function wwCasuale() {
    const m = M.casuale(4, 6), d = [], sc = [], vc = [], hc = [];
    for (let t = 0; t < m; t++) { d.push(10 * M.casuale(1, 5)); sc.push(10 * M.casuale(5, 9)); vc.push(M.casuale(0, 3)); hc.push(M.casuale(1, 2)); }
    return { d, sc, vc, hc };
  }
  const wwCopia = (E) => ({ d: E.d.slice(), sc: E.sc.slice(), vc: E.vc.slice(), hc: E.hc.slice() });
  function wwStato(st) {
    const D = st.dati;
    if (!D.ww) D.ww = Object.assign(wwCopia(WW_ES[0]), { id: nuovoId(), es: 0 });
    const I = D.ww;
    if (D.wwId !== I.id) { D.wwId = I.id; D.wwR = wwCalcola(I); }
    const R = D.wwR, k = M.passoK(st, R.K, PASSO);
    return { D, I, R, k, cur: k >= 1 ? R.passi[k - 1] : null };
  }
  /** istanza iniziale da un link: #ist=2 (indice nel menu «Istanza») */
  const istDaIndirizzo = (st, voci) => {
    if (st.dati.istLetta) return -1;
    st.dati.istLetta = true;
    const m = /ist=(\d+)/.exec(decodeURIComponent(location.hash || ""));
    return m && +m[1] < voci.length ? +m[1] : -1;
  };
  const vTex = (x) => (x === Infinity ? INF : String(x));

  window.GI_RICETTE["oc-wagner-whitin"] = {
    titolo: T("Wagner-Whitin per il lot sizing senza capacità", "Wagner-Whitin for uncapacitated lot sizing"),
    parametri: [parPasso(T("◀ ▶ un confronto alla volta, «Esegui» per vederli tutti", "◀ ▶ one comparison at a time, «Run» to watch them all"), 0)],
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [-1, 10, 20, -2],
    legenda: (st) => {
      const C = M.COL(st);
      return [
        [C.a, T("lotto in esame: \\(v(j-1)+c_{j,t}\\)", "run under examination: \\(v(j-1)+c_{j,t}\\)"), ""],
        [C.b, T("lotti già provati per \\(v(t)\\)", "runs already tried for \\(v(t)\\)"), "dashed"],
        [C.rosso, T("il migliore finora (\\(b\\), \\(a\\))", "the best so far (\\(b\\), \\(a\\))"), ""],
        [C.blu, T("\\(r[t]\\): ultimo lotto scelto; poi il piano ottimo \\(\\tilde{x}\\)", "\\(r[t]\\): last run chosen; then the optimal plan \\(\\tilde{x}\\)"), ""],
      ];
    },
    monta(board, st) {
      const D = st.dati, i0 = istDaIndirizzo(st, WW_ES);
      if (i0 >= 0) D.ww = Object.assign(wwCopia(WW_ES[i0]), { id: nuovoId(), es: i0 });
      const nuova = (I, es = -1) => { D.ww = Object.assign(I, { id: nuovoId(), es }); vaiA(st, 0); M.ferma(st); st.aggiorna(); };
      M.comandi(st, [
        [T("Casuale", "Random"), T("dati casuali", "random data"), () => nuova(wwCasuale())],
        [T("Modifica…", "Edit…"), T("scrivi i dati dell'istanza", "type the data of the instance"), () => {
          const I = D.ww, attuale = [I.d, I.sc, I.vc, I.hc].map((v) => v.join(" ")).join(" ; ");
          const s = chiedi(T("Domande d, costi di setup sc, costi variabili vc, costi di stoccaggio hc, separati da «;» (da 2 a 7 periodi):",
            "Demands d, setup costs sc, variable costs vc, holding costs hc, separated by «;» (2 to 7 periods):"), attuale);
          if (!s) return;
          const P = s.split(";").map((x) => naturali(x || ""));
          const ok = P.length === 4 && P.every(Boolean) && P.every((v) => v.length === P[0].length) && P[0].length >= 2 && P[0].length <= 7
            && P[0].every((x) => x >= 1 && x <= 999) && P.every((v) => v.every((x) => x <= 999));
          if (!ok) { window.alert(T("Dati non validi: quattro vettori di interi ≥ 0 della stessa lunghezza (da 2 a 7), domande ≥ 1.", "Invalid data: four vectors of integers ≥ 0 of the same length (2 to 7), demands ≥ 1.")); return; }
          nuova({ d: P[0], sc: P[1], vc: P[2], hc: P[3] });
        }],
      ], { k: PASSO, ritmo: 700 });
      D.nuovaWW = nuova;
      O.menuIstanze(st, WW_ES.map((e) => [e.nome, ""]), () => (D.ww ? D.ww.es : 0), (i) => nuova(wwCopia(WW_ES[i]), i));
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = wwStato(st), C = M.COL(st), [W, H] = dim(board), { I, R, k, cur } = S, m = R.m;
      if (S.D.nuovaWW) O.menuIstanze(st, WW_ES.map((e) => [e.nome, ""]), () => I.es, (i) => S.D.nuovaWW(wwCopia(WW_ES[i]), i));
      M.ridisegna(board, st, [S.D.wwId, k, M.scuro(), W, H].join("|"), (crea) => {
        pix(board);
        const d = disegno(crea, H);
        /** etichetta allineata a destra in xr, con il pedice (testo SVG: niente HTML, che si sposta in verticale) */
        const etich = (xr, y, base, ped, a) => {
          const f = a.fontSize, it = "font-style:italic;";
          if (ped) d.text(xr, y + 0.32 * f, ped, Object.assign({}, a, { anchorX: "right", fontSize: 0.72 * f, cssStyle: it }));
          d.text(xr - (ped ? 0.32 * f * ped.length + 1 : 0), y, base, Object.assign({}, a, { anchorX: "right", cssStyle: it }));
        };
        // ------------------------------------------------ stato del passo
        const fatti = R.passi.slice(0, k);
        const vNoto = new Array(m + 1).fill(false);
        vNoto[0] = true;
        for (const p of fatti) if (p.tipo === "v") vNoto[p.t] = true;
        const tc = cur && cur.tipo !== "r" ? cur.t : null;
        const jc = cur && cur.tipo === "j" ? cur.j : null;
        const jMax = cur && cur.tipo === "j" ? cur.j : cur && cur.tipo === "v" ? cur.t : 0;
        const best = cur && cur.tipo !== "r" ? cur.a : null;
        const rec = fatti.filter((p) => p.tipo === "r");
        const xcur = rec.length ? rec[rec.length - 1].x : null;
        const sulCammino = (j, t) => rec.some((p) => p.j === j && p.t === t);
        const nodoCammino = (i) => rec.some((p) => p.t === i || p.j - 1 === i);
        /** stile dell'arco (j-1, t) e della cella c[j][t] */
        const stile = (j, t) => {
          if (sulCammino(j, t)) return { col: C.blu, w: 4.5, lab: true, fill: 0.45 };
          if (tc === t && j <= jMax) {
            if (j === jc) return { col: C.a, w: 3.5, lab: true, fill: 0.55 };
            if (cur.tipo === "v" && j === best) return { col: C.blu, w: 4, lab: true, fill: 0.4 };
            if (j === best) return { col: C.rosso, w: 3, lab: true, fill: 0.2 };
            return { col: C.b, w: 2, lab: true, dash: 3, fill: 0.1 };
          }
          if (vNoto[t] && R.r[t] === j) return { col: C.blu, w: 1.8, op: 0.6, fill: 0.14 };
          return null;
        };
        // ------------------------------------------------ colonna di sinistra: dati e matrice c[j][t]
        const pad = 10, top = 14, Lw = clamp(W * 0.42, 250, 540);
        const lab = clamp(Lw * 0.2, 54, 84), cw = (Lw - lab - pad) / m;
        const rh = clamp((H - top - 24) / (m + 6.6), 15, 36);
        const fs = clamp(Math.min(rh * 0.5, cw * 0.3), 9, 15), fl = clamp(fs * 0.95, 9, 14);
        const cx = (t) => lab + (t - 0.5) * cw;
        const cella = (x, y, w, h, a) => d.rect(x + 1, y + 1, w - 2, h - 2, Object.assign({ strokeColor: C.line, strokeWidth: 1, fillColor: "none", fillOpacity: 0 }, a));
        const righe = [[["t", ""], null], [["d", "t"], I.d], [["sc", "t"], I.sc], [["vc", "t"], I.vc], [["hc", "t"], I.hc]];
        // periodi coperti dal lotto in esame (j..t), o dal lotto della ricostruzione
        const lotto = jc ? [jc, tc] : cur && cur.tipo === "v" ? [cur.a, cur.t] : cur && cur.tipo === "r" ? [cur.j, cur.t] : null;
        righe.forEach(([nm, val], i) => {
          const y = top + i * rh;
          etich(lab - 8, y + rh / 2, nm[0], nm[1], { fontSize: fl, strokeColor: i ? C.testo : C.muted });
          for (let t = 1; t <= m; t++) {
            const dentro = i === 1 && lotto && t >= lotto[0] && t <= lotto[1];
            if (i) cella(lab + (t - 1) * cw, y, cw, rh, dentro ? { fillColor: cur.tipo === "j" ? C.a : C.blu, fillOpacity: 0.22 } : {});
            d.text(cx(t), y + rh / 2, i ? String(val[t - 1]) : String(t), { fontSize: fs, strokeColor: i ? C.testo : C.muted, cssStyle: i ? "" : "font-weight:700" });
          }
        });
        const y0 = top + 5.6 * rh;
        etich(lab - 8, y0 + rh / 2, "c[j][t]", "", { fontSize: fl, strokeColor: C.muted });
        for (let t = 1; t <= m; t++) d.text(cx(t), y0 + rh / 2, `t=${t}`, { fontSize: fl, strokeColor: tc === t ? C.a : C.muted, cssStyle: "font-weight:700" });
        for (let j = 1; j <= m; j++) {
          const y = y0 + j * rh;
          d.text(lab - 8, y + rh / 2, `j=${j}`, { anchorX: "right", fontSize: fl, strokeColor: C.muted, cssStyle: "font-weight:600" });
          for (let t = 1; t <= m; t++) {
            if (j > t) { d.text(cx(t), y + rh / 2, "−", { fontSize: fs, strokeColor: C.grigio }); continue; }
            const s = stile(j, t);
            cella(lab + (t - 1) * cw, y, cw, rh, s ? { strokeColor: s.col, strokeWidth: s.w > 2.5 ? 3 : 2, dash: s.dash || 0, fillColor: s.col, fillOpacity: s.fill } : {});
            d.text(cx(t), y + rh / 2, String(R.c[j][t]), { fontSize: fs, strokeColor: C.testo, cssStyle: s && s.w > 2.5 ? "font-weight:800" : "" });
          }
        }
        // ------------------------------------------------ colonna di destra: la rete dei lotti e i vettori v, r, x̃
        const x0 = Lw + 26, lab2 = 58, Rw = W - x0 - pad;
        const sp = (Rw - lab2) / (m + 1), xs = (i) => x0 + lab2 + (i + 0.5) * sp;
        const tabH = 4 * rh + 10, yAx = H - tabH - clamp(rh * 1.6, 30, 50), hmax = yAx - top - 30;
        const rn = clamp(sp * 0.2, 10, 16);
        const archi = [];
        for (let t = 1; t <= m; t++) for (let j = 1; j <= t; j++) archi.push([j, t]);
        const forma = (j, t) => {
          const a = xs(j - 1), b = xs(t), s = t - j + 1, h = hmax * (0.16 + 0.84 * (m > 1 ? (s - 1) / (m - 1) : 0));
          const P = [];
          for (let i = 0; i <= 36; i++) { const u = i / 36; P.push([a + (b - a) * u, yAx - h * Math.sin(Math.PI * u)]); }
          return { P, xm: (a + b) / 2, ym: yAx - h };
        };
        d.text(x0, top + 4, T("rete dei lotti: arco (j−1, t) di costo c(j,t)", "network of the production runs: arc (j−1, t) of cost c(j,t)"), { anchorX: "left", fontSize: fl, strokeColor: C.muted, cssStyle: "font-style:italic" });
        const conStile = [];
        for (const [j, t] of archi) {
          const s = stile(j, t), f = forma(j, t);
          if (!s) spezz(crea, H, f.P, { strokeColor: C.grigio, strokeWidth: 1, strokeOpacity: 0.4 });
          else conStile.push([j, t, s, f]);
        }
        conStile.sort((A, B) => A[2].w - B[2].w);
        for (const [, , s, f] of conStile) spezz(crea, H, f.P, { strokeColor: s.col, strokeWidth: s.w, strokeOpacity: s.op || 1, dash: s.dash || 0 });
        for (const [j, t, s, f] of conStile) if (s.lab) {
          d.rect(f.xm - 19, f.ym - 9 - 8, 38, 16, { strokeColor: "none", fillColor: M.scuro() ? "#1e2a3a" : "#ffffff", fillOpacity: 0.9 });
          d.text(f.xm, f.ym - 9, String(R.c[j][t]), { fontSize: fl, strokeColor: s.col, cssStyle: "font-weight:800" });
        }
        for (let i = 0; i <= m; i++) {
          const camm = nodoCammino(i), att = i === tc, sorg = jc && i === jc - 1;
          d.dot(xs(i), yAx, rn, { fillColor: camm ? C.blu : vNoto[i] ? C.b : (M.scuro() ? "#1b2636" : "#ffffff"), fillOpacity: camm ? 0.9 : vNoto[i] ? 0.35 : 1,
            strokeColor: att || sorg ? C.a : camm ? C.blu : C.muted, strokeWidth: att || sorg ? 3.5 : 1.8 });
          d.text(xs(i), yAx, String(i), { fontSize: clamp(rn * 0.95, 10, 15), strokeColor: camm ? "#ffffff" : C.testo, cssStyle: "font-weight:800;pointer-events:none" });
        }
        // vettori sotto la rete, allineati ai nodi
        const yt = H - tabH;
        const vr = [[["v(t)", ""], (i) => (vNoto[i] ? String(R.v[i]) : "")], [["r[t]", ""], (i) => (i > 0 && vNoto[i] ? String(R.r[i]) : i ? "" : "−")],
          [["x̃", "t"], (i) => (i === 0 ? "−" : xcur ? String(xcur[i - 1]) : "")]];
        vr.forEach(([nm, f], q) => {
          const y = yt + q * rh;
          etich(xs(0) - sp / 2 - 6, y + rh / 2, nm[0], nm[1], { fontSize: fl, strokeColor: C.muted });
          for (let i = 0; i <= m; i++) {
            let a = {};
            if (q === 0 && cur && cur.tipo === "j" && i === cur.j - 1) a = { strokeColor: C.a, strokeWidth: 3 };
            if ((q === 0 || q === 1) && cur && cur.tipo === "v" && i === cur.t) a = { strokeColor: C.blu, strokeWidth: 3, fillColor: C.blu, fillOpacity: 0.25 };
            if (q === 1 && cur && cur.tipo === "r" && i === cur.t) a = { strokeColor: C.blu, strokeWidth: 3 };
            if (q === 2 && cur && cur.tipo === "r" && i === cur.j) a = { strokeColor: C.blu, strokeWidth: 3, fillColor: C.blu, fillOpacity: 0.25 };
            cella(xs(i) - sp / 2, y, sp, rh, a);
            d.text(xs(i), y + rh / 2, f(i), { fontSize: fs, strokeColor: C.testo, cssStyle: a.strokeWidth ? "font-weight:800" : "" });
          }
        });
        if (k === R.K) {
          d.text(W - pad, H - 0.5 * rh, T(`costo di x̃ = ${R.setup} + ${R.prod} + ${R.hold} = ${R.v[m]}`, `cost of x̃ = ${R.setup} + ${R.prod} + ${R.hold} = ${R.v[m]}`),
            { anchorX: "right", fontSize: clamp(fs * 1.1, 11, 16), strokeColor: C.blu, cssStyle: "font-weight:800" });
        }
      });
    },
    formula(p, st) {
      const S = wwStato(st), { R, k, cur } = S, m = R.m;
      if (!cur) return T("v(0) = 0, \\qquad v(t) = \\min\\big\\{\\, v(j-1) + c_{j,t} : j \\in \\{1,\\dots,t\\} \\big\\}", "v(0) = 0, \\qquad v(t) = \\min\\big\\{\\, v(j-1) + c_{j,t} : j \\in \\{1,\\dots,t\\} \\big\\}");
      if (cur.tipo === "j") {
        const { t, j, val, prima, agg } = cur;
        return `v(${j - 1}) + c_{${j},${t}} = ${R.v[j - 1]} + ${R.c[j][t]} = ${val}` +
          (agg ? ` < ${vTex(prima)} \\;\\Rightarrow\\; b \\leftarrow ${val},\\ a \\leftarrow ${j}` : ` ${val === prima ? "=" : ">"} b = ${prima}`);
      }
      if (cur.tipo === "v") {
        const termini = [];
        for (let j = 1; j <= cur.t; j++) termini.push(`${R.v[j - 1]}+${R.c[j][cur.t]}`);
        return `v(${cur.t}) = \\min\\{${termini.join(",\\ ")}\\} = ${cur.b}, \\qquad r[${cur.t}] = ${cur.a}`;
      }
      const fine = k === R.K;
      return `x_{${cur.j}} \\leftarrow D_{${cur.j},${cur.t}} = ${cur.q}, \\quad t \\leftarrow ${cur.j} - 1 = ${cur.j - 1}` + (fine ? `\\qquad \\tilde{x} = (${R.x.join(", ")})` : "");
    },
    letture(p, st) {
      const S = wwStato(st), { I, R, k, cur } = S, C = M.COL(st), m = R.m;
      let nota;
      if (!cur) {
        nota = T(`\\(m = ${m}\\) periodi. La matrice \\(c\\) dei costi dei lotti è già calcolata (CostMatrix): \\(c_{j,t}\\) è il costo di produrre nel periodo \\(j\\) le domande dei periodi \\(j,\\dots,t\\). `
          + `Ora DP_WW_InfoSol calcola \\(v(1),\\dots,v(${m})\\): per ogni \\(t\\) prova tutti i periodi \\(j\\) dell'ultimo lotto, con \\(b\\) il valore migliore e \\(a\\) il suo periodo. `
          + `Nella rete, \\(v(t)\\) è la lunghezza di un cammino minimo dal nodo 0 al nodo \\(t\\).`,
        `\\(m = ${m}\\) periods. The matrix \\(c\\) of the production-run costs is already computed (CostMatrix): \\(c_{j,t}\\) is the cost of producing in period \\(j\\) the demands of periods \\(j,\\dots,t\\). `
          + `Now DP_WW_InfoSol computes \\(v(1),\\dots,v(${m})\\): for each \\(t\\) it tries every period \\(j\\) of the last production run, with \\(b\\) the best value and \\(a\\) its period. `
          + `In the network, \\(v(t)\\) is the length of a shortest path from node 0 to node \\(t\\).`);
      } else if (cur.tipo === "j") {
        const { t, j, val, prima, agg } = cur;
        nota = (j === 1 ? T(`Periodo \\(t = ${t}\\): \\(b \\leftarrow +\\infty\\), \\(a \\leftarrow 0\\). `, `Period \\(t = ${t}\\): \\(b \\leftarrow +\\infty\\), \\(a \\leftarrow 0\\). `) : "")
          + T(`Ultimo lotto nel periodo \\(${j}\\): produce \\(D_{${j},${t}} = ${R.D(j, t)}\\) unità per i periodi \\(${j},\\dots,${t}\\), con \\(${costoTex(I, R, j, t)}\\). `,
            `Last production run in period \\(${j}\\): it produces \\(D_{${j},${t}} = ${R.D(j, t)}\\) units for periods \\(${j},\\dots,${t}\\), with \\(${costoTex(I, R, j, t)}\\). `)
          + T(`Prima, i periodi \\(1,\\dots,${j - 1}\\) costano ${M.tinta(C.a, `\\(v(${j - 1}) = ${R.v[j - 1]}\\)`)}: in tutto \\(${val}\\). `, `Before it, periods \\(1,\\dots,${j - 1}\\) cost ${M.tinta(C.a, `\\(v(${j - 1}) = ${R.v[j - 1]}\\)`)}: \\(${val}\\) in total. `)
          + (agg ? T(`È meglio di \\(b = ${vTex(prima)}\\): ${M.tinta(C.rosso, `\\(b \\leftarrow ${val}\\), \\(a \\leftarrow ${j}\\)`)}.`, `It is better than \\(b = ${vTex(prima)}\\): ${M.tinta(C.rosso, `\\(b \\leftarrow ${val}\\), \\(a \\leftarrow ${j}\\)`)}.`)
            : val === prima ? T(`Stesso valore di \\(b = ${prima}\\): il confronto stretto tiene \\(a = ${cur.a}\\), il periodo più piccolo (con \\(a = ${j}\\) si avrebbe un altro piano ottimo).`, `Same value as \\(b = ${prima}\\): the strict comparison keeps \\(a = ${cur.a}\\), the smallest period (\\(a = ${j}\\) would give another optimal plan).`)
              : T(`Non migliora \\(b = ${prima}\\).`, `It does not improve \\(b = ${prima}\\).`));
      } else if (cur.tipo === "v") {
        nota = T(`Tutti i periodi \\(j \\le ${cur.t}\\) sono stati provati: ${M.tinta(C.blu, `\\(v(${cur.t}) = ${cur.b}\\), \\(r[${cur.t}] = ${cur.a}\\)`)}. Nella rete l'arco \\((${cur.a - 1}, ${cur.t})\\) chiude un cammino minimo fino al nodo \\(${cur.t}\\).`,
          `All periods \\(j \\le ${cur.t}\\) have been tried: ${M.tinta(C.blu, `\\(v(${cur.t}) = ${cur.b}\\), \\(r[${cur.t}] = ${cur.a}\\)`)}. In the network the arc \\((${cur.a - 1}, ${cur.t})\\) ends a shortest path to node \\(${cur.t}\\).`);
        if (cur.t === m) nota += T(` Il valore ottimo è \\(v(${m}) = ${R.v[m]}\\). Ora si ricostruisce un piano ottimo con il vettore \\(r\\), da \\(t = ${m}\\).`, ` The optimal value is \\(v(${m}) = ${R.v[m]}\\). Now an optimal plan is reconstructed with the vector \\(r\\), from \\(t = ${m}\\).`);
      } else {
        const { t, j, q } = cur;
        nota = T(`\\(t = ${t}\\), \\(r[${t}] = ${j}\\): l'ultimo lotto dei periodi \\(1,\\dots,${t}\\) è nel periodo \\(${j}\\) e copre i periodi \\(${j},\\dots,${t}\\): \\(x_{${j}} \\leftarrow ${q}\\); poi \\(t \\leftarrow ${j - 1}\\).`,
          `\\(t = ${t}\\), \\(r[${t}] = ${j}\\): the last production run of periods \\(1,\\dots,${t}\\) is in period \\(${j}\\) and covers periods \\(${j},\\dots,${t}\\): \\(x_{${j}} \\leftarrow ${q}\\); then \\(t \\leftarrow ${j - 1}\\).`);
        if (k === R.K) nota += T(` Fine (\\(t = 0\\)): il piano ottimo è ${M.tinta(C.blu, `\\(\\tilde{x} = (${R.x.join(", ")})\\)`)}, con scorte \\(s = (${R.s.join(", ")})\\); costo \\(${R.setup}\\) di setup \\(+\\ ${R.prod}\\) di produzione \\(+\\ ${R.hold}\\) di stoccaggio \\(= ${R.v[m]} = v(${m})\\).`,
          ` End (\\(t = 0\\)): the optimal plan is ${M.tinta(C.blu, `\\(\\tilde{x} = (${R.x.join(", ")})\\)`)}, with inventories \\(s = (${R.s.join(", ")})\\); cost \\(${R.setup}\\) for setups \\(+\\ ${R.prod}\\) for production \\(+\\ ${R.hold}\\) for holding \\(= ${R.v[m]} = v(${m})\\).`);
      }
      const confronti = R.passi.slice(0, k).filter((x) => x.tipo === "j").length;
      const righe = [
        [T("confronti \\(v(j-1)+c_{j,t}\\)", "comparisons \\(v(j-1)+c_{j,t}\\)"), `\\(${confronti} / ${m * (m + 1) / 2}\\)`],
        [T(`valore ottimo \\(v(${m})\\)`, `optimal value \\(v(${m})\\)`), k >= R.N ? `\\(${R.v[m]}\\)` : "—"],
        [T("piano ottimo \\(\\tilde{x}\\)", "optimal plan \\(\\tilde{x}\\)"), k === R.K ? `\\((${R.x.join(",")})\\)` : "—"],
      ];
      return nota + M.tab([T("lot sizing senza capacità (ULS)", "uncapacitated lot sizing (ULS)"), T("valore", "value")], righe, -1, C.a);
    },
    domanda: T("Nell'esempio 1, al calcolo di \\(v(5)\\) i periodi \\(j = 3\\) e \\(j = 4\\) danno lo stesso valore: quale piano ottimo si ottiene scegliendo \\(j = 4\\)? Con «Modifica…» prova costi di stoccaggio più alti: i lotti si accorciano?",
      "In Example 1, when \\(v(5)\\) is computed the periods \\(j = 3\\) and \\(j = 4\\) give the same value: which optimal plan does \\(j = 4\\) give? With «Edit…» try higher holding costs: do the production runs get shorter?"),
  };

  // =================================================================
  // 2. BRANCH-AND-BOUND DSATUR PER LA COLORAZIONE DEI VERTICI
  // =================================================================
  const giro = (n, r, a0 = 90) => Array.from({ length: n }, (_, i) => [r * Math.cos((a0 - 360 / n * i) * Math.PI / 180), r * Math.sin((a0 - 360 / n * i) * Math.PI / 180)]);
  const VCP_ES = [
    { nome: T("Petersen (esempio del capitolo)", "Petersen (worked example)"), n: 10,
      E: [[1, 2], [1, 5], [1, 6], [2, 3], [2, 7], [3, 4], [3, 8], [4, 5], [4, 9], [5, 10], [6, 8], [6, 9], [7, 9], [7, 10], [8, 10]], P: giro(5, 2).concat(giro(5, 1)) },
    { nome: T("C5 (esercizio 42.1)", "C5 (Exercise 42.1)"), n: 5, E: [[1, 2], [2, 3], [3, 4], [4, 5], [1, 5]], P: giro(5, 1.4) },
    { nome: T("ruota W5 (esercizio 42.2)", "wheel W5 (Exercise 42.2)"), n: 6, E: [[1, 2], [2, 3], [3, 4], [4, 5], [1, 5], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6]], P: giro(5, 1.6).concat([[0, 0]]) },
    { nome: T("complemento di C7 (es. 42.3)", "complement of C7 (Ex. 42.3)"), n: 7,
      E: [[1, 3], [1, 4], [1, 5], [1, 6], [2, 4], [2, 5], [2, 6], [2, 7], [3, 5], [3, 6], [3, 7], [4, 6], [4, 7], [5, 7]], P: giro(7, 2) },
    { nome: T("7 vertici (esercizio 42.4)", "7 vertices (Exercise 42.4)"), n: 7,
      E: [[1, 2], [1, 3], [1, 4], [1, 7], [2, 3], [2, 7], [3, 6], [4, 5], [4, 6], [5, 6], [5, 7]],
      P: [[0, 2.4], [-1.2, 1.2], [1.2, 1.2], [0, 0.4], [-1, -0.8], [1, -0.8], [-2.6, 2.2]] },
  ];
  /** il branch-and-bound del capitolo, come in dsatur_bb.py: DSATUR per UB, clique greedy pre-colorata, nodi numerati
   *  quando si valutano, figli = colori ammissibili crescenti + colore nuovo, lista a pila, potatura con q ≥ UB */
  function dsaturBB(G) {
    const n = G.n, Nb = Array.from({ length: n + 1 }, () => new Set());
    for (const [a, b] of G.E) { Nb[a].add(b); Nb[b].add(a); }
    const deg = Nb.map((s) => s.size);
    const sat = (col, v) => new Set([...Nb[v]].filter((w) => col[w]).map((w) => col[w])).size;
    const du = (col, v) => [...Nb[v]].filter((w) => !col[w]).length;
    const cand = (col) => { const out = []; for (let v = 1; v <= n; v++) if (!col[v]) out.push({ v, s: sat(col, v), d: du(col, v) }); return out; };
    const scegli = (col) => cand(col).reduce((b, x) => (!b || x.s > b.s || (x.s === b.s && x.d > b.d) ? x : b), null);
    // DSATUR
    let inc = new Array(n + 1).fill(0);
    const passiDS = [];
    for (let i = 0; i < n; i++) {
      const x = scegli(inc), usati = new Set([...Nb[x.v]].filter((w) => inc[w]).map((w) => inc[w]));
      let c = 1;
      while (usati.has(c)) c++;
      inc[x.v] = c;
      passiDS.push(x.v);
    }
    const ordDS = passiDS.slice(), incDS = inc.slice();
    let ub = Math.max(...inc.slice(1));
    const UB0 = ub;
    // clique greedy
    const ord = [...Array(n).keys()].map((i) => i + 1).sort((a, b) => deg[b] - deg[a] || a - b);
    const K = [];
    for (const v of ord) if (K.every((u) => Nb[v].has(u))) K.push(v);
    const lb = K.length, nodi = [];
    if (lb < ub) {
      const radice = new Array(n + 1).fill(0);
      K.forEach((v, i) => { radice[v] = i + 1; });
      nodi.push({ id: 1, padre: null, col: radice, q: lb, ass: null, stato: "lista", ubPrima: ub, ub, figli: [], L: [1] });
      const pila = [0];
      while (pila.length) {
        const i = pila.pop(), nd = nodi[i], col = nd.col;
        const tutti = cand(col), x = scegli(col), v = x.v;
        const usati = new Set([...Nb[v]].filter((w) => col[w]).map((w) => col[w]));
        const q = nd.q, F = [];
        for (let c = 1; c <= q; c++) if (!usati.has(c)) F.push(c);
        nd.ramo = { v, s: x.s, d: x.d, F, pari: tutti.filter((y) => y.s === x.s) };
        const surv = [];
        for (const c of F.concat([q + 1])) {
          const cc = col.slice();
          cc[v] = c;
          const qc = Math.max(q, c);
          const ch = { id: nodi.length + 1, padre: nd.id, col: cc, q: qc, ass: [v, c], ubPrima: ub, ub, figli: [] };
          nd.figli.push(ch.id);
          nodi.push(ch);
          if (qc >= ub) ch.stato = "potato";
          else if (cc.slice(1).every(Boolean)) {
            ub = qc; inc = cc; ch.stato = "incumbent"; ch.ub = ub;
            ch.tolti = [];
            for (const j of pila.filter((j) => nodi[j].q >= ub)) { nodi[j].stato = "tolto"; nodi[j].toltoDa = ch.id; ch.tolti.push(nodi[j].id); pila.splice(pila.indexOf(j), 1); }
          } else { ch.stato = "lista"; surv.push(nodi.length - 1); }
          ch.L = pila.concat(surv.slice().reverse()).map((j) => nodi[j].id);
          if (ub === lb) break;
        }
        if (ub === lb) break;
        for (let j = surv.length - 1; j >= 0; j--) pila.push(surv[j]);
      }
    }
    // posizioni: foglie in ordine, nodi interni al centro dei figli; livello = profondità
    let foglia = 0;
    const pos = (id, liv) => {
      const nd = nodi[id - 1];
      nd.liv = liv;
      if (!nd.figli.length) nd.xp = foglia++;
      else { nd.figli.forEach((f) => pos(f, liv + 1)); nd.xp = (nodi[nd.figli[0] - 1].xp + nodi[nd.figli[nd.figli.length - 1] - 1].xp) / 2; }
    };
    if (nodi.length) pos(1, 0);
    return { n, E: G.E, ordDS, incDS, UB0, K, LB: lb, UB: ub, opt: inc, nodi, foglie: foglia, prof: Math.max(0, ...nodi.map((x) => x.liv)) };
  }
  const classi = (col) => {
    const cl = {};
    for (let v = 1; v < col.length; v++) if (col[v]) (cl[col[v]] = cl[col[v]] || []).push(v);
    return Object.keys(cl).map(Number).sort((a, b) => a - b).map((c) => [c, cl[c]]);
  };
  const classiTex = (col) => classi(col).map(([c, vs]) => `Q_{${c}}=\\{${vs.join(",")}\\}`).join(",\\ ");
  const famigliaTex = (col) => `\\{\\,${classi(col).map(([, vs]) => `\\{${vs.join(",")}\\}`).join(",\\ ")}\\,\\}`;
  function grafoCasualeVCP() {
    for (let tent = 0; tent < 400; tent++) {
      const n = M.casuale(6, 9), E = [];
      for (let a = 1; a <= n; a++) for (let b = a + 1; b <= n; b++) if (Math.random() < 0.42) E.push([a, b]);
      const gr = new Array(n + 1).fill(0);
      E.forEach(([a, b]) => { gr[a]++; gr[b]++; });
      if (gr.slice(1).some((g) => g === 0)) continue;
      const G = { n, E, P: giro(n, 2) }, R = dsaturBB(G);
      if (R.nodi.length >= 4 && R.nodi.length <= 22) return G;
    }
    return { n: VCP_ES[1].n, E: VCP_ES[1].E.map((e) => e.slice()), P: VCP_ES[1].P };
  }
  const vcpCopia = (E) => ({ n: E.n, E: E.E.map((e) => e.slice()), P: E.P.map((q) => q.slice()) });
  function vcpStato(st) {
    const D = st.dati;
    if (!D.g) D.g = Object.assign(vcpCopia(VCP_ES[0]), { id: nuovoId(), es: 0 });
    if (D.gId !== D.g.id) { D.gId = D.g.id; D.bbR = dsaturBB(D.g); }
    const R = D.bbR, N = R.nodi.length, k = M.passoK(st, N + 1, PASSO);
    return { D, G: D.g, R, N, k, cur: k >= 1 && k <= N ? R.nodi[k - 1] : null, fine: k === N + 1 };
  }
  /** lo stato del nodo al passo k (i nodi di stato «lista» cambiano: ramificati, ancora nella lista, tolti) */
  const statoAl = (R, nd, k) => {
    if (nd.stato === "tolto") return nd.toltoDa <= k ? "tolto" : "lista";
    if (nd.stato === "lista") return nd.figli.length && nd.figli[0] <= k ? "ramificato" : "lista";
    return nd.stato;
  };
  const PAL_VCP = (C) => [C.rosso, C.blu, C.e, C.viola, C.d, C.b, C.a, C.grigio];
  const ESITO = {
    ramificato: (nd) => T(`ramifica su ${nd.ramo.v}`, `branch on ${nd.ramo.v}`),
    lista: () => T("nella lista L", "in the list L"),
    potato: () => T("potato (q ≥ UB)", "pruned (q ≥ UB)"),
    incumbent: () => T("nuova incumbent", "new incumbent"),
    tolto: () => T("tolto dalla lista", "removed from L"),
  };

  window.GI_RICETTE["oc-dsatur-bb"] = {
    titolo: T("Colorazione: il branch-and-bound DSATUR", "Vertex coloring: the DSATUR branch-and-bound"),
    parametri: [parPasso(T("◀ ▶ un nodo alla volta, «Esegui» per vederli tutti", "◀ ▶ one node at a time, «Run» to watch them all"), 0)],
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [-1, 10, 20, -2],
    legenda: (st) => {
      const C = M.COL(st);
      return [
        [C.a, T("nodo appena valutato", "node just evaluated"), "pieno"],
        [C.b, T("nodo ramificato o nella lista \\(L\\)", "node branched or in the list \\(L\\)"), "pieno"],
        [C.rosso, T("potato per bound: \\(q(k) \\ge UB\\) (tratteggiato)", "pruned by bound: \\(q(k) \\ge UB\\) (dashed)"), "dashed"],
        [C.blu, T("nuova incumbent \\(\\bar{\\mathcal{Q}}\\)", "new incumbent \\(\\bar{\\mathcal{Q}}\\)"), "pieno"],
        [C.grigio, T("tolto dalla lista (\\(q \\ge UB\\))", "removed from the list (\\(q \\ge UB\\))"), "dashed"],
      ];
    },
    monta(board, st) {
      const D = st.dati, i0 = istDaIndirizzo(st, VCP_ES);
      if (i0 >= 0) D.g = Object.assign(vcpCopia(VCP_ES[i0]), { id: nuovoId(), es: i0 });
      const nuova = (G, es = -1) => { D.g = Object.assign(G, { id: nuovoId(), es }); vaiA(st, 0); M.ferma(st); st.aggiorna(); };
      M.comandi(st, [
        [T("Casuale", "Random"), T("un grafo casuale di 6–9 vertici", "a random graph with 6–9 vertices"), () => nuova(grafoCasualeVCP())],
        [T("Modifica…", "Edit…"), T("scrivi il numero di vertici e gli spigoli", "type the number of vertices and the edges"), () => {
          const G = D.g, attuale = `${G.n} ; ` + G.E.map(([a, b]) => `${a}-${b}`).join(" ");
          const s = chiedi(T("Numero di vertici (da 3 a 10) e spigoli u-v separati da spazi, per esempio: 5 ; 1-2 2-3 3-4 4-5 1-5",
            "Number of vertices (3 to 10) and edges u-v separated by spaces, for example: 5 ; 1-2 2-3 3-4 4-5 1-5"), attuale);
          if (!s) return;
          const [a, b] = s.split(";"), n = Number(String(a).trim());
          const E = String(b || "").split(/[\s,]+/).filter(Boolean).map((x) => x.split("-").map(Number));
          const ok = Number.isInteger(n) && n >= 3 && n <= 10 && E.length >= 1 && E.every((e) => e.length === 2 && e.every((x) => Number.isInteger(x) && x >= 1 && x <= n) && e[0] !== e[1]);
          if (!ok) { window.alert(T("Dati non validi: n fra 3 e 10, spigoli u-v con vertici fra 1 e n.", "Invalid data: n between 3 and 10, edges u-v with vertices between 1 and n.")); return; }
          const vis = new Set(), Ed = [];
          for (const [u, v] of E) { const key = Math.min(u, v) + "-" + Math.max(u, v); if (!vis.has(key)) { vis.add(key); Ed.push([Math.min(u, v), Math.max(u, v)]); } }
          nuova({ n, E: Ed, P: giro(n, 2) });
        }],
      ], { k: PASSO, ritmo: 900 });
      D.nuovaG = nuova;
      O.menuIstanze(st, VCP_ES.map((e) => [e.nome, ""]), () => (D.g ? D.g.es : 0), (i) => nuova(vcpCopia(VCP_ES[i]), i));
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = vcpStato(st), C = M.COL(st), [W, H] = dim(board), { G, R, N, k, cur, fine } = S, PAL = PAL_VCP(C);
      if (S.D.nuovaG) O.menuIstanze(st, VCP_ES.map((x) => [x.nome, ""]), () => G.es, (i) => S.D.nuovaG(vcpCopia(VCP_ES[i]), i));
      M.ridisegna(board, st, [S.D.gId, k, M.scuro(), W, H].join("|"), (crea) => {
        pix(board);
        const d = disegno(crea, H);
        // ------------------------------------------------ il grafo con la colorazione (parziale) del passo
        const gw = clamp(W * 0.34, 220, 460), pad = 12, top = 30;
        const col = k === 0 ? R.incDS : fine ? R.opt : cur.col;
        const nuovoV = cur && cur.ass ? cur.ass[0] : null;
        d.text(pad, 14, k === 0 ? T("DSATUR: la prima incumbent", "DSATUR: the first incumbent") : fine ? T("colorazione ottima", "optimal coloring") : T(`colorazione parziale del nodo ${cur.id}`, `partial coloring of node ${cur.id}`),
          { anchorX: "left", fontSize: 13, strokeColor: C.muted, cssStyle: "font-style:italic" });
        const xsP = G.P.map((p) => p[0]), ysP = G.P.map((p) => p[1]);
        const [xa, xb, ya, yb] = [Math.min(...xsP), Math.max(...xsP), Math.min(...ysP), Math.max(...ysP)];
        const rv = clamp(gw / 20, 11, 17), bw = gw - 2 * pad - 2 * rv - 24, bh = Math.min(H - top - 2 * rv - 74, bw * 1.2);
        const sc = Math.min(bw / Math.max(xb - xa, 1e-6), bh / Math.max(yb - ya, 1e-6));
        const gx = (i) => pad + rv + 12 + (bw - sc * (xb - xa)) / 2 + sc * (G.P[i - 1][0] - xa);
        const gy = (i) => top + rv + 10 + (bh - sc * (yb - ya)) / 2 + sc * (yb - G.P[i - 1][1]);
        const ccx = (pad + rv + 12) + bw / 2, ccy = top + rv + 10 + bh / 2;
        for (const [a, b] of G.E) {
          const sul = nuovoV && (a === nuovoV || b === nuovoV);
          d.line(gx(a), gy(a), gx(b), gy(b), { strokeColor: sul ? C.testo : C.muted, strokeWidth: sul ? 2.6 : 1.6, strokeOpacity: sul ? 0.9 : 0.65 });
        }
        for (let v = 1; v <= G.n; v++) {
          const c = col[v], att = v === nuovoV;
          d.dot(gx(v), gy(v), rv, { fillColor: c ? PAL[(c - 1) % PAL.length] : (M.scuro() ? "#1b2636" : "#ffffff"), strokeColor: att ? C.testo : c ? PAL[(c - 1) % PAL.length] : C.muted, strokeWidth: att ? 4.5 : 2 });
          d.text(gx(v), gy(v), String(v), { fontSize: clamp(rv * 0.95, 10, 15), strokeColor: c ? "#ffffff" : C.testo, cssStyle: "font-weight:800;pointer-events:none" });
        }
        const usati = Math.max(0, ...col.slice(1));
        for (let c = 1; c <= usati; c++) {
          const xk = pad + 66 + (c - 1) * 34, yk = H - 34;
          d.dot(xk, yk, 7, { fillColor: PAL[(c - 1) % PAL.length], strokeColor: PAL[(c - 1) % PAL.length], strokeWidth: 1 });
          d.text(xk + 13, yk, String(c), { fontSize: 12, strokeColor: C.testo, cssStyle: "font-weight:700" });
        }
        if (usati) d.text(pad, H - 34, T("colori:", "colors:"), { anchorX: "left", fontSize: 12, strokeColor: C.muted });
        if (k >= 1 && !fine) d.text(pad, H - 12, T(`clique K = {${R.K.join(", ")}} pre-colorata`, `clique K = {${R.K.join(", ")}} pre-colored`), { anchorX: "left", fontSize: 12, strokeColor: C.muted });
        // ------------------------------------------------ l'albero, nodo per nodo
        const x0 = gw + 18, Tw = W - x0 - pad;
        d.line(gw + 4, 10, gw + 4, H - 10, { strokeColor: C.line, strokeWidth: 1.5 });
        if (!N) {
          d.text(x0 + Tw / 2, H / 2, T(`LB = UB = ${R.UB}: nessun albero, la colorazione di DSATUR è ottima`, `LB = UB = ${R.UB}: no tree, the DSATUR coloring is optimal`), { fontSize: 15, strokeColor: C.blu, cssStyle: "font-weight:700" });
          return;
        }
        if (k === 0) d.text(x0 + Tw / 2, H / 2, T("l'albero parte dal nodo 1 (passo 1)", "the tree starts with node 1 (step 1)"), { fontSize: 14, strokeColor: C.muted, cssStyle: "font-style:italic" });
        const liv = R.prof + 1, dx = Tw / Math.max(1, R.foglie);
        const nh = clamp((H - top - 30) / liv * 0.64, 46, 72), dy = liv > 1 ? (H - top - 34 - nh) / (liv - 1) : 0;
        const nw = clamp(dx - 10, 40, 128), fs = clamp(Math.min(nw * 0.12, nh * 0.25), 10.5, 14), compatto = nw < 74;
        const X = (nd) => x0 + (nd.xp + 0.5) * dx, Y = (nd) => top + 14 + nd.liv * dy + nh / 2;
        const vis = R.nodi.slice(0, fine ? N : k);
        const kk = fine ? N + 1 : k;
        for (const nd of vis) if (nd.padre !== null) {
          const pa = R.nodi[nd.padre - 1], st1 = statoAl(R, nd, kk), tr = st1 === "potato" || st1 === "tolto";
          const ya = Y(pa) + nh / 2, yb = Y(nd) - nh / 2 - 15;
          d.line(X(pa), ya, X(nd), yb, { strokeColor: C.muted, strokeWidth: 1.5, dash: tr ? 3 : 0 });
          d.text(X(nd), Y(nd) - nh / 2 - 8, compatto ? `${nd.ass[0]}←${nd.ass[1]}` : `col(${nd.ass[0]})=${nd.ass[1]}`, { fontSize: fs, strokeColor: C.blu, cssStyle: "font-weight:700" });
        }
        for (const nd of vis) {
          const st1 = statoAl(R, nd, kk), att = cur && nd.id === cur.id;
          const base = { ramificato: [C.b, 0.22, 0], lista: [C.b, 0.08, 0], potato: [C.rosso, 0.12, 3], incumbent: [C.blu, 0.35, 0], tolto: [C.grigio, 0.12, 3] }[st1];
          d.rect(X(nd) - nw / 2, Y(nd) - nh / 2, nw, nh, { strokeColor: att ? C.a : base[0], strokeWidth: att ? 3.2 : 1.6, dash: base[2], fillColor: att ? C.a : base[0], fillOpacity: att ? 0.4 : base[1] });
          d.text(X(nd), Y(nd) - nh * 0.3, T(`Nodo ${nd.id}`, `Node ${nd.id}`), { fontSize: fs, strokeColor: C.rosso, cssStyle: "font-weight:800" });
          d.text(X(nd), Y(nd), compatto ? `q=${nd.q}` : `q=${nd.q}, UB=${nd.ubPrima}`, { fontSize: fs, strokeColor: C.testo });
          const es = st1 === "ramificato" ? (compatto ? `→ ${nd.ramo.v}` : ESITO.ramificato(nd)) : compatto ? { lista: "L", potato: "✗", incumbent: "★", tolto: "✗L" }[st1] : ESITO[st1](nd);
          d.text(X(nd), Y(nd) + nh * 0.3, es, { fontSize: fs * 0.95, strokeColor: st1 === "potato" ? C.rosso : st1 === "incumbent" ? C.blu : C.muted, cssStyle: "font-weight:" + (st1 === "potato" || st1 === "incumbent" ? 700 : 500) });
        }
      });
    },
    formula(p, st) {
      const S = vcpStato(st), { R, k, cur, fine, N } = S;
      if (k === 0) return `UB = ${R.UB0}\\ (DSATUR), \\quad LB = |K| = ${R.LB}\\ \\ (K = \\{${R.K.join(",")}\\})` + (R.LB < R.UB0 ? ` \\;\\Rightarrow\\; ${R.LB} \\le \\chi(G) \\le ${R.UB0}` : ` \\;\\Rightarrow\\; \\chi(G) = ${R.UB0}`);
      if (fine) return `\\chi(G) = UB = ${R.UB}` + (N ? T(`\\qquad (\\text{nodi: } ${N})`, `\\qquad (\\text{nodes: } ${N})`) : "");
      if (!cur.ass) return T(`\\text{Nodo } 1:\\ K = \\{${R.K.join(",")}\\}\\ \\text{pre-colorata},\\quad q(1) = ${cur.q} < UB = ${cur.ubPrima}`, `\\text{Node } 1:\\ K = \\{${R.K.join(",")}\\}\\ \\text{pre-colored},\\quad q(1) = ${cur.q} < UB = ${cur.ubPrima}`);
      const [v, c] = cur.ass;
      return T(`\\text{Nodo } ${cur.id}:\\ \\mathit{col}(${v}) = ${c},\\quad q(${cur.id}) = ${cur.q} ${cur.q >= cur.ubPrima ? "\\ge" : "<"} UB = ${cur.ubPrima}`,
        `\\text{Node } ${cur.id}:\\ \\mathit{col}(${v}) = ${c},\\quad q(${cur.id}) = ${cur.q} ${cur.q >= cur.ubPrima ? "\\ge" : "<"} UB = ${cur.ubPrima}`)
        + (cur.stato === "incumbent" ? ` \\;\\Rightarrow\\; UB \\leftarrow ${cur.q}` : "");
    },
    letture(p, st) {
      const S = vcpStato(st), { G, R, N, k, cur, fine } = S, C = M.COL(st);
      let nota;
      if (k === 0) {
        nota = T(`DSATUR colora i vertici nell'ordine ${lista(R.ordDS)} e dà l'incumbent \\(\\bar{\\mathcal{Q}} = ${famigliaTex(R.incDS)}\\): ${M.tinta(C.blu, `\\(UB = ${R.UB0}\\)`)}. `
          + `La clique greedy (vertici per grado non crescente) è \\(K = \\{${R.K.join(",")}\\}\\): \\(LB = ${R.LB}\\).`,
        `DSATUR colors the vertices in the order ${lista(R.ordDS)} and gives the incumbent \\(\\bar{\\mathcal{Q}} = ${famigliaTex(R.incDS)}\\): ${M.tinta(C.blu, `\\(UB = ${R.UB0}\\)`)}. `
          + `The greedy clique (vertices by non-increasing degree) is \\(K = \\{${R.K.join(",")}\\}\\): \\(LB = ${R.LB}\\).`)
          + (R.LB === R.UB0 ? T(" Poiché \\(LB = UB\\), l'incumbent è ottima: STOP al passo 0.", " Since \\(LB = UB\\), the incumbent is optimal: STOP in Step 0.") : T(" Poiché \\(LB < UB\\), si costruisce l'albero.", " Since \\(LB < UB\\), the tree is built."));
      } else if (fine) {
        nota = (R.UB === R.LB && R.nodi.some((x) => x.stato === "incumbent") ? T(`\\(UB = |K| = ${R.LB}\\): l'incumbent raggiunge il bound della clique ed è ottima, i nodi rimasti non si esplorano.`, `\\(UB = |K| = ${R.LB}\\): the incumbent meets the clique bound and is optimal; the remaining nodes are not explored.`)
          : N ? T("La lista \\(L\\) è vuota: l'incumbent è ottima.", "The list \\(L\\) is empty: the incumbent is optimal.") : T("\\(LB = UB\\) già al passo 0.", "\\(LB = UB\\) already in Step 0."))
          + T(` ${M.tinta(C.blu, `\\(\\chi(G) = ${R.UB}\\)`)}, \\(\\bar{\\mathcal{Q}} = ${famigliaTex(R.opt)}\\).`, ` ${M.tinta(C.blu, `\\(\\chi(G) = ${R.UB}\\)`)}, \\(\\bar{\\mathcal{Q}} = ${famigliaTex(R.opt)}\\).`);
        if (N) nota += T(` L'albero ha ${N} nodi.`, ` The tree has ${N} nodes.`);
      } else if (!cur.ass) {
        nota = T(`Nodo 1 (radice): la clique \\(K\\) è pre-colorata, ${R.K.map((v, i) => `\\(\\mathit{col}^1(${v}) = ${i + 1}\\)`).join(", ")}; \\(q(1) = ${cur.q} < UB = ${cur.ubPrima}\\): il nodo entra nella lista \\(L\\).`,
          `Node 1 (root): the clique \\(K\\) is pre-colored, ${R.K.map((v, i) => `\\(\\mathit{col}^1(${v}) = ${i + 1}\\)`).join(", ")}; \\(q(1) = ${cur.q} < UB = ${cur.ubPrima}\\): the node enters the list \\(L\\).`);
      } else {
        const pa = R.nodi[cur.padre - 1], rb = pa.ramo, [v, c] = cur.ass;
        const primo = pa.figli[0] === cur.id;
        nota = "";
        if (primo) {
          const pari = rb.pari.length > 1 ? T(` (a pari saturazione: ${rb.pari.map((y) => `${y.v}: \\(\\mathit{du}=${y.d}\\)`).join(", ")}; vince il \\(\\mathit{du}\\) più grande, poi l'indice più piccolo)`, ` (tied saturation: ${rb.pari.map((y) => `${y.v}: \\(\\mathit{du}=${y.d}\\)`).join(", ")}; the largest \\(\\mathit{du}\\) wins, then the smallest index)`) : "";
          nota += T(`Il nodo ${pa.id} esce dalla lista: si ramifica sul vertice ${M.tinta(C.a, String(rb.v))}, con \\(\\mathit{sat}=${rb.s}\\), \\(\\mathit{du}=${rb.d}\\)${pari}. \\(F_{${pa.id}}(${rb.v}) = ${rb.F.length ? `\\{${rb.F.join(",")}\\}` : "\\emptyset"}\\), più il colore nuovo \\(${pa.q + 1}\\). `,
            `Node ${pa.id} leaves the list: branch on vertex ${M.tinta(C.a, String(rb.v))}, with \\(\\mathit{sat}=${rb.s}\\), \\(\\mathit{du}=${rb.d}\\)${pari}. \\(F_{${pa.id}}(${rb.v}) = ${rb.F.length ? `\\{${rb.F.join(",")}\\}` : "\\emptyset"}\\), plus the new color \\(${pa.q + 1}\\). `);
        }
        const nuovo = c === pa.q + 1;
        nota += T(`Nodo ${cur.id}: \\(\\mathit{col}(${v}) = ${c}\\)${nuovo ? " (colore nuovo)" : ""}, \\(q(${cur.id}) = ${cur.q}\\). `, `Node ${cur.id}: \\(\\mathit{col}(${v}) = ${c}\\)${nuovo ? " (new color)" : ""}, \\(q(${cur.id}) = ${cur.q}\\). `);
        if (cur.stato === "potato") nota += T(`\\(q = ${cur.q} \\ge UB = ${cur.ubPrima}\\): ${M.tinta(C.rosso, "potato per bound")}.`, `\\(q = ${cur.q} \\ge UB = ${cur.ubPrima}\\): ${M.tinta(C.rosso, "pruned by bound")}.`);
        else if (cur.stato === "incumbent") {
          nota += T(`Colorazione completa con \\(${cur.q} < UB\\): ${M.tinta(C.blu, `nuova incumbent, \\(UB \\leftarrow ${cur.q}\\)`)}.`, `Complete coloring with \\(${cur.q} < UB\\): ${M.tinta(C.blu, `new incumbent, \\(UB \\leftarrow ${cur.q}\\)`)}.`);
          if (cur.tolti.length) nota += T(` Tolti dalla lista (\\(q \\ge UB\\)): nodi ${lista(cur.tolti)}.`, ` Removed from the list (\\(q \\ge UB\\)): nodes ${lista(cur.tolti)}.`);
          if (cur.ub === R.LB) nota += T(` \\(UB = LB = ${R.LB}\\): STOP.`, ` \\(UB = LB = ${R.LB}\\): STOP.`);
        } else nota += T(`\\(q < UB\\) e restano vertici da colorare: il nodo sopravvive.`, `\\(q < UB\\) and some vertices are uncolored: the node survives.`);
        nota += `<br>\\(${classiTex(cur.col)}\\)`;
      }
      // tabella dei nodi come nel capitolo (Node, Child, q, UB, Outcome)
      const kk = fine ? N + 1 : k, vis = R.nodi.slice(0, Math.min(kk, N));
      const righe = vis.map((nd) => [String(nd.id), nd.ass ? `\\(\\mathit{col}(${nd.ass[0]})=${nd.ass[1]}\\)` : T("radice", "root"), `\\(${nd.q}\\)`, `\\(${nd.ubPrima}\\)`, ESITO[statoAl(R, nd, kk)](nd)]);
      const Lnow = cur ? cur.L.filter((id) => statoAl(R, R.nodi[id - 1], k) === "lista").slice().reverse() : [];
      const sintesi = `<p style="margin:.4em 0">\\(LB = ${R.LB}\\), \\(UB = ${cur ? cur.ub : R.UB}\\)` + (cur ? T(`; lista \\(L\\) (cima per prima): ${Lnow.length ? lista(Lnow) : "vuota"}`, `; list \\(L\\) (top first): ${Lnow.length ? lista(Lnow) : "empty"}`) : "") + "</p>";
      return nota + sintesi + (righe.length ? M.tab([T("Nodo", "Node"), T("Figlio", "Child"), "\\(q\\)", "\\(UB\\)", T("Esito", "Outcome")], righe, cur ? cur.id - 1 : -1, C.a) : "");
    },
    domanda: T("Sul grafo di Petersen l'albero non migliora \\(UB = 3\\): lo dimostra ottimo. Quale ciclo dispari trova la ricerca? Nell'esercizio 42.4, invece, quale nodo dà la nuova incumbent e perché la ricerca si ferma subito?",
      "On the Petersen graph the tree does not improve \\(UB = 3\\): it proves it optimal. Which odd cycle does the search find? In Exercise 42.4, instead, which node gives the new incumbent, and why does the search stop at once?"),
  };

  window.GI_OC_E = { wwCalcola, WW_ES, dsaturBB, VCP_ES };
})();
