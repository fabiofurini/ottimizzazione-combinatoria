/* Laboratorio di «Ottimizzazione combinatoria / Combinatorial Optimization»: metaeuristiche e approssimazione per il TSP.
 *
 *   oc-meta-tsp     simulated annealing e tabu search con il 2-opt (capitolo «Metaheuristics»): istanza di riferimento
 *                   (5 città), TSP20 e l'istanza a 6 città degli esercizi; numeri casuali di Park e Miller come nelle
 *                   note e nel codice C++ (SimulatedAnnealingTSP.cpp, TabuSearchTSP.cpp): con seed = 1 le prime
 *                   iterazioni rifanno l'esempio del capitolo (25 → 29 → 22 → 24 → 18).
 *   oc-tsp-approx   TSP metrico: double tree e Christofides (capitolo «TSP approximation»): Kruskal, archi raddoppiati
 *                   o accoppiamento perfetto minimo dei vertici dispari, circuito euleriano con la regola di Fleury,
 *                   scorciatoie; istanza di riferimento (DT 22, CH 18, z 18), esercizi 1 e 2, famiglie tight.
 *
 * I conti sono verificati con lo script check_oc_f.py (nello scratchpad della sessione) sugli esempi dei capitoli.
 * Formato delle ricette: commento in testa a interattivi.js; strumenti comuni in gi-comune.js e gi-oc-0.js.
 */
(function () {
  "use strict";
  const GI = window.GI, M = window.GI_MIP, O = window.GI_OC;
  const T = GI.T;
  const { PASSO, parPasso, vaiA, clamp, nuovoId, osservaDimensioni, nuovaVoce, dim, pix, disegno, daIndirizzo, chiedi, menuIstanze, mostraCursore, parkMiller } = O;
  window.GI_RICETTE = window.GI_RICETTE || {};

  // =================================================================
  // 0. STRUMENTI COMUNI
  // =================================================================
  /** numero con c decimali fissi: in TeX (virgola «{,}» in italiano) e in testo */
  const fx = (x, c) => { const s = (+x).toFixed(c); return GI.EN ? s : s.replace(".", "{,}"); };
  const fxt = (x, c) => { const s = (+x).toFixed(c); return GI.EN ? s : s.replace(".", ","); };
  const nt = (x) => GI.numTxt(x, 4);
  /** distanze euclidee arrotondate all'intero più vicino, come nelle note */
  const rotonda = (P) => P.map((a) => P.map((b) => Math.floor(Math.hypot(a[0] - b[0], a[1] - b[1]) + 0.5)));
  const lunghezza = (d, t) => t.reduce((s, c, i) => s + d[c][t[(i + 1) % t.length]], 0);
  const seq = (t) => "(" + t.map((c) => c + 1).join(", ") + ")";
  const seqTex = (t) => "(" + t.map((c) => c + 1).join(",") + ")";
  /** città su un cerchio, nell'ordine dato (in senso antiorario dall'alto), come il pentagono delle note */
  const sulCerchio = (ordine, r = 4) => {
    const P = [];
    ordine.forEach((c, k) => { const a = (90 + 360 * k / ordine.length) * Math.PI / 180; P[c] = [5 + r * Math.cos(a), 5 + r * Math.sin(a)]; });
    return P;
  };
  const metrica = (d) => d.every((r, i) => r.every((x, j) => d.every((_, k) => x <= d[i][k] + d[k][j])));
  /** Held-Karp: giro ottimo (n <= 12) dalla città 0 */
  function heldKarp(d) {
    const n = d.length, N = 1 << n, dp = new Float64Array(N * n).fill(Infinity), pr = new Int8Array(N * n).fill(-1);
    dp[n] = 0;   // S = {0}, j = 0
    for (let S = 1; S < N; S += 2) for (let j = 0; j < n; j++) {
      const v0 = dp[S * n + j];
      if (!((S >> j) & 1) || v0 === Infinity) continue;
      for (let q = 1; q < n; q++) {
        if ((S >> q) & 1) continue;
        const S2 = S | (1 << q), v = v0 + d[j][q];
        if (v < dp[S2 * n + q]) { dp[S2 * n + q] = v; pr[S2 * n + q] = j; }
      }
    }
    let best = Infinity, last = -1;
    for (let j = 1; j < n; j++) { const v = dp[(N - 1) * n + j] + d[j][0]; if (v < best) { best = v; last = j; } }
    const t = [];
    let S = N - 1, j = last;
    while (j > 0) { t.push(j); const p = pr[S * n + j]; S ^= 1 << j; j = p; }
    t.push(0);
    t.reverse();
    if (t.length > 2 && t[1] > t[t.length - 1]) t.splice(1, t.length - 1, ...t.slice(1).reverse());   // verso come nelle note: (1,3,5,2,4)
    return { tour: t, len: best };
  }
  /** nearest neighbour dalla città 0 (pareggi sull'indice più piccolo), come NearestNeighbour.cpp */
  function vicino(d) {
    const n = d.length, p = [0], vis = new Array(n).fill(false);
    vis[0] = true;
    while (p.length < n) {
      const l = p[p.length - 1];
      let nx = -1;
      for (let j = 0; j < n; j++) if (!vis[j] && (nx < 0 || d[l][j] < d[l][nx])) nx = j;
      p.push(nx); vis[nx] = true;
    }
    return p;
  }
  /** pixel della città i dentro il riquadro [x0, y0, w, h] (y verso il basso), stessa scala sui due assi */
  function cornice(P, x0, y0, w, h, pad = 26) {
    const xs = P.map((p) => p[0]), ys = P.map((p) => p[1]);
    const a = Math.min(...xs), b = Math.max(...xs), c = Math.min(...ys), e = Math.max(...ys);
    const s = Math.min((w - 2 * pad) / Math.max(b - a, 1e-9), (h - 2 * pad) / Math.max(e - c, 1e-9));
    const ox = x0 + (w - s * (b - a)) / 2, oy = y0 + (h - s * (e - c)) / 2;
    const q = (i) => [ox + s * (P[i][0] - a), oy + s * (e - P[i][1])];
    const cx = (a + b) / 2, cy = (c + e) / 2;
    q.fuori = (i, r = 15) => {   // spostamento dell'etichetta verso l'esterno
      const dx = P[i][0] - cx, dy = -(P[i][1] - cy), m = Math.hypot(dx, dy);
      if (m < 1e-9) return [r * 0.8, -r * 0.8];
      return [r * dx / m, r * dy / m];
    };
    return q;
  }
  /** città, segmenti (anche paralleli, per i multigrafi) ed etichette delle distanze, in pixel */
  function mappa(crea, H, C, q, n, piccole) {
    const d = disegno(crea, H);
    const fondo = M.scuro() ? "#0f1722" : "#fff";
    const seg = (i, j, attr, off = 0) => {
      let [x0, y0] = q(i), [x1, y1] = q(j);
      if (off) { const L = Math.hypot(x1 - x0, y1 - y0) || 1, nx = -(y1 - y0) / L * off, ny = (x1 - x0) / L * off; x0 += nx; x1 += nx; y0 += ny; y1 += ny; }
      return d.line(x0, y0, x1, y1, Object.assign({ strokeColor: C.grigio, strokeWidth: 2 }, attr));
    };
    const freccia = (i, j, attr, off = 0) => {
      let [x0, y0] = q(i), [x1, y1] = q(j);
      const L = Math.hypot(x1 - x0, y1 - y0) || 1, ux = (x1 - x0) / L, uy = (y1 - y0) / L;
      if (off) { x0 += -uy * off; x1 += -uy * off; y0 += ux * off; y1 += ux * off; }
      x1 -= ux * 9; y1 -= uy * 9; x0 += ux * 7; y0 += uy * 7;
      return crea("arrow", [[x0, H - y0], [x1, H - y1]], Object.assign({ fixed: true, highlight: false, strokeWidth: 4, lastArrow: { type: 2, size: 4 } }, attr));
    };
    const eti = (i, j, s, col) => {
      if (!piccole) return;
      const [x0, y0] = q(i), [x1, y1] = q(j);
      crea("text", [(x0 + x1) / 2, H - (y0 + y1) / 2, String(s)], { display: "html", fixed: true, highlight: false, anchorX: "middle", anchorY: "middle", fontSize: 13, strokeColor: col || C.testo, layer: 12,
        cssStyle: `font-weight:700;background:${fondo};padding:0 3px;border-radius:4px;border:1px solid ${col || C.line};line-height:1.15` });
    };
    const citta = (i, attr = {}, etichetta = true) => {
      const [x, y] = q(i);
      d.dot(x, y, attr.size || (n > 12 ? 3.5 : 5), Object.assign({ fillColor: fondo, strokeColor: C.muted, strokeWidth: 1.6, layer: 9 }, attr));
      if (etichetta) {
        const [ox, oy] = q.fuori(i, n > 12 ? 11 : 15);
        d.text(x + ox, y + oy, String(i + 1), { fontSize: n > 12 ? 11 : 14, strokeColor: C.testo, layer: 11, cssStyle: "font-weight:700" });
      }
    };
    return { d, seg, freccia, eti, citta, fondo };
  }
  /** piccolo grafico delle lunghezze: corrente e migliore fino al passo k, z(I) tratteggiato */
  function curva(crea, H, C, box, serie, k, z, K) {
    const d = disegno(crea, H), [x0, y0, w, h] = box;
    const tutte = serie.cur.concat(serie.best, z ? [z] : []);
    let lo = Math.min(...tutte), hi = Math.max(...tutte);
    if (hi - lo < 4) { hi += 2; lo -= 2; }
    const pad = (hi - lo) * 0.06; lo -= pad; hi += pad;
    const X = (t) => x0 + w * t / Math.max(1, K), Y = (v) => y0 + h * (hi - v) / (hi - lo);
    d.rect(x0, y0, w, h, { strokeColor: C.line, strokeWidth: 1 });
    const fs = 11;
    d.text(x0 - 4, Y(hi - pad), String(Math.round(hi - pad)), { anchorX: "right", fontSize: fs, strokeColor: C.muted });
    d.text(x0 - 4, Y(lo + pad), String(Math.round(lo + pad)), { anchorX: "right", fontSize: fs, strokeColor: C.muted });
    d.text(x0, y0 + h + 10, "0", { fontSize: fs, strokeColor: C.muted });
    d.text(x0 + w, y0 + h + 10, String(K), { fontSize: fs, strokeColor: C.muted });
    d.text(x0 + w / 2, y0 + h + 10, T("iterazione", "iteration"), { fontSize: fs, strokeColor: C.muted, cssStyle: "font-style:italic" });
    d.text(x0, y0 - 9, T("lunghezza del giro", "tour length"), { anchorX: "left", fontSize: fs, strokeColor: C.muted, cssStyle: "font-style:italic" });
    if (z) {
      d.line(x0, Y(z), x0 + w, Y(z), { strokeColor: C.rosso, strokeWidth: 1.4, dash: 2 });
      d.text(x0 + w - 3, Y(z) - 8, `z(I) = ${z}`, { anchorX: "right", fontSize: fs, strokeColor: C.rosso });
    }
    const kk = Math.min(k, serie.cur.length - 1);
    const passo = Math.max(1, Math.ceil(kk / 2000));
    const pl = (v, attr) => {
      const xs = [], ys = [];
      for (let t = 0; t <= kk; t += passo) { xs.push(X(t)); ys.push(H - Y(v[t])); }
      if (xs.length && (kk % passo)) { xs.push(X(kk)); ys.push(H - Y(v[kk])); }
      if (xs.length === 1) { xs.push(xs[0]); ys.push(ys[0]); }
      crea("curve", [xs, ys], Object.assign({ fixed: true, highlight: false }, attr));
    };
    pl(serie.cur, { strokeColor: C.grigio, strokeWidth: 1.4 });
    pl(serie.best, { strokeColor: C.blu, strokeWidth: 2.6 });
    d.line(X(kk), y0, X(kk), y0 + h, { strokeColor: C.a, strokeWidth: 1.2, dash: 2 });
    d.dot(X(kk), Y(serie.cur[kk]), 3, { fillColor: C.a, strokeColor: C.a });
  }
  /** tabella HTML dentro la board (testo semplice, niente formule) */
  function tabellaBoard(crea, H, C, x, y, intest, righe, corrente, larg) {
    const bordo = M.scuro() ? "#2a3b52" : "#e3e8ef", ev = `color-mix(in srgb, ${C.a} 20%, transparent)`;
    const html = `<table class="gi-tab-f" style="display:table;margin:0;border:0;border-collapse:collapse;font-size:12px;line-height:1.25;color:${C.testo};${larg ? "width:" + larg + "px;" : ""}font-variant-numeric:tabular-nums">` +
      `<tr>${intest.map((t) => `<th style="padding:1px 5px;border-bottom:1px solid ${bordo};color:${C.muted};font-weight:600;text-align:right">${t}</th>`).join("")}</tr>` +
      righe.map((r, i) => `<tr style="${i === corrente ? `background:${ev};font-weight:700` : ""}">` +
        r.map((c) => `<td style="padding:1px 5px;text-align:right;white-space:nowrap">${c}</td>`).join("") + "</tr>").join("") + "</table>";
    return crea("text", [x, H - y, html], { display: "html", anchorX: "left", anchorY: "top", fixed: true, highlight: false, fontSize: 12, layer: 12 });
  }

  /** istanza iniziale da un link: #ist=2 (voce del menu «Istanza», da 1) e, per le famiglie, #n=9 */
  function istanzaDaIndirizzo(st, voci, carica) {
    if (st.dati.istHash) return;
    st.dati.istHash = true;
    const h = decodeURIComponent(location.hash || ""), m = /ist=(\d+)/.exec(h), nn = /[#&]n=(\d+)/.exec(h);
    setTimeout(() => {
      if (m && voci[+m[1] - 1]) carica(voci[+m[1] - 1], +m[1] - 1);
      if (nn && M.inputDi(st, "n")) st.imposta("n", +nn[1]);
    }, 20);
  }

  // =================================================================
  // 1. SIMULATED ANNEALING E TABU SEARCH CON IL 2-OPT
  // =================================================================
  const D_REF = [[0, 5, 2, 2, 9], [5, 0, 4, 3, 4], [2, 4, 0, 4, 7], [2, 3, 4, 0, 7], [9, 4, 7, 7, 0]];
  const XY20 = [[0, 18], [55, 35], [32, 11], [47, 47], [79, 20], [83, 11], [30, 20], [53, 17], [71, 4], [83, 40],
    [17, 52], [88, 18], [46, 16], [91, 32], [15, 0], [10, 37], [62, 28], [36, 16], [32, 33], [91, 39]];
  const OPT20 = [1, 16, 11, 19, 4, 2, 17, 10, 20, 14, 12, 5, 6, 9, 8, 13, 18, 7, 3, 15].map((c) => c - 1);
  const D_ES6 = [[0, 5, 1, 7, 7, 4], [5, 0, 4, 5, 2, 1], [1, 4, 0, 6, 6, 4], [7, 5, 6, 0, 7, 6], [7, 2, 6, 7, 0, 2], [4, 1, 4, 6, 2, 0]];
  const PAR_PICCOLE = { T0: 5, alpha: 0.8, L: 2, Tmin: 3, maxIt: 10 };
  const META_ES = [
    { nome: T("di riferimento (5 città)", "reference instance (5 cities)"), titolo: T("la matrice delle note, ottimo 18; SA con T0 = 5, α = 0,8, L = 2, Tmin = 3 (l'esempio del capitolo)", "the matrix of the notes, optimum 18; SA with T0 = 5, α = 0.8, L = 2, Tmin = 3 (the example of the chapter)"),
      mat: D_REF, P: sulCerchio([0, 2, 4, 1, 3]), par: PAR_PICCOLE },
    { nome: T("TSP20 (istanza media)", "TSP20 (medium instance)"), titolo: T("20 città nel piano, ottimo 291; SA con T0 = 20, α = 0,95, L = 100, Tmin = 0,5; TS con 200 iterazioni", "20 cities in the plane, optimum 291; SA with T0 = 20, α = 0.95, L = 100, Tmin = 0.5; TS with 200 iterations"),
      mat: rotonda(XY20), P: XY20, opt: { tour: OPT20, len: 291 }, par: { T0: 20, alpha: 0.95, L: 100, Tmin: 0.5, maxIt: 200 } },
    { nome: T("degli esercizi (6 città)", "of the exercises (6 cities)"), titolo: T("la matrice degli esercizi su SA e TS, ottimo 20", "the matrix of the exercises on SA and TS, optimum 20"),
      mat: D_ES6, P: sulCerchio([0, 2, 3, 1, 4, 5]), par: PAR_PICCOLE },
  ];
  const MOSSE = (n) => { const m = []; for (let i = 0; i < n - 1; i++) for (let j = i + 2; j < n; j++) if (!(i === 0 && j === n - 1)) m.push([i, j]); return m; };
  const applica = (t, i, j) => t.slice(0, i + 1).concat(t.slice(i + 1, j + 1).reverse(), t.slice(j + 1));
  const archiMossa = (t, i, j) => {
    const n = t.length, a = t[i], b = t[i + 1], c = t[j], e = t[(j + 1) % n];
    return { a, b, c, e, rimossi: [[a, b], [c, e]], aggiunti: [[a, c], [b, e]] };
  };
  /** SimulatedAnnealingTSP.cpp: due Rand() per iterazione (u sceglie la mossa, v il test di Metropolis) */
  function corsaSA(d, par, seed) {
    const r = parkMiller(seed), mosse = MOSSE(d.length), Mm = mosse.length, start = vicino(d), f0 = lunghezza(d, start);
    let cur = start, f = f0, fb = f0, bestAt = 0, Tt = par.T0;
    const it = [], serie = { cur: [f0], best: [f0] };
    while (Tt > par.Tmin && it.length < 60000) {
      for (let l = 0; l < par.L; l++) {
        const u = r(), k = Math.floor(u * Mm), [i, j] = mosse[k], A = archiMossa(cur, i, j);
        const de = d[A.a][A.c] + d[A.b][A.e] - d[A.a][A.b] - d[A.c][A.e];
        const v = r(), p = Math.exp(-de / Tt), acc = de <= 0 || v < p, prima = cur;
        if (acc) { cur = applica(cur, i, j); f += de; if (f < fb) { fb = f; bestAt = it.length + 1; } }
        it.push({ T: Tt, u, k, i, j, de, v, p, acc, prima, dopo: cur, f, fb, bestAt, A, temp: Math.round(Math.log(Tt / par.T0) / Math.log(par.alpha)) });
        serie.cur.push(f); serie.best.push(fb);
      }
      Tt = par.alpha * Tt;
    }
    return { start, f0, it, serie, M: Mm, mosse, fb, best: bestAt ? it[bestAt - 1].dopo : start };
  }
  /** TabuSearchTSP.cpp: la mossa migliore non tabu (o con aspirazione), anche se peggiora */
  function corsaTS(d, tenure, maxIt) {
    const n = d.length, tabu = Array.from({ length: n }, () => new Array(n).fill(0)), mosse = MOSSE(n), start = vicino(d), f0 = lunghezza(d, start);
    let cur = start, f = f0, fb = f0, bestAt = 0;
    const it = [], serie = { cur: [f0], best: [f0] };
    for (let k = 1; k <= maxIt; k++) {
      const lista = [];
      for (let a = 0; a < n; a++) for (let b = a + 1; b < n; b++) if (tabu[a][b] >= k) lista.push([a, b, tabu[a][b]]);
      const vicini = [];
      let sc = -1;
      mosse.forEach(([i, j]) => {
        const A = archiMossa(cur, i, j), de = d[A.a][A.c] + d[A.b][A.e] - d[A.a][A.b] - d[A.c][A.e];
        const isTabu = tabu[A.a][A.c] >= k || tabu[A.b][A.e] >= k, asp = isTabu && f + de < fb, ok = !isTabu || asp;
        vicini.push({ i, j, de, isTabu, asp, ok, A });
        if (ok && (sc < 0 || de < vicini[sc].de)) sc = vicini.length - 1;
      });
      if (sc < 0) { it.push({ fermo: true, prima: cur, dopo: cur, vicini, lista, f, fb, bestAt }); serie.cur.push(f); serie.best.push(fb); break; }
      const m = vicini[sc], A = m.A;
      tabu[A.a][A.b] = tabu[A.b][A.a] = k + tenure;
      tabu[A.c][A.e] = tabu[A.e][A.c] = k + tenure;
      const prima = cur;
      cur = applica(cur, m.i, m.j); f += m.de;
      if (f < fb) { fb = f; bestAt = k; }
      it.push({ prima, dopo: cur, vicini, sc, i: m.i, j: m.j, de: m.de, A, lista, f, fb, bestAt, fino: k + tenure });
      serie.cur.push(f); serie.best.push(fb);
    }
    return { start, f0, it, serie, fb, best: bestAt ? it[bestAt - 1].dopo : start, tenure, maxIt };
  }
  function metaCasuale() {
    const n = M.casuale(8, 11), P = [];
    while (P.length < n) {
      const q = [M.casuale(0, 100), M.casuale(0, 60)];
      if (P.every((r) => Math.hypot(q[0] - r[0], q[1] - r[1]) >= 12)) P.push(q);
    }
    return { nome: T("casuale", "random"), mat: rotonda(P), P, par: { T0: 20, alpha: 0.9, L: 20, Tmin: 0.5, maxIt: 30 } };
  }
  const META_FUNZ = {
    sa: { etichetta: "<span title=\"simulated annealing\">Simulated annealing (SA)</span>" },
    ts: { etichetta: "<span title=\"tabu search\">Tabu search (TS)</span>" },
  };
  const SEED = "text{seed}", TEN = "text{tenure}";

  function metaStato(st) {
    const D = st.dati;
    if (!D.I) { D.I = Object.assign({ id: nuovoId(), es: 0 }, META_ES[0]); }
    const I = D.I, alg = st.chiave();
    if (!I.opt) I.opt = heldKarp(I.mat);
    M.intervallo(st, SEED, 1, 100); M.intervallo(st, TEN, 0, 20);
    const seed = M.intero(st, SEED), ten = M.intero(st, TEN);
    const firma = [I.id, alg, alg === "sa" ? seed : ten, JSON.stringify(I.par)].join("|");
    if (D.mFirma !== firma) {
      D.mFirma = firma;
      D.run = alg === "sa" ? corsaSA(I.mat, I.par, seed) : corsaTS(I.mat, ten, I.par.maxIt);
      D.runId = nuovoId();
    }
    const R = D.run, K = R.it.length + 1, k = M.passoK(st, K, PASSO);
    return { D, I, alg, R, K, k, E: k >= 1 && k <= R.it.length ? R.it[k - 1] : null, seed, ten, n: I.mat.length };
  }

  window.GI_RICETTE["oc-meta-tsp"] = {
    titolo: T("TSP: simulated annealing e tabu search", "TSP: simulated annealing and tabu search"),
    funzioni: META_FUNZ,
    etichettaFunzioni: T("Metaeuristica, con l'intorno 2-opt", "Metaheuristic, with the 2-opt neighbourhood"),
    parametri: [
      { k: SEED, nome: "\\" + SEED, min: 1, max: 100, step: 1, val: 1, colore: "b", cifre: 0, descr: T("seme del generatore Rand (SA)", "seed of the generator Rand (SA)") },
      { k: TEN, nome: "\\" + TEN, min: 0, max: 20, step: 1, val: 2, colore: "d", cifre: 0, descr: T("iterazioni in cui gli archi tolti restano tabu (TS)", "iterations during which the removed edges stay tabu (TS)") },
      parPasso(T("◀ ▶ un'iterazione alla volta, «Esegui» per vederle tutte", "◀ ▶ one iteration at a time, «Run» to watch them all"), 1),
    ],
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [0, 10, 10, 0],
    legenda: (st) => {
      const C = M.COL(st), ts = st.chiave() === "ts";
      return [
        [C.a, T("giro corrente", "current tour"), ""],
        [C.grigio, T("archi tolti dalla mossa", "edges removed by the move"), "dashed"],
        [C.viola, ts ? T("archi aggiunti (mossa scelta)", "edges added (chosen move)") : T("archi aggiunti (mossa estratta)", "edges added (drawn move)"), ""],
        ...(ts ? [[C.rosso, T("archi tabu", "tabu edges"), "dashed"]] : []),
        [C.blu, T("giro ottimo; nel grafico: miglior giro", "optimal tour; in the plot: best tour"), "pieno"],
      ];
    },
    monta(board, st) {
      const D = st.dati;
      nuovaVoce(st);
      const carica = (I, es) => { D.I = Object.assign({ id: nuovoId(), es }, I); if (D.menu) D.menu.value = String(es); D.mFirma = null; vaiA(st, 1); M.ferma(st); st.aggiorna(); };
      M.comandi(st, [
        ["⏩", T("avanti di una temperatura (SA, L iterazioni) o di 10 iterazioni (TS)", "jump ahead by one temperature (SA, L iterations) or by 10 iterations (TS)"), () => {
          const i = M.inputDi(st, PASSO);
          if (!i) return;
          const salto = st.chiave() === "sa" ? D.I.par.L : 10;
          st.imposta(PASSO, Math.min(+i.max, Math.round(+i.value) + salto));
        }],
        [T("Casuale", "Random"), T("da 8 a 11 città casuali nel piano", "8 to 11 random cities in the plane"), () => carica(metaCasuale(), -1)],
        [T("Modifica…", "Edit…"), T("cambia i parametri: T0, α, L, Tmin (SA) e il numero di iterazioni (TS)", "change the parameters: T0, α, L, Tmin (SA) and the number of iterations (TS)"), () => {
          const p = D.I.par;
          const s = chiedi(T("Parametri separati da «;»: T0 ; α ; L ; Tmin ; iterazioni di TS (per esempio 5 ; 0.8 ; 2 ; 3 ; 10)", "Parameters separated by «;»: T0 ; α ; L ; Tmin ; iterations of TS (for example 5 ; 0.8 ; 2 ; 3 ; 10)"),
            [p.T0, p.alpha, p.L, p.Tmin, p.maxIt].join(" ; "));
          if (!s) return;
          const v = s.split(";").map((x) => parseFloat(String(x).replace(",", ".")));
          const [T0, alpha, L, Tmin, maxIt] = v;
          const nT = v.length === 5 && T0 > Tmin && Tmin > 0 && alpha > 0 && alpha < 1 ? Math.ceil(Math.log(Tmin / T0) / Math.log(alpha)) : 0;
          if (!(nT >= 1 && Number.isInteger(L) && L >= 1 && nT * L <= 20000 && Number.isInteger(maxIt) && maxIt >= 1 && maxIt <= 1000)) {
            window.alert(T("Parametri non validi: T0 > Tmin > 0, 0 < α < 1, L intero, al più 20000 iterazioni di SA e 1000 di TS.", "Invalid parameters: T0 > Tmin > 0, 0 < α < 1, integer L, at most 20000 iterations of SA and 1000 of TS."));
            return;
          }
          carica(Object.assign({}, D.I, { par: { T0, alpha, L, Tmin, maxIt } }), D.I.es);
        }],
      ], { k: PASSO });
      menuIstanze(st, META_ES.map((e) => [e.nome, e.titolo]), () => (D.I ? D.I.es : 0), (i) => carica(META_ES[i], i));
      istanzaDaIndirizzo(st, META_ES, carica);
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = metaStato(st), C = M.COL(st), [W, H] = dim(board), { I, R, K, k, E, alg, n } = S;
      mostraCursore(st, SEED, alg === "sa");
      mostraCursore(st, TEN, alg === "ts");
      M.ridisegna(board, st, [S.D.runId, k, M.scuro(), W, H].join("|"), (crea) => {
        pix(board);
        const largo = W >= 1.35 * H && W > 700;
        const box = largo ? [0, 22, W * 0.52, H - 22] : [0, 22, W, H * 0.62 - 22];
        const q = cornice(I.P, ...box), piccole = n <= 7;
        const G = mappa(crea, H, C, q, n, piccole);
        const fine = k === K;
        // giro ottimo in trasparenza
        const o = I.opt.tour;
        o.forEach((c, i) => G.seg(c, o[(i + 1) % n], { strokeColor: C.blu, strokeWidth: 10, strokeOpacity: M.scuro() ? 0.32 : 0.18, lineCap: "round" }));
        const tour = fine ? R.best : E ? E.prima : R.start;
        const toglie = E && !E.fermo ? E.A.rimossi : [], mette = E && !E.fermo ? E.A.aggiunti : [];
        const rifiutata = alg === "sa" && E && !E.acc;
        const tolto = (a, b) => !rifiutata && toglie.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
        tour.forEach((c, i) => { const b = tour[(i + 1) % n]; if (!tolto(c, b)) G.seg(c, b, { strokeColor: C.a, strokeWidth: 3.2 }); });
        if (alg === "ts" && E) for (const [a, b] of E.lista) G.seg(a, b, { strokeColor: C.rosso, strokeWidth: 2, dash: 2 });
        for (const [a, b] of toglie) { G.seg(a, b, { strokeColor: C.grigio, strokeWidth: 2.4, dash: 2 }); G.eti(a, b, I.mat[a][b], C.muted); }
        for (const [a, b] of mette) { G.seg(a, b, { strokeColor: C.viola, strokeWidth: rifiutata ? 2.4 : 5, strokeOpacity: rifiutata ? 0.7 : 1, dash: rifiutata ? 2 : 0 }); G.eti(a, b, I.mat[a][b], C.viola); }
        for (let i = 0; i < n; i++) G.citta(i, i === 0 ? { fillColor: C.a, strokeColor: C.a } : {});
        // titoletto del disegno
        const tit = fine ? T(`miglior giro: L = ${R.fb}`, `best tour: L = ${R.fb}`) : k === 0 ? T(`giro iniziale (nearest neighbour): L = ${R.f0}`, `starting tour (nearest neighbour): L = ${R.f0}`)
          : T(`iterazione ${k}: giro corrente L = ${R.serie.cur[k - 1]}`, `iteration ${k}: current tour L = ${R.serie.cur[k - 1]}`);
        G.d.text(box[0] + 10, 14, tit, { anchorX: "left", fontSize: 13, strokeColor: C.testo, cssStyle: "font-weight:700" });
        // grafico delle lunghezze e tabella delle iterazioni
        const pb = largo ? [W * 0.52 + 48, 30, W * 0.48 - 64, Math.min(H * 0.36, 220)] : [48, H * 0.62 + 24, W - 70, H * 0.38 - 50];
        curva(crea, H, C, pb, R.serie, Math.min(k, R.it.length), I.opt.len, R.it.length);
        if (largo) {
          const y0 = pb[1] + pb[3] + 34, righeMax = clamp(Math.floor((H - y0 - 10) / 17) - 1, 3, 14);
          if (alg === "sa") {
            const a = Math.max(1, Math.min(k, R.it.length) - righeMax + 1), b = Math.min(Math.max(k, 1), R.it.length);
            const righe = [];
            for (let t = Math.max(1, Math.min(a, b - righeMax + 1)); t <= b; t++) {
              const x = R.it[t - 1];
              righe.push([t, nt(x.T), fxt(x.u, 4), `${x.k + 1}:(${x.i + 1},${x.j + 1})`, x.de, x.de > 0 ? fxt(x.v, 4) : "—", x.de > 0 ? fxt(x.p, 4) : "—",
                x.acc ? T("accetta", "accept") : T("rifiuta", "reject"), x.f]);
            }
            const cor = righe.findIndex((r) => r[0] === k);
            tabellaBoard(crea, H, C, pb[0] - 40, y0, ["it", "T", "u", T("mossa", "move"), "δ", "v", "e<sup>−δ/T</sup>", T("esito", "decision"), "L"], righe, cor);
          } else if (E) {
            const vic = E.vicini.map((v, idx) => Object.assign({ idx }, v));
            const sel = n <= 6 ? vic : vic.slice().sort((x, y) => x.de - y.de || x.idx - y.idx).slice(0, righeMax);
            const righe = sel.map((v) => [`(${v.i + 1},${v.j + 1})`, (v.de > 0 ? "+" : "") + v.de, E.f - (E.fermo ? 0 : E.de) + v.de,
              v.idx === E.sc ? (v.asp ? T("scelta (aspirazione)", "chosen (aspiration)") : T("scelta", "chosen")) : v.asp ? T("tabu, aspirazione", "tabu, aspiration") : v.isTabu ? "tabu" : ""]);
            const cor = sel.findIndex((v) => v.idx === E.sc);
            G.d.text(pb[0] - 40, y0 - 10, n <= 6 ? T("tutte le mosse dell'iterazione", "all the moves of the iteration") : T(`le ${sel.length} mosse migliori su ${vic.length}`, `the ${sel.length} best moves out of ${vic.length}`),
              { anchorX: "left", fontSize: 11, strokeColor: C.muted, cssStyle: "font-style:italic" });
            tabellaBoard(crea, H, C, pb[0] - 40, y0, [T("mossa", "move"), "δ", T("L nuovo", "new L"), T("stato", "status")], righe, cor);
          }
        }
      });
    },
    formula(p, st) {
      const S = metaStato(st), { R, K, k, E, alg } = S;
      if (k === 0) return T(`\\text{giro iniziale: nearest neighbour da 1, } L = ${R.f0}`, `\\text{starting tour: nearest neighbour from 1, } L = ${R.f0}`);
      if (k === K) return `${alg === "sa" ? "SA" : "TS"}(I) = ${R.fb} \\qquad z(I) = ${S.I.opt.len}`;
      if (alg === "sa") {
        const test = E.de <= 0 ? `\\delta = ${E.de} \\le 0` : `\\delta = ${E.de} \\quad v = ${fx(E.v, 4)} ${E.acc ? "<" : "\\ge"} e^{-\\delta/T} = ${fx(E.p, 4)}`;
        if (st.board && st.board.canvasWidth < 620) return `T = ${GI.num(E.T, 4)} \\quad ${E.de <= 0 ? test : `v ${E.acc ? "<" : "\\ge"} e^{-${E.de}/T}`} \\Rightarrow \\text{${E.acc ? T("accetta", "accept") : T("rifiuta", "reject")}}`;
        return `T = ${GI.num(E.T, 4)} \\quad u = ${fx(E.u, 4)} \\to ${E.k + 1}{:}\\,(${E.i + 1},${E.j + 1}) \\quad ${test} \\;\\Rightarrow\\; \\text{${E.acc ? T("accetta", "accept") : T("rifiuta", "reject")}}`;
      }
      if (E.fermo) return T("\\text{tutte le mosse sono tabu: stop}", "\\text{every move is tabu: stop}");
      return T(`\\text{mossa migliore ammissibile } (${E.i + 1},${E.j + 1}):\\ \\delta = ${E.de} \\quad L = ${E.f} \\quad L_{\\text{migliore}} = ${E.fb}`,
        `\\text{best admissible move } (${E.i + 1},${E.j + 1}):\\ \\delta = ${E.de} \\quad L = ${E.f} \\quad L_{\\text{best}} = ${E.fb}`);
    },
    letture(p, st) {
      const S = metaStato(st), { I, R, K, k, E, alg } = S, C = M.COL(st), z = I.opt.len, pr = I.par;
      const ar = ([a, b]) => `(${a + 1}, ${b + 1})`;
      let nota;
      if (alg === "sa") {
        const nT = R.it.length / pr.L;
        if (k === 0) nota = T(`Si parte dal giro del nearest neighbour ${seq(R.start)}, lungo \\(${R.f0}\\). Parametri: \\(T_0 = ${GI.num(pr.T0, 3)}\\), \\(\\alpha = ${GI.num(pr.alpha, 3)}\\), \\(L = ${pr.L}\\), \\(T_{\\min} = ${GI.num(pr.Tmin, 3)}\\): ${nT} temperature, ${R.it.length} iterazioni. Le \\(M = ${R.M}\\) mosse 2-opt sono numerate in ordine lessicografico; a ogni iterazione \\(u = \\textsc{Rand}()\\) sceglie la mossa \\(1 + \\lfloor ${R.M}\\,u \\rfloor\\) e \\(v = \\textsc{Rand}()\\) serve al test di Metropolis.`,
          `Start from the nearest neighbour tour ${seq(R.start)}, of length \\(${R.f0}\\). Parameters: \\(T_0 = ${GI.num(pr.T0, 3)}\\), \\(\\alpha = ${GI.num(pr.alpha, 3)}\\), \\(L = ${pr.L}\\), \\(T_{\\min} = ${GI.num(pr.Tmin, 3)}\\): ${nT} temperatures, ${R.it.length} iterations. The \\(M = ${R.M}\\) 2-opt moves are numbered in lexicographic order; at each iteration \\(u = \\textsc{Rand}()\\) chooses the move \\(1 + \\lfloor ${R.M}\\,u \\rfloor\\) and \\(v = \\textsc{Rand}()\\) is used in the Metropolis test.`);
        else if (k === K) nota = T(`Temperatura sotto \\(T_{\\min}\\): fine. Il miglior giro visitato, ${seq(R.best)}, è lungo ${M.tinta(C.blu, R.fb)}${R.fb === z ? ": è ottimo" : `, ${GI.num(100 * (R.fb - z) / z, 1)}\\,\\% sopra \\(z(I) = ${z}\\)`}.`,
          `Temperature below \\(T_{\\min}\\): stop. The best tour visited, ${seq(R.best)}, has length ${M.tinta(C.blu, R.fb)}${R.fb === z ? ": it is optimal" : `, ${GI.num(100 * (R.fb - z) / z, 1)}\\,\\% above \\(z(I) = ${z}\\)`}.`);
        else {
          const peggiora = E.de > 0;
          const esito = !peggiora ? T(`\\(\\delta \\le 0\\): ${M.tinta(C.viola, "accettata")} senza test (il numero \\(v = ${fx(E.v, 4)}\\) è estratto lo stesso).`, `\\(\\delta \\le 0\\): ${M.tinta(C.viola, "accepted")} without the test (the number \\(v = ${fx(E.v, 4)}\\) is drawn anyway).`)
            : E.acc ? T(`Peggiora di \\(${E.de}\\), ma \\(v < e^{-${E.de}/${GI.num(E.T, 3)}}\\): ${M.tinta(C.viola, "accettata")}.`, `It is worse by \\(${E.de}\\), but \\(v < e^{-${E.de}/${GI.num(E.T, 3)}}\\): ${M.tinta(C.viola, "accepted")}.`)
              : T(`Peggiora di \\(${E.de}\\) e \\(v \\ge e^{-${E.de}/${GI.num(E.T, 3)}}\\): ${M.tinta(C.muted, "rifiutata")}, il giro resta lo stesso.`, `It is worse by \\(${E.de}\\) and \\(v \\ge e^{-${E.de}/${GI.num(E.T, 3)}}\\): ${M.tinta(C.muted, "rejected")}, the tour stays the same.`);
          nota = T(`Mossa ${E.k + 1}: \\((${E.i + 1},${E.j + 1})\\) toglie ${E.A.rimossi.map(ar).join(" e ")} e mette ${E.A.aggiunti.map(ar).join(" e ")}. ${esito}`,
            `Move ${E.k + 1}: \\((${E.i + 1},${E.j + 1})\\) removes ${E.A.rimossi.map(ar).join(" and ")} and adds ${E.A.aggiunti.map(ar).join(" and ")}. ${esito}`);
        }
        const righe = E && k < K ? [
          [T("temperatura \\(T\\)", "temperature \\(T\\)"), `\\(${GI.num(E.T, 4)}\\)`],
          [T("\\(u\\) e la mossa", "\\(u\\) and the move"), `\\(${fx(E.u, 4)} \\to ${E.k + 1}{:}\\,(${E.i + 1},${E.j + 1})\\)`],
          ["\\(\\delta\\)", `\\(${E.de}\\)`],
          ["\\(v\\)", E.de > 0 ? `\\(${fx(E.v, 4)}\\)` : "—"],
          ["\\(e^{-\\delta/T}\\)", E.de > 0 ? `\\(${fx(E.p, 4)}\\)` : "—"],
          [T("giro corrente", "current tour"), `${seq(E.dopo)}, \\(L = ${E.f}\\)`],
          [T("miglior giro", "best tour"), `\\(${E.fb}\\)`],
          ["\\(z(I)\\)", `\\(${z}\\)`],
        ] : [
          [T("giro iniziale", "starting tour"), `\\(${R.f0}\\)`],
          [T("miglior giro", "best tour"), k === K ? `\\(${R.fb}\\)` : "—"],
          ["\\(z(I)\\)", `\\(${z}\\)`],
        ];
        return nota + M.tab([T("iterazione", "iteration") + (E && k < K ? " " + k : ""), T("valore", "value")], righe, -1, C.a);
      }
      // tabu search
      if (k === 0) nota = T(`Si parte dal giro del nearest neighbour ${seq(R.start)}, lungo \\(${R.f0}\\). A ogni iterazione si valutano tutte le mosse 2-opt e si esegue la migliore ammissibile, anche se peggiora; i due archi tolti restano tabu per \\(${R.tenure}\\) iterazioni (non si possono rimettere), salvo che la mossa dia un giro migliore del migliore (aspirazione). Al più ${R.maxIt} iterazioni.`,
        `Start from the nearest neighbour tour ${seq(R.start)}, of length \\(${R.f0}\\). At each iteration all the 2-opt moves are evaluated and the best admissible one is performed, even if it is worse; the two removed edges stay tabu for \\(${R.tenure}\\) iterations (they may not be added back), unless the move gives a tour better than the best one (aspiration). At most ${R.maxIt} iterations.`);
      else if (k === K) nota = T(`Fine. Il miglior giro visitato, ${seq(R.best)}, è lungo ${M.tinta(C.blu, R.fb)}${R.fb === z ? ": è ottimo" : `, ${GI.num(100 * (R.fb - z) / z, 1)}\\,\\% sopra \\(z(I) = ${z}\\)`}.`,
        `End. The best tour visited, ${seq(R.best)}, has length ${M.tinta(C.blu, R.fb)}${R.fb === z ? ": it is optimal" : `, ${GI.num(100 * (R.fb - z) / z, 1)}\\,\\% above \\(z(I) = ${z}\\)`}.`);
      else if (E.fermo) nota = T("Tutte le mosse sono tabu e nessuna soddisfa l'aspirazione: la ricerca si ferma.", "Every move is tabu and none satisfies the aspiration criterion: the search stops.");
      else {
        const m = E.vicini[E.sc], peggio = E.de > 0 ? T(" (peggiora: la tabu search si muove comunque)", " (it is worse: tabu search moves anyway)") : E.de === 0 ? T(" (stessa lunghezza)", " (same length)") : "";
        nota = T(`La mossa migliore ammissibile è \\((${E.i + 1},${E.j + 1})\\), con \\(\\delta = ${E.de}\\)${peggio}${m.asp ? ", tabu ma ammessa per aspirazione" : ""}. Toglie ${E.A.rimossi.map(ar).join(" e ")}, che diventano ${M.tinta(C.rosso, "tabu")} fino all'iterazione ${E.fino}; il giro ora è ${seq(E.dopo)}, \\(L = ${E.f}\\).`,
          `The best admissible move is \\((${E.i + 1},${E.j + 1})\\), with \\(\\delta = ${E.de}\\)${peggio}${m.asp ? ", tabu but allowed by aspiration" : ""}. It removes ${E.A.rimossi.map(ar).join(" and ")}, which become ${M.tinta(C.rosso, "tabu")} until iteration ${E.fino}; the tour is now ${seq(E.dopo)}, \\(L = ${E.f}\\).`);
      }
      let out = nota;
      if (E && k < K) {
        const lista = E.lista.length ? E.lista.map(([a, b, f]) => [`(${a + 1}, ${b + 1})`, `\\(${f}\\)`]) : [[T("vuota", "empty"), ""]];
        out += M.tab([T(`lista tabu all'iterazione ${k}`, `tabu list at iteration ${k}`), T("tabu fino a", "tabu until")], lista, -1, C.rosso);
      }
      out += M.tab(["", T("valore", "value")], [
        [T("giro corrente", "current tour"), `\\(${k === 0 ? R.f0 : k === K ? R.serie.cur[R.serie.cur.length - 1] : E.f}\\)`],
        [T("miglior giro", "best tour"), `\\(${k === 0 ? R.f0 : k === K ? R.fb : E.fb}\\)`],
        ["\\(z(I)\\)", `\\(${z}\\)`],
      ], -1, C.a);
      return out;
    },
    domanda: T("SA, istanza di riferimento, seme 1: alle iterazioni 1 e 3 si accetta un giro peggiore; cambia il seme e guarda se si arriva ancora a 18. Su TSP20 confronta la tabu search con tenure 0 (si blocca a 319) e con tenure 1 o 2.",
      "SA, reference instance, seed 1: at iterations 1 and 3 a worse tour is accepted; change the seed and check whether 18 is still reached. On TSP20 compare tabu search with tenure 0 (it gets stuck at 319) and with tenure 1 or 2."),
  };

  // =================================================================
  // 2. TSP METRICO: DOUBLE TREE E CHRISTOFIDES
  // =================================================================
  const famDT = (n) => {
    const k = (n - 1) / 2, Pp = [];
    for (let c = 3; c <= 2 * k + 1; c += 2) Pp.push(c);
    for (let c = 2; c <= 2 * k; c += 2) Pp.push(c);
    const pe = new Set(); for (let i = 0; i + 1 < Pp.length; i++) pe.add(Math.min(Pp[i], Pp[i + 1]) + "-" + Math.max(Pp[i], Pp[i + 1]));
    const a = n, b = n + 1;
    const mat = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => i === j ? 0 : i === 0 || j === 0 ? a : pe.has(Math.min(i, j) + 1 + "-" + (Math.max(i, j) + 1)) ? b : 2 * a));
    const P = [[5, 5]];
    Pp.forEach((c, t) => { const ang = (90 + 360 * t / Pp.length) * Math.PI / 180; P[c - 1] = [5 + 4 * Math.cos(ang), 5 + 4 * Math.sin(ang)]; });
    return { mat, P, n, a, b };
  };
  const famCH = (n) => {
    const a = n, b = n + 1;
    const mat = Array.from({ length: n }, (_, i) => Array.from({ length: n }, (_, j) => Math.floor(Math.abs(i - j) / 2) * b + (Math.abs(i - j) % 2) * a));
    const P = Array.from({ length: n }, (_, i) => [i, (i % 2 ? 0.85 : 0) - 0.55 * Math.sin(Math.PI * i / (n - 1))]);   // striscia incurvata: l'arco {1, n} non passa sulle città
    return { mat, P, n, a, b };
  };
  const APX_ES = [
    { nome: T("di riferimento (5 città)", "reference instance (5 cities)"), titolo: T("la matrice delle note: DT 22, CH 18 = z(I)", "the matrix of the notes: DT 22, CH 18 = z(I)"), mat: D_REF, P: sulCerchio([0, 2, 4, 1, 3]) },
    { nome: T("esercizio 1 (6 città)", "exercise 1 (6 cities)"), titolo: T("coordinate (3,4), (6,1), (3,8), (8,8), (0,4), (8,0): DT 32, CH 27 = z(I)", "coordinates (3,4), (6,1), (3,8), (8,8), (0,4), (8,0): DT 32, CH 27 = z(I)"), P: [[3, 4], [6, 1], [3, 8], [8, 8], [0, 4], [8, 0]] },
    { nome: T("esercizio 2 (6 città)", "exercise 2 (6 cities)"), titolo: T("coordinate (2,4), (6,0), (7,3), (0,7), (0,1), (2,1): DT 28, CH 25, z(I) = 24", "coordinates (2,4), (6,0), (7,3), (0,7), (0,1), (2,1): DT 28, CH 25, z(I) = 24"), P: [[2, 4], [6, 0], [7, 3], [0, 7], [0, 1], [2, 1]] },
    { nome: T("famiglia tight per DT", "tight family for DT"), titolo: T("stella di centro 1 più il cammino P: DT(I_n)/z(I_n) = 2n/(n+2)", "star centred at 1 plus the path P: DT(I_n)/z(I_n) = 2n/(n+2)"), fam: "dt" },
    { nome: T("famiglia tight per CH", "tight family for CH"), titolo: T("striscia di triangoli: CH(I_n)/z(I_n) → 3/2", "strip of triangles: CH(I_n)/z(I_n) → 3/2"), fam: "ch" },
  ];
  /** Kruskal: archi per distanza non decrescente, pareggi sulla coppia di indici */
  function kruskal(d) {
    const n = d.length, E = [];
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) E.push([d[i][j], i, j]);
    E.sort((x, y) => x[0] - y[0] || x[1] - y[1] || x[2] - y[2]);
    const pa = [...Array(n).keys()], fd = (x) => { while (pa[x] !== x) x = pa[x]; return x; };
    const Tt = [], ex = [];
    for (const [w, i, j] of E) {
      if (Tt.length === n - 1) break;
      const a = fd(i), b = fd(j), ok = a !== b;
      ex.push({ i, j, w, ok });
      if (ok) { pa[a] = b; Tt.push([i, j]); }
    }
    return { T: Tt, ex };
  }
  /** regola di Fleury dalla città 0: verso il vicino di indice minimo, salvo un ponte degli archi non usati */
  function fleury(E, s = 0) {
    const usato = new Array(E.length).fill(false), W = [s], ord = [];
    let cur = s;
    const raggiunge = (u, v) => {
      const vis = new Set([u]), pila = [u];
      while (pila.length) {
        const x = pila.pop();
        E.forEach(([a, b], k) => {
          if (usato[k]) return;
          const y = a === x ? b : b === x ? a : -1;
          if (y >= 0 && !vis.has(y)) { vis.add(y); pila.push(y); }
        });
      }
      return vis.has(v);
    };
    for (let t = 0; t < E.length; t++) {
      const cand = [];
      E.forEach(([a, b], k) => { if (!usato[k] && (a === cur || b === cur)) cand.push([a === cur ? b : a, k]); });
      cand.sort((x, y) => x[0] - y[0] || x[1] - y[1]);
      let scelta = null, ponti = [];
      for (const [y, k] of cand) {
        usato[k] = true;
        const ok = cand.length === 1 || raggiunge(cur, y);
        usato[k] = false;
        if (ok) { scelta = [y, k]; break; }
        ponti.push(y);
      }
      if (!scelta) scelta = cand[0];
      usato[scelta[1]] = true;
      ord.push({ k: scelta[1], da: cur, a: scelta[0], ponti: ponti.slice(), vicini: [...new Set(cand.map((c) => c[0]))] });
      cur = scelta[0];
      W.push(cur);
    }
    return { W, ord };
  }
  /** scorciatoie: ogni città alla prima occorrenza; per ogni arco del giro il tratto di W che sostituisce */
  function scorciatoie(W, d) {
    const tour = [], pos = [];
    W.forEach((c, p) => { if (!tour.includes(c)) { tour.push(c); pos.push(p); } });
    pos.push(W.length - 1);
    const tratti = tour.map((c, t) => {
      const p0 = pos[t], p1 = pos[t + 1], st = W.slice(p0, p1 + 1);
      let lw = 0; for (let r = 0; r + 1 < st.length; r++) lw += d[st[r]][st[r + 1]];
      return { da: c, a: tour[(t + 1) % tour.length], tratto: st, lw, diretto: d[c][tour[(t + 1) % tour.length]] };
    });
    return { tour, tratti };
  }
  /** accoppiamento perfetto di peso minimo per enumerazione (il primo vertice con ciascuno degli altri) */
  function accoppiamento(d, Ov) {
    const tutte = [];
    let best = null;
    const rec = (resto, acc, w) => {
      if (!resto.length) { if (tutte.length < 200) tutte.push({ w, coppie: acc }); if (!best || w < best.w) best = { w, coppie: acc }; return; }
      const a = resto[0];
      for (let k = 1; k < resto.length; k++) rec(resto.slice(1, k).concat(resto.slice(k + 1)), acc.concat([[a, resto[k]]]), w + d[a][resto[k]]);
    };
    rec(Ov, [], 0);
    return { best, tutte };
  }
  function apxCalcola(I) {
    const d = I.mat, n = d.length, K = kruskal(d), dT = K.T.reduce((s, [i, j]) => s + d[i][j], 0);
    const deg = new Array(n).fill(0); for (const [i, j] of K.T) { deg[i]++; deg[j]++; }
    const Ov = [...Array(n).keys()].filter((v) => deg[v] % 2), Mt = accoppiamento(d, Ov);
    const Edt = K.T.map((e) => ({ e, tipo: "T" })).concat(K.T.map((e) => ({ e, tipo: "T" })));
    const Ech = K.T.map((e) => ({ e, tipo: "T" })).concat(Mt.best.coppie.map((e) => ({ e, tipo: "M" })));
    const ripeti = (E) => {   // indice di copia di ogni arco del multigrafo (per disegnarle parallele)
      const cont = {};
      E.forEach((x) => { const key = Math.min(...x.e) + "-" + Math.max(...x.e); x.copia = cont[key] = (cont[key] || 0) + 1; x.key = key; });
      E.forEach((x) => { x.tot = cont[x.key]; });
      return E;
    };
    ripeti(Edt); ripeti(Ech);
    const fdt = fleury(Edt.map((x) => x.e)), fch = fleury(Ech.map((x) => x.e));
    const sdt = scorciatoie(fdt.W, d), sch = scorciatoie(fch.W, d);
    const opt = heldKarp(d);
    return { K, dT, deg, O: Ov, M: Mt, dM: Mt.best.w, dt: { E: Edt, f: fdt, s: sdt, len: lunghezza(d, sdt.tour) }, ch: { E: Ech, f: fch, s: sch, len: lunghezza(d, sch.tour) }, opt };
  }
  function apxPassi(R, alg) {
    const A = R[alg], p = [{ fase: "inizio" }];
    R.K.ex.forEach((_, q) => p.push({ fase: "kruskal", q }));
    p.push({ fase: "albero" });
    if (alg === "dt") p.push({ fase: "doppio" });
    else p.push({ fase: "dispari" }, { fase: "accop" });
    A.f.ord.forEach((_, q) => p.push({ fase: "euler", q }));
    A.s.tratti.forEach((_, q) => p.push({ fase: "scorc", q }));
    p.push({ fase: "fine" });
    return p;
  }
  function apxCasuale() {
    for (let t = 0; t < 300; t++) {
      const n = M.casuale(5, 8), P = [];
      while (P.length < n) {
        const q = [M.casuale(0, 10), M.casuale(0, 8)];
        if (P.every((r) => Math.hypot(q[0] - r[0], q[1] - r[1]) >= 2.2)) P.push(q);
      }
      const mat = rotonda(P);
      if (metrica(mat)) return { nome: T("casuale", "random"), P, mat };
    }
    return Object.assign({}, APX_ES[1]);
  }
  const APX_FUNZ = {
    dt: { etichetta: "<span title=\"double tree\">Double tree (DT)</span>" },
    ch: { etichetta: "<span title=\"Christofides\">Christofides (CH)</span>" },
  };
  const NOME_ALG = { dt: "DT", ch: "CH" };

  function apxStato(st) {
    const D = st.dati;
    if (!D.A) D.A = Object.assign({ id: nuovoId(), es: 0 }, APX_ES[0]);
    const A = D.A, alg = st.chiave();
    M.intervallo(st, "n", 5, 11);
    let nf = M.intero(st, "n");
    if (nf % 2 === 0) nf -= 1;
    const I = A.fam ? Object.assign({}, A, A.fam === "dt" ? famDT(nf) : famCH(nf)) : Object.assign({}, A, { mat: A.mat || rotonda(A.P) });
    const firma = [A.id, A.fam ? nf : ""].join("|");
    if (D.aFirma !== firma) { D.aFirma = firma; D.R = apxCalcola(I); D.I = I; D.aId = nuovoId(); }
    const R = D.R, passi = apxPassi(R, alg), K = passi.length - 1, k = M.passoK(st, K, PASSO);
    return { D, I: D.I, A, alg, R, X: R[alg], passi, K, k, E: passi[k], n: D.I.mat.length };
  }
  /** archi del multigrafo usati fino al passo q del circuito euleriano */
  const usatiFino = (X, q) => new Set(X.f.ord.slice(0, q + 1).map((o) => o.k));

  window.GI_RICETTE["oc-tsp-approx"] = {
    titolo: T("TSP metrico: double tree e Christofides", "Metric TSP: double tree and Christofides"),
    funzioni: APX_FUNZ,
    etichettaFunzioni: T("Algoritmo di approssimazione", "Approximation algorithm"),
    parametri: [
      { k: "n", min: 5, max: 11, step: 2, val: 5, colore: "b", cifre: 0, descr: T("numero di città della famiglia \\(I_n\\) (dispari)", "number of cities of the family \\(I_n\\) (odd)") },
      parPasso(T("◀ ▶ un passo alla volta, «Esegui» per vederli tutti", "◀ ▶ one step at a time, «Run» to watch them all"), 1),
    ],
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [0, 10, 10, 0],
    legenda: (st) => {
      const C = M.COL(st), ch = st.chiave() === "ch";
      return [
        [C.b, T("albero ricoprente minimo \\(T\\)", "minimum spanning tree \\(T\\)"), ""],
        ...(ch ? [[C.d, T("accoppiamento \\(M\\), vertici dispari", "matching \\(M\\), odd vertices"), "dashed"]] : []),
        [C.viola, T("circuito euleriano \\(W\\)", "Eulerian circuit \\(W\\)"), ""],
        [C.grigio, T("archi scartati, tratti saltati", "rejected edges, skipped stretches"), "dashed"],
        [C.a, T("giro \\(\\sigma\\)", "tour \\(\\sigma\\)"), ""],
        [C.blu, T("giro ottimo", "optimal tour"), "pieno"],
      ];
    },
    monta(board, st) {
      const D = st.dati;
      nuovaVoce(st);
      const carica = (I, es) => { D.A = Object.assign({ id: nuovoId(), es }, I); if (D.menu) D.menu.value = String(es); D.aFirma = null; vaiA(st, 1); M.ferma(st); st.aggiorna(); };
      M.comandi(st, [
        [T("Casuale", "Random"), T("da 5 a 8 città casuali nel piano, distanze euclidee arrotondate (istanza metrica)", "5 to 8 random cities in the plane, rounded Euclidean distances (metric instance)"), () => carica(apxCasuale(), -1)],
        [T("Modifica…", "Edit…"), T("scrivi le coordinate delle città", "type the coordinates of the cities"), () => {
          const P0 = D.A.P && !D.A.fam && D.A.es !== 0 ? D.A.P : APX_ES[1].P;
          const s = chiedi(T("Coordinate intere x y delle città separate da «;» (da 4 a 9 città, da 0 a 30); distanze euclidee arrotondate, l'istanza deve essere metrica:", "Integer coordinates x y of the cities separated by «;» (4 to 9 cities, from 0 to 30); rounded Euclidean distances, the instance must be metric:"),
            P0.map((p) => p.join(" ")).join(" ; "));
          if (!s) return;
          const P = s.split(";").map((x) => x.trim().split(/[\s,]+/).map(Number));
          const ok = P.length >= 4 && P.length <= 9 && P.every((p) => p.length === 2 && p.every((v) => Number.isInteger(v) && v >= 0 && v <= 30));
          const mat = ok ? rotonda(P) : null;
          if (!ok || mat.some((r, i) => r.some((x, j) => i !== j && x < 1))) { window.alert(T("Dati non validi: da 4 a 9 coppie di interi fra 0 e 30, città distinte.", "Invalid data: 4 to 9 pairs of integers between 0 and 30, distinct cities.")); return; }
          if (!metrica(mat)) { window.alert(T("Con l'arrotondamento la disuguaglianza triangolare non vale: l'istanza non è metrica. Sposta un po' le città.", "With the rounding the triangle inequality fails: the instance is not metric. Move the cities a little.")); return; }
          carica({ nome: T("modificata", "edited"), P, mat }, -1);
        }],
      ], { k: PASSO });
      menuIstanze(st, APX_ES.map((e) => [e.nome, e.titolo]), () => (D.A ? D.A.es : 0), (i) => carica(APX_ES[i], i));
      istanzaDaIndirizzo(st, APX_ES, carica);
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = apxStato(st), C = M.COL(st), [W, H] = dim(board), { I, R, X, E, k, alg, n } = S, d = I.mat;
      mostraCursore(st, "n", !!S.A.fam);
      M.ridisegna(board, st, [S.D.aId, alg, k, M.scuro(), W, H].join("|"), (crea) => {
        pix(board);
        const q = cornice(I.P, 0, 18, W, H - 18, 34), piccole = n <= 7;
        const G = mappa(crea, H, C, q, n, piccole);
        const f = E.fase;
        const albero = (attr = {}) => R.K.T.forEach(([i, j]) => { G.seg(i, j, Object.assign({ strokeColor: C.b, strokeWidth: 3.2 }, attr)); G.eti(i, j, d[i][j], C.b); });
        const off = (x) => (x.tot > 1 ? (x.copia - (x.tot + 1) / 2) * 7 : 0);
        const multigrafo = (usati, attuale) => X.E.forEach((x, idx) => {
          if (idx === attuale) return;
          const us = usati.has(idx), col = x.tipo === "M" ? C.d : C.b;
          G.seg(x.e[0], x.e[1], us ? { strokeColor: C.viola, strokeWidth: 3.6 } : { strokeColor: col, strokeWidth: 2.2, dash: x.tipo === "M" ? 2 : 0, strokeOpacity: 0.85 }, off(x));
        });
        let tit = "";
        if (f === "inizio") {
          tit = T(`${n} città, istanza metrica`, `${n} cities, metric instance`);
        } else if (f === "kruskal") {
          const cur = R.K.ex[E.q];
          R.K.ex.slice(0, E.q).forEach((e) => { if (e.ok) { G.seg(e.i, e.j, { strokeColor: C.b, strokeWidth: 3.2 }); G.eti(e.i, e.j, e.w, C.b); } });
          if (cur.ok) G.seg(cur.i, cur.j, { strokeColor: C.b, strokeWidth: 6.5 });
          else G.seg(cur.i, cur.j, { strokeColor: C.grigio, strokeWidth: 2.6, dash: 2 });
          G.eti(cur.i, cur.j, cur.w + (cur.ok ? " ✓" : " ✗"), cur.ok ? C.b : C.muted);
          tit = T(`Kruskal: arco {${cur.i + 1},${cur.j + 1}}, ${cur.ok ? "preso" : "scartato"}`, `Kruskal: edge {${cur.i + 1},${cur.j + 1}}, ${cur.ok ? "taken" : "rejected"}`);
        } else if (f === "albero") {
          albero(); tit = `MST T, d(T) = ${R.dT}`;
        } else if (f === "doppio") {
          X.E.forEach((x) => G.seg(x.e[0], x.e[1], { strokeColor: C.b, strokeWidth: 2.4 }, off(x)));
          R.K.T.forEach(([i, j]) => G.eti(i, j, d[i][j], C.b));
          tit = T(`albero raddoppiato: 2 d(T) = ${2 * R.dT}`, `doubled tree: 2 d(T) = ${2 * R.dT}`);
        } else if (f === "dispari" || f === "accop") {
          albero();
          if (f === "accop") for (const [a, b] of R.M.best.coppie) { G.seg(a, b, { strokeColor: C.d, strokeWidth: 3.2, dash: 2 }); G.eti(a, b, d[a][b], C.d); }
          tit = f === "dispari" ? T(`vertici di grado dispari: O = {${R.O.map((v) => v + 1).join(", ")}}`, `odd-degree vertices: O = {${R.O.map((v) => v + 1).join(", ")}}`) : T(`accoppiamento M, d(M) = ${R.dM}`, `matching M, d(M) = ${R.dM}`);
        } else if (f === "euler") {
          const o = X.f.ord[E.q], us = usatiFino(X, E.q - 1);
          multigrafo(us, o.k);
          G.freccia(o.da, o.a, { strokeColor: C.a }, off(X.E[o.k]));
          tit = `W = (${X.f.W.slice(0, E.q + 2).map((c) => c + 1).join(", ")}${E.q + 2 < X.f.W.length ? ", …" : ")"}`;
        } else if (f === "scorc") {
          const tr = X.s.tratti[E.q];
          X.E.forEach((x) => G.seg(x.e[0], x.e[1], { strokeColor: C.viola, strokeWidth: 1.6, strokeOpacity: 0.35 }, off(x)));
          X.s.tratti.slice(0, E.q).forEach((t) => { G.seg(t.da, t.a, { strokeColor: C.a, strokeWidth: 3.6 }); G.eti(t.da, t.a, d[t.da][t.a], C.a); });
          if (tr.tratto.length > 2) for (let r = 0; r + 1 < tr.tratto.length; r++) G.seg(tr.tratto[r], tr.tratto[r + 1], { strokeColor: C.grigio, strokeWidth: 2.4, dash: 2 }, 0);
          G.seg(tr.da, tr.a, { strokeColor: C.a, strokeWidth: 5.5 });
          G.eti(tr.da, tr.a, d[tr.da][tr.a], C.a);
          tit = T(`giro σ = (${X.s.tour.slice(0, E.q + 2 <= n ? E.q + 2 : n).map((c) => c + 1).join(", ")}${E.q + 2 <= n ? ", …" : ""})`, `tour σ = (${X.s.tour.slice(0, E.q + 2 <= n ? E.q + 2 : n).map((c) => c + 1).join(", ")}${E.q + 2 <= n ? ", …" : ""})`);
        } else {
          const o = R.opt.tour;
          o.forEach((c, i) => G.seg(c, o[(i + 1) % n], { strokeColor: C.blu, strokeWidth: 11, strokeOpacity: M.scuro() ? 0.32 : 0.18, lineCap: "round" }));
          X.s.tratti.forEach((t) => { G.seg(t.da, t.a, { strokeColor: C.a, strokeWidth: 3.6 }); G.eti(t.da, t.a, d[t.da][t.a], C.a); });
          tit = `${NOME_ALG[alg]}(I) = ${X.len},  z(I) = ${R.opt.len}`;
        }
        const dispari = f === "dispari" || f === "accop";
        for (let i = 0; i < n; i++) {
          const att = dispari && R.O.includes(i) ? { fillColor: C.d, strokeColor: C.d, size: 6 } : i === 0 ? { fillColor: C.a, strokeColor: C.a } : {};
          G.citta(i, att);
          if (f === "dispari") { const [x, y] = q(i), [ox, oy] = q.fuori(i, 30); G.d.text(x + ox, y + oy, `deg ${R.deg[i]}`, { fontSize: 11, strokeColor: R.O.includes(i) ? C.d : C.muted, cssStyle: "font-style:italic" }); }
        }
        G.d.text(12, 12, tit, { anchorX: "left", fontSize: 13, strokeColor: C.testo, cssStyle: "font-weight:700" });
      });
    },
    formula(p, st) {
      const S = apxStato(st), { R, X, E, alg, I } = S, d = I.mat, f = E.fase, nome = NOME_ALG[alg];
      if (f === "inizio") return T("\\text{Kruskal: archi per } d_{ij} \\text{ non decrescente, pareggi sulla coppia di indici}", "\\text{Kruskal: edges by non-decreasing } d_{ij} \\text{, ties by the pair of indices}");
      if (f === "kruskal") {
        const e = R.K.ex[E.q];
        return `\\{${e.i + 1},${e.j + 1}\\}:\\ d_{${e.i + 1}${e.j + 1}} = ${e.w} \\;\\Rightarrow\\; \\text{${e.ok ? T("preso", "taken") : T("scartato: chiude un ciclo", "rejected: it closes a cycle")}}`;
      }
      if (f === "albero") return `d(T) = ${R.K.T.map(([i, j]) => d[i][j]).join("+")} = ${R.dT} \\;\\le\\; z(I) = ${R.opt.len}`;
      if (f === "doppio") return T(`\\text{lunghezza del circuito} = 2\\,d(T) = ${2 * R.dT}`, `\\text{length of the circuit} = 2\\,d(T) = ${2 * R.dT}`);
      if (f === "dispari") return `O = \\{${R.O.map((v) => v + 1).join(",")}\\},\\quad |O| = ${R.O.length}`;
      if (f === "accop") return `M = \\{${R.M.best.coppie.map(([a, b]) => `\\{${a + 1},${b + 1}\\}`).join(",")}\\},\\quad d(M) = ${R.dM} \\;\\le\\; \\tfrac{z(I)}{2} = ${GI.num(R.opt.len / 2, 1)}`;
      if (f === "euler") {
        const o = X.f.ord[E.q];
        const tot = alg === "dt" ? `2\\,d(T) = ${2 * R.dT}` : `d(T)+d(M) = ${R.dT + R.dM}`;
        if (st.board && st.board.canvasWidth < 620) return `${o.da + 1} \\to ${o.a + 1}\\quad(d = ${d[o.da][o.a]})`;
        return `${o.da + 1} \\to ${o.a + 1}\\quad(d = ${d[o.da][o.a]}) \\qquad \\text{${T("lunghezza di", "length of")} } W = ${tot}`;
      }
      if (f === "scorc") {
        const t = X.s.tratti[E.q];
        if (t.tratto.length <= 2) return `${t.da + 1} \\to ${t.a + 1}\\quad (${t.diretto}) \\quad \\text{${T("nessuna città saltata", "no city skipped")}}`;
        return `${t.tratto.map((c) => c + 1).join("\\to")}\\ (${t.tratto.slice(1).map((c, r) => d[t.tratto[r]][c]).join("+")} = ${t.lw}) \\;\\Longrightarrow\\; ${t.da + 1}\\to${t.a + 1}\\ (${t.diretto})`;
      }
      const g = alg === "dt" ? "2" : "\\tfrac{3}{2}";
      return `\\frac{${nome}(I)}{z(I)} = \\frac{${X.len}}{${R.opt.len}} = ${M.Qtex(M.Q(X.len, R.opt.len))} \\approx ${fx(X.len / R.opt.len, 3)} \\;\\le\\; ${g}`;
    },
    letture(p, st) {
      const S = apxStato(st), { R, X, E, alg, I, k, n, A } = S, d = I.mat, f = E.fase, C = M.COL(st), nome = NOME_ALG[alg];
      const lista = (v) => v.map((c) => c + 1).join(", ");
      let nota = "";
      if (f === "inizio") nota = T(`Istanza metrica con ${n} città. Entrambi gli algoritmi partono da un albero ricoprente minimo, calcolato con Kruskal.`, `Metric instance with ${n} cities. Both algorithms start from a minimum spanning tree, computed with Kruskal's algorithm.`);
      else if (f === "kruskal") {
        const fatti = R.K.ex.slice(0, E.q + 1).map((e) => `{${e.i + 1},${e.j + 1}} (${e.w}, ${e.ok ? T("preso", "taken") : T("scartato", "rejected")})`);
        nota = T(`Archi esaminati: ${fatti.join(", ")}.`, `Edges examined: ${fatti.join(", ")}.`);
      } else if (f === "albero") nota = T(`L'albero ha \\(n-1 = ${n - 1}\\) archi e pesa \\(d(T) = ${R.dT}\\): è un lower bound, \\(d(T) \\le z(I)\\).`, `The tree has \\(n-1 = ${n - 1}\\) edges and weighs \\(d(T) = ${R.dT}\\): it is a lower bound, \\(d(T) \\le z(I)\\).`);
      else if (f === "doppio") nota = T("Ogni arco dell'albero si raddoppia: tutti i gradi diventano pari e il multigrafo ha un circuito euleriano, lungo \\(2\\,d(T)\\).", "Each edge of the tree is doubled: all the degrees become even and the multigraph has an Eulerian circuit, of length \\(2\\,d(T)\\).");
      else if (f === "dispari") nota = T(`Gradi in \\(T\\): ${R.deg.map((g, v) => `\\(\\deg(${v + 1}) = ${g}\\)`).join(", ")}. I vertici di grado dispari sono ${M.tinta(C.d, "O = {" + lista(R.O) + "}")}, in numero pari.`, `Degrees in \\(T\\): ${R.deg.map((g, v) => `\\(\\deg(${v + 1}) = ${g}\\)`).join(", ")}. The odd-degree vertices are ${M.tinta(C.d, "O = {" + lista(R.O) + "}")}, an even number.`);
      else if (f === "accop") {
        nota = T(`Accoppiamento perfetto di peso minimo su \\(O\\): \\(d(M) = ${R.dM}\\). In \\(T \\cup M\\) tutti i gradi sono pari.`, `Minimum weight perfect matching on \\(O\\): \\(d(M) = ${R.dM}\\). In \\(T \\cup M\\) all the degrees are even.`);
        if (R.M.tutte.length > 1 && R.M.tutte.length <= 15) {
          const righe = R.M.tutte.map((m) => [m.coppie.map(([a, b]) => `{${a + 1},${b + 1}}`).join(" "), `\\(${m.coppie.map(([a, b]) => d[a][b]).join("+")} = ${m.w}\\)`]);
          nota += M.tab([T("accoppiamenti perfetti di O", "perfect matchings of O"), T("peso", "weight")], righe, R.M.tutte.findIndex((m) => m === R.M.best), C.d);
        }
      } else if (f === "euler") {
        const o = X.f.ord[E.q];
        const ponte = o.ponti.length ? T(` L'arco verso ${o.ponti.map((c) => c + 1).join(", ")} è un ponte degli archi non usati: si va a ${o.a + 1}.`, ` The edge towards ${o.ponti.map((c) => c + 1).join(", ")} is a bridge of the unused edges: go to ${o.a + 1}.`) : "";
        nota = T(`Regola di Fleury: da ${o.da + 1} (vicini per archi non usati: ${lista(o.vicini)}) verso il vicino di indice minimo che non sia un ponte.${ponte}`, `Fleury's rule: from ${o.da + 1} (neighbours along unused edges: ${lista(o.vicini)}) towards the neighbour of smallest index that is not a bridge.${ponte}`)
          + `<br>\\(W = (${X.f.W.slice(0, E.q + 2).map((c) => c + 1).join(",")}${E.q + 2 < X.f.W.length ? ",\\dots" : ""})\\)`;
      } else if (f === "scorc") {
        const t = X.s.tratti[E.q], salt = t.tratto.slice(1, -1);
        nota = (salt.length ? T(`Si salta ${lista(salt)}, già visitat${salt.length > 1 ? "e" : "a"}: \\(${t.diretto} \\le ${t.lw}\\) per la disuguaglianza triangolare.`, `Skip ${lista(salt)}, already visited: \\(${t.diretto} \\le ${t.lw}\\) by the triangle inequality.`)
          : T(`La città ${t.a + 1} ${E.q + 1 < n ? "è nuova" : "è la partenza: il giro si chiude"}, nessuna scorciatoia.`, `City ${t.a + 1} ${E.q + 1 < n ? "is new" : "is the start: the tour closes"}, no shortcut.`))
          + `<br>\\(\\sigma = (${X.s.tour.slice(0, Math.min(n, E.q + 2)).map((c) => c + 1).join(",")}${E.q + 2 <= n ? ",\\dots" : ""})\\)`;
      } else {
        nota = T(`Giro ${seq(X.s.tour)}, lungo ${M.tinta(C.a, X.len)}; il giro ottimo ${seq(R.opt.tour)} è lungo \\(${R.opt.len}\\).`, `Tour ${seq(X.s.tour)}, of length ${M.tinta(C.a, X.len)}; the optimal tour ${seq(R.opt.tour)} has length \\(${R.opt.len}\\).`);
        if (A.fam === "dt") nota += T(` Famiglia tight per DT: \\(\\tfrac{DT(I_n)}{z(I_n)} = \\tfrac{2n}{n+2} = ${M.Qtex(M.Q(2 * n, n + 2))}\\), che tende a 2.`, ` Tight family for DT: \\(\\tfrac{DT(I_n)}{z(I_n)} = \\tfrac{2n}{n+2} = ${M.Qtex(M.Q(2 * n, n + 2))}\\), which tends to 2.`);
        if (A.fam === "ch") nota += T(` Famiglia tight per CH: \\(\\tfrac{CH(I_n)}{z(I_n)} \\ge \\tfrac{3n+1}{2n+4} = ${M.Qtex(M.Q(3 * n + 1, 2 * n + 4))}\\), che tende a \\(\\tfrac32\\).`, ` Tight family for CH: \\(\\tfrac{CH(I_n)}{z(I_n)} \\ge \\tfrac{3n+1}{2n+4} = ${M.Qtex(M.Q(3 * n + 1, 2 * n + 4))}\\), which tends to \\(\\tfrac32\\).`);
      }
      const passo = (fase) => S.passi.findIndex((x) => x.fase === fase);
      const vede = (fase) => k >= passo(fase);
      const fine = f === "fine";
      const rapp = fine ? `\\(${M.Qtex(M.Q(X.len, R.opt.len))} \\approx ${fx(X.len / R.opt.len, 3)}\\)` : "—";
      const righe = [
        [T("\\(d(T)\\), lower bound", "\\(d(T)\\), lower bound"), vede("albero") ? `\\(${R.dT}\\)` : "—"],
        ...(alg === "ch" ? [["\\(d(M) \\le z(I)/2\\)", vede("accop") ? `\\(${R.dM}\\)` : "—"]] : []),
        [alg === "dt" ? T("circuito \\(W\\): \\(2\\,d(T)\\)", "circuit \\(W\\): \\(2\\,d(T)\\)") : T("circuito \\(W\\): \\(d(T)+d(M)\\)", "circuit \\(W\\): \\(d(T)+d(M)\\)"),
          vede(alg === "dt" ? "doppio" : "accop") ? `\\(${alg === "dt" ? 2 * R.dT : R.dT + R.dM}\\)` : "—"],
        [`\\(${nome}(I) = L(\\sigma)\\)`, fine ? `\\(${X.len}\\)` : "—"],
        ["\\(z(I)\\)", `\\(${R.opt.len}\\)`],
        [`\\(${nome}(I)/z(I)\\)`, rapp],
        [T("garanzia", "guarantee"), alg === "dt" ? "\\(2\\)" : "\\(\\tfrac32\\)"],
      ];
      return nota + M.tab([nome, T("valore", "value")], righe, -1, C.a);
    },
    domanda: T("Sull'istanza di riferimento DT dà 22 e CH trova l'ottimo 18: in quale passo DT perde? Poi scegli le famiglie tight e fai crescere \\(n\\): il rapporto si avvicina alla garanzia.",
      "On the reference instance DT gives 22 and CH finds the optimum 18: at which step does DT lose? Then choose the tight families and let \\(n\\) grow: the ratio approaches the guarantee."),
  };

  window.GI_OC_F = { corsaSA, corsaTS, kruskal, fleury, scorciatoie, accoppiamento, apxCalcola, famDT, famCH, heldKarp, META_ES, APX_ES, metaCasuale, apxCasuale };
})();
