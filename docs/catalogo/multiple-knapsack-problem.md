---
title: "Problema degli zaini multipli (MKP)"
---

# Problema degli zaini multipli (MKP)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi di zaino](knapsack-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-multiple-knapsack-problem"></a>

<a id="box-1-def-catdef-mkp"></a>

!!! definizione "Definizione 1: Problema degli zaini multipli"

    Dati:

    1. $m \in \Z_{\ge 1}$ zaini,

    2. per ogni zaino $k \in \underbrace{\{1,2,\dots,m\}}_{=\mathscr{K}}$, una <em>capacità</em> $c_k \in \Z_{\ge 1}$,

    3. un insieme $\mathscr{I} = \{1,2,\dots,n\}$ di $n$ oggetti,

    4. per ogni oggetto $j \in \mathscr{I}$, un <em>profitto</em> $p_j \in \Z_{\ge 1}$ e un <em>peso</em> $w_{j} \in \Z_{\ge 1}$,

    il <strong>problema degli zaini multipli</strong> (MKP) chiede di decidere quali oggetti inserire in ogni zaino, in modo che in ogni zaino il peso totale degli oggetti assegnati non superi la sua capacità e il profitto totale degli oggetti selezionati sia massimo.

<strong>Ipotesi</strong>

- Facciamo le seguenti ipotesi:

    1. L'insieme di tutti gli oggetti <em>non</em> entra nel complesso degli zaini (altrimenti selezionare tutti gli oggetti è ammissibile e ottimo). Formalmente,

        $$
        \sum_{j\in \mathscr{I}} w_j \;>\; \sum_{k\in \mathscr{K}} c_k .
        $$

    2. Ogni oggetto, da solo, entra in (almeno) uno zaino (altrimenti non può mai essere selezionato). Formalmente,

        $$
        \forall\, j\in \mathscr{I}\quad \exists\, k\in \mathscr{K}\ \text{tale che}\ w_j \le c_k .
        $$

## Che cosa fa il corso su questo problema { #sez-sec-cat-mkp-vert }

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Tecnica</strong></th>
<th><strong>Dove</strong></th>
</tr>
<tr>
<td><strong>Definizione</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-degli-zaini-multipli/#box-12-defMKP">Cap. 2 «Problemi di zaino»</a></td>
</tr>
<tr>
<td><strong>Formulazioni</strong></td>
<td><a href="../../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-degli-zaini-multipli/#sez-sec-kpf-MKP">Cap. 9 «Formulazioni dei problemi di zaino»</a></td>
</tr>
<tr>
<td><strong>Programmazione dinamica</strong></td>
<td><a href="../../programmazione-dinamica/dp-principles/#164-gli-algoritmi-di-pd-di-questo-modulo">Cap. 16 «Principi della programmazione dinamica»</a>; <a href="../../programmazione-dinamica/dp-multiple-knapsack/">Cap. 24 «PD per il problema degli zaini multipli»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/knapsack/#esercizio-2-4">Esercizio 2.4</a>; <a href="../../esercizi/knapsack-formulations/#esercizio-9-10">Esercizio 9.10</a>; <a href="../../esercizi/dp-multiple-knapsack/">Cap. 24 (5 esercizi)</a></td>
</tr>
</table></div>
