---
title: "PD per il problema dello zaino con setup"
---

# PD per il problema dello zaino con setup

<div class="info-capitolo" markdown>

**Parte 3 · Programmazione dinamica · Capitolo 23** · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../pdf/dispensa-3-programmazione-dinamica.pdf) · [:material-pencil: Esercizi: Zaino con setup (KPS)](../esercizi/dp-knapsack-setups.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, il capitolo [«PD per il problema dello zaino 0/1»](dp-knapsack/index.md): la ricorrenza $v(j,k)$ del problema dello zaino 0/1 (KP) su oggetti e capacità, la matrice $s$ delle decisioni e la ricostruzione di una soluzione.

    - Da questo modulo, il capitolo [«Problemi di zaino»](../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-con-setup.md): il problema dello zaino con setup, le sue classi, i costi di setup $f_h$ e i pesi di setup $s_h$.

    - Dal modulo <em>Algoritmi</em>: [le convenzioni dello pseudocodice (Capitolo 2)](https://fabiofurini.github.io/algoritmi/algoritmi-di-base/02-pseudocodice/) e [la dimensione dell'input (Capitolo 11)](https://fabiofurini.github.io/algoritmi/analisi/11-dimensione-input/).

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - scrivere la ricorrenza del KPS: per ogni classe, il valore migliore senza aprirla e il valore migliore dopo averne pagato il setup;

    - eseguire a mano l'algoritmo di PD, classe per classe, con una ricorrenza del KP dentro ogni classe aperta;

    - ricostruire una soluzione ottima dalle tabelle delle scelte $s$ e $o$;

    - contare i $\Theta(nc)$ passi dell'algoritmo di PD.

Il problema di questo capitolo è il [problema dello zaino con setup (KPS)](../catalogo/knapsack-problem-with-setups.md): la sua definizione e le sue ipotesi sono nella sua pagina.

## 23.1 Un algoritmo di PD

- Numeriamo gli oggetti classe per classe, in modo che $\mathscr{J}_h=\{\ell_{h-1}+1,\dots,\ell_h\}$ per ogni classe $h$, con $\ell_0=0$ e $\ell_q=n$. La classe $h$ ha $t_h=|\mathscr{J}_h|=\ell_h-\ell_{h-1}$ oggetti, e il suo $i$-esimo oggetto è $j=\ell_{h-1}+i$.

- Una soluzione si descrive con il vettore binario $(x_1,x_2,\dots,x_n)$. La classe $h$ è <strong>aperta</strong> se almeno uno dei suoi oggetti è selezionato: allora il suo peso di setup $s_h$ si aggiunge al peso totale, e il suo costo di setup $f_h$ si sottrae dal ricavo totale.

<a id="box-1-texkpsex1"></a>

!!! esempio "Esempio 23.1: Istanza del KPS"

    Consideriamo uno zaino di capacità $c=10$ e un insieme $\mathscr{I}=\{1,2,\dots,5\}$ di $5$ oggetti ($n=5$), partizionato in $q=2$ classi: $\mathscr{J}_1=\{1,2\}$, con costo di setup $f_1=2$ e peso di setup $s_1=2$, e $\mathscr{J}_2=\{3,4,5\}$, con costo di setup $f_2=3$ e peso di setup $s_2=1$. I ricavi e i pesi sono:

    $$
    \begin{array}{l|rr|rrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\
    \hline {p_j} & 6 & 5 & 4 & 7 & 3 \\
    {w_j} & 3 & 2 & 2 & 4 & 1 \\
    \hline
    \end{array}
    $$

    Chiamiamo questa istanza del KPS <span style="color:#1971c2">[Esempio 23.1](#box-1-texkpsex1)</span>.

- <u>Passo 1</u>: calcolo del valore ottimo

    - Le classi sono gli stadi dell'algoritmo di PD. Per ogni classe $h$ ci sono due opzioni: la classe $h$ resta chiusa, oppure la classe $h$ viene aperta, se ne paga il setup e si selezionano alcuni dei suoi oggetti.

    - Dentro una classe aperta, la scelta degli oggetti è un KP: l'algoritmo di PD del KP scorre gli oggetti della classe, partendo dal valore rimasto dopo aver pagato il setup.

    !!! formula ""

        Per ogni $h \in \{0,1,\dots,q\}$ e $k \in \{0,1,\dots,c\}$, sia $v(h,k)$ il valore ottimo della sottoistanza del KPS con capacità $k$ e le classi $\mathscr{J}_1,\dots,\mathscr{J}_h$. Per ogni $h \in \{1,\dots,q\}$ e $i \in \{0,1,\dots,t_h\}$, sia $u(h,i,k)$ il valore ottimo della stessa sottoistanza quando la classe $h$ è aperta (il suo setup è pagato) e sono disponibili solo i suoi primi $i$ oggetti, con $u(h,i,k)=-\infty$ se il peso di setup non entra nello zaino.

        Le formule ricorsive per calcolare $u(h,i,k)$ e $v(h,k)$ sono le seguenti, dove $j=\ell_{h-1}+i$ è l'$i$-esimo oggetto della classe $h$:

        \begin{equation*}
        \label{eq:kpsu}
        u(h,i,k)= \left\{ \begin{array}{ll}
        -\infty & \textrm{se $i=0$ e $k<s_h$,}\\[2ex]
        v(h-1,k-s_h)-f_h & \textrm{se $i=0$ e $k\ge s_h$,}\\[2ex]
        u(h,i-1,k) & \textrm{se $i\ge 1$ e $w_j>k$,}\\[2ex]
        \begin{array}[t]{@{}l@{}}\displaystyle \max \bigg\{ u(h,i-1,k),\\ \qquad p_j+u(h,i-1,k-w_j) \bigg\}\end{array} & \textrm{se $i\ge 1$ e $w_j\le k$,}
        \end{array} \right. \tag{23.1}
        \end{equation*}

        \begin{equation*}
        \label{eq:kpsv}
        v(h,k)= \left\{ \begin{array}{ll}
        0 & \textrm{se $h=0$,}\\[2ex]
        \max \big\{ v(h-1,k),\; u(h,t_h,k) \big\} & \textrm{se $h\ge 1$.}
        \end{array} \right. \tag{23.2}
        \end{equation*}

    - La riga $u(h,0,\cdot)$ <strong>paga il setup</strong> della classe $h$: il peso di setup $s_h$ lascia la capacità $k-s_h$ alle classi $1,2,\dots,h-1$, e il costo di setup $f_h$ viene sottratto.

    - Le righe $u(h,1,\cdot),\dots,u(h,t_h,\cdot)$ sono la ricorrenza del KP sugli oggetti della classe $h$, con $-\infty+p_j=-\infty$.

    - La formula $\eqref{eq:kpsv}$ confronta le due opzioni per la classe $h$: chiusa, con valore $v(h-1,k)$, oppure aperta, con valore $u(h,t_h,k)$.

    - La riga $u(h,0,\cdot)$ ammette una classe aperta senza oggetti selezionati, che non è una soluzione del KPS. Questo valore non viene mai scelto in $\eqref{eq:kpsv}$, perché $f_h\ge 1$ dà

        $$
        v(h-1,k-s_h)-f_h\;<\;v(h-1,k).
        $$

        Quindi, quando il massimo in $\eqref{eq:kpsv}$ è raggiunto solo da $u(h,t_h,k)$, almeno un oggetto della classe $h$ è selezionato.

    - Una soluzione ottima per $(h,k)$ si costruisce da una soluzione ottima di una sottoistanza più piccola: $(h-1,k)$ se la classe $h$ è chiusa e, dentro una classe aperta, $(h,i-1,\cdot)$ con o senza l'oggetto $j$.

        $\rightsquigarrow$ <strong>Sottostruttura ottima verificata!</strong>

    - Decisioni diverse sulle classi $h+1,\dots,q$ possono lasciare la stessa capacità $k$, e quindi lo stesso valore $v(h,k)$ può servire più volte.

        $\rightsquigarrow$ <strong>Sottoproblemi sovrapposti verificati!</strong>

    - L'<strong>approccio bottom-up</strong> calcola, per $h=1,2,\dots,q$, prima le righe $u(h,i,\cdot)$ per $i=0,1,\dots,t_h$, e poi la riga $v(h,\cdot)$, ciascuna per $k$ crescente. Il valore ottimo dell'istanza del KPS è $v(q,c)$.

- <u>Passo 2</u>: calcolo di una soluzione ottima

    - Si memorizzano due tabelle delle scelte: $s[h][i][k]=1$ se l'$i$-esimo oggetto della classe $h$ è selezionato nel valore ottimo $u[h][i][k]$, e $o[h][k]=1$ se la classe $h$ è aperta nel valore ottimo $v[h][k]$.

    - Il peso di setup $s_h$ ha un indice; la scelta $s[h][i][k]$ ne ha tre.

    Questo è lo pseudocodice dell'<strong>algoritmo di PD con l'approccio bottom-up</strong>, che memorizza le tabelle delle scelte insieme ai valori:

    !!! algoritmo "Algoritmo: KPS\_DP"

        <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> Un'istanza del KPS data da <span class="arithmatex">\(q\)</span>, dalle classi <span class="arithmatex">\(\mathscr{J}_1,\dots,\mathscr{J}_q\)</span> numerate come sopra, dai costi di setup <span class="arithmatex">\(f_h\)</span> e dai pesi di setup <span class="arithmatex">\(s_h\)</span>, dai vettori <span class="arithmatex">\(p[1..n]\)</span>, <span class="arithmatex">\(w[1..n]\)</span> e dalla capacità <span class="arithmatex">\(c\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> Il valore ottimo dell'istanza del KPS e le tabelle delle scelte <span class="arithmatex">\(s\)</span> e <span class="arithmatex">\(o\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> KPS_DP(<span class="arithmatex">\(q,\mathscr{J},p,w,c\)</span>)</div><div class="pc" style="--liv:1" id="box-2-kpsbu-a"><span class="pc-n">2</span><span class="arithmatex">\(v,o := \textnormal{new arrays}[0..q][0..c]\)</span>; <span class="arithmatex">\(u,s := \textnormal{new arrays}[1..q][0..t_h][0..c]\)</span></div><div class="pc" style="--liv:1" id="box-3-kpsbu-b"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(k := 0\)</span> <strong>to</strong> <span class="arithmatex">\(c\)</span>  <strong>do</strong></div><div class="pc" style="--liv:2" id="box-4-kpsbu-c"><span class="pc-n">4</span><span class="arithmatex">\(v[0][k] \leftarrow 0\)</span>; <span class="arithmatex">\(o[0][k] \leftarrow 0\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">5</span><strong>end</strong></div><div class="pc" style="--liv:1" id="box-5-kpsbu-d"><span class="pc-n">6</span><strong>for</strong> <span class="arithmatex">\(h := 1\)</span> <strong>to</strong> <span class="arithmatex">\(q\)</span>  <strong>do</strong></div><div class="pc" style="--liv:2" id="box-6-kpsbu-e"><span class="pc-n">7</span><strong>for</strong> <span class="arithmatex">\(k := 0\)</span> <strong>to</strong> <span class="arithmatex">\(c\)</span>  <strong>do</strong></div><div class="pc" style="--liv:3" id="box-7-kpsbu-f"><span class="pc-n">8</span><span class="arithmatex">\(u[h][0][k] \leftarrow -\infty\)</span></div><div class="pc" style="--liv:3" id="box-8-kpsbu-fa"><span class="pc-n">9</span><strong>if</strong> <span class="arithmatex">\(k\ge s_h\)</span>  <strong>then</strong></div><div class="pc" style="--liv:4" id="box-9-kpsbu-fb"><span class="pc-n">10</span><span class="arithmatex">\(u[h][0][k] \leftarrow v[h-1][k-s_h]-f_h\)</span></div><div class="pc" style="--liv:3"><span class="pc-n">11</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">12</span><strong>end</strong></div><div class="pc" style="--liv:2" id="box-10-kpsbu-g"><span class="pc-n">13</span><strong>for</strong> <span class="arithmatex">\(i := 1\)</span> <strong>to</strong> <span class="arithmatex">\(t_h\)</span>  <strong>do</strong></div><div class="pc" style="--liv:3" id="box-11-kpsbu-h"><span class="pc-n">14</span><span class="arithmatex">\(j := \ell_{h-1}+i\)</span></div><div class="pc" style="--liv:3" id="box-12-kpsbu-i"><span class="pc-n">15</span><strong>for</strong> <span class="arithmatex">\(k := 0\)</span> <strong>to</strong> <span class="arithmatex">\(c\)</span>  <strong>do</strong></div><div class="pc" style="--liv:4" id="box-13-kpsbu-j"><span class="pc-n">16</span><span class="arithmatex">\(u[h][i][k] \leftarrow u[h][i-1][k]\)</span>; <span class="arithmatex">\(s[h][i][k] \leftarrow 0\)</span></div><div class="pc" style="--liv:4" id="box-14-kpsbu-k"><span class="pc-n">17</span><strong>if</strong> <span class="arithmatex">\(w[j]\le k\)</span> e <span class="arithmatex">\(p[j]+u[h][i-1][k-w[j]] > u[h][i][k]\)</span>  <strong>then</strong></div><div class="pc" style="--liv:5" id="box-15-kpsbu-l"><span class="pc-n">18</span><span class="arithmatex">\(u[h][i][k] \leftarrow p[j]+u[h][i-1][k-w[j]]\)</span>; <span class="arithmatex">\(s[h][i][k] \leftarrow 1\)</span></div><div class="pc" style="--liv:4"><span class="pc-n">19</span><strong>end</strong></div><div class="pc" style="--liv:3"><span class="pc-n">20</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">21</span><strong>end</strong></div><div class="pc" style="--liv:2" id="box-16-kpsbu-m"><span class="pc-n">22</span><strong>for</strong> <span class="arithmatex">\(k := 0\)</span> <strong>to</strong> <span class="arithmatex">\(c\)</span>  <strong>do</strong></div><div class="pc" style="--liv:3" id="box-17-kpsbu-n"><span class="pc-n">23</span><span class="arithmatex">\(v[h][k] \leftarrow v[h-1][k]\)</span>; <span class="arithmatex">\(o[h][k] \leftarrow 0\)</span></div><div class="pc" style="--liv:3" id="box-18-kpsbu-o"><span class="pc-n">24</span><strong>if</strong> <span class="arithmatex">\(u[h][t_h][k] > v[h][k]\)</span>  <strong>then</strong></div><div class="pc" style="--liv:4" id="box-19-kpsbu-p"><span class="pc-n">25</span><span class="arithmatex">\(v[h][k] \leftarrow u[h][t_h][k]\)</span>; <span class="arithmatex">\(o[h][k] \leftarrow 1\)</span></div><div class="pc" style="--liv:3"><span class="pc-n">26</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">27</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">28</span><strong>end</strong></div><div class="pc" style="--liv:1" id="box-20-kpsbu-q"><span class="pc-n">29</span><strong>return</strong> <span class="arithmatex">\(v[q][c], s, o\)</span></div></div>

    - Per ogni classe, il primo ciclo su $k$ paga il setup dove entra nello zaino, i cicli su $i$ e $k$ eseguono l'algoritmo di PD del KP sugli oggetti della classe, e l'ultimo ciclo su $k$ confronta la classe chiusa con quella aperta.

    - In caso di pareggio l'oggetto non viene selezionato e la classe resta chiusa, perché i valori vengono aggiornati solo quando sono strettamente maggiori.

    <a id="box-21-texkpsbu"></a>

    !!! esempio "Esempio 23.2: Esecuzione dell'algoritmo di PD"

        Consideriamo l'istanza del KPS dell'<span style="color:#1971c2">[Esempio 23.1](#box-1-texkpsex1)</span>. Le righe si calcolano nell'ordine della tabella qui sotto, ciascuna per $k=0,1,\dots,10$; questi sono alcuni dei calcoli:

        - $u[1][0][1]=-\infty$, perché $k=1<s_1=2$

        - $v[1][7]=\max\{v[0][7],\,u[1][2][7]\}=\max\{0,\,9\}=9$

        - $v[2][10]=\max\{v[1][10],\,u[2][3][10]\}=\max\{9,\,11\}=11$

        - $u[2][3][10]=\max\{u[2][2][10],\,p_5+u[2][2][9]\}=\max\{10,\,3+8\}=11$

        - $u[2][2][9]=\max\{u[2][1][9],\,p_4+u[2][1][5]\}=\max\{6,\,7+1\}=8$

        - $u[2][1][5]=\max\{u[2][0][5],\,p_3+u[2][0][3]\}=\max\{0,\,4-3\}=1$

        - $u[2][0][3]=v[1][2]-f_2=0-3=-3$

        - $v[1][2]=\max\{v[0][2],\,u[1][2][2]\}=\max\{0,\,-2\}=0$

        Questa è la tabella dei valori dopo l'esecuzione dell'algoritmo di PD, riga per riga nell'ordine di calcolo:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Riga</th>
        <th><span class="arithmatex">\(k=0\)</span></th>
        <th><span class="arithmatex">\(k=1\)</span></th>
        <th><span class="arithmatex">\(k=2\)</span></th>
        <th><span class="arithmatex">\(k=3\)</span></th>
        <th><span class="arithmatex">\(k=4\)</span></th>
        <th><span class="arithmatex">\(k=5\)</span></th>
        <th><span class="arithmatex">\(k=6\)</span></th>
        <th><span class="arithmatex">\(k=7\)</span></th>
        <th><span class="arithmatex">\(k=8\)</span></th>
        <th><span class="arithmatex">\(k=9\)</span></th>
        <th><span class="arithmatex">\(k=10\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(v[0][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[1][0][k]\)</span> (setup)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[1][1][k]\)</span> (<span class="arithmatex">\(j=1\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[1][2][k]\)</span> (<span class="arithmatex">\(j=2\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(v[1][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][0][k]\)</span> (setup)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][1][k]\)</span> (<span class="arithmatex">\(j=3\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][2][k]\)</span> (<span class="arithmatex">\(j=4\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][3][k]\)</span> (<span class="arithmatex">\(j=5\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(v[2][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        </tr>
        </table></div>

        Il valore ottimo dell'istanza è $v[2][10]=11$. I valori $-2$ e $-3$ nelle righe di setup sono i costi di setup pagati prima di selezionare qualsiasi oggetto.

    <a id="box-22-texkpsinfo"></a>

    !!! esempio "Esempio 23.3: Le tabelle delle scelte"

        Per l'istanza dell'<span style="color:#1971c2">[Esempio 23.1](#box-1-texkpsex1)</span>, queste sono le tabelle delle scelte calcolate dall'algoritmo di PD: le righe $s[h][i][\cdot]$ degli oggetti e le righe $o[h][\cdot]$ delle classi.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Riga</th>
        <th><span class="arithmatex">\(k=0\)</span></th>
        <th><span class="arithmatex">\(k=1\)</span></th>
        <th><span class="arithmatex">\(k=2\)</span></th>
        <th><span class="arithmatex">\(k=3\)</span></th>
        <th><span class="arithmatex">\(k=4\)</span></th>
        <th><span class="arithmatex">\(k=5\)</span></th>
        <th><span class="arithmatex">\(k=6\)</span></th>
        <th><span class="arithmatex">\(k=7\)</span></th>
        <th><span class="arithmatex">\(k=8\)</span></th>
        <th><span class="arithmatex">\(k=9\)</span></th>
        <th><span class="arithmatex">\(k=10\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(s[1][1][k]\)</span> (<span class="arithmatex">\(j=1\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(s[1][2][k]\)</span> (<span class="arithmatex">\(j=2\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(o[1][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(s[2][1][k]\)</span> (<span class="arithmatex">\(j=3\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(s[2][2][k]\)</span> (<span class="arithmatex">\(j=4\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(s[2][3][k]\)</span> (<span class="arithmatex">\(j=5\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(o[2][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        </table></div>

    - Una soluzione ottima si ricostruisce scorrendo le classi da $h=q$ fino a $h=1$, partendo da $k=c$ e da $x_j=0$ per ogni oggetto $j$.

    - Se $o[h][k]=0$, la classe $h$ è chiusa e $k$ non cambia. Se $o[h][k]=1$, gli oggetti della classe $h$ si scorrono da $i=t_h$ fino a $i=1$ come nel KP, e alla fine il peso di setup $s_h$ si sottrae da $k$.

    !!! algoritmo "Algoritmo: KPS\_Reconstruct"

        <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> Il numero <span class="arithmatex">\(q\)</span> di classi, i pesi di setup <span class="arithmatex">\(s_h\)</span>, il vettore <span class="arithmatex">\(w[1..n]\)</span>, la capacità <span class="arithmatex">\(c\)</span> e le tabelle delle scelte <span class="arithmatex">\(s\)</span> e <span class="arithmatex">\(o\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> Una soluzione ottima dell'istanza del KPS</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> KPS_Reconstruct(<span class="arithmatex">\(q,w,c,s,o\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(x := \textnormal{new array}[1..n]\)</span>, con <span class="arithmatex">\(x[j]=0\)</span> per ogni <span class="arithmatex">\(j\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><span class="arithmatex">\(k := c\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">4</span><strong>for</strong> <span class="arithmatex">\(h := q\)</span> <strong>to</strong> <span class="arithmatex">\(1\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><strong>if</strong> <span class="arithmatex">\(o[h][k]=1\)</span> <strong>then</strong></div><div class="pc" style="--liv:3"><span class="pc-n">6</span><strong>for</strong> <span class="arithmatex">\(i := t_h\)</span> <strong>to</strong> <span class="arithmatex">\(1\)</span> <strong>do</strong></div><div class="pc" style="--liv:4"><span class="pc-n">7</span><span class="arithmatex">\(j := \ell_{h-1}+i\)</span>; <span class="arithmatex">\(x[j] \leftarrow s[h][i][k]\)</span></div><div class="pc" style="--liv:4"><span class="pc-n">8</span><span class="arithmatex">\(k \leftarrow k-x[j]\,w[j]\)</span></div><div class="pc" style="--liv:3"><span class="pc-n">9</span><strong>end</strong></div><div class="pc" style="--liv:3"><span class="pc-n">10</span><span class="arithmatex">\(k \leftarrow k-s_h\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">11</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">12</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">13</span><strong>return</strong> <span class="arithmatex">\(x\)</span></div></div>

    <a id="box-23-texkpssol"></a>

    !!! esempio "Esempio 23.4: Calcolo di una soluzione ottima"

        Dopo l'esecuzione dell'algoritmo di PD sull'istanza dell'<span style="color:#1971c2">[Esempio 23.1](#box-1-texkpsex1)</span>, partiamo da $h=2$ e $k=10$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th>Stadio</th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th>Scelta</th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th><span class="arithmatex">\(x[5]\)</span></th>
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
        <td>0</td>
        <td><span class="arithmatex">\(k=10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(h=2\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(o[2][10]=1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>classe <span class="arithmatex">\(2\)</span> aperta</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(j=5\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(s[2][3][10]=1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(k\leftarrow 10-1=9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(j=4\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(s[2][2][9]=1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td><span class="arithmatex">\(k\leftarrow 9-4=5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(j=3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(s[2][1][5]=1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(k\leftarrow 5-2=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>setup: <span class="arithmatex">\(k\leftarrow 3-s_2=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(h=1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(o[1][2]=0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>classe <span class="arithmatex">\(1\)</span> chiusa</td>
        </tr>
        </table></div>

        !!! chiave ""

            Il vettore $x=(0,0,1,1,1)$ è una soluzione ottima dell'istanza del KPS dell'<span style="color:#1971c2">[Esempio 23.1](#box-1-texkpsex1)</span>: solo la classe $2$ è aperta, e sono selezionati gli oggetti $\{3,4,5\}$. Il suo peso totale è $2+4+1+s_2=8\le c$ e il suo valore ottimo è $v(2,10)=4+7+3-f_2=11$.

        Gli oggetti della classe $1$ hanno il rapporto maggiore fra ricavo totale e peso totale ($11/5$ contro $14/7$), ma la classe $1$ resta chiusa. Con la sola classe $1$ il valore migliore è $v[1][10]=9$, mentre la classe $2$ aperta dà $u[2][3][10]=11$; dopo i suoi oggetti e il suo peso di setup resta solo $k=2$ per la classe $1$, e $o[1][2]=0$.

### 23.1.1 Numero di passi

- Indichiamo con $S(n,q,c)$ il numero di passi eseguiti da <code>KPS\_DP</code> nel caso peggiore. I cicli su $i$ scorrono gli oggetti di ogni classe, quindi su tutte le classi vengono eseguiti $t_1+t_2+\dots+t_q=n$ volte. Supponendo che le condizioni alle righe [9](#box-8-kpsbu-fa), [17](#box-14-kpsbu-k) e [24](#box-18-kpsbu-o) siano sempre vere:

    - Le <span style="color:#e03131">righe</span> [2](#box-2-kpsbu-a) e [29](#box-20-kpsbu-q) vengono eseguite $1$ volta ciascuna.

    - Le <span style="color:#e03131">righe</span> [3](#box-3-kpsbu-b) e [4](#box-4-kpsbu-c) vengono eseguite $c+1$ volte ciascuna.

    - La <span style="color:#e03131">riga</span> [6](#box-5-kpsbu-d) viene eseguita $q$ volte.

    - Le <span style="color:#e03131">righe</span> [7](#box-6-kpsbu-e), [8](#box-7-kpsbu-f), [9](#box-8-kpsbu-fa), [10](#box-9-kpsbu-fb), [22](#box-16-kpsbu-m), [23](#box-17-kpsbu-n), [24](#box-18-kpsbu-o) e [25](#box-19-kpsbu-p) vengono eseguite $q(c+1)$ volte ciascuna.

    - Le <span style="color:#e03131">righe</span> [13](#box-10-kpsbu-g) e [14](#box-11-kpsbu-h) vengono eseguite $n$ volte ciascuna.

    - Le <span style="color:#e03131">righe</span> [15](#box-12-kpsbu-i), [16](#box-13-kpsbu-j), [17](#box-14-kpsbu-k) e [18](#box-15-kpsbu-l) vengono eseguite $n(c+1)$ volte ciascuna.

- Quindi il numero totale di passi nel caso peggiore è

    $$
    S(n,q,c)=4n(c+1)+8q(c+1)+2n+q+2c+4.
    $$

    Poiché ogni classe contiene almeno un oggetto, $1\le q\le n$, e

    $$
    4n(c+1)\;\le\; S(n,q,c)\;\le\; 12n(c+1)+3n+2c+4.
    $$

    Entrambi i bound sono $\Theta(nc)$, quindi $S(n,q,c)=\Theta(nc)$.

    !!! chiave ""

        L'algoritmo di PD per il KPS esegue $S(n,q,c)=\Theta(nc)$ passi nel caso peggiore: i setup aggiungono $2q$ righe alle $n$ righe della ricorrenza del KP.

- La ricostruzione esegue $\Theta(n)$ passi.

## 23.2 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Pagare il setup per ogni oggetto.</strong> Il setup della classe $h$ si paga una volta sola, nella riga $u(h,0,\cdot)$; le righe degli oggetti aggiungono solo $p_j$ e $w_j$.

    - <strong>Far partire gli oggetti di una classe da $v(h-1,k)$.</strong> Le righe di una classe aperta partono da $v(h-1,k-s_h)-f_h$: partire da $v(h-1,k)$ selezionerebbe oggetti senza pagare il setup.

    - <strong>Dimenticare il peso di setup nella ricostruzione.</strong> Dopo gli oggetti di una classe aperta, la capacità diminuisce anche di $s_h$.

    - <strong>Confondere $s_h$ con $s[h][i][k]$.</strong> Il peso di setup della classe $h$ ha un indice; la scelta dell'$i$-esimo oggetto della classe $h$ ne ha tre.

## 23.3 In sintesi

!!! chiave "In sintesi"

    - Per ogni classe $h$ l'algoritmo di PD confronta la classe chiusa, $v(h-1,k)$, con la classe aperta, $u(h,t_h,k)$.

    - La classe aperta parte da $u(h,0,k)=v(h-1,k-s_h)-f_h$, che paga il setup una volta sola, e prosegue con la ricorrenza del KP sui suoi oggetti.

    - Le tabelle delle scelte $s$ (oggetti) e $o$ (classi) danno una soluzione ottima, letta all'indietro a partire da $(q,c)$.

    - L'algoritmo di PD esegue $\Theta(nc)$ passi, come l'algoritmo di PD del KP.

    <strong>Quadro riassuntivo dell'esempio del KPS.</strong> [Esempio 23.1](#box-1-texkpsex1) ($c=10$, due classi):

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Metodo</th>
    <th>Lower bound</th>
    <th>Upper bound</th>
    <th>Origine</th>
    </tr>
    <tr>
    <td>Algoritmo di PD</td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td>valore ottimo, soluzione <span class="arithmatex">\(x=(0,0,1,1,1)\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Zaino con setup (KPS)](../esercizi/dp-knapsack-setups.md)
