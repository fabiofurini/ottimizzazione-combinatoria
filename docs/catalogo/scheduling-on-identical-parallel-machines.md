---
title: "Scheduling su macchine parallele identiche (P||Cmax)"
---

# Scheduling su macchine parallele identiche ($P\|C_{\max}$)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi di scheduling](scheduling-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-scheduling-on-identical-parallel-machines"></a>

<a id="box-1-def-catdef-pcmax"></a>

!!! definizione "Definizione 1: Scheduling su macchine parallele identiche"

    Dati:

    1. un insieme di $m$ <em>macchine</em> identiche,

    2. un insieme $\mathscr{J} = \{1,2,\dots,n\}$ di $n$ <em>lavori</em>,

    3. per ogni lavoro $j \in \mathscr{J}$, un <em>tempo di processamento</em> $t_j \in \Z_{\ge 1}$,

    il problema $P\,||\,C_{\max}$ chiede di assegnare ogni lavoro a una macchina, in modo da minimizzare il tempo necessario per completare tutti i lavori, cioè il massimo tempo di processamento totale assegnato a una macchina.

<strong>Ipotesi</strong>

- Facciamo la seguente ipotesi:

    1. Ci sono più lavori che macchine (altrimenti ogni lavoro ha una macchina tutta per sé, e il makespan ottimo è $\max_j t_j$). Formalmente:

        $$
        n > m
        $$

## Che cosa fa il corso su questo problema { #sez-sec-cat-pcmax-vert }

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Tecnica</strong></th>
<th><strong>Dove</strong></th>
</tr>
<tr>
<td><strong>Definizione</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/pcmax/scheduling-su-macchine-parallele-identiche/#box-1-defPCmax">Cap. 7 «Problemi di scheduling»</a></td>
</tr>
<tr>
<td><strong>Formulazioni</strong></td>
<td><a href="../../formulazioni/pcmax-formulations/">Cap. 14 «Formulazioni dei problemi di scheduling»</a></td>
</tr>
<tr>
<td><strong>Euristiche</strong></td>
<td><a href="https://fabiofurini.github.io/algoritmi-euristici/heuristics/#box-5-ex-refPCM"><em>Algoritmi euristici</em>: «Algoritmi euristici: definizioni»</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/constructive-heuristics/scheduling-su-macchine-parallele-prima-i-lavori-piu-lunghi/#sez-sec-PCM"><em>Algoritmi euristici</em>: «Euristiche costruttive»</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/local-search/p-cmax-move-e-swap/#sez-sec-pcmax"><em>Algoritmi euristici</em>: «Ricerca locale»</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/metaheuristics/tabu-search/#sez-sec-ts"><em>Algoritmi euristici</em>: «Metaeuristiche»</a></td>
</tr>
<tr>
<td><strong>Euristiche MIP</strong></td>
<td><a href="https://fabiofurini.github.io/algoritmi-euristici/mip-heuristics-classical/#eq-eq-pcm"><em>Algoritmi euristici</em>: «Euristiche MIP per i problemi classici»</a></td>
</tr>
<tr>
<td><strong>Approssimazione</strong></td>
<td><a href="https://fabiofurini.github.io/algoritmi-di-approssimazione/approximation/"><em>Algoritmi di approssimazione</em>: «Principi degli algoritmi di approssimazione»</a>; <a href="https://fabiofurini.github.io/algoritmi-di-approssimazione/pcmax-approximation/#sez-sec-LIST"><em>Algoritmi di approssimazione</em>: «Approssimazione per <span class="arithmatex">\(P\|C_{\max}\)</span>»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/pcmax/">Cap. 7 (5 esercizi)</a>; <a href="../../esercizi/pcmax-formulations/">Cap. 14 (5 esercizi)</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/esercizi/heuristics/"><em>Algoritmi euristici</em>: «Algoritmi euristici: definizioni» (2 esercizi)</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/esercizi/constructive-heuristics/"><em>Algoritmi euristici</em>: «Euristiche costruttive» (3 esercizi)</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/esercizi/local-search/"><em>Algoritmi euristici</em>: «Ricerca locale» (3 esercizi)</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/esercizi/metaheuristics/"><em>Algoritmi euristici</em>: «Metaeuristiche» (3 esercizi)</a>; <a href="https://fabiofurini.github.io/algoritmi-euristici/esercizi/mip-heuristics-classical/#esercizio-5-5"><em>Algoritmi euristici</em>, Esercizio 5.5</a>; <a href="https://fabiofurini.github.io/algoritmi-di-approssimazione/esercizi/approximation/#esercizio-1-2"><em>Algoritmi di approssimazione</em>, Esercizio 1.2</a>; <a href="https://fabiofurini.github.io/algoritmi-di-approssimazione/esercizi/pcmax-approximation/"><em>Algoritmi di approssimazione</em>: «Approssimazione per <span class="arithmatex">\(P\|C_{\max}\)</span>» (3 esercizi)</a></td>
</tr>
</table></div>

### Proprietà { #sez-sec-cat-pcmax-properties }

- NP-difficile in senso forte quando $m$ fa parte dell'input; NP-difficile in senso debole per un numero fissato di macchine ([Cap. 1](../problemi-di-ottimizzazione-combinatoria/combinatorial-optimization/cenni-di-complessita-computazionale.md#box-12-def-pseudo)).

- Lower bound $\max\{\max_j t_j, \lceil \sum_j t_j/m \rceil\}$; non è sempre raggiunto: $(4,3,3)$ su due macchine dà $5$, l'ottimo è $6$ ([Cap. 7](../problemi-di-ottimizzazione-combinatoria/pcmax/scheduling-su-macchine-parallele-identiche.md#box-5-obs-pcmaxlb)).

- Esiste un makespan al più $T$ se e solo se i lavori entrano in $m$ contenitori di capacità $T$ ([Cap. 7](../problemi-di-ottimizzazione-combinatoria/pcmax/scheduling-su-macchine-parallele-identiche.md#76-relazione-con-il-problema-del-bin-packing)).

### Formulazioni { #sez-sec-cat-pcmax-formulations }

- Il modello $\ILP_{\PCmax}$ ha $nm$ variabili binarie $x_{jh}$ e la variabile continua $C_{\max}$ ([Cap. 14](../formulazioni/pcmax-formulations/un-modello-pli-per-il-problema-di-scheduling-su-macchine-par.md#eq-ILP-PCMAX)).

- Il bound del rilassamento lineare è $\sum_j t_j/m$; il suo rapporto con l'ottimo è almeno $1/m$, e $1/m$ è raggiunto al limite ([Cap. 14](../formulazioni/pcmax-formulations/un-modello-pli-per-il-problema-di-scheduling-su-macchine-par.md#box-8-prop-PCMAX-tight)).

- Le disuguaglianze valide rafforzano il modello; l'ordinamento dei carichi rompe la simmetria solo quando i carichi sono distinti ([Cap. 14](../formulazioni/pcmax-formulations/un-modello-pli-per-il-problema-di-scheduling-su-macchine-par.md#145-considerazioni-aggiuntive)).

### Euristiche { #sez-sec-cat-pcmax-heuristics }

- Sull'istanza del [Cap. 7](../problemi-di-ottimizzazione-combinatoria/pcmax/index.md) (tre macchine, ottimo $9$) LIST con i lavori più brevi per primi dà $12$ e LPT dà $11$ ([<em>Algoritmi euristici</em>](https://fabiofurini.github.io/algoritmi-euristici/constructive-heuristics/scheduling-su-macchine-parallele-prima-i-lavori-piu-lunghi/#sez-sec-LPT)).

- La soluzione di LPT è un ottimo locale per la mossa move, mentre due swap raggiungono $9$; l'obiettivo ausiliario $\sum_h L_h^2$ dà una pendenza ai plateau ([<em>Algoritmi euristici</em>](https://fabiofurini.github.io/algoritmi-euristici/local-search/p-cmax-move-e-swap/#box-8-ex-lpt)).

- Tabu search e VNS raggiungono $9$ sulla stessa istanza ([<em>Algoritmi euristici</em>](https://fabiofurini.github.io/algoritmi-euristici/metaheuristics/variable-neighbourhood-search/#box-8-ex-vnsPCM)).

### Euristiche MIP { #sez-sec-cat-pcmax-mipheuristics }

- Sull'istanza del [Cap. 7](../problemi-di-ottimizzazione-combinatoria/pcmax/index.md) il diving frazionario si ferma a $10$, il diving guidato da LPT trova $9$, la feasibility pump restituisce $11$ ([<em>Algoritmi euristici</em>](https://fabiofurini.github.io/algoritmi-euristici/mip-heuristics-classical/#box-5-ex-divepcm)).

- RINS, local branching e proximity search, partendo da LPT, raggiungono $9$; proximity search ne dimostra anche l'ottimalità ([<em>Algoritmi euristici</em>](https://fabiofurini.github.io/algoritmi-euristici/mip-heuristics-classical/#box-10-ex-rinspcm)).

### Approssimazione { #sez-sec-cat-pcmax-approximation }

- LIST è un algoritmo $\left(2-\frac1m\right)$-approssimato per ogni lista, tight ([<em>Algoritmi di approssimazione</em>](https://fabiofurini.github.io/algoritmi-di-approssimazione/pcmax-approximation/#box-4-prop-LIST)).

- LPT è un algoritmo $\left(\frac43-\frac1{3m}\right)$-approssimato, tight sulla famiglia di Graham; per $m=3$ è l'istanza del [Cap. 7](../problemi-di-ottimizzazione-combinatoria/pcmax/index.md) ([<em>Algoritmi di approssimazione</em>](https://fabiofurini.github.io/algoritmi-di-approssimazione/pcmax-approximation/#box-6-prop-LPT)).
