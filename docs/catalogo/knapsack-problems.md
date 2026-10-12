---
title: "Problemi di zaino"
---

# Problemi di zaino

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-knapsack-problems"></a>

- Ogni oggetto $j$ ha un profitto $p_j$ e un peso $w_j$; una soluzione seleziona un sottoinsieme, o un multiinsieme, degli oggetti i cui pesi soddisfano uno o più vincoli di capacità.

- L'obiettivo è massimizzare il profitto totale degli oggetti selezionati; nel problema del subset sum il peso totale deve essere uguale a un valore dato.

- I membri della famiglia differiscono per il numero di copie di ogni oggetto, per il numero di capacità e di zaini, e per vincoli aggiuntivi sugli oggetti selezionati.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Sigla</strong></th>
<th><strong>Differenza</strong></th>
</tr>
<tr>
<td><a href="../knapsack-problem/">Problema dello zaino 0/1</a></td>
<td>KP</td>
<td>Il problema centrale della famiglia.</td>
</tr>
<tr>
<td><a href="../subset-sum-problem/">Problema del subset sum</a></td>
<td>SSP</td>
<td>L'SSP si risolve come il KP con <span class="arithmatex">\(p_j = w_j\)</span> per ogni <span class="arithmatex">\(j\in\Ioggetti\)</span>: la risposta è sì se e solo se il valore ottimo di questo KP è uguale a <span class="arithmatex">\(c\)</span>.</td>
</tr>
<tr>
<td><a href="../bounded-knapsack-problem/">Problema dello zaino limitato</a></td>
<td>BKP</td>
<td>Il BKP si riduce al KP quando <span class="arithmatex">\(b_j=1\)</span> per ogni oggetto, e all'UKP quando ogni limite <span class="arithmatex">\(b_j\)</span> è abbastanza grande da non essere vincolante.</td>
</tr>
<tr>
<td><a href="../unbounded-knapsack-problem/">Problema dello zaino illimitato</a></td>
<td>UKP</td>
<td>L'UKP è il BKP con <span class="arithmatex">\(b_j = \hat b_j = \lfloor c/w_j \rfloor\)</span>: ogni oggetto si può prendere tante volte quante entra nello zaino.</td>
</tr>
<tr>
<td><a href="../multidimensional-knapsack-problem/">Problema dello zaino multidimensionale</a></td>
<td>MDKP</td>
<td>L'MDKP è il KP con <span class="arithmatex">\(k\)</span> vincoli di capacità, uno per ogni risorsa; con <span class="arithmatex">\(k=1\)</span> è il KP.</td>
</tr>
<tr>
<td><a href="../multiple-knapsack-problem/">Problema degli zaini multipli</a></td>
<td>MKP</td>
<td>L'MKP è il KP con <span class="arithmatex">\(m\)</span> zaini; ogni soluzione ammissibile dell'MKP è ammissibile per il KP con capacità <span class="arithmatex">\(\sum_{k\in\mathscr{K}} c_k\)</span>, e questo dà un bound duale.</td>
</tr>
<tr>
<td><a href="../multiple-choice-knapsack-problem/">Problema dello zaino a scelta multipla</a></td>
<td>MCKP</td>
<td>L'MCKP è il KP con il vincolo aggiuntivo di scegliere esattamente un oggetto per ogni classe, quindi un'istanza può essere non ammissibile.</td>
</tr>
<tr>
<td><a href="../knapsack-problem-with-setups/">Problema dello zaino con setup</a></td>
<td>KPS</td>
<td>Il KPS è il KP in cui scegliere il primo oggetto di una classe costa il setup <span class="arithmatex">\(f_h\)</span> e consuma il peso di setup <span class="arithmatex">\(s_h\)</span>; una classe senza oggetti scelti non costa nulla.</td>
</tr>
</table></div>
