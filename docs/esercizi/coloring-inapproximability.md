---
title: "Esercizi · Colorazione dei vertici: limiti dell'approssimazione"
---

# Esercizi · Colorazione dei vertici: limiti dell'approssimazione

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 37** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 37: Colorazione dei vertici (VCP)](../algoritmi-di-approssimazione/coloring-inapproximability.md) · [:material-file-pdf-box: Eserciziario, volume 5 (PDF)](../pdf/esercizi-5-algoritmi-di-approssimazione.pdf)

</div>

!!! formula "Risultati usati in questi esercizi"

    Dal capitolo [Colorazione dei vertici: limiti dell'approssimazione](../algoritmi-di-approssimazione/coloring-inapproximability.md), per un grafo $G=(V,E)$ con $n$ vertici, $m$ spigoli e grado massimo $\Delta(G)$:

    \begin{align*}
    &\text{nessun rapporto sotto } \tfrac43\text{:} && \tfrac{\mathscr{A}(I)}{\chi(G)}<\tfrac43 \text{ su ogni grafo deciderebbe } \chi(G)\le 3 \text{, a meno che } P=NP; \tag{C1}\\
    &\text{grafi bipartiti:} && \chi(G)\le 2 \iff \text{nessun ciclo dispari; visita in ampiezza in } O(n+m); \tag{C2}\\
    &\text{colorazione greedy:} && GC(I)\le\Delta(G)+1 \text{ per ogni ordine dei vertici}; \tag{C3}\\
    &\text{grafi planari:} && m\le 3n-6~(n\ge3),\quad PL(I)-\chi(G)\le 2~(\le 1 \text{ con } 4 \text{ colori}); \tag{C4}\\
    &\text{grafi di intervalli:} && GC \text{ per estremo sinistro non decrescente usa } \omega(G)=\chi(G) \text{ colori}. \tag{C5}
    \end{align*}

<a id="esercizio-37-1"></a>

!!! esercizio "Esercizio 37.1: Il rapporto quattro terzi (1)"

    Consideriamo i due grafi

    - **$G_1$:** la ruota con $6$ vertici: il ciclo $1,2,3,4,5,1$ e il vertice $6$ adiacente a tutti gli altri, $E_1=\{\{1,2\},\allowbreak \{2,3\},\allowbreak \{3,4\},\allowbreak \{4,5\},\allowbreak \{1,5\},\allowbreak \{1,6\},\allowbreak \{2,6\},\allowbreak \{3,6\},\allowbreak \{4,6\},\allowbreak \{5,6\}\}$;

    - **$G_2$:** il ciclo con $7$ vertici, $E_2=\{\{1,2\},\allowbreak \{2,3\},\allowbreak \{3,4\},\allowbreak \{4,5\},\allowbreak \{5,6\},\allowbreak \{6,7\},\allowbreak \{1,7\}\}$.

    Supponiamo che un algoritmo polinomiale $\mathscr{A}$ per il VCP abbia la garanzia $\frac{\mathscr{A}(I)}{\chi(G)}<\frac{4}{3}$ su ogni grafo.

    **Domande**

    1. Calcolare $\chi(G_1)$ e $\chi(G_2)$, con una colorazione e una dimostrazione che meno colori non bastano.

    2. Quali numeri di colori può restituire $\mathscr{A}$ su $G_1$ e su $G_2$?

    3. Su un terzo grafo $G_3$, $\mathscr{A}$ restituisce $5$ colori. Che cosa si può dire di $\chi(G_3)$? $\mathscr{A}$ deciderebbe se $\chi(G_3)\le 3$?

    4. Lo stesso argomento con $\frac{\mathscr{A}(I)}{\chi(G)}<\frac{3}{2}$ deciderebbe se $\chi(G)\le 2$. Perché questo non dimostra nulla?

??? soluzione "Soluzione"

    Usiamo i risultati (C1)–(C5) del riquadro all'inizio del capitolo.

    1. $G_2$ è un ciclo di lunghezza dispari, che richiede $3$ colori, e $1,2,1,2,1,2,3$ è una colorazione: $\chi(G_2)=3$. In $G_1$ il ciclo esterno $1,2,3,4,5$ è dispari e richiede $3$ colori, e il vertice $6$ è adiacente a tutti i suoi vertici e richiede un quarto colore; la colorazione $1,2,1,2,3$ del ciclo e $4$ per il vertice $6$ dà $\chi(G_1)=4$. L'enumerazione conferma entrambi i valori.

    2. Su $G_2$: $\mathscr{A}(I)\ge\chi(G_2)=3$ e $\mathscr{A}(I)<\frac{4}{3}\cdot 3=4$, quindi $\mathscr{A}(I)=3$. Su $G_1$: $4\le\mathscr{A}(I)<\frac{4}{3}\cdot 4=\frac{16}{3}$, quindi $\mathscr{A}(I)\in\{4,5\}$. Come in (C1), $\mathscr{A}$ restituisce al più $3$ colori esattamente sui grafi con $\chi(G)\le 3$.

    3. Da $5<\frac{4}{3}\chi(G_3)$ otteniamo $\chi(G_3)>\frac{15}{4}$, quindi $\chi(G_3)\ge 4$; l'ammissibilità dà $\chi(G_3)\le 5$. Sì: $\mathscr{A}$ ha restituito più di $3$ colori, quindi $\chi(G_3)\ge 4$ e $G_3$ non è $3$-colorabile.

    4. Decidere se $\chi(G)\le 2$ richiede tempo polinomiale con la visita in ampiezza (C2): un algoritmo che lo decide non dà alcuna contraddizione con $P\neq NP$. La soglia $\frac{4}{3}$ viene dalla $3$-colorabilità, che è NP-completa.

<a id="esercizio-37-2"></a>

!!! esercizio "Esercizio 37.2: Grafi bipartiti e visita in ampiezza (1)"

    Consideriamo i grafi

    - **$G_a$:** $V=\{1,\dots,8\}$, $E_a=\{\{1,2\},\allowbreak \{1,4\},\allowbreak \{1,5\},\allowbreak \{2,3\},\allowbreak \{2,6\},\allowbreak \{3,4\},\allowbreak \{3,7\},\allowbreak \{4,8\},\allowbreak \{5,6\},\allowbreak \{5,8\},\allowbreak \{6,7\},\allowbreak \{7,8\}\}$;

    - **$G_b$:** $V=\{1,\dots,7\}$, $E_b=\{\{1,2\},\allowbreak \{2,3\},\allowbreak \{3,4\},\allowbreak \{4,5\},\allowbreak \{5,6\},\allowbreak \{1,6\},\allowbreak \{1,4\},\allowbreak \{2,7\},\allowbreak \{5,7\}\}$.

    Eseguiamo la visita in ampiezza dal vertice $1$, visitando i vicini di un vertice in ordine crescente.

    **Domande**

    1. Calcolare i livelli dei vertici di $G_a$ e stabilire se $G_a$ è bipartito. Se lo è, dare una colorazione con $2$ colori.

    2. Calcolare i livelli dei vertici di $G_b$ e trovare uno spigolo fra due livelli della stessa parità (il primo in ordine lessicografico).

    3. A partire da quello spigolo, costruire un ciclo di lunghezza dispari di $G_b$ e trarre una conclusione su $\chi(G_b)$.

    4. Dare una colorazione di $G_b$ con $3$ colori. Quanto vale $\chi(G_b)$?

??? soluzione "Soluzione"

    Usiamo i risultati (C1)–(C5) del riquadro all'inizio del capitolo.

    1. I livelli sono: livello $0$: $\{1\}$; livello $1$: $\{2,4,5\}$; livello $2$: $\{3,6,8\}$; livello $3$: $\{7\}$. Nessuno spigolo unisce due livelli della stessa parità, quindi $G_a$ è bipartito (C2): colore $1$ per i livelli pari, $\{1,3,6,8\}$, e colore $2$ per i livelli dispari, $\{2,4,5,7\}$. Quindi $\chi(G_a)=2$.

    2. I livelli sono: livello $0$: $\{1\}$; livello $1$: $\{2,4,6\}$; livello $2$: $\{3,5,7\}$. Il primo spigolo con entrambi gli estremi in livelli della stessa parità è $\{5,7\}$, con livelli $2$ e $2$.

    3. I cammini dell'albero dall'antenato comune a $5$ e a $7$, con lo spigolo $\{5,7\}$, danno il ciclo $5,4,1,2,7,5$ con $5$ spigoli, un numero dispari. Un ciclo dispari richiede $3$ colori: $\chi(G_b)\ge 3$.

    4. La colorazione greedy nell'ordine $1,\dots,7$ dà i colori $1,2,1,2,1,2,3$, una colorazione ammissibile con $3$ colori. Quindi $\chi(G_b)=3$.

<a id="esercizio-37-3"></a>

!!! esercizio "Esercizio 37.3: La colorazione greedy e il bound sul grado (1)"

    Il grafo corona $G_k$, $k\ge 3$, ha i vertici $a_i=i$ e $b_i=k+i$, $i=1,\dots,k$, e gli spigoli $\{a_i,b_j\}$ per ogni $i\neq j$. Per $k=4$: $E=\{\{1,6\},\allowbreak \{1,7\},\allowbreak \{1,8\},\allowbreak \{2,5\},\allowbreak \{2,7\},\allowbreak \{2,8\},\allowbreak \{3,5\},\allowbreak \{3,6\},\allowbreak \{3,8\},\allowbreak \{4,5\},\allowbreak \{4,6\},\allowbreak \{4,7\}\}$. La colorazione greedy $GC$ assegna a ogni vertice, in un ordine dato, il colore più piccolo non usato dai suoi vicini già colorati.

    **Domande**

    1. Calcolare $\Delta(G_4)$ e $\chi(G_4)$.

    2. Applicare $GC$ a $G_4$ con l'ordine $\lambda_1=(1,2,3,4,5,6,7,8)$ e con l'ordine $\lambda_2=(1,5,2,6,3,7,4,8)$.

    3. Confrontare i due risultati con il bound (C3) e con $\chi(G_4)$. Il bound $\Delta(G)+1$ è raggiunto?

    4. Generalizzare l'ordine $\lambda_2$ a $G_k$ e calcolare il rapporto $\frac{GC(I)}{\chi(G_k)}$ per $k=3,\dots,6$. $GC$, con un ordine arbitrario, è un algoritmo di $\alpha$-approssimazione per qualche costante $\alpha$?

??? soluzione "Soluzione"

    Usiamo i risultati (C1)–(C5) del riquadro all'inizio del capitolo.

    1. Ogni vertice è adiacente a $k-1=3$ vertici dell'altro lato: $\Delta(G_4)=3$. Gli insiemi $\{1,2,3,4\}$ e $\{5,6,7,8\}$ sono stabili, e ci sono spigoli: $\chi(G_4)=2$.

    2. Con $\lambda_1$ i vertici $1,2,3,4$ non hanno vicini colorati e prendono il colore $1$; poi $5,\dots,8$ prendono il colore $2$: $GC(I)=2$. Con $\lambda_2$, il vertice $a_i$ è adiacente a $b_1,\dots,b_{i-1}$, che hanno i colori $1,\dots,i-1$, e prende il colore $i$; il vertice $b_i$ fa lo stesso. I colori sono $1,1,2,2,3,3,4,4$ e $GC(I)=4$.

    3. Entrambi i risultati soddisfano $GC(I)\le\Delta(G_4)+1=4$, e $\lambda_2$ raggiunge il bound. Con $\lambda_2$ la colorazione greedy usa il doppio del numero ottimo di colori, mentre con $\lambda_1$ è ottima: l'ordine conta.

    4. Con l'ordine $a_1,b_1,a_2,b_2,\dots,a_k,b_k$ i vertici $a_i$ e $b_i$ prendono il colore $i$, quindi $GC(I)=k$:

        $$
        \begin{array}{ccccc}
        \hline {k} & {n} & {\Delta(G_k)} & {GC(I)} & {\frac{GC(I)}{\chi(G_k)}} \\
        \hline {3} & {6} & {2} & {3} & {\frac{3}{2}} \\
        {4} & {8} & {3} & {4} & {2} \\
        {5} & {10} & {4} & {5} & {\frac{5}{2}} \\
        {6} & {12} & {5} & {6} & {3} \\
        \hline
        \end{array}
        $$

        Il rapporto $\frac{k}{2}$ cresce senza limite: su tutti i grafi, $GC$ non ha una garanzia costante. Sui grafi di grado massimo al più $\Delta$ il rapporto è al più $\frac{\Delta+1}{2}$, raggiunto qui.

<a id="esercizio-37-4"></a>

!!! esercizio "Esercizio 37.4: Grafi di intervalli (1)"

    Sette richieste usano una sala negli intervalli di tempo

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>richiesta <span class="arithmatex">\(v\)</span></th>
    <th><span class="arithmatex">\(1\)</span></th>
    <th><span class="arithmatex">\(2\)</span></th>
    <th><span class="arithmatex">\(3\)</span></th>
    <th><span class="arithmatex">\(4\)</span></th>
    <th><span class="arithmatex">\(5\)</span></th>
    <th><span class="arithmatex">\(6\)</span></th>
    <th><span class="arithmatex">\(7\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\([a_v,b_v]\)</span></td>
    <td><span class="arithmatex">\([1,3]\)</span></td>
    <td><span class="arithmatex">\([2,6]\)</span></td>
    <td><span class="arithmatex">\([4,7]\)</span></td>
    <td><span class="arithmatex">\([3,5]\)</span></td>
    <td><span class="arithmatex">\([6,10]\)</span></td>
    <td><span class="arithmatex">\([8,9]\)</span></td>
    <td><span class="arithmatex">\([9,12]\)</span></td>
    </tr>
    </table></div>

    Due richieste sono in conflitto se i loro intervalli chiusi si intersecano, e un colore è una sala.

    **Domande**

    1. Costruire il grafo di intervalli $G$: elencarne gli spigoli.

    2. Applicare la colorazione greedy con le richieste in ordine di estremo sinistro non decrescente.

    3. Trovare un punto coperto dal massimo numero di intervalli, e dedurre $\omega(G)$. La colorazione della domanda 2 è ottima?

    4. Applicare la colorazione greedy con l'ordine $(1,2,4,5,3,6,7)$. Che cosa mostra?

??? soluzione "Soluzione"

    Usiamo i risultati (C1)–(C5) del riquadro all'inizio del capitolo.

    1. $E=\{\{1,2\},\allowbreak \{1,4\},\allowbreak \{2,3\},\allowbreak \{2,4\},\allowbreak \{2,5\},\allowbreak \{3,4\},\allowbreak \{3,5\},\allowbreak \{5,6\},\allowbreak \{5,7\},\allowbreak \{6,7\}\}$: $10$ spigoli.

    2. L'ordine è $(1,2,4,3,5,6,7)$, e i colori sono $1\to1$, $2\to2$, $4\to3$, $3\to1$, $5\to3$, $6\to1$, $7\to2$: $GC(I)=3$.

    3. Il punto $3$ sta negli intervalli $\{1,2,4\}$, che si intersecano a due a due e formano una clique: $\omega(G)\ge3$; nessun punto sta in più di $3$ intervalli, quindi $\omega(G)=3$. Per (C5) e il bound di clique, $GC(I)=\omega(G)=\chi(G)=3$: la colorazione è ottima, con $3$ sale.

    4. I colori sono $1\to1$, $2\to2$, $4\to3$, $5\to1$, $3\to4$, $6\to2$, $7\to3$: il vertice $3$ vede i colori $\{1,2,3\}$ sui suoi vicini e prende il colore $4$. $GC(I)=4>\chi(G)$: è l'ordine degli estremi sinistri a rendere esatta la colorazione greedy.

<a id="esercizio-37-5"></a>

!!! esercizio "Esercizio 37.5: Grafi planari e una garanzia additiva (1)"

    Consideriamo i grafi

    - **$W$:** la ruota, $E=\{\{1,2\},\allowbreak \{2,3\},\allowbreak \{3,4\},\allowbreak \{4,5\},\allowbreak \{1,5\},\allowbreak \{1,6\},\allowbreak \{2,6\},\allowbreak \{3,6\},\allowbreak \{4,6\},\allowbreak \{5,6\}\}$;

    - **$O$:** l'ottaedro, con $V=\{1,\dots,6\}$ e tutti gli spigoli tranne $\{1,6\},\{2,5\},\{3,4\}$;

    - **$K_5$:** il grafo completo con $5$ vertici.

    L'algoritmo $PL$ per i grafi planari usa $1$ colore se non ci sono spigoli, $2$ colori se il grafo è bipartito, e altrimenti i $5$ colori del teorema di Heawood.

    **Domande**

    1. Calcolare $n$, $m$ e $3n-6$ per i tre grafi. Quali di essi possono essere planari?

    2. $W$ e $O$ sono planari (disegnarli). Trovare in ciascuno un vertice di grado al più $5$, come garantisce il lemma del capitolo.

    3. $W$ è bipartito? E $O$? Che cosa garantisce $PL$ su di essi, e quanto valgono $\chi(W)$ e $\chi(O)$ (per enumerazione)?

    4. Limitare l'errore additivo di $PL$ su $W$ e su $O$, e l'errore additivo con l'algoritmo dei quattro colori al posto di quello dei cinque colori.

??? soluzione "Soluzione"

    Usiamo i risultati (C1)–(C5) del riquadro all'inizio del capitolo.

    1. &#8203;

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>grafo</th>
        <th><span class="arithmatex">\(n\)</span></th>
        <th><span class="arithmatex">\(m\)</span></th>
        <th><span class="arithmatex">\(3n-6\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(W\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(O\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(K_5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        </tr>
        </table></div>

        Per (C4) un grafo planare ha $m\le 3n-6$: $K_5$, con $10>9$, non è planare. Il bound non esclude $W$ e $O$.

    2. In $W$ i vertici del ciclo hanno grado $3$, e in $O$ ogni vertice ha grado $4$: entrambi i valori sono al più $5$.

    3. Entrambi i grafi contengono triangoli ($\{1,2,6\}$ in $W$, $\{1,2,3\}$ in $O$), cicli dispari: nessuno dei due è bipartito, quindi $PL$ usa al più $5$ colori. L'enumerazione dà $\chi(W)=4$ (il ciclo dispari $1,\dots,5$ richiede $3$ colori e il vertice $6$ un quarto) e $\chi(O)=3$ (le classi $\{1,6\},\{2,5\},\{3,4\}$).

    4. Su $W$: $PL(I)-\chi(W)\le 5-4=1$; su $O$: $PL(I)-\chi(O)\le 5-3=2$, il bound di (C4). Con $4$ colori gli errori sono al più $0$ su $W$, dove l'algoritmo dei quattro colori è esatto, e $1$ su $O$.
