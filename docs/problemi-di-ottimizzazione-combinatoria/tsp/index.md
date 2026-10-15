---
title: "Problemi di routing"
---

# Problemi di routing

<div class="info-capitolo" markdown>

**Parte 1 · Problemi di ottimizzazione combinatoria · Capitolo 6** · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-problemi-di-ottimizzazione-combinatoria.pdf) · [:material-presentation: Slide](../../pdf/slide-tsp.pdf) · [:material-pencil: Esercizi: Problemi di routing](../../esercizi/tsp.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, [Capitolo 1 «Problemi di ottimizzazione combinatoria»](../combinatorial-optimization/index.md): che cos'è un problema di ottimizzazione combinatoria, come esplode il numero delle soluzioni, e le nozioni di bound primale, bound duale e gap.

    - Dallo stesso capitolo, l'istanza di riferimento del TSP con $5$ città, che questo capitolo studia in dettaglio.

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - enunciare il TSP, il TSP asimmetrico e il TSP metrico, e descrivere un'istanza e un giro;

    - calcolare la lunghezza di un giro e contare i giri di un'istanza;

    - spiegare perché elencare tutti i giri è senza speranza già con $20$ città;

    - costruire a mano un primo giro con la nearest neighbour rule;

    - calcolare un lower bound sulla lunghezza ottima a partire dai due archi più corti di ogni città, e misurare il gap rispetto a un giro.

## 6.1 Panoramica della famiglia

- I <strong>problemi di routing</strong> di questo capitolo hanno gli stessi dati: un insieme $\mathscr{V} = \{1,2,\dots,n\}$ di $n$ città e, per ogni coppia di città distinte $i,j \in \mathscr{V}$, una <em>distanza</em> $d_{ij} \in \Z_{\ge 1}$.

- Una soluzione è un <strong>giro</strong>, una permutazione $\sigma$ delle città letta come un percorso chiuso che visita ogni città esattamente una volta; la sua <strong>lunghezza</strong> $L(\sigma)$ è la somma delle distanze percorse.

- L'obiettivo è minimizzare la lunghezza del giro.

!!! chiave ""

    Un problema di routing trova un giro più corto attraverso tutte le città. I membri della famiglia differiscono nelle proprietà delle distanze: simmetriche, metriche o asimmetriche.

- La tabella elenca i membri della famiglia, con la sezione che definisce ciascuno di essi.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Sigla</strong></th>
<th><strong>Distanze</strong></th>
<th><strong>Sezione</strong></th>
</tr>
<tr>
<td>commesso viaggiatore</td>
<td>TSP</td>
<td>simmetriche, <span class="arithmatex">\(d_{ij} = d_{ji}\)</span></td>
<td><a href="il-problema-del-commesso-viaggiatore/#sez-sec-tsp-TSP">6.2</a></td>
</tr>
<tr>
<td>commesso viaggiatore metrico</td>
<td>TSP metrico</td>
<td>simmetriche, con la disuguaglianza triangolare</td>
<td><a href="varianti-tsp-metrico-e-tsp-asimmetrico/#sez-sec-tsp-variants">6.6</a></td>
</tr>
<tr>
<td>commesso viaggiatore asimmetrico</td>
<td>ATSP</td>
<td><span class="arithmatex">\(d_{ij}\)</span> può differire da <span class="arithmatex">\(d_{ji}\)</span></td>
<td><a href="varianti-tsp-metrico-e-tsp-asimmetrico/#sez-sec-tsp-variants">6.6</a></td>
</tr>
</table></div>

<div class="grid cards sottopagine" markdown>

-   **Panoramica**

    Panoramica della famiglia

    [:octicons-arrow-right-24: Apri](#61-panoramica-della-famiglia)

-   **6.2 Il problema del commesso viaggiatore**

    Contare i giri · Un primo giro a mano · Un lower bound combinatorio

    [:octicons-arrow-right-24: Apri](il-problema-del-commesso-viaggiatore.md)

-   **6.6 Varianti: TSP metrico e TSP asimmetrico**

    Il problema del commesso viaggiatore asimmetrico · Osservazioni · Errori tipici · In sintesi

    [:octicons-arrow-right-24: Apri](varianti-tsp-metrico-e-tsp-asimmetrico.md)

</div>

---

**Avanti:** [6.2 Il problema del commesso viaggiatore](il-problema-del-commesso-viaggiatore.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di routing](../../esercizi/tsp.md)

---

**Approfondimento:** [:material-view-list: che cosa fa il corso su questo problema](../../catalogo/travelling-salesman-problem.md)
