---
title: "TSP: 2-opt e Or-opt"
---

# 31.7 TSP: 2-opt e Or-opt { #sez-sec-tsp }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 31** · [:material-book-open-variant: Capitolo 31: Ricerca locale](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-presentation: Slide (1/2)](../../pdf/slide-local-search-1.pdf) · [:material-presentation: Slide (2/2)](../../pdf/slide-local-search-2.pdf) · [:material-pencil: Esercizi: Ricerca locale](../../esercizi/local-search.md) · [:material-gesture-tap: App: TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md)

</div>

## 31.7.1 La ricerca locale 2-opt

!!! chiave ""

    La ricerca locale <em>2-opt</em> (indicata con $2OPT$) è una ricerca locale per il TSP con l'intorno 2-opt. A ogni iterazione valuta le mosse 2-opt del giro corrente con la formula incrementale, applica una mossa migliorante scelta con la regola first improvement o best improvement, e si ferma quando nessuna mossa accorcia il giro.

!!! algoritmo "Algoritmo: Passo 2-opt"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> <span class="arithmatex">\(n\)</span> città, distanze <span class="arithmatex">\(d[1..n][1..n]\)</span>, giro <span class="arithmatex">\(\sigma[1..n]\)</span> con <span class="arithmatex">\(\sigma[1]=1\)</span>, regola <span class="arithmatex">\(\in\{\textit{first},\textit{best}\}\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> <em>true</em> se a <span class="arithmatex">\(\sigma\)</span> è stata applicata una mossa 2-opt migliorante, <em>false</em> altrimenti</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> TwoOptStep(<span class="arithmatex">\(n, d, \sigma, \textit{rule}\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(\bar\Delta := 0\)</span>
    <span class="arithmatex">\((\bar\imath, \bar\jmath) := (0,0)\)</span> <span class="pc-com">▹ miglior variazione di lunghezza trovata finora miglior mossa trovata finora</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(i := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n-2\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><strong>for</strong> <span class="arithmatex">\(j := i+2\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:3"><span class="pc-n">5</span><strong>if</strong> <span class="arithmatex">\(i=1\)</span> <strong>and</strong> <span class="arithmatex">\(j=n\)</span> <strong>then</strong> <strong>continue</strong> <span class="pc-com">▹ i due lati sono adiacenti</span></div><div class="pc" style="--liv:3"><span class="pc-n">6</span><span class="arithmatex">\(u_1 := \sigma[i]\)</span>; <span class="arithmatex">\(v_1 := \sigma[i+1]\)</span>
    <span class="arithmatex">\(u_2 := \sigma[j]\)</span>; <span class="arithmatex">\(v_2 := \sigma[j \bmod n+1]\)</span>
    <span class="arithmatex">\(\Delta := d[u_1][u_2]+d[v_1][v_2]-d[u_1][v_1]-d[u_2][v_2]\)</span> <span class="pc-com">▹ primo lato tolto secondo lato tolto</span></div><div class="pc" style="--liv:3"><span class="pc-n">7</span><strong>if</strong> <span class="arithmatex">\(\Delta < \bar\Delta\)</span> <strong>then</strong></div><div class="pc" style="--liv:4"><span class="pc-n">8</span><span class="arithmatex">\(\bar\Delta \leftarrow \Delta\)</span>; <span class="arithmatex">\((\bar\imath,\bar\jmath) \leftarrow (i,j)\)</span> <span class="pc-com">▹ mossa migliorante</span></div><div class="pc" style="--liv:4"><span class="pc-n">9</span><strong>if</strong> <span class="arithmatex">\(\textit{rule}=\textit{first}\)</span> <strong>then</strong></div><div class="pc" style="--liv:5"><span class="pc-n">10</span><strong>uscire</strong> da entrambi i cicli</div><div class="pc" style="--liv:4"><span class="pc-n">11</span><strong>end</strong></div><div class="pc" style="--liv:3"><span class="pc-n">12</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">13</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">14</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">15</span><strong>if</strong> <span class="arithmatex">\(\bar\imath = 0\)</span> <strong>then</strong> <strong>return</strong> <em>false</em> <span class="pc-com">▹ nessuna mossa migliorante: ottimo locale</span></div><div class="pc" style="--liv:1"><span class="pc-n">16</span>invertire il cammino <span class="arithmatex">\(\sigma[\bar\imath+1], \dots, \sigma[\bar\jmath]\)</span> <span class="pc-com">▹ applicare la mossa</span></div><div class="pc" style="--liv:1"><span class="pc-n">17</span><strong>return</strong> <em>true</em></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- Nell'implementazione, $\textit{Improve}$ e lo spostamento sul vicino migliorante sono riuniti in un'unica funzione $\textit{Step}$, che esplora l'intorno con la valutazione incrementale e, se trova una mossa migliorante, la applica alla soluzione corrente e restituisce <em>true</em>; altrimenti restituisce <em>false</em>. $LS$ chiama $\textit{Step}$ finché non restituisce <em>false</em>.

- $2OPT$ è $\textit{LocalSearch}$ con $\textit{TwoOptStep}$; non cambia mai $\sigma[1]=1$, perché $i\ge 1$ e il cammino invertito parte dalla posizione $i+1\ge 2$.

- Un'iterazione costa tempo $O(n^2)$; l'inversione del cammino costa $O(n)$.

- Quando le distanze sono euclidee, un ottimo locale 2-opt non ha lati che si incrociano: se i lati $\{u_1,v_1\}$ e $\{u_2,v_2\}$ si incrociano in un punto $X$, la disuguaglianza triangolare dà $d_{u_1u_2}\le d_{u_1X}+d_{Xu_2}$ e $d_{v_1v_2}\le d_{v_1X}+d_{Xv_2}$, quindi $\Delta\le 0$, con $\Delta<0$ a meno che le quattro città non siano allineate. La mossa 2-opt “scioglie” l'incrocio dei due lati.

<a id="box-5-ex-twooptref"></a>

!!! esempio "Esempio 31.2: $2OPT$ sull'istanza di riferimento del TSP"

    Partiamo dal giro di $NN$ dalla città $1$, $\sigma=(1,3,2,4,5)$, di lunghezza $25$. Le sue $5$ mosse sono

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">\((i,j)\)</span></th>
    <th>lati tolti</th>
    <th>lati aggiunti</th>
    <th><span class="arithmatex">\(\Delta\)</span></th>
    <th>nuovo giro, lunghezza</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\((1,3)\)</span></td>
    <td><span class="arithmatex">\(\{1,3\},\{2,4\}\)</span></td>
    <td><span class="arithmatex">\(\{1,2\},\{3,4\}\)</span></td>
    <td><span class="arithmatex">\(5+4-2-3=+4\)</span></td>
    <td><span class="arithmatex">\((1,2,3,4,5)\)</span>, <span class="arithmatex">\(29\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((1,4)\)</span></td>
    <td><span class="arithmatex">\(\{1,3\},\{4,5\}\)</span></td>
    <td><span class="arithmatex">\(\{1,4\},\{3,5\}\)</span></td>
    <td><span class="arithmatex">\(2+7-2-7=0\)</span></td>
    <td><span class="arithmatex">\((1,4,2,3,5)\)</span>, <span class="arithmatex">\(25\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((2,4)\)</span></td>
    <td><span class="arithmatex">\(\{3,2\},\{4,5\}\)</span></td>
    <td><span class="arithmatex">\(\{3,4\},\{2,5\}\)</span></td>
    <td><span class="arithmatex">\(4+4-4-7=-3\)</span></td>
    <td><span class="arithmatex">\((1,3,4,2,5)\)</span>, <span class="arithmatex">\(22\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((2,5)\)</span></td>
    <td><span class="arithmatex">\(\{3,2\},\{5,1\}\)</span></td>
    <td><span class="arithmatex">\(\{3,5\},\{2,1\}\)</span></td>
    <td><span class="arithmatex">\(7+5-4-9=-1\)</span></td>
    <td><span class="arithmatex">\((1,3,5,4,2)\)</span>, <span class="arithmatex">\(24\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((3,5)\)</span></td>
    <td><span class="arithmatex">\(\{2,4\},\{5,1\}\)</span></td>
    <td><span class="arithmatex">\(\{2,5\},\{4,1\}\)</span></td>
    <td><span class="arithmatex">\(4+2-3-9=-6\)</span></td>
    <td><span class="arithmatex">\((1,3,2,5,4)\)</span>, <span class="arithmatex">\(19\)</span></td>
    </tr>
    </table></div>

    <strong>First improvement</strong> accetta la mossa $(2,4)$, la prima con $\Delta<0$, dopo $3$ valutazioni: $\sigma=(1,3,4,2,5)$, di lunghezza $22$. Le sue mosse hanno $\Delta=+1,+6,+3,-4,0$; la mossa $(2,5)$, che toglie $\{3,4\}$ e $\{5,1\}$ e aggiunge $\{3,5\}$ e $\{4,1\}$, è accettata dopo $4$ valutazioni: $\sigma=(1,3,5,2,4)$, di lunghezza $18$. Tutte le sue $5$ mosse hanno $\Delta>0$ ($+7,+4,+1,+4,+6$): la ricerca si ferma dopo $3+4+5=12$ valutazioni.

    <strong>Best improvement</strong> accetta la mossa $(3,5)$, con $\Delta=-6$: $\sigma=(1,3,2,5,4)$, di lunghezza $19$. Le sue mosse hanno $\Delta=+6,+4,-1,+3,+6$, e la mossa $(2,4)$, che toglie $\{3,2\}$ e $\{5,4\}$ e aggiunge $\{3,5\}$ e $\{2,4\}$, dà $\sigma=(1,3,5,2,4)$, di lunghezza $18$. La ricerca si ferma dopo $5+5+5=15$ valutazioni.

    Entrambe le regole raggiungono il giro ottimo, con $2$ mosse ciascuna. La figura mostra i due percorsi; le città sono disposte nell'ordine del giro ottimo, quindi il giro ottimo è il bordo del pentagono (l'istanza non è euclidea: il disegno è solo uno schema). I lati rossi tratteggiati sono tolti, quelli blu sono aggiunti.

    ![Figura 3](../../img/local-search/fig03.svg){ .fig loading=lazy  }

## 31.7.2 La ricerca locale Or-opt

!!! chiave ""

    La ricerca locale <em>Or-opt</em> (indicata con $OROPT$) è una ricerca locale per il TSP con l'intorno Or-opt. A ogni iterazione valuta, con la formula incrementale, l'inserimento di ogni segmento di $1$, $2$ o $3$ città consecutive fra altre due città consecutive, applica una mossa migliorante scelta con la regola first improvement o best improvement, e si ferma quando nessuna mossa accorcia il giro.

!!! algoritmo "Algoritmo: Passo Or-opt"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> <span class="arithmatex">\(n\)</span> città, distanze <span class="arithmatex">\(d[1..n][1..n]\)</span>, giro <span class="arithmatex">\(\sigma[1..n]\)</span> con <span class="arithmatex">\(\sigma[1]=1\)</span>, regola <span class="arithmatex">\(\in\{\textit{first},\textit{best}\}\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> <em>true</em> se a <span class="arithmatex">\(\sigma\)</span> è stata applicata una mossa Or-opt migliorante, <em>false</em> altrimenti</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> OrOptStep(<span class="arithmatex">\(n, d, \sigma, \textit{rule}\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(\bar\Delta := 0\)</span>; <span class="arithmatex">\((\bar\ell,\bar\imath,\bar k) := (0,0,0)\)</span> <span class="pc-com">▹ miglior mossa trovata finora</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(\ell := 1\)</span> <strong>to</strong> <span class="arithmatex">\(3\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><strong>for</strong> <span class="arithmatex">\(i := 2\)</span> <strong>to</strong> <span class="arithmatex">\(n-\ell+1\)</span> <strong>do</strong></div><div class="pc" style="--liv:3"><span class="pc-n">5</span><span class="arithmatex">\(p := \sigma[i-1]\)</span>; <span class="arithmatex">\(s_1 := \sigma[i]\)</span>
    <span class="arithmatex">\(s_\ell := \sigma[i+\ell-1]\)</span>; <span class="arithmatex">\(q := \sigma[(i+\ell-1) \bmod n+1]\)</span> <span class="pc-com">▹ predecessore, prima città del segmento ultima città, successore</span></div><div class="pc" style="--liv:3"><span class="pc-n">6</span><strong>for</strong> <span class="arithmatex">\(k := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:4"><span class="pc-n">7</span><strong>if</strong> <span class="arithmatex">\(i-1 \le k \le i+\ell-1\)</span> <strong>then</strong> <strong>continue</strong> <span class="pc-com">▹ stesso posto, o dentro il segmento</span></div><div class="pc" style="--liv:4"><span class="pc-n">8</span><span class="arithmatex">\(a := \sigma[k]\)</span>; <span class="arithmatex">\(b := \sigma[k \bmod n+1]\)</span>
    <span class="arithmatex">\(\Delta := d[p][q]+d[a][s_1]+d[s_\ell][b]-d[p][s_1]-d[s_\ell][q]-d[a][b]\)</span> <span class="pc-com">▹ lato in cui va il segmento</span></div><div class="pc" style="--liv:4"><span class="pc-n">9</span><strong>if</strong> <span class="arithmatex">\(\Delta < \bar\Delta\)</span> <strong>then</strong></div><div class="pc" style="--liv:5"><span class="pc-n">10</span><span class="arithmatex">\(\bar\Delta \leftarrow \Delta\)</span>; <span class="arithmatex">\((\bar\ell,\bar\imath,\bar k) \leftarrow (\ell,i,k)\)</span> <span class="pc-com">▹ mossa migliorante</span></div><div class="pc" style="--liv:5"><span class="pc-n">11</span><strong>if</strong> <span class="arithmatex">\(\textit{rule}=\textit{first}\)</span> <strong>then</strong></div><div class="pc" style="--liv:6"><span class="pc-n">12</span><strong>uscire</strong> dai tre cicli</div><div class="pc" style="--liv:5"><span class="pc-n">13</span><strong>end</strong></div><div class="pc" style="--liv:4"><span class="pc-n">14</span><strong>end</strong></div><div class="pc" style="--liv:3"><span class="pc-n">15</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">16</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">17</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">18</span><strong>if</strong> <span class="arithmatex">\(\bar\ell = 0\)</span> <strong>then</strong> <strong>return</strong> <em>false</em> <span class="pc-com">▹ nessuna mossa migliorante: ottimo locale</span></div><div class="pc" style="--liv:1"><span class="pc-n">19</span>spostare <span class="arithmatex">\(\sigma[\bar\imath],\dots,\sigma[\bar\imath+\bar\ell-1]\)</span> fra <span class="arithmatex">\(\sigma[\bar k]\)</span> e <span class="arithmatex">\(\sigma[\bar k \bmod n+1]\)</span> <span class="pc-com">▹ applicare</span></div><div class="pc" style="--liv:1"><span class="pc-n">20</span><strong>return</strong> <em>true</em></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- Or-opt sposta un breve tratto del giro in un posto migliore, senza invertire nulla: è l'intorno naturale quando alcune città sono state “lasciate indietro” dalla costruzione. Un'iterazione costa tempo $O(n^2)$.

- Un ottimo locale 2-opt non è necessariamente un ottimo locale Or-opt, e viceversa: i due intorni contengono mosse diverse.

## 31.7.3 First e best improvement su un'istanza media

- Con $5$ città l'intorno 2-opt è piccolo ed entrambe le regole raggiungono l'ottimo. Per vedere la differenza fra le due regole, e il ruolo di Or-opt, usiamo un'istanza media con $10$ città. Questa istanza non è metrica: $d_{68}=8>d_{67}+d_{78}=4+3$ e $d_{6,10}=11>d_{67}+d_{7,10}=4+6$.

<a id="box-6-ex-tsp10"></a>

!!! esempio "Esempio 31.3: Un'istanza del TSP con $10$ città"

    Le città hanno coordinate intere, e $d_{ij}$ è la distanza euclidea arrotondata all'intero più vicino:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>città</th>
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
    <td>coordinate</td>
    <td><span class="arithmatex">\((1,1)\)</span></td>
    <td><span class="arithmatex">\((3,8)\)</span></td>
    <td><span class="arithmatex">\((6,10)\)</span></td>
    <td><span class="arithmatex">\((10,9)\)</span></td>
    <td><span class="arithmatex">\((13,6)\)</span></td>
    <td><span class="arithmatex">\((12,1)\)</span></td>
    <td><span class="arithmatex">\((8,3)\)</span></td>
    <td><span class="arithmatex">\((5,4)\)</span></td>
    <td><span class="arithmatex">\((8,7)\)</span></td>
    <td><span class="arithmatex">\((2,5)\)</span></td>
    </tr>
    </table></div>

    $$
    \begin{array}{c|cccccccccc}
    \hline {d_{ij}} & {1} & {2} & {3} & {4} & {5} & {6} & {7} & {8} & {9} & {10} \\
    \hline {1} & --- & {7} & {10} & {12} & {13} & {11} & {7} & {5} & {9} & {4} \\
    {2} & {7} & --- & {4} & {7} & {10} & {11} & {7} & {4} & {5} & {3} \\
    {3} & {10} & {4} & --- & {4} & {8} & {11} & {7} & {6} & {4} & {6} \\
    {4} & {12} & {7} & {4} & --- & {4} & {8} & {6} & {7} & {3} & {9} \\
    {5} & {13} & {10} & {8} & {4} & --- & {5} & {6} & {8} & {5} & {11} \\
    {6} & {11} & {11} & {11} & {8} & {5} & --- & {4} & {8} & {7} & {11} \\
    {7} & {7} & {7} & {7} & {6} & {6} & {4} & --- & {3} & {4} & {6} \\
    {8} & {5} & {4} & {6} & {7} & {8} & {8} & {3} & --- & {4} & {3} \\
    {9} & {9} & {5} & {4} & {3} & {5} & {7} & {4} & {4} & --- & {6} \\
    {10} & {4} & {3} & {6} & {9} & {11} & {11} & {6} & {3} & {6} & --- \\
    \hline
    \end{array}
    $$

    Fra i suoi $181\,440$ giri distinti, l'unico ottimo è $(1,10,2,3,9,4,5,6,7,8)$, di lunghezza $z(I)=39$. Il giro di $NN$ dalla città $1$ è $(1,10,2,3,4,9,7,8,5,6)$, di lunghezza $49$, e l'intorno 2-opt ha $\frac{10\cdot 7}{2}=35$ mosse.

    <strong>First improvement</strong> esegue $4$ mosse:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>lati tolti</th>
    <th>nuovo giro</th>
    <th><span class="arithmatex">\(\Delta\)</span></th>
    <th>lunghezza</th>
    <th>valutazioni</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\{3,4\},\{8,5\}\)</span></td>
    <td><span class="arithmatex">\((1,10,2,3,8,7,9,4,5,6)\)</span></td>
    <td><span class="arithmatex">\(-2\)</span></td>
    <td><span class="arithmatex">\(47\)</span></td>
    <td><span class="arithmatex">\(23\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\{3,8\},\{6,1\}\)</span></td>
    <td><span class="arithmatex">\((1,10,2,3,6,5,4,9,7,8)\)</span></td>
    <td><span class="arithmatex">\(-1\)</span></td>
    <td><span class="arithmatex">\(46\)</span></td>
    <td><span class="arithmatex">\(25\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\{3,6\},\{4,9\}\)</span></td>
    <td><span class="arithmatex">\((1,10,2,3,4,5,6,9,7,8)\)</span></td>
    <td><span class="arithmatex">\(-3\)</span></td>
    <td><span class="arithmatex">\(43\)</span></td>
    <td><span class="arithmatex">\(22\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\{6,9\},\{7,8\}\)</span></td>
    <td><span class="arithmatex">\((1,10,2,3,4,5,6,7,9,8)\)</span></td>
    <td><span class="arithmatex">\(-2\)</span></td>
    <td><span class="arithmatex">\(41\)</span></td>
    <td><span class="arithmatex">\(33\)</span></td>
    </tr>
    </table></div>

    e si ferma nell'ottimo locale $(1,10,2,3,4,5,6,7,9,8)$, di lunghezza $41$, dopo $138$ valutazioni in totale (le ultime $35$ per certificare l'ottimo locale).

    <strong>Best improvement</strong> esegue $3$ mosse:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>lati tolti</th>
    <th>nuovo giro</th>
    <th><span class="arithmatex">\(\Delta\)</span></th>
    <th>lunghezza</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\{7,8\},\{6,1\}\)</span></td>
    <td><span class="arithmatex">\((1,10,2,3,4,9,7,6,5,8)\)</span></td>
    <td><span class="arithmatex">\(-5\)</span></td>
    <td><span class="arithmatex">\(44\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\{9,7\},\{5,8\}\)</span></td>
    <td><span class="arithmatex">\((1,10,2,3,4,9,5,6,7,8)\)</span></td>
    <td><span class="arithmatex">\(-4\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\{3,4\},\{9,5\}\)</span></td>
    <td><span class="arithmatex">\((1,10,2,3,9,4,5,6,7,8)\)</span></td>
    <td><span class="arithmatex">\(-1\)</span></td>
    <td><span class="arithmatex">\(39\)</span></td>
    </tr>
    </table></div>

    e si ferma nel giro ottimo dopo $4\cdot 35=140$ valutazioni.

    Dallo stesso giro di partenza, le due regole si fermano in <strong>ottimi locali diversi</strong>, dopo quasi lo stesso numero di valutazioni. Fra tutti i $181\,440$ giri, solo $3$ sono ottimi locali 2-opt, di lunghezza $39$, $41$ e $43$.

    ![Figura 4](../../img/local-search/fig04.svg){ .fig loading=lazy  }

<a id="box-7-ex-oropt"></a>

!!! esempio "Esempio 31.4: $OROPT$ da un ottimo locale 2-opt"

    Sull'istanza dell'[Esempio 31.3](#box-6-ex-tsp10), first improvement si è fermato nell'ottimo locale 2-opt $\sigma=(1,10,2,3,4,5,6,7,9,8)$, di lunghezza $41$. La mossa Or-opt che prende il segmento $(9)$, con $\ell=1$, fra $p=7$ e $q=8$, e lo inserisce fra $a=3$ e $b=4$ ha

    $$
    \Delta = d_{78}+d_{39}+d_{94}-d_{79}-d_{98}-d_{34} = 3+4+3-4-4-4 = -2 .
    $$

    È la prima mossa migliorante trovata, dopo $60$ valutazioni, e anche la migliore delle $170$ mosse. Il nuovo giro $(1,10,2,3,9,4,5,6,7,8)$, di lunghezza $39$, è ottimo. Fra tutti i $181\,440$ giri, solo $3$ sono ottimi locali Or-opt, di lunghezza $39$, $43$ e $44$, e solo il giro ottimo è un ottimo locale sia per 2-opt sia per Or-opt.

## 31.7.4 3-opt e Lin–Kernighan

- L'intorno <strong>3-opt</strong> toglie tre lati e ricollega i tre cammini in tutti i modi possibili (Lin, 1965). I suoi ottimi locali sono migliori di quelli di 2-opt, ma un'iterazione costa tempo $O(n^3)$, e in pratica l'intorno si esplora solo in parte.

- L'euristica di <strong>Lin–Kernighan</strong> (Lin, Kernighan, <em>Operations Research</em> 21, 1973) costruisce un numero <em>variabile</em> $k$ di scambi di lati, uno alla volta, scegliendo ogni scambio in modo greedy e fermandosi quando il guadagno totale non può più diventare positivo. Esplora parte dell'intorno $k$-opt per ogni $k$, in un tempo vicino a quello di 2-opt, e le sue implementazioni sono fra le migliori euristiche per il TSP.

- La sequenza 2-opt, 3-opt, $k$-opt mostra il compromesso del capitolo [«Algoritmi euristici: definizioni»](../heuristics.md): un intorno più grande ha ottimi locali migliori, e costa di più da esplorare.

---

**Avanti:** [31.8 $P\,||\,C_{\max}$: move e swap](p-cmax-move-e-swap.md)
