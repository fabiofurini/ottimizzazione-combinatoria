---
title: "Problemi di colorazione"
---

# Problemi di colorazione

<div class="info-capitolo" markdown>

**Parte 1 · Problemi di ottimizzazione combinatoria · Capitolo 4** · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-problemi-di-ottimizzazione-combinatoria.pdf) · [:material-presentation: Slide](../../pdf/slide-coloring.pdf) · [:material-pencil: Esercizi: Problemi di colorazione](../../esercizi/coloring.md) · [:material-gesture-tap: App: Colorazione: greedy e DSATUR](../../laboratorio/colorazione-greedy-dsatur.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, [Capitolo 1 «Problemi di ottimizzazione combinatoria»](../combinatorial-optimization/index.md): istanze, soluzioni ammissibili, bound primali e duali, il gap e i numeri di Bell che contano le partizioni di un insieme.

    - Dal [Capitolo 3 «Problemi di packing»](../bin-packing/index.md): il bound sul peso come esempio di bound duale.

    - Non serve alcuna conoscenza di teoria dei grafi: le definizioni usate qui sono richiamate in una breve sezione.

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - usare le nozioni di base sui grafi: intorno, grado, grafo indotto, grafo complementare, clique e insieme stabile;

    - enunciare la definizione del problema della colorazione dei vertici e le ipotesi sul grafo;

    - contare le soluzioni candidate di una piccola istanza e riconoscere che sono partizioni;

    - trovare a mano una colorazione e calcolare il bound di clique e il bound degli insiemi stabili;

    - spiegare perché il bound di clique non è sempre stretto.

## 4.1 Panoramica della famiglia

- I <strong>problemi di colorazione</strong> hanno gli stessi dati: un grafo semplice non orientato $G = (V,E)$, i cui lati sono le coppie di vertici in conflitto.

- Una soluzione assegna un colore a ogni vertice, in modo che i due estremi di ogni lato ricevano colori diversi: i vertici con lo stesso colore formano un insieme stabile di $G$.

- L'obiettivo è minimizzare il numero di colori usati.

!!! chiave ""

    Un problema di colorazione partiziona i vertici di un grafo nel minor numero di insiemi stabili. Le nozioni sui grafi della sottosezione seguente sono la notazione comune della famiglia.

- La tabella elenca i membri della famiglia, con la sezione che definisce ciascuno di essi.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Sigla</strong></th>
<th><strong>Soluzione</strong></th>
<th><strong>Sezione</strong></th>
</tr>
<tr>
<td>problema della colorazione dei vertici</td>
<td>VCP</td>
<td>una partizione di <span class="arithmatex">\(V\)</span> in insiemi stabili</td>
<td><a href="il-problema-della-colorazione-dei-vertici/#sez-sec-col-VCP">4.2</a></td>
</tr>
</table></div>

### 4.1.1 Un breve richiamo sui grafi

<a id="box-1-def-graph"></a>

!!! definizione "Definizione 4.1: grafo, intorno, grafo indotto e grafo complementare"

    - Un <strong>grafo</strong> $G = (V,E)$ è dato da un insieme finito $V$ di <strong>vertici</strong> e da un insieme $E$ di <strong>lati</strong>, ciascuno dei quali è un sottoinsieme di $2$ elementi di $V$. Scriviamo $n = |V|$ e $m = |E|$; i vertici sono etichettati $1,2,\dots,n$. Tutti i grafi di questo capitolo sono semplici e non orientati.

    - Due vertici distinti $u$ e $v$ sono <strong>adiacenti</strong> se $\{u,v\} \in E$. L'<strong>intorno</strong> di un vertice $v$ è l'insieme $N(v) = \{\, u \in V : \{u,v\} \in E \,\}$, e il suo <strong>grado</strong> è $\deg(v) = |N(v)|$.

    - Per un sottoinsieme $U \subseteq V$ il <strong>grafo indotto</strong> $G[U] = (U, E[U])$ ha i vertici di $U$ e i lati di $E$ con entrambi gli estremi in $U$.

    - Il <strong>grafo complementare</strong> $\overline{G} = (V, \overline{E})$ ha gli stessi vertici di $G$, e due vertici distinti sono adiacenti in $\overline{G}$ se e solo se non sono adiacenti in $G$.

<a id="box-2-def-clique-stable"></a>

!!! definizione "Definizione 4.2: clique e insieme stabile"

    Sia $G = (V,E)$ un grafo.

    1. Una <strong>clique</strong> è un sottoinsieme $K \subseteq V$ di vertici a due a due adiacenti: $\{u,v\} \in E$ per ogni $u,v \in K$ con $u \neq v$.

    2. Un <strong>insieme stabile</strong> (detto anche <strong>insieme indipendente</strong>) è un sottoinsieme $Q \subseteq V$ di vertici a due a due non adiacenti: $\{u,v\} \notin E$ per ogni $u,v \in Q$ con $u \neq v$.

    Il <strong>numero di clique</strong> $\omega(G)$ è il massimo numero di vertici di una clique, e il <strong>numero di stabilità</strong> $\alpha(G)$ è il massimo numero di vertici di un insieme stabile.

- Un insieme stabile di $G$ è una clique del grafo complementare $\overline{G}$, e viceversa. Un vertice da solo e l'insieme vuoto sono sia una clique sia un insieme stabile.

!!! chiave ""

    Una clique è un gruppo di vertici a due a due in <em>conflitto</em>; un insieme stabile è un gruppo di vertici senza conflitti. In una colorazione, i vertici di una clique richiedono colori diversi, e i vertici di un insieme stabile possono condividerne uno.

<div class="grid cards sottopagine" markdown>

-   **Panoramica**

    Panoramica della famiglia · Un breve richiamo sui grafi

    [:octicons-arrow-right-24: Apri](#41-panoramica-della-famiglia)

-   **4.2 Il problema della colorazione dei vertici**

    Due bound semplici · Contare le soluzioni, una prima soluzione e i bound · Osservazioni · Errori tipici · In sintesi

    [:octicons-arrow-right-24: Apri](il-problema-della-colorazione-dei-vertici.md)

</div>

---

**Avanti:** [4.2 Il problema della colorazione dei vertici](il-problema-della-colorazione-dei-vertici.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di colorazione](../../esercizi/coloring.md)

---

**Approfondimento:** [:material-view-list: che cosa fa il corso su questo problema](../../catalogo/vertex-coloring-problem.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Colorazione: greedy e DSATUR](../../laboratorio/colorazione-greedy-dsatur.md).