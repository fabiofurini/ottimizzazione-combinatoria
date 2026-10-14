---
title: "Problema del bin packing (BPP)"
---

# Problema del bin packing (BPP)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi di packing](packing-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-bin-packing-problem"></a>

<a id="box-1-def-catdef-bpp"></a>

!!! definizione "Definizione 1: Problema del bin packing"

    Dati:

    1. un numero infinito di contenitori, ciascuno di <em>capacità</em> $c \in \Z_{\ge 1}$,

    2. un insieme $\mathscr{I} = \{1,2,\dots,n\}$ di $n$ oggetti,

    3. per ogni oggetto $j \in \mathscr{I}$, un <em>peso</em> $w_j \in \Z_{\ge 1}$,

    il <strong>problema del bin packing</strong> (BPP) chiede di decidere in quale contenitore sistemare ogni oggetto, in modo che il peso totale degli oggetti in ogni contenitore non superi la capacità del contenitore e il numero totale di contenitori usati sia minimo.

<strong>Ipotesi</strong>

- Facciamo le seguenti ipotesi:

    1. Il peso totale di tutti gli oggetti supera la capacità di un contenitore (altrimenti tutti gli oggetti entrerebbero in un solo contenitore). Formalmente:

        $$
        \sum_{j \in \mathscr{I}} w_j > c
        $$

    2. Ogni oggetto, da solo, entra in un contenitore (altrimenti non può essere impaccato). Formalmente:

        $$
        w_j \le c,~~~~ \forall j \in \mathscr{I}
        $$

## Che cosa fa il corso su questo problema { #sez-sec-cat-bpp-vert }

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Tecnica</strong></th>
<th><strong>Dove</strong></th>
</tr>
<tr>
<td><strong>Definizione</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/bin-packing/il-problema-del-bin-packing/#box-1-defBPP">Cap. 3 «Problemi di packing»</a></td>
</tr>
<tr>
<td><strong>Formulazioni</strong></td>
<td><a href="../../formulazioni/bin-packing-formulations/">Cap. 10 «Formulazioni dei problemi di packing»</a></td>
</tr>
<tr>
<td><strong>Euristiche</strong></td>
<td><a href="../../algoritmi-euristici/heuristics/#box-3-ex-refBPP">Cap. 29 «Algoritmi euristici: definizioni»</a>; <a href="../../algoritmi-euristici/constructive-heuristics/il-problema-del-bin-packing-prima-ordinare-poi-riempire/#sez-sec-BPP">Cap. 30 «Euristiche costruttive»</a>; <a href="../../algoritmi-euristici/local-search/ricerca-locale-lo-schema/#3142-bpp-move-e-swap">Cap. 31 «Ricerca locale»</a>; <a href="../../algoritmi-euristici/metaheuristics/large-neighbourhood-search/#sez-sec-lns-bpp">Cap. 32 «Metaeuristiche»</a></td>
</tr>
<tr>
<td><strong>Euristiche MIP</strong></td>
<td><a href="../../algoritmi-euristici/mip-heuristics-classical/#eq-eq-bpp">Cap. 33 «Euristiche MIP per i problemi classici»</a></td>
</tr>
<tr>
<td><strong>Approssimazione</strong></td>
<td><a href="../../algoritmi-di-approssimazione/bin-packing-approximation/">Cap. 36 «Algoritmi di approssimazione per il bin packing»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/bin-packing/">Cap. 3 (6 esercizi)</a>; <a href="../../esercizi/pcmax/#esercizio-7-5">Esercizio 7.5</a>; <a href="../../esercizi/bin-packing-formulations/">Cap. 10 (5 esercizi)</a>; <a href="../../esercizi/heuristics/#esercizio-29-2">Esercizio 29.2</a>; <a href="../../esercizi/constructive-heuristics/">Cap. 30 (3 esercizi)</a>; <a href="../../esercizi/local-search/">Cap. 31 (3 esercizi)</a>; <a href="../../esercizi/metaheuristics/">Cap. 32 (2 esercizi)</a>; <a href="../../esercizi/approximation/#esercizio-34-3">Esercizio 34.3</a>; <a href="../../esercizi/bin-packing-approximation/">Cap. 36 (12 esercizi)</a></td>
</tr>
</table></div>

### Proprietà { #sez-sec-cat-bpp-properties }

- NP-difficile in senso forte: non esiste un algoritmo pseudo-polinomiale, a meno che $P=NP$ ([Cap. 1](../problemi-di-ottimizzazione-combinatoria/combinatorial-optimization/cenni-di-complessita-computazionale.md#box-12-def-pseudo)).

- Bound sui pesi $\LB = \lceil \sum_j w_j / c \rceil$; non è sempre stretto: tre oggetti di peso $6$ con $c=10$ richiedono $3$ contenitori, non $2$ ([Cap. 3](../problemi-di-ottimizzazione-combinatoria/bin-packing/il-problema-del-bin-packing.md#box-3-obs-bpp-l1)).

### Formulazioni { #sez-sec-cat-bpp-formulations }

- Il modello $\ILP_{\BPP}$ ha $mn$ variabili di assegnamento $x_{jb}$ e $m$ variabili di attivazione $y_b$ ([Cap. 10](../formulazioni/bin-packing-formulations/un-modello-pli-per-il-problema-del-bin-packing.md#sez-sec-bpf-BPP)).

- Entrambi i rilassamenti lineari valgono $\sum_j w_j/c$: arrotondato per eccesso, è di nuovo il bound sui pesi ([Cap. 10](../formulazioni/bin-packing-formulations/un-modello-pli-per-il-problema-del-bin-packing.md#box-10-cor_lp_bpp_value)).

- Il rapporto fra il bound del rilassamento lineare e l'ottimo è almeno $\frac12$, e $\frac12$ è raggiunto al limite ([Cap. 10](../formulazioni/bin-packing-formulations/un-modello-pli-per-il-problema-del-bin-packing.md#box-11-prop_lp_bpp_ratio_half)).

### Euristiche { #sez-sec-cat-bpp-heuristics }

- First Fit Decreasing e Best Fit Decreasing trovano l'ottimo $3$ sull'istanza del [Cap. 29](../algoritmi-euristici/heuristics.md); $FFD(I) \le \frac{11}{9}\, z(I) + \frac{6}{9}$, tight ([Cap. 30](../algoritmi-euristici/constructive-heuristics/il-problema-del-bin-packing-prima-ordinare-poi-riempire.md#sez-sec-FFD)).

- Il numero di contenitori è piatto, quindi la ricerca locale con move e swap usa l'obiettivo ausiliario $\max \sum_b L_b^2$ ([Cap. 31](../algoritmi-euristici/local-search/paesaggi-piatti-e-obiettivi-ausiliari.md#sez-sec-flat)).

- La VND con move e swap raggiunge l'ottimo in $89$ esecuzioni su $100$ su un'istanza con $n=12$ ([Cap. 31](../algoritmi-euristici/local-search/variable-neighbourhood-descent.md#sez-sec-vnd)).

- Large neighbourhood search: su BPP24 la riparazione esatta con $q\ge 3$ raggiunge l'ottimo $9$ in ogni esecuzione ([Cap. 32](../algoritmi-euristici/metaheuristics/large-neighbourhood-search.md#box-11-ex-lnsBPP)).

### Euristiche MIP { #sez-sec-cat-bpp-mipheuristics }

- L'arrotondamento e il diving frazionario falliscono sull'istanza del [Cap. 29](../algoritmi-euristici/heuristics.md): il rilassamento lineare distribuisce un oggetto su più contenitori ([Cap. 33](../algoritmi-euristici/mip-heuristics-classical.md#box-3-ex-rounding)).

- La feasibility pump trova sempre una soluzione ammissibile, ma può lasciare aperti contenitori vuoti ([Cap. 33](../algoritmi-euristici/mip-heuristics-classical.md#box-8-ex-fpbpp)).

- Su un'istanza con $n=60$ tutta la difficoltà è primale: le euristiche di Gurobi decidono il tempo di soluzione ([Cap. 33](../algoritmi-euristici/mip-heuristics-classical.md#box-19-ex-gurobi)).

### Approssimazione { #sez-sec-cat-bpp-approximation }

- Ogni algoritmo Any Fit è half-full, quindi è un algoritmo $2$-approssimato ([Cap. 36](../algoritmi-di-approssimazione/bin-packing-approximation.md#364-proprieta-di-riempimento-a-meta)).

- $r(NF) = r(WF) = 2$ e $r(FF) = r(BF) = \frac{17}{10}$ ([Cap. 36](../algoritmi-di-approssimazione/bin-packing-approximation.md#box-20-propFF)).
