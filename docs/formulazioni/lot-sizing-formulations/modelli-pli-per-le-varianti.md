---
title: "Varianti"
---

# 15.7 Modelli PLI per le varianti { #sez-sec-lsf-variants }

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 15** · [:material-book-open-variant: Capitolo 15: Problemi di lot sizing](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-lot-sizing-formulations.pdf) · [:material-pencil: Esercizi: Problemi di lot sizing](../../esercizi/lot-sizing-formulations.md)

</div>

I problemi di questa sezione sono le varianti del problema di lot sizing capacitato definite nel [Capitolo 8 «Problemi di lot sizing», Sezione 8.6](../../problemi-di-ottimizzazione-combinatoria/lot-sizing/varianti.md). Ogni sottosezione scrive il modello PLI di una variante, nell'ordine di quel capitolo.

## 15.7.1 Il problema di lot sizing senza capacità

- Dato un insieme $T=\{1,2,\dots,m\}$ di periodi con domande $d_t$ e senza capacità vincolante, introduciamo, per ogni periodo $t \in T$, le seguenti <strong>variabili intere</strong> e <strong>variabili binarie</strong>:

    $$
    x_t \in \Z_{\ge 0}~\text{(produzione)},\qquad s_t \in \Z_{\ge 0}~\text{(scorta alla fine del periodo)},
    $$

    $$
    y_t=\begin{cases}
    1 & \text{se c'è un setup nel periodo $t$}\\[1.5ex]
    0 & \text{altrimenti}
    \end{cases}
    $$

- Poiché $s_m=0$, la produzione del periodo $t$ vale al più la domanda $D_{t,m}$ dei periodi $t,\dots,m$: questo è il valore di big-M del legame fra $x_t$ e $y_t$.

!!! chiave ""

    Usando queste variabili, un modello di programmazione lineare intera (PLI) per il problema di lot sizing senza capacità (ULS) è il seguente:

    <a id="eq-ULS-model"></a>

    \begin{align*}
    && \min ~~ \sum_{t \in T} \left(sc_t\, y_t + vc_t\, x_t + hc_t\, s_t\right) \label{ULS:obj} \tag{15.5a}\\[1ex]
    && \text{soggetto a} \quad s_{t-1} + x_t & = d_t + s_t, & \forall t \in T, \label{ULS:bal} \tag{15.5b}\\[1ex]
    && x_t & \le D_{t,m}\, y_t, & \forall t \in T, \label{ULS:big} \tag{15.5c}\\[1ex]
    && s_0 = s_m & = 0, \label{ULS:end} \tag{15.5d}\\[1ex]
    && x_t & \in \Z_{\ge 0}, & \forall t \in T, \label{ULS:domx} \tag{15.5e}\\[1ex]
    && s_t & \in \Z_{\ge 0}, & \forall t \in T, \label{ULS:doms} \tag{15.5f}\\[1ex]
    && y_t & \in \{0,1\}, & \forall t \in T. \label{ULS:domy} \tag{15.5g}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{ULS}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{ULS}}$:

    - la funzione obiettivo lineare $\eqref{ULS:obj}$ minimizza il costo dei setup, della produzione e del mantenimento a scorta;

    - i vincoli $\eqref{ULS:bal}$ sono i vincoli di bilanciamento del flusso ($m$ vincoli lineari);

    - i vincoli $\eqref{ULS:big}$ impongono un setup in ogni periodo con produzione positiva ($m$ vincoli lineari);

    - il vincolo $\eqref{ULS:end}$ impone una scorta vuota all'inizio e alla fine dell'orizzonte;

    - infine, i vincoli $\eqref{ULS:domx}$–$\eqref{ULS:domy}$ definiscono le variabili del modello PLI.

- Il modello $\mathrm{ILP}_{\mathrm{ULS}}$ è il modello $\mathrm{ILP}_{\mathrm{CLSP}}$ senza i vincoli di capacità [(15.1d)](modelli-pli-per-il-problema-di-lot-sizing-capacitato.md#mjx-eqn:CL1:cap) e con i valori di big-M $M_t=D_{t,m}$. L'algoritmo di PD di Wagner e Whitin del [Capitolo 25 «PD per il problema di lot sizing senza capacità»](../../programmazione-dinamica/dp-lot-sizing/index.md) risolve l'ULS in tempo polinomiale.

<a id="box-6-ex-ULS-ILP"></a>

!!! esempio "Esempio 15.6: Modello $\mathrm{ILP}_{\mathrm{ULS}}$"

    Consideriamo l'istanza del CLS dell'<span style="color:#1971c2">[Esempio 15.1](modelli-pli-per-il-problema-di-lot-sizing-capacitato.md#box-1-ex-CLS-ref)</span> senza le capacità: le domande sono $\vet d=(2,1,3,4,1)$, i costi di setup $sc_t=50$, i costi di mantenimento $hc_t=10$, e $vc_t=0$. I valori di big-M sono $D_{t,5}=(11,9,8,5,1)$, e il modello $\mathrm{ILP}_{\mathrm{ULS}}$ per questa istanza dell'ULS è:

    $$
    \begin{array}{rlcl}
    {\min} & {50\,y_1+50\,y_2+50\,y_3+50\,y_4+50\,y_5+10\,s_1} &  &  \\
    & {+10\,s_2+10\,s_3+10\,s_4+10\,s_5} &  &  \\[1ex]
    \text{soggetto a} & {x_1-s_1} & {=} & {2} \\
    & {s_1+x_2-s_2} & {=} & {1} \\
    & {s_2+x_3-s_3} & {=} & {3} \\
    & {s_3+x_4-s_4} & {=} & {4} \\
    & {s_4+x_5-s_5} & {=} & {1} \\
    & {x_1-11\,y_1} & {\le} & {0} \\
    & {x_2-9\,y_2} & {\le} & {0} \\
    & {x_3-8\,y_3} & {\le} & {0} \\
    & {x_4-5\,y_4} & {\le} & {0} \\
    & {x_5-y_5} & {\le} & {0} \\
    & {s_5} & {=} & {0} \\[1ex]
    & {x_1,~x_2,~x_3,~x_4,~x_5} & {\in} & {\Z_{\ge 0}} \\
    & {s_1,~s_2,~s_3,~s_4,~s_5} & {\in} & {\Z_{\ge 0}} \\
    & {y_1,~y_2,~y_3,~y_4,~y_5} & {\in} & {\{0,1\}}
    \end{array}
    $$

    Una soluzione ottima $(\tilde{\vet y},\tilde{\vet x},\tilde{\vet s})(\mathrm{ILP}_{\mathrm{ULS}})$ è:

    $$
    \tilde{\vet y}=(1,0,1,0,0),\qquad \tilde{\vet x}=(3,0,8,0,0),\qquad \tilde{\vet s}=(1,0,5,1,0)
    $$

    Il valore ottimo $z(\mathrm{ILP}_{\mathrm{ULS}})$ è $2\cdot 50+(1+5+1)\cdot 10=170$, il bound della formulazione a cammino minimo del CLS. La soluzione ottima non è unica: anche il piano $(3,0,3,5,0)$, con tre setup e le scorte $(1,0,0,1,0)$, costa $3\cdot 50+2\cdot 10=170$.

## 15.7.2 Più prodotti e tempi di setup

- Un insieme $P$ di prodotti condivide la risorsa di ogni periodo. Scriviamo $d_{pt}$, $sc_{pt}$, $vc_{pt}$ e $hc_{pt}$ per i dati del prodotto $p \in P$ nel periodo $t \in T$. Produrre un'unità di $p$ richiede il tempo $vt_{pt} \in \Z_{\ge 1}$, un setup richiede il tempo $st_{pt} \in \Z_{\ge 0}$, e la capacità $cap_t$ è un tempo. Per $j\le k$ scriviamo $sd_{pjk}=\sum_{u=j}^{k} d_{pu}$ per la domanda del prodotto $p$ nei periodi $j,\dots,k$.

- Introduciamo, per ogni prodotto $p \in P$ e ogni periodo $t \in T$, le seguenti <strong>variabili intere</strong> e <strong>variabili binarie</strong>:

    $$
    x_{pt} \in \Z_{\ge 0}~\text{(produzione)},\qquad s_{pt} \in \Z_{\ge 0}~\text{(scorta alla fine del periodo)},
    $$

    $$
    y_{pt}=\begin{cases}
    1 & \text{se c'è un setup del prodotto $p$ nel periodo $t$}\\[1.5ex]
    0 & \text{altrimenti}
    \end{cases}
    $$

    Le scorte all'inizio dell'orizzonte sono le costanti $s_{p0}=0$.

!!! chiave ""

    Usando queste variabili, un modello di programmazione lineare intera (PLI) per il problema di lot sizing con più prodotti e tempi di setup (MLS) è il seguente:

    <a id="eq-CLSPm-bigM"></a>

    \begin{align*}
    &&\min ~~ \sum_{p \in P}\sum_{t \in T} \left(sc_{pt}\,y_{pt} + vc_{pt}\,x_{pt} + hc_{pt}\,s_{pt} \right) \label{obj:CLSPm} \tag{15.6a}\\[1ex]
    && \text{soggetto a}\quad s_{p,t-1} + x_{pt} & = d_{pt} + s_{pt}, & \forall p \in P,~\forall t\in T, \label{CLSPm:bal} \tag{15.6b}\\[1ex]
    && \sum_{p \in P}\left(st_{pt}\,y_{pt} + vt_{pt}\,x_{pt}\right) &\leq cap_t, & \forall t\in T, \label{CLSPm:cap} \tag{15.6c}\\[1ex]
    && x_{pt} &\le M_{pt}\, y_{pt}, & \forall p \in P,~ \forall t\in T, \label{CLSPm:M} \tag{15.6d}\\[1ex]
    && s_{p0} = s_{pm} &= 0, & \forall p \in P, \label{CLSPm:end} \tag{15.6e}\\[1ex]
    && x_{pt} &\in \Z_{\ge 0}, & \forall p \in P,~ \forall t\in T, \label{CLSPm:x} \tag{15.6f}\\[1ex]
    && s_{pt} &\in \Z_{\ge 0}, & \forall p \in P,~ \forall t\in T, \label{CLSPm:s} \tag{15.6g}\\[1ex]
    && y_{pt} &\in \{0,1\}, & \forall p \in P,~ \forall t\in T. \label{CLSPm:y} \tag{15.6h}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{CLSP}}^{P}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{CLSP}}^{P}$:

    - la funzione obiettivo lineare $\eqref{obj:CLSPm}$ minimizza il costo dei setup, della produzione e del mantenimento a scorta di tutti i prodotti;

    - i vincoli $\eqref{CLSPm:bal}$ sono i vincoli di bilanciamento del flusso di ogni prodotto ($|P|\,m$ vincoli lineari);

    - i vincoli $\eqref{CLSPm:cap}$ impongono che i tempi di setup e i tempi di produzione di ogni periodo non superino la sua capacità ($m$ vincoli lineari);

    - i vincoli $\eqref{CLSPm:M}$ collegano le quantità con i setup ($|P|\,m$ vincoli lineari);

    - i vincoli $\eqref{CLSPm:end}$ impongono una scorta vuota all'inizio e alla fine dell'orizzonte;

    - infine, i vincoli $\eqref{CLSPm:x}$–$\eqref{CLSPm:y}$ definiscono le variabili del modello PLI.

- Un setup di $p$ nel periodo $t$ lascia il tempo $cap_t-st_{pt}$ per la produzione, e $s_{pm}=0$ limita la produzione alla domanda residua. Il valore forte di big-M è

    $$
    M_{pt}=\min\left\{\left\lfloor\frac{cap_t-st_{pt}}{vt_{pt}}\right\rfloor,~sd_{ptm}\right\}.
    $$

- I prodotti interagiscono solo attraverso i vincoli di capacità $\eqref{CLSPm:cap}$: senza di essi, il modello si scompone in $|P|$ modelli indipendenti a un solo prodotto.

<a id="box-7-ex-CLSPm"></a>

!!! esempio "Esempio 15.7: Modello $\mathrm{ILP}_{\mathrm{CLSP}}^{P}$"

    Consideriamo $|P|=2$ prodotti e $m=3$ periodi, con capacità $cap_t=9$, tempi di produzione $vt_{pt}=1$, tempi di setup $st_{pt}=1$, costi di mantenimento $hc_{pt}=5$ e costi di produzione $vc_{pt}=0$. I costi di setup sono $sc_{1t}=30$ e $sc_{2t}=40$, e le domande sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th></th>
    <th colspan="3">prodotto <span class="arithmatex">\(1\)</span></th>
    <th colspan="3">prodotto <span class="arithmatex">\(2\)</span></th>
    </tr>
    <tr>
    <td>periodo <span class="arithmatex">\(t\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(d_{pt}\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(sd_{ptm}\)</span></td>
    <td><span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(M_{pt}\)</span></td>
    <td><span class="arithmatex">\(8\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    </table></div>

    Il modello $\mathrm{ILP}_{\mathrm{CLSP}}^{P}$ con i valori forti di big-M per questa istanza è:

    $$
    \begin{array}{rlcl}
    {\min} & {30\,y_{11}+30\,y_{12}+30\,y_{13}+40\,y_{21}+40\,y_{22}+40\,y_{23}} &  &  \\
    & {+5\,s_{11}+5\,s_{12}+5\,s_{13}+5\,s_{21}+5\,s_{22}+5\,s_{23}} &  &  \\[1ex]
    \text{soggetto a} & {x_{11}-s_{11}} & {=} & {3} \\
    & {s_{11}+x_{12}-s_{12}} & {=} & {2} \\
    & {s_{12}+x_{13}-s_{13}} & {=} & {4} \\
    & {x_{21}-s_{21}} & {=} & {2} \\
    & {s_{21}+x_{22}-s_{22}} & {=} & {4} \\
    & {s_{22}+x_{23}-s_{23}} & {=} & {1} \\
    & {x_{11}+x_{21}+y_{11}+y_{21}} & {\le} & {9} \\
    & {x_{12}+x_{22}+y_{12}+y_{22}} & {\le} & {9} \\
    & {x_{13}+x_{23}+y_{13}+y_{23}} & {\le} & {9} \\
    & {x_{11}-8\,y_{11}} & {\le} & {0} \\
    & {x_{12}-6\,y_{12}} & {\le} & {0} \\
    & {x_{13}-4\,y_{13}} & {\le} & {0} \\
    & {x_{21}-7\,y_{21}} & {\le} & {0} \\
    & {x_{22}-5\,y_{22}} & {\le} & {0} \\
    & {x_{23}-y_{23}} & {\le} & {0} \\
    & {s_{13}} & {=} & {0} \\
    & {s_{23}} & {=} & {0} \\[1ex]
    & {x_{11},~x_{12},~x_{13},~x_{21},~x_{22},~x_{23}} & {\in} & {\Z_{\ge 0}} \\
    & {s_{11},~s_{12},~s_{13},~s_{21},~s_{22},~s_{23}} & {\in} & {\Z_{\ge 0}} \\
    & {y_{11},~y_{12},~y_{13},~y_{21},~y_{22},~y_{23}} & {\in} & {\{0,1\}}
    \end{array}
    $$

    Una soluzione ottima $(\tilde{\vet y},\tilde{\vet x},\tilde{\vet s})(\mathrm{ILP}_{\mathrm{CLSP}}^{P})$ è:

    \begin{align*}
    &\tilde y_{11}=\tilde y_{13}=\tilde y_{21}=\tilde y_{22}=1,~~\tilde y_{12}=\tilde y_{23}=0,\\
    &\tilde x_{11}=5,~~\tilde x_{13}=4,~~\tilde x_{21}=2,~~\tilde x_{22}=5,~~\tilde x_{12}=\tilde x_{23}=0,\\
    &\tilde s_{11}=2,~~\tilde s_{22}=1,~~\text{tutte le altre }\tilde s_{pt}=0
    \end{align*}

    Il valore ottimo $z(\mathrm{ILP}_{\mathrm{CLSP}}^{P})$ è $2\cdot 30+2\cdot 40+(2+1)\cdot 5=155$, e la soluzione ottima è unica (Gurobi). Il periodo $1$ usa tutta la sua capacità, $5+2+1+1=9$. Senza i vincoli di capacità il prodotto $2$ sarebbe prodotto solo nel periodo $1$, con valore $140$: questo piano richiede il tempo $5+7+1+1=14>9$.

## 15.7.3 Scorta iniziale

- I dati sono quelli del problema di lot sizing con più prodotti e tempi di setup. In più, la scorta iniziale del prodotto $p$ è una decisione, acquistata al costo $fc_p$ per unità.

- Introduciamo le variabili intere $x_{pt}$, $s_{pt}$ e le variabili binarie $y_{pt}$ del modello $\mathrm{ILP}_{\mathrm{CLSP}}^{P}$ e, per ogni prodotto $p\in P$, la seguente <strong>variabile intera</strong>:

    $$
    si_p \in \Z_{\ge 0}~\text{(scorta del prodotto $p$ all'inizio dell'orizzonte)}.
    $$

!!! chiave ""

    Usando queste variabili, un modello di programmazione lineare intera (PLI) per il problema di lot sizing con scorta iniziale (LS-SI) è il seguente:

    <a id="eq-CLSP-bigM"></a>

    \begin{align*}
    &&\min ~~ \sum_{p \in P} fc_p\,si_p + {} \\
    && \sum_{p \in P}\sum_{t \in T} \left(sc_{pt}\,y_{pt} + vc_{pt}\,x_{pt} + hc_{pt}\,s_{pt} \right) \label{obj:CLSP} \tag{15.7a}\\[1ex]
    && \text{soggetto a}\quad si_{p} + x_{p1} & = d_{p1} + s_{p1}, & \forall p \in P, \label{CLSP:bal1} \tag{15.7b}\\[1ex]
    && s_{p,t-1} + x_{pt} & = d_{pt} + s_{pt}, & \forall p \in P,~\forall t\in T\setminus\{1\}, \label{CLSP:bal} \tag{15.7c}\\[1ex]
    && \sum_{p \in P}\left(st_{pt}\,y_{pt} + vt_{pt}\,x_{pt}\right) &\leq cap_t, & \forall t\in T, \label{CLSP:cap} \tag{15.7d}\\[1ex]
    && x_{pt} &\le M_{pt}\, y_{pt}, & \forall p \in P,~ \forall t\in T, \label{CLSP:M} \tag{15.7e}\\[1ex]
    && s_{pm} &= 0, & \forall p \in P, \label{CLSP:end} \tag{15.7f}\\[1ex]
    && x_{pt} &\in \Z_{\ge 0}, & \forall p \in P,~ \forall t\in T, \label{CLSP:x} \tag{15.7g}\\[1ex]
    && s_{pt} &\in \Z_{\ge 0}, & \forall p \in P,~ \forall t\in T, \label{CLSP:s} \tag{15.7h}\\[1ex]
    && si_{p} &\in \Z_{\ge 0}, & \forall p \in P, \label{CLSP:si} \tag{15.7i}\\[1ex]
    && y_{pt} &\in \{0,1\}, & \forall p \in P,~ \forall t\in T. \label{CLSP:y} \tag{15.7j}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{SI}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{SI}}$:

    - la funzione obiettivo lineare $\eqref{obj:CLSP}$ minimizza il costo della scorta iniziale, dei setup, della produzione e del mantenimento a scorta;

    - i vincoli $\eqref{CLSP:bal1}$ e $\eqref{CLSP:bal}$ sono i vincoli di bilanciamento del flusso di ogni prodotto, con la scorta iniziale $si_p$ nel primo periodo ($|P|\,m$ vincoli lineari);

    - i vincoli $\eqref{CLSP:cap}$ impongono che i tempi di setup e i tempi di produzione di ogni periodo non superino la sua capacità ($m$ vincoli lineari); i vincoli $\eqref{CLSP:M}$ collegano le quantità con i setup ($|P|\,m$ vincoli lineari);

    - i vincoli $\eqref{CLSP:end}$ impongono una scorta vuota alla fine dell'orizzonte ($|P|$ vincoli lineari);

    - infine, i vincoli $\eqref{CLSP:x}$–$\eqref{CLSP:y}$ definiscono le variabili del modello PLI.

- Il modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{SI}}$ è il modello $\mathrm{ILP}_{\mathrm{CLSP}}^{P}$ con le variabili $si_p$ al posto delle costanti $s_{p0}=0$, e con il loro costo nella funzione obiettivo; i valori forti di big-M $M_{pt}$ sono gli stessi.

<a id="box-8-ex-CLSP-inst"></a>

!!! esempio "Esempio 15.8: Modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{SI}}$"

    Consideriamo $|P|=2$ prodotti e $m=3$ periodi, con capacità $cap_1=2500$, $cap_2=2100$, $cap_3=2500$, i costi della scorta iniziale $fc_1=fc_2=3000$ e i costi di setup $sc_{pt}=10000$. Gli altri dati sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th></th>
    <th colspan="3">prodotto <span class="arithmatex">\(1\)</span></th>
    <th colspan="3">prodotto <span class="arithmatex">\(2\)</span></th>
    </tr>
    <tr>
    <td>periodo <span class="arithmatex">\(t\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(d_{pt}\)</span></td>
    <td><span class="arithmatex">\(100\)</span></td>
    <td><span class="arithmatex">\(200\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(100\)</span></td>
    <td><span class="arithmatex">\(150\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(vt_{pt}\)</span></td>
    <td><span class="arithmatex">\(20\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(st_{pt}\)</span></td>
    <td><span class="arithmatex">\(100\)</span></td>
    <td><span class="arithmatex">\(100\)</span></td>
    <td><span class="arithmatex">\(100\)</span></td>
    <td><span class="arithmatex">\(110\)</span></td>
    <td><span class="arithmatex">\(110\)</span></td>
    <td><span class="arithmatex">\(110\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(hc_{pt}\)</span></td>
    <td><span class="arithmatex">\(110\)</span></td>
    <td><span class="arithmatex">\(100\)</span></td>
    <td><span class="arithmatex">\(100\)</span></td>
    <td><span class="arithmatex">\(105\)</span></td>
    <td><span class="arithmatex">\(105\)</span></td>
    <td><span class="arithmatex">\(105\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(vc_{pt}\)</span></td>
    <td><span class="arithmatex">\(1100\)</span></td>
    <td><span class="arithmatex">\(1000\)</span></td>
    <td><span class="arithmatex">\(1000\)</span></td>
    <td><span class="arithmatex">\(900\)</span></td>
    <td><span class="arithmatex">\(800\)</span></td>
    <td><span class="arithmatex">\(800\)</span></td>
    </tr>
    </table></div>

    I valori di big-M sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>periodo <span class="arithmatex">\(t\)</span></th>
    <th><span class="arithmatex">\(1\)</span></th>
    <th><span class="arithmatex">\(2\)</span></th>
    <th><span class="arithmatex">\(3\)</span></th>
    <th><span class="arithmatex">\(1\)</span></th>
    <th><span class="arithmatex">\(2\)</span></th>
    <th><span class="arithmatex">\(3\)</span></th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(sd_{ptm}\)</span></td>
    <td><span class="arithmatex">\(310\)</span></td>
    <td><span class="arithmatex">\(210\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(260\)</span></td>
    <td><span class="arithmatex">\(250\)</span></td>
    <td><span class="arithmatex">\(150\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\lfloor (cap_t-st_{pt})/vt_{pt} \rfloor\)</span></td>
    <td><span class="arithmatex">\(120\)</span></td>
    <td><span class="arithmatex">\(200\)</span></td>
    <td><span class="arithmatex">\(240\)</span></td>
    <td><span class="arithmatex">\(239\)</span></td>
    <td><span class="arithmatex">\(398\)</span></td>
    <td><span class="arithmatex">\(478\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(M_{pt}\)</span></td>
    <td><span class="arithmatex">\(120\)</span></td>
    <td><span class="arithmatex">\(200\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(239\)</span></td>
    <td><span class="arithmatex">\(250\)</span></td>
    <td><span class="arithmatex">\(150\)</span></td>
    </tr>
    </table></div>

    Il modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{SI}}$ con i valori forti di big-M per questa istanza è:

    $$
    \begin{array}{rlcl}
    {\min} & {3000\,si_1+3000\,si_2+10000\,y_{11}+10000\,y_{12}+10000\,y_{13}+10000\,y_{21}} &  &  \\
    & {+10000\,y_{22}+10000\,y_{23}+1100\,x_{11}+1000\,x_{12}+1000\,x_{13}+900\,x_{21}} &  &  \\
    & {+800\,x_{22}+800\,x_{23}+110\,s_{11}+100\,s_{12}+100\,s_{13}+105\,s_{21}} &  &  \\
    & {+105\,s_{22}+105\,s_{23}} &  &  \\[1ex]
    \text{soggetto a} & {si_1+x_{11}-s_{11}} & {=} & {100} \\
    & {s_{11}+x_{12}-s_{12}} & {=} & {200} \\
    & {s_{12}+x_{13}-s_{13}} & {=} & {10} \\
    & {si_2+x_{21}-s_{21}} & {=} & {10} \\
    & {s_{21}+x_{22}-s_{22}} & {=} & {100} \\
    & {s_{22}+x_{23}-s_{23}} & {=} & {150} \\
    & {20\,x_{11}+10\,x_{21}+100\,y_{11}+110\,y_{21}} & {\le} & {2500} \\
    & {10\,x_{12}+5\,x_{22}+100\,y_{12}+110\,y_{22}} & {\le} & {2100} \\
    & {10\,x_{13}+5\,x_{23}+100\,y_{13}+110\,y_{23}} & {\le} & {2500} \\
    & {x_{11}-120\,y_{11}} & {\le} & {0} \\
    & {x_{12}-200\,y_{12}} & {\le} & {0} \\
    & {x_{13}-10\,y_{13}} & {\le} & {0} \\
    & {x_{21}-239\,y_{21}} & {\le} & {0} \\
    & {x_{22}-250\,y_{22}} & {\le} & {0} \\
    & {x_{23}-150\,y_{23}} & {\le} & {0} \\
    & {s_{13}} & {=} & {0} \\
    & {s_{23}} & {=} & {0} \\[1ex]
    & {si_1,~si_2} & {\in} & {\Z_{\ge 0}} \\
    & {x_{11},~x_{12},~x_{13},~x_{21},~x_{22},~x_{23}} & {\in} & {\Z_{\ge 0}} \\
    & {s_{11},~s_{12},~s_{13},~s_{21},~s_{22},~s_{23}} & {\in} & {\Z_{\ge 0}} \\
    & {y_{11},~y_{12},~y_{13},~y_{21},~y_{22},~y_{23}} & {\in} & {\{0,1\}}
    \end{array}
    $$

    Una soluzione ottima del modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{SI}}$ è:

    \begin{align*}
    &\tilde x_{11}=59,~~\tilde x_{12}=200,~~\tilde x_{13}=10,~~\tilde x_{21}=110,~~\tilde x_{22}=0,~~\tilde x_{23}=150,\\
    &\tilde{si}_1=41,~~\tilde{si}_2=0,~~\tilde s_{21}=100,~~\text{tutte le altre }\tilde s_{pt}=0,
    \end{align*}

    con un setup in ogni periodo tranne che per il prodotto $2$ nel periodo $2$. Il valore ottimo $z(\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{SI}})$ è $677\,400$, e la soluzione ottima è unica (Gurobi). Il prodotto $1$ parte con $41$ unità acquistate all'inizio dell'orizzonte, perché il periodo $1$ non ha il tempo di produrre tutta la sua domanda.

!!! chiave ""

    Per ottenere un rilassamento lineare del modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{SI}}$, rilassiamo i vincoli $\eqref{CLSP:x}$–$\eqref{CLSP:y}$ in vincoli di non negatività e nei bound $y_{pt}\le 1$. Il modello LP ottenuto è il seguente:

    <a id="eq-CLSP-LP"></a>

    \begin{align*}
    &&\min ~~ \sum_{p \in P} fc_p\,si_p + {} \\
    && \sum_{p \in P}\sum_{t \in T} \left(sc_{pt}\,y_{pt} + vc_{pt}\,x_{pt} + hc_{pt}\,s_{pt} \right) \label{obj:CLSP-LP} \tag{15.8a}\\[1ex]
    && \text{soggetto a}\quad si_{p} + x_{p1} & = d_{p1} + s_{p1}, & \forall p \in P, \label{CLSPLP:bal1} \tag{15.8b}\\[1ex]
    && s_{p,t-1} + x_{pt} & = d_{pt} + s_{pt}, & \forall p \in P,~\forall t\in T\setminus\{1\}, \label{CLSPLP:bal} \tag{15.8c}\\[1ex]
    && \sum_{p \in P}\left(st_{pt}\,y_{pt} + vt_{pt}\,x_{pt}\right) &\leq cap_t, & \forall t\in T, \label{CLSPLP:cap} \tag{15.8d}\\[1ex]
    && x_{pt} &\le M_{pt}\, y_{pt}, & \forall p \in P,~ \forall t\in T, \label{CLSPLP:M} \tag{15.8e}\\[1ex]
    && s_{pm} &= 0, & \forall p \in P, \label{CLSPLP:end} \tag{15.8f}\\[1ex]
    && y_{pt} &\le 1, & \forall p \in P,~ \forall t\in T, \label{CLSPLP:ub} \tag{15.8g}\\[1ex]
    && x_{pt} &\ge 0, & \forall p \in P,~ \forall t\in T, \label{CLSPLP:nn} \tag{15.8h}\\[1ex]
    && s_{pt} &\ge 0, & \forall p \in P,~ \forall t\in T, \label{CLSPLP:nns} \tag{15.8i}\\[1ex]
    && y_{pt} &\ge 0, & \forall p \in P,~ \forall t\in T, \label{CLSPLP:nny} \tag{15.8j}\\[1ex]
    && si_{p} &\ge 0, & \forall p \in P. \label{CLSPLP:si} \tag{15.8k}
    \end{align*}

    Questo modello LP si chiama modello $\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{SI}}$.

- Nella formulazione a cammino minimo ogni prodotto ha la sua rete, con una variabile continua aggiuntiva $w_{pt}\ge 0$, l'arco dal nodo $0$ al nodo $t$, per la frazione della scorta iniziale che copre le domande dei primi $t$ periodi. I costi degli archi sono

    $$
    cv_{ptk}=vc_{pt}\,sd_{ptk}+\sum_{s=t+1}^{k}\sum_{u=t}^{s-1}hc_{pu}\,d_{ps},
    \qquad
    ci_{pt}=fc_p\,sd_{p1t}+\sum_{s=2}^{t}\sum_{u=1}^{s-1}hc_{pu}\,d_{ps}.
    $$

!!! chiave ""

    Usando queste variabili, un modello di programmazione lineare intera mista (MIP) per il problema di lot sizing con scorta iniziale (LS-SI) è il seguente:

    <a id="eq-CLSP-SP"></a>

    \begin{align*}
    &&\min ~~ \sum_{p \in P}\sum_{t \in T}\left(sc_{pt}\,y_{pt} + ci_{pt}\,w_{pt}\right) + {} \\
    && \sum_{p \in P}\sum_{t \in T}\sum_{k=t}^{m} cv_{ptk}\,zv_{ptk} \label{obj:CLSP-SP} \tag{15.9a}\\[1ex]
    && \text{soggetto a}\quad \sum_{k=1}^{m}\left(w_{pk}+zv_{p1k}\right) &= 1, & \forall p \in P, \label{CLSPSP1} \tag{15.9b}\\[1ex]
    && w_{p,t-1}+\sum_{u=1}^{t-1}zv_{p,u,t-1} - \sum_{k=t}^{m}zv_{ptk} &= 0, & \forall p \in P,~\forall t\in T\setminus\{1\}, \label{CLSPSP2} \tag{15.9c}\\[1ex]
    && \sum_{k=t}^{m}zv_{ptk} &\leq y_{pt}, & \forall p \in P,~\forall t\in T, \label{CLSPSP3} \tag{15.9d}\\[1ex]
    && \sum_{p\in P}st_{pt}\,y_{pt}+\sum_{p\in P}\sum_{k=t}^{m} vt_{pt}\,sd_{ptk}\,zv_{ptk} &\leq cap_t, & \forall t\in T, \label{CLSPSP4} \tag{15.9e}\\[1ex]
    && \sum_{k=t}^{m} sd_{ptk}\,zv_{ptk} &\in \Z_{\ge 0}, & \forall p \in P,~\forall t\in T, \label{CLSPSP-intx} \tag{15.9f}\\[1ex]
    && \sum_{t\in T} sd_{p1t}\,w_{pt} &\in \Z_{\ge 0}, & \forall p \in P, \label{CLSPSP-intsi} \tag{15.9g}\\[1ex]
    && zv_{ptk} & \geq 0, & \forall p \in P,~\forall t,k\in T,~ k\geq t, \label{CLSPSP5} \tag{15.9h}\\[1ex]
    && w_{pt} & \geq 0, & \forall p \in P,~\forall t\in T, \label{CLSPSP6} \tag{15.9i}\\[1ex]
    && y_{pt} & \in \{0, 1\}, & \forall p \in P,~\forall t \in T. \label{CLSPSP7} \tag{15.9j}
    \end{align*}

    Questo modello MIP si chiama modello $\mathrm{MIP}^{\mathrm{SP},\mathrm{SI}}_{\mathrm{CLSP}}$. Rilassando i vincoli $\eqref{CLSPSP7}$ in $0\le y_{pt}\le 1$ ed eliminando i vincoli $\eqref{CLSPSP-intx}$ e $\eqref{CLSPSP-intsi}$ otteniamo il modello LP chiamato modello $\mathrm{LP}^{\mathrm{SP},\mathrm{SI}}_{\mathrm{CLSP}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{MIP}^{\mathrm{SP},\mathrm{SI}}_{\mathrm{CLSP}}$:

    - la funzione obiettivo lineare $\eqref{obj:CLSP-SP}$ minimizza il costo dei setup, della scorta iniziale e degli archi dei piani di tutti i prodotti;

    - i vincoli $\eqref{CLSPSP1}$ e $\eqref{CLSPSP2}$ sono i vincoli di flusso della rete di ogni prodotto, con gli archi $w_{pt}$ della scorta iniziale uscenti dal nodo $0$ ($|P|\,m$ vincoli lineari);

    - i vincoli $\eqref{CLSPSP3}$ impongono il setup del prodotto $p$ nel periodo $t$ se questo è prodotto ($|P|\,m$ vincoli lineari), e i vincoli $\eqref{CLSPSP4}$ impongono le capacità, tempi di setup compresi ($m$ vincoli lineari);

    - i vincoli $\eqref{CLSPSP-intx}$ e $\eqref{CLSPSP-intsi}$ mantengono intere le quantità e le scorte iniziali;

    - infine, i vincoli $\eqref{CLSPSP5}$–$\eqref{CLSPSP7}$ definiscono le variabili del modello MIP.

- La quantità prodotta è $x_{pt}=\sum_{k=t}^{m} sd_{ptk}\,zv_{ptk}$, e la scorta iniziale è $si_p=\sum_{t\in T} sd_{p1t}\,w_{pt}$: i vincoli $\eqref{CLSPSP-intx}$ e $\eqref{CLSPSP-intsi}$ le mantengono intere, come nel modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{SI}}$.

- Con un solo prodotto e $vt_t=1$ questi vincoli non servono: fissati i setup, resta un problema di flusso di costo minimo, che ha una soluzione ottima intera.

- Con più prodotti e tempi di produzione $vt_{pt}>1$, una quantità frazionaria può usare meglio la capacità. Senza i vincoli $\eqref{CLSPSP-intx}$ e $\eqref{CLSPSP-intsi}$ il modello è solo un rilassamento del problema, e il suo valore ottimo può essere minore di $z(\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{SI}})$ (<span style="color:#1971c2">[Esempio 15.9](#box-9-ex-CLSP-bounds)</span>).

<a id="box-9-ex-CLSP-bounds"></a>

!!! esempio "Esempio 15.9: Lower bound con due prodotti"

    Per l'istanza dell'<span style="color:#1971c2">[Esempio 15.8](#box-8-ex-CLSP-inst)</span>, ignorando i setup (nei costi e nelle capacità), il valore ottimo è $575400$, raggiunto dalla soluzione intera $x_{11}=120$, $x_{12}=160$, $x_{13}=10$, $x_{21}=10$, $x_{22}=100$, $x_{23}=150$, $s_{11}=40$, $si_1=20$. I lower bound e il valore ottimo delle formulazioni sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Modello</th>
    <th>Valore</th>
    </tr>
    <tr>
    <td>Senza setup</td>
    <td><span class="arithmatex">\(575\,400.00\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{SI}}\)</span> con <span class="arithmatex">\(M_{pt}=sd_{ptm}\)</span></td>
    <td><span class="arithmatex">\(638\,882.20\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{SI}}\)</span> con gli <span class="arithmatex">\(M_{pt}\)</span> forti</td>
    <td><span class="arithmatex">\(651\,267.37\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\mathrm{LP}^{\mathrm{SP},\mathrm{SI}}_{\mathrm{CLSP}}\)</span></td>
    <td><span class="arithmatex">\(668\,928.57\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\mathrm{MIP}^{\mathrm{SP},\mathrm{SI}}_{\mathrm{CLSP}}\)</span> senza <span class="arithmatex">\(\eqref{CLSPSP-intx}\)</span> e <span class="arithmatex">\(\eqref{CLSPSP-intsi}\)</span></td>
    <td><span class="arithmatex">\(676\,450.00\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{SI}}\)</span> e <span class="arithmatex">\(\mathrm{MIP}^{\mathrm{SP},\mathrm{SI}}_{\mathrm{CLSP}}\)</span> (ottimo intero)</td>
    <td><span class="arithmatex">\(677\,400\)</span></td>
    </tr>
    </table></div>

    Senza i vincoli $\eqref{CLSPSP-intx}$ e $\eqref{CLSPSP-intsi}$ il modello a cammino minimo raggiunge $676\,450$ con gli stessi setup e le quantità frazionarie $x_{11}=59.5$ e $si_1=40.5$: il periodo $1$ usa allora tutta la sua capacità, $100+20\cdot 59.5+110+10\cdot 110=2500$.

## 15.7.4 Straordinari

- I dati sono quelli del problema di lot sizing con più prodotti e tempi di setup, ma il tempo di ogni periodo non è una capacità fissa: nel periodo $t$ il tempo di lavoro in orario normale costa $cw_t$ per unità, fino a $cap^{N}_t$, e lo straordinario costa $co_t$ per unità, fino a $cap^{O}_t$.

- Introduciamo le variabili intere $x_{pt}$, $s_{pt}$ e le variabili binarie $y_{pt}$ del modello $\mathrm{ILP}_{\mathrm{CLSP}}^{P}$ e, per ogni periodo $t\in T$, le seguenti <strong>variabili intere</strong>:

    $$
    \mu_t \in \Z_{\ge 0}~\text{(tempo di lavoro in orario normale)},\qquad \nu_t \in \Z_{\ge 0}~\text{(straordinario)}.
    $$

    Poiché i tempi $vt_{pt}$ e $st_{pt}$ sono interi, i tempi di lavoro si possono prendere interi.

!!! chiave ""

    Usando queste variabili, un modello di programmazione lineare intera (PLI) per il problema di lot sizing con straordinari (LS-OT) è il seguente:

    <a id="eq-CLSPo-bigM"></a>

    \begin{align*}
    &&\min ~~ \sum_{p \in P}\sum_{t \in T} \left(sc_{pt}\,y_{pt} + vc_{pt}\,x_{pt} + hc_{pt}\,s_{pt} \right) + {} \\
    && \sum_{t \in T}\left(cw_t\,\mu_t + co_t\,\nu_t\right) \label{obj:CLSPo} \tag{15.10a}\\[1ex]
    && \text{soggetto a}\quad s_{p,t-1} + x_{pt} & = d_{pt} + s_{pt}, & \forall p \in P,~\forall t\in T, \label{CLSPo:bal} \tag{15.10b}\\[1ex]
    && \sum_{p \in P}\left(st_{pt}\,y_{pt} + vt_{pt}\,x_{pt}\right) &\leq \mu_t+\nu_t, & \forall t\in T, \label{CLSPo:time} \tag{15.10c}\\[1ex]
    && \mu_t &\le cap^{N}_t, & \forall t\in T, \label{CLSPo:N} \tag{15.10d}\\[1ex]
    && \nu_t &\le cap^{O}_t, & \forall t\in T, \label{CLSPo:O} \tag{15.10e}\\[1ex]
    && x_{pt} &\le M_{pt}\, y_{pt}, & \forall p \in P,~ \forall t\in T, \label{CLSPo:M} \tag{15.10f}\\[1ex]
    && s_{p0} = s_{pm} &= 0, & \forall p \in P, \label{CLSPo:end} \tag{15.10g}\\[1ex]
    && x_{pt} &\in \Z_{\ge 0}, & \forall p \in P,~ \forall t\in T, \label{CLSPo:x} \tag{15.10h}\\[1ex]
    && s_{pt} &\in \Z_{\ge 0}, & \forall p \in P,~ \forall t\in T, \label{CLSPo:s} \tag{15.10i}\\[1ex]
    && \mu_t &\in \Z_{\ge 0}, & \forall t\in T, \label{CLSPo:mu} \tag{15.10j}\\[1ex]
    && \nu_t &\in \Z_{\ge 0}, & \forall t\in T, \label{CLSPo:nu} \tag{15.10k}\\[1ex]
    && y_{pt} &\in \{0,1\}, & \forall p \in P,~ \forall t\in T. \label{CLSPo:y} \tag{15.10l}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{OT}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{OT}}$:

    - la funzione obiettivo lineare $\eqref{obj:CLSPo}$ aggiunge ai costi del modello $\mathrm{ILP}_{\mathrm{CLSP}}^{P}$ il costo del tempo di lavoro in orario normale e in straordinario;

    - i vincoli $\eqref{CLSPo:bal}$ sono i vincoli di bilanciamento del flusso di ogni prodotto ($|P|\,m$ vincoli lineari);

    - i vincoli $\eqref{CLSPo:time}$ impongono che i tempi di setup e i tempi di produzione di ogni periodo siano coperti dal tempo di lavoro, in orario normale e in straordinario ($m$ vincoli lineari);

    - i vincoli $\eqref{CLSPo:N}$ e $\eqref{CLSPo:O}$ limitano i due tempi di lavoro ($m$ vincoli lineari ciascuno);

    - i vincoli $\eqref{CLSPo:M}$ collegano le quantità con i setup ($|P|\,m$ vincoli lineari);

    - i vincoli $\eqref{CLSPo:end}$ impongono una scorta vuota all'inizio e alla fine dell'orizzonte;

    - infine, i vincoli $\eqref{CLSPo:x}$–$\eqref{CLSPo:y}$ definiscono le variabili del modello PLI.

- Il tempo disponibile nel periodo $t$ è al più $cap^{N}_t+cap^{O}_t$, quindi il valore forte di big-M è

    $$
    M_{pt}=\min\left\{\left\lfloor\frac{cap^{N}_t+cap^{O}_t-st_{pt}}{vt_{pt}}\right\rfloor,~sd_{ptm}\right\}.
    $$

- Con $co_t>cw_t$ una soluzione ottima usa lo straordinario solo quando le ore normali del periodo sono esaurite.

<a id="box-10-ex-CLSPo"></a>

!!! esempio "Esempio 15.10: Modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{OT}}$"

    Consideriamo l'istanza del CLS dell'<span style="color:#1971c2">[Esempio 15.1](modelli-pli-per-il-problema-di-lot-sizing-capacitato.md#box-1-ex-CLS-ref)</span>, con un solo prodotto ($|P|=1$, e omettiamo l'indice $p$), tempi di produzione $vt_t=1$ e tempi di setup $st_t=0$. La capacità $cap_t=4$ diventa l'orario normale $cap^{N}_t=4$, al costo $cw_t=1$, e in ogni periodo è disponibile un'unità di straordinario: $cap^{O}_t=1$, al costo $co_t=6$. I valori di big-M sono $M_t=\min\{5,D_{t,5}\}$, ossia $(5,5,5,5,1)$. Il modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{OT}}$ per questa istanza è:

    $$
    \begin{array}{rlcl}
    {\min} & {50\,y_1+50\,y_2+50\,y_3+50\,y_4+50\,y_5+10\,s_1} &  &  \\
    & {+10\,s_2+10\,s_3+10\,s_4+10\,s_5+\mu_1+\mu_2} &  &  \\
    & {+\mu_3+\mu_4+\mu_5+6\,\nu_1+6\,\nu_2+6\,\nu_3} &  &  \\
    & {+6\,\nu_4+6\,\nu_5} &  &  \\[1ex]
    \text{soggetto a} & {x_1-s_1} & {=} & {2} \\
    & {s_1+x_2-s_2} & {=} & {1} \\
    & {s_2+x_3-s_3} & {=} & {3} \\
    & {s_3+x_4-s_4} & {=} & {4} \\
    & {s_4+x_5-s_5} & {=} & {1} \\
    & {x_1-\mu_1-\nu_1} & {\le} & {0} \\
    & {x_2-\mu_2-\nu_2} & {\le} & {0} \\
    & {x_3-\mu_3-\nu_3} & {\le} & {0} \\
    & {x_4-\mu_4-\nu_4} & {\le} & {0} \\
    & {x_5-\mu_5-\nu_5} & {\le} & {0} \\
    & {x_1-5\,y_1} & {\le} & {0} \\
    & {x_2-5\,y_2} & {\le} & {0} \\
    & {x_3-5\,y_3} & {\le} & {0} \\
    & {x_4-5\,y_4} & {\le} & {0} \\
    & {x_5-y_5} & {\le} & {0} \\
    & {\mu_1} & {\le} & {4} \\
    & {\mu_2} & {\le} & {4} \\
    & {\mu_3} & {\le} & {4} \\
    & {\mu_4} & {\le} & {4} \\
    & {\mu_5} & {\le} & {4} \\
    & {\nu_1} & {\le} & {1} \\
    & {\nu_2} & {\le} & {1} \\
    & {\nu_3} & {\le} & {1} \\
    & {\nu_4} & {\le} & {1} \\
    & {\nu_5} & {\le} & {1} \\
    & {s_5} & {=} & {0} \\[1ex]
    & {x_1,~x_2,~x_3,~x_4,~x_5} & {\in} & {\Z_{\ge 0}} \\
    & {s_1,~s_2,~s_3,~s_4,~s_5} & {\in} & {\Z_{\ge 0}} \\
    & {\mu_1,~\mu_2,~\mu_3,~\dots,~\nu_5} & {\in} & {\Z_{\ge 0}} \\
    & {y_1,~y_2,~y_3,~y_4,~y_5} & {\in} & {\{0,1\}}
    \end{array}
    $$

    Una soluzione ottima del modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{OT}}$ è:

    \begin{align*}
    &\tilde{\vet y}=(1,0,1,1,0),\qquad \tilde{\vet x}=(3,0,3,5,0),\qquad \tilde{\vet s}=(1,0,0,1,0),\\
    &\tilde{\vet \mu}=(3,0,3,4,0),\qquad \tilde{\vet \nu}=(0,0,0,1,0)
    \end{align*}

    Il valore ottimo $z(\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{OT}})$ è $3\cdot 50+2\cdot 10+10\cdot 1+1\cdot 6=186$, e la soluzione ottima è unica (Gurobi). Un'unità di straordinario nel periodo $4$, al costo $6$, sostituisce un'unità tenuta a scorta dal periodo $3$ al periodo $4$, al costo $10$: il piano ottimo $(3,0,4,4,0)$ del CLS qui costa $191$.

## 15.7.5 Domanda non soddisfatta

- I dati sono quelli del problema di lot sizing con più prodotti e tempi di setup. In più, una parte della domanda $d_{pt}$ può restare non soddisfatta, con la penalità $cu_{pt}$ per unità.

- Introduciamo le variabili intere $x_{pt}$, $s_{pt}$ e le variabili binarie $y_{pt}$ del modello $\mathrm{ILP}_{\mathrm{CLSP}}^{P}$ e, per ogni prodotto $p\in P$ e ogni periodo $t\in T$, la seguente <strong>variabile intera</strong>:

    $$
    \varepsilon_{pt} \in \Z_{\ge 0}~\text{(domanda del prodotto $p$ nel periodo $t$ non soddisfatta)}.
    $$

!!! chiave ""

    Usando queste variabili, un modello di programmazione lineare intera (PLI) per il problema di lot sizing con domanda non soddisfatta (LS-UD) è il seguente:

    <a id="eq-CLSPu-bigM"></a>

    \begin{align*}
    &&\min ~~ \sum_{p \in P}\sum_{t \in T} \left(sc_{pt}\,y_{pt} + vc_{pt}\,x_{pt} + hc_{pt}\,s_{pt} \right) + {} \\
    && \sum_{p \in P}\sum_{t \in T} cu_{pt}\,\varepsilon_{pt} \label{obj:CLSPu} \tag{15.11a}\\[1ex]
    && \text{soggetto a}\quad s_{p,t-1} + x_{pt} & = d_{pt} - \varepsilon_{pt} + s_{pt}, & \forall p \in P,~\forall t\in T, \label{CLSPu:bal} \tag{15.11b}\\[1ex]
    && \sum_{p \in P}\left(st_{pt}\,y_{pt} + vt_{pt}\,x_{pt}\right) &\leq cap_t, & \forall t\in T, \label{CLSPu:cap} \tag{15.11c}\\[1ex]
    && x_{pt} &\le M_{pt}\, y_{pt}, & \forall p \in P,~ \forall t\in T, \label{CLSPu:M} \tag{15.11d}\\[1ex]
    && \varepsilon_{pt} &\le d_{pt}, & \forall p \in P,~ \forall t\in T, \label{CLSPu:eps} \tag{15.11e}\\[1ex]
    && s_{p0} = s_{pm} &= 0, & \forall p \in P, \label{CLSPu:end} \tag{15.11f}\\[1ex]
    && x_{pt} &\in \Z_{\ge 0}, & \forall p \in P,~ \forall t\in T, \label{CLSPu:x} \tag{15.11g}\\[1ex]
    && s_{pt} &\in \Z_{\ge 0}, & \forall p \in P,~ \forall t\in T, \label{CLSPu:s} \tag{15.11h}\\[1ex]
    && \varepsilon_{pt} &\in \Z_{\ge 0}, & \forall p \in P,~ \forall t\in T, \label{CLSPu:epsdom} \tag{15.11i}\\[1ex]
    && y_{pt} &\in \{0,1\}, & \forall p \in P,~ \forall t\in T. \label{CLSPu:y} \tag{15.11j}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{UD}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{UD}}$:

    - la funzione obiettivo lineare $\eqref{obj:CLSPu}$ aggiunge ai costi del modello $\mathrm{ILP}_{\mathrm{CLSP}}^{P}$ la penalità della domanda non soddisfatta;

    - i vincoli $\eqref{CLSPu:bal}$ sono i vincoli di bilanciamento del flusso, con la domanda ridotta della sua parte non soddisfatta ($|P|\,m$ vincoli lineari);

    - i vincoli $\eqref{CLSPu:cap}$ sono i vincoli di capacità e i vincoli $\eqref{CLSPu:M}$ collegano le quantità con i setup ($m$ e $|P|\,m$ vincoli lineari);

    - i vincoli $\eqref{CLSPu:eps}$ garantiscono che la domanda non soddisfatta non superi la domanda ($|P|\,m$ vincoli lineari);

    - i vincoli $\eqref{CLSPu:end}$ impongono una scorta vuota all'inizio e alla fine dell'orizzonte;

    - infine, i vincoli $\eqref{CLSPu:x}$–$\eqref{CLSPu:y}$ definiscono le variabili del modello PLI.

- I valori di big-M del modello $\mathrm{ILP}_{\mathrm{CLSP}}^{P}$ restano validi, poiché la produzione può solo diminuire. Con $\varepsilon_{pt}=0$ per ogni prodotto e periodo il modello è il modello $\mathrm{ILP}_{\mathrm{CLSP}}^{P}$.

<a id="box-11-ex-CLSPu"></a>

!!! esempio "Esempio 15.11: Modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{UD}}$"

    Consideriamo l'istanza del CLS dell'<span style="color:#1971c2">[Esempio 15.1](modelli-pli-per-il-problema-di-lot-sizing-capacitato.md#box-1-ex-CLS-ref)</span>, con un solo prodotto ($|P|=1$, e omettiamo l'indice $p$), tempi di produzione $vt_t=1$, tempi di setup $st_t=0$ e i valori forti di big-M $M_t=(4,4,4,4,1)$. Ogni unità di domanda non soddisfatta costa $cu_t=18$. Il modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{UD}}$ per questa istanza è:

    $$
    \begin{array}{rlcl}
    {\min} & {50\,y_1+50\,y_2+50\,y_3+50\,y_4+50\,y_5+10\,s_1} &  &  \\
    & {+10\,s_2+10\,s_3+10\,s_4+10\,s_5+18\,\varepsilon_1+18\,\varepsilon_2} &  &  \\
    & {+18\,\varepsilon_3+18\,\varepsilon_4+18\,\varepsilon_5} &  &  \\[1ex]
    \text{soggetto a} & {x_1-s_1+\varepsilon_1} & {=} & {2} \\
    & {s_1+x_2-s_2+\varepsilon_2} & {=} & {1} \\
    & {s_2+x_3-s_3+\varepsilon_3} & {=} & {3} \\
    & {s_3+x_4-s_4+\varepsilon_4} & {=} & {4} \\
    & {s_4+x_5-s_5+\varepsilon_5} & {=} & {1} \\
    & {x_1} & {\le} & {4} \\
    & {x_2} & {\le} & {4} \\
    & {x_3} & {\le} & {4} \\
    & {x_4} & {\le} & {4} \\
    & {x_5} & {\le} & {4} \\
    & {x_1-4\,y_1} & {\le} & {0} \\
    & {x_2-4\,y_2} & {\le} & {0} \\
    & {x_3-4\,y_3} & {\le} & {0} \\
    & {x_4-4\,y_4} & {\le} & {0} \\
    & {x_5-y_5} & {\le} & {0} \\
    & {\varepsilon_1} & {\le} & {2} \\
    & {\varepsilon_2} & {\le} & {1} \\
    & {\varepsilon_3} & {\le} & {3} \\
    & {\varepsilon_4} & {\le} & {4} \\
    & {\varepsilon_5} & {\le} & {1} \\
    & {s_5} & {=} & {0} \\[1ex]
    & {x_1,~x_2,~x_3,~x_4,~x_5} & {\in} & {\Z_{\ge 0}} \\
    & {s_1,~s_2,~s_3,~s_4,~s_5} & {\in} & {\Z_{\ge 0}} \\
    & {\varepsilon_1,~\varepsilon_2,~\varepsilon_3,~\varepsilon_4,~\varepsilon_5} & {\in} & {\Z_{\ge 0}} \\
    & {y_1,~y_2,~y_3,~y_4,~y_5} & {\in} & {\{0,1\}}
    \end{array}
    $$

    Una soluzione ottima del modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{UD}}$ è:

    $$
    \tilde{\vet y}=(0,0,1,1,0),\qquad \tilde{\vet x}=(0,0,3,4,0),\qquad \tilde{\vet s}=(0,0,0,0,0),\qquad
    \tilde{\vet \varepsilon}=(2,1,0,0,1)
    $$

    Il valore ottimo $z(\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{UD}})$ è $2\cdot 50+4\cdot 18=172$, e la soluzione ottima è unica (Gurobi). Le domande dei periodi $1$, $2$ e $5$ non sono soddisfatte: le loro $4$ unità costano $72$, e il piano risparmia un setup e tutti i costi di mantenimento a scorta del piano ottimo $(3,0,4,4,0)$ del CLS, di costo $180$.

## 15.8 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Prendere un valore di big-M troppo piccolo.</strong> Un valore minore della produzione di un piano ammissibile taglia quel piano: i valori $D_{t,m}$ e $cap_t$ sono entrambi validi.

    - <strong>Prendere un valore di big-M troppo grande.</strong> Ogni valore valido dà un modello corretto, ma un valore grande dà un rilassamento debole: le variabili di setup diventano quasi nulle nelle soluzioni LP, come nel bound $99.65$ dell'istanza di riferimento.

    - <strong>Dimenticare i tempi di setup nei vincoli di capacità.</strong> Con più prodotti i vincoli contengono $st_{pt}\,y_{pt}$ oltre a $vt_{pt}\,x_{pt}$.

    - <strong>Contare il costo di mantenimento della domanda del periodo di produzione.</strong> In $cv_{tk}$ le unità per il periodo $t$ non vanno a scorta: la somma dei costi di mantenimento parte dalla domanda del periodo $t+1$.

    - <strong>Credere che la formulazione a cammino minimo richieda cammini binari.</strong> Le variabili $zv_{tk}$ sono continue: un piano ammissibile che non è un cammino è una combinazione di cammini.

    - <strong>Dimenticare l'interezza delle quantità con più prodotti.</strong> Con tempi di produzione $vt_{pt}>1$ le variabili continue $zv_{ptk}$ possono dare quantità frazionarie: il modello a cammino minimo richiede i vincoli di interezza $\eqref{CLSPSP-intx}$ e $\eqref{CLSPSP-intsi}$, altrimenti è solo un rilassamento ($676\,450<677\,400$).

    - <strong>Mantenere la capacità fissa nel modello con straordinari.</strong> Il tempo del periodo $t$ è limitato dal tempo di lavoro $\mu_t+\nu_t$, e i valori di big-M usano $cap^{N}_t+cap^{O}_t$.

    - <strong>Lasciare illimitata la domanda non soddisfatta.</strong> Senza $\varepsilon_{pt}\le d_{pt}$ i vincoli di bilanciamento ammetterebbero una domanda netta negativa, ossia scorta creata dal nulla al prezzo della penalità.

## 15.9 In sintesi

!!! chiave "In sintesi"

    - Senza i setup il CLS è un semplice problema di flusso; i setup richiedono le variabili binarie $y_t$ e un legame con le quantità.

    - Nella formulazione big-M il legame $x_t \le M_t\, y_t$ è corretto per ogni $M_t$ valido, ma il bound LP migliora quando $M_t$ diminuisce: il valore forte è $\min\{cap_t, D_{t,m}\}$.

    - La formulazione a cammino minimo scrive i piani come cammini in una rete, con il legame $\sum_k zv_{tk} \le y_t$ e senza valore di big-M: il suo rilassamento è il più forte.

    - Le due formulazioni hanno lo stesso valore ottimo; differiscono nel lower bound e nella dimensione del modello.

    - Il modello ULS è il modello big-M senza capacità e con $M_t=D_{t,m}$: sull'istanza di riferimento il suo valore ottimo è $170$.

    - Le varianti mantengono la struttura del modello big-M: più prodotti condividono la capacità con i loro tempi di setup, la scorta iniziale aggiunge le variabili $si_p$, gli straordinari aggiungono i tempi di lavoro $\mu_t,\nu_t$, e la domanda non soddisfatta aggiunge le variabili $\varepsilon_{pt}$. Sull'istanza di riferimento, gli straordinari danno $186$ e la domanda non soddisfatta $172$.

    <strong>Quadro riassuntivo dell'istanza di riferimento.</strong> Lower bound sul valore ottimo calcolati in questo capitolo:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Bound</th>
    <th>Valore</th>
    <th>Da</th>
    </tr>
    <tr>
    <td>Senza setup</td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>piano lot-for-lot</td>
    </tr>
    <tr>
    <td>Big-M, <span class="arithmatex">\(M_t=D_{t,m}\)</span></td>
    <td><span class="arithmatex">\(99.65\)</span></td>
    <td><span class="arithmatex">\(z(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{dem}})=\tfrac{9865}{99}\)</span></td>
    </tr>
    <tr>
    <td>Big-M, <span class="arithmatex">\(M_t=cap_t\)</span></td>
    <td><span class="arithmatex">\(137.5\)</span></td>
    <td><span class="arithmatex">\(z(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{cap}})\)</span></td>
    </tr>
    <tr>
    <td>Big-M forte</td>
    <td><span class="arithmatex">\(157.5\)</span></td>
    <td><span class="arithmatex">\(z(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{strong}})\)</span></td>
    </tr>
    <tr>
    <td>Cammino minimo</td>
    <td><span class="arithmatex">\(170\)</span></td>
    <td><span class="arithmatex">\(z(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{SP}})\)</span></td>
    </tr>
    <tr>
    <td>Valore ottimo</td>
    <td><span class="arithmatex">\(180\)</span></td>
    <td>piano <span class="arithmatex">\((3,0,4,4,0)\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di lot sizing](../../esercizi/lot-sizing-formulations.md)

