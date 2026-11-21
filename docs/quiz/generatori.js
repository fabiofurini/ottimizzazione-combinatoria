// Autovalutazione — domande generate del modulo «Problemi di ottimizzazione combinatoria» (combinatorial-optimization).
// Formato: QUIZ_SPEC.md. Ogni generatore riceve rng() in [0,1) e la lingua ("it" | "en") e restituisce
// { testo, opzioni[4], corretta, spiegazione, _v }. Il campo _v (dati dell'istanza e valori delle opzioni)
// serve solo al gemello di verifica in Python (quiz/verifica/): il motore lo ignora.
// Nessuna dipendenza esterna, niente Math.random: solo rng.
window.QUIZ_GEN = window.QUIZ_GEN || {};
(function () {
  "use strict";
  var MOD = "combinatorial-optimization";
  var EN = "https://fabiofurini.github.io/combinatorial-optimization/";
  var IT = "https://fabiofurini.github.io/ottimizzazione-combinatoria/";
  function L(en, it) { return { en: EN + en, it: IT + it }; }

  // ---------------------------------------------------------------- aiuti
  function ri(rng, a, b) { return a + Math.floor(rng() * (b - a + 1)); }
  function pickOne(rng, arr) { return arr[Math.floor(rng() * arr.length)]; }
  function shuffle(rng, a) {
    a = a.slice();
    for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(rng() * (i + 1)); var t = a[i]; a[i] = a[j]; a[j] = t; }
    return a;
  }
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { var t = a % b; a = b; b = t; } return a; }
  function fr(n, d) { if (d < 0) { n = -n; d = -d; } var g = gcd(n, d) || 1; return { n: n / g, d: d / g }; }
  function frAdd(a, b) { return fr(a.n * b.d + b.n * a.d, a.d * b.d); }
  function frTex(f) { return f.d === 1 ? String(f.n) : (f.n < 0 ? "-" : "") + "\\frac{" + Math.abs(f.n) + "}{" + f.d + "}"; }
  function frKey(f) { return f.n + "/" + f.d; }
  function floorDiv(a, b) { return Math.floor(a / b); }
  function sum(a) { var s = 0; for (var i = 0; i < a.length; i++) s += a[i]; return s; }
  function T(lingua, it, en) { return lingua === "it" ? it : en; }
  function vec(a) { return "(" + a.join(",") + ")"; }
  function set(a) { return a.length ? "\\{" + a.slice().sort(function (x, y) { return x - y; }).join(",") + "\\}" : "\\emptyset"; }
  function range1(n) { var r = []; for (var i = 1; i <= n; i++) r.push(i); return r; }
  // tabella orizzontale: righe = [[etichetta, valori...], ...]
  function tab(head, rows) {
    var cols = head.length - 1, s = "$\\begin{array}{c|" + new Array(cols + 1).join("c") + "}" + head.join(" & ") + "\\\\ \\hline ";
    s += rows.map(function (r) { return r.join(" & "); }).join("\\\\ ") + "\\end{array}$";
    return s;
  }
  // matrice delle distanze (simmetrica, d[i][j] con indici 1..n)
  function distTab(d, n) {
    var s = "$\\begin{array}{c|" + new Array(n + 1).join("c") + "} d_{ij} & " + range1(n).join(" & ") + "\\\\ \\hline ";
    var rows = [];
    for (var i = 1; i <= n; i++) {
      var r = [String(i)];
      for (var j = 1; j <= n; j++) r.push(i === j ? "-" : String(d[i][j]));
      rows.push(r.join(" & "));
    }
    return s + rows.join("\\\\ ") + "\\end{array}$";
  }
  // costruisce le 4 opzioni: corretta + 3 distrattori distinti (chiavi), nell'ordine dato da rng
  // cand: lista di {k: chiave, t: testo}; restituisce null se non bastano
  function build(rng, giusta, cand) {
    var used = {}, usedT = {}; used[giusta.k] = 1; usedT[giusta.t] = 1; var ds = [];
    for (var i = 0; i < cand.length && ds.length < 3; i++) {
      var c = cand[i];
      if (c && c.k !== undefined && c.t !== undefined && !used[c.k] && !usedT[c.t]) { used[c.k] = 1; usedT[c.t] = 1; ds.push(c); }
    }
    if (ds.length < 3) return null;
    var all = shuffle(rng, [giusta].concat(ds));
    var idx = 0; for (var j = 0; j < 4; j++) if (all[j] === giusta) idx = j;
    var testi = all.map(function (o) { return o.t; });
    var seen = {}; for (j = 0; j < 4; j++) { if (seen[testi[j]]) return null; seen[testi[j]] = 1; }
    return { opzioni: testi, corretta: idx, valori: all.map(function (o) { return o.k; }) };
  }
  function num(v) { return { k: String(v), t: "$" + v + "$" }; }
  function numF(f) { return { k: frKey(f), t: "$" + frTex(f) + "$" }; }
  function retry(f) {
    return function (rng, lingua) {
      for (var it = 0; it < 500; it++) { var r = f(rng, lingua); if (r) return r; }
      throw new Error("generatore senza istanza valida");
    };
  }
  function add(g) { g.genera = retry(g.genera); (QUIZ_GEN[MOD] = QUIZ_GEN[MOD] || []).push(g); }

  // ---------------------------------------------------------------- algoritmi
  function effOrder(p, w) { // indici 0..n-1 per efficienza non crescente, pari merito: indice minore
    return range1(p.length).map(function (i) { return i - 1; }).sort(function (a, b) {
      var x = p[a] * w[b], y = p[b] * w[a]; return x !== y ? y - x : a - b;
    });
  }
  function split(order, w, c) { // posizione s nell'ordine (0-based), rc; s = -1 se tutto entra
    var tot = 0;
    for (var k = 0; k < order.length; k++) { if (tot + w[order[k]] > c) return { s: k, rc: c - tot }; tot += w[order[k]]; }
    return { s: -1, rc: c - tot };
  }
  function kpOptSets(p, w, c) { // tutti gli insiemi ottimi (n piccolo)
    var n = p.length, best = -1, sets = [];
    for (var m = 0; m < (1 << n); m++) {
      var pp = 0, ww = 0, s = [];
      for (var j = 0; j < n; j++) if (m & (1 << j)) { pp += p[j]; ww += w[j]; s.push(j + 1); }
      if (ww > c) continue;
      if (pp > best) { best = pp; sets = [s]; } else if (pp === best) sets.push(s);
    }
    return { z: best, sets: sets };
  }
  function greedyOrder(order, p, w, c) {
    var rc = c, z = 0, s = [];
    order.forEach(function (j) { if (w[j] <= rc) { rc -= w[j]; z += p[j]; s.push(j + 1); } });
    return { z: z, set: s };
  }
  // bin packing: restituisce vettore bin (1-based) seguendo l'ordine dato
  function packing(w, c, rule, order) {
    order = order || range1(w.length).map(function (i) { return i - 1; });
    var loads = [], bin = new Array(w.length);
    order.forEach(function (i) {
      var b = -1;
      if (rule === "NF") { if (loads.length && loads[loads.length - 1] + w[i] <= c) b = loads.length - 1; }
      else {
        for (var k = 0; k < loads.length; k++) {
          if (loads[k] + w[i] > c) continue;
          if (b < 0) { b = k; if (rule === "FF") break; continue; }
          if (rule === "BF" && c - loads[k] < c - loads[b]) b = k;
          if (rule === "WF" && c - loads[k] > c - loads[b]) b = k;
        }
      }
      if (b < 0) { loads.push(0); b = loads.length - 1; }
      loads[b] += w[i]; bin[i] = b + 1;
    });
    return { bin: bin, nb: loads.length, loads: loads };
  }
  function decOrder(w) { return range1(w.length).map(function (i) { return i - 1; }).sort(function (a, b) { return w[b] - w[a] || a - b; }); }
  function listSched(t, m, order) {
    var Lm = []; for (var i = 0; i < m; i++) Lm.push(0);
    var mach = new Array(t.length);
    order.forEach(function (j) { var b = 0; for (var h = 1; h < m; h++) if (Lm[h] < Lm[b]) b = h; Lm[b] += t[j]; mach[j] = b + 1; });
    return { mach: mach, loads: Lm, cmax: Math.max.apply(null, Lm) };
  }
  function gcColor(adj, n, lambda) { // lambda: vertici 1..n
    var col = new Array(n + 1).fill(0);
    lambda.forEach(function (v) { var U = {}; adj[v].forEach(function (u) { if (col[u]) U[col[u]] = 1; }); var c = 1; while (U[c]) c++; col[v] = c; });
    return col.slice(1);
  }
  function dsatur(adj, n) {
    var col = new Array(n + 1).fill(0), seq = [];
    for (var step = 0; step < n; step++) {
      var best = -1, bs = -1, bd = -1;
      for (var v = 1; v <= n; v++) {
        if (col[v]) continue;
        var S = {}, ns = 0, du = 0;
        adj[v].forEach(function (u) { if (col[u]) { if (!S[col[u]]) { S[col[u]] = 1; ns++; } } else du++; });
        if (ns > bs || (ns === bs && du > bd)) { best = v; bs = ns; bd = du; }
      }
      var U = {}; adj[best].forEach(function (u) { if (col[u]) U[col[u]] = 1; }); var c = 1; while (U[c]) c++;
      col[best] = c; seq.push(best);
    }
    return { col: col.slice(1), seq: seq, nc: Math.max.apply(null, col) };
  }
  function randGraph(rng, n, pEdge) {
    var adj = [[]], E = [];
    for (var v = 1; v <= n; v++) adj.push([]);
    for (var a = 1; a <= n; a++) for (var b = a + 1; b <= n; b++) if (rng() < pEdge) { adj[a].push(b); adj[b].push(a); E.push([a, b]); }
    return { adj: adj, E: E };
  }
  function edgeTex(E) { return "$E=\\{" + E.map(function (e) { return "\\{" + e[0] + "," + e[1] + "\\}"; }).join(",") + "\\}$"; }
  function randDist(rng, n, lo, hi) {
    var d = []; for (var i = 0; i <= n; i++) { d.push([]); for (var j = 0; j <= n; j++) d[i].push(0); }
    for (i = 1; i <= n; i++) for (j = i + 1; j <= n; j++) { d[i][j] = d[j][i] = ri(rng, lo, hi); }
    return d;
  }
  function nn(d, n, s) { // restituisce {tour, len, open}
    var vis = {}, tour = [s], cur = s; vis[s] = 1; var len = 0;
    for (var k = 1; k < n; k++) {
      var b = -1; for (var j = 1; j <= n; j++) if (!vis[j] && (b < 0 || d[cur][j] < d[cur][b])) b = j;
      len += d[cur][b]; vis[b] = 1; tour.push(b); cur = b;
    }
    return { tour: tour, open: len, len: len + d[cur][s] };
  }
  function tourLen(d, t) { var s = 0; for (var i = 0; i < t.length; i++) s += d[t[i]][t[(i + 1) % t.length]]; return s; }
  function ulsCost(d, sc, vc, hc, j, t) { // c_{j,t}, periodi 1-based
    var g = sc[j - 1] + vc[j - 1] * d[j - 1], u = vc[j - 1];
    for (var k = j + 1; k <= t; k++) { u += hc[k - 2]; g += u * d[k - 1]; }
    return g;
  }
  function ww(d, sc, vc, hc) {
    var m = d.length, v = [0], arg = [0];
    for (var t = 1; t <= m; t++) {
      var b = Infinity, bj = 0;
      for (var j = 1; j <= t; j++) { var x = v[j - 1] + ulsCost(d, sc, vc, hc, j, t); if (x < b) { b = x; bj = j; } }
      v.push(b); arg.push(bj);
    }
    var runs = [], t2 = m; while (t2 > 0) { runs.unshift(arg[t2]); t2 = arg[t2] - 1; }
    return { v: v, runs: runs };
  }
  function itemTab(lingua, p, w, lab) {
    var n = p.length, head = [lab || "j"].concat(range1(n).map(String));
    return tab(head, [["p_j"].concat(p), ["w_j"].concat(w)]);
  }

  // ================================================================ GENERATORI
  // ---- 1. oggetto critico e capacità residua (cap. 9)
  add({
    id: "oc-g-kp-split", livello: "facile", capitolo: "knapsack-formulations",
    link: L("formulations/knapsack-formulations/an-ilp-model-for-the-0-1-knapsack-problem/#box-10-defSplit",
            "formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-0-1/#box-10-defSplit"),
    genera: function (rng, lingua) {
      var n = 5, p = [], w = [];
      for (var j = 0; j < n; j++) { w.push(ri(rng, 2, 9)); p.push(w[j] * ri(rng, 1, 4) + ri(rng, 0, 5)); }
      var c = ri(rng, 10, 20), W = sum(w);
      if (W <= c + 2 || Math.max.apply(null, w) > c) return null;
      var o = effOrder(p, w), sp = split(o, w, c);
      if (sp.s < 1) return null;
      var s = o[sp.s] + 1, rc = sp.rc;
      var key = function (a, b) { return { k: a + "|" + b, t: "$s=" + a + "$, $\\mathit{rc}=" + b + "$" }; };
      var c1 = split([0, 1, 2, 3, 4], w, c), c2 = split(decOrder(p), w, c);
      var wo = range1(n).map(function (i) { return i - 1; }).sort(function (a, b) { return w[a] - w[b] || a - b; }), c3 = split(wo, w, c);
      var cand = [];
      if (c1.s >= 0) cand.push(key(c1.s + 1, c1.rc));
      if (c2.s >= 0) cand.push(key(decOrder(p)[c2.s] + 1, c2.rc));
      if (c3.s >= 0) cand.push(key(wo[c3.s] + 1, c3.rc));
      cand.push(key(s, w[s - 1] - rc)); // capacità mancante invece di quella residua
      cand.push(sp.s >= 1 ? key(o[sp.s - 1] + 1, rc + w[o[sp.s - 1]]) : null);
      var b = build(rng, key(s, rc), cand); if (!b) return null;
      return {
        testo: T(lingua, "Problema dello zaino 0-1 (KP: si sceglie un sottoinsieme di oggetti di profitto massimo con peso totale al più $c$) con capacità $c=" + c + "$ e i seguenti oggetti: " + itemTab(lingua, p, w) +
          ". Ordinati gli oggetti per efficienza $p_j/w_j$ non crescente (pari merito: indice minore) e inseriti in quest'ordine, l'oggetto critico $s$ è il primo che non entra per intero e $\\mathit{rc}$ è la capacità lasciata libera dagli oggetti precedenti. Quanto valgono $s$ e $\\mathit{rc}$?",
          "0-1 knapsack problem (KP: choose a subset of items of maximum profit with total weight at most $c$) with capacity $c=" + c + "$ and the following items: " + itemTab(lingua, p, w) +
          ". With the items sorted by non-increasing efficiency $p_j/w_j$ (ties: smaller index) and inserted in this order, the split item $s$ is the first one that does not fit entirely and $\\mathit{rc}$ is the capacity left free by the previous items. What are $s$ and $\\mathit{rc}$?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "Ordine per efficienza $p_j/w_j$: $" + o.map(function (x) { return x + 1; }).join(",") + "$. Il primo oggetto che non entra interamente è $s=" + s + "$ e $\\mathit{rc}=c-\\sum_{j<s} w_j=" + rc + "$. Errori tipici: usare l'ordine degli indici, dei profitti o dei pesi.",
          "Order by efficiency $p_j/w_j$: $" + o.map(function (x) { return x + 1; }).join(",") + "$. The first item that does not fit entirely is $s=" + s + "$ and $\\mathit{rc}=c-\\sum_{j<s} w_j=" + rc + "$. Typical mistakes: using the order of the indices, of the profits or of the weights."),
        _v: { dati: { p: p, w: w, c: c }, valori: b.valori }
      };
    }
  });

  // ---- 2. valore del rilassamento lineare z(LP_KP) (cap. 9)
  add({
    id: "oc-g-kp-lp", livello: "facile", capitolo: "knapsack-formulations",
    link: L("formulations/knapsack-formulations/an-ilp-model-for-the-0-1-knapsack-problem/#box-13-corLPKP",
            "formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-0-1/#box-13-corLPKP"),
    genera: function (rng, lingua) {
      var n = 4, p = [], w = [];
      for (var j = 0; j < n; j++) { w.push(ri(rng, 2, 8)); p.push(w[j] * ri(rng, 1, 3) + ri(rng, 0, 6)); }
      var o = effOrder(p, w); p = o.map(function (i) { return p[i]; }); w = o.map(function (i) { return w[i]; });
      var c = ri(rng, 8, 16);
      if (sum(w) <= c + 1 || Math.max.apply(null, w) > c) return null;
      var sp = split([0, 1, 2, 3], w, c); if (sp.s < 1 || sp.rc === 0) return null;
      var s = sp.s, base = sum(p.slice(0, s));
      var z = fr(base * w[s] + p[s] * sp.rc, w[s]);
      if (z.d === 1) return null;
      var lp0 = fr(p[0] * c, w[0]);
      var wrong1 = fr(base * w[s] + w[s] * sp.rc, w[s]); // rc moltiplicato per 1 (dimentica p_s/w_s)
      var wrong2 = fr((base - p[s - 1]) * w[s] + p[s] * (sp.rc + w[s - 1]), w[s]); // split un passo prima
      var b = build(rng, numF(z), [numF(lp0), numF(fr(base + p[s], 1)), numF(wrong2), numF(wrong1), numF(fr(base, 1))]);
      if (!b) return null;
      return {
        testo: T(lingua, "Problema dello zaino 0-1 (KP: si sceglie un sottoinsieme di oggetti di profitto massimo con peso totale al più $c$) con capacità $c=" + c + "$ e oggetti già ordinati per efficienza non crescente: " + itemTab(lingua, p, w) + ". Quanto vale $z(\\mathrm{LP}_{\\mathrm{KP}})$, il valore ottimo del rilassamento lineare con $0\\le x_j\\le 1$?",
          "0-1 knapsack problem (KP: choose a subset of items of maximum profit with total weight at most $c$) with capacity $c=" + c + "$ and items already sorted by non-increasing efficiency: " + itemTab(lingua, p, w) + ". What is $z(\\mathrm{LP}_{\\mathrm{KP}})$, the optimal value of the LP relaxation with $0\\le x_j\\le 1$?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "$s=" + (s + 1) + "$, $\\mathit{rc}=" + sp.rc + "$, quindi $z(\\mathrm{LP}_{\\mathrm{KP}})=\\sum_{j<s}p_j+p_s\\,\\mathit{rc}/w_s=" + base + "+" + p[s] + "\\cdot\\frac{" + sp.rc + "}{" + w[s] + "}=" + frTex(z) + "$. Il valore $p_1 c/w_1$ è quello di $\\mathrm{LP}\\text{-}0_{\\mathrm{KP}}$, senza i vincoli $x_j\\le 1$.",
          "$s=" + (s + 1) + "$, $\\mathit{rc}=" + sp.rc + "$, hence $z(\\mathrm{LP}_{\\mathrm{KP}})=\\sum_{j<s}p_j+p_s\\,\\mathit{rc}/w_s=" + base + "+" + p[s] + "\\cdot\\frac{" + sp.rc + "}{" + w[s] + "}=" + frTex(z) + "$. The value $p_1 c/w_1$ is that of $\\mathrm{LP}\\text{-}0_{\\mathrm{KP}}$, without the constraints $x_j\\le 1$."),
        _v: { dati: { p: p, w: w, c: c }, valori: b.valori }
      };
    }
  });

  // ---- 3. upper bound di Dantzig (cap. 9)
  add({
    id: "oc-g-kp-dantzig", livello: "facile", capitolo: "knapsack-formulations",
    link: L("formulations/knapsack-formulations/an-ilp-model-for-the-0-1-knapsack-problem/#box-17-propDantzig",
            "formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-0-1/#box-17-propDantzig"),
    genera: function (rng, lingua) {
      var n = 5, p = [], w = [];
      for (var j = 0; j < n; j++) { w.push(ri(rng, 2, 9)); p.push(w[j] * ri(rng, 1, 3) + ri(rng, 0, 7)); }
      var c = ri(rng, 10, 20);
      if (sum(w) <= c + 2 || Math.max.apply(null, w) > c) return null;
      var o = effOrder(p, w), sp = split(o, w, c); if (sp.s < 1 || sp.rc === 0) return null;
      var base = 0; for (var k = 0; k < sp.s; k++) base += p[o[k]];
      var ps = p[o[sp.s]], ws = w[o[sp.s]];
      if ((ps * sp.rc) % ws === 0) return null;
      var ud = base + floorDiv(ps * sp.rc, ws);
      var idn = range1(n).map(function (i) { return i - 1; }), s2 = split(idn, w, c), u2 = null;
      if (s2.s >= 0) { var b2 = 0; for (k = 0; k < s2.s; k++) b2 += p[k]; u2 = b2 + floorDiv(p[s2.s] * s2.rc, w[s2.s]); }
      var po = decOrder(p), s3 = split(po, w, c), u3 = null;
      if (s3.s >= 0) { var b3 = 0; for (k = 0; k < s3.s; k++) b3 += p[po[k]]; u3 = b3 + floorDiv(p[po[s3.s]] * s3.rc, w[po[s3.s]]); }
      var b = build(rng, num(ud), [u2 !== null ? num(u2) : null, num(ud + 1), num(base + ps), u3 !== null ? num(u3) : null, num(base)]);
      if (!b) return null;
      return {
        testo: T(lingua, "Problema dello zaino 0-1 (KP: si sceglie un sottoinsieme di oggetti di profitto massimo con peso totale al più $c$) con capacità $c=" + c + "$ e i seguenti oggetti: " + itemTab(lingua, p, w) + ". Quanto vale l'upper bound di Dantzig $\\mathrm{UB}_{\\mathrm{D}}$, la parte intera del valore del rilassamento lineare (con $0\\le x_j\\le 1$)?",
          "0-1 knapsack problem (KP: choose a subset of items of maximum profit with total weight at most $c$) with capacity $c=" + c + "$ and the following items: " + itemTab(lingua, p, w) + ". What is the Dantzig upper bound $\\mathrm{UB}_{\\mathrm{D}}$, the integer part of the LP relaxation value (with $0\\le x_j\\le 1$)?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "Ordine per efficienza: $" + o.map(function (x) { return x + 1; }).join(",") + "$; oggetto critico $s=" + (o[sp.s] + 1) + "$, $\\mathit{rc}=" + sp.rc + "$. $\\mathrm{UB}_{\\mathrm{D}}=" + base + "+\\lfloor " + ps + "\\cdot " + sp.rc + "/" + ws + "\\rfloor=" + ud + "$. Gli oggetti vanno ordinati per efficienza, e si arrotonda per difetto.",
          "Order by efficiency: $" + o.map(function (x) { return x + 1; }).join(",") + "$; split item $s=" + (o[sp.s] + 1) + "$, $\\mathit{rc}=" + sp.rc + "$. $\\mathrm{UB}_{\\mathrm{D}}=" + base + "+\\lfloor " + ps + "\\cdot " + sp.rc + "/" + ws + "\\rfloor=" + ud + "$. The items must be sorted by efficiency, and the value is rounded down."),
        _v: { dati: { p: p, w: w, c: c }, valori: b.valori }
      };
    }
  });

  // ---- 4. upper bound di Martello-Toth (cap. 9) — media
  add({
    id: "oc-g-kp-mt", livello: "media", capitolo: "knapsack-formulations",
    link: L("formulations/knapsack-formulations/an-ilp-model-for-the-0-1-knapsack-problem/#box-18-propMT",
            "formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-0-1/#box-18-propMT"),
    genera: function (rng, lingua) {
      var n = 5, p = [], w = [];
      for (var j = 0; j < n; j++) { w.push(ri(rng, 2, 9)); p.push(w[j] * ri(rng, 1, 3) + ri(rng, 0, 7)); }
      var o = effOrder(p, w); p = o.map(function (i) { return p[i]; }); w = o.map(function (i) { return w[i]; });
      var c = ri(rng, 10, 20);
      if (sum(w) <= c + 2 || Math.max.apply(null, w) > c) return null;
      var sp = split([0, 1, 2, 3, 4], w, c), s = sp.s, rc = sp.rc;
      if (s < 1 || s > n - 2 || rc === 0) return null;
      var base = sum(p.slice(0, s));
      var ub0 = base + floorDiv(rc * p[s + 1], w[s + 1]);
      var ub1 = base + floorDiv(p[s] * w[s - 1] - (w[s] - rc) * p[s - 1], w[s - 1]);
      var ud = base + floorDiv(p[s] * rc, w[s]);
      var mt = Math.max(ub0, ub1);
      if (ub0 === ub1 || mt === ud) return null;
      // errore: scambiare s-1 e s+1 nelle due formule
      var x0 = base + floorDiv(rc * p[s - 1], w[s - 1]), x1 = base + floorDiv(p[s] * w[s + 1] - (w[s] - rc) * p[s + 1], w[s + 1]);
      var b = build(rng, num(mt), [num(Math.min(ub0, ub1)), num(ud), num(Math.max(x0, x1)), num(mt + 1)]);
      if (!b) return null;
      return {
        testo: T(lingua, "Problema dello zaino 0-1 (KP: si sceglie un sottoinsieme di oggetti di profitto massimo con peso totale al più $c$) con capacità $c=" + c + "$ e oggetti già ordinati per efficienza non crescente: " + itemTab(lingua, p, w) + ". Sia $s$ l'oggetto critico (il primo che non entra per intero). Quanto vale l'upper bound di Martello-Toth $\\mathrm{UB}_{\\mathrm{MT}}=\\max\\{\\mathrm{UB}_0,\\mathrm{UB}_1\\}$, dove $\\mathrm{UB}_0$ impone $x_s=0$ e $\\mathrm{UB}_1$ impone $x_s=1$?",
          "0-1 knapsack problem (KP: choose a subset of items of maximum profit with total weight at most $c$) with capacity $c=" + c + "$ and items already sorted by non-increasing efficiency: " + itemTab(lingua, p, w) + ". Let $s$ be the split item (the first one that does not fit entirely). What is the Martello-Toth upper bound $\\mathrm{UB}_{\\mathrm{MT}}=\\max\\{\\mathrm{UB}_0,\\mathrm{UB}_1\\}$, where $\\mathrm{UB}_0$ imposes $x_s=0$ and $\\mathrm{UB}_1$ imposes $x_s=1$?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "$s=" + (s + 1) + "$, $\\mathit{rc}=" + rc + "$; $\\mathrm{UB}_0=" + base + "+\\lfloor " + rc + "\\cdot " + p[s + 1] + "/" + w[s + 1] + "\\rfloor=" + ub0 + "$, $\\mathrm{UB}_1=" + base + "+\\lfloor " + p[s] + "-(" + w[s] + "-" + rc + ")\\cdot " + p[s - 1] + "/" + w[s - 1] + "\\rfloor=" + ub1 + "$, $\\mathrm{UB}_{\\mathrm{MT}}=\\max\\{\\mathrm{UB}_0,\\mathrm{UB}_1\\}=" + mt + "$ (Dantzig: $" + ud + "$). Si prende il massimo, non il minimo.",
          "$s=" + (s + 1) + "$, $\\mathit{rc}=" + rc + "$; $\\mathrm{UB}_0=" + base + "+\\lfloor " + rc + "\\cdot " + p[s + 1] + "/" + w[s + 1] + "\\rfloor=" + ub0 + "$, $\\mathrm{UB}_1=" + base + "+\\lfloor " + p[s] + "-(" + w[s] + "-" + rc + ")\\cdot " + p[s - 1] + "/" + w[s - 1] + "\\rfloor=" + ub1 + "$, $\\mathrm{UB}_{\\mathrm{MT}}=\\max\\{\\mathrm{UB}_0,\\mathrm{UB}_1\\}=" + mt + "$ (Dantzig: $" + ud + "$). The maximum is taken, not the minimum."),
        _v: { dati: { p: p, w: w, c: c }, valori: b.valori }
      };
    }
  });

  // ---- 12. bound sul peso del BPP (cap. 3)
  add({
    id: "oc-g-bpp-lb", livello: "facile", capitolo: "bin-packing",
    link: L("combinatorial-optimization-problems/bin-packing/the-bin-packing-problem/#box-3-obs-bpp-l1",
            "problemi-di-ottimizzazione-combinatoria/bin-packing/il-problema-del-bin-packing/#box-3-obs-bpp-l1"),
    genera: function (rng, lingua) {
      var n = 8, c = pickOne(rng, [10, 12, 15, 20]), w = [];
      for (var j = 0; j < n; j++) w.push(ri(rng, 2, c - 1));
      var W = sum(w); if (W % c === 0) return null;
      var lb = Math.ceil(W / c), big = w.filter(function (x) { return 2 * x > c; }).length, nf = packing(w, c, "NF").nb;
      var b = build(rng, num(lb), [num(Math.floor(W / c)), num(big), num(nf), num(lb + 1)]);
      if (!b) return null;
      return {
        testo: T(lingua, "Bin packing (BPP): gli oggetti di pesi $w=" + vec(w) + "$ vanno sistemati nel minimo numero di contenitori di capacità $c=" + c + "$. Quanto vale il lower bound sul peso $\\left\\lceil \\sum_j w_j / c \\right\\rceil$?",
          "Bin packing (BPP): the items of weights $w=" + vec(w) + "$ must be packed into the minimum number of bins of capacity $c=" + c + "$. What is the weight bound $\\left\\lceil \\sum_j w_j / c \\right\\rceil$?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "$\\sum_j w_j=" + W + "$, quindi $\\lceil " + W + "/" + c + "\\rceil=" + lb + "$. Si arrotonda per eccesso perché il numero di contenitori è intero.",
          "$\\sum_j w_j=" + W + "$, hence $\\lceil " + W + "/" + c + "\\rceil=" + lb + "$. The value is rounded up because the number of bins is an integer."),
        _v: { dati: { w: w, c: c }, valori: b.valori }
      };
    }
  });

  // ---- 18. intervallo per z(I) in P||Cmax (cap. 7)
  add({
    id: "oc-g-pcmax-bounds", livello: "facile", capitolo: "pcmax",
    link: L("combinatorial-optimization-problems/pcmax/scheduling-on-identical-parallel-machines/#box-5-obs-pcmaxlb",
            "problemi-di-ottimizzazione-combinatoria/pcmax/scheduling-su-macchine-parallele-identiche/#box-5-obs-pcmaxlb"),
    genera: function (rng, lingua) {
      var m = pickOne(rng, [2, 3]), n = 6, t = [];
      for (var j = 0; j < n; j++) t.push(ri(rng, 1, 9));
      var idx = range1(n).map(function (i) { return i - 1; });
      var ub = listSched(t, m, idx).cmax, W = sum(t), mx = Math.max.apply(null, t);
      if (W % m === 0) return null;
      var lb = Math.max(mx, Math.ceil(W / m));
      var key = function (a, b) { return { k: a + "|" + b, t: "$" + a + "\\le z(I)\\le " + b + "$" }; };
      var b = build(rng, key(lb, ub), [key(Math.floor(W / m), ub), key(mx, ub), key(lb, W), key(Math.ceil(W / m) + mx, ub)]);
      if (!b || lb >= ub) return null;
      return {
        testo: T(lingua, "Scheduling $P\\,||\\,C_{\\max}$: $m=" + m + "$ macchine identiche, tempi $t=" + vec(t) + "$, si minimizza il makespan (carico massimo). Si assegnano i lavori nell'ordine $1,\\dots," + n + "$, ciascuno alla macchina di carico minimo (pari merito: indice minimo), e si usa il lower bound combinatorio $\\max\\{\\max_j t_j,\\lceil\\sum_j t_j/m\\rceil\\}$. Quale intervallo si ottiene per il makespan ottimo $z(I)$?",
          "Scheduling $P\\,||\\,C_{\\max}$: $m=" + m + "$ identical machines, times $t=" + vec(t) + "$, the makespan (maximum load) is minimized. The jobs are assigned in the order $1,\\dots," + n + "$, each to the machine with the smallest load (ties: smallest index), and the combinatorial lower bound $\\max\\{\\max_j t_j,\\lceil\\sum_j t_j/m\\rceil\\}$ is used. Which interval is obtained for the optimal makespan $z(I)$?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "Lower bound: $\\max\\{" + mx + ",\\lceil " + W + "/" + m + "\\rceil\\}=" + lb + "$; la soluzione costruita ha makespan $" + ub + "$, un upper bound. Quindi $" + lb + "\\le z(I)\\le " + ub + "$.",
          "Lower bound: $\\max\\{" + mx + ",\\lceil " + W + "/" + m + "\\rceil\\}=" + lb + "$; the schedule built has makespan $" + ub + "$, an upper bound. Hence $" + lb + "\\le z(I)\\le " + ub + "$."),
        _v: { dati: { t: t, m: m }, valori: b.valori }
      };
    }
  });

  // ---- 25. branch-and-bound per il KP: prima iterazione (cap. 16) — complessa
  function lpNode(p, w, cap, avail, pk) { // oggetti avail in ordine di efficienza (indici 0-based)
    if (cap < 0) return { inf: true };
    var tot = 0, val = fr(pk, 1);
    for (var q = 0; q < avail.length; q++) {
      var j = avail[q];
      if (tot + w[j] > cap) { var rc = cap - tot; val = frAdd(val, fr(p[j] * rc, w[j])); return { z: val, s: j, integer: rc === 0 }; }
      tot += w[j]; val = frAdd(val, fr(p[j], 1));
    }
    return { z: val, s: -1, integer: true };
  }
  function nodeStatus(nd, LB) {
    if (nd.inf) return "inf";
    if (nd.integer) return "int";
    return Math.floor(nd.z.n / nd.z.d) <= LB ? "bound" : "list";
  }
  add({
    id: "oc-g-kp-bb", livello: "complessa", capitolo: "knapsack-branch-and-bound",
    link: L("specialized-algorithms/knapsack-branch-and-bound/#box-1-def-LPKPk", "algoritmi-specializzati/knapsack-branch-and-bound/#box-1-def-LPKPk"),
    genera: function (rng, lingua) {
      var n = 5, p = [], w = [];
      for (var j = 0; j < n; j++) { w.push(ri(rng, 2, 8)); p.push(w[j] * ri(rng, 1, 3) + ri(rng, 0, 6)); }
      var o = effOrder(p, w); p = o.map(function (i) { return p[i]; }); w = o.map(function (i) { return w[i]; });
      var c = ri(rng, 9, 16); if (sum(w) <= c + 2 || Math.max.apply(null, w) > c) return null;
      var all = [0, 1, 2, 3, 4];
      var root = lpNode(p, w, c, all, 0); if (root.integer) return null;
      var LB = greedyOrder(all, p, w, c).z;
      if (Math.floor(root.z.n / root.z.d) <= LB) return null;
      var s = root.s, rest = all.filter(function (x) { return x !== s; });
      var n2 = lpNode(p, w, c, rest, 0), n3 = lpNode(p, w, c - w[s], rest, p[s]);
      var st2 = nodeStatus(n2, LB), st3 = nodeStatus(n3, LB);
      if (st3 === "inf") return null;
      var txt = { it: { inf: "inammissibile", int: "potato per interezza", bound: "potato per bound", list: "inserito nella lista $L$" },
                  en: { inf: "infeasible", int: "pruned by integrality", bound: "pruned by bound", list: "inserted in the list $L$" } }[lingua];
      var key = function (z2, a, z3, b2) {
        return { k: frKey(z2) + "|" + a + "|" + frKey(z3) + "|" + b2,
                 t: T(lingua, "nodo 2: $" + frTex(z2) + "$, " + txt[a] + "; nodo 3: $" + frTex(z3) + "$, " + txt[b2],
                              "node 2: $" + frTex(z2) + "$, " + txt[a] + "; node 3: $" + frTex(z3) + "$, " + txt[b2]) };
      };
      // distrattori: (a) nodo 3 senza la costante p(k); (b) nodo 3 senza ridurre la capacità; (c) confronto con z invece di floor(z)
      var n3a = lpNode(p, w, c - w[s], rest, 0), n3b = lpNode(p, w, c, rest, p[s]);
      var stz = function (nd) { if (nd.inf) return "inf"; if (nd.integer) return "int"; return (nd.z.n / nd.z.d) <= LB ? "bound" : "list"; };
      var cand = [key(n2.z, st2, n3a.z, nodeStatus(n3a, LB)), key(n2.z, st2, n3b.z, nodeStatus(n3b, LB)),
                  key(n2.z, stz(n2), n3.z, stz(n3)), key(n2.z, st2 === "list" ? "bound" : "list", n3.z, st3 === "list" ? "bound" : "list")];
      var b = build(rng, key(n2.z, st2, n3.z, st3), cand);
      if (!b) return null;
      return {
        testo: T(lingua, "Problema dello zaino 0-1 (KP: si sceglie un sottoinsieme di oggetti di profitto massimo con peso totale al più $c$) con capacità $c=" + c + "$ e oggetti ordinati per efficienza non crescente: " + itemTab(lingua, p, w) + ". Nel branch-and-bound ogni nodo $k$ si valuta con il rilassamento lineare $\\mathrm{LP}^k_{\\mathrm{KP}}$; si ramifica sull'oggetto critico $s$ della radice (nodo 2: $x_s\\le 0$, nodo 3: $x_s\\ge 1$), con $\\mathrm{LB}=" + LB + "$ (valore della soluzione greedy). Un nodo con soluzione frazionaria si pota se $\\lfloor z(\\mathrm{LP}^k_{\\mathrm{KP}})\\rfloor\\le\\mathrm{LB}$, altrimenti entra nella lista $L$. Dopo aver risolto il nodo radice, quali sono i valori $z(\\mathrm{LP}^k_{\\mathrm{KP}})$ dei nodi 2 e 3 e che cosa se ne fa?",
          "0-1 knapsack problem (KP: choose a subset of items of maximum profit with total weight at most $c$) with capacity $c=" + c + "$ and items sorted by non-increasing efficiency: " + itemTab(lingua, p, w) + ". In branch-and-bound every node $k$ is evaluated with the LP relaxation $\\mathrm{LP}^k_{\\mathrm{KP}}$; branching is on the split item $s$ of the root (node 2: $x_s\\le 0$, node 3: $x_s\\ge 1$), with $\\mathrm{LB}=" + LB + "$ (value of the greedy solution). A node with a fractional solution is pruned if $\\lfloor z(\\mathrm{LP}^k_{\\mathrm{KP}})\\rfloor\\le\\mathrm{LB}$, otherwise it enters the list $L$. After solving the root node, what are the values $z(\\mathrm{LP}^k_{\\mathrm{KP}})$ of nodes 2 and 3 and what happens to them?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "Radice: $z=" + frTex(root.z) + "$, oggetto critico $s=" + (s + 1) + "$. Nodo 2 ($x_{" + (s + 1) + "}\\le 0$): $" + frTex(n2.z) + "$. Nodo 3 ($x_{" + (s + 1) + "}\\ge 1$): $c(3)=" + (c - w[s]) + "$, $p(3)=" + p[s] + "$, $z=" + frTex(n3.z) + "$. Un nodo è potato per bound se $\\lfloor z\\rfloor\\le\\mathrm{LB}$; nel nodo 3 vanno sommate la costante $p(3)$ e la capacità ridotta.",
          "Root: $z=" + frTex(root.z) + "$, split item $s=" + (s + 1) + "$. Node 2 ($x_{" + (s + 1) + "}\\le 0$): $" + frTex(n2.z) + "$. Node 3 ($x_{" + (s + 1) + "}\\ge 1$): $c(3)=" + (c - w[s]) + "$, $p(3)=" + p[s] + "$, $z=" + frTex(n3.z) + "$. A node is pruned by bound if $\\lfloor z\\rfloor\\le\\mathrm{LB}$; in node 3 the constant $p(3)$ and the reduced capacity must be used."),
        _v: { dati: { p: p, w: w, c: c, LB: LB }, valori: b.valori }
      };
    }
  });

  // ================================================================ BATCH 4 (6 novembre 2026): almeno due generatori per capitolo con calcoli
  function L2(en, it, a) { var s = a ? "#" + a : ""; return L(en + "/" + s, it + "/" + s); }
  function bitsOf(m, n) { var s = []; for (var j = 0; j < n; j++) if (m & (1 << j)) s.push(j + 1); return s; }
  function kpAll(p, w, c) { // tutti i sottoinsiemi ammissibili: {z, best:[maschere], vals:{maschera:valore}}
    var n = p.length, z = -1, best = [], second = -1;
    for (var m = 0; m < (1 << n); m++) {
      var pp = 0, ww = 0; for (var j = 0; j < n; j++) if (m & (1 << j)) { pp += p[j]; ww += w[j]; }
      if (ww > c) continue;
      if (pp > z) { second = z; z = pp; best = [m]; } else if (pp === z) best.push(m); else if (pp > second) second = pp;
    }
    return { z: z, best: best, second: second };
  }
  function setKey(s) { return { k: s.join(","), t: "$" + set(s) + "$" }; }
  function pairKey(a, b, ta, tb) { return { k: a + "|" + b, t: "$" + (ta || a) + "$, $" + (tb || b) + "$" }; }
  function adjMat(n, E) { var A = []; for (var i = 0; i <= n; i++) { A.push([]); for (var j = 0; j <= n; j++) A[i].push(false); } E.forEach(function (e) { A[e[0]][e[1]] = A[e[1]][e[0]] = true; }); return A; }
  function cliqueNum(n, A, stable) {
    var best = 0;
    for (var m = 1; m < (1 << n); m++) {
      var S = bitsOf(m, n), ok = true;
      for (var a = 0; a < S.length && ok; a++) for (var b = a + 1; b < S.length && ok; b++) if (A[S[a]][S[b]] === !!stable) ok = false;
      if (ok && S.length > best) best = S.length;
    }
    return best;
  }
  function chromatic(n, A) {
    for (var k = 1; k <= n; k++) {
      var col = new Array(n + 1).fill(0);
      var ok = (function rec(v) {
        if (v > n) return true;
        for (var c = 1; c <= k; c++) {
          var f = true; for (var u = 1; u < v; u++) if (A[u][v] && col[u] === c) { f = false; break; }
          if (f) { col[v] = c; if (rec(v + 1)) return true; }
        }
        col[v] = 0; return false;
      })(1);
      if (ok) return k;
    }
    return n;
  }
  function degs(n, E) { var d = new Array(n + 1).fill(0); E.forEach(function (e) { d[e[0]]++; d[e[1]]++; }); return d; }
  function kmaxOf(n, d) { var km = 0; for (var k = 1; k <= n; k++) { var c = 0; for (var v = 1; v <= n; v++) if (d[v] >= k - 1) c++; if (c >= k) km = k; } return km; }
  function twoEdgeSum(d, n) { var s = 0; for (var i = 1; i <= n; i++) { var r = []; for (var j = 1; j <= n; j++) if (j !== i) r.push(d[i][j]); r.sort(function (a, b) { return a - b; }); s += r[0] + r[1]; } return s; }
  function tspOpt(d, n) { // giri con la città 1 fissata: tutte le permutazioni di 2..n
    var best = Infinity, lens = [];
    (function perm(arr, k) {
      if (k === arr.length) { var L0 = tourLen(d, [1].concat(arr)); lens.push(L0); if (L0 < best) best = L0; return; }
      for (var i = k; i < arr.length; i++) { var t = arr[k]; arr[k] = arr[i]; arr[i] = t; perm(arr, k + 1); t = arr[k]; arr[k] = arr[i]; arr[i] = t; }
    })(range1(n).slice(1), 0);
    return { z: best, lens: lens };
  }
  function pcmaxOpt(t, m) { var n = t.length, best = Infinity; for (var a = 0; a < Math.pow(m, n); a++) { var L0 = new Array(m).fill(0), x = a; for (var j = 0; j < n; j++) { L0[x % m] += t[j]; x = Math.floor(x / m); } best = Math.min(best, Math.max.apply(null, L0)); } return best; }
  function binsOpt(w, c) { // minimo numero di contenitori, ricerca esaustiva
    var n = w.length, best = n, loads = [];
    (function rec(i) {
      if (loads.length >= best) return;
      if (i === n) { best = loads.length; return; }
      for (var b = 0; b < loads.length; b++) if (loads[b] + w[i] <= c) { loads[b] += w[i]; rec(i + 1); loads[b] -= w[i]; }
      loads.push(w[i]); rec(i + 1); loads.pop();
    })(0);
    return best;
  }
  function binsOf(P) { return P.nb; }
  function greedyClique(n, A, d) { var ord = range1(n).sort(function (a, b) { return d[b] - d[a] || a - b; }), K = []; ord.forEach(function (v) { if (K.every(function (u) { return A[u][v]; })) K.push(v); }); return K; }
  function lsCost(d, x, sc, vc, hc) { var s = 0, st = 0; for (var t = 0; t < d.length; t++) { st += x[t] - d[t]; if (st < 0) return null; s += (x[t] > 0 ? sc[t] : 0) + vc[t] * x[t] + hc[t] * st; } return st === 0 ? s : null; }

  // ---- B4.17 gap relativo (cap. 1)
  add({
    id: "oc-g-co-gap", livello: "facile", capitolo: "combinatorial-optimization",
    link: L2("combinatorial-optimization-problems/combinatorial-optimization/primal-bounds-dual-bounds-and-gap", "problemi-di-ottimizzazione-combinatoria/combinatorial-optimization/bound-primali-bound-duali-e-gap", "box-8-def-gap"),
    genera: function (rng, lingua) {
      var mx = rng() < 0.5, LB = ri(rng, 10, 40), UB = LB + ri(rng, 1, 12);
      var g = fr(UB - LB, LB), g2 = fr(UB - LB, UB), g3 = fr(UB, LB);
      var bb = build(rng, numF(g), [numF(g2), num(UB - LB), numF(g3), numF(fr(LB, UB))]);
      if (!bb) return null;
      var who = mx ? T(lingua, "massimo; una soluzione ammissibile vale $\\mathrm{LB}=" + LB + "$ e un bound duale vale $\\mathrm{UB}=" + UB + "$", "maximization; a feasible solution is worth $\\mathrm{LB}=" + LB + "$ and a dual bound is $\\mathrm{UB}=" + UB + "$")
                   : T(lingua, "minimo; un bound duale vale $\\mathrm{LB}=" + LB + "$ e una soluzione ammissibile vale $\\mathrm{UB}=" + UB + "$", "minimization; a dual bound is $\\mathrm{LB}=" + LB + "$ and a feasible solution is worth $\\mathrm{UB}=" + UB + "$");
      return {
        testo: T(lingua, "Istanza di un problema di ottimizzazione combinatoria in forma di " + who + ". Il gap relativo è $\\frac{\\mathrm{UB}-\\mathrm{LB}}{|\\mathrm{LB}|}$. Quanto vale?",
          "Instance of a combinatorial optimization problem in " + who + ". The relative gap is $\\frac{\\mathrm{UB}-\\mathrm{LB}}{|\\mathrm{LB}|}$. What is it?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "$\\frac{" + UB + "-" + LB + "}{" + LB + "}=" + frTex(g) + "$. $" + (UB - LB) + "$ è il gap assoluto; dividere per $\\mathrm{UB}$ dà $" + frTex(g2) + "$.",
          "$\\frac{" + UB + "-" + LB + "}{" + LB + "}=" + frTex(g) + "$. $" + (UB - LB) + "$ is the absolute gap; dividing by $\\mathrm{UB}$ gives $" + frTex(g2) + "$."),
        _v: { dati: { LB: LB, UB: UB, max: mx }, valori: bb.valori }
      };
    }
  });

  // ---- B4.18 contare le soluzioni (cap. 1)
  function stirling(n, k) { if (n === 0 && k === 0) return 1; if (n === 0 || k === 0) return 0; return k * stirling(n - 1, k) + stirling(n - 1, k - 1); }
  function fact(n) { return n <= 1 ? 1 : n * fact(n - 1); }
  add({
    id: "oc-g-co-count", livello: "facile", capitolo: "combinatorial-optimization",
    link: L2("combinatorial-optimization-problems/combinatorial-optimization/counting-the-solutions", "problemi-di-ottimizzazione-combinatoria/combinatorial-optimization/contare-le-soluzioni", ""),
    genera: function (rng, lingua) {
      var kind = pickOne(rng, ["kp", "tsp", "pcm"]), n, m = 0, x, cand, txt;
      if (kind === "kp") { n = ri(rng, 5, 10); x = Math.pow(2, n); cand = [fact(n), Math.pow(2, n) - 1, n * n, Math.pow(2, n - 1)];
        txt = T(lingua, "Nel problema dello zaino 0-1 con $n=" + n + "$ oggetti una soluzione candidata è un sottoinsieme qualsiasi degli oggetti, prima di controllare la capacità. Quante sono le soluzioni candidate?",
          "In the 0-1 knapsack with $n=" + n + "$ items a candidate solution is any subset of the items, before checking the capacity. How many candidate solutions are there?"); }
      else if (kind === "tsp") { n = ri(rng, 5, 8); x = fact(n - 1) / 2; cand = [fact(n), fact(n - 1), fact(n) / 2, Math.pow(2, n)];
        txt = T(lingua, "Nel TSP simmetrico con $n=" + n + "$ città un giro visita ogni città una volta e torna alla partenza; due giri sono uguali se usano gli stessi lati. Quanti giri distinti ci sono?",
          "In the symmetric TSP with $n=" + n + "$ cities a tour visits every city once and returns to the start; two tours are equal if they use the same edges. How many distinct tours are there?"); }
      else { n = ri(rng, 4, 6); m = ri(rng, 2, 3); x = 0; for (var k = 1; k <= m; k++) x += stirling(n, k); cand = [Math.pow(m, n), stirling(n, m), Math.pow(m, n) / fact(m), x + 1];
        txt = T(lingua, "Nello scheduling $P\\,||\\,C_{\\max}$ con $n=" + n + "$ lavori e $m=" + m + "$ macchine identiche, uno schedule è una partizione dei lavori in al più $m$ insiemi (le macchine non hanno nome). Quanti schedule distinti ci sono?",
          "In scheduling $P\\,||\\,C_{\\max}$ with $n=" + n + "$ jobs and $m=" + m + "$ identical machines, a schedule is a partition of the jobs into at most $m$ sets (machines have no names). How many distinct schedules are there?"); }
      var bb = build(rng, num(x), cand.filter(function (v) { return v === Math.floor(v); }).map(num));
      if (!bb) return null;
      return {
        testo: txt, opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: kind === "kp" ? T(lingua, "Ogni oggetto è dentro o fuori: $2^{" + n + "}=" + x + "$ sottoinsiemi.", "Every item is in or out: $2^{" + n + "}=" + x + "$ subsets.")
          : kind === "tsp" ? T(lingua, "Si fissa la città di partenza e si identifica un giro con il suo inverso: $\\frac{(n-1)!}{2}=" + x + "$.", "The starting city is fixed and a tour is identified with its reverse: $\\frac{(n-1)!}{2}=" + x + "$.")
          : T(lingua, "Le partizioni in al più $m$ insiemi sono $\\sum_{k=1}^{m}S(n,k)=" + x + "$, con $S(n,k)$ numeri di Stirling di seconda specie; $m^n=" + Math.pow(m, n) + "$ conta gli assegnamenti.", "The partitions into at most $m$ sets are $\\sum_{k=1}^{m}S(n,k)=" + x + "$, with $S(n,k)$ Stirling numbers of the second kind; $m^n=" + Math.pow(m, n) + "$ counts the assignments."),
        _v: { dati: { kind: kind, n: n, m: m }, valori: bb.valori }
      };
    }
  });

  // ---- B4.19-20 zaino: bound di cardinalità e ottimo (cap. 2)
  add({
    id: "oc-g-kp-card", livello: "facile", capitolo: "knapsack",
    link: L2("combinatorial-optimization-problems/knapsack/the-0-1-knapsack-problem", "problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-0-1", "box-3-obs-kp-card"),
    genera: function (rng, lingua) {
      var n = 6, p = [], w = []; for (var j = 0; j < n; j++) { p.push(ri(rng, 3, 12)); w.push(ri(rng, 2, 9)); }
      var c = ri(rng, 9, 16), ws = w.slice().sort(function (a, b) { return a - b; }), kb = 0, s = 0;
      while (kb < n && s + ws[kb] <= c) { s += ws[kb]; kb++; }
      if (kb === 0 || kb === n) return null;
      var ps = p.slice().sort(function (a, b) { return b - a; }), ub = 0; for (j = 0; j < kb; j++) ub += ps[j];
      var light = range1(n).map(function (i) { return i - 1; }).sort(function (a, b) { return w[a] - w[b] || a - b; }), ul = 0; for (j = 0; j < kb; j++) ul += p[light[j]];
      var bb = build(rng, num(ub), [num(ul), num(ub + ps[kb]), num(kb), num(ub - ps[kb - 1])]);
      if (!bb) return null;
      return {
        testo: T(lingua, "Zaino 0-1 con capacità $c=" + c + "$ e oggetti " + itemTab(lingua, p, w) + ". Sia $\\bar k$ il più grande intero tale che i $\\bar k$ oggetti più leggeri pesino in tutto al più $c$; il bound di cardinalità è la somma dei $\\bar k$ profitti più grandi. Quanto vale?",
          "0-1 knapsack with capacity $c=" + c + "$ and items " + itemTab(lingua, p, w) + ". Let $\\bar k$ be the largest integer such that the $\\bar k$ lightest items weigh in total at most $c$; the cardinality bound is the sum of the $\\bar k$ largest profits. What is it?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "I pesi ordinati danno $\\bar k=" + kb + "$; i $" + kb + "$ profitti più grandi sommano a $" + ub + "$. Sommare i profitti degli oggetti più leggeri ($" + ul + "$) non dà un upper bound.",
          "The sorted weights give $\\bar k=" + kb + "$; the $" + kb + "$ largest profits add up to $" + ub + "$. Adding the profits of the lightest items ($" + ul + "$) does not give an upper bound."),
        _v: { dati: { p: p, w: w, c: c }, valori: bb.valori }
      };
    }
  });
  add({
    id: "oc-g-kp-brute", livello: "media", capitolo: "knapsack",
    link: L2("combinatorial-optimization-problems/knapsack/the-0-1-knapsack-problem", "problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-0-1", "box-1-defKP"),
    genera: function (rng, lingua) {
      var n = 5, p = [], w = []; for (var j = 0; j < n; j++) { p.push(ri(rng, 3, 15)); w.push(ri(rng, 2, 9)); }
      var c = ri(rng, 10, 18), K = kpAll(p, w, c);
      if (K.best.length !== 1 || sum(w) <= c) return null;
      var g = greedyOrder(effOrder(p, w), p, w, c), gp = greedyOrder(range1(n).map(function (i) { return i - 1; }).sort(function (a, b) { return p[b] - p[a] || a - b; }), p, w, c);
      var sec = []; for (var m = 0; m < (1 << n); m++) { var pp = 0, ww = 0; bitsOf(m, n).forEach(function (i) { pp += p[i - 1]; ww += w[i - 1]; }); if (ww <= c && pp === K.second) { sec = bitsOf(m, n); break; } }
      var bb = build(rng, setKey(bitsOf(K.best[0], n)), [setKey(g.set), setKey(gp.set), setKey(sec), setKey(range1(n).filter(function (i) { return w[i - 1] <= 3; }))]);
      if (!bb) return null;
      return {
        testo: T(lingua, "Zaino 0-1 (si sceglie un sottoinsieme di oggetti di profitto massimo con peso totale al più $c$) con capacità $c=" + c + "$ e oggetti " + itemTab(lingua, p, w) + ". Quale sottoinsieme è la soluzione ottima (unica)?",
          "0-1 knapsack (choose a subset of items of maximum profit with total weight at most $c$) with capacity $c=" + c + "$ and items " + itemTab(lingua, p, w) + ". Which subset is the (unique) optimal solution?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Elencando i $2^5=32$ sottoinsiemi, l'ottimo è $" + set(bitsOf(K.best[0], n)) + "$ con valore $" + K.z + "$. Il greedy per efficienza dà $" + set(g.set) + "$ (valore $" + g.z + "$).",
          "Listing the $2^5=32$ subsets, the optimum is $" + set(bitsOf(K.best[0], n)) + "$ with value $" + K.z + "$. The greedy by efficiency gives $" + set(g.set) + "$ (value $" + g.z + "$)."),
        _v: { dati: { p: p, w: w, c: c }, valori: bb.valori }
      };
    }
  });

  // ---- B4.21 bin packing: valore ottimo (cap. 3)
  add({
    id: "oc-g-bpp-opt", livello: "media", capitolo: "bin-packing",
    link: L2("combinatorial-optimization-problems/bin-packing/the-bin-packing-problem", "problemi-di-ottimizzazione-combinatoria/bin-packing/il-problema-del-bin-packing", "box-3-obs-bpp-l1"),
    genera: function (rng, lingua) {
      var n = 6, c = 10, w = []; for (var j = 0; j < n; j++) w.push(ri(rng, 2, 7));
      var z = binsOpt(w, c), lb = Math.ceil(sum(w) / c), ff = binsOf(packing(w, c, "FF")), nf = binsOf(packing(w, c, "NF"));
      var bb = build(rng, num(z), [num(lb), num(ff), num(nf), num(z + 1), num(z - 1)]);
      if (!bb || z === lb && ff === z) return null;
      return {
        testo: T(lingua, "Bin packing: oggetti di peso $w=" + vec(w) + "$ da sistemare nel minimo numero di contenitori di capacità $c=" + c + "$. Quanto vale il valore ottimo $z(I)$?",
          "Bin packing: items of weight $w=" + vec(w) + "$ to be packed into the minimum number of bins of capacity $c=" + c + "$. What is the optimal value $z(I)$?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "$z(I)=" + z + "$. Il bound sul peso vale $\\lceil " + sum(w) + "/" + c + "\\rceil=" + lb + "$ e First Fit nell'ordine dato usa $" + ff + "$ contenitori: il primo è un lower bound, il secondo un upper bound.",
          "$z(I)=" + z + "$. The weight bound is $\\lceil " + sum(w) + "/" + c + "\\rceil=" + lb + "$ and First Fit in the given order uses $" + ff + "$ bins: the first is a lower bound, the second an upper bound."),
        _v: { dati: { w: w, c: c }, valori: bb.valori }
      };
    }
  });

  // ---- B4.22-23 colorazione (cap. 4)
  function graphQ(rng, n, pE) { var G = randGraph(rng, n, pE); if (G.E.length < n) return null; G.A = adjMat(n, G.E); G.n = n; return G; }
  function gTxt(lingua, G) { return T(lingua, "Grafo $G=(V,E)$ con $V=\\{1,\\dots," + G.n + "\\}$ e " + edgeTex(G.E) + ".", "Graph $G=(V,E)$ with $V=\\{1,\\dots," + G.n + "\\}$ and " + edgeTex(G.E) + "."); }
  add({
    id: "oc-g-vcp-bounds", livello: "facile", capitolo: "coloring",
    link: L2("combinatorial-optimization-problems/coloring/the-vertex-coloring-problem", "problemi-di-ottimizzazione-combinatoria/coloring/il-problema-della-colorazione-dei-vertici", "box-7-obs-stable-bound"),
    genera: function (rng, lingua) {
      var G = graphQ(rng, 6, 0.5); if (!G) return null;
      var om = cliqueNum(6, G.A, false), al = cliqueNum(6, G.A, true), sb = Math.ceil(6 / al), dg = degs(6, G.E), D = Math.max.apply(null, dg);
      var bb = build(rng, pairKey(om, sb), [pairKey(D + 1, sb), pairKey(al, Math.ceil(6 / om)), pairKey(om, Math.floor(6 / al)), pairKey(om, al)]);
      if (!bb) return null;
      return {
        testo: gTxt(lingua, G) + T(lingua, " Per il numero cromatico $\\chi(G)$ valgono il bound della clique $\\omega(G)$ (clique massima) e il bound dell'insieme stabile $\\lceil n/\\alpha(G)\\rceil$ ($\\alpha(G)$ insieme stabile massimo). Quanto valgono, nell'ordine?",
          " For the chromatic number $\\chi(G)$ the clique bound $\\omega(G)$ (maximum clique) and the stable set bound $\\lceil n/\\alpha(G)\\rceil$ ($\\alpha(G)$ maximum stable set) hold. What are they, in this order?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "$\\omega(G)=" + om + "$ e $\\alpha(G)=" + al + "$, quindi $\\lceil 6/" + al + "\\rceil=" + sb + "$: $\\chi(G)\\ge" + Math.max(om, sb) + "$. Il grado massimo dà invece l'upper bound $\\Delta+1=" + (D + 1) + "$.",
          "$\\omega(G)=" + om + "$ and $\\alpha(G)=" + al + "$, hence $\\lceil 6/" + al + "\\rceil=" + sb + "$: $\\chi(G)\\ge" + Math.max(om, sb) + "$. The largest degree gives instead the upper bound $\\Delta+1=" + (D + 1) + "$."),
        _v: { dati: { n: 6, E: G.E }, valori: bb.valori }
      };
    }
  });
  add({
    id: "oc-g-vcp-chi", livello: "media", capitolo: "coloring",
    link: L2("combinatorial-optimization-problems/coloring/the-vertex-coloring-problem", "problemi-di-ottimizzazione-combinatoria/coloring/il-problema-della-colorazione-dei-vertici", "box-3-defVCP"),
    genera: function (rng, lingua) {
      var G = graphQ(rng, 6, 0.55); if (!G) return null;
      var chi = chromatic(6, G.A), om = cliqueNum(6, G.A, false), gc = Math.max.apply(null, gcColor(G.adj, 6, range1(6)));
      var dg = degs(6, G.E);
      var bb = build(rng, num(chi), [num(om), num(gc), num(Math.max.apply(null, dg) + 1), num(chi + 1), num(chi - 1)]);
      if (!bb) return null;
      return {
        testo: gTxt(lingua, G) + T(lingua, " Nella colorazione dei vertici si assegnano colori diversi ai vertici adiacenti usando il minimo numero di colori. Quanto vale il numero cromatico $\\chi(G)$?",
          " In vertex coloring adjacent vertices get different colors and the number of colors is minimized. What is the chromatic number $\\chi(G)$?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "$\\chi(G)=" + chi + "$: esiste una colorazione con $" + chi + "$ colori e nessuna con meno. La clique massima ha $" + om + "$ vertici; la colorazione greedy con l'ordine $1,\\dots,6$ usa $" + gc + "$ colori.",
          "$\\chi(G)=" + chi + "$: a coloring with $" + chi + "$ colors exists and none with fewer. The maximum clique has $" + om + "$ vertices; the greedy coloring with order $1,\\dots,6$ uses $" + gc + "$ colors."),
        _v: { dati: { n: 6, E: G.E }, valori: bb.valori }
      };
    }
  });

  // ---- B4.24-25 clique (cap. 5)
  add({
    id: "oc-g-mcp-bounds", livello: "facile", capitolo: "clique",
    link: L2("combinatorial-optimization-problems/clique/the-maximum-clique-problem", "problemi-di-ottimizzazione-combinatoria/clique/il-problema-della-clique-massima", "box-10-mcpP-obs-count"),
    genera: function (rng, lingua) {
      var G = graphQ(rng, 7, 0.45); if (!G) return null;
      var dg = degs(7, G.E), D = Math.max.apply(null, dg), km = kmaxOf(7, dg);
      var bb = build(rng, pairKey(D + 1, km), [pairKey(D, km), pairKey(D + 1, km + 1), pairKey(km, D + 1), pairKey(D + 1, km - 1)]);
      if (!bb) return null;
      return {
        testo: gTxt(lingua, G) + T(lingua, " Per la clique massima $\\omega(G)$ valgono il bound del grado $\\Delta+1$ ($\\Delta$ grado massimo) e il bound $k^{\\max}$, il più grande $k$ tale che almeno $k$ vertici abbiano grado almeno $k-1$. Quanto valgono, nell'ordine?",
          " For the maximum clique $\\omega(G)$ the degree bound $\\Delta+1$ ($\\Delta$ largest degree) and the bound $k^{\\max}$, the largest $k$ such that at least $k$ vertices have degree at least $k-1$, hold. What are they, in this order?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "I gradi sono $" + vec(dg.slice(1)) + "$: $\\Delta+1=" + (D + 1) + "$ e $k^{\\max}=" + km + "$, che non è mai più debole.",
          "The degrees are $" + vec(dg.slice(1)) + "$: $\\Delta+1=" + (D + 1) + "$ and $k^{\\max}=" + km + "$, which is never weaker."),
        _v: { dati: { n: 7, E: G.E }, valori: bb.valori }
      };
    }
  });
  add({
    id: "oc-g-mcp-omega", livello: "media", capitolo: "clique",
    link: L2("combinatorial-optimization-problems/clique/the-maximum-clique-problem", "problemi-di-ottimizzazione-combinatoria/clique/il-problema-della-clique-massima", "box-2-mcpP-def-MCP"),
    genera: function (rng, lingua) {
      var G = graphQ(rng, 7, 0.55); if (!G) return null;
      var om = cliqueNum(7, G.A, false), dg = degs(7, G.E), km = kmaxOf(7, dg), al = cliqueNum(7, G.A, true);
      var bb = build(rng, num(om), [num(km), num(Math.max.apply(null, dg) + 1), num(al), num(om + 1), num(om - 1)]);
      if (!bb) return null;
      return {
        testo: gTxt(lingua, G) + T(lingua, " Una clique è un insieme di vertici a due a due adiacenti. Quanti vertici ha una clique massima, cioè quanto vale $\\omega(G)$?",
          " A clique is a set of pairwise adjacent vertices. How many vertices does a maximum clique have, i.e., what is $\\omega(G)$?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "$\\omega(G)=" + om + "$. I bound $k^{\\max}=" + km + "$ e $\\Delta+1=" + (Math.max.apply(null, dg) + 1) + "$ sono solo upper bound; $" + al + "$ è l'insieme stabile massimo.",
          "$\\omega(G)=" + om + "$. The bounds $k^{\\max}=" + km + "$ and $\\Delta+1=" + (Math.max.apply(null, dg) + 1) + "$ are only upper bounds; $" + al + "$ is the maximum stable set."),
        _v: { dati: { n: 7, E: G.E }, valori: bb.valori }
      };
    }
  });

  // ---- B4.26-27 TSP (cap. 6)
  add({
    id: "oc-g-tsp-lb", livello: "facile", capitolo: "tsp",
    link: L2("combinatorial-optimization-problems/tsp/the-travelling-salesman-problem", "problemi-di-ottimizzazione-combinatoria/tsp/il-problema-del-commesso-viaggiatore", "box-6-obs-tsp-lb"),
    genera: function (rng, lingua) {
      var n = 5, d = randDist(rng, n, 2, 15), s = twoEdgeSum(d, n), lb = Math.ceil(s / 2), mn = 0;
      for (var i = 1; i <= n; i++) { var r = Infinity; for (var j = 1; j <= n; j++) if (j !== i) r = Math.min(r, d[i][j]); mn += r; }
      var bb = build(rng, num(lb), [num(s), num(mn), num(lb + 1), num(Math.floor(s / 2) - 1)]);
      if (!bb) return null;
      return {
        testo: T(lingua, "TSP simmetrico con $5$ città e distanze " + distTab(d, n) + ". Con $a_i$ e $b_i$ le due distanze più piccole dalla città $i$ alle altre, il lower bound è $\\left\\lceil\\frac12\\sum_i(a_i+b_i)\\right\\rceil$. Quanto vale?",
          "Symmetric TSP with $5$ cities and distances " + distTab(d, n) + ". With $a_i$ and $b_i$ the two smallest distances from city $i$ to the others, the lower bound is $\\left\\lceil\\frac12\\sum_i(a_i+b_i)\\right\\rceil$. What is it?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "$\\sum_i(a_i+b_i)=" + s + "$, e la metà arrotondata per eccesso è $" + lb + "$: ogni lato del giro è contato da entrambi gli estremi.",
          "$\\sum_i(a_i+b_i)=" + s + "$, and half of it rounded up is $" + lb + "$: every tour edge is counted by both endpoints."),
        _v: { dati: { d: d, n: n }, valori: bb.valori }
      };
    }
  });
  add({
    id: "oc-g-tsp-opt", livello: "media", capitolo: "tsp",
    link: L2("combinatorial-optimization-problems/tsp/the-travelling-salesman-problem", "problemi-di-ottimizzazione-combinatoria/tsp/il-problema-del-commesso-viaggiatore", "box-4-ex-tsp-enum"),
    genera: function (rng, lingua) {
      var n = 5, d = randDist(rng, n, 2, 15), O = tspOpt(d, n), N = nn(d, n, 1).len, lb = Math.ceil(twoEdgeSum(d, n) / 2);
      var ls = O.lens.slice().sort(function (a, b) { return a - b; }), sec = ls.filter(function (x) { return x > O.z; })[0];
      var bb = build(rng, num(O.z), [num(N), num(lb), num(sec), num(O.z + 1)]);
      if (!bb || N === O.z) return null;
      return {
        testo: T(lingua, "TSP simmetrico con $5$ città e distanze " + distTab(d, n) + ". Quanto è lungo il giro più corto $z(I)$ (giro chiuso che visita ogni città una volta)?",
          "Symmetric TSP with $5$ cities and distances " + distTab(d, n) + ". How long is the shortest tour $z(I)$ (closed route visiting every city once)?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Elencando i $12$ giri distinti, il più corto è lungo $" + O.z + "$. Il nearest neighbour dalla città $1$ dà $" + N + "$, e il bound delle due distanze minime $" + lb + "$.",
          "Listing the $12$ distinct tours, the shortest has length $" + O.z + "$. Nearest neighbour from city $1$ gives $" + N + "$, and the two-smallest-distances bound $" + lb + "$."),
        _v: { dati: { d: d, n: n }, valori: bb.valori }
      };
    }
  });

  // ---- B4.28 P||Cmax ottimo (cap. 7)
  add({
    id: "oc-g-pcmax-opt", livello: "media", capitolo: "pcmax",
    link: L2("combinatorial-optimization-problems/pcmax/scheduling-on-identical-parallel-machines", "problemi-di-ottimizzazione-combinatoria/pcmax/scheduling-su-macchine-parallele-identiche", "box-5-obs-pcmaxlb"),
    genera: function (rng, lingua) {
      var m = ri(rng, 2, 3), t = []; for (var j = 0; j < 6; j++) t.push(ri(rng, 1, 9));
      var z = pcmaxOpt(t, m), lb = Math.max(Math.max.apply(null, t), Math.ceil(sum(t) / m)), lpt = listSched(t, m, decOrder(t)).cmax, lst = listSched(t, m, range1(6).map(function (i) { return i - 1; })).cmax;
      var bb = build(rng, num(z), [num(lb), num(lpt), num(lst), num(z + 1)]);
      if (!bb || (lb === z && lpt === z)) return null;
      return {
        testo: T(lingua, "Scheduling $P\\,||\\,C_{\\max}$: lavori di durata $t=" + vec(t) + "$ su $m=" + m + "$ macchine identiche; il makespan è il carico massimo di una macchina. Quanto vale il makespan ottimo $z(I)$?",
          "Scheduling $P\\,||\\,C_{\\max}$: jobs of processing time $t=" + vec(t) + "$ on $m=" + m + "$ identical machines; the makespan is the largest load of a machine. What is the optimal makespan $z(I)$?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "$z(I)=" + z + "$. Il lower bound $\\max\\{\\max_jt_j,\\lceil\\sum_jt_j/m\\rceil\\}$ vale $" + lb + "$; $LPT$ dà $" + lpt + "$.",
          "$z(I)=" + z + "$. The lower bound $\\max\\{\\max_jt_j,\\lceil\\sum_jt_j/m\\rceil\\}$ is $" + lb + "$; $LPT$ gives $" + lpt + "$."),
        _v: { dati: { t: t, m: m }, valori: bb.valori }
      };
    }
  });

  // ---- B4.29-30 lot sizing (cap. 8)
  add({
    id: "oc-g-ls-cost", livello: "facile", capitolo: "lot-sizing",
    link: L2("combinatorial-optimization-problems/lot-sizing/the-capacitated-lot-sizing-problem", "problemi-di-ottimizzazione-combinatoria/lot-sizing/il-problema-del-lot-sizing-capacitato", "box-1-defCLS"),
    genera: function (rng, lingua) {
      var m = 4, d = [], sc = [], vc = [], hc = []; for (var t = 0; t < m; t++) { d.push(ri(rng, 1, 6)); sc.push(ri(rng, 5, 20)); vc.push(ri(rng, 0, 2)); hc.push(ri(rng, 1, 3)); }
      var runs = [0]; for (t = 1; t < m; t++) if (rng() < 0.45) runs.push(t);
      var x = [0, 0, 0, 0]; runs.forEach(function (r, i) { var e = i + 1 < runs.length ? runs[i + 1] : m; for (var u = r; u < e; u++) x[r] += d[u]; });
      var cst = lsCost(d, x, sc, vc, hc), noh = lsCost(d, x, sc, vc, [0, 0, 0, 0]), allsc = cst + sum(sc) - runs.reduce(function (a, r) { return a + sc[r]; }, 0);
      var bb = build(rng, num(cst), [num(noh), num(allsc), num(lsCost(d, x, sc, [0, 0, 0, 0], hc)), num(cst + hc[0])]);
      if (!bb) return null;
      var tb = tab(["t", "1", "2", "3", "4"], [["d_t"].concat(d), ["x_t"].concat(x), ["sc_t"].concat(sc), ["vc_t"].concat(vc), ["hc_t"].concat(hc)]);
      return {
        testo: T(lingua, "Lot sizing su $4$ periodi, scorta iniziale nulla: domanda $d_t$, produzione $x_t$ del piano, costo di setup $sc_t$ (pagato solo se $x_t>0$), costo variabile $vc_t$ per unità prodotta e costo $hc_t$ per unità di scorta a fine periodo: " + tb + ". Quanto costa il piano?",
          "Lot sizing over $4$ periods, zero initial stock: demand $d_t$, production $x_t$ of the plan, setup cost $sc_t$ (paid only if $x_t>0$), variable cost $vc_t$ per unit produced and cost $hc_t$ per unit of stock at the end of a period: " + tb + ". What does the plan cost?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Setup, produzione e scorte sommano a $" + cst + "$. Senza i costi di scorta si avrebbe $" + noh + "$; pagare il setup in tutti i periodi dà $" + allsc + "$.",
          "Setups, production and stocks add up to $" + cst + "$. Without holding costs one would get $" + noh + "$; paying the setup in every period gives $" + allsc + "$."),
        _v: { dati: { d: d, x: x, sc: sc, vc: vc, hc: hc }, valori: bb.valori }
      };
    }
  });
  add({
    id: "oc-g-ls-lb", livello: "facile", capitolo: "lot-sizing",
    link: L2("combinatorial-optimization-problems/lot-sizing/the-capacitated-lot-sizing-problem", "problemi-di-ottimizzazione-combinatoria/lot-sizing/il-problema-del-lot-sizing-capacitato", "box-5-obs-cls-lb"),
    genera: function (rng, lingua) {
      var m = 5, cap = [], sc = []; for (var t = 0; t < m; t++) { cap.push(ri(rng, 15, 40)); sc.push(ri(rng, 30, 80)); }
      var D = ri(rng, Math.max.apply(null, cap) + 5, sum(cap) - 10);
      var cs = cap.slice().sort(function (a, b) { return b - a; }), k = 0, s = 0; while (s < D) { s += cs[k]; k++; }
      var ss = sc.slice().sort(function (a, b) { return a - b; }), lb = 0; for (t = 0; t < k; t++) lb += ss[t];
      var ca = cap.slice().sort(function (a, b) { return a - b; }), k2 = 0; s = 0; while (s < D) { s += ca[k2]; k2++; }
      var lb2 = 0; for (t = 0; t < k2; t++) lb2 += ss[t];
      var hi = 0; for (t = 0; t < k; t++) hi += ss[m - 1 - t];
      var bb = build(rng, num(lb), [num(lb2), num(hi), num(lb - ss[k - 1]), num(lb + ss[k])]);
      if (!bb) return null;
      var tb = tab(["t", "1", "2", "3", "4", "5"], [["cap_t"].concat(cap), ["sc_t"].concat(sc)]);
      return {
        testo: T(lingua, "Lot sizing con capacità (CLS) su $5$ periodi con domanda totale $D=" + D + "$, capacità produttive $cap_t$ e costi di setup $sc_t$ (pagati nei periodi in cui si produce), scorta iniziale nulla: " + tb + ". Il lower bound combinatorio somma i $k$ costi di setup più piccoli, con $k$ minimo numero di periodi le cui capacità coprono $D$. Quanto vale?",
          "Capacitated lot sizing (CLS) over $5$ periods with total demand $D=" + D + "$, production capacities $cap_t$ and setup costs $sc_t$ (paid in the periods with production), zero initial stock: " + tb + ". The combinatorial lower bound adds the $k$ smallest setup costs, with $k$ the minimum number of periods whose capacities cover $D$. What is it?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Con le capacità più grandi servono $k=" + k + "$ periodi; i $" + k + "$ setup più economici sommano a $" + lb + "$. Usare le capacità più piccole sovrastima $k$.",
          "With the largest capacities $k=" + k + "$ periods are needed; the $" + k + "$ cheapest setups add up to $" + lb + "$. Using the smallest capacities overestimates $k$."),
        _v: { dati: { cap: cap, sc: sc, D: D }, valori: bb.valori }
      };
    }
  });

  // ---- B4.31 bin packing: rilassamento lineare (cap. 10)
  add({
    id: "oc-g-bpp-lp", livello: "facile", capitolo: "bin-packing-formulations",
    link: L2("formulations/bin-packing-formulations/an-ilp-model-for-the-bin-packing-problem", "formulazioni/bin-packing-formulations/un-modello-pli-per-il-problema-del-bin-packing", "box-10-cor_lp_bpp_value"),
    genera: function (rng, lingua) {
      var n = 5, c = ri(rng, 8, 12), w = []; for (var j = 0; j < n; j++) w.push(ri(rng, 2, c - 1));
      var f = fr(sum(w), c), z = binsOpt(w, c);
      if (f.d === 1) return null;
      var key = function (a, b) { return { k: frKey(a) + "|" + b, t: "$" + frTex(a) + "$ " + T(lingua, "e", "and") + " $" + b + "$" }; };
      var bb = build(rng, key(f, z), [key(f, Math.ceil(sum(w) / c)), key(fr(n, 2), z), key(fr(sum(w), c * n), z), key(f, z + 1)]);
      if (!bb) return null;
      return {
        testo: T(lingua, "Bin packing con capacità $c=" + c + "$ e oggetti di peso $w=" + vec(w) + "$. Il rilassamento lineare $\\mathrm{LP}_{\\mathrm{BPP}}$ del modello con variabili $y_b$ (contenitore usato) e $x_{jb}$ (oggetto $j$ nel contenitore $b$) vale $\\sum_j w_j/c$. Quanto valgono $z(\\mathrm{LP}_{\\mathrm{BPP}})$ e il valore ottimo intero, nell'ordine?",
          "Bin packing with capacity $c=" + c + "$ and items of weight $w=" + vec(w) + "$. The LP relaxation $\\mathrm{LP}_{\\mathrm{BPP}}$ of the model with variables $y_b$ (bin used) and $x_{jb}$ (item $j$ in bin $b$) equals $\\sum_j w_j/c$. What are $z(\\mathrm{LP}_{\\mathrm{BPP}})$ and the optimal integer value, in this order?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "$z(\\mathrm{LP}_{\\mathrm{BPP}})=" + sum(w) + "/" + c + "=" + frTex(f) + "$ e il valore ottimo è $" + z + "$; il rilassamento arrotondato, $" + Math.ceil(sum(w) / c) + "$, è solo un lower bound.",
          "$z(\\mathrm{LP}_{\\mathrm{BPP}})=" + sum(w) + "/" + c + "=" + frTex(f) + "$ and the optimal value is $" + z + "$; the rounded relaxation, $" + Math.ceil(sum(w) / c) + "$, is only a lower bound."),
        _v: { dati: { w: w, c: c }, valori: bb.valori }
      };
    }
  });

  // ---- B4.32 P||Cmax: rilassamento lineare (cap. 14)
  add({
    id: "oc-g-pcmax-lp", livello: "media", capitolo: "pcmax-formulations",
    link: L2("formulations/pcmax-formulations/an-ilp-model-for-the-scheduling-on-identical-parallel-machin", "formulazioni/pcmax-formulations/un-modello-pli-per-il-problema-di-scheduling-su-macchine-par", "box-4-prop-LP0-PCMAX"),
    genera: function (rng, lingua) {
      var m = ri(rng, 2, 3), t = []; for (var j = 0; j < 5; j++) t.push(ri(rng, 1, 12));
      var f = fr(sum(t), m), z = pcmaxOpt(t, m);
      var key = function (a, b) { return { k: frKey(a) + "|" + b, t: "$" + frTex(a) + "$ " + T(lingua, "e", "and") + " $" + b + "$" }; };
      var bb = build(rng, key(f, z), [key(fr(Math.max.apply(null, t), 1), z), key(f, Math.ceil(sum(t) / m)), key(fr(sum(t), 1), z), key(f, z + 1)]);
      if (!bb) return null;
      return {
        testo: T(lingua, "Scheduling $P\\,||\\,C_{\\max}$ con $m=" + m + "$ macchine identiche e durate $t=" + vec(t) + "$. Il modello ha variabili binarie $x_{jh}$ (lavoro $j$ sulla macchina $h$) e la variabile $C_{\\max}\\ge\\sum_jt_jx_{jh}$. Quanto valgono il rilassamento lineare e il makespan ottimo, nell'ordine?",
          "Scheduling $P\\,||\\,C_{\\max}$ with $m=" + m + "$ identical machines and times $t=" + vec(t) + "$. The model has binary variables $x_{jh}$ (job $j$ on machine $h$) and the variable $C_{\\max}\\ge\\sum_jt_jx_{jh}$. What are the LP relaxation and the optimal makespan, in this order?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Il rilassamento divide i lavori in parti uguali: $\\sum_jt_j/m=" + frTex(f) + "$. Il makespan ottimo, con lavori indivisibili, è $" + z + "$.",
          "The relaxation splits the jobs equally: $\\sum_jt_j/m=" + frTex(f) + "$. The optimal makespan, with indivisible jobs, is $" + z + "$."),
        _v: { dati: { t: t, m: m }, valori: bb.valori }
      };
    }
  });

  // ---- B4.33 lot sizing: big-M (cap. 15)
  add({
    id: "oc-g-ls-bigm", livello: "facile", capitolo: "lot-sizing-formulations",
    link: L2("formulations/lot-sizing-formulations/ilp-models-for-the-capacitated-lot-sizing-problem", "formulazioni/lot-sizing-formulations/modelli-pli-per-il-problema-di-lot-sizing-capacitato", "sez-sec-lsf-bigM"),
    genera: function (rng, lingua) {
      var m = 5, d = [], cap = []; for (var t = 0; t < m; t++) { d.push(ri(rng, 5, 30)); cap.push(ri(rng, 20, 70)); }
      var tt = ri(rng, 2, 4), D = 0; for (t = tt - 1; t < m; t++) D += d[t];
      var M = Math.min(cap[tt - 1], D);
      var bb = build(rng, num(M), [num(Math.max(cap[tt - 1], D)), num(Math.min(cap[tt - 1], sum(d))), num(Math.min(cap[tt - 1], d[tt - 1])), num(D)]);
      if (!bb) return null;
      var tb = tab(["t", "1", "2", "3", "4", "5"], [["d_t"].concat(d), ["cap_t"].concat(cap)]);
      return {
        testo: T(lingua, "Lot sizing con capacità (CLS) su $5$ periodi, scorta finale nulla: " + tb + ". Nella formulazione big-M la produzione e il setup sono legati da $x_t\\le M_t\\,y_t$, e il valore più forte valido è $M_t=\\min\\{cap_t,\\ D_{t,5}\\}$, con $D_{t,5}$ domanda dei periodi da $t$ a $5$. Quanto vale $M_" + tt + "$?",
          "Capacitated lot sizing (CLS) over $5$ periods, zero final stock: " + tb + ". In the big-M formulation production and setup are linked by $x_t\\le M_t\\,y_t$, and the strongest valid value is $M_t=\\min\\{cap_t,\\ D_{t,5}\\}$, with $D_{t,5}$ the demand of periods $t$ to $5$. What is $M_" + tt + "$?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "$D_{" + tt + ",5}=" + D + "$ e $cap_" + tt + "=" + cap[tt - 1] + "$, quindi $M_" + tt + "=" + M + "$. Un valore più grande è valido ma indebolisce il rilassamento lineare.",
          "$D_{" + tt + ",5}=" + D + "$ and $cap_" + tt + "=" + cap[tt - 1] + "$, hence $M_" + tt + "=" + M + "$. A larger value is valid but weakens the LP relaxation."),
        _v: { dati: { d: d, cap: cap, t: tt }, valori: bb.valori }
      };
    }
  });
  // ---- B4.34 lot sizing: setup pagato dal rilassamento (cap. 15)
  add({
    id: "oc-g-ls-lpsetup", livello: "facile", capitolo: "lot-sizing-formulations",
    link: L2("formulations/lot-sizing-formulations/ilp-models-for-the-capacitated-lot-sizing-problem", "formulazioni/lot-sizing-formulations/modelli-pli-per-il-problema-di-lot-sizing-capacitato", "box-2-ex-CLS-ILP"),
    genera: function (rng, lingua) {
      var M1 = ri(rng, 20, 60), M2 = M1 + ri(rng, 10, 60), x = ri(rng, 3, M1 - 1), sc = ri(rng, 20, 100);
      var f1 = fr(sc * x, M1), f2 = fr(sc * x, M2);
      var key = function (a, b) { return { k: frKey(a) + "|" + frKey(b), t: "$" + frTex(a) + "$ " + T(lingua, "e", "and") + " $" + frTex(b) + "$" }; };
      var bb = build(rng, key(f1, f2), [key(f2, f1), key(fr(sc, 1), fr(sc, 1)), key(fr(x * M1, sc), fr(x * M2, sc)), key(f1, f1)]);
      if (!bb) return null;
      return {
        testo: T(lingua, "Nel rilassamento lineare della formulazione big-M del lot sizing ($x_t\\le M_t\\,y_t$, $0\\le y_t\\le 1$, costo di setup $sc_t\\,y_t$) si produce $x_t=" + x + "$ con $sc_t=" + sc + "$. Quanto paga di setup, al minimo, con $M_t=" + M1 + "$ e con $M_t=" + M2 + "$?",
          "In the LP relaxation of the big-M lot sizing formulation ($x_t\\le M_t\\,y_t$, $0\\le y_t\\le 1$, setup cost $sc_t\\,y_t$) the production is $x_t=" + x + "$ with $sc_t=" + sc + "$. How much setup does it pay at least, with $M_t=" + M1 + "$ and with $M_t=" + M2 + "$?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Il vincolo dà $y_t\\ge x_t/M_t$, e il rilassamento paga $sc_t\\,x_t/M_t$: $" + frTex(f1) + "$ e $" + frTex(f2) + "$. Un big-M più grande fa pagare meno setup al rilassamento, cioè lo indebolisce.",
          "The constraint gives $y_t\\ge x_t/M_t$, and the relaxation pays $sc_t\\,x_t/M_t$: $" + frTex(f1) + "$ and $" + frTex(f2) + "$. A larger big-M makes the relaxation pay less setup, i.e., weakens it."),
        _v: { dati: { M1: M1, M2: M2, x: x, sc: sc }, valori: bb.valori }
      };
    }
  });
  // ---- B4.35 bin packing: rilassamento arrotondato e rapporto (cap. 10)
  add({
    id: "oc-g-bpp-lpgap", livello: "media", capitolo: "bin-packing-formulations",
    link: L2("formulations/bin-packing-formulations/an-ilp-model-for-the-bin-packing-problem", "formulazioni/bin-packing-formulations/un-modello-pli-per-il-problema-del-bin-packing", "box-11-prop_lp_bpp_ratio_half"),
    genera: function (rng, lingua) {
      var c = ri(rng, 10, 20), n = ri(rng, 3, 6), w = []; for (var j = 0; j < n; j++) w.push(Math.floor(c / 2) + ri(rng, 1, Math.max(1, Math.floor(c / 4))));
      var z = n, lpc = Math.ceil(sum(w) / c), r = fr(lpc, z);
      var bb = build(rng, numF(r), [numF(fr(sum(w), c * z)), numF(fr(1, 2)), numF(fr(z, lpc)), numF(fr(lpc + 1, z))]);
      if (!bb || lpc === z) return null;
      return {
        testo: T(lingua, "Bin packing con capacità $c=" + c + "$ e $" + n + "$ oggetti di peso $w=" + vec(w) + "$, tutti maggiori di $c/2$. Il rilassamento lineare del modello vale $\\sum_j w_j/c$. Quanto vale il rapporto $\\lceil z(\\mathrm{LP}_{\\mathrm{BPP}})\\rceil/z(\\mathrm{ILP}_{\\mathrm{BPP}})$?",
          "Bin packing with capacity $c=" + c + "$ and $" + n + "$ items of weight $w=" + vec(w) + "$, all larger than $c/2$. The LP relaxation of the model equals $\\sum_j w_j/c$. What is the ratio $\\lceil z(\\mathrm{LP}_{\\mathrm{BPP}})\\rceil/z(\\mathrm{ILP}_{\\mathrm{BPP}})$?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Due oggetti più pesanti di $c/2$ non stanno insieme, quindi l'ottimo è $" + z + "$; $\\lceil " + sum(w) + "/" + c + "\\rceil=" + lpc + "$. Il rapporto $" + frTex(r) + "$ è almeno $\\frac12$, come garantito.",
          "Two items heavier than $c/2$ do not fit together, so the optimum is $" + z + "$; $\\lceil " + sum(w) + "/" + c + "\\rceil=" + lpc + "$. The ratio $" + frTex(r) + "$ is at least $\\frac12$, as guaranteed."),
        _v: { dati: { w: w, c: c }, valori: bb.valori }
      };
    }
  });
  // ---- B4.36 P||Cmax: rapporto rilassamento/ottimo (cap. 14)
  add({
    id: "oc-g-pcmax-lpratio", livello: "facile", capitolo: "pcmax-formulations",
    link: L2("formulations/pcmax-formulations/an-ilp-model-for-the-scheduling-on-identical-parallel-machin", "formulazioni/pcmax-formulations/un-modello-pli-per-il-problema-di-scheduling-su-macchine-par", "box-7-prop-PCMAX-ratio"),
    genera: function (rng, lingua) {
      var m = ri(rng, 2, 4), T0 = ri(rng, 10, 30), t = [T0]; for (var j = 0; j < 3; j++) t.push(ri(rng, 1, 3));
      var z = pcmaxOpt(t, m), r = fr(sum(t), m * z);
      var bb = build(rng, numF(r), [numF(fr(1, m)), numF(fr(m * z, sum(t))), numF(fr(sum(t), z)), numF(fr(T0, sum(t)))]);
      if (!bb) return null;
      return {
        testo: T(lingua, "Scheduling $P\\,||\\,C_{\\max}$ con $m=" + m + "$ macchine identiche e durate $t=" + vec(t) + "$. Il rilassamento lineare del modello con variabili di assegnamento vale $\\frac1m\\sum_jt_j$. Quanto vale il rapporto fra il rilassamento e il makespan ottimo?",
          "Scheduling $P\\,||\\,C_{\\max}$ with $m=" + m + "$ identical machines and times $t=" + vec(t) + "$. The LP relaxation of the model with assignment variables equals $\\frac1m\\sum_jt_j$. What is the ratio between the relaxation and the optimal makespan?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Il lavoro di durata $" + T0 + "$ domina: il makespan ottimo è $" + z + "$, il rilassamento $\\frac{" + sum(t) + "}{" + m + "}$. Il rapporto $" + frTex(r) + "$ è almeno $\\frac1m=" + frTex(fr(1, m)) + "$, e vi si avvicina con un lavoro lungo e lavori brevi.",
          "The job of length $" + T0 + "$ dominates: the optimal makespan is $" + z + "$, the relaxation $\\frac{" + sum(t) + "}{" + m + "}$. The ratio $" + frTex(r) + "$ is at least $\\frac1m=" + frTex(fr(1, m)) + "$, and gets close to it with one long job and short ones."),
        _v: { dati: { t: t, m: m }, valori: bb.valori }
      };
    }
  });

  // ---- B4.47 branch-and-bound KP: figlio «down» (cap. 16)
  add({
    id: "oc-g-kp-bbdown", livello: "facile", capitolo: "knapsack-branch-and-bound",
    link: L2("specialized-algorithms/knapsack-branch-and-bound", "algoritmi-specializzati/knapsack-branch-and-bound", "box-1-def-LPKPk"),
    genera: function (rng, lingua) {
      var n = 5, p = [], w = [];
      for (var j = 0; j < n; j++) { w.push(ri(rng, 2, 8)); p.push(ri(rng, 4, 20)); }
      var o = effOrder(p, w); p = o.map(function (i) { return p[i]; }); w = o.map(function (i) { return w[i]; });
      for (j = 1; j < n; j++) if (p[j] * w[j - 1] === p[j - 1] * w[j]) return null;
      var c = ri(rng, 10, 18), sp = split(range1(n).map(function (i) { return i - 1; }), w, c);
      if (sp.s <= 0 || sp.s >= n - 1 || sp.rc === 0) return null;
      var s = sp.s, rest = range1(n).map(function (i) { return i - 1; }).filter(function (i) { return i !== s; });
      var lpv = function (cap, items, pk) { var tot = 0, val = fr(pk, 1); for (var q = 0; q < items.length; q++) { var i = items[q]; if (tot + w[i] > cap) return frAdd(val, fr(p[i] * (cap - tot), w[i])); tot += w[i]; val = frAdd(val, fr(p[i], 1)); } return val; };
      var dn = lpv(c, rest, 0), up = lpv(c - w[s], rest, p[s]), root = lpv(c, range1(n).map(function (i) { return i - 1; }), 0);
      var bb = build(rng, numF(dn), [numF(up), numF(root), num(Math.floor(dn.n / dn.d)), numF(lpv(c, rest.slice(0, rest.length - 1), 0))]);
      if (!bb) return null;
      return {
        testo: T(lingua, "Branch-and-bound per lo zaino 0-1 con capacità $c=" + c + "$ e oggetti ordinati per efficienza non crescente: " + itemTab(lingua, p, w) + ". Alla radice l'oggetto critico è $s=" + (s + 1) + "$ (il primo che non entra per intero). Quanto vale il rilassamento lineare del figlio con $x_{" + (s + 1) + "}=0$, risolto con le formule di Dantzig sugli altri oggetti?",
          "Branch-and-bound for the 0-1 knapsack with capacity $c=" + c + "$ and items sorted by non-increasing efficiency: " + itemTab(lingua, p, w) + ". At the root the split item is $s=" + (s + 1) + "$ (the first not fitting entirely). What is the LP relaxation of the child with $x_{" + (s + 1) + "}=0$, solved by Dantzig's formulas on the other items?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Senza l'oggetto $" + (s + 1) + "$ si riempie lo zaino con gli altri in ordine di efficienza: $" + frTex(dn) + "$. Il figlio con $x_{" + (s + 1) + "}=1$ vale $" + frTex(up) + "$ e la radice $" + frTex(root) + "$.",
          "Without item $" + (s + 1) + "$ the knapsack is filled with the others by efficiency: $" + frTex(dn) + "$. The child with $x_{" + (s + 1) + "}=1$ is worth $" + frTex(up) + "$ and the root $" + frTex(root) + "$."),
        _v: { dati: { p: p, w: w, c: c }, valori: bb.valori }
      };
    }
  });

  // ---- B4.48-49 branch-and-bound DSATUR (cap. 17)
  add({
    id: "oc-g-dsbb-bounds", livello: "facile", capitolo: "dsatur-branch-and-bound",
    link: L2("specialized-algorithms/dsatur-branch-and-bound", "algoritmi-specializzati/dsatur-branch-and-bound", "sez-sec-DSATURBBbounds"),
    genera: function (rng, lingua) {
      var G = graphQ(rng, 7, 0.45); if (!G) return null;
      var dg = degs(7, G.E), K = greedyClique(7, G.A, dg), U = dsatur(G.adj, 7).nc, om = cliqueNum(7, G.A, false);
      var bb = build(rng, pairKey(K.length, U), [pairKey(om === K.length ? K.length + 1 : om, U), pairKey(U, K.length), pairKey(K.length, U + 1), pairKey(K.length - 1, U)]);
      if (!bb) return null;
      return {
        testo: gTxt(lingua, G) + T(lingua, " Nel branch-and-bound DSATUR, il lower bound è la cardinalità di una clique greedy (vertici per grado non crescente, a parità indice minore; un vertice entra se è adiacente a tutti quelli già scelti) e l'upper bound è il numero di colori di $DSATUR$ (vertice di saturazione massima, pari merito: più vicini non colorati, poi indice minore; colore più piccolo libero). Quanto valgono, nell'ordine?",
          " In the DSATUR branch-and-bound, the lower bound is the size of a greedy clique (vertices by non-increasing degree, ties smallest index; a vertex enters if adjacent to all those already chosen) and the upper bound is the number of colors of $DSATUR$ (vertex of maximum saturation, ties: more uncolored neighbours, then smallest index; smallest free color). What are they, in this order?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "La clique greedy è $" + set(K) + "$, quindi $\\mathrm{LB}=" + K.length + "$; $DSATUR$ usa $" + U + "$ colori, quindi $\\mathrm{UB}=" + U + "$. Se i due valori coincidono, l'algoritmo si ferma subito.",
          "The greedy clique is $" + set(K) + "$, hence $\\mathrm{LB}=" + K.length + "$; $DSATUR$ uses $" + U + "$ colors, hence $\\mathrm{UB}=" + U + "$. If the two values coincide, the algorithm stops at once."),
        _v: { dati: { n: 7, E: G.E }, valori: bb.valori }
      };
    }
  });
  add({
    id: "oc-g-dsbb-branch", livello: "media", capitolo: "dsatur-branch-and-bound",
    link: L2("specialized-algorithms/dsatur-branch-and-bound", "algoritmi-specializzati/dsatur-branch-and-bound", "sez-sec-DSATURBBbranch"),
    genera: function (rng, lingua) {
      var G = graphQ(rng, 7, 0.45); if (!G) return null;
      var col = new Array(8).fill(0), ord = shuffle(rng, range1(7)).slice(0, 3);
      ord.forEach(function (v) { var U = {}; G.adj[v].forEach(function (u) { if (col[u]) U[col[u]] = 1; }); var c = 1; while (U[c]) c++; col[v] = c; });
      var q = Math.max.apply(null, col), best = -1, bs = -1, bd = -1, info = {};
      for (var v = 1; v <= 7; v++) {
        if (col[v]) continue;
        var S = {}, ns = 0, du = 0; G.adj[v].forEach(function (u) { if (col[u]) { if (!S[col[u]]) { S[col[u]] = 1; ns++; } } else du++; });
        info[v] = { s: ns, du: du };
        if (ns > bs || (ns === bs && du > bd)) { best = v; bs = ns; bd = du; }
      }
      var ch = q - bs + 1;
      var other = -1; for (v = 1; v <= 7; v++) if (!col[v] && v !== best && (other < 0 || G.adj[v].length > G.adj[other].length)) other = v;
      var bb = build(rng, pairKey(best, ch, "v=" + best, ch), [pairKey(best, ch - 1, "v=" + best, ch - 1), pairKey(other, other > 0 ? q - info[other].s + 1 : 0, "v=" + other, other > 0 ? q - info[other].s + 1 : 0), pairKey(best, q, "v=" + best, q), pairKey(best, ch + 1, "v=" + best, ch + 1)]);
      if (!bb) return null;
      var pc = ord.map(function (u) { return "col(" + u + ")=" + col[u]; }).join(",\\ ");
      return {
        testo: gTxt(lingua, G) + T(lingua, " Nel branch-and-bound DSATUR, il nodo corrente è la colorazione parziale $" + pc + "$ (gli altri vertici non sono colorati), con $q=" + q + "$ colori. Si ramifica sul vertice non colorato di grado di saturazione massimo (colori diversi fra i vicini colorati; pari merito: più vicini non colorati, poi indice minore), con un figlio per ogni colore usato ammesso più uno con il nuovo colore $q+1$. Su quale vertice si ramifica e quanti figli ha il nodo?",
          " In the DSATUR branch-and-bound, the current node is the partial coloring $" + pc + "$ (the other vertices are uncolored), with $q=" + q + "$ colors. It branches on the uncolored vertex of maximum saturation degree (distinct colors among colored neighbours; ties: more uncolored neighbours, then smallest index), with one child per allowed used color plus one with the new color $q+1$. On which vertex does it branch and how many children does the node have?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Il vertice $" + best + "$ ha saturazione $" + bs + "$, la massima; i colori usati ammessi sono $q-" + bs + "=" + (q - bs) + "$, più il nuovo colore: $" + ch + "$ figli.",
          "Vertex $" + best + "$ has saturation $" + bs + "$, the largest; the allowed used colors are $q-" + bs + "=" + (q - bs) + "$, plus the new color: $" + ch + "$ children."),
        _v: { dati: { n: 7, E: G.E, col: col }, valori: bb.valori }
      };
    }
  });
  // ================================================================ COMPLESSA (7 novembre 2026): uno o due per parte
  // ---- C1. colorazione: omega, bound degli stabili e numero cromatico (parte 1, cap. 4) — complessa
  add({
    id: "oc-g-vcp-full", livello: "complessa", capitolo: "coloring",
    link: L2("combinatorial-optimization-problems/coloring/the-vertex-coloring-problem", "problemi-di-ottimizzazione-combinatoria/coloring/il-problema-della-colorazione-dei-vertici", "box-6-obs-clique-bound"),
    genera: function (rng, lingua) {
      var n = 7, G = graphQ(rng, n, 0.45); if (!G) return null;
      var om = cliqueNum(n, G.A, false), al = cliqueNum(n, G.A, true), sb = Math.ceil(n / al), ch = chromatic(n, G.A);
      if (ch === om && ch === sb) { if (rng() < 0.6) return null; }
      var ds = dsatur(G.adj, n).nc, D = Math.max.apply(null, degs(n, G.E));
      var key = function (a, b, c2) { return { k: a + "|" + b + "|" + c2, t: "$\\omega(G)=" + a + "$, $\\lceil n/\\alpha(G)\\rceil=" + b + "$, $\\chi(G)=" + c2 + "$" }; };
      var b = build(rng, key(om, sb, ch), [key(om, sb, ch + 1), key(al, Math.ceil(n / om), ch), key(om, Math.floor(n / al), ch),
        key(om, sb, Math.max(ds, D + 1)), key(om + 1, sb, ch), key(om, sb, Math.max(om, sb))]);
      if (!b) return null;
      return {
        testo: gTxt(lingua, G) + T(lingua, " Nella colorazione dei vertici (VCP), $\\omega(G)$ è il numero di clique, $\\alpha(G)$ il numero di stabilità e $\\chi(G)$ il numero cromatico; $\\omega(G)$ e $\\lceil n/\\alpha(G)\\rceil$ sono lower bound su $\\chi(G)$. Quanto valgono le tre grandezze?",
          " In vertex coloring (VCP), $\\omega(G)$ is the clique number, $\\alpha(G)$ the stability number and $\\chi(G)$ the chromatic number; $\\omega(G)$ and $\\lceil n/\\alpha(G)\\rceil$ are lower bounds on $\\chi(G)$. What are the three quantities?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "Una clique massima ha $" + om + "$ vertici e un insieme stabile massimo $" + al + "$, quindi $\\lceil 7/" + al + "\\rceil=" + sb + "$. Una colorazione con $" + ch + "$ colori esiste e nessuna con meno: $\\chi(G)=" + ch + "$." + (ch > Math.max(om, sb) ? " Qui entrambi i lower bound lasciano un gap." : ""),
          "A maximum clique has $" + om + "$ vertices and a maximum stable set $" + al + "$, hence $\\lceil 7/" + al + "\\rceil=" + sb + "$. A coloring with $" + ch + "$ colors exists and none with fewer: $\\chi(G)=" + ch + "$." + (ch > Math.max(om, sb) ? " Here both lower bounds leave a gap." : "")),
        _v: { dati: { n: n, E: G.E }, valori: b.valori }
      };
    }
  });

  // ---- C2. zaino: bound di Dantzig, bound di Martello-Toth e ottimo (parte 2, cap. 9) — complessa
  add({
    id: "oc-g-kp-bounds-full", livello: "complessa", capitolo: "knapsack-formulations",
    link: L2("formulations/knapsack-formulations/an-ilp-model-for-the-0-1-knapsack-problem", "formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-0-1", "box-18-propMT"),
    genera: function (rng, lingua) {
      var n = 6, p = [], w = [];
      for (var j = 0; j < n; j++) { w.push(ri(rng, 2, 9)); p.push(ri(rng, 3, 20)); }
      var o = effOrder(p, w); p = o.map(function (i) { return p[i]; }); w = o.map(function (i) { return w[i]; });
      for (j = 1; j < n; j++) if (p[j] * w[j - 1] === p[j - 1] * w[j]) return null;
      var c = ri(rng, 12, 24); if (Math.max.apply(null, w) > c) return null;
      var sp = split(range1(n).map(function (i) { return i - 1; }), w, c);
      var s = sp.s, rc = sp.rc; if (s < 1 || s > n - 2 || rc === 0) return null;
      var P = 0; for (j = 0; j < s; j++) P += p[j];
      var UBD = P + Math.floor(p[s] * rc / w[s]);
      var UB0 = P + Math.floor(rc * p[s + 1] / w[s + 1]);
      var UB1 = P + Math.floor((p[s] * w[s - 1] - (w[s] - rc) * p[s - 1]) / w[s - 1]);
      var UBMT = Math.max(UB0, UB1), z = kpOptSets(p, w, c).z;
      var g = greedyOrder(range1(n).map(function (i) { return i - 1; }), p, w, c).z;
      var key = function (a, b2, c2) { return { k: a + "|" + b2 + "|" + c2, t: "$\\UB_{\\mathrm{D}}=" + a + "$, $\\UB_{\\mathrm{MT}}=" + b2 + "$, $z=" + c2 + "$" }; };
      var b = build(rng, key(UBD, UBMT, z), [key(UBD, Math.min(UB0, UB1), z), key(UBD, UBMT, g), key(UBD + 1, UBMT, z), key(UBD, UB0 + UB1 - P, z), key(UBD, UBMT, z + 1), key(P + p[s], UBMT, z)]);
      if (!b) return null;
      return {
        testo: T(lingua, "Zaino 0/1 con capacità $c=" + c + "$ e oggetti ordinati per efficienza $p_j/w_j$ non crescente: " + itemTab(lingua, p, w) + ". Sia $s$ l'oggetto critico (il primo che non entra aggiungendo gli oggetti in ordine) e $\\mathit{rc}$ la capacità residua. Il bound di Dantzig è $\\UB_{\\mathrm{D}}=\\sum_{j<s}p_j+\\lfloor p_s\\,\\mathit{rc}/w_s\\rfloor$; quello di Martello-Toth è $\\max\\{\\UB_0,\\UB_1\\}$ con $\\UB_0=\\sum_{j<s}p_j+\\lfloor\\mathit{rc}\\,p_{s+1}/w_{s+1}\\rfloor$ e $\\UB_1=\\sum_{j<s}p_j+\\lfloor p_s-(w_s-\\mathit{rc})\\,p_{s-1}/w_{s-1}\\rfloor$. Quanto valgono i due bound e il valore ottimo $z$?",
          "0/1 knapsack with capacity $c=" + c + "$ and items sorted by non-increasing efficiency $p_j/w_j$: " + itemTab(lingua, p, w) + ". Let $s$ be the split item (the first one not fitting when adding the items in order) and $\\mathit{rc}$ the residual capacity. The Dantzig bound is $\\UB_{\\mathrm{D}}=\\sum_{j<s}p_j+\\lfloor p_s\\,\\mathit{rc}/w_s\\rfloor$; the Martello-Toth bound is $\\max\\{\\UB_0,\\UB_1\\}$ with $\\UB_0=\\sum_{j<s}p_j+\\lfloor\\mathit{rc}\\,p_{s+1}/w_{s+1}\\rfloor$ and $\\UB_1=\\sum_{j<s}p_j+\\lfloor p_s-(w_s-\\mathit{rc})\\,p_{s-1}/w_{s-1}\\rfloor$. What are the two bounds and the optimal value $z$?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "$s=" + (s + 1) + "$, $\\mathit{rc}=" + rc + "$, $\\sum_{j<s}p_j=" + P + "$: $\\UB_{\\mathrm{D}}=" + UBD + "$, $\\UB_0=" + UB0 + "$, $\\UB_1=" + UB1 + "$, quindi $\\UB_{\\mathrm{MT}}=" + UBMT + "\\le\\UB_{\\mathrm{D}}$. L'enumerazione dà $z=" + z + "$ (il greedy dà $" + g + "$).",
          "$s=" + (s + 1) + "$, $\\mathit{rc}=" + rc + "$, $\\sum_{j<s}p_j=" + P + "$: $\\UB_{\\mathrm{D}}=" + UBD + "$, $\\UB_0=" + UB0 + "$, $\\UB_1=" + UB1 + "$, hence $\\UB_{\\mathrm{MT}}=" + UBMT + "\\le\\UB_{\\mathrm{D}}$. Enumeration gives $z=" + z + "$ (the greedy gives $" + g + "$)."),
        _v: { dati: { p: p, w: w, c: c }, valori: b.valori }
      };
    }
  });

//@@BATCH3@@
})();
