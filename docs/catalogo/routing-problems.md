---
title: "Problemi di routing"
---

# Problemi di routing

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-routing-problems"></a>

- Date $n$ città e la distanza $d_{ij}$ fra ogni coppia ordinata, una soluzione è un giro che visita ogni città esattamente una volta e torna alla prima.

- L'obiettivo è minimizzare la lunghezza totale del giro; i membri della famiglia differiscono per le proprietà delle distanze: simmetriche, metriche o asimmetriche.

- Il problema del ciclo hamiltoniano è il problema di decisione su un grafo: chiede se esiste un giro fatto di lati del grafo.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Sigla</strong></th>
<th><strong>Differenza</strong></th>
</tr>
<tr>
<td><a href="../travelling-salesman-problem/">Problema del commesso viaggiatore</a></td>
<td>TSP</td>
<td>Il problema centrale della famiglia.</td>
</tr>
<tr>
<td><a href="../metric-travelling-salesman-problem/">Problema del commesso viaggiatore metrico</a></td>
<td>TSP metrico</td>
<td>Il caso particolare del TSP con la disuguaglianza triangolare, in cui esistono garanzie di approssimazione.</td>
</tr>
<tr>
<td><a href="../asymmetric-travelling-salesman-problem/">Problema del commesso viaggiatore asimmetrico</a></td>
<td>ATSP</td>
<td>Il TSP è il caso particolare dell'ATSP in cui <span class="arithmatex">\(d_{ij}=d_{ji}\)</span> per ogni <span class="arithmatex">\(i,j\)</span>; un'istanza dell'ATSP ha <span class="arithmatex">\((n-1)!\)</span> giri.</td>
</tr>
<tr>
<td><a href="../hamiltonian-cycle-problem/">Problema del ciclo hamiltoniano</a></td>
<td>HCP</td>
<td>Con <span class="arithmatex">\(d_{ij}=1\)</span> sui lati e una distanza grande altrove, <span class="arithmatex">\(G\)</span> è hamiltoniano se e solo se <span class="arithmatex">\(z(I_G)=n\)</span>: il TSP lo contiene.</td>
</tr>
</table></div>
