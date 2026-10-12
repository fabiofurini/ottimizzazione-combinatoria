---
title: "P||Cmax: move e swap"
---

# 31.8 $P\,||\,C_{\max}$: move e swap { #sez-sec-pcmax }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 31** · [:material-book-open-variant: Capitolo 31: Ricerca locale](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-pencil: Esercizi: Ricerca locale](../../esercizi/local-search.md) · [:material-gesture-tap: App: TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md)

</div>

- Le mosse di $P\,||\,C_{\max}$ trasferiscono tempo di lavorazione fra due macchine: una move del lavoro $j$ dalla macchina $a$ alla macchina $b$ trasferisce $\delta=t_j$ da $a$ a $b$; uno swap dei lavori $j$ (su $a$) e $k$ (su $b$) trasferisce $\delta=t_j-t_k$, che può essere negativo. In entrambi i casi i nuovi carichi sono $L_a-\delta$ e $L_b+\delta$, e $F(L,a,b,\delta)$ indica la variazione risultante dell'obiettivo.

## 31.8.1 La ricerca locale move

!!! chiave ""

    La ricerca locale <em>move</em> per $P\,||\,C_{\max}$ esamina le riassegnazioni di un lavoro a un'altra macchina, ne applica una migliorante scelta con la regola first improvement o best improvement, aggiorna i due carichi coinvolti, e si ferma quando nessuna riassegnazione diminuisce l'obiettivo.

!!! algoritmo "Algoritmo: Passo move per $P\,||\,C_{\max}$"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> <span class="arithmatex">\(n\)</span> lavori, <span class="arithmatex">\(m\)</span> macchine, tempi <span class="arithmatex">\(t[1..n]\)</span>, assegnazione <span class="arithmatex">\(mach[1..n]\)</span>, carichi <span class="arithmatex">\(L[1..m]\)</span>, regola</div><div class="pc" style="--liv:0"><strong>Output:</strong> <em>true</em> se è stata applicata una mossa migliorante, <em>false</em> altrimenti</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> PCmaxMoveStep(<span class="arithmatex">\(n, m, t, mach, L, \textit{rule}\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(\bar\Delta := 0\)</span>; <span class="arithmatex">\((\bar\jmath,\bar h) := (0,0)\)</span> <span class="pc-com">▹ miglior mossa trovata finora</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(j := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><span class="arithmatex">\(a := mach[j]\)</span> <span class="pc-com">▹ macchina del lavoro <span class="arithmatex">\(j\)</span></span></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><strong>for</strong> <span class="arithmatex">\(h := 1\)</span> <strong>to</strong> <span class="arithmatex">\(m\)</span> <strong>do</strong></div><div class="pc" style="--liv:3"><span class="pc-n">6</span><strong>if</strong> <span class="arithmatex">\(h = a\)</span> <strong>then</strong></div><div class="pc" style="--liv:4"><span class="pc-n">7</span><strong>continue</strong></div><div class="pc" style="--liv:3"><span class="pc-n">8</span><strong>end</strong></div><div class="pc" style="--liv:3"><span class="pc-n">9</span><span class="arithmatex">\(\Delta := F(L, a, h, t[j])\)</span> <span class="pc-com">▹ variazione dell'obiettivo</span></div><div class="pc" style="--liv:3"><span class="pc-n">10</span><strong>if</strong> <span class="arithmatex">\(\Delta < \bar\Delta\)</span> <strong>then</strong></div><div class="pc" style="--liv:4"><span class="pc-n">11</span><span class="arithmatex">\(\bar\Delta \leftarrow \Delta\)</span>; <span class="arithmatex">\((\bar\jmath,\bar h) \leftarrow (j,h)\)</span> <span class="pc-com">▹ mossa migliorante</span></div><div class="pc" style="--liv:4"><span class="pc-n">12</span><strong>if</strong> <span class="arithmatex">\(\textit{rule}=\textit{first}\)</span> <strong>then</strong></div><div class="pc" style="--liv:5"><span class="pc-n">13</span><strong>uscire</strong> da entrambi i cicli</div><div class="pc" style="--liv:4"><span class="pc-n">14</span><strong>end</strong></div><div class="pc" style="--liv:3"><span class="pc-n">15</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">16</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">17</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">18</span><strong>if</strong> <span class="arithmatex">\(\bar\jmath = 0\)</span> <strong>then</strong> <strong>return</strong> <em>false</em> <span class="pc-com">▹ nessuna mossa migliorante: ottimo locale</span></div><div class="pc" style="--liv:1"><span class="pc-n">19</span><span class="arithmatex">\(L[mach[\bar\jmath]] \leftarrow L[mach[\bar\jmath]]-t[\bar\jmath]\)</span>; <span class="arithmatex">\(L[\bar h] \leftarrow L[\bar h]+t[\bar\jmath]\)</span>
    <span class="arithmatex">\(mach[\bar\jmath] \leftarrow \bar h\)</span> <span class="pc-com">▹ aggiornare i carichi applicare la mossa</span></div><div class="pc" style="--liv:1"><span class="pc-n">20</span><strong>return</strong> <em>true</em></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

## 31.8.2 La ricerca locale swap

!!! chiave ""

    La ricerca locale <em>swap</em> per $P\,||\,C_{\max}$ esamina gli scambi di due lavori su macchine diverse, ne applica uno migliorante scelto con la regola first improvement o best improvement, aggiorna i due carichi coinvolti, e si ferma quando nessuno scambio diminuisce l'obiettivo.

!!! algoritmo "Algoritmo: Passo swap per $P\,||\,C_{\max}$"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> <span class="arithmatex">\(n\)</span> lavori, <span class="arithmatex">\(m\)</span> macchine, tempi <span class="arithmatex">\(t[1..n]\)</span>, assegnazione <span class="arithmatex">\(mach[1..n]\)</span>, carichi <span class="arithmatex">\(L[1..m]\)</span>, regola</div><div class="pc" style="--liv:0"><strong>Output:</strong> <em>true</em> se è stato applicato uno swap migliorante, <em>false</em> altrimenti</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> PCmaxSwapStep(<span class="arithmatex">\(n, m, t, mach, L, \textit{rule}\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(\bar\Delta := 0\)</span>; <span class="arithmatex">\((\bar\jmath,\bar k) := (0,0)\)</span> <span class="pc-com">▹ miglior swap trovato finora</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(j := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><strong>for</strong> <span class="arithmatex">\(k := j+1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:3"><span class="pc-n">5</span><span class="arithmatex">\(a := mach[j]\)</span>; <span class="arithmatex">\(b := mach[k]\)</span></div><div class="pc" style="--liv:3"><span class="pc-n">6</span><strong>if</strong> <span class="arithmatex">\(a = b\)</span> <strong>or</strong> <span class="arithmatex">\(t[j]=t[k]\)</span> <strong>then</strong> <strong>continue</strong> <span class="pc-com">▹ i carichi non cambierebbero</span></div><div class="pc" style="--liv:3"><span class="pc-n">7</span><span class="arithmatex">\(\Delta := F(L, a, b, t[j]-t[k])\)</span> <span class="pc-com">▹ variazione dell'obiettivo</span></div><div class="pc" style="--liv:3"><span class="pc-n">8</span><strong>if</strong> <span class="arithmatex">\(\Delta < \bar\Delta\)</span> <strong>then</strong></div><div class="pc" style="--liv:4"><span class="pc-n">9</span><span class="arithmatex">\(\bar\Delta \leftarrow \Delta\)</span>; <span class="arithmatex">\((\bar\jmath,\bar k) \leftarrow (j,k)\)</span> <span class="pc-com">▹ swap migliorante</span></div><div class="pc" style="--liv:4"><span class="pc-n">10</span><strong>if</strong> <span class="arithmatex">\(\textit{rule}=\textit{first}\)</span> <strong>then</strong></div><div class="pc" style="--liv:5"><span class="pc-n">11</span><strong>uscire</strong> da entrambi i cicli</div><div class="pc" style="--liv:4"><span class="pc-n">12</span><strong>end</strong></div><div class="pc" style="--liv:3"><span class="pc-n">13</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">14</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">15</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">16</span><strong>if</strong> <span class="arithmatex">\(\bar\jmath = 0\)</span> <strong>then</strong> <strong>return</strong> <em>false</em> <span class="pc-com">▹ nessuno swap migliorante: ottimo locale</span></div><div class="pc" style="--liv:1"><span class="pc-n">17</span><span class="arithmatex">\(a := mach[\bar\jmath]\)</span>; <span class="arithmatex">\(b := mach[\bar k]\)</span>; <span class="arithmatex">\(\delta := t[\bar\jmath]-t[\bar k]\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">18</span><span class="arithmatex">\(L[a] \leftarrow L[a]-\delta\)</span>; <span class="arithmatex">\(L[b] \leftarrow L[b]+\delta\)</span>
    <span class="arithmatex">\(mach[\bar\jmath] \leftarrow b\)</span>; <span class="arithmatex">\(mach[\bar k] \leftarrow a\)</span> <span class="pc-com">▹ aggiornare i carichi applicare lo swap</span></div><div class="pc" style="--liv:1"><span class="pc-n">19</span><strong>return</strong> <em>true</em></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- Per il makespan, la variazione dell'obiettivo è

!!! chiave ""

    $$
    F(L,a,b,\delta) \;=\; \max\Big\{\,L_a-\delta,\; L_b+\delta,\; \max_{q\ne a,b} L_q\Big\} \;-\; \max_{q} L_q ,
    $$

    calcolata in tempo $O(m)$ dai carichi $L_1,\dots,L_m$ della soluzione corrente.

- Una move o uno swap è migliorante se e solo se $F(L,a,b,\delta)<0$. Poiché cambiano solo $L_a$ e $L_b$, il makespan può diminuire solo se $a$ è l'<strong>unica</strong> macchina critica: se un'altra macchina ha carico $C_{\max}$, nessuna mossa fra due macchine può abbassare il makespan.

- Un'iterazione costa tempo $O(nm^2)$ per move e $O(n^2m)$ per swap, a causa della valutazione in $O(m)$ di $F$; tenere i carichi ordinati lo riduce, ma qui basta la versione semplice.

- Una move cambia il numero di lavori su due macchine, uno swap mantiene il numero di lavori su ogni macchina: se una macchina ha troppi lavori, solo una move può correggerlo, e i due intorni si completano a vicenda.

<a id="box-8-ex-lpt"></a>

!!! esempio "Esempio 31.5: La soluzione di $LPT$ è un ottimo locale per move, ma non per swap"

    La soluzione di $LPT$ sull'istanza di riferimento di $P\,||\,C_{\max}$ ha $J_1=\{1,5,7\}$, $J_2=\{2,6\}$, $J_3=\{3,4\}$, carichi $(11,8,8)$ e $C_{\max}=11$. La macchina $1$ è l'unica macchina critica.

    <strong>Move.</strong> Le $14$ mosse danno i carichi

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>mossa</th>
    <th>carichi</th>
    <th><span class="arithmatex">\(C_{\max}\)</span></th>
    <th>mossa</th>
    <th>carichi</th>
    <th><span class="arithmatex">\(C_{\max}\)</span></th>
    </tr>
    <tr>
    <td>lavoro <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
    <td><span class="arithmatex">\((6,13,8)\)</span></td>
    <td><span class="arithmatex">\(13\)</span></td>
    <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_3\to M_2\)</span></td>
    <td><span class="arithmatex">\((11,12,4)\)</span></td>
    <td><span class="arithmatex">\(12\)</span></td>
    </tr>
    <tr>
    <td>lavoro <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
    <td><span class="arithmatex">\((6,8,13)\)</span></td>
    <td><span class="arithmatex">\(13\)</span></td>
    <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
    <td><span class="arithmatex">\((8,11,8)\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    </tr>
    <tr>
    <td>lavoro <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
    <td><span class="arithmatex">\((16,3,8)\)</span></td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
    <td><span class="arithmatex">\((8,8,11)\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    </tr>
    <tr>
    <td>lavoro <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
    <td><span class="arithmatex">\((11,3,13)\)</span></td>
    <td><span class="arithmatex">\(13\)</span></td>
    <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
    <td><span class="arithmatex">\((14,5,8)\)</span></td>
    <td><span class="arithmatex">\(14\)</span></td>
    </tr>
    <tr>
    <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_3\to M_1\)</span></td>
    <td><span class="arithmatex">\((15,8,4)\)</span></td>
    <td><span class="arithmatex">\(15\)</span></td>
    <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
    <td><span class="arithmatex">\((11,5,11)\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    </tr>
    <tr>
    <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_3\to M_2\)</span></td>
    <td><span class="arithmatex">\((11,12,4)\)</span></td>
    <td><span class="arithmatex">\(12\)</span></td>
    <td>lavoro <span class="arithmatex">\(7\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
    <td><span class="arithmatex">\((8,11,8)\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    </tr>
    <tr>
    <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_3\to M_1\)</span></td>
    <td><span class="arithmatex">\((15,8,4)\)</span></td>
    <td><span class="arithmatex">\(15\)</span></td>
    <td>lavoro <span class="arithmatex">\(7\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
    <td><span class="arithmatex">\((8,8,11)\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    </tr>
    </table></div>

    Nessuna mossa diminuisce il makespan: spostare il lavoro $1$ via dalla macchina $1$ porta la macchina ricevente a $8+5=13$, e spostare il lavoro $5$ o $7$ abbassa la macchina $1$ a $8$ ma alza la macchina ricevente a $8+3=11$. La soluzione di $LPT$ è un <strong>ottimo locale per move</strong>, con $C_{\max}=11$.

    <strong>Swap.</strong> Il primo swap esaminato scambia il lavoro $1$ (su $M_1$, $t_1=5$) e il lavoro $3$ (su $M_3$, $t_3=4$): $\delta=1$, i carichi diventano $(10,8,9)$ e $C_{\max}=10$. È migliorante, e first improvement lo accetta subito; best improvement esamina tutti i $13$ swap e ne trova altri due con $C_{\max}=10$ (lavori $1$ e $4$, lavori $1$ e $6$), quindi accetta lo stesso swap, il primo trovato. Ora $J_1=\{3,5,7\}$, $J_2=\{2,6\}$, $J_3=\{1,4\}$.

    Nella seconda iterazione, lo swap del lavoro $3$ (su $M_1$, $t_3=4$) e del lavoro $6$ (su $M_2$, $t_6=3$) ha $\delta=1$ e dà i carichi $(9,9,9)$: si trova dopo $9$ valutazioni, ed è l'unico swap con $C_{\max}<10$, quindi entrambe le regole lo accettano. La nuova soluzione $J_1=\{5,6,7\}$, $J_2=\{2,3\}$, $J_3=\{1,4\}$ ha $C_{\max}=9=\left\lceil 27/3\right\rceil$: è <strong>ottima</strong>.

    ![Figura 5](../../img/local-search/fig05.svg){ .fig loading=lazy  }

- In questo esempio l'intorno move si ferma a $11$, e l'intorno swap raggiunge l'ottimo $9$. Come osservato per il KP nel capitolo [«Algoritmi euristici: definizioni»](../heuristics.md), <strong>l'ottimo locale dipende dall'intorno</strong>.

- Un intorno più grande non sempre aiuta. Sull'istanza con $m=4$ macchine e $12$ lavori con tempi $t=(11,10,9,8,7,7,6,5,4,4,3,2)$, il cui makespan ottimo è $z(I)=19=\lceil 76/4\rceil$, $LPT$ dà $J_1=\{1,8,10\}$, $J_2=\{2,7,11\}$, $J_3=\{3,6,12\}$, $J_4=\{4,5,9\}$, con carichi $(20,19,18,19)$: questa soluzione è un ottimo locale sia per move sia per swap.

---

**Avanti:** [31.9 Paesaggi piatti e obiettivi ausiliari](paesaggi-piatti-e-obiettivi-ausiliari.md)
