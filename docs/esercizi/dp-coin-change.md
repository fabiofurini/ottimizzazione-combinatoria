---
title: "Esercizi · PD per il problema del cambio monete"
---

# Esercizi · PD per il problema del cambio monete

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 27** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 27: Cambio monete (CCP)](../programmazione-dinamica/dp-coin-change.md) · [:material-file-pdf-box: Eserciziario, volume 3 (PDF)](../pdf/esercizi-3-programmazione-dinamica.pdf)

</div>

<a id="esercizio-27-1"></a>

!!! esercizio "Esercizio 27.1: Esercizio 1: problema del cambio monete"

    Consideriamo la seguente istanza del CCP, in cui il resto da restituire è $c=6$ e i tagli sono

    $$
    w=(1,4).
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni iterazione, i valori dell'array $v$ e dell'array $s$.

    2. Usando l'array $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2)$ e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta il resto $k$, le celle $v[k]$ e $s[k]$ e l'operazione eseguita; $s[k]$ è l'indice $j$ del taglio della moneta usata. In caso di pareggio si tiene l'indice minimo, perché $m$ viene aggiornato solo quando il valore è strettamente minore.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(v[k]\)</span></th>
        <th><span class="arithmatex">\(s[k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[0]\}=\min\{1\}=1\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[1]\}=\min\{2\}=2\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[2]\}=\min\{3\}=3\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td><span class="arithmatex">\(\min\{1+v[3],\,1+v[0]\}=\min\{4,1\}=1\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[4],\,1+v[1]\}=\min\{2,2\}=2\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[5],\,1+v[2]\}=\min\{3,3\}=3\)</span></td>
        </tr>
        </table></div>

        Questo è l'array $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrr}
        \hline {k} & 0 & 1 & 2 & 3 & 4 & 5 & 6 \\
        \hline {v[k]} & 0 & 1 & 2 & 3 & 1 & 2 & 3 \\
        \hline
        \end{array}
        $$

        Questo è l'array $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrr}
        \hline {k} & 0 & 1 & 2 & 3 & 4 & 5 & 6 \\
        \hline {s[k]} & 0 & 1 & 1 & 1 & 2 & 1 & 1 \\
        \hline
        \end{array}
        $$

    2. Abbiamo il seguente array $s$:

        $$
        \begin{array}{l|rrrrrrr}
        \hline {k} & 0 & 1 & 2 & 3 & 4 & 5 & 6 \\
        \hline {s[k]} & 0 & 1 & 1 & 1 & 2 & 1 & 1 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima partendo da $k=6$ come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(s[k]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(k \leftarrow k-w_{s[k]}\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=6-1=5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">2</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=5-1=4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>2</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(k=4-4=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (2,1)
        $$

        è una soluzione ottima: il suo valore totale è $2\cdot1+1\cdot4=6=c$. Il valore ottimo è

        $$
        v[6]=3.
        $$

<a id="esercizio-27-2"></a>

!!! esercizio "Esercizio 27.2: Esercizio 2: problema del cambio monete"

    Consideriamo la seguente istanza del CCP, in cui il resto da restituire è $c=11$ e i tagli sono

    $$
    w=(3,5).
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni iterazione, i valori dell'array $v$ e dell'array $s$.

    2. Usando l'array $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2)$ e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta il resto $k$, le celle $v[k]$ e $s[k]$ e l'operazione eseguita; $s[k]$ è l'indice $j$ del taglio della moneta usata. In caso di pareggio si tiene l'indice minimo, perché $m$ viene aggiornato solo quando il valore è strettamente minore. Il valore $+\infty$ indica un resto che non si può restituire, per il quale $s[k]=0$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(v[k]\)</span></th>
        <th><span class="arithmatex">\(s[k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td>nessun taglio <span class="arithmatex">\(w_j\le 1\)</span>: <span class="arithmatex">\(v[1]\leftarrow +\infty\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td>nessun taglio <span class="arithmatex">\(w_j\le 2\)</span>: <span class="arithmatex">\(v[2]\leftarrow +\infty\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[0]\}=\min\{1\}=1\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\min\{1+v[1]\}=\min\{+\infty\}=+\infty\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td>2</td>
        <td><span class="arithmatex">\(\min\{1+v[2],\,1+v[0]\}=\min\{+\infty,1\}=1\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[3],\,1+v[1]\}=\min\{2,+\infty\}=2\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\min\{1+v[4],\,1+v[2]\}=\min\{+\infty,+\infty\}=+\infty\)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[5],\,1+v[3]\}=\min\{2,2\}=2\)</span></td>
        </tr>
        <tr>
        <td>9</td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[6],\,1+v[4]\}=\min\{3,+\infty\}=3\)</span></td>
        </tr>
        <tr>
        <td>10</td>
        <td>2</td>
        <td>2</td>
        <td><span class="arithmatex">\(\min\{1+v[7],\,1+v[5]\}=\min\{+\infty,2\}=2\)</span></td>
        </tr>
        <tr>
        <td>11</td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[8],\,1+v[6]\}=\min\{3,3\}=3\)</span></td>
        </tr>
        </table></div>

        Questo è l'array $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrrrr}
        \hline {k} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 \\
        \hline {v[k]} & 0 & {+\infty} & {+\infty} & 1 & {+\infty} & 1 & 2 & {+\infty} & 2 & 3 & 2 & 3 \\
        \hline
        \end{array}
        $$

        Questo è l'array $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrrrr}
        \hline {k} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 \\
        \hline {s[k]} & 0 & 0 & 0 & 1 & 0 & 2 & 1 & 0 & 1 & 1 & 2 & 1 \\
        \hline
        \end{array}
        $$

    2. Abbiamo il seguente array $s$:

        $$
        \begin{array}{l|rrrrrrrrrrrr}
        \hline {k} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 \\
        \hline {s[k]} & 0 & 0 & 0 & 1 & 0 & 2 & 1 & 0 & 1 & 1 & 2 & 1 \\
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
        <th><span class="arithmatex">\(k \leftarrow k-w_{s[k]}\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=11\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=11-3=8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">2</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=8-3=5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>2</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(k=5-5=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (2,1)
        $$

        è una soluzione ottima: il suo valore totale è $2\cdot3+1\cdot5=11=c$. Il valore ottimo è

        $$
        v[11]=3.
        $$

<a id="esercizio-27-3"></a>

!!! esercizio "Esercizio 27.3: Esercizio 3: problema del cambio monete"

    Consideriamo la seguente istanza del CCP, in cui il resto da restituire è $c=7$ e i tagli sono

    $$
    w=(2,4).
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni iterazione, i valori dell'array $v$ e dell'array $s$.

    2. Usando l'array $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2)$, oppure spiegare perché l'istanza è inammissibile, e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta il resto $k$, le celle $v[k]$ e $s[k]$ e l'operazione eseguita; $s[k]$ è l'indice $j$ del taglio della moneta usata. In caso di pareggio si tiene l'indice minimo, perché $m$ viene aggiornato solo quando il valore è strettamente minore. Il valore $+\infty$ indica un resto che non si può restituire, per il quale $s[k]=0$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(v[k]\)</span></th>
        <th><span class="arithmatex">\(s[k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td>nessun taglio <span class="arithmatex">\(w_j\le 1\)</span>: <span class="arithmatex">\(v[1]\leftarrow +\infty\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[0]\}=\min\{1\}=1\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\min\{1+v[1]\}=\min\{+\infty\}=+\infty\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td>2</td>
        <td><span class="arithmatex">\(\min\{1+v[2],\,1+v[0]\}=\min\{2,1\}=1\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\min\{1+v[3],\,1+v[1]\}=\min\{+\infty,+\infty\}=+\infty\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[4],\,1+v[2]\}=\min\{2,2\}=2\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\min\{1+v[5],\,1+v[3]\}=\min\{+\infty,+\infty\}=+\infty\)</span></td>
        </tr>
        </table></div>

        Questo è l'array $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrr}
        \hline {k} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 \\
        \hline {v[k]} & 0 & {+\infty} & 1 & {+\infty} & 1 & {+\infty} & 2 & {+\infty} \\
        \hline
        \end{array}
        $$

        Questo è l'array $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrr}
        \hline {k} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 \\
        \hline {s[k]} & 0 & 0 & 1 & 0 & 2 & 0 & 1 & 0 \\
        \hline
        \end{array}
        $$

    2. Poiché $v[7]=+\infty$, l'istanza è <strong>inammissibile</strong>: nessuna combinazione di monete dei tagli $w=(2,4)$ restituisce un resto esattamente uguale a $c=7$. Infatti ogni taglio è pari, quindi ogni resto che si può restituire è pari, mentre $c=7$ è dispari.

        Poiché $s[7]=0$, non c'è alcuna soluzione da ricostruire. Il valore ottimo è

        $$
        v[7]=+\infty.
        $$

<a id="esercizio-27-4"></a>

!!! esercizio "Esercizio 27.4: Esercizio 4: problema del cambio monete"

    Consideriamo la seguente istanza del CCP, in cui il resto da restituire è $c=12$ e i tagli sono

    $$
    w=(3,7).
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni iterazione, i valori dell'array $v$ e dell'array $s$.

    2. Usando l'array $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2)$ e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta il resto $k$, le celle $v[k]$ e $s[k]$ e l'operazione eseguita; $s[k]$ è l'indice $j$ del taglio della moneta usata. In caso di pareggio si tiene l'indice minimo, perché $m$ viene aggiornato solo quando il valore è strettamente minore. Il valore $+\infty$ indica un resto che non si può restituire, per il quale $s[k]=0$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(v[k]\)</span></th>
        <th><span class="arithmatex">\(s[k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td>nessun taglio <span class="arithmatex">\(w_j\le 1\)</span>: <span class="arithmatex">\(v[1]\leftarrow +\infty\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td>nessun taglio <span class="arithmatex">\(w_j\le 2\)</span>: <span class="arithmatex">\(v[2]\leftarrow +\infty\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[0]\}=\min\{1\}=1\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\min\{1+v[1]\}=\min\{+\infty\}=+\infty\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\min\{1+v[2]\}=\min\{+\infty\}=+\infty\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[3]\}=\min\{2\}=2\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td>1</td>
        <td>2</td>
        <td><span class="arithmatex">\(\min\{1+v[4],\,1+v[0]\}=\min\{+\infty,1\}=1\)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\min\{1+v[5],\,1+v[1]\}=\min\{+\infty,+\infty\}=+\infty\)</span></td>
        </tr>
        <tr>
        <td>9</td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[6],\,1+v[2]\}=\min\{3,+\infty\}=3\)</span></td>
        </tr>
        <tr>
        <td>10</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[7],\,1+v[3]\}=\min\{2,2\}=2\)</span></td>
        </tr>
        <tr>
        <td>11</td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\min\{1+v[8],\,1+v[4]\}=\min\{+\infty,+\infty\}=+\infty\)</span></td>
        </tr>
        <tr>
        <td>12</td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[9],\,1+v[5]\}=\min\{4,+\infty\}=4\)</span></td>
        </tr>
        </table></div>

        Questo è l'array $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrrrrr}
        \hline {k} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 \\
        \hline {v[k]} & 0 & {+\infty} & {+\infty} & 1 & {+\infty} & {+\infty} & 2 & 1 & {+\infty} & 3 & 2 & {+\infty} & 4 \\
        \hline
        \end{array}
        $$

        Questo è l'array $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrrrrr}
        \hline {k} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 \\
        \hline {s[k]} & 0 & 0 & 0 & 1 & 0 & 0 & 1 & 2 & 0 & 1 & 1 & 0 & 1 \\
        \hline
        \end{array}
        $$

    2. Abbiamo il seguente array $s$:

        $$
        \begin{array}{l|rrrrrrrrrrrrr}
        \hline {k} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 & 11 & 12 \\
        \hline {s[k]} & 0 & 0 & 0 & 1 & 0 & 0 & 1 & 2 & 0 & 1 & 1 & 0 & 1 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima partendo da $k=12$ come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(s[k]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(k \leftarrow k-w_{s[k]}\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=12\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=12-3=9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">2</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=9-3=6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">3</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=6-3=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">4</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=3-3=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (4,0)
        $$

        è una soluzione ottima: il suo valore totale è $4\cdot3=12=c$. Il valore ottimo è

        $$
        v[12]=4.
        $$

<a id="esercizio-27-5"></a>

!!! esercizio "Esercizio 27.5: Esercizio 5: problema del cambio monete"

    Consideriamo la seguente istanza del CCP, in cui il resto da restituire è $c=9$ e i tagli sono

    $$
    w=(2,3,7).
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni iterazione, i valori dell'array $v$ e dell'array $s$.

    2. Usando l'array $s$, ricostruire una soluzione ottima in notazione intera $(x_1,x_2,x_3)$ e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta il resto $k$, le celle $v[k]$ e $s[k]$ e l'operazione eseguita; $s[k]$ è l'indice $j$ del taglio della moneta usata. In caso di pareggio si tiene l'indice minimo, perché $m$ viene aggiornato solo quando il valore è strettamente minore. Il valore $+\infty$ indica un resto che non si può restituire, per il quale $s[k]=0$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(v[k]\)</span></th>
        <th><span class="arithmatex">\(s[k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(v[0]\leftarrow 0\)</span>, <span class="arithmatex">\(s[0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td>nessun taglio <span class="arithmatex">\(w_j\le 1\)</span>: <span class="arithmatex">\(v[1]\leftarrow +\infty\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[0]\}=\min\{1\}=1\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td>2</td>
        <td><span class="arithmatex">\(\min\{1+v[1],\,1+v[0]\}=\min\{+\infty,1\}=1\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[2],\,1+v[1]\}=\min\{2,+\infty\}=2\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[3],\,1+v[2]\}=\min\{2,2\}=2\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>2</td>
        <td>2</td>
        <td><span class="arithmatex">\(\min\{1+v[4],\,1+v[3]\}=\min\{3,2\}=2\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td>1</td>
        <td>3</td>
        <td><span class="arithmatex">\(\min\{1+v[5],\,1+v[4],\,1+v[0]\}=\min\{3,3,1\}=1\)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[6],\,1+v[5],\,1+v[1]\}=\min\{3,3,+\infty\}=3\)</span></td>
        </tr>
        <tr>
        <td>9</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(\min\{1+v[7],\,1+v[6],\,1+v[2]\}=\min\{2,3,2\}=2\)</span></td>
        </tr>
        </table></div>

        Questo è l'array $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrr}
        \hline {k} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 \\
        \hline {v[k]} & 0 & {+\infty} & 1 & 1 & 2 & 2 & 2 & 1 & 3 & 2 \\
        \hline
        \end{array}
        $$

        Questo è l'array $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrr}
        \hline {k} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 \\
        \hline {s[k]} & 0 & 0 & 1 & 2 & 1 & 1 & 2 & 3 & 1 & 1 \\
        \hline
        \end{array}
        $$

    2. Abbiamo il seguente array $s$:

        $$
        \begin{array}{l|rrrrrrrrrr}
        \hline {k} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 \\
        \hline {s[k]} & 0 & 0 & 1 & 2 & 1 & 1 & 2 & 3 & 1 & 1 \\
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
        <th><span class="arithmatex">\(k \leftarrow k-w_{s[k]}\)</span></th>
        </tr>
        <tr>
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
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=9-2=7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(k=7-7=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (1,0,1)
        $$

        è una soluzione ottima: il suo valore totale è $1\cdot2+1\cdot7=9=c$. Il valore ottimo è

        $$
        v[9]=2.
        $$
