---
title: "Zaino a scelta multipla"
---

# 9.11 Un modello PLI per il problema dello zaino a scelta multipla { #sez-sec-kpf-MCKP }

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Problemi di zaino](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-knapsack-formulations.pdf) · [:material-pencil: Esercizi: Problemi di zaino](../../esercizi/knapsack-formulations.md) · [:material-gesture-tap: App: Rilassamento continuo e upper bound per lo zaino 0/1](../../laboratorio/zaino-rilassamento-bound.md)

</div>

Il problema dello zaino a scelta multipla e la sua istanza di riferimento (Esempio 2.7) sono definiti nel [Capitolo 2 «Problemi di zaino», Sezione 2.8](../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-a-scelta-multipla.md).

- Introduciamo le seguenti $n$ <strong>variabili binarie</strong>:

    \begin{equation*}
    \label{BIN_VAR_MCKP}
    x_j = \left\{ \begin{array}{ll}
    1 & \textrm{se l'oggetto $j$ è selezionato nello zaino}\\[1.5ex]
    0 & \textrm{altrimenti}
    \end{array} \qquad \forall j \in \mathscr{I}. \right. \tag{9.30}
    \end{equation*}

!!! chiave ""

    Con queste variabili, un modello di programmazione lineare intera (PLI) per il problema dello zaino a scelta multipla (MCKP) è il seguente:

    <a id="eq-NAT_MCKP"></a>

    \begin{align*}
    &&   \max \;\;{\sum_{j \in \mathscr{I}} p_j \, x_j}                               \label{obj_MCKP}  \tag{9.31a}\\[1ex]
    && \text{soggetto a} \quad  {\sum_{j \in \mathscr{I}} w_j \, x_j}  &\leq c,                       \label{cons1_MCKP}  \tag{9.31b}\\[1ex]
    && {\sum_{j \in \mathscr{J}_h} x_j}  &= 1, & \forall h \in \{1,2,\dots,q\},                       \label{cons2_MCKP}  \tag{9.31c}\\[1ex]
    &&x_j                        &\in  \{0,1\}, & \forall j \in \mathscr{I}. \label{cons3_MCKP} \tag{9.31d}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{MCKP}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{MCKP}}$:

    - la funzione obiettivo lineare $\eqref{obj_MCKP}$ massimizza il profitto totale degli oggetti selezionati nello zaino;

    - il vincolo $\eqref{cons1_MCKP}$ garantisce che il peso totale degli oggetti selezionati non superi la capacità dello zaino (un vincolo lineare);

    - i vincoli $\eqref{cons2_MCKP}$ garantiscono che da ogni classe sia selezionato esattamente un oggetto ($q$ vincoli lineari, uno per ogni classe);

    - infine, i vincoli $\eqref{cons3_MCKP}$ definiscono le variabili del modello PLI.

<a id="box-25-texexp_ilp_mckp"></a>

!!! esempio "Esempio 9.15: modello $\mathrm{ILP}_{\mathrm{MCKP}}$"

    Consideriamo uno zaino di capacità $c = 15$ e un insieme $\mathscr{I} = \{1,2,3,4,5,6\}$ di $6$ oggetti ($n = 6$), partizionato in $q = 3$ classi $\mathscr{J}_1 = \{1,2\}$, $\mathscr{J}_2 = \{3,4\}$ e $\mathscr{J}_3 = \{5,6\}$, con i seguenti profitti e pesi:

    $$
    \begin{array}{l|rrrrrrr}
    \hline  & {j = 1} & {j = 2} & {j = 3} & {j = 4} & {j = 5} & {j = 6} \\
    \hline {p_j} & {6} & {8} & {5} & {7} & {4} & {9} \\
    {w_j} & {4} & {6} & {5} & {8} & {3} & {7} \\
    \hline
    \end{array}
    $$

    Questa è l'istanza del MCKP dell'Esempio 2.7. Il modello $\mathrm{ILP}_{\mathrm{MCKP}}$ per questa istanza è:

    $$
    \begin{array}{rrrrrrrrrrrrr}
    {\max} & 6 \, {x_1} & + 8 \, {x_2} & + 5 \, {x_3} & + 7 \, {x_4} & + 4 \, {x_5} & + 9 \, {x_6} \\[0.5ex]
    \text{soggetto a} & 4 \, {x_1} & + 6 \, {x_2} & + 5 \, {x_3} & + 8 \, {x_4} & + 3 \, {x_5} & + 7 \, {x_6} & {\le} & 15 \\[0.5ex]
    & {x_1} & + {x_2} &  &  &  &  & {=} & 1 \\[0.5ex]
    &  &  & {x_3} & + {x_4} &  &  & {=} & 1 \\[0.5ex]
    &  &  &  &  & {x_5} & + {x_6} & {=} & 1 \\[0.5ex]
    & {x_1}, & {x_2}, & {x_3}, & {x_4}, & {x_5}, & {x_6} & { \in} & { \{0,1\}}
    \end{array}
    $$

    Una soluzione ottima $~{\tilde{\vet x}}(\mathrm{ILP}_{\mathrm{MCKP}})$ è:

    $$
    \tilde x_1=1,~~\tilde x_2=0,~~\tilde  x_3=0,~~\tilde  x_4=1,~~\tilde  x_5=1,~~\tilde  x_6=0
    $$

    Il valore ottimo $z(\mathrm{ILP}_{\mathrm{MCKP}})$ è $17$. La soluzione ottima associata del MCKP è $\tilde{S} =\{1,4,5\}$. La soluzione ottima non è unica: il sottoinsieme $\{2,3,5\}$ ha lo stesso valore.

---

**Avanti:** [9.12 Un modello PLI per il problema dello zaino con setup](un-modello-pli-per-il-problema-dello-zaino-con-setup.md)
