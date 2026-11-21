/* Laboratorio di «Problemi di ottimizzazione combinatoria / Combinatorial Optimization Problems»: B&B dello zaino.
 *
 *   oc-bb-knapsack   zaino 0-1: branch-and-bound a profondità, albero con i bound di Dantzig (esatti, frazioni)
 *
 * Notazione del corso: capacità c, profitti p_j, pesi w_j; istanza di riferimento KP p = (10, 7, 6, 4),
 * w = (5, 4, 3, 3), c = 9. (2026-11-21: la tabella della PD e la colorazione greedy/DSATUR sono passate ai moduli
 * Programmazione dinamica e Algoritmi euristici.) Le funzioni di calcolo sono anche in window.GI_OC_A, per le prove.
 */
(function () {
  "use strict";
  const GI = window.GI, M = window.GI_MIP, O = window.GI_OC;
  const T = GI.T;
  const { PASSO, parPasso, vaiA, clamp, lista, nuovoId, osservaDimensioni, dim, pix, disegno, daIndirizzo, chiedi, interi, vetrina } = O;
  window.GI_RICETTE = window.GI_RICETTE || {};

  // =================================================================
  // 1. ZAINO 0-1: ISTANZE CASUALI E VALORE OTTIMO (controllo del branch-and-bound)
  // =================================================================
  /** valore ottimo del KP con la ricorrenza v(j,k) = max{v(j-1,k), p_j + v(j-1,k-w_j)} (una riga alla volta) */
  function ottimoKP(I) {
    const v = new Array(I.c + 1).fill(0);
    I.w.forEach((wj, j) => { for (let k = I.c; k >= wj; k--) v[k] = Math.max(v[k], I.p[j] + v[k - wj]); });
    return v[I.c];
  }
  function kpCasuale() {
    const n = M.casuale(3, 5), p = [], w = [];
    for (let j = 0; j < n; j++) { w.push(M.casuale(1, 6)); p.push(M.casuale(3, 14)); }
    const c = M.casuale(Math.max(...w) + 1, Math.min(12, Math.max(Math.max(...w) + 1, w.reduce((a, x) => a + x, 0) - 1)));
    return { p, w, c };
  }

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
    return { nodi, ord, ps, ws, z, xott: ord.map((j, i) => [j, xott[i] || 0]), foglie: foglia, ottDP: ottimoKP(I), c };
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
      // home della collana: data-vetrina="profitti ; pesi ; capacità" (come «Modifica…»), albero completo;
      // dopo «|» un'istanza facoltativa con meno foglie per il telefono (app larga meno di 600 px)
      vetrina(st, (v) => {
        const due = v.split("|"), u = (st.el.clientWidth < 600 && due[1]) || due[0];
        const [a, b, c] = u.split(";"), p = interi(a || ""), w = interi(b || ""), cc = interi(c || "");
        if (p && w && cc && p.length === w.length) D.ist = { p, w, c: cc[0], id: nuovoId() };
      });
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

  window.GI_OC_A = { ottimoKP, bbCalcola };
})();
