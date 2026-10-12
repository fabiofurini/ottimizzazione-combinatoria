---
title: "Esercizi · Algoritmi di approssimazione per lo zaino"
---

# Esercizi · Algoritmi di approssimazione per lo zaino

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 35** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 35: Zaino 0/1 (KP)](../algoritmi-di-approssimazione/knapsack-approximation.md) · [:material-file-pdf-box: Eserciziario, volume 5 (PDF)](../pdf/esercizi-5-algoritmi-di-approssimazione.pdf)

</div>

## Algoritmo greedy

<a id="esercizio-35-1"></a>

!!! esercizio "Esercizio 35.1: Greedy 1"

    Consideriamo uno zaino di capacità $c = 15$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n=5$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} \\[1ex]
    \hline {p_i} & {12} & {6} & {6} & {8} & {6} \\[1ex]
    {w_i} & {3} & {2} & {3} & {9} & {7} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Verificare che gli oggetti siano ordinati per efficienza non crescente, e determinare l'oggetto critico $s$ e la capacità residua $\mathit{rc}$.

    2. Applicare l'algoritmo greedy ($GR$) a questa istanza. Mostrare l'esecuzione passo per passo, indicando a ogni iterazione se l'oggetto viene selezionato e la capacità residua che ne risulta. Indicare la soluzione $S$ restituita da $GR$ e $GR(I)$.

    3. Calcolare l'upper bound $U=\sum_{i=1}^{s-1}p_i + p_s\,\frac{\mathit{rc}}{w_s}$ su $z(I)$ dato dal rilassamento lineare, e dedurre un upper bound sul rapporto di prestazione $\frac{z(I)}{GR(I)}$.

    4. Stabilire se $GR$ trova una soluzione ottima su questa istanza, mostrando che $GR(I)$ raggiunge l'upper bound $\lfloor U\rfloor$ oppure esibendo una soluzione ammissibile di profitto maggiore.

??? soluzione "Soluzione"

    1. Le efficienze degli oggetti sono

        $$
        \begin{gathered}
        \frac{p_{1}}{w_{1}}=\frac{12}{3}=4,\quad \frac{p_{2}}{w_{2}}=\frac{6}{2}=3,\quad \frac{p_{3}}{w_{3}}=\frac{6}{3}=2,\quad \frac{p_{4}}{w_{4}}=\frac{8}{9}\approx 0.89,\\
        \frac{p_{5}}{w_{5}}=\frac{6}{7}\approx 0.86
        \end{gathered},
        $$

        quindi gli oggetti sono ordinati per efficienza non crescente. Poiché

        $$
        \sum_{i=1}^{3} w_i = 3+2+3 = 8 \le 15
        \qquad\text{e}\qquad
        \sum_{i=1}^{4} w_i = 3+2+3+9 = 17 > 15,
        $$

        l'oggetto critico è $s=4$ e la capacità residua è $\mathit{rc} = 15 - 8 = 7$.

    2. All'inizio $rc:=c=15$. L'esecuzione di $GR$ procede come segue:

        1. Oggetto $1$ (peso $w_{1}=3$): $w_{1}=3\le rc=15$, quindi l'oggetto viene selezionato e $rc\leftarrow 15-3=12$.

        2. Oggetto $2$ (peso $w_{2}=2$): $w_{2}=2\le rc=12$, quindi l'oggetto viene selezionato e $rc\leftarrow 12-2=10$.

        3. Oggetto $3$ (peso $w_{3}=3$): $w_{3}=3\le rc=10$, quindi l'oggetto viene selezionato e $rc\leftarrow 10-3=7$.

        4. Oggetto $4$ (peso $w_{4}=9$): $w_{4}=9> rc=7$, quindi l'oggetto non viene selezionato.

        5. Oggetto $5$ (peso $w_{5}=7$): $w_{5}=7\le rc=7$, quindi l'oggetto viene selezionato e $rc\leftarrow 7-7=0$.

        Quindi $GR$ restituisce la soluzione $S=\{1,2,3,5\}$ con

        $$
        GR(I)=12+6+6+6=30.
        $$

        $GR$ seleziona tutti gli oggetti che precedono l'oggetto critico, non seleziona l'oggetto critico $4$, e seleziona anche l'oggetto $5$, che lo segue.

    3. Il rilassamento lineare dà

        $$
        z(I)\le U = 12+6+6 + 8\cdot\frac{7}{9} = \frac{272}{9} \approx 30.22 ,
        $$

        e poiché $z(I)$ è intero, $z(I)\le \lfloor U\rfloor = 30$. Quindi

        $$
        \frac{z(I)}{GR(I)} \le \frac{30}{30} = 1 .
        $$

    4. Poiché $GR(I)=30=\lfloor U\rfloor$, nessuna soluzione ammissibile ha profitto maggiore: $GR$ trova una soluzione <strong>ottima</strong> su questa istanza, e $z(I)=30$.

<a id="esercizio-35-2"></a>

!!! esercizio "Esercizio 35.2: Greedy 2"

    Consideriamo uno zaino di capacità $c = 13$ e un insieme $\mathscr{I} = \{1,2,3,4,5,6\}$ di $6$ oggetti ($n=6$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|cccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} & {i=6} \\[1ex]
    \hline {p_i} & {10} & {6} & {3} & {7} & {11} & {2} \\[1ex]
    {w_i} & {1} & {1} & {1} & {4} & {8} & {3} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Verificare che gli oggetti siano ordinati per efficienza non crescente, e determinare l'oggetto critico $s$ e la capacità residua $\mathit{rc}$.

    2. Applicare l'algoritmo greedy ($GR$) a questa istanza. Mostrare l'esecuzione passo per passo, indicando a ogni iterazione se l'oggetto viene selezionato e la capacità residua che ne risulta. Indicare la soluzione $S$ restituita da $GR$ e $GR(I)$.

    3. Calcolare l'upper bound $U=\sum_{i=1}^{s-1}p_i + p_s\,\frac{\mathit{rc}}{w_s}$ su $z(I)$ dato dal rilassamento lineare, e dedurre un upper bound sul rapporto di prestazione $\frac{z(I)}{GR(I)}$.

    4. Stabilire se $GR$ trova una soluzione ottima su questa istanza, mostrando che $GR(I)$ raggiunge l'upper bound $\lfloor U\rfloor$ oppure esibendo una soluzione ammissibile di profitto maggiore.

??? soluzione "Soluzione"

    1. Le efficienze degli oggetti sono

        $$
        \begin{gathered}
        \frac{p_{1}}{w_{1}}=\frac{10}{1}=10,\quad \frac{p_{2}}{w_{2}}=\frac{6}{1}=6,\quad \frac{p_{3}}{w_{3}}=\frac{3}{1}=3,\quad \frac{p_{4}}{w_{4}}=\frac{7}{4}=1.75,\\
        \frac{p_{5}}{w_{5}}=\frac{11}{8}\approx 1.38,\quad \frac{p_{6}}{w_{6}}=\frac{2}{3}\approx 0.67
        \end{gathered},
        $$

        quindi gli oggetti sono ordinati per efficienza non crescente. Poiché

        $$
        \sum_{i=1}^{4} w_i = 1+1+1+4 = 7 \le 13
        \qquad\text{e}\qquad
        \sum_{i=1}^{5} w_i = 1+1+1+4+8 = 15 > 13,
        $$

        l'oggetto critico è $s=5$ e la capacità residua è $\mathit{rc} = 13 - 7 = 6$.

    2. All'inizio $rc:=c=13$. L'esecuzione di $GR$ procede come segue:

        1. Oggetto $1$ (peso $w_{1}=1$): $w_{1}=1\le rc=13$, quindi l'oggetto viene selezionato e $rc\leftarrow 13-1=12$.

        2. Oggetto $2$ (peso $w_{2}=1$): $w_{2}=1\le rc=12$, quindi l'oggetto viene selezionato e $rc\leftarrow 12-1=11$.

        3. Oggetto $3$ (peso $w_{3}=1$): $w_{3}=1\le rc=11$, quindi l'oggetto viene selezionato e $rc\leftarrow 11-1=10$.

        4. Oggetto $4$ (peso $w_{4}=4$): $w_{4}=4\le rc=10$, quindi l'oggetto viene selezionato e $rc\leftarrow 10-4=6$.

        5. Oggetto $5$ (peso $w_{5}=8$): $w_{5}=8> rc=6$, quindi l'oggetto non viene selezionato.

        6. Oggetto $6$ (peso $w_{6}=3$): $w_{6}=3\le rc=6$, quindi l'oggetto viene selezionato e $rc\leftarrow 6-3=3$.

        Quindi $GR$ restituisce la soluzione $S=\{1,2,3,4,6\}$ con

        $$
        GR(I)=10+6+3+7+2=28.
        $$

        $GR$ seleziona tutti gli oggetti che precedono l'oggetto critico, non seleziona l'oggetto critico $5$, e seleziona anche l'oggetto $6$, che lo segue.

    3. Il rilassamento lineare dà

        $$
        z(I)\le U = 10+6+3+7 + 11\cdot\frac{6}{8} = \frac{137}{4} \approx 34.25 ,
        $$

        e poiché $z(I)$ è intero, $z(I)\le \lfloor U\rfloor = 34$. Quindi

        $$
        \frac{z(I)}{GR(I)} \le \frac{34}{28}=\frac{17}{14} \approx 1.21 .
        $$

    4. La soluzione $\tilde{S}=\{1,2,3,5\}$, di peso $1+1+1+8=11\le 13$ e profitto $z(I)=10+6+3+11=30$ è ammissibile e ha profitto maggiore di $GR(I)=28$. Quindi $GR$ <strong>non</strong> trova una soluzione ottima su questa istanza; la soluzione $\tilde{S}$ è ottima (lo si verifica enumerando le soluzioni ammissibili), e il rapporto di prestazione è

        $$
        \frac{z(I)}{GR(I)}=\frac{30}{28}=\frac{15}{14}\approx 1.07 .
        $$

        L'oggetto di profitto massimo, l'oggetto $5$ con $p_{5}=11$, non viene selezionato da $GR$: la sua efficienza bassa lo mette in fondo all'ordine, quando la capacità residua non basta più.

<a id="esercizio-35-3"></a>

!!! esercizio "Esercizio 35.3: Greedy 3"

    Consideriamo uno zaino di capacità $c = 12$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n=5$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} \\[1ex]
    \hline {p_i} & {8} & {7} & {18} & {14} & {10} \\[1ex]
    {w_i} & {3} & {3} & {9} & {8} & {7} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Verificare che gli oggetti siano ordinati per efficienza non crescente, e determinare l'oggetto critico $s$ e la capacità residua $\mathit{rc}$.

    2. Applicare l'algoritmo greedy ($GR$) a questa istanza. Mostrare l'esecuzione passo per passo, indicando a ogni iterazione se l'oggetto viene selezionato e la capacità residua che ne risulta. Indicare la soluzione $S$ restituita da $GR$ e $GR(I)$.

    3. Calcolare l'upper bound $U=\sum_{i=1}^{s-1}p_i + p_s\,\frac{\mathit{rc}}{w_s}$ su $z(I)$ dato dal rilassamento lineare, e dedurre un upper bound sul rapporto di prestazione $\frac{z(I)}{GR(I)}$.

    4. Stabilire se $GR$ trova una soluzione ottima su questa istanza, mostrando che $GR(I)$ raggiunge l'upper bound $\lfloor U\rfloor$ oppure esibendo una soluzione ammissibile di profitto maggiore.

??? soluzione "Soluzione"

    1. Le efficienze degli oggetti sono

        $$
        \begin{gathered}
        \frac{p_{1}}{w_{1}}=\frac{8}{3}\approx 2.67,\quad \frac{p_{2}}{w_{2}}=\frac{7}{3}\approx 2.33,\quad \frac{p_{3}}{w_{3}}=\frac{18}{9}=2,\quad \frac{p_{4}}{w_{4}}=\frac{14}{8}=1.75,\\
        \frac{p_{5}}{w_{5}}=\frac{10}{7}\approx 1.43
        \end{gathered},
        $$

        quindi gli oggetti sono ordinati per efficienza non crescente. Poiché

        $$
        \sum_{i=1}^{2} w_i = 3+3 = 6 \le 12
        \qquad\text{e}\qquad
        \sum_{i=1}^{3} w_i = 3+3+9 = 15 > 12,
        $$

        l'oggetto critico è $s=3$ e la capacità residua è $\mathit{rc} = 12 - 6 = 6$.

    2. All'inizio $rc:=c=12$. L'esecuzione di $GR$ procede come segue:

        1. Oggetto $1$ (peso $w_{1}=3$): $w_{1}=3\le rc=12$, quindi l'oggetto viene selezionato e $rc\leftarrow 12-3=9$.

        2. Oggetto $2$ (peso $w_{2}=3$): $w_{2}=3\le rc=9$, quindi l'oggetto viene selezionato e $rc\leftarrow 9-3=6$.

        3. Oggetto $3$ (peso $w_{3}=9$): $w_{3}=9> rc=6$, quindi l'oggetto non viene selezionato.

        4. Oggetto $4$ (peso $w_{4}=8$): $w_{4}=8> rc=6$, quindi l'oggetto non viene selezionato.

        5. Oggetto $5$ (peso $w_{5}=7$): $w_{5}=7> rc=6$, quindi l'oggetto non viene selezionato.

        Quindi $GR$ restituisce la soluzione $S=\{1,2\}$ con

        $$
        GR(I)=8+7=15.
        $$

        Qui $GR$ seleziona esattamente gli oggetti che precedono l'oggetto critico.

    3. Il rilassamento lineare dà

        $$
        z(I)\le U = 8+7 + 18\cdot\frac{6}{9} = 27 ,
        $$

        e poiché $z(I)$ è intero, $z(I)\le \lfloor U\rfloor = 27$. Quindi

        $$
        \frac{z(I)}{GR(I)} \le \frac{27}{15}=\frac{9}{5}=1.8 .
        $$

    4. La soluzione $\tilde{S}=\{1,3\}$, di peso $3+9=12\le 12$ e profitto $z(I)=8+18=26$ è ammissibile e ha profitto maggiore di $GR(I)=15$. Quindi $GR$ <strong>non</strong> trova una soluzione ottima su questa istanza; la soluzione $\tilde{S}$ è ottima (lo si verifica enumerando le soluzioni ammissibili), e il rapporto di prestazione è

        $$
        \frac{z(I)}{GR(I)}=\frac{26}{15}\approx 1.73 .
        $$

        L'oggetto di profitto massimo, l'oggetto $3$ con $p_{3}=18$, non viene selezionato da $GR$: la sua efficienza bassa lo mette in fondo all'ordine, quando la capacità residua non basta più.

## Algoritmo greedy esteso

<a id="esercizio-35-4"></a>

!!! esercizio "Esercizio 35.4: Ext-Greedy 1"

    Consideriamo uno zaino di capacità $c = 22$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n=5$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} \\[1ex]
    \hline {p_i} & {11} & {5} & {3} & {4} & {3} \\[1ex]
    {w_i} & {8} & {4} & {3} & {9} & {8} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare passo per passo l'algoritmo greedy ($GR$) a questa istanza, e indicare $GR(I)$.

    2. Determinare il profitto massimo $p_{\max}$ e la migliore soluzione ammissibile con un solo oggetto $\bar{S}$. Indicare la soluzione restituita dall'algoritmo Ext-Greedy ($GR^e$) e $GR^e(I)$.

    3. Determinare l'oggetto critico $s$ e verificare le due disuguaglianze $\sum_{i=1}^{s-1}p_i\le GR^e(I)$ e $p_s\le GR^e(I)$ usate nella dimostrazione della garanzia di prestazione di $GR^e$. Dedurre un upper bound su $z(I)$.

    4. Stabilire se $GR^e$ trova una soluzione ottima su questa istanza, e calcolare il rapporto di prestazione $\frac{z(I)}{GR^e(I)}$, confrontandolo con la garanzia di prestazione relativa $2$ di $GR^e$.

??? soluzione "Soluzione"

    1. Le efficienze degli oggetti sono

        $$
        \begin{gathered}
        \frac{p_{1}}{w_{1}}=\frac{11}{8}\approx 1.38,\quad \frac{p_{2}}{w_{2}}=\frac{5}{4}=1.25,\quad \frac{p_{3}}{w_{3}}=\frac{3}{3}=1,\quad \frac{p_{4}}{w_{4}}=\frac{4}{9}\approx 0.44,\\
        \frac{p_{5}}{w_{5}}=\frac{3}{8}\approx 0.38
        \end{gathered},
        $$

        quindi gli oggetti sono ordinati per efficienza non crescente. All'inizio $rc:=c=22$, e $GR$ procede come segue:

        1. Oggetto $1$ (peso $w_{1}=8$): $w_{1}=8\le rc=22$, quindi l'oggetto viene selezionato e $rc\leftarrow 22-8=14$.

        2. Oggetto $2$ (peso $w_{2}=4$): $w_{2}=4\le rc=14$, quindi l'oggetto viene selezionato e $rc\leftarrow 14-4=10$.

        3. Oggetto $3$ (peso $w_{3}=3$): $w_{3}=3\le rc=10$, quindi l'oggetto viene selezionato e $rc\leftarrow 10-3=7$.

        4. Oggetto $4$ (peso $w_{4}=9$): $w_{4}=9> rc=7$, quindi l'oggetto non viene selezionato.

        5. Oggetto $5$ (peso $w_{5}=8$): $w_{5}=8> rc=7$, quindi l'oggetto non viene selezionato.

        Quindi $GR$ restituisce $S=\{1,2,3\}$ e $GR(I)=11+5+3=19$.

    2. Il profitto massimo è $p_{\max} = p_{1} = 11$, e l'oggetto $1$ entra nello zaino ($w_{1}=8\le 22$), quindi $\bar{S}=\{1\}$. Poiché $GR(I)=19\ge p_{\max}=11$, $GR^e$ mantiene la soluzione greedy:

        $$
        GR^e(I)=GR(I)=19 .
        $$

    3. Poiché $\sum_{i=1}^{3} w_i=15\le 22$ e $\sum_{i=1}^{4} w_i=24> 22$, l'oggetto critico è $s=4$. Allora

        $$
        \sum_{i=1}^{s-1}p_i = 11+5+3 = 19 \le GR^e(I)=19
        \qquad\text{e}\qquad
        p_s = p_{4} = 4 \le GR^e(I)=19,
        $$

        e, come nella dimostrazione della garanzia di prestazione,

        $$
        z(I) \;\le\; \sum_{i=1}^{s-1}p_i + p_s \;=\; 23 \;\le\; 2\,GR^e(I) = 38 .
        $$

    4. La soluzione $\tilde{S}=\{1,2,4\}$, di peso $8+4+9=21\le 22$ e profitto $z(I)=11+5+4=20$ è ammissibile e migliore di quella restituita da $GR^e$, quindi $GR^e$ <strong>non</strong> trova una soluzione ottima; $\tilde{S}$ è ottima (lo si verifica enumerando le soluzioni ammissibili). Il rapporto di prestazione è

        $$
        \frac{z(I)}{GR^e(I)}=\frac{20}{19}\approx 1.05 \;\le\; 2,
        $$

        come garantito.

<a id="esercizio-35-5"></a>

!!! esercizio "Esercizio 35.5: Ext-Greedy 2"

    Consideriamo uno zaino di capacità $c = 8$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n=5$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} \\[1ex]
    \hline {p_i} & {16} & {19} & {18} & {14} & {8} \\[1ex]
    {w_i} & {5} & {8} & {8} & {7} & {6} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare passo per passo l'algoritmo greedy ($GR$) a questa istanza, e indicare $GR(I)$.

    2. Determinare il profitto massimo $p_{\max}$ e la migliore soluzione ammissibile con un solo oggetto $\bar{S}$. Indicare la soluzione restituita dall'algoritmo Ext-Greedy ($GR^e$) e $GR^e(I)$.

    3. Determinare l'oggetto critico $s$ e verificare le due disuguaglianze $\sum_{i=1}^{s-1}p_i\le GR^e(I)$ e $p_s\le GR^e(I)$ usate nella dimostrazione della garanzia di prestazione di $GR^e$. Dedurre un upper bound su $z(I)$.

    4. Stabilire se $GR^e$ trova una soluzione ottima su questa istanza, e calcolare il rapporto di prestazione $\frac{z(I)}{GR^e(I)}$, confrontandolo con la garanzia di prestazione relativa $2$ di $GR^e$.

??? soluzione "Soluzione"

    1. Le efficienze degli oggetti sono

        $$
        \begin{gathered}
        \frac{p_{1}}{w_{1}}=\frac{16}{5}=3.2,\quad \frac{p_{2}}{w_{2}}=\frac{19}{8}\approx 2.38,\quad \frac{p_{3}}{w_{3}}=\frac{18}{8}=2.25,\quad \frac{p_{4}}{w_{4}}=\frac{14}{7}=2,\\
        \frac{p_{5}}{w_{5}}=\frac{8}{6}\approx 1.33
        \end{gathered},
        $$

        quindi gli oggetti sono ordinati per efficienza non crescente. All'inizio $rc:=c=8$, e $GR$ procede come segue:

        1. Oggetto $1$ (peso $w_{1}=5$): $w_{1}=5\le rc=8$, quindi l'oggetto viene selezionato e $rc\leftarrow 8-5=3$.

        2. Oggetto $2$ (peso $w_{2}=8$): $w_{2}=8> rc=3$, quindi l'oggetto non viene selezionato.

        3. Oggetto $3$ (peso $w_{3}=8$): $w_{3}=8> rc=3$, quindi l'oggetto non viene selezionato.

        4. Oggetto $4$ (peso $w_{4}=7$): $w_{4}=7> rc=3$, quindi l'oggetto non viene selezionato.

        5. Oggetto $5$ (peso $w_{5}=6$): $w_{5}=6> rc=3$, quindi l'oggetto non viene selezionato.

        Quindi $GR$ restituisce $S=\{1\}$ e $GR(I)=16$.

    2. Il profitto massimo è $p_{\max} = p_{2} = 19$, e l'oggetto $2$ entra nello zaino ($w_{2}=8\le 8$), quindi $\bar{S}=\{2\}$. Poiché $GR(I)=16<p_{\max}=19$, $GR^e$ sostituisce la soluzione greedy con $\bar{S}$:

        $$
        GR^e(I)=p_{\max}=19 .
        $$

    3. Poiché $\sum_{i=1}^{1} w_i=5\le 8$ e $\sum_{i=1}^{2} w_i=13> 8$, l'oggetto critico è $s=2$. Allora

        $$
        \sum_{i=1}^{s-1}p_i = 16 \le GR^e(I)=19
        \qquad\text{e}\qquad
        p_s = p_{2} = 19 \le GR^e(I)=19,
        $$

        e, come nella dimostrazione della garanzia di prestazione,

        $$
        z(I) \;\le\; \sum_{i=1}^{s-1}p_i + p_s \;=\; 35 \;\le\; 2\,GR^e(I) = 38 .
        $$

    4. La soluzione restituita da $GR^e$ è <strong>ottima</strong>: $\tilde{S}=\{2\}$, di peso $8\le 8$ e profitto $z(I)=19$. Il rapporto di prestazione è $\frac{z(I)}{GR^e(I)}=1$.

<a id="esercizio-35-6"></a>

!!! esercizio "Esercizio 35.6: Ext-Greedy 3"

    Consideriamo uno zaino di capacità $c = 16$ e un insieme $\mathscr{I} = \{1,2,3\}$ di $3$ oggetti ($n=3$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|ccc}
    \hline  & {i=1} & {i=2} & {i=3} \\[1ex]
    \hline {p_i} & {2} & {8} & {8} \\[1ex]
    {w_i} & {1} & {8} & {8} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare passo per passo l'algoritmo greedy ($GR$) a questa istanza, e indicare $GR(I)$.

    2. Determinare il profitto massimo $p_{\max}$ e la migliore soluzione ammissibile con un solo oggetto $\bar{S}$. Indicare la soluzione restituita dall'algoritmo Ext-Greedy ($GR^e$) e $GR^e(I)$.

    3. Determinare l'oggetto critico $s$ e verificare le due disuguaglianze $\sum_{i=1}^{s-1}p_i\le GR^e(I)$ e $p_s\le GR^e(I)$ usate nella dimostrazione della garanzia di prestazione di $GR^e$. Dedurre un upper bound su $z(I)$.

    4. Stabilire se $GR^e$ trova una soluzione ottima su questa istanza, e calcolare il rapporto di prestazione $\frac{z(I)}{GR^e(I)}$, confrontandolo con la garanzia di prestazione relativa $2$ di $GR^e$.

??? soluzione "Soluzione"

    1. Le efficienze degli oggetti sono

        $$
        \frac{p_{1}}{w_{1}}=\frac{2}{1}=2,\quad \frac{p_{2}}{w_{2}}=\frac{8}{8}=1,\quad \frac{p_{3}}{w_{3}}=\frac{8}{8}=1,
        $$

        quindi gli oggetti sono ordinati per efficienza non crescente. All'inizio $rc:=c=16$, e $GR$ procede come segue:

        1. Oggetto $1$ (peso $w_{1}=1$): $w_{1}=1\le rc=16$, quindi l'oggetto viene selezionato e $rc\leftarrow 16-1=15$.

        2. Oggetto $2$ (peso $w_{2}=8$): $w_{2}=8\le rc=15$, quindi l'oggetto viene selezionato e $rc\leftarrow 15-8=7$.

        3. Oggetto $3$ (peso $w_{3}=8$): $w_{3}=8> rc=7$, quindi l'oggetto non viene selezionato.

        Quindi $GR$ restituisce $S=\{1,2\}$ e $GR(I)=2+8=10$.

    2. Il profitto massimo è $p_{\max} = p_{2} = 8$, e l'oggetto $2$ entra nello zaino ($w_{2}=8\le 16$), quindi $\bar{S}=\{2\}$. Poiché $GR(I)=10\ge p_{\max}=8$, $GR^e$ mantiene la soluzione greedy:

        $$
        GR^e(I)=GR(I)=10 .
        $$

    3. Poiché $\sum_{i=1}^{2} w_i=9\le 16$ e $\sum_{i=1}^{3} w_i=17> 16$, l'oggetto critico è $s=3$. Allora

        $$
        \sum_{i=1}^{s-1}p_i = 2+8 = 10 \le GR^e(I)=10
        \qquad\text{e}\qquad
        p_s = p_{3} = 8 \le GR^e(I)=10,
        $$

        e, come nella dimostrazione della garanzia di prestazione,

        $$
        z(I) \;\le\; \sum_{i=1}^{s-1}p_i + p_s \;=\; 18 \;\le\; 2\,GR^e(I) = 20 .
        $$

    4. La soluzione $\tilde{S}=\{2,3\}$, di peso $8+8=16\le 16$ e profitto $z(I)=8+8=16$ è ammissibile e migliore di quella restituita da $GR^e$, quindi $GR^e$ <strong>non</strong> trova una soluzione ottima; $\tilde{S}$ è ottima (lo si verifica enumerando le soluzioni ammissibili). Il rapporto di prestazione è

        $$
        \frac{z(I)}{GR^e(I)}=\frac{16}{10}=\frac{8}{5}=1.6 \;\le\; 2,
        $$

        come garantito.

    - <strong>Osservazione.</strong> Questa istanza appartiene alla famiglia di istanze usata per mostrare che la garanzia di prestazione relativa $2$ di $GR^e$ è tight, con $\vartheta=8$: lì il rapporto è $\frac{2\vartheta}{\vartheta+2}$, e qui $\frac{16}{10}=1.6$; tende a $2$ al crescere di $\vartheta$.

## L'euristica $H^2$

<a id="esercizio-35-7"></a>

!!! esercizio "Esercizio 35.7: $H^2$ 1"

    Consideriamo uno zaino di capacità $c = 11$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n=5$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} \\[1ex]
    \hline {p_i} & {8} & {9} & {2} & {3} & {2} \\[1ex]
    {w_i} & {5} & {8} & {3} & {7} & {9} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Verificare che gli oggetti siano ordinati per efficienza non crescente, e determinare l'insieme $\mathscr{P}$ delle coppie ammissibili di oggetti.

    2. Applicare l'algoritmo $H^2$ a questa istanza: per ogni coppia ammissibile $(i,k)$ calcolare la capacità residua $\mathit{rc}$, l'insieme residuo $\mathscr{I}(i,k)$, il valore di $GR^e$ sull'istanza residua e il valore $lb(i,k)$.

    3. Indicare la soluzione restituita da $H^2$ e $H^2(I)$.

    4. Confrontare $H^2(I)$ con $GR^e(I)$ e con $z(I)$, e calcolare il rapporto di prestazione $\frac{z(I)}{H^2(I)}$, confrontandolo con la garanzia di prestazione relativa $\frac{4}{3}$ di $H^2$.

??? soluzione "Soluzione"

    1. Le efficienze degli oggetti sono

        $$
        \begin{gathered}
        \frac{p_{1}}{w_{1}}=\frac{8}{5}=1.6,\quad \frac{p_{2}}{w_{2}}=\frac{9}{8}\approx 1.12,\quad \frac{p_{3}}{w_{3}}=\frac{2}{3}\approx 0.67,\quad \frac{p_{4}}{w_{4}}=\frac{3}{7}\approx 0.43,\\
        \frac{p_{5}}{w_{5}}=\frac{2}{9}\approx 0.22
        \end{gathered},
        $$

        quindi gli oggetti sono ordinati per efficienza non crescente. Una coppia $(i,k)$ con $i<k$ è ammissibile se $w_i+w_k\le c=11$, quindi

        $$
        \mathscr{P}=\big\{(1,3),(2,3),(3,4)\big\}.
        $$

    2. L'algoritmo parte dal miglior oggetto singolo, $lb=p_{\max}=p_{2}=9$. Per ogni coppia ammissibile, l'insieme residuo mantiene gli oggetti $j\notin\{i,k\}$ con $p_j\le\min\{p_i,p_k\}$ e $w_j\le\mathit{rc}$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>coppia</th>
        <th>peso</th>
        <th><span class="arithmatex">\(\mathit{rc}\)</span></th>
        <th>insieme residuo</th>
        <th><span class="arithmatex">\(GR^e\)</span> sul residuo</th>
        <th>valore</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,2)\)</span></td>
        <td><span class="arithmatex">\(13>11\)</span></td>
        <td colspan="4">non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4)\)</span></td>
        <td><span class="arithmatex">\(12>11\)</span></td>
        <td colspan="4">non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(14>11\)</span></td>
        <td colspan="4">non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,3)\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(15>11\)</span></td>
        <td colspan="4">non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(17>11\)</span></td>
        <td colspan="4">non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,4)\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,5)\)</span></td>
        <td><span class="arithmatex">\(12>11\)</span></td>
        <td colspan="4">non ammissibile</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((4,5)\)</span></td>
        <td><span class="arithmatex">\(16>11\)</span></td>
        <td colspan="4">non ammissibile</td>
        </tr>
        </table></div>

    3. Il valore massimo è $11$, ottenuto con la soluzione $\{2,3\}$. Quindi

        $$
        H^2(I)=11 .
        $$

    4. Su questa istanza $GR^e(I)=10$, quindi $H^2$ migliora $GR^e$. La soluzione restituita da $H^2$ è <strong>ottima</strong>: $\tilde{S}=\{2,3\}$, di peso $8+3=11\le 11$ e profitto $z(I)=9+2=11$, e il rapporto di prestazione è $1$.

<a id="esercizio-35-8"></a>

!!! esercizio "Esercizio 35.8: $H^2$ 2"

    Consideriamo uno zaino di capacità $c = 15$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n=5$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} \\[1ex]
    \hline {p_i} & {14} & {9} & {5} & {10} & {15} \\[1ex]
    {w_i} & {1} & {1} & {2} & {5} & {8} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Verificare che gli oggetti siano ordinati per efficienza non crescente, e determinare l'insieme $\mathscr{P}$ delle coppie ammissibili di oggetti.

    2. Applicare l'algoritmo $H^2$ a questa istanza: per ogni coppia ammissibile $(i,k)$ calcolare la capacità residua $\mathit{rc}$, l'insieme residuo $\mathscr{I}(i,k)$, il valore di $GR^e$ sull'istanza residua e il valore $lb(i,k)$.

    3. Indicare la soluzione restituita da $H^2$ e $H^2(I)$.

    4. Confrontare $H^2(I)$ con $GR^e(I)$ e con $z(I)$, e calcolare il rapporto di prestazione $\frac{z(I)}{H^2(I)}$, confrontandolo con la garanzia di prestazione relativa $\frac{4}{3}$ di $H^2$.

??? soluzione "Soluzione"

    1. Le efficienze degli oggetti sono

        $$
        \begin{gathered}
        \frac{p_{1}}{w_{1}}=\frac{14}{1}=14,\quad \frac{p_{2}}{w_{2}}=\frac{9}{1}=9,\quad \frac{p_{3}}{w_{3}}=\frac{5}{2}=2.5,\quad \frac{p_{4}}{w_{4}}=\frac{10}{5}=2,\\
        \frac{p_{5}}{w_{5}}=\frac{15}{8}\approx 1.88
        \end{gathered},
        $$

        quindi gli oggetti sono ordinati per efficienza non crescente. Una coppia $(i,k)$ con $i<k$ è ammissibile se $w_i+w_k\le c=15$, quindi

        $$
        \mathscr{P}=\big\{(1,2),(1,3),(1,4),(1,5),(2,3),(2,4),(2,5),(3,4),(3,5),(4,5)\big\}.
        $$

    2. L'algoritmo parte dal miglior oggetto singolo, $lb=p_{\max}=p_{5}=15$. Per ogni coppia ammissibile, l'insieme residuo mantiene gli oggetti $j\notin\{i,k\}$ con $p_j\le\min\{p_i,p_k\}$ e $w_j\le\mathit{rc}$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>coppia</th>
        <th>peso</th>
        <th><span class="arithmatex">\(\mathit{rc}\)</span></th>
        <th>insieme residuo</th>
        <th><span class="arithmatex">\(GR^e\)</span> sul residuo</th>
        <th>valore</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,2)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(\{3\}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4)\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(\{2,3\}\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(38\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\{2,3,4\}\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(43\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,3)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(\{3\}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\{3\}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(29\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,4)\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,5)\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((4,5)\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\{2,3\}\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(34\)</span></td>
        </tr>
        </table></div>

    3. Il valore massimo è $43$, ottenuto con la soluzione $\{1,2,3,5\}$. Quindi

        $$
        H^2(I)=43 .
        $$

    4. Su questa istanza $GR^e(I)=38$, quindi $H^2$ migliora $GR^e$. La soluzione $\tilde{S}=\{1,2,4,5\}$, di peso $1+1+5+8=15\le 15$ e profitto $z(I)=14+9+10+15=48$ è migliore, quindi $H^2$ <strong>non</strong> trova una soluzione ottima; $\tilde{S}$ è ottima (lo si verifica enumerando le soluzioni ammissibili). Il rapporto di prestazione è

        $$
        \frac{z(I)}{H^2(I)}=\frac{48}{43}\approx 1.12\;\le\;\frac{4}{3}\approx 1.33,
        $$

        come garantito.

<a id="esercizio-35-9"></a>

!!! esercizio "Esercizio 35.9: $H^2$ 3"

    Consideriamo uno zaino di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n=5$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} \\[1ex]
    \hline {p_i} & {13} & {5} & {8} & {5} & {7} \\[1ex]
    {w_i} & {1} & {1} & {3} & {2} & {5} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Verificare che gli oggetti siano ordinati per efficienza non crescente, e determinare l'insieme $\mathscr{P}$ delle coppie ammissibili di oggetti.

    2. Applicare l'algoritmo $H^2$ a questa istanza: per ogni coppia ammissibile $(i,k)$ calcolare la capacità residua $\mathit{rc}$, l'insieme residuo $\mathscr{I}(i,k)$, il valore di $GR^e$ sull'istanza residua e il valore $lb(i,k)$.

    3. Indicare la soluzione restituita da $H^2$ e $H^2(I)$.

    4. Confrontare $H^2(I)$ con $GR^e(I)$ e con $z(I)$, e calcolare il rapporto di prestazione $\frac{z(I)}{H^2(I)}$, confrontandolo con la garanzia di prestazione relativa $\frac{4}{3}$ di $H^2$.

??? soluzione "Soluzione"

    1. Le efficienze degli oggetti sono

        $$
        \begin{gathered}
        \frac{p_{1}}{w_{1}}=\frac{13}{1}=13,\quad \frac{p_{2}}{w_{2}}=\frac{5}{1}=5,\quad \frac{p_{3}}{w_{3}}=\frac{8}{3}\approx 2.67,\quad \frac{p_{4}}{w_{4}}=\frac{5}{2}=2.5,\\
        \frac{p_{5}}{w_{5}}=\frac{7}{5}=1.4
        \end{gathered},
        $$

        quindi gli oggetti sono ordinati per efficienza non crescente. Una coppia $(i,k)$ con $i<k$ è ammissibile se $w_i+w_k\le c=10$, quindi

        $$
        \mathscr{P}=\big\{(1,2),(1,3),(1,4),(1,5),(2,3),(2,4),(2,5),(3,4),(3,5),(4,5)\big\}.
        $$

    2. L'algoritmo parte dal miglior oggetto singolo, $lb=p_{\max}=p_{1}=13$. Per ogni coppia ammissibile, l'insieme residuo mantiene gli oggetti $j\notin\{i,k\}$ con $p_j\le\min\{p_i,p_k\}$ e $w_j\le\mathit{rc}$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>coppia</th>
        <th>peso</th>
        <th><span class="arithmatex">\(\mathit{rc}\)</span></th>
        <th>insieme residuo</th>
        <th><span class="arithmatex">\(GR^e\)</span> sul residuo</th>
        <th>valore</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,2)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\{4\}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3)\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\{2,4,5\}\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\{2\}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,5)\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\{2,4\}\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(30\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,3)\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\{4\}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,4)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((2,5)\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\{4\}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,4)\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\{2\}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((3,5)\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\{2,4\}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((4,5)\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\{2\}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        </tr>
        </table></div>

    3. Il valore massimo è $31$, ottenuto con la soluzione $\{1,2,3,4\}$. Quindi

        $$
        H^2(I)=31 .
        $$

    4. Su questa istanza $GR^e(I)=31$, lo stesso valore di $H^2$. La soluzione $\tilde{S}=\{1,2,3,5\}$, di peso $1+1+3+5=10\le 10$ e profitto $z(I)=13+5+8+7=33$ è migliore, quindi $H^2$ <strong>non</strong> trova una soluzione ottima; $\tilde{S}$ è ottima (lo si verifica enumerando le soluzioni ammissibili). Il rapporto di prestazione è

        $$
        \frac{z(I)}{H^2(I)}=\frac{33}{31}\approx 1.06\;\le\;\frac{4}{3}\approx 1.33,
        $$

        come garantito.

## L'euristica $H^\ell$

<a id="esercizio-35-10"></a>

!!! esercizio "Esercizio 35.10: $H^{\ell}$ 1"

    Consideriamo uno zaino di capacità $c = 16$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n=5$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} \\[1ex]
    \hline {p_i} & {14} & {13} & {13} & {10} & {11} \\[1ex]
    {w_i} & {1} & {2} & {3} & {3} & {9} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applichiamo l'algoritmo $H^{\ell}$ con $\ell=3$. Calcolare la migliore soluzione ammissibile formata da al più $\ell-1=2$ oggetti.

    2. Per ogni insieme ammissibile $L$ di esattamente $\ell=3$ oggetti, calcolare la capacità residua $\mathit{rc}$, l'insieme residuo $\mathscr{I}(L)$, il valore di $GR^e$ sull'istanza residua e il valore $lb(L)$.

    3. Indicare la soluzione restituita da $H^{3}$ e $H^{3}(I)$.

    4. Stabilire se $H^{3}$ trova una soluzione ottima su questa istanza, e calcolare il rapporto di prestazione $\frac{z(I)}{H^{3}(I)}$, confrontandolo con la garanzia di prestazione relativa $\frac{\ell+2}{\ell+1}=\frac{5}{4}$.

??? soluzione "Soluzione"

    1. La migliore soluzione ammissibile con al più $2$ oggetti è $\{1,2\}$, di peso $1+2=3\le 16$ e profitto $14+13=27$.

    2. Per ogni insieme $L$ di $3$ oggetti, l'insieme residuo mantiene gli oggetti $j\notin L$ con $p_j\le\min\{p_i:i\in L\}$ e $w_j\le\mathit{rc}$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>insieme <span class="arithmatex">\(L\)</span></th>
        <th>peso</th>
        <th><span class="arithmatex">\(\mathit{rc}\)</span></th>
        <th>insieme residuo</th>
        <th><span class="arithmatex">\(GR^e\)</span> sul residuo</th>
        <th>valore</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,2,3\}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(\{4,5\}\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(51\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,2,4\}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(37\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,2,5\}\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\{4\}\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(48\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,3,4\}\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(37\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,3,5\}\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\{4\}\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(48\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,4,5\}\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(35\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,3,4\}\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(36\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,3,5\}\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(37\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,4,5\}\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(34\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{3,4,5\}\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(34\)</span></td>
        </tr>
        </table></div>

    3. Il valore massimo è $51$, ottenuto con la soluzione $\{1,2,3,5\}$. Quindi

        $$
        H^{3}(I)=51 .
        $$

    4. La soluzione restituita da $H^{3}$ è <strong>ottima</strong>: $\tilde{S}=\{1,2,3,5\}$, di peso $1+2+3+9=15\le 16$ e profitto $z(I)=14+13+13+11=51$, e il rapporto di prestazione è $1$. Per confronto, su questa istanza $H^2(I)=50$: scommettere su tre oggetti invece che su due basta per trovare la soluzione ottima.

<a id="esercizio-35-11"></a>

!!! esercizio "Esercizio 35.11: $H^{\ell}$ 2"

    Consideriamo uno zaino di capacità $c = 20$ e un insieme $\mathscr{I} = \{1,2,3,4,5,6\}$ di $6$ oggetti ($n=6$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|cccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} & {i=6} \\[1ex]
    \hline {p_i} & {2} & {4} & {4} & {4} & {4} & {4} \\[1ex]
    {w_i} & {1} & {4} & {4} & {4} & {4} & {4} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applichiamo l'algoritmo $H^{\ell}$ con $\ell=3$. Calcolare la migliore soluzione ammissibile formata da al più $\ell-1=2$ oggetti.

    2. Per ogni insieme ammissibile $L$ di esattamente $\ell=3$ oggetti, calcolare la capacità residua $\mathit{rc}$, l'insieme residuo $\mathscr{I}(L)$, il valore di $GR^e$ sull'istanza residua e il valore $lb(L)$.

    3. Indicare la soluzione restituita da $H^{3}$ e $H^{3}(I)$.

    4. Stabilire se $H^{3}$ trova una soluzione ottima su questa istanza, e calcolare il rapporto di prestazione $\frac{z(I)}{H^{3}(I)}$, confrontandolo con la garanzia di prestazione relativa $\frac{\ell+2}{\ell+1}=\frac{5}{4}$.

??? soluzione "Soluzione"

    1. La migliore soluzione ammissibile con al più $2$ oggetti è $\{2,3\}$, di peso $4+4=8\le 20$ e profitto $4+4=8$.

    2. Per ogni insieme $L$ di $3$ oggetti, l'insieme residuo mantiene gli oggetti $j\notin L$ con $p_j\le\min\{p_i:i\in L\}$ e $w_j\le\mathit{rc}$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>insieme <span class="arithmatex">\(L\)</span></th>
        <th>peso</th>
        <th><span class="arithmatex">\(\mathit{rc}\)</span></th>
        <th>insieme residuo</th>
        <th><span class="arithmatex">\(GR^e\)</span> sul residuo</th>
        <th>valore</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,2,3\}\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,2,4\}\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,2,5\}\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,2,6\}\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,3,4\}\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,3,5\}\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,3,6\}\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,4,5\}\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,4,6\}\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,5,6\}\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,3,4\}\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\{1,5,6\}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,3,5\}\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\{1,4,6\}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,3,6\}\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\{1,4,5\}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,4,5\}\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\{1,3,6\}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,4,6\}\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\{1,3,5\}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,5,6\}\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\{1,3,4\}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{3,4,5\}\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\{1,2,6\}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{3,4,6\}\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\{1,2,5\}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{3,5,6\}\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\{1,2,4\}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{4,5,6\}\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\{1,2,3\}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        </table></div>

    3. Il valore massimo è $18$, ottenuto con la soluzione $\{1,2,3,4,5\}$. Quindi

        $$
        H^{3}(I)=18 .
        $$

    4. La soluzione $\tilde{S}=\{2,3,4,5,6\}$, di peso $4+4+4+4+4=20\le 20$ e profitto $z(I)=4+4+4+4+4=20$ è migliore, quindi $H^{3}$ <strong>non</strong> trova una soluzione ottima; $\tilde{S}$ è ottima (lo si verifica enumerando le soluzioni ammissibili). Il rapporto di prestazione è

        $$
        \frac{z(I)}{H^{3}(I)}=\frac{20}{18}=\frac{10}{9}\approx 1.11\;\le\;\frac{5}{4}=1.25,
        $$

        come garantito. Per confronto, su questa istanza $H^2(I)=18$.

    - <strong>Osservazione.</strong> Questa istanza appartiene alla famiglia di istanze usata per mostrare che la garanzia di prestazione relativa $\frac{\ell+2}{\ell+1}$ di $H^{\ell}$ è tight, con $\ell=3$ e $M=4$: lì $H^{\ell}(I_M)=(\ell+1)\,M+2$ e $z(I_M)=(\ell+2)\,M$, qui $18$ e $20$.

<a id="esercizio-35-12"></a>

!!! esercizio "Esercizio 35.12: $H^{\ell}$ 3"

    Consideriamo uno zaino di capacità $c = 18$ e un insieme $\mathscr{I} = \{1,2,3,4,5,6\}$ di $6$ oggetti ($n=6$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|cccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} & {i=6} \\[1ex]
    \hline {p_i} & {15} & {15} & {14} & {8} & {12} & {13} \\[1ex]
    {w_i} & {1} & {2} & {3} & {2} & {6} & {9} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applichiamo l'algoritmo $H^{\ell}$ con $\ell=3$. Calcolare la migliore soluzione ammissibile formata da al più $\ell-1=2$ oggetti.

    2. Per ogni insieme ammissibile $L$ di esattamente $\ell=3$ oggetti, calcolare la capacità residua $\mathit{rc}$, l'insieme residuo $\mathscr{I}(L)$, il valore di $GR^e$ sull'istanza residua e il valore $lb(L)$.

    3. Indicare la soluzione restituita da $H^{3}$ e $H^{3}(I)$.

    4. Stabilire se $H^{3}$ trova una soluzione ottima su questa istanza, e calcolare il rapporto di prestazione $\frac{z(I)}{H^{3}(I)}$, confrontandolo con la garanzia di prestazione relativa $\frac{\ell+2}{\ell+1}=\frac{5}{4}$.

??? soluzione "Soluzione"

    1. La migliore soluzione ammissibile con al più $2$ oggetti è $\{1,2\}$, di peso $1+2=3\le 18$ e profitto $15+15=30$.

    2. Per ogni insieme $L$ di $3$ oggetti, l'insieme residuo mantiene gli oggetti $j\notin L$ con $p_j\le\min\{p_i:i\in L\}$ e $w_j\le\mathit{rc}$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>insieme <span class="arithmatex">\(L\)</span></th>
        <th>peso</th>
        <th><span class="arithmatex">\(\mathit{rc}\)</span></th>
        <th>insieme residuo</th>
        <th><span class="arithmatex">\(GR^e\)</span> sul residuo</th>
        <th>valore</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,2,3\}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(\{4,5,6\}\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(64\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,2,4\}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(38\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,2,5\}\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(\{4\}\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(50\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,2,6\}\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\{4,5\}\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(55\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,3,4\}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(37\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,3,5\}\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\{4\}\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(49\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,3,6\}\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\{4\}\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(50\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,4,5\}\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(35\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,4,6\}\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(36\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,5,6\}\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\{4\}\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(48\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,3,4\}\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(37\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,3,5\}\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\{4\}\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(49\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,3,6\}\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\{4\}\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(50\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,4,5\}\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(35\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,4,6\}\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(36\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,5,6\}\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(40\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{3,4,5\}\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(34\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{3,4,6\}\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(35\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{3,5,6\}\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(39\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{4,5,6\}\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\varnothing\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(33\)</span></td>
        </tr>
        </table></div>

    3. Il valore massimo è $64$, ottenuto con la soluzione $\{1,2,3,4,5\}$. Quindi

        $$
        H^{3}(I)=64 .
        $$

    4. La soluzione $\tilde{S}=\{1,2,3,4,6\}$, di peso $1+2+3+2+9=17\le 18$ e profitto $z(I)=15+15+14+8+13=65$ è migliore, quindi $H^{3}$ <strong>non</strong> trova una soluzione ottima; $\tilde{S}$ è ottima (lo si verifica enumerando le soluzioni ammissibili). Il rapporto di prestazione è

        $$
        \frac{z(I)}{H^{3}(I)}=\frac{65}{64}\approx 1.02\;\le\;\frac{5}{4}=1.25,
        $$

        come garantito. Per confronto, su questa istanza $H^2(I)=64$.

## Lo schema FPTAS

<a id="esercizio-35-13"></a>

!!! esercizio "Esercizio 35.13: Basic-FPTAS 1"

    Consideriamo uno zaino di capacità $c = 13$ e un insieme $\mathscr{I} = \{1,2,3,4\}$ di $4$ oggetti ($n=4$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|cccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} \\[1ex]
    \hline {p_i} & {24} & {11} & {23} & {5} \\[1ex]
    {w_i} & {2} & {3} & {9} & {3} \\
    \hline
    \end{array}
    $$

    Applichiamo l'algoritmo Basic-FPTAS con accuratezza $\varepsilon=\frac{1}{2}$.

    **Domande**

    1. Calcolare il lower bound $GR^e(I)$ usato dall'algoritmo Basic-FPTAS.

    2. Calcolare il fattore di scala e i profitti scalati

        $$
        K=\frac{\varepsilon\,GR^e(I)}{n}
        \qquad\text{e}\qquad
        p'_j=\left\lfloor\frac{p_j}{K}\right\rfloor \quad \text{per ogni } j\in\mathscr{I}.
        $$

    3. Risolvere l'istanza scalata con la programmazione dinamica sui profitti, cioè calcolare i pesi minimi $u(j,q)$ e trovare il massimo profitto $q$ tale che $u(4,q)\le c$.

    4. Indicare la soluzione restituita da $FP^{\varepsilon}$ e il suo profitto $FP^{\varepsilon}(I)$ nell'istanza originale, e confrontarlo con $GR^e(I)$ e $z(I)$. Calcolare il rapporto di prestazione e confrontarlo con la garanzia $\frac{1}{1-\varepsilon}$.

??? soluzione "Soluzione"

    1. Gli oggetti sono ordinati per efficienza non crescente. $GR$ seleziona gli oggetti $\{1,2,4\}$, con $GR(I)=24+11+5=40$; il profitto massimo è $p_{\max}=p_{1}=24$. Quindi

        $$
        GR^e(I)=40 .
        $$

    2. Il fattore di scala è

        $$
        K=\frac{\varepsilon\,GR^e(I)}{n}=\frac{\frac{1}{2}\cdot 40}{4}=5,
        $$

        e i profitti scalati sono

        $$
        p'_{1}=\left\lfloor\frac{24}{5}\right\rfloor=4,\quad p'_{2}=\left\lfloor\frac{11}{5}\right\rfloor=2,\quad p'_{3}=\left\lfloor\frac{23}{5}\right\rfloor=4,\quad p'_{4}=\left\lfloor\frac{5}{5}\right\rfloor=1.
        $$

        Il profitto scalato totale è $P'=4+2+4+1=11$.

    3. I pesi minimi $u(j,q)$ di un sottoinsieme di $\{1,\dots,j\}$ di profitto scalato esattamente $q$ sono (sono riportati solo i valori di $q$ ottenibili; $\infty$ indica che $q$ non si può ottenere con i primi $j$ oggetti):

        $$
        \begin{array}{c|ccccccccccc}
        \hline {q} & {0} & {1} & {2} & {3} & {4} & {5} & {6} & {7} & {8} & {9} & {10} \\
        \hline {u(0,q)} & {0} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} \\
        {u(1,q)} & {0} & {\infty} & {\infty} & {\infty} & {2} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} \\
        {u(2,q)} & {0} & {\infty} & {3} & {\infty} & {2} & {\infty} & {5} & {\infty} & {\infty} & {\infty} & {\infty} \\
        {u(3,q)} & {0} & {\infty} & {3} & {\infty} & {2} & {\infty} & {5} & {\infty} & {11} & {\infty} & {14} \\
        {u(4,q)} & {0} & {3} & {3} & {6} & {2} & {5} & {5} & {8} & {11} & {14} & {14} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{c|c}
        \hline {q} & {11} \\
        \hline {u(0,q)} & {\infty} \\
        {u(1,q)} & {\infty} \\
        {u(2,q)} & {\infty} \\
        {u(3,q)} & {\infty} \\
        {u(4,q)} & {17} \\
        \hline
        \end{array}
        $$

        Il massimo $q$ con $u(4,q)\le c=13$ è $q=8$, di peso $u(4,8)=11$, ottenuto con gli oggetti $\{1,3\}$.

    4. $FP^{\varepsilon}$ restituisce $S=\{1,3\}$, di profitto

        $$
        FP^{\varepsilon}(I)=24+23=47
        $$

        nell'istanza originale, migliore di $GR^e(I)=40$. La soluzione è <strong>ottima</strong>: $\tilde{S}=\{1,3\}$, di peso $2+9=11\le 13$ e profitto $z(I)=24+23=47$, e il rapporto di prestazione è $1$.

<a id="esercizio-35-14"></a>

!!! esercizio "Esercizio 35.14: Basic-FPTAS 2"

    Consideriamo uno zaino di capacità $c = 16$ e un insieme $\mathscr{I} = \{1,2,3,4\}$ di $4$ oggetti ($n=4$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|cccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} \\[1ex]
    \hline {p_i} & {14} & {12} & {14} & {18} \\[1ex]
    {w_i} & {3} & {4} & {5} & {7} \\
    \hline
    \end{array}
    $$

    Applichiamo l'algoritmo Basic-FPTAS con accuratezza $\varepsilon=\frac{1}{2}$.

    **Domande**

    1. Calcolare il lower bound $GR^e(I)$ usato dall'algoritmo Basic-FPTAS.

    2. Calcolare il fattore di scala e i profitti scalati

        $$
        K=\frac{\varepsilon\,GR^e(I)}{n}
        \qquad\text{e}\qquad
        p'_j=\left\lfloor\frac{p_j}{K}\right\rfloor \quad \text{per ogni } j\in\mathscr{I}.
        $$

    3. Risolvere l'istanza scalata con la programmazione dinamica sui profitti, cioè calcolare i pesi minimi $u(j,q)$ e trovare il massimo profitto $q$ tale che $u(4,q)\le c$.

    4. Indicare la soluzione restituita da $FP^{\varepsilon}$ e il suo profitto $FP^{\varepsilon}(I)$ nell'istanza originale, e confrontarlo con $GR^e(I)$ e $z(I)$. Calcolare il rapporto di prestazione e confrontarlo con la garanzia $\frac{1}{1-\varepsilon}$.

??? soluzione "Soluzione"

    1. Gli oggetti sono ordinati per efficienza non crescente. $GR$ seleziona gli oggetti $\{1,2,3\}$, con $GR(I)=14+12+14=40$; il profitto massimo è $p_{\max}=p_{4}=18$. Quindi

        $$
        GR^e(I)=40 .
        $$

    2. Il fattore di scala è

        $$
        K=\frac{\varepsilon\,GR^e(I)}{n}=\frac{\frac{1}{2}\cdot 40}{4}=5,
        $$

        e i profitti scalati sono

        $$
        p'_{1}=\left\lfloor\frac{14}{5}\right\rfloor=2,\quad p'_{2}=\left\lfloor\frac{12}{5}\right\rfloor=2,\quad p'_{3}=\left\lfloor\frac{14}{5}\right\rfloor=2,\quad p'_{4}=\left\lfloor\frac{18}{5}\right\rfloor=3.
        $$

        Il profitto scalato totale è $P'=2+2+2+3=9$.

    3. I pesi minimi $u(j,q)$ di un sottoinsieme di $\{1,\dots,j\}$ di profitto scalato esattamente $q$ sono (sono riportati solo i valori di $q$ ottenibili; $\infty$ indica che $q$ non si può ottenere con i primi $j$ oggetti):

        $$
        \begin{array}{c|cccccccc}
        \hline {q} & {0} & {2} & {3} & {4} & {5} & {6} & {7} & {9} \\
        \hline {u(0,q)} & {0} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} \\
        {u(1,q)} & {0} & {3} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} \\
        {u(2,q)} & {0} & {3} & {\infty} & {7} & {\infty} & {\infty} & {\infty} & {\infty} \\
        {u(3,q)} & {0} & {3} & {\infty} & {7} & {\infty} & {12} & {\infty} & {\infty} \\
        {u(4,q)} & {0} & {3} & {7} & {7} & {10} & {12} & {14} & {19} \\
        \hline
        \end{array}
        $$

        Il massimo $q$ con $u(4,q)\le c=16$ è $q=7$, di peso $u(4,7)=14$, ottenuto con gli oggetti $\{1,2,4\}$.

    4. $FP^{\varepsilon}$ restituisce $S=\{1,2,4\}$, di profitto

        $$
        FP^{\varepsilon}(I)=14+12+18=44
        $$

        nell'istanza originale, migliore di $GR^e(I)=40$. La soluzione $\tilde{S}=\{1,3,4\}$, di peso $3+5+7=15\le 16$ e profitto $z(I)=14+14+18=46$ è migliore, quindi $FP^{\varepsilon}$ <strong>non</strong> trova una soluzione ottima; $\tilde{S}$ è ottima (lo si verifica enumerando le soluzioni ammissibili). Il rapporto di prestazione è

        $$
        \frac{z(I)}{FP^{\varepsilon}(I)}=\frac{46}{44}=\frac{23}{22}\approx 1.05\;\le\;\frac{1}{1-\varepsilon}=2,
        $$

        come garantito.

<a id="esercizio-35-15"></a>

!!! esercizio "Esercizio 35.15: Basic-FPTAS 3"

    Consideriamo uno zaino di capacità $c = 16$ e un insieme $\mathscr{I} = \{1,2,3,4\}$ di $4$ oggetti ($n=4$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|cccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} \\[1ex]
    \hline {p_i} & {14} & {12} & {14} & {18} \\[1ex]
    {w_i} & {3} & {4} & {5} & {7} \\
    \hline
    \end{array}
    $$

    Applichiamo l'algoritmo Basic-FPTAS con accuratezza $\varepsilon=\frac{1}{4}$.

    **Domande**

    1. Calcolare il lower bound $GR^e(I)$ usato dall'algoritmo Basic-FPTAS.

    2. Calcolare il fattore di scala e i profitti scalati

        $$
        K=\frac{\varepsilon\,GR^e(I)}{n}
        \qquad\text{e}\qquad
        p'_j=\left\lfloor\frac{p_j}{K}\right\rfloor \quad \text{per ogni } j\in\mathscr{I}.
        $$

    3. Risolvere l'istanza scalata con la programmazione dinamica sui profitti, cioè calcolare i pesi minimi $u(j,q)$ e trovare il massimo profitto $q$ tale che $u(4,q)\le c$.

    4. Indicare la soluzione restituita da $FP^{\varepsilon}$ e il suo profitto $FP^{\varepsilon}(I)$ nell'istanza originale, e confrontarlo con $GR^e(I)$ e $z(I)$. Calcolare il rapporto di prestazione e confrontarlo con la garanzia $\frac{1}{1-\varepsilon}$.

??? soluzione "Soluzione"

    1. Gli oggetti sono ordinati per efficienza non crescente. $GR$ seleziona gli oggetti $\{1,2,3\}$, con $GR(I)=14+12+14=40$; il profitto massimo è $p_{\max}=p_{4}=18$. Quindi

        $$
        GR^e(I)=40 .
        $$

    2. Il fattore di scala è

        $$
        K=\frac{\varepsilon\,GR^e(I)}{n}=\frac{\frac{1}{4}\cdot 40}{4}=\frac{5}{2}=2.5,
        $$

        e i profitti scalati sono

        $$
        p'_{1}=\left\lfloor\frac{14}{\frac{5}{2}}\right\rfloor=5,\quad p'_{2}=\left\lfloor\frac{12}{\frac{5}{2}}\right\rfloor=4,\quad p'_{3}=\left\lfloor\frac{14}{\frac{5}{2}}\right\rfloor=5,\quad p'_{4}=\left\lfloor\frac{18}{\frac{5}{2}}\right\rfloor=7.
        $$

        Il profitto scalato totale è $P'=5+4+5+7=21$.

    3. I pesi minimi $u(j,q)$ di un sottoinsieme di $\{1,\dots,j\}$ di profitto scalato esattamente $q$ sono (sono riportati solo i valori di $q$ ottenibili; $\infty$ indica che $q$ non si può ottenere con i primi $j$ oggetti):

        $$
        \begin{array}{c|ccccccccccc}
        \hline {q} & {0} & {4} & {5} & {7} & {9} & {10} & {11} & {12} & {14} & {16} & {17} \\
        \hline {u(0,q)} & {0} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} \\
        {u(1,q)} & {0} & {\infty} & {3} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} \\
        {u(2,q)} & {0} & {4} & {3} & {\infty} & {7} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} & {\infty} \\
        {u(3,q)} & {0} & {4} & {3} & {\infty} & {7} & {8} & {\infty} & {\infty} & {12} & {\infty} & {\infty} \\
        {u(4,q)} & {0} & {4} & {3} & {7} & {7} & {8} & {11} & {10} & {12} & {14} & {15} \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{c|c}
        \hline {q} & {21} \\
        \hline {u(0,q)} & {\infty} \\
        {u(1,q)} & {\infty} \\
        {u(2,q)} & {\infty} \\
        {u(3,q)} & {\infty} \\
        {u(4,q)} & {19} \\
        \hline
        \end{array}
        $$

        Il massimo $q$ con $u(4,q)\le c=16$ è $q=17$, di peso $u(4,17)=15$, ottenuto con gli oggetti $\{1,3,4\}$.

    4. $FP^{\varepsilon}$ restituisce $S=\{1,3,4\}$, di profitto

        $$
        FP^{\varepsilon}(I)=14+14+18=46
        $$

        nell'istanza originale, migliore di $GR^e(I)=40$. La soluzione è <strong>ottima</strong>: $\tilde{S}=\{1,3,4\}$, di peso $3+5+7=15\le 16$ e profitto $z(I)=14+14+18=46$, e il rapporto di prestazione è $1$.

    - <strong>Osservazione.</strong> È l'istanza dell'esercizio Basic-FPTAS 2, risolta lì con $\varepsilon=\frac{1}{2}$. Dimezzare $\varepsilon$ dimezza il fattore di scala $K$: i profitti scalati sono più fini, la tabella della programmazione dinamica è più lunga ($P'$ cresce), e si trova la soluzione ottima.
