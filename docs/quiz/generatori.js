// Autovalutazione — domande generate del modulo «Ottimizzazione combinatoria» (combinatorial-optimization).
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
  function kpOpt(p, w, c) { // DP v(j,k); restituisce tabella
    var n = p.length, v = [];
    for (var j = 0; j <= n; j++) { v.push([]); for (var k = 0; k <= c; k++) v[j].push(0); }
    for (j = 1; j <= n; j++) for (k = 1; k <= c; k++) {
      v[j][k] = v[j - 1][k];
      if (w[j - 1] <= k && p[j - 1] + v[j - 1][k - w[j - 1]] > v[j][k]) v[j][k] = p[j - 1] + v[j - 1][k - w[j - 1]];
    }
    return v;
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
  function ukp(p, w, c) { var v = [0]; for (var k = 1; k <= c; k++) { var b = 0; for (var j = 0; j < p.length; j++) if (w[j] <= k && p[j] + v[k - w[j]] > b) b = p[j] + v[k - w[j]]; v.push(b); } return v; }
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
  // ---- 5. una cella della tabella v(j,k) della PD per il KP (cap. 17)
  add({
    id: "oc-g-kp-dp-cella", livello: "facile", capitolo: "dp-knapsack",
    link: L("dynamic-programming/dp-knapsack/a-first-dp-algorithm/#box-16-texkpbu",
            "programmazione-dinamica/dp-knapsack/un-primo-algoritmo-di-pd/#box-16-texkpbu"),
    genera: function (rng, lingua) {
      var n = 4, p = [], w = [];
      for (var j = 0; j < n; j++) { w.push(ri(rng, 2, 6)); p.push(ri(rng, 3, 12)); }
      var c = ri(rng, 8, 11), k = ri(rng, 5, c), jj = 3;
      var v = kpOpt(p, w, c), x = v[jj][k];
      var rep = ukp(p.slice(0, jj), w.slice(0, jj), k)[k];
      var b = build(rng, num(x), [num(v[jj - 1][k]), num(v[jj][k - 1]), num(rep), num(v[jj][k] + p[jj])]);
      if (!b) return null;
      return {
        testo: T(lingua, "Problema dello zaino 0-1 (KP) con oggetti " + itemTab(lingua, p, w) + " e capacità $c=" + c + "$; $v(j,k)$ è il massimo profitto con gli oggetti $1,\\dots,j$ e capacità $k$, con $v(0,k)=0$. Con la ricorsione $v(j,k)=\\max\\{v(j-1,k),\\,p_j+v(j-1,k-w_j)\\}$ (il secondo termine solo se $w_j\\le k$), quanto vale $v(" + jj + "," + k + ")$?",
          "0-1 knapsack problem (KP) with items " + itemTab(lingua, p, w) + " and capacity $c=" + c + "$; $v(j,k)$ is the largest profit with items $1,\\dots,j$ and capacity $k$, with $v(0,k)=0$. With the recursion $v(j,k)=\\max\\{v(j-1,k),\\,p_j+v(j-1,k-w_j)\\}$ (the second term only if $w_j\\le k$), what is $v(" + jj + "," + k + ")$?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "$v(" + jj + "," + k + ")$ è il profitto massimo con gli oggetti $\\{1,2,3\\}$ e capacità $" + k + "$: vale $" + x + "$. Ogni oggetto si usa al più una volta (con ripetizioni si otterrebbe $" + rep + "$, il valore dello zaino illimitato).",
          "$v(" + jj + "," + k + ")$ is the largest profit with the items $\\{1,2,3\\}$ and capacity $" + k + "$: it is $" + x + "$. Each item is used at most once (with repetitions one would get $" + rep + "$, the value of the unbounded knapsack)."),
        _v: { dati: { p: p, w: w, c: c, j: jj, k: k }, valori: b.valori }
      };
    }
  });

  // ---- 6. PD per lo zaino illimitato (cap. 18)
  add({
    id: "oc-g-ukp-dp", livello: "facile", capitolo: "dp-unbounded-knapsack",
    link: L("dynamic-programming/dp-unbounded-knapsack/a-first-dp-algorithm/#box-14-texukpbu",
            "programmazione-dinamica/dp-unbounded-knapsack/un-primo-algoritmo-di-pd/#box-14-texukpbu"),
    genera: function (rng, lingua) {
      var n = 3, p = [], w = [];
      for (var j = 0; j < n; j++) { w.push(ri(rng, 2, 7)); p.push(w[j] * ri(rng, 1, 3) + ri(rng, 0, 4)); }
      var c = ri(rng, 9, 14), v = ukp(p, w, c), x = v[c];
      var o = effOrder(p, w), rc = c, g = 0;
      o.forEach(function (i) { var q = Math.floor(rc / w[i]); g += q * p[i]; rc -= q * w[i]; });
      var kp = kpOpt(p, w, c)[n][c];
      var single = 0; for (j = 0; j < n; j++) single = Math.max(single, Math.floor(c / w[j]) * p[j]);
      var b = build(rng, num(x), [num(kp), num(g), num(single), num(v[c - 1])]);
      if (!b) return null;
      return {
        testo: T(lingua, "Zaino illimitato (UKP): $n=3$ tipi di oggetto, ciascuno disponibile in copie illimitate, " + itemTab(lingua, p, w) + ", capacità $c=" + c + "$. $v(k)$ è il massimo profitto con capacità $k$: $v(0)=0$ e $v(k)=\\max_{j:\\,w_j\\le k}\\{p_j+v(k-w_j)\\}$ (uguale a $0$ se nessun tipo entra). Quanto vale $v(" + c + ")$?",
          "Unbounded knapsack (UKP): $n=3$ item types, each available in unlimited copies, " + itemTab(lingua, p, w) + ", capacity $c=" + c + "$. $v(k)$ is the largest profit with capacity $k$: $v(0)=0$ and $v(k)=\\max_{j:\\,w_j\\le k}\\{p_j+v(k-w_j)\\}$ (equal to $0$ if no type fits). What is $v(" + c + ")$?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "La tabella dà $v(" + c + ")=" + x + "$. Ogni tipo può essere usato più volte: il valore $" + kp + "$ è quello del KP 0/1, e il greedy per efficienza con ripetizioni ($" + g + "$) non è in generale ottimo.",
          "The table gives $v(" + c + ")=" + x + "$. Each type can be used several times: the value $" + kp + "$ is that of the 0/1 KP, and the greedy by efficiency with repetitions ($" + g + "$) is not optimal in general."),
        _v: { dati: { p: p, w: w, c: c }, valori: b.valori }
      };
    }
  });

  // ---- 7. PD per il subset sum (cap. 20)
  add({
    id: "oc-g-ssp-dp", livello: "facile", capitolo: "dp-subset-sum",
    link: L("dynamic-programming/dp-subset-sum/#box-12-texsspbu", "programmazione-dinamica/dp-subset-sum/#box-12-texsspbu"),
    genera: function (rng, lingua) {
      var n = 5, w = [];
      for (var j = 0; j < n; j++) w.push(ri(rng, 3, 14));
      var c = ri(rng, 15, 28);
      if (sum(w) <= c) return null;
      var r = [true]; for (var k = 1; k <= c; k++) r.push(false);
      w.forEach(function (x) { for (var k2 = c; k2 >= x; k2--) if (r[k2 - x]) r[k2] = true; });
      var best = c; while (!r[best]) best--;
      if (best === c) return null;
      var second = best - 1; while (!r[second]) second--;
      var gd = 0; decOrder(w).forEach(function (i) { if (gd + w[i] <= c) gd += w[i]; });
      var gi = 0; decOrder(w).reverse().forEach(function (i) { if (gi + w[i] <= c) gi += w[i]; });
      var g1 = 0; w.forEach(function (x) { if (g1 + x <= c) g1 += x; });
      var b = build(rng, num(best), [num(gd), num(g1), num(gi), num(c), num(second)]);
      if (!b) return null;
      return {
        testo: T(lingua, "Subset sum: pesi $w=" + vec(w) + "$ e valore obiettivo $c=" + c + "$. $r(j,k)$ è vero se un sottoinsieme dei primi $j$ pesi ha somma esattamente $k$: $r(0,0)$ vero, $r(0,k)$ falso per $k\\ge 1$, e $r(j,k)=r(j-1,k)\\lor r(j-1,k-w_j)$ (il secondo termine solo se $w_j\\le k$). Qual è il più grande $k\\le c$ con $r(5,k)=\\textit{true}$?",
          "Subset sum: weights $w=" + vec(w) + "$ and target $c=" + c + "$. $r(j,k)$ is true if some subset of the first $j$ weights sums to exactly $k$: $r(0,0)$ true, $r(0,k)$ false for $k\\ge 1$, and $r(j,k)=r(j-1,k)\\lor r(j-1,k-w_j)$ (the second term only if $w_j\\le k$). What is the largest $k\\le c$ with $r(5,k)=\\textit{true}$?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "Le somme raggiungibili non superiori a $" + c + "$ hanno massimo $" + best + "$; $c=" + c + "$ non è raggiungibile. Le scelte greedy (per peso decrescente: $" + gd + "$) non garantiscono il massimo.",
          "The reachable sums not larger than $" + c + "$ have maximum $" + best + "$; $c=" + c + "$ is not reachable. The greedy choices (by non-increasing weight: $" + gd + "$) do not guarantee the maximum."),
        _v: { dati: { w: w, c: c }, valori: b.valori }
      };
    }
  });

  // ---- 8. PD per il cambio monete (cap. 27)
  add({
    id: "oc-g-ccp-dp", livello: "facile", capitolo: "dp-coin-change",
    link: L("dynamic-programming/dp-coin-change/#box-13-texccpbu", "programmazione-dinamica/dp-coin-change/#box-13-texccpbu"),
    genera: function (rng, lingua) {
      var a = ri(rng, 3, 6), b2 = ri(rng, a + 2, 12), w = [1, a, b2], c = ri(rng, 12, 30);
      var v = [0]; for (var k = 1; k <= c; k++) { var m = Infinity; w.forEach(function (x) { if (x <= k && v[k - x] + 1 < m) m = v[k - x] + 1; }); v.push(m); }
      var rest = c, g = 0; [b2, a, 1].forEach(function (x) { g += Math.floor(rest / x); rest %= x; });
      if (g === v[c]) return null;
      var onlyBig = Math.floor(c / b2) + (c % b2);
      var bb = build(rng, num(v[c]), [num(g), num(v[c] + 1), num(onlyBig), num(v[c - 1])]);
      if (!bb) return null;
      return {
        testo: T(lingua, "Cambio monete (CCP): tagli $w=" + vec(w) + "$, disponibili in quantità illimitata; si vuole dare un resto di esattamente $c=" + c + "$ con il minimo numero di monete. $v(k)$ è il minimo numero di monete per il resto $k$: $v(0)=0$ e $v(k)=\\min_{j:\\,w_j\\le k}\\{1+v(k-w_j)\\}$. Quanto vale $v(" + c + ")$?",
          "Coin change (CCP): denominations $w=" + vec(w) + "$, in unlimited supply; an amount of exactly $c=" + c + "$ must be paid with the minimum number of coins. $v(k)$ is the minimum number of coins for amount $k$: $v(0)=0$ and $v(k)=\\min_{j:\\,w_j\\le k}\\{1+v(k-w_j)\\}$. What is $v(" + c + ")$?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "La PD dà $v(" + c + ")=" + v[c] + "$ monete. Il greedy che usa sempre il taglio più grande ne usa $" + g + "$: con questi tagli non è ottimo.",
          "The DP gives $v(" + c + ")=" + v[c] + "$ coins. The greedy that always uses the largest denomination uses $" + g + "$: with these denominations it is not optimal."),
        _v: { dati: { w: w, c: c }, valori: bb.valori }
      };
    }
  });

  // ---- 9. PD per il taglio delle aste (cap. 28)
  add({
    id: "oc-g-rcp-dp", livello: "facile", capitolo: "dp-rod-cutting",
    link: L("dynamic-programming/dp-rod-cutting/a-first-dp-algorithm/#box-14-texrcpbu", "programmazione-dinamica/dp-rod-cutting/un-primo-algoritmo-di-pd/#box-14-texrcpbu"),
    genera: function (rng, lingua) {
      var n = ri(rng, 5, 6), p = [], last = 0;
      for (var j = 1; j <= n; j++) { last = last + ri(rng, 1, 5); p.push(last); }
      var v = [0]; for (var l = 1; l <= n; l++) { var m = 0; for (j = 1; j <= l; j++) m = Math.max(m, p[j - 1] + v[l - j]); v.push(m); }
      var bestd = 1; for (j = 2; j <= n; j++) if (p[j - 1] * bestd > p[bestd - 1] * j) bestd = j;
      var g = Math.floor(n / bestd) * p[bestd - 1] + (n % bestd ? p[(n % bestd) - 1] : 0);
      var one = p[n - 1]; for (j = 1; j < n; j++) one = Math.max(one, p[j - 1] + p[n - j - 1]);
      var bb = build(rng, num(v[n]), [num(p[n - 1]), num(one), num(g), num(v[n - 1])]);
      if (!bb) return null;
      var head = ["j"].concat(range1(n).map(String));
      return {
        testo: T(lingua, "Taglio delle aste (RCP): un'asta di lunghezza $n=" + n + "$ si taglia in pezzi di lunghezza intera, e il pezzo di lunghezza $j$ si vende a $p_j$: " + tab(head, [["p_j"].concat(p)]) + ". $v(\\ell)$ è il massimo ricavo da un'asta di lunghezza $\\ell$: $v(0)=0$ e $v(\\ell)=\\max_{1\\le j\\le \\ell}\\{p_j+v(\\ell-j)\\}$. Quanto vale $v(" + n + ")$?",
          "Rod cutting (RCP): a rod of length $n=" + n + "$ is cut into pieces of integer length, and the piece of length $j$ is sold at $p_j$: " + tab(head, [["p_j"].concat(p)]) + ". $v(\\ell)$ is the largest revenue from a rod of length $\\ell$: $v(0)=0$ and $v(\\ell)=\\max_{1\\le j\\le \\ell}\\{p_j+v(\\ell-j)\\}$. What is $v(" + n + ")$?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "$v=" + vec(v) + "$ per $\\ell=0,\\dots," + n + "$, quindi $v(" + n + ")=" + v[n] + "$. Un solo taglio ($" + one + "$) o il pezzo di miglior rapporto $p_j/j$ ($" + g + "$) non bastano in generale.",
          "$v=" + vec(v) + "$ for $\\ell=0,\\dots," + n + "$, hence $v(" + n + ")=" + v[n] + "$. A single cut ($" + one + "$) or the piece with the best ratio $p_j/j$ ($" + g + "$) are not enough in general."),
        _v: { dati: { p: p, n: n }, valori: bb.valori }
      };
    }
  });

  // ---- 10. NF / FF / BF / WF (cap. 36)
  add({
    id: "oc-g-bpp-anyfit", livello: "facile", capitolo: "bin-packing-approximation",
    link: L("approximation-algorithms/bin-packing-approximation/#sez-sec-AF", "algoritmi-di-approssimazione/bin-packing-approximation/#sez-sec-AF"),
    genera: function (rng, lingua) {
      var n = 7, c = 10, w = [];
      for (var j = 0; j < n; j++) w.push(ri(rng, 2, 8));
      var algs = ["NF", "FF", "BF", "WF"], R = {};
      algs.forEach(function (a) { R[a] = packing(w, c, a); });
      var a = pickOne(rng, algs);
      var key = function (x) { return { k: x, t: "$bin=" + vec(R[x].bin) + "$" }; };
      var b = build(rng, key(a), algs.filter(function (x) { return x !== a; }).map(key));
      if (!b) return null;
      var nome = { NF: "Next Fit", FF: "First Fit", BF: "Best Fit", WF: "Worst Fit" };
      b.valori = b.valori.map(function (x) { return x + ":" + R[x].bin.join(","); });
      return {
        testo: T(lingua, "Bin packing (BPP: oggetti in contenitori di capacità $c$, minimizzando i contenitori) con $c=" + c + "$ e pesi, nell'ordine di esame, $w=" + vec(w) + "$. I contenitori sono numerati nell'ordine di apertura; a parità di capacità residua si sceglie quello di indice minore. Quale vettore $bin$ (contenitore di ogni oggetto) produce " + nome[a] + " (" + a + ")?",
          "Bin packing (BPP: items into bins of capacity $c$, minimizing the bins) with $c=" + c + "$ and weights, in the order of examination, $w=" + vec(w) + "$. Bins are numbered in order of opening; ties on the residual capacity go to the smaller index. Which vector $bin$ (bin of each item) does " + nome[a] + " (" + a + ") produce?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, a + " dà $bin=" + vec(R[a].bin) + "$ con $" + R[a].nb + "$ contenitori. NF tiene aperto un solo contenitore; FF sceglie il primo in cui l'oggetto entra, BF quello con capacità residua minima, WF quello con capacità residua massima.",
          a + " gives $bin=" + vec(R[a].bin) + "$ with $" + R[a].nb + "$ bins. NF keeps a single open bin; FF chooses the first bin where the item fits, BF the one with the smallest residual capacity, WF the one with the largest residual capacity."),
        _v: { dati: { w: w, c: c, alg: a }, valori: b.valori }
      };
    }
  });

  // ---- 11. FFD e BFD (cap. 30)
  add({
    id: "oc-g-bpp-ffd", livello: "facile", capitolo: "constructive-heuristics",
    link: L("heuristic-algorithms/constructive-heuristics/the-bin-packing-problem-first-sort-then-pack/#sez-sec-FFD",
            "algoritmi-euristici/constructive-heuristics/il-problema-del-bin-packing-prima-ordinare-poi-riempire/#sez-sec-FFD"),
    genera: function (rng, lingua) {
      var n = 7, c = ri(rng, 10, 12), w = [];
      for (var j = 0; j < n; j++) w.push(ri(rng, 2, c - 2));
      var o = decOrder(w);
      var R = { FFD: packing(w, c, "FF", o), BFD: packing(w, c, "BF", o), FF: packing(w, c, "FF"), NFD: packing(w, c, "NF", o), BF: packing(w, c, "BF"), WFD: packing(w, c, "WF", o) };
      var a = pickOne(rng, ["FFD", "BFD"]);
      var key = function (x) { return { k: x, t: "$bin=" + vec(R[x].bin) + "$" }; };
      var b = build(rng, key(a), ["FFD", "BFD", "FF", "NFD", "WFD", "BF"].filter(function (x) { return x !== a; }).map(key));
      if (!b) return null;
      b.valori = b.valori.map(function (x) { return x + ":" + R[x].bin.join(","); });
      var nome = a === "FFD" ? "First Fit Decreasing (FFD)" : "Best Fit Decreasing (BFD)";
      return {
        testo: T(lingua, "Bin packing (BPP: oggetti in contenitori di capacità $c$, minimizzando i contenitori) con $c=" + c + "$ e pesi $w=" + vec(w) + "$ (oggetti $1,\\dots," + n + "$). L'ordinamento per peso non crescente rompe i pari merito con l'indice minore; i contenitori sono numerati nell'ordine di apertura. Quale vettore $bin$ (contenitore di ogni oggetto, nella numerazione originale) produce " + nome + "?",
          "Bin packing (BPP: items into bins of capacity $c$, minimizing the bins) with $c=" + c + "$ and weights $w=" + vec(w) + "$ (items $1,\\dots," + n + "$). The sorting by non-increasing weight breaks ties by smaller index; bins are numbered in order of opening. Which vector $bin$ (bin of each item, in the original numbering) does " + nome + " produce?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "Prima si ordinano gli oggetti per peso non crescente ($" + o.map(function (x) { return x + 1; }).join(",") + "$), poi si applica " + (a === "FFD" ? "First Fit" : "Best Fit") + ": $bin=" + vec(R[a].bin) + "$, $" + R[a].nb + "$ contenitori. Errori tipici: dimenticare l'ordinamento o usare l'altra regola di scelta.",
          "First the items are sorted by non-increasing weight ($" + o.map(function (x) { return x + 1; }).join(",") + "$), then " + (a === "FFD" ? "First Fit" : "Best Fit") + " is applied: $bin=" + vec(R[a].bin) + "$, $" + R[a].nb + "$ bins. Typical mistakes: forgetting the sorting or using the other selection rule."),
        _v: { dati: { w: w, c: c, alg: a }, valori: b.valori }
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

  // ---- 13. colorazione greedy con una lista (cap. 30)
  add({
    id: "oc-g-vcp-gc", livello: "facile", capitolo: "constructive-heuristics",
    link: L("heuristic-algorithms/constructive-heuristics/vertex-coloring-greedy-and-dsatur/#sez-sec-GC",
            "algoritmi-euristici/constructive-heuristics/colorazione-dei-vertici-greedy-e-dsatur/#sez-sec-GC"),
    genera: function (rng, lingua) {
      var n = 6, G = randGraph(rng, n, 0.5);
      if (G.E.length < 6) return null;
      var lam = shuffle(rng, range1(n));
      var key = function (col) { return { k: col.join(","), t: "$col=" + vec(col) + "$" }; };
      var c0 = gcColor(G.adj, n, lam), c1 = gcColor(G.adj, n, range1(n)), c2 = gcColor(G.adj, n, lam.slice().reverse()), c3 = dsatur(G.adj, n).col;
      var b = build(rng, key(c0), [key(c1), key(c2), key(c3)]);
      if (!b) return null;
      return {
        testo: T(lingua, "Grafo $G=(V,E)$ con $V=\\{1,\\dots," + n + "\\}$ e " + edgeTex(G.E) + ". La colorazione greedy $GC$ esamina i vertici nell'ordine della lista $\\lambda=" + vec(lam) + "$ e dà a ciascuno il colore (intero $\\ge 1$) più piccolo non usato dai vicini già colorati. Quale colorazione $col=(col[1],\\dots,col[" + n + "])$ restituisce?",
          "Graph $G=(V,E)$ with $V=\\{1,\\dots," + n + "\\}$ and " + edgeTex(G.E) + ". The greedy coloring $GC$ examines the vertices in the order of the list $\\lambda=" + vec(lam) + "$ and gives each the smallest color (integer $\\ge 1$) not used by its already colored neighbors. Which coloring $col=(col[1],\\dots,col[" + n + "])$ does it return?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "Si esaminano i vertici nell'ordine di $\\lambda$ e si dà a ognuno il colore più piccolo non usato dai vicini già colorati: $col=" + vec(c0) + "$. L'ordine conta: con la lista $(1,\\dots," + n + ")$ si ottiene $" + vec(c1) + "$.",
          "The vertices are examined in the order of $\\lambda$ and each one gets the smallest color not used by its colored neighbours: $col=" + vec(c0) + "$. The order matters: with the list $(1,\\dots," + n + ")$ one gets $" + vec(c1) + "$."),
        _v: { dati: { n: n, E: G.E, lam: lam }, valori: b.valori }
      };
    }
  });

  // ---- 14. DSATUR: ordine di colorazione (cap. 30)
  add({
    id: "oc-g-vcp-dsatur", livello: "facile", capitolo: "constructive-heuristics",
    link: L("heuristic-algorithms/constructive-heuristics/vertex-coloring-greedy-and-dsatur/#sez-sec-DSATUR",
            "algoritmi-euristici/constructive-heuristics/colorazione-dei-vertici-greedy-e-dsatur/#sez-sec-DSATUR"),
    genera: function (rng, lingua) {
      var n = 6, G = randGraph(rng, n, 0.5);
      if (G.E.length < 6) return null;
      var D = dsatur(G.adj, n);
      // varianti sbagliate: pari merito per indice minore (senza grado); grado statico; pari merito per grado totale
      function variant(mode) {
        var col = new Array(n + 1).fill(0), seq = [];
        var deg = G.adj.map(function (a) { return a.length; });
        if (mode === "static") {
          return range1(n).sort(function (a, b) { return deg[b] - deg[a] || a - b; });
        }
        for (var st = 0; st < n; st++) {
          var best = -1, bs = -1, bd = -1;
          for (var v = 1; v <= n; v++) {
            if (col[v]) continue;
            var S = {}, ns = 0, du = 0;
            G.adj[v].forEach(function (u) { if (col[u]) { if (!S[col[u]]) { S[col[u]] = 1; ns++; } } else du++; });
            var d2 = mode === "total" ? deg[v] : 0;
            if (ns > bs || (ns === bs && d2 > bd)) { best = v; bs = ns; bd = d2; }
          }
          var U = {}; G.adj[best].forEach(function (u) { if (col[u]) U[col[u]] = 1; }); var c = 1; while (U[c]) c++;
          col[best] = c; seq.push(best);
        }
        return seq;
      }
      var key = function (s) { return { k: s.join(","), t: "$" + vec(s) + "$" }; };
      var b = build(rng, key(D.seq), [key(variant("index")), key(variant("static")), key(variant("total"))]);
      if (!b) return null;
      return {
        testo: T(lingua, "Grafo $G=(V,E)$ con $V=\\{1,\\dots," + n + "\\}$ e " + edgeTex(G.E) + ". $DSATUR$ colora a ogni passo il vertice non colorato di grado di saturazione massimo (numero di colori diversi fra i vicini già colorati), con il colore più piccolo libero; pari merito: più vicini non colorati, poi indice minimo. In quale ordine colora i vertici?",
          "Graph $G=(V,E)$ with $V=\\{1,\\dots," + n + "\\}$ and " + edgeTex(G.E) + ". At every step $DSATUR$ colors the uncolored vertex of maximum saturation degree (number of distinct colors among its colored neighbors), with the smallest free color; ties: more uncolored neighbors, then smallest index. In which order does it color the vertices?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "A ogni passo si sceglie il vertice non colorato con più colori diversi fra i vicini: ordine $" + vec(D.seq) + "$, con $" + D.nc + "$ colori. Il grado di spareggio è quello verso i vertici non ancora colorati, aggiornato a ogni passo.",
          "At each step the uncolored vertex with the most different colors among its neighbours is chosen: order $" + vec(D.seq) + "$, with $" + D.nc + "$ colors. The tie-breaking degree counts the vertices not yet colored, and it is updated at each step."),
        _v: { dati: { n: n, E: G.E }, valori: b.valori }
      };
    }
  });

  // ---- 15. nearest neighbour (cap. 30)
  add({
    id: "oc-g-tsp-nn", livello: "facile", capitolo: "constructive-heuristics",
    link: L("heuristic-algorithms/constructive-heuristics/the-travelling-salesman-problem-append-or-insert/#sez-sec-NN",
            "algoritmi-euristici/constructive-heuristics/il-problema-del-commesso-viaggiatore-accodare-o-inserire/#sez-sec-NN"),
    genera: function (rng, lingua) {
      var n = 5, d = randDist(rng, n, 2, 12);
      var s = ri(rng, 1, n), r = nn(d, n, s), other = nn(d, n, s === 1 ? 2 : 1);
      var id = range1(n), lid = tourLen(d, id);
      var b = build(rng, num(r.len), [num(r.open), num(other.len), num(lid), num(r.len + 1)]);
      if (!b) return null;
      return {
        testo: T(lingua, "TSP simmetrico (giro più corto che visita tutte le città) con le distanze " + distTab(d, n) + ". L'euristica $NN$ (nearest neighbour) parte dalla città $" + s + "$, va ogni volta alla città non visitata più vicina (pari merito: indice minore) e alla fine torna alla partenza. Qual è la lunghezza del giro?",
          "Symmetric TSP (shortest tour visiting all cities) with distances " + distTab(d, n) + ". The $NN$ (nearest neighbour) heuristic starts from city $" + s + "$, always moves to the closest unvisited city (ties: smaller index) and finally returns to the start. What is the length of the tour?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "$NN$ visita $" + vec(r.tour) + "$ e torna in $" + s + "$: lunghezza $" + r.len + "$. Errore tipico: dimenticare l'arco di ritorno (si otterrebbe $" + r.open + "$).",
          "$NN$ visits $" + vec(r.tour) + "$ and goes back to $" + s + "$: length $" + r.len + "$. Typical mistake: forgetting the closing edge (one would get $" + r.open + "$)."),
        _v: { dati: { d: d, n: n, s: s }, valori: b.valori }
      };
    }
  });

  // ---- 16. 2-opt, best improvement (cap. 31) — media
  add({
    id: "oc-g-tsp-2opt", livello: "media", capitolo: "local-search",
    link: L("heuristic-algorithms/local-search/evaluating-a-move-incrementally/#box-4-prop-twoopt",
            "algoritmi-euristici/local-search/valutare-una-mossa-in-modo-incrementale/#box-4-prop-twoopt"),
    genera: function (rng, lingua) {
      var n = 6, d = randDist(rng, n, 2, 12);
      var sig = [1].concat(shuffle(rng, [2, 3, 4, 5, 6])), L0 = tourLen(d, sig);
      var best = null, first = null, wrongBest = null;
      for (var i = 1; i <= n - 2; i++) for (var j = i + 2; j <= n; j++) {
        if (i === 1 && j === n) continue;
        var u1 = sig[i - 1], v1 = sig[i], u2 = sig[j - 1], v2 = sig[j % n];
        var D = d[u1][u2] + d[v1][v2] - d[u1][v1] - d[u2][v2];
        var Dw = d[u1][v2] + d[v1][u2] - d[u1][v1] - d[u2][v2];
        if (D < 0 && !first) first = { D: D, i: i, j: j };
        if (!best || D < best.D) best = { D: D, i: i, j: j };
        if (!wrongBest || Dw < wrongBest.D) wrongBest = { D: Dw };
      }
      if (best.D >= 0 || !first) return null;
      var bb = build(rng, num(L0 + best.D), [num(L0 + first.D), num(L0 - best.D), num(L0 + wrongBest.D), num(L0)]);
      if (!bb) return null;
      return {
        testo: T(lingua, "TSP simmetrico con le distanze " + distTab(d, n) + ". Il giro corrente è $\\sigma=" + vec(sig) + "$, di lunghezza $" + L0 + "$. Una mossa 2-opt toglie due lati non adiacenti del giro e ricollega i due cammini nell'altro modo possibile; con la regola best improvement si applica la mossa che riduce di più la lunghezza. Qual è la lunghezza del giro dopo un'iterazione?",
          "Symmetric TSP with distances " + distTab(d, n) + ". The current tour is $\\sigma=" + vec(sig) + "$, of length $" + L0 + "$. A 2-opt move removes two non-adjacent edges of the tour and reconnects the two paths in the other possible way; with the best-improvement rule the move that reduces the length the most is applied. What is the tour length after one iteration?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Per ogni mossa $\\Delta=d_{u_1u_2}+d_{v_1v_2}-d_{u_1v_1}-d_{u_2v_2}$; la migliore ha $\\Delta=" + best.D + "$ (posizioni $i=" + best.i + "$, $j=" + best.j + "$), quindi $" + L0 + best.D + "=" + (L0 + best.D) + "$. La prima mossa migliorante ($\\Delta=" + first.D + "$) è quella del first improvement.",
          "For every move $\\Delta=d_{u_1u_2}+d_{v_1v_2}-d_{u_1v_1}-d_{u_2v_2}$; the best one has $\\Delta=" + best.D + "$ (positions $i=" + best.i + "$, $j=" + best.j + "$), hence $" + L0 + best.D + "=" + (L0 + best.D) + "$. The first improving move ($\\Delta=" + first.D + "$) is the one of first improvement."),
        _v: { dati: { d: d, n: n, sig: sig }, valori: bb.valori }
      };
    }
  });

  // ---- 17. LPT (cap. 30)
  add({
    id: "oc-g-pcmax-lpt", livello: "facile", capitolo: "constructive-heuristics",
    link: L("heuristic-algorithms/constructive-heuristics/scheduling-on-parallel-machines-longest-jobs-first/#sez-sec-LPT",
            "algoritmi-euristici/constructive-heuristics/scheduling-su-macchine-parallele-prima-i-lavori-piu-lunghi/#sez-sec-LPT"),
    genera: function (rng, lingua) {
      var m = 3, n = 7, t = [];
      for (var j = 0; j < n; j++) t.push(ri(rng, 2, 9));
      var idx = range1(n).map(function (i) { return i - 1; });
      var lpt = listSched(t, m, decOrder(t)).cmax, lst = listSched(t, m, idx).cmax, spt = listSched(t, m, decOrder(t).reverse()).cmax;
      var lb = Math.max(Math.max.apply(null, t), Math.ceil(sum(t) / m));
      var b = build(rng, num(lpt), [num(lst), num(spt), num(lb), num(lpt + 1)]);
      if (!b) return null;
      return {
        testo: T(lingua, "Scheduling $P\\,||\\,C_{\\max}$: $m=" + m + "$ macchine identiche, tempi di lavorazione $t=" + vec(t) + "$, si minimizza il makespan (carico massimo). $LPT$ ordina i lavori per tempo non crescente e assegna ciascuno alla macchina di carico minimo (pari merito: indice minore). Qual è il makespan della soluzione di $LPT$?",
          "Scheduling $P\\,||\\,C_{\\max}$: $m=" + m + "$ identical machines, processing times $t=" + vec(t) + "$, the makespan (maximum load) is minimized. $LPT$ sorts the jobs by non-increasing time and assigns each to the least loaded machine (ties: smaller index). What is the makespan of the $LPT$ solution?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "$LPT$ ordina i lavori per tempo non crescente e assegna ciascuno a una macchina di carico minimo: makespan $" + lpt + "$. $LIST$ nell'ordine dato dà $" + lst + "$; il lower bound $\\max\\{\\max_j t_j,\\lceil\\sum_j t_j/m\\rceil\\}$ vale $" + lb + "$.",
          "$LPT$ sorts the jobs by non-increasing time and assigns each one to a least loaded machine: makespan $" + lpt + "$. $LIST$ in the given order gives $" + lst + "$; the lower bound $\\max\\{\\max_j t_j,\\lceil\\sum_j t_j/m\\rceil\\}$ is $" + lb + "$."),
        _v: { dati: { t: t, m: m }, valori: b.valori }
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

  // ---- 19. ricerca locale move per P||Cmax (cap. 31)
  add({
    id: "oc-g-pcmax-move", livello: "facile", capitolo: "local-search",
    link: L("heuristic-algorithms/local-search/p-cmax-move-and-swap/#sez-sec-pcmax", "algoritmi-euristici/local-search/p-cmax-move-e-swap/#sez-sec-pcmax"),
    genera: function (rng, lingua) {
      var m = 3, n = 6, t = [], mach = [];
      for (var j = 0; j < n; j++) { t.push(ri(rng, 1, 9)); mach.push(ri(rng, 1, m)); }
      var Lm = [0, 0, 0]; for (j = 0; j < n; j++) Lm[mach[j] - 1] += t[j];
      var cmax = Math.max.apply(null, Lm);
      if (Lm.filter(function (x) { return x === cmax; }).length > 1) return null;
      var best = null, first = null, moves = [];
      for (j = 0; j < n; j++) for (var h = 1; h <= m; h++) {
        if (h === mach[j]) continue;
        var L2 = Lm.slice(); L2[mach[j] - 1] -= t[j]; L2[h - 1] += t[j];
        var F = Math.max.apply(null, L2) - cmax;
        moves.push({ j: j + 1, h: h, F: F });
        if (F < 0 && !first) first = moves[moves.length - 1];
        if (!best || F < best.F) best = moves[moves.length - 1];
      }
      if (!best || best.F >= 0 || first === best) return null;
      var crit = Lm.indexOf(cmax) + 1, lmin = Lm.indexOf(Math.min.apply(null, Lm)) + 1;
      var big = -1; for (j = 0; j < n; j++) if (mach[j] === crit && (big < 0 || t[j] > t[big])) big = j;
      var key = function (mv) { return { k: mv.j + "->" + mv.h, t: T(lingua, "lavoro $" + mv.j + "$ sulla macchina $" + mv.h + "$", "job $" + mv.j + "$ to machine $" + mv.h + "$") }; };
      var nonCrit = null; for (j = 0; j < moves.length; j++) if (mach[moves[j].j - 1] !== crit) { nonCrit = moves[j]; break; }
      var Fof = function (mv) { for (var q = 0; q < moves.length; q++) if (moves[q].j === mv.j && moves[q].h === mv.h) return moves[q].F; return null; };
      var c2 = { j: big + 1, h: lmin === crit ? (crit % m) + 1 : lmin };
      var cands = [first, c2, nonCrit].filter(function (mv) { return mv && Fof(mv) !== null && Fof(mv) > best.F; }); // solo mosse strettamente peggiori
      var b = build(rng, key(best), cands.map(key));
      if (!b) return null;
      return {
        testo: T(lingua, "Scheduling $P\\,||\\,C_{\\max}$ (minimizzare il makespan, il carico massimo) con $m=3$ macchine, tempi $t=" + vec(t) + "$ e assegnamento corrente $\\mathrm{mach}=" + vec(mach) + "$ ($\\mathrm{mach}_j$ è la macchina del lavoro $j$; carichi $" + vec(Lm) + "$). L'intorno move sposta un lavoro $j$ su un'altra macchina $h$; best improvement sceglie la mossa che riduce di più il makespan (mosse esaminate per $j=1,\\dots,n$ e $h=1,\\dots,m$; a parità si tiene la prima). Quale mossa sceglie?",
          "Scheduling $P\\,||\\,C_{\\max}$ (minimize the makespan, the maximum load) with $m=3$ machines, times $t=" + vec(t) + "$ and current assignment $\\mathrm{mach}=" + vec(mach) + "$ ($\\mathrm{mach}_j$ is the machine of job $j$; loads $" + vec(Lm) + "$). The move neighborhood moves a job $j$ to another machine $h$; best improvement chooses the move that decreases the makespan the most (moves examined for $j=1,\\dots,n$ and $h=1,\\dots,m$; ties: the first one is kept). Which move does it choose?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "La variazione del makespan della mossa scelta è $" + best.F + "$, la più negativa (makespan da $" + cmax + "$ a $" + (cmax + best.F) + "$). La prima mossa migliorante (first improvement) ha variazione $" + first.F + "$; spostare un lavoro da una macchina non critica non riduce il makespan.",
          "The makespan change of the chosen move is $" + best.F + "$, the most negative (makespan from $" + cmax + "$ to $" + (cmax + best.F) + "$). The first improving move (first improvement) has change $" + first.F + "$; moving a job from a non-critical machine does not decrease the makespan."),
        _v: { dati: { t: t, mach: mach, m: m }, valori: b.valori }
      };
    }
  });

  // ---- 20. costo di un lotto c_{j,t} (cap. 25)
  add({
    id: "oc-g-uls-cjt", livello: "facile", capitolo: "dp-lot-sizing",
    link: L("dynamic-programming/dp-lot-sizing/a-dp-algorithm-for-the-uls/#box-15-texulscost", "programmazione-dinamica/dp-lot-sizing/un-algoritmo-di-pd-per-l-uls/#box-15-texulscost"),
    genera: function (rng, lingua) {
      var m = 4, d = [], sc = [], vc = [], hc = [];
      for (var t = 0; t < m; t++) { d.push(ri(rng, 1, 6) * 5); sc.push(ri(rng, 3, 10) * 10); vc.push(ri(rng, 0, 2)); hc.push(ri(rng, 1, 3)); }
      var j = ri(rng, 1, 2), tt = ri(rng, j + 2, m);
      var cjt = ulsCost(d, sc, vc, hc, j, tt);
      var D = 0; for (var k = j; k <= tt; k++) D += d[k - 1];
      var w1 = sc[j - 1] + vc[j - 1] * D; for (k = j; k < tt; k++) w1 += hc[k - 1] * d[k]; // mantenimento solo un periodo
      var w3 = cjt - sc[j - 1];
      var w4 = sc[j - 1] + vc[j - 1] * D; for (k = j; k <= tt; k++) { var Dk = 0; for (var q = k; q <= tt; q++) Dk += d[q - 1]; w4 += hc[k - 1] * Dk; } // conta anche la domanda del periodo stesso
      var head = ["t"].concat(range1(m).map(String));
      var b = build(rng, num(cjt), [num(w1), num(w3), num(w4), num(cjt + sc[j - 1])]);
      if (!b) return null;
      return {
        testo: T(lingua, "Lot sizing senza capacità (ULS): domanda $d_t$, costo di setup $sc_t$, costo variabile unitario $vc_t$ e costo unitario $hc_t$ della scorta a fine periodo " + tab(head, [["d_t"].concat(d), ["sc_t"].concat(sc), ["vc_t"].concat(vc), ["hc_t"].concat(hc)]) + ". Quanto vale il costo $c_{" + j + "," + tt + "}$ del lotto prodotto nel periodo $" + j + "$ per coprire le domande dei periodi $" + j + ",\\dots," + tt + "$ (setup, produzione e scorte)?",
          "Uncapacitated lot sizing (ULS): demand $d_t$, setup cost $sc_t$, unit variable cost $vc_t$ and unit cost $hc_t$ of the stock at the end of the period " + tab(head, [["d_t"].concat(d), ["sc_t"].concat(sc), ["vc_t"].concat(vc), ["hc_t"].concat(hc)]) + ". What is the cost $c_{" + j + "," + tt + "}$ of the production run in period $" + j + "$ covering the demands of periods $" + j + ",\\dots," + tt + "$ (setup, production and stock)?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "$c_{j,t}=sc_j+vc_j\\,D_{j,t}+\\sum_{k=j}^{t-1}hc_k\\,D_{k+1,t}=" + cjt + "$: alla fine di ogni periodo $k$ la scorta contiene le domande dei periodi successivi del lotto, non solo quella del periodo seguente.",
          "$c_{j,t}=sc_j+vc_j\\,D_{j,t}+\\sum_{k=j}^{t-1}hc_k\\,D_{k+1,t}=" + cjt + "$: at the end of each period $k$ the stock contains the demands of all the following periods of the run, not only that of the next period."),
        _v: { dati: { d: d, sc: sc, vc: vc, hc: hc, j: j, t: tt }, valori: b.valori }
      };
    }
  });

  // ---- 21. Wagner-Whitin su 4 periodi (cap. 25) — media
  add({
    id: "oc-g-uls-ww", livello: "media", capitolo: "dp-lot-sizing",
    link: L("dynamic-programming/dp-lot-sizing/a-dp-algorithm-for-the-uls-step-1-and-step-2/#box-28-texulsbu",
            "programmazione-dinamica/dp-lot-sizing/un-algoritmo-di-pd-per-l-uls-passo-1-e-passo-2/#box-28-texulsbu"),
    genera: function (rng, lingua) {
      var m = 4, d = [], sc = [], vc = [0, 0, 0, 0], hc = [];
      var s0 = ri(rng, 4, 10) * 10;
      for (var t = 0; t < m; t++) { d.push(ri(rng, 1, 8) * 5); sc.push(s0); hc.push(1); }
      var R = ww(d, sc, vc, hc), opt = R.v[m];
      var l4l = sum(sc), one = ulsCost(d, sc, vc, hc, 1, m), last = R.v[m - 1] + ulsCost(d, sc, vc, hc, m, m);
      var b = build(rng, num(opt), [num(l4l), num(one), num(last), num(opt + s0)]);
      if (!b) return null;
      var head = ["t"].concat(range1(m).map(String));
      return {
        testo: T(lingua, "Lot sizing senza capacità (ULS) con $m=4$ periodi, costo di setup $sc_t=" + s0 + "$, costo variabile nullo e costo di mantenimento $hc_t=1$ per ogni periodo, e domande " + tab(head, [["d_t"].concat(d)]) + ". Sia $c_{j,t}$ il costo del lotto prodotto in $j$ per i periodi $j,\\dots,t$ e $v(t)$ il costo minimo per coprire i periodi $1,\\dots,t$: $v(0)=0$ e $v(t)=\\min_{1\\le j\\le t}\\{v(j-1)+c_{j,t}\\}$. Quanto vale il costo ottimo $v(4)$?",
          "Uncapacitated lot sizing (ULS) with $m=4$ periods, setup cost $sc_t=" + s0 + "$, zero variable cost and holding cost $hc_t=1$ in every period, and demands " + tab(head, [["d_t"].concat(d)]) + ". Let $c_{j,t}$ be the cost of the run produced in $j$ for periods $j,\\dots,t$ and $v(t)$ the minimum cost of covering periods $1,\\dots,t$: $v(0)=0$ and $v(t)=\\min_{1\\le j\\le t}\\{v(j-1)+c_{j,t}\\}$. What is the optimal cost $v(4)$?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "$v=" + vec(R.v) + "$ per $t=0,\\dots,4$; lotti nei periodi $" + R.runs.join(",") + "$. Un setup in ogni periodo costa $" + l4l + "$, un solo lotto nel periodo 1 costa $" + one + "$.",
          "$v=" + vec(R.v) + "$ for $t=0,\\dots,4$; runs in periods $" + R.runs.join(",") + "$. A setup in every period costs $" + l4l + "$, a single run in period 1 costs $" + one + "$."),
        _v: { dati: { d: d, sc: sc, vc: vc, hc: hc }, valori: b.valori }
      };
    }
  });

  // ---- 22. intervallo garantito da un algoritmo di approssimazione (cap. 34)
  add({
    id: "oc-g-approx-interval", livello: "facile", capitolo: "approximation",
    link: L("approximation-algorithms/approximation/#box-3-def-alpha-approx", "algoritmi-di-approssimazione/approximation/#box-3-def-alpha-approx"),
    genera: function (rng, lingua) {
      var al = pickOne(rng, [fr(3, 2), fr(2, 1), fr(4, 3), fr(5, 4)]), mn = rng() < 0.5;
      var A = al.n * al.d * ri(rng, 2, 9);
      var lo = fr(A * al.d, al.n), hi = fr(A * al.n, al.d);
      var I = function (a, b) { return { k: frKey(a) + "|" + frKey(b), t: "$" + frTex(a) + "\\le z(I)\\le " + frTex(b) + "$" }; };
      var Af = fr(A, 1), alT = frTex(al);
      var giusta = mn ? I(lo, Af) : I(Af, hi);
      var eq = function (v) { return { k: "eq|" + frKey(v), t: "$z(I)=" + frTex(v) + "$" }; };
      var b = build(rng, giusta, [mn ? I(Af, hi) : I(lo, Af), I(lo, hi), mn ? eq(lo) : eq(hi)]);
      if (!b) return null;
      return {
        testo: T(lingua, "Un algoritmo $\\mathscr{A}$ è una $\\alpha$-approssimazione, con $\\alpha=" + alT + "$, per un problema di " + (mn ? "minimo: $\\mathscr{A}(I)\\le\\alpha\\,z(I)$" : "massimo: $z(I)\\le\\alpha\\,\\mathscr{A}(I)$") + " per ogni istanza $I$, dove $z(I)$ è il valore ottimo. Su un'istanza $I$ restituisce $\\mathscr{A}(I)=" + A + "$. Che cosa si può concludere sul valore ottimo $z(I)$?",
          "An algorithm $\\mathscr{A}$ is an $\\alpha$-approximation, with $\\alpha=" + alT + "$, for a " + (mn ? "minimization problem: $\\mathscr{A}(I)\\le\\alpha\\,z(I)$" : "maximization problem: $z(I)\\le\\alpha\\,\\mathscr{A}(I)$") + " for every instance $I$, where $z(I)$ is the optimal value. On an instance $I$ it returns $\\mathscr{A}(I)=" + A + "$. What can be concluded on the optimal value $z(I)$?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, mn ? "Per un problema di minimo $\\mathscr{A}(I)/z(I)\\le\\alpha$ e $z(I)\\le\\mathscr{A}(I)$, quindi $\\mathscr{A}(I)/\\alpha\\le z(I)\\le\\mathscr{A}(I)$." : "Per un problema di massimo $z(I)/\\mathscr{A}(I)\\le\\alpha$ e $\\mathscr{A}(I)\\le z(I)$, quindi $\\mathscr{A}(I)\\le z(I)\\le\\alpha\\,\\mathscr{A}(I)$.",
          mn ? "For a minimization problem $\\mathscr{A}(I)/z(I)\\le\\alpha$ and $z(I)\\le\\mathscr{A}(I)$, hence $\\mathscr{A}(I)/\\alpha\\le z(I)\\le\\mathscr{A}(I)$." : "For a maximization problem $z(I)/\\mathscr{A}(I)\\le\\alpha$ and $\\mathscr{A}(I)\\le z(I)$, hence $\\mathscr{A}(I)\\le z(I)\\le\\alpha\\,\\mathscr{A}(I)$."),
        _v: { dati: { alpha: [al.n, al.d], min: mn, A: A }, valori: b.valori }
      };
    }
  });

  // ---- 23. Ext-Greedy (cap. 35)
  add({
    id: "oc-g-kp-extgreedy", livello: "facile", capitolo: "knapsack-approximation",
    link: L("approximation-algorithms/knapsack-approximation/#354-the-ext-greedy-algorithm", "algoritmi-di-approssimazione/knapsack-approximation/#354-lalgoritmo-ext-greedy"),
    genera: function (rng, lingua) {
      var n = 5, p = [], w = [];
      for (var j = 0; j < n; j++) { w.push(ri(rng, 1, 9)); p.push(ri(rng, 2, 20)); }
      var c = ri(rng, 9, 15); if (sum(w) <= c) return null;
      var gr = greedyOrder(effOrder(p, w), p, w, c).z;
      var pmax = 0; for (j = 0; j < n; j++) if (w[j] <= c) pmax = Math.max(pmax, p[j]);
      var gre = Math.max(gr, pmax);
      var grp = greedyOrder(decOrder(p), p, w, c).z, z = kpOpt(p, w, c)[n][c];
      var g1 = greedyOrder(range1(n).map(function (i) { return i - 1; }), p, w, c).z;
      var b = build(rng, num(gre), [num(gr), num(z), num(grp), num(g1), num(pmax)]);
      if (!b) return null;
      return {
        testo: T(lingua, "Problema dello zaino 0-1 (KP: si sceglie un sottoinsieme di oggetti di profitto massimo con peso totale al più $c$) con capacità $c=" + c + "$: " + itemTab(lingua, p, w) + ". L'algoritmo Ext-Greedy restituisce il migliore fra la soluzione del greedy per efficienza $p_j/w_j$ non crescente (pari merito: indice minore) e il miglior oggetto singolo. Quanto vale $GR^e(I)$?",
          "0-1 knapsack problem (KP: choose a subset of items of maximum profit with total weight at most $c$) with capacity $c=" + c + "$: " + itemTab(lingua, p, w) + ". The Ext-Greedy algorithm returns the better of the greedy solution by non-increasing efficiency $p_j/w_j$ (ties: smaller index) and the best single item. What is $GR^e(I)$?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "$GR$ (per efficienza non crescente) vale $" + gr + "$; il miglior oggetto singolo ha profitto $" + pmax + "$; $GR^e(I)=\\max\\{" + gr + "," + pmax + "\\}=" + gre + "$. Il valore ottimo è $z(I)=" + z + "$.",
          "$GR$ (by non-increasing efficiency) has value $" + gr + "$; the best single item has profit $" + pmax + "$; $GR^e(I)=\\max\\{" + gr + "," + pmax + "\\}=" + gre + "$. The optimal value is $z(I)=" + z + "$."),
        _v: { dati: { p: p, w: w, c: c }, valori: b.valori }
      };
    }
  });

  // ---- 24. Basic-FPTAS: profitti scalati (cap. 35) — media
  add({
    id: "oc-g-kp-fptas", livello: "media", capitolo: "knapsack-approximation",
    link: L("approximation-algorithms/knapsack-approximation/#box-14-ex-fptas", "algoritmi-di-approssimazione/knapsack-approximation/#box-14-ex-fptas"),
    genera: function (rng, lingua) {
      var n = 4, p = [], w = [];
      for (var j = 0; j < n; j++) { w.push(ri(rng, 2, 6)); p.push(ri(rng, 6, 40)); }
      var o = effOrder(p, w); p = o.map(function (i) { return p[i]; }); w = o.map(function (i) { return w[i]; });
      var c = ri(rng, 7, 12); if (sum(w) <= c) return null;
      var eps = pickOne(rng, [fr(1, 2), fr(1, 4)]);
      var gr = greedyOrder([0, 1, 2, 3], p, w, c).z, pmax = 0; for (j = 0; j < n; j++) if (w[j] <= c) pmax = Math.max(pmax, p[j]);
      var gre = Math.max(gr, pmax);
      // K = eps*gre/n ; p' = floor(p/K) = floor(p*n*eps.d/(eps.n*gre))
      var sc = function (den) { return p.map(function (x) { return Math.floor(x * den.d / den.n); }); };
      var K = fr(eps.n * gre, eps.d * n);
      var pk = sc(K);
      var Kp = fr(eps.n * Math.max.apply(null, p), eps.d * n), pkp = sc(Kp);
      var Kn = fr(eps.n * gre, eps.d), pkn = sc(Kn);
      var pc = p.map(function (x) { return Math.ceil(x * K.d / K.n); });
      var Kg = fr(eps.n * Math.max(gr, 1), eps.d * n), pkg = sc(Kg); // GR al posto di GR^e
      var key = function (a) { return sum(a) === 0 ? null : { k: a.join(","), t: "$p'=" + vec(a) + "$" }; };
      var distinti = pk.filter(function (x, i) { return pk.indexOf(x) === i; }).length;
      if (distinti < 2) return null;
      var b = build(rng, key(pk), [key(pc), key(pkp), key(pkg), key(pkn)]);
      if (!b || pk.join() === pc.join()) return null;
      return {
        testo: T(lingua, "Problema dello zaino 0-1 (KP: si sceglie un sottoinsieme di oggetti di profitto massimo con peso totale al più $c$) con capacità $c=" + c + "$ e $n=4$ oggetti ordinati per efficienza non crescente: " + itemTab(lingua, p, w) + ". Il Basic-FPTAS $FP^{\\varepsilon}$, con $\\varepsilon=" + frTex(eps) + "$, scala i profitti con il fattore $K=\\varepsilon\\,GR^e(I)/n$, dove $GR^e(I)$ è il valore di Ext-Greedy (migliore fra greedy per efficienza e miglior oggetto singolo). Quali sono i profitti scalati $p'_j=\\lfloor p_j/K\\rfloor$?",
          "0-1 knapsack problem (KP: choose a subset of items of maximum profit with total weight at most $c$) with capacity $c=" + c + "$ and $n=4$ items sorted by non-increasing efficiency: " + itemTab(lingua, p, w) + ". The Basic-FPTAS $FP^{\\varepsilon}$, with $\\varepsilon=" + frTex(eps) + "$, scales the profits by the factor $K=\\varepsilon\\,GR^e(I)/n$, where $GR^e(I)$ is the Ext-Greedy value (better of the greedy by efficiency and the best single item). What are the scaled profits $p'_j=\\lfloor p_j/K\\rfloor$?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "$GR^e(I)=" + gre + "$, $K=\\varepsilon\\,GR^e(I)/n=" + frTex(K) + "$ e $p'_j=\\lfloor p_j/K\\rfloor$: $p'=" + vec(pk) + "$. Si arrotonda per difetto e il fattore usa $GR^e(I)$ e $n$.",
          "$GR^e(I)=" + gre + "$, $K=\\varepsilon\\,GR^e(I)/n=" + frTex(K) + "$ and $p'_j=\\lfloor p_j/K\\rfloor$: $p'=" + vec(pk) + "$. The profits are rounded down and the factor uses $GR^e(I)$ and $n$."),
        _v: { dati: { p: p, w: w, c: c, eps: [eps.n, eps.d] }, valori: b.valori }
      };
    }
  });

  // ---- 25. branch-and-bound per il KP: prima iterazione (cap. 41) — complessa
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

  // ---- 26. PD completa per il KP con ricostruzione (cap. 17) — complessa
  add({
    id: "oc-g-kp-dp-completa", livello: "complessa", capitolo: "dp-knapsack",
    link: L("dynamic-programming/dp-knapsack/a-first-dp-algorithm/#box-16-texkpbu", "programmazione-dinamica/dp-knapsack/un-primo-algoritmo-di-pd/#box-16-texkpbu"),
    genera: function (rng, lingua) {
      var n = 4, p = [], w = [];
      for (var j = 0; j < n; j++) { w.push(ri(rng, 2, 6)); p.push(ri(rng, 3, 15)); }
      var c = ri(rng, 8, 11); if (sum(w) <= c) return null;
      var O = kpOptSets(p, w, c); if (O.sets.length !== 1) return null;
      var key = function (z, S) { return { k: z + "|" + S.join(","), t: "$v(4," + c + ")=" + z + "$, $\\tilde S=" + set(S) + "$" }; };
      var g = greedyOrder(effOrder(p, w), p, w, c), gp = greedyOrder(decOrder(p), p, w, c);
      var O3 = kpOptSets(p.slice(0, 3), w.slice(0, 3), c);
      var Oc = kpOptSets(p, w, c - 1);
      // insiemi ammissibili massimali per profitto decrescente (il secondo, il terzo, ...)
      var feas = [];
      for (var mk = 1; mk < (1 << n); mk++) {
        var pp = 0, wt = 0, S = [];
        for (j = 0; j < n; j++) if (mk & (1 << j)) { pp += p[j]; wt += w[j]; S.push(j + 1); }
        if (wt <= c) feas.push({ z: pp, S: S });
      }
      feas.sort(function (a, b2) { return b2.z - a.z || a.S.length - b2.S.length; });
      var cand = [key(g.z, g.set), key(gp.z, gp.set), key(O3.z, O3.sets[0]), key(Oc.z, Oc.sets[0])];
      for (j = 1; j < feas.length && j < 4; j++) cand.push(key(feas[j].z, feas[j].S));
      var b = build(rng, key(O.z, O.sets[0]), cand);
      if (!b) return null;
      return {
        testo: T(lingua, "Problema dello zaino 0-1 (KP: si sceglie un sottoinsieme di oggetti di profitto massimo con peso totale al più $c$) con capacità $c=" + c + "$: " + itemTab(lingua, p, w) + ". Si calcola la tabella della PD, $v(j,k)$ = massimo profitto con gli oggetti $1,\\dots,j$ e capacità $k$, e si ricostruisce una soluzione ottima risalendo da $(4," + c + ")$. Quali sono il valore ottimo e l'insieme ottimo $\\tilde S$?",
          "0-1 knapsack problem (KP: choose a subset of items of maximum profit with total weight at most $c$) with capacity $c=" + c + "$: " + itemTab(lingua, p, w) + ". The DP table, $v(j,k)$ = largest profit with items $1,\\dots,j$ and capacity $k$, is computed and an optimal solution is reconstructed going back from $(4," + c + ")$. What are the optimal value and the optimal set $\\tilde S$?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "La tabella dà $v(4," + c + ")=" + O.z + "$; risalendo da $(4," + c + ")$ (l'oggetto $j$ è scelto se $v(j,k)\\ne v(j-1,k)$) si ottiene $\\tilde S=" + set(O.sets[0]) + "$. Il greedy per efficienza dà solo $" + g.z + "$.",
          "The table gives $v(4," + c + ")=" + O.z + "$; going back from $(4," + c + ")$ (item $j$ is selected if $v(j,k)\\ne v(j-1,k)$) gives $\\tilde S=" + set(O.sets[0]) + "$. The greedy by efficiency only gives $" + g.z + "$."),
        _v: { dati: { p: p, w: w, c: c }, valori: b.valori }
      };
    }
  });

  // ---- 27. Wagner-Whitin completo su 5 periodi (cap. 25) — complessa
  add({
    id: "oc-g-uls-completa", livello: "complessa", capitolo: "dp-lot-sizing",
    link: L("dynamic-programming/dp-lot-sizing/a-dp-algorithm-for-the-uls-step-1-and-step-2/#box-30-texulssolvector",
            "programmazione-dinamica/dp-lot-sizing/un-algoritmo-di-pd-per-l-uls-passo-1-e-passo-2/#box-30-texulssolvector"),
    genera: function (rng, lingua) {
      var m = 5, d = [], sc = [], vc = [], hc = [];
      for (var t = 0; t < m; t++) { d.push(ri(rng, 1, 8) * 5); sc.push(ri(rng, 4, 9) * 10); vc.push(0); hc.push(ri(rng, 1, 2)); }
      // tutti i piani: setup nel periodo 1 obbligatorio, gli altri 2^(m-1)
      var plans = [];
      for (var mask = 0; mask < (1 << (m - 1)); mask++) {
        var runs = [1]; for (var q = 2; q <= m; q++) if (mask & (1 << (q - 2))) runs.push(q);
        var cost = 0; for (q = 0; q < runs.length; q++) cost += ulsCost(d, sc, vc, hc, runs[q], q + 1 < runs.length ? runs[q + 1] - 1 : m);
        plans.push({ runs: runs, cost: cost });
      }
      plans.sort(function (a, b) { return a.cost - b.cost; });
      if (plans[0].cost === plans[1].cost) return null;
      var R = ww(d, sc, vc, hc);
      var key = function (pl) { return { k: pl.cost + "|" + pl.runs.join(","), t: T(lingua, "$v(5)=" + pl.cost + "$, lotti nei periodi $" + pl.runs.join(",") + "$", "$v(5)=" + pl.cost + "$, runs in periods $" + pl.runs.join(",") + "$") }; };
      var l4l = plans.filter(function (x) { return x.runs.length === m; })[0], one = plans.filter(function (x) { return x.runs.length === 1; })[0];
      var b = build(rng, key(plans[0]), [key(plans[1]), key(l4l), key(one), key(plans[2])]);
      if (!b || R.v[m] !== plans[0].cost) return null;
      var head = ["t"].concat(range1(m).map(String));
      return {
        testo: T(lingua, "Lot sizing senza capacità (ULS) con costo variabile nullo, domanda $d_t$, costo di setup $sc_t$ e costo unitario $hc_t$ della scorta a fine periodo " + tab(head, [["d_t"].concat(d), ["sc_t"].concat(sc), ["hc_t"].concat(hc)]) + ". Con $c_{j,t}$ costo del lotto prodotto in $j$ per i periodi $j,\\dots,t$, la PD è $v(0)=0$, $v(t)=\\min_{1\\le j\\le t}\\{v(j-1)+c_{j,t}\\}$. Quali sono il costo ottimo $v(5)$ e i periodi dei lotti di produzione?",
          "Uncapacitated lot sizing (ULS) with zero variable cost, demand $d_t$, setup cost $sc_t$ and unit cost $hc_t$ of the stock at the end of the period " + tab(head, [["d_t"].concat(d), ["sc_t"].concat(sc), ["hc_t"].concat(hc)]) + ". With $c_{j,t}$ the cost of the run produced in $j$ for periods $j,\\dots,t$, the DP is $v(0)=0$, $v(t)=\\min_{1\\le j\\le t}\\{v(j-1)+c_{j,t}\\}$. What are the optimal cost $v(5)$ and the periods of the production runs?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "$v=" + vec(R.v) + "$ per $t=0,\\dots,5$; risalendo dagli argmin si trovano i lotti nei periodi $" + R.runs.join(",") + "$. Per la proprietà di Wagner e Whitin basta confrontare i lotti $c_{j,t}$.",
          "$v=" + vec(R.v) + "$ for $t=0,\\dots,5$; going back through the argmins gives runs in periods $" + R.runs.join(",") + "$. By the Wagner–Whitin property it is enough to compare the runs $c_{j,t}$."),
        _v: { dati: { d: d, sc: sc, vc: vc, hc: hc }, valori: b.valori }
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
  function metricDist(rng, n) { // punti su una griglia, distanze di Manhattan (metriche), tutte diverse
    var P = []; for (var i = 0; i < n; i++) P.push([ri(rng, 0, 9), ri(rng, 0, 9)]);
    var d = [[]], seen = {};
    for (i = 1; i <= n; i++) { d.push([]); for (var j = 0; j <= n; j++) d[i].push(0); }
    for (i = 1; i <= n; i++) for (j = i + 1; j <= n; j++) {
      var x = Math.abs(P[i - 1][0] - P[j - 1][0]) + Math.abs(P[i - 1][1] - P[j - 1][1]);
      if (x === 0 || seen[x]) return null; seen[x] = 1; d[i][j] = d[j][i] = x;
    }
    return d;
  }
  function primMST(d, n) { // archi dell'albero (padre, figlio), radice 1
    var inT = new Array(n + 1).fill(false), best = new Array(n + 1).fill(Infinity), par = new Array(n + 1).fill(0), w = 0, edges = [];
    best[1] = 0;
    for (var it = 0; it < n; it++) {
      var u = -1; for (var v = 1; v <= n; v++) if (!inT[v] && (u < 0 || best[v] < best[u])) u = v;
      inT[u] = true; if (par[u]) { w += d[par[u]][u]; edges.push([par[u], u]); }
      for (v = 1; v <= n; v++) if (!inT[v] && d[u][v] < best[v]) { best[v] = d[u][v]; par[v] = u; }
    }
    return { w: w, edges: edges };
  }
  function preorder(n, edges) { var ch = {}; edges.forEach(function (e) { (ch[e[0]] = ch[e[0]] || []).push(e[1]); }); var out = []; (function vis(u) { out.push(u); (ch[u] || []).sort(function (a, b) { return a - b; }).forEach(vis); })(1); return out; }
  function greedyClique(n, A, d) { var ord = range1(n).sort(function (a, b) { return d[b] - d[a] || a - b; }), K = []; ord.forEach(function (v) { if (K.every(function (u) { return A[u][v]; })) K.push(v); }); return K; }
  function lsCost(d, x, sc, vc, hc) { var s = 0, st = 0; for (var t = 0; t < d.length; t++) { st += x[t] - d[t]; if (st < 0) return null; s += (x[t] > 0 ? sc[t] : 0) + vc[t] * x[t] + hc[t] * st; } return st === 0 ? s : null; }
  function clsAll(d, cap, sc, vc, hc) { // tutti i piani ammissibili (m piccolo)
    var m = d.length, res = [];
    (function rec(t, x) {
      if (t === m) { var c0 = lsCost(d, x, sc, vc, hc); if (c0 !== null) res.push({ c: c0, x: x.slice() }); return; }
      for (var q = 0; q <= cap[t]; q++) { x.push(q); rec(t + 1, x); x.pop(); }
    })(0, []);
    res.sort(function (a, b) { return a.c - b.c; });
    return res;
  }
  function frPct(f) { return "\\frac{" + f.n + "}{" + f.d + "}"; }

  // ---- B4.1 UKP: valore e soluzione ottima (cap. 18)
  add({
    id: "oc-g-ukp-sol", livello: "media", capitolo: "dp-unbounded-knapsack",
    link: L2("dynamic-programming/dp-unbounded-knapsack/a-first-dp-algorithm", "programmazione-dinamica/dp-unbounded-knapsack/un-primo-algoritmo-di-pd", "box-14-texukpbu"),
    genera: function (rng, lingua) {
      var n = 3, p = [], w = [];
      for (var j = 0; j < n; j++) { w.push(ri(rng, 2, 6)); p.push(w[j] * ri(rng, 1, 3) + ri(rng, 0, 3)); }
      var c = ri(rng, 10, 15), best = -1, sols = [];
      for (var a = 0; a <= c / w[0]; a++) for (var b = 0; b <= c / w[1]; b++) for (var e = 0; e <= c / w[2]; e++) {
        if (a * w[0] + b * w[1] + e * w[2] > c) continue;
        var z = a * p[0] + b * p[1] + e * p[2];
        if (z > best) { best = z; sols = [[a, b, e]]; } else if (z === best) sols.push([a, b, e]);
      }
      if (sols.length !== 1) return null;
      var x = sols[0], o = effOrder(p, w), rc = c, g = [0, 0, 0];
      o.forEach(function (i) { g[i] = Math.floor(rc / w[i]); rc -= g[i] * w[i]; });
      var gz = g[0] * p[0] + g[1] * p[1] + g[2] * p[2];
      var kp = kpAll(p, w, c), kx = bitsOf(kp.best[0], n), kv = [0, 0, 0]; kx.forEach(function (i) { kv[i - 1] = 1; });
      var i1 = 0; for (j = 1; j < n; j++) if (Math.floor(c / w[j]) * p[j] > Math.floor(c / w[i1]) * p[i1]) i1 = j;
      var sv = [0, 0, 0]; sv[i1] = Math.floor(c / w[i1]);
      var key = function (z, v) { return { k: z + "|" + v.join(","), t: "$" + z + "$ con $x=" + vec(v) + "$" }; };
      var keyE = function (z, v) { return { k: z + "|" + v.join(","), t: "$" + z + "$ with $x=" + vec(v) + "$" }; };
      var K = lingua === "it" ? key : keyE;
      var bb = build(rng, K(best, x), [K(gz, g), K(kp.z, kv), K(sv[i1] * p[i1], sv), K(best, g)]);
      if (!bb) return null;
      return {
        testo: T(lingua, "Zaino illimitato (UKP): $n=3$ tipi di oggetto, ciascuno in copie illimitate, " + itemTab(lingua, p, w) + ", capacità $c=" + c + "$; $x_j$ è il numero di copie del tipo $j$. Qual è il valore ottimo, e con quale vettore $x$ (unico) si ottiene?",
          "Unbounded knapsack (UKP): $n=3$ item types, each in unlimited copies, " + itemTab(lingua, p, w) + ", capacity $c=" + c + "$; $x_j$ is the number of copies of type $j$. What is the optimal value, and with which (unique) vector $x$ is it obtained?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "La PD $v(k)=\\max_j\\{p_j+v(k-w_j)\\}$ dà $v(" + c + ")=" + best + "$, ottenuto con $x=" + vec(x) + "$. Il greedy per efficienza con ripetizioni dà $" + gz + "$ e lo zaino 0-1 $" + kp.z + "$.",
          "The DP $v(k)=\\max_j\\{p_j+v(k-w_j)\\}$ gives $v(" + c + ")=" + best + "$, attained by $x=" + vec(x) + "$. The greedy by efficiency with repetitions gives $" + gz + "$ and the 0-1 knapsack $" + kp.z + "$."),
        _v: { dati: { p: p, w: w, c: c }, valori: bb.valori }
      };
    }
  });

  // ---- B4.2 subset sum: quante somme raggiungibili (cap. 20)
  add({
    id: "oc-g-ssp-count", livello: "media", capitolo: "dp-subset-sum",
    link: L2("dynamic-programming/dp-subset-sum", "programmazione-dinamica/dp-subset-sum", "box-12-texsspbu"),
    genera: function (rng, lingua) {
      var n = 4, w = []; for (var j = 0; j < n; j++) w.push(ri(rng, 2, 9));
      var c = ri(rng, 10, 18);
      var r = [true]; for (var k = 1; k <= c; k++) r.push(false);
      w.forEach(function (x) { for (var k2 = c; k2 >= x; k2--) if (r[k2 - x]) r[k2] = true; });
      var cnt = r.filter(function (b) { return b; }).length, subs = 0;
      for (var m = 0; m < (1 << n); m++) { var s = 0; bitsOf(m, n).forEach(function (i) { s += w[i - 1]; }); if (s <= c) subs++; }
      var bb = build(rng, num(cnt), [num(cnt - 1), num(subs), num(c + 1), num(cnt + 1)]);
      if (!bb) return null;
      return {
        testo: T(lingua, "Subset sum con pesi $w=" + vec(w) + "$ e obiettivo $c=" + c + "$. $r(j,k)$ è vero se un sottoinsieme dei primi $j$ pesi ha somma esattamente $k$ (il sottoinsieme vuoto dà $k=0$). Per quanti valori $k\\in\\{0,1,\\dots," + c + "\\}$ la cella $r(" + n + ",k)$ è vera?",
          "Subset sum with weights $w=" + vec(w) + "$ and target $c=" + c + "$. $r(j,k)$ is true if a subset of the first $j$ weights sums to exactly $k$ (the empty subset gives $k=0$). For how many values $k\\in\\{0,1,\\dots," + c + "\\}$ is the cell $r(" + n + ",k)$ true?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Le somme raggiungibili fino a $" + c + "$ sono $" + cnt + "$, compreso $k=0$. Sottoinsiemi diversi possono dare la stessa somma: i sottoinsiemi con somma al più $" + c + "$ sono $" + subs + "$.",
          "The reachable sums up to $" + c + "$ are $" + cnt + "$, including $k=0$. Different subsets may give the same sum: the subsets with sum at most $" + c + "$ are $" + subs + "$."),
        _v: { dati: { w: w, c: c }, valori: bb.valori }
      };
    }
  });

  // ---- B4.3 cambio monete: resti non ottenibili (cap. 27)
  add({
    id: "oc-g-ccp-unreach", livello: "media", capitolo: "dp-coin-change",
    link: L2("dynamic-programming/dp-coin-change", "programmazione-dinamica/dp-coin-change", "box-13-texccpbu"),
    genera: function (rng, lingua) {
      var a = ri(rng, 3, 5), b = ri(rng, a + 1, 9), c = ri(rng, 10, 20), w = [a, b];
      var v = [0]; for (var k = 1; k <= c; k++) { var m = Infinity; w.forEach(function (x) { if (x <= k && v[k - x] + 1 < m) m = v[k - x] + 1; }); v.push(m); }
      var cnt = 0, nm = 0; for (k = 1; k <= c; k++) { if (v[k] === Infinity) cnt++; if (k % a && k % b) nm++; }
      if (cnt === 0) return null;
      var bb = build(rng, num(cnt), [num(nm), num(cnt + 1), num(cnt - 1), num(c - cnt)]);
      if (!bb) return null;
      return {
        testo: T(lingua, "Cambio monete (CCP) con tagli $w=" + vec(w) + "$ in quantità illimitata. $v(k)$ è il minimo numero di monete per dare esattamente il resto $k$: $v(0)=0$, $v(k)=\\min_{j:\\,w_j\\le k}\\{1+v(k-w_j)\\}$, e $v(k)=+\\infty$ se il resto non si può dare. Per quanti valori $k\\in\\{1,\\dots," + c + "\\}$ si ha $v(k)=+\\infty$?",
          "Coin change (CCP) with denominations $w=" + vec(w) + "$ in unlimited supply. $v(k)$ is the minimum number of coins to pay exactly the amount $k$: $v(0)=0$, $v(k)=\\min_{j:\\,w_j\\le k}\\{1+v(k-w_j)\\}$, and $v(k)=+\\infty$ if the amount cannot be paid. For how many values $k\\in\\{1,\\dots," + c + "\\}$ is $v(k)=+\\infty$?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Calcolando $v(1),\\dots,v(" + c + ")$ si trovano $" + cnt + "$ resti non ottenibili. Non basta escludere i multipli di $" + a + "$ e di $" + b + "$: anche le loro somme sono ottenibili.",
          "Computing $v(1),\\dots,v(" + c + ")$ one finds $" + cnt + "$ unobtainable amounts. Excluding the multiples of $" + a + "$ and $" + b + "$ is not enough: their sums are obtainable too."),
        _v: { dati: { w: w, c: c }, valori: bb.valori }
      };
    }
  });

  // ---- B4.4 taglio delle aste: valore e pezzi (cap. 28)
  add({
    id: "oc-g-rcp-sol", livello: "media", capitolo: "dp-rod-cutting",
    link: L2("dynamic-programming/dp-rod-cutting/a-first-dp-algorithm", "programmazione-dinamica/dp-rod-cutting/un-primo-algoritmo-di-pd", "box-14-texrcpbu"),
    genera: function (rng, lingua) {
      var n = ri(rng, 5, 6), p = [], last = 0;
      for (var j = 1; j <= n; j++) { last += ri(rng, 1, 5); p.push(last); }
      var parts = [];
      (function gen(rem, mx, acc) { if (rem === 0) { parts.push(acc.slice()); return; } for (var q = Math.min(rem, mx); q >= 1; q--) { acc.push(q); gen(rem - q, q, acc); acc.pop(); } })(n, n, []);
      var val = function (P) { var s = 0; P.forEach(function (q) { s += p[q - 1]; }); return s; };
      parts.sort(function (A, B) { return val(B) - val(A); });
      if (val(parts[0]) === val(parts[1])) return null;
      var key = function (P) { return { k: val(P) + "|" + P.join(","), t: "$" + val(P) + "$: " + T(lingua, "pezzi ", "pieces ") + "$" + P.join("+") + "$" }; };
      var bb = build(rng, key(parts[0]), [key([n]), key(parts[1]), key(parts[2]), key(range1(n).map(function () { return 1; }))]);
      if (!bb) return null;
      var head = ["j"].concat(range1(n).map(String));
      return {
        testo: T(lingua, "Taglio delle aste (RCP): un'asta di lunghezza $n=" + n + "$ si taglia in pezzi di lunghezza intera, e il pezzo di lunghezza $j$ si vende a $p_j$: " + tab(head, [["p_j"].concat(p)]) + ". Qual è il ricavo massimo e con quali pezzi (taglio ottimo unico, a meno dell'ordine)?",
          "Rod cutting (RCP): a rod of length $n=" + n + "$ is cut into pieces of integer length, and the piece of length $j$ sells at $p_j$: " + tab(head, [["p_j"].concat(p)]) + ". What is the largest revenue and with which pieces (unique optimal cut, up to order)?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "La PD $v(\\ell)=\\max_j\\{p_j+v(\\ell-j)\\}$ dà $v(" + n + ")=" + val(parts[0]) + "$ con i pezzi $" + parts[0].join("+") + "$. Vendere l'asta intera dà $" + p[n - 1] + "$.",
          "The DP $v(\\ell)=\\max_j\\{p_j+v(\\ell-j)\\}$ gives $v(" + n + ")=" + val(parts[0]) + "$ with pieces $" + parts[0].join("+") + "$. Selling the whole rod gives $" + p[n - 1] + "$."),
        _v: { dati: { p: p, n: n }, valori: bb.valori }
      };
    }
  });

  // ---- B4.5-6 zaino limitato (cap. 19)
  function bkpBest(p, w, b, c, types) {
    var best = 0, n = types; (function rec(j, cap, val) { if (j === n) { if (val > best) best = val; return; } for (var d = 0; d <= b[j] && d * w[j] <= cap; d++) rec(j + 1, cap - d * w[j], val + d * p[j]); })(0, c, 0);
    return best;
  }
  function bkpInst(rng) { var p = [], w = [], b = []; for (var j = 0; j < 3; j++) { w.push(ri(rng, 2, 5)); p.push(ri(rng, 3, 12)); b.push(ri(rng, 1, 3)); } return { p: p, w: w, b: b }; }
  function bkpTab(lingua, I) { return tab(["j", "1", "2", "3"], [["p_j"].concat(I.p), ["w_j"].concat(I.w), ["b_j"].concat(I.b)]); }
  add({
    id: "oc-g-bkp-dp", livello: "facile", capitolo: "dp-bounded-knapsack",
    link: L2("dynamic-programming/dp-bounded-knapsack", "programmazione-dinamica/dp-bounded-knapsack", "box-15-texbkpbu"),
    genera: function (rng, lingua) {
      var I = bkpInst(rng), c = ri(rng, 8, 12);
      var z = bkpBest(I.p, I.w, I.b, c, 3), kp = kpAll(I.p, I.w, c).z, uk = ukp(I.p, I.w, c)[c];
      var bb = build(rng, num(z), [num(kp), num(uk), num(z + 1), num(z - 1)]);
      if (!bb || z === kp) return null;
      return {
        testo: T(lingua, "Zaino limitato (BKP): il tipo $j$ ha profitto $p_j$, peso $w_j$ e $b_j$ copie disponibili, " + bkpTab(lingua, I) + ", capacità $c=" + c + "$. Con $v(j,k)=\\max_{0\\le d\\le\\min\\{b_j,\\lfloor k/w_j\\rfloor\\}}\\{d\\,p_j+v(j-1,k-d\\,w_j)\\}$ e $v(0,k)=0$, quanto vale il valore ottimo $v(3," + c + ")$?",
          "Bounded knapsack (BKP): type $j$ has profit $p_j$, weight $w_j$ and $b_j$ available copies, " + bkpTab(lingua, I) + ", capacity $c=" + c + "$. With $v(j,k)=\\max_{0\\le d\\le\\min\\{b_j,\\lfloor k/w_j\\rfloor\\}}\\{d\\,p_j+v(j-1,k-d\\,w_j)\\}$ and $v(0,k)=0$, what is the optimal value $v(3," + c + ")$?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "La PD dà $v(3," + c + ")=" + z + "$. Con una sola copia per tipo (KP) si avrebbe $" + kp + "$, con copie illimitate (UKP) $" + uk + "$.",
          "The DP gives $v(3," + c + ")=" + z + "$. With one copy per type (KP) one would get $" + kp + "$, with unlimited copies (UKP) $" + uk + "$."),
        _v: { dati: { p: I.p, w: I.w, b: I.b, c: c, j: 3, k: c }, valori: bb.valori }
      };
    }
  });
  add({
    id: "oc-g-bkp-cella", livello: "media", capitolo: "dp-bounded-knapsack",
    link: L2("dynamic-programming/dp-bounded-knapsack", "programmazione-dinamica/dp-bounded-knapsack", "box-3-texbkpvalues"),
    genera: function (rng, lingua) {
      var I = bkpInst(rng), c = ri(rng, 9, 12), k = ri(rng, 5, c);
      var x = bkpBest(I.p, I.w, I.b, k, 2), x1 = bkpBest(I.p, I.w, I.b, k, 1), x3 = bkpBest(I.p, I.w, I.b, k, 3);
      var uk = ukp(I.p.slice(0, 2), I.w.slice(0, 2), k)[k], kp = kpAll(I.p.slice(0, 2), I.w.slice(0, 2), k).z;
      var bb = build(rng, num(x), [num(x1), num(x3), num(uk), num(kp)]);
      if (!bb) return null;
      return {
        testo: T(lingua, "Zaino limitato (BKP): il tipo $j$ ha profitto $p_j$, peso $w_j$ e $b_j$ copie, " + bkpTab(lingua, I) + ", capacità $c=" + c + "$. $v(j,k)$ è il massimo profitto con i soli tipi $1,\\dots,j$ e capacità $k$, con al più $b_j$ copie del tipo $j$. Quanto vale $v(2," + k + ")$?",
          "Bounded knapsack (BKP): type $j$ has profit $p_j$, weight $w_j$ and $b_j$ copies, " + bkpTab(lingua, I) + ", capacity $c=" + c + "$. $v(j,k)$ is the largest profit with types $1,\\dots,j$ only and capacity $k$, with at most $b_j$ copies of type $j$. What is $v(2," + k + ")$?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Con i tipi $1$ e $2$ e capacità $" + k + "$, rispettando i limiti $b_1=" + I.b[0] + "$ e $b_2=" + I.b[1] + "$, il massimo è $" + x + "$. Senza limiti sulle copie si avrebbe $" + uk + "$.",
          "With types $1$ and $2$ and capacity $" + k + "$, respecting the bounds $b_1=" + I.b[0] + "$ and $b_2=" + I.b[1] + "$, the maximum is $" + x + "$. Without bounds on the copies one would get $" + uk + "$."),
        _v: { dati: { p: I.p, w: I.w, b: I.b, c: c, j: 2, k: k }, valori: bb.valori }
      };
    }
  });

  // ---- B4.7-8 zaino a scelta multipla (cap. 21)
  function mckpInst(rng) {
    var p = [], w = []; for (var j = 0; j < 6; j++) { p.push(ri(rng, 2, 9)); w.push(ri(rng, 1, 6)); }
    var mins = 0; for (var h = 0; h < 3; h++) mins += Math.min(w[2 * h], w[2 * h + 1]);
    return { p: p, w: w, c: mins + ri(rng, 1, 6) };
  }
  function mckpAll(I, atMost) {
    var res = [], ch = atMost ? [-1, 0, 1] : [0, 1];
    ch.forEach(function (a) { ch.forEach(function (b) { ch.forEach(function (e) {
      var s = [a, b, e], pp = 0, ww = 0, pick = [];
      s.forEach(function (x, h) { if (x >= 0) { pp += I.p[2 * h + x]; ww += I.w[2 * h + x]; pick.push(2 * h + x + 1); } });
      if (ww <= I.c) res.push({ z: pp, pick: pick });
    }); }); });
    res.sort(function (A, B) { return B.z - A.z; });
    return res;
  }
  function mckpText(lingua, I) {
    return T(lingua, "Zaino a scelta multipla (MCKP): classi $\\mathscr{J}_1=\\{1,2\\}$, $\\mathscr{J}_2=\\{3,4\\}$, $\\mathscr{J}_3=\\{5,6\\}$, oggetti " + itemTab(lingua, I.p, I.w) + ", capacità $c=" + I.c + "$; si sceglie esattamente un oggetto per classe.",
      "Multiple-choice knapsack (MCKP): classes $\\mathscr{J}_1=\\{1,2\\}$, $\\mathscr{J}_2=\\{3,4\\}$, $\\mathscr{J}_3=\\{5,6\\}$, items " + itemTab(lingua, I.p, I.w) + ", capacity $c=" + I.c + "$; exactly one item per class is chosen.");
  }
  add({
    id: "oc-g-mckp-dp", livello: "facile", capitolo: "dp-multiple-choice-knapsack",
    link: L2("dynamic-programming/dp-multiple-choice-knapsack", "programmazione-dinamica/dp-multiple-choice-knapsack", "box-13-texmckpbu"),
    genera: function (rng, lingua) {
      var I = mckpInst(rng), R = mckpAll(I, false), z = R[0].z, le = mckpAll(I, true)[0].z;
      var nocap = 0; for (var h = 0; h < 3; h++) nocap += Math.max(I.p[2 * h], I.p[2 * h + 1]);
      var light = 0; for (h = 0; h < 3; h++) light += I.w[2 * h] <= I.w[2 * h + 1] ? I.p[2 * h] : I.p[2 * h + 1];
      var bb = build(rng, num(z), [num(nocap), num(le), num(light), num(z - 1)]);
      if (!bb) return null;
      return {
        testo: mckpText(lingua, I) + T(lingua, " Con $v(h,k)=\\max_{j\\in\\mathscr{J}_h:\\,w_j\\le k}\\{p_j+v(h-1,k-w_j)\\}$, $v(0,k)=0$, quanto vale il valore ottimo $v(3," + I.c + ")$?",
          " With $v(h,k)=\\max_{j\\in\\mathscr{J}_h:\\,w_j\\le k}\\{p_j+v(h-1,k-w_j)\\}$, $v(0,k)=0$, what is the optimal value $v(3," + I.c + ")$?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Il valore ottimo è $" + z + "$. Ignorando la capacità si prenderebbe il miglior oggetto di ogni classe ($" + nocap + "$); con «al più un oggetto per classe» si risolverebbe un altro problema ($" + le + "$).",
          "The optimal value is $" + z + "$. Ignoring the capacity one would take the best item of every class ($" + nocap + "$); with «at most one item per class» another problem would be solved ($" + le + "$)."),
        _v: { dati: { p: I.p, w: I.w, c: I.c }, valori: bb.valori }
      };
    }
  });
  add({
    id: "oc-g-mckp-sol", livello: "media", capitolo: "dp-multiple-choice-knapsack",
    link: L2("dynamic-programming/dp-multiple-choice-knapsack", "programmazione-dinamica/dp-multiple-choice-knapsack", "box-14-texmckpsol"),
    genera: function (rng, lingua) {
      var I = mckpInst(rng), R = mckpAll(I, false);
      if (R.length < 3 || R[0].z === R[1].z) return null;
      var key = function (r) { return { k: r.z + "|" + r.pick.join(","), t: "$" + set(r.pick) + "$, " + T(lingua, "valore", "value") + " $" + r.z + "$" }; };
      var cands = R.slice(1, 4).map(key);
      var bb = build(rng, key(R[0]), cands.concat([{ k: (R[0].z + 1) + "|" + R[0].pick.join(","), t: "$" + set(R[0].pick) + "$, " + T(lingua, "valore", "value") + " $" + (R[0].z + 1) + "$" }]));
      if (!bb) return null;
      return {
        testo: mckpText(lingua, I) + T(lingua, " Quale scelta di oggetti è ottima (la soluzione ottima è unica), e quanto vale?", " Which choice of items is optimal (the optimal solution is unique), and what is its value?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "La PD per classi e la ricostruzione all'indietro danno $" + set(R[0].pick) + "$, di valore $" + R[0].z + "$; la seconda migliore scelta ammissibile vale $" + R[1].z + "$.",
          "The DP by classes and the backward reconstruction give $" + set(R[0].pick) + "$, of value $" + R[0].z + "$; the second best feasible choice is worth $" + R[1].z + "$."),
        _v: { dati: { p: I.p, w: I.w, c: I.c }, valori: bb.valori }
      };
    }
  });

  // ---- B4.9-10 zaino multidimensionale (cap. 22)
  function mdkpInst(rng) { var p = [], w1 = [], w2 = []; for (var j = 0; j < 4; j++) { p.push(ri(rng, 3, 10)); w1.push(ri(rng, 1, 6)); w2.push(ri(rng, 1, 6)); } return { p: p, w1: w1, w2: w2, c1: ri(rng, 7, 11), c2: ri(rng, 7, 11) }; }
  function mdkpAll(I) { var res = []; for (var m = 0; m < 16; m++) { var S = bitsOf(m, 4), pp = 0, a = 0, b = 0; S.forEach(function (j) { pp += I.p[j - 1]; a += I.w1[j - 1]; b += I.w2[j - 1]; }); if (a <= I.c1 && b <= I.c2) res.push({ z: pp, S: S }); } res.sort(function (A, B) { return B.z - A.z; }); return res; }
  function mdkpText(lingua, I) {
    var t = tab(["j", "1", "2", "3", "4"], [["p_j"].concat(I.p), ["w_{1j}"].concat(I.w1), ["w_{2j}"].concat(I.w2)]);
    return T(lingua, "Zaino multidimensionale (MDKP) con due dimensioni di capacità $c_1=" + I.c1 + "$ e $c_2=" + I.c2 + "$; l'oggetto $j$ ha profitto $p_j$ e pesi $w_{1j}$, $w_{2j}$: " + t + ". Ogni oggetto si prende al più una volta.",
      "Multidimensional knapsack (MDKP) with two dimensions of capacity $c_1=" + I.c1 + "$ and $c_2=" + I.c2 + "$; item $j$ has profit $p_j$ and weights $w_{1j}$, $w_{2j}$: " + t + ". Every item is taken at most once.");
  }
  add({
    id: "oc-g-mdkp-dp", livello: "facile", capitolo: "dp-multidimensional-knapsack",
    link: L2("dynamic-programming/dp-multidimensional-knapsack", "programmazione-dinamica/dp-multidimensional-knapsack", "box-11-texmdkpbu"),
    genera: function (rng, lingua) {
      var I = mdkpInst(rng), z = mdkpAll(I)[0].z;
      var k1 = kpAll(I.p, I.w1, I.c1).z, k2 = kpAll(I.p, I.w2, I.c2).z;
      var ag = kpAll(I.p, I.w1.map(function (x, j) { return x + I.w2[j]; }), I.c1 + I.c2).z;
      var bb = build(rng, num(z), [num(k1), num(k2), num(ag), num(z + 1)]);
      if (!bb || (k1 === z && k2 === z)) return null;
      return {
        testo: mdkpText(lingua, I) + T(lingua, " Con la PD $v(j,(k_1,k_2))$ su entrambe le capacità, quanto vale il valore ottimo?", " With the DP $v(j,(k_1,k_2))$ on both capacities, what is the optimal value?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Il valore ottimo è $" + z + "$. Considerando una sola dimensione si otterrebbe $" + k1 + "$ o $" + k2 + "$, e sommando i vincoli $" + ag + "$: sono rilassamenti, non soluzioni dell'MDKP.",
          "The optimal value is $" + z + "$. Considering a single dimension one would get $" + k1 + "$ or $" + k2 + "$, and adding the constraints $" + ag + "$: these are relaxations, not MDKP solutions."),
        _v: { dati: { p: I.p, w1: I.w1, w2: I.w2, c1: I.c1, c2: I.c2 }, valori: bb.valori }
      };
    }
  });
  add({
    id: "oc-g-mdkp-sol", livello: "media", capitolo: "dp-multidimensional-knapsack",
    link: L2("dynamic-programming/dp-multidimensional-knapsack", "programmazione-dinamica/dp-multidimensional-knapsack", "box-13-texmdkpsol"),
    genera: function (rng, lingua) {
      var I = mdkpInst(rng), R = mdkpAll(I);
      if (R.length < 4 || R[0].z === R[1].z) return null;
      var k1 = kpAll(I.p, I.w1, I.c1);
      var bb = build(rng, setKey(R[0].S), [setKey(R[1].S), setKey(R[2].S), setKey(bitsOf(k1.best[0], 4)), setKey(R[3].S)]);
      if (!bb) return null;
      return {
        testo: mdkpText(lingua, I) + T(lingua, " Quale insieme di oggetti è la soluzione ottima (unica)?", " Which set of items is the (unique) optimal solution?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "$" + set(R[0].S) + "$ rispetta entrambe le capacità e vale $" + R[0].z + "$; la seconda migliore soluzione ammissibile vale $" + R[1].z + "$.",
          "$" + set(R[0].S) + "$ respects both capacities and is worth $" + R[0].z + "$; the second best feasible solution is worth $" + R[1].z + "$."),
        _v: { dati: { p: I.p, w1: I.w1, w2: I.w2, c1: I.c1, c2: I.c2 }, valori: bb.valori }
      };
    }
  });

  // ---- B4.11-12 zaino con setup (cap. 23)
  function kpsInst(rng) { var p = [], w = []; for (var j = 0; j < 4; j++) { p.push(ri(rng, 3, 9)); w.push(ri(rng, 1, 5)); } return { p: p, w: w, f: [ri(rng, 1, 4), ri(rng, 1, 4)], s: [ri(rng, 1, 3), ri(rng, 1, 3)], c: ri(rng, 8, 12) }; }
  function kpsAll(I, mode) { // mode: "ok" | "nof" | "nos" | "peritem"
    var res = [];
    for (var m = 0; m < 16; m++) {
      var S = bitsOf(m, 4), pp = 0, ww = 0, open = [false, false];
      S.forEach(function (j) { pp += I.p[j - 1]; ww += I.w[j - 1]; open[j <= 2 ? 0 : 1] = true; if (mode === "peritem") { pp -= I.f[j <= 2 ? 0 : 1]; ww += I.s[j <= 2 ? 0 : 1]; } });
      if (mode !== "peritem") for (var h = 0; h < 2; h++) if (open[h]) { if (mode !== "nof") pp -= I.f[h]; if (mode !== "nos") ww += I.s[h]; }
      if (ww <= I.c) res.push({ z: pp, S: S });
    }
    res.sort(function (A, B) { return B.z - A.z; });
    return res;
  }
  function kpsText(lingua, I) {
    return T(lingua, "Zaino con setup (KPS): classi $\\mathscr{J}_1=\\{1,2\\}$ e $\\mathscr{J}_2=\\{3,4\\}$, oggetti " + itemTab(lingua, I.p, I.w) + ", capacità $c=" + I.c + "$. Usare la classe $h$ costa una volta il profitto di setup $f_h$ e il peso di setup $s_h$, con $f=" + vec(I.f) + "$ e $s=" + vec(I.s) + "$; si massimizza il profitto degli oggetti meno i setup pagati.",
      "Knapsack with setups (KPS): classes $\\mathscr{J}_1=\\{1,2\\}$ and $\\mathscr{J}_2=\\{3,4\\}$, items " + itemTab(lingua, I.p, I.w) + ", capacity $c=" + I.c + "$. Using class $h$ costs once the setup profit $f_h$ and the setup weight $s_h$, with $f=" + vec(I.f) + "$ and $s=" + vec(I.s) + "$; the profit of the items minus the paid setups is maximized.");
  }
  add({
    id: "oc-g-kps-dp", livello: "facile", capitolo: "dp-knapsack-setups",
    link: L2("dynamic-programming/dp-knapsack-setups", "programmazione-dinamica/dp-knapsack-setups", "box-21-texkpsbu"),
    genera: function (rng, lingua) {
      var I = kpsInst(rng), z = kpsAll(I, "ok")[0].z;
      if (z <= 0) return null;
      var bb = build(rng, num(z), [num(kpsAll(I, "nof")[0].z), num(kpsAll(I, "nos")[0].z), num(kpsAll(I, "peritem")[0].z), num(z + 1)]);
      if (!bb) return null;
      return {
        testo: kpsText(lingua, I) + T(lingua, " Quanto vale il valore ottimo?", " What is the optimal value?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Il valore ottimo è $" + z + "$. Dimenticare i costi di setup dà $" + kpsAll(I, "nof")[0].z + "$, dimenticare i pesi di setup $" + kpsAll(I, "nos")[0].z + "$, pagare il setup per ogni oggetto $" + kpsAll(I, "peritem")[0].z + "$.",
          "The optimal value is $" + z + "$. Forgetting the setup costs gives $" + kpsAll(I, "nof")[0].z + "$, forgetting the setup weights $" + kpsAll(I, "nos")[0].z + "$, paying the setup for every item $" + kpsAll(I, "peritem")[0].z + "$."),
        _v: { dati: { p: I.p, w: I.w, f: I.f, s: I.s, c: I.c }, valori: bb.valori }
      };
    }
  });
  add({
    id: "oc-g-kps-sol", livello: "media", capitolo: "dp-knapsack-setups",
    link: L2("dynamic-programming/dp-knapsack-setups", "programmazione-dinamica/dp-knapsack-setups", "box-23-texkpssol"),
    genera: function (rng, lingua) {
      var I = kpsInst(rng), R = kpsAll(I, "ok");
      if (R[0].z <= 0 || R[0].z === R[1].z || R.length < 4) return null;
      var bb = build(rng, setKey(R[0].S), [setKey(R[1].S), setKey(R[2].S), setKey(kpsAll(I, "nof")[0].S), setKey(R[3].S)]);
      if (!bb) return null;
      return {
        testo: kpsText(lingua, I) + T(lingua, " Quale insieme di oggetti è la soluzione ottima (unica)?", " Which set of items is the (unique) optimal solution?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "$" + set(R[0].S) + "$ vale $" + R[0].z + "$, setup compresi; la seconda migliore soluzione vale $" + R[1].z + "$.",
          "$" + set(R[0].S) + "$ is worth $" + R[0].z + "$, setups included; the second best solution is worth $" + R[1].z + "$."),
        _v: { dati: { p: I.p, w: I.w, f: I.f, s: I.s, c: I.c }, valori: bb.valori }
      };
    }
  });

  // ---- B4.13-14 zaino multiplo (cap. 24)
  function mkpInst(rng) { var p = [], w = []; for (var j = 0; j < 4; j++) { p.push(ri(rng, 3, 10)); w.push(ri(rng, 2, 5)); } return { p: p, w: w, c: [ri(rng, 4, 8), ri(rng, 4, 8)] }; }
  function mkpAll(I) { // assegnamenti: 0 fuori, 1 o 2 zaino
    var res = [];
    for (var a = 0; a < 81; a++) { var x = a, L0 = [0, 0, 0], pp = 0, S = []; for (var j = 0; j < 4; j++) { var k = x % 3; x = Math.floor(x / 3); if (k) { L0[k] += I.w[j]; pp += I.p[j]; S.push(j + 1); } } if (L0[1] <= I.c[0] && L0[2] <= I.c[1]) res.push({ z: pp, S: S }); }
    res.sort(function (A, B) { return B.z - A.z; });
    return res;
  }
  function mkpText(lingua, I) {
    return T(lingua, "Zaino multiplo (MKP): due zaini di capacità $c_1=" + I.c[0] + "$ e $c_2=" + I.c[1] + "$, oggetti " + itemTab(lingua, I.p, I.w) + "; ogni oggetto va in al più uno zaino.",
      "Multiple knapsack (MKP): two knapsacks of capacity $c_1=" + I.c[0] + "$ and $c_2=" + I.c[1] + "$, items " + itemTab(lingua, I.p, I.w) + "; every item goes into at most one knapsack.");
  }
  add({
    id: "oc-g-mkp-dp", livello: "facile", capitolo: "dp-multiple-knapsack",
    link: L2("dynamic-programming/dp-multiple-knapsack", "programmazione-dinamica/dp-multiple-knapsack", "box-12-texmkpbu"),
    genera: function (rng, lingua) {
      var I = mkpInst(rng), z = mkpAll(I)[0].z, one = kpAll(I.p, I.w, I.c[0] + I.c[1]).z, big = kpAll(I.p, I.w, Math.max(I.c[0], I.c[1])).z;
      var bb = build(rng, num(z), [num(one), num(big), num(z - 1), num(z + 1)]);
      if (!bb || one === z) return null;
      return {
        testo: mkpText(lingua, I) + T(lingua, " Con la PD sugli stati $(j,(k_1,k_2))$ delle capacità residue, quanto vale il valore ottimo?", " With the DP on the states $(j,(k_1,k_2))$ of residual capacities, what is the optimal value?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Il valore ottimo è $" + z + "$. Un solo zaino di capacità $" + (I.c[0] + I.c[1]) + "$ darebbe $" + one + "$: è un upper bound, perché quella soluzione non si divide fra i due zaini.",
          "The optimal value is $" + z + "$. A single knapsack of capacity $" + (I.c[0] + I.c[1]) + "$ would give $" + one + "$: it is an upper bound, since that solution cannot be split between the two knapsacks."),
        _v: { dati: { p: I.p, w: I.w, c: I.c }, valori: bb.valori }
      };
    }
  });
  add({
    id: "oc-g-mkp-sol", livello: "media", capitolo: "dp-multiple-knapsack",
    link: L2("dynamic-programming/dp-multiple-knapsack", "programmazione-dinamica/dp-multiple-knapsack", "box-14-texmkpsol"),
    genera: function (rng, lingua) {
      var I = mkpInst(rng), R = mkpAll(I), sets = [], seen = {};
      R.forEach(function (r) { var k = r.S.join(","); if (!seen[k]) { seen[k] = 1; sets.push(r); } });
      if (sets.length < 4 || sets[0].z === sets[1].z) return null;
      var one = kpAll(I.p, I.w, I.c[0] + I.c[1]);
      var bb = build(rng, setKey(sets[0].S), [setKey(bitsOf(one.best[0], 4)), setKey(sets[1].S), setKey(sets[2].S), setKey(sets[3].S)]);
      if (!bb) return null;
      return {
        testo: mkpText(lingua, I) + T(lingua, " Quale insieme di oggetti viene inserito negli zaini nella soluzione ottima (l'insieme ottimo è unico)?", " Which set of items is inserted into the knapsacks in the optimal solution (the optimal set is unique)?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "L'insieme $" + set(sets[0].S) + "$, di valore $" + sets[0].z + "$, si divide fra i due zaini rispettando le capacità; il secondo miglior insieme vale $" + sets[1].z + "$.",
          "The set $" + set(sets[0].S) + "$, of value $" + sets[0].z + "$, can be split between the two knapsacks respecting the capacities; the second best set is worth $" + sets[1].z + "$."),
        _v: { dati: { p: I.p, w: I.w, c: I.c }, valori: bb.valori }
      };
    }
  });

  // ---- B4.15-16 lot sizing con capacità (cap. 26)
  function clsInst(rng) { var d = [], cap = [], sc = [], hc = [], vc = [0, 0, 0]; for (var t = 0; t < 3; t++) { d.push(ri(rng, 1, 5)); cap.push(ri(rng, 3, 7)); sc.push(ri(rng, 5, 15)); hc.push(ri(rng, 1, 3)); } return { d: d, cap: cap, sc: sc, vc: vc, hc: hc }; }
  function clsText(lingua, I) {
    var t = tab(["t", "1", "2", "3"], [["d_t"].concat(I.d), ["cap_t"].concat(I.cap), ["sc_t"].concat(I.sc), ["hc_t"].concat(I.hc)]);
    return T(lingua, "Lot sizing con capacità (CLS) su $3$ periodi: domanda $d_t$, capacità $cap_t$, costo di setup $sc_t$ (pagato se si produce nel periodo $t$) e costo $hc_t$ per unità di scorta a fine periodo, costo variabile nullo, scorte iniziale e finale nulle: " + t + ".",
      "Capacitated lot sizing (CLS) over $3$ periods: demand $d_t$, capacity $cap_t$, setup cost $sc_t$ (paid if we produce in period $t$) and cost $hc_t$ per unit of stock at the end of a period, zero variable cost, zero initial and final stock: " + t + ".");
  }
  add({
    id: "oc-g-cls-dp", livello: "facile", capitolo: "dp-capacitated-lot-sizing",
    link: L2("dynamic-programming/dp-capacitated-lot-sizing", "programmazione-dinamica/dp-capacitated-lot-sizing", "box-18-texclsbu"),
    genera: function (rng, lingua) {
      var I = clsInst(rng), R = clsAll(I.d, I.cap, I.sc, I.vc, I.hc);
      if (!R.length) return null;
      var l4l = lsCost(I.d, I.d, I.sc, I.vc, I.hc), big = [99, 99, 99], U = clsAll(I.d, big.map(function () { return sum(I.d); }), I.sc, I.vc, I.hc)[0].c;
      if (l4l === null || I.d.some(function (x, t) { return x > I.cap[t]; })) return null;
      var bb = build(rng, num(R[0].c), [num(l4l), num(U), num(R[0].c + 1), num(R.length > 1 ? R[1].c : R[0].c + 2)]);
      if (!bb) return null;
      return {
        testo: clsText(lingua, I) + T(lingua, " Con la PD sugli stati $(t,k)$ (periodo, scorta finale), quanto vale il costo ottimo $v(3,0)$?", " With the DP on the states $(t,k)$ (period, final stock), what is the optimal cost $v(3,0)$?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Il costo ottimo è $" + R[0].c + "$, con il piano $x=" + vec(R[0].x) + "$. Il piano lot-for-lot costa $" + l4l + "$; ignorando le capacità si otterrebbe $" + U + "$.",
          "The optimal cost is $" + R[0].c + "$, with the plan $x=" + vec(R[0].x) + "$. The lot-for-lot plan costs $" + l4l + "$; ignoring the capacities one would get $" + U + "$."),
        _v: { dati: { d: I.d, cap: I.cap, sc: I.sc, vc: I.vc, hc: I.hc }, valori: bb.valori }
      };
    }
  });
  add({
    id: "oc-g-cls-plan", livello: "complessa", capitolo: "dp-capacitated-lot-sizing",
    link: L2("dynamic-programming/dp-capacitated-lot-sizing", "programmazione-dinamica/dp-capacitated-lot-sizing", "box-20-texclssolvector"),
    genera: function (rng, lingua) {
      var I = clsInst(rng), R = clsAll(I.d, I.cap, I.sc, I.vc, I.hc);
      if (R.length < 4 || R[0].c === R[1].c) return null;
      var key = function (r) { return { k: r.c + "|" + r.x.join(","), t: "$x=" + vec(r.x) + "$, " + T(lingua, "costo", "cost") + " $" + r.c + "$" }; };
      var l4l = lsCost(I.d, I.d, I.sc, I.vc, I.hc);
      var cands = [key(R[1]), key(R[2]), key(R[3])];
      if (l4l !== null && I.d.every(function (x, t) { return x <= I.cap[t]; })) cands.unshift(key({ c: l4l, x: I.d }));
      var bb = build(rng, key(R[0]), cands);
      if (!bb) return null;
      return {
        testo: clsText(lingua, I) + T(lingua, " Quale piano di produzione $x=(x_1,x_2,x_3)$ è ottimo (il piano ottimo è unico), e quanto costa?", " Which production plan $x=(x_1,x_2,x_3)$ is optimal (the optimal plan is unique), and what does it cost?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "La PD sulle scorte e la ricostruzione danno $x=" + vec(R[0].x) + "$ con costo $" + R[0].c + "$; il secondo miglior piano costa $" + R[1].c + "$. Con le capacità la produzione può anticipare la domanda anche con scorta in ingresso positiva.",
          "The DP on stocks and the reconstruction give $x=" + vec(R[0].x) + "$ with cost $" + R[0].c + "$; the second best plan costs $" + R[1].c + "$. With capacities production can anticipate demand even with positive incoming stock."),
        _v: { dati: { d: I.d, cap: I.cap, sc: I.sc, vc: I.vc, hc: I.hc }, valori: bb.valori }
      };
    }
  });

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

  // ---- B4.37 gap del nearest neighbour (cap. 29)
  add({
    id: "oc-g-heur-gap", livello: "media", capitolo: "heuristics",
    link: L2("heuristic-algorithms/heuristics", "algoritmi-euristici/heuristics", "box-6-prop-gap"),
    genera: function (rng, lingua) {
      var n = 5, d = randDist(rng, n, 2, 15), N = nn(d, n, 1).len, lb = Math.ceil(twoEdgeSum(d, n) / 2);
      if (N === lb) return null;
      var g = fr(N - lb, lb);
      var bb = build(rng, numF(g), [numF(fr(N - lb, N)), num(N - lb), numF(fr(N, lb)), numF(fr(lb, N))]);
      if (!bb) return null;
      return {
        testo: T(lingua, "TSP simmetrico con $5$ città e distanze " + distTab(d, n) + ". Il nearest neighbour dalla città $1$ (ogni volta la città non visitata più vicina, a parità l'indice minore, poi ritorno in $1$) dà il giro $\\mathscr{A}(I)$; il bound $\\mathrm{LB}=\\left\\lceil\\frac12\\sum_i(a_i+b_i)\\right\\rceil$ usa le due distanze minime $a_i,b_i$ di ogni città. Quanto vale il gap $\\frac{\\mathscr{A}(I)-\\mathrm{LB}}{\\mathrm{LB}}$?",
          "Symmetric TSP with $5$ cities and distances " + distTab(d, n) + ". Nearest neighbour from city $1$ (each time the nearest unvisited city, ties smallest index, then back to $1$) gives the tour $\\mathscr{A}(I)$; the bound $\\mathrm{LB}=\\left\\lceil\\frac12\\sum_i(a_i+b_i)\\right\\rceil$ uses the two smallest distances $a_i,b_i$ of every city. What is the gap $\\frac{\\mathscr{A}(I)-\\mathrm{LB}}{\\mathrm{LB}}$?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "$\\mathscr{A}(I)=" + N + "$ e $\\mathrm{LB}=" + lb + "$: gap $" + frTex(g) + "$. L'errore relativo del giro rispetto all'ottimo non supera questo valore.",
          "$\\mathscr{A}(I)=" + N + "$ and $\\mathrm{LB}=" + lb + "$: gap $" + frTex(g) + "$. The relative error of the tour with respect to the optimum does not exceed this value."),
        _v: { dati: { d: d, n: n }, valori: bb.valori }
      };
    }
  });
  // ---- B4.38 intorno flip per il KP (cap. 29)
  add({
    id: "oc-g-heur-flip", livello: "facile", capitolo: "heuristics",
    link: L2("heuristic-algorithms/heuristics", "algoritmi-euristici/heuristics", "box-9-def-neigh"),
    genera: function (rng, lingua) {
      var n = 5, p = [], w = []; for (var j = 0; j < n; j++) { p.push(ri(rng, 3, 12)); w.push(ri(rng, 2, 7)); }
      var c = ri(rng, 10, 16), x = [], ww = 0, pp = 0;
      for (j = 0; j < n; j++) { var b = rng() < 0.4 && ww + w[j] <= c ? 1 : 0; x.push(b); if (b) { ww += w[j]; pp += p[j]; } }
      var bestF = -1, bestAny = -1;
      for (j = 0; j < n; j++) { var nw = ww + (x[j] ? -w[j] : w[j]), np = pp + (x[j] ? -p[j] : p[j]); if (np > bestAny) bestAny = np; if (nw <= c && np > bestF) bestF = np; }
      if (bestF <= pp || bestAny === bestF) return null;
      var bb = build(rng, num(bestF), [num(bestAny), num(pp), num(bestF + 1), num(pp + Math.max.apply(null, p))]);
      if (!bb) return null;
      return {
        testo: T(lingua, "Zaino 0-1 con capacità $c=" + c + "$ e oggetti " + itemTab(lingua, p, w) + ". La soluzione corrente è $x=" + vec(x) + "$; l'intorno flip contiene le soluzioni ammissibili ottenute cambiando una sola componente di $x$ (aggiungere o togliere un oggetto). Quanto vale il miglior vicino?",
          "0-1 knapsack with capacity $c=" + c + "$ and items " + itemTab(lingua, p, w) + ". The current solution is $x=" + vec(x) + "$; the flip neighbourhood contains the feasible solutions obtained by changing a single component of $x$ (adding or removing one item). What is the value of the best neighbour?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "La soluzione corrente vale $" + pp + "$ e pesa $" + ww + "$; fra i vicini ammissibili il migliore vale $" + bestF + "$. Ignorando la capacità si arriverebbe a $" + bestAny + "$, ma quel vicino non è ammissibile.",
          "The current solution is worth $" + pp + "$ and weighs $" + ww + "$; among the feasible neighbours the best is worth $" + bestF + "$. Ignoring the capacity one would reach $" + bestAny + "$, but that neighbour is infeasible."),
        _v: { dati: { p: p, w: w, c: c, x: x }, valori: bb.valori }
      };
    }
  });

  // ---- B4.39 simulated annealing (cap. 32)
  add({
    id: "oc-g-sa-prob", livello: "facile", capitolo: "metaheuristics",
    link: L2("heuristic-algorithms/metaheuristics/how-to-escape-from-a-local-optimum", "algoritmi-euristici/metaheuristics/come-uscire-da-un-ottimo-locale", "sez-sec-sa"),
    genera: function (rng, lingua) {
      var dl = ri(rng, 1, 12), Tt = ri(rng, 2, 10), f = fr(dl, Tt);
      var ek = function (q, neg) { return { k: (neg ? "-" : "+") + frKey(q), t: "$e^{" + (neg ? "-" : "") + frTex(q) + "}$" }; };
      var bb = build(rng, ek(f, true), [ek(fr(Tt, dl), true), { k: "1", t: "$1$" }, ek(fr(dl * Tt, 1), true), ek(f, false)]);
      if (!bb || f.n === f.d) return null;
      return {
        testo: T(lingua, "Nel simulated annealing per un problema di minimo, alla temperatura $T=" + Tt + "$ si propone un vicino che peggiora l'obiettivo di $\\delta=" + dl + "$. Con la regola di Metropolis, con quale probabilità è accettato?",
          "In simulated annealing for a minimization problem, at temperature $T=" + Tt + "$ a neighbour worsening the objective by $\\delta=" + dl + "$ is proposed. With the Metropolis rule, with which probability is it accepted?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Un peggioramento $\\delta>0$ è accettato con probabilità $e^{-\\delta/T}=e^{-" + frTex(f) + "}$; un miglioramento sarebbe accettato con probabilità $1$.",
          "A worsening $\\delta>0$ is accepted with probability $e^{-\\delta/T}=e^{-" + frTex(f) + "}$; an improvement would be accepted with probability $1$."),
        _v: { dati: { delta: dl, T: Tt }, valori: bb.valori }
      };
    }
  });
  // ---- B4.40 crossover a un punto (cap. 32)
  add({
    id: "oc-g-ga-cross", livello: "facile", capitolo: "metaheuristics",
    link: L2("heuristic-algorithms/metaheuristics/population-based-methods-genetic-and-memetic-algorithms", "algoritmi-euristici/metaheuristics/metodi-basati-su-popolazioni-algoritmi-genetici-e-memetici", "sez-sec-ga"),
    genera: function (rng, lingua) {
      var n = 7, a = [], b = []; for (var j = 0; j < n; j++) { a.push(ri(rng, 0, 1)); b.push(ri(rng, 0, 1)); }
      var cut = ri(rng, 2, n - 2), ch = function (x, y, k) { return x.slice(0, k).concat(y.slice(k)); };
      var key = function (v) { return { k: v.join(""), t: "$" + vec(v) + "$" }; };
      var bb = build(rng, key(ch(a, b, cut)), [key(ch(b, a, cut)), key(ch(a, b, cut + 1)), key(ch(a, b, cut - 1)), key(ch(b, a, cut + 1))]);
      if (!bb) return null;
      return {
        testo: T(lingua, "Algoritmo genetico per lo zaino 0-1 con codifica binaria ($x_j=1$ se l'oggetto $j$ è scelto). Il crossover a un punto con taglio $cut=" + cut + "$ prende i geni $1,\\dots,cut$ dal primo genitore e i geni $cut+1,\\dots,n$ dal secondo. Genitori $" + vec(a) + "$ e $" + vec(b) + "$: quale figlio si ottiene?",
          "Genetic algorithm for the 0-1 knapsack with binary encoding ($x_j=1$ if item $j$ is chosen). One-point crossover with cut $cut=" + cut + "$ takes genes $1,\\dots,cut$ from the first parent and genes $cut+1,\\dots,n$ from the second. Parents $" + vec(a) + "$ and $" + vec(b) + "$: which child is obtained?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "I primi $" + cut + "$ geni vengono da $" + vec(a) + "$ e gli altri da $" + vec(b) + "$: $" + vec(ch(a, b, cut)) + "$. Il figlio può superare la capacità e allora va riparato.",
          "The first $" + cut + "$ genes come from $" + vec(a) + "$ and the others from $" + vec(b) + "$: $" + vec(ch(a, b, cut)) + "$. The child may exceed the capacity and then must be repaired."),
        _v: { dati: { a: a, b: b, cut: cut }, valori: bb.valori }
      };
    }
  });

  // ---- B4.41-42 LIST e LPT (cap. 40)
  add({
    id: "oc-g-pcmax-list", livello: "facile", capitolo: "pcmax-approximation",
    link: L2("approximation-algorithms/pcmax-approximation", "algoritmi-di-approssimazione/pcmax-approximation", "sez-sec-LIST"),
    genera: function (rng, lingua) {
      var m = 3, t = []; for (var j = 0; j < 7; j++) t.push(ri(rng, 1, 9));
      var idx = range1(7).map(function (i) { return i - 1; }), a = listSched(t, m, idx).cmax, b = listSched(t, m, decOrder(t)).cmax;
      if (a === b) return null;
      var bb = build(rng, pairKey(a, b), [pairKey(b, a), pairKey(a, a), pairKey(Math.ceil(sum(t) / m), b), pairKey(a + 1, b)]);
      if (!bb) return null;
      return {
        testo: T(lingua, "Scheduling $P\\,||\\,C_{\\max}$ con $m=3$ macchine identiche e durate, nell'ordine della lista, $t=" + vec(t) + "$. $LIST$ assegna ogni lavoro alla macchina meno carica (a parità quella di indice minore) nell'ordine della lista; $LPT$ fa lo stesso dopo aver ordinato i lavori per durata non crescente. Quanto valgono i makespan di $LIST$ e di $LPT$, nell'ordine?",
          "Scheduling $P\\,||\\,C_{\\max}$ with $m=3$ identical machines and times, in list order, $t=" + vec(t) + "$. $LIST$ assigns every job to the least loaded machine (ties: smallest index) in list order; $LPT$ does the same after sorting the jobs by non-increasing time. What are the makespans of $LIST$ and $LPT$, in this order?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "$LIST$ dà $" + a + "$ e $LPT$ dà $" + b + "$; il lower bound $\\lceil\\sum_jt_j/m\\rceil$ vale $" + Math.ceil(sum(t) / m) + "$.",
          "$LIST$ gives $" + a + "$ and $LPT$ gives $" + b + "$; the lower bound $\\lceil\\sum_jt_j/m\\rceil$ is $" + Math.ceil(sum(t) / m) + "$."),
        _v: { dati: { t: t, m: m }, valori: bb.valori }
      };
    }
  });
  add({
    id: "oc-g-pcmax-ratio", livello: "media", capitolo: "pcmax-approximation",
    link: L2("approximation-algorithms/pcmax-approximation", "algoritmi-di-approssimazione/pcmax-approximation", "box-6-prop-LPT"),
    genera: function (rng, lingua) {
      var m = ri(rng, 2, 3), t = []; for (var j = 0; j < 6; j++) t.push(ri(rng, 2, 9));
      var z = pcmaxOpt(t, m), b = listSched(t, m, decOrder(t)).cmax;
      if (b === z) return null;
      var a = listSched(t, m, range1(6).map(function (i) { return i - 1; })).cmax;
      var r = fr(b, z), g = fr(4 * m - 1, 3 * m);
      var bb = build(rng, numF(r), [numF(g), numF(fr(a, z)), numF(fr(z, b)), numF(fr(b, Math.max(Math.max.apply(null, t), Math.ceil(sum(t) / m)) + 1))]);
      if (!bb) return null;
      return {
        testo: T(lingua, "Scheduling $P\\,||\\,C_{\\max}$ con $m=" + m + "$ macchine identiche e durate $t=" + vec(t) + "$. $LPT$ ordina i lavori per durata non crescente e assegna ciascuno alla macchina meno carica (a parità, indice minore). Quanto vale il rapporto $LPT(I)/z(I)$, con $z(I)$ makespan ottimo?",
          "Scheduling $P\\,||\\,C_{\\max}$ with $m=" + m + "$ identical machines and times $t=" + vec(t) + "$. $LPT$ sorts the jobs by non-increasing time and assigns each to the least loaded machine (ties: smallest index). What is the ratio $LPT(I)/z(I)$, with $z(I)$ the optimal makespan?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "$LPT(I)=" + b + "$ e $z(I)=" + z + "$: rapporto $" + frTex(r) + "$, al più la garanzia $\\frac43-\\frac1{3m}=" + frTex(g) + "$.",
          "$LPT(I)=" + b + "$ and $z(I)=" + z + "$: ratio $" + frTex(r) + "$, at most the guarantee $\\frac43-\\frac1{3m}=" + frTex(g) + "$."),
        _v: { dati: { t: t, m: m }, valori: bb.valori }
      };
    }
  });

  // ---- B4.43-44 TSP metrico: albero ricoprente e albero doppio (cap. 39)
  function metricTxt(lingua, d, n) { return T(lingua, "TSP metrico con $" + n + "$ città e distanze (di Manhattan fra punti del piano, tutte diverse) " + distTab(d, n) + ".", "Metric TSP with $" + n + "$ cities and distances (Manhattan distances between points of the plane, all different) " + distTab(d, n) + "."); }
  add({
    id: "oc-g-tsp-mst", livello: "facile", capitolo: "tsp-approximation",
    link: L2("approximation-algorithms/tsp-approximation", "algoritmi-di-approssimazione/tsp-approximation", "box-6-obs-mst"),
    genera: function (rng, lingua) {
      var n = 5, d = metricDist(rng, n); if (!d) return null;
      var T0 = primMST(d, n), N = nn(d, n, 1).len, mn = 0;
      for (var i = 1; i <= n; i++) { var r = Infinity; for (var j = 1; j <= n; j++) if (j !== i) r = Math.min(r, d[i][j]); mn += r; }
      var bb = build(rng, num(T0.w), [num(2 * T0.w), num(N), num(mn), num(T0.w + 1)]);
      if (!bb) return null;
      return {
        testo: metricTxt(lingua, d, n) + T(lingua, " Quanto è lungo un albero ricoprente minimo $T$, il cui valore $d(T)$ è un lower bound sul giro ottimo?", " How long is a minimum spanning tree $T$, whose length $d(T)$ is a lower bound on the optimal tour?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "L'algoritmo di Prim (o di Kruskal) dà $d(T)=" + T0.w + "$. Togliendo un lato dal giro ottimo si ottiene un albero ricoprente, quindi $d(T)\\le z(I)$; l'albero doppio dà un giro lungo al più $2d(T)=" + (2 * T0.w) + "$.",
          "Prim's (or Kruskal's) algorithm gives $d(T)=" + T0.w + "$. Removing an edge from the optimal tour gives a spanning tree, so $d(T)\\le z(I)$; the double tree gives a tour of length at most $2d(T)=" + (2 * T0.w) + "$."),
        _v: { dati: { d: d, n: n }, valori: bb.valori }
      };
    }
  });
  add({
    id: "oc-g-tsp-dt", livello: "media", capitolo: "tsp-approximation",
    link: L2("approximation-algorithms/tsp-approximation", "algoritmi-di-approssimazione/tsp-approximation", "sez-sec-DT"),
    genera: function (rng, lingua) {
      var n = 5, d = metricDist(rng, n); if (!d) return null;
      var T0 = primMST(d, n), pre = preorder(n, T0.edges), L0 = tourLen(d, pre), N = nn(d, n, 1).len;
      var bb = build(rng, num(L0), [num(2 * T0.w), num(T0.w), num(N), num(L0 + 1)]);
      if (!bb) return null;
      return {
        testo: metricTxt(lingua, d, n) + T(lingua, " L'algoritmo dell'albero doppio prende l'albero ricoprente minimo (unico), ne raddoppia i lati, lo percorre in profondità dalla città $1$ visitando i figli per indice crescente e salta le città già visitate: il giro è l'ordine di prima visita. Quanto è lungo?",
          " The double tree algorithm takes the (unique) minimum spanning tree, doubles its edges, walks it depth first from city $1$ visiting children by increasing index and skips the cities already visited: the tour is the order of first visit. How long is it?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "L'albero ha $d(T)=" + T0.w + "$; l'ordine di prima visita è $" + vec(pre) + "$, lungo $" + L0 + "\\le 2d(T)=" + (2 * T0.w) + "$: le scorciatoie non allungano il cammino perché le distanze sono metriche.",
          "The tree has $d(T)=" + T0.w + "$; the order of first visit is $" + vec(pre) + "$, of length $" + L0 + "\\le 2d(T)=" + (2 * T0.w) + "$: shortcuts do not lengthen the walk because the distances are metric."),
        _v: { dati: { d: d, n: n }, valori: bb.valori }
      };
    }
  });

  // ---- B4.45 Next Fit e bound sul peso (cap. 36)
  add({
    id: "oc-g-bpp-nf", livello: "facile", capitolo: "bin-packing-approximation",
    link: L2("approximation-algorithms/bin-packing-approximation", "algoritmi-di-approssimazione/bin-packing-approximation", "sez-sec-NF"),
    genera: function (rng, lingua) {
      var n = 8, c = 10, w = []; for (var j = 0; j < n; j++) w.push(ri(rng, 1, 8));
      var nf = binsOf(packing(w, c, "NF")), ff = binsOf(packing(w, c, "FF")), lb = Math.ceil(sum(w) / c);
      if (nf === ff) return null;
      var bb = build(rng, pairKey(nf, lb), [pairKey(ff, lb), pairKey(nf, lb + 1), pairKey(lb, nf), pairKey(nf + 1, lb)]);
      if (!bb) return null;
      return {
        testo: T(lingua, "Bin packing con capacità $c=" + c + "$ e oggetti di peso $" + vec(w) + "$ in quest'ordine. Next Fit (NF) tiene aperto un solo contenitore e ne apre uno nuovo quando l'oggetto non entra. Quanti contenitori usa NF, e quanto vale il bound sul peso $\\lceil\\sum_jw_j/c\\rceil$, nell'ordine?",
          "Bin packing with capacity $c=" + c + "$ and items of weight $" + vec(w) + "$ in this order. Next Fit (NF) keeps a single bin open and opens a new one when the item does not fit. How many bins does NF use, and what is the weight bound $\\lceil\\sum_jw_j/c\\rceil$, in this order?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "NF usa $" + nf + "$ contenitori e il bound vale $\\lceil " + sum(w) + "/" + c + "\\rceil=" + lb + "$; First Fit, che riprende i contenitori già aperti, ne usa $" + ff + "$. Vale sempre $NF(I)\\le 2z(I)$.",
          "NF uses $" + nf + "$ bins and the bound is $\\lceil " + sum(w) + "/" + c + "\\rceil=" + lb + "$; First Fit, which reuses the open bins, uses $" + ff + "$. Always $NF(I)\\le 2z(I)$."),
        _v: { dati: { w: w, c: c }, valori: bb.valori }
      };
    }
  });
  // ---- B4.46 errore relativo (cap. 34)
  add({
    id: "oc-g-approx-error", livello: "facile", capitolo: "approximation",
    link: L2("approximation-algorithms/approximation", "algoritmi-di-approssimazione/approximation", "box-2-def-pratio"),
    genera: function (rng, lingua) {
      var mn = rng() < 0.5, z = ri(rng, 10, 40), A = mn ? z + ri(rng, 1, 15) : z - ri(rng, 1, Math.min(15, z - 1));
      var e = fr(Math.abs(A - z), z), r = mn ? fr(A, z) : fr(z, A);
      var key = function (a, b) { return { k: frKey(a) + "|" + frKey(b), t: "$" + frTex(a) + "$ " + T(lingua, "e", "and") + " $" + frTex(b) + "$" }; };
      var bb = build(rng, key(r, e), [key(fr(r.d, r.n), e), key(r, fr(Math.abs(A - z), A)), key(e, r), key(r, fr(Math.abs(A - z), 1))]);
      if (!bb) return null;
      return {
        testo: T(lingua, "Per un problema di " + (mn ? "minimo" : "massimo") + " un algoritmo trova una soluzione di valore $\\mathscr{A}(I)=" + A + "$ e il valore ottimo è $z(I)=" + z + "$. Il rapporto di prestazione è $" + (mn ? "\\mathscr{A}(I)/z(I)" : "z(I)/\\mathscr{A}(I)") + "$ e l'errore relativo $|\\mathscr{A}(I)-z(I)|/z(I)$. Quanto valgono, nell'ordine?",
          "For a " + (mn ? "minimization" : "maximization") + " problem an algorithm finds a solution of value $\\mathscr{A}(I)=" + A + "$ and the optimal value is $z(I)=" + z + "$. The performance ratio is $" + (mn ? "\\mathscr{A}(I)/z(I)" : "z(I)/\\mathscr{A}(I)") + "$ and the relative error $|\\mathscr{A}(I)-z(I)|/z(I)$. What are they, in this order?"),
        opzioni: bb.opzioni, corretta: bb.corretta,
        spiegazione: T(lingua, "Rapporto $" + frTex(r) + "\\ge 1$ ed errore $" + frTex(e) + "$; l'errore si divide per il valore ottimo, non per quello trovato.",
          "Ratio $" + frTex(r) + "\\ge 1$ and error $" + frTex(e) + "$; the error is divided by the optimal value, not by the value found."),
        _v: { dati: { A: A, z: z, min: mn }, valori: bb.valori }
      };
    }
  });

  // ---- B4.47 branch-and-bound KP: figlio «down» (cap. 41)
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

  // ---- B4.48-49 branch-and-bound DSATUR (cap. 42)
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

  // ---- C3. P||Cmax: discesa best improvement con l'intorno move e l'obiettivo ausiliario (parte 4, cap. 31) — complessa
  function moveDescent(t, m, mach0, best) { // minimizza sum L_h^2; restituisce {cmax, moves}
    var mach = mach0.slice(), L = []; for (var h = 0; h < m; h++) L.push(0);
    t.forEach(function (x, j) { L[mach[j] - 1] += x; });
    var moves = 0;
    for (var it = 0; it < 200; it++) {
      var bj = -1, bh = -1, bd = 0;
      for (var j = 0; j < t.length; j++) {
        for (h = 1; h <= m; h++) {
          if (h === mach[j]) continue;
          var a = mach[j] - 1, b = h - 1, d = 2 * t[j] * (L[b] - L[a] + t[j]); // variazione di sum L^2
          if (d < bd) { bd = d; bj = j; bh = h; if (!best) break; }
        }
        if (!best && bj >= 0) break;
      }
      if (bj < 0) break;
      L[mach[bj] - 1] -= t[bj]; L[bh - 1] += t[bj]; mach[bj] = bh; moves++;
    }
    return { cmax: Math.max.apply(null, L), moves: moves };
  }
  add({
    id: "oc-g-pcmax-descent", livello: "complessa", capitolo: "local-search",
    link: L2("heuristic-algorithms/local-search/p-cmax-move-and-swap", "algoritmi-euristici/local-search/p-cmax-move-e-swap", "sez-sec-pcmax"),
    genera: function (rng, lingua) {
      var n = 7, m = 3, t = [], mach = [];
      for (var j = 0; j < n; j++) { t.push(ri(rng, 2, 9)); mach.push(ri(rng, 1, 3)); }
      var L0 = [0, 0, 0]; t.forEach(function (x, k) { L0[mach[k] - 1] += x; });
      var R = moveDescent(t, m, mach, true), F1 = moveDescent(t, m, mach, false);
      if (R.moves < 2) return null;
      var c0 = Math.max.apply(null, L0);
      var key = function (a, b2) { return { k: a + "|" + b2, t: T(lingua, "makespan finale $" + a + "$, dopo $" + b2 + "$ mosse", "final makespan $" + a + "$, after $" + b2 + "$ moves") }; };
      var b = build(rng, key(R.cmax, R.moves), [key(F1.cmax, F1.moves), key(c0, 0), key(R.cmax + 1, R.moves), key(R.cmax, R.moves + 1), key(R.cmax, R.moves - 1)]);
      if (!b) return null;
      return {
        testo: T(lingua, "$P\\,||\\,C_{\\max}$ con $m=3$ macchine e lavori di durata $t=" + vec(t) + "$; la soluzione di partenza assegna i lavori alle macchine $" + vec(mach) + "$. Si applica la ricerca locale con l'intorno move (un lavoro passa a un'altra macchina) e l'obiettivo ausiliario $\\sum_hL_h^2$ da minimizzare ($L_h$ = carico della macchina $h$), con la regola best improvement: a ogni iterazione si applica la mossa che diminuisce di più $\\sum_hL_h^2$ (pari merito: lavoro di indice minore, poi macchina di indice minore), finché nessuna mossa lo diminuisce. Qual è il makespan finale e quante mosse si applicano?",
          "$P\\,||\\,C_{\\max}$ with $m=3$ machines and jobs of duration $t=" + vec(t) + "$; the starting solution assigns the jobs to the machines $" + vec(mach) + "$. Local search is applied with the move neighbourhood (one job goes to another machine) and the auxiliary objective $\\sum_hL_h^2$ to be minimized ($L_h$ = load of machine $h$), with the best improvement rule: at every iteration the move decreasing $\\sum_hL_h^2$ the most is applied (ties: smallest job index, then smallest machine index), until no move decreases it. What is the final makespan and how many moves are applied?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "Carichi iniziali $" + vec(L0) + "$, makespan $" + c0 + "$. Spostare il lavoro $j$ dalla macchina $a$ alla $b$ cambia $\\sum_hL_h^2$ di $2t_j(L_b-L_a+t_j)$; la discesa applica $" + R.moves + "$ mosse e si ferma con makespan $" + R.cmax + "$. Con first improvement la discesa sarebbe diversa ($" + F1.moves + "$ mosse, makespan $" + F1.cmax + "$).",
          "Initial loads $" + vec(L0) + "$, makespan $" + c0 + "$. Moving job $j$ from machine $a$ to $b$ changes $\\sum_hL_h^2$ by $2t_j(L_b-L_a+t_j)$; the descent applies $" + R.moves + "$ moves and stops with makespan $" + R.cmax + "$. With first improvement the descent would differ ($" + F1.moves + "$ moves, makespan $" + F1.cmax + "$)."),
        _v: { dati: { t: t, mach: mach }, valori: b.valori }
      };
    }
  });

  // ---- C4. TSP: nearest neighbour e poi 2-opt first improvement (parte 4, cap. 31) — complessa
  function twoOptFirst(d, tour) {
    var t = tour.slice(), n = t.length, moves = 0, again = true;
    while (again && moves < 100) {
      again = false;
      for (var i = 0; i < n - 1 && !again; i++) {
        for (var j = i + 2; j < n && !again; j++) {
          if (i === 0 && j === n - 1) continue;
          var a = t[i], b = t[i + 1], c = t[j], e = t[(j + 1) % n];
          if (d[a][c] + d[b][e] - d[a][b] - d[c][e] < 0) {
            var seg = t.slice(i + 1, j + 1).reverse();
            for (var k = 0; k < seg.length; k++) t[i + 1 + k] = seg[k];
            moves++; again = true;
          }
        }
      }
    }
    return { tour: t, len: tourLen(d, t), moves: moves };
  }
  add({
    id: "oc-g-tsp-nn2opt", livello: "complessa", capitolo: "local-search",
    link: L2("heuristic-algorithms/local-search/tsp-2-opt-and-or-opt", "algoritmi-euristici/local-search/tsp-2-opt-e-or-opt", "sez-sec-tsp"),
    genera: function (rng, lingua) {
      var n = 6, d = randDist(rng, n, 1, 9);
      var N = nn(d, n, 1), R = twoOptFirst(d, N.tour);
      if (R.moves < 1) return null;
      var key = function (a, b2) { return { k: a + "|" + b2, t: T(lingua, "lunghezza finale $" + a + "$, dopo $" + b2 + "$ mosse", "final length $" + a + "$, after $" + b2 + "$ moves") }; };
      var b = build(rng, key(R.len, R.moves), [key(N.len, 0), key(R.len, R.moves + 1), key(R.len + 1, R.moves), key(R.len - 1, R.moves), key(N.open, R.moves)]);
      if (!b) return null;
      return {
        testo: T(lingua, "TSP con $6$ città e distanze simmetriche " + distTab(d, n) + ". Si costruisce il giro nearest neighbour dalla città $1$ (pareggi: città di indice minore), scritto come sequenza $(t_1,\\dots,t_6)$ con $t_1=1$. Poi si applica 2-opt con la regola first improvement: si esaminano le coppie di posizioni $(i,j)$ con $i=1,\\dots,5$ e $j=i+2,\\dots,6$ (esclusa $(1,6)$); la mossa toglie i lati $\\{t_i,t_{i+1}\\}$ e $\\{t_j,t_{j+1}\\}$ (con $t_7=t_1$), aggiunge $\\{t_i,t_j\\}$ e $\\{t_{i+1},t_{j+1}\\}$ invertendo il tratto $t_{i+1},\\dots,t_j$, e si applica appena accorcia il giro; dopo ogni mossa l'esame riparte da $(1,3)$. Qual è la lunghezza del giro finale e quante mosse si applicano?",
          "TSP with $6$ cities and symmetric distances " + distTab(d, n) + ". The nearest neighbour tour from city $1$ is built (ties: smallest city index), written as a sequence $(t_1,\\dots,t_6)$ with $t_1=1$. Then 2-opt is applied with the first improvement rule: the pairs of positions $(i,j)$ with $i=1,\\dots,5$ and $j=i+2,\\dots,6$ (except $(1,6)$) are examined; the move removes the edges $\\{t_i,t_{i+1}\\}$ and $\\{t_j,t_{j+1}\\}$ (with $t_7=t_1$), adds $\\{t_i,t_j\\}$ and $\\{t_{i+1},t_{j+1}\\}$ reversing the stretch $t_{i+1},\\dots,t_j$, and is applied as soon as it shortens the tour; after every move the scan restarts from $(1,3)$. What is the length of the final tour and how many moves are applied?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "Nearest neighbour dà $" + vec(N.tour) + "$, lunghezza $" + N.len + "$. 2-opt applica $" + R.moves + "$ mosse e si ferma nell'ottimo locale $" + vec(R.tour) + "$, lunghezza $" + R.len + "$.",
          "Nearest neighbour gives $" + vec(N.tour) + "$, length $" + N.len + "$. 2-opt applies $" + R.moves + "$ moves and stops at the local optimum $" + vec(R.tour) + "$, length $" + R.len + "$."),
        _v: { dati: { d: d }, valori: b.valori }
      };
    }
  });

  // ---- C5. bin packing: NF, FF, BF e WF sulla stessa istanza (parte 5, cap. 36) — complessa
  add({
    id: "oc-g-bpp-anyfit-full", livello: "complessa", capitolo: "bin-packing-approximation",
    link: L2("approximation-algorithms/bin-packing-approximation", "algoritmi-di-approssimazione/bin-packing-approximation", "box-3-def-AF"),
    genera: function (rng, lingua) {
      var n = 8, c = 10, w = []; for (var j = 0; j < n; j++) w.push(ri(rng, 2, 8));
      var R = ["NF", "FF", "BF", "WF"].map(function (r) { return packing(w, c, r).nb; });
      var dist = {}; R.forEach(function (x) { dist[x] = 1; }); if (Object.keys(dist).length < 2) return null;
      var key = function (v) { return { k: v.join("|"), t: "$NF=" + v[0] + "$, $FF=" + v[1] + "$, $BF=" + v[2] + "$, $WF=" + v[3] + "$" }; };
      var ffd = packing(w, c, "FF", decOrder(w)).nb;
      var cand = [key([R[1], R[0], R[2], R[3]]), key([R[0], R[1], R[3], R[2]]), key([R[0], ffd, ffd, R[3]]), key([R[0], R[1], R[2], R[3] + 1]),
                  key([R[0] - 1, R[1], R[2], R[3]]), key([R[0], R[2], R[1], R[3]]), key([R[0], R[1] + 1, R[2], R[3]])];
      var b = build(rng, key(R), cand);
      if (!b) return null;
      return {
        testo: T(lingua, "Bin packing con contenitori di capacità $c=10$ e oggetti, nell'ordine di input, di peso $w=" + vec(w) + "$. Next Fit (NF) tiene aperto solo l'ultimo contenitore; First Fit (FF), Best Fit (BF) e Worst Fit (WF) mettono ogni oggetto, rispettivamente, nel primo contenitore in cui entra, in quello con capacità residua minima e in quello con capacità residua massima fra quelli in cui entra (pari merito: indice minore), e aprono un contenitore nuovo solo se non entra in nessuno. Quanti contenitori usa ciascun algoritmo?",
          "Bin packing with bins of capacity $c=10$ and items, in input order, of weight $w=" + vec(w) + "$. Next Fit (NF) keeps only the last bin open; First Fit (FF), Best Fit (BF) and Worst Fit (WF) put every item, respectively, into the first bin where it fits, into the one with minimum residual capacity and into the one with maximum residual capacity among those where it fits (ties: smallest index), and open a new bin only if it fits in none. How many bins does each algorithm use?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "Simulando le quattro regole: $NF=" + R[0] + "$, $FF=" + R[1] + "$, $BF=" + R[2] + "$, $WF=" + R[3] + "$; il bound sul peso è $\\lceil" + sum(w) + "/10\\rceil=" + Math.ceil(sum(w) / 10) + "$. NF non è Any Fit: chiude un contenitore anche se un oggetto successivo vi entrerebbe.",
          "Simulating the four rules: $NF=" + R[0] + "$, $FF=" + R[1] + "$, $BF=" + R[2] + "$, $WF=" + R[3] + "$; the weight bound is $\\lceil" + sum(w) + "/10\\rceil=" + Math.ceil(sum(w) / 10) + "$. NF is not Any Fit: it closes a bin even if a later item would fit into it."),
        _v: { dati: { w: w, c: c }, valori: b.valori }
      };
    }
  });

  // ---- C6. zaino: Basic-FPTAS completo (parte 5, cap. 35) — complessa
  add({
    id: "oc-g-kp-fptas-full", livello: "complessa", capitolo: "knapsack-approximation",
    link: L2("approximation-algorithms/knapsack-approximation", "algoritmi-di-approssimazione/knapsack-approximation", "box-23-prop-fptas"),
    genera: function (rng, lingua) {
      var n = 5, p = [], w = [];
      for (var j = 0; j < n; j++) { w.push(ri(rng, 2, 7)); p.push(ri(rng, 8, 40)); }
      var o = effOrder(p, w); p = o.map(function (i) { return p[i]; }); w = o.map(function (i) { return w[i]; });
      var c = ri(rng, 9, 15); if (sum(w) <= c || Math.max.apply(null, w) > c) return null;
      var gr = greedyOrder([0, 1, 2, 3, 4], p, w, c).z, gre = Math.max(gr, Math.max.apply(null, p));
      // eps = 1/2: K = gre/(2n), p' = floor(p/K) = floor(2 n p / gre)
      var pk = p.map(function (x) { return Math.floor(2 * n * x / gre); });
      var best = -1, sets = [];
      for (var mk = 0; mk < (1 << n); mk++) {
        var ww = 0, q = 0, S = [];
        for (j = 0; j < n; j++) if (mk & (1 << j)) { ww += w[j]; q += pk[j]; S.push(j); }
        if (ww > c) continue;
        if (q > best) { best = q; sets = [S]; } else if (q === best) sets.push(S);
      }
      if (sets.length !== 1) return null;
      var FP = 0; sets[0].forEach(function (k) { FP += p[k]; });
      var z = kpOptSets(p, w, c).z;
      if (FP === z && rng() < 0.5) return null;
      var key = function (a, b2) { return { k: a + "|" + b2, t: "$FP^{\\varepsilon}(I)=" + a + "$, $z(I)=" + b2 + "$" }; };
      var b = build(rng, key(FP, z), [key(best, z), key(gre, z), key(FP, Math.floor(FP / (1 - 0.5))), key(FP, z + 1), key(FP - 1, z), key(gr, z)]);
      if (!b) return null;
      return {
        testo: T(lingua, "Zaino 0/1 con capacità $c=" + c + "$ e oggetti ordinati per efficienza non crescente: " + itemTab(lingua, p, w) + ". L'algoritmo Basic-FPTAS con $\\varepsilon=\\frac12$ calcola $GR^e(I)=\\max\\{GR(I),\\max_jp_j\\}$ ($GR$: greedy per efficienza, che salta gli oggetti che non entrano), pone $K=\\varepsilon\\,GR^e(I)/n$ e $p'_j=\\lfloor p_j/K\\rfloor$, risolve all'ottimo l'istanza con profitti $p'_j$ e restituisce il profitto originale $FP^{\\varepsilon}(I)$ della soluzione trovata. Quanto valgono $FP^{\\varepsilon}(I)$ e il valore ottimo $z(I)$?",
          "0/1 knapsack with capacity $c=" + c + "$ and items sorted by non-increasing efficiency: " + itemTab(lingua, p, w) + ". The Basic-FPTAS algorithm with $\\varepsilon=\\frac12$ computes $GR^e(I)=\\max\\{GR(I),\\max_jp_j\\}$ ($GR$: greedy by efficiency, skipping the items that do not fit), sets $K=\\varepsilon\\,GR^e(I)/n$ and $p'_j=\\lfloor p_j/K\\rfloor$, solves the instance with profits $p'_j$ to optimality and returns the original profit $FP^{\\varepsilon}(I)$ of the solution found. What are $FP^{\\varepsilon}(I)$ and the optimal value $z(I)$?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "$GR^e(I)=" + gre + "$, $K=" + frTex(fr(gre, 2 * n)) + "$, $p'=" + vec(pk) + "$. L'istanza scalata ha ottimo $" + best + "$ con gli oggetti $" + set(sets[0].map(function (k) { return k + 1; })) + "$, di profitto originale $" + FP + "$; l'ottimo vero è $" + z + "$, e infatti $" + FP + "\\ge\\frac12\\cdot" + z + "$.",
          "$GR^e(I)=" + gre + "$, $K=" + frTex(fr(gre, 2 * n)) + "$, $p'=" + vec(pk) + "$. The scaled instance has optimum $" + best + "$ with items $" + set(sets[0].map(function (k) { return k + 1; })) + "$, of original profit $" + FP + "$; the true optimum is $" + z + "$, and indeed $" + FP + "\\ge\\frac12\\cdot" + z + "$."),
        _v: { dati: { p: p, w: w, c: c }, valori: b.valori }
      };
    }
  });
//@@BATCH3@@
})();
