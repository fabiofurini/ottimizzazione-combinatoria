---
title: "PD per il problema del cambio monete"
---

# PD per il problema del cambio monete

<div class="info-capitolo" markdown>

**Parte 3 · Programmazione dinamica · Capitolo 27** · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../pdf/dispensa-3-programmazione-dinamica.pdf) · [:material-pencil: Esercizi: Cambio monete (CCP)](../esercizi/dp-coin-change.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, il capitolo [«PD per il problema dello zaino illimitato»](dp-unbounded-knapsack/index.md): disponibilità illimitata di ogni tipo di oggetto e ricostruzione di una soluzione.

    - Da questo modulo, il capitolo [«Principi della programmazione dinamica»](dp-principles.md): sottostruttura ottima, sottoproblemi sovrapposti, casi base.

    - Dal modulo <em>Algoritmi</em>: [convenzioni dello pseudocodice (Capitolo 2)](https://fabiofurini.github.io/algoritmi/algoritmi-di-base/02-pseudocodice/) e [la dimensione dell'input (Capitolo 11)](https://fabiofurini.github.io/algoritmi/analisi/11-dimensione-input/).

!!! chiave "Obiettivi"

    Alla fine di questo capitolo saremo in grado di:

    - spiegare perché il CCP chiede un importo esatto e perché un'istanza può essere inammissibile;

    - scrivere la ricorrenza $v(k)$ con il valore $+\infty$ per gli importi che non si possono restituire;

    - eseguire a mano l'algoritmo di PD, seguendo i confronti con il miglior valore corrente $m$;

    - ricostruire una soluzione ottima come vettore $(x_1,\dots,x_n)$ quando l'istanza è ammissibile;

    - contare i passi dell'algoritmo di PD.

Il problema di questo capitolo è il [problema del resto (CCP)](../catalogo/coin-change-problem.md): la sua definizione è nella sua pagina.

## 27.1 Istanze e soluzioni ammissibili

<a id="box-1-texccpex1"></a>

!!! esempio "Esempio 27.1: Istanza del CCP"

    Consideriamo un resto $c=10$ da restituire e $n=3$ tagli di moneta:

    $$
    w = (2,3,5).
    $$

    Chiamiamo questa istanza del CCP <span style="color:#1971c2">[Esempio 27.1](#box-1-texccpex1)</span>.

!!! chiave ""

    A differenza del problema dello zaino 0/1 (KP), dove il peso totale degli oggetti scelti non deve superare la capacità, il CCP richiede che il valore totale delle monete scelte sia <em>esattamente uguale</em> a $c$. Inoltre, poiché ogni taglio è disponibile in quantità illimitata, il numero di monete di un dato taglio usate in una soluzione non è limitato a priori.

### 27.1.1 Codifica delle soluzioni ammissibili

!!! chiave ""

    Una <em>soluzione ammissibile</em> del CCP è una scelta del numero di monete di ogni taglio il cui valore totale sia esattamente uguale al resto $c$.

- Una soluzione ammissibile del CCP si può descrivere con il vettore intero

    $$
    (x_1,x_2,\dots,x_n)
    $$

    dove ogni componente ha il seguente significato:

    $$
    x_j = \text{numero di monete del taglio } j \text{ usate}, \qquad \forall j \in \{1,2,\dots,n\}, \quad x_j \in \Z_{\ge 0}.
    $$

    Poiché la soluzione è ammissibile, il valore totale delle monete scelte deve essere esattamente uguale a $c$:

    $$
    \sum_{j=1}^{n} w_j x_j = c.
    $$

    Il numero totale di monete di una soluzione ammissibile è

    $$
    \sum_{j=1}^{n} x_j.
    $$

- Poiché $\sum_{j=1}^{n} w_j x_j = c$, ogni componente $x_j$ di una soluzione ammissibile soddisfa $x_j \le \lfloor c/w_j \rfloor$. Quindi il numero di soluzioni ammissibili è finito, ma cresce rapidamente con $c$ e $n$, ed enumerarle tutte per trovare quella con meno monete diventa presto impraticabile.

## 27.2 Un algoritmo di PD

- <u>Passo 1</u>: calcolo del valore ottimo

    !!! formula ""

        Per ogni $k \in \{0,1,\dots,c\}$, sia $v(k)$ il valore ottimo della sottoistanza del CCP data da:

        1. un resto intero $k$ da restituire,

        2. lo stesso insieme $\{1,2,\dots,n\}$ di tagli, ciascuno disponibile in quantità illimitata.

        La formula ricorsiva per calcolare $v(k)$ è la seguente:

        \begin{equation*}
        \label{eq:ccp}
        v(k)= \left\{ \begin{array}{ll}
        0                                                                 & \textrm{se $k=0$,}                                              \\[2ex]
        +\infty                                                          & \textrm{se $k\ge 1$ e $w_j>k$ per ogni $j\in\{1,2,\dots,n\}$,} \\[2ex]
        \displaystyle \min_{j \,:\, w_j \,\le\, k} \big\{ 1 + v(k-w_j) \big\} & \textrm{se $k\ge 1$ e $w_j\le k$ per qualche $j\in\{1,2,\dots,n\}$.}
        \end{array} \right. \tag{27.1}
        \end{equation*}

    - Il processo di decomposizione ricorsiva della formula $\eqref{eq:ccp}$ genera al più $n$ <strong>sottoproblemi indipendenti</strong>, corrispondenti alle possibili scelte di un taglio $j$, con $w_j\le k$, usato come una delle monete che restituiscono il resto $k$.

    - Il caso base è $v(0)=0$, perché per restituire un resto nullo non serve alcuna moneta, e $v(k)=+\infty$ se nessun taglio è abbastanza piccolo da essere usato, perché in questo caso il resto $k$ non si può restituire affatto.

    - Il valore ottimo $v(k)$ si ottiene provando ogni taglio $j$ con $w_j\le k$ e scegliendo quello che minimizza la somma $1+v(k-w_j)$ della singola moneta del taglio $j$ e del valore ottimo del sottoproblema residuo, che restituisce il resto rimanente $k-w_j$.

    - Quindi una soluzione ottima per la sottoistanza con resto $k$ si costruisce combinando la moneta scelta, del taglio $j$, con una soluzione ottima del sottoproblema residuo corrispondente, che restituisce il resto $k-w_j$.

        $\rightsquigarrow$ <strong>Sottostruttura ottima verificata!</strong>

    - Scelte diverse del taglio usato come prima moneta, eventualmente fatte per valori diversi di $k$, possono portare allo stesso resto residuo; quindi lo stesso valore $v(k)$ può dover essere calcolato più volte durante la valutazione ricorsiva della formula $\eqref{eq:ccp}$.

        $\rightsquigarrow$ <strong>Sottoproblemi sovrapposti verificati!</strong>

    - Un <strong>primo metodo</strong> per calcolare il valore ottimo $v(c)$ dell'istanza del CCP è l'<strong>approccio top-down</strong>. Il metodo parte dalla chiamata con $k=c$ e valuta ricorsivamente la formula $\eqref{eq:ccp}$: ogni chiamata prova ogni taglio $j$ con $w_j\le k$, finché il resto vale $0$ o nessun taglio è abbastanza piccolo da essere usato.

    - L'<strong>albero di ricorsione</strong> della funzione $v$ ha un nodo per ogni chiamata ricorsiva, etichettato con la chiamata che rappresenta. La radice rappresenta la chiamata iniziale. I figli di un nodo rappresentano le chiamate ricorsive fatte da quella chiamata. Le foglie rappresentano i casi base.

        <a id="box-2-texccptree"></a>

        !!! esempio "Esempio 27.2: Albero di ricorsione"

            Consideriamo l'istanza del CCP dell'<span style="color:#1971c2">[Esempio 27.1](#box-1-texccpex1)</span>. Questo è l'albero di ricorsione dell'approccio top-down per calcolare $v(10)$:

            ![Figura 1](../img/dp-coin-change/fig01.svg){ .fig loading=lazy  }

            La funzione $v$ viene chiamata $42$ volte, e gli stessi sottoproblemi vengono risolti più volte: $v(0)$ viene chiamata $14$ volte, $v(1)$ $8$ volte, $v(2)$ $6$ volte, $v(3)$ $5$ volte, $v(4)$ $2$ volte e $v(5)$ $3$ volte. Tutte le altre chiamate vengono fatte una sola volta.

    - Il valore $v(k)$ si può calcolare una volta noti i valori $v(k')$ per ogni resto minore $k'<k$. Quindi tutti i valori $v(k)$ si possono calcolare considerando il resto $k$ in ordine crescente.

        <a id="box-3-texccpvalues"></a>

        !!! esempio "Esempio 27.3: Calcolo dei valori della funzione $v$"

            Consideriamo l'istanza del CCP dell'<span style="color:#1971c2">[Esempio 27.1](#box-1-texccpex1)</span>, con resto $c=10$ da restituire e tagli $w=(2,3,5)$.

            I valori della funzione $v$ si calcolano come segue:

            - Il caso base dà $v(0)=0$.

            - Calcolato $v(0)$, possiamo calcolare $v(1)$: poiché nessun taglio soddisfa $w_j\le 1$, otteniamo

                $$
                v(1) = +\infty.
                $$

            - Calcolato $v(0)$, possiamo calcolare $v(2)$:

                $$
                v(2) = 1+v(0) = 1+0 = 1.
                $$

            - Calcolati $v(0)$ e $v(1)$, possiamo calcolare $v(3)$:

                $$
                v(3) = \min\{1+v(1),\,1+v(0)\} = \min\{1+\infty,\,1+0\} = 1.
                $$

            - Calcolati $v(1)$ e $v(2)$, possiamo calcolare $v(4)$, provando ogni taglio $j$ con $w_j\le 4$:

                $$
                v(4) = \min\{1+v(2),\,1+v(1)\} = \min\{1+1,\,1+\infty\} = 2.
                $$

            - Calcolati $v(0)$, $v(2)$ e $v(3)$, possiamo calcolare $v(5)$:

                $$
                v(5) = \min\{1+v(3),\,1+v(2),\,1+v(0)\} = \min\{1+1,\,1+1,\,1+0\} = 1.
                $$

            - Calcolati $v(1)$, $v(3)$ e $v(4)$, possiamo calcolare $v(6)$:

                $$
                v(6) = \min\{1+v(4),\,1+v(3),\,1+v(1)\} = \min\{1+2,\,1+1,\,1+\infty\} = 2.
                $$

            - Calcolati $v(2)$, $v(4)$ e $v(5)$, possiamo calcolare $v(7)$, provando ogni taglio $j$ con $w_j\le 7$:

                $$
                v(7) = \min\{1+v(5),\,1+v(4),\,1+v(2)\} = \min\{1+1,\,1+2,\,1+1\} = 2.
                $$

                Qui i tagli $w_1=2$ e $w_3=5$ sono in pareggio: entrambi danno valore $2$. Poiché l'algoritmo bottom-up aggiorna il valore ottimo solo quando trova un valore strettamente minore, viene registrato il primo taglio che raggiunge il minimo, $w_1=2$.

            - Calcolati $v(3)$, $v(5)$ e $v(6)$, possiamo calcolare $v(8)$:

                $$
                v(8) = \min\{1+v(6),\,1+v(5),\,1+v(3)\} = \min\{1+2,\,1+1,\,1+1\} = 2.
                $$

            - Infine, calcolati $v(5)$, $v(7)$ e $v(8)$, possiamo calcolare $v(10)$, provando ogni taglio $j$ con $w_j\le 10$:

                $$
                v(10) = \min\{1+v(8),\,1+v(7),\,1+v(5)\} = \min\{1+2,\,1+2,\,1+1\} = 2.
                $$

    - Possiamo evitare di risolvere ripetutamente gli stessi sottoproblemi memorizzando il valore di ogni sottoproblema appena calcolato. I valori si memorizzano in una <strong>tabella di lookup</strong>.

    - Poiché la soluzione di ogni sottoproblema dipende solo dai sottoproblemi con un resto minore, possiamo risolvere i sottoproblemi in ordine crescente di $k$, partendo dal caso base $v(0)=0$ fino ad arrivare a $v(c)$.

    - Questa osservazione porta in modo naturale a un <strong>metodo molto più efficiente</strong> per calcolare il valore ottimo $v(c)$ dell'istanza del CCP.

    - Un <strong>secondo metodo</strong> per calcolare il valore ottimo $v(c)$ dell'istanza del CCP è l'<strong>approccio bottom-up</strong>. Il metodo parte dal caso base e valuta la formula $\eqref{eq:ccp}$ per valori crescenti di $k \in \{1,2,\dots,c\}$: ogni valore $v(k)$ si calcola con valori già calcolati, fino a ottenere il valore $v(c)$ dell'istanza del CCP.

        Questo è lo pseudocodice dell'<strong>algoritmo di PD con l'approccio bottom-up</strong>:

        !!! algoritmo "Algoritmo: CCP\_DP"

            <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> Un'istanza del CCP data da <span class="arithmatex">\(n\)</span>, dall'array <span class="arithmatex">\(w[1..n]\)</span> dei tagli e dal resto <span class="arithmatex">\(c\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> Il valore ottimo</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> CCP_DP(<span class="arithmatex">\(n,w,c\)</span>)</div><div class="pc" style="--liv:1" id="box-4-ccpbu-a"><span class="pc-n">2</span><span class="arithmatex">\(v := \textnormal{new array}[0..c]\)</span></div><div class="pc" style="--liv:1" id="box-5-ccpbu-b"><span class="pc-n">3</span><span class="arithmatex">\(v[0] \leftarrow 0\)</span></div><div class="pc" style="--liv:1" id="box-6-ccpbu-c"><span class="pc-n">4</span><strong>for</strong> <span class="arithmatex">\(k := 1\)</span> <strong>to</strong> <span class="arithmatex">\(c\)</span>  <strong>do</strong></div><div class="pc" style="--liv:2" id="box-7-ccpbu-d"><span class="pc-n">5</span><span class="arithmatex">\(m := +\infty\)</span></div><div class="pc" style="--liv:2" id="box-8-ccpbu-e"><span class="pc-n">6</span><strong>for</strong> <span class="arithmatex">\(j := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span>  <strong>do</strong></div><div class="pc" style="--liv:3" id="box-9-ccpbu-f"><span class="pc-n">7</span><strong>if</strong> <span class="arithmatex">\(w[j]\le k\)</span>  e <span class="arithmatex">\(1+v[k-w[j]] < m\)</span>  <strong>then</strong></div><div class="pc" style="--liv:4" id="box-10-ccpbu-g"><span class="pc-n">8</span><span class="arithmatex">\(m \leftarrow 1+v[k-w[j]]\)</span></div><div class="pc" style="--liv:3"><span class="pc-n">9</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">10</span><strong>end</strong></div><div class="pc" style="--liv:2" id="box-11-ccpbu-h"><span class="pc-n">11</span><span class="arithmatex">\(v[k] \leftarrow m\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">12</span><strong>end</strong></div><div class="pc" style="--liv:1" id="box-12-ccpbu-i"><span class="pc-n">13</span><strong>return</strong> <span class="arithmatex">\(v[c]\)</span></div></div>

        - L'array $v[0..c]$ è la <strong>tabella di lookup</strong>: memorizza i valori ottimi di tutti i sottoproblemi.

        - L'istruzione $v[0] \leftarrow 0$ inizializza il caso base, corrispondente a un resto nullo.

        - Il ciclo esterno, su $k \in \{1,2,\dots,c\}$, calcola le componenti dell'array in ordine crescente di resto.

        - Il ciclo interno, su $j \in \{1,2,\dots,n\}$, prova ogni taglio e tiene in $m$ il valore minimo trovato finora; $m$ è inizializzato a $+\infty$, così $v[k]$ resta $+\infty$ se non si trova alcun taglio $j$ con $w[j]\le k$.

        - Alla fine del ciclo interno, $v[k] \leftarrow m$ memorizza il valore ottimo $v[k]$.

        - Infine, l'algoritmo restituisce il valore ottimo dell'istanza del CCP, $v[c]$.

        <a id="box-13-texccpbu"></a>

        !!! esempio "Esempio 27.4: Esecuzione dell'algoritmo di PD"

            Consideriamo l'istanza del CCP dell'<span style="color:#1971c2">[Esempio 27.1](#box-1-texccpex1)</span>, con resto $c=10$ da restituire e tagli $w=(2,3,5)$.

            Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $k$ e $j$, la cella $v[k]$, il valore corrente di $m$ e il confronto eseguito. La cella di $m$ è evidenziata in <mark>rosso</mark> quando viene aggiornata; la cella di $v[k]$ è evidenziata in <mark>blu</mark> quando viene assegnata.

            <div class="tabella" markdown="0"><table>
            <tr>
            <th><span class="arithmatex">\(k\)</span></th>
            <th><span class="arithmatex">\(j\)</span></th>
            <th><span class="arithmatex">\(v[k]\)</span></th>
            <th><span class="arithmatex">\(m\)</span></th>
            <th>Azione</th>
            </tr>
            <tr>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-blu">0</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(v[0]\leftarrow 0\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(+\infty\)</span></td>
            <td><span class="arithmatex">\(m := +\infty\)</span></td>
            </tr>
            <tr>
            <td>1</td>
            <td>1</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(+\infty\)</span></td>
            <td><span class="arithmatex">\(w[1]=2>1\)</span>: si salta</td>
            </tr>
            <tr>
            <td></td>
            <td>2</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(+\infty\)</span></td>
            <td><span class="arithmatex">\(w[2]=3>1\)</span>: si salta</td>
            </tr>
            <tr>
            <td></td>
            <td>3</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(+\infty\)</span></td>
            <td><span class="arithmatex">\(w[3]=5>1\)</span>: si salta</td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-blu"><span class="arithmatex">\(+\infty\)</span></td>
            <td><span class="arithmatex">\(+\infty\)</span></td>
            <td><span class="arithmatex">\(v[1]\leftarrow m=+\infty\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(+\infty\)</span></td>
            <td><span class="arithmatex">\(m := +\infty\)</span></td>
            </tr>
            <tr>
            <td>2</td>
            <td>1</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-rossa"><span class="arithmatex">\(1\)</span></td>
            <td><span class="arithmatex">\(1{+}v[0]=1<m\)</span>: <span class="arithmatex">\(m\leftarrow 1\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td>2</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(1\)</span></td>
            <td><span class="arithmatex">\(w[2]=3>2\)</span>: si salta</td>
            </tr>
            <tr>
            <td></td>
            <td>3</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(1\)</span></td>
            <td><span class="arithmatex">\(w[3]=5>2\)</span>: si salta</td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-blu"><span class="arithmatex">\(1\)</span></td>
            <td><span class="arithmatex">\(1\)</span></td>
            <td><span class="arithmatex">\(v[2]\leftarrow m=1\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(+\infty\)</span></td>
            <td><span class="arithmatex">\(m := +\infty\)</span></td>
            </tr>
            <tr>
            <td>3</td>
            <td>1</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(+\infty\)</span></td>
            <td><span class="arithmatex">\(1{+}v[1]=+\infty\not<m=+\infty\)</span>: nessun aggiornamento</td>
            </tr>
            <tr>
            <td></td>
            <td>2</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-rossa"><span class="arithmatex">\(1\)</span></td>
            <td><span class="arithmatex">\(1{+}v[0]=1<m\)</span>: <span class="arithmatex">\(m\leftarrow 1\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td>3</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(1\)</span></td>
            <td><span class="arithmatex">\(w[3]=5>3\)</span>: si salta</td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-blu"><span class="arithmatex">\(1\)</span></td>
            <td><span class="arithmatex">\(1\)</span></td>
            <td><span class="arithmatex">\(v[3]\leftarrow m=1\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(+\infty\)</span></td>
            <td><span class="arithmatex">\(m := +\infty\)</span></td>
            </tr>
            <tr>
            <td>4</td>
            <td>1</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-rossa"><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(1{+}v[2]=2<m\)</span>: <span class="arithmatex">\(m\leftarrow 2\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td>2</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(1{+}v[1]=+\infty\not<m=2\)</span>: nessun aggiornamento</td>
            </tr>
            <tr>
            <td></td>
            <td>3</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(w[3]=5>4\)</span>: si salta</td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-blu"><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(v[4]\leftarrow m=2\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(+\infty\)</span></td>
            <td><span class="arithmatex">\(m := +\infty\)</span></td>
            </tr>
            <tr>
            <td>5</td>
            <td>1</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-rossa"><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(1{+}v[3]=2<m\)</span>: <span class="arithmatex">\(m\leftarrow 2\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td>2</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(1{+}v[2]=2\not<m=2\)</span>: nessun aggiornamento</td>
            </tr>
            <tr>
            <td></td>
            <td>3</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-rossa"><span class="arithmatex">\(1\)</span></td>
            <td><span class="arithmatex">\(1{+}v[0]=1<m\)</span>: <span class="arithmatex">\(m\leftarrow 1\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-blu"><span class="arithmatex">\(1\)</span></td>
            <td><span class="arithmatex">\(1\)</span></td>
            <td><span class="arithmatex">\(v[5]\leftarrow m=1\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(+\infty\)</span></td>
            <td><span class="arithmatex">\(m := +\infty\)</span></td>
            </tr>
            <tr>
            <td>6</td>
            <td>1</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-rossa"><span class="arithmatex">\(3\)</span></td>
            <td><span class="arithmatex">\(1{+}v[4]=3<m\)</span>: <span class="arithmatex">\(m\leftarrow 3\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td>2</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-rossa"><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(1{+}v[3]=2<m\)</span>: <span class="arithmatex">\(m\leftarrow 2\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td>3</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(1{+}v[1]=+\infty\not<m=2\)</span>: nessun aggiornamento</td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-blu"><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(v[6]\leftarrow m=2\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(+\infty\)</span></td>
            <td><span class="arithmatex">\(m := +\infty\)</span></td>
            </tr>
            <tr>
            <td>7</td>
            <td>1</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-rossa"><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(1{+}v[5]=2<m\)</span>: <span class="arithmatex">\(m\leftarrow 2\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td>2</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(1{+}v[4]=3\not<m=2\)</span>: nessun aggiornamento</td>
            </tr>
            <tr>
            <td></td>
            <td>3</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(1{+}v[2]=2\not<m=2\)</span>: nessun aggiornamento</td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-blu"><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(v[7]\leftarrow m=2\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(+\infty\)</span></td>
            <td><span class="arithmatex">\(m := +\infty\)</span></td>
            </tr>
            <tr>
            <td>8</td>
            <td>1</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-rossa"><span class="arithmatex">\(3\)</span></td>
            <td><span class="arithmatex">\(1{+}v[6]=3<m\)</span>: <span class="arithmatex">\(m\leftarrow 3\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td>2</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-rossa"><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(1{+}v[5]=2<m\)</span>: <span class="arithmatex">\(m\leftarrow 2\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td>3</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(1{+}v[3]=2\not<m=2\)</span>: nessun aggiornamento</td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-blu"><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(v[8]\leftarrow m=2\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(+\infty\)</span></td>
            <td><span class="arithmatex">\(m := +\infty\)</span></td>
            </tr>
            <tr>
            <td>9</td>
            <td>1</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-rossa"><span class="arithmatex">\(3\)</span></td>
            <td><span class="arithmatex">\(1{+}v[7]=3<m\)</span>: <span class="arithmatex">\(m\leftarrow 3\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td>2</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(3\)</span></td>
            <td><span class="arithmatex">\(1{+}v[6]=3\not<m=3\)</span>: nessun aggiornamento</td>
            </tr>
            <tr>
            <td></td>
            <td>3</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(3\)</span></td>
            <td><span class="arithmatex">\(1{+}v[4]=3\not<m=3\)</span>: nessun aggiornamento</td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-blu"><span class="arithmatex">\(3\)</span></td>
            <td><span class="arithmatex">\(3\)</span></td>
            <td><span class="arithmatex">\(v[9]\leftarrow m=3\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(+\infty\)</span></td>
            <td><span class="arithmatex">\(m := +\infty\)</span></td>
            </tr>
            <tr>
            <td>10</td>
            <td>1</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-rossa"><span class="arithmatex">\(3\)</span></td>
            <td><span class="arithmatex">\(1{+}v[8]=3<m\)</span>: <span class="arithmatex">\(m\leftarrow 3\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td>2</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(3\)</span></td>
            <td><span class="arithmatex">\(1{+}v[7]=3\not<m=3\)</span>: nessun aggiornamento</td>
            </tr>
            <tr>
            <td></td>
            <td>3</td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-rossa"><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(1{+}v[5]=2<m\)</span>: <span class="arithmatex">\(m\leftarrow 2\)</span></td>
            </tr>
            <tr>
            <td></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td class="cella-blu"><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(v[10]\leftarrow m=2\)</span></td>
            </tr>
            </table></div>

            Questo è l'array $v$ dopo l'esecuzione dell'algoritmo di PD:

            $$
            \begin{array}{l|rrrrrrrrrrr}
            \hline {k} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
            \hline {v[k]} & 0 & {+\infty} & 1 & 1 & 2 & 1 & 2 & 2 & 2 & 3 & 2 \\
            \hline
            \end{array}
            $$

    - Dopo l'esecuzione dell'algoritmo di PD, l'array $v$ contiene il valore ottimo $v[k]$ per ogni resto $k \in \{0,1,\dots,c\}$, dove $v[c]$ è il numero minimo di monete necessarie per restituire il resto $c$.

- <u>Passo 2</u>: calcolo di una soluzione ottima

    - Per calcolare una soluzione ottima, cioè il vettore intero $(x_1,x_2,\dots,x_n)$, è necessario memorizzare alcune informazioni aggiuntive.

    - Per ogni resto $k$, oltre al valore ottimo $v[k]$, memorizziamo $s[k]$, l'indice del taglio della moneta usata per ottenere il valore ottimo $v[k]$ nella formula $\eqref{eq:ccp}$.

    - Più precisamente, $s[k]$ è uguale all'indice $j$ del taglio $w_j$ che minimizza il membro destro della formula $\eqref{eq:ccp}$ nel calcolo di $v[k]$.

        Questo è lo pseudocodice dell'<strong>algoritmo di PD con l'approccio bottom-up</strong>, con la memorizzazione delle informazioni necessarie per costruire una soluzione ottima:

        !!! algoritmo "Algoritmo: CCP\_DP\_InfoSol"

            <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> Un'istanza del CCP data da <span class="arithmatex">\(n\)</span>, dall'array <span class="arithmatex">\(w[1..n]\)</span> dei tagli e dal resto <span class="arithmatex">\(c\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> Il valore ottimo e l'array <span class="arithmatex">\(s[0..c]\)</span> degli indici dei tagli usati</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> CCP_DP_InfoSol(<span class="arithmatex">\(n,w,c\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(v := \textnormal{new array}[0..c]\)</span>; <span class="arithmatex">\(s := \textnormal{new array}[0..c]\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><span class="arithmatex">\(v[0] \leftarrow 0\)</span>; <span class="arithmatex">\(s[0] \leftarrow 0\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">4</span><strong>for</strong> <span class="arithmatex">\(k := 1\)</span> <strong>to</strong> <span class="arithmatex">\(c\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><span class="arithmatex">\(m := +\infty\)</span>; <span class="arithmatex">\(t := 0\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">6</span><strong>for</strong> <span class="arithmatex">\(j := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:3"><span class="pc-n">7</span><strong>if</strong> <span class="arithmatex">\(w[j]\le k\)</span>  e <span class="arithmatex">\(1+v[k-w[j]] < m\)</span> <strong>then</strong></div><div class="pc" style="--liv:4"><span class="pc-n">8</span><span class="arithmatex">\(m \leftarrow 1+v[k-w[j]]\)</span>; <span class="arithmatex">\(t \leftarrow j\)</span></div><div class="pc" style="--liv:3"><span class="pc-n">9</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">10</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">11</span><span class="arithmatex">\(v[k] \leftarrow m\)</span>; <span class="arithmatex">\(s[k] \leftarrow t\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">12</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">13</span><strong>return</strong> <span class="arithmatex">\(v[c], s\)</span></div></div>

        - L'algoritmo di PD usa la variabile temporanea aggiuntiva $t$ per tenere traccia della decisione presa quando $m$ viene aggiornato. Se si usa il taglio $w[j]$, $t \leftarrow j$ ne memorizza l'indice. Alla fine del ciclo interno, $s[k]\leftarrow t$ memorizza l'indice del taglio della moneta usata, insieme al valore ottimo $v[k]\leftarrow m$.

        <a id="box-14-texccpinfo"></a>

        !!! esempio "Esempio 27.5: Calcolo delle informazioni aggiuntive"

            Consideriamo l'istanza del CCP dell'<span style="color:#1971c2">[Esempio 27.1](#box-1-texccpex1)</span>, con resto $c=10$ da restituire e tagli $w=(2,3,5)$.

            Questo è l'array $s$ dopo l'esecuzione dell'algoritmo di PD:

            $$
            \begin{array}{l|rrrrrrrrrrr}
            \hline {k} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
            \hline {s[k]} & 0 & 0 & 1 & 2 & 1 & 3 & 2 & 1 & 2 & 1 & 3 \\
            \hline
            \end{array}
            $$

            Per esempio, $s[5]=3$ perché la formula $\eqref{eq:ccp}$ sceglie il taglio $w_3=5$ nel calcolo di $v[5]=1$, e $s[10]=3$ perché il taglio $w_3=5$ viene scelto anche nel calcolo di $v[10]=2$. La componente $s[1]$ resta indefinita ($0$, per convenzione), perché $v[1]=+\infty$ è inammissibile.

    - Calcolato l'array $s$, e purché $v[c]<+\infty$, si può ricostruire una soluzione ottima usando ripetutamente una moneta del taglio $s[k]$ e passando al resto residuo $k-w_{s[k]}$, partendo da $k=c$ e da $x_j=0$ per ogni $j \in \{1,2,\dots,n\}$, finché $k=0$:

        $$
        x_{s[k]} \leftarrow x_{s[k]}+1, \qquad k \leftarrow k - w_{s[k]}.
        $$

        Si ottiene così il vettore $(x_1,x_2,\dots,x_n)$, dove ogni componente $x_j$ è il numero di monete del taglio $j$ in una soluzione ottima.

    - La condizione $v[c]<+\infty$ è necessaria: se $v[c]=+\infty$ l'istanza è inammissibile, $s[c]=0$ e non c'è alcuna soluzione da ricostruire. Se $v[c]<+\infty$, allora $s[k]\ge 1$ per ogni resto $k$ visitato dalla procedura.

        !!! algoritmo "Algoritmo: CCP\_Reconstruct"

            <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> Il numero <span class="arithmatex">\(n\)</span> di tagli, l'array <span class="arithmatex">\(w[1..n]\)</span>, il resto <span class="arithmatex">\(c\)</span> con <span class="arithmatex">\(v[c]<+\infty\)</span> e l'array <span class="arithmatex">\(s[0..c]\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> Una soluzione ottima</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> CCP_Reconstruct(<span class="arithmatex">\(n,w,c,s\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(x := \textnormal{new array}[1..n]\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(j := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><span class="arithmatex">\(x[j] \leftarrow 0\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">5</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">6</span><span class="arithmatex">\(k := c\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">7</span><strong>while</strong> <span class="arithmatex">\(k>0\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">8</span><span class="arithmatex">\(x[s[k]] \leftarrow x[s[k]]+1\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">9</span><span class="arithmatex">\(k \leftarrow k-w[s[k]]\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">10</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">11</span><strong>return</strong> <span class="arithmatex">\(x\)</span></div></div>

        <a id="box-15-texccpsolvector"></a>

        !!! esempio "Esempio 27.6: Calcolo di una soluzione ottima"

            Dopo l'esecuzione dell'algoritmo di PD sull'istanza dell'<span style="color:#1971c2">[Esempio 27.1](#box-1-texccpex1)</span>, abbiamo il seguente array $s$:

            $$
            \begin{array}{l|rrrrrrrrrrr}
            \hline {k} & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\
            \hline {s[k]} & 0 & 0 & 1 & 2 & 1 & 3 & 2 & 1 & 2 & 1 & 3 \\
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
            <th><span class="arithmatex">\(k \leftarrow k-w_{s[k]}\)</span></th>
            </tr>
            <tr>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td><span class="arithmatex">\(-\)</span></td>
            <td>0</td>
            <td>0</td>
            <td>0</td>
            <td><span class="arithmatex">\(k=10\)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">\(1\)</span></td>
            <td><span class="arithmatex">\(10\)</span></td>
            <td><span class="arithmatex">\(3\)</span></td>
            <td>0</td>
            <td>0</td>
            <td class="cella-blu">1</td>
            <td><span class="arithmatex">\(k=10-5=5\)</span></td>
            </tr>
            <tr>
            <td><span class="arithmatex">\(2\)</span></td>
            <td><span class="arithmatex">\(5\)</span></td>
            <td><span class="arithmatex">\(3\)</span></td>
            <td>0</td>
            <td>0</td>
            <td class="cella-blu">2</td>
            <td><span class="arithmatex">\(k=5-5=0\)</span></td>
            </tr>
            </table></div>

            Quindi il vettore

            $$
            (0,0,2)
            $$

            è una soluzione ottima: usa due monete del taglio $w_3=5$. Il valore totale corrispondente è $2\cdot5=10=c$. Il valore ottimo corrispondente è $v(10)=2$.

### 27.2.1 Numero di passi

- Sia $S(n,c)$ il numero di passi eseguiti da <code>CCP\_DP</code> nel caso peggiore, dove $n$ è il numero di tagli e $c$ è il resto. Calcoliamo $S(n,c)$ contando quante volte vengono eseguite le righe dello pseudocodice di <code>CCP\_DP</code>.

- Nel caso peggiore, la condizione alla riga [7](#box-9-ccpbu-f) è vera a ogni iterazione del ciclo interno, e quindi la riga [8](#box-10-ccpbu-g) viene eseguita tante volte quanto la riga [7](#box-9-ccpbu-f). Il numero di esecuzioni delle righe rilevanti è:

    - <span style="color:#e03131">Riga</span> [2](#box-4-ccpbu-a) viene eseguita $1$ volta.

    - <span style="color:#e03131">Riga</span> [3](#box-5-ccpbu-b) viene eseguita $1$ volta.

    - <span style="color:#e03131">Riga</span> [4](#box-6-ccpbu-c) viene eseguita $c$ volte.

    - <span style="color:#e03131">Riga</span> [5](#box-7-ccpbu-d) viene eseguita $c$ volte.

    - <span style="color:#e03131">Riga</span> [6](#box-8-ccpbu-e) viene eseguita $cn$ volte.

    - <span style="color:#e03131">Riga</span> [7](#box-9-ccpbu-f) viene eseguita $cn$ volte.

    - <span style="color:#e03131">Riga</span> [8](#box-10-ccpbu-g) viene eseguita $cn$ volte.

    - <span style="color:#e03131">Riga</span> [11](#box-11-ccpbu-h) viene eseguita $c$ volte.

    - <span style="color:#e03131">Riga</span> [13](#box-12-ccpbu-i) viene eseguita $1$ volta.

    Quindi il numero totale di passi nel caso peggiore è

    $$
    1+1+c+c+cn+cn+cn+c+1.
    $$

    Quindi

    $$
    S(n,c)=3+3c+3cn.
    $$

    Quindi

    $$
    S(n,c)=\Theta(nc).
    $$

    Infatti,

    $$
    \lim_{n,c\to\infty}
    \frac{3cn+3c+3}{nc}
    =
    \lim_{n,c\to\infty}
    \left(3+\frac{3}{n}+\frac{3}{nc}\right)
    =
    3\in\mathbb{R}_{>0}.
    $$

    !!! chiave ""

        L'algoritmo di PD esegue

        $$
        S(n,c)=\Theta(nc)
        $$

        passi nel caso peggiore.

- La versione <code>CCP\_DP\_InfoSol</code> memorizza l'array aggiuntivo $s$ ed esegue solo un numero costante di operazioni in più dentro gli stessi cicli. Quindi il suo numero di passi resta $\Theta(nc)$.

## 27.3 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Usare $0$ invece di $+\infty$.</strong> Un importo che non si può restituire ha $v(k)=+\infty$; con il valore $0$ l'algoritmo di PD affermerebbe che non serve alcuna moneta.

    - <strong>Ricostruire un'istanza inammissibile.</strong> Se $v[c]=+\infty$ allora $s[c]=0$, e la ricostruzione leggerebbe $x[0]$ e $w[0]$, fuori dagli array: bisogna prima controllare che $v[c]<+\infty$.

    - <strong>Memorizzare il valore della moneta invece del suo indice.</strong> Il vettore $x$ è indicizzato dai tagli: $s[k]$ memorizza l'indice $j$, e il valore della moneta è $w_{s[k]}$.

    - <strong>Confondere il CCP con l'UKP.</strong> Il CCP chiede esattamente $c$ e minimizza il numero di monete; l'UKP chiede al più $c$ e massimizza il profitto.

## 27.4 In sintesi

!!! chiave "In sintesi"

    - Il CCP chiede il numero minimo di monete il cui valore totale sia esattamente $c$; l'istanza è inammissibile quando $v(c)=+\infty$.

    - La ricorrenza $v(k)=\min_{j:\,w_j\le k}\{1+v(k-w_j)\}$ si calcola bottom-up in $\Theta(nc)$ passi, un numero pseudo-polinomiale.

    - Una soluzione ottima si legge a ritroso a partire da $s[c]$, l'indice del taglio della prima moneta scelta per l'importo $c$, e solo se $v[c]<+\infty$.

    <strong>Quadro riassuntivo dell'esempio del CCP.</strong> [Esempio 27.1](#box-1-texccpex1) ($c=10$, $w=(2,3,5)$):

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Metodo</th>
    <th>Lower bound</th>
    <th>Upper bound</th>
    <th>Origine</th>
    </tr>
    <tr>
    <td>Algoritmo di PD</td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td>numero minimo di monete, soluzione <span class="arithmatex">\((0,0,2)\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Cambio monete (CCP)](../esercizi/dp-coin-change.md)
