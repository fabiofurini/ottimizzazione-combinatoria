---
title: "PD per il problema degli zaini multipli"
---

# PD per il problema degli zaini multipli

<div class="info-capitolo" markdown>

**Parte 3 · Programmazione dinamica · Capitolo 24** · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../pdf/dispensa-3-programmazione-dinamica.pdf) · [:material-presentation: Slide](../pdf/slide-dp-multiple-knapsack.pdf) · [:material-pencil: Esercizi: Zaini multipli (MKP)](../esercizi/dp-multiple-knapsack.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, il capitolo [«PD per il problema dello zaino 0/1»](dp-knapsack/index.md): la ricorrenza $v(j,k)$ del problema dello zaino 0/1 (KP) su oggetti e capacità, la matrice $s$ delle decisioni e la ricostruzione di una soluzione.

    - Da questo modulo, il capitolo [«Problemi di zaino»](../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-degli-zaini-multipli.md): il problema degli zaini multipli, con $m$ zaini di capacità $c_1,\dots,c_m$.

    - Dal modulo <em>Algoritmi</em>: [le convenzioni dello pseudocodice (Capitolo 2)](https://fabiofurini.github.io/algoritmi/algoritmi-di-base/02-pseudocodice/) e [la dimensione dell'input (Capitolo 11)](https://fabiofurini.github.io/algoritmi/analisi/11-dimensione-input/).

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - scrivere la ricorrenza $v(j,k_1,\dots,k_m)$ sugli oggetti e sulle capacità residue degli $m$ zaini;

    - eseguire a mano l'algoritmo di PD su un'istanza con $m=2$ zaini, una matrice per ogni oggetto;

    - ricostruire dalle tabelle $s$ una soluzione ottima, con lo zaino di ogni oggetto selezionato;

    - contare i $\Theta(m\,n\prod_{i=1}^{m}(c_i+1))$ passi e spiegare perché il numero di stati cresce esponenzialmente con $m$.

Il problema di questo capitolo è il [problema degli zaini multipli (MKP)](../catalogo/multiple-knapsack-problem.md): la sua definizione e le sue ipotesi sono nella sua pagina.

## 24.1 Un algoritmo di PD

- Indichiamo con $i\in\mathscr{K}=\{1,2,\dots,m\}$ uno zaino generico, perché nei capitoli di PD la lettera $k$ indica una capacità. Lo zaino $i$ ha capacità $c_i$.

- Una soluzione assegna ogni oggetto $j$ a uno zaino oppure lo esclude: si descrive con il vettore $(a_1,a_2,\dots,a_n)$, dove $a_j=i$ se l'oggetto $j$ è inserito nello zaino $i$, e $a_j=0$ se l'oggetto $j$ non è selezionato.

- Il vettore $\vet{e}_i$ è l'$i$-esimo vettore unitario di lunghezza $m$: $\vet{k}-w_j\vet{e}_i$ è il vettore $\vet{k}$ con la componente $k_i$ diminuita di $w_j$.

<a id="box-1-texmkpex1"></a>

!!! esempio "Esempio 24.1: Istanza dell'MKP"

    Consideriamo $m=2$ zaini con capacità $c_1=5$ e $c_2=4$, e un insieme $\mathscr{I}=\{1,2,3,4\}$ di $4$ oggetti ($n=4$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|rrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\
    \hline {p_j} & 3 & 9 & 7 & 5 \\
    {w_j} & 3 & 4 & 4 & 2 \\
    \hline
    \end{array}
    $$

    Chiamiamo questa istanza dell'MKP <span style="color:#1971c2">[Esempio 24.1](#box-1-texmkpex1)</span>.

- <u>Passo 1</u>: calcolo del valore ottimo

    !!! formula ""

        Per ogni $j \in \{0,1,\dots,n\}$ e ogni vettore $\vet{k}=(k_1,k_2,\dots,k_m)$ con $k_i \in \{0,1,\dots,c_i\}$ per ogni $i\in\mathscr{K}$, sia $v(j,\vet{k})=v(j,k_1,\dots,k_m)$ il valore ottimo della sottoistanza dell'MKP data da:

        1. $m$ zaini, lo zaino $i$ con capacità $k_i$,

        2. un insieme $\{1,2,\dots,j\}$ di oggetti disponibili,

        3. per ogni oggetto $h \in \{1,2,\dots,j\}$, un profitto $p_h$ e un peso $w_h$.

        La formula ricorsiva per calcolare $v(j,\vet{k})$ è la seguente:

        \begin{equation*}
        \label{eq:mkp}
        v(j,\vet{k})= \left\{ \begin{array}{ll}
        0 & \textrm{se $j=0$,}\\[2ex]
        v(j-1,\vet{k}) & \begin{array}[t]{@{}l@{}}\textrm{se $j\ge 1$ e}\\ \textrm{$w_j>k_i$ per ogni $i$,}\end{array}\\[4ex]
        \begin{array}[t]{@{}l@{}}\displaystyle \max \big\{ v(j-1,\vet{k}),\\ \quad p_j+\displaystyle\max_{i:\,w_j\le k_i} v(j-1,\vet{k}-w_j\vet{e}_i) \big\}\end{array} & \begin{array}[t]{@{}l@{}}\textrm{se $j\ge 1$ e}\\ \textrm{$w_j\le k_i$ per qualche $i$.}\end{array}
        \end{array} \right. \tag{24.1}
        \end{equation*}

    - Le componenti di $\vet{k}$ sono le <strong>capacità residue</strong> degli zaini: nella visione top-down, le decisioni sugli oggetti $j+1,\dots,n$ hanno già usato $c_i-k_i$ unità dello zaino $i$.

    - Con $m=1$ la formula $\eqref{eq:mkp}$ è la ricorrenza del KP.

    - I casi base sono $v(0,\vet{k})=0$ per ogni vettore $\vet{k}$, perché nessun oggetto è disponibile.

    - La formula genera al più $m+1$ <strong>sottoproblemi indipendenti</strong>: l'oggetto $j$ viene escluso, oppure viene inserito in uno degli zaini $i$ con $w_j\le k_i$, e allora diminuisce solo la capacità dello zaino $i$.

        $\rightsquigarrow$ <strong>Sottostruttura ottima verificata!</strong>

    - Assegnamenti diversi degli oggetti $j+1,\dots,n$ possono lasciare le stesse capacità residue, e quindi lo stesso valore $v(j,\vet{k})$ può servire più volte.

        $\rightsquigarrow$ <strong>Sottoproblemi sovrapposti verificati!</strong>

    - Il valore $v(j,\vet{k})$ dipende solo da valori della riga $j-1$. Quindi l'<strong>approccio bottom-up</strong> calcola le righe $j=0,1,\dots,n$ in quest'ordine, e in ogni riga tutti i vettori $\vet{k}$ in un ordine qualsiasi. Con $m=2$ la riga $j$ è una matrice, con una riga per ogni $k_1$ e una colonna per ogni $k_2$.

- <u>Passo 2</u>: calcolo di una soluzione ottima

    - Per ogni oggetto $j$ e vettore $\vet{k}$ memorizziamo $s[j][\vet{k}]=i$ se l'oggetto $j$ è inserito nello zaino $i$ nella soluzione ottima trovata per $(j,\vet{k})$, e $s[j][\vet{k}]=0$ se l'oggetto $j$ è escluso.

    - L'insieme di tutti i vettori $\vet{k}$ è $\mathscr{C}=\{0,1,\dots,c_1\}\times\{0,1,\dots,c_2\}\times\dots\times\{0,1,\dots,c_m\}$.

    Questo è lo pseudocodice dell'<strong>algoritmo di PD con l'approccio bottom-up</strong>, che memorizza le tabelle $s$ insieme alle tabelle $v$:

    !!! algoritmo "Algoritmo: MKP\_DP"

        <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> Un'istanza dell'MKP data da <span class="arithmatex">\(n\)</span>, <span class="arithmatex">\(m\)</span>, dai vettori <span class="arithmatex">\(p[1..n]\)</span>, <span class="arithmatex">\(w[1..n]\)</span> e dal vettore delle capacità <span class="arithmatex">\(\vet{c}\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> Il valore ottimo dell'istanza dell'MKP e le tabelle <span class="arithmatex">\(s[j][\vet{k}]\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> MKP_DP(<span class="arithmatex">\(n,m,p,w,\vet{c}\)</span>)</div><div class="pc" style="--liv:1" id="box-2-mkpbu-a"><span class="pc-n">2</span><span class="arithmatex">\(v := \textnormal{new array}[0..n][0..c_1]\cdots[0..c_m]\)</span>; <span class="arithmatex">\(s := \textnormal{new array}[0..n][0..c_1]\cdots[0..c_m]\)</span></div><div class="pc" style="--liv:1" id="box-3-mkpbu-b"><span class="pc-n">3</span><strong>for each</strong> <span class="arithmatex">\(\vet{k} \in \mathscr{C}\)</span>  <strong>do</strong></div><div class="pc" style="--liv:2" id="box-4-mkpbu-c"><span class="pc-n">4</span><span class="arithmatex">\(v[0][\vet{k}] \leftarrow 0\)</span>; <span class="arithmatex">\(s[0][\vet{k}] \leftarrow 0\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">5</span><strong>end</strong></div><div class="pc" style="--liv:1" id="box-5-mkpbu-d"><span class="pc-n">6</span><strong>for</strong> <span class="arithmatex">\(j := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span>  <strong>do</strong></div><div class="pc" style="--liv:2" id="box-6-mkpbu-e"><span class="pc-n">7</span><strong>for each</strong> <span class="arithmatex">\(\vet{k} \in \mathscr{C}\)</span>  <strong>do</strong></div><div class="pc" style="--liv:3" id="box-7-mkpbu-f"><span class="pc-n">8</span><span class="arithmatex">\(v[j][\vet{k}] \leftarrow v[j-1][\vet{k}]\)</span>; <span class="arithmatex">\(s[j][\vet{k}] \leftarrow 0\)</span></div><div class="pc" style="--liv:3" id="box-8-mkpbu-g"><span class="pc-n">9</span><strong>for</strong> <span class="arithmatex">\(i := 1\)</span> <strong>to</strong> <span class="arithmatex">\(m\)</span>  <strong>do</strong></div><div class="pc" style="--liv:4" id="box-9-mkpbu-h"><span class="pc-n">10</span><strong>if</strong> <span class="arithmatex">\(w[j]\le k_i\)</span> e <span class="arithmatex">\(p[j]+v[j-1][\vet{k}-w[j]\,\vet{e}_i] > v[j][\vet{k}]\)</span>  <strong>then</strong></div><div class="pc" style="--liv:5" id="box-10-mkpbu-i"><span class="pc-n">11</span><span class="arithmatex">\(v[j][\vet{k}] \leftarrow p[j]+v[j-1][\vet{k}-w[j]\,\vet{e}_i]\)</span>; <span class="arithmatex">\(s[j][\vet{k}] \leftarrow i\)</span></div><div class="pc" style="--liv:4"><span class="pc-n">12</span><strong>end</strong></div><div class="pc" style="--liv:3"><span class="pc-n">13</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">14</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">15</span><strong>end</strong></div><div class="pc" style="--liv:1" id="box-11-mkpbu-j"><span class="pc-n">16</span><strong>return</strong> <span class="arithmatex">\(v[n][\vet{c}], s\)</span></div></div>

    - Per ogni vettore $\vet{k}$, l'algoritmo di PD prima esclude l'oggetto $j$, e poi prova a inserirlo in ogni zaino $i=1,2,\dots,m$ in cui entra.

    - In caso di pareggio si conserva la prima opzione incontrata: escludere l'oggetto $j$, poi lo zaino di indice minimo, perché il valore viene aggiornato solo quando è strettamente maggiore.

    <a id="box-12-texmkpbu"></a>

    !!! esempio "Esempio 24.2: Esecuzione dell'algoritmo di PD"

        Consideriamo l'istanza dell'MKP dell'<span style="color:#1971c2">[Esempio 24.1](#box-1-texmkpex1)</span>, con capacità $c_1=5$ e $c_2=4$. La riga $j=0$ è $v[0][\vet{k}]=0$ per ogni $\vet{k}$. Per ogni oggetto $j$ calcoliamo la matrice $v[j][k_1][k_2]$, con una riga per ogni $k_1\in\{0,1,\dots,5\}$ e una colonna per ogni $k_2\in\{0,1,\dots,4\}$.

        Questi sono i calcoli della cella $\vet{k}=\vet{c}=(5,4)$ per ogni oggetto, e delle celle usate dalla ricostruzione:

        - $v[1][(5,4)]=\max\{v[0][(5,4)],\,p_1+v[0][(2,4)],\,p_1+v[0][(5,1)]\}=\max\{0,\,3+0,\,3+0\}=3$

        - $v[1][(3,0)]=\max\{v[0][(3,0)],\,p_1+v[0][(0,0)]\}=\max\{0,\,3+0\}=3$

        - $v[2][(5,4)]=\max\{v[1][(5,4)],\,p_2+v[1][(1,4)],\,p_2+v[1][(5,0)]\}=\max\{3,\,9+3,\,9+3\}=12$

        - $v[2][(3,4)]=\max\{v[1][(3,4)],\,p_2+v[1][(3,0)]\}=\max\{3,\,9+3\}=12$

        - $v[3][(5,4)]=\max\{v[2][(5,4)],\,p_3+v[2][(1,4)],\,p_3+v[2][(5,0)]\}=\max\{12,\,7+9,\,7+9\}=16$

        - $v[3][(3,4)]=\max\{v[2][(3,4)],\,p_3+v[2][(3,0)]\}=\max\{12,\,7+3\}=12$

        - $v[4][(5,4)]=\max\{v[3][(5,4)],\,p_4+v[3][(3,4)],\,p_4+v[3][(5,2)]\}=\max\{16,\,5+12,\,5+9\}=17$

        Oggetto $j=1$, con $p_1=3$ e $w_1=3$:

        $$
        \begin{array}{l|rrrrr}
        \hline {v[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {3} & {3} \\
        {k_1=1} & {0} & {0} & {0} & {3} & {3} \\
        {k_1=2} & {0} & {0} & {0} & {3} & {3} \\
        {k_1=3} & {3} & {3} & {3} & {3} & {3} \\
        {k_1=4} & {3} & {3} & {3} & {3} & {3} \\
        {k_1=5} & {3} & {3} & {3} & {3} & {3} \\
        \hline
        \end{array}
        $$

        Oggetto $j=2$, con $p_2=9$ e $w_2=4$:

        $$
        \begin{array}{l|rrrrr}
        \hline {v[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {3} & {9} \\
        {k_1=1} & {0} & {0} & {0} & {3} & {9} \\
        {k_1=2} & {0} & {0} & {0} & {3} & {9} \\
        {k_1=3} & {3} & {3} & {3} & {3} & {12} \\
        {k_1=4} & {9} & {9} & {9} & {12} & {12} \\
        {k_1=5} & {9} & {9} & {9} & {12} & {12} \\
        \hline
        \end{array}
        $$

        Oggetto $j=3$, con $p_3=7$ e $w_3=4$:

        $$
        \begin{array}{l|rrrrr}
        \hline {v[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {3} & {9} \\
        {k_1=1} & {0} & {0} & {0} & {3} & {9} \\
        {k_1=2} & {0} & {0} & {0} & {3} & {9} \\
        {k_1=3} & {3} & {3} & {3} & {3} & {12} \\
        {k_1=4} & {9} & {9} & {9} & {12} & {16} \\
        {k_1=5} & {9} & {9} & {9} & {12} & {16} \\
        \hline
        \end{array}
        $$

        Oggetto $j=4$, con $p_4=5$ e $w_4=2$:

        $$
        \begin{array}{l|rrrrr}
        \hline {v[4][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {5} & {5} & {9} \\
        {k_1=1} & {0} & {0} & {5} & {5} & {9} \\
        {k_1=2} & {5} & {5} & {5} & {8} & {14} \\
        {k_1=3} & {5} & {5} & {8} & {8} & {14} \\
        {k_1=4} & {9} & {9} & {14} & {14} & {16} \\
        {k_1=5} & {9} & {9} & {14} & {14} & {17} \\
        \hline
        \end{array}
        $$

    <a id="box-13-texmkpinfo"></a>

    !!! esempio "Esempio 24.3: Le tabelle $s$"

        Per l'istanza dell'<span style="color:#1971c2">[Esempio 24.1](#box-1-texmkpex1)</span>, queste sono le matrici $s[j][k_1][k_2]$ calcolate dall'algoritmo di PD: $0$ indica che l'oggetto $j$ è escluso, $1$ e $2$ lo zaino in cui è inserito.

        Oggetto $j=1$, con $p_1=3$ e $w_1=3$:

        $$
        \begin{array}{l|rrrrr}
        \hline {s[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {2} & {2} \\
        {k_1=1} & {0} & {0} & {0} & {2} & {2} \\
        {k_1=2} & {0} & {0} & {0} & {2} & {2} \\
        {k_1=3} & {1} & {1} & {1} & {1} & {1} \\
        {k_1=4} & {1} & {1} & {1} & {1} & {1} \\
        {k_1=5} & {1} & {1} & {1} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=2$, con $p_2=9$ e $w_2=4$:

        $$
        \begin{array}{l|rrrrr}
        \hline {s[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {2} \\
        {k_1=1} & {0} & {0} & {0} & {0} & {2} \\
        {k_1=2} & {0} & {0} & {0} & {0} & {2} \\
        {k_1=3} & {0} & {0} & {0} & {0} & {2} \\
        {k_1=4} & {1} & {1} & {1} & {1} & {1} \\
        {k_1=5} & {1} & {1} & {1} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=3$, con $p_3=7$ e $w_3=4$:

        $$
        \begin{array}{l|rrrrr}
        \hline {s[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=4} & {0} & {0} & {0} & {0} & {1} \\
        {k_1=5} & {0} & {0} & {0} & {0} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=4$, con $p_4=5$ e $w_4=2$:

        $$
        \begin{array}{l|rrrrr}
        \hline {s[4][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {2} & {2} & {0} \\
        {k_1=1} & {0} & {0} & {2} & {2} & {0} \\
        {k_1=2} & {1} & {1} & {1} & {1} & {1} \\
        {k_1=3} & {1} & {1} & {2} & {1} & {1} \\
        {k_1=4} & {0} & {0} & {2} & {2} & {0} \\
        {k_1=5} & {0} & {0} & {2} & {2} & {1} \\
        \hline
        \end{array}
        $$

    - Calcolate le tabelle $s$, si ricostruisce una soluzione ottima scorrendo gli oggetti da $j=n$ fino a $j=1$, partendo da $\vet{k}=\vet{c}$ e da $a_j=0$ per ogni oggetto $j$:

        $$
        a_j \leftarrow s[j][\vet{k}], \qquad \textrm{e, se } a_j=i\ge 1,\quad \vet{k} \leftarrow \vet{k} - w_j\vet{e}_i.
        $$

    !!! algoritmo "Algoritmo: MKP\_Reconstruct"

        <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> Il numero <span class="arithmatex">\(n\)</span> di oggetti, il vettore delle capacità <span class="arithmatex">\(\vet{c}\)</span>, il vettore <span class="arithmatex">\(w[1..n]\)</span> e le tabelle <span class="arithmatex">\(s\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> Una soluzione ottima dell'istanza dell'MKP, come vettore degli zaini</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> MKP_Reconstruct(<span class="arithmatex">\(n,\vet{c},w,s\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(a := \textnormal{new array}[1..n]\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><span class="arithmatex">\(\vet{k} := \vet{c}\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">4</span><strong>for</strong> <span class="arithmatex">\(j := n\)</span> <strong>to</strong> <span class="arithmatex">\(1\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><span class="arithmatex">\(a[j] \leftarrow s[j][\vet{k}]\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">6</span><strong>if</strong> <span class="arithmatex">\(a[j]\ge 1\)</span> <strong>then</strong></div><div class="pc" style="--liv:3"><span class="pc-n">7</span><span class="arithmatex">\(\vet{k} \leftarrow \vet{k}-w[j]\,\vet{e}_{a[j]}\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">8</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">9</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">10</span><strong>return</strong> <span class="arithmatex">\(a\)</span></div></div>

    <a id="box-14-texmkpsol"></a>

    !!! esempio "Esempio 24.4: Calcolo di una soluzione ottima"

        Dopo l'esecuzione dell'algoritmo di PD sull'istanza dell'<span style="color:#1971c2">[Esempio 24.1](#box-1-texmkpex1)</span>, partiamo da $j=4$ e $\vet{k}=(5,4)$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(\vet{k}\)</span></th>
        <th><span class="arithmatex">\(s[j][\vet{k}]\)</span></th>
        <th><span class="arithmatex">\(a[1]\)</span></th>
        <th><span class="arithmatex">\(a[2]\)</span></th>
        <th><span class="arithmatex">\(a[3]\)</span></th>
        <th><span class="arithmatex">\(a[4]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\vet{k}=(5,4)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((5,4)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(a[4]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (3,4)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((3,4)\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td><span class="arithmatex">\(a[3]\leftarrow 0\)</span>, <span class="arithmatex">\(\vet{k}=(3,4)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((3,4)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>0</td>
        <td class="cella-blu">2</td>
        <td>0</td>
        <td>1</td>
        <td><span class="arithmatex">\(a[2]\leftarrow 2\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (3,0)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((3,0)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">1</td>
        <td>2</td>
        <td>0</td>
        <td>1</td>
        <td><span class="arithmatex">\(a[1]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (0,0)\)</span></td>
        </tr>
        </table></div>

        !!! chiave ""

            Il vettore $a=(1,2,0,1)$ è una soluzione ottima dell'istanza dell'MKP dell'<span style="color:#1971c2">[Esempio 24.1](#box-1-texmkpex1)</span>: lo zaino $1$ contiene gli oggetti $\{1,4\}$, di peso totale $3+2=5\le c_1$, e lo zaino $2$ contiene gli oggetti $\{2\}$, di peso totale $4\le c_2$. Il valore ottimo è $v(4,5,4)=17$.

        Riempire gli zaini uno dopo l'altro non basta: il miglior riempimento del solo zaino $1$ è $\{2\}$, di profitto $9$, e il miglior riempimento dello zaino $2$ con gli oggetti rimasti è $\{3\}$, di profitto $7$, per un totale di $16<17$.

### 24.1.1 Numero di passi

- Sia $N=|\mathscr{C}|=\prod_{i=1}^{m}(c_i+1)$ il numero di vettori $\vet{k}$, e indichiamo con $S(n,m,\vet{c})$ il numero di passi eseguiti da <code>MKP\_DP</code> nel caso peggiore. Inserire l'oggetto $j$ nello zaino $i$ cambia solo la componente $k_i$, quindi le righe [10](#box-9-mkpbu-h) e [11](#box-10-mkpbu-i) contano un passo ciascuna:

    - Le <span style="color:#e03131">righe</span> [2](#box-2-mkpbu-a) e [16](#box-11-mkpbu-j) vengono eseguite $1$ volta ciascuna.

    - Le <span style="color:#e03131">righe</span> [3](#box-3-mkpbu-b) e [4](#box-4-mkpbu-c) vengono eseguite $N$ volte ciascuna.

    - La <span style="color:#e03131">riga</span> [6](#box-5-mkpbu-d) viene eseguita $n$ volte.

    - Le <span style="color:#e03131">righe</span> [7](#box-6-mkpbu-e) e [8](#box-7-mkpbu-f) vengono eseguite $nN$ volte ciascuna.

    - Le <span style="color:#e03131">righe</span> [9](#box-8-mkpbu-g), [10](#box-9-mkpbu-h) e [11](#box-10-mkpbu-i) vengono eseguite al più $m\,nN$ volte ciascuna.

- Quindi il numero totale di passi nel caso peggiore è

    $$
    S(n,m,\vet{c})=3m\,nN+2nN+2N+n+2,
    $$

    e, poiché $3m\,nN\le S(n,m,\vet{c})\le 10m\,nN$,

    $$
    S(n,m,\vet{c})=\Theta\Big(m\,n\prod_{i=1}^{m}(c_i+1)\Big).
    $$

    !!! chiave ""

        L'algoritmo di PD per l'MKP esegue $\Theta(m\,n\prod_{i=1}^{m}(c_i+1))$ passi nel caso peggiore. Per un numero $m$ fissato di zaini questo è $\Theta(n\prod_{i=1}^{m}c_i)$, un numero pseudo-polinomiale di passi.

- La ricostruzione esegue $\Theta(n)$ passi.

### 24.1.2 La crescita con il numero di zaini

- Ogni nuovo zaino moltiplica il numero di stati per $c_i+1$. Se tutte le capacità sono uguali a $c$, la tabella ha $(n+1)(c+1)^m$ celle: il numero di stati cresce <strong>esponenzialmente</strong> con $m$, mentre la dimensione dell'input cresce di un solo numero, la capacità $c_i$.

- Con $n=50$ oggetti e capacità $c_i=100$, la tabella ha $51\cdot 101=5151$ celle con $m=1$, $51\cdot 101^2=520\,251$ con $m=2$, e $51\cdot 101^5\approx 5.4\cdot 10^{11}$ con $m=5$.

- Zaini con la stessa capacità danno stati simmetrici: se $c_1=c_2$, i vettori $(k_1,k_2,\dots)$ e $(k_2,k_1,\dots)$ hanno lo stesso valore ottimo, e l'algoritmo di PD li calcola entrambi.

## 24.2 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Diminuire tutte le capacità.</strong> L'oggetto $j$ va in un solo zaino: $\vet{k}-w_j\vet{e}_i$ diminuisce la componente $k_i$, non tutte come nel problema dello zaino multidimensionale.

    - <strong>Usare un'unica capacità $c_1+\dots+c_m$.</strong> Il KP con la capacità totale dà solo un upper bound: la sua soluzione può non essere divisibile fra gli zaini.

    - <strong>Riempire gli zaini uno dopo l'altro.</strong> Un riempimento ottimo dello zaino $1$, seguito da un riempimento ottimo dello zaino $2$ con gli oggetti rimasti, può essere peggiore dell'ottimo.

    - <strong>Dimenticare l'opzione «oggetto escluso».</strong> Il termine $v(j-1,\vet{k})$ è sempre un candidato, anche quando l'oggetto $j$ entra in qualche zaino.

## 24.3 In sintesi

!!! chiave "In sintesi"

    - Lo stato dell'algoritmo di PD è dato dall'oggetto $j$ e dal vettore $\vet{k}$ delle capacità residue degli $m$ zaini.

    - L'oggetto $j$ viene escluso o inserito in uno zaino $i$ in cui entra: $m+1$ opzioni, e diminuisce solo $k_i$.

    - L'algoritmo di PD esegue $\Theta(m\,n\prod_{i=1}^{m}(c_i+1))$ passi: il numero di stati cresce esponenzialmente con $m$.

    - Le tabelle $s$ memorizzano lo zaino di ogni oggetto, e una soluzione ottima si legge all'indietro a partire da $(n,\vet{c})$.

    <strong>Quadro riassuntivo dell'esempio dell'MKP.</strong> [Esempio 24.1](#box-1-texmkpex1) ($\vet{c}=(5,4)$, quattro oggetti):

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Metodo</th>
    <th>Lower bound</th>
    <th>Upper bound</th>
    <th>Origine</th>
    </tr>
    <tr>
    <td>Algoritmo di PD</td>
    <td><span class="arithmatex">\(17\)</span></td>
    <td><span class="arithmatex">\(17\)</span></td>
    <td>valore ottimo, soluzione <span class="arithmatex">\(a=(1,2,0,1)\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Zaini multipli (MKP)](../esercizi/dp-multiple-knapsack.md)
