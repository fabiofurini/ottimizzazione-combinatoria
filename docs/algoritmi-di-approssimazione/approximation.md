---
title: "Principi degli algoritmi di approssimazione"
---

# Principi degli algoritmi di approssimazione

<div class="info-capitolo" markdown>

**Parte 5 · Algoritmi di approssimazione · Capitolo 34** · [:material-file-pdf-box: Dispensa, volume 5 (PDF)](../pdf/dispensa-5-algoritmi-di-approssimazione.pdf) · [:material-pencil: Esercizi: Principi](../esercizi/approximation.md) · [:material-gesture-tap: App: Istanze tight](../laboratorio/istanze-tight.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, il capitolo [«Algoritmi euristici: definizioni»](../algoritmi-euristici/heuristics.md): algoritmi euristici, soluzioni ammissibili e valore della soluzione restituita da un algoritmo euristico.

    - Da questo modulo, i capitoli sui problemi di ottimizzazione combinatoria: istanze, soluzioni ottime e valore ottimo $z(I)$ di un'istanza $I$.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo saremo in grado di:

    - calcolare il rapporto di prestazione, l'errore additivo e l'errore relativo di un algoritmo euristico su un'istanza, per problemi di minimo e di massimo;

    - stabilire quando un numero è una garanzia di prestazione relativa o additiva, e quando è tight;

    - dimostrare che una garanzia è tight esibendo un'istanza, o una successione di istanze;

    - definire uno schema di approssimazione, un PTAS e un FPTAS, e tradurre l'accuratezza $\varepsilon$ in una garanzia di prestazione.

## 34.1 Algoritmi di approssimazione

<a id="box-1-def-heurvalue"></a>

!!! definizione "Definizione 34.1: Valore euristico"

    Sia $\mathscr{A}$ un <strong>algoritmo euristico</strong> per un <strong>problema di ottimizzazione</strong> $\mathscr{P}$. Per ogni <strong>istanza</strong> $I$ di $\mathscr{P}$:

    1. $z(I)$ è il <strong>valore ottimo</strong> di $\mathscr{P}$ su $I$ (supposto positivo);

    2. $\mathscr{A}(I)$ è il <strong>valore euristico</strong>, cioè il valore obiettivo della soluzione ammissibile restituita da $\mathscr{A}$ su $I$ (supposto positivo).

- Supponiamo che $\mathscr{A}$ restituisca sempre una <strong>soluzione ammissibile</strong>. Quindi, per ogni istanza $I$,

    $$
    \begin{cases}
    \mathscr{A}(I)\ge z(I)\ \ \text{e}\ \ \dfrac{\mathscr{A}(I)}{z(I)} \ge 1
    & \quad \text{se $\mathscr{P}$ è un problema di minimo,}\\[2.5ex]
    \mathscr{A}(I)\le z(I)\ \ \text{e}\ \ \dfrac{z(I)}{\mathscr{A}(I)} \ge 1
    & \quad \text{se $\mathscr{P}$ è un problema di massimo.}
    \end{cases}
    $$

!!! chiave ""

    In generale, un algoritmo euristico può a volte generare soluzioni di valore quasi ottimo, ma in altri casi può produrre soluzioni sensibilmente peggiori. Di conseguenza, ci interessa “misurare” (quando possibile) la qualità delle soluzioni fornite da un algoritmo euristico.

- Adottiamo il punto di vista del <strong>comportamento nel caso peggiore</strong>: valutiamo un algoritmo euristico guardando il massimo scostamento possibile, su tutte le istanze, fra il valore euristico e il valore ottimo.

- Ci sono due modi standard di misurare questo scostamento:

    1. <strong>Garanzia di prestazione relativa</strong> (garanzia moltiplicativa): in questo caso misuriamo la qualità della soluzione euristica guardando l'<em>errore relativo</em>, cioè quanto il valore euristico dista dall'ottimo <em>in termini relativi</em>, usando rapporti.

    2. <strong>Garanzia di prestazione assoluta</strong> (garanzia additiva): in questo caso misuriamo la qualità della soluzione euristica guardando l'<em>errore assoluto</em>, cioè la differenza fra il valore euristico e il valore ottimo.

### 34.1.1 Garanzia di prestazione relativa

<a id="box-2-def-pratio"></a>

!!! definizione "Definizione 34.2: Rapporto di prestazione"

    Il <strong>rapporto di prestazione</strong> di $\mathscr{A}$ su un'istanza $I$ è

    $$
    \begin{cases}
    \dfrac{\mathscr{A}(I)}{z(I)} & \quad \text{se $\mathscr{P}$ è un problema di minimo,}\\[2.5ex]
    \dfrac{z(I)}{\mathscr{A}(I)} & \quad \text{se $\mathscr{P}$ è un problema di massimo.}
    \end{cases}
    $$

- Nell'ipotesi di ammissibilità, il rapporto di prestazione è almeno $1$ per ogni istanza $I$.

<a id="box-3-def-alpha-approx"></a>

!!! definizione "Definizione 34.3: Algoritmo di $\alpha$-approssimazione"

    Un algoritmo euristico $\mathscr{A}$ per un problema di ottimizzazione $\mathscr{P}$ è un <strong>algoritmo di $\alpha$-approssimazione</strong> se esiste una costante $\alpha \in [1,+\infty)$ tale che, per ogni istanza $I$ di $~\mathscr{P}$,

    $$
    \begin{cases}
    \dfrac{\mathscr{A}(I)}{z(I)} \le \alpha & \quad \text{se $\mathscr{P}$ è un problema di minimo,}\\[2.5ex]
    \dfrac{z(I)}{\mathscr{A}(I)} \le \alpha & \quad \text{se $\mathscr{P}$ è un problema di massimo.}
    \end{cases}
    $$

    Ogni costante $\alpha$ di questo tipo si chiama <strong>garanzia di prestazione relativa</strong> di $\mathscr{A}$.

- Una garanzia di prestazione relativa $\alpha$ per $\mathscr{A}$ è <strong>tight</strong> se nessuna costante minore $\alpha' < \alpha$ è anch'essa una garanzia di prestazione relativa per $\mathscr{A}$ (cioè tale che le stesse disuguaglianze valgano per tutte le istanze con $\alpha'$ al posto di $\alpha$).

- Che una garanzia sia tight si dimostra di solito esibendo un'istanza $I$ per cui il rapporto di prestazione raggiunge $\alpha$, cioè

    $$
    \frac{\mathscr{A}(I)}{z(I)}=\alpha \ \ \text{(minimo)}
    \qquad \text{oppure} \qquad
    \frac{z(I)}{\mathscr{A}(I)}=\alpha \ \ \text{(massimo),}
    $$

    oppure una successione di istanze $\{I_n\}$ i cui rapporti di prestazione si avvicinano arbitrariamente ad $\alpha$.

<a id="box-4-def-wcr"></a>

!!! definizione "Definizione 34.4: Rapporto di prestazione nel caso peggiore"

    Il <strong>rapporto di prestazione nel caso peggiore</strong> di $\mathscr{A}$ è

    $$
    r(\mathscr{A}) \;=\;
    \begin{cases}
    \sup \left\{\, \dfrac{\mathscr{A}(I)}{z(I)} : I \text{ è un'istanza di } \mathscr{P} \,\right\}
    & \quad \text{se $\mathscr{P}$ è un problema di minimo,}\\[3.0ex]
    \sup \left\{\, \dfrac{z(I)}{\mathscr{A}(I)} : I \text{ è un'istanza di } \mathscr{P} \,\right\}
    & \quad \text{se $\mathscr{P}$ è un problema di massimo.}
    \end{cases}
    $$

- Il valore $r(\mathscr{A})$ è la costante minima $\alpha$ per cui $\mathscr{A}$ è un algoritmo di $\alpha$-approssimazione. La garanzia di prestazione relativa  $\alpha$ è tight se e solo se $\alpha = r(\mathscr{A})$.

- Se $r(\mathscr{A})<\infty$, allora $\mathscr{A}$ ammette una garanzia di prestazione relativa finita (equivalentemente, ha un rapporto di prestazione limitato). Se $r(\mathscr{A})=\infty$, allora $\mathscr{A}$ non ha alcuna garanzia relativa nel caso peggiore.

- Terminologia usata in letteratura

    - una garanzia di prestazione relativa finita $\alpha$ si chiama anche <strong>fattore di approssimazione</strong> (o <strong>garanzia di approssimazione</strong>)

    - un <strong>algoritmo di $\alpha$-approssimazione</strong> si chiama anche <strong>algoritmo di approssimazione a fattore costante</strong>

    - $r(\mathscr{A})$ si chiama anche <strong>rapporto di approssimazione (nel caso peggiore)</strong> di $\mathscr{A}$

### 34.1.2 Garanzia di prestazione additiva

- L'<strong>errore additivo</strong> (o <strong>errore assoluto</strong>) di $\mathscr{A}$ su un'istanza $I$ è

    $$
    \begin{cases}
    \mathscr{A}(I)-z(I) & \text{se $\mathscr{P}$ è un problema di minimo,}\\[2ex]
    z(I)-\mathscr{A}(I) & \text{se $\mathscr{P}$ è un problema di massimo.}
    \end{cases}
    $$

    Nell'ipotesi di ammissibilità, questa quantità è non negativa per ogni istanza $I$.

<a id="box-5-def-beta-add"></a>

!!! definizione "Definizione 34.5: Algoritmo di approssimazione $\beta$-additivo"

    Un algoritmo euristico $\mathscr{A}$ per un problema di ottimizzazione $\mathscr{P}$ è un <strong>algoritmo di approssimazione $\beta$-additivo</strong> se esiste una costante $\beta \in [0,+\infty)$ tale che, per ogni istanza $I$ di $~\mathscr{P}$,

    $$
    \begin{cases}
    \mathscr{A}(I)-z(I) \le \beta & \text{se $\mathscr{P}$ è un problema di minimo,}\\[2ex]
    z(I)-\mathscr{A}(I) \le \beta & \text{se $\mathscr{P}$ è un problema di massimo.}
    \end{cases}
    $$

    Ogni costante $\beta$ di questo tipo si chiama <strong>garanzia di prestazione additiva</strong> di $\mathscr{A}$.

- Una garanzia di prestazione additiva $\beta$ per $\mathscr{A}$ è <strong>tight</strong> se nessuna costante minore $\beta' < \beta$ è anch'essa una garanzia di prestazione additiva per $\mathscr{A}$.

- Che una garanzia sia tight si dimostra di solito esibendo un'istanza $I$ per cui l'errore additivo raggiunge $\beta$, cioè

    $$
    \mathscr{A}(I)-z(I)=\beta \ \ \text{(minimo)}
    \qquad \text{oppure} \qquad
    z(I)-\mathscr{A}(I)=\beta \ \ \text{(massimo),}
    $$

    oppure una successione di istanze $\{I_n\}$ i cui errori additivi si avvicinano arbitrariamente a $\beta$.

<a id="box-6-def-wcae"></a>

!!! definizione "Definizione 34.6: Errore additivo nel caso peggiore"

    L'<strong>errore additivo nel caso peggiore</strong> di $\mathscr{A}$ è

    $$
    e(\mathscr{A}) \;=\;
    \begin{cases}
    \sup \left\{\, \mathscr{A}(I)-z(I) : I \text{ istanza di } \mathscr{P} \,\right\}
    & \text{se $\mathscr{P}$ è un problema di minimo,}\\[3.0ex]
    \sup \left\{\, z(I)-\mathscr{A}(I) : I \text{ istanza di } \mathscr{P} \,\right\}
    & \text{se $\mathscr{P}$ è un problema di massimo.}
    \end{cases}
    $$

- Il valore $e(\mathscr{A})$ è la costante minima $\beta$ per cui $\mathscr{A}$ è un algoritmo di approssimazione $\beta$-additivo. La garanzia di prestazione additiva $\beta$ è tight se e solo se $\beta = e(\mathscr{A})$.

- Se $e(\mathscr{A})<\infty$, allora $\mathscr{A}$ ammette una garanzia di prestazione additiva finita (equivalentemente, ha errore additivo limitato). Se $e(\mathscr{A})=\infty$, allora $\mathscr{A}$ non ha alcuna garanzia additiva (assoluta) nel caso peggiore.

- Terminologia usata in letteratura

    - una garanzia di prestazione additiva finita $\beta$ si chiama anche <strong>garanzia di prestazione assoluta</strong> o <strong>garanzia di approssimazione additiva</strong>

    - $e(\mathscr{A})$ si chiama anche <strong>errore assoluto (additivo) nel caso peggiore</strong> di $\mathscr{A}$

## 34.2 Schemi di approssimazione

- L'<strong>errore relativo</strong> (detto anche <strong>errore percentuale</strong>) di $\mathscr{A}$ su un'istanza $I$ è

    $$
    \begin{cases}
    \dfrac{\mathscr{A}(I)-z(I)}{z(I)} & \quad \text{se $\mathscr{P}$ è un problema di minimo,}\\[2.5ex]
    \dfrac{z(I)-\mathscr{A}(I)}{z(I)} & \quad \text{se $\mathscr{P}$ è un problema di massimo.}
    \end{cases}
    $$

    Nell'ipotesi di ammissibilità, questa quantità è non negativa per ogni istanza $I$, ed è uguale a $0$ se e solo se $\mathscr{A}(I)=z(I)$.

- L'errore relativo divide per il valore ottimo $z(I)$, e non va confuso con il gap del capitolo [«Problemi di ottimizzazione combinatoria»](../problemi-di-ottimizzazione-combinatoria/combinatorial-optimization/index.md), che divide per il lower bound e non è mai minore (capitolo [«Algoritmi euristici: definizioni»](../algoritmi-euristici/heuristics.md)).

<a id="box-7-def-as"></a>

!!! definizione "Definizione 34.7: Schema di approssimazione"

    Uno <strong>schema di approssimazione</strong> per un problema di ottimizzazione $\mathscr{P}$ è una famiglia di algoritmi euristici $\{\mathscr{A}_{\varepsilon}\}_{\varepsilon \in (0,1)}$ tale che, per ogni $\varepsilon \in (0,1)$ e per ogni istanza $I$ di $\mathscr{P}$,

    $$
    \begin{cases}
    \dfrac{\mathscr{A}_{\varepsilon}(I)-z(I)}{z(I)} \le \varepsilon
    & \text{se $\mathscr{P}$ è un problema di minimo,}\\[2.5ex]
    \dfrac{z(I)-\mathscr{A}_{\varepsilon}(I)}{z(I)} \le \varepsilon
    & \text{se $\mathscr{P}$ è un problema di massimo.}
    \end{cases}
    $$

- Per i problemi di minimo,

    $$
    \frac{\mathscr{A}_{\varepsilon}(I)-z(I)}{z(I)} \le \varepsilon
    \qquad \text{per ogni istanza $I$ di $\mathscr{P}$.}
    $$

    implica

    $$
    \mathscr{A}_{\varepsilon}(I)-z(I)\le \varepsilon\,z(I)
    \quad \Longleftrightarrow \quad
    \mathscr{A}_{\varepsilon}(I)\le (1+\varepsilon)\,z(I).
    $$

    Dividendo per $z(I)>0$,

    $$
    \frac{\mathscr{A}_{\varepsilon}(I)}{z(I)}\le 1+\varepsilon
    \qquad \text{per ogni istanza $I$ di $\mathscr{P}$.}
    $$

    Quindi $\mathscr{A}_{\varepsilon}$ è un algoritmo di $(1+\varepsilon)$-approssimazione.

- Per i problemi di massimo,

    $$
    \frac{z(I)-\mathscr{A}_{\varepsilon}(I)}{z(I)} \le \varepsilon
    \qquad \text{per ogni istanza $I$ di $\mathscr{P}$.}
    $$

    implica

    $$
    z(I)-\mathscr{A}_{\varepsilon}(I)\le \varepsilon\,z(I)
    \quad \Longleftrightarrow \quad
    \mathscr{A}_{\varepsilon}(I)\ge (1-\varepsilon)\,z(I).
    $$

    Poiché $0<\varepsilon<1$ e $z(I)>0$, dividendo per $(1-\varepsilon)z(I)$ si ottiene

    $$
    \frac{z(I)}{\mathscr{A}_{\varepsilon}(I)}\le \frac{1}{1-\varepsilon}
    \qquad \text{per ogni istanza $I$ di $\mathscr{P}$.}
    $$

    Quindi $\mathscr{A}_{\varepsilon}$ è un algoritmo di $\left(\frac{1}{1-\varepsilon}\right)$-approssimazione.

!!! chiave ""

    È naturale che il tempo di esecuzione di uno schema di approssimazione cresca al diminuire di $\varepsilon$: più piccolo è l'errore ammesso, più alto è il tempo di esecuzione richiesto.

- La quantità $\frac{1}{\varepsilon}$ si chiama spesso <strong>accuratezza</strong>. Infatti, dalle disuguaglianze che definiscono uno schema di approssimazione otteniamo

    $$
    \frac{\mathscr{A}_{\varepsilon}(I)-z(I)}{z(I)} \le \varepsilon
    \ \Longrightarrow\
    \mathscr{A}_{\varepsilon}(I)-z(I)\le \varepsilon\,z(I)
    \ \Longrightarrow\
    \frac{z(I)}{\mathscr{A}_{\varepsilon}(I)-z(I)} \ge \frac{1}{\varepsilon}
    \qquad \text{(minimo),}
    $$

    $$
    \frac{z(I)-\mathscr{A}_{\varepsilon}(I)}{z(I)} \le \varepsilon
    \ \Longrightarrow\
    z(I)-\mathscr{A}_{\varepsilon}(I)\le \varepsilon\,z(I)
    \ \Longrightarrow\
    \frac{z(I)}{z(I)-\mathscr{A}_{\varepsilon}(I)} \ge \frac{1}{\varepsilon}
    \qquad \text{(massimo).}
    $$

    Nel caso particolare in cui $\mathscr{A}_{\varepsilon}(I)=z(I)$, i denominatori sopra sono nulli; in questo caso interpretiamo le frazioni corrispondenti come $+\infty$, e le disuguaglianze valgono banalmente.

- Non tutti gli schemi di approssimazione sono ugualmente utili in pratica: li distinguiamo in base a come il tempo di esecuzione dipende dalla dimensione dell'input e dall'accuratezza $\frac{1}{\varepsilon}$.

<a id="box-8-def-ptas"></a>

!!! definizione "Definizione 34.8: Schema di approssimazione polinomiale (PTAS)"

    Uno schema di approssimazione $\{\mathscr{A}_{\varepsilon}\}_{\varepsilon\in(0,1)}$ è uno <strong>schema di approssimazione polinomiale</strong> se, per ogni $\varepsilon\in(0,1)$ fissato, il tempo di esecuzione di $\mathscr{A}_{\varepsilon}$ è polinomiale nella dimensione dell'istanza.

- Quindi il tempo di esecuzione è polinomiale nella dimensione dell'input, ma può crescere molto rapidamente al diminuire di $\varepsilon$ (cioè al crescere dell'accuratezza richiesta).

<a id="box-9-def-fptas"></a>

!!! definizione "Definizione 34.9: Schema di approssimazione completamente polinomiale (FPTAS)"

    Uno schema di approssimazione $\{\mathscr{A}_{\varepsilon}\}_{\varepsilon\in(0,1)}$ è uno <strong>schema di approssimazione completamente polinomiale</strong>  se il tempo di esecuzione di $\mathscr{A}_{\varepsilon}$ è polinomiale sia nella dimensione dell'istanza sia nell'accuratezza $\frac{1}{\varepsilon}$.

## 34.3 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Invertire il rapporto.</strong> Il rapporto di prestazione è $\frac{\mathscr{A}(I)}{z(I)}$ per un problema di minimo e $\frac{z(I)}{\mathscr{A}(I)}$ per un problema di massimo: in entrambi i casi è almeno $1$.

    - <strong>Dimostrare una garanzia con esempi.</strong> Un'istanza su cui il rapporto vale $\alpha$ mostra che nessuna costante minore di $\alpha$ è una garanzia, ma non dimostra che $\alpha$ lo sia: per questo serve una dimostrazione per <em>ogni</em> istanza.

    - <strong>Dire tight una garanzia senza un'istanza.</strong> Una garanzia $\alpha$ è tight solo se qualche istanza, o una successione di istanze, raggiunge $\alpha$ al limite.

    - <strong>Confondere $\varepsilon$ e $\alpha$.</strong> Uno schema di approssimazione con errore relativo $\varepsilon$ è un algoritmo di $(1+\varepsilon)$-approssimazione per un problema di minimo, ma un algoritmo di $\frac{1}{1-\varepsilon}$-approssimazione per un problema di massimo.

    - <strong>PTAS e FPTAS.</strong> Il tempo di esecuzione di un PTAS può crescere come $n^{1/\varepsilon}$; solo per un FPTAS è polinomiale anche in $\frac{1}{\varepsilon}$.

## 34.4 In sintesi

!!! chiave "In sintesi"

    - Una garanzia di prestazione relativa limita il rapporto $\mathscr{A}(I)/z(I)$ (minimo) o $z(I)/\mathscr{A}(I)$ (massimo) su tutte le istanze; una garanzia additiva limita la differenza.

    - Una garanzia è tight se è raggiunta da un'istanza, o avvicinata da una successione di istanze; la garanzia minima è il rapporto nel caso peggiore $r(\mathscr{A})$, o l'errore additivo nel caso peggiore $e(\mathscr{A})$.

    - Uno schema di approssimazione ha errore relativo al più $\varepsilon$ per ogni $\varepsilon \in (0,1)$; è un PTAS se il tempo di esecuzione è polinomiale nella dimensione dell'istanza per ogni $\varepsilon$ fissato, e un FPTAS se è polinomiale anche in $\frac{1}{\varepsilon}$.

    <strong>Quadro riassuntivo.</strong> Una garanzia limita, su ogni istanza, la distanza fra una soluzione euristica (un lower bound su $z(I)$ per un problema di massimo, un upper bound per un problema di minimo) e il valore ottimo. I quadri riassuntivi dei capitoli di questo volume raccolgono, per le istanze di riferimento, i valori degli algoritmi euristici e le loro garanzie; per il VCP, il MCP e il TSP generale non esiste alcuna garanzia costante, a meno che $P=NP$.

---

**Esercizi su questo capitolo:** [:material-pencil: Principi](../esercizi/approximation.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Istanze tight](../laboratorio/istanze-tight.md).