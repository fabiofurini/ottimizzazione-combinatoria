---
title: "Esercizi · Metaeuristiche"
---

# Esercizi · Metaeuristiche

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 32** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 32: Metaeuristiche](../algoritmi-euristici/metaheuristics/index.md) · [:material-file-pdf-box: Eserciziario, volume 4 (PDF)](../pdf/esercizi-4-algoritmi-euristici.pdf)

</div>

## Simulated annealing

<a id="esercizio-32-1"></a>

!!! esercizio "Esercizio 32.1: Simulated annealing 1"

    Un'istanza del TSP con $6$ città e le distanze simmetriche

    $$
    \begin{array}{c|cccccc}
    \hline {d_{ij}} & {1} & {2} & {3} & {4} & {5} & {6} \\
    \hline {1} & --- & {5} & {1} & {7} & {7} & {4} \\
    {2} & {5} & --- & {4} & {5} & {2} & {1} \\
    {3} & {1} & {4} & --- & {6} & {6} & {4} \\
    {4} & {7} & {5} & {6} & --- & {7} & {6} \\
    {5} & {7} & {2} & {6} & {7} & --- & {2} \\
    {6} & {4} & {1} & {4} & {6} & {2} & --- \\
    \hline
    \end{array}
    $$

    Le mosse 2-opt di un giro di $6$ città sono numerate

    $$
    1:(1,3), 2:(1,4), 3:(1,5), 4:(2,4), 5:(2,5), 6:(2,6), 7:(3,5), 8:(3,6), 9:(4,6)
    $$

    e i numeri casuali da usare, in questo ordine, sono $0.13$, $0.76$, $0.46$, $0.53$, $0.22$, $0.05$, $0.68$, $0.68$, $0.93$, $0.38$, $0.52$, $0.83$.

    **Domande**

    1. Calcolare il giro nearest neighbour dalla città $1$ (pareggi: indice minimo) e la sua lunghezza, e mostrare che è un ottimo locale per l'intorno 2-opt.

    2. Applicare il simulated annealing con l'intorno 2-opt a partire da questo giro, con $T_0=5$, $\alpha=0.8$, $L=2$ e $T_{\min}=3$. Quante iterazioni vengono eseguite?

    3. A ogni iterazione il primo numero casuale $u$ sceglie la mossa $1+\lfloor 9u\rfloor$ e il secondo, $v$, serve nel test di Metropolis. Mostrare ogni iterazione: mossa, $\delta$, test di accettazione, giro corrente e giro migliore.

    4. Confrontare il giro migliore trovato con quello ottimo, e spiegare quale mossa accettata ha permesso di uscire dall'ottimo locale di partenza.

??? soluzione "Soluzione"

    1. Il giro nearest neighbour è $(1,3,2,6,5,4)$, di lunghezza $22$. I suoi $9$ vicini hanno $\delta$: $(1,3)$: $+7$, $(1,4)$: $+7$, $(1,5)$: $+5$, $(2,4)$: $+0$, $(2,5)$: $+0$, $(2,6)$: $+0$, $(3,5)$: $+0$, $(3,6)$: $+1$, $(4,6)$: $+4$. Nessun $\delta$ è negativo: il giro è un ottimo locale 2-opt.

    2. Le temperature sono $5$, $4$ e $3.2$; poi $T=2.56\le 3$ ferma la ricerca: $3\cdot 2=6$ iterazioni, che usano $12$ numeri casuali.

    3. - Iterazione $1$ ($T=5$): $u=0.13$ dà la mossa $1+\lfloor 9\cdot 0.13\rfloor=2$, cioè $(1,4)$, con $\delta=7$; $v=0.76 \ge e^{-7/5}=0.2466$: rifiutata. Giro corrente $(1,3,2,6,5,4)$, lunghezza $22$, migliore $22$.

        - Iterazione $2$ ($T=5$): $u=0.46$ dà la mossa $1+\lfloor 9\cdot 0.46\rfloor=5$, cioè $(2,5)$, con $\delta=0$; $\delta\le 0$: accettata. Giro corrente $(1,3,5,6,2,4)$, lunghezza $22$, migliore $22$.

        - Iterazione $3$ ($T=4$): $u=0.22$ dà la mossa $1+\lfloor 9\cdot 0.22\rfloor=2$, cioè $(1,4)$, con $\delta=6$; $v=0.05 < e^{-6/4}=0.2231$: accettata. Giro corrente $(1,6,5,3,2,4)$, lunghezza $28$, migliore $22$.

        - Iterazione $4$ ($T=4$): $u=0.68$ dà la mossa $1+\lfloor 9\cdot 0.68\rfloor=7$, cioè $(3,5)$, con $\delta=-3$; $\delta\le 0$: accettata. Giro corrente $(1,6,5,2,3,4)$, lunghezza $25$, migliore $22$.

        - Iterazione $5$ ($T=3.2$): $u=0.93$ dà la mossa $1+\lfloor 9\cdot 0.93\rfloor=9$, cioè $(4,6)$, con $\delta=-5$; $\delta\le 0$: accettata. Giro corrente $(1,6,5,2,4,3)$, lunghezza $20$, migliore $20$.

        - Iterazione $6$ ($T=3.2$): $u=0.52$ dà la mossa $1+\lfloor 9\cdot 0.52\rfloor=5$, cioè $(2,5)$, con $\delta=4$; $v=0.83 \ge e^{-4/3.2}=0.2865$: rifiutata. Giro corrente $(1,6,5,2,4,3)$, lunghezza $20$, migliore $20$.

    4. Il giro migliore trovato è $(1,6,5,2,4,3)$ di lunghezza $20$; enumerando i $60$ giri, il giro ottimo è $(1,3,4,2,5,6)$, di lunghezza $20$: il simulated annealing trova l'ottimo. L'uscita è dovuta alle mosse accettate con $\delta\ge 0$ (iterazioni $2$, $3$), che portano la ricerca lontano dall'ottimo locale $22$, da dove mosse miglioranti raggiungono $20$.

<a id="esercizio-32-2"></a>

!!! esercizio "Esercizio 32.2: Simulated annealing 2"

    Uno zaino di capacità $c=16$ e $5$ oggetti:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\
    \hline {p_j} & {11} & {5} & {18} & {8} & {8} \\
    {w_j} & {5} & {3} & {11} & {6} & {7} \\
    \hline
    \end{array}
    $$

    Il simulated annealing con l'intorno flip massimizza

    $$
    f_\beta(x)=\sum_j p_jx_j-\beta\max\Big\{0,\sum_j w_jx_j-c\Big\},
    $$

    con $T_0=4$, $\alpha=0.8$, $L=2$, $T_{\min}=1.7$. A ogni iterazione $u$ sceglie l'oggetto $1+\lfloor 5u\rfloor$ da invertire e $v$ serve nel test di accettazione. I numeri casuali sono $0.63$, $0.11$, $0.17$, $0.66$, $0.38$, $0.94$, $0.58$, $0.59$, $0.69$, $0.67$, $0.39$, $0.62$, $0.69$, $0.07$, $0.59$, $0.42$.

    **Domande**

    1. Calcolare la soluzione $x$ dell'algoritmo greedy per efficienza, e mostrare che è un ottimo locale per l'intorno flip fra le soluzioni ammissibili.

    2. Applicare il simulated annealing da $x$ con $\beta=1$. Qual è la migliore soluzione ammissibile trovata, e dove si trova la ricerca alla fine?

    3. Applicare il simulated annealing da $x$ con $\beta=3$, con gli stessi numeri casuali. Qual è la migliore soluzione ammissibile trovata?

    4. Spiegare il diverso comportamento con i due valori di $\beta$, e confrontare con il valore ottimo.

??? soluzione "Soluzione"

    1. Le efficienze sono $\frac{11}{5}$, $\frac{5}{3}$, $\frac{18}{11}$, $\frac{8}{6}$, $\frac{8}{7}$, già in ordine non crescente. Il greedy seleziona gli oggetti $1$, $2$ ($rc=8$), salta l'oggetto $3$ ($w_3=11$), seleziona l'oggetto $4$ ($rc=2$) e salta l'oggetto $5$: $x=(1,1,0,1,0)$, peso $14$, profitto $24$. I flip ammissibili possono solo togliere oggetti (aggiungere l'oggetto $3$ o $5$ supera la capacità), quindi ogni vicino ammissibile ha profitto minore: $x$ è un ottimo locale.

    2. Con $\beta=1$ le $8$ iterazioni ($T=4,4,3.2,3.2,2.56,2.56,2.048,2.048$) sono:

        - Iterazione $1$ ($T=4$): $u=0.63$ inverte l'oggetto $4$: $y=(1,1,0,0,0)$, peso $8$, profitto $16$, $f(y)=16$, $\delta=8$; $v=0.11 < e^{-8/4}=0.1353$: accettata. Miglior profitto ammissibile: $24$.

        - Iterazione $2$ ($T=4$): $u=0.17$ inverte l'oggetto $1$: $y=(0,1,0,0,0)$, peso $3$, profitto $5$, $f(y)=5$, $\delta=11$; $v=0.66 \ge e^{-11/4}=0.0639$: rifiutata. Miglior profitto ammissibile: $24$.

        - Iterazione $3$ ($T=3.2$): $u=0.38$ inverte l'oggetto $2$: $y=(1,0,0,0,0)$, peso $5$, profitto $11$, $f(y)=11$, $\delta=5$; $v=0.94 \ge e^{-5/3.2}=0.2096$: rifiutata. Miglior profitto ammissibile: $24$.

        - Iterazione $4$ ($T=3.2$): $u=0.58$ inverte l'oggetto $3$: $y=(1,1,1,0,0)$, peso $19$, profitto $34$, $f(y)=31$, $\delta=-15$; $\delta\le 0$: accettata. Miglior profitto ammissibile: $24$.

        - Iterazione $5$ ($T=2.56$): $u=0.69$ inverte l'oggetto $4$: $y=(1,1,1,1,0)$, peso $25$, profitto $42$, $f(y)=33$, $\delta=-2$; $\delta\le 0$: accettata. Miglior profitto ammissibile: $24$.

        - Iterazione $6$ ($T=2.56$): $u=0.39$ inverte l'oggetto $2$: $y=(1,0,1,1,0)$, peso $22$, profitto $37$, $f(y)=31$, $\delta=2$; $v=0.62 \ge e^{-2/2.56}=0.4578$: rifiutata. Miglior profitto ammissibile: $24$.

        - Iterazione $7$ ($T=2.048$): $u=0.69$ inverte l'oggetto $4$: $y=(1,1,1,0,0)$, peso $19$, profitto $34$, $f(y)=31$, $\delta=2$; $v=0.07 < e^{-2/2.048}=0.3766$: accettata. Miglior profitto ammissibile: $24$.

        - Iterazione $8$ ($T=2.048$): $u=0.59$ inverte l'oggetto $3$: $y=(1,1,0,0,0)$, peso $8$, profitto $16$, $f(y)=16$, $\delta=15$; $v=0.42 \ge e^{-15/2.048}=0.0007$: rifiutata. Miglior profitto ammissibile: $24$.

        Il miglior profitto ammissibile resta $24$, e alla fine la soluzione corrente è $(1,1,1,0,0)$, di peso $19>16$: la ricerca termina nella regione inammissibile.

    3. Con $\beta=3$:

        - Iterazione $1$ ($T=4$): $u=0.63$ inverte l'oggetto $4$: $y=(1,1,0,0,0)$, peso $8$, profitto $16$, $f(y)=16$, $\delta=8$; $v=0.11 < e^{-8/4}=0.1353$: accettata. Miglior profitto ammissibile: $24$.

        - Iterazione $2$ ($T=4$): $u=0.17$ inverte l'oggetto $1$: $y=(0,1,0,0,0)$, peso $3$, profitto $5$, $f(y)=5$, $\delta=11$; $v=0.66 \ge e^{-11/4}=0.0639$: rifiutata. Miglior profitto ammissibile: $24$.

        - Iterazione $3$ ($T=3.2$): $u=0.38$ inverte l'oggetto $2$: $y=(1,0,0,0,0)$, peso $5$, profitto $11$, $f(y)=11$, $\delta=5$; $v=0.94 \ge e^{-5/3.2}=0.2096$: rifiutata. Miglior profitto ammissibile: $24$.

        - Iterazione $4$ ($T=3.2$): $u=0.58$ inverte l'oggetto $3$: $y=(1,1,1,0,0)$, peso $19$, profitto $34$, $f(y)=25$, $\delta=-9$; $\delta\le 0$: accettata. Miglior profitto ammissibile: $24$.

        - Iterazione $5$ ($T=2.56$): $u=0.69$ inverte l'oggetto $4$: $y=(1,1,1,1,0)$, peso $25$, profitto $42$, $f(y)=15$, $\delta=10$; $v=0.67 \ge e^{-10/2.56}=0.0201$: rifiutata. Miglior profitto ammissibile: $24$.

        - Iterazione $6$ ($T=2.56$): $u=0.39$ inverte l'oggetto $2$: $y=(1,0,1,0,0)$, peso $16$, profitto $29$, $f(y)=29$, $\delta=-4$; $\delta\le 0$: accettata. Miglior profitto ammissibile: $29$.

        - Iterazione $7$ ($T=2.048$): $u=0.69$ inverte l'oggetto $4$: $y=(1,0,1,1,0)$, peso $22$, profitto $37$, $f(y)=19$, $\delta=10$; $v=0.07 \ge e^{-10/2.048}=0.0076$: rifiutata. Miglior profitto ammissibile: $29$.

        - Iterazione $8$ ($T=2.048$): $u=0.59$ inverte l'oggetto $3$: $y=(1,0,0,0,0)$, peso $5$, profitto $11$, $f(y)=11$, $\delta=18$; $v=0.42 \ge e^{-18/2.048}=0.0002$: rifiutata. Miglior profitto ammissibile: $29$.

        La migliore soluzione ammissibile è $(1,0,1,0,0)$, di profitto $29$.

    4. Con $\beta=1$ un peso in eccesso costa solo $1$ per unità, e le soluzioni inammissibili che contengono l'oggetto $3$ hanno un valore penalizzato grande (per esempio $f_1(1,1,1,1,0)=42-9=33$): la ricerca resta nella regione inammissibile e non torna mai a una soluzione ammissibile migliore. Con $\beta=3$ le soluzioni inammissibili sono solo un ponte: la ricerca le attraversa e raggiunge $\{1,3\}$, di profitto $29$, che è ottimo (per enumerazione). Il coefficiente di penalità deve essere abbastanza grande da rendere le soluzioni inammissibili meno attraenti di quelle ammissibili buone.

<a id="esercizio-32-3"></a>

!!! esercizio "Esercizio 32.3: Simulated annealing 3"

    Un'istanza del TSP con $6$ città e le distanze simmetriche

    $$
    \begin{array}{c|cccccc}
    \hline {d_{ij}} & {1} & {2} & {3} & {4} & {5} & {6} \\
    \hline {1} & --- & {5} & {1} & {7} & {7} & {4} \\
    {2} & {5} & --- & {4} & {5} & {2} & {1} \\
    {3} & {1} & {4} & --- & {6} & {6} & {4} \\
    {4} & {7} & {5} & {6} & --- & {7} & {6} \\
    {5} & {7} & {2} & {6} & {7} & --- & {2} \\
    {6} & {4} & {1} & {4} & {6} & {2} & --- \\
    \hline
    \end{array}
    $$

    Il giro di partenza è il giro nearest neighbour $(1,3,2,6,5,4)$, di lunghezza $22$, un ottimo locale 2-opt. Le mosse 2-opt sono numerate

    $$
    1:(1,3), 2:(1,4), 3:(1,5), 4:(2,4), 5:(2,5), 6:(2,6), 7:(3,5), 8:(3,6), 9:(4,6)
    $$

    e i numeri casuali da usare sono $0.13$, $0.76$, $0.46$, $0.53$, $0.22$, $0.05$, $0.68$, $0.68$, $0.93$, $0.38$, $0.52$, $0.83$.

    **Domande**

    1. Calcolare la probabilità di accettazione $e^{-\delta/T}$ di un peggioramento $\delta=6$ a $T=5$ e a $T=0.5$.

    2. Con lo schema geometrico, quante temperature si usano con $T_0=0.5$, $\alpha=0.8$, $T_{\min}=0.3$? E con $T_0=5$, $\alpha=0.95$, $T_{\min}=0.5$?

    3. Applicare il simulated annealing con $T_0=0.5$, $\alpha=0.8$, $L=2$, $T_{\min}=0.3$ (mossa $1+\lfloor 9u\rfloor$, test di Metropolis con $v$). Mostrare ogni iterazione.

    4. Gli stessi numeri casuali con $T_0=5$, $T_{\min}=3$ portano al giro ottimo di lunghezza $20$. Spiegare perché l'esecuzione a bassa temperatura non ci arriva.

??? soluzione "Soluzione"

    1. $e^{-6/5}=0.3012$ e $e^{-6/0.5}=e^{-12}=0.000006$: a bassa temperatura un peggioramento di $6$ non è praticamente mai accettato.

    2. Con $T_0=0.5$: $0.5$, $0.4$, $0.32$ sono maggiori di $0.3$, e $0.256$ no: $3$ temperature, $6$ iterazioni con $L=2$. Con $T_0=5$, $\alpha=0.95$: il più piccolo $K$ con $5\cdot 0.95^K\le 0.5$ è $K=\lceil \ln(0.1)/\ln(0.95)\rceil=45$ temperature.

    3. - Iterazione $1$ ($T=0.5$): $u=0.13$ dà la mossa $1+\lfloor 9\cdot 0.13\rfloor=2$, cioè $(1,4)$, con $\delta=7$; $v=0.76 \ge e^{-7/0.5}=0.0000$: rifiutata. Giro corrente $(1,3,2,6,5,4)$, lunghezza $22$, migliore $22$.

        - Iterazione $2$ ($T=0.5$): $u=0.46$ dà la mossa $1+\lfloor 9\cdot 0.46\rfloor=5$, cioè $(2,5)$, con $\delta=0$; $\delta\le 0$: accettata. Giro corrente $(1,3,5,6,2,4)$, lunghezza $22$, migliore $22$.

        - Iterazione $3$ ($T=0.4$): $u=0.22$ dà la mossa $1+\lfloor 9\cdot 0.22\rfloor=2$, cioè $(1,4)$, con $\delta=6$; $v=0.05 \ge e^{-6/0.4}=0.0000$: rifiutata. Giro corrente $(1,3,5,6,2,4)$, lunghezza $22$, migliore $22$.

        - Iterazione $4$ ($T=0.4$): $u=0.68$ dà la mossa $1+\lfloor 9\cdot 0.68\rfloor=7$, cioè $(3,5)$, con $\delta=1$; $v=0.68 \ge e^{-1/0.4}=0.0821$: rifiutata. Giro corrente $(1,3,5,6,2,4)$, lunghezza $22$, migliore $22$.

        - Iterazione $5$ ($T=0.32$): $u=0.93$ dà la mossa $1+\lfloor 9\cdot 0.93\rfloor=9$, cioè $(4,6)$, con $\delta=3$; $v=0.38 \ge e^{-3/0.32}=0.0001$: rifiutata. Giro corrente $(1,3,5,6,2,4)$, lunghezza $22$, migliore $22$.

        - Iterazione $6$ ($T=0.32$): $u=0.52$ dà la mossa $1+\lfloor 9\cdot 0.52\rfloor=5$, cioè $(2,5)$, con $\delta=0$; $\delta\le 0$: accettata. Giro corrente $(1,3,2,6,5,4)$, lunghezza $22$, migliore $22$.

    4. A $T\le 0.5$ le mosse peggioranti del giro di partenza ($\delta\ge 1$) sono accettate con probabilità al più $e^{-2}\approx 0.14$, e con questi numeri casuali sono tutte rifiutate: sono accettate solo le mosse con $\delta=0$, e la ricerca resta su giri di lunghezza $22$. Il simulated annealing a bassa temperatura è una ricerca locale: non può lasciare la valle dell'ottimo locale di partenza. Con $T_0=5$ la mossa peggiorante dell'iterazione $3$ ($\delta=6$) è accettata, e la ricerca raggiunge l'ottimo.

## Tabu search

<a id="esercizio-32-4"></a>

!!! esercizio "Esercizio 32.4: Tabu search 1"

    $m=2$ macchine identiche e $5$ lavori con tempi di esecuzione $t=(3,3,2,2,2)$. La tabu search usa l'intorno move, confronta le soluzioni in modo lessicografico secondo $(C_{\max},\sum_h L_h^2)$, vieta per $tenure$ iterazioni di riportare un lavoro sulla macchina che ha appena lasciato (aspirazione: una mossa tabu è ammessa se dà un makespan minore del migliore), e si ferma quando $C_{\max}$ è uguale al lower bound. Pareggi fra mosse: lavoro di indice minimo, poi macchina di indice minimo.

    **Domande**

    1. Calcolare la soluzione LPT e il lower bound $LB=\max\{\max_jt_j,\lceil\sum_jt_j/m\rceil\}$.

    2. Mostrare che la soluzione LPT è un ottimo locale per l'intorno move.

    3. Applicare la tabu search con $tenure=3$ dalla soluzione LPT, mostrando a ogni iterazione la valutazione dei vicini, la mossa eseguita e la lista tabu.

    4. La soluzione finale è ottima? A quale iterazione la ricerca accetta una soluzione peggiore, e perché?

??? soluzione "Soluzione"

    1. LPT assegna i lavori $1,2$ (tempo $3$) a $M_1$ e $M_2$, poi il lavoro $3$ a $M_1$ ($5$), il lavoro $4$ a $M_2$ ($5$), il lavoro $5$ a $M_1$ ($7$): $J_1=\{1,3,5\}$, $J_2=\{2,4\}$, carichi $(7,5)$, $C_{\max}=7$. $LB=\max\{3,\lceil 12/2\rceil\}=6$.

    2. I vicini sono: lavoro $1\to M_2$: $(8,80)$, lavoro $2\to M_1$: $(10,104)$, lavoro $3\to M_2$: $(7,74)$, lavoro $4\to M_1$: $(9,90)$, lavoro $5\to M_2$: $(7,74)$. Nessun vicino ha makespan minore di $7$, né makespan $7$ e $\sum_hL_h^2<74$: la soluzione LPT è un ottimo locale.

    3. - Iterazione $1$. Vicini $(C_{\max},\sum_hL_h^2)$: $1\to M_2$: $(8,80)$, $2\to M_1$: $(10,104)$, $3\to M_2$: $(7,74)$, $4\to M_1$: $(9,90)$, $5\to M_2$: $(7,74)$. Spostamento del lavoro $3$ da $M_1$ a $M_2$: carichi $(5,7)$, $C_{\max}=7$; l'attributo $(3,M_1)$ è tabu fino all'iterazione $4$; makespan migliore $7$.

        - Iterazione $2$. Vicini $(C_{\max},\sum_hL_h^2)$: $1\to M_2$: $(10,104)$, $2\to M_1$: $(8,80)$, $3\to M_1$: $(7,74)$ tabu, $4\to M_1$: $(7,74)$, $5\to M_2$: $(9,90)$. Spostamento del lavoro $4$ da $M_2$ a $M_1$: carichi $(7,5)$, $C_{\max}=7$; l'attributo $(4,M_2)$ è tabu fino all'iterazione $5$; makespan migliore $7$.

        - Iterazione $3$. Vicini $(C_{\max},\sum_hL_h^2)$: $1\to M_2$: $(8,80)$, $2\to M_1$: $(10,104)$, $3\to M_1$: $(9,90)$ tabu, $4\to M_2$: $(7,74)$ tabu, $5\to M_2$: $(7,74)$. Spostamento del lavoro $5$ da $M_1$ a $M_2$: carichi $(5,7)$, $C_{\max}=7$; l'attributo $(5,M_1)$ è tabu fino all'iterazione $6$; makespan migliore $7$.

        - Iterazione $4$. Vicini $(C_{\max},\sum_hL_h^2)$: $1\to M_2$: $(10,104)$, $2\to M_1$: $(8,80)$, $3\to M_1$: $(7,74)$ tabu, $4\to M_2$: $(9,90)$ tabu, $5\to M_1$: $(7,74)$ tabu. Spostamento del lavoro $2$ da $M_2$ a $M_1$: carichi $(8,4)$, $C_{\max}=8$; l'attributo $(2,M_2)$ è tabu fino all'iterazione $7$; makespan migliore $7$.

        - Iterazione $5$. Vicini $(C_{\max},\sum_hL_h^2)$: $1\to M_2$: $(7,74)$, $2\to M_2$: $(7,74)$ tabu, $3\to M_1$: $(10,104)$, $4\to M_2$: $(6,72)$ tabu, $5\to M_1$: $(10,104)$ tabu. Spostamento del lavoro $4$ da $M_1$ a $M_2$: carichi $(6,6)$, $C_{\max}=6$; l'attributo $(4,M_1)$ è tabu fino all'iterazione $8$; makespan migliore $6$.

    4. All'iterazione $5$ il makespan raggiunge $LB=6$: la soluzione $J_1=\{1,2\}$, $J_2=\{3,4,5\}$ è ottima e la ricerca si ferma. La ricerca accetta soluzioni peggiori (nell'ordine lessicografico) all'iterazione $4$, perché il miglior vicino non tabu è peggiore della soluzione corrente: è così che la tabu search lascia il plateau di makespan $7$.

<a id="esercizio-32-5"></a>

!!! esercizio "Esercizio 32.5: Tabu search 2"

    $m=2$ macchine identiche e $5$ lavori con tempi di esecuzione $t=(3,3,2,2,2)$. La soluzione di partenza è la soluzione LPT $J_1=\{1,3,5\}$, $J_2=\{2,4\}$. La tabu search usa l'intorno move e il confronto lessicografico secondo $(C_{\max},\sum_hL_h^2)$; dopo aver spostato il lavoro $j$ dalla macchina $h$, l'attributo $(j,h)$ è tabu per $tenure$ iterazioni. Pareggi: lavoro di indice minimo, poi macchina di indice minimo.

    **Domande**

    1. Applicare $4$ iterazioni della tabu search con $tenure=0$ (senza memoria). Che cosa succede?

    2. Applicare $6$ iterazioni con $tenure=1$. Che cosa succede?

    3. Spiegare perché liste tabu corte non impediscono alla ricerca di ciclare su questa istanza.

    4. La stessa ricerca con $tenure=3$ raggiunge l'ottimo $6$ in $5$ iterazioni. Qual è il ruolo della lista tabu, e che cosa può andare storto con una lista tabu troppo lunga?

??? soluzione "Soluzione"

    1. - Iterazione $1$: lavoro $3$ da $M_1$ a $M_2$, carichi $(5,7)$.

        - Iterazione $2$: lavoro $3$ da $M_2$ a $M_1$, carichi $(7,5)$.

        - Iterazione $3$: lavoro $3$ da $M_1$ a $M_2$, carichi $(5,7)$.

        - Iterazione $4$: lavoro $3$ da $M_2$ a $M_1$, carichi $(7,5)$.

        La ricerca sposta il lavoro $3$ avanti e indietro: cicla fra due soluzioni di makespan $7$.

    2. - Iterazione $1$: lavoro $3$ da $M_1$ a $M_2$, carichi $(5,7)$.

        - Iterazione $2$: lavoro $4$ da $M_2$ a $M_1$, carichi $(7,5)$.

        - Iterazione $3$: lavoro $5$ da $M_1$ a $M_2$, carichi $(5,7)$.

        - Iterazione $4$: lavoro $3$ da $M_2$ a $M_1$, carichi $(7,5)$.

        - Iterazione $5$: lavoro $4$ da $M_1$ a $M_2$, carichi $(5,7)$.

        - Iterazione $6$: lavoro $5$ da $M_2$ a $M_1$, carichi $(7,5)$.

        La ricerca visita ancora solo soluzioni di makespan $7$, e ripete la stessa sequenza di mosse: un ciclo più lungo.

    3. Tutti i vicini con makespan $7$ spostano un lavoro di tempo $2$ fra le macchine. Con $tenure\le 2$ l'attributo appena creato scade prima che la ricerca si sia spostata abbastanza lontano, e la migliore mossa non tabu la riporta a una soluzione già visitata: il ciclo è più lungo della memoria.

    4. La lista tabu vieta di annullare le mosse recenti, così che la ricerca è costretta a fare mosse peggioranti e a lasciare il plateau (con $tenure=3$ le mosse peggioranti portano all'ottimo). Una lista tabu troppo lunga vieta troppe mosse, magari quelle buone; al limite, tutte le mosse sono tabu e la ricerca è guidata solo dal criterio di aspirazione. La durata tabu va calibrata.

<a id="esercizio-32-6"></a>

!!! esercizio "Esercizio 32.6: Tabu search 3"

    Un'istanza del TSP con $6$ città e le distanze simmetriche

    $$
    \begin{array}{c|cccccc}
    \hline {d_{ij}} & {1} & {2} & {3} & {4} & {5} & {6} \\
    \hline {1} & --- & {5} & {1} & {7} & {7} & {4} \\
    {2} & {5} & --- & {4} & {5} & {2} & {1} \\
    {3} & {1} & {4} & --- & {6} & {6} & {4} \\
    {4} & {7} & {5} & {6} & --- & {7} & {6} \\
    {5} & {7} & {2} & {6} & {7} & --- & {2} \\
    {6} & {4} & {1} & {4} & {6} & {2} & --- \\
    \hline
    \end{array}
    $$

    Tabu search con l'intorno 2-opt: a ogni iterazione si valutano tutte le mosse $(i,j)$, e si esegue la migliore mossa non tabu anche se non è migliorante (pareggi: prima mossa in ordine lessicografico). I due lati tolti da una mossa non possono essere rimessi per $tenure=2$ iterazioni, a meno che il nuovo giro non sia più corto del migliore.

    **Domande**

    1. Calcolare il giro nearest neighbour $\sigma$ dalla città $1$ e mostrare che è un ottimo locale per 2-opt.

    2. Eseguire la prima iterazione della tabu search da $\sigma$: quale mossa viene scelta, e quali lati diventano tabu?

    3. Eseguire la seconda e la terza iterazione.

    4. Confrontare il giro migliore trovato con l'ottimo locale della prima domanda.

??? soluzione "Soluzione"

    1. $\sigma=(1,3,2,6,5,4)$, di lunghezza $22$; le variazioni di lunghezza dei suoi vicini sono $(1,3)$: $+7$, $(1,4)$: $+7$, $(1,5)$: $+5$, $(2,4)$: $+0$, $(2,5)$: $+0$, $(2,6)$: $+0$, $(3,5)$: $+0$, $(3,6)$: $+1$, $(4,6)$: $+4$: nessuno è negativo, quindi $\sigma$ è un ottimo locale 2-opt.

    2. Da $(1,3,2,6,5,4)$ i vicini hanno $\delta$: $(1,3)$: $+7$, $(1,4)$: $+7$, $(1,5)$: $+5$, $(2,4)$: $+0$, $(2,5)$: $+0$, $(2,6)$: $+0$, $(3,5)$: $+0$, $(3,6)$: $+1$, $(4,6)$: $+4$. La migliore mossa non tabu è $(2,4)$ con $\delta=0$: toglie i lati $(3,2)$, $(6,5)$, che diventano tabu fino all'iterazione $3$; nuovo giro $(1,3,6,2,5,4)$ di lunghezza $22$. La ricerca si sposta anche se nessuna mossa migliora: lascia l'ottimo locale passando per un giro della stessa lunghezza.

    3. - Da $(1,3,6,2,5,4)$ i vicini hanno $\delta$: $(1,3)$: $+6$, $(1,4)$: $+8$, $(1,5)$: $+5$, $(2,4)$: $+0$, $(2,5)$: $+1$, $(2,6)$: $-1$, $(3,5)$: $-1$, $(3,6)$: $+3$, $(4,6)$: $+3$. La migliore mossa non tabu è $(2,6)$ con $\delta=-1$: toglie i lati $(3,6)$, $(4,1)$, che diventano tabu fino all'iterazione $4$; nuovo giro $(1,3,4,5,2,6)$ di lunghezza $21$.

        - Da $(1,3,4,5,2,6)$ i vicini hanno $\delta$: $(1,3)$: $+5$, $(1,4)$: $+8$, $(1,5)$: $+7$, $(2,4)$: $+3$, $(2,5)$: $+3$, $(2,6)$: $+1$, $(3,5)$: $-1$, $(3,6)$: $+2$, $(4,6)$: $+1$. La migliore mossa non tabu è $(3,5)$ con $\delta=-1$: toglie i lati $(4,5)$, $(2,6)$, che diventano tabu fino all'iterazione $5$; nuovo giro $(1,3,4,2,5,6)$ di lunghezza $20$.

    4. Dopo $3$ iterazioni il giro migliore è $(1,3,4,2,5,6)$, di lunghezza $20$: è il giro ottimo (enumerando i $60$ giri), migliore dell'ottimo locale $22$ in cui si ferma la ricerca locale 2-opt.

## Iterated local search e VNS

<a id="esercizio-32-7"></a>

!!! esercizio "Esercizio 32.7: Iterated local search e VNS 1"

    Un'istanza del TSP con $6$ città e le distanze simmetriche

    $$
    \begin{array}{c|cccccc}
    \hline {d_{ij}} & {1} & {2} & {3} & {4} & {5} & {6} \\
    \hline {1} & --- & {5} & {1} & {7} & {7} & {4} \\
    {2} & {5} & --- & {4} & {5} & {2} & {1} \\
    {3} & {1} & {4} & --- & {6} & {6} & {4} \\
    {4} & {7} & {5} & {6} & --- & {7} & {6} \\
    {5} & {7} & {2} & {6} & {7} & --- & {2} \\
    {6} & {4} & {1} & {4} & {6} & {2} & --- \\
    \hline
    \end{array}
    $$

    L'ottimo locale 2-opt è il giro nearest neighbour $(1,3,2,6,5,4)$ di lunghezza $22$. L'iterated local search usa il kick double bridge con posizioni di taglio $p_1=1+\lfloor u_1(n-3)\rfloor$, $p_2=p_1+1+\lfloor u_2(n-2-p_1)\rfloor$, $p_3=p_2+1+\lfloor u_3(n-1-p_2)\rfloor$ ($A=\sigma_1..\sigma_{p_1}$, $B=\sigma_{p_1+1}..\sigma_{p_2}$, $C=\sigma_{p_2+1}..\sigma_{p_3}$, $D=\sigma_{p_3+1}..\sigma_n$, nuovo giro $A\,C\,B\,D$), la ricerca locale 2-opt con best improvement, e accetta un nuovo ottimo locale se è più corto. I numeri casuali sono $0.13$, $0.76$, $0.46$.

    **Domande**

    1. Calcolare le posizioni di taglio $p_1,p_2,p_3$ e i quattro segmenti del giro.

    2. Costruire il giro perturbato, elencare i lati tolti e aggiunti, e calcolarne la lunghezza.

    3. Applicare la ricerca locale 2-opt (best improvement) al giro perturbato.

    4. Il nuovo ottimo locale viene accettato? Confrontarlo con il giro ottimo, di lunghezza $20$.

??? soluzione "Soluzione"

    1. $p_1=1+\lfloor 0.13\cdot 3\rfloor=1$, $p_2=1+1+\lfloor 0.76\cdot 3\rfloor=4$, $p_3=4+1+\lfloor 0.46\cdot 1\rfloor=5$. Segmenti $A=(1)$, $B=(3,2,6)$, $C=(5)$, $D=(4)$.

    2. Il giro perturbato $A\,C\,B\,D$ è $(1,5,3,2,6,4)$; toglie i lati $(4,5)$, $(5,6)$, $(1,3)$ e aggiunge $(1,5)$, $(4,6)$, $(3,5)$; la sua lunghezza è $31$.

    3. Da $(1,5,3,2,6,4)$: la mossa migliore è $(1,3)$ con $\delta=-8$, che dà $(1,3,5,2,6,4)$ di lunghezza $23$; la mossa migliore è $(2,4)$ con $\delta=-1$, che dà $(1,3,2,5,6,4)$ di lunghezza $22$; la mossa migliore è $(2,5)$ con $\delta=-1$, che dà $(1,3,6,5,2,4)$ di lunghezza $21$; la mossa migliore è $(2,6)$ con $\delta=-1$, che dà $(1,3,4,2,5,6)$ di lunghezza $20$; poi nessuna mossa migliora il giro. Il nuovo ottimo locale è $(1,3,4,2,5,6)$, di lunghezza $20$.

    4. Sì: $20<22$, il nuovo ottimo locale sostituisce quello corrente. La sua lunghezza è $20$: è il giro ottimo. Un kick e una ricerca locale sono bastati a uscire dall'ottimo locale in cui si ferma la sola ricerca locale 2-opt.

<a id="esercizio-32-8"></a>

!!! esercizio "Esercizio 32.8: Iterated local search e VNS 2"

    Un'istanza del TSP con $6$ città e le distanze simmetriche

    $$
    \begin{array}{c|cccccc}
    \hline {d_{ij}} & {1} & {2} & {3} & {4} & {5} & {6} \\
    \hline {1} & --- & {5} & {1} & {7} & {7} & {4} \\
    {2} & {5} & --- & {4} & {5} & {2} & {1} \\
    {3} & {1} & {4} & --- & {6} & {6} & {4} \\
    {4} & {7} & {5} & {6} & --- & {7} & {6} \\
    {5} & {7} & {2} & {6} & {7} & --- & {2} \\
    {6} & {4} & {1} & {4} & {6} & {2} & --- \\
    \hline
    \end{array}
    $$

    L'ottimo locale 2-opt è il giro nearest neighbour $(1,3,2,6,5,4)$ di lunghezza $22$. L'iterated local search usa il kick double bridge con posizioni di taglio $p_1=1+\lfloor u_1(n-3)\rfloor$, $p_2=p_1+1+\lfloor u_2(n-2-p_1)\rfloor$, $p_3=p_2+1+\lfloor u_3(n-1-p_2)\rfloor$ ($A=\sigma_1..\sigma_{p_1}$, $B=\sigma_{p_1+1}..\sigma_{p_2}$, $C=\sigma_{p_2+1}..\sigma_{p_3}$, $D=\sigma_{p_3+1}..\sigma_n$, nuovo giro $A\,C\,B\,D$), la ricerca locale 2-opt con best improvement, e accetta un nuovo ottimo locale se è più corto. I numeri casuali sono $0.16$, $0.13$, $0.01$.

    **Domande**

    1. Calcolare le posizioni di taglio $p_1,p_2,p_3$ e i quattro segmenti del giro.

    2. Costruire il giro perturbato, elencare i lati tolti e aggiunti, e calcolarne la lunghezza.

    3. Applicare la ricerca locale 2-opt (best improvement) al giro perturbato.

    4. Il nuovo ottimo locale viene accettato? Che cosa succederebbe con il criterio di accettazione «accettare sempre»?

??? soluzione "Soluzione"

    1. $p_1=1+\lfloor 0.16\cdot 3\rfloor=1$, $p_2=1+1+\lfloor 0.13\cdot 3\rfloor=2$, $p_3=2+1+\lfloor 0.01\cdot 3\rfloor=3$. Segmenti $A=(1)$, $B=(3)$, $C=(2)$, $D=(6,5,4)$.

    2. Il giro perturbato $A\,C\,B\,D$ è $(1,2,3,6,5,4)$; toglie i lati $(1,3)$, $(2,6)$ e aggiunge $(3,6)$, $(1,2)$; la sua lunghezza è $29$.

    3. Da $(1,2,3,6,5,4)$: la mossa migliore è $(1,3)$ con $\delta=-7$, che dà $(1,3,2,6,5,4)$ di lunghezza $22$; poi nessuna mossa migliora il giro. Il nuovo ottimo locale è $(1,3,2,6,5,4)$, di lunghezza $22$.

    4. Il nuovo ottimo locale è il giro di partenza stesso, di lunghezza $22$: non è più corto, e la soluzione corrente non cambia. Il kick era troppo debole: con segmenti $B$ e $C$ di una sola città cambia solo due lati, il che è una mossa 2-opt, e la ricerca locale 2-opt lo annulla subito. Con «accettare sempre» non cambierebbe niente comunque; il problema qui è l'intensità del kick, non il criterio di accettazione.

<a id="esercizio-32-9"></a>

!!! esercizio "Esercizio 32.9: Iterated local search e VNS 3"

    $m=3$ macchine identiche e $7$ lavori con tempi di esecuzione $t=(4,4,3,3,2,2,2)$. La variable neighbourhood search parte dalla soluzione LPT, usa $k_{\max}=3$, esegue lo shaking con $k$ spostamenti casuali (ogni spostamento: il lavoro $j=1+\lfloor 7u\rfloor$ va sulla $g$-esima macchina diversa dalla sua, $g=1+\lfloor 2u\rfloor$, con due numeri casuali consecutivi), usa come ricerca locale la discesa move con best improvement nell'ordine lessicografico $(C_{\max},\sum_hL_h^2)$, e si ferma quando $C_{\max}=LB$. I numeri casuali sono $0.26$, $0.51$, $0.92$, $0.07$, $0.44$, $0.09$, $0.36$, $0.36$, $0.87$, $0.77$, $0.04$, $0.66$.

    **Domande**

    1. Calcolare la soluzione LPT e il lower bound $LB$, e mostrare che LPT è un ottimo locale per l'intorno move.

    2. Spiegare perché lo swap di due lavori appartiene all'intorno $N_2$ usato dallo shaking.

    3. Applicare la VNS, mostrando per ogni iterazione lo shaking, la ricerca locale e la decisione.

    4. La soluzione finale è ottima? Quale valore di $k$ è stato necessario?

??? soluzione "Soluzione"

    1. LPT assegna i lavori per tempo non crescente alla macchina meno carica: carichi $(8,6,6)$, $J_1=\{1,5,7\}$, $J_2=\{2,6\}$, $J_3=\{3,4\}$, $C_{\max}=8$; $LB=\max\{4,\lceil 20/3\rceil\}=7$. Un lavoro spostato su una macchina di carico $6$ la porta ad almeno $8$, e un lavoro spostato su $M_1$ la porta sopra $8$: nessuno spostamento diminuisce il makespan, e gli spostamenti con makespan $8$ (per esempio il lavoro $5$ da $M_1$ a $M_2$, carichi $(6,8,6)$) hanno $\sum_hL_h^2\ge 136$, il valore di LPT. LPT è un ottimo locale.

    2. Scambiare il lavoro $j$ su $M_a$ con il lavoro $j'$ su $M_b$ equivale a due spostamenti: $j$ su $M_b$ e $j'$ su $M_a$. Quindi ogni vicino swap è in $N_2$, e lo shaking con $k=2$ può produrlo.

    3. - Iterazione $1$, $k=1$: shaking lavoro $2$: $M_2\to M_3$, carichi $(8,2,10)$; MoveDescent: lavoro $2$ da $M_3$ a $M_2$, carichi $(8,6,6)$; risultato carichi $(8,6,6)$, non migliore ($k:=k+1$).

        - Iterazione $2$, $k=2$: shaking lavoro $7$: $M_1\to M_2$; lavoro $4$: $M_3\to M_1$, carichi $(9,8,3)$; MoveDescent: lavoro $4$ da $M_1$ a $M_3$, carichi $(6,8,6)$; risultato carichi $(6,8,6)$, non migliore ($k:=k+1$).

        - Iterazione $3$, $k=3$: shaking lavoro $3$: $M_3\to M_1$; lavoro $7$: $M_1\to M_3$; lavoro $1$: $M_1\to M_3$, carichi $(5,6,9)$; MoveDescent: lavoro $7$ da $M_3$ a $M_1$, carichi $(7,6,7)$; risultato carichi $(7,6,7)$, migliore, accettato ($k:=1$).

    4. Il makespan finale è $7=LB$: la soluzione è ottima. Gli intorni $N_1$ e $N_2$ hanno fallito, ed è stato necessario $N_3$ (tre spostamenti casuali).

## GRASP

<a id="esercizio-32-10"></a>

!!! esercizio "Esercizio 32.10: GRASP 1"

    Uno zaino di capacità $c=16$ e $5$ oggetti:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\
    \hline {p_j} & {11} & {5} & {18} & {8} & {8} \\
    {w_j} & {5} & {3} & {11} & {6} & {7} \\
    \hline
    \end{array}
    $$

    GRASP con $\alpha=0.5$: la RCL contiene gli oggetti che entrano con efficienza almeno $e_{\max}-\alpha(e_{\max}-e_{\min})$, ordinati per efficienza non crescente, e si sceglie l'oggetto in posizione $1+\lfloor u|RCL|\rfloor$; la ricerca locale usa flip e swap ammissibili con best improvement. I numeri casuali sono $0.39$, $0.27$, $0.38$, $0.60$, $0.66$.

    **Domande**

    1. Calcolare la soluzione greedy per efficienza e la soluzione della ricerca locale avviata da essa.

    2. Eseguire la prima iterazione della GRASP: costruzione e ricerca locale.

    3. Eseguire la seconda iterazione.

    4. Confrontare la migliore soluzione della GRASP con l'ottimo, e spiegare il ruolo della randomizzazione.

??? soluzione "Soluzione"

    1. Il greedy dà $(1,1,0,1,0)$ di profitto $24$ (oggetti $1,2,4$, peso $14$); la ricerca locale non trova flip o swap miglioranti: si ferma a $24$.

    2. - Iterazione $1$: $rc=16$, candidati $\{1,2,3,4,5\}$, soglia $1.6714$, $RCL=(1)$, $u=0.39$ sceglie la posizione $1$: oggetto $1$; $rc=11$, candidati $\{2,3,4,5\}$, soglia $1.4048$, $RCL=(2,3)$, $u=0.27$ sceglie la posizione $1$: oggetto $2$; $rc=8$, candidati $\{4,5\}$, soglia $1.2381$, $RCL=(4)$, $u=0.38$ sceglie la posizione $1$: oggetto $4$. Costruzione: $(1,1,0,1,0)$, profitto $24$. Ricerca locale: nessuna mossa migliorante. Risultato: profit $24$.

    3. - Iterazione $2$: $rc=16$, candidati $\{1,2,3,4,5\}$, soglia $1.6714$, $RCL=(1)$, $u=0.60$ sceglie la posizione $1$: oggetto $1$; $rc=11$, candidati $\{2,3,4,5\}$, soglia $1.4048$, $RCL=(2,3)$, $u=0.66$ sceglie la posizione $2$: oggetto $3$. Costruzione: $(1,0,1,0,0)$, profitto $29$. Ricerca locale: nessuna mossa migliorante. Risultato: profit $29$.

    4. La migliore soluzione è $(1,0,1,0,0)$ di profitto $29$, che è ottima (per enumerazione: gli oggetti $\{1,3\}$ riempiono esattamente la capacità). L'algoritmo greedy deterministico non seleziona mai l'oggetto $3$, perché dopo gli oggetti $1$ e $2$ non entra; la costruzione randomizzata sceglie talvolta l'oggetto $3$ prima dell'oggetto $2$, e raggiunge una valle diversa.

<a id="esercizio-32-11"></a>

!!! esercizio "Esercizio 32.11: GRASP 2"

    Un'istanza del TSP con $6$ città e le distanze simmetriche

    $$
    \begin{array}{c|cccccc}
    \hline {d_{ij}} & {1} & {2} & {3} & {4} & {5} & {6} \\
    \hline {1} & --- & {5} & {1} & {7} & {7} & {4} \\
    {2} & {5} & --- & {4} & {5} & {2} & {1} \\
    {3} & {1} & {4} & --- & {6} & {6} & {4} \\
    {4} & {7} & {5} & {6} & --- & {7} & {6} \\
    {5} & {7} & {2} & {6} & {7} & --- & {2} \\
    {6} & {4} & {1} & {4} & {6} & {2} & --- \\
    \hline
    \end{array}
    $$

    GRASP per il TSP: nearest neighbour randomizzato dalla città $1$ con $\alpha=0.5$ (la RCL contiene le città non visitate $j$ con $d_{\ell j}\le d_{\min}+\alpha(d_{\max}-d_{\min})$, ordinate per distanza, pareggi per indice; posizione $1+\lfloor u|RCL|\rfloor$), seguito dalla ricerca locale 2-opt con best improvement. I numeri casuali sono $0.45$, $0.31$, $0.05$, $0.86$, $0.41$, $0.52$, $0.47$, $0.47$, $0.28$, $0.22$.

    **Domande**

    1. Eseguire la prima iterazione della GRASP.

    2. Eseguire la seconda iterazione.

    3. Qual è il giro migliore trovato? Confrontarlo con il giro nearest neighbour.

    4. Che cosa darebbe la GRASP con $\alpha=0$, per un numero qualsiasi di iterazioni?

??? soluzione "Soluzione"

    1. Costruzione: da $1$: soglia $4$, $RCL=(3,6)$, $u=0.45$: città $3$; da $3$: soglia $5$, $RCL=(2,6)$, $u=0.31$: città $2$; da $2$: soglia $3$, $RCL=(6,5)$, $u=0.05$: città $6$; da $6$: soglia $4$, $RCL=(5)$, $u=0.86$: città $5$; da $5$: soglia $7$, $RCL=(4)$, $u=0.41$: città $4$. Giro $(1,3,2,6,5,4)$, lunghezza $22$. Ricerca locale: nessuna mossa 2-opt migliora il giro: è già un ottimo locale 2-opt. Risultato: lunghezza $22$.

    2. Costruzione: da $1$: soglia $4$, $RCL=(3,6)$, $u=0.52$: città $6$; da $6$: soglia $3.5$, $RCL=(2,5)$, $u=0.47$: città $2$; da $2$: soglia $3.5$, $RCL=(5)$, $u=0.47$: città $5$; da $5$: soglia $6.5$, $RCL=(3)$, $u=0.28$: città $3$; da $3$: soglia $6$, $RCL=(4)$, $u=0.22$: città $4$. Giro $(1,6,2,5,3,4)$, lunghezza $26$. Ricerca locale: la mossa migliore è $(4,6)$ con $\delta=-5$, che dà $(1,6,2,5,4,3)$ di lunghezza $21$; la mossa migliore è $(2,4)$ con $\delta=-1$, che dà $(1,6,5,2,4,3)$ di lunghezza $20$; poi nessuna mossa migliora il giro. Risultato: lunghezza $20$.

    3. Il giro migliore è $(1,6,5,2,4,3)$, di lunghezza $20$, l'ottimo. Il giro nearest neighbour, $(1,3,2,6,5,4)$ di lunghezza $22$, è un ottimo locale 2-opt: la seconda costruzione, peggiore del nearest neighbour ($26$), porta la ricerca locale in una valle migliore.

    4. Con $\alpha=0$ la RCL contiene solo le città più vicine: la costruzione è l'euristica nearest neighbour (a meno di pareggi), ogni iterazione costruisce $(1,3,2,6,5,4)$, e la ricerca locale si ferma a $22$.

<a id="esercizio-32-12"></a>

!!! esercizio "Esercizio 32.12: GRASP 3"

    Uno zaino di capacità $c=16$ e $5$ oggetti:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\
    \hline {p_j} & {11} & {5} & {18} & {8} & {8} \\
    {w_j} & {5} & {3} & {11} & {6} & {7} \\
    \hline
    \end{array}
    $$

    GRASP con $2$ iterazioni, RCL per soglia di efficienza $e_{\max}-\alpha(e_{\max}-e_{\min})$ (posizione $1+\lfloor u|RCL|\rfloor$), ricerca locale con flip e swap ammissibili (best improvement). I numeri casuali sono $0.92$, $0.29$, $0.21$, $0.73$, $0.53$, $0.33$, $0.75$, $0.76$, $0.54$, $0.68$, $0.64$, $0.82$.

    **Domande**

    1. Quali oggetti formano la RCL al primo passo con $\alpha=0$, $\alpha=0.5$ e $\alpha=1$?

    2. Applicare la GRASP con $\alpha=0$.

    3. Applicare la GRASP con $\alpha=1$, usando i numeri casuali dall'inizio.

    4. Confrontare le due esecuzioni: quale diversifica, e quale intensifica?

??? soluzione "Soluzione"

    1. $e_{\max}=\frac{11}{5}=2.2$, $e_{\min}=\frac87\approx 1.14$. Con $\alpha=0$: $RCL=(1)$; con $\alpha=0.5$ (soglia $1.6714$): $RCL=(1)$; con $\alpha=1$: tutti gli oggetti, $RCL=(1,2,3,4,5)$.

    2. - Iterazione $1$: $rc=16$, candidati $\{1,2,3,4,5\}$, soglia $2.2000$, $RCL=(1)$, $u=0.92$ sceglie la posizione $1$: oggetto $1$; $rc=11$, candidati $\{2,3,4,5\}$, soglia $1.6667$, $RCL=(2)$, $u=0.29$ sceglie la posizione $1$: oggetto $2$; $rc=8$, candidati $\{4,5\}$, soglia $1.3333$, $RCL=(4)$, $u=0.21$ sceglie la posizione $1$: oggetto $4$. Costruzione: $(1,1,0,1,0)$, profitto $24$. Ricerca locale: nessuna mossa migliorante. Risultato: profit $24$.

        - Iterazione $2$: $rc=16$, candidati $\{1,2,3,4,5\}$, soglia $2.2000$, $RCL=(1)$, $u=0.73$ sceglie la posizione $1$: oggetto $1$; $rc=11$, candidati $\{2,3,4,5\}$, soglia $1.6667$, $RCL=(2)$, $u=0.53$ sceglie la posizione $1$: oggetto $2$; $rc=8$, candidati $\{4,5\}$, soglia $1.3333$, $RCL=(4)$, $u=0.33$ sceglie la posizione $1$: oggetto $4$. Costruzione: $(1,1,0,1,0)$, profitto $24$. Ricerca locale: nessuna mossa migliorante. Risultato: profit $24$.

        Con $\alpha=0$ entrambe le iterazioni costruiscono la soluzione greedy e si fermano a $24$: i numeri casuali sono irrilevanti (ogni RCL ha un solo elemento).

    3. - Iterazione $1$: $rc=16$, candidati $\{1,2,3,4,5\}$, soglia $1.1429$, $RCL=(1,2,3,4,5)$, $u=0.92$ sceglie la posizione $5$: oggetto $5$; $rc=9$, candidati $\{1,2,4\}$, soglia $1.3333$, $RCL=(1,2,4)$, $u=0.29$ sceglie la posizione $1$: oggetto $1$; $rc=4$, candidati $\{2\}$, soglia $1.6667$, $RCL=(2)$, $u=0.21$ sceglie la posizione $1$: oggetto $2$. Costruzione: $(1,1,0,0,1)$, profitto $24$. Ricerca locale: nessuna mossa migliorante. Risultato: profit $24$.

        - Iterazione $2$: $rc=16$, candidati $\{1,2,3,4,5\}$, soglia $1.1429$, $RCL=(1,2,3,4,5)$, $u=0.73$ sceglie la posizione $4$: oggetto $4$; $rc=10$, candidati $\{1,2,5\}$, soglia $1.1429$, $RCL=(1,2,5)$, $u=0.53$ sceglie la posizione $2$: oggetto $2$; $rc=7$, candidati $\{1,5\}$, soglia $1.1429$, $RCL=(1,5)$, $u=0.33$ sceglie la posizione $1$: oggetto $1$. Costruzione: $(1,1,0,1,0)$, profitto $24$. Ricerca locale: nessuna mossa migliorante. Risultato: profit $24$.

        Profitto migliore: $24$.

    4. Con $\alpha=0$ la GRASP è una sola ricerca locale dalla soluzione greedy: pura intensificazione, sempre $24$. Con $\alpha=1$ le costruzioni sono casuali e diverse (diversificazione), e la ricerca locale intensifica attorno a ciascuna di esse; qui il risultato migliore è $24$, mentre l'ottimo è $29$.

## Large neighbourhood search

<a id="esercizio-32-13"></a>

!!! esercizio "Esercizio 32.13: Large neighbourhood search 1"

    Contenitori di capacità $c=10$ e $8$ oggetti con pesi $w=(2,7,5,5,3,2,6,6)$. La LNS svuota il contenitore meno carico (pareggi: indice minimo) e un altro contenitore scelto a caso (il contenitore in posizione $1+\lfloor u\cdot(nb-1)\rfloor$ fra gli altri), reimpacchetta gli oggetti tolti con FFD in contenitori nuovi, conserva gli altri contenitori, e accetta il nuovo impacchettamento se usa meno contenitori, o altrettanti contenitori e una somma dei quadrati dei carichi non minore. Si ferma quando $nb$ raggiunge $\lceil\sum_jw_j/c\rceil$. I numeri casuali sono $0.13$, $0.76$, $0.46$.

    **Domande**

    1. Calcolare l'impacchettamento First Fit e il lower bound $\lceil\sum_jw_j/c\rceil$.

    2. Eseguire la prima iterazione della LNS.

    3. Proseguire finché la ricerca non si ferma.

    4. L'impacchettamento finale è ottimo? Perché si accettano impacchettamenti con lo stesso numero di contenitori?

??? soluzione "Soluzione"

    1. First Fit dà $P_{1}=\{1,2\}$, $P_{2}=\{3,4\}$, $P_{3}=\{5,6\}$, $P_{4}=\{7\}$, $P_{5}=\{8\}$: $5$ contenitori. $\sum_jw_j=36$, quindi servono almeno $\lceil 36/10\rceil=4$ contenitori.

    2. - Iterazione $1$: carichi $(9,10,5,6,6)$; contenitori svuotati $P_{3},P_{1}$; oggetti tolti $\{1,2,5,6\}$; reimpacchettamento FFD: $P_{1}=\{3,4\}$, $P_{2}=\{7\}$, $P_{3}=\{8\}$, $P_{4}=\{2,5\}$, $P_{5}=\{1,6\}$; $nb'=5$, $\sum_b(\cdot)^2$: $278\to 288$: accettato.

    3. - Iterazione $2$: carichi $(10,6,6,10,4)$; contenitori svuotati $P_{5},P_{4}$; oggetti tolti $\{1,2,5,6\}$; reimpacchettamento FFD: $P_{1}=\{3,4\}$, $P_{2}=\{7\}$, $P_{3}=\{8\}$, $P_{4}=\{2,5\}$, $P_{5}=\{1,6\}$; $nb'=5$, $\sum_b(\cdot)^2$: $288\to 288$: accettato.

        - Iterazione $3$: carichi $(10,6,6,10,4)$; contenitori svuotati $P_{5},P_{2}$; oggetti tolti $\{1,6,7\}$; reimpacchettamento FFD: $P_{1}=\{3,4\}$, $P_{2}=\{8\}$, $P_{3}=\{2,5\}$, $P_{4}=\{1,6,7\}$; $nb'=4$, $\sum_b(\cdot)^2$: $288\to 336$: accettato.

    4. L'impacchettamento finale $P_{1}=\{3,4\}$, $P_{2}=\{8\}$, $P_{3}=\{2,5\}$, $P_{4}=\{1,6,7\}$ usa $4$ contenitori, quanti il lower bound: è ottimo. Accettare impacchettamenti con lo stesso numero di contenitori e una somma dei quadrati dei carichi maggiore (o uguale) permette alla ricerca di muoversi sul plateau dell'obiettivo piatto, verso impacchettamenti con contenitori più pieni e un contenitore quasi vuoto, più facile da eliminare.

<a id="esercizio-32-14"></a>

!!! esercizio "Esercizio 32.14: Large neighbourhood search 2"

    Contenitori di capacità $c=10$ e $8$ oggetti con pesi $w=(3,3,6,5,4,4,2,3)$. La LNS parte dall'impacchettamento FFD, svuota il contenitore meno carico e altri due contenitori a caso ($q=3$; ciascuno è il contenitore in posizione $1+\lfloor uK\rfloor$ fra i $K$ contenitori non ancora scelti), e reimpacchetta gli oggetti tolti in contenitori nuovi, con FFD oppure in modo ottimo. I numeri casuali sono $0.66$, $0.78$.

    **Domande**

    1. Calcolare l'impacchettamento FFD e il lower bound.

    2. Eseguire un'iterazione della LNS con la riparazione FFD.

    3. Eseguire la stessa iterazione con la riparazione esatta: trovare il numero minimo di contenitori per gli oggetti tolti.

    4. Confrontare le due riparazioni. La LNS con riparazione FFD può migliorare in questo modo un impacchettamento FFD?

??? soluzione "Soluzione"

    1. FFD (pesi $6,5,4,4,3,3,3,2$) dà $P_{1}=\{3,5\}$, $P_{2}=\{4,6\}$, $P_{3}=\{1,2,8\}$, $P_{4}=\{7\}$: $4$ contenitori; $\lceil 30/10\rceil=3$.

    2. - Iterazione $1$: carichi $(10,9,9,2)$; contenitori svuotati $P_{4},P_{2},P_{3}$; oggetti tolti $\{1,2,4,6,7,8\}$; reimpacchettamento FFD: $P_{1}=\{3,5\}$, $P_{2}=\{4,6\}$, $P_{3}=\{1,2,8\}$, $P_{4}=\{7\}$; $nb'=4$, $\sum_b(\cdot)^2$: $266\to 266$: accettato.

    3. Gli oggetti tolti $\{1,2,4,6,7,8\}$ hanno peso totale $20>10$, quindi servono almeno $2$ contenitori, e $2$ contenitori bastano:

        - Iterazione $1$: carichi $(10,9,9,2)$; contenitori svuotati $P_{4},P_{2},P_{3}$; oggetti tolti $\{1,2,4,6,7,8\}$; reimpacchettamento esatto: $P_{1}=\{3,5\}$, $P_{2}=\{1,4,7\}$, $P_{3}=\{2,6,8\}$; $nb'=3$, $\sum_b(\cdot)^2$: $266\to 300$: accettato.

    4. La riparazione FFD reimpacchetta gli oggetti tolti come fa FFD, e trova per essi $3$ contenitori; la riparazione esatta ne trova $2$, e l'impacchettamento diventa ottimo ($3$ contenitori). Poiché gli oggetti tolti sono reimpacchettati con la stessa regola che ha costruito l'impacchettamento, la LNS con riparazione FFD tende a ricostruire gli stessi contenitori: con $200$ iterazioni ($seed=1$) non scende mai sotto $4$. La potenza di un intorno grande dipende dal metodo che lo esplora.

<a id="esercizio-32-15"></a>

!!! esercizio "Esercizio 32.15: Large neighbourhood search 3"

    Un'istanza del TSP con $6$ città e le distanze simmetriche

    $$
    \begin{array}{c|cccccc}
    \hline {d_{ij}} & {1} & {2} & {3} & {4} & {5} & {6} \\
    \hline {1} & --- & {5} & {1} & {7} & {7} & {4} \\
    {2} & {5} & --- & {4} & {5} & {2} & {1} \\
    {3} & {1} & {4} & --- & {6} & {6} & {4} \\
    {4} & {7} & {5} & {6} & --- & {7} & {6} \\
    {5} & {7} & {2} & {6} & {7} & --- & {2} \\
    {6} & {4} & {1} & {4} & {6} & {2} & --- \\
    \hline
    \end{array}
    $$

    La LNS parte dal giro nearest neighbour $(1,3,2,6,5,4)$ (lunghezza $22$), toglie $q=2$ città a caso (la città in posizione $2+\lfloor u(|\sigma|-1)\rfloor$ del giro parziale corrente, così che la città $1$ non venga mai tolta), le reinserisce nell'ordine di rimozione con cheapest insertion (pareggi: prima posizione), e accetta il nuovo giro se è più corto. I numeri casuali sono $0.68$, $0.16$, $0.84$, $0.92$.

    **Domande**

    1. Eseguire la prima iterazione (distruzione e riparazione) e decidere se il nuovo giro viene accettato.

    2. Eseguire la seconda iterazione.

    3. Calcolare tutti i costi di inserimento della prima città tolta nella seconda iterazione.

    4. Il giro finale è ottimo? Quanti lati del giro di partenza sono stati cambiati?

??? soluzione "Soluzione"

    1. Città tolte: $5, 3$; giro parziale $(1,2,6,4)$; inserimenti: città $5$ fra $2$ e $6$ (costo $3$); città $3$ fra $1$ e $2$ (costo $0$); nuovo giro $(1,3,2,5,6,4)$ di lunghezza $22$: rifiutato.

    2. Città tolte: $4, 5$; giro parziale $(1,3,2,6)$; inserimenti: città $4$ fra $3$ e $2$ (costo $7$); città $5$ fra $2$ e $6$ (costo $3$); nuovo giro $(1,3,4,2,5,6)$ di lunghezza $20$: accettato.

    3. Inserimento della città $4$ in $(1,3,2,6)$: $(1,3)$: $12$, $(3,2)$: $7$, $(2,6)$: $10$, $(6,1)$: $9$; il costo minimo è $7$, fra le città $3$ e $2$.

    4. Il giro finale $(1,3,4,2,5,6)$ ha lunghezza $20$: è il giro ottimo. Ha $2$ lati in comune con il giro di partenza: un solo passo di distruzione e riparazione ha cambiato $4$ lati, una mossa che 2-opt non può eseguire in un passo.

## Algoritmi genetici

<a id="esercizio-32-16"></a>

!!! esercizio "Esercizio 32.16: Algoritmi genetici 1"

    Uno zaino di capacità $c=16$ e $5$ oggetti:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\
    \hline {p_j} & {11} & {5} & {18} & {8} & {8} \\
    {w_j} & {5} & {3} & {11} & {6} & {7} \\
    \hline
    \end{array}
    $$

    Algoritmo genetico steady-state con popolazione $pop[1]=(0,0,0,1,1)$, $pop[2]=(0,1,0,0,1)$, $pop[3]=(0,1,0,1,1)$, $pop[4]=(1,1,0,1,0)$; torneo binario (individui $1+\lfloor 4u\rfloor$, vince il più adatto, pareggi: il primo), crossover a un punto con taglio $1+\lfloor 4u\rfloor$ (geni $1..cut$ da $a$, gli altri da $b$), mutazione di ogni gene se $u<p_m=0.2$, riparazione togliendo l'oggetto selezionato di efficienza minima finché la soluzione non è ammissibile; il figlio sostituisce l'individuo peggiore (pareggi: ultimo indice) se è migliore e non è già presente. Ogni iterazione usa $10$ numeri casuali; sono $0.58$, $0.07$, $0.50$, $0.39$, $0.63$, $0.56$, $0.15$, $0.15$, $0.22$, $0.60$, $0.23$, $0.97$, $0.41$, $0.64$, $0.36$, $0.05$, $0.09$, $0.60$, $0.80$, $0.01$.

    **Domande**

    1. Calcolare la fitness della popolazione iniziale. Quali oggetti non vi compaiono mai?

    2. Eseguire la prima iterazione dell'algoritmo genetico.

    3. Eseguire la seconda iterazione.

    4. Il solo crossover può mai produrre una soluzione che contiene l'oggetto $3$? Quale operatore lo rende possibile?

??? soluzione "Soluzione"

    1. Fitness: $16$, $13$, $21$, $24$ (pesi $13$, $10$, $16$, $14$). L'oggetto $3$ non è in nessun individuo.

    2. - Iterazione $1$: il torneo $(3,1)$ seleziona $a=3$, il torneo $(3,2)$ seleziona $b=3$; taglio $=3$: figlio $(0,1,0,1,1)$; mutazione dei geni $\{2,3\}$: $(0,0,1,1,1)$; la riparazione toglie gli oggetti $\{5,4\}$: $(0,0,1,0,0)$, profitto $18$; individuo peggiore $2$; inserito. Fitness della popolazione: $(16,18,21,24)$.

    3. - Iterazione $2$: il torneo $(1,4)$ seleziona $a=4$, il torneo $(2,3)$ seleziona $b=3$; taglio $=2$: figlio $(1,1,0,1,1)$; mutazione dei geni $\{1,2,5\}$: $(0,0,0,1,0)$; ammissibile, profitto $8$; individuo peggiore $1$; non inserito. Fitness della popolazione: $(16,18,21,24)$.

    4. No: il crossover copia geni dai genitori, e il gene $3$ vale $0$ in ogni individuo. Solo la mutazione può porlo a $1$, come nell'iterazione $1$; ma il figlio è inammissibile, e la riparazione toglie gli oggetti meno efficienti, non l'oggetto $3$, quindi il risultato è la soluzione $(0,0,1,0,0)$ di profitto 18. Il miglior individuo dopo due iterazioni ha profitto $24<29$.

<a id="esercizio-32-17"></a>

!!! esercizio "Esercizio 32.17: Algoritmi genetici 2"

    Uno zaino di capacità $c=16$ e $5$ oggetti:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\
    \hline {p_j} & {11} & {5} & {18} & {8} & {8} \\
    {w_j} & {5} & {3} & {11} & {6} & {7} \\
    \hline
    \end{array}
    $$

    Algoritmo genetico steady-state con popolazione $pop[1]=(0,0,0,1,1)$, $pop[2]=(0,1,0,0,1)$, $pop[3]=(0,1,0,1,1)$, $pop[4]=(1,1,0,1,0)$; torneo binario (individui $1+\lfloor 4u\rfloor$, vince il più adatto, pareggi: il primo), crossover a un punto con taglio $1+\lfloor 4u\rfloor$ (geni $1..cut$ da $a$, gli altri da $b$), mutazione di ogni gene se $u<p_m=0.2$, riparazione togliendo l'oggetto selezionato di efficienza minima finché la soluzione non è ammissibile; il figlio sostituisce l'individuo peggiore (pareggi: ultimo indice) se è migliore e non è già presente. Ogni iterazione usa $10$ numeri casuali; sono $0.58$, $0.07$, $0.50$, $0.39$, $0.63$, $0.56$, $0.15$, $0.15$, $0.22$, $0.60$, $0.23$, $0.97$, $0.41$, $0.64$, $0.36$, $0.05$, $0.09$, $0.60$, $0.80$, $0.01$.

    **Domande**

    1. Applicare la ricerca locale (flip e swap ammissibili, best improvement) a ogni individuo della popolazione iniziale, come fa l'algoritmo memetico.

    2. Eseguire la prima iterazione dell'algoritmo memetico con gli stessi numeri casuali.

    3. Eseguire la seconda iterazione.

    4. Confrontare con l'algoritmo genetico senza ricerca locale, che dopo le stesse due iterazioni ha profitto migliore $24$.

??? soluzione "Soluzione"

    1. Dopo la ricerca locale la popolazione è $(1,1,0,0,1)$ (24), $(1,1,0,0,1)$ (24), $(1,1,0,0,1)$ (24), $(1,1,0,1,0)$ (24).

    2. - Iterazione $1$: il torneo $(3,1)$ seleziona $a=3$, il torneo $(3,2)$ seleziona $b=3$; taglio $=3$: figlio $(1,1,0,0,1)$; mutazione dei geni $\{2,3\}$: $(1,0,1,0,1)$; la riparazione toglie gli oggetti $\{5\}$: $(1,0,1,0,0)$; ricerca locale: $(1,0,1,0,0)$, profitto $29$; individuo peggiore $4$; inserito. Fitness della popolazione: $(24,24,24,29)$.

    3. - Iterazione $2$: il torneo $(1,4)$ seleziona $a=4$, il torneo $(2,3)$ seleziona $b=2$; taglio $=2$: figlio $(1,0,0,0,1)$; mutazione dei geni $\{1,2,5\}$: $(0,1,0,0,0)$; ammissibile; ricerca locale: $(1,0,1,0,0)$, profitto $29$; individuo peggiore $3$; non inserito. Fitness della popolazione: $(24,24,24,29)$.

    4. L'algoritmo memetico raggiunge l'ottimo $29$ (oggetti $\{1,3\}$) alla prima iterazione: la mutazione porta l'oggetto $3$ nel figlio, e la ricerca locale trasforma il figlio riparato in un ottimo locale che contiene l'oggetto $3$. Senza ricerca locale lo stesso figlio viene solo riparato, e il suo valore è scarso. La ricerca locale aggiunge intensificazione alla diversificazione di crossover e mutazione.
