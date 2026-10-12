---
title: "Tabu search"
---

# 32.5 Tabu search { #sez-sec-ts }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 32** · [:material-book-open-variant: Capitolo 32: Metaeuristiche](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-pencil: Esercizi: Metaeuristiche](../../esercizi/metaheuristics.md) · [:material-gesture-tap: App: TSP: simulated annealing e tabu search](../../laboratorio/simulated-annealing-tabu-search.md)

</div>

!!! chiave ""

    La <em>tabu search</em> (indicata con $TS$) esplora completamente l'intorno della soluzione corrente e si sposta sul <em>miglior</em> vicino, anche se è peggiore della soluzione corrente. Per evitare di tornare alle soluzioni appena visitate, mantiene una memoria a breve termine, la <em>lista tabu</em>: le mosse che annullerebbero le mosse recenti sono vietate (<em>tabu</em>) per un certo numero di iterazioni, la <em>durata tabu</em> (tenure), a meno che non portino a una soluzione migliore della migliore trovata (<em>criterio di aspirazione</em>).

- Lo pseudocodice di $TS$ per $P\,||\,C_{\max}$, con l'intorno move e il confronto lessicografico della Sezione [32.2.1](i-problemi-e-le-ipotesi.md#sez-sec-neigh), è il seguente; l'attributo $(j,h)$ vieta di riportare il lavoro $j$ sulla macchina $h$.

!!! algoritmo "Algoritmo: Tabu search per $P\,||\,C_{\max}$"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> tempi <span class="arithmatex">\(t[1..n]\)</span>, <span class="arithmatex">\(m\)</span> macchine, assegnamento di partenza <span class="arithmatex">\(mach[1..n]\)</span>, <span class="arithmatex">\(tenure\)</span>, <span class="arithmatex">\(maxIter\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> migliore assegnamento trovato</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> TabuSearch(<span class="arithmatex">\(t, m, mach, tenure, maxIter\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(L :=\)</span> carichi di <span class="arithmatex">\(mach\)</span>;  <span class="arithmatex">\(tabu[j][h] := 0\)</span> per ogni <span class="arithmatex">\(j\)</span>, <span class="arithmatex">\(h\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><span class="arithmatex">\(best := mach\)</span>;  <span class="arithmatex">\(bestC := \max_h L[h]\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">4</span><span class="arithmatex">\(\LB := \max\{\max_j t[j],\ \lceil \sum_j t[j]/m\rceil\}\)</span>
    <span class="arithmatex">\(it := 0\)</span> <span class="pc-com">▹ arresto se raggiunto</span></div><div class="pc" style="--liv:1"><span class="pc-n">5</span><strong>while</strong> <span class="arithmatex">\(it < maxIter\)</span> <strong>and</strong> <span class="arithmatex">\(bestC > \LB\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">6</span><span class="arithmatex">\(it := it+1\)</span>;  <span class="arithmatex">\(bj := 0\)</span> <span class="pc-com">▹ migliore mossa non tabu <span class="arithmatex">\((bj,bh)\)</span></span></div><div class="pc" style="--liv:2"><span class="pc-n">7</span><strong>for</strong> <span class="arithmatex">\(j := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:3"><span class="pc-n">8</span><strong>for</strong> <span class="arithmatex">\(h := 1\)</span> <strong>to</strong> <span class="arithmatex">\(m\)</span>, <span class="arithmatex">\(h\ne mach[j]\)</span> <strong>do</strong></div><div class="pc" style="--liv:4"><span class="pc-n">9</span><span class="arithmatex">\(L' :=\)</span> i carichi dopo lo spostamento del lavoro <span class="arithmatex">\(j\)</span> da <span class="arithmatex">\(mach[j]\)</span> a <span class="arithmatex">\(h\)</span></div><div class="pc" style="--liv:4"><span class="pc-n">10</span><strong>if</strong> <span class="arithmatex">\(tabu[j][h]\ge it\)</span> <strong>and not</strong> <span class="arithmatex">\(\max_k L'[k] < bestC\)</span> <strong>then</strong> <strong>continue</strong> <span class="pc-com">▹ tabu</span></div><div class="pc" style="--liv:4"><span class="pc-n">11</span><strong>if</strong> <span class="arithmatex">\(bj=0\)</span> <strong>or</strong> <span class="arithmatex">\(L'\)</span> è lessicograficamente migliore di <span class="arithmatex">\(bL\)</span> <strong>then</strong> <span class="arithmatex">\((bj,bh,bL) := (j,h,L')\)</span></div><div class="pc" style="--liv:3"><span class="pc-n">12</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">13</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">14</span><strong>if</strong> <span class="arithmatex">\(bj=0\)</span> <strong>then</strong> <strong>break</strong></div><div class="pc" style="--liv:2"><span class="pc-n">15</span><span class="arithmatex">\(tabu[bj][mach[bj]] := it+tenure\)</span>
    <span class="arithmatex">\(mach[bj] := bh\)</span>;  <span class="arithmatex">\(L := bL\)</span> <span class="pc-com">▹ vietare il ritorno anche se peggiore</span></div><div class="pc" style="--liv:2"><span class="pc-n">16</span><strong>if</strong> <span class="arithmatex">\(\max_k L[k] < bestC\)</span> <strong>then</strong></div><div class="pc" style="--liv:3"><span class="pc-n">17</span><span class="arithmatex">\(bestC := \max_k L[k]\)</span>;  <span class="arithmatex">\(best := mach\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">18</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">19</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">20</span><strong>return</strong> <span class="arithmatex">\(best\)</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/metaheuristics_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/metaheuristics_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- La tabu search è stata proposta da Glover (1986); il libro di riferimento è Glover e Laguna, <em>Tabu Search</em>, Kluwer, 1997. A differenza di $SA$, è <strong>deterministica</strong>: esce da un ottimo locale perché si sposta sempre, sul vicino meno cattivo se nessun vicino è migliore.

- Senza memoria, questa regola <strong>cicla</strong>: da un ottimo locale $S$ la ricerca passa al miglior vicino $S'$, che è peggiore, e da $S'$ il miglior vicino è tipicamente di nuovo $S$. La lista tabu spezza il ciclo vietando la mossa inversa.

- <strong>Attributi.</strong> Memorizzare le soluzioni visitate e confrontare con esse ogni vicino sarebbe troppo costoso. La lista tabu memorizza invece <strong>attributi</strong> delle mosse recenti: qui la coppia $(j,h)$ «il lavoro $j$ ha lasciato la macchina $h$»; per il TSP, i lati appena tolti dal giro.

- Un attributo vieta più della sola soluzione appena lasciata: ogni soluzione con il lavoro $j$ sulla macchina $h$ è tabu, anche quelle mai visitate. Il <strong>criterio di aspirazione</strong> rimedia a questo eccesso di prudenza: una mossa tabu è ammessa se porta a una soluzione migliore della migliore trovata, che certamente non è stata visitata.

- <strong>Durata tabu.</strong> Se è troppo breve, la ricerca può ancora ciclare su cicli più lunghi; se è troppo lunga, sono vietate troppe mosse e la ricerca viene spinta lontano dalle regioni buone. Valori tipici sono fra $5$ e $20$, o proporzionali a $\sqrt{n}$; estrarre la durata a caso in un intervallo a ogni iterazione (robust tabu search, Taillard 1991) rende improbabili i cicli.

- <strong>Criterio di arresto.</strong> Un numero massimo di iterazioni, o di iterazioni senza miglioramento della soluzione migliore. Per $P\,||\,C_{\max}$ possiamo anche fermarci quando il makespan raggiunge il lower bound $\LB$: allora la soluzione è ottima, e la ricerca può solo perdere tempo.

- <strong>Memoria a lungo termine.</strong> Oltre alla lista tabu (memoria a breve termine), $TS$ può registrare quanto spesso ogni attributo compare nelle soluzioni visitate. La <em>diversificazione</em> penalizza gli attributi frequenti, per spingere la ricerca verso regioni inesplorate; l'<em>intensificazione</em> riparte dalle migliori soluzioni trovate, e fissa gli attributi che hanno in comune.

## 32.5.1 Esempio

<a id="box-6-ex-tsPCM"></a>

!!! esempio "Esempio 32.5: $TS$ sull'istanza di riferimento di $P\,||\,C_{\max}$"

    Partiamo dalla soluzione calcolata da LPT nel capitolo [«Euristiche costruttive»](../constructive-heuristics/index.md), $J_1=\{1,5,7\}$, $J_2=\{2,6\}$, $J_3=\{3,4\}$, con carichi $(11,8,8)$, $C_{\max}=11$ e $\sum_h L_h^2=249$. È un ottimo locale per l'intorno move: alla prima iterazione i $14$ vicini sono

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>mossa</th>
    <th><span class="arithmatex">\(1\to M_2\)</span></th>
    <th><span class="arithmatex">\(1\to M_3\)</span></th>
    <th><span class="arithmatex">\(2\to M_1\)</span></th>
    <th><span class="arithmatex">\(2\to M_3\)</span></th>
    <th><span class="arithmatex">\(3\to M_1\)</span></th>
    <th><span class="arithmatex">\(3\to M_2\)</span></th>
    <th><span class="arithmatex">\(4\to M_1\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\((C_{\max},\sum_hL_h^2)\)</span></td>
    <td><span class="arithmatex">\((13,269)\)</span></td>
    <td><span class="arithmatex">\((13,269)\)</span></td>
    <td><span class="arithmatex">\((16,329)\)</span></td>
    <td><span class="arithmatex">\((13,299)\)</span></td>
    <td><span class="arithmatex">\((15,305)\)</span></td>
    <td><span class="arithmatex">\((12,281)\)</span></td>
    <td><span class="arithmatex">\((15,305)\)</span></td>
    </tr>
    <tr>
    <td>mossa</td>
    <td><span class="arithmatex">\(4\to M_2\)</span></td>
    <td><span class="arithmatex">\(5\to M_2\)</span></td>
    <td><span class="arithmatex">\(5\to M_3\)</span></td>
    <td><span class="arithmatex">\(6\to M_1\)</span></td>
    <td><span class="arithmatex">\(6\to M_3\)</span></td>
    <td><span class="arithmatex">\(7\to M_2\)</span></td>
    <td><span class="arithmatex">\(7\to M_3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((C_{\max},\sum_hL_h^2)\)</span></td>
    <td><span class="arithmatex">\((12,281)\)</span></td>
    <td><span class="arithmatex">\((11,249)\)</span></td>
    <td><span class="arithmatex">\((11,249)\)</span></td>
    <td><span class="arithmatex">\((14,285)\)</span></td>
    <td><span class="arithmatex">\((11,267)\)</span></td>
    <td><span class="arithmatex">\((11,249)\)</span></td>
    <td><span class="arithmatex">\((11,249)\)</span></td>
    </tr>
    </table></div>

    Nessun vicino ha $C_{\max}<11$, e i quattro migliori hanno $C_{\max}=11$ e $\sum_hL_h^2=249$, come la soluzione corrente: una ricerca locale si ferma qui. $TS$, con $tenure=6$, si sposta invece sul miglior vicino non tabu (il primo dei quattro, il lavoro $5$ su $M_2$), e prosegue:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>it</th>
    <th>mossa</th>
    <th>carichi</th>
    <th><span class="arithmatex">\(C_{\max}\)</span></th>
    <th><span class="arithmatex">\(\sum_h L_h^2\)</span></th>
    <th><span class="arithmatex">\(bestC\)</span></th>
    <th>nuovo attributo tabu</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
    <td><span class="arithmatex">\((8,11,8)\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(249\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\((5,M_1)\)</span> fino all'it. <span class="arithmatex">\(7\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
    <td><span class="arithmatex">\((8,8,11)\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(249\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\((5,M_2)\)</span> fino all'it. <span class="arithmatex">\(8\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
    <td><span class="arithmatex">\((11,5,11)\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(267\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\((6,M_2)\)</span> fino all'it. <span class="arithmatex">\(9\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td>lavoro <span class="arithmatex">\(7\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
    <td><span class="arithmatex">\((8,8,11)\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(249\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\((7,M_1)\)</span> fino all'it. <span class="arithmatex">\(10\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_3\to M_1\)</span></td>
    <td><span class="arithmatex">\((12,8,7)\)</span></td>
    <td><span class="arithmatex">\(12\)</span></td>
    <td><span class="arithmatex">\(257\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\((3,M_3)\)</span> fino all'it. <span class="arithmatex">\(11\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(6\)</span></td>
    <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
    <td><span class="arithmatex">\((9,8,10)\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(245\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\((6,M_1)\)</span> fino all'it. <span class="arithmatex">\(12\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(7\)</span></td>
    <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_3\to M_2\)</span></td>
    <td><span class="arithmatex">\((9,12,6)\)</span></td>
    <td><span class="arithmatex">\(12\)</span></td>
    <td><span class="arithmatex">\(261\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\((4,M_3)\)</span> fino all'it. <span class="arithmatex">\(13\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(8\)</span></td>
    <td>lavoro <span class="arithmatex">\(7\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
    <td><span class="arithmatex">\((9,9,9)\)</span></td>
    <td><span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\(243\)</span></td>
    <td><span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\((7,M_2)\)</span> fino all'it. <span class="arithmatex">\(14\)</span></td>
    </tr>
    </table></div>

    - All'iterazione $2$ il miglior vicino riporterebbe il lavoro $5$ su $M_1$, tornando alla soluzione di partenza: la mossa è tabu (attributo $(5,M_1)$ fino all'iterazione $7$), e la ricerca sposta il lavoro $5$ su $M_3$.

    - All'iterazione $5$ i quattro vicini con $C_{\max}=11$ sono tutti tabu, e nessuno soddisfa il criterio di aspirazione ($C_{\max}<bestC=11$): la migliore mossa non tabu <strong>peggiora</strong> il makespan a $12$. È così che $TS$ lascia il plateau.

    - All'iterazione $6$ il makespan scende a $10$, e all'iterazione $8$ a $9$: $C_{\max}=\LB=9$, quindi la soluzione $J_1=\{1,3\}$, $J_2=\{2,4\}$, $J_3=\{5,6,7\}$ è ottima e la ricerca si ferma: $TS(I)=9=z(I)$.

![Figura 6](../../img/metaheuristics/fig06.svg){ .fig loading=lazy  }

![Figura 7](../../img/metaheuristics/fig07.svg){ .fig loading=lazy  }

![Figura 8](../../img/metaheuristics/fig08.svg){ .fig loading=lazy  }

- La figura mostra i diagrammi di Gantt della soluzione di partenza, della soluzione dopo la mossa peggiorante dell'iterazione $5$ (il lavoro spostato in arancione), e della soluzione ottima raggiunta all'iterazione $8$.

- Con $tenure\le 5$, $TS$ non raggiunge l'ottimo su questa istanza entro $50$ iterazioni: la lista tabu è troppo corta per impedire alla ricerca di tornare sul plateau di makespan $11$.

## 32.5.2 Tabu search per il TSP, e l'effetto della durata tabu { #sez-sec-ts-tsp }

- Per il TSP con l'intorno 2-opt, gli attributi naturali sono i <strong>lati</strong>: quando una mossa toglie i lati $(\sigma_i,\sigma_{i+1})$ e $(\sigma_j,\sigma_{j+1})$, questi due lati non possono essere rimessi nel giro per $tenure$ iterazioni, a meno che la mossa non dia un giro più corto del migliore. Tutto il resto è come nello pseudocodice della Sezione [32.5](#sez-sec-ts): a ogni iterazione tutte le $\frac{n(n-3)}{2}$ mosse sono valutate in $O(1)$ ciascuna, e si esegue la migliore non tabu.

- Le tabelle riportano il risultato di $TS$ sulle istanze medie, dal giro nearest neighbour ($326$) per TSP20 con $200$ iterazioni, e dalla soluzione LPT ($73$) per PCM15 con $300$ iterazioni, per diversi valori della durata tabu; per PCM15 la tabella dà anche il numero di iterazioni eseguite ($300$ salvo che si raggiunga il lower bound).

<div class="tabella" markdown="0"><table>
<tr>
<th colspan="7">TSP20: <span class="arithmatex">\(TS\)</span> con 2-opt, <span class="arithmatex">\(200\)</span> iterazioni (<span class="arithmatex">\(z(I)=291\)</span>)</th>
</tr>
<tr>
<td><span class="arithmatex">\(tenure\)</span></td>
<td><span class="arithmatex">\(0\)</span></td>
<td><span class="arithmatex">\(1\)</span></td>
<td><span class="arithmatex">\(2\)</span></td>
<td><span class="arithmatex">\(5\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
<td><span class="arithmatex">\(20\)</span></td>
</tr>
<tr>
<td>lunghezza migliore</td>
<td><span class="arithmatex">\(319\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
</tr>
</table></div>

<div class="tabella" markdown="0"><table>
<tr>
<th colspan="11">PCM15: <span class="arithmatex">\(TS\)</span> con l'intorno move, al più <span class="arithmatex">\(300\)</span> iterazioni (<span class="arithmatex">\(z(I)=69\)</span>)</th>
</tr>
<tr>
<td><span class="arithmatex">\(tenure\)</span></td>
<td><span class="arithmatex">\(0\)</span></td>
<td><span class="arithmatex">\(1\)</span></td>
<td><span class="arithmatex">\(2\)</span></td>
<td><span class="arithmatex">\(3\)</span></td>
<td><span class="arithmatex">\(5\)</span></td>
<td><span class="arithmatex">\(7\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
<td><span class="arithmatex">\(15\)</span></td>
<td><span class="arithmatex">\(20\)</span></td>
<td><span class="arithmatex">\(30\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(C_{\max}\)</span> migliore</td>
<td><span class="arithmatex">\(73\)</span></td>
<td><span class="arithmatex">\(73\)</span></td>
<td><span class="arithmatex">\(73\)</span></td>
<td><span class="arithmatex">\(73\)</span></td>
<td><span class="arithmatex">\(73\)</span></td>
<td><span class="arithmatex">\(72\)</span></td>
<td><span class="arithmatex">\(71\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(70\)</span></td>
<td><span class="arithmatex">\(70\)</span></td>
</tr>
<tr>
<td>iterazioni</td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(231\)</span></td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(300\)</span></td>
</tr>
</table></div>

- Con $tenure=0$ non c'è memoria, e $TS$ cicla: su TSP20 non lascia mai il primo ottimo locale 2-opt. Su PCM15 l'intorno move ha un ampio plateau, e $TS$ ha bisogno di una lista tabu lunga per attraversarlo; ma una lista tabu troppo lunga vieta troppo, e con $tenure\ge 20$ l'ottimo si perde di nuovo. La durata tabu va calibrata, e il suo valore migliore dipende dal problema e dall'istanza.

---

**Avanti:** [32.6 Iterated local search](iterated-local-search.md)
