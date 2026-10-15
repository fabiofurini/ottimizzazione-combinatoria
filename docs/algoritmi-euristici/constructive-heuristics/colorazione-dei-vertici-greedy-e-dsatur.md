---
title: "Colorazione dei vertici: greedy e DSATUR"
---

# 30.8 Colorazione dei vertici: greedy e DSATUR { #sez-sec-VCPgreedy }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 30** · [:material-book-open-variant: Capitolo 30: Euristiche costruttive](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-presentation: Slide (1/2)](../../pdf/slide-constructive-heuristics-1.pdf) · [:material-presentation: Slide (2/2)](../../pdf/slide-constructive-heuristics-2.pdf) · [:material-pencil: Esercizi: Euristiche costruttive](../../esercizi/constructive-heuristics.md) · [:material-gesture-tap: App: Euristiche per il bin packing](../../laboratorio/euristiche-bin-packing.md) · [:material-gesture-tap: App: List scheduling e LPT](../../laboratorio/list-scheduling-lpt.md) · [:material-gesture-tap: App: Colorazione: greedy e DSATUR](../../laboratorio/colorazione-greedy-dsatur.md) · [:material-gesture-tap: App: TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md)

</div>

- Il problema di questa sezione è il [problema della colorazione dei vertici (VCP)](../../problemi-di-ottimizzazione-combinatoria/coloring/il-problema-della-colorazione-dei-vertici.md): la sua definizione e le sue ipotesi sono nella sua pagina. Il grafo è $G=(V,E)$, e il valore ottimo è il numero cromatico $\chi(G)$.

## 30.8.1 La colorazione greedy { #sez-sec-GC }

!!! chiave ""

    Il <em>Greedy Coloring Algorithm</em> (indicato con $GC$) è un'euristica costruttiva per il VCP. I colori sono gli interi $1,2,3,\dots$; l'algoritmo esamina i vertici nell'ordine di una lista data $\lambda$ e dà a ogni vertice il colore minimo non usato dai suoi vicini già colorati.

!!! algoritmo "Algoritmo: Colorazione greedy"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> istanza del VCP <span class="arithmatex">\(G=(V,E)\)</span> con <span class="arithmatex">\(n\)</span> vertici; lista <span class="arithmatex">\(\lambda[1..n]\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> assegnamento vertici-colori <span class="arithmatex">\(col[1..n]\)</span> e numero di colori <span class="arithmatex">\(nc\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> GreedyColoring(<span class="arithmatex">\(n, E, \lambda\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(col := \text{nuovo vettore}[1..n]\)</span>, con tutte le componenti <span class="arithmatex">\(0\)</span> <span class="pc-com">▹ <span class="arithmatex">\(0\)</span> = non ancora colorato</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(k := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><span class="arithmatex">\(v := \lambda[k]\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><span class="arithmatex">\(U := \{\, col[u] : u \in N(v),\ col[u] \neq 0 \,\}\)</span>
    <span class="arithmatex">\(col[v] \leftarrow \min\{\, c\in\Z_{\ge1} : c \notin U \,\}\)</span> <span class="pc-com">▹ colori dei vicini colorati colore libero minimo</span></div><div class="pc" style="--liv:1"><span class="pc-n">6</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">7</span><strong>return</strong> <span class="arithmatex">\(col\)</span>, <span class="arithmatex">\(nc = \max_v col[v]\)</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- Le classi di colore $Q_c=\{v : col[v]=c\}$ sono insiemi stabili per costruzione, quindi $GC$ restituisce sempre una colorazione ammissibile. Richiede tempo $O(n+|E|)$.

- Come $LIST$, $GC$ dipende dall'ordine della lista, e l'ordine può fare una grande differenza.

<a id="box-16-ex-gc"></a>

!!! esempio "Esempio 30.12: $GC$ sul grafo di Petersen, due ordini"

    ![Figura 10](../../img/constructive-heuristics/fig10.svg){ .fig loading=lazy  }

    <strong>Lista $\lambda=(1,2,\dots,10)$.</strong> I colori dei vicini colorati $U$ e il colore assegnato sono:

    $$
    \begin{array}{c|cccccccccc}
    \hline {v} & {1} & {2} & {3} & {4} & {5} & {6} & {7} & {8} & {9} & {10} \\
    \hline {U} & {\emptyset} & {\{1\}} & {\{2\}} & {\{1\}} & {\{1,2\}} & {\{1\}} & {\{2\}} & {\{1,2\}} & {\{1,2\}} & {\{1,3\}} \\
    {col[v]} & {1} & {2} & {1} & {2} & {3} & {2} & {1} & {3} & {3} & {2} \\
    \hline
    \end{array}
    $$

    $GC$ usa $3$ colori (rosso $=1$, blu $=2$, giallo $=3$ nella figura). Il $5$-ciclo esterno $1,2,3,4,5$ è un ciclo dispari e richiede $3$ colori, quindi $\chi(G)=3$ e questa colorazione è ottima.

    <strong>Lista $\lambda=(1,2,3,4,5,7,8,6,9,10)$.</strong> I primi cinque vertici ricevono gli stessi colori di prima; poi

    $$
    \begin{array}{c|ccccc}
    \hline {v} & {7} & {8} & {6} & {9} & {10} \\
    \hline {U} & {\{2\}} & {\{1\}} & {\{1,2\}} & {\{1,2,3\}} & {\{1,2,3\}} \\
    {col[v]} & {1} & {2} & {3} & {4} & {4} \\
    \hline
    \end{array}
    $$

    e $GC$ usa $4$ colori: il vertice $8$ prende il colore $2$, che il primo ordine dava al vertice $6$, e i vertici $9$ e $10$ vedono allora tutti e tre i colori fra i loro vicini.

## 30.8.2 DSATUR { #sez-sec-DSATUR }

!!! chiave ""

    Il <em>DSATUR Algorithm</em> (Degree of SATURation, indicato con $DSATUR$) è un'euristica costruttiva per il VCP. Non usa una lista fissa: a ogni passo colora, con il colore libero minimo, un vertice non colorato di <strong>grado di saturazione</strong> massimo, cioè con il maggior numero di colori <em>diversi</em> fra i suoi vicini; i pareggi si risolvono con il grado massimo nel sottografo dei vertici non colorati, e poi con l'indice minimo.

!!! algoritmo "Algoritmo: DSATUR"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> istanza del VCP <span class="arithmatex">\(G=(V,E)\)</span> con <span class="arithmatex">\(n\)</span> vertici</div><div class="pc" style="--liv:0"><strong>Output:</strong> assegnamento vertici-colori <span class="arithmatex">\(col[1..n]\)</span> e numero di colori <span class="arithmatex">\(nc\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> DSATUR(<span class="arithmatex">\(n, E\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(col := \text{nuovo vettore}[1..n]\)</span>, con tutte le componenti <span class="arithmatex">\(0\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(k := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><strong>for</strong> ogni <span class="arithmatex">\(u\)</span> non colorato <strong>do</strong></div><div class="pc" style="--liv:3"><span class="pc-n">5</span><span class="arithmatex">\(sat[u] \leftarrow |\{\, col[w] : w\in N(u),\ col[w]\neq0 \,\}|\)</span>
    <span class="arithmatex">\(du[u] \leftarrow |\{\, w\in N(u) : col[w]=0 \,\}|\)</span> <span class="pc-com">▹ grado di saturazione grado fra i non colorati</span></div><div class="pc" style="--liv:2"><span class="pc-n">6</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">7</span><span class="arithmatex">\(v :=\)</span> il vertice non colorato che massimizza <span class="arithmatex">\((sat[v], du[v])\)</span> in ordine lessicografico (indice minimo)</div><div class="pc" style="--liv:2"><span class="pc-n">8</span><span class="arithmatex">\(col[v] \leftarrow \min\{\, c\in\Z_{\ge1} : c \neq col[w]~\forall w\in N(v) \,\}\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">9</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">10</span><strong>return</strong> <span class="arithmatex">\(col\)</span>, <span class="arithmatex">\(nc = \max_v col[v]\)</span></div></div>

- <strong>Perché il grado di saturazione.</strong> Un vertice con molti colori diversi intorno ha pochi colori rimasti: se lo rimandiamo, può restare senza nessuno dei colori già in uso. $DSATUR$ colora prima i vertici più vincolati, la stessa idea di “prima gli oggetti più difficili” di FFD e $LPT$, ma aggiornata dinamicamente dopo ogni assegnamento.

- $DSATUR$ è $GC$ con una lista costruita al volo, quindi ogni proprietà di $GC$ che vale per ogni lista vale anche per $DSATUR$. Un'implementazione diretta richiede tempo $O(n^2)$.

<a id="box-17-ex-dsatur"></a>

!!! esempio "Esempio 30.13: $DSATUR$ sul grafo di Petersen"

    Tutti i vertici hanno grado $3$. Il vertice scelto a ogni passo, il suo grado di saturazione, il suo grado fra i vertici non colorati e il suo colore sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>passo</th>
    <th><span class="arithmatex">\(1\)</span></th>
    <th><span class="arithmatex">\(2\)</span></th>
    <th><span class="arithmatex">\(3\)</span></th>
    <th><span class="arithmatex">\(4\)</span></th>
    <th><span class="arithmatex">\(5\)</span></th>
    <th><span class="arithmatex">\(6\)</span></th>
    <th><span class="arithmatex">\(7\)</span></th>
    <th><span class="arithmatex">\(8\)</span></th>
    <th><span class="arithmatex">\(9\)</span></th>
    <th><span class="arithmatex">\(10\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(v\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(sat[v]\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(du[v]\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(col[v]\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    </table></div>

    Al passo $1$ tutti i vertici sono in pareggio e si sceglie il vertice $1$. Al passo $2$ i vertici $2$, $5$, $6$ hanno grado di saturazione $1$ e due vicini non colorati ciascuno: si sceglie l'indice minimo, $2$. Al passo $7$ il vertice $8$ (vicini $3$ e $6$, colori $1$ e $2$) ha grado di saturazione $2$ e passa prima del vertice $7$. $DSATUR$ usa $3=\chi(G)$ colori, la stessa colorazione di $GC$ con la lista $(1,2,\dots,10)$.

## 30.8.3 Che cosa garantisce la colorazione greedy

<a id="box-18-prop-GCDelta"></a>

!!! teorema "Proposizione 30.5"

    Per ogni grafo $G$ e ogni lista $\lambda$,

    $$
    GC(I) \;\le\; \Delta(G)+1 .
    $$

??? dimostrazione "Dimostrazione"

    Quando si colora il vertice $v$, l'insieme $U$ dei colori dei suoi vicini colorati ha al più $\deg(v)\le\Delta(G)$ elementi, quindi uno dei colori $1,2,\dots,\Delta(G)+1$ non è in $U$, e il colore libero minimo è al più $\Delta(G)+1$. <span class="qed">□</span>

- Il bound vale anche per $DSATUR$, che è $GC$ con una lista particolare, ed è raggiunto dai grafi completi ($\Delta=n-1$, $\chi=n$) e dai cicli dispari ($\Delta=2$, $\chi=3$), qualunque sia la lista.

- <em>Non</em> è una garanzia di prestazione: confronta $GC(I)$ con $\Delta(G)+1$, non con $\chi(G)$, e $\Delta(G)+1$ può essere molto più grande di $\chi(G)$. La prossima proposizione mostra che una cattiva lista può davvero imporre così tanti colori a un grafo che ne richiede solo due.

- D'altra parte, <strong>qualche</strong> lista è sempre ottima: se $Q_1,\dots,Q_{\chi(G)}$ sono le classi di colore di una colorazione ottima, $GC$ con prima i vertici di $Q_1$, poi quelli di $Q_2$, e così via, dà a ogni vertice di $Q_c$ un colore al più $c$, quindi usa al più $\chi(G)$ colori. La difficoltà sta tutta nel trovare la lista.

<a id="box-19-prop-crown"></a>

!!! teorema "Proposizione 30.6"

    Per ogni $k\ge3$ esistono un grafo $G_k$ con $n=2k$ vertici, $\chi(G_k)=2$ e $\Delta(G_k)=k-1$, e una lista $\lambda$, tali che

    $$
    GC(I_k) \;=\; k \;=\; \frac{n}{2} .
    $$

??? dimostrazione "Dimostrazione"

    $G_k$ è il <strong>grafo corona</strong>: i vertici sono $u_1,\dots,u_k$ e $v_1,\dots,v_k$, e $u_i$ è adiacente a $v_j$ se e solo se $i\neq j$ (il grafo bipartito completo $K_{k,k}$ privato di un matching perfetto). È bipartito, con almeno un arco, quindi $\chi(G_k)=2$; ogni vertice ha grado $k-1$. La lista è $\lambda=(u_1,v_1,u_2,v_2,\dots,u_k,v_k)$.

    Mostriamo per induzione su $i$ che $GC$ dà il colore $i$ sia a $u_i$ sia a $v_i$. Per $i=1$ nessun vicino è colorato quando si esamina $u_1$, e $v_1$ non è adiacente a $u_1$: entrambi ricevono il colore $1$. Quando si esamina $u_i$, i suoi vicini colorati sono $v_1,\dots,v_{i-1}$, con colori $1,\dots,i-1$ per induzione, quindi $u_i$ riceve il colore $i$; quando si esamina $v_i$, i suoi vicini colorati sono $u_1,\dots,u_{i-1}$ ($u_i$ non è un vicino), con colori $1,\dots,i-1$, quindi anche $v_i$ riceve il colore $i$. Quindi $GC(I_k)=k$. <span class="qed">□</span>

- Sui grafi corona $\frac{GC(I_k)}{\chi(G_k)}=\frac{k}{2}=\frac{n}{4}$, che cresce senza limite: con una lista arbitraria, $GC$ non ha una garanzia di prestazione costante. La lista $(u_1,\dots,u_k,v_1,\dots,v_k)$, prima le classi di colore, dà $2$ colori.

- I grafi corona soddisfano le ipotesi del VCP per $k\ge3$: nessun vertice isolato, e $N(u_i)=\{v_j:j\neq i\}$ non è contenuto in $N(u_{i'})$ né in alcun $N(v_j)\subseteq\{u_1,\dots,u_k\}$.

<a id="box-20-ex-crown"></a>

!!! esempio "Esempio 30.14: $GC$ e $DSATUR$ sul grafo corona $G_4$"

    Numeriamo i vertici $u_i=2i-1$ e $v_i=2i$, così che $u_1,v_1,\dots,u_4,v_4$ siano $1,2,\dots,8$, e $E=\{\{2i-1,2j\}: i\neq j\}$, con $12$ archi.

    ![Figura 11](../../img/constructive-heuristics/fig11.svg){ .fig loading=lazy  }

    Con la lista $(1,2,\dots,8)=(u_1,v_1,\dots,u_4,v_4)$, $GC$ usa $4$ colori, uno per ogni coppia $\{u_i,v_i\}$ (come in figura); con la lista $(1,3,5,7,2,4,6,8)$ usa $2$ colori.

    $DSATUR$ sceglie il vertice $1$ ($u_1$, colore $1$), poi i vertici $4$, $5$, $2$, $3$, $6$, $7$, $8$, con colori $2,1,2,1,2,1,2$: i vertici $u_i$ ricevono il colore $1$ e i vertici $v_i$ il colore $2$, e $DSATUR$ usa $2=\chi(G_4)$ colori. Dopo il primo passo, ogni vertice adiacente a un vertice colorato ha grado di saturazione $1$, e il vertice scelto sta sempre dal lato opposto all'ultimo colorato.

## 30.8.4 DSATUR come euristica

- Sui grafi bipartiti $DSATUR$ usa sempre al più $2$ colori, come sui grafi corona; questo è dimostrato nell'articolo che lo ha introdotto (Brélaz, 1979).

- Sui grafi generali $DSATUR$ non ha una garanzia di prestazione, poiché il VCP non è approssimabile. È comunque una delle euristiche costruttive più usate per il VCP, perché sulla maggior parte dei grafi usa pochi colori in più di $\chi(G)$, spesso nessuno; è anche la base di algoritmi esatti di branch-and-bound per il VCP, che fanno branching sul vertice scelto dalla regola di $DSATUR$.

---

**Avanti:** [30.9 Costruzione randomizzata](costruzione-randomizzata.md)
