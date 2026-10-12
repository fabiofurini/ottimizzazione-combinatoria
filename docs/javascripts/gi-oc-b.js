/* Laboratorio di «Ottimizzazione combinatoria / Combinatorial Optimization»: algoritmi euristici.
 *
 *   oc-bin-packing   bin packing: Next Fit, First Fit, Best Fit, Worst Fit, First Fit Decreasing, passo per passo,
 *                    con il bound ⌈Σ w_j / c⌉, l'ottimo e la modalità «Batti l'algoritmo» (impacchetti tu)
 *   oc-scheduling    P||Cmax: List scheduling e LPT con il diagramma di Gantt e il bound max{max t_j, ⌈Σ t_j / m⌉}
 *   oc-tsp           TSP: nearest neighbour e 2-opt, su istanze nel piano (città trascinabili) o sull'istanza
 *                    di riferimento del corso (5 città, matrice, ottimo 18)
 *
 * Notazione del corso: capacità c, pesi w_j, durate t_j, m macchine, z(I) ottimo.
 * Istanze di riferimento: BPP w = (4,4,5,3,2,3), c = 7; P||Cmax t = (5,5,4,4,3,3,3), m = 3; TSP a 5 città.
 * Le funzioni di calcolo (senza disegno) sono anche in window.GI_OC_B, per le prove.
 * Formato delle ricette: commento in testa a interattivi.js; strumenti comuni in gi-comune.js e gi-oc-0.js.
 */
(function () {
  "use strict";
  const GI = window.GI, M = window.GI_MIP, O = window.GI_OC;
  const T = GI.T;
  const { PASSO, parPasso, DESCR_PASSO, vaiA, clamp, somma, lista, pct, decrescente, nuovoId, osservaDimensioni, nuovaVoce, dim, daIndirizzo, chiedi, interi } = O;
  window.GI_RICETTE = window.GI_RICETTE || {};
  const MR = "\\mathrm";

  // =================================================================
  // 1. BIN PACKING
  // =================================================================
  const BPP_ES = [{ w: [4, 4, 5, 3, 2, 3], c: 7 }, { w: [3, 3, 2, 2, 2, 2, 5, 5, 4], c: 10 }];
  const REGOLE = ["nf", "ff", "bf", "wf", "ffd"];
  const BPP_FUNZ = {
    nf: { etichetta: "<span title=\"Next Fit\">NF</span>", nome: "Next Fit" },
    ff: { etichetta: "<span title=\"First Fit\">FF</span>", nome: "First Fit" },
    bf: { etichetta: "<span title=\"Best Fit\">BF</span>", nome: "Best Fit" },
    wf: { etichetta: "<span title=\"Worst Fit\">WF</span>", nome: "Worst Fit" },
    ffd: { etichetta: "<span title=\"First Fit Decreasing\">FFD</span>", nome: "First Fit Decreasing" },
    mano: { etichetta: T("Impacchetti tu", "You pack"), nome: T("Tu", "You") },
  };

  /** la sequenza degli stati di NF, FF, BF, WF o FFD: ogni oggetto in ordine, scelta del contenitore, residui */
  function bppTraccia(w, c, regola) {
    const ord = regola === "ffd" ? decrescente(w) : w.map((_, j) => j);
    const bins = [], tr = [{ bins: [], cur: null, ord, fatti: 0 }];
    ord.forEach((j, i) => {
      const res = bins.map((b) => c - somma(b.map((q) => w[q])));
      let b = -1, scartati = [], cand = [];
      if (regola === "nf") {
        const u = bins.length - 1;
        if (u >= 0 && w[j] <= res[u]) b = u; else if (u >= 0) scartati = [u];
      } else if (regola === "bf" || regola === "wf") {
        cand = res.map((r, q) => q).filter((q) => w[j] <= res[q]);
        for (const q of cand) if (b < 0 || (regola === "bf" ? res[q] < res[b] : res[q] > res[b])) b = q;
      } else {
        for (let q = 0; q < bins.length; q++) { if (w[j] <= res[q]) { b = q; break; } scartati.push(q); }
      }
      const nuovo = b < 0;
      if (nuovo) { bins.push([]); b = bins.length - 1; }
      bins[b].push(j);
      tr.push({ bins: bins.map((x) => x.slice()), cur: j, b, nuovo, scartati, cand, res, ord, fatti: i + 1 });
    });
    tr[tr.length - 1].fine = true;
    return tr;
  }
  /** minimo numero di contenitori, per enumerazione con tagli (n <= 12) */
  function bppOttimo(w, c) {
    const ord = decrescente(w), n = w.length, LB = Math.ceil(somma(w) / c), res = [];
    let best = n;
    const dfs = (i) => {
      if (best === LB || res.length >= best) return;
      if (i === n) { best = res.length; return; }
      const x = w[ord[i]], visti = new Set();
      for (let b = 0; b < res.length; b++) {
        if (res[b] >= x && !visti.has(res[b])) { visti.add(res[b]); res[b] -= x; dfs(i + 1); res[b] += x; }
      }
      if (res.length + 1 < best) { res.push(c - x); dfs(i + 1); res.pop(); }
    };
    dfs(0);
    return best;
  }
  const bppFinale = (w, c, r) => { const q = bppTraccia(w, c, r); return q[q.length - 1].bins.length; };
  function bppCasuale() {
    const n = M.casuale(6, 10), c = M.casuale(8, 12), w = [];
    for (let j = 0; j < n; j++) w.push(M.casuale(2, Math.min(8, c - 1)));
    return { w, c, id: nuovoId() };
  }

  function bppStato(st) {
    const D = st.dati, regola = st.chiave();
    if (!D.bpp) D.bpp = Object.assign({ id: nuovoId() }, BPP_ES[0], { w: BPP_ES[0].w.slice() });
    const I = D.bpp;
    if (D.bFirma !== I.id) {
      D.bFirma = I.id;
      D.btr = {};
      for (const r of REGOLE) D.btr[r] = bppTraccia(I.w, I.c, r);
      D.bott = bppOttimo(I.w, I.c);
      D.bLB = Math.ceil(somma(I.w) / I.c);
      D.bfin = {};
      for (const r of REGOLE) D.bfin[r] = D.btr[r][D.btr[r].length - 1].bins.length;
      // posti per i contenitori: il massimo fra le regole, così il disegno non salta cambiando regola
      D.bSlot = Math.max(D.bLB, ...REGOLE.map((r) => D.bfin[r]));
      D.man = { bins: Array.from({ length: D.bSlot }, () => []), sel: null, msg: null };
    }
    if (regola === "mano") {
      const m = D.man, posti = new Set([].concat(...m.bins));
      const coda = I.w.map((_, j) => j).filter((j) => !posti.has(j));
      const usati = m.bins.filter((b) => b.length).length;
      return { D, I, regola, mano: true, coda, usati, E: { bins: m.bins, cur: m.sel, ord: coda, fatti: 0, rif: m.rif }, ott: D.bott, LB: D.bLB, fine: coda.length === 0 };
    }
    const tr = D.btr[regola], K = tr.length - 1, k = M.passoK(st, K, PASSO);
    return { D, I, regola, tr, K, k, E: tr[k], ott: D.bott, LB: D.bLB, fine: k === K };
  }

  function disegnaBpp(board, st, S, crea, C) {
    const { I, E, LB } = S, n = I.w.length, w = I.w, Cap = I.c, D = S.D;
    const slot = D.bSlot, x1 = slot + 1 + n;
    const [W, H] = dim(board);
    board.setBoundingBox([-0.35, Cap * 1.1 + 0.9, x1 + 0.1, -Cap * 0.2 - 0.6], false);
    const ux = W / (x1 + 0.45), uy = H / (Cap * 1.3 + 1.5);
    const fs = clamp(Math.min(ux * 0.42, uy * 0.75), 9, 15), bw = 0.39;
    const ytesto = -Math.max(0.35, 12 / uy);
    const geo = { cols: [], coda: [], posti: [] };
    E.bins.forEach((bin, b) => {
      const xc = b + 0.5, scart = E.scartati && E.scartati.includes(b) && E.cur != null && !S.mano;
      const rifiuto = S.mano && E.rif === b;
      M.rett(crea, xc - bw - 0.04, 0, xc + bw + 0.04, Cap, { strokeColor: rifiuto ? C.rosso : scart ? C.viola : C.muted, strokeWidth: scart || rifiuto ? 2.5 : 1.5, dash: scart ? 2 : 0 });
      geo.cols.push({ b, x0: xc - 0.5, x1: xc + 0.5 });
      let y = 0;
      for (const j of bin) {
        const cur = !S.mano && j === E.cur;
        M.rett(crea, xc - bw, y, xc + bw, y + w[j], { strokeColor: cur ? C.a : C.b, fillColor: cur ? C.a : C.b, fillOpacity: cur ? 0.75 : 0.42, strokeWidth: 1.5 });
        if (w[j] * uy > fs) M.scritta(crea, xc, y + w[j] / 2, String(w[j]), { fontSize: fs, strokeColor: C.testo });
        geo.posti.push({ j, b, x0: xc - bw, x1: xc + bw, y0: y, y1: y + w[j] });
        y += w[j];
      }
      M.scritta(crea, xc, ytesto, String(b + 1), { fontSize: fs * 0.95, strokeColor: C.muted, cssStyle: "font-weight:600" });
    });
    // il bound: le prime LB colonne
    const yb = ytesto - Math.max(0.35, fs * 1.25 / uy);
    M.linea(crea, 0.1, yb, LB - 0.1, yb, { strokeColor: C.verde, strokeWidth: 3 });
    M.scritta(crea, LB - 0.05, yb, `  LB = ⌈${somma(w)}/${Cap}⌉ = ${LB}`, { anchorX: "left", fontSize: fs, strokeColor: C.verde, cssStyle: "font-weight:600" });
    // la coda: oggetti ancora da sistemare
    const x0 = slot + 1;
    M.linea(crea, slot + 0.5, -0.1, slot + 0.5, Cap * 1.05, { strokeColor: C.line, strokeWidth: 1.5, dash: 2 });
    M.scritta(crea, x0 + 0.1, Cap * 1.1 + 0.4, S.mano ? T("da sistemare (clic per sceglierlo)", "to be packed (click to pick one)") : T("da sistemare", "to be packed"), { anchorX: "left", fontSize: fs * 0.95, strokeColor: C.muted, cssStyle: "font-style:italic" });
    M.scritta(crea, 0.1, Cap * 1.1 + 0.4, T(`contenitori (capacità c = ${Cap})`, `bins (capacity c = ${Cap})`), { anchorX: "left", fontSize: fs * 0.95, strokeColor: C.muted, cssStyle: "font-style:italic" });
    E.ord.slice(E.fatti).forEach((j, i) => {
      const xc = x0 + i + 0.5, sel = S.mano && E.cur === j;
      M.rett(crea, xc - bw, 0, xc + bw, w[j], { strokeColor: sel ? C.a : C.grigio, fillColor: sel ? C.a : C.grigio, fillOpacity: sel ? 0.75 : 0.35, strokeWidth: sel ? 2.5 : 1.5 });
      if (w[j] * uy > fs) M.scritta(crea, xc, w[j] / 2, String(w[j]), { fontSize: fs, strokeColor: C.testo });
      M.scritta(crea, xc, ytesto, String(j + 1), { fontSize: fs * 0.85, strokeColor: C.muted });
      geo.coda.push({ j, x0: xc - bw, x1: xc + bw, y0: 0, y1: w[j] });
    });
    D.geo = geo;
  }

  /** clic nella modalità «Impacchetti tu»: sceglie un oggetto, lo mette in un contenitore, lo toglie */
  function clicManuale(board, st, e) {
    const D = st.dati;
    if (st.chiave() !== "mano" || !D.geo) return;
    let u;
    try { u = board.getUsrCoordsOfMouse(e); } catch (er) { return; }
    const [x, y] = u, m = D.man, I = D.bpp;
    m.msg = null; m.rif = null;
    const col = D.geo.cols.find((c) => x >= c.x0 && x <= c.x1 && y >= -0.3 && y <= I.c * 1.12);
    if (m.sel != null && col) {
      const carico = somma(m.bins[col.b].map((q) => I.w[q]));
      if (carico + I.w[m.sel] <= I.c) { m.bins[col.b].push(m.sel); m.sel = null; }
      else { m.msg = T(`L'oggetto ${m.sel + 1} (peso ${I.w[m.sel]}) non entra nel contenitore ${col.b + 1}: residuo ${I.c - carico}.`, `Item ${m.sel + 1} (weight ${I.w[m.sel]}) does not fit in bin ${col.b + 1}: residual ${I.c - carico}.`); m.rif = col.b; }
    } else {
      const q = D.geo.coda.find((r) => x >= r.x0 && x <= r.x1 && y >= r.y0 && y <= r.y1 + 0.3);
      if (q) m.sel = m.sel === q.j ? null : q.j;
      else {
        const p = D.geo.posti.find((r) => x >= r.x0 && x <= r.x1 && y >= r.y0 && y <= r.y1);
        if (p) { m.bins[p.b] = m.bins[p.b].filter((j) => j !== p.j); m.sel = null; }
        else m.sel = null;
      }
    }
    st.aggiorna();
  }

  window.GI_RICETTE["oc-bin-packing"] = {
    titolo: T("Euristiche per il bin packing", "Bin packing heuristics"),
    funzioni: BPP_FUNZ,
    etichettaFunzioni: T("Regola · oppure «Impacchetti tu» per battere l'algoritmo", "Rule · or «You pack» to beat the algorithm"),
    parametri: [parPasso(DESCR_PASSO)],
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [-1, 10, 20, -2],
    legenda: (st) => {
      const C = M.COL(st);
      return [
        [C.b, T("oggetti sistemati", "packed items"), "pieno"],
        [C.a, st.chiave() === "mano" ? T("oggetto scelto", "picked item") : T("oggetto corrente", "current item"), "pieno"],
        [C.grigio, T("da sistemare", "to be packed"), "pieno"],
        ...(st.chiave() === "mano" ? [] : [[C.viola, T("contenitore esaminato, non basta", "bin examined, too full"), "dashed"]]),
        [C.verde, T("bound \\(\\mathrm{LB} = \\lceil \\sum_j w_j / c \\rceil\\)", "bound \\(\\mathrm{LB} = \\lceil \\sum_j w_j / c \\rceil\\)"), ""],
      ];
    },
    monta(board, st) {
      const D = st.dati;
      nuovaVoce(st);
      const i0 = M.inputDi(st, PASSO);
      if (i0 && +i0.value === 0) i0.value = 1;
      const nuova = (I) => { D.bpp = Object.assign(I, { id: nuovoId() }); vaiA(st, 1); st.aggiorna(); };
      M.comandi(st, [
        [T("Esempio 1", "Example 1"), T("istanza del corso: w = (4, 4, 5, 3, 2, 3), c = 7", "course instance: w = (4, 4, 5, 3, 2, 3), c = 7"), () => nuova({ w: BPP_ES[0].w.slice(), c: BPP_ES[0].c })],
        [T("Esempio 2", "Example 2"), T("nove oggetti, c = 10", "nine items, c = 10"), () => nuova({ w: BPP_ES[1].w.slice(), c: BPP_ES[1].c })],
        [T("Casuale", "Random"), T("dati casuali", "random data"), () => nuova(bppCasuale())],
        [T("Modifica…", "Edit…"), T("scrivi i pesi e la capacità", "type the weights and the capacity"), () => {
          const s = chiedi(T("Pesi e capacità, separati da «;» (fra 2 e 12 oggetti, c fino a 30), per esempio: 4 4 5 3 2 3 ; 7",
            "Weights and capacity separated by «;» (2 to 12 items, c up to 30), for example: 4 4 5 3 2 3 ; 7"), D.bpp.w.join(" ") + " ; " + D.bpp.c);
          if (!s) return;
          const [a, b] = s.split(";"), w = interi(a || ""), c = interi(b || "");
          if (!w || !c || c.length !== 1 || w.length < 2 || w.length > 12 || c[0] > 30 || Math.max(...w) > c[0]) { window.alert(T("Dati non validi: pesi interi positivi, nessun peso maggiore della capacità.", "Invalid data: positive integer weights, none larger than the capacity.")); return; }
          nuova({ w, c: c[0] });
        }],
        [T("Ricomincia", "Start again"), T("svuota i contenitori e torna al primo passo", "empty the bins and go back to the first step"), () => {
          D.bFirma = null; vaiA(st, 1); st.aggiorna();
        }],
      ], { k: PASSO });
      board.on("down", (e) => clicManuale(board, st, e));
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = bppStato(st), C = M.COL(st), [W, H] = dim(board), D = st.dati;
      // in modalità manuale niente passi
      const box = D.comandi;
      if (box) [...box.children].slice(0, 4).forEach((b) => { b.style.display = S.mano ? "none" : ""; });
      const cs = M.ctrlDi(st, PASSO);
      if (cs) cs.style.display = S.mano ? "none" : "";
      const man = D.man;
      const firma = S.mano ? [S.regola, D.bpp.id, JSON.stringify(man.bins), man.sel, man.rif, M.scuro(), W, H].join("|")
        : [S.regola, D.bpp.id, S.k, M.scuro(), W, H].join("|");
      M.ridisegna(board, st, firma, (crea) => disegnaBpp(board, st, S, crea, C));
    },
    formula(p, st) {
      const S = bppStato(st), { I, E, LB, ott } = S, stretto = st.board && st.board.canvasWidth < 620;
      const lb = `\\mathrm{LB} = \\left\\lceil \\tfrac{${somma(I.w)}}{${I.c}} \\right\\rceil = ${LB}`;
      if (S.mano) return T(`\\text{contenitori usati} = ${S.usati} \\qquad ${lb}`, `\\text{bins used} = ${S.usati} \\qquad ${lb}`);
      const usati = E.bins.length;
      if (S.fine) return `${lb} \\;\\le\\; z(I) = ${ott} \\;\\le\\; ${MR}{UB} = ${usati}`;
      if (stretto) return T(`\\text{aperti} = ${usati} \\qquad ${lb}`, `\\text{open} = ${usati} \\qquad ${lb}`);
      return T(`\\text{passo } ${S.k}/${S.K}:\\quad \\text{contenitori aperti} = ${usati} \\qquad ${lb}`, `\\text{step } ${S.k}/${S.K}:\\quad \\text{open bins} = ${usati} \\qquad ${lb}`);
    },
    letture(p, st) {
      const S = bppStato(st), { I, E, LB, ott, regola, D } = S, C = M.COL(st), nome = BPP_FUNZ[regola].nome, w = I.w;
      const tab = (righe) => M.tab([T("risultato", "result"), T("contenitori", "bins")], righe, -1, C.a);
      if (S.mano) {
        const m = D.man, u = S.usati;
        let nota;
        if (m.msg) nota = M.tinta(C.rosso, m.msg);
        else if (S.fine) {
          const ff = D.bfin.ff, ffd = D.bfin.ffd;
          const esito = u < ffd ? T(`Hai battuto anche FFD (${ffd}).`, `You beat even FFD (${ffd}).`)
            : u < ff ? T(`Hai battuto First Fit (${ff}).`, `You beat First Fit (${ff}).`)
              : u === ott ? T("Hai trovato l'ottimo.", "You found the optimum.") : T("Non hai battuto First Fit: riprova.", "You did not beat First Fit: try again.");
          const opt = u === ott && u < ff ? T(" È anche l'ottimo.", " It is also the optimum.") : "";
          nota = T(`Hai sistemato tutto con ${M.tinta(C.a, u + " contenitori")}. ${esito}${opt}`, `You packed everything with ${M.tinta(C.a, u + " bins")}. ${esito}${opt}`);
        } else if (m.sel != null) nota = T(`Scelto l'oggetto ${m.sel + 1} (peso ${w[m.sel]}): clicca il contenitore in cui metterlo.`, `Item ${m.sel + 1} (weight ${w[m.sel]}) picked: click the bin where it goes.`);
        else nota = T("Clicca un oggetto grigio per sceglierlo, poi un contenitore. Clicca un oggetto già sistemato per toglierlo. Puoi usare al più i contenitori disegnati.",
          "Click a grey item to pick it, then a bin. Click an item already packed to take it out. You can use at most the bins drawn.");
        const righe = [
          [T("i tuoi contenitori", "your bins"), `\\(${u}\\)` + (S.fine ? "" : T(" (finora)", " (so far)"))],
          ...REGOLE.map((r) => [BPP_FUNZ[r].nome, S.fine ? `\\(${D.bfin[r]}\\)` : "?"]),
          [T("ottimo \\(z(I)\\)", "optimum \\(z(I)\\)"), S.fine ? `\\(${ott}\\)` : "?"],
          [`\\(\\mathrm{LB}\\)`, `\\(${LB}\\)`],
        ];
        return nota + tab(righe);
      }
      const k = S.k;
      let nota;
      if (k === 0) {
        nota = regola === "ffd"
          ? T(`${nome}: gli oggetti si guardano per peso decrescente: ${lista(E.ord.map((j) => j + 1))} (pareggi sull'indice più piccolo).`, `${nome}: items are examined by decreasing weight: ${lista(E.ord.map((j) => j + 1))} (ties on the smallest index).`)
          : T(`${nome}: gli oggetti si guardano nell'ordine dato, \\(w = (${lista(w)})\\), capacità \\(c = ${I.c}\\).`, `${nome}: items are examined in the given order, \\(w = (${lista(w)})\\), capacity \\(c = ${I.c}\\).`);
      } else {
        const j = E.cur, J = j + 1, b = E.b + 1, r = E.res;
        const ogg = T(`Oggetto ${J} (\\(w_{${J}} = ${w[j]}\\)): `, `Item ${J} (\\(w_{${J}} = ${w[j]}\\)): `);
        const resTxt = r.length ? T(`residui dei contenitori aperti \\((${lista(r)})\\)`, `residuals of the open bins \\((${lista(r)})\\)`) : T("nessun contenitore aperto", "no open bin");
        let perche;
        const apre = T(`non ci sta in nessun contenitore aperto: si apre il contenitore ${b}`, `it fits in no open bin: bin ${b} is opened`);
        if (regola === "nf") perche = E.nuovo ? (r.length ? T(`il contenitore corrente ${r.length} ha residuo ${r[r.length - 1]} < ${w[j]}: si chiude e si apre il contenitore ${b}`, `the current bin ${r.length} has residual ${r[r.length - 1]} < ${w[j]}: it is closed and bin ${b} is opened`) : T(`si apre il contenitore ${b}`, `bin ${b} is opened`))
          : T(`ci sta nel contenitore corrente ${b}`, `it fits in the current bin ${b}`);
        else if (regola === "bf") perche = E.nuovo ? apre
          : T(`ci sta in ${lista(E.cand.map((q) => `${q + 1} (resterebbe ${r[q] - w[j]})`))}: il più pieno dopo l'inserimento è il contenitore ${b}`, `it fits in ${lista(E.cand.map((q) => `${q + 1} (${r[q] - w[j]} would be left)`))}: the fullest after insertion is bin ${b}`);
        else if (regola === "wf") perche = E.nuovo ? apre
          : T(`ci sta in ${lista(E.cand.map((q) => `${q + 1} (residuo ${r[q]})`))}: il più vuoto è il contenitore ${b}`, `it fits in ${lista(E.cand.map((q) => `${q + 1} (residual ${r[q]})`))}: the emptiest is bin ${b}`);
        else perche = E.nuovo ? apre : T(`il primo contenitore in cui ci sta è il contenitore ${b}`, `the first bin where it fits is bin ${b}`);
        nota = `${ogg}${resTxt}; ${perche}.`;
        if (S.fine) nota += T(` Fine: ${M.tinta(C.a, E.bins.length + " contenitori")}, un upper bound (problema di minimo).`, ` End: ${M.tinta(C.a, E.bins.length + " bins")}, an upper bound (minimisation problem).`);
      }
      const righe = [
        [`\\(\\mathrm{LB} = \\lceil \\sum_j w_j / c \\rceil\\)`, `\\(${LB}\\)`],
        [T("ottimo \\(z(I)\\)", "optimum \\(z(I)\\)"), `\\(${ott}\\)`],
        [S.fine ? `${nome}` : T("contenitori aperti", "open bins"), `\\(${E.bins.length}\\)`],
        [T("rapporto \\(\\mathrm{UB}/z(I)\\)", "ratio \\(\\mathrm{UB}/z(I)\\)"), S.fine ? `\\(${GI.num(E.bins.length / ott, 2)}\\)` : "—"],
      ];
      return nota + tab(righe);
    },
    domanda: T("Sull'esempio 1 confronta NF, FF, BF e WF: su quale oggetto si separano? Poi passa a «Impacchetti tu» e prova a usare meno contenitori di First Fit; con FFD si arriva sempre al bound \\(\\mathrm{LB}\\)?",
      "On example 1 compare NF, FF, BF and WF: on which item do they part ways? Then switch to «You pack» and try to use fewer bins than First Fit; does FFD always reach the bound \\(\\mathrm{LB}\\)?"),
  };

  // =================================================================
  // 2. LIST SCHEDULING E LPT (P||Cmax)
  // =================================================================
  const CMAX_ES = [{ t: [5, 5, 4, 4, 3, 3, 3], m: 3 }, { t: [9, 8, 7, 3, 4, 3, 9], m: 3 }];
  const CMAX_FUNZ = {
    ls: { etichetta: "List scheduling", nome: "List scheduling" },
    lpt: { etichetta: "LPT", nome: "LPT" },
  };
  function cmaxTraccia(t, m, regola) {
    const ord = regola === "lpt" ? decrescente(t) : t.map((_, j) => j);
    const L = new Array(m).fill(0), ass = Array.from({ length: m }, () => []);
    const tr = [{ L: L.slice(), ass: ass.map((a) => a.slice()), cur: null, ord, fatti: 0 }];
    ord.forEach((j, i) => {
      let q = 0;
      for (let r = 1; r < m; r++) if (L[r] < L[q]) q = r;
      const prima = L.slice();
      ass[q].push([j, L[q]]);
      L[q] += t[j];
      tr.push({ L: L.slice(), prima, ass: ass.map((a) => a.slice()), cur: j, m: q, ord, fatti: i + 1 });
    });
    tr[tr.length - 1].fine = true;
    return tr;
  }
  const cmaxLB = (t, m) => Math.max(Math.max(...t), Math.ceil(somma(t) / m));
  /** makespan minimo, per enumerazione con tagli (n <= 12, m <= 4) */
  function cmaxOttimo(t, m) {
    const ord = decrescente(t), n = t.length, L = new Array(m).fill(0);
    const lpt = cmaxTraccia(t, m, "lpt");
    let best = Math.max(...lpt[lpt.length - 1].L);
    const LB = cmaxLB(t, m);
    const dfs = (i, mx) => {
      if (mx >= best || best === LB) return;
      if (i === n) { best = mx; return; }
      const x = t[ord[i]], visti = new Set();
      for (let q = 0; q < m; q++) {
        if (visti.has(L[q]) || L[q] + x >= best) continue;
        visti.add(L[q]);
        L[q] += x; dfs(i + 1, Math.max(mx, L[q])); L[q] -= x;
      }
    };
    dfs(0, 0);
    return best;
  }
  function cmaxCasuale() {
    const n = M.casuale(6, 9), m = M.casuale(2, 3), t = [];
    for (let j = 0; j < n; j++) t.push(M.casuale(2, 9));
    return { t, m, id: nuovoId() };
  }
  function cmaxStato(st) {
    const D = st.dati, regola = st.chiave();
    if (!D.cmax) D.cmax = Object.assign({ id: nuovoId() }, CMAX_ES[0], { t: CMAX_ES[0].t.slice() });
    const I = D.cmax;
    if (D.cFirma !== I.id) {
      D.cFirma = I.id;
      D.ctr = { ls: cmaxTraccia(I.t, I.m, "ls"), lpt: cmaxTraccia(I.t, I.m, "lpt") };
      D.cott = cmaxOttimo(I.t, I.m);
      D.cLB = cmaxLB(I.t, I.m);
      D.cfin = {};
      for (const r of ["ls", "lpt"]) D.cfin[r] = Math.max(...D.ctr[r][D.ctr[r].length - 1].L);
    }
    const tr = D.ctr[regola], K = tr.length - 1, k = M.passoK(st, K, PASSO);
    return { D, I, regola, tr, K, k, E: tr[k], ott: D.cott, LB: D.cLB };
  }

  function disegnaCmax(board, st, S, crea, C) {
    const { I, E, LB, ott, D } = S, t = I.t, m = I.m;
    const [W, H] = dim(board), stretto = W < 620;
    const fin = Math.max(D.cfin.ls, D.cfin.lpt, LB);
    const Xmax = fin * 1.12 + 1.2;
    const sx = stretto ? 34 : 92, ux = (W - sx - 10) / Xmax;
    const x0 = -sx / ux, y1 = m + 1.3, y0 = -0.8;
    board.setBoundingBox([x0, y1, Xmax, y0], false);
    const uy = H / (y1 - y0), fs = clamp(uy * 0.3, 10, 16), hb = 0.33;
    const Lmax = Math.max(...E.L);
    for (let q = 0; q < m; q++) {
      const y = m - q - 0.5;
      M.scritta(crea, -8 / ux, y, (stretto ? "M" : T("macchina ", "machine ")) + (q + 1), { anchorX: "right", fontSize: fs, strokeColor: q === E.m && E.cur != null ? C.a : C.muted, cssStyle: "font-weight:600" });
      M.linea(crea, 0, y - hb - 0.08, Xmax, y - hb - 0.08, { strokeColor: C.line, strokeWidth: 1 });
      for (const [j, s0] of E.ass[q]) {
        const cur = j === E.cur;
        M.rett(crea, s0, y - hb, s0 + t[j], y + hb, { strokeColor: cur ? C.a : C.b, fillColor: cur ? C.a : C.b, fillOpacity: cur ? 0.75 : 0.42, strokeWidth: 1.5 });
        if (t[j] * ux > 2.6 * fs) M.scritta(crea, s0 + t[j] / 2, y, `${j + 1}: ${t[j]}`, { fontSize: fs, strokeColor: C.testo });
        else if (t[j] * ux > fs) M.scritta(crea, s0 + t[j] / 2, y, String(t[j]), { fontSize: fs, strokeColor: C.testo });
      }
      M.scritta(crea, E.L[q] + 6 / ux, y, `L${q + 1} = ${E.L[q]}`, { anchorX: "left", fontSize: fs * 0.9, strokeColor: E.L[q] === Lmax && Lmax > 0 ? C.d : C.muted });
    }
    const passo = Xmax > 40 ? 10 : Xmax > 20 ? 5 : Xmax > 10 ? 2 : 1;
    M.linea(crea, 0, 0, Xmax, 0, { strokeColor: C.muted, strokeWidth: 1.2 });
    for (let x = 0; x <= Xmax - 0.5; x += passo) {
      M.linea(crea, x, 0, x, -0.1, { strokeColor: C.muted });
      M.scritta(crea, x, -0.38, String(x), { fontSize: fs * 0.82, strokeColor: C.muted });
    }
    const verticali = [[LB, C.verde, "LB"]];
    if (Lmax > 0) verticali.push([Lmax, C.d, S.fine ? "UB" : "Cmax"]);
    if (S.fine) verticali.push([ott, C.blu, "z(I)"]);
    const gruppi = new Map();
    for (const [x, c, nm] of verticali) { const key = x.toFixed(6); if (!gruppi.has(key)) gruppi.set(key, { x, c, nomi: [] }); gruppi.get(key).nomi.push(nm); }
    [...gruppi.values()].sort((a, b) => a.x - b.x).forEach((g, i) => {
      M.linea(crea, g.x, 0, g.x, m + 0.15, { strokeColor: g.c, strokeWidth: 2.2, dash: 2 });
      M.scritta(crea, g.x, m + 0.38 + (i % 2) * 0.45, `${g.nomi.join(" = ")} = ${g.x}`, { fontSize: fs * 0.9, strokeColor: g.c, cssStyle: "font-weight:600" });
    });
  }

  window.GI_RICETTE["oc-scheduling"] = {
    titolo: T("List scheduling e LPT", "List scheduling and LPT"),
    funzioni: CMAX_FUNZ,
    etichettaFunzioni: T("Regola: lavori nell'ordine dato, oppure per durata decrescente (LPT)", "Rule: jobs in the given order, or by decreasing duration (LPT)"),
    parametri: [parPasso(DESCR_PASSO)],
    assi: false,
    opzioniBoard: M.OPZ,
    vista: [-1, 10, 20, -2],
    legenda: (st) => {
      const C = M.COL(st);
      return [
        [C.b, T("lavori assegnati", "assigned jobs"), "pieno"],
        [C.a, T("lavoro corrente", "current job"), "pieno"],
        [C.verde, T("\\(\\mathrm{LB} = \\max\\{\\max_j t_j,\\ \\lceil \\sum_j t_j / m \\rceil\\}\\)", "\\(\\mathrm{LB} = \\max\\{\\max_j t_j,\\ \\lceil \\sum_j t_j / m \\rceil\\}\\)"), "dashed"],
        [C.d, T("makespan corrente", "current makespan"), "dashed"],
        [C.blu, T("ottimo \\(z(I)\\)", "optimum \\(z(I)\\)"), "dashed"],
      ];
    },
    monta(board, st) {
      const D = st.dati;
      nuovaVoce(st);
      const i0 = M.inputDi(st, PASSO);
      if (i0 && +i0.value === 0) i0.value = 1;
      const nuova = (I) => { D.cmax = Object.assign(I, { id: nuovoId() }); vaiA(st, 1); st.aggiorna(); };
      M.comandi(st, [
        [T("Esempio 1", "Example 1"), T("istanza del corso: t = (5, 5, 4, 4, 3, 3, 3), m = 3", "course instance: t = (5, 5, 4, 4, 3, 3, 3), m = 3"), () => nuova({ t: CMAX_ES[0].t.slice(), m: CMAX_ES[0].m })],
        [T("Esempio 2", "Example 2"), T("qui LPT batte il List scheduling: t = (9, 8, 7, 3, 4, 3, 9), m = 3", "here LPT beats list scheduling: t = (9, 8, 7, 3, 4, 3, 9), m = 3"), () => nuova({ t: CMAX_ES[1].t.slice(), m: CMAX_ES[1].m })],
        [T("Casuale", "Random"), T("dati casuali", "random data"), () => nuova(cmaxCasuale())],
        [T("Modifica…", "Edit…"), T("scrivi le durate e le macchine", "type the durations and the machines"), () => {
          const s = chiedi(T("Durate e numero di macchine, separati da «;» (fra 2 e 12 lavori, m da 2 a 4), per esempio: 5 5 4 4 3 3 3 ; 3",
            "Durations and number of machines separated by «;» (2 to 12 jobs, m from 2 to 4), for example: 5 5 4 4 3 3 3 ; 3"), D.cmax.t.join(" ") + " ; " + D.cmax.m);
          if (!s) return;
          const [a, b] = s.split(";"), t = interi(a || ""), mm = interi(b || "");
          if (!t || !mm || mm.length !== 1 || t.length < 2 || t.length > 12 || mm[0] < 2 || mm[0] > 4 || Math.max(...t) > 40) { window.alert(T("Dati non validi.", "Invalid data.")); return; }
          nuova({ t, m: mm[0] });
        }],
      ], { k: PASSO });
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const S = cmaxStato(st), C = M.COL(st), [W, H] = dim(board);
      M.ridisegna(board, st, [S.regola, S.I.id, S.k, M.scuro(), W, H].join("|"), (crea) => disegnaCmax(board, st, S, crea, C));
    },
    formula(p, st) {
      const S = cmaxStato(st), { I, E, K, k, LB, ott } = S, stretto = st.board && st.board.canvasWidth < 620;
      const lb = `\\mathrm{LB} = \\max\\big\\{${Math.max(...I.t)},\\ \\lceil ${somma(I.t)}/${I.m} \\rceil\\big\\} = ${LB}`;
      const cm = Math.max(...E.L);
      if (E.fine) return `${lb} \\;\\le\\; z(I) = ${ott} \\;\\le\\; ${MR}{UB} = ${cm}`;
      if (stretto) return `\\max_q L_q = ${cm} \\qquad \\mathrm{LB} = ${LB}`;
      return T(`\\text{passo } ${k}/${K}:\\quad \\max_q L_q = ${cm} \\qquad ${lb}`, `\\text{step } ${k}/${K}:\\quad \\max_q L_q = ${cm} \\qquad ${lb}`);
    },
    letture(p, st) {
      const S = cmaxStato(st), { I, E, k, LB, ott, regola, D } = S, C = M.COL(st), nome = CMAX_FUNZ[regola].nome, t = I.t;
      const Ltex = (L) => `(${lista(L)})`;
      let nota;
      if (k === 0) {
        nota = regola === "lpt"
          ? T(`LPT: i lavori si guardano per durata decrescente: ${lista(E.ord.map((j) => j + 1))} (pareggi sull'indice più piccolo); ognuno va sulla macchina meno carica.`, `LPT: jobs are examined by decreasing duration: ${lista(E.ord.map((j) => j + 1))} (ties on the smallest index); each goes to the least loaded machine.`)
          : T(`List scheduling: i lavori nell'ordine dato, \\(t = (${lista(t)})\\), su \\(m = ${I.m}\\) macchine; ognuno va sulla macchina meno carica.`, `List scheduling: jobs in the given order, \\(t = (${lista(t)})\\), on \\(m = ${I.m}\\) machines; each goes to the least loaded machine.`);
      } else {
        const j = E.cur, J = j + 1, q = E.m + 1;
        nota = T(`Lavoro ${J} (\\(t_{${J}} = ${t[j]}\\)): carichi \\(L = ${Ltex(E.prima)}\\); il minimo è la macchina ${q}, che passa a \\(${E.prima[E.m]} + ${t[j]} = ${E.L[E.m]}\\).`,
          `Job ${J} (\\(t_{${J}} = ${t[j]}\\)): loads \\(L = ${Ltex(E.prima)}\\); the minimum is machine ${q}, which goes to \\(${E.prima[E.m]} + ${t[j]} = ${E.L[E.m]}\\).`);
        if (E.fine) nota += T(` Fine: makespan ${M.tinta(C.a, String(Math.max(...E.L)))}, un upper bound.`, ` End: makespan ${M.tinta(C.a, String(Math.max(...E.L)))}, an upper bound.`);
      }
      const coda = E.ord.slice(E.fatti).map((j) => `${j + 1} (${t[j]})`);
      if (coda.length) nota += `<br>${T("Da assegnare, nell'ordine", "Still to assign, in order")}: ${lista(coda)}.`;
      const cm = Math.max(...E.L), m = I.m;
      const garanzia = regola === "lpt" ? { q: M.Q(4 * m - 1, 3 * m), tex: `\\tfrac{4}{3} - \\tfrac{1}{3m}` } : { q: M.Q(2 * m - 1, m), tex: `2 - \\tfrac{1}{m}` };
      const righe = [
        [`\\(\\mathrm{LB} = \\max\\{\\max_j t_j,\\ \\lceil \\sum_j t_j/m \\rceil\\}\\)`, `\\(${LB}\\)`],
        [T("ottimo \\(z(I)\\)", "optimum \\(z(I)\\)"), `\\(${ott}\\)`],
        [E.fine ? nome : T("makespan corrente", "current makespan"), `\\(${cm}\\)`],
        [T("rapporto \\(\\mathrm{UB}/z(I)\\)", "ratio \\(\\mathrm{UB}/z(I)\\)"), E.fine ? `\\(${GI.num(cm / ott, 2)}\\)` : "—"],
        [T(`garanzia \\(${garanzia.tex} = ${GI.num(M.Qv(garanzia.q), 2)}\\)`, `guarantee \\(${garanzia.tex} = ${GI.num(M.Qv(garanzia.q), 2)}\\)`), E.fine ? (cm / ott <= M.Qv(garanzia.q) + 1e-9 ? "✓" : "✗") : "—"],
      ];
      return nota + M.tab([T("risultato", "result"), T("valore", "value")], righe, -1, C.a);
    },
    domanda: T("Con l'istanza del corso LS e LPT danno lo stesso makespan: dov'è lo spreco rispetto a \\(\\mathrm{LB}\\)? Nell'esempio 2 confronta le due regole e spiega perché conviene mettere per ultimi i lavori corti.",
      "On the course instance LS and LPT give the same makespan: where is the waste with respect to \\(\\mathrm{LB}\\)? On example 2 compare the two rules and explain why the short jobs should come last."),
  };

  // =================================================================
  // 3. TSP: NEAREST NEIGHBOUR E 2-OPT
  // =================================================================
  const LATO = 10;
  // istanza di riferimento: 5 città, matrice simmetrica; ottimo (1,3,5,2,4) = 18; NN da 1 = 25
  const REF_D = [[0, 5, 2, 2, 9], [5, 0, 4, 3, 4], [2, 4, 0, 4, 7], [2, 3, 4, 0, 7], [9, 4, 7, 7, 0]];
  const REF_P = [1, 3, 5, 2, 4].map((c, i) => [c - 1, 90 + 72 * i]).sort((a, b) => a[0] - b[0])
    .map(([, ang]) => [5 + 4 * Math.cos(ang * Math.PI / 180), 5 + 4 * Math.sin(ang * Math.PI / 180)]);
  const PIANO_ES = [[4, 10], [0, 1], [10, 9], [9, 5], [3, 0], [5, 5], [0, 9]];
  const distF = (D) => (i, j) => D.mat ? D.mat[i][j] : Math.hypot(D.P[i][0] - D.P[j][0], D.P[i][1] - D.P[j][1]);
  const lunghezza = (d, t) => t.reduce((s, c, i) => s + d(c, t[(i + 1) % t.length]), 0);
  function puntoLibero(P) {
    for (let tent = 0; tent < 400; tent++) {
      const q = [M.casuale(0, LATO), M.casuale(0, LATO)];
      const minimo = tent < 300 ? 2.5 : 1.2;
      if (P.every((r) => Math.hypot(q[0] - r[0], q[1] - r[1]) >= minimo)) return q;
    }
    return [M.casuale(0, LATO), M.casuale(0, LATO)];
  }
  function tspCasuale(n) { const P = []; while (P.length < n) P.push(puntoLibero(P)); return P; }
  function vicinoPiuVicino(d, n, s) {
    const path = [s], passi = [{ fase: "inizio", path: [s], len: 0 }];
    let len = 0;
    while (path.length < n) {
      const c = path[path.length - 1], cand = [];
      for (let j = 0; j < n; j++) if (!path.includes(j)) cand.push(j);
      let a = cand[0];
      for (const j of cand) if (d(c, j) < d(c, a) - 1e-12) a = j;
      len += d(c, a);
      path.push(a);
      passi.push({ fase: "nn", path: path.slice(), da: c, a, cand, len });
    }
    const ult = path[n - 1];
    len += d(ult, s);
    passi.push({ fase: "ritorno", path: path.slice(), chiuso: true, da: ult, a: s, len });
    return { tour: path, len, passi };
  }
  function dueOpt(d, n, tour0, passi) {
    let t = tour0.slice(), len = lunghezza(d, t);
    for (let giri = 0; giri < 40; giri++) {
      let best = null;
      for (let i = 0; i < n - 1; i++) for (let j = i + 2; j < n; j++) {
        if (i === 0 && j === n - 1) continue;
        const a = t[i], b = t[i + 1], c = t[j], e = t[(j + 1) % n];
        const delta = d(a, c) + d(b, e) - d(a, b) - d(c, e);
        if (delta < -1e-9 && (!best || delta < best.delta - 1e-12)) best = { i, j, a, b, c, e, delta };
      }
      if (!best) break;
      t = t.slice(0, best.i + 1).concat(t.slice(best.i + 1, best.j + 1).reverse(), t.slice(best.j + 1));
      len = lunghezza(d, t);
      passi.push({ fase: "2opt", tour: t.slice(), chiuso: true, rimossi: [[best.a, best.b], [best.c, best.e]], aggiunti: [[best.a, best.c], [best.b, best.e]], delta: best.delta, len });
    }
    passi.push({ fase: "fine2opt", tour: t.slice(), chiuso: true, len });
    return { tour: t, len };
  }
  /** Held-Karp: giro ottimo (n <= 10), partendo dalla città 0 */
  function heldKarp(d, n) {
    const N = 1 << n, INF = Infinity;
    const dp = Array.from({ length: N }, () => new Float64Array(n).fill(INF));
    const pr = Array.from({ length: N }, () => new Int8Array(n).fill(-1));
    dp[1][0] = 0;
    for (let S = 1; S < N; S += 2) for (let j = 0; j < n; j++) {
      if (!(S & (1 << j)) || dp[S][j] === INF) continue;
      for (let q = 1; q < n; q++) {
        if (S & (1 << q)) continue;
        const T2 = S | (1 << q), v = dp[S][j] + d(j, q);
        if (v < dp[T2][q] - 1e-12) { dp[T2][q] = v; pr[T2][q] = j; }
      }
    }
    let best = INF, last = 0;
    for (let j = 1; j < n; j++) { const v = dp[N - 1][j] + d(j, 0); if (v < best - 1e-12) { best = v; last = j; } }
    const tour = [];
    let S = N - 1, j = last;
    while (j >= 0 && j !== 0) { tour.push(j); const pj = pr[S][j]; S ^= 1 << j; j = pj; }
    tour.push(0);
    return { tour: tour.reverse(), len: n > 1 ? best : 0 };
  }
  function tspCalcola(d, n, s, con2opt) {
    const nn = vicinoPiuVicino(d, n, s), passi = nn.passi.slice();
    const opt2 = con2opt ? dueOpt(d, n, nn.tour, passi) : null;
    const ott = heldKarp(d, n);
    const tutte = Array.from({ length: n }, (_, q) => vicinoPiuVicino(d, n, q).len);
    return { nn, opt2, ott, passi, tutte };
  }

  /** le città della board corrente: una per punto di D.P; trascinabili solo nel piano */
  function cittaSullaBoard(board, st) {
    const D = st.dati, C = M.COL(st);
    // etichetta della città verso l'esterno (lontano dal baricentro): non cade sui lati del giro
    const fuori = (i) => {
      const cx = D.P.reduce((a, q) => a + q[0], 0) / D.P.length, cy = D.P.reduce((a, q) => a + q[1], 0) / D.P.length;
      const dx = D.P[i][0] - cx, dy = D.P[i][1] - cy, n = Math.hypot(dx, dy) || 1;
      return [Math.round(16 * dx / n) - 4, Math.round(16 * dy / n) - 2];
    };
    if (D.ptsBoard === board && D.pts.length === D.P.length) {
      D.pts.forEach((pt, i) => { if (Math.abs(pt.X() - D.P[i][0]) > 1e-9 || Math.abs(pt.Y() - D.P[i][1]) > 1e-9) pt.moveTo(D.P[i]); pt.setAttribute({ fixed: !!D.mat }); if (pt.label) pt.label.setAttribute({ offset: fuori(i) }); });
      return;
    }
    if (D.ptsBoard === board) for (const o of D.pts) { try { board.removeObject(o); } catch (e) { /* già tolto */ } }
    D.ptsBoard = board;
    D.pts = D.P.map((q, i) => {
      const pt = board.create("point", q.slice(), {
        name: String(i + 1), size: 7, snapToGrid: !D.mat, snapSizeX: 1, snapSizeY: 1, showInfobox: false, fixed: !!D.mat,
        fillColor: C.grigio, strokeColor: C.muted, strokeWidth: 2, highlightFillColor: C.a, highlightStrokeColor: C.a,
        label: { offset: fuori(i), fontSize: 15, cssStyle: "font-weight:700" },
      });
      pt.on("drag", () => {
        if (D.mat) return;
        const X = clamp(Math.round(pt.X()), 0, LATO), Y = clamp(Math.round(pt.Y()), 0, LATO);
        if (X !== pt.X() || Y !== pt.Y()) pt.moveTo([X, Y]);
        if (D.P[i][0] !== X || D.P[i][1] !== Y) {
          D.P[i] = [X, Y];
          D.pts.forEach((o, j) => o.label && o.label.setAttribute({ offset: fuori(j) }));
          st.aggiorna();
        }
      });
      return pt;
    });
  }
  const TSP_FUNZ = {
    nn: { etichetta: "<span title=\"nearest neighbour\">NN</span>" },
    nn2: { etichetta: "<span title=\"nearest neighbour + 2-opt\">NN + 2-opt</span>" },
  };

  window.GI_RICETTE["oc-tsp"] = {
    titolo: T("TSP: nearest neighbour e 2-opt", "TSP: nearest neighbour and 2-opt"),
    funzioni: TSP_FUNZ,
    etichettaFunzioni: T("Euristica: nearest neighbour (NN), da sola o seguita dal 2-opt", "Heuristic: nearest neighbour (NN), alone or followed by 2-opt"),
    parametri: [
      { k: "s", min: 1, max: 7, step: 1, val: 1, colore: "c", cifre: 0, descr: T("città di partenza", "starting city") },
      parPasso(DESCR_PASSO),
    ],
    assi: false,
    stessaScala: true,
    opzioniBoard: M.OPZ,
    vista: [-1, LATO + 1, LATO + 1, -1],
    legenda: (st) => {
      const C = M.COL(st), due = st.chiave() === "nn2";
      return [
        [C.a, T("giro dell'euristica", "heuristic tour"), ""],
        [C.grigio, due ? T("distanze esaminate, archi tolti", "distances examined, edges removed") : T("distanze esaminate", "distances examined"), "dashed"],
        ...(due ? [[C.viola, T("archi della mossa 2-opt", "edges of the 2-opt move"), ""]] : []),
        [C.blu, T("giro ottimo", "optimal tour"), "pieno"],
      ];
    },
    monta(board, st) {
      const D = st.dati;
      nuovaVoce(st);
      if (!D.P) { D.P = REF_P.map((q) => q.slice()); D.mat = REF_D; }
      D.ptsBoard = null; D.calc = null; D.dim = null;
      const carica = (P, mat) => { D.P = P; D.mat = mat; D.calc = null; vaiA(st, 1); const s = M.inputDi(st, "s"); if (s) s.value = 1; st.aggiorna(); };
      M.comandi(st, [
        [T("Istanza del corso", "Course instance"), T("le cinque città del corso, con la matrice delle distanze (ottimo 18)", "the five cities of the course, with the distance matrix (optimum 18)"), () => carica(REF_P.map((q) => q.slice()), REF_D)],
        [T("Esempio nel piano", "Plane example"), T("sette città nel piano: trascinale", "seven cities in the plane: drag them"), () => carica(PIANO_ES.map((q) => q.slice()), null)],
        [T("Casuale", "Random"), T("città in posizioni casuali nel piano", "cities at random positions in the plane"), () => carica(tspCasuale(D.mat ? 7 : D.P.length), null)],
        [T("+ città", "+ city"), T("aggiungi una città nel piano (al più 9)", "add a city in the plane (at most 9)"), () => {
          if (D.mat) { carica(PIANO_ES.slice(0, 6).map((q) => q.slice()), null); return; }
          if (D.P.length < 9) { D.P.push(puntoLibero(D.P)); D.calc = null; vaiA(st, 1); st.aggiorna(); }
        }],
        [T("− città", "− city"), T("togli l'ultima città (almeno 5)", "remove the last city (at least 5)"), () => {
          if (D.mat) { carica(PIANO_ES.slice(0, 5).map((q) => q.slice()), null); return; }
          if (D.P.length > 5) { D.P = D.P.slice(0, -1); D.calc = null; vaiA(st, 1); st.aggiorna(); }
        }],
      ], { k: PASSO });
      osservaDimensioni(board, st);
      daIndirizzo(st);
    },
    aggiorna(board, st) {
      const D = st.dati, C = M.COL(st), n = D.P.length, d = distF(D);
      M.intervallo(st, "s", 1, n);
      const s = M.intero(st, "s") - 1, due = st.chiave() === "nn2";
      const firmaDati = [D.P.map((q) => q.map((x) => x.toFixed(3)).join(",")).join(";"), D.mat ? "m" : "p", s, due].join("|");
      if (!D.calc || D.calcFirma !== firmaDati) { D.calc = tspCalcola(d, n, s, due); D.calcFirma = firmaDati; }
      cittaSullaBoard(board, st);
      const [W, H] = dim(board);
      if (D.dim !== W + "x" + H) { D.dim = W + "x" + H; M.adatta(board, -0.8, LATO + 0.9, LATO + 0.8, -0.8); }
      const R = D.calc, K = R.passi.length - 1, k = M.passoK(st, K, PASSO), E = R.passi[k], P = D.P;
      const visitate = new Set(E.path || E.tour || []);
      D.pts.forEach((pt, i) => {
        const att = i === s ? { fillColor: C.a, strokeColor: C.a, face: "[]", size: 8 }
          : visitate.has(i) ? { fillColor: C.a, strokeColor: C.a, face: "o", size: 6 }
            : { fillColor: M.scuro() ? "#1b2636" : "#ffffff", strokeColor: C.muted, face: "o", size: 6 };
        pt.setAttribute(att);
      });
      M.ridisegna(board, st, [firmaDati, k, M.scuro(), W, H].join("|"), (crea) => {
        const seg = (i, j, attr) => M.linea(crea, P[i][0], P[i][1], P[j][0], P[j][1], attr);
        const eti = (i, j, col) => {
          if (!D.mat) return;
          M.scritta(crea, (P[i][0] + P[j][0]) / 2, (P[i][1] + P[j][1]) / 2, String(d(i, j)), { fontSize: 15, strokeColor: col, layer: 10, cssStyle: "font-weight:800;background:" + (M.scuro() ? "#0f1722" : "#fff") + ";padding:0 3px;border-radius:3px" });
        };
        const o = R.ott.tour;
        o.forEach((c, i) => seg(c, o[(i + 1) % o.length], { strokeColor: C.blu, strokeWidth: 11, strokeOpacity: M.scuro() ? 0.38 : 0.22, lineCap: "round" }));
        if (E.fase === "inizio" || E.fase === "nn" || E.fase === "ritorno") {
          if (E.fase === "nn") for (const j of E.cand) if (j !== E.a) { seg(E.da, j, { strokeColor: C.grigio, strokeWidth: 1.6, dash: 2 }); eti(E.da, j, C.muted); }
          const t = E.path;
          for (let i = 0; i + 1 < t.length; i++) seg(t[i], t[i + 1], { strokeColor: C.a, strokeWidth: 3.5 });
          if (E.chiuso) seg(t[t.length - 1], t[0], { strokeColor: C.a, strokeWidth: 3.5 });
          if (E.fase !== "inizio") { seg(E.da, E.a, { strokeColor: C.a, strokeWidth: 6.5 }); eti(E.da, E.a, C.testo); }
        } else {
          const t = E.tour;
          t.forEach((c, i) => seg(c, t[(i + 1) % t.length], { strokeColor: C.a, strokeWidth: 3.5 }));
          if (E.fase === "2opt") {
            for (const [a, b] of E.rimossi) { seg(a, b, { strokeColor: C.grigio, strokeWidth: 2.5, dash: 2 }); eti(a, b, C.muted); }
            for (const [a, b] of E.aggiunti) { seg(a, b, { strokeColor: C.viola, strokeWidth: 6 }); eti(a, b, C.testo); }
          }
        }
      });
    },
    formula(p, st) {
      const D = st.dati, R = D.calc;
      if (!R) return "";
      const d = distF(D), K = R.passi.length - 1, k = M.passoK(st, K, PASSO), E = R.passi[k], nf = (x) => GI.num(x, D.mat ? 0 : 2);
      if (E.fase === "inizio") return T(`\\text{partenza: città } ${E.path[0] + 1}`, `\\text{start: city } ${E.path[0] + 1}`);
      const stretto = st.board && st.board.canvasWidth < 620;
      if (E.fase === "nn" && stretto) return `d_{${E.da + 1}${E.a + 1}} = ${nf(d(E.da, E.a))} = \\min_j d_{${E.da + 1}j}`;
      if (E.fase === "nn") {
        return T(`\\min_{j\\ \\text{non visitata}} d_{${E.da + 1}j} = d_{${E.da + 1}${E.a + 1}} = ${nf(d(E.da, E.a))} \\qquad \\text{lunghezza parziale} = ${nf(E.len)}`,
          `\\min_{j\\ \\text{unvisited}} d_{${E.da + 1}j} = d_{${E.da + 1}${E.a + 1}} = ${nf(d(E.da, E.a))} \\qquad \\text{partial length} = ${nf(E.len)}`);
      }
      const gap = (E.len - R.ott.len) / R.ott.len;
      return `${MR}{UB} = ${nf(E.len)} \\;\\ge\\; z(I) = ${nf(R.ott.len)}` + (stretto ? "" : ` \\qquad \\text{gap} = ${pct(gap)}`);
    },
    letture(p, st) {
      const D = st.dati, R = D.calc;
      if (!R) return "";
      const d = distF(D), K = R.passi.length - 1, k = M.passoK(st, K, PASSO), E = R.passi[k], C = M.COL(st), nf = (x) => GI.num(x, D.mat ? 0 : 2);
      const s = R.nn.tour[0] + 1, giro = (t) => t.concat([t[0]]).map((c) => c + 1).join(" → ");
      let nota;
      if (E.fase === "inizio") nota = T(`Si parte dalla città ${s}: a ogni passo si va alla più vicina fra quelle non ancora visitate (pareggi sull'indice più piccolo).`, `Start from city ${s}: at each step go to the nearest city not yet visited (ties on the smallest index).`);
      else if (E.fase === "nn") {
        const elenco = E.cand.map((j) => { const t = `${j + 1}: \\(${nf(d(E.da, j))}\\)`; return j === E.a ? M.tinta(C.a, t) : t; }).join("; ");
        nota = T(`Dalla città ${E.da + 1}, distanze dalle non visitate: ${elenco}. La minima porta alla città ${E.a + 1}.`,
          `From city ${E.da + 1}, distances to the unvisited ones: ${elenco}. The smallest leads to city ${E.a + 1}.`);
      } else if (E.fase === "ritorno") {
        nota = T(`Visitate tutte le città: si torna da ${E.da + 1} alla partenza ${s} (\\(${nf(d(E.da, E.a))}\\)). Giro ${giro(E.path)}, lungo \\(${nf(E.len)}\\): un ${M.tinta(C.a, "upper bound")}.`,
          `All cities visited: go back from ${E.da + 1} to the start ${s} (\\(${nf(d(E.da, E.a))}\\)). Tour ${giro(E.path)}, length \\(${nf(E.len)}\\): an ${M.tinta(C.a, "upper bound")}.`);
      } else if (E.fase === "2opt") {
        const ar = ([a, b]) => `(${a + 1}, ${b + 1})`;
        nota = T(`Mossa 2-opt: si tolgono gli archi ${E.rimossi.map(ar).join(" e ")}, si mettono ${M.tinta(C.viola, E.aggiunti.map(ar).join(" e "))}; il giro si accorcia di \\(${nf(-E.delta)}\\), ora è ${giro(E.tour)}.`,
          `2-opt move: remove edges ${E.rimossi.map(ar).join(" and ")}, add ${M.tinta(C.viola, E.aggiunti.map(ar).join(" and "))}; the tour gets shorter by \\(${nf(-E.delta)}\\), now it is ${giro(E.tour)}.`);
      } else {
        nota = T(`Nessuna mossa 2-opt accorcia il giro ${giro(E.tour)}: è un ottimo locale, lungo \\(${nf(E.len)}\\).`,
          `No 2-opt move shortens the tour ${giro(E.tour)}: it is a local optimum, of length \\(${nf(E.len)}\\).`);
      }
      const nnFatto = k >= R.nn.passi.length - 1, fine = k === K;
      const righe = [[T(`nearest neighbour da ${s}`, `nearest neighbour from ${s}`), nnFatto ? `\\(${nf(R.nn.len)}\\)` : "—", nnFatto ? `\\(${pct((R.nn.len - R.ott.len) / R.ott.len)}\\)` : "—"]];
      if (R.opt2) righe.push([T("dopo 2-opt", "after 2-opt"), fine ? `\\(${nf(R.opt2.len)}\\)` : "—", fine ? `\\(${pct((R.opt2.len - R.ott.len) / R.ott.len)}\\)` : "—"]);
      righe.push([T(`giro ottimo \\(z(I)\\), ${giro(R.ott.tour)}`, `optimal tour \\(z(I)\\), ${giro(R.ott.tour)}`), `\\(${nf(R.ott.len)}\\)`, "\\(0\\)"]);
      const mi = Math.min(...R.tutte), ma = Math.max(...R.tutte), da = R.tutte.indexOf(mi) + 1;
      const multi = T(`Da tutte le ${R.tutte.length} partenze il nearest neighbour va da \\(${nf(mi)}\\) (città ${da}) a \\(${nf(ma)}\\).`,
        `Over all ${R.tutte.length} starting cities nearest neighbour ranges from \\(${nf(mi)}\\) (city ${da}) to \\(${nf(ma)}\\).`);
      return nota + M.tab(["", T("lunghezza", "length"), "gap"], righe, -1, C.a) + `<div style="margin-top:.3em">${multi}</div>`;
    },
    domanda: T("Sull'istanza del corso, da quali partenze il nearest neighbour trova l'ottimo? Con NN + 2-opt il giro migliora sempre fino all'ottimo? Poi passa al piano e trascina una città: di solito è l'ultimo arco, il ritorno, a costare caro.",
      "On the course instance, from which starting cities does nearest neighbour find the optimum? Does NN + 2-opt always improve the tour up to the optimum? Then switch to the plane and drag a city: usually it is the last edge, the way back, that costs a lot."),
  };

  window.GI_OC_B = { bppTraccia, bppOttimo, bppFinale, cmaxTraccia, cmaxOttimo, cmaxLB, vicinoPiuVicino, dueOpt, heldKarp, tspCalcola, REF_D };
})();
