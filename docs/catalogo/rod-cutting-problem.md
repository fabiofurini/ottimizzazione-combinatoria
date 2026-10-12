---
title: "Problema del taglio delle aste (RCP)"
---

# Problema del taglio delle aste (RCP)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi misti](miscellaneous-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-rod-cutting-problem"></a>

<a id="box-1-def-catdef-rcp"></a>

!!! definizione "Definizione 1: Problema del taglio delle aste"

    Dati:

    1. un'asta di <em>lunghezza</em> $n \in \Z_{\ge 1}$,

    2. un insieme $\{1,2,\dots,n\}$ di $n$ possibili lunghezze dei pezzi,

    3. per ogni lunghezza $\ell \in \{1,2,\dots,n\}$, un <em>profitto</em> $p_\ell \in \Z_{\ge 1}$,

    il <strong>problema del taglio delle aste</strong> (RCP) chiede di decidere quanti pezzi di ogni lunghezza tagliare, in modo che la lunghezza totale dei pezzi ottenuti sia uguale alla lunghezza dell'asta, e il profitto totale dei pezzi ottenuti sia massimo.

## Che cosa fa il corso su questo problema { #sez-sec-cat-rcp-vert }

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
<td><strong>Programmazione dinamica</strong></td>
<td><a href="../../programmazione-dinamica/dp-principles/#164-gli-algoritmi-di-pd-di-questo-modulo">Cap. 16 «Principi della programmazione dinamica»</a>; <a href="../../programmazione-dinamica/dp-rod-cutting/">Cap. 28 «PD per il problema del taglio delle aste»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/dp-rod-cutting/">Cap. 28 (5 esercizi)</a></td>
</tr>
<tr>
<td><strong>Istanze di riferimento</strong></td>
<td><a href="../../programmazione-dinamica/dp-rod-cutting/#box-1-texexpbox1">Cap. 28</a> (<span class="arithmatex">\(z=10\)</span>)</td>
</tr>
</table></div>
