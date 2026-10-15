---
title: "Costruzione randomizzata"
---

# 30.9 Costruzione randomizzata { #sez-sec-RCL }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 30** · [:material-book-open-variant: Capitolo 30: Euristiche costruttive](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-presentation: Slide (1/2)](../../pdf/slide-constructive-heuristics-1.pdf) · [:material-presentation: Slide (2/2)](../../pdf/slide-constructive-heuristics-2.pdf) · [:material-pencil: Esercizi: Euristiche costruttive](../../esercizi/constructive-heuristics.md) · [:material-gesture-tap: App: Euristiche per il bin packing](../../laboratorio/euristiche-bin-packing.md) · [:material-gesture-tap: App: List scheduling e LPT](../../laboratorio/list-scheduling-lpt.md) · [:material-gesture-tap: App: Colorazione: greedy e DSATUR](../../laboratorio/colorazione-greedy-dsatur.md) · [:material-gesture-tap: App: TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md)

</div>

- Un'euristica greedy è deterministica: eseguita due volte sulla stessa istanza, restituisce la stessa soluzione. Il $NN$ multi-start ottiene soluzioni diverse cambiando la città di partenza, ma il numero di partenze è limitato a $n$. Un modo più flessibile per ottenere molte soluzioni diverse, e comunque buone, è <strong>randomizzare la scelta</strong>: a ogni passo, invece del candidato migliore, si sceglie a caso uno dei candidati <em>buoni</em>.

- I candidati buoni formano la <strong>lista ristretta dei candidati</strong> (restricted candidate list, RCL). Per un criterio di minimo con valori $g(q)$ dei candidati $q$, siano $g^{\min}$ e $g^{\max}$ il valore minimo e il valore massimo; la RCL <em>basata sul valore</em> con parametro $\alpha\in[0,1]$ è

!!! chiave ""

    $$
    RCL \;=\; \Big\{\, q \;:\; g(q) \;\le\; g^{\min} + \alpha\,\big(g^{\max}-g^{\min}\big) \Big\} .
    $$

    Con $\alpha=0$ la RCL contiene solo i candidati migliori, e la costruzione è greedy (con pareggi risolti a caso); con $\alpha=1$ contiene tutti i candidati, e la costruzione è puramente casuale.

- Un'alternativa è la RCL <em>basata sulla cardinalità</em>, formata dai $k$ candidati migliori per un $k$ fissato. La costruzione randomizzata è il primo ingrediente della metaeuristica GRASP (T.A. Feo, M.G.C. Resende, <em>Greedy randomized adaptive search procedures</em>, Journal of Global Optimization 6 (1995) 109–133).

- <strong>Numeri casuali.</strong> Per rendere riproducibili esempi ed esercizi, le note sugli algoritmi euristici usano il generatore <em>minimal standard</em> di Park e Miller, che produce una successione di numeri $u_1,u_2,\dots$ in $(0,1)$ a partire da un <strong>seme</strong> intero:

!!! chiave ""

    $$
    seed \;\leftarrow\; (16807\cdot seed) \bmod 2147483647, \qquad\qquad u \;=\; \frac{seed}{2147483647} .
    $$

- Il modulo è $2^{31}-1$, un numero primo; con interi a $64$ bit il prodotto non va mai in overflow. Lo stesso seme dà la stessa successione su ogni computer e in ogni linguaggio di programmazione. Un candidato si estrae da una RCL con $|RCL|$ elementi, elencati per indice crescente, prendendo l'elemento in posizione $\lfloor u\cdot|RCL|\rfloor+1$; si usa un numero casuale solo quando $|RCL|\ge 2$.

!!! chiave ""

    L'<em>algoritmo nearest neighbour randomizzato</em> (indicato con $RNN_\alpha$) è un'euristica costruttiva per il TSP. Partendo dalla città $s$, a ogni passo costruisce la RCL delle città non visitate la cui distanza dall'ultima città è al più $d^{\min}+\alpha\,(d^{\max}-d^{\min})$, e accoda una città estratta in modo uniforme a caso dalla RCL.

!!! algoritmo "Algoritmo: Nearest Neighbour randomizzato"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> istanza del TSP con <span class="arithmatex">\(n\)</span> città, distanze <span class="arithmatex">\(d[1..n][1..n]\)</span>; città di partenza <span class="arithmatex">\(s\)</span>; <span class="arithmatex">\(\alpha\in[0,1]\)</span>; <span class="arithmatex">\(seed\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> giro <span class="arithmatex">\(\sigma[1..n]\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> RandomizedNN(<span class="arithmatex">\(n, d, s, \alpha, seed\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(\sigma[1] \leftarrow s\)</span>, <span class="arithmatex">\(visited := \{s\}\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(len := 2\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><span class="arithmatex">\(last := \sigma[len-1]\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><span class="arithmatex">\(d^{\min} := \min_{j\notin visited} d[last][j]\)</span>, <span class="arithmatex">\(d^{\max} := \max_{j\notin visited} d[last][j]\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">6</span><span class="arithmatex">\(RCL := \{\, j\notin visited : d[last][j] \le d^{\min}+\alpha\,(d^{\max}-d^{\min})\,\}\)</span> <span class="pc-com">▹ per indice</span></div><div class="pc" style="--liv:2"><span class="pc-n">7</span><strong>if</strong> <span class="arithmatex">\(|RCL| \ge 2\)</span> <strong>then</strong></div><div class="pc" style="--liv:3"><span class="pc-n">8</span><span class="arithmatex">\(u :=\)</span> ParkMiller(<span class="arithmatex">\(seed\)</span>)
    <span class="arithmatex">\(k :=\)</span> l'elemento in posizione <span class="arithmatex">\(\lfloor u\cdot|RCL|\rfloor+1\)</span> di <span class="arithmatex">\(RCL\)</span> <span class="pc-com">▹ numero casuale in <span class="arithmatex">\((0,1)\)</span></span></div><div class="pc" style="--liv:2"><span class="pc-n">9</span><strong>else</strong></div><div class="pc" style="--liv:3"><span class="pc-n">10</span><span class="arithmatex">\(k :=\)</span> l'unico elemento di <span class="arithmatex">\(RCL\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">11</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">12</span><span class="arithmatex">\(\sigma[len] \leftarrow k\)</span>, <span class="arithmatex">\(visited \leftarrow visited\cup\{k\}\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">13</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">14</span><strong>return</strong> <span class="arithmatex">\(\sigma\)</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- Ripetendo la costruzione con lo stesso generatore — il seme <em>non</em> si reinizializza fra due esecuzioni — si ottengono giri diversi; si tiene il migliore. Il parametro $\alpha$ bilancia qualità e varietà: un $\alpha$ piccolo dà giri vicini al giro di $NN$, un $\alpha$ grande dà giri molto diversi ma di solito scadenti.

<a id="box-21-ex-rnn"></a>

!!! esempio "Esempio 30.15: $RNN_{0.3}$ sull'istanza di riferimento del TSP"

    Eseguiamo $RNN_\alpha$ quattro volte dalla città $1$, con $\alpha=0.3$ e seme iniziale $1$. Il generatore dà

    $$
    \begin{array}{ccccccccc}
    \hline {u_1} & {u_2} & {u_3} & {u_4} & {u_5} & {u_6} & {u_7} & {u_8} & {u_9} \\
    \hline {0.0000} & {0.1315} & {0.7556} & {0.4587} & {0.5328} & {0.2190} & {0.0470} & {0.6789} & {0.6793} \\
    \hline
    \end{array}
    $$

    ($u_1=\frac{16807}{2147483647}\approx 0.0000078$). Dalla città $1$ le distanze verso $2,3,4,5$ sono $5,2,2,9$, quindi la soglia è $2+0.3\cdot(9-2)=4.1$ e $RCL=\{3,4\}$.

    <strong>Esecuzione 1.</strong> $u_1$: posizione $\lfloor 0.0000\cdot 2\rfloor+1=1$, città $3$. Da $3$ le distanze verso $2,4,5$ sono $4,4,7$, soglia $4+0.3\cdot 3=4.9$, $RCL=\{2,4\}$; $u_2$: posizione $1$, città $2$. Da $2$ le distanze verso $4,5$ sono $3,4$, soglia $3.3$, $RCL=\{4\}$: città $4$, poi città $5$. Giro $(1,3,2,4,5)$, $L=25$: il giro di $NN$.

    <strong>Esecuzione 2.</strong> $u_3$: posizione $\lfloor 0.7556\cdot 2\rfloor+1=2$, città $4$. Da $4$ le distanze verso $2,3,5$ sono $3,4,7$, soglia $3+0.3\cdot 4=4.2$, $RCL=\{2,3\}$; $u_4$: posizione $1$, città $2$. Da $2$ le distanze verso $3,5$ sono $4,4$: $d^{\min}=d^{\max}=4$ e $RCL=\{3,5\}$; $u_5$: posizione $\lfloor 0.5328\cdot 2\rfloor+1=2$, città $5$; poi città $3$. Giro $(1,4,2,5,3)$, $L=18=z(I)$.

    <strong>Esecuzione 3.</strong> $u_6$: città $3$; $u_7$: città $2$; poi le città $4$ e $5$. Giro $(1,3,2,4,5)$, $L=25$.

    <strong>Esecuzione 4.</strong> $u_8$: città $4$; $RCL=\{2,3\}$ e $u_9$: posizione $2$, città $3$. Da $3$ le distanze verso $2,5$ sono $4,7$, soglia $4.9$, $RCL=\{2\}$: città $2$, poi città $5$. Giro $(1,4,3,2,5)$, $L=2+4+4+4+9=23$.

    Le quattro esecuzioni danno $25,18,25,23$: la seconda trova il giro ottimo, che $NN$ dalla città $1$ non trova. La randomizzazione ha trasformato un'unica risposta deterministica in una piccola ricerca.

---

**Avanti:** [30.10 Look-ahead e regret](look-ahead-e-regret.md)
