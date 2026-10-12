---
title: "Esercizi · Euristiche costruttive"
---

# Esercizi · Euristiche costruttive

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 30** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 30: Euristiche costruttive](../algoritmi-euristici/constructive-heuristics/index.md) · [:material-file-pdf-box: Eserciziario, volume 4 (PDF)](../pdf/esercizi-4-algoritmi-euristici.pdf)

</div>

## Zaino: ordinamenti degli oggetti

<a id="esercizio-30-1"></a>

!!! esercizio "Esercizio 30.1: Ordinamenti greedy per il KP 1"

    Consideriamo uno zaino di capacità $c=9$ e un insieme $\mathscr{I}=\{1,\dots,5\}$ di $5$ oggetti ($n=5$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\[1ex]
    \hline {p_j} & {4} & {15} & {11} & {8} & {2} \\[1ex]
    {w_j} & {3} & {8} & {7} & {2} & {5} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Ordinare gli oggetti per profitto non crescente, per peso non decrescente e per efficienza non crescente $\frac{p_j}{w_j}$ (pareggi per indice).

    2. Applicare l'algoritmo greedy con ciascuno dei tre ordinamenti ($GR_p$, $GR_w$, $GR$), mostrando la capacità residua $rc$ dopo ogni passo, e fornire le tre soluzioni e i loro profitti.

    3. Calcolare l'upper bound $\mathrm{UB}$ dato dal rilassamento lineare (oggetti per efficienza non crescente, l'oggetto critico preso in modo frazionario) e il gap $\frac{\lfloor \mathrm{UB}\rfloor-\mathscr{A}(I)}{\mathscr{A}(I)}$ della migliore delle tre soluzioni.

    4. Sapendo che il valore ottimo è $z(I)=19$, dire quali ordinamenti trovano una soluzione ottima, e calcolare l'errore relativo degli altri. Spiegare che cosa non funziona.

??? soluzione "Soluzione"

    1. Le efficienze sono

        \begin{gather*}
        \frac{p_{1}}{w_{1}}=\frac{4}{3}\approx 1.33,\quad \frac{p_{2}}{w_{2}}=\frac{15}{8}\approx 1.88,\quad \frac{p_{3}}{w_{3}}=\frac{11}{7}\approx 1.57,\\
        \frac{p_{4}}{w_{4}}=\frac{8}{2}\approx 4.00,\quad \frac{p_{5}}{w_{5}}=\frac{2}{5}\approx 0.40
        \end{gather*}

        e i tre ordinamenti sono

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>criterio</th>
        <th>ordinamento</th>
        </tr>
        <tr>
        <td>profitto</td>
        <td><span class="arithmatex">\((2,3,4,1,5)\)</span></td>
        </tr>
        <tr>
        <td>peso</td>
        <td><span class="arithmatex">\((4,1,5,3,2)\)</span></td>
        </tr>
        <tr>
        <td>efficienza</td>
        <td><span class="arithmatex">\((4,2,3,1,5)\)</span></td>
        </tr>
        </table></div>

    2. <strong>$GR_p$</strong>, ordinamento $(2,3,4,1,5)$, partendo da $rc=9$:

        - oggetto $2$ ($w_{2}=8\le rc=9$): selezionato, $rc\leftarrow 1$;

        - oggetto $3$ ($w_{3}=7> rc=1$): non selezionato;

        - oggetto $4$ ($w_{4}=2> rc=1$): non selezionato;

        - oggetto $1$ ($w_{1}=3> rc=1$): non selezionato;

        - oggetto $5$ ($w_{5}=5> rc=1$): non selezionato;

        Soluzione $\{2\}$, $GR_p(I)=15$.

        <strong>$GR_w$</strong>, ordinamento $(4,1,5,3,2)$, partendo da $rc=9$:

        - oggetto $4$ ($w_{4}=2\le rc=9$): selezionato, $rc\leftarrow 7$;

        - oggetto $1$ ($w_{1}=3\le rc=7$): selezionato, $rc\leftarrow 4$;

        - oggetto $5$ ($w_{5}=5> rc=4$): non selezionato;

        - oggetto $3$ ($w_{3}=7> rc=4$): non selezionato;

        - oggetto $2$ ($w_{2}=8> rc=4$): non selezionato;

        Soluzione $\{1,4\}$, $GR_w(I)=4+8=12$.

        <strong>$GR$</strong>, ordinamento $(4,2,3,1,5)$, partendo da $rc=9$:

        - oggetto $4$ ($w_{4}=2\le rc=9$): selezionato, $rc\leftarrow 7$;

        - oggetto $2$ ($w_{2}=8> rc=7$): non selezionato;

        - oggetto $3$ ($w_{3}=7\le rc=7$): selezionato, $rc\leftarrow 0$;

        - oggetto $1$ ($w_{1}=3> rc=0$): non selezionato;

        - oggetto $5$ ($w_{5}=5> rc=0$): non selezionato;

        Soluzione $\{3,4\}$, $GR(I)=11+8=19$.

    3. Nell'ordinamento per efficienza $(4,2,3,1,5)$ entrano gli oggetti $\{4\}$, con peso totale $2$, e l'oggetto critico è $2$, con capacità residua $rc=7$. Quindi

        $$
        \mathrm{UB}=8+15\cdot\frac{7}{8}=\frac{169}{8}\approx 21.12,\qquad \lfloor \mathrm{UB}\rfloor=21.
        $$

        La migliore delle tre soluzioni ha profitto $19$, e

        $$
        gap(I)=\frac{21-19}{19}\approx 10.5\%.
        $$

    4. La soluzione ottima è $\{3,4\}$, con $z(I)=19$ (il bound $\lfloor \mathrm{UB}\rfloor=21$ non è raggiunto: qui il gap sovrastima l'errore). Solo $GR$ la trova. $GR_p$ prende l'oggetto $2$, il più prezioso ma anche il più pesante, che non lascia spazio a nient'altro di valore: $GR_p(I)=15$, errore relativo 21.1%. $GR_w$ riempie lo zaino con i due oggetti più leggeri, $4$ e $1$, che valgono poco: $GR_w(I)=12$, errore relativo 36.8%. Su questa istanza l'efficienza è il criterio giusto.

<a id="esercizio-30-2"></a>

!!! esercizio "Esercizio 30.2: Ordinamenti greedy per il KP 2"

    Consideriamo uno zaino di capacità $c=13$ e un insieme $\mathscr{I}=\{1,\dots,5\}$ di $5$ oggetti ($n=5$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\[1ex]
    \hline {p_j} & {9} & {4} & {8} & {6} & {7} \\[1ex]
    {w_j} & {7} & {2} & {9} & {5} & {6} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Ordinare gli oggetti per profitto non crescente, per peso non decrescente e per efficienza non crescente $\frac{p_j}{w_j}$ (pareggi per indice).

    2. Applicare l'algoritmo greedy con ciascuno dei tre ordinamenti ($GR_p$, $GR_w$, $GR$), mostrando la capacità residua $rc$ dopo ogni passo, e fornire le tre soluzioni e i loro profitti.

    3. Calcolare l'upper bound $\mathrm{UB}$ dato dal rilassamento lineare (oggetti per efficienza non crescente, l'oggetto critico preso in modo frazionario) e il gap $\frac{\lfloor \mathrm{UB}\rfloor-\mathscr{A}(I)}{\mathscr{A}(I)}$ della migliore delle tre soluzioni.

    4. Stabilire se qualcuna delle tre soluzioni è ottima. Calcolare l'errore relativo delle altre, e spiegare perché l'ordinamento per efficienza fallisce su questa istanza.

??? soluzione "Soluzione"

    1. Le efficienze sono

        \begin{gather*}
        \frac{p_{1}}{w_{1}}=\frac{9}{7}\approx 1.29,\quad \frac{p_{2}}{w_{2}}=\frac{4}{2}\approx 2.00,\quad \frac{p_{3}}{w_{3}}=\frac{8}{9}\approx 0.89,\\
        \frac{p_{4}}{w_{4}}=\frac{6}{5}\approx 1.20,\quad \frac{p_{5}}{w_{5}}=\frac{7}{6}\approx 1.17
        \end{gather*}

        e i tre ordinamenti sono

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>criterio</th>
        <th>ordinamento</th>
        </tr>
        <tr>
        <td>profitto</td>
        <td><span class="arithmatex">\((1,3,5,4,2)\)</span></td>
        </tr>
        <tr>
        <td>peso</td>
        <td><span class="arithmatex">\((2,4,5,1,3)\)</span></td>
        </tr>
        <tr>
        <td>efficienza</td>
        <td><span class="arithmatex">\((2,1,4,5,3)\)</span></td>
        </tr>
        </table></div>

    2. <strong>$GR_p$</strong>, ordinamento $(1,3,5,4,2)$, partendo da $rc=13$:

        - oggetto $1$ ($w_{1}=7\le rc=13$): selezionato, $rc\leftarrow 6$;

        - oggetto $3$ ($w_{3}=9> rc=6$): non selezionato;

        - oggetto $5$ ($w_{5}=6\le rc=6$): selezionato, $rc\leftarrow 0$;

        - oggetto $4$ ($w_{4}=5> rc=0$): non selezionato;

        - oggetto $2$ ($w_{2}=2> rc=0$): non selezionato;

        Soluzione $\{1,5\}$, $GR_p(I)=9+7=16$.

        <strong>$GR_w$</strong>, ordinamento $(2,4,5,1,3)$, partendo da $rc=13$:

        - oggetto $2$ ($w_{2}=2\le rc=13$): selezionato, $rc\leftarrow 11$;

        - oggetto $4$ ($w_{4}=5\le rc=11$): selezionato, $rc\leftarrow 6$;

        - oggetto $5$ ($w_{5}=6\le rc=6$): selezionato, $rc\leftarrow 0$;

        - oggetto $1$ ($w_{1}=7> rc=0$): non selezionato;

        - oggetto $3$ ($w_{3}=9> rc=0$): non selezionato;

        Soluzione $\{2,4,5\}$, $GR_w(I)=4+6+7=17$.

        <strong>$GR$</strong>, ordinamento $(2,1,4,5,3)$, partendo da $rc=13$:

        - oggetto $2$ ($w_{2}=2\le rc=13$): selezionato, $rc\leftarrow 11$;

        - oggetto $1$ ($w_{1}=7\le rc=11$): selezionato, $rc\leftarrow 4$;

        - oggetto $4$ ($w_{4}=5> rc=4$): non selezionato;

        - oggetto $5$ ($w_{5}=6> rc=4$): non selezionato;

        - oggetto $3$ ($w_{3}=9> rc=4$): non selezionato;

        Soluzione $\{1,2\}$, $GR(I)=9+4=13$.

    3. Nell'ordinamento per efficienza $(2,1,4,5,3)$ entrano gli oggetti $\{2,1\}$, con peso totale $9$, e l'oggetto critico è $4$, con capacità residua $rc=4$. Quindi

        $$
        \mathrm{UB}=4+9+6\cdot\frac{4}{5}=\frac{89}{5}\approx 17.80,\qquad \lfloor \mathrm{UB}\rfloor=17.
        $$

        La migliore delle tre soluzioni ha profitto $17$, e

        $$
        gap(I)=\frac{17-17}{17}=0\%.
        $$

    4. $GR_w(I)=17=\lfloor \mathrm{UB}\rfloor$, quindi la soluzione $\{2,4,5\}$ di $GR_w$ è ottima e $z(I)=17$. $GR$ fallisce: dopo i due oggetti più efficienti $2$ e $1$ la capacità residua è $13-9=4$, troppo piccola per qualunque altro oggetto, e $GR(I)=13$, errore relativo 23.5%. Anche $GR_p(I)=16$ è peggiore di $GR_w$, con errore relativo $\frac{17-16}{17}\approx 5.9\%$. Tre oggetti leggeri riempiono esattamente lo zaino ($2+5+6=13$): qui conta quanto bene gli oggetti riempiono la capacità, aspetto che l'efficienza ignora.

<a id="esercizio-30-3"></a>

!!! esercizio "Esercizio 30.3: Ordinamenti greedy per il KP 3"

    Consideriamo uno zaino di capacità $c=10$ e un insieme $\mathscr{I}=\{1,\dots,5\}$ di $5$ oggetti ($n=5$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\[1ex]
    \hline {p_j} & {8} & {13} & {5} & {12} & {7} \\[1ex]
    {w_j} & {5} & {9} & {4} & {8} & {2} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Ordinare gli oggetti per profitto non crescente, per peso non decrescente e per efficienza non crescente $\frac{p_j}{w_j}$ (pareggi per indice).

    2. Applicare l'algoritmo greedy con ciascuno dei tre ordinamenti ($GR_p$, $GR_w$, $GR$), mostrando la capacità residua $rc$ dopo ogni passo, e fornire le tre soluzioni e i loro profitti.

    3. Calcolare l'upper bound $\mathrm{UB}$ dato dal rilassamento lineare (oggetti per efficienza non crescente, l'oggetto critico preso in modo frazionario) e il gap $\frac{\lfloor \mathrm{UB}\rfloor-\mathscr{A}(I)}{\mathscr{A}(I)}$ della migliore delle tre soluzioni.

    4. Trovare una soluzione ammissibile di profitto $\lfloor \mathrm{UB}\rfloor$, e calcolare l'errore relativo di ciascuna delle tre soluzioni greedy. Individuare la scelta che impedisce al greedy per efficienza di trovarla.

??? soluzione "Soluzione"

    1. Le efficienze sono

        \begin{gather*}
        \frac{p_{1}}{w_{1}}=\frac{8}{5}\approx 1.60,\quad \frac{p_{2}}{w_{2}}=\frac{13}{9}\approx 1.44,\quad \frac{p_{3}}{w_{3}}=\frac{5}{4}\approx 1.25,\\
        \frac{p_{4}}{w_{4}}=\frac{12}{8}\approx 1.50,\quad \frac{p_{5}}{w_{5}}=\frac{7}{2}\approx 3.50
        \end{gather*}

        e i tre ordinamenti sono

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>criterio</th>
        <th>ordinamento</th>
        </tr>
        <tr>
        <td>profitto</td>
        <td><span class="arithmatex">\((2,4,1,5,3)\)</span></td>
        </tr>
        <tr>
        <td>peso</td>
        <td><span class="arithmatex">\((5,3,1,4,2)\)</span></td>
        </tr>
        <tr>
        <td>efficienza</td>
        <td><span class="arithmatex">\((5,1,4,2,3)\)</span></td>
        </tr>
        </table></div>

    2. <strong>$GR_p$</strong>, ordinamento $(2,4,1,5,3)$, partendo da $rc=10$:

        - oggetto $2$ ($w_{2}=9\le rc=10$): selezionato, $rc\leftarrow 1$;

        - oggetto $4$ ($w_{4}=8> rc=1$): non selezionato;

        - oggetto $1$ ($w_{1}=5> rc=1$): non selezionato;

        - oggetto $5$ ($w_{5}=2> rc=1$): non selezionato;

        - oggetto $3$ ($w_{3}=4> rc=1$): non selezionato;

        Soluzione $\{2\}$, $GR_p(I)=13$.

        <strong>$GR_w$</strong>, ordinamento $(5,3,1,4,2)$, partendo da $rc=10$:

        - oggetto $5$ ($w_{5}=2\le rc=10$): selezionato, $rc\leftarrow 8$;

        - oggetto $3$ ($w_{3}=4\le rc=8$): selezionato, $rc\leftarrow 4$;

        - oggetto $1$ ($w_{1}=5> rc=4$): non selezionato;

        - oggetto $4$ ($w_{4}=8> rc=4$): non selezionato;

        - oggetto $2$ ($w_{2}=9> rc=4$): non selezionato;

        Soluzione $\{3,5\}$, $GR_w(I)=5+7=12$.

        <strong>$GR$</strong>, ordinamento $(5,1,4,2,3)$, partendo da $rc=10$:

        - oggetto $5$ ($w_{5}=2\le rc=10$): selezionato, $rc\leftarrow 8$;

        - oggetto $1$ ($w_{1}=5\le rc=8$): selezionato, $rc\leftarrow 3$;

        - oggetto $4$ ($w_{4}=8> rc=3$): non selezionato;

        - oggetto $2$ ($w_{2}=9> rc=3$): non selezionato;

        - oggetto $3$ ($w_{3}=4> rc=3$): non selezionato;

        Soluzione $\{1,5\}$, $GR(I)=8+7=15$.

    3. Nell'ordinamento per efficienza $(5,1,4,2,3)$ entrano gli oggetti $\{5,1\}$, con peso totale $7$, e l'oggetto critico è $4$, con capacità residua $rc=3$. Quindi

        $$
        \mathrm{UB}=7+8+12\cdot\frac{3}{8}=\frac{39}{2}\approx 19.50,\qquad \lfloor \mathrm{UB}\rfloor=19.
        $$

        La migliore delle tre soluzioni ha profitto $15$, e

        $$
        gap(I)=\frac{19-15}{15}\approx 26.7\%.
        $$

    4. Poiché $GR(I)=15<\lfloor \mathrm{UB}\rfloor$, il bound non certifica l'ottimalità. Infatti la soluzione $\{4,5\}$ ha peso $8+2=10\le 10$ e profitto $19=\lfloor \mathrm{UB}\rfloor$, quindi è ottima, $z(I)=19$. Gli errori relativi sono 31.6% per $GR_p$, 36.8% per $GR_w$ e 21.1% per $GR$: nessun ordinamento trova l'ottimo. La soluzione ottima combina l'oggetto più efficiente $5$ con l'oggetto $4$, che è terzo nell'ordinamento per efficienza: dopo che l'oggetto $1$ è stato selezionato, l'oggetto $4$ non entra più, e la scelta dell'oggetto $1$ non si rivede mai.

## Bin packing: euristiche decrescenti

<a id="esercizio-30-4"></a>

!!! esercizio "Esercizio 30.4: Bin packing con ordinamento decrescente 1"

    Consideriamo contenitori di capacità $c=10$ e un insieme $\mathscr{I}=\{1,\dots,7\}$ di $7$ oggetti ($n=7$), con i seguenti pesi:

    $$
    \begin{array}{l|ccccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} & {j=7} \\[1ex]
    \hline {w_j} & {3} & {3} & {5} & {2} & {6} & {2} & {6} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare First Fit (FF) agli oggetti nell'ordine di input, passo per passo, e fornire i pattern di riempimento.

    2. Ordinare gli oggetti per peso non crescente (pareggi per indice) e applicare First Fit Decreasing (FFD).

    3. Applicare Best Fit Decreasing (BFD), e confrontarne i pattern di riempimento con quelli di FFD.

    4. Calcolare il lower bound $\left\lceil\frac{\sum_j w_j}{c}\right\rceil$. Stabilire quali soluzioni sono ottime. Spiegare perché qui l'ordinamento aiuta.

??? soluzione "Soluzione"

    1. 1. Oggetto $1$ (peso $3$): aprire il contenitore $1$, $rc[1]=7$.

        2. Oggetto $2$ (peso $3$): primo contenitore in cui entra ($rc[1]=7$): contenitore $1$, $rc[1]=4$.

        3. Oggetto $3$ (peso $5$): non entra in nessun contenitore ($rc[1]=4$): aprire il contenitore $2$, $rc[2]=5$.

        4. Oggetto $4$ (peso $2$): primo contenitore in cui entra ($rc[1]=4$, $rc[2]=5$): contenitore $1$, $rc[1]=2$.

        5. Oggetto $5$ (peso $6$): non entra in nessun contenitore ($rc[1]=2$, $rc[2]=5$): aprire il contenitore $3$, $rc[3]=4$.

        6. Oggetto $6$ (peso $2$): primo contenitore in cui entra ($rc[1]=2$, $rc[2]=5$, $rc[3]=4$): contenitore $1$, $rc[1]=0$.

        7. Oggetto $7$ (peso $6$): non entra in nessun contenitore ($rc[1]=0$, $rc[2]=5$, $rc[3]=4$): aprire il contenitore $4$, $rc[4]=4$.

        I pattern di riempimento sono

        $$
        P_{1}=\{1,2,4,6\},\quad P_{2}=\{3\},\quad P_{3}=\{5\},\quad P_{4}=\{7\}
        $$

        e $FF(I)=4$.

    2. L'ordinamento è $\sigma=(5,7,3,1,2,4,6)$ (pesi $6,6,5,3,3,2,2$).

        1. Oggetto $5$ (peso $6$): aprire il contenitore $1$, $rc[1]=4$.

        2. Oggetto $7$ (peso $6$): non entra in nessun contenitore ($rc[1]=4$): aprire il contenitore $2$, $rc[2]=4$.

        3. Oggetto $3$ (peso $5$): non entra in nessun contenitore ($rc[1]=4$, $rc[2]=4$): aprire il contenitore $3$, $rc[3]=5$.

        4. Oggetto $1$ (peso $3$): primo contenitore in cui entra ($rc[1]=4$, $rc[2]=4$, $rc[3]=5$): contenitore $1$, $rc[1]=1$.

        5. Oggetto $2$ (peso $3$): primo contenitore in cui entra ($rc[1]=1$, $rc[2]=4$, $rc[3]=5$): contenitore $2$, $rc[2]=1$.

        6. Oggetto $4$ (peso $2$): primo contenitore in cui entra ($rc[1]=1$, $rc[2]=1$, $rc[3]=5$): contenitore $3$, $rc[3]=3$.

        7. Oggetto $6$ (peso $2$): primo contenitore in cui entra ($rc[1]=1$, $rc[2]=1$, $rc[3]=3$): contenitore $3$, $rc[3]=1$.

        I pattern di riempimento sono

        $$
        P_{1}=\{1,5\},\quad P_{2}=\{2,7\},\quad P_{3}=\{3,4,6\}
        $$

        e $FFD(I)=3$.

    3. L'ordinamento è $\sigma=(5,7,3,1,2,4,6)$ (pesi $6,6,5,3,3,2,2$).

        1. Oggetto $5$ (peso $6$): aprire il contenitore $1$, $rc[1]=4$.

        2. Oggetto $7$ (peso $6$): non entra in nessun contenitore ($rc[1]=4$): aprire il contenitore $2$, $rc[2]=4$.

        3. Oggetto $3$ (peso $5$): non entra in nessun contenitore ($rc[1]=4$, $rc[2]=4$): aprire il contenitore $3$, $rc[3]=5$.

        4. Oggetto $1$ (peso $3$): entra nei contenitori $1, 2, 3$; il più pieno è il contenitore $1$ ($rc[1]=4$, $rc[2]=4$, $rc[3]=5$): contenitore $1$, $rc[1]=1$.

        5. Oggetto $2$ (peso $3$): entra nei contenitori $2, 3$; il più pieno è il contenitore $2$ ($rc[1]=1$, $rc[2]=4$, $rc[3]=5$): contenitore $2$, $rc[2]=1$.

        6. Oggetto $4$ (peso $2$): entra solo nel contenitore $3$ ($rc[1]=1$, $rc[2]=1$, $rc[3]=5$): contenitore $3$, $rc[3]=3$.

        7. Oggetto $6$ (peso $2$): entra solo nel contenitore $3$ ($rc[1]=1$, $rc[2]=1$, $rc[3]=3$): contenitore $3$, $rc[3]=1$.

        I pattern di riempimento sono

        $$
        P_{1}=\{1,5\},\quad P_{2}=\{2,7\},\quad P_{3}=\{3,4,6\}
        $$

        e $BFD(I)=3$.

    4. Il peso totale è $27$, quindi $LB=\left\lceil\frac{27}{10}\right\rceil=3$. FFD e BFD usano $3$ contenitori e sono quindi ottimi, $z(I)=3$, mentre FF ne usa $4$. Nell'ordine di input i quattro oggetti piccoli ($1$, $2$, $4$, $6$, di pesi $3,3,2,2$) finiscono tutti insieme nel contenitore $1$, e gli oggetti grandi $3$, $5$, $7$ ricevono un contenitore ciascuno, con vuoti $5$, $4$, $4$ che nessun oggetto rimasto può riempire. L'ordinamento inserisce prima gli oggetti grandi, e gli oggetti piccoli ne riempiono i vuoti: vince l'ordine giusto.

<a id="esercizio-30-5"></a>

!!! esercizio "Esercizio 30.5: Bin packing con ordinamento decrescente 2"

    Consideriamo contenitori di capacità $c=10$ e un insieme $\mathscr{I}=\{1,\dots,8\}$ di $8$ oggetti ($n=8$), con i seguenti pesi:

    $$
    \begin{array}{l|cccccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} & {j=7} & {j=8} \\[1ex]
    \hline {w_j} & {2} & {6} & {3} & {5} & {4} & {2} & {6} & {2} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare First Fit (FF) agli oggetti nell'ordine di input, passo per passo, e fornire i pattern di riempimento.

    2. Ordinare gli oggetti per peso non crescente (pareggi per indice) e applicare First Fit Decreasing (FFD).

    3. Applicare Best Fit Decreasing (BFD), e confrontarne i pattern di riempimento con quelli di FFD.

    4. Calcolare il lower bound $\left\lceil\frac{\sum_j w_j}{c}\right\rceil$. Stabilire quali soluzioni sono ottime. Spiegare perché qui l'ordinamento non aiuta.

??? soluzione "Soluzione"

    1. 1. Oggetto $1$ (peso $2$): aprire il contenitore $1$, $rc[1]=8$.

        2. Oggetto $2$ (peso $6$): primo contenitore in cui entra ($rc[1]=8$): contenitore $1$, $rc[1]=2$.

        3. Oggetto $3$ (peso $3$): non entra in nessun contenitore ($rc[1]=2$): aprire il contenitore $2$, $rc[2]=7$.

        4. Oggetto $4$ (peso $5$): primo contenitore in cui entra ($rc[1]=2$, $rc[2]=7$): contenitore $2$, $rc[2]=2$.

        5. Oggetto $5$ (peso $4$): non entra in nessun contenitore ($rc[1]=2$, $rc[2]=2$): aprire il contenitore $3$, $rc[3]=6$.

        6. Oggetto $6$ (peso $2$): primo contenitore in cui entra ($rc[1]=2$, $rc[2]=2$, $rc[3]=6$): contenitore $1$, $rc[1]=0$.

        7. Oggetto $7$ (peso $6$): primo contenitore in cui entra ($rc[1]=0$, $rc[2]=2$, $rc[3]=6$): contenitore $3$, $rc[3]=0$.

        8. Oggetto $8$ (peso $2$): primo contenitore in cui entra ($rc[1]=0$, $rc[2]=2$, $rc[3]=0$): contenitore $2$, $rc[2]=0$.

        I pattern di riempimento sono

        $$
        P_{1}=\{1,2,6\},\quad P_{2}=\{3,4,8\},\quad P_{3}=\{5,7\}
        $$

        e $FF(I)=3$.

    2. L'ordinamento è $\sigma=(2,7,4,5,3,1,6,8)$ (pesi $6,6,5,4,3,2,2,2$).

        1. Oggetto $2$ (peso $6$): aprire il contenitore $1$, $rc[1]=4$.

        2. Oggetto $7$ (peso $6$): non entra in nessun contenitore ($rc[1]=4$): aprire il contenitore $2$, $rc[2]=4$.

        3. Oggetto $4$ (peso $5$): non entra in nessun contenitore ($rc[1]=4$, $rc[2]=4$): aprire il contenitore $3$, $rc[3]=5$.

        4. Oggetto $5$ (peso $4$): primo contenitore in cui entra ($rc[1]=4$, $rc[2]=4$, $rc[3]=5$): contenitore $1$, $rc[1]=0$.

        5. Oggetto $3$ (peso $3$): primo contenitore in cui entra ($rc[1]=0$, $rc[2]=4$, $rc[3]=5$): contenitore $2$, $rc[2]=1$.

        6. Oggetto $1$ (peso $2$): primo contenitore in cui entra ($rc[1]=0$, $rc[2]=1$, $rc[3]=5$): contenitore $3$, $rc[3]=3$.

        7. Oggetto $6$ (peso $2$): primo contenitore in cui entra ($rc[1]=0$, $rc[2]=1$, $rc[3]=3$): contenitore $3$, $rc[3]=1$.

        8. Oggetto $8$ (peso $2$): non entra in nessun contenitore ($rc[1]=0$, $rc[2]=1$, $rc[3]=1$): aprire il contenitore $4$, $rc[4]=8$.

        I pattern di riempimento sono

        $$
        P_{1}=\{2,5\},\quad P_{2}=\{3,7\},\quad P_{3}=\{1,4,6\},\quad P_{4}=\{8\}
        $$

        e $FFD(I)=4$.

    3. L'ordinamento è $\sigma=(2,7,4,5,3,1,6,8)$ (pesi $6,6,5,4,3,2,2,2$).

        1. Oggetto $2$ (peso $6$): aprire il contenitore $1$, $rc[1]=4$.

        2. Oggetto $7$ (peso $6$): non entra in nessun contenitore ($rc[1]=4$): aprire il contenitore $2$, $rc[2]=4$.

        3. Oggetto $4$ (peso $5$): non entra in nessun contenitore ($rc[1]=4$, $rc[2]=4$): aprire il contenitore $3$, $rc[3]=5$.

        4. Oggetto $5$ (peso $4$): entra nei contenitori $1, 2, 3$; il più pieno è il contenitore $1$ ($rc[1]=4$, $rc[2]=4$, $rc[3]=5$): contenitore $1$, $rc[1]=0$.

        5. Oggetto $3$ (peso $3$): entra nei contenitori $2, 3$; il più pieno è il contenitore $2$ ($rc[1]=0$, $rc[2]=4$, $rc[3]=5$): contenitore $2$, $rc[2]=1$.

        6. Oggetto $1$ (peso $2$): entra solo nel contenitore $3$ ($rc[1]=0$, $rc[2]=1$, $rc[3]=5$): contenitore $3$, $rc[3]=3$.

        7. Oggetto $6$ (peso $2$): entra solo nel contenitore $3$ ($rc[1]=0$, $rc[2]=1$, $rc[3]=3$): contenitore $3$, $rc[3]=1$.

        8. Oggetto $8$ (peso $2$): non entra in nessun contenitore ($rc[1]=0$, $rc[2]=1$, $rc[3]=1$): aprire il contenitore $4$, $rc[4]=8$.

        I pattern di riempimento sono

        $$
        P_{1}=\{2,5\},\quad P_{2}=\{3,7\},\quad P_{3}=\{1,4,6\},\quad P_{4}=\{8\}
        $$

        e $BFD(I)=4$.

    4. Il peso totale è $30$, quindi $LB=\left\lceil\frac{30}{10}\right\rceil=3$: FF, con $3$ contenitori, è ottimo, $z(I)=3$, mentre FFD e BFD usano $4$ contenitori. Nell'ordinamento per peso non crescente i due oggetti di peso $6$ vengono accoppiati con gli oggetti di peso $4$ e $3$, il che lascia un vuoto di $1$ nel contenitore $2$; anche il contenitore $3$ termina con un vuoto di $1$, e l'ultimo oggetto di peso $2$ non entra da nessuna parte. L'ordine di input produce per caso tre contenitori pieni ($2+6+2$, $3+5+2$, $4+6$). Una buona garanzia nel caso peggiore ($\frac{11}{9}$ per FFD) non significa una soluzione migliore su ogni istanza: qui l'ordinamento peggiora.

<a id="esercizio-30-6"></a>

!!! esercizio "Esercizio 30.6: Bin packing con ordinamento decrescente 3"

    Consideriamo contenitori di capacità $c=10$ e un insieme $\mathscr{I}=\{1,\dots,7\}$ di $7$ oggetti ($n=7$), con i seguenti pesi:

    $$
    \begin{array}{l|ccccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} & {j=7} \\[1ex]
    \hline {w_j} & {4} & {4} & {5} & {7} & {2} & {2} & {4} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare First Fit (FF) agli oggetti nell'ordine di input, passo per passo, e fornire i pattern di riempimento.

    2. Ordinare gli oggetti per peso non crescente (pareggi per indice) e applicare First Fit Decreasing (FFD).

    3. Applicare Best Fit Decreasing (BFD), e confrontarne i pattern di riempimento con quelli di FFD.

    4. Calcolare il lower bound $\left\lceil\frac{\sum_j w_j}{c}\right\rceil$ e confrontare le quattro regole FF, BF (entrambe nell'ordine di input), FFD e BFD.

??? soluzione "Soluzione"

    1. 1. Oggetto $1$ (peso $4$): aprire il contenitore $1$, $rc[1]=6$.

        2. Oggetto $2$ (peso $4$): primo contenitore in cui entra ($rc[1]=6$): contenitore $1$, $rc[1]=2$.

        3. Oggetto $3$ (peso $5$): non entra in nessun contenitore ($rc[1]=2$): aprire il contenitore $2$, $rc[2]=5$.

        4. Oggetto $4$ (peso $7$): non entra in nessun contenitore ($rc[1]=2$, $rc[2]=5$): aprire il contenitore $3$, $rc[3]=3$.

        5. Oggetto $5$ (peso $2$): primo contenitore in cui entra ($rc[1]=2$, $rc[2]=5$, $rc[3]=3$): contenitore $1$, $rc[1]=0$.

        6. Oggetto $6$ (peso $2$): primo contenitore in cui entra ($rc[1]=0$, $rc[2]=5$, $rc[3]=3$): contenitore $2$, $rc[2]=3$.

        7. Oggetto $7$ (peso $4$): non entra in nessun contenitore ($rc[1]=0$, $rc[2]=3$, $rc[3]=3$): aprire il contenitore $4$, $rc[4]=6$.

        I pattern di riempimento sono

        $$
        P_{1}=\{1,2,5\},\quad P_{2}=\{3,6\},\quad P_{3}=\{4\},\quad P_{4}=\{7\}
        $$

        e $FF(I)=4$.

    2. L'ordinamento è $\sigma=(4,3,1,2,7,5,6)$ (pesi $7,5,4,4,4,2,2$).

        1. Oggetto $4$ (peso $7$): aprire il contenitore $1$, $rc[1]=3$.

        2. Oggetto $3$ (peso $5$): non entra in nessun contenitore ($rc[1]=3$): aprire il contenitore $2$, $rc[2]=5$.

        3. Oggetto $1$ (peso $4$): primo contenitore in cui entra ($rc[1]=3$, $rc[2]=5$): contenitore $2$, $rc[2]=1$.

        4. Oggetto $2$ (peso $4$): non entra in nessun contenitore ($rc[1]=3$, $rc[2]=1$): aprire il contenitore $3$, $rc[3]=6$.

        5. Oggetto $7$ (peso $4$): primo contenitore in cui entra ($rc[1]=3$, $rc[2]=1$, $rc[3]=6$): contenitore $3$, $rc[3]=2$.

        6. Oggetto $5$ (peso $2$): primo contenitore in cui entra ($rc[1]=3$, $rc[2]=1$, $rc[3]=2$): contenitore $1$, $rc[1]=1$.

        7. Oggetto $6$ (peso $2$): primo contenitore in cui entra ($rc[1]=1$, $rc[2]=1$, $rc[3]=2$): contenitore $3$, $rc[3]=0$.

        I pattern di riempimento sono

        $$
        P_{1}=\{4,5\},\quad P_{2}=\{1,3\},\quad P_{3}=\{2,6,7\}
        $$

        e $FFD(I)=3$.

    3. L'ordinamento è $\sigma=(4,3,1,2,7,5,6)$ (pesi $7,5,4,4,4,2,2$).

        1. Oggetto $4$ (peso $7$): aprire il contenitore $1$, $rc[1]=3$.

        2. Oggetto $3$ (peso $5$): non entra in nessun contenitore ($rc[1]=3$): aprire il contenitore $2$, $rc[2]=5$.

        3. Oggetto $1$ (peso $4$): entra solo nel contenitore $2$ ($rc[1]=3$, $rc[2]=5$): contenitore $2$, $rc[2]=1$.

        4. Oggetto $2$ (peso $4$): non entra in nessun contenitore ($rc[1]=3$, $rc[2]=1$): aprire il contenitore $3$, $rc[3]=6$.

        5. Oggetto $7$ (peso $4$): entra solo nel contenitore $3$ ($rc[1]=3$, $rc[2]=1$, $rc[3]=6$): contenitore $3$, $rc[3]=2$.

        6. Oggetto $5$ (peso $2$): entra nei contenitori $1, 3$; il più pieno è il contenitore $3$ ($rc[1]=3$, $rc[2]=1$, $rc[3]=2$): contenitore $3$, $rc[3]=0$.

        7. Oggetto $6$ (peso $2$): entra solo nel contenitore $1$ ($rc[1]=3$, $rc[2]=1$, $rc[3]=0$): contenitore $1$, $rc[1]=1$.

        I pattern di riempimento sono

        $$
        P_{1}=\{4,6\},\quad P_{2}=\{1,3\},\quad P_{3}=\{2,5,7\}
        $$

        e $BFD(I)=3$.

    4. Il peso totale è $28$, quindi $LB=\left\lceil\frac{28}{10}\right\rceil=3$, e FFD e BFD sono entrambi ottimi, $z(I)=3$, con pattern di riempimento diversi: l'oggetto $5$, di peso $2$, esaminato subito dopo l'oggetto $7$, va nel contenitore $1$ in FFD (il primo contenitore in cui entra) e nel contenitore $3$ in BFD (il più pieno), e le due regole terminano con soluzioni diverse, ugualmente buone. Nell'ordine di input, FF richiede $4$ contenitori mentre BF (Best Fit senza ordinamento) ne trova $3$, con pattern $P_{1}=\{1,2,5\},\quad P_{2}=\{3,7\},\quad P_{3}=\{4,6\}$. Su questa istanza la scelta del contenitore conta per le regole senza ordinamento, mentre dopo l'ordinamento entrambe le scelte danno il numero ottimo di contenitori.

## $P\|C_{\max}$: LIST e LPT

<a id="esercizio-30-7"></a>

!!! esercizio "Esercizio 30.7: List scheduling e LPT 1"

    Consideriamo $m=3$ macchine identiche e un insieme $\mathscr{J}=\{1,\dots,8\}$ di $8$ lavori ($n=8$), con i seguenti tempi di esecuzione:

    $$
    \begin{array}{l|cccccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} & {j=7} & {j=8} \\[1ex]
    \hline {t_j} & {2} & {8} & {7} & {6} & {8} & {3} & {4} & {9} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare il list scheduling ($LIST$) con i lavori nell'ordine di input, mostrando i carichi prima di ogni assegnamento.

    2. Applicare $LPT$: ordinare i lavori per tempo di esecuzione non crescente (pareggi per indice) e applicare il list scheduling.

    3. Calcolare il lower bound $\max\left\{\max_j t_j,\left\lceil\frac{\sum_j t_j}{m}\right\rceil\right\}$ e i gap delle due soluzioni.

    4. Stabilire se la soluzione di $LPT$ è ottima. Spiegare perché l'ordine di input dà un risultato peggiore.

??? soluzione "Soluzione"

    1. &#8203;

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>lavoro <span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(t_j\)</span></th>
        <th>carichi prima</th>
        <th>macchina</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((0,0,0)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\((2,0,0)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\((2,8,0)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\((2,8,7)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\((8,8,7)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((8,8,15)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((11,8,15)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\((11,12,15)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        </table></div>

        Gli insiemi sono $J_{1}=\{1,4,6,8\},\quad J_{2}=\{2,7\},\quad J_{3}=\{3,5\}$, con carichi $(20,12,15)$. Quindi $LIST(I)=20$.

    2. La lista è $\sigma=(8,2,5,3,4,7,6,1)$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>lavoro <span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(t_j\)</span></th>
        <th>carichi prima</th>
        <th>macchina</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\((0,0,0)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\((9,0,0)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\((9,8,0)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\((9,8,8)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\((9,15,8)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((9,15,14)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((13,15,14)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((16,15,14)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        </table></div>

        Gli insiemi sono $J_{1}=\{6,7,8\},\quad J_{2}=\{2,3\},\quad J_{3}=\{1,4,5\}$, con carichi $(16,15,16)$. Quindi $LPT(I)=16$.

    3. $\sum_j t_j=47$ e $\max_j t_j=9$, quindi

        $$
        LB=\max\left\{9,\left\lceil\frac{47}{3}\right\rceil\right\}=16,
        $$

        e i gap sono $\frac{20-16}{16}=25\%$ per $LIST$ e $\frac{16-16}{16}=0\%$ per $LPT$.

    4. $LPT(I)=16=LB$, quindi la soluzione di $LPT$ è ottima e $z(I)=16$; $LIST$ nell'ordine di input è il 25.0% sopra l'ottimo. Nell'ordine di input il lavoro più lungo, il lavoro $8$ di durata $9$, è l'ultimo: arriva quando la macchina meno carica ha già carico $11$, e il makespan salta a $20$. Con prima i lavori più lunghi, gli ultimi lavori sono brevi e livellano i carichi.

<a id="esercizio-30-8"></a>

!!! esercizio "Esercizio 30.8: List scheduling e LPT 2"

    Consideriamo $m=3$ macchine identiche e un insieme $\mathscr{J}=\{1,\dots,7\}$ di $7$ lavori ($n=7$), con i seguenti tempi di esecuzione:

    $$
    \begin{array}{l|ccccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} & {j=7} \\[1ex]
    \hline {t_j} & {3} & {6} & {5} & {4} & {4} & {9} & {7} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare il list scheduling ($LIST$) con i lavori nell'ordine di input, mostrando i carichi prima di ogni assegnamento.

    2. Applicare $LPT$: ordinare i lavori per tempo di esecuzione non crescente (pareggi per indice) e applicare il list scheduling.

    3. Calcolare il lower bound $\max\left\{\max_j t_j,\left\lceil\frac{\sum_j t_j}{m}\right\rceil\right\}$ e i gap delle due soluzioni.

    4. Trovare un assegnamento con makespan uguale al lower bound. Verificare i bound di Graham per $LIST$ e $LPT$ su questa istanza.

??? soluzione "Soluzione"

    1. &#8203;

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>lavoro <span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(t_j\)</span></th>
        <th>carichi prima</th>
        <th>macchina</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((0,0,0)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\((3,0,0)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((3,6,0)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((3,6,5)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((7,6,5)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\((7,6,9)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\((7,15,9)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        </table></div>

        Gli insiemi sono $J_{1}=\{1,4,7\},\quad J_{2}=\{2,6\},\quad J_{3}=\{3,5\}$, con carichi $(14,15,9)$. Quindi $LIST(I)=15$.

    2. La lista è $\sigma=(6,7,2,3,4,5,1)$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>lavoro <span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(t_j\)</span></th>
        <th>carichi prima</th>
        <th>macchina</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\((0,0,0)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\((9,0,0)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\((9,7,0)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((9,7,6)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((9,7,11)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((9,11,11)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((13,11,11)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        Gli insiemi sono $J_{1}=\{5,6\},\quad J_{2}=\{1,4,7\},\quad J_{3}=\{2,3\}$, con carichi $(13,14,11)$. Quindi $LPT(I)=14$.

    3. $\sum_j t_j=38$ e $\max_j t_j=9$, quindi

        $$
        LB=\max\left\{9,\left\lceil\frac{38}{3}\right\rceil\right\}=13,
        $$

        e i gap sono $\frac{15-13}{13}\approx 15.4\%$ per $LIST$ e $\frac{14-13}{13}\approx 7.7\%$ per $LPT$.

    4. L'assegnamento $J_{1}=\{1,2,4\},\quad J_{2}=\{3,7\},\quad J_{3}=\{5,6\}$ ha carichi $(13,12,13)$ e makespan $13=LB$: è ottimo, $z(I)=13$, e $LPT$ non lo è. Il bound di Graham dà $LPT(I)\le\left(\frac{4}{3}-\frac{1}{9}\right)z(I)=\frac{11}{9}\cdot 13\approx 15.89$, e infatti $14\le 15.89$; per $LIST$, $\left(2-\frac{1}{3}\right)z(I)=\frac{5}{3}\cdot13\approx 21.67\ge 15$. L'ordinamento migliora il makespan da $15$ a $14$, ma non raggiunge l'ottimo.

<a id="esercizio-30-9"></a>

!!! esercizio "Esercizio 30.9: List scheduling e LPT 3"

    Consideriamo $m=3$ macchine identiche e un insieme $\mathscr{J}=\{1,\dots,7\}$ di $7$ lavori ($n=7$), con i seguenti tempi di esecuzione:

    $$
    \begin{array}{l|ccccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} & {j=7} \\[1ex]
    \hline {t_j} & {5} & {8} & {8} & {4} & {5} & {7} & {4} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare il list scheduling ($LIST$) con i lavori nell'ordine di input, mostrando i carichi prima di ogni assegnamento.

    2. Applicare $LPT$: ordinare i lavori per tempo di esecuzione non crescente (pareggi per indice) e applicare il list scheduling.

    3. Calcolare il lower bound $\max\left\{\max_j t_j,\left\lceil\frac{\sum_j t_j}{m}\right\rceil\right\}$ e i gap delle due soluzioni.

    4. Confrontare le due soluzioni. Sapendo che il makespan ottimo è $15$, stabilire quale delle due è ottima e che cosa se ne deduce sull'ordinamento.

??? soluzione "Soluzione"

    1. &#8203;

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>lavoro <span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(t_j\)</span></th>
        <th>carichi prima</th>
        <th>macchina</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((0,0,0)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\((5,0,0)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\((5,8,0)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((5,8,8)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((9,8,8)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\((9,13,8)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((9,13,15)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        </table></div>

        Gli insiemi sono $J_{1}=\{1,4,7\},\quad J_{2}=\{2,5\},\quad J_{3}=\{3,6\}$, con carichi $(13,13,15)$. Quindi $LIST(I)=15$.

    2. La lista è $\sigma=(2,3,6,1,5,4,7)$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>lavoro <span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(t_j\)</span></th>
        <th>carichi prima</th>
        <th>macchina</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\((0,0,0)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\((8,0,0)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\((8,8,0)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((8,8,7)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((8,8,12)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((13,8,12)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((13,12,12)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        Gli insiemi sono $J_{1}=\{2,5\},\quad J_{2}=\{3,4,7\},\quad J_{3}=\{1,6\}$, con carichi $(13,16,12)$. Quindi $LPT(I)=16$.

    3. $\sum_j t_j=41$ e $\max_j t_j=8$, quindi

        $$
        LB=\max\left\{8,\left\lceil\frac{41}{3}\right\rceil\right\}=14,
        $$

        e i gap sono $\frac{15-14}{14}\approx 7.1\%$ per $LIST$ e $\frac{16-14}{14}\approx 14.3\%$ per $LPT$.

    4. Qui $LIST(I)=15<LPT(I)=16$: su questa istanza l'ordine di input è migliore di quello ordinato. Il lower bound $14$ non è raggiunto; un'enumerazione completa dei $3^{7}$ assegnamenti mostra che $z(I)=15$ (per esempio $J_{1}=\{1,2\},\quad J_{2}=\{3,5\},\quad J_{3}=\{4,6,7\}$, carichi $(13,13,15)$), quindi $LIST$ nell'ordine di input è ottimo, mentre $LPT$ è il 6.7% sopra l'ottimo. L'ordinamento è una regola che funziona bene in generale, e il bound di Graham per $LPT$ è migliore di quello per $LIST$; ma una garanzia è un'affermazione sul caso peggiore, e su una singola istanza un ordine arbitrario può essere fortunato.

## TSP: euristiche costruttive

<a id="esercizio-30-10"></a>

!!! esercizio "Esercizio 30.10: Costruzione di giri del TSP 1"

    Consideriamo un insieme $\mathscr{V}=\{1,\dots,6\}$ di $6$ città con coordinate $1{:}\,(8,0)$, $2{:}\,(1,0)$, $3{:}\,(1,2)$, $4{:}\,(1,5)$, $5{:}\,(6,3)$, $6{:}\,(0,4)$ e distanze uguali alle distanze euclidee arrotondate all'intero più vicino (l'istanza è metrica):

    $$
    \begin{array}{c|cccccc}
    \hline {d_{ij}} & {1} & {2} & {3} & {4} & {5} & {6} \\
    \hline {1} & --- & {7} & {7} & {9} & {4} & {9} \\
    {2} & {7} & --- & {2} & {5} & {6} & {4} \\
    {3} & {7} & {2} & --- & {3} & {5} & {2} \\
    {4} & {9} & {5} & {3} & --- & {5} & {1} \\
    {5} & {4} & {6} & {5} & {5} & --- & {6} \\
    {6} & {9} & {4} & {2} & {1} & {6} & --- \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare l'euristica nearest neighbour ($NN$) dalla città $1$, passo per passo (pareggi per indice).

    2. Applicare $NN$ da ciascuna delle altre città, e fornire il risultato del $NN$ multi-start.

    3. Calcolare il lower bound $\left\lceil\frac12\sum_{i}(a_i+b_i)\right\rceil$, dove $a_i$ e $b_i$ sono le due distanze minime dalla città $i$, e il gap della soluzione multi-start.

    4. Sapendo che il valore ottimo è $z(I)=21$, calcolare l'errore relativo di $NN$ dalla città $1$, e spiegare perché il suo giro è lungo.

??? soluzione "Soluzione"

    1. 1. dalla città $1$ le distanze verso $2,3,4,5,6$ sono $7,7,9,4,9$: città $5$;

        2. dalla città $5$ le distanze verso $2,3,4,6$ sono $6,5,5,6$: città $3$ (pareggio con $4$, risolto per indice);

        3. dalla città $3$ le distanze verso $2,4,6$ sono $2,3,2$: città $2$ (pareggio con $6$, risolto per indice);

        4. dalla città $2$ le distanze verso $4,6$ sono $5,4$: città $6$;

        5. dalla città $6$ resta solo la città $4$, a distanza $1$;

        6. il giro si chiude con l'arco $(4,1)$, di lunghezza $9$;

        Quindi $\pi=(1,5,3,2,6,4)$ e $NN(I)=4+5+2+4+1+9=25$.

    2. Procedendo allo stesso modo da ogni città:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>partenza</th>
        <th>giro</th>
        <th><span class="arithmatex">\(L\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((1,5,3,2,6,4)\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((2,3,6,4,5,1)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((3,2,6,4,5,1)\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((4,6,3,2,5,1)\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((5,1,2,3,6,4)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\((6,4,3,2,5,1)\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        </tr>
        </table></div>

        Il $NN$ multi-start restituisce il primo giro più corto, $(2,3,6,4,5,1)$, di lunghezza $21$.

    3. Le due distanze minime sono $(4,7)$ per la città $1$, $(2,4)$ per la città $2$, $(2,2)$ per la città $3$, $(1,3)$ per la città $4$, $(4,5)$ per la città $5$, $(1,2)$ per la città $6$, quindi

        $$
        LB=\left\lceil\frac{11+6+4+4+9+3}{2}\right\rceil=\left\lceil 18.5\right\rceil=19,
        $$

        e il gap della soluzione multi-start è $\frac{21-19}{19}\approx 10.5\%$.

    4. L'errore relativo di $NN$ dalla città $1$ è $\frac{25-21}{21}\approx 19.0\%$, mentre il multi-start trova il valore ottimo $21$ (dalle città $2$ e $5$). Dalla città $1$ la città più vicina è la $5$, e il cammino si sposta poi sul gruppo di città $2,3,4,6$; la città $1$ è lontana da tutte (le sue distanze verso $2,3,4,6$ sono $7,7,9,9$), e il cammino deve tornare dall'ultima città del gruppo: l'arco di chiusura $(4,1)$ ha lunghezza $9$. Cambiare la città di partenza cambia l'arco lungo forzato alla fine.

<a id="esercizio-30-11"></a>

!!! esercizio "Esercizio 30.11: Costruzione di giri del TSP 2"

    Consideriamo un insieme $\mathscr{V}=\{1,\dots,6\}$ di $6$ città con coordinate $1{:}\,(4,3)$, $2{:}\,(6,1)$, $3{:}\,(0,5)$, $4{:}\,(0,1)$, $5{:}\,(4,5)$, $6{:}\,(4,0)$ e distanze uguali alle distanze euclidee arrotondate all'intero più vicino (l'istanza è metrica):

    $$
    \begin{array}{c|cccccc}
    \hline {d_{ij}} & {1} & {2} & {3} & {4} & {5} & {6} \\
    \hline {1} & --- & {3} & {4} & {4} & {2} & {3} \\
    {2} & {3} & --- & {7} & {6} & {4} & {2} \\
    {3} & {4} & {7} & --- & {4} & {4} & {6} \\
    {4} & {4} & {6} & {4} & --- & {6} & {4} \\
    {5} & {2} & {4} & {4} & {6} & --- & {5} \\
    {6} & {3} & {2} & {6} & {4} & {5} & --- \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare il nearest insertion ($NI$) dalla città $1$: a ogni passo fornire $d(q,T)$ per le città $q$ non nel sottogiro $T$, la città selezionata e il suo arco più economico.

    2. Applicare il farthest insertion ($FI$) dalla città $1$.

    3. Applicare il cheapest insertion ($CI$) dalla città $1$.

    4. Sapendo che il valore ottimo è $z(I)=19$, confrontare i tre giri fra loro e con il giro di $NN$ dalla città $1$.

??? soluzione "Soluzione"

    1. Partendo da $T=(1)$ (inserire la città $q$ nel sottogiro $(1)$ costa $2d_{1q}$):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>sottogiro <span class="arithmatex">\(T\)</span></th>
        <th><span class="arithmatex">\(d(q,T)\)</span></th>
        <th>costi di inserimento della città selezionata</th>
        <th>inserita</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1)\)</span></td>
        <td><span class="arithmatex">\(2{:}\,3\)</span>, <span class="arithmatex">\(3{:}\,4\)</span>, <span class="arithmatex">\(4{:}\,4\)</span>, <span class="arithmatex">\(5{:}\,2\)</span>, <span class="arithmatex">\(6{:}\,3\)</span></td>
        <td><span class="arithmatex">\((4)\)</span></td>
        <td><span class="arithmatex">\(5\)</span> su <span class="arithmatex">\((1,1)\)</span>, costo <span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(2{:}\,3\)</span>, <span class="arithmatex">\(3{:}\,4\)</span>, <span class="arithmatex">\(4{:}\,4\)</span>, <span class="arithmatex">\(6{:}\,3\)</span></td>
        <td><span class="arithmatex">\((5,5)\)</span></td>
        <td><span class="arithmatex">\(2\)</span> su <span class="arithmatex">\((1,5)\)</span>, costo <span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,2,5)\)</span></td>
        <td><span class="arithmatex">\(3{:}\,4\)</span>, <span class="arithmatex">\(4{:}\,4\)</span>, <span class="arithmatex">\(6{:}\,2\)</span></td>
        <td><span class="arithmatex">\((2,3,6)\)</span></td>
        <td><span class="arithmatex">\(6\)</span> su <span class="arithmatex">\((1,2)\)</span>, costo <span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,6,2,5)\)</span></td>
        <td><span class="arithmatex">\(3{:}\,4\)</span>, <span class="arithmatex">\(4{:}\,4\)</span></td>
        <td><span class="arithmatex">\((7,11,7,6)\)</span></td>
        <td><span class="arithmatex">\(3\)</span> su <span class="arithmatex">\((5,1)\)</span>, costo <span class="arithmatex">\(6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,6,2,5,3)\)</span></td>
        <td><span class="arithmatex">\(4{:}\,4\)</span></td>
        <td><span class="arithmatex">\((5,8,8,6,4)\)</span></td>
        <td><span class="arithmatex">\(4\)</span> su <span class="arithmatex">\((3,1)\)</span>, costo <span class="arithmatex">\(4\)</span></td>
        </tr>
        </table></div>

        Quindi $\pi=(1,6,2,5,3,4)$ e $NI(I)=3+2+4+4+4+4=21$.

    2. Partendo da $T=(1)$ (inserire la città $q$ nel sottogiro $(1)$ costa $2d_{1q}$):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>sottogiro <span class="arithmatex">\(T\)</span></th>
        <th><span class="arithmatex">\(d(q,T)\)</span></th>
        <th>costi di inserimento della città selezionata</th>
        <th>inserita</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1)\)</span></td>
        <td><span class="arithmatex">\(2{:}\,3\)</span>, <span class="arithmatex">\(3{:}\,4\)</span>, <span class="arithmatex">\(4{:}\,4\)</span>, <span class="arithmatex">\(5{:}\,2\)</span>, <span class="arithmatex">\(6{:}\,3\)</span></td>
        <td><span class="arithmatex">\((8)\)</span></td>
        <td><span class="arithmatex">\(3\)</span> su <span class="arithmatex">\((1,1)\)</span>, costo <span class="arithmatex">\(8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\(2{:}\,3\)</span>, <span class="arithmatex">\(4{:}\,4\)</span>, <span class="arithmatex">\(5{:}\,2\)</span>, <span class="arithmatex">\(6{:}\,3\)</span></td>
        <td><span class="arithmatex">\((4,4)\)</span></td>
        <td><span class="arithmatex">\(4\)</span> su <span class="arithmatex">\((1,3)\)</span>, costo <span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4,3)\)</span></td>
        <td><span class="arithmatex">\(2{:}\,3\)</span>, <span class="arithmatex">\(5{:}\,2\)</span>, <span class="arithmatex">\(6{:}\,3\)</span></td>
        <td><span class="arithmatex">\((5,9,6)\)</span></td>
        <td><span class="arithmatex">\(2\)</span> su <span class="arithmatex">\((1,4)\)</span>, costo <span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,2,4,3)\)</span></td>
        <td><span class="arithmatex">\(5{:}\,2\)</span>, <span class="arithmatex">\(6{:}\,2\)</span></td>
        <td><span class="arithmatex">\((3,4,6,2)\)</span></td>
        <td><span class="arithmatex">\(5\)</span> su <span class="arithmatex">\((3,1)\)</span>, costo <span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,2,4,3,5)\)</span></td>
        <td><span class="arithmatex">\(6{:}\,2\)</span></td>
        <td><span class="arithmatex">\((2,0,6,7,6)\)</span></td>
        <td><span class="arithmatex">\(6\)</span> su <span class="arithmatex">\((2,4)\)</span>, costo <span class="arithmatex">\(0\)</span></td>
        </tr>
        </table></div>

        Quindi $\pi=(1,2,6,4,3,5)$ e $FI(I)=3+2+4+4+4+2=19$.

    3. Partendo da $T=(1)$ (inserire la città $q$ nel sottogiro $(1)$ costa $2d_{1q}$):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>sottogiro <span class="arithmatex">\(T\)</span></th>
        <th>costo di inserimento minimo</th>
        <th>costi di inserimento della città selezionata</th>
        <th>inserita</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1)\)</span></td>
        <td><span class="arithmatex">\(2{:}\,6\)</span>, <span class="arithmatex">\(3{:}\,8\)</span>, <span class="arithmatex">\(4{:}\,8\)</span>, <span class="arithmatex">\(5{:}\,4\)</span>, <span class="arithmatex">\(6{:}\,6\)</span></td>
        <td><span class="arithmatex">\((4)\)</span></td>
        <td><span class="arithmatex">\(5\)</span> su <span class="arithmatex">\((1,1)\)</span>, costo <span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(2{:}\,5\)</span>, <span class="arithmatex">\(3{:}\,6\)</span>, <span class="arithmatex">\(4{:}\,8\)</span>, <span class="arithmatex">\(6{:}\,6\)</span></td>
        <td><span class="arithmatex">\((5,5)\)</span></td>
        <td><span class="arithmatex">\(2\)</span> su <span class="arithmatex">\((1,5)\)</span>, costo <span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,2,5)\)</span></td>
        <td><span class="arithmatex">\(3{:}\,6\)</span>, <span class="arithmatex">\(4{:}\,7\)</span>, <span class="arithmatex">\(6{:}\,2\)</span></td>
        <td><span class="arithmatex">\((2,3,6)\)</span></td>
        <td><span class="arithmatex">\(6\)</span> su <span class="arithmatex">\((1,2)\)</span>, costo <span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,6,2,5)\)</span></td>
        <td><span class="arithmatex">\(3{:}\,6\)</span>, <span class="arithmatex">\(4{:}\,5\)</span></td>
        <td><span class="arithmatex">\((5,8,8,8)\)</span></td>
        <td><span class="arithmatex">\(4\)</span> su <span class="arithmatex">\((1,6)\)</span>, costo <span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4,6,2,5)\)</span></td>
        <td><span class="arithmatex">\(3{:}\,4\)</span></td>
        <td><span class="arithmatex">\((4,6,11,7,6)\)</span></td>
        <td><span class="arithmatex">\(3\)</span> su <span class="arithmatex">\((1,4)\)</span>, costo <span class="arithmatex">\(4\)</span></td>
        </tr>
        </table></div>

        Quindi $\pi=(1,3,4,6,2,5)$ e $CI(I)=4+4+4+2+4+2=20$.

    4. Le lunghezze sono $NI(I)=21$, $FI(I)=19$, $CI(I)=20$ e $NN(I)=20$ dalla città $1$. $FI$ trova un giro ottimo, $z(I)=19$; gli errori relativi sono 10.5% per $NI$, 5.3% per $CI$ e 5.3% per $NN$. $FI$ costruisce prima il contorno del giro attraverso le città $3$ e $4$, le più lontane dalla città $1$, e poi inserisce le città $2$, $5$ e $6$ dove costano poco (la città $6$ a costo $0$); $NI$ e $CI$ partono dalle città $5$, $2$ e $6$, vicine alla città $1$, e devono inserire le città lontane $3$ e $4$ alla fine, quando il sottogiro non ha più una posizione economica per loro.

<a id="esercizio-30-12"></a>

!!! esercizio "Esercizio 30.12: Costruzione di giri del TSP 3"

    Consideriamo un insieme $\mathscr{V}=\{1,\dots,5\}$ di $5$ città con coordinate $1{:}\,(8,1)$, $2{:}\,(5,0)$, $3{:}\,(6,4)$, $4{:}\,(6,3)$, $5{:}\,(3,5)$ e distanze uguali alle distanze euclidee arrotondate all'intero più vicino (l'istanza è metrica):

    $$
    \begin{array}{c|ccccc}
    \hline {d_{ij}} & {1} & {2} & {3} & {4} & {5} \\
    \hline {1} & --- & {3} & {4} & {3} & {6} \\
    {2} & {3} & --- & {4} & {3} & {5} \\
    {3} & {4} & {4} & --- & {1} & {3} \\
    {4} & {3} & {3} & {1} & --- & {4} \\
    {5} & {6} & {5} & {3} & {4} & --- \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare l'euristica nearest neighbour ($NN$) dalla città $1$.

    2. Applicare il nearest neighbour randomizzato $RNN_\alpha$ dalla città $1$ con $\alpha=\frac{1}{2}$, usando i numeri casuali $u_{1}=0.0159$, $u_{2}=0.4956$, $u_{3}=0.8564$ in quest'ordine. La RCL elenca le sue città per indice crescente, si sceglie la città in posizione $\lfloor u\cdot|RCL|\rfloor+1$, e si usa un numero casuale solo quando $|RCL|\ge2$. Fornire il giro della prima esecuzione.

    3. Proseguire con i numeri casuali rimanenti per una seconda esecuzione di $RNN_\alpha$ dalla città $1$.

    4. Sapendo che il valore ottimo è $z(I)=15$, confrontare i tre giri. Descrivere la RCL con $\alpha=0$ e con $\alpha=1$.

??? soluzione "Soluzione"

    1. 1. dalla città $1$ le distanze verso $2,3,4,5$ sono $3,4,3,6$: città $2$ (pareggio con $4$, risolto per indice);

        2. dalla città $2$ le distanze verso $3,4,5$ sono $4,3,5$: città $4$;

        3. dalla città $4$ le distanze verso $3,5$ sono $1,4$: città $3$;

        4. dalla città $3$ resta solo la città $5$, a distanza $3$;

        5. il giro si chiude con l'arco $(5,1)$, di lunghezza $6$;

        Quindi $\pi=(1,2,4,3,5)$ e $NN(I)=3+3+1+3+6=16$.

    2. 1. dalla città $1$ le distanze verso $2,3,4,5$ sono $3,4,3,6$; soglia $3+\frac{1}{2}\cdot(6-3)=4.5$, $RCL=\{2,3,4\}$; $u_{1}=0.0159$, posizione $\lfloor 0.0159\cdot 3\rfloor+1=1$: città $2$;

        2. dalla città $2$ le distanze verso $3,4,5$ sono $4,3,5$; soglia $3+\frac{1}{2}\cdot(5-3)=4$, $RCL=\{3,4\}$; $u_{2}=0.4956$, posizione $\lfloor 0.4956\cdot 2\rfloor+1=1$: città $3$;

        3. dalla città $3$ le distanze verso $4,5$ sono $1,3$; soglia $1+\frac{1}{2}\cdot(3-1)=2$, $RCL=\{4\}$: città $4$;

        4. dalla città $4$ resta solo la città $5$;

        Quindi $\pi=(1,2,3,4,5)$ e $L=3+4+1+4+6=18$.

    3. 1. dalla città $1$ le distanze verso $2,3,4,5$ sono $3,4,3,6$; soglia $3+\frac{1}{2}\cdot(6-3)=4.5$, $RCL=\{2,3,4\}$; $u_{3}=0.8564$, posizione $\lfloor 0.8564\cdot 3\rfloor+1=3$: città $4$;

        2. dalla città $4$ le distanze verso $2,3,5$ sono $3,1,4$; soglia $1+\frac{1}{2}\cdot(4-1)=2.5$, $RCL=\{3\}$: città $3$;

        3. dalla città $3$ le distanze verso $2,5$ sono $4,3$; soglia $3+\frac{1}{2}\cdot(4-3)=3.5$, $RCL=\{5\}$: città $5$;

        4. dalla città $5$ resta solo la città $2$;

        Quindi $\pi=(1,4,3,5,2)$ e $L=3+1+3+5+3=15$.

    4. $NN$ dalla città $1$ dà $16$, il 6.7% sopra l'ottimo; la prima esecuzione randomizzata dà $18$, peggio di $NN$, e la seconda $15=z(I)$, un giro ottimo. La randomizzazione può dare giri peggiori o migliori della scelta greedy, e ciò che la rende utile è ripetere la costruzione e tenere il giro migliore. Con $\alpha=0$ la RCL contiene solo le città più vicine, e $RNN_0$ è $NN$ con pareggi risolti a caso; con $\alpha=1$ la RCL contiene tutte le città non visitate, e il giro è completamente casuale.

## Colorazione: greedy e DSATUR

<a id="esercizio-30-13"></a>

!!! esercizio "Esercizio 30.13: Colorazione greedy e DSATUR 1"

    Consideriamo il grafo $G=(V,E)$ con $V=\{1,\dots,7\}$ ($n=7$) e $|E|=11$ archi:

    $$
    E=\big\{\{1,2\},\{1,3\},\{1,4\},\{2,4\},\{2,6\},\{3,7\},\{4,5\},\{4,6\},\{5,6\},\{5,7\},\{6,7\}\big\}.
    $$

    ![Figura 1](../img/es-constructive-heuristics/fig01.svg){ .fig loading=lazy  }

    **Domande**

    1. Calcolare i gradi e $\Delta(G)$, e il bound $\Delta(G)+1$ sul numero di colori di $GC$.

    2. Applicare $GC$ con la lista $\lambda=(1,2,\dots,7)$: per ogni vertice fornire l'insieme $U$ dei colori dei suoi vicini colorati e il colore assegnato.

    3. Applicare $DSATUR$: per ogni passo fornire il vertice scelto, il suo grado di saturazione $sat$, il suo grado fra i vertici non colorati $du$, e il suo colore.

    4. Trovare una cricca di cardinalità massima e determinare $\chi(G)$. Stabilire quale delle due colorazioni è ottima.

??? soluzione "Soluzione"

    1. Gli insiemi dei vicini sono $N(1)=\{2,3,4\}$, $N(2)=\{1,4,6\}$, $N(3)=\{1,7\}$, $N(4)=\{1,2,5,6\}$, $N(5)=\{4,6,7\}$, $N(6)=\{2,4,5,7\}$, $N(7)=\{3,5,6\}$. I gradi sono $(3,3,2,4,3,4,3)$, quindi $\Delta(G)=4$ e $GC$ usa al più $\Delta(G)+1=5$ colori, con qualunque lista.

    2. &#8203;

        $$
        \begin{array}{c|ccccccc}
        \hline {v} & {1} & {2} & {3} & {4} & {5} & {6} & {7} \\
        \hline {U} & {\emptyset} & {\{1\}} & {\{1\}} & {\{1,2\}} & {\{3\}} & {\{1,2,3\}} & {\{1,2,4\}} \\
        {col[v]} & {1} & {2} & {2} & {3} & {1} & {4} & {3} \\
        \hline
        \end{array}
        $$

        $GC$ usa $4$ colori: $Q_1=\{1,5\}$, $Q_2=\{2,3\}$, $Q_3=\{4,7\}$, $Q_4=\{6\}$. Il problema nasce al vertice $5$: prende il colore $1$, e il vertice $6$, adiacente a $2$, $4$ e $5$, vede allora i colori $1,2,3$.

    3. Al passo $1$ tutti i gradi di saturazione sono $0$, e i vertici di grado massimo sono $4$ e $6$: si sceglie il vertice $4$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>passo</th>
        <th><span class="arithmatex">\(1\)</span></th>
        <th><span class="arithmatex">\(2\)</span></th>
        <th><span class="arithmatex">\(3\)</span></th>
        <th><span class="arithmatex">\(4\)</span></th>
        <th><span class="arithmatex">\(5\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        <th><span class="arithmatex">\(7\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(v\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(sat[v]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(du[v]\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(col[v]\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        </table></div>

        Al passo $2$ i vicini di $4$ hanno grado di saturazione $1$, e il vertice $6$ ha più vicini non colorati ($5$, $7$ e $2$). Al passo $3$ i vertici $2$ e $5$ (entrambi adiacenti a $4$ e $6$) hanno grado di saturazione $2$ e un vicino non colorato ciascuno, e si sceglie $2$. $DSATUR$ usa $3$ colori: $Q_1=\{4,7\}$, $Q_2=\{1,6\}$, $Q_3=\{2,3,5\}$.

    4. $\{1,2,4\}$ è una cricca di cardinalità $3$ ($\{1,2\},\{1,4\},\{2,4\}\in E$), quindi $\chi(G)\ge\omega(G)\ge3$; non ci sono cricche di cardinalità $4$, ma non serve: la colorazione di $DSATUR$ usa $3$ colori, quindi $\chi(G)=3$. La colorazione di $DSATUR$ è ottima, quella di $GC$ con la lista $(1,\dots,7)$ usa un colore in più:

        $$
        \frac{GC(I)}{\chi(G)}=\frac43,\qquad\frac{DSATUR(I)}{\chi(G)}=1 .
        $$

<a id="esercizio-30-14"></a>

!!! esercizio "Esercizio 30.14: Colorazione greedy e DSATUR 2"

    Consideriamo il grafo corona $G_5$ con $n=10$ vertici: i vertici $1,\dots,5$ da un lato, i vertici $6,\dots,10$ dall'altro, e il vertice $i\in\{1,\dots,5\}$ adiacente al vertice $j+5$, $j\in\{1,\dots,5\}$, se e solo se $i\neq j$:

    $$
    E=\big\{\{i,j+5\} : i,j\in\{1,\dots,5\},\ i\neq j\big\},\qquad |E|=20 .
    $$

    **Domande**

    1. Calcolare $\Delta(G_5)$ e $\chi(G_5)$.

    2. Applicare $GC$ con la lista $\lambda=(1,6,2,7,3,8,4,9,5,10)$ e fornire $GC(I)$. Confrontarlo con $\Delta(G_5)+1$ e con $\chi(G_5)$.

    3. Fornire una lista per cui $GC$ è ottimo.

    4. Applicare $DSATUR$ e fornire $DSATUR(I)$.

??? soluzione "Soluzione"

    1. Ogni vertice $i\le5$ è adiacente ai $4$ vertici $j+5$ con $j\neq i$, e simmetricamente: ogni grado è $4$ e $\Delta(G_5)=4$. Il grafo è bipartito (tutti gli archi collegano $\{1,\dots,5\}$ e $\{6,\dots,10\}$) e ha archi, quindi $\chi(G_5)=2$.

    2. Con $u_i=i$ e $v_i=i+5$ la lista è $(u_1,v_1,u_2,v_2,\dots,u_5,v_5)$, la lista cattiva delle note:

        $$
        \begin{array}{c|cccccccccc}
        \hline {v} & {1} & {6} & {2} & {7} & {3} & {8} & {4} & {9} & {5} & {10} \\
        \hline {U} & {\emptyset} & {\emptyset} & {\{1\}} & {\{1\}} & {\{1,2\}} & {\{1,2\}} & {\{1,2,3\}} & {\{1,2,3\}} & {\{1,2,3,4\}} & {\{1,2,3,4\}} \\
        {col[v]} & {1} & {1} & {2} & {2} & {3} & {3} & {4} & {4} & {5} & {5} \\
        \hline
        \end{array}
        $$

        I vertici $i$ e $i+5$ non sono adiacenti e ricevono entrambi il colore $i$, quindi $GC(I)=5=\frac n2$. È esattamente il bound $\Delta(G_5)+1=5$, e

        $$
        \frac{GC(I)}{\chi(G_5)}=\frac52 .
        $$

    3. La lista $(1,2,3,4,5,6,7,8,9,10)$, prima un lato: i vertici $1,\dots,5$ sono a due a due non adiacenti e ricevono tutti il colore $1$; ogni vertice $6,\dots,10$ ha solo vicini di colore $1$ e riceve il colore $2$. Quindi $GC(I)=2=\chi(G_5)$.

    4. Al passo $1$ tutti i vertici hanno grado $4$ e si sceglie il vertice $1$ (colore $1$). Poi:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>passo</th>
        <th><span class="arithmatex">\(1\)</span></th>
        <th><span class="arithmatex">\(2\)</span></th>
        <th><span class="arithmatex">\(3\)</span></th>
        <th><span class="arithmatex">\(4\)</span></th>
        <th><span class="arithmatex">\(5\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        <th><span class="arithmatex">\(7\)</span></th>
        <th><span class="arithmatex">\(8\)</span></th>
        <th><span class="arithmatex">\(9\)</span></th>
        <th><span class="arithmatex">\(10\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(v\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(sat[v]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(du[v]\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(col[v]\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        Al passo $2$ i vicini $7,8,9,10$ del vertice $1$ hanno grado di saturazione $1$ e $3$ vicini non colorati ciascuno: si sceglie il vertice $7$, che riceve il colore $2$. Da quel momento, ogni vertice adiacente a un vertice colorato ha grado di saturazione $1$ (i suoi vicini colorati stanno tutti dall'altro lato, con lo stesso colore); i vertici del lato $\{1,\dots,5\}$ ricevono il colore $1$ e quelli del lato $\{6,\dots,10\}$ il colore $2$. Quindi $DSATUR(I)=2=\chi(G_5)$, come garantito sui grafi bipartiti.

<a id="esercizio-30-15"></a>

!!! esercizio "Esercizio 30.15: Colorazione greedy e DSATUR 3"

    Consideriamo il grafo $G=(V,E)$ con $V=\{1,\dots,7\}$ ($n=7$) e $|E|=10$ archi:

    $$
    E=\big\{\{1,3\},\{1,5\},\{1,6\},\{2,4\},\{2,5\},\{2,7\},\{3,5\},\{4,6\},\{4,7\},\{6,7\}\big\}.
    $$

    ![Figura 2](../img/es-constructive-heuristics/fig02.svg){ .fig loading=lazy  }

    **Domande**

    1. Applicare $DSATUR$ (pareggi: grado massimo fra i vertici non colorati, poi indice minimo) e fornire $DSATUR(I)$.

    2. Mostrare che $\chi(G)=3$.

    3. Stabilire se il risultato della Domanda 1 è in contraddizione con il bound $\Delta(G)+1$.

??? soluzione "Soluzione"

    1. Gli insiemi dei vicini sono $N(1)=\{3,5,6\}$, $N(2)=\{4,5,7\}$, $N(3)=\{1,5\}$, $N(4)=\{2,6,7\}$, $N(5)=\{1,2,3\}$, $N(6)=\{1,4,7\}$, $N(7)=\{2,4,6\}$.

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>passo</th>
        <th><span class="arithmatex">\(1\)</span></th>
        <th><span class="arithmatex">\(2\)</span></th>
        <th><span class="arithmatex">\(3\)</span></th>
        <th><span class="arithmatex">\(4\)</span></th>
        <th><span class="arithmatex">\(5\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        <th><span class="arithmatex">\(7\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(v\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(sat[v]\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(du[v]\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(col[v]\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        </table></div>

        - Passo $1$: vertice $1$ (grado $3$, indice minimo fra i vertici di grado $3$), colore $1$.

        - Passo $2$: i vicini $3,5,6$ del vertice $1$ hanno grado di saturazione $1$; i loro vicini non colorati sono rispettivamente $1$, $2$, $2$, e si sceglie il vertice $5$: colore $2$.

        - Passo $3$: il vertice $3$ vede i colori $1$ e $2$ (grado di saturazione $2$): colore $3$.

        - Passo $4$: i vertici $2$ (vicino $5$) e $6$ (vicino $1$) hanno grado di saturazione $1$ e due vicini non colorati ciascuno; si sceglie il vertice $2$, che riceve il colore $1$.

        - Passo $5$: i vertici $4$, $6$, $7$ hanno grado di saturazione $1$ e due vicini non colorati ciascuno; il vertice $4$ riceve il colore $2$.

        - Passo $6$: il vertice $6$ vede i colori $1$ (vertice $1$) e $2$ (vertice $4$), il vertice $7$ vede $1$ (vertice $2$) e $2$ (vertice $4$); entrambi hanno grado di saturazione $2$ e un vicino non colorato, e il vertice $6$ riceve il colore $3$.

        - Passo $7$: il vertice $7$ vede i colori $1,2,3$ e riceve il colore $4$.

        Quindi $DSATUR(I)=4$.

    2. $\{1,3,5\}$ è un triangolo, quindi $\chi(G)\ge3$. La colorazione $Q_1=\{1,4\}$, $Q_2=\{2,3,6\}$, $Q_3=\{5,7\}$ è ammissibile (nessun arco dentro una classe: $\{1,4\}$, $\{2,3\}$, $\{2,6\}$, $\{3,6\}$, $\{5,7\}\notin E$), quindi $\chi(G)=3$ e

        $$
        \frac{DSATUR(I)}{\chi(G)}=\frac43 .
        $$

        Il danno lo fa il passo $5$: i vertici $6$ e $7$ vedono già il colore $1$ (dai vertici $1$ e $2$), e il vertice $4$, loro vicino comune, prende il colore $2$. Ai due vertici adiacenti $6$ e $7$ resta solo il colore $3$, e uno dei due richiede un quarto colore. Nella colorazione ottima il vertice $4$ ha lo stesso colore del vertice $1$.

    3. No: i gradi sono $(3,3,2,3,3,3,3)$, quindi $\Delta(G)+1=4$ e $DSATUR(I)=4$ raggiunge il bound. Il bound $\Delta(G)+1$ limita il numero di colori, non lo confronta con $\chi(G)$.
