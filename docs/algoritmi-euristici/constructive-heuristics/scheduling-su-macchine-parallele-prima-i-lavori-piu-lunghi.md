---
title: "Scheduling su macchine parallele: prima i lavori più lunghi"
---

# 30.6 Scheduling su macchine parallele: prima i lavori più lunghi { #sez-sec-PCM }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 30** · [:material-book-open-variant: Capitolo 30: Euristiche costruttive](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-presentation: Slide (1/2)](../../pdf/slide-constructive-heuristics-1.pdf) · [:material-presentation: Slide (2/2)](../../pdf/slide-constructive-heuristics-2.pdf) · [:material-pencil: Esercizi: Euristiche costruttive](../../esercizi/constructive-heuristics.md) · [:material-gesture-tap: App: Euristiche per il bin packing](../../laboratorio/euristiche-bin-packing.md) · [:material-gesture-tap: App: List scheduling e LPT](../../laboratorio/list-scheduling-lpt.md) · [:material-gesture-tap: App: Colorazione: greedy e DSATUR](../../laboratorio/colorazione-greedy-dsatur.md) · [:material-gesture-tap: App: TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md)

</div>

- Per $P\,||\,C_{\max}$ gli elementi sono gli assegnamenti dei lavori alle macchine, e ogni assegnamento è ammissibile. Una regola greedy naturale assegna ogni lavoro alla macchina che in quel momento è <strong>la meno carica</strong>, così che i carichi crescano nel modo più uniforme possibile. Come per il BPP, la regola sceglie la macchina, e l'ordine dei lavori è una seconda scelta, indipendente.

## 30.6.1 List scheduling { #sez-sec-LIST }

!!! chiave ""

    Il <em>List Scheduling Algorithm</em> (indicato con $LIST$) è un'euristica costruttiva per $P\,||\,C_{\max}$. Esamina i lavori nell'ordine di una lista data $\rho$ e assegna ogni lavoro a una macchina con il carico corrente minimo (in caso di pareggio, la macchina con l'indice minimo).

!!! algoritmo "Algoritmo: List Scheduling"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> istanza di <span class="arithmatex">\(P\,||\,C_{\max}\)</span> con <span class="arithmatex">\(n\)</span> lavori, tempi <span class="arithmatex">\(t[1..n]\)</span>, <span class="arithmatex">\(m\)</span> macchine; lista <span class="arithmatex">\(\rho[1..n]\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> assegnamento lavori-macchine <span class="arithmatex">\(mach[1..n]\)</span> e makespan <span class="arithmatex">\(C_{\max}\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> ListScheduling(<span class="arithmatex">\(n, m, t, \rho\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(mach := \text{nuovo vettore}[1..n]\)</span> <span class="pc-com">▹ assegnamento lavori-macchine</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(h := 1\)</span> <strong>to</strong> <span class="arithmatex">\(m\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><span class="arithmatex">\(L[h] \leftarrow 0\)</span> <span class="pc-com">▹ carichi delle macchine</span></div><div class="pc" style="--liv:1"><span class="pc-n">5</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">6</span><strong>for</strong> <span class="arithmatex">\(k := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">7</span><span class="arithmatex">\(j := \rho[k]\)</span>
    <span class="arithmatex">\(s :=\)</span> una macchina con <span class="arithmatex">\(L[s]\)</span> minimo (indice minimo)
    <span class="arithmatex">\(mach[j] \leftarrow s\)</span>
    <span class="arithmatex">\(L[s] \leftarrow L[s] + t[j]\)</span> <span class="pc-com">▹ <span class="arithmatex">\(k\)</span>-esimo lavoro della lista macchina meno carica assegnare il lavoro <span class="arithmatex">\(j\)</span> alla macchina <span class="arithmatex">\(s\)</span></span></div><div class="pc" style="--liv:1"><span class="pc-n">8</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">9</span><strong>return</strong> <span class="arithmatex">\(mach\)</span>, <span class="arithmatex">\(C_{\max}=\max_h L[h]\)</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- $LIST$ è il corrispondente, nello scheduling, di una regola <em>online</em>: non ha bisogno di conoscere i lavori futuri, e si usa, per esempio, quando i lavori arrivano uno alla volta. Con una scansione lineare delle macchine richiede tempo $O(nm)$, e tempo $O(n\log m)$ con un heap dei carichi.

- Nell'istanza di riferimento, $t=(5,5,4,4,3,3,3)$, i lavori sono elencati per tempo di esecuzione non crescente, che è un ordine favorevole. Per vedere l'effetto dell'ordine, l'esempio esamina gli stessi lavori nella lista inversa.

<a id="box-7-ex-list"></a>

!!! esempio "Esempio 30.5: $LIST$ sull'istanza di riferimento, prima i lavori più brevi"

    Consideriamo la lista $\rho=(7,6,5,4,3,2,1)$, cioè i lavori per tempo di esecuzione non decrescente. I carichi prima di ogni assegnamento e la macchina scelta sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>lavoro <span class="arithmatex">\(j\)</span></th>
    <th><span class="arithmatex">\(t_j\)</span></th>
    <th>carichi <span class="arithmatex">\((L_1,L_2,L_3)\)</span> prima</th>
    <th>macchina</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\((0,0,0)\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\((3,0,0)\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\((3,3,0)\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\((3,3,3)\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\((7,3,3)\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\((7,7,3)\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\((7,7,8)\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    </table></div>

    I carichi finali sono $(12,7,8)$, con $J_1=\{7,4,1\}$, $J_2=\{6,3\}$, $J_3=\{5,2\}$, e $LIST(I)=12$:

    ![Figura 3](../../img/constructive-heuristics/fig03.svg){ .fig loading=lazy  }

    L'ultimo lavoro della lista è uno dei più lunghi: quando arriva, la macchina meno carica ha già carico $7$, e il makespan salta a $12$, tre unità sopra il lower bound $9$ (linea grigia tratteggiata).

<a id="box-8-prop-graham66"></a>

!!! teorema "Proposizione 30.3"

    Per ogni istanza di $P\,||\,C_{\max}$, che indichiamo con $I$, e ogni lista $\rho$,

    $$
    LIST(I) \;\le\; \left(2-\frac{1}{m}\right) z(I) .
    $$

??? dimostrazione "Dimostrazione"

    Dimostrazione omessa. Il risultato è dovuto a

    R.L. Graham, <em>Bounds for certain multiprocessing anomalies</em>, Bell System Technical Journal 45 (1966) 1563–1581. <span class="qed">□</span>

!!! chiave ""

    $LIST$ è un algoritmo di $\left(2-\frac{1}{m}\right)$-approssimazione per $P\,||\,C_{\max}$, qualunque sia l'ordine della lista.

- Nell'esempio, $LIST(I)=12\le \frac{5}{3}\cdot 9=15$.

## 30.6.2 Longest processing time first { #sez-sec-LPT }

!!! chiave ""

    Il <em>Longest Processing Time first Algorithm</em> (indicato con $LPT$) è un'euristica costruttiva per $P\,||\,C_{\max}$. Ordina i lavori per tempo di esecuzione non crescente e applica $LIST$ a questa lista: ogni lavoro, dal più lungo al più breve, si assegna a una macchina meno carica.

!!! algoritmo "Algoritmo: Longest Processing Time first"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> istanza di <span class="arithmatex">\(P\,||\,C_{\max}\)</span> con <span class="arithmatex">\(n\)</span> lavori, tempi <span class="arithmatex">\(t[1..n]\)</span>, <span class="arithmatex">\(m\)</span> macchine</div><div class="pc" style="--liv:0"><strong>Output:</strong> assegnamento lavori-macchine <span class="arithmatex">\(mach[1..n]\)</span> e makespan <span class="arithmatex">\(C_{\max}\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> LPT(<span class="arithmatex">\(n, m, t\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(\rho :=\)</span> i lavori ordinati per <span class="arithmatex">\(t[j]\)</span> non crescente (pareggi per indice) <span class="pc-com">▹ prima i lavori più lunghi</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>return</strong> ListScheduling(<span class="arithmatex">\(n, m, t, \rho\)</span>)</div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- <strong>Perché prima i lavori più lunghi.</strong> Il makespan è deciso dal lavoro che finisce per ultimo. Se i lavori in fondo alla lista sono brevi, gli ultimi assegnamenti possono aggiungere solo poco alla macchina meno carica, e fanno da “sabbia” che livella i carichi. Il parallelo con FFD è esatto: prima gli elementi grandi, poi quelli piccoli a riempire i vuoti.

- $LPT$ richiede tempo $O(n\log n + n\log m)$.

<a id="box-9-ex-lpt"></a>

!!! esempio "Esempio 30.6: $LPT$ sull'istanza di riferimento"

    I lavori sono già ordinati, $\rho=(1,2,3,4,5,6,7)$. I lavori $1$, $2$, $3$ vanno sulle tre macchine vuote, con carichi $(5,5,4)$; il lavoro $4$ va sulla macchina $3$, la meno carica: $(5,5,8)$; il lavoro $5$ va sulla macchina $1$: $(8,5,8)$; il lavoro $6$ sulla macchina $2$: $(8,8,8)$; il lavoro $7$ trova tre macchine con carico $8$ e va sulla macchina $1$: $(11,8,8)$. Quindi $J_1=\{1,5,7\}$, $J_2=\{2,6\}$, $J_3=\{3,4\}$, $mach=(1,2,3,3,1,2,1)$, e $LPT(I)=11$:

    ![Figura 4](../../img/constructive-heuristics/fig04.svg){ .fig loading=lazy  }

    Il lower bound elementare del capitolo [«Algoritmi euristici: definizioni»](../heuristics.md) dà $z(I)\ge\max\left\{\max_j t_j,\left\lceil\frac{\sum_j t_j}{m}\right\rceil\right\}=\max\{5,9\}=9$, e $z(I)=9$. L'ordinamento migliora il makespan da $12$ a $11$, ma $LPT$ non è ottimo: dopo sei lavori i carichi sono perfettamente bilanciati, $(8,8,8)$, e il settimo lavoro li sbilancia di $3$.

<a id="box-10-prop-graham69"></a>

!!! teorema "Proposizione 30.4"

    Per ogni istanza di $P\,||\,C_{\max}$, che indichiamo con $I$,

    $$
    LPT(I) \;\le\; \left(\frac{4}{3}-\frac{1}{3m}\right) z(I) .
    $$

??? dimostrazione "Dimostrazione"

    Dimostrazione omessa. Il risultato è dovuto a

    R.L. Graham, <em>Bounds on multiprocessing timing anomalies</em>, SIAM Journal on Applied Mathematics 17 (1969) 416–429. <span class="qed">□</span>

!!! chiave ""

    $LPT$ è un algoritmo di $\left(\frac{4}{3}-\frac{1}{3m}\right)$-approssimazione per $P\,||\,C_{\max}$: ordinare la lista abbassa la garanzia di $LIST$ da $2-\frac{1}{m}$ a $\frac{4}{3}-\frac{1}{3m}$.

- Per $m=3$ il bound è $\frac{4}{3}-\frac{1}{9}=\frac{11}{9}$, e sull'istanza di riferimento

    $$
    \frac{LPT(I)}{z(I)}=\frac{11}{9}.
    $$

    L'istanza di riferimento raggiunge esattamente il bound di Graham: appartiene alla famiglia di istanze, data da Graham, con $2m+1$ lavori di tempi di esecuzione $2m-1,2m-1,2m-2,2m-2,\dots,m+1,m+1,m,m,m$, su cui $LPT$ dà $4m-1$ e l'ottimo è $3m$. Per $m=3$ questi sono i tempi $(5,5,4,4,3,3,3)$. Il bound della [Proposizione 30.4](#box-10-prop-graham69) non si può quindi migliorare.

---

**Avanti:** [30.7 Il problema del commesso viaggiatore: accodare o inserire?](il-problema-del-commesso-viaggiatore-accodare-o-inserire.md)
