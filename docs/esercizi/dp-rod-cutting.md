---
title: "Esercizi · PD per il problema del taglio delle aste"
---

# Esercizi · PD per il problema del taglio delle aste

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 28** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 28: Taglio delle aste (RCP)](../programmazione-dinamica/dp-rod-cutting/index.md) · [:material-file-pdf-box: Eserciziario, volume 3 (PDF)](../pdf/esercizi-3-programmazione-dinamica.pdf)

</div>

<a id="esercizio-28-1"></a>

!!! esercizio "Esercizio 28.1: Esercizio 1: problema del taglio delle barre"

    Consideriamo la seguente istanza dell'RCP, in cui la barra ha lunghezza $n=6$ e i profitti associati alle possibili lunghezze dei pezzi sono:

    $$
    \begin{array}{l|rrrrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} \\
    \hline {p_j} & {2} & {5} & {7} & {8} & {10} & {13} \\
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

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $\ell$ e $j$, le celle $v[\ell]$ e $s[\ell]$, il valore corrente di $\mathit{m}$ e il valore corrente di $\mathit{t}$. La cella di $\mathit{m}$ è evidenziata in <mark>rosso</mark> quando viene aggiornata; la cella di $\mathit{t}$ è evidenziata in <mark>blu</mark> quando viene aggiornata; le celle di $v[\ell]$ e $s[\ell]$ sono evidenziate in <mark>blu</mark> quando vengono assegnate.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(\ell\)</span></th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(v[\ell]\)</span></th>
        <th><span class="arithmatex">\(s[\ell]\)</span></th>
        <th><span class="arithmatex">\(\mathit{m}\)</span></th>
        <th><span class="arithmatex">\(\mathit{t}\)</span></th>
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
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">2</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[0]=2+0=2>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 2\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">1</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[1]\leftarrow \mathit{m}=2\)</span>, <span class="arithmatex">\(s[1]\leftarrow \mathit{t}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">4</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[1]=2+2=4>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 4\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">5</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">\(p[2]+v[0]=5+0=5>4\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 5\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">2</td>
        <td>5</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[2]\leftarrow \mathit{m}=5\)</span>, <span class="arithmatex">\(s[2]\leftarrow \mathit{t}=2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">7</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[2]=2+5=7>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 7\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>7</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[1]=5+2=7=\mathit{m}\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>7</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[0]=7+0=7=\mathit{m}\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">7</td>
        <td class="cella-blu">1</td>
        <td>7</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[3]\leftarrow \mathit{m}=7\)</span>, <span class="arithmatex">\(s[3]\leftarrow \mathit{t}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">9</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[3]=2+7=9>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 9\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">10</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">\(p[2]+v[2]=5+5=10>9\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 10\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[3]+v[1]=7+2=9<10\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[4]+v[0]=8+0=8<10\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">2</td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[4]\leftarrow \mathit{m}=10\)</span>, <span class="arithmatex">\(s[4]\leftarrow \mathit{t}=2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">12</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[4]=2+10=12>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 12\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[3]=5+7=12=\mathit{m}\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[2]=7+5=12=\mathit{m}\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[4]+v[1]=8+2=10<12\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[5]+v[0]=10+0=10<12\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">12</td>
        <td class="cella-blu">1</td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[5]\leftarrow \mathit{m}=12\)</span>, <span class="arithmatex">\(s[5]\leftarrow \mathit{t}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">14</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[5]=2+12=14>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 14\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">15</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">\(p[2]+v[4]=5+10=15>14\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 15\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[3]+v[3]=7+7=14<15\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[4]+v[2]=8+5=13<15\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[5]+v[1]=10+2=12<15\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[6]+v[0]=13+0=13<15\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">15</td>
        <td class="cella-blu">2</td>
        <td>15</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[6]\leftarrow \mathit{m}=15\)</span>, <span class="arithmatex">\(s[6]\leftarrow \mathit{t}=2\)</span></td>
        </tr>
        </table></div>

        Questo è il vettore $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{cccccccc}
        \hline  & {\ell=0} & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} & {\ell=6} \\
        \hline {v[\ell]} & 0 & 2 & 5 & 7 & 10 & 12 & 15 \\
        \hline
        \end{array}
        $$

        Questo è il vettore $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{ccccccc}
        \hline  & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} & {\ell=6} \\
        \hline {s[\ell]} & 1 & 2 & 1 & 2 & 1 & 2 \\
        \hline
        \end{array}
        $$

    2. Abbiamo il seguente vettore $s$:

        $$
        \begin{array}{l|rrrrrr}
        \hline  & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} & {\ell=6} \\
        \hline {s[\ell]} & 1 & 2 & 1 & 2 & 1 & 2 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima per una barra di lunghezza $n=6$ come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(s[j]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th><span class="arithmatex">\(x[5]\)</span></th>
        <th><span class="arithmatex">\(x[6]\)</span></th>
        <th>Aggiornamento di <span class="arithmatex">\(j\)</span></th>
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
        <td>0</td>
        <td><span class="arithmatex">\(j=6\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>6</td>
        <td>2</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=6-2=4\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>2</td>
        <td>0</td>
        <td class="cella-blu">2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=4-2=2\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td>2</td>
        <td>0</td>
        <td class="cella-blu">3</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=2-2=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (0,3,0,0,0,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[6]=15.
        $$

    3. Esecuzione passo per passo del secondo algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $j$ e $\ell$, le celle ${v}[j][\ell]$ e ${s}[j][\ell]$ e l'operazione eseguita. Le celle si calcolano per valori crescenti di $j$ e, per ogni valore fissato di $j$, per valori crescenti di $\ell$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(\ell\)</span></th>
        <th><span class="arithmatex">\({v}[j][\ell]\)</span></th>
        <th><span class="arithmatex">\({s}[j][\ell]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][0]\leftarrow 0\)</span>, <span class="arithmatex">\({s}[0][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][1]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][2]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][3]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][4]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][5]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][6]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[1][0]\leftarrow {v}[0][0]=0\)</span>, <span class="arithmatex">\({s}[1][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][0]=2+0>{v}[0][1]=-\infty\)</span>: <span class="arithmatex">\({v}[1][1]\leftarrow 2\)</span>, <span class="arithmatex">\({s}[1][1]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][1]=2+2>{v}[0][2]=-\infty\)</span>: <span class="arithmatex">\({v}[1][2]\leftarrow 4\)</span>, <span class="arithmatex">\({s}[1][2]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][2]=2+4>{v}[0][3]=-\infty\)</span>: <span class="arithmatex">\({v}[1][3]\leftarrow 6\)</span>, <span class="arithmatex">\({s}[1][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][3]=2+6>{v}[0][4]=-\infty\)</span>: <span class="arithmatex">\({v}[1][4]\leftarrow 8\)</span>, <span class="arithmatex">\({s}[1][4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][4]=2+8>{v}[0][5]=-\infty\)</span>: <span class="arithmatex">\({v}[1][5]\leftarrow 10\)</span>, <span class="arithmatex">\({s}[1][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][5]=2+10>{v}[0][6]=-\infty\)</span>: <span class="arithmatex">\({v}[1][6]\leftarrow 12\)</span>, <span class="arithmatex">\({s}[1][6]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[2][0]\leftarrow {v}[1][0]=0\)</span>, <span class="arithmatex">\({s}[2][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>2</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[2][1]\leftarrow {v}[1][1]=2\)</span>, <span class="arithmatex">\({s}[2][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][0]=5+0>{v}[1][2]=4\)</span>: <span class="arithmatex">\({v}[2][2]\leftarrow 5\)</span>, <span class="arithmatex">\({s}[2][2]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>7</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][1]=5+2>{v}[1][3]=6\)</span>: <span class="arithmatex">\({v}[2][3]\leftarrow 7\)</span>, <span class="arithmatex">\({s}[2][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][2]=5+5>{v}[1][4]=8\)</span>: <span class="arithmatex">\({v}[2][4]\leftarrow 10\)</span>, <span class="arithmatex">\({s}[2][4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][3]=5+7>{v}[1][5]=10\)</span>: <span class="arithmatex">\({v}[2][5]\leftarrow 12\)</span>, <span class="arithmatex">\({s}[2][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][4]=5+10>{v}[1][6]=12\)</span>: <span class="arithmatex">\({v}[2][6]\leftarrow 15\)</span>, <span class="arithmatex">\({s}[2][6]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[3][0]\leftarrow {v}[2][0]=0\)</span>, <span class="arithmatex">\({s}[3][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>2</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[3][1]\leftarrow {v}[2][1]=2\)</span>, <span class="arithmatex">\({s}[3][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[3][2]\leftarrow {v}[2][2]=5\)</span>, <span class="arithmatex">\({s}[3][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>7</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+{v}[3][0]=7+0\le {v}[2][3]=7\)</span>: <span class="arithmatex">\({v}[3][3]\leftarrow {v}[2][3]=7\)</span>, <span class="arithmatex">\({s}[3][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+{v}[3][1]=7+2\le {v}[2][4]=10\)</span>: <span class="arithmatex">\({v}[3][4]\leftarrow {v}[2][4]=10\)</span>, <span class="arithmatex">\({s}[3][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+{v}[3][2]=7+5\le {v}[2][5]=12\)</span>: <span class="arithmatex">\({v}[3][5]\leftarrow {v}[2][5]=12\)</span>, <span class="arithmatex">\({s}[3][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>15</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+{v}[3][3]=7+7\le {v}[2][6]=15\)</span>: <span class="arithmatex">\({v}[3][6]\leftarrow {v}[2][6]=15\)</span>, <span class="arithmatex">\({s}[3][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][0]\leftarrow {v}[3][0]=0\)</span>, <span class="arithmatex">\({s}[4][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>2</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][1]\leftarrow {v}[3][1]=2\)</span>, <span class="arithmatex">\({s}[4][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][2]\leftarrow {v}[3][2]=5\)</span>, <span class="arithmatex">\({s}[4][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>7</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][3]\leftarrow {v}[3][3]=7\)</span>, <span class="arithmatex">\({s}[4][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+{v}[4][0]=8+0\le {v}[3][4]=10\)</span>: <span class="arithmatex">\({v}[4][4]\leftarrow {v}[3][4]=10\)</span>, <span class="arithmatex">\({s}[4][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+{v}[4][1]=8+2\le {v}[3][5]=12\)</span>: <span class="arithmatex">\({v}[4][5]\leftarrow {v}[3][5]=12\)</span>, <span class="arithmatex">\({s}[4][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>15</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+{v}[4][2]=8+5\le {v}[3][6]=15\)</span>: <span class="arithmatex">\({v}[4][6]\leftarrow {v}[3][6]=15\)</span>, <span class="arithmatex">\({s}[4][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][0]\leftarrow {v}[4][0]=0\)</span>, <span class="arithmatex">\({s}[5][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>2</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][1]\leftarrow {v}[4][1]=2\)</span>, <span class="arithmatex">\({s}[5][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][2]\leftarrow {v}[4][2]=5\)</span>, <span class="arithmatex">\({s}[5][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>7</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][3]\leftarrow {v}[4][3]=7\)</span>, <span class="arithmatex">\({s}[5][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][4]\leftarrow {v}[4][4]=10\)</span>, <span class="arithmatex">\({s}[5][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[5]+{v}[5][0]=10+0\le {v}[4][5]=12\)</span>: <span class="arithmatex">\({v}[5][5]\leftarrow {v}[4][5]=12\)</span>, <span class="arithmatex">\({s}[5][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>15</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[5]+{v}[5][1]=10+2\le {v}[4][6]=15\)</span>: <span class="arithmatex">\({v}[5][6]\leftarrow {v}[4][6]=15\)</span>, <span class="arithmatex">\({s}[5][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[6][0]\leftarrow {v}[5][0]=0\)</span>, <span class="arithmatex">\({s}[6][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>2</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[6][1]\leftarrow {v}[5][1]=2\)</span>, <span class="arithmatex">\({s}[6][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[6][2]\leftarrow {v}[5][2]=5\)</span>, <span class="arithmatex">\({s}[6][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>7</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[6][3]\leftarrow {v}[5][3]=7\)</span>, <span class="arithmatex">\({s}[6][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[6][4]\leftarrow {v}[5][4]=10\)</span>, <span class="arithmatex">\({s}[6][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[6][5]\leftarrow {v}[5][5]=12\)</span>, <span class="arithmatex">\({s}[6][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>15</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[6]+{v}[6][0]=13+0\le {v}[5][6]=15\)</span>: <span class="arithmatex">\({v}[6][6]\leftarrow {v}[5][6]=15\)</span>, <span class="arithmatex">\({s}[6][6]\leftarrow 0\)</span></td>
        </tr>
        </table></div>

        Queste sono le matrici ${v}$ e ${s}$ ottenute durante l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrr}
        \hline {{v}[j][\ell]} & {\ell=0} & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} & {\ell=6} \\
        \hline {j=0} & 0 & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {-\infty} \\
        {j=1} & 0 & 2 & 4 & 6 & 8 & 10 & 12 \\
        {j=2} & 0 & 2 & 5 & 7 & 10 & 12 & 15 \\
        {j=3} & 0 & 2 & 5 & 7 & 10 & 12 & 15 \\
        {j=4} & 0 & 2 & 5 & 7 & 10 & 12 & 15 \\
        {j=5} & 0 & 2 & 5 & 7 & 10 & 12 & 15 \\
        {j=6} & 0 & 2 & 5 & 7 & 10 & 12 & 15 \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrrrrr}
        \hline {{s}[j][\ell]} & {\ell=0} & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} & {\ell=6} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 1 & 1 & 1 & 1 & 1 & 1 \\
        {j=2} & 0 & 0 & 1 & 1 & 1 & 1 & 1 \\
        {j=3} & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=4} & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=5} & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=6} & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        \hline
        \end{array}
        $$

        Il valore ottimo dell'istanza dell'RCP è ${v}[6][6]=15$.

    4. Con la matrice ${s}$ possiamo ricostruire una soluzione ottima come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(\ell\)</span></th>
        <th><span class="arithmatex">\({s}[j][\ell]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th><span class="arithmatex">\(x[5]\)</span></th>
        <th><span class="arithmatex">\(x[6]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>1</td>
        <td>6</td>
        <td>6</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 5\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td>6</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 4\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>6</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td>6</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>2</td>
        <td>6</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\ell\leftarrow 4\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>2</td>
        <td>4</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\ell\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td>2</td>
        <td>2</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">3</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\ell\leftarrow 0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (0,3,0,0,0,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        {v}[6][6]=15.
        $$

<a id="esercizio-28-2"></a>

!!! esercizio "Esercizio 28.2: Esercizio 2: problema del taglio delle barre"

    Consideriamo la seguente istanza dell'RCP, in cui la barra ha lunghezza $n=5$ e i profitti associati alle possibili lunghezze dei pezzi sono:

    $$
    \begin{array}{l|rrrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\
    \hline {p_j} & {1} & {4} & {6} & {8} & {9} \\
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

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $\ell$ e $j$, le celle $v[\ell]$ e $s[\ell]$, il valore corrente di $\mathit{m}$ e il valore corrente di $\mathit{t}$. La cella di $\mathit{m}$ è evidenziata in <mark>rosso</mark> quando viene aggiornata; la cella di $\mathit{t}$ è evidenziata in <mark>blu</mark> quando viene aggiornata; le celle di $v[\ell]$ e $s[\ell]$ sono evidenziate in <mark>blu</mark> quando vengono assegnate.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(\ell\)</span></th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(v[\ell]\)</span></th>
        <th><span class="arithmatex">\(s[\ell]\)</span></th>
        <th><span class="arithmatex">\(\mathit{m}\)</span></th>
        <th><span class="arithmatex">\(\mathit{t}\)</span></th>
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
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">1</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[0]=1+0=1>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 1\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[1]\leftarrow \mathit{m}=1\)</span>, <span class="arithmatex">\(s[1]\leftarrow \mathit{t}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">2</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[1]=1+1=2>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 2\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">4</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">\(p[2]+v[0]=4+0=4>2\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 4\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">4</td>
        <td class="cella-blu">2</td>
        <td>4</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[2]\leftarrow \mathit{m}=4\)</span>, <span class="arithmatex">\(s[2]\leftarrow \mathit{t}=2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">5</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[2]=1+4=5>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 5\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[1]=4+1=5=\mathit{m}\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">6</td>
        <td class="cella-blu">3</td>
        <td><span class="arithmatex">\(p[3]+v[0]=6+0=6>5\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 6\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">3</td>
        <td>6</td>
        <td>3</td>
        <td><span class="arithmatex">\(v[3]\leftarrow \mathit{m}=6\)</span>, <span class="arithmatex">\(s[3]\leftarrow \mathit{t}=3\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">7</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[3]=1+6=7>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 7\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">8</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">\(p[2]+v[2]=4+4=8>7\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 8\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>8</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[3]+v[1]=6+1=7<8\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>8</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[4]+v[0]=8+0=8=\mathit{m}\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">8</td>
        <td class="cella-blu">2</td>
        <td>8</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[4]\leftarrow \mathit{m}=8\)</span>, <span class="arithmatex">\(s[4]\leftarrow \mathit{t}=2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">9</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[4]=1+8=9>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 9\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">10</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">\(p[2]+v[3]=4+6=10>9\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 10\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[3]+v[2]=6+4=10=\mathit{m}\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[4]+v[1]=8+1=9<10\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[5]+v[0]=9+0=9<10\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">2</td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[5]\leftarrow \mathit{m}=10\)</span>, <span class="arithmatex">\(s[5]\leftarrow \mathit{t}=2\)</span></td>
        </tr>
        </table></div>

        Questo è il vettore $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{ccccccc}
        \hline  & {\ell=0} & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} \\
        \hline {v[\ell]} & 0 & 1 & 4 & 6 & 8 & 10 \\
        \hline
        \end{array}
        $$

        Questo è il vettore $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{cccccc}
        \hline  & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} \\
        \hline {s[\ell]} & 1 & 2 & 3 & 2 & 2 \\
        \hline
        \end{array}
        $$

    2. Abbiamo il seguente vettore $s$:

        $$
        \begin{array}{l|rrrrr}
        \hline  & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} \\
        \hline {s[\ell]} & 1 & 2 & 3 & 2 & 2 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima per una barra di lunghezza $n=5$ come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(s[j]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th><span class="arithmatex">\(x[5]\)</span></th>
        <th>Aggiornamento di <span class="arithmatex">\(j\)</span></th>
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
        <td><span class="arithmatex">\(j=5\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td>2</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=5-2=3\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>3</td>
        <td>0</td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=3-3=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (0,1,1,0,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[5]=10.
        $$

    3. Esecuzione passo per passo del secondo algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $j$ e $\ell$, le celle ${v}[j][\ell]$ e ${s}[j][\ell]$ e l'operazione eseguita. Le celle si calcolano per valori crescenti di $j$ e, per ogni valore fissato di $j$, per valori crescenti di $\ell$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(\ell\)</span></th>
        <th><span class="arithmatex">\({v}[j][\ell]\)</span></th>
        <th><span class="arithmatex">\({s}[j][\ell]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][0]\leftarrow 0\)</span>, <span class="arithmatex">\({s}[0][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][1]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][2]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][3]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][4]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][5]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[1][0]\leftarrow {v}[0][0]=0\)</span>, <span class="arithmatex">\({s}[1][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][0]=1+0>{v}[0][1]=-\infty\)</span>: <span class="arithmatex">\({v}[1][1]\leftarrow 1\)</span>, <span class="arithmatex">\({s}[1][1]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][1]=1+1>{v}[0][2]=-\infty\)</span>: <span class="arithmatex">\({v}[1][2]\leftarrow 2\)</span>, <span class="arithmatex">\({s}[1][2]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][2]=1+2>{v}[0][3]=-\infty\)</span>: <span class="arithmatex">\({v}[1][3]\leftarrow 3\)</span>, <span class="arithmatex">\({s}[1][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][3]=1+3>{v}[0][4]=-\infty\)</span>: <span class="arithmatex">\({v}[1][4]\leftarrow 4\)</span>, <span class="arithmatex">\({s}[1][4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][4]=1+4>{v}[0][5]=-\infty\)</span>: <span class="arithmatex">\({v}[1][5]\leftarrow 5\)</span>, <span class="arithmatex">\({s}[1][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[2][0]\leftarrow {v}[1][0]=0\)</span>, <span class="arithmatex">\({s}[2][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>1</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[2][1]\leftarrow {v}[1][1]=1\)</span>, <span class="arithmatex">\({s}[2][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][0]=4+0>{v}[1][2]=2\)</span>: <span class="arithmatex">\({v}[2][2]\leftarrow 4\)</span>, <span class="arithmatex">\({s}[2][2]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][1]=4+1>{v}[1][3]=3\)</span>: <span class="arithmatex">\({v}[2][3]\leftarrow 5\)</span>, <span class="arithmatex">\({s}[2][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][2]=4+4>{v}[1][4]=4\)</span>: <span class="arithmatex">\({v}[2][4]\leftarrow 8\)</span>, <span class="arithmatex">\({s}[2][4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][3]=4+5>{v}[1][5]=5\)</span>: <span class="arithmatex">\({v}[2][5]\leftarrow 9\)</span>, <span class="arithmatex">\({s}[2][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[3][0]\leftarrow {v}[2][0]=0\)</span>, <span class="arithmatex">\({s}[3][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>1</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[3][1]\leftarrow {v}[2][1]=1\)</span>, <span class="arithmatex">\({s}[3][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>4</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[3][2]\leftarrow {v}[2][2]=4\)</span>, <span class="arithmatex">\({s}[3][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+{v}[3][0]=6+0>{v}[2][3]=5\)</span>: <span class="arithmatex">\({v}[3][3]\leftarrow 6\)</span>, <span class="arithmatex">\({s}[3][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>8</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+{v}[3][1]=6+1\le {v}[2][4]=8\)</span>: <span class="arithmatex">\({v}[3][4]\leftarrow {v}[2][4]=8\)</span>, <span class="arithmatex">\({s}[3][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+{v}[3][2]=6+4>{v}[2][5]=9\)</span>: <span class="arithmatex">\({v}[3][5]\leftarrow 10\)</span>, <span class="arithmatex">\({s}[3][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][0]\leftarrow {v}[3][0]=0\)</span>, <span class="arithmatex">\({s}[4][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>1</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][1]\leftarrow {v}[3][1]=1\)</span>, <span class="arithmatex">\({s}[4][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>4</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][2]\leftarrow {v}[3][2]=4\)</span>, <span class="arithmatex">\({s}[4][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][3]\leftarrow {v}[3][3]=6\)</span>, <span class="arithmatex">\({s}[4][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>8</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+{v}[4][0]=8+0\le {v}[3][4]=8\)</span>: <span class="arithmatex">\({v}[4][4]\leftarrow {v}[3][4]=8\)</span>, <span class="arithmatex">\({s}[4][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+{v}[4][1]=8+1\le {v}[3][5]=10\)</span>: <span class="arithmatex">\({v}[4][5]\leftarrow {v}[3][5]=10\)</span>, <span class="arithmatex">\({s}[4][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][0]\leftarrow {v}[4][0]=0\)</span>, <span class="arithmatex">\({s}[5][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>1</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][1]\leftarrow {v}[4][1]=1\)</span>, <span class="arithmatex">\({s}[5][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>4</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][2]\leftarrow {v}[4][2]=4\)</span>, <span class="arithmatex">\({s}[5][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][3]\leftarrow {v}[4][3]=6\)</span>, <span class="arithmatex">\({s}[5][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>8</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][4]\leftarrow {v}[4][4]=8\)</span>, <span class="arithmatex">\({s}[5][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[5]+{v}[5][0]=9+0\le {v}[4][5]=10\)</span>: <span class="arithmatex">\({v}[5][5]\leftarrow {v}[4][5]=10\)</span>, <span class="arithmatex">\({s}[5][5]\leftarrow 0\)</span></td>
        </tr>
        </table></div>

        Queste sono le matrici ${v}$ e ${s}$ ottenute durante l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrr}
        \hline {{v}[j][\ell]} & {\ell=0} & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} \\
        \hline {j=0} & 0 & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {-\infty} \\
        {j=1} & 0 & 1 & 2 & 3 & 4 & 5 \\
        {j=2} & 0 & 1 & 4 & 5 & 8 & 9 \\
        {j=3} & 0 & 1 & 4 & 6 & 8 & 10 \\
        {j=4} & 0 & 1 & 4 & 6 & 8 & 10 \\
        {j=5} & 0 & 1 & 4 & 6 & 8 & 10 \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrrrr}
        \hline {{s}[j][\ell]} & {\ell=0} & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 1 & 1 & 1 & 1 & 1 \\
        {j=2} & 0 & 0 & 1 & 1 & 1 & 1 \\
        {j=3} & 0 & 0 & 0 & 1 & 0 & 1 \\
        {j=4} & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=5} & 0 & 0 & 0 & 0 & 0 & 0 \\
        \hline
        \end{array}
        $$

        Il valore ottimo dell'istanza dell'RCP è ${v}[5][5]=10$.

    4. Con la matrice ${s}$ possiamo ricostruire una soluzione ottima come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(\ell\)</span></th>
        <th><span class="arithmatex">\({s}[j][\ell]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th><span class="arithmatex">\(x[5]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td>5</td>
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
        <td>5</td>
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
        <td>5</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\ell\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td>2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>2</td>
        <td>2</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\ell\leftarrow 0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (0,1,1,0,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        {v}[5][5]=10.
        $$

<a id="esercizio-28-3"></a>

!!! esercizio "Esercizio 28.3: Esercizio 3: problema del taglio delle barre"

    Consideriamo la seguente istanza dell'RCP, in cui la barra ha lunghezza $n=5$ e i profitti associati alle possibili lunghezze dei pezzi sono:

    $$
    \begin{array}{l|rrrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\
    \hline {p_j} & {3} & {5} & {8} & {9} & {10} \\
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

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $\ell$ e $j$, le celle $v[\ell]$ e $s[\ell]$, il valore corrente di $\mathit{m}$ e il valore corrente di $\mathit{t}$. La cella di $\mathit{m}$ è evidenziata in <mark>rosso</mark> quando viene aggiornata; la cella di $\mathit{t}$ è evidenziata in <mark>blu</mark> quando viene aggiornata; le celle di $v[\ell]$ e $s[\ell]$ sono evidenziate in <mark>blu</mark> quando vengono assegnate.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(\ell\)</span></th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(v[\ell]\)</span></th>
        <th><span class="arithmatex">\(s[\ell]\)</span></th>
        <th><span class="arithmatex">\(\mathit{m}\)</span></th>
        <th><span class="arithmatex">\(\mathit{t}\)</span></th>
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
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">3</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[0]=3+0=3>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 3\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">3</td>
        <td class="cella-blu">1</td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[1]\leftarrow \mathit{m}=3\)</span>, <span class="arithmatex">\(s[1]\leftarrow \mathit{t}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">6</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[1]=3+3=6>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 6\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[0]=5+0=5<6\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">1</td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[2]\leftarrow \mathit{m}=6\)</span>, <span class="arithmatex">\(s[2]\leftarrow \mathit{t}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">9</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[2]=3+6=9>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 9\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[1]=5+3=8<9\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[0]=8+0=8<9\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">9</td>
        <td class="cella-blu">1</td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[3]\leftarrow \mathit{m}=9\)</span>, <span class="arithmatex">\(s[3]\leftarrow \mathit{t}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">12</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[3]=3+9=12>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 12\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[2]=5+6=11<12\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[1]=8+3=11<12\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[4]+v[0]=9+0=9<12\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">12</td>
        <td class="cella-blu">1</td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[4]\leftarrow \mathit{m}=12\)</span>, <span class="arithmatex">\(s[4]\leftarrow \mathit{t}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">15</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[4]=3+12=15>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 15\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[3]=5+9=14<15\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[2]=8+6=14<15\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[4]+v[1]=9+3=12<15\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[5]+v[0]=10+0=10<15\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">15</td>
        <td class="cella-blu">1</td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[5]\leftarrow \mathit{m}=15\)</span>, <span class="arithmatex">\(s[5]\leftarrow \mathit{t}=1\)</span></td>
        </tr>
        </table></div>

        Questo è il vettore $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{ccccccc}
        \hline  & {\ell=0} & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} \\
        \hline {v[\ell]} & 0 & 3 & 6 & 9 & 12 & 15 \\
        \hline
        \end{array}
        $$

        Questo è il vettore $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{cccccc}
        \hline  & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} \\
        \hline {s[\ell]} & 1 & 1 & 1 & 1 & 1 \\
        \hline
        \end{array}
        $$

    2. Abbiamo il seguente vettore $s$:

        $$
        \begin{array}{l|rrrrr}
        \hline  & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} \\
        \hline {s[\ell]} & 1 & 1 & 1 & 1 & 1 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima per una barra di lunghezza $n=5$ come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(s[j]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th><span class="arithmatex">\(x[5]\)</span></th>
        <th>Aggiornamento di <span class="arithmatex">\(j\)</span></th>
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
        <td><span class="arithmatex">\(j=5\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=5-1=4\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=4-1=3\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>3</td>
        <td>1</td>
        <td class="cella-blu">3</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=3-1=2\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>2</td>
        <td>1</td>
        <td class="cella-blu">4</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=2-1=1\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td>1</td>
        <td class="cella-blu">5</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=1-1=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (5,0,0,0,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[5]=15.
        $$

    3. Esecuzione passo per passo del secondo algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $j$ e $\ell$, le celle ${v}[j][\ell]$ e ${s}[j][\ell]$ e l'operazione eseguita. Le celle si calcolano per valori crescenti di $j$ e, per ogni valore fissato di $j$, per valori crescenti di $\ell$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(\ell\)</span></th>
        <th><span class="arithmatex">\({v}[j][\ell]\)</span></th>
        <th><span class="arithmatex">\({s}[j][\ell]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][0]\leftarrow 0\)</span>, <span class="arithmatex">\({s}[0][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][1]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][2]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][3]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][4]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][5]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[1][0]\leftarrow {v}[0][0]=0\)</span>, <span class="arithmatex">\({s}[1][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][0]=3+0>{v}[0][1]=-\infty\)</span>: <span class="arithmatex">\({v}[1][1]\leftarrow 3\)</span>, <span class="arithmatex">\({s}[1][1]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][1]=3+3>{v}[0][2]=-\infty\)</span>: <span class="arithmatex">\({v}[1][2]\leftarrow 6\)</span>, <span class="arithmatex">\({s}[1][2]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>9</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][2]=3+6>{v}[0][3]=-\infty\)</span>: <span class="arithmatex">\({v}[1][3]\leftarrow 9\)</span>, <span class="arithmatex">\({s}[1][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][3]=3+9>{v}[0][4]=-\infty\)</span>: <span class="arithmatex">\({v}[1][4]\leftarrow 12\)</span>, <span class="arithmatex">\({s}[1][4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][4]=3+12>{v}[0][5]=-\infty\)</span>: <span class="arithmatex">\({v}[1][5]\leftarrow 15\)</span>, <span class="arithmatex">\({s}[1][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[2][0]\leftarrow {v}[1][0]=0\)</span>, <span class="arithmatex">\({s}[2][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>3</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[2][1]\leftarrow {v}[1][1]=3\)</span>, <span class="arithmatex">\({s}[2][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][0]=5+0\le {v}[1][2]=6\)</span>: <span class="arithmatex">\({v}[2][2]\leftarrow {v}[1][2]=6\)</span>, <span class="arithmatex">\({s}[2][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>9</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][1]=5+3\le {v}[1][3]=9\)</span>: <span class="arithmatex">\({v}[2][3]\leftarrow {v}[1][3]=9\)</span>, <span class="arithmatex">\({s}[2][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][2]=5+6\le {v}[1][4]=12\)</span>: <span class="arithmatex">\({v}[2][4]\leftarrow {v}[1][4]=12\)</span>, <span class="arithmatex">\({s}[2][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>15</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][3]=5+9\le {v}[1][5]=15\)</span>: <span class="arithmatex">\({v}[2][5]\leftarrow {v}[1][5]=15\)</span>, <span class="arithmatex">\({s}[2][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[3][0]\leftarrow {v}[2][0]=0\)</span>, <span class="arithmatex">\({s}[3][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>3</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[3][1]\leftarrow {v}[2][1]=3\)</span>, <span class="arithmatex">\({s}[3][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[3][2]\leftarrow {v}[2][2]=6\)</span>, <span class="arithmatex">\({s}[3][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>9</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+{v}[3][0]=8+0\le {v}[2][3]=9\)</span>: <span class="arithmatex">\({v}[3][3]\leftarrow {v}[2][3]=9\)</span>, <span class="arithmatex">\({s}[3][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+{v}[3][1]=8+3\le {v}[2][4]=12\)</span>: <span class="arithmatex">\({v}[3][4]\leftarrow {v}[2][4]=12\)</span>, <span class="arithmatex">\({s}[3][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>15</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+{v}[3][2]=8+6\le {v}[2][5]=15\)</span>: <span class="arithmatex">\({v}[3][5]\leftarrow {v}[2][5]=15\)</span>, <span class="arithmatex">\({s}[3][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][0]\leftarrow {v}[3][0]=0\)</span>, <span class="arithmatex">\({s}[4][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>3</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][1]\leftarrow {v}[3][1]=3\)</span>, <span class="arithmatex">\({s}[4][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][2]\leftarrow {v}[3][2]=6\)</span>, <span class="arithmatex">\({s}[4][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>9</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][3]\leftarrow {v}[3][3]=9\)</span>, <span class="arithmatex">\({s}[4][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+{v}[4][0]=9+0\le {v}[3][4]=12\)</span>: <span class="arithmatex">\({v}[4][4]\leftarrow {v}[3][4]=12\)</span>, <span class="arithmatex">\({s}[4][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>15</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+{v}[4][1]=9+3\le {v}[3][5]=15\)</span>: <span class="arithmatex">\({v}[4][5]\leftarrow {v}[3][5]=15\)</span>, <span class="arithmatex">\({s}[4][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][0]\leftarrow {v}[4][0]=0\)</span>, <span class="arithmatex">\({s}[5][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>3</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][1]\leftarrow {v}[4][1]=3\)</span>, <span class="arithmatex">\({s}[5][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][2]\leftarrow {v}[4][2]=6\)</span>, <span class="arithmatex">\({s}[5][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>9</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][3]\leftarrow {v}[4][3]=9\)</span>, <span class="arithmatex">\({s}[5][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][4]\leftarrow {v}[4][4]=12\)</span>, <span class="arithmatex">\({s}[5][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>15</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[5]+{v}[5][0]=10+0\le {v}[4][5]=15\)</span>: <span class="arithmatex">\({v}[5][5]\leftarrow {v}[4][5]=15\)</span>, <span class="arithmatex">\({s}[5][5]\leftarrow 0\)</span></td>
        </tr>
        </table></div>

        Queste sono le matrici ${v}$ e ${s}$ ottenute durante l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrr}
        \hline {{v}[j][\ell]} & {\ell=0} & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} \\
        \hline {j=0} & 0 & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {-\infty} \\
        {j=1} & 0 & 3 & 6 & 9 & 12 & 15 \\
        {j=2} & 0 & 3 & 6 & 9 & 12 & 15 \\
        {j=3} & 0 & 3 & 6 & 9 & 12 & 15 \\
        {j=4} & 0 & 3 & 6 & 9 & 12 & 15 \\
        {j=5} & 0 & 3 & 6 & 9 & 12 & 15 \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrrrr}
        \hline {{s}[j][\ell]} & {\ell=0} & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 1 & 1 & 1 & 1 & 1 \\
        {j=2} & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=3} & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=4} & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=5} & 0 & 0 & 0 & 0 & 0 & 0 \\
        \hline
        \end{array}
        $$

        Il valore ottimo dell'istanza dell'RCP è ${v}[5][5]=15$.

    4. Con la matrice ${s}$ possiamo ricostruire una soluzione ottima come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(\ell\)</span></th>
        <th><span class="arithmatex">\({s}[j][\ell]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th><span class="arithmatex">\(x[5]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>1</td>
        <td>5</td>
        <td>5</td>
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
        <td>5</td>
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
        <td>5</td>
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
        <td>5</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td>5</td>
        <td>1</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\ell\leftarrow 4\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>1</td>
        <td>4</td>
        <td>1</td>
        <td class="cella-blu">2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\ell\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td>1</td>
        <td>3</td>
        <td>1</td>
        <td class="cella-blu">3</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\ell\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>8</td>
        <td>1</td>
        <td>2</td>
        <td>1</td>
        <td class="cella-blu">4</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\ell\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td>9</td>
        <td>1</td>
        <td>1</td>
        <td>1</td>
        <td class="cella-blu">5</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\ell\leftarrow 0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (5,0,0,0,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        {v}[5][5]=15.
        $$

<a id="esercizio-28-4"></a>

!!! esercizio "Esercizio 28.4: Esercizio 4: problema del taglio delle barre"

    Consideriamo la seguente istanza dell'RCP, in cui la barra ha lunghezza $n=6$ e i profitti associati alle possibili lunghezze dei pezzi sono:

    $$
    \begin{array}{l|rrrrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} \\
    \hline {p_j} & {2} & {6} & {7} & {11} & {13} & {17} \\
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

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $\ell$ e $j$, le celle $v[\ell]$ e $s[\ell]$, il valore corrente di $\mathit{m}$ e il valore corrente di $\mathit{t}$. La cella di $\mathit{m}$ è evidenziata in <mark>rosso</mark> quando viene aggiornata; la cella di $\mathit{t}$ è evidenziata in <mark>blu</mark> quando viene aggiornata; le celle di $v[\ell]$ e $s[\ell]$ sono evidenziate in <mark>blu</mark> quando vengono assegnate.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(\ell\)</span></th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(v[\ell]\)</span></th>
        <th><span class="arithmatex">\(s[\ell]\)</span></th>
        <th><span class="arithmatex">\(\mathit{m}\)</span></th>
        <th><span class="arithmatex">\(\mathit{t}\)</span></th>
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
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">2</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[0]=2+0=2>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 2\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">2</td>
        <td class="cella-blu">1</td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[1]\leftarrow \mathit{m}=2\)</span>, <span class="arithmatex">\(s[1]\leftarrow \mathit{t}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">4</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[1]=2+2=4>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 4\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">6</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">\(p[2]+v[0]=6+0=6>4\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 6\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">6</td>
        <td class="cella-blu">2</td>
        <td>6</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[2]\leftarrow \mathit{m}=6\)</span>, <span class="arithmatex">\(s[2]\leftarrow \mathit{t}=2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">8</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[2]=2+6=8>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 8\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[1]=6+2=8=\mathit{m}\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[0]=7+0=7<8\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">8</td>
        <td class="cella-blu">1</td>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[3]\leftarrow \mathit{m}=8\)</span>, <span class="arithmatex">\(s[3]\leftarrow \mathit{t}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">10</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[3]=2+8=10>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 10\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">12</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">\(p[2]+v[2]=6+6=12>10\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 12\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[3]+v[1]=7+2=9<12\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>12</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[4]+v[0]=11+0=11<12\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">12</td>
        <td class="cella-blu">2</td>
        <td>12</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[4]\leftarrow \mathit{m}=12\)</span>, <span class="arithmatex">\(s[4]\leftarrow \mathit{t}=2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">14</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[4]=2+12=14>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 14\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>14</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[3]=6+8=14=\mathit{m}\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>14</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+v[2]=7+6=13<14\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>14</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[4]+v[1]=11+2=13<14\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>14</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[5]+v[0]=13+0=13<14\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">14</td>
        <td class="cella-blu">1</td>
        <td>14</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[5]\leftarrow \mathit{m}=14\)</span>, <span class="arithmatex">\(s[5]\leftarrow \mathit{t}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">16</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[5]=2+14=16>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 16\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">18</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">\(p[2]+v[4]=6+12=18>16\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 18\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>18</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[3]+v[3]=7+8=15<18\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>18</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[4]+v[2]=11+6=17<18\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>18</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[5]+v[1]=13+2=15<18\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>18</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[6]+v[0]=17+0=17<18\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">18</td>
        <td class="cella-blu">2</td>
        <td>18</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[6]\leftarrow \mathit{m}=18\)</span>, <span class="arithmatex">\(s[6]\leftarrow \mathit{t}=2\)</span></td>
        </tr>
        </table></div>

        Questo è il vettore $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{cccccccc}
        \hline  & {\ell=0} & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} & {\ell=6} \\
        \hline {v[\ell]} & 0 & 2 & 6 & 8 & 12 & 14 & 18 \\
        \hline
        \end{array}
        $$

        Questo è il vettore $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{ccccccc}
        \hline  & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} & {\ell=6} \\
        \hline {s[\ell]} & 1 & 2 & 1 & 2 & 1 & 2 \\
        \hline
        \end{array}
        $$

    2. Abbiamo il seguente vettore $s$:

        $$
        \begin{array}{l|rrrrrr}
        \hline  & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} & {\ell=6} \\
        \hline {s[\ell]} & 1 & 2 & 1 & 2 & 1 & 2 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima per una barra di lunghezza $n=6$ come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(s[j]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th><span class="arithmatex">\(x[5]\)</span></th>
        <th><span class="arithmatex">\(x[6]\)</span></th>
        <th>Aggiornamento di <span class="arithmatex">\(j\)</span></th>
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
        <td>0</td>
        <td><span class="arithmatex">\(j=6\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>6</td>
        <td>2</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=6-2=4\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>4</td>
        <td>2</td>
        <td>0</td>
        <td class="cella-blu">2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=4-2=2\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>2</td>
        <td>2</td>
        <td>0</td>
        <td class="cella-blu">3</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=2-2=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (0,3,0,0,0,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[6]=18.
        $$

    3. Esecuzione passo per passo del secondo algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $j$ e $\ell$, le celle ${v}[j][\ell]$ e ${s}[j][\ell]$ e l'operazione eseguita. Le celle si calcolano per valori crescenti di $j$ e, per ogni valore fissato di $j$, per valori crescenti di $\ell$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(\ell\)</span></th>
        <th><span class="arithmatex">\({v}[j][\ell]\)</span></th>
        <th><span class="arithmatex">\({s}[j][\ell]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][0]\leftarrow 0\)</span>, <span class="arithmatex">\({s}[0][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][1]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][2]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][3]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][4]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][5]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][6]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[1][0]\leftarrow {v}[0][0]=0\)</span>, <span class="arithmatex">\({s}[1][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][0]=2+0>{v}[0][1]=-\infty\)</span>: <span class="arithmatex">\({v}[1][1]\leftarrow 2\)</span>, <span class="arithmatex">\({s}[1][1]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][1]=2+2>{v}[0][2]=-\infty\)</span>: <span class="arithmatex">\({v}[1][2]\leftarrow 4\)</span>, <span class="arithmatex">\({s}[1][2]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][2]=2+4>{v}[0][3]=-\infty\)</span>: <span class="arithmatex">\({v}[1][3]\leftarrow 6\)</span>, <span class="arithmatex">\({s}[1][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][3]=2+6>{v}[0][4]=-\infty\)</span>: <span class="arithmatex">\({v}[1][4]\leftarrow 8\)</span>, <span class="arithmatex">\({s}[1][4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][4]=2+8>{v}[0][5]=-\infty\)</span>: <span class="arithmatex">\({v}[1][5]\leftarrow 10\)</span>, <span class="arithmatex">\({s}[1][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][5]=2+10>{v}[0][6]=-\infty\)</span>: <span class="arithmatex">\({v}[1][6]\leftarrow 12\)</span>, <span class="arithmatex">\({s}[1][6]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[2][0]\leftarrow {v}[1][0]=0\)</span>, <span class="arithmatex">\({s}[2][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>2</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[2][1]\leftarrow {v}[1][1]=2\)</span>, <span class="arithmatex">\({s}[2][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][0]=6+0>{v}[1][2]=4\)</span>: <span class="arithmatex">\({v}[2][2]\leftarrow 6\)</span>, <span class="arithmatex">\({s}[2][2]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][1]=6+2>{v}[1][3]=6\)</span>: <span class="arithmatex">\({v}[2][3]\leftarrow 8\)</span>, <span class="arithmatex">\({s}[2][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>12</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][2]=6+6>{v}[1][4]=8\)</span>: <span class="arithmatex">\({v}[2][4]\leftarrow 12\)</span>, <span class="arithmatex">\({s}[2][4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>14</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][3]=6+8>{v}[1][5]=10\)</span>: <span class="arithmatex">\({v}[2][5]\leftarrow 14\)</span>, <span class="arithmatex">\({s}[2][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>18</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][4]=6+12>{v}[1][6]=12\)</span>: <span class="arithmatex">\({v}[2][6]\leftarrow 18\)</span>, <span class="arithmatex">\({s}[2][6]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[3][0]\leftarrow {v}[2][0]=0\)</span>, <span class="arithmatex">\({s}[3][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>2</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[3][1]\leftarrow {v}[2][1]=2\)</span>, <span class="arithmatex">\({s}[3][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[3][2]\leftarrow {v}[2][2]=6\)</span>, <span class="arithmatex">\({s}[3][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>8</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+{v}[3][0]=7+0\le {v}[2][3]=8\)</span>: <span class="arithmatex">\({v}[3][3]\leftarrow {v}[2][3]=8\)</span>, <span class="arithmatex">\({s}[3][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+{v}[3][1]=7+2\le {v}[2][4]=12\)</span>: <span class="arithmatex">\({v}[3][4]\leftarrow {v}[2][4]=12\)</span>, <span class="arithmatex">\({s}[3][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>14</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+{v}[3][2]=7+6\le {v}[2][5]=14\)</span>: <span class="arithmatex">\({v}[3][5]\leftarrow {v}[2][5]=14\)</span>, <span class="arithmatex">\({s}[3][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>18</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+{v}[3][3]=7+8\le {v}[2][6]=18\)</span>: <span class="arithmatex">\({v}[3][6]\leftarrow {v}[2][6]=18\)</span>, <span class="arithmatex">\({s}[3][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][0]\leftarrow {v}[3][0]=0\)</span>, <span class="arithmatex">\({s}[4][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>2</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][1]\leftarrow {v}[3][1]=2\)</span>, <span class="arithmatex">\({s}[4][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][2]\leftarrow {v}[3][2]=6\)</span>, <span class="arithmatex">\({s}[4][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>8</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][3]\leftarrow {v}[3][3]=8\)</span>, <span class="arithmatex">\({s}[4][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+{v}[4][0]=11+0\le {v}[3][4]=12\)</span>: <span class="arithmatex">\({v}[4][4]\leftarrow {v}[3][4]=12\)</span>, <span class="arithmatex">\({s}[4][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>14</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+{v}[4][1]=11+2\le {v}[3][5]=14\)</span>: <span class="arithmatex">\({v}[4][5]\leftarrow {v}[3][5]=14\)</span>, <span class="arithmatex">\({s}[4][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>18</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+{v}[4][2]=11+6\le {v}[3][6]=18\)</span>: <span class="arithmatex">\({v}[4][6]\leftarrow {v}[3][6]=18\)</span>, <span class="arithmatex">\({s}[4][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][0]\leftarrow {v}[4][0]=0\)</span>, <span class="arithmatex">\({s}[5][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>2</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][1]\leftarrow {v}[4][1]=2\)</span>, <span class="arithmatex">\({s}[5][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][2]\leftarrow {v}[4][2]=6\)</span>, <span class="arithmatex">\({s}[5][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>8</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][3]\leftarrow {v}[4][3]=8\)</span>, <span class="arithmatex">\({s}[5][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][4]\leftarrow {v}[4][4]=12\)</span>, <span class="arithmatex">\({s}[5][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>14</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[5]+{v}[5][0]=13+0\le {v}[4][5]=14\)</span>: <span class="arithmatex">\({v}[5][5]\leftarrow {v}[4][5]=14\)</span>, <span class="arithmatex">\({s}[5][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>18</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[5]+{v}[5][1]=13+2\le {v}[4][6]=18\)</span>: <span class="arithmatex">\({v}[5][6]\leftarrow {v}[4][6]=18\)</span>, <span class="arithmatex">\({s}[5][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[6][0]\leftarrow {v}[5][0]=0\)</span>, <span class="arithmatex">\({s}[6][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>2</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[6][1]\leftarrow {v}[5][1]=2\)</span>, <span class="arithmatex">\({s}[6][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>6</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[6][2]\leftarrow {v}[5][2]=6\)</span>, <span class="arithmatex">\({s}[6][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>8</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[6][3]\leftarrow {v}[5][3]=8\)</span>, <span class="arithmatex">\({s}[6][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>12</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[6][4]\leftarrow {v}[5][4]=12\)</span>, <span class="arithmatex">\({s}[6][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>14</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[6][5]\leftarrow {v}[5][5]=14\)</span>, <span class="arithmatex">\({s}[6][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>18</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[6]+{v}[6][0]=17+0\le {v}[5][6]=18\)</span>: <span class="arithmatex">\({v}[6][6]\leftarrow {v}[5][6]=18\)</span>, <span class="arithmatex">\({s}[6][6]\leftarrow 0\)</span></td>
        </tr>
        </table></div>

        Queste sono le matrici ${v}$ e ${s}$ ottenute durante l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrr}
        \hline {{v}[j][\ell]} & {\ell=0} & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} & {\ell=6} \\
        \hline {j=0} & 0 & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {-\infty} \\
        {j=1} & 0 & 2 & 4 & 6 & 8 & 10 & 12 \\
        {j=2} & 0 & 2 & 6 & 8 & 12 & 14 & 18 \\
        {j=3} & 0 & 2 & 6 & 8 & 12 & 14 & 18 \\
        {j=4} & 0 & 2 & 6 & 8 & 12 & 14 & 18 \\
        {j=5} & 0 & 2 & 6 & 8 & 12 & 14 & 18 \\
        {j=6} & 0 & 2 & 6 & 8 & 12 & 14 & 18 \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrrrrr}
        \hline {{s}[j][\ell]} & {\ell=0} & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} & {\ell=6} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 1 & 1 & 1 & 1 & 1 & 1 \\
        {j=2} & 0 & 0 & 1 & 1 & 1 & 1 & 1 \\
        {j=3} & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=4} & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=5} & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=6} & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        \hline
        \end{array}
        $$

        Il valore ottimo dell'istanza dell'RCP è ${v}[6][6]=18$.

    4. Con la matrice ${s}$ possiamo ricostruire una soluzione ottima come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(\ell\)</span></th>
        <th><span class="arithmatex">\({s}[j][\ell]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th><span class="arithmatex">\(x[5]\)</span></th>
        <th><span class="arithmatex">\(x[6]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>1</td>
        <td>6</td>
        <td>6</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 5\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td>6</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 4\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>6</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td>6</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>2</td>
        <td>6</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\ell\leftarrow 4\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>2</td>
        <td>4</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\ell\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td>7</td>
        <td>2</td>
        <td>2</td>
        <td>1</td>
        <td>0</td>
        <td class="cella-blu">3</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\ell\leftarrow 0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (0,3,0,0,0,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        {v}[6][6]=18.
        $$

<a id="esercizio-28-5"></a>

!!! esercizio "Esercizio 28.5: Esercizio 5: problema del taglio delle barre"

    Consideriamo la seguente istanza dell'RCP, in cui la barra ha lunghezza $n=6$ e i profitti associati alle possibili lunghezze dei pezzi sono:

    $$
    \begin{array}{l|rrrrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} \\
    \hline {p_j} & {1} & {5} & {8} & {9} & {12} & {14} \\
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

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $\ell$ e $j$, le celle $v[\ell]$ e $s[\ell]$, il valore corrente di $\mathit{m}$ e il valore corrente di $\mathit{t}$. La cella di $\mathit{m}$ è evidenziata in <mark>rosso</mark> quando viene aggiornata; la cella di $\mathit{t}$ è evidenziata in <mark>blu</mark> quando viene aggiornata; le celle di $v[\ell]$ e $s[\ell]$ sono evidenziate in <mark>blu</mark> quando vengono assegnate.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(\ell\)</span></th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(v[\ell]\)</span></th>
        <th><span class="arithmatex">\(s[\ell]\)</span></th>
        <th><span class="arithmatex">\(\mathit{m}\)</span></th>
        <th><span class="arithmatex">\(\mathit{t}\)</span></th>
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
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">1</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[0]=1+0=1>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 1\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">1</td>
        <td class="cella-blu">1</td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(v[1]\leftarrow \mathit{m}=1\)</span>, <span class="arithmatex">\(s[1]\leftarrow \mathit{t}=1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">2</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[1]=1+1=2>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 2\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">5</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">\(p[2]+v[0]=5+0=5>2\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 5\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">5</td>
        <td class="cella-blu">2</td>
        <td>5</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[2]\leftarrow \mathit{m}=5\)</span>, <span class="arithmatex">\(s[2]\leftarrow \mathit{t}=2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">6</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[2]=1+5=6>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 6\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+v[1]=5+1=6=\mathit{m}\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">8</td>
        <td class="cella-blu">3</td>
        <td><span class="arithmatex">\(p[3]+v[0]=8+0=8>6\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 8\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">8</td>
        <td class="cella-blu">3</td>
        <td>8</td>
        <td>3</td>
        <td><span class="arithmatex">\(v[3]\leftarrow \mathit{m}=8\)</span>, <span class="arithmatex">\(s[3]\leftarrow \mathit{t}=3\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">9</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[3]=1+8=9>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 9\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">10</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">\(p[2]+v[2]=5+5=10>9\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 10\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[3]+v[1]=8+1=9<10\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[4]+v[0]=9+0=9<10\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">10</td>
        <td class="cella-blu">2</td>
        <td>10</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[4]\leftarrow \mathit{m}=10\)</span>, <span class="arithmatex">\(s[4]\leftarrow \mathit{t}=2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">11</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[4]=1+10=11>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 11\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">13</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">\(p[2]+v[3]=5+8=13>11\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 13\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>13</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[3]+v[2]=8+5=13=\mathit{m}\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>13</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[4]+v[1]=9+1=10<13\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>13</td>
        <td>2</td>
        <td><span class="arithmatex">\(p[5]+v[0]=12+0=12<13\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">13</td>
        <td class="cella-blu">2</td>
        <td>13</td>
        <td>2</td>
        <td><span class="arithmatex">\(v[5]\leftarrow \mathit{m}=13\)</span>, <span class="arithmatex">\(s[5]\leftarrow \mathit{t}=2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\mathit{m}\leftarrow 0\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">14</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(p[1]+v[5]=1+13=14>0\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 14\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>2</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">15</td>
        <td class="cella-blu">2</td>
        <td><span class="arithmatex">\(p[2]+v[4]=5+10=15>14\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 15\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 2\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>3</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-rossa">16</td>
        <td class="cella-blu">3</td>
        <td><span class="arithmatex">\(p[3]+v[3]=8+8=16>15\)</span>: <span class="arithmatex">\(\mathit{m}\leftarrow 16\)</span>, <span class="arithmatex">\(\mathit{t}\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td></td>
        <td>4</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>16</td>
        <td>3</td>
        <td><span class="arithmatex">\(p[4]+v[2]=9+5=14<16\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>5</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>16</td>
        <td>3</td>
        <td><span class="arithmatex">\(p[5]+v[1]=12+1=13<16\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td>6</td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td>16</td>
        <td>3</td>
        <td><span class="arithmatex">\(p[6]+v[0]=14+0=14<16\)</span>: nessun aggiornamento</td>
        </tr>
        <tr>
        <td></td>
        <td><span class="arithmatex">\(-\)</span></td>
        <td class="cella-blu">16</td>
        <td class="cella-blu">3</td>
        <td>16</td>
        <td>3</td>
        <td><span class="arithmatex">\(v[6]\leftarrow \mathit{m}=16\)</span>, <span class="arithmatex">\(s[6]\leftarrow \mathit{t}=3\)</span></td>
        </tr>
        </table></div>

        Questo è il vettore $v$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{cccccccc}
        \hline  & {\ell=0} & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} & {\ell=6} \\
        \hline {v[\ell]} & 0 & 1 & 5 & 8 & 10 & 13 & 16 \\
        \hline
        \end{array}
        $$

        Questo è il vettore $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{ccccccc}
        \hline  & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} & {\ell=6} \\
        \hline {s[\ell]} & 1 & 2 & 3 & 2 & 2 & 3 \\
        \hline
        \end{array}
        $$

    2. Abbiamo il seguente vettore $s$:

        $$
        \begin{array}{l|rrrrrr}
        \hline  & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} & {\ell=6} \\
        \hline {s[\ell]} & 1 & 2 & 3 & 2 & 2 & 3 \\
        \hline
        \end{array}
        $$

        Possiamo ricostruire una soluzione ottima per una barra di lunghezza $n=6$ come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(s[j]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th><span class="arithmatex">\(x[5]\)</span></th>
        <th><span class="arithmatex">\(x[6]\)</span></th>
        <th>Aggiornamento di <span class="arithmatex">\(j\)</span></th>
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
        <td>0</td>
        <td><span class="arithmatex">\(j=6\)</span></td>
        </tr>
        <tr>
        <td>1</td>
        <td>6</td>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=6-3=3\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>3</td>
        <td>3</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j=3-3=0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (0,0,2,0,0,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        v[6]=16.
        $$

    3. Esecuzione passo per passo del secondo algoritmo di PD bottom-up

        Per ogni passo dell'algoritmo di PD, la tabella riporta i valori di $j$ e $\ell$, le celle ${v}[j][\ell]$ e ${s}[j][\ell]$ e l'operazione eseguita. Le celle si calcolano per valori crescenti di $j$ e, per ogni valore fissato di $j$, per valori crescenti di $\ell$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(\ell\)</span></th>
        <th><span class="arithmatex">\({v}[j][\ell]\)</span></th>
        <th><span class="arithmatex">\({s}[j][\ell]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][0]\leftarrow 0\)</span>, <span class="arithmatex">\({s}[0][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][1]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][2]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][3]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][4]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][5]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(-\infty\)</span></td>
        <td>0</td>
        <td><span class="arithmatex">\({v}[0][6]\leftarrow -\infty\)</span>, <span class="arithmatex">\({s}[0][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[1][0]\leftarrow {v}[0][0]=0\)</span>, <span class="arithmatex">\({s}[1][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>1</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][0]=1+0>{v}[0][1]=-\infty\)</span>: <span class="arithmatex">\({v}[1][1]\leftarrow 1\)</span>, <span class="arithmatex">\({s}[1][1]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>2</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][1]=1+1>{v}[0][2]=-\infty\)</span>: <span class="arithmatex">\({v}[1][2]\leftarrow 2\)</span>, <span class="arithmatex">\({s}[1][2]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>3</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][2]=1+2>{v}[0][3]=-\infty\)</span>: <span class="arithmatex">\({v}[1][3]\leftarrow 3\)</span>, <span class="arithmatex">\({s}[1][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>4</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][3]=1+3>{v}[0][4]=-\infty\)</span>: <span class="arithmatex">\({v}[1][4]\leftarrow 4\)</span>, <span class="arithmatex">\({s}[1][4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][4]=1+4>{v}[0][5]=-\infty\)</span>: <span class="arithmatex">\({v}[1][5]\leftarrow 5\)</span>, <span class="arithmatex">\({s}[1][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[1]+{v}[1][5]=1+5>{v}[0][6]=-\infty\)</span>: <span class="arithmatex">\({v}[1][6]\leftarrow 6\)</span>, <span class="arithmatex">\({s}[1][6]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[2][0]\leftarrow {v}[1][0]=0\)</span>, <span class="arithmatex">\({s}[2][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>1</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[2][1]\leftarrow {v}[1][1]=1\)</span>, <span class="arithmatex">\({s}[2][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>5</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][0]=5+0>{v}[1][2]=2\)</span>: <span class="arithmatex">\({v}[2][2]\leftarrow 5\)</span>, <span class="arithmatex">\({s}[2][2]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>6</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][1]=5+1>{v}[1][3]=3\)</span>: <span class="arithmatex">\({v}[2][3]\leftarrow 6\)</span>, <span class="arithmatex">\({s}[2][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>10</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][2]=5+5>{v}[1][4]=4\)</span>: <span class="arithmatex">\({v}[2][4]\leftarrow 10\)</span>, <span class="arithmatex">\({s}[2][4]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>11</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][3]=5+6>{v}[1][5]=5\)</span>: <span class="arithmatex">\({v}[2][5]\leftarrow 11\)</span>, <span class="arithmatex">\({s}[2][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>15</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[2]+{v}[2][4]=5+10>{v}[1][6]=6\)</span>: <span class="arithmatex">\({v}[2][6]\leftarrow 15\)</span>, <span class="arithmatex">\({s}[2][6]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[3][0]\leftarrow {v}[2][0]=0\)</span>, <span class="arithmatex">\({s}[3][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>1</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[3][1]\leftarrow {v}[2][1]=1\)</span>, <span class="arithmatex">\({s}[3][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[3][2]\leftarrow {v}[2][2]=5\)</span>, <span class="arithmatex">\({s}[3][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>8</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+{v}[3][0]=8+0>{v}[2][3]=6\)</span>: <span class="arithmatex">\({v}[3][3]\leftarrow 8\)</span>, <span class="arithmatex">\({s}[3][3]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[3]+{v}[3][1]=8+1\le {v}[2][4]=10\)</span>: <span class="arithmatex">\({v}[3][4]\leftarrow {v}[2][4]=10\)</span>, <span class="arithmatex">\({s}[3][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>13</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+{v}[3][2]=8+5>{v}[2][5]=11\)</span>: <span class="arithmatex">\({v}[3][5]\leftarrow 13\)</span>, <span class="arithmatex">\({s}[3][5]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>16</td>
        <td>1</td>
        <td><span class="arithmatex">\(p[3]+{v}[3][3]=8+8>{v}[2][6]=15\)</span>: <span class="arithmatex">\({v}[3][6]\leftarrow 16\)</span>, <span class="arithmatex">\({s}[3][6]\leftarrow 1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][0]\leftarrow {v}[3][0]=0\)</span>, <span class="arithmatex">\({s}[4][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>1</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][1]\leftarrow {v}[3][1]=1\)</span>, <span class="arithmatex">\({s}[4][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][2]\leftarrow {v}[3][2]=5\)</span>, <span class="arithmatex">\({s}[4][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>8</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[4][3]\leftarrow {v}[3][3]=8\)</span>, <span class="arithmatex">\({s}[4][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+{v}[4][0]=9+0\le {v}[3][4]=10\)</span>: <span class="arithmatex">\({v}[4][4]\leftarrow {v}[3][4]=10\)</span>, <span class="arithmatex">\({s}[4][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>13</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+{v}[4][1]=9+1\le {v}[3][5]=13\)</span>: <span class="arithmatex">\({v}[4][5]\leftarrow {v}[3][5]=13\)</span>, <span class="arithmatex">\({s}[4][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>16</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[4]+{v}[4][2]=9+5\le {v}[3][6]=16\)</span>: <span class="arithmatex">\({v}[4][6]\leftarrow {v}[3][6]=16\)</span>, <span class="arithmatex">\({s}[4][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][0]\leftarrow {v}[4][0]=0\)</span>, <span class="arithmatex">\({s}[5][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>1</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][1]\leftarrow {v}[4][1]=1\)</span>, <span class="arithmatex">\({s}[5][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][2]\leftarrow {v}[4][2]=5\)</span>, <span class="arithmatex">\({s}[5][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>8</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][3]\leftarrow {v}[4][3]=8\)</span>, <span class="arithmatex">\({s}[5][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[5][4]\leftarrow {v}[4][4]=10\)</span>, <span class="arithmatex">\({s}[5][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>13</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[5]+{v}[5][0]=12+0\le {v}[4][5]=13\)</span>: <span class="arithmatex">\({v}[5][5]\leftarrow {v}[4][5]=13\)</span>, <span class="arithmatex">\({s}[5][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>16</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[5]+{v}[5][1]=12+1\le {v}[4][6]=16\)</span>: <span class="arithmatex">\({v}[5][6]\leftarrow {v}[4][6]=16\)</span>, <span class="arithmatex">\({s}[5][6]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[6][0]\leftarrow {v}[5][0]=0\)</span>, <span class="arithmatex">\({s}[6][0]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>1</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[6][1]\leftarrow {v}[5][1]=1\)</span>, <span class="arithmatex">\({s}[6][1]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>5</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[6][2]\leftarrow {v}[5][2]=5\)</span>, <span class="arithmatex">\({s}[6][2]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td>8</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[6][3]\leftarrow {v}[5][3]=8\)</span>, <span class="arithmatex">\({s}[6][3]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td>10</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[6][4]\leftarrow {v}[5][4]=10\)</span>, <span class="arithmatex">\({s}[6][4]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td>13</td>
        <td>0</td>
        <td><span class="arithmatex">\(j>\ell\)</span>: <span class="arithmatex">\({v}[6][5]\leftarrow {v}[5][5]=13\)</span>, <span class="arithmatex">\({s}[6][5]\leftarrow 0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td>16</td>
        <td>0</td>
        <td><span class="arithmatex">\(p[6]+{v}[6][0]=14+0\le {v}[5][6]=16\)</span>: <span class="arithmatex">\({v}[6][6]\leftarrow {v}[5][6]=16\)</span>, <span class="arithmatex">\({s}[6][6]\leftarrow 0\)</span></td>
        </tr>
        </table></div>

        Queste sono le matrici ${v}$ e ${s}$ ottenute durante l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrr}
        \hline {{v}[j][\ell]} & {\ell=0} & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} & {\ell=6} \\
        \hline {j=0} & 0 & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {-\infty} & {-\infty} \\
        {j=1} & 0 & 1 & 2 & 3 & 4 & 5 & 6 \\
        {j=2} & 0 & 1 & 5 & 6 & 10 & 11 & 15 \\
        {j=3} & 0 & 1 & 5 & 8 & 10 & 13 & 16 \\
        {j=4} & 0 & 1 & 5 & 8 & 10 & 13 & 16 \\
        {j=5} & 0 & 1 & 5 & 8 & 10 & 13 & 16 \\
        {j=6} & 0 & 1 & 5 & 8 & 10 & 13 & 16 \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{l|rrrrrrr}
        \hline {{s}[j][\ell]} & {\ell=0} & {\ell=1} & {\ell=2} & {\ell=3} & {\ell=4} & {\ell=5} & {\ell=6} \\
        \hline {j=0} & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=1} & 0 & 1 & 1 & 1 & 1 & 1 & 1 \\
        {j=2} & 0 & 0 & 1 & 1 & 1 & 1 & 1 \\
        {j=3} & 0 & 0 & 0 & 1 & 0 & 1 & 1 \\
        {j=4} & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=5} & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        {j=6} & 0 & 0 & 0 & 0 & 0 & 0 & 0 \\
        \hline
        \end{array}
        $$

        Il valore ottimo dell'istanza dell'RCP è ${v}[6][6]=16$.

    4. Con la matrice ${s}$ possiamo ricostruire una soluzione ottima come segue:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>Iterazione</th>
        <th><span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(\ell\)</span></th>
        <th><span class="arithmatex">\({s}[j][\ell]\)</span></th>
        <th><span class="arithmatex">\(x[1]\)</span></th>
        <th><span class="arithmatex">\(x[2]\)</span></th>
        <th><span class="arithmatex">\(x[3]\)</span></th>
        <th><span class="arithmatex">\(x[4]\)</span></th>
        <th><span class="arithmatex">\(x[5]\)</span></th>
        <th><span class="arithmatex">\(x[6]\)</span></th>
        <th>Azione</th>
        </tr>
        <tr>
        <td>1</td>
        <td>6</td>
        <td>6</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 5\)</span></td>
        </tr>
        <tr>
        <td>2</td>
        <td>5</td>
        <td>6</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 4\)</span></td>
        </tr>
        <tr>
        <td>3</td>
        <td>4</td>
        <td>6</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(j\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td>4</td>
        <td>3</td>
        <td>6</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\ell\leftarrow 3\)</span></td>
        </tr>
        <tr>
        <td>5</td>
        <td>3</td>
        <td>3</td>
        <td>1</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">2</td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td><span class="arithmatex">\(\ell\leftarrow 0\)</span></td>
        </tr>
        </table></div>

        Quindi il vettore

        $$
        (0,0,2,0,0,0)
        $$

        è una soluzione ottima. Il valore ottimo è

        $$
        {v}[6][6]=16.
        $$
