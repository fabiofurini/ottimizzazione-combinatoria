---
title: "Che cosa danno le euristiche costruttive, e che cosa non danno"
---

# 30.11 Che cosa danno le euristiche costruttive, e che cosa non danno { #sez-sec-WHAT }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 30** · [:material-book-open-variant: Capitolo 30: Euristiche costruttive](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-presentation: Slide (1/2)](../../pdf/slide-constructive-heuristics-1.pdf) · [:material-presentation: Slide (2/2)](../../pdf/slide-constructive-heuristics-2.pdf) · [:material-pencil: Esercizi: Euristiche costruttive](../../esercizi/constructive-heuristics.md) · [:material-gesture-tap: App: Euristiche per il bin packing](../../laboratorio/euristiche-bin-packing.md) · [:material-gesture-tap: App: List scheduling e LPT](../../laboratorio/list-scheduling-lpt.md) · [:material-gesture-tap: App: Colorazione: greedy e DSATUR](../../laboratorio/colorazione-greedy-dsatur.md) · [:material-gesture-tap: App: TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md)

</div>

- La tabella raccoglie i risultati sulle quattro istanze di riferimento, con i bound duali del capitolo [«Algoritmi euristici: definizioni»](../heuristics.md) ($\UB$ per il KP, $\LB$ per gli altri problemi) e il gap della migliore soluzione euristica.

<div class="tabella" markdown="0"><table>
<tr>
<th>problema</th>
<th>euristica</th>
<th>valori</th>
<th>bound duale</th>
<th>gap</th>
<th><span class="arithmatex">\(z(I)\)</span></th>
</tr>
<tr>
<td>KP</td>
<td><span class="arithmatex">\(GR_p\)</span>, <span class="arithmatex">\(GR\)</span>, <span class="arithmatex">\(GR_w\)</span></td>
<td><span class="arithmatex">\(17\)</span>, <span class="arithmatex">\(16\)</span>, <span class="arithmatex">\(10\)</span></td>
<td><span class="arithmatex">\(\UB=17\)</span></td>
<td><span class="arithmatex">\(0\%\)</span></td>
<td><span class="arithmatex">\(17\)</span></td>
</tr>
<tr>
<td>BPP</td>
<td>FF, FFD, BFD</td>
<td><span class="arithmatex">\(4\)</span>, <span class="arithmatex">\(3\)</span>, <span class="arithmatex">\(3\)</span></td>
<td><span class="arithmatex">\(\LB=3\)</span></td>
<td><span class="arithmatex">\(0\%\)</span></td>
<td><span class="arithmatex">\(3\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(P\,||\,C_{\max}\)</span></td>
<td><span class="arithmatex">\(LIST\)</span> (lista inversa), <span class="arithmatex">\(LPT\)</span></td>
<td><span class="arithmatex">\(12\)</span>, <span class="arithmatex">\(11\)</span></td>
<td><span class="arithmatex">\(\LB=9\)</span></td>
<td><span class="arithmatex">\(22.2\%\)</span></td>
<td><span class="arithmatex">\(9\)</span></td>
</tr>
<tr>
<td>TSP</td>
<td><span class="arithmatex">\(NN\)</span>, multi-start <span class="arithmatex">\(NN\)</span>, <span class="arithmatex">\(NI\)</span>, <span class="arithmatex">\(FI\)</span>, <span class="arithmatex">\(CI\)</span></td>
<td><span class="arithmatex">\(25\)</span>, <span class="arithmatex">\(18\)</span>, <span class="arithmatex">\(18\)</span>, <span class="arithmatex">\(18\)</span>, <span class="arithmatex">\(18\)</span></td>
<td><span class="arithmatex">\(\LB=17\)</span></td>
<td><span class="arithmatex">\(5.9\%\)</span></td>
<td><span class="arithmatex">\(18\)</span></td>
</tr>
</table></div>

- <strong>Un bound primale, e niente di più.</strong> Un'euristica costruttiva restituisce una soluzione ammissibile, e il suo valore è un bound primale. Per il KP e il BPP il miglior valore euristico coincide con il bound duale, e la soluzione è <em>dimostrata</em> ottima; per il TSP il giro di lunghezza $18$ è ottimo, ma il bound duale $17$ non può dimostrarlo; per $P\,||\,C_{\max}$ il gap del $22.2\%$ è reale. L'euristica stessa non sa mai in quale di queste situazioni si trova.

- <strong>Una scelta non si rivede mai.</strong> Ogni euristica di queste note si ferma appena la soluzione è completa, e ogni decisione presa lungo il percorso è definitiva. Nello schedule di $LPT$, il lavoro $7$ va sulla macchina $1$ quando i tre carichi sono uguali, e il makespan $11$ è fissato in quel momento; nel giro di $NN$ dalla città $1$, l'arco $(5,1)$ di lunghezza $9$ è la conseguenza delle primissime scelte. Guardando il diagramma di Gantt o il giro, una soluzione migliore sembra vicina; ma un'euristica costruttiva non ha alcun meccanismo per tornare indietro.

- <strong>L'ordine decide tutto.</strong> Gli esempi di queste note mostrano la stessa lezione su quattro problemi: ordinare gli elementi nell'ordine giusto (efficienza, pesi decrescenti, prima i lavori più lunghi) è la principale scelta di progetto; tuttavia nessun ordine è il migliore su ogni istanza ([Esempio 30.1](il-problema-dello-zaino-0-1-quale-ordinamento.md#box-3-ex-kp3), [Esempio 30.4](il-problema-del-bin-packing-prima-ordinare-poi-riempire.md#box-6-ex-ffdworse)), ed eseguire più ordini, più punti di partenza o più costruzioni randomizzate, tenendo la soluzione migliore, è una protezione economica ed efficace.

- <strong>Economiche, e utili come punto di partenza.</strong> Le euristiche costruttive sono veloci, e raramente si usano da sole: le loro soluzioni sono i punti di partenza dei metodi che cercano di migliorare una soluzione completa.

!!! chiave ""

    Un'euristica costruttiva costruisce una soluzione, un elemento alla volta, scegliendo a ogni passo l'elemento che sembra migliore adesso. L'ordine delle scelte decide la qualità del risultato, e una scelta, una volta fatta, non si rivede mai.

---

**Avanti:** [Errori tipici · In sintesi](errori-tipici.md)
