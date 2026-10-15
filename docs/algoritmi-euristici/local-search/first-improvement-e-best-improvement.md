---
title: "First improvement e best improvement"
---

# 31.5 First improvement e best improvement { #sez-sec-firstbest }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 31** · [:material-book-open-variant: Capitolo 31: Ricerca locale](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-presentation: Slide (1/2)](../../pdf/slide-local-search-1.pdf) · [:material-presentation: Slide (2/2)](../../pdf/slide-local-search-2.pdf) · [:material-pencil: Esercizi: Ricerca locale](../../esercizi/local-search.md) · [:material-gesture-tap: App: TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md)

</div>

- La funzione $\textit{Improve}$ di $LS$ può fermarsi al <em>primo</em> vicino migliorante che trova, oppure esaminare tutto l'intorno e restituire il vicino <em>migliore</em>. Gli pseudocodici sono scritti per un problema di minimizzazione; per un problema di massimizzazione, “$<$” diventa “$>$”.

## 31.5.1 First improvement

!!! chiave ""

    La regola <em>first improvement</em> esamina i vicini della soluzione corrente in un ordine fissato e restituisce il primo vicino migliore della soluzione corrente. Se nessun vicino è migliore, restituisce $\textit{NULL}$.

!!! algoritmo "Algoritmo: First improvement"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> una soluzione ammissibile <span class="arithmatex">\(x\)</span>, un intorno <span class="arithmatex">\(N\)</span>, una funzione obiettivo <span class="arithmatex">\(f\)</span> (da minimizzare)</div><div class="pc" style="--liv:0"><strong>Output:</strong> il primo vicino <span class="arithmatex">\(y\in N(x)\)</span> con <span class="arithmatex">\(f(y)<f(x)\)</span>, oppure <span class="arithmatex">\(\textit{NULL}\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> FirstImprovement(<span class="arithmatex">\(x, N, f\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><strong>for</strong> <span class="arithmatex">\(y \in N(x)\)</span>, nell'ordine dell'intorno <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">3</span><strong>if</strong> <span class="arithmatex">\(f(y) < f(x)\)</span> <strong>then</strong></div><div class="pc" style="--liv:3"><span class="pc-n">4</span><strong>return</strong> <span class="arithmatex">\(y\)</span> <span class="pc-com">▹ vicino migliorante: accettarlo subito</span></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">6</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">7</span><strong>return</strong> <span class="arithmatex">\(\textit{NULL}\)</span> <span class="pc-com">▹ <span class="arithmatex">\(x\)</span> è un ottimo locale</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

## 31.5.2 Best improvement

!!! chiave ""

    La regola <em>best improvement</em> esamina tutti i vicini della soluzione corrente e restituisce il migliore, se è migliore della soluzione corrente; i pareggi si risolvono a favore del vicino esaminato per primo. Se nessun vicino è migliore, restituisce $\textit{NULL}$.

!!! algoritmo "Algoritmo: Best improvement"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> una soluzione ammissibile <span class="arithmatex">\(x\)</span>, un intorno <span class="arithmatex">\(N\)</span>, una funzione obiettivo <span class="arithmatex">\(f\)</span> (da minimizzare)</div><div class="pc" style="--liv:0"><strong>Output:</strong> un vicino migliore <span class="arithmatex">\(y\in N(x)\)</span> se <span class="arithmatex">\(f(y)<f(x)\)</span>, altrimenti <span class="arithmatex">\(\textit{NULL}\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> BestImprovement(<span class="arithmatex">\(x, N, f\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(\bar y := \textit{NULL}\)</span>
    <span class="arithmatex">\(\bar f := f(x)\)</span> <span class="pc-com">▹ miglior vicino migliorante trovato finora il suo valore</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(y \in N(x)\)</span>, nell'ordine dell'intorno <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><strong>if</strong> <span class="arithmatex">\(f(y) < \bar f\)</span> <strong>then</strong></div><div class="pc" style="--liv:3"><span class="pc-n">5</span><span class="arithmatex">\(\bar y \leftarrow y\)</span>
    <span class="arithmatex">\(\bar f \leftarrow f(y)\)</span> <span class="pc-com">▹ migliore di tutti i vicini visti finora</span></div><div class="pc" style="--liv:2"><span class="pc-n">6</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">7</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">8</span><strong>return</strong> <span class="arithmatex">\(\bar y\)</span> <span class="pc-com">▹ NULL se <span class="arithmatex">\(x\)</span> è un ottimo locale</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

## 31.5.3 Confronto

- In un ottimo locale entrambe le regole esaminano tutto l'intorno: l'ultima iterazione costa lo stesso.

- Prima di raggiungerlo, <strong>first improvement</strong> esegue iterazioni <strong>meno costose</strong>, perché si ferma al primo vicino migliorante, ma ogni mossa di solito migliora meno, quindi tende a eseguire <strong>più</strong> mosse. <strong>Best improvement</strong> esegue la discesa più ripida: ogni iterazione costa un'esplorazione completa dell'intorno, e ogni mossa migliora il più possibile.

- Le due regole seguono percorsi diversi, quindi possono fermarsi in <strong>ottimi locali diversi</strong>. Nessuna delle due regole è migliore dell'altra su tutte le istanze: la mossa più ripida ora può portare in una valle peggiore dopo.

- Con first improvement il risultato dipende dall'ordine in cui sono esaminati i vicini; rendere casuale quell'ordine è un modo semplice per ottenere ottimi locali diversi dalla stessa soluzione di partenza.

<a id="box-3-ex-kpfirstbest"></a>

!!! esempio "Esempio 31.1: First e best improvement sul KP"

    Partiamo dalla soluzione del greedy per peso $GR_w$ sull'istanza di riferimento del KP ($c=9$), cioè $x=(0,0,1,1)$, di peso $6$ e profitto $10$, con l'intorno flip+swap. I vicini sono esaminati nell'ordine della Sezione [31.4](ricerca-locale-lo-schema.md#sez-sec-neigh):

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>mossa</th>
    <th>vicino</th>
    <th>peso</th>
    <th>profitto</th>
    <th></th>
    </tr>
    <tr>
    <td>flip <span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\((1,0,1,1)\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td>—</td>
    <td>non ammissibile</td>
    </tr>
    <tr>
    <td>flip <span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\((0,1,1,1)\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td>—</td>
    <td>non ammissibile</td>
    </tr>
    <tr>
    <td>flip <span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\((0,0,0,1)\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td></td>
    </tr>
    <tr>
    <td>flip <span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\((0,0,1,0)\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td></td>
    </tr>
    <tr>
    <td>swap <span class="arithmatex">\(3\)</span> fuori, <span class="arithmatex">\(1\)</span> dentro</td>
    <td><span class="arithmatex">\((1,0,0,1)\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(14\)</span></td>
    <td><span class="arithmatex">\(\leftarrow\)</span> first improvement</td>
    </tr>
    <tr>
    <td>swap <span class="arithmatex">\(3\)</span> fuori, <span class="arithmatex">\(2\)</span> dentro</td>
    <td><span class="arithmatex">\((0,1,0,1)\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td></td>
    </tr>
    <tr>
    <td>swap <span class="arithmatex">\(4\)</span> fuori, <span class="arithmatex">\(1\)</span> dentro</td>
    <td><span class="arithmatex">\((1,0,1,0)\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td><span class="arithmatex">\(\leftarrow\)</span> best improvement</td>
    </tr>
    <tr>
    <td>swap <span class="arithmatex">\(4\)</span> fuori, <span class="arithmatex">\(2\)</span> dentro</td>
    <td><span class="arithmatex">\((0,1,1,0)\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(13\)</span></td>
    <td></td>
    </tr>
    </table></div>

    <strong>First improvement</strong> accetta $(1,0,0,1)$, di profitto $14$, dopo aver esaminato $3$ vicini ammissibili. Da $(1,0,0,1)$ (peso $8$) i vicini sono esaminati di nuovo dall'inizio:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>mossa</th>
    <th>vicino</th>
    <th>peso</th>
    <th>profitto</th>
    <th></th>
    </tr>
    <tr>
    <td>flip <span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\((0,0,0,1)\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td></td>
    </tr>
    <tr>
    <td>flip <span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\((1,1,0,1)\)</span></td>
    <td><span class="arithmatex">\(12\)</span></td>
    <td>—</td>
    <td>non ammissibile</td>
    </tr>
    <tr>
    <td>flip <span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\((1,0,1,1)\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td>—</td>
    <td>non ammissibile</td>
    </tr>
    <tr>
    <td>flip <span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\((1,0,0,0)\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td></td>
    </tr>
    <tr>
    <td>swap <span class="arithmatex">\(1\)</span> fuori, <span class="arithmatex">\(2\)</span> dentro</td>
    <td><span class="arithmatex">\((0,1,0,1)\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td></td>
    </tr>
    <tr>
    <td>swap <span class="arithmatex">\(1\)</span> fuori, <span class="arithmatex">\(3\)</span> dentro</td>
    <td><span class="arithmatex">\((0,0,1,1)\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td></td>
    </tr>
    <tr>
    <td>swap <span class="arithmatex">\(4\)</span> fuori, <span class="arithmatex">\(2\)</span> dentro</td>
    <td><span class="arithmatex">\((1,1,0,0)\)</span></td>
    <td><span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\(17\)</span></td>
    <td><span class="arithmatex">\(\leftarrow\)</span> first improvement</td>
    </tr>
    </table></div>

    e $(1,1,0,0)$, di profitto $17$, è accettata dopo $5$ vicini ammissibili. È la soluzione ottima, quindi nessun vicino è migliore: i $6$ vicini ammissibili sono esaminati e la ricerca si ferma. In totale: $2$ mosse, $3+5+6=14$ vicini ammissibili esaminati.

    <strong>Best improvement</strong> esamina tutti i $6$ vicini ammissibili di $(0,0,1,1)$ e si sposta su $(1,0,1,0)$, di profitto $16$. È la soluzione di $GR$, il cui intorno è nel capitolo «Algoritmi euristici: definizioni»: il vicino migliore è $(1,1,0,0)$, di profitto $17$, raggiunto con lo swap “$3$ fuori, $2$ dentro”. La ricerca si ferma lì dopo aver esaminato i suoi $6$ vicini ammissibili. In totale: $2$ mosse, $6+6+6=18$ vicini ammissibili esaminati.

    Le due regole raggiungono l'ottimo lungo percorsi diversi, $10\to14\to17$ e $10\to16\to17$, e first improvement esamina meno vicini. Il solo intorno flip non si sarebbe mosso affatto: da $(0,0,1,1)$ ogni flip ammissibile toglie un oggetto, quindi $(0,0,1,1)$, di profitto $10$, è un ottimo locale per flip.

---

**Avanti:** [31.6 Valutare una mossa in modo incrementale](valutare-una-mossa-in-modo-incrementale.md)
