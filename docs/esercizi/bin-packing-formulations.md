---
title: "Esercizi · Formulazioni dei problemi di packing"
---

# Esercizi · Formulazioni dei problemi di packing

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 10** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 10: Problemi di packing](../formulazioni/bin-packing-formulations/index.md) · [:material-file-pdf-box: Eserciziario, volume 2 (PDF)](../pdf/esercizi-2-formulazioni.pdf)

</div>

!!! chiave ""

    <strong>Formulazioni usate in questi esercizi.</strong> Il modello $\mathrm{ILP}_{\mathrm{BPP}}$ del capitolo [Formulazioni dei problemi di packing](../formulazioni/bin-packing-formulations/index.md), con l'insieme dei contenitori $\mathscr{B}=\{1,\dots,m\}$:

    \begin{align*}
    && \min ~~ \sum_{b\in\mathscr{B}} y_b \tag{B0}\\
    && \text{soggetto a} \quad \sum_{b\in\mathscr{B}} x_{jb} &= 1, & \forall j\in\mathscr{I}, \tag{B1}\\
    && -\sum_{j\in\mathscr{I}} w_j\,x_{jb}+c\,y_b &\ge 0, & \forall b\in\mathscr{B}, \tag{B2}\\
    && x_{jb} &\in\{0,1\}, & \forall j\in\mathscr{I},~\forall b\in\mathscr{B}, \tag{B3}\\
    && y_b &\in\{0,1\}, & \forall b\in\mathscr{B}. \tag{B4}
    \end{align*}

    I rilassamenti $\mathrm{LP}\text{-}0_{\mathrm{BPP}}$ e $\mathrm{LP}_{\mathrm{BPP}}$ del capitolo rilassano (B3) e (B4) in $x_{jb}\ge 0$ e $y_b\ge 0$, con anche $y_b\le 1$ in $\mathrm{LP}_{\mathrm{BPP}}$. Per ogni istanza e ogni $m$ valido i due rilassamenti hanno lo stesso valore ottimo

    \begin{equation*}
    z(\mathrm{LP}\text{-}0_{\mathrm{BPP}}) \;=\; z(\mathrm{LP}_{\mathrm{BPP}}) \;=\; \frac{\sum_{j\in\mathscr{I}} w_j}{c}, \tag{B5}
    \end{equation*}

    raggiunto da $\tilde x_{jb}=\frac{1}{m}$ e $\tilde y_b=\frac{\sum_{j} w_j}{m\,c}$; una soluzione duale ottima è $\tilde\mu_j=\frac{w_j}{c}$ e $\tilde\pi_b=\frac{1}{c}$ (e $\tilde\lambda_b=0$ per $\mathrm{LP}_{\mathrm{BPP}}$).

<a id="esercizio-10-1"></a>

!!! esercizio "Esercizio 10.1: Modello PLI del problema del bin packing (1)"

    Consideriamo contenitori di capacità $c=10$ e un insieme $\mathscr{I}=\{1,2,\dots,5\}$ di $5$ oggetti ($n=5$), con i seguenti pesi degli oggetti:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\[1ex]
    \hline {w_j} & {6} & {5} & {4} & {3} & {2} \\
    \hline
    \end{array}
    $$

    Gli schemi di riempimento $\{1,4\}$, $\{2,3\}$ e $\{5\}$ formano una soluzione ammissibile.

    **Domande**

    1. Spiegare perché $m=3$ è un upper bound valido sul numero di contenitori usati in una qualunque soluzione ottima.

    2. Contare le variabili e i vincoli (oltre ai domini delle variabili) del modello $\mathrm{ILP}_{\mathrm{BPP}}$ con $m=3$.

    3. Scrivere il modello $\mathrm{ILP}_{\mathrm{BPP}}$ con $m=3$ per questa istanza.

    4. Risolvere il modello con Gurobi. Dare il valore ottimo, una soluzione ottima e gli schemi di riempimento associati, e dire se la soluzione ottima è unica.

??? soluzione "Soluzione"

    1. Gli schemi di riempimento dati hanno pesi $9$, $9$ e $2$, tutti al più $c=10$: formano una soluzione ammissibile con $3$ contenitori. Quindi $z(\mathrm{ILP}_{\mathrm{BPP}})\le 3$, e $m=3$ è un upper bound valido.

    2. Ci sono $m\,n=3\cdot5=15$ variabili di assegnamento $x_{jb}$ e $m=3$ variabili di attivazione $y_b$, quindi $18$ variabili binarie. Ci sono $n=5$ vincoli di assegnamento e $m=3$ vincoli di capacità, quindi $8$ vincoli lineari.

    3. Con $\mathscr{B}=\{1,2,3\}$ il modello $\mathrm{ILP}_{\mathrm{BPP}}$ è:

        $$
        \begin{array}{rlcl}
        {\min} & {y_1+y_2+y_3} &  &  \\[1ex]
        \text{soggetto a} & {x_{11}+x_{12}+x_{13}} & {=} & {1} \\
        & {x_{21}+x_{22}+x_{23}} & {=} & {1} \\
        & {x_{31}+x_{32}+x_{33}} & {=} & {1} \\
        & {x_{41}+x_{42}+x_{43}} & {=} & {1} \\
        & {x_{51}+x_{52}+x_{53}} & {=} & {1} \\
        & {-6\,x_{11}-5\,x_{21}-4\,x_{31}-3\,x_{41}-2\,x_{51}+10\,y_1} & {\ge} & {0} \\
        & {-6\,x_{12}-5\,x_{22}-4\,x_{32}-3\,x_{42}-2\,x_{52}+10\,y_2} & {\ge} & {0} \\
        & {-6\,x_{13}-5\,x_{23}-4\,x_{33}-3\,x_{43}-2\,x_{53}+10\,y_3} & {\ge} & {0} \\[1ex]
        & {x_{11},~x_{12},~x_{13},~\dots,~x_{53}} & {\in} & {\{0,1\}} \\
        & {y_1,~y_2,~y_3} & {\in} & {\{0,1\}}
        \end{array}
        $$

    4. Gurobi restituisce il valore ottimo $z(\mathrm{ILP}_{\mathrm{BPP}})=2$. Il lower bound $\left\lceil \frac{6+5+4+3+2}{10}\right\rceil=2$ lo conferma. Una soluzione ottima è

        $$
        \tilde x_{11}=1,~~\tilde x_{31}=1,~~\tilde x_{22}=1,~~\tilde x_{42}=1,~~\tilde x_{52}=1,~~ \tilde y_1=\tilde y_2=1,~~\tilde y_3=0,
        $$

        con tutte le altre variabili pari a $0$. Gli schemi di riempimento sono $\tilde P_1=\{1,3\}$ (peso $10$) e $\tilde P_2=\{2,4,5\}$ (peso $10$).

        La partizione degli oggetti è unica: l'oggetto $1$ può condividere un contenitore solo con un peso al più $4$, e solo $\{1,3\}$ lascia un secondo contenitore di peso al più $10$. La soluzione ottima del modello non è unica: i due schemi possono andare in due qualunque dei $3$ contenitori, il che dà $3\cdot 2=6$ soluzioni ottime.

<a id="esercizio-10-2"></a>

!!! esercizio "Esercizio 10.2: Rilassamenti lineari del modello del BPP (1)"

    Consideriamo contenitori di capacità $c=12$ e un insieme $\mathscr{I}=\{1,2,\dots,5\}$ di $5$ oggetti ($n=5$), con i seguenti pesi degli oggetti:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\[1ex]
    \hline {w_j} & {7} & {6} & {5} & {4} & {3} \\
    \hline
    \end{array}
    $$

    Usiamo $m=3$ contenitori: gli schemi di riempimento $\{1,3\}$, $\{2,4\}$ e $\{5\}$ sono ammissibili.

    **Domande**

    1. Risolvere i due rilassamenti lineari $\mathrm{LP}\text{-}0_{\mathrm{BPP}}$ e $\mathrm{LP}_{\mathrm{BPP}}$ con Gurobi e confrontarne i valori ottimi con la formula (B5).

    2. Scrivere la soluzione primale e la soluzione duale date dal capitolo per questa istanza, e verificare che sono ammissibili e hanno lo stesso valore obiettivo.

    3. Ricavare il lower bound sul numero di contenitori, e stabilire se coincide con il valore ottimo.

??? soluzione "Soluzione"

    Usiamo il valore (B5) dei rilassamenti e le soluzioni primale e duale date con esso nel box all'inizio del capitolo.

    1. Gurobi restituisce $z(\mathrm{LP}\text{-}0_{\mathrm{BPP}})=\frac{25}{12}$ e $z(\mathrm{LP}_{\mathrm{BPP}})=\frac{25}{12}$. La formula dà lo stesso valore:

        $$
        \frac{\sum_{j\in\mathscr{I}} w_j}{c}=\frac{7+6+5+4+3}{12}=\frac{25}{12}.
        $$

        I limiti superiori $y_b\le 1$ non cambiano il valore ottimo.

    2. La soluzione primale è $\tilde x_{jb}=\frac{1}{3}$ per ogni $j$ e $b$, e $\tilde y_b=\frac{25}{3\cdot 12}=\frac{25}{36}$ per ogni $b$.

        - Assegnamento: $\sum_b \tilde x_{jb}=3\cdot\frac{1}{3}=1$ per ogni oggetto $j$.

        - Capacità: $-\sum_j w_j\,\tilde x_{jb}+12\,\tilde y_b=-\frac{25}{3}+12\cdot\frac{25}{36}=0$ per ogni contenitore $b$.

        - Limiti: $0\le \frac{25}{36}\le 1$, quindi vale anche $\tilde y_b\le 1$.

        La soluzione duale è $\tilde\pi_b=\frac{1}{12}$ per ogni contenitore e $\tilde\mu_j=\frac{w_j}{12}$:

        $$
        \tilde\mu_1=\frac{7}{12},~~\tilde\mu_2=\frac{1}{2},~~\tilde\mu_3=\frac{5}{12},~~\tilde\mu_4=\frac{1}{3},~~\tilde\mu_5=\frac{1}{4}.
        $$

        Ogni vincolo $\mu_j-w_j\,\pi_b\le 0$ vale all'uguaglianza, poiché $\frac{w_j}{12}-w_j\,\frac{1}{12}=0$, e ogni vincolo $c\,\pi_b\le 1$ vale all'uguaglianza, poiché $12\cdot\frac{1}{12}=1$.

        Valore primale: $\sum_b\tilde y_b=3\cdot\frac{25}{36}=\frac{25}{12}$. Valore duale: $\sum_j\tilde\mu_j=\frac{25}{12}$. I due valori coincidono, quindi per la dualità debole della PL entrambe le soluzioni sono ottime.

    3. Poiché $z(\mathrm{ILP}_{\mathrm{BPP}})$ è intero, $z(\mathrm{ILP}_{\mathrm{BPP}})\ge\left\lceil \frac{25}{12}\right\rceil=3$. La soluzione ammissibile del testo usa $3$ contenitori, quindi $z(\mathrm{ILP}_{\mathrm{BPP}})=3$ (Gurobi dà lo stesso valore): il bound arrotondato coincide con il valore ottimo.

<a id="esercizio-10-3"></a>

!!! esercizio "Esercizio 10.3: Soluzioni ammissibili del modello del BPP (1)"

    Consideriamo contenitori di capacità $c=10$ e un insieme $\mathscr{I}=\{1,2,\dots,6\}$ di $6$ oggetti ($n=6$), con i seguenti pesi degli oggetti:

    $$
    \begin{array}{l|cccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} \\[1ex]
    \hline {w_j} & {5} & {4} & {4} & {3} & {2} & {2} \\
    \hline
    \end{array}
    $$

    Usiamo il modello $\mathrm{ILP}_{\mathrm{BPP}}$ con $m=3$ contenitori. Le seguenti soluzioni candidate danno gli oggetti in ogni contenitore (tutte le variabili non elencate sono pari a $0$):

    - **(a)** contenitore $1$: $\{1,3\}$, contenitore $2$: $\{2,4,5\}$, contenitore $3$: $\{6\}$, e $y_1=y_2=y_3=1$;

    - **(b)** contenitore $1$: $\{1,2,4\}$, contenitore $2$: $\{3,5\}$, contenitore $3$: $\{6\}$, e $y_1=y_2=y_3=1$;

    - **(c)** contenitore $1$: $\{1,4,5\}$, contenitore $2$: $\{2,3,6\}$, contenitore $3$ vuoto, e $y_1=y_2=y_3=1$;

    - **(d)** contenitore $1$: $\{1,4,5\}$, contenitore $2$: $\{2,3,6\}$, contenitore $3$: $\{6\}$, e $y_1=y_2=y_3=1$;

    - **(e)** $x_{jb}=\frac{1}{3}$ per ogni oggetto $j$ e ogni contenitore $b$, e $y_1=y_2=y_3=\frac{2}{3}$.

    **Domande**

    1. Per ogni candidata, verificare i vincoli di assegnamento e i vincoli di capacità del modello.

    2. Stabilire quali candidate sono ammissibili per il modello $\mathrm{ILP}_{\mathrm{BPP}}$ e quali per il suo rilassamento $\mathrm{LP}_{\mathrm{BPP}}$, e dare il valore obiettivo di quelle ammissibili.

    3. Usare le candidate per trovare il valore ottimo dell'istanza.

??? soluzione "Soluzione"

    1. - **(a)** Ogni oggetto è in esattamente un contenitore. I carichi sono $9$, $9$, $2$ contro le capacità $10$, $10$, $10$. Tutti i vincoli di capacità valgono.

        - **(b)** Ogni oggetto è in esattamente un contenitore. I carichi sono $12$, $6$, $2$ contro le capacità $10$, $10$, $10$. Il vincolo di capacità del contenitore $1$ è violato.

        - **(c)** Ogni oggetto è in esattamente un contenitore. I carichi sono $10$, $10$, $0$ contro le capacità $10$, $10$, $10$. Tutti i vincoli di capacità valgono.

        - **(d)** L'oggetto $6$ è in $2$ contenitori: il vincolo di assegnamento dell'oggetto $6$ è violato. I carichi sono $10$, $10$, $2$ contro le capacità $10$, $10$, $10$. Tutti i vincoli di capacità valgono.

        - **(e)** Ogni oggetto è in esattamente un contenitore. I carichi sono $\frac{20}{3}$, $\frac{20}{3}$, $\frac{20}{3}$ contro le capacità $\frac{20}{3}$, $\frac{20}{3}$, $\frac{20}{3}$. Tutti i vincoli di capacità valgono.

    2. - **(a)** Ammissibile per $\mathrm{ILP}_{\mathrm{BPP}}$, quindi per $\mathrm{LP}_{\mathrm{BPP}}$, di valore $3$.

        - **(b)** Inammissibile per entrambi i modelli: il contenitore $1$ contiene peso $12>10$.

        - **(c)** Ammissibile per entrambi i modelli, di valore $3$. Il contenitore $3$ è vuoto ma contato: porre $y_3=0$ mantiene soddisfatti tutti i vincoli e dà valore $2$.

        - **(d)** Inammissibile per entrambi i modelli: l'oggetto $6$ è inserito due volte.

        - **(e)** Ammissibile per $\mathrm{LP}_{\mathrm{BPP}}$, di valore $3\cdot\frac{2}{3}=2$, ma non per $\mathrm{ILP}_{\mathrm{BPP}}$, poiché le variabili sono frazionarie. Ogni vincolo di capacità vale all'uguaglianza: $\frac{20}{3}=10\cdot\frac{2}{3}$.

    3. La candidata (c) con $y_3=0$ usa $2$ contenitori, con schemi $\{1,4,5\}$ e $\{2,3,6\}$, entrambi di peso $10$. Il lower bound $\left\lceil\frac{5+4+4+3+2+2}{10}\right\rceil=2$ mostra che nessuna soluzione usa meno contenitori: $z(\mathrm{ILP}_{\mathrm{BPP}})=2$. Il valore $2$ della candidata (e) è il valore $\frac{\sum_j w_j}{c}=2$ dei rilassamenti lineari.

<a id="esercizio-10-4"></a>

!!! esercizio "Esercizio 10.4: I limiti $y_b\le 1$ e la scelta di m (1)"

    Consideriamo contenitori di capacità $c=10$ e un insieme $\mathscr{I}=\{1,2,\dots,3\}$ di $3$ oggetti ($n=3$), con i seguenti pesi degli oggetti:

    $$
    \begin{array}{l|ccc}
    \hline  & {j=1} & {j=2} & {j=3} \\[1ex]
    \hline {w_j} & {6} & {6} & {6} \\
    \hline
    \end{array}
    $$

    I due rilassamenti differiscono solo per i limiti superiori $y_b\le 1$.

    **Domande**

    1. Risolvere $\mathrm{LP}\text{-}0_{\mathrm{BPP}}$, $\mathrm{LP}_{\mathrm{BPP}}$ e $\mathrm{ILP}_{\mathrm{BPP}}$ con $m=3$ usando Gurobi, e spiegare perché i limiti $y_b\le 1$ non cambiano il valore del rilassamento.

    2. Mostrare che i limiti superiori $x_{jb}\le 1$ sono validi ma implicati dagli altri vincoli.

    3. Ripetere il calcolo con $m=2$. Spiegare il risultato.

    4. Ripetere il calcolo con $m=1$, e confrontare i due rilassamenti.

??? soluzione "Soluzione"

    1. Gurobi dà $z(\mathrm{LP}\text{-}0_{\mathrm{BPP}})=z(\mathrm{LP}_{\mathrm{BPP}})=\frac{9}{5}$ e $z(\mathrm{ILP}_{\mathrm{BPP}})=3$. La soluzione ottima del capitolo ha $\tilde y_b=\frac{18}{3\cdot 10}=\frac{3}{5}\le 1$: soddisfa i limiti $y_b\le 1$, quindi aggiungerli non taglia alcuna soluzione ottima di $\mathrm{LP}\text{-}0_{\mathrm{BPP}}$. In generale $\frac{\sum_j w_j}{m\,c}\le 1$ ogni volta che $\frac{\sum_j w_j}{c}\le z(\mathrm{ILP}_{\mathrm{BPP}})\le m$.

    2. Per ogni oggetto $j$ e contenitore $b$, il vincolo di assegnamento e $x_{jk}\ge 0$ danno

        $$
        x_{jb}\;\le\;\sum_{k\in\mathscr{B}} x_{jk}\;=\;1 .
        $$

        Ogni punto che soddisfa i vincoli di assegnamento e di non negatività soddisfa già $x_{jb}\le 1$.

    3. Con $m=2$ il modello $\mathrm{ILP}_{\mathrm{BPP}}$ è inammissibile (Gurobi): ogni oggetto ha peso $6>\frac{c}{2}=5$, quindi due oggetti non condividono mai un contenitore e servono $3$ contenitori. I rilassamenti sono ammissibili, con valore $\frac{9}{5}$ e $\tilde y_1=\tilde y_2=\frac{18}{2\cdot 10}=\frac{9}{10}\le 1$. Un valore $m<z(\mathrm{ILP}_{\mathrm{BPP}})$ rende sbagliato il modello, e il rilassamento non lo rivela.

    4. Con $m=1$, $\mathrm{LP}\text{-}0_{\mathrm{BPP}}$ è ancora ammissibile, con $\tilde y_1=\frac{9}{5}$ e valore $\frac{9}{5}$. Invece $\mathrm{LP}_{\mathrm{BPP}}$ è inammissibile (Gurobi): il vincolo di capacità e i vincoli di assegnamento danno $10\,y_1\ge 18$, cioè $y_1\ge \frac{9}{5}>1$, contro $y_1\le 1$. Qui i limiti $y_b\le 1$ fanno la differenza: rilevano che un solo contenitore non può contenere tutti gli oggetti.

<a id="esercizio-10-5"></a>

!!! esercizio "Esercizio 10.5: Gap di integralità del modello del BPP (1)"

    Dato $\vartheta\in\Z_{\ge 1}$, il capitolo considera le istanze del BPP con capacità $c=2\vartheta$ e $n$ oggetti di peso $w_j=\vartheta+1$. Prendiamo $\vartheta=4$ e $n=4$, cioè $c=8$ e i pesi:

    $$
    \begin{array}{l|cccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\[1ex]
    \hline {w_j} & {5} & {5} & {5} & {5} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Usare $m=4$ e Gurobi per calcolare $z(\mathrm{LP}_{\mathrm{BPP}})$ e $z(\mathrm{ILP}_{\mathrm{BPP}})$, e spiegare il valore di $z(\mathrm{ILP}_{\mathrm{BPP}})$.

    2. Calcolare il gap assoluto $z(\mathrm{ILP}_{\mathrm{BPP}})-z(\mathrm{LP}_{\mathrm{BPP}})$ e i rapporti $\frac{z(\mathrm{LP}_{\mathrm{BPP}})}{z(\mathrm{ILP}_{\mathrm{BPP}})}$ e $\frac{\lceil z(\mathrm{LP}_{\mathrm{BPP}})\rceil}{z(\mathrm{ILP}_{\mathrm{BPP}})}$, e confrontarli con il valore $\frac{1}{2}$ del capitolo.

    3. Trovare il più piccolo $\vartheta$ per cui il rapporto $\frac{z(\mathrm{LP}_{\mathrm{BPP}})}{z(\mathrm{ILP}_{\mathrm{BPP}})}$ è al più $\frac{11}{20}$.

    4. Considerare la seconda famiglia del capitolo con $n=6$: capacità $c=6$ e $6$ oggetti di peso $\frac{c}{2}+1=4$. Calcolare il rapporto $\frac{\lceil z(\mathrm{LP}_{\mathrm{BPP}})\rceil}{z(\mathrm{ILP}_{\mathrm{BPP}})}$ con Gurobi.

??? soluzione "Soluzione"

    Usiamo il valore (B5) dei rilassamenti e le soluzioni primale e duale date con esso nel box all'inizio del capitolo.

    1. Gurobi dà $z(\mathrm{LP}_{\mathrm{BPP}})=\frac{4\cdot 5}{8}=\frac{5}{2}$ e $z(\mathrm{ILP}_{\mathrm{BPP}})=4$. Ogni oggetto ha peso $5>\frac{c}{2}=4$, quindi due oggetti non entrano mai nello stesso contenitore, e ogni oggetto ha bisogno del proprio contenitore.

    2. Il gap assoluto è $4-\frac{5}{2}=\frac{3}{2}$. I rapporti sono

        $$
        \frac{z(\mathrm{LP}_{\mathrm{BPP}})}{z(\mathrm{ILP}_{\mathrm{BPP}})}=\frac{\frac{5}{2}}{4}=\frac{5}{8}\qquad\text{e}\qquad\frac{\lceil z(\mathrm{LP}_{\mathrm{BPP}})\rceil}{z(\mathrm{ILP}_{\mathrm{BPP}})}=\frac{3}{4}=\frac{3}{4}.
        $$

        Entrambi sono almeno $\frac{1}{2}$, come il capitolo dimostra per ogni istanza.

    3. Per questa famiglia il rapporto è

        $$
        \frac{z(\mathrm{LP}_{\mathrm{BPP}})}{z(\mathrm{ILP}_{\mathrm{BPP}})}=\frac{\frac{n(\vartheta+1)}{2\vartheta}}{n}=\frac{\vartheta+1}{2\vartheta}.
        $$

        La condizione $\frac{\vartheta+1}{2\vartheta}\le\frac{11}{20}$ è $20\vartheta+20\le 22\vartheta$, cioè $\vartheta\ge 10$. Il valore più piccolo è $\vartheta=10$, con $c=20$ e oggetti di peso $11$.

    4. Gurobi dà $z(\mathrm{LP}_{\mathrm{BPP}})=\frac{6\cdot 4}{6}=4$ e $z(\mathrm{ILP}_{\mathrm{BPP}})=6$, poiché di nuovo due oggetti non condividono mai un contenitore. Il rapporto è $4/6=\frac{2}{3}$. In generale è $\frac{n/2+1}{n}=\frac{1}{2}+\frac{1}{n}$, che tende a $\frac{1}{2}$.

<a id="esercizio-10-6"></a>

!!! esercizio "Esercizio 10.6: Modello PLI del problema del cutting stock (CSP)"

    Consideriamo un problema del cutting stock con contenitori di capacità $c=10$ e un insieme $\mathscr{I}=\{1,2,3\}$ di $3$ oggetti, con i seguenti pesi $w_j$ e copie richieste $d_j$:

    $$
    \begin{array}{l|ccc}
    \hline  & {j=1} & {j=2} & {j=3} \\[1ex]
    \hline {w_j} & {6} & {5} & {3} \\[1ex]
    {d_j} & {3} & {1} & {2} \\[1ex]
    \hline
    \end{array}
    $$

    Usiamo il modello $\mathrm{ILP}_{\mathrm{CSP}}$ del capitolo, con variabili intere $x_{jb}$ per il numero di copie dell'oggetto $j$ inserite nel contenitore $b$ e variabili binarie $y_b$ per i contenitori usati.

    **Domande**

    1. Trovare una soluzione ammissibile con $4$ contenitori, e contare le variabili e i vincoli (oltre ai domini) del modello $\mathrm{ILP}_{\mathrm{CSP}}$ con $m=4$.

    2. Scrivere il modello $\mathrm{ILP}_{\mathrm{CSP}}$ con $m=4$ per questa istanza.

    3. Risolvere il modello con Gurobi: dare il valore ottimo e il contenuto dei contenitori usati.

    4. Calcolare il bound sul peso $\lceil \sum_j d_j w_j / c \rceil$ e il valore ottimo del rilassamento lineare (Gurobi), e spiegare il gap con il valore ottimo.

    5. Determinare quante variabili binarie servirebbero al modello $\mathrm{ILP}_{\mathrm{BPP}}$ sull'insieme esteso degli oggetti, con lo stesso $m$.

??? soluzione "Soluzione"

    1. Ogni copia dell'oggetto $1$ nel proprio contenitore, con una copia dell'oggetto $3$ in due di essi, e l'oggetto $2$ da solo: i contenitori $\{1,3\}$, $\{1,3\}$, $\{1\}$, $\{2\}$ hanno pesi $9$, $9$, $6$, $5$, tutti al più $10$. Quindi $m=4$ è un upper bound valido. Il modello ha $mn=4\cdot3=12$ variabili intere $x_{jb}$ e $m=4$ variabili binarie $y_b$, quindi $16$ variabili, e $n+m=3+4=7$ vincoli lineari.

    2. Il modello $\mathrm{ILP}_{\mathrm{CSP}}$ è:

        $$
        \begin{array}{rlcl}
        {\min} & {y_1+y_2+y_3+y_4} &  &  \\[1ex]
        \text{soggetto a} & {x_{11}+x_{12}+x_{13}+x_{14}} & {=} & {3} \\
        & {x_{21}+x_{22}+x_{23}+x_{24}} & {=} & {1} \\
        & {x_{31}+x_{32}+x_{33}+x_{34}} & {=} & {2} \\
        & {-6\,x_{11}-5\,x_{21}-3\,x_{31}+10\,y_1} & {\ge} & {0} \\
        & {-6\,x_{12}-5\,x_{22}-3\,x_{32}+10\,y_2} & {\ge} & {0} \\
        & {-6\,x_{13}-5\,x_{23}-3\,x_{33}+10\,y_3} & {\ge} & {0} \\
        & {-6\,x_{14}-5\,x_{24}-3\,x_{34}+10\,y_4} & {\ge} & {0} \\[1ex]
        & {x_{11},~x_{12},~x_{13},~\dots,~x_{34}} & {\in} & {\Z_{\ge 0}} \\
        & {y_1,~y_2,~y_3,~y_4} & {\in} & {\{0,1\}}
        \end{array}
        $$

    3. Gurobi restituisce $z(\mathrm{ILP}_{\mathrm{CSP}})=4$. I contenitori usati della soluzione trovata contengono le copie $\{2\}$ (peso $5$); $\{1\}$ (peso $6$); $\{1,3\}$ (peso $9$); $\{1,3\}$ (peso $9$).

    4. Il peso totale è $\sum_j d_j w_j=3\cdot6+1\cdot5+2\cdot3=29$, quindi il bound sul peso è $\lceil \frac{29}{10} \rceil=3$, e Gurobi dà il valore ottimo $\frac{29}{10}$ per il rilassamento lineare, con $x_{jb}\ge 0$ e $0\le y_b\le 1$. Entrambi sono minori del valore ottimo $4$: due copie dell'oggetto $1$ non condividono mai un contenitore ($6+6>10$), e l'oggetto $2$ non entra con una copia dell'oggetto $1$ ($6+5>10$), quindi le tre copie dell'oggetto $1$ e l'oggetto $2$ richiedono quattro contenitori diversi.

    5. L'insieme esteso degli oggetti ha $\sum_j d_j=6$ copie, quindi il modello $\mathrm{ILP}_{\mathrm{BPP}}$ avrebbe $4\cdot6=24$ variabili binarie $x_{jb}$ e $4$ variabili $y_b$, contro le $12$ variabili intere del modello $\mathrm{ILP}_{\mathrm{CSP}}$; avrebbe anche molte soluzioni equivalenti, ottenute scambiando copie dello stesso oggetto.
