---
title: "Esercizi · Formulazioni dei problemi di zaino"
---

# Esercizi · Formulazioni dei problemi di zaino

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 9** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 9: Problemi di zaino](../formulazioni/knapsack-formulations/index.md) · [:material-file-pdf-box: Eserciziario, volume 2 (PDF)](../pdf/esercizi-2-formulazioni.pdf)

</div>

## Zaino: upper bound di Dantzig e di Martello-Toth

!!! formula "Upper bound usati in questi esercizi"

    I bound del [Capitolo 9 «Formulazioni dei problemi di zaino»](../formulazioni/knapsack-formulations/index.md), per un'istanza del KP con gli oggetti ordinati per efficienza non crescente. L'<strong>oggetto critico</strong> $s\in\mathscr{I}$ e la <strong>capacità residua</strong> $\mathit{rc}$ sono

    \begin{equation*}
    \sum_{j=1}^{s-1} w_j \leq c ~~~{\rm e}~~~ \sum_{j=1}^{s} w_j > c, \qquad \mathit{rc} = c - \sum_{j=1}^{s-1} w_j . \tag{K1}
    \end{equation*}

    L'<strong>upper bound di Dantzig</strong> per $z(\mathrm{ILP}_{\mathrm{KP}})$ è

    \begin{equation*}
    \UB_{\mathrm{D}} = \sum_{j=1}^{s-1} p_{j} + \left\lfloor p_s ~ \frac{\mathit{rc}}{w_s} \right\rfloor . \tag{K2}
    \end{equation*}

    L'<strong>upper bound di Martello-Toth</strong> per $z(\mathrm{ILP}_{\mathrm{KP}})$ è $\UB_{\mathrm{MT}} = \max\{\UB_0,\, \UB_1\}$, dove

    \begin{equation*}
    \UB_0 = \sum_{j=1}^{s-1} p_j + \left\lfloor \mathit{rc} ~ \frac{p_{s+1}}{w_{s+1}} \right\rfloor
    \quad {\rm e} \quad
    \UB_1 = \sum_{j=1}^{s-1} p_j + \left\lfloor p_{s} - (w_{s} - \mathit{rc}) ~ \frac{p_{s-1}}{w_{s-1}} \right\rfloor . \tag{K3}
    \end{equation*}

<a id="esercizio-9-1"></a>

!!! esercizio "Esercizio 9.1: Upper bound per il problema dello zaino 0/1 (1)"

    Consideriamo uno zaino di capacità $c=11$ e un insieme $\mathscr{I}=\{1,2,3,4,5\}$ di $5$ oggetti ($n=5$) con i seguenti profitti e pesi:

    $$
    \begin{array}{l|rrrrrrrrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\[0.7ex]
    \hline {p_j} & {8} & {6} & {14} & {6} & {2} \\[0.7ex]
    {w_j} & {3} & {3} & {9} & {5} & {2} \\[0.7ex]
    \hline
    \end{array}
    $$

    **Domande**

    1. Verificare se gli oggetti sono ordinati per efficienza non crescente, altrimenti ordinarli in questo modo.

    2. Calcolare gli upper bound di Dantzig e di Martello-Toth e determinare quale dei due è più forte per questa istanza del KP.

??? soluzione "Soluzione"

    Usiamo l'oggetto critico e la capacità residua (K1), il bound di Dantzig (K2) e il bound di Martello-Toth (K3) del box all'inizio del capitolo.

    1. Gli oggetti sono ordinati per efficienza non crescente, poiché abbiamo:

        $$
        \frac{8}{3} ~~\ge~~ \frac{6}{3} ~~\ge~~ \frac{14}{9} ~~\ge~~ \frac{6}{5} ~~\ge~~  \frac{2}{2}
        $$

    2. L'oggetto critico è $s=3$ poiché:

        $$
        \sum_{j=1}^{2} w_{j} = 3+3= 6 \le 11 {\rm ~~~e~~~} \sum_{j=1}^{3} w_{j} = 3+3 + 9= 15 > 11
        $$

        e la capacità residua è:

        $$
        \mathit{rc} = c - \sum_{j=1}^{2} w_{j} = 11 - 3 - 3 = 5
        $$

        L'upper bound di Dantzig è:

        $$
        \UB_{\mathrm{D}} = \sum_{j=1}^{2}  p_j + \left\lfloor p_3  ~ \frac{\mathit{rc}}{w_3} \right\rfloor = 8 + 6 + \left\lfloor 14 ~ \frac{5}{9} \right\rfloor = 14 + \left\lfloor \frac{70}{9}  \right\rfloor = 21
        $$

        L'upper bound di Martello-Toth è:

        \begin{align*}
        \UB_0 &= \sum_{j=1}^{2}  p_j  + \left\lfloor \mathit{rc} ~   \frac{p_{4}}{w_{4}} \right\rfloor = 8 + 6 + \left\lfloor 5 ~ \frac{6}{5} \right\rfloor = 14 + 6  = 20\\[2ex]
        \UB_1 &= \sum_{j=1}^{2}  p_j  + \left\lfloor p_{3} - (w_{3} - \mathit{rc}) ~  \frac{p_{2}}{w_{2}} \right\rfloor = 8 + 6 + \left\lfloor 14 - (9-5) ~ \frac{6}{3} \right\rfloor = 14 + 6 = 20\\[2ex]
        \UB_{\mathrm{MT}} &= \max \bigg\{~~\UB_0,~~ \UB_1 ~~\bigg\}  = \max \bigg\{~~20,~~ 20 ~~\bigg\} = 20
        \end{align*}

        Per questa istanza del KP, l'upper bound di Martello-Toth è più forte dell'upper bound di Dantzig, poiché abbiamo:

        $$
        \UB_{\mathrm{MT}} < \UB_{\mathrm{D}}
        $$

<a id="esercizio-9-2"></a>

!!! esercizio "Esercizio 9.2: Upper bound per il problema dello zaino 0/1 (2)"

    Consideriamo uno zaino di capacità $c=8$ e un insieme $\mathscr{I}=\{1,2,3,4\}$ di $4$ oggetti ($n=4$) con i seguenti profitti e pesi:

    $$
    \begin{array}{l|rrrrrrrrrrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\[0.7ex]
    \hline {p_j} & {40} & {42} & {25} & {12} \\[0.7ex]
    {w_j} & {4} & {7} & {5} & {3} \\[0.7ex]
    \hline
    \end{array}
    $$

    **Domande**

    1. Verificare se gli oggetti sono ordinati per efficienza non crescente, altrimenti ordinarli in questo modo.

    2. Calcolare gli upper bound di Dantzig e di Martello-Toth e determinare quale dei due è più forte per questa istanza del KP.

??? soluzione "Soluzione"

    Usiamo l'oggetto critico e la capacità residua (K1), il bound di Dantzig (K2) e il bound di Martello-Toth (K3) del box all'inizio del capitolo.

    1. Gli oggetti sono ordinati per efficienza non crescente, poiché abbiamo:

        $$
        \frac{40}{4} ~~\ge~~ \frac{42}{7} ~~\ge~~ \frac{25}{5} ~~\ge~~ \frac{12}{3}
        $$

    2. L'oggetto critico è $s=2$ poiché:

        $$
        w_1 = 4 \le 8 {\rm ~~~e~~~} \sum_{j=1}^{2} w_{j} = 4 + 7 = 11 > 8
        $$

        e la capacità residua è:

        $$
        \mathit{rc} = c - w_1 = 8 - 4 = 4
        $$

        L'upper bound di Dantzig è:

        $$
        \UB_{\mathrm{D}} = p_1 + \left\lfloor p_2  ~ \frac{\mathit{rc}}{w_2} \right\rfloor = 40 + \left\lfloor 42 ~ \frac{4}{7} \right\rfloor = 40 + \left\lfloor 24 \right\rfloor = 64
        $$

        L'upper bound di Martello-Toth è:

        \begin{align*}
        \UB_0 &= p_1 + \left\lfloor \mathit{rc} ~   \frac{p_{3}}{w_{3}} \right\rfloor = 40 + \left\lfloor 4 ~ \frac{25}{5} \right\rfloor = 40 + \left\lfloor 20 \right\rfloor = 60\\[2ex]
        \UB_1 &= p_1 + \left\lfloor p_{2} - (w_{2} - \mathit{rc}) ~  \frac{p_{1}}{w_{1}} \right\rfloor = 40 + \left\lfloor 42 - (7-4) ~ \frac{40}{4} \right\rfloor = 40 + \left\lfloor 12 \right\rfloor = 52\\[2ex]
        \UB_{\mathrm{MT}} &= \max \bigg\{~~\UB_0,~~ \UB_1 ~~\bigg\}  = \max \bigg\{~~60,~~ 52 ~~\bigg\} = 60
        \end{align*}

        Per questa istanza del KP, l'upper bound di Martello-Toth è più forte dell'upper bound di Dantzig, poiché abbiamo:

        $$
        \UB_{\mathrm{MT}} < \UB_{\mathrm{D}}
        $$

<a id="esercizio-9-3"></a>

!!! esercizio "Esercizio 9.3: Upper bound per il problema dello zaino 0/1 (3)"

    Consideriamo uno zaino di capacità $c=15$ e un insieme $\mathscr{I}=\{1,2,3,4\}$ di $4$ oggetti ($n=4$) con i seguenti profitti e pesi:

    $$
    \begin{array}{l|rrrrrrrrrrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\[0.7ex]
    \hline {p_j} & {24} & {17} & {12} & {6} \\[0.7ex]
    {w_j} & {10} & {8} & {6} & {5} \\[0.7ex]
    \hline
    \end{array}
    $$

    **Domande**

    1. Verificare se gli oggetti sono ordinati per efficienza non crescente, altrimenti ordinarli in questo modo.

    2. Calcolare gli upper bound di Dantzig e di Martello-Toth e determinare quale dei due è più forte per questa istanza del KP.

??? soluzione "Soluzione"

    Usiamo l'oggetto critico e la capacità residua (K1), il bound di Dantzig (K2) e il bound di Martello-Toth (K3) del box all'inizio del capitolo.

    1. Gli oggetti sono ordinati per efficienza non crescente, poiché abbiamo:

        $$
        \frac{24}{10} ~~\ge~~\frac{17}{8} ~~\ge~~\frac{12}{6} ~~\ge~~\frac{6}{5}
        $$

    2. L'oggetto critico è $s=2$ poiché:

        $$
        w_1 = 10 \le 15 {\rm ~~~e~~~} \sum_{j=1}^{2} w_{j} = 10 + 8 = 18 > 15
        $$

        e la capacità residua è:

        $$
        \mathit{rc} = c - w_1 = 15 - 10 = 5
        $$

        L'upper bound di Dantzig è:

        $$
        \UB_{\mathrm{D}} = p_1 + \left\lfloor p_2  ~ \frac{\mathit{rc}}{w_2} \right\rfloor = 24 + \left\lfloor 17 ~ \frac{5}{8} \right\rfloor = 24 + \left\lfloor \frac{85}{8} \right\rfloor = 34
        $$

        L'upper bound di Martello-Toth è:

        \begin{align*}
        \UB_0 &= p_1 + \left\lfloor \mathit{rc} ~   \frac{p_{3}}{w_{3}} \right\rfloor = 24 + \left\lfloor 5 ~ \frac{12}{6} \right\rfloor = 24 + \left\lfloor 10 \right\rfloor = 34\\[2ex]
        \UB_1 &= p_1 + \left\lfloor p_{2} - (w_{2} - \mathit{rc}) ~  \frac{p_{1}}{w_{1}} \right\rfloor = 24 + \left\lfloor 17 - (8-5) ~ \frac{24}{10} \right\rfloor = 24 + \left\lfloor \frac{49}{5} \right\rfloor = 33\\[2ex]
        \UB_{\mathrm{MT}} &= \max \bigg\{~~\UB_0,~~ \UB_1 ~~\bigg\}  = \max \bigg\{~~34,~~ 33 ~~\bigg\} = 34
        \end{align*}

        Per questa istanza del KP, l'upper bound di Martello-Toth è forte quanto l'upper bound di Dantzig, poiché abbiamo:

        $$
        \UB_{\mathrm{MT}}  = \UB_{\mathrm{D}}
        $$

<a id="esercizio-9-4"></a>

!!! esercizio "Esercizio 9.4: Upper bound per il problema dello zaino 0/1 (4)"

    Consideriamo uno zaino di capacità $c=9$ e un insieme $\mathscr{I}=\{1,2,3,4,5,6\}$ di $6$ oggetti ($n=6$) con i seguenti profitti e pesi:

    $$
    \begin{array}{l|rrrrrrrrrrrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} \\[0.7ex]
    \hline {p_j} & {6} & {5} & {8} & {9} & {6} & {7} \\[0.7ex]
    {w_j} & {2} & {3} & {6} & {7} & {5} & {9} \\[0.7ex]
    \hline
    \end{array}
    $$

    **Domande**

    1. Verificare se gli oggetti sono ordinati per efficienza non crescente, altrimenti ordinarli in questo modo.

    2. Calcolare gli upper bound di Dantzig e di Martello-Toth e determinare quale dei due è più forte per questa istanza del KP.

??? soluzione "Soluzione"

    Usiamo l'oggetto critico e la capacità residua (K1), il bound di Dantzig (K2) e il bound di Martello-Toth (K3) del box all'inizio del capitolo.

    1. Gli oggetti sono ordinati per efficienza non crescente, poiché abbiamo:

        $$
        \frac{6}{2} ~~\ge~~ \frac{5}{3} ~~\ge~~ \frac{8}{6} ~~\ge~~ \frac{9}{7} ~~\ge~~  \frac{6}{5} ~~\ge~~ \frac{7}{9}
        $$

    2. L'oggetto critico è $s=3$ poiché:

        $$
        \sum_{j=1}^{2} w_{j} = 2+3= 5 \le 9 {\rm ~~~e~~~} \sum_{j=1}^{3} w_{j} = 2+3 + 6= 11 > 9
        $$

        e la capacità residua è:

        $$
        \mathit{rc} = c - \sum_{j=1}^{2} w_{j} = 9 - 2 - 3 = 4
        $$

        L'upper bound di Dantzig è:

        $$
        \UB_{\mathrm{D}} = \sum_{j = 1}^{2} p_{j} + \left\lfloor p_3  ~ \frac{\mathit{rc}}{w_3} \right\rfloor = 6+5 + \left\lfloor 8 ~ \frac{4}{6} \right\rfloor = 11 + \left\lfloor \frac{16}{3} \right\rfloor =16
        $$

        L'upper bound di Martello-Toth è:

        \begin{align*}
        \UB_0 &= \sum_{j = 1}^{2} p_{j} + \left\lfloor \mathit{rc} ~   \frac{p_{4}}{w_{4}} \right\rfloor = 6+5 + \left\lfloor 4 ~ \frac{9}{7} \right\rfloor = 11 + \left\lfloor \frac{36}{7} \right\rfloor =16\\[2ex]
        \UB_1 &= \sum_{j=1}^{2} p_j + \left\lfloor p_{3} - (w_{3} - \mathit{rc}) ~  \frac{p_{2}}{w_{2}} \right\rfloor = 6+5 + \left\lfloor 8 -(6-4) ~ \frac{5}{3} \right\rfloor = 11 + \left\lfloor  \frac{14}{3}  \right\rfloor =15\\[2ex]
        \UB_{\mathrm{MT}} &= \max \bigg\{~~\UB_0,~~ \UB_1 ~~\bigg\}  = \max \bigg\{~~16,~~ 15 ~~\bigg\} =16
        \end{align*}

        Per questa istanza del KP, l'upper bound di Martello-Toth è forte quanto l'upper bound di Dantzig, poiché abbiamo:

        $$
        \UB_{\mathrm{MT}}  = \UB_{\mathrm{D}}
        $$

<a id="esercizio-9-5"></a>

!!! esercizio "Esercizio 9.5: Upper bound per il problema dello zaino 0/1 (5)"

    Consideriamo uno zaino di capacità $c=21$ e un insieme $\mathscr{I}=\{1,2,3,4,5,6\}$ di $6$ oggetti ($n=6$) con i seguenti profitti e pesi:

    $$
    \begin{array}{l|rrrrrrrrrrrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} \\[0.7ex]
    \hline {p_j} & {24} & {25} & {13} & {10} & {9} & {2} \\[0.7ex]
    {w_j} & {2} & {6} & {8} & {7} & {10} & {3} \\[0.7ex]
    \hline
    \end{array}
    $$

    **Domande**

    1. Verificare se gli oggetti sono ordinati per efficienza non crescente, altrimenti ordinarli in questo modo.

    2. Calcolare gli upper bound di Dantzig e di Martello-Toth e determinare quale dei due è più forte per questa istanza del KP.

??? soluzione "Soluzione"

    Usiamo l'oggetto critico e la capacità residua (K1), il bound di Dantzig (K2) e il bound di Martello-Toth (K3) del box all'inizio del capitolo.

    1. Gli oggetti sono ordinati per efficienza non crescente, poiché abbiamo:

        $$
        \frac{24}{2} ~~\ge~~ \frac{25}{6} ~~\ge~~ \frac{13}{8} ~~\ge~~ \frac{10}{7} ~~\ge~~  \frac{9}{10} ~~\ge~~ \frac{2}{3}
        $$

    2. L'oggetto critico è $s=4$ poiché:

        $$
        \sum_{j=1}^{3} w_{j} = 2+6+8= 16 \le 21 {\rm ~~~e~~~} \sum_{j=1}^{4} w_{j} = 2+6 + 8+7= 23 > 21
        $$

        e la capacità residua è:

        $$
        \mathit{rc} = c - \sum_{j=1}^{3} w_{j} = 21 -2-6-8 = 5
        $$

        L'upper bound di Dantzig è:

        $$
        \UB_{\mathrm{D}} = \sum_{j = 1}^{3} p_{j} + \left\lfloor  p_4 ~ \frac{\mathit{rc}}{w_4} \right\rfloor = 24+25+13 + \left\lfloor 10 ~ \frac{5}{7} \right\rfloor = 62 + \left\lfloor \frac{50}{7} \right\rfloor =69
        $$

        L'upper bound di Martello-Toth è:

        \begin{align*}
        \UB_0 &= \sum_{j = 1}^{3} p_{j} + \left\lfloor \mathit{rc} ~   \frac{p_{5}}{w_{5}} \right\rfloor = 24+25+13  + \left\lfloor 5 ~ \frac{9}{10} \right\rfloor = 62 + \left\lfloor \frac{9}{2} \right\rfloor =66\\[2ex]
        \UB_1 &= \sum_{j=1}^{3} p_j + \left\lfloor p_{4} - (w_{4} - \mathit{rc}) ~  \frac{p_{3}}{w_{3}} \right\rfloor \\ &= 24+25+13  + \left\lfloor 10 -(7-5) ~ \frac{13}{8} \right\rfloor = 62 + \left\lfloor  \frac{27}{4}  \right\rfloor =68\\[2ex]
        \UB_{\mathrm{MT}} &= \max \bigg\{~~\UB_0,~~ \UB_1 ~~\bigg\}  = \max \bigg\{~~66,~~ 68 ~~\bigg\} =68
        \end{align*}

        Per questa istanza del KP, l'upper bound di Martello-Toth è più forte dell'upper bound di Dantzig, poiché abbiamo:

        $$
        \UB_{\mathrm{MT}}  < \UB_{\mathrm{D}}
        $$

## Modelli ILP delle varianti dello zaino

<a id="esercizio-9-6"></a>

!!! esercizio "Esercizio 9.6: Modello PLI del problema del subset sum"

    Il problema del subset sum (SSP) e il suo modello $\mathrm{ILP}_{\mathrm{SSP}}$ sono nel [Capitolo 9 «Formulazioni dei problemi di zaino»](../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-del-subset-sum.md). Consideriamo un valore obiettivo $c = 16$ e un insieme $\mathscr{I} = \{1,2,\dots,6\}$ di $6$ oggetti ($n = 6$), con i seguenti pesi:

    $$
    \begin{array}{l|rrrrrr}
    \hline  & {j = 1} & {j = 2} & {j = 3} & {j = 4} & {j = 5} & {j = 6} \\
    \hline {w_j} & {2} & {4} & {5} & {8} & {9} & {13} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Scrivere il modello $\mathrm{ILP}_{\mathrm{SSP}}$ del capitolo per questa istanza.

    2. Risolvere il modello con Gurobi. Dare il valore ottimo, una soluzione ottima e la soluzione associata del SSP, e dire se la soluzione ottima è unica.

??? soluzione "Soluzione"

    1. Il modello ha $6$ variabili binarie e un vincolo lineare (oltre ai domini delle variabili). Il modello $\mathrm{ILP}_{\mathrm{SSP}}$ per questa istanza è:

        $$
        \begin{array}{rrrrrrrcl}
        {\max} & {2\,x_{1}} & {+\,4\,x_{2}} & {+\,5\,x_{3}} & {+\,8\,x_{4}} & {+\,9\,x_{5}} & {+\,13\,x_{6}} \\[1ex]
        \text{soggetto a} & {2\,x_{1}} & {+\,4\,x_{2}} & {+\,5\,x_{3}} & {+\,8\,x_{4}} & {+\,9\,x_{5}} & {+\,13\,x_{6}} & {\le} & {16} \\[1ex]
        & {x_{1}}, & {x_{2}}, & {x_{3}}, & {x_{4}}, & {x_{5}}, & {x_{6}} & {\in} & {\{0,1\}}
        \end{array}
        $$

    2. Gurobi restituisce il valore ottimo $z(\mathrm{ILP}_{\mathrm{SSP}}) = 16$. Una soluzione ottima è

        $$
        \tilde x_{1}=1,~~\tilde x_{2}=0,~~\tilde x_{3}=1,~~\tilde x_{4}=0,~~\tilde x_{5}=1,~~\tilde x_{6}=0
        $$

        Gli oggetti selezionati hanno peso totale $2 + 5 + 9 = 16$. Poiché $z(\mathrm{ILP}_{\mathrm{SSP}}) = c = 16$, la risposta al SSP è <strong>sì</strong>, con il sottoinsieme $\tilde S = \{1,3,5\}$.

        Enumerando i $22$ sottoinsiemi di peso al più $16$ si vede che $\tilde S$ è l'unico sottoinsieme di peso esattamente $16$: la soluzione ottima è unica.

<a id="esercizio-9-7"></a>

!!! esercizio "Esercizio 9.7: Modello PLI del problema dello zaino limitato"

    Il problema dello zaino limitato (BKP) e il suo modello $\mathrm{ILP}_{\mathrm{BKP}}$ sono nel [Capitolo 9 «Formulazioni dei problemi di zaino»](../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-limitato.md). Consideriamo uno zaino di capacità $c = 18$ e un insieme $\mathscr{I} = \{1,2,\dots,5\}$ di $5$ oggetti ($n = 5$), con i seguenti profitti, pesi e copie disponibili:

    $$
    \begin{array}{l|rrrrr}
    \hline  & {j = 1} & {j = 2} & {j = 3} & {j = 4} & {j = 5} \\
    \hline {p_j} & {5} & {12} & {11} & {7} & {4} \\
    {w_j} & {5} & {7} & {3} & {3} & {8} \\
    {b_j} & {3} & {2} & {3} & {2} & {2} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Scrivere il modello $\mathrm{ILP}_{\mathrm{BKP}}$ del capitolo per questa istanza.

    2. Risolvere il modello con Gurobi. Dare il valore ottimo, una soluzione ottima e la soluzione associata del BKP, e dire se la soluzione ottima è unica.

??? soluzione "Soluzione"

    1. Il modello ha $5$ variabili intere e un vincolo lineare (oltre ai domini delle variabili). Il modello $\mathrm{ILP}_{\mathrm{BKP}}$ per questa istanza è:

        $$
        \begin{array}{rrrrrrcl}
        {\max} & {5\,x_{1}} & {+\,12\,x_{2}} & {+\,11\,x_{3}} & {+\,7\,x_{4}} & {+\,4\,x_{5}} \\[1ex]
        \text{soggetto a} & {5\,x_{1}} & {+\,7\,x_{2}} & {+\,3\,x_{3}} & {+\,3\,x_{4}} & {+\,8\,x_{5}} & {\le} & {18} \\[1ex]
        & {x_{1}}, &  & {x_{3}} &  &  & {\in} & {\{0,1,2,3\}} \\
        &  & {x_{2}}, &  & {x_{4}}, & {x_{5}} & {\in} & {\{0,1,2\}}
        \end{array}
        $$

    2. Gurobi restituisce il valore ottimo $z(\mathrm{ILP}_{\mathrm{BKP}}) = 47$. Una soluzione ottima è

        $$
        \tilde x_{1}=0,~~\tilde x_{2}=0,~~\tilde x_{3}=3,~~\tilde x_{4}=2,~~\tilde x_{5}=0
        $$

        Prende tre copie dell'oggetto $3$ e due copie dell'oggetto $4$: il peso totale è $3 \cdot 3 + 2 \cdot 3 = 15 \le 18$ e ogni $\tilde x_j$ è al più $b_j$.

        Enumerando i $68$ vettori ammissibili di copie si vede che la soluzione ottima è unica.

<a id="esercizio-9-8"></a>

!!! esercizio "Esercizio 9.8: Modello PLI del problema dello zaino illimitato"

    Il problema dello zaino illimitato (UKP) e il suo modello $\mathrm{ILP}_{\mathrm{UKP}}$ sono nel [Capitolo 9 «Formulazioni dei problemi di zaino»](../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-illimitato.md). Consideriamo uno zaino di capacità $c = 19$ e un insieme $\mathscr{I} = \{1,2,\dots,5\}$ di $5$ oggetti ($n = 5$), ciascuno disponibile in un numero illimitato di copie, con i seguenti profitti e pesi:

    $$
    \begin{array}{l|rrrrr}
    \hline  & {j = 1} & {j = 2} & {j = 3} & {j = 4} & {j = 5} \\
    \hline {p_j} & {4} & {9} & {7} & {5} & {8} \\
    {w_j} & {4} & {5} & {6} & {6} & {9} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Scrivere il modello $\mathrm{ILP}_{\mathrm{UKP}}$ del capitolo per questa istanza.

    2. Risolvere il modello con Gurobi. Dare il valore ottimo, una soluzione ottima e la soluzione associata dell'UKP, e dire se la soluzione ottima è unica.

??? soluzione "Soluzione"

    1. Il modello ha $5$ variabili intere e un vincolo lineare (oltre ai domini delle variabili). Il modello $\mathrm{ILP}_{\mathrm{UKP}}$ per questa istanza è:

        $$
        \begin{array}{rrrrrrcl}
        {\max} & {4\,x_{1}} & {+\,9\,x_{2}} & {+\,7\,x_{3}} & {+\,5\,x_{4}} & {+\,8\,x_{5}} \\[1ex]
        \text{soggetto a} & {4\,x_{1}} & {+\,5\,x_{2}} & {+\,6\,x_{3}} & {+\,6\,x_{4}} & {+\,9\,x_{5}} & {\le} & {19} \\[1ex]
        & {x_{1}}, & {x_{2}}, & {x_{3}}, & {x_{4}}, & {x_{5}} & {\in} & {\Z_{\ge 0}}
        \end{array}
        $$

    2. Gurobi restituisce il valore ottimo $z(\mathrm{ILP}_{\mathrm{UKP}}) = 31$. Una soluzione ottima è

        $$
        \tilde x_{1}=1,~~\tilde x_{2}=3,~~\tilde x_{3}=0,~~\tilde x_{4}=0,~~\tilde x_{5}=0
        $$

        Prende una copia dell'oggetto $1$ e tre copie dell'oggetto $2$: il peso totale è $1 \cdot 4 + 3 \cdot 5 = 19 \le 19$.

        Il vincolo di capacità dà $x_j \le \hat b_j = \lfloor c/w_j \rfloor$, cioè $\hat b_1 = 4$, $\hat b_2 = 3$, $\hat b_3 = 3$, $\hat b_4 = 3$, $\hat b_5 = 2$. Enumerando i $54$ vettori ammissibili di copie entro questi limiti si vede che la soluzione ottima è unica.

<a id="esercizio-9-9"></a>

!!! esercizio "Esercizio 9.9: Modello PLI del problema dello zaino multidimensionale"

    Il problema dello zaino multidimensionale (MDKP) e il suo modello $\mathrm{ILP}_{\mathrm{MDKP}}$ sono nel [Capitolo 9 «Formulazioni dei problemi di zaino»](../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-multidimensionale.md). Consideriamo uno zaino a $2$ dimensioni ($k = 2$) con capacità $c_1 = 17$ e $c_2 = 14$, e un insieme $\mathscr{I} = \{1,2,\dots,5\}$ di $5$ oggetti ($n = 5$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|rrrrr}
    \hline  & {j = 1} & {j = 2} & {j = 3} & {j = 4} & {j = 5} \\
    \hline {p_j} & {10} & {8} & {11} & {6} & {9} \\
    {w_{1j}} & {9} & {9} & {3} & {6} & {3} \\
    {w_{2j}} & {5} & {5} & {2} & {3} & {9} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Scrivere il modello $\mathrm{ILP}_{\mathrm{MDKP}}$ del capitolo per questa istanza.

    2. Risolvere il modello con Gurobi. Dare il valore ottimo, una soluzione ottima e la soluzione associata del MDKP, e dire se la soluzione ottima è unica.

??? soluzione "Soluzione"

    1. Il modello ha $5$ variabili binarie e $k = 2$ vincoli lineari, uno per ogni dimensione (oltre ai domini delle variabili). Il modello $\mathrm{ILP}_{\mathrm{MDKP}}$ per questa istanza è:

        $$
        \begin{array}{rrrrrrcl}
        {\max} & {10\,x_{1}} & {+\,8\,x_{2}} & {+\,11\,x_{3}} & {+\,6\,x_{4}} & {+\,9\,x_{5}} \\[1ex]
        \text{soggetto a} & {9\,x_{1}} & {+\,9\,x_{2}} & {+\,3\,x_{3}} & {+\,6\,x_{4}} & {+\,3\,x_{5}} & {\le} & {17} \\
        & {5\,x_{1}} & {+\,5\,x_{2}} & {+\,2\,x_{3}} & {+\,3\,x_{4}} & {+\,9\,x_{5}} & {\le} & {14} \\[1ex]
        & {x_{1}}, & {x_{2}}, & {x_{3}}, & {x_{4}}, & {x_{5}} & {\in} & {\{0,1\}}
        \end{array}
        $$

    2. Gurobi restituisce il valore ottimo $z(\mathrm{ILP}_{\mathrm{MDKP}}) = 26$. Una soluzione ottima è

        $$
        \tilde x_{1}=0,~~\tilde x_{2}=0,~~\tilde x_{3}=1,~~\tilde x_{4}=1,~~\tilde x_{5}=1
        $$

        Il sottoinsieme associato è $\tilde S = \{3,4,5\}$, con peso $12 \le 17$ nella dimensione $1$ e $14 \le 14$ nella dimensione $2$.

        Enumerando i $16$ sottoinsiemi ammissibili si vede che la soluzione ottima è unica.

<a id="esercizio-9-10"></a>

!!! esercizio "Esercizio 9.10: Modello PLI del problema degli zaini multipli"

    Il problema degli zaini multipli (MKP) e il suo modello $\mathrm{ILP}_{\mathrm{MKP}}$ sono nel [Capitolo 9 «Formulazioni dei problemi di zaino»](../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-degli-zaini-multipli.md). Consideriamo $m = 2$ zaini con capacità $c_1 = 12$ e $c_2 = 14$, e un insieme $\mathscr{I} = \{1,2,\dots,5\}$ di $5$ oggetti ($n = 5$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|rrrrr}
    \hline  & {j = 1} & {j = 2} & {j = 3} & {j = 4} & {j = 5} \\
    \hline {p_j} & {10} & {12} & {6} & {4} & {9} \\
    {w_j} & {9} & {4} & {5} & {7} & {8} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Scrivere il modello $\mathrm{ILP}_{\mathrm{MKP}}$ del capitolo per questa istanza.

    2. Risolvere il modello con Gurobi. Dare il valore ottimo, una soluzione ottima e la soluzione associata del MKP, e dire se la soluzione ottima è unica.

??? soluzione "Soluzione"

    1. Il modello ha $n\,m = 10$ variabili binarie, $m = 2$ vincoli di capacità e $n = 5$ vincoli di assegnamento (oltre ai domini delle variabili). Con così tante variabili scriviamo un vincolo per riga. Il modello $\mathrm{ILP}_{\mathrm{MKP}}$ per questa istanza è:

        $$
        \begin{array}{rlcl}
        {\max} & {10\,x_{11}+12\,x_{21}+6\,x_{31}+4\,x_{41}+9\,x_{51}} &  &  \\
        & {+10\,x_{12}+12\,x_{22}+6\,x_{32}+4\,x_{42}+9\,x_{52}} &  &  \\[1ex]
        \text{soggetto a} & {9\,x_{11}+4\,x_{21}+5\,x_{31}+7\,x_{41}+8\,x_{51}} & {\le} & {12} \\
        & {9\,x_{12}+4\,x_{22}+5\,x_{32}+7\,x_{42}+8\,x_{52}} & {\le} & {14} \\
        & {x_{11}+x_{12}} & {\le} & {1} \\
        & {x_{21}+x_{22}} & {\le} & {1} \\
        & {x_{31}+x_{32}} & {\le} & {1} \\
        & {x_{41}+x_{42}} & {\le} & {1} \\
        & {x_{51}+x_{52}} & {\le} & {1} \\[1ex]
        & {x_{11},~x_{21},~x_{31},~\dots,~x_{52}} & {\in} & {\{0,1\}}
        \end{array}
        $$

    2. Gurobi restituisce il valore ottimo $z(\mathrm{ILP}_{\mathrm{MKP}}) = 37$. Una soluzione ottima è

        $$
        \tilde x_{21}=1,~~\tilde x_{51}=1,~~\tilde x_{12}=1,~~\tilde x_{32}=1,
        $$

        con tutte le altre variabili pari a $0$. La soluzione associata del MKP è $(\tilde S_1, \tilde S_2) = (\{2,5\}, \{1,3\})$: lo zaino $1$ ha peso $4 + 8 = 12 \le 12$, lo zaino $2$ ha peso $9 + 5 = 14 \le 14$, e l'oggetto $4$ resta fuori.

        Enumerando i $81$ assegnamenti ammissibili degli oggetti agli zaini si vede che la soluzione ottima è unica.

<a id="esercizio-9-11"></a>

!!! esercizio "Esercizio 9.11: Modello PLI del problema dello zaino a scelta multipla"

    Il problema dello zaino a scelta multipla (MCKP) e il suo modello $\mathrm{ILP}_{\mathrm{MCKP}}$ sono nel [Capitolo 9 «Formulazioni dei problemi di zaino»](../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-a-scelta-multipla.md). Consideriamo uno zaino di capacità $c = 14$ e un insieme $\mathscr{I} = \{1,2,\dots,7\}$ di $7$ oggetti ($n = 7$), partizionato in $q = 3$ classi $\mathscr{J}_1 = \{1,2\}$, $\mathscr{J}_2 = \{3,4,5\}$ e $\mathscr{J}_3 = \{6,7\}$, con i seguenti profitti e pesi:

    $$
    \begin{array}{l|rrrrrrr}
    \hline  & {j = 1} & {j = 2} & {j = 3} & {j = 4} & {j = 5} & {j = 6} & {j = 7} \\
    \hline {p_j} & {6} & {4} & {12} & {7} & {11} & {12} & {6} \\
    {w_j} & {6} & {6} & {4} & {3} & {6} & {3} & {8} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Scrivere il modello $\mathrm{ILP}_{\mathrm{MCKP}}$ del capitolo per questa istanza.

    2. Risolvere il modello con Gurobi. Dare il valore ottimo, una soluzione ottima e la soluzione associata del MCKP, e dire se la soluzione ottima è unica.

??? soluzione "Soluzione"

    1. Il modello ha $7$ variabili binarie, un vincolo di capacità e $q = 3$ vincoli di classe (oltre ai domini delle variabili). Il modello $\mathrm{ILP}_{\mathrm{MCKP}}$ per questa istanza è:

        $$
        \begin{array}{rrrrrrrrcl}
        {\max} & {6\,x_{1}} & {+\,4\,x_{2}} & {+\,12\,x_{3}} & {+\,7\,x_{4}} & {+\,11\,x_{5}} & {+\,12\,x_{6}} & {+\,6\,x_{7}} \\[1ex]
        \text{soggetto a} & {6\,x_{1}} & {+\,6\,x_{2}} & {+\,4\,x_{3}} & {+\,3\,x_{4}} & {+\,6\,x_{5}} & {+\,3\,x_{6}} & {+\,8\,x_{7}} & {\le} & {14} \\
        & {x_{1}} & {+\,x_{2}} &  &  &  &  &  & {=} & {1} \\
        &  &  & {x_{3}} & {+\,x_{4}} & {+\,x_{5}} &  &  & {=} & {1} \\
        &  &  &  &  &  & {x_{6}} & {+\,x_{7}} & {=} & {1} \\[1ex]
        & {x_{1}}, & {x_{2}}, & {x_{3}}, & {x_{4}}, & {x_{5}}, & {x_{6}}, & {x_{7}} & {\in} & {\{0,1\}}
        \end{array}
        $$

    2. Gurobi restituisce il valore ottimo $z(\mathrm{ILP}_{\mathrm{MCKP}}) = 30$. Una soluzione ottima è

        $$
        \tilde x_{1}=1,~~\tilde x_{2}=0,~~\tilde x_{3}=1,~~\tilde x_{4}=0,~~\tilde x_{5}=0,~~\tilde x_{6}=1,~~\tilde x_{7}=0
        $$

        Il sottoinsieme associato è $\tilde S = \{1,3,6\}$: un oggetto per classe, con peso totale $6 + 4 + 3 = 13 \le 14$.

        Solo $4$ delle $12$ scelte di un oggetto per classe entrano nello zaino; enumerandole si vede che la soluzione ottima è unica.

<a id="esercizio-9-12"></a>

!!! esercizio "Esercizio 9.12: Modello PLI del problema dello zaino con setup"

    Il problema dello zaino con setup (KPS) e il suo modello $\mathrm{ILP}_{\mathrm{KPS}}$ sono nel [Capitolo 9 «Formulazioni dei problemi di zaino»](../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-con-setup.md). Consideriamo uno zaino di capacità $c = 19$ e un insieme $\mathscr{I} = \{1,2,\dots,6\}$ di $6$ oggetti ($n = 6$), partizionato in $q = 2$ classi $\mathscr{J}_1 = \{1,2,3\}$ e $\mathscr{J}_2 = \{4,5,6\}$, con costi di setup $f_1 = 4$, $f_2 = 2$, pesi di setup $s_1 = 1$, $s_2 = 4$, e i seguenti ricavi e pesi:

    $$
    \begin{array}{l|rrrrrr}
    \hline  & {j = 1} & {j = 2} & {j = 3} & {j = 4} & {j = 5} & {j = 6} \\
    \hline {p_j} & {4} & {3} & {8} & {5} & {4} & {11} \\
    {w_j} & {7} & {6} & {3} & {6} & {7} & {4} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Scrivere il modello $\mathrm{ILP}_{\mathrm{KPS}}$ del capitolo per questa istanza.

    2. Risolvere il modello con Gurobi. Dare il valore ottimo, una soluzione ottima e la soluzione associata del KPS, e dire se la soluzione ottima è unica.

??? soluzione "Soluzione"

    1. Il modello ha $6$ variabili $x_j$, $q = 2$ variabili $y_h$, un vincolo di capacità e $n = 6$ vincoli di collegamento $x_j \le y_h$, scritti come $x_j - y_h \le 0$ (oltre ai domini delle variabili). Il modello $\mathrm{ILP}_{\mathrm{KPS}}$ per questa istanza è:

        $$
        \begin{array}{rrrrrrrrrcl}
        {\max} & {4\,x_{1}} & {+\,3\,x_{2}} & {+\,8\,x_{3}} & {+\,5\,x_{4}} & {+\,4\,x_{5}} & {+\,11\,x_{6}} & {-\,4\,y_{1}} & {-\,2\,y_{2}} \\[1ex]
        \text{soggetto a} & {7\,x_{1}} & {+\,6\,x_{2}} & {+\,3\,x_{3}} & {+\,6\,x_{4}} & {+\,7\,x_{5}} & {+\,4\,x_{6}} & {+\,y_{1}} & {+\,4\,y_{2}} & {\le} & {19} \\
        & {x_{1}} &  &  &  &  &  & {-\,y_{1}} &  & {\le} & {0} \\
        &  & {x_{2}} &  &  &  &  & {-\,y_{1}} &  & {\le} & {0} \\
        &  &  & {x_{3}} &  &  &  & {-\,y_{1}} &  & {\le} & {0} \\
        &  &  &  & {x_{4}} &  &  &  & {-\,y_{2}} & {\le} & {0} \\
        &  &  &  &  & {x_{5}} &  &  & {-\,y_{2}} & {\le} & {0} \\
        &  &  &  &  &  & {x_{6}} &  & {-\,y_{2}} & {\le} & {0} \\[1ex]
        & {x_{1}}, & {x_{2}}, & {x_{3}}, & {x_{4}}, & {x_{5}}, & {x_{6}} &  &  & {\in} & {\{0,1\}} \\
        &  &  &  &  &  &  & {y_{1}}, & {y_{2}} & {\in} & {\{0,1\}}
        \end{array}
        $$

    2. Gurobi restituisce il valore ottimo $z(\mathrm{ILP}_{\mathrm{KPS}}) = 18$. Una soluzione ottima è

        $$
        \tilde x_{1}=0,~~\tilde x_{2}=0,~~\tilde x_{3}=1,~~\tilde x_{4}=1,~~\tilde x_{5}=0,~~\tilde x_{6}=1,~~\tilde y_{1}=1,~~\tilde y_{2}=1
        $$

        Il sottoinsieme associato è $\tilde S = \{3,4,6\}$, che attiva entrambe le classi: il peso totale è $3 + 6 + 4 + 1 + 4 = 18 \le 19$, e il valore è $8 + 5 + 11 - 4 - 2 = 18$.

        Enumerando i $27$ sottoinsiemi ammissibili si vede che la soluzione ottima è unica.
