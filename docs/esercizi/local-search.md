---
title: "Esercizi · Ricerca locale"
---

# Esercizi · Ricerca locale

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 31** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 31: Ricerca locale](../algoritmi-euristici/local-search/index.md) · [:material-file-pdf-box: Eserciziario, volume 4 (PDF)](../pdf/esercizi-4-algoritmi-euristici.pdf)

</div>

## Zaino

<a id="esercizio-31-1"></a>

!!! esercizio "Esercizio 31.1: Ricerca locale KP 1"

    Consideriamo uno zaino di capacità $c = 18$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n=5$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\[1ex]
    \hline {p_j} & {10} & {7} & {13} & {14} & {8} \\[1ex]
    {w_j} & {2} & {3} & {8} & {9} & {7} \\
    \hline
    \end{array}
    $$

    Gli oggetti sono ordinati per efficienza non crescente. L'intorno flip+swap contiene i vettori ammissibili ottenuti con un flip (aggiungere o togliere un oggetto) o con uno swap (togliere un oggetto selezionato $j$, aggiungere un oggetto non selezionato $k$); si esaminano prima i flip, per $j=1,\dots,n$, poi gli swap, per $j$ crescente e, per ogni $j$, per $k$ crescente. In best improvement i pareggi si risolvono a favore della mossa esaminata per prima.

    **Domande**

    1. Calcolare la soluzione dell'algoritmo greedy $GR$ (per efficienza) e il suo profitto.

    2. Applicare la ricerca locale con l'intorno flip+swap e la regola best improvement, partendo dalla soluzione di $GR$. A ogni iterazione elencare i vicini, con il loro peso e il loro profitto, e indicare la mossa accettata.

    3. Calcolare la soluzione del greedy per profitto $GR_p$, e applicare la stessa ricerca locale partendo da essa.

    4. Il valore ottimo è $z(I)=32$. Quale delle due ricerche locali trova una soluzione ottima? Spiegare perché l'altra si ferma, esaminando le mosse necessarie per raggiungere la soluzione ottima.

??? soluzione "Soluzione"

    1. Le efficienze sono $\frac{10}{2}$, $\frac{7}{3}$, $\frac{13}{8}$, $\frac{14}{9}$, $\frac{8}{7}$, non crescenti. Con $rc=18$:

        - l'oggetto $1$ ($w_{1}=2$) è selezionato, $rc=16$;

        - l'oggetto $2$ ($w_{2}=3$) è selezionato, $rc=13$;

        - l'oggetto $3$ ($w_{3}=8$) è selezionato, $rc=5$;

        - l'oggetto $4$ ($w_{4}=9>rc=5$) non è selezionato;

        - l'oggetto $5$ ($w_{5}=7>rc=5$) non è selezionato;

        $GR$ restituisce $x=(1,1,1,0,0)$, gli oggetti $\{1,2,3\}$, di peso $13$ e profitto $GR(I)=30$.

    2. Iterazione 1: soluzione corrente $x=(1,1,1,0,0)$, peso $13$, profitto $30$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>vicino</th>
        <th>peso</th>
        <th>profitto</th>
        <th></th>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,1,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((1,0,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((1,1,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((1,1,1,1,0)\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((1,1,1,0,1)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span> fuori, <span class="arithmatex">\(4\)</span> dentro</td>
        <td><span class="arithmatex">\((0,1,1,1,0)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span> fuori, <span class="arithmatex">\(5\)</span> dentro</td>
        <td><span class="arithmatex">\((0,1,1,0,1)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span> fuori, <span class="arithmatex">\(4\)</span> dentro</td>
        <td><span class="arithmatex">\((1,0,1,1,0)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span> fuori, <span class="arithmatex">\(5\)</span> dentro</td>
        <td><span class="arithmatex">\((1,0,1,0,1)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span> accettata</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span> fuori, <span class="arithmatex">\(4\)</span> dentro</td>
        <td><span class="arithmatex">\((1,1,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span> fuori, <span class="arithmatex">\(5\)</span> dentro</td>
        <td><span class="arithmatex">\((1,1,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td></td>
        </tr>
        </table></div>

        La mossa è accettata dopo aver esaminato 7 vicini ammissibili.

        Iterazione 2: soluzione corrente $x=(1,0,1,0,1)$, peso $17$, profitto $31$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>vicino</th>
        <th>peso</th>
        <th>profitto</th>
        <th></th>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,0,1,0,1)\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((1,1,1,0,1)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((1,0,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((1,0,1,1,1)\)</span></td>
        <td><span class="arithmatex">\(26\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((1,0,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span> fuori, <span class="arithmatex">\(2\)</span> dentro</td>
        <td><span class="arithmatex">\((0,1,1,0,1)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span> fuori, <span class="arithmatex">\(4\)</span> dentro</td>
        <td><span class="arithmatex">\((0,0,1,1,1)\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span> fuori, <span class="arithmatex">\(2\)</span> dentro</td>
        <td><span class="arithmatex">\((1,1,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span> fuori, <span class="arithmatex">\(4\)</span> dentro</td>
        <td><span class="arithmatex">\((1,0,0,1,1)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(32\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span> accettata</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span> fuori, <span class="arithmatex">\(2\)</span> dentro</td>
        <td><span class="arithmatex">\((1,1,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(30\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span> fuori, <span class="arithmatex">\(4\)</span> dentro</td>
        <td><span class="arithmatex">\((1,0,1,1,0)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        </table></div>

        La mossa è accettata dopo aver esaminato 7 vicini ammissibili.

        Iterazione 3: soluzione corrente $x=(1,0,0,1,1)$, peso $18$, profitto $32$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>vicino</th>
        <th>peso</th>
        <th>profitto</th>
        <th></th>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,0,0,1,1)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((1,1,0,1,1)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((1,0,1,1,1)\)</span></td>
        <td><span class="arithmatex">\(26\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((1,0,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((1,0,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span> fuori, <span class="arithmatex">\(2\)</span> dentro</td>
        <td><span class="arithmatex">\((0,1,0,1,1)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span> fuori, <span class="arithmatex">\(3\)</span> dentro</td>
        <td><span class="arithmatex">\((0,0,1,1,1)\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span> fuori, <span class="arithmatex">\(2\)</span> dentro</td>
        <td><span class="arithmatex">\((1,1,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span> fuori, <span class="arithmatex">\(3\)</span> dentro</td>
        <td><span class="arithmatex">\((1,0,1,0,1)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span> fuori, <span class="arithmatex">\(2\)</span> dentro</td>
        <td><span class="arithmatex">\((1,1,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span> fuori, <span class="arithmatex">\(3\)</span> dentro</td>
        <td><span class="arithmatex">\((1,0,1,1,0)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        </table></div>

        Nessun vicino ammissibile ha un profitto maggiore: $x=(1,0,0,1,1)$ è un <strong>ottimo locale</strong>, di profitto $32$ (6 vicini ammissibili esaminati).

        La ricerca locale esegue 2 mosse, $30\to31\to32$, e si ferma in $x=(1,0,0,1,1)$, di profitto $32$.

    3. Gli oggetti in ordine di profitto non crescente sono $(4,3,1,5,2)$. Con $rc=18$:

        - l'oggetto $4$ ($w_{4}=9$) è selezionato, $rc=9$;

        - l'oggetto $3$ ($w_{3}=8$) è selezionato, $rc=1$;

        - l'oggetto $1$ ($w_{1}=2>rc=1$) non è selezionato;

        - l'oggetto $5$ ($w_{5}=7>rc=1$) non è selezionato;

        - l'oggetto $2$ ($w_{2}=3>rc=1$) non è selezionato;

        L'algoritmo greedy per profitto restituisce $x=(0,0,1,1,0)$, di peso $17$ e profitto $27$.

        Iterazione 1: soluzione corrente $x=(0,0,1,1,0)$, peso $17$, profitto $27$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>vicino</th>
        <th>peso</th>
        <th>profitto</th>
        <th></th>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((1,0,1,1,0)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((0,1,1,1,0)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((0,0,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((0,0,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((0,0,1,1,1)\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span> fuori, <span class="arithmatex">\(1\)</span> dentro</td>
        <td><span class="arithmatex">\((1,0,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span> fuori, <span class="arithmatex">\(2\)</span> dentro</td>
        <td><span class="arithmatex">\((0,1,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span> fuori, <span class="arithmatex">\(5\)</span> dentro</td>
        <td><span class="arithmatex">\((0,0,0,1,1)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span> fuori, <span class="arithmatex">\(1\)</span> dentro</td>
        <td><span class="arithmatex">\((1,0,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span> fuori, <span class="arithmatex">\(2\)</span> dentro</td>
        <td><span class="arithmatex">\((0,1,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span> fuori, <span class="arithmatex">\(5\)</span> dentro</td>
        <td><span class="arithmatex">\((0,0,1,0,1)\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Nessun vicino ammissibile ha un profitto maggiore: $x=(0,0,1,1,0)$ è un <strong>ottimo locale</strong>, di profitto $27$ (8 vicini ammissibili esaminati).

    4. La ricerca locale da $GR$ raggiunge $x=(1,0,0,1,1)$, di profitto $32=z(I)$: una soluzione <strong>ottima</strong>. La ricerca locale dalla soluzione greedy per profitto si ferma subito in $x=(0,0,1,1,0)$, di profitto $27$, un ottimo locale che non è ottimo. Per passare da $\{3,4\}$ all'insieme ottimo $\{1,4,5\}$ occorre togliere l'oggetto $3$ e aggiungere gli oggetti $1$ e $5$: tre flip, oppure uno swap e un flip, e ogni vettore intermedio è non ammissibile o peggiore. L'ottimo locale raggiunto dipende dalla <strong>soluzione di partenza</strong>.

<a id="esercizio-31-2"></a>

!!! esercizio "Esercizio 31.2: Ricerca locale KP 2"

    Consideriamo uno zaino di capacità $c = 13$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n=5$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\[1ex]
    \hline {p_j} & {8} & {9} & {14} & {11} & {9} \\[1ex]
    {w_j} & {3} & {5} & {9} & {9} & {8} \\
    \hline
    \end{array}
    $$

    Gli oggetti sono ordinati per efficienza non crescente. L'intorno flip+swap contiene i vettori ammissibili ottenuti con un flip (aggiungere o togliere un oggetto) o con uno swap (togliere un oggetto selezionato $j$, aggiungere un oggetto non selezionato $k$); si esaminano prima i flip, per $j=1,\dots,n$, poi gli swap, per $j$ crescente e, per ogni $j$, per $k$ crescente. In best improvement i pareggi si risolvono a favore della mossa esaminata per prima.

    **Domande**

    1. Calcolare la soluzione dell'algoritmo greedy $GR$ (per efficienza) e il suo profitto.

    2. Applicare la ricerca locale con l'intorno flip+swap e la regola <strong>first improvement</strong>, partendo dalla soluzione di $GR$.

    3. Applicare la stessa ricerca locale con la regola <strong>best improvement</strong>, partendo dalla soluzione di $GR$.

    4. Confrontare i due ottimi locali, e il numero di vicini ammissibili esaminati dalle due regole. Uno dei due ottimi locali è ottimo? (Suggerimento: qui il bound del rilassamento lineare non basta; dividere le soluzioni a seconda che l'oggetto $3$ sia selezionato o no.)

??? soluzione "Soluzione"

    1. Le efficienze sono $\frac{8}{3}$, $\frac{9}{5}$, $\frac{14}{9}$, $\frac{11}{9}$, $\frac{9}{8}$, non crescenti. Con $rc=13$:

        - l'oggetto $1$ ($w_{1}=3$) è selezionato, $rc=10$;

        - l'oggetto $2$ ($w_{2}=5$) è selezionato, $rc=5$;

        - l'oggetto $3$ ($w_{3}=9>rc=5$) non è selezionato;

        - l'oggetto $4$ ($w_{4}=9>rc=5$) non è selezionato;

        - l'oggetto $5$ ($w_{5}=8>rc=5$) non è selezionato;

        $GR$ restituisce $x=(1,1,0,0,0)$, di peso $8$ e profitto $GR(I)=17$.

    2. Iterazione 1: soluzione corrente $x=(1,1,0,0,0)$, peso $8$, profitto $17$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>vicino</th>
        <th>peso</th>
        <th>profitto</th>
        <th></th>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,1,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((1,0,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((1,1,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((1,1,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((1,1,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span> fuori, <span class="arithmatex">\(3\)</span> dentro</td>
        <td><span class="arithmatex">\((0,1,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span> fuori, <span class="arithmatex">\(4\)</span> dentro</td>
        <td><span class="arithmatex">\((0,1,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span> fuori, <span class="arithmatex">\(5\)</span> dentro</td>
        <td><span class="arithmatex">\((0,1,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span> accettata</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span> fuori, <span class="arithmatex">\(3\)</span> dentro</td>
        <td><span class="arithmatex">\((1,0,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span> fuori, <span class="arithmatex">\(4\)</span> dentro</td>
        <td><span class="arithmatex">\((1,0,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span> fuori, <span class="arithmatex">\(5\)</span> dentro</td>
        <td><span class="arithmatex">\((1,0,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        </table></div>

        La mossa è accettata dopo aver esaminato 3 vicini ammissibili.

        Iterazione 2: soluzione corrente $x=(0,1,0,0,1)$, peso $13$, profitto $18$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>vicino</th>
        <th>peso</th>
        <th>profitto</th>
        <th></th>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((1,1,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((0,0,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((0,1,1,0,1)\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((0,1,0,1,1)\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((0,1,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span> fuori, <span class="arithmatex">\(1\)</span> dentro</td>
        <td><span class="arithmatex">\((1,0,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span> fuori, <span class="arithmatex">\(3\)</span> dentro</td>
        <td><span class="arithmatex">\((0,0,1,0,1)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span> fuori, <span class="arithmatex">\(4\)</span> dentro</td>
        <td><span class="arithmatex">\((0,0,0,1,1)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span> fuori, <span class="arithmatex">\(1\)</span> dentro</td>
        <td><span class="arithmatex">\((1,1,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span> fuori, <span class="arithmatex">\(3\)</span> dentro</td>
        <td><span class="arithmatex">\((0,1,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span> fuori, <span class="arithmatex">\(4\)</span> dentro</td>
        <td><span class="arithmatex">\((0,1,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        </table></div>

        Nessun vicino ammissibile ha un profitto maggiore: $x=(0,1,0,0,1)$ è un <strong>ottimo locale</strong>, di profitto $18$ (4 vicini ammissibili esaminati).

        First improvement si ferma in $x=(0,1,0,0,1)$, di profitto $18$, dopo aver esaminato 7 vicini ammissibili in totale.

    3. Iterazione 1: soluzione corrente $x=(1,1,0,0,0)$, peso $8$, profitto $17$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>vicino</th>
        <th>peso</th>
        <th>profitto</th>
        <th></th>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,1,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((1,0,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((1,1,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((1,1,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((1,1,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span> fuori, <span class="arithmatex">\(3\)</span> dentro</td>
        <td><span class="arithmatex">\((0,1,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span> fuori, <span class="arithmatex">\(4\)</span> dentro</td>
        <td><span class="arithmatex">\((0,1,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span> fuori, <span class="arithmatex">\(5\)</span> dentro</td>
        <td><span class="arithmatex">\((0,1,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span> fuori, <span class="arithmatex">\(3\)</span> dentro</td>
        <td><span class="arithmatex">\((1,0,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span> accettata</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span> fuori, <span class="arithmatex">\(4\)</span> dentro</td>
        <td><span class="arithmatex">\((1,0,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span> fuori, <span class="arithmatex">\(5\)</span> dentro</td>
        <td><span class="arithmatex">\((1,0,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        </table></div>

        La mossa è accettata dopo aver esaminato 6 vicini ammissibili.

        Iterazione 2: soluzione corrente $x=(1,0,1,0,0)$, peso $12$, profitto $22$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>vicino</th>
        <th>peso</th>
        <th>profitto</th>
        <th></th>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,0,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((1,1,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((1,0,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((1,0,1,1,0)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((1,0,1,0,1)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span> fuori, <span class="arithmatex">\(2\)</span> dentro</td>
        <td><span class="arithmatex">\((0,1,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span> fuori, <span class="arithmatex">\(4\)</span> dentro</td>
        <td><span class="arithmatex">\((0,0,1,1,0)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span> fuori, <span class="arithmatex">\(5\)</span> dentro</td>
        <td><span class="arithmatex">\((0,0,1,0,1)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span> fuori, <span class="arithmatex">\(2\)</span> dentro</td>
        <td><span class="arithmatex">\((1,1,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span> fuori, <span class="arithmatex">\(4\)</span> dentro</td>
        <td><span class="arithmatex">\((1,0,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span> fuori, <span class="arithmatex">\(5\)</span> dentro</td>
        <td><span class="arithmatex">\((1,0,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Nessun vicino ammissibile ha un profitto maggiore: $x=(1,0,1,0,0)$ è un <strong>ottimo locale</strong>, di profitto $22$ (5 vicini ammissibili esaminati).

        Best improvement si ferma in $x=(1,0,1,0,0)$, di profitto $22$, dopo aver esaminato 11 vicini ammissibili in totale.

    4. First improvement accetta il primo swap migliorante che trova, che guadagna solo $1$, e si ferma in un ottimo locale di profitto $18$; best improvement prende il guadagno massimo e raggiunge profitto $22$. Esaminano 7 e 11 vicini ammissibili. Il rilassamento lineare dà $z(I)\le 8+9+14\cdot\frac{5}{9}=\frac{223}{9}$, quindi $z(I)\le 24$, che non dimostra che $22$ sia ottimo. Ragioniamo direttamente. Se l'oggetto $3$ è selezionato, la capacità residua è $4$ ed entra solo l'oggetto $1$, per un profitto di $22$. Se l'oggetto $3$ non è selezionato, la soluzione migliore è $\{1,4\}$, di profitto $19$. Quindi $z(I)=22$ e la soluzione di best improvement, $x=(1,0,1,0,0)$, è <strong>ottima</strong>. Dalla stessa soluzione di partenza le due regole raggiungono <strong>ottimi locali diversi</strong>.

<a id="esercizio-31-3"></a>

!!! esercizio "Esercizio 31.3: Ricerca locale KP 3"

    Consideriamo uno zaino di capacità $c = 11$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n=5$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\[1ex]
    \hline {p_j} & {14} & {7} & {10} & {8} & {6} \\[1ex]
    {w_j} & {4} & {4} & {7} & {7} & {9} \\
    \hline
    \end{array}
    $$

    Gli oggetti sono ordinati per efficienza non crescente. Con le penalità, la ricerca locale massimizza $g_\alpha(x)=\sum_j p_jx_j-\alpha\max\{0,\sum_j w_jx_j-c\}$ su tutti i vettori binari, con l'intorno flip (flip esaminati per $j=1,\dots,n$) e la regola best improvement.

    **Domande**

    1. Calcolare la soluzione di $GR$, e mostrare che è un ottimo locale per l'intorno flip ristretto ai vettori ammissibili.

    2. Applicare la ricerca locale penalty flip con $\alpha=1$, partendo dalla soluzione di $GR$. L'ottimo locale è ammissibile? Quale soluzione deve restituire la ricerca?

    3. Applicare la ricerca locale penalty flip con $\alpha=2$, partendo dalla soluzione di $GR$.

    4. Applicarla con $\alpha=3$. Il valore ottimo è $z(I)=24$: discutere il ruolo di $\alpha$, e indicare per quali valori di $\alpha$ gli ottimi locali sono sicuramente ammissibili.

??? soluzione "Soluzione"

    1. Con $rc=11$:

        - l'oggetto $1$ ($w_{1}=4$) è selezionato, $rc=7$;

        - l'oggetto $2$ ($w_{2}=4$) è selezionato, $rc=3$;

        - l'oggetto $3$ ($w_{3}=7>rc=3$) non è selezionato;

        - l'oggetto $4$ ($w_{4}=7>rc=3$) non è selezionato;

        - l'oggetto $5$ ($w_{5}=9>rc=3$) non è selezionato;

        $GR$ restituisce $x=(1,1,0,0,0)$, di peso $8$ e profitto $21$. I suoi flip sono

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>vicino</th>
        <th>peso</th>
        <th>profitto</th>
        <th></th>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,1,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((1,0,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((1,1,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((1,1,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((1,1,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td>—</td>
        <td>non ammissibile</td>
        </tr>
        </table></div>

        I vicini ammissibili tolgono un oggetto e hanno un profitto minore: $x$ è un ottimo locale per l'intorno flip ammissibile.

    2. Iterazione 1: $x=(1,1,0,0,0)$, peso $8$, $g_{1}(x)=21$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>vicino</th>
        <th>peso</th>
        <th>eccesso</th>
        <th><span class="arithmatex">\(g_{1}\)</span></th>
        <th></th>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,1,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(7-1\cdot0=7\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((1,0,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(14-1\cdot0=14\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((1,1,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(31-1\cdot4=27\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((1,1,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(29-1\cdot4=25\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((1,1,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(27-1\cdot6=21\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Iterazione 2: $x=(1,1,1,0,0)$, peso $15$, $g_{1}(x)=27$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>vicino</th>
        <th>peso</th>
        <th>eccesso</th>
        <th><span class="arithmatex">\(g_{1}\)</span></th>
        <th></th>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,1,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(17-1\cdot0=17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((1,0,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(24-1\cdot0=24\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((1,1,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(21-1\cdot0=21\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((1,1,1,1,0)\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(39-1\cdot11=28\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((1,1,1,0,1)\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(37-1\cdot13=24\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Iterazione 3: $x=(1,1,1,1,0)$, peso $22$, $g_{1}(x)=28$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>vicino</th>
        <th>peso</th>
        <th>eccesso</th>
        <th><span class="arithmatex">\(g_{1}\)</span></th>
        <th></th>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,1,1,1,0)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(25-1\cdot7=18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((1,0,1,1,0)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(32-1\cdot7=25\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((1,1,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(29-1\cdot4=25\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((1,1,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(31-1\cdot4=27\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((1,1,1,1,1)\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(45-1\cdot20=25\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Nessun flip aumenta $g_{1}$: la ricerca si ferma in $x=(1,1,1,1,0)$, di peso $22$ e profitto $39$.

        L'ottimo locale è <strong>non ammissibile</strong> (peso $22>11$): la penalità è troppo piccola. La ricerca deve restituire il miglior vettore ammissibile visitato, $(1,1,0,0,0)$, di profitto $21$, cioè la soluzione di partenza.

    3. Iterazione 1: $x=(1,1,0,0,0)$, peso $8$, $g_{2}(x)=21$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>vicino</th>
        <th>peso</th>
        <th>eccesso</th>
        <th><span class="arithmatex">\(g_{2}\)</span></th>
        <th></th>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,1,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(7-2\cdot0=7\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((1,0,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(14-2\cdot0=14\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((1,1,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(31-2\cdot4=23\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((1,1,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(29-2\cdot4=21\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((1,1,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(27-2\cdot6=15\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Iterazione 2: $x=(1,1,1,0,0)$, peso $15$, $g_{2}(x)=23$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>vicino</th>
        <th>peso</th>
        <th>eccesso</th>
        <th><span class="arithmatex">\(g_{2}\)</span></th>
        <th></th>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,1,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(17-2\cdot0=17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((1,0,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(24-2\cdot0=24\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((1,1,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(21-2\cdot0=21\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((1,1,1,1,0)\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(39-2\cdot11=17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((1,1,1,0,1)\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(37-2\cdot13=11\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Iterazione 3: $x=(1,0,1,0,0)$, peso $11$, $g_{2}(x)=24$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>vicino</th>
        <th>peso</th>
        <th>eccesso</th>
        <th><span class="arithmatex">\(g_{2}\)</span></th>
        <th></th>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,0,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(10-2\cdot0=10\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((1,1,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(31-2\cdot4=23\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((1,0,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(14-2\cdot0=14\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((1,0,1,1,0)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(32-2\cdot7=18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((1,0,1,0,1)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(30-2\cdot9=12\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Nessun flip aumenta $g_{2}$: la ricerca si ferma in $x=(1,0,1,0,0)$, di peso $11$ e profitto $24$.

        L'ottimo locale $(1,0,1,0,0)$ è ammissibile, di profitto $24=z(I)$: è <strong>ottimo</strong>. La ricerca lo ha raggiunto attraverso il vettore non ammissibile $(1,1,1,0,0)$.

    4. Iterazione 1: $x=(1,1,0,0,0)$, peso $8$, $g_{3}(x)=21$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>vicino</th>
        <th>peso</th>
        <th>eccesso</th>
        <th><span class="arithmatex">\(g_{3}\)</span></th>
        <th></th>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,1,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(7-3\cdot0=7\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((1,0,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(14-3\cdot0=14\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((1,1,1,0,0)\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(31-3\cdot4=19\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((1,1,0,1,0)\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(29-3\cdot4=17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>flip <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((1,1,0,0,1)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(27-3\cdot6=9\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Nessun flip aumenta $g_{3}$: la ricerca si ferma in $x=(1,1,0,0,0)$, di peso $8$ e profitto $21$.

        Con $\alpha=3$ la ricerca non si muove: si comporta come la ricerca ammissibile e si ferma nella soluzione di $GR$, di profitto $21$. Un $\alpha$ piccolo ($1$) lascia che la ricerca si fermi fra vettori non ammissibili; un $\alpha$ grande ($3$) le impedisce di attraversare la regione non ammissibile; qui solo $\alpha=2$ raggiunge l'ottimo. Se $\alpha>\max_j p_j=14$, ogni vettore non ammissibile ha un flip migliorante (togliere un qualsiasi oggetto selezionato diminuisce l'eccesso di almeno $1$ e guadagna almeno $\alpha-p_j>0$), quindi tutti gli ottimi locali sono ammissibili; ma allora, da un vettore ammissibile, nessun flip che crea un eccesso è migliorante, e la ricerca non lascia mai la regione ammissibile.

## Bin packing

<a id="esercizio-31-4"></a>

!!! esercizio "Esercizio 31.4: Ricerca locale BPP 1"

    Contenitori di capacità $c=10$ e un insieme $\mathscr{I}=\{1,2,3,4,5,6,7\}$ di $7$ oggetti con pesi

    $$
    \begin{array}{l|ccccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} & {j=7} \\[1ex]
    \hline {w_j} & {2} & {3} & {2} & {7} & {4} & {7} & {4} \\
    \hline
    \end{array}
    $$

    I contenitori sono etichettati $1,2,\dots$ nell'ordine in cui $FF$ li apre, e mantengono la loro etichetta. Una <em>move</em> mette un oggetto in un altro contenitore non vuoto in cui entra (esaminata per $j=1,\dots,n$ e, per ogni $j$, per etichetta di contenitore crescente); uno <em>swap</em> scambia due oggetti $j<k$ di peso diverso in contenitori diversi, se entrambi i contenitori restano ammissibili. L'obiettivo ausiliario $SQ=\sum_b L_b^2$ si massimizza; il guadagno di un trasferimento di $\delta$ dal contenitore $a$ al contenitore $b$ è $2\delta(L_b-L_a+\delta)$ (una move dell'oggetto $j$ trasferisce $\delta=w_j$, uno swap dell'oggetto $j$ nel contenitore $a$ e dell'oggetto $k$ nel contenitore $b$ trasferisce $\delta=w_j-w_k$). Best improvement risolve i pareggi a favore della mossa esaminata per prima.

    **Domande**

    1. Calcolare la soluzione di First Fit ($FF$), il suo numero di contenitori e il lower bound $\lceil\sum_j w_j/c\rceil$.

    2. Applicare la ricerca locale move con l'obiettivo $nb$ (numero di contenitori), partendo dalla soluzione di $FF$. Perché si ferma?

    3. Applicare la ricerca locale move con l'obiettivo ausiliario $SQ=\sum_b L_b^2$ e la regola best improvement, partendo dalla soluzione di $FF$.

    4. La soluzione finale è ottima? Spiegare il diverso comportamento dei due obiettivi.

??? soluzione "Soluzione"

    1. - l'oggetto $1$ ($w_{1}=2$) va nel contenitore $1$, aperto per lui, carico $2$;

        - l'oggetto $2$ ($w_{2}=3$) va nel contenitore $1$, carico $5$;

        - l'oggetto $3$ ($w_{3}=2$) va nel contenitore $1$, carico $7$;

        - l'oggetto $4$ ($w_{4}=7$) non entra in nessun contenitore aperto: si apre il contenitore $2$, carico $7$;

        - l'oggetto $5$ ($w_{5}=4$) non entra in nessun contenitore aperto: si apre il contenitore $3$, carico $4$;

        - l'oggetto $6$ ($w_{6}=7$) non entra in nessun contenitore aperto: si apre il contenitore $4$, carico $7$;

        - l'oggetto $7$ ($w_{7}=4$) va nel contenitore $3$, carico $8$;

        $FF$ usa $nb=4$ contenitori, con schemi di carico $\{1,2,3\}, \{4\}, \{5,7\}, \{6\}$ e carichi $(7,7,8,7)$. Il lower bound è $\lceil 29/10\rceil=3$.

    2. Iterazione 1 (move): schemi di carico $\{1,2,3\}, \{4\}, \{5,7\}, \{6\}$, carichi $(7,7,8,7)$, $nb=4$, $SQ=211$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th>contenitore svuotato</th>
        <th></th>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(1\)</span>: contenitore <span class="arithmatex">\(1\to 2\)</span></td>
        <td><span class="arithmatex">\((5,9,8,7)\)</span></td>
        <td>no</td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(1\)</span>: contenitore <span class="arithmatex">\(1\to 3\)</span></td>
        <td><span class="arithmatex">\((5,7,10,7)\)</span></td>
        <td>no</td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(1\)</span>: contenitore <span class="arithmatex">\(1\to 4\)</span></td>
        <td><span class="arithmatex">\((5,7,8,9)\)</span></td>
        <td>no</td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(2\)</span>: contenitore <span class="arithmatex">\(1\to 2\)</span></td>
        <td><span class="arithmatex">\((4,10,8,7)\)</span></td>
        <td>no</td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(2\)</span>: contenitore <span class="arithmatex">\(1\to 4\)</span></td>
        <td><span class="arithmatex">\((4,7,8,10)\)</span></td>
        <td>no</td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(3\)</span>: contenitore <span class="arithmatex">\(1\to 2\)</span></td>
        <td><span class="arithmatex">\((5,9,8,7)\)</span></td>
        <td>no</td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(3\)</span>: contenitore <span class="arithmatex">\(1\to 3\)</span></td>
        <td><span class="arithmatex">\((5,7,10,7)\)</span></td>
        <td>no</td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(3\)</span>: contenitore <span class="arithmatex">\(1\to 4\)</span></td>
        <td><span class="arithmatex">\((5,7,8,9)\)</span></td>
        <td>no</td>
        <td></td>
        </tr>
        </table></div>

        Nessuna mossa è migliorante.

        Nessuna mossa svuota un contenitore, quindi nessuna mossa diminuisce $nb$: la soluzione di $FF$ è un ottimo locale con $4$ contenitori. Tutte le mosse sono neutre per $nb$: la ricerca è su un <strong>plateau</strong>.

    3. Iterazione 1 (move): schemi di carico $\{1,2,3\}, \{4\}, \{5,7\}, \{6\}$, carichi $(7,7,8,7)$, $nb=4$, $SQ=211$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th>guadagno</th>
        <th></th>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(1\)</span>: contenitore <span class="arithmatex">\(1\to 2\)</span></td>
        <td><span class="arithmatex">\((5,9,8,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(7-7+2)=8\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(1\)</span>: contenitore <span class="arithmatex">\(1\to 3\)</span></td>
        <td><span class="arithmatex">\((5,7,10,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(8-7+2)=12\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(1\)</span>: contenitore <span class="arithmatex">\(1\to 4\)</span></td>
        <td><span class="arithmatex">\((5,7,8,9)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(7-7+2)=8\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(2\)</span>: contenitore <span class="arithmatex">\(1\to 2\)</span></td>
        <td><span class="arithmatex">\((4,10,8,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot3\cdot(7-7+3)=18\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(2\)</span>: contenitore <span class="arithmatex">\(1\to 4\)</span></td>
        <td><span class="arithmatex">\((4,7,8,10)\)</span></td>
        <td><span class="arithmatex">\(2\cdot3\cdot(7-7+3)=18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(3\)</span>: contenitore <span class="arithmatex">\(1\to 2\)</span></td>
        <td><span class="arithmatex">\((5,9,8,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(7-7+2)=8\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(3\)</span>: contenitore <span class="arithmatex">\(1\to 3\)</span></td>
        <td><span class="arithmatex">\((5,7,10,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(8-7+2)=12\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(3\)</span>: contenitore <span class="arithmatex">\(1\to 4\)</span></td>
        <td><span class="arithmatex">\((5,7,8,9)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(7-7+2)=8\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Si accetta la mossa indicata.

        Iterazione 2 (move): schemi di carico $\{1,3\}, \{2,4\}, \{5,7\}, \{6\}$, carichi $(4,10,8,7)$, $nb=4$, $SQ=229$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th>guadagno</th>
        <th></th>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(1\)</span>: contenitore <span class="arithmatex">\(1\to 3\)</span></td>
        <td><span class="arithmatex">\((2,10,10,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(8-4+2)=24\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(1\)</span>: contenitore <span class="arithmatex">\(1\to 4\)</span></td>
        <td><span class="arithmatex">\((2,10,8,9)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(7-4+2)=20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(2\)</span>: contenitore <span class="arithmatex">\(2\to 1\)</span></td>
        <td><span class="arithmatex">\((7,7,8,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot3\cdot(4-10+3)=-18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(2\)</span>: contenitore <span class="arithmatex">\(2\to 4\)</span></td>
        <td><span class="arithmatex">\((4,7,8,10)\)</span></td>
        <td><span class="arithmatex">\(2\cdot3\cdot(7-10+3)=0\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(3\)</span>: contenitore <span class="arithmatex">\(1\to 3\)</span></td>
        <td><span class="arithmatex">\((2,10,10,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(8-4+2)=24\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(3\)</span>: contenitore <span class="arithmatex">\(1\to 4\)</span></td>
        <td><span class="arithmatex">\((2,10,8,9)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(7-4+2)=20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(5\)</span>: contenitore <span class="arithmatex">\(3\to 1\)</span></td>
        <td><span class="arithmatex">\((8,10,4,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot4\cdot(4-8+4)=0\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(7\)</span>: contenitore <span class="arithmatex">\(3\to 1\)</span></td>
        <td><span class="arithmatex">\((8,10,4,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot4\cdot(4-8+4)=0\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Si accetta la mossa indicata.

        Iterazione 3 (move): schemi di carico $\{3\}, \{2,4\}, \{1,5,7\}, \{6\}$, carichi $(2,10,10,7)$, $nb=4$, $SQ=253$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th>guadagno</th>
        <th></th>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(1\)</span>: contenitore <span class="arithmatex">\(3\to 1\)</span></td>
        <td><span class="arithmatex">\((4,10,8,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(2-10+2)=-24\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(1\)</span>: contenitore <span class="arithmatex">\(3\to 4\)</span></td>
        <td><span class="arithmatex">\((2,10,8,9)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(7-10+2)=-4\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(2\)</span>: contenitore <span class="arithmatex">\(2\to 1\)</span></td>
        <td><span class="arithmatex">\((5,7,10,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot3\cdot(2-10+3)=-30\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(2\)</span>: contenitore <span class="arithmatex">\(2\to 4\)</span></td>
        <td><span class="arithmatex">\((2,7,10,10)\)</span></td>
        <td><span class="arithmatex">\(2\cdot3\cdot(7-10+3)=0\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(3\)</span>: contenitore <span class="arithmatex">\(1\to 4\)</span></td>
        <td><span class="arithmatex">\((10,10,9)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(7-2+2)=28\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(4\)</span>: contenitore <span class="arithmatex">\(2\to 1\)</span></td>
        <td><span class="arithmatex">\((9,3,10,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot7\cdot(2-10+7)=-14\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(5\)</span>: contenitore <span class="arithmatex">\(3\to 1\)</span></td>
        <td><span class="arithmatex">\((6,10,6,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot4\cdot(2-10+4)=-32\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(6\)</span>: contenitore <span class="arithmatex">\(4\to 1\)</span></td>
        <td><span class="arithmatex">\((9,10,10)\)</span></td>
        <td><span class="arithmatex">\(2\cdot7\cdot(2-7+7)=28\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(7\)</span>: contenitore <span class="arithmatex">\(3\to 1\)</span></td>
        <td><span class="arithmatex">\((6,10,6,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot4\cdot(2-10+4)=-32\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Si accetta la mossa indicata.

        Iterazione 4 (move): schemi di carico $\{2,4\}, \{1,5,7\}, \{3,6\}$, carichi $(10,10,9)$, $nb=3$, $SQ=281$. Non c'è nessuna mossa ammissibile.

        La ricerca esegue 3 mosse, con $SQ$: $211\to229\to253\to281$, e si ferma con schemi di carico $\{2,4\}, \{1,5,7\}, \{3,6\}$ e $nb=3$.

    4. La soluzione finale usa $3=\lceil 29/10\rceil$ contenitori: è <strong>ottima</strong>. Con $nb$ la ricerca non vede differenze fra i vicini, perché solo una mossa che svuota un contenitore cambia $nb$; con $SQ$ sono miglioranti le mosse che rendono più pesante un contenitore pesante e più leggero un contenitore leggero, e preparano la mossa che svuota un contenitore (che aumenta sempre $SQ$).

<a id="esercizio-31-5"></a>

!!! esercizio "Esercizio 31.5: Ricerca locale BPP 2"

    Contenitori di capacità $c=10$ e un insieme $\mathscr{I}=\{1,2,3,4,5,6\}$ di $6$ oggetti con pesi

    $$
    \begin{array}{l|cccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} \\[1ex]
    \hline {w_j} & {2} & {3} & {4} & {5} & {4} & {2} \\
    \hline
    \end{array}
    $$

    I contenitori sono etichettati $1,2,\dots$ nell'ordine in cui $FF$ li apre, e mantengono la loro etichetta. Una <em>move</em> mette un oggetto in un altro contenitore non vuoto in cui entra (esaminata per $j=1,\dots,n$ e, per ogni $j$, per etichetta di contenitore crescente); uno <em>swap</em> scambia due oggetti $j<k$ di peso diverso in contenitori diversi, se entrambi i contenitori restano ammissibili. L'obiettivo ausiliario $SQ=\sum_b L_b^2$ si massimizza; il guadagno di un trasferimento di $\delta$ dal contenitore $a$ al contenitore $b$ è $2\delta(L_b-L_a+\delta)$ (una move dell'oggetto $j$ trasferisce $\delta=w_j$, uno swap dell'oggetto $j$ nel contenitore $a$ e dell'oggetto $k$ nel contenitore $b$ trasferisce $\delta=w_j-w_k$). Best improvement risolve i pareggi a favore della mossa esaminata per prima.

    **Domande**

    1. Calcolare la soluzione di First Fit ($FF$) e il lower bound $\lceil\sum_j w_j/c\rceil$.

    2. Applicare la ricerca locale move con l'obiettivo ausiliario $SQ$ e la regola best improvement, partendo dalla soluzione di $FF$.

    3. Applicare la ricerca locale swap con l'obiettivo $SQ$ e la regola best improvement, partendo dalla soluzione di $FF$.

    4. Applicare la variable neighbourhood descent con $N_1=$ move e $N_2=$ swap (obiettivo $SQ$, best improvement), partendo dalla soluzione di $FF$. Il risultato è ottimo? Che cosa mostrano le tre ricerche locali?

??? soluzione "Soluzione"

    1. - l'oggetto $1$ ($w_{1}=2$) va nel contenitore $1$, aperto per lui, carico $2$;

        - l'oggetto $2$ ($w_{2}=3$) va nel contenitore $1$, carico $5$;

        - l'oggetto $3$ ($w_{3}=4$) va nel contenitore $1$, carico $9$;

        - l'oggetto $4$ ($w_{4}=5$) non entra in nessun contenitore aperto: si apre il contenitore $2$, carico $5$;

        - l'oggetto $5$ ($w_{5}=4$) va nel contenitore $2$, carico $9$;

        - l'oggetto $6$ ($w_{6}=2$) non entra in nessun contenitore aperto: si apre il contenitore $3$, carico $2$;

        $FF$ usa $nb=3$ contenitori, con schemi di carico $\{1,2,3\}, \{4,5\}, \{6\}$ e carichi $(9,9,2)$. Il lower bound è $\lceil 20/10\rceil=2$.

    2. Iterazione 1 (move): schemi di carico $\{1,2,3\}, \{4,5\}, \{6\}$, carichi $(9,9,2)$, $nb=3$, $SQ=166$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th>guadagno</th>
        <th></th>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(1\)</span>: contenitore <span class="arithmatex">\(1\to 3\)</span></td>
        <td><span class="arithmatex">\((7,9,4)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(2-9+2)=-20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(2\)</span>: contenitore <span class="arithmatex">\(1\to 3\)</span></td>
        <td><span class="arithmatex">\((6,9,5)\)</span></td>
        <td><span class="arithmatex">\(2\cdot3\cdot(2-9+3)=-24\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(3\)</span>: contenitore <span class="arithmatex">\(1\to 3\)</span></td>
        <td><span class="arithmatex">\((5,9,6)\)</span></td>
        <td><span class="arithmatex">\(2\cdot4\cdot(2-9+4)=-24\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(4\)</span>: contenitore <span class="arithmatex">\(2\to 3\)</span></td>
        <td><span class="arithmatex">\((9,4,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot5\cdot(2-9+5)=-20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(5\)</span>: contenitore <span class="arithmatex">\(2\to 3\)</span></td>
        <td><span class="arithmatex">\((9,5,6)\)</span></td>
        <td><span class="arithmatex">\(2\cdot4\cdot(2-9+4)=-24\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Nessuna mossa è migliorante.

        La soluzione di $FF$ è un ottimo locale per move, con $3$ contenitori.

    3. Iterazione 1 (swap): schemi di carico $\{1,2,3\}, \{4,5\}, \{6\}$, carichi $(9,9,2)$, $nb=3$, $SQ=166$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>swap</th>
        <th>carichi</th>
        <th>guadagno</th>
        <th></th>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(2,5\)</span> (contenitori <span class="arithmatex">\(1,2\)</span>)</td>
        <td><span class="arithmatex">\((10,8,2)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(-1)\cdot(9-9-1)=2\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(2,6\)</span> (contenitori <span class="arithmatex">\(1,3\)</span>)</td>
        <td><span class="arithmatex">\((8,9,3)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(1)\cdot(2-9+1)=-12\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(3,4\)</span> (contenitori <span class="arithmatex">\(1,2\)</span>)</td>
        <td><span class="arithmatex">\((10,8,2)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(-1)\cdot(9-9-1)=2\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(3,6\)</span> (contenitori <span class="arithmatex">\(1,3\)</span>)</td>
        <td><span class="arithmatex">\((7,9,4)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(2)\cdot(2-9+2)=-20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(4,6\)</span> (contenitori <span class="arithmatex">\(2,3\)</span>)</td>
        <td><span class="arithmatex">\((9,6,5)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(3)\cdot(2-9+3)=-24\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(5,6\)</span> (contenitori <span class="arithmatex">\(2,3\)</span>)</td>
        <td><span class="arithmatex">\((9,7,4)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(2)\cdot(2-9+2)=-20\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Si accetta lo swap indicato.

        Iterazione 2 (swap): schemi di carico $\{1,3,5\}, \{2,4\}, \{6\}$, carichi $(10,8,2)$, $nb=3$, $SQ=168$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>swap</th>
        <th>carichi</th>
        <th>guadagno</th>
        <th></th>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(2,3\)</span> (contenitori <span class="arithmatex">\(2,1\)</span>)</td>
        <td><span class="arithmatex">\((9,9,2)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(-1)\cdot(10-8-1)=-2\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(2,5\)</span> (contenitori <span class="arithmatex">\(2,1\)</span>)</td>
        <td><span class="arithmatex">\((9,9,2)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(-1)\cdot(10-8-1)=-2\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(2,6\)</span> (contenitori <span class="arithmatex">\(2,3\)</span>)</td>
        <td><span class="arithmatex">\((10,7,3)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(1)\cdot(2-8+1)=-10\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(3,6\)</span> (contenitori <span class="arithmatex">\(1,3\)</span>)</td>
        <td><span class="arithmatex">\((8,8,4)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(2)\cdot(2-10+2)=-24\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(4,6\)</span> (contenitori <span class="arithmatex">\(2,3\)</span>)</td>
        <td><span class="arithmatex">\((10,5,5)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(3)\cdot(2-8+3)=-18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(5,6\)</span> (contenitori <span class="arithmatex">\(1,3\)</span>)</td>
        <td><span class="arithmatex">\((8,8,4)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(2)\cdot(2-10+2)=-24\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Nessuno swap è migliorante.

        La ricerca locale swap si ferma con schemi di carico $\{1,3,5\}, \{2,4\}, \{6\}$, $SQ=168$, ancora $3$ contenitori (uno swap non cambia mai $nb$).

    4. Iterazione 1 (move): schemi di carico $\{1,2,3\}, \{4,5\}, \{6\}$, carichi $(9,9,2)$, $nb=3$, $SQ=166$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th>guadagno</th>
        <th></th>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(1\)</span>: contenitore <span class="arithmatex">\(1\to 3\)</span></td>
        <td><span class="arithmatex">\((7,9,4)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(2-9+2)=-20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(2\)</span>: contenitore <span class="arithmatex">\(1\to 3\)</span></td>
        <td><span class="arithmatex">\((6,9,5)\)</span></td>
        <td><span class="arithmatex">\(2\cdot3\cdot(2-9+3)=-24\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(3\)</span>: contenitore <span class="arithmatex">\(1\to 3\)</span></td>
        <td><span class="arithmatex">\((5,9,6)\)</span></td>
        <td><span class="arithmatex">\(2\cdot4\cdot(2-9+4)=-24\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(4\)</span>: contenitore <span class="arithmatex">\(2\to 3\)</span></td>
        <td><span class="arithmatex">\((9,4,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot5\cdot(2-9+5)=-20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(5\)</span>: contenitore <span class="arithmatex">\(2\to 3\)</span></td>
        <td><span class="arithmatex">\((9,5,6)\)</span></td>
        <td><span class="arithmatex">\(2\cdot4\cdot(2-9+4)=-24\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Nessuna mossa è migliorante.

        Iterazione 2 (swap): schemi di carico $\{1,2,3\}, \{4,5\}, \{6\}$, carichi $(9,9,2)$, $nb=3$, $SQ=166$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>swap</th>
        <th>carichi</th>
        <th>guadagno</th>
        <th></th>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(2,5\)</span> (contenitori <span class="arithmatex">\(1,2\)</span>)</td>
        <td><span class="arithmatex">\((10,8,2)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(-1)\cdot(9-9-1)=2\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(2,6\)</span> (contenitori <span class="arithmatex">\(1,3\)</span>)</td>
        <td><span class="arithmatex">\((8,9,3)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(1)\cdot(2-9+1)=-12\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(3,4\)</span> (contenitori <span class="arithmatex">\(1,2\)</span>)</td>
        <td><span class="arithmatex">\((10,8,2)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(-1)\cdot(9-9-1)=2\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(3,6\)</span> (contenitori <span class="arithmatex">\(1,3\)</span>)</td>
        <td><span class="arithmatex">\((7,9,4)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(2)\cdot(2-9+2)=-20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(4,6\)</span> (contenitori <span class="arithmatex">\(2,3\)</span>)</td>
        <td><span class="arithmatex">\((9,6,5)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(3)\cdot(2-9+3)=-24\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(5,6\)</span> (contenitori <span class="arithmatex">\(2,3\)</span>)</td>
        <td><span class="arithmatex">\((9,7,4)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(2)\cdot(2-9+2)=-20\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Si accetta lo swap indicato, e la ricerca torna all'intorno move.

        Iterazione 3 (move): schemi di carico $\{1,3,5\}, \{2,4\}, \{6\}$, carichi $(10,8,2)$, $nb=3$, $SQ=168$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th>guadagno</th>
        <th></th>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(1\)</span>: contenitore <span class="arithmatex">\(1\to 2\)</span></td>
        <td><span class="arithmatex">\((8,10,2)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(8-10+2)=0\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(1\)</span>: contenitore <span class="arithmatex">\(1\to 3\)</span></td>
        <td><span class="arithmatex">\((8,8,4)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(2-10+2)=-24\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(2\)</span>: contenitore <span class="arithmatex">\(2\to 3\)</span></td>
        <td><span class="arithmatex">\((10,5,5)\)</span></td>
        <td><span class="arithmatex">\(2\cdot3\cdot(2-8+3)=-18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(3\)</span>: contenitore <span class="arithmatex">\(1\to 3\)</span></td>
        <td><span class="arithmatex">\((6,8,6)\)</span></td>
        <td><span class="arithmatex">\(2\cdot4\cdot(2-10+4)=-32\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(4\)</span>: contenitore <span class="arithmatex">\(2\to 3\)</span></td>
        <td><span class="arithmatex">\((10,3,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot5\cdot(2-8+5)=-10\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(5\)</span>: contenitore <span class="arithmatex">\(1\to 3\)</span></td>
        <td><span class="arithmatex">\((6,8,6)\)</span></td>
        <td><span class="arithmatex">\(2\cdot4\cdot(2-10+4)=-32\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(6\)</span>: contenitore <span class="arithmatex">\(3\to 2\)</span></td>
        <td><span class="arithmatex">\((10,10)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(8-2+2)=32\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        </table></div>

        Si accetta la mossa indicata.

        Iterazione 4 (move): schemi di carico $\{1,3,5\}, \{2,4,6\}$, carichi $(10,10)$, $nb=2$, $SQ=200$. Non c'è nessuna mossa ammissibile.

        Iterazione 5 (swap): schemi di carico $\{1,3,5\}, \{2,4,6\}$, carichi $(10,10)$, $nb=2$, $SQ=200$. Non c'è nessuno swap ammissibile.

        $VND$ si ferma con schemi di carico $\{1,3,5\}, \{2,4,6\}$: $2=\lceil 20/10\rceil$ contenitori, una soluzione <strong>ottima</strong>. La soluzione di $FF$ è un ottimo locale per move, il solo swap non può cambiare il numero di contenitori, ma lo swap prepara una move che svuota un contenitore: l'ottimo locale <strong>dipende dall'intorno</strong>, e combinando i due intorni si raggiunge l'ottimo.

<a id="esercizio-31-6"></a>

!!! esercizio "Esercizio 31.6: Ricerca locale BPP 3"

    Contenitori di capacità $c=10$ e un insieme $\mathscr{I}=\{1,2,3,4,5,6,7\}$ di $7$ oggetti con pesi

    $$
    \begin{array}{l|ccccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} & {j=7} \\[1ex]
    \hline {w_j} & {5} & {3} & {3} & {2} & {8} & {4} & {4} \\
    \hline
    \end{array}
    $$

    I contenitori sono etichettati $1,2,\dots$ nell'ordine in cui $FF$ li apre, e mantengono la loro etichetta. Una <em>move</em> mette un oggetto in un altro contenitore non vuoto in cui entra (esaminata per $j=1,\dots,n$ e, per ogni $j$, per etichetta di contenitore crescente); uno <em>swap</em> scambia due oggetti $j<k$ di peso diverso in contenitori diversi, se entrambi i contenitori restano ammissibili. L'obiettivo ausiliario $SQ=\sum_b L_b^2$ si massimizza; il guadagno di un trasferimento di $\delta$ dal contenitore $a$ al contenitore $b$ è $2\delta(L_b-L_a+\delta)$ (una move dell'oggetto $j$ trasferisce $\delta=w_j$, uno swap dell'oggetto $j$ nel contenitore $a$ e dell'oggetto $k$ nel contenitore $b$ trasferisce $\delta=w_j-w_k$). Best improvement risolve i pareggi a favore della mossa esaminata per prima.

    **Domande**

    1. Calcolare la soluzione di First Fit ($FF$) e il lower bound $\lceil\sum_j w_j/c\rceil$.

    2. Applicare la variable neighbourhood descent con $N_1=$ move e $N_2=$ swap (obiettivo $SQ$, best improvement), partendo dalla soluzione di $FF$.

    3. Trovare un riempimento che usa $\lceil\sum_j w_j/c\rceil$ contenitori.

    4. Spiegare perché la ricerca locale non può raggiungere quel riempimento dal suo ottimo locale.

??? soluzione "Soluzione"

    1. - l'oggetto $1$ ($w_{1}=5$) va nel contenitore $1$, aperto per lui, carico $5$;

        - l'oggetto $2$ ($w_{2}=3$) va nel contenitore $1$, carico $8$;

        - l'oggetto $3$ ($w_{3}=3$) non entra in nessun contenitore aperto: si apre il contenitore $2$, carico $3$;

        - l'oggetto $4$ ($w_{4}=2$) va nel contenitore $1$, carico $10$;

        - l'oggetto $5$ ($w_{5}=8$) non entra in nessun contenitore aperto: si apre il contenitore $3$, carico $8$;

        - l'oggetto $6$ ($w_{6}=4$) va nel contenitore $2$, carico $7$;

        - l'oggetto $7$ ($w_{7}=4$) non entra in nessun contenitore aperto: si apre il contenitore $4$, carico $4$;

        $FF$ usa $nb=4$ contenitori, con schemi di carico $\{1,2,4\}, \{3,6\}, \{5\}, \{7\}$ e carichi $(10,7,8,4)$. Il lower bound è $\lceil 29/10\rceil=3$.

    2. Iterazione 1 (move): schemi di carico $\{1,2,4\}, \{3,6\}, \{5\}, \{7\}$, carichi $(10,7,8,4)$, $nb=4$, $SQ=229$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th>guadagno</th>
        <th></th>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(1\)</span>: contenitore <span class="arithmatex">\(1\to 4\)</span></td>
        <td><span class="arithmatex">\((5,7,8,9)\)</span></td>
        <td><span class="arithmatex">\(2\cdot5\cdot(4-10+5)=-10\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(2\)</span>: contenitore <span class="arithmatex">\(1\to 2\)</span></td>
        <td><span class="arithmatex">\((7,10,8,4)\)</span></td>
        <td><span class="arithmatex">\(2\cdot3\cdot(7-10+3)=0\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(2\)</span>: contenitore <span class="arithmatex">\(1\to 4\)</span></td>
        <td><span class="arithmatex">\((7,7,8,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot3\cdot(4-10+3)=-18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(3\)</span>: contenitore <span class="arithmatex">\(2\to 4\)</span></td>
        <td><span class="arithmatex">\((10,4,8,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot3\cdot(4-7+3)=0\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(4\)</span>: contenitore <span class="arithmatex">\(1\to 2\)</span></td>
        <td><span class="arithmatex">\((8,9,8,4)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(7-10+2)=-4\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(4\)</span>: contenitore <span class="arithmatex">\(1\to 3\)</span></td>
        <td><span class="arithmatex">\((8,7,10,4)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(8-10+2)=0\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(4\)</span>: contenitore <span class="arithmatex">\(1\to 4\)</span></td>
        <td><span class="arithmatex">\((8,7,8,6)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(4-10+2)=-16\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(6\)</span>: contenitore <span class="arithmatex">\(2\to 4\)</span></td>
        <td><span class="arithmatex">\((10,3,8,8)\)</span></td>
        <td><span class="arithmatex">\(2\cdot4\cdot(4-7+4)=8\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        </table></div>

        Si accetta la mossa indicata.

        Iterazione 2 (move): schemi di carico $\{1,2,4\}, \{3\}, \{5\}, \{6,7\}$, carichi $(10,3,8,8)$, $nb=4$, $SQ=237$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th>guadagno</th>
        <th></th>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(1\)</span>: contenitore <span class="arithmatex">\(1\to 2\)</span></td>
        <td><span class="arithmatex">\((5,8,8,8)\)</span></td>
        <td><span class="arithmatex">\(2\cdot5\cdot(3-10+5)=-20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(2\)</span>: contenitore <span class="arithmatex">\(1\to 2\)</span></td>
        <td><span class="arithmatex">\((7,6,8,8)\)</span></td>
        <td><span class="arithmatex">\(2\cdot3\cdot(3-10+3)=-24\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(4\)</span>: contenitore <span class="arithmatex">\(1\to 2\)</span></td>
        <td><span class="arithmatex">\((8,5,8,8)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(3-10+2)=-20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(4\)</span>: contenitore <span class="arithmatex">\(1\to 3\)</span></td>
        <td><span class="arithmatex">\((8,3,10,8)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(8-10+2)=0\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(4\)</span>: contenitore <span class="arithmatex">\(1\to 4\)</span></td>
        <td><span class="arithmatex">\((8,3,8,10)\)</span></td>
        <td><span class="arithmatex">\(2\cdot2\cdot(8-10+2)=0\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(6\)</span>: contenitore <span class="arithmatex">\(4\to 2\)</span></td>
        <td><span class="arithmatex">\((10,7,8,4)\)</span></td>
        <td><span class="arithmatex">\(2\cdot4\cdot(3-8+4)=-8\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetto <span class="arithmatex">\(7\)</span>: contenitore <span class="arithmatex">\(4\to 2\)</span></td>
        <td><span class="arithmatex">\((10,7,8,4)\)</span></td>
        <td><span class="arithmatex">\(2\cdot4\cdot(3-8+4)=-8\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Nessuna mossa è migliorante.

        Iterazione 3 (swap): schemi di carico $\{1,2,4\}, \{3\}, \{5\}, \{6,7\}$, carichi $(10,3,8,8)$, $nb=4$, $SQ=237$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>swap</th>
        <th>carichi</th>
        <th>guadagno</th>
        <th></th>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(1,3\)</span> (contenitori <span class="arithmatex">\(1,2\)</span>)</td>
        <td><span class="arithmatex">\((8,5,8,8)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(2)\cdot(3-10+2)=-20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(1,6\)</span> (contenitori <span class="arithmatex">\(1,4\)</span>)</td>
        <td><span class="arithmatex">\((9,3,8,9)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(1)\cdot(8-10+1)=-2\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(1,7\)</span> (contenitori <span class="arithmatex">\(1,4\)</span>)</td>
        <td><span class="arithmatex">\((9,3,8,9)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(1)\cdot(8-10+1)=-2\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(3,5\)</span> (contenitori <span class="arithmatex">\(2,3\)</span>)</td>
        <td><span class="arithmatex">\((10,8,3,8)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(-5)\cdot(8-3-5)=0\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(3,6\)</span> (contenitori <span class="arithmatex">\(2,4\)</span>)</td>
        <td><span class="arithmatex">\((10,4,8,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(-1)\cdot(8-3-1)=-8\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>oggetti <span class="arithmatex">\(3,7\)</span> (contenitori <span class="arithmatex">\(2,4\)</span>)</td>
        <td><span class="arithmatex">\((10,4,8,7)\)</span></td>
        <td><span class="arithmatex">\(2\cdot(-1)\cdot(8-3-1)=-8\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Nessuno swap è migliorante.

        $VND$ si ferma con schemi di carico $\{1,2,4\}, \{3\}, \{5\}, \{6,7\}$, carichi $(10,3,8,8)$, $SQ=237$ e $nb=4$ contenitori.

    3. Gli schemi di carico $\{1,6\}, \{4,5\}, \{2,3,7\}$, di carichi $(9,10,10)$, usano $3$ contenitori: poiché $3=\lceil 29/10\rceil$, questo riempimento è <strong>ottimo</strong>, e l'ottimo locale no.

    4. Nel riempimento ottimo gli oggetti $1$ e $2$ sono in contenitori diversi, mentre nell'ottimo locale sono insieme nel contenitore pieno $\{1,2,4\}$. Per separarli, un oggetto deve lasciare un contenitore pieno (carico $10$) per uno più leggero: per la formula del guadagno $2\delta(L_b-L_a+\delta)$ una tale mossa è migliorante solo se $L_b+\delta>10$, il che è impossibile. L'obiettivo ausiliario protegge i contenitori pieni, il che di solito è un bene, ma qui il contenitore pieno di $FF$ è quello sbagliato: la ricerca è intrappolata in un ottimo locale.

## TSP: 2-opt

<a id="esercizio-31-7"></a>

!!! esercizio "Esercizio 31.7: Ricerca locale TSP 1"

    $6$ città con le distanze simmetriche

    $$
    \begin{array}{c|cccccc}
    \hline {d_{ij}} & {1} & {2} & {3} & {4} & {5} & {6} \\
    \hline {1} & --- & {7} & {6} & {3} & {4} & {6} \\
    {2} & {7} & --- & {6} & {5} & {7} & {4} \\
    {3} & {6} & {6} & --- & {5} & {5} & {2} \\
    {4} & {3} & {5} & {5} & --- & {5} & {3} \\
    {5} & {4} & {7} & {5} & {5} & --- & {4} \\
    {6} & {6} & {4} & {2} & {3} & {4} & --- \\
    \hline
    \end{array}
    $$

    Un giro $\sigma=(\sigma_1,\dots,\sigma_n)$ tiene la città $1$ in prima posizione. La mossa 2-opt $(i,j)$, per $i=1,\dots,n-2$ e $j=i+2,\dots,n$ (tranne $(1,n)$), esaminata in quest'ordine, toglie i lati $\{\sigma_i,\sigma_{i+1}\}$, $\{\sigma_j,\sigma_{j+1}\}$ (con $\sigma_{n+1}=\sigma_1$), inverte $\sigma_{i+1},\dots,\sigma_j$, e cambia la lunghezza di $\Delta=d_{\sigma_i\sigma_j}+d_{\sigma_{i+1}\sigma_{j+1}}-d_{\sigma_i\sigma_{i+1}}-d_{\sigma_j\sigma_{j+1}}$. Best improvement risolve i pareggi a favore della mossa esaminata per prima. L'euristica nearest neighbour $NN$ risolve i pareggi a favore della città di indice minimo.

    **Domande**

    1. Calcolare il giro di $NN$ dalla città $1$ e la sua lunghezza.

    2. Calcolare $\Delta$ per tutte le mosse 2-opt del giro di $NN$, e verificarne una calcolando direttamente la lunghezza del nuovo giro.

    3. Applicare la ricerca locale 2-opt con la regola best improvement, partendo dal giro di $NN$.

    4. Il valore ottimo è $z(I)=23$. Il giro finale è ottimo? Quante mosse sono state eseguite, rispetto al limite $L(\sigma^0)-z(I)$ sul numero di mosse?

??? soluzione "Soluzione"

    1. - dalla città $1$ la città non visitata più vicina è $4$ ($d_{1,4}=3$);

        - dalla città $4$ la città non visitata più vicina è $6$ ($d_{4,6}=3$);

        - dalla città $6$ la città non visitata più vicina è $3$ ($d_{6,3}=2$);

        - dalla città $3$ la città non visitata più vicina è $5$ ($d_{3,5}=5$);

        - dalla città $5$ la città non visitata più vicina è $2$ ($d_{5,2}=7$);

        - il giro torna alla città $1$ ($d_{2,1}=7$).

        Il giro è $\sigma=(1,4,6,3,5,2)$, di lunghezza $27$.

    2. Le $9$ mosse del giro di $NN$ sono

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\((i,j)\)</span></th>
        <th>lati tolti</th>
        <th><span class="arithmatex">\(\Delta\)</span></th>
        <th>nuovo giro</th>
        <th>lunghezza</th>
        <th></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\(\{1,4\},\{6,3\}\)</span></td>
        <td><span class="arithmatex">\(6+5-3-2=+6\)</span></td>
        <td><span class="arithmatex">\((1,6,4,3,5,2)\)</span></td>
        <td><span class="arithmatex">\(33\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4)\)</span></td>
        <td><span class="arithmatex">\(\{1,4\},\{3,5\}\)</span></td>
        <td><span class="arithmatex">\(6+5-3-5=+3\)</span></td>
        <td><span class="arithmatex">\((1,3,6,4,5,2)\)</span></td>
        <td><span class="arithmatex">\(30\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(\{1,4\},\{5,2\}\)</span></td>
        <td><span class="arithmatex">\(4+5-3-7=-1\)</span></td>
        <td><span class="arithmatex">\((1,5,3,6,4,2)\)</span></td>
        <td><span class="arithmatex">\(26\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(\{4,6\},\{3,5\}\)</span></td>
        <td><span class="arithmatex">\(5+4-3-5=+1\)</span></td>
        <td><span class="arithmatex">\((1,4,3,6,5,2)\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(\{4,6\},\{5,2\}\)</span></td>
        <td><span class="arithmatex">\(5+4-3-7=-1\)</span></td>
        <td><span class="arithmatex">\((1,4,5,3,6,2)\)</span></td>
        <td><span class="arithmatex">\(26\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,6)\)</span></td>
        <td><span class="arithmatex">\(\{4,6\},\{2,1\}\)</span></td>
        <td><span class="arithmatex">\(5+6-3-7=+1\)</span></td>
        <td><span class="arithmatex">\((1,4,2,5,3,6)\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,5)\)</span></td>
        <td><span class="arithmatex">\(\{6,3\},\{5,2\}\)</span></td>
        <td><span class="arithmatex">\(4+6-2-7=+1\)</span></td>
        <td><span class="arithmatex">\((1,4,6,5,3,2)\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,6)\)</span></td>
        <td><span class="arithmatex">\(\{6,3\},\{2,1\}\)</span></td>
        <td><span class="arithmatex">\(4+6-2-7=+1\)</span></td>
        <td><span class="arithmatex">\((1,4,6,2,5,3)\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((4,6)\)</span></td>
        <td><span class="arithmatex">\(\{3,5\},\{2,1\}\)</span></td>
        <td><span class="arithmatex">\(6+4-5-7=-2\)</span></td>
        <td><span class="arithmatex">\((1,4,6,3,2,5)\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Per esempio, la mossa $(1,3)$ dà il giro $(1,6,4,3,5,2)$, di lunghezza $6+3+5+5+7+7=33=27+6$.

    3. Iterazione 1: $\sigma=(1,4,6,3,5,2)$, lunghezza $27$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\((i,j)\)</span></th>
        <th>lati tolti</th>
        <th><span class="arithmatex">\(\Delta\)</span></th>
        <th>nuovo giro</th>
        <th>lunghezza</th>
        <th></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\(\{1,4\},\{6,3\}\)</span></td>
        <td><span class="arithmatex">\(6+5-3-2=+6\)</span></td>
        <td><span class="arithmatex">\((1,6,4,3,5,2)\)</span></td>
        <td><span class="arithmatex">\(33\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4)\)</span></td>
        <td><span class="arithmatex">\(\{1,4\},\{3,5\}\)</span></td>
        <td><span class="arithmatex">\(6+5-3-5=+3\)</span></td>
        <td><span class="arithmatex">\((1,3,6,4,5,2)\)</span></td>
        <td><span class="arithmatex">\(30\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(\{1,4\},\{5,2\}\)</span></td>
        <td><span class="arithmatex">\(4+5-3-7=-1\)</span></td>
        <td><span class="arithmatex">\((1,5,3,6,4,2)\)</span></td>
        <td><span class="arithmatex">\(26\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(\{4,6\},\{3,5\}\)</span></td>
        <td><span class="arithmatex">\(5+4-3-5=+1\)</span></td>
        <td><span class="arithmatex">\((1,4,3,6,5,2)\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(\{4,6\},\{5,2\}\)</span></td>
        <td><span class="arithmatex">\(5+4-3-7=-1\)</span></td>
        <td><span class="arithmatex">\((1,4,5,3,6,2)\)</span></td>
        <td><span class="arithmatex">\(26\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,6)\)</span></td>
        <td><span class="arithmatex">\(\{4,6\},\{2,1\}\)</span></td>
        <td><span class="arithmatex">\(5+6-3-7=+1\)</span></td>
        <td><span class="arithmatex">\((1,4,2,5,3,6)\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,5)\)</span></td>
        <td><span class="arithmatex">\(\{6,3\},\{5,2\}\)</span></td>
        <td><span class="arithmatex">\(4+6-2-7=+1\)</span></td>
        <td><span class="arithmatex">\((1,4,6,5,3,2)\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,6)\)</span></td>
        <td><span class="arithmatex">\(\{6,3\},\{2,1\}\)</span></td>
        <td><span class="arithmatex">\(4+6-2-7=+1\)</span></td>
        <td><span class="arithmatex">\((1,4,6,2,5,3)\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((4,6)\)</span></td>
        <td><span class="arithmatex">\(\{3,5\},\{2,1\}\)</span></td>
        <td><span class="arithmatex">\(6+4-5-7=-2\)</span></td>
        <td><span class="arithmatex">\((1,4,6,3,2,5)\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        </table></div>

        La mossa $(4,6)$ è accettata dopo 9 valutazioni.

        Iterazione 2: $\sigma=(1,4,6,3,2,5)$, lunghezza $25$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\((i,j)\)</span></th>
        <th>lati tolti</th>
        <th><span class="arithmatex">\(\Delta\)</span></th>
        <th>nuovo giro</th>
        <th>lunghezza</th>
        <th></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\(\{1,4\},\{6,3\}\)</span></td>
        <td><span class="arithmatex">\(6+5-3-2=+6\)</span></td>
        <td><span class="arithmatex">\((1,6,4,3,2,5)\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4)\)</span></td>
        <td><span class="arithmatex">\(\{1,4\},\{3,2\}\)</span></td>
        <td><span class="arithmatex">\(6+5-3-6=+2\)</span></td>
        <td><span class="arithmatex">\((1,3,6,4,2,5)\)</span></td>
        <td><span class="arithmatex">\(27\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(\{1,4\},\{2,5\}\)</span></td>
        <td><span class="arithmatex">\(7+5-3-7=+2\)</span></td>
        <td><span class="arithmatex">\((1,2,3,6,4,5)\)</span></td>
        <td><span class="arithmatex">\(27\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(\{4,6\},\{3,2\}\)</span></td>
        <td><span class="arithmatex">\(5+4-3-6=0\)</span></td>
        <td><span class="arithmatex">\((1,4,3,6,2,5)\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(\{4,6\},\{2,5\}\)</span></td>
        <td><span class="arithmatex">\(5+4-3-7=-1\)</span></td>
        <td><span class="arithmatex">\((1,4,2,3,6,5)\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,6)\)</span></td>
        <td><span class="arithmatex">\(\{4,6\},\{5,1\}\)</span></td>
        <td><span class="arithmatex">\(5+6-3-4=+4\)</span></td>
        <td><span class="arithmatex">\((1,4,5,2,3,6)\)</span></td>
        <td><span class="arithmatex">\(29\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,5)\)</span></td>
        <td><span class="arithmatex">\(\{6,3\},\{2,5\}\)</span></td>
        <td><span class="arithmatex">\(4+5-2-7=0\)</span></td>
        <td><span class="arithmatex">\((1,4,6,2,3,5)\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,6)\)</span></td>
        <td><span class="arithmatex">\(\{6,3\},\{5,1\}\)</span></td>
        <td><span class="arithmatex">\(4+6-2-4=+4\)</span></td>
        <td><span class="arithmatex">\((1,4,6,5,2,3)\)</span></td>
        <td><span class="arithmatex">\(29\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((4,6)\)</span></td>
        <td><span class="arithmatex">\(\{3,2\},\{5,1\}\)</span></td>
        <td><span class="arithmatex">\(5+7-6-4=+2\)</span></td>
        <td><span class="arithmatex">\((1,4,6,3,5,2)\)</span></td>
        <td><span class="arithmatex">\(27\)</span></td>
        <td></td>
        </tr>
        </table></div>

        La mossa $(2,5)$ è accettata dopo 9 valutazioni.

        Iterazione 3: $\sigma=(1,4,2,3,6,5)$, lunghezza $24$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\((i,j)\)</span></th>
        <th>lati tolti</th>
        <th><span class="arithmatex">\(\Delta\)</span></th>
        <th>nuovo giro</th>
        <th>lunghezza</th>
        <th></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\(\{1,4\},\{2,3\}\)</span></td>
        <td><span class="arithmatex">\(7+5-3-6=+3\)</span></td>
        <td><span class="arithmatex">\((1,2,4,3,6,5)\)</span></td>
        <td><span class="arithmatex">\(27\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4)\)</span></td>
        <td><span class="arithmatex">\(\{1,4\},\{3,6\}\)</span></td>
        <td><span class="arithmatex">\(6+3-3-2=+4\)</span></td>
        <td><span class="arithmatex">\((1,3,2,4,6,5)\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(\{1,4\},\{6,5\}\)</span></td>
        <td><span class="arithmatex">\(6+5-3-4=+4\)</span></td>
        <td><span class="arithmatex">\((1,6,3,2,4,5)\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(\{4,2\},\{3,6\}\)</span></td>
        <td><span class="arithmatex">\(5+4-5-2=+2\)</span></td>
        <td><span class="arithmatex">\((1,4,3,2,6,5)\)</span></td>
        <td><span class="arithmatex">\(26\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(\{4,2\},\{6,5\}\)</span></td>
        <td><span class="arithmatex">\(3+7-5-4=+1\)</span></td>
        <td><span class="arithmatex">\((1,4,6,3,2,5)\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,6)\)</span></td>
        <td><span class="arithmatex">\(\{4,2\},\{5,1\}\)</span></td>
        <td><span class="arithmatex">\(5+7-5-4=+3\)</span></td>
        <td><span class="arithmatex">\((1,4,5,6,3,2)\)</span></td>
        <td><span class="arithmatex">\(27\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,5)\)</span></td>
        <td><span class="arithmatex">\(\{2,3\},\{6,5\}\)</span></td>
        <td><span class="arithmatex">\(4+5-6-4=-1\)</span></td>
        <td><span class="arithmatex">\((1,4,2,6,3,5)\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,6)\)</span></td>
        <td><span class="arithmatex">\(\{2,3\},\{5,1\}\)</span></td>
        <td><span class="arithmatex">\(7+6-6-4=+3\)</span></td>
        <td><span class="arithmatex">\((1,4,2,5,6,3)\)</span></td>
        <td><span class="arithmatex">\(27\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((4,6)\)</span></td>
        <td><span class="arithmatex">\(\{3,6\},\{5,1\}\)</span></td>
        <td><span class="arithmatex">\(5+6-2-4=+5\)</span></td>
        <td><span class="arithmatex">\((1,4,2,3,5,6)\)</span></td>
        <td><span class="arithmatex">\(29\)</span></td>
        <td></td>
        </tr>
        </table></div>

        La mossa $(3,5)$ è accettata dopo 9 valutazioni.

        Iterazione 4: $\sigma=(1,4,2,6,3,5)$, lunghezza $23$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\((i,j)\)</span></th>
        <th>lati tolti</th>
        <th><span class="arithmatex">\(\Delta\)</span></th>
        <th>nuovo giro</th>
        <th>lunghezza</th>
        <th></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\(\{1,4\},\{2,6\}\)</span></td>
        <td><span class="arithmatex">\(7+3-3-4=+3\)</span></td>
        <td><span class="arithmatex">\((1,2,4,6,3,5)\)</span></td>
        <td><span class="arithmatex">\(26\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4)\)</span></td>
        <td><span class="arithmatex">\(\{1,4\},\{6,3\}\)</span></td>
        <td><span class="arithmatex">\(6+5-3-2=+6\)</span></td>
        <td><span class="arithmatex">\((1,6,2,4,3,5)\)</span></td>
        <td><span class="arithmatex">\(29\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(\{1,4\},\{3,5\}\)</span></td>
        <td><span class="arithmatex">\(6+5-3-5=+3\)</span></td>
        <td><span class="arithmatex">\((1,3,6,2,4,5)\)</span></td>
        <td><span class="arithmatex">\(26\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(\{4,2\},\{6,3\}\)</span></td>
        <td><span class="arithmatex">\(3+6-5-2=+2\)</span></td>
        <td><span class="arithmatex">\((1,4,6,2,3,5)\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(\{4,2\},\{3,5\}\)</span></td>
        <td><span class="arithmatex">\(5+7-5-5=+2\)</span></td>
        <td><span class="arithmatex">\((1,4,3,6,2,5)\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,6)\)</span></td>
        <td><span class="arithmatex">\(\{4,2\},\{5,1\}\)</span></td>
        <td><span class="arithmatex">\(5+7-5-4=+3\)</span></td>
        <td><span class="arithmatex">\((1,4,5,3,6,2)\)</span></td>
        <td><span class="arithmatex">\(26\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,5)\)</span></td>
        <td><span class="arithmatex">\(\{2,6\},\{3,5\}\)</span></td>
        <td><span class="arithmatex">\(6+4-4-5=+1\)</span></td>
        <td><span class="arithmatex">\((1,4,2,3,6,5)\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,6)\)</span></td>
        <td><span class="arithmatex">\(\{2,6\},\{5,1\}\)</span></td>
        <td><span class="arithmatex">\(7+6-4-4=+5\)</span></td>
        <td><span class="arithmatex">\((1,4,2,5,3,6)\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((4,6)\)</span></td>
        <td><span class="arithmatex">\(\{6,3\},\{5,1\}\)</span></td>
        <td><span class="arithmatex">\(4+6-2-4=+4\)</span></td>
        <td><span class="arithmatex">\((1,4,2,6,5,3)\)</span></td>
        <td><span class="arithmatex">\(27\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Nessuna mossa ha $\Delta<0$: $\sigma=(1,4,2,6,3,5)$ è un <strong>ottimo locale</strong> 2-opt (9 valutazioni).

        La ricerca esegue 3 mosse: $27\to25\to24\to23$.

    4. Il giro finale ha lunghezza $23=z(I)$: è <strong>ottimo</strong>. La ricerca ha eseguito 3 mosse, mentre la proprietà di terminazione delle note ne consente al più $27-23=4$.

<a id="esercizio-31-8"></a>

!!! esercizio "Esercizio 31.8: Ricerca locale TSP 2"

    $6$ città con le distanze simmetriche

    $$
    \begin{array}{c|cccccc}
    \hline {d_{ij}} & {1} & {2} & {3} & {4} & {5} & {6} \\
    \hline {1} & --- & {8} & {5} & {6} & {5} & {6} \\
    {2} & {8} & --- & {6} & {7} & {7} & {6} \\
    {3} & {5} & {6} & --- & {4} & {8} & {2} \\
    {4} & {6} & {7} & {4} & --- & {6} & {5} \\
    {5} & {5} & {7} & {8} & {6} & --- & {7} \\
    {6} & {6} & {6} & {2} & {5} & {7} & --- \\
    \hline
    \end{array}
    $$

    Un giro $\sigma=(\sigma_1,\dots,\sigma_n)$ tiene la città $1$ in prima posizione. La mossa 2-opt $(i,j)$, per $i=1,\dots,n-2$ e $j=i+2,\dots,n$ (tranne $(1,n)$), esaminata in quest'ordine, toglie i lati $\{\sigma_i,\sigma_{i+1}\}$, $\{\sigma_j,\sigma_{j+1}\}$ (con $\sigma_{n+1}=\sigma_1$), inverte $\sigma_{i+1},\dots,\sigma_j$, e cambia la lunghezza di $\Delta=d_{\sigma_i\sigma_j}+d_{\sigma_{i+1}\sigma_{j+1}}-d_{\sigma_i\sigma_{i+1}}-d_{\sigma_j\sigma_{j+1}}$. Best improvement risolve i pareggi a favore della mossa esaminata per prima. L'euristica nearest neighbour $NN$ risolve i pareggi a favore della città di indice minimo.

    **Domande**

    1. Calcolare il giro di $NN$ dalla città $1$ e la sua lunghezza.

    2. Applicare la ricerca locale 2-opt con la regola <strong>first improvement</strong>, partendo dal giro di $NN$.

    3. Applicare la ricerca locale 2-opt con la regola <strong>best improvement</strong>, partendo dal giro di $NN$.

    4. Il valore ottimo è $z(I)=30$. Confrontare i due ottimi locali e il numero di valutazioni delle due regole.

??? soluzione "Soluzione"

    1. - dalla città $1$ la città non visitata più vicina è $3$ ($d_{1,3}=5$);

        - dalla città $3$ la città non visitata più vicina è $6$ ($d_{3,6}=2$);

        - dalla città $6$ la città non visitata più vicina è $4$ ($d_{6,4}=5$);

        - dalla città $4$ la città non visitata più vicina è $5$ ($d_{4,5}=6$);

        - dalla città $5$ la città non visitata più vicina è $2$ ($d_{5,2}=7$);

        - il giro torna alla città $1$ ($d_{2,1}=8$).

        Il giro è $\sigma=(1,3,6,4,5,2)$, di lunghezza $33$.

    2. Iterazione 1: $\sigma=(1,3,6,4,5,2)$, lunghezza $33$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\((i,j)\)</span></th>
        <th>lati tolti</th>
        <th><span class="arithmatex">\(\Delta\)</span></th>
        <th>nuovo giro</th>
        <th>lunghezza</th>
        <th></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\(\{1,3\},\{6,4\}\)</span></td>
        <td><span class="arithmatex">\(6+4-5-5=0\)</span></td>
        <td><span class="arithmatex">\((1,6,3,4,5,2)\)</span></td>
        <td><span class="arithmatex">\(33\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4)\)</span></td>
        <td><span class="arithmatex">\(\{1,3\},\{4,5\}\)</span></td>
        <td><span class="arithmatex">\(6+8-5-6=+3\)</span></td>
        <td><span class="arithmatex">\((1,4,6,3,5,2)\)</span></td>
        <td><span class="arithmatex">\(36\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(\{1,3\},\{5,2\}\)</span></td>
        <td><span class="arithmatex">\(5+6-5-7=-1\)</span></td>
        <td><span class="arithmatex">\((1,5,4,6,3,2)\)</span></td>
        <td><span class="arithmatex">\(32\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(\{3,6\},\{4,5\}\)</span></td>
        <td><span class="arithmatex">\(4+7-2-6=+3\)</span></td>
        <td><span class="arithmatex">\((1,3,4,6,5,2)\)</span></td>
        <td><span class="arithmatex">\(36\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(\{3,6\},\{5,2\}\)</span></td>
        <td><span class="arithmatex">\(8+6-2-7=+5\)</span></td>
        <td><span class="arithmatex">\((1,3,5,4,6,2)\)</span></td>
        <td><span class="arithmatex">\(38\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,6)\)</span></td>
        <td><span class="arithmatex">\(\{3,6\},\{2,1\}\)</span></td>
        <td><span class="arithmatex">\(6+6-2-8=+2\)</span></td>
        <td><span class="arithmatex">\((1,3,2,5,4,6)\)</span></td>
        <td><span class="arithmatex">\(35\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,5)\)</span></td>
        <td><span class="arithmatex">\(\{6,4\},\{5,2\}\)</span></td>
        <td><span class="arithmatex">\(7+7-5-7=+2\)</span></td>
        <td><span class="arithmatex">\((1,3,6,5,4,2)\)</span></td>
        <td><span class="arithmatex">\(35\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,6)\)</span></td>
        <td><span class="arithmatex">\(\{6,4\},\{2,1\}\)</span></td>
        <td><span class="arithmatex">\(6+6-5-8=-1\)</span></td>
        <td><span class="arithmatex">\((1,3,6,2,5,4)\)</span></td>
        <td><span class="arithmatex">\(32\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((4,6)\)</span></td>
        <td><span class="arithmatex">\(\{4,5\},\{2,1\}\)</span></td>
        <td><span class="arithmatex">\(7+5-6-8=-2\)</span></td>
        <td><span class="arithmatex">\((1,3,6,4,2,5)\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td></td>
        </tr>
        </table></div>

        La mossa $(1,5)$ è accettata dopo 3 valutazioni.

        Iterazione 2: $\sigma=(1,5,4,6,3,2)$, lunghezza $32$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\((i,j)\)</span></th>
        <th>lati tolti</th>
        <th><span class="arithmatex">\(\Delta\)</span></th>
        <th>nuovo giro</th>
        <th>lunghezza</th>
        <th></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\(\{1,5\},\{4,6\}\)</span></td>
        <td><span class="arithmatex">\(6+7-5-5=+3\)</span></td>
        <td><span class="arithmatex">\((1,4,5,6,3,2)\)</span></td>
        <td><span class="arithmatex">\(35\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4)\)</span></td>
        <td><span class="arithmatex">\(\{1,5\},\{6,3\}\)</span></td>
        <td><span class="arithmatex">\(6+8-5-2=+7\)</span></td>
        <td><span class="arithmatex">\((1,6,4,5,3,2)\)</span></td>
        <td><span class="arithmatex">\(39\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(\{1,5\},\{3,2\}\)</span></td>
        <td><span class="arithmatex">\(5+7-5-6=+1\)</span></td>
        <td><span class="arithmatex">\((1,3,6,4,5,2)\)</span></td>
        <td><span class="arithmatex">\(33\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(\{5,4\},\{6,3\}\)</span></td>
        <td><span class="arithmatex">\(7+4-6-2=+3\)</span></td>
        <td><span class="arithmatex">\((1,5,6,4,3,2)\)</span></td>
        <td><span class="arithmatex">\(35\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(\{5,4\},\{3,2\}\)</span></td>
        <td><span class="arithmatex">\(8+7-6-6=+3\)</span></td>
        <td><span class="arithmatex">\((1,5,3,6,4,2)\)</span></td>
        <td><span class="arithmatex">\(35\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,6)\)</span></td>
        <td><span class="arithmatex">\(\{5,4\},\{2,1\}\)</span></td>
        <td><span class="arithmatex">\(7+6-6-8=-1\)</span></td>
        <td><span class="arithmatex">\((1,5,2,3,6,4)\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,5)\)</span></td>
        <td><span class="arithmatex">\(\{4,6\},\{3,2\}\)</span></td>
        <td><span class="arithmatex">\(4+6-5-6=-1\)</span></td>
        <td><span class="arithmatex">\((1,5,4,3,6,2)\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,6)\)</span></td>
        <td><span class="arithmatex">\(\{4,6\},\{2,1\}\)</span></td>
        <td><span class="arithmatex">\(7+6-5-8=0\)</span></td>
        <td><span class="arithmatex">\((1,5,4,2,3,6)\)</span></td>
        <td><span class="arithmatex">\(32\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((4,6)\)</span></td>
        <td><span class="arithmatex">\(\{6,3\},\{2,1\}\)</span></td>
        <td><span class="arithmatex">\(6+5-2-8=+1\)</span></td>
        <td><span class="arithmatex">\((1,5,4,6,2,3)\)</span></td>
        <td><span class="arithmatex">\(33\)</span></td>
        <td></td>
        </tr>
        </table></div>

        La mossa $(2,6)$ è accettata dopo 6 valutazioni.

        Iterazione 3: $\sigma=(1,5,2,3,6,4)$, lunghezza $31$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\((i,j)\)</span></th>
        <th>lati tolti</th>
        <th><span class="arithmatex">\(\Delta\)</span></th>
        <th>nuovo giro</th>
        <th>lunghezza</th>
        <th></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\(\{1,5\},\{2,3\}\)</span></td>
        <td><span class="arithmatex">\(8+8-5-6=+5\)</span></td>
        <td><span class="arithmatex">\((1,2,5,3,6,4)\)</span></td>
        <td><span class="arithmatex">\(36\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4)\)</span></td>
        <td><span class="arithmatex">\(\{1,5\},\{3,6\}\)</span></td>
        <td><span class="arithmatex">\(5+7-5-2=+5\)</span></td>
        <td><span class="arithmatex">\((1,3,2,5,6,4)\)</span></td>
        <td><span class="arithmatex">\(36\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(\{1,5\},\{6,4\}\)</span></td>
        <td><span class="arithmatex">\(6+6-5-5=+2\)</span></td>
        <td><span class="arithmatex">\((1,6,3,2,5,4)\)</span></td>
        <td><span class="arithmatex">\(33\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(\{5,2\},\{3,6\}\)</span></td>
        <td><span class="arithmatex">\(8+6-7-2=+5\)</span></td>
        <td><span class="arithmatex">\((1,5,3,2,6,4)\)</span></td>
        <td><span class="arithmatex">\(36\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(\{5,2\},\{6,4\}\)</span></td>
        <td><span class="arithmatex">\(7+7-7-5=+2\)</span></td>
        <td><span class="arithmatex">\((1,5,6,3,2,4)\)</span></td>
        <td><span class="arithmatex">\(33\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,6)\)</span></td>
        <td><span class="arithmatex">\(\{5,2\},\{4,1\}\)</span></td>
        <td><span class="arithmatex">\(6+8-7-6=+1\)</span></td>
        <td><span class="arithmatex">\((1,5,4,6,3,2)\)</span></td>
        <td><span class="arithmatex">\(32\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,5)\)</span></td>
        <td><span class="arithmatex">\(\{2,3\},\{6,4\}\)</span></td>
        <td><span class="arithmatex">\(6+4-6-5=-1\)</span></td>
        <td><span class="arithmatex">\((1,5,2,6,3,4)\)</span></td>
        <td><span class="arithmatex">\(30\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,6)\)</span></td>
        <td><span class="arithmatex">\(\{2,3\},\{4,1\}\)</span></td>
        <td><span class="arithmatex">\(7+5-6-6=0\)</span></td>
        <td><span class="arithmatex">\((1,5,2,4,6,3)\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((4,6)\)</span></td>
        <td><span class="arithmatex">\(\{3,6\},\{4,1\}\)</span></td>
        <td><span class="arithmatex">\(4+6-2-6=+2\)</span></td>
        <td><span class="arithmatex">\((1,5,2,3,4,6)\)</span></td>
        <td><span class="arithmatex">\(33\)</span></td>
        <td></td>
        </tr>
        </table></div>

        La mossa $(3,5)$ è accettata dopo 7 valutazioni.

        Iterazione 4: $\sigma=(1,5,2,6,3,4)$, lunghezza $30$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\((i,j)\)</span></th>
        <th>lati tolti</th>
        <th><span class="arithmatex">\(\Delta\)</span></th>
        <th>nuovo giro</th>
        <th>lunghezza</th>
        <th></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\(\{1,5\},\{2,6\}\)</span></td>
        <td><span class="arithmatex">\(8+7-5-6=+4\)</span></td>
        <td><span class="arithmatex">\((1,2,5,6,3,4)\)</span></td>
        <td><span class="arithmatex">\(34\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4)\)</span></td>
        <td><span class="arithmatex">\(\{1,5\},\{6,3\}\)</span></td>
        <td><span class="arithmatex">\(6+8-5-2=+7\)</span></td>
        <td><span class="arithmatex">\((1,6,2,5,3,4)\)</span></td>
        <td><span class="arithmatex">\(37\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(\{1,5\},\{3,4\}\)</span></td>
        <td><span class="arithmatex">\(5+6-5-4=+2\)</span></td>
        <td><span class="arithmatex">\((1,3,6,2,5,4)\)</span></td>
        <td><span class="arithmatex">\(32\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(\{5,2\},\{6,3\}\)</span></td>
        <td><span class="arithmatex">\(7+6-7-2=+4\)</span></td>
        <td><span class="arithmatex">\((1,5,6,2,3,4)\)</span></td>
        <td><span class="arithmatex">\(34\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(\{5,2\},\{3,4\}\)</span></td>
        <td><span class="arithmatex">\(8+7-7-4=+4\)</span></td>
        <td><span class="arithmatex">\((1,5,3,6,2,4)\)</span></td>
        <td><span class="arithmatex">\(34\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,6)\)</span></td>
        <td><span class="arithmatex">\(\{5,2\},\{4,1\}\)</span></td>
        <td><span class="arithmatex">\(6+8-7-6=+1\)</span></td>
        <td><span class="arithmatex">\((1,5,4,3,6,2)\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,5)\)</span></td>
        <td><span class="arithmatex">\(\{2,6\},\{3,4\}\)</span></td>
        <td><span class="arithmatex">\(6+5-6-4=+1\)</span></td>
        <td><span class="arithmatex">\((1,5,2,3,6,4)\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,6)\)</span></td>
        <td><span class="arithmatex">\(\{2,6\},\{4,1\}\)</span></td>
        <td><span class="arithmatex">\(7+6-6-6=+1\)</span></td>
        <td><span class="arithmatex">\((1,5,2,4,3,6)\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((4,6)\)</span></td>
        <td><span class="arithmatex">\(\{6,3\},\{4,1\}\)</span></td>
        <td><span class="arithmatex">\(5+5-2-6=+2\)</span></td>
        <td><span class="arithmatex">\((1,5,2,6,4,3)\)</span></td>
        <td><span class="arithmatex">\(32\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Nessuna mossa ha $\Delta<0$: $\sigma=(1,5,2,6,3,4)$ è un <strong>ottimo locale</strong> 2-opt (9 valutazioni).

        First improvement esegue 3 mosse, $33\to32\to31\to30$, con 25 valutazioni in totale.

    3. Iterazione 1: $\sigma=(1,3,6,4,5,2)$, lunghezza $33$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\((i,j)\)</span></th>
        <th>lati tolti</th>
        <th><span class="arithmatex">\(\Delta\)</span></th>
        <th>nuovo giro</th>
        <th>lunghezza</th>
        <th></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\(\{1,3\},\{6,4\}\)</span></td>
        <td><span class="arithmatex">\(6+4-5-5=0\)</span></td>
        <td><span class="arithmatex">\((1,6,3,4,5,2)\)</span></td>
        <td><span class="arithmatex">\(33\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4)\)</span></td>
        <td><span class="arithmatex">\(\{1,3\},\{4,5\}\)</span></td>
        <td><span class="arithmatex">\(6+8-5-6=+3\)</span></td>
        <td><span class="arithmatex">\((1,4,6,3,5,2)\)</span></td>
        <td><span class="arithmatex">\(36\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(\{1,3\},\{5,2\}\)</span></td>
        <td><span class="arithmatex">\(5+6-5-7=-1\)</span></td>
        <td><span class="arithmatex">\((1,5,4,6,3,2)\)</span></td>
        <td><span class="arithmatex">\(32\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(\{3,6\},\{4,5\}\)</span></td>
        <td><span class="arithmatex">\(4+7-2-6=+3\)</span></td>
        <td><span class="arithmatex">\((1,3,4,6,5,2)\)</span></td>
        <td><span class="arithmatex">\(36\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(\{3,6\},\{5,2\}\)</span></td>
        <td><span class="arithmatex">\(8+6-2-7=+5\)</span></td>
        <td><span class="arithmatex">\((1,3,5,4,6,2)\)</span></td>
        <td><span class="arithmatex">\(38\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,6)\)</span></td>
        <td><span class="arithmatex">\(\{3,6\},\{2,1\}\)</span></td>
        <td><span class="arithmatex">\(6+6-2-8=+2\)</span></td>
        <td><span class="arithmatex">\((1,3,2,5,4,6)\)</span></td>
        <td><span class="arithmatex">\(35\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,5)\)</span></td>
        <td><span class="arithmatex">\(\{6,4\},\{5,2\}\)</span></td>
        <td><span class="arithmatex">\(7+7-5-7=+2\)</span></td>
        <td><span class="arithmatex">\((1,3,6,5,4,2)\)</span></td>
        <td><span class="arithmatex">\(35\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,6)\)</span></td>
        <td><span class="arithmatex">\(\{6,4\},\{2,1\}\)</span></td>
        <td><span class="arithmatex">\(6+6-5-8=-1\)</span></td>
        <td><span class="arithmatex">\((1,3,6,2,5,4)\)</span></td>
        <td><span class="arithmatex">\(32\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((4,6)\)</span></td>
        <td><span class="arithmatex">\(\{4,5\},\{2,1\}\)</span></td>
        <td><span class="arithmatex">\(7+5-6-8=-2\)</span></td>
        <td><span class="arithmatex">\((1,3,6,4,2,5)\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        </table></div>

        La mossa $(4,6)$ è accettata dopo 9 valutazioni.

        Iterazione 2: $\sigma=(1,3,6,4,2,5)$, lunghezza $31$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\((i,j)\)</span></th>
        <th>lati tolti</th>
        <th><span class="arithmatex">\(\Delta\)</span></th>
        <th>nuovo giro</th>
        <th>lunghezza</th>
        <th></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\(\{1,3\},\{6,4\}\)</span></td>
        <td><span class="arithmatex">\(6+4-5-5=0\)</span></td>
        <td><span class="arithmatex">\((1,6,3,4,2,5)\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4)\)</span></td>
        <td><span class="arithmatex">\(\{1,3\},\{4,2\}\)</span></td>
        <td><span class="arithmatex">\(6+6-5-7=0\)</span></td>
        <td><span class="arithmatex">\((1,4,6,3,2,5)\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(\{1,3\},\{2,5\}\)</span></td>
        <td><span class="arithmatex">\(8+8-5-7=+4\)</span></td>
        <td><span class="arithmatex">\((1,2,4,6,3,5)\)</span></td>
        <td><span class="arithmatex">\(35\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(\{3,6\},\{4,2\}\)</span></td>
        <td><span class="arithmatex">\(4+6-2-7=+1\)</span></td>
        <td><span class="arithmatex">\((1,3,4,6,2,5)\)</span></td>
        <td><span class="arithmatex">\(32\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(\{3,6\},\{2,5\}\)</span></td>
        <td><span class="arithmatex">\(6+7-2-7=+4\)</span></td>
        <td><span class="arithmatex">\((1,3,2,4,6,5)\)</span></td>
        <td><span class="arithmatex">\(35\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,6)\)</span></td>
        <td><span class="arithmatex">\(\{3,6\},\{5,1\}\)</span></td>
        <td><span class="arithmatex">\(8+6-2-5=+7\)</span></td>
        <td><span class="arithmatex">\((1,3,5,2,4,6)\)</span></td>
        <td><span class="arithmatex">\(38\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,5)\)</span></td>
        <td><span class="arithmatex">\(\{6,4\},\{2,5\}\)</span></td>
        <td><span class="arithmatex">\(6+6-5-7=0\)</span></td>
        <td><span class="arithmatex">\((1,3,6,2,4,5)\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,6)\)</span></td>
        <td><span class="arithmatex">\(\{6,4\},\{5,1\}\)</span></td>
        <td><span class="arithmatex">\(7+6-5-5=+3\)</span></td>
        <td><span class="arithmatex">\((1,3,6,5,2,4)\)</span></td>
        <td><span class="arithmatex">\(34\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((4,6)\)</span></td>
        <td><span class="arithmatex">\(\{4,2\},\{5,1\}\)</span></td>
        <td><span class="arithmatex">\(6+8-7-5=+2\)</span></td>
        <td><span class="arithmatex">\((1,3,6,4,5,2)\)</span></td>
        <td><span class="arithmatex">\(33\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Nessuna mossa ha $\Delta<0$: $\sigma=(1,3,6,4,2,5)$ è un <strong>ottimo locale</strong> 2-opt (9 valutazioni).

        Best improvement esegue 1 mossa, $33\to31$, con 18 valutazioni in totale.

    4. First improvement raggiunge un giro di lunghezza $30=z(I)$, un giro <strong>ottimo</strong>, mentre best improvement si ferma in un ottimo locale di lunghezza $31$, il $3.3\%$ sopra l'ottimo. La prima mossa più ripida ($\Delta=-2$) porta in una valle peggiore: best improvement non è sempre migliore di first improvement. First improvement esamina 25 mosse in totale, best improvement 18: qui l'ottimo locale migliore costa più valutazioni, perché first improvement esegue più mosse.

<a id="esercizio-31-9"></a>

!!! esercizio "Esercizio 31.9: Ricerca locale TSP 3"

    $6$ città con le distanze simmetriche

    $$
    \begin{array}{c|cccccc}
    \hline {d_{ij}} & {1} & {2} & {3} & {4} & {5} & {6} \\
    \hline {1} & --- & {7} & {8} & {8} & {9} & {9} \\
    {2} & {7} & --- & {7} & {4} & {9} & {8} \\
    {3} & {8} & {7} & --- & {7} & {3} & {9} \\
    {4} & {8} & {4} & {7} & --- & {5} & {6} \\
    {5} & {9} & {9} & {3} & {5} & --- & {7} \\
    {6} & {9} & {8} & {9} & {6} & {7} & --- \\
    \hline
    \end{array}
    $$

    Un giro $\sigma=(\sigma_1,\dots,\sigma_n)$ tiene la città $1$ in prima posizione. La mossa 2-opt $(i,j)$, per $i=1,\dots,n-2$ e $j=i+2,\dots,n$ (tranne $(1,n)$), esaminata in quest'ordine, toglie i lati $\{\sigma_i,\sigma_{i+1}\}$, $\{\sigma_j,\sigma_{j+1}\}$ (con $\sigma_{n+1}=\sigma_1$), inverte $\sigma_{i+1},\dots,\sigma_j$, e cambia la lunghezza di $\Delta=d_{\sigma_i\sigma_j}+d_{\sigma_{i+1}\sigma_{j+1}}-d_{\sigma_i\sigma_{i+1}}-d_{\sigma_j\sigma_{j+1}}$. Best improvement risolve i pareggi a favore della mossa esaminata per prima. L'euristica nearest neighbour $NN$ risolve i pareggi a favore della città di indice minimo. Una mossa Or-opt con $\ell=1$ prende una città $\sigma_i$ ($i\ge 2$) e la inserisce fra due città consecutive $\sigma_k,\sigma_{k+1}$ non adiacenti a essa ($k\ne i-1,i$); con $p=\sigma_{i-1}$, $q=\sigma_{i+1}$, $s=\sigma_i$, $a=\sigma_k$, $b=\sigma_{k+1}$ cambia la lunghezza di $\Delta=d_{pq}+d_{as}+d_{sb}-d_{ps}-d_{sq}-d_{ab}$. Le mosse sono esaminate per $i=2,\dots,n$ e $k=1,\dots,n$.

    **Domande**

    1. Calcolare il giro di $NN$ dalla città $1$ e la sua lunghezza.

    2. Mostrare che il giro di $NN$ è un ottimo locale 2-opt.

    3. Applicare un'iterazione di best improvement con le mosse Or-opt con $\ell=1$ al giro di $NN$.

    4. Il valore ottimo è $z(I)=35$. Il nuovo giro è ottimo? È un ottimo locale 2-opt? Che cosa mostra questo sulla combinazione dei due intorni?

??? soluzione "Soluzione"

    1. - dalla città $1$ la città non visitata più vicina è $2$ ($d_{1,2}=7$);

        - dalla città $2$ la città non visitata più vicina è $4$ ($d_{2,4}=4$);

        - dalla città $4$ la città non visitata più vicina è $5$ ($d_{4,5}=5$);

        - dalla città $5$ la città non visitata più vicina è $3$ ($d_{5,3}=3$);

        - dalla città $3$ la città non visitata più vicina è $6$ ($d_{3,6}=9$);

        - il giro torna alla città $1$ ($d_{6,1}=9$).

        Il giro è $\sigma=(1,2,4,5,3,6)$, di lunghezza $37$.

    2. Le mosse 2-opt del giro di $NN$ sono

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\((i,j)\)</span></th>
        <th>lati tolti</th>
        <th><span class="arithmatex">\(\Delta\)</span></th>
        <th>nuovo giro</th>
        <th>lunghezza</th>
        <th></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\(\{1,2\},\{4,5\}\)</span></td>
        <td><span class="arithmatex">\(8+9-7-5=+5\)</span></td>
        <td><span class="arithmatex">\((1,4,2,5,3,6)\)</span></td>
        <td><span class="arithmatex">\(42\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4)\)</span></td>
        <td><span class="arithmatex">\(\{1,2\},\{5,3\}\)</span></td>
        <td><span class="arithmatex">\(9+7-7-3=+6\)</span></td>
        <td><span class="arithmatex">\((1,5,4,2,3,6)\)</span></td>
        <td><span class="arithmatex">\(43\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(\{1,2\},\{3,6\}\)</span></td>
        <td><span class="arithmatex">\(8+8-7-9=0\)</span></td>
        <td><span class="arithmatex">\((1,3,5,4,2,6)\)</span></td>
        <td><span class="arithmatex">\(37\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(\{2,4\},\{5,3\}\)</span></td>
        <td><span class="arithmatex">\(9+7-4-3=+9\)</span></td>
        <td><span class="arithmatex">\((1,2,5,4,3,6)\)</span></td>
        <td><span class="arithmatex">\(46\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(\{2,4\},\{3,6\}\)</span></td>
        <td><span class="arithmatex">\(7+6-4-9=0\)</span></td>
        <td><span class="arithmatex">\((1,2,3,5,4,6)\)</span></td>
        <td><span class="arithmatex">\(37\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,6)\)</span></td>
        <td><span class="arithmatex">\(\{2,4\},\{6,1\}\)</span></td>
        <td><span class="arithmatex">\(8+8-4-9=+3\)</span></td>
        <td><span class="arithmatex">\((1,2,6,3,5,4)\)</span></td>
        <td><span class="arithmatex">\(40\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,5)\)</span></td>
        <td><span class="arithmatex">\(\{4,5\},\{3,6\}\)</span></td>
        <td><span class="arithmatex">\(7+7-5-9=0\)</span></td>
        <td><span class="arithmatex">\((1,2,4,3,5,6)\)</span></td>
        <td><span class="arithmatex">\(37\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,6)\)</span></td>
        <td><span class="arithmatex">\(\{4,5\},\{6,1\}\)</span></td>
        <td><span class="arithmatex">\(6+9-5-9=+1\)</span></td>
        <td><span class="arithmatex">\((1,2,4,6,3,5)\)</span></td>
        <td><span class="arithmatex">\(38\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((4,6)\)</span></td>
        <td><span class="arithmatex">\(\{5,3\},\{6,1\}\)</span></td>
        <td><span class="arithmatex">\(7+8-3-9=+3\)</span></td>
        <td><span class="arithmatex">\((1,2,4,5,6,3)\)</span></td>
        <td><span class="arithmatex">\(40\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Tutte le mosse hanno $\Delta\ge 0$: il giro di $NN$ è un <strong>ottimo locale</strong> 2-opt.

    3. Le mosse Or-opt con $\ell=1$ del giro di $NN$ sono

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>città <span class="arithmatex">\(s\)</span></th>
        <th>fra</th>
        <th><span class="arithmatex">\(\Delta\)</span></th>
        <th>lunghezza</th>
        <th></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4,5\)</span></td>
        <td><span class="arithmatex">\(8+4+9-7-4-5=+5\)</span></td>
        <td><span class="arithmatex">\(42\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5,3\)</span></td>
        <td><span class="arithmatex">\(8+9+7-7-4-3=+10\)</span></td>
        <td><span class="arithmatex">\(47\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3,6\)</span></td>
        <td><span class="arithmatex">\(8+7+8-7-4-9=+3\)</span></td>
        <td><span class="arithmatex">\(40\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6,1\)</span></td>
        <td><span class="arithmatex">\(8+8+7-7-4-9=+3\)</span></td>
        <td><span class="arithmatex">\(40\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1,2\)</span></td>
        <td><span class="arithmatex">\(9+8+4-4-5-7=+5\)</span></td>
        <td><span class="arithmatex">\(42\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5,3\)</span></td>
        <td><span class="arithmatex">\(9+5+7-4-5-3=+9\)</span></td>
        <td><span class="arithmatex">\(46\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3,6\)</span></td>
        <td><span class="arithmatex">\(9+7+6-4-5-9=+4\)</span></td>
        <td><span class="arithmatex">\(41\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6,1\)</span></td>
        <td><span class="arithmatex">\(9+6+8-4-5-9=+5\)</span></td>
        <td><span class="arithmatex">\(42\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(1,2\)</span></td>
        <td><span class="arithmatex">\(7+9+9-5-3-7=+10\)</span></td>
        <td><span class="arithmatex">\(47\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(2,4\)</span></td>
        <td><span class="arithmatex">\(7+9+5-5-3-4=+9\)</span></td>
        <td><span class="arithmatex">\(46\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(3,6\)</span></td>
        <td><span class="arithmatex">\(7+3+7-5-3-9=0\)</span></td>
        <td><span class="arithmatex">\(37\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(6,1\)</span></td>
        <td><span class="arithmatex">\(7+7+9-5-3-9=+6\)</span></td>
        <td><span class="arithmatex">\(43\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1,2\)</span></td>
        <td><span class="arithmatex">\(7+8+7-3-9-7=+3\)</span></td>
        <td><span class="arithmatex">\(40\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2,4\)</span></td>
        <td><span class="arithmatex">\(7+7+7-3-9-4=+5\)</span></td>
        <td><span class="arithmatex">\(42\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4,5\)</span></td>
        <td><span class="arithmatex">\(7+7+3-3-9-5=0\)</span></td>
        <td><span class="arithmatex">\(37\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6,1\)</span></td>
        <td><span class="arithmatex">\(7+9+8-3-9-9=+3\)</span></td>
        <td><span class="arithmatex">\(40\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(1,2\)</span></td>
        <td><span class="arithmatex">\(8+9+8-9-9-7=0\)</span></td>
        <td><span class="arithmatex">\(37\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2,4\)</span></td>
        <td><span class="arithmatex">\(8+8+6-9-9-4=0\)</span></td>
        <td><span class="arithmatex">\(37\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4,5\)</span></td>
        <td><span class="arithmatex">\(8+6+7-9-9-5=-2\)</span></td>
        <td><span class="arithmatex">\(35\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(5,3\)</span></td>
        <td><span class="arithmatex">\(8+7+9-9-9-3=+3\)</span></td>
        <td><span class="arithmatex">\(40\)</span></td>
        <td></td>
        </tr>
        </table></div>

        La mossa migliore inserisce la città $6$ fra le città $4$ e $5$, con $\Delta=-2$: il nuovo giro è $(1,2,4,6,5,3)$, di lunghezza $35$.

    4. Il nuovo giro ha lunghezza $35=z(I)$: è <strong>ottimo</strong>, quindi anche un ottimo locale 2-opt. Il giro di $NN$ è un ottimo locale per 2-opt ma non per Or-opt: una variable neighbourhood descent con $N_1=$ 2-opt e $N_2=$ Or-opt si fermerebbe solo in un giro che è un ottimo locale per entrambi, e qui trova l'ottimo.

## $P\|C_{\max}$

<a id="esercizio-31-10"></a>

!!! esercizio "Esercizio 31.10: Ricerca locale $P\,||\,C_{\max}$ 1"

    $m=3$ macchine identiche e $6$ lavori con tempi di lavorazione

    $$
    \begin{array}{l|cccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} \\[1ex]
    \hline {t_j} & {5} & {7} & {3} & {4} & {4} & {9} \\
    \hline
    \end{array}
    $$

    Una <em>move</em> riassegna un lavoro $j$ a un'altra macchina $h$ (esaminata per $j=1,\dots,n$ e $h=1,\dots,m$); uno <em>swap</em> scambia le macchine di due lavori $j<k$ su macchine diverse con $t_j\ne t_k$. Le ricerche locali usano la regola best improvement, con i pareggi risolti a favore della mossa esaminata per prima.

    **Domande**

    1. Calcolare lo schedule del list scheduling ($LIST$) con i lavori nell'ordine $1,2,\dots,n$, e il suo makespan.

    2. Applicare la ricerca locale move con il makespan come obiettivo, partendo dallo schedule di $LIST$.

    3. Calcolare il lower bound $\max\{\max_j t_j,\lceil\sum_j t_j/m\rceil\}$.

    4. Dimostrare che lo schedule finale è ottimo.

??? soluzione "Soluzione"

    1. - il lavoro $1$ ($t_{1}=5$) va sulla macchina $1$, la meno carica (carico $0$), che arriva a $5$;

        - il lavoro $2$ ($t_{2}=7$) va sulla macchina $2$, la meno carica (carico $0$), che arriva a $7$;

        - il lavoro $3$ ($t_{3}=3$) va sulla macchina $3$, la meno carica (carico $0$), che arriva a $3$;

        - il lavoro $4$ ($t_{4}=4$) va sulla macchina $3$, la meno carica (carico $3$), che arriva a $7$;

        - il lavoro $5$ ($t_{5}=4$) va sulla macchina $1$, la meno carica (carico $5$), che arriva a $9$;

        - il lavoro $6$ ($t_{6}=9$) va sulla macchina $2$, la meno carica (carico $7$), che arriva a $16$;

        Lo schedule è $J_{1}=\{1,5\}, J_{2}=\{2,6\}, J_{3}=\{3,4\}$, con carichi $(9,16,7)$ e $C_{\max}=16$.

    2. Iterazione 1: $J_{1}=\{1,5\}, J_{2}=\{2,6\}, J_{3}=\{3,4\}$, carichi $(9,16,7)$, $C_{\max}=16$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th><span class="arithmatex">\(C_{\max}\)</span></th>
        <th></th>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
        <td><span class="arithmatex">\((4,21,7)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
        <td><span class="arithmatex">\((4,16,12)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
        <td><span class="arithmatex">\((16,9,7)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
        <td><span class="arithmatex">\((9,9,14)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_3\to M_1\)</span></td>
        <td><span class="arithmatex">\((12,16,4)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_3\to M_2\)</span></td>
        <td><span class="arithmatex">\((9,19,4)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_3\to M_1\)</span></td>
        <td><span class="arithmatex">\((13,16,3)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_3\to M_2\)</span></td>
        <td><span class="arithmatex">\((9,20,3)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
        <td><span class="arithmatex">\((5,20,7)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
        <td><span class="arithmatex">\((5,16,11)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
        <td><span class="arithmatex">\((18,7,7)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
        <td><span class="arithmatex">\((9,7,16)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Si accetta la mossa indicata.

        Iterazione 2: $J_{1}=\{1,5\}, J_{2}=\{6\}, J_{3}=\{2,3,4\}$, carichi $(9,9,14)$, $C_{\max}=14$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th><span class="arithmatex">\(C_{\max}\)</span></th>
        <th></th>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
        <td><span class="arithmatex">\((4,14,14)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
        <td><span class="arithmatex">\((4,9,19)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\(M_3\to M_1\)</span></td>
        <td><span class="arithmatex">\((16,9,7)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\(M_3\to M_2\)</span></td>
        <td><span class="arithmatex">\((9,16,7)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_3\to M_1\)</span></td>
        <td><span class="arithmatex">\((12,9,11)\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_3\to M_2\)</span></td>
        <td><span class="arithmatex">\((9,12,11)\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_3\to M_1\)</span></td>
        <td><span class="arithmatex">\((13,9,10)\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_3\to M_2\)</span></td>
        <td><span class="arithmatex">\((9,13,10)\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
        <td><span class="arithmatex">\((5,13,14)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
        <td><span class="arithmatex">\((5,9,18)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
        <td><span class="arithmatex">\((18,0,14)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
        <td><span class="arithmatex">\((9,0,23)\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Si accetta la mossa indicata.

        Iterazione 3: $J_{1}=\{1,3,5\}, J_{2}=\{6\}, J_{3}=\{2,4\}$, carichi $(12,9,11)$, $C_{\max}=12$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th><span class="arithmatex">\(C_{\max}\)</span></th>
        <th></th>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
        <td><span class="arithmatex">\((7,14,11)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
        <td><span class="arithmatex">\((7,9,16)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\(M_3\to M_1\)</span></td>
        <td><span class="arithmatex">\((19,9,4)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\(M_3\to M_2\)</span></td>
        <td><span class="arithmatex">\((12,16,4)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
        <td><span class="arithmatex">\((9,12,11)\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
        <td><span class="arithmatex">\((9,9,14)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_3\to M_1\)</span></td>
        <td><span class="arithmatex">\((16,9,7)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_3\to M_2\)</span></td>
        <td><span class="arithmatex">\((12,13,7)\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
        <td><span class="arithmatex">\((8,13,11)\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
        <td><span class="arithmatex">\((8,9,15)\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
        <td><span class="arithmatex">\((21,0,11)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
        <td><span class="arithmatex">\((12,0,20)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Nessuna mossa è migliorante: <strong>ottimo locale</strong>.

        La ricerca esegue 2 mosse, $16\to14\to12$, e si ferma in $J_{1}=\{1,3,5\}, J_{2}=\{6\}, J_{3}=\{2,4\}$.

    3. Il bound è $\max\{9,\lceil 32/3\rceil\}=11$.

    4. Il bound $11$ non è raggiunto, ma un makespan di $11$ è impossibile. Il lavoro $6$ ($t_{6}=9$) può condividere la sua macchina solo con lavori di tempo totale al più $11-9=2$, e ogni altro lavoro ha $t_j\ge 3$: la sua macchina contiene solo il lavoro $6$. Gli altri $5$ lavori, di tempo totale $32-9=23$, dovrebbero stare su due macchine di carico al più $11$, cioè al più $22$: impossibile. Quindi $z(I)\ge 12$, e lo schedule finale, con $C_{\max}=12$, è <strong>ottimo</strong>.

<a id="esercizio-31-11"></a>

!!! esercizio "Esercizio 31.11: Ricerca locale $P\,||\,C_{\max}$ 2"

    $m=3$ macchine identiche e $7$ lavori con tempi di lavorazione

    $$
    \begin{array}{l|ccccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} & {j=7} \\[1ex]
    \hline {t_j} & {8} & {4} & {6} & {7} & {5} & {9} & {8} \\
    \hline
    \end{array}
    $$

    Una <em>move</em> riassegna un lavoro $j$ a un'altra macchina $h$ (esaminata per $j=1,\dots,n$ e $h=1,\dots,m$); uno <em>swap</em> scambia le macchine di due lavori $j<k$ su macchine diverse con $t_j\ne t_k$. Le ricerche locali usano la regola best improvement, con i pareggi risolti a favore della mossa esaminata per prima.

    **Domande**

    1. Calcolare lo schedule di $LPT$ (pareggi risolti con l'indice minimo) e il suo makespan.

    2. Mostrare che lo schedule di $LPT$ è un ottimo locale per l'intorno move.

    3. Applicare la ricerca locale swap con il makespan come obiettivo, partendo dallo schedule di $LPT$.

    4. Calcolare il lower bound $\lceil\sum_j t_j/m\rceil$ e concludere. Che cosa mostra l'esercizio?

??? soluzione "Soluzione"

    1. I lavori in ordine di tempo non crescente sono $(6,1,7,4,3,5,2)$.

        - il lavoro $6$ ($t_{6}=9$) va sulla macchina $1$, la meno carica (carico $0$), che arriva a $9$;

        - il lavoro $1$ ($t_{1}=8$) va sulla macchina $2$, la meno carica (carico $0$), che arriva a $8$;

        - il lavoro $7$ ($t_{7}=8$) va sulla macchina $3$, la meno carica (carico $0$), che arriva a $8$;

        - il lavoro $4$ ($t_{4}=7$) va sulla macchina $2$, la meno carica (carico $8$), che arriva a $15$;

        - il lavoro $3$ ($t_{3}=6$) va sulla macchina $3$, la meno carica (carico $8$), che arriva a $14$;

        - il lavoro $5$ ($t_{5}=5$) va sulla macchina $1$, la meno carica (carico $9$), che arriva a $14$;

        - il lavoro $2$ ($t_{2}=4$) va sulla macchina $1$, la meno carica (carico $14$), che arriva a $18$;

        Lo schedule è $J_{1}=\{2,5,6\}, J_{2}=\{1,4\}, J_{3}=\{3,7\}$, con carichi $(18,15,14)$ e $C_{\max}=18$.

    2. Iterazione 1: $J_{1}=\{2,5,6\}, J_{2}=\{1,4\}, J_{3}=\{3,7\}$, carichi $(18,15,14)$, $C_{\max}=18$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th><span class="arithmatex">\(C_{\max}\)</span></th>
        <th></th>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
        <td><span class="arithmatex">\((26,7,14)\)</span></td>
        <td><span class="arithmatex">\(26\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
        <td><span class="arithmatex">\((18,7,22)\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
        <td><span class="arithmatex">\((14,19,14)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
        <td><span class="arithmatex">\((14,15,18)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_3\to M_1\)</span></td>
        <td><span class="arithmatex">\((24,15,8)\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_3\to M_2\)</span></td>
        <td><span class="arithmatex">\((18,21,8)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
        <td><span class="arithmatex">\((25,8,14)\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
        <td><span class="arithmatex">\((18,8,21)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
        <td><span class="arithmatex">\((13,20,14)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
        <td><span class="arithmatex">\((13,15,19)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
        <td><span class="arithmatex">\((9,24,14)\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
        <td><span class="arithmatex">\((9,15,23)\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(7\)</span>: <span class="arithmatex">\(M_3\to M_1\)</span></td>
        <td><span class="arithmatex">\((26,15,6)\)</span></td>
        <td><span class="arithmatex">\(26\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(7\)</span>: <span class="arithmatex">\(M_3\to M_2\)</span></td>
        <td><span class="arithmatex">\((18,23,6)\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Nessuna mossa è migliorante: <strong>ottimo locale</strong>.

        Lo schedule di $LPT$ è un <strong>ottimo locale per move</strong>, con $C_{\max}=18$.

    3. Iterazione 1: $J_{1}=\{2,5,6\}, J_{2}=\{1,4\}, J_{3}=\{3,7\}$, carichi $(18,15,14)$, $C_{\max}=18$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>swap</th>
        <th>carichi</th>
        <th><span class="arithmatex">\(C_{\max}\)</span></th>
        <th></th>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(1,2\)</span> (<span class="arithmatex">\(M_2,M_1\)</span>)</td>
        <td><span class="arithmatex">\((22,11,14)\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(1,3\)</span> (<span class="arithmatex">\(M_2,M_3\)</span>)</td>
        <td><span class="arithmatex">\((18,13,16)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(1,5\)</span> (<span class="arithmatex">\(M_2,M_1\)</span>)</td>
        <td><span class="arithmatex">\((21,12,14)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(1,6\)</span> (<span class="arithmatex">\(M_2,M_1\)</span>)</td>
        <td><span class="arithmatex">\((17,16,14)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(2,3\)</span> (<span class="arithmatex">\(M_1,M_3\)</span>)</td>
        <td><span class="arithmatex">\((20,15,12)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(2,4\)</span> (<span class="arithmatex">\(M_1,M_2\)</span>)</td>
        <td><span class="arithmatex">\((21,12,14)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(2,7\)</span> (<span class="arithmatex">\(M_1,M_3\)</span>)</td>
        <td><span class="arithmatex">\((22,15,10)\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(3,4\)</span> (<span class="arithmatex">\(M_3,M_2\)</span>)</td>
        <td><span class="arithmatex">\((18,14,15)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(3,5\)</span> (<span class="arithmatex">\(M_3,M_1\)</span>)</td>
        <td><span class="arithmatex">\((19,15,13)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(3,6\)</span> (<span class="arithmatex">\(M_3,M_1\)</span>)</td>
        <td><span class="arithmatex">\((15,15,17)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(4,5\)</span> (<span class="arithmatex">\(M_2,M_1\)</span>)</td>
        <td><span class="arithmatex">\((20,13,14)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(4,6\)</span> (<span class="arithmatex">\(M_2,M_1\)</span>)</td>
        <td><span class="arithmatex">\((16,17,14)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(4,7\)</span> (<span class="arithmatex">\(M_2,M_3\)</span>)</td>
        <td><span class="arithmatex">\((18,16,13)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(5,7\)</span> (<span class="arithmatex">\(M_1,M_3\)</span>)</td>
        <td><span class="arithmatex">\((21,15,11)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(6,7\)</span> (<span class="arithmatex">\(M_1,M_3\)</span>)</td>
        <td><span class="arithmatex">\((17,15,15)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Si accetta lo swap indicato.

        Iterazione 2: $J_{1}=\{1,2,5\}, J_{2}=\{4,6\}, J_{3}=\{3,7\}$, carichi $(17,16,14)$, $C_{\max}=17$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>swap</th>
        <th>carichi</th>
        <th><span class="arithmatex">\(C_{\max}\)</span></th>
        <th></th>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(1,3\)</span> (<span class="arithmatex">\(M_1,M_3\)</span>)</td>
        <td><span class="arithmatex">\((15,16,16)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(1,4\)</span> (<span class="arithmatex">\(M_1,M_2\)</span>)</td>
        <td><span class="arithmatex">\((16,17,14)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(1,6\)</span> (<span class="arithmatex">\(M_1,M_2\)</span>)</td>
        <td><span class="arithmatex">\((18,15,14)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(2,3\)</span> (<span class="arithmatex">\(M_1,M_3\)</span>)</td>
        <td><span class="arithmatex">\((19,16,12)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(2,4\)</span> (<span class="arithmatex">\(M_1,M_2\)</span>)</td>
        <td><span class="arithmatex">\((20,13,14)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(2,6\)</span> (<span class="arithmatex">\(M_1,M_2\)</span>)</td>
        <td><span class="arithmatex">\((22,11,14)\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(2,7\)</span> (<span class="arithmatex">\(M_1,M_3\)</span>)</td>
        <td><span class="arithmatex">\((21,16,10)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(3,4\)</span> (<span class="arithmatex">\(M_3,M_2\)</span>)</td>
        <td><span class="arithmatex">\((17,15,15)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(3,5\)</span> (<span class="arithmatex">\(M_3,M_1\)</span>)</td>
        <td><span class="arithmatex">\((18,16,13)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(3,6\)</span> (<span class="arithmatex">\(M_3,M_2\)</span>)</td>
        <td><span class="arithmatex">\((17,13,17)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(4,5\)</span> (<span class="arithmatex">\(M_2,M_1\)</span>)</td>
        <td><span class="arithmatex">\((19,14,14)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(4,7\)</span> (<span class="arithmatex">\(M_2,M_3\)</span>)</td>
        <td><span class="arithmatex">\((17,17,13)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(5,6\)</span> (<span class="arithmatex">\(M_1,M_2\)</span>)</td>
        <td><span class="arithmatex">\((21,12,14)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(5,7\)</span> (<span class="arithmatex">\(M_1,M_3\)</span>)</td>
        <td><span class="arithmatex">\((20,16,11)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(6,7\)</span> (<span class="arithmatex">\(M_2,M_3\)</span>)</td>
        <td><span class="arithmatex">\((17,15,15)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Si accetta lo swap indicato.

        Iterazione 3: $J_{1}=\{2,3,5\}, J_{2}=\{4,6\}, J_{3}=\{1,7\}$, carichi $(15,16,16)$, $C_{\max}=16$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>swap</th>
        <th>carichi</th>
        <th><span class="arithmatex">\(C_{\max}\)</span></th>
        <th></th>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(1,2\)</span> (<span class="arithmatex">\(M_3,M_1\)</span>)</td>
        <td><span class="arithmatex">\((19,16,12)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(1,3\)</span> (<span class="arithmatex">\(M_3,M_1\)</span>)</td>
        <td><span class="arithmatex">\((17,16,14)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(1,4\)</span> (<span class="arithmatex">\(M_3,M_2\)</span>)</td>
        <td><span class="arithmatex">\((15,17,15)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(1,5\)</span> (<span class="arithmatex">\(M_3,M_1\)</span>)</td>
        <td><span class="arithmatex">\((18,16,13)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(1,6\)</span> (<span class="arithmatex">\(M_3,M_2\)</span>)</td>
        <td><span class="arithmatex">\((15,15,17)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(2,4\)</span> (<span class="arithmatex">\(M_1,M_2\)</span>)</td>
        <td><span class="arithmatex">\((18,13,16)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(2,6\)</span> (<span class="arithmatex">\(M_1,M_2\)</span>)</td>
        <td><span class="arithmatex">\((20,11,16)\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(2,7\)</span> (<span class="arithmatex">\(M_1,M_3\)</span>)</td>
        <td><span class="arithmatex">\((19,16,12)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(3,4\)</span> (<span class="arithmatex">\(M_1,M_2\)</span>)</td>
        <td><span class="arithmatex">\((16,15,16)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(3,6\)</span> (<span class="arithmatex">\(M_1,M_2\)</span>)</td>
        <td><span class="arithmatex">\((18,13,16)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(3,7\)</span> (<span class="arithmatex">\(M_1,M_3\)</span>)</td>
        <td><span class="arithmatex">\((17,16,14)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(4,5\)</span> (<span class="arithmatex">\(M_2,M_1\)</span>)</td>
        <td><span class="arithmatex">\((17,14,16)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(4,7\)</span> (<span class="arithmatex">\(M_2,M_3\)</span>)</td>
        <td><span class="arithmatex">\((15,17,15)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(5,6\)</span> (<span class="arithmatex">\(M_1,M_2\)</span>)</td>
        <td><span class="arithmatex">\((19,12,16)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(5,7\)</span> (<span class="arithmatex">\(M_1,M_3\)</span>)</td>
        <td><span class="arithmatex">\((18,16,13)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavori <span class="arithmatex">\(6,7\)</span> (<span class="arithmatex">\(M_2,M_3\)</span>)</td>
        <td><span class="arithmatex">\((15,15,17)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Nessuno swap è migliorante: <strong>ottimo locale</strong>.

        La ricerca locale swap esegue 2 mosse, $18\to17\to16$, e si ferma in $J_{1}=\{2,3,5\}, J_{2}=\{4,6\}, J_{3}=\{1,7\}$.

    4. Il bound è $\lceil 47/3\rceil=16$, raggiunto dallo schedule finale: è <strong>ottimo</strong>. Lo schedule di $LPT$ è un ottimo locale per move e non per swap: l'ottimo locale <strong>dipende dall'intorno</strong>.

<a id="esercizio-31-12"></a>

!!! esercizio "Esercizio 31.12: Ricerca locale $P\,||\,C_{\max}$ 3"

    $m=3$ macchine identiche e $6$ lavori con tempi di lavorazione

    $$
    \begin{array}{l|cccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} \\[1ex]
    \hline {t_j} & {5} & {5} & {7} & {9} & {2} & {7} \\
    \hline
    \end{array}
    $$

    Una <em>move</em> riassegna un lavoro $j$ a un'altra macchina $h$ (esaminata per $j=1,\dots,n$ e $h=1,\dots,m$); uno <em>swap</em> scambia le macchine di due lavori $j<k$ su macchine diverse con $t_j\ne t_k$. Le ricerche locali usano la regola best improvement, con i pareggi risolti a favore della mossa esaminata per prima.

    **Domande**

    1. Calcolare lo schedule del list scheduling ($LIST$) con i lavori nell'ordine $1,2,\dots,n$, e il suo makespan. Quante macchine sono critiche?

    2. Applicare la ricerca locale move con il makespan come obiettivo, partendo dallo schedule di $LIST$. Perché si ferma?

    3. Applicare la ricerca locale move con l'obiettivo ausiliario $\sum_h L_h^2$ (da minimizzare), partendo dallo schedule di $LIST$.

    4. Calcolare il lower bound $\max\{\max_j t_j,\lceil\sum_j t_j/m\rceil\}$ e concludere.

??? soluzione "Soluzione"

    1. - il lavoro $1$ ($t_{1}=5$) va sulla macchina $1$, la meno carica (carico $0$), che arriva a $5$;

        - il lavoro $2$ ($t_{2}=5$) va sulla macchina $2$, la meno carica (carico $0$), che arriva a $5$;

        - il lavoro $3$ ($t_{3}=7$) va sulla macchina $3$, la meno carica (carico $0$), che arriva a $7$;

        - il lavoro $4$ ($t_{4}=9$) va sulla macchina $1$, la meno carica (carico $5$), che arriva a $14$;

        - il lavoro $5$ ($t_{5}=2$) va sulla macchina $2$, la meno carica (carico $5$), che arriva a $7$;

        - il lavoro $6$ ($t_{6}=7$) va sulla macchina $2$, la meno carica (carico $7$), che arriva a $14$;

        Lo schedule è $J_{1}=\{1,4\}, J_{2}=\{2,5,6\}, J_{3}=\{3\}$, con carichi $(14,14,7)$ e $C_{\max}=14$: 2 macchine sono critiche.

    2. Iterazione 1: $J_{1}=\{1,4\}, J_{2}=\{2,5,6\}, J_{3}=\{3\}$, carichi $(14,14,7)$, $C_{\max}=14$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th><span class="arithmatex">\(C_{\max}\)</span></th>
        <th></th>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
        <td><span class="arithmatex">\((9,19,7)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
        <td><span class="arithmatex">\((9,14,12)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
        <td><span class="arithmatex">\((19,9,7)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
        <td><span class="arithmatex">\((14,9,12)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_3\to M_1\)</span></td>
        <td><span class="arithmatex">\((21,14,0)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_3\to M_2\)</span></td>
        <td><span class="arithmatex">\((14,21,0)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
        <td><span class="arithmatex">\((5,23,7)\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
        <td><span class="arithmatex">\((5,14,16)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
        <td><span class="arithmatex">\((16,12,7)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
        <td><span class="arithmatex">\((14,12,9)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
        <td><span class="arithmatex">\((21,7,7)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
        <td><span class="arithmatex">\((14,7,14)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Nessuna mossa è migliorante: <strong>ottimo locale</strong>.

        Due macchine hanno carico $14$. Una move cambia solo due carichi, e abbassa il makespan solo se parte dall'unica macchina critica: qui nessuna mossa può diminuire entrambi i carichi critici, quindi lo schedule di $LIST$ è un ottimo locale. Diverse mosse mantengono $C_{\max}=14$: la ricerca è su un <strong>plateau</strong>.

    3. Iterazione 1: $J_{1}=\{1,4\}, J_{2}=\{2,5,6\}, J_{3}=\{3\}$, carichi $(14,14,7)$, $C_{\max}=14$, $\sum_hL_h^2=441$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th><span class="arithmatex">\(C_{\max}\)</span></th>
        <th><span class="arithmatex">\(\sum_hL_h^2\)</span></th>
        <th></th>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
        <td><span class="arithmatex">\((9,19,7)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td><span class="arithmatex">\(491\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
        <td><span class="arithmatex">\((9,14,12)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(421\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
        <td><span class="arithmatex">\((19,9,7)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td><span class="arithmatex">\(491\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
        <td><span class="arithmatex">\((14,9,12)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(421\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_3\to M_1\)</span></td>
        <td><span class="arithmatex">\((21,14,0)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td><span class="arithmatex">\(637\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_3\to M_2\)</span></td>
        <td><span class="arithmatex">\((14,21,0)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td><span class="arithmatex">\(637\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
        <td><span class="arithmatex">\((5,23,7)\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td><span class="arithmatex">\(603\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
        <td><span class="arithmatex">\((5,14,16)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(477\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
        <td><span class="arithmatex">\((16,12,7)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(449\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
        <td><span class="arithmatex">\((14,12,9)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(421\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
        <td><span class="arithmatex">\((21,7,7)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td><span class="arithmatex">\(539\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
        <td><span class="arithmatex">\((14,7,14)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(441\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Si accetta la mossa indicata.

        Iterazione 2: $J_{1}=\{4\}, J_{2}=\{2,5,6\}, J_{3}=\{1,3\}$, carichi $(9,14,12)$, $C_{\max}=14$, $\sum_hL_h^2=421$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th><span class="arithmatex">\(C_{\max}\)</span></th>
        <th><span class="arithmatex">\(\sum_hL_h^2\)</span></th>
        <th></th>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\(M_3\to M_1\)</span></td>
        <td><span class="arithmatex">\((14,14,7)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(441\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\(M_3\to M_2\)</span></td>
        <td><span class="arithmatex">\((9,19,7)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td><span class="arithmatex">\(491\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
        <td><span class="arithmatex">\((14,9,12)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(421\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
        <td><span class="arithmatex">\((9,9,17)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td><span class="arithmatex">\(451\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_3\to M_1\)</span></td>
        <td><span class="arithmatex">\((16,14,5)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(477\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_3\to M_2\)</span></td>
        <td><span class="arithmatex">\((9,21,5)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td><span class="arithmatex">\(547\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
        <td><span class="arithmatex">\((0,23,12)\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td><span class="arithmatex">\(673\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
        <td><span class="arithmatex">\((0,14,21)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td><span class="arithmatex">\(637\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
        <td><span class="arithmatex">\((11,12,12)\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(409\)</span></td>
        <td><span class="arithmatex">\(\leftarrow\)</span></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
        <td><span class="arithmatex">\((9,12,14)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(421\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
        <td><span class="arithmatex">\((16,7,12)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(449\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
        <td><span class="arithmatex">\((9,7,19)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td><span class="arithmatex">\(491\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Si accetta la mossa indicata.

        Iterazione 3: $J_{1}=\{4,5\}, J_{2}=\{2,6\}, J_{3}=\{1,3\}$, carichi $(11,12,12)$, $C_{\max}=12$, $\sum_hL_h^2=409$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th><span class="arithmatex">\(C_{\max}\)</span></th>
        <th><span class="arithmatex">\(\sum_hL_h^2\)</span></th>
        <th></th>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\(M_3\to M_1\)</span></td>
        <td><span class="arithmatex">\((16,12,7)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(449\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(1\)</span>: <span class="arithmatex">\(M_3\to M_2\)</span></td>
        <td><span class="arithmatex">\((11,17,7)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td><span class="arithmatex">\(459\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
        <td><span class="arithmatex">\((16,7,12)\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(449\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(2\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
        <td><span class="arithmatex">\((11,7,17)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td><span class="arithmatex">\(459\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_3\to M_1\)</span></td>
        <td><span class="arithmatex">\((18,12,5)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(493\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(3\)</span>: <span class="arithmatex">\(M_3\to M_2\)</span></td>
        <td><span class="arithmatex">\((11,19,5)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td><span class="arithmatex">\(507\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
        <td><span class="arithmatex">\((2,21,12)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td><span class="arithmatex">\(589\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(4\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
        <td><span class="arithmatex">\((2,12,21)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        <td><span class="arithmatex">\(589\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_1\to M_2\)</span></td>
        <td><span class="arithmatex">\((9,14,12)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(421\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(5\)</span>: <span class="arithmatex">\(M_1\to M_3\)</span></td>
        <td><span class="arithmatex">\((9,12,14)\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(421\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_2\to M_1\)</span></td>
        <td><span class="arithmatex">\((18,5,12)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(493\)</span></td>
        <td></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(6\)</span>: <span class="arithmatex">\(M_2\to M_3\)</span></td>
        <td><span class="arithmatex">\((11,5,19)\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        <td><span class="arithmatex">\(507\)</span></td>
        <td></td>
        </tr>
        </table></div>

        Nessuna mossa è migliorante: <strong>ottimo locale</strong>.

        La ricerca esegue 2 mosse, con makespan $14\to14\to12$ e $\sum_hL_h^2$: $441\to421\to409$. La prima mossa non cambia il makespan, ma prepara la seconda.

    4. Il bound è $\max\{9,\lceil 35/3\rceil\}=12$, raggiunto dallo schedule finale: è <strong>ottimo</strong>. L'obiettivo ausiliario dà una pendenza al plateau del makespan.
