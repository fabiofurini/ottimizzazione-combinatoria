---
title: "Problema del commesso viaggiatore (TSP)"
---

# Problema del commesso viaggiatore (TSP)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi di routing](routing-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-travelling-salesman-problem"></a>

<a id="box-1-def-catdef-tsp"></a>

!!! definizione "Definizione 1: Problema del commesso viaggiatore"

    Dati:

    1. un insieme $\mathscr{V} = \{1,2,\dots,n\}$ di $n$ <em>città</em>,

    2. per ogni coppia di città distinte $i,j \in \mathscr{V}$, una <em>distanza</em> $d_{ij} \in \Z_{\ge 1}$, con $d_{ij}=d_{ji}$,

    il <strong>problema del commesso viaggiatore</strong> (TSP) chiede di trovare un percorso chiuso che parte da una città, visita ogni altra città esattamente una volta e ritorna alla città di partenza, in modo che la distanza totale percorsa sia minima.

<strong>Ipotesi</strong>

- Facciamo le seguenti ipotesi:

    1. Ci sono almeno tre città (con una o due città c'è un solo percorso). Formalmente:

        $$
        n \ge 3
        $$

    2. Le distanze sono simmetriche (andare da $i$ a $j$ costa quanto andare da $j$ a $i$). Formalmente:

        $$
        d_{ij}=d_{ji},~~~~ \forall i,j \in \mathscr{V},~ i\neq j
        $$

## Che cosa fa il corso su questo problema { #sez-sec-cat-tsp-vert }

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Tecnica</strong></th>
<th><strong>Dove</strong></th>
</tr>
<tr>
<td><strong>Definizione</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/tsp/il-problema-del-commesso-viaggiatore/#box-1-defTSP">Cap. 6 «Problemi di routing»</a></td>
</tr>
<tr>
<td><strong>Formulazioni</strong></td>
<td><a href="../../formulazioni/tsp-formulations/">Cap. 13 «Formulazioni dei problemi di routing»</a></td>
</tr>
<tr>
<td><strong>Euristiche</strong></td>
<td><a href="https://fabiofurini.github.io/algoritmi-euristici/heuristics/#sez-sec-problems"><em>Algoritmi euristici</em>: «Algoritmi euristici: definizioni»</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/constructive-heuristics/il-problema-del-commesso-viaggiatore-accodare-o-inserire/#sez-sec-TSP"><em>Algoritmi euristici</em>: «Euristiche costruttive»</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/local-search/tsp-2-opt-e-or-opt/#sez-sec-tsp"><em>Algoritmi euristici</em>: «Ricerca locale»</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/metaheuristics/i-problemi-e-le-ipotesi/#sez-sec-instances"><em>Algoritmi euristici</em>: «Metaeuristiche»</a></td>
</tr>
<tr>
<td><strong>Euristiche MIP</strong></td>
<td><a href="https://fabiofurini.github.io/algoritmi-euristici/mip-heuristics-classical/#523-il-problema-del-commesso-viaggiatore"><em>Algoritmi euristici</em>: «Euristiche MIP per i problemi classici»</a></td>
</tr>
<tr>
<td><strong>Approssimazione</strong></td>
<td><a href="https://fabiofurini.github.io/algoritmi-di-approssimazione/tsp-approximation/#sez-sec-DT"><em>Algoritmi di approssimazione</em>: «TSP: il caso generale e il caso metrico»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/tsp/">Cap. 6 (7 esercizi)</a>; <a href="../../esercizi/tsp-formulations/">Cap. 13 (5 esercizi)</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/esercizi/heuristics/#esercizio-1-3"><em>Algoritmi euristici</em>, Esercizio 1.3</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/esercizi/constructive-heuristics/"><em>Algoritmi euristici</em>: «Euristiche costruttive» (3 esercizi)</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/esercizi/local-search/"><em>Algoritmi euristici</em>: «Ricerca locale» (3 esercizi)</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/esercizi/metaheuristics/"><em>Algoritmi euristici</em>: «Metaeuristiche» (7 esercizi)</a>; <a href="https://fabiofurini.github.io/algoritmi-di-approssimazione/esercizi/tsp-approximation/"><em>Algoritmi di approssimazione</em>: «TSP: il caso generale e il caso metrico» (3 esercizi)</a></td>
</tr>
</table></div>

### Proprietà { #sez-sec-cat-tsp-properties }

- NP-difficile in senso forte: contiene il problema del ciclo hamiltoniano ([Cap. 1](../problemi-di-ottimizzazione-combinatoria/combinatorial-optimization/cenni-di-complessita-computazionale.md#box-12-def-pseudo)).

- Lower bound $\lceil \frac12 \sum_i (a_i+b_i) \rceil$, con $a_i, b_i$ i due lati più corti incidenti nella città $i$ ([Cap. 6](../problemi-di-ottimizzazione-combinatoria/tsp/il-problema-del-commesso-viaggiatore.md#box-6-obs-tsp-lb)).

- Il nearest neighbour dalla città $1$ dà $25$ sull'istanza a cinque città del Cap. 6, il cui ottimo è $18$ ([Cap. 6](../problemi-di-ottimizzazione-combinatoria/tsp/il-problema-del-commesso-viaggiatore.md#box-5-ex-tsp-nn)).

### Formulazioni { #sez-sec-cat-tsp-formulations }

- Il modello MTZ elimina i sottogiri con $n-1$ variabili di posizione $u_i$; il modello DFJ con $2^{n-1}-n$ vincoli di eliminazione dei sottogiri, aggiunti solo quando sono violati ([Cap. 13](../formulazioni/tsp-formulations/modelli-pli-per-il-problema-del-commesso-viaggiatore.md#box-4-prop-DFJ-subtours)).

- Il rilassamento MTZ è debole; sull'istanza del [Cap. 6](../problemi-di-ottimizzazione-combinatoria/tsp/index.md) i bound sono $16$ (assegnamento), $17$ (MTZ) e $18$ (DFJ) ([Cap. 13](../formulazioni/tsp-formulations/modelli-pli-per-il-problema-del-commesso-viaggiatore.md#box-10-ex-TSP-LP)).

### Euristiche { #sez-sec-cat-tsp-heuristics }

- Il nearest neighbour multi-start e le euristiche di inserimento NI, FI e CI raggiungono tutti $18$ sull'istanza del [Cap. 6](../problemi-di-ottimizzazione-combinatoria/tsp/index.md) ([<em>Algoritmi euristici</em>](https://fabiofurini.github.io/algoritmi-euristici/constructive-heuristics/il-problema-del-commesso-viaggiatore-accodare-o-inserire/#sez-sec-INS)).

- 2-opt valuta ciascuna delle sue $\frac{n(n-3)}{2}$ mosse in $O(1)$ e trasforma il giro di lunghezza $25$ in un giro ottimo in due mosse ([<em>Algoritmi euristici</em>](https://fabiofurini.github.io/algoritmi-euristici/local-search/tsp-2-opt-e-or-opt/#box-5-ex-twooptref)).

- Or-opt e la VND sfuggono agli ottimi locali di 2-opt ([<em>Algoritmi euristici</em>](https://fabiofurini.github.io/algoritmi-euristici/local-search/tsp-2-opt-e-or-opt/#box-7-ex-oropt)).

- Simulated annealing, tabu search, iterated local search, GRASP e LNS sono confrontati su TSP20 (ottimo $291$) ([<em>Algoritmi euristici</em>](https://fabiofurini.github.io/algoritmi-euristici/metaheuristics/confronto-e-conclusioni/#4111-i-metodi-sulle-istanze-medie)).

### Euristiche MIP { #sez-sec-cat-tsp-mipheuristics }

- Con i vincoli di eliminazione dei sottogiri l'ottimo del rilassamento lineare dell'istanza del [Cap. 6](../problemi-di-ottimizzazione-combinatoria/tsp/index.md) è intero: l'arrotondamento dà $18$, gap $0\%$ ([<em>Algoritmi euristici</em>](https://fabiofurini.github.io/algoritmi-euristici/mip-heuristics-classical/#525-i-rilassamenti-lineari-sulle-istanze-di-riferimento)).

### Approssimazione { #sez-sec-cat-tsp-approximation }

- TSP metrico: l'algoritmo del doppio albero è un algoritmo $2$-approssimato, tight ([<em>Algoritmi di approssimazione</em>](https://fabiofurini.github.io/algoritmi-di-approssimazione/tsp-approximation/#box-8-prop-DT)).

- Christofides è un algoritmo $\frac32$-approssimato, tight ([<em>Algoritmi di approssimazione</em>](https://fabiofurini.github.io/algoritmi-di-approssimazione/tsp-approximation/#box-10-prop-CH)).

- TSP generale: nessun rapporto costante, a meno che $P=NP$ ([<em>Algoritmi di approssimazione</em>](https://fabiofurini.github.io/algoritmi-di-approssimazione/tsp-approximation/#box-1-prop-TSPinapx)).
