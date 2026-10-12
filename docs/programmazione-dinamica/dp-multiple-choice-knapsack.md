---
title: "PD per il problema dello zaino a scelta multipla"
---

# PD per il problema dello zaino a scelta multipla

<div class="info-capitolo" markdown>

**Parte 3 · Programmazione dinamica · Capitolo 21** · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../pdf/dispensa-3-programmazione-dinamica.pdf) · [:material-pencil: Esercizi: Zaino a scelta multipla (MCKP)](../esercizi/dp-multiple-choice-knapsack.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, il capitolo [«PD per il problema dello zaino 0/1»](dp-knapsack/index.md): la ricorrenza $v(j,k)$ del problema dello zaino 0/1 (KP) su oggetti e capacità, la matrice $s$ delle decisioni e la ricostruzione di una soluzione.

    - Da questo modulo, il capitolo [«Problemi di zaino»](../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-a-scelta-multipla.md): il problema dello zaino a scelta multipla, le sue classi $\mathscr{J}_h$ e la sua condizione di ammissibilità.

    - Dal modulo <em>Algoritmi</em>: [le convenzioni dello pseudocodice (Capitolo 2)](https://fabiofurini.github.io/algoritmi/algoritmi-di-base/02-pseudocodice/) e [la dimensione dell'input (Capitolo 11)](https://fabiofurini.github.io/algoritmi/analisi/11-dimensione-input/).

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - scrivere la ricorrenza $v(h,k)$ su classi e capacità, con il valore $-\infty$ per le sottoistanze senza soluzione ammissibile;

    - eseguire a mano l'algoritmo di PD, provando ogni oggetto della classe $h$ che entra nello zaino;

    - riempire la matrice $s$ degli oggetti scelti e ricostruire una soluzione ottima, un oggetto per classe;

    - contare i $\Theta(nc)$ passi dell'algoritmo di PD.

Il problema di questo capitolo è il [problema dello zaino a scelta multipla (MCKP)](../catalogo/multiple-choice-knapsack-problem.md): la sua definizione e le sue ipotesi sono nella sua pagina.

## 21.1 Un algoritmo di PD

<a id="box-1-texmckpex1"></a>

!!! esempio "Esempio 21.1: Istanza dell'MCKP"

    Consideriamo uno zaino di capacità $c=10$ e un insieme $\mathscr{I}=\{1,2,\dots,7\}$ di $7$ oggetti ($n=7$), partizionato in $q=3$ classi: $\mathscr{J}_1=\{1,2\}$, $\mathscr{J}_2=\{3,4,5\}$ e $\mathscr{J}_3=\{6,7\}$. I profitti e i pesi sono:

    $$
    \begin{array}{l|rr|rrr|rr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} & {j=7} \\
    \hline {p_j} & 4 & 8 & 3 & 5 & 7 & 3 & 7 \\
    {w_j} & 1 & 4 & 1 & 2 & 5 & 2 & 3 \\
    \hline
    \end{array}
    $$

    Chiamiamo questa istanza dell'MCKP <span style="color:#1971c2">[Esempio 21.1](#box-1-texmckpex1)</span>.

- Una soluzione ammissibile sceglie esattamente un oggetto in ogni classe, quindi si descrive con il sottoinsieme selezionato $S\subseteq\mathscr{I}$, con $|S\cap\mathscr{J}_h|=1$ per ogni classe $h$, oppure con il vettore binario $(x_1,x_2,\dots,x_n)$ di $S$.

- Le classi sono gli stadi dell'algoritmo di PD: la classe $h$ si decide dopo le classi $1,2,\dots,h-1$, e la sua decisione è l'oggetto scelto in essa.

- <u>Passo 1</u>: calcolo del valore ottimo

    !!! formula ""

        Per ogni $h \in \{0,1,\dots,q\}$ e $k \in \{0,1,\dots,c\}$, sia $v(h,k)$ il valore ottimo della sottoistanza dell'MCKP data da:

        1. uno zaino di capacità $k$,

        2. le classi $\mathscr{J}_1,\mathscr{J}_2,\dots,\mathscr{J}_h$,

        3. per ogni oggetto $j \in \mathscr{J}_1\cup\mathscr{J}_2\cup\dots\cup\mathscr{J}_h$, un profitto $p_j$ e un peso $w_j$,

        con $v(h,k)=-\infty$ se questa sottoistanza non ha soluzioni ammissibili.

        La formula ricorsiva per calcolare $v(h,k)$ è la seguente:

        \begin{equation*}
        \label{eq:mckp}
        v(h,k)= \left\{ \begin{array}{ll}
        0 & \textrm{se $h=0$,}\\[2ex]
        -\infty & \begin{array}[t]{@{}l@{}}\textrm{se $h\ge 1$ e}\\ \textrm{$\forall j\in\mathscr{J}_h$: $w_j>k$,}\end{array}\\[4ex]
        \displaystyle \max_{j \in \mathscr{J}_h:\, w_j \le k} \big\{ p_j + v(h-1,k-w_j) \big\} & \begin{array}[t]{@{}l@{}}\textrm{se $h\ge 1$ e}\\ \textrm{$\exists j\in\mathscr{J}_h$: $w_j\le k$.}\end{array}
        \end{array} \right. \tag{21.1}
        \end{equation*}

    - Il valore $-\infty$ segue le regole $p_j+(-\infty)=-\infty$ e $\max\{-\infty,a\}=a$: una sottoistanza senza soluzioni ammissibili non dà mai un valore migliore.

    - I casi base sono $v(0,k)=0$ per ogni $k$: senza classi, il sottoinsieme vuoto è ammissibile e ha profitto $0$, qualunque sia la capacità.

    - La formula $\eqref{eq:mckp}$ genera al più $|\mathscr{J}_h|$ <strong>sottoproblemi indipendenti</strong>, uno per ogni oggetto $j$ della classe $h$ che entra nella capacità $k$: il sottoproblema residuo ha le classi $1,2,\dots,h-1$ e la capacità $k-w_j$.

    - Quindi una soluzione ottima per $(h,k)$ si costruisce combinando il miglior oggetto $j$ della classe $h$ con una soluzione ottima del suo sottoproblema residuo.

        $\rightsquigarrow$ <strong>Sottostruttura ottima verificata!</strong>

    - Scelte diverse nelle classi $h,h+1,\dots,q$ possono lasciare la stessa capacità residua, e quindi lo stesso valore $v(h,k)$ può servire più volte durante la valutazione ricorsiva della formula $\eqref{eq:mckp}$.

        $\rightsquigarrow$ <strong>Sottoproblemi sovrapposti verificati!</strong>

    - Il valore $v(h,k)$ dipende solo dai valori $v(h-1,k')$ con $k'< k$. Quindi l'<strong>approccio bottom-up</strong> calcola le righe $h=0,1,\dots,q$ in quest'ordine, ciascuna per $k$ crescente, e memorizza ogni valore in una <strong>tabella di lookup</strong>.

    - Il valore ottimo dell'istanza dell'MCKP è $v(q,c)$, e l'istanza è inammissibile se e solo se $v(q,c)=-\infty$.

- <u>Passo 2</u>: calcolo di una soluzione ottima

    - Per ogni classe $h$ e capacità $k$, memorizziamo $s[h][k]$, l'oggetto della classe $h$ scelto in una soluzione ottima della sottoistanza $(h,k)$, cioè l'oggetto che massimizza il membro destro della formula $\eqref{eq:mckp}$.

    - Se $v[h][k]=-\infty$, non si sceglie alcun oggetto e $s[h][k]=0$.

    Questo è lo pseudocodice dell'<strong>algoritmo di PD con l'approccio bottom-up</strong>, che memorizza la matrice $s$ insieme alla matrice $v$:

    !!! algoritmo "Algoritmo: MCKP\_DP"

        <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> Un'istanza dell'MCKP data da <span class="arithmatex">\(q\)</span>, dalle classi <span class="arithmatex">\(\mathscr{J}_1,\dots,\mathscr{J}_q\)</span>, dai vettori <span class="arithmatex">\(p[1..n]\)</span>, <span class="arithmatex">\(w[1..n]\)</span> e dalla capacità <span class="arithmatex">\(c\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> Il valore ottimo dell'istanza dell'MCKP e la matrice <span class="arithmatex">\(s[0..q][0..c]\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> MCKP_DP(<span class="arithmatex">\(q,\mathscr{J},p,w,c\)</span>)</div><div class="pc" style="--liv:1" id="box-2-mckpbu-a"><span class="pc-n">2</span><span class="arithmatex">\(v := \textnormal{new array}[0..q][0..c]\)</span>; <span class="arithmatex">\(s := \textnormal{new array}[0..q][0..c]\)</span></div><div class="pc" style="--liv:1" id="box-3-mckpbu-b"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(k := 0\)</span> <strong>to</strong> <span class="arithmatex">\(c\)</span>  <strong>do</strong></div><div class="pc" style="--liv:2" id="box-4-mckpbu-c"><span class="pc-n">4</span><span class="arithmatex">\(v[0][k] \leftarrow 0\)</span>; <span class="arithmatex">\(s[0][k] \leftarrow 0\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">5</span><strong>end</strong></div><div class="pc" style="--liv:1" id="box-5-mckpbu-d"><span class="pc-n">6</span><strong>for</strong> <span class="arithmatex">\(h := 1\)</span> <strong>to</strong> <span class="arithmatex">\(q\)</span>  <strong>do</strong></div><div class="pc" style="--liv:2" id="box-6-mckpbu-e"><span class="pc-n">7</span><strong>for</strong> <span class="arithmatex">\(k := 0\)</span> <strong>to</strong> <span class="arithmatex">\(c\)</span>  <strong>do</strong></div><div class="pc" style="--liv:3" id="box-7-mckpbu-f"><span class="pc-n">8</span><span class="arithmatex">\(m := -\infty\)</span>; <span class="arithmatex">\(t := 0\)</span></div><div class="pc" style="--liv:3" id="box-8-mckpbu-g"><span class="pc-n">9</span><strong>for each</strong> <span class="arithmatex">\(j \in \mathscr{J}_h\)</span>  <strong>do</strong></div><div class="pc" style="--liv:4" id="box-9-mckpbu-h"><span class="pc-n">10</span><strong>if</strong> <span class="arithmatex">\(w[j]\le k\)</span> e <span class="arithmatex">\(p[j]+v[h-1][k-w[j]] > m\)</span>  <strong>then</strong></div><div class="pc" style="--liv:5" id="box-10-mckpbu-i"><span class="pc-n">11</span><span class="arithmatex">\(m \leftarrow p[j]+v[h-1][k-w[j]]\)</span>; <span class="arithmatex">\(t \leftarrow j\)</span></div><div class="pc" style="--liv:4"><span class="pc-n">12</span><strong>end</strong></div><div class="pc" style="--liv:3"><span class="pc-n">13</span><strong>end</strong></div><div class="pc" style="--liv:3" id="box-11-mckpbu-j"><span class="pc-n">14</span><span class="arithmatex">\(v[h][k] \leftarrow m\)</span>; <span class="arithmatex">\(s[h][k] \leftarrow t\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">15</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">16</span><strong>end</strong></div><div class="pc" style="--liv:1" id="box-12-mckpbu-k"><span class="pc-n">17</span><strong>return</strong> <span class="arithmatex">\(v[q][c], s\)</span></div></div>

    - La variabile $m$ parte da $-\infty$, non da $0$: si deve scegliere esattamente un oggetto della classe $h$, quindi il valore di una scelta vuota non è disponibile.

    - Il ciclo più interno prova ogni oggetto $j$ della classe $h$ che entra nello zaino, conserva in $m$ il valore massimo trovato finora e in $t$ l'oggetto che lo dà.

    - Se nessun oggetto della classe $h$ dà un valore maggiore di $-\infty$, la cella mantiene $v[h][k]=-\infty$ e $s[h][k]=0$.

    - In caso di pareggio si conserva l'oggetto incontrato per primo in $\mathscr{J}_h$, perché $m$ viene aggiornato solo quando il valore è strettamente maggiore.

    <a id="box-13-texmckpbu"></a>

    !!! esempio "Esempio 21.2: Esecuzione dell'algoritmo di PD"

        Consideriamo l'istanza dell'MCKP dell'<span style="color:#1971c2">[Esempio 21.1](#box-1-texmckpex1)</span>, con capacità $c=10$ e classi $\mathscr{J}_1=\{1,2\}$, $\mathscr{J}_2=\{3,4,5\}$, $\mathscr{J}_3=\{6,7\}$.

        Per ogni passo dell'algoritmo di PD con $h\ge 1$, la tabella riporta i valori di $h$ e $k$, le celle $v[h][k]$ e $s[h][k]$ e l'operazione eseguita. La riga $h=0$ è $v[0][k]=0$ e $s[0][k]=0$ per ogni $k$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(h\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(v[h][k]\)</span></th>
        <th><span class="arithmatex">\(s[h][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>nessun oggetto di <span class="arithmatex">\(\mathscr{J}_1\)</span> entra: <span class="arithmatex">\(-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][0]\}=\max\{4\}=4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][1]\}=\max\{4\}=4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][2]\}=\max\{4\}=4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][3],\,p_2{+}v[0][0]\}=\max\{4,8\}=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][4],\,p_2{+}v[0][1]\}=\max\{4,8\}=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][5],\,p_2{+}v[0][2]\}=\max\{4,8\}=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][6],\,p_2{+}v[0][3]\}=\max\{4,8\}=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][7],\,p_2{+}v[0][4]\}=\max\{4,8\}=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][8],\,p_2{+}v[0][5]\}=\max\{4,8\}=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][9],\,p_2{+}v[0][6]\}=\max\{4,8\}=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>nessun oggetto di <span class="arithmatex">\(\mathscr{J}_2\)</span> entra: <span class="arithmatex">\(-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][0]\}=\max\{-\infty\}=-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][1],\,p_4{+}v[1][0]\}=\max\{7,-\infty\}=7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][2],\,p_4{+}v[1][1]\}=\max\{7,9\}=9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][3],\,p_4{+}v[1][2]\}=\max\{7,9\}=9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][4],\,p_4{+}v[1][3],\,p_5{+}v[1][0]\}=\max\{11,9,-\infty\}=11\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][5],\,p_4{+}v[1][4],\,p_5{+}v[1][1]\}=\max\{11,13,11\}=13\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][6],\,p_4{+}v[1][5],\,p_5{+}v[1][2]\}=\max\{11,13,11\}=13\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][7],\,p_4{+}v[1][6],\,p_5{+}v[1][3]\}=\max\{11,13,11\}=13\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][8],\,p_4{+}v[1][7],\,p_5{+}v[1][4]\}=\max\{11,13,15\}=15\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][9],\,p_4{+}v[1][8],\,p_5{+}v[1][5]\}=\max\{11,13,15\}=15\)</span></td>
        </tr>
        </table></div>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(h\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(v[h][k]\)</span></th>
        <th><span class="arithmatex">\(s[h][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>nessun oggetto di <span class="arithmatex">\(\mathscr{J}_3\)</span> entra: <span class="arithmatex">\(-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>nessun oggetto di <span class="arithmatex">\(\mathscr{J}_3\)</span> entra: <span class="arithmatex">\(-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\max\{p_6{+}v[2][0]\}=\max\{-\infty\}=-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\max\{p_6{+}v[2][1],\,p_7{+}v[2][0]\}=\max\{-\infty,-\infty\}=-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\max\{p_6{+}v[2][2],\,p_7{+}v[2][1]\}=\max\{10,-\infty\}=10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\max\{p_6{+}v[2][3],\,p_7{+}v[2][2]\}=\max\{12,14\}=14\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\max\{p_6{+}v[2][4],\,p_7{+}v[2][3]\}=\max\{12,16\}=16\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\max\{p_6{+}v[2][5],\,p_7{+}v[2][4]\}=\max\{14,16\}=16\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\max\{p_6{+}v[2][6],\,p_7{+}v[2][5]\}=\max\{16,18\}=18\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\max\{p_6{+}v[2][7],\,p_7{+}v[2][6]\}=\max\{16,20\}=20\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\max\{p_6{+}v[2][8],\,p_7{+}v[2][7]\}=\max\{16,20\}=20\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrrr}
        \hline {v[h][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} & {k=10} \\
        \hline {h=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {h=1} & {-\infty} & {4} & {4} & {4} & {8} & {8} & {8} & {8} & {8} & {8} & {8} \\
        {h=2} & {-\infty} & {-\infty} & {7} & {9} & {9} & {11} & {13} & {13} & {13} & {15} & {15} \\
        {h=3} & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {10} & {14} & {16} & {16} & {18} & {20} & {20} \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrrr}
        \hline {s[h][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} & {k=10} \\
        \hline {h=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {h=1} & {0} & {1} & {1} & {1} & {2} & {2} & {2} & {2} & {2} & {2} & {2} \\
        {h=2} & {0} & {0} & {3} & {4} & {4} & {3} & {4} & {4} & {4} & {5} & {5} \\
        {h=3} & {0} & {0} & {0} & {0} & {6} & {7} & {7} & {7} & {7} & {7} & {7} \\
        \hline
        \end{array}
        $$

        Per esempio, $v[2][1]=-\infty$: ogni scelta di un oggetto in $\mathscr{J}_1$ e di uno in $\mathscr{J}_2$ pesa almeno $w_1+w_3=2$. Il valore ottimo dell'istanza è $v[3][10]=20$, raggiunto con l'oggetto $s[3][10]=7$ della classe $3$.

    - Calcolata la matrice $s$, se $v[q][c]>-\infty$ si ricostruisce una soluzione ottima scorrendo le classi da $h=q$ fino a $h=1$, partendo da $k=c$ e da $x_j=0$ per ogni oggetto $j$:

        $$
        j \leftarrow s[h][k], \qquad x_j \leftarrow 1, \qquad k \leftarrow k - w_j.
        $$

    - Ogni classe dà esattamente un oggetto, quindi la ricostruzione seleziona $q$ oggetti.

    !!! algoritmo "Algoritmo: MCKP\_Reconstruct"

        <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> Il numero <span class="arithmatex">\(q\)</span> di classi, la capacità <span class="arithmatex">\(c\)</span>, il vettore <span class="arithmatex">\(w[1..n]\)</span> e la matrice <span class="arithmatex">\(s[0..q][0..c]\)</span>, con <span class="arithmatex">\(v[q][c]>-\infty\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> Una soluzione ottima dell'istanza dell'MCKP, come vettore binario</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> MCKP_Reconstruct(<span class="arithmatex">\(q,c,w,s\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(x := \textnormal{new array}[1..n]\)</span>, con <span class="arithmatex">\(x[j]=0\)</span> per ogni <span class="arithmatex">\(j\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><span class="arithmatex">\(k := c\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">4</span><strong>for</strong> <span class="arithmatex">\(h := q\)</span> <strong>to</strong> <span class="arithmatex">\(1\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><span class="arithmatex">\(j \leftarrow s[h][k]\)</span>; <span class="arithmatex">\(x[j] \leftarrow 1\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">6</span><span class="arithmatex">\(k \leftarrow k-w[j]\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">7</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">8</span><strong>return</strong> <span class="arithmatex">\(x\)</span></div></div>

    <a id="box-14-texmckpsol"></a>

    !!! esempio "Esempio 21.3: Calcolo di una soluzione ottima"

        Dopo l'esecuzione dell'algoritmo di PD sull'istanza dell'<span style="color:#1971c2">[Esempio 21.1](#box-1-texmckpex1)</span>, partiamo da $h=3$ e $k=10$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(h\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(j=s[h][k]\)</span></th>
        <th>Selezione</th>
        <th>Capacità</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(k=10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(x[7]\leftarrow 1\)</span></td>
        <td><span class="arithmatex">\(k\leftarrow 10-3=7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(x[4]\leftarrow 1\)</span></td>
        <td><span class="arithmatex">\(k\leftarrow 7-2=5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(x[2]\leftarrow 1\)</span></td>
        <td><span class="arithmatex">\(k\leftarrow 5-4=1\)</span></td>
        </tr>
        </table></div>

        !!! chiave ""

            Una soluzione ottima dell'istanza dell'MCKP dell'<span style="color:#1971c2">[Esempio 21.1](#box-1-texmckpex1)</span> è $S=\{2,4,7\}$, cioè il vettore $x=(0,1,0,1,0,0,1)$. Il suo peso totale è $4+2+3=9\le c$ e il suo valore ottimo è $v(3,10)=20$.

### 21.1.1 Numero di passi

- Indichiamo con $S(n,q,c)$ il numero di passi eseguiti da <code>MCKP\_DP</code> nel caso peggiore. Il ciclo più interno scorre gli oggetti della classe $h$, quindi su tutte le classi viene eseguito $|\mathscr{J}_1|+|\mathscr{J}_2|+\dots+|\mathscr{J}_q|=n$ volte per ogni capacità $k$. Supponendo che la condizione alla riga [10](#box-9-mckpbu-h) sia sempre vera:

    - Le <span style="color:#e03131">righe</span> [2](#box-2-mckpbu-a) e [17](#box-12-mckpbu-k) vengono eseguite $1$ volta ciascuna.

    - Le <span style="color:#e03131">righe</span> [3](#box-3-mckpbu-b) e [4](#box-4-mckpbu-c) vengono eseguite $c+1$ volte ciascuna.

    - La <span style="color:#e03131">riga</span> [6](#box-5-mckpbu-d) viene eseguita $q$ volte.

    - Le <span style="color:#e03131">righe</span> [7](#box-6-mckpbu-e), [8](#box-7-mckpbu-f) e [14](#box-11-mckpbu-j) vengono eseguite $q(c+1)$ volte ciascuna.

    - Le <span style="color:#e03131">righe</span> [9](#box-8-mckpbu-g), [10](#box-9-mckpbu-h) e [11](#box-10-mckpbu-i) vengono eseguite $n(c+1)$ volte ciascuna.

- Quindi il numero totale di passi nel caso peggiore è

    $$
    S(n,q,c)=3n(c+1)+3q(c+1)+q+2c+4.
    $$

    Poiché ogni classe contiene almeno un oggetto, $1\le q\le n$, e

    $$
    3n(c+1)\;\le\; S(n,q,c)\;\le\; 6n(c+1)+n+2c+4.
    $$

    Entrambi i bound sono $\Theta(nc)$, quindi $S(n,q,c)=\Theta(nc)$.

    !!! chiave ""

        L'algoritmo di PD per l'MCKP esegue

        $$
        S(n,q,c)=\Theta\big(c\,(|\mathscr{J}_1|+|\mathscr{J}_2|+\dots+|\mathscr{J}_q|)\big)=\Theta(nc)
        $$

        passi nel caso peggiore.

- La ricostruzione esegue $\Theta(q)$ passi, uno per ogni classe.

## 21.2 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Far partire $m$ da $0$ invece che da $-\infty$.</strong> Con $m=0$ una classe senza oggetti che entrano nello zaino verrebbe saltata, e la soluzione non conterrebbe esattamente un oggetto per classe.

    - <strong>Aggiungere l'opzione «nessun oggetto della classe $h$».</strong> Il termine $v(h-1,k)$ della ricorrenza del KP qui non ha posto: ogni classe dà esattamente un oggetto.

    - <strong>Porre $v(0,k)=-\infty$ per $k\ge 1$.</strong> Senza classi il sottoinsieme vuoto è ammissibile per ogni capacità: la capacità non deve essere riempita.

    - <strong>Ricostruire un'istanza inammissibile.</strong> Se $v(q,c)=-\infty$ l'istanza non ha soluzioni ammissibili, e $s[q][c]=0$ non dà alcun oggetto da selezionare.

## 21.3 In sintesi

!!! chiave "In sintesi"

    - Gli stadi dell'algoritmo di PD sono le classi: $v(h,k)=\max_{j\in\mathscr{J}_h:\,w_j\le k}\{p_j+v(h-1,k-w_j)\}$, con $v(0,k)=0$.

    - Il valore $-\infty$ segnala le sottoistanze senza soluzione ammissibile, e l'istanza è inammissibile se e solo se $v(q,c)=-\infty$.

    - La matrice $s$ memorizza l'oggetto scelto in ogni classe, e una soluzione ottima si legge all'indietro a partire da $(q,c)$, un oggetto per classe.

    - L'algoritmo di PD esegue $\Theta(c\sum_{h=1}^{q}|\mathscr{J}_h|)=\Theta(nc)$ passi.

    <strong>Quadro riassuntivo dell'esempio dell'MCKP.</strong> [Esempio 21.1](#box-1-texmckpex1) ($c=10$, tre classi):

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Metodo</th>
    <th>Lower bound</th>
    <th>Upper bound</th>
    <th>Origine</th>
    </tr>
    <tr>
    <td>Algoritmo di PD</td>
    <td><span class="arithmatex">\(20\)</span></td>
    <td><span class="arithmatex">\(20\)</span></td>
    <td>valore ottimo, soluzione <span class="arithmatex">\(S=\{2,4,7\}\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Zaino a scelta multipla (MCKP)](../esercizi/dp-multiple-choice-knapsack.md)
