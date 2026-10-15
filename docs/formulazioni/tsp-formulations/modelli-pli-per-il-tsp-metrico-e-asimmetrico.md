---
title: "TSP metrico e asimmetrico"
---

# 13.6 Modelli PLI per il TSP metrico e asimmetrico { #sez-sec-tspf-variants }

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 13** · [:material-book-open-variant: Capitolo 13: Problemi di routing](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-tsp-formulations.pdf) · [:material-pencil: Esercizi: Problemi di routing](../../esercizi/tsp-formulations.md)

</div>

I problemi di questa sezione sono il problema del commesso viaggiatore asimmetrico (ATSP) e il TSP metrico, definiti nel [Capitolo 6 «Problemi di routing», Sezione 6.6](../../problemi-di-ottimizzazione-combinatoria/tsp/varianti-tsp-metrico-e-tsp-asimmetrico.md).

- Dato l'insieme $\mathscr{V}=\{1,2,\dots,n\}$ delle città e l'insieme $A$ degli archi orientati, ogni arco $(i,j)$ ha la sua distanza $d_{ij}$, che può differire da $d_{ji}$. Introduciamo le seguenti $n(n-1)$ <strong>variabili binarie</strong>:

    $$
    x_{ij}=
    \begin{cases}
    1 & \text{se l'arco $(i,j)$ è percorso dal giro}\\[1.5ex]
    0 & \text{altrimenti}
    \end{cases}
    \qquad \forall (i,j)\in A.
    $$

!!! chiave ""

    Usando queste variabili, un modello di programmazione lineare intera (PLI) per il problema del commesso viaggiatore asimmetrico (ATSP) è il seguente:

    <a id="eq-ILP-ATSP"></a>

    \begin{align*}
    && \min \quad \sum_{i\in\mathscr{V}}\sum_{\substack{j\in\mathscr{V}\\j\neq i}}
    d_{ij}x_{ij} \label{obj:ATSP} \tag{13.6a}\\[1ex]
    && \text{soggetto a}\quad \sum_{\substack{j\in\mathscr{V}\\j\neq i}}x_{ij}&=1,
    & \forall i\in\mathscr{V}, \label{out:ATSP} \tag{13.6b}\\[1ex]
    && \sum_{\substack{i\in\mathscr{V}\\i\neq j}}x_{ij}&=1,
    & \forall j\in\mathscr{V}, \label{in:ATSP} \tag{13.6c}\\[1ex]
    && \sum_{i\in S}\sum_{\substack{j\in S\\j\neq i}}x_{ij}&\le |S|-1,
    & \forall S\subseteq\mathscr{V}\setminus\{1\},~|S|\ge2, \label{SEC:ATSP} \tag{13.6d}\\[1ex]
    && x_{ij}&\in\{0,1\},
    & \forall(i,j)\in A. \label{bin:ATSP} \tag{13.6e}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{ATSP}}$.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{ATSP}}$:

    - la funzione obiettivo lineare $\eqref{obj:ATSP}$ minimizza la distanza totale percorsa lungo gli archi del giro, ciascun arco con la sua distanza;

    - i vincoli $\eqref{out:ATSP}$ e $\eqref{in:ATSP}$ garantiscono che da ogni città esca esattamente un arco e che in ogni città entri esattamente un arco ($2n$ vincoli lineari);

    - i vincoli $\eqref{SEC:ATSP}$ sono i vincoli di eliminazione dei sottogiri ($2^{n-1}-n$ vincoli lineari);

    - infine, i vincoli $\eqref{bin:ATSP}$ definiscono le variabili del modello PLI.

- Il modello $\mathrm{ILP}_{\mathrm{ATSP}}$ è il modello $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{DFJ}}$ con le distanze degli archi: la sua dimostrazione di correttezza, la [Proposizione 13.2](modelli-pli-per-il-problema-del-commesso-viaggiatore.md#box-4-prop-DFJ-subtours), non usa mai $d_{ij}=d_{ji}$. Per lo stesso motivo anche il modello $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{MTZ}}$ è un modello PLI dell'ATSP.

- Un giro e lo stesso giro percorso al contrario usano archi opposti: nell'ATSP sono soluzioni diverse, in generale di lunghezze diverse.

- Il TSP metrico, definito nel [Capitolo 6 «Problemi di routing»](../../problemi-di-ottimizzazione-combinatoria/tsp/varianti-tsp-metrico-e-tsp-asimmetrico.md), ha gli stessi modelli PLI del TSP: la disuguaglianza triangolare è una proprietà delle distanze, non un vincolo del modello. L'istanza dell'<span style="color:#1971c2">[Esempio 13.1](modelli-pli-per-il-problema-del-commesso-viaggiatore.md#box-2-ex-TSP-inst)</span> è metrica, quindi i modelli $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{MTZ}}$ e $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{DFJ}}$ scritti per essa sono già modelli di un'istanza del TSP metrico.

<a id="box-11-ex-ATSP"></a>

!!! esempio "Esempio 13.8: Modello $\mathrm{ILP}_{\mathrm{ATSP}}$"

    Consideriamo l'insieme $\mathscr{V}=\{1,2,3,4\}$ di $4$ città ($n=4$), con la matrice delle distanze asimmetrica

    $$
    \begin{array}{c|cccc}
    \toprule
    d_{ij}&1&2&3&4\\
    \midrule
    1&-&2&7&7\\
    2&2&-&4&2\\
    3&9&7&-&1\\
    4&2&4&1&-\\
    \bottomrule
    \end{array}
    $$

    Per esempio, $d_{13}=7$ e $d_{31}=9$. Il modello $\mathrm{ILP}_{\mathrm{ATSP}}$ per questa istanza dell'ATSP ha $12$ variabili di arco, $8$ vincoli di grado e $4$ vincoli di eliminazione dei sottogiri, uno per ogni sottoinsieme $S\subseteq\{2,3,4\}$ con almeno due città:

    $$
    \begin{array}{rlcl}
    {\min} & {2\,x_{12}+7\,x_{13}+7\,x_{14}+2\,x_{21}+4\,x_{23}+2\,x_{24}} &  &  \\
    & {+9\,x_{31}+7\,x_{32}+x_{34}+2\,x_{41}+4\,x_{42}+x_{43}} &  &  \\[1ex]
    \text{soggetto a} & {x_{12}+x_{13}+x_{14}} & {=} & {1} \\
    & {x_{21}+x_{23}+x_{24}} & {=} & {1} \\
    & {x_{31}+x_{32}+x_{34}} & {=} & {1} \\
    & {x_{41}+x_{42}+x_{43}} & {=} & {1} \\
    & {x_{21}+x_{31}+x_{41}} & {=} & {1} \\
    & {x_{12}+x_{32}+x_{42}} & {=} & {1} \\
    & {x_{13}+x_{23}+x_{43}} & {=} & {1} \\
    & {x_{14}+x_{24}+x_{34}} & {=} & {1} \\
    & {x_{23}+x_{32}} & {\le} & {1} \\
    & {x_{24}+x_{42}} & {\le} & {1} \\
    & {x_{34}+x_{43}} & {\le} & {1} \\
    & {x_{23}+x_{24}+x_{32}+x_{34}+x_{42}+x_{43}} & {\le} & {2} \\[1ex]
    & {x_{12},~x_{13},~x_{14},~\dots,~x_{43}} & {\in} & {\{0,1\}}
    \end{array}
    $$

    I due sottogiri $1\to2\to1$ e $3\to4\to3$, di lunghezza totale $2+2+1+1=6$, soddisfano i vincoli di grado ma violano il vincolo $x_{34}+x_{43}\le1$ di $S=\{3,4\}$. Una soluzione ottima $\tilde{\vet x}(\mathrm{ILP}_{\mathrm{ATSP}})$ è il giro $\tilde\sigma=(1,2,3,4)$:

    $$
    \tilde x_{12}=\tilde x_{23}=\tilde x_{34}=\tilde x_{41}=1,~~\text{tutte le altre } \tilde x_{ij}=0
    $$

    Il valore ottimo $z(\mathrm{ILP}_{\mathrm{ATSP}})$ è $2+4+1+2=9$, e il giro ottimo è unico. Lo stesso giro percorso al contrario, $(1,4,3,2)$, ha lunghezza $7+1+7+2=17$.

## 13.7 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Scrivere i vincoli MTZ per la città $1$.</strong> I vincoli [(13.1d)](modelli-pli-per-il-problema-del-commesso-viaggiatore.md#mjx-eqn:MTZ:TSP) si scrivono solo per le coppie di città diverse dalla città $1$: la città $1$ non ha variabile di posizione.

    - <strong>Usare un coefficiente minore di $n-1$.</strong> Con un coefficiente minore di $n-1$ il vincolo taglia giri ammissibili; $n-1$ è il più piccolo valore valido.

    - <strong>Prendere $S=\mathscr{V}$ nei vincoli di eliminazione dei sottogiri.</strong> Un giro usa $|\mathscr{V}|$ archi dentro $\mathscr{V}$: il vincolo taglierebbe ogni giro. Gli insiemi $S$ sono sottoinsiemi propri delle città, con almeno due città.

    - <strong>Fidarsi del bound MTZ.</strong> Per la [Proposizione 13.3](modelli-pli-per-il-problema-del-commesso-viaggiatore.md#box-7-prop-MTZ-weak), molte soluzioni frazionarie del rilassamento di assegnamento sono ammissibili per il rilassamento MTZ: la formulazione compatta non è forte.

    - <strong>Elencare tutti i vincoli di eliminazione dei sottogiri.</strong> Il loro numero è $2^{n-1}-n$: non si scrivono tutti insieme, ma si aggiungono quando sono violati.

    - <strong>Identificare un giro con il suo inverso nell'ATSP.</strong> Con distanze asimmetriche i due versi di un giro sono soluzioni diverse: nell'<span style="color:#1971c2">[Esempio 13.8](#box-11-ex-ATSP)</span> hanno lunghezze $9$ e $17$.

    - <strong>Aggiungere la disuguaglianza triangolare come vincolo.</strong> Nel TSP metrico la disuguaglianza triangolare vale per i dati $d_{ij}$; le variabili del modello sono le stesse del TSP.

## 13.8 In sintesi

!!! chiave "In sintesi"

    - I due modelli hanno le stesse variabili di arco $x_{ij}$ e gli stessi vincoli di grado; differiscono nel modo in cui vietano i sottogiri.

    - Il modello MTZ aggiunge $n-1$ variabili di posizione e $(n-1)(n-2)$ vincoli: è compatto, ma il suo rilassamento è debole.

    - Il modello DFJ aggiunge $2^{n-1}-n$ vincoli di eliminazione dei sottogiri: il rilassamento è più forte, e i vincoli si generano quando servono.

    - Entrambi i modelli sono corretti: una soluzione intera è ammissibile se e solo se i suoi archi formano un unico giro.

    - Entrambi i modelli sono scritti sugli archi, quindi sono anche modelli dell'ATSP: il modello $\mathrm{ILP}_{\mathrm{ATSP}}$ è il modello DFJ in cui è ammesso $d_{ij}\neq d_{ji}$. Il TSP metrico ha gli stessi modelli del TSP.

    - Dal modulo <em>Programmazione lineare intera</em>, il [Capitolo 8 «Branch-and-cut»](https://fabiofurini.github.io/programmazione-lineare-intera/exact-methods/branch-and-cut/) mostra come i vincoli di eliminazione dei sottogiri si aggiungono solo quando sono violati.

    <strong>Quadro riassuntivo dell'istanza del capitolo.</strong> Lower bound sul valore ottimo $18$ calcolati in questo capitolo:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Bound</th>
    <th>Valore</th>
    <th>Da</th>
    </tr>
    <tr>
    <td>Rilassamento di assegnamento</td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td><span class="arithmatex">\(z(\mathrm{LP}\text{-}0_{\mathrm{TSP}})\)</span></td>
    </tr>
    <tr>
    <td>Rilassamento MTZ</td>
    <td><span class="arithmatex">\(17\)</span></td>
    <td><span class="arithmatex">\(z(\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}})\)</span></td>
    </tr>
    <tr>
    <td>Rilassamento DFJ</td>
    <td><span class="arithmatex">\(18\)</span></td>
    <td><span class="arithmatex">\(z(\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{DFJ}})\)</span></td>
    </tr>
    <tr>
    <td>Valore ottimo</td>
    <td><span class="arithmatex">\(18\)</span></td>
    <td>giro <span class="arithmatex">\(\sigma=(1,3,5,2,4)\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di routing](../../esercizi/tsp-formulations.md)

