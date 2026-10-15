---
title: "Commesso viaggiatore"
---

# 6.2 Il problema del commesso viaggiatore { #sez-sec-tsp-TSP }

<div class="info-capitolo" markdown>

**Parte 1 · Problemi di ottimizzazione combinatoria · Capitolo 6** · [:material-book-open-variant: Capitolo 6: Problemi di routing](index.md) · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-problemi-di-ottimizzazione-combinatoria.pdf) · [:material-presentation: Slide](../../pdf/slide-tsp.pdf) · [:material-pencil: Esercizi: Problemi di routing](../../esercizi/tsp.md)

</div>

<a id="box-1-defTSP"></a>

!!! definizione "Definizione 6.1: Problema del commesso viaggiatore"

    Dati:

    1. un insieme $\mathscr{V} = \{1,2,\dots,n\}$ di $n$ <em>città</em>,

    2. per ogni coppia di città distinte $i,j \in \mathscr{V}$, una <em>distanza</em> $d_{ij} \in \Z_{\ge 1}$, con $d_{ij}=d_{ji}$,

    il <strong>problema del commesso viaggiatore</strong> (TSP) chiede di trovare un percorso chiuso che parte da una città, visita ogni altra città esattamente una volta e ritorna alla città di partenza, in modo che la distanza totale percorsa sia minima.

- Un'<strong>istanza del TSP</strong> è specificata da:

    1. un numero intero:

        - il numero di città $n \in \Z_{\ge 3}$,

    2. una matrice simmetrica di numeri interi di dimensione $n \times n$:

        - $D=(d_{ij})$, che contiene le distanze; gli elementi diagonali non si usano.

- Una <strong>soluzione ammissibile del TSP</strong>, detta <strong>giro</strong>, è una permutazione delle città

    $$
    \sigma = (\sigma_1,\sigma_2,\dots,\sigma_n),
    $$

    letta come il percorso chiuso $\sigma_1 \to \sigma_2 \to \dots \to \sigma_n \to \sigma_1$. La sua <strong>lunghezza</strong> è

    $$
    L(\sigma) = \sum_{k=1}^{n-1} d_{\sigma_k \sigma_{k+1}} + d_{\sigma_n \sigma_1},
    $$

    dove l'ultimo termine è la distanza percorsa per ritornare alla città di partenza.

- Permutazioni diverse possono descrivere lo stesso giro: la città di partenza può essere una qualunque delle $n$ città e, poiché le distanze sono simmetriche, il giro può essere percorso in entrambi i versi.

    !!! chiave ""

        Data un'istanza del TSP, il TSP si può enunciare formalmente come:

        \begin{equation*}
        \label{TSP}
        \tilde{\sigma}
        \in
        \argmin_{\sigma}
        \left\{
        L(\sigma) = \sum_{k=1}^{n-1} d_{\sigma_k \sigma_{k+1}} + d_{\sigma_n \sigma_1}
        \;:\;
        \sigma \text{ è una permutazione di } \mathscr{V}
        \right\}. \tag{6.1}
        \end{equation*}

- Indichiamo con $z(I)$ la lunghezza di un giro ottimo $\tilde{\sigma}$ dell'istanza $I$.

## 6.2.1 Ipotesi

- Facciamo le seguenti ipotesi:

    1. Ci sono almeno tre città (con una o due città c'è un solo percorso). Formalmente:

        $$
        n \ge 3
        $$

    2. Le distanze sono simmetriche (andare da $i$ a $j$ costa quanto andare da $j$ a $i$). Formalmente:

        $$
        d_{ij}=d_{ji},~~~~ \forall i,j \in \mathscr{V},~ i\neq j
        $$

<a id="box-2-ex-tsp5"></a>

!!! esempio "Esempio 6.1: Istanza del TSP"

    Consideriamo un insieme $\mathscr{V}=\{1,2,3,4,5\}$ di $5$ città ($n=5$), con le seguenti distanze:

    $$
    \begin{array}{c|ccccc}
    \hline {d_{ij}} & {1} & {2} & {3} & {4} & {5} \\
    \hline {1} & --- & {5} & {2} & {2} & {9} \\
    {2} & {5} & --- & {4} & {3} & {4} \\
    {3} & {2} & {4} & --- & {4} & {7} \\
    {4} & {2} & {3} & {4} & --- & {7} \\
    {5} & {9} & {4} & {7} & {7} & --- \\
    \hline
    \end{array}
    $$

    L'istanza si può disegnare come un grafo completo, con un nodo per ogni città e un arco, etichettato con la distanza, per ogni coppia di città. Gli archi in grassetto formano il giro $\sigma=(1,3,5,2,4)$, e le città sono disegnate nell'ordine del giro:

    ![Figura 1](../../img/tsp/fig01.svg){ .fig loading=lazy  }

    La sua lunghezza è $L(\sigma)=d_{13}+d_{35}+d_{52}+d_{24}+d_{41}=2+7+4+3+2=18$.

## 6.3 Contare i giri

<a id="box-3-prop-tsp-count"></a>

!!! teorema "Proposizione 6.2"

    Un'istanza del TSP con $n \ge 3$ città ha

    $$
    \frac{n!}{2n} = \frac{(n-1)!}{2}
    $$

    giri distinti.

- Le permutazioni delle città sono $n!$. Ogni giro è descritto da $n$ permutazioni, una per ogni possibile città di partenza, quindi ci sono $n!/n=(n-1)!$ ordinamenti ciclici delle città.

- Le distanze sono simmetriche, quindi il giro percorso all'indietro ha la stessa lunghezza e non è una nuova soluzione: ogni giro è contato due volte, e dividiamo per $2$.

<a id="box-4-ex-tsp-enum"></a>

!!! esempio "Esempio 6.2: enumerazione dei giri"

    L'istanza dell'<span style="color:#1971c2">[Esempio 6.1](#box-2-ex-tsp5)</span> ha $\frac{(5-1)!}{2}=12$ giri distinti, che si possono enumerare:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>giro</th>
    <th><span class="arithmatex">\(L\)</span></th>
    <th>giro</th>
    <th><span class="arithmatex">\(L\)</span></th>
    <th>giro</th>
    <th><span class="arithmatex">\(L\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\((1,3,5,2,4)\)</span></td>
    <td><span class="arithmatex">\(18\)</span></td>
    <td><span class="arithmatex">\((1,3,4,2,5)\)</span></td>
    <td><span class="arithmatex">\(22\)</span></td>
    <td><span class="arithmatex">\((1,2,3,5,4)\)</span></td>
    <td><span class="arithmatex">\(25\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((1,3,2,5,4)\)</span></td>
    <td><span class="arithmatex">\(19\)</span></td>
    <td><span class="arithmatex">\((1,4,3,2,5)\)</span></td>
    <td><span class="arithmatex">\(23\)</span></td>
    <td><span class="arithmatex">\((1,3,2,4,5)\)</span></td>
    <td><span class="arithmatex">\(25\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((1,2,5,3,4)\)</span></td>
    <td><span class="arithmatex">\(22\)</span></td>
    <td><span class="arithmatex">\((1,2,4,5,3)\)</span></td>
    <td><span class="arithmatex">\(24\)</span></td>
    <td><span class="arithmatex">\((1,4,2,3,5)\)</span></td>
    <td><span class="arithmatex">\(25\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\((1,2,5,4,3)\)</span></td>
    <td><span class="arithmatex">\(22\)</span></td>
    <td></td>
    <td></td>
    <td><span class="arithmatex">\((1,2,4,3,5)\)</span></td>
    <td><span class="arithmatex">\(28\)</span></td>
    </tr>
    <tr>
    <td></td>
    <td></td>
    <td></td>
    <td></td>
    <td><span class="arithmatex">\((1,2,3,4,5)\)</span></td>
    <td><span class="arithmatex">\(29\)</span></td>
    </tr>
    </table></div>

    Quindi il giro $\sigma=(1,3,5,2,4)$ è l'unico giro ottimo, e $z(I)=18$.

- Il numero di giri cresce più velocemente di qualunque funzione esponenziale:

    $$
    \begin{array}{rrrrr}
    \hline {n} & {5} & {10} & {15} & {20} \\
    \hline {\frac{(n-1)!}{2}} & {12} & {181\,440} & {\approx 4.4\cdot 10^{10}} & {\approx 6.1\cdot 10^{16}} \\
    \hline
    \end{array}
    $$

- Un calcolatore che valuta $10^9$ giri al secondo impiega circa $6.1\cdot 10^{7}$ secondi, ossia circa due anni, per elencare i giri di $20$ città. L'enumerazione è quindi utile solo come verifica su istanze piccolissime, e gli algoritmi di questo corso devono fare di meglio.

## 6.4 Un primo giro a mano

- Il modo più semplice per costruire un giro è la <strong>nearest neighbour rule</strong>: si parte da una città e, finché ci sono città non visitate, ci si sposta nella città non visitata più vicina; alla fine si ritorna alla città di partenza. In caso di pareggio prendiamo la città di indice minimo.

<a id="box-5-ex-tsp-nn"></a>

!!! esempio "Esempio 6.3: nearest neighbour dalla città $1$"

    Sull'istanza dell'<span style="color:#1971c2">[Esempio 6.1](#box-2-ex-tsp5)</span>, partendo dalla città $1$:

    1. da $1$ le città più vicine sono $3$ e $4$, entrambe a distanza $2$: andiamo in $3$;

    2. da $3$ le città non visitate $2$ e $4$ sono entrambe a distanza $4$: andiamo in $2$;

    3. da $2$ la città non visitata più vicina è $4$, a distanza $3$; poi resta solo $5$, a distanza $d_{45}=7$;

    4. ritorniamo da $5$ a $1$ a distanza $d_{51}=9$.

    Il giro è $\sigma=(1,3,2,4,5)$, di lunghezza $2+4+3+7+9=25$.

- Gli ultimi archi del giro nearest neighbour sono forzati, e possono essere molto lunghi: qui l'arco finale $\{5,1\}$ costa $9$. Il giro di lunghezza $25$ è peggiore di quello ottimo, di lunghezza $18$, di $7$.

- Dal solo giro nearest neighbour non possiamo dire quanto siamo lontani dall'ottimo: serve un lower bound.

## 6.5 Un lower bound combinatorio

- Per una città $i$, siano $a_i \le b_i$ le due distanze più piccole da $i$ alle altre città.

<a id="box-6-obs-tsp-lb"></a>

!!! teorema "Osservazione 6.3"

    Per ogni istanza simmetrica del TSP, la lunghezza ottima soddisfa

    $$
    z(I) \;\ge\; \left\lceil \frac{1}{2} \sum_{i \in \mathscr{V}} (a_i + b_i) \right\rceil .
    $$

- In un giro, in ogni città si entra con un arco e se ne esce con un altro, quindi ogni città ha esattamente due archi del giro, lunghi almeno $a_i$ e $b_i$ rispettivamente.

- Sommando su tutte le città, ogni arco del giro è contato due volte, una per ciascuna delle sue città estreme: quindi $2L(\sigma) \ge \sum_i (a_i + b_i)$ per ogni giro $\sigma$.

- Le distanze sono intere, quindi lo è anche $L(\sigma)$, e possiamo arrotondare il bound per eccesso.

<a id="box-7-ex-tsp-lb"></a>

!!! esempio "Esempio 6.4: il bound sull'istanza di riferimento"

    Per l'istanza dell'<span style="color:#1971c2">[Esempio 6.1](#box-2-ex-tsp5)</span> le due distanze più piccole di ogni città sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>città <span class="arithmatex">\(i\)</span></th>
    <th><span class="arithmatex">\(1\)</span></th>
    <th><span class="arithmatex">\(2\)</span></th>
    <th><span class="arithmatex">\(3\)</span></th>
    <th><span class="arithmatex">\(4\)</span></th>
    <th><span class="arithmatex">\(5\)</span></th>
    <th>somma</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(a_i\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(b_i\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(a_i+b_i\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(33\)</span></td>
    </tr>
    </table></div>

    Quindi $z(I) \ge \lceil 33/2 \rceil = 17$. Insieme al giro nearest neighbour otteniamo

    $$
    17 \le z(I) \le 25,
    $$

    un gap assoluto di $8$, ossia un gap relativo di $\frac{8}{17} \approx 47.1\%$. Il giro $(1,3,5,2,4)$ di lunghezza $18$ ne chiude la maggior parte, e solo l'enumerazione dei $12$ giri dimostra che $18$ è ottimo.

---

**Avanti:** [6.6 Varianti: TSP metrico e TSP asimmetrico](varianti-tsp-metrico-e-tsp-asimmetrico.md)
