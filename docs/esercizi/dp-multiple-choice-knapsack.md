---
title: "Esercizi · PD per il problema dello zaino a scelta multipla"
---

# Esercizi · PD per il problema dello zaino a scelta multipla

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 21** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 21: Zaino a scelta multipla (MCKP)](../programmazione-dinamica/dp-multiple-choice-knapsack.md) · [:material-file-pdf-box: Eserciziario, volume 3 (PDF)](../pdf/esercizi-3-programmazione-dinamica.pdf)

</div>

!!! formula "Ricorrenza usata in questi esercizi"

    L'algoritmo di PD del capitolo [«PD per il problema dello zaino a scelta multipla»](../programmazione-dinamica/dp-multiple-choice-knapsack.md): $v(h,k)$ è il valore ottimo con le classi $\mathscr{J}_1,\dots,\mathscr{J}_h$ e capacità $k$, con $v(h,k)=-\infty$ se non esiste una soluzione ammissibile, e

    $$
    v(h,k)= \left\{ \begin{array}{ll}
    0 & \textrm{se $h=0$,}\\[2ex]
    -\infty & \begin{array}[t]{@{}l@{}}\textrm{se $h\ge 1$ e}\\ \textrm{$\forall j\in\mathscr{J}_h$: $w_j>k$,}\end{array}\\[4ex]
    \displaystyle \max_{j \in \mathscr{J}_h:\, w_j \le k} \big\{ p_j + v(h-1,k-w_j) \big\} & \begin{array}[t]{@{}l@{}}\textrm{se $h\ge 1$ e}\\ \textrm{$\exists j\in\mathscr{J}_h$: $w_j\le k$.}\end{array}
    \end{array} \right.
    $$

    con $p_j+(-\infty)=-\infty$. La matrice $s$ memorizza l'oggetto $s[h][k]$ scelto nella classe $h$ ($0$ se $v[h][k]=-\infty$); una soluzione ottima si ricostruisce da $h=q$ e $k=c$ con $j\leftarrow s[h][k]$, $x_j\leftarrow 1$, $k\leftarrow k-w_j$.

<a id="esercizio-21-1"></a>

!!! esercizio "Esercizio 21.1: Esercizio 1: problema dello zaino a scelta multipla"

    Consideriamo la seguente istanza dell'MCKP, con uno zaino di capacità $c=6$ e $4$ oggetti partizionati in $q=2$ classi: $\mathscr{J}_1=\{1,2\}$, $\mathscr{J}_2=\{3,4\}$. I profitti e i pesi sono:

    $$
    \begin{array}{l|rr|rr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\
    \hline {p_j} & 4 & 6 & 3 & 6 \\
    {w_j} & 2 & 4 & 1 & 3 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni passo, le celle $v[h][k]$ e $s[h][k]$; poi scrivere le matrici $v$ e $s$.

    2. Usando la matrice $s$, ricostruire una soluzione ottima, un oggetto per classe, e riportare il valore ottimo.

    3. Usando l'ultima riga della matrice $v$, trovare la minima capacità per cui l'istanza è ammissibile e confrontarla con $\sum_{h=1}^{q}\min_{j\in\mathscr{J}_h} w_j$.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up. La riga $h=0$ è $v[0][k]=0$ e $s[0][k]=0$ per ogni $k$; $s[h][k]=0$ quando $v[h][k]=-\infty$. In caso di pareggio si conserva l'oggetto incontrato per primo in $\mathscr{J}_h$.

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
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>nessun oggetto di <span class="arithmatex">\(\mathscr{J}_1\)</span> entra: <span class="arithmatex">\(-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][0]\}=\max\{4\}=4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][1]\}=\max\{4\}=4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][2],\,p_2{+}v[0][0]\}=\max\{4,6\}=6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][3],\,p_2{+}v[0][1]\}=\max\{4,6\}=6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][4],\,p_2{+}v[0][2]\}=\max\{4,6\}=6\)</span></td>
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
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][1]\}=\max\{-\infty\}=-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][2],\,p_4{+}v[1][0]\}=\max\{7,-\infty\}=7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][3],\,p_4{+}v[1][1]\}=\max\{7,-\infty\}=7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][4],\,p_4{+}v[1][2]\}=\max\{9,10\}=10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][5],\,p_4{+}v[1][3]\}=\max\{9,10\}=10\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrr}
        \hline {v[h][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} \\
        \hline {h=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {h=1} & {-\infty} & {-\infty} & {4} & {4} & {6} & {6} & {6} \\
        {h=2} & {-\infty} & {-\infty} & {-\infty} & {7} & {7} & {10} & {10} \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrr}
        \hline {s[h][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} \\
        \hline {h=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {h=1} & {0} & {0} & {1} & {1} & {2} & {2} & {2} \\
        {h=2} & {0} & {0} & {0} & {3} & {3} & {4} & {4} \\
        \hline
        \end{array}
        $$

    2. Partendo da $h=2$ e $k=6$:

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
        <td><span class="arithmatex">\(k=6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(x[4]\leftarrow 1\)</span></td>
        <td><span class="arithmatex">\(k\leftarrow 6-3=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span></td>
        <td><span class="arithmatex">\(k\leftarrow 3-2=1\)</span></td>
        </tr>
        </table></div>

        La soluzione ottima è $S=\{1,4\}$, cioè il vettore $x=(1,0,0,1)$. Il suo peso totale è $2+3=5\le c$, e il valore ottimo è $v[2][6]=4+6=10$.

    3. L'ultima riga $v[2][\cdot]$ è $-\infty$ per $k<3$ e finita da $k=3$ in poi, quindi la minima capacità per cui l'istanza è ammissibile è $3$. È uguale a $\sum_{h=1}^{2}\min_{j\in\mathscr{J}_h} w_j=2+1=3$: l'oggetto più leggero di ogni classe deve entrare nello zaino.

<a id="esercizio-21-2"></a>

!!! esercizio "Esercizio 21.2: Esercizio 2: problema dello zaino a scelta multipla"

    Consideriamo la seguente istanza dell'MCKP, con uno zaino di capacità $c=8$ e $5$ oggetti partizionati in $q=2$ classi: $\mathscr{J}_1=\{1,2\}$, $\mathscr{J}_2=\{3,4,5\}$. I profitti e i pesi sono:

    $$
    \begin{array}{l|rr|rrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\
    \hline {p_j} & 6 & 9 & 2 & 5 & 6 \\
    {w_j} & 2 & 4 & 1 & 3 & 5 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni passo, le celle $v[h][k]$ e $s[h][k]$; poi scrivere le matrici $v$ e $s$.

    2. Usando la matrice $s$, ricostruire una soluzione ottima, un oggetto per classe, e riportare il valore ottimo.

    3. Usando l'ultima riga della matrice $v$, trovare la minima capacità per cui l'istanza è ammissibile e confrontarla con $\sum_{h=1}^{q}\min_{j\in\mathscr{J}_h} w_j$.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up. La riga $h=0$ è $v[0][k]=0$ e $s[0][k]=0$ per ogni $k$; $s[h][k]=0$ quando $v[h][k]=-\infty$. In caso di pareggio si conserva l'oggetto incontrato per primo in $\mathscr{J}_h$.

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
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>nessun oggetto di <span class="arithmatex">\(\mathscr{J}_1\)</span> entra: <span class="arithmatex">\(-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][0]\}=\max\{6\}=6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][1]\}=\max\{6\}=6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][2],\,p_2{+}v[0][0]\}=\max\{6,9\}=9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][3],\,p_2{+}v[0][1]\}=\max\{6,9\}=9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][4],\,p_2{+}v[0][2]\}=\max\{6,9\}=9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][5],\,p_2{+}v[0][3]\}=\max\{6,9\}=9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][6],\,p_2{+}v[0][4]\}=\max\{6,9\}=9\)</span></td>
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
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][1]\}=\max\{-\infty\}=-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][2],\,p_4{+}v[1][0]\}=\max\{8,-\infty\}=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][3],\,p_4{+}v[1][1]\}=\max\{8,-\infty\}=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][4],\,p_4{+}v[1][2],\,p_5{+}v[1][0]\}=\max\{11,11,-\infty\}=11\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][5],\,p_4{+}v[1][3],\,p_5{+}v[1][1]\}=\max\{11,11,-\infty\}=11\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][6],\,p_4{+}v[1][4],\,p_5{+}v[1][2]\}=\max\{11,14,12\}=14\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][7],\,p_4{+}v[1][5],\,p_5{+}v[1][3]\}=\max\{11,14,12\}=14\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrr}
        \hline {v[h][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} \\
        \hline {h=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {h=1} & {-\infty} & {-\infty} & {6} & {6} & {9} & {9} & {9} & {9} & {9} \\
        {h=2} & {-\infty} & {-\infty} & {-\infty} & {8} & {8} & {11} & {11} & {14} & {14} \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrr}
        \hline {s[h][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} \\
        \hline {h=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {h=1} & {0} & {0} & {1} & {1} & {2} & {2} & {2} & {2} & {2} \\
        {h=2} & {0} & {0} & {0} & {3} & {3} & {3} & {3} & {4} & {4} \\
        \hline
        \end{array}
        $$

    2. Partendo da $h=2$ e $k=8$:

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
        <td><span class="arithmatex">\(k=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(x[4]\leftarrow 1\)</span></td>
        <td><span class="arithmatex">\(k\leftarrow 8-3=5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(x[2]\leftarrow 1\)</span></td>
        <td><span class="arithmatex">\(k\leftarrow 5-4=1\)</span></td>
        </tr>
        </table></div>

        La soluzione ottima è $S=\{2,4\}$, cioè il vettore $x=(0,1,0,1,0)$. Il suo peso totale è $4+3=7\le c$, e il valore ottimo è $v[2][8]=9+5=14$.

    3. L'ultima riga $v[2][\cdot]$ è $-\infty$ per $k<3$ e finita da $k=3$ in poi, quindi la minima capacità per cui l'istanza è ammissibile è $3$. È uguale a $\sum_{h=1}^{2}\min_{j\in\mathscr{J}_h} w_j=2+1=3$: l'oggetto più leggero di ogni classe deve entrare nello zaino.

<a id="esercizio-21-3"></a>

!!! esercizio "Esercizio 21.3: Esercizio 3: problema dello zaino a scelta multipla"

    Consideriamo la seguente istanza dell'MCKP, con uno zaino di capacità $c=8$ e $6$ oggetti partizionati in $q=3$ classi: $\mathscr{J}_1=\{1,2\}$, $\mathscr{J}_2=\{3,4\}$, $\mathscr{J}_3=\{5,6\}$. I profitti e i pesi sono:

    $$
    \begin{array}{l|rr|rr|rr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} \\
    \hline {p_j} & 2 & 5 & 3 & 7 & 4 & 6 \\
    {w_j} & 2 & 5 & 1 & 2 & 4 & 5 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni passo, le celle $v[h][k]$ e $s[h][k]$; poi scrivere le matrici $v$ e $s$.

    2. Usando la matrice $s$, ricostruire una soluzione ottima, un oggetto per classe, e riportare il valore ottimo.

    3. Usando l'ultima riga della matrice $v$, trovare la minima capacità per cui l'istanza è ammissibile e confrontarla con $\sum_{h=1}^{q}\min_{j\in\mathscr{J}_h} w_j$.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up. La riga $h=0$ è $v[0][k]=0$ e $s[0][k]=0$ per ogni $k$; $s[h][k]=0$ quando $v[h][k]=-\infty$. In caso di pareggio si conserva l'oggetto incontrato per primo in $\mathscr{J}_h$.

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
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>nessun oggetto di <span class="arithmatex">\(\mathscr{J}_1\)</span> entra: <span class="arithmatex">\(-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][0]\}=\max\{2\}=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][1]\}=\max\{2\}=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][2]\}=\max\{2\}=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][3],\,p_2{+}v[0][0]\}=\max\{2,5\}=5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][4],\,p_2{+}v[0][1]\}=\max\{2,5\}=5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][5],\,p_2{+}v[0][2]\}=\max\{2,5\}=5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][6],\,p_2{+}v[0][3]\}=\max\{2,5\}=5\)</span></td>
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
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][1],\,p_4{+}v[1][0]\}=\max\{-\infty,-\infty\}=-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][2],\,p_4{+}v[1][1]\}=\max\{5,-\infty\}=5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][3],\,p_4{+}v[1][2]\}=\max\{5,9\}=9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][4],\,p_4{+}v[1][3]\}=\max\{5,9\}=9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][5],\,p_4{+}v[1][4]\}=\max\{8,9\}=9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][6],\,p_4{+}v[1][5]\}=\max\{8,12\}=12\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][7],\,p_4{+}v[1][6]\}=\max\{8,12\}=12\)</span></td>
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
        <td>nessun oggetto di <span class="arithmatex">\(\mathscr{J}_3\)</span> entra: <span class="arithmatex">\(-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>nessun oggetto di <span class="arithmatex">\(\mathscr{J}_3\)</span> entra: <span class="arithmatex">\(-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\max\{p_5{+}v[2][0]\}=\max\{-\infty\}=-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\max\{p_5{+}v[2][1],\,p_6{+}v[2][0]\}=\max\{-\infty,-\infty\}=-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\max\{p_5{+}v[2][2],\,p_6{+}v[2][1]\}=\max\{-\infty,-\infty\}=-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\max\{p_5{+}v[2][3],\,p_6{+}v[2][2]\}=\max\{9,-\infty\}=9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\max\{p_5{+}v[2][4],\,p_6{+}v[2][3]\}=\max\{13,11\}=13\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrr}
        \hline {v[h][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} \\
        \hline {h=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {h=1} & {-\infty} & {-\infty} & {2} & {2} & {2} & {5} & {5} & {5} & {5} \\
        {h=2} & {-\infty} & {-\infty} & {-\infty} & {5} & {9} & {9} & {9} & {12} & {12} \\
        {h=3} & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {9} & {13} \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrr}
        \hline {s[h][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} \\
        \hline {h=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {h=1} & {0} & {0} & {1} & {1} & {1} & {2} & {2} & {2} & {2} \\
        {h=2} & {0} & {0} & {0} & {3} & {4} & {4} & {4} & {4} & {4} \\
        {h=3} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {5} & {5} \\
        \hline
        \end{array}
        $$

    2. Partendo da $h=3$ e $k=8$:

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
        <td><span class="arithmatex">\(k=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(x[5]\leftarrow 1\)</span></td>
        <td><span class="arithmatex">\(k\leftarrow 8-4=4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(x[4]\leftarrow 1\)</span></td>
        <td><span class="arithmatex">\(k\leftarrow 4-2=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span></td>
        <td><span class="arithmatex">\(k\leftarrow 2-2=0\)</span></td>
        </tr>
        </table></div>

        La soluzione ottima è $S=\{1,4,5\}$, cioè il vettore $x=(1,0,0,1,1,0)$. Il suo peso totale è $2+2+4=8\le c$, e il valore ottimo è $v[3][8]=2+7+4=13$.

    3. L'ultima riga $v[3][\cdot]$ è $-\infty$ per $k<7$ e finita da $k=7$ in poi, quindi la minima capacità per cui l'istanza è ammissibile è $7$. È uguale a $\sum_{h=1}^{3}\min_{j\in\mathscr{J}_h} w_j=2+1+4=7$: l'oggetto più leggero di ogni classe deve entrare nello zaino.

<a id="esercizio-21-4"></a>

!!! esercizio "Esercizio 21.4: Esercizio 4: problema dello zaino a scelta multipla"

    Consideriamo la seguente istanza dell'MCKP, con uno zaino di capacità $c=7$ e $5$ oggetti partizionati in $q=2$ classi: $\mathscr{J}_1=\{1,2,3\}$, $\mathscr{J}_2=\{4,5\}$. I profitti e i pesi sono:

    $$
    \begin{array}{l|rrr|rr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\
    \hline {p_j} & 3 & 7 & 8 & 3 & 9 \\
    {w_j} & 2 & 3 & 4 & 4 & 5 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni passo, le celle $v[h][k]$ e $s[h][k]$; poi scrivere le matrici $v$ e $s$.

    2. Usando la matrice $s$, ricostruire una soluzione ottima, un oggetto per classe, e riportare il valore ottimo.

    3. Usando l'ultima riga della matrice $v$, trovare la minima capacità per cui l'istanza è ammissibile e confrontarla con $\sum_{h=1}^{q}\min_{j\in\mathscr{J}_h} w_j$.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up. La riga $h=0$ è $v[0][k]=0$ e $s[0][k]=0$ per ogni $k$; $s[h][k]=0$ quando $v[h][k]=-\infty$. In caso di pareggio si conserva l'oggetto incontrato per primo in $\mathscr{J}_h$.

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
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>nessun oggetto di <span class="arithmatex">\(\mathscr{J}_1\)</span> entra: <span class="arithmatex">\(-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][0]\}=\max\{3\}=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][1],\,p_2{+}v[0][0]\}=\max\{3,7\}=7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][2],\,p_2{+}v[0][1],\,p_3{+}v[0][0]\}=\max\{3,7,8\}=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][3],\,p_2{+}v[0][2],\,p_3{+}v[0][1]\}=\max\{3,7,8\}=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][4],\,p_2{+}v[0][3],\,p_3{+}v[0][2]\}=\max\{3,7,8\}=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][5],\,p_2{+}v[0][4],\,p_3{+}v[0][3]\}=\max\{3,7,8\}=8\)</span></td>
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
        <td>nessun oggetto di <span class="arithmatex">\(\mathscr{J}_2\)</span> entra: <span class="arithmatex">\(-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>nessun oggetto di <span class="arithmatex">\(\mathscr{J}_2\)</span> entra: <span class="arithmatex">\(-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>nessun oggetto di <span class="arithmatex">\(\mathscr{J}_2\)</span> entra: <span class="arithmatex">\(-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\max\{p_4{+}v[1][0]\}=\max\{-\infty\}=-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\max\{p_4{+}v[1][1],\,p_5{+}v[1][0]\}=\max\{-\infty,-\infty\}=-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_4{+}v[1][2],\,p_5{+}v[1][1]\}=\max\{6,-\infty\}=6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\max\{p_4{+}v[1][3],\,p_5{+}v[1][2]\}=\max\{10,12\}=12\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrr}
        \hline {v[h][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} \\
        \hline {h=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {h=1} & {-\infty} & {-\infty} & {3} & {7} & {8} & {8} & {8} & {8} \\
        {h=2} & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {6} & {12} \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrr}
        \hline {s[h][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} \\
        \hline {h=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {h=1} & {0} & {0} & {1} & {2} & {3} & {3} & {3} & {3} \\
        {h=2} & {0} & {0} & {0} & {0} & {0} & {0} & {4} & {5} \\
        \hline
        \end{array}
        $$

    2. Partendo da $h=2$ e $k=7$:

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
        <td><span class="arithmatex">\(k=7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(x[5]\leftarrow 1\)</span></td>
        <td><span class="arithmatex">\(k\leftarrow 7-5=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span></td>
        <td><span class="arithmatex">\(k\leftarrow 2-2=0\)</span></td>
        </tr>
        </table></div>

        La soluzione ottima è $S=\{1,5\}$, cioè il vettore $x=(1,0,0,0,1)$. Il suo peso totale è $2+5=7\le c$, e il valore ottimo è $v[2][7]=3+9=12$.

    3. L'ultima riga $v[2][\cdot]$ è $-\infty$ per $k<6$ e finita da $k=6$ in poi, quindi la minima capacità per cui l'istanza è ammissibile è $6$. È uguale a $\sum_{h=1}^{2}\min_{j\in\mathscr{J}_h} w_j=2+4=6$: l'oggetto più leggero di ogni classe deve entrare nello zaino.

<a id="esercizio-21-5"></a>

!!! esercizio "Esercizio 21.5: Esercizio 5: problema dello zaino a scelta multipla"

    Consideriamo la seguente istanza dell'MCKP, con uno zaino di capacità $c=9$ e $6$ oggetti partizionati in $q=3$ classi: $\mathscr{J}_1=\{1,2\}$, $\mathscr{J}_2=\{3,4\}$, $\mathscr{J}_3=\{5,6\}$. I profitti e i pesi sono:

    $$
    \begin{array}{l|rr|rr|rr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} \\
    \hline {p_j} & 3 & 6 & 2 & 7 & 3 & 6 \\
    {w_j} & 1 & 4 & 1 & 3 & 4 & 5 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni passo, le celle $v[h][k]$ e $s[h][k]$; poi scrivere le matrici $v$ e $s$.

    2. Usando la matrice $s$, ricostruire una soluzione ottima, un oggetto per classe, e riportare il valore ottimo.

    3. Usando l'ultima riga della matrice $v$, trovare la minima capacità per cui l'istanza è ammissibile e confrontarla con $\sum_{h=1}^{q}\min_{j\in\mathscr{J}_h} w_j$.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up. La riga $h=0$ è $v[0][k]=0$ e $s[0][k]=0$ per ogni $k$; $s[h][k]=0$ quando $v[h][k]=-\infty$. In caso di pareggio si conserva l'oggetto incontrato per primo in $\mathscr{J}_h$.

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
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][0]\}=\max\{3\}=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][1]\}=\max\{3\}=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][2]\}=\max\{3\}=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][3],\,p_2{+}v[0][0]\}=\max\{3,6\}=6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][4],\,p_2{+}v[0][1]\}=\max\{3,6\}=6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][5],\,p_2{+}v[0][2]\}=\max\{3,6\}=6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][6],\,p_2{+}v[0][3]\}=\max\{3,6\}=6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][7],\,p_2{+}v[0][4]\}=\max\{3,6\}=6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\max\{p_1{+}v[0][8],\,p_2{+}v[0][5]\}=\max\{3,6\}=6\)</span></td>
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
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][1]\}=\max\{5\}=5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][2],\,p_4{+}v[1][0]\}=\max\{5,-\infty\}=5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][3],\,p_4{+}v[1][1]\}=\max\{5,10\}=10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][4],\,p_4{+}v[1][2]\}=\max\{8,10\}=10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][5],\,p_4{+}v[1][3]\}=\max\{8,10\}=10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][6],\,p_4{+}v[1][4]\}=\max\{8,13\}=13\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][7],\,p_4{+}v[1][5]\}=\max\{8,13\}=13\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\max\{p_3{+}v[1][8],\,p_4{+}v[1][6]\}=\max\{8,13\}=13\)</span></td>
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
        <td>nessun oggetto di <span class="arithmatex">\(\mathscr{J}_3\)</span> entra: <span class="arithmatex">\(-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>nessun oggetto di <span class="arithmatex">\(\mathscr{J}_3\)</span> entra: <span class="arithmatex">\(-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\max\{p_5{+}v[2][0]\}=\max\{-\infty\}=-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\max\{p_5{+}v[2][1],\,p_6{+}v[2][0]\}=\max\{-\infty,-\infty\}=-\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\max\{p_5{+}v[2][2],\,p_6{+}v[2][1]\}=\max\{8,-\infty\}=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\max\{p_5{+}v[2][3],\,p_6{+}v[2][2]\}=\max\{8,11\}=11\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\max\{p_5{+}v[2][4],\,p_6{+}v[2][3]\}=\max\{13,11\}=13\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\max\{p_5{+}v[2][5],\,p_6{+}v[2][4]\}=\max\{13,16\}=16\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrr}
        \hline {v[h][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} \\
        \hline {h=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {h=1} & {-\infty} & {3} & {3} & {3} & {6} & {6} & {6} & {6} & {6} & {6} \\
        {h=2} & {-\infty} & {-\infty} & {5} & {5} & {10} & {10} & {10} & {13} & {13} & {13} \\
        {h=3} & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {8} & {11} & {13} & {16} \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrr}
        \hline {s[h][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} \\
        \hline {h=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {h=1} & {0} & {1} & {1} & {1} & {2} & {2} & {2} & {2} & {2} & {2} \\
        {h=2} & {0} & {0} & {3} & {3} & {4} & {4} & {4} & {4} & {4} & {4} \\
        {h=3} & {0} & {0} & {0} & {0} & {0} & {0} & {5} & {6} & {5} & {6} \\
        \hline
        \end{array}
        $$

    2. Partendo da $h=3$ e $k=9$:

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
        <td><span class="arithmatex">\(k=9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(x[6]\leftarrow 1\)</span></td>
        <td><span class="arithmatex">\(k\leftarrow 9-5=4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(x[4]\leftarrow 1\)</span></td>
        <td><span class="arithmatex">\(k\leftarrow 4-3=1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span></td>
        <td><span class="arithmatex">\(k\leftarrow 1-1=0\)</span></td>
        </tr>
        </table></div>

        La soluzione ottima è $S=\{1,4,6\}$, cioè il vettore $x=(1,0,0,1,0,1)$. Il suo peso totale è $1+3+5=9\le c$, e il valore ottimo è $v[3][9]=3+7+6=16$.

    3. L'ultima riga $v[3][\cdot]$ è $-\infty$ per $k<6$ e finita da $k=6$ in poi, quindi la minima capacità per cui l'istanza è ammissibile è $6$. È uguale a $\sum_{h=1}^{3}\min_{j\in\mathscr{J}_h} w_j=1+1+4=6$: l'oggetto più leggero di ogni classe deve entrare nello zaino.
