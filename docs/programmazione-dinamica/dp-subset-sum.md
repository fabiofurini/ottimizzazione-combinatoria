---
title: "PD per il problema del subset sum"
---

# PD per il problema del subset sum

<div class="info-capitolo" markdown>

**Parte 3 · Programmazione dinamica · Capitolo 20** · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../pdf/dispensa-3-programmazione-dinamica.pdf) · [:material-presentation: Slide](../pdf/slide-dp-subset-sum.pdf) · [:material-pencil: Esercizi: Subset sum (SSP)](../esercizi/dp-subset-sum.md) · [:material-gesture-tap: App: Tabelle della PD per i problemi di zaino](../laboratorio/tabella-pd-zaino.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, il capitolo [«PD per il problema dello zaino 0/1»](dp-knapsack/index.md): la ricorrenza $v(j,k)$ del problema dello zaino 0/1 (KP) su oggetti e capacità, la matrice $s$ delle decisioni e la ricostruzione di una soluzione.

    - Da questo modulo, il capitolo [«Problemi di zaino»](../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-del-subset-sum.md): il problema del subset sum e la sua soluzione come problema dello zaino 0/1 con $p_j=w_j$.

    - Dal modulo <em>Algoritmi</em>: [le convenzioni dello pseudocodice (Capitolo 2)](https://fabiofurini.github.io/algoritmi/algoritmi-di-base/02-pseudocodice/) e [la dimensione dell'input (Capitolo 11)](https://fabiofurini.github.io/algoritmi/analisi/11-dimensione-input/).

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - scrivere la ricorrenza $r(j,k)\in\{\textit{true},\textit{false}\}$ delle somme raggiungibili, con i suoi casi base;

    - eseguire a mano l'algoritmo di PD e leggere la risposta dell'istanza dell'SSP in $r(n,c)$;

    - riempire la matrice $s$ e ricostruire un sottoinsieme di peso totale $c$ quando la risposta è sì;

    - mettere in relazione $r(j,k)$ con l'algoritmo di PD del KP con $p_j=w_j$, e contare i $\Theta(nc)$ passi.

Il problema di questo capitolo è il [problema del subset sum (SSP)](../catalogo/subset-sum-problem.md): la sua definizione e le sue ipotesi sono nella sua pagina.

## 20.1 Un algoritmo di PD

<a id="box-1-texsspex1"></a>

!!! esempio "Esempio 20.1: Istanza dell'SSP"

    Consideriamo un valore obiettivo $c=10$ e un insieme $\mathscr{I}=\{1,2,3,4\}$ di $4$ oggetti ($n=4$), con i seguenti pesi:

    $$
    \begin{array}{l|rrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\
    \hline {w_j} & 3 & 5 & 4 & 7 \\
    \hline
    \end{array}
    $$

    Chiamiamo questa istanza dell'SSP <span style="color:#1971c2">[Esempio 20.1](#box-1-texsspex1)</span>.

- Un sottoinsieme $S\subseteq\mathscr{I}$ si descrive con il vettore binario $(x_1,x_2,\dots,x_n)$, dove $x_j=1$ se l'oggetto $j$ appartiene a $S$ e $x_j=0$ altrimenti.

- La risposta all'istanza dell'SSP è <strong>sì</strong> se qualche vettore soddisfa $\sum_{j=1}^{n} w_j x_j = c$, e <strong>no</strong> altrimenti.

- <u>Passo 1</u>: calcolo della risposta

    !!! formula ""

        Per ogni $j \in \{0,1,\dots,n\}$ e $k \in \{0,1,\dots,c\}$, sia $r(j,k)\in\{\textit{true},\textit{false}\}$ la risposta della sottoistanza dell'SSP data da:

        1. un valore obiettivo $k$,

        2. un insieme $\{1,2,\dots,j\}$ di oggetti disponibili,

        3. per ogni oggetto $h \in \{1,2,\dots,j\}$, un peso $w_h$.

        La formula ricorsiva per calcolare $r(j,k)$ è la seguente:

        \begin{equation*}
        \label{eq:ssp}
        r(j,k)= \left\{ \begin{array}{ll}
        \textit{true}  & \textrm{se $k=0$,}\\[2ex]
        \textit{false} & \textrm{se $j=0$ e $k\ge 1$,}\\[2ex]
        r(j-1,k) & \textrm{se $j,k\ge 1$ e $w_j>k$,}\\[2ex]
        r(j-1,k) \,\lor\, r(j-1,k-w_j) & \textrm{se $j,k\ge 1$ e $w_j\le k$.}
        \end{array} \right. \tag{20.1}
        \end{equation*}

    - Il simbolo $\lor$ è l'<strong>or</strong> logico: $r(j,k)$ è <em>true</em> se almeno uno dei due valori è <em>true</em>.

    - I casi base sono $r(j,0)=\textit{true}$, perché il sottoinsieme vuoto ha peso totale $0$, e $r(0,k)=\textit{false}$ per $k\ge 1$, perché nessun oggetto è disponibile.

    - Un sottoinsieme di $\{1,2,\dots,j\}$ con peso totale $k$ o non contiene l'oggetto $j$, e allora è un sottoinsieme di $\{1,2,\dots,j-1\}$ con peso totale $k$, oppure contiene l'oggetto $j$, e allora gli altri oggetti formano un sottoinsieme di $\{1,2,\dots,j-1\}$ con peso totale $k-w_j$.

    - Quindi la formula $\eqref{eq:ssp}$ genera al più $2$ <strong>sottoproblemi indipendenti</strong>, e un sottoinsieme per $(j,k)$ si costruisce da un sottoinsieme di uno di essi aggiungendo o no l'oggetto $j$.

        $\rightsquigarrow$ <strong>Sottostruttura ottima verificata!</strong>

    - Decisioni diverse sugli oggetti possono portare alla stessa coppia $(j,k)$, e quindi lo stesso valore $r(j,k)$ può servire più volte durante la valutazione ricorsiva della formula $\eqref{eq:ssp}$.

        $\rightsquigarrow$ <strong>Sottoproblemi sovrapposti verificati!</strong>

    - Il valore $r(j,k)$ dipende solo dai valori $r(j-1,k')$ con $k'\le k$. Quindi l'<strong>approccio bottom-up</strong> calcola le righe $j=0,1,\dots,n$ in quest'ordine, ciascuna per $k$ crescente, e memorizza ogni valore in una <strong>tabella di lookup</strong>.

    - L'SSP si può risolvere anche con l'algoritmo di PD del KP, con $p_j=w_j$ per ogni oggetto $j$. Il suo valore $v(j,k)$ è il massimo peso totale, non superiore a $k$, di un sottoinsieme di $\{1,2,\dots,j\}$, e

        $$
        r(j,k)=\textit{true} \iff v(j,k)=k.
        $$

    - La ricorrenza $\eqref{eq:ssp}$ memorizza un solo bit per cella, e le sue operazioni logiche sostituiscono le somme e i confronti della ricorrenza del KP.

- <u>Passo 2</u>: calcolo di un sottoinsieme

    - Quando la risposta è sì, un sottoinsieme di peso totale $c$ si ricostruisce dalla matrice $s$: $s[j][k]=1$ se l'oggetto $j$ è usato per raggiungere il valore <em>true</em> di $r[j][k]$, e $s[j][k]=0$ altrimenti.

    - L'algoritmo di PD preferisce non usare l'oggetto $j$: $s[j][k]=1$ solo se $r[j-1][k]$ è <em>false</em> e $r[j-1][k-w_j]$ è <em>true</em>.

    Questo è lo pseudocodice dell'<strong>algoritmo di PD con l'approccio bottom-up</strong>, che memorizza la matrice $s$ insieme alla matrice $r$:

    !!! algoritmo "Algoritmo: SSP\_DP"

        <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> Un'istanza dell'SSP data da <span class="arithmatex">\(n\)</span>, dal vettore <span class="arithmatex">\(w[1..n]\)</span> e dal valore obiettivo <span class="arithmatex">\(c\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> La risposta <span class="arithmatex">\(r[n][c]\)</span> dell'istanza dell'SSP e la matrice <span class="arithmatex">\(s[0..n][0..c]\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> SSP_DP(<span class="arithmatex">\(n,w,c\)</span>)</div><div class="pc" style="--liv:1" id="box-2-sspbu-a"><span class="pc-n">2</span><span class="arithmatex">\(r := \textnormal{new array}[0..n][0..c]\)</span>; <span class="arithmatex">\(s := \textnormal{new array}[0..n][0..c]\)</span></div><div class="pc" style="--liv:1" id="box-3-sspbu-b"><span class="pc-n">3</span><span class="arithmatex">\(r[0][0] \leftarrow \textit{true}\)</span>; <span class="arithmatex">\(s[0][0] \leftarrow 0\)</span></div><div class="pc" style="--liv:1" id="box-4-sspbu-c"><span class="pc-n">4</span><strong>for</strong> <span class="arithmatex">\(k := 1\)</span> <strong>to</strong> <span class="arithmatex">\(c\)</span>  <strong>do</strong></div><div class="pc" style="--liv:2" id="box-5-sspbu-d"><span class="pc-n">5</span><span class="arithmatex">\(r[0][k] \leftarrow \textit{false}\)</span>; <span class="arithmatex">\(s[0][k] \leftarrow 0\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">6</span><strong>end</strong></div><div class="pc" style="--liv:1" id="box-6-sspbu-e"><span class="pc-n">7</span><strong>for</strong> <span class="arithmatex">\(j := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span>  <strong>do</strong></div><div class="pc" style="--liv:2" id="box-7-sspbu-f"><span class="pc-n">8</span><strong>for</strong> <span class="arithmatex">\(k := 0\)</span> <strong>to</strong> <span class="arithmatex">\(c\)</span>  <strong>do</strong></div><div class="pc" style="--liv:3" id="box-8-sspbu-g"><span class="pc-n">9</span><span class="arithmatex">\(r[j][k] \leftarrow r[j-1][k]\)</span>; <span class="arithmatex">\(s[j][k] \leftarrow 0\)</span></div><div class="pc" style="--liv:3" id="box-9-sspbu-h"><span class="pc-n">10</span><strong>if</strong> <span class="arithmatex">\(r[j][k]=\textit{false}\)</span> e <span class="arithmatex">\(w[j]\le k\)</span> e <span class="arithmatex">\(r[j-1][k-w[j]]=\textit{true}\)</span>  <strong>then</strong></div><div class="pc" style="--liv:4" id="box-10-sspbu-i"><span class="pc-n">11</span><span class="arithmatex">\(r[j][k] \leftarrow \textit{true}\)</span>; <span class="arithmatex">\(s[j][k] \leftarrow 1\)</span></div><div class="pc" style="--liv:3"><span class="pc-n">12</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">13</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">14</span><strong>end</strong></div><div class="pc" style="--liv:1" id="box-11-sspbu-j"><span class="pc-n">15</span><strong>return</strong> <span class="arithmatex">\(r[n][c], s\)</span></div></div>

    - La matrice $r[0..n][0..c]$ è la <strong>tabella di lookup</strong> delle risposte, e la matrice $s[0..n][0..c]$ memorizza le decisioni.

    - Le prime due righe riempiono la riga $j=0$: senza oggetti è raggiungibile solo il valore obiettivo $0$.

    - Per ogni coppia $(j,k)$, l'algoritmo di PD copia prima la risposta senza l'oggetto $j$, e poi usa l'oggetto $j$ solo se questa risposta è <em>false</em> e l'oggetto $j$ rende raggiungibile il valore $k$.

    - Infine, la risposta dell'istanza dell'SSP viene restituita come $r[n][c]$, insieme alla matrice $s$.

    <a id="box-12-texsspbu"></a>

    !!! esempio "Esempio 20.2: Esecuzione dell'algoritmo di PD"

        Consideriamo l'istanza dell'SSP dell'<span style="color:#1971c2">[Esempio 20.1](#box-1-texsspex1)</span>, con valore obiettivo $c=10$ e pesi $w=(3,5,4,7)$.

        Per ogni passo dell'algoritmo di PD con $j\ge 1$, la tabella riporta i valori di $j$ e $k$, le celle $r[j][k]$ e $s[j][k]$ e l'operazione eseguita; $\mathrm{T}$ sta per <em>true</em> e $\mathrm{F}$ per <em>false</em>. La riga $j=0$ è $r[0][0]=\mathrm{T}$ e $r[0][k]=\mathrm{F}$ per $k\ge 1$, con $s[0][k]=0$.

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
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[0][10]\lor r[0][7]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
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
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=5>2\)</span>: <span class="arithmatex">\(r[1][2]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_2=5>3\)</span>: <span class="arithmatex">\(r[1][3]=\mathrm{T}\)</span></td>
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
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[1][7]\lor r[1][2]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[1][8]\lor r[1][3]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[1][9]\lor r[1][4]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[1][10]\lor r[1][5]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
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
        <td><span class="arithmatex">\(w_3=4>0\)</span>: <span class="arithmatex">\(r[2][0]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=4>1\)</span>: <span class="arithmatex">\(r[2][1]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=4>2\)</span>: <span class="arithmatex">\(r[2][2]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_3=4>3\)</span>: <span class="arithmatex">\(r[2][3]=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[2][4]\lor r[2][0]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[2][5]\lor r[2][1]=\mathrm{T}\lor \mathrm{F}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[2][6]\lor r[2][2]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[2][7]\lor r[2][3]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[2][8]\lor r[2][4]=\mathrm{T}\lor \mathrm{F}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[2][9]\lor r[2][5]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[2][10]\lor r[2][6]=\mathrm{F}\lor \mathrm{F}=\mathrm{F}\)</span></td>
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
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_4=7>2\)</span>: <span class="arithmatex">\(r[3][2]=\mathrm{F}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_4=7>3\)</span>: <span class="arithmatex">\(r[3][3]=\mathrm{T}\)</span></td>
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
        <td><span class="arithmatex">\(\mathrm{F}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(w_4=7>6\)</span>: <span class="arithmatex">\(r[3][6]=\mathrm{F}\)</span></td>
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
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(r[3][9]\lor r[3][2]=\mathrm{T}\lor \mathrm{F}=\mathrm{T}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(\mathrm{T}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(r[3][10]\lor r[3][3]=\mathrm{F}\lor \mathrm{T}=\mathrm{T}\)</span></td>
        </tr>
        </table></div>

        Questa è la matrice $r$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrrr}
        \hline {r[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} & {k=10} \\
        \hline {j=0} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} \\
        {j=1} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{F}} \\
        {j=2} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} \\
        {j=3} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{F}} \\
        {j=4} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{F}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{T}} & {\mathrm{T}} \\
        \hline
        \end{array}
        $$

        Questa è la matrice $s$ dopo l'esecuzione dell'algoritmo di PD:

        $$
        \begin{array}{l|rrrrrrrrrrr}
        \hline {s[j][k]} & {k=0} & {k=1} & {k=2} & {k=3} & {k=4} & {k=5} & {k=6} & {k=7} & {k=8} & {k=9} & {k=10} \\
        \hline {j=0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {j=1} & {0} & {0} & {0} & {1} & {0} & {0} & {0} & {0} & {0} & {0} & {0} \\
        {j=2} & {0} & {0} & {0} & {0} & {0} & {1} & {0} & {0} & {1} & {0} & {0} \\
        {j=3} & {0} & {0} & {0} & {0} & {1} & {0} & {0} & {1} & {0} & {1} & {0} \\
        {j=4} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {0} & {1} \\
        \hline
        \end{array}
        $$

        Poiché $r[4][10]=\mathrm{T}$, la risposta all'istanza dell'SSP è <strong>sì</strong>. Per esempio, $s[4][10]=1$ perché $r[3][10]=\mathrm{F}$ e $r[3][3]=\mathrm{T}$: l'oggetto $4$ serve per raggiungere il valore obiettivo $10$.

    - Calcolata la matrice $s$, se $r[n][c]$ è <em>true</em> si ricostruisce un sottoinsieme di peso totale $c$ scorrendo gli oggetti da $j=n$ fino a $j=1$, partendo da $k=c$ e da $x_j=0$ per ogni oggetto $j$:

        $$
        x_j \leftarrow s[j][k], \qquad k \leftarrow k - s[j][k]\,w_j.
        $$

    - La ricostruzione termina con $k=0$, perché ogni passo mantiene $r[j-1][k]$ uguale a <em>true</em>.

    !!! algoritmo "Algoritmo: SSP\_Reconstruct"

        <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> Il numero <span class="arithmatex">\(n\)</span> di oggetti, il valore obiettivo <span class="arithmatex">\(c\)</span>, il vettore <span class="arithmatex">\(w[1..n]\)</span> e la matrice <span class="arithmatex">\(s[0..n][0..c]\)</span>, con <span class="arithmatex">\(r[n][c]=\textit{true}\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> Un sottoinsieme di peso totale <span class="arithmatex">\(c\)</span>, come vettore binario</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> SSP_Reconstruct(<span class="arithmatex">\(n,c,w,s\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(x := \textnormal{new array}[1..n]\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><span class="arithmatex">\(k := c\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">4</span><strong>for</strong> <span class="arithmatex">\(j := n\)</span> <strong>to</strong> <span class="arithmatex">\(1\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><span class="arithmatex">\(x[j] \leftarrow s[j][k]\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">6</span><span class="arithmatex">\(k \leftarrow k-x[j]\,w[j]\)</span></div><div class="pc" style="--liv:1"><span class="pc-n">7</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">8</span><strong>return</strong> <span class="arithmatex">\(x\)</span></div></div>

    <a id="box-13-texsspsol"></a>

    !!! esempio "Esempio 20.3: Calcolo di un sottoinsieme"

        Dopo l'esecuzione dell'algoritmo di PD sull'istanza dell'<span style="color:#1971c2">[Esempio 20.1](#box-1-texsspex1)</span>, partiamo da $j=4$ e $k=10$:

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
        <td><span class="arithmatex">\(k=10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>0</td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">1</td>
        <td><span class="arithmatex">\(x[4]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 10-7=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[3]\leftarrow 0\)</span>, <span class="arithmatex">\(k=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td>0</td>
        <td class="cella-blu">0</td>
        <td>0</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[2]\leftarrow 0\)</span>, <span class="arithmatex">\(k=3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td class="cella-blu">1</td>
        <td>0</td>
        <td>0</td>
        <td>1</td>
        <td><span class="arithmatex">\(x[1]\leftarrow 1\)</span>, <span class="arithmatex">\(k\leftarrow 3-3=0\)</span></td>
        </tr>
        </table></div>

        !!! chiave ""

            La risposta all'istanza dell'SSP dell'<span style="color:#1971c2">[Esempio 20.1](#box-1-texsspex1)</span> è <strong>sì</strong>: il vettore $(1,0,0,1)$ seleziona il sottoinsieme $\{1,4\}$, il cui peso totale è $3+7=c$.

### 20.1.1 Numero di passi

- Indichiamo con $S(n,c)$ il numero di passi eseguiti da <code>SSP\_DP</code> nel caso peggiore. Contiamo quante volte viene eseguita ogni riga dello pseudocodice, supponendo che la condizione alla riga [10](#box-9-sspbu-h) sia sempre vera:

    - Le <span style="color:#e03131">righe</span> [2](#box-2-sspbu-a) e [3](#box-3-sspbu-b) vengono eseguite $1$ volta ciascuna.

    - La <span style="color:#e03131">riga</span> [4](#box-4-sspbu-c) viene eseguita $c$ volte, e la <span style="color:#e03131">riga</span> [5](#box-5-sspbu-d) $c$ volte.

    - La <span style="color:#e03131">riga</span> [7](#box-6-sspbu-e) viene eseguita $n$ volte.

    - Le <span style="color:#e03131">righe</span> [8](#box-7-sspbu-f), [9](#box-8-sspbu-g), [10](#box-9-sspbu-h) e [11](#box-10-sspbu-i) vengono eseguite $n(c+1)$ volte ciascuna.

    - La <span style="color:#e03131">riga</span> [15](#box-11-sspbu-j) viene eseguita $1$ volta.

- Quindi il numero totale di passi nel caso peggiore è

    $$
    S(n,c)=1+1+2c+n+4n(c+1)+1=4n(c+1)+n+2c+3.
    $$

    Di conseguenza,

    $$
    S(n,c)=\Theta(nc),
    $$

    poiché

    $$
    \lim_{n,c\to\infty}\frac{4n(c+1)+n+2c+3}{nc}
    =\lim_{n,c\to\infty}\left(4+\frac{4}{c}+\frac{1}{c}+\frac{2}{n}+\frac{3}{nc}\right)=4\in\mathbb{R}_{>0}.
    $$

    !!! chiave ""

        L'algoritmo di PD per l'SSP esegue $S(n,c)=\Theta(nc)$ passi nel caso peggiore, lo stesso numero dell'algoritmo di PD del KP.

- La ricostruzione esegue $\Theta(n)$ passi, uno per ogni oggetto.

- Il numero di passi contiene il valore obiettivo $c$, un numero dell'input, e non solo la dimensione dell'input: è <strong>pseudo-polinomiale</strong>.

## 20.2 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Porre $r(j,0)=\textit{false}$.</strong> Il valore obiettivo $0$ è sempre raggiungibile con il sottoinsieme vuoto; con $r(j,0)=\textit{false}$ nessun valore diventerebbe mai <em>true</em>.

    - <strong>Porre $r(0,k)=\textit{true}$ per $k\ge 1$.</strong> Senza oggetti è raggiungibile solo il valore obiettivo $0$.

    - <strong>Leggere la risposta nella cella sbagliata.</strong> La risposta è $r(n,c)$; un valore <em>true</em> in un'altra cella dell'ultima riga dice che è raggiungibile un valore obiettivo diverso.

    - <strong>Ricostruire quando la risposta è no.</strong> Se $r(n,c)$ è <em>false</em>, nessun sottoinsieme ha peso totale $c$, e la matrice $s$ non dà nulla da ricostruire.

## 20.3 In sintesi

!!! chiave "In sintesi"

    - La ricorrenza $r(j,k)=r(j-1,k)\lor r(j-1,k-w_j)$ dice se il valore obiettivo $k$ è raggiungibile con gli oggetti $1,2,\dots,j$.

    - I casi base sono $r(j,0)=\textit{true}$ e $r(0,k)=\textit{false}$ per $k\ge 1$; la risposta è $r(n,c)$.

    - La matrice $s$ memorizza se l'oggetto $j$ è usato, e un sottoinsieme di peso totale $c$ si legge all'indietro a partire da $(n,c)$.

    - L'algoritmo di PD esegue $\Theta(nc)$ passi, come l'algoritmo di PD del KP con $p_j=w_j$.

    <strong>Quadro riassuntivo dell'esempio dell'SSP.</strong> [Esempio 20.1](#box-1-texsspex1) ($c=10$, quattro oggetti):

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Metodo</th>
    <th>Risposta</th>
    <th>Origine</th>
    </tr>
    <tr>
    <td>Algoritmo di PD</td>
    <td>sì</td>
    <td><span class="arithmatex">\(r(4,10)=\textit{true}\)</span>, sottoinsieme <span class="arithmatex">\(\{1,4\}\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Subset sum (SSP)](../esercizi/dp-subset-sum.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Tabelle della PD per i problemi di zaino](../laboratorio/tabella-pd-zaino.md#voce=ssp).