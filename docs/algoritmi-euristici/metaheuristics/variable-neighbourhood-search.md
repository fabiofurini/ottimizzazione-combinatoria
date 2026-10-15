---
title: "Variable neighbourhood search"
---

# 32.7 Variable neighbourhood search { #sez-sec-vns }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 32** · [:material-book-open-variant: Capitolo 32: Metaeuristiche](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-presentation: Slide (1/2)](../../pdf/slide-metaheuristics-1.pdf) · [:material-presentation: Slide (2/2)](../../pdf/slide-metaheuristics-2.pdf) · [:material-pencil: Esercizi: Metaeuristiche](../../esercizi/metaheuristics.md) · [:material-gesture-tap: App: TSP: simulated annealing e tabu search](../../laboratorio/simulated-annealing-tabu-search.md)

</div>

!!! chiave ""

    La <em>variable neighbourhood search</em> (indicata con $VNS$) usa una successione di intorni $N_1,N_2,\dots,N_{k_{\max}}$ di dimensione crescente. Dall'ottimo locale corrente estrae una soluzione casuale in $N_k$ (<em>shaking</em>), le applica una ricerca locale, e si sposta sul nuovo ottimo locale se è migliore, ripartendo da $k=1$; altrimenti prova l'intorno successivo, più grande, $N_{k+1}$.

- Lo pseudocodice di $VNS$ per $P\,||\,C_{\max}$, dove $N_k$ contiene gli assegnamenti ottenuti con $k$ mosse e la ricerca locale è MOVEDESCENT, è il seguente:

!!! algoritmo "Algoritmo: Variable neighbourhood search per $P\,||\,C_{\max}$"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> tempi <span class="arithmatex">\(t[1..n]\)</span>, <span class="arithmatex">\(m\)</span> macchine, assegnamento di partenza <span class="arithmatex">\(mach[1..n]\)</span>, <span class="arithmatex">\(k_{\max}\)</span>, <span class="arithmatex">\(maxIter\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> un assegnamento <span class="arithmatex">\(mach\)</span> e il suo makespan <span class="arithmatex">\(C\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> VNS(<span class="arithmatex">\(t, m, mach, k_{\max}, maxIter\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(\LB := \max\{\max_j t[j],\ \lceil \sum_j t[j]/m\rceil\}\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><span class="arithmatex">\(mach := \textsc{MoveDescent}(mach)\)</span>;  <span class="arithmatex">\(L :=\)</span> carichi di <span class="arithmatex">\(mach\)</span>;  <span class="arithmatex">\(C := \max_h L[h]\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">4</span><span class="arithmatex">\(it := 0\)</span>;  <span class="arithmatex">\(k := 1\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">5</span><strong>while</strong> <span class="arithmatex">\(it < maxIter\)</span> <strong>and</strong> <span class="arithmatex">\(C > \LB\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">6</span><span class="arithmatex">\(it := it+1\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">7</span><span class="arithmatex">\(nw := \textsc{Shake}(mach, k)\)</span>
    <span class="arithmatex">\(nw := \textsc{MoveDescent}(nw)\)</span>;  <span class="arithmatex">\(Lnew :=\)</span> carichi di <span class="arithmatex">\(nw\)</span> <span class="pc-com">▹ soluzione casuale in <span class="arithmatex">\(N_k\)</span> ricerca locale</span></div><div class="pc" style="--liv:2"><span class="pc-n">8</span><strong>if</strong> <span class="arithmatex">\(Lnew\)</span> è lessicograficamente migliore di <span class="arithmatex">\(L\)</span> <strong>then</strong></div><div class="pc" style="--liv:3"><span class="pc-n">9</span><span class="arithmatex">\(mach := nw\)</span>;  <span class="arithmatex">\(L := Lnew\)</span>;  <span class="arithmatex">\(k := 1\)</span>;  <span class="arithmatex">\(C := \max_h L[h]\)</span> <span class="pc-com">▹ spostamento</span></div><div class="pc" style="--liv:2"><span class="pc-n">10</span><strong>else</strong></div><div class="pc" style="--liv:3"><span class="pc-n">11</span><strong>if</strong> <span class="arithmatex">\(k < k_{\max}\)</span> <strong>then</strong> <span class="arithmatex">\(k := k+1\)</span> <strong>else</strong> <span class="arithmatex">\(k := 1\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">12</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">13</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">14</span><strong>return</strong> <span class="arithmatex">\(mach\)</span>, <span class="arithmatex">\(C\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">15</span><strong>Function</strong> Shake(<span class="arithmatex">\(mach, k\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">16</span><strong>for</strong> <span class="arithmatex">\(s := 1\)</span> <strong>to</strong> <span class="arithmatex">\(k\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">17</span><span class="arithmatex">\(j := 1+\lfloor \textsc{Rand}()\cdot n\rfloor\)</span>;  <span class="arithmatex">\(g := 1+\lfloor\textsc{Rand}()\cdot(m-1)\rfloor\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">18</span><span class="arithmatex">\(mach[j] :=\)</span> la <span class="arithmatex">\(g\)</span>-esima macchina diversa da <span class="arithmatex">\(mach[j]\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">19</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">20</span><strong>return</strong> <span class="arithmatex">\(mach\)</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/metaheuristics_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/metaheuristics_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- La $VNS$ è stata proposta da Mladenovic e Hansen (1997). Si basa su tre osservazioni: un ottimo locale per un intorno non è necessariamente un ottimo locale per un altro; un ottimo globale è un ottimo locale per ogni intorno; e gli ottimi locali di intorni diversi sono spesso vicini fra loro.

- Lo <strong>shaking</strong> diversifica, e la dimensione $k$ controlla quanto: un $k$ piccolo esplora le soluzioni vicine all'ottimo locale corrente, un $k$ più grande va più lontano solo quando quelle più vicine hanno fallito. La <strong>ricerca locale</strong> intensifica. Tornare a $k=1$ dopo ogni miglioramento concentra la ricerca vicino alla nuova soluzione, migliore.

- Anche la variable neighbourhood descent ($VND$) del capitolo [«Ricerca locale»](../local-search/index.md) usa più intorni, ma in modo <em>deterministico</em>: li esplora completamente, uno dopo l'altro, e si ferma in una soluzione che è un ottimo locale per tutti. La $VNS$ esplora gli intorni grandi solo per <em>campioni casuali</em>, ed è questo che rende utilizzabili intorni molto grandi; la ricerca locale dentro la $VNS$ può essere essa stessa una $VND$.

- Qui $N_k$ contiene gli assegnamenti ottenuti spostando $k$ lavori (o meno, se lo stesso lavoro è estratto due volte). Poiché uno swap di due lavori è la combinazione di due spostamenti, $N_2$ contiene l'intorno swap: lo shaking con $k=2$ può riprodurre gli swap che l'intorno move non vede.

## 32.7.1 Esempio

<a id="box-8-ex-vnsPCM"></a>

!!! esempio "Esempio 32.7: $VNS$ sull'istanza di riferimento di $P\,||\,C_{\max}$"

    Partiamo dalla soluzione LPT, con carichi $(11,8,8)$, e usiamo $k_{\max}=3$ e $seed=1$ (numeri casuali $0.0000$, $0.1315$, $0.7556$, $0.4587$, $0.5328$, $0.2190$, $0.0470$, $0.6789$). MOVEDESCENT non cambia la soluzione LPT, che è un ottimo locale per l'intorno move ([Esempio 32.5](tabu-search.md#box-6-ex-tsPCM)). Ogni spostamento casuale usa due numeri: $j=1+\lfloor 7u\rfloor$ e $g=1+\lfloor 2u\rfloor$.

    - <strong>Iterazione 1</strong>, $k=1$: il lavoro $j=1+\lfloor 7\cdot 0.0000\rfloor=1$ passa da $M_1$ alla prima altra macchina ($g=1+\lfloor 2\cdot 0.1315\rfloor=1$), $M_2$: carichi $(6,13,8)$. MOVEDESCENT sposta il lavoro $6$ da $M_2$ a $M_1$: carichi $(9,10,8)$, $C_{\max}=10$, migliore di $11$. La nuova soluzione $J_1=\{5,6,7\}$, $J_2=\{1,2\}$, $J_3=\{3,4\}$ viene accettata, e $k=1$.

    - <strong>Iterazione 2</strong>, $k=1$: il lavoro $j=1+\lfloor 7\cdot 0.7556\rfloor=6$ passa da $M_1$ a $M_2$ ($g=1+\lfloor 2\cdot 0.4587\rfloor=1$): carichi $(6,13,8)$. MOVEDESCENT riporta il lavoro $6$ su $M_1$ e restituisce la soluzione corrente, che non è migliore: $k=2$.

    - <strong>Iterazione 3</strong>, $k=2$: il lavoro $j=1+\lfloor 7\cdot 0.5328\rfloor=4$ passa da $M_3$ alla prima altra macchina $M_1$ ($g=1+\lfloor 2\cdot 0.2190\rfloor=1$); poi il lavoro $j=1+\lfloor 7\cdot 0.0470\rfloor=1$ passa da $M_2$ alla seconda altra macchina $M_3$ ($g=1+\lfloor 2\cdot 0.6789\rfloor=2$): carichi $(13,5,9)$. MOVEDESCENT sposta il lavoro $4$ da $M_1$ a $M_2$: carichi $(9,9,9)$. La soluzione viene accettata, e poiché $C_{\max}=9=\LB$ la ricerca si ferma: $VNS(I)=9=z(I)$.

    Rispetto alla soluzione corrente dell'iterazione $3$, i due spostamenti casuali e la discesa hanno scambiato i lavori $1$ e $4$: uno swap, che l'intorno move di MOVEDESCENT non può eseguire.

![Figura 14](../../img/metaheuristics/fig14.svg){ .fig loading=lazy  }

![Figura 15](../../img/metaheuristics/fig15.svg){ .fig loading=lazy  }

- Su PCM15, dalla soluzione LPT ($73$) e con al più $300$ iterazioni, la $VNS$ dà i seguenti makespan per $seed=1,\dots,10$, e il numero di iterazioni eseguite:

<div class="tabella" markdown="0"><table>
<tr>
<th><span class="arithmatex">\(seed\)</span></th>
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
<td><span class="arithmatex">\(k_{\max}=1\)</span>: <span class="arithmatex">\(C_{\max}\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(70\)</span></td>
<td><span class="arithmatex">\(70\)</span></td>
<td><span class="arithmatex">\(70\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(70\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
</tr>
<tr>
<td>iterazioni</td>
<td><span class="arithmatex">\(27\)</span></td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(48\)</span></td>
<td><span class="arithmatex">\(59\)</span></td>
<td><span class="arithmatex">\(20\)</span></td>
<td><span class="arithmatex">\(43\)</span></td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(13\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(k_{\max}=2\)</span>: <span class="arithmatex">\(C_{\max}\)</span></td>
<td><span class="arithmatex">\(70\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(70\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(70\)</span></td>
<td><span class="arithmatex">\(70\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
</tr>
<tr>
<td>iterazioni</td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(41\)</span></td>
<td><span class="arithmatex">\(126\)</span></td>
<td><span class="arithmatex">\(285\)</span></td>
<td><span class="arithmatex">\(33\)</span></td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(31\)</span></td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(26\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(k_{\max}=3\)</span>: <span class="arithmatex">\(C_{\max}\)</span></td>
<td><span class="arithmatex">\(70\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(70\)</span></td>
<td><span class="arithmatex">\(70\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
</tr>
<tr>
<td>iterazioni</td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(32\)</span></td>
<td><span class="arithmatex">\(38\)</span></td>
<td><span class="arithmatex">\(29\)</span></td>
<td><span class="arithmatex">\(26\)</span></td>
<td><span class="arithmatex">\(11\)</span></td>
<td><span class="arithmatex">\(25\)</span></td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(300\)</span></td>
<td><span class="arithmatex">\(25\)</span></td>
</tr>
</table></div>

- Con $k_{\max}=3$, la $VNS$ raggiunge l'ottimo $69$ in $7$ esecuzioni su $10$, di solito in poche decine di iterazioni; la migliore tabu search della Sezione [32.5.2](tabu-search.md#sez-sec-ts-tsp) richiedeva una durata tabu calibrata con cura. Quando la $VNS$ fallisce, la ricerca è bloccata a $70$: lo shaking esplora al più tre mosse di distanza, e l'ottimo è più lontano. Si possono aggiungere un $k_{\max}$ più grande, o delle ripartenze, al prezzo di più iterazioni.

---

**Avanti:** [32.8 GRASP](grasp.md)
