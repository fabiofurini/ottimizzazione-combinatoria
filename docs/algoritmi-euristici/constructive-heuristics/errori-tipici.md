---
title: "Errori tipici · In sintesi"
---

# Errori tipici · In sintesi

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 30** · [:material-book-open-variant: Capitolo 30: Euristiche costruttive](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-presentation: Slide (1/2)](../../pdf/slide-constructive-heuristics-1.pdf) · [:material-presentation: Slide (2/2)](../../pdf/slide-constructive-heuristics-2.pdf) · [:material-pencil: Esercizi: Euristiche costruttive](../../esercizi/constructive-heuristics.md) · [:material-gesture-tap: App: Euristiche per il bin packing](../../laboratorio/euristiche-bin-packing.md) · [:material-gesture-tap: App: List scheduling e LPT](../../laboratorio/list-scheduling-lpt.md) · [:material-gesture-tap: App: Colorazione: greedy e DSATUR](../../laboratorio/colorazione-greedy-dsatur.md) · [:material-gesture-tap: App: TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md)

</div>

## 30.12 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Aspettarsi che il greedy per efficienza sia ottimo.</strong> Può essere arbitrariamente cattivo, e così ciascuno degli altri due ordinamenti: le note contengono una famiglia di istanze per ognuno di essi.

    - <strong>Credere che ordinare aiuti sempre.</strong> FFD può essere peggiore di FF ([Esempio 30.4](il-problema-del-bin-packing-prima-ordinare-poi-riempire.md#box-6-ex-ffdworse)).

    - <strong>Risolvere i pareggi nel modo sbagliato.</strong> Ogni esempio usa una regola fissata (indice minimo, primo contenitore in cui l'oggetto entra, contenitore più pieno per BF): cambiarla cambia la soluzione.

    - <strong>Dimenticare l'arco di chiusura.</strong> La lunghezza di un giro include l'arco dall'ultima città di ritorno alla prima; il costo di un inserimento è $d_{ik}+d_{kj}-d_{ij}$, e va provata ogni posizione, arco di chiusura compreso.

    - <strong>Leggere $\mathscr{A}(I)$ come un bound su $z(I)$.</strong> È solo un bound primale.

## 30.13 In sintesi

!!! chiave "In sintesi"

    - Un'euristica costruttiva costruisce una soluzione, un elemento alla volta, e non rivede mai una scelta.

    - L'ordine delle scelte è la principale scelta di progetto: efficienza per il KP, pesi decrescenti per il BPP, prima i lavori più lunghi per $P\,||\,C_{\max}$; nessun ordine vince su ogni istanza.

    - Più ordini, punti di partenza o costruzioni randomizzate, tenendo la soluzione migliore, sono una protezione economica.

    - Le soluzioni sono punti di partenza per la ricerca locale.

    <strong>Quadro delle istanze di riferimento.</strong> Miglior valore costruttivo e bound duale:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>problema</th>
    <th>miglior valore euristico</th>
    <th>bound duale</th>
    <th>gap</th>
    <th><span class="arithmatex">\(z(I)\)</span></th>
    </tr>
    <tr>
    <td>KP (max)</td>
    <td><span class="arithmatex">\(17\)</span> (<span class="arithmatex">\(GR_p\)</span>)</td>
    <td><span class="arithmatex">\(\mathrm{UB}(I)=17\)</span></td>
    <td><span class="arithmatex">\(0\%\)</span></td>
    <td><span class="arithmatex">\(17\)</span></td>
    </tr>
    <tr>
    <td>BPP (min)</td>
    <td><span class="arithmatex">\(3\)</span> (FFD, BFD)</td>
    <td><span class="arithmatex">\(\mathrm{LB}(I)=3\)</span></td>
    <td><span class="arithmatex">\(0\%\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(P\,||\,C_{\max}\)</span> (min)</td>
    <td><span class="arithmatex">\(11\)</span> (<span class="arithmatex">\(LPT\)</span>)</td>
    <td><span class="arithmatex">\(\mathrm{LB}(I)=9\)</span></td>
    <td><span class="arithmatex">\(22.2\%\)</span></td>
    <td><span class="arithmatex">\(9\)</span></td>
    </tr>
    <tr>
    <td>TSP (min)</td>
    <td><span class="arithmatex">\(18\)</span> (multi-start <span class="arithmatex">\(NN\)</span>, <span class="arithmatex">\(NI\)</span>, <span class="arithmatex">\(FI\)</span>, <span class="arithmatex">\(CI\)</span>)</td>
    <td><span class="arithmatex">\(\mathrm{LB}(I)=17\)</span></td>
    <td><span class="arithmatex">\(5.9\%\)</span></td>
    <td><span class="arithmatex">\(18\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Euristiche costruttive](../../esercizi/constructive-heuristics.md)

