---
title: "Problema dello zaino limitato (BKP)"
---

# Problema dello zaino limitato (BKP)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi di zaino](knapsack-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-bounded-knapsack-problem"></a>

<a id="box-1-def-catdef-bkp"></a>

!!! definizione "Definizione 1: Problema dello zaino limitato"

    Dati:

    1. uno zaino di <em>capacità</em> $c \in \Z_{\ge 1}$,

    2. un insieme $\mathscr{I} = \{1,2,\dots,n\}$ di $n$ oggetti,

    3. per ogni oggetto $j \in \mathscr{I}$, un <em>profitto</em> $p_j \in \Z_{\ge 1}$, un <em>peso</em> $w_j \in \Z_{\ge 1}$ e un <em>numero di copie disponibili</em> $b_j \in \Z_{\ge 1}$,

    il <strong>problema dello zaino limitato</strong> (BKP) chiede di decidere quante copie di ogni oggetto inserire nello zaino, in modo che il peso totale di tutte le copie selezionate non superi la capacità dello zaino, che nessun oggetto sia preso più volte delle sue copie disponibili e che il profitto totale di tutte le copie selezionate sia massimo.

<strong>Ipotesi</strong>

- Facciamo le seguenti ipotesi:

    1. Il peso totale di tutte le copie disponibili di tutti gli oggetti supera la capacità dello zaino (altrimenti si potrebbero selezionare tutte le copie). Formalmente:

        $$
        \sum_{j \in \mathscr{I}} b_j \, w_j > c
        $$

    2. Ogni oggetto, da solo, entra nello zaino (altrimenti non può essere selezionato). Formalmente:

        $$
        w_j \le c, \qquad \forall j \in \mathscr{I}
        $$

    3. Il peso totale di tutte le copie disponibili di un singolo oggetto non supera la capacità dello zaino (altrimenti quell'oggetto non potrebbe mai essere preso nel numero massimo di copie consentito). Formalmente:

        $$
        b_j \, w_j \le c, \qquad \forall j \in \mathscr{I}
        $$

## Che cosa fa il corso su questo problema { #sez-sec-cat-bkp-vert }

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Tecnica</strong></th>
<th><strong>Dove</strong></th>
</tr>
<tr>
<td><strong>Definizione</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-limitato/#box-6-defBKP">Cap. 2 «Problemi di zaino»</a></td>
</tr>
<tr>
<td><strong>Formulazioni</strong></td>
<td><a href="../../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-limitato/#sez-sec-kpf-BKP">Cap. 9 «Formulazioni dei problemi di zaino»</a></td>
</tr>
<tr>
<td><strong>Programmazione dinamica</strong></td>
<td><a href="../../programmazione-dinamica/dp-principles/#164-gli-algoritmi-di-pd-di-questo-modulo">Cap. 16 «Principi della programmazione dinamica»</a>; <a href="../../programmazione-dinamica/dp-bounded-knapsack/">Cap. 19 «PD per il problema dello zaino limitato»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/knapsack/#esercizio-2-3">Esercizio 2.3</a>; <a href="../../esercizi/knapsack-formulations/#esercizio-9-7">Esercizio 9.7</a>; <a href="../../esercizi/dp-bounded-knapsack/">Cap. 19 (5 esercizi)</a></td>
</tr>
</table></div>
