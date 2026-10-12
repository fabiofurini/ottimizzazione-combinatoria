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
<td><a href="../../programmazione-dinamica/dp-principles/#164-gli-algoritmi-di-pd-di-questo-modulo">Cap. 16 «Principi della programmazione dinamica»</a>; <a href="../../programmazione-dinamica/dp-knapsack/">Cap. 17 «PD per il problema dello zaino 0/1»</a></td>
</tr>
<tr>
<td><strong>Euristiche</strong></td>
<td><a href="../../algoritmi-euristici/heuristics/#box-2-ex-refKP">Cap. 29 «Algoritmi euristici: definizioni»</a>; <a href="../../algoritmi-euristici/constructive-heuristics/il-problema-dello-zaino-0-1-quale-ordinamento/#sez-sec-KP">Cap. 30 «Euristiche costruttive»</a>; <a href="../../algoritmi-euristici/local-search/kp-ammissibilita-e-penalita/#sez-sec-kp">Cap. 31 «Ricerca locale»</a>; <a href="../../algoritmi-euristici/metaheuristics/come-uscire-da-un-ottimo-locale/#sez-sec-sa-kp">Cap. 32 «Metaeuristiche»</a></td>
</tr>
<tr>
<td><strong>Euristiche MIP</strong></td>
<td><a href="../../algoritmi-euristici/mip-heuristics-classical/#eq-eq-kp">Cap. 33 «Euristiche MIP per i problemi classici»</a></td>
</tr>
<tr>
<td><strong>Approssimazione</strong></td>
<td><a href="../../algoritmi-di-approssimazione/approximation/">Cap. 34 «Principi degli algoritmi di approssimazione»</a>; <a href="../../algoritmi-di-approssimazione/knapsack-approximation/">Cap. 35 «Algoritmi di approssimazione per lo zaino»</a></td>
</tr>
<tr>
<td><strong>Algoritmi ad hoc</strong></td>
<td><a href="../../algoritmi-specializzati/knapsack-branch-and-bound/">Cap. 41 «Zaino: branch-and-bound sull'elemento critico»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/knapsack/">Cap. 2 (6 esercizi)</a>; <a href="../../esercizi/knapsack-formulations/">Cap. 9 (5 esercizi)</a>; <a href="../../esercizi/dp-principles/#esercizio-16-1">Esercizio 16.1</a>; <a href="../../esercizi/dp-knapsack/">Cap. 17 (5 esercizi)</a>; <a href="../../esercizi/heuristics/">Cap. 29 (2 esercizi)</a>; <a href="../../esercizi/constructive-heuristics/">Cap. 30 (3 esercizi)</a>; <a href="../../esercizi/local-search/">Cap. 31 (3 esercizi)</a>; <a href="../../esercizi/metaheuristics/">Cap. 32 (5 esercizi)</a>; <a href="../../esercizi/mip-heuristics-classical/">Cap. 33 (4 esercizi)</a>; <a href="../../esercizi/approximation/#esercizio-34-4">Esercizio 34.4</a>; <a href="../../esercizi/knapsack-approximation/">Cap. 35 (15 esercizi)</a>; <a href="../../esercizi/knapsack-branch-and-bound/">Cap. 41 (4 esercizi)</a></td>
</tr>
<tr>
<td><strong>Istanze di riferimento</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-0-1/#box-2-ex-kp">Cap. 2</a> (<span class="arithmatex">\(z=15\)</span>); <a href="../../algoritmi-euristici/heuristics/#box-2-ex-refKP">Cap. 29</a> (<span class="arithmatex">\(z=17\)</span>); <a href="../../algoritmi-euristici/metaheuristics/i-problemi-e-le-ipotesi/#box-2-ex-tsp20">Cap. 32, KP20</a> (<span class="arithmatex">\(z=521\)</span>); <a href="../../algoritmi-di-approssimazione/knapsack-approximation/#box-2-ex-split">Cap. 35</a> (<span class="arithmatex">\(z=15\)</span>)</td>
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

- La ricorrenza $v(j,k)$ su oggetti e capacità richiede $\Theta(nc)$ passi ([Cap. 17](../programmazione-dinamica/dp-knapsack/index.md)).

- Le liste degli stati non dominati tengono solo gli stati raggiungibili, al più $\min\{2^j, c+1\}$ per stadio ([Cap. 17](../programmazione-dinamica/dp-knapsack/un-primo-algoritmo-di-pd-un-implementazione-con-liste.md#box-28-texkp3graph)).

- La PD sui profitti richiede $\Theta(nP)$ passi; è il nucleo dell'FPTAS ([Cap. 17](../programmazione-dinamica/dp-knapsack/un-secondo-algoritmo-di-pd.md#173-un-secondo-algoritmo-di-pd)).

- L'UKP e il BKP hanno le loro ricorrenze ([Cap. 18](../programmazione-dinamica/dp-unbounded-knapsack/index.md), [Cap. 19](../programmazione-dinamica/dp-bounded-knapsack.md)).

- Così anche l'SSP, l'MCKP e il KPS, in $\Theta(nc)$ passi; per l'MDKP e l'MKP la tabella cresce esponenzialmente con il numero di capacità ([Cap. 20](../programmazione-dinamica/dp-subset-sum.md), [Cap. 21](../programmazione-dinamica/dp-multiple-choice-knapsack.md), [Cap. 22](../programmazione-dinamica/dp-multidimensional-knapsack.md), [Cap. 23](../programmazione-dinamica/dp-knapsack-setups.md), [Cap. 24](../programmazione-dinamica/dp-multiple-knapsack.md)).

### Euristiche { #sez-sec-cat-kp-heuristics }

- Greedy per profitto, per peso e per efficienza: sull'istanza a quattro oggetti del [Cap. 29](../algoritmi-euristici/heuristics.md) (ottimo $17$) danno $17$, $10$ e $16$ ([Cap. 30](../algoritmi-euristici/constructive-heuristics/il-problema-dello-zaino-0-1-quale-ordinamento.md#box-3-ex-kp3)).

- Ricerca locale con flip e swap: first improvement e best improvement raggiungono $17$ per strade diverse ([Cap. 31](../algoritmi-euristici/local-search/first-improvement-e-best-improvement.md#box-3-ex-kpfirstbest)).

- Una penalità sul peso in eccesso permette alla ricerca di attraversare soluzioni non ammissibili; con $\alpha>\max_j p_j$ i suoi ottimi locali sono ammissibili ([Cap. 31](../algoritmi-euristici/local-search/kp-ammissibilita-e-penalita.md#box-14-ex-kppen)).

- Simulated annealing, GRASP, algoritmi genetici e memetici; su KP20 l'algoritmo memetico raggiunge l'ottimo $521$ in ogni esecuzione ([Cap. 32](../algoritmi-euristici/metaheuristics/metodi-basati-su-popolazioni-algoritmi-genetici-e-memetici.md#box-12-ex-gaKP)).

### Euristiche MIP { #sez-sec-cat-kp-mipheuristics }

- Arrotondare per difetto la soluzione del rilassamento lineare dà sempre una soluzione ammissibile, perché il modello ha un solo vincolo di packing ([Cap. 33](../algoritmi-euristici/mip-heuristics-classical.md#box-3-ex-rounding)).

- Sull'istanza del [Cap. 29](../algoritmi-euristici/heuristics.md) il diving frazionario si ferma a $16$ e RINS fallisce, mentre local branching e proximity search raggiungono l'ottimo $17$ e ne dimostrano l'ottimalità ([Cap. 33](../algoritmi-euristici/mip-heuristics-classical.md#box-4-ex-divekp)).

### Approssimazione { #sez-sec-cat-kp-approximation }

- L'algoritmo greedy non ha una garanzia costante; Ext-Greedy è un algoritmo $2$-approssimato, e il bound è tight ([Cap. 35](../algoritmi-di-approssimazione/knapsack-approximation.md#box-16-prop-GRe2approx)).

- $H^{\ell}$ garantisce $\frac{\ell+2}{\ell+1}$ in tempo $O(n^{\ell+1})$, e quindi dà un PTAS ([Cap. 35](../algoritmi-di-approssimazione/knapsack-approximation.md#box-20-prop-Hlapprox)).

- Il Basic-FPTAS scala i profitti e garantisce $\frac{1}{1-\varepsilon}$ in tempo $O(n^2/\varepsilon)$ ([Cap. 35](../algoritmi-di-approssimazione/knapsack-approximation.md#box-23-prop-fptas)).

- Nessun algoritmo polinomiale ha una garanzia assoluta fissata, a meno che non risolva il KP in modo esatto ([Cap. 35](../algoritmi-di-approssimazione/knapsack-approximation.md#box-25-thm-absolute)).

### Algoritmi ad hoc { #sez-sec-cat-kp-adhocalgorithms }

- Il rilassamento lineare di un nodo si risolve con le formule di Dantzig, senza il simplesso, e ha una sola variabile frazionaria: l'oggetto critico, su cui si fa branching ([Cap. 41](../algoritmi-specializzati/knapsack-branch-and-bound.md#411-lalgoritmo-per-il-kp)).

- Sull'istanza del [Cap. 2](../problemi-di-ottimizzazione-combinatoria/knapsack/index.md) chiude il gap fra $\LB=15$ e $\UB=16$ con $5$ nodi ([Cap. 41](../algoritmi-specializzati/knapsack-branch-and-bound.md#box-3-texexpbox2)).
