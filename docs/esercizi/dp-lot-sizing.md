---
title: "Esercizi · PD per il problema del lot sizing senza capacità"
---

# Esercizi · PD per il problema del lot sizing senza capacità

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 25** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 25: Lot sizing senza capacità (ULS)](../programmazione-dinamica/dp-lot-sizing/index.md) · [:material-file-pdf-box: Eserciziario, volume 3 (PDF)](../pdf/esercizi-3-programmazione-dinamica.pdf)

</div>

<a id="esercizio-25-1"></a>

!!! esercizio "Esercizio 25.1: Esercizio 1: problema di lot sizing senza capacità"

    Consideriamo la seguente istanza dell'ULS con $m=4$ periodi, in cui le domande, i costi di setup, i costi variabili di produzione e i costi di mantenimento a scorta sono:

    $$
    \begin{array}{l|rrrr}
    \hline {t} & {1} & {2} & {3} & {4} \\
    \hline {d_t} & {30} & {10} & {40} & {10} \\
    {sc_t} & {50} & {80} & {70} & {60} \\
    {vc_t} & {2} & {3} & {1} & {2} \\
    {hc_t} & {1} & {2} & {2} & {1} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni iterazione, i valori della matrice ${c}$, del vettore ${v}$ e del vettore ${r}$.

    2. Usando il vettore ${r}$, ricostruire una soluzione ottima $(x_1,x_2,\dots,x_m)$ e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up

        Per prima cosa si calcola la matrice ${c}$. Per ogni passo, la tabella riporta i valori di $j$ e $t$, il valore corrente di $\mathit{u}$, la cella ${c}[j][t]$ e l'operazione eseguita; la cella ${c}[j][t]$ è evidenziata in <mark>blu</mark> quando viene assegnata.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(t\)</span></th>
        <th><span class="arithmatex">\(\mathit{u}\)</span></th>
        <th><span class="arithmatex">\({c}[j][t]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(110\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow vc[1]=2\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow sc[1]{+}vc[1]\cdot d[1]=50{+}2\cdot 30=110\)</span>, <span class="arithmatex">\({c}[1][1]\leftarrow 110\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(140\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[1]=2{+}1=3\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[2]=110{+}3\cdot 10=140\)</span>, <span class="arithmatex">\({c}[1][2]\leftarrow 140\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(340\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[2]=3{+}2=5\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[3]=140{+}5\cdot 40=340\)</span>, <span class="arithmatex">\({c}[1][3]\leftarrow 340\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(410\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[3]=5{+}2=7\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[4]=340{+}7\cdot 10=410\)</span>, <span class="arithmatex">\({c}[1][4]\leftarrow 410\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(110\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow vc[2]=3\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow sc[2]{+}vc[2]\cdot d[2]=80{+}3\cdot 10=110\)</span>, <span class="arithmatex">\({c}[2][2]\leftarrow 110\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(310\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[2]=3{+}2=5\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[3]=110{+}5\cdot 40=310\)</span>, <span class="arithmatex">\({c}[2][3]\leftarrow 310\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(380\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[3]=5{+}2=7\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[4]=310{+}7\cdot 10=380\)</span>, <span class="arithmatex">\({c}[2][4]\leftarrow 380\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(110\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow vc[3]=1\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow sc[3]{+}vc[3]\cdot d[3]=70{+}1\cdot 40=110\)</span>, <span class="arithmatex">\({c}[3][3]\leftarrow 110\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(140\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[3]=1{+}2=3\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[4]=110{+}3\cdot 10=140\)</span>, <span class="arithmatex">\({c}[3][4]\leftarrow 140\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(80\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow vc[4]=2\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow sc[4]{+}vc[4]\cdot d[4]=60{+}2\cdot 10=80\)</span>, <span class="arithmatex">\({c}[4][4]\leftarrow 80\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice ${c}$:

        $$
        \begin{array}{l|rrrr}
        \hline {{c}[j][t]} & {t=1} & {t=2} & {t=3} & {t=4} \\
        \hline {j=1} & {110} & {140} & {340} & {410} \\
        {j=2} & {-} & {110} & {310} & {380} \\
        {j=3} & {-} & {-} & {110} & {140} \\
        {j=4} & {-} & {-} & {-} & {80} \\
        \hline
        \end{array}
        $$

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $t$ e $j$, le celle ${v}[t]$ e ${r}[t]$, il valore corrente di $\mathit{b}$ e il valore corrente di $\mathit{a}$. La cella di $\mathit{b}$ è evidenziata in <mark>rosso</mark> quando viene aggiornata; la cella di $\mathit{a}$ è evidenziata in <mark>blu</mark> quando viene aggiornata; le celle di ${v}[t]$ e ${r}[t]$ sono evidenziate in <mark>blu</mark> quando vengono assegnate.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(t\)</span></th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\({v}[t]\)</span></th>
        <th><span class="arithmatex">\({r}[t]\)</span></th>
        <th><span class="arithmatex">\(\mathit{b}\)</span></th>
        <th><span class="arithmatex">\(\mathit{a}\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\({v}[0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{b}\leftarrow +\infty\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">110</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\({v}[0]{+}{c}[1][1]=0{+}110=110<+\infty\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 110\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">110</td>
        <td class="cella-blu">1</td>
        <td>110</td>
        <td>1</td>
        <td><span class="arithmatex">\({v}[1]\leftarrow \mathit{b}=110\)</span>, <span class="arithmatex">\({r}[1]\leftarrow \mathit{a}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{b}\leftarrow +\infty\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">140</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\({v}[0]{+}{c}[1][2]=0{+}140=140<+\infty\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 140\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>140</td>
        <td>1</td>
        <td><span class="arithmatex">\({v}[1]{+}{c}[2][2]=110{+}110=220>140\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">140</td>
        <td class="cella-blu">1</td>
        <td>140</td>
        <td>1</td>
        <td><span class="arithmatex">\({v}[2]\leftarrow \mathit{b}=140\)</span>, <span class="arithmatex">\({r}[2]\leftarrow \mathit{a}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{b}\leftarrow +\infty\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">340</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\({v}[0]{+}{c}[1][3]=0{+}340=340<+\infty\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 340\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>340</td>
        <td>1</td>
        <td><span class="arithmatex">\({v}[1]{+}{c}[2][3]=110{+}310=420>340\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">250</td>
        <td class="cella-blu">3</td>
        <td><span class="arithmatex">\({v}[2]{+}{c}[3][3]=140{+}110=250<340\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 250\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">250</td>
        <td class="cella-blu">3</td>
        <td>250</td>
        <td>3</td>
        <td><span class="arithmatex">\({v}[3]\leftarrow \mathit{b}=250\)</span>, <span class="arithmatex">\({r}[3]\leftarrow \mathit{a}=3\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{b}\leftarrow +\infty\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">410</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\({v}[0]{+}{c}[1][4]=0{+}410=410<+\infty\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 410\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>410</td>
        <td>1</td>
        <td><span class="arithmatex">\({v}[1]{+}{c}[2][4]=110{+}380=490>410\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">280</td>
        <td class="cella-blu">3</td>
        <td><span class="arithmatex">\({v}[2]{+}{c}[3][4]=140{+}140=280<410\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 280\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>280</td>
        <td>3</td>
        <td><span class="arithmatex">\({v}[3]{+}{c}[4][4]=250{+}80=330>280\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">280</td>
        <td class="cella-blu">3</td>
        <td>280</td>
        <td>3</td>
        <td><span class="arithmatex">\({v}[4]\leftarrow \mathit{b}=280\)</span>, <span class="arithmatex">\({r}[4]\leftarrow \mathit{a}=3\)</span></td>
        </tr>
        </table></div>

        Questo è il vettore ${v}$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{c|ccccc}
        \hline  & {t=0} & {t=1} & {t=2} & {t=3} & {t=4} \\
        \hline {{v}[t]} & 0 & 110 & 140 & 250 & 280 \\
        \hline
        \end{array}
        $$

        Questo è il vettore ${r}$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{c|cccc}
        \hline  & {t=1} & {t=2} & {t=3} & {t=4} \\
        \hline {{r}[t]} & 1 & 1 & 3 & 3 \\
        \hline
        \end{array}
        $$

    2. Abbiamo il seguente vettore ${r}$:

        $$
        \begin{array}{c|cccc}
        \hline  & {t=1} & {t=2} & {t=3} & {t=4} \\
        \hline {{r}[t]} & 1 & 1 & 3 & 3 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(t\)</span></th>
        <th><span class="arithmatex">\({r}[t]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th><span class="arithmatex">\(t\leftarrow {r}[t]-1\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(t=4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">50</td>
        <td>0</td>
        <td><span class="arithmatex">\(t=3-1=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">40</td>
        <td>0</td>
        <td>50</td>
        <td>0</td>
        <td><span class="arithmatex">\(t=1-1=0\)</span></td>
        </tr>
        </table></div>

        - $t=4$, ${r}[4]=3$: l'ultimo lotto di produzione dei periodi $1,\dots,4$ è nel periodo $3$ e copre le domande dei periodi $3,\dots,4$, quindi $x[3]\leftarrow d_{3}+d_{4}=40+10=50$

        - $t=2$, ${r}[2]=1$: l'ultimo lotto di produzione dei periodi $1,\dots,2$ è nel periodo $1$ e copre le domande dei periodi $1,\dots,2$, quindi $x[1]\leftarrow d_{1}+d_{2}=30+10=40$

        Quindi il vettore

        $$
        (40,\allowbreak 0,\allowbreak 50,\allowbreak 0)
        $$

        è una soluzione ottima. I setup sono nei periodi $1$, $3$, le scorte sono $(s_1,\dots,s_{4})=(10,\allowbreak 0,\allowbreak 10,\allowbreak 0)$, e il costo totale è

        \begin{align*}
        &\underbrace{50+70}_{\text{setup}}+\underbrace{2\cdot 40+3\cdot 0+1\cdot 50+2\cdot 0}_{\text{produzione}}\\
        &\quad+\underbrace{1\cdot 10+2\cdot 0+2\cdot 10+1\cdot 0}_{\text{mantenimento}}=120+130+30=280.
        \end{align*}

        Il valore ottimo è

        $$
        {v}[4]=280.
        $$

<a id="esercizio-25-2"></a>

!!! esercizio "Esercizio 25.2: Esercizio 2: problema di lot sizing senza capacità"

    Consideriamo la seguente istanza dell'ULS con $m=4$ periodi, in cui le domande, i costi di setup, i costi variabili di produzione e i costi di mantenimento a scorta sono:

    $$
    \begin{array}{l|rrrr}
    \hline {t} & {1} & {2} & {3} & {4} \\
    \hline {d_t} & {30} & {40} & {10} & {20} \\
    {sc_t} & {50} & {80} & {80} & {50} \\
    {vc_t} & {1} & {3} & {2} & {1} \\
    {hc_t} & {1} & {1} & {1} & {2} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni iterazione, i valori della matrice ${c}$, del vettore ${v}$ e del vettore ${r}$.

    2. Usando il vettore ${r}$, ricostruire una soluzione ottima $(x_1,x_2,\dots,x_m)$ e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up

        Per prima cosa si calcola la matrice ${c}$. Per ogni passo, la tabella riporta i valori di $j$ e $t$, il valore corrente di $\mathit{u}$, la cella ${c}[j][t]$ e l'operazione eseguita; la cella ${c}[j][t]$ è evidenziata in <mark>blu</mark> quando viene assegnata.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(t\)</span></th>
        <th><span class="arithmatex">\(\mathit{u}\)</span></th>
        <th><span class="arithmatex">\({c}[j][t]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(80\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow vc[1]=1\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow sc[1]{+}vc[1]\cdot d[1]=50{+}1\cdot 30=80\)</span>, <span class="arithmatex">\({c}[1][1]\leftarrow 80\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(160\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[1]=1{+}1=2\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[2]=80{+}2\cdot 40=160\)</span>, <span class="arithmatex">\({c}[1][2]\leftarrow 160\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(190\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[2]=2{+}1=3\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[3]=160{+}3\cdot 10=190\)</span>, <span class="arithmatex">\({c}[1][3]\leftarrow 190\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(270\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[3]=3{+}1=4\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[4]=190{+}4\cdot 20=270\)</span>, <span class="arithmatex">\({c}[1][4]\leftarrow 270\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(200\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow vc[2]=3\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow sc[2]{+}vc[2]\cdot d[2]=80{+}3\cdot 40=200\)</span>, <span class="arithmatex">\({c}[2][2]\leftarrow 200\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(240\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[2]=3{+}1=4\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[3]=200{+}4\cdot 10=240\)</span>, <span class="arithmatex">\({c}[2][3]\leftarrow 240\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(340\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[3]=4{+}1=5\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[4]=240{+}5\cdot 20=340\)</span>, <span class="arithmatex">\({c}[2][4]\leftarrow 340\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(100\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow vc[3]=2\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow sc[3]{+}vc[3]\cdot d[3]=80{+}2\cdot 10=100\)</span>, <span class="arithmatex">\({c}[3][3]\leftarrow 100\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(160\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[3]=2{+}1=3\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[4]=100{+}3\cdot 20=160\)</span>, <span class="arithmatex">\({c}[3][4]\leftarrow 160\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(70\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow vc[4]=1\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow sc[4]{+}vc[4]\cdot d[4]=50{+}1\cdot 20=70\)</span>, <span class="arithmatex">\({c}[4][4]\leftarrow 70\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice ${c}$:

        $$
        \begin{array}{l|rrrr}
        \hline {{c}[j][t]} & {t=1} & {t=2} & {t=3} & {t=4} \\
        \hline {j=1} & {80} & {160} & {190} & {270} \\
        {j=2} & {-} & {200} & {240} & {340} \\
        {j=3} & {-} & {-} & {100} & {160} \\
        {j=4} & {-} & {-} & {-} & {70} \\
        \hline
        \end{array}
        $$

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $t$ e $j$, le celle ${v}[t]$ e ${r}[t]$, il valore corrente di $\mathit{b}$ e il valore corrente di $\mathit{a}$. La cella di $\mathit{b}$ è evidenziata in <mark>rosso</mark> quando viene aggiornata; la cella di $\mathit{a}$ è evidenziata in <mark>blu</mark> quando viene aggiornata; le celle di ${v}[t]$ e ${r}[t]$ sono evidenziate in <mark>blu</mark> quando vengono assegnate.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(t\)</span></th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\({v}[t]\)</span></th>
        <th><span class="arithmatex">\({r}[t]\)</span></th>
        <th><span class="arithmatex">\(\mathit{b}\)</span></th>
        <th><span class="arithmatex">\(\mathit{a}\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\({v}[0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{b}\leftarrow +\infty\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">80</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\({v}[0]{+}{c}[1][1]=0{+}80=80<+\infty\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 80\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">80</td>
        <td class="cella-blu">1</td>
        <td>80</td>
        <td>1</td>
        <td><span class="arithmatex">\({v}[1]\leftarrow \mathit{b}=80\)</span>, <span class="arithmatex">\({r}[1]\leftarrow \mathit{a}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{b}\leftarrow +\infty\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">160</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\({v}[0]{+}{c}[1][2]=0{+}160=160<+\infty\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 160\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>160</td>
        <td>1</td>
        <td><span class="arithmatex">\({v}[1]{+}{c}[2][2]=80{+}200=280>160\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">160</td>
        <td class="cella-blu">1</td>
        <td>160</td>
        <td>1</td>
        <td><span class="arithmatex">\({v}[2]\leftarrow \mathit{b}=160\)</span>, <span class="arithmatex">\({r}[2]\leftarrow \mathit{a}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{b}\leftarrow +\infty\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">190</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\({v}[0]{+}{c}[1][3]=0{+}190=190<+\infty\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 190\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>190</td>
        <td>1</td>
        <td><span class="arithmatex">\({v}[1]{+}{c}[2][3]=80{+}240=320>190\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>190</td>
        <td>1</td>
        <td><span class="arithmatex">\({v}[2]{+}{c}[3][3]=160{+}100=260>190\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">190</td>
        <td class="cella-blu">1</td>
        <td>190</td>
        <td>1</td>
        <td><span class="arithmatex">\({v}[3]\leftarrow \mathit{b}=190\)</span>, <span class="arithmatex">\({r}[3]\leftarrow \mathit{a}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{b}\leftarrow +\infty\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">270</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\({v}[0]{+}{c}[1][4]=0{+}270=270<+\infty\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 270\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>270</td>
        <td>1</td>
        <td><span class="arithmatex">\({v}[1]{+}{c}[2][4]=80{+}340=420>270\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>270</td>
        <td>1</td>
        <td><span class="arithmatex">\({v}[2]{+}{c}[3][4]=160{+}160=320>270\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">260</td>
        <td class="cella-blu">4</td>
        <td><span class="arithmatex">\({v}[3]{+}{c}[4][4]=190{+}70=260<270\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 260\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 4\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">260</td>
        <td class="cella-blu">4</td>
        <td>260</td>
        <td>4</td>
        <td><span class="arithmatex">\({v}[4]\leftarrow \mathit{b}=260\)</span>, <span class="arithmatex">\({r}[4]\leftarrow \mathit{a}=4\)</span></td>
        </tr>
        </table></div>

        Questo è il vettore ${v}$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{c|ccccc}
        \hline  & {t=0} & {t=1} & {t=2} & {t=3} & {t=4} \\
        \hline {{v}[t]} & 0 & 80 & 160 & 190 & 260 \\
        \hline
        \end{array}
        $$

        Questo è il vettore ${r}$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{c|cccc}
        \hline  & {t=1} & {t=2} & {t=3} & {t=4} \\
        \hline {{r}[t]} & 1 & 1 & 1 & 4 \\
        \hline
        \end{array}
        $$

    2. Abbiamo il seguente vettore ${r}$:

        $$
        \begin{array}{c|cccc}
        \hline  & {t=1} & {t=2} & {t=3} & {t=4} \\
        \hline {{r}[t]} & 1 & 1 & 1 & 4 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(t\)</span></th>
        <th><span class="arithmatex">\({r}[t]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th><span class="arithmatex">\(t\leftarrow {r}[t]-1\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(t=4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">20</td>
        <td><span class="arithmatex">\(t=4-1=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">80</td>
        <td>0</td>
        <td>0</td>
        <td>20</td>
        <td><span class="arithmatex">\(t=1-1=0\)</span></td>
        </tr>
        </table></div>

        - $t=4$, ${r}[4]=4$: il periodo $4$ produce solo la propria domanda, quindi $x[4]\leftarrow d_{4}=20$

        - $t=3$, ${r}[3]=1$: l'ultimo lotto di produzione dei periodi $1,\dots,3$ è nel periodo $1$ e copre le domande dei periodi $1,\dots,3$, quindi $x[1]\leftarrow d_{1}+d_{2}+d_{3}=30+40+10=80$

        Quindi il vettore

        $$
        (80,\allowbreak 0,\allowbreak 0,\allowbreak 20)
        $$

        è una soluzione ottima. I setup sono nei periodi $1$, $4$, le scorte sono $(s_1,\dots,s_{4})=(50,\allowbreak 10,\allowbreak 0,\allowbreak 0)$, e il costo totale è

        \begin{align*}
        &\underbrace{50+50}_{\text{setup}}+\underbrace{1\cdot 80+3\cdot 0+2\cdot 0+1\cdot 20}_{\text{produzione}}\\
        &\quad+\underbrace{1\cdot 50+1\cdot 10+1\cdot 0+2\cdot 0}_{\text{mantenimento}}=100+100+60=260.
        \end{align*}

        Il valore ottimo è

        $$
        {v}[4]=260.
        $$

<a id="esercizio-25-3"></a>

!!! esercizio "Esercizio 25.3: Esercizio 3: problema di lot sizing senza capacità"

    Consideriamo la seguente istanza dell'ULS con $m=5$ periodi, in cui le domande, i costi di setup, i costi variabili di produzione e i costi di mantenimento a scorta sono:

    $$
    \begin{array}{l|rrrrr}
    \hline {t} & {1} & {2} & {3} & {4} & {5} \\
    \hline {d_t} & {10} & {30} & {40} & {30} & {40} \\
    {sc_t} & {70} & {80} & {50} & {80} & {50} \\
    {vc_t} & {1} & {1} & {1} & {1} & {2} \\
    {hc_t} & {1} & {1} & {2} & {1} & {2} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni iterazione, i valori della matrice ${c}$, del vettore ${v}$ e del vettore ${r}$.

    2. Usando il vettore ${r}$, ricostruire una soluzione ottima $(x_1,x_2,\dots,x_m)$ e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up

        Per prima cosa si calcola la matrice ${c}$. Per ogni passo, la tabella riporta i valori di $j$ e $t$, il valore corrente di $\mathit{u}$, la cella ${c}[j][t]$ e l'operazione eseguita; la cella ${c}[j][t]$ è evidenziata in <mark>blu</mark> quando viene assegnata.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(t\)</span></th>
        <th><span class="arithmatex">\(\mathit{u}\)</span></th>
        <th><span class="arithmatex">\({c}[j][t]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(80\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow vc[1]=1\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow sc[1]{+}vc[1]\cdot d[1]=70{+}1\cdot 10=80\)</span>, <span class="arithmatex">\({c}[1][1]\leftarrow 80\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(140\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[1]=1{+}1=2\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[2]=80{+}2\cdot 30=140\)</span>, <span class="arithmatex">\({c}[1][2]\leftarrow 140\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(260\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[2]=2{+}1=3\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[3]=140{+}3\cdot 40=260\)</span>, <span class="arithmatex">\({c}[1][3]\leftarrow 260\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(410\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[3]=3{+}2=5\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[4]=260{+}5\cdot 30=410\)</span>, <span class="arithmatex">\({c}[1][4]\leftarrow 410\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(650\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[4]=5{+}1=6\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[5]=410{+}6\cdot 40=650\)</span>, <span class="arithmatex">\({c}[1][5]\leftarrow 650\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(110\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow vc[2]=1\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow sc[2]{+}vc[2]\cdot d[2]=80{+}1\cdot 30=110\)</span>, <span class="arithmatex">\({c}[2][2]\leftarrow 110\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(190\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[2]=1{+}1=2\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[3]=110{+}2\cdot 40=190\)</span>, <span class="arithmatex">\({c}[2][3]\leftarrow 190\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(310\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[3]=2{+}2=4\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[4]=190{+}4\cdot 30=310\)</span>, <span class="arithmatex">\({c}[2][4]\leftarrow 310\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(510\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[4]=4{+}1=5\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[5]=310{+}5\cdot 40=510\)</span>, <span class="arithmatex">\({c}[2][5]\leftarrow 510\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(90\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow vc[3]=1\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow sc[3]{+}vc[3]\cdot d[3]=50{+}1\cdot 40=90\)</span>, <span class="arithmatex">\({c}[3][3]\leftarrow 90\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(180\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[3]=1{+}2=3\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[4]=90{+}3\cdot 30=180\)</span>, <span class="arithmatex">\({c}[3][4]\leftarrow 180\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(340\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[4]=3{+}1=4\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[5]=180{+}4\cdot 40=340\)</span>, <span class="arithmatex">\({c}[3][5]\leftarrow 340\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(110\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow vc[4]=1\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow sc[4]{+}vc[4]\cdot d[4]=80{+}1\cdot 30=110\)</span>, <span class="arithmatex">\({c}[4][4]\leftarrow 110\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(190\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[4]=1{+}1=2\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[5]=110{+}2\cdot 40=190\)</span>, <span class="arithmatex">\({c}[4][5]\leftarrow 190\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu"><span class="arithmatex">\(130\)</span></td>
        <td><span class="arithmatex">\(\mathit{u}\leftarrow vc[5]=2\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow sc[5]{+}vc[5]\cdot d[5]=50{+}2\cdot 40=130\)</span>, <span class="arithmatex">\({c}[5][5]\leftarrow 130\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice ${c}$:

        $$
        \begin{array}{l|rrrrr}
        \hline {{c}[j][t]} & {t=1} & {t=2} & {t=3} & {t=4} & {t=5} \\
        \hline {j=1} & {80} & {140} & {260} & {410} & {650} \\
        {j=2} & {-} & {110} & {190} & {310} & {510} \\
        {j=3} & {-} & {-} & {90} & {180} & {340} \\
        {j=4} & {-} & {-} & {-} & {110} & {190} \\
        {j=5} & {-} & {-} & {-} & {-} & {130} \\
        \hline
        \end{array}
        $$

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $t$ e $j$, le celle ${v}[t]$ e ${r}[t]$, il valore corrente di $\mathit{b}$ e il valore corrente di $\mathit{a}$. La cella di $\mathit{b}$ è evidenziata in <mark>rosso</mark> quando viene aggiornata; la cella di $\mathit{a}$ è evidenziata in <mark>blu</mark> quando viene aggiornata; le celle di ${v}[t]$ e ${r}[t]$ sono evidenziate in <mark>blu</mark> quando vengono assegnate.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(t\)</span></th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\({v}[t]\)</span></th>
        <th><span class="arithmatex">\({r}[t]\)</span></th>
        <th><span class="arithmatex">\(\mathit{b}\)</span></th>
        <th><span class="arithmatex">\(\mathit{a}\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\({v}[0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{b}\leftarrow +\infty\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">80</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\({v}[0]{+}{c}[1][1]=0{+}80=80<+\infty\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 80\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">80</td>
        <td class="cella-blu">1</td>
        <td>80</td>
        <td>1</td>
        <td><span class="arithmatex">\({v}[1]\leftarrow \mathit{b}=80\)</span>, <span class="arithmatex">\({r}[1]\leftarrow \mathit{a}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{b}\leftarrow +\infty\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">140</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\({v}[0]{+}{c}[1][2]=0{+}140=140<+\infty\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 140\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>140</td>
        <td>1</td>
        <td><span class="arithmatex">\({v}[1]{+}{c}[2][2]=80{+}110=190>140\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">140</td>
        <td class="cella-blu">1</td>
        <td>140</td>
        <td>1</td>
        <td><span class="arithmatex">\({v}[2]\leftarrow \mathit{b}=140\)</span>, <span class="arithmatex">\({r}[2]\leftarrow \mathit{a}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{b}\leftarrow +\infty\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">260</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\({v}[0]{+}{c}[1][3]=0{+}260=260<+\infty\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 260\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>260</td>
        <td>1</td>
        <td><span class="arithmatex">\({v}[1]{+}{c}[2][3]=80{+}190=270>260\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">230</td>
        <td class="cella-blu">3</td>
        <td><span class="arithmatex">\({v}[2]{+}{c}[3][3]=140{+}90=230<260\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 230\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">230</td>
        <td class="cella-blu">3</td>
        <td>230</td>
        <td>3</td>
        <td><span class="arithmatex">\({v}[3]\leftarrow \mathit{b}=230\)</span>, <span class="arithmatex">\({r}[3]\leftarrow \mathit{a}=3\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{b}\leftarrow +\infty\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">410</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\({v}[0]{+}{c}[1][4]=0{+}410=410<+\infty\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 410\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">390</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">\({v}[1]{+}{c}[2][4]=80{+}310=390<410\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 390\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">320</td>
        <td class="cella-blu">3</td>
        <td><span class="arithmatex">\({v}[2]{+}{c}[3][4]=140{+}180=320<390\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 320\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>320</td>
        <td>3</td>
        <td><span class="arithmatex">\({v}[3]{+}{c}[4][4]=230{+}110=340>320\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">320</td>
        <td class="cella-blu">3</td>
        <td>320</td>
        <td>3</td>
        <td><span class="arithmatex">\({v}[4]\leftarrow \mathit{b}=320\)</span>, <span class="arithmatex">\({r}[4]\leftarrow \mathit{a}=3\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{b}\leftarrow +\infty\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">650</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\({v}[0]{+}{c}[1][5]=0{+}650=650<+\infty\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 650\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">590</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">\({v}[1]{+}{c}[2][5]=80{+}510=590<650\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 590\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">480</td>
        <td class="cella-blu">3</td>
        <td><span class="arithmatex">\({v}[2]{+}{c}[3][5]=140{+}340=480<590\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 480\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">420</td>
        <td class="cella-blu">4</td>
        <td><span class="arithmatex">\({v}[3]{+}{c}[4][5]=230{+}190=420<480\)</span>: <span class="arithmatex">\(\mathit{b}\leftarrow 420\)</span>, <span class="arithmatex">\(\mathit{a}\leftarrow 4\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>420</td>
        <td>4</td>
        <td><span class="arithmatex">\({v}[4]{+}{c}[5][5]=320{+}130=450>420\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">420</td>
        <td class="cella-blu">4</td>
        <td>420</td>
        <td>4</td>
        <td><span class="arithmatex">\({v}[5]\leftarrow \mathit{b}=420\)</span>, <span class="arithmatex">\({r}[5]\leftarrow \mathit{a}=4\)</span></td>
        </tr>
        </table></div>

        Questo è il vettore ${v}$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{c|cccccc}
        \hline  & {t=0} & {t=1} & {t=2} & {t=3} & {t=4} & {t=5} \\
        \hline {{v}[t]} & 0 & 80 & 140 & 230 & 320 & 420 \\
        \hline
        \end{array}
        $$

        Questo è il vettore ${r}$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{c|ccccc}
        \hline  & {t=1} & {t=2} & {t=3} & {t=4} & {t=5} \\
        \hline {{r}[t]} & 1 & 1 & 3 & 3 & 4 \\
        \hline
        \end{array}
        $$

    2. Abbiamo il seguente vettore ${r}$:

        $$
        \begin{array}{c|ccccc}
        \hline  & {t=1} & {t=2} & {t=3} & {t=4} & {t=5} \\
        \hline {{r}[t]} & 1 & 1 & 3 & 3 & 4 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(t\)</span></th>
        <th><span class="arithmatex">\({r}[t]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th><span class="arithmatex">\(x[5]\)</span></th>
        <th><span class="arithmatex">\(t\leftarrow {r}[t]-1\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(t=5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">70</td>
        <td>0</td>
        <td><span class="arithmatex">\(t=4-1=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">40</td>
        <td>70</td>
        <td>0</td>
        <td><span class="arithmatex">\(t=3-1=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">40</td>
        <td>0</td>
        <td>40</td>
        <td>70</td>
        <td>0</td>
        <td><span class="arithmatex">\(t=1-1=0\)</span></td>
        </tr>
        </table></div>

        - $t=5$, ${r}[5]=4$: l'ultimo lotto di produzione dei periodi $1,\dots,5$ è nel periodo $4$ e copre le domande dei periodi $4,\dots,5$, quindi $x[4]\leftarrow d_{4}+d_{5}=30+40=70$

        - $t=3$, ${r}[3]=3$: il periodo $3$ produce solo la propria domanda, quindi $x[3]\leftarrow d_{3}=40$

        - $t=2$, ${r}[2]=1$: l'ultimo lotto di produzione dei periodi $1,\dots,2$ è nel periodo $1$ e copre le domande dei periodi $1,\dots,2$, quindi $x[1]\leftarrow d_{1}+d_{2}=10+30=40$

        Quindi il vettore

        $$
        (40,\allowbreak 0,\allowbreak 40,\allowbreak 70,\allowbreak 0)
        $$

        è una soluzione ottima. I setup sono nei periodi $1$, $3$, $4$, le scorte sono $(s_1,\dots,s_{5})=(30,\allowbreak 0,\allowbreak 0,\allowbreak 40,\allowbreak 0)$, e il costo totale è

        \begin{align*}
        &\underbrace{70+50+80}_{\text{setup}}+\underbrace{1\cdot 40+1\cdot 0+1\cdot 40+1\cdot 70+2\cdot 0}_{\text{produzione}}\\
        &\quad+\underbrace{1\cdot 30+1\cdot 0+2\cdot 0+1\cdot 40+2\cdot 0}_{\text{mantenimento}}=200+150+70=420.
        \end{align*}

        Il valore ottimo è

        $$
        {v}[5]=420.
        $$
