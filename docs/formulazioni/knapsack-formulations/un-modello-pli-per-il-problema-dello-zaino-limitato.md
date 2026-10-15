---
title: "Zaino limitato"
---

# 9.7 Un modello PLI per il problema dello zaino limitato { #sez-sec-kpf-BKP }

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Problemi di zaino](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-knapsack-formulations.pdf) · [:material-pencil: Esercizi: Problemi di zaino](../../esercizi/knapsack-formulations.md) · [:material-gesture-tap: App: Rilassamento continuo e upper bound per lo zaino 0/1](../../laboratorio/zaino-rilassamento-bound.md)

</div>

Il problema dello zaino limitato e la sua istanza di riferimento (Esempio 2.3) sono definiti nel [Capitolo 2 «Problemi di zaino», Sezione 2.4](../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-limitato.md).

- Introduciamo le seguenti $n$ <strong>variabili intere</strong>:

    \begin{equation*}
    \label{INT_VAR_BKP}
    x_j = \textrm{numero di copie dell'oggetto $j$ inserite nello zaino} \qquad \forall j \in \mathscr{I}. \tag{9.22}
    \end{equation*}

!!! chiave ""

    Con queste variabili, un modello di programmazione lineare intera (PLI) per il problema dello zaino limitato (BKP) è il seguente:

    <a id="eq-NAT_BKP"></a>

    \begin{align*}
    &&   \max \;\;{\sum_{j \in \mathscr{I}} p_j \, x_j}                               \label{obj_BKP}  \tag{9.23a}\\[1ex]
    && \text{soggetto a} \quad  {\sum_{j \in \mathscr{I}} w_j \, x_j}  &\leq c,                       \label{cons1_BKP}  \tag{9.23b}\\[1ex]
    &&x_j                        &\in  \{0,1,\dots,b_j\}, & \forall j \in \mathscr{I}. \label{cons2_BKP} \tag{9.23c}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{BKP}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{BKP}}$:

    - la funzione obiettivo lineare $\eqref{obj_BKP}$ massimizza il profitto totale delle copie degli oggetti selezionate nello zaino;

    - il vincolo $\eqref{cons1_BKP}$ garantisce che il peso totale delle copie selezionate non superi la capacità dello zaino (un vincolo lineare);

    - infine, i vincoli $\eqref{cons2_BKP}$ definiscono le variabili del modello PLI: ogni oggetto $j$ si prende al più $b_j$ volte.

<a id="box-21-texexp_ilp_bkp"></a>

!!! esempio "Esempio 9.11: modello $\mathrm{ILP}_{\mathrm{BKP}}$"

    Consideriamo uno zaino di capacità $c = 9$ e un insieme $\mathscr{I} = \{1,2,3,4,5,6\}$ di $6$ oggetti ($n = 6$), con i seguenti profitti, pesi e copie disponibili:

    $$
    \begin{array}{l|rrrrrrr}
    \hline  & {j = 1} & {j = 2} & {j = 3} & {j = 4} & {j = 5} & {j = 6} \\
    \hline {p_j} & {6} & {5} & {8} & {9} & {6} & {7} \\
    {w_j} & {2} & {3} & {6} & {7} & {5} & {9} \\
    {b_j} & {2} & {2} & {1} & {1} & {1} & {1} \\
    \hline
    \end{array}
    $$

    Questa è l'istanza del BKP dell'Esempio 2.3. Il modello $\mathrm{ILP}_{\mathrm{BKP}}$ per questa istanza è:

    $$
    \begin{array}{rrrrrrrrrrrrr}
    {\max} & 6 \, {x_1} & + 5 \, {x_2} & + 8 \, {x_3} & + 9 \, {x_4} & + 6 \, {x_5} & + 7 \, {x_6} \\[0.5ex]
    \text{soggetto a} & 2 \, {x_1} & + 3 \, {x_2} & + 6 \, {x_3} & + 7 \, {x_4} & + 5 \, {x_5} & + 9 \, {x_6} & {\le} & 9 \\[0.5ex]
    & {x_1}, & {x_2} &  &  &  &  & { \in} & { \{0,1,2\}} \\[0.5ex]
    &  &  & {x_3}, & {x_4}, & {x_5}, & {x_6} & { \in} & { \{0,1\}}
    \end{array}
    $$

    Una soluzione ottima $~{\tilde{\vet x}}(\mathrm{ILP}_{\mathrm{BKP}})$ è:

    $$
    \tilde x_1=2,~~\tilde x_2=0,~~\tilde  x_3=0,~~\tilde  x_4=0,~~\tilde  x_5=1,~~\tilde  x_6=0
    $$

    Il valore ottimo $z(\mathrm{ILP}_{\mathrm{BKP}})$ è $18$. La soluzione ottima associata del BKP prende due copie dell'oggetto $1$ e una copia dell'oggetto $5$, ed è l'unica soluzione ottima.

---

**Avanti:** [9.8 Un modello PLI per il problema dello zaino illimitato](un-modello-pli-per-il-problema-dello-zaino-illimitato.md)
