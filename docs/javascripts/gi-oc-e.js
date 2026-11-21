/* Laboratorio di «Problemi di ottimizzazione combinatoria / Combinatorial Optimization Problems»: colorazione esatta
 * (Wagner-Whitin è passato al modulo Programmazione dinamica, 2026-11-21).
 *
 *   oc-dsatur-bb      colorazione dei vertici: il branch-and-bound DSATUR del capitolo «Vertex coloring: the DSATUR
 *                     branch-and-bound», nodo per nodo, con la stessa numerazione della tabella del capitolo
 *                     (riferimento: DSATUR_BB_CODE/dsatur_bb.py)
 *
 * Notazione del corso: q(k), sat_k(v), du_k(v),
 * F_k(v), UB (DSATUR), LB = |K| (clique greedy pre-colorata). Le funzioni di calcolo sono in window.GI_OC_E.
 * Verde riservato ai tagli: qui non si usa.
 */
(function () {
  "use strict";
  const GI = window.GI, M = window.GI_MIP, O = window.GI_OC;
  const T = GI.T;
  const { PASSO, parPasso, vaiA, clamp, lista, nuovoId, osservaDimensioni, dim, pix, disegno, daIndirizzo, chiedi } = O;
  window.GI_RICETTE = window.GI_RICETTE || {};
  /** l'istanza scelta dall'indirizzo (#ist=k), letta una volta sola */
  const istDaIndirizzo = (st, voci) => {
    if (st.dati.istLetta) return -1;
    st.dati.istLetta = true;
    const m = /ist=(\d+)/.exec(decodeURIComponent(location.hash || ""));
    return m && +m[1] < voci.length ? +m[1] : -1;
  };

  // =================================================================
  // BRANCH-AND-BOUND DSATUR PER LA COLORAZIONE DEI VERTICI
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

  window.GI_OC_E = { dsaturBB, VCP_ES };
})();
