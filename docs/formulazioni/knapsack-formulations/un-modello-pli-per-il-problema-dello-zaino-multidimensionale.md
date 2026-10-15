---
title: "Zaino multidimensionale"
---

# 9.9 Un modello PLI per il problema dello zaino multidimensionale { #sez-sec-kpf-MDKP }

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Problemi di zaino](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-knapsack-formulations.pdf) · [:material-pencil: Esercizi: Problemi di zaino](../../esercizi/knapsack-formulations.md) · [:material-gesture-tap: App: Rilassamento continuo e upper bound per lo zaino 0/1](../../laboratorio/zaino-rilassamento-bound.md)

</div>

Il problema dello zaino multidimensionale e la sua istanza di riferimento (Esempio 2.5) sono definiti nel [Capitolo 2 «Problemi di zaino», Sezione 2.6](../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-multidimensionale.md).

- Introduciamo le seguenti $n$ <strong>variabili binarie</strong>:

    \begin{equation*}
    \label{BIN_VAR_MDKP}
    x_j = \left\{ \begin{array}{ll}
    1 & \textrm{se l'oggetto $j$ è selezionato nello zaino}\\[1.5ex]
    0 & \textrm{altrimenti}
    \end{array} \qquad \forall j \in \mathscr{I}. \right. \tag{9.26}
    \end{equation*}

!!! chiave ""

    Con queste variabili, un modello di programmazione lineare intera (PLI) per il problema dello zaino multidimensionale (MDKP) è il seguente:

    <a id="eq-NAT_MDKP"></a>

    \begin{align*}
    &&   \max \;\;{\sum_{j \in \mathscr{I}} p_j \, x_j}                               \label{obj_MDKP}  \tag{9.27a}\\[1ex]
    && \text{soggetto a} \quad  {\sum_{j \in \mathscr{I}} w_{dj} \, x_j}  &\leq c_d, & \forall d \in \mathscr{D},                       \label{cons1_MDKP}  \tag{9.27b}\\[1ex]
    &&x_j                        &\in  \{0,1\}, & \forall j \in \mathscr{I}. \label{cons2_MDKP} \tag{9.27c}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{MDKP}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{MDKP}}$:

    - la funzione obiettivo lineare $\eqref{obj_MDKP}$ massimizza il profitto totale degli oggetti selezionati nello zaino;

    - i vincoli $\eqref{cons1_MDKP}$ garantiscono che, in ogni dimensione $d$, il peso totale degli oggetti selezionati non superi la capacità $c_d$ ($k$ vincoli lineari, uno per ogni dimensione);

    - infine, i vincoli $\eqref{cons2_MDKP}$ definiscono le variabili del modello PLI.

<a id="box-23-texexp_ilp_mdkp"></a>

!!! esempio "Esempio 9.13: modello $\mathrm{ILP}_{\mathrm{MDKP}}$"

    Consideriamo uno zaino a $2$ dimensioni ($k = 2$) con capacità $c_1 = 10$ e $c_2 = 12$, e un insieme $\mathscr{I} = \{1,2,3,4\}$ di $4$ oggetti ($n = 4$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|rrrr}
    \hline  & {j = 1} & {j = 2} & {j = 3} & {j = 4} \\
    \hline {p_j} & {6} & {7} & {5} & {9} \\
    {w_{1j}} & {4} & {5} & {3} & {7} \\
    {w_{2j}} & {6} & {4} & {5} & {3} \\
    \hline
    \end{array}
    $$

    Questa è l'istanza del MDKP dell'Esempio 2.5. Il modello $\mathrm{ILP}_{\mathrm{MDKP}}$ per questa istanza è:

    $$
    \begin{array}{rrrrrrr}
    {\max} & 6 \, {x_1} & + 7 \, {x_2} & + 5 \, {x_3} & + 9 \, {x_4} \\[0.5ex]
    \text{soggetto a} & 4 \, {x_1} & + 5 \, {x_2} & + 3 \, {x_3} & + 7 \, {x_4} & {\le} & 10 \\[0.5ex]
    & 6 \, {x_1} & + 4 \, {x_2} & + 5 \, {x_3} & + 3 \, {x_4} & {\le} & 12 \\[0.5ex]
    & {x_1}, & {x_2}, & {x_3}, & {x_4} & { \in} & { \{0,1\}}
    \end{array}
    $$

    Una soluzione ottima $~{\tilde{\vet x}}(\mathrm{ILP}_{\mathrm{MDKP}})$ è:

    $$
    \tilde x_1=0,~~\tilde x_2=0,~~\tilde  x_3=1,~~\tilde  x_4=1
    $$

    Il valore ottimo $z(\mathrm{ILP}_{\mathrm{MDKP}})$ è $14$. La soluzione ottima associata del MDKP è $\tilde{S} =\{3,4\}$, ed è l'unica soluzione ottima.

---

**Avanti:** [9.10 Un modello PLI per il problema degli zaini multipli](un-modello-pli-per-il-problema-degli-zaini-multipli.md)
