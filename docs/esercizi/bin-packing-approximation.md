---
title: "Esercizi · Algoritmi di approssimazione per il bin packing"
---

# Esercizi · Algoritmi di approssimazione per il bin packing

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 36** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 36: Bin packing (BPP)](../algoritmi-di-approssimazione/bin-packing-approximation.md) · [:material-file-pdf-box: Eserciziario, volume 5 (PDF)](../pdf/esercizi-5-algoritmi-di-approssimazione.pdf)

</div>

!!! formula "Proprietà usata in questi esercizi"

    La <strong>proprietà di riempimento a metà</strong> del capitolo [Algoritmi di approssimazione per il problema del bin packing](../algoritmi-di-approssimazione/bin-packing-approximation.md): una soluzione ammissibile con schemi di carico $P_1,\dots,P_k$ la soddisfa quando al più uno schema di carico ha peso totale al più $c/2$, ossia

    \begin{equation*}
    \Big|\Big\{\, b\in\{1,\dots,k\} ~:~ \sum_{i\in P_b} w_i \le \frac{c}{2} \,\Big\}\Big| \;\le\; 1 . \tag{H}
    \end{equation*}

## Next Fit

<a id="esercizio-36-1"></a>

!!! esercizio "Esercizio 36.1: Next Fit 1"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4\}$ di $4$ oggetti ($n=4$), con i seguenti pesi:

    $$
    \begin{array}{l|cccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} \\[1ex]
    \hline {w_i} & {6} & {6} & {4} & {4} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare l'algoritmo Next Fit (NF) a questa istanza. Mostrare l'esecuzione passo per passo, indicando a ogni iterazione se l'oggetto è posto nel contenitore aperto o se si apre un nuovo contenitore, e la capacità residua che ne risulta. Riportare l'assegnamento finale ai contenitori e $NF(I)$.

    2. Costruire gli schemi di carico $P_1,\dots,P_{NF(I)}$ a partire dal vettore dei contenitori ottenuto nella Domanda 1.

    3. Calcolare un lower bound su $z(I)$ e stabilire se NF trova una soluzione ottima su questa istanza.

    4. Verificare se gli schemi di carico trovati da NF soddisfano la proprietà di riempimento a metà (H), e stabilire se la soluzione trovata è ottima per questa istanza del BPP, confrontando $NF(I)$ con un lower bound su $z(I)$ oppure esibendo una soluzione ammissibile di valore strettamente minore.

??? soluzione "Soluzione"

    1. L'algoritmo NF produce la seguente soluzione ammissibile:

        1. L'oggetto $1$ (peso $6$) è posto nel contenitore $1$. La capacità residua del contenitore $1$ diventa $10-6=4$.

        2. L'oggetto $2$ (peso $6$) non entra nel contenitore $1$ (capacità residua $4$). Quindi il contenitore $1$ si chiude e l'oggetto $2$ è posto in un nuovo contenitore $2$. La capacità residua del contenitore $2$ diventa $10-6=4$.

        3. L'oggetto $3$ (peso $4$) è posto nel contenitore $2$. La capacità residua del contenitore $2$ diventa $4-4=0$.

        4. L'oggetto $4$ (peso $4$) non entra nel contenitore $2$ (capacità residua $0$). Quindi il contenitore $2$ si chiude e l'oggetto $4$ è posto in un nuovo contenitore $3$. La capacità residua del contenitore $3$ diventa $10-4=6$.

        Quindi NF restituisce:

        $$
        bin = \begin{pmatrix} 1 & 2 & 2 & 3 \end{pmatrix},
        \qquad
        nb=3.
        $$

        e pertanto

        $$
        NF(I)=nb=3.
        $$

    2. Dal vettore $bin=(1,2,2,3)$, gli schemi di carico sono

        \begin{align*}
        P_1 &= \{ i \in \{1,2,3,4\} : bin_i = 1 \} = \{1\},\\
        P_2 &= \{ i \in \{1,2,3,4\} : bin_i = 2 \} = \{2,3\},\\
        P_3 &= \{ i \in \{1,2,3,4\} : bin_i = 3 \} = \{4\}.
        \end{align*}

    3. Di conseguenza, $3$ è un upper bound sul numero ottimo di contenitori per questa istanza:

        $$
        z(I)\le 3.
        $$

        Inoltre,

        $$
        z(I)\ge \left\lceil \frac{\sum_{i\in\mathscr{I}} w_i}{c} \right\rceil = \left\lceil \frac{6+6+4+4}{10} \right\rceil= \left\lceil \frac{20}{10} \right\rceil =2.
        $$

        Inoltre, la seguente è una soluzione ammissibile del BPP:

        $$
        \tilde{P}_1 = \{1,3\},\qquad \tilde{P}_2 = \{2,4\}
        $$

        che usa $2$ contenitori; quindi $z(I)\le 2$. Pertanto $z(I)=2$, e NF <strong>non</strong> calcola una soluzione ottima su questa istanza.

    4. Dalla Domanda 2, gli schemi di carico trovati da NF hanno pesi totali

        $$
        \sum_{i\in P_1} w_i = 6, \qquad \sum_{i\in P_2} w_i = 6+4=10, \qquad \sum_{i\in P_3} w_i = 4.
        $$

        Poiché $c/2=5$, solo $P_3$ ha peso totale al più $c/2$ (gli altri due lo superano); quindi la soluzione <strong>soddisfa</strong> la proprietà di riempimento a metà.

        Come mostrato nella Domanda 3, $NF(I)=3$ mentre la soluzione ammissibile $\tilde{P}_1=\{1,3\}$, $\tilde{P}_2=\{2,4\}$ usa solo $2$ contenitori; poiché questo valore è strettamente minore di $NF(I)$, la soluzione trovata da NF <strong>non è ottima</strong> (infatti $z(I)=2<NF(I)=3$).

<a id="esercizio-36-2"></a>

!!! esercizio "Esercizio 36.2: Next Fit 2"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4\}$ di $4$ oggetti ($n=4$), con i seguenti pesi:

    $$
    \begin{array}{l|cccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} \\[1ex]
    \hline {w_i} & {7} & {7} & {3} & {3} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare l'algoritmo Next Fit (NF) a questa istanza. Mostrare l'esecuzione passo per passo, indicando a ogni iterazione se l'oggetto è posto nel contenitore aperto o se si apre un nuovo contenitore, e la capacità residua che ne risulta. Riportare l'assegnamento finale ai contenitori e $NF(I)$.

    2. Costruire gli schemi di carico $P_1,\dots,P_{NF(I)}$ a partire dal vettore dei contenitori ottenuto nella Domanda 1.

    3. Calcolare un lower bound su $z(I)$ e stabilire se NF trova una soluzione ottima su questa istanza.

    4. Verificare se gli schemi di carico trovati da NF soddisfano la proprietà di riempimento a metà (H), e stabilire se la soluzione trovata è ottima per questa istanza del BPP, confrontando $NF(I)$ con un lower bound su $z(I)$ oppure esibendo una soluzione ammissibile di valore strettamente minore.

??? soluzione "Soluzione"

    1. L'algoritmo NF produce la seguente soluzione ammissibile:

        1. L'oggetto $1$ (peso $7$) è posto nel contenitore $1$. La capacità residua del contenitore $1$ diventa $10-7=3$.

        2. L'oggetto $2$ (peso $7$) non entra nel contenitore $1$ (capacità residua $3$). Quindi il contenitore $1$ si chiude e l'oggetto $2$ è posto in un nuovo contenitore $2$. La capacità residua del contenitore $2$ diventa $10-7=3$.

        3. L'oggetto $3$ (peso $3$) è posto nel contenitore $2$ (capacità residua $3$). La capacità residua del contenitore $2$ diventa $3-3=0$.

        4. L'oggetto $4$ (peso $3$) non entra nel contenitore $2$ (capacità residua $0$). Quindi il contenitore $2$ si chiude e l'oggetto $4$ è posto in un nuovo contenitore $3$. La capacità residua del contenitore $3$ diventa $10-3=7$.

        Quindi NF restituisce:

        $$
        bin = \begin{pmatrix} 1 & 2 & 2 & 3 \end{pmatrix},
        \qquad
        nb=3.
        $$

        e pertanto

        $$
        NF(I)=nb=3.
        $$

    2. Dal vettore $bin=(1,2,2,3)$, gli schemi di carico sono

        \begin{align*}
        P_1 &= \{ i \in \{1,2,3,4\} : bin_i = 1 \} = \{1\},\\
        P_2 &= \{ i \in \{1,2,3,4\} : bin_i = 2 \} = \{2,3\},\\
        P_3 &= \{ i \in \{1,2,3,4\} : bin_i = 3 \} = \{4\}.
        \end{align*}

    3. Di conseguenza, $3$ è un upper bound sul numero ottimo di contenitori per questa istanza:

        $$
        z(I)\le 3.
        $$

        Inoltre,

        $$
        z(I)\ge \left\lceil \frac{\sum_{i\in\mathscr{I}} w_i}{c} \right\rceil = \left\lceil \frac{7+7+3+3}{10} \right\rceil= \left\lceil \frac{20}{10} \right\rceil =2.
        $$

        Inoltre, la seguente è una soluzione ammissibile del BPP:

        $$
        \tilde{P}_1 = \{1,3\},\qquad \tilde{P}_2 = \{2,4\}
        $$

        che usa $2$ contenitori (poiché $w_1+w_3=7+3=10$ e $w_2+w_4=7+3=10$); quindi $z(I)\le 2$. Pertanto $z(I)=2$, e NF <strong>non</strong> calcola una soluzione ottima su questa istanza.

    4. Dalla Domanda 2, gli schemi di carico trovati da NF hanno pesi totali

        $$
        \sum_{i\in P_1} w_i = 7, \qquad \sum_{i\in P_2} w_i = 7+3=10, \qquad \sum_{i\in P_3} w_i = 3.
        $$

        Poiché $c/2=5$, solo $P_3$ ha peso totale al più $c/2$ (gli altri due lo superano); quindi la soluzione <strong>soddisfa</strong> la proprietà di riempimento a metà.

        Come mostrato nella Domanda 3, $NF(I)=3$ mentre la soluzione ammissibile $\tilde{P}_1=\{1,3\}$, $\tilde{P}_2=\{2,4\}$ usa solo $2$ contenitori; poiché questo valore è strettamente minore di $NF(I)$, la soluzione trovata da NF <strong>non è ottima</strong> (infatti $z(I)=2<NF(I)=3$).

<a id="esercizio-36-3"></a>

!!! esercizio "Esercizio 36.3: Next Fit 3"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n=5$), con i seguenti pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} \\[1ex]
    \hline {w_i} & {4} & {7} & {6} & {3} & {5} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare l'algoritmo Next Fit (NF) a questa istanza. Mostrare l'esecuzione passo per passo, indicando a ogni iterazione se l'oggetto è posto nel contenitore aperto o se si apre un nuovo contenitore, e la capacità residua che ne risulta. Riportare l'assegnamento finale ai contenitori e $NF(I)$.

    2. Costruire gli schemi di carico $P_1,\dots,P_{NF(I)}$ a partire dal vettore dei contenitori ottenuto nella Domanda 1.

    3. Calcolare un lower bound su $z(I)$ e stabilire se NF trova una soluzione ottima su questa istanza.

    4. Verificare se gli schemi di carico trovati da NF soddisfano la proprietà di riempimento a metà (H), e stabilire se la soluzione trovata è ottima per questa istanza del BPP, confrontando $NF(I)$ con un lower bound su $z(I)$ oppure esibendo una soluzione ammissibile di valore strettamente minore.

??? soluzione "Soluzione"

    1. L'algoritmo NF produce la seguente soluzione ammissibile:

        1. L'oggetto $1$ (peso $4$) è posto nel contenitore $1$. La capacità residua del contenitore $1$ diventa $10-4=6$.

        2. L'oggetto $2$ (peso $7$) non entra nel contenitore $1$ (capacità residua $6$). Quindi il contenitore $1$ si chiude e l'oggetto $2$ è posto in un nuovo contenitore $2$. La capacità residua del contenitore $2$ diventa $10-7=3$.

        3. L'oggetto $3$ (peso $6$) non entra nel contenitore $2$ (capacità residua $3$). Quindi il contenitore $2$ si chiude e l'oggetto $3$ è posto in un nuovo contenitore $3$. La capacità residua del contenitore $3$ diventa $10-6=4$.

        4. L'oggetto $4$ (peso $3$) è posto nel contenitore $3$ (capacità residua $4$). La capacità residua del contenitore $3$ diventa $4-3=1$.

        5. L'oggetto $5$ (peso $5$) non entra nel contenitore $3$ (capacità residua $1$). Quindi il contenitore $3$ si chiude e l'oggetto $5$ è posto in un nuovo contenitore $4$. La capacità residua del contenitore $4$ diventa $10-5=5$.

        Quindi NF restituisce:

        $$
        bin = \begin{pmatrix} 1 & 2 & 3 & 3 & 4 \end{pmatrix},
        \qquad
        nb=4.
        $$

        e pertanto

        $$
        NF(I)=nb=4.
        $$

    2. Dal vettore $bin=(1,2,3,3,4)$, gli schemi di carico sono

        \begin{align*}
        P_1 &= \{ i : bin_i = 1 \} = \{1\},\\
        P_2 &= \{ i : bin_i = 2 \} = \{2\},\\
        P_3 &= \{ i : bin_i = 3 \} = \{3,4\},\\
        P_4 &= \{ i : bin_i = 4 \} = \{5\}.
        \end{align*}

    3. Di conseguenza, $4$ è un upper bound sul numero ottimo di contenitori per questa istanza:

        $$
        z(I)\le 4.
        $$

        Inoltre,

        $$
        z(I)\ge \left\lceil \frac{\sum_{i\in\mathscr{I}} w_i}{c} \right\rceil = \left\lceil \frac{4+7+6+3+5}{10} \right\rceil= \left\lceil \frac{25}{10} \right\rceil =3.
        $$

        Inoltre, la seguente è una soluzione ammissibile del BPP:

        $$
        \tilde{P}_1 = \{2,4\},\qquad \tilde{P}_2 = \{1,3\}, \qquad \tilde{P}_3 = \{5\}
        $$

        che usa $3$ contenitori (poiché $w_2+w_4=7+3=10$ e $w_1+w_3=4+6=10$); quindi $z(I)\le 3$. Pertanto $z(I)=3$, e NF <strong>non</strong> calcola una soluzione ottima su questa istanza.

    4. Dalla Domanda 2, gli schemi di carico trovati da NF hanno pesi totali

        $$
        \sum_{i\in P_1} w_i = 4, \qquad \sum_{i\in P_2} w_i = 7, \qquad \sum_{i\in P_3} w_i = 6+3=9, \qquad \sum_{i\in P_4} w_i = 5.
        $$

        Poiché $c/2=5$, <em>sia</em> $P_1$ (peso $4$) <em>sia</em> $P_4$ (peso $5$) hanno peso totale al più $c/2$; quindi la soluzione trovata da NF <strong>non soddisfa</strong> la proprietà di riempimento a metà (ciò è possibile proprio perché NF non è un algoritmo Any Fit).

        Come mostrato nella Domanda 3, $NF(I)=4$ mentre la soluzione ammissibile $\tilde{P}_1=\{2,4\}$, $\tilde{P}_2=\{1,3\}$, $\tilde{P}_3=\{5\}$ usa solo $3$ contenitori; poiché questo valore è strettamente minore di $NF(I)$, la soluzione trovata da NF <strong>non è ottima</strong> (infatti $z(I)=3<NF(I)=4$).

## First Fit

<a id="esercizio-36-4"></a>

!!! esercizio "Esercizio 36.4: First Fit 1"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4\}$ di $4$ oggetti ($n=4$), con i seguenti pesi:

    $$
    \begin{array}{l|cccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} \\[1ex]
    \hline {w_i} & {6} & {6} & {4} & {4} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare l'algoritmo First Fit (FF) a questa istanza. Mostrare l'esecuzione passo per passo, indicando a ogni iterazione in quale contenitore è posto l'oggetto (scorrendo i contenitori nell'ordine di apertura) e la capacità residua che ne risulta. Riportare l'assegnamento finale ai contenitori e $FF(I)$.

    2. Costruire gli schemi di carico $P_1,\dots,P_{FF(I)}$ a partire dal vettore dei contenitori ottenuto nella Domanda 1.

    3. Calcolare un lower bound su $z(I)$ e stabilire se FF trova una soluzione ottima su questa istanza.

    4. Verificare se gli schemi di carico trovati da FF soddisfano la proprietà di riempimento a metà (H), e stabilire se la soluzione trovata è ottima per questa istanza del BPP, confrontando $FF(I)$ con un lower bound su $z(I)$ oppure esibendo una soluzione ammissibile di valore strettamente minore.

??? soluzione "Soluzione"

    1. Ricordiamo lo pseudocodice di FF: per ogni oggetto $i$, $s:=-1$ e, per $b:=1$ fino a $nb$, se $w[i]\le rc[b]$ allora $s\leftarrow b$ e la scansione si ferma; se $s=-1$ dopo la scansione, si apre un nuovo contenitore.

        1. Oggetto $1$ (peso $6$): il contenitore $1$ è aperto all'inizio ($nb=1$, $rc[1]=c=10$) e $w[1]\le rc[1]$, quindi $s=1$ e FF pone l'oggetto $1$ nel contenitore $1$, e $rc[1]\leftarrow 10-6=4$.

        2. Oggetto $2$ (peso $6$): $b=1$: $w[2]=6\le rc[1]=4$? No. Nessun contenitore va bene, quindi FF apre il contenitore $2$ ($rc[2]\leftarrow 10$). L'oggetto $2$ è posto nel contenitore $2$, e $rc[2]\leftarrow 10-6=4$.

        3. Oggetto $3$ (peso $4$): $b=1$: $w[3]=4\le rc[1]=4$? Sì, quindi $s\leftarrow 1$ e la scansione si ferma. L'oggetto $3$ è posto nel contenitore $1$, e $rc[1]\leftarrow 4-4=0$.

        4. Oggetto $4$ (peso $4$): $b=1$: $w[4]=4\le rc[1]=0$? No. $b=2$: $w[4]=4\le rc[2]=4$? Sì, quindi $s\leftarrow 2$. L'oggetto $4$ è posto nel contenitore $2$, e $rc[2]\leftarrow 4-4=0$.

        Quindi FF restituisce:

        $$
        bin = \begin{pmatrix} 1 & 2 & 1 & 2 \end{pmatrix},
        \qquad
        nb=2.
        $$

        e pertanto

        $$
        FF(I)=nb=2.
        $$

    2. Dal vettore $bin=(1,2,1,2)$, gli schemi di carico sono

        \begin{align*}
        P_1 &= \{ i \in \{1,2,3,4\} : bin_i = 1 \} = \{1,3\},\\
        P_2 &= \{ i \in \{1,2,3,4\} : bin_i = 2 \} = \{2,4\}.
        \end{align*}

    3. Di conseguenza,

        $$
        z(I)\le 2.
        $$

        Inoltre,

        $$
        z(I)\ge \left\lceil \frac{\sum_{i\in\mathscr{I}} w_i}{c} \right\rceil = \left\lceil \frac{6+6+4+4}{10} \right\rceil= \left\lceil \frac{20}{10} \right\rceil =2.
        $$

        Quindi $z(I)=2$ e FF calcola una soluzione <strong>ottima</strong> su questa istanza.

    4. Dalla Domanda 2, gli schemi di carico trovati da FF hanno pesi totali

        $$
        \sum_{i\in P_1} w_i = 6+4=10, \qquad \sum_{i\in P_2} w_i = 6+4=10.
        $$

        Poiché $c/2=5$, nessuno schema di carico ha peso totale al più $c/2$; in particolare <em>al più uno</em> lo ha, quindi la soluzione <strong>soddisfa</strong> la proprietà di riempimento a metà.

        Poiché $FF(I)=2$ coincide con il lower bound $z(I)\ge 2$ trovato nella Domanda 3, la soluzione trovata da FF è <strong>ottima</strong>.

<a id="esercizio-36-5"></a>

!!! esercizio "Esercizio 36.5: First Fit 2"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4\}$ di $4$ oggetti ($n=4$), con i seguenti pesi:

    $$
    \begin{array}{l|cccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} \\[1ex]
    \hline {w_i} & {7} & {7} & {3} & {3} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare l'algoritmo First Fit (FF) a questa istanza. Mostrare l'esecuzione passo per passo, indicando a ogni iterazione in quale contenitore è posto l'oggetto (scorrendo i contenitori nell'ordine di apertura) e la capacità residua che ne risulta. Riportare l'assegnamento finale ai contenitori e $FF(I)$.

    2. Costruire gli schemi di carico $P_1,\dots,P_{FF(I)}$ a partire dal vettore dei contenitori ottenuto nella Domanda 1.

    3. Calcolare un lower bound su $z(I)$ e stabilire se FF trova una soluzione ottima su questa istanza.

    4. Verificare se gli schemi di carico trovati da FF soddisfano la proprietà di riempimento a metà (H), e stabilire se la soluzione trovata è ottima per questa istanza del BPP, confrontando $FF(I)$ con un lower bound su $z(I)$ oppure esibendo una soluzione ammissibile di valore strettamente minore.

??? soluzione "Soluzione"

    1. Ricordiamo lo pseudocodice di FF: per ogni oggetto $i$, $s:=-1$ e, per $b:=1$ fino a $nb$, se $w[i]\le rc[b]$ allora $s\leftarrow b$ e la scansione si ferma; se $s=-1$ dopo la scansione, si apre un nuovo contenitore.

        1. Oggetto $1$ (peso $7$): il contenitore $1$ è aperto all'inizio ($nb=1$, $rc[1]=c=10$) e $w[1]\le rc[1]$, quindi $s=1$ e FF pone l'oggetto $1$ nel contenitore $1$, e $rc[1]\leftarrow 10-7=3$.

        2. Oggetto $2$ (peso $7$): $b=1$: $w[2]=7\le rc[1]=3$? No. Nessun contenitore va bene, quindi FF apre il contenitore $2$ ($rc[2]\leftarrow 10$). L'oggetto $2$ è posto nel contenitore $2$, e $rc[2]\leftarrow 10-7=3$.

        3. Oggetto $3$ (peso $3$): $b=1$: $w[3]=3\le rc[1]=3$? Sì, quindi $s\leftarrow 1$ e la scansione si ferma. L'oggetto $3$ è posto nel contenitore $1$, e $rc[1]\leftarrow 3-3=0$.

        4. Oggetto $4$ (peso $3$): $b=1$: $w[4]=3\le rc[1]=0$? No. $b=2$: $w[4]=3\le rc[2]=3$? Sì, quindi $s\leftarrow 2$. L'oggetto $4$ è posto nel contenitore $2$, e $rc[2]\leftarrow 3-3=0$.

        Quindi FF restituisce:

        $$
        bin = \begin{pmatrix} 1 & 2 & 1 & 2 \end{pmatrix},
        \qquad
        nb=2.
        $$

        e pertanto

        $$
        FF(I)=nb=2.
        $$

    2. Dal vettore $bin=(1,2,1,2)$, gli schemi di carico sono

        \begin{align*}
        P_1 &= \{ i \in \{1,2,3,4\} : bin_i = 1 \} = \{1,3\},\\
        P_2 &= \{ i \in \{1,2,3,4\} : bin_i = 2 \} = \{2,4\}.
        \end{align*}

    3. Di conseguenza,

        $$
        z(I)\le 2.
        $$

        Inoltre,

        $$
        z(I)\ge \left\lceil \frac{\sum_{i\in\mathscr{I}} w_i}{c} \right\rceil = \left\lceil \frac{7+7+3+3}{10} \right\rceil= \left\lceil \frac{20}{10} \right\rceil =2.
        $$

        Quindi $z(I)=2$ e FF calcola una soluzione <strong>ottima</strong> su questa istanza.

    4. Dalla Domanda 2, gli schemi di carico trovati da FF hanno pesi totali

        $$
        \sum_{i\in P_1} w_i = 7+3=10, \qquad \sum_{i\in P_2} w_i = 7+3=10.
        $$

        Poiché $c/2=5$, nessuno schema di carico ha peso totale al più $c/2$; in particolare <em>al più uno</em> lo ha, quindi la soluzione <strong>soddisfa</strong> la proprietà di riempimento a metà.

        Poiché $FF(I)=2$ coincide con il lower bound $z(I)\ge 2$ trovato nella Domanda 3, la soluzione trovata da FF è <strong>ottima</strong>.

<a id="esercizio-36-6"></a>

!!! esercizio "Esercizio 36.6: First Fit 3"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n=5$), con i seguenti pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} \\[1ex]
    \hline {w_i} & {4} & {7} & {6} & {3} & {5} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare l'algoritmo First Fit (FF) a questa istanza. Mostrare l'esecuzione passo per passo, indicando a ogni iterazione in quale contenitore è posto l'oggetto (scorrendo i contenitori nell'ordine di apertura) e la capacità residua che ne risulta. Riportare l'assegnamento finale ai contenitori e $FF(I)$.

    2. Costruire gli schemi di carico $P_1,\dots,P_{FF(I)}$ a partire dal vettore dei contenitori ottenuto nella Domanda 1.

    3. Calcolare un lower bound su $z(I)$ e stabilire se FF trova una soluzione ottima su questa istanza.

    4. Verificare se gli schemi di carico trovati da FF soddisfano la proprietà di riempimento a metà (H), e stabilire se la soluzione trovata è ottima per questa istanza del BPP, confrontando $FF(I)$ con un lower bound su $z(I)$ oppure esibendo una soluzione ammissibile di valore strettamente minore.

??? soluzione "Soluzione"

    1. Ricordiamo lo pseudocodice di FF: per ogni oggetto $i$, $s:=-1$ e, per $b:=1$ fino a $nb$, se $w[i]\le rc[b]$ allora $s\leftarrow b$ e la scansione si ferma; se $s=-1$ dopo la scansione, si apre un nuovo contenitore.

        1. Oggetto $1$ (peso $4$): il contenitore $1$ è aperto all'inizio ($nb=1$, $rc[1]=c=10$) e $w[1]\le rc[1]$, quindi $s=1$ e FF pone l'oggetto $1$ nel contenitore $1$, e $rc[1]\leftarrow 10-4=6$.

        2. Oggetto $2$ (peso $7$): $b=1$: $w[2]=7\le rc[1]=6$? No. Nessun contenitore va bene, quindi FF apre il contenitore $2$ ($rc[2]\leftarrow 10$). L'oggetto $2$ è posto nel contenitore $2$, e $rc[2]\leftarrow 10-7=3$.

        3. Oggetto $3$ (peso $6$): $b=1$: $w[3]=6\le rc[1]=6$? Sì, quindi $s\leftarrow 1$ e la scansione si ferma. L'oggetto $3$ è posto nel contenitore $1$, e $rc[1]\leftarrow 6-6=0$.

        4. Oggetto $4$ (peso $3$): $b=1$: $w[4]=3\le rc[1]=0$? No. $b=2$: $w[4]=3\le rc[2]=3$? Sì, quindi $s\leftarrow 2$. L'oggetto $4$ è posto nel contenitore $2$, e $rc[2]\leftarrow 3-3=0$.

        5. Oggetto $5$ (peso $5$): $b=1$: $w[5]=5\le rc[1]=0$? No. $b=2$: $w[5]=5\le rc[2]=0$? No. Nessun contenitore va bene, quindi FF apre il contenitore $3$ ($rc[3]\leftarrow 10$). L'oggetto $5$ è posto nel contenitore $3$, e $rc[3]\leftarrow 10-5=5$.

        Quindi FF restituisce:

        $$
        bin = \begin{pmatrix} 1 & 2 & 1 & 2 & 3 \end{pmatrix},
        \qquad
        nb=3.
        $$

        e pertanto

        $$
        FF(I)=nb=3.
        $$

    2. Dal vettore $bin=(1,2,1,2,3)$, gli schemi di carico sono

        \begin{align*}
        P_1 &= \{ i : bin_i = 1 \} = \{1,3\},\\
        P_2 &= \{ i : bin_i = 2 \} = \{2,4\},\\
        P_3 &= \{ i : bin_i = 3 \} = \{5\}.
        \end{align*}

    3. Di conseguenza,

        $$
        z(I)\le 3.
        $$

        Inoltre,

        $$
        z(I)\ge \left\lceil \frac{\sum_{i\in\mathscr{I}} w_i}{c} \right\rceil = \left\lceil \frac{4+7+6+3+5}{10} \right\rceil= \left\lceil \frac{25}{10} \right\rceil =3.
        $$

        Quindi $z(I)=3$ e FF calcola una soluzione <strong>ottima</strong> su questa istanza.

    4. Dalla Domanda 2, gli schemi di carico trovati da FF hanno pesi totali

        $$
        \sum_{i\in P_1} w_i = 4+6=10, \qquad \sum_{i\in P_2} w_i = 7+3=10, \qquad \sum_{i\in P_3} w_i = 5.
        $$

        Poiché $c/2=5$, solo $P_3$ ha peso totale al più $c/2$ (gli altri due lo superano); quindi la soluzione <strong>soddisfa</strong> la proprietà di riempimento a metà.

        Poiché $FF(I)=3$ coincide con il lower bound $z(I)\ge 3$ trovato nella Domanda 3, la soluzione trovata da FF è <strong>ottima</strong>.

## Best Fit

<a id="esercizio-36-7"></a>

!!! esercizio "Esercizio 36.7: Best Fit 1"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4\}$ di $4$ oggetti ($n=4$), con i seguenti pesi:

    $$
    \begin{array}{l|cccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} \\[1ex]
    \hline {w_i} & {6} & {6} & {4} & {4} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare l'algoritmo Best Fit (BF) a questa istanza. Mostrare l'esecuzione passo per passo: per ogni oggetto, seguire le variabili $minrc$ e $s$ dello pseudocodice durante la scansione dei contenitori aperti, e indicare in quale contenitore è posto l'oggetto e la capacità residua che ne risulta.

    2. Costruire gli schemi di carico $P_1,\dots,P_{BF(I)}$ a partire dal vettore dei contenitori ottenuto nella Domanda 1.

    3. Calcolare un lower bound su $z(I)$ e stabilire se BF trova una soluzione ottima su questa istanza.

    4. Verificare se gli schemi di carico trovati da BF soddisfano la proprietà di riempimento a metà (H), e stabilire se la soluzione trovata è ottima per questa istanza del BPP, confrontando $BF(I)$ con un lower bound su $z(I)$ oppure esibendo una soluzione ammissibile di valore strettamente minore.

??? soluzione "Soluzione"

    1. Ricordiamo lo pseudocodice di BF: per ogni oggetto, $minrc:=c+1$, $s:=-1$, e per $b:=1$ fino a $nb$, se $w[i]\le rc[b]$ e $rc[b]<minrc$ allora $s\leftarrow b$, $minrc \leftarrow rc[b]$.

        1. Oggetto $1$ (peso $6$): il contenitore $1$ è aperto all'inizio ($nb=1$, $rc[1]=c$) e l'oggetto $1$ vi entra, quindi $s=1$ e BF pone l'oggetto $1$ nel contenitore $1$. Capacità residua del contenitore $1$: $10-6=4$.

        2. Oggetto $2$ (peso $6$): $minrc:=11$, $s:=-1$. Per $b=1$: $w[2]=6\le rc[1]=4$? No. Nessun contenitore va bene, quindi BF apre il contenitore $2$ e vi pone l'oggetto $2$. Capacità residua del contenitore $2$: $10-6=4$.

        3. Oggetto $3$ (peso $4$): $minrc:=11$, $s:=-1$. Per $b=1$: $w[3]=4\le rc[1]=4$ e $rc[1]=4<11$, quindi $s\leftarrow 1$, $minrc\leftarrow 4$. Per $b=2$: $w[3]=4\le rc[2]=4$, ma $rc[2]=4$ <em>non</em> è strettamente minore di $minrc=4$, quindi $s$ non si aggiorna. Quindi $s=1$: l'oggetto $3$ è posto nel contenitore $1$ (il primo aperto, perché il pareggio fra il contenitore $1$ e il contenitore $2$ è risolto dalla disuguaglianza stretta dello pseudocodice). Capacità residua del contenitore $1$: $4-4=0$.

        4. Oggetto $4$ (peso $4$): $minrc:=11$, $s:=-1$. Per $b=1$: $w[4]=4\le rc[1]=0$? No. Per $b=2$: $w[4]=4\le rc[2]=4$ e $rc[2]=4<11$, quindi $s\leftarrow 2$, $minrc\leftarrow 4$. Quindi $s=2$: l'oggetto $4$ è posto nel contenitore $2$. Capacità residua del contenitore $2$: $4-4=0$.

        Quindi BF restituisce:

        $$
        bin = \begin{pmatrix} 1 & 2 & 1 & 2 \end{pmatrix},
        \qquad
        nb=2.
        $$

        e pertanto

        $$
        BF(I)=nb=2.
        $$

    2. Dal vettore $bin=(1,2,1,2)$, gli schemi di carico sono

        \begin{align*}
        P_1 &= \{ i \in \{1,2,3,4\} : bin_i = 1 \} = \{1,3\},\\
        P_2 &= \{ i \in \{1,2,3,4\} : bin_i = 2 \} = \{2,4\}.
        \end{align*}

    3. Di conseguenza,

        $$
        z(I)\le 2.
        $$

        Inoltre,

        $$
        z(I)\ge \left\lceil \frac{\sum_{i\in\mathscr{I}} w_i}{c} \right\rceil = \left\lceil \frac{6+6+4+4}{10} \right\rceil= \left\lceil \frac{20}{10} \right\rceil =2.
        $$

        Quindi $z(I)=2$ e BF calcola una soluzione <strong>ottima</strong> su questa istanza.

    4. Dalla Domanda 2, gli schemi di carico trovati da BF hanno pesi totali

        $$
        \sum_{i\in P_1} w_i = 6+4=10, \qquad \sum_{i\in P_2} w_i = 6+4=10.
        $$

        Poiché $c/2=5$, nessuno schema di carico ha peso totale al più $c/2$; in particolare <em>al più uno</em> lo ha, quindi la soluzione <strong>soddisfa</strong> la proprietà di riempimento a metà.

        Poiché $BF(I)=2$ coincide con il lower bound $z(I)\ge 2$ trovato nella Domanda 3, la soluzione trovata da BF è <strong>ottima</strong>.

<a id="esercizio-36-8"></a>

!!! esercizio "Esercizio 36.8: Best Fit 2"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4\}$ di $4$ oggetti ($n=4$), con i seguenti pesi:

    $$
    \begin{array}{l|cccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} \\[1ex]
    \hline {w_i} & {7} & {7} & {3} & {3} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare l'algoritmo Best Fit (BF) a questa istanza. Mostrare l'esecuzione passo per passo: per ogni oggetto, seguire le variabili $minrc$ e $s$ dello pseudocodice durante la scansione dei contenitori aperti, e indicare in quale contenitore è posto l'oggetto e la capacità residua che ne risulta.

    2. Costruire gli schemi di carico $P_1,\dots,P_{BF(I)}$ a partire dal vettore dei contenitori ottenuto nella Domanda 1.

    3. Calcolare un lower bound su $z(I)$ e stabilire se BF trova una soluzione ottima su questa istanza.

    4. Verificare se gli schemi di carico trovati da BF soddisfano la proprietà di riempimento a metà (H), e stabilire se la soluzione trovata è ottima per questa istanza del BPP, confrontando $BF(I)$ con un lower bound su $z(I)$ oppure esibendo una soluzione ammissibile di valore strettamente minore.

??? soluzione "Soluzione"

    1. Ricordiamo lo pseudocodice di BF: per ogni oggetto $i$, $minrc:=c+1$, $s:=-1$, e per $b:=1$ fino a $nb$, se $w[i]\le rc[b]$ e $rc[b]<minrc$ allora $s\leftarrow b$, $minrc\leftarrow rc[b]$.

        1. Oggetto $1$ (peso $7$): il contenitore $1$ è aperto all'inizio ($nb=1$, $rc[1]=c$) e l'oggetto $1$ vi entra, quindi $s=1$ e BF pone l'oggetto $1$ nel contenitore $1$. Capacità residua del contenitore $1$: $10-7=3$.

        2. Oggetto $2$ (peso $7$): $minrc:=11$, $s:=-1$. Per $b=1$: $w[2]=7\le rc[1]=3$? No. Nessun contenitore va bene, quindi BF apre il contenitore $2$ e vi pone l'oggetto $2$. Capacità residua del contenitore $2$: $10-7=3$.

        3. Oggetto $3$ (peso $3$): $minrc:=11$, $s:=-1$. Per $b=1$: $w[3]=3\le rc[1]=3$ e $rc[1]=3<11$, quindi $s\leftarrow 1$, $minrc\leftarrow 3$. Per $b=2$: $w[3]=3\le rc[2]=3$, ma $rc[2]=3$ <em>non</em> è strettamente minore di $minrc=3$, quindi $s$ non si aggiorna. Quindi $s=1$: l'oggetto $3$ è posto nel contenitore $1$ (il primo aperto, perché il pareggio fra il contenitore $1$ e il contenitore $2$ è risolto dalla disuguaglianza stretta dello pseudocodice). Capacità residua del contenitore $1$: $3-3=0$.

        4. Oggetto $4$ (peso $3$): $minrc:=11$, $s:=-1$. Per $b=1$: $w[4]=3\le rc[1]=0$? No. Per $b=2$: $w[4]=3\le rc[2]=3$ e $rc[2]=3<11$, quindi $s\leftarrow 2$, $minrc\leftarrow 3$. Quindi $s=2$: l'oggetto $4$ è posto nel contenitore $2$. Capacità residua del contenitore $2$: $3-3=0$.

        Quindi BF restituisce:

        $$
        bin = \begin{pmatrix} 1 & 2 & 1 & 2 \end{pmatrix},
        \qquad
        nb=2.
        $$

        e pertanto

        $$
        BF(I)=nb=2.
        $$

    2. Dal vettore $bin=(1,2,1,2)$, gli schemi di carico sono

        \begin{align*}
        P_1 &= \{ i \in \{1,2,3,4\} : bin_i = 1 \} = \{1,3\},\\
        P_2 &= \{ i \in \{1,2,3,4\} : bin_i = 2 \} = \{2,4\}.
        \end{align*}

    3. Di conseguenza,

        $$
        z(I)\le 2.
        $$

        Inoltre,

        $$
        z(I)\ge \left\lceil \frac{\sum_{i\in\mathscr{I}} w_i}{c} \right\rceil = \left\lceil \frac{7+7+3+3}{10} \right\rceil= \left\lceil \frac{20}{10} \right\rceil =2.
        $$

        Quindi $z(I)=2$ e BF calcola una soluzione <strong>ottima</strong> su questa istanza.

    4. Dalla Domanda 2, gli schemi di carico trovati da BF hanno pesi totali

        $$
        \sum_{i\in P_1} w_i = 7+3=10, \qquad \sum_{i\in P_2} w_i = 7+3=10.
        $$

        Poiché $c/2=5$, nessuno schema di carico ha peso totale al più $c/2$; in particolare <em>al più uno</em> lo ha, quindi la soluzione <strong>soddisfa</strong> la proprietà di riempimento a metà.

        Poiché $BF(I)=2$ coincide con il lower bound $z(I)\ge 2$ trovato nella Domanda 3, la soluzione trovata da BF è <strong>ottima</strong>.

<a id="esercizio-36-9"></a>

!!! esercizio "Esercizio 36.9: Best Fit 3"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n=5$), con i seguenti pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} \\[1ex]
    \hline {w_i} & {4} & {7} & {6} & {3} & {5} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare l'algoritmo Best Fit (BF) a questa istanza. Mostrare l'esecuzione passo per passo: per ogni oggetto, seguire le variabili $minrc$ e $s$ dello pseudocodice durante la scansione dei contenitori aperti, e indicare in quale contenitore è posto l'oggetto e la capacità residua che ne risulta.

    2. Costruire gli schemi di carico $P_1,\dots,P_{BF(I)}$ a partire dal vettore dei contenitori ottenuto nella Domanda 1.

    3. Calcolare un lower bound su $z(I)$ e stabilire se BF trova una soluzione ottima su questa istanza.

    4. Verificare se gli schemi di carico trovati da BF soddisfano la proprietà di riempimento a metà (H), e stabilire se la soluzione trovata è ottima per questa istanza del BPP, confrontando $BF(I)$ con un lower bound su $z(I)$ oppure esibendo una soluzione ammissibile di valore strettamente minore.

??? soluzione "Soluzione"

    1. Ricordiamo lo pseudocodice di BF: per ogni oggetto $i$, $minrc:=c+1$, $s:=-1$, e per $b:=1$ fino a $nb$, se $w[i]\le rc[b]$ e $rc[b]<minrc$ allora $s\leftarrow b$, $minrc\leftarrow rc[b]$.

        1. Oggetto $1$ (peso $4$): il contenitore $1$ è aperto all'inizio ($nb=1$, $rc[1]=c$) e l'oggetto $1$ vi entra, quindi $s=1$ e BF pone l'oggetto $1$ nel contenitore $1$. Capacità residua del contenitore $1$: $10-4=6$.

        2. Oggetto $2$ (peso $7$): $minrc:=11$, $s:=-1$. Per $b=1$: $w[2]=7\le rc[1]=6$? No. Nessun contenitore va bene, quindi BF apre il contenitore $2$ e vi pone l'oggetto $2$. Capacità residua del contenitore $2$: $10-7=3$.

        3. Oggetto $3$ (peso $6$): $minrc:=11$, $s:=-1$. Per $b=1$: $w[3]=6\le rc[1]=6$ e $rc[1]=6<11$, quindi $s\leftarrow 1$, $minrc\leftarrow 6$. Per $b=2$: $w[3]=6\le rc[2]=3$? No. Quindi $s=1$: l'oggetto $3$ è posto nel contenitore $1$. Capacità residua del contenitore $1$: $6-6=0$.

        4. Oggetto $4$ (peso $3$): $minrc:=11$, $s:=-1$. Per $b=1$: $w[4]=3\le rc[1]=0$? No. Per $b=2$: $w[4]=3\le rc[2]=3$ e $rc[2]=3<11$, quindi $s\leftarrow 2$, $minrc\leftarrow 3$. Quindi $s=2$: l'oggetto $4$ è posto nel contenitore $2$. Capacità residua del contenitore $2$: $3-3=0$.

        5. Oggetto $5$ (peso $5$): $minrc:=11$, $s:=-1$. Per $b=1$: $w[5]=5\le rc[1]=0$? No. Per $b=2$: $w[5]=5\le rc[2]=0$? No. Nessun contenitore va bene, quindi BF apre il contenitore $3$ e vi pone l'oggetto $5$. Capacità residua del contenitore $3$: $10-5=5$.

        Quindi BF restituisce:

        $$
        bin = \begin{pmatrix} 1 & 2 & 1 & 2 & 3 \end{pmatrix},
        \qquad
        nb=3.
        $$

        e pertanto

        $$
        BF(I)=nb=3.
        $$

    2. Dal vettore $bin=(1,2,1,2,3)$, gli schemi di carico sono

        \begin{align*}
        P_1 &= \{ i : bin_i = 1 \} = \{1,3\},\\
        P_2 &= \{ i : bin_i = 2 \} = \{2,4\},\\
        P_3 &= \{ i : bin_i = 3 \} = \{5\}.
        \end{align*}

    3. Di conseguenza,

        $$
        z(I)\le 3.
        $$

        Inoltre,

        $$
        z(I)\ge \left\lceil \frac{\sum_{i\in\mathscr{I}} w_i}{c} \right\rceil = \left\lceil \frac{4+7+6+3+5}{10} \right\rceil= \left\lceil \frac{25}{10} \right\rceil =3.
        $$

        Quindi $z(I)=3$ e BF calcola una soluzione <strong>ottima</strong> su questa istanza.

    4. Dalla Domanda 2, gli schemi di carico trovati da BF hanno pesi totali

        $$
        \sum_{i\in P_1} w_i = 4+6=10, \qquad \sum_{i\in P_2} w_i = 7+3=10, \qquad \sum_{i\in P_3} w_i = 5.
        $$

        Poiché $c/2=5$, solo $P_3$ ha peso totale al più $c/2$ (gli altri due lo superano); quindi la soluzione <strong>soddisfa</strong> la proprietà di riempimento a metà.

        Poiché $BF(I)=3$ coincide con il lower bound $z(I)\ge 3$ trovato nella Domanda 3, la soluzione trovata da BF è <strong>ottima</strong>.

## Worst Fit

<a id="esercizio-36-10"></a>

!!! esercizio "Esercizio 36.10: Worst Fit 1"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4\}$ di $4$ oggetti ($n=4$), con i seguenti pesi:

    $$
    \begin{array}{l|cccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} \\[1ex]
    \hline {w_i} & {6} & {6} & {4} & {4} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare l'algoritmo Worst Fit (WF) a questa istanza. Mostrare l'esecuzione passo per passo: per ogni oggetto, seguire le variabili $maxrc$ e $s$ dello pseudocodice durante la scansione dei contenitori aperti, e indicare in quale contenitore è posto l'oggetto e la capacità residua che ne risulta.

    2. Costruire gli schemi di carico $P_1,\dots,P_{WF(I)}$ a partire dal vettore dei contenitori ottenuto nella Domanda 1.

    3. Calcolare un lower bound su $z(I)$ e stabilire se WF trova una soluzione ottima su questa istanza.

    4. Verificare se gli schemi di carico trovati da WF soddisfano la proprietà di riempimento a metà (H), e stabilire se la soluzione trovata è ottima per questa istanza del BPP, confrontando $WF(I)$ con un lower bound su $z(I)$ oppure esibendo una soluzione ammissibile di valore strettamente minore.

??? soluzione "Soluzione"

    1. Ricordiamo lo pseudocodice di WF: per ogni oggetto $i$, $maxrc:=-1$, $s:=-1$, e per $b:=1$ fino a $nb$, se $w[i]\le rc[b]$ e $rc[b]>maxrc$ allora $s\leftarrow b$, $maxrc\leftarrow rc[b]$.

        1. Oggetto $1$ (peso $6$): il contenitore $1$ è aperto all'inizio ($nb=1$, $rc[1]=c$) e l'oggetto $1$ vi entra, quindi $s=1$ e WF pone l'oggetto $1$ nel contenitore $1$. Capacità residua del contenitore $1$: $10-6=4$.

        2. Oggetto $2$ (peso $6$): $maxrc:=-1$, $s:=-1$. Per $b=1$: $w[2]=6\le rc[1]=4$? No. Nessun contenitore va bene, quindi WF apre il contenitore $2$ e vi pone l'oggetto $2$. Capacità residua del contenitore $2$: $10-6=4$.

        3. Oggetto $3$ (peso $4$): $maxrc:=-1$, $s:=-1$. Per $b=1$: $w[3]=4\le rc[1]=4$ e $rc[1]=4>-1$, quindi $s\leftarrow 1$, $maxrc\leftarrow 4$. Per $b=2$: $w[3]=4\le rc[2]=4$, ma $rc[2]=4$ <em>non</em> è strettamente maggiore di $maxrc=4$, quindi $s$ non si aggiorna. Quindi $s=1$: l'oggetto $3$ è posto nel contenitore $1$ (il primo aperto, perché il pareggio fra il contenitore $1$ e il contenitore $2$ è risolto dalla disuguaglianza stretta dello pseudocodice). Capacità residua del contenitore $1$: $4-4=0$.

        4. Oggetto $4$ (peso $4$): $maxrc:=-1$, $s:=-1$. Per $b=1$: $w[4]=4\le rc[1]=0$? No. Per $b=2$: $w[4]=4\le rc[2]=4$ e $rc[2]=4>-1$, quindi $s\leftarrow 2$, $maxrc\leftarrow 4$. Quindi $s=2$: l'oggetto $4$ è posto nel contenitore $2$. Capacità residua del contenitore $2$: $4-4=0$.

        Quindi WF restituisce:

        $$
        bin = \begin{pmatrix} 1 & 2 & 1 & 2 \end{pmatrix},
        \qquad
        nb=2.
        $$

        e pertanto

        $$
        WF(I)=nb=2.
        $$

    2. Dal vettore $bin=(1,2,1,2)$, gli schemi di carico sono

        \begin{align*}
        P_1 &= \{ i \in \{1,2,3,4\} : bin_i = 1 \} = \{1,3\},\\
        P_2 &= \{ i \in \{1,2,3,4\} : bin_i = 2 \} = \{2,4\}.
        \end{align*}

    3. Di conseguenza,

        $$
        z(I)\le 2.
        $$

        Inoltre,

        $$
        z(I)\ge \left\lceil \frac{\sum_{i\in\mathscr{I}} w_i}{c} \right\rceil = \left\lceil \frac{6+6+4+4}{10} \right\rceil= \left\lceil \frac{20}{10} \right\rceil =2.
        $$

        Quindi $z(I)=2$ e WF calcola una soluzione <strong>ottima</strong> su questa istanza.

    4. Dalla Domanda 2, gli schemi di carico trovati da WF hanno pesi totali

        $$
        \sum_{i\in P_1} w_i = 6+4=10, \qquad \sum_{i\in P_2} w_i = 6+4=10.
        $$

        Poiché $c/2=5$, nessuno schema di carico ha peso totale al più $c/2$; in particolare <em>al più uno</em> lo ha, quindi la soluzione <strong>soddisfa</strong> la proprietà di riempimento a metà.

        Poiché $WF(I)=2$ coincide con il lower bound $z(I)\ge 2$ trovato nella Domanda 3, la soluzione trovata da WF è <strong>ottima</strong>.

<a id="esercizio-36-11"></a>

!!! esercizio "Esercizio 36.11: Worst Fit 2"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4\}$ di $4$ oggetti ($n=4$), con i seguenti pesi:

    $$
    \begin{array}{l|cccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} \\[1ex]
    \hline {w_i} & {7} & {7} & {3} & {3} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare l'algoritmo Worst Fit (WF) a questa istanza. Mostrare l'esecuzione passo per passo: per ogni oggetto, seguire le variabili $maxrc$ e $s$ dello pseudocodice durante la scansione dei contenitori aperti, e indicare in quale contenitore è posto l'oggetto e la capacità residua che ne risulta.

    2. Costruire gli schemi di carico $P_1,\dots,P_{WF(I)}$ a partire dal vettore dei contenitori ottenuto nella Domanda 1.

    3. Calcolare un lower bound su $z(I)$ e stabilire se WF trova una soluzione ottima su questa istanza.

    4. Verificare se gli schemi di carico trovati da WF soddisfano la proprietà di riempimento a metà (H), e stabilire se la soluzione trovata è ottima per questa istanza del BPP, confrontando $WF(I)$ con un lower bound su $z(I)$ oppure esibendo una soluzione ammissibile di valore strettamente minore.

??? soluzione "Soluzione"

    1. Ricordiamo lo pseudocodice di WF: per ogni oggetto $i$, $maxrc:=-1$, $s:=-1$, e per $b:=1$ fino a $nb$, se $w[i]\le rc[b]$ e $rc[b]>maxrc$ allora $s\leftarrow b$, $maxrc\leftarrow rc[b]$.

        1. Oggetto $1$ (peso $7$): il contenitore $1$ è aperto all'inizio ($nb=1$, $rc[1]=c$) e l'oggetto $1$ vi entra, quindi $s=1$ e WF pone l'oggetto $1$ nel contenitore $1$. Capacità residua del contenitore $1$: $10-7=3$.

        2. Oggetto $2$ (peso $7$): $maxrc:=-1$, $s:=-1$. Per $b=1$: $w[2]=7\le rc[1]=3$? No. Nessun contenitore va bene, quindi WF apre il contenitore $2$ e vi pone l'oggetto $2$. Capacità residua del contenitore $2$: $10-7=3$.

        3. Oggetto $3$ (peso $3$): $maxrc:=-1$, $s:=-1$. Per $b=1$: $w[3]=3\le rc[1]=3$ e $rc[1]=3>-1$, quindi $s\leftarrow 1$, $maxrc\leftarrow 3$. Per $b=2$: $w[3]=3\le rc[2]=3$, ma $rc[2]=3$ <em>non</em> è strettamente maggiore di $maxrc=3$, quindi $s$ non si aggiorna. Quindi $s=1$: l'oggetto $3$ è posto nel contenitore $1$ (il primo aperto, perché il pareggio fra il contenitore $1$ e il contenitore $2$ è risolto dalla disuguaglianza stretta dello pseudocodice). Capacità residua del contenitore $1$: $3-3=0$.

        4. Oggetto $4$ (peso $3$): $maxrc:=-1$, $s:=-1$. Per $b=1$: $w[4]=3\le rc[1]=0$? No. Per $b=2$: $w[4]=3\le rc[2]=3$ e $rc[2]=3>-1$, quindi $s\leftarrow 2$, $maxrc\leftarrow 3$. Quindi $s=2$: l'oggetto $4$ è posto nel contenitore $2$. Capacità residua del contenitore $2$: $3-3=0$.

        Quindi WF restituisce:

        $$
        bin = \begin{pmatrix} 1 & 2 & 1 & 2 \end{pmatrix},
        \qquad
        nb=2.
        $$

        e pertanto

        $$
        WF(I)=nb=2.
        $$

    2. Dal vettore $bin=(1,2,1,2)$, gli schemi di carico sono

        \begin{align*}
        P_1 &= \{ i \in \{1,2,3,4\} : bin_i = 1 \} = \{1,3\},\\
        P_2 &= \{ i \in \{1,2,3,4\} : bin_i = 2 \} = \{2,4\}.
        \end{align*}

    3. Di conseguenza,

        $$
        z(I)\le 2.
        $$

        Inoltre,

        $$
        z(I)\ge \left\lceil \frac{\sum_{i\in\mathscr{I}} w_i}{c} \right\rceil = \left\lceil \frac{7+7+3+3}{10} \right\rceil= \left\lceil \frac{20}{10} \right\rceil =2.
        $$

        Quindi $z(I)=2$ e WF calcola una soluzione <strong>ottima</strong> su questa istanza.

    4. Dalla Domanda 2, gli schemi di carico trovati da WF hanno pesi totali

        $$
        \sum_{i\in P_1} w_i = 7+3=10, \qquad \sum_{i\in P_2} w_i = 7+3=10.
        $$

        Poiché $c/2=5$, nessuno schema di carico ha peso totale al più $c/2$; in particolare <em>al più uno</em> lo ha, quindi la soluzione <strong>soddisfa</strong> la proprietà di riempimento a metà.

        Poiché $WF(I)=2$ coincide con il lower bound $z(I)\ge 2$ trovato nella Domanda 3, la soluzione trovata da WF è <strong>ottima</strong>.

<a id="esercizio-36-12"></a>

!!! esercizio "Esercizio 36.12: Worst Fit 3"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n=5$), con i seguenti pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} \\[1ex]
    \hline {w_i} & {4} & {7} & {6} & {3} & {5} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare l'algoritmo Worst Fit (WF) a questa istanza. Mostrare l'esecuzione passo per passo: per ogni oggetto, seguire le variabili $maxrc$ e $s$ dello pseudocodice durante la scansione dei contenitori aperti, e indicare in quale contenitore è posto l'oggetto e la capacità residua che ne risulta.

    2. Costruire gli schemi di carico $P_1,\dots,P_{WF(I)}$ a partire dal vettore dei contenitori ottenuto nella Domanda 1.

    3. Calcolare un lower bound su $z(I)$ e stabilire se WF trova una soluzione ottima su questa istanza.

    4. Verificare se gli schemi di carico trovati da WF soddisfano la proprietà di riempimento a metà (H), e stabilire se la soluzione trovata è ottima per questa istanza del BPP, confrontando $WF(I)$ con un lower bound su $z(I)$ oppure esibendo una soluzione ammissibile di valore strettamente minore.

??? soluzione "Soluzione"

    1. Ricordiamo lo pseudocodice di WF: per ogni oggetto $i$, $maxrc:=-1$, $s:=-1$, e per $b:=1$ fino a $nb$, se $w[i]\le rc[b]$ e $rc[b]>maxrc$ allora $s\leftarrow b$, $maxrc\leftarrow rc[b]$.

        1. Oggetto $1$ (peso $4$): il contenitore $1$ è aperto all'inizio ($nb=1$, $rc[1]=c$) e l'oggetto $1$ vi entra, quindi $s=1$ e WF pone l'oggetto $1$ nel contenitore $1$. Capacità residua del contenitore $1$: $10-4=6$.

        2. Oggetto $2$ (peso $7$): $maxrc:=-1$, $s:=-1$. Per $b=1$: $w[2]=7\le rc[1]=6$? No. Nessun contenitore va bene, quindi WF apre il contenitore $2$ e vi pone l'oggetto $2$. Capacità residua del contenitore $2$: $10-7=3$.

        3. Oggetto $3$ (peso $6$): $maxrc:=-1$, $s:=-1$. Per $b=1$: $w[3]=6\le rc[1]=6$ e $rc[1]=6>-1$, quindi $s\leftarrow 1$, $maxrc\leftarrow 6$. Per $b=2$: $w[3]=6\le rc[2]=3$? No. Quindi $s=1$: l'oggetto $3$ è posto nel contenitore $1$. Capacità residua del contenitore $1$: $6-6=0$.

        4. Oggetto $4$ (peso $3$): $maxrc:=-1$, $s:=-1$. Per $b=1$: $w[4]=3\le rc[1]=0$? No. Per $b=2$: $w[4]=3\le rc[2]=3$ e $rc[2]=3>-1$, quindi $s\leftarrow 2$, $maxrc\leftarrow 3$. Quindi $s=2$: l'oggetto $4$ è posto nel contenitore $2$. Capacità residua del contenitore $2$: $3-3=0$.

        5. Oggetto $5$ (peso $5$): $maxrc:=-1$, $s:=-1$. Per $b=1$: $w[5]=5\le rc[1]=0$? No. Per $b=2$: $w[5]=5\le rc[2]=0$? No. Nessun contenitore va bene, quindi WF apre il contenitore $3$ e vi pone l'oggetto $5$. Capacità residua del contenitore $3$: $10-5=5$.

        Quindi WF restituisce:

        $$
        bin = \begin{pmatrix} 1 & 2 & 1 & 2 & 3 \end{pmatrix},
        \qquad
        nb=3.
        $$

        e pertanto

        $$
        WF(I)=nb=3.
        $$

    2. Dal vettore $bin=(1,2,1,2,3)$, gli schemi di carico sono

        \begin{align*}
        P_1 &= \{ i : bin_i = 1 \} = \{1,3\},\\
        P_2 &= \{ i : bin_i = 2 \} = \{2,4\},\\
        P_3 &= \{ i : bin_i = 3 \} = \{5\}.
        \end{align*}

    3. Di conseguenza,

        $$
        z(I)\le 3.
        $$

        Inoltre,

        $$
        z(I)\ge \left\lceil \frac{\sum_{i\in\mathscr{I}} w_i}{c} \right\rceil = \left\lceil \frac{4+7+6+3+5}{10} \right\rceil= \left\lceil \frac{25}{10} \right\rceil =3.
        $$

        Quindi $z(I)=3$ e WF calcola una soluzione <strong>ottima</strong> su questa istanza.

    4. Dalla Domanda 2, gli schemi di carico trovati da WF hanno pesi totali

        $$
        \sum_{i\in P_1} w_i = 4+6=10, \qquad \sum_{i\in P_2} w_i = 7+3=10, \qquad \sum_{i\in P_3} w_i = 5.
        $$

        Poiché $c/2=5$, solo $P_3$ ha peso totale al più $c/2$ (gli altri due lo superano); quindi la soluzione <strong>soddisfa</strong> la proprietà di riempimento a metà.

        Poiché $WF(I)=3$ coincide con il lower bound $z(I)\ge 3$ trovato nella Domanda 3, la soluzione trovata da WF è <strong>ottima</strong>.
