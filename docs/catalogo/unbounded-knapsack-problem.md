---
title: "Problema dello zaino illimitato (UKP)"
---

# Problema dello zaino illimitato (UKP)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi di zaino](knapsack-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-unbounded-knapsack-problem"></a>

<a id="box-1-def-catdef-ukp"></a>

!!! definizione "Definizione 1: Problema dello zaino illimitato"

    Dati:

    1. uno zaino di <em>capacità</em> $c \in \Z_{\ge 1}$,

    2. un insieme $\mathscr{I} = \{1,2,\dots,n\}$ di $n$ oggetti,

    3. per ogni oggetto $j \in \mathscr{I}$, disponibile in un numero illimitato di copie, un <em>profitto</em> $p_j \in \Z_{\ge 1}$ e un <em>peso</em> $w_j \in \Z_{\ge 1}$,

    il <strong>problema dello zaino illimitato</strong> (UKP) chiede di decidere quante copie di ogni oggetto inserire nello zaino, in modo che il peso totale di tutte le copie selezionate non superi la capacità dello zaino e il profitto totale di tutte le copie selezionate sia massimo.

<strong>Ipotesi</strong>

- Facciamo le seguenti ipotesi:

    1. Il peso totale di tutte le copie possibili di tutti gli oggetti (fino al numero massimo che entra nello zaino) supera la capacità dello zaino (altrimenti si potrebbero selezionare tutte le copie). Formalmente:

        $$
        \sum_{j \in \mathscr{I}} \hat b_j \, w_j > c
        $$

    2. Ogni oggetto, da solo, entra nello zaino (altrimenti non può essere selezionato). Formalmente:

        $$
        w_j \le c, \qquad \forall j \in \mathscr{I}
        $$

## Che cosa fa il corso su questo problema { #sez-sec-cat-ukp-vert }

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Tecnica</strong></th>
<th><strong>Dove</strong></th>
</tr>
<tr>
<td><strong>Definizione</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-illimitato/#box-8-defUKP">Cap. 2 «Problemi di zaino»</a></td>
</tr>
<tr>
<td><strong>Formulazioni</strong></td>
<td><a href="../../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-illimitato/#sez-sec-kpf-UKP">Cap. 9 «Formulazioni dei problemi di zaino»</a></td>
</tr>
<tr>
<td><strong>Programmazione dinamica</strong></td>
<td><a href="../../programmazione-dinamica/dp-principles/#164-gli-algoritmi-di-pd-di-questo-modulo">Cap. 16 «Principi della programmazione dinamica»</a>; <a href="../../programmazione-dinamica/dp-unbounded-knapsack/">Cap. 18 «PD per il problema dello zaino illimitato»</a>; <a href="../../programmazione-dinamica/dp-coin-change/">Cap. 27 «PD per il problema del cambio monete»</a>; <a href="../../programmazione-dinamica/dp-rod-cutting/">Cap. 28 «PD per il problema del taglio delle aste»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/knapsack/#esercizio-2-3">Esercizio 2.3</a>; <a href="../../esercizi/knapsack-formulations/#esercizio-9-8">Esercizio 9.8</a>; <a href="../../esercizi/dp-unbounded-knapsack/">Cap. 18 (5 esercizi)</a></td>
</tr>
</table></div>
