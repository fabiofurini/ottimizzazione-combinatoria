---
title: "Varianti pesate"
---

# 12.8 Modelli PLI per le varianti pesate { #sez-sec-mcpf-weighted }

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 12** · [:material-book-open-variant: Capitolo 12: Problemi di clique](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-clique-formulations.pdf) · [:material-pencil: Esercizi: Problemi di clique](../../esercizi/clique-formulations.md)

</div>

I problemi di questa sezione sono i problemi della clique massima pesata sui vertici (VWMCP) e pesata sugli spigoli (EWMCP), definiti nel [Capitolo 5 «Problemi di clique», Sezione 5.5](../../problemi-di-ottimizzazione-combinatoria/clique/varianti-pesate.md), con le loro istanze di riferimento.

## 12.8.1 Il problema della clique massima pesata sui vertici

- Dato un grafo semplice $G=(V,E)$ e un vettore dei pesi dei vertici $\vet w\in\Z_{\ge 1}^n$, usiamo le $n$ <strong>variabili binarie</strong> $\eqref{mcpF:var}$ della formulazione sugli spigoli:

    $$
    x_v=\begin{cases}1&\text{se il vertice $v$ è selezionato nella clique}\\[1.5ex]0&\text{altrimenti}\end{cases}
    \qquad\forall v\in V.
    $$

!!! chiave ""

    Con queste variabili, un modello di programmazione lineare intera (PLI) per il problema della clique massima pesata sui vertici (VWMCP) è il seguente:

    <a id="eq-mcpF-VW"></a>

    \begin{align*}
    && \max \;\; \sum_{v\in V}w_v\,x_v \label{mcpF:obj-vw} \tag{12.16a}\\[1ex]
    && \text{soggetto a} \quad x_u+x_v &\le 1, & \forall\{u,v\}\in\overline{E}, \label{mcpF:nonedge-vw} \tag{12.16b}\\[1ex]
    && x_v &\in\{0,1\}, & \forall v\in V. \label{mcpF:bin-vw} \tag{12.16c}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}^{\mathrm{VW}}_{\mathrm{MCP}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}^{\mathrm{VW}}_{\mathrm{MCP}}$:

    - la funzione obiettivo lineare $\eqref{mcpF:obj-vw}$ massimizza il peso totale $w(K)$ della clique selezionata;

    - i vincoli $\eqref{mcpF:nonedge-vw}$ garantiscono che due vertici non adiacenti non siano selezionati entrambi ($|\overline{E}|=\binom{n}{2}-m$ vincoli lineari);

    - infine, i vincoli $\eqref{mcpF:bin-vw}$ definiscono le variabili del modello PLI.

- Cambia solo la funzione obiettivo: le soluzioni ammissibili sono le clique di $G$, come nel modello $\mathrm{ILP}_{\mathrm{MCP}}$, e con $w_v=1$ per ogni vertice i due modelli coincidono. Anche qui sono valide le disuguaglianze di clique di $\overline{G}$.

<a id="box-16-mcpF-ex-vw"></a>

!!! esempio "Esempio 12.13: Modello $\mathrm{ILP}^{\mathrm{VW}}_{\mathrm{MCP}}$"

    Consideriamo il grafo $G$ con $8$ vertici su una circonferenza, in cui ogni vertice è adiacente a tutti gli altri tranne quello opposto: $G$ ha $24$ spigoli, e $\overline{G}$ ha i $4$ spigoli $\{1,5\},\{2,6\},\{3,7\},\{4,8\}$. I pesi dei vertici sono:

    $$
    \begin{array}{l|cccccccc}
    \hline  & {v=1} & {v=2} & {v=3} & {v=4} & {v=5} & {v=6} & {v=7} & {v=8} \\
    \hline {w_v} & {5} & {8} & {9} & {5} & {6} & {5} & {5} & {9} \\
    \hline
    \end{array}
    $$

    È l'istanza del VWMCP del Capitolo 5 [«Problemi di clique»](../../problemi-di-ottimizzazione-combinatoria/clique/index.md). Il modello $\mathrm{ILP}^{\mathrm{VW}}_{\mathrm{MCP}}$ ha $8$ variabili binarie e un vincolo per ciascuno dei $4$ spigoli di $\overline{G}$:

    $$
    \begin{array}{rrrrrrrrrcl}
    {\max} & {5\,x_1} & {+\,8\,x_2} & {+\,9\,x_3} & {+\,5\,x_4} & {+\,6\,x_5} & {+\,5\,x_6} & {+\,5\,x_7} & {+\,9\,x_8} \\[1ex]
    \text{soggetto a} & {x_1} &  &  &  & {+\,x_5} &  &  &  & {\le} & {1} \\
    &  & {x_2} &  &  &  & {+\,x_6} &  &  & {\le} & {1} \\
    &  &  & {x_3} &  &  &  & {+\,x_7} &  & {\le} & {1} \\
    &  &  &  & {x_4} &  &  &  & {+\,x_8} & {\le} & {1} \\[1ex]
    & {x_1}, & {x_2}, & {x_3}, & {x_4}, & {x_5}, & {x_6}, & {x_7}, & {x_8} & {\in} & {\{0,1\}}
    \end{array}
    $$

    Una soluzione ottima $\tilde{\vet x}(\mathrm{ILP}^{\mathrm{VW}}_{\mathrm{MCP}})$ è:

    $$
    \tilde x_2=\tilde x_3=\tilde x_5=\tilde x_8=1,~~\tilde x_1=\tilde x_4=\tilde x_6=\tilde x_7=0
    $$

    Il valore ottimo $z(\mathrm{ILP}^{\mathrm{VW}}_{\mathrm{MCP}})$ è $8+9+6+9=32$, come indicato nel Capitolo 5 [«Problemi di clique»](../../problemi-di-ottimizzazione-combinatoria/clique/index.md). La soluzione ottima associata è la clique $\tilde K=\{2,3,5,8\}$, ed è l'unica soluzione ottima: ogni vincolo tiene il vertice più pesante della sua coppia.

## 12.8.2 Il problema della clique massima pesata sugli spigoli

- Dato un grafo semplice $G=(V,E)$ e un vettore dei pesi degli spigoli $\vet r\in\Z_{\ge 1}^m$, il peso di uno spigolo si raccoglie solo se entrambi i suoi estremi sono selezionati: il prodotto $x_u\,x_v$ non è lineare. Introduciamo le $n$ <strong>variabili binarie</strong> $\eqref{mcpF:var}$ e le seguenti $m$ <strong>variabili binarie</strong>:

    \begin{equation*}
    \label{mcpF:var-ew}
    y_{uv}=\begin{cases}1&\text{se gli estremi di $\{u,v\}$ sono entrambi nella clique}\\[1.5ex]0&\text{altrimenti}\end{cases}
    \qquad\forall\{u,v\}\in E. \tag{12.17}
    \end{equation*}

!!! chiave ""

    Con queste variabili, un modello di programmazione lineare intera (PLI) per il problema della clique massima pesata sugli spigoli (EWMCP) è il seguente:

    <a id="eq-mcpF-EW"></a>

    \begin{align*}
    && \max \;\; \sum_{\{u,v\}\in E}r_{uv}\,y_{uv} \label{mcpF:obj-ew} \tag{12.18a}\\[1ex]
    && \text{soggetto a} \quad y_{uv} &\le x_u, & \forall\{u,v\}\in E, \label{mcpF:yu-ew} \tag{12.18b}\\[1ex]
    && y_{uv} &\le x_v, & \forall\{u,v\}\in E, \label{mcpF:yv-ew} \tag{12.18c}\\[1ex]
    && x_u+x_v &\le 1, & \forall\{u,v\}\in\overline{E}, \label{mcpF:nonedge-ew} \tag{12.18d}\\[1ex]
    && x_v &\in\{0,1\}, & \forall v\in V, \label{mcpF:binx-ew} \tag{12.18e}\\[1ex]
    && y_{uv} &\in\{0,1\}, & \forall\{u,v\}\in E. \label{mcpF:biny-ew} \tag{12.18f}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}^{\mathrm{EW}}_{\mathrm{MCP}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}^{\mathrm{EW}}_{\mathrm{MCP}}$:

    - la funzione obiettivo lineare $\eqref{mcpF:obj-ew}$ massimizza il peso totale $r(K)$ degli spigoli con entrambi gli estremi nella clique selezionata;

    - i vincoli $\eqref{mcpF:yu-ew}$ e $\eqref{mcpF:yv-ew}$ permettono $y_{uv}=1$ solo se entrambi gli estremi sono selezionati ($2m$ vincoli lineari);

    - i vincoli $\eqref{mcpF:nonedge-ew}$ garantiscono che i vertici selezionati formino una clique ($\binom{n}{2}-m$ vincoli lineari);

    - infine, i vincoli $\eqref{mcpF:binx-ew}$ e $\eqref{mcpF:biny-ew}$ definiscono le variabili del modello PLI.

- I vincoli $\eqref{mcpF:yu-ew}$ e $\eqref{mcpF:yv-ew}$ modellano l'implicazione $y_{uv}=1 \Rightarrow x_u=x_v=1$. L'implicazione inversa $x_u=x_v=1 \Rightarrow y_{uv}=1$, cioè $y_{uv}\ge x_u+x_v-1$, non serve: poiché $r_{uv}>0$, in ogni soluzione ottima $y_{uv}$ prende il valore massimo consentito, $\min\{x_u,x_v\}$.

<a id="box-17-mcpF-ex-ew"></a>

!!! esempio "Esempio 12.14: Modello $\mathrm{ILP}^{\mathrm{EW}}_{\mathrm{MCP}}$"

    Consideriamo il grafo $G$ dell'<span style="color:#1971c2">[Esempio 12.13](#box-16-mcpF-ex-vw)</span>, con i pesi degli spigoli dell'istanza dell'EWMCP del Capitolo 5 [«Problemi di clique»](../../problemi-di-ottimizzazione-combinatoria/clique/index.md); sono i coefficienti della funzione obiettivo qui sotto. Il modello $\mathrm{ILP}^{\mathrm{EW}}_{\mathrm{MCP}}$ ha $8+24=32$ variabili binarie, $48$ vincoli $y_{uv}\le x_u$, $y_{uv}\le x_v$ e $4$ vincoli sui non-spigoli:

    $$
    \begin{array}{rllll}
    {\max} & {y_{12}+4\,y_{13}+5\,y_{14}+4\,y_{16}+3\,y_{17}+3\,y_{18}} & & & \\
    & {+2\,y_{23}+5\,y_{24}+6\,y_{25}+9\,y_{27}+4\,y_{28}+3\,y_{34}} & & & \\
    & {+6\,y_{35}+y_{36}+6\,y_{38}+4\,y_{45}+7\,y_{46}+2\,y_{47}} & & & \\
    & {+5\,y_{56}+7\,y_{57}+3\,y_{58}+y_{67}+2\,y_{68}+8\,y_{78}} & & & \\[1ex]
    \text{soggetto a} & {y_{12}\le x_1} & {y_{12}\le x_2} & {y_{13}\le x_1} & {y_{13}\le x_3} \\
    & {y_{14}\le x_1} & {y_{14}\le x_4} & {y_{16}\le x_1} & {y_{16}\le x_6} \\
    & {y_{17}\le x_1} & {y_{17}\le x_7} & {y_{18}\le x_1} & {y_{18}\le x_8} \\
    & {y_{23}\le x_2} & {y_{23}\le x_3} & {y_{24}\le x_2} & {y_{24}\le x_4} \\
    & {y_{25}\le x_2} & {y_{25}\le x_5} & {y_{27}\le x_2} & {y_{27}\le x_7} \\
    & {y_{28}\le x_2} & {y_{28}\le x_8} & {y_{34}\le x_3} & {y_{34}\le x_4} \\
    & {y_{35}\le x_3} & {y_{35}\le x_5} & {y_{36}\le x_3} & {y_{36}\le x_6} \\
    & {y_{38}\le x_3} & {y_{38}\le x_8} & {y_{45}\le x_4} & {y_{45}\le x_5} \\
    & {y_{46}\le x_4} & {y_{46}\le x_6} & {y_{47}\le x_4} & {y_{47}\le x_7} \\
    & {y_{56}\le x_5} & {y_{56}\le x_6} & {y_{57}\le x_5} & {y_{57}\le x_7} \\
    & {y_{58}\le x_5} & {y_{58}\le x_8} & {y_{67}\le x_6} & {y_{67}\le x_7} \\
    & {y_{68}\le x_6} & {y_{68}\le x_8} & {y_{78}\le x_7} & {y_{78}\le x_8} \\[1ex]
    & {x_1+x_5\le 1} & {x_2+x_6\le 1} & {x_3+x_7\le 1} & {x_4+x_8\le 1} \\[1ex]
    & {x_1,~x_2,~\dots,~x_8\in\{0,1\}} & & & \\
    & {y_{12},~y_{13},~\dots,~y_{78}\in\{0,1\}} & & &
    \end{array}
    $$

    Una soluzione ottima $(\tilde{\vet x},\tilde{\vet y})(\mathrm{ILP}^{\mathrm{EW}}_{\mathrm{MCP}})$ è:

    \begin{align*}
    &\tilde x_2=\tilde x_5=\tilde x_7=\tilde x_8=1,~~\tilde x_1=\tilde x_3=\tilde x_4=\tilde x_6=0,\\
    &\tilde y_{25}=\tilde y_{27}=\tilde y_{28}=\tilde y_{57}=\tilde y_{58}=\tilde y_{78}=1,~~\text{tutte le altre }\tilde y_{uv}=0
    \end{align*}

    Il valore ottimo $z(\mathrm{ILP}^{\mathrm{EW}}_{\mathrm{MCP}})$ è $6+9+4+7+3+8=37$, come indicato nel Capitolo 5 [«Problemi di clique»](../../problemi-di-ottimizzazione-combinatoria/clique/index.md). La soluzione ottima associata è la clique $\tilde K=\{2,5,7,8\}$, ed è l'unica soluzione ottima.

## 12.9 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Scrivere i vincoli sugli spigoli di $G$.</strong> La formulazione sugli spigoli del MCP ha un vincolo per ogni <em>non-spigolo</em> di $G$; sugli spigoli di $G$ gli stessi vincoli descrivono gli insiemi stabili di $G$.

    - <strong>Fidarsi del bound LP della formulazione sugli spigoli.</strong> Il punto $x_v=\frac{1}{2}$ è sempre ammissibile, quindi $z(\mathrm{LP}_{\mathrm{MCP}})\ge n/2$ anche quando $\omega(G)=2$.

    - <strong>Dimenticare i bound $x_v\le 1$ nella formulazione sugli spigoli.</strong> Un vertice adiacente a tutti gli altri non compare in nessun vincolo, e $\mathrm{LP}\text{-}0_{\mathrm{MCP}}$ diventa illimitato. Nella formulazione a clique i bound sono implicati.

    - <strong>Credere che le disuguaglianze di clique chiudano ogni gap.</strong> Su $C_5$ coincidono con i vincoli sui non-spigoli, e serve la disuguaglianza di ciclo dispari.

    - <strong>Usare clique non massimali di $\overline{G}$.</strong> Le loro disuguaglianze sono valide ma dominate: le clique massimali danno i vincoli più forti di questa famiglia.

    - <strong>Confondere i grafi del MCP e del MSSP.</strong> Il modello $\mathrm{ILP}_{\mathrm{MSSP}}$ ha un vincolo per ogni spigolo di $G$, il modello $\mathrm{ILP}_{\mathrm{MCP}}$ uno per ogni spigolo di $\overline{G}$.

    - <strong>Scrivere $y_{uv}=x_u\,x_v$ nel modello pesato sugli spigoli.</strong> Il prodotto non è lineare: i vincoli $y_{uv}\le x_u$ e $y_{uv}\le x_v$ lo sostituiscono, e i pesi positivi rendono $y_{uv}=1$ ogni volta che entrambi gli estremi sono selezionati.

## 12.10 In sintesi

!!! chiave "In sintesi"

    - La formulazione sugli spigoli $\mathrm{ILP}_{\mathrm{MCP}}$ ha una variabile binaria per vertice e un vincolo $x_u+x_v\le 1$ per spigolo di $\overline{G}$: è la formulazione sugli spigoli del MSSP su $\overline{G}$.

    - Il suo rilassamento lineare è debole: $x_v=\frac{1}{2}$ è ammissibile e $z(\mathrm{LP}_{\mathrm{MCP}})\ge n/2$.

    - Le disuguaglianze di clique $\sum_{v\in Q}x_v\le 1$, per le clique massimali $Q$ di $\overline{G}$, danno una formulazione più forte con $\omega(G)\le z(\mathrm{LP}^{\mathrm{CL}}_{\mathrm{MCP}})\le z(\mathrm{LP}_{\mathrm{MCP}})$.

    - Il duale di $\mathrm{LP}^{\mathrm{CL}}_{\mathrm{MCP}}$ è il rilassamento lineare di una formulazione di colorazione, quindi $\omega(G)\le z(\mathrm{LP}^{\mathrm{CL}}_{\mathrm{MCP}})\le\chi(G)$.

    - Il modello $\mathrm{ILP}_{\mathrm{MSSP}}$ ha un vincolo $x_u+x_v\le 1$ per spigolo di $G$; con le clique massimali di $G$ diventa la formulazione a clique. Sull'<span style="color:#1971c2">[Esempio 12.1](un-modello-pli-per-il-problema-della-clique-massima-la-formu.md#box-1-mcpF-ex1)</span> il valore ottimo è $\alpha(G)=3$.

    - Il modello pesato sui vertici cambia solo la funzione obiettivo; il modello pesato sugli spigoli aggiunge una variabile $y_{uv}$ per spigolo, con $y_{uv}\le x_u$ e $y_{uv}\le x_v$. Sulle istanze del Capitolo 5 [«Problemi di clique»](../../problemi-di-ottimizzazione-combinatoria/clique/index.md) i loro valori ottimi sono $32$ e $37$.

    <strong>Cruscotto</strong> (massimizzazione). Bound su $\omega(G)$ calcolati in questo capitolo:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>istanza</th>
    <th><span class="arithmatex">\(z(\mathrm{LP}_{\mathrm{MCP}})\)</span></th>
    <th><span class="arithmatex">\(z(\mathrm{LP}^{\mathrm{CL}}_{\mathrm{MCP}})\)</span></th>
    <th><span class="arithmatex">\(\omega(G)\)</span></th>
    </tr>
    <tr>
    <td><span style="color:#1971c2"><a href="../un-modello-pli-per-il-problema-della-clique-massima-la-formu/#box-1-mcpF-ex1">Esempio 12.1</a></span> (ciclo con una corda)</td>
    <td><span class="arithmatex">\(\frac{7}{2}\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(C_5\)</span></td>
    <td><span class="arithmatex">\(\frac{5}{2}\)</span></td>
    <td><span class="arithmatex">\(\frac{5}{2}\)</span></td>
    <td><span class="arithmatex">\(2\)</span> (disuguaglianza di ciclo dispari)</td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di clique](../../esercizi/clique-formulations.md)

