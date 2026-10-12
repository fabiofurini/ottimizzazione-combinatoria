---
title: "Subset sum"
---

# 9.6 Un modello PLI per il problema del subset sum { #sez-sec-kpf-SSP }

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Problemi di zaino](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-pencil: Esercizi: Problemi di zaino](../../esercizi/knapsack-formulations.md) · [:material-gesture-tap: App: Rilassamento continuo e upper bound per lo zaino 0/1](../../laboratorio/zaino-rilassamento-bound.md)

</div>

Il problema del subset sum e la sua istanza di riferimento (Esempio 2.2) sono definiti nel [Capitolo 2 «Problemi di zaino», Sezione 2.3](../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-del-subset-sum.md).

- Introduciamo le seguenti $n$ <strong>variabili binarie</strong>:

    \begin{equation*}
    \label{BIN_VAR_SSP}
    x_j = \left\{ \begin{array}{ll}
    1 & \textrm{se l'oggetto $j$ è selezionato nel sottoinsieme}\\[1.5ex]
    0 & \textrm{altrimenti}
    \end{array} \qquad \forall j \in \mathscr{I}. \right. \tag{9.20}
    \end{equation*}

!!! chiave ""

    Con queste variabili, un modello di programmazione lineare intera (PLI) per il problema del subset sum (SSP) è il seguente:

    <a id="eq-NAT_SSP"></a>

    \begin{align*}
    &&   \max \;\;{\sum_{j \in \mathscr{I}} w_j \, x_j}                               \label{obj_SSP}  \tag{9.21a}\\[1ex]
    && \text{soggetto a} \quad  {\sum_{j \in \mathscr{I}} w_j \, x_j}  &\leq c,                       \label{cons1_SSP}  \tag{9.21b}\\[1ex]
    &&x_j                        &\in  \{0,1\}, & \forall j \in \mathscr{I}. \label{cons2_SSP} \tag{9.21c}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{SSP}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{SSP}}$:

    - la funzione obiettivo lineare $\eqref{obj_SSP}$ massimizza il peso totale degli oggetti selezionati nel sottoinsieme;

    - il vincolo $\eqref{cons1_SSP}$ garantisce che il peso totale degli oggetti selezionati non superi il valore obiettivo (un vincolo lineare);

    - infine, i vincoli $\eqref{cons2_SSP}$ definiscono le variabili del modello PLI.

- Il modello $\mathrm{ILP}_{\mathrm{SSP}}$ è il modello $\mathrm{ILP}_{\mathrm{KP}}$ con $p_j = w_j$, per ogni $j \in \mathscr{I}$: la risposta al SSP è <strong>sì</strong> se e solo se $z(\mathrm{ILP}_{\mathrm{SSP}}) = c$.

<a id="box-20-texexp_ilp_ssp"></a>

!!! esempio "Esempio 9.10: modello $\mathrm{ILP}_{\mathrm{SSP}}$"

    Consideriamo un valore obiettivo $c = 9$ e un insieme $\mathscr{I} = \{1,2,3,4,5,6\}$ di $6$ oggetti ($n = 6$), con i seguenti pesi:

    $$
    \begin{array}{l|rrrrrrr}
    \hline  & {j = 1} & {j = 2} & {j = 3} & {j = 4} & {j = 5} & {j = 6} \\
    \hline {w_j} & {2} & {3} & {6} & {7} & {5} & {9} \\
    \hline
    \end{array}
    $$

    Questa è l'istanza del SSP dell'Esempio 2.2. Il modello $\mathrm{ILP}_{\mathrm{SSP}}$ per questa istanza è:

    $$
    \begin{array}{rrrrrrrrrrrrr}
    {\max} & 2 \, {x_1} & + 3 \, {x_2} & + 6 \, {x_3} & + 7 \, {x_4} & + 5 \, {x_5} & + 9 \, {x_6} \\[0.5ex]
    \text{soggetto a} & 2 \, {x_1} & + 3 \, {x_2} & + 6 \, {x_3} & + 7 \, {x_4} & + 5 \, {x_5} & + 9 \, {x_6} & {\le} & 9 \\[0.5ex]
    & {x_1}, & {x_2}, & {x_3}, & {x_4}, & {x_5}, & {x_6} & { \in} & { \{0,1\}}
    \end{array}
    $$

    Una soluzione ottima $~{\tilde{\vet x}}(\mathrm{ILP}_{\mathrm{SSP}})$ è:

    $$
    \tilde x_1=1,~~\tilde x_2=0,~~\tilde  x_3=0,~~\tilde  x_4=1,~~\tilde  x_5=0,~~\tilde  x_6=0
    $$

    Il valore ottimo $z(\mathrm{ILP}_{\mathrm{SSP}})$ è $9 = c$, quindi la risposta al SSP è <strong>sì</strong>. Il sottoinsieme associato è $\tilde{S} =\{1,4\}$. La soluzione ottima non è unica: anche i sottoinsiemi $\{2,3\}$ e $\{6\}$ raggiungono il valore obiettivo.

---

**Avanti:** [9.7 Un modello PLI per il problema dello zaino limitato](un-modello-pli-per-il-problema-dello-zaino-limitato.md)
