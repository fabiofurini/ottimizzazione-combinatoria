---
title: "Esercizi · PD per il problema degli zaini multipli"
---

# Esercizi · PD per il problema degli zaini multipli

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 24** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 24: Zaini multipli (MKP)](../programmazione-dinamica/dp-multiple-knapsack.md) · [:material-file-pdf-box: Eserciziario, volume 3 (PDF)](../pdf/esercizi-3-programmazione-dinamica.pdf)

</div>

!!! formula "Ricorrenza usata in questi esercizi"

    L'algoritmo di PD del capitolo [«PD per il problema degli zaini multipli»](../programmazione-dinamica/dp-multiple-knapsack.md), con $m$ zaini, il vettore $\vet{k}=(k_1,\dots,k_m)$ delle loro capacità residue e i vettori unitari $\vet{e}_i$:

    $$
    v(j,\vet{k})= \left\{ \begin{array}{ll}
    0 & \textrm{se $j=0$,}\\[2ex]
    v(j-1,\vet{k}) & \begin{array}[t]{@{}l@{}}\textrm{se $j\ge 1$ e}\\ \textrm{$w_j>k_i$ per ogni $i$,}\end{array}\\[4ex]
    \begin{array}[t]{@{}l@{}}\displaystyle \max \big\{ v(j-1,\vet{k}),\\ \quad p_j+\displaystyle\max_{i:\,w_j\le k_i} v(j-1,\vet{k}-w_j\vet{e}_i) \big\}\end{array} & \begin{array}[t]{@{}l@{}}\textrm{se $j\ge 1$ e}\\ \textrm{$w_j\le k_i$ per qualche $i$.}\end{array}
    \end{array} \right.
    $$

    Il valore ottimo è $v(n,\vet{c})$. Le tabelle $s$ memorizzano $s[j][\vet{k}]=i$ se l'oggetto $j$ è inserito nello zaino $i$, e $0$ se è escluso; una soluzione ottima si ricostruisce da $j=n$ e $\vet{k}=\vet{c}$ con $a_j\leftarrow s[j][\vet{k}]$ e, se $a_j=i\ge 1$, $\vet{k}\leftarrow\vet{k}-w_j\vet{e}_i$.

<a id="esercizio-24-1"></a>

!!! esercizio "Esercizio 24.1: Esercizio 1: problema degli zaini multipli"

    Consideriamo la seguente istanza dell'MKP, con $m=2$ zaini di capacità $c_1=3$ e $c_2=2$, e $3$ oggetti con profitti e pesi:

    $$
    \begin{array}{l|rrr}
    \hline  & {j=1} & {j=2} & {j=3} \\
    \hline {p_j} & 8 & 7 & 6 \\
    {w_j} & 2 & 3 & 3 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Eseguire l'algoritmo di PD bottom-up: per ogni oggetto $j$, scrivere le matrici $v[j][k_1][k_2]$ e $s[j][k_1][k_2]$, e mostrare il calcolo della cella $\vet{k}=\vet{c}$.

    2. Usando le tabelle $s$, ricostruire una soluzione ottima come vettore $(a_1,a_2,a_3)$ degli zaini, e riportare il valore ottimo.

    3. Risolvere per enumerazione il KP con gli stessi oggetti e capacità $c_1+c_2=5$, e confrontarne il valore ottimo con il valore ottimo dell'MKP.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. La riga $j=0$ è $v[0][\vet{k}]=0$ per ogni $\vet{k}$. In ogni matrice c'è una riga per ogni $k_1$ e una colonna per ogni $k_2$; in $s$, $0$ indica che l'oggetto $j$ è escluso, e $1$ o $2$ lo zaino in cui è inserito. In caso di pareggio si conserva la prima opzione: oggetto $j$ escluso, poi zaino $1$.

        Oggetto $j=1$, con $p_1=8$ e $w_1=2$: $v[1][(3,2)]=\max\{v[0][(3,2)],\,p_1+v[0][(1,2)],\,p_1+v[0][(3,0)]\}=\max\{0,\,8+0,\,8+0\}=8$; $v[1][(0,2)]=\max\{v[0][(0,2)],\,p_1+v[0][(0,0)]\}=\max\{0,\,8+0\}=8$.

        $$
        \begin{array}{l|rrr}
        \hline {v[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} \\
        \hline {k_1=0} & {0} & {0} & {8} \\
        {k_1=1} & {0} & {0} & {8} \\
        {k_1=2} & {8} & {8} & {8} \\
        {k_1=3} & {8} & {8} & {8} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrr}
        \hline {s[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} \\
        \hline {k_1=0} & {0} & {0} & {2} \\
        {k_1=1} & {0} & {0} & {2} \\
        {k_1=2} & {1} & {1} & {1} \\
        {k_1=3} & {1} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=2$, con $p_2=7$ e $w_2=3$: $v[2][(3,2)]=\max\{v[1][(3,2)],\,p_2+v[1][(0,2)]\}=\max\{8,\,7+8\}=15$.

        $$
        \begin{array}{l|rrr}
        \hline {v[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} \\
        \hline {k_1=0} & {0} & {0} & {8} \\
        {k_1=1} & {0} & {0} & {8} \\
        {k_1=2} & {8} & {8} & {8} \\
        {k_1=3} & {8} & {8} & {15} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrr}
        \hline {s[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} \\
        \hline {k_1=0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {0} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=3$, con $p_3=6$ e $w_3=3$: $v[3][(3,2)]=\max\{v[2][(3,2)],\,p_3+v[2][(0,2)]\}=\max\{15,\,6+8\}=15$.

        $$
        \begin{array}{l|rrr}
        \hline {v[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} \\
        \hline {k_1=0} & {0} & {0} & {8} \\
        {k_1=1} & {0} & {0} & {8} \\
        {k_1=2} & {8} & {8} & {8} \\
        {k_1=3} & {8} & {8} & {15} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrr}
        \hline {s[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} \\
        \hline {k_1=0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {0} & {0} \\
        \hline
        \end{array}
        $$

    2. Partendo da $j=3$ e $\vet{k}=(3,2)$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(\vet{k}\)</span></th>
        <th><span class="arithmatex">\(s[j][\vet{k}]\)</span></th>
        <th><span class="arithmatex">\(a[1]\)</span></th>
        <th><span class="arithmatex">\(a[2]\)</span></th>
        <th><span class="arithmatex">\(a[3]\)</span></th>
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
        <td><span class="arithmatex">\(\vet{k}=(3,2)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((3,2)\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">\(a[3]\leftarrow 0\)</span>, <span class="arithmatex">\(\vet{k}=(3,2)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((3,2)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td><span class="arithmatex">\(a[2]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (0,2)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,2)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu">2</td>
        <td>1</td>
        <td>0</td>
        <td><span class="arithmatex">\(a[1]\leftarrow 2\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (0,0)\)</span></td>
        </tr>
        </table></div>

        Il vettore $(2,1,0)$ è una soluzione ottima: lo zaino $1$ contiene gli oggetti $\{2\}$, di peso totale $3\le c_1$, e lo zaino $2$ gli oggetti $\{1\}$, di peso totale $2\le c_2$. Il valore ottimo è $v[3][(3,2)]=7+8=15$.

    3. Il KP con capacità $5$ ha valore ottimo $15$, uguale al valore ottimo dell'MKP: qui l'upper bound dato dalla capacità totale è stretto.

<a id="esercizio-24-2"></a>

!!! esercizio "Esercizio 24.2: Esercizio 2: problema degli zaini multipli"

    Consideriamo la seguente istanza dell'MKP, con $m=2$ zaini di capacità $c_1=4$ e $c_2=3$, e $3$ oggetti con profitti e pesi:

    $$
    \begin{array}{l|rrr}
    \hline  & {j=1} & {j=2} & {j=3} \\
    \hline {p_j} & 7 & 3 & 8 \\
    {w_j} & 4 & 3 & 3 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Eseguire l'algoritmo di PD bottom-up: per ogni oggetto $j$, scrivere le matrici $v[j][k_1][k_2]$ e $s[j][k_1][k_2]$, e mostrare il calcolo della cella $\vet{k}=\vet{c}$.

    2. Usando le tabelle $s$, ricostruire una soluzione ottima come vettore $(a_1,a_2,a_3)$ degli zaini, e riportare il valore ottimo.

    3. Risolvere per enumerazione il KP con gli stessi oggetti e capacità $c_1+c_2=7$, e confrontarne il valore ottimo con il valore ottimo dell'MKP.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. La riga $j=0$ è $v[0][\vet{k}]=0$ per ogni $\vet{k}$. In ogni matrice c'è una riga per ogni $k_1$ e una colonna per ogni $k_2$; in $s$, $0$ indica che l'oggetto $j$ è escluso, e $1$ o $2$ lo zaino in cui è inserito. In caso di pareggio si conserva la prima opzione: oggetto $j$ escluso, poi zaino $1$.

        Oggetto $j=1$, con $p_1=7$ e $w_1=4$: $v[1][(4,3)]=\max\{v[0][(4,3)],\,p_1+v[0][(0,3)]\}=\max\{0,\,7+0\}=7$; $v[1][(4,0)]=\max\{v[0][(4,0)],\,p_1+v[0][(0,0)]\}=\max\{0,\,7+0\}=7$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {0} & {0} & {0} \\
        {k_1=4} & {7} & {7} & {7} & {7} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {0} & {0} & {0} \\
        {k_1=4} & {1} & {1} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=2$, con $p_2=3$ e $w_2=3$: $v[2][(4,3)]=\max\{v[1][(4,3)],\,p_2+v[1][(1,3)],\,p_2+v[1][(4,0)]\}=\max\{7,\,3+0,\,3+7\}=10$; $v[2][(4,0)]=\max\{v[1][(4,0)],\,p_2+v[1][(1,0)]\}=\max\{7,\,3+0\}=7$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {3} \\
        {k_1=1} & {0} & {0} & {0} & {3} \\
        {k_1=2} & {0} & {0} & {0} & {3} \\
        {k_1=3} & {3} & {3} & {3} & {3} \\
        {k_1=4} & {7} & {7} & {7} & {10} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {2} \\
        {k_1=1} & {0} & {0} & {0} & {2} \\
        {k_1=2} & {0} & {0} & {0} & {2} \\
        {k_1=3} & {1} & {1} & {1} & {1} \\
        {k_1=4} & {0} & {0} & {0} & {2} \\
        \hline
        \end{array}
        $$

        Oggetto $j=3$, con $p_3=8$ e $w_3=3$: $v[3][(4,3)]=\max\{v[2][(4,3)],\,p_3+v[2][(1,3)],\,p_3+v[2][(4,0)]\}=\max\{10,\,8+3,\,8+7\}=15$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {8} \\
        {k_1=1} & {0} & {0} & {0} & {8} \\
        {k_1=2} & {0} & {0} & {0} & {8} \\
        {k_1=3} & {8} & {8} & {8} & {11} \\
        {k_1=4} & {8} & {8} & {8} & {15} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {2} \\
        {k_1=1} & {0} & {0} & {0} & {2} \\
        {k_1=2} & {0} & {0} & {0} & {2} \\
        {k_1=3} & {1} & {1} & {1} & {1} \\
        {k_1=4} & {1} & {1} & {1} & {2} \\
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
        <th><span class="arithmatex">\(a[1]\)</span></th>
        <th><span class="arithmatex">\(a[2]\)</span></th>
        <th><span class="arithmatex">\(a[3]\)</span></th>
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
        <td><span class="arithmatex">\(2\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">\(a[3]\leftarrow 2\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (4,0)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((4,0)\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>2</td>
        <td><span class="arithmatex">\(a[2]\leftarrow 0\)</span>, <span class="arithmatex">\(\vet{k}=(4,0)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((4,0)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>2</td>
        <td><span class="arithmatex">\(a[1]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (0,0)\)</span></td>
        </tr>
        </table></div>

        Il vettore $(1,0,2)$ è una soluzione ottima: lo zaino $1$ contiene gli oggetti $\{1\}$, di peso totale $4\le c_1$, e lo zaino $2$ gli oggetti $\{3\}$, di peso totale $3\le c_2$. Il valore ottimo è $v[3][(4,3)]=7+8=15$.

    3. Il KP con capacità $7$ ha valore ottimo $15$, uguale al valore ottimo dell'MKP: qui l'upper bound dato dalla capacità totale è stretto.

<a id="esercizio-24-3"></a>

!!! esercizio "Esercizio 24.3: Esercizio 3: problema degli zaini multipli"

    Consideriamo la seguente istanza dell'MKP, con $m=2$ zaini di capacità $c_1=5$ e $c_2=2$, e $3$ oggetti con profitti e pesi:

    $$
    \begin{array}{l|rrr}
    \hline  & {j=1} & {j=2} & {j=3} \\
    \hline {p_j} & 2 & 5 & 9 \\
    {w_j} & 2 & 3 & 4 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Eseguire l'algoritmo di PD bottom-up: per ogni oggetto $j$, scrivere le matrici $v[j][k_1][k_2]$ e $s[j][k_1][k_2]$, e mostrare il calcolo della cella $\vet{k}=\vet{c}$.

    2. Usando le tabelle $s$, ricostruire una soluzione ottima come vettore $(a_1,a_2,a_3)$ degli zaini, e riportare il valore ottimo.

    3. Risolvere per enumerazione il KP con gli stessi oggetti e capacità $c_1+c_2=7$, e confrontarne il valore ottimo con il valore ottimo dell'MKP.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. La riga $j=0$ è $v[0][\vet{k}]=0$ per ogni $\vet{k}$. In ogni matrice c'è una riga per ogni $k_1$ e una colonna per ogni $k_2$; in $s$, $0$ indica che l'oggetto $j$ è escluso, e $1$ o $2$ lo zaino in cui è inserito. In caso di pareggio si conserva la prima opzione: oggetto $j$ escluso, poi zaino $1$.

        Oggetto $j=1$, con $p_1=2$ e $w_1=2$: $v[1][(5,2)]=\max\{v[0][(5,2)],\,p_1+v[0][(3,2)],\,p_1+v[0][(5,0)]\}=\max\{0,\,2+0,\,2+0\}=2$; $v[1][(1,2)]=\max\{v[0][(1,2)],\,p_1+v[0][(1,0)]\}=\max\{0,\,2+0\}=2$.

        $$
        \begin{array}{l|rrr}
        \hline {v[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} \\
        \hline {k_1=0} & {0} & {0} & {2} \\
        {k_1=1} & {0} & {0} & {2} \\
        {k_1=2} & {2} & {2} & {2} \\
        {k_1=3} & {2} & {2} & {2} \\
        {k_1=4} & {2} & {2} & {2} \\
        {k_1=5} & {2} & {2} & {2} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrr}
        \hline {s[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} \\
        \hline {k_1=0} & {0} & {0} & {2} \\
        {k_1=1} & {0} & {0} & {2} \\
        {k_1=2} & {1} & {1} & {1} \\
        {k_1=3} & {1} & {1} & {1} \\
        {k_1=4} & {1} & {1} & {1} \\
        {k_1=5} & {1} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=2$, con $p_2=5$ e $w_2=3$: $v[2][(5,2)]=\max\{v[1][(5,2)],\,p_2+v[1][(2,2)]\}=\max\{2,\,5+2\}=7$; $w_2=3$ non entra in alcuno zaino, quindi $v[2][(1,2)]=v[1][(1,2)]=2$.

        $$
        \begin{array}{l|rrr}
        \hline {v[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} \\
        \hline {k_1=0} & {0} & {0} & {2} \\
        {k_1=1} & {0} & {0} & {2} \\
        {k_1=2} & {2} & {2} & {2} \\
        {k_1=3} & {5} & {5} & {7} \\
        {k_1=4} & {5} & {5} & {7} \\
        {k_1=5} & {7} & {7} & {7} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrr}
        \hline {s[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} \\
        \hline {k_1=0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {0} \\
        {k_1=3} & {1} & {1} & {1} \\
        {k_1=4} & {1} & {1} & {1} \\
        {k_1=5} & {1} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=3$, con $p_3=9$ e $w_3=4$: $v[3][(5,2)]=\max\{v[2][(5,2)],\,p_3+v[2][(1,2)]\}=\max\{7,\,9+2\}=11$.

        $$
        \begin{array}{l|rrr}
        \hline {v[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} \\
        \hline {k_1=0} & {0} & {0} & {2} \\
        {k_1=1} & {0} & {0} & {2} \\
        {k_1=2} & {2} & {2} & {2} \\
        {k_1=3} & {5} & {5} & {7} \\
        {k_1=4} & {9} & {9} & {11} \\
        {k_1=5} & {9} & {9} & {11} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrr}
        \hline {s[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} \\
        \hline {k_1=0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {0} & {0} \\
        {k_1=4} & {1} & {1} & {1} \\
        {k_1=5} & {1} & {1} & {1} \\
        \hline
        \end{array}
        $$

    2. Partendo da $j=3$ e $\vet{k}=(5,2)$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(\vet{k}\)</span></th>
        <th><span class="arithmatex">\(s[j][\vet{k}]\)</span></th>
        <th><span class="arithmatex">\(a[1]\)</span></th>
        <th><span class="arithmatex">\(a[2]\)</span></th>
        <th><span class="arithmatex">\(a[3]\)</span></th>
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
        <td><span class="arithmatex">\(\vet{k}=(5,2)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((5,2)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(a[3]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (1,2)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((1,2)\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td><span class="arithmatex">\(a[2]\leftarrow 0\)</span>, <span class="arithmatex">\(\vet{k}=(1,2)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((1,2)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu">2</td>
        <td>0</td>
        <td>1</td>
        <td><span class="arithmatex">\(a[1]\leftarrow 2\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (1,0)\)</span></td>
        </tr>
        </table></div>

        Il vettore $(2,0,1)$ è una soluzione ottima: lo zaino $1$ contiene gli oggetti $\{3\}$, di peso totale $4\le c_1$, e lo zaino $2$ gli oggetti $\{1\}$, di peso totale $2\le c_2$. Il valore ottimo è $v[3][(5,2)]=9+2=11$.

    3. Il KP con capacità $7$ ha valore ottimo $14>11$, con gli oggetti $\{2,3\}$ di peso totale $7\le 7$. Questi oggetti non si possono dividere fra i due zaini di capacità $5$ e $2$: il KP con la capacità totale dà solo un upper bound sul valore ottimo dell'MKP.

<a id="esercizio-24-4"></a>

!!! esercizio "Esercizio 24.4: Esercizio 4: problema degli zaini multipli"

    Consideriamo la seguente istanza dell'MKP, con $m=2$ zaini di capacità $c_1=4$ e $c_2=3$, e $4$ oggetti con profitti e pesi:

    $$
    \begin{array}{l|rrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\
    \hline {p_j} & 5 & 2 & 6 & 6 \\
    {w_j} & 2 & 1 & 2 & 4 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Eseguire l'algoritmo di PD bottom-up: per ogni oggetto $j$, scrivere le matrici $v[j][k_1][k_2]$ e $s[j][k_1][k_2]$, e mostrare il calcolo della cella $\vet{k}=\vet{c}$.

    2. Usando le tabelle $s$, ricostruire una soluzione ottima come vettore $(a_1,a_2,a_3,a_4)$ degli zaini, e riportare il valore ottimo.

    3. Risolvere per enumerazione il KP con gli stessi oggetti e capacità $c_1+c_2=7$, e confrontarne il valore ottimo con il valore ottimo dell'MKP.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. La riga $j=0$ è $v[0][\vet{k}]=0$ per ogni $\vet{k}$. In ogni matrice c'è una riga per ogni $k_1$ e una colonna per ogni $k_2$; in $s$, $0$ indica che l'oggetto $j$ è escluso, e $1$ o $2$ lo zaino in cui è inserito. In caso di pareggio si conserva la prima opzione: oggetto $j$ escluso, poi zaino $1$.

        Oggetto $j=1$, con $p_1=5$ e $w_1=2$: $v[1][(4,3)]=\max\{v[0][(4,3)],\,p_1+v[0][(2,3)],\,p_1+v[0][(4,1)]\}=\max\{0,\,5+0,\,5+0\}=5$; $w_1=2$ non entra in alcuno zaino, quindi $v[1][(0,0)]=v[0][(0,0)]=0$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {5} & {5} \\
        {k_1=1} & {0} & {0} & {5} & {5} \\
        {k_1=2} & {5} & {5} & {5} & {5} \\
        {k_1=3} & {5} & {5} & {5} & {5} \\
        {k_1=4} & {5} & {5} & {5} & {5} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {2} & {2} \\
        {k_1=1} & {0} & {0} & {2} & {2} \\
        {k_1=2} & {1} & {1} & {1} & {1} \\
        {k_1=3} & {1} & {1} & {1} & {1} \\
        {k_1=4} & {1} & {1} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=2$, con $p_2=2$ e $w_2=1$: $v[2][(4,3)]=\max\{v[1][(4,3)],\,p_2+v[1][(3,3)],\,p_2+v[1][(4,2)]\}=\max\{5,\,2+5,\,2+5\}=7$; $v[2][(0,1)]=\max\{v[1][(0,1)],\,p_2+v[1][(0,0)]\}=\max\{0,\,2+0\}=2$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {2} & {5} & {7} \\
        {k_1=1} & {2} & {2} & {7} & {7} \\
        {k_1=2} & {5} & {7} & {7} & {7} \\
        {k_1=3} & {7} & {7} & {7} & {7} \\
        {k_1=4} & {7} & {7} & {7} & {7} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {2} & {0} & {2} \\
        {k_1=1} & {1} & {1} & {1} & {1} \\
        {k_1=2} & {0} & {2} & {1} & {1} \\
        {k_1=3} & {1} & {1} & {1} & {1} \\
        {k_1=4} & {1} & {1} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=3$, con $p_3=6$ e $w_3=2$: $v[3][(4,3)]=\max\{v[2][(4,3)],\,p_3+v[2][(2,3)],\,p_3+v[2][(4,1)]\}=\max\{7,\,6+7,\,6+7\}=13$; $v[3][(0,3)]=\max\{v[2][(0,3)],\,p_3+v[2][(0,1)]\}=\max\{7,\,6+2\}=8$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {2} & {6} & {8} \\
        {k_1=1} & {2} & {2} & {8} & {8} \\
        {k_1=2} & {6} & {8} & {11} & {13} \\
        {k_1=3} & {8} & {8} & {13} & {13} \\
        {k_1=4} & {11} & {13} & {13} & {13} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {2} & {2} \\
        {k_1=1} & {0} & {0} & {2} & {2} \\
        {k_1=2} & {1} & {1} & {1} & {1} \\
        {k_1=3} & {1} & {1} & {1} & {1} \\
        {k_1=4} & {1} & {1} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=4$, con $p_4=6$ e $w_4=4$: $v[4][(4,3)]=\max\{v[3][(4,3)],\,p_4+v[3][(0,3)]\}=\max\{13,\,6+8\}=14$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[4][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {2} & {6} & {8} \\
        {k_1=1} & {2} & {2} & {8} & {8} \\
        {k_1=2} & {6} & {8} & {11} & {13} \\
        {k_1=3} & {8} & {8} & {13} & {13} \\
        {k_1=4} & {11} & {13} & {13} & {14} \\
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
        {k_1=4} & {0} & {0} & {0} & {1} \\
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
        <td><span class="arithmatex">\(\vet{k}=(4,3)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((4,3)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(a[4]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (0,3)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((0,3)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">2</td>
        <td>1</td>
        <td><span class="arithmatex">\(a[3]\leftarrow 2\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (0,1)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((0,1)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>0</td>
        <td class="cella-blu">2</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(a[2]\leftarrow 2\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (0,0)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,0)\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td class="cella-blu">0</td>
        <td>2</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(a[1]\leftarrow 0\)</span>, <span class="arithmatex">\(\vet{k}=(0,0)\)</span></td>
        </tr>
        </table></div>

        Il vettore $(0,2,2,1)$ è una soluzione ottima: lo zaino $1$ contiene gli oggetti $\{4\}$, di peso totale $4\le c_1$, e lo zaino $2$ gli oggetti $\{2,3\}$, di peso totale $1+2=3\le c_2$. Il valore ottimo è $v[4][(4,3)]=6+2+6=14$.

    3. Il KP con capacità $7$ ha valore ottimo $14$, uguale al valore ottimo dell'MKP: qui l'upper bound dato dalla capacità totale è stretto.

<a id="esercizio-24-5"></a>

!!! esercizio "Esercizio 24.5: Esercizio 5: problema degli zaini multipli"

    Consideriamo la seguente istanza dell'MKP, con $m=2$ zaini di capacità $c_1=5$ e $c_2=3$, e $4$ oggetti con profitti e pesi:

    $$
    \begin{array}{l|rrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\
    \hline {p_j} & 5 & 3 & 7 & 2 \\
    {w_j} & 4 & 4 & 2 & 2 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Eseguire l'algoritmo di PD bottom-up: per ogni oggetto $j$, scrivere le matrici $v[j][k_1][k_2]$ e $s[j][k_1][k_2]$, e mostrare il calcolo della cella $\vet{k}=\vet{c}$.

    2. Usando le tabelle $s$, ricostruire una soluzione ottima come vettore $(a_1,a_2,a_3,a_4)$ degli zaini, e riportare il valore ottimo.

    3. Risolvere per enumerazione il KP con gli stessi oggetti e capacità $c_1+c_2=8$, e confrontarne il valore ottimo con il valore ottimo dell'MKP.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. La riga $j=0$ è $v[0][\vet{k}]=0$ per ogni $\vet{k}$. In ogni matrice c'è una riga per ogni $k_1$ e una colonna per ogni $k_2$; in $s$, $0$ indica che l'oggetto $j$ è escluso, e $1$ o $2$ lo zaino in cui è inserito. In caso di pareggio si conserva la prima opzione: oggetto $j$ escluso, poi zaino $1$.

        Oggetto $j=1$, con $p_1=5$ e $w_1=4$: $v[1][(5,3)]=\max\{v[0][(5,3)],\,p_1+v[0][(1,3)]\}=\max\{0,\,5+0\}=5$; $v[1][(5,1)]=\max\{v[0][(5,1)],\,p_1+v[0][(1,1)]\}=\max\{0,\,5+0\}=5$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {0} & {0} & {0} \\
        {k_1=4} & {5} & {5} & {5} & {5} \\
        {k_1=5} & {5} & {5} & {5} & {5} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[1][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {0} & {0} & {0} \\
        {k_1=4} & {1} & {1} & {1} & {1} \\
        {k_1=5} & {1} & {1} & {1} & {1} \\
        \hline
        \end{array}
        $$

        Oggetto $j=2$, con $p_2=3$ e $w_2=4$: $v[2][(5,3)]=\max\{v[1][(5,3)],\,p_2+v[1][(1,3)]\}=\max\{5,\,3+0\}=5$; $v[2][(5,1)]=\max\{v[1][(5,1)],\,p_2+v[1][(1,1)]\}=\max\{5,\,3+0\}=5$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {0} & {0} & {0} \\
        {k_1=4} & {5} & {5} & {5} & {5} \\
        {k_1=5} & {5} & {5} & {5} & {5} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[2][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {0} & {0} \\
        {k_1=3} & {0} & {0} & {0} & {0} \\
        {k_1=4} & {0} & {0} & {0} & {0} \\
        {k_1=5} & {0} & {0} & {0} & {0} \\
        \hline
        \end{array}
        $$

        Oggetto $j=3$, con $p_3=7$ e $w_3=2$: $v[3][(5,3)]=\max\{v[2][(5,3)],\,p_3+v[2][(3,3)],\,p_3+v[2][(5,1)]\}=\max\{5,\,7+0,\,7+5\}=12$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {7} & {7} \\
        {k_1=1} & {0} & {0} & {7} & {7} \\
        {k_1=2} & {7} & {7} & {7} & {7} \\
        {k_1=3} & {7} & {7} & {7} & {7} \\
        {k_1=4} & {7} & {7} & {12} & {12} \\
        {k_1=5} & {7} & {7} & {12} & {12} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[3][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {2} & {2} \\
        {k_1=1} & {0} & {0} & {2} & {2} \\
        {k_1=2} & {1} & {1} & {1} & {1} \\
        {k_1=3} & {1} & {1} & {1} & {1} \\
        {k_1=4} & {1} & {1} & {2} & {2} \\
        {k_1=5} & {1} & {1} & {2} & {2} \\
        \hline
        \end{array}
        $$

        Oggetto $j=4$, con $p_4=2$ e $w_4=2$: $v[4][(5,3)]=\max\{v[3][(5,3)],\,p_4+v[3][(3,3)],\,p_4+v[3][(5,1)]\}=\max\{12,\,2+7,\,2+7\}=12$.

        $$
        \begin{array}{l|rrrr}
        \hline {v[4][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {7} & {7} \\
        {k_1=1} & {0} & {0} & {7} & {7} \\
        {k_1=2} & {7} & {7} & {9} & {9} \\
        {k_1=3} & {7} & {7} & {9} & {9} \\
        {k_1=4} & {9} & {9} & {12} & {12} \\
        {k_1=5} & {9} & {9} & {12} & {12} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrr}
        \hline {s[4][k_1][k_2]} & {k_2=0} & {k_2=1} & {k_2=2} & {k_2=3} \\
        \hline {k_1=0} & {0} & {0} & {0} & {0} \\
        {k_1=1} & {0} & {0} & {0} & {0} \\
        {k_1=2} & {0} & {0} & {1} & {1} \\
        {k_1=3} & {0} & {0} & {1} & {1} \\
        {k_1=4} & {1} & {1} & {0} & {0} \\
        {k_1=5} & {1} & {1} & {0} & {0} \\
        \hline
        \end{array}
        $$

    2. Partendo da $j=4$ e $\vet{k}=(5,3)$:

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
        <td><span class="arithmatex">\(\vet{k}=(5,3)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((5,3)\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">\(a[4]\leftarrow 0\)</span>, <span class="arithmatex">\(\vet{k}=(5,3)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((5,3)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">2</td>
        <td>0</td>
        <td><span class="arithmatex">\(a[3]\leftarrow 2\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (5,1)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((5,1)\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>2</td>
        <td>0</td>
        <td><span class="arithmatex">\(a[2]\leftarrow 0\)</span>, <span class="arithmatex">\(\vet{k}=(5,1)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((5,1)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>2</td>
        <td>0</td>
        <td><span class="arithmatex">\(a[1]\leftarrow 1\)</span>, <span class="arithmatex">\(\vet{k}\leftarrow (1,1)\)</span></td>
        </tr>
        </table></div>

        Il vettore $(1,0,2,0)$ è una soluzione ottima: lo zaino $1$ contiene gli oggetti $\{1\}$, di peso totale $4\le c_1$, e lo zaino $2$ gli oggetti $\{3\}$, di peso totale $2\le c_2$. Il valore ottimo è $v[4][(5,3)]=5+7=12$.

    3. Il KP con capacità $8$ ha valore ottimo $14>12$, con gli oggetti $\{1,3,4\}$ di peso totale $8\le 8$. Questi oggetti non si possono dividere fra i due zaini di capacità $5$ e $3$: il KP con la capacità totale dà solo un upper bound sul valore ottimo dell'MKP.
