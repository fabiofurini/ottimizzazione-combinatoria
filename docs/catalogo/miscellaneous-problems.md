---
title: "Problemi misti"
---

# Problemi misti

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-miscellaneous-problems"></a>

- Nel problema del taglio delle aste un'asta di lunghezza $n$ è tagliata in pezzi di lunghezza intera $\ell$ con profitti $p_\ell$; la lunghezza totale dei pezzi è uguale a $n$ e il loro profitto totale è massimo.

- Nel problema del cambio monete si restituisce un resto $c$ con monete dei tagli $w_1,\dots,w_n$, ciascuno disponibile in quantità illimitata; il valore totale è uguale a $c$ e il numero di monete è minimo.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Sigla</strong></th>
<th><strong>Differenza</strong></th>
</tr>
<tr>
<td><a href="../rod-cutting-problem/">Problema del taglio delle aste</a></td>
<td>RCP</td>
<td>Uno zaino illimitato con un tipo di oggetto per ogni lunghezza <span class="arithmatex">\(\ell\)</span> dei pezzi, peso <span class="arithmatex">\(\ell\)</span>, profitto <span class="arithmatex">\(p_\ell\)</span> e capacità <span class="arithmatex">\(n\)</span>, in cui la lunghezza totale deve essere esattamente <span class="arithmatex">\(n\)</span>.</td>
</tr>
<tr>
<td><a href="../coin-change-problem/">Problema del cambio monete</a></td>
<td>CCP</td>
<td>Come l'UKP ha copie illimitate di ogni tipo di oggetto, ma chiede esattamente <span class="arithmatex">\(c\)</span> e minimizza il numero di monete, mentre l'UKP chiede al più <span class="arithmatex">\(c\)</span> e massimizza il profitto.</td>
</tr>
</table></div>
