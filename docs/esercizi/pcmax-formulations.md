---
title: "Esercizi · Formulazioni dei problemi di scheduling"
---

# Esercizi · Formulazioni dei problemi di scheduling

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 14** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 14: Problemi di scheduling](../formulazioni/pcmax-formulations/index.md) · [:material-file-pdf-box: Eserciziario, volume 2 (PDF)](../pdf/esercizi-2-formulazioni.pdf)

</div>

!!! chiave ""

    <strong>Formulazioni usate in questi esercizi.</strong> Il modello $\mathrm{ILP}_{P\|C_{\max}}$ del capitolo [Formulazioni dei problemi di scheduling](../formulazioni/pcmax-formulations/index.md), con l'insieme delle macchine $\mathscr{H}=\{1,\dots,m\}$:

    \begin{align*}
    && \min ~~ C_{\max} \tag{P0}\\
    && \text{soggetto a} \quad \sum_{h\in\mathscr{H}} x_{jh} &= 1, & \forall j\in\mathscr{J}, \tag{P1}\\
    && -\sum_{j\in\mathscr{J}} t_j\,x_{jh}+C_{\max} &\ge 0, & \forall h\in\mathscr{H}, \tag{P2}\\
    && x_{jh} &\in\{0,1\}, & \forall j\in\mathscr{J},~\forall h\in\mathscr{H}, \tag{P3}\\
    && C_{\max} &\ge 0. \tag{P4}
    \end{align*}

    Il rilassamento $\mathrm{LP}\text{-}0_{P\|C_{\max}}$ rilassa (P3) in $x_{jh}\ge 0$; il rilassamento $\mathrm{LP}_{P\|C_{\max}}$ ha anche $x_{jh}\le 1$. Per ogni istanza

    \begin{equation*}
    z(\mathrm{LP}\text{-}0_{P\|C_{\max}})=z(\mathrm{LP}_{P\|C_{\max}})=\frac{\sum_{j\in\mathscr{J}}t_j}{m}, \tag{P5}
    \end{equation*}

    raggiunto da $\tilde x_{jh}=\frac{1}{m}$; una soluzione duale ottima è $\tilde\pi_h=\frac{1}{m}$ e $\tilde\mu_j=\frac{t_j}{m}$. Le disuguaglianze

    \begin{equation*}
    C_{\max}\ge t_j~~(j\in\mathscr{J}), \qquad C_{\max}\ge\left\lceil\frac{\sum_j t_j}{m}\right\rceil \tag{P6}
    \end{equation*}

    sono valide per il modello $\mathrm{ILP}_{P\|C_{\max}}$.

<a id="esercizio-14-1"></a>

!!! esercizio "Esercizio 14.1: Modello PLI di $P\|C_{\max}$ (1)"

    Consideriamo $m=2$ macchine identiche e un insieme $\mathscr{J}=\{1,\dots,5\}$ di $5$ lavori ($n=5$) con i seguenti tempi di processamento:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\[1ex]
    \hline {t_j} & {7} & {5} & {4} & {3} & {3} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Contare le variabili e i vincoli (oltre ai domini) del modello $\mathrm{ILP}_{P\|C_{\max}}$ per questa istanza.

    2. Scrivere il modello $\mathrm{ILP}_{P\|C_{\max}}$ per questa istanza.

    3. Calcolare il lower bound $\max\left\{\max_j t_j,\left\lceil\frac{\sum_j t_j}{m}\right\rceil\right\}$ sul makespan.

    4. Risolvere il modello con Gurobi, indicare una schedula ottima e dire quante soluzioni ottime ha il modello.

??? soluzione "Soluzione"

    1. Ci sono $n\,m=5\cdot2=10$ variabili binarie $x_{jh}$ e la variabile continua $C_{\max}$, quindi $11$ variabili. Ci sono $n=5$ vincoli di assegnamento e $m=2$ vincoli di carico, quindi $7$ vincoli lineari.

    2. Con $\mathscr{H}=\{1,2\}$ il modello è:

        $$
        \begin{array}{rlcl}
        {\min} & {C_{\max}} &  &  \\[1ex]
        \text{soggetto a} & {x_{11}+x_{12}} & {=} & {1} \\
        & {x_{21}+x_{22}} & {=} & {1} \\
        & {x_{31}+x_{32}} & {=} & {1} \\
        & {x_{41}+x_{42}} & {=} & {1} \\
        & {x_{51}+x_{52}} & {=} & {1} \\
        & {-7\,x_{11}-5\,x_{21}-4\,x_{31}-3\,x_{41}-3\,x_{51}+C_{\max}} & {\ge} & {0} \\
        & {-7\,x_{12}-5\,x_{22}-4\,x_{32}-3\,x_{42}-3\,x_{52}+C_{\max}} & {\ge} & {0} \\[1ex]
        & {x_{11},~x_{12},~x_{21},~\dots,~x_{52}} & {\in} & {\{0,1\}} \\
        & {C_{\max}} & {\ge} & {0}
        \end{array}
        $$

    3. Il tempo di processamento totale è $7+5+4+3+3=22$, quindi

        $$
        \max\left\{7,~\left\lceil22/2\right\rceil\right\}=\max\{7,11\}=11.
        $$

    4. Gurobi dà $z(\mathrm{ILP}_{P\|C_{\max}})=11$, uguale al lower bound. Una schedula ottima è $J_1=\{1,3\}$ e $J_2=\{2,4,5\}$, con carichi $11$ e $11$: $\tilde x_{11}=1$, $\tilde x_{31}=1$, $\tilde x_{22}=1$, $\tilde x_{42}=1$, $\tilde x_{52}=1$, $\tilde C_{\max}=11$.

        Enumerando i $2^5=32$ assegnamenti, la partizione dei lavori è unica: il lavoro $1$ può condividere una macchina solo con il lavoro $3$. Scambiando le due macchine otteniamo la seconda soluzione ottima del modello, quindi le soluzioni ottime sono $2$.

<a id="esercizio-14-2"></a>

!!! esercizio "Esercizio 14.2: Rilassamento lineare del modello di $P\|C_{\max}$ (1)"

    Consideriamo $m=3$ macchine identiche e un insieme $\mathscr{J}=\{1,\dots,6\}$ di $6$ lavori ($n=6$) con i seguenti tempi di processamento:

    $$
    \begin{array}{l|cccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} \\[1ex]
    \hline {t_j} & {8} & {6} & {5} & {4} & {4} & {2} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Risolvere $\mathrm{LP}\text{-}0_{P\|C_{\max}}$ con Gurobi e confrontarne il valore con la formula (P5).

    2. Scrivere le soluzioni primale e duale del capitolo per questa istanza e verificarne l'ammissibilità e l'uguaglianza dei valori obiettivo.

    3. Risolvere con Gurobi il modello $\mathrm{ILP}_{P\|C_{\max}}$ e calcolare il rapporto $\frac{z(\mathrm{LP}_{P\|C_{\max}})}{z(\mathrm{ILP}_{P\|C_{\max}})}$. Confrontarlo con $\frac{1}{m}$.

??? soluzione "Soluzione"

    Usiamo il valore (P5) dei rilassamenti, le soluzioni primale e duale date con esso e le disuguaglianze valide (P6) del riquadro all'inizio del capitolo.

    1. Gurobi dà $z(\mathrm{LP}\text{-}0_{P\|C_{\max}})=\frac{29}{3}$, e la formula dà $\frac{\sum_j t_j}{m}=\frac{29}{3}$, lo stesso valore. Aggiungere i bound $x_{jh}\le 1$ non lo cambia.

    2. Primale: $\tilde x_{jh}=\frac{1}{3}$ per ogni lavoro e macchina, e $\tilde C_{\max}=\frac{29}{3}$. Ogni lavoro ha $3\cdot\frac{1}{3}=1$, e ogni macchina ha carico $\frac{1}{3}\sum_j t_j=\frac{29}{3}=\tilde C_{\max}$: tutti i vincoli valgono all'uguaglianza.

        Duale: $\tilde\pi_h=\frac{1}{3}$ per ogni macchina e $\tilde\mu_j=\frac{t_j}{3}$, ossia

        $$
        \tilde\mu_1=\frac{8}{3},~~\tilde\mu_2=2,~~\tilde\mu_3=\frac{5}{3},~~\tilde\mu_4=\frac{4}{3},~~\tilde\mu_5=\frac{4}{3},~~\tilde\mu_6=\frac{2}{3}.
        $$

        Ogni vincolo $\mu_j-t_j\pi_h\le 0$ vale all'uguaglianza, e $\sum_h\tilde\pi_h=3\cdot\frac{1}{3}=1$. Il valore duale è $\sum_j\tilde\mu_j=\frac{29}{3}$, uguale al valore primale: entrambe le soluzioni sono ottime.

    3. Gurobi dà $z(\mathrm{ILP}_{P\|C_{\max}})=10$ (per esempio $J_1=\{1,6\}$, $J_2=\{2,4\}$, $J_3=\{3,5\}$, con carichi $10$, $10$, $9$). Il rapporto è $\frac{\frac{29}{3}}{10}=\frac{29}{30}$, molto maggiore di $\frac{1}{3}$: il caso peggiore del capitolo richiede un lavoro molto lungo.

<a id="esercizio-14-3"></a>

!!! esercizio "Esercizio 14.3: Soluzioni ammissibili del modello di $P\|C_{\max}$ (1)"

    Consideriamo $m=2$ macchine identiche e un insieme $\mathscr{J}=\{1,\dots,5\}$ di $5$ lavori ($n=5$) con i seguenti tempi di processamento:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\[1ex]
    \hline {t_j} & {6} & {5} & {4} & {3} & {2} \\
    \hline
    \end{array}
    $$

    Consideriamo le seguenti soluzioni candidate del modello $\mathrm{ILP}_{P\|C_{\max}}$, date dai lavori su ciascuna macchina:

    - **(a)** macchina $1$: $\{1,3\}$, macchina $2$: $\{2,4,5\}$, e $C_{\max}=10$;

    - **(b)** macchina $1$: $\{1,2\}$, macchina $2$: $\{3,4,5\}$, e $C_{\max}=10$;

    - **(c)** macchina $1$: $\{1,2\}$, macchina $2$: $\{3,4,5\}$, e $C_{\max}=12$;

    - **(d)** $x_{j1}=x_{j2}=\frac{1}{2}$ per ogni lavoro $j$, e $C_{\max}=10$;

    - **(e)** macchina $1$: $\{1,3,5\}$, macchina $2$: $\{2,4,5\}$, e $C_{\max}=12$.

    **Domande**

    1. Per ogni candidata, verificare i vincoli di assegnamento e i vincoli di carico.

    2. Stabilire quali candidate sono ammissibili per $\mathrm{ILP}_{P\|C_{\max}}$ e quali per $\mathrm{LP}_{P\|C_{\max}}$. Per quelle ammissibili, indicare il valore e il più piccolo valore di $C_{\max}$ che mantiene ammissibile lo stesso assegnamento.

    3. Trovare il valore ottimo dell'istanza e stabilire quali candidate sono ottime per $\mathrm{ILP}_{P\|C_{\max}}$ o per $\mathrm{LP}_{P\|C_{\max}}$ (usare Gurobi).

??? soluzione "Soluzione"

    1. - **(a)** Ogni lavoro è su una macchina. I carichi sono $10$ e $10$, e $C_{\max}=10$: i vincoli di carico valgono.

        - **(b)** Ogni lavoro è su una macchina. I carichi sono $11$ e $9$, e $C_{\max}=10$: il vincolo di carico della macchina $1$ è violato, poiché $11>10$.

        - **(c)** Ogni lavoro è su una macchina. I carichi sono $11$ e $9$, e $C_{\max}=12$: i vincoli di carico valgono.

        - **(d)** I vincoli di assegnamento valgono. I carichi sono $10$ e $10$, e $C_{\max}=10$: i vincoli di carico valgono.

        - **(e)** Il lavoro $5$ è su entrambe le macchine: il suo vincolo di assegnamento dà $2\neq 1$. I carichi sono $12$ e $10$, e $C_{\max}=12$: i vincoli di carico valgono.

    2. - **(a)** Ammissibile per entrambi i modelli, di valore $10$, che è anche il carico massimo.

        - **(b)** Inammissibile per entrambi i modelli.

        - **(c)** Ammissibile per entrambi i modelli, di valore $12$; il carico massimo è $11$, quindi $C_{\max}=11$ mantiene ammissibile l'assegnamento ed è migliore.

        - **(d)** Ammissibile solo per $\mathrm{LP}_{P\|C_{\max}}$, di valore $10$: l'assegnamento frazionario bilancia esattamente i carichi.

        - **(e)** Inammissibile per entrambi i modelli.

    3. Il lower bound è $\left\lceil20/2\right\rceil=10$ e la candidata (a) lo raggiunge: $z(\mathrm{ILP}_{P\|C_{\max}})=10$, e (a) è ottima. Gurobi dà $z(\mathrm{LP}_{P\|C_{\max}})=10$, quindi (a) e (d) sono entrambe ottime per il rilassamento: su questa istanza non c'è gap di integralità.

<a id="esercizio-14-4"></a>

!!! esercizio "Esercizio 14.4: Disuguaglianze valide e simmetria per $P\|C_{\max}$ (1)"

    Consideriamo $m=3$ macchine identiche e un insieme $\mathscr{J}=\{1,\dots,6\}$ di $6$ lavori ($n=6$) con i seguenti tempi di processamento:

    $$
    \begin{array}{l|cccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} \\[1ex]
    \hline {t_j} & {12} & {3} & {3} & {2} & {2} & {2} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Calcolare $z(\mathrm{LP}_{P\|C_{\max}})$ con Gurobi.

    2. Aggiungere la disuguaglianza valida $C_{\max}\ge\left\lceil\frac{\sum_j t_j}{m}\right\rceil$ e risolvere di nuovo il rilassamento. Poi aggiungere invece le disuguaglianze valide $C_{\max}\ge t_j$ e risolvere di nuovo.

    3. Calcolare con Gurobi il valore ottimo e confrontarlo con i tre bound.

    4. Contare, per enumerazione, le soluzioni ottime del modello senza e con i vincoli di rottura delle simmetrie $\sum_j t_jx_{jh}\ge\sum_j t_jx_{j,h+1}$ ($h=1,2$).

??? soluzione "Soluzione"

    Usiamo il valore (P5) dei rilassamenti, le soluzioni primale e duale date con esso e le disuguaglianze valide (P6) del riquadro all'inizio del capitolo.

    1. Gurobi dà $z(\mathrm{LP}_{P\|C_{\max}})=24/3=8$.

    2. La disuguaglianza $C_{\max}\ge\left\lceil24/3\right\rceil=8$ non cambia il bound: Gurobi dà di nuovo $8$, poiché $24/3$ è già intero. Le disuguaglianze $C_{\max}\ge t_j$ comprendono $C_{\max}\ge 12$, e Gurobi dà $12$: il lavoro lungo da solo fissa il bound.

    3. Gurobi dà $z(\mathrm{ILP}_{P\|C_{\max}})=12$: il lavoro $1$ da solo su una macchina, gli altri lavori sulle altre due macchine. Il bound LP $8$ ha gap $\frac{12-8}{8}=50.0\%$; con le disuguaglianze $C_{\max}\ge t_j$ il bound è $12$, uguale al valore ottimo.

    4. Senza i vincoli di rottura delle simmetrie: il lavoro $1$ deve stare da solo (qualunque altro lavoro darebbe un carico maggiore di $12$), può stare su una qualunque delle $3$ macchine, e gli altri $5$ lavori si possono dividere in qualunque modo fra le altre due macchine, i cui carichi restano al più $12$. Si ottengono così $3\cdot 2^5=96$ soluzioni ottime.

        Con i vincoli i carichi devono essere non crescenti. L'enumerazione dà $18$ soluzioni ottime: il lavoro $1$ sulla macchina $1$ con gli altri lavori divisi in modo che la macchina $2$ abbia carico almeno pari a quello della macchina $3$, più la soluzione con tutti i lavori corti sulla macchina $1$ e il lavoro $1$ sulla macchina $2$ (carichi $12$, $12$, $0$). I vincoli eliminano la maggior parte, ma non tutte, delle soluzioni equivalenti.

<a id="esercizio-14-5"></a>

!!! esercizio "Esercizio 14.5: Gap di integralità del modello di $P\|C_{\max}$ (1)"

    Consideriamo $m=2$ macchine identiche e un insieme $\mathscr{J}=\{1,\dots,3\}$ di $3$ lavori ($n=3$) con i seguenti tempi di processamento:

    $$
    \begin{array}{l|ccc}
    \hline  & {j=1} & {j=2} & {j=3} \\[1ex]
    \hline {t_j} & {5} & {5} & {3} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Calcolare con Gurobi $z(\mathrm{LP}_{P\|C_{\max}})$ e $z(\mathrm{ILP}_{P\|C_{\max}})$, e spiegare il valore ottimo.

    2. Calcolare il gap assoluto e il rapporto $\frac{z(\mathrm{LP}_{P\|C_{\max}})}{z(\mathrm{ILP}_{P\|C_{\max}})}$.

    3. Aggiungere entrambe le disuguaglianze valide (P6) e risolvere di nuovo il rilassamento. Quanta parte del gap viene chiusa?

    4. Consideriamo la famiglia del capitolo con $m=3$ macchine, un lavoro di tempo $M=10$ e $3$ lavori di tempo $1$. Calcolare il rapporto con Gurobi e il suo limite per $M\to+\infty$.

??? soluzione "Soluzione"

    Usiamo il valore (P5) dei rilassamenti, le soluzioni primale e duale date con esso e le disuguaglianze valide (P6) del riquadro all'inizio del capitolo.

    1. Gurobi dà $z(\mathrm{LP}_{P\|C_{\max}})=\frac{13}{2}=\frac{13}{2}$ e $z(\mathrm{ILP}_{P\|C_{\max}})=8$. I due lavori di tempo $5$ sulla stessa macchina danno carico $10$; altrimenti il lavoro di tempo $3$ condivide una macchina con un lavoro di tempo $5$, con carico $8$.

    2. Il gap assoluto è $8-\frac{13}{2}=\frac{3}{2}$, e il rapporto è $\frac{\frac{13}{2}}{8}=\frac{13}{16}$, che è maggiore di $\frac{1}{m}=\frac{1}{2}$.

    3. Le disuguaglianze danno $C_{\max}\ge\max\{5,\lceil \frac{13}{2}\rceil\}=7$, e Gurobi dà $7$. Il gap passa da $\frac{3}{2}$ a $1$: l'arrotondamento ne chiude un terzo, e l'unità residua viene dall'assegnamento intero.

    4. Gurobi dà $z(\mathrm{LP}_{P\|C_{\max}})=\frac{10+3}{3}=\frac{13}{3}$ e $z(\mathrm{ILP}_{P\|C_{\max}})=10$, il lavoro lungo. Il rapporto è $\frac{\frac{13}{3}}{10}=\frac{13}{30}$. In generale vale $\frac{M+m}{m\,M}=\frac{1}{m}+\frac{1}{M}$, che tende a $\frac{1}{3}$ per $M\to+\infty$.
