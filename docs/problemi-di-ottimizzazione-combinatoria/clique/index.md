---
title: "Problemi di clique"
---

# Problemi di clique

<div class="info-capitolo" markdown>

**Parte 1 · Problemi di ottimizzazione combinatoria · Capitolo 5** · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-problemi-di-ottimizzazione-combinatoria.pdf) · [:material-pencil: Esercizi: Problemi di clique](../../esercizi/clique.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, il capitolo [«Problemi di ottimizzazione combinatoria»](../combinatorial-optimization/index.md): istanze, soluzioni ammissibili, bound primali e duali, e il gap.

    - Da questo modulo, il capitolo [«Problemi di colorazione»](../coloring/index.md): grafi, intorni, gradi, il grafo complementare e il numero cromatico $\chi(G)$.

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - enunciare il problema della clique massima e il problema dell'insieme stabile massimo, e passare dall'uno all'altro attraverso il grafo complementare;

    - descrivere un'istanza e una soluzione ammissibile, e contare le soluzioni candidate di un piccolo grafo;

    - trovare a mano una clique e calcolare quattro semplici upper bound sul numero di clique;

    - enunciare le varianti pesate del problema e la sua complessità.

## 5.1 Panoramica della famiglia

- I <strong>problemi di clique</strong> hanno gli stessi dati: un grafo semplice non orientato $G = (V,E)$, con $V = \{1,2,\dots,n\}$ e $m$ lati, eventualmente con pesi sui vertici o sui lati.

- Una soluzione è una clique di $G$, ossia un sottoinsieme di vertici a due a due adiacenti.

- L'obiettivo è massimizzare la cardinalità della clique, o il suo peso totale.

<a id="box-1-mcpP-def-clique"></a>

!!! definizione "Definizione 5.1: clique e numero di clique"

    Sia $G=(V,E)$ un grafo semplice non orientato con $n$ vertici e $m$ lati.

    1. Una <strong>clique</strong> è un sottoinsieme $K \subseteq V$ di vertici a due a due adiacenti: $\{u,v\} \in E$ per ogni $u,v \in K$ con $u \neq v$. Equivalentemente, $K$ induce un grafo completo.

    2. Il <strong>numero di clique</strong> $\omega(G)$ è il massimo numero di vertici di una clique di $G$.

!!! chiave ""

    Un problema di clique seleziona una clique di cardinalità massima o di peso massimo. Sul grafo complementare $\overline{G}$ gli stessi problemi selezionano insiemi stabili.

- La tabella elenca i membri della famiglia, con la sezione che definisce ciascuno di essi.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Sigla</strong></th>
<th><strong>Obiettivo</strong></th>
<th><strong>Sezione</strong></th>
</tr>
<tr>
<td>clique massima</td>
<td>MCP</td>
<td>massimo numero di vertici di una clique</td>
<td><a href="il-problema-della-cricca-massima/#sez-sec-mcp-MCP">5.2</a></td>
</tr>
<tr>
<td>insieme stabile massimo</td>
<td>MSSP</td>
<td>massimo numero di vertici di un insieme stabile</td>
<td><a href="il-problema-della-cricca-massima/#sez-sec-mcp-MCP">5.2</a></td>
</tr>
<tr>
<td>clique massima pesata sui vertici</td>
<td>VWMCP</td>
<td>massimo peso totale dei vertici</td>
<td><a href="varianti-pesate/#sez-sec-mcp-weighted">5.5</a></td>
</tr>
<tr>
<td>clique massima pesata sui lati</td>
<td>EWMCP</td>
<td>massimo peso totale dei lati</td>
<td><a href="varianti-pesate/#sez-sec-mcp-weighted">5.5</a></td>
</tr>
</table></div>

<div class="grid cards sottopagine" markdown>

-   **Panoramica**

    Panoramica della famiglia

    [:octicons-arrow-right-24: Apri](#51-panoramica-della-famiglia)

-   **5.2 Il problema della clique massima**

    Upper bound semplici

    [:octicons-arrow-right-24: Apri](il-problema-della-cricca-massima.md)

-   **5.5 Varianti pesate**

    Errori tipici · In sintesi

    [:octicons-arrow-right-24: Apri](varianti-pesate.md)

</div>

---

**Avanti:** [5.2 Il problema della clique massima](il-problema-della-cricca-massima.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di clique](../../esercizi/clique.md)

---

**Approfondimento:** [:material-view-list: che cosa fa il corso su questo problema](../../catalogo/maximum-clique-problem.md)
