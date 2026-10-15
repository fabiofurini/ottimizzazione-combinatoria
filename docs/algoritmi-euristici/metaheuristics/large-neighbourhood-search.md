---
title: "Large neighbourhood search"
---

# 32.9 Large neighbourhood search { #sez-sec-lns }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 32** · [:material-book-open-variant: Capitolo 32: Metaeuristiche](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-presentation: Slide (1/2)](../../pdf/slide-metaheuristics-1.pdf) · [:material-presentation: Slide (2/2)](../../pdf/slide-metaheuristics-2.pdf) · [:material-pencil: Esercizi: Metaeuristiche](../../esercizi/metaheuristics.md) · [:material-gesture-tap: App: TSP: simulated annealing e tabu search](../../laboratorio/simulated-annealing-tabu-search.md)

</div>

!!! chiave ""

    La <em>large neighbourhood search</em> (indicata con $LNS$) migliora una soluzione <em>distruggendone</em> una parte e <em>riparandola</em>: un metodo di distruzione toglie alcuni elementi (oggetti, città, lavori) dalla soluzione corrente, un metodo di riparazione li reinserisce, e la nuova soluzione sostituisce quella corrente se è soddisfatto un criterio di accettazione. L'intorno di una soluzione è l'insieme di tutte le soluzioni che distruzione e riparazione possono produrre, ed è <em>grande</em>.

- Lo pseudocodice di $LNS$ per il TSP, che toglie $q$ città casuali e le reinserisce con l'inserimento più economico (cheapest insertion), è il seguente:

!!! algoritmo "Algoritmo: Large neighbourhood search per il TSP"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> distanze <span class="arithmatex">\(d\)</span>, giro di partenza <span class="arithmatex">\(\sigma\)</span>, numero <span class="arithmatex">\(q\)</span> di città da togliere, numero di iterazioni <span class="arithmatex">\(maxIter\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> il giro corrente alla fine</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> LNS(<span class="arithmatex">\(d, \sigma, q, maxIter\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(cur := \sigma\)</span>;  <span class="arithmatex">\(lcur := L(cur)\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(it := 1\)</span> <strong>to</strong> <span class="arithmatex">\(maxIter\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><span class="arithmatex">\(nw := cur\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><span class="arithmatex">\(removed := \textsc{RandomRemoval}(nw, q)\)</span>
    <span class="arithmatex">\(\textsc{CheapestInsertionRepair}(nw, removed)\)</span> <span class="pc-com">▹ distruzione riparazione</span></div><div class="pc" style="--liv:2"><span class="pc-n">6</span><strong>if</strong> <span class="arithmatex">\(L(nw) < lcur\)</span> <strong>then</strong> <span class="arithmatex">\(cur := nw\)</span>;  <span class="arithmatex">\(lcur := L(nw)\)</span> <span class="pc-com">▹ accettazione</span></div><div class="pc" style="--liv:1"><span class="pc-n">7</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">8</span><strong>return</strong> <span class="arithmatex">\(cur\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">9</span><strong>Function</strong> RandomRemoval(<span class="arithmatex">\(\sigma, q\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">10</span><strong>for</strong> <span class="arithmatex">\(s := 1\)</span> <strong>to</strong> <span class="arithmatex">\(q\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">11</span><span class="arithmatex">\(k := 2+\lfloor\textsc{Rand}()\cdot(|\sigma|-1)\rfloor\)</span>
    aggiungere <span class="arithmatex">\(\sigma[k]\)</span> in coda a <span class="arithmatex">\(removed\)</span>, e cancellarla da <span class="arithmatex">\(\sigma\)</span> <span class="pc-com">▹ la città <span class="arithmatex">\(1\)</span> non viene mai tolta</span></div><div class="pc" style="--liv:1"><span class="pc-n">12</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">13</span><strong>return</strong> <span class="arithmatex">\(removed\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">14</span><strong>Function</strong> CheapestInsertionRepair(<span class="arithmatex">\(\sigma, removed\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">15</span><strong>for each</strong> città <span class="arithmatex">\(v\)</span> di <span class="arithmatex">\(removed\)</span>, nell'ordine di rimozione <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">16</span>inserire <span class="arithmatex">\(v\)</span> fra le città consecutive <span class="arithmatex">\(a\)</span>, <span class="arithmatex">\(b\)</span> di <span class="arithmatex">\(\sigma\)</span> di minimo <span class="arithmatex">\(d_{av}+d_{vb}-d_{ab}\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">17</span><strong>end</strong></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/metaheuristics_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/metaheuristics_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- La $LNS$ è stata introdotta da Shaw (1998) per problemi di vehicle routing, in cui la riparazione era fatta con la constraint programming. La <strong>dimensione</strong> dell'intorno cresce molto rapidamente con il numero $q$ di elementi tolti: per il TSP ci sono $\binom{n-1}{q}$ modi di scegliere le città tolte, e molti modi di reinserirle. Un intorno del genere non si può elencare e valutare mossa per mossa, come in una ricerca locale: viene esplorato <strong>implicitamente</strong>, dal metodo di riparazione.

- Il metodo di riparazione è un <strong>sotto-algoritmo</strong>: un'euristica costruttiva (cheapest insertion, FFD), o un algoritmo <em>esatto</em> per il sottoproblema lasciato dal metodo di distruzione. Più forte è la riparazione, migliore è il miglior vicino trovato; più grande è $q$, più grande è l'intorno, e più costosa la sua esplorazione.

- Il metodo di distruzione diversifica (di solito è casuale, e $q$ controlla quanto lontano va la ricerca); il metodo di riparazione intensifica (ricostruisce la parte distrutta nel modo migliore possibile). Togliere elementi <em>correlati</em> (città vicine fra loro, oggetti degli stessi contenitori) rende la riparazione più efficace che togliere elementi non correlati, che possono solo essere rimessi dov'erano.

<a id="box-10-ex-lnsTSP"></a>

!!! esempio "Esempio 32.9: $LNS$ sull'istanza di riferimento del TSP"

    Dal giro nearest neighbour $(1,3,2,4,5)$ di lunghezza $25$, con $q=2$ e $seed=1$. Il primo numero casuale $0.0000$ toglie la città in posizione $2+\lfloor 4\cdot 0.0000\rfloor=2$, la città $3$; il giro parziale è $(1,2,4,5)$, e $0.1315$ toglie la città in posizione $2+\lfloor 3\cdot 0.1315\rfloor=2$, la città $2$. Il giro parziale $(1,4,5)$ ha lunghezza $2+7+9=18$. Cheapest insertion della città $3$:

    $$
    (1,4):\ d_{13}+d_{34}-d_{14}=2+4-2=4,\qquad
    (4,5):\ 4+7-7=4,\qquad
    (5,1):\ 7+2-9=0,
    $$

    quindi la città $3$ va fra $5$ e $1$: $(1,4,5,3)$. Cheapest insertion della città $2$:

    $$
    \begin{gathered}
    (1,4):\ 5+3-2=6,\qquad (4,5):\ 3+4-7=0,\qquad (5,3):\ 4+4-7=1,\\
    (3,1):\ 4+5-2=7,
    \end{gathered}
    $$

    quindi la città $2$ va fra $4$ e $5$: $(1,4,2,5,3)$, di lunghezza $18$, accettato. È il giro ottimo, percorso nel verso opposto: un solo passo di distruzione e riparazione ha cambiato quattro lati del giro.

## 32.9.1 Large neighbourhood search per il BPP: riparazione euristica ed esatta { #sez-sec-lns-bpp }

- Per il BPP il metodo di distruzione naturale <strong>svuota contenitori</strong>: il contenitore meno carico, che è quello di cui vorremmo liberarci, e $q-1$ altri contenitori scelti a caso. Il metodo di riparazione reimpacchetta gli oggetti tolti in contenitori nuovi, mentre gli altri contenitori restano come sono. Il nuovo impacchettamento è accettato se usa meno contenitori, o lo stesso numero di contenitori e un valore dell'obiettivo ausiliario $\sum_b(\sum_{j\in P_b}w_j)^2$ non minore: sui plateau dell'obiettivo piatto, la ricerca si muove verso contenitori più pieni.

- La riparazione risolve un <strong>sottoproblema di BPP</strong>, sui soli oggetti tolti, e può farlo in due modi: con FFD, oppure in modo <strong>esatto</strong>, con un branch-and-bound che prova ogni contenitore per ogni oggetto e conserva l'impacchettamento con il minor numero di contenitori. Il sottoproblema ha solo gli oggetti di $q$ contenitori, quindi una riparazione esatta è sostenibile.

!!! algoritmo "Algoritmo: Large neighbourhood search per il BPP"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> pesi <span class="arithmatex">\(w[1..n]\)</span>, capacità <span class="arithmatex">\(c\)</span>, impacchettamento <span class="arithmatex">\(bin[1..n]\)</span> con <span class="arithmatex">\(nb\)</span> contenitori, <span class="arithmatex">\(q\)</span>, <span class="arithmatex">\(exact\)</span>, <span class="arithmatex">\(maxIter\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> un impacchettamento <span class="arithmatex">\(bin\)</span> e il suo numero di contenitori <span class="arithmatex">\(nb\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> LNS-BPP(<span class="arithmatex">\(w, c, bin, nb, q, exact, maxIter\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(\LB := \lceil \sum_j w[j]/c\rceil\)</span>;  <span class="arithmatex">\(it := 0\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>while</strong> <span class="arithmatex">\(it < maxIter\)</span> <strong>and</strong> <span class="arithmatex">\(nb > \LB\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><span class="arithmatex">\(it := it+1\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><span class="arithmatex">\(empty :=\)</span> il contenitore meno carico e <span class="arithmatex">\(q-1\)</span> altri contenitori a caso
    <span class="arithmatex">\(items :=\)</span> gli oggetti posti nei contenitori di <span class="arithmatex">\(empty\)</span> <span class="pc-com">▹ distruzione</span></div><div class="pc" style="--liv:2"><span class="pc-n">6</span><span class="arithmatex">\(newbin :=\)</span> gli altri contenitori, rinumerati <span class="arithmatex">\(1,\dots,nb-q\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">7</span><strong>if</strong> <span class="arithmatex">\(exact\)</span> <strong>then</strong> impacchettare <span class="arithmatex">\(items\)</span> in modo ottimo in <span class="arithmatex">\(k\)</span> contenitori nuovi <strong>else</strong> impacchettare <span class="arithmatex">\(items\)</span> con FFD in <span class="arithmatex">\(k\)</span> contenitori nuovi</div><div class="pc" style="--liv:2"><span class="pc-n">8</span><span class="arithmatex">\(nb' := nb-q+k\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">9</span><strong>if</strong> <span class="arithmatex">\(nb' < nb\)</span> <strong>or</strong> (<span class="arithmatex">\(nb'=nb\)</span> <strong>and</strong> <span class="arithmatex">\(\sum_b (\text{carico di } b \text{ in } newbin)^2 \ge \sum_b (\text{carico di } b \text{ in } bin)^2\)</span>) <strong>then</strong></div><div class="pc" style="--liv:3"><span class="pc-n">10</span><span class="arithmatex">\(bin := newbin\)</span>;  <span class="arithmatex">\(nb := nb'\)</span> <span class="pc-com">▹ accettazione</span></div><div class="pc" style="--liv:2"><span class="pc-n">11</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">12</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">13</span><strong>return</strong> <span class="arithmatex">\(bin\)</span>, <span class="arithmatex">\(nb\)</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/metaheuristics_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/metaheuristics_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

<a id="box-11-ex-lnsBPP"></a>

!!! esempio "Esempio 32.10: $LNS$ sull'istanza di riferimento del BPP"

    Partiamo dall'impacchettamento calcolato da First Fit, $P_1=\{1,4\}$, $P_2=\{2,5\}$, $P_3=\{3\}$, $P_4=\{6\}$, con carichi $(7,6,5,3)$, e usiamo $q=2$, riparazione con FFD e $seed=3$ (numeri casuali $0.0000$, $0.3946$, $0.2668$, $0.3760$). A ogni iterazione si svuota il contenitore meno carico, insieme al contenitore in posizione $1+\lfloor 3u\rfloor$ fra gli altri tre.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>it</th>
    <th>carichi</th>
    <th>svuotati</th>
    <th>oggetti</th>
    <th>FFD</th>
    <th><span class="arithmatex">\(nb'\)</span></th>
    <th><span class="arithmatex">\(\sum_b(\cdot)^2\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\((7,6,5,3)\)</span></td>
    <td><span class="arithmatex">\(P_4,P_1\)</span></td>
    <td><span class="arithmatex">\(\{1,4,6\}\)</span></td>
    <td><span class="arithmatex">\(\{1,4\}, \{6\}\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(119\to 119\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\((6,5,7,3)\)</span></td>
    <td><span class="arithmatex">\(P_4,P_2\)</span></td>
    <td><span class="arithmatex">\(\{3,6\}\)</span></td>
    <td><span class="arithmatex">\(\{3\}, \{6\}\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(119\to 119\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\((6,7,5,3)\)</span></td>
    <td><span class="arithmatex">\(P_4,P_1\)</span></td>
    <td><span class="arithmatex">\(\{2,5,6\}\)</span></td>
    <td><span class="arithmatex">\(\{2,6\}, \{5\}\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(119\to 127\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\((7,5,7,2)\)</span></td>
    <td><span class="arithmatex">\(P_4,P_2\)</span></td>
    <td><span class="arithmatex">\(\{3,5\}\)</span></td>
    <td><span class="arithmatex">\(\{3,5\}\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(127\to 147\)</span></td>
    </tr>
    </table></div>

    Le iterazioni $1$ e $2$ si limitano a rimescolare gli oggetti e mantengono gli stessi carichi (l'obiettivo ausiliario resta $119$, e il nuovo impacchettamento è accettato perché non è peggiore); l'iterazione $3$ costruisce il contenitore pieno $\{2,6\}$, portando l'obiettivo ausiliario a $127$; l'iterazione $4$ svuota i contenitori $\{5\}$ e $\{3\}$, e FFD mette insieme gli oggetti $3$ e $5$: $3$ contenitori, l'ottimo, e la ricerca si ferma poiché $nb=\LB$.

![Figura 16](../../img/metaheuristics/fig16.svg){ .fig loading=lazy  }

![Figura 17](../../img/metaheuristics/fig17.svg){ .fig loading=lazy  }

![Figura 18](../../img/metaheuristics/fig18.svg){ .fig loading=lazy  }

- Su BPP24, partendo dall'impacchettamento FFD ($10$ contenitori), con $200$ iterazioni e $seed=1,\dots,10$, il risultato dipende dalla riparazione:

<div class="tabella" markdown="0"><table>
<tr>
<th><span class="arithmatex">\(q\)</span></th>
<th>riparazione</th>
<th>contenitori alla fine (10 semi)</th>
<th>iterazioni per arrivare a <span class="arithmatex">\(9\)</span></th>
</tr>
<tr>
<td><span class="arithmatex">\(2\)</span></td>
<td>FFD</td>
<td><span class="arithmatex">\(10,10,10,10,10,10,10,10,10,10\)</span></td>
<td>mai</td>
</tr>
<tr>
<td><span class="arithmatex">\(2\)</span></td>
<td>esatta</td>
<td><span class="arithmatex">\(10,10,10,10,10,10,10,10,10,10\)</span></td>
<td>mai</td>
</tr>
<tr>
<td><span class="arithmatex">\(3\)</span></td>
<td>FFD</td>
<td><span class="arithmatex">\(10,10,10,10,10,10,10,10,10,10\)</span></td>
<td>mai</td>
</tr>
<tr>
<td><span class="arithmatex">\(3\)</span></td>
<td>esatta</td>
<td><span class="arithmatex">\(9,9,9,9,9,9,9,9,9,9\)</span></td>
<td><span class="arithmatex">\(4,4,12,38,3,20,5,2,7,5\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(4\)</span></td>
<td>FFD</td>
<td><span class="arithmatex">\(10,10,10,10,10,10,10,10,10,10\)</span></td>
<td>mai</td>
</tr>
<tr>
<td><span class="arithmatex">\(4\)</span></td>
<td>esatta</td>
<td><span class="arithmatex">\(9,9,9,9,9,9,9,9,9,9\)</span></td>
<td><span class="arithmatex">\(2,3,9,12,4,5,1,3,10,2\)</span></td>
</tr>
</table></div>

- Con la riparazione FFD, la $LNS$ non migliora <strong>mai</strong> l'impacchettamento FFD: gli oggetti tolti da un impacchettamento FFD vengono reimpacchettati da FFD nello stesso modo. Con la riparazione esatta e $q\ge 3$ raggiunge l'ottimo in ogni esecuzione, in poche iterazioni: trova tre contenitori i cui oggetti entrano in due, ed è ciò che FFD non vede. Con $q=2$ anche la riparazione esatta fallisce, perché gli oggetti di due contenitori di un impacchettamento FFD non entrano mai in uno solo.

!!! chiave ""

    Un intorno grande si esplora risolvendo un <strong>sottoproblema</strong>: la parte della soluzione lasciata libera dal metodo di distruzione viene riottimizzata, mentre il resto è fissato. Più potente è il metodo che risolve il sottoproblema, più potente è l'intorno.

## 32.9.2 Adaptive large neighbourhood search { #sez-sec-alns }

- Quale metodo di distruzione funzioni meglio dipende dall'istanza, e dalla fase della ricerca. La LNS <strong>adattiva</strong> (ALNS), introdotta da Ropke e Pisinger (2006), usa più metodi di distruzione (e di riparazione), ne sceglie uno a caso a ogni iterazione, e <strong>impara</strong> quali funzionano, assegnando a ogni metodo $o$ un peso $w_o$:

!!! chiave ""

    $$
    P(\text{scegliere } o) \;=\; \frac{w_o}{\sum_{o'} w_{o'}},
    \qquad\qquad
    w_o \;\leftarrow\; (1-\rho)\,w_o + \rho\,\psi ,
    $$

    dove $\rho\in[0,1]$ è il <em>fattore di reazione</em> e il punteggio $\psi$ premia l'esito dell'iterazione in cui $o$ è stato usato: $\psi=3$ se la nuova soluzione è la migliore trovata finora, $2$ se è migliore di quella corrente, $1$ se è altrettanto buona, $0$ se è peggiore.

!!! algoritmo "Algoritmo: Adaptive large neighbourhood search per il TSP"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> distanze <span class="arithmatex">\(d\)</span>, giro di partenza <span class="arithmatex">\(\sigma\)</span>, <span class="arithmatex">\(q\)</span>, <span class="arithmatex">\(maxIter\)</span>, fattore di reazione <span class="arithmatex">\(\rho\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> migliore giro trovato</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> ALNS(<span class="arithmatex">\(d, \sigma, q, maxIter, \rho\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(cur := \sigma\)</span>;  <span class="arithmatex">\(best := \sigma\)</span>;  <span class="arithmatex">\(w_1 := 1\)</span>;  <span class="arithmatex">\(w_2 := 1\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(it := 1\)</span> <strong>to</strong> <span class="arithmatex">\(maxIter\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><strong>if</strong> <span class="arithmatex">\(\textsc{Rand}()\cdot(w_1+w_2) < w_1\)</span> <strong>then</strong> <span class="arithmatex">\(o := 1\)</span> <strong>else</strong> <span class="arithmatex">\(o := 2\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><span class="arithmatex">\(nw := cur\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">6</span><strong>if</strong> <span class="arithmatex">\(o=1\)</span> <strong>then</strong> <span class="arithmatex">\(removed := \textsc{RandomRemoval}(nw, q)\)</span> <strong>else</strong> <span class="arithmatex">\(removed := \textsc{WorstRemoval}(nw, q)\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">7</span><span class="arithmatex">\(\textsc{CheapestInsertionRepair}(nw, removed)\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">8</span><span class="arithmatex">\(\psi := 3\)</span>, <span class="arithmatex">\(2\)</span>, <span class="arithmatex">\(1\)</span> o <span class="arithmatex">\(0\)</span> se <span class="arithmatex">\(L(nw)<L(best)\)</span>, <span class="arithmatex">\(L(nw)<L(cur)\)</span>, <span class="arithmatex">\(L(nw)=L(cur)\)</span>, <span class="arithmatex">\(L(nw)>L(cur)\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">9</span><strong>if</strong> <span class="arithmatex">\(L(nw)\le L(cur)\)</span> <strong>then</strong> <span class="arithmatex">\(cur := nw\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">10</span><strong>if</strong> <span class="arithmatex">\(L(cur) < L(best)\)</span> <strong>then</strong> <span class="arithmatex">\(best := cur\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">11</span><span class="arithmatex">\(w_o := (1-\rho)\,w_o + \rho\,\psi\)</span> <span class="pc-com">▹ pesi adattivi</span></div><div class="pc" style="--liv:1"><span class="pc-n">12</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">13</span><strong>return</strong> <span class="arithmatex">\(best\)</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/metaheuristics_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/metaheuristics_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- WORSTREMOVAL toglie, $q$ volte, la città la cui rimozione accorcia di più il giro: la città $v$, fra $a$ e $b$, di massimo $d_{av}+d_{vb}-d_{ab}$. È un metodo di distruzione deterministico e greedy: toglie le città che sembrano mal posizionate.

- Su TSP20, dal giro nearest neighbour, con $q=5$, $200$ iterazioni e $\rho=0.1$, la ALNS raggiunge l'ottimo in $7$ esecuzioni su $10$ (media $299.4$).

- Alla fine il peso della rimozione casuale è fra $0.77$ e $0.98$, il peso della worst removal fra $0.03$ e $0.08$: il metodo ha imparato che, da un giro buono, togliere le città peggio posizionate e reinserirle con cheapest insertion ricostruisce quasi sempre un giro non migliore, e ha quasi smesso di usarla.

- In queste esecuzioni la $LNS$ semplice con rimozione casuale ($q=5$) fa leggermente meglio: l'adattività ripaga quando ci sono molti metodi, di qualità ignota, ed esecuzioni lunghe.

---

**Avanti:** [32.10 Metodi basati su popolazioni: algoritmi genetici e memetici](metodi-basati-su-popolazioni-algoritmi-genetici-e-memetici.md)
