---
title: "Commesso viaggiatore"
---

# 13.2 Modelli PLI per il problema del commesso viaggiatore { #sez-sec-tspf-TSP }

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 13** · [:material-book-open-variant: Capitolo 13: Problemi di routing](index.md) · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-tsp-formulations.pdf) · [:material-pencil: Esercizi: Problemi di routing](../../esercizi/tsp-formulations.md)

</div>

Il problema del commesso viaggiatore e la sua istanza di riferimento (Esempio 6.1) sono definiti nel [Capitolo 6 «Problemi di routing», Sezione 6.2](../../problemi-di-ottimizzazione-combinatoria/tsp/il-problema-del-commesso-viaggiatore.md).

- Il TSP ha due modelli PLI classici sulle variabili di arco $x_{ij}$: il modello di Miller, Tucker e Zemlin (MTZ) della Sezione [13.3](#sez-sec-tspf-MTZ), con variabili di posizione, e il modello di Dantzig, Fulkerson e Johnson (DFJ) della Sezione [13.4](#sez-sec-tspf-DFJ), con vincoli di eliminazione dei sottogiri.

- La Sezione [13.5](#sez-sec-tspf-LP) confronta i rilassamenti lineari dei due modelli.

## 13.3 Un modello con variabili di posizione (MTZ) { #sez-sec-tspf-MTZ }

- Introduciamo le seguenti $n(n-1)$ <strong>variabili binarie</strong>:

    $$
    x_{ij}=
    \begin{cases}
    1 & \text{se l'arco $(i,j)$ è percorso dal giro}\\[1.5ex]
    0 & \text{altrimenti}
    \end{cases}
    \qquad \forall (i,j)\in A,
    $$

    e le seguenti $n-1$ <strong>variabili continue</strong>:

    $$
    u_i=\text{posizione della città $i$ dopo la partenza dalla città $1$},
    \qquad \forall i\in\mathscr{V}\setminus\{1\}.
    $$

    La città $1$ serve solo come città di riferimento: un giro non ha una città di partenza privilegiata.

!!! chiave ""

    Usando queste variabili, un modello di programmazione lineare intera (PLI) per il problema del commesso viaggiatore (TSP) è il seguente:

    <a id="eq-ILP-TSP"></a>

    \begin{align*}
    && \min \quad \sum_{i\in\mathscr{V}}\sum_{\substack{j\in\mathscr{V}\\j\neq i}}
    d_{ij}x_{ij} \label{obj:TSP} \tag{13.1a}\\[1ex]
    && \text{soggetto a}\quad \sum_{\substack{j\in\mathscr{V}\\j\neq i}}x_{ij}&=1,
    & \forall i\in\mathscr{V}, \label{out:TSP} \tag{13.1b}\\[1ex]
    && \sum_{\substack{i\in\mathscr{V}\\i\neq j}}x_{ij}&=1,
    & \forall j\in\mathscr{V}, \label{in:TSP} \tag{13.1c}\\[1ex]
    && u_i-u_j+(n-1)x_{ij}&\le n-2,
    & \forall i,j\in\mathscr{V}\setminus\{1\},~i\neq j, \label{MTZ:TSP} \tag{13.1d}\\[1ex]
    && x_{ij}&\in\{0,1\},
    & \forall(i,j)\in A, \label{bin:TSP} \tag{13.1e}\\[1ex]
    && 1\le u_i&\le n-1,
    & \forall i\in\mathscr{V}\setminus\{1\}. \label{pos:TSP} \tag{13.1f}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{MTZ}}$, o <strong>modello MTZ</strong>.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{MTZ}}$:

    - la funzione obiettivo lineare $\eqref{obj:TSP}$ minimizza la distanza totale percorsa dal giro;

    - i vincoli $\eqref{out:TSP}$ garantiscono che da ogni città esca esattamente un arco ($n$ vincoli lineari);

    - i vincoli $\eqref{in:TSP}$ garantiscono che in ogni città entri esattamente un arco ($n$ vincoli lineari);

    - i vincoli $\eqref{MTZ:TSP}$ collegano le variabili di arco con le variabili di posizione ed eliminano i sottogiri che non contengono la città $1$ ($(n-1)(n-2)$ vincoli lineari);

    - infine, i vincoli $\eqref{bin:TSP}$ e $\eqref{pos:TSP}$ definiscono le variabili del modello PLI.

<strong>Spiegazione del legame fra le variabili</strong>

- Per ogni coppia di città $i,j$ diverse dalla città $1$, se l'arco $(i,j)$ è percorso, allora la posizione della città $j$ supera di almeno un'unità la posizione della città $i$. Questa relazione logica è l'implicazione

    $$
    x_{ij}=1 ~~~\Longrightarrow~~~ u_j\ge u_i+1.
    $$

- La sua contronominale è

    $$
    u_j< u_i+1 ~~~\Longrightarrow~~~ x_{ij}=0.
    $$

    In particolare, un arco da una città verso una città nella stessa posizione o in una posizione precedente non può essere percorso.

- Entrambe le implicazioni sono imposte dai vincoli lineari $\eqref{MTZ:TSP}$. Se $x_{ij}=1$, allora il vincolo dà $u_i-u_j+(n-1)\le n-2$, ossia $u_j\ge u_i+1$.

- Viceversa, se $u_j<u_i+1$, allora il vincolo dà $(n-1)x_{ij}\le n-2+u_j-u_i<n-1$. Poiché $x_{ij}$ è binaria, questo impone $x_{ij}=0$.

- Quando $x_{ij}=0$, il vincolo diventa $u_i-u_j\le n-2$, che è sempre soddisfatto perché entrambe le posizioni appartengono a $[1,n-1]$. Di conseguenza, $n-1$ è il più piccolo coefficiente big-M possibile per questi bound.

<a id="box-1-prop-MTZ-subtours"></a>

!!! teorema "Proposizione 13.1: I vincoli MTZ eliminano i sottogiri"

    I vincoli $\eqref{out:TSP}$–$\eqref{pos:TSP}$ sono soddisfatti da una soluzione intera se e solo se i suoi archi selezionati formano un unico giro che passa per tutte le città.

??? dimostrazione "Dimostrazione"

    I vincoli $\eqref{out:TSP}$ e $\eqref{in:TSP}$ fanno degli archi selezionati una collezione di cicli orientati disgiunti nei vertici che coprono tutte le città. Supponiamo che uno di questi cicli non contenga la città $1$ e visiti, nell'ordine, $i_1,i_2,\dots,i_k$. Poiché ogni arco $(i_r,i_{r+1})$ è selezionato, l'implicazione precedente dà

    $$
    u_{i_{r+1}}\ge u_{i_r}+1
    \qquad r=1,\dots,k,
    $$

    dove $i_{k+1}=i_1$. Sommando le disuguaglianze otteniamo $u_{i_1}\ge u_{i_1}+k$, una contraddizione. Quindi nessun ciclo può evitare la città $1$, e la collezione è un unico giro.

    Viceversa, consideriamo un giro qualsiasi e facciamolo partire dalla città $1$. Per ogni città $i\neq1$, poniamo $u_i$ uguale alla posizione in cui la città $i$ è visitata dopo la partenza dalla città $1$. I bound $\eqref{pos:TSP}$ valgono. Se un arco selezionato $(i,j)$ ha $i,j\neq1$, allora la città $j$ segue immediatamente la città $i$, quindi $u_j=u_i+1$ e $\eqref{MTZ:TSP}$ vale. Se l'arco non è selezionato, il vincolo $\eqref{MTZ:TSP}$ vale grazie ai bound sulle posizioni. Quindi il giro definisce una soluzione intera ammissibile. <span class="qed">□</span>

<a id="box-2-ex-TSP-inst"></a>

!!! esempio "Esempio 13.1: Istanza del TSP"

    Consideriamo l'insieme $\mathscr{V}=\{1,2,3,4,5\}$ di $5$ città ($n=5$), con la matrice delle distanze

    $$
    \begin{array}{c|ccccc}
    \toprule
    d_{ij}&1&2&3&4&5\\
    \midrule
    1&-&5&2&2&9\\
    2&5&-&4&3&4\\
    3&2&4&-&4&7\\
    4&2&3&4&-&7\\
    5&9&4&7&7&-\\
    \bottomrule
    \end{array}
    $$

    È l'istanza dell'Esempio 6.1 del [Capitolo 6 «Problemi di routing»](../../problemi-di-ottimizzazione-combinatoria/tsp/index.md). Chiamiamo questa istanza del TSP <span style="color:#1971c2">[Esempio 13.1](#box-2-ex-TSP-inst)</span>.

<a id="box-3-ex-TSP-ILP"></a>

!!! esempio "Esempio 13.2: Modello $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{MTZ}}$"

    Il modello $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{MTZ}}$ per l'istanza del TSP dell'<span style="color:#1971c2">[Esempio 13.1](#box-2-ex-TSP-inst)</span> ha $20$ variabili di arco, $4$ variabili di posizione, $10$ vincoli di grado e $12$ vincoli $\eqref{MTZ:TSP}$:

    $$
    \begin{array}{rlcl}
    {\min} & {5\,x_{12}+2\,x_{13}+2\,x_{14}+9\,x_{15}+5\,x_{21}+4\,x_{23}+3\,x_{24}} &  &  \\
    & {+4\,x_{25}+2\,x_{31}+4\,x_{32}+4\,x_{34}+7\,x_{35}+2\,x_{41}+3\,x_{42}} &  &  \\
    & {+4\,x_{43}+7\,x_{45}+9\,x_{51}+4\,x_{52}+7\,x_{53}+7\,x_{54}} &  &  \\[1ex]
    \text{soggetto a} & {x_{12}+x_{13}+x_{14}+x_{15}} & {=} & {1} \\
    & {x_{21}+x_{23}+x_{24}+x_{25}} & {=} & {1} \\
    & {x_{31}+x_{32}+x_{34}+x_{35}} & {=} & {1} \\
    & {x_{41}+x_{42}+x_{43}+x_{45}} & {=} & {1} \\
    & {x_{51}+x_{52}+x_{53}+x_{54}} & {=} & {1} \\
    & {x_{21}+x_{31}+x_{41}+x_{51}} & {=} & {1} \\
    & {x_{12}+x_{32}+x_{42}+x_{52}} & {=} & {1} \\
    & {x_{13}+x_{23}+x_{43}+x_{53}} & {=} & {1} \\
    & {x_{14}+x_{24}+x_{34}+x_{54}} & {=} & {1} \\
    & {x_{15}+x_{25}+x_{35}+x_{45}} & {=} & {1} \\
    & {u_2-u_3+4\,x_{23}} & {\le} & {3} \\
    & {u_2-u_4+4\,x_{24}} & {\le} & {3} \\
    & {u_2-u_5+4\,x_{25}} & {\le} & {3} \\
    & {u_3-u_2+4\,x_{32}} & {\le} & {3} \\
    & {u_3-u_4+4\,x_{34}} & {\le} & {3} \\
    & {u_3-u_5+4\,x_{35}} & {\le} & {3} \\
    & {u_4-u_2+4\,x_{42}} & {\le} & {3} \\
    & {u_4-u_3+4\,x_{43}} & {\le} & {3} \\
    & {u_4-u_5+4\,x_{45}} & {\le} & {3} \\
    & {u_5-u_2+4\,x_{52}} & {\le} & {3} \\
    & {u_5-u_3+4\,x_{53}} & {\le} & {3} \\
    & {u_5-u_4+4\,x_{54}} & {\le} & {3} \\[1ex]
    & {x_{12},~x_{13},~x_{14},~\dots,~x_{54}} & {\in} & {\{0,1\}} \\
    & {u_2,~u_3,~u_4,~u_5} & {\ge} & {1} \\
    & {u_2,~u_3,~u_4,~u_5} & {\le} & {4}
    \end{array}
    $$

    Una soluzione ottima $(\tilde{\vet x},\tilde{\vet u})(\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{MTZ}})$ è:

    \begin{align*}
    &\tilde x_{13}=\tilde x_{35}=\tilde x_{52}=\tilde x_{24}=\tilde x_{41}=1,~~\text{tutte le altre } \tilde x_{ij}=0,\\
    &\tilde u_3=1,~~\tilde u_5=2,~~\tilde u_2=3,~~\tilde u_4=4
    \end{align*}

    Il valore ottimo $z(\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{MTZ}})$ è $18$. La soluzione ottima associata del TSP è il giro $\tilde\sigma=(1,3,5,2,4)$, di lunghezza $L(\tilde\sigma)=2+7+4+3+2=18$; è l'unico giro ottimo, a meno del verso di percorrenza.

## 13.4 Un modello con vincoli di eliminazione dei sottogiri (DFJ) { #sez-sec-tspf-DFJ }

- Il secondo modello usa solo le $n(n-1)$ variabili di arco $x_{ij}$ del modello MTZ: non ci sono variabili di posizione. I sottogiri sono vietati direttamente, con un vincolo per ogni sottoinsieme di città.

!!! chiave ""

    Usando queste variabili, un secondo modello di programmazione lineare intera (PLI) per il problema del commesso viaggiatore (TSP) è il seguente:

    <a id="eq-ILP-TSP-DFJ"></a>

    \begin{align*}
    && \min \quad \sum_{i\in\mathscr{V}}\sum_{\substack{j\in\mathscr{V}\\j\neq i}}
    d_{ij}x_{ij} \label{obj:TSP-DFJ} \tag{13.2a}\\[1ex]
    && \text{soggetto a}\quad \sum_{\substack{j\in\mathscr{V}\\j\neq i}}x_{ij}&=1,
    & \forall i\in\mathscr{V}, \label{out:TSP-DFJ} \tag{13.2b}\\[1ex]
    && \sum_{\substack{i\in\mathscr{V}\\i\neq j}}x_{ij}&=1,
    & \forall j\in\mathscr{V}, \label{in:TSP-DFJ} \tag{13.2c}\\[1ex]
    && \sum_{i\in S}\sum_{\substack{j\in S\\j\neq i}}x_{ij}&\le |S|-1,
    & \forall S\subseteq\mathscr{V}\setminus\{1\},~|S|\ge2, \label{SEC:TSP} \tag{13.2d}\\[1ex]
    && x_{ij}&\in\{0,1\},
    & \forall(i,j)\in A. \label{bin:TSP-DFJ} \tag{13.2e}
    \end{align*}

    Questo modello PLI si chiama modello $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{DFJ}}$, o <strong>modello DFJ</strong>.

- Descrizione della funzione obiettivo e dei vincoli del modello $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{DFJ}}$:

    - la funzione obiettivo $\eqref{obj:TSP-DFJ}$ e i vincoli di grado $\eqref{out:TSP-DFJ}$ e $\eqref{in:TSP-DFJ}$ sono quelli del modello MTZ;

    - i vincoli $\eqref{SEC:TSP}$ si chiamano <strong>vincoli di eliminazione dei sottogiri</strong>: un giro non può contenere tutti gli $|S|$ archi di un ciclo sulle città di $S$, quindi usa al più $|S|-1$ archi dentro $S$ ($2^{n-1}-n$ vincoli lineari);

    - infine, i vincoli $\eqref{bin:TSP-DFJ}$ definiscono le variabili del modello PLI.

- Il numero $2^{n-1}-n$ dei vincoli $\eqref{SEC:TSP}$ è esponenziale in $n$: per $n=5$ sono $11$, per $n=20$ sono $524\,268$.

<a id="box-4-prop-DFJ-subtours"></a>

!!! teorema "Proposizione 13.2: Vincoli di eliminazione dei sottogiri"

    I vincoli $\eqref{out:TSP-DFJ}$–$\eqref{bin:TSP-DFJ}$ sono soddisfatti da una soluzione intera se e solo se i suoi archi selezionati formano un unico giro che passa per tutte le città.

??? dimostrazione "Dimostrazione"

    Sia dato un giro e sia $S\subseteq\mathscr{V}\setminus\{1\}$ con $|S|\ge2$. Se il giro usasse $|S|$ archi dentro $S$, questi archi formerebbero un ciclo sulle città di $S$, che non è l'intero giro perché $1\notin S$: una contraddizione. Quindi $\eqref{SEC:TSP}$ vale, e i vincoli di grado valgono per definizione di giro.

    Viceversa, i vincoli $\eqref{out:TSP-DFJ}$ e $\eqref{in:TSP-DFJ}$ fanno degli archi selezionati una collezione di cicli orientati disgiunti nei vertici. Se ci fosse più di un ciclo, uno di essi non conterrebbe la città $1$. Sia $S$ l'insieme delle sue città: allora $|S|\ge2$ e il ciclo usa $|S|$ archi dentro $S$, il che viola $\eqref{SEC:TSP}$. Quindi c'è un unico ciclo, un giro. <span class="qed">□</span>

<a id="box-5-ex-TSP-DFJ"></a>

!!! esempio "Esempio 13.3: Modello $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{DFJ}}$"

    Il modello $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{DFJ}}$ per l'istanza del TSP dell'<span style="color:#1971c2">[Esempio 13.1](#box-2-ex-TSP-inst)</span> ha $20$ variabili di arco, $10$ vincoli di grado e $11$ vincoli $\eqref{SEC:TSP}$, uno per ogni sottoinsieme $S\subseteq\{2,3,4,5\}$ con almeno due città:

    $$
    \begin{array}{rlcl}
    {\min} & {5\,x_{12}+2\,x_{13}+2\,x_{14}+9\,x_{15}+5\,x_{21}+4\,x_{23}+3\,x_{24}} &  &  \\
    & {+4\,x_{25}+2\,x_{31}+4\,x_{32}+4\,x_{34}+7\,x_{35}+2\,x_{41}+3\,x_{42}} &  &  \\
    & {+4\,x_{43}+7\,x_{45}+9\,x_{51}+4\,x_{52}+7\,x_{53}+7\,x_{54}} &  &  \\[1ex]
    \text{soggetto a} & {x_{12}+x_{13}+x_{14}+x_{15}} & {=} & {1} \\
    & {x_{21}+x_{23}+x_{24}+x_{25}} & {=} & {1} \\
    & {x_{31}+x_{32}+x_{34}+x_{35}} & {=} & {1} \\
    & {x_{41}+x_{42}+x_{43}+x_{45}} & {=} & {1} \\
    & {x_{51}+x_{52}+x_{53}+x_{54}} & {=} & {1} \\
    & {x_{21}+x_{31}+x_{41}+x_{51}} & {=} & {1} \\
    & {x_{12}+x_{32}+x_{42}+x_{52}} & {=} & {1} \\
    & {x_{13}+x_{23}+x_{43}+x_{53}} & {=} & {1} \\
    & {x_{14}+x_{24}+x_{34}+x_{54}} & {=} & {1} \\
    & {x_{15}+x_{25}+x_{35}+x_{45}} & {=} & {1} \\
    & {x_{23}+x_{32}} & {\le} & {1} \\
    & {x_{24}+x_{42}} & {\le} & {1} \\
    & {x_{25}+x_{52}} & {\le} & {1} \\
    & {x_{34}+x_{43}} & {\le} & {1} \\
    & {x_{35}+x_{53}} & {\le} & {1} \\
    & {x_{45}+x_{54}} & {\le} & {1} \\
    & {x_{23}+x_{24}+x_{32}+x_{34}+x_{42}+x_{43}} & {\le} & {2} \\
    & {x_{23}+x_{25}+x_{32}+x_{35}+x_{52}+x_{53}} & {\le} & {2} \\
    & {x_{24}+x_{25}+x_{42}+x_{45}+x_{52}+x_{54}} & {\le} & {2} \\
    & {x_{34}+x_{35}+x_{43}+x_{45}+x_{53}+x_{54}} & {\le} & {2} \\
    & {x_{23}+x_{24}+x_{25}+x_{32}+x_{34}+x_{35}+x_{42}+x_{43}+x_{45}+x_{52}+x_{53}+x_{54}} & {\le} & {3} \\[1ex]
    & {x_{12},~x_{13},~x_{14},~\dots,~x_{54}} & {\in} & {\{0,1\}}
    \end{array}
    $$

    Il sottogiro $2\to5\to2$ insieme al sottogiro $1\to3\to4\to1$ soddisfa i vincoli di grado ma viola il vincolo $x_{25}+x_{52}\le1$ di $S=\{2,5\}$. Una soluzione ottima $\tilde{\vet x}(\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{DFJ}})$ è il giro $\tilde\sigma=(1,3,5,2,4)$:

    $$
    \tilde x_{13}=\tilde x_{35}=\tilde x_{52}=\tilde x_{24}=\tilde x_{41}=1,~~\text{tutte le altre } \tilde x_{ij}=0
    $$

    Il valore ottimo $z(\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{DFJ}})$ è $18$.

## 13.5 Rilassamenti lineari { #sez-sec-tspf-LP }

### 13.5.1 Il rilassamento di assegnamento

!!! chiave ""

    Tenendo solo i vincoli di grado dei due modelli e rilassando i vincoli di binarietà in vincoli di non negatività, otteniamo il seguente modello LP:

    <a id="eq-LP0-TSP"></a>

    \begin{align*}
    && \min \quad \sum_{i\in\mathscr{V}}\sum_{\substack{j\in\mathscr{V}\\j\neq i}}
    d_{ij}x_{ij} \label{obj:LP0-TSP} \tag{13.3a}\\[1ex]
    && \text{soggetto a}\quad \sum_{\substack{j\in\mathscr{V}\\j\neq i}}x_{ij}&=1,
    & \forall i\in\mathscr{V}, \label{out:LP0-TSP} \tag{13.3b}\\[1ex]
    && \sum_{\substack{i\in\mathscr{V}\\i\neq j}}x_{ij}&=1,
    & \forall j\in\mathscr{V}, \label{in:LP0-TSP} \tag{13.3c}\\[1ex]
    && x_{ij}&\ge 0,
    & \forall(i,j)\in A. \label{nonneg:LP0-TSP} \tag{13.3d}
    \end{align*}

    Questo modello LP si chiama modello $\mathrm{LP}\text{-}0_{\mathrm{TSP}}$, o <strong>rilassamento di assegnamento</strong>.

- Aggiungere gli upper bound $x_{ij}\le1$ non cambia questo rilassamento, né i due rilassamenti seguenti: per ogni arco $(i,j)$, la non negatività e l'equazione di grado $\eqref{out:LP0-TSP}$ danno

    $$
    x_{ij}\le \sum_{\substack{k\in\mathscr{V}\\k\neq i}}x_{ik}=1.
    $$

<a id="box-6-ex-TSP-LP0"></a>

!!! esempio "Esempio 13.4: Modello $\mathrm{LP}\text{-}0_{\mathrm{TSP}}$"

    Il modello $\mathrm{LP}\text{-}0_{\mathrm{TSP}}$ per l'istanza del TSP dell'<span style="color:#1971c2">[Esempio 13.1](#box-2-ex-TSP-inst)</span> è:

    $$
    \begin{array}{rlcl}
    {\min} & {5\,x_{12}+2\,x_{13}+2\,x_{14}+9\,x_{15}+5\,x_{21}+4\,x_{23}+3\,x_{24}} &  &  \\
    & {+4\,x_{25}+2\,x_{31}+4\,x_{32}+4\,x_{34}+7\,x_{35}+2\,x_{41}+3\,x_{42}} &  &  \\
    & {+4\,x_{43}+7\,x_{45}+9\,x_{51}+4\,x_{52}+7\,x_{53}+7\,x_{54}} &  &  \\[1ex]
    \text{soggetto a} & {x_{12}+x_{13}+x_{14}+x_{15}} & {=} & {1} \\
    & {x_{21}+x_{23}+x_{24}+x_{25}} & {=} & {1} \\
    & {x_{31}+x_{32}+x_{34}+x_{35}} & {=} & {1} \\
    & {x_{41}+x_{42}+x_{43}+x_{45}} & {=} & {1} \\
    & {x_{51}+x_{52}+x_{53}+x_{54}} & {=} & {1} \\
    & {x_{21}+x_{31}+x_{41}+x_{51}} & {=} & {1} \\
    & {x_{12}+x_{32}+x_{42}+x_{52}} & {=} & {1} \\
    & {x_{13}+x_{23}+x_{43}+x_{53}} & {=} & {1} \\
    & {x_{14}+x_{24}+x_{34}+x_{54}} & {=} & {1} \\
    & {x_{15}+x_{25}+x_{35}+x_{45}} & {=} & {1} \\[1ex]
    & {x_{12},~x_{13},~x_{14},~\dots,~x_{54}} & {\ge} & {0}
    \end{array}
    $$

    Una soluzione ottima $\tilde{\vet x}(\mathrm{LP}\text{-}0_{\mathrm{TSP}})$ è:

    $$
    \tilde x_{13}=\tilde x_{34}=\tilde x_{41}=\tilde x_{25}=\tilde x_{52}=1,~~\text{tutte le altre } \tilde x_{ij}=0
    $$

    È intera, ma è formata dai due sottogiri $1\to3\to4\to1$ e $2\to5\to2$. Il valore ottimo $z(\mathrm{LP}\text{-}0_{\mathrm{TSP}})$ è $16$. Di conseguenza, abbiamo il lower bound:

    $$
    16 \le z(\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{MTZ}}) = z(\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{DFJ}})
    $$

### 13.5.2 Il rilassamento del modello MTZ

!!! chiave ""

    Per ottenere un rilassamento lineare del modello $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{MTZ}}$, rilassiamo i vincoli $\eqref{bin:TSP}$ in vincoli di non negatività; le variabili di posizione mantengono i loro bound. Il modello LP ottenuto è il seguente:

    <a id="eq-LP-TSP-MTZ"></a>

    \begin{align*}
    && \min \quad \sum_{i\in\mathscr{V}}\sum_{\substack{j\in\mathscr{V}\\j\neq i}}
    d_{ij}x_{ij} \label{obj:LP-MTZ} \tag{13.4a}\\[1ex]
    && \text{soggetto a}\quad \sum_{\substack{j\in\mathscr{V}\\j\neq i}}x_{ij}&=1,
    & \forall i\in\mathscr{V}, \label{out:LP-MTZ} \tag{13.4b}\\[1ex]
    && \sum_{\substack{i\in\mathscr{V}\\i\neq j}}x_{ij}&=1,
    & \forall j\in\mathscr{V}, \label{in:LP-MTZ} \tag{13.4c}\\[1ex]
    && u_i-u_j+(n-1)x_{ij}&\le n-2,
    & \forall i,j\in\mathscr{V}\setminus\{1\},~i\neq j, \label{MTZ:LP-MTZ} \tag{13.4d}\\[1ex]
    && x_{ij}&\ge 0,
    & \forall(i,j)\in A, \label{nonneg:LP-MTZ} \tag{13.4e}\\[1ex]
    && 1\le u_i&\le n-1,
    & \forall i\in\mathscr{V}\setminus\{1\}. \label{pos:LP-MTZ} \tag{13.4f}
    \end{align*}

    Questo modello LP si chiama modello $\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}}$.

<a id="box-7-prop-MTZ-weak"></a>

!!! teorema "Proposizione 13.3: Una regione debole del rilassamento MTZ"

    Sia $(x,u)$ tale da soddisfare le equazioni di grado $\eqref{out:LP-MTZ}$–$\eqref{in:LP-MTZ}$, con $x_{ij}\ge0$. Se

    $$
    x_{ij}\le\frac{n-2}{n-1}
    \qquad \forall i,j\in\mathscr{V}\setminus\{1\},~i\neq j,
    $$

    allora $(x,u)$ è ammissibile per $\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}}$ dopo aver posto $u_i=1$ per ogni $i\neq1$.

??? dimostrazione "Dimostrazione"

    Con $u_i=u_j=1$, ogni vincolo $\eqref{MTZ:LP-MTZ}$ diventa

    $$
    (n-1)x_{ij}\le n-2,
    $$

    che è esattamente l'upper bound assunto. Anche i bound $\eqref{pos:LP-MTZ}$ sulle variabili di posizione valgono. <span class="qed">□</span>

- La proposizione mostra perché la formulazione compatta MTZ può avere un lower bound debole: molte soluzioni frazionarie del rilassamento di assegnamento soddisfano già i vincoli di ordinamento.

<a id="box-8-ex-TSP-LPMTZ"></a>

!!! esempio "Esempio 13.5: Modello $\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}}$"

    Il modello $\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}}$ per l'istanza del TSP dell'<span style="color:#1971c2">[Esempio 13.1](#box-2-ex-TSP-inst)</span> è:

    $$
    \begin{array}{rlcl}
    {\min} & {5\,x_{12}+2\,x_{13}+2\,x_{14}+9\,x_{15}+5\,x_{21}+4\,x_{23}+3\,x_{24}} &  &  \\
    & {+4\,x_{25}+2\,x_{31}+4\,x_{32}+4\,x_{34}+7\,x_{35}+2\,x_{41}+3\,x_{42}} &  &  \\
    & {+4\,x_{43}+7\,x_{45}+9\,x_{51}+4\,x_{52}+7\,x_{53}+7\,x_{54}} &  &  \\[1ex]
    \text{soggetto a} & {x_{12}+x_{13}+x_{14}+x_{15}} & {=} & {1} \\
    & {x_{21}+x_{23}+x_{24}+x_{25}} & {=} & {1} \\
    & {x_{31}+x_{32}+x_{34}+x_{35}} & {=} & {1} \\
    & {x_{41}+x_{42}+x_{43}+x_{45}} & {=} & {1} \\
    & {x_{51}+x_{52}+x_{53}+x_{54}} & {=} & {1} \\
    & {x_{21}+x_{31}+x_{41}+x_{51}} & {=} & {1} \\
    & {x_{12}+x_{32}+x_{42}+x_{52}} & {=} & {1} \\
    & {x_{13}+x_{23}+x_{43}+x_{53}} & {=} & {1} \\
    & {x_{14}+x_{24}+x_{34}+x_{54}} & {=} & {1} \\
    & {x_{15}+x_{25}+x_{35}+x_{45}} & {=} & {1} \\
    & {u_2-u_3+4\,x_{23}} & {\le} & {3} \\
    & {u_2-u_4+4\,x_{24}} & {\le} & {3} \\
    & {u_2-u_5+4\,x_{25}} & {\le} & {3} \\
    & {u_3-u_2+4\,x_{32}} & {\le} & {3} \\
    & {u_3-u_4+4\,x_{34}} & {\le} & {3} \\
    & {u_3-u_5+4\,x_{35}} & {\le} & {3} \\
    & {u_4-u_2+4\,x_{42}} & {\le} & {3} \\
    & {u_4-u_3+4\,x_{43}} & {\le} & {3} \\
    & {u_4-u_5+4\,x_{45}} & {\le} & {3} \\
    & {u_5-u_2+4\,x_{52}} & {\le} & {3} \\
    & {u_5-u_3+4\,x_{53}} & {\le} & {3} \\
    & {u_5-u_4+4\,x_{54}} & {\le} & {3} \\[1ex]
    & {x_{12},~x_{13},~x_{14},~\dots,~x_{54}} & {\ge} & {0} \\
    & {u_2,~u_3,~u_4,~u_5} & {\ge} & {1} \\
    & {u_2,~u_3,~u_4,~u_5} & {\le} & {4}
    \end{array}
    $$

    Una soluzione ottima $(\tilde{\vet x},\tilde{\vet u})(\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}})$ è:

    \begin{align*}
    &\tilde x_{13}=1,~~\tilde x_{31}=\tilde x_{34}=\tilde x_{41}=\frac{1}{2},~~\tilde x_{25}=\tilde x_{52}=\frac{3}{4},\\
    &\tilde x_{24}=\tilde x_{42}=\tilde x_{45}=\tilde x_{54}=\frac{1}{4},~~\text{tutte le altre } \tilde x_{ij}=0,\\
    &\tilde u_2=\tilde u_3=\tilde u_4=\tilde u_5=1
    \end{align*}

    Tutti gli archi fra le città $2,3,4,5$ hanno valore al più $\frac{3}{4}=\frac{n-2}{n-1}$, come nella [Proposizione 13.3](#box-7-prop-MTZ-weak). Il valore ottimo $z(\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}})$ è $17$. Di conseguenza, abbiamo il lower bound:

    $$
    17 \le z(\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{MTZ}})
    $$

### 13.5.3 Il rilassamento del modello DFJ

!!! chiave ""

    Per ottenere un rilassamento lineare del modello $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{DFJ}}$, rilassiamo i vincoli $\eqref{bin:TSP-DFJ}$ in vincoli di non negatività. Il modello LP ottenuto è il seguente:

    <a id="eq-LP-TSP-DFJ"></a>

    \begin{align*}
    && \min \quad \sum_{i\in\mathscr{V}}\sum_{\substack{j\in\mathscr{V}\\j\neq i}}
    d_{ij}x_{ij} \label{obj:LP-DFJ} \tag{13.5a}\\[1ex]
    && \text{soggetto a}\quad \sum_{\substack{j\in\mathscr{V}\\j\neq i}}x_{ij}&=1,
    & \forall i\in\mathscr{V}, \label{out:LP-DFJ} \tag{13.5b}\\[1ex]
    && \sum_{\substack{i\in\mathscr{V}\\i\neq j}}x_{ij}&=1,
    & \forall j\in\mathscr{V}, \label{in:LP-DFJ} \tag{13.5c}\\[1ex]
    && \sum_{i\in S}\sum_{\substack{j\in S\\j\neq i}}x_{ij}&\le |S|-1,
    & \forall S\subseteq\mathscr{V}\setminus\{1\},~|S|\ge2, \label{SEC:LP-DFJ} \tag{13.5d}\\[1ex]
    && x_{ij}&\ge 0,
    & \forall(i,j)\in A. \label{nonneg:LP-DFJ} \tag{13.5e}
    \end{align*}

    Questo modello LP si chiama modello $\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{DFJ}}$.

- Il modello MTZ è prezioso perché ha solo $O(n^2)$ variabili e vincoli. Il modello DFJ ha un rilassamento più forte, ma un numero esponenziale di vincoli: in pratica, i vincoli di eliminazione dei sottogiri si aggiungono solo quando sono violati dalla soluzione corrente del rilassamento.

<a id="box-9-ex-TSP-LPDFJ"></a>

!!! esempio "Esempio 13.6: Modello $\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{DFJ}}$"

    Il modello $\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{DFJ}}$ per l'istanza del TSP dell'<span style="color:#1971c2">[Esempio 13.1](#box-2-ex-TSP-inst)</span> è:

    $$
    \begin{array}{rlcl}
    {\min} & {5\,x_{12}+2\,x_{13}+2\,x_{14}+9\,x_{15}+5\,x_{21}+4\,x_{23}+3\,x_{24}} &  &  \\
    & {+4\,x_{25}+2\,x_{31}+4\,x_{32}+4\,x_{34}+7\,x_{35}+2\,x_{41}+3\,x_{42}} &  &  \\
    & {+4\,x_{43}+7\,x_{45}+9\,x_{51}+4\,x_{52}+7\,x_{53}+7\,x_{54}} &  &  \\[1ex]
    \text{soggetto a} & {x_{12}+x_{13}+x_{14}+x_{15}} & {=} & {1} \\
    & {x_{21}+x_{23}+x_{24}+x_{25}} & {=} & {1} \\
    & {x_{31}+x_{32}+x_{34}+x_{35}} & {=} & {1} \\
    & {x_{41}+x_{42}+x_{43}+x_{45}} & {=} & {1} \\
    & {x_{51}+x_{52}+x_{53}+x_{54}} & {=} & {1} \\
    & {x_{21}+x_{31}+x_{41}+x_{51}} & {=} & {1} \\
    & {x_{12}+x_{32}+x_{42}+x_{52}} & {=} & {1} \\
    & {x_{13}+x_{23}+x_{43}+x_{53}} & {=} & {1} \\
    & {x_{14}+x_{24}+x_{34}+x_{54}} & {=} & {1} \\
    & {x_{15}+x_{25}+x_{35}+x_{45}} & {=} & {1} \\
    & {x_{23}+x_{32}} & {\le} & {1} \\
    & {x_{24}+x_{42}} & {\le} & {1} \\
    & {x_{25}+x_{52}} & {\le} & {1} \\
    & {x_{34}+x_{43}} & {\le} & {1} \\
    & {x_{35}+x_{53}} & {\le} & {1} \\
    & {x_{45}+x_{54}} & {\le} & {1} \\
    & {x_{23}+x_{24}+x_{32}+x_{34}+x_{42}+x_{43}} & {\le} & {2} \\
    & {x_{23}+x_{25}+x_{32}+x_{35}+x_{52}+x_{53}} & {\le} & {2} \\
    & {x_{24}+x_{25}+x_{42}+x_{45}+x_{52}+x_{54}} & {\le} & {2} \\
    & {x_{34}+x_{35}+x_{43}+x_{45}+x_{53}+x_{54}} & {\le} & {2} \\
    & {x_{23}+x_{24}+x_{25}+x_{32}+x_{34}+x_{35}+x_{42}+x_{43}+x_{45}+x_{52}+x_{53}+x_{54}} & {\le} & {3} \\[1ex]
    & {x_{12},~x_{13},~x_{14},~\dots,~x_{54}} & {\ge} & {0}
    \end{array}
    $$

    Una soluzione ottima $\tilde{\vet x}(\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{DFJ}})$ è il giro $\tilde\sigma=(1,3,5,2,4)$:

    $$
    \tilde x_{13}=\tilde x_{35}=\tilde x_{52}=\tilde x_{24}=\tilde x_{41}=1,~~\text{tutte le altre } \tilde x_{ij}=0
    $$

    Il valore ottimo $z(\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{DFJ}})$ è $18$: su questa istanza il rilassamento chiude il gap.

<a id="box-10-ex-TSP-LP"></a>

!!! esempio "Esempio 13.7: Confronto fra i rilassamenti"

    Per l'istanza del TSP dell'<span style="color:#1971c2">[Esempio 13.1](#box-2-ex-TSP-inst)</span>, i tre rilassamenti danno i seguenti lower bound sul valore ottimo $18$:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Rilassamento</th>
    <th>Valore ottimo</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\mathrm{LP}\text{-}0_{\mathrm{TSP}}\)</span> (rilassamento di assegnamento)</td>
    <td><span class="arithmatex">\(16\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}}\)</span></td>
    <td><span class="arithmatex">\(17\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{DFJ}}\)</span></td>
    <td><span class="arithmatex">\(18\)</span></td>
    </tr>
    </table></div>

    I vincoli di ordinamento alzano il bound da $16$ a $17$; i vincoli di eliminazione dei sottogiri chiudono il gap su questa istanza.

---

**Avanti:** [13.6 Modelli PLI per il TSP metrico e asimmetrico](modelli-pli-per-il-tsp-metrico-e-asimmetrico.md)
