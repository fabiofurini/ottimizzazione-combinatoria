---
title: "Colorazione dei vertici"
---

# 11.2 Un modello PLI per il problema della colorazione dei vertici { #sez-sec-colf-VCP }

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 11** · [:material-book-open-variant: Capitolo 11: Problemi di colorazione](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-pencil: Esercizi: Problemi di colorazione](../../esercizi/coloring-formulations.md)

</div>

Il problema della colorazione dei vertici e le sue ipotesi sono definiti nel [Capitolo 4 «Problemi di colorazione», Sezione 4.2](../../problemi-di-ottimizzazione-combinatoria/coloring/il-problema-della-colorazione-dei-vertici.md).

- Dato un grafo $G=(V,E)$, per un vertice $v \in V$ indichiamo con $\delta(v)$ l'insieme degli spigoli incidenti in $v$.

- Dato un upper bound $k \in \Z_{\ge 2}$ sul numero di colori usati in una qualunque soluzione ottima del VCP, introduciamo le seguenti $k\;\underbrace{|V|}_{=n}$ variabili binarie:

    \begin{equation*}
    x_{vc} =
    \begin{cases}
    1 & \text{se il vertice } v \text{ prende il colore } c, \\
    0 & \text{altrimenti}
    \end{cases}
    \qquad \forall v \in \underbrace{\{1,2,\dots,n\}}_{=V},~\forall c \in \underbrace{\{1,2,\dots,k\}}_{=\mathscr{C}}, \tag{11.1}
    \end{equation*}

    e le seguenti $k$ variabili binarie:

    \begin{equation*}
    y_{c} =
    \begin{cases}
    1 & \text{se il colore } c \text{ è usato}, \\
    0 & \text{altrimenti}
    \end{cases}
    \qquad \forall c \in \underbrace{\{1,2,\dots,k\}}_{=\mathscr{C}}. \tag{11.2}
    \end{equation*}

    Il numero $n$ di vertici è un upper bound valido sul numero minimo di colori necessari per colorare tutti i vertici poiché, nel caso peggiore, ogni vertice prende un colore diverso. Anche il numero di colori usati in una qualunque soluzione ammissibile del VCP è un upper bound valido.

!!! chiave ""

    Con queste variabili, un modello di programmazione lineare intera (PLI) per il problema della colorazione dei vertici (VCP) è il seguente:

    <a id="eq-NAT_VCP"></a>

    \begin{align*}
    && \min \quad \sum_{c \in \mathscr{C}} y_{c} \label{obj_VCP}  \tag{11.3a}\\[2ex]
    && \text{soggetto a} \quad \sum_{c \in \mathscr{C}} x_{vc} &= 1, & \forall v \in V, \label{cons1_VCP}  \tag{11.3b}\\[2ex]
    && - x_{uc} - x_{vc} + y_c &\geq 0, & \forall c \in \mathscr{C},~\forall \{u,v\} \in E, \label{cons2_VCP}  \tag{11.3c}\\[2ex]
    && x_{vc} &\in \{0,1\}, & \forall v \in V,~ \forall c \in \mathscr{C}, \label{cons4_VCP}  \tag{11.3d}\\[2ex]
    && y_{c} &\in \{0,1\}, & \forall c \in \mathscr{C}. \label{cons3_VCP} \tag{11.3e}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{VCP}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{VCP}}$:

    - la funzione obiettivo lineare $\eqref{obj_VCP}$ minimizza il numero totale di colori usati;

    - i vincoli $\eqref{cons1_VCP}$ garantiscono che ogni vertice prenda esattamente un colore ($n$ vincoli lineari);

    - i vincoli $\eqref{cons2_VCP}$ garantiscono che, per ogni colore e ogni spigolo, i due vertici adiacenti non prendano entrambi quel colore, e che nessun vertice prenda un colore non usato ($k \; \underbrace{|E|}_{=m}$ vincoli lineari);

    - infine, i vincoli $\eqref{cons4_VCP}$ e $\eqref{cons3_VCP}$ definiscono le variabili del modello PLI.

<strong>Spiegazione del legame fra le variabili</strong>

- <strong>Se il colore $c$ è assegnato a un vertice, allora è usato.</strong> L'implicazione logica è

    $$
    (x_{1c} {\tt ~OR~} x_{2c} {\tt ~OR~} \dots {\tt ~OR~} x_{nc}) ~~~ \Longrightarrow ~~~ y_c .
    $$

    Ogni vertice ha uno spigolo incidente $\{u,v\}$, e il vincolo $x_{uc}+x_{vc} \le y_c$ impone $y_c=1$ non appena $x_{vc}=1$.

- <strong>Se il colore $c$ non è usato, allora nessun vertice lo prende.</strong> È la contronominale dell'implicazione precedente. Per $y_c=0$ il vincolo sullo spigolo dà $x_{uc}=x_{vc}=0$ per ogni spigolo $\{u,v\}\in E$.

- <strong>Se il colore $c$ è usato, allora qualche vertice lo prende, ma solo in una soluzione ottima.</strong> I vincoli non lo impongono. Tuttavia, se $x_{vc}=0$ per ogni $v$ e $y_c=1$, porre $y_c=0$ mantiene soddisfatti tutti i vincoli e diminuisce di uno il valore obiettivo. Quindi, in ogni soluzione ottima, i colori non usati non sono contati.

<a id="box-1-texexpbox_ilp_vcp"></a>

!!! esempio "Esempio 11.1: modello $\mathrm{ILP}_{\mathrm{VCP}}$"

    Consideriamo il seguente grafo $G = (V,E)$ con $3$ vertici ($n=3$) e $3$ spigoli ($m=3$):

    ![Figura 1](../../img/coloring-formulations/fig01.svg){ .fig .ovale loading=lazy style="width:24%" }

    L'insieme dei vertici $V$ e l'insieme degli spigoli $E$ sono:

    $$
    V = \big\{~ 1,~ 2,~ 3 ~\big\}, \qquad E = \big\{~ \{1,2\},~ \{1,3\},~ \{2,3\} ~\big\}.
    $$

    Chiamiamo questa istanza del VCP <span style="color:#1971c2">[Esempio 11.1](#box-1-texexpbox_ilp_vcp)</span>.

    Il modello $\mathrm{ILP}_{\mathrm{VCP}}$ con $k=3$ per questa istanza è:

    $$
    \begin{array}{rccccccccccccr}
    {\min} &  &  &  &  &  &  &  &  &  & {y_1} & {+} {y_2} & {+} {y_3} &  \\[1ex]
    \text{soggetto a} & {x_{11}} & {+} {x_{12}} & {+} {x_{13}} &  &  &  &  &  &  &  &  &  & {=1} \\[1ex]
    &  &  &  & {x_{21}} & {+} {x_{22}} & {+} {x_{23}} &  &  &  &  &  &  & {=1} \\[1ex]
    &  &  &  &  &  &  & {x_{31}} & {+} {x_{32}} & {+} {x_{33}} &  &  &  & {=1} \\[1ex]
    & {-x_{11}} &  &  & {-x_{21}} &  &  &  &  &  & {+} {y_1} &  &  & {\ge 0} \\[1ex]
    & {-x_{11}} &  &  &  &  &  & {-x_{31}} &  &  & {+} {y_1} &  &  & {\ge 0} \\[1ex]
    &  &  &  & {-x_{21}} &  &  & {-x_{31}} &  &  & {+} {y_1} &  &  & {\ge 0} \\[1ex]
    &  & {-x_{12}} &  &  & {-x_{22}} &  &  &  &  &  & {+} {y_2} &  & {\ge 0} \\[1ex]
    &  & {-x_{12}} &  &  &  &  &  & {-x_{32}} &  &  & {+} {y_2} &  & {\ge 0} \\[1ex]
    &  &  &  &  & {-x_{22}} &  &  & {-x_{32}} &  &  & {+} {y_2} &  & {\ge 0} \\[1ex]
    &  &  & {-x_{13}} &  &  & {-x_{23}} &  &  &  &  &  & {+} {y_3} & {\ge 0} \\[1ex]
    &  &  & {-x_{13}} &  &  &  &  &  & {-x_{33}} &  &  & {+} {y_3} & {\ge 0} \\[1ex]
    &  &  &  &  &  & {-x_{23}} &  &  & {-x_{33}} &  &  & {+} {y_3} & {\ge 0} \\[1ex]
    & {x_{11}}, & {x_{12}}, & {x_{13}}, & {x_{21}}, & {x_{22}}, & {x_{23}}, & {x_{31}}, & {x_{32}}, & {x_{33}}, & {y_1}, & {y_2}, & {y_3} & {\in \{0,1\}}
    \end{array}
    $$

    Una soluzione ottima ${\tilde{\vet x}}(\mathrm{ILP}_{\mathrm{VCP}})$ è:

    $$
    \tilde x_{11}=1,~~\tilde x_{12}=\tilde  x_{13}=\tilde  x_{21}=0,~~\tilde x_{22}=1,~~\tilde  x_{23}=\tilde  x_{31}=\tilde x_{32}=0,~~\tilde  x_{33}=1,~~ \tilde y_{1}=\tilde y_{2}=\tilde  y_{3}=1
    $$

    Il valore ottimo $z(\mathrm{ILP}_{\mathrm{VCP}})$ è $3$. 

    La soluzione ottima associata del VCP è data dalle classi di colore $\tilde{Q}_1 =\{1\}$, $\tilde{Q}_2 =\{2\}$ e $\tilde{Q}_3 =\{3\}$. La partizione ottima è unica, ma le $3!$ permutazioni dei colori danno $6$ soluzioni ottime diverse.

## 11.3 Un primo rilassamento lineare

!!! chiave ""

    Per ottenere un rilassamento lineare del modello $\mathrm{ILP}_{\mathrm{VCP}}$, rilassiamo i vincoli $\eqref{cons4_VCP}$ e $\eqref{cons3_VCP}$ con i seguenti:

    \begin{align*}
    &&x_{vc}                        &\ge 0, & \forall v \in V,~ \forall c \in \mathscr{C}, \label{cons4_VCP_LP} \tag{11.4a}\\[2ex]
    &&y_{c}                        &\ge  0, &  \forall c \in \mathscr{C}. \label{cons3_VCP_LP} \tag{11.4b}
    \end{align*}

    Questo modello PL si chiama modello $\mathrm{LP}\text{-}0_{\mathrm{VCP}}$.

<a id="box-2-texexpbox_lp0_vcp"></a>

!!! esempio "Esempio 11.2: modello $\mathrm{LP}\text{-}0_{\mathrm{VCP}}$"

    Il modello $\mathrm{LP}\text{-}0_{\mathrm{VCP}}$ per l'istanza del VCP dell'<span style="color:#1971c2">[Esempio 11.1](#box-1-texexpbox_ilp_vcp)</span> è:

    $$
    \begin{array}{rccccccccccccr}
    {\min} &  &  &  &  &  &  &  &  &  & {y_1} & {+} {y_2} & {+} {y_3} &  \\[1ex]
    \text{soggetto a} & {x_{11}} & {+} {x_{12}} & {+} {x_{13}} &  &  &  &  &  &  &  &  &  & {=1} \\[1ex]
    &  &  &  & {x_{21}} & {+} {x_{22}} & {+} {x_{23}} &  &  &  &  &  &  & {=1} \\[1ex]
    &  &  &  &  &  &  & {x_{31}} & {+} {x_{32}} & {+} {x_{33}} &  &  &  & {=1} \\[1ex]
    & {-x_{11}} &  &  & {-x_{21}} &  &  &  &  &  & {+} {y_1} &  &  & {\ge 0} \\[1ex]
    & {-x_{11}} &  &  &  &  &  & {-x_{31}} &  &  & {+} {y_1} &  &  & {\ge 0} \\[1ex]
    &  &  &  & {-x_{21}} &  &  & {-x_{31}} &  &  & {+} {y_1} &  &  & {\ge 0} \\[1ex]
    &  & {-x_{12}} &  &  & {-x_{22}} &  &  &  &  &  & {+} {y_2} &  & {\ge 0} \\[1ex]
    &  & {-x_{12}} &  &  &  &  &  & {-x_{32}} &  &  & {+} {y_2} &  & {\ge 0} \\[1ex]
    &  &  &  &  & {-x_{22}} &  &  & {-x_{32}} &  &  & {+} {y_2} &  & {\ge 0} \\[1ex]
    &  &  & {-x_{13}} &  &  & {-x_{23}} &  &  &  &  &  & {+} {y_3} & {\ge 0} \\[1ex]
    &  &  & {-x_{13}} &  &  &  &  &  & {-x_{33}} &  &  & {+} {y_3} & {\ge 0} \\[1ex]
    &  &  &  &  &  & {-x_{23}} &  &  & {-x_{33}} &  &  & {+} {y_3} & {\ge 0} \\[1ex]
    & {x_{11}}, & {x_{12}}, & {x_{13}}, & {x_{21}}, & {x_{22}}, & {x_{23}}, & {x_{31}}, & {x_{32}}, & {x_{33}}, & {y_1}, & {y_2}, & {y_3} & {\ge 0}
    \end{array}
    $$

    Una soluzione ottima ${\tilde{\vet x}}(\mathrm{LP}\text{-}0_{\mathrm{VCP}})$ è:

    $$
    \tilde x_{11}=\tilde x_{12}=\tilde  x_{21}=\tilde  x_{22}=\tilde x_{31}=\tilde  x_{32}=\frac{1}{2},~~\tilde  x_{13}=\tilde x_{23}=\tilde  x_{33}=0,~~ \tilde y_{1}= \tilde y_{2}=1,~~\tilde  y_{3}=0
    $$

    Il valore ottimo $z(\mathrm{LP}\text{-}0_{\mathrm{VCP}})$ è $2$.

    Di conseguenza, abbiamo il lower bound:

    $$
    2 \le z(\mathrm{ILP}_{\mathrm{VCP}})
    $$

!!! chiave ""

    Con

    - una variabile duale libera $\mu_v$ per ogni vincolo $\eqref{cons1_VCP}$ ($v \in V$)

    - una variabile duale non negativa $\pi_{ce}$ per ogni vincolo $\eqref{cons2_VCP}$ ($c \in \mathscr{C},~e =\{u,v\} \in E$)

    il modello duale del modello $\mathrm{LP}\text{-}0_{\mathrm{VCP}}$ è il seguente:

    <a id="eq-DUAL_0_VCP"></a>

    \begin{align*}
    &&   \max  ~~ \sum_{v \in V}  \mu_{v} \label{obj_D}  \tag{11.5a}\\[2ex]
    && \text{soggetto a}  \quad \mu_{v} - \sum_{e \in \delta(v)} \pi_{ce}  &\leq 0,       &  \forall v \in V,~\forall c \in \mathscr{C}, \label{cons2_D}  \tag{11.5b}\\[2ex]
    && \sum_{e \in E} \pi_{ce}   &\leq 1,       &  \forall c \in \mathscr{C},              \label{cons1_D}  \tag{11.5c}\\[2ex]
    &&\mu_{v}                        &\gtreqless  0, &  \forall v \in V,\label{cons3_D}  \tag{11.5d}\\[2ex]
    &&\pi_{ce}                        &\ge  0, &  \forall c \in \mathscr{C},~\forall e \in E.\label{cons4_D} \tag{11.5e}
    \end{align*}

    Questo modello PL si chiama modello $D(\mathrm{LP}\text{-}0_{\mathrm{VCP}})$.

<a id="box-3-texexpbox_dlp0_vcp"></a>

!!! esempio "Esempio 11.3: modello $D(\mathrm{LP}\text{-}0_{\mathrm{VCP}})$"

    Il modello duale $D(\mathrm{LP}\text{-}0_{\mathrm{VCP}})$ per l'istanza del VCP dell'<span style="color:#1971c2">[Esempio 11.1](#box-1-texexpbox_ilp_vcp)</span> è:

    $$
    \begin{array}{rccccccccccccr}
    {\max} & {\mu_1} & {+} {\mu_2} & {+} {\mu_3} &  &  &  &  &  &  &  &  &  &  \\[1ex]
    \text{soggetto a} & {\mu_1} &  &  & {-\pi_{112}} & {-\pi_{113}} &  &  &  &  &  &  &  & {\le 0} \\[1ex]
    & {\mu_1} &  &  &  &  &  & {-\pi_{212}} & {-\pi_{213}} &  &  &  &  & {\le 0} \\[1ex]
    & {\mu_1} &  &  &  &  &  &  &  &  & {-\pi_{312}} & {-\pi_{313}} &  & {\le 0} \\[1ex]
    &  & {\mu_2} &  & {-\pi_{112}} &  & {-\pi_{123}} &  &  &  &  &  &  & {\le 0} \\[1ex]
    &  & {\mu_2} &  &  &  &  & {-\pi_{212}} &  & {-\pi_{223}} &  &  &  & {\le 0} \\[1ex]
    &  & {\mu_2} &  &  &  &  &  &  &  & {-\pi_{312}} &  & {-\pi_{323}} & {\le 0} \\[1ex]
    &  &  & {\mu_3} &  & {-\pi_{113}} & {-\pi_{123}} &  &  &  &  &  &  & {\le 0} \\[1ex]
    &  &  & {\mu_3} &  &  &  &  & {-\pi_{213}} & {-\pi_{223}} &  &  &  & {\le 0} \\[1ex]
    &  &  & {\mu_3} &  &  &  &  &  &  &  & {-\pi_{313}} & {-\pi_{323}} & {\le 0} \\[1ex]
    &  &  &  & {\pi_{112}} & {+\pi_{113}} & {+\pi_{123}} &  &  &  &  &  &  & {\le 1} \\[1ex]
    &  &  &  &  &  &  & {\pi_{212}} & {+\pi_{213}} & {+\pi_{223}} &  &  &  & {\le 1} \\[1ex]
    &  &  &  &  &  &  &  &  &  & {\pi_{312}} & {+\pi_{313}} & {+\pi_{323}} & {\le 1} \\[1ex]
    & {\mu_1}, & {\mu_2}, & {\mu_3} &  &  &  &  &  &  &  &  &  & {\gtreqless 0} \\[1ex]
    &  &  &  & {\pi_{112}}, & {\pi_{113}}, & {\pi_{123},} & {\pi_{212}}, & {\pi_{213}}, & {\pi_{223},} & {\pi_{312},} & {\pi_{313}}, & {\pi_{323}} & {\ge 0}
    \end{array}
    $$

    Il valore ottimo $z(D(\mathrm{LP}\text{-}0_{\mathrm{VCP}}))$ è $2$. Una soluzione ottima $(\tilde{\vet{\mu}},\tilde{\vet{\pi}})$ di $D(\mathrm{LP}\text{-}0_{\mathrm{VCP}})$ è:

    $$
    \tilde\mu_1=\tilde\mu_2=1,~~\tilde\mu_3=0,\qquad \tilde\pi_{112}=\tilde\pi_{212}=\tilde\pi_{312}=1,\qquad \text{tutti gli altri } \tilde\pi_{ce}=0
    $$

<a id="box-4-prop_lp0_vcp_opt"></a>

!!! teorema "Proposizione 11.1"

    Una soluzione ottima del modello primale $\mathrm{LP}\text{-}0_{\mathrm{VCP}}$ è:

    <a id="eq-PP"></a>

    \begin{equation*}
    \label{PPX}
    \tilde{x}_{v1}=\tilde{x}_{v2}=\frac{1}{2},  \quad \forall v \in V
    {\rm ~~~~e~~~~}
    \tilde{x}_{vc}= 0,  \quad \forall v \in V, \forall c \in\{3,4,\dots, k\}, \tag{11.6a}
    \end{equation*}

    \begin{equation*}
    \label{PPY}
    \tilde{y}_1=\tilde{y}_2=1
    {\rm ~~~~e~~~~}
    \tilde{y}_c= 0,  \quad \forall c \in\{3,4,\dots, k\}, \tag{11.6b}
    \end{equation*}

    e una soluzione ottima del modello duale $D(\mathrm{LP}\text{-}0_{\mathrm{VCP}})$ è:

    <a id="eq-DD"></a>

    \begin{equation*}
    \label{DDL}
    \tilde{\mu}_u=\tilde{\mu}_v=1
    {\rm ~~~~e~~~~}
    \tilde{\mu}_w= 0,  \quad \forall w \in V \setminus \{u,v\}, \tag{11.7a}
    \end{equation*}

    \begin{equation*}
    \label{DDPI}
    \tilde{\pi}_{c\{u,v\}}=1,  \quad \forall c \in \mathscr{C}
    {\rm ~~~~e~~~~}
    \tilde{\pi}_{ce}= 0,  \quad \forall e \in E \setminus \{\{u,v\}\}, \tag{11.7b}
    \end{equation*}

<a id="box-5-cor_lp0_vcp_value"></a>

!!! teorema "Corollario 11.2"

    Il valore ottimo dei modelli primale $\mathrm{LP}\text{-}0_{\mathrm{VCP}}$ e duale $D(\mathrm{LP}\text{-}0_{\mathrm{VCP}})$ è:

    \begin{equation*}
    \label{VAL_LP0_VCP}
    z(\mathrm{LP}\text{-}0_{\mathrm{VCP}})
    =
    2
    =
    z(D(\mathrm{LP}\text{-}0_{\mathrm{VCP}})) \tag{11.8}
    \end{equation*}

- La dimostrazione procede in tre passi:

    1. mostriamo che [(11.6)](#eq-PP) è una soluzione ammissibile del modello primale $\mathrm{LP}\text{-}0_{\mathrm{VCP}}$;

    2. mostriamo che [(11.7)](#eq-DD) è una soluzione ammissibile del modello duale $D(\mathrm{LP}\text{-}0_{\mathrm{VCP}})$;

    3. mostriamo che le due soluzioni ammissibili hanno lo stesso valore della funzione obiettivo.

    Quindi, per la dualità debole della PL, [(11.6)](#eq-PP) e [(11.7)](#eq-DD) sono una coppia di soluzioni ottime primale e duale.

??? dimostrazione "Dimostrazione"

    - **1.** Per ogni $v \in V$, abbiamo:

        $$
        {\sum_{c \in \mathscr{C}}  \tilde{x}_{vc}} = \frac{1}{2}+\frac{1}{2}  = 1
        $$

        Quindi i vincoli $\eqref{cons1_VCP}$ sono soddisfatti.

        Per $c \in \{1,2\}$ e ogni $\{u,v\} \in E$, abbiamo:

        $$
        \tilde{y}_c - \tilde{x}_{uc} - \tilde{x}_{vc} = 1 -\frac{1}{2} -\frac{1}{2} = 0
        $$

        e per $c \in \{3,4,\dots,k\}$ abbiamo $\tilde{y}_c - \tilde{x}_{uc} - \tilde{x}_{vc} = 0-0-0=0$. Quindi i vincoli $\eqref{cons2_VCP}$ sono soddisfatti.

        Abbiamo $\tilde{x}_{vc} \geq 0$ e $\tilde{y}_c \geq 0$, per ogni $v \in V$ e ogni $c \in \mathscr{C}$, quindi i vincoli $\eqref{cons4_VCP_LP}$ e $\eqref{cons3_VCP_LP}$ sono soddisfatti.

        Quindi [(11.6)](#eq-PP) fornisce una soluzione ammissibile del modello primale $\mathrm{LP}\text{-}0_{\mathrm{VCP}}$.

    - **2.** Per ogni $c\in\mathscr{C}$, abbiamo:

        $$
        \sum_{e \in E} \tilde{\pi}_{ce} = 1
        $$

        Quindi i vincoli $\eqref{cons1_D}$ sono soddisfatti.

        Per ogni $c\in\mathscr{C}$ e $w \in \{u,v\}$, abbiamo:

        $$
        \tilde{\mu}_{w} - \sum_{e \in \delta(w)} \tilde{\pi}_{ce} = 1 - 1 =0
        $$

        Per ogni $c\in\mathscr{C}$ e $w \in V\setminus\{u,v\}$, abbiamo $\tilde{\mu}_w=0$ e $\tilde{\pi}_{ce}=0$ per ogni $e\in\delta(w)$ (poiché $\tilde\pi_{ce}$ è diverso da zero solo per $e=\{u,v\}$, che non è incidente in $w$), quindi

        $$
        \tilde{\mu}_{w} - \sum_{e \in \delta(w)} \tilde{\pi}_{ce} = 0 - 0 =0.
        $$

        Quindi i vincoli $\eqref{cons2_D}$ sono soddisfatti.

        Abbiamo $\tilde{\mu}_{v} \ge 0,~ \forall v \in V$ e $\tilde{\pi}_{ce} \ge 0$ per ogni $c \in \mathscr{C}$ e ogni $e \in E$. Quindi i vincoli $\eqref{cons3_D}$ e $\eqref{cons4_D}$ sono soddisfatti.

        Quindi [(11.7)](#eq-DD) fornisce una soluzione ammissibile del modello duale $D(\mathrm{LP}\text{-}0_{\mathrm{VCP}})$.

    - **3.** Per le funzioni obiettivo abbiamo:

        \begin{align*}
        {\sum_{c \in \mathscr{C}}  \tilde{y}_c} = 1 + 1 = \sum_{v \in V}  \tilde{\mu}_{v}
        \end{align*}

        quindi i valori delle funzioni obiettivo primale e duale coincidono.

    Quindi, per la dualità debole della PL, [(11.6)](#eq-PP) e [(11.7)](#eq-DD) sono una coppia di soluzioni ottime primale e duale. <span class="qed">□</span>

- Riportiamo una dimostrazione alternativa, che non usa la formulazione duale ma ragiona direttamente sul valore minimo della funzione obiettivo imposto dai vincoli.

<a id="box-6-prop_lp0_vcp_alternative"></a>

!!! teorema "Proposizione 11.3"

    Una soluzione ottima del modello primale $\mathrm{LP}\text{-}0_{\mathrm{VCP}}$ è:

    <a id="eq-PP_alternative"></a>

    \begin{equation*}
    \label{PPX_alternative}
    \tilde{x}_{v1}=\tilde{x}_{v2}=\frac{1}{2},  \quad \forall v \in V
    {\rm ~~~~e~~~~}
    \tilde{x}_{vc}= 0,  \quad \forall v \in V, \forall c \in\{3,4,\dots, k\}, \tag{11.9a}
    \end{equation*}

    \begin{equation*}
    \label{PPY_alternative}
    \tilde{y}_1=\tilde{y}_2=1
    {\rm ~~~~e~~~~}
    \tilde{y}_c= 0,  \quad \forall c \in\{3,4,\dots, k\}, \tag{11.9b}
    \end{equation*}

    e il valore ottimo è

    \begin{equation*}
    \label{VAL_alternative}
    z(\mathrm{LP}\text{-}0_{\mathrm{VCP}}) = 2. \tag{11.10}
    \end{equation*}

??? dimostrazione "Dimostrazione"

    Sommando i vincoli sugli spigoli $\eqref{cons2_VCP}$ su tutti i $c\in\mathscr{C}$, per uno spigolo qualunque $\{u,v\}\in E$, otteniamo

    $$
    \sum_{c\in\mathscr{C}} y_c - \sum_{c\in\mathscr{C}} x_{uc} - \sum_{c\in\mathscr{C}} x_{vc}
    \;\ge\; 0
    \;\;\Longrightarrow\;\;
    \sum_{c\in\mathscr{C}} y_c \;\ge\;
    \underbrace{\sum_{c\in\mathscr{C}} x_{uc}}_{\text{per }\eqref{cons1_VCP}=1}
    +
    \underbrace{\sum_{c\in\mathscr{C}} x_{vc}}_{\text{per }\eqref{cons1_VCP}=1}
    = 2 ,
    $$

    quindi

    \begin{equation*}
    \label{eq:vcp-lb}
    \sum_{c\in\mathscr{C}} y_c \;\ge\; 2 . \tag{11.11}
    \end{equation*}

    Quindi ogni soluzione ammissibile di $\mathrm{LP}\text{-}0_{\mathrm{VCP}}$ soddisfa $\eqref{eq:vcp-lb}$. 

    Consideriamo ora il punto definito in [(11.9)](#eq-PP_alternative). Per ogni $v\in V$, abbiamo

    $$
    \sum_{c\in\mathscr{C}} \tilde x_{vc}
    = \tfrac{1}{2}+\tfrac{1}{2}=1,
    $$

    quindi i vincoli $\eqref{cons1_VCP}$ valgono. Inoltre, per ogni $\{u,v\}\in E$ e $c\in\{1,2\}$,

    $$
    \tilde y_c - \tilde x_{uc} - \tilde x_{vc}
    = 1 - \tfrac{1}{2} - \tfrac{1}{2} = 0,
    $$

    quindi i vincoli $\eqref{cons2_VCP}$ valgono all'uguaglianza, mentre per ogni $c\ge 3$ entrambi i membri sono nulli. Infine, i vincoli $\eqref{cons4_VCP_LP}$ e $\eqref{cons3_VCP_LP}$ sono soddisfatti per costruzione. Quindi il punto definito in [(11.9)](#eq-PP_alternative) è una soluzione ammissibile di $\mathrm{LP}\text{-}0_{\mathrm{VCP}}$. 

    Il valore obiettivo di [(11.9)](#eq-PP_alternative) è

    $$
    \sum_{c\in\mathscr{C}} \tilde y_c
    = 1+1 = 2 ,
    $$

    che coincide con il lower bound $\eqref{eq:vcp-lb}$. Quindi il punto [(11.9)](#eq-PP_alternative) è una soluzione ottima con valore obiettivo $\eqref{VAL_alternative}$. <span class="qed">□</span>

## 11.4 Un secondo rilassamento lineare

!!! chiave ""

    Per ottenere un rilassamento lineare del modello $\mathrm{ILP}_{\mathrm{VCP}}$, rilassiamo i vincoli $\eqref{cons4_VCP}$ e $\eqref{cons3_VCP}$ con i seguenti:

    \begin{align*}
    &&x_{vc}                        &\ge 0, & \forall v \in V,\forall c \in \mathscr{C}, \label{cons5_VCP_LP_LL} \tag{11.12a}\\[2ex]
    &&y_{c}                        &\le  1, &  \forall c \in \mathscr{C}, \label{cons3_VCP_LP_LL} \tag{11.12b}\\[2ex]
    &&y_{c}                        &\ge  0, &  \forall c \in \mathscr{C}. \label{cons4_VCP_LP_LL} \tag{11.12c}
    \end{align*}

    Questo modello PL si chiama modello $\mathrm{LP}_{\mathrm{VCP}}$.

<a id="box-7-texexpbox_lp_vcp"></a>

!!! esempio "Esempio 11.4: modello $\mathrm{LP}_{\mathrm{VCP}}$"

    Il modello $\mathrm{LP}_{\mathrm{VCP}}$ per l'istanza del VCP dell'<span style="color:#1971c2">[Esempio 11.1](#box-1-texexpbox_ilp_vcp)</span> è:

    $$
    \begin{array}{rccccccccccccr}
    {\min} &  &  &  &  &  &  &  &  &  & {y_1} & {+} {y_2} & {+} {y_3} &  \\[1ex]
    \text{soggetto a} & {x_{11}} & {+} {x_{12}} & {+} {x_{13}} &  &  &  &  &  &  &  &  &  & {=1} \\[1ex]
    &  &  &  & {x_{21}} & {+} {x_{22}} & {+} {x_{23}} &  &  &  &  &  &  & {=1} \\[1ex]
    &  &  &  &  &  &  & {x_{31}} & {+} {x_{32}} & {+} {x_{33}} &  &  &  & {=1} \\[1ex]
    & {-x_{11}} &  &  & {-x_{21}} &  &  &  &  &  & {+} {y_1} &  &  & {\ge 0} \\[1ex]
    & {-x_{11}} &  &  &  &  &  & {-x_{31}} &  &  & {+} {y_1} &  &  & {\ge 0} \\[1ex]
    &  &  &  & {-x_{21}} &  &  & {-x_{31}} &  &  & {+} {y_1} &  &  & {\ge 0} \\[1ex]
    &  & {-x_{12}} &  &  & {-x_{22}} &  &  &  &  &  & {+} {y_2} &  & {\ge 0} \\[1ex]
    &  & {-x_{12}} &  &  &  &  &  & {-x_{32}} &  &  & {+} {y_2} &  & {\ge 0} \\[1ex]
    &  &  &  &  & {-x_{22}} &  &  & {-x_{32}} &  &  & {+} {y_2} &  & {\ge 0} \\[1ex]
    &  &  & {-x_{13}} &  &  & {-x_{23}} &  &  &  &  &  & {+} {y_3} & {\ge 0} \\[1ex]
    &  &  & {-x_{13}} &  &  &  &  &  & {-x_{33}} &  &  & {+} {y_3} & {\ge 0} \\[1ex]
    &  &  &  &  &  & {-x_{23}} &  &  & {-x_{33}} &  &  & {+} {y_3} & {\ge 0} \\[1ex]
    &  &  &  &  &  &  &  &  &  & {y_1} &  &  & {\le 1} \\[1ex]
    &  &  &  &  &  &  &  &  &  &  & {y_2} &  & {\le 1} \\[1ex]
    &  &  &  &  &  &  &  &  &  &  &  & {y_3} & {\le 1} \\[1ex]
    & {x_{11}}, & {x_{12}}, & {x_{13}}, & {x_{21}}, & {x_{22}}, & {x_{23}}, & {x_{31}}, & {x_{32}}, & {x_{33}}, & {y_1}, & {y_2}, & {y_3} & {\ge 0}
    \end{array}
    $$

    Una soluzione ottima ${\tilde{\vet x}}(\mathrm{LP}_{\mathrm{VCP}})$ è:

    $$
    \tilde x_{11}=\tilde x_{12}=\tilde  x_{21}=\tilde  x_{22}=\tilde x_{31}=\tilde  x_{32}=\frac{1}{2},~~\tilde  x_{13}=\tilde x_{23}=\tilde  x_{33}=0,~~ \tilde y_{1}= \tilde y_{2}=1,~~\tilde  y_{3}=0
    $$

    Il valore ottimo $z(\mathrm{LP}_{\mathrm{VCP}})$ è $2$. Di conseguenza, abbiamo lo stesso lower bound.

!!! chiave ""

    Con 

    - una variabile duale libera $\mu_v$ per ogni vincolo $\eqref{cons1_VCP}$ ($v \in V$)

    - una variabile duale non negativa $\pi_{ce}$ per ogni vincolo $\eqref{cons2_VCP}$ ($c \in \mathscr{C},~e =\{u,v\} \in E$)

    - una variabile duale non positiva $\lambda_c$ per ogni vincolo $\eqref{cons3_VCP_LP_LL}$ ($\forall c \in \mathscr{C}$)

    il modello duale del modello $\mathrm{LP}_{\mathrm{VCP}}$ è il seguente:

    <a id="eq-DUAL_VCP"></a>

    \begin{align*}
    &&   \max  ~~ \sum_{v \in V}  \mu_{v} + \sum_{c \in \mathscr{C}}  \lambda_{c} \label{obj_D_VCP}  \tag{11.13a}\\[2ex]
    && \text{soggetto a}  \quad \mu_{v} - \sum_{e \in \delta(v)} \pi_{ce}  &\leq 0,       &  \forall v \in V,~\forall c \in \mathscr{C}, \label{cons2_D_VCP}  \tag{11.13b}\\[1ex]
    && \sum_{e \in E} \pi_{ce} + \lambda_c   &\leq 1,       &  \forall c \in \mathscr{C},              \label{cons1_D_VCP}  \tag{11.13c}\\[1ex]
    &&\mu_{v}                        &\gtreqless  0, &  \forall v \in V,\label{cons3_D_VCP}  \tag{11.13d}\\[2ex]
    &&\pi_{ce}                        &\ge  0, &  \forall c \in \mathscr{C},~\forall e \in E,\label{cons4_D_VCP}  \tag{11.13e}\\[1ex]
    &&\lambda_{c}                        &\le  0, &  \forall c \in \mathscr{C}.\label{cons5_D_VCP} \tag{11.13f}
    \end{align*}

<a id="box-8-texexpbox_dlp_vcp"></a>

!!! esempio "Esempio 11.5: modello $D(\mathrm{LP}_{\mathrm{VCP}})$"

    Il modello duale $D(\mathrm{LP}_{\mathrm{VCP}})$ per l'istanza del VCP dell'<span style="color:#1971c2">[Esempio 11.1](#box-1-texexpbox_ilp_vcp)</span> è:

    $$
    \begin{array}{rcccccccccccccccr}
    {\max} & {\mu_1} & {+\mu_2} & {+\mu_3} &  &  &  &  &  &  &  &  &  & {\lambda_1} & {+\lambda_2} & {+\lambda_3} &  \\[1ex]
    \text{soggetto a} & {\mu_1} &  &  & {-\pi_{112}} & {-\pi_{113}} &  &  &  &  &  &  &  &  &  &  & {\le 0} \\[1ex]
    & {\mu_1} &  &  &  &  &  & {-\pi_{212}} & {-\pi_{213}} &  &  &  &  &  &  &  & {\le 0} \\[1ex]
    & {\mu_1} &  &  &  &  &  &  &  &  & {-\pi_{312}} & {-\pi_{313}} &  &  &  &  & {\le 0} \\[1ex]
    &  & {\mu_2} &  & {-\pi_{112}} &  & {-\pi_{123}} &  &  &  &  &  &  &  &  &  & {\le 0} \\[1ex]
    &  & {\mu_2} &  &  &  &  & {-\pi_{212}} &  & {-\pi_{223}} &  &  &  &  &  &  & {\le 0} \\[1ex]
    &  & {\mu_2} &  &  &  &  &  &  &  & {-\pi_{312}} &  & {-\pi_{323}} &  &  &  & {\le 0} \\[1ex]
    &  &  & {\mu_3} &  & {-\pi_{113}} & {-\pi_{123}} &  &  &  &  &  &  &  &  &  & {\le 0} \\[1ex]
    &  &  & {\mu_3} &  &  &  &  & {-\pi_{213}} & {-\pi_{223}} &  &  &  &  &  &  & {\le 0} \\[1ex]
    &  &  & {\mu_3} &  &  &  &  &  &  &  & {-\pi_{313}} & {-\pi_{323}} &  &  &  & {\le 0} \\[1ex]
    &  &  &  & {\pi_{112}} & {+\pi_{113}} & {+\pi_{123}} &  &  &  &  &  &  & {+\lambda_1} &  &  & {\le 1} \\[1ex]
    &  &  &  &  &  &  & {\pi_{212}} & {+\pi_{213}} & {+\pi_{223}} &  &  &  &  & {+\lambda_2} &  & {\le 1} \\[1ex]
    &  &  &  &  &  &  &  &  &  & {\pi_{312}} & {+\pi_{313}} & {+\pi_{323}} &  &  & {+\lambda_3} & {\le 1} \\[1ex]
    & {\mu_1}, & {\mu_2}, & {\mu_3} &  &  &  &  &  &  &  &  &  &  &  &  & {\gtreqless 0} \\[1ex]
    &  &  &  & {\pi_{112}}, & {\pi_{113}}, & {\pi_{123},} & {\pi_{212}}, & {\pi_{213}}, & {\pi_{223},} & {\pi_{312},} & {\pi_{313}}, & {\pi_{323}} &  &  &  & {\ge 0} \\[1ex]
    &  &  &  &  &  &  &  &  &  &  &  &  & {\lambda_1,} & {\lambda_2,} & {\lambda_3} & {\le 0}
    \end{array}
    $$

    Il valore ottimo $z(D(\mathrm{LP}_{\mathrm{VCP}}))$ è $2$. Una soluzione ottima $(\tilde{\vet{\mu}},\tilde{\vet{\pi}},\tilde{\vet{\lambda}})$ di $D(\mathrm{LP}_{\mathrm{VCP}})$ è:

    $$
    \tilde\mu_1=\tilde\mu_2=1,~~\tilde\mu_3=0,\qquad \tilde\pi_{112}=\tilde\pi_{212}=\tilde\pi_{312}=1,\qquad \text{tutti gli altri } \tilde\pi_{ce}=0
    $$

    $$
    \tilde \lambda_{1}= 0,~~\tilde \lambda_{2}=0,~~\tilde  \lambda_{3}=0
    $$

- I vincoli:

    $$
    x_{vc} \le 1,\qquad \qquad \forall v \in V,\forall c \in \mathscr{C},
    $$

    sono anch'essi validi poiché, per ogni $v \in V$ e ogni $c \in \mathscr{C}$, abbiamo:

    $$
    x_{vc} \in \{0,1\} ~~~~~\Rightarrow~~~~~ x_{vc} \le 1
    $$

    ma sono implicati dai vincoli $\eqref{cons1_VCP}$.

<a id="box-9-prop_lp_vcp_opt"></a>

!!! teorema "Proposizione 11.4"

    Una soluzione ottima del modello primale $\mathrm{LP}_{\mathrm{VCP}}$ è:

    <a id="eq-PP_BIS"></a>

    \begin{equation*}
    \label{PPX_BIS}
    \tilde{x}_{v1}=\tilde{x}_{v2}=\frac{1}{2},  \quad \forall v \in V
    {\rm ~~~~e~~~~}
    \tilde{x}_{vc}= 0,  \quad \forall v \in V, \forall c \in\{3,4,\dots, k\}, \tag{11.14a}
    \end{equation*}

    \begin{equation*}
    \label{PPY_BIS}
    \tilde{y}_1=\tilde{y}_2=1
    {\rm ~~~~e~~~~}
    \tilde{y}_c= 0,  \quad \forall c \in\{3,4,\dots, k\}, \tag{11.14b}
    \end{equation*}

    e una soluzione ottima del modello duale $D(\mathrm{LP}_{\mathrm{VCP}})$ è:

    <a id="eq-DD_BIS"></a>

    \begin{equation*}
    \label{DDL_BIS}
    \tilde{\mu}_u=\tilde{\mu}_v=1
    {\rm ~~~~e~~~~}
    \tilde{\mu}_w= 0,  \quad \forall w \in V \setminus \{u,v\}, \tag{11.15a}
    \end{equation*}

    \begin{equation*}
    \label{DDPI_BIS}
    \tilde{\pi}_{c\{u,v\}}=1,~ \forall c \in \mathscr{C},
    {\rm ~~~~~}
    \tilde{\pi}_{ce}= 0,  ~ \forall e \in E \setminus \{\{u,v\}\},
    {\rm ~~~~e~~~~}
    \tilde{\lambda}_{c}= 0,  ~ \forall c \in \mathscr{C}, \tag{11.15b}
    \end{equation*}

??? dimostrazione "Dimostrazione"

    La dimostrazione è simile alla precedente. In più, occorre osservare che:

    $$
    \tilde{y}_c \le 1, \quad \forall c \in \mathscr{C}.
    $$

    Di conseguenza, anche i vincoli $\eqref{cons3_VCP_LP_LL}$ sono soddisfatti. <span class="qed">□</span>

<a id="box-10-cor_lp_vcp_value"></a>

!!! teorema "Corollario 11.5"

    Il valore ottimo dei modelli primale $\mathrm{LP}_{\mathrm{VCP}}$ e duale $D(\mathrm{LP}_{\mathrm{VCP}})$ è:

    \begin{equation*}
    \label{VAL_LP_VCP}
    z(\mathrm{LP}_{\mathrm{VCP}})
    =
    2
    =
    z(D(\mathrm{LP}_{\mathrm{VCP}})) \tag{11.16}
    \end{equation*}

## 11.5 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Scegliere $k$ troppo piccolo.</strong> Il numero $k$ di colori deve essere almeno il numero cromatico del grafo: con meno colori il modello non ha soluzioni ammissibili. Il valore $k=n$ è sempre valido.

    - <strong>Fidarsi del bound del rilassamento.</strong> Il valore ottimo di entrambi i rilassamenti è $2$ per <u>ogni</u> grafo con almeno uno spigolo, anche per il grafo completo su $n$ vertici, il cui valore ottimo è $n$.

    - <strong>Credere che il modello conti solo i colori davvero usati.</strong> I vincoli permettono $y_c=1$ per un colore che nessun vertice prende: è la funzione obiettivo che spegne questi colori.

    - <strong>Ignorare la simmetria.</strong> Permutando i colori di una soluzione ottima si ottiene un'altra soluzione ottima: il modello $\mathrm{ILP}_{\mathrm{VCP}}$ ha $k!$ copie equivalenti di ogni colorazione.

    - <strong>Scrivere la soluzione duale con uno spigolo sbagliato.</strong> I valori duali $\tilde{\pi}_{ce}$ sono diversi da zero solo per uno spigolo $e=\{u,v\}$, e per ogni colore $c$: tutti gli altri spigoli hanno valore zero.

## 11.6 In sintesi

!!! chiave "In sintesi"

    - Il modello $\mathrm{ILP}_{\mathrm{VCP}}$ ha $k \cdot n$ variabili $x_{vc}$ (il vertice $v$ prende il colore $c$) e $k$ variabili $y_c$ (il colore $c$ è usato); i vincoli sugli spigoli vietano colori uguali su vertici adiacenti.

    - I due rilassamenti lineari hanno lo stesso valore ottimo $2$ per ogni grafo con almeno uno spigolo: basta mettere $\tfrac{1}{2}$ su due colori per tutti i vertici.

    - La soluzione duale sceglie uno spigolo $\{u,v\}$ e dà valore $1$ a $\mu_u$, $\mu_v$ e $\pi_{c\{u,v\}}$ per ogni colore.

    - Il bound $2$ è molto debole: una formulazione che deve colorare grafi ha bisogno di ulteriori disuguaglianze valide.

    <strong>Quadro riassuntivo dell'[Esempio 11.1](#box-1-texexpbox_ilp_vcp)</strong> (triangolo). Bound su $z(\mathrm{ILP}_{\mathrm{VCP}})$ calcolati in questo capitolo:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Bound</th>
    <th>Valore</th>
    <th>Da</th>
    </tr>
    <tr>
    <td>Primo rilassamento</td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(z(\mathrm{LP}\text{-}0_{\mathrm{VCP}})\)</span></td>
    </tr>
    <tr>
    <td>Secondo rilassamento</td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(z(\mathrm{LP}_{\mathrm{VCP}})\)</span></td>
    </tr>
    <tr>
    <td>Valore ottimo</td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td>classi di colore <span class="arithmatex">\(\{1\}\)</span>, <span class="arithmatex">\(\{2\}\)</span>, <span class="arithmatex">\(\{3\}\)</span></td>
    </tr>
    </table></div>

    Qui il gap fra $2$ e $3$ è piccolo, ma cresce con la dimensione del grafo completo: $2$ contro $n$.

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di colorazione](../../esercizi/coloring-formulations.md)

