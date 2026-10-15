---
title: "Scheduling su macchine parallele identiche"
---

# 14.2 Un modello PLI per il problema di scheduling su macchine parallele identiche { #sez-sec-pmf-PCmax }

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 14** · [:material-book-open-variant: Capitolo 14: Problemi di scheduling](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-pcmax-formulations.pdf) · [:material-pencil: Esercizi: Problemi di scheduling](../../esercizi/pcmax-formulations.md)

</div>

Il problema di questa sezione è lo scheduling su macchine parallele identiche ($P\|C_{\max}$), definito nel [Capitolo 7 «Problemi di scheduling»](../../problemi-di-ottimizzazione-combinatoria/pcmax/scheduling-su-macchine-parallele-identiche.md).

- Date $m$ macchine identiche e un insieme $\mathscr{J}=\{1,2,\ldots,n\}$ di $n$ lavori, con tempi di processamento $t_j$, indichiamo con $\mathscr{H}=\{1,2,\ldots,m\}$ l'insieme delle macchine.

- Introduciamo le seguenti $nm$ <strong>variabili binarie</strong>:

    $$
    x_{jh}=
    \begin{cases}
    1 & \text{se il lavoro $j$ è assegnato alla macchina $h$}\\[1.5ex]
    0 & \text{altrimenti}
    \end{cases}
    \qquad \forall j\in\mathscr{J},~\forall h\in\mathscr{H},
    $$

    e una <strong>variabile continua non negativa</strong>:

    $$
    C_{\max}=\text{makespan della schedula}.
    $$

!!! chiave ""

    Usando queste variabili, un modello di programmazione lineare intera (PLI) per il problema di scheduling su macchine parallele identiche ($P\|C_{\max}$) è il seguente:

    <a id="eq-ILP-PCMAX"></a>

    \begin{align*}
    && \min \quad C_{\max} \label{obj:PCMAX} \tag{14.1a}\\[1ex]
    && \text{soggetto a}\quad \sum_{h\in\mathscr{H}}x_{jh}&=1,
    & \forall j\in\mathscr{J}, \label{assign:PCMAX} \tag{14.1b}\\[1ex]
    && -\sum_{j\in\mathscr{J}}t_jx_{jh}+C_{\max}&\ge0,
    & \forall h\in\mathscr{H}, \label{load:PCMAX} \tag{14.1c}\\[1ex]
    && x_{jh}&\in\{0,1\},
    & \forall j\in\mathscr{J},~\forall h\in\mathscr{H}, \label{bin:PCMAX} \tag{14.1d}\\[1ex]
    && C_{\max}&\ge0. \label{nonneg:PCMAX} \tag{14.1e}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{P\|C_{\max}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{P\|C_{\max}}$:

    - la funzione obiettivo lineare $\eqref{obj:PCMAX}$ minimizza il makespan;

    - i vincoli $\eqref{assign:PCMAX}$ garantiscono che ogni lavoro sia assegnato a esattamente una macchina ($n$ vincoli lineari);

    - i vincoli $\eqref{load:PCMAX}$ collegano le variabili di assegnamento con la variabile di makespan. In particolare, garantiscono che il makespan sia maggiore o uguale al carico di ogni macchina ($m$ vincoli lineari);

    - infine, i vincoli $\eqref{bin:PCMAX}$ e $\eqref{nonneg:PCMAX}$ definiscono le variabili del modello PLI.

<strong>Spiegazione del legame fra le variabili</strong>

- Per ogni macchina $h$, il makespan e il suo carico devono soddisfare la relazione diretta

    $$
    C_{\max}\ge \sum_{j\in\mathscr{J}}t_jx_{jh},
    $$

    che è imposta dal vincolo $\eqref{load:PCMAX}$.

- Poiché il vincolo vale per ogni macchina, esso impone

    $$
    C_{\max}\ge \max_{h\in\mathscr{H}}\left\{\sum_{j\in\mathscr{J}}t_jx_{jh}\right\}.
    $$

- In ogni soluzione ottima vale l'uguaglianza. Infatti, se $C_{\max}$ fosse maggiore del carico massimo, sostituendo $C_{\max}$ con il carico massimo tutti i vincoli $\eqref{load:PCMAX}$ resterebbero soddisfatti e il valore obiettivo diminuirebbe di una quantità positiva, il che contraddice l'ottimalità.

- Quando a una macchina non è assegnato alcun lavoro, il suo carico è zero.

<a id="box-1-ex-PCMAX-ILP"></a>

!!! esempio "Esempio 14.1: Modello $\mathrm{ILP}_{P\|C_{\max}}$"

    Consideriamo $m=3$ macchine ($\mathscr{H}=\{1,2,3\}$) e un insieme $\mathscr{J}=\{1,2,\dots,7\}$ di $7$ lavori ($n=7$), con i seguenti tempi di processamento:

    $$
    \begin{array}{l|ccccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} & {j=7} \\[1ex]
    \hline {t_j} & {5} & {5} & {4} & {4} & {3} & {3} & {3} \\
    \hline
    \end{array}
    $$

    È l'istanza dell'Esempio 7.1 del [Capitolo 7 «Problemi di scheduling»](../../problemi-di-ottimizzazione-combinatoria/pcmax/scheduling-su-macchine-parallele-identiche.md); la chiamiamo <span style="color:#1971c2">[Esempio 14.1](#box-1-ex-PCMAX-ILP)</span>. Il modello $\mathrm{ILP}_{P\|C_{\max}}$ per questa istanza è:

    $$
    \begin{array}{rlcl}
    {\min} & {C_{\max}} &  &  \\[1ex]
    \text{soggetto a} & {x_{11}+x_{12}+x_{13}} & {=} & {1} \\
    & {x_{21}+x_{22}+x_{23}} & {=} & {1} \\
    & {x_{31}+x_{32}+x_{33}} & {=} & {1} \\
    & {x_{41}+x_{42}+x_{43}} & {=} & {1} \\
    & {x_{51}+x_{52}+x_{53}} & {=} & {1} \\
    & {x_{61}+x_{62}+x_{63}} & {=} & {1} \\
    & {x_{71}+x_{72}+x_{73}} & {=} & {1} \\
    & {-5\,x_{11}-5\,x_{21}-4\,x_{31}-4\,x_{41}-3\,x_{51}-3\,x_{61}-3\,x_{71}+C_{\max}} & {\ge} & {0} \\
    & {-5\,x_{12}-5\,x_{22}-4\,x_{32}-4\,x_{42}-3\,x_{52}-3\,x_{62}-3\,x_{72}+C_{\max}} & {\ge} & {0} \\
    & {-5\,x_{13}-5\,x_{23}-4\,x_{33}-4\,x_{43}-3\,x_{53}-3\,x_{63}-3\,x_{73}+C_{\max}} & {\ge} & {0} \\[1ex]
    & {x_{11},~x_{12},~x_{13},~\dots,~x_{73}} & {\in} & {\{0,1\}} \\
    & {C_{\max}} & {\ge} & {0}
    \end{array}
    $$

    Una soluzione ottima $(\tilde{\vet x},\tilde C_{\max})(\mathrm{ILP}_{P\|C_{\max}})$ è:

    $$
    \tilde x_{11}=\tilde x_{31}=\tilde x_{22}=\tilde x_{42}=\tilde x_{53}=\tilde x_{63}=\tilde x_{73}=1,~~
    \text{tutte le altre } \tilde x_{jh}=0,
    \qquad \tilde C_{\max}=9
    $$

    Assegna i lavori $\{1,3\}$ alla macchina $1$, $\{2,4\}$ alla macchina $2$ e $\{5,6,7\}$ alla macchina $3$, con carichi $9$, $9$ e $9$. Il valore ottimo $z(\mathrm{ILP}_{P\|C_{\max}})$ è $9$, poiché raggiunge il lower bound

    $$
    \max\left\{\max_{j\in\mathscr{J}}t_j,~\left\lceil\frac{\sum_{j\in\mathscr{J}}t_j}{m}\right\rceil\right\}
    =\max\{5,\lceil27/3\rceil\}=9.
    $$

## 14.3 Un primo rilassamento lineare

!!! chiave ""

    Per ottenere un rilassamento lineare (LP) del modello $\mathrm{ILP}_{P\|C_{\max}}$, rilassiamo i vincoli $\eqref{bin:PCMAX}$ in vincoli di non negatività. Il modello LP ottenuto è il seguente:

    <a id="eq-LP0-PCMAX"></a>

    \begin{align*}
    && \min \quad C_{\max} \label{obj:LP0-PCMAX} \tag{14.2a}\\[1ex]
    && \text{soggetto a}\quad \sum_{h\in\mathscr{H}}x_{jh}&=1,
    & \forall j\in\mathscr{J}, \label{assign:LP0-PCMAX} \tag{14.2b}\\[1ex]
    && -\sum_{j\in\mathscr{J}}t_jx_{jh}+C_{\max}&\ge0,
    & \forall h\in\mathscr{H}, \label{load:LP0-PCMAX} \tag{14.2c}\\[1ex]
    && x_{jh}&\ge0,
    & \forall j\in\mathscr{J},~\forall h\in\mathscr{H}, \label{nonnegx:LP0-PCMAX} \tag{14.2d}\\[1ex]
    && C_{\max}&\ge0. \label{nonnegC:LP0-PCMAX} \tag{14.2e}
    \end{align*}

    Questo modello LP si chiama modello $\mathrm{LP}\text{-}0_{P\|C_{\max}}$.

<a id="box-2-ex-PCMAX-LP0"></a>

!!! esempio "Esempio 14.2: Modello $\mathrm{LP}\text{-}0_{P\|C_{\max}}$"

    Il modello $\mathrm{LP}\text{-}0_{P\|C_{\max}}$ per l'istanza dell'<span style="color:#1971c2">[Esempio 14.1](#box-1-ex-PCMAX-ILP)</span> è:

    $$
    \begin{array}{rlcl}
    {\min} & {C_{\max}} &  &  \\[1ex]
    \text{soggetto a} & {x_{11}+x_{12}+x_{13}} & {=} & {1} \\
    & {x_{21}+x_{22}+x_{23}} & {=} & {1} \\
    & {x_{31}+x_{32}+x_{33}} & {=} & {1} \\
    & {x_{41}+x_{42}+x_{43}} & {=} & {1} \\
    & {x_{51}+x_{52}+x_{53}} & {=} & {1} \\
    & {x_{61}+x_{62}+x_{63}} & {=} & {1} \\
    & {x_{71}+x_{72}+x_{73}} & {=} & {1} \\
    & {-5\,x_{11}-5\,x_{21}-4\,x_{31}-4\,x_{41}-3\,x_{51}-3\,x_{61}-3\,x_{71}+C_{\max}} & {\ge} & {0} \\
    & {-5\,x_{12}-5\,x_{22}-4\,x_{32}-4\,x_{42}-3\,x_{52}-3\,x_{62}-3\,x_{72}+C_{\max}} & {\ge} & {0} \\
    & {-5\,x_{13}-5\,x_{23}-4\,x_{33}-4\,x_{43}-3\,x_{53}-3\,x_{63}-3\,x_{73}+C_{\max}} & {\ge} & {0} \\[1ex]
    & {x_{11},~x_{12},~x_{13},~\dots,~x_{73}} & {\ge} & {0} \\
    & {C_{\max}} & {\ge} & {0}
    \end{array}
    $$

    Una soluzione ottima $(\tilde{\vet x},\tilde C_{\max})(\mathrm{LP}\text{-}0_{P\|C_{\max}})$ è:

    $$
    \tilde x_{jh}=\frac{1}{3},~~\forall j\in\mathscr{J},~\forall h\in\mathscr{H},\qquad \tilde C_{\max}=9
    $$

    Il valore ottimo $z(\mathrm{LP}\text{-}0_{P\|C_{\max}})$ è $9$. Di conseguenza, abbiamo il lower bound:

    $$
    9 \le z(\mathrm{ILP}_{P\|C_{\max}})
    $$

!!! chiave ""

    Usando una variabile duale libera $\mu_j$ per ogni vincolo $\eqref{assign:LP0-PCMAX}$ e una variabile duale non negativa $\pi_h$ per ogni vincolo $\eqref{load:LP0-PCMAX}$, il modello duale del modello $\mathrm{LP}\text{-}0_{P\|C_{\max}}$ è:

    <a id="eq-DLP0-PCMAX"></a>

    \begin{align*}
    && \max \quad \sum_{j\in\mathscr{J}}\mu_j \label{obj:DLP0-PCMAX} \tag{14.3a}\\[1ex]
    && \text{soggetto a}\quad \mu_j-t_j\pi_h&\le0,
    & \forall j\in\mathscr{J},~\forall h\in\mathscr{H}, \label{x:DLP0-PCMAX} \tag{14.3b}\\[1ex]
    && \sum_{h\in\mathscr{H}}\pi_h&\le1, \label{C:DLP0-PCMAX} \tag{14.3c}\\[1ex]
    && \mu_j&\gtreqless0, & \forall j\in\mathscr{J}, \label{free:DLP0-PCMAX} \tag{14.3d}\\[1ex]
    && \pi_h&\ge0, & \forall h\in\mathscr{H}. \label{nonneg:DLP0-PCMAX} \tag{14.3e}
    \end{align*}

    Questo modello LP si chiama modello $D(\mathrm{LP}\text{-}0_{P\|C_{\max}})$.

<a id="box-3-ex-PCMAX-DLP0"></a>

!!! esempio "Esempio 14.3: Modello $D(\mathrm{LP}\text{-}0_{P\|C_{\max}})$"

    Il modello duale $D(\mathrm{LP}\text{-}0_{P\|C_{\max}})$ per l'istanza dell'<span style="color:#1971c2">[Esempio 14.1](#box-1-ex-PCMAX-ILP)</span> è:

    $$
    \begin{array}{rlcl}
    {\max} & {\mu_1+\mu_2+\mu_3+\mu_4+\mu_5+\mu_6+\mu_7} &  &  \\[1ex]
    \text{soggetto a} & {\mu_1-5\,\pi_1} & {\le} & {0} \\
    & {\mu_1-5\,\pi_2} & {\le} & {0} \\
    & {\mu_1-5\,\pi_3} & {\le} & {0} \\
    & {\mu_2-5\,\pi_1} & {\le} & {0} \\
    & {\mu_2-5\,\pi_2} & {\le} & {0} \\
    & {\mu_2-5\,\pi_3} & {\le} & {0} \\
    & {\mu_3-4\,\pi_1} & {\le} & {0} \\
    & {\mu_3-4\,\pi_2} & {\le} & {0} \\
    & {\mu_3-4\,\pi_3} & {\le} & {0} \\
    & {\mu_4-4\,\pi_1} & {\le} & {0} \\
    & {\mu_4-4\,\pi_2} & {\le} & {0} \\
    & {\mu_4-4\,\pi_3} & {\le} & {0} \\
    & {\mu_5-3\,\pi_1} & {\le} & {0} \\
    & {\mu_5-3\,\pi_2} & {\le} & {0} \\
    & {\mu_5-3\,\pi_3} & {\le} & {0} \\
    & {\mu_6-3\,\pi_1} & {\le} & {0} \\
    & {\mu_6-3\,\pi_2} & {\le} & {0} \\
    & {\mu_6-3\,\pi_3} & {\le} & {0} \\
    & {\mu_7-3\,\pi_1} & {\le} & {0} \\
    & {\mu_7-3\,\pi_2} & {\le} & {0} \\
    & {\mu_7-3\,\pi_3} & {\le} & {0} \\
    & {\pi_1+\pi_2+\pi_3} & {\le} & {1} \\[1ex]
    & {\mu_1,~\mu_2,~\mu_3,~\mu_4,~\mu_5,~\mu_6,~\mu_7} & {\gtreqless} & {0} \\
    & {\pi_1,~\pi_2,~\pi_3} & {\ge} & {0}
    \end{array}
    $$

    Una soluzione ottima $(\tilde{\vet\mu},\tilde{\vet\pi})(D(\mathrm{LP}\text{-}0_{P\|C_{\max}}))$ è:

    $$
    \tilde\mu_1=\tilde\mu_2=\frac{5}{3},~~\tilde\mu_3=\tilde\mu_4=\frac{4}{3},~~\tilde\mu_5=\tilde\mu_6=\tilde\mu_7=1,
    \qquad \tilde\pi_1=\tilde\pi_2=\tilde\pi_3=\frac{1}{3}
    $$

    Il valore ottimo $z(D(\mathrm{LP}\text{-}0_{P\|C_{\max}}))$ è $9$.

<a id="box-4-prop-LP0-PCMAX"></a>

!!! teorema "Proposizione 14.1: Valore ottimo di $\mathrm{LP}\text{-}0_{P\|C_{\max}}$"

    Per ogni istanza di $P\|C_{\max}$,

    $$
    z(\mathrm{LP}\text{-}0_{P\|C_{\max}})=\frac{\sum_{j\in\mathscr{J}}t_j}{m}.
    $$

??? dimostrazione "Dimostrazione"

    Poniamo $x_{jh}=1/m$ per ogni lavoro e ogni macchina, e poniamo

    $$
    C_{\max}=\frac{\sum_{j\in\mathscr{J}}t_j}{m}.
    $$

    Ogni vincolo $\eqref{assign:LP0-PCMAX}$ è soddisfatto e ogni macchina ha il carico indicato, quindi questa è una soluzione primale ammissibile. Nel duale, poniamo

    $$
    \pi_h=\frac1m\quad\forall h\in\mathscr{H},
    \qquad
    \mu_j=\frac{t_j}{m}\quad\forall j\in\mathscr{J}.
    $$

    I vincoli $\eqref{x:DLP0-PCMAX}$ valgono all'uguaglianza, $\sum_h\pi_h=1$, e il valore obiettivo duale è

    $$
    \sum_{j\in\mathscr{J}}\mu_j=\frac{\sum_{j\in\mathscr{J}}t_j}{m}.
    $$

    Per la dualità debole della PL, le due soluzioni sono ottime, e il valore ottimo è il valore comune delle funzioni obiettivo. <span class="qed">□</span>

## 14.4 Un secondo rilassamento lineare

!!! chiave ""

    Per ottenere un rilassamento lineare del modello $\mathrm{ILP}_{P\|C_{\max}}$, rilassiamo i vincoli $\eqref{bin:PCMAX}$ nei bound $0\le x_{jh}\le 1$. Il modello LP ottenuto è il seguente:

    <a id="eq-LP-PCMAX"></a>

    \begin{align*}
    && \min \quad C_{\max} \label{obj:LP-PCMAX} \tag{14.4a}\\[1ex]
    && \text{soggetto a}\quad \sum_{h\in\mathscr{H}}x_{jh}&=1,
    & \forall j\in\mathscr{J}, \label{assign:LP-PCMAX} \tag{14.4b}\\[1ex]
    && -\sum_{j\in\mathscr{J}}t_jx_{jh}+C_{\max}&\ge0,
    & \forall h\in\mathscr{H}, \label{load:LP-PCMAX} \tag{14.4c}\\[1ex]
    && x_{jh}&\le1,
    & \forall j\in\mathscr{J},~\forall h\in\mathscr{H}, \label{ub:LP-PCMAX} \tag{14.4d}\\[1ex]
    && x_{jh}&\ge0,
    & \forall j\in\mathscr{J},~\forall h\in\mathscr{H}, \label{nonnegx:LP-PCMAX} \tag{14.4e}\\[1ex]
    && C_{\max}&\ge0. \label{nonnegC:LP-PCMAX} \tag{14.4f}
    \end{align*}

    Questo modello LP si chiama modello $\mathrm{LP}_{P\|C_{\max}}$.

- I vincoli $\eqref{ub:LP-PCMAX}$ non cambiano il rilassamento: per $\eqref{assign:LP-PCMAX}$ e $\eqref{nonnegx:LP-PCMAX}$, ogni $x_{jh}$ vale al più uno. Quindi

    $$
    z(\mathrm{LP}_{P\|C_{\max}})=z(\mathrm{LP}\text{-}0_{P\|C_{\max}})=\frac{\sum_{j\in\mathscr{J}}t_j}{m}.
    $$

<a id="box-5-ex-PCMAX-LP"></a>

!!! esempio "Esempio 14.4: Modello $\mathrm{LP}_{P\|C_{\max}}$"

    Il modello $\mathrm{LP}_{P\|C_{\max}}$ per l'istanza dell'<span style="color:#1971c2">[Esempio 14.1](#box-1-ex-PCMAX-ILP)</span> è:

    $$
    \begin{array}{rlcl}
    {\min} & {C_{\max}} &  &  \\[1ex]
    \text{soggetto a} & {x_{11}+x_{12}+x_{13}} & {=} & {1} \\
    & {x_{21}+x_{22}+x_{23}} & {=} & {1} \\
    & {x_{31}+x_{32}+x_{33}} & {=} & {1} \\
    & {x_{41}+x_{42}+x_{43}} & {=} & {1} \\
    & {x_{51}+x_{52}+x_{53}} & {=} & {1} \\
    & {x_{61}+x_{62}+x_{63}} & {=} & {1} \\
    & {x_{71}+x_{72}+x_{73}} & {=} & {1} \\
    & {-5\,x_{11}-5\,x_{21}-4\,x_{31}-4\,x_{41}-3\,x_{51}-3\,x_{61}-3\,x_{71}+C_{\max}} & {\ge} & {0} \\
    & {-5\,x_{12}-5\,x_{22}-4\,x_{32}-4\,x_{42}-3\,x_{52}-3\,x_{62}-3\,x_{72}+C_{\max}} & {\ge} & {0} \\
    & {-5\,x_{13}-5\,x_{23}-4\,x_{33}-4\,x_{43}-3\,x_{53}-3\,x_{63}-3\,x_{73}+C_{\max}} & {\ge} & {0} \\[1ex]
    & {x_{11},~x_{12},~x_{13},~\dots,~x_{73}} & {\le} & {1} \\
    & {x_{11},~x_{12},~x_{13},~\dots,~x_{73}} & {\ge} & {0} \\
    & {C_{\max}} & {\ge} & {0}
    \end{array}
    $$

    Una soluzione ottima $(\tilde{\vet x},\tilde C_{\max})(\mathrm{LP}_{P\|C_{\max}})$ è la soluzione dell'<span style="color:#1971c2">[Esempio 14.2](#box-2-ex-PCMAX-LP0)</span>:

    $$
    \tilde x_{jh}=\frac{1}{3},~~\forall j\in\mathscr{J},~\forall h\in\mathscr{H},\qquad \tilde C_{\max}=9
    $$

    Il valore ottimo $z(\mathrm{LP}_{P\|C_{\max}})$ è $9$. Di conseguenza, abbiamo lo stesso lower bound.

!!! chiave ""

    Usando una variabile duale libera $\mu_j$ per ogni vincolo $\eqref{assign:LP-PCMAX}$, una variabile duale non negativa $\pi_h$ per ogni vincolo $\eqref{load:LP-PCMAX}$ e una variabile duale non positiva $\lambda_{jh}$ per ogni vincolo $\eqref{ub:LP-PCMAX}$, il modello duale del modello $\mathrm{LP}_{P\|C_{\max}}$ è:

    <a id="eq-DLP-PCMAX"></a>

    \begin{align*}
    && \max \quad \sum_{j\in\mathscr{J}}\mu_j+\sum_{j\in\mathscr{J}}\sum_{h\in\mathscr{H}}\lambda_{jh} \label{obj:DLP-PCMAX} \tag{14.5a}\\[1ex]
    && \text{soggetto a}\quad \mu_j-t_j\pi_h+\lambda_{jh}&\le0,
    & \forall j\in\mathscr{J},~\forall h\in\mathscr{H}, \label{x:DLP-PCMAX} \tag{14.5b}\\[1ex]
    && \sum_{h\in\mathscr{H}}\pi_h&\le1, \label{C:DLP-PCMAX} \tag{14.5c}\\[1ex]
    && \mu_j&\gtreqless0, & \forall j\in\mathscr{J}, \label{free:DLP-PCMAX} \tag{14.5d}\\[1ex]
    && \pi_h&\ge0, & \forall h\in\mathscr{H}, \label{nonneg:DLP-PCMAX} \tag{14.5e}\\[1ex]
    && \lambda_{jh}&\le0, & \forall j\in\mathscr{J},~\forall h\in\mathscr{H}. \label{nonpos:DLP-PCMAX} \tag{14.5f}
    \end{align*}

    Questo modello LP si chiama modello $D(\mathrm{LP}_{P\|C_{\max}})$.

<a id="box-6-ex-PCMAX-DLP"></a>

!!! esempio "Esempio 14.5: Modello $D(\mathrm{LP}_{P\|C_{\max}})$"

    Il modello duale $D(\mathrm{LP}_{P\|C_{\max}})$ per l'istanza dell'<span style="color:#1971c2">[Esempio 14.1](#box-1-ex-PCMAX-ILP)</span> è:

    $$
    \begin{array}{rlcl}
    {\max} & {\mu_1+\mu_2+\mu_3+\mu_4+\mu_5+\mu_6+\mu_7+\lambda_{11}} &  &  \\
    & {+\lambda_{12}+\lambda_{13}+\lambda_{21}+\lambda_{22}+\lambda_{23}+\lambda_{31}+\lambda_{32}+\lambda_{33}} &  &  \\
    & {+\lambda_{41}+\lambda_{42}+\lambda_{43}+\lambda_{51}+\lambda_{52}+\lambda_{53}+\lambda_{61}+\lambda_{62}} &  &  \\
    & {+\lambda_{63}+\lambda_{71}+\lambda_{72}+\lambda_{73}} &  &  \\[1ex]
    \text{soggetto a} & {\mu_1-5\,\pi_1+\lambda_{11}} & {\le} & {0} \\
    & {\mu_1-5\,\pi_2+\lambda_{12}} & {\le} & {0} \\
    & {\mu_1-5\,\pi_3+\lambda_{13}} & {\le} & {0} \\
    & {\mu_2-5\,\pi_1+\lambda_{21}} & {\le} & {0} \\
    & {\mu_2-5\,\pi_2+\lambda_{22}} & {\le} & {0} \\
    & {\mu_2-5\,\pi_3+\lambda_{23}} & {\le} & {0} \\
    & {\mu_3-4\,\pi_1+\lambda_{31}} & {\le} & {0} \\
    & {\mu_3-4\,\pi_2+\lambda_{32}} & {\le} & {0} \\
    & {\mu_3-4\,\pi_3+\lambda_{33}} & {\le} & {0} \\
    & {\mu_4-4\,\pi_1+\lambda_{41}} & {\le} & {0} \\
    & {\mu_4-4\,\pi_2+\lambda_{42}} & {\le} & {0} \\
    & {\mu_4-4\,\pi_3+\lambda_{43}} & {\le} & {0} \\
    & {\mu_5-3\,\pi_1+\lambda_{51}} & {\le} & {0} \\
    & {\mu_5-3\,\pi_2+\lambda_{52}} & {\le} & {0} \\
    & {\mu_5-3\,\pi_3+\lambda_{53}} & {\le} & {0} \\
    & {\mu_6-3\,\pi_1+\lambda_{61}} & {\le} & {0} \\
    & {\mu_6-3\,\pi_2+\lambda_{62}} & {\le} & {0} \\
    & {\mu_6-3\,\pi_3+\lambda_{63}} & {\le} & {0} \\
    & {\mu_7-3\,\pi_1+\lambda_{71}} & {\le} & {0} \\
    & {\mu_7-3\,\pi_2+\lambda_{72}} & {\le} & {0} \\
    & {\mu_7-3\,\pi_3+\lambda_{73}} & {\le} & {0} \\
    & {\pi_1+\pi_2+\pi_3} & {\le} & {1} \\[1ex]
    & {\mu_1,~\mu_2,~\mu_3,~\mu_4,~\mu_5,~\mu_6,~\mu_7} & {\gtreqless} & {0} \\
    & {\pi_1,~\pi_2,~\pi_3} & {\ge} & {0} \\
    & {\lambda_{11},~\lambda_{12},~\lambda_{13},~\dots,~\lambda_{73}} & {\le} & {0}
    \end{array}
    $$

    Una soluzione ottima $(\tilde{\vet\mu},\tilde{\vet\pi},\tilde{\vet\lambda})(D(\mathrm{LP}_{P\|C_{\max}}))$ è la soluzione dell'<span style="color:#1971c2">[Esempio 14.3](#box-3-ex-PCMAX-DLP0)</span> con $\tilde\lambda_{jh}=0$ per ogni lavoro e ogni macchina:

    $$
    \tilde\mu_1=\tilde\mu_2=\frac{5}{3},~~\tilde\mu_3=\tilde\mu_4=\frac{4}{3},~~\tilde\mu_5=\tilde\mu_6=\tilde\mu_7=1,
    \qquad \tilde\pi_1=\tilde\pi_2=\tilde\pi_3=\frac{1}{3},
    \qquad \tilde\lambda_{jh}=0
    $$

    Il valore ottimo $z(D(\mathrm{LP}_{P\|C_{\max}}))$ è $9$.

### 14.4.1 Alcune proprietà teoriche importanti

<a id="box-7-prop-PCMAX-ratio"></a>

!!! teorema "Proposizione 14.2: Rapporto nel caso peggiore del bound LP"

    Per ogni istanza di $P\|C_{\max}$,

    $$
    \frac{z(\mathrm{LP}_{P\|C_{\max}})}{z(\mathrm{ILP}_{P\|C_{\max}})}\ge\frac1m.
    $$

??? dimostrazione "Dimostrazione"

    Assegnando ogni lavoro a una sola macchina otteniamo una schedula ammissibile di makespan $\sum_jt_j$. Quindi $z(\mathrm{ILP}_{P\|C_{\max}})\le\sum_jt_j$. Per la [Proposizione 14.1](#box-4-prop-LP0-PCMAX),

    $$
    \frac{z(\mathrm{LP}_{P\|C_{\max}})}{z(\mathrm{ILP}_{P\|C_{\max}})}
    \ge
    \frac{\frac{\sum_jt_j}{m}}{\sum_jt_j}
    =\frac1m.
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-8-prop-PCMAX-tight"></a>

!!! teorema "Proposizione 14.3: Il rapporto $1/m$ è raggiunto asintoticamente"

    Per un numero fissato $m \ge 2$ di macchine, esistono istanze per cui

    $$
    \frac{z(\mathrm{LP}_{P\|C_{\max}})}{z(\mathrm{ILP}_{P\|C_{\max}})}\longrightarrow\frac1m.
    $$

??? dimostrazione "Dimostrazione"

    Per $M\in\Z_{\ge2}$, consideriamo un lavoro di tempo di processamento $M$ e $m$ lavori di tempo di processamento uno. Il lavoro lungo da solo impone $z(\mathrm{ILP}_{P\|C_{\max}})\ge M$. La schedula che assegna il lavoro lungo da solo alla macchina $1$ e gli $m$ lavori unitari alle altre $m-1$ macchine ha carichi al più $2 \le M$, quindi il makespan $M$ è ammissibile. Quindi $z(\mathrm{ILP}_{P\|C_{\max}})=M$. La [Proposizione 14.1](#box-4-prop-LP0-PCMAX) dà

    $$
    z(\mathrm{LP}_{P\|C_{\max}})=\frac{M+m}{m}.
    $$

    Di conseguenza,

    $$
    \lim_{M\to+\infty}\frac{z(\mathrm{LP}_{P\|C_{\max}})}{z(\mathrm{ILP}_{P\|C_{\max}})}
    =\lim_{M\to+\infty}\left(\frac1m+\frac1M\right)=\frac1m.
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-9-ex-PCMAX-gap"></a>

!!! esempio "Esempio 14.6: Un gap di integralità"

    Consideriamo due macchine e tre lavori con tempi di processamento $(3,3,2)$. La [Proposizione 14.1](#box-4-prop-LP0-PCMAX) dà $z(\mathrm{LP}_{P\|C_{\max}})=8/2=4$. In ogni schedula intera una macchina esegue almeno due dei tre lavori, quindi il suo carico è almeno $3+2=5$; la schedula $\{3,2\},\{3\}$ lo raggiunge, quindi $z(\mathrm{ILP}_{P\|C_{\max}})=5$. L'assegnamento frazionario

    $$
    x_{j1}=x_{j2}=\frac12\qquad\forall j\in\{1,2,3\}
    $$

    ha carico quattro su entrambe le macchine, mentre l'ottimo intero ha carichi cinque e tre.

## 14.5 Considerazioni aggiuntive

- Per ogni lavoro $j$, la disuguaglianza

    \begin{equation*}
    C_{\max}\ge t_j
    \label{valid:job-PCMAX} \tag{14.6}
    \end{equation*}

    è una <strong>disuguaglianza valida</strong> per il modello [(14.1)](#eq-ILP-PCMAX). In ogni schedula intera, il lavoro $j$ è assegnato a una macchina, il cui carico, e quindi il makespan, vale almeno $t_j$ ($n$ vincoli lineari);

- La disuguaglianza

    \begin{equation*}
    C_{\max}\ge\left\lceil\frac{\sum_{j\in\mathscr{J}}t_j}{m}\right\rceil
    \label{valid:average-PCMAX} \tag{14.7}
    \end{equation*}

    è anch'essa una <strong>disuguaglianza valida</strong> per il modello [(14.1)](#eq-ILP-PCMAX): gli $m$ carichi delle macchine hanno somma $\sum_jt_j$, quindi il loro massimo vale almeno la loro media ed è intero in ogni schedula intera (un vincolo lineare);

- Le macchine sono identiche. I vincoli

    \begin{equation*}
    \sum_{j\in\mathscr{J}}t_jx_{jh}\ge
    \sum_{j\in\mathscr{J}}t_jx_{j,h+1}
    \qquad \forall h\in\{1,\ldots,m-1\}
    \label{symmetry:PCMAX} \tag{14.8}
    \end{equation*}

    sono <strong>vincoli che preservano l'ottimalità</strong>: non sono validi per ogni assegnamento ammissibile, ma le macchine di ogni schedula si possono rinumerare in modo che i carichi siano non crescenti, senza cambiare il makespan.

- I vincoli $\eqref{symmetry:PCMAX}$ eliminano le rinumerazioni equivalenti delle macchine solo quando i carichi sono distinti. Con carichi uguali non ne eliminano nessuna: nell'istanza del capitolo tutte le schedule ottime hanno carichi $9$, $9$, $9$, e tutte le $12$ soluzioni ottime del modello li soddisfano.

## 14.6 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Usare solo il bound LP.</strong> Il valore $\sum_j t_j/m$ ignora il lavoro più lungo: con un lavoro molto lungo è molto più piccolo del valore ottimo. Bisogna aggiungere la disuguaglianza valida $C_{\max}\ge t_j$.

    - <strong>Dimenticare l'arrotondamento per eccesso.</strong> Tutti i tempi di processamento sono interi, quindi $C_{\max}$ è intero in ogni schedula intera: il lower bound è $\lceil \sum_j t_j/m \rceil$.

    - <strong>Credere che i vincoli di simmetria eliminino tutte le soluzioni equivalenti.</strong> Eliminano le rinumerazioni delle macchine solo quando i carichi sono distinti; con carichi uguali non ne eliminano nessuna.

    - <strong>Dimenticare il verso dei vincoli di carico.</strong> I vincoli $\eqref{load:PCMAX}$ limitano $C_{\max}$ dal basso: è la minimizzazione che rende $C_{\max}$ uguale al carico massimo.

    - <strong>Confondere gli indici.</strong> La variabile $x_{jh}$ ha il lavoro $j$ come primo indice e la macchina $h$ come secondo.

## 14.7 In sintesi

!!! chiave "In sintesi"

    - Il modello $\mathrm{ILP}_{P\|C_{\max}}$ ha $n \cdot m$ variabili di assegnamento $x_{jh}$ e la variabile di makespan $C_{\max}$, collegate da un vincolo di carico per ogni macchina.

    - Il rilassamento lineare ha valore ottimo $z(\mathrm{LP}_{P\|C_{\max}}) = \sum_j t_j / m$, raggiunto assegnando ogni lavoro con valore $1/m$ a ogni macchina; la soluzione duale è $\tilde{\pi}_h = 1/m$ e $\tilde{\mu}_j = t_j/m$.

    - Il rapporto fra $z(\mathrm{LP}_{P\|C_{\max}})$ e $z(\mathrm{ILP}_{P\|C_{\max}})$ vale almeno $1/m$, e $1/m$ è raggiunto asintoticamente.

    - Le disuguaglianze valide $C_{\max} \ge t_j$ e $C_{\max} \ge \lceil \sum_j t_j/m \rceil$ rafforzano il modello.

    <strong>Quadro riassuntivo dell'istanza del capitolo</strong> ($m=3$, $t=(5,5,4,4,3,3,3)$). Lower bound sul valore ottimo $9$:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Bound</th>
    <th>Valore</th>
    <th>Da</th>
    </tr>
    <tr>
    <td>Rilassamento lineare</td>
    <td><span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\(\sum_j t_j / m = 27/3\)</span></td>
    </tr>
    <tr>
    <td>Disuguaglianze valide</td>
    <td><span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\(\max\{5, \lceil 27/3 \rceil\}\)</span></td>
    </tr>
    <tr>
    <td>Valore ottimo</td>
    <td><span class="arithmatex">\(9\)</span></td>
    <td>carichi <span class="arithmatex">\(9\)</span>, <span class="arithmatex">\(9\)</span>, <span class="arithmatex">\(9\)</span></td>
    </tr>
    </table></div>

    Sull'istanza del gap di integralità ($m=2$, $t=(3,3,2)$) il bound LP vale $4$ e il valore ottimo è $5$.

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di scheduling](../../esercizi/pcmax-formulations.md)

