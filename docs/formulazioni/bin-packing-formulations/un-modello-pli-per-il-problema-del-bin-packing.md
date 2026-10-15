---
title: "Bin packing"
---

# 10.2 Un modello PLI per il problema del bin packing { #sez-sec-bpf-BPP }

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 10** · [:material-book-open-variant: Capitolo 10: Problemi di packing](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-bin-packing-formulations.pdf) · [:material-pencil: Esercizi: Problemi di packing](../../esercizi/bin-packing-formulations.md)

</div>

Il problema di questa sezione è il problema del bin packing (BPP), definito nel [Capitolo 3 «Problemi di packing»](../../problemi-di-ottimizzazione-combinatoria/bin-packing/il-problema-del-bin-packing.md).

- Dato un upper bound $m \in \Z_{\ge 2}$ sul numero di contenitori usati in una qualunque soluzione ottima del BPP, introduciamo le seguenti $mn$ <strong>variabili binarie</strong>:

    $$
    \begin{gathered}
    x_{jb} =
    \begin{cases}
    1 & \text{se l'oggetto } j \textrm{ è inserito nel contenitore } b \\
    0 & \text{altrimenti}
    \end{cases}
    \\[1ex]
    \forall j \in \underbrace{\{1,2,\dots,n\}}_{=\mathscr{I}},~~ \forall b \in \underbrace{\{1,2,\dots,m\}}_{=\mathscr{B}},
    \end{gathered}
    $$

    e le seguenti $m$ <strong>variabili binarie</strong>:

    $$
    y_b =
    \begin{cases}
    1 & \text{se il contenitore } b \textrm{ è usato} \\
    0 & \text{altrimenti}
    \end{cases}
    \qquad \forall b \in \underbrace{\{1,2,\dots,m\}}_{=\mathscr{B}}.
    $$

    Il numero $n$ di oggetti è un upper bound valido sul numero minimo di contenitori necessari per inserire tutti gli oggetti poiché, nel caso peggiore, ogni oggetto è inserito in un contenitore diverso. Anche il numero di contenitori usati in una qualunque soluzione ammissibile del BPP è un upper bound valido.

!!! chiave ""

    Con queste variabili, un modello di programmazione lineare intera (PLI) per il problema del bin packing (BPP) è il seguente:

    <a id="eq-NAT_BPP"></a>

    \begin{align*}
    && \min ~~ \sum_{b \in \mathscr{B}} y_b \label{obj_BPP}  \tag{10.1a}\\[2ex]
    && \text{soggetto a} \quad \sum_{b \in \mathscr{B}} x_{jb} &= 1, & \forall j \in \mathscr{I}, \label{cons1_BPP}  \tag{10.1b}\\[2ex]
    && - \sum_{j \in \mathscr{I}}  w_j \; x_{jb} + c \; y_b &\geq 0, & \forall b \in \mathscr{B}, \label{cons2_BPP}  \tag{10.1c}\\[2ex]
    && x_{jb} &\in \{0,1\}, & \forall j \in \mathscr{I},~ \forall b \in \mathscr{B}, \label{cons4_BPP}  \tag{10.1d}\\[2ex]
    && y_b &\in \{0,1\}, & \forall b \in \mathscr{B}. \label{cons3_BPP} \tag{10.1e}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{BPP}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{BPP}}$:

    - la funzione obiettivo lineare $\eqref{obj_BPP}$ minimizza il numero totale di contenitori usati;

    - i vincoli $\eqref{cons1_BPP}$ garantiscono che ogni oggetto sia inserito in esattamente un contenitore, così che tutti gli oggetti siano inseriti ($n$ vincoli lineari);

    - i vincoli $\eqref{cons2_BPP}$ collegano le variabili di assegnamento alle variabili di attivazione e impongono i limiti di capacità: se il contenitore $b$ è usato, il peso dei suoi oggetti è al più $c$; se non è usato, non contiene oggetti ($m$ vincoli lineari);

    - infine, i vincoli $\eqref{cons4_BPP}$ e $\eqref{cons3_BPP}$ definiscono le variabili del modello PLI.

<strong>Spiegazione del legame fra le variabili</strong>

- <strong>Se almeno un oggetto è inserito nel contenitore $b$, allora il contenitore è usato.</strong> L'implicazione logica è

    $$
    (x_{1b} {\tt ~OR~} x_{2b} {\tt ~OR~} \dots {\tt ~OR~} x_{nb}) ~~~ \Longrightarrow ~~~ y_b .
    $$

    Poiché $w_j>0$, inserire un oggetto nel contenitore $b$ dà $\sum_{j \in \mathscr{I}} w_j x_{jb} > 0$, e il vincolo $\sum_{j \in \mathscr{I}} w_j x_{jb} \le c\,y_b$ impone $y_b=1$.

- <strong>Se il contenitore $b$ non è usato, allora è vuoto.</strong> È la contronominale dell'implicazione precedente. Per $y_b=0$ il vincolo diventa $\sum_{j \in \mathscr{I}} w_j x_{jb} \le 0$, e poiché $w_j>0$ otteniamo $x_{jb}=0$ per ogni oggetto $j$.

- <strong>Se il contenitore $b$ è usato, allora contiene almeno un oggetto, ma solo in una soluzione ottima.</strong> I vincoli non lo impongono. Tuttavia, se $x_{jb}=0$ per ogni $j$ e $y_b=1$, porre $y_b=0$ mantiene soddisfatti tutti i vincoli e diminuisce di uno il valore obiettivo. Quindi, in ogni soluzione ottima, i contenitori vuoti non sono contati come usati.

<a id="box-1-texexpbox_ilp_bpp"></a>

!!! esempio "Esempio 10.1: modello $\mathrm{ILP}_{\mathrm{BPP}}$"

    Consideriamo un contenitore di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3\}$ di $3$ oggetti ($n=3$), con i seguenti pesi degli oggetti:

    $$
    \begin{array}{l|ccc}
    \hline  & {j=1} & {j=2} & {j=3} \\[1ex]
    \hline {w_j} & {7} & {6} & {3} \\[1ex]
    \hline
    \end{array}
    $$

    Chiamiamo questa istanza del BPP <span style="color:#1971c2">[Esempio 10.1](#box-1-texexpbox_ilp_bpp)</span>.

    Il modello $\mathrm{ILP}_{\mathrm{BPP}}$ con $m=3$ per questa istanza del BPP è:

    $$
    \begin{array}{rccccccccccccr}
    {\min} &  &  &  &  &  &  &  &  &  & {y_{1}} & {+} {y_{2}} & {+} {y_{3}} &  \\[1ex]
    \text{soggetto a} & {x_{11}} & {+} {x_{12}} & {+} {x_{13}} &  &  &  &  &  &  &  &  &  & {=1} \\[1ex]
    &  &  &  & {x_{21}} & {+} {x_{22}} & {+} {x_{23}} &  &  &  &  &  &  & {=1} \\[1ex]
    &  &  &  &  &  &  & {x_{31}} & {+} {x_{32}} & {+} {x_{33}} &  &  &  & {=1} \\[1ex]
    & {-} {7x_{11}} &  &  & {-} {6x_{21}} &  &  & {-} {3x_{31}} &  &  & {+} {10y_1} &  &  & {\ge 0} \\[1ex]
    &  & {-} {7x_{12}} &  &  & {-} {6x_{22}} &  &  & {-} {3x_{32}} &  &  & {+} {10y_2} &  & {\ge 0} \\[1ex]
    &  &  & {-} {7x_{13}} &  &  & {-} {6x_{23}} &  &  & {-} {3x_{33}} &  &  & {+} {10y_3} & {\ge 0} \\[1ex]
    & {x_{11}}, & {x_{12}}, & {x_{13}}, & {x_{21}}, & {x_{22}}, & {x_{23}}, & {x_{31}}, & {x_{32}}, & {x_{33}}, & {y_{1}}, & {y_{2}}, & {y_{3}} & {\in \{0,1\}}
    \end{array}
    $$

    Una soluzione ottima ${\tilde{\vet{x}}}(\mathrm{ILP}_{\mathrm{BPP}})$ è:

    $$
    \tilde{x}_{11} = \tilde{x}_{31} = 1,~~ \tilde{x}_{12} = \tilde{x}_{13} =  \tilde{x}_{21} = 0,~~ \tilde{x}_{22} = 1,~~ \tilde{x}_{23} = \tilde{x}_{32} = \tilde{x}_{33} = 0,~~ \tilde{y}_1 = \tilde{y}_2 = 1,~~ \tilde{y}_3 = 0
    $$

    Un'altra soluzione ottima, ottenuta permutando gli indici dei contenitori $1$ e $2$, è:

    $$
    \tilde{x}_{12} = \tilde{x}_{32} = 1,~~ \tilde{x}_{11} = \tilde{x}_{13} =  \tilde{x}_{22} = 0,~~ \tilde{x}_{21} = 1,~~ \tilde{x}_{23} = \tilde{x}_{31} = \tilde{x}_{33} = 0,~~ \tilde{y}_1 = \tilde{y}_2 = 1,~~ \tilde{y}_3 = 0.
    $$

    Il valore ottimo è:

    $$
    z(\mathrm{ILP}_{\mathrm{BPP}}) = 2
    $$

    La soluzione ottima associata del BPP è data dagli schemi di riempimento

    $$
    \tilde{P}_1 = \{1,3\} \quad {\rm e} \quad  \tilde{P}_2 = \{2\}
    $$

    La soluzione ottima non è unica: anche gli schemi di riempimento $\{1\}$ e $\{2,3\}$ usano due contenitori.

## 10.3 Un primo rilassamento lineare

!!! chiave ""

    Per ottenere un rilassamento lineare del modello $\mathrm{ILP}_{\mathrm{BPP}}$, rilassiamo i vincoli $\eqref{cons4_BPP}$ e $\eqref{cons3_BPP}$ con i seguenti:

    \begin{align*}
    && x_{jb} &\ge 0, & \forall j \in \mathscr{I},~ \forall b \in \mathscr{B}, \label{cons4_BPP_LP}  \tag{10.2a}\\[2ex]
    && y_b &\ge 0, & \forall b \in \mathscr{B}. \label{cons3_BPP_LP} \tag{10.2b}
    \end{align*}

    Questo modello PL si chiama modello $\mathrm{LP}\text{-}0_{\mathrm{BPP}}$.

<a id="box-2-texexpbox_lp0_bpp"></a>

!!! esempio "Esempio 10.2: modello $\mathrm{LP}\text{-}0_{\mathrm{BPP}}$"

    Il modello $\mathrm{LP}\text{-}0_{\mathrm{BPP}}$ per l'istanza del BPP dell'<span style="color:#1971c2">[Esempio 10.1](#box-1-texexpbox_ilp_bpp)</span> è:

    $$
    \begin{array}{rccccccccccccr}
    {\min} &  &  &  &  &  &  &  &  &  & {y_{1}} & {+} {y_{2}} & {+} {y_{3}} &  \\[1ex]
    \text{soggetto a} & {x_{11}} & {+} {x_{12}} & {+} {x_{13}} &  &  &  &  &  &  &  &  &  & {=1} \\[1ex]
    &  &  &  & {x_{21}} & {+} {x_{22}} & {+} {x_{23}} &  &  &  &  &  &  & {=1} \\[1ex]
    &  &  &  &  &  &  & {x_{31}} & {+} {x_{32}} & {+} {x_{33}} &  &  &  & {=1} \\[1ex]
    & {-} {7x_{11}} &  &  & {-} {6x_{21}} &  &  & {-} {3x_{31}} &  &  & {+} {10y_1} &  &  & {\ge 0} \\[1ex]
    &  & {-} {7x_{12}} &  &  & {-} {6x_{22}} &  &  & {-} {3x_{32}} &  &  & {+} {10y_2} &  & {\ge 0} \\[1ex]
    &  &  & {-} {7x_{13}} &  &  & {-} {6x_{23}} &  &  & {-} {3x_{33}} &  &  & {+} {10y_3} & {\ge 0} \\[1ex]
    & {x_{11}}, & {x_{12}}, & {x_{13}}, & {x_{21}}, & {x_{22}}, & {x_{23}}, & {x_{31}}, & {x_{32}}, & {x_{33}}, & {y_{1}}, & {y_{2}}, & {y_{3}} & {\ge 0}
    \end{array}
    $$

    Una soluzione ottima ${\tilde{\vet{x}}}(\mathrm{LP}\text{-}0_{\mathrm{BPP}})$ è:

    $$
    \tilde x_{11}=\tilde x_{12}=\tilde  x_{13}=\tilde  x_{21}=\tilde x_{22}=\tilde  x_{23}= \tilde  x_{31}=\tilde x_{32}=\tilde  x_{33}=\frac{1}{3},
    \quad
    \tilde{y}_1 = \tilde{y}_2 = \tilde{y}_3 = \frac{8}{15}
    $$

    Il valore ottimo $z(\mathrm{LP}\text{-}0_{\mathrm{BPP}})$ è $\frac{8}{5}$.

    Di conseguenza, abbiamo il lower bound:

    $$
    \frac{8}{5} \leq z(\mathrm{ILP}_{\mathrm{BPP}})
    $$

    e, poiché $z(\mathrm{ILP}_{\mathrm{BPP}})$ è intero, $z(\mathrm{ILP}_{\mathrm{BPP}}) \ge \lceil \frac{8}{5} \rceil = 2$.

!!! chiave ""

    Con

    - una variabile duale libera $\mu_j$ per ogni vincolo $\eqref{cons1_BPP}$ ($j \in \mathscr{I}$)

    - una variabile duale non negativa $\pi_b$ per ogni vincolo $\eqref{cons2_BPP}$ ($b \in \mathscr{B}$)

    il modello duale del modello $\mathrm{LP}\text{-}0_{\mathrm{BPP}}$ è il seguente:

    <a id="eq-DUAL_0"></a>

    \begin{align*}
    && \max ~~ \sum_{j \in \mathscr{I}}  \mu_j \label{obj_D}  \tag{10.3a}\\[2ex]
    && \text{soggetto a} \quad \mu_j - w_j \; \pi_b &\le 0, & \forall j \in \mathscr{I},~\forall b \in \mathscr{B}, \label{cons2_D}  \tag{10.3b}\\[2ex]
    && c \; \pi_b &\le 1, & \forall b \in \mathscr{B}, \label{cons1_D}  \tag{10.3c}\\[2ex]
    && \mu_j &\gtreqless 0, & \forall j \in \mathscr{I}, \label{cons3_D}  \tag{10.3d}\\[2ex]
    && \pi_b &\ge 0, & \forall b \in \mathscr{B}. \label{cons4_D} \tag{10.3e}
    \end{align*}

    Questo modello PL si chiama modello duale $D(\mathrm{LP}\text{-}0_{\mathrm{BPP}})$.

<a id="box-3-texexpbox_dlp0_bpp"></a>

!!! esempio "Esempio 10.3: modello $D(\mathrm{LP}\text{-}0_{\mathrm{BPP}})$"

    Il modello duale $D(\mathrm{LP}\text{-}0_{\mathrm{BPP}})$ per l'istanza del BPP dell'<span style="color:#1971c2">[Esempio 10.1](#box-1-texexpbox_ilp_bpp)</span> è:

    $$
    \begin{array}{rccccccr}
    {\max} & {\mu_{1}} & {+} {\mu_{2}} & {+} {\mu_{3}} &  &  &  &  \\[1ex]
    \text{soggetto a} & {\mu_1} &  &  & {-} {7\pi_1} &  &  & {\le 0} \\[1ex]
    & {\mu_1} &  &  &  & {-} {7\pi_2} &  & {\le 0} \\[1ex]
    & {\mu_1} &  &  &  &  & {-} {7\pi_3} & {\le 0} \\[1ex]
    &  & {\mu_2} &  & {-} {6\pi_1} &  &  & {\le 0} \\[1ex]
    &  & {\mu_2} &  &  & {-} {6\pi_2} &  & {\le 0} \\[1ex]
    &  & {\mu_2} &  &  &  & {-} {6\pi_3} & {\le 0} \\[1ex]
    &  &  & {\mu_3} & {-} {3\pi_1} &  &  & {\le 0} \\[1ex]
    &  &  & {\mu_3} &  & {-} {3\pi_2} &  & {\le 0} \\[1ex]
    &  &  & {\mu_3} &  &  & {-} {3\pi_3} & {\le 0} \\[1ex]
    &  &  &  & {10\pi_1} &  &  & {\le 1} \\[1ex]
    &  &  &  &  & {10\pi_2} &  & {\le 1} \\[1ex]
    &  &  &  &  &  & {10\pi_3} & {\le 1} \\[1ex]
    & {\mu_1}, & {\mu_2}, & {\mu_3} &  &  &  & {\gtreqless 0} \\[1ex]
    &  &  &  & {\pi_1}, & {\pi_2}, & {\pi_3} & {\ge 0}
    \end{array}
    $$

    Una soluzione ottima $(\tilde{\vet{\mu}},\tilde{\vet{\pi}})$ di $D(\mathrm{LP}\text{-}0_{\mathrm{BPP}})$ è:

    $$
    \tilde{\mu}_1 = \frac{7}{10}, \quad \tilde{\mu}_2 = \frac{3}{5}, \quad \tilde{\mu}_3 = \frac{3}{10}, \quad \tilde{\pi}_1 = \tilde{\pi}_2 = \tilde{\pi}_3 = \frac{1}{10}
    $$

    Il valore ottimo $z(D(\mathrm{LP}\text{-}0_{\mathrm{BPP}}))$ è $\frac{8}{5}$.

<a id="box-4-prop_lp0_bpp_opt"></a>

!!! teorema "Proposizione 10.1"

    Una soluzione ottima del modello primale $\mathrm{LP}\text{-}0_{\mathrm{BPP}}$ è:

    \begin{equation*}
    \label{PP}
    \begin{aligned}
    \tilde{x}_{jb} &= \frac{1}{m},
    & \forall j \in \mathscr{I},\; \forall b \in \mathscr{B},\\[2ex]
    \tilde{y}_b &= \frac{\sum_{j \in \mathscr{I}}  w_j}{m \; c},
    & \forall b \in \mathscr{B},
    \end{aligned} \tag{10.4}
    \end{equation*}

    e una soluzione ottima del modello duale $D(\mathrm{LP}\text{-}0_{\mathrm{BPP}})$ è:

    \begin{equation*}
    \label{DD}
    \begin{aligned}
    \tilde{\mu}_j &= \frac{w_j}{c},
    & \forall j \in \mathscr{I},\\[2ex]
    \tilde{\pi}_b &= \frac{1}{c},
    & \forall b \in \mathscr{B}.
    \end{aligned} \tag{10.5}
    \end{equation*}

<a id="box-5-cor_lp0_bpp_value"></a>

!!! teorema "Corollario 10.2"

    Il valore ottimo dei modelli primale $\mathrm{LP}\text{-}0_{\mathrm{BPP}}$ e duale $D(\mathrm{LP}\text{-}0_{\mathrm{BPP}})$ è:

    \begin{equation*}
    \label{VAL_LP0_BPP}
    z(\mathrm{LP}\text{-}0_{\mathrm{BPP}})
    =
    \frac{\sum_{j \in \mathscr{I}} w_j}{c}
    =
    z(D(\mathrm{LP}\text{-}0_{\mathrm{BPP}})) \tag{10.6}
    \end{equation*}

- La dimostrazione procede in tre passi:

    1. mostriamo che $\eqref{PP}$ è una soluzione ammissibile del modello primale $\mathrm{LP}\text{-}0_{\mathrm{BPP}}$;

    2. mostriamo che $\eqref{DD}$ è una soluzione ammissibile del modello duale $D(\mathrm{LP}\text{-}0_{\mathrm{BPP}})$;

    3. mostriamo che le due soluzioni ammissibili hanno lo stesso valore della funzione obiettivo.

    Quindi, per la dualità debole della PL, $\eqref{PP}$ e $\eqref{DD}$ sono una coppia di soluzioni ottime primale e duale.

??? dimostrazione "Dimostrazione"

    - **1.** Per ogni $j \in \mathscr{I}$, abbiamo:

        $$
        \sum_{b \in \mathscr{B}} \tilde{x}_{jb} = \sum_{b \in \mathscr{B}} \frac{1}{m} = \frac{m}{m} = 1
        $$

        quindi i vincoli $\eqref{cons1_BPP}$ sono soddisfatti.

        Per ogni $b \in \mathscr{B}$, abbiamo:

        $$
        - \sum_{j \in \mathscr{I}}  w_j \; \tilde{x}_{jb} + c \; \tilde{y}_b = - \sum_{j \in \mathscr{I}}  w_j \; \frac{1}{m} + c \; \frac{\sum_{j \in \mathscr{I}}  w_j}{m \; c} = 0
        $$

        quindi i vincoli $\eqref{cons2_BPP}$ sono soddisfatti.

        Abbiamo $\tilde{x}_{jb} \geq 0$ e $\tilde{y}_b \geq 0$, per ogni $j \in \mathscr{I}$ e ogni $b \in \mathscr{B}$, quindi i vincoli $\eqref{cons4_BPP_LP}$ e $\eqref{cons3_BPP_LP}$ sono soddisfatti.

        Quindi $\eqref{PP}$ fornisce una soluzione ammissibile del modello primale $\mathrm{LP}\text{-}0_{\mathrm{BPP}}$.

    - **2.** Per ogni $b \in \mathscr{B}$ e ogni $j \in \mathscr{I}$, abbiamo:

        $$
        \tilde{\mu}_j - w_j \; \tilde{\pi}_b = \frac{w_j}{c} -   \frac{w_j}{c} = 0
        $$

        quindi i vincoli $\eqref{cons2_D}$ sono soddisfatti.

        Per ogni $b \in \mathscr{B}$, abbiamo:

        $$
        c \; \tilde{\pi}_b =  \frac{c}{c} = 1
        $$

        quindi i vincoli $\eqref{cons1_D}$ sono soddisfatti.

        Abbiamo $\tilde{\mu}_j \geq 0$ e $\tilde{\pi}_b \geq 0$, per ogni $b \in \mathscr{B}$ e ogni $j \in \mathscr{I}$, quindi i vincoli $\eqref{cons3_D}$ e $\eqref{cons4_D}$ sono soddisfatti.

        Quindi $\eqref{DD}$ fornisce una soluzione ammissibile del modello duale $D(\mathrm{LP}\text{-}0_{\mathrm{BPP}})$.

    - **3.** Per le funzioni obiettivo abbiamo:

        $$
        \sum_{b \in \mathscr{B}} \tilde{y}_b = \sum_{b \in \mathscr{B}} \frac{\sum_{j \in \mathscr{I}}  w_j}{m \; c} = \frac{\sum_{j \in \mathscr{I}}  w_j}{c} = \sum_{j \in \mathscr{I}}  \tilde{\mu}_j
        $$

        quindi i valori delle funzioni obiettivo primale e duale coincidono.

    Quindi, per la dualità debole della PL, $\eqref{PP}$ e $\eqref{DD}$ sono una coppia di soluzioni ottime primale e duale. <span class="qed">□</span>

- Riportiamo una dimostrazione alternativa, che non usa la formulazione duale ma ragiona direttamente sul valore minimo della funzione obiettivo imposto dai vincoli.

<a id="box-6-prop_lp0_bpp_alternative"></a>

!!! teorema "Proposizione 10.3"

    Una soluzione ottima del modello primale $\mathrm{LP}\text{-}0_{\mathrm{BPP}}$ è:

    \begin{equation*}
    \label{PP_alternative}
    \begin{aligned}
    \tilde{x}_{jb} &= \frac{1}{m},
    & \forall j \in \mathscr{I},\; \forall b \in \mathscr{B},\\[2ex]
    \tilde{y}_b &= \frac{\sum_{j \in \mathscr{I}}  w_j}{m \; c},
    & \forall b \in \mathscr{B},
    \end{aligned} \tag{10.7}
    \end{equation*}

    e il valore ottimo è

    \begin{equation*}
    \label{VAL_alternative}
    z(\mathrm{LP}\text{-}0_{\mathrm{BPP}}) = \frac{\sum_{j \in \mathscr{I}} w_j}{c}. \tag{10.8}
    \end{equation*}

??? dimostrazione "Dimostrazione"

    Sommando i vincoli di capacità $\eqref{cons2_BPP}$ su tutti i $b\in\mathscr{B}$ otteniamo

    $$
    c \sum_{b\in\mathscr{B}} y_b \;\ge\; \sum_{b\in\mathscr{B}} \sum_{j\in\mathscr{I}} w_j x_{jb}
    = \sum_{j\in\mathscr{I}} w_j \underbrace{\sum_{b\in\mathscr{B}} x_{jb}}_{\text{per }\eqref{cons1_BPP}=1}
    = \sum_{j\in\mathscr{I}} w_j,
    $$

    quindi

    \begin{equation*}
    \label{eq:bpp-lb}
    \sum_{b\in\mathscr{B}} y_b \;\ge\; \frac{1}{c}\sum_{j\in\mathscr{I}} w_j . \tag{10.9}
    \end{equation*}

    Quindi ogni soluzione ammissibile di $\mathrm{LP}\text{-}0_{\mathrm{BPP}}$ soddisfa $\eqref{eq:bpp-lb}$.

    Consideriamo ora il punto definito in $\eqref{PP_alternative}$. Per ogni $j\in\mathscr{I}$, abbiamo

    $$
    \sum_{b\in\mathscr{B}} \tilde x_{jb}
    = m \; \tfrac{1}{m}=1,
    $$

    quindi i vincoli $\eqref{cons1_BPP}$ valgono. Inoltre, per ogni $b\in\mathscr{B}$, abbiamo

    $$
    \sum_{j\in\mathscr{I}} w_j \tilde x_{jb}
    = \sum_{j\in\mathscr{I}} w_j \; \tfrac{1}{m}
    = \frac{1}{m} \sum_{j\in\mathscr{I}} w_j
    = c \; \tilde y_b ,
    $$

    quindi i vincoli $\eqref{cons2_BPP}$ valgono all'uguaglianza. Infine, i vincoli $\eqref{cons4_BPP_LP}$ e $\eqref{cons3_BPP_LP}$ sono soddisfatti per costruzione. Quindi il punto definito in $\eqref{PP_alternative}$ è una soluzione ammissibile di $\mathrm{LP}\text{-}0_{\mathrm{BPP}}$.

    Il valore obiettivo di $\eqref{PP_alternative}$ è

    $$
    \sum_{b\in\mathscr{B}} \tilde y_b
    = m \; \frac{\sum_{j\in\mathscr{I}} w_j}{m\,c}
    = \frac{1}{c} \sum_{j\in\mathscr{I}} w_j ,
    $$

    che coincide con il lower bound $\eqref{eq:bpp-lb}$. Quindi il punto $\eqref{PP_alternative}$ è una soluzione ottima con valore obiettivo $\eqref{VAL_alternative}$. <span class="qed">□</span>

## 10.4 Un secondo rilassamento lineare

!!! chiave ""

    Per ottenere un rilassamento lineare del modello $\mathrm{ILP}_{\mathrm{BPP}}$, rilassiamo i vincoli $\eqref{cons4_BPP}$ e $\eqref{cons3_BPP}$ con i seguenti:

    \begin{align*}
    && x_{jb} &\ge 0, & \forall j \in \mathscr{I},\; \forall b \in \mathscr{B}, \label{cons5_BPP_LP_LL}  \tag{10.10a}\\[2ex]
    && y_{b} &\le 1, & \forall b \in \mathscr{B}, \label{cons3_BPP_LP_LL}  \tag{10.10b}\\[2ex]
    && y_{b} &\ge 0, & \forall b \in \mathscr{B}. \label{cons4_BPP_LP_LL} \tag{10.10c}
    \end{align*}

    Questo modello PL si chiama modello $\mathrm{LP}_{\mathrm{BPP}}$.

<a id="box-7-texexpbox_lp_bpp"></a>

!!! esempio "Esempio 10.4: modello $\mathrm{LP}_{\mathrm{BPP}}$"

    Il modello $\mathrm{LP}_{\mathrm{BPP}}$ per l'istanza del BPP dell'<span style="color:#1971c2">[Esempio 10.1](#box-1-texexpbox_ilp_bpp)</span> è:

    $$
    \begin{array}{rccccccccccccr}
    {\min} &  &  &  &  &  &  &  &  &  & {y_{1}} & {+} {y_{2}} & {+} {y_{3}} &  \\[1ex]
    \text{soggetto a} & {x_{11}} & {+} {x_{12}} & {+} {x_{13}} &  &  &  &  &  &  &  &  &  & {=1} \\[1ex]
    &  &  &  & {x_{21}} & {+} {x_{22}} & {+} {x_{23}} &  &  &  &  &  &  & {=1} \\[1ex]
    &  &  &  &  &  &  & {x_{31}} & {+} {x_{32}} & {+} {x_{33}} &  &  &  & {=1} \\[1ex]
    & {-} {7x_{11}} &  &  & {-} {6x_{21}} &  &  & {-} {3x_{31}} &  &  & {+} {10y_1} &  &  & {\ge 0} \\[1ex]
    &  & {-} {7x_{12}} &  &  & {-} {6x_{22}} &  &  & {-} {3x_{32}} &  &  & {+} {10y_2} &  & {\ge 0} \\[1ex]
    &  &  & {-} {7x_{13}} &  &  & {-} {6x_{23}} &  &  & {-} {3x_{33}} &  &  & {+} {10y_3} & {\ge 0} \\[1ex]
    &  &  &  &  &  &  &  &  &  & {y_{1}} &  &  & {\le 1} \\[1ex]
    &  &  &  &  &  &  &  &  &  &  & {y_{2}} &  & {\le 1} \\[1ex]
    &  &  &  &  &  &  &  &  &  &  &  & {y_{3}} & {\le 1} \\[1ex]
    & {x_{11}}, & {x_{12}}, & {x_{13}}, & {x_{21}}, & {x_{22}}, & {x_{23}}, & {x_{31}}, & {x_{32}}, & {x_{33}}, & {y_{1}}, & {y_{2}}, & {y_{3}} & {\ge 0}
    \end{array}
    $$

    Una soluzione ottima ${\tilde{\vet{x}}}(\mathrm{LP}_{\mathrm{BPP}})$ è:

    $$
    \tilde x_{11}=\tilde x_{12}=\tilde  x_{13}=\tilde  x_{21}=\tilde x_{22}=\tilde  x_{23}= \tilde  x_{31}=\tilde x_{32}=\tilde  x_{33}=\frac{1}{3},
    \quad
    \tilde{y}_1 = \tilde{y}_2 = \tilde{y}_3 = \frac{8}{15}
    $$

    Il valore ottimo $z(\mathrm{LP}_{\mathrm{BPP}})$ è $\frac{8}{5}$. Di conseguenza, abbiamo lo stesso lower bound di prima.

!!! chiave ""

    Con

    - una variabile duale libera $\mu_j$ per ogni vincolo $\eqref{cons1_BPP}$ ($j \in \mathscr{I}$)

    - una variabile duale non negativa $\pi_b$ per ogni vincolo $\eqref{cons2_BPP}$ ($b \in \mathscr{B}$)

    - una variabile duale non positiva $\lambda_b$ per ogni vincolo $\eqref{cons3_BPP_LP_LL}$ ($b \in \mathscr{B}$)

    il modello duale del modello $\mathrm{LP}_{\mathrm{BPP}}$ è il seguente:

    <a id="eq-DUAL_2"></a>

    \begin{align*}
    &&   \max  ~~ \sum_{j \in \mathscr{I}}   \mu_{j} + \sum_{b \in \mathscr{B}}  \lambda_{b} \label{obj_D_2}  \tag{10.11a}\\[2ex]
    && \text{soggetto a} \quad \mu_j - w_j \; \pi_{b} &\leq 0, & \forall j \in \mathscr{I},\; \forall b \in \mathscr{B}, \label{cons2_D_2}  \tag{10.11b}\\[2ex]
    && c \; \pi_{b} + \lambda_b &\leq 1, & \forall b \in \mathscr{B}, \label{cons1_D_2}  \tag{10.11c}\\[2ex]
    && \mu_{j} &\gtreqless 0, & \forall j \in \mathscr{I}, \label{cons3_D_2}  \tag{10.11d}\\[2ex]
    && \pi_{b} &\ge 0, & \forall b \in \mathscr{B}, \label{cons4_D_2}  \tag{10.11e}\\[2ex]
    && \lambda_{b} &\le 0, & \forall b \in \mathscr{B}. \label{cons5_D_2} \tag{10.11f}
    \end{align*}

    Questo modello PL si chiama modello duale $D(\mathrm{LP}_{\mathrm{BPP}})$.

<a id="box-8-texexpbox_dlp_bpp"></a>

!!! esempio "Esempio 10.5: modello $D(\mathrm{LP}_{\mathrm{BPP}})$"

    Il modello $D(\mathrm{LP}_{\mathrm{BPP}})$ dell'<span style="color:#1971c2">[Esempio 10.1](#box-1-texexpbox_ilp_bpp)</span> è:

    $$
    \begin{array}{rcccccccccc}
    {\max} & {\mu_{1}} & {+} {\mu_{2}} & {+} {\mu_{3}} &  &  &  & {+} {\lambda_{1}} & {+} {\lambda_{2}} & {+} {\lambda_{3}} &  \\[1ex]
    \text{soggetto a} & {\mu_1} &  &  & {-} {7\pi_1} &  &  &  &  &  & {\le 0} \\[1ex]
    & {\mu_1} &  &  &  & {-} {7\pi_2} &  &  &  &  & {\le 0} \\[1ex]
    & {\mu_1} &  &  &  &  & {-} {7\pi_3} &  &  &  & {\le 0} \\[1ex]
    &  & {\mu_2} &  & {-} {6\pi_1} &  &  &  &  &  & {\le 0} \\[1ex]
    &  & {\mu_2} &  &  & {-} {6\pi_2} &  &  &  &  & {\le 0} \\[1ex]
    &  & {\mu_2} &  &  &  & {-} {6\pi_3} &  &  &  & {\le 0} \\[1ex]
    &  &  & {\mu_3} & {-} {3\pi_1} &  &  &  &  &  & {\le 0} \\[1ex]
    &  &  & {\mu_3} &  & {-} {3\pi_2} &  &  &  &  & {\le 0} \\[1ex]
    &  &  & {\mu_3} &  &  & {-} {3\pi_3} &  &  &  & {\le 0} \\[1ex]
    &  &  &  & {10\pi_1} &  &  & {+\lambda_1} &  &  & {\le 1} \\[1ex]
    &  &  &  &  & {10\pi_2} &  &  & {+\lambda_2} &  & {\le 1} \\[1ex]
    &  &  &  &  &  & {10\pi_3} &  &  & {+\lambda_3} & {\le 1} \\[1ex]
    & {\mu_1}, & {\mu_2}, & {\mu_3} &  &  &  &  &  &  & {\gtreqless 0} \\[1ex]
    &  &  &  & {\pi_1}, & {\pi_2}, & {\pi_3} &  &  &  & {\ge 0} \\[1ex]
    &  &  &  &  &  &  & {\lambda_1}, & {\lambda_2}, & {\lambda_3} & {\le 0}
    \end{array}
    $$

    Il valore ottimo $z(D(\mathrm{LP}_{\mathrm{BPP}}))$ è $\frac{8}{5}$. Una soluzione ottima $(\tilde{\vet{\mu}},\tilde{\vet{\pi}},\tilde{\vet{\lambda}})$ di $D(\mathrm{LP}_{\mathrm{BPP}})$ è:

    $$
    \tilde \mu_{1}= \frac{7}{10},~~~~\tilde \mu_{2}=\frac{3}{5},~~~~\tilde  \mu_{3}=\frac{3}{10},~~~~\tilde \pi_{1}= \tilde \pi_{2}=\tilde \pi_{3}=\frac{1}{10},~~~~\tilde  \lambda_{1}=\tilde  \lambda_{2}=\tilde \lambda_{3}=0
    $$

- I vincoli:

    $$
    x_{jb} \le 1, \qquad \forall j \in \mathscr{I},\; \forall b \in \mathscr{B},
    $$

    sono anch'essi validi poiché, per ogni $j \in \mathscr{I}$ e ogni $b \in \mathscr{B}$, abbiamo:

    $$
    x_{jb} \in \{0,1\} ~~~~~\Rightarrow~~~~~ x_{jb} \le 1
    $$

    ma sono implicati dai vincoli $\eqref{cons1_BPP}$.

<a id="box-9-prop_lp_bpp_opt"></a>

!!! teorema "Proposizione 10.4"

    Una soluzione ottima del modello primale $\mathrm{LP}_{\mathrm{BPP}}$ è:

    \begin{equation*}
    \label{PP_bis}
    \begin{aligned}
    \tilde{x}_{jb} &= \frac{1}{m},
    & \forall j \in \mathscr{I},~ \forall b \in \mathscr{B},\\[2ex]
    \tilde{y}_b &= \frac{\sum_{j \in \mathscr{I}}  w_j}{m \; c},
    & \forall b \in \mathscr{B},
    \end{aligned} \tag{10.12}
    \end{equation*}

    e una soluzione ottima del modello duale $D(\mathrm{LP}_{\mathrm{BPP}})$ è:

    \begin{equation*}
    \label{DD_bis}
    \begin{aligned}
    \tilde{\mu}_j &= \frac{w_j}{c},
    & \forall j \in \mathscr{I},\\[2ex]
    \tilde{\pi}_b &= \frac{1}{c},
    & \forall b \in \mathscr{B},\\[2ex]
    \tilde{\lambda}_b &= 0,
    & \forall b \in \mathscr{B}.
    \end{aligned} \tag{10.13}
    \end{equation*}

<a id="box-10-cor_lp_bpp_value"></a>

!!! teorema "Corollario 10.5"

    Il valore ottimo dei modelli primale $\mathrm{LP}_{\mathrm{BPP}}$ e duale $D(\mathrm{LP}_{\mathrm{BPP}})$ è:

    \begin{equation*}
    \label{VAL_LP_BPP}
    z(\mathrm{LP}_{\mathrm{BPP}})
    =
    \frac{\sum_{j \in \mathscr{I}} w_j}{c}
    =
    z(D(\mathrm{LP}_{\mathrm{BPP}})) \tag{10.14}
    \end{equation*}

??? dimostrazione "Dimostrazione"

    La dimostrazione è simile alla precedente. In più, occorre osservare che

    $$
    \tilde{y}_b = \frac{\sum_{j \in \mathscr{I}}  w_j}{m \; c} \le 1, \quad \forall b \in \mathscr{B},
    $$

    poiché $\sum_{j} w_j / c \le z(\mathrm{ILP}_{\mathrm{BPP}}) \le m$, dove l'ultima disuguaglianza vale perché $m$ è un upper bound sul numero di contenitori in una qualunque soluzione ottima del BPP. Di conseguenza, anche i vincoli $\eqref{cons3_BPP_LP_LL}$ sono soddisfatti. <span class="qed">□</span>

### 10.4.1 Alcune proprietà teoriche importanti

- Le due proposizioni seguenti mostrano che il rapporto fra $z(\mathrm{LP}_{\mathrm{BPP}})$ e $z(\mathrm{ILP}_{\mathrm{BPP}})$ è almeno un mezzo per ogni istanza del BPP (<strong>per ipotesi</strong> $z(\mathrm{ILP}_{\mathrm{BPP}}) >1$, poiché gli oggetti non entrano tutti in un solo contenitore). Inoltre, esistono istanze per cui il valore un mezzo si raggiunge asintoticamente quando la capacità $c \to +\infty$.

<a id="box-11-prop_lp_bpp_ratio_half"></a>

!!! teorema "Proposizione 10.6"

    Per ogni istanza del BPP abbiamo:

    \begin{equation*}
    \frac{ z(\mathrm{LP}_{\mathrm{BPP}}) }{z(\mathrm{ILP}_{\mathrm{BPP}})} \ge \frac{1}{2} \tag{10.15}
    \end{equation*}

??? dimostrazione "Dimostrazione"

    Consideriamo una soluzione ottima $\tilde{\vet{x}}(\mathrm{ILP}_{\mathrm{BPP}})$ di valore $z=z(\mathrm{ILP}_{\mathrm{BPP}})$ (numero di contenitori usati). Possiamo supporre, senza perdita di generalità, che i contenitori $1,2,\dots,z$ siano quelli non vuoti.

    In una soluzione ottima, due contenitori non possono avere entrambi peso totale degli oggetti al più $c/2$, altrimenti il loro contenuto si potrebbe unire in un solo contenitore senza superare la capacità $c$ (contro l'ottimalità).

    Se tutti i contenitori non vuoti hanno peso totale degli oggetti maggiore di $c/2$, allora

    $$
    \sum_{j\in\mathscr{I}} w_j
    =\sum_{b=1}^{z}\sum_{j\in\mathscr{I}} w_j\,\tilde x_{jb}
    >z \;\frac{c}{2}
    ~~~ \Longrightarrow ~~~
    \frac{ \frac{\sum_{j\in\mathscr{I}} w_j}{c} }{z} > \frac{1}{2}
    ~~~ \Longrightarrow ~~~
    \frac{ z(\mathrm{LP}_{\mathrm{BPP}}) }{z(\mathrm{ILP}_{\mathrm{BPP}})} \ge \frac{1}{2}.
    $$

    Altrimenti, supponiamo che esista un contenitore con peso totale degli oggetti al più $c/2$. Rinumerando i contenitori se necessario, sia il contenitore $z$, così che

    $$
    \sum_{j\in\mathscr{I}} w_j\,\tilde x_{jz}\le \frac{c}{2}.
    $$

    Poiché $z>1$, esiste un altro contenitore, diciamo il contenitore 1; per l'ottimalità, deve valere

    $$
    \sum_{j\in\mathscr{I}} w_j\,\tilde x_{j1}
    +
    \sum_{j\in\mathscr{I}} w_j\,\tilde x_{jz}
    \;>\; c,
    $$

    e, per l'ottimalità, ogni contenitore in $\{2,3,\dots,z-1\}$ ha peso totale degli oggetti $>c/2$. Quindi,

    $$
    \begin{aligned}
    \sum_{j\in\mathscr I} w_j
    &=\sum_{b=1}^{z}\sum_{j\in\mathscr I} w_j\,\tilde x_{jb}\ =\underbrace{\sum_{b=2}^{z-1}\sum_{j\in\mathscr I} w_j\,\tilde x_{jb}}_{\ge\frac{c}{2}(z-2)}
    \;+\; \underbrace{\sum_{j\in\mathscr I} w_j\,\tilde x_{j1}
    \;+\;\sum_{j\in\mathscr I} w_j\,\tilde x_{jz}}_{>c}\\[1ex]
    &>\frac{c}{2}(z-2)+c
    =z\,\frac{c}{2}
    ~~~ \Longrightarrow ~~~
    \frac{ \frac{\sum_{j\in\mathscr{I}} w_j}{c} }{z} > \frac{1}{2}
    ~~~ \Longrightarrow ~~~
    \frac{ z(\mathrm{LP}_{\mathrm{BPP}}) }{z(\mathrm{ILP}_{\mathrm{BPP}})} \ge \frac{1}{2}.
    \end{aligned}
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-12-prop_lp_bpp_ratio_tight"></a>

!!! teorema "Proposizione 10.7"

    Esistono istanze del BPP tali che:

    \begin{equation*}
    \frac{ z(\mathrm{LP}_{\mathrm{BPP}}) }{z(\mathrm{ILP}_{\mathrm{BPP}})} \to \frac{1}{2} \text{    per    } c \to +\infty \tag{10.16}
    \end{equation*}

??? dimostrazione "Dimostrazione"

    Dato $\vartheta \in \Z_{\ge 1}$, consideriamo l'istanza del BPP con capacità dei contenitori $c = 2\vartheta$ e $n$ oggetti con i seguenti pesi:

    $$
    w_j = \vartheta+1,~~~ \forall j \in \mathscr{I}.
    $$

    Nessun contenitore può contenere più di un oggetto, quindi ogni oggetto va inserito da solo nel proprio contenitore. Quindi il valore ottimo del BPP è

    $$
    z(\mathrm{ILP}_{\mathrm{BPP}}) = n.
    $$

    Per il rilassamento lineare abbiamo:

    $$
    z(\mathrm{LP}_{\mathrm{BPP}})  =  \frac{n(\vartheta+1)}{2\;\vartheta}.
    $$

    Ne segue che:

    \begin{align*}
    \lim_{\vartheta \to +\infty} \frac{ z(\mathrm{LP}_{\mathrm{BPP}}) }{z(\mathrm{ILP}_{\mathrm{BPP}})}
    &= \lim_{\vartheta \to +\infty} \frac{ \frac{n(\vartheta+1)}{2\;\vartheta} }{n}
    =\lim_{\vartheta \to +\infty}  \left( \frac{1}{2} + \underbrace{\frac{1}{2\;\vartheta}}_{\to 0}  \right) = \frac{1}{2}.
    \end{align*}

    Di conseguenza, concludiamo che:

    $$
    \frac{ z(\mathrm{LP}_{\mathrm{BPP}}) }{z(\mathrm{ILP}_{\mathrm{BPP}})} \to \frac{1}{2} \qquad \text{per} \qquad c \to +\infty.
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

- Le due proposizioni seguenti mostrano che il rapporto fra $\lceil z(\mathrm{LP}_{\mathrm{BPP}}) \rceil$ e $z(\mathrm{ILP}_{\mathrm{BPP}})$ è almeno un mezzo per ogni istanza del BPP. Inoltre, esistono istanze per cui il valore un mezzo si raggiunge asintoticamente quando il numero di oggetti $n \to +\infty$.

<a id="box-13-prop_ceil_lp_bpp_ratio_half"></a>

!!! teorema "Proposizione 10.8"

    Per ogni istanza del BPP abbiamo:

    \begin{equation*}
    \frac{\lceil z(\mathrm{LP}_{\mathrm{BPP}}) \rceil}{z(\mathrm{ILP}_{\mathrm{BPP}})} \ge \frac{1}{2} \tag{10.17}
    \end{equation*}

??? dimostrazione "Dimostrazione"

    Consideriamo una soluzione ottima $\tilde{\vet{x}}(\mathrm{ILP}_{\mathrm{BPP}})$ di valore $z=z(\mathrm{ILP}_{\mathrm{BPP}})$ (numero di contenitori usati). Possiamo supporre, senza perdita di generalità, che i contenitori $1,2,\dots,z$ siano quelli non vuoti.

    In una soluzione ottima, due contenitori non possono avere entrambi peso totale degli oggetti al più $c/2$, altrimenti il loro contenuto si potrebbe unire in un solo contenitore senza superare la capacità $c$ (contro l'ottimalità).

    Se tutti i contenitori non vuoti hanno peso totale degli oggetti maggiore di $c/2$, allora

    $$
    \begin{aligned}
    \sum_{j\in\mathscr{I}} w_j
    &=\sum_{b=1}^{z}\sum_{j\in\mathscr{I}} w_j\,\tilde x_{jb}
    >\frac{z\,c}{2}
    ~~~ \Longrightarrow ~~~
    \frac{\sum_{j\in\mathscr{I}} w_j}{c} > \frac{z}{2}
    ~~~ \Longrightarrow ~~~
    \left\lceil \frac{\sum_{j\in\mathscr{I}} w_j}{c} \right\rceil \ge \left\lceil \frac{z}{2} \right\rceil \ge \frac{z}{2} \\[2ex]
    &\Longrightarrow ~~~
    \frac{\left\lceil \frac{\sum_{j\in\mathscr{I}} w_j}{c} \right\rceil}{z} \ge \frac{1}{2}
    ~~~ \Longrightarrow ~~~
    \frac{\lceil z(\mathrm{LP}_{\mathrm{BPP}})\rceil}{z(\mathrm{ILP}_{\mathrm{BPP}})} \ge \frac{1}{2}.
    \end{aligned}
    $$

    Altrimenti, supponiamo che esista un contenitore con peso totale degli oggetti al più $c/2$. Rinumerando i contenitori se necessario, sia il contenitore $z$. Allora abbiamo:

    $$
    \sum_{j \in \mathscr{I}}  w_j
    =\sum_{b=1}^{z} \sum_{j \in \mathscr{I}}  w_j \tilde{x}_{jb}
    >  \sum_{b=1}^{z-1} \sum_{j \in \mathscr{I}}  w_j \tilde{x}_{jb}
    >
    (z-1)\frac{c}{2}
    ~~~ \Longrightarrow ~~~
    z < 2 \sum_{j \in \mathscr{I}}  \frac{w_j}{c} + 1.
    $$

    Poiché $z$ è intero, questo implica:

    $$
    z \le \left\lceil 2 \sum_{j \in \mathscr{I}}  \frac{w_j}{c} \right\rceil
    \le 2 \left\lceil  \sum_{j \in \mathscr{I}}  \frac{w_j}{c} \right\rceil .
    $$

    Quindi:

    $$
    \frac{\left\lceil  \sum_{j \in \mathscr{I}}  \frac{w_j}{c} \right\rceil }{z} \ge \frac{1}{2} ~~~~
    \Longrightarrow ~~~~
    \frac{\lceil z(\mathrm{LP}_{\mathrm{BPP}}) \rceil}{z(\mathrm{ILP}_{\mathrm{BPP}})} \ge \frac{1}{2}.
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-14-prop_ceil_lp_bpp_ratio_tight"></a>

!!! teorema "Proposizione 10.9"

    Esistono istanze del BPP tali che:

    \begin{equation*}
    \frac{\lceil z(\mathrm{LP}_{\mathrm{BPP}}) \rceil}{z(\mathrm{ILP}_{\mathrm{BPP}})}  \to \frac{1}{2} \text{    per    } n \to +\infty \tag{10.18}
    \end{equation*}

??? dimostrazione "Dimostrazione"

    Dato $n \in \Z_{\ge 2}$ (con $n$ pari), consideriamo l'istanza del BPP con capacità dei contenitori $c=n$ e $n$ oggetti con i seguenti pesi:

    $$
    w_j=\frac{c}{2}+1=\frac{n}{2}+1, \qquad \forall j\in\mathscr I.
    $$

    Nessun contenitore può contenere più di un oggetto, poiché $w_j>c/2$ per ogni $j$. Quindi ogni oggetto va inserito da solo nel proprio contenitore, e il valore ottimo del BPP è

    $$
    z(\mathrm{ILP}_{\mathrm{BPP}})=n.
    $$

    Per il rilassamento lineare abbiamo:

    $$
    z(\mathrm{LP}_{\mathrm{BPP}})=\frac{\sum_{j\in\mathscr I} w_j}{c}
    =\frac{n\left(\frac{n}{2}+1\right)}{n}
    =\frac{n}{2}+1,
    $$

    quindi $\lceil z(\mathrm{LP}_{\mathrm{BPP}})\rceil=\frac{n}{2}+1$ (poiché $n$ è pari). Ne segue che:

    $$
    \lim_{n\to+\infty}\frac{\lceil z(\mathrm{LP}_{\mathrm{BPP}})\rceil}{z(\mathrm{ILP}_{\mathrm{BPP}})}
    =
    \lim_{n\to+\infty}\frac{\frac{n}{2}+1}{n}
    =
    \lim_{n\to+\infty}\left(\frac{1}{2}+\underbrace{\frac{1}{n}}_{\to 0}\right)
    =\frac{1}{2}.
    $$

    Di conseguenza, concludiamo che:

    $$
    \frac{\lceil z(\mathrm{LP}_{\mathrm{BPP}})\rceil}{z(\mathrm{ILP}_{\mathrm{BPP}})} \to \frac{1}{2}
    \qquad \text{per} \qquad n \to +\infty.
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

---

**Avanti:** [10.5 Un modello PLI per il problema del cutting stock](un-modello-pli-per-il-problema-del-cutting-stock.md)
