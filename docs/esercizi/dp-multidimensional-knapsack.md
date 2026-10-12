---
title: "Esercizi · PD per il problema dello zaino multidimensionale"
---

# Esercizi · PD per il problema dello zaino multidimensionale

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 22** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 22: Zaino multidimensionale (MDKP)](../programmazione-dinamica/dp-multidimensional-knapsack.md) · [:material-file-pdf-box: Eserciziario, volume 3 (PDF)](../pdf/esercizi-3-programmazione-dinamica.pdf)

</div>

!!! formula "Ricorrenza usata in questi esercizi"

    L'algoritmo di PD del capitolo [«PD per il problema dello zaino multidimensionale»](../programmazione-dinamica/dp-multidimensional-knapsack.md), con $m$ dimensioni, il vettore $\vet{k}=(k_1,\dots,k_m)$ delle capacità e il vettore dei pesi $\vet{w}_j=(w_{1j},\dots,w_{mj})$ dell'oggetto $j$:

    $$
    v(j,\vet{k})= \left\{ \begin{array}{ll}
    0 & \textrm{se $j=0$,}\\[2ex]
    v(j-1,\vet{k}) & \begin{array}[t]{@{}l@{}}\textrm{se $j\ge 1$ e}\\ \textrm{$w_{dj}>k_d$ per qualche $d$,}\end{array}\\[4ex]
    \begin{array}[t]{@{}l@{}}\displaystyle \max \bigg\{ v(j-1,\vet{k}),\\ \qquad p_j+v(j-1,\vet{k}-\vet{w}_j) \bigg\}\end{array} & \textrm{se $j\ge 1$ e $\vet{w}_j\le\vet{k}$.}
    \end{array} \right.
    $$

    Il valore ottimo è $v(n,\vet{c})$. Le tabelle $s$ memorizzano $s[j][\vet{k}]=1$ se l'oggetto $j$ è selezionato; una soluzione ottima si ricostruisce da $j=n$ e $\vet{k}=\vet{c}$ con $x_j\leftarrow s[j][\vet{k}]$, $\vet{k}\leftarrow\vet{k}-x_j\vet{w}_j$.

<a id="esercizio-22-1"></a>

!!! esercizio "Esercizio 22.1: Esercizio 1: problema dello zaino multidimensionale"

    Consideriamo la seguente istanza dell'MDKP, con $m=2$ dimensioni, capacità $c_1=3$ e $c_2=3$, e $3$ oggetti con profitti e pesi:

    $$
    \begin{array}{l|rrr}
    \hline  & {j=1} & {j=2} & {j=3} \\
    \hline {p_j} & 9 & 8 & 6 \\
    {w_{1j}} & 2 & 1 & 2 \\
    {w_{2j}} & 2 & 2 & 1 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Eseguire l'algoritmo di PD bottom-up: per ogni oggetto $j$, scrivere le matrici $v[j][k_1][k_2]$ e $s[j][k_1][k_2]$, e mostrare il calcolo della cella $\vet{k}=\vet{c}$.

    2. Usando le tabelle $s$, ricostruire una soluzione ottima $(x_1,x_2,x_3)$ e riportare il valore ottimo.

    3. Determinare quante celle ha la tabella dell'algoritmo di PD, compresa la riga $j=0$, e quante ne avrebbe con una terza dimensione di capacità $c_3=3$.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. La riga $j=0$ è $v[0][\vet{k}]=0$ per ogni $\vet{k}$. In ogni matrice c'è una riga per ogni $k_1$ e una colonna per ogni $k_2$; in caso di pareggio l'oggetto $j$ non viene selezionato.

        Oggetto $j=1$, con $p_1=9$ e $\vet{w}_1=(2,2)$: $v[1][(3,3)]=\max\{v[0][(3,3)],\,p_1+v[0][(1,1)]\}=\max\{0,\,9+0\}=9$; $\vet{w}_1=(2,2)\not\le(0,0)$, quindi $v[1][(0,0)]=v[0][(0,0)]=0$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {9} & {9} \\
        {k_1=3} & {0} & {0} & {9} & {9} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {1} & {1} \\
        {k_1=3} & {0} & {0} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=2$, con $p_2=8$ e $\vet{w}_2=(1,2)$: $v[2][(3,3)]=\max\{v[1][(3,3)],\,p_2+v[1][(2,1)]\}=\max\{9,\,8+0\}=9$; $v[2][(1,2)]=\max\{v[1][(1,2)],\,p_2+v[1][(0,0)]\}=\max\{0,\,8+0\}=8$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {8} & {8} \\
        {k_1=2} & {0} & {0} & {9} & {9} \\
        {k_1=3} & {0} & {0} & {9} & {9} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {1} & {1} \\
        {k_1=2} & {0} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {0} & {0} & {0} \\
        \hline
        \end{array}
        $$

        Oggetto $j=3$, con $p_3=6$ e $\vet{w}_3=(2,1)$: $v[3][(3,3)]=\max\{v[2][(3,3)],\,p_3+v[2][(1,2)]\}=\max\{9,\,6+8\}=14$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {8} & {8} \\
        {k_1=2} & {0} & {6} & {9} & {9} \\
        {k_1=3} & {0} & {6} & {9} & {14} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {1} & {0} & {0} \\
        {k_1=3} & {0} & {1} & {0} & {1} \\
        \hline
        \end{array}
        $$

    2. Partendo da $j=3$ e $\vet{k}=(3,3)$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(\vet{k}\)</span></th>
        <th><span class="arithmatex">\(s[j][\vet{k}]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
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
        <td><span class="arithmatex">\(\vet{k}=(3,3)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((3,3)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(x[3]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (3,3)-(2,1)=(1,2)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((1,2)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (1,2)-(1,2)=(0,0)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,0)\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 0\)</span>, <span class="arithmatex">\(\vet{k}=(0,0)\)</span></td>
        </tr>
        </table></div>

        Il vettore $(0,1,1)$ è una soluzione ottima: i suoi pesi sono $1+2=3\le c_1$ e $2+1=3\le c_2$, e il valore ottimo è $v[3][(3,3)]=8+6=14$.

    3. La tabella ha $(n+1)(c_1+1)(c_2+1)=4\cdot4\cdot4=64$ celle. Una terza dimensione di capacità $c_3=3$ moltiplica questo numero per $c_3+1=4$, e dà $256$ celle: ogni nuova dimensione moltiplica il numero di stati.

<a id="esercizio-22-2"></a>

!!! esercizio "Esercizio 22.2: Esercizio 2: problema dello zaino multidimensionale"

    Consideriamo la seguente istanza dell'MDKP, con $m=2$ dimensioni, capacità $c_1=4$ e $c_2=3$, e $3$ oggetti con profitti e pesi:

    $$
    \begin{array}{l|rrr}
    \hline  & {j=1} & {j=2} & {j=3} \\
    \hline {p_j} & 4 & 7 & 5 \\
    {w_{1j}} & 3 & 2 & 1 \\
    {w_{2j}} & 1 & 2 & 2 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Eseguire l'algoritmo di PD bottom-up: per ogni oggetto $j$, scrivere le matrici $v[j][k_1][k_2]$ e $s[j][k_1][k_2]$, e mostrare il calcolo della cella $\vet{k}=\vet{c}$.

    2. Usando le tabelle $s$, ricostruire una soluzione ottima $(x_1,x_2,x_3)$ e riportare il valore ottimo.

    3. Determinare quante celle ha la tabella dell'algoritmo di PD, compresa la riga $j=0$, e quante ne avrebbe con una terza dimensione di capacità $c_3=3$.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. La riga $j=0$ è $v[0][\vet{k}]=0$ per ogni $\vet{k}$. In ogni matrice c'è una riga per ogni $k_1$ e una colonna per ogni $k_2$; in caso di pareggio l'oggetto $j$ non viene selezionato.

        Oggetto $j=1$, con $p_1=4$ e $\vet{w}_1=(3,1)$: $v[1][(4,3)]=\max\{v[0][(4,3)],\,p_1+v[0][(1,2)]\}=\max\{0,\,4+0\}=4$; $v[1][(3,1)]=\max\{v[0][(3,1)],\,p_1+v[0][(0,0)]\}=\max\{0,\,4+0\}=4$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {4} & {4} & {4} \\
        {k_1=4} & {0} & {4} & {4} & {4} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {1} & {1} & {1} \\
        {k_1=4} & {0} & {1} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=2$, con $p_2=7$ e $\vet{w}_2=(2,2)$: $v[2][(4,3)]=\max\{v[1][(4,3)],\,p_2+v[1][(2,1)]\}=\max\{4,\,7+0\}=7$; $\vet{w}_2=(2,2)\not\le(3,1)$, quindi $v[2][(3,1)]=v[1][(3,1)]=4$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {7} & {7} \\
        {k_1=3} & {0} & {4} & {7} & {7} \\
        {k_1=4} & {0} & {4} & {7} & {7} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {1} & {1} \\
        {k_1=3} & {0} & {0} & {1} & {1} \\
        {k_1=4} & {0} & {0} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=3$, con $p_3=5$ e $\vet{w}_3=(1,2)$: $v[3][(4,3)]=\max\{v[2][(4,3)],\,p_3+v[2][(3,1)]\}=\max\{7,\,5+4\}=9$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {5} & {5} \\
        {k_1=2} & {0} & {0} & {7} & {7} \\
        {k_1=3} & {0} & {4} & {7} & {7} \\
        {k_1=4} & {0} & {4} & {7} & {9} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {1} & {1} \\
        {k_1=2} & {0} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {0} & {0} & {0} \\
        {k_1=4} & {0} & {0} & {0} & {1} \\
        \hline
        \end{array}
        $$

    2. Partendo da $j=3$ e $\vet{k}=(4,3)$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(\vet{k}\)</span></th>
        <th><span class="arithmatex">\(s[j][\vet{k}]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
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
        <td><span class="arithmatex">\(\vet{k}=(4,3)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((4,3)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(x[3]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (4,3)-(1,2)=(3,1)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((3,1)\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 0\)</span>, <span class="arithmatex">\(\vet{k}=(3,1)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((3,1)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (3,1)-(3,1)=(0,0)\)</span></td>
        </tr>
        </table></div>

        Il vettore $(1,0,1)$ è una soluzione ottima: i suoi pesi sono $3+1=4\le c_1$ e $1+2=3\le c_2$, e il valore ottimo è $v[3][(4,3)]=4+5=9$.

    3. La tabella ha $(n+1)(c_1+1)(c_2+1)=4\cdot5\cdot4=80$ celle. Una terza dimensione di capacità $c_3=3$ moltiplica questo numero per $c_3+1=4$, e dà $320$ celle: ogni nuova dimensione moltiplica il numero di stati.

<a id="esercizio-22-3"></a>

!!! esercizio "Esercizio 22.3: Esercizio 3: problema dello zaino multidimensionale"

    Consideriamo la seguente istanza dell'MDKP, con $m=2$ dimensioni, capacità $c_1=3$ e $c_2=4$, e $3$ oggetti con profitti e pesi:

    $$
    \begin{array}{l|rrr}
    \hline  & {j=1} & {j=2} & {j=3} \\
    \hline {p_j} & 6 & 6 & 9 \\
    {w_{1j}} & 2 & 1 & 2 \\
    {w_{2j}} & 1 & 2 & 3 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Eseguire l'algoritmo di PD bottom-up: per ogni oggetto $j$, scrivere le matrici $v[j][k_1][k_2]$ e $s[j][k_1][k_2]$, e mostrare il calcolo della cella $\vet{k}=\vet{c}$.

    2. Usando le tabelle $s$, ricostruire una soluzione ottima $(x_1,x_2,x_3)$ e riportare il valore ottimo.

    3. Determinare quante celle ha la tabella dell'algoritmo di PD, compresa la riga $j=0$, e quante ne avrebbe con una terza dimensione di capacità $c_3=3$.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. La riga $j=0$ è $v[0][\vet{k}]=0$ per ogni $\vet{k}$. In ogni matrice c'è una riga per ogni $k_1$ e una colonna per ogni $k_2$; in caso di pareggio l'oggetto $j$ non viene selezionato.

        Oggetto $j=1$, con $p_1=6$ e $\vet{w}_1=(2,1)$: $v[1][(3,4)]=\max\{v[0][(3,4)],\,p_1+v[0][(1,3)]\}=\max\{0,\,6+0\}=6$; $v[1][(2,2)]=\max\{v[0][(2,2)],\,p_1+v[0][(0,1)]\}=\max\{0,\,6+0\}=6$.

        $$
        \begin{array}{l|rrrrr}
        \hline {v[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {6} & {6} & {6} & {6} \\
        {k_1=3} & {0} & {6} & {6} & {6} & {6} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrrr}
        \hline {s[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {1} & {1} & {1} & {1} \\
        {k_1=3} & {0} & {1} & {1} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=2$, con $p_2=6$ e $\vet{w}_2=(1,2)$: $v[2][(3,4)]=\max\{v[1][(3,4)],\,p_2+v[1][(2,2)]\}=\max\{6,\,6+6\}=12$.

        $$
        \begin{array}{l|rrrrr}
        \hline {v[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {6} & {6} & {6} \\
        {k_1=2} & {0} & {6} & {6} & {6} & {6} \\
        {k_1=3} & {0} & {6} & {6} & {12} & {12} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrrr}
        \hline {s[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {1} & {1} & {1} \\
        {k_1=2} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {0} & {0} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=3$, con $p_3=9$ e $\vet{w}_3=(2,3)$: $v[3][(3,4)]=\max\{v[2][(3,4)],\,p_3+v[2][(1,1)]\}=\max\{12,\,9+0\}=12$.

        $$
        \begin{array}{l|rrrrr}
        \hline {v[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {6} & {6} & {6} \\
        {k_1=2} & {0} & {6} & {6} & {9} & {9} \\
        {k_1=3} & {0} & {6} & {6} & {12} & {12} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrrr}
        \hline {s[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {0} & {1} & {1} \\
        {k_1=3} & {0} & {0} & {0} & {0} & {0} \\
        \hline
        \end{array}
        $$

    2. Partendo da $j=3$ e $\vet{k}=(3,4)$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(\vet{k}\)</span></th>
        <th><span class="arithmatex">\(s[j][\vet{k}]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
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
        <td><span class="arithmatex">\(\vet{k}=(3,4)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((3,4)\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">\(x[3]\leftarrow 0\)</span>, <span class="arithmatex">\(\vet{k}=(3,4)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((3,4)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (3,4)-(1,2)=(2,2)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((2,2)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (2,2)-(2,1)=(0,1)\)</span></td>
        </tr>
        </table></div>

        Il vettore $(1,1,0)$ è una soluzione ottima: i suoi pesi sono $2+1=3\le c_1$ e $1+2=3\le c_2$, e il valore ottimo è $v[3][(3,4)]=6+6=12$.

    3. La tabella ha $(n+1)(c_1+1)(c_2+1)=4\cdot4\cdot5=80$ celle. Una terza dimensione di capacità $c_3=3$ moltiplica questo numero per $c_3+1=4$, e dà $320$ celle: ogni nuova dimensione moltiplica il numero di stati.

<a id="esercizio-22-4"></a>

!!! esercizio "Esercizio 22.4: Esercizio 4: problema dello zaino multidimensionale"

    Consideriamo la seguente istanza dell'MDKP, con $m=2$ dimensioni, capacità $c_1=4$ e $c_2=3$, e $4$ oggetti con profitti e pesi:

    $$
    \begin{array}{l|rrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\
    \hline {p_j} & 7 & 3 & 7 & 5 \\
    {w_{1j}} & 2 & 1 & 1 & 2 \\
    {w_{2j}} & 1 & 2 & 1 & 1 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Eseguire l'algoritmo di PD bottom-up: per ogni oggetto $j$, scrivere le matrici $v[j][k_1][k_2]$ e $s[j][k_1][k_2]$, e mostrare il calcolo della cella $\vet{k}=\vet{c}$.

    2. Usando le tabelle $s$, ricostruire una soluzione ottima $(x_1,x_2,x_3,x_4)$ e riportare il valore ottimo.

    3. Determinare quante celle ha la tabella dell'algoritmo di PD, compresa la riga $j=0$, e quante ne avrebbe con una terza dimensione di capacità $c_3=3$.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. La riga $j=0$ è $v[0][\vet{k}]=0$ per ogni $\vet{k}$. In ogni matrice c'è una riga per ogni $k_1$ e una colonna per ogni $k_2$; in caso di pareggio l'oggetto $j$ non viene selezionato.

        Oggetto $j=1$, con $p_1=7$ e $\vet{w}_1=(2,1)$: $v[1][(4,3)]=\max\{v[0][(4,3)],\,p_1+v[0][(2,2)]\}=\max\{0,\,7+0\}=7$; $v[1][(3,2)]=\max\{v[0][(3,2)],\,p_1+v[0][(1,1)]\}=\max\{0,\,7+0\}=7$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {7} & {7} & {7} \\
        {k_1=3} & {0} & {7} & {7} & {7} \\
        {k_1=4} & {0} & {7} & {7} & {7} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {1} & {1} & {1} \\
        {k_1=3} & {0} & {1} & {1} & {1} \\
        {k_1=4} & {0} & {1} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=2$, con $p_2=3$ e $\vet{w}_2=(1,2)$: $v[2][(4,3)]=\max\{v[1][(4,3)],\,p_2+v[1][(3,1)]\}=\max\{7,\,3+7\}=10$; $v[2][(3,2)]=\max\{v[1][(3,2)],\,p_2+v[1][(2,0)]\}=\max\{7,\,3+0\}=7$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {3} & {3} \\
        {k_1=2} & {0} & {7} & {7} & {7} \\
        {k_1=3} & {0} & {7} & {7} & {10} \\
        {k_1=4} & {0} & {7} & {7} & {10} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {1} & {1} \\
        {k_1=2} & {0} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {0} & {0} & {1} \\
        {k_1=4} & {0} & {0} & {0} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=3$, con $p_3=7$ e $\vet{w}_3=(1,1)$: $v[3][(4,3)]=\max\{v[2][(4,3)],\,p_3+v[2][(3,2)]\}=\max\{10,\,7+7\}=14$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {7} & {7} & {7} \\
        {k_1=2} & {0} & {7} & {7} & {10} \\
        {k_1=3} & {0} & {7} & {14} & {14} \\
        {k_1=4} & {0} & {7} & {14} & {14} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {1} & {1} & {1} \\
        {k_1=2} & {0} & {0} & {0} & {1} \\
        {k_1=3} & {0} & {0} & {1} & {1} \\
        {k_1=4} & {0} & {0} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=4$, con $p_4=5$ e $\vet{w}_4=(2,1)$: $v[4][(4,3)]=\max\{v[3][(4,3)],\,p_4+v[3][(2,2)]\}=\max\{14,\,5+7\}=14$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[4][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {7} & {7} & {7} \\
        {k_1=2} & {0} & {7} & {7} & {10} \\
        {k_1=3} & {0} & {7} & {14} & {14} \\
        {k_1=4} & {0} & {7} & {14} & {14} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[4][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {0} & {0} & {0} \\
        {k_1=4} & {0} & {0} & {0} & {0} \\
        \hline
        \end{array}
        $$

    2. Partendo da $j=4$ e $\vet{k}=(4,3)$:

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
        <td><span class="arithmatex">\(\vet{k}=(4,3)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((4,3)\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">\(x[4]\leftarrow 0\)</span>, <span class="arithmatex">\(\vet{k}=(4,3)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((4,3)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[3]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (4,3)-(1,1)=(3,2)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((3,2)\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 0\)</span>, <span class="arithmatex">\(\vet{k}=(3,2)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((3,2)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (3,2)-(2,1)=(1,1)\)</span></td>
        </tr>
        </table></div>

        Il vettore $(1,0,1,0)$ è una soluzione ottima: i suoi pesi sono $2+1=3\le c_1$ e $1+1=2\le c_2$, e il valore ottimo è $v[4][(4,3)]=7+7=14$.

    3. La tabella ha $(n+1)(c_1+1)(c_2+1)=5\cdot5\cdot4=100$ celle. Una terza dimensione di capacità $c_3=3$ moltiplica questo numero per $c_3+1=4$, e dà $400$ celle: ogni nuova dimensione moltiplica il numero di stati.

<a id="esercizio-22-5"></a>

!!! esercizio "Esercizio 22.5: Esercizio 5: problema dello zaino multidimensionale"

    Consideriamo la seguente istanza dell'MDKP, con $m=2$ dimensioni, capacità $c_1=4$ e $c_2=4$, e $4$ oggetti con profitti e pesi:

    $$
    \begin{array}{l|rrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\
    \hline {p_j} & 6 & 7 & 2 & 8 \\
    {w_{1j}} & 2 & 3 & 1 & 1 \\
    {w_{2j}} & 1 & 1 & 3 & 1 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Eseguire l'algoritmo di PD bottom-up: per ogni oggetto $j$, scrivere le matrici $v[j][k_1][k_2]$ e $s[j][k_1][k_2]$, e mostrare il calcolo della cella $\vet{k}=\vet{c}$.

    2. Usando le tabelle $s$, ricostruire una soluzione ottima $(x_1,x_2,x_3,x_4)$ e riportare il valore ottimo.

    3. Determinare quante celle ha la tabella dell'algoritmo di PD, compresa la riga $j=0$, e quante ne avrebbe con una terza dimensione di capacità $c_3=3$.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. La riga $j=0$ è $v[0][\vet{k}]=0$ per ogni $\vet{k}$. In ogni matrice c'è una riga per ogni $k_1$ e una colonna per ogni $k_2$; in caso di pareggio l'oggetto $j$ non viene selezionato.

        Oggetto $j=1$, con $p_1=6$ e $\vet{w}_1=(2,1)$: $v[1][(4,4)]=\max\{v[0][(4,4)],\,p_1+v[0][(2,3)]\}=\max\{0,\,6+0\}=6$; $\vet{w}_1=(2,1)\not\le(0,2)$, quindi $v[1][(0,2)]=v[0][(0,2)]=0$.

        $$
        \begin{array}{l|rrrrr}
        \hline {v[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {6} & {6} & {6} & {6} \\
        {k_1=3} & {0} & {6} & {6} & {6} & {6} \\
        {k_1=4} & {0} & {6} & {6} & {6} & {6} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrrr}
        \hline {s[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {1} & {1} & {1} & {1} \\
        {k_1=3} & {0} & {1} & {1} & {1} & {1} \\
        {k_1=4} & {0} & {1} & {1} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=2$, con $p_2=7$ e $\vet{w}_2=(3,1)$: $v[2][(4,4)]=\max\{v[1][(4,4)],\,p_2+v[1][(1,3)]\}=\max\{6,\,7+0\}=7$; $v[2][(3,3)]=\max\{v[1][(3,3)],\,p_2+v[1][(0,2)]\}=\max\{6,\,7+0\}=7$.

        $$
        \begin{array}{l|rrrrr}
        \hline {v[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {6} & {6} & {6} & {6} \\
        {k_1=3} & {0} & {7} & {7} & {7} & {7} \\
        {k_1=4} & {0} & {7} & {7} & {7} & {7} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrrr}
        \hline {s[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {1} & {1} & {1} & {1} \\
        {k_1=4} & {0} & {1} & {1} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=3$, con $p_3=2$ e $\vet{w}_3=(1,3)$: $v[3][(4,4)]=\max\{v[2][(4,4)],\,p_3+v[2][(3,1)]\}=\max\{7,\,2+7\}=9$; $v[3][(3,3)]=\max\{v[2][(3,3)],\,p_3+v[2][(2,0)]\}=\max\{7,\,2+0\}=7$.

        $$
        \begin{array}{l|rrrrr}
        \hline {v[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {2} & {2} \\
        {k_1=2} & {0} & {6} & {6} & {6} & {6} \\
        {k_1=3} & {0} & {7} & {7} & {7} & {8} \\
        {k_1=4} & {0} & {7} & {7} & {7} & {9} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrrr}
        \hline {s[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {1} & {1} \\
        {k_1=2} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {0} & {0} & {0} & {1} \\
        {k_1=4} & {0} & {0} & {0} & {0} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=4$, con $p_4=8$ e $\vet{w}_4=(1,1)$: $v[4][(4,4)]=\max\{v[3][(4,4)],\,p_4+v[3][(3,3)]\}=\max\{9,\,8+7\}=15$.

        $$
        \begin{array}{l|rrrrr}
        \hline {v[4][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {8} & {8} & {8} & {8} \\
        {k_1=2} & {0} & {8} & {8} & {8} & {10} \\
        {k_1=3} & {0} & {8} & {14} & {14} & {14} \\
        {k_1=4} & {0} & {8} & {15} & {15} & {15} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrrr}
        \hline {s[4][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} & {k_2=4} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {1} & {1} & {1} & {1} \\
        {k_1=2} & {0} & {1} & {1} & {1} & {1} \\
        {k_1=3} & {0} & {1} & {1} & {1} & {1} \\
        {k_1=4} & {0} & {1} & {1} & {1} & {1} \\
        \hline
        \end{array}
        $$

    2. Partendo da $j=4$ e $\vet{k}=(4,4)$:

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
        <td><span class="arithmatex">\(\vet{k}=(4,4)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((4,4)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(x[4]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (4,4)-(1,1)=(3,3)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((3,3)\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[3]\leftarrow 0\)</span>, <span class="arithmatex">\(\vet{k}=(3,3)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((3,3)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (3,3)-(3,1)=(0,2)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,2)\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td>0</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 0\)</span>, <span class="arithmatex">\(\vet{k}=(0,2)\)</span></td>
        </tr>
        </table></div>

        Il vettore $(0,1,0,1)$ è una soluzione ottima: i suoi pesi sono $3+1=4\le c_1$ e $1+1=2\le c_2$, e il valore ottimo è $v[4][(4,4)]=7+8=15$.

    3. La tabella ha $(n+1)(c_1+1)(c_2+1)=5\cdot5\cdot5=125$ celle. Una terza dimensione di capacità $c_3=3$ moltiplica questo numero per $c_3+1=4$, e dà $500$ celle: ogni nuova dimensione moltiplica il numero di stati.
