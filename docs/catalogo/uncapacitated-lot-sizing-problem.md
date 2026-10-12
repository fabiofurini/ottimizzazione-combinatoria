---
title: "Problema del lot sizing senza capacità (ULS)"
---

# Problema del lot sizing senza capacità (ULS)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi di lot sizing](lot-sizing-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-uncapacitated-lot-sizing-problem"></a>

<a id="box-1-def-catdef-uls"></a>

!!! definizione "Definizione 1: Problema del lot sizing senza capacità"

    Dati:

    1. un insieme $T=\{1,2,\dots,m\}$ di $m \in \Z_{\ge 1}$ <em>periodi</em>,

    2. per ogni periodo $t \in T$, una <em>domanda</em> $d_t \in \Z_{\ge 1}$,

    3. per ogni periodo $t \in T$, un <em>costo di setup</em> $sc_t \in \Z_{\ge 0}$, un <em>costo variabile di produzione</em> $vc_t \in \Z_{\ge 0}$ per unità, e un <em>costo di mantenimento a scorta</em> $hc_t \in \Z_{\ge 0}$ per unità in scorta alla fine del periodo $t$,

    il <strong>problema del lot sizing senza capacità</strong> (ULS) chiede di decidere quante unità produrre in ogni periodo, in modo che, partendo con la scorta vuota e terminando con la scorta vuota, la domanda di ogni periodo sia soddisfatta, e il costo totale di setup, produzione e mantenimento a scorta sia minimo.

<strong>Ipotesi</strong>

- Facciamo le seguenti ipotesi:

    1. C'è un solo prodotto, e la scorta è vuota all'inizio e alla fine dell'orizzonte: l'ULS è il CLS di un solo prodotto senza capacità e senza scorta iniziale.

    2. Le quantità sono intere. Con dati interi, una volta fissati i periodi con un setup, resta un problema di flusso di costo minimo, che ha una soluzione ottima intera: restringere le quantità agli interi non cambia il costo ottimo.

## Che cosa fa il corso su questo problema { #sez-sec-cat-uls-vert }

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Tecnica</strong></th>
<th><strong>Dove</strong></th>
</tr>
<tr>
<td><strong>Definizione</strong></td>
<td>Questa pagina</td>
</tr>
<tr>
<td><strong>Formulazioni</strong></td>
<td><a href="../../formulazioni/lot-sizing-formulations/modelli-pli-per-il-problema-di-lot-sizing-capacitato/#sez-sec-lsf-compare">Cap. 15 «Formulazioni dei problemi di lot sizing»</a></td>
</tr>
<tr>
<td><strong>Programmazione dinamica</strong></td>
<td><a href="../../programmazione-dinamica/dp-principles/#164-gli-algoritmi-di-pd-di-questo-modulo">Cap. 16 «Principi della programmazione dinamica»</a>; <a href="../../programmazione-dinamica/dp-lot-sizing/#box-3-thmZIO">Cap. 25 «PD per il problema del lot sizing senza capacità»</a></td>
</tr>
<tr>
<td><strong>Euristiche MIP</strong></td>
<td><a href="../../algoritmi-euristici/mip-heuristics-classical/#box-16-ex-rfcourse">Cap. 33 «Euristiche MIP per i problemi classici»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/lot-sizing/#esercizio-8-4">Esercizio 8.4</a>; <a href="../../esercizi/lot-sizing-formulations/#esercizio-15-6">Esercizio 15.6</a>; <a href="../../esercizi/dp-lot-sizing/">Cap. 25 (3 esercizi)</a></td>
</tr>
<tr>
<td><strong>Istanze di riferimento</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/lot-sizing/il-problema-del-lot-sizing-capacitato/#83-contare-le-soluzioni">Cap. 8</a> (<span class="arithmatex">\(z=170\)</span>)</td>
</tr>
</table></div>
