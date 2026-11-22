---
title: Catalogo
---

# Catalogo dei problemi di ottimizzazione combinatoria

<div class="info-capitolo" markdown>

**Catalogo** · 32 problemi · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf) · [:material-table: I problemi in sintesi](../problemi-di-ottimizzazione-combinatoria/problems.md)

</div>

Tutti i problemi del corso, per famiglia: il nome porta alla definizione, le etichette ai capitoli che lo trattano.

<nav class="cat-famiglie" markdown>

[:material-bag-personal-outline: Problemi di zaino](#knapsack-problems) [:material-package-variant-closed: Problemi di packing](#packing-problems) [:material-palette-outline: Problemi di colorazione](#coloring-problems) [:material-graph-outline: Problemi di cricca](#clique-problems) [:material-routes: Problemi di routing](#routing-problems) [:material-chart-gantt: Problemi di scheduling](#scheduling-problems) [:material-factory: Problemi di lot sizing](#lot-sizing-problems) [:material-shape-outline: Problemi misti](#miscellaneous-problems)

</nav>

## :material-bag-personal-outline: Problemi di zaino { #knapsack-problems }

<p class="cat-famiglia-riga">Selezionare un sottoinsieme o un multiinsieme di oggetti di massimo profitto totale nel rispetto di vincoli di capacità.</p>

<div class="cat-voce" id="knapsack-problem" markdown>

[**Problema dello zaino 0/1 (KP)**](../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-0-1.md#box-1-defKP) — Scegliere un sottoinsieme di oggetti di massimo profitto totale il cui peso totale non supera la capacità $c$.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 9">[:material-sigma: Formulazioni](../formulazioni/knapsack-formulations/index.md)</span> <span class="cat-tag" title="Cap. 16">[:material-source-branch: Algoritmi ad hoc](../algoritmi-specializzati/knapsack-branch-and-bound.md)</span> <span class="cat-tag" title="Zaino 0/1">[:material-table-large: Programmazione dinamica](https://fabiofurini.github.io/programmazione-dinamica/dp-knapsack/)</span> <span class="cat-tag">:material-map-marker-path: Euristiche: [Costruttive](https://fabiofurini.github.io/algoritmi-euristici/constructive-heuristics/il-problema-dello-zaino-0-1-quale-ordinamento/#sez-sec-KP) · [Ricerca locale](https://fabiofurini.github.io/algoritmi-euristici/local-search/kp-ammissibilita-e-penalita/#sez-sec-kp) · [Metaeuristiche](https://fabiofurini.github.io/algoritmi-euristici/metaheuristics/come-uscire-da-un-ottimo-locale/#sez-sec-sa-kp)</span> <span class="cat-tag" title="Euristiche MIP per i problemi classici">[:material-rocket-launch-outline: Euristiche MIP](https://fabiofurini.github.io/algoritmi-euristici/mip-heuristics-classical/#eq-eq-kp)</span> <span class="cat-tag" title="Zaino">[:material-approximately-equal: Approssimazione](https://fabiofurini.github.io/algoritmi-di-approssimazione/knapsack-approximation/)</span> <span class="cat-tag">:material-pencil: Esercizi: [Cap. 2](../esercizi/knapsack.md) · [Cap. 9](../esercizi/knapsack-formulations.md) · [Cap. 16](../esercizi/knapsack-branch-and-bound.md)</span></span>

</div>

<div class="cat-voce" id="subset-sum-problem" markdown>

[**Problema del subset sum (SSP)**](../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-del-subset-sum.md#box-4-defSSP) — Decidere se un sottoinsieme degli oggetti ha peso totale esattamente uguale a $c$.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 9">[:material-sigma: Formulazioni](../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-del-subset-sum.md#sez-sec-kpf-SSP)</span> <span class="cat-tag" title="Subset sum">[:material-table-large: Programmazione dinamica](https://fabiofurini.github.io/programmazione-dinamica/dp-subset-sum/)</span> <span class="cat-tag">:material-pencil: Esercizi: [Cap. 2](../esercizi/knapsack.md#esercizio-2-2) · [Cap. 9](../esercizi/knapsack-formulations.md#esercizio-9-6)</span></span>

</div>

<div class="cat-voce" id="bounded-knapsack-problem" markdown>

[**Problema dello zaino limitato (BKP)**](../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-limitato.md#box-6-defBKP) — Scegliere quante copie prendere di ogni oggetto, al più $b_j$ dell'oggetto $j$, con massimo profitto totale entro la capacità.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 9">[:material-sigma: Formulazioni](../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-limitato.md#sez-sec-kpf-BKP)</span> <span class="cat-tag" title="Zaino limitato">[:material-table-large: Programmazione dinamica](https://fabiofurini.github.io/programmazione-dinamica/dp-bounded-knapsack/)</span> <span class="cat-tag">:material-pencil: Esercizi: [Cap. 2](../esercizi/knapsack.md#esercizio-2-3) · [Cap. 9](../esercizi/knapsack-formulations.md#esercizio-9-7)</span></span>

</div>

<div class="cat-voce" id="unbounded-knapsack-problem" markdown>

[**Problema dello zaino illimitato (UKP)**](../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-illimitato.md#box-8-defUKP) — Scegliere quante copie prendere di ogni oggetto, senza limite superiore, con massimo profitto totale entro la capacità.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 9">[:material-sigma: Formulazioni](../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-illimitato.md#sez-sec-kpf-UKP)</span> <span class="cat-tag">:material-table-large: Programmazione dinamica: [Zaino illimitato](https://fabiofurini.github.io/programmazione-dinamica/dp-unbounded-knapsack/) · [Cambio monete](https://fabiofurini.github.io/programmazione-dinamica/dp-coin-change/) · [Taglio delle aste](https://fabiofurini.github.io/programmazione-dinamica/dp-rod-cutting/)</span> <span class="cat-tag">:material-pencil: Esercizi: [Cap. 2](../esercizi/knapsack.md#esercizio-2-3) · [Cap. 9](../esercizi/knapsack-formulations.md#esercizio-9-8)</span></span>

</div>

<div class="cat-voce" id="multidimensional-knapsack-problem" markdown>

[**Problema dello zaino multidimensionale (MDKP)**](../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-multidimensionale.md#box-10-defMDKP) — Scegliere oggetti di massimo profitto totale che rispettano $k$ vincoli di capacità, uno per ogni risorsa.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 9">[:material-sigma: Formulazioni](../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-multidimensionale.md#sez-sec-kpf-MDKP)</span> <span class="cat-tag" title="Zaino multidimensionale">[:material-table-large: Programmazione dinamica](https://fabiofurini.github.io/programmazione-dinamica/dp-multidimensional-knapsack/)</span> <span class="cat-tag" title="Cap. 9">[:material-pencil: Esercizi](../esercizi/knapsack-formulations.md#esercizio-9-9)</span></span>

</div>

<div class="cat-voce" id="multiple-knapsack-problem" markdown>

[**Problema degli zaini multipli (MKP)**](../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-degli-zaini-multipli.md#box-12-defMKP) — Assegnare oggetti a $m$ zaini, ciascuno con la sua capacità, in modo che il profitto totale degli oggetti assegnati sia massimo.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 9">[:material-sigma: Formulazioni](../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-degli-zaini-multipli.md#sez-sec-kpf-MKP)</span> <span class="cat-tag" title="Zaini multipli">[:material-table-large: Programmazione dinamica](https://fabiofurini.github.io/programmazione-dinamica/dp-multiple-knapsack/)</span> <span class="cat-tag">:material-pencil: Esercizi: [Cap. 2](../esercizi/knapsack.md#esercizio-2-4) · [Cap. 9](../esercizi/knapsack-formulations.md#esercizio-9-10)</span></span>

</div>

<div class="cat-voce" id="multiple-choice-knapsack-problem" markdown>

[**Problema dello zaino a scelta multipla (MCKP)**](../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-a-scelta-multipla.md#box-14-defMCKP) — Scegliere esattamente un oggetto per ogni classe, con massimo profitto totale entro la capacità.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 9">[:material-sigma: Formulazioni](../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-a-scelta-multipla.md#sez-sec-kpf-MCKP)</span> <span class="cat-tag" title="Zaino a scelta multipla">[:material-table-large: Programmazione dinamica](https://fabiofurini.github.io/programmazione-dinamica/dp-multiple-choice-knapsack/)</span> <span class="cat-tag">:material-pencil: Esercizi: [Cap. 2](../esercizi/knapsack.md#esercizio-2-5) · [Cap. 9](../esercizi/knapsack-formulations.md#esercizio-9-11)</span></span>

</div>

<div class="cat-voce" id="knapsack-problem-with-setups" markdown>

[**Problema dello zaino con setup (KPS)**](../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-con-setup.md#box-16-defKPS) — Scegliere oggetti divisi in classi, dove il primo oggetto di una classe paga un costo e un peso di setup, con massimo profitto netto entro la capacità.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 9">[:material-sigma: Formulazioni](../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-con-setup.md#sez-sec-kpf-KPS)</span> <span class="cat-tag" title="Zaino con setup">[:material-table-large: Programmazione dinamica](https://fabiofurini.github.io/programmazione-dinamica/dp-knapsack-setups/)</span> <span class="cat-tag" title="Cap. 9">[:material-pencil: Esercizi](../esercizi/knapsack-formulations.md#esercizio-9-12)</span></span>

</div>

## :material-package-variant-closed: Problemi di packing { #packing-problems }

<p class="cat-famiglia-riga">Sistemare gli oggetti nel minimo numero di contenitori di uguale capacità.</p>

<div class="cat-voce" id="bin-packing-problem" markdown>

[**Problema del bin packing (BPP)**](../problemi-di-ottimizzazione-combinatoria/bin-packing/il-problema-del-bin-packing.md#box-1-defBPP) — Sistemare oggetti di peso $w_j$ nel minimo numero di contenitori di capacità $c$.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 10">[:material-sigma: Formulazioni](../formulazioni/bin-packing-formulations/index.md)</span> <span class="cat-tag">:material-map-marker-path: Euristiche: [Costruttive](https://fabiofurini.github.io/algoritmi-euristici/constructive-heuristics/il-problema-del-bin-packing-prima-ordinare-poi-riempire/#sez-sec-BPP) · [Ricerca locale](https://fabiofurini.github.io/algoritmi-euristici/local-search/ricerca-locale-lo-schema/#342-bpp-move-e-swap) · [Metaeuristiche](https://fabiofurini.github.io/algoritmi-euristici/metaheuristics/large-neighbourhood-search/#sez-sec-lns-bpp)</span> <span class="cat-tag" title="Euristiche MIP per i problemi classici">[:material-rocket-launch-outline: Euristiche MIP](https://fabiofurini.github.io/algoritmi-euristici/mip-heuristics-classical/#eq-eq-bpp)</span> <span class="cat-tag" title="Bin packing">[:material-approximately-equal: Approssimazione](https://fabiofurini.github.io/algoritmi-di-approssimazione/bin-packing-approximation/)</span> <span class="cat-tag">:material-pencil: Esercizi: [Cap. 3](../esercizi/bin-packing.md) · [Cap. 7](../esercizi/pcmax.md#esercizio-7-5) · [Cap. 10](../esercizi/bin-packing-formulations.md)</span></span>

</div>

<div class="cat-voce" id="cutting-stock-problem" markdown>

[**Problema del cutting stock (CSP)**](../problemi-di-ottimizzazione-combinatoria/bin-packing/il-problema-del-cutting-stock.md#box-4-defCSP) — Sistemare $d_j$ copie di ogni tipo di oggetto $j$ nel minimo numero di contenitori di capacità $c$.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 10">[:material-sigma: Formulazioni](../formulazioni/bin-packing-formulations/un-modello-pli-per-il-problema-del-cutting-stock.md#sez-sec-bpf-CSP)</span> <span class="cat-tag">:material-pencil: Esercizi: [Cap. 3](../esercizi/bin-packing.md#esercizio-3-4) · [Cap. 10](../esercizi/bin-packing-formulations.md#esercizio-10-6)</span></span>

</div>

## :material-palette-outline: Problemi di colorazione { #coloring-problems }

<p class="cat-famiglia-riga">Colorare i vertici di un grafo con il minimo numero di colori.</p>

<div class="cat-voce" id="vertex-coloring-problem" markdown>

[**Problema della colorazione dei vertici (VCP)**](../problemi-di-ottimizzazione-combinatoria/coloring/il-problema-della-colorazione-dei-vertici.md#box-3-defVCP) — Colorare i vertici di un grafo, con colori diversi su vertici adiacenti, usando il minimo numero di colori.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 11">[:material-sigma: Formulazioni](../formulazioni/coloring-formulations/index.md)</span> <span class="cat-tag" title="Cap. 17">[:material-source-branch: Algoritmi ad hoc](../algoritmi-specializzati/dsatur-branch-and-bound.md)</span> <span class="cat-tag" title="Costruttive">[:material-map-marker-path: Euristiche](https://fabiofurini.github.io/algoritmi-euristici/constructive-heuristics/colorazione-dei-vertici-greedy-e-dsatur/#sez-sec-VCPgreedy)</span> <span class="cat-tag" title="Colorazione dei vertici: limiti dell'approssimazione">[:material-approximately-equal: Limiti dell'approssimazione](https://fabiofurini.github.io/algoritmi-di-approssimazione/coloring-inapproximability/)</span> <span class="cat-tag">:material-pencil: Esercizi: [Cap. 4](../esercizi/coloring.md) · [Cap. 11](../esercizi/coloring-formulations.md) · [Cap. 17](../esercizi/dsatur-branch-and-bound.md)</span></span>

</div>

## :material-graph-outline: Problemi di cricca { #clique-problems }

<p class="cat-famiglia-riga">Trovare un insieme di vertici a due a due adiacenti di massima cardinalità o di massimo peso.</p>

<div class="cat-voce" id="maximum-clique-problem" markdown>

[**Problema della cricca massima (MCP)**](../problemi-di-ottimizzazione-combinatoria/clique/il-problema-della-clique-massima.md#box-2-mcpP-def-MCP) — Trovare una clique di un grafo, un insieme di vertici a due a due adiacenti, di cardinalità massima.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 12">[:material-sigma: Formulazioni](../formulazioni/clique-formulations/un-modello-pli-per-il-problema-della-clique-massima-la-formu.md#sez-sec-mcpf-MCP)</span> <span class="cat-tag" title="Clique massima: limiti dell'approssimazione">[:material-approximately-equal: Limiti dell'approssimazione](https://fabiofurini.github.io/algoritmi-di-approssimazione/clique-inapproximability/)</span> <span class="cat-tag">:material-pencil: Esercizi: [Cap. 4](../esercizi/coloring.md) · [Cap. 5](../esercizi/clique.md) · [Cap. 12](../esercizi/clique-formulations.md)</span></span>

</div>

<div class="cat-voce" id="maximum-stable-set-problem" markdown>

[**Problema dell'insieme stabile massimo (MSSP)**](../problemi-di-ottimizzazione-combinatoria/clique/il-problema-della-clique-massima.md#box-3-mcpP-def-MSSP) — Trovare un insieme stabile di un grafo, un insieme di vertici a due a due non adiacenti, di cardinalità massima.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 12">[:material-sigma: Formulazioni](../formulazioni/clique-formulations/un-modello-pli-per-il-problema-della-clique-massima-la-formu.md#sez-sec-mcpf-MSSP)</span> <span class="cat-tag" title="Clique massima: limiti dell'approssimazione">[:material-approximately-equal: Limiti dell'approssimazione](https://fabiofurini.github.io/algoritmi-di-approssimazione/clique-inapproximability/#box-7-cli-cormssp)</span> <span class="cat-tag">:material-pencil: Esercizi: [Cap. 4](../esercizi/coloring.md#esercizio-4-3) · [Cap. 5](../esercizi/clique.md) · [Cap. 12](../esercizi/clique-formulations.md#esercizio-12-6)</span></span>

</div>

<div class="cat-voce" id="vertex-weighted-maximum-clique-problem" markdown>

[**Problema della cricca massima pesata sui vertici (VWMCP)**](../problemi-di-ottimizzazione-combinatoria/clique/varianti-pesate.md#box-12-mcpP-def-weighted) — Trovare una clique di massimo peso totale dei vertici.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 12">[:material-sigma: Formulazioni](../formulazioni/clique-formulations/modelli-pli-per-le-varianti-pesate.md#eq-mcpF-VW)</span> <span class="cat-tag">:material-pencil: Esercizi: [Cap. 5](../esercizi/clique.md#esercizio-5-5) · [Cap. 12](../esercizi/clique-formulations.md#esercizio-12-7)</span></span>

</div>

<div class="cat-voce" id="edge-weighted-maximum-clique-problem" markdown>

[**Problema della cricca massima pesata sui lati (EWMCP)**](../problemi-di-ottimizzazione-combinatoria/clique/varianti-pesate.md#box-12-mcpP-def-weighted) — Trovare una clique di massimo peso totale dei lati con entrambi gli estremi nella clique.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 12">[:material-sigma: Formulazioni](../formulazioni/clique-formulations/modelli-pli-per-le-varianti-pesate.md#eq-mcpF-EW)</span> <span class="cat-tag" title="Cap. 12">[:material-pencil: Esercizi](../esercizi/clique-formulations.md#esercizio-12-8)</span></span>

</div>

## :material-routes: Problemi di routing { #routing-problems }

<p class="cat-famiglia-riga">Trovare un giro di lunghezza minima che visita ogni città esattamente una volta.</p>

<div class="cat-voce" id="travelling-salesman-problem" markdown>

[**Problema del commesso viaggiatore (TSP)**](../problemi-di-ottimizzazione-combinatoria/tsp/il-problema-del-commesso-viaggiatore.md#box-1-defTSP) — Trovare un giro che visita ogni città esattamente una volta e torna alla prima, di distanza totale minima.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 13">[:material-sigma: Formulazioni](../formulazioni/tsp-formulations/index.md)</span> <span class="cat-tag">:material-map-marker-path: Euristiche: [Costruttive](https://fabiofurini.github.io/algoritmi-euristici/constructive-heuristics/il-problema-del-commesso-viaggiatore-accodare-o-inserire/#sez-sec-TSP) · [Ricerca locale](https://fabiofurini.github.io/algoritmi-euristici/local-search/tsp-2-opt-e-or-opt/#sez-sec-tsp) · [Metaeuristiche](https://fabiofurini.github.io/algoritmi-euristici/metaheuristics/i-problemi-e-le-ipotesi/#sez-sec-instances)</span> <span class="cat-tag" title="Euristiche MIP per i problemi classici">[:material-rocket-launch-outline: Euristiche MIP](https://fabiofurini.github.io/algoritmi-euristici/mip-heuristics-classical/#523-il-problema-del-commesso-viaggiatore)</span> <span class="cat-tag" title="TSP: il caso generale e il caso metrico">[:material-approximately-equal: Approssimazione](https://fabiofurini.github.io/algoritmi-di-approssimazione/tsp-approximation/#sez-sec-DT)</span> <span class="cat-tag">:material-pencil: Esercizi: [Cap. 6](../esercizi/tsp.md) · [Cap. 13](../esercizi/tsp-formulations.md)</span></span>

</div>

<div class="cat-voce" id="metric-travelling-salesman-problem" markdown>

[**Problema del commesso viaggiatore metrico (TSP metrico)**](../problemi-di-ottimizzazione-combinatoria/tsp/varianti-tsp-metrico-e-tsp-asimmetrico.md#box-8-defMetricTSP) — Il TSP con distanze che soddisfano la disuguaglianza triangolare $d_{ij} \le d_{ik} + d_{kj}$.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 13">[:material-sigma: Formulazioni](../formulazioni/tsp-formulations/modelli-pli-per-il-tsp-metrico-e-asimmetrico.md#sez-sec-tspf-variants)</span> <span class="cat-tag" title="Costruttive">[:material-map-marker-path: Euristiche](https://fabiofurini.github.io/algoritmi-euristici/constructive-heuristics/il-problema-del-commesso-viaggiatore-accodare-o-inserire/#sez-sec-INS)</span> <span class="cat-tag" title="TSP: il caso generale e il caso metrico">[:material-approximately-equal: Approssimazione](https://fabiofurini.github.io/algoritmi-di-approssimazione/tsp-approximation/#box-2-def-metricTSP)</span> <span class="cat-tag" title="Cap. 6">[:material-pencil: Esercizi](../esercizi/tsp.md#esercizio-6-4)</span></span>

</div>

<div class="cat-voce" id="asymmetric-travelling-salesman-problem" markdown>

[**Problema del commesso viaggiatore asimmetrico (ATSP)**](../problemi-di-ottimizzazione-combinatoria/tsp/varianti-tsp-metrico-e-tsp-asimmetrico.md#sez-sec-tsp-variants) — Il TSP con distanze che possono essere diverse nei due versi, $d_{ij} \ne d_{ji}$.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 13">[:material-sigma: Formulazioni](../formulazioni/tsp-formulations/modelli-pli-per-il-tsp-metrico-e-asimmetrico.md#eq-ILP-ATSP)</span> <span class="cat-tag">:material-pencil: Esercizi: [Cap. 6](../esercizi/tsp.md#esercizio-6-5) · [Cap. 13](../esercizi/tsp-formulations.md#esercizio-13-6)</span></span>

</div>

<div class="cat-voce" id="hamiltonian-cycle-problem" markdown>

[**Problema del ciclo hamiltoniano (HCP)**](hamiltonian-cycle-problem.md) — Decidere se un grafo ha un ciclo che passa per tutti i suoi vertici.

<span class="cat-rimandi"><span class="cat-tag" title="TSP: il caso generale e il caso metrico">[:material-approximately-equal: Approssimazione](https://fabiofurini.github.io/algoritmi-di-approssimazione/tsp-approximation/#box-1-prop-TSPinapx)</span></span>

</div>

## :material-chart-gantt: Problemi di scheduling { #scheduling-problems }

<p class="cat-famiglia-riga">Assegnare lavori a macchine parallele in modo da minimizzare il makespan.</p>

<div class="cat-voce" id="scheduling-on-identical-parallel-machines" markdown>

[**Scheduling su macchine parallele identiche (P||Cmax)**](../problemi-di-ottimizzazione-combinatoria/pcmax/scheduling-su-macchine-parallele-identiche.md#box-1-defPCmax) — Assegnare lavori a $m$ macchine parallele identiche in modo che il makespan, il carico massimo di una macchina, sia minimo.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 14">[:material-sigma: Formulazioni](../formulazioni/pcmax-formulations/index.md)</span> <span class="cat-tag">:material-map-marker-path: Euristiche: [Costruttive](https://fabiofurini.github.io/algoritmi-euristici/constructive-heuristics/scheduling-su-macchine-parallele-prima-i-lavori-piu-lunghi/#sez-sec-PCM) · [Ricerca locale](https://fabiofurini.github.io/algoritmi-euristici/local-search/p-cmax-move-e-swap/#sez-sec-pcmax) · [Metaeuristiche](https://fabiofurini.github.io/algoritmi-euristici/metaheuristics/tabu-search/#sez-sec-ts)</span> <span class="cat-tag" title="Euristiche MIP per i problemi classici">[:material-rocket-launch-outline: Euristiche MIP](https://fabiofurini.github.io/algoritmi-euristici/mip-heuristics-classical/#eq-eq-pcm)</span> <span class="cat-tag" title="Approssimazione per $P\|C_{\max}$">[:material-approximately-equal: Approssimazione](https://fabiofurini.github.io/algoritmi-di-approssimazione/pcmax-approximation/#sez-sec-LIST)</span> <span class="cat-tag">:material-pencil: Esercizi: [Cap. 7](../esercizi/pcmax.md) · [Cap. 14](../esercizi/pcmax-formulations.md)</span></span>

</div>

<div class="cat-voce" id="scheduling-on-a-fixed-number-of-identical-machines" markdown>

[**Scheduling su un numero fissato di macchine identiche (Pm||Cmax)**](scheduling-on-a-fixed-number-of-identical-machines.md) — Il problema $P\,||\,C_{\max}$ con un numero $m$ di macchine fissato, per esempio $m=2$.

<span class="cat-rimandi"><span class="cat-tag" title="Principi della programmazione dinamica">[:material-table-large: Programmazione dinamica](https://fabiofurini.github.io/programmazione-dinamica/dp-principles/)</span></span>

</div>

<div class="cat-voce" id="scheduling-on-parallel-machines-with-different-speeds" markdown>

[**Scheduling su macchine parallele con velocità diverse (Q||Cmax)**](../problemi-di-ottimizzazione-combinatoria/pcmax/index.md#sez-sec-threefield) — Assegnare lavori a macchine parallele con velocità diverse in modo che il makespan sia minimo.

</div>

<div class="cat-voce" id="scheduling-on-unrelated-parallel-machines" markdown>

[**Scheduling su macchine parallele scorrelate (R||Cmax)**](../problemi-di-ottimizzazione-combinatoria/pcmax/index.md#sez-sec-threefield) — Assegnare lavori a macchine parallele scorrelate, dove il tempo di un lavoro dipende dalla macchina, in modo che il makespan sia minimo.

</div>

## :material-factory: Problemi di lot sizing { #lot-sizing-problems }

<p class="cat-famiglia-riga">Pianificare la produzione su un orizzonte di periodi al minimo costo.</p>

<div class="cat-voce" id="capacitated-lot-sizing" markdown>

[**Lot sizing capacitato (CLS)**](../problemi-di-ottimizzazione-combinatoria/lot-sizing/il-problema-del-lot-sizing-capacitato.md#box-1-defCLS) — Fissare la produzione di ogni periodo entro la sua capacità, in modo che ogni domanda sia soddisfatta al minimo costo totale di setup, produzione e mantenimento a scorta.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 15">[:material-sigma: Formulazioni](../formulazioni/lot-sizing-formulations/index.md)</span> <span class="cat-tag" title="Lot sizing capacitato">[:material-table-large: Programmazione dinamica](https://fabiofurini.github.io/programmazione-dinamica/dp-capacitated-lot-sizing/)</span> <span class="cat-tag" title="Euristiche MIP per i problemi classici">[:material-rocket-launch-outline: Euristiche MIP](https://fabiofurini.github.io/algoritmi-euristici/mip-heuristics-classical/#sez-sec-rf)</span> <span class="cat-tag">:material-pencil: Esercizi: [Cap. 8](../esercizi/lot-sizing.md) · [Cap. 15](../esercizi/lot-sizing-formulations.md)</span></span>

</div>

<div class="cat-voce" id="uncapacitated-lot-sizing-problem" markdown>

[**Problema del lot sizing senza capacità (ULS)**](../problemi-di-ottimizzazione-combinatoria/lot-sizing/varianti.md#box-7-defULS) — Il problema di lot sizing senza capacità: fissare la produzione di ogni periodo al minimo costo totale.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 15">[:material-sigma: Formulazioni](../formulazioni/lot-sizing-formulations/modelli-pli-per-il-problema-di-lot-sizing-capacitato.md#sez-sec-lsf-compare)</span> <span class="cat-tag" title="Lot sizing senza capacità">[:material-table-large: Programmazione dinamica](https://fabiofurini.github.io/programmazione-dinamica/dp-lot-sizing/#box-3-thmZIO)</span> <span class="cat-tag" title="Euristiche MIP per i problemi classici">[:material-rocket-launch-outline: Euristiche MIP](https://fabiofurini.github.io/algoritmi-euristici/mip-heuristics-classical/#box-16-ex-rfcourse)</span> <span class="cat-tag">:material-pencil: Esercizi: [Cap. 8](../esercizi/lot-sizing.md#esercizio-8-4) · [Cap. 15](../esercizi/lot-sizing-formulations.md#esercizio-15-6)</span></span>

</div>

<div class="cat-voce" id="capacitated-lot-sizing-with-constant-capacity" markdown>

[**Lot sizing capacitato con capacità costante (CLS-C)**](https://fabiofurini.github.io/programmazione-dinamica/dp-capacitated-lot-sizing/#1123-il-caso-a-capacita-costante) — Il CLS con la stessa capacità $C$ in tutti i periodi.

<span class="cat-rimandi"><span class="cat-tag" title="Lot sizing capacitato">[:material-table-large: Programmazione dinamica](https://fabiofurini.github.io/programmazione-dinamica/dp-capacitated-lot-sizing/#1123-il-caso-a-capacita-costante)</span></span>

</div>

<div class="cat-voce" id="lot-sizing-with-several-products-and-setup-times" markdown>

[**Lot sizing con più prodotti e tempi di setup (MLS)**](../problemi-di-ottimizzazione-combinatoria/lot-sizing/varianti.md#box-8-defMLS) — Lot sizing di più prodotti che condividono la capacità di ogni periodo, con tempi di setup.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 15">[:material-sigma: Formulazioni](../formulazioni/lot-sizing-formulations/modelli-pli-per-le-varianti.md#eq-CLSPm-bigM)</span> <span class="cat-tag" title="Cap. 15">[:material-pencil: Esercizi](../esercizi/lot-sizing-formulations.md#esercizio-15-7)</span></span>

</div>

<div class="cat-voce" id="lot-sizing-with-initial-stock" markdown>

[**Lot sizing con scorta iniziale (LS-SI)**](../problemi-di-ottimizzazione-combinatoria/lot-sizing/varianti.md#sez-sec-ls-variants) — Lot sizing in cui la scorta iniziale di ogni prodotto è una decisione, acquistata a un costo unitario.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 15">[:material-sigma: Formulazioni](../formulazioni/lot-sizing-formulations/modelli-pli-per-le-varianti.md#eq-CLSP-bigM)</span></span>

</div>

<div class="cat-voce" id="lot-sizing-with-overtime" markdown>

[**Lot sizing con straordinario (LS-OT)**](../problemi-di-ottimizzazione-combinatoria/lot-sizing/varianti.md#sez-sec-ls-variants) — Lot sizing con una capacità in orario normale e una in straordinario, a costi unitari diversi.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 15">[:material-sigma: Formulazioni](../formulazioni/lot-sizing-formulations/modelli-pli-per-le-varianti.md#eq-CLSPo-bigM)</span> <span class="cat-tag" title="Cap. 15">[:material-pencil: Esercizi](../esercizi/lot-sizing-formulations.md#esercizio-15-8)</span></span>

</div>

<div class="cat-voce" id="lot-sizing-with-unsatisfied-demand" markdown>

[**Lot sizing con domanda non soddisfatta (LS-UD)**](../problemi-di-ottimizzazione-combinatoria/lot-sizing/varianti.md#sez-sec-ls-variants) — Lot sizing in cui una parte della domanda può restare non soddisfatta, con una penalità per unità.

<span class="cat-rimandi"><span class="cat-tag" title="Cap. 15">[:material-sigma: Formulazioni](../formulazioni/lot-sizing-formulations/modelli-pli-per-le-varianti.md#eq-CLSPu-bigM)</span> <span class="cat-tag" title="Cap. 15">[:material-pencil: Esercizi](../esercizi/lot-sizing-formulations.md#esercizio-15-9)</span></span>

</div>

## :material-shape-outline: Problemi misti { #miscellaneous-problems }

<p class="cat-famiglia-riga">Problemi con una lunghezza o un ammontare totale esatto, risolti con la programmazione dinamica.</p>

<div class="cat-voce" id="rod-cutting-problem" markdown>

[**Problema del taglio delle aste (RCP)**](rod-cutting-problem.md) — Tagliare un'asta di lunghezza $n$ in pezzi di lunghezza intera con profitti dati, in modo che il profitto totale sia massimo.

<span class="cat-rimandi"><span class="cat-tag" title="Taglio delle aste">[:material-table-large: Programmazione dinamica](https://fabiofurini.github.io/programmazione-dinamica/dp-rod-cutting/)</span></span>

</div>

<div class="cat-voce" id="coin-change-problem" markdown>

[**Problema del cambio monete (CCP)**](coin-change-problem.md) — Dare il resto $c$ esattamente con il minimo numero di monete di tagli dati.

<span class="cat-rimandi"><span class="cat-tag" title="Cambio monete">[:material-table-large: Programmazione dinamica](https://fabiofurini.github.io/programmazione-dinamica/dp-coin-change/)</span></span>

</div>
