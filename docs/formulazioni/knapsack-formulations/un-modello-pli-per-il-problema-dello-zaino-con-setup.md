---
title: "Zaino con setup"
---

# 9.12 Un modello PLI per il problema dello zaino con setup { #sez-sec-kpf-KPS }

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 9** · [:material-book-open-variant: Capitolo 9: Problemi di zaino](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-knapsack-formulations.pdf) · [:material-pencil: Esercizi: Problemi di zaino](../../esercizi/knapsack-formulations.md) · [:material-gesture-tap: App: Rilassamento continuo e upper bound per lo zaino 0/1](../../laboratorio/zaino-rilassamento-bound.md)

</div>

Il problema dello zaino con setup e la sua istanza di riferimento (Esempio 2.8) sono definiti nel [Capitolo 2 «Problemi di zaino», Sezione 2.9](../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-con-setup.md).

- Introduciamo le seguenti $n$ <strong>variabili binarie</strong>:

    \begin{equation*}
    \label{BIN_VAR_KPS}
    x_j = \left\{ \begin{array}{ll}
    1 & \textrm{se l'oggetto $j$ è selezionato nello zaino}\\[1.5ex]
    0 & \textrm{altrimenti}
    \end{array} \qquad \forall j \in \mathscr{I}. \right. \tag{9.32}
    \end{equation*}

- Introduciamo le seguenti $q$ <strong>variabili binarie</strong>:

    \begin{equation*}
    \label{BIN_VAR_KPS_Y}
    y_h = \left\{ \begin{array}{ll}
    1 & \textrm{se la classe $h$ è attivata (si paga il suo setup)}\\[1.5ex]
    0 & \textrm{altrimenti}
    \end{array} \qquad \forall h \in \{1,2,\dots,q\}. \right. \tag{9.33}
    \end{equation*}

!!! chiave ""

    Con queste variabili, un modello di programmazione lineare intera (PLI) per il problema dello zaino con setup (KPS) è il seguente:

    <a id="eq-NAT_KPS"></a>

    \begin{align*}
    &&   \max \;\;{\sum_{j \in \mathscr{I}} p_j \, x_j - \sum_{h=1}^{q} f_h \, y_h}                               \label{obj_KPS}  \tag{9.34a}\\[1ex]
    && \text{soggetto a} \quad  {\sum_{j \in \mathscr{I}} w_j \, x_j + \sum_{h=1}^{q} s_h \, y_h}  &\leq c,                       \label{cons1_KPS}  \tag{9.34b}\\[1ex]
    && x_j  &\leq y_h, & \forall h \in \{1,2,\dots,q\},~\forall j \in \mathscr{J}_h,                       \label{cons2_KPS}  \tag{9.34c}\\[1ex]
    &&x_j                        &\in  \{0,1\}, & \forall j \in \mathscr{I}, \label{cons3_KPS}  \tag{9.34d}\\[1ex]
    &&y_h                        &\in  \{0,1\}, & \forall h \in \{1,2,\dots,q\}. \label{cons4_KPS} \tag{9.34e}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{KPS}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{KPS}}$:

    - la funzione obiettivo lineare $\eqref{obj_KPS}$ massimizza il ricavo totale degli oggetti selezionati meno i costi di setup delle classi attivate;

    - il vincolo $\eqref{cons1_KPS}$ garantisce che il peso totale degli oggetti selezionati più i pesi di setup delle classi attivate non superi la capacità dello zaino (un vincolo lineare);

    - i vincoli $\eqref{cons2_KPS}$ garantiscono che un oggetto si possa selezionare solo se la sua classe è attivata ($n$ vincoli lineari, uno per ogni oggetto);

    - infine, i vincoli $\eqref{cons3_KPS}$ e $\eqref{cons4_KPS}$ definiscono le variabili del modello PLI.

<a id="box-26-texexp_ilp_kps"></a>

!!! esempio "Esempio 9.16: modello $\mathrm{ILP}_{\mathrm{KPS}}$"

    Consideriamo uno zaino di capacità $c = 20$ e un insieme $\mathscr{I} = \{1,2,3,4,5,6\}$ di $6$ oggetti ($n = 6$), partizionato in $q = 2$ classi $\mathscr{J}_1 = \{1,2,3\}$ e $\mathscr{J}_2 = \{4,5,6\}$, con costi di setup $f_1 = 3$, $f_2 = 4$, pesi di setup $s_1 = 2$, $s_2 = 3$, e i seguenti ricavi e pesi:

    $$
    \begin{array}{l|rrrrrrr}
    \hline  & {j = 1} & {j = 2} & {j = 3} & {j = 4} & {j = 5} & {j = 6} \\
    \hline {p_j} & {6} & {8} & {5} & {7} & {9} & {4} \\
    {w_j} & {4} & {5} & {3} & {6} & {7} & {2} \\
    \hline
    \end{array}
    $$

    Questa è l'istanza del KPS dell'Esempio 2.8. Il modello $\mathrm{ILP}_{\mathrm{KPS}}$ per questa istanza è:

    $$
    \begin{array}{rrrrrrrrrrr}
    {\max} & 6 \, {x_1} & + 8 \, {x_2} & + 5 \, {x_3} & + 7 \, {x_4} & + 9 \, {x_5} & + 4 \, {x_6} & {-} 3 \, {y_1} & {-} 4 \, {y_2} &  &  \\[0.5ex]
    \text{soggetto a} & 4 \, {x_1} & + 5 \, {x_2} & + 3 \, {x_3} & + 6 \, {x_4} & + 7 \, {x_5} & + 2 \, {x_6} & + 2 \, {y_1} & + 3 \, {y_2} & {\le} & 20 \\[0.5ex]
    & {x_1} &  &  &  &  &  & {-} {y_1} &  & {\le} & 0 \\[0.5ex]
    &  & {x_2} &  &  &  &  & {-} {y_1} &  & {\le} & 0 \\[0.5ex]
    &  &  & {x_3} &  &  &  & {-} {y_1} &  & {\le} & 0 \\[0.5ex]
    &  &  &  & {x_4} &  &  &  & {-} {y_2} & {\le} & 0 \\[0.5ex]
    &  &  &  &  & {x_5} &  &  & {-} {y_2} & {\le} & 0 \\[0.5ex]
    &  &  &  &  &  & {x_6} &  & {-} {y_2} & {\le} & 0 \\[0.5ex]
    & {x_1}, & {x_2}, & {x_3}, & {x_4}, & {x_5}, & {x_6} &  &  & { \in} & { \{0,1\}} \\[0.5ex]
    &  &  &  &  &  &  & {y_1}, & {y_2} & { \in} & { \{0,1\}}
    \end{array}
    $$

    Una soluzione ottima $~{\tilde{\vet x}}(\mathrm{ILP}_{\mathrm{KPS}})$, $~{\tilde{\vet y}}(\mathrm{ILP}_{\mathrm{KPS}})$ è:

    $$
    \tilde x_1=\tilde x_2=\tilde x_3=1,~~\tilde x_4=\tilde x_5=0,~~\tilde x_6=1,~~\tilde y_1=\tilde y_2=1
    $$

    Il valore ottimo $z(\mathrm{ILP}_{\mathrm{KPS}})$ è $16$. La soluzione ottima associata del KPS è $\tilde{S} =\{1,2,3,6\}$. La soluzione ottima non è unica: i sottoinsiemi $\{1,2,3\}$ e $\{4,5,6\}$ hanno lo stesso valore.

## 9.13 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Dimenticare di ordinare gli oggetti.</strong> Le formule [(9.13)](un-modello-pli-per-il-problema-dello-zaino-0-1.md#mjx-eqn:PP), [(9.14)](un-modello-pli-per-il-problema-dello-zaino-0-1.md#mjx-eqn:DD) e i bound valgono solo se gli oggetti sono ordinati per efficienza non crescente: con un altro ordine il vettore [(9.13)](un-modello-pli-per-il-problema-dello-zaino-0-1.md#mjx-eqn:PP) è ammissibile ma non ottimo.

    - <strong>Usare $z(\mathrm{LP}\text{-}0_{\mathrm{KP}})$ come bound.</strong> Il primo rilassamento non ha limiti superiori sulle variabili, ed è molto più debole: nell'<span style="color:#1971c2">[Esempio 9.1](un-modello-pli-per-il-problema-dello-zaino-0-1.md#box-1-texexp_ilp_kp)</span> dà $27$, contro $\tfrac{49}{3}$ del secondo rilassamento.

    - <strong>Arrotondare quando i profitti non sono interi.</strong> I bound $\UB_{\mathrm{D}}$ e $\UB_{\mathrm{MT}}$ arrotondano per difetto la parte frazionaria: questo è valido solo perché tutti i profitti sono interi.

    - <strong>Confondere l'oggetto critico con l'ultimo oggetto selezionato.</strong> L'oggetto critico $s$ è il primo oggetto che <u>non</u> entra: nell'<span style="color:#1971c2">[Esempio 9.1](un-modello-pli-per-il-problema-dello-zaino-0-1.md#box-1-texexp_ilp_kp)</span> è $s=3$, mentre gli oggetti $1$ e $2$ sono selezionati per intero.

    - <strong>Supporre che l'ottimo del rilassamento sia unico.</strong> Con oggetti di uguale efficienza il problema $\mathrm{LP}_{\mathrm{KP}}$ ha altre soluzioni ottime; le formule [(9.13)](un-modello-pli-per-il-problema-dello-zaino-0-1.md#mjx-eqn:PP) ne danno una.

    - <strong>Copiare il modello $\mathrm{ILP}_{\mathrm{KP}}$ nelle varianti.</strong> Nel BKP e nell'UKP le variabili sono intere, non binarie; nel MCKP i vincoli di classe [(9.31c)](un-modello-pli-per-il-problema-dello-zaino-a-scelta-multipla.md#mjx-eqn:cons2_MCKP) sono uguaglianze; nel KPS, senza i vincoli $\eqref{cons2_KPS}$ il modello seleziona oggetti con $y_h = 0$ e non paga mai un setup.

## 9.14 In sintesi

!!! chiave "In sintesi"

    - Il modello $\mathrm{ILP}_{\mathrm{KP}}$ ha una variabile binaria per oggetto, un vincolo di capacità e l'obiettivo di massimizzare il profitto totale.

    - Il rilassamento $\mathrm{LP}_{\mathrm{KP}}$ si risolve ordinando gli oggetti per efficienza non crescente: gli oggetti prima dell'oggetto critico sono selezionati, l'oggetto critico si prende in parte, gli altri si scartano.

    - Il duale di $\mathrm{LP}_{\mathrm{KP}}$ ha la soluzione ottima $\tilde{\pi} = p_s/w_s$, e $z(\mathrm{LP}_{\mathrm{KP}})$ non supera mai il doppio di $z(\mathrm{ILP}_{\mathrm{KP}})$.

    - Arrotondando per difetto $z(\mathrm{LP}_{\mathrm{KP}})$ otteniamo il bound di Dantzig; il bound di Martello-Toth considera separatamente l'oggetto critico escluso e incluso.

    - Ogni variante del [Capitolo 2 «Problemi di zaino»](../../problemi-di-ottimizzazione-combinatoria/knapsack/index.md) cambia un ingrediente del modello $\mathrm{ILP}_{\mathrm{KP}}$: variabili intere (BKP, UKP), un vincolo di capacità per dimensione (MDKP), una variabile per oggetto e zaino (MKP), un'uguaglianza per classe (MCKP), variabili di setup $y_h$ con $x_j \le y_h$ (KPS); il SSP è il KP con $p_j = w_j$.

    <strong>Quadro riassuntivo dell'<span style="color:#1971c2">[Esempio 9.1](un-modello-pli-per-il-problema-dello-zaino-0-1.md#box-1-texexp_ilp_kp)</span>.</strong> Upper bound su $z(\mathrm{ILP}_{\mathrm{KP}})$ calcolati in questo capitolo:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Bound</th>
    <th>Valore</th>
    <th>Da</th>
    </tr>
    <tr>
    <td>Primo rilassamento</td>
    <td><span class="arithmatex">\(27\)</span></td>
    <td><span class="arithmatex">\(z(\mathrm{LP}\text{-}0_{\mathrm{KP}})\)</span>, oggetto <span class="arithmatex">\(1\)</span> con <span class="arithmatex">\(\tfrac{9}{2}\)</span> copie</td>
    </tr>
    <tr>
    <td>Secondo rilassamento</td>
    <td><span class="arithmatex">\(\tfrac{49}{3}\)</span></td>
    <td><span class="arithmatex">\(z(\mathrm{LP}_{\mathrm{KP}})\)</span>, oggetto critico <span class="arithmatex">\(s=3\)</span></td>
    </tr>
    <tr>
    <td>Bound di Dantzig</td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td><span class="arithmatex">\(\lfloor \tfrac{49}{3} \rfloor\)</span></td>
    </tr>
    <tr>
    <td>Bound di Martello-Toth</td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td><span class="arithmatex">\(\max\{16, 15\}\)</span></td>
    </tr>
    <tr>
    <td>Valore ottimo</td>
    <td><span class="arithmatex">\(15\)</span></td>
    <td>soluzione <span class="arithmatex">\(\{1,4\}\)</span> del modello <span class="arithmatex">\(\mathrm{ILP}_{\mathrm{KP}}\)</span></td>
    </tr>
    </table></div>

    Il gap fra il miglior upper bound ($16$) e il valore ottimo ($15$) si chiude con gli algoritmi esatti dei capitoli successivi.

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di zaino](../../esercizi/knapsack-formulations.md)

