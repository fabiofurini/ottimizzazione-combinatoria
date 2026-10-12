---
title: "Look-ahead e regret"
---

# 30.10 Look-ahead e regret { #sez-sec-LOOK }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 30** · [:material-book-open-variant: Capitolo 30: Euristiche costruttive](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-pencil: Esercizi: Euristiche costruttive](../../esercizi/constructive-heuristics.md) · [:material-gesture-tap: App: Euristiche per il bin packing](../../laboratorio/euristiche-bin-packing.md) · [:material-gesture-tap: App: List scheduling e LPT](../../laboratorio/list-scheduling-lpt.md) · [:material-gesture-tap: App: Colorazione: greedy e DSATUR](../../laboratorio/colorazione-greedy-dsatur.md) · [:material-gesture-tap: App: TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md)

</div>

- Un criterio greedy chiede: <em>quale scelta è la migliore adesso?</em> La sua miopia si può ridurre ponendo due domande diverse:

    - <strong>regret</strong>: <em>che cosa perdo se rimando questa scelta?</em> Un elemento che ha una sola buona opzione va servito prima che la perda; un elemento con molte opzioni equivalenti può aspettare;

    - <strong>look-ahead</strong>: <em>dove porta questa scelta?</em> Ogni candidato si valuta completando la soluzione parziale con un'euristica veloce, e si sceglie il candidato con la migliore soluzione completata.

    Entrambe le idee costano più tempo per passo del semplice criterio greedy, ed entrambe mantengono la caratteristica essenziale di un'euristica costruttiva: la scelta fatta è definitiva.

## 30.10.1 Inserimento con regret { #sez-sec-REG }

- Per un'euristica di inserimento, siano $\Delta^{1}_q\le\Delta^{2}_q$ i due costi di inserimento minimi della città $q$ sugli archi del sottogiro corrente (con $\Delta^2_q=\Delta^1_q$ se il sottogiro ha un solo arco). Il <strong>regret</strong> di $q$ è

!!! chiave ""

    $$
    reg_q \;=\; \Delta^{2}_q - \Delta^{1}_q \;\ge\; 0 :
    $$

    il costo aggiuntivo pagato per $q$ se il suo arco migliore viene usato da un'altra città prima che $q$ sia inserita.

!!! chiave ""

    L'<em>algoritmo di inserimento regret-2</em> (indicato con $REG_2$) è un'euristica costruttiva per il TSP. Partendo dal sottogiro $(s)$, a ogni passo inserisce la città con il <em>regret massimo</em>, in caso di pareggio quella con $\Delta^1_q$ minimo e poi con l'indice minimo, nel suo arco di costo di inserimento minimo.

!!! algoritmo "Algoritmo: Inserimento regret-2"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> istanza del TSP con <span class="arithmatex">\(n\)</span> città, distanze <span class="arithmatex">\(d[1..n][1..n]\)</span>; città di partenza <span class="arithmatex">\(s\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> giro <span class="arithmatex">\(\sigma[1..n]\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> Regret2Insertion(<span class="arithmatex">\(n, d, s\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(\sigma := (s)\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(len := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n-1\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><strong>for each</strong> città <span class="arithmatex">\(q\notin\sigma\)</span> <strong>do</strong></div><div class="pc" style="--liv:3"><span class="pc-n">5</span><span class="arithmatex">\(\Delta^1_q, \Delta^2_q :=\)</span> i due valori minimi di <span class="arithmatex">\(\Delta(\sigma[a],q,\sigma[a+1])\)</span>, <span class="arithmatex">\(a=1,\dots,len\)</span></div><div class="pc" style="--liv:3"><span class="pc-n">6</span><span class="arithmatex">\(reg_q := \Delta^2_q-\Delta^1_q\)</span> <span class="pc-com">▹ regret di <span class="arithmatex">\(q\)</span></span></div><div class="pc" style="--liv:2"><span class="pc-n">7</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">8</span><span class="arithmatex">\(k :=\)</span> la città con <span class="arithmatex">\(reg_q\)</span> massimo (pareggi: <span class="arithmatex">\(\Delta^1_q\)</span> minimo, poi indice minimo)</div><div class="pc" style="--liv:2"><span class="pc-n">9</span>inserire <span class="arithmatex">\(k\)</span> nel suo arco di costo di inserimento minimo</div><div class="pc" style="--liv:1"><span class="pc-n">10</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">11</span><strong>return</strong> <span class="arithmatex">\(\sigma\)</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- Le euristiche regret-$k$ generalizzano l'idea, sommando le differenze fra l'opzione migliore e le $k-1$ successive; sono molto usate per i problemi di vehicle routing, dove un cliente può avere una sola route ammissibile rimasta (J.-Y. Potvin, J.-M. Rousseau, <em>A parallel route building algorithm for the vehicle routing and scheduling problem with time windows</em>, European Journal of Operational Research 66 (1993) 331–340). La stessa idea si applica a qualunque costruzione di tipo assegnamento, come oggetti a contenitori.

- Finché tutti i regret sono $0$, la regola di risoluzione dei pareggi fa comportare $REG_2$ come $CI$.

<a id="box-22-ex-reg"></a>

!!! esempio "Esempio 30.16: $REG_2$ contro $CI$ sull'istanza con $6$ città"

    Sull'istanza dell'[Esempio 30.11](il-problema-del-commesso-viaggiatore-accodare-o-inserire.md#box-15-ex-tsp6), dalla città $1$. Nei primi due passi tutti i regret sono $0$ (i sottogiri $(1)$ e $(1,6)$ hanno un arco, o due copie dello stesso arco), e sia $REG_2$ sia $CI$ inseriscono la città $6$ (costo $4$) e poi la città $3$ (costo $5$), ottenendo $(1,3,6)$ di lunghezza $9$. Al terzo passo i costi di inserimento sugli archi $(1,3)$, $(3,6)$, $(6,1)$ sono

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>città <span class="arithmatex">\(q\)</span></th>
    <th>costi</th>
    <th><span class="arithmatex">\(\Delta^1_q\)</span></th>
    <th><span class="arithmatex">\(\Delta^2_q\)</span></th>
    <th><span class="arithmatex">\(reg_q\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\((2,2,7)\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\((4,7,8)\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\((6,5,6)\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    </table></div>

    <strong>$CI$</strong> inserisce la città $2$, la più economica, sull'arco $(1,3)$. <strong>$REG_2$</strong> inserisce la città $4$, quella con il regret massimo, sull'arco $(1,3)$: questo arco è l'unica buona posizione per la città $4$, mentre la città $2$ ha due posizioni ugualmente buone e può aspettare. Le due costruzioni proseguono poi così:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th></th>
    <th><span class="arithmatex">\(CI\)</span></th>
    <th><span class="arithmatex">\(REG_2\)</span></th>
    </tr>
    <tr>
    <td>passo 3</td>
    <td><span class="arithmatex">\(2\)</span> su <span class="arithmatex">\((1,3)\)</span>, costo <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\((1,2,3,6)\)</span></td>
    <td><span class="arithmatex">\(4\)</span> su <span class="arithmatex">\((1,3)\)</span>, costo <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\((1,4,3,6)\)</span></td>
    </tr>
    <tr>
    <td>passo 4</td>
    <td><span class="arithmatex">\(4\)</span> su <span class="arithmatex">\((1,2)\)</span>, costo <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\((1,4,2,3,6)\)</span></td>
    <td><span class="arithmatex">\(5\)</span> su <span class="arithmatex">\((3,6)\)</span>, costo <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\((1,4,3,5,6)\)</span></td>
    </tr>
    <tr>
    <td>passo 5</td>
    <td><span class="arithmatex">\(5\)</span> su <span class="arithmatex">\((3,6)\)</span>, costo <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\((1,4,2,3,5,6)\)</span></td>
    <td><span class="arithmatex">\(2\)</span> su <span class="arithmatex">\((3,5)\)</span>, costo <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\((1,4,3,2,5,6)\)</span></td>
    </tr>
    <tr>
    <td>lunghezza</td>
    <td><span class="arithmatex">\(4+5+2+4+5=20\)</span></td>
    <td><span class="arithmatex">\(4+5+4+5+1=19\)</span></td>
    </tr>
    </table></div>

    Al passo $4$ di $REG_2$ i costi della città $2$ sugli archi di $(1,4,3,6)$ sono $(6,2,2,7)$, regret $0$, e quelli della città $5$ sono $(10,10,5,6)$, regret $1$: la città $5$ passa prima. La città $2$, rimandata due volte, si inserisce infine per $1$ invece che per $2$, fra le città $3$ e $5$. $REG_2(I)=19=z(I)$, mentre $CI(I)=20$.

## 30.10.2 Look-ahead: il metodo pilota { #sez-sec-PILOT }

!!! chiave ""

    Il <em>metodo pilota</em> trasforma un'euristica costruttiva $\mathscr{H}$, il <em>pilota</em>, in un'euristica più forte. A ogni passo prova ogni candidato: la soluzione parziale estesa con il candidato viene completata da $\mathscr{H}$, e il candidato la cui soluzione completata è la migliore si aggiunge in modo definitivo. Con $NN$ come pilota (indicato con $PILOT$-$NN$), i candidati sono le città successive del giro.

!!! algoritmo "Algoritmo: Metodo pilota con nearest neighbour"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> istanza del TSP con <span class="arithmatex">\(n\)</span> città, distanze <span class="arithmatex">\(d[1..n][1..n]\)</span>; città di partenza <span class="arithmatex">\(s\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> giro <span class="arithmatex">\(\sigma[1..n]\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> PilotNN(<span class="arithmatex">\(n, d, s\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(\sigma := (s)\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(len := 2\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><strong>for each</strong> città <span class="arithmatex">\(q\notin\sigma\)</span> <strong>do</strong></div><div class="pc" style="--liv:3"><span class="pc-n">5</span><span class="arithmatex">\(\tau_q :=\)</span> il cammino <span class="arithmatex">\(\sigma\)</span> esteso con <span class="arithmatex">\(q\)</span> e completato da <span class="arithmatex">\(NN\)</span> <span class="pc-com">▹ guardare avanti</span></div><div class="pc" style="--liv:2"><span class="pc-n">6</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">7</span><span class="arithmatex">\(k :=\)</span> la città <span class="arithmatex">\(q\)</span> con <span class="arithmatex">\(L(\tau_q)\)</span> minimo (indice minimo)</div><div class="pc" style="--liv:2"><span class="pc-n">8</span>accodare <span class="arithmatex">\(k\)</span> a <span class="arithmatex">\(\sigma\)</span> <span class="pc-com">▹ la scelta è definitiva</span></div><div class="pc" style="--liv:1"><span class="pc-n">9</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">10</span><strong>return</strong> <span class="arithmatex">\(\sigma\)</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- Il metodo pilota è dovuto a C. Duin e S. Voß (<em>The pilot method: a strategy for heuristic repetition with application to the Steiner problem in graphs</em>, Networks 34 (1999) 181–191). Ogni passo esegue il pilota una volta per candidato: con $NN$ come pilota il tempo di esecuzione è $O(n^4)$ invece di $O(n^2)$.

- <strong>Il metodo pilota non è mai peggiore del suo pilota.</strong> Al primo passo, il candidato scelto da $NN$ è fra quelli provati, e il suo completamento è il giro di $NN$ da $s$, quindi il miglior completamento trovato ha lunghezza al più $NN(I)$. A ogni passo successivo, il completamento del candidato scelto è di nuovo fra i completamenti provati al passo seguente (il candidato che $NN$ accoderebbe), quindi la lunghezza del miglior completamento non aumenta mai. Il giro finale è l'ultimo completamento, quindi $PILOT$-$NN(I)\le NN(I)$ dalla stessa città di partenza.

<a id="box-23-ex-pilot"></a>

!!! esempio "Esempio 30.17: $PILOT$-$NN$ sull'istanza di riferimento del TSP"

    Dalla città $1$, i candidati e i loro completamenti con $NN$ sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>cammino parziale</th>
    <th>candidati: giro completato e lunghezza</th>
    <th>scelta</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\((1)\)</span></td>
    <td><span class="arithmatex">\(2\)</span>: <span class="arithmatex">\((1,2,4,3,5)\)</span> <span class="arithmatex">\(28\)</span>; <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\((1,3,2,4,5)\)</span> <span class="arithmatex">\(25\)</span>; <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\((1,4,2,3,5)\)</span> <span class="arithmatex">\(25\)</span>; <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\((1,5,2,4,3)\)</span> <span class="arithmatex">\(22\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((1,5)\)</span></td>
    <td><span class="arithmatex">\(2\)</span>: <span class="arithmatex">\((1,5,2,4,3)\)</span> <span class="arithmatex">\(22\)</span>; <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\((1,5,3,2,4)\)</span> <span class="arithmatex">\(25\)</span>; <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\((1,5,4,2,3)\)</span> <span class="arithmatex">\(25\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((1,5,2)\)</span></td>
    <td><span class="arithmatex">\(3\)</span>: <span class="arithmatex">\((1,5,2,3,4)\)</span> <span class="arithmatex">\(23\)</span>; <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\((1,5,2,4,3)\)</span> <span class="arithmatex">\(22\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((1,5,2,4)\)</span></td>
    <td><span class="arithmatex">\(3\)</span>: <span class="arithmatex">\((1,5,2,4,3)\)</span> <span class="arithmatex">\(22\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    </table></div>

    $PILOT$-$NN$ va prima nella città $5$, la <em>più lontana</em> dalla città $1$, cosa che $NN$ non farebbe mai, e restituisce $(1,5,2,4,3)$ con $L=9+4+3+4+2=22$, contro $NN(I)=25$ dalla stessa città. L'ottimo $18$ non si raggiunge: il look-ahead è buono solo quanto il pilota che lo esegue. Sull'istanza con $6$ città dell'[Esempio 30.11](il-problema-del-commesso-viaggiatore-accodare-o-inserire.md#box-15-ex-tsp6), $PILOT$-$NN$ dalla città $1$ dà $20$, contro $25$ per $NN$.

---

**Avanti:** [30.11 Che cosa danno le euristiche costruttive, e che cosa non danno](che-cosa-danno-le-euristiche-costruttive-e-che-cosa-non-dann.md)
