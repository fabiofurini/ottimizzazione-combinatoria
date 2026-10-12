---
title: "Esercizi · Formulazioni dei problemi di lot sizing"
---

# Esercizi · Formulazioni dei problemi di lot sizing

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 15** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 15: Problemi di lot sizing](../formulazioni/lot-sizing-formulations/index.md) · [:material-file-pdf-box: Eserciziario, volume 2 (PDF)](../pdf/esercizi-2-formulazioni.pdf)

</div>

!!! chiave ""

    <strong>Formulazioni usate in questi esercizi.</strong> I modelli del [Capitolo 15 «Formulazioni dei problemi di lot sizing»](../formulazioni/lot-sizing-formulations/index.md), sui periodi $T=\{1,\dots,m\}$, con $D_{t,k}=\sum_{s=t}^{k}d_s$. La formulazione big-M $\mathrm{ILP}_{\mathrm{CLSP}}$:

    \begin{align*}
    && \min ~~ \sum_{t\in T}\left(sc_t\,y_t+vc_t\,x_t+hc_t\,s_t\right) \tag{L0}\\
    && \text{soggetto a} \quad s_{t-1}+x_t &= d_t+s_t, & \forall t\in T, \tag{L1}\\
    && x_t &\le M_t\,y_t, & \forall t\in T, \tag{L2}\\
    && x_t &\le cap_t, & \forall t\in T, \tag{L3}\\
    && s_0=s_m &= 0, \tag{L4}\\
    && x_t &\in\Z_{\ge 0}, & \forall t\in T, \tag{L5}\\
    && s_t &\in\Z_{\ge 0}, & \forall t\in T, \tag{L6}\\
    && y_t &\in\{0,1\}, & \forall t\in T. \tag{L7}
    \end{align*}

    Valori di big-M in (L2): $M^{\mathrm{dem}}_t=D_{t,m}$, $M^{\mathrm{cap}}_t=cap_t$ e il valore forte $M_t=\min\{cap_t,D_{t,m}\}$. La formulazione a cammino minimo $\mathrm{MIP}^{\mathrm{SP}}_{\mathrm{CLSP}}$, dove $zv_{tk}$ è la frazione delle domande dei periodi $t,\dots,k$ prodotta nel periodo $t$:

    \begin{align*}
    && \min ~~ \sum_{t\in T} sc_t\,y_t+\sum_{t\in T}\sum_{k=t}^{m} cv_{tk}\,zv_{tk} \tag{S0}\\
    && \text{soggetto a} \quad \sum_{k=1}^{m} zv_{1k} &= 1, \tag{S1}\\
    && \sum_{u=1}^{t-1} zv_{u,t-1}-\sum_{k=t}^{m} zv_{tk} &= 0, & \forall t\in T\setminus\{1\}, \tag{S2}\\
    && \sum_{k=t}^{m} zv_{tk} &\le y_t, & \forall t\in T, \tag{S3}\\
    && \sum_{k=t}^{m} D_{t,k}\,zv_{tk} &\le cap_t, & \forall t\in T, \tag{S4}\\
    && zv_{tk} &\ge 0, & \forall t,k\in T,~k\ge t, \tag{S5}\\
    && y_t &\in\{0,1\}, & \forall t\in T, \tag{S6}
    \end{align*}

    con i costi

    \begin{equation*}
    cv_{tk}=vc_t\,D_{t,k}+\sum_{s=t+1}^{k}\sum_{u=t}^{s-1}hc_u\,d_s . \tag{S7}
    \end{equation*}

    I rilassamenti lineari rilassano i domini in $x_t,s_t\ge 0$ e $0\le y_t\le 1$: sono i modelli $\mathrm{LP}^{\mathrm{dem}}_{\mathrm{CLSP}}$, $\mathrm{LP}^{\mathrm{cap}}_{\mathrm{CLSP}}$ e $\mathrm{LP}^{\mathrm{strong}}_{\mathrm{CLSP}}$ di $\mathrm{ILP}_{\mathrm{CLSP}}$ con i tre valori di big-M, e il modello $\mathrm{LP}^{\mathrm{SP}}_{\mathrm{CLSP}}$ di $\mathrm{MIP}^{\mathrm{SP}}_{\mathrm{CLSP}}$.

    Il modello $\mathrm{ILP}_{\mathrm{ULS}}$ del problema di lot sizing senza capacità (ULS) è $\mathrm{ILP}_{\mathrm{CLSP}}$ senza i vincoli di capacità (L3) e con $M_t=D_{t,m}$ in (L2).

    Il modello $\mathrm{ILP}^{P}_{\mathrm{CLSP}}$ del problema di lot sizing con più prodotti $p\in P$ e tempi di setup (MLS), con $sd_{ptk}=\sum_{u=t}^{k}d_{pu}$:

    \begin{align*}
    && \min ~~ \sum_{p\in P}\sum_{t\in T}\left(sc_{pt}\,y_{pt}+vc_{pt}\,x_{pt}+hc_{pt}\,s_{pt}\right) \tag{P0}\\
    && \text{soggetto a} \quad s_{p,t-1}+x_{pt} &= d_{pt}+s_{pt}, & \forall p\in P,~\forall t\in T, \tag{P1}\\
    && \sum_{p\in P}\left(st_{pt}\,y_{pt}+vt_{pt}\,x_{pt}\right) &\le cap_t, & \forall t\in T, \tag{P2}\\
    && x_{pt} &\le M_{pt}\,y_{pt}, & \forall p\in P,~\forall t\in T, \tag{P3}\\
    && s_{p0}=s_{pm} &= 0, & \forall p\in P, \tag{P4}\\
    && x_{pt} &\in\Z_{\ge 0}, & \forall p\in P,~\forall t\in T, \tag{P5}\\
    && s_{pt} &\in\Z_{\ge 0}, & \forall p\in P,~\forall t\in T, \tag{P6}\\
    && y_{pt} &\in\{0,1\}, & \forall p\in P,~\forall t\in T, \tag{P7}
    \end{align*}

    con i valori forti di big-M $M_{pt}=\min\{\lfloor (cap_t-st_{pt})/vt_{pt}\rfloor,~sd_{ptm}\}$.

    Il modello $\mathrm{ILP}^{\mathrm{OT}}_{\mathrm{CLSP}}$ con straordinari (LS-OT) aggiunge $\sum_{t\in T}(cw_t\,\mu_t+co_t\,\nu_t)$ a (P0), sostituisce $cap_t$ con $\mu_t+\nu_t$ in (P2), usa $cap^{N}_t+cap^{O}_t$ al posto di $cap_t$ nei valori di big-M, e aggiunge:

    \begin{align*}
    && \mu_t &\le cap^{N}_t, & \forall t\in T, \tag{O1}\\
    && \nu_t &\le cap^{O}_t, & \forall t\in T, \tag{O2}\\
    && \mu_t &\in\Z_{\ge 0}, & \forall t\in T, \tag{O3}\\
    && \nu_t &\in\Z_{\ge 0}, & \forall t\in T. \tag{O4}
    \end{align*}

    Il modello $\mathrm{ILP}^{\mathrm{UD}}_{\mathrm{CLSP}}$ con domanda non soddisfatta (LS-UD) aggiunge $\sum_{p\in P}\sum_{t\in T}cu_{pt}\,\varepsilon_{pt}$ a (P0), sostituisce $d_{pt}$ con $d_{pt}-\varepsilon_{pt}$ in (P1), e aggiunge:

    \begin{align*}
    && \varepsilon_{pt} &\le d_{pt}, & \forall p\in P,~\forall t\in T, \tag{U1}\\
    && \varepsilon_{pt} &\in\Z_{\ge 0}, & \forall p\in P,~\forall t\in T. \tag{U2}
    \end{align*}

    Con un solo prodotto l'indice $p$ si omette.

<a id="esercizio-15-1"></a>

!!! esercizio "Esercizio 15.1: La formulazione big-M del lot sizing (1)"

    Consideriamo un'istanza di lot sizing capacitato con $m=4$ periodi, $s_0=s_4=0$ e i seguenti dati:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>periodo <span class="arithmatex">\(t\)</span></th>
    <th><span class="arithmatex">\(1\)</span></th>
    <th><span class="arithmatex">\(2\)</span></th>
    <th><span class="arithmatex">\(3\)</span></th>
    <th><span class="arithmatex">\(4\)</span></th>
    </tr>
    <tr>
    <td>domanda <span class="arithmatex">\(d_t\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td>capacità <span class="arithmatex">\(cap_t\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    </tr>
    <tr>
    <td>costo di setup <span class="arithmatex">\(sc_t\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    </tr>
    <tr>
    <td>costo di produzione <span class="arithmatex">\(vc_t\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    </tr>
    <tr>
    <td>costo di mantenimento <span class="arithmatex">\(hc_t\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    </tr>
    </table></div>

    **Domande**

    1. Calcolare per ogni periodo i valori di big-M $M^{\mathrm{dem}}_t$, $M^{\mathrm{cap}}_t$ e il valore forte $M_t$.

    2. Scrivere la formulazione big-M $\mathrm{ILP}_{\mathrm{CLSP}}$ con i valori forti $M_t$.

    3. Contare le variabili e i vincoli (oltre ai domini) della formulazione.

    4. Risolvere la formulazione con Gurobi e indicare il piano ottimo, le sue scorte, i suoi setup e il suo costo.

??? soluzione "Soluzione"

    Usiamo i valori di big-M e i costi (S7) del riquadro all'inizio del capitolo.

    1. Le domande dei periodi $t,\dots,m$ danno $D_{t,m}$, e il valore forte è il più piccolo dei due:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>periodo <span class="arithmatex">\(t\)</span></th>
        <th><span class="arithmatex">\(1\)</span></th>
        <th><span class="arithmatex">\(2\)</span></th>
        <th><span class="arithmatex">\(3\)</span></th>
        <th><span class="arithmatex">\(4\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(M^{\mathrm{dem}}_t=D_{t,4}\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(M^{\mathrm{cap}}_t=cap_t\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(M_t=\min\{cap_t,D_{t,m}\}\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        </table></div>

    2. Con i valori forti la formulazione è:

        $$
        \begin{array}{rlcl}
        {\min} & {40\,y_1+40\,y_2+40\,y_3+40\,y_4+5\,s_1+5\,s_2+5\,s_3} &  &  \\
        & {+5\,s_4} &  &  \\[1ex]
        \text{soggetto a} & {x_1-s_1} & {=} & {1} \\
        & {s_1+x_2-s_2} & {=} & {4} \\
        & {s_2+x_3-s_3} & {=} & {1} \\
        & {s_3+x_4-s_4} & {=} & {3} \\
        & {x_1-4\,y_1} & {\le} & {0} \\
        & {x_2-4\,y_2} & {\le} & {0} \\
        & {x_3-4\,y_3} & {\le} & {0} \\
        & {x_4-3\,y_4} & {\le} & {0} \\
        & {x_1} & {\le} & {4} \\
        & {x_2} & {\le} & {4} \\
        & {x_3} & {\le} & {4} \\
        & {x_4} & {\le} & {4} \\
        & {s_4} & {=} & {0} \\[1ex]
        & {x_1,~x_2,~x_3,~x_4} & {\in} & {\Z_{\ge 0}} \\
        & {s_1,~s_2,~s_3,~s_4} & {\in} & {\Z_{\ge 0}} \\
        & {y_1,~y_2,~y_3,~y_4} & {\in} & {\{0,1\}}
        \end{array}
        $$

    3. Ci sono $m=4$ variabili $x_t$, $4$ variabili $s_1,\dots,s_4$ e $4$ variabili $y_t$, quindi $12$ variabili ($s_0=0$ è una costante). Ci sono $4$ vincoli di bilanciamento, $4$ vincoli big-M, $4$ vincoli di capacità e il vincolo $s_4=0$, quindi $13$ vincoli lineari.

    4. Gurobi dà $z(\mathrm{ILP}_{\mathrm{CLSP}})=130$, con il piano $\tilde{\vet x}=(2,4,0,3)$, le scorte $(s_1,\dots,s_4)=(1,1,0,0)$ e i setup $\tilde{\vet y}=(1,1,0,1)$. Il costo è $3\cdot 40$ per i setup più $5\cdot(1+1)=10$ per il mantenimento a scorta, ossia $130$. Enumerando i piani, il piano ottimo risulta unico.

<a id="esercizio-15-2"></a>

!!! esercizio "Esercizio 15.2: Valori di big-M e bound LP per il lot sizing (1)"

    Consideriamo un'istanza di lot sizing capacitato con $m=4$ periodi, $s_0=s_4=0$ e i seguenti dati:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>periodo <span class="arithmatex">\(t\)</span></th>
    <th><span class="arithmatex">\(1\)</span></th>
    <th><span class="arithmatex">\(2\)</span></th>
    <th><span class="arithmatex">\(3\)</span></th>
    <th><span class="arithmatex">\(4\)</span></th>
    </tr>
    <tr>
    <td>domanda <span class="arithmatex">\(d_t\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td>capacità <span class="arithmatex">\(cap_t\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    </tr>
    <tr>
    <td>costo di setup <span class="arithmatex">\(sc_t\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    </tr>
    <tr>
    <td>costo di produzione <span class="arithmatex">\(vc_t\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    </tr>
    <tr>
    <td>costo di mantenimento <span class="arithmatex">\(hc_t\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    </tr>
    </table></div>

    **Domande**

    1. Calcolare il costo del piano migliore quando si ignorano i setup.

    2. Risolvere con Gurobi i rilassamenti lineari $\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{dem}}$, $\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{cap}}$ e $\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{strong}}$ della formulazione big-M e indicare i valori di $y_t$ nelle loro soluzioni ottime.

    3. Spiegare i valori di $y_t$ usando i vincoli big-M.

    4. Calcolare con Gurobi il valore ottimo e il gap $\frac{z-\LB}{\LB}$ di ogni bound.

??? soluzione "Soluzione"

    Usiamo i valori di big-M e i costi (S7) del riquadro all'inizio del capitolo.

    1. Senza i setup il piano migliore produce in ogni periodo la sua domanda, $\vet x=(1,4,1,3)$: non ci sono scorte e il costo di produzione è nullo, quindi il bound è $0$.

    2. Gurobi dà:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>rilassamento</th>
        <th>valore</th>
        <th><span class="arithmatex">\(\tilde{\vet y}\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{dem}}\)</span> (<span class="arithmatex">\(M_t=D_{t,m}\)</span>)</td>
        <td><span class="arithmatex">\(\frac{670}{9}\)</span></td>
        <td><span class="arithmatex">\((\frac{1}{9},\frac{1}{2},\frac{1}{4},1)\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{cap}}\)</span> (<span class="arithmatex">\(M_t=cap_t\)</span>)</td>
        <td><span class="arithmatex">\(90\)</span></td>
        <td><span class="arithmatex">\((\frac{1}{4},1,\frac{1}{4},\frac{3}{4})\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{strong}}\)</span> (<span class="arithmatex">\(M_t=\min\{cap_t,D_{t,m}\}\)</span>)</td>
        <td><span class="arithmatex">\(100\)</span></td>
        <td><span class="arithmatex">\((\frac{1}{4},1,\frac{1}{4},1)\)</span></td>
        </tr>
        </table></div>

    3. In tutte e tre le soluzioni il piano è il piano lot-for-lot $\vet x=(1,4,1,3)$, che non ha costi di mantenimento. Le variabili di setup assumono il valore più piccolo ammesso dai vincoli big-M, $y_t=\frac{x_t}{M_t}$: per esempio, nel periodo $1$ otteniamo $\frac{1}{9}$, $\frac{1}{4}$ e $\frac{1}{4}$. Più piccolo è $M_t$, più grande è $y_t$ e più alto è il bound.

    4. Gurobi dà $z(\mathrm{ILP}_{\mathrm{CLSP}})=130$. I gap sono:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>bound</th>
        <th>valore</th>
        <th>gap da <span class="arithmatex">\(130\)</span></th>
        </tr>
        <tr>
        <td>senza setup</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\text{non definito}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{dem}}\)</span></td>
        <td><span class="arithmatex">\(\frac{670}{9}\)</span></td>
        <td><span class="arithmatex">\(74.6\%\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{cap}}\)</span></td>
        <td><span class="arithmatex">\(90\)</span></td>
        <td><span class="arithmatex">\(44.4\%\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{strong}}\)</span></td>
        <td><span class="arithmatex">\(100\)</span></td>
        <td><span class="arithmatex">\(30.0\%\)</span></td>
        </tr>
        </table></div>

<a id="esercizio-15-3"></a>

!!! esercizio "Esercizio 15.3: Soluzioni ammissibili della formulazione di lot sizing (1)"

    Consideriamo un'istanza di lot sizing capacitato con $m=4$ periodi, $s_0=s_4=0$ e i seguenti dati:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>periodo <span class="arithmatex">\(t\)</span></th>
    <th><span class="arithmatex">\(1\)</span></th>
    <th><span class="arithmatex">\(2\)</span></th>
    <th><span class="arithmatex">\(3\)</span></th>
    <th><span class="arithmatex">\(4\)</span></th>
    </tr>
    <tr>
    <td>domanda <span class="arithmatex">\(d_t\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td>capacità <span class="arithmatex">\(cap_t\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    </tr>
    <tr>
    <td>costo di setup <span class="arithmatex">\(sc_t\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    </tr>
    <tr>
    <td>costo di produzione <span class="arithmatex">\(vc_t\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    </tr>
    <tr>
    <td>costo di mantenimento <span class="arithmatex">\(hc_t\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    </tr>
    </table></div>

    Usiamo la formulazione big-M con i valori forti $M_t=\min\{cap_t,D_{t,m}\}=(4,4,4,3)$. Consideriamo le seguenti candidate $(\vet x,\vet y)$, con le scorte date dai vincoli di bilanciamento:

    - **(a)** $\vet x=(2,4,0,3)$, $\vet y=(1,1,0,1)$;

    - **(b)** $\vet x=(1,4,1,3)$, $\vet y=(1,1,1,1)$;

    - **(c)** $\vet x=(5,0,1,3)$, $\vet y=(1,0,1,1)$;

    - **(d)** $\vet x=(2,4,0,3)$, $\vet y=(1,1,0,0)$;

    - **(e)** $\vet x=(2,4,0,2)$, $\vet y=(1,1,0,1)$;

    - **(f)** $\vet x=(1,4,1,3)$, $\vet y=(\frac{1}{4},1,\frac{1}{4},1)$;

    **Domande**

    1. Calcolare le scorte $s_1,\dots,s_4$ di ogni candidata e verificare i vincoli di bilanciamento con $s_0=s_4=0$.

    2. Verificare i vincoli big-M e i vincoli di capacità, e stabilire quali candidate sono ammissibili per $\mathrm{ILP}_{\mathrm{CLSP}}$ e quali per il suo rilassamento lineare.

    3. Calcolare il costo delle candidate ammissibili e confrontarlo con $z(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{strong}})$ calcolato con Gurobi.

??? soluzione "Soluzione"

    1. - **(a)** $(s_1,\dots,s_4)=(1,1,0,0)$: tutte le scorte sono non negative e $s_4=0$.

        - **(b)** $(s_1,\dots,s_4)=(0,0,0,0)$: tutte le scorte sono non negative e $s_4=0$.

        - **(c)** $(s_1,\dots,s_4)=(4,0,0,0)$: tutte le scorte sono non negative e $s_4=0$.

        - **(d)** $(s_1,\dots,s_4)=(1,1,0,0)$: tutte le scorte sono non negative e $s_4=0$.

        - **(e)** $(s_1,\dots,s_4)=(1,1,0,-1)$: $s_4<0$, la domanda non è soddisfatta.

        - **(f)** $(s_1,\dots,s_4)=(0,0,0,0)$: tutte le scorte sono non negative e $s_4=0$.

    2. - **(a)** Tutti i vincoli valgono: ammissibile per entrambi i modelli.

        - **(b)** Tutti i vincoli valgono: ammissibile per entrambi i modelli.

        - **(c)** $x_1=5>cap_1=4$: inammissibile.

        - **(d)** $x_4=3>M_4\,y_4=3\cdot0$: inammissibile.

        - **(e)** Inammissibile, a causa dei vincoli di bilanciamento.

        - **(f)** Tutti i vincoli valgono: ammissibile solo per il rilassamento lineare, poiché $y_1$ e $y_3$ sono frazionarie.

    3. La candidata (a) costa $3\cdot 40+5\cdot(1+1)=130$ e (b), il piano lot-for-lot con quattro setup, costa $4\cdot 40=160$. La candidata (f) costa $40\cdot\left(\frac{1}{4}+1+\frac{1}{4}+1\right)=100$. Gurobi dà $z(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{strong}})=100$: la candidata (f) è una soluzione ottima del rilassamento, e (a) è il piano ottimo dell'istanza.

<a id="esercizio-15-4"></a>

!!! esercizio "Esercizio 15.4: La formulazione a cammino minimo del lot sizing (1)"

    Consideriamo un'istanza di lot sizing capacitato con $m=4$ periodi, $s_0=s_4=0$ e i seguenti dati:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>periodo <span class="arithmatex">\(t\)</span></th>
    <th><span class="arithmatex">\(1\)</span></th>
    <th><span class="arithmatex">\(2\)</span></th>
    <th><span class="arithmatex">\(3\)</span></th>
    <th><span class="arithmatex">\(4\)</span></th>
    </tr>
    <tr>
    <td>domanda <span class="arithmatex">\(d_t\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td>capacità <span class="arithmatex">\(cap_t\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    </tr>
    <tr>
    <td>costo di setup <span class="arithmatex">\(sc_t\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    </tr>
    <tr>
    <td>costo di produzione <span class="arithmatex">\(vc_t\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    </tr>
    <tr>
    <td>costo di mantenimento <span class="arithmatex">\(hc_t\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    </tr>
    </table></div>

    **Domande**

    1. Calcolare le domande $D_{t,k}$ e i costi $cv_{tk}$ della formulazione a cammino minimo.

    2. Scrivere la formulazione a cammino minimo per questa istanza.

    3. Risolvere con Gurobi il suo rilassamento lineare $\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{SP}}$ e confrontare il bound con $z(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{strong}})$ della formulazione big-M.

    4. Il piano ottimo è $\tilde{\vet x}=(2,4,0,3)$. Scriverlo come combinazione di cammini della rete e verificarne le quantità e il costo.

??? soluzione "Soluzione"

    Usiamo i valori di big-M e i costi (S7) del riquadro all'inizio del capitolo.

    1. Il costo di produzione è nullo, quindi $cv_{tk}$ è solo costo di mantenimento a scorta:

        $$
        \begin{array}{l|cccc|cccc}
        \hline  & {D_{t,k}} & & & & {cv_{tk}} & & & \\
        {t\backslash k} & {1} & {2} & {3} & {4} & {1} & {2} & {3} & {4} \\
        \hline {1} & {1} & {5} & {6} & {9} & {0} & {20} & {30} & {75} \\
        {2} &  & {4} & {5} & {8} &  & {0} & {5} & {35} \\
        {3} &  &  & {1} & {4} &  &  & {0} & {15} \\
        {4} &  &  &  & {3} &  &  &  & {0} \\
        \hline
        \end{array}
        $$

    2. La variabile $zv_{tk}$ è l'arco dal nodo $t-1$ al nodo $k$, con costo $cv_{tk}$. La formulazione è:

        $$
        \begin{array}{rlcl}
        {\min} & {40\,y_1+40\,y_2+40\,y_3+40\,y_4+20\,zv_{12}+30\,zv_{13}+75\,zv_{14}} &  &  \\
        & {+5\,zv_{23}+35\,zv_{24}+15\,zv_{34}} &  &  \\[1ex]
        \text{soggetto a} & {zv_{11}+zv_{12}+zv_{13}+zv_{14}} & {=} & {1} \\
        & {zv_{11}-zv_{22}-zv_{23}-zv_{24}} & {=} & {0} \\
        & {zv_{12}+zv_{22}-zv_{33}-zv_{34}} & {=} & {0} \\
        & {zv_{13}+zv_{23}+zv_{33}-zv_{44}} & {=} & {0} \\
        & {zv_{11}+zv_{12}+zv_{13}+zv_{14}-y_1} & {\le} & {0} \\
        & {zv_{22}+zv_{23}+zv_{24}-y_2} & {\le} & {0} \\
        & {zv_{33}+zv_{34}-y_3} & {\le} & {0} \\
        & {zv_{44}-y_4} & {\le} & {0} \\
        & {zv_{11}+5\,zv_{12}+6\,zv_{13}+9\,zv_{14}} & {\le} & {4} \\
        & {4\,zv_{22}+5\,zv_{23}+8\,zv_{24}} & {\le} & {4} \\
        & {zv_{33}+4\,zv_{34}} & {\le} & {4} \\
        & {3\,zv_{44}} & {\le} & {4} \\[1ex]
        & {zv_{11},~zv_{12},~zv_{13},~\dots,~zv_{44}} & {\ge} & {0} \\
        & {y_1,~y_2,~y_3,~y_4} & {\in} & {\{0,1\}}
        \end{array}
        $$

    3. Gurobi dà $z(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{SP}})=112$, con $zv_{11}=\frac{2}{5}$, $zv_{13}=\frac{3}{5}$, $zv_{24}=\frac{2}{5}$, $zv_{44}=\frac{3}{5}$. Il bound è migliore di $z(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{strong}})=100$, e il valore ottimo è $130$.

    4. Con le quantità fissate a $\tilde{\vet x}$, Gurobi dà $zv_{11}=\frac{4}{5}$, $zv_{13}=\frac{1}{5}$, $zv_{23}=\frac{4}{5}$, $zv_{44}=1$, tutte le altre $0$. Questi archi si decompongono nei cammini

        - $0\to 1\to 3\to 4$ con peso $\frac{4}{5}$, che è il piano $(1,5,0,3)$;

        - $0\to 3\to 4$ con peso $\frac{1}{5}$, che è il piano $(6,0,0,3)$;

        La combinazione dà $x_1=\frac{4}{5}\cdot 1+\frac{1}{5}\cdot 6=2$, $x_2=\frac{4}{5}\cdot 5=4$, $x_4=\frac{4}{5}\cdot 3+\frac{1}{5}\cdot 3=3$. I singoli cammini possono superare la capacità: solo le quantità combinate devono rispettarla. Il costo è $3\cdot 40+0\cdot\frac{4}{5}+30\cdot\frac{1}{5}+5\cdot\frac{4}{5}+0\cdot1=130$.

<a id="esercizio-15-5"></a>

!!! esercizio "Esercizio 15.5: Confronto fra le formulazioni di lot sizing (1)"

    Consideriamo un'istanza di lot sizing capacitato con $m=5$ periodi, $s_0=s_5=0$ e i seguenti dati:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>periodo <span class="arithmatex">\(t\)</span></th>
    <th><span class="arithmatex">\(1\)</span></th>
    <th><span class="arithmatex">\(2\)</span></th>
    <th><span class="arithmatex">\(3\)</span></th>
    <th><span class="arithmatex">\(4\)</span></th>
    <th><span class="arithmatex">\(5\)</span></th>
    </tr>
    <tr>
    <td>domanda <span class="arithmatex">\(d_t\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td>capacità <span class="arithmatex">\(cap_t\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    </tr>
    <tr>
    <td>costo di setup <span class="arithmatex">\(sc_t\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    </tr>
    <tr>
    <td>costo di produzione <span class="arithmatex">\(vc_t\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    </tr>
    <tr>
    <td>costo di mantenimento <span class="arithmatex">\(hc_t\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    </tr>
    </table></div>

    **Domande**

    1. Calcolare i tre valori di big-M di ogni periodo.

    2. Calcolare con Gurobi il bound senza setup, i tre bound LP della formulazione big-M e il bound LP della formulazione a cammino minimo.

    3. Calcolare con Gurobi il valore ottimo, usando entrambe le formulazioni con setup interi, e il gap $\frac{z-\LB}{\LB}$ di ogni bound.

    4. Confrontare il numero di variabili delle due formulazioni e commentare il prezzo del bound più forte.

??? soluzione "Soluzione"

    Usiamo i valori di big-M e i costi (S7) del riquadro all'inizio del capitolo.

    1. &#8203;

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>periodo <span class="arithmatex">\(t\)</span></th>
        <th><span class="arithmatex">\(1\)</span></th>
        <th><span class="arithmatex">\(2\)</span></th>
        <th><span class="arithmatex">\(3\)</span></th>
        <th><span class="arithmatex">\(4\)</span></th>
        <th><span class="arithmatex">\(5\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(M^{\mathrm{dem}}_t=D_{t,5}\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(M^{\mathrm{cap}}_t=cap_t\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(M_t=\min\{cap_t,D_{t,m}\}\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        </table></div>

    2. Gurobi dà:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>bound</th>
        <th>valore</th>
        </tr>
        <tr>
        <td>senza setup</td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{dem}}\)</span></td>
        <td><span class="arithmatex">\(84\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{cap}}\)</span></td>
        <td><span class="arithmatex">\(120\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{strong}}\)</span></td>
        <td><span class="arithmatex">\(130\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{SP}}\)</span></td>
        <td><span class="arithmatex">\(160\)</span></td>
        </tr>
        </table></div>

        Ogni bound migliora il precedente.

    3. Entrambe le formulazioni danno $z(\mathrm{ILP}_{\mathrm{CLSP}})=170$, con l'unico piano ottimo $\tilde{\vet x}=(3,0,3,3,3)$. I gap sono:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>bound</th>
        <th>valore</th>
        <th>gap da <span class="arithmatex">\(170\)</span></th>
        </tr>
        <tr>
        <td>senza setup</td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(\text{non definito}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{dem}}\)</span></td>
        <td><span class="arithmatex">\(84\)</span></td>
        <td><span class="arithmatex">\(102.4\%\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{cap}}\)</span></td>
        <td><span class="arithmatex">\(120\)</span></td>
        <td><span class="arithmatex">\(41.7\%\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{strong}}\)</span></td>
        <td><span class="arithmatex">\(130\)</span></td>
        <td><span class="arithmatex">\(30.8\%\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{CLSP}}^{\mathrm{SP}}\)</span></td>
        <td><span class="arithmatex">\(160\)</span></td>
        <td><span class="arithmatex">\(6.2\%\)</span></td>
        </tr>
        </table></div>

    4. La formulazione big-M ha $16$ variabili ($x_t$, $s_t$ e $y_t$); la formulazione a cammino minimo ha $\frac{m(m+1)}{2}+m=20$ variabili ($zv_{tk}$ e $y_t$). Il numero di variabili $zv_{tk}$ cresce come $m^2$: il bound più forte si paga con un modello più grande.

<a id="esercizio-15-6"></a>

!!! esercizio "Esercizio 15.6: Modello PLI del problema di lot sizing senza capacità"

    Consideriamo un'istanza di lot sizing senza capacità (ULS) con $m=4$ periodi, $s_0=s_4=0$ e i seguenti dati:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>periodo <span class="arithmatex">\(t\)</span></th>
    <th><span class="arithmatex">\(1\)</span></th>
    <th><span class="arithmatex">\(2\)</span></th>
    <th><span class="arithmatex">\(3\)</span></th>
    <th><span class="arithmatex">\(4\)</span></th>
    </tr>
    <tr>
    <td>domanda <span class="arithmatex">\(d_t\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td>costo di setup <span class="arithmatex">\(sc_t\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    </tr>
    <tr>
    <td>costo di produzione <span class="arithmatex">\(vc_t\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    </tr>
    <tr>
    <td>costo di mantenimento <span class="arithmatex">\(hc_t\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    </tr>
    </table></div>

    **Domande**

    1. Calcolare i valori di big-M $D_{t,m}$ e scrivere il modello $\mathrm{ILP}_{\mathrm{ULS}}$ per questa istanza.

    2. Contare le variabili e i vincoli (oltre ai domini) del modello.

    3. Risolvere il modello con Gurobi e indicare il piano ottimo, le sue scorte e il suo costo.

    4. Aggiungere la capacità $cap_t=4$ in ogni periodo: Gurobi dà il valore ottimo $130$. Spiegare perché è maggiore.

??? soluzione "Soluzione"

    1. I valori di big-M sono $D_{t,4}=(9,8,4,3)$. Il modello $\mathrm{ILP}_{\mathrm{ULS}}$ è:

        $$
        \begin{array}{rlcl}
        {\min} & {40\,y_1+40\,y_2+40\,y_3+40\,y_4+5\,s_1+5\,s_2} &  &  \\
        & {+5\,s_3+5\,s_4} &  &  \\[1ex]
        \text{soggetto a} & {x_1-s_1} & {=} & {1} \\
        & {s_1+x_2-s_2} & {=} & {4} \\
        & {s_2+x_3-s_3} & {=} & {1} \\
        & {s_3+x_4-s_4} & {=} & {3} \\
        & {x_1-9\,y_1} & {\le} & {0} \\
        & {x_2-8\,y_2} & {\le} & {0} \\
        & {x_3-4\,y_3} & {\le} & {0} \\
        & {x_4-3\,y_4} & {\le} & {0} \\
        & {s_4} & {=} & {0} \\[1ex]
        & {x_1,~x_2,~x_3,~x_4} & {\in} & {\Z_{\ge 0}} \\
        & {s_1,~s_2,~s_3,~s_4} & {\in} & {\Z_{\ge 0}} \\
        & {y_1,~y_2,~y_3,~y_4} & {\in} & {\{0,1\}}
        \end{array}
        $$

    2. Ci sono $3m=12$ variabili $x_t$, $s_t$, $y_t$ ($s_0=0$ è una costante), $4$ vincoli di bilanciamento, $4$ vincoli big-M e il vincolo $s_4=0$: $9$ vincoli lineari.

    3. Gurobi dà $z(\mathrm{ILP}_{\mathrm{ULS}})=110$ con il piano $\tilde{\vet x}=(6,0,0,3)$, le scorte $(5,1,0,0)$ e i setup nei periodi $1$ e $4$: il costo è $2\cdot 40+5\cdot(5+1)=110$. Enumerando i piani, il piano ottimo risulta unico.

    4. Il piano $(6,0,0,3)$ produce $6>4$ unità nel periodo $1$, quindi non è ammissibile con le capacità. Il problema capacitato ha meno piani ammissibili, quindi un valore ottimo maggiore: l'ULS è un rilassamento del CLS.

<a id="esercizio-15-7"></a>

!!! esercizio "Esercizio 15.7: Modello PLI del lot sizing con più prodotti e tempi di setup"

    Consideriamo un problema di lot sizing con $|P|=2$ prodotti, $m=3$ periodi, la capacità $cap_t=10$ in ogni periodo, $vc_{pt}=0$, $s_{p0}=s_{p3}=0$ e i seguenti dati:

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
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(vt_{pt}\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(st_{pt}\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(sc_{pt}\)</span></td>
    <td><span class="arithmatex">\(20\)</span></td>
    <td><span class="arithmatex">\(20\)</span></td>
    <td><span class="arithmatex">\(20\)</span></td>
    <td><span class="arithmatex">\(30\)</span></td>
    <td><span class="arithmatex">\(30\)</span></td>
    <td><span class="arithmatex">\(30\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(hc_{pt}\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    </table></div>

    **Domande**

    1. Calcolare i valori forti di big-M $M_{pt}$.

    2. Scrivere il modello $\mathrm{ILP}_{\mathrm{CLSP}}^{P}$ con i valori forti di big-M per questa istanza.

    3. Risolvere il modello con Gurobi: indicare il piano ottimo di ogni prodotto, il suo costo e il tempo usato in ogni periodo.

??? soluzione "Soluzione"

    1. Con $M_{pt}=\min\{\lfloor (cap_t-st_{pt})/vt_{pt}\rfloor,~sd_{ptm}\}$: per il prodotto $1$, $\lfloor 9/1\rfloor=9$ e $sd_{1t3}=(6,4,1)$, quindi $M_{1t}=(6,4,1)$; per il prodotto $2$, $\lfloor 9/2\rfloor=4$ e $sd_{2t3}=(7,4,3)$, quindi $M_{2t}=(4,4,3)$.

    2. Il modello $\mathrm{ILP}_{\mathrm{CLSP}}^{P}$ è:

        $$
        \begin{array}{rlcl}
        {\min} & {20\,y_{11}+20\,y_{12}+20\,y_{13}+30\,y_{21}+30\,y_{22}+30\,y_{23}} &  &  \\
        & {+4\,s_{11}+4\,s_{12}+4\,s_{13}+3\,s_{21}+3\,s_{22}+3\,s_{23}} &  &  \\[1ex]
        \text{soggetto a} & {x_{11}-s_{11}} & {=} & {2} \\
        & {s_{11}+x_{12}-s_{12}} & {=} & {3} \\
        & {s_{12}+x_{13}-s_{13}} & {=} & {1} \\
        & {x_{21}-s_{21}} & {=} & {3} \\
        & {s_{21}+x_{22}-s_{22}} & {=} & {1} \\
        & {s_{22}+x_{23}-s_{23}} & {=} & {3} \\
        & {x_{11}+2\,x_{21}+y_{11}+y_{21}} & {\le} & {10} \\
        & {x_{12}+2\,x_{22}+y_{12}+y_{22}} & {\le} & {10} \\
        & {x_{13}+2\,x_{23}+y_{13}+y_{23}} & {\le} & {10} \\
        & {x_{11}-6\,y_{11}} & {\le} & {0} \\
        & {x_{12}-4\,y_{12}} & {\le} & {0} \\
        & {x_{13}-y_{13}} & {\le} & {0} \\
        & {x_{21}-4\,y_{21}} & {\le} & {0} \\
        & {x_{22}-4\,y_{22}} & {\le} & {0} \\
        & {x_{23}-3\,y_{23}} & {\le} & {0} \\
        & {s_{13}} & {=} & {0} \\
        & {s_{23}} & {=} & {0} \\[1ex]
        & {x_{11},~x_{12},~x_{13},~x_{21},~x_{22},~x_{23}} & {\in} & {\Z_{\ge 0}} \\
        & {s_{11},~s_{12},~s_{13},~s_{21},~s_{22},~s_{23}} & {\in} & {\Z_{\ge 0}} \\
        & {y_{11},~y_{12},~y_{13},~y_{21},~y_{22},~y_{23}} & {\in} & {\{0,1\}}
        \end{array}
        $$

    3. Gurobi dà $z(\mathrm{ILP}_{\mathrm{CLSP}}^{P})=134$, e la soluzione ottima è unica. Il prodotto $1$ segue il piano $(2,4,0)$ con le scorte $(0,1,0)$, il prodotto $2$ il piano $(3,1,3)$ con le scorte $(0,0,0)$. I tempi usati nei periodi, setup compresi, sono $(10,8,7)$, tutti al più $10$: nel periodo $1$ la capacità è satura, quindi il prodotto $2$ richiede un setup in ogni periodo.

<a id="esercizio-15-8"></a>

!!! esercizio "Esercizio 15.8: Modello PLI del lot sizing con straordinari"

    Consideriamo un problema di lot sizing con straordinari, un solo prodotto, $m=5$ periodi, $s_0=s_5=0$, tempo di produzione $vt_t=1$, tempo di setup $st_t=0$, $vc_t=0$ e i dati

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>periodo <span class="arithmatex">\(t\)</span></th>
    <th><span class="arithmatex">\(1\)</span></th>
    <th><span class="arithmatex">\(2\)</span></th>
    <th><span class="arithmatex">\(3\)</span></th>
    <th><span class="arithmatex">\(4\)</span></th>
    <th><span class="arithmatex">\(5\)</span></th>
    </tr>
    <tr>
    <td>domanda <span class="arithmatex">\(d_t\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td>costo di setup <span class="arithmatex">\(sc_t\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    </tr>
    <tr>
    <td>costo di mantenimento <span class="arithmatex">\(hc_t\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    </tr>
    </table></div>

    In ogni periodo l'orario normale è $cap^{N}_t=2$, al costo $cw_t=1$ per unità, e lo straordinario è $cap^{O}_t=2$, al costo $co_t=5$ per unità.

    **Domande**

    1. Mostrare che l'istanza non ha piani ammissibili senza straordinari.

    2. Calcolare i valori forti di big-M e scrivere il modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{OT}}$ per questa istanza.

    3. Risolvere il modello con Gurobi: indicare il piano ottimo, i tempi di lavoro e il costo.

??? soluzione "Soluzione"

    1. La domanda totale è $12$, mentre l'orario normale dei $5$ periodi dà al più $5\cdot 2=10$ unità: serve qualche straordinario.

    2. Con $M_t=\min\{cap^{N}_t+cap^{O}_t,~D_{t,5}\}$ e $D_{t,5}=(12,10,9,6,3)$ otteniamo $M_t=(4,4,4,4,3)$. Il modello è:

        $$
        \begin{array}{rlcl}
        {\min} & {40\,y_1+40\,y_2+40\,y_3+40\,y_4+40\,y_5+10\,s_1} &  &  \\
        & {+10\,s_2+10\,s_3+10\,s_4+10\,s_5+\mu_1+\mu_2} &  &  \\
        & {+\mu_3+\mu_4+\mu_5+5\,\nu_1+5\,\nu_2+5\,\nu_3} &  &  \\
        & {+5\,\nu_4+5\,\nu_5} &  &  \\[1ex]
        \text{soggetto a} & {x_1-s_1} & {=} & {2} \\
        & {s_1+x_2-s_2} & {=} & {1} \\
        & {s_2+x_3-s_3} & {=} & {3} \\
        & {s_3+x_4-s_4} & {=} & {3} \\
        & {s_4+x_5-s_5} & {=} & {3} \\
        & {x_1-\mu_1-\nu_1} & {\le} & {0} \\
        & {x_2-\mu_2-\nu_2} & {\le} & {0} \\
        & {x_3-\mu_3-\nu_3} & {\le} & {0} \\
        & {x_4-\mu_4-\nu_4} & {\le} & {0} \\
        & {x_5-\mu_5-\nu_5} & {\le} & {0} \\
        & {x_1-4\,y_1} & {\le} & {0} \\
        & {x_2-4\,y_2} & {\le} & {0} \\
        & {x_3-4\,y_3} & {\le} & {0} \\
        & {x_4-4\,y_4} & {\le} & {0} \\
        & {x_5-3\,y_5} & {\le} & {0} \\
        & {\mu_1} & {\le} & {2} \\
        & {\mu_2} & {\le} & {2} \\
        & {\mu_3} & {\le} & {2} \\
        & {\mu_4} & {\le} & {2} \\
        & {\mu_5} & {\le} & {2} \\
        & {\nu_1} & {\le} & {2} \\
        & {\nu_2} & {\le} & {2} \\
        & {\nu_3} & {\le} & {2} \\
        & {\nu_4} & {\le} & {2} \\
        & {\nu_5} & {\le} & {2} \\
        & {s_5} & {=} & {0} \\[1ex]
        & {x_1,~x_2,~x_3,~x_4,~x_5} & {\in} & {\Z_{\ge 0}} \\
        & {s_1,~s_2,~s_3,~s_4,~s_5} & {\in} & {\Z_{\ge 0}} \\
        & {\mu_1,~\mu_2,~\mu_3,~\dots,~\nu_5} & {\in} & {\Z_{\ge 0}} \\
        & {y_1,~y_2,~y_3,~y_4,~y_5} & {\in} & {\{0,1\}}
        \end{array}
        $$

    3. Gurobi dà $z(\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{OT}})=198$, e la soluzione ottima è unica: il piano $\tilde{\vet x}=(3,0,3,3,3)$, le scorte $(1,0,0,0,0)$, l'orario normale $(2,0,2,2,2)$ e lo straordinario $(1,0,1,1,1)$. Il costo è $4\cdot 40$ per i setup, $10\cdot 1$ per il mantenimento a scorta, $1\cdot 8$ per l'orario normale e $5\cdot 4$ per lo straordinario: $198$.

<a id="esercizio-15-9"></a>

!!! esercizio "Esercizio 15.9: Modello PLI del lot sizing con domanda non soddisfatta"

    Consideriamo un'istanza di lot sizing capacitato con $m=4$ periodi, $s_0=s_4=0$ e i seguenti dati:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>periodo <span class="arithmatex">\(t\)</span></th>
    <th><span class="arithmatex">\(1\)</span></th>
    <th><span class="arithmatex">\(2\)</span></th>
    <th><span class="arithmatex">\(3\)</span></th>
    <th><span class="arithmatex">\(4\)</span></th>
    </tr>
    <tr>
    <td>domanda <span class="arithmatex">\(d_t\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td>capacità <span class="arithmatex">\(cap_t\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    </tr>
    <tr>
    <td>costo di setup <span class="arithmatex">\(sc_t\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    <td><span class="arithmatex">\(40\)</span></td>
    </tr>
    <tr>
    <td>costo di produzione <span class="arithmatex">\(vc_t\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    </tr>
    <tr>
    <td>costo di mantenimento <span class="arithmatex">\(hc_t\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    </tr>
    </table></div>

    Un'unità di domanda può restare non soddisfatta, con la penalità $cu_t=18$ per unità.

    **Domande**

    1. Scrivere il modello $\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{UD}}$ con i valori forti di big-M per questa istanza.

    2. Risolvere il modello con Gurobi: indicare il piano ottimo, la domanda non soddisfatta e il costo.

    3. Senza domanda non soddisfatta il valore ottimo è $130$ (Gurobi). Spiegare il risparmio.

??? soluzione "Soluzione"

    1. I valori forti di big-M sono $M_t=\min\{cap_t,D_{t,4}\}=(4,4,4,3)$. Il modello è:

        $$
        \begin{array}{rlcl}
        {\min} & {40\,y_1+40\,y_2+40\,y_3+40\,y_4+5\,s_1+5\,s_2} &  &  \\
        & {+5\,s_3+5\,s_4+18\,\varepsilon_1+18\,\varepsilon_2+18\,\varepsilon_3+18\,\varepsilon_4} &  &  \\[1ex]
        \text{soggetto a} & {x_1-s_1+\varepsilon_1} & {=} & {1} \\
        & {s_1+x_2-s_2+\varepsilon_2} & {=} & {4} \\
        & {s_2+x_3-s_3+\varepsilon_3} & {=} & {1} \\
        & {s_3+x_4-s_4+\varepsilon_4} & {=} & {3} \\
        & {x_1} & {\le} & {4} \\
        & {x_2} & {\le} & {4} \\
        & {x_3} & {\le} & {4} \\
        & {x_4} & {\le} & {4} \\
        & {x_1-4\,y_1} & {\le} & {0} \\
        & {x_2-4\,y_2} & {\le} & {0} \\
        & {x_3-4\,y_3} & {\le} & {0} \\
        & {x_4-3\,y_4} & {\le} & {0} \\
        & {\varepsilon_1} & {\le} & {1} \\
        & {\varepsilon_2} & {\le} & {4} \\
        & {\varepsilon_3} & {\le} & {1} \\
        & {\varepsilon_4} & {\le} & {3} \\
        & {s_4} & {=} & {0} \\[1ex]
        & {x_1,~x_2,~x_3,~x_4} & {\in} & {\Z_{\ge 0}} \\
        & {s_1,~s_2,~s_3,~s_4} & {\in} & {\Z_{\ge 0}} \\
        & {\varepsilon_1,~\varepsilon_2,~\varepsilon_3,~\varepsilon_4} & {\in} & {\Z_{\ge 0}} \\
        & {y_1,~y_2,~y_3,~y_4} & {\in} & {\{0,1\}}
        \end{array}
        $$

    2. Gurobi dà $z(\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{UD}})=113$, e la soluzione ottima è unica: il piano $\tilde{\vet x}=(0,4,4,0)$, le scorte $(0,0,3,0)$ e la domanda non soddisfatta $\tilde{\vet\varepsilon}=(1,0,0,0)$. Il costo è $2\cdot 40+5\cdot 3+18\cdot 1=113$.

    3. Lasciare non soddisfatta la domanda $d_1=1$ elimina il setup del periodo $1$: la penalità $18$ è minore di quanto costa il primo periodo nel piano ottimo del CLS, e il valore scende da $130$ a $113$.
