---
title: "Problema del commesso viaggiatore metrico (TSP metrico)"
---

# Problema del commesso viaggiatore metrico (TSP metrico)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi di routing](routing-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-metric-travelling-salesman-problem"></a>

<a id="box-1-def-catdef-metrictsp"></a>

!!! definizione "Definizione 1: Problema del commesso viaggiatore metrico"

    Un'istanza del TSP è <strong>metrica</strong> se le sue distanze soddisfano la <strong>disuguaglianza triangolare</strong>

    $$
    d_{ij} \le d_{ik} + d_{kj}
    \qquad \text{per ogni terna di città distinte } i,j,k \in \mathscr{V}.
    $$

    Il <strong>problema del commesso viaggiatore metrico</strong> (TSP metrico) è il TSP ristretto alle istanze metriche.

## Che cosa fa il corso su questo problema { #sez-sec-cat-metrictsp-vert }

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Tecnica</strong></th>
<th><strong>Dove</strong></th>
</tr>
<tr>
<td><strong>Definizione</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/tsp/varianti-tsp-metrico-e-tsp-asimmetrico/#box-8-defMetricTSP">Cap. 6 «Problemi di routing»</a></td>
</tr>
<tr>
<td><strong>Formulazioni</strong></td>
<td><a href="../../formulazioni/tsp-formulations/modelli-pli-per-il-tsp-metrico-e-asimmetrico/#sez-sec-tspf-variants">Cap. 13 «Formulazioni dei problemi di routing»</a></td>
</tr>
<tr>
<td><strong>Euristiche</strong></td>
<td><a href="../../algoritmi-euristici/constructive-heuristics/il-problema-del-commesso-viaggiatore-accodare-o-inserire/#sez-sec-INS">Cap. 30 «Euristiche costruttive»</a></td>
</tr>
<tr>
<td><strong>Approssimazione</strong></td>
<td><a href="../../algoritmi-di-approssimazione/tsp-approximation/#box-2-def-metricTSP">Cap. 39 «TSP: il caso generale e il caso metrico»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/tsp/#esercizio-6-4">Esercizio 6.4</a>; <a href="../../esercizi/tsp-approximation/">Cap. 39 (2 esercizi)</a></td>
</tr>
</table></div>
