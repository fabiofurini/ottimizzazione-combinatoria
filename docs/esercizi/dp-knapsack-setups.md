---
title: "Esercizi · PD per il problema dello zaino con setup"
---

# Esercizi · PD per il problema dello zaino con setup

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 23** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 23: Zaino con setup (KPS)](../programmazione-dinamica/dp-knapsack-setups.md) · [:material-file-pdf-box: Eserciziario, volume 3 (PDF)](../pdf/esercizi-3-programmazione-dinamica.pdf)

</div>

!!! formula "Ricorrenza usata in questi esercizi"

    L'algoritmo di PD del capitolo [«PD per il problema dello zaino con setup»](../programmazione-dinamica/dp-knapsack-setups.md). Gli oggetti sono numerati classe per classe, $\mathscr{J}_h=\{\ell_{h-1}+1,\dots,\ell_h\}$, $t_h=|\mathscr{J}_h|$, e $j=\ell_{h-1}+i$ è l'$i$-esimo oggetto della classe $h$:

    $$
    u(h,i,k)= \left\{ \begin{array}{ll}
    -\infty & \textrm{se $i=0$ e $k<s_h$,}\\[2ex]
    v(h-1,k-s_h)-f_h & \textrm{se $i=0$ e $k\ge s_h$,}\\[2ex]
    u(h,i-1,k) & \textrm{se $i\ge 1$ e $w_j>k$,}\\[2ex]
    \begin{array}[t]{@{}l@{}}\displaystyle \max \bigg\{ u(h,i-1,k),\\ \qquad p_j+u(h,i-1,k-w_j) \bigg\}\end{array} & \textrm{se $i\ge 1$ e $w_j\le k$,}
    \end{array} \right.
    $$

    $$
    v(h,k)= \left\{ \begin{array}{ll}
    0 & \textrm{se $h=0$,}\\[2ex]
    \max \big\{ v(h-1,k),\; u(h,t_h,k) \big\} & \textrm{se $h\ge 1$.}
    \end{array} \right.
    $$

    Il valore ottimo è $v(q,c)$. Le tabelle delle scelte memorizzano $s[h][i][k]=1$ se l'$i$-esimo oggetto della classe $h$ è selezionato, e $o[h][k]=1$ se la classe $h$ è aperta. La ricostruzione scorre le classi a partire da $h=q$ e $k=c$: una classe aperta si scorre come nel KP, e poi $k$ diminuisce di $s_h$.

<a id="esercizio-23-1"></a>

!!! esercizio "Esercizio 23.1: Esercizio 1: problema dello zaino con setup"

    Consideriamo la seguente istanza del KPS, con uno zaino di capacità $c=7$ e $4$ oggetti partizionati in $q=2$ classi: $\mathscr{J}_1=\{1,2\}$ con $f_1=2$ e $s_1=1$, $\mathscr{J}_2=\{3,4\}$ con $f_2=2$ e $s_2=1$. I ricavi e i pesi sono:

    $$
    \begin{array}{l|rr|rr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\
    \hline {p_j} & 2 & 9 & 3 & 8 \\
    {w_j} & 2 & 1 & 2 & 1 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Eseguire l'algoritmo di PD bottom-up e scrivere la tabella di tutte le righe $v[h][\cdot]$ e $u[h][i][\cdot]$, nell'ordine di calcolo.

    2. Scrivere le tabelle delle scelte $s$ e $o$, ricostruire una soluzione ottima $(x_1,x_2,x_3,x_4)$, dire quali classi sono aperte e riportare il valore ottimo.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. Per ogni classe $h$ l'algoritmo di PD calcola la riga di setup $u[h][0][\cdot]$, le righe degli oggetti della classe $h$ e la riga $v[h][\cdot]$. In caso di pareggio l'oggetto non viene selezionato e la classe resta chiusa. Questa è la tabella dopo l'esecuzione dell'algoritmo di PD:

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
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[1][0][k]\)</span> (setup)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
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
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[1][2][k]\)</span> (<span class="arithmatex">\(j=2\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(v[1][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][0][k]\)</span> (setup)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][1][k]\)</span> (<span class="arithmatex">\(j=3\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][2][k]\)</span> (<span class="arithmatex">\(j=4\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(v[2][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        </tr>
        </table></div>

        Questi sono i calcoli delle celle usate dalla ricostruzione, nell'ordine in cui essa le legge:

        - $v[2][7]=\max\{v[1][7],\,u[2][2][7]\}=\max\{9,\,16\}=16$

        - $u[2][2][7]=\max\{u[2][1][7],\,p_4+u[2][1][6]\}=\max\{10,\,16\}=16$

        - $u[2][1][6]=\max\{u[2][0][6],\,p_3+u[2][0][4]\}=\max\{7,\,8\}=8$

        - $u[2][0][4]=v[1][3]-f_2=7-2=5$

        - $v[1][3]=\max\{v[0][3],\,u[1][2][3]\}=\max\{0,\,7\}=7$

        - $u[1][2][3]=\max\{u[1][1][3],\,p_2+u[1][1][2]\}=\max\{0,\,7\}=7$

        - $u[1][1][2]=\max\{u[1][0][2],\,p_1+u[1][0][0]\}=\max\{-2,\,-\infty\}=-2$

        - $u[1][0][2]=v[0][1]-f_1=0-2=-2$

    2. Queste sono le tabelle delle scelte calcolate dall'algoritmo di PD:

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
        </tr>
        <tr>
        <td><span class="arithmatex">\(s[1][1][k]\)</span> (<span class="arithmatex">\(j=1\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
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
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(o[1][k]\)</span></td>
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
        <td><span class="arithmatex">\(s[2][1][k]\)</span> (<span class="arithmatex">\(j=3\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(s[2][2][k]\)</span> (<span class="arithmatex">\(j=4\)</span>)</td>
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
        <td><span class="arithmatex">\(o[2][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        </table></div>

        Partendo da $h=2$ e $k=7$:

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
        <td><span class="arithmatex">\(k=7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(h=2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(o[2][7]=1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>classe <span class="arithmatex">\(2\)</span> aperta</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(j=4\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(s[2][2][7]=1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(k\leftarrow 7-1=6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(j=3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(s[2][1][6]=1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td><span class="arithmatex">\(k\leftarrow 6-2=4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>setup: <span class="arithmatex">\(k\leftarrow 4-s_2=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(h=1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(o[1][3]=1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>classe <span class="arithmatex">\(1\)</span> aperta</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(j=2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(s[1][2][3]=1\)</span></td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(k\leftarrow 3-1=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(j=1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(s[1][1][2]=0\)</span></td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(k=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>setup: <span class="arithmatex">\(k\leftarrow 2-s_1=1\)</span></td>
        </tr>
        </table></div>

        Il vettore $(0,1,1,1)$ è una soluzione ottima: entrambe le classi sono aperte, e sono selezionati gli oggetti $\{2,3,4\}$. Il suo peso totale è $1+2+1+s_1+s_2=6\le c$, e il valore ottimo è $v[2][7]=9+3+8-f_1-f_2=16$.

<a id="esercizio-23-2"></a>

!!! esercizio "Esercizio 23.2: Esercizio 2: problema dello zaino con setup"

    Consideriamo la seguente istanza del KPS, con uno zaino di capacità $c=7$ e $4$ oggetti partizionati in $q=2$ classi: $\mathscr{J}_1=\{1,2\}$ con $f_1=4$ e $s_1=2$, $\mathscr{J}_2=\{3,4\}$ con $f_2=4$ e $s_2=1$. I ricavi e i pesi sono:

    $$
    \begin{array}{l|rr|rr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\
    \hline {p_j} & 7 & 5 & 9 & 2 \\
    {w_j} & 3 & 3 & 3 & 3 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Eseguire l'algoritmo di PD bottom-up e scrivere la tabella di tutte le righe $v[h][\cdot]$ e $u[h][i][\cdot]$, nell'ordine di calcolo.

    2. Scrivere le tabelle delle scelte $s$ e $o$, ricostruire una soluzione ottima $(x_1,x_2,x_3,x_4)$, dire quali classi sono aperte e riportare il valore ottimo.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. Per ogni classe $h$ l'algoritmo di PD calcola la riga di setup $u[h][0][\cdot]$, le righe degli oggetti della classe $h$ e la riga $v[h][\cdot]$. In caso di pareggio l'oggetto non viene selezionato e la classe resta chiusa. Questa è la tabella dopo l'esecuzione dell'algoritmo di PD:

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
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[1][0][k]\)</span> (setup)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[1][1][k]\)</span> (<span class="arithmatex">\(j=1\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[1][2][k]\)</span> (<span class="arithmatex">\(j=2\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(v[1][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][0][k]\)</span> (setup)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][1][k]\)</span> (<span class="arithmatex">\(j=3\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][2][k]\)</span> (<span class="arithmatex">\(j=4\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(-4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(v[2][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        </table></div>

        Questi sono i calcoli delle celle usate dalla ricostruzione, nell'ordine in cui essa le legge:

        - $v[2][7]=\max\{v[1][7],\,u[2][2][7]\}=\max\{3,\,7\}=7$

        - $u[2][2][7]=\max\{u[2][1][7],\,p_4+u[2][1][4]\}=\max\{5,\,7\}=7$

        - $u[2][1][4]=\max\{u[2][0][4],\,p_3+u[2][0][1]\}=\max\{-4,\,5\}=5$

        - $u[2][0][1]=v[1][0]-f_2=0-4=-4$

        - $v[1][0]=\max\{v[0][0],\,u[1][2][0]\}=\max\{0,\,-\infty\}=0$

    2. Queste sono le tabelle delle scelte calcolate dall'algoritmo di PD:

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
        </tr>
        <tr>
        <td><span class="arithmatex">\(s[1][2][k]\)</span> (<span class="arithmatex">\(j=2\)</span>)</td>
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
        <td><span class="arithmatex">\(o[1][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(s[2][1][k]\)</span> (<span class="arithmatex">\(j=3\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(s[2][2][k]\)</span> (<span class="arithmatex">\(j=4\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(o[2][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        </table></div>

        Partendo da $h=2$ e $k=7$:

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
        <td><span class="arithmatex">\(k=7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(h=2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(o[2][7]=1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>classe <span class="arithmatex">\(2\)</span> aperta</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(j=4\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(s[2][2][7]=1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(k\leftarrow 7-3=4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(j=3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(s[2][1][4]=1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td><span class="arithmatex">\(k\leftarrow 4-3=1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>setup: <span class="arithmatex">\(k\leftarrow 1-s_2=0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(h=1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(o[1][0]=0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>classe <span class="arithmatex">\(1\)</span> chiusa</td>
        </tr>
        </table></div>

        Il vettore $(0,0,1,1)$ è una soluzione ottima: solo la classe $2$ è aperta, e sono selezionati gli oggetti $\{3,4\}$. Il suo peso totale è $3+3+s_2=7\le c$, e il valore ottimo è $v[2][7]=9+2-f_2=7$.

<a id="esercizio-23-3"></a>

!!! esercizio "Esercizio 23.3: Esercizio 3: problema dello zaino con setup"

    Consideriamo la seguente istanza del KPS, con uno zaino di capacità $c=8$ e $5$ oggetti partizionati in $q=2$ classi: $\mathscr{J}_1=\{1,2\}$ con $f_1=1$ e $s_1=1$, $\mathscr{J}_2=\{3,4,5\}$ con $f_2=2$ e $s_2=2$. I ricavi e i pesi sono:

    $$
    \begin{array}{l|rr|rrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\
    \hline {p_j} & 3 & 9 & 5 & 7 & 9 \\
    {w_j} & 4 & 1 & 1 & 3 & 1 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Eseguire l'algoritmo di PD bottom-up e scrivere la tabella di tutte le righe $v[h][\cdot]$ e $u[h][i][\cdot]$, nell'ordine di calcolo.

    2. Scrivere le tabelle delle scelte $s$ e $o$, ricostruire una soluzione ottima $(x_1,x_2,x_3,x_4,x_5)$, dire quali classi sono aperte e riportare il valore ottimo.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. Per ogni classe $h$ l'algoritmo di PD calcola la riga di setup $u[h][0][\cdot]$, le righe degli oggetti della classe $h$ e la riga $v[h][\cdot]$. In caso di pareggio l'oggetto non viene selezionato e la classe resta chiusa. Questa è la tabella dopo l'esecuzione dell'algoritmo di PD:

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
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[1][0][k]\)</span> (setup)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[1][1][k]\)</span> (<span class="arithmatex">\(j=1\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[1][2][k]\)</span> (<span class="arithmatex">\(j=2\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(v[1][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][0][k]\)</span> (setup)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][1][k]\)</span> (<span class="arithmatex">\(j=3\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][2][k]\)</span> (<span class="arithmatex">\(j=4\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][3][k]\)</span> (<span class="arithmatex">\(j=5\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(v[2][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        </tr>
        </table></div>

        Questi sono i calcoli delle celle usate dalla ricostruzione, nell'ordine in cui essa le legge:

        - $v[2][8]=\max\{v[1][8],\,u[2][3][8]\}=\max\{11,\,22\}=22$

        - $u[2][3][8]=\max\{u[2][2][8],\,p_5+u[2][2][7]\}=\max\{18,\,22\}=22$

        - $u[2][2][7]=\max\{u[2][1][7],\,p_4+u[2][1][4]\}=\max\{11,\,13\}=13$

        - $u[2][1][4]=\max\{u[2][0][4],\,p_3+u[2][0][3]\}=\max\{6,\,3\}=6$

        - $u[2][0][4]=v[1][2]-f_2=8-2=6$

        - $v[1][2]=\max\{v[0][2],\,u[1][2][2]\}=\max\{0,\,8\}=8$

        - $u[1][2][2]=\max\{u[1][1][2],\,p_2+u[1][1][1]\}=\max\{-1,\,8\}=8$

        - $u[1][1][1]=u[1][0][1]=-1$, perché $w_1>1$

        - $u[1][0][1]=v[0][0]-f_1=0-1=-1$

    2. Queste sono le tabelle delle scelte calcolate dall'algoritmo di PD:

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
        </tr>
        <tr>
        <td><span class="arithmatex">\(s[1][2][k]\)</span> (<span class="arithmatex">\(j=2\)</span>)</td>
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
        <td><span class="arithmatex">\(o[1][k]\)</span></td>
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
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(s[2][2][k]\)</span> (<span class="arithmatex">\(j=4\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(s[2][3][k]\)</span> (<span class="arithmatex">\(j=5\)</span>)</td>
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
        <td><span class="arithmatex">\(o[2][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        </table></div>

        Partendo da $h=2$ e $k=8$:

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
        <td><span class="arithmatex">\(k=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(h=2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(o[2][8]=1\)</span></td>
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
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(s[2][3][8]=1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(k\leftarrow 8-1=7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(j=4\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(s[2][2][7]=1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td><span class="arithmatex">\(k\leftarrow 7-3=4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(j=3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(s[2][1][4]=0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(k=4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>setup: <span class="arithmatex">\(k\leftarrow 4-s_2=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(h=1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(o[1][2]=1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>classe <span class="arithmatex">\(1\)</span> aperta</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(j=2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(s[1][2][2]=1\)</span></td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(k\leftarrow 2-1=1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(j=1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(s[1][1][1]=0\)</span></td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(k=1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>1</td>
        <td>1</td>
        <td>setup: <span class="arithmatex">\(k\leftarrow 1-s_1=0\)</span></td>
        </tr>
        </table></div>

        Il vettore $(0,1,0,1,1)$ è una soluzione ottima: entrambe le classi sono aperte, e sono selezionati gli oggetti $\{2,4,5\}$. Il suo peso totale è $1+3+1+s_1+s_2=8\le c$, e il valore ottimo è $v[2][8]=9+7+9-f_1-f_2=22$.

<a id="esercizio-23-4"></a>

!!! esercizio "Esercizio 23.4: Esercizio 4: problema dello zaino con setup"

    Consideriamo la seguente istanza del KPS, con uno zaino di capacità $c=8$ e $5$ oggetti partizionati in $q=2$ classi: $\mathscr{J}_1=\{1,2,3\}$ con $f_1=2$ e $s_1=1$, $\mathscr{J}_2=\{4,5\}$ con $f_2=1$ e $s_2=1$. I ricavi e i pesi sono:

    $$
    \begin{array}{l|rrr|rr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\
    \hline {p_j} & 6 & 9 & 9 & 7 & 5 \\
    {w_j} & 1 & 1 & 4 & 3 & 4 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Eseguire l'algoritmo di PD bottom-up e scrivere la tabella di tutte le righe $v[h][\cdot]$ e $u[h][i][\cdot]$, nell'ordine di calcolo.

    2. Scrivere le tabelle delle scelte $s$ e $o$, ricostruire una soluzione ottima $(x_1,x_2,x_3,x_4,x_5)$, dire quali classi sono aperte e riportare il valore ottimo.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. Per ogni classe $h$ l'algoritmo di PD calcola la riga di setup $u[h][0][\cdot]$, le righe degli oggetti della classe $h$ e la riga $v[h][\cdot]$. In caso di pareggio l'oggetto non viene selezionato e la classe resta chiusa. Questa è la tabella dopo l'esecuzione dell'algoritmo di PD:

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
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[1][0][k]\)</span> (setup)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
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
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
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
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[1][3][k]\)</span> (<span class="arithmatex">\(j=3\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(v[1][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][0][k]\)</span> (setup)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][1][k]\)</span> (<span class="arithmatex">\(j=4\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][2][k]\)</span> (<span class="arithmatex">\(j=5\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(-1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(v[2][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        </tr>
        </table></div>

        Questi sono i calcoli delle celle usate dalla ricostruzione, nell'ordine in cui essa le legge:

        - $v[2][8]=\max\{v[1][8],\,u[2][2][8]\}=\max\{22,\,21\}=22$

        - $v[1][8]=\max\{v[0][8],\,u[1][3][8]\}=\max\{0,\,22\}=22$

        - $u[1][3][8]=\max\{u[1][2][8],\,p_3+u[1][2][4]\}=\max\{13,\,22\}=22$

        - $u[1][2][4]=\max\{u[1][1][4],\,p_2+u[1][1][3]\}=\max\{4,\,13\}=13$

        - $u[1][1][3]=\max\{u[1][0][3],\,p_1+u[1][0][2]\}=\max\{-2,\,4\}=4$

        - $u[1][0][2]=v[0][1]-f_1=0-2=-2$

    2. Queste sono le tabelle delle scelte calcolate dall'algoritmo di PD:

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
        </tr>
        <tr>
        <td><span class="arithmatex">\(s[1][1][k]\)</span> (<span class="arithmatex">\(j=1\)</span>)</td>
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
        <td><span class="arithmatex">\(s[1][2][k]\)</span> (<span class="arithmatex">\(j=2\)</span>)</td>
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
        <td><span class="arithmatex">\(s[1][3][k]\)</span> (<span class="arithmatex">\(j=3\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(o[1][k]\)</span></td>
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
        <td><span class="arithmatex">\(s[2][1][k]\)</span> (<span class="arithmatex">\(j=4\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(s[2][2][k]\)</span> (<span class="arithmatex">\(j=5\)</span>)</td>
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
        <td><span class="arithmatex">\(o[2][k]\)</span></td>
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
        </table></div>

        Partendo da $h=2$ e $k=8$:

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
        <td><span class="arithmatex">\(k=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(h=2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(o[2][8]=0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>classe <span class="arithmatex">\(2\)</span> chiusa</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(h=1\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(o[1][8]=1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>classe <span class="arithmatex">\(1\)</span> aperta</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(j=3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(s[1][3][8]=1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k\leftarrow 8-4=4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(j=2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(s[1][2][4]=1\)</span></td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k\leftarrow 4-1=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(j=1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(s[1][1][3]=1\)</span></td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k\leftarrow 3-1=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>setup: <span class="arithmatex">\(k\leftarrow 2-s_1=1\)</span></td>
        </tr>
        </table></div>

        Il vettore $(1,1,1,0,0)$ è una soluzione ottima: solo la classe $1$ è aperta, e sono selezionati gli oggetti $\{1,2,3\}$. Il suo peso totale è $1+1+4+s_1=7\le c$, e il valore ottimo è $v[2][8]=6+9+9-f_1=22$.

<a id="esercizio-23-5"></a>

!!! esercizio "Esercizio 23.5: Esercizio 5: problema dello zaino con setup"

    Consideriamo la seguente istanza del KPS, con uno zaino di capacità $c=9$ e $5$ oggetti partizionati in $q=2$ classi: $\mathscr{J}_1=\{1,2\}$ con $f_1=3$ e $s_1=2$, $\mathscr{J}_2=\{3,4,5\}$ con $f_2=2$ e $s_2=2$. I ricavi e i pesi sono:

    $$
    \begin{array}{l|rr|rrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\
    \hline {p_j} & 6 & 5 & 8 & 6 & 5 \\
    {w_j} & 3 & 1 & 1 & 4 & 3 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Eseguire l'algoritmo di PD bottom-up e scrivere la tabella di tutte le righe $v[h][\cdot]$ e $u[h][i][\cdot]$, nell'ordine di calcolo.

    2. Scrivere le tabelle delle scelte $s$ e $o$, ricostruire una soluzione ottima $(x_1,x_2,x_3,x_4,x_5)$, dire quali classi sono aperte e riportare il valore ottimo.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. Per ogni classe $h$ l'algoritmo di PD calcola la riga di setup $u[h][0][\cdot]$, le righe degli oggetti della classe $h$ e la riga $v[h][\cdot]$. In caso di pareggio l'oggetto non viene selezionato e la classe resta chiusa. Questa è la tabella dopo l'esecuzione dell'algoritmo di PD:

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
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[1][0][k]\)</span> (setup)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[1][1][k]\)</span> (<span class="arithmatex">\(j=1\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[1][2][k]\)</span> (<span class="arithmatex">\(j=2\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(v[1][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][0][k]\)</span> (setup)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][1][k]\)</span> (<span class="arithmatex">\(j=3\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][2][k]\)</span> (<span class="arithmatex">\(j=4\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(u[2][3][k]\)</span> (<span class="arithmatex">\(j=5\)</span>)</td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td><span class="arithmatex">\(-2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(v[2][k]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        </tr>
        </table></div>

        Questi sono i calcoli delle celle usate dalla ricostruzione, nell'ordine in cui essa le legge:

        - $v[2][9]=\max\{v[1][9],\,u[2][3][9]\}=\max\{8,\,14\}=14$

        - $u[2][3][9]=\max\{u[2][2][9],\,p_5+u[2][2][6]\}=\max\{14,\,13\}=14$

        - $u[2][2][9]=\max\{u[2][1][9],\,p_4+u[2][1][5]\}=\max\{14,\,12\}=14$

        - $u[2][1][9]=\max\{u[2][0][9],\,p_3+u[2][0][8]\}=\max\{6,\,14\}=14$

        - $u[2][0][8]=v[1][6]-f_2=8-2=6$

        - $v[1][6]=\max\{v[0][6],\,u[1][2][6]\}=\max\{0,\,8\}=8$

        - $u[1][2][6]=\max\{u[1][1][6],\,p_2+u[1][1][5]\}=\max\{3,\,8\}=8$

        - $u[1][1][5]=\max\{u[1][0][5],\,p_1+u[1][0][2]\}=\max\{-3,\,3\}=3$

        - $u[1][0][2]=v[0][0]-f_1=0-3=-3$

    2. Queste sono le tabelle delle scelte calcolate dall'algoritmo di PD:

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
        </tr>
        <tr>
        <td><span class="arithmatex">\(s[1][2][k]\)</span> (<span class="arithmatex">\(j=2\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
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
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(s[2][2][k]\)</span> (<span class="arithmatex">\(j=4\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(s[2][3][k]\)</span> (<span class="arithmatex">\(j=5\)</span>)</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(o[2][k]\)</span></td>
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
        </table></div>

        Partendo da $h=2$ e $k=9$:

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
        <td><span class="arithmatex">\(k=9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(h=2\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(o[2][9]=1\)</span></td>
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
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(s[2][3][9]=0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">\(k=9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(j=4\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(s[2][2][9]=0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(j=3\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(s[2][1][9]=1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k\leftarrow 9-1=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>setup: <span class="arithmatex">\(k\leftarrow 8-s_2=6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(h=1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(o[1][6]=1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>classe <span class="arithmatex">\(1\)</span> aperta</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(j=2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(s[1][2][6]=1\)</span></td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k\leftarrow 6-1=5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(j=1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(s[1][1][5]=1\)</span></td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k\leftarrow 5-3=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>setup: <span class="arithmatex">\(k\leftarrow 2-s_1=0\)</span></td>
        </tr>
        </table></div>

        Il vettore $(1,1,1,0,0)$ è una soluzione ottima: entrambe le classi sono aperte, e sono selezionati gli oggetti $\{1,2,3\}$. Il suo peso totale è $3+1+1+s_1+s_2=9\le c$, e il valore ottimo è $v[2][9]=6+5+8-f_1-f_2=14$.
