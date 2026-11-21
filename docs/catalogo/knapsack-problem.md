---
title: "Problema dello zaino 0/1 (KP)"
---

# Problema dello zaino 0/1 (KP)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi di zaino](knapsack-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-knapsack-problem"></a>

<a id="box-1-def-catdef-kp"></a>

!!! definizione "Definizione 1: Problema dello zaino 0/1"

    Dati:

    1. uno zaino di <em>capacità</em> $c \in \Z_{\ge 1}$,

    2. un insieme $\mathscr{I} = \{1,2,\dots,n\}$ di $n$ oggetti,

    3. per ogni oggetto $j \in \mathscr{I}$, un <em>profitto</em> $p_j \in \Z_{\ge 1}$ e un <em>peso</em> $w_j \in \Z_{\ge 1}$,

    il <strong>problema dello zaino 0/1</strong> (KP) chiede di decidere quali oggetti inserire nello zaino, in modo che il peso totale degli oggetti selezionati non superi la capacità dello zaino e il profitto totale degli oggetti selezionati sia massimo.

<strong>Ipotesi</strong>

- Facciamo le seguenti ipotesi:

    1. Il peso totale di tutti gli oggetti supera la capacità dello zaino (altrimenti si potrebbero selezionare tutti gli oggetti). Formalmente:

        $$
        \sum_{j \in \mathscr{I}} w_j > c
        $$

    2. Ogni oggetto, da solo, entra nello zaino (altrimenti non può essere selezionato). Formalmente:

        $$
        w_j \le c,~~~~ \forall j \in \mathscr{I}
        $$

## Che cosa fa il corso su questo problema { #sez-sec-cat-kp-vert }

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Tecnica</strong></th>
<th><strong>Dove</strong></th>
</tr>
<tr>
<td><strong>Definizione</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-0-1/#box-1-defKP">Cap. 2 «Problemi di zaino»</a></td>
</tr>
<tr>
<td><strong>Formulazioni</strong></td>
<td><a href="../../formulazioni/knapsack-formulations/">Cap. 9 «Formulazioni dei problemi di zaino»</a></td>
</tr>
<tr>
<td><strong>Programmazione dinamica</strong></td>
<td><a href="https://fabiofurini.github.io/programmazione-dinamica/dp-principles/#14-gli-algoritmi-di-pd-di-questo-modulo"><em>Programmazione dinamica</em>: «Principi della programmazione dinamica»</a>; <a href="https://fabiofurini.github.io/programmazione-dinamica/dp-knapsack/"><em>Programmazione dinamica</em>: «PD per il problema dello zaino 0/1»</a></td>
</tr>
<tr>
<td><strong>Euristiche</strong></td>
<td><a href="https://fabiofurini.github.io/algoritmi-euristici/heuristics/#box-2-ex-refKP"><em>Algoritmi euristici</em>: «Algoritmi euristici: definizioni»</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/constructive-heuristics/il-problema-dello-zaino-0-1-quale-ordinamento/#sez-sec-KP"><em>Algoritmi euristici</em>: «Euristiche costruttive»</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/local-search/kp-ammissibilita-e-penalita/#sez-sec-kp"><em>Algoritmi euristici</em>: «Ricerca locale»</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/metaheuristics/come-uscire-da-un-ottimo-locale/#sez-sec-sa-kp"><em>Algoritmi euristici</em>: «Metaeuristiche»</a></td>
</tr>
<tr>
<td><strong>Euristiche MIP</strong></td>
<td><a href="https://fabiofurini.github.io/algoritmi-euristici/mip-heuristics-classical/#eq-eq-kp"><em>Algoritmi euristici</em>: «Euristiche MIP per i problemi classici»</a></td>
</tr>
<tr>
<td><strong>Approssimazione</strong></td>
<td><a href="https://fabiofurini.github.io/algoritmi-di-approssimazione/approximation/"><em>Algoritmi di approssimazione</em>: «Principi degli algoritmi di approssimazione»</a>; <a href="https://fabiofurini.github.io/algoritmi-di-approssimazione/knapsack-approximation/"><em>Algoritmi di approssimazione</em>: «Algoritmi di approssimazione per lo zaino»</a></td>
</tr>
<tr>
<td><strong>Algoritmi ad hoc</strong></td>
<td><a href="../../algoritmi-specializzati/knapsack-branch-and-bound/">Cap. 16 «Zaino: branch-and-bound sull'elemento critico»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/knapsack/">Cap. 2 (6 esercizi)</a>; <a href="../../esercizi/knapsack-formulations/">Cap. 9 (5 esercizi)</a>; <a href="../../esercizi/knapsack-branch-and-bound/">Cap. 16 (4 esercizi)</a>; <a href="https://fabiofurini.github.io/programmazione-dinamica/esercizi/dp-principles/#esercizio-1-1"><em>Programmazione dinamica</em>, Esercizio 1.1</a>; <a href="https://fabiofurini.github.io/programmazione-dinamica/esercizi/dp-knapsack/"><em>Programmazione dinamica</em>: «PD per il problema dello zaino 0/1» (5 esercizi)</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/esercizi/heuristics/"><em>Algoritmi euristici</em>: «Algoritmi euristici: definizioni» (2 esercizi)</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/esercizi/constructive-heuristics/"><em>Algoritmi euristici</em>: «Euristiche costruttive» (3 esercizi)</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/esercizi/local-search/"><em>Algoritmi euristici</em>: «Ricerca locale» (3 esercizi)</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/esercizi/metaheuristics/"><em>Algoritmi euristici</em>: «Metaeuristiche» (5 esercizi)</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/esercizi/mip-heuristics-classical/"><em>Algoritmi euristici</em>: «Euristiche MIP per i problemi classici» (4 esercizi)</a>; <a href="https://fabiofurini.github.io/algoritmi-di-approssimazione/esercizi/approximation/#esercizio-1-4"><em>Algoritmi di approssimazione</em>, Esercizio 1.4</a>; <a href="https://fabiofurini.github.io/algoritmi-di-approssimazione/esercizi/knapsack-approximation/"><em>Algoritmi di approssimazione</em>: «Algoritmi di approssimazione per lo zaino» (15 esercizi)</a></td>
</tr>
</table></div>

### Proprietà { #sez-sec-cat-kp-properties }

- NP-difficile in senso debole: la programmazione dinamica lo risolve in $\Theta(nc)$ passi, un tempo pseudo-polinomiale ([Cap. 1](../problemi-di-ottimizzazione-combinatoria/combinatorial-optimization/cenni-di-complessita-computazionale.md#box-12-def-pseudo)).

- Bound di cardinalità: se entrano al più $\bar k$ oggetti, $z(I)$ è al più la somma dei $\bar k$ profitti più grandi ([Cap. 2](../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-0-1.md#box-3-obs-kp-card)).

- Ordinare per efficienza non basta: sull'istanza del Cap. 2 si ottiene profitto $11$, mentre l'ottimo è $15$ ([Cap. 2](../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-con-setup.md#211-errori-tipici)).

### Formulazioni { #sez-sec-cat-kp-formulations }

- Il modello $\ILP_{\KP}$ ha una variabile binaria per oggetto e un vincolo di capacità ([Cap. 9](../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-0-1.md#eq-NAT_KP)).

- Il rilassamento $\LP_{\KP}$ si risolve ordinando gli oggetti per efficienza: si prendono gli oggetti prima dell'oggetto critico $s$, e $s$ solo in parte ([Cap. 9](../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-0-1.md#box-12-propLPKP)).

- $z(\LP_{\KP}) \le 2\, z(\ILP_{\KP})$, e il rapporto $2$ è raggiunto al limite ([Cap. 9](../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-0-1.md#box-16-propRatio2tight)).

- Arrotondando per difetto $z(\LP_{\KP})$ si ottiene il bound di Dantzig $\UB_{\mathrm{D}}$; il bound di Martello–Toth $\UB_{\mathrm{MT}}$ considera l'oggetto critico fuori e dentro lo zaino ([Cap. 9](../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-0-1.md#95-upper-bound-per-il-problema-dello-zaino-01)).

### Programmazione dinamica { #sez-sec-cat-kp-dynamicprogramming }

- La ricorrenza $v(j,k)$ su oggetti e capacità richiede $\Theta(nc)$ passi ([<em>Programmazione dinamica</em>](https://fabiofurini.github.io/programmazione-dinamica/dp-knapsack/)).

- Le liste degli stati non dominati tengono solo gli stati raggiungibili, al più $\min\{2^j, c+1\}$ per stadio ([<em>Programmazione dinamica</em>](https://fabiofurini.github.io/programmazione-dinamica/dp-knapsack/un-primo-algoritmo-di-pd-un-implementazione-con-liste/#box-28-texkp3graph)).

- La PD sui profitti richiede $\Theta(nP)$ passi; è il nucleo dell'FPTAS ([<em>Programmazione dinamica</em>](https://fabiofurini.github.io/programmazione-dinamica/dp-knapsack/un-secondo-algoritmo-di-pd/#23-un-secondo-algoritmo-di-pd)).

- L'UKP e il BKP hanno le loro ricorrenze ([<em>Programmazione dinamica</em>](https://fabiofurini.github.io/programmazione-dinamica/dp-unbounded-knapsack/), [<em>Programmazione dinamica</em>](https://fabiofurini.github.io/programmazione-dinamica/dp-bounded-knapsack/)).

- Così anche l'SSP, l'MCKP e il KPS, in $\Theta(nc)$ passi; per l'MDKP e l'MKP la tabella cresce esponenzialmente con il numero di capacità ([<em>Programmazione dinamica</em>](https://fabiofurini.github.io/programmazione-dinamica/dp-subset-sum/), [<em>Programmazione dinamica</em>](https://fabiofurini.github.io/programmazione-dinamica/dp-multiple-choice-knapsack/), [<em>Programmazione dinamica</em>](https://fabiofurini.github.io/programmazione-dinamica/dp-multidimensional-knapsack/), [<em>Programmazione dinamica</em>](https://fabiofurini.github.io/programmazione-dinamica/dp-knapsack-setups/), [<em>Programmazione dinamica</em>](https://fabiofurini.github.io/programmazione-dinamica/dp-multiple-knapsack/)).

### Euristiche { #sez-sec-cat-kp-heuristics }

- Greedy per profitto, per peso e per efficienza: sull'istanza a quattro oggetti del [<em>Algoritmi euristici</em>](https://fabiofurini.github.io/algoritmi-euristici/heuristics/) (ottimo $17$) danno $17$, $10$ e $16$ ([<em>Algoritmi euristici</em>](https://fabiofurini.github.io/algoritmi-euristici/constructive-heuristics/il-problema-dello-zaino-0-1-quale-ordinamento/#box-3-ex-kp3)).

- Ricerca locale con flip e swap: first improvement e best improvement raggiungono $17$ per strade diverse ([<em>Algoritmi euristici</em>](https://fabiofurini.github.io/algoritmi-euristici/local-search/first-improvement-e-best-improvement/#box-3-ex-kpfirstbest)).

- Una penalità sul peso in eccesso permette alla ricerca di attraversare soluzioni non ammissibili; con $\alpha>\max_j p_j$ i suoi ottimi locali sono ammissibili ([<em>Algoritmi euristici</em>](https://fabiofurini.github.io/algoritmi-euristici/local-search/kp-ammissibilita-e-penalita/#box-14-ex-kppen)).

- Simulated annealing, GRASP, algoritmi genetici e memetici; su KP20 l'algoritmo memetico raggiunge l'ottimo $521$ in ogni esecuzione ([<em>Algoritmi euristici</em>](https://fabiofurini.github.io/algoritmi-euristici/metaheuristics/metodi-basati-su-popolazioni-algoritmi-genetici-e-memetici/#box-12-ex-gaKP)).

### Euristiche MIP { #sez-sec-cat-kp-mipheuristics }

- Arrotondare per difetto la soluzione del rilassamento lineare dà sempre una soluzione ammissibile, perché il modello ha un solo vincolo di packing ([<em>Algoritmi euristici</em>](https://fabiofurini.github.io/algoritmi-euristici/mip-heuristics-classical/#box-3-ex-rounding)).

- Sull'istanza del [<em>Algoritmi euristici</em>](https://fabiofurini.github.io/algoritmi-euristici/heuristics/) il diving frazionario si ferma a $16$ e RINS fallisce, mentre local branching e proximity search raggiungono l'ottimo $17$ e ne dimostrano l'ottimalità ([<em>Algoritmi euristici</em>](https://fabiofurini.github.io/algoritmi-euristici/mip-heuristics-classical/#box-4-ex-divekp)).

### Approssimazione { #sez-sec-cat-kp-approximation }

- L'algoritmo greedy non ha una garanzia costante; Ext-Greedy è un algoritmo $2$-approssimato, e il bound è tight ([<em>Algoritmi di approssimazione</em>](https://fabiofurini.github.io/algoritmi-di-approssimazione/knapsack-approximation/#box-16-prop-GRe2approx)).

- $H^{\ell}$ garantisce $\frac{\ell+2}{\ell+1}$ in tempo $O(n^{\ell+1})$, e quindi dà un PTAS ([<em>Algoritmi di approssimazione</em>](https://fabiofurini.github.io/algoritmi-di-approssimazione/knapsack-approximation/#box-20-prop-Hlapprox)).

- Il Basic-FPTAS scala i profitti e garantisce $\frac{1}{1-\varepsilon}$ in tempo $O(n^2/\varepsilon)$ ([<em>Algoritmi di approssimazione</em>](https://fabiofurini.github.io/algoritmi-di-approssimazione/knapsack-approximation/#box-23-prop-fptas)).

- Nessun algoritmo polinomiale ha una garanzia assoluta fissata, a meno che non risolva il KP in modo esatto ([<em>Algoritmi di approssimazione</em>](https://fabiofurini.github.io/algoritmi-di-approssimazione/knapsack-approximation/#box-25-thm-absolute)).

### Algoritmi ad hoc { #sez-sec-cat-kp-adhocalgorithms }

- Il rilassamento lineare di un nodo si risolve con le formule di Dantzig, senza il simplesso, e ha una sola variabile frazionaria: l'oggetto critico, su cui si fa branching ([Cap. 16](../algoritmi-specializzati/knapsack-branch-and-bound.md#161-lalgoritmo-per-il-kp)).
