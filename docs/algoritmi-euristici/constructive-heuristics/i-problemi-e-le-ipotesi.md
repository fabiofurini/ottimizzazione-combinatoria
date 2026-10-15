---
title: "I problemi e le ipotesi · Il paradigma greedy"
---

# I problemi e le ipotesi · Il paradigma greedy

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 30** · [:material-book-open-variant: Capitolo 30: Euristiche costruttive](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-presentation: Slide (1/2)](../../pdf/slide-constructive-heuristics-1.pdf) · [:material-presentation: Slide (2/2)](../../pdf/slide-constructive-heuristics-2.pdf) · [:material-pencil: Esercizi: Euristiche costruttive](../../esercizi/constructive-heuristics.md) · [:material-gesture-tap: App: Euristiche per il bin packing](../../laboratorio/euristiche-bin-packing.md) · [:material-gesture-tap: App: List scheduling e LPT](../../laboratorio/list-scheduling-lpt.md) · [:material-gesture-tap: App: Colorazione: greedy e DSATUR](../../laboratorio/colorazione-greedy-dsatur.md) · [:material-gesture-tap: App: TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md)

</div>

## 30.2 I problemi e le ipotesi { #sez-sec-problems }

- Illustriamo le euristiche sui quattro problemi del capitolo [«Algoritmi euristici: definizioni»](../heuristics.md): il [problema dello zaino 0/1 (KP)](../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-0-1.md), il [problema del bin packing (BPP)](../../problemi-di-ottimizzazione-combinatoria/bin-packing/il-problema-del-bin-packing.md), il [problema del commesso viaggiatore (TSP)](../../problemi-di-ottimizzazione-combinatoria/tsp/il-problema-del-commesso-viaggiatore.md) e [$P\,||\,C_{\max}$](../../problemi-di-ottimizzazione-combinatoria/pcmax/scheduling-su-macchine-parallele-identiche.md); la colorazione greedy e $DSATUR$ si applicano al [problema della colorazione dei vertici (VCP)](../../problemi-di-ottimizzazione-combinatoria/coloring/il-problema-della-colorazione-dei-vertici.md). Le loro definizioni e ipotesi sono nelle rispettive pagine; qui richiamiamo la notazione.

- Come nelle altre note, $\mathscr{A}(I)$ indica il valore della soluzione calcolata dall'euristica $\mathscr{A}$ sull'istanza $I$, e $z(I)$ il valore ottimo. Per $P\,||\,C_{\max}$, $L_h=\sum_{j\in J_h}t_j$ è il <strong>carico</strong> della macchina $h$, e il vettore $mach$ memorizza la macchina $mach_j$ di ogni lavoro $j$; per il BPP, il vettore $bin$ memorizza il contenitore $bin_j$ di ogni oggetto $j$, e $rc$ indica una capacità residua.

- Gli esempi usano le quattro <strong>istanze di riferimento</strong> del capitolo [«Algoritmi euristici: definizioni»](../heuristics.md), di cui sono noti i valori ottimi:

<div class="tabella" markdown="0"><table>
<tr>
<th>problema</th>
<th>istanza di riferimento</th>
<th>ottimo</th>
</tr>
<tr>
<td>KP</td>
<td><span class="arithmatex">\(p=(10,7,6,4)\)</span>, <span class="arithmatex">\(w=(5,4,3,3)\)</span>, <span class="arithmatex">\(c=9\)</span></td>
<td><span class="arithmatex">\(\{1,2\}\)</span>, <span class="arithmatex">\(z(I)=17\)</span></td>
</tr>
<tr>
<td>BPP</td>
<td><span class="arithmatex">\(w=(4,4,5,3,2,3)\)</span>, <span class="arithmatex">\(c=7\)</span></td>
<td><span class="arithmatex">\(\{1,4\},\{2,6\},\{3,5\}\)</span>, <span class="arithmatex">\(z(I)=3\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(P\,||\,C_{\max}\)</span></td>
<td><span class="arithmatex">\(t=(5,5,4,4,3,3,3)\)</span>, <span class="arithmatex">\(m=3\)</span></td>
<td><span class="arithmatex">\(\{1,3\},\{2,4\},\{5,6,7\}\)</span>, <span class="arithmatex">\(z(I)=9\)</span></td>
</tr>
<tr>
<td>TSP</td>
<td><span class="arithmatex">\(5\)</span> città, distanze qui sotto</td>
<td><span class="arithmatex">\(\sigma=(1,3,5,2,4)\)</span>, <span class="arithmatex">\(z(I)=18\)</span></td>
</tr>
</table></div>

- Nelle figure, le cinque città dell'istanza di riferimento del TSP sono disegnate sempre nelle stesse posizioni, su un pentagono, nell'ordine $(1,3,5,2,4)$ del giro ottimo: il giro ottimo è quindi il bordo del pentagono, e ogni giro che usa una diagonale ne è visibilmente diverso. La figura riporta le distanze dell'istanza e, in grassetto, il suo giro ottimo.

$$
\begin{array}{c|ccccc}
\hline {d_{ij}} & {1} & {2} & {3} & {4} & {5} \\
\hline {1} & --- & {5} & {2} & {2} & {9} \\
{2} & {5} & --- & {4} & {3} & {4} \\
{3} & {2} & {4} & --- & {4} & {7} \\
{4} & {2} & {3} & {4} & --- & {7} \\
{5} & {9} & {4} & {7} & {7} & --- \\
\hline
\end{array}
$$

![Figura 1](../../img/constructive-heuristics/fig01.svg){ .fig loading=lazy  }

## 30.3 Il paradigma greedy { #sez-sec-greedy }

- Una soluzione di ciascuno dei quattro problemi è fatta di <strong>elementi</strong>: gli oggetti selezionati per lo zaino, gli assegnamenti degli oggetti ai contenitori e dei lavori alle macchine, gli archi di un giro. Un'euristica costruttiva parte dalla <strong>soluzione parziale</strong> vuota e aggiunge un elemento alla volta.

- A ogni passo bisogna rispondere a tre domande: <strong>quali elementi si possono aggiungere</strong> (i candidati), <strong>quale si aggiunge</strong> (il criterio di selezione) e <strong>se il risultato si può ancora completare in una soluzione ammissibile</strong> (il test di ammissibilità). Un'euristica <strong>greedy</strong> risponde alla seconda domanda nel modo più semplice: aggiunge il candidato che sembra migliore <em>adesso</em>, secondo un criterio che misura il beneficio immediato dell'elemento.

<a id="box-2-def-greedy"></a>

!!! definizione "Definizione 30.2: Algoritmo greedy"

    Un <strong>algoritmo greedy</strong> è un'euristica costruttiva che costruisce una soluzione selezionando ripetutamente, fra gli elementi candidati, il migliore secondo un <em>criterio di selezione</em>; l'elemento si aggiunge alla soluzione parziale se il test di ammissibilità lo consente, e si scarta altrimenti.

!!! chiave ""

    In un algoritmo greedy ogni decisione si prende una volta per tutte: <em>una scelta, una volta fatta, non si rivede mai</em>.

- Lo pseudocodice qui sotto è uno schema più che un algoritmo: l'insieme dei candidati, il criterio e il test sono le tre parti che ogni euristica di queste note definisce in modo specifico.

!!! algoritmo "Algoritmo: Schema greedy"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> un'istanza <span class="arithmatex">\(I\)</span>, l'insieme <span class="arithmatex">\(C\)</span> degli elementi delle soluzioni</div><div class="pc" style="--liv:0"><strong>Output:</strong> una soluzione ammissibile <span class="arithmatex">\(S\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> Greedy(<span class="arithmatex">\(I\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(S := \emptyset\)</span> <span class="pc-com">▹ soluzione parziale vuota</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>while</strong> <span class="arithmatex">\(C \neq \emptyset\)</span> <strong>and</strong> <span class="arithmatex">\(S\)</span> non è completa <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><span class="arithmatex">\(e :=\)</span> il migliore elemento di <span class="arithmatex">\(C\)</span> secondo il criterio di selezione</div><div class="pc" style="--liv:2"><span class="pc-n">5</span><span class="arithmatex">\(C \leftarrow C \setminus \{e\}\)</span> <span class="pc-com">▹ <span class="arithmatex">\(e\)</span> si esamina una sola volta</span></div><div class="pc" style="--liv:2"><span class="pc-n">6</span><strong>if</strong> <span class="arithmatex">\(S \cup \{e\}\)</span> supera il test di ammissibilità <strong>then</strong></div><div class="pc" style="--liv:3"><span class="pc-n">7</span><span class="arithmatex">\(S \leftarrow S \cup \{e\}\)</span> <span class="pc-com">▹ la scelta è definitiva</span></div><div class="pc" style="--liv:2"><span class="pc-n">8</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">9</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">10</span><strong>return</strong> <span class="arithmatex">\(S\)</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- <strong>L'ordine decide tutto.</strong> Lo schema esamina gli elementi nell'ordine indotto dal criterio di selezione, e un elemento rifiutato o accettato presto non si può riconsiderare dopo. Due euristiche greedy con gli stessi candidati e lo stesso test di ammissibilità, ma con criteri diversi, possono produrre soluzioni molto diverse: cambiare il criterio è la principale scelta di progetto.

- <strong>Criteri statici e dinamici.</strong> Un criterio è <em>statico</em> se il valore di un elemento non dipende dalla soluzione parziale: gli elementi si possono allora ordinare una sola volta all'inizio, e l'euristica scorre la lista ordinata (efficienza degli oggetti del KP, peso degli oggetti del BPP, tempo di esecuzione dei lavori). Un criterio è <em>dinamico</em> se il valore di un elemento cambia man mano che la soluzione cresce, e va ricalcolato a ogni passo (distanza dall'ultima città di un giro parziale, capacità residua dei contenitori, carico delle macchine).

- <strong>Miopia.</strong> Il criterio guarda solo all'effetto immediato di una scelta, non alle sue conseguenze sulle scelte ancora da fare. È ciò che rende veloci le euristiche greedy, ed è anche ciò che le fa fallire: una scelta buona adesso può costringere a scelte cattive dopo.

- <strong>Tempo di esecuzione.</strong> Con un criterio statico il tempo di esecuzione è di solito dominato dall'ordinamento, $O(n\log n)$, più il costo dei test di ammissibilità; con un criterio dinamico è il numero di passi per il costo di rivalutare i candidati, di solito $O(n^2)$ o $O(n^3)$.

- <strong>Quando il greedy è esatto.</strong> Per alcuni problemi un algoritmo greedy trova sempre una soluzione ottima: l'algoritmo di Kruskal per il problema dell'albero ricoprente di costo minimo esamina gli archi per costo non decrescente e accetta un arco se non chiude un ciclo; il problema dello zaino frazionario si risolve all'ottimo prendendo gli oggetti per efficienza non crescente. Per i quattro problemi NP-difficili di queste note nessun algoritmo greedy è esatto, e la domanda diventa <em>quale</em> criterio dà buone soluzioni.

- La tabella seguente mostra come si specifica lo schema per i quattro problemi; le sezioni successive li studiano uno per uno.

<div class="tabella" markdown="0"><table>
<tr>
<th>problema</th>
<th>elemento</th>
<th>criterio di selezione</th>
<th>test di ammissibilità</th>
</tr>
<tr>
<td>KP</td>
<td>un oggetto</td>
<td>profitto, peso o efficienza (statico)</td>
<td>l'oggetto entra nella capacità residua</td>
</tr>
<tr>
<td>BPP</td>
<td>un oggetto e un contenitore</td>
<td>oggetto: ordine di input o peso (statico); contenitore: il primo, il più pieno, il più vuoto (dinamico)</td>
<td>l'oggetto entra nel contenitore</td>
</tr>
<tr>
<td><span class="arithmatex">\(P\,||\,C_{\max}\)</span></td>
<td>un lavoro e una macchina</td>
<td>lavoro: ordine di input o tempo di esecuzione (statico); macchina: la meno carica (dinamico)</td>
<td>sempre ammissibile</td>
</tr>
<tr>
<td>TSP</td>
<td>una città e la sua posizione</td>
<td>la più vicina, la più lontana, la più economica (dinamico)</td>
<td>sempre ammissibile</td>
</tr>
</table></div>

---

**Avanti:** [30.4 Il problema dello zaino 0/1: quale ordinamento?](il-problema-dello-zaino-0-1-quale-ordinamento.md)
