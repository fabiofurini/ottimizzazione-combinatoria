---
title: "Problemi di packing"
---

# Problemi di packing

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-packing-problems"></a>

- Ogni oggetto $j$ ha un peso $w_j$; una soluzione è una partizione degli oggetti in contenitori di capacità $c$, tale che il peso totale degli oggetti in ogni contenitore sia al più $c$.

- L'obiettivo è minimizzare il numero di contenitori; nel problema del cutting stock gli oggetti sono raggruppati in tipi con una domanda $d_j$.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Sigla</strong></th>
<th><strong>Differenza</strong></th>
</tr>
<tr>
<td><a href="../bin-packing-problem/">Problema del bin packing</a></td>
<td>BPP</td>
<td>Il problema centrale della famiglia.</td>
</tr>
<tr>
<td><a href="../cutting-stock-problem/">Problema del cutting stock</a></td>
<td>CSP</td>
<td>Il CSP è il BPP con <span class="arithmatex">\(d_j\)</span> copie identiche di ogni oggetto <span class="arithmatex">\(j\)</span>, e il BPP è il caso <span class="arithmatex">\(d_j = 1\)</span> per ogni <span class="arithmatex">\(j\in\Ioggetti\)</span>.</td>
</tr>
</table></div>
