---
title: "Il problema dello zaino 0/1: quale ordinamento?"
---

# 30.4 Il problema dello zaino 0/1: quale ordinamento? { #sez-sec-KP }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 30** · [:material-book-open-variant: Capitolo 30: Euristiche costruttive](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-pencil: Esercizi: Euristiche costruttive](../../esercizi/constructive-heuristics.md) · [:material-gesture-tap: App: Euristiche per il bin packing](../../laboratorio/euristiche-bin-packing.md) · [:material-gesture-tap: App: List scheduling e LPT](../../laboratorio/list-scheduling-lpt.md) · [:material-gesture-tap: App: Colorazione: greedy e DSATUR](../../laboratorio/colorazione-greedy-dsatur.md) · [:material-gesture-tap: App: TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md)

</div>

- Per il KP gli elementi sono gli oggetti, e il test di ammissibilità è il vincolo di capacità: un oggetto si seleziona se il suo peso non supera la capacità residua $rc$. Poiché il test è fissato, un'euristica greedy per il KP è completamente determinata dall'<strong>ordine</strong> in cui si esaminano gli oggetti. Tre ordinamenti sono naturali:

!!! chiave ""

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>per <strong>profitto</strong> (<span class="arithmatex">\(GR_{p}\)</span>):</th>
    <th><span class="arithmatex">\(p_j\)</span> non crescente</th>
    <th>prima gli oggetti di maggior valore</th>
    </tr>
    <tr>
    <td>per <strong>peso</strong> (<span class="arithmatex">\(GR_{w}\)</span>):</td>
    <td><span class="arithmatex">\(w_j\)</span> non decrescente</td>
    <td>quanti più oggetti possibile</td>
    </tr>
    <tr>
    <td>per <strong>efficienza</strong> (<span class="arithmatex">\(GR\)</span>):</td>
    <td><span class="arithmatex">\(\dfrac{p_j}{w_j}\)</span> non crescente</td>
    <td>miglior valore per unità di peso</td>
    </tr>
    </table></div>

    I pareggi si risolvono a favore dell'oggetto con l'indice minimo.

- Il greedy per efficienza si indica con $GR$; qui lo confrontiamo con gli altri due ordinamenti.

!!! chiave ""

    L'<em>algoritmo greedy con ordinamento</em> $\rho$ è un'euristica costruttiva per il KP. Esamina gli oggetti nell'ordine $\rho=(\rho_1,\dots,\rho_n)$, una permutazione di $\mathscr{I}$, partendo dallo zaino vuoto, e seleziona ogni oggetto se e solo se entra nella capacità residua.

!!! algoritmo "Algoritmo: Greedy con ordinamento"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> istanza del KP con <span class="arithmatex">\(n\)</span> oggetti, profitti <span class="arithmatex">\(p[1..n]\)</span>, pesi <span class="arithmatex">\(w[1..n]\)</span>, capacità <span class="arithmatex">\(c\)</span>; ordinamento <span class="arithmatex">\(\rho[1..n]\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> soluzione ammissibile del KP <span class="arithmatex">\(x[1..n]\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> GreedyOrderKP(<span class="arithmatex">\(n, c, w, p, \rho\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><strong>for</strong> <span class="arithmatex">\(j := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">3</span><span class="arithmatex">\(x[j] \leftarrow 0\)</span> <span class="pc-com">▹ all'inizio l'oggetto <span class="arithmatex">\(j\)</span> non è selezionato</span></div><div class="pc" style="--liv:1"><span class="pc-n">4</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">5</span><span class="arithmatex">\(rc := c\)</span> <span class="pc-com">▹ capacità residua</span></div><div class="pc" style="--liv:1"><span class="pc-n">6</span><strong>for</strong> <span class="arithmatex">\(k := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">7</span><span class="arithmatex">\(j := \rho[k]\)</span> <span class="pc-com">▹ <span class="arithmatex">\(k\)</span>-esimo oggetto nell'ordinamento</span></div><div class="pc" style="--liv:2"><span class="pc-n">8</span><strong>if</strong> <span class="arithmatex">\(w[j] \le rc\)</span> <strong>then</strong></div><div class="pc" style="--liv:3"><span class="pc-n">9</span><span class="arithmatex">\(x[j] \leftarrow 1\)</span>
    <span class="arithmatex">\(rc \leftarrow rc - w[j]\)</span> <span class="pc-com">▹ selezionare l'oggetto <span class="arithmatex">\(j\)</span> aggiornare la capacità residua</span></div><div class="pc" style="--liv:2"><span class="pc-n">10</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">11</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">12</span><strong>return</strong> <span class="arithmatex">\(x\)</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- Le tre euristiche differiscono solo per l'ordinamento $\rho$, calcolato una sola volta ordinando gli oggetti in tempo $O(n\log n)$. Ogni criterio coglie un aspetto di una buona soluzione e ignora l'altro: il profitto ignora quanta capacità consuma un oggetto, il peso ignora quanto vale un oggetto, e l'efficienza bilancia i due, ma ignora quanto bene gli oggetti riempiono lo zaino.

<a id="box-3-ex-kp3"></a>

!!! esempio "Esempio 30.1: Tre ordinamenti sull'istanza di riferimento del KP"

    Sull'istanza di riferimento del KP ($c=9$) i tre ordinamenti sono

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>criterio</th>
    <th>valori</th>
    <th>ordinamento <span class="arithmatex">\(\rho\)</span></th>
    </tr>
    <tr>
    <td>profitto</td>
    <td><span class="arithmatex">\(p=(10,7,6,4)\)</span></td>
    <td><span class="arithmatex">\((1,2,3,4)\)</span></td>
    </tr>
    <tr>
    <td>peso</td>
    <td><span class="arithmatex">\(w=(5,4,3,3)\)</span></td>
    <td><span class="arithmatex">\((3,4,2,1)\)</span></td>
    </tr>
    <tr>
    <td>efficienza</td>
    <td><span class="arithmatex">\(\frac{p}{w}=\left(\frac{10}{5},\frac{7}{4},\frac{6}{3},\frac{4}{3}\right)=(2,\,1.75,\,2,\,1.33)\)</span></td>
    <td><span class="arithmatex">\((1,3,2,4)\)</span></td>
    </tr>
    </table></div>

    (gli oggetti $3$ e $4$ hanno lo stesso peso, gli oggetti $1$ e $3$ la stessa efficienza, e i pareggi si risolvono con l'indice). Le esecuzioni, con la capacità residua dopo ogni passo, sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th></th>
    <th>passo 1</th>
    <th>passo 2</th>
    <th>passo 3</th>
    <th>passo 4</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(GR_p\)</span></td>
    <td>oggetto <span class="arithmatex">\(1\)</span>: dentro, <span class="arithmatex">\(rc=4\)</span></td>
    <td>oggetto <span class="arithmatex">\(2\)</span>: dentro, <span class="arithmatex">\(rc=0\)</span></td>
    <td>oggetto <span class="arithmatex">\(3\)</span>: fuori</td>
    <td>oggetto <span class="arithmatex">\(4\)</span>: fuori</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(GR_w\)</span></td>
    <td>oggetto <span class="arithmatex">\(3\)</span>: dentro, <span class="arithmatex">\(rc=6\)</span></td>
    <td>oggetto <span class="arithmatex">\(4\)</span>: dentro, <span class="arithmatex">\(rc=3\)</span></td>
    <td>oggetto <span class="arithmatex">\(2\)</span>: fuori</td>
    <td>oggetto <span class="arithmatex">\(1\)</span>: fuori</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(GR\)</span></td>
    <td>oggetto <span class="arithmatex">\(1\)</span>: dentro, <span class="arithmatex">\(rc=4\)</span></td>
    <td>oggetto <span class="arithmatex">\(3\)</span>: dentro, <span class="arithmatex">\(rc=1\)</span></td>
    <td>oggetto <span class="arithmatex">\(2\)</span>: fuori</td>
    <td>oggetto <span class="arithmatex">\(4\)</span>: fuori</td>
    </tr>
    </table></div>

    Quindi

    $$
    GR_p(I)=p_1+p_2=17, \qquad GR_w(I)=p_3+p_4=10, \qquad GR(I)=p_1+p_3=16 .
    $$

    Il greedy per profitto trova la soluzione ottima $\{1,2\}$, che riempie esattamente lo zaino; il greedy per efficienza, dopo gli oggetti $1$ e $3$, resta con $rc=1$, troppo poco per qualunque altro oggetto; il greedy per peso prende i due oggetti leggeri, che sono anche quelli di minor valore.

- Su questa istanza vince il criterio “ingenuo”. Non è una regola generale: nessun ordinamento è il migliore su ogni istanza, e <strong>ciascuno dei tre ordinamenti può essere arbitrariamente cattivo</strong>. Sia $c\ge 3$:

    - <strong>profitto</strong>: un oggetto con $p_1=2$, $w_1=c$ e $c$ oggetti con $p_j=1$, $w_j=1$. $GR_p$ prende l'oggetto $1$, che riempie lo zaino: $GR_p(I)=2$, mentre i $c$ oggetti leggeri insieme danno $z(I)=c$;

    - <strong>peso</strong>: due oggetti con $p_1=1$, $w_1=1$ e $p_2=c$, $w_2=c$. $GR_w$ prende l'oggetto $1$ e l'oggetto $2$ non entra più: $GR_w(I)=1$, mentre $z(I)=c$;

    - <strong>efficienza</strong>: due oggetti con $p_1=2$, $w_1=1$ e $p_2=c$, $w_2=c$: qui $GR(I)=2$ e $z(I)=c$.

    In tutti e tre i casi il rapporto $\frac{z(I)}{\mathscr{A}(I)}$ cresce con $c$.

- Un rimedio è <strong>combinare</strong> due soluzioni: l'algoritmo Ext-Greedy $GR^e$ restituisce la migliore fra la soluzione di $GR$ e il miglior oggetto singolo, e questa semplice combinazione garantisce $\frac{z(I)}{GR^e(I)}\le 2$. Eseguire più euristiche greedy e tenere la soluzione migliore è un modo generale ed economico per proteggersi dalla debolezza di ogni singolo criterio.

---

**Avanti:** [30.5 Il problema del bin packing: prima ordinare, poi riempire](il-problema-del-bin-packing-prima-ordinare-poi-riempire.md)
