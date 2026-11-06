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
        testo: T(lingua, "Si consideri l'istanza del KP con capacità $c=" + c + "$ e i seguenti oggetti: " + itemTab(lingua, p, w) +
          ". Ordinando gli oggetti per efficienza non crescente, quali sono l'oggetto critico $s$ e la capacità residua $\\mathit{rc}$?",
          "Consider the KP instance with capacity $c=" + c + "$ and the following items: " + itemTab(lingua, p, w) +
          ". Sorting the items by non-increasing efficiency, what are the split item $s$ and the residual capacity $\\mathit{rc}$?"),
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
        testo: T(lingua, "Si consideri l'istanza del KP con capacità $c=" + c + "$ e oggetti già ordinati per efficienza non crescente: " + itemTab(lingua, p, w) + ". Quanto vale $z(\\mathrm{LP}_{\\mathrm{KP}})$, il valore ottimo del rilassamento lineare con $0\\le x_j\\le 1$?",
          "Consider the KP instance with capacity $c=" + c + "$ and items already sorted by non-increasing efficiency: " + itemTab(lingua, p, w) + ". What is $z(\\mathrm{LP}_{\\mathrm{KP}})$, the optimal value of the LP relaxation with $0\\le x_j\\le 1$?"),
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
        testo: T(lingua, "Si consideri l'istanza del KP con capacità $c=" + c + "$ e i seguenti oggetti: " + itemTab(lingua, p, w) + ". Quanto vale l'upper bound di Dantzig $\\mathrm{UB}_{\\mathrm{D}}$?",
          "Consider the KP instance with capacity $c=" + c + "$ and the following items: " + itemTab(lingua, p, w) + ". What is the Dantzig upper bound $\\mathrm{UB}_{\\mathrm{D}}$?"),
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
        testo: T(lingua, "Si consideri l'istanza del KP con capacità $c=" + c + "$ e oggetti già ordinati per efficienza non crescente: " + itemTab(lingua, p, w) + ". Quanto vale l'upper bound di Martello-Toth $\\mathrm{UB}_{\\mathrm{MT}}$?",
          "Consider the KP instance with capacity $c=" + c + "$ and items already sorted by non-increasing efficiency: " + itemTab(lingua, p, w) + ". What is the Martello-Toth upper bound $\\mathrm{UB}_{\\mathrm{MT}}$?"),
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
        testo: T(lingua, "Istanza del KP: " + itemTab(lingua, p, w) + ", capacità $c=" + c + "$. Con la ricorsione $v(j,k)=\\max\\{v(j-1,k),\\,p_j+v(j-1,k-w_j)\\}$ (se $w_j\\le k$), quanto vale $v(" + jj + "," + k + ")$?",
          "KP instance: " + itemTab(lingua, p, w) + ", capacity $c=" + c + "$. With the recursion $v(j,k)=\\max\\{v(j-1,k),\\,p_j+v(j-1,k-w_j)\\}$ (if $w_j\\le k$), what is $v(" + jj + "," + k + ")$?"),
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
        testo: T(lingua, "Istanza dello zaino illimitato (UKP) con $n=3$ tipi di oggetto: " + itemTab(lingua, p, w) + ", capacità $c=" + c + "$. Con la ricorsione $v(k)=\\max_{j:\\,w_j\\le k}\\{p_j+v(k-w_j)\\}$, quanto vale $v(" + c + ")$?",
          "Unbounded knapsack (UKP) instance with $n=3$ item types: " + itemTab(lingua, p, w) + ", capacity $c=" + c + "$. With the recursion $v(k)=\\max_{j:\\,w_j\\le k}\\{p_j+v(k-w_j)\\}$, what is $v(" + c + ")$?"),
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
        testo: T(lingua, "Istanza del subset sum con pesi $w=" + vec(w) + "$ e valore obiettivo $c=" + c + "$. Con la ricorsione $r(j,k)=r(j-1,k)\\lor r(j-1,k-w_j)$, qual è il più grande $k\\le c$ con $r(5,k)=\\textit{true}$?",
          "Subset sum instance with weights $w=" + vec(w) + "$ and target $c=" + c + "$. With the recursion $r(j,k)=r(j-1,k)\\lor r(j-1,k-w_j)$, what is the largest $k\\le c$ with $r(5,k)=\\textit{true}$?"),
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
        testo: T(lingua, "Cambio monete: tagli $w=" + vec(w) + "$, disponibili in quantità illimitata, resto $c=" + c + "$. Con la ricorsione $v(k)=\\min_{j:\\,w_j\\le k}\\{1+v(k-w_j)\\}$, quanto vale $v(" + c + ")$?",
          "Coin change: denominations $w=" + vec(w) + "$, in unlimited supply, amount $c=" + c + "$. With the recursion $v(k)=\\min_{j:\\,w_j\\le k}\\{1+v(k-w_j)\\}$, what is $v(" + c + ")$?"),
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
        testo: T(lingua, "Taglio delle aste: un'asta di lunghezza $n=" + n + "$ e i profitti dei pezzi " + tab(head, [["p_j"].concat(p)]) + ". Con la ricorsione $v(\\ell)=\\max_{1\\le j\\le \\ell}\\{p_j+v(\\ell-j)\\}$, quanto vale $v(" + n + ")$?",
          "Rod cutting: a rod of length $n=" + n + "$ and the profits of the pieces " + tab(head, [["p_j"].concat(p)]) + ". With the recursion $v(\\ell)=\\max_{1\\le j\\le \\ell}\\{p_j+v(\\ell-j)\\}$, what is $v(" + n + ")$?"),
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
        testo: T(lingua, "Bin packing con capacità $c=" + c + "$ e pesi, nell'ordine dato, $w=" + vec(w) + "$. Quale vettore $bin$ (contenitore assegnato a ogni oggetto) produce l'algoritmo " + nome[a] + " (" + a + ")?",
          "Bin packing with capacity $c=" + c + "$ and weights, in the given order, $w=" + vec(w) + "$. Which vector $bin$ (bin assigned to each item) does the " + nome[a] + " algorithm (" + a + ") produce?"),
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
        testo: T(lingua, "Bin packing con capacità $c=" + c + "$ e pesi $w=" + vec(w) + "$ (oggetti $1,\\dots," + n + "$). Quale vettore $bin$ produce " + nome + "? Il vettore è indicizzato dagli oggetti nella numerazione originale.",
          "Bin packing with capacity $c=" + c + "$ and weights $w=" + vec(w) + "$ (items $1,\\dots," + n + "$). Which vector $bin$ does " + nome + " produce? The vector is indexed by the items in the original numbering."),
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
        testo: T(lingua, "Istanza del BPP con capacità $c=" + c + "$ e pesi $w=" + vec(w) + "$. Quanto vale il lower bound sul peso $\\left\\lceil \\sum_j w_j / c \\right\\rceil$?",
          "BPP instance with capacity $c=" + c + "$ and weights $w=" + vec(w) + "$. What is the weight bound $\\left\\lceil \\sum_j w_j / c \\right\\rceil$?"),
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
        testo: T(lingua, "Grafo $G=(V,E)$ con $V=\\{1,\\dots," + n + "\\}$ e " + edgeTex(G.E) + ". Quale colorazione $col=(col[1],\\dots,col[" + n + "])$ restituisce la colorazione greedy $GC$ con la lista $\\lambda=" + vec(lam) + "$?",
          "Graph $G=(V,E)$ with $V=\\{1,\\dots," + n + "\\}$ and " + edgeTex(G.E) + ". Which coloring $col=(col[1],\\dots,col[" + n + "])$ does the greedy coloring $GC$ return with the list $\\lambda=" + vec(lam) + "$?"),
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
        testo: T(lingua, "Grafo $G=(V,E)$ con $V=\\{1,\\dots," + n + "\\}$ e " + edgeTex(G.E) + ". In quale ordine $DSATUR$ colora i vertici? (Pari merito sul grado di saturazione: grado massimo nel sottografo dei vertici non colorati, poi indice minimo.)",
          "Graph $G=(V,E)$ with $V=\\{1,\\dots," + n + "\\}$ and " + edgeTex(G.E) + ". In which order does $DSATUR$ color the vertices? (Ties on the saturation degree: largest degree in the subgraph of the uncolored vertices, then smallest index.)"),
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
        testo: T(lingua, "Istanza del TSP simmetrico con le distanze " + distTab(d, n) + ". Qual è la lunghezza del giro costruito da $NN$ (nearest neighbour) a partire dalla città $" + s + "$?",
          "Symmetric TSP instance with distances " + distTab(d, n) + ". What is the length of the tour built by $NN$ (nearest neighbour) starting from city $" + s + "$?"),
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
        testo: T(lingua, "TSP simmetrico con le distanze " + distTab(d, n) + ". Il giro corrente è $\\sigma=" + vec(sig) + "$, di lunghezza $" + L0 + "$. Si applica un'iterazione di 2-opt con la regola best improvement: qual è la lunghezza del nuovo giro?",
          "Symmetric TSP with distances " + distTab(d, n) + ". The current tour is $\\sigma=" + vec(sig) + "$, of length $" + L0 + "$. One iteration of 2-opt with the best-improvement rule is applied: what is the length of the new tour?"),
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
        testo: T(lingua, "$P\\,||\\,C_{\\max}$ con $m=" + m + "$ macchine e tempi di lavorazione $t=" + vec(t) + "$. Qual è il makespan della soluzione di $LPT$?",
          "$P\\,||\\,C_{\\max}$ with $m=" + m + "$ machines and processing times $t=" + vec(t) + "$. What is the makespan of the $LPT$ solution?"),
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
        testo: T(lingua, "$P\\,||\\,C_{\\max}$ con $m=" + m + "$ macchine e tempi $t=" + vec(t) + "$. Si assegnano i lavori nell'ordine $1,\\dots," + n + "$, ciascuno alla macchina di carico minimo (pari merito: indice minimo), e si usa il lower bound combinatorio. Quale intervallo si ottiene per il makespan ottimo $z(I)$?",
          "$P\\,||\\,C_{\\max}$ with $m=" + m + "$ machines and times $t=" + vec(t) + "$. The jobs are assigned in the order $1,\\dots," + n + "$, each to the machine with the smallest load (ties: smallest index), and the combinatorial lower bound is used. Which interval is obtained for the optimal makespan $z(I)$?"),
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
        testo: T(lingua, "$P\\,||\\,C_{\\max}$ con $m=3$ macchine, tempi $t=" + vec(t) + "$ e assegnamento corrente $\\mathrm{mach}=" + vec(mach) + "$ (carichi $" + vec(Lm) + "$). Quale mossa sceglie un'iterazione della ricerca locale move con la regola best improvement? (Mosse esaminate per $j=1,\\dots,n$ e $h=1,\\dots,m$; a parità si tiene la prima.)",
          "$P\\,||\\,C_{\\max}$ with $m=3$ machines, times $t=" + vec(t) + "$ and current assignment $\\mathrm{mach}=" + vec(mach) + "$ (loads $" + vec(Lm) + "$). Which move does one iteration of the move local search with the best-improvement rule choose? (Moves examined for $j=1,\\dots,n$ and $h=1,\\dots,m$; ties: the first one is kept.)"),
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
        testo: T(lingua, "Lot sizing senza capacità con i dati " + tab(head, [["d_t"].concat(d), ["sc_t"].concat(sc), ["vc_t"].concat(vc), ["hc_t"].concat(hc)]) + ". Quanto vale il costo $c_{" + j + "," + tt + "}$ del lotto prodotto nel periodo $" + j + "$ per le domande dei periodi $" + j + ",\\dots," + tt + "$?",
          "Uncapacitated lot sizing with the data " + tab(head, [["d_t"].concat(d), ["sc_t"].concat(sc), ["vc_t"].concat(vc), ["hc_t"].concat(hc)]) + ". What is the cost $c_{" + j + "," + tt + "}$ of the production run in period $" + j + "$ for the demands of periods $" + j + ",\\dots," + tt + "$?"),
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
        testo: T(lingua, "Lot sizing senza capacità (ULS) con $m=4$ periodi, costo di setup $sc_t=" + s0 + "$, costo variabile nullo e costo di mantenimento $hc_t=1$ per ogni periodo, e domande " + tab(head, [["d_t"].concat(d)]) + ". Con la ricorsione $v(t)=\\min_{1\\le j\\le t}\\{v(j-1)+c_{j,t}\\}$, quanto vale il costo ottimo $v(4)$?",
          "Uncapacitated lot sizing (ULS) with $m=4$ periods, setup cost $sc_t=" + s0 + "$, zero variable cost and holding cost $hc_t=1$ in every period, and demands " + tab(head, [["d_t"].concat(d)]) + ". With the recursion $v(t)=\\min_{1\\le j\\le t}\\{v(j-1)+c_{j,t}\\}$, what is the optimal cost $v(4)$?"),
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
        testo: T(lingua, "Un algoritmo $\\mathscr{A}$ è una $" + alT + "$-approssimazione per un problema di " + (mn ? "minimo" : "massimo") + ". Su un'istanza $I$ restituisce $\\mathscr{A}(I)=" + A + "$. Che cosa si può concludere sul valore ottimo $z(I)$?",
          "An algorithm $\\mathscr{A}$ is a $" + alT + "$-approximation algorithm for a " + (mn ? "minimization" : "maximization") + " problem. On an instance $I$ it returns $\\mathscr{A}(I)=" + A + "$. What can be concluded on the optimal value $z(I)$?"),
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
        testo: T(lingua, "Istanza del KP con capacità $c=" + c + "$: " + itemTab(lingua, p, w) + ". Quanto vale $GR^e(I)$, il valore della soluzione dell'algoritmo Ext-Greedy?",
          "KP instance with capacity $c=" + c + "$: " + itemTab(lingua, p, w) + ". What is $GR^e(I)$, the value of the solution of the Ext-Greedy algorithm?"),
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
        testo: T(lingua, "Istanza del KP con capacità $c=" + c + "$ e oggetti ordinati per efficienza non crescente: " + itemTab(lingua, p, w) + ". Si esegue $FP^{\\varepsilon}$ con $\\varepsilon=" + frTex(eps) + "$. Quali sono i profitti scalati $p'_j$?",
          "KP instance with capacity $c=" + c + "$ and items sorted by non-increasing efficiency: " + itemTab(lingua, p, w) + ". $FP^{\\varepsilon}$ is run with $\\varepsilon=" + frTex(eps) + "$. What are the scaled profits $p'_j$?"),
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
        testo: T(lingua, "Istanza del KP con capacità $c=" + c + "$ e oggetti ordinati per efficienza non crescente: " + itemTab(lingua, p, w) + ". Si applica il branch-and-bound con la strategia dell'oggetto critico, $\\mathrm{LB}=" + LB + "$ (valore della soluzione greedy), nodo 2 con $x_s\\le 0$ e nodo 3 con $x_s\\ge 1$. Dopo aver risolto il nodo radice, quali sono i valori $z(\\mathrm{LP}^k_{\\mathrm{KP}})$ dei nodi 2 e 3 e che cosa se ne fa?",
          "KP instance with capacity $c=" + c + "$ and items sorted by non-increasing efficiency: " + itemTab(lingua, p, w) + ". Branch-and-bound is applied with the split-item strategy, $\\mathrm{LB}=" + LB + "$ (value of the greedy solution), node 2 with $x_s\\le 0$ and node 3 with $x_s\\ge 1$. After solving the root node, what are the values $z(\\mathrm{LP}^k_{\\mathrm{KP}})$ of nodes 2 and 3 and what happens to them?"),
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
        testo: T(lingua, "Istanza del KP con capacità $c=" + c + "$: " + itemTab(lingua, p, w) + ". Si calcola la tabella $v(j,k)$ della PD bottom-up e si ricostruisce una soluzione ottima. Quali sono il valore ottimo e l'insieme ottimo $\\tilde S$?",
          "KP instance with capacity $c=" + c + "$: " + itemTab(lingua, p, w) + ". The table $v(j,k)$ of the bottom-up DP is computed and an optimal solution is reconstructed. What are the optimal value and the optimal set $\\tilde S$?"),
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
        testo: T(lingua, "Lot sizing senza capacità (ULS) con costo variabile nullo e i dati " + tab(head, [["d_t"].concat(d), ["sc_t"].concat(sc), ["hc_t"].concat(hc)]) + ". Con la PD $v(t)=\\min_{1\\le j\\le t}\\{v(j-1)+c_{j,t}\\}$, quali sono il costo ottimo $v(5)$ e i periodi dei lotti di produzione?",
          "Uncapacitated lot sizing (ULS) with zero variable cost and the data " + tab(head, [["d_t"].concat(d), ["sc_t"].concat(sc), ["hc_t"].concat(hc)]) + ". With the DP $v(t)=\\min_{1\\le j\\le t}\\{v(j-1)+c_{j,t}\\}$, what are the optimal cost $v(5)$ and the periods of the production runs?"),
        opzioni: b.opzioni, corretta: b.corretta,
        spiegazione: T(lingua, "$v=" + vec(R.v) + "$ per $t=0,\\dots,5$; risalendo dagli argmin si trovano i lotti nei periodi $" + R.runs.join(",") + "$. Per la proprietà di Wagner e Whitin basta confrontare i lotti $c_{j,t}$.",
          "$v=" + vec(R.v) + "$ for $t=0,\\dots,5$; going back through the argmins gives runs in periods $" + R.runs.join(",") + "$. By the Wagner–Whitin property it is enough to compare the runs $c_{j,t}$."),
        _v: { dati: { d: d, sc: sc, vc: vc, hc: hc }, valori: b.valori }
      };
    }
  });
//@@BATCH3@@
})();
