---
title: "Problema del subset sum (SSP)"
---

# Problema del subset sum (SSP)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi di zaino](knapsack-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-subset-sum-problem"></a>

<a id="box-1-def-catdef-ssp"></a>

!!! definizione "Definizione 1: Problema del subset sum"

    Dati:

    1. un valore obiettivo $c \in \Z_{\ge 1}$,

    2. un insieme $\mathscr{I} = \{1,2,\dots,n\}$ di $n$ oggetti,

    3. per ogni oggetto $j \in \mathscr{I}$, un <em>peso</em> $w_j \in \Z_{\ge 1}$,

    il <strong>problema del subset sum</strong> (SSP) chiede se esiste un sottoinsieme di oggetti il cui peso totale è esattamente uguale al valore obiettivo $c$.

<strong>Ipotesi</strong>

- Facciamo le seguenti ipotesi:

    1. Il peso totale di tutti gli oggetti è almeno pari al valore obiettivo (altrimenti non può esistere alcun sottoinsieme ammissibile). Formalmente:

        $$
        \sum_{j \in \mathscr{I}} w_j \ge c
        $$

    2. Il peso di ogni oggetto non supera il valore obiettivo (altrimenti l'oggetto non può appartenere ad alcun sottoinsieme ammissibile). Formalmente:

        $$
        w_j \le c,~~~~ \forall j \in \mathscr{I}
        $$

## Che cosa fa il corso su questo problema { #sez-sec-cat-ssp-vert }

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Tecnica</strong></th>
<th><strong>Dove</strong></th>
</tr>
<tr>
<td><strong>Definizione</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-del-subset-sum/#box-4-defSSP">Cap. 2 «Problemi di zaino»</a></td>
</tr>
<tr>
<td><strong>Formulazioni</strong></td>
<td><a href="../../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-del-subset-sum/#sez-sec-kpf-SSP">Cap. 9 «Formulazioni dei problemi di zaino»</a></td>
</tr>
<tr>
<td><strong>Programmazione dinamica</strong></td>
<td><a href="../../programmazione-dinamica/dp-principles/#164-gli-algoritmi-di-pd-di-questo-modulo">Cap. 16 «Principi della programmazione dinamica»</a>; <a href="../../programmazione-dinamica/dp-subset-sum/">Cap. 20 «PD per il problema del subset sum»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/knapsack/#esercizio-2-2">Esercizio 2.2</a>; <a href="../../esercizi/knapsack-formulations/#esercizio-9-6">Esercizio 9.6</a>; <a href="../../esercizi/dp-principles/#esercizio-16-2">Esercizio 16.2</a>; <a href="../../esercizi/dp-subset-sum/">Cap. 20 (5 esercizi)</a></td>
</tr>
</table></div>
