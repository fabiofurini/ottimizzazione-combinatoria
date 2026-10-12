---
title: "PD per il problema dello zaino multidimensionale"
---

# PD per il problema dello zaino multidimensionale

<div class="info-capitolo" markdown>

**Parte 3 · Programmazione dinamica · Capitolo 22** · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../pdf/dispensa-3-programmazione-dinamica.pdf) · [:material-pencil: Esercizi: Zaino multidimensionale (MDKP)](../esercizi/dp-multidimensional-knapsack.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, il capitolo [«PD per il problema dello zaino 0/1»](dp-knapsack/index.md): la ricorrenza $v(j,k)$ del problema dello zaino 0/1 (KP) su oggetti e capacità, la matrice $s$ delle decisioni e la ricostruzione di una soluzione.

    - Da questo modulo, il capitolo [«Problemi di zaino»](../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-multidimensionale.md): il problema dello zaino multidimensionale, con una capacità $c_d$ e un peso $w_{dj}$ per ogni dimensione $d$.

    - Dal modulo <em>Algoritmi</em>: [le convenzioni dello pseudocodice (Capitolo 2)](https://fabiofurini.github.io/algoritmi/algoritmi-di-base/02-pseudocodice/) e [la dimensione dell'input (Capitolo 11)](https://fabiofurini.github.io/algoritmi/analisi/11-dimensione-input/).

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - scrivere la ricorrenza $v(j,k_1,\dots,k_m)$ sugli oggetti e sul vettore delle capacità;

    - eseguire a mano l'algoritmo di PD su un'istanza con $m=2$ dimensioni, una matrice per ogni oggetto;

    - ricostruire una soluzione ottima dalle tabelle $s$;

    - contare i $\Theta(m\,n\prod_{d=1}^{m} (c_d+1))$ passi e spiegare perché il numero di stati cresce esponenzialmente con $m$.

Il problema di questo capitolo è il [problema dello zaino multidimensionale (MDKP)](../catalogo/multidimensional-knapsack-problem.md): la sua definizione e le sue ipotesi sono nella sua pagina.

## 22.1 Un algoritmo di PD

- Indichiamo con $m$ il numero di dimensioni, quindi $\mathscr{D}=\{1,2,\dots,m\}$, perché nei capitoli di PD la lettera $k$ indica una capacità. L'oggetto $j$ ha il <strong>vettore dei pesi</strong> $\vet{w}_j=(w_{1j},w_{2j},\dots,w_{mj})$, e lo zaino ha il vettore delle capacità $\vet{c}=(c_1,c_2,\dots,c_m)$.

- Per due vettori, $\vet{w}_j\le\vet{k}$ significa $w_{dj}\le k_d$ per ogni dimensione $d\in\mathscr{D}$.

- Una soluzione si descrive con il vettore binario $(x_1,x_2,\dots,x_n)$, dove $x_j=1$ se l'oggetto $j$ è selezionato; è ammissibile se $\sum_{j=1}^{n} w_{dj}x_j\le c_d$ per ogni $d\in\mathscr{D}$.

<a id="box-1-texmdkpex1"></a>

!!! esempio "Esempio 22.1: Istanza dell'MDKP"

    Consideriamo uno zaino con $m=2$ dimensioni e capacità $c_1=5$ e $c_2=4$, e un insieme $\mathscr{I}=\{1,2,3,4\}$ di $4$ oggetti ($n=4$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|rrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\
    \hline {p_j} & 9 & 8 & 3 & 9 \\
    {w_{1j}} & 1 & 4 & 2 & 3 \\
    {w_{2j}} & 2 & 1 & 1 & 4 \\
    \hline
    \end{array}
    $$

    Chiamiamo questa istanza dell'MDKP <span style="color:#1971c2">[Esempio 22.1](#box-1-texmdkpex1)</span>.

- <u>Passo 1</u>: calcolo del valore ottimo

    !!! formula ""

        Per ogni $j \in \{0,1,\dots,n\}$ e ogni vettore $\vet{k}=(k_1,k_2,\dots,k_m)$ con $k_d \in \{0,1,\dots,c_d\}$ per ogni $d\in\mathscr{D}$, sia $v(j,\vet{k})=v(j,k_1,\dots,k_m)$ il valore ottimo della sottoistanza dell'MDKP data da:

        1. uno zaino con capacità $k_d$ in ogni dimensione $d\in\mathscr{D}$,

        2. un insieme $\{1,2,\dots,j\}$ di oggetti disponibili,

        3. per ogni oggetto $h \in \{1,2,\dots,j\}$, un profitto $p_h$ e un vettore dei pesi $\vet{w}_h$.

        La formula ricorsiva per calcolare $v(j,\vet{k})$ è la seguente:

        \begin{equation*}
        \label{eq:mdkp}
        v(j,\vet{k})= \left\{ \begin{array}{ll}
        0 & \textrm{se $j=0$,}\\[2ex]
        v(j-1,\vet{k}) & \begin{array}[t]{@{}l@{}}\textrm{se $j\ge 1$ e}\\ \textrm{$w_{dj}>k_d$ per qualche $d$,}\end{array}\\[4ex]
        \begin{array}[t]{@{}l@{}}\displaystyle \max \bigg\{ v(j-1,\vet{k}),\\ \qquad p_j+v(j-1,\vet{k}-\vet{w}_j) \bigg\}\end{array} & \textrm{se $j\ge 1$ e $\vet{w}_j\le\vet{k}$.}
        \end{array} \right. \tag{22.1}
        \end{equation*}

    - Con $m=1$ la formula $\eqref{eq:mdkp}$ è la ricorrenza del KP: l'unica differenza è che la capacità $k$ diventa il vettore $\vet{k}$, e «l'oggetto $j$ entra nello zaino» significa $\vet{w}_j\le\vet{k}$.

    - I casi base sono $v(0,\vet{k})=0$ per ogni vettore $\vet{k}$, perché nessun oggetto è disponibile.

    - La formula genera al più $2$ <strong>sottoproblemi indipendenti</strong>: l'oggetto $j$ non è selezionato, e il sottoproblema residuo ha lo stesso vettore $\vet{k}$, oppure è selezionato, e il sottoproblema residuo ha il vettore $\vet{k}-\vet{w}_j$.

        $\rightsquigarrow$ <strong>Sottostruttura ottima verificata!</strong>

    - Decisioni diverse sugli oggetti $j+1,\dots,n$ possono lasciare lo stesso vettore di capacità residue, e quindi lo stesso valore $v(j,\vet{k})$ può servire più volte.

        $\rightsquigarrow$ <strong>Sottoproblemi sovrapposti verificati!</strong>

    - Il valore $v(j,\vet{k})$ dipende solo da valori della riga $j-1$. Quindi l'<strong>approccio bottom-up</strong> calcola le righe $j=0,1,\dots,n$ in quest'ordine, e in ogni riga tutti i vettori $\vet{k}$ in un ordine qualsiasi.

    - Lo <strong>stato</strong> dell'algoritmo di PD è la coppia $(j,\vet{k})$: per ogni $j$ la tabella ha una cella per ogni vettore $\vet{k}$, cioè $\prod_{d=1}^{m}(c_d+1)$ celle. Con $m=2$ la riga $j$ è una matrice, con una riga per ogni $k_1$ e una colonna per ogni $k_2$.

- <u>Passo 2</u>: calcolo di una soluzione ottima

    - Per ogni oggetto $j$ e vettore $\vet{k}$ memorizziamo $s[j][\vet{k}]=1$ se l'oggetto $j$ è selezionato nella soluzione ottima trovata per $(j,\vet{k})$, e $s[j][\vet{k}]=0$ altrimenti.

    - L'insieme di tutti i vettori $\vet{k}$ è $\mathscr{C}=\{0,1,\dots,c_1\}\times\{0,1,\dots,c_2\}\times\dots\times\{0,1,\dots,c_m\}$.

    Questo è lo pseudocodice dell'<strong>algoritmo di PD con l'approccio bottom-up</strong>, che memorizza le tabelle $s$ insieme alle tabelle $v$:

    !!! algoritmo "Algoritmo: MDKP\_DP"

        <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> Un'istanza dell'MDKP data da <span class="arithmatex">\(n\)</span>, <span class="arithmatex">\(m\)</span>, dal vettore <span class="arithmatex">\(p[1..n]\)</span>, dai vettori dei pesi <span class="arithmatex">\(\vet{w}_1,\dots,\vet{w}_n\)</span> e dal vettore delle capacità <span class="arithmatex">\(\vet{c}\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> Il valore ottimo dell'istanza dell'MDKP e le tabelle <span class="arithmatex">\(s[j][\vet{k}]\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> MDKP_DP(<span class="arithmatex">\(n,m,p,\vet{w},\vet{c}\)</span>)</div><div class="pc" style="--liv:1" id="box-2-mdkpbu-a"><span class="pc-n">2</span><span class="arithmatex">\(v := \textnormal{new array}[0..n][0..c_1]\cdots[0..c_m]\)</span>; <span class="arithmatex">\(s := \textnormal{new array}[0..n][0..c_1]\cdots[0..c_m]\)</span></div><div class="pc" style="--liv:1" id="box-3-mdkpbu-b"><span class="pc-n">3</span><strong>for each</strong> <span class="arithmatex">\(\vet{k} \in \mathscr{C}\)</span>  <strong>do</strong></div><div class="pc" style="--liv:2" id="box-4-mdkpbu-c"><span class="pc-n">4</span><span class="arithmatex">\(v[0][\vet{k}] \leftarrow 0\)</span>; <span class="arithmatex">\(s[0][\vet{k}] \leftarrow 0\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">5</span><strong>end</strong></div><div class="pc" style="--liv:1" id="box-5-mdkpbu-d"><span class="pc-n">6</span><strong>for</strong> <span class="arithmatex">\(j := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span>  <strong>do</strong></div><div class="pc" style="--liv:2" id="box-6-mdkpbu-e"><span class="pc-n">7</span><strong>for each</strong> <span class="arithmatex">\(\vet{k} \in \mathscr{C}\)</span>  <strong>do</strong></div><div class="pc" style="--liv:3" id="box-7-mdkpbu-f"><span class="pc-n">8</span><span class="arithmatex">\(v[j][\vet{k}] \leftarrow v[j-1][\vet{k}]\)</span>; <span class="arithmatex">\(s[j][\vet{k}] \leftarrow 0\)</span></div><div class="pc" style="--liv:3" id="box-8-mdkpbu-g"><span class="pc-n">9</span><strong>if</strong> <span class="arithmatex">\(\vet{w}_j\le\vet{k}\)</span> e <span class="arithmatex">\(p[j]+v[j-1][\vet{k}-\vet{w}_j] > v[j][\vet{k}]\)</span>  <strong>then</strong></div><div class="pc" style="--liv:4" id="box-9-mdkpbu-h"><span class="pc-n">10</span><span class="arithmatex">\(v[j][\vet{k}] \leftarrow p[j]+v[j-1][\vet{k}-\vet{w}_j]\)</span>; <span class="arithmatex">\(s[j][\vet{k}] \leftarrow 1\)</span></div><div class="pc" style="--liv:3"><span class="pc-n">11</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">12</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">13</span><strong>end</strong></div><div class="pc" style="--liv:1" id="box-10-mdkpbu-i"><span class="pc-n">14</span><strong>return</strong> <span class="arithmatex">\(v[n][\vet{c}], s\)</span></div></div>

    - La struttura è quella dell'algoritmo di PD del KP; il ciclo sulle capacità diventa un ciclo su tutti i vettori $\vet{k}\in\mathscr{C}$.

    - Il test $\vet{w}_j\le\vet{k}$ confronta $m$ coppie di numeri, e il vettore $\vet{k}-\vet{w}_j$ richiede $m$ sottrazioni.

    - In caso di pareggio l'oggetto $j$ non viene selezionato, perché il valore viene aggiornato solo quando è strettamente maggiore.

    <a id="box-11-texmdkpbu"></a>

    !!! esempio "Esempio 22.2: Esecuzione dell'algoritmo di PD"

        Consideriamo l'istanza dell'MDKP dell'<span style="color:#1971c2">[Esempio 22.1](#box-1-texmdkpex1)</span>, con capacità $c_1=5$ e $c_2=4$. La riga $j=0$ è $v[0][\vet{k}]=0$ per ogni $\vet{k}$. Per ogni oggetto $j$ calcoliamo la matrice $v[j][k_1][k_2]$, con una riga per ogni $k_1\in\{0,1,\dots,5\}$ e una colonna per ogni $k_2\in\{0,1,\dots,4\}$.

        Questi sono i calcoli della cella $\vet{k}=\vet{c}=(5,4)$ per ogni oggetto, e delle celle usate dalla ricostruzione:

        - $v[1][(5,4)]=\max\{v[0][(5,4)],\,p_1+v[0][(4,2)]\}=\max\{0,\,9+0\}=9$

        - $v[1][(1,3)]=\max\{v[0][(1,3)],\,p_1+v[0][(0,1)]\}=\max\{0,\,9+0\}=9$

        - $v[2][(5,4)]=\max\{v[1][(5,4)],\,p_2+v[1][(1,3)]\}=\max\{9,\,8+9\}=17$

        - $v[3][(5,4)]=\max\{v[2][(5,4)],\,p_3+v[2][(3,3)]\}=\max\{17,\,3+9\}=17$

        - $v[4][(5,4)]=\max\{v[3][(5,4)],\,p_4+v[3][(2,0)]\}=\max\{17,\,9+0\}=17$

        Oggetto $j=1$, con $p_1=9$ e $\vet{w}_1=(1,2)$:

        $$
        \begin{array}{l|rrrrr}
        \hline {v[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {9} & {9} & {9} \\
        {k_1=2} & {0} & {0} & {9} & {9} & {9} \\
        {k_1=3} & {0} & {0} & {9} & {9} & {9} \\
        {k_1=4} & {0} & {0} & {9} & {9} & {9} \\
        {k_1=5} & {0} & {0} & {9} & {9} & {9} \\
        \hline
        \end{array}
        $$

        Oggetto $j=2$, con $p_2=8$ e $\vet{w}_2=(4,1)$:

        $$
        \begin{array}{l|rrrrr}
        \hline {v[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {9} & {9} & {9} \\
        {k_1=2} & {0} & {0} & {9} & {9} & {9} \\
        {k_1=3} & {0} & {0} & {9} & {9} & {9} \\
        {k_1=4} & {0} & {8} & {9} & {9} & {9} \\
        {k_1=5} & {0} & {8} & {9} & {17} & {17} \\
        \hline
        \end{array}
        $$

        Oggetto $j=3$, con $p_3=3$ e $\vet{w}_3=(2,1)$:

        $$
        \begin{array}{l|rrrrr}
        \hline {v[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {9} & {9} & {9} \\
        {k_1=2} & {0} & {3} & {9} & {9} & {9} \\
        {k_1=3} & {0} & {3} & {9} & {12} & {12} \\
        {k_1=4} & {0} & {8} & {9} & {12} & {12} \\
        {k_1=5} & {0} & {8} & {9} & {17} & {17} \\
        \hline
        \end{array}
        $$

        Oggetto $j=4$, con $p_4=9$ e $\vet{w}_4=(3,4)$:

        $$
        \begin{array}{l|rrrrr}
        \hline {v[4][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {9} & {9} & {9} \\
        {k_1=2} & {0} & {3} & {9} & {9} & {9} \\
        {k_1=3} & {0} & {3} & {9} & {12} & {12} \\
        {k_1=4} & {0} & {8} & {9} & {12} & {12} \\
        {k_1=5} & {0} & {8} & {9} & {17} & {17} \\
        \hline
        \end{array}
        $$

    <a id="box-12-texmdkpinfo"></a>

    !!! esempio "Esempio 22.3: Le tabelle $s$"

        Per l'istanza dell'<span style="color:#1971c2">[Esempio 22.1](#box-1-texmdkpex1)</span>, queste sono le matrici $s[j][k_1][k_2]$ calcolate dall'algoritmo di PD; un $1$ indica che l'oggetto $j$ è selezionato nella soluzione ottima trovata per $(j,k_1,k_2)$.

        Oggetto $j=1$, con $p_1=9$ e $\vet{w}_1=(1,2)$:

        $$
        \begin{array}{l|rrrrr}
        \hline {s[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {1} & {1} & {1} \\
        {k_1=2} & {0} & {0} & {1} & {1} & {1} \\
        {k_1=3} & {0} & {0} & {1} & {1} & {1} \\
        {k_1=4} & {0} & {0} & {1} & {1} & {1} \\
        {k_1=5} & {0} & {0} & {1} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=2$, con $p_2=8$ e $\vet{w}_2=(4,1)$:

        $$
        \begin{array}{l|rrrrr}
        \hline {s[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=4} & {0} & {1} & {0} & {0} & {0} \\
        {k_1=5} & {0} & {1} & {0} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=3$, con $p_3=3$ e $\vet{w}_3=(2,1)$:

        $$
        \begin{array}{l|rrrrr}
        \hline {s[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {1} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {1} & {0} & {1} & {1} \\
        {k_1=4} & {0} & {0} & {0} & {1} & {1} \\
        {k_1=5} & {0} & {0} & {0} & {0} & {0} \\
        \hline
        \end{array}
        $$

        Oggetto $j=4$, con $p_4=9$ e $\vet{w}_4=(3,4)$:

        $$
        \begin{array}{l|rrrrr}
        \hline {s[4][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=4} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=5} & {0} & {0} & {0} & {0} & {0} \\
        \hline
        \end{array}
        $$

    - Calcolate le tabelle $s$, si ricostruisce una soluzione ottima scorrendo gli oggetti da $j=n$ fino a $j=1$, partendo da $\vet{k}=\vet{c}$ e da $x_j=0$ per ogni oggetto $j$:

        $$
        x_j \leftarrow s[j][\vet{k}], \qquad \vet{k} \leftarrow \vet{k} - s[j][\vet{k}]\,\vet{w}_j.
        $$

    !!! algoritmo "Algoritmo: MDKP\_Reconstruct"

        <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> Il numero <span class="arithmatex">\(n\)</span> di oggetti, il vettore delle capacità <span class="arithmatex">\(\vet{c}\)</span>, i vettori dei pesi <span class="arithmatex">\(\vet{w}_1,\dots,\vet{w}_n\)</span> e le tabelle <span class="arithmatex">\(s\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> Una soluzione ottima dell'istanza dell'MDKP</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> MDKP_Reconstruct(<span class="arithmatex">\(n,\vet{c},\vet{w},s\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(x := \textnormal{new array}[1..n]\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><span class="arithmatex">\(\vet{k} := \vet{c}\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">4</span><strong>for</strong> <span class="arithmatex">\(j := n\)</span> <strong>to</strong> <span class="arithmatex">\(1\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><span class="arithmatex">\(x[j] \leftarrow s[j][\vet{k}]\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">6</span><span class="arithmatex">\(\vet{k} \leftarrow \vet{k}-x[j]\,\vet{w}_j\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">7</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">8</span><strong>return</strong> <span class="arithmatex">\(x\)</span></div></div>

    <a id="box-13-texmdkpsol"></a>

    !!! esempio "Esempio 22.4: Calcolo di una soluzione ottima"

        Dopo l'esecuzione dell'algoritmo di PD sull'istanza dell'<span style="color:#1971c2">[Esempio 22.1](#box-1-texmdkpex1)</span>, partiamo da $j=4$ e $\vet{k}=(5,4)$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(\vet{k}\)</span></th>
        <th><span class="arithmatex">\(s[j][\vet{k}]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
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
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">\(x[4]\leftarrow 0\)</span>, <span class="arithmatex">\(\vet{k}=(5,4)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((5,4)\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[3]\leftarrow 0\)</span>, <span class="arithmatex">\(\vet{k}=(5,4)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((5,4)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (5,4)-(4,1)=(1,3)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (1,3)-(1,2)=(0,1)\)</span></td>
        </tr>
        </table></div>

        !!! chiave ""

            Il vettore $x=(1,1,0,0)$ è una soluzione ottima dell'istanza dell'MDKP dell'<span style="color:#1971c2">[Esempio 22.1](#box-1-texmdkpex1)</span>. I suoi pesi sono $1+4=5\le c_1$ e $2+1=3\le c_2$, e il suo valore ottimo è $v(4,5,4)=17$.

        Con la sola prima dimensione, il KP con capacità $c_1=5$ ha valore ottimo $18$, raggiunto dagli oggetti $\{1,4\}$; il loro peso totale nella seconda dimensione è $2+4=6>c_2$. Le due dimensioni vanno controllate contemporaneamente, come fa la formula $\eqref{eq:mdkp}$.

### 22.1.1 Numero di passi

- Sia $N=|\mathscr{C}|=\prod_{d=1}^{m}(c_d+1)$ il numero di vettori $\vet{k}$, e indichiamo con $S(n,m,\vet{c})$ il numero di passi eseguiti da <code>MDKP\_DP</code> nel caso peggiore. Le righe [9](#box-8-mdkpbu-g) e [10](#box-9-mdkpbu-h) lavorano su vettori di $m$ componenti, quindi contiamo $m$ passi per ciascuna delle loro esecuzioni:

    - Le <span style="color:#e03131">righe</span> [2](#box-2-mdkpbu-a) e [14](#box-10-mdkpbu-i) vengono eseguite $1$ volta ciascuna.

    - Le <span style="color:#e03131">righe</span> [3](#box-3-mdkpbu-b) e [4](#box-4-mdkpbu-c) vengono eseguite $N$ volte ciascuna.

    - La <span style="color:#e03131">riga</span> [6](#box-5-mdkpbu-d) viene eseguita $n$ volte.

    - Le <span style="color:#e03131">righe</span> [7](#box-6-mdkpbu-e) e [8](#box-7-mdkpbu-f) vengono eseguite $nN$ volte ciascuna.

    - Le <span style="color:#e03131">righe</span> [9](#box-8-mdkpbu-g) e [10](#box-9-mdkpbu-h) vengono eseguite al più $nN$ volte ciascuna, con $m$ passi ciascuna.

- Quindi il numero totale di passi nel caso peggiore è

    $$
    S(n,m,\vet{c})=2m\,nN+2nN+2N+n+2,
    $$

    e, poiché $2m\,nN\le S(n,m,\vet{c})\le 9m\,nN$,

    $$
    S(n,m,\vet{c})=\Theta\Big(m\,n\prod_{d=1}^{m}(c_d+1)\Big).
    $$

    !!! chiave ""

        L'algoritmo di PD per l'MDKP esegue $\Theta(m\,n\prod_{d=1}^{m}(c_d+1))$ passi nel caso peggiore. Per un numero $m$ fissato di dimensioni questo è $\Theta(n\prod_{d=1}^{m}c_d)$, un numero pseudo-polinomiale di passi.

- La ricostruzione esegue $\Theta(m\,n)$ passi.

### 22.1.2 La maledizione della dimensionalità

- Ogni nuova dimensione moltiplica il numero di stati per $c_d+1$. Se tutte le capacità sono uguali a $c$, la tabella ha $(n+1)(c+1)^m$ celle: il numero di stati cresce <strong>esponenzialmente</strong> con $m$.

- La dimensione dell'input cresce solo linearmente con $m$: una dimensione in più aggiunge $n+1$ numeri, i pesi $w_{dj}$ e la capacità $c_d$.

- Questa esplosione del numero di stati quando lo stato diventa un vettore si chiama <strong>maledizione della dimensionalità</strong>.

<div class="tabella" markdown="0"><table>
<tr>
<th><span class="arithmatex">\(m\)</span></th>
<th>celle <span class="arithmatex">\((n+1)(c+1)^m\)</span>, con <span class="arithmatex">\(n=50\)</span> e <span class="arithmatex">\(c=100\)</span></th>
</tr>
<tr>
<td><span class="arithmatex">\(1\)</span></td>
<td><span class="arithmatex">\(5\,151\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(2\)</span></td>
<td><span class="arithmatex">\(520\,251\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(3\)</span></td>
<td><span class="arithmatex">\(52\,545\,351\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(4\)</span></td>
<td><span class="arithmatex">\(5\,307\,080\,451\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(5\)</span></td>
<td><span class="arithmatex">\(536\,015\,125\,551\)</span></td>
</tr>
</table></div>

- Con $m=1$ la tabella ha qualche migliaio di celle; con $m=5$ ne ha più di $5\cdot 10^{11}$, troppe per essere memorizzate. L'algoritmo di PD è quindi utile per l'MDKP solo quando $m$ e le capacità sono piccoli.

## 22.2 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Controllare una sola dimensione.</strong> L'oggetto $j$ entra in $\vet{k}$ solo se $w_{dj}\le k_d$ per <em>ogni</em> dimensione $d$; una dimensione non basta.

    - <strong>Aggiornare una sola capacità.</strong> Quando l'oggetto $j$ è selezionato, tutte le componenti di $\vet{k}$ diminuiscono, di $\vet{w}_j$.

    - <strong>Risolvere un KP per dimensione.</strong> Il KP con la sola capacità $c_d$ dà un upper bound, ma la sua soluzione ottima può violare un'altra dimensione.

    - <strong>Chiamare polinomiale l'algoritmo di PD.</strong> Il suo numero di passi contiene il prodotto delle capacità, che è esponenziale in $m$ e nella dimensione delle capacità.

## 22.3 In sintesi

!!! chiave "In sintesi"

    - La ricorrenza del KP si estende all'MDKP sostituendo la capacità $k$ con il vettore $\vet{k}=(k_1,\dots,k_m)$: $v(j,\vet{k})=\max\{v(j-1,\vet{k}),\,p_j+v(j-1,\vet{k}-\vet{w}_j)\}$ quando $\vet{w}_j\le\vet{k}$.

    - La tabella ha $(n+1)\prod_{d=1}^{m}(c_d+1)$ celle e l'algoritmo di PD esegue $\Theta(m\,n\prod_{d=1}^{m}(c_d+1))$ passi, cioè $\Theta(n\prod_{d=1}^{m}c_d)$ per $m$ fissato.

    - Il numero di stati cresce esponenzialmente con $m$: la maledizione della dimensionalità.

    - Le tabelle $s$ danno una soluzione ottima, letta all'indietro a partire da $(n,\vet{c})$.

    <strong>Quadro riassuntivo dell'esempio dell'MDKP.</strong> [Esempio 22.1](#box-1-texmdkpex1) ($\vet{c}=(5,4)$, quattro oggetti):

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
    <td>valore ottimo, soluzione <span class="arithmatex">\(x=(1,1,0,0)\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Zaino multidimensionale (MDKP)](../esercizi/dp-multidimensional-knapsack.md)
