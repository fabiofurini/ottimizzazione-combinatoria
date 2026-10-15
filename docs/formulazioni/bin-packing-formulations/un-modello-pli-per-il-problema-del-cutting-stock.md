---
title: "Cutting stock"
---

# 10.5 Un modello PLI per il problema del cutting stock { #sez-sec-bpf-CSP }

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 10** · [:material-book-open-variant: Capitolo 10: Problemi di packing](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-bin-packing-formulations.pdf) · [:material-pencil: Esercizi: Problemi di packing](../../esercizi/bin-packing-formulations.md)

</div>

Il problema di questa sezione è il problema del cutting stock (CSP), definito nel [Capitolo 3 «Problemi di packing»](../../problemi-di-ottimizzazione-combinatoria/bin-packing/il-problema-del-cutting-stock.md), con la sua istanza di riferimento.

- Dato un upper bound $m \in \Z_{\ge 2}$ sul numero di contenitori usati in una qualunque soluzione ottima del CSP, introduciamo le seguenti $mn$ <strong>variabili intere</strong>:

    $$
    x_{jb} = \text{numero di copie dell'oggetto $j$ inserite nel contenitore $b$}
    \qquad \forall j \in \mathscr{I},~~ \forall b \in \underbrace{\{1,2,\dots,m\}}_{=\mathscr{B}},
    $$

    e le seguenti $m$ <strong>variabili binarie</strong>:

    $$
    y_b =
    \begin{cases}
    1 & \text{se il contenitore } b \textrm{ è usato} \\
    0 & \text{altrimenti}
    \end{cases}
    \qquad \forall b \in \mathscr{B}.
    $$

    Il numero totale $\sum_{j \in \mathscr{I}} d_j$ di copie è un valore valido di $m$, e lo è anche il numero di contenitori di una qualunque soluzione ammissibile del CSP.

!!! chiave ""

    Con queste variabili, un modello di programmazione lineare intera (PLI) per il problema del cutting stock (CSP) è il seguente:

    <a id="eq-NAT_CSP"></a>

    \begin{align*}
    && \min ~~ \sum_{b \in \mathscr{B}} y_b \label{obj_CSP}  \tag{10.19a}\\[2ex]
    && \text{soggetto a} \quad \sum_{b \in \mathscr{B}} x_{jb} &= d_j, & \forall j \in \mathscr{I}, \label{cons1_CSP}  \tag{10.19b}\\[2ex]
    && - \sum_{j \in \mathscr{I}}  w_j \; x_{jb} + c \; y_b &\geq 0, & \forall b \in \mathscr{B}, \label{cons2_CSP}  \tag{10.19c}\\[2ex]
    && x_{jb} &\in \Z_{\ge 0}, & \forall j \in \mathscr{I},~ \forall b \in \mathscr{B}, \label{cons3_CSP}  \tag{10.19d}\\[2ex]
    && y_b &\in \{0,1\}, & \forall b \in \mathscr{B}. \label{cons4_CSP} \tag{10.19e}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{CSP}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{CSP}}$:

    - la funzione obiettivo lineare $\eqref{obj_CSP}$ minimizza il numero totale di contenitori usati;

    - i vincoli $\eqref{cons1_CSP}$ garantiscono che siano inserite esattamente $d_j$ copie di ogni oggetto $j$ ($n$ vincoli lineari);

    - i vincoli $\eqref{cons2_CSP}$ collegano le variabili intere alle variabili di attivazione e impongono i limiti di capacità, come i vincoli [(10.1c)](un-modello-pli-per-il-problema-del-bin-packing.md#mjx-eqn:cons2_BPP) del modello $\mathrm{ILP}_{\mathrm{BPP}}$ ($m$ vincoli lineari);

    - infine, i vincoli $\eqref{cons3_CSP}$ e $\eqref{cons4_CSP}$ definiscono le variabili del modello PLI.

- Con $d_j=1$ per ogni oggetto, i vincoli $\eqref{cons1_CSP}$ danno $x_{jb}\in\{0,1\}$, e il modello $\mathrm{ILP}_{\mathrm{CSP}}$ è il modello $\mathrm{ILP}_{\mathrm{BPP}}$.

- Le copie di un oggetto sono identiche: una sola variabile intera le conta in ogni contenitore. Il modello $\mathrm{ILP}_{\mathrm{BPP}}$ sull'insieme esteso degli oggetti userebbe $m\sum_{j} d_j$ variabili binarie invece di $mn$ variabili intere.

<a id="box-15-texexpbox_ilp_csp"></a>

!!! esempio "Esempio 10.6: modello $\mathrm{ILP}_{\mathrm{CSP}}$"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4\}$ di $4$ oggetti ($n=4$), con i seguenti pesi e copie richieste:

    $$
    \begin{array}{l|cccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\[1ex]
    \hline {w_j} & {4} & {5} & {3} & {6} \\[1ex]
    {d_j} & {2} & {1} & {3} & {1} \\[1ex]
    \hline
    \end{array}
    $$

    Questa è l'istanza del CSP del [Capitolo 3 «Problemi di packing»](../../problemi-di-ottimizzazione-combinatoria/bin-packing/il-problema-del-cutting-stock.md), dove si trova a occhio una soluzione con $3$ contenitori: quindi $m=3$ è un upper bound valido. Il modello $\mathrm{ILP}_{\mathrm{CSP}}$ con $m=3$ per questa istanza del CSP è:

    $$
    \begin{array}{rlcl}
    {\min} & {y_1+y_2+y_3} &  &  \\[1ex]
    \text{soggetto a} & {x_{11}+x_{12}+x_{13}} & {=} & {2} \\
    & {x_{21}+x_{22}+x_{23}} & {=} & {1} \\
    & {x_{31}+x_{32}+x_{33}} & {=} & {3} \\
    & {x_{41}+x_{42}+x_{43}} & {=} & {1} \\
    & {-4\,x_{11}-5\,x_{21}-3\,x_{31}-6\,x_{41}+10\,y_1} & {\ge} & {0} \\
    & {-4\,x_{12}-5\,x_{22}-3\,x_{32}-6\,x_{42}+10\,y_2} & {\ge} & {0} \\
    & {-4\,x_{13}-5\,x_{23}-3\,x_{33}-6\,x_{43}+10\,y_3} & {\ge} & {0} \\[1ex]
    & {x_{11},~x_{12},~x_{13},~\dots,~x_{43}} & {\in} & {\Z_{\ge 0}} \\
    & {y_1,~y_2,~y_3} & {\in} & {\{0,1\}}
    \end{array}
    $$

    Una soluzione ottima $\tilde{\vet x}(\mathrm{ILP}_{\mathrm{CSP}})$ è:

    $$
    \tilde{x}_{11} = \tilde{x}_{41} = 1,~~ \tilde{x}_{32} = 3,~~ \tilde{x}_{13} = \tilde{x}_{23} = 1,~~
    \tilde{y}_1 = \tilde{y}_2 = \tilde{y}_3 = 1,
    $$

    con tutte le altre variabili pari a $0$. Il valore ottimo è $z(\mathrm{ILP}_{\mathrm{CSP}}) = 3$, come trovato nel Capitolo 3. I contenitori contengono una copia degli oggetti $1$ e $4$ (peso $10$), tre copie dell'oggetto $3$ (peso $9$), e una copia degli oggetti $1$ e $2$ (peso $9$). La soluzione ottima non è unica: anche la soluzione del Capitolo 3, con i contenitori $\{4,1\}$, $\{1,3,3\}$ e $\{2,3\}$, usa $3$ contenitori.

## 10.6 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Scegliere $m$ troppo piccolo.</strong> Il numero $m$ di contenitori deve essere un upper bound sul numero di contenitori di una soluzione ottima: con $m < z(\mathrm{ILP}_{\mathrm{BPP}})$ il modello non ha soluzioni ammissibili. Il valore $m=n$ è sempre valido.

    - <strong>Dimenticare di arrotondare per eccesso.</strong> Il valore ottimo del modello $\mathrm{ILP}_{\mathrm{BPP}}$ è intero, quindi il lower bound dei rilassamenti è $\lceil \sum_{j} w_j / c \rceil$; nell'[Esempio 10.1](un-modello-pli-per-il-problema-del-bin-packing.md#box-1-texexpbox_ilp_bpp) è $\lceil \tfrac{8}{5} \rceil = 2$, non $\tfrac{8}{5}$.

    - <strong>Credere che il modello conti solo i contenitori non vuoti.</strong> I vincoli permettono $y_b=1$ per un contenitore vuoto: è la funzione obiettivo che spegne questi contenitori, in ogni soluzione ottima.

    - <strong>Ignorare la simmetria.</strong> Permutando gli indici dei contenitori si ottiene un'altra soluzione ottima con lo stesso riempimento: il modello $\mathrm{ILP}_{\mathrm{BPP}}$ ha molte soluzioni ottime equivalenti.

    - <strong>Aspettarsi un rilassamento migliore da $y_b \le 1$.</strong> Il secondo rilassamento ha lo stesso valore ottimo del primo: i limiti superiori $y_b \le 1$ non tagliano la soluzione ottima del primo rilassamento.

    - <strong>Dichiarare binarie le variabili del modello di cutting stock.</strong> Nel modello $\mathrm{ILP}_{\mathrm{CSP}}$ $x_{jb}$ conta le copie dell'oggetto $j$ nel contenitore $b$: con $x_{jb}\in\{0,1\}$ le tre copie dell'oggetto $3$ dell'esempio non potrebbero stare nello stesso contenitore.

## 10.7 In sintesi

!!! chiave "In sintesi"

    - Il modello $\mathrm{ILP}_{\mathrm{BPP}}$ ha $m \cdot n$ variabili di assegnamento $x_{jb}$ e $m$ variabili di attivazione $y_b$; i vincoli di capacità le collegano.

    - Entrambi i rilassamenti lineari hanno valore ottimo $z(\mathrm{LP}_{\mathrm{BPP}}) = \sum_{j} w_j / c$, con soluzione duale $\tilde{\mu}_j = w_j/c$ e $\tilde{\pi}_b = 1/c$.

    - Poiché il valore ottimo è intero, $\lceil z(\mathrm{LP}_{\mathrm{BPP}}) \rceil$ è un lower bound sul numero di contenitori.

    - Il rapporto fra $z(\mathrm{LP}_{\mathrm{BPP}})$ e $z(\mathrm{ILP}_{\mathrm{BPP}})$ è almeno $\tfrac{1}{2}$, e il valore $\tfrac{1}{2}$ si raggiunge asintoticamente; lo stesso vale per $\lceil z(\mathrm{LP}_{\mathrm{BPP}}) \rceil$.

    - Il modello $\mathrm{ILP}_{\mathrm{CSP}}$ ha la struttura del modello $\mathrm{ILP}_{\mathrm{BPP}}$, con $mn$ variabili intere $x_{jb}$ che contano le copie e le domande $d_j$ come termini noti; sull'istanza del CSP del Capitolo 3 il suo valore ottimo è $3$.

    <strong>Quadro riassuntivo dell'[Esempio 10.1](un-modello-pli-per-il-problema-del-bin-packing.md#box-1-texexpbox_ilp_bpp).</strong> Bound su $z(\mathrm{ILP}_{\mathrm{BPP}})$ calcolati in questo capitolo:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Bound</th>
    <th>Valore</th>
    <th>Da</th>
    </tr>
    <tr>
    <td>Primo rilassamento</td>
    <td><span class="arithmatex">\(\tfrac{8}{5}\)</span></td>
    <td><span class="arithmatex">\(z(\mathrm{LP}\text{-}0_{\mathrm{BPP}})\)</span></td>
    </tr>
    <tr>
    <td>Secondo rilassamento</td>
    <td><span class="arithmatex">\(\tfrac{8}{5}\)</span></td>
    <td><span class="arithmatex">\(z(\mathrm{LP}_{\mathrm{BPP}})\)</span></td>
    </tr>
    <tr>
    <td>Lower bound</td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(\lceil \tfrac{8}{5} \rceil\)</span></td>
    </tr>
    <tr>
    <td>Valore ottimo</td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td>schemi <span class="arithmatex">\(\{1,3\}\)</span> e <span class="arithmatex">\(\{2\}\)</span></td>
    </tr>
    </table></div>

    Qui il bound arrotondato coincide già con il valore ottimo.

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di packing](../../esercizi/bin-packing-formulations.md)

