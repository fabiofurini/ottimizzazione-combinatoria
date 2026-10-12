---
title: "Zaini multipli"
---

# 9.10 Un modello PLI per il problema degli zaini multipli { #sez-sec-kpf-MKP }

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Problemi di zaino](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-pencil: Esercizi: Problemi di zaino](../../esercizi/knapsack-formulations.md) · [:material-gesture-tap: App: Rilassamento continuo e upper bound per lo zaino 0/1](../../laboratorio/zaino-rilassamento-bound.md)

</div>

Il problema degli zaini multipli e la sua istanza di riferimento (Esempio 2.6) sono definiti nel [Capitolo 2 «Problemi di zaino», Sezione 2.7](../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-degli-zaini-multipli.md).

- Introduciamo le seguenti $n \, m$ <strong>variabili binarie</strong>:

    \begin{equation*}
    \label{BIN_VAR_MKP}
    x_{jk} = \left\{ \begin{array}{ll}
    1 & \textrm{se l'oggetto $j$ è inserito nello zaino $k$}\\[1.5ex]
    0 & \textrm{altrimenti}
    \end{array} \qquad \forall j \in \mathscr{I},~\forall k \in \mathscr{K}. \right. \tag{9.28}
    \end{equation*}

!!! chiave ""

    Con queste variabili, un modello di programmazione lineare intera (PLI) per il problema degli zaini multipli (MKP) è il seguente:

    <a id="eq-NAT_MKP"></a>

    \begin{align*}
    &&   \max \;\;{\sum_{k \in \mathscr{K}} \sum_{j \in \mathscr{I}} p_j \, x_{jk}}                               \label{obj_MKP}  \tag{9.29a}\\[1ex]
    && \text{soggetto a} \quad  {\sum_{j \in \mathscr{I}} w_j \, x_{jk}}  &\leq c_k, & \forall k \in \mathscr{K},                       \label{cons1_MKP}  \tag{9.29b}\\[1ex]
    && {\sum_{k \in \mathscr{K}} x_{jk}}  &\leq 1, & \forall j \in \mathscr{I},                       \label{cons2_MKP}  \tag{9.29c}\\[1ex]
    &&x_{jk}                        &\in  \{0,1\}, & \forall j \in \mathscr{I},~\forall k \in \mathscr{K}. \label{cons3_MKP} \tag{9.29d}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{MKP}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{MKP}}$:

    - la funzione obiettivo lineare $\eqref{obj_MKP}$ massimizza il profitto totale degli oggetti inseriti negli zaini;

    - i vincoli $\eqref{cons1_MKP}$ garantiscono che, in ogni zaino $k$, il peso totale degli oggetti assegnati non superi la capacità $c_k$ ($m$ vincoli lineari, uno per ogni zaino);

    - i vincoli $\eqref{cons2_MKP}$ garantiscono che ogni oggetto sia inserito in al più uno zaino ($n$ vincoli lineari, uno per ogni oggetto);

    - infine, i vincoli $\eqref{cons3_MKP}$ definiscono le variabili del modello PLI.

<a id="box-24-texexp_ilp_mkp"></a>

!!! esempio "Esempio 9.14: modello $\mathrm{ILP}_{\mathrm{MKP}}$"

    Consideriamo $m = 2$ zaini con capacità $c_1 = 10$ e $c_2 = 12$, e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n = 5$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|rrrrr}
    \hline  & {j = 1} & {j = 2} & {j = 3} & {j = 4} & {j = 5} \\
    \hline {p_j} & {6} & {8} & {5} & {7} & {9} \\
    {w_j} & {4} & {6} & {5} & {3} & {7} \\
    \hline
    \end{array}
    $$

    Questa è l'istanza del MKP dell'Esempio 2.6. Il modello ha $10$ variabili, quindi scriviamo un vincolo per riga. Il modello $\mathrm{ILP}_{\mathrm{MKP}}$ per questa istanza è:

    $$
    \begin{array}{rlcl}
    {\max} & {6\,x_{11} + 8\,x_{21} + 5\,x_{31} + 7\,x_{41} + 9\,x_{51}} &  &  \\
    & {+\, 6\,x_{12} + 8\,x_{22} + 5\,x_{32} + 7\,x_{42} + 9\,x_{52}} &  &  \\[0.5ex]
    \text{soggetto a} & {4\,x_{11} + 6\,x_{21} + 5\,x_{31} + 3\,x_{41} + 7\,x_{51}} & {\le} & {10} \\
    & {4\,x_{12} + 6\,x_{22} + 5\,x_{32} + 3\,x_{42} + 7\,x_{52}} & {\le} & {12} \\[0.5ex]
    & {x_{11} + x_{12}} & {\le} & {1} \\
    & {x_{21} + x_{22}} & {\le} & {1} \\
    & {x_{31} + x_{32}} & {\le} & {1} \\
    & {x_{41} + x_{42}} & {\le} & {1} \\
    & {x_{51} + x_{52}} & {\le} & {1} \\[0.5ex]
    & {x_{11},~x_{21},~x_{31},~x_{41},~x_{51},~x_{12},~x_{22},~x_{32},~x_{42},~x_{52}} & {\in} & {\{0,1\}}
    \end{array}
    $$

    Una soluzione ottima $~{\tilde{\vet x}}(\mathrm{ILP}_{\mathrm{MKP}})$ è:

    $$
    \tilde x_{11}=\tilde x_{21}=1,~~\tilde x_{42}=\tilde x_{52}=1,~~\textrm{e tutte le altre variabili pari a $0$.}
    $$

    Il valore ottimo $z(\mathrm{ILP}_{\mathrm{MKP}})$ è $30$. La soluzione ottima associata del MKP è $(\tilde{S}_1,\tilde{S}_2) = (\{1,2\},\{4,5\})$. La soluzione ottima non è unica: $(\{2,4\},\{1,5\})$ e $(\{4,5\},\{1,2\})$ hanno lo stesso valore.

---

**Avanti:** [9.11 Un modello PLI per il problema dello zaino a scelta multipla](un-modello-pli-per-il-problema-dello-zaino-a-scelta-multipla.md)
