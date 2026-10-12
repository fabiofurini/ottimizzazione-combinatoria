---
title: "Un algoritmo di PD per l'ULS"
---

# 25.2 Un algoritmo di PD per l'ULS

<div class="info-capitolo" markdown>

**Parte 3 · Programmazione dinamica · Capitolo 25** · [:material-book-open-variant: Capitolo 25: Lot sizing senza capacità (ULS)](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-programmazione-dinamica.pdf) · [:material-pencil: Esercizi: Lot sizing senza capacità (ULS)](../../esercizi/dp-lot-sizing.md) · [:material-gesture-tap: App: Wagner-Whitin per il lot sizing senza capacità](../../laboratorio/wagner-whitin-lot-sizing.md)

</div>

## 25.2.1 Il costo di un lotto di produzione

- Per la proprietà zero-inventory ordering, una soluzione ottima è una sequenza di <strong>lotti di produzione</strong>: un lotto produce in un periodo $j$ le domande dei periodi $j,\dots,t$, e il lotto successivo inizia nel periodo $t+1$ con la scorta vuota.

- Per ogni $j,t \in T$ con $j\le t$, sia $c_{j,t}$ il costo del lotto di produzione che produce nel periodo $j$ le domande dei periodi $j,\dots,t$:

!!! chiave ""

    \begin{equation*}
    \label{eq:cjt}
    c_{j,t}= sc_j + vc_j\, D_{j,t} + \sum_{k=j}^{t-1} hc_k\, D_{k+1,t}. \tag{25.2}
    \end{equation*}

- Il primo termine è il costo di setup del periodo $j$, il secondo è il costo variabile delle $D_{j,t}$ unità prodotte, e l'ultimo è il costo di mantenimento a scorta: alla fine di ogni periodo $k\in\{j,\dots,t-1\}$ la scorta contiene le domande $D_{k+1,t}$ dei periodi successivi del lotto.

- Per un periodo $j$ fissato, i costi $c_{j,j},c_{j,j+1},\dots,c_{j,m}$ si possono calcolare uno dopo l'altro. Un'unità usata nel periodo $t$ e prodotta nel periodo $j$ costa

    $$
    u_{j,t}=vc_j+\sum_{k=j}^{t-1} hc_k,
    $$

    quindi $u_{j,j}=vc_j$, $u_{j,t}=u_{j,t-1}+hc_{t-1}$, e aggiungere il periodo $t$ al lotto aggiunge $d_t$ unità di costo $u_{j,t}$:

    $$
    c_{j,j}=sc_j+vc_j\, d_j, \qquad c_{j,t}=c_{j,t-1}+u_{j,t}\, d_t \quad \text{se } t>j.
    $$

Questo è lo pseudocodice che calcola la matrice dei costi dei lotti di produzione:

!!! algoritmo "Algoritmo: CostMatrix"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> Un'istanza dell'ULS data dal numero <span class="arithmatex">\(m\)</span> di periodi e dai vettori <span class="arithmatex">\(d[1..m]\)</span>, <span class="arithmatex">\(sc[1..m]\)</span>, <span class="arithmatex">\(vc[1..m]\)</span>, <span class="arithmatex">\(hc[1..m]\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> La matrice dei costi dei lotti di produzione</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> CostMatrix(<span class="arithmatex">\(m,d,sc,vc,hc\)</span>)</div><div class="pc" style="--liv:1" id="box-5-cm-a"><span class="pc-n">2</span><span class="arithmatex">\({c} := \textnormal{new array}[1..m][1..m]\)</span></div><div class="pc" style="--liv:1" id="box-6-cm-b"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(j := 1\)</span> <strong>to</strong> <span class="arithmatex">\(m\)</span>  <strong>do</strong></div><div class="pc" style="--liv:2" id="box-7-cm-c"><span class="pc-n">4</span><span class="arithmatex">\(\mathit{u} := vc[j]\)</span></div><div class="pc" style="--liv:2" id="box-8-cm-d"><span class="pc-n">5</span><span class="arithmatex">\(\mathit{g} := sc[j] + vc[j]\cdot d[j]\)</span></div><div class="pc" style="--liv:2" id="box-9-cm-e"><span class="pc-n">6</span><span class="arithmatex">\({c}[j][j] \leftarrow \mathit{g}\)</span></div><div class="pc" style="--liv:2" id="box-10-cm-f"><span class="pc-n">7</span><strong>for</strong> <span class="arithmatex">\(t := j+1\)</span> <strong>to</strong> <span class="arithmatex">\(m\)</span>  <strong>do</strong></div><div class="pc" style="--liv:3" id="box-11-cm-g"><span class="pc-n">8</span><span class="arithmatex">\(\mathit{u} \leftarrow \mathit{u} + hc[t-1]\)</span></div><div class="pc" style="--liv:3" id="box-12-cm-h"><span class="pc-n">9</span><span class="arithmatex">\(\mathit{g} \leftarrow \mathit{g} + \mathit{u}\cdot d[t]\)</span></div><div class="pc" style="--liv:3" id="box-13-cm-i"><span class="pc-n">10</span><span class="arithmatex">\({c}[j][t] \leftarrow \mathit{g}\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">11</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">12</span><strong>end</strong></div><div class="pc" style="--liv:1" id="box-14-cm-j"><span class="pc-n">13</span><strong>return</strong> <span class="arithmatex">\({c}\)</span></div></div>

- La variabile $\mathit{u}$ è il costo unitario $u_{j,t}$ e la variabile $\mathit{g}$ è il costo $c_{j,t}$ del lotto corrente; si usano solo le celle ${c}[j][t]$ con $j\le t$.

<a id="box-15-texulscost"></a>

!!! esempio "Esempio 25.4: Calcolo dei costi dei lotti di produzione"

    Consideriamo l'istanza dell'ULS dell'<span style="color:#1971c2">[Esempio 25.1](index.md#box-1-texuls1)</span>:

    $$
    \begin{array}{l|rrrrr}
    \hline {t} & {1} & {2} & {3} & {4} & {5} \\
    \hline {d_t} & {20} & {10} & {30} & {40} & {10} \\
    {sc_t} & {50} & {50} & {50} & {50} & {50} \\
    {vc_t} & {0} & {0} & {0} & {0} & {0} \\
    {hc_t} & {1} & {1} & {1} & {1} & {1} \\
    \hline
    \end{array}
    $$

    Per ogni passo, la tabella riporta i valori di $j$ e $t$, il valore corrente di $\mathit{u}$, la cella ${c}[j][t]$ e l'operazione eseguita; la cella ${c}[j][t]$ è evidenziata in <mark>blu</mark> quando viene assegnata.

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
    <td><span class="arithmatex">\(0\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(50\)</span></td>
    <td><span class="arithmatex">\(\mathit{u}\leftarrow vc[1]=0\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow sc[1]{+}vc[1]\cdot d[1]=50{+}0\cdot 20=50\)</span>, <span class="arithmatex">\({c}[1][1]\leftarrow 50\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(60\)</span></td>
    <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[1]=0{+}1=1\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[2]=50{+}1\cdot 10=60\)</span>, <span class="arithmatex">\({c}[1][2]\leftarrow 60\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(120\)</span></td>
    <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[2]=1{+}1=2\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[3]=60{+}2\cdot 30=120\)</span>, <span class="arithmatex">\({c}[1][3]\leftarrow 120\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(240\)</span></td>
    <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[3]=2{+}1=3\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[4]=120{+}3\cdot 40=240\)</span>, <span class="arithmatex">\({c}[1][4]\leftarrow 240\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(280\)</span></td>
    <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[4]=3{+}1=4\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[5]=240{+}4\cdot 10=280\)</span>, <span class="arithmatex">\({c}[1][5]\leftarrow 280\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(50\)</span></td>
    <td><span class="arithmatex">\(\mathit{u}\leftarrow vc[2]=0\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow sc[2]{+}vc[2]\cdot d[2]=50{+}0\cdot 10=50\)</span>, <span class="arithmatex">\({c}[2][2]\leftarrow 50\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(80\)</span></td>
    <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[2]=0{+}1=1\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[3]=50{+}1\cdot 30=80\)</span>, <span class="arithmatex">\({c}[2][3]\leftarrow 80\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(160\)</span></td>
    <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[3]=1{+}1=2\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[4]=80{+}2\cdot 40=160\)</span>, <span class="arithmatex">\({c}[2][4]\leftarrow 160\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(190\)</span></td>
    <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[4]=2{+}1=3\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[5]=160{+}3\cdot 10=190\)</span>, <span class="arithmatex">\({c}[2][5]\leftarrow 190\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(50\)</span></td>
    <td><span class="arithmatex">\(\mathit{u}\leftarrow vc[3]=0\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow sc[3]{+}vc[3]\cdot d[3]=50{+}0\cdot 30=50\)</span>, <span class="arithmatex">\({c}[3][3]\leftarrow 50\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(90\)</span></td>
    <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[3]=0{+}1=1\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[4]=50{+}1\cdot 40=90\)</span>, <span class="arithmatex">\({c}[3][4]\leftarrow 90\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(110\)</span></td>
    <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[4]=1{+}1=2\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[5]=90{+}2\cdot 10=110\)</span>, <span class="arithmatex">\({c}[3][5]\leftarrow 110\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(50\)</span></td>
    <td><span class="arithmatex">\(\mathit{u}\leftarrow vc[4]=0\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow sc[4]{+}vc[4]\cdot d[4]=50{+}0\cdot 40=50\)</span>, <span class="arithmatex">\({c}[4][4]\leftarrow 50\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(60\)</span></td>
    <td><span class="arithmatex">\(\mathit{u}\leftarrow \mathit{u}{+}hc[4]=0{+}1=1\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow \mathit{g}{+}\mathit{u}\cdot d[5]=50{+}1\cdot 10=60\)</span>, <span class="arithmatex">\({c}[4][5]\leftarrow 60\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td class="cella-blu"><span class="arithmatex">\(50\)</span></td>
    <td><span class="arithmatex">\(\mathit{u}\leftarrow vc[5]=0\)</span>, <span class="arithmatex">\(\mathit{g}\leftarrow sc[5]{+}vc[5]\cdot d[5]=50{+}0\cdot 10=50\)</span>, <span class="arithmatex">\({c}[5][5]\leftarrow 50\)</span></td>
    </tr>
    </table></div>

    Questa è la matrice ${c}$ dopo l'esecuzione dell'algoritmo (per esempio, $c_{1,3}=sc_1+vc_1\,D_{1,3}+hc_1\,D_{2,3}+hc_2\,D_{3,3}=50+0\cdot 60+1\cdot 40+1\cdot 30=120$ per la formula $\eqref{eq:cjt}$):

    $$
    \begin{array}{l|rrrrr}
    \hline {{c}[j][t]} & {t=1} & {t=2} & {t=3} & {t=4} & {t=5} \\
    \hline {j=1} & {50} & {60} & {120} & {240} & {280} \\
    {j=2} & {-} & {50} & {80} & {160} & {190} \\
    {j=3} & {-} & {-} & {50} & {90} & {110} \\
    {j=4} & {-} & {-} & {-} & {50} & {60} \\
    {j=5} & {-} & {-} & {-} & {-} & {50} \\
    \hline
    \end{array}
    $$

---

**Avanti:** [25.2.2 Un algoritmo di PD per l'ULS: Passo 1 e Passo 2](un-algoritmo-di-pd-per-l-uls-passo-1-e-passo-2.md)
