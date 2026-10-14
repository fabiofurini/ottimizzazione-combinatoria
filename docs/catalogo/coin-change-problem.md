---
title: "Problema del cambio monete (CCP)"
---

# Problema del cambio monete (CCP)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi misti](miscellaneous-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-coin-change-problem"></a>

<a id="box-1-def-catdef-ccp"></a>

!!! definizione "Definizione 1: Problema del cambio monete"

    Dati:

    1. un vettore $w \in \Z_{\ge 1}^n$ di $n$ <em>tagli</em>, ciascuno disponibile in quantità illimitata,

    2. un <em>resto</em> intero $c \in \Z_{\ge 0}$ da restituire,

    il <strong>problema del cambio monete</strong> (CCP) chiede di decidere quante monete di ogni taglio usare in modo che il loro valore totale sia esattamente uguale a $c$, e il numero totale di monete usate sia minimo. Se nessuna combinazione di monete restituisce esattamente $c$, l'istanza è <em>non ammissibile</em>.

## Che cosa fa il corso su questo problema { #sez-sec-cat-ccp-vert }

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
<td><a href="../../programmazione-dinamica/dp-principles/#164-gli-algoritmi-di-pd-di-questo-modulo">Cap. 16 «Principi della programmazione dinamica»</a>; <a href="../../programmazione-dinamica/dp-coin-change/">Cap. 27 «PD per il problema del cambio monete»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/dp-coin-change/">Cap. 27 (5 esercizi)</a></td>
</tr>
</table></div>
