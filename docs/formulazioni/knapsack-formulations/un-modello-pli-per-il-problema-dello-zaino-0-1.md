---
title: "Zaino 0/1"
---

# 9.2 Un modello PLI per il problema dello zaino 0/1 { #sez-sec-kpf-KP }

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Problemi di zaino](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-knapsack-formulations.pdf) · [:material-pencil: Esercizi: Problemi di zaino](../../esercizi/knapsack-formulations.md) · [:material-gesture-tap: App: Rilassamento continuo e upper bound per lo zaino 0/1](../../laboratorio/zaino-rilassamento-bound.md)

</div>

Il problema dello zaino 0/1 e la sua istanza di riferimento (Esempio 2.1) sono definiti nel [Capitolo 2 «Problemi di zaino», Sezione 2.2](../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-0-1.md).

- Introduciamo le seguenti $n$ <strong>variabili binarie</strong>:

    \begin{equation*}
    \label{BIN_VAR}
    x_j = \left\{ \begin{array}{ll}
    1 & \textrm{se l'oggetto $j$ è selezionato nello zaino}\\[1.5ex]
    0 & \textrm{altrimenti}
    \end{array} \qquad \forall j \in \underbrace{\{1,2,\dots,n\}}_{=\mathscr{I}}. \right. \tag{9.1}
    \end{equation*}

!!! chiave ""

    Con queste variabili, un modello di programmazione lineare intera (PLI) per il problema dello zaino 0/1 (KP) è il seguente:

    <a id="eq-NAT_KP"></a>

    \begin{align*}
    &&   \max \;\;{\sum_{j \in \mathscr{I}} p_j \, x_j}                               \label{obj_KP}  \tag{9.2a}\\[1ex]
    && \text{soggetto a} \quad  {\sum_{j \in \mathscr{I}} w_j \, x_j}  &\leq c,                       \label{cons1_KP}  \tag{9.2b}\\[1ex]
    &&x_j                        &\in  \{0,1\}, & \forall j \in \mathscr{I}. \label{cons2_KP} \tag{9.2c}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{KP}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{KP}}$:

    - la funzione obiettivo lineare $\eqref{obj_KP}$ massimizza il profitto totale degli oggetti selezionati nello zaino;

    - il vincolo $\eqref{cons1_KP}$ garantisce che il peso totale degli oggetti selezionati non superi la capacità dello zaino (un vincolo lineare);

    - infine, i vincoli $\eqref{cons2_KP}$ definiscono le variabili del modello PLI.

<a id="box-1-texexp_ilp_kp"></a>

!!! esempio "Esempio 9.1: modello $\mathrm{ILP}_{\mathrm{KP}}$"

    Consideriamo uno zaino di capacità $c = 9$ e un insieme $\mathscr{I} = \{1,2,3,4,5,6\}$ di $6$ oggetti ($n = 6$), con i seguenti profitti e pesi:

    $$
    \begin{array}{l|rrrrrrr}
    \hline  & {j = 1} & {j = 2} & {j = 3} & {j = 4} & {j = 5} & {j = 6} \\
    \hline {p_j} & {6} & {5} & {8} & {9} & {6} & {7} \\
    {w_j} & {2} & {3} & {6} & {7} & {5} & {9} \\
    \hline
    \end{array}
    $$

    Questa è l'istanza del KP dell'Esempio 2.1, e la chiamiamo <span style="color:#1971c2">[Esempio 9.1](#box-1-texexp_ilp_kp)</span>. Il modello $\mathrm{ILP}_{\mathrm{KP}}$ per questa istanza è:

    $$
    \begin{array}{rrrrrrrrrrrrr}
    {\max} & 6 \, {x_1} & + 5 \, {x_2} & + 8 \, {x_3} & + 9 \, {x_4} & + 6 \, {x_5} & + 7 \, {x_6} \\[0.5ex]
    \text{soggetto a} & 2 \, {x_1} & + 3 \, {x_2} & + 6 \, {x_3} & + 7 \, {x_4} & + 5 \, {x_5} & + 9 \, {x_6} & {\le} & 9 \\[0.5ex]
    & {x_1}, & {x_2}, & {x_3}, & {x_4}, & {x_5}, & {x_6} & { \in} & { \{0,1\}}
    \end{array}
    $$

    Una soluzione ottima $~{\tilde{\vet x}}(\mathrm{ILP}_{\mathrm{KP}})$ è:

    $$
    \tilde x_1=1,~~\tilde x_2=0,~~\tilde  x_3=0,~~\tilde  x_4=1,~~\tilde  x_5=0,~~\tilde  x_6=0
    $$

    Il valore ottimo $z(\mathrm{ILP}_{\mathrm{KP}})$ è $15$. La soluzione ottima associata del KP è $\tilde{S} =\{1,4\}$, ed è l'unica soluzione ottima.

## 9.3 Un primo rilassamento lineare

!!! chiave ""

    Per ottenere un rilassamento lineare del modello $\mathrm{ILP}_{\mathrm{KP}}$, rilassiamo i vincoli $\eqref{cons2_KP}$ con i seguenti:

    \begin{equation*}
    \label{cons2_KP_LP}
    x_j \ge 0,~~~~~~ \forall j \in \mathscr{I}. \tag{9.3}
    \end{equation*}

    Questo modello PL si chiama modello $\mathrm{LP}\text{-}0_{\mathrm{KP}}$.

<a id="box-2-texexp_lp0_kp"></a>

!!! esempio "Esempio 9.2: modello $\mathrm{LP}\text{-}0_{\mathrm{KP}}$"

    Il modello $\mathrm{LP}\text{-}0_{\mathrm{KP}}$ per l'istanza del KP dell'<span style="color:#1971c2">[Esempio 9.1](#box-1-texexp_ilp_kp)</span> è:

    $$
    \begin{array}{rrrrrrrrrrrrr}
    {\max} & 6 \, {x_1} & + 5 \, {x_2} & + 8 \, {x_3} & + 9 \, {x_4} & + 6 \, {x_5} & + 7 \, {x_6} \\[1ex]
    \text{soggetto a} & 2 \, {x_1} & + 3 \, {x_2} & + 6 \, {x_3} & + 7 \, {x_4} & + 5 \, {x_5} & + 9 \, {x_6} & {\le} & 9 \\[1ex]
    & {x_1}, & {x_2}, & {x_3}, & {x_4}, & {x_5}, & {x_6} & { \ge} & { 0}
    \end{array}
    $$

    Una soluzione ottima $~{\tilde{\vet x}}(\mathrm{LP}\text{-}0_{\mathrm{KP}})$ è:

    $$
    \tilde{x}_1=\frac{9}{2},~~\tilde{x}_2=\tilde{x}_3=\tilde{x}_4=\tilde{x}_5=\tilde{x}_6=0
    $$

    Il valore ottimo $z(\mathrm{LP}\text{-}0_{\mathrm{KP}})$ è $27$.

    Di conseguenza, abbiamo l'upper bound:

    $$
    z(\mathrm{ILP}_{\mathrm{KP}}) \le 27
    $$

!!! chiave ""

    Con una variabile duale non negativa $\pi$ per il vincolo $\eqref{cons1_KP}$, il modello duale del modello $\mathrm{LP}\text{-}0_{\mathrm{KP}}$ è:

    <a id="eq-DUAL_0"></a>

    \begin{align*}
    &&   \min \;\; c \, \pi                                \label{eq:KP-obj_LP_D_0}  \tag{9.4a}\\[2ex]
    && \text{soggetto a} \quad  w_j \, \pi  &\geq p_j, & \forall j \in \mathscr{I},                       \label{eq:KP-cap_LP_D_0}  \tag{9.4b}\\[2ex]
    &&\pi                        &\ge  0\label{eq:KP-cont1_LP_D_0}. \tag{9.4c}
    \end{align*}

    Questo modello PL si chiama modello $D(\mathrm{LP}\text{-}0_{\mathrm{KP}})$.

<a id="box-3-texexp_dlp0_kp"></a>

!!! esempio "Esempio 9.3: modello $D(\mathrm{LP}\text{-}0_{\mathrm{KP}})$"

    Il modello duale $D(\mathrm{LP}\text{-}0_{\mathrm{KP}})$ per l'istanza del KP dell'<span style="color:#1971c2">[Esempio 9.1](#box-1-texexp_ilp_kp)</span> è:

    $$
    \begin{array}{rrrrrrrrrrrrrrrr}
    {\min} & 9 \, {\pi} \\[1ex]
    \text{soggetto a} & 2 \, {\pi} & {\ge} & 6 \\[1ex]
    & 3 \, {\pi} & {\ge} & 5 \\[1ex]
    & 6 \, {\pi} & {\ge} & 8 \\[1ex]
    & 7 \, {\pi} & {\ge} & 9 \\[1ex]
    & 5 \, {\pi} & {\ge} & 6 \\[1ex]
    & 9 \, {\pi} & {\ge} & 7 \\[1ex]
    & {\pi} & { \ge} & { 0}
    \end{array}
    $$

    Una soluzione ottima $~{\tilde{\pi}}(D(\mathrm{LP}\text{-}0_{\mathrm{KP}}))$ è:

    $$
    \tilde{\pi}=3
    $$

    Il valore ottimo $z(D(\mathrm{LP}\text{-}0_{\mathrm{KP}}))$ è $27$.

- La seguente proposizione fornisce le formule per calcolare una soluzione ottima del modello primale $\mathrm{LP}\text{-}0_{\mathrm{KP}}$ e del modello duale $D(\mathrm{LP}\text{-}0_{\mathrm{KP}})$.

<a id="box-4-propLP0KP"></a>

!!! teorema "Proposizione 9.1"

    Se il primo oggetto $j=1$ ha l'efficienza massima, una soluzione ottima del modello primale $\mathrm{LP}\text{-}0_{\mathrm{KP}}$ è:

    \begin{equation*}
    \label{PP_0}
    \tilde{x}_1=\frac{c}{w_1}
    {\rm ~~~~e~~~~~}
    \tilde{x}_j=0,  \quad \forall j \in\{2,3,\dots, n\}, \tag{9.5}
    \end{equation*}

    e una soluzione ottima del modello duale  $D(\mathrm{LP}\text{-}0_{\mathrm{KP}})$ è:

    \begin{equation*}
    \label{DD_0}
    \tilde{\pi}= \frac{p_1}{w_1}. \tag{9.6}
    \end{equation*}

<a id="box-5-corLP0KP"></a>

!!! teorema "Corollario 9.2"

    Il valore ottimo dei modelli primale $\mathrm{LP}\text{-}0_{\mathrm{KP}}$ e duale $D(\mathrm{LP}\text{-}0_{\mathrm{KP}})$ è:

    \begin{equation*}
    \label{VAL0}
    z(\mathrm{LP}\text{-}0_{\mathrm{KP}})
    =
    p_1 \frac{c}{w_1}
    =
    z(D(\mathrm{LP}\text{-}0_{\mathrm{KP}})) \tag{9.7}
    \end{equation*}

- La dimostrazione procede in tre passi:

    1. mostriamo che $\eqref{PP_0}$ è una soluzione ammissibile del modello primale $\mathrm{LP}\text{-}0_{\mathrm{KP}}$;

    2. mostriamo che $\eqref{DD_0}$ è una soluzione ammissibile del modello duale $D(\mathrm{LP}\text{-}0_{\mathrm{KP}})$;

    3. mostriamo che le due soluzioni ammissibili hanno lo stesso valore della funzione obiettivo.

    Quindi, per la dualità forte della PL, $\eqref{PP_0}$ e $\eqref{DD_0}$ sono una coppia di soluzioni ottime primale e duale.

??? dimostrazione "Dimostrazione"

    - **1.** Abbiamo:

        $$
        \sum_{j \in \mathscr{I}} w_j \, \tilde{x}_j = w_1 \; \frac{c}{w_1} = c
        $$

        quindi il vincolo $\eqref{cons1_KP}$ è soddisfatto.

        Poiché $\tilde{x}_j \ge 0$, per ogni $j \in \mathscr{I}$, i vincoli $\eqref{cons2_KP_LP}$ sono soddisfatti.

        Quindi $\eqref{PP_0}$ è una soluzione ammissibile del modello primale $\mathrm{LP}\text{-}0_{\mathrm{KP}}$.

    - **2.** Per ogni $j \in \mathscr{I}$, abbiamo:

        $$
        w_j \, \tilde{\pi} = w_j \; \frac{p_1}{w_1} \ge p_j \qquad \text{poiché} \qquad \frac{p_1}{w_1} \ge \frac{p_j}{w_j}
        $$

        quindi i vincoli $\eqref{eq:KP-cap_LP_D_0}$ sono soddisfatti.

        Abbiamo $\tilde{\pi} \ge 0$, quindi il vincolo $\eqref{eq:KP-cont1_LP_D_0}$ è soddisfatto.

        Quindi $\eqref{DD_0}$ è una soluzione ammissibile del modello duale $D(\mathrm{LP}\text{-}0_{\mathrm{KP}})$.

    - **3.** Per le funzioni obiettivo abbiamo:

        $$
        \sum_{j \in \mathscr{I}} p_j \, \tilde{x}_j = p_1 \; \frac{c}{w_1} = c \, \tilde{\pi}
        $$

        quindi i valori delle funzioni obiettivo primale e duale coincidono.

    Quindi, per la dualità forte della PL, $\eqref{PP_0}$ e $\eqref{DD_0}$ sono una coppia di soluzioni ottime primale e duale. <span class="qed">□</span>

## 9.4 Un secondo rilassamento lineare

!!! chiave ""

    Per ottenere un rilassamento lineare del modello $\mathrm{ILP}_{\mathrm{KP}}$, rilassiamo i vincoli $\eqref{cons2_KP}$ con i seguenti:

    \begin{align*}
    && x_j &\le 1,& \forall j \in \mathscr{I}, \label{cons2_KP_LP_bis} \tag{9.8a}\\[2ex]
    &&  x_j &\ge 0,& \forall j \in \mathscr{I}. \label{cons2_KP_LP_tris} \tag{9.8b}
    \end{align*}

    Questo modello PL si chiama modello $\mathrm{LP}_{\mathrm{KP}}$.

<a id="box-6-texexp_lp_kp"></a>

!!! esempio "Esempio 9.4: modello $\mathrm{LP}_{\mathrm{KP}}$"

    Il modello $\mathrm{LP}_{\mathrm{KP}}$ per l'istanza del KP dell'<span style="color:#1971c2">[Esempio 9.1](#box-1-texexp_ilp_kp)</span> è:

    $$
    \begin{array}{rrrrrrrrrrrrr}
    {\max} & 6 \, {x_1} & + 5 \, {x_2} & + 8 \, {x_3} & + 9 \, {x_4} & + 6 \, {x_5} & + 7 \, {x_6} \\[1ex]
    \text{soggetto a} & 2 \, {x_1} & + 3 \, {x_2} & + 6 \, {x_3} & + 7 \, {x_4} & + 5 \, {x_5} & + 9 \, {x_6} & {\le} & 9 \\[1ex]
    & {x_1} &  &  &  &  &  & {\le} & 1 \\
    &  & {x_2} &  &  &  &  & {\le} & 1 \\
    &  &  & {x_3} &  &  &  & {\le} & 1 \\
    &  &  &  & {x_4} &  &  & {\le} & 1 \\
    &  &  &  &  & {x_5} &  & {\le} & 1 \\
    &  &  &  &  &  & {x_6} & {\le} & 1 \\[1ex]
    & {x_1}, & {x_2}, & {x_3}, & {x_4}, & {x_5}, & {x_6} & { \ge} & { 0}
    \end{array}
    $$

    Una soluzione ottima $~{\tilde{\vet x}}(\mathrm{LP}_{\mathrm{KP}})$ è:

    $$
    \tilde{x}_1=\tilde{x}_2=1,~~\tilde{x}_3=\frac{2}{3},~~\tilde{x}_4=\tilde{x}_5=\tilde{x}_6=0
    $$

    Il valore ottimo $z(\mathrm{LP}_{\mathrm{KP}})$ è $\frac{49}{3}$.

    Di conseguenza, abbiamo l'upper bound:

    $$
    z(\mathrm{ILP}_{\mathrm{KP}}) \le \frac{49}{3}
    $$

!!! chiave ""

    Con una variabile duale non negativa $\pi$ per il vincolo $\eqref{cons1_KP}$ e una variabile duale non negativa $\mu_j$ per ogni vincolo $\eqref{cons2_KP_LP_bis}$, il modello duale del modello $\mathrm{LP}_{\mathrm{KP}}$ è:

    <a id="eq-DUAL"></a>

    \begin{align*}
    &&   \min \;\; c \, \pi + \;\;{\sum_{j \in \mathscr{I}}  \mu_j}                               \label{eq:KP-obj_LP_D}  \tag{9.9a}\\[2ex]
    && \text{soggetto a} \quad  w_j \, \pi + \mu_j  &\geq p_j, & \forall j \in \mathscr{I},                       \label{eq:KP-cap_LP_D}  \tag{9.9b}\\[2ex]
    &&\pi                        &\ge  0,\label{eq:KP-cont1_LP_D} \tag{9.9c}\\[2ex]
    &&\mu_j                        &\ge  0, & \forall j \in \mathscr{I}. \label{eq:KP-cont2_LP_D} \tag{9.9d}
    \end{align*}

    Questo modello PL si chiama modello $D(\mathrm{LP}_{\mathrm{KP}})$.

<a id="box-7-texexp_dlp_kp"></a>

!!! esempio "Esempio 9.5: modello $D(\mathrm{LP}_{\mathrm{KP}})$"

    Il modello duale $D(\mathrm{LP}_{\mathrm{KP}})$ per l'istanza del KP dell'<span style="color:#1971c2">[Esempio 9.1](#box-1-texexp_ilp_kp)</span> è:

    $$
    \begin{array}{rrrrrrrrrrrrrrrr}
    {\min} & 9 \, {\pi} & + {\mu_1} & + {\mu_2} & + {\mu_3} & + {\mu_4} & + {\mu_5} & + {\mu_6} \\[1ex]
    & 2 \, {\pi} & + {\mu_1} &  &  &  &  &  & {\ge} & 6 \\[1ex]
    & 3 \, {\pi} &  & + {\mu_2} &  &  &  &  & {\ge} & 5 \\[1ex]
    & 6 \, {\pi} &  &  & + {\mu_3} &  &  &  & {\ge} & 8 \\[1ex]
    & 7 \, {\pi} &  &  &  & + {\mu_4} &  &  & {\ge} & 9 \\[1ex]
    & 5 \, {\pi} &  &  &  &  & + {\mu_5} &  & {\ge} & 6 \\[1ex]
    & 9 \, {\pi} &  &  &  &  &  & + {\mu_6} & {\ge} & 7 \\[1ex]
    & {\pi,} & {\mu_1}, & {\mu_2}, & {\mu_3}, & {\mu_4}, & {\mu_5}, & {\mu_6} & { \ge} & { 0}
    \end{array}
    $$

    Una soluzione ottima $(\tilde{\pi},\tilde{\vet \mu})(D(\mathrm{LP}_{\mathrm{KP}}))$ è:

    $$
    \tilde{\pi}=\frac{4}{3},~~~~~\tilde{\mu}_1=\frac{10}{3},~~~\tilde{\mu}_2=1,~~~\tilde{\mu}_3=\tilde{\mu}_4=\tilde{\mu}_5=\tilde{\mu}_6=0
    $$

    Il valore ottimo $z(D(\mathrm{LP}_{\mathrm{KP}}))$ è $\frac{49}{3}$.

### 9.4.1 Efficienza degli oggetti

<a id="box-8-defEff"></a>

!!! definizione "Definizione 9.3: efficienza"

    L'<strong>efficienza</strong> di un oggetto $j \in \mathscr{I}$ è il rapporto fra il suo profitto e il suo peso:

    \begin{equation*}
    \label{eq:efficiency}
    \frac{p_j}{w_j} \tag{9.10}
    \end{equation*}

- L'efficienza di un oggetto misura la sua redditività per unità di peso: indica quanto profitto si ottiene per ogni unità di peso.

<a id="box-9-texexp_eff_kp"></a>

!!! esempio "Esempio 9.6: efficienze degli oggetti"

    Consideriamo l'istanza del KP dell'<span style="color:#1971c2">[Esempio 9.1](#box-1-texexp_ilp_kp)</span>. Abbiamo:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Oggetti</th>
    <th></th>
    <th><span class="arithmatex">\(j=1\)</span></th>
    <th><span class="arithmatex">\(j=2\)</span></th>
    <th><span class="arithmatex">\(j=3\)</span></th>
    <th><span class="arithmatex">\(j=4\)</span></th>
    <th><span class="arithmatex">\(j=5\)</span></th>
    <th><span class="arithmatex">\(j=6\)</span></th>
    </tr>
    <tr>
    <td>Profitti</td>
    <td><span class="arithmatex">\(p_j\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    </tr>
    <tr>
    <td>Pesi</td>
    <td><span class="arithmatex">\(w_j\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(9\)</span></td>
    </tr>
    <tr>
    <td>Efficienze</td>
    <td><span class="arithmatex">\(\frac{p_j}{w_j}\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(\frac{5}{3}\)</span></td>
    <td><span class="arithmatex">\(\frac{4}{3}\)</span></td>
    <td><span class="arithmatex">\(\frac{9}{7}\)</span></td>
    <td><span class="arithmatex">\(\frac{6}{5}\)</span></td>
    <td><span class="arithmatex">\(\frac{7}{9}\)</span></td>
    </tr>
    </table></div>

    Gli oggetti sono ordinati per efficienza non crescente, poiché:

    $$
    3 ~~\ge~~ \frac{5}{3} ~~\ge~~ \frac{4}{3} ~~\ge~~ \frac{9}{7} ~~\ge~~ \frac{6}{5} ~~\ge~~ \frac{7}{9}
    $$

!!! chiave ""

    Ordinare gli oggetti per efficienza non crescente richiede un algoritmo di ordinamento con tempo di calcolo $O(n \log n)$, che è una funzione polinomiale del numero $n$ di oggetti.

### 9.4.2 Oggetto critico e capacità residua

<a id="box-10-defSplit"></a>

!!! definizione "Definizione 9.4: oggetto critico e capacità residua"

    Dato un insieme $\mathscr{I}=\{1,2,\dots,n\}$ di $n$ oggetti ordinati per efficienza non crescente, l'<strong>oggetto critico</strong> è l'oggetto

    \begin{equation*}
    {s} \in \mathscr{I}
    ~~~~\text{tale che }~~~~
    \sum_{j=1}^{s-1} w_j \leq c
    ~~~~{\rm  e }~~~~
    \sum_{j=1}^{s} w_j > c
    \label{split_item} \tag{9.11}
    \end{equation*}

    e la <strong>capacità residua</strong> è

    \begin{equation*}
    \mathit{rc} = c - \sum_{j=1}^{s-1} w_j
    \label{res_cap} \tag{9.12}
    \end{equation*}

- L'oggetto critico è il primo che non entra per intero nello zaino se tutti i precedenti sono selezionati. In inglese si chiama <strong>split item</strong>, <strong>break item</strong> o <strong>critical item</strong>, e si può scrivere come

    \begin{equation*}
    s = \min \left\{ j \in \mathscr{I} : \sum_{k=1}^{j} w_k > c \right\}
    \end{equation*}

- La capacità residua è la capacità dello zaino che resta quando tutti gli oggetti che precedono l'oggetto critico sono selezionati. Soddisfa $0 \le \mathit{rc} < w_s$.

<a id="box-11-texexp_split_kp"></a>

!!! esempio "Esempio 9.7: oggetto critico e capacità residua"

    Per l'istanza del KP dell'<span style="color:#1971c2">[Esempio 9.1](#box-1-texexp_ilp_kp)</span>, l'oggetto critico è $s=3$ poiché:

    $$
    \sum_{j=1}^{2} w_j = 2+3= 5 \le 9 {\rm ~~~e~~~} \sum_{j=1}^{3} w_j = 2+3 + 6= 11 > 9
    $$

    e la capacità residua è:

    $$
    \mathit{rc} = c - \sum_{j=1}^{2} w_j = 9 - 2 - 3 = 4
    $$

- La seguente proposizione fornisce le formule per calcolare una soluzione ottima del modello primale $\mathrm{LP}_{\mathrm{KP}}$ e del modello duale $D(\mathrm{LP}_{\mathrm{KP}})$.

<a id="box-12-propLPKP"></a>

!!! teorema "Proposizione 9.5"

    Se gli oggetti sono ordinati per efficienza non crescente, una soluzione ottima del modello primale $\mathrm{LP}_{\mathrm{KP}}$ è:

    \begin{equation*}
    \label{PP}
    \tilde{x}_j=1, \quad \forall j \in \{1,2,\dots, s-1\}  , ~~~~
    \tilde{x}_s= \frac{\mathit{rc}}{w_s}
    {\rm ~~~e~~~}
    \tilde{x}_j=0,  \quad \forall j\in\{s+1,s+2,\dots, n\}, \tag{9.13}
    \end{equation*}

    e una soluzione ottima del modello duale  $D(\mathrm{LP}_{\mathrm{KP}})$ è:

    \begin{equation*}
    \label{DD}
    \tilde{\pi}= \frac{p_s}{w_s}, \qquad
    \tilde{\mu}_j = p_j  - w_j \; \frac{p_s}{w_s},~~ \forall j \in \{1,2,\dots, s - 1\}
    {\rm ~~~e~~~}
    \tilde{\mu}_j = 0,~~ \forall j \in \{s,s+1,\dots, n\}. \tag{9.14}
    \end{equation*}

<a id="box-13-corLPKP"></a>

!!! teorema "Corollario 9.6"

    Il valore ottimo dei modelli primale $\mathrm{LP}_{\mathrm{KP}}$ e duale $D(\mathrm{LP}_{\mathrm{KP}})$ è:

    \begin{equation*}
    \label{VAL}
    z(\mathrm{LP}_{\mathrm{KP}})
    =
    \sum_{j=1}^{s-1} p_j
    +
    p_s \frac{\mathit{rc}}{w_s}
    =
    z(D(\mathrm{LP}_{\mathrm{KP}})) \tag{9.15}
    \end{equation*}

- La dimostrazione procede in tre passi:

    1. mostriamo che $\eqref{PP}$ è una soluzione ammissibile del modello primale $\mathrm{LP}_{\mathrm{KP}}$;

    2. mostriamo che $\eqref{DD}$ è una soluzione ammissibile del modello duale $D(\mathrm{LP}_{\mathrm{KP}})$;

    3. mostriamo che le due soluzioni ammissibili hanno lo stesso valore della funzione obiettivo.

    Quindi, per la dualità forte della PL, $\eqref{PP}$ e $\eqref{DD}$ sono una coppia di soluzioni ottime primale e duale.

??? dimostrazione "Dimostrazione"

    - **1.** Abbiamo:

        $$
        {\sum_{j \in \mathscr{I}} w_j \, \tilde{x}_j} = \sum_{j=1}^{s-1} w_j + w_s \frac{\mathit{rc}}{w_s} = \sum_{j=1}^{s-1} w_j + c - \sum_{j=1}^{s-1} w_j = c
        $$

        quindi il vincolo $\eqref{cons1_KP}$ è soddisfatto.

        Poiché $\mathit{rc} < w_s$, abbiamo $0 \le \tilde{x}_j \le 1$, per ogni $j \in \mathscr{I}$. Di conseguenza, i vincoli $\eqref{cons2_KP_LP_bis}$ e $\eqref{cons2_KP_LP_tris}$ sono soddisfatti.

        Quindi $\eqref{PP}$ è una soluzione ammissibile del modello primale $\mathrm{LP}_{\mathrm{KP}}$.

    <p class="qed-riga"><span class="qed">□</span></p>

??? dimostrazione "Dimostrazione"

    - **2.** Per ogni $j \in \{1,2,\dots, s-1\}$, abbiamo:

        $$
        w_j \, \tilde{\pi} + \tilde{\mu}_j = w_j \; \frac{p_s}{w_s } + \bigg(p_j  - w_j \; \frac{p_s}{w_s }\bigg) = p_j
        $$

        e, per ogni $j \in \{s,s+1\dots, n\}$, abbiamo:

        $$
        w_j \, \tilde{\pi} + \tilde{\mu}_j = w_j \; \frac{p_s}{w_s }   \ge p_j \text{     poiché      }   \frac{p_s}{w_s }   \ge \frac{p_j}{w_j}
        $$

        quindi i vincoli $\eqref{eq:KP-cap_LP_D}$ sono soddisfatti.

        Abbiamo $\tilde{\pi} \ge 0$. Per ogni $j \in \{1,2,\dots, s - 1\}$, abbiamo:

        $$
        p_j  - w_j \; \frac{p_s}{w_s} \ge 0  \text{     poiché      }   \frac{p_j}{w_j}    \ge \frac{p_s}{w_s }
        $$

        di conseguenza, $\tilde{\mu}_j \ge  0$ per ogni $j \in \mathscr{I}$. Quindi il vincolo $\eqref{eq:KP-cont1_LP_D}$ e i vincoli $\eqref{eq:KP-cont2_LP_D}$ sono soddisfatti.

        Quindi $\eqref{DD}$ è una soluzione ammissibile del modello duale $D(\mathrm{LP}_{\mathrm{KP}})$.

    - **3.** Per le funzioni obiettivo abbiamo:

        \begin{align*}
        {\sum_{j \in \mathscr{I}} p_j \, \tilde{x}_j} & = \sum_{j=1}^{s-1} p_j + p_s \; \frac{\mathit{rc}}{w_s}\\[1.5ex]
        &=   \sum_{j=1}^{s-1} p_j + \frac{p_s}{w_s} \; \left(c - \sum_{j=1}^{s-1} w_j \right)\\[1.5ex]
        &= c \; \frac{p_s}{w_s} +  \sum_{j=1}^{s-1} \left( p_j  - w_j \; \frac{p_s}{w_s} \right) \\[1.5ex]
        &=c \, \tilde{\pi} + \;\;{\sum_{j \in \mathscr{I}}  \tilde{\mu}_j}
        \end{align*}

        quindi i valori delle funzioni obiettivo primale e duale coincidono.

    Quindi, per la dualità forte della PL, $\eqref{PP}$ e $\eqref{DD}$ sono una coppia di soluzioni ottime primale e duale. <span class="qed">□</span>

!!! chiave ""

    Nella maggior parte delle istanze del KP il rapporto fra $z(\mathrm{LP}_{\mathrm{KP}})$ e $z(\mathrm{ILP}_{\mathrm{KP}})$ supera di poco uno: $z(\mathrm{LP}_{\mathrm{KP}})$ è tipicamente un upper bound stretto per $z(\mathrm{ILP}_{\mathrm{KP}})$.

- Riportiamo una dimostrazione alternativa delle formule $\eqref{PP}$. Procediamo per assurdo, dimostrando che una soluzione diversa non può essere ottima.

- In questa dimostrazione supponiamo che gli oggetti con la stessa efficienza siano fusi in un unico oggetto. Poiché possiamo scegliere qualunque frazione di un oggetto, questo non cambia il problema, ed evitiamo di discutere le soluzioni simmetriche.

??? dimostrazione "Dimostrazione"

    Supponiamo che $\bar{\vet x}=(\bar{x}_1,\bar{x}_2,\dots,\bar{x}_n)$ sia una soluzione ottima di $\mathrm{LP}_{\mathrm{KP}}$ diversa da $\tilde{\vet x}= (\tilde{x}_1,\tilde{x}_2,\dots,\tilde{x}_n)$ determinata con le formule $\eqref{PP}$. Ogni soluzione ottima di $\mathrm{LP}_{\mathrm{KP}}$ ha peso totale pari a $c$, cioè il vincolo $\eqref{cons1_KP}$ è soddisfatto all'uguaglianza (altrimenti si può migliorare).

    Supponiamo che non esista una coppia di oggetti $h<k$ con $\bar{x}_h<1$ e $\bar{x}_k>0$. Allora $\bar{\vet x}$ seleziona gli oggetti in ordine di efficienza, riempiendo lo zaino oggetto per oggetto fino al peso $c$: questa è esattamente $\tilde{\vet x}$, assurdo. Quindi una tale coppia di oggetti $h<k$ esiste (il caso $k=s$ è incluso).

    Sia:

    $$
    d= \min \big\{ ~~w_k \: \bar{x}_k~,~ w_h\;(1-\bar{x}_h) ~~\big\} > 0
    $$

    Costruiamo una nuova soluzione ammissibile $\hat{\vet x} = (\hat{x}_1,\hat{x}_2,\dots, \hat{x}_n)$ identica a $\bar{\vet x}$ tranne che:

    $$
    \hat{x}_k= \bar{x}_k - \frac{d}{w_k} \ge 0 {\rm ~~~~~e~~~} \hat{x}_h=\bar{x}_h + \frac{d}{w_h} \le 1
    $$

    Per la definizione di $d$, abbiamo $\hat{x}_k \ge 0$ e $\hat{x}_h \le 1$, e $\hat{\vet x}$ è una soluzione ammissibile poiché:

    $$
    \sum_{j \in \mathscr{I}} w_j \: \hat{x}_j = \sum_{j \in \mathscr{I}} w_j \: \bar{x}_j +w_h \: \frac{d}{w_h} - w_k \: \frac{d}{w_k} =  \sum_{j \in \mathscr{I}} w_j \: \bar{x}_j = c
    $$

    Il valore della funzione obiettivo di $\hat{\vet x}$ è:

    $$
    \sum_{j \in \mathscr{I}} p_j \: \hat{x}_j = \sum_{j \in \mathscr{I}} p_j \: \bar{x}_j + d \: \underbrace{\left( \frac{p_h}{w_h} - \frac{p_k}{w_k} \right)}_{>0 \text{  poiché  } \frac{p_h}{w_h} > \frac{p_k}{w_k}}>  \sum_{j \in \mathscr{I}} p_j \: \bar{x}_j
    $$

    Allora il valore della funzione obiettivo di $\hat{\vet x}$ è maggiore del valore della funzione obiettivo di $\bar{\vet x}$, contro il fatto che $\bar{\vet x}$ è una soluzione ottima.

    La disuguaglianza stretta $p_h/w_h > p_k/w_k$ vale per ogni $h<k$, poiché gli oggetti con la stessa efficienza sono stati fusi. <span class="qed">□</span>

<a id="box-14-texexp_pd_kp"></a>

!!! esempio "Esempio 9.8: soluzioni primale e duale dei modelli PL"

    Per l'istanza del KP dell'<span style="color:#1971c2">[Esempio 9.1](#box-1-texexp_ilp_kp)</span>, abbiamo $s=3$ e $\mathit{rc} = 4$.

    Con le formule $\eqref{PP}$, calcoliamo la seguente soluzione ottima del modello $\mathrm{LP}_{\mathrm{KP}}$:

    $$
    \tilde{x}_1=\tilde{x}_2=1,~~\tilde{x}_3=\frac{2}{3},~~\tilde{x}_4=\tilde{x}_5=\tilde{x}_6=0
    $$

    Con le formule $\eqref{DD}$, calcoliamo la seguente soluzione ottima del modello $D(\mathrm{LP}_{\mathrm{KP}})$:

    $$
    \tilde{\pi}=\frac{4}{3},~~~~~\tilde{\mu}_1=6- 2\; \frac{4}{3}=\frac{10}{3},~~~\tilde{\mu}_2=5 - 3\; \frac{4}{3}= 1,~~~\tilde{\mu}_3=\tilde{\mu}_4=\tilde{\mu}_5=\tilde{\mu}_6=0
    $$

    Con la formula $\eqref{VAL}$, il valore ottimo di entrambi i modelli PL, primale e duale, è:

    $$
    \sum_{j=1}^{2} p_j + p_s \frac{\mathit{rc}}{w_s} = 6+5 + 8 \; \frac{2}{3} = \frac{49}{3}
    $$

### 9.4.3 Alcune proprietà teoriche importanti

- Le due proposizioni seguenti mostrano che il rapporto fra $z(\mathrm{LP}_{\mathrm{KP}})$ e $z(\mathrm{ILP}_{\mathrm{KP}})$ è al più due per tutte le istanze del KP. Inoltre, esistono istanze per cui il valore due si raggiunge asintoticamente quando la capacità $c \to +\infty$.

<a id="box-15-propRatio2"></a>

!!! teorema "Proposizione 9.7"

    Per ogni istanza del KP abbiamo:

    \begin{equation*}
    \frac{z(\mathrm{LP}_{\mathrm{KP}})}{z(\mathrm{ILP}_{\mathrm{KP}})} \le 2 \tag{9.16}
    \end{equation*}

??? dimostrazione "Dimostrazione"

    Consideriamo due soluzioni ammissibili del modello $\mathrm{ILP}_{\mathrm{KP}}$:

    1. La soluzione che seleziona tutti gli oggetti che precedono l'oggetto critico:

        $$
        \bar{x}_j = 1, \quad \forall j \in \{1,2,\dots, s-1\}
        \quad
        \text{e}
        \quad
        \bar{x}_j = 0, \quad \forall j \in \{s, s+1, \dots, n\}
        $$

        che è ammissibile per definizione di oggetto critico, e fornisce il lower bound valido:

        $$
        \sum_{j=1}^{s-1} p_j \le z(\mathrm{ILP}_{\mathrm{KP}})
        $$

    2. La soluzione che seleziona solo l'oggetto critico:

        $$
        \bar{x}_j = 0, \quad \forall j \in \mathscr{I} \setminus \{s\} \quad
        \text{e}
        \quad
        \bar{x}_s = 1
        $$

        che è ammissibile per l'ipotesi $w_s \le c$, e fornisce il lower bound valido:

        $$
        p_s \le z(\mathrm{ILP}_{\mathrm{KP}})
        $$

    Sommando le due disuguaglianze otteniamo:

    $$
    2 \; z(\mathrm{ILP}_{\mathrm{KP}})
    \ge \sum_{j=1}^{s-1} p_j + p_s
    \ge z(\mathrm{LP}_{\mathrm{KP}})
    $$

    e quindi:

    $$
    \frac{z(\mathrm{LP}_{\mathrm{KP}})}{z(\mathrm{ILP}_{\mathrm{KP}})} \le 2
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-16-propRatio2tight"></a>

!!! teorema "Proposizione 9.8"

    Esistono istanze del KP tali che:

    \begin{equation*}
    \frac{z(\mathrm{LP}_{\mathrm{KP}})}{z(\mathrm{ILP}_{\mathrm{KP}})} \to 2 \text{    per    } c \to +\infty \tag{9.17}
    \end{equation*}

??? dimostrazione "Dimostrazione"

    Dato $\vartheta \in \Z_{\ge 1}$, consideriamo l'istanza del KP con capacità dello zaino $c = 2\vartheta$ e $n = 2$ oggetti con i seguenti profitti e pesi:

    $$
    p_1 = 1, \quad w_1 = \vartheta + 1 \qquad \text{e} \qquad p_2 = 1, \quad w_2 = \vartheta + 1
    $$

    Poiché si può selezionare un solo oggetto, una soluzione ottima ${\tilde{\vet x}}(\mathrm{ILP}_{\mathrm{KP}})$ del modello $\mathrm{ILP}_{\mathrm{KP}}$ è:

    $$
    \tilde{x}_1 = 1, \qquad \tilde{x}_2 = 0 \qquad \text{e} \qquad z(\mathrm{ILP}_{\mathrm{KP}}) = 1
    $$

    L'oggetto critico è $s = 2$, e la capacità residua è:

    $$
    \mathit{rc} = 2\vartheta - (\vartheta + 1) = \vartheta - 1
    $$

    Di conseguenza, una soluzione ottima ${\tilde{\vet x}}(\mathrm{LP}_{\mathrm{KP}})$ del modello $\mathrm{LP}_{\mathrm{KP}}$ è:

    $$
    \tilde{x}_1 = 1, \qquad \tilde{x}_2 = \frac{\vartheta - 1}{\vartheta + 1} \qquad \text{e} \qquad z(\mathrm{LP}_{\mathrm{KP}}) = 1 + \frac{\vartheta - 1}{\vartheta + 1} = \frac{2\vartheta}{\vartheta + 1}
    $$

    Ne segue che:

    $$
    \lim_{\vartheta \to +\infty} \frac{z(\mathrm{LP}_{\mathrm{KP}})}{z(\mathrm{ILP}_{\mathrm{KP}})}
    = \lim_{\vartheta \to +\infty} \frac{\frac{2\vartheta}{\vartheta + 1}}{1}
    = \lim_{\vartheta \to +\infty} \frac{2\:(\vartheta+1)-2}{\vartheta+1} =\lim_{\vartheta \to +\infty} 2 - \underbrace{\frac{2}{\vartheta+1}}_{\to 0} = 2
    $$

    Di conseguenza, concludiamo che:

    $$
    \frac{z(\mathrm{LP}_{\mathrm{KP}})}{z(\mathrm{ILP}_{\mathrm{KP}})} \to 2 \qquad \text{per} \qquad c \to +\infty
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

## 9.5 Upper bound per il problema dello zaino 0/1

- <strong>Le due proposizioni seguenti richiedono che gli oggetti siano ordinati per efficienza non crescente</strong>.

<a id="box-17-propDantzig"></a>

!!! teorema "Proposizione 9.9: upper bound di Dantzig"

    Per ogni istanza del KP abbiamo:

    \begin{equation*}
    \label{DANTZIG}
    z(\mathrm{ILP}_{\mathrm{KP}}) \le     \underbrace{\sum_{j=1}^{s-1} p_j  +  \left\lfloor p_s \;   \frac{\mathit{rc}}{w_s} \right\rfloor}_{\UB_{\mathrm{D}}} \tag{9.18}
    \end{equation*}

    e $\UB_{\mathrm{D}}$ si chiama <strong>upper bound di Dantzig</strong> per il KP.

??? dimostrazione "Dimostrazione"

    Abbiamo:

    $$
    \left\lfloor  z(\mathrm{LP}_{\mathrm{KP}}) \right\rfloor =  \left\lfloor \sum_{j=1}^{s-1} p_j + p_s \;   \frac{\mathit{rc}}{w_s} \right\rfloor = \sum_{j=1}^{s-1} p_j  +  \left\lfloor p_s \;   \frac{\mathit{rc}}{w_s} \right\rfloor
    $$

    che è un upper bound valido per $z(\mathrm{ILP}_{\mathrm{KP}})$ poiché $p_j \in \Z_{\ge 1}$, per ogni $j \in \mathscr{I}$. <span class="qed">□</span>

- Il bound di Martello-Toth usa gli oggetti $s-1$ e $s+1$. Poiché $w_1 \le c$ e $\sum_{j} w_j > c$ abbiamo $s \ge 2$, quindi l'oggetto $s-1$ esiste sempre. Se $s = n$ l'oggetto $s+1$ non esiste, e poniamo $p_{n+1}/w_{n+1} := 0$: in questo caso $\UB_0 = \sum_{j=1}^{s-1} p_j$.

<a id="box-18-propMT"></a>

!!! teorema "Proposizione 9.10: upper bound di Martello-Toth"

    Per ogni istanza del KP abbiamo:

    \begin{equation*}
    \label{boundMT}
    z(\mathrm{ILP}_{\mathrm{KP}}) \le  \UB_{\mathrm{MT}} = \max \bigg\{~~\UB_0,~~ \UB_1 ~~\bigg\} \tag{9.19}
    \end{equation*}

    dove

    \begin{align*}
    \UB_0 &= \sum_{j=1}^{s - 1} p_j + \left\lfloor \mathit{rc} \;  \frac{p_{s+1}}{w_{s+1}} \right\rfloor\\[2ex]
    \UB_1 &= \sum_{j=1}^{s - 1} p_j + \left\lfloor p_{s} - (w_{s} - \mathit{rc}) \;  \frac{p_{s-1}}{w_{s-1}} \right\rfloor
    \end{align*}

    e $\UB_{\mathrm{MT}}$ si chiama <strong>upper bound di Martello-Toth</strong> per il KP.

??? dimostrazione "Dimostrazione"

    Poiché $x_s$ non può assumere un valore frazionario, una soluzione ottima ${\tilde{\vet x}}(\mathrm{ILP}_{\mathrm{KP}})$ si ottiene da una soluzione ottima ${\tilde{\vet x}}(\mathrm{LP}_{\mathrm{KP}})$ o senza l'oggetto critico $s$ o con l'oggetto critico $s$, e quindi togliendo almeno uno dei primi $s-1$ oggetti.

    1. Se l'oggetto critico è escluso, abbiamo $z(\mathrm{ILP}_{\mathrm{KP}}) \le \UB_0$ poiché la capacità residua $\mathit{rc}$ si riempie con oggetti di efficienza massima possibile $\frac{p_{s+1}}{w_{s+1}}$

    2. Se l'oggetto critico è incluso, abbiamo $z(\mathrm{ILP}_{\mathrm{KP}}) \le \UB_1$ poiché supponiamo che l'oggetto da togliere abbia esattamente il peso minimo necessario $w_s- \mathit{rc}$ e l'efficienza minima possibile $\frac{p_{s-1}}{w_{s-1}}$ <span class="qed">□</span>

<a id="box-19-texexp_ub_kp"></a>

!!! esempio "Esempio 9.9: upper bound di Dantzig e di Martello-Toth"

    Per l'istanza del KP dell'<span style="color:#1971c2">[Esempio 9.1](#box-1-texexp_ilp_kp)</span>, con la formula $\eqref{DANTZIG}$ calcoliamo l'upper bound di Dantzig:

    $$
    \UB_{\mathrm{D}} = \sum_{j=1}^{2} p_j + \left\lfloor p_3  \; \frac{\mathit{rc}}{w_3} \right\rfloor = 6+5 + \left\lfloor 8 ~ \frac{2}{3} \right\rfloor = 11 + \left\lfloor \frac{16}{3} \right\rfloor =16
    $$

    Con la formula $\eqref{boundMT}$ calcoliamo l'upper bound di Martello-Toth:

    \begin{align*}
    \UB_0 &= \sum_{j=1}^{2} p_j + \left\lfloor \mathit{rc} \;   \frac{p_{4}}{w_{4}} \right\rfloor = 6+5 + \left\lfloor 4 ~ \frac{9}{7} \right\rfloor = 11 + \left\lfloor \frac{36}{7} \right\rfloor =16\\[2ex]
    \UB_1 &= \sum_{j=1}^{2} p_j + \left\lfloor p_{3} - (w_{3} - \mathit{rc}) \;  \frac{p_{2}}{w_{2}} \right\rfloor = 6+5 + \left\lfloor 8 -(6-4) \; \frac{5}{3} \right\rfloor = 11 + \left\lfloor  \frac{14}{3}  \right\rfloor =15\\[2ex]
    \UB_{\mathrm{MT}} &= \max \bigg\{~~\UB_0,~~ \UB_1 ~~\bigg\}  = \max \bigg\{~~16,~~ 15 ~~\bigg\} =16
    \end{align*}

    Per questa istanza del KP, l'upper bound di Martello-Toth è forte quanto l'upper bound di Dantzig.

---

**Avanti:** [9.6 Un modello PLI per il problema del subset sum](un-modello-pli-per-il-problema-del-subset-sum.md)
