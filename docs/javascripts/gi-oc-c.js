/* Laboratorio di «Ottimizzazione combinatoria / Combinatorial Optimization»: istanze tight.
 *
 *   oc-tight   le famiglie di istanze del corso su cui la garanzia è stretta, con il rapporto algoritmo/ottimo
 *              che si avvicina al limite al crescere del parametro:
 *                Next Fit (bin packing)  n = 4q, c = n, pesi n/2 e 2 alternati:  NF/z = 2q/(q+1)  ->  2
 *                greedy esteso (zaino)   c = 2θ, (p, w) = (2, 1), (θ, θ), (θ, θ):  z/GR^e = 2θ/(θ+2)  ->  2
 *                LPT (P||Cmax)           2m+1 lavori, due per ogni durata 2m-1..m+1 e tre di durata m:
 *                                        LPT/z = (4m-1)/(3m) = 4/3 - 1/(3m)  ->  4/3
 * Gli algoritmi girano davvero sull'istanza (bppTraccia, cmaxTraccia di gi-oc-b.js): i valori non sono formule.
 * Le funzioni di calcolo sono anche in window.GI_OC_C, per le prove.
 */
(function () {
  "use strict";
  const GI = window.GI, M = window.GI_MIP, O = window.GI_OC;
  const T = GI.T;
  const { clamp, somma, lista, osservaDimensioni, dim, pix, disegno } = O;
  window.GI_RICETTE = window.GI_RICETTE || {};
  const B = () => window.GI_OC_B;

  // ---------------------------------------------------------------- le tre famiglie
  function nfIstanza(q) {
    const n = 4 * q, w = [];
    for (let i = 1; i <= n; i++) w.push(i % 2 ? n / 2 : 2);
    const tr = B().bppTraccia(w, n, "nf"), nf = tr[tr.length - 1].bins;
    const grandi = w.map((x, j) => j).filter((j) => w[j] === n / 2), piccoli = w.map((x, j) => j).filter((j) => w[j] === 2);
    const opt = [];
    for (let i = 0; i < grandi.length; i += 2) opt.push([grandi[i], grandi[i + 1]]);
    opt.push(piccoli);
    return { n, c: n, w, alg: nf, opt, valAlg: nf.length, valOpt: opt.length, LB: Math.ceil(somma(w) / n) };
  }
  function geIstanza(th) {
    const p = [2, th, th], w = [1, th, th], c = 2 * th;
    let r = c, gr = 0; const presi = [];
    for (const j of [0, 1, 2]) if (w[j] <= r) { r -= w[j]; gr += p[j]; presi.push(j); }   // già in ordine di efficienza
    const pmax = Math.max(...p), j1 = p.indexOf(pmax);
    const esteso = Math.max(gr, pmax), singolo = [j1];
    return { p, w, c, presi, gr, pmax, singolo, valAlg: esteso, valOpt: 2 * th, optSet: [1, 2], sceltaSingolo: pmax > gr };
  }
  function lptIstanza(m) {
    const t = [];
    for (let v = 2 * m - 1; v >= m + 1; v--) t.push(v, v);
    t.push(m, m, m);
    const tr = B().cmaxTraccia(t, m, "lpt"), fin = tr[tr.length - 1];
    // ottimo: la coppia (v, 3m - v) su m-1 macchine, i tre lavori di durata m sull'ultima
    const prima = new Map(), seconda = new Map();
    t.forEach((x, j) => { if (x === m) return; if (!prima.has(x)) prima.set(x, j); else seconda.set(x, j); });
    const opt = [];
    for (let v = m + 1; v <= 2 * m - 1; v++) opt.push([prima.get(v), seconda.get(3 * m - v)]);
    opt.push(t.map((x, j) => j).filter((j) => t[j] === m));
    const Lopt = opt.map((r) => somma(r.map((j) => t[j])));
    return { t, m, ass: fin.ass, valAlg: Math.max(...fin.L), opt, valOpt: Math.max(...Lopt), LB: B().cmaxLB(t, m) };
  }
  const FAM = {
    nf: { q: [2, 8, 3], f: nfIstanza, limite: 2, rapporto: (q) => nfIstanza(q).valAlg / nfIstanza(q).valOpt,
      parametro: (q) => `n = 4q = ${4 * q}`, asse: "q" },
    ge: { q: [3, 20, 6], f: geIstanza, limite: 2, rapporto: (q) => 2 * q / (q + 2), parametro: (q) => `θ = ${q}`, asse: "θ" },
    lpt: { q: [2, 7, 3], f: lptIstanza, limite: 4 / 3, rapporto: (q) => (4 * q - 1) / (3 * q), parametro: (q) => `m = ${q}`, asse: "m" },
  };
  const TIGHT_FUNZ = {
    nf: { etichetta: "Next Fit" },
    ge: { etichetta: T("Greedy esteso (zaino)", "Extended greedy (knapsack)") },
    lpt: { etichetta: "LPT" },
  };

  function stato(st) {
    const D = st.dati, chiave = st.chiave(), F = FAM[chiave];
    if (D.chiave !== chiave) {   // nuova voce: il parametro riparte dal suo valore di default
      D.chiave = chiave;
      const i = M.inputDi(st, "q");
      if (i) { i.min = F.q[0]; i.max = F.q[1]; i.value = F.q[2]; }
    }
    M.intervallo(st, "q", F.q[0], F.q[1]);
    const q = M.intero(st, "q");
    return { chiave, F, q, X: F.f(q) };
  }

  function disegna(board, st, S, crea, C) {
    const [W, H] = dim(board);
    pix(board);
    const d = disegno(crea, H), { chiave, F, q, X } = S;
    const topH = H * 0.6, fs = clamp(Math.min(W / 52, H / 30), 10, 15);
    const titolo = (x, y, s, col) => d.text(x, y, s, { anchorX: "left", fontSize: fs * 1.05, strokeColor: col, cssStyle: "font-weight:700" });
    // ------------------------------------------------ parte alta: l'algoritmo e l'ottimo
    if (chiave === "nf") {
      const nb = X.alg.length, no = X.opt.length, cols = nb + no + 1.5, cw = Math.min((W - 30) / cols, 48), x0 = 15;
      const hh = topH - 64, u = hh / X.c, y1 = 34 + hh;
      const bin = (b, items, i0) => {
        const x = x0 + i0 * cw, bw = cw * 0.78;
        d.rect(x, y1 - hh, bw, hh, { strokeColor: C.muted, strokeWidth: 1.2 });
        let y = y1;
        for (const j of items) {
          const g = X.w[j] > 2;
          y -= X.w[j] * u;
          d.rect(x, y, bw, X.w[j] * u, { strokeColor: g ? C.b : C.a, strokeWidth: 1, fillColor: g ? C.b : C.a, fillOpacity: g ? 0.4 : 0.7 });
        }
      };
      X.alg.forEach((b, i) => bin(i, b, i));
      X.opt.forEach((b, i) => bin(i, b, nb + 1.5 + i));
      titolo(x0, 14, T(`Next Fit: ${nb} contenitori`, `Next Fit: ${nb} bins`), C.a);
      titolo(x0 + (nb + 1.5) * cw, 14, T(`Ottimo: ${no} contenitori`, `Optimum: ${no} bins`), C.blu);
      d.text(x0, y1 + 14, T(`capacità c = ${X.c}; oggetti grandi di peso ${X.c / 2} (azzurro), piccoli di peso 2 (arancio)`, `capacity c = ${X.c}; large items of weight ${X.c / 2} (blue), small items of weight 2 (orange)`), { anchorX: "left", fontSize: fs * 0.92, strokeColor: C.muted });
    } else if (chiave === "ge") {
      const lw = clamp(W * 0.2, 120, 210), x0 = lw + 10, Wb = W - x0 - 20, u = Wb / X.c, rh = clamp((topH - 40) / 3, 34, 62);
      const riga = (i, etichetta, col, items, val) => {
        const y = 24 + i * rh * 1.12;
        d.text(lw, y + rh / 2, etichetta, { anchorX: "right", fontSize: fs, strokeColor: col, cssStyle: "font-weight:700" });
        d.rect(x0, y, Wb, rh, { strokeColor: C.muted, strokeWidth: 1.2, dash: 2 });
        let x = x0;
        for (const j of items) {
          d.rect(x, y, X.w[j] * u, rh, { strokeColor: col, strokeWidth: 1.5, fillColor: col, fillOpacity: 0.35 });
          const wpx = X.w[j] * u;
          d.text(x + wpx / 2, y + rh / 2, wpx > 4 * fs ? T(`${j + 1}: p=${X.p[j]}`, `${j + 1}: p=${X.p[j]}`) : (wpx > fs ? String(j + 1) : ""), { fontSize: fs, strokeColor: C.testo });
          x += wpx;
        }
        d.text(x0 + Wb - 8, y + rh / 2, `${T("valore", "value")} = ${val}`, { anchorX: "right", fontSize: fs * 1.05, strokeColor: col, cssStyle: "font-weight:800" });
      };
      riga(0, T("greedy GR (per efficienza)", "greedy GR (by efficiency)"), C.a, X.presi, X.gr);
      riga(1, T("miglior oggetto singolo", "best single item"), C.viola, X.singolo, X.pmax);
      riga(2, T("ottimo", "optimum"), C.blu, X.optSet, X.valOpt);
      d.text(x0, topH - 4, T(`capacità c = ${X.c} (barra tratteggiata); oggetti: 1 (p=2, w=1), 2 e 3 (p=${q}, w=${q}); greedy esteso = max{GR, pmax} = ${X.valAlg}`, `capacity c = ${X.c} (dashed bar); items: 1 (p=2, w=1), 2 and 3 (p=${q}, w=${q}); extended greedy = max{GR, pmax} = ${X.valAlg}`), { anchorX: "left", fontSize: fs * 0.92, strokeColor: C.muted });
    } else {
      const m = X.m, lw = 78, x0 = lw + 8, Xmax = Math.max(X.valAlg, X.valOpt, X.LB) + 1, ux = (W - x0 - 14) / Xmax;
      const rh = clamp((topH - 78) / (2 * m), 6, 30), yb0 = (i0) => 30 + i0 * rh + (i0 ? 24 : 0);
      const blocco = (i0, nome, col, righe, L) => {
        titolo(8, yb0(i0) - 10, nome, col);
        righe.forEach((r, q2) => {
          const y = yb0(i0) + q2 * rh;
          if (rh >= 9) d.text(lw, y + rh / 2, "M" + (q2 + 1), { anchorX: "right", fontSize: Math.min(fs * 0.9, rh * 0.8), strokeColor: C.muted });
          let x = 0;
          for (const j of r) {
            const tj = X.t[j];
            d.rect(x0 + x * ux, y + 1, tj * ux, rh - 2, { strokeColor: col, strokeWidth: 1, fillColor: col, fillOpacity: 0.38 });
            if (tj * ux > fs * 1.2 && rh >= 10) d.text(x0 + (x + tj / 2) * ux, y + rh / 2, String(tj), { fontSize: Math.min(fs, rh * 0.75), strokeColor: C.testo });
            x += tj;
          }
        });
        const yb = yb0(i0), yy = yb + righe.length * rh;
        d.line(x0 + L * ux, yb - 2, x0 + L * ux, yy + 2, { strokeColor: col, strokeWidth: 2.5, dash: 2 });
        d.text(x0 + L * ux + 5, yb + 6, String(L), { anchorX: "left", fontSize: fs, strokeColor: col, cssStyle: "font-weight:800" });
      };
      blocco(0, T(`LPT: makespan ${X.valAlg}`, `LPT: makespan ${X.valAlg}`), C.a, X.ass.map((r) => r.map(([j]) => j)), X.valAlg);
      blocco(m, T(`Ottimo: makespan ${X.valOpt}`, `Optimum: makespan ${X.valOpt}`), C.blu, X.opt, X.valOpt);
      d.line(x0 + X.LB * ux, 24, x0 + X.LB * ux, topH - 8, { strokeColor: C.verde, strokeWidth: 1.8, dash: 3 });
      d.text(x0 + X.LB * ux - 5, topH - 10, `LB = ${X.LB}`, { anchorX: "right", fontSize: fs * 0.95, strokeColor: C.verde, cssStyle: "font-weight:700" });
    }
    // ------------------------------------------------ parte bassa: il rapporto al crescere del parametro
    const px0 = 62, px1 = W - 24, py0 = topH + 34, py1 = H - 34;
    const [qa, qb] = F.q, ymax = F.limite * 1.07, ymin = 1;
    const gx = (v) => px0 + (v - qa) / (qb - qa) * (px1 - px0), gy = (r) => py1 - (r - ymin) / (ymax - ymin) * (py1 - py0);
    d.line(px0, py1, px1, py1, { strokeColor: C.muted, strokeWidth: 1.4 });
    d.line(px0, py0 - 6, px0, py1, { strokeColor: C.muted, strokeWidth: 1.4 });
    d.text(px0 - 8, gy(1), "1", { anchorX: "right", fontSize: fs, strokeColor: C.muted });
    d.text(px0 - 8, gy(F.limite), chiave === "lpt" ? "4/3" : "2", { anchorX: "right", fontSize: fs, strokeColor: C.verde, cssStyle: "font-weight:700" });
    d.text(px0, py0 - 18, chiave === "ge" ? T("rapporto z / greedy esteso", "ratio z / extended greedy") : T("rapporto algoritmo / ottimo", "ratio algorithm / optimum"), { anchorX: "left", fontSize: fs, strokeColor: C.muted, cssStyle: "font-style:italic" });
    d.line(px0, gy(F.limite), px1, gy(F.limite), { strokeColor: C.verde, strokeWidth: 2, dash: 2 });
    d.text(px1, gy(F.limite) - 11, T(`limite ${chiave === "lpt" ? "4/3" : "2"}`, `limit ${chiave === "lpt" ? "4/3" : "2"}`), { anchorX: "right", fontSize: fs, strokeColor: C.verde, cssStyle: "font-weight:700" });
    const pts = [];
    for (let v = qa; v <= qb; v++) pts.push([v, F.rapporto(v)]);
    for (let i = 0; i + 1 < pts.length; i++) d.line(gx(pts[i][0]), gy(pts[i][1]), gx(pts[i + 1][0]), gy(pts[i + 1][1]), { strokeColor: C.b, strokeWidth: 2 });
    const passo = qb - qa > 10 ? 2 : 1;
    for (const [v, r] of pts) {
      const cur = v === q;
      d.dot(gx(v), gy(r), cur ? 8 : 4, { fillColor: cur ? C.a : C.b, strokeColor: cur ? C.a : C.b });
      if ((v - qa) % passo === 0) d.text(gx(v), py1 + 14, String(v), { fontSize: fs * 0.9, strokeColor: cur ? C.a : C.muted, cssStyle: cur ? "font-weight:800" : "" });
    }
    d.text(px1, py1 + 14 + 14, F.asse, { anchorX: "right", fontSize: fs, strokeColor: C.muted, cssStyle: "font-style:italic" });
    const rq = F.rapporto(q);
    d.text(gx(q), gy(rq) - 16, GI.numTxt(rq, 2), { fontSize: fs * 1.05, strokeColor: C.a, cssStyle: "font-weight:800" });
  }

  window.GI_RICETTE["oc-tight"] = {
    titolo: T("Istanze tight: il rapporto si avvicina al limite", "Tight instances: the ratio approaches the bound"),
    funzioni: TIGHT_FUNZ,
    etichettaFunzioni: T("Algoritmo e garanzia", "Algorithm and guarantee"),
    parametri: [{ k: "q", nome: "q", min: 2, max: 8, step: 1, val: 3, colore: "a", cifre: 0, descr: T("parametro della famiglia di istanze: ▶ lo fa crescere, un valore ogni 0,9 s", "parameter of the instance family: ▶ makes it grow, one value every 0.9 s") }],
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [-1, 10, 20, -2],
    legenda: (st) => {
      const C = M.COL(st);
      return [
        [C.a, T("soluzione dell'algoritmo", "solution of the algorithm"), "pieno"],
        [C.blu, T("ottimo", "optimum"), "pieno"],
        [C.verde, T("limite della garanzia", "limit of the guarantee"), "dashed"],
        [C.b, T("rapporto sulla famiglia di istanze", "ratio on the family of instances"), ""],
      ];
    },
    monta(board, st) { osservaDimensioni(board, st); },
    aggiorna(board, st) {
      const S = stato(st), C = M.COL(st), [W, H] = dim(board);
      M.ridisegna(board, st, [S.chiave, S.q, M.scuro(), W, H].join("|"), (crea) => disegna(board, st, S, crea, C));
    },
    formula(p, st) {
      const { chiave, q, X } = stato(st), nf = (x) => GI.num(x, 3);
      if (chiave === "nf") return `\\frac{NF(I)}{z(I)} = \\frac{${X.valAlg}}{${X.valOpt}} = ${nf(X.valAlg / X.valOpt)} \\quad \\Big(= \\tfrac{2n}{n+4} = \\tfrac{2q}{q+1} \\to 2\\Big)`;
      if (chiave === "ge") return `\\frac{z(I)}{GR^e(I)} = \\frac{${X.valOpt}}{${X.valAlg}} = ${nf(X.valOpt / X.valAlg)} \\quad \\Big(= \\tfrac{2\\theta}{\\theta+2} \\to 2\\Big)`;
      return `\\frac{LPT(I)}{z(I)} = \\frac{${X.valAlg}}{${X.valOpt}} = ${nf(X.valAlg / X.valOpt)} \\quad \\Big(= \\tfrac{4m-1}{3m} = \\tfrac43 - \\tfrac{1}{3m} \\to \\tfrac43\\Big)`;
    },
    letture(p, st) {
      const { chiave, q, F, X } = stato(st), C = M.COL(st);
      let nota, righe;
      if (chiave === "nf") {
        nota = T(`Istanza con \\(n = 4q = ${X.n}\\) oggetti e capacità \\(c = n = ${X.c}\\): pesi alternati \\(n/2 = ${X.c / 2}\\) e \\(2\\), nell'ordine dato. NF mette ogni coppia \\((${X.c / 2}, 2)\\) in un contenitore, e il grande successivo non ci sta (residuo \\(${X.c / 2 - 2} < ${X.c / 2}\\)): ${M.tinta(C.a, X.valAlg + " contenitori")}. L'ottimo mette i grandi a due a due (\\(${X.valOpt - 1}\\) contenitori pieni) e tutti i piccoli insieme (\\(${X.c / 2}\\cdot 2 = ${X.c}\\)): ${M.tinta(C.blu, X.valOpt)}.`,
          `Instance with \\(n = 4q = ${X.n}\\) items and capacity \\(c = n = ${X.c}\\): alternating weights \\(n/2 = ${X.c / 2}\\) and \\(2\\), in the given order. NF puts every pair \\((${X.c / 2}, 2)\\) in one bin, and the next large item does not fit (residual \\(${X.c / 2 - 2} < ${X.c / 2}\\)): ${M.tinta(C.a, X.valAlg + " bins")}. The optimum packs the large items two per bin (\\(${X.valOpt - 1}\\) full bins) and all the small ones together (\\(${X.c / 2}\\cdot 2 = ${X.c}\\)): ${M.tinta(C.blu, X.valOpt)}.`);
        righe = [["NF(I)", X.valAlg], [T("ottimo \\(z(I)\\)", "optimum \\(z(I)\\)"), X.valOpt], [T("bound \\(\\lceil \\sum w_j / c \\rceil\\)", "bound \\(\\lceil \\sum w_j / c \\rceil\\)"), X.LB]];
      } else if (chiave === "ge") {
        nota = T(`Istanza con capacità \\(c = 2\\theta = ${X.c}\\) e tre oggetti: \\((p,w) = (2,1)\\), \\((${q},${q})\\), \\((${q},${q})\\). L'oggetto 1 ha efficienza \\(2\\), gli altri \\(1\\): il greedy prende 1, poi uno solo fra 2 e 3 (residuo \\(${X.c - 1}\\)): valore \\(${q} + 2 = ${X.gr}\\). Il miglior oggetto singolo vale \\(${X.pmax}\\). ${M.tinta(C.a, "GR^e = max{" + X.gr + ", " + X.pmax + "} = " + X.valAlg)}. L'ottimo prende 2 e 3 (peso \\(${X.c} = c\\)): ${M.tinta(C.blu, X.valOpt)}.`,
          `Instance with capacity \\(c = 2\\theta = ${X.c}\\) and three items: \\((p,w) = (2,1)\\), \\((${q},${q})\\), \\((${q},${q})\\). Item 1 has efficiency \\(2\\), the others \\(1\\): the greedy takes 1, then only one of 2 and 3 (residual \\(${X.c - 1}\\)): value \\(${q} + 2 = ${X.gr}\\). The best single item is worth \\(${X.pmax}\\). ${M.tinta(C.a, "GR^e = max{" + X.gr + ", " + X.pmax + "} = " + X.valAlg)}. The optimum takes 2 and 3 (weight \\(${X.c} = c\\)): ${M.tinta(C.blu, X.valOpt)}.`);
        righe = [["GR^e(I)", X.valAlg], [T("ottimo \\(z(I)\\)", "optimum \\(z(I)\\)"), X.valOpt]];
      } else {
        nota = T(`Istanza con \\(m = ${q}\\) macchine e \\(n = 2m+1 = ${X.t.length}\\) lavori già ordinati: due per ogni durata \\(${2 * q - 1}, \\dots, ${q + 1}\\) e tre di durata \\(${q}\\). LPT riempie le macchine a coppie di carico \\(3m-1 = ${3 * q - 1}\\) e l'ultimo lavoro (durata \\(${q}\\)) va su una di esse: ${M.tinta(C.a, "makespan " + X.valAlg)}. L'ottimo accoppia \\(v\\) e \\(3m-v\\) e mette i tre lavori di durata \\(${q}\\) sull'ultima macchina: ${M.tinta(C.blu, "makespan " + X.valOpt)}, uguale al bound \\(\\mathrm{LB} = ${X.LB}\\).`,
          `Instance with \\(m = ${q}\\) machines and \\(n = 2m+1 = ${X.t.length}\\) jobs already sorted: two for each duration \\(${2 * q - 1}, \\dots, ${q + 1}\\) and three of duration \\(${q}\\). LPT fills the machines in pairs up to load \\(3m-1 = ${3 * q - 1}\\) and the last job (duration \\(${q}\\)) goes on one of them: ${M.tinta(C.a, "makespan " + X.valAlg)}. The optimum pairs \\(v\\) with \\(3m-v\\) and puts the three jobs of duration \\(${q}\\) on the last machine: ${M.tinta(C.blu, "makespan " + X.valOpt)}, equal to the bound \\(\\mathrm{LB} = ${X.LB}\\).`);
        righe = [["LPT(I)", X.valAlg], [T("ottimo \\(z(I)\\)", "optimum \\(z(I)\\)"), X.valOpt], [`\\(\\mathrm{LB}\\)`, X.LB]];
      }
      const rq = F.rapporto(q);
      const lim = chiave === "lpt" ? "\\tfrac43" : "2";
      const tutte = [];
      for (let v = F.q[0]; v <= F.q[1]; v += Math.max(1, Math.floor((F.q[1] - F.q[0]) / 4))) tutte.push(v);
      const tab = M.tab([T("valore", "value"), ""], righe.map(([a, b]) => [a, `\\(${b}\\)`]).concat([[T("rapporto", "ratio"), `\\(${GI.num(rq, 3)}\\)`], [T("limite della garanzia", "limit of the guarantee"), `\\(${lim} = ${GI.num(F.limite, 3)}\\)`], [T("distanza dal limite", "distance from the limit"), `\\(${GI.num(F.limite - rq, 3)}\\)`]]), -1, C.a);
      return nota + tab + `<div style="margin-top:.3em">${T("Il rapporto resta sotto il limite e lo raggiunge solo al limite del parametro: la garanzia è stretta, non si può migliorare.", "The ratio stays below the limit and reaches it only as the parameter grows: the guarantee is tight, it cannot be improved.")}</div>`;
    },
    domanda: T("Sposta \\(q\\) fino al massimo: quanto manca ancora al limite? Per ogni famiglia scrivi il rapporto in funzione del parametro e calcola il limite per \\(q \\to \\infty\\).",
      "Move \\(q\\) up to the maximum: how far from the limit are we still? For each family write the ratio as a function of the parameter and compute the limit for \\(q \\to \\infty\\)."),
  };

  window.GI_OC_C = { nfIstanza, geIstanza, lptIstanza, FAM };
})();
