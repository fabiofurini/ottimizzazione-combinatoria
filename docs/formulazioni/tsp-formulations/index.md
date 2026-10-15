---
title: "Formulazioni dei problemi di routing"
---

# Formulazioni dei problemi di routing

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 13** · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-tsp-formulations.pdf) · [:material-pencil: Esercizi: Problemi di routing](../../esercizi/tsp-formulations.md)

</div>

!!! nota "Prerequisiti"

    - Dal modulo <em>Programmazione lineare intera</em>, [Capitolo 1 «Programmazione lineare intera»](https://fabiofurini.github.io/programmazione-lineare-intera/models-and-bounds/ilp/) e [Capitolo 2 «Bound primali e duali»](https://fabiofurini.github.io/programmazione-lineare-intera/models-and-bounds/lp-relaxation/): problemi ILP, rilassamenti lineari e bound.

    - Da questo modulo, [Capitolo 6 «Problemi di routing»](../../problemi-di-ottimizzazione-combinatoria/tsp/index.md): il problema, le sue ipotesi, i giri, la matrice delle distanze e l'istanza dell'Esempio 6.1.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo saremo in grado di:

    - scrivere il modello PLI del problema del commesso viaggiatore con le variabili di posizione di Miller-Tucker-Zemlin (MTZ) e spiegare come eliminano i sottogiri;

    - scrivere il modello PLI con i vincoli di eliminazione dei sottogiri di Dantzig-Fulkerson-Johnson (DFJ) e dimostrarne la correttezza;

    - contare le variabili e i vincoli dei due modelli;

    - confrontare i rilassamenti lineari dei due modelli sulla stessa istanza;

    - scrivere il modello PLI del TSP asimmetrico e spiegare perché il TSP metrico ha gli stessi modelli del TSP.

## 13.1 Panoramica della famiglia

- Dato l'insieme $\mathscr{V}=\{1,2,\dots,n\}$ delle città, i modelli di questo capitolo usano l'insieme degli archi orientati

    $$
    A=\{(i,j):i,j\in\mathscr{V},~i\neq j\}.
    $$

    Ogni lato $\{i,j\}$ del problema simmetrico è rappresentato dai due archi opposti $(i,j)$ e $(j,i)$, che hanno lo stesso costo $d_{ij}=d_{ji}$.

- I modelli PLI dei problemi di routing usano una <strong>variabile di arco</strong> binaria $x_{ij}$ per ogni arco $(i,j) \in A$, uguale a $1$ se il giro va dalla città $i$ alla città $j$.

- I <strong>vincoli di grado</strong> impongono che da ogni città esca esattamente un arco e che in ogni città entri esattamente un arco; i modelli differiscono nei vincoli che eliminano i sottogiri.

!!! chiave ""

    I modelli di routing sono modelli di assegnamento sugli archi, con i vincoli di grado, più vincoli che vietano i sottogiri. La funzione obiettivo minimizza la distanza totale $\sum_{(i,j) \in A} d_{ij}\,x_{ij}$.

- La tabella elenca i membri della famiglia, con i nomi dei loro modelli PLI e le sezioni che li scrivono.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Modello</strong></th>
<th><strong>Eliminazione dei sottogiri</strong></th>
<th><strong>Sezione</strong></th>
</tr>
<tr>
<td>TSP</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{MTZ}}\)</span></td>
<td>variabili di posizione <span class="arithmatex">\(u_i\)</span></td>
<td><a href="modelli-pli-per-il-problema-del-commesso-viaggiatore/#sez-sec-tspf-MTZ">13.3</a></td>
</tr>
<tr>
<td>TSP</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{DFJ}}\)</span></td>
<td>un vincolo per ogni sottoinsieme di città</td>
<td><a href="modelli-pli-per-il-problema-del-commesso-viaggiatore/#sez-sec-tspf-DFJ">13.4</a></td>
</tr>
<tr>
<td>TSP metrico</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{MTZ}}\)</span>, <span class="arithmatex">\(\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{DFJ}}\)</span></td>
<td>i modelli del TSP</td>
<td><a href="modelli-pli-per-il-tsp-metrico-e-asimmetrico/#sez-sec-tspf-variants">13.6</a></td>
</tr>
<tr>
<td>ATSP</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{ATSP}}\)</span></td>
<td>i vincoli dei modelli del TSP</td>
<td><a href="modelli-pli-per-il-tsp-metrico-e-asimmetrico/#sez-sec-tspf-variants">13.6</a></td>
</tr>
</table></div>

<div class="grid cards sottopagine" markdown>

-   **Panoramica**

    Panoramica della famiglia

    [:octicons-arrow-right-24: Apri](#131-panoramica-della-famiglia)

-   **13.2 Modelli PLI per il problema del commesso viaggiatore**

    Il rilassamento di assegnamento · Il rilassamento del modello MTZ · Il rilassamento del modello DFJ

    [:octicons-arrow-right-24: Apri](modelli-pli-per-il-problema-del-commesso-viaggiatore.md)

-   **13.6 Modelli PLI per il TSP metrico e asimmetrico**

    In sintesi

    [:octicons-arrow-right-24: Apri](modelli-pli-per-il-tsp-metrico-e-asimmetrico.md)

</div>

---

**Avanti:** [13.2 Modelli PLI per il problema del commesso viaggiatore](modelli-pli-per-il-problema-del-commesso-viaggiatore.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di routing](../../esercizi/tsp-formulations.md)
