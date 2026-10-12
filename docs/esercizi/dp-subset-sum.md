---
title: "Esercizi · PD per il problema del subset sum"
---

# Esercizi · PD per il problema del subset sum

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 20** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 20: Subset sum (SSP)](../programmazione-dinamica/dp-subset-sum.md) · [:material-file-pdf-box: Eserciziario, volume 3 (PDF)](../pdf/esercizi-3-programmazione-dinamica.pdf)

</div>

!!! formula "Ricorrenza usata in questi esercizi"

    L'algoritmo di PD del capitolo [«PD per il problema del subset sum»](../programmazione-dinamica/dp-subset-sum.md): $r(j,k)\in\{\textit{true},\textit{false}\}$ dice se il valore obiettivo $k$ è il peso totale di un sottoinsieme degli oggetti $1,2,\dots,j$, e

    $$
    r(j,k)= \left\{ \begin{array}{ll}
    \textit{true}  & \textrm{se $k=0$,}\\[2ex]
    \textit{false} & \textrm{se $j=0$ e $k\ge 1$,}\\[2ex]
    r(j-1,k) & \textrm{se $j,k\ge 1$ e $w_j>k$,}\\[2ex]
    r(j-1,k) \,\lor\, r(j-1,k-w_j) & \textrm{se $j,k\ge 1$ e $w_j\le k$.}
    \end{array} \right.
    $$

    La risposta è $r(n,c)$. La matrice $s$ memorizza $s[j][k]=1$ se l'oggetto $j$ è usato, cioè se $r[j-1][k]$ è <em>false</em> e $r[j-1][k-w_j]$ è <em>true</em>; un sottoinsieme si ricostruisce da $j=n$ e $k=c$ con $x_j\leftarrow s[j][k]$, $k\leftarrow k-s[j][k]\,w_j$.

<a id="esercizio-20-1"></a>

!!! esercizio "Esercizio 20.1: Esercizio 1: problema del subset sum"

    Consideriamo la seguente istanza dell'SSP, con valore obiettivo $c=7$ e $3$ oggetti di pesi:

    $$
    \begin{array}{l|rrr}
    \hline  & {j=1} & {j=2} & {j=3} \\
    \hline {w_j} & 2 & 3 & 5 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni passo, le celle $r[j][k]$ e $s[j][k]$; poi scrivere le matrici $r$ e $s$.

    2. Dare la risposta all'istanza dell'SSP e, se è sì, ricostruire dalla matrice $s$ un sottoinsieme di peso totale $c$, come vettore binario $(x_1,x_2,x_3)$.

    3. Usando l'ultima riga della matrice $r$, elencare tutti i valori obiettivo $k\in\{1,2,\dots,7\}$ raggiungibili con i 3 oggetti.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up. La riga $j=0$ è $r[0][0]=\mathrm{T}$ e $r[0][k]=\mathrm{F}$ per $k\ge 1$, con $s[0][k]=0$; $\mathrm{T}$ sta per <em>true</em> e $\mathrm{F}$ per <em>false</em>. L'oggetto $j$ è usato ($s[j][k]=1$) solo se $r[j-1][k]$ è $\mathrm{F}$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(r[j][k]\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_1=2>0\)</span>: <span class="arithmatex">\(r[0][0]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_1=2>1\)</span>: <span class="arithmatex">\(r[0][1]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[0][2]\lor r[0][0]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][3]\lor r[0][1]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][4]\lor r[0][2]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][5]\lor r[0][3]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][6]\lor r[0][4]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][7]\lor r[0][5]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=3>0\)</span>: <span class="arithmatex">\(r[1][0]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=3>1\)</span>: <span class="arithmatex">\(r[1][1]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=3>2\)</span>: <span class="arithmatex">\(r[1][2]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[1][3]\lor r[1][0]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[1][4]\lor r[1][1]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[1][5]\lor r[1][2]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[1][6]\lor r[1][3]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[1][7]\lor r[1][4]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        </table></div>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(r[j][k]\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=5>0\)</span>: <span class="arithmatex">\(r[2][0]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=5>1\)</span>: <span class="arithmatex">\(r[2][1]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=5>2\)</span>: <span class="arithmatex">\(r[2][2]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=5>3\)</span>: <span class="arithmatex">\(r[2][3]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=5>4\)</span>: <span class="arithmatex">\(r[2][4]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[2][5]\lor r[2][0]=\mathrm{T}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[2][6]\lor r[2][1]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[2][7]\lor r[2][2]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $r$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrr}
        \hline {r[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} \\
        \hline {j=0} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} \\
        {j=1} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} \\
        {j=2} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} \\
        {j=3} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} \\
        \hline {j=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {j=1} & {0} & {0} & {1} & {0} & {0} & {0} & {0} & {0} \\
        {j=2} & {0} & {0} & {0} & {1} & {0} & {1} & {0} & {0} \\
        {j=3} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {1} \\
        \hline
        \end{array}
        $$

    2. Poiché $r[3][7]=\mathrm{T}$, la risposta è <strong>sì</strong>. Partendo da $j=3$ e $k=7$:

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
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(x[3]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 7-5=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 0\)</span>, <span class="arithmatex">\(k=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 2-2=0\)</span></td>
        </tr>
        </table></div>

        Il vettore $(1,0,1)$ seleziona il sottoinsieme $\{1,3\}$, di peso totale $2+5=7=c$. È l'unico sottoinsieme con peso totale $7$.

    3. L'ultima riga $r[3][\cdot]$ è $\mathrm{T}$ esattamente per $k\in\{2,3,5,7\}$: questi sono i valori obiettivo raggiungibili. Gli altri valori in $\{1,2,\dots,7\}$ non sono il peso totale di alcun sottoinsieme.

<a id="esercizio-20-2"></a>

!!! esercizio "Esercizio 20.2: Esercizio 2: problema del subset sum"

    Consideriamo la seguente istanza dell'SSP, con valore obiettivo $c=9$ e $3$ oggetti di pesi:

    $$
    \begin{array}{l|rrr}
    \hline  & {j=1} & {j=2} & {j=3} \\
    \hline {w_j} & 3 & 4 & 6 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni passo, le celle $r[j][k]$ e $s[j][k]$; poi scrivere le matrici $r$ e $s$.

    2. Dare la risposta all'istanza dell'SSP e, se è sì, ricostruire dalla matrice $s$ un sottoinsieme di peso totale $c$, come vettore binario $(x_1,x_2,x_3)$.

    3. Usando l'ultima riga della matrice $r$, elencare tutti i valori obiettivo $k\in\{1,2,\dots,9\}$ raggiungibili con i 3 oggetti.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up. La riga $j=0$ è $r[0][0]=\mathrm{T}$ e $r[0][k]=\mathrm{F}$ per $k\ge 1$, con $s[0][k]=0$; $\mathrm{T}$ sta per <em>true</em> e $\mathrm{F}$ per <em>false</em>. L'oggetto $j$ è usato ($s[j][k]=1$) solo se $r[j-1][k]$ è $\mathrm{F}$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(r[j][k]\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_1=3>0\)</span>: <span class="arithmatex">\(r[0][0]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_1=3>1\)</span>: <span class="arithmatex">\(r[0][1]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_1=3>2\)</span>: <span class="arithmatex">\(r[0][2]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[0][3]\lor r[0][0]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][4]\lor r[0][1]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][5]\lor r[0][2]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][6]\lor r[0][3]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][7]\lor r[0][4]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][8]\lor r[0][5]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][9]\lor r[0][6]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=4>0\)</span>: <span class="arithmatex">\(r[1][0]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=4>1\)</span>: <span class="arithmatex">\(r[1][1]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=4>2\)</span>: <span class="arithmatex">\(r[1][2]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=4>3\)</span>: <span class="arithmatex">\(r[1][3]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[1][4]\lor r[1][0]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[1][5]\lor r[1][1]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[1][6]\lor r[1][2]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[1][7]\lor r[1][3]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[1][8]\lor r[1][4]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[1][9]\lor r[1][5]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        </table></div>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(r[j][k]\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=6>0\)</span>: <span class="arithmatex">\(r[2][0]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=6>1\)</span>: <span class="arithmatex">\(r[2][1]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=6>2\)</span>: <span class="arithmatex">\(r[2][2]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=6>3\)</span>: <span class="arithmatex">\(r[2][3]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=6>4\)</span>: <span class="arithmatex">\(r[2][4]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=6>5\)</span>: <span class="arithmatex">\(r[2][5]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[2][6]\lor r[2][0]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[2][7]\lor r[2][1]=\mathrm{T}\lor \mathrm{F}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[2][8]\lor r[2][2]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[2][9]\lor r[2][3]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $r$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrr}
        \hline {r[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} \\
        \hline {j=0} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} \\
        {j=1} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} \\
        {j=2} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} \\
        {j=3} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} \\
        \hline {j=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {j=1} & {0} & {0} & {0} & {1} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {j=2} & {0} & {0} & {0} & {0} & {1} & {0} & {0} & {1} & {0} & {0} \\
        {j=3} & {0} & {0} & {0} & {0} & {0} & {0} & {1} & {0} & {0} & {1} \\
        \hline
        \end{array}
        $$

    2. Poiché $r[3][9]=\mathrm{T}$, la risposta è <strong>sì</strong>. Partendo da $j=3$ e $k=9$:

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
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(x[3]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 9-6=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 0\)</span>, <span class="arithmatex">\(k=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 3-3=0\)</span></td>
        </tr>
        </table></div>

        Il vettore $(1,0,1)$ seleziona il sottoinsieme $\{1,3\}$, di peso totale $3+6=9=c$. È l'unico sottoinsieme con peso totale $9$.

    3. L'ultima riga $r[3][\cdot]$ è $\mathrm{T}$ esattamente per $k\in\{3,4,6,7,9\}$: questi sono i valori obiettivo raggiungibili. Gli altri valori in $\{1,2,\dots,9\}$ non sono il peso totale di alcun sottoinsieme.

<a id="esercizio-20-3"></a>

!!! esercizio "Esercizio 20.3: Esercizio 3: problema del subset sum"

    Consideriamo la seguente istanza dell'SSP, con valore obiettivo $c=7$ e $3$ oggetti di pesi:

    $$
    \begin{array}{l|rrr}
    \hline  & {j=1} & {j=2} & {j=3} \\
    \hline {w_j} & 2 & 4 & 6 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni passo, le celle $r[j][k]$ e $s[j][k]$; poi scrivere le matrici $r$ e $s$.

    2. Dare la risposta all'istanza dell'SSP e, se è sì, ricostruire dalla matrice $s$ un sottoinsieme di peso totale $c$, come vettore binario $(x_1,x_2,x_3)$.

    3. Usando l'ultima riga della matrice $r$, elencare tutti i valori obiettivo $k\in\{1,2,\dots,7\}$ raggiungibili con i 3 oggetti.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up. La riga $j=0$ è $r[0][0]=\mathrm{T}$ e $r[0][k]=\mathrm{F}$ per $k\ge 1$, con $s[0][k]=0$; $\mathrm{T}$ sta per <em>true</em> e $\mathrm{F}$ per <em>false</em>. L'oggetto $j$ è usato ($s[j][k]=1$) solo se $r[j-1][k]$ è $\mathrm{F}$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(r[j][k]\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_1=2>0\)</span>: <span class="arithmatex">\(r[0][0]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_1=2>1\)</span>: <span class="arithmatex">\(r[0][1]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[0][2]\lor r[0][0]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][3]\lor r[0][1]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][4]\lor r[0][2]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][5]\lor r[0][3]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][6]\lor r[0][4]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][7]\lor r[0][5]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=4>0\)</span>: <span class="arithmatex">\(r[1][0]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=4>1\)</span>: <span class="arithmatex">\(r[1][1]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=4>2\)</span>: <span class="arithmatex">\(r[1][2]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=4>3\)</span>: <span class="arithmatex">\(r[1][3]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[1][4]\lor r[1][0]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[1][5]\lor r[1][1]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[1][6]\lor r[1][2]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[1][7]\lor r[1][3]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        </table></div>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(r[j][k]\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=6>0\)</span>: <span class="arithmatex">\(r[2][0]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=6>1\)</span>: <span class="arithmatex">\(r[2][1]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=6>2\)</span>: <span class="arithmatex">\(r[2][2]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=6>3\)</span>: <span class="arithmatex">\(r[2][3]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=6>4\)</span>: <span class="arithmatex">\(r[2][4]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=6>5\)</span>: <span class="arithmatex">\(r[2][5]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[2][6]\lor r[2][0]=\mathrm{T}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[2][7]\lor r[2][1]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $r$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrr}
        \hline {r[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} \\
        \hline {j=0} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} \\
        {j=1} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} \\
        {j=2} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} \\
        {j=3} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} \\
        \hline {j=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {j=1} & {0} & {0} & {1} & {0} & {0} & {0} & {0} & {0} \\
        {j=2} & {0} & {0} & {0} & {0} & {1} & {0} & {1} & {0} \\
        {j=3} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        \hline
        \end{array}
        $$

    2. Poiché $r[3][7]=\mathrm{F}$, la risposta è <strong>no</strong>: nessun sottoinsieme degli oggetti ha peso totale $7$, e non c'è nulla da ricostruire. Infatti tutti i pesi $w=(2,4,6)$ sono pari, quindi ogni valore obiettivo raggiungibile è pari, mentre $c=7$ è dispari.

    3. L'ultima riga $r[3][\cdot]$ è $\mathrm{T}$ esattamente per $k\in\{2,4,6\}$: questi sono i valori obiettivo raggiungibili. Gli altri valori in $\{1,2,\dots,7\}$ non sono il peso totale di alcun sottoinsieme.

<a id="esercizio-20-4"></a>

!!! esercizio "Esercizio 20.4: Esercizio 4: problema del subset sum"

    Consideriamo la seguente istanza dell'SSP, con valore obiettivo $c=8$ e $4$ oggetti di pesi:

    $$
    \begin{array}{l|rrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\
    \hline {w_j} & 1 & 4 & 5 & 7 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni passo, le celle $r[j][k]$ e $s[j][k]$; poi scrivere le matrici $r$ e $s$.

    2. Dare la risposta all'istanza dell'SSP e, se è sì, ricostruire dalla matrice $s$ un sottoinsieme di peso totale $c$, come vettore binario $(x_1,x_2,x_3,x_4)$.

    3. Usando l'ultima riga della matrice $r$, elencare tutti i valori obiettivo $k\in\{1,2,\dots,8\}$ raggiungibili con i 4 oggetti.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up. La riga $j=0$ è $r[0][0]=\mathrm{T}$ e $r[0][k]=\mathrm{F}$ per $k\ge 1$, con $s[0][k]=0$; $\mathrm{T}$ sta per <em>true</em> e $\mathrm{F}$ per <em>false</em>. L'oggetto $j$ è usato ($s[j][k]=1$) solo se $r[j-1][k]$ è $\mathrm{F}$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(r[j][k]\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_1=1>0\)</span>: <span class="arithmatex">\(r[0][0]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[0][1]\lor r[0][0]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][2]\lor r[0][1]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][3]\lor r[0][2]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][4]\lor r[0][3]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][5]\lor r[0][4]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][6]\lor r[0][5]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][7]\lor r[0][6]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][8]\lor r[0][7]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=4>0\)</span>: <span class="arithmatex">\(r[1][0]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=4>1\)</span>: <span class="arithmatex">\(r[1][1]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=4>2\)</span>: <span class="arithmatex">\(r[1][2]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=4>3\)</span>: <span class="arithmatex">\(r[1][3]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[1][4]\lor r[1][0]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[1][5]\lor r[1][1]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[1][6]\lor r[1][2]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[1][7]\lor r[1][3]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[1][8]\lor r[1][4]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        </table></div>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(r[j][k]\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=5>0\)</span>: <span class="arithmatex">\(r[2][0]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=5>1\)</span>: <span class="arithmatex">\(r[2][1]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=5>2\)</span>: <span class="arithmatex">\(r[2][2]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=5>3\)</span>: <span class="arithmatex">\(r[2][3]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=5>4\)</span>: <span class="arithmatex">\(r[2][4]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[2][5]\lor r[2][0]=\mathrm{T}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[2][6]\lor r[2][1]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[2][7]\lor r[2][2]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[2][8]\lor r[2][3]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_4=7>0\)</span>: <span class="arithmatex">\(r[3][0]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_4=7>1\)</span>: <span class="arithmatex">\(r[3][1]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_4=7>2\)</span>: <span class="arithmatex">\(r[3][2]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_4=7>3\)</span>: <span class="arithmatex">\(r[3][3]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_4=7>4\)</span>: <span class="arithmatex">\(r[3][4]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_4=7>5\)</span>: <span class="arithmatex">\(r[3][5]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_4=7>6\)</span>: <span class="arithmatex">\(r[3][6]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[3][7]\lor r[3][0]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[3][8]\lor r[3][1]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $r$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrr}
        \hline {r[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} \\
        \hline {j=0} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} \\
        {j=1} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} \\
        {j=2} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} \\
        {j=3} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} \\
        {j=4} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{T}} \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} \\
        \hline {j=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {j=1} & {0} & {1} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {j=2} & {0} & {0} & {0} & {0} & {1} & {1} & {0} & {0} & {0} \\
        {j=3} & {0} & {0} & {0} & {0} & {0} & {0} & {1} & {0} & {0} \\
        {j=4} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {1} & {1} \\
        \hline
        \end{array}
        $$

    2. Poiché $r[4][8]=\mathrm{T}$, la risposta è <strong>sì</strong>. Partendo da $j=4$ e $k=8$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
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
        <td><span class="arithmatex">\(k=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(x[4]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 8-7=1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[3]\leftarrow 0\)</span>, <span class="arithmatex">\(k=1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>0</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 0\)</span>, <span class="arithmatex">\(k=1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 1-1=0\)</span></td>
        </tr>
        </table></div>

        Il vettore $(1,0,0,1)$ seleziona il sottoinsieme $\{1,4\}$, di peso totale $1+7=8=c$. È l'unico sottoinsieme con peso totale $8$.

    3. L'ultima riga $r[4][\cdot]$ è $\mathrm{T}$ esattamente per $k\in\{1,4,5,6,7,8\}$: questi sono i valori obiettivo raggiungibili. Gli altri valori in $\{1,2,\dots,8\}$ non sono il peso totale di alcun sottoinsieme.

<a id="esercizio-20-5"></a>

!!! esercizio "Esercizio 20.5: Esercizio 5: problema del subset sum"

    Consideriamo la seguente istanza dell'SSP, con valore obiettivo $c=8$ e $4$ oggetti di pesi:

    $$
    \begin{array}{l|rrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\
    \hline {w_j} & 2 & 5 & 6 & 7 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni passo, le celle $r[j][k]$ e $s[j][k]$; poi scrivere le matrici $r$ e $s$.

    2. Dare la risposta all'istanza dell'SSP e, se è sì, ricostruire dalla matrice $s$ un sottoinsieme di peso totale $c$, come vettore binario $(x_1,x_2,x_3,x_4)$.

    3. Usando l'ultima riga della matrice $r$, elencare tutti i valori obiettivo $k\in\{1,2,\dots,8\}$ raggiungibili con i 4 oggetti.

??? soluzione "Soluzione"

    La ricorrenza e le convenzioni sono quelle del box all'inizio di questi esercizi.

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up. La riga $j=0$ è $r[0][0]=\mathrm{T}$ e $r[0][k]=\mathrm{F}$ per $k\ge 1$, con $s[0][k]=0$; $\mathrm{T}$ sta per <em>true</em> e $\mathrm{F}$ per <em>false</em>. L'oggetto $j$ è usato ($s[j][k]=1$) solo se $r[j-1][k]$ è $\mathrm{F}$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(r[j][k]\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_1=2>0\)</span>: <span class="arithmatex">\(r[0][0]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_1=2>1\)</span>: <span class="arithmatex">\(r[0][1]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[0][2]\lor r[0][0]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][3]\lor r[0][1]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][4]\lor r[0][2]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][5]\lor r[0][3]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][6]\lor r[0][4]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][7]\lor r[0][5]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][8]\lor r[0][6]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=5>0\)</span>: <span class="arithmatex">\(r[1][0]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=5>1\)</span>: <span class="arithmatex">\(r[1][1]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=5>2\)</span>: <span class="arithmatex">\(r[1][2]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=5>3\)</span>: <span class="arithmatex">\(r[1][3]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=5>4\)</span>: <span class="arithmatex">\(r[1][4]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[1][5]\lor r[1][0]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[1][6]\lor r[1][1]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[1][7]\lor r[1][2]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[1][8]\lor r[1][3]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        </table></div>

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(r[j][k]\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=6>0\)</span>: <span class="arithmatex">\(r[2][0]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=6>1\)</span>: <span class="arithmatex">\(r[2][1]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=6>2\)</span>: <span class="arithmatex">\(r[2][2]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=6>3\)</span>: <span class="arithmatex">\(r[2][3]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=6>4\)</span>: <span class="arithmatex">\(r[2][4]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=6>5\)</span>: <span class="arithmatex">\(r[2][5]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[2][6]\lor r[2][0]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[2][7]\lor r[2][1]=\mathrm{T}\lor \mathrm{F}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[2][8]\lor r[2][2]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_4=7>0\)</span>: <span class="arithmatex">\(r[3][0]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_4=7>1\)</span>: <span class="arithmatex">\(r[3][1]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_4=7>2\)</span>: <span class="arithmatex">\(r[3][2]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_4=7>3\)</span>: <span class="arithmatex">\(r[3][3]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_4=7>4\)</span>: <span class="arithmatex">\(r[3][4]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_4=7>5\)</span>: <span class="arithmatex">\(r[3][5]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_4=7>6\)</span>: <span class="arithmatex">\(r[3][6]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[3][7]\lor r[3][0]=\mathrm{T}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[3][8]\lor r[3][1]=\mathrm{T}\lor \mathrm{F}=\mathrm{T}\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $r$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrr}
        \hline {r[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} \\
        \hline {j=0} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} \\
        {j=1} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} \\
        {j=2} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} \\
        {j=3} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{T}} \\
        {j=4} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{T}} \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} \\
        \hline {j=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {j=1} & {0} & {0} & {1} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {j=2} & {0} & {0} & {0} & {0} & {0} & {1} & {0} & {1} & {0} \\
        {j=3} & {0} & {0} & {0} & {0} & {0} & {0} & {1} & {0} & {1} \\
        {j=4} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        \hline
        \end{array}
        $$

    2. Poiché $r[4][8]=\mathrm{T}$, la risposta è <strong>sì</strong>. Partendo da $j=4$ e $k=8$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(s[j][k]\)</span></th>
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
        <td><span class="arithmatex">\(k=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">\(x[4]\leftarrow 0\)</span>, <span class="arithmatex">\(k=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[3]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 8-6=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 0\)</span>, <span class="arithmatex">\(k=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 2-2=0\)</span></td>
        </tr>
        </table></div>

        Il vettore $(1,0,1,0)$ seleziona il sottoinsieme $\{1,3\}$, di peso totale $2+6=8=c$. È l'unico sottoinsieme con peso totale $8$.

    3. L'ultima riga $r[4][\cdot]$ è $\mathrm{T}$ esattamente per $k\in\{2,5,6,7,8\}$: questi sono i valori obiettivo raggiungibili. Gli altri valori in $\{1,2,\dots,8\}$ non sono il peso totale di alcun sottoinsieme.
