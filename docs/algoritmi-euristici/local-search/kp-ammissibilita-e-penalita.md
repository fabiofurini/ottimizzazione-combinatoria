---
title: "KP: ammissibilità e penalità"
---

# 31.10 KP: ammissibilità e penalità { #sez-sec-kp }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 31** · [:material-book-open-variant: Capitolo 31: Ricerca locale](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-presentation: Slide (1/2)](../../pdf/slide-local-search-1.pdf) · [:material-presentation: Slide (2/2)](../../pdf/slide-local-search-2.pdf) · [:material-pencil: Esercizi: Ricerca locale](../../esercizi/local-search.md) · [:material-gesture-tap: App: TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md)

</div>

- La rappresentazione del KP con un vettore binario $x$ descrive anche oggetti non ammissibili, il cui peso supera la capacità. Ci sono due modi di trattarli:

    1. <strong>restare ammissibili</strong>: l'intorno contiene solo i vicini ammissibili, come fatto finora;

    2. <strong>penalizzare</strong>: i vettori non ammissibili sono ammessi, e la ricerca massimizza una funzione che sottrae dal profitto una penalità proporzionale al peso in eccesso.

- Restare ammissibili può rendere la ricerca miope. Nel capitolo [«Algoritmi euristici: definizioni»](../heuristics.md), $x=(1,0,1,0)$ è un ottimo locale per flip: per raggiungere la soluzione ottima $(1,1,0,0)$ con i flip occorre aggiungere l'oggetto $2$ e togliere l'oggetto $3$, e il vettore intermedio è o $(1,1,1,0)$, non ammissibile, o $(1,0,0,0)$, di profitto $10<16$. L'intorno swap risolve questo caso eseguendo i due flip insieme; le penalità lo risolvono lasciando che la ricerca passi attraverso il vettore non ammissibile.

- Con le penalità, lo spazio di ricerca è l'intero insieme $\{0,1\}^n$, e la funzione da massimizzare è

!!! chiave ""

    $$
    g_\alpha(x) \;=\; \sum_{j\in\mathscr{I}} p_j x_j \;-\; \alpha\cdot\max\Big\{0,\ \sum_{j\in\mathscr{I}} w_jx_j-c\Big\},
    $$

    dove $\alpha>0$ è la <strong>penalità</strong> per ogni unità di peso in eccesso. Per un $x$ ammissibile, $g_\alpha(x)$ è il profitto di $x$.

## 31.10.1 Restare ammissibili

!!! chiave ""

    La ricerca locale <em>flip+swap</em> per il KP esamina i flip e poi gli swap della soluzione corrente, scarta quelli che superano la capacità, ne applica uno migliorante scelto con la regola first improvement o best improvement, e si ferma quando nessun vicino ammissibile ha un profitto maggiore.

!!! algoritmo "Algoritmo: Passo flip+swap per il KP"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> <span class="arithmatex">\(n\)</span> oggetti, profitti <span class="arithmatex">\(p[1..n]\)</span>, pesi <span class="arithmatex">\(w[1..n]\)</span>, capacità <span class="arithmatex">\(c\)</span>, soluzione ammissibile <span class="arithmatex">\(x[1..n]\)</span>, regola</div><div class="pc" style="--liv:0"><strong>Output:</strong> <em>true</em> se a <span class="arithmatex">\(x\)</span> è stata applicata una mossa migliorante, <em>false</em> altrimenti</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> KPFlipSwapStep(<span class="arithmatex">\(n, p, w, c, x, \textit{rule}\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(W := \sum_{j=1}^n w[j]\,x[j]\)</span>
    <span class="arithmatex">\(\bar\Delta := 0\)</span>; <span class="arithmatex">\((\bar\jmath,\bar k) := (0,0)\)</span> <span class="pc-com">▹ peso della soluzione corrente miglior mossa trovata finora (<span class="arithmatex">\(\bar k=0\)</span>: flip)</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(j := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong> <span class="pc-com">▹ flip dell'oggetto <span class="arithmatex">\(j\)</span></span></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><span class="arithmatex">\(\Delta p := (1-2x[j])\,p[j]\)</span>; <span class="arithmatex">\(\Delta w := (1-2x[j])\,w[j]\)</span> <span class="pc-com">▹ togliere, o aggiungere, l'oggetto <span class="arithmatex">\(j\)</span></span></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><strong>if</strong> <span class="arithmatex">\(W+\Delta w \le c\)</span> <strong>and</strong> <span class="arithmatex">\(\Delta p > \bar\Delta\)</span> <strong>then</strong></div><div class="pc" style="--liv:3"><span class="pc-n">6</span><span class="arithmatex">\(\bar\Delta \leftarrow \Delta p\)</span>; <span class="arithmatex">\((\bar\jmath,\bar k) \leftarrow (j,0)\)</span></div><div class="pc" style="--liv:3"><span class="pc-n">7</span><strong>if</strong> <span class="arithmatex">\(\textit{rule}=\textit{first}\)</span> <strong>then</strong></div><div class="pc" style="--liv:4"><span class="pc-n">8</span><strong>uscire</strong> da tutti i cicli</div><div class="pc" style="--liv:3"><span class="pc-n">9</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">10</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">11</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">12</span><strong>for</strong> <span class="arithmatex">\(j := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> con <span class="arithmatex">\(x[j]=1\)</span> <strong>do</strong> <span class="pc-com">▹ swap: <span class="arithmatex">\(j\)</span> fuori, <span class="arithmatex">\(k\)</span> dentro</span></div><div class="pc" style="--liv:2"><span class="pc-n">13</span><strong>for</strong> <span class="arithmatex">\(k := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> con <span class="arithmatex">\(x[k]=0\)</span> <strong>do</strong></div><div class="pc" style="--liv:3"><span class="pc-n">14</span><span class="arithmatex">\(\Delta p := p[k]-p[j]\)</span>; <span class="arithmatex">\(\Delta w := w[k]-w[j]\)</span></div><div class="pc" style="--liv:3"><span class="pc-n">15</span><strong>if</strong> <span class="arithmatex">\(W+\Delta w \le c\)</span> <strong>and</strong> <span class="arithmatex">\(\Delta p > \bar\Delta\)</span> <strong>then</strong></div><div class="pc" style="--liv:4"><span class="pc-n">16</span><span class="arithmatex">\(\bar\Delta \leftarrow \Delta p\)</span>; <span class="arithmatex">\((\bar\jmath,\bar k) \leftarrow (j,k)\)</span></div><div class="pc" style="--liv:4"><span class="pc-n">17</span><strong>if</strong> <span class="arithmatex">\(\textit{rule}=\textit{first}\)</span> <strong>then</strong></div><div class="pc" style="--liv:5"><span class="pc-n">18</span><strong>uscire</strong> da tutti i cicli</div><div class="pc" style="--liv:4"><span class="pc-n">19</span><strong>end</strong></div><div class="pc" style="--liv:3"><span class="pc-n">20</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">21</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">22</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">23</span><strong>if</strong> <span class="arithmatex">\(\bar\jmath = 0\)</span> <strong>then</strong> <strong>return</strong> <em>false</em> <span class="pc-com">▹ nessuna mossa migliorante: ottimo locale</span></div><div class="pc" style="--liv:1"><span class="pc-n">24</span><span class="arithmatex">\(x[\bar\jmath] \leftarrow 1-x[\bar\jmath]\)</span> <span class="pc-com">▹ flip, oppure togliere l'oggetto che esce</span></div><div class="pc" style="--liv:1"><span class="pc-n">25</span><strong>if</strong> <span class="arithmatex">\(\bar k \ne 0\)</span> <strong>then</strong></div><div class="pc" style="--liv:2"><span class="pc-n">26</span><span class="arithmatex">\(x[\bar k] \leftarrow 1\)</span> <span class="pc-com">▹ aggiungere l'oggetto che entra</span></div><div class="pc" style="--liv:1"><span class="pc-n">27</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">28</span><strong>return</strong> <em>true</em></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- Con la regola first improvement, se si trova un flip migliorante gli swap non vengono esaminati. Solo i flip che <em>aggiungono</em> un oggetto possono migliorare il profitto; i flip che tolgono un oggetto restano nell'intorno per uniformità. Un'iterazione costa tempo $O(n^2)$, a causa degli swap.

## 31.10.2 Penalizzare il peso in eccesso

!!! chiave ""

    La ricerca locale <em>penalty flip</em> per il KP esamina i flip del vettore corrente, ammissibile o no, li valuta con $g_\alpha$, ne applica uno migliorante scelto con la regola first improvement o best improvement, e si ferma quando nessun flip aumenta $g_\alpha$.

!!! algoritmo "Algoritmo: Passo penalty flip per il KP"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> <span class="arithmatex">\(n\)</span> oggetti, profitti <span class="arithmatex">\(p[1..n]\)</span>, pesi <span class="arithmatex">\(w[1..n]\)</span>, capacità <span class="arithmatex">\(c\)</span>, penalità <span class="arithmatex">\(\alpha\)</span>, vettore <span class="arithmatex">\(x[1..n]\)</span>, regola</div><div class="pc" style="--liv:0"><strong>Output:</strong> <em>true</em> se a <span class="arithmatex">\(x\)</span> è stato applicato un flip migliorante, <em>false</em> altrimenti</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> KPPenaltyFlipStep(<span class="arithmatex">\(n, p, w, c, \alpha, x, \textit{rule}\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(P := \sum_{j=1}^n p[j]\,x[j]\)</span>; <span class="arithmatex">\(W := \sum_{j=1}^n w[j]\,x[j]\)</span>
    <span class="arithmatex">\(g := P - \alpha \max\{0, W-c\}\)</span>
    <span class="arithmatex">\(\bar\Delta := 0\)</span>; <span class="arithmatex">\(\bar\jmath := 0\)</span> <span class="pc-com">▹ profitto e peso di <span class="arithmatex">\(x\)</span> valore di <span class="arithmatex">\(x\)</span> miglior flip trovato finora</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(j := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><span class="arithmatex">\(P' := P+(1-2x[j])\,p[j]\)</span>; <span class="arithmatex">\(W' := W+(1-2x[j])\,w[j]\)</span>
    <span class="arithmatex">\(\Delta := P' - \alpha \max\{0, W'-c\} - g\)</span> <span class="pc-com">▹ flip dell'oggetto <span class="arithmatex">\(j\)</span> variazione di <span class="arithmatex">\(g_\alpha\)</span></span></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><strong>if</strong> <span class="arithmatex">\(\Delta > \bar\Delta\)</span> <strong>then</strong></div><div class="pc" style="--liv:3"><span class="pc-n">6</span><span class="arithmatex">\(\bar\Delta \leftarrow \Delta\)</span>; <span class="arithmatex">\(\bar\jmath \leftarrow j\)</span> <span class="pc-com">▹ flip migliorante</span></div><div class="pc" style="--liv:3"><span class="pc-n">7</span><strong>if</strong> <span class="arithmatex">\(\textit{rule}=\textit{first}\)</span> <strong>then</strong></div><div class="pc" style="--liv:4"><span class="pc-n">8</span><strong>uscire</strong> dal ciclo</div><div class="pc" style="--liv:3"><span class="pc-n">9</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">10</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">11</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">12</span><strong>if</strong> <span class="arithmatex">\(\bar\jmath = 0\)</span> <strong>then</strong> <strong>return</strong> <em>false</em> <span class="pc-com">▹ nessun flip migliorante: ottimo locale</span></div><div class="pc" style="--liv:1"><span class="pc-n">13</span><span class="arithmatex">\(x[\bar\jmath] \leftarrow 1-x[\bar\jmath]\)</span> <span class="pc-com">▹ applicare il flip</span></div><div class="pc" style="--liv:1"><span class="pc-n">14</span><strong>return</strong> <em>true</em></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- L'ottimo locale può essere non ammissibile. La ricerca deve quindi ricordare la <strong>migliore soluzione ammissibile</strong> visitata, che è la soluzione che restituisce.

<a id="box-14-ex-kppen"></a>

!!! esempio "Esempio 31.8: Penalità sull'istanza di riferimento del KP"

    Partiamo dalla soluzione di $GR$, $x=(1,0,1,0)$, di peso $8$ e profitto $16$, che è un ottimo locale per l'intorno flip ristretto alle soluzioni ammissibili. I valori $g_\alpha$ dei suoi quattro flip sono

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>flip</th>
    <th>vettore</th>
    <th>peso</th>
    <th>eccesso</th>
    <th><span class="arithmatex">\(\alpha=1\)</span></th>
    <th><span class="arithmatex">\(\alpha=2\)</span></th>
    <th><span class="arithmatex">\(\alpha=\frac94\)</span></th>
    <th><span class="arithmatex">\(\alpha=3\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\((0,0,1,0)\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\((1,1,1,0)\)</span></td>
    <td><span class="arithmatex">\(12\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(20\)</span></td>
    <td><span class="arithmatex">\(17\)</span></td>
    <td><span class="arithmatex">\(\frac{65}{4}\)</span></td>
    <td><span class="arithmatex">\(14\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\((1,0,0,0)\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\((1,0,1,1)\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(18\)</span></td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td><span class="arithmatex">\(\frac{31}{2}\)</span></td>
    <td><span class="arithmatex">\(14\)</span></td>
    </tr>
    </table></div>

    Le due regole eseguono le stesse mosse:

    - $\alpha=1$: la ricerca aggiunge l'oggetto $2$ ($g_1=20$), poi l'oggetto $4$ ($g_1=27-6=21$), e si ferma in $(1,1,1,1)$, di peso $15$: ogni suo flip toglie un oggetto e dà $16$, $18$, $18$ o $20$. La penalità è troppo piccola: l'ottimo locale non è ammissibile, e la migliore soluzione ammissibile visitata è quella di partenza, di profitto $16$.

    - $\alpha=2$: la ricerca aggiunge l'oggetto $2$ ($g_2=17>16$) e si ferma in $(1,1,1,0)$, non ammissibile: togliere l'oggetto $3$ dà $(1,1,0,0)$ con $g_2=17$, non strettamente migliore.

    - $\alpha=\frac94$: la ricerca aggiunge l'oggetto $2$ ($g=\frac{65}{4}=16.25>16$) e poi toglie l'oggetto $3$, raggiungendo $(1,1,0,0)$, di profitto $17$: la soluzione <strong>ottima</strong>, attraverso un vettore non ammissibile (si veda la figura).

    - $\alpha=3$: nessun flip migliora, e la ricerca si ferma subito in $(1,0,1,0)$, come la ricerca ammissibile.

    ![Figura 8](../../img/local-search/fig08.svg){ .fig loading=lazy  }

<a id="box-15-prop-penalty"></a>

!!! teorema "Proposizione 31.7"

    Siano i dati interi e sia $\alpha>\max_{j\in\mathscr{I}} p_j$. Allora:

    1. da un vettore ammissibile, nessun flip che produce un vettore non ammissibile aumenta $g_\alpha$;

    2. ogni vettore non ammissibile ha un flip che aumenta $g_\alpha$.

??? dimostrazione "Dimostrazione"

    (1) Se aggiungere l'oggetto $k$ a un vettore ammissibile produce un eccesso $e\ge1$, allora $g_\alpha$ varia di $p_k-\alpha e\le p_k-\alpha<0$. (2) Sia $x$ non ammissibile, con eccesso $e\ge 1$, e sia $j$ un oggetto selezionato. Togliere $j$ diminuisce l'eccesso di $\min\{w_j,e\}\ge 1$, quindi $g_\alpha$ varia di $-p_j+\alpha\min\{w_j,e\}\ge -p_j+\alpha>0$. <span class="qed">□</span>

- Con una penalità <strong>grande</strong> gli ottimi locali sono ammissibili, ma la ricerca non lascia mai la regione ammissibile; con una penalità <strong>piccola</strong> attraversa la regione non ammissibile, ma può fermarsi lì. I valori utili dipendono dall'istanza (qui $\frac94$ funziona, $1$, $2$ e $3$ no), quindi in pratica $\alpha$ si regola durante la ricerca: si aumenta finché la ricerca resta fra vettori non ammissibili, si diminuisce finché resta fra vettori ammissibili.

---

**Avanti:** [31.11 Variable neighbourhood descent](variable-neighbourhood-descent.md)
