---
title: "Esercizi · PD per il problema dello zaino illimitato"
---

# Esercizi · PD per il problema dello zaino illimitato

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 18** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 18: Zaino illimitato (UKP)](../programmazione-dinamica/dp-unbounded-knapsack/index.md) · [:material-file-pdf-box: Eserciziario, volume 3 (PDF)](../pdf/esercizi-3-programmazione-dinamica.pdf)

</div>

<a id="esercizio-18-1"></a>

!!! esercizio "Esercizio 18.1: I due algoritmi di PD per l'UKP (4 tipi di oggetto, $c=7$)"

    Consideriamo la seguente istanza dell'UKP, in cui lo zaino ha capacità $c=7$, ogni tipo di oggetto è disponibile in infinite copie e i profitti e i pesi dei tipi di oggetto sono:

    $$
    \begin{array}{l|rrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\
    \hline {p_j} & 4 & 5 & 10 & 11 \\
    {w_j} & 2 & 3 & 5 & 6 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione del primo algoritmo di PD bottom-up riportando, per ogni iterazione, i valori del vettore $v$ e i valori del vettore $s$.

    2. Usando il vettore $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2,\dots,x_n)$ e riportare il valore ottimo.

    3. Mostrare l'esecuzione del secondo algoritmo di PD bottom-up riportando, per ogni iterazione, i valori delle matrici $v$ e $s$.

    4. Usando la matrice $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2,\dots,x_n)$ e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo del primo algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $k$ e $j$, le celle $v[k]$ e $s[k]$, il valore corrente di $m$, il valore corrente di $t$ e l'operazione eseguita.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(v[k]\)</span></th>
        <th><span class="arithmatex">\(s[k]\)</span></th>
        <th><span class="arithmatex">\(m\)</span></th>
        <th><span class="arithmatex">\(t\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(v[0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[1]=2>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[2]=3>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[3]=5>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[4]=6>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">0</td>
        <td class="cella-blu">0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[1]\leftarrow 0\)</span>, <span class="arithmatex">\(s[1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[0]=4+0=4>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 4\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[2]=3>k=2\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[3]=5>k=2\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[4]=6>k=2\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">1</td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[2]\leftarrow 4\)</span>, <span class="arithmatex">\(s[2]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1]=4+0=4>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 4\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>5</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[2]+v[0]=5+0=5>m=4\)</span>: <span class="arithmatex">\(m\leftarrow 5\)</span>, <span class="arithmatex">\(t\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>5</td>
        <td>2</td>
        <td><span class="arithmatex">\(w[3]=5>k=3\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>5</td>
        <td>2</td>
        <td><span class="arithmatex">\(w[4]=6>k=3\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">2</td>
        <td>5</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[3]\leftarrow 5\)</span>, <span class="arithmatex">\(s[3]\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[2]=4+4=8>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 8\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[1]=5+0=5\le m=8\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[3]=5>k=4\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>4</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[4]=6>k=4\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">8</td>
        <td class="cella-blu">1</td>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[4]\leftarrow 8\)</span>, <span class="arithmatex">\(s[4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[3]=4+5=9>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 9\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2]=5+4=9\le m=9\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>5</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>3</td>
        <td><span class="arithmatex">\(p[3]+v[0]=10+0=10>m=9\)</span>: <span class="arithmatex">\(m\leftarrow 10\)</span>, <span class="arithmatex">\(t\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>3</td>
        <td><span class="arithmatex">\(w[4]=6>k=5\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">3</td>
        <td>10</td>
        <td>3</td>
        <td><span class="arithmatex">\(v[5]\leftarrow 10\)</span>, <span class="arithmatex">\(s[5]\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[4]=4+8=12>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 12\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[3]=5+5=10\le m=12\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>6</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[1]=10+0=10\le m=12\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>6</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[4]+v[0]=11+0=11\le m=12\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>6</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">12</td>
        <td class="cella-blu">1</td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[6]\leftarrow 12\)</span>, <span class="arithmatex">\(s[6]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>14</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[5]=4+10=14>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 14\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>14</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[4]=5+8=13\le m=14\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>7</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>14</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[2]=10+4=14\le m=14\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>7</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>14</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[4]+v[1]=11+0=11\le m=14\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>7</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">14</td>
        <td class="cella-blu">1</td>
        <td>14</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[7]\leftarrow 14\)</span>, <span class="arithmatex">\(s[7]\leftarrow 1\)</span></td>
        </tr>
        </table></div>

        Questo è il vettore $v$ dopo l'esecuzione del primo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrr}
        \hline  & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} \\
        \hline {v[k]} & 0 & 0 & 4 & 5 & 8 & 10 & 12 & 14 \\
        \hline
        \end{array}
        $$

        Questo è il vettore $s$ dopo l'esecuzione del primo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrr}
        \hline  & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} \\
        \hline {s[k]} & 0 & 0 & 1 & 2 & 1 & 3 & 1 & 1 \\
        \hline
        \end{array}
        $$

    2. Abbiamo il seguente vettore $s$:

        $$
        \begin{array}{l|rrrrrrrr}
        \hline  & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} \\
        \hline {s[k]} & 0 & 0 & 1 & 2 & 1 & 3 & 1 & 1 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima partendo da $k=7$ come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(s[k]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=7\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>7</td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 7-2=5\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td>3</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[3]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 5-5=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (1,0,1,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[7]=14.
        $$

    3. Esecuzione passo per passo del secondo algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $j$ e $k$, le celle $v[j][k]$ e $s[j][k]$ e l'operazione eseguita. Tutte le celle della riga $j=0$ sono inizializzate a $0$.

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
        <td><span class="arithmatex">\(k<w[1]\)</span>: <span class="arithmatex">\(v[1][0]\leftarrow v[0][0]=0\)</span>, <span class="arithmatex">\(s[1][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[1]\)</span>: <span class="arithmatex">\(v[1][1]\leftarrow v[0][1]=0\)</span>, <span class="arithmatex">\(s[1][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][0]=4+0>v[0][2]=0\)</span>: <span class="arithmatex">\(v[1][2]\leftarrow 4\)</span>, <span class="arithmatex">\(s[1][2]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][1]=4+0>v[0][3]=0\)</span>: <span class="arithmatex">\(v[1][3]\leftarrow 4\)</span>, <span class="arithmatex">\(s[1][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][2]=4+4>v[0][4]=0\)</span>: <span class="arithmatex">\(v[1][4]\leftarrow 8\)</span>, <span class="arithmatex">\(s[1][4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][3]=4+4>v[0][5]=0\)</span>: <span class="arithmatex">\(v[1][5]\leftarrow 8\)</span>, <span class="arithmatex">\(s[1][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>6</td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][4]=4+8>v[0][6]=0\)</span>: <span class="arithmatex">\(v[1][6]\leftarrow 12\)</span>, <span class="arithmatex">\(s[1][6]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>7</td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][5]=4+8>v[0][7]=0\)</span>: <span class="arithmatex">\(v[1][7]\leftarrow 12\)</span>, <span class="arithmatex">\(s[1][7]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[2]\)</span>: <span class="arithmatex">\(v[2][0]\leftarrow v[1][0]=0\)</span>, <span class="arithmatex">\(s[2][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[2]\)</span>: <span class="arithmatex">\(v[2][1]\leftarrow v[1][1]=0\)</span>, <span class="arithmatex">\(s[2][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>4</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[2]\)</span>: <span class="arithmatex">\(v[2][2]\leftarrow v[1][2]=4\)</span>, <span class="arithmatex">\(s[2][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][0]=5+0>v[1][3]=4\)</span>: <span class="arithmatex">\(v[2][3]\leftarrow 5\)</span>, <span class="arithmatex">\(s[2][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>8</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[2]+v[2][1]=5+0\le v[1][4]=8\)</span>: <span class="arithmatex">\(v[2][4]\leftarrow 8\)</span>, <span class="arithmatex">\(s[2][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][2]=5+4>v[1][5]=8\)</span>: <span class="arithmatex">\(v[2][5]\leftarrow 9\)</span>, <span class="arithmatex">\(s[2][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>6</td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[2]+v[2][3]=5+5\le v[1][6]=12\)</span>: <span class="arithmatex">\(v[2][6]\leftarrow 12\)</span>, <span class="arithmatex">\(s[2][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>7</td>
        <td>13</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][4]=5+8>v[1][7]=12\)</span>: <span class="arithmatex">\(v[2][7]\leftarrow 13\)</span>, <span class="arithmatex">\(s[2][7]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][0]\leftarrow v[2][0]=0\)</span>, <span class="arithmatex">\(s[3][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][1]\leftarrow v[2][1]=0\)</span>, <span class="arithmatex">\(s[3][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td>4</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][2]\leftarrow v[2][2]=4\)</span>, <span class="arithmatex">\(s[3][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][3]\leftarrow v[2][3]=5\)</span>, <span class="arithmatex">\(s[3][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>8</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][4]\leftarrow v[2][4]=8\)</span>, <span class="arithmatex">\(s[3][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>5</td>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[3][0]=10+0>v[2][5]=9\)</span>: <span class="arithmatex">\(v[3][5]\leftarrow 10\)</span>, <span class="arithmatex">\(s[3][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>6</td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][1]=10+0\le v[2][6]=12\)</span>: <span class="arithmatex">\(v[3][6]\leftarrow 12\)</span>, <span class="arithmatex">\(s[3][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>7</td>
        <td>14</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[3][2]=10+4>v[2][7]=13\)</span>: <span class="arithmatex">\(v[3][7]\leftarrow 14\)</span>, <span class="arithmatex">\(s[3][7]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][0]\leftarrow v[3][0]=0\)</span>, <span class="arithmatex">\(s[4][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][1]\leftarrow v[3][1]=0\)</span>, <span class="arithmatex">\(s[4][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>2</td>
        <td>4</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][2]\leftarrow v[3][2]=4\)</span>, <span class="arithmatex">\(s[4][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][3]\leftarrow v[3][3]=5\)</span>, <span class="arithmatex">\(s[4][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>4</td>
        <td>8</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][4]\leftarrow v[3][4]=8\)</span>, <span class="arithmatex">\(s[4][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][5]\leftarrow v[3][5]=10\)</span>, <span class="arithmatex">\(s[4][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>6</td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+v[4][0]=11+0\le v[3][6]=12\)</span>: <span class="arithmatex">\(v[4][6]\leftarrow 12\)</span>, <span class="arithmatex">\(s[4][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>7</td>
        <td>14</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+v[4][1]=11+0\le v[3][7]=14\)</span>: <span class="arithmatex">\(v[4][7]\leftarrow 14\)</span>, <span class="arithmatex">\(s[4][7]\leftarrow 0\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $v$ dopo l'esecuzione del secondo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrr}
        \hline {v[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 4 & 4 & 8 & 8 & 12 & 12 \\
        {j=2} & 0 & 0 & 4 & 5 & 8 & 9 & 12 & 13 \\
        {j=3} & 0 & 0 & 4 & 5 & 8 & 10 & 12 & 14 \\
        {j=4} & 0 & 0 & 4 & 5 & 8 & 10 & 12 & 14 \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione del secondo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 1 & 1 & 1 & 1 & 1 & 1 \\
        {j=2} & 0 & 0 & 0 & 1 & 0 & 1 & 0 & 1 \\
        {j=3} & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 1 \\
        {j=4} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        \hline
        \end{array}
        $$

    4. Abbiamo la seguente matrice $s$:

        $$
        \begin{array}{l|rrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 1 & 1 & 1 & 1 & 1 & 1 \\
        {j=2} & 0 & 0 & 0 & 1 & 0 & 1 & 0 & 1 \\
        {j=3} & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 1 \\
        {j=4} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima partendo da $j=4$ e $k=7$ come segue:

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
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=4\)</span>, <span class="arithmatex">\(k=7\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td>7</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[3]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 7-5=2\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>2</td>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 2-2=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (1,0,1,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[4][7]=14.
        $$

<a id="esercizio-18-2"></a>

!!! esercizio "Esercizio 18.2: I due algoritmi di PD per l'UKP (5 tipi di oggetto, $c=8$)"

    Consideriamo la seguente istanza dell'UKP, in cui lo zaino ha capacità $c=8$, ogni tipo di oggetto è disponibile in infinite copie e i profitti e i pesi dei tipi di oggetto sono:

    $$
    \begin{array}{l|rrrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\
    \hline {p_j} & 2 & 5 & 7 & 8 & 10 \\
    {w_j} & 1 & 2 & 3 & 4 & 5 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione del primo algoritmo di PD bottom-up riportando, per ogni iterazione, i valori del vettore $v$ e i valori del vettore $s$.

    2. Usando il vettore $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2,\dots,x_n)$ e riportare il valore ottimo.

    3. Mostrare l'esecuzione del secondo algoritmo di PD bottom-up riportando, per ogni iterazione, i valori delle matrici $v$ e $s$.

    4. Usando la matrice $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2,\dots,x_n)$ e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo del primo algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $k$ e $j$, le celle $v[k]$ e $s[k]$, il valore corrente di $m$, il valore corrente di $t$ e l'operazione eseguita.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(v[k]\)</span></th>
        <th><span class="arithmatex">\(s[k]\)</span></th>
        <th><span class="arithmatex">\(m\)</span></th>
        <th><span class="arithmatex">\(t\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(v[0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[0]=2+0=2>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 2\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[2]=2>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[3]=3>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[4]=4>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[5]=5>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">1</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[1]\leftarrow 2\)</span>, <span class="arithmatex">\(s[1]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1]=2+2=4>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 4\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>5</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[2]+v[0]=5+0=5>m=4\)</span>: <span class="arithmatex">\(m\leftarrow 5\)</span>, <span class="arithmatex">\(t\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>5</td>
        <td>2</td>
        <td><span class="arithmatex">\(w[3]=3>k=2\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>5</td>
        <td>2</td>
        <td><span class="arithmatex">\(w[4]=4>k=2\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>5</td>
        <td>2</td>
        <td><span class="arithmatex">\(w[5]=5>k=2\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">2</td>
        <td>5</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[2]\leftarrow 5\)</span>, <span class="arithmatex">\(s[2]\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>7</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[2]=2+5=7>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 7\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>7</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[1]=5+2=7\le m=7\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>7</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[0]=7+0=7\le m=7\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>7</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[4]=4>k=3\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>3</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>7</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[5]=5>k=3\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">1</td>
        <td>7</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[3]\leftarrow 7\)</span>, <span class="arithmatex">\(s[3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[3]=2+7=9>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 9\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[2]+v[2]=5+5=10>m=9\)</span>: <span class="arithmatex">\(m\leftarrow 10\)</span>, <span class="arithmatex">\(t\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[3]+v[1]=7+2=9\le m=10\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>4</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[4]+v[0]=8+0=8\le m=10\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(w[5]=5>k=4\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">2</td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[4]\leftarrow 10\)</span>, <span class="arithmatex">\(s[4]\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[4]=2+10=12>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 12\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[3]=5+7=12\le m=12\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>5</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[2]=7+5=12\le m=12\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>5</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[4]+v[1]=8+2=10\le m=12\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>5</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[5]+v[0]=10+0=10\le m=12\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">12</td>
        <td class="cella-blu">1</td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[5]\leftarrow 12\)</span>, <span class="arithmatex">\(s[5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>14</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[5]=2+12=14>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 14\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[2]+v[4]=5+10=15>m=14\)</span>: <span class="arithmatex">\(m\leftarrow 15\)</span>, <span class="arithmatex">\(t\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[3]+v[3]=7+7=14\le m=15\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>6</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[4]+v[2]=8+5=13\le m=15\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>6</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[5]+v[1]=10+2=12\le m=15\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>6</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">15</td>
        <td class="cella-blu">2</td>
        <td>15</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[6]\leftarrow 15\)</span>, <span class="arithmatex">\(s[6]\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>17</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[6]=2+15=17>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 17\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>17</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[5]=5+12=17\le m=17\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>7</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>17</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[4]=7+10=17\le m=17\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>7</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>17</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[4]+v[3]=8+7=15\le m=17\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>7</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>17</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[5]+v[2]=10+5=15\le m=17\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>7</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">17</td>
        <td class="cella-blu">1</td>
        <td>17</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[7]\leftarrow 17\)</span>, <span class="arithmatex">\(s[7]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>19</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[7]=2+17=19>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 19\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>20</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[2]+v[6]=5+15=20>m=19\)</span>: <span class="arithmatex">\(m\leftarrow 20\)</span>, <span class="arithmatex">\(t\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>20</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[3]+v[5]=7+12=19\le m=20\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>8</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>20</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[4]+v[4]=8+10=18\le m=20\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>8</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>20</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[5]+v[3]=10+7=17\le m=20\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>8</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">20</td>
        <td class="cella-blu">2</td>
        <td>20</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[8]\leftarrow 20\)</span>, <span class="arithmatex">\(s[8]\leftarrow 2\)</span></td>
        </tr>
        </table></div>

        Questo è il vettore $v$ dopo l'esecuzione del primo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrr}
        \hline  & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} \\
        \hline {v[k]} & 0 & 2 & 5 & 7 & 10 & 12 & 15 & 17 & 20 \\
        \hline
        \end{array}
        $$

        Questo è il vettore $s$ dopo l'esecuzione del primo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrr}
        \hline  & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} \\
        \hline {s[k]} & 0 & 1 & 2 & 1 & 2 & 1 & 2 & 1 & 2 \\
        \hline
        \end{array}
        $$

    2. Abbiamo il seguente vettore $s$:

        $$
        \begin{array}{l|rrrrrrrrr}
        \hline  & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} \\
        \hline {s[k]} & 0 & 1 & 2 & 1 & 2 & 1 & 2 & 1 & 2 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima partendo da $k=8$ come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(s[k]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th><span class="arithmatex">\(x[5]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=8\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>8</td>
        <td>2</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 8-2=6\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>6</td>
        <td>2</td>
        <td>0</td>
        <td class="cella-blu">2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 2\)</span>, <span class="arithmatex">\(k\leftarrow 6-2=4\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>2</td>
        <td>0</td>
        <td class="cella-blu">3</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 3\)</span>, <span class="arithmatex">\(k\leftarrow 4-2=2\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>2</td>
        <td>2</td>
        <td>0</td>
        <td class="cella-blu">4</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 4\)</span>, <span class="arithmatex">\(k\leftarrow 2-2=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (0,4,0,0,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[8]=20.
        $$

    3. Esecuzione passo per passo del secondo algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $j$ e $k$, le celle $v[j][k]$ e $s[j][k]$ e l'operazione eseguita. Tutte le celle della riga $j=0$ sono inizializzate a $0$.

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
        <td><span class="arithmatex">\(k<w[1]\)</span>: <span class="arithmatex">\(v[1][0]\leftarrow v[0][0]=0\)</span>, <span class="arithmatex">\(s[1][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][0]=2+0>v[0][1]=0\)</span>: <span class="arithmatex">\(v[1][1]\leftarrow 2\)</span>, <span class="arithmatex">\(s[1][1]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][1]=2+2>v[0][2]=0\)</span>: <span class="arithmatex">\(v[1][2]\leftarrow 4\)</span>, <span class="arithmatex">\(s[1][2]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][2]=2+4>v[0][3]=0\)</span>: <span class="arithmatex">\(v[1][3]\leftarrow 6\)</span>, <span class="arithmatex">\(s[1][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][3]=2+6>v[0][4]=0\)</span>: <span class="arithmatex">\(v[1][4]\leftarrow 8\)</span>, <span class="arithmatex">\(s[1][4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][4]=2+8>v[0][5]=0\)</span>: <span class="arithmatex">\(v[1][5]\leftarrow 10\)</span>, <span class="arithmatex">\(s[1][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>6</td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][5]=2+10>v[0][6]=0\)</span>: <span class="arithmatex">\(v[1][6]\leftarrow 12\)</span>, <span class="arithmatex">\(s[1][6]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>7</td>
        <td>14</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][6]=2+12>v[0][7]=0\)</span>: <span class="arithmatex">\(v[1][7]\leftarrow 14\)</span>, <span class="arithmatex">\(s[1][7]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>8</td>
        <td>16</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][7]=2+14>v[0][8]=0\)</span>: <span class="arithmatex">\(v[1][8]\leftarrow 16\)</span>, <span class="arithmatex">\(s[1][8]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[2]\)</span>: <span class="arithmatex">\(v[2][0]\leftarrow v[1][0]=0\)</span>, <span class="arithmatex">\(s[2][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td>2</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[2]\)</span>: <span class="arithmatex">\(v[2][1]\leftarrow v[1][1]=2\)</span>, <span class="arithmatex">\(s[2][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][0]=5+0>v[1][2]=4\)</span>: <span class="arithmatex">\(v[2][2]\leftarrow 5\)</span>, <span class="arithmatex">\(s[2][2]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>7</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][1]=5+2>v[1][3]=6\)</span>: <span class="arithmatex">\(v[2][3]\leftarrow 7\)</span>, <span class="arithmatex">\(s[2][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][2]=5+5>v[1][4]=8\)</span>: <span class="arithmatex">\(v[2][4]\leftarrow 10\)</span>, <span class="arithmatex">\(s[2][4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][3]=5+7>v[1][5]=10\)</span>: <span class="arithmatex">\(v[2][5]\leftarrow 12\)</span>, <span class="arithmatex">\(s[2][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>6</td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][4]=5+10>v[1][6]=12\)</span>: <span class="arithmatex">\(v[2][6]\leftarrow 15\)</span>, <span class="arithmatex">\(s[2][6]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>7</td>
        <td>17</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][5]=5+12>v[1][7]=14\)</span>: <span class="arithmatex">\(v[2][7]\leftarrow 17\)</span>, <span class="arithmatex">\(s[2][7]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>8</td>
        <td>20</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][6]=5+15>v[1][8]=16\)</span>: <span class="arithmatex">\(v[2][8]\leftarrow 20\)</span>, <span class="arithmatex">\(s[2][8]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][0]\leftarrow v[2][0]=0\)</span>, <span class="arithmatex">\(s[3][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][1]\leftarrow v[2][1]=2\)</span>, <span class="arithmatex">\(s[3][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][2]\leftarrow v[2][2]=5\)</span>, <span class="arithmatex">\(s[3][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>7</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][0]=7+0\le v[2][3]=7\)</span>: <span class="arithmatex">\(v[3][3]\leftarrow 7\)</span>, <span class="arithmatex">\(s[3][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][1]=7+2\le v[2][4]=10\)</span>: <span class="arithmatex">\(v[3][4]\leftarrow 10\)</span>, <span class="arithmatex">\(s[3][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>5</td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][2]=7+5\le v[2][5]=12\)</span>: <span class="arithmatex">\(v[3][5]\leftarrow 12\)</span>, <span class="arithmatex">\(s[3][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>6</td>
        <td>15</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][3]=7+7\le v[2][6]=15\)</span>: <span class="arithmatex">\(v[3][6]\leftarrow 15\)</span>, <span class="arithmatex">\(s[3][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>7</td>
        <td>17</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][4]=7+10\le v[2][7]=17\)</span>: <span class="arithmatex">\(v[3][7]\leftarrow 17\)</span>, <span class="arithmatex">\(s[3][7]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>8</td>
        <td>20</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][5]=7+12\le v[2][8]=20\)</span>: <span class="arithmatex">\(v[3][8]\leftarrow 20\)</span>, <span class="arithmatex">\(s[3][8]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][0]\leftarrow v[3][0]=0\)</span>, <span class="arithmatex">\(s[4][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][1]\leftarrow v[3][1]=2\)</span>, <span class="arithmatex">\(s[4][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>2</td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][2]\leftarrow v[3][2]=5\)</span>, <span class="arithmatex">\(s[4][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td>7</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][3]\leftarrow v[3][3]=7\)</span>, <span class="arithmatex">\(s[4][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>4</td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+v[4][0]=8+0\le v[3][4]=10\)</span>: <span class="arithmatex">\(v[4][4]\leftarrow 10\)</span>, <span class="arithmatex">\(s[4][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+v[4][1]=8+2\le v[3][5]=12\)</span>: <span class="arithmatex">\(v[4][5]\leftarrow 12\)</span>, <span class="arithmatex">\(s[4][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>6</td>
        <td>15</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+v[4][2]=8+5\le v[3][6]=15\)</span>: <span class="arithmatex">\(v[4][6]\leftarrow 15\)</span>, <span class="arithmatex">\(s[4][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>7</td>
        <td>17</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+v[4][3]=8+7\le v[3][7]=17\)</span>: <span class="arithmatex">\(v[4][7]\leftarrow 17\)</span>, <span class="arithmatex">\(s[4][7]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>8</td>
        <td>20</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+v[4][4]=8+10\le v[3][8]=20\)</span>: <span class="arithmatex">\(v[4][8]\leftarrow 20\)</span>, <span class="arithmatex">\(s[4][8]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[5]\)</span>: <span class="arithmatex">\(v[5][0]\leftarrow v[4][0]=0\)</span>, <span class="arithmatex">\(s[5][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[5]\)</span>: <span class="arithmatex">\(v[5][1]\leftarrow v[4][1]=2\)</span>, <span class="arithmatex">\(s[5][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>2</td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[5]\)</span>: <span class="arithmatex">\(v[5][2]\leftarrow v[4][2]=5\)</span>, <span class="arithmatex">\(s[5][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>3</td>
        <td>7</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[5]\)</span>: <span class="arithmatex">\(v[5][3]\leftarrow v[4][3]=7\)</span>, <span class="arithmatex">\(s[5][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>4</td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[5]\)</span>: <span class="arithmatex">\(v[5][4]\leftarrow v[4][4]=10\)</span>, <span class="arithmatex">\(s[5][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>5</td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[5]+v[5][0]=10+0\le v[4][5]=12\)</span>: <span class="arithmatex">\(v[5][5]\leftarrow 12\)</span>, <span class="arithmatex">\(s[5][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>6</td>
        <td>15</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[5]+v[5][1]=10+2\le v[4][6]=15\)</span>: <span class="arithmatex">\(v[5][6]\leftarrow 15\)</span>, <span class="arithmatex">\(s[5][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>7</td>
        <td>17</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[5]+v[5][2]=10+5\le v[4][7]=17\)</span>: <span class="arithmatex">\(v[5][7]\leftarrow 17\)</span>, <span class="arithmatex">\(s[5][7]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>8</td>
        <td>20</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[5]+v[5][3]=10+7\le v[4][8]=20\)</span>: <span class="arithmatex">\(v[5][8]\leftarrow 20\)</span>, <span class="arithmatex">\(s[5][8]\leftarrow 0\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $v$ dopo l'esecuzione del secondo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrr}
        \hline {v[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 2 & 4 & 6 & 8 & 10 & 12 & 14 & 16 \\
        {j=2} & 0 & 2 & 5 & 7 & 10 & 12 & 15 & 17 & 20 \\
        {j=3} & 0 & 2 & 5 & 7 & 10 & 12 & 15 & 17 & 20 \\
        {j=4} & 0 & 2 & 5 & 7 & 10 & 12 & 15 & 17 & 20 \\
        {j=5} & 0 & 2 & 5 & 7 & 10 & 12 & 15 & 17 & 20 \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione del secondo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 1 & 1 & 1 & 1 & 1 & 1 & 1 & 1 \\
        {j=2} & 0 & 0 & 1 & 1 & 1 & 1 & 1 & 1 & 1 \\
        {j=3} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=4} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=5} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        \hline
        \end{array}
        $$

    4. Abbiamo la seguente matrice $s$:

        $$
        \begin{array}{l|rrrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 1 & 1 & 1 & 1 & 1 & 1 & 1 & 1 \\
        {j=2} & 0 & 0 & 1 & 1 & 1 & 1 & 1 & 1 & 1 \\
        {j=3} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=4} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=5} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima partendo da $j=5$ e $k=8$ come segue:

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
        <th><span class="arithmatex">\(x[5]\)</span></th>
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
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=5\)</span>, <span class="arithmatex">\(k=8\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td>8</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 4\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>8</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>8</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>2</td>
        <td>8</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 8-2=6\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>2</td>
        <td>6</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 2\)</span>, <span class="arithmatex">\(k\leftarrow 6-2=4\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>2</td>
        <td>4</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">3</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 3\)</span>, <span class="arithmatex">\(k\leftarrow 4-2=2\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td>2</td>
        <td>2</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">4</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 4\)</span>, <span class="arithmatex">\(k\leftarrow 2-2=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (0,4,0,0,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[5][8]=20.
        $$

<a id="esercizio-18-3"></a>

!!! esercizio "Esercizio 18.3: I due algoritmi di PD per l'UKP (4 tipi di oggetto, $c=10$)"

    Consideriamo la seguente istanza dell'UKP, in cui lo zaino ha capacità $c=10$, ogni tipo di oggetto è disponibile in infinite copie e i profitti e i pesi dei tipi di oggetto sono:

    $$
    \begin{array}{l|rrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\
    \hline {p_j} & 6 & 10 & 12 & 13 \\
    {w_j} & 3 & 4 & 6 & 7 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione del primo algoritmo di PD bottom-up riportando, per ogni iterazione, i valori del vettore $v$ e i valori del vettore $s$.

    2. Usando il vettore $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2,\dots,x_n)$ e riportare il valore ottimo.

    3. Mostrare l'esecuzione del secondo algoritmo di PD bottom-up riportando, per ogni iterazione, i valori delle matrici $v$ e $s$.

    4. Usando la matrice $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2,\dots,x_n)$ e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo del primo algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $k$ e $j$, le celle $v[k]$ e $s[k]$, il valore corrente di $m$, il valore corrente di $t$ e l'operazione eseguita.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(v[k]\)</span></th>
        <th><span class="arithmatex">\(s[k]\)</span></th>
        <th><span class="arithmatex">\(m\)</span></th>
        <th><span class="arithmatex">\(t\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(v[0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[1]=3>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[2]=4>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[3]=6>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[4]=7>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">0</td>
        <td class="cella-blu">0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[1]\leftarrow 0\)</span>, <span class="arithmatex">\(s[1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[1]=3>k=2\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[2]=4>k=2\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[3]=6>k=2\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[4]=7>k=2\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">0</td>
        <td class="cella-blu">0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[2]\leftarrow 0\)</span>, <span class="arithmatex">\(s[2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[0]=6+0=6>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 6\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[2]=4>k=3\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[3]=6>k=3\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[4]=7>k=3\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">1</td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[3]\leftarrow 6\)</span>, <span class="arithmatex">\(s[3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1]=6+0=6>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 6\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[2]+v[0]=10+0=10>m=6\)</span>: <span class="arithmatex">\(m\leftarrow 10\)</span>, <span class="arithmatex">\(t\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(w[3]=6>k=4\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>4</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(w[4]=7>k=4\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">2</td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[4]\leftarrow 10\)</span>, <span class="arithmatex">\(s[4]\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[2]=6+0=6>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 6\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[2]+v[1]=10+0=10>m=6\)</span>: <span class="arithmatex">\(m\leftarrow 10\)</span>, <span class="arithmatex">\(t\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(w[3]=6>k=5\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>5</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(w[4]=7>k=5\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">2</td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[5]\leftarrow 10\)</span>, <span class="arithmatex">\(s[5]\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[3]=6+6=12>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 12\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2]=10+0=10\le m=12\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>6</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[0]=12+0=12\le m=12\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>6</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[4]=7>k=6\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>6</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">12</td>
        <td class="cella-blu">1</td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[6]\leftarrow 12\)</span>, <span class="arithmatex">\(s[6]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>16</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[4]=6+10=16>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 16\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>16</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[3]=10+6=16\le m=16\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>7</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>16</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[1]=12+0=12\le m=16\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>7</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>16</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[4]+v[0]=13+0=13\le m=16\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>7</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">16</td>
        <td class="cella-blu">1</td>
        <td>16</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[7]\leftarrow 16\)</span>, <span class="arithmatex">\(s[7]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>16</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[5]=6+10=16>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 16\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>20</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[2]+v[4]=10+10=20>m=16\)</span>: <span class="arithmatex">\(m\leftarrow 20\)</span>, <span class="arithmatex">\(t\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>20</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[3]+v[2]=12+0=12\le m=20\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>8</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>20</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[4]+v[1]=13+0=13\le m=20\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>8</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">20</td>
        <td class="cella-blu">2</td>
        <td>20</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[8]\leftarrow 20\)</span>, <span class="arithmatex">\(s[8]\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>9</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>18</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[6]=6+12=18>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 18\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>20</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[2]+v[5]=10+10=20>m=18\)</span>: <span class="arithmatex">\(m\leftarrow 20\)</span>, <span class="arithmatex">\(t\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>9</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>20</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[3]+v[3]=12+6=18\le m=20\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>20</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[4]+v[2]=13+0=13\le m=20\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>9</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">20</td>
        <td class="cella-blu">2</td>
        <td>20</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[9]\leftarrow 20\)</span>, <span class="arithmatex">\(s[9]\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>10</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>22</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[7]=6+16=22>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 22\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>22</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[6]=10+12=22\le m=22\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>10</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>22</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[4]=12+10=22\le m=22\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>10</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>22</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[4]+v[3]=13+6=19\le m=22\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>10</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">22</td>
        <td class="cella-blu">1</td>
        <td>22</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[10]\leftarrow 22\)</span>, <span class="arithmatex">\(s[10]\leftarrow 1\)</span></td>
        </tr>
        </table></div>

        Questo è il vettore $v$ dopo l'esecuzione del primo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrrr}
        \hline  & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} & {k=10} \\
        \hline {v[k]} & 0 & 0 & 0 & 6 & 10 & 10 & 12 & 16 & 20 & 20 & 22 \\
        \hline
        \end{array}
        $$

        Questo è il vettore $s$ dopo l'esecuzione del primo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrrr}
        \hline  & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} & {k=10} \\
        \hline {s[k]} & 0 & 0 & 0 & 1 & 2 & 2 & 1 & 1 & 2 & 2 & 1 \\
        \hline
        \end{array}
        $$

    2. Abbiamo il seguente vettore $s$:

        $$
        \begin{array}{l|rrrrrrrrrrr}
        \hline  & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} & {k=10} \\
        \hline {s[k]} & 0 & 0 & 0 & 1 & 2 & 2 & 1 & 1 & 2 & 2 & 1 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima partendo da $k=10$ come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(s[k]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=10\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>10</td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 10-3=7\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>7</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 2\)</span>, <span class="arithmatex">\(k\leftarrow 7-3=4\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>2</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 4-4=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (2,1,0,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[10]=22.
        $$

    3. Esecuzione passo per passo del secondo algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $j$ e $k$, le celle $v[j][k]$ e $s[j][k]$ e l'operazione eseguita. Tutte le celle della riga $j=0$ sono inizializzate a $0$.

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
        <td>0</td>
        <td>10</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][10]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][10]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[1]\)</span>: <span class="arithmatex">\(v[1][0]\leftarrow v[0][0]=0\)</span>, <span class="arithmatex">\(s[1][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[1]\)</span>: <span class="arithmatex">\(v[1][1]\leftarrow v[0][1]=0\)</span>, <span class="arithmatex">\(s[1][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[1]\)</span>: <span class="arithmatex">\(v[1][2]\leftarrow v[0][2]=0\)</span>, <span class="arithmatex">\(s[1][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][0]=6+0>v[0][3]=0\)</span>: <span class="arithmatex">\(v[1][3]\leftarrow 6\)</span>, <span class="arithmatex">\(s[1][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][1]=6+0>v[0][4]=0\)</span>: <span class="arithmatex">\(v[1][4]\leftarrow 6\)</span>, <span class="arithmatex">\(s[1][4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][2]=6+0>v[0][5]=0\)</span>: <span class="arithmatex">\(v[1][5]\leftarrow 6\)</span>, <span class="arithmatex">\(s[1][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>6</td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][3]=6+6>v[0][6]=0\)</span>: <span class="arithmatex">\(v[1][6]\leftarrow 12\)</span>, <span class="arithmatex">\(s[1][6]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>7</td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][4]=6+6>v[0][7]=0\)</span>: <span class="arithmatex">\(v[1][7]\leftarrow 12\)</span>, <span class="arithmatex">\(s[1][7]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>8</td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][5]=6+6>v[0][8]=0\)</span>: <span class="arithmatex">\(v[1][8]\leftarrow 12\)</span>, <span class="arithmatex">\(s[1][8]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>9</td>
        <td>18</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][6]=6+12>v[0][9]=0\)</span>: <span class="arithmatex">\(v[1][9]\leftarrow 18\)</span>, <span class="arithmatex">\(s[1][9]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>10</td>
        <td>18</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][7]=6+12>v[0][10]=0\)</span>: <span class="arithmatex">\(v[1][10]\leftarrow 18\)</span>, <span class="arithmatex">\(s[1][10]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[2]\)</span>: <span class="arithmatex">\(v[2][0]\leftarrow v[1][0]=0\)</span>, <span class="arithmatex">\(s[2][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[2]\)</span>: <span class="arithmatex">\(v[2][1]\leftarrow v[1][1]=0\)</span>, <span class="arithmatex">\(s[2][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[2]\)</span>: <span class="arithmatex">\(v[2][2]\leftarrow v[1][2]=0\)</span>, <span class="arithmatex">\(s[2][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[2]\)</span>: <span class="arithmatex">\(v[2][3]\leftarrow v[1][3]=6\)</span>, <span class="arithmatex">\(s[2][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][0]=10+0>v[1][4]=6\)</span>: <span class="arithmatex">\(v[2][4]\leftarrow 10\)</span>, <span class="arithmatex">\(s[2][4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][1]=10+0>v[1][5]=6\)</span>: <span class="arithmatex">\(v[2][5]\leftarrow 10\)</span>, <span class="arithmatex">\(s[2][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>6</td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[2]+v[2][2]=10+0\le v[1][6]=12\)</span>: <span class="arithmatex">\(v[2][6]\leftarrow 12\)</span>, <span class="arithmatex">\(s[2][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>7</td>
        <td>16</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][3]=10+6>v[1][7]=12\)</span>: <span class="arithmatex">\(v[2][7]\leftarrow 16\)</span>, <span class="arithmatex">\(s[2][7]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>8</td>
        <td>20</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][4]=10+10>v[1][8]=12\)</span>: <span class="arithmatex">\(v[2][8]\leftarrow 20\)</span>, <span class="arithmatex">\(s[2][8]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>9</td>
        <td>20</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][5]=10+10>v[1][9]=18\)</span>: <span class="arithmatex">\(v[2][9]\leftarrow 20\)</span>, <span class="arithmatex">\(s[2][9]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>10</td>
        <td>22</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][6]=10+12>v[1][10]=18\)</span>: <span class="arithmatex">\(v[2][10]\leftarrow 22\)</span>, <span class="arithmatex">\(s[2][10]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][0]\leftarrow v[2][0]=0\)</span>, <span class="arithmatex">\(s[3][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][1]\leftarrow v[2][1]=0\)</span>, <span class="arithmatex">\(s[3][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][2]\leftarrow v[2][2]=0\)</span>, <span class="arithmatex">\(s[3][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][3]\leftarrow v[2][3]=6\)</span>, <span class="arithmatex">\(s[3][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][4]\leftarrow v[2][4]=10\)</span>, <span class="arithmatex">\(s[3][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>5</td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][5]\leftarrow v[2][5]=10\)</span>, <span class="arithmatex">\(s[3][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>6</td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][0]=12+0\le v[2][6]=12\)</span>: <span class="arithmatex">\(v[3][6]\leftarrow 12\)</span>, <span class="arithmatex">\(s[3][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>7</td>
        <td>16</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][1]=12+0\le v[2][7]=16\)</span>: <span class="arithmatex">\(v[3][7]\leftarrow 16\)</span>, <span class="arithmatex">\(s[3][7]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>8</td>
        <td>20</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][2]=12+0\le v[2][8]=20\)</span>: <span class="arithmatex">\(v[3][8]\leftarrow 20\)</span>, <span class="arithmatex">\(s[3][8]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>9</td>
        <td>20</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][3]=12+6\le v[2][9]=20\)</span>: <span class="arithmatex">\(v[3][9]\leftarrow 20\)</span>, <span class="arithmatex">\(s[3][9]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>10</td>
        <td>22</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][4]=12+10\le v[2][10]=22\)</span>: <span class="arithmatex">\(v[3][10]\leftarrow 22\)</span>, <span class="arithmatex">\(s[3][10]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][0]\leftarrow v[3][0]=0\)</span>, <span class="arithmatex">\(s[4][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][1]\leftarrow v[3][1]=0\)</span>, <span class="arithmatex">\(s[4][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][2]\leftarrow v[3][2]=0\)</span>, <span class="arithmatex">\(s[4][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][3]\leftarrow v[3][3]=6\)</span>, <span class="arithmatex">\(s[4][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>4</td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][4]\leftarrow v[3][4]=10\)</span>, <span class="arithmatex">\(s[4][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][5]\leftarrow v[3][5]=10\)</span>, <span class="arithmatex">\(s[4][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>6</td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][6]\leftarrow v[3][6]=12\)</span>, <span class="arithmatex">\(s[4][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>7</td>
        <td>16</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+v[4][0]=13+0\le v[3][7]=16\)</span>: <span class="arithmatex">\(v[4][7]\leftarrow 16\)</span>, <span class="arithmatex">\(s[4][7]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>8</td>
        <td>20</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+v[4][1]=13+0\le v[3][8]=20\)</span>: <span class="arithmatex">\(v[4][8]\leftarrow 20\)</span>, <span class="arithmatex">\(s[4][8]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>9</td>
        <td>20</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+v[4][2]=13+0\le v[3][9]=20\)</span>: <span class="arithmatex">\(v[4][9]\leftarrow 20\)</span>, <span class="arithmatex">\(s[4][9]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>10</td>
        <td>22</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+v[4][3]=13+6\le v[3][10]=22\)</span>: <span class="arithmatex">\(v[4][10]\leftarrow 22\)</span>, <span class="arithmatex">\(s[4][10]\leftarrow 0\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $v$ dopo l'esecuzione del secondo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrrr}
        \hline {v[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} & {k=10} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 0 & 6 & 6 & 6 & 12 & 12 & 12 & 18 & 18 \\
        {j=2} & 0 & 0 & 0 & 6 & 10 & 10 & 12 & 16 & 20 & 20 & 22 \\
        {j=3} & 0 & 0 & 0 & 6 & 10 & 10 & 12 & 16 & 20 & 20 & 22 \\
        {j=4} & 0 & 0 & 0 & 6 & 10 & 10 & 12 & 16 & 20 & 20 & 22 \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione del secondo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} & {k=10} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 0 & 1 & 1 & 1 & 1 & 1 & 1 & 1 & 1 \\
        {j=2} & 0 & 0 & 0 & 0 & 1 & 1 & 0 & 1 & 1 & 1 & 1 \\
        {j=3} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=4} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        \hline
        \end{array}
        $$

    4. Abbiamo la seguente matrice $s$:

        $$
        \begin{array}{l|rrrrrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} & {k=10} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 0 & 1 & 1 & 1 & 1 & 1 & 1 & 1 & 1 \\
        {j=2} & 0 & 0 & 0 & 0 & 1 & 1 & 0 & 1 & 1 & 1 & 1 \\
        {j=3} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=4} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima partendo da $j=4$ e $k=10$ come segue:

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
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=4\)</span>, <span class="arithmatex">\(k=10\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td>10</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>10</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td>10</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 10-4=6\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>2</td>
        <td>6</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td>6</td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 6-3=3\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>1</td>
        <td>3</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 2\)</span>, <span class="arithmatex">\(k\leftarrow 3-3=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (2,1,0,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[4][10]=22.
        $$

        La soluzione ottima non è unica: anche $(0,1,1,0)$, con peso totale $4+6=10$ e profitto totale $10+12=22$, è ottima. Entrambi gli algoritmi di PD trovano $(2,1,0,0)$, perché aggiornano il valore memorizzato solo quando migliora strettamente.

<a id="esercizio-18-4"></a>

!!! esercizio "Esercizio 18.4: I due algoritmi di PD per l'UKP (4 tipi di oggetto, $c=9$)"

    Consideriamo la seguente istanza dell'UKP, in cui lo zaino ha capacità $c=9$, ogni tipo di oggetto è disponibile in infinite copie e i profitti e i pesi dei tipi di oggetto sono:

    $$
    \begin{array}{l|rrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\
    \hline {p_j} & 5 & 6 & 14 & 18 \\
    {w_j} & 2 & 3 & 6 & 7 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione del primo algoritmo di PD bottom-up riportando, per ogni iterazione, i valori del vettore $v$ e i valori del vettore $s$.

    2. Usando il vettore $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2,\dots,x_n)$ e riportare il valore ottimo.

    3. Mostrare l'esecuzione del secondo algoritmo di PD bottom-up riportando, per ogni iterazione, i valori delle matrici $v$ e $s$.

    4. Usando la matrice $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2,\dots,x_n)$ e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo del primo algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $k$ e $j$, le celle $v[k]$ e $s[k]$, il valore corrente di $m$, il valore corrente di $t$ e l'operazione eseguita.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(v[k]\)</span></th>
        <th><span class="arithmatex">\(s[k]\)</span></th>
        <th><span class="arithmatex">\(m\)</span></th>
        <th><span class="arithmatex">\(t\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(v[0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[1]=2>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[2]=3>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[3]=6>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[4]=7>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">0</td>
        <td class="cella-blu">0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[1]\leftarrow 0\)</span>, <span class="arithmatex">\(s[1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[0]=5+0=5>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 5\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[2]=3>k=2\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[3]=6>k=2\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[4]=7>k=2\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">1</td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[2]\leftarrow 5\)</span>, <span class="arithmatex">\(s[2]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1]=5+0=5>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 5\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>6</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[2]+v[0]=6+0=6>m=5\)</span>: <span class="arithmatex">\(m\leftarrow 6\)</span>, <span class="arithmatex">\(t\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>6</td>
        <td>2</td>
        <td><span class="arithmatex">\(w[3]=6>k=3\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>6</td>
        <td>2</td>
        <td><span class="arithmatex">\(w[4]=7>k=3\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">2</td>
        <td>6</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[3]\leftarrow 6\)</span>, <span class="arithmatex">\(s[3]\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[2]=5+5=10>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 10\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[1]=6+0=6\le m=10\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[3]=6>k=4\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>4</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[4]=7>k=4\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">1</td>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[4]\leftarrow 10\)</span>, <span class="arithmatex">\(s[4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>11</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[3]=5+6=11>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 11\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>11</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2]=6+5=11\le m=11\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>5</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>11</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[3]=6>k=5\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>5</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>11</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[4]=7>k=5\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">11</td>
        <td class="cella-blu">1</td>
        <td>11</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[5]\leftarrow 11\)</span>, <span class="arithmatex">\(s[5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[4]=5+10=15>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 15\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[3]=6+6=12\le m=15\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>6</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[0]=14+0=14\le m=15\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>6</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[4]=7>k=6\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>6</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">15</td>
        <td class="cella-blu">1</td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[6]\leftarrow 15\)</span>, <span class="arithmatex">\(s[6]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>16</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[5]=5+11=16>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 16\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>16</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[4]=6+10=16\le m=16\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>7</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>16</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[1]=14+0=14\le m=16\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>7</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>18</td>
        <td>4</td>
        <td><span class="arithmatex">\(p[4]+v[0]=18+0=18>m=16\)</span>: <span class="arithmatex">\(m\leftarrow 18\)</span>, <span class="arithmatex">\(t\leftarrow 4\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">18</td>
        <td class="cella-blu">4</td>
        <td>18</td>
        <td>4</td>
        <td><span class="arithmatex">\(v[7]\leftarrow 18\)</span>, <span class="arithmatex">\(s[7]\leftarrow 4\)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>20</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[6]=5+15=20>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 20\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>20</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[5]=6+11=17\le m=20\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>8</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>20</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[2]=14+5=19\le m=20\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>8</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>20</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[4]+v[1]=18+0=18\le m=20\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>8</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">20</td>
        <td class="cella-blu">1</td>
        <td>20</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[8]\leftarrow 20\)</span>, <span class="arithmatex">\(s[8]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>9</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>23</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[7]=5+18=23>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 23\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>23</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[6]=6+15=21\le m=23\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>9</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>23</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[3]=14+6=20\le m=23\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>23</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[4]+v[2]=18+5=23\le m=23\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>9</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">23</td>
        <td class="cella-blu">1</td>
        <td>23</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[9]\leftarrow 23\)</span>, <span class="arithmatex">\(s[9]\leftarrow 1\)</span></td>
        </tr>
        </table></div>

        Questo è il vettore $v$ dopo l'esecuzione del primo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrr}
        \hline  & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} \\
        \hline {v[k]} & 0 & 0 & 5 & 6 & 10 & 11 & 15 & 18 & 20 & 23 \\
        \hline
        \end{array}
        $$

        Questo è il vettore $s$ dopo l'esecuzione del primo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrr}
        \hline  & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} \\
        \hline {s[k]} & 0 & 0 & 1 & 2 & 1 & 1 & 1 & 4 & 1 & 1 \\
        \hline
        \end{array}
        $$

    2. Abbiamo il seguente vettore $s$:

        $$
        \begin{array}{l|rrrrrrrrrr}
        \hline  & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} \\
        \hline {s[k]} & 0 & 0 & 1 & 2 & 1 & 1 & 1 & 4 & 1 & 1 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima partendo da $k=9$ come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(s[k]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=9\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>9</td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 9-2=7\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>7</td>
        <td>4</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(x[4]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 7-7=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (1,0,0,1)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[9]=23.
        $$

    3. Esecuzione passo per passo del secondo algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $j$ e $k$, le celle $v[j][k]$ e $s[j][k]$ e l'operazione eseguita. Tutte le celle della riga $j=0$ sono inizializzate a $0$.

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
        <td><span class="arithmatex">\(k<w[1]\)</span>: <span class="arithmatex">\(v[1][0]\leftarrow v[0][0]=0\)</span>, <span class="arithmatex">\(s[1][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[1]\)</span>: <span class="arithmatex">\(v[1][1]\leftarrow v[0][1]=0\)</span>, <span class="arithmatex">\(s[1][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][0]=5+0>v[0][2]=0\)</span>: <span class="arithmatex">\(v[1][2]\leftarrow 5\)</span>, <span class="arithmatex">\(s[1][2]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][1]=5+0>v[0][3]=0\)</span>: <span class="arithmatex">\(v[1][3]\leftarrow 5\)</span>, <span class="arithmatex">\(s[1][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][2]=5+5>v[0][4]=0\)</span>: <span class="arithmatex">\(v[1][4]\leftarrow 10\)</span>, <span class="arithmatex">\(s[1][4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][3]=5+5>v[0][5]=0\)</span>: <span class="arithmatex">\(v[1][5]\leftarrow 10\)</span>, <span class="arithmatex">\(s[1][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>6</td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][4]=5+10>v[0][6]=0\)</span>: <span class="arithmatex">\(v[1][6]\leftarrow 15\)</span>, <span class="arithmatex">\(s[1][6]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>7</td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][5]=5+10>v[0][7]=0\)</span>: <span class="arithmatex">\(v[1][7]\leftarrow 15\)</span>, <span class="arithmatex">\(s[1][7]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>8</td>
        <td>20</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][6]=5+15>v[0][8]=0\)</span>: <span class="arithmatex">\(v[1][8]\leftarrow 20\)</span>, <span class="arithmatex">\(s[1][8]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>9</td>
        <td>20</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][7]=5+15>v[0][9]=0\)</span>: <span class="arithmatex">\(v[1][9]\leftarrow 20\)</span>, <span class="arithmatex">\(s[1][9]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[2]\)</span>: <span class="arithmatex">\(v[2][0]\leftarrow v[1][0]=0\)</span>, <span class="arithmatex">\(s[2][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[2]\)</span>: <span class="arithmatex">\(v[2][1]\leftarrow v[1][1]=0\)</span>, <span class="arithmatex">\(s[2][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[2]\)</span>: <span class="arithmatex">\(v[2][2]\leftarrow v[1][2]=5\)</span>, <span class="arithmatex">\(s[2][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][0]=6+0>v[1][3]=5\)</span>: <span class="arithmatex">\(v[2][3]\leftarrow 6\)</span>, <span class="arithmatex">\(s[2][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[2]+v[2][1]=6+0\le v[1][4]=10\)</span>: <span class="arithmatex">\(v[2][4]\leftarrow 10\)</span>, <span class="arithmatex">\(s[2][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td>11</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][2]=6+5>v[1][5]=10\)</span>: <span class="arithmatex">\(v[2][5]\leftarrow 11\)</span>, <span class="arithmatex">\(s[2][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>6</td>
        <td>15</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[2]+v[2][3]=6+6\le v[1][6]=15\)</span>: <span class="arithmatex">\(v[2][6]\leftarrow 15\)</span>, <span class="arithmatex">\(s[2][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>7</td>
        <td>16</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][4]=6+10>v[1][7]=15\)</span>: <span class="arithmatex">\(v[2][7]\leftarrow 16\)</span>, <span class="arithmatex">\(s[2][7]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>8</td>
        <td>20</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[2]+v[2][5]=6+11\le v[1][8]=20\)</span>: <span class="arithmatex">\(v[2][8]\leftarrow 20\)</span>, <span class="arithmatex">\(s[2][8]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>9</td>
        <td>21</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][6]=6+15>v[1][9]=20\)</span>: <span class="arithmatex">\(v[2][9]\leftarrow 21\)</span>, <span class="arithmatex">\(s[2][9]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][0]\leftarrow v[2][0]=0\)</span>, <span class="arithmatex">\(s[3][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][1]\leftarrow v[2][1]=0\)</span>, <span class="arithmatex">\(s[3][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][2]\leftarrow v[2][2]=5\)</span>, <span class="arithmatex">\(s[3][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][3]\leftarrow v[2][3]=6\)</span>, <span class="arithmatex">\(s[3][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][4]\leftarrow v[2][4]=10\)</span>, <span class="arithmatex">\(s[3][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>5</td>
        <td>11</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][5]\leftarrow v[2][5]=11\)</span>, <span class="arithmatex">\(s[3][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>6</td>
        <td>15</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][0]=14+0\le v[2][6]=15\)</span>: <span class="arithmatex">\(v[3][6]\leftarrow 15\)</span>, <span class="arithmatex">\(s[3][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>7</td>
        <td>16</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][1]=14+0\le v[2][7]=16\)</span>: <span class="arithmatex">\(v[3][7]\leftarrow 16\)</span>, <span class="arithmatex">\(s[3][7]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>8</td>
        <td>20</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][2]=14+5\le v[2][8]=20\)</span>: <span class="arithmatex">\(v[3][8]\leftarrow 20\)</span>, <span class="arithmatex">\(s[3][8]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>9</td>
        <td>21</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][3]=14+6\le v[2][9]=21\)</span>: <span class="arithmatex">\(v[3][9]\leftarrow 21\)</span>, <span class="arithmatex">\(s[3][9]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][0]\leftarrow v[3][0]=0\)</span>, <span class="arithmatex">\(s[4][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][1]\leftarrow v[3][1]=0\)</span>, <span class="arithmatex">\(s[4][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>2</td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][2]\leftarrow v[3][2]=5\)</span>, <span class="arithmatex">\(s[4][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][3]\leftarrow v[3][3]=6\)</span>, <span class="arithmatex">\(s[4][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>4</td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][4]\leftarrow v[3][4]=10\)</span>, <span class="arithmatex">\(s[4][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td>11</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][5]\leftarrow v[3][5]=11\)</span>, <span class="arithmatex">\(s[4][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>6</td>
        <td>15</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][6]\leftarrow v[3][6]=15\)</span>, <span class="arithmatex">\(s[4][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>7</td>
        <td>18</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[4]+v[4][0]=18+0>v[3][7]=16\)</span>: <span class="arithmatex">\(v[4][7]\leftarrow 18\)</span>, <span class="arithmatex">\(s[4][7]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>8</td>
        <td>20</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+v[4][1]=18+0\le v[3][8]=20\)</span>: <span class="arithmatex">\(v[4][8]\leftarrow 20\)</span>, <span class="arithmatex">\(s[4][8]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>9</td>
        <td>23</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[4]+v[4][2]=18+5>v[3][9]=21\)</span>: <span class="arithmatex">\(v[4][9]\leftarrow 23\)</span>, <span class="arithmatex">\(s[4][9]\leftarrow 1\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $v$ dopo l'esecuzione del secondo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrr}
        \hline {v[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 5 & 5 & 10 & 10 & 15 & 15 & 20 & 20 \\
        {j=2} & 0 & 0 & 5 & 6 & 10 & 11 & 15 & 16 & 20 & 21 \\
        {j=3} & 0 & 0 & 5 & 6 & 10 & 11 & 15 & 16 & 20 & 21 \\
        {j=4} & 0 & 0 & 5 & 6 & 10 & 11 & 15 & 18 & 20 & 23 \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione del secondo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 1 & 1 & 1 & 1 & 1 & 1 & 1 & 1 \\
        {j=2} & 0 & 0 & 0 & 1 & 0 & 1 & 0 & 1 & 0 & 1 \\
        {j=3} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=4} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 1 \\
        \hline
        \end{array}
        $$

    4. Abbiamo la seguente matrice $s$:

        $$
        \begin{array}{l|rrrrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 1 & 1 & 1 & 1 & 1 & 1 & 1 & 1 \\
        {j=2} & 0 & 0 & 0 & 1 & 0 & 1 & 0 & 1 & 0 & 1 \\
        {j=3} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=4} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 1 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima partendo da $j=4$ e $k=9$ come segue:

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
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=4\)</span>, <span class="arithmatex">\(k=9\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td>9</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(x[4]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 9-7=2\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(j\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(j\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>2</td>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(j\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 2-2=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (1,0,0,1)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[4][9]=23.
        $$

<a id="esercizio-18-5"></a>

!!! esercizio "Esercizio 18.5: I due algoritmi di PD per l'UKP (5 tipi di oggetto, $c=11$)"

    Consideriamo la seguente istanza dell'UKP, in cui lo zaino ha capacità $c=11$, ogni tipo di oggetto è disponibile in infinite copie e i profitti e i pesi dei tipi di oggetto sono:

    $$
    \begin{array}{l|rrrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\
    \hline {p_j} & 3 & 9 & 10 & 16 & 17 \\
    {w_j} & 2 & 5 & 6 & 9 & 10 \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione del primo algoritmo di PD bottom-up riportando, per ogni iterazione, i valori del vettore $v$ e i valori del vettore $s$.

    2. Usando il vettore $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2,\dots,x_n)$ e riportare il valore ottimo.

    3. Mostrare l'esecuzione del secondo algoritmo di PD bottom-up riportando, per ogni iterazione, i valori delle matrici $v$ e $s$.

    4. Usando la matrice $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2,\dots,x_n)$ e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo del primo algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $k$ e $j$, le celle $v[k]$ e $s[k]$, il valore corrente di $m$, il valore corrente di $t$ e l'operazione eseguita.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(v[k]\)</span></th>
        <th><span class="arithmatex">\(s[k]\)</span></th>
        <th><span class="arithmatex">\(m\)</span></th>
        <th><span class="arithmatex">\(t\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(v[0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[1]=2>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[2]=5>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[3]=6>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[4]=9>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(w[5]=10>k=1\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">0</td>
        <td class="cella-blu">0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[1]\leftarrow 0\)</span>, <span class="arithmatex">\(s[1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[0]=3+0=3>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 3\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[2]=5>k=2\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[3]=6>k=2\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[4]=9>k=2\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[5]=10>k=2\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">1</td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[2]\leftarrow 3\)</span>, <span class="arithmatex">\(s[2]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1]=3+0=3>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 3\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[2]=5>k=3\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[3]=6>k=3\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[4]=9>k=3\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>3</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[5]=10>k=3\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">1</td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[3]\leftarrow 3\)</span>, <span class="arithmatex">\(s[3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[2]=3+3=6>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 6\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[2]=5>k=4\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[3]=6>k=4\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>4</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[4]=9>k=4\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[5]=10>k=4\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">1</td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[4]\leftarrow 6\)</span>, <span class="arithmatex">\(s[4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[3]=3+3=6>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 6\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[2]+v[0]=9+0=9>m=6\)</span>: <span class="arithmatex">\(m\leftarrow 9\)</span>, <span class="arithmatex">\(t\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">\(w[3]=6>k=5\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>5</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">\(w[4]=9>k=5\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>5</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">\(w[5]=10>k=5\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">9</td>
        <td class="cella-blu">2</td>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[5]\leftarrow 9\)</span>, <span class="arithmatex">\(s[5]\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[4]=3+6=9>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 9\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[1]=9+0=9\le m=9\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>6</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>3</td>
        <td><span class="arithmatex">\(p[3]+v[0]=10+0=10>m=9\)</span>: <span class="arithmatex">\(m\leftarrow 10\)</span>, <span class="arithmatex">\(t\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>3</td>
        <td><span class="arithmatex">\(w[4]=9>k=6\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>6</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>3</td>
        <td><span class="arithmatex">\(w[5]=10>k=6\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>6</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">3</td>
        <td>10</td>
        <td>3</td>
        <td><span class="arithmatex">\(v[6]\leftarrow 10\)</span>, <span class="arithmatex">\(s[6]\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[5]=3+9=12>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 12\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2]=9+3=12\le m=12\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>7</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[1]=10+0=10\le m=12\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>7</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[4]=9>k=7\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>7</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[5]=10>k=7\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>7</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">12</td>
        <td class="cella-blu">1</td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[7]\leftarrow 12\)</span>, <span class="arithmatex">\(s[7]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>13</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[6]=3+10=13>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 13\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>13</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[3]=9+3=12\le m=13\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>8</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>13</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[2]=10+3=13\le m=13\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>8</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>13</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[4]=9>k=8\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>8</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>13</td>
        <td>1</td>
        <td><span class="arithmatex">\(w[5]=10>k=8\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>8</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">13</td>
        <td class="cella-blu">1</td>
        <td>13</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[8]\leftarrow 13\)</span>, <span class="arithmatex">\(s[8]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>9</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[7]=3+12=15>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 15\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>9</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[4]=9+6=15\le m=15\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>9</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[3]=10+3=13\le m=15\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>9</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>16</td>
        <td>4</td>
        <td><span class="arithmatex">\(p[4]+v[0]=16+0=16>m=15\)</span>: <span class="arithmatex">\(m\leftarrow 16\)</span>, <span class="arithmatex">\(t\leftarrow 4\)</span></td>
        </tr>
        <tr>
        <td>9</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>16</td>
        <td>4</td>
        <td><span class="arithmatex">\(w[5]=10>k=9\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>9</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">16</td>
        <td class="cella-blu">4</td>
        <td>16</td>
        <td>4</td>
        <td><span class="arithmatex">\(v[9]\leftarrow 16\)</span>, <span class="arithmatex">\(s[9]\leftarrow 4\)</span></td>
        </tr>
        <tr>
        <td>10</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>16</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[8]=3+13=16>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 16\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>18</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[2]+v[5]=9+9=18>m=16\)</span>: <span class="arithmatex">\(m\leftarrow 18\)</span>, <span class="arithmatex">\(t\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>10</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>18</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[3]+v[4]=10+6=16\le m=18\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>10</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>18</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[4]+v[1]=16+0=16\le m=18\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>10</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>18</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[5]+v[0]=17+0=17\le m=18\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>10</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">18</td>
        <td class="cella-blu">2</td>
        <td>18</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[10]\leftarrow 18\)</span>, <span class="arithmatex">\(s[10]\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>11</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(m\leftarrow 0\)</span>, <span class="arithmatex">\(t\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>11</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>19</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[9]=3+16=19>m=0\)</span>: <span class="arithmatex">\(m\leftarrow 19\)</span>, <span class="arithmatex">\(t\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>11</td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>19</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[6]=9+10=19\le m=19\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>11</td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>19</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[5]=10+9=19\le m=19\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>11</td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>19</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[4]+v[2]=16+3=19\le m=19\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>11</td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>19</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[5]+v[1]=17+0=17\le m=19\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td>11</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">19</td>
        <td class="cella-blu">1</td>
        <td>19</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[11]\leftarrow 19\)</span>, <span class="arithmatex">\(s[11]\leftarrow 1\)</span></td>
        </tr>
        </table></div>

        Questo è il vettore $v$ dopo l'esecuzione del primo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrrrr}
        \hline  & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} & {k=10} & {k=11} \\
        \hline {v[k]} & 0 & 0 & 3 & 3 & 6 & 9 & 10 & 12 & 13 & 16 & 18 & 19 \\
        \hline
        \end{array}
        $$

        Questo è il vettore $s$ dopo l'esecuzione del primo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrrrr}
        \hline  & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} & {k=10} & {k=11} \\
        \hline {s[k]} & 0 & 0 & 1 & 1 & 1 & 2 & 3 & 1 & 1 & 4 & 2 & 1 \\
        \hline
        \end{array}
        $$

    2. Abbiamo il seguente vettore $s$:

        $$
        \begin{array}{l|rrrrrrrrrrrr}
        \hline  & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} & {k=10} & {k=11} \\
        \hline {s[k]} & 0 & 0 & 1 & 1 & 1 & 2 & 3 & 1 & 1 & 4 & 2 & 1 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima partendo da $k=11$ come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(s[k]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th><span class="arithmatex">\(x[5]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>\-</td>
        <td>\-</td>
        <td>\-</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=11\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>11</td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 11-2=9\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>9</td>
        <td>4</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[4]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 9-9=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (1,0,0,1,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[11]=19.
        $$

    3. Esecuzione passo per passo del secondo algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $j$ e $k$, le celle $v[j][k]$ e $s[j][k]$ e l'operazione eseguita. Tutte le celle della riga $j=0$ sono inizializzate a $0$.

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
        <td>0</td>
        <td>10</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][10]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][10]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>0</td>
        <td>11</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0][11]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0][11]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[1]\)</span>: <span class="arithmatex">\(v[1][0]\leftarrow v[0][0]=0\)</span>, <span class="arithmatex">\(s[1][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[1]\)</span>: <span class="arithmatex">\(v[1][1]\leftarrow v[0][1]=0\)</span>, <span class="arithmatex">\(s[1][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>2</td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][0]=3+0>v[0][2]=0\)</span>: <span class="arithmatex">\(v[1][2]\leftarrow 3\)</span>, <span class="arithmatex">\(s[1][2]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>3</td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][1]=3+0>v[0][3]=0\)</span>: <span class="arithmatex">\(v[1][3]\leftarrow 3\)</span>, <span class="arithmatex">\(s[1][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>4</td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][2]=3+3>v[0][4]=0\)</span>: <span class="arithmatex">\(v[1][4]\leftarrow 6\)</span>, <span class="arithmatex">\(s[1][4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][3]=3+3>v[0][5]=0\)</span>: <span class="arithmatex">\(v[1][5]\leftarrow 6\)</span>, <span class="arithmatex">\(s[1][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>6</td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][4]=3+6>v[0][6]=0\)</span>: <span class="arithmatex">\(v[1][6]\leftarrow 9\)</span>, <span class="arithmatex">\(s[1][6]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>7</td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][5]=3+6>v[0][7]=0\)</span>: <span class="arithmatex">\(v[1][7]\leftarrow 9\)</span>, <span class="arithmatex">\(s[1][7]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>8</td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][6]=3+9>v[0][8]=0\)</span>: <span class="arithmatex">\(v[1][8]\leftarrow 12\)</span>, <span class="arithmatex">\(s[1][8]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>9</td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][7]=3+9>v[0][9]=0\)</span>: <span class="arithmatex">\(v[1][9]\leftarrow 12\)</span>, <span class="arithmatex">\(s[1][9]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>10</td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][8]=3+12>v[0][10]=0\)</span>: <span class="arithmatex">\(v[1][10]\leftarrow 15\)</span>, <span class="arithmatex">\(s[1][10]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>11</td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+v[1][9]=3+12>v[0][11]=0\)</span>: <span class="arithmatex">\(v[1][11]\leftarrow 15\)</span>, <span class="arithmatex">\(s[1][11]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[2]\)</span>: <span class="arithmatex">\(v[2][0]\leftarrow v[1][0]=0\)</span>, <span class="arithmatex">\(s[2][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[2]\)</span>: <span class="arithmatex">\(v[2][1]\leftarrow v[1][1]=0\)</span>, <span class="arithmatex">\(s[2][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>3</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[2]\)</span>: <span class="arithmatex">\(v[2][2]\leftarrow v[1][2]=3\)</span>, <span class="arithmatex">\(s[2][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>3</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[2]\)</span>: <span class="arithmatex">\(v[2][3]\leftarrow v[1][3]=3\)</span>, <span class="arithmatex">\(s[2][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[2]\)</span>: <span class="arithmatex">\(v[2][4]\leftarrow v[1][4]=6\)</span>, <span class="arithmatex">\(s[2][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][0]=9+0>v[1][5]=6\)</span>: <span class="arithmatex">\(v[2][5]\leftarrow 9\)</span>, <span class="arithmatex">\(s[2][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>6</td>
        <td>9</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[2]+v[2][1]=9+0\le v[1][6]=9\)</span>: <span class="arithmatex">\(v[2][6]\leftarrow 9\)</span>, <span class="arithmatex">\(s[2][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>7</td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][2]=9+3>v[1][7]=9\)</span>: <span class="arithmatex">\(v[2][7]\leftarrow 12\)</span>, <span class="arithmatex">\(s[2][7]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>8</td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[2]+v[2][3]=9+3\le v[1][8]=12\)</span>: <span class="arithmatex">\(v[2][8]\leftarrow 12\)</span>, <span class="arithmatex">\(s[2][8]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>9</td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][4]=9+6>v[1][9]=12\)</span>: <span class="arithmatex">\(v[2][9]\leftarrow 15\)</span>, <span class="arithmatex">\(s[2][9]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>10</td>
        <td>18</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][5]=9+9>v[1][10]=15\)</span>: <span class="arithmatex">\(v[2][10]\leftarrow 18\)</span>, <span class="arithmatex">\(s[2][10]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>11</td>
        <td>18</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2][6]=9+9>v[1][11]=15\)</span>: <span class="arithmatex">\(v[2][11]\leftarrow 18\)</span>, <span class="arithmatex">\(s[2][11]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][0]\leftarrow v[2][0]=0\)</span>, <span class="arithmatex">\(s[3][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][1]\leftarrow v[2][1]=0\)</span>, <span class="arithmatex">\(s[3][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td>3</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][2]\leftarrow v[2][2]=3\)</span>, <span class="arithmatex">\(s[3][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>3</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][3]\leftarrow v[2][3]=3\)</span>, <span class="arithmatex">\(s[3][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][4]\leftarrow v[2][4]=6\)</span>, <span class="arithmatex">\(s[3][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>5</td>
        <td>9</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[3]\)</span>: <span class="arithmatex">\(v[3][5]\leftarrow v[2][5]=9\)</span>, <span class="arithmatex">\(s[3][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>6</td>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[3][0]=10+0>v[2][6]=9\)</span>: <span class="arithmatex">\(v[3][6]\leftarrow 10\)</span>, <span class="arithmatex">\(s[3][6]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>7</td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][1]=10+0\le v[2][7]=12\)</span>: <span class="arithmatex">\(v[3][7]\leftarrow 12\)</span>, <span class="arithmatex">\(s[3][7]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>8</td>
        <td>13</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[3][2]=10+3>v[2][8]=12\)</span>: <span class="arithmatex">\(v[3][8]\leftarrow 13\)</span>, <span class="arithmatex">\(s[3][8]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>9</td>
        <td>15</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][3]=10+3\le v[2][9]=15\)</span>: <span class="arithmatex">\(v[3][9]\leftarrow 15\)</span>, <span class="arithmatex">\(s[3][9]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>10</td>
        <td>18</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+v[3][4]=10+6\le v[2][10]=18\)</span>: <span class="arithmatex">\(v[3][10]\leftarrow 18\)</span>, <span class="arithmatex">\(s[3][10]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>11</td>
        <td>19</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[3][5]=10+9>v[2][11]=18\)</span>: <span class="arithmatex">\(v[3][11]\leftarrow 19\)</span>, <span class="arithmatex">\(s[3][11]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][0]\leftarrow v[3][0]=0\)</span>, <span class="arithmatex">\(s[4][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][1]\leftarrow v[3][1]=0\)</span>, <span class="arithmatex">\(s[4][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>2</td>
        <td>3</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][2]\leftarrow v[3][2]=3\)</span>, <span class="arithmatex">\(s[4][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td>3</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][3]\leftarrow v[3][3]=3\)</span>, <span class="arithmatex">\(s[4][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>4</td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][4]\leftarrow v[3][4]=6\)</span>, <span class="arithmatex">\(s[4][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>5</td>
        <td>9</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][5]\leftarrow v[3][5]=9\)</span>, <span class="arithmatex">\(s[4][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>6</td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][6]\leftarrow v[3][6]=10\)</span>, <span class="arithmatex">\(s[4][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>7</td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][7]\leftarrow v[3][7]=12\)</span>, <span class="arithmatex">\(s[4][7]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>8</td>
        <td>13</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[4]\)</span>: <span class="arithmatex">\(v[4][8]\leftarrow v[3][8]=13\)</span>, <span class="arithmatex">\(s[4][8]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>9</td>
        <td>16</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[4]+v[4][0]=16+0>v[3][9]=15\)</span>: <span class="arithmatex">\(v[4][9]\leftarrow 16\)</span>, <span class="arithmatex">\(s[4][9]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>10</td>
        <td>18</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+v[4][1]=16+0\le v[3][10]=18\)</span>: <span class="arithmatex">\(v[4][10]\leftarrow 18\)</span>, <span class="arithmatex">\(s[4][10]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>11</td>
        <td>19</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+v[4][2]=16+3\le v[3][11]=19\)</span>: <span class="arithmatex">\(v[4][11]\leftarrow 19\)</span>, <span class="arithmatex">\(s[4][11]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[5]\)</span>: <span class="arithmatex">\(v[5][0]\leftarrow v[4][0]=0\)</span>, <span class="arithmatex">\(s[5][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[5]\)</span>: <span class="arithmatex">\(v[5][1]\leftarrow v[4][1]=0\)</span>, <span class="arithmatex">\(s[5][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>2</td>
        <td>3</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[5]\)</span>: <span class="arithmatex">\(v[5][2]\leftarrow v[4][2]=3\)</span>, <span class="arithmatex">\(s[5][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>3</td>
        <td>3</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[5]\)</span>: <span class="arithmatex">\(v[5][3]\leftarrow v[4][3]=3\)</span>, <span class="arithmatex">\(s[5][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>4</td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[5]\)</span>: <span class="arithmatex">\(v[5][4]\leftarrow v[4][4]=6\)</span>, <span class="arithmatex">\(s[5][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>5</td>
        <td>9</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[5]\)</span>: <span class="arithmatex">\(v[5][5]\leftarrow v[4][5]=9\)</span>, <span class="arithmatex">\(s[5][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>6</td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[5]\)</span>: <span class="arithmatex">\(v[5][6]\leftarrow v[4][6]=10\)</span>, <span class="arithmatex">\(s[5][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>7</td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[5]\)</span>: <span class="arithmatex">\(v[5][7]\leftarrow v[4][7]=12\)</span>, <span class="arithmatex">\(s[5][7]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>8</td>
        <td>13</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[5]\)</span>: <span class="arithmatex">\(v[5][8]\leftarrow v[4][8]=13\)</span>, <span class="arithmatex">\(s[5][8]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>9</td>
        <td>16</td>
        <td>0</td>
        <td><span class="arithmatex">\(k<w[5]\)</span>: <span class="arithmatex">\(v[5][9]\leftarrow v[4][9]=16\)</span>, <span class="arithmatex">\(s[5][9]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>10</td>
        <td>18</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[5]+v[5][0]=17+0\le v[4][10]=18\)</span>: <span class="arithmatex">\(v[5][10]\leftarrow 18\)</span>, <span class="arithmatex">\(s[5][10]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>11</td>
        <td>19</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[5]+v[5][1]=17+0\le v[4][11]=19\)</span>: <span class="arithmatex">\(v[5][11]\leftarrow 19\)</span>, <span class="arithmatex">\(s[5][11]\leftarrow 0\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $v$ dopo l'esecuzione del secondo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrrrr}
        \hline {v[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} & {k=10} & {k=11} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 3 & 3 & 6 & 6 & 9 & 9 & 12 & 12 & 15 & 15 \\
        {j=2} & 0 & 0 & 3 & 3 & 6 & 9 & 9 & 12 & 12 & 15 & 18 & 18 \\
        {j=3} & 0 & 0 & 3 & 3 & 6 & 9 & 10 & 12 & 13 & 15 & 18 & 19 \\
        {j=4} & 0 & 0 & 3 & 3 & 6 & 9 & 10 & 12 & 13 & 16 & 18 & 19 \\
        {j=5} & 0 & 0 & 3 & 3 & 6 & 9 & 10 & 12 & 13 & 16 & 18 & 19 \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione del secondo algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} & {k=10} & {k=11} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 1 & 1 & 1 & 1 & 1 & 1 & 1 & 1 & 1 & 1 \\
        {j=2} & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 1 & 0 & 1 & 1 & 1 \\
        {j=3} & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 1 & 0 & 0 & 1 \\
        {j=4} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 \\
        {j=5} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        \hline
        \end{array}
        $$

    4. Abbiamo la seguente matrice $s$:

        $$
        \begin{array}{l|rrrrrrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} & {k=10} & {k=11} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 0 & 1 & 1 & 1 & 1 & 1 & 1 & 1 & 1 & 1 & 1 \\
        {j=2} & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 1 & 0 & 1 & 1 & 1 \\
        {j=3} & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 1 & 0 & 0 & 1 \\
        {j=4} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 1 & 0 & 0 \\
        {j=5} & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima partendo da $j=5$ e $k=11$ come segue:

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
        <th><span class="arithmatex">\(x[5]\)</span></th>
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
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=5\)</span>, <span class="arithmatex">\(k=11\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td>11</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 4\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>11</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>11</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[3]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 11-6=5\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td>5</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>2</td>
        <td>5</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 5-5=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (0,1,1,0,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[5][11]=19.
        $$

        La soluzione ottima non è unica e i due algoritmi di PD ne trovano due diverse: il primo trova $(1,0,0,1,0)$, con peso totale $2+9=11$ e profitto totale $3+16=19$; il secondo trova $(0,1,1,0,0)$, con peso totale $5+6=11$ e profitto totale $9+10=19$. Queste sono le sole due soluzioni ottime.
