---
title: "Lot sizing capacitato (CLS)"
---

# Lot sizing capacitato (CLS)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi di lot sizing](lot-sizing-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-capacitated-lot-sizing"></a>

<a id="box-1-def-catdef-cls"></a>

!!! definizione "Definizione 1: Lot sizing capacitato"

    Dati:

    1. un insieme $T = \{1,2,\dots,m\}$ di $m$ <em>periodi di tempo</em>,

    2. per ogni periodo $t \in T$, una <em>domanda</em> $d_t \in \Z_{\ge 1}$ e una <em>capacità</em> $cap_t \in \Z_{\ge 1}$, entrambe misurate in unità di un prodotto,

    3. per ogni periodo $t \in T$, tre costi interi non negativi: il <em>costo di setup</em> $sc_t$, il <em>costo variabile di produzione</em> $vc_t$ per unità prodotta e il <em>costo di mantenimento a scorta</em> $hc_t$ per unità tenuta in scorta alla fine del periodo,

    il <strong>problema del lot sizing capacitato</strong> (CLS) chiede di decidere quanto produrre in ogni periodo, in modo che ogni domanda sia soddisfatta con ciò che si produce e ciò che è in scorta, le capacità siano rispettate, e il costo totale di setup, produzione e mantenimento a scorta sia minimo.

<strong>Ipotesi</strong>

- Facciamo le seguenti ipotesi:

    1. La scorta è vuota all'inizio e alla fine dell'orizzonte. Lasciare scorta alla fine aggiunge solo costo, quindi nessun piano ottimo ne ha bisogno; una scorta iniziale è una variante del problema (Sezione.

    2. Le capacità permettono di soddisfare le domande, periodo dopo periodo (altrimenti non esiste alcun piano ammissibile). Formalmente:

        $$
        \sum_{u=1}^{t} cap_u \ge \sum_{u=1}^{t} d_u, ~~~~ \forall t \in T
        $$

    3. Le quantità sono intere. Con dati interi, una volta fissati i periodi con un setup, ciò che resta è un problema di flusso di costo minimo, che ha una soluzione ottima intera: restringere le quantità agli interi non cambia il costo ottimo.

## Che cosa fa il corso su questo problema { #sez-sec-cat-cls-vert }

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Tecnica</strong></th>
<th><strong>Dove</strong></th>
</tr>
<tr>
<td><strong>Definizione</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/lot-sizing/il-problema-del-lot-sizing-capacitato/#box-1-defCLS">Cap. 8 «Problemi di lot sizing»</a></td>
</tr>
<tr>
<td><strong>Formulazioni</strong></td>
<td><a href="../../formulazioni/lot-sizing-formulations/">Cap. 15 «Formulazioni dei problemi di lot sizing»</a></td>
</tr>
<tr>
<td><strong>Programmazione dinamica</strong></td>
<td><a href="../../programmazione-dinamica/dp-principles/#164-gli-algoritmi-di-pd-di-questo-modulo">Cap. 16 «Principi della programmazione dinamica»</a>; <a href="../../programmazione-dinamica/dp-capacitated-lot-sizing/">Cap. 26 «PD per il problema del lot sizing capacitato»</a></td>
</tr>
<tr>
<td><strong>Euristiche MIP</strong></td>
<td><a href="../../algoritmi-euristici/mip-heuristics-classical/#sez-sec-rf">Cap. 33 «Euristiche MIP per i problemi classici»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/lot-sizing/">Cap. 8 (5 esercizi)</a>; <a href="../../esercizi/lot-sizing-formulations/">Cap. 15 (5 esercizi)</a>; <a href="../../esercizi/dp-capacitated-lot-sizing/">Cap. 26 (2 esercizi)</a></td>
</tr>
<tr>
<td><strong>Istanze di riferimento</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/lot-sizing/il-problema-del-lot-sizing-capacitato/#box-2-ex-cls5">Cap. 8</a> (<span class="arithmatex">\(z=180\)</span>)</td>
</tr>
</table></div>

### Proprietà { #sez-sec-cat-cls-properties }

- NP-difficile con capacità generali; senza capacità (ULS) è polinomiale ([Cap. 1](../problemi-di-ottimizzazione-combinatoria/combinatorial-optimization/cenni-di-complessita-computazionale.md#box-12-def-pseudo)).

- Lower bound: la somma dei $k$ costi di setup più piccoli, con $k$ il minimo numero di periodi le cui capacità coprono la domanda totale ([Cap. 8](../problemi-di-ottimizzazione-combinatoria/lot-sizing/il-problema-del-lot-sizing-capacitato.md#box-5-obs-cls-lb)).

- Lot-for-lot e accorpamenti a mano: $250\to210\to180$ sull'istanza del Cap. 8, dove $180$ è ottimo ([Cap. 8](../problemi-di-ottimizzazione-combinatoria/lot-sizing/il-problema-del-lot-sizing-capacitato.md#box-4-ex-cls-hand)).

### Formulazioni { #sez-sec-cat-cls-formulations }

- Formulazione big-M: il valore forte $M_t=\min\{cap_t,D_{t,m}\}$ alza il bound del rilassamento lineare sull'istanza del [Cap. 8](../problemi-di-ottimizzazione-combinatoria/lot-sizing/index.md) da $99.65$ a $157.5$ ([Cap. 15](../formulazioni/lot-sizing-formulations/modelli-pli-per-il-problema-di-lot-sizing-capacitato.md#box-3-ex-CLS-bigM)).

- La formulazione a cammino minimo dà il bound $170$, il più forte del capitolo ([Cap. 15](../formulazioni/lot-sizing-formulations/modelli-pli-per-il-problema-di-lot-sizing-capacitato.md#sez-sec-lsf-compare)).

### Programmazione dinamica { #sez-sec-cat-cls-dynamicprogramming }

- Senza capacità un piano ottimo produce solo con scorta vuota (Wagner e Whitin): una PD sull'ultimo lotto di produzione risolve l'ULS in $\Theta(m^2)$ passi ([Cap. 25](../programmazione-dinamica/dp-lot-sizing/un-algoritmo-di-pd-per-l-uls.md#252-un-algoritmo-di-pd-per-luls)).

- Con capacità lo stato è (periodo, scorta): $O(m\,D\,C)$ passi, un tempo pseudo-polinomiale ([Cap. 26](../programmazione-dinamica/dp-capacitated-lot-sizing.md#2622-numero-di-passi)).

### Euristiche MIP { #sez-sec-cat-cls-mipheuristics }

- Sull'istanza senza capacità del corso di modellazione MIP relax-and-fix trova l'ottimo $170$, mentre l'euristica del minimo costo unitario dà $200$ ([Cap. 33](../algoritmi-euristici/mip-heuristics-classical.md#box-16-ex-rfcourse)).

- Su un'istanza capacitata relax-and-fix si ferma a $170$, e fix-and-optimize raggiunge l'ottimo $160$ ([Cap. 33](../algoritmi-euristici/mip-heuristics-classical.md#box-18-ex-fo)).
