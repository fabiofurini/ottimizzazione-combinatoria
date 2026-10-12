---
title: "Problema dello zaino multidimensionale (MDKP)"
---

# Problema dello zaino multidimensionale (MDKP)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi di zaino](knapsack-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-multidimensional-knapsack-problem"></a>

<a id="box-1-def-catdef-mdkp"></a>

!!! definizione "Definizione 1: Problema dello zaino multidimensionale"

    Dati:

    1. uno zaino $k$-dimensionale,

    2. per ogni dimensione $d \in \underbrace{\{1,2,\dots,k\}}_{=\mathscr{D}}$, una <em>capacità</em> $c_d \in \Z_{\ge 1}$,

    3. un insieme $\mathscr{I} = \{1,2,\dots,n\}$ di $n$ oggetti,

    4. per ogni oggetto $j \in \mathscr{I}$, un <em>profitto</em> $p_j \in \Z_{\ge 1}$,

    5. per ogni dimensione $d \in \mathscr{D}$ e ogni oggetto $j \in \mathscr{I}$, un <em>peso</em> $w_{dj} \in \Z_{\ge 1}$,

    il <strong>problema dello zaino multidimensionale</strong> (MDKP) chiede di decidere quali oggetti inserire nello zaino, in modo che per ogni dimensione il peso totale degli oggetti selezionati non superi la capacità corrispondente e il profitto totale degli oggetti selezionati sia massimo.

<strong>Ipotesi</strong>

- Facciamo le seguenti ipotesi:

    1. L'insieme di tutti gli oggetti <em>non</em> entra nello zaino (altrimenti selezionare tutti gli oggetti è ammissibile e ottimo). Formalmente,

        $$
        \exists\, d\in \mathscr{D} \ \text{tale che}\ \sum_{j\in \mathscr{I}} w_{dj} \;>\; c_d .
        $$

    2. Ogni oggetto, da solo, entra nello zaino in ogni dimensione (altrimenti non può mai essere selezionato). Formalmente,

        $$
        w_{dj} \le c_d, \qquad \forall\, d\in \mathscr{D},\ \forall\, j\in \mathscr{I}.
        $$

## Che cosa fa il corso su questo problema { #sez-sec-cat-mdkp-vert }

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Tecnica</strong></th>
<th><strong>Dove</strong></th>
</tr>
<tr>
<td><strong>Definizione</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-multidimensionale/#box-10-defMDKP">Cap. 2 «Problemi di zaino»</a></td>
</tr>
<tr>
<td><strong>Formulazioni</strong></td>
<td><a href="../../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-multidimensionale/#sez-sec-kpf-MDKP">Cap. 9 «Formulazioni dei problemi di zaino»</a></td>
</tr>
<tr>
<td><strong>Programmazione dinamica</strong></td>
<td><a href="../../programmazione-dinamica/dp-principles/#164-gli-algoritmi-di-pd-di-questo-modulo">Cap. 16 «Principi della programmazione dinamica»</a>; <a href="../../programmazione-dinamica/dp-multidimensional-knapsack/">Cap. 22 «PD per il problema dello zaino multidimensionale»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/knapsack-formulations/#esercizio-9-9">Esercizio 9.9</a>; <a href="../../esercizi/dp-multidimensional-knapsack/">Cap. 22 (5 esercizi)</a></td>
</tr>
<tr>
<td><strong>Istanze di riferimento</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-multidimensionale/#box-11-ex-mdkp">Cap. 2</a> (<span class="arithmatex">\(z=14\)</span>)</td>
</tr>
</table></div>
