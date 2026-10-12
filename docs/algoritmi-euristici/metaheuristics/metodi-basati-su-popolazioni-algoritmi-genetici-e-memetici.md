---
title: "Metodi basati su popolazioni: algoritmi genetici e memetici"
---

# 32.10 Metodi basati su popolazioni: algoritmi genetici e memetici { #sez-sec-ga }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 32** · [:material-book-open-variant: Capitolo 32: Metaeuristiche](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-pencil: Esercizi: Metaeuristiche](../../esercizi/metaheuristics.md) · [:material-gesture-tap: App: TSP: simulated annealing e tabu search](../../laboratorio/simulated-annealing-tabu-search.md)

</div>

!!! chiave ""

    Un <em>algoritmo genetico</em> (indicato con $GA$) mantiene una <em>popolazione</em> di soluzioni, codificate come stringhe (<em>cromosomi</em>). A ogni iterazione <em>seleziona</em> due genitori, preferendo i più adatti, li <em>ricombina</em> in un figlio (<em>crossover</em>), cambia alcuni geni casuali del figlio (<em>mutazione</em>), lo <em>ripara</em> se è inammissibile, e lo inserisce nella popolazione al posto di un individuo peggiore. Un <em>algoritmo memetico</em> applica inoltre una ricerca locale a ogni figlio.

- Lo pseudocodice di un $GA$ steady-state per il KP con codifica binaria è il seguente; con $memetic=\mathrm{true}$ è un algoritmo memetico.

!!! algoritmo "Algoritmo: Algoritmo genetico e memetico per il KP"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> istanza del KP <span class="arithmatex">\(p[1..n]\)</span>, <span class="arithmatex">\(w[1..n]\)</span>, <span class="arithmatex">\(c\)</span>; dimensione della popolazione <span class="arithmatex">\(P\)</span>; probabilità di mutazione <span class="arithmatex">\(p_m\)</span>;
    <span class="arithmatex">\(maxIter\)</span>; <span class="arithmatex">\(memetic\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> miglior individuo della popolazione finale</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> GeneticKP(<span class="arithmatex">\(p, w, c, P, p_m, maxIter, memetic\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><strong>for</strong> <span class="arithmatex">\(s := 1\)</span> <strong>to</strong> <span class="arithmatex">\(P\)</span> <strong>do</strong> <span class="pc-com">▹ popolazione iniziale casuale</span></div><div class="pc" style="--liv:2"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(j := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong> <span class="arithmatex">\(pop[s][j] := 1\)</span> se <span class="arithmatex">\(\textsc{Rand}()<0.5\)</span>, altrimenti <span class="arithmatex">\(0\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><span class="arithmatex">\(\textsc{RepairKP}(pop[s])\)</span>; </div><div class="pc" style="--liv:2"><span class="pc-n">5</span><strong>if</strong> <span class="arithmatex">\(memetic\)</span> <strong>then</strong> <span class="arithmatex">\(\textsc{KPLocalSearch}(pop[s])\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">6</span><span class="arithmatex">\(fit[s] := \sum_j p[j]\,pop[s][j]\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">7</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">8</span><strong>for</strong> <span class="arithmatex">\(it := 1\)</span> <strong>to</strong> <span class="arithmatex">\(maxIter\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">9</span><span class="arithmatex">\(a := \textsc{Tournament}()\)</span>;  <span class="arithmatex">\(b := \textsc{Tournament}()\)</span>
    <span class="arithmatex">\(cut := 1+\lfloor\textsc{Rand}()\cdot(n-1)\rfloor\)</span>
    <span class="arithmatex">\(child := (pop[a][1..cut],\ pop[b][cut{+}1..n])\)</span> <span class="pc-com">▹ selezione crossover a un punto</span></div><div class="pc" style="--liv:2"><span class="pc-n">10</span><strong>for</strong> <span class="arithmatex">\(j := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong> <span class="arithmatex">\(\textsc{Rand}()<p_m\)</span><span class="arithmatex">\(child[j] := 1-child[j]\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">11</span><span class="arithmatex">\(\textsc{RepairKP}(child)\)</span>; </div><div class="pc" style="--liv:2"><span class="pc-n">12</span><strong>if</strong> <span class="arithmatex">\(memetic\)</span> <strong>then</strong> <span class="arithmatex">\(\textsc{KPLocalSearch}(child)\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">13</span><span class="arithmatex">\(worst :=\)</span> l'ultimo indice <span class="arithmatex">\(s\)</span> di minimo <span class="arithmatex">\(fit[s]\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">14</span><strong>if</strong> <span class="arithmatex">\(child\notin pop\)</span> <strong>and</strong> <span class="arithmatex">\(\sum_jp[j]\,child[j] > fit[worst]\)</span> <strong>then</strong> <span class="pc-com">▹ sostituzione</span></div><div class="pc" style="--liv:3"><span class="pc-n">15</span><span class="arithmatex">\(pop[worst] := child\)</span>;  <span class="arithmatex">\(fit[worst] := \sum_jp[j]\,child[j]\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">16</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">17</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">18</span><strong>return</strong> l'individuo di massimo <span class="arithmatex">\(fit\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">19</span><strong>Function</strong> Tournament()</div><div class="pc" style="--liv:1"><span class="pc-n">20</span><span class="arithmatex">\(a := 1+\lfloor\textsc{Rand}()\cdot P\rfloor\)</span>;  <span class="arithmatex">\(b := 1+\lfloor\textsc{Rand}()\cdot P\rfloor\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">21</span><strong>if</strong> <span class="arithmatex">\(fit[a]\ge fit[b]\)</span> <strong>then</strong> <strong>return</strong> <span class="arithmatex">\(a\)</span> <strong>else</strong> <strong>return</strong> <span class="arithmatex">\(b\)</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/metaheuristics_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/metaheuristics_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- Gli algoritmi genetici sono stati introdotti da Holland (1975) come modello dell'evoluzione naturale, e resi popolari come metodi di ottimizzazione da Goldberg (1989). Gli algoritmi memetici, in cui ogni individuo è migliorato da una ricerca locale, sono stati proposti da Moscato (1989).

- <strong>Codifica.</strong> Per il KP il vettore binario $x$ è un cromosoma naturale: il gene $j$ dice se l'oggetto $j$ è selezionato. La <strong>fitness</strong> di un individuo è il suo profitto.

- <strong>Selezione.</strong> Un torneo binario estrae due individui a caso e tiene il più adatto: gli individui buoni hanno più probabilità di diventare genitori, ma ogni individuo ha una possibilità.

- <strong>Crossover.</strong> Il crossover a un punto prende i geni $1,\dots,cut$ dal primo genitore e i geni $cut+1,\dots,n$ dal secondo. L'idea è che le soluzioni buone condividano dei <em>blocchi costitutivi</em> buoni, e che ricombinare due genitori buoni possa mettere i blocchi buoni di entrambi in un solo figlio.

- <strong>Mutazione.</strong> Ogni gene viene invertito con una probabilità piccola $p_m$, tipicamente $\frac1n$: riporta nella popolazione geni che la selezione può aver perso.

- <strong>Riparazione.</strong> Il figlio può essere inammissibile. REPAIRKP toglie l'oggetto selezionato di efficienza minima finché la capacità non è rispettata (pareggi: l'oggetto di indice massimo). Le alternative sono le penalità, come nella Sezione [32.4.3](come-uscire-da-un-ottimo-locale.md#sez-sec-sa-kp), o codifiche in cui ogni cromosoma è ammissibile.

- <strong>Sostituzione.</strong> Nella versione steady-state dello pseudocodice, il figlio sostituisce l'individuo peggiore se è migliore e non è già nella popolazione; i duplicati farebbero perdere alla popolazione la sua diversità.

- Selezione e sostituzione <strong>intensificano</strong> (la popolazione si concentra sulle soluzioni buone); crossover e mutazione <strong>diversificano</strong>. Senza ricerca locale, un $GA$ è bravo a trovare regioni promettenti ma lento a raggiungerne gli ottimi locali: l'algoritmo memetico aggiunge l'intensificazione mancante.

<a id="box-12-ex-gaKP"></a>

!!! esempio "Esempio 32.11: $GA$ sull'istanza di riferimento del KP"

    Con $P=4$, $p_m=\frac14$ e $seed=36$. I primi $16$ numeri casuali costruiscono la popolazione iniziale (gene $1$ se il numero è minore di $0.5$):

    $$
    \begin{array}{lll}pop[1]: & 0.0003,\ 0.7354,\ 0.2018,\ 0.5114 & \to (1,0,1,0) \\ pop[2]: & 0.1796,\ 0.8825,\ 0.6936,\ 0.4391 & \to (1,0,0,1) \\ pop[3]: & 0.4547,\ 0.6489,\ 0.8061,\ 0.6990 & \to (1,0,0,0) \\ pop[4]: & 0.9148,\ 0.2446,\ 0.9246,\ 0.0692 & \to (0,1,0,1)\end{array}
    $$

    Tutti e quattro gli individui sono ammissibili: $pop[1]=(1,0,1,0)$, $pop[2]=(1,0,0,1)$, $pop[3]=(1,0,0,0)$, $pop[4]=(0,1,0,1)$, con fitness $(16,14,10,11)$.

    <strong>Iterazione 1</strong> (numeri casuali $0.1614$, $0.2771$, $0.8030$, $0.4063$, $0.0295$, $0.7238$, $0.2032$, $0.4957$, $0.4620$). Il primo torneo estrae gli individui $1+\lfloor 4\cdot 0.1614\rfloor=1$ e $1+\lfloor 4\cdot 0.2771\rfloor=2$, e seleziona $a=1$ (fitness $16>14$); il secondo estrae $4$ e $2$ e seleziona $b=2$ (fitness $14>11$). Il taglio è $1+\lfloor 3\cdot 0.0295\rfloor=1$: il figlio prende il gene $1$ da $pop[1]$ e i geni $2$, $3$, $4$ da $pop[2]$, $child=(1,0,0,1)$. Solo il secondo numero di mutazione, $0.2032$, è minore di $p_m=0.25$: il gene $2$ si inverte, $child=(1,1,0,1)$, di peso $12>9$. La riparazione toglie l'oggetto $4$, l'oggetto selezionato di efficienza minima: $child=(1,1,0,0)$, di peso $9$ e profitto $17$. Sostituisce l'individuo peggiore, $pop[3]$ di fitness $10$.

    L'<strong>iterazione 2</strong> seleziona $a=2$ e $b=3$, taglia dopo il gene $1$ e costruisce $(1,1,0,0)$, senza mutazione: è già nella popolazione, e viene scartato. L'<strong>iterazione 3</strong> seleziona $a=2$ e $b=1$, taglia dopo il gene $3$, costruisce $(1,0,0,0)$, e la mutazione inverte i geni $1$ e $4$: $(0,0,0,1)$, di profitto $4$, peggiore di ogni individuo, scartato.

    Il miglior individuo è $(1,1,0,0)$: $GA(I)=17=z(I)$, trovato da crossover, mutazione e riparazione insieme.

![Figura 19](../../img/metaheuristics/fig19.svg){ .fig loading=lazy  }

- Su KP20, con $P=10$, $p_m=0.05$ e $300$ iterazioni, per $seed=1,\dots,10$:

<div class="tabella" markdown="0"><table>
<tr>
<th></th>
<th>min</th>
<th>media</th>
<th>max</th>
<th>ottime</th>
<th>profitto migliore per seme</th>
</tr>
<tr>
<td><span class="arithmatex">\(GA\)</span></td>
<td><span class="arithmatex">\(508\)</span></td>
<td><span class="arithmatex">\(516.9\)</span></td>
<td><span class="arithmatex">\(521\)</span></td>
<td><span class="arithmatex">\(4\)</span></td>
<td><span class="arithmatex">\(521,519,521,508,514,521,510,519,521,515\)</span></td>
</tr>
<tr>
<td>memetico</td>
<td><span class="arithmatex">\(521\)</span></td>
<td><span class="arithmatex">\(521.0\)</span></td>
<td><span class="arithmatex">\(521\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
<td><span class="arithmatex">\(521,521,521,521,521,521,521,521,521,521\)</span></td>
</tr>
</table></div>

- Il $GA$ semplice raggiunge l'ottimo $521$ in $4$ esecuzioni su $10$; l'algoritmo memetico in ogni esecuzione. La ricerca locale rende ogni individuo un ottimo locale, e il crossover ricombina allora ottimi locali invece di soluzioni arbitrarie.

---

**Avanti:** [32.11 Confronto e conclusioni](confronto-e-conclusioni.md)
