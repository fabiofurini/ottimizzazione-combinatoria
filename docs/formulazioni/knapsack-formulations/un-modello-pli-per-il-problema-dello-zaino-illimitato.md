---
title: "Zaino illimitato"
---

# 9.8 Un modello PLI per il problema dello zaino illimitato { #sez-sec-kpf-UKP }

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Problemi di zaino](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-knapsack-formulations.pdf) · [:material-pencil: Esercizi: Problemi di zaino](../../esercizi/knapsack-formulations.md) · [:material-gesture-tap: App: Rilassamento continuo e upper bound per lo zaino 0/1](../../laboratorio/zaino-rilassamento-bound.md)

</div>

Il problema dello zaino illimitato e la sua istanza di riferimento (Esempio 2.4) sono definiti nel [Capitolo 2 «Problemi di zaino», Sezione 2.5](../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-illimitato.md).

- Introduciamo le seguenti $n$ <strong>variabili intere</strong>:

    \begin{equation*}
    \label{INT_VAR_UKP}
    x_j = \textrm{numero di copie dell'oggetto $j$ inserite nello zaino} \qquad \forall j \in \mathscr{I}. \tag{9.24}
    \end{equation*}

!!! chiave ""

    Con queste variabili, un modello di programmazione lineare intera (PLI) per il problema dello zaino illimitato (UKP) è il seguente:

    <a id="eq-NAT_UKP"></a>

    \begin{align*}
    &&   \max \;\;{\sum_{j \in \mathscr{I}} p_j \, x_j}                               \label{obj_UKP}  \tag{9.25a}\\[1ex]
    && \text{soggetto a} \quad  {\sum_{j \in \mathscr{I}} w_j \, x_j}  &\leq c,                       \label{cons1_UKP}  \tag{9.25b}\\[1ex]
    &&x_j                        &\in  \Z_{\ge 0}, & \forall j \in \mathscr{I}. \label{cons2_UKP} \tag{9.25c}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{UKP}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{UKP}}$:

    - la funzione obiettivo lineare $\eqref{obj_UKP}$ massimizza il profitto totale delle copie degli oggetti selezionate nello zaino;

    - il vincolo $\eqref{cons1_UKP}$ garantisce che il peso totale delle copie selezionate non superi la capacità dello zaino (un vincolo lineare);

    - infine, i vincoli $\eqref{cons2_UKP}$ definiscono le variabili del modello PLI; il vincolo di capacità dà già $x_j \le \hat{b}_j = \lfloor c/w_j \rfloor$, per ogni $j \in \mathscr{I}$.

<a id="box-22-texexp_ilp_ukp"></a>

!!! esempio "Esempio 9.12: modello $\mathrm{ILP}_{\mathrm{UKP}}$"

    Consideriamo uno zaino di capacità $c = 9$ e un insieme $\mathscr{I} = \{1,2,3,4,5,6\}$ di $6$ oggetti ($n = 6$), ciascuno disponibile in un numero illimitato di copie, con i seguenti profitti e pesi:

    $$
    \begin{array}{l|rrrrrrr}
    \hline  & {j = 1} & {j = 2} & {j = 3} & {j = 4} & {j = 5} & {j = 6} \\
    \hline {p_j} & {6} & {5} & {8} & {9} & {6} & {7} \\
    {w_j} & {2} & {3} & {6} & {7} & {5} & {9} \\
    \hline
    \end{array}
    $$

    Questa è l'istanza dell'UKP dell'Esempio 2.4. Il modello $\mathrm{ILP}_{\mathrm{UKP}}$ per questa istanza è:

    $$
    \begin{array}{rrrrrrrrrrrrr}
    {\max} & 6 \, {x_1} & + 5 \, {x_2} & + 8 \, {x_3} & + 9 \, {x_4} & + 6 \, {x_5} & + 7 \, {x_6} \\[0.5ex]
    \text{soggetto a} & 2 \, {x_1} & + 3 \, {x_2} & + 6 \, {x_3} & + 7 \, {x_4} & + 5 \, {x_5} & + 9 \, {x_6} & {\le} & 9 \\[0.5ex]
    & {x_1}, & {x_2}, & {x_3}, & {x_4}, & {x_5}, & {x_6} & { \in} & { \Z_{\ge 0}}
    \end{array}
    $$

    Una soluzione ottima $~{\tilde{\vet x}}(\mathrm{ILP}_{\mathrm{UKP}})$ è:

    $$
    \tilde x_1=4,~~\tilde x_2=0,~~\tilde  x_3=0,~~\tilde  x_4=0,~~\tilde  x_5=0,~~\tilde  x_6=0
    $$

    Il valore ottimo $z(\mathrm{ILP}_{\mathrm{UKP}})$ è $24$. La soluzione ottima associata dell'UKP prende quattro copie dell'oggetto $1$, ed è l'unica soluzione ottima.

---

**Avanti:** [9.9 Un modello PLI per il problema dello zaino multidimensionale](un-modello-pli-per-il-problema-dello-zaino-multidimensionale.md)
