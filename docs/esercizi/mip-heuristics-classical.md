---
title: "Esercizi · Euristiche MIP per i problemi classici"
---

# Esercizi · Euristiche MIP per i problemi classici

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 33** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 33: Euristiche MIP](../algoritmi-euristici/mip-heuristics-classical.md) · [:material-file-pdf-box: Eserciziario, volume 4 (PDF)](../pdf/esercizi-4-algoritmi-euristici.pdf)

</div>

## Arrotondamento e diving

<a id="esercizio-33-1"></a>

!!! esercizio "Esercizio 33.1: Arrotondamento e diving sul KP (KP1)"

    Consideriamo uno zaino di capacità $c=16$ e un insieme $\mathscr{I}=\{1,2,3,4,5\}$ di $5$ oggetti, con i seguenti profitti e pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\[1ex]
    \hline {p_j} & {11} & {15} & {18} & {14} & {10} \\[1ex]
    {w_j} & {3} & {5} & {7} & {10} & {9} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Verificare che gli oggetti sono ordinati per efficienza non crescente e calcolare la soluzione ottima $\tilde x$ del rilassamento lineare del modello del KP e il suo valore $z(\LP_{\KP})$.

    2. Applicare l'arrotondamento: arrotondare $\tilde x$ al punto intero più vicino $\bar x$, verificare se $\bar x$ è ammissibile e indicarne il profitto.

    3. Applicare il fractional diving: a ogni passo risolvere il rilassamento lineare con le variabili fissate fino a quel momento, fissare la variabile meno frazionaria al suo intero più vicino e ripetere finché la soluzione LP è intera.

    4. Il diving è un cammino dell'albero di branch-and-bound. Calcolare il valore del rilassamento lineare dei rami che il diving non visita e usarli per stabilire se la soluzione del diving è ottima.

??? soluzione "Soluzione"

    1. Le efficienze sono

        $$
        \frac{11}{3}\approx 3.67,\quad \frac{15}{5}=3,\quad \frac{18}{7}\approx 2.57,\quad \frac{14}{10}=1.4,\quad
        \frac{10}{9}\approx 1.11,
        $$

        non crescenti. Il LP prende gli oggetti $1,2,3$ (peso $3+5+7=15$), e la capacità residua $1$ è riempita dalla frazione $\frac{1}{10}$ dell'oggetto $4$:

        $$
        \tilde x=\Big(1,1,1,\frac{1}{10},0\Big),\qquad z(\LP_{\KP})=11+15+18+\frac{14}{10}=\frac{227}{5}=45.4 .
        $$

    2. $\rnd{\frac1{10}}=0$, quindi $\bar x=(1,1,1,0,0)$: peso $15\le16$, ammissibile, profitto $44$.

    3. <strong>Passo 1.</strong> L'unica variabile frazionaria è $x_4=\frac1{10}$: fissare $x_4:=0$.

        <strong>Passo 2.</strong> Senza l'oggetto $4$, il LP prende gli oggetti $1,2,3$ e la frazione $\frac19$ dell'oggetto $5$: $\tilde x=\big(1,1,1,0,\frac19\big)$, di valore $44+\frac{10}{9}=\frac{406}{9}\approx45.11$. Fissare $x_5:=\rnd{\frac19}=0$.

        <strong>Passo 3.</strong> La soluzione LP $(1,1,1,0,0)$, di valore $44$, è intera: il diving restituisce $S=\{1,2,3\}$, di profitto $44$.

    4. Il diving non visita i rami $x_4=1$ e ($x_4=0$, $x_5=1$).

        - $x_4=1$: l'oggetto $4$ usa $10$ unità di capacità, profitto $14$; il LP aggiunge l'oggetto $1$ (residuo $3$) e la frazione $\frac35$ dell'oggetto $2$: valore $14+11+9=34$.

        - $x_4=0$, $x_5=1$: l'oggetto $5$ usa $9$, profitto $10$; il LP aggiunge l'oggetto $1$ (residuo $4$) e la frazione $\frac45$ dell'oggetto $2$: valore $10+11+12=33$.

        Entrambi i valori sono minori di $44$: nessuna soluzione nei rami abbandonati è migliore della soluzione del diving, che è quindi <strong>ottima</strong>, $z(I)=44$. Il diving, insieme ai bound dei rami che abbandona, è un branch-and-bound completo.

<a id="esercizio-33-2"></a>

!!! esercizio "Esercizio 33.2: Arrotondamento e diving sul KP (KP2)"

    Consideriamo uno zaino di capacità $c=15$ e un insieme $\mathscr{I}=\{1,2,3,4,5\}$ di $5$ oggetti, con i seguenti profitti e pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\[1ex]
    \hline {p_j} & {13} & {12} & {14} & {6} & {5} \\[1ex]
    {w_j} & {2} & {5} & {10} & {6} & {7} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Calcolare la soluzione ottima $\tilde x$ del rilassamento lineare e il suo valore $z(\LP_{\KP})$ (gli oggetti sono ordinati per efficienza non crescente).

    2. Arrotondare $\tilde x$ al punto intero più vicino e stabilire se è ammissibile. Arrotondarla poi per difetto e indicarne il profitto.

    3. Applicare il fractional diving, passo per passo, e indicare il profitto della soluzione che restituisce.

    4. Ripetere il diving partendo dalla decisione opposta al primo passo, e proseguire con la regola del fractional diving. Usare poi i bound LP dei rami per dimostrare che la migliore delle due soluzioni è ottima.

??? soluzione "Soluzione"

    1. Le efficienze sono $6.5$, $2.4$, $1.4$, $1$, $\frac57\approx0.71$. Il LP prende gli oggetti $1,2$ (peso $7$) e la frazione $\frac{8}{10}=\frac45$ dell'oggetto $3$:

        $$
        \tilde x=\Big(1,1,\frac45,0,0\Big),\qquad z(\LP_{\KP})=13+12+14\cdot\frac45=\frac{181}{5}=36.2 .
        $$

    2. $\rnd{\frac45}=1$ dà $(1,1,1,0,0)$, di peso $17>15$: <strong>inammissibile</strong>. Arrotondando per difetto si ottiene $(1,1,0,0,0)$, ammissibile (per l'osservazione sull'arrotondamento per difetto del [Capitolo 10 «Euristiche MIP»](https://fabiofurini.github.io/programmazione-lineare-intera/mip-heuristics/mip-heuristics/) del modulo <em>Programmazione lineare intera</em>), di profitto $25$.

    3. <strong>Passo 1.</strong> Fissare $x_3:=\rnd{\frac45}=1$. L'oggetto $3$ usa $10$; il LP prende l'oggetto $1$ (residuo $3$) e la frazione $\frac35$ dell'oggetto $2$: $\tilde x=\big(1,\frac35,1,0,0\big)$, di valore $14+13+\frac{36}{5}=\frac{171}{5}=34.2$.

        <strong>Passo 2.</strong> Fissare $x_2:=\rnd{\frac35}=1$. Gli oggetti $2,3$ riempiono lo zaino ($5+10=15$): la soluzione LP è $(0,1,1,0,0)$, intera, di valore $26$. Il diving restituisce $S=\{2,3\}$, di profitto $26$.

    4. <strong>Passo 1'.</strong> Fissare $x_3:=0$. Il LP prende gli oggetti $1,2,4$ (peso $13$) e la frazione $\frac27$ dell'oggetto $5$: valore $13+12+6+\frac{10}{7}=\frac{227}{7}\approx32.43$.

        <strong>Passo 2'.</strong> Fissare $x_5:=\rnd{\frac27}=0$: la soluzione LP $(1,1,0,1,0)$ è intera, di profitto $31$.

        Le quattro foglie dell'albero sono:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>ramo</th>
        <th>valore LP</th>
        <th></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_3=1\)</span>, <span class="arithmatex">\(x_2=1\)</span></td>
        <td><span class="arithmatex">\(26\)</span></td>
        <td>intera</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_3=1\)</span>, <span class="arithmatex">\(x_2=0\)</span></td>
        <td><span class="arithmatex">\(30\)</span></td>
        <td>oggetti <span class="arithmatex">\(3,1\)</span> e metà dell'oggetto <span class="arithmatex">\(4\)</span>; <span class="arithmatex">\(30<31\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_3=0\)</span>, <span class="arithmatex">\(x_5=0\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td>intera</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(x_3=0\)</span>, <span class="arithmatex">\(x_5=1\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td>non migliore di <span class="arithmatex">\(31\)</span></td>
        </tr>
        </table></div>

        Nessun ramo può contenere una soluzione di profitto maggiore di $31$, quindi $\{1,2,4\}$ è <strong>ottima</strong>: $z(I)=31$. Il primo diving ($26$) è fallito perché la sua prima decisione, la più naturale per il LP ($x_3=\frac45\to1$), era sbagliata.

## RINS, local branching e proximity search

<a id="esercizio-33-3"></a>

!!! esercizio "Esercizio 33.3: RINS, local branching e proximity search sul KP (KP3)"

    Consideriamo uno zaino di capacità $c=22$ e un insieme $\mathscr{I}=\{1,2,\dots,6\}$ di $6$ oggetti, ordinati per efficienza non crescente, con i seguenti profitti e pesi:

    $$
    \begin{array}{l|cccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} \\[1ex]
    \hline {p_j} & {18} & {21} & {4} & {19} & {10} & {7} \\[1ex]
    {w_j} & {8} & {10} & {2} & {12} & {7} & {10} \\
    \hline
    \end{array}
    $$

    La soluzione incumbent è la soluzione del greedy per <em>profitto</em> $GR_p$.

    **Domande**

    1. Calcolare la soluzione incumbent $\bar x$ e il suo profitto, e la soluzione ottima $\tilde x$ del rilassamento lineare $\LP_{\KP}$ con il suo valore.

    2. Applicare RINS: elencare le variabili fissate da RINS, scrivere il sotto-MIP con il vincolo di cutoff $\sum_j p_jx_j\ge f(\bar x)+1$ e risolverlo per enumerazione.

    3. Mostrare che il local branching con raggio $k=2$ intorno a $\bar x$ non trova soluzioni migliori.

    4. Applicare la proximity search con $\theta=1$ a partire da $\bar x$ (la soluzione ottima di questa istanza ha profitto $43$, come si verifica enumerando i $2^6$ sottoinsiemi). Confrontare i tre metodi.

??? soluzione "Soluzione"

    1. Per profitto non crescente l'ordine è $2$ ($21$), $4$ ($19$), $1$ ($18$), $5$, $6$, $3$. L'oggetto $2$ è preso ($rc=12$), l'oggetto $4$ è preso ($rc=0$), nient'altro entra: $\bar x=(0,1,0,1,0,0)$, profitto $40$. Il LP prende gli oggetti $1,2,3$ (peso $20$) e la frazione $\frac2{12}=\frac16$ dell'oggetto $4$:

        $$
        \tilde x=\Big(1,1,1,\frac16,0,0\Big),\qquad z(\LP_{\KP})=43+\frac{19}{6}=\frac{277}{6}\approx46.17 .
        $$

    2. $\tilde x$ e $\bar x$ concordano su $x_2=1$, $x_5=0$, $x_6=0$, che vengono fissate; $x_1,x_3,x_4$ sono libere. Il sotto-MIP è

        $$
        \begin{array}{rrrrrrr}
        {\max} & {21} & {+~18\,x_1} & {+~4\,x_3} & {+~19\,x_4} &  &  \\[0.5ex]
        \text{soggetto a} &  & {8\,x_1} & {+~2\,x_3} & {+~12\,x_4} & {\le} & {12} \\[0.5ex]
        & {21} & {+~18\,x_1} & {+~4\,x_3} & {+~19\,x_4} & {\ge} & {41} \\[0.5ex]
        &  &  &  & {x_1,~x_3,~x_4} & {\in} & {\{0,1\}}
        \end{array}
        $$

        Se $x_4=1$ la capacità impone $x_1=x_3=0$ e il profitto è $40<41$. Se $x_4=0$, la scelta migliore è $x_1=x_3=1$ (peso $10\le12$), di profitto $43$. RINS restituisce $\{1,2,3\}$, di profitto $43$, ossia l'<strong>ottimo</strong>.

    3. La soluzione incumbent riempie lo zaino ($10+12=22$), quindi aggiungere un oggetto è inammissibile, e togliere oggetti diminuisce il profitto. Le soluzioni a distanza $2$ che mantengono il peso ammissibile sono gli scambi (un oggetto esce, uno entra):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>esce \ entra</th>
        <th><span class="arithmatex">\(1\)</span></th>
        <th><span class="arithmatex">\(3\)</span></th>
        <th><span class="arithmatex">\(5\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(37\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td><span class="arithmatex">\(29\)</span></td>
        <td><span class="arithmatex">\(26\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(39\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td><span class="arithmatex">\(28\)</span></td>
        </tr>
        </table></div>

        tutti con profitto minore di $41$: il sotto-MIP con $\Delta(x,\bar x)\le 2$ e il cutoff è inammissibile. L'ottimo $(1,1,1,0,0,0)$ differisce da $\bar x$ in $x_1$, $x_3$, $x_4$: è a distanza $3$.

    4. <strong>Iterazione 1.</strong> Nessuna soluzione di profitto almeno $41$ è a distanza $\le2$ (Domanda 3). A distanza $3$ ce ne sono due: $(1,0,1,1,0,0)$, di peso $22$ e profitto $41$, e $(1,1,1,0,0,0)$, di profitto $43$. Il sotto-MIP di proximity può restituire l'una o l'altra.

        - Se restituisce $(1,1,1,0,0,0)$, il sotto-MIP successivo chiede profitto almeno $44$ ed è inammissibile: il metodo si ferma, e $43$ è dimostrato ottimo.

        - Se restituisce $(1,0,1,1,0,0)$, il sotto-MIP successivo chiede profitto almeno $42$: la soluzione più vicina è $(1,1,1,0,0,0)$, a distanza $2$ (esce l'oggetto $4$, entra l'oggetto $2$); poi il profitto $44$ è inammissibile.

        RINS (hard fixing) ha successo perché le variabili su cui $\tilde x$ e $\bar x$ concordano mantengono i loro valori ottimi; il local branching con $k=2$ fallisce perché l'ottimo è a tre cambiamenti di distanza; la proximity search lo trova, poiché l'ampiezza della mossa è decisa dal sotto-MIP.

<a id="esercizio-33-4"></a>

!!! esercizio "Esercizio 33.4: RINS, local branching e proximity search sul KP (KP4)"

    Consideriamo uno zaino di capacità $c=13$ e un insieme $\mathscr{I}=\{1,2,\dots,6\}$ di $6$ oggetti, ordinati per efficienza non crescente, con i seguenti profitti e pesi:

    $$
    \begin{array}{l|cccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} \\[1ex]
    \hline {p_j} & {16} & {13} & {8} & {16} & {10} & {9} \\[1ex]
    {w_j} & {2} & {2} & {4} & {9} & {6} & {8} \\
    \hline
    \end{array}
    $$

    La soluzione incumbent è la soluzione dell'algoritmo greedy $GR$ (efficienza non crescente).

    **Domande**

    1. Calcolare la soluzione incumbent $\bar x$ e la soluzione ottima $\tilde x$ del rilassamento lineare.

    2. Applicare RINS a partire da $\bar x$: indicare quali variabili sono fissate e che cosa restituisce il sotto-MIP.

    3. Applicare il local branching a partire da $\bar x$ con $k=1$ e poi, dopo aver aggiunto il vincolo inverso, con $k=2$. Scrivere esplicitamente i vincoli di local branching.

    4. Dimostrare che la soluzione trovata nella Domanda 3 è ottima, usando il rilassamento lineare.

??? soluzione "Soluzione"

    1. $GR$ prende gli oggetti $1,2,3$ (peso $8$, $rc=5$); gli oggetti $4,5,6$ non entrano: $\bar x=(1,1,1,0,0,0)$, profitto $37$. Il LP prende gli oggetti $1,2,3$ e la frazione $\frac59$ dell'oggetto $4$:

        $$
        \tilde x=\Big(1,1,1,\frac59,0,0\Big),\qquad z(\LP_{\KP})=37+\frac{80}{9}=\frac{413}{9}\approx45.89 .
        $$

    2. Le due soluzioni concordano su $x_1=x_2=x_3=1$ e $x_5=x_6=0$: solo $x_4$ è libera. Il sotto-MIP chiede $8+9x_4\le13$ e $37+16x_4\ge38$: il primo vincolo impone $x_4=0$, il secondo $x_4=1$. È inammissibile: <strong>RINS fallisce</strong> e restituisce $\bar x$.

    3. <strong>$k=1$.</strong> Il vincolo è

        $$
        (1-x_1)+(1-x_2)+(1-x_3)+x_4+x_5+x_6\le 1 .
        $$

        I vicini sono i flip: aggiungere l'oggetto $4$, $5$ o $6$ dà peso $17$, $14$, $16>13$; togliere un oggetto diminuisce il profitto. Nessuna soluzione ha profitto almeno $38$: aggiungiamo il vincolo inverso $(1-x_1)+(1-x_2)+(1-x_3)+x_4+x_5+x_6\ge 2$ e poniamo $k=2$.

        <strong>$k=2$.</strong> Ora $2\le\Delta(x,\bar x)\le 2$. Due rimozioni perdono profitto, due aggiunte superano la capacità; gli scambi (esce uno fra $1,2,3$, entra uno fra $4,5,6$) che entrano nello zaino sono

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>esce \ entra</th>
        <th><span class="arithmatex">\(4\)</span></th>
        <th><span class="arithmatex">\(5\)</span></th>
        <th><span class="arithmatex">\(6\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td>— (peso <span class="arithmatex">\(15\)</span>)</td>
        <td><span class="arithmatex">\(31\)</span></td>
        <td>— (peso <span class="arithmatex">\(14\)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td>— (peso <span class="arithmatex">\(15\)</span>)</td>
        <td><span class="arithmatex">\(34\)</span></td>
        <td>— (peso <span class="arithmatex">\(14\)</span>)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(45\)</span></td>
        <td><span class="arithmatex">\(39\)</span></td>
        <td><span class="arithmatex">\(38\)</span></td>
        </tr>
        </table></div>

        Il migliore è lo scambio dell'oggetto $3$ con l'oggetto $4$: $(1,1,0,1,0,0)$, di peso $13$ e profitto $45$.

    4. Il rilassamento lineare dà $z(I)\le\frac{413}{9}\approx45.89$ e, poiché i profitti sono interi, $z(I)\le45$. La soluzione del local branching raggiunge questo bound: è <strong>ottima</strong>. RINS ha fissato $x_3=1$, la variabile che doveva cambiare; il local branching (soft fixing) lascia al solver la scelta delle variabili da cambiare.

<a id="esercizio-33-5"></a>

!!! esercizio "Esercizio 33.5: Proximity search su $P\,||\,C_{\max}$ (PCmax1)"

    Consideriamo un'istanza di $P\,||\,C_{\max}$ con $m=2$ macchine e $6$ lavori con tempi di lavorazione

    $$
    \begin{array}{l|cccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} \\[1ex]
    \hline {t_j} & {9} & {3} & {9} & {5} & {8} & {2} \\
    \hline
    \end{array}
    $$

    e il modello MIP con variabili $x_{jh}$ e $C_{\max}$. La soluzione incumbent è la soluzione del list scheduling ($LIST$) nell'ordine $1,2,\dots,6$, con ogni lavoro assegnato alla macchina meno carica (la macchina $1$ in caso di pareggio).

    **Domande**

    1. Calcolare la soluzione incumbent e il suo makespan. Calcolare poi il lower bound $\max\{\max_j t_j,\lceil\sum_j t_j/m\rceil\}$.

    2. Applicare la prima iterazione della proximity search con $\theta=1$: trovare la soluzione con $C_{\max}\le f(\bar x)-1$ a distanza minima $\Delta(x,\bar x)$ dalla soluzione incumbent. (Ricordiamo che $\Delta=2r$, dove $r$ è il numero di lavori che cambiano macchina.)

    3. Applicare la seconda iterazione.

    4. Applicare la terza iterazione e concludere.

??? soluzione "Soluzione"

    1. Lavoro $1\to M_1$ ($9,0$), lavoro $2\to M_2$ ($9,3$), lavoro $3\to M_2$ ($9,12$), lavoro $4\to M_1$ ($14,12$), lavoro $5\to M_2$ ($14,20$), lavoro $6\to M_1$ ($16,20$). La soluzione incumbent è $J_1=\{1,4,6\}$, $J_2=\{2,3,5\}$, con carichi $16$ e $20$: makespan $20$. Il lower bound è $\max\{9,\lceil 36/2\rceil\}=18$.

    2. Il cutoff è $C_{\max}\le19$. Con $r=1$ (distanza $2$) si sposta un solo lavoro; spostare un lavoro su $M_2$ rende il suo carico maggiore di $20$, quindi il lavoro passa da $M_2$ a $M_1$, e servono $20-t_j\le19$ e $16+t_j\le19$, ossia $1\le t_j\le3$: solo il lavoro $2$. La nuova soluzione incumbent è $J_1=\{1,2,4,6\}$, $J_2=\{3,5\}$, con carichi $19$, $17$: makespan $19$, a distanza $2$.

    3. Il cutoff è $C_{\max}\le18$: poiché il totale è $36$, entrambi i carichi devono essere esattamente $18$, ossia $M_1$ deve perdere esattamente $1$. Un solo spostamento richiederebbe un lavoro con $t_j=1$: non ce ne sono (la distanza $2$ è impossibile). Con due lavori ($r=2$, distanza $4$): due lavori che lasciano $M_1$ richiederebbero $t_i+t_j=1$, impossibile; uno scambio di $i\in J_1$ con $j\in J_2$ richiede $t_i-t_j=1$, e l'unica coppia è il lavoro $1$ ($9$) con il lavoro $5$ ($8$). La nuova soluzione incumbent è $J_1=\{2,4,5,6\}$, $J_2=\{1,3\}$, con carichi $18$, $18$: makespan $18$, a distanza $4$.

    4. Il cutoff è $C_{\max}\le17$, ma $C_{\max}\ge 36/2=18$ per ogni assegnamento: il sotto-MIP di proximity è inammissibile, e il metodo si ferma. Per la proposizione sulla proximity search del [Capitolo 10 «Euristiche MIP»](https://fabiofurini.github.io/programmazione-lineare-intera/mip-heuristics/mip-heuristics/) del modulo <em>Programmazione lineare intera</em>, il makespan $18$ è <strong>ottimo</strong>; raggiunge anche il lower bound della Domanda 1.
