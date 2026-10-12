---
title: "Problema dello zaino a scelta multipla (MCKP)"
---

# Problema dello zaino a scelta multipla (MCKP)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi di zaino](knapsack-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-multiple-choice-knapsack-problem"></a>

<a id="box-1-def-catdef-mckp"></a>

!!! definizione "Definizione 1: Problema dello zaino a scelta multipla"

    Dati:

    1. uno zaino di <em>capacità</em> $c \in \Z_{\ge 1}$,

    2. un insieme $\mathscr{I} = \{1,2,\dots,n\}$ di $n$ oggetti,

    3. una partizione dell'insieme degli oggetti in $q \in \Z_{\ge 2}$ classi,

    4. per ogni classe $h \in \{1,2,\dots,q\}$, il sottoinsieme $\mathscr{J}_h \subseteq \mathscr{I}$ degli oggetti di quella classe,

    5. per ogni oggetto $j \in \mathscr{I}$, un <em>profitto</em> $p_j \in \Z_{\ge 1}$ e un <em>peso</em> $w_j \in \Z_{\ge 1}$,

    il <strong>problema dello zaino a scelta multipla</strong> (MCKP) chiede di decidere quali oggetti inserire nello zaino, in modo che da ogni classe sia selezionato esattamente un oggetto, che il peso totale degli oggetti selezionati non superi la capacità dello zaino e che il profitto totale degli oggetti selezionati sia massimo.

<strong>Ipotesi</strong>

- Facciamo le seguenti ipotesi:

    1. Ogni classe contiene almeno un oggetto (altrimenti selezionare esattamente un oggetto da ogni classe è impossibile). Formalmente:

        $$
        \mathscr{J}_h \neq \emptyset \qquad \forall\, h\in\{1,\dots,q\}.
        $$

    2. L'istanza è ammissibile, ossia esiste almeno una scelta di esattamente un oggetto per classe che entra nello zaino. Una condizione necessaria e sufficiente (e facile da verificare) è:

        $$
        \sum_{h=1}^{q}\ \min_{j\in \mathscr{J}_h} w_j \;\le\; c.
        $$

## Che cosa fa il corso su questo problema { #sez-sec-cat-mckp-vert }

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Tecnica</strong></th>
<th><strong>Dove</strong></th>
</tr>
<tr>
<td><strong>Definizione</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-a-scelta-multipla/#box-14-defMCKP">Cap. 2 «Problemi di zaino»</a></td>
</tr>
<tr>
<td><strong>Formulazioni</strong></td>
<td><a href="../../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-a-scelta-multipla/#sez-sec-kpf-MCKP">Cap. 9 «Formulazioni dei problemi di zaino»</a></td>
</tr>
<tr>
<td><strong>Programmazione dinamica</strong></td>
<td><a href="../../programmazione-dinamica/dp-principles/#164-gli-algoritmi-di-pd-di-questo-modulo">Cap. 16 «Principi della programmazione dinamica»</a>; <a href="../../programmazione-dinamica/dp-multiple-choice-knapsack/">Cap. 21 «PD per il problema dello zaino a scelta multipla»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/knapsack/#esercizio-2-5">Esercizio 2.5</a>; <a href="../../esercizi/knapsack-formulations/#esercizio-9-11">Esercizio 9.11</a>; <a href="../../esercizi/dp-principles/#esercizio-16-5">Esercizio 16.5</a>; <a href="../../esercizi/dp-multiple-choice-knapsack/">Cap. 21 (5 esercizi)</a></td>
</tr>
<tr>
<td><strong>Istanze di riferimento</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-a-scelta-multipla/#box-15-ex-mckp">Cap. 2</a> (<span class="arithmatex">\(z=17\)</span>)</td>
</tr>
</table></div>
