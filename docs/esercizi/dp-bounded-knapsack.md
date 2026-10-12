---
title: "Esercizi · PD per il problema dello zaino limitato"
---

# Esercizi · PD per il problema dello zaino limitato

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 19** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 19: Zaino limitato (BKP)](../programmazione-dinamica/dp-bounded-knapsack.md) · [:material-file-pdf-box: Eserciziario, volume 3 (PDF)](../pdf/esercizi-3-programmazione-dinamica.pdf)

</div>

<a id="esercizio-19-1"></a>

!!! esercizio "Esercizio 19.1: Esercizio 1: problema dello zaino limitato"

    Consideriamo la seguente istanza del BKP, in cui lo zaino ha capacità $c=6$ e i profitti, i pesi e i limiti associati ai tipi di oggetto sono:

    $$
    \begin{array}{l|rr}
    \hline  & {j=1} & {j=2} \\
    \hline {p_j} & 4 & 5 \\
    {w_j} & 2 & 3 \\
    {b_j} & 2 & 1 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni iterazione, i valori delle matrici $v$ e $s$.

    2. Usando la matrice $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2)$ e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $j$ e $k$, le celle $v[j][k]$ e $s[j][k]$ e l'operazione eseguita.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(v[j][k]\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][0]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][1]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][2]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][3]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>4</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][4]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>5</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][5]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>6</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][6]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[0][0]\}=0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[0][1]\}=0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[0][2],\,p[1]{+}v[0][0]\}=\max\{0,4\}=4\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[0][3],\,p[1]{+}v[0][1]\}=\max\{0,4\}=4\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td>8</td>
        <td>2</td>
        <td><span class="arithmatex">\(\max\{v[0][4],\,p[1]{+}v[0][2],\,2p[1]{+}v[0][0]\}=\max\{0,4,8\}=8\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td>8</td>
        <td>2</td>
        <td><span class="arithmatex">\(\max\{v[0][5],\,p[1]{+}v[0][3],\,2p[1]{+}v[0][1]\}=\max\{0,4,8\}=8\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>6</td>
        <td>8</td>
        <td>2</td>
        <td><span class="arithmatex">\(\max\{v[0][6],\,p[1]{+}v[0][4],\,2p[1]{+}v[0][2]\}=\max\{0,4,8\}=8\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][0]\}=0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][1]\}=0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>4</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][2]\}=4\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[1][3],\,p[2]{+}v[1][0]\}=\max\{4,5\}=5\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>8</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][4],\,p[2]{+}v[1][1]\}=\max\{8,5\}=8\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[1][5],\,p[2]{+}v[1][2]\}=\max\{8,9\}=9\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>6</td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[1][6],\,p[2]{+}v[1][3]\}=\max\{8,9\}=9\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrr}
        \hline {v[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 4 & 4 & 8 & 8 & 8 \\
        {j=2} & 0 & 0 & 4 & 5 & 8 & 9 & 9 \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 1 & 1 & 2 & 2 & 2 \\
        {j=2} & 0 & 0 & 0 & 1 & 0 & 1 & 1 \\
        \hline
        \end{array}
        $$

    2. Abbiamo la seguente matrice $s$:

        $$
        \begin{array}{l|rrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 1 & 1 & 2 & 2 & 2 \\
        {j=2} & 0 & 0 & 0 & 1 & 0 & 1 & 1 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima partendo da $j=2$ e $k=6$ come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=6\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>6</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 6-1\cdot3=3\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td>3</td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 3-1\cdot2=1\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (1,1)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[2][6]=9.
        $$

<a id="esercizio-19-2"></a>

!!! esercizio "Esercizio 19.2: Esercizio 2: problema dello zaino limitato"

    Consideriamo la seguente istanza del BKP, in cui lo zaino ha capacità $c=7$ e i profitti, i pesi e i limiti associati ai tipi di oggetto sono:

    $$
    \begin{array}{l|rr}
    \hline  & {j=1} & {j=2} \\
    \hline {p_j} & 3 & 8 \\
    {w_j} & 1 & 4 \\
    {b_j} & 3 & 1 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni iterazione, i valori delle matrici $v$ e $s$.

    2. Usando la matrice $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2)$ e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $j$ e $k$, le celle $v[j][k]$ e $s[j][k]$ e l'operazione eseguita.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(v[j][k]\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][0]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][1]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][2]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][3]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>4</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][4]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>5</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][5]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>6</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][6]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>7</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][7]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][7]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[0][0]\}=0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[0][1],\,p[1]{+}v[0][0]\}=\max\{0,3\}=3\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>6</td>
        <td>2</td>
        <td><span class="arithmatex">\(\max\{v[0][2],\,p[1]{+}v[0][1],\,2p[1]{+}v[0][0]\}=\max\{0,3,6\}=6\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td>9</td>
        <td>3</td>
        <td><span class="arithmatex">\(\max\{v[0][3],\,p[1]{+}v[0][2],\,2p[1]{+}v[0][1],\,3p[1]{+}v[0][0]\}=\max\{0,3,6,9\}=9\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td>9</td>
        <td>3</td>
        <td><span class="arithmatex">\(\max\{v[0][4],\,p[1]{+}v[0][3],\,2p[1]{+}v[0][2],\,3p[1]{+}v[0][1]\}=\max\{0,3,6,9\}=9\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td>9</td>
        <td>3</td>
        <td><span class="arithmatex">\(\max\{v[0][5],\,p[1]{+}v[0][4],\,2p[1]{+}v[0][3],\,3p[1]{+}v[0][2]\}=\max\{0,3,6,9\}=9\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>6</td>
        <td>9</td>
        <td>3</td>
        <td><span class="arithmatex">\(\max\{v[0][6],\,p[1]{+}v[0][5],\,2p[1]{+}v[0][4],\,3p[1]{+}v[0][3]\}=\max\{0,3,6,9\}=9\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>7</td>
        <td>9</td>
        <td>3</td>
        <td><span class="arithmatex">\(\max\{v[0][7],\,p[1]{+}v[0][6],\,2p[1]{+}v[0][5],\,3p[1]{+}v[0][4]\}=\max\{0,3,6,9\}=9\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][0]\}=0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td>3</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][1]\}=3\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][2]\}=6\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>9</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][3]\}=9\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>9</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][4],\,p[2]{+}v[1][0]\}=\max\{9,8\}=9\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td>11</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[1][5],\,p[2]{+}v[1][1]\}=\max\{9,11\}=11\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>6</td>
        <td>14</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[1][6],\,p[2]{+}v[1][2]\}=\max\{9,14\}=14\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>7</td>
        <td>17</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[1][7],\,p[2]{+}v[1][3]\}=\max\{9,17\}=17\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrr}
        \hline {v[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 3 & 6 & 9 & 9 & 9 & 9 & 9 \\
        {j=2} & 0 & 3 & 6 & 9 & 9 & 11 & 14 & 17 \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 1 & 2 & 3 & 3 & 3 & 3 & 3 \\
        {j=2} & 0 & 0 & 0 & 0 & 0 & 1 & 1 & 1 \\
        \hline
        \end{array}
        $$

    2. Abbiamo la seguente matrice $s$:

        $$
        \begin{array}{l|rrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 1 & 2 & 3 & 3 & 3 & 3 & 3 \\
        {j=2} & 0 & 0 & 0 & 0 & 0 & 1 & 1 & 1 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima partendo da $j=2$ e $k=7$ come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=7\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>7</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 7-1\cdot4=3\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td>3</td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 3\)</span>, <span class="arithmatex">\(k\leftarrow 3-3\cdot1=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (3,1)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[2][7]=17.
        $$

<a id="esercizio-19-3"></a>

!!! esercizio "Esercizio 19.3: Esercizio 3: problema dello zaino limitato"

    Consideriamo la seguente istanza del BKP, in cui lo zaino ha capacità $c=5$ e i profitti, i pesi e i limiti associati ai tipi di oggetto sono:

    $$
    \begin{array}{l|rrr}
    \hline  & {j=1} & {j=2} & {j=3} \\
    \hline {p_j} & 2 & 3 & 4 \\
    {w_j} & 1 & 2 & 3 \\
    {b_j} & 1 & 1 & 1 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni iterazione, i valori delle matrici $v$ e $s$.

    2. Usando la matrice $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2,x_3)$ e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $j$ e $k$, le celle $v[j][k]$ e $s[j][k]$ e l'operazione eseguita.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(v[j][k]\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][0]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][1]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][2]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][3]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>4</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][4]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>5</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][5]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[0][0]\}=0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[0][1],\,p[1]{+}v[0][0]\}=\max\{0,2\}=2\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[0][2],\,p[1]{+}v[0][1]\}=\max\{0,2\}=2\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[0][3],\,p[1]{+}v[0][2]\}=\max\{0,2\}=2\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[0][4],\,p[1]{+}v[0][3]\}=\max\{0,2\}=2\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[0][5],\,p[1]{+}v[0][4]\}=\max\{0,2\}=2\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][0]\}=0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][1]\}=2\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[1][2],\,p[2]{+}v[1][0]\}=\max\{2,3\}=3\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[1][3],\,p[2]{+}v[1][1]\}=\max\{2,5\}=5\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[1][4],\,p[2]{+}v[1][2]\}=\max\{2,5\}=5\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[1][5],\,p[2]{+}v[1][3]\}=\max\{2,5\}=5\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[2][0]\}=0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[2][1]\}=2\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td>3</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[2][2]\}=3\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[2][3],\,p[3]{+}v[2][0]\}=\max\{5,4\}=5\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[2][4],\,p[3]{+}v[2][1]\}=\max\{5,6\}=6\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>5</td>
        <td>7</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[2][5],\,p[3]{+}v[2][2]\}=\max\{5,7\}=7\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrr}
        \hline {v[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 2 & 2 & 2 & 2 & 2 \\
        {j=2} & 0 & 2 & 3 & 5 & 5 & 5 \\
        {j=3} & 0 & 2 & 3 & 5 & 6 & 7 \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 1 & 1 & 1 & 1 & 1 \\
        {j=2} & 0 & 0 & 1 & 1 & 1 & 1 \\
        {j=3} & 0 & 0 & 0 & 0 & 1 & 1 \\
        \hline
        \end{array}
        $$

    2. Abbiamo la seguente matrice $s$:

        $$
        \begin{array}{l|rrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 1 & 1 & 1 & 1 & 1 \\
        {j=2} & 0 & 0 & 1 & 1 & 1 & 1 \\
        {j=3} & 0 & 0 & 0 & 0 & 1 & 1 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima partendo da $j=3$ e $k=5$ come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=5\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td>5</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(x[3]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 5-1\cdot3=2\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>2</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 2-1\cdot2=0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 0\)</span>, <span class="arithmatex">\(k\leftarrow 0-0\cdot1=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (0,1,1)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[3][5]=7.
        $$

<a id="esercizio-19-4"></a>

!!! esercizio "Esercizio 19.4: Esercizio 4: problema dello zaino limitato"

    Consideriamo la seguente istanza del BKP, in cui lo zaino ha capacità $c=8$ e i profitti, i pesi e i limiti associati ai tipi di oggetto sono:

    $$
    \begin{array}{l|rr}
    \hline  & {j=1} & {j=2} \\
    \hline {p_j} & 5 & 9 \\
    {w_j} & 2 & 5 \\
    {b_j} & 3 & 1 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni iterazione, i valori delle matrici $v$ e $s$.

    2. Usando la matrice $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2)$ e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $j$ e $k$, le celle $v[j][k]$ e $s[j][k]$ e l'operazione eseguita.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(v[j][k]\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][0]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][1]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][2]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][3]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>4</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][4]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>5</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][5]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>6</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][6]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>7</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][7]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][7]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>8</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][8]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][8]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[0][0]\}=0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[0][1]\}=0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[0][2],\,p[1]{+}v[0][0]\}=\max\{0,5\}=5\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[0][3],\,p[1]{+}v[0][1]\}=\max\{0,5\}=5\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(\max\{v[0][4],\,p[1]{+}v[0][2],\,2p[1]{+}v[0][0]\}=\max\{0,5,10\}=10\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(\max\{v[0][5],\,p[1]{+}v[0][3],\,2p[1]{+}v[0][1]\}=\max\{0,5,10\}=10\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>6</td>
        <td>15</td>
        <td>3</td>
        <td><span class="arithmatex">\(\max\{v[0][6],\,p[1]{+}v[0][4],\,2p[1]{+}v[0][2],\,3p[1]{+}v[0][0]\}=\max\{0,5,10,15\}=15\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>7</td>
        <td>15</td>
        <td>3</td>
        <td><span class="arithmatex">\(\max\{v[0][7],\,p[1]{+}v[0][5],\,2p[1]{+}v[0][3],\,3p[1]{+}v[0][1]\}=\max\{0,5,10,15\}=15\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>8</td>
        <td>15</td>
        <td>3</td>
        <td><span class="arithmatex">\(\max\{v[0][8],\,p[1]{+}v[0][6],\,2p[1]{+}v[0][4],\,3p[1]{+}v[0][2]\}=\max\{0,5,10,15\}=15\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][0]\}=0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][1]\}=0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][2]\}=5\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][3]\}=5\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][4]\}=10\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][5],\,p[2]{+}v[1][0]\}=\max\{10,9\}=10\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>6</td>
        <td>15</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][6],\,p[2]{+}v[1][1]\}=\max\{15,9\}=15\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>7</td>
        <td>15</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][7],\,p[2]{+}v[1][2]\}=\max\{15,14\}=15\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>8</td>
        <td>15</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][8],\,p[2]{+}v[1][3]\}=\max\{15,14\}=15\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrr}
        \hline {v[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 5 & 5 & 10 & 10 & 15 & 15 & 15 \\
        {j=2} & 0 & 0 & 5 & 5 & 10 & 10 & 15 & 15 & 15 \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 1 & 1 & 2 & 2 & 3 & 3 & 3 \\
        {j=2} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        \hline
        \end{array}
        $$

    2. Abbiamo la seguente matrice $s$:

        $$
        \begin{array}{l|rrrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 1 & 1 & 2 & 2 & 3 & 3 & 3 \\
        {j=2} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima partendo da $j=2$ e $k=8$ come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=8\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>8</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 0\)</span>, <span class="arithmatex">\(k\leftarrow 8-0\cdot5=8\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td>8</td>
        <td>3</td>
        <td class="cella-blu">3</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 3\)</span>, <span class="arithmatex">\(k\leftarrow 8-3\cdot2=2\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (3,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[2][8]=15.
        $$

<a id="esercizio-19-5"></a>

!!! esercizio "Esercizio 19.5: Esercizio 5: problema dello zaino limitato"

    Consideriamo la seguente istanza del BKP, in cui lo zaino ha capacità $c=9$ e i profitti, i pesi e i limiti associati ai tipi di oggetto sono:

    $$
    \begin{array}{l|rrr}
    \hline  & {j=1} & {j=2} & {j=3} \\
    \hline {p_j} & 4 & 5 & 3 \\
    {w_j} & 3 & 4 & 2 \\
    {b_j} & 2 & 1 & 2 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni iterazione, i valori delle matrici $v$ e $s$.

    2. Usando la matrice $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2,x_3)$ e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $j$ e $k$, le celle $v[j][k]$ e $s[j][k]$ e l'operazione eseguita.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(v[j][k]\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][0]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][1]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][2]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][3]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>4</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][4]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>5</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][5]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>6</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][6]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>7</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][7]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][7]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>8</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][8]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][8]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>9</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][9]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][9]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[0][0]\}=0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[0][1]\}=0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[0][2]\}=0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[0][3],\,p[1]{+}v[0][0]\}=\max\{0,4\}=4\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[0][4],\,p[1]{+}v[0][1]\}=\max\{0,4\}=4\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[0][5],\,p[1]{+}v[0][2]\}=\max\{0,4\}=4\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>6</td>
        <td>8</td>
        <td>2</td>
        <td><span class="arithmatex">\(\max\{v[0][6],\,p[1]{+}v[0][3],\,2p[1]{+}v[0][0]\}=\max\{0,4,8\}=8\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>7</td>
        <td>8</td>
        <td>2</td>
        <td><span class="arithmatex">\(\max\{v[0][7],\,p[1]{+}v[0][4],\,2p[1]{+}v[0][1]\}=\max\{0,4,8\}=8\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>8</td>
        <td>8</td>
        <td>2</td>
        <td><span class="arithmatex">\(\max\{v[0][8],\,p[1]{+}v[0][5],\,2p[1]{+}v[0][2]\}=\max\{0,4,8\}=8\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>9</td>
        <td>8</td>
        <td>2</td>
        <td><span class="arithmatex">\(\max\{v[0][9],\,p[1]{+}v[0][6],\,2p[1]{+}v[0][3]\}=\max\{0,4,8\}=8\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][0]\}=0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][1]\}=0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][2]\}=0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>4</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][3]\}=4\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[1][4],\,p[2]{+}v[1][0]\}=\max\{4,5\}=5\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[1][5],\,p[2]{+}v[1][1]\}=\max\{4,5\}=5\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>6</td>
        <td>8</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[1][6],\,p[2]{+}v[1][2]\}=\max\{8,5\}=8\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>7</td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[1][7],\,p[2]{+}v[1][3]\}=\max\{8,9\}=9\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>8</td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[1][8],\,p[2]{+}v[1][4]\}=\max\{8,9\}=9\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>9</td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[1][9],\,p[2]{+}v[1][5]\}=\max\{8,9\}=9\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[2][0]\}=0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[2][1]\}=0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[2][2],\,p[3]{+}v[2][0]\}=\max\{0,3\}=3\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>4</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[2][3],\,p[3]{+}v[2][1]\}=\max\{4,3\}=4\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>6</td>
        <td>2</td>
        <td><span class="arithmatex">\(\max\{v[2][4],\,p[3]{+}v[2][2],\,2p[3]{+}v[2][0]\}=\max\{5,3,6\}=6\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>5</td>
        <td>7</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[2][5],\,p[3]{+}v[2][3],\,2p[3]{+}v[2][1]\}=\max\{5,7,6\}=7\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>6</td>
        <td>8</td>
        <td>0</td>
        <td><span class="arithmatex">\(\max\{v[2][6],\,p[3]{+}v[2][4],\,2p[3]{+}v[2][2]\}=\max\{8,8,6\}=8\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>7</td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(\max\{v[2][7],\,p[3]{+}v[2][5],\,2p[3]{+}v[2][3]\}=\max\{9,8,10\}=10\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>8</td>
        <td>11</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[2][8],\,p[3]{+}v[2][6],\,2p[3]{+}v[2][4]\}=\max\{9,11,11\}=11\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>9</td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(\max\{v[2][9],\,p[3]{+}v[2][7],\,2p[3]{+}v[2][5]\}=\max\{9,12,11\}=12\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrr}
        \hline {v[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 0 & 4 & 4 & 4 & 8 & 8 & 8 & 8 \\
        {j=2} & 0 & 0 & 0 & 4 & 5 & 5 & 8 & 9 & 9 & 9 \\
        {j=3} & 0 & 0 & 3 & 4 & 6 & 7 & 8 & 10 & 11 & 12 \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 0 & 1 & 1 & 1 & 2 & 2 & 2 & 2 \\
        {j=2} & 0 & 0 & 0 & 0 & 1 & 1 & 0 & 1 & 1 & 1 \\
        {j=3} & 0 & 0 & 1 & 0 & 2 & 1 & 0 & 2 & 1 & 1 \\
        \hline
        \end{array}
        $$

    2. Abbiamo la seguente matrice $s$:

        $$
        \begin{array}{l|rrrrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 0 & 1 & 1 & 1 & 2 & 2 & 2 & 2 \\
        {j=2} & 0 & 0 & 0 & 0 & 1 & 1 & 0 & 1 & 1 & 1 \\
        {j=3} & 0 & 0 & 1 & 0 & 2 & 1 & 0 & 2 & 1 & 1 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima partendo da $j=3$ e $k=9$ come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=9\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td>9</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(x[3]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 9-1\cdot2=7\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>7</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 7-1\cdot4=3\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>3</td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 3-1\cdot3=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (1,1,1)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[3][9]=12.
        $$
