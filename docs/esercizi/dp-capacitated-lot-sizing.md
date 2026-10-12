---
title: "Esercizi · PD per il problema del lot sizing capacitato"
---

# Esercizi · PD per il problema del lot sizing capacitato

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 26** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 26: Lot sizing capacitato (CLS)](../programmazione-dinamica/dp-capacitated-lot-sizing.md) · [:material-file-pdf-box: Eserciziario, volume 3 (PDF)](../pdf/esercizi-3-programmazione-dinamica.pdf)

</div>

<a id="esercizio-26-1"></a>

!!! esercizio "Esercizio 26.1: Esercizio 1: problema di lot sizing capacitato"

    Consideriamo la seguente istanza del CLS con $m=3$ periodi, in cui le domande, i costi di setup, i costi variabili di produzione, i costi di mantenimento a scorta e le capacità sono:

    $$
    \begin{array}{l|rrr}
    \hline {t} & {1} & {2} & {3} \\
    \hline {d_t} & {1} & {2} & {3} \\
    {sc_t} & {10} & {5} & {8} \\
    {vc_t} & {1} & {1} & {2} \\
    {hc_t} & {1} & {1} & {2} \\
    {cap_t} & {2} & {4} & {4} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni iterazione, i valori delle matrici ${v}$ e ${r}$.

    2. Usando la matrice ${r}$, ricostruire una soluzione ottima $(x_1,x_2,\dots,x_m)$, e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $t$ e $k$, le celle ${v}[t][k]$ e ${r}[t][k]$ e l'operazione eseguita. Le celle si calcolano per valori crescenti di $t$ e, per ogni valore fissato di $t$, per valori crescenti di $k\in\{0,1,\dots,D_{t+1,m}\}$. Ricordiamo che $f_t(0)=0$ e $f_t(x)=sc_t+vc_t\,x$ per $x\ge 1$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(t\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\({v}[t][k]\)</span></th>
        <th><span class="arithmatex">\({r}[t][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][0]\leftarrow 0\)</span>, <span class="arithmatex">\({r}[0][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][1]\leftarrow +\infty\)</span>, <span class="arithmatex">\({r}[0][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][2]\leftarrow +\infty\)</span>, <span class="arithmatex">\({r}[0][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][3]\leftarrow +\infty\)</span>, <span class="arithmatex">\({r}[0][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][4]\leftarrow +\infty\)</span>, <span class="arithmatex">\({r}[0][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][5]\leftarrow +\infty\)</span>, <span class="arithmatex">\({r}[0][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][6]\leftarrow +\infty\)</span>, <span class="arithmatex">\({r}[0][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\min\{{v}[0][1]{+}f_{1}(0),\allowbreak {v}[0][0]{+}f_{1}(1)\}{+}hc_{1}\cdot 0\)</span> <span class="arithmatex">\(=\min\{+\infty,\allowbreak 0{+}11\}{+}1\cdot 0=11\)</span>; primo minimo in <span class="arithmatex">\(x=1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\min\{{v}[0][2]{+}f_{1}(0),\allowbreak {v}[0][1]{+}f_{1}(1),\allowbreak {v}[0][0]{+}f_{1}(2)\}{+}hc_{1}\cdot 1\)</span> <span class="arithmatex">\(=\min\{+\infty,\allowbreak +\infty,\allowbreak 0{+}12\}{+}1\cdot 1=13\)</span>; primo minimo in <span class="arithmatex">\(x=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>i candidati usano le celle <span class="arithmatex">\({v}[0][1],\dots,{v}[0][3]\)</span>, che valgono tutte <span class="arithmatex">\(+\infty\)</span>: <span class="arithmatex">\({v}[1][2]\leftarrow +\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>i candidati usano le celle <span class="arithmatex">\({v}[0][2],\dots,{v}[0][4]\)</span>, che valgono tutte <span class="arithmatex">\(+\infty\)</span>: <span class="arithmatex">\({v}[1][3]\leftarrow +\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>i candidati usano le celle <span class="arithmatex">\({v}[0][3],\dots,{v}[0][5]\)</span>, che valgono tutte <span class="arithmatex">\(+\infty\)</span>: <span class="arithmatex">\({v}[1][4]\leftarrow +\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>i candidati usano le celle <span class="arithmatex">\({v}[0][4],\dots,{v}[0][6]\)</span>, che valgono tutte <span class="arithmatex">\(+\infty\)</span>: <span class="arithmatex">\({v}[1][5]\leftarrow +\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\min\{{v}[1][2]{+}f_{2}(0),\allowbreak {v}[1][1]{+}f_{2}(1),\allowbreak {v}[1][0]{+}f_{2}(2)\}{+}hc_{2}\cdot 0\)</span> <span class="arithmatex">\(=\min\{+\infty,\allowbreak 13{+}6,\allowbreak 11{+}7\}{+}1\cdot 0=18\)</span>; primo minimo in <span class="arithmatex">\(x=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\min\{{v}[1][3]{+}f_{2}(0),\allowbreak {v}[1][2]{+}f_{2}(1),\allowbreak {v}[1][1]{+}f_{2}(2),\allowbreak {v}[1][0]{+}f_{2}(3)\}{+}hc_{2}\cdot 1\)</span> <span class="arithmatex">\(=\min\{+\infty,\allowbreak +\infty,\allowbreak 13{+}7,\allowbreak 11{+}8\}{+}1\cdot 1=20\)</span>; primo minimo in <span class="arithmatex">\(x=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\min\{{v}[1][4]{+}f_{2}(0),\allowbreak {v}[1][3]{+}f_{2}(1),\allowbreak {v}[1][2]{+}f_{2}(2),\allowbreak {v}[1][1]{+}f_{2}(3),\allowbreak {v}[1][0]{+}f_{2}(4)\}{+}hc_{2}\cdot 2\)</span> <span class="arithmatex">\(=\min\{+\infty,\allowbreak +\infty,\allowbreak +\infty,\allowbreak 13{+}8,\allowbreak 11{+}9\}{+}1\cdot 2=22\)</span>; primo minimo in <span class="arithmatex">\(x=4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\min\{{v}[1][5]{+}f_{2}(0),\allowbreak {v}[1][4]{+}f_{2}(1),\allowbreak {v}[1][3]{+}f_{2}(2),\allowbreak {v}[1][2]{+}f_{2}(3),\allowbreak {v}[1][1]{+}f_{2}(4)\}{+}hc_{2}\cdot 3\)</span> <span class="arithmatex">\(=\min\{+\infty,\allowbreak +\infty,\allowbreak +\infty,\allowbreak +\infty,\allowbreak 13{+}9\}{+}1\cdot 3=25\)</span>; primo minimo in <span class="arithmatex">\(x=4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\min\{{v}[2][3]{+}f_{3}(0),\allowbreak {v}[2][2]{+}f_{3}(1),\allowbreak {v}[2][1]{+}f_{3}(2),\allowbreak {v}[2][0]{+}f_{3}(3)\}{+}hc_{3}\cdot 0\)</span> <span class="arithmatex">\(=\min\{25{+}0,\allowbreak 22{+}10,\allowbreak 20{+}12,\allowbreak 18{+}14\}{+}2\cdot 0=25\)</span>; primo minimo in <span class="arithmatex">\(x=0\)</span></td>
        </tr>
        </table></div>

        Queste sono le matrici ${v}$ e ${r}$ ottenute durante l'esecuzione dell'algoritmo di PD (un punto indica una coppia $(t,k)$ con $k>D_{t+1,m}$, che non è uno stato):

        $$
        \begin{array}{l|rrrrrrr}
        \hline {{v}[t][k]} & {0} & {1} & {2} & {3} & {4} & {5} & {6} \\
        \hline {t=0} & {0} & {+\infty} & {+\infty} & {+\infty} & {+\infty} & {+\infty} & {+\infty} \\
        {t=1} & {11} & {13} & {+\infty} & {+\infty} & {+\infty} & {+\infty} & {\cdot} \\
        {t=2} & {18} & {20} & {22} & {25} & {\cdot} & {\cdot} & {\cdot} \\
        {t=3} & {25} & {\cdot} & {\cdot} & {\cdot} & {\cdot} & {\cdot} & {\cdot} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrrrrr}
        \hline {{r}[t][k]} & {0} & {1} & {2} & {3} & {4} & {5} & {6} \\
        \hline {t=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {t=1} & {1} & {2} & {0} & {0} & {0} & {0} & {\cdot} \\
        {t=2} & {2} & {3} & {4} & {4} & {\cdot} & {\cdot} & {\cdot} \\
        {t=3} & {0} & {\cdot} & {\cdot} & {\cdot} & {\cdot} & {\cdot} & {\cdot} \\
        \hline
        \end{array}
        $$

        Il valore ottimo dell'istanza del CLS è ${v}[3][0]=25$.

    2. Usando la matrice ${r}$, possiamo ricostruire una soluzione ottima come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(t\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\({r}[t][k]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(k\leftarrow k+d[t]-x[t]\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(t=3\)</span>, <span class="arithmatex">\(k=0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">\(k=0+3-0=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>0</td>
        <td class="cella-blu">4</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=3+2-4=1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td class="cella-blu">2</td>
        <td>4</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=1+1-2=0\)</span></td>
        </tr>
        </table></div>

        Quindi, il vettore

        $$
        (2,\allowbreak 4,\allowbreak 0)
        $$

        è una soluzione ottima. I setup sono nei periodi $1$, $2$, le scorte sono $(s_1,\dots,s_{3})=(1,\allowbreak 3,\allowbreak 0)$, e il costo totale è

        \begin{align*}
        &\underbrace{10+5}_{\text{setup}}+\underbrace{1\cdot 2+1\cdot 4+2\cdot 0}_{\text{produzione}}\\
        &\quad+\underbrace{1\cdot 1+1\cdot 3+2\cdot 0}_{\text{mantenimento}}=15+6+4=25.
        \end{align*}

        Il valore ottimo è

        $$
        {v}[3][0]=25.
        $$

<a id="esercizio-26-2"></a>

!!! esercizio "Esercizio 26.2: Esercizio 2: problema di lot sizing capacitato"

    Consideriamo la seguente istanza del CLS con $m=4$ periodi, in cui le domande, i costi di setup, i costi variabili di produzione, i costi di mantenimento a scorta e le capacità sono:

    $$
    \begin{array}{l|rrrr}
    \hline {t} & {1} & {2} & {3} & {4} \\
    \hline {d_t} & {3} & {1} & {1} & {2} \\
    {sc_t} & {5} & {6} & {10} & {10} \\
    {vc_t} & {2} & {1} & {1} & {1} \\
    {hc_t} & {1} & {1} & {2} & {2} \\
    {cap_t} & {4} & {3} & {3} & {2} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Mostrare l'esecuzione dell'algoritmo di PD bottom-up riportando, per ogni iterazione, i valori delle matrici ${v}$ e ${r}$.

    2. Usando la matrice ${r}$, ricostruire una soluzione ottima $(x_1,x_2,\dots,x_m)$, e riportare il valore ottimo.

??? soluzione "Soluzione"

    1. Esecuzione passo per passo dell'algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $t$ e $k$, le celle ${v}[t][k]$ e ${r}[t][k]$ e l'operazione eseguita. Le celle si calcolano per valori crescenti di $t$ e, per ogni valore fissato di $t$, per valori crescenti di $k\in\{0,1,\dots,D_{t+1,m}\}$. Ricordiamo che $f_t(0)=0$ e $f_t(x)=sc_t+vc_t\,x$ per $x\ge 1$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(t\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\({v}[t][k]\)</span></th>
        <th><span class="arithmatex">\({r}[t][k]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][0]\leftarrow 0\)</span>, <span class="arithmatex">\({r}[0][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][1]\leftarrow +\infty\)</span>, <span class="arithmatex">\({r}[0][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][2]\leftarrow +\infty\)</span>, <span class="arithmatex">\({r}[0][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][3]\leftarrow +\infty\)</span>, <span class="arithmatex">\({r}[0][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][4]\leftarrow +\infty\)</span>, <span class="arithmatex">\({r}[0][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][5]\leftarrow +\infty\)</span>, <span class="arithmatex">\({r}[0][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][6]\leftarrow +\infty\)</span>, <span class="arithmatex">\({r}[0][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][7]\leftarrow +\infty\)</span>, <span class="arithmatex">\({r}[0][7]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\min\{{v}[0][3]{+}f_{1}(0),\allowbreak {v}[0][2]{+}f_{1}(1),\allowbreak {v}[0][1]{+}f_{1}(2),\allowbreak {v}[0][0]{+}f_{1}(3)\}{+}hc_{1}\cdot 0\)</span> <span class="arithmatex">\(=\min\{+\infty,\allowbreak +\infty,\allowbreak +\infty,\allowbreak 0{+}11\}{+}1\cdot 0=11\)</span>; primo minimo in <span class="arithmatex">\(x=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\min\{{v}[0][4]{+}f_{1}(0),\allowbreak {v}[0][3]{+}f_{1}(1),\allowbreak {v}[0][2]{+}f_{1}(2),\allowbreak {v}[0][1]{+}f_{1}(3),\allowbreak {v}[0][0]{+}f_{1}(4)\}{+}hc_{1}\cdot 1\)</span> <span class="arithmatex">\(=\min\{+\infty,\allowbreak +\infty,\allowbreak +\infty,\allowbreak +\infty,\allowbreak 0{+}13\}{+}1\cdot 1=14\)</span>; primo minimo in <span class="arithmatex">\(x=4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>i candidati usano le celle <span class="arithmatex">\({v}[0][1],\dots,{v}[0][5]\)</span>, che valgono tutte <span class="arithmatex">\(+\infty\)</span>: <span class="arithmatex">\({v}[1][2]\leftarrow +\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>i candidati usano le celle <span class="arithmatex">\({v}[0][2],\dots,{v}[0][6]\)</span>, che valgono tutte <span class="arithmatex">\(+\infty\)</span>: <span class="arithmatex">\({v}[1][3]\leftarrow +\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(+\infty\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>i candidati usano le celle <span class="arithmatex">\({v}[0][3],\dots,{v}[0][7]\)</span>, che valgono tutte <span class="arithmatex">\(+\infty\)</span>: <span class="arithmatex">\({v}[1][4]\leftarrow +\infty\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\min\{{v}[1][1]{+}f_{2}(0),\allowbreak {v}[1][0]{+}f_{2}(1)\}{+}hc_{2}\cdot 0\)</span> <span class="arithmatex">\(=\min\{14{+}0,\allowbreak 11{+}7\}{+}1\cdot 0=14\)</span>; primo minimo in <span class="arithmatex">\(x=0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\min\{{v}[1][2]{+}f_{2}(0),\allowbreak {v}[1][1]{+}f_{2}(1),\allowbreak {v}[1][0]{+}f_{2}(2)\}{+}hc_{2}\cdot 1\)</span> <span class="arithmatex">\(=\min\{+\infty,\allowbreak 14{+}7,\allowbreak 11{+}8\}{+}1\cdot 1=20\)</span>; primo minimo in <span class="arithmatex">\(x=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\min\{{v}[1][3]{+}f_{2}(0),\allowbreak {v}[1][2]{+}f_{2}(1),\allowbreak {v}[1][1]{+}f_{2}(2),\allowbreak {v}[1][0]{+}f_{2}(3)\}{+}hc_{2}\cdot 2\)</span> <span class="arithmatex">\(=\min\{+\infty,\allowbreak +\infty,\allowbreak 14{+}8,\allowbreak 11{+}9\}{+}1\cdot 2=22\)</span>; primo minimo in <span class="arithmatex">\(x=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(26\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\min\{{v}[1][4]{+}f_{2}(0),\allowbreak {v}[1][3]{+}f_{2}(1),\allowbreak {v}[1][2]{+}f_{2}(2),\allowbreak {v}[1][1]{+}f_{2}(3)\}{+}hc_{2}\cdot 3\)</span> <span class="arithmatex">\(=\min\{+\infty,\allowbreak +\infty,\allowbreak +\infty,\allowbreak 14{+}9\}{+}1\cdot 3=26\)</span>; primo minimo in <span class="arithmatex">\(x=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\min\{{v}[2][1]{+}f_{3}(0),\allowbreak {v}[2][0]{+}f_{3}(1)\}{+}hc_{3}\cdot 0\)</span> <span class="arithmatex">\(=\min\{20{+}0,\allowbreak 14{+}11\}{+}2\cdot 0=20\)</span>; primo minimo in <span class="arithmatex">\(x=0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\min\{{v}[2][2]{+}f_{3}(0),\allowbreak {v}[2][1]{+}f_{3}(1),\allowbreak {v}[2][0]{+}f_{3}(2)\}{+}hc_{3}\cdot 1\)</span> <span class="arithmatex">\(=\min\{22{+}0,\allowbreak 20{+}11,\allowbreak 14{+}12\}{+}2\cdot 1=24\)</span>; primo minimo in <span class="arithmatex">\(x=0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(30\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\min\{{v}[2][3]{+}f_{3}(0),\allowbreak {v}[2][2]{+}f_{3}(1),\allowbreak {v}[2][1]{+}f_{3}(2),\allowbreak {v}[2][0]{+}f_{3}(3)\}{+}hc_{3}\cdot 2\)</span> <span class="arithmatex">\(=\min\{26{+}0,\allowbreak 22{+}11,\allowbreak 20{+}12,\allowbreak 14{+}13\}{+}2\cdot 2=30\)</span>; primo minimo in <span class="arithmatex">\(x=0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(30\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\min\{{v}[3][2]{+}f_{4}(0),\allowbreak {v}[3][1]{+}f_{4}(1),\allowbreak {v}[3][0]{+}f_{4}(2)\}{+}hc_{4}\cdot 0\)</span> <span class="arithmatex">\(=\min\{30{+}0,\allowbreak 24{+}11,\allowbreak 20{+}12\}{+}2\cdot 0=30\)</span>; primo minimo in <span class="arithmatex">\(x=0\)</span></td>
        </tr>
        </table></div>

        Queste sono le matrici ${v}$ e ${r}$ ottenute durante l'esecuzione dell'algoritmo di PD (un punto indica una coppia $(t,k)$ con $k>D_{t+1,m}$, che non è uno stato):

        $$
        \begin{array}{l|rrrrrrrr}
        \hline {{v}[t][k]} & {0} & {1} & {2} & {3} & {4} & {5} & {6} & {7} \\
        \hline {t=0} & {0} & {+\infty} & {+\infty} & {+\infty} & {+\infty} & {+\infty} & {+\infty} & {+\infty} \\
        {t=1} & {11} & {14} & {+\infty} & {+\infty} & {+\infty} & {\cdot} & {\cdot} & {\cdot} \\
        {t=2} & {14} & {20} & {22} & {26} & {\cdot} & {\cdot} & {\cdot} & {\cdot} \\
        {t=3} & {20} & {24} & {30} & {\cdot} & {\cdot} & {\cdot} & {\cdot} & {\cdot} \\
        {t=4} & {30} & {\cdot} & {\cdot} & {\cdot} & {\cdot} & {\cdot} & {\cdot} & {\cdot} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrrrrrr}
        \hline {{r}[t][k]} & {0} & {1} & {2} & {3} & {4} & {5} & {6} & {7} \\
        \hline {t=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {t=1} & {3} & {4} & {0} & {0} & {0} & {\cdot} & {\cdot} & {\cdot} \\
        {t=2} & {0} & {2} & {3} & {3} & {\cdot} & {\cdot} & {\cdot} & {\cdot} \\
        {t=3} & {0} & {0} & {0} & {\cdot} & {\cdot} & {\cdot} & {\cdot} & {\cdot} \\
        {t=4} & {0} & {\cdot} & {\cdot} & {\cdot} & {\cdot} & {\cdot} & {\cdot} & {\cdot} \\
        \hline
        \end{array}
        $$

        Il valore ottimo dell'istanza del CLS è ${v}[4][0]=30$.

    2. Usando la matrice ${r}$, possiamo ricostruire una soluzione ottima come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(t\)</span></th>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\({r}[t][k]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th><span class="arithmatex">\(k\leftarrow k+d[t]-x[t]\)</span></th>
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
        <td><span class="arithmatex">\(t=4\)</span>, <span class="arithmatex">\(k=0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td><span class="arithmatex">\(k=0+2-0=2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=2+1-0=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>0</td>
        <td class="cella-blu">3</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=3+1-3=1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td class="cella-blu">4</td>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(k=1+3-4=0\)</span></td>
        </tr>
        </table></div>

        Quindi, il vettore

        $$
        (4,\allowbreak 3,\allowbreak 0,\allowbreak 0)
        $$

        è una soluzione ottima. I setup sono nei periodi $1$, $2$, le scorte sono $(s_1,\dots,s_{4})=(1,\allowbreak 3,\allowbreak 2,\allowbreak 0)$, e il costo totale è

        \begin{align*}
        &\underbrace{5+6}_{\text{setup}}+\underbrace{2\cdot 4+1\cdot 3+1\cdot 0+1\cdot 0}_{\text{produzione}}\\
        &\quad+\underbrace{1\cdot 1+1\cdot 3+2\cdot 2+2\cdot 0}_{\text{mantenimento}}=11+11+8=30.
        \end{align*}

        Il valore ottimo è

        $$
        {v}[4][0]=30.
        $$
