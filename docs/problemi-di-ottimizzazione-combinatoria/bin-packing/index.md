---
title: "Problemi di packing"
---

# Problemi di packing

<div class="info-capitolo" markdown>

**Parte 1 · Problemi di ottimizzazione combinatoria · Capitolo 3** · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-problemi-di-ottimizzazione-combinatoria.pdf) · [:material-pencil: Esercizi: Problemi di packing](../../esercizi/bin-packing.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, [Capitolo 1 «Problemi di ottimizzazione combinatoria»](../combinatorial-optimization/index.md): istanze, soluzioni ammissibili, bound primali e duali, il gap e i numeri di Bell che contano le partizioni di un insieme.

    - Da questo modulo, [Capitolo 2 «Problemi di zaino»](../knapsack/index.md): la forma delle definizioni e delle ipotesi sui dati.

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - enunciare la definizione del problema del bin packing e del problema del cutting stock, con istanze e soluzioni ammissibili;

    - spiegare le ipotesi sui dati;

    - contare le soluzioni candidate di una piccola istanza e riconoscere che sono partizioni;

    - trovare a mano una soluzione ammissibile e calcolare il bound sul peso;

    - usare i due bound per certificare che una soluzione è ottima.

## 3.1 Panoramica della famiglia

- I <strong>problemi di packing</strong> hanno gli stessi dati: un numero infinito di contenitori identici di <em>capacità</em> $c \in \Z_{\ge 1}$, un insieme $\mathscr{I} = \{1,2,\dots,n\}$ di $n$ oggetti e, per ogni oggetto $j \in \mathscr{I}$, un <em>peso</em> $w_j \in \Z_{\ge 1}$.

- Una soluzione assegna ogni oggetto, o ogni copia richiesta di un oggetto, a un contenitore: il peso totale degli oggetti in un contenitore non deve superare la capacità $c$.

- L'obiettivo è minimizzare il numero di contenitori usati.

!!! chiave ""

    Un problema di packing sistema tutti gli oggetti nel minor numero di contenitori di capacità $c$. I membri della famiglia differiscono nel numero di copie di ogni oggetto da impaccare.

- La tabella elenca i membri della famiglia, con la sezione che definisce ciascuno di essi.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Sigla</strong></th>
<th><strong>Oggetti da impaccare</strong></th>
<th><strong>Sezione</strong></th>
</tr>
<tr>
<td>problema del bin packing</td>
<td>BPP</td>
<td>una copia di ogni oggetto</td>
<td><a href="il-problema-del-bin-packing/#sez-sec-bp-BPP">3.2</a></td>
</tr>
<tr>
<td>problema del cutting stock</td>
<td>CSP</td>
<td><span class="arithmatex">\(d_j\)</span> copie dell'oggetto <span class="arithmatex">\(j\)</span></td>
<td><a href="il-problema-del-cutting-stock/#sez-sec-bp-CSP">3.3</a></td>
</tr>
</table></div>

<div class="grid cards sottopagine" markdown>

-   **Panoramica**

    Panoramica della famiglia

    [:octicons-arrow-right-24: Apri](#31-panoramica-della-famiglia)

-   **3.2 Il problema del bin packing**

    Contare le soluzioni, una prima soluzione e un bound semplice

    [:octicons-arrow-right-24: Apri](il-problema-del-bin-packing.md)

-   **3.3 Il problema del cutting stock**

    Contare le soluzioni, una prima soluzione e un bound semplice · Osservazioni · Errori tipici · In sintesi

    [:octicons-arrow-right-24: Apri](il-problema-del-cutting-stock.md)

</div>

---

**Avanti:** [3.2 Il problema del bin packing](il-problema-del-bin-packing.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di packing](../../esercizi/bin-packing.md)

---

**Approfondimento:** [:material-view-list: che cosa fa il corso su questo problema](../../catalogo/bin-packing-problem.md)
