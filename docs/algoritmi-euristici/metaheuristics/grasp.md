---
title: "GRASP"
---

# 32.8 GRASP { #sez-sec-grasp }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 32** · [:material-book-open-variant: Capitolo 32: Metaeuristiche](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-pencil: Esercizi: Metaeuristiche](../../esercizi/metaheuristics.md) · [:material-gesture-tap: App: TSP: simulated annealing e tabu search](../../laboratorio/simulated-annealing-tabu-search.md)

</div>

!!! chiave ""

    La <em>greedy randomized adaptive search procedure</em> (indicata con $GRASP$) è un metodo multi-start: a ogni iterazione costruisce una soluzione con un algoritmo greedy <em>randomizzato</em>, che sceglie l'elemento successivo a caso fra i candidati migliori (la <em>restricted candidate list</em>, RCL) invece di prendere sempre il migliore, e migliora la soluzione con una ricerca locale. Si restituisce il miglior ottimo locale trovato.

- Lo pseudocodice di $GRASP$ per il KP, con l'algoritmo greedy randomizzato per efficienza e KPLOCALSEARCH, è il seguente:

!!! algoritmo "Algoritmo: GRASP per il KP"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> istanza del KP <span class="arithmatex">\(p[1..n]\)</span>, <span class="arithmatex">\(w[1..n]\)</span>, <span class="arithmatex">\(c\)</span>; parametro <span class="arithmatex">\(\alpha\in[0,1]\)</span>; numero di iterazioni <span class="arithmatex">\(maxIter\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> migliore soluzione trovata</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> GRASP(<span class="arithmatex">\(p, w, c, \alpha, maxIter\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(zbest := -1\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(it := 1\)</span> <strong>to</strong> <span class="arithmatex">\(maxIter\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><span class="arithmatex">\(x := \textsc{RandomizedGreedy}(p, w, c, \alpha)\)</span>
    <span class="arithmatex">\(x := \textsc{KPLocalSearch}(x)\)</span> <span class="pc-com">▹ costruzione ricerca locale</span></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><strong>if</strong> <span class="arithmatex">\(\sum_j p[j]x[j] > zbest\)</span> <strong>then</strong> <span class="arithmatex">\(best := x\)</span>;  <span class="arithmatex">\(zbest := \sum_j p[j]x[j]\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">6</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">7</span><strong>return</strong> <span class="arithmatex">\(best\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">8</span><strong>Function</strong> RandomizedGreedy(<span class="arithmatex">\(p, w, c, \alpha\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">9</span><span class="arithmatex">\(x := (0,\dots,0)\)</span>;  <span class="arithmatex">\(rc := c\)</span> <span class="pc-com">▹ capacità residua</span></div><div class="pc" style="--liv:1"><span class="pc-n">10</span><strong>while</strong> qualche oggetto con <span class="arithmatex">\(x[j]=0\)</span> ha <span class="arithmatex">\(w[j]\le rc\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">11</span><span class="arithmatex">\(e_{\max}\)</span>, <span class="arithmatex">\(e_{\min} :=\)</span> massimo e minimo di <span class="arithmatex">\(p[j]/w[j]\)</span> su questi oggetti candidati</div><div class="pc" style="--liv:2"><span class="pc-n">12</span><span class="arithmatex">\(RCL :=\)</span> candidati con <span class="arithmatex">\(p[j]/w[j] \ge e_{\max} - \alpha\,(e_{\max}-e_{\min})\)</span>, per <span class="arithmatex">\(p[j]/w[j]\)</span> non crescente</div><div class="pc" style="--liv:2"><span class="pc-n">13</span><span class="arithmatex">\(j :=\)</span> l'elemento di <span class="arithmatex">\(RCL\)</span> in posizione <span class="arithmatex">\(1+\lfloor \textsc{Rand}()\cdot |RCL|\rfloor\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">14</span><span class="arithmatex">\(x[j] := 1\)</span>;  <span class="arithmatex">\(rc := rc - w[j]\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">15</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">16</span><strong>return</strong> <span class="arithmatex">\(x\)</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/metaheuristics_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/metaheuristics_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- La $GRASP$ è stata introdotta da Feo e Resende (1989) per il problema del set covering e presentata come metaeuristica generale in Feo e Resende (1995). La costruzione randomizzata con una restricted candidate list è quella del capitolo [«Euristiche costruttive»](../constructive-heuristics/index.md).

- La RCL è definita da una soglia sul punteggio greedy, controllata da $\alpha$:

!!! chiave ""

    KP (massimizzare l'efficienza $p_j/w_j$ degli oggetti che entrano):

    $$
    RCL=\Big\{j \text{ candidato}: \tfrac{p_j}{w_j}\ \ge\ e_{\max}-\alpha\,(e_{\max}-e_{\min})\Big\}.
    $$

    TSP (minimizzare la distanza dall'ultima città $\ell$ del giro parziale):

    $$
    RCL=\big\{j \text{ non visitata}: d_{\ell j}\ \le\ d_{\min}+\alpha\,(d_{\max}-d_{\min})\big\}.
    $$

- Con $\alpha=0$ la RCL contiene solo i candidati migliori, e la costruzione è l'algoritmo greedy: ogni iterazione costruisce la stessa soluzione (a meno di pareggi), e la $GRASP$ è una sola ricerca locale. Con $\alpha=1$ la RCL contiene tutti i candidati, e la costruzione è casuale. I valori intermedi danno soluzioni <strong>diverse</strong> (diversificazione) e <strong>buone</strong> (una buona partenza per la ricerca locale, che poi intensifica).

- Le iterazioni della $GRASP$ sono <strong>indipendenti</strong>: niente viene appreso dall'una all'altra, e le iterazioni si possono eseguire in parallelo. Alcune estensioni aggiungono memoria: la GRASP <em>reattiva</em> adatta $\alpha$ ai risultati, e il <em>path relinking</em> esplora le soluzioni fra due ottimi locali buoni.

<a id="box-9-ex-graspKP"></a>

!!! esempio "Esempio 32.8: $GRASP$ sull'istanza di riferimento del KP"

    Con $\alpha=\frac12$ e $seed=2$ (numeri casuali $0.0000$, $0.2631$, $0.5112$, $0.9173$) eseguiamo due iterazioni. Le efficienze sono $\frac{10}{5}=2$, $\frac74=1.75$, $\frac63=2$, $\frac43\approx 1.33$.

    <strong>Iterazione 1.</strong> Con $rc=9$ tutti gli oggetti entrano: $e_{\max}=2$, $e_{\min}=\frac43$, la soglia è $2-\frac12\cdot\frac23=\frac53\approx 1.67$, e $RCL=(1,3,2)$. Con $u=0.0000$ si sceglie il primo elemento: l'oggetto $1$, $rc=4$. I candidati sono gli oggetti $2$, $3$, $4$, la soglia è ancora $\frac53$, $RCL=(3,2)$, e $u=0.2631$ sceglie la posizione $1+\lfloor 2\cdot 0.2631\rfloor=1$: l'oggetto $3$, $rc=1$, e nessun oggetto entra. La costruzione dà $\{1,3\}$, di profitto $16$; KPLOCALSEARCH fa uscire l'oggetto $3$ ed entrare l'oggetto $2$: $\{1,2\}$, profitto $17$.

    <strong>Iterazione 2.</strong> $RCL=(1,3,2)$ e $u=0.5112$ sceglie la posizione $1+\lfloor 3\cdot 0.5112\rfloor=2$: l'oggetto $3$, $rc=6$. I candidati sono gli oggetti $1$, $2$, $4$, la soglia è $\frac53$, $RCL=(1,2)$, e $u=0.9173$ sceglie la posizione $2$: l'oggetto $2$, $rc=2$. La costruzione dà $\{2,3\}$, di profitto $13$, una soluzione <em>diversa</em> e peggiore di quella greedy; la ricerca locale fa uscire l'oggetto $3$ ed entrare l'oggetto $1$: $\{1,2\}$, profitto $17$.

    $GRASP(I)=17=z(I)$. Su questa istanza piccola ogni partenza porta all'ottimo; su istanze più grandi partenze diverse portano a ottimi locali diversi.

## 32.8.1 GRASP per il TSP, e l'effetto di $\alpha$ { #sez-sec-grasp-exp }

- Per il TSP la costruzione randomizzata è l'euristica nearest neighbour con una RCL: dall'ultima città $\ell$ del giro parziale, la città successiva si sceglie a caso fra le città non visitate la cui distanza da $\ell$ è al più $d_{\min}+\alpha(d_{\max}-d_{\min})$, e la ricerca locale è TWOOPTLS.

- La tabella riporta i risultati della $GRASP$ con $20$ iterazioni su TSP20 e su KP20, per $10$ esecuzioni ($seed=1,\dots,10$): valore minimo, medio e massimo della soluzione migliore, e numero di esecuzioni che raggiungono l'ottimo.

<div class="tabella" markdown="0"><table>
<tr>
<th></th>
<th colspan="4">TSP20 (<span class="arithmatex">\(z(I)=291\)</span>)</th>
<th colspan="4">KP20 (<span class="arithmatex">\(z(I)=521\)</span>)</th>
</tr>
<tr>
<td><span class="arithmatex">\(\alpha\)</span></td>
<td>min</td>
<td>media</td>
<td>max</td>
<td>ottime</td>
<td>min</td>
<td>media</td>
<td>max</td>
<td>ottime</td>
</tr>
<tr>
<td><span class="arithmatex">\(0\)</span></td>
<td><span class="arithmatex">\(319\)</span></td>
<td><span class="arithmatex">\(319.0\)</span></td>
<td><span class="arithmatex">\(319\)</span></td>
<td><span class="arithmatex">\(0\)</span></td>
<td><span class="arithmatex">\(514\)</span></td>
<td><span class="arithmatex">\(514.0\)</span></td>
<td><span class="arithmatex">\(514\)</span></td>
<td><span class="arithmatex">\(0\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(0.1\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(291.0\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
<td><span class="arithmatex">\(521\)</span></td>
<td><span class="arithmatex">\(521.0\)</span></td>
<td><span class="arithmatex">\(521\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(0.25\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(291.0\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
<td><span class="arithmatex">\(521\)</span></td>
<td><span class="arithmatex">\(521.0\)</span></td>
<td><span class="arithmatex">\(521\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(0.5\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(291.0\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
<td><span class="arithmatex">\(521\)</span></td>
<td><span class="arithmatex">\(521.0\)</span></td>
<td><span class="arithmatex">\(521\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(1\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(291.0\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
<td><span class="arithmatex">\(519\)</span></td>
<td><span class="arithmatex">\(520.8\)</span></td>
<td><span class="arithmatex">\(521\)</span></td>
<td><span class="arithmatex">\(9\)</span></td>
</tr>
</table></div>

- Con $\alpha=0$ tutte le iterazioni sono uguali: il risultato è l'ottimo locale raggiunto dalla soluzione greedy ($319$ per TSP20, $514$ per KP20), in ogni esecuzione. Basta un po' di randomizzazione per raggiungere l'ottimo in ogni esecuzione su queste istanze; con $\alpha=1$ le costruzioni sono casuali, e su KP20 un'esecuzione manca l'ottimo.

---

**Avanti:** [32.9 Large neighbourhood search](large-neighbourhood-search.md)
