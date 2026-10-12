/* Laboratorio di «Ottimizzazione combinatoria / Combinatorial Optimization»: zaino e colorazione.
 *
 *   oc-dp-knapsack   problemi di zaino (KP, UKP, BKP, SSP): la tabella della programmazione dinamica si riempie una
 *                    cella alla volta, poi la ricostruzione della soluzione dall'ultima cella
 *   oc-bb-knapsack   zaino 0-1: branch-and-bound a profondità, albero con i bound di Dantzig (esatti, frazioni)
 *   oc-coloring      colorazione dei vertici: greedy (lista data o grado decrescente) e DSATUR, passo per passo
 *
 * Notazione del corso: capacità c, profitti p_j, pesi w_j, v(j,k) = valore ottimo con i primi j oggetti e capacità k;
 * istanza di riferimento KP p = (10, 7, 6, 4), w = (5, 4, 3, 3), c = 9; colorazione: grafo di Petersen e grafo
 * a corona G_4 (vertici u_i = 2i-1, v_i = 2i, spigoli {2i-1, 2j} con i ≠ j).
 * Le funzioni di calcolo sono anche in window.GI_OC_A, per le prove.
 */
(function () {
  "use strict";
  const GI = window.GI, M = window.GI_MIP, O = window.GI_OC;
  const T = GI.T;
  const { PASSO, parPasso, DESCR_PASSO, vaiA, clamp, somma, lista, pct, nuovoId, osservaDimensioni, nuovaVoce, dim, pix, disegno, daIndirizzo, chiedi, interi } = O;
  window.GI_RICETTE = window.GI_RICETTE || {};

  // =================================================================
  // 1. PROGRAMMAZIONE DINAMICA PER I PROBLEMI DI ZAINO (KP, UKP, BKP, SSP)
  // =================================================================
  // Le ricorrenze e le regole sui pareggi sono quelle dei capitoli «DP for the 0/1 knapsack problem» (17.1),
  // «… unbounded …» (secondo algoritmo, 18.2), «… bounded …» (19.1) e «… subset sum …» (20.1):
  //   KP   v(j,k) = max{v(j-1,k), p_j + v(j-1,k-w_j)}          s = 1 se il secondo è > del primo
  //   UKP  v(j,k) = max{v(j-1,k), p_j + v(j,k-w_j)}            (stessa riga: altre copie disponibili)
  //   BKP  v(j,k) = max_d {d p_j + v(j-1,k-d w_j)}, d ≤ min{b_j, ⌊k/w_j⌋}   s = il primo d che dà il massimo
  //   SSP  r(j,k) = r(j-1,k) ∨ r(j-1,k-w_j)                    s = 1 solo se r(j-1,k) è falso
  const DP_ES = {
    kp: [
      { nome: T("esempio 1 del capitolo (c = 5)", "Example 1 of the chapter (c = 5)"), p: [6, 7, 8], w: [2, 3, 3], c: 5 },
      { nome: T("istanza di riferimento (c = 9)", "reference instance (c = 9)"), p: [10, 7, 6, 4], w: [5, 4, 3, 3], c: 9 },
      { nome: T("esercizio 17.3 (c = 8)", "Exercise 17.3 (c = 8)"), p: [3, 4, 8, 8, 10], w: [1, 3, 4, 5, 6], c: 8 },
      { nome: T("esercizio 17.5 (c = 10)", "Exercise 17.5 (c = 10)"), p: [2, 7, 9, 12, 14], w: [1, 4, 5, 7, 8], c: 10 },
    ],
    ukp: [
      { nome: T("esempio 1 del capitolo (c = 7)", "Example 1 of the chapter (c = 7)"), p: [4, 5, 10, 11], w: [2, 3, 5, 6], c: 7 },
      { nome: T("esercizio 18.2 (c = 8)", "Exercise 18.2 (c = 8)"), p: [2, 5, 7, 8, 10], w: [1, 2, 3, 4, 5], c: 8 },
      { nome: T("esercizio 18.4 (c = 9)", "Exercise 18.4 (c = 9)"), p: [5, 6, 14, 18], w: [2, 3, 6, 7], c: 9 },
    ],
    bkp: [
      { nome: T("esempio 1 del capitolo (c = 10)", "Example 1 of the chapter (c = 10)"), p: [6, 10, 12], w: [2, 3, 5], b: [2, 2, 1], c: 10 },
      { nome: T("esercizio 19.2 (c = 7)", "Exercise 19.2 (c = 7)"), p: [3, 8], w: [1, 4], b: [3, 1], c: 7 },
      { nome: T("esercizio 19.4 (c = 8)", "Exercise 19.4 (c = 8)"), p: [5, 9], w: [2, 5], b: [3, 1], c: 8 },
    ],
    ssp: [
      { nome: T("esempio 1 del capitolo (c = 10)", "Example 1 of the chapter (c = 10)"), w: [3, 5, 4, 7], c: 10 },
      { nome: T("esercizio 20.2 (c = 9)", "Exercise 20.2 (c = 9)"), w: [3, 4, 6], c: 9 },
      { nome: T("esercizio 20.3 (c = 7, risposta no)", "Exercise 20.3 (c = 7, answer no)"), w: [2, 4, 6], c: 7 },
      { nome: T("esercizio 20.5 (c = 8)", "Exercise 20.5 (c = 8)"), w: [2, 5, 6, 7], c: 8 },
    ],
  };
  const KP_ES = DP_ES.kp;
  const DP_FUNZ = {
    kp: { etichetta: "<span title=\"0/1 knapsack problem\">0/1 KP</span>", nome: T("problema dello zaino 0/1 (KP)", "0/1 knapsack problem (KP)") },
    ukp: { etichetta: "<span title=\"unbounded knapsack problem\">UKP</span>", nome: T("problema dello zaino illimitato (UKP)", "unbounded knapsack problem (UKP)") },
    bkp: { etichetta: "<span title=\"bounded knapsack problem\">BKP</span>", nome: T("problema dello zaino limitato (BKP)", "bounded knapsack problem (BKP)") },
    ssp: { etichetta: "<span title=\"subset sum problem\">SSP</span>", nome: T("problema del subset sum (SSP)", "subset sum problem (SSP)") },
  };
  /** la tabella della PD, cella per cella, e la ricostruzione; tipo = kp | ukp | bkp | ssp */
  function dpCalcola(I, tipo = "kp") {
    const { w, c } = I, p = I.p || w, b = I.b, n = w.length, V = [], S = [];
    const ssp = tipo === "ssp";
    for (let j = 0; j <= n; j++) { V.push(new Array(c + 1).fill(ssp ? false : 0)); S.push(new Array(c + 1).fill(0)); }
    if (ssp) V[0][0] = true;
    const celle = [];
    for (let j = 1; j <= n; j++) for (let k = 0; k <= c; k++) {
      const wj = w[j - 1], pj = p[j - 1], ok = wj <= k;
      const cel = { j, k, ok, dip: [] };
      if (tipo === "kp" || tipo === "ukp") {
        const a = V[j - 1][k], rb = tipo === "kp" ? j - 1 : j, bb = ok ? V[rb][k - wj] + pj : null;
        cel.a = a; cel.b = bb;
        cel.dip.push({ j: j - 1, k, ruolo: "no" });
        if (ok) cel.dip.push({ j: rb, k: k - wj, ruolo: "si" });
        cel.s = ok && bb > a ? 1 : 0;
        V[j][k] = cel.s ? bb : a;
      } else if (tipo === "bkp") {
        const dmax = Math.min(b[j - 1], Math.floor(k / wj));
        let m = 0, t = 0;
        cel.cand = [];
        for (let d = 0; d <= dmax; d++) {
          const val = d * pj + V[j - 1][k - d * wj];
          cel.cand.push({ d, val, k: k - d * wj });
          cel.dip.push({ j: j - 1, k: k - d * wj, ruolo: "d", d });
          if (val > m) { m = val; t = d; }
        }
        cel.s = t; cel.dmax = dmax;
        V[j][k] = m;
      } else {
        const a = V[j - 1][k], bb = ok ? V[j - 1][k - wj] : null;
        cel.a = a; cel.b = bb;
        cel.dip.push({ j: j - 1, k, ruolo: "no" });
        if (ok) cel.dip.push({ j: j - 1, k: k - wj, ruolo: "si" });
        cel.s = !a && ok && bb ? 1 : 0;
        V[j][k] = a || (ok && bb);
      }
      S[j][k] = cel.s;
      cel.v = V[j][k];
      celle.push(cel);
    }
    // ricostruzione, come nelle procedure dei capitoli (DP_Reconstruct, UKP_DP2_SolComputation, BKP_Reconstruct, SSP_Reconstruct)
    const tb = [], x = new Array(n).fill(0);
    let k = c;
    const risposta = ssp ? V[n][c] : true;
    if (tipo === "ukp") {
      let j = n;
      while (k > 0 && j > 0) {
        if (S[j][k] === 0) { tb.push({ j, k, s: 0, x: x.slice() }); j--; }
        else { x[j - 1]++; tb.push({ j, k, s: 1, x: x.slice() }); k -= w[j - 1]; }
      }
      tb.push({ j, k, fine: true, x: x.slice() });
    } else if (risposta) {
      for (let j = n; j >= 1; j--) {
        const s = S[j][k];
        x[j - 1] = s;
        tb.push({ j, k, s, x: x.slice() });
        k -= s * w[j - 1];
      }
    }
    const val = ssp ? V[n][c] : V[n][c];
    const peso = x.reduce((a, xi, i) => a + xi * w[i], 0), prof = x.reduce((a, xi, i) => a + xi * p[i], 0);
    return { tipo, V, S, celle, tb, x, N: celle.length, K: celle.length + Math.max(1, tb.length), kfin: k, val, peso, prof, risposta,
      presi: x.map((xi, i) => (xi ? i + 1 : 0)).filter(Boolean) };
  }
  function kpCasuale(tipo = "kp") {
    const n = M.casuale(tipo === "bkp" ? 2 : 3, tipo === "bkp" ? 4 : 5), p = [], w = [], b = [];
    for (let j = 0; j < n; j++) { w.push(M.casuale(tipo === "ssp" ? 2 : 1, 6)); p.push(M.casuale(3, 14)); b.push(M.casuale(1, 3)); }
    const c = M.casuale(Math.max(...w) + 1, Math.min(12, Math.max(Math.max(...w) + 1, w.reduce((a, x) => a + x, 0) - 1)));
    const I = { w, c };
    if (tipo !== "ssp") I.p = p;
    if (tipo === "bkp") I.b = b;
    return I;
  }
  const dpCopia = (E) => { const I = { w: E.w.slice(), c: E.c }; if (E.p) I.p = E.p.slice(); if (E.b) I.b = E.b.slice(); return I; };
  function dpStato(st) {
    const D = st.dati, tipo = st.chiave() || "kp";
    D.istDP = D.istDP || {};
    if (!D.istDP[tipo]) D.istDP[tipo] = Object.assign(dpCopia(DP_ES[tipo][0]), { id: nuovoId(), es: 0 });
    const I = D.istDP[tipo];
    if (D.dpId !== I.id) { D.dpId = I.id; D.dp = dpCalcola(I, tipo); }
    const R = D.dp, k = M.passoK(st, R.K, PASSO);
    return { D, tipo, I, R, k, cur: k >= 1 && k <= R.N ? R.celle[k - 1] : null, t: k > R.N ? k - R.N : 0 };
  }
  const vTxt = (v) => (v === true ? "T" : v === false ? "F" : String(v));
  const nomeV = (tipo) => (tipo === "ssp" ? "r" : "v");

  window.GI_RICETTE["oc-dp-knapsack"] = {
    titolo: T("Tabelle della programmazione dinamica per i problemi di zaino", "DP tables for the knapsack problems"),
    funzioni: DP_FUNZ,
    etichettaFunzioni: T("Problema", "Problem"),
    parametri: [parPasso(T("◀ ▶ una cella alla volta, «Esegui» per vederle tutte", "◀ ▶ one cell at a time, «Run» to watch them all"))],
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [-1, 10, 20, -2],
    legenda: (st) => {
      const C = M.COL(st), tipo = st.chiave(), v = nomeV(tipo);
      const voci = [[C.b, T("celle già calcolate", "cells already computed"), "pieno"], [C.a, T("cella che si calcola", "cell being computed"), "pieno"]];
      if (tipo === "bkp") voci.push([C.blu, T("\\(d\\,p_j+v(j-1,k-d\\,w_j)\\)", "\\(d\\,p_j+v(j-1,k-d\\,w_j)\\)") + T(" per ogni \\(d\\)", " for every \\(d\\)"), "dashed"], [C.verde, T("il \\(d\\) migliore", "the best \\(d\\)"), "dashed"]);
      else if (tipo === "ssp") voci.push([C.blu, T("\\(r(j-1,k)\\): senza l'oggetto \\(j\\)", "\\(r(j-1,k)\\): without item \\(j\\)"), "dashed"], [C.verde, T("\\(r(j-1,k-w_j)\\): con l'oggetto \\(j\\)", "\\(r(j-1,k-w_j)\\): with item \\(j\\)"), "dashed"]);
      else voci.push([C.blu, T(`\\(${v}(j-1,k)\\): senza l'oggetto \\(j\\)`, `\\(${v}(j-1,k)\\): item \\(j\\) not taken`), "dashed"],
        [C.verde, tipo === "ukp" ? T("\\(p_j+v(j,k-w_j)\\): una copia in più", "\\(p_j+v(j,k-w_j)\\): one more copy") : T("\\(p_j+v(j-1,k-w_j)\\): prendo l'oggetto \\(j\\)", "\\(p_j+v(j-1,k-w_j)\\): item \\(j\\) is taken"), "dashed"]);
      voci.push([C.verde, T("percorso della ricostruzione", "reconstruction path"), "pieno"]);
      return voci;
    },
    monta(board, st) {
      const D = st.dati;
      nuovaVoce(st);
      const tipo = st.chiave();
      const nuova = (I, es = -1) => { D.istDP[tipo] = Object.assign(I, { id: nuovoId(), es }); vaiA(st, 1); M.ferma(st); st.aggiorna(); };
      M.comandi(st, [
        [T("Casuale", "Random"), T("dati casuali", "random data"), () => nuova(kpCasuale(st.chiave()))],
        [T("Modifica…", "Edit…"), T("scrivi i dati dell'istanza", "type the data of the instance"), () => {
          const tp = st.chiave(), I = D.istDP[tp];
          const formato = tp === "ssp" ? T("pesi ; c", "weights ; c") : tp === "bkp" ? T("profitti ; pesi ; limiti b ; c", "profits ; weights ; bounds b ; c") : T("profitti ; pesi ; c", "profits ; weights ; c");
          const attuale = (tp === "ssp" ? [I.w] : tp === "bkp" ? [I.p, I.w, I.b] : [I.p, I.w]).map((v) => v.join(" ")).concat([I.c]).join(" ; ");
          const s = chiedi(T(`Dati separati da «;» (${formato}), da 2 a 7 oggetti, c fino a 20:`, `Data separated by «;» (${formato}), 2 to 7 items, c up to 20:`), attuale);
          if (!s) return;
          const parti = s.split(";").map((x) => interi(x || ""));
          const nv = tp === "ssp" ? 1 : tp === "bkp" ? 3 : 2;
          const ok = parti.length === nv + 1 && parti.every(Boolean) && parti[nv].length === 1 && parti[nv][0] <= 20 &&
            parti.slice(0, nv).every((v) => v.length === parti[0].length) && parti[0].length >= 2 && parti[0].length <= 7;
          if (!ok) { window.alert(T("Dati non validi: interi positivi, vettori della stessa lunghezza (da 2 a 7), c fino a 20.", "Invalid data: positive integers, vectors of the same length (2 to 7), c up to 20.")); return; }
          const J = tp === "ssp" ? { w: parti[0], c: parti[1][0] } : tp === "bkp" ? { p: parti[0], w: parti[1], b: parti[2], c: parti[3][0] } : { p: parti[0], w: parti[1], c: parti[2][0] };
          nuova(J);
        }],
      ], { k: PASSO, ritmo: 450 });
      O.menuIstanze(st, DP_ES[tipo].map((e) => [e.nome, ""]), () => (D.istDP && D.istDP[st.chiave()] ? D.istDP[st.chiave()].es : 0),
        (i) => nuova(dpCopia(DP_ES[st.chiave()][i]), i));
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = dpStato(st), C = M.COL(st), [W, H] = dim(board), { I, R, k, cur, t, tipo } = S, n = I.w.length, c = I.c;
      M.ridisegna(board, st, [S.D.dpId, tipo, k, M.scuro(), W, H].join("|"), (crea) => {
        pix(board);
        const d = disegno(crea, H);
        const lw = clamp(W * 0.22, 110, 230), top = 40, pad = 10;
        const cs = Math.max(14, Math.min((W - lw - pad) / (c + 1), (H - top - pad) / (n + 1), 92));
        const fs = clamp(cs * 0.42, 9, 17), fl = clamp(cs * 0.3, 9, 14);
        const cx = (kk) => lw + kk * cs, cy = (j) => top + j * cs;
        d.text(lw - 8, top - 10, tipo === "ssp" ? T("valore obiettivo k →", "target value k →") : T("capacità k →", "capacity k →"), { anchorX: "right", fontSize: fl, strokeColor: C.muted, cssStyle: "font-style:italic" });
        for (let kk = 0; kk <= c; kk++) d.text(cx(kk) + cs / 2, top - 10, String(kk), { fontSize: fl, strokeColor: C.muted, cssStyle: "font-weight:600" });
        const cella = (j, kk, attr) => d.rect(cx(kk) + 1, cy(j) + 1, cs - 2, cs - 2, attr);
        const fatte = Math.min(k, R.N);
        const vis = R.tb.slice(0, t), ult = vis[vis.length - 1];
        const xcorr = ult ? ult.x : new Array(n).fill(0);
        for (let j = 0; j <= n; j++) {
          let lab;
          if (j === 0) lab = T("j = 0 (nessun oggetto)", "j = 0 (no item)");
          else if (tipo === "ssp") lab = `j = ${j}:  w=${I.w[j - 1]}`;
          else if (tipo === "bkp") lab = `j = ${j}:  p=${I.p[j - 1]}, w=${I.w[j - 1]}, b=${I.b[j - 1]}`;
          else lab = `j = ${j}:  p=${I.p[j - 1]}, w=${I.w[j - 1]}`;
          const decisa = j > 0 && vis.some((x) => x.j === j && !x.fine);
          const xi = j > 0 ? xcorr[j - 1] : 0;
          const segno = j === 0 || !decisa ? "" : tipo === "ukp" || tipo === "bkp" ? `  x=${xi}` : xi ? " ✓" : " ✗";
          d.text(lw - 8, cy(j) + cs / 2, lab + segno, { anchorX: "right", fontSize: fl, strokeColor: decisa && xi ? C.verde : decisa ? C.muted : C.testo, cssStyle: "font-weight:" + (decisa && xi ? 700 : 500) });
          for (let kk = 0; kk <= c; kk++) {
            const idx = j === 0 ? -1 : (j - 1) * (c + 1) + kk;
            const calc = j === 0 || idx < fatte;
            const vv = R.V[j][kk];
            if (calc) {
              cella(j, kk, { strokeColor: C.line, strokeWidth: 1, fillColor: tipo === "ssp" && vv === false ? C.grigio : C.b, fillOpacity: j === 0 ? 0.06 : tipo === "ssp" && vv === false ? 0.1 : 0.14 });
              d.text(cx(kk) + cs / 2, cy(j) + cs / 2, vTxt(vv), { fontSize: fs, strokeColor: tipo === "ssp" && vv === false ? C.muted : C.testo });
            } else cella(j, kk, { strokeColor: C.line, strokeWidth: 1, fillColor: "none", fillOpacity: 0 });
          }
        }
        if (cur) {
          const { j, k: kk } = cur;
          cella(j, kk, { strokeColor: C.a, strokeWidth: 3, fillColor: C.a, fillOpacity: 0.5 });
          d.text(cx(kk) + cs / 2, cy(j) + cs / 2, vTxt(cur.v), { fontSize: fs, strokeColor: C.testo, cssStyle: "font-weight:800" });
          for (const q of cur.dip) {
            const buono = q.ruolo === "si" || (q.ruolo === "d" && q.d === cur.s);
            const col = q.ruolo === "no" || (q.ruolo === "d" && !buono) ? C.blu : C.verde;
            cella(q.j, q.k, { strokeColor: col, strokeWidth: buono || q.ruolo === "no" ? 3.5 : 2.2, fillColor: "none", fillOpacity: 0, dash: q.ruolo === "no" ? 0 : 2 });
            if (q.ruolo === "d") d.text(cx(q.k) + cs - 4, cy(q.j) + 9, `d=${q.d}`, { anchorX: "right", fontSize: clamp(cs * 0.2, 8, 11), strokeColor: col, cssStyle: "font-weight:700" });
          }
        }
        if (t > 0) {
          vis.forEach((x, i) => {
            if (x.fine) return;
            cella(x.j, x.k, { strokeColor: C.verde, strokeWidth: i === vis.length - 1 ? 4 : 2.5, fillColor: C.verde, fillOpacity: i === vis.length - 1 ? 0.4 : 0.22 });
            d.text(cx(x.k) + cs / 2, cy(x.j) + cs / 2, vTxt(R.V[x.j][x.k]), { fontSize: fs, strokeColor: C.testo, cssStyle: "font-weight:800" });
          });
          if (t >= R.tb.length && R.risposta) {
            const jf = tipo === "ukp" ? R.tb[R.tb.length - 1].j : 0;
            cella(jf, R.kfin, { strokeColor: C.verde, strokeWidth: 3, fillColor: C.verde, fillOpacity: 0.25 });
            d.text(cx(R.kfin) + cs / 2, cy(jf) + cs / 2, vTxt(R.V[jf][R.kfin]), { fontSize: fs, strokeColor: C.testo, cssStyle: "font-weight:800" });
          }
        }
      });
    },
    formula(p, st) {
      const S = dpStato(st), { I, R, k, cur, t, tipo } = S, v = nomeV(tipo);
      if (k === 0) return tipo === "ssp" ? T("r(0,0) = \\mathit{true}, \\quad r(0,k) = \\mathit{false} \\ \\text{per } k \\ge 1", "r(0,0) = \\mathit{true}, \\quad r(0,k) = \\mathit{false} \\ \\text{for } k \\ge 1")
        : T("v(0,k) = 0 \\quad \\text{per ogni } k", "v(0,k) = 0 \\quad \\text{for every } k");
      if (cur) {
        const { j, k: kk } = cur, wj = I.w[j - 1], pj = I.p ? I.p[j - 1] : 0;
        if (tipo === "bkp") {
          const termini = cur.cand.map((q) => `${q.d}\\cdot ${pj} + ${R.V[j - 1][q.k]}`).join(",\\ ");
          return `v(${j},${kk}) = \\max\\{${termini}\\} = ${cur.v}` + (cur.cand.length > 1 ? ` \\quad (d = ${cur.s})` : "");
        }
        if (!cur.ok) return `${v}(${j},${kk}) = ${v}(${j - 1},${kk}) = ${tipo === "ssp" ? `\\mathit{${cur.v}}` : cur.v} \\qquad (w_{${j}} = ${wj} > ${kk})`;
        if (tipo === "ssp") return `r(${j},${kk}) = r(${j - 1},${kk}) \\lor r(${j - 1},${kk - wj}) = \\mathit{${cur.a}} \\lor \\mathit{${cur.b}} = \\mathit{${cur.v}}`;
        const rb = tipo === "kp" ? j - 1 : j;
        return `v(${j},${kk}) = \\max\\{v(${j - 1},${kk}),\\ ${pj} + v(${rb},${kk - wj})\\} = \\max\\{${cur.a},\\ ${pj} + ${cur.b - pj}\\} = ${cur.v}`;
      }
      const x = R.tb[t - 1];
      if (!x) return tipo === "ssp" ? `r(${I.w.length},${I.c}) = \\mathit{false}` : "";
      if (x.fine) return `x = (${R.x.join(", ")})`;
      if (tipo === "ukp") return x.s ? `s[${x.j}][${x.k}] = 1 \\;\\Rightarrow\\; x_{${x.j}} \\leftarrow x_{${x.j}} + 1,\\quad k \\leftarrow ${x.k} - ${I.w[x.j - 1]}` : `s[${x.j}][${x.k}] = 0 \\;\\Rightarrow\\; j \\leftarrow ${x.j - 1}`;
      return `x_{${x.j}} \\leftarrow s[${x.j}][${x.k}] = ${x.s}` + (x.s ? `,\\quad k \\leftarrow ${x.k} - ${x.s > 1 ? x.s + "\\cdot " : ""}${I.w[x.j - 1]} = ${x.k - x.s * I.w[x.j - 1]}` : `,\\quad k = ${x.k}`);
    },
    letture(p, st) {
      const S = dpStato(st), { I, R, k, cur, t, tipo } = S, C = M.COL(st), n = I.w.length, v = nomeV(tipo);
      let nota;
      if (k === 0) {
        const base = tipo === "ssp" ? T("Riga \\(j=0\\): senza oggetti si ottiene solo il valore \\(0\\) (insieme vuoto): \\(r(0,0)=\\mathit{true}\\), gli altri sono \\(\\mathit{false}\\).", "Row \\(j=0\\): with no items only the value \\(0\\) is reachable (empty set): \\(r(0,0)=\\mathit{true}\\), the others are \\(\\mathit{false}\\).")
          : T("Riga \\(j=0\\): senza oggetti il valore è \\(0\\) per ogni capacità.", "Row \\(j=0\\): with no items the value is \\(0\\) for every capacity.");
        nota = base + T(` \\(n = ${n}\\), \\(c = ${I.c}\\): la tabella ha \\(${n}\\cdot ${I.c + 1} = ${R.N}\\) celle da calcolare.`, ` \\(n = ${n}\\), \\(c = ${I.c}\\): the table has \\(${n}\\cdot ${I.c + 1} = ${R.N}\\) cells to compute.`)
          + (tipo === "bkp" ? T(" Ogni cella prova fino a \\(b_j+1\\) valori di \\(d\\).", " Each cell tries up to \\(b_j+1\\) values of \\(d\\).") : "");
      } else if (cur) {
        const { j, k: kk } = cur, wj = I.w[j - 1], pj = I.p ? I.p[j - 1] : 0;
        if (tipo === "bkp") {
          nota = T(`Cella \\((${j},${kk})\\): \\(d\\) copie dell'oggetto ${j}, con \\(d \\le \\min\\{b_{${j}}, \\lfloor ${kk}/${wj} \\rfloor\\} = ${cur.dmax}\\): `, `Cell \\((${j},${kk})\\): \\(d\\) copies of item type ${j}, with \\(d \\le \\min\\{b_{${j}}, \\lfloor ${kk}/${wj} \\rfloor\\} = ${cur.dmax}\\): `)
            + cur.cand.map((q) => (q.d === cur.s ? M.tinta(C.verde, `\\(d=${q.d}\\): ${q.val}`) : `\\(d=${q.d}\\): ${q.val}`)).join("; ")
            + T(`. Vale il massimo, \\(${cur.v}\\) (a pari valore, il \\(d\\) più piccolo): \\(s[${j}][${kk}] = ${cur.s}\\).`, `. The maximum is \\(${cur.v}\\) (on a tie, the smallest \\(d\\)): \\(s[${j}][${kk}] = ${cur.s}\\).`);
        } else if (!cur.ok) {
          nota = T(`Cella \\((${j},${kk})\\): l'oggetto ${j} pesa \\(${wj} > ${kk}\\), non entra: si copia ${M.tinta(C.blu, "la cella sopra")}.`, `Cell \\((${j},${kk})\\): item ${j} weighs \\(${wj} > ${kk}\\), it does not fit: copy ${M.tinta(C.blu, "the cell above")}.`);
        } else if (tipo === "ssp") {
          nota = T(`Cella \\((${j},${kk})\\): il valore \\(${kk}\\) si ottiene senza l'oggetto ${j} se ${M.tinta(C.blu, `\\(r(${j - 1},${kk})\\)`)} è vero, oppure con l'oggetto ${j} se ${M.tinta(C.verde, `\\(r(${j - 1},${kk - wj})\\)`)} è vero. \\(s[${j}][${kk}] = ${cur.s}\\)` + (cur.s ? " (l'oggetto serve)." : "."),
            `Cell \\((${j},${kk})\\): the value \\(${kk}\\) is reachable without item ${j} if ${M.tinta(C.blu, `\\(r(${j - 1},${kk})\\)`)} is true, or with item ${j} if ${M.tinta(C.verde, `\\(r(${j - 1},${kk - wj})\\)`)} is true. \\(s[${j}][${kk}] = ${cur.s}\\)` + (cur.s ? " (the item is needed)." : "."));
        } else {
          const rb = tipo === "kp" ? j - 1 : j;
          nota = T(`Cella \\((${j},${kk})\\): senza l'oggetto ${j}, ${M.tinta(C.blu, "\\(" + cur.a + "\\)")}; ${tipo === "ukp" ? "con una copia in più" : "prendendolo"}, ${M.tinta(C.verde, `\\(${pj} + ${cur.b - pj} = ${cur.b}\\)`)} (cella \\((${rb},${kk - wj})\\)${tipo === "ukp" ? ", la stessa riga" : ""}). Vale il massimo: \\(${cur.v}\\)${cur.s ? "" : " (a pari valore, non si prende)"}.`,
            `Cell \\((${j},${kk})\\): without item ${j}, ${M.tinta(C.blu, "\\(" + cur.a + "\\)")}; ${tipo === "ukp" ? "with one more copy" : "with it"}, ${M.tinta(C.verde, `\\(${pj} + ${cur.b - pj} = ${cur.b}\\)`)} (cell \\((${rb},${kk - wj})\\)${tipo === "ukp" ? ", the same row" : ""}). The maximum is \\(${cur.v}\\)${cur.s ? "" : " (on a tie, the item is not taken)"}.`);
        }
        if (k === R.N) nota += tipo === "ssp" ? (R.risposta ? T(` Tabella completa: \\(r(${n},${I.c}) = \\mathit{true}\\), la risposta è sì. Ora si ricostruisce un sottoinsieme.`, ` Table complete: \\(r(${n},${I.c}) = \\mathit{true}\\), the answer is yes. Now a subset is reconstructed.`) : T(` Tabella completa: \\(r(${n},${I.c}) = \\mathit{false}\\), la risposta è ${M.tinta(C.rosso, "no")}.`, ` Table complete: \\(r(${n},${I.c}) = \\mathit{false}\\), the answer is ${M.tinta(C.rosso, "no")}.`))
          : T(` Tabella completa: il valore ottimo è \\(v(${n},${I.c}) = ${R.val}\\). Ora si risale dalla cella \\((${n},${I.c})\\).`, ` Table complete: the optimal value is \\(v(${n},${I.c}) = ${R.val}\\). Now go back up from cell \\((${n},${I.c})\\).`);
      } else {
        const x = R.tb[t - 1];
        if (!x) nota = T("La risposta è no: nessun sottoinsieme da ricostruire.", "The answer is no: no subset to reconstruct.");
        else if (x.fine) nota = T(`Il ciclo si ferma (\\(k = ${x.k}\\) o \\(j = ${x.j}\\)).`, `The loop stops (\\(k = ${x.k}\\) or \\(j = ${x.j}\\)).`);
        else if (tipo === "ukp") nota = x.s ? T(`\\(s[${x.j}][${x.k}] = 1\\): una copia dell'oggetto ${x.j}, \\(x_{${x.j}} = ${x.x[x.j - 1]}\\); si resta nella riga \\(${x.j}\\), colonna \\(${x.k - I.w[x.j - 1]}\\).`, `\\(s[${x.j}][${x.k}] = 1\\): one copy of item type ${x.j}, \\(x_{${x.j}} = ${x.x[x.j - 1]}\\); stay in row \\(${x.j}\\), column \\(${x.k - I.w[x.j - 1]}\\).`)
          : T(`\\(s[${x.j}][${x.k}] = 0\\): nessuna altra copia dell'oggetto ${x.j}; si sale alla riga \\(${x.j - 1}\\).`, `\\(s[${x.j}][${x.k}] = 0\\): no further copy of item type ${x.j}; go up to row \\(${x.j - 1}\\).`);
        else nota = x.s ? T(`\\(s[${x.j}][${x.k}] = ${x.s}\\): \\(x_{${x.j}} = ${x.s}\\); si sale alla colonna \\(${x.k} - ${x.s > 1 ? x.s + "\\cdot " : ""}${I.w[x.j - 1]} = ${x.k - x.s * I.w[x.j - 1]}\\).`, `\\(s[${x.j}][${x.k}] = ${x.s}\\): \\(x_{${x.j}} = ${x.s}\\); go up to column \\(${x.k} - ${x.s > 1 ? x.s + "\\cdot " : ""}${I.w[x.j - 1]} = ${x.k - x.s * I.w[x.j - 1]}\\).`)
          : T(`\\(s[${x.j}][${x.k}] = 0\\): \\(x_{${x.j}} = 0\\); si sale restando nella colonna \\(${x.k}\\).`, `\\(s[${x.j}][${x.k}] = 0\\): \\(x_{${x.j}} = 0\\); go up staying in column \\(${x.k}\\).`);
        if (t >= R.tb.length && R.risposta) nota += tipo === "ssp" ? T(` Fine: il sottoinsieme \\(\\{${lista(R.presi)}\\}\\) ha peso \\(${R.peso} = c\\).`, ` End: the subset \\(\\{${lista(R.presi)}\\}\\) has weight \\(${R.peso} = c\\).`)
          : T(` Fine: \\(x = (${R.x.join(", ")})\\), peso ${R.peso} ≤ ${I.c}, profitto ${M.tinta(C.verde, String(R.prof))}.`, ` End: \\(x = (${R.x.join(", ")})\\), weight ${R.peso} ≤ ${I.c}, profit ${M.tinta(C.verde, String(R.prof))}.`);
      }
      const fin = t >= R.tb.length && k > R.N;
      const righe = [
        [T("celle calcolate", "cells computed"), `\\(${Math.min(k, R.N)} / ${R.N}\\)`],
        tipo === "ssp" ? [T("risposta \\(r(n,c)\\)", "answer \\(r(n,c)\\)"), k >= R.N ? (R.risposta ? T("sì", "yes") : "no") : "—"]
          : [T(`valore ottimo \\(v(n,c)\\)`, `optimal value \\(v(n,c)\\)`), k >= R.N ? `\\(${R.val}\\)` : "—"],
        [T("soluzione \\(x\\)", "solution \\(x\\)"), fin && R.risposta ? `\\((${R.x.join(",")})\\)` : "—"],
      ];
      return nota + M.tab([DP_FUNZ[tipo].nome, T("valore", "value")], righe, -1, C.a);
    },
    domanda: T("Confronta le quattro ricorrenze sulla stessa tabella: da quali celle dipende la cella arancione? Nello UKP la cella verde sta nella stessa riga: perché? Nel BKP conta le celle guardate per ogni cella.",
      "Compare the four recurrences on the same table: which cells does the orange cell depend on? In the UKP the green cell is in the same row: why? In the BKP count the cells examined for each cell."),
  };

  // =================================================================
  // 2. BRANCH-AND-BOUND PER LO ZAINO
  // =================================================================
  const BB_ES = [{ p: [10, 7, 6, 4], w: [5, 4, 3, 3], c: 9 }, { p: [15, 12, 10, 9, 7, 5, 3], w: [7, 6, 5, 5, 4, 3, 2], c: 16 }];
  /** albero del branch-and-bound a profondità: x_j = 1 prima di x_j = 0, bound di Dantzig, incumbent z */
  function bbCalcola(I) {
    const { p, w, c } = I, n = p.length;
    const ord = p.map((_, j) => j).sort((i, j) => (p[j] * w[i] - p[i] * w[j]) || (i - j));
    const ps = ord.map((j) => p[j]), ws = ord.map((j) => w[j]);
    const nodi = [];
    let z = 0, xott = [];
    const dantzig = (j, P, Wt) => {
      let r = c - Wt, v = M.Q(P), split = null;
      for (let i = j; i < n; i++) {
        if (ws[i] <= r) { r -= ws[i]; v = M.Qadd(v, M.Q(ps[i])); }
        else { if (r > 0) v = M.Qadd(v, M.Q(ps[i] * r, ws[i])); split = i; break; }
      }
      return { v, split, r };
    };
    const visita = (j, P, Wt, padre, x, xs) => {
      const nodo = { id: nodi.length, padre, liv: j, x, P, W: Wt, xs: xs.slice(), figli: [] };
      nodi.push(nodo);
      if (padre !== null) nodi[padre].figli.push(nodo.id);
      if (Wt > c) { nodo.stato = "inammissibile"; nodo.z = z; return; }
      const u = dantzig(j, P, Wt);
      nodo.ub = u.v; nodo.split = u.split; nodo.ubInt = M.Qfloor(u.v);
      if (u.split === null) {   // il bound è una soluzione ammissibile: tutti gli oggetti rimasti entrano
        const val = M.Qv(u.v);
        nodo.stato = val > z ? "migliora" : "integrale";
        if (val > z) { z = val; xott = xs.concat(Array(n - j).fill(1)); }
        nodo.z = z;
        return;
      }
      if (nodo.ubInt <= z) { nodo.stato = "potato"; nodo.z = z; return; }
      nodo.stato = "ramifica"; nodo.z = z;
      nodo.ramo = j;
      if (Wt + ws[j] <= c) visita(j + 1, P + ps[j], Wt + ws[j], nodo.id, 1, xs.concat([1]));
      else { const f = { id: nodi.length, padre: nodo.id, liv: j + 1, x: 1, P: P + ps[j], W: Wt + ws[j], xs: xs.concat([1]), figli: [], stato: "inammissibile", z }; nodi.push(f); nodo.figli.push(f.id); }
      visita(j + 1, P, Wt, nodo.id, 0, xs.concat([0]));
      nodo.zDopo = z;
    };
    visita(0, 0, 0, null, null, []);
    // posizioni orizzontali: le foglie in ordine, i nodi interni al centro dei figli
    let foglia = 0;
    const pos = (id) => {
      const nd = nodi[id];
      if (!nd.figli.length) nd.xp = foglia++;
      else { nd.figli.forEach(pos); nd.xp = (nodi[nd.figli[0]].xp + nodi[nd.figli[nd.figli.length - 1]].xp) / 2; }
    };
    pos(0);
    const prof = dpCalcola(I);
    return { nodi, ord, ps, ws, z, xott: ord.map((j, i) => [j, xott[i] || 0]), foglie: foglia, ottDP: prof.val, c };
  }
  function bbStato(st) {
    const D = st.dati;
    if (!D.ist) D.ist = { p: BB_ES[0].p.slice(), w: BB_ES[0].w.slice(), c: BB_ES[0].c, id: nuovoId() };
    if (D.bbId !== D.ist.id) { D.bbId = D.ist.id; D.bb = bbCalcola(D.ist); }
    const R = D.bb, k = M.passoK(st, R.nodi.length, PASSO);
    return { D, I: D.ist, R, k, cur: k >= 1 ? R.nodi[k - 1] : null };
  }
  const STILE_NODO = (C) => ({
    ramifica: { f: C.b, o: 0.25, s: C.b }, potato: { f: C.rosso, o: 0.3, s: C.rosso }, inammissibile: { f: C.grigio, o: 0.3, s: C.grigio },
    integrale: { f: C.verde, o: 0.22, s: C.verde }, migliora: { f: C.verde, o: 0.5, s: C.verde },
  });

  window.GI_RICETTE["oc-bb-knapsack"] = {
    titolo: T("Branch-and-bound per lo zaino", "Branch-and-bound for the knapsack"),
    parametri: [parPasso(T("◀ ▶ un nodo alla volta, «Esegui» per vederli tutti", "◀ ▶ one node at a time, «Run» to watch them all"))],
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [-1, 10, 20, -2],
    legenda: (st) => {
      const C = M.COL(st);
      return [
        [C.a, T("nodo in esame", "node under examination"), "pieno"],
        [C.b, T("nodo che si ramifica", "branching node"), "pieno"],
        [C.rosso, T("potato per bound (\\(\\lfloor UB \\rfloor \\le z\\))", "pruned by bound (\\(\\lfloor UB \\rfloor \\le z\\))"), "pieno"],
        [C.grigio, T("inammissibile (\\(W > c\\))", "infeasible (\\(W > c\\))"), "pieno"],
        [C.verde, T("soluzione intera: aggiorna \\(z\\)", "integer solution: updates \\(z\\)"), "pieno"],
      ];
    },
    monta(board, st) {
      const D = st.dati;
      const nuova = (I) => { D.ist = Object.assign(I, { id: nuovoId() }); vaiA(st, 1); M.ferma(st); st.aggiorna(); };
      M.comandi(st, [
        [T("Esempio 1", "Example 1"), T("istanza del corso: p = (10, 7, 6, 4), w = (5, 4, 3, 3), c = 9", "course instance: p = (10, 7, 6, 4), w = (5, 4, 3, 3), c = 9"), () => nuova({ p: BB_ES[0].p.slice(), w: BB_ES[0].w.slice(), c: BB_ES[0].c })],
        [T("Esempio 2", "Example 2"), T("sette oggetti, c = 16", "seven items, c = 16"), () => nuova({ p: BB_ES[1].p.slice(), w: BB_ES[1].w.slice(), c: BB_ES[1].c })],
        [T("Casuale", "Random"), T("dati casuali", "random data"), () => { const I = kpCasuale(); nuova(I); }],
        [T("Modifica…", "Edit…"), T("scrivi profitti, pesi e capacità", "type profits, weights and capacity"), () => {
          const s = chiedi(T("Profitti, pesi e capacità separati da «;» (da 2 a 8 oggetti), per esempio: 10 7 6 4 ; 5 4 3 3 ; 9",
            "Profits, weights and capacity separated by «;» (2 to 8 items), for example: 10 7 6 4 ; 5 4 3 3 ; 9"), D.ist.p.join(" ") + " ; " + D.ist.w.join(" ") + " ; " + D.ist.c);
          if (!s) return;
          const [a, b, c] = s.split(";"), p = interi(a || ""), w = interi(b || ""), cc = interi(c || "");
          if (!p || !w || !cc || cc.length !== 1 || p.length !== w.length || p.length < 2 || p.length > 8) { window.alert(T("Dati non validi: interi positivi, stesso numero di profitti e di pesi.", "Invalid data: positive integers, as many profits as weights.")); return; }
          nuova({ p, w, c: cc[0] });
        }],
      ], { k: PASSO });
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = bbStato(st), C = M.COL(st), [W, H] = dim(board), { I, R, k, cur } = S, n = I.p.length, stili = STILE_NODO(C);
      M.ridisegna(board, st, [S.D.bbId, k, M.scuro(), W, H].join("|"), (crea) => {
        pix(board);
        const d = disegno(crea, H);
        const lw = clamp(W * 0.13, 70, 130), top = 34, pad = 14;
        const dx = (W - lw - pad) / Math.max(1, R.foglie), nh = clamp((H - top - 60) / (n + 1) * 0.6, 26, 44), dy = (H - top - nh - 34) / n;
        const nw = clamp(dx - 8, 30, 74), fs = clamp(nw * 0.24, 9, 14);
        const X = (nd) => lw + (nd.xp + 0.5) * dx, Y = (nd) => top + nd.liv * dy + nh / 2;
        d.text(8, 12, T("oggetti in ordine di p/w", "items by p/w"), { anchorX: "left", fontSize: fs, strokeColor: C.muted, cssStyle: "font-style:italic" });
        for (let l = 0; l <= n; l++) {
          const y = top + l * dy + nh / 2;
          d.text(8, y, l === 0 ? T("radice", "root") : `${T("oggetto", "item")} ${R.ord[l - 1] + 1}`, { anchorX: "left", fontSize: fs, strokeColor: C.muted, cssStyle: "font-weight:600" });
        }
        const vis = R.nodi.slice(0, k);
        for (const nd of vis) if (nd.padre !== null) {
          const pa = R.nodi[nd.padre];
          d.line(X(pa), Y(pa) + nh / 2, X(nd), Y(nd) - nh / 2, { strokeColor: C.muted, strokeWidth: 1.6 });
          d.text((X(pa) + X(nd)) / 2 + (nd.x === 1 ? -9 : 9), (Y(pa) + Y(nd)) / 2, nd.x === 1 ? "1" : "0", { fontSize: fs, strokeColor: nd.x === 1 ? C.verde : C.muted, cssStyle: "font-weight:800" });
        }
        for (const nd of vis) {
          const st1 = stili[nd.stato], attuale = nd === cur;
          d.rect(X(nd) - nw / 2, Y(nd) - nh / 2, nw, nh, { strokeColor: attuale ? C.a : st1.s, strokeWidth: attuale ? 3.5 : 1.6, fillColor: attuale ? C.a : st1.f, fillOpacity: attuale ? 0.55 : st1.o });
          if (nd.stato === "inammissibile") d.text(X(nd), Y(nd), `✗ W=${nd.W}`, { fontSize: fs, strokeColor: C.testo });
          else {
            d.text(X(nd), Y(nd) - nh * 0.17, `UB=${nd.ubInt}`, { fontSize: fs, strokeColor: C.testo, cssStyle: "font-weight:800" });
            d.text(X(nd), Y(nd) + nh * 0.22, `P=${nd.P} W=${nd.W}`, { fontSize: fs * 0.82, strokeColor: C.muted });
          }
        }
        d.text(W - 10, H - 14, `z = ${cur ? cur.z : 0}`, { anchorX: "right", fontSize: clamp(fs * 1.3, 12, 17), strokeColor: C.verde, cssStyle: "font-weight:800" });
        d.text(W - 100, H - 14, T("incumbent", "incumbent"), { anchorX: "right", fontSize: fs, strokeColor: C.muted });
      });
    },
    formula(p, st) {
      const S = bbStato(st), { R, k, cur, I } = S;
      if (!cur) return "";
      const fin = k === R.nodi.length;
      if (fin) return T(`z = ${R.z} = z(I) \\quad \\text{(nodi esaminati: } ${R.nodi.length}\\text{ su } 2^{${I.p.length + 1}}-1 = ${2 ** (I.p.length + 1) - 1}\\text{)}`,
        `z = ${R.z} = z(I) \\quad \\text{(nodes examined: } ${R.nodi.length}\\text{ out of } 2^{${I.p.length + 1}}-1 = ${2 ** (I.p.length + 1) - 1}\\text{)}`);
      if (cur.stato === "inammissibile") return `W = ${cur.W} > c = ${I.c}`;
      return `UB = P + \\text{Dantzig} = ${M.Qtex(cur.ub)} \\;\\Rightarrow\\; \\lfloor UB \\rfloor = ${cur.ubInt} \\qquad z = ${cur.z}`;
    },
    letture(p, st) {
      const S = bbStato(st), { I, R, k, cur } = S, C = M.COL(st);
      if (!cur) return "";
      const ord = R.ord, xs = (nd) => nd.xs.length ? `\\((${nd.xs.map((v, i) => `x_{${ord[i] + 1}}=${v}`).join(",\\ ")})\\)` : T("nessuna decisione", "no decision");
      let nota;
      if (k === 1) nota = T(`Oggetti ordinati per \\(p_j/w_j\\) decrescente: ${lista(ord.map((j) => j + 1))}. L'albero esplora prima \\(x=1\\), poi \\(x=0\\) (profondità). Il bound di un nodo è il valore del rilassamento continuo, calcolato con la formula di Dantzig; essendo i profitti interi si può arrotondare per difetto. \\(z\\) è il valore della migliore soluzione trovata, all'inizio \\(0\\). `,
        `Items sorted by non-increasing \\(p_j/w_j\\): ${lista(ord.map((j) => j + 1))}. The tree explores \\(x=1\\) first, then \\(x=0\\) (depth first). The bound of a node is the value of the continuous relaxation, computed with the formula of Dantzig; since the profits are integer it can be rounded down. \\(z\\) is the value of the best solution found, initially \\(0\\). `);
      else nota = "";
      if (cur.stato === "inammissibile") nota += T(`Nodo ${cur.id + 1}: ${xs(cur)} dà peso \\(W = ${cur.W} > c = ${I.c}\\): ${M.tinta(C.muted, "inammissibile")}.`, `Node ${cur.id + 1}: ${xs(cur)} gives weight \\(W = ${cur.W} > c = ${I.c}\\): ${M.tinta(C.muted, "infeasible")}.`);
      else {
        const sp = cur.split;
        const dz = sp === null ? T(`Tutti gli oggetti rimasti entrano: il bound è una soluzione ammissibile, \\(\\mathrm{UB} = ${M.Qtex(cur.ub)}\\).`, `All the remaining items fit: the bound is a feasible solution, \\(\\mathrm{UB} = ${M.Qtex(cur.ub)}\\).`)
          : T(`Con residuo \\(c - W = ${I.c - cur.W}\\) l'oggetto critico è ${ord[sp] + 1} e \\(\\mathrm{UB} = ${M.Qtex(cur.ub)}\\), cioè \\(\\lfloor \\mathrm{UB} \\rfloor = ${cur.ubInt}\\).`,
            `With residual \\(c - W = ${I.c - cur.W}\\) the split item is ${ord[sp] + 1} and \\(\\mathrm{UB} = ${M.Qtex(cur.ub)}\\), that is \\(\\lfloor \\mathrm{UB} \\rfloor = ${cur.ubInt}\\).`);
        const zPrima = cur.stato === "migliora" ? cur.z : cur.z;
        let esito;
        if (cur.stato === "ramifica") esito = T(`\\(${cur.ubInt} > z = ${cur.z}\\): ${M.tinta(C.b, "si ramifica")} sull'oggetto ${ord[cur.ramo] + 1}.`, `\\(${cur.ubInt} > z = ${cur.z}\\): ${M.tinta(C.b, "branch")} on item ${ord[cur.ramo] + 1}.`);
        else if (cur.stato === "potato") esito = T(`\\(\\lfloor \\mathrm{UB} \\rfloor = ${cur.ubInt} \\le z = ${cur.z}\\): ${M.tinta(C.rosso, "potato per bound")}, nessuna soluzione migliore qui sotto.`, `\\(\\lfloor \\mathrm{UB} \\rfloor = ${cur.ubInt} \\le z = ${cur.z}\\): ${M.tinta(C.rosso, "pruned by bound")}, no better solution below.`);
        else if (cur.stato === "migliora") esito = T(`Nuovo incumbent: ${M.tinta(C.verde, "z = " + cur.z)}.`, `New incumbent: ${M.tinta(C.verde, "z = " + cur.z)}.`);
        else esito = T(`Valore non migliore di \\(z = ${cur.z}\\): il nodo si chiude.`, `Value not better than \\(z = ${cur.z}\\): the node is closed.`);
        nota += T(`Nodo ${cur.id + 1}: ${xs(cur)}, \\(P = ${cur.P}\\), \\(W = ${cur.W}\\). ${dz} ${esito}`, `Node ${cur.id + 1}: ${xs(cur)}, \\(P = ${cur.P}\\), \\(W = ${cur.W}\\). ${dz} ${esito}`);
      }
      if (k === R.nodi.length) nota += T(` Albero finito: ${M.tinta(C.verde, "z = " + R.z)}, oggetti ${lista(R.xott.filter(([, v]) => v).map(([j]) => j + 1).sort((a, b) => a - b))}.`, ` Tree finished: ${M.tinta(C.verde, "z = " + R.z)}, items ${lista(R.xott.filter(([, v]) => v).map(([j]) => j + 1).sort((a, b) => a - b))}.`);
      const righe = [
        [T("nodi esaminati", "nodes examined"), `\\(${k} / ${R.nodi.length}\\)`],
        [T("incumbent \\(z\\)", "incumbent \\(z\\)"), `\\(${cur.z}\\)`],
        [T("ottimo (programmazione dinamica)", "optimum (dynamic programming)"), k === R.nodi.length ? `\\(${R.ottDP}\\)` : "—"],
      ];
      return nota + M.tab([T("albero", "tree"), T("valore", "value")], righe, -1, C.a);
    },
    domanda: T("Perché il ramo \\(x=1\\) si esplora per primo? Prova a ordinare gli oggetti in modo diverso (con «Modifica…» metti più avanti quelli con rapporto \\(p/w\\) alto): quanti nodi in più servono?",
      "Why is the branch \\(x=1\\) explored first? Try other data with «Edit…»: how many more nodes does the tree need when the best-ratio items are far from the top?"),
  };

  // =================================================================
  // 3. COLORAZIONE DEI VERTICI
  // =================================================================
  const LATO = 10;
  const ang = (i, r, a0 = 90) => [5 + r * Math.cos((a0 + 72 * i) * Math.PI / 180), 5 + r * Math.sin((a0 + 72 * i) * Math.PI / 180)];
  const PETERSEN = {
    n: 10,
    E: [[1, 2], [1, 5], [1, 6], [2, 3], [2, 7], [3, 4], [3, 8], [4, 5], [4, 9], [5, 10], [6, 8], [6, 9], [7, 9], [7, 10], [8, 10]].map(([a, b]) => [a - 1, b - 1]),
    P: [0, 1, 2, 3, 4].map((i) => ang(i, 4.3)).concat([0, 1, 2, 3, 4].map((i) => ang(i, 2.1))),
    nome: "Petersen",
  };
  const CORONA = (() => {
    const E = [];
    for (let i = 1; i <= 4; i++) for (let j = 1; j <= 4; j++) if (i !== j) E.push([2 * i - 2, 2 * j - 1]);
    const P = [];
    for (let i = 1; i <= 4; i++) { P[2 * i - 2] = [2.5, 9 - 2.5 * (i - 1)]; P[2 * i - 1] = [7.5, 9 - 2.5 * (i - 1)]; }
    return { n: 8, E, P, nome: "crown" };
  })();
  const adiacenze = (G) => { const A = Array.from({ length: G.n }, () => new Set()); for (const [a, b] of G.E) { A[a].add(b); A[b].add(a); } return A; };
  function grafoCasuale() {
    const n = M.casuale(7, 10), E = [], P = [];
    for (let i = 0; i < n; i++) { let q; for (let t = 0; t < 200; t++) { q = [M.casuale(0, LATO), M.casuale(0, LATO)]; if (P.every((r) => Math.hypot(q[0] - r[0], q[1] - r[1]) >= 2.4)) break; } P.push(q); }
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1]) < 5.2 && Math.random() < 0.65) E.push([i, j]);
    const A = adiacenze({ n, E });
    for (let i = 0; i < n; i++) if (!A[i].size) { let b = (i + 1) % n, dm = 1e9; for (let j = 0; j < n; j++) if (j !== i) { const dd = Math.hypot(P[i][0] - P[j][0], P[i][1] - P[j][1]); if (dd < dm) { dm = dd; b = j; } } E.push([i, b]); A[i].add(b); A[b].add(i); }
    return { n, E, P, nome: "random" };
  }
  /** passi di GC (lista data o grado decrescente) e di DSATUR; colori da 0 */
  function colTraccia(G, regola) {
    const n = G.n, A = adiacenze(G), grado = A.map((s) => s.size), col = new Array(n).fill(-1);
    const ord = regola === "gcg" ? [...Array(n).keys()].sort((i, j) => grado[j] - grado[i] || i - j) : [...Array(n).keys()];
    const passi = [{ col: col.slice(), cur: null, ord }];
    for (let s = 0; s < n; s++) {
      let v, cand = null;
      if (regola === "dsatur") {
        cand = [];
        for (let u = 0; u < n; u++) if (col[u] < 0) {
          const sat = new Set([...A[u]].filter((w) => col[w] >= 0).map((w) => col[w])).size;
          cand.push({ u, sat, du: [...A[u]].filter((w) => col[w] < 0).length });
        }
        v = cand.reduce((b, x) => (x.sat > b.sat || (x.sat === b.sat && x.du > b.du) ? x : b), cand[0]).u;
      } else v = ord[s];
      const forb = [...new Set([...A[v]].filter((w) => col[w] >= 0).map((w) => col[w]))].sort((a, b) => a - b);
      let c = 0;
      while (forb.includes(c)) c++;
      col[v] = c;
      passi.push({ col: col.slice(), cur: v, forb, c, cand, vicini: [...A[v]].sort((a, b) => a - b) });
    }
    return { passi, nc: Math.max(...col) + 1 };
  }
  /** numero cromatico (n <= 10) e numero di clique, per enumerazione */
  function cromatico(G) {
    const n = G.n, A = adiacenze(G), col = new Array(n).fill(-1);
    let best = n;
    const dfs = (v, usati) => {
      if (usati >= best) return;
      if (v === n) { best = usati; return; }
      for (let c = 0; c <= usati && c < best; c++) {
        if ([...A[v]].some((w) => w < v && col[w] === c)) continue;
        col[v] = c; dfs(v + 1, Math.max(usati, c + 1)); col[v] = -1;
      }
    };
    dfs(0, 0);
    let om = 1;
    for (let m = 1; m < 1 << n; m++) {
      const S = []; for (let i = 0; i < n; i++) if (m & (1 << i)) S.push(i);
      if (S.length > om && S.every((a, i) => S.slice(i + 1).every((b) => A[a].has(b)))) om = S.length;
    }
    return { chi: best, omega: om };
  }
  function colStato(st) {
    const D = st.dati;
    if (!D.G) { D.G = PETERSEN; D.Gid = nuovoId(); D.P = PETERSEN.P.map((q) => q.slice()); }
    if (D.cFirma !== D.Gid) {
      D.cFirma = D.Gid;
      D.ctr = {}; for (const r of ["gc", "gcg", "dsatur"]) D.ctr[r] = colTraccia(D.G, r);
      D.cro = cromatico(D.G);
    }
    const regola = st.chiave(), R = D.ctr[regola], K = D.G.n, k = M.passoK(st, K, PASSO);
    return { D, G: D.G, regola, R, K, k, E: R.passi[k] };
  }
  const COL_FUNZ = {
    gc: { etichetta: T("Greedy (lista 1…n)", "Greedy (list 1…n)") },
    gcg: { etichetta: T("Greedy (grado decrescente)", "Greedy (decreasing degree)") },
    dsatur: { etichetta: "DSATUR" },
  };
  const NOME_COL = { gc: T("Greedy, lista 1…n", "Greedy, list 1…n"), gcg: T("Greedy, grado decrescente", "Greedy, decreasing degree"), dsatur: "DSATUR" };

  window.GI_RICETTE["oc-coloring"] = {
    titolo: T("Colorazione dei vertici: greedy e DSATUR", "Vertex coloring: greedy and DSATUR"),
    funzioni: COL_FUNZ,
    etichettaFunzioni: T("Algoritmo", "Algorithm"),
    parametri: [parPasso(T("◀ ▶ un vertice alla volta, «Esegui» per vederli tutti", "◀ ▶ one vertex at a time, «Run» to watch them all"))],
    assi: false,
    stessaScala: true,
    opzioniBoard: M.OPZ,
    vista: [-1, LATO + 1, LATO + 1, -1],
    legenda: (st) => {
      const C = M.COL(st);
      return [
        [C.a, T("vertice appena colorato (bordo spesso)", "vertex just colored (thick border)"), "punto"],
        [C.muted, T("spigoli del vertice corrente", "edges of the current vertex"), ""],
        [C.grigio, T("non ancora colorato (bianco)", "not yet colored (white)"), "punto"],
      ];
    },
    monta(board, st) {
      const D = st.dati;
      nuovaVoce(st);
      D.ptsBoard = null;
      const nuovo = (G) => { D.G = G; D.Gid = nuovoId(); D.P = G.P.map((q) => q.slice()); vaiA(st, 1); M.ferma(st); st.aggiorna(); };
      M.comandi(st, [
        [T("Petersen", "Petersen"), T("il grafo di Petersen, istanza di riferimento del corso", "the Petersen graph, the reference instance of the course"), () => nuovo(PETERSEN)],
        [T("Grafo a corona", "Crown graph"), T("\\(G_4\\): il greedy con la lista 1…8 usa 4 colori, DSATUR 2", "G_4: greedy with the list 1…8 uses 4 colors, DSATUR 2"), () => nuovo(CORONA)],
        [T("Casuale", "Random"), T("un grafo casuale di 7–10 vertici", "a random graph with 7–10 vertices"), () => nuovo(grafoCasuale())],
      ], { k: PASSO });
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = colStato(st), D = st.dati, C = M.COL(st), { G, E, k } = S, P = D.P, PAL = O.PALETTE(C);
      // i vertici: punti trascinabili
      if (D.ptsBoard !== board || D.pts.length !== G.n) {
        if (D.ptsBoard === board) for (const o of D.pts) { try { board.removeObject(o); } catch (e) { /* già tolto */ } }
        D.ptsBoard = board;
        D.pts = P.map((q, i) => {
          const pt = board.create("point", q.slice(), {
            name: String(i + 1), withLabel: false, size: 11, showInfobox: false, fillColor: "#fff", strokeColor: C.muted, strokeWidth: 2.5,
            highlightFillColor: C.grigio, highlightStrokeColor: C.a, snapToGrid: true, snapSizeX: 0.25, snapSizeY: 0.25,
          });
          pt.on("drag", () => {
            const X = clamp(pt.X(), 0, LATO), Y = clamp(pt.Y(), 0, LATO);
            if (X !== pt.X() || Y !== pt.Y()) pt.moveTo([X, Y]);
            P[i] = [pt.X(), pt.Y()];
            st.aggiorna();
          });
          return pt;
        });
      } else D.pts.forEach((pt, i) => { if (Math.abs(pt.X() - P[i][0]) > 1e-9 || Math.abs(pt.Y() - P[i][1]) > 1e-9) pt.moveTo(P[i]); });
      D.pts.forEach((pt, i) => {
        const c = E.col[i], cur = i === E.cur;
        pt.setAttribute({
          fillColor: c >= 0 ? (PAL[c] || C.muted) : (M.scuro() ? "#1b2636" : "#ffffff"),
          strokeColor: cur ? C.testo : c >= 0 ? (PAL[c] || C.muted) : C.muted, strokeWidth: cur ? 5 : 2.5, size: cur ? 13 : 11,
        });
      });
      const [W, H] = dim(board);
      if (D.dim !== W + "x" + H) { D.dim = W + "x" + H; M.adatta(board, -0.8, LATO + 0.9, LATO + 0.8, -0.8); }
      M.ridisegna(board, st, [D.Gid, k, S.regola, P.map((q) => q[0].toFixed(2) + q[1].toFixed(2)).join(";"), M.scuro(), W, H].join("|"), (crea) => {
        for (const [a, b] of G.E) {
          const sul = E.cur != null && (a === E.cur || b === E.cur);
          M.linea(crea, P[a][0], P[a][1], P[b][0], P[b][1], { strokeColor: sul ? C.testo : C.muted, strokeWidth: sul ? 3.2 : 1.8, strokeOpacity: sul ? 0.9 : 0.7 });
        }
        // il numero di ogni vertice sopra il punto, e il numero del colore accanto ai vertici colorati
        P.forEach((q, i) => M.scritta(crea, q[0], q[1], String(i + 1), { fontSize: 15, layer: 10, strokeColor: E.col[i] >= 0 ? "#ffffff" : C.testo, cssStyle: "font-weight:800;pointer-events:none" }));
        P.forEach((q, i) => { if (E.col[i] >= 0) M.scritta(crea, q[0] + 0.48, q[1] + 0.5, "c" + (E.col[i] + 1), { fontSize: 14, strokeColor: PAL[E.col[i]] || C.muted, cssStyle: "font-weight:800" }); });
      });
    },
    formula(p, st) {
      const S = colStato(st), { E, k, K, R, D } = S;
      const usati = E.col.some((c) => c >= 0) ? Math.max(...E.col) + 1 : 0;
      if (k === K) return T(`\\text{colori usati} = ${R.nc} \\qquad \\omega(G) = ${D.cro.omega} \\;\\le\\; \\chi(G) = ${D.cro.chi} \\;\\le\\; ${R.nc}`, `\\text{colors used} = ${R.nc} \\qquad \\omega(G) = ${D.cro.omega} \\;\\le\\; \\chi(G) = ${D.cro.chi} \\;\\le\\; ${R.nc}`);
      return T(`\\text{passo } ${k}/${K}:\\quad \\text{colori usati} = ${usati}`, `\\text{step } ${k}/${K}:\\quad \\text{colors used} = ${usati}`);
    },
    letture(p, st) {
      const S = colStato(st), { E, k, K, R, D, regola, G } = S, C = M.COL(st), PAL = O.PALETTE(C);
      const col = (c) => M.tinta(PAL[c] || C.muted, "c" + (c + 1));
      let nota;
      if (k === 0) nota = regola === "dsatur"
        ? T("DSATUR: a ogni passo si colora, con il colore libero più piccolo, il vertice non colorato con più colori diversi fra i vicini (grado di saturazione); a pari saturazione, il maggior numero di vicini non colorati, poi l'indice più piccolo.",
          "DSATUR: at each step color, with the smallest free color, the uncolored vertex with the most different colors among its neighbours (saturation degree); on a tie, the most uncolored neighbours, then the smallest index.")
        : T(`Greedy: i vertici si guardano nella lista ${lista(R.passi[0].ord.map((v) => v + 1))}; ognuno prende il colore libero più piccolo.`,
          `Greedy: the vertices are examined in the list ${lista(R.passi[0].ord.map((v) => v + 1))}; each takes the smallest free color.`);
      else {
        const v = E.cur + 1, vic = E.vicini.map((x) => x + 1);
        const proibiti = E.forb.length ? lista(E.forb.map((c) => col(c))) : T("nessuno", "none");
        nota = T(`Vertice ${v}, vicini ${lista(vic)}; colori già usati dai vicini: ${proibiti}. Il colore libero più piccolo è ${col(E.c)}.`,
          `Vertex ${v}, neighbours ${lista(vic)}; colors already used by the neighbours: ${proibiti}. The smallest free color is ${col(E.c)}.`);
        if (regola === "dsatur") {
          const prima = E.cand, scelto = prima.find((x) => x.u === E.cur);
          nota += `<br>${T("Scelta: fra i non colorati", "Choice: among the uncolored")}, ${prima.map((x) => `${x.u + 1}: (sat ${x.sat}, ${T("gr", "deg")} ${x.du})`).join("; ")} → ${T("vertice", "vertex")} ${scelto.u + 1}.`;
        }
        if (k === K) nota += T(` Fine: ${M.tinta(C.a, R.nc + " colori")}, un upper bound su \\(\\chi(G)\\).`, ` End: ${M.tinta(C.a, R.nc + " colors")}, an upper bound on \\(\\chi(G)\\).`);
      }
      const righe = [
        [T("colori usati dall'algoritmo", "colors used by the algorithm"), k === K ? `\\(${R.nc}\\)` : "—"],
        ...["gc", "gcg", "dsatur"].map((r) => [NOME_COL[r], `\\(${D.ctr[r].nc}\\)`]),
        [T("\\(\\chi(G)\\) (esatto)", "\\(\\chi(G)\\) (exact)"), `\\(${D.cro.chi}\\)`],
        [T("\\(\\omega(G)\\), lower bound", "\\(\\omega(G)\\), lower bound"), `\\(${D.cro.omega}\\)`],
      ];
      return nota + M.tab([T("colorazione", "coloring"), T("colori", "colors")], righe, -1, C.a);
    },
    domanda: T("Sul grafo a corona confronta il greedy con la lista 1…8 e DSATUR: perché DSATUR trova subito 2 colori? Poi trascina i vertici: cambia il risultato? (No: dipende solo dal grafo.) Con «Casuale» cerca un grafo in cui DSATUR usa più di \\(\\chi(G)\\) colori.",
      "On the crown graph compare greedy with the list 1…8 and DSATUR: why does DSATUR find 2 colors at once? Then drag the vertices: does the result change? (No: it depends only on the graph.) With «Random» look for a graph where DSATUR uses more than \\(\\chi(G)\\) colors."),
  };

  window.GI_OC_A = { dpCalcola, DP_ES, bbCalcola, colTraccia, cromatico, PETERSEN, CORONA };
})();
