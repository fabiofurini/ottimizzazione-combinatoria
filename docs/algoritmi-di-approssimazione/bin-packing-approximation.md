---
title: "Algoritmi di approssimazione per il bin packing"
---

# Algoritmi di approssimazione per il bin packing

<div class="info-capitolo" markdown>

**Parte 5 · Algoritmi di approssimazione · Capitolo 36** · [:material-file-pdf-box: Dispensa, volume 5 (PDF)](../pdf/dispensa-5-algoritmi-di-approssimazione.pdf) · [:material-presentation: Slide](../pdf/slide-bin-packing-approximation.pdf) · [:material-pencil: Esercizi: Bin packing (BPP)](../esercizi/bin-packing-approximation.md) · [:material-gesture-tap: App: Istanze tight](../laboratorio/istanze-tight.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, il capitolo [«Principi degli algoritmi di approssimazione»](approximation.md): rapporto di prestazione, garanzia di prestazione relativa, garanzia tight e rapporto di prestazione nel caso peggiore $r(\mathscr{A})$.

    - Da questo modulo, il capitolo [«Problemi di packing»](../problemi-di-ottimizzazione-combinatoria/bin-packing/index.md): il BPP, le sue istanze e il lower bound di conteggio $\left\lceil \frac{\sum_{i\in\mathscr{I}} w_i}{c} \right\rceil$ sul valore ottimo.

    - Da questo modulo, il capitolo [«Euristiche costruttive»](../algoritmi-euristici/constructive-heuristics/index.md): algoritmi euristici che costruiscono una soluzione un oggetto alla volta.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo saremo in grado di:

    - eseguire a mano gli algoritmi Next Fit, First Fit, Best Fit e Worst Fit, e scrivere l'assegnamento oggetto-contenitore e il numero di contenitori;

    - decidere se un algoritmo appartiene alla classe Any Fit, e se una soluzione soddisfa la proprietà di riempimento a metà;

    - dimostrare che Next Fit e ogni algoritmo Any Fit hanno una garanzia di prestazione relativa pari a $2$;

    - descrivere le famiglie di istanze che rendono tight la garanzia $2$ per Next Fit e Worst Fit, ed enunciare il rapporto nel caso peggiore $\frac{17}{10}$ di First Fit e Best Fit;

    - eseguire i quattro algoritmi in Python e in <code>C++</code>, nei notebook Colab del capitolo.

Il problema di questo capitolo è il [problema del bin packing (BPP)](../problemi-di-ottimizzazione-combinatoria/bin-packing/il-problema-del-bin-packing.md): la sua definizione e le sue ipotesi sono nella sua pagina.

## 36.1 Notazione

- Come nella pagina del problema, $c$ è la capacità dei contenitori e $\mathscr{I}=\{1,2,\dots,n\}$ l'insieme degli oggetti; in questo capitolo l'oggetto $i\in\mathscr{I}$ ha peso $w_i$.

- Una <strong>soluzione ammissibile del BPP</strong> è una partizione di $\mathscr{I}$ in <strong>schemi di carico</strong> (di impacchettamento) non vuoti, cioè sottoinsiemi di oggetti assegnati ciascuno a un contenitore, tali che il peso totale di ogni schema di carico non superi la capacità $c$ dei contenitori.

- Indichiamo con $z(I)$ il <strong>valore ottimo</strong> del BPP sull'istanza $I$, cioè il numero minimo di contenitori, e con $\mathscr{A}(I)$ il numero di contenitori usati dalla soluzione ammissibile restituita da un algoritmo euristico $\mathscr{A}$. Poiché ogni algoritmo euristico di questo capitolo restituisce una soluzione ammissibile,

    $$
    \mathscr{A}(I) \ge z(I) ~~~~~~~\text{e}~~~~~~~ \frac{\mathscr{A}(I)}{z(I)} \ge 1
    $$

    per ogni istanza $I$ del BPP.

## 36.2 Next Fit { #sez-sec-NF }

!!! chiave ""

    Il <em>Next Fit Algorithm</em> (indicato con NF) è un'euristica costruttiva per il BPP. Esamina gli oggetti nell'ordine in cui sono dati nell'istanza, mantenendo in ogni momento esattamente un contenitore aperto. Per ogni oggetto, NF lo pone nel contenitore aperto se vi entra; altrimenti chiude il contenitore, ne apre uno nuovo, e vi pone l'oggetto.

- <strong>Struttura dati per la soluzione.</strong> Usiamo un vettore $bin=(bin_1,bin_2,\dots,bin_n)$ di lunghezza $n$ per memorizzare la soluzione. In posizione $i$, il vettore contiene il numero del contenitore a cui è assegnato l'oggetto $i$. Più formalmente:

    $$
    bin_i = b \quad \Longleftrightarrow \quad \text{l'oggetto } i \text{ è posto nel contenitore } b.
    $$

    Per esempio, se $bin_3 = 2$, l'oggetto $3$ è assegnato al contenitore $2$. Inoltre, manteniamo una variabile $nb$ che memorizza il numero totale di contenitori usati, cioè alla fine dell'algoritmo $NF(I) = nb$.

- Lo pseudocodice di NF è il seguente:

!!! algoritmo "Algoritmo: Next Fit"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> istanza del BPP <span class="arithmatex">\(I\)</span> con <span class="arithmatex">\(n\)</span> oggetti, pesi <span class="arithmatex">\(w[1..n]\)</span>, capacità <span class="arithmatex">\(c\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> assegnamento oggetto-contenitore <span class="arithmatex">\(bin[1..n]\)</span> e numero di contenitori usati <span class="arithmatex">\(nb\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> NextFit(<span class="arithmatex">\(n, w, c\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(bin := \text{nuovo vettore}[1..n]\)</span>
    <span class="arithmatex">\(nb := 1\)</span> 
    <span class="arithmatex">\(rc := c\)</span> <span class="pc-com">▹ assegnamento oggetto-contenitore contenitore corrente capacità residua</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(i := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><strong>if</strong> <span class="arithmatex">\(w[i] > rc\)</span> <strong>then</strong></div><div class="pc" style="--liv:3"><span class="pc-n">5</span><span class="arithmatex">\(nb \leftarrow nb + 1\)</span> 
    <span class="arithmatex">\(rc \leftarrow c\)</span> <span class="pc-com">▹ aprire un nuovo contenitore</span></div><div class="pc" style="--liv:2"><span class="pc-n">6</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">7</span><span class="arithmatex">\(bin[i] \leftarrow nb\)</span> 
    <span class="arithmatex">\(rc \leftarrow rc - w[i]\)</span> <span class="pc-com">▹ assegnare l'oggetto al contenitore</span></div><div class="pc" style="--liv:1"><span class="pc-n">8</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">9</span><strong>return</strong> <span class="arithmatex">\(bin\)</span>, <span class="arithmatex">\(nb\)</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/bin-packing-approximation_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/bin-packing-approximation_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

<a id="box-1-ex-NFexec1"></a>

!!! esempio "Esempio 36.1: Esecuzione di NF"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n = 5$), con i seguenti pesi degli oggetti:

    $$
    \begin{array}{l|ccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} \\[1ex]
    \hline {w_i} & {6} & {5} & {4} & {7} & {3} \\[1ex]
    \hline
    \end{array}
    $$

    Inizialmente $nb:=1$, $rc:=c$. L'algoritmo NF produce la seguente soluzione ammissibile:

    1. Oggetto $1$ (peso $w[1]=6$): $w[1]=6\le rc=10$, quindi non si apre un nuovo contenitore. L'oggetto $1$ è posto nel contenitore $nb=1$, e $rc\leftarrow 10-6=4$.

    2. Oggetto $2$ (peso $w[2]=5$): $w[2]=5>rc=4$, quindi $nb\leftarrow 2$ e $rc\leftarrow c=10$. L'oggetto $2$ è posto nel contenitore $nb=2$, e $rc\leftarrow 10-5=5$.

    3. Oggetto $3$ (peso $w[3]=4$): $w[3]=4\le rc=5$, quindi non si apre un nuovo contenitore. L'oggetto $3$ è posto nel contenitore $nb=2$, e $rc\leftarrow 5-4=1$.

    4. Oggetto $4$ (peso $w[4]=7$): $w[4]=7>rc=1$, quindi $nb\leftarrow 3$ e $rc\leftarrow c=10$. L'oggetto $4$ è posto nel contenitore $nb=3$, e $rc\leftarrow 10-7=3$.

    5. Oggetto $5$ (peso $w[5]=3$): $w[5]=3\le rc=3$, quindi non si apre un nuovo contenitore. L'oggetto $5$ è posto nel contenitore $nb=3$, e $rc\leftarrow 3-3=0$.

    Quindi NF restituisce:

    $$
    bin = \begin{pmatrix} 1 & 2 & 2 & 3 & 3 \end{pmatrix},
    \qquad
    nb=3.
    $$

    e quindi

    $$
    NF(I)=nb=3.
    $$

- Dato l'output di un algoritmo, cioè il vettore $bin=(bin_1,bin_2,\dots,bin_n)$ e il numero di contenitori $nb$, possiamo ottenere lo <strong>schema di carico</strong> $P_b$ di ogni contenitore $b$, cioè l'insieme degli oggetti assegnati a esso, come segue:

    $$
    P_b = \big\{~ i \in \{1,2,\dots,n\} : bin_i = b ~\big\}, \qquad \text{per } b \in \{1,2,\dots,nb\}.
    $$

    In altre parole, $P_b$ è l'insieme di tutti gli oggetti $i$ tali che $bin_i = b$; $P_b$ è lo schema di carico del contenitore $b$, non il contenitore stesso.

<a id="box-2-exsubsets"></a>

!!! esempio "Esempio 36.2: Pattern dal vettore bin"

    Consideriamo l'istanza dell'esempio precedente, su cui NF restituisce:

    $$
    bin = \begin{pmatrix} 1 & 2 & 2 & 3 & 3 \end{pmatrix}, \qquad nb = 3.
    $$

    Gli schemi di carico sono:

    \begin{align*}
    P_1 &= \{ i \in \{1,2,3,4,5\} : bin_i = 1 \} = \{1\}, \\
    P_2 &= \{ i \in \{1,2,3,4,5\} : bin_i = 2 \} = \{2,3\}, \\
    P_3 &= \{ i \in \{1,2,3,4,5\} : bin_i = 3 \} = \{4,5\}.
    \end{align*}

    Sono esattamente gli insiemi di oggetti posti nei contenitori costruiti dall'algoritmo:

    - Il contenitore $1$ contiene l'oggetto $1$ con peso $w_1=6$;

    - Il contenitore $2$ contiene gli oggetti $2$ e $3$ con peso totale $w_2+w_3=5+4=9$;

    - Il contenitore $3$ contiene gli oggetti $4$ e $5$ con peso totale $w_4+w_5=7+3=10$.

## 36.3 La classe Any Fit { #sez-sec-AF }

!!! chiave ""

    Un'euristica costruttiva per il BPP che mantiene tutti i contenitori aperti finora, e apre un nuovo contenitore <em>solo quando</em> l'oggetto corrente non entra in nessuno di essi, si chiama <em>Any Fit Algorithm</em> (indicato con AF). Any Fit non è quindi un singolo algoritmo ma una <em>famiglia</em> di algoritmi: ciò che la condizione lascia libero è la regola con cui scegliere un contenitore fra quelli in cui l'oggetto entra, e ogni regola dà un membro diverso della famiglia.

<a id="box-3-def-AF"></a>

!!! definizione "Definizione 36.1: Algoritmo Any Fit"

    Un'euristica costruttiva $\mathscr{A}$ per il BPP è un <strong>algoritmo Any Fit</strong> se, indicati con $P_1,P_2,\dots,P_{nb}$ gli schemi di carico dei contenitori aperti finora, apre un nuovo contenitore per l'oggetto $i$ solo quando

    $$
    \sum_{h \in P_b} w_h + w_i > c \qquad \text{per ogni } b \in \{1,2,\dots,nb\},
    $$

    mentre la scelta del contenitore, quando più di uno può accogliere l'oggetto, non è specificata.

- <strong>Gli oggetti di due contenitori non entrano mai insieme.</strong> Siano $b$ e $b'$ due contenitori aperti da un algoritmo Any Fit, con $b<b'$, sia $f$ il primo oggetto posto nel contenitore $b'$, e sia $W_b$ il peso totale degli oggetti contenuti nel contenitore $b$ nel momento in cui $f$ è stato esaminato. Il contenitore $b'$ è stato aperto perché $f$ non entrava in nessuno dei contenitori aperti fino ad allora, e in particolare non nel contenitore $b$, quindi $W_b + w_{f} > c$. Il peso totale di un contenitore non diminuisce mai durante l'esecuzione, quindi $\sum_{i\in P_b} w_i \ge W_b$, e $f\in P_{b'}$ dà $\sum_{i\in P_{b'}} w_i \ge w_{f}$. Di conseguenza

    $$
    \sum_{i\in P_b} w_i + \sum_{i\in P_{b'}} w_i \;\ge\; W_b + w_{f} \;>\; c
    $$

    per ogni coppia di contenitori distinti $b$ e $b'$: di conseguenza, due contenitori di una soluzione Any Fit non si possono fondere. Qui si usa solo la condizione Any Fit, la regola di scelta non ha alcun ruolo.

- <strong>NF non è un algoritmo Any Fit.</strong> NF mantiene un solo contenitore aperto e lo chiude appena un oggetto non vi entra, anche quando quell'oggetto entrerebbe in un contenitore chiuso in precedenza.

<a id="box-4-ex-notAF"></a>

!!! esempio "Esempio 36.3: NF non è un algoritmo Any Fit"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4\}$ di $4$ oggetti ($n = 4$), con i seguenti pesi degli oggetti:

    $$
    \begin{array}{l|cccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} \\[1ex]
    \hline {w_i} & {3} & {8} & {3} & {8} \\
    \hline
    \end{array}
    $$

    Inizialmente $nb:=1$, $rc:=c$. L'algoritmo NF produce la seguente soluzione ammissibile:

    1. Oggetto $1$ (peso $w[1]=3$): $w[1]=3\le rc=10$, quindi non si apre un nuovo contenitore. L'oggetto $1$ è posto nel contenitore $nb=1$, e $rc\leftarrow 10-3=7$.

    2. Oggetto $2$ (peso $w[2]=8$): $w[2]=8>rc=7$, quindi $nb\leftarrow 2$ e $rc\leftarrow c=10$. L'oggetto $2$ è posto nel contenitore $nb=2$, e $rc\leftarrow 10-8=2$.

    3. Oggetto $3$ (peso $w[3]=3$): $w[3]=3>rc=2$, quindi $nb\leftarrow 3$ e $rc\leftarrow c=10$. L'oggetto $3$ è posto nel contenitore $nb=3$, e $rc\leftarrow 10-3=7$.

    4. Oggetto $4$ (peso $w[4]=8$): $w[4]=8>rc=7$, quindi $nb\leftarrow 4$ e $rc\leftarrow c=10$. L'oggetto $4$ è posto nel contenitore $nb=4$, e $rc\leftarrow 10-8=2$.

    Quindi NF restituisce:

    $$
    bin = \begin{pmatrix} 1 & 2 & 3 & 4 \end{pmatrix},
    \qquad
    nb=4.
    $$

    Alla terza iterazione l'oggetto $3$ entrerebbe nel contenitore $1$, la cui capacità residua è $7$, e NF apre comunque un nuovo contenitore: NF viola la condizione Any Fit.

    Un algoritmo Any Fit, al contrario, non può aprire un terzo contenitore per l'oggetto $3$, perché l'oggetto entra nel contenitore $1$: vi pone l'oggetto $3$ e poi apre un nuovo contenitore per l'oggetto $4$, che non entra in nessuno dei due, usando $3$ contenitori invece di $4$. Questo vale per ogni algoritmo della classe, qualunque sia la regola di scelta.

### 36.3.1 First Fit

!!! chiave ""

    Il <em>First Fit Algorithm</em> (indicato con FF) è un'euristica costruttiva per il BPP. Esamina gli oggetti nell'ordine in cui sono dati nell'istanza, mantenendo tutti i contenitori aperti finora. Per ogni oggetto, FF scorre i contenitori nell'ordine di apertura e pone l'oggetto nel <em>primo</em> contenitore in cui entra; se nessun contenitore corrente può accogliere l'oggetto, FF apre un nuovo contenitore e vi pone l'oggetto.

- FF è un algoritmo Any Fit: apre un nuovo contenitore solo quando l'oggetto non entra in nessuno dei contenitori aperti finora, e la regola lasciata libera dalla [Definizione 36.1](#box-3-def-AF) è qui fissata prendendo il primo contenitore in cui l'oggetto entra.

- Lo pseudocodice di FF è il seguente:

!!! algoritmo "Algoritmo: First Fit"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> istanza del BPP <span class="arithmatex">\(I\)</span> con <span class="arithmatex">\(n\)</span> oggetti, pesi <span class="arithmatex">\(w[1..n]\)</span>, capacità <span class="arithmatex">\(c\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> assegnamento oggetto-contenitore <span class="arithmatex">\(bin[1..n]\)</span> e numero di contenitori usati <span class="arithmatex">\(nb\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> FirstFit(<span class="arithmatex">\(n, w, c\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(bin := \text{nuovo vettore}[1..n]\)</span>
    <span class="arithmatex">\(rc := \text{nuovo vettore}[1..n]\)</span>
    <span class="arithmatex">\(nb := 1\)</span> 
    <span class="arithmatex">\(rc[1] \leftarrow c\)</span> <span class="pc-com">▹ assegnamento oggetto-contenitore capacità residue numero di contenitori inizializzare il primo contenitore</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(i := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><span class="arithmatex">\(s := -1\)</span> <span class="pc-com">▹ contenitore scelto</span></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><strong>for</strong> <span class="arithmatex">\(b := 1\)</span> <strong>to</strong> <span class="arithmatex">\(nb\)</span> <strong>do</strong></div><div class="pc" style="--liv:3"><span class="pc-n">6</span><strong>if</strong> <span class="arithmatex">\(w[i] \le rc[b]\)</span> <strong>then</strong></div><div class="pc" style="--liv:4"><span class="pc-n">7</span><span class="arithmatex">\(s \leftarrow b\)</span></div><div class="pc" style="--liv:4"><span class="pc-n">8</span><strong>break</strong></div><div class="pc" style="--liv:3"><span class="pc-n">9</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">10</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">11</span><strong>if</strong> <span class="arithmatex">\(s = -1\)</span> <strong>then</strong></div><div class="pc" style="--liv:3"><span class="pc-n">12</span><span class="arithmatex">\(nb \leftarrow nb + 1\)</span> 
    <span class="arithmatex">\(rc[nb] \leftarrow c\)</span> <span class="pc-com">▹ aprire un nuovo contenitore</span></div><div class="pc" style="--liv:3"><span class="pc-n">13</span><span class="arithmatex">\(s \leftarrow nb\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">14</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">15</span><span class="arithmatex">\(bin[i] \leftarrow s\)</span> 
    <span class="arithmatex">\(rc[s] \leftarrow rc[s] - w[i]\)</span> <span class="pc-com">▹ assegnare l'oggetto</span></div><div class="pc" style="--liv:1"><span class="pc-n">16</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">17</span><strong>return</strong> <span class="arithmatex">\(bin\)</span>, <span class="arithmatex">\(nb\)</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/bin-packing-approximation_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/bin-packing-approximation_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

<a id="box-5-ex-FFexec1"></a>

!!! esempio "Esempio 36.4: Esecuzione di FF"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n = 5$), con i seguenti pesi degli oggetti:

    $$
    \begin{array}{l|ccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} \\[1ex]
    \hline {w_i} & {6} & {5} & {4} & {7} & {3} \\[1ex]
    \hline
    \end{array}
    $$

    L'algoritmo FF produce la seguente soluzione ammissibile:

    1. Oggetto $1$ (peso $6$): il contenitore $1$ è aperto all'inizio ($nb=1$, $rc[1]=c=10$) e $w[1]\le rc[1]$, quindi $s=1$ e FF pone l'oggetto $1$ nel contenitore $1$, e $rc[1]\leftarrow 10-6=4$.

    2. Oggetto $2$ (peso $5$): $b=1$: $w[2]=5\le rc[1]=4$? No. Nessun contenitore può accoglierlo ($s=-1$), quindi FF apre il contenitore $2$ ($rc[2]\leftarrow 10$). L'oggetto $2$ è posto nel contenitore $2$, e $rc[2]\leftarrow 10-5=5$.

    3. Oggetto $3$ (peso $4$): $b=1$: $w[3]=4\le rc[1]=4$? Sì, quindi $s\leftarrow 1$ e la scansione si ferma. L'oggetto $3$ è posto nel contenitore $1$, e $rc[1]\leftarrow 4-4=0$.

    4. Oggetto $4$ (peso $7$): $b=1$: $w[4]=7\le rc[1]=0$? No. $b=2$: $w[4]=7\le rc[2]=5$? No. Nessun contenitore può accoglierlo ($s=-1$), quindi FF apre il contenitore $3$ ($rc[3]\leftarrow 10$). L'oggetto $4$ è posto nel contenitore $3$, e $rc[3]\leftarrow 10-7=3$.

    5. Oggetto $5$ (peso $3$): $b=1$: $w[5]=3\le rc[1]=0$? No. $b=2$: $w[5]=3\le rc[2]=5$? Sì, quindi $s\leftarrow 2$ e la scansione si ferma. L'oggetto $5$ è posto nel contenitore $2$, e $rc[2]\leftarrow 5-3=2$.

    Quindi FF restituisce:

    $$
    bin = \begin{pmatrix} 1 & 2 & 1 & 3 & 2 \end{pmatrix},
    \qquad
    nb=3.
    $$

    e quindi

    $$
    FF(I)=nb=3.
    $$

<a id="box-6-exsubsetsFF"></a>

!!! esempio "Esempio 36.5: Pattern dal vettore bin"

    Consideriamo l'istanza dell'esempio precedente, su cui FF restituisce:

    $$
    bin = \begin{pmatrix} 1 & 2 & 1 & 3 & 2 \end{pmatrix}, \qquad nb = 3.
    $$

    Gli schemi di carico sono:

    \begin{align*}
    P_1 &= \{ i \in \{1,2,3,4,5\} : bin_i = 1 \} = \{1,3\}, \\
    P_2 &= \{ i \in \{1,2,3,4,5\} : bin_i = 2 \} = \{2,5\}, \\
    P_3 &= \{ i \in \{1,2,3,4,5\} : bin_i = 3 \} = \{4\}.
    \end{align*}

    Sono esattamente gli insiemi di oggetti posti nei contenitori costruiti dall'algoritmo:

    - Il contenitore $1$ contiene gli oggetti $1$ e $3$ con peso totale $w_1+w_3=6+4=10$;

    - Il contenitore $2$ contiene gli oggetti $2$ e $5$ con peso totale $w_2+w_5=5+3=8$;

    - Il contenitore $3$ contiene l'oggetto $4$ con peso $w_4=7$.

### 36.3.2 Best Fit

!!! chiave ""

    Il <em>Best Fit Algorithm</em> (indicato con BF) è un'euristica costruttiva per il BPP. Esamina gli oggetti nell'ordine in cui sono dati nell'istanza, mantenendo tutti i contenitori aperti finora. Per ogni oggetto, BF considera tutti i contenitori in cui l'oggetto entra e lo pone in quello con la <em>capacità residua minima</em> (in caso di pareggio, il contenitore aperto per primo); se nessun contenitore può accogliere l'oggetto, BF apre un nuovo contenitore e vi pone l'oggetto.

- L'idea è riempire i contenitori il più possibile: usando il contenitore in cui l'oggetto lascia meno spazio inutilizzato, BF tiene disponibili i contenitori con capacità residua maggiore per gli oggetti più grandi che possono ancora arrivare.

- BF è un algoritmo Any Fit: apre un nuovo contenitore solo quando l'oggetto non entra in nessuno dei contenitori aperti finora, e la regola lasciata libera dalla [Definizione 36.1](#box-3-def-AF) è qui fissata prendendo il contenitore con la capacità residua minima.

- Lo pseudocodice di BF è il seguente:

!!! algoritmo "Algoritmo: Best Fit"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> istanza del BPP <span class="arithmatex">\(I\)</span> con <span class="arithmatex">\(n\)</span> oggetti, pesi <span class="arithmatex">\(w[1..n]\)</span>, capacità <span class="arithmatex">\(c\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> assegnamento oggetto-contenitore <span class="arithmatex">\(bin[1..n]\)</span> e numero di contenitori usati <span class="arithmatex">\(nb\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> BestFit(<span class="arithmatex">\(n, w, c\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(bin := \text{nuovo vettore}[1..n]\)</span>
    <span class="arithmatex">\(rc := \text{nuovo vettore}[1..n]\)</span>
    <span class="arithmatex">\(nb := 1\)</span> 
    <span class="arithmatex">\(rc[1] \leftarrow c\)</span> <span class="pc-com">▹ assegnamento oggetto-contenitore capacità residue numero di contenitori inizializzare il primo contenitore</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(i := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><span class="arithmatex">\(minrc := c + 1\)</span> 
    <span class="arithmatex">\(s := -1\)</span> <span class="pc-com">▹ capacità residua minima trovata finora contenitore scelto</span></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><strong>for</strong> <span class="arithmatex">\(b := 1\)</span> <strong>to</strong> <span class="arithmatex">\(nb\)</span> <strong>do</strong></div><div class="pc" style="--liv:3"><span class="pc-n">6</span><strong>if</strong> <span class="arithmatex">\(w[i] \le rc[b]\)</span> <strong>e</strong> <span class="arithmatex">\(rc[b] < minrc\)</span> <strong>then</strong></div><div class="pc" style="--liv:4"><span class="pc-n">7</span><span class="arithmatex">\(s \leftarrow b\)</span></div><div class="pc" style="--liv:4"><span class="pc-n">8</span><span class="arithmatex">\(minrc \leftarrow rc[b]\)</span></div><div class="pc" style="--liv:3"><span class="pc-n">9</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">10</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">11</span><strong>if</strong> <span class="arithmatex">\(s = -1\)</span> <strong>then</strong></div><div class="pc" style="--liv:3"><span class="pc-n">12</span><span class="arithmatex">\(nb \leftarrow nb + 1\)</span> 
    <span class="arithmatex">\(rc[nb] \leftarrow c\)</span> <span class="pc-com">▹ aprire un nuovo contenitore</span></div><div class="pc" style="--liv:3"><span class="pc-n">13</span><span class="arithmatex">\(s \leftarrow nb\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">14</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">15</span><span class="arithmatex">\(bin[i] \leftarrow s\)</span> 
    <span class="arithmatex">\(rc[s] \leftarrow rc[s] - w[i]\)</span> <span class="pc-com">▹ assegnare l'oggetto</span></div><div class="pc" style="--liv:1"><span class="pc-n">16</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">17</span><strong>return</strong> <span class="arithmatex">\(bin\)</span>, <span class="arithmatex">\(nb\)</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/bin-packing-approximation_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/bin-packing-approximation_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

<a id="box-7-ex-BFexec1"></a>

!!! esempio "Esempio 36.6: Esecuzione di BF"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n = 5$), con i seguenti pesi degli oggetti:

    $$
    \begin{array}{l|ccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} \\[1ex]
    \hline {w_i} & {6} & {5} & {4} & {7} & {3} \\[1ex]
    \hline
    \end{array}
    $$

    L'algoritmo BF produce la seguente soluzione ammissibile:

    1. Oggetto $1$ (peso $6$): il contenitore $1$ è aperto all'inizio ($nb=1$, $rc[1]=c=10$) e $w[1]\le rc[1]$, quindi $s=1$ e BF pone l'oggetto $1$ nel contenitore $1$, e $rc[1]\leftarrow 10-6=4$.

    2. Oggetto $2$ (peso $5$): $minrc:=11$, $s:=-1$. $b=1$: $w[2]=5\le rc[1]=4$? No. Nessun contenitore può accoglierlo ($s=-1$), quindi BF apre il contenitore $2$ ($rc[2]\leftarrow 10$). L'oggetto $2$ è posto nel contenitore $2$, e $rc[2]\leftarrow 10-5=5$.

    3. Oggetto $3$ (peso $4$): $minrc:=11$, $s:=-1$. $b=1$: $w[3]=4\le rc[1]=4$ e $rc[1]=4<11$, quindi $s\leftarrow 1$, $minrc\leftarrow 4$. $b=2$: $w[3]=4\le rc[2]=5$ e $rc[2]=5<minrc=4$? No. Quindi $s=1$: l'oggetto $3$ è posto nel contenitore $1$ (quello che lascia la capacità residua minima, $0$, contro $1$ del contenitore $2$), e $rc[1]\leftarrow 4-4=0$.

    4. Oggetto $4$ (peso $7$): $b=1$: $w[4]=7\le rc[1]=0$? No. $b=2$: $w[4]=7\le rc[2]=5$? No. Nessun contenitore può accoglierlo ($s=-1$), quindi BF apre il contenitore $3$ ($rc[3]\leftarrow 10$). L'oggetto $4$ è posto nel contenitore $3$, e $rc[3]\leftarrow 10-7=3$.

    5. Oggetto $5$ (peso $3$): $minrc:=11$, $s:=-1$. $b=1$: $w[5]=3\le rc[1]=0$? No. $b=2$: $w[5]=3\le rc[2]=5$ e $rc[2]=5<11$, quindi $s\leftarrow 2$, $minrc\leftarrow 5$. $b=3$: $w[5]=3\le rc[3]=3$ e $rc[3]=3<minrc=5$, quindi $s\leftarrow 3$, $minrc\leftarrow 3$. Quindi $s=3$: l'oggetto $5$ è posto nel contenitore $3$ (quello che lascia la capacità residua minima, $0$, contro $2$ del contenitore $2$), e $rc[3]\leftarrow 3-3=0$.

    Quindi BF restituisce:

    $$
    bin = \begin{pmatrix} 1 & 2 & 1 & 3 & 3 \end{pmatrix},
    \qquad
    nb=3.
    $$

    e quindi

    $$
    BF(I)=nb=3.
    $$

<a id="box-8-exsubsetsBF"></a>

!!! esempio "Esempio 36.7: Pattern dal vettore bin"

    Consideriamo l'istanza dell'esempio precedente, su cui BF restituisce:

    $$
    bin = \begin{pmatrix} 1 & 2 & 1 & 3 & 3 \end{pmatrix}, \qquad nb = 3.
    $$

    Gli schemi di carico sono:

    \begin{align*}
    P_1 &= \{ i \in \{1,2,3,4,5\} : bin_i = 1 \} = \{1,3\}, \\
    P_2 &= \{ i \in \{1,2,3,4,5\} : bin_i = 2 \} = \{2\}, \\
    P_3 &= \{ i \in \{1,2,3,4,5\} : bin_i = 3 \} = \{4,5\}.
    \end{align*}

    Sono esattamente gli insiemi di oggetti posti nei contenitori costruiti dall'algoritmo:

    - Il contenitore $1$ contiene gli oggetti $1$ e $3$ con peso totale $w_1+w_3=6+4=10$;

    - Il contenitore $2$ contiene l'oggetto $2$ con peso $w_2=5$;

    - Il contenitore $3$ contiene gli oggetti $4$ e $5$ con peso totale $w_4+w_5=7+3=10$.

### 36.3.3 Worst Fit

!!! chiave ""

    Il <em>Worst Fit Algorithm</em> (indicato con WF) è un'euristica costruttiva per il BPP. Esamina gli oggetti nell'ordine in cui sono dati nell'istanza, mantenendo tutti i contenitori aperti finora. Per ogni oggetto, WF considera tutti i contenitori in cui l'oggetto entra e lo pone in quello con la <em>capacità residua massima</em> (in caso di pareggio, il contenitore aperto per primo); se nessun contenitore può accogliere l'oggetto, WF apre un nuovo contenitore e vi pone l'oggetto.

- L'idea è opposta a quella di BF: ponendo ogni oggetto nel contenitore più vuoto, WF evita di creare contenitori con una capacità residua così piccola che nessun oggetto futuro possa usarla, e mantiene lo spazio libero distribuito fra i contenitori aperti.

- WF è un algoritmo Any Fit: apre un nuovo contenitore solo quando l'oggetto non entra in nessuno dei contenitori aperti finora, e la regola lasciata libera dalla [Definizione 36.1](#box-3-def-AF) è qui fissata prendendo il contenitore con la capacità residua massima.

- Lo pseudocodice di WF è il seguente:

!!! algoritmo "Algoritmo: Worst Fit"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> istanza del BPP <span class="arithmatex">\(I\)</span> con <span class="arithmatex">\(n\)</span> oggetti, pesi <span class="arithmatex">\(w[1..n]\)</span>, capacità <span class="arithmatex">\(c\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> assegnamento oggetto-contenitore <span class="arithmatex">\(bin[1..n]\)</span> e numero di contenitori usati <span class="arithmatex">\(nb\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> WorstFit(<span class="arithmatex">\(n, w, c\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(bin := \text{nuovo vettore}[1..n]\)</span>
    <span class="arithmatex">\(rc := \text{nuovo vettore}[1..n]\)</span>
    <span class="arithmatex">\(nb := 1\)</span> 
    <span class="arithmatex">\(rc[1] \leftarrow c\)</span> <span class="pc-com">▹ assegnamento oggetto-contenitore capacità residue numero di contenitori inizializzare il primo contenitore</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(i := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><span class="arithmatex">\(maxrc := -1\)</span> 
    <span class="arithmatex">\(s := -1\)</span> <span class="pc-com">▹ capacità residua massima trovata finora contenitore scelto</span></div><div class="pc" style="--liv:2"><span class="pc-n">5</span><strong>for</strong> <span class="arithmatex">\(b := 1\)</span> <strong>to</strong> <span class="arithmatex">\(nb\)</span> <strong>do</strong></div><div class="pc" style="--liv:3"><span class="pc-n">6</span><strong>if</strong> <span class="arithmatex">\(w[i] \le rc[b]\)</span> <strong>e</strong> <span class="arithmatex">\(rc[b] > maxrc\)</span> <strong>then</strong></div><div class="pc" style="--liv:4"><span class="pc-n">7</span><span class="arithmatex">\(s \leftarrow b\)</span></div><div class="pc" style="--liv:4"><span class="pc-n">8</span><span class="arithmatex">\(maxrc \leftarrow rc[b]\)</span></div><div class="pc" style="--liv:3"><span class="pc-n">9</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">10</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">11</span><strong>if</strong> <span class="arithmatex">\(s = -1\)</span> <strong>then</strong></div><div class="pc" style="--liv:3"><span class="pc-n">12</span><span class="arithmatex">\(nb \leftarrow nb + 1\)</span> 
    <span class="arithmatex">\(rc[nb] \leftarrow c\)</span> <span class="pc-com">▹ aprire un nuovo contenitore</span></div><div class="pc" style="--liv:3"><span class="pc-n">13</span><span class="arithmatex">\(s \leftarrow nb\)</span></div><div class="pc" style="--liv:2"><span class="pc-n">14</span><strong>end</strong></div><div class="pc" style="--liv:2"><span class="pc-n">15</span><span class="arithmatex">\(bin[i] \leftarrow s\)</span> 
    <span class="arithmatex">\(rc[s] \leftarrow rc[s] - w[i]\)</span> <span class="pc-com">▹ assegnare l'oggetto</span></div><div class="pc" style="--liv:1"><span class="pc-n">16</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">17</span><strong>return</strong> <span class="arithmatex">\(bin\)</span>, <span class="arithmatex">\(nb\)</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/bin-packing-approximation_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/bin-packing-approximation_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

<a id="box-9-ex-WFexec1"></a>

!!! esempio "Esempio 36.8: Esecuzione di WF"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4,5\}$ di $5$ oggetti ($n = 5$), con i seguenti pesi degli oggetti:

    $$
    \begin{array}{l|ccccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} & {i=5} \\[1ex]
    \hline {w_i} & {6} & {5} & {4} & {7} & {3} \\[1ex]
    \hline
    \end{array}
    $$

    L'algoritmo WF produce la seguente soluzione ammissibile:

    1. Oggetto $1$ (peso $6$): il contenitore $1$ è aperto all'inizio ($nb=1$, $rc[1]=c=10$) e $w[1]\le rc[1]$, quindi $s=1$ e WF pone l'oggetto $1$ nel contenitore $1$, e $rc[1]\leftarrow 10-6=4$.

    2. Oggetto $2$ (peso $5$): $maxrc:=-1$, $s:=-1$. $b=1$: $w[2]=5\le rc[1]=4$? No. Nessun contenitore può accoglierlo ($s=-1$), quindi WF apre il contenitore $2$ ($rc[2]\leftarrow 10$). L'oggetto $2$ è posto nel contenitore $2$, e $rc[2]\leftarrow 10-5=5$.

    3. Oggetto $3$ (peso $4$): $maxrc:=-1$, $s:=-1$. $b=1$: $w[3]=4\le rc[1]=4$ e $rc[1]=4>-1$, quindi $s\leftarrow 1$, $maxrc\leftarrow 4$. $b=2$: $w[3]=4\le rc[2]=5$ e $rc[2]=5>maxrc=4$, quindi $s\leftarrow 2$, $maxrc\leftarrow 5$. Quindi $s=2$: l'oggetto $3$ è posto nel contenitore $2$ (quello con la capacità residua massima), e $rc[2]\leftarrow 5-4=1$.

    4. Oggetto $4$ (peso $7$): $b=1$: $w[4]=7\le rc[1]=4$? No. $b=2$: $w[4]=7\le rc[2]=1$? No. Nessun contenitore può accoglierlo ($s=-1$), quindi WF apre il contenitore $3$ ($rc[3]\leftarrow 10$). L'oggetto $4$ è posto nel contenitore $3$, e $rc[3]\leftarrow 10-7=3$.

    5. Oggetto $5$ (peso $3$): $maxrc:=-1$, $s:=-1$. $b=1$: $w[5]=3\le rc[1]=4$ e $rc[1]=4>-1$, quindi $s\leftarrow 1$, $maxrc\leftarrow 4$. $b=2$: $w[5]=3\le rc[2]=1$? No. $b=3$: $w[5]=3\le rc[3]=3$ e $rc[3]=3>maxrc=4$? No. Quindi $s=1$: l'oggetto $5$ è posto nel contenitore $1$ (quello con la capacità residua massima), e $rc[1]\leftarrow 4-3=1$.

    Quindi WF restituisce:

    $$
    bin = \begin{pmatrix} 1 & 2 & 2 & 3 & 1 \end{pmatrix},
    \qquad
    nb=3.
    $$

    e quindi

    $$
    WF(I)=nb=3.
    $$

<a id="box-10-exsubsetsWF"></a>

!!! esempio "Esempio 36.9: Pattern dal vettore bin"

    Consideriamo l'istanza dell'esempio precedente, su cui WF restituisce:

    $$
    bin = \begin{pmatrix} 1 & 2 & 2 & 3 & 1 \end{pmatrix}, \qquad nb = 3.
    $$

    Gli schemi di carico sono:

    \begin{align*}
    P_1 &= \{ i \in \{1,2,3,4,5\} : bin_i = 1 \} = \{1,5\}, \\
    P_2 &= \{ i \in \{1,2,3,4,5\} : bin_i = 2 \} = \{2,3\}, \\
    P_3 &= \{ i \in \{1,2,3,4,5\} : bin_i = 3 \} = \{4\}.
    \end{align*}

    Sono esattamente gli insiemi di oggetti posti nei contenitori costruiti dall'algoritmo:

    - Il contenitore $1$ contiene gli oggetti $1$ e $5$ con peso totale $w_1+w_5=6+3=9$;

    - Il contenitore $2$ contiene gli oggetti $2$ e $3$ con peso totale $w_2+w_3=5+4=9$;

    - Il contenitore $3$ contiene l'oggetto $4$ con peso $w_4=7$.

## 36.4 Proprietà di riempimento a metà

- I risultati di questa sezione non dipendono dalla regola usata per scegliere il contenitore: si dimostrano usando <em>solo</em> la condizione Any Fit, e valgono quindi per ogni algoritmo della famiglia, compresi FF, BF e WF.

- La <strong>proprietà di riempimento a metà</strong> di una soluzione ammissibile del BPP afferma che, con l'eccezione di al più un contenitore, tutti i contenitori sono riempiti per più della metà della loro capacità o, equivalentemente, che per ogni coppia di contenitori distinti almeno uno dei due è riempito per più della metà della capacità.

- La proprietà di riempimento a metà da sola <em>non</em> garantisce che due contenitori non si possano fondere: per esempio, con $c=10$ due contenitori di peso totale $6$ e $1$ soddisfano la proprietà ma si possono fondere in un solo contenitore. Il suo ruolo è diverso: è esattamente ciò che serve per dimostrare una garanzia di prestazione relativa pari a $2$.

<a id="box-11-def-halffull"></a>

!!! definizione "Definizione 36.2: Proprietà di riempimento a metà"

    Data una soluzione ammissibile del BPP con $k$ contenitori e schemi di carico $\mathcal{P}=\{P_1,P_2,\dots,P_k\}$ (dove $P_b$ è l'insieme degli oggetti posti nel contenitore $b$, per $b\in\{1,2,\dots,k\}$), diciamo che la soluzione soddisfa la <strong>proprietà di riempimento a metà</strong> se vale una delle seguenti condizioni equivalenti:

    - esiste al più un contenitore $b\in\{1,2,\dots,k\}$ tale che

        $$
        \sum_{i\in P_b} w_i \le \frac{c}{2}.
        $$

    - per ogni coppia di contenitori distinti $b,b'\in\{1,2,\dots,k\}$, almeno uno dei due è riempito per più della metà della sua capacità, cioè

        $$
        \sum_{i\in P_b} w_i > \frac{c}{2}
        \qquad\text{o}\qquad
        \sum_{i\in P_{b'}} w_i > \frac{c}{2}.
        $$

<a id="box-12-ex-halffullNFok"></a>

!!! esempio "Esempio 36.10: Proprietà di riempimento a metà"

    Consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4\}$ di $4$ oggetti ($n = 4$), con i seguenti pesi degli oggetti:

    $$
    \begin{array}{l|cccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} \\[1ex]
    \hline {w_i} & {5} & {5} & {5} & {5} \\
    \hline
    \end{array}
    $$

    Inizialmente $nb:=1$, $rc:=c$. L'algoritmo NF produce la seguente soluzione ammissibile:

    1. Oggetto $1$ (peso $w[1]=5$): $w[1]=5\le rc=10$, quindi non si apre un nuovo contenitore. L'oggetto $1$ è posto nel contenitore $nb=1$, e $rc\leftarrow 10-5=5$.

    2. Oggetto $2$ (peso $w[2]=5$): $w[2]=5\le rc=5$, quindi non si apre un nuovo contenitore. L'oggetto $2$ è posto nel contenitore $nb=1$, e $rc\leftarrow 5-5=0$.

    3. Oggetto $3$ (peso $w[3]=5$): $w[3]=5>rc=0$, quindi $nb\leftarrow 2$ e $rc\leftarrow c=10$. L'oggetto $3$ è posto nel contenitore $nb=2$, e $rc\leftarrow 10-5=5$.

    4. Oggetto $4$ (peso $w[4]=5$): $w[4]=5\le rc=5$, quindi non si apre un nuovo contenitore. L'oggetto $4$ è posto nel contenitore $nb=2$, e $rc\leftarrow 5-5=0$.

    Quindi NF restituisce:

    $$
    bin = \begin{pmatrix} 1 & 1 & 2 & 2 \end{pmatrix},
    \qquad
    nb=2.
    $$

    Gli schemi di carico sono $P_1=\{1,2\}$, $P_2=\{3,4\}$, con pesi totali:

    $$
    \sum_{i \in P_1} w_i = 5+5=10 > \frac{c}{2}=5,
    \qquad
    \sum_{i \in P_2} w_i = 5+5=10 > \frac{c}{2}=5.
    $$

    Poiché <em>nessun</em> contenitore ha peso totale al più $\frac{c}{2}$, la soluzione <strong>soddisfa</strong> la proprietà di riempimento a metà.

<a id="box-13-prop-halffullAF"></a>

!!! teorema "Proposizione 36.3"

    Per ogni istanza del BPP, le soluzioni euristiche prodotte da <em>qualsiasi</em> algoritmo Any Fit soddisfano la proprietà di riempimento a metà. In particolare questo vale per FF, BF e WF.

??? dimostrazione "Dimostrazione"

    Sia $\mathscr{A}$ un algoritmo Any Fit, sia $k := \mathscr{A}(I)$, e siano $P_1,P_2,\dots,P_k$ gli schemi di carico prodotti da $\mathscr{A}$, indicizzati nell'ordine di apertura dei contenitori. Se $k=1$ non c'è niente da dimostrare, quindi supponiamo $k \ge 2$.

    Supponiamo, per assurdo, che esistano due contenitori distinti $b$ e $b'$ tali che

    $$
    \sum_{i\in P_b} w_i \le \frac{c}{2}
    \qquad\text{e}\qquad
    \sum_{i\in P_{b'}} w_i \le \frac{c}{2}.
    $$

    Sommando le due disuguaglianze si ottiene

    $$
    \sum_{i\in P_b} w_i + \sum_{i\in P_{b'}} w_i \le \frac{c}{2} + \frac{c}{2} = c,
    $$

    che contraddice la proprietà della classe Any Fit dimostrata nella Sezione [36.3](#sez-sec-AF), cioè che gli oggetti di due contenitori distinti non entrano mai insieme in un solo contenitore. Di conseguenza può esserci al più un contenitore con peso totale al più $\frac{c}{2}$.

    Si usa solo la condizione Any Fit, quindi l'enunciato vale per ogni algoritmo della classe. <span class="qed">□</span>

<a id="box-14-ex-halffullFFcheck"></a>

!!! esempio "Esempio 36.11: Proprietà di riempimento a metà"

    Come illustrazione della [Proposizione 36.3](#box-13-prop-halffullAF), consideriamo contenitori di capacità $c = 10$ e un insieme $\mathscr{I} = \{1,2,3,4\}$ di $4$ oggetti ($n = 4$), con i seguenti pesi degli oggetti:

    $$
    \begin{array}{l|cccc}
    \hline  & {i=1} & {i=2} & {i=3} & {i=4} \\[1ex]
    \hline {w_i} & {7} & {7} & {3} & {4} \\
    \hline
    \end{array}
    $$

    Inizialmente $nb:=1$, $rc[1]:=c=10$. L'algoritmo FF produce la seguente soluzione ammissibile:

    1. Oggetto $1$ (peso $7$): $b=1$: $w[1]=7\le rc[1]=10$? Sì, quindi $s\leftarrow 1$. L'oggetto $1$ è posto nel contenitore $1$, e $rc[1]\leftarrow 10-7=3$.

    2. Oggetto $2$ (peso $7$): $b=1$: $w[2]=7\le rc[1]=3$? No. Nessun contenitore può accoglierlo, quindi FF apre il contenitore $2$ ($rc[2]\leftarrow 10$). L'oggetto $2$ è posto nel contenitore $2$, e $rc[2]\leftarrow 10-7=3$.

    3. Oggetto $3$ (peso $3$): $b=1$: $w[3]=3\le rc[1]=3$? Sì, quindi $s\leftarrow 1$. L'oggetto $3$ è posto nel contenitore $1$, e $rc[1]\leftarrow 3-3=0$.

    4. Oggetto $4$ (peso $4$): $b=1$: $w[4]=4\le rc[1]=0$? No. $b=2$: $w[4]=4\le rc[2]=3$? No. Nessun contenitore può accoglierlo, quindi FF apre il contenitore $3$ ($rc[3]\leftarrow 10$). L'oggetto $4$ è posto nel contenitore $3$, e $rc[3]\leftarrow 10-4=6$.

    Quindi FF restituisce:

    $$
    bin = \begin{pmatrix} 1 & 2 & 1 & 3 \end{pmatrix},
    \qquad
    nb=3.
    $$

    Gli schemi di carico sono $P_1=\{1,3\}$, $P_2=\{2\}$, $P_3=\{4\}$, con pesi totali:

    $$
    \sum_{i \in P_1} w_i = 7+3=10 > \frac{c}{2}=5,
    \qquad
    \sum_{i \in P_2} w_i = 7 > \frac{c}{2}=5,
    \qquad
    \sum_{i \in P_3} w_i = 4 \le \frac{c}{2}=5.
    $$

    Poiché c'è <em>esattamente un</em> contenitore (il contenitore $3$) con peso totale al più $\frac{c}{2}$, la soluzione <strong>soddisfa</strong> la proprietà di riempimento a metà, come garantito dalla [Proposizione 36.3](#box-13-prop-halffullAF), poiché FF è un algoritmo Any Fit.

!!! chiave ""

    Il Next Fit può produrre soluzioni con molti contenitori riempiti per meno della metà della capacità, e quindi non soddisfa la proprietà di riempimento a metà.

<a id="box-15-ex-halffullNF"></a>

!!! esempio "Esempio 36.12: Proprietà di riempimento a metà"

    Consideriamo di nuovo l'istanza dell'[Esempio 36.3](#box-4-ex-notAF), con capacità dei contenitori $c = 10$ e pesi degli oggetti $w=(3,8,3,8)$, su cui NF apre un nuovo contenitore per ogni oggetto e restituisce:

    $$
    bin = \begin{pmatrix} 1 & 2 & 3 & 4 \end{pmatrix},
    \qquad
    nb=4.
    $$

    Gli schemi di carico sono:

    \begin{align*}
    P_1 &= \{ i \in \{1,2,3,4\} : bin_i = 1 \} = \{1\}, \\
    P_2 &= \{ i \in \{1,2,3,4\} : bin_i = 2 \} = \{2\}, \\
    P_3 &= \{ i \in \{1,2,3,4\} : bin_i = 3 \} = \{3\}, \\
    P_4 &= \{ i \in \{1,2,3,4\} : bin_i = 4 \} = \{4\}.
    \end{align*}

    I pesi totali nei contenitori sono:

    $$
    \sum_{i \in P_1} w_i = 3 \le \frac{c}{2}=5,
    \quad
    \sum_{i \in P_2} w_i = 8 > \frac{c}{2}=5,
    \quad
    \sum_{i \in P_3} w_i = 3 \le \frac{c}{2}=5,
    \quad
    \sum_{i \in P_4} w_i = 8 > \frac{c}{2}=5.
    $$

    Poiché ci sono <em>due</em> contenitori (i contenitori $1$ e $3$) con peso totale al più $\frac{c}{2}$, la soluzione <strong>non</strong> soddisfa la proprietà di riempimento a metà.

## 36.5 Garanzie di prestazione

- Determiniamo ora il rapporto di prestazione nel caso peggiore dei quattro algoritmi. Next Fit non è un algoritmo Any Fit, quindi richiede un argomento a sé. Per i tre algoritmi Any Fit il bound $\mathscr{A}(I)\le 2\,z(I)$ segue subito dalla proprietà di riempimento a metà, senza alcuna ipotesi sulla regola usata per scegliere il contenitore, e la domanda è quanto sia tight questo bound: per WF il fattore $2$ non si può migliorare, mentre FF e BF rispettano un bound strettamente migliore.

<a id="box-16-prop-halffull2approx"></a>

!!! teorema "Proposizione 36.4"

    Sia $\mathscr{A}$ un algoritmo euristico per il BPP che produce soluzioni che soddisfano la proprietà di riempimento a metà. Allora, per ogni istanza $I$ del BPP, abbiamo

    $$
    \frac{\mathscr{A}(I)}{z(I)} \le 2.
    $$

??? dimostrazione "Dimostrazione"

    Sia $k := \mathscr{A}(I)$, e sia $\mathcal{P}=\{P_1,P_2,\dots,P_k\}$ l'insieme degli schemi di carico prodotti da $\mathscr{A}$, indicizzati nell'ordine di apertura dei contenitori.

    Poiché la soluzione soddisfa la proprietà di riempimento a metà, esiste al più un contenitore $b\in\{1,2,\dots,k\}$ tale che

    $$
    \sum_{i\in P_b} w_i \le \frac{c}{2}.
    $$

    Di conseguenza, almeno $k-1$ contenitori hanno peso totale strettamente maggiore di $\frac{c}{2}$. Sommando su questi contenitori, otteniamo

    $$
    \sum_{i\in\mathscr{I}} w_i \;>\; (k-1)\,\frac{c}{2}.
    $$

    D'altra parte, ogni impacchettamento ammissibile che usa $z(I)$ contenitori soddisfa

    $$
    \sum_{i\in\mathscr{I}} w_i \;\le\; z(I)\,c.
    $$

    Combinando le due disuguaglianze si ottiene

    $$
    (k-1)\,\frac{c}{2} \;<\; \sum_{i\in\mathscr{I}} w_i \;\le\; z(I)\,c
    \qquad \Longrightarrow \qquad
    k-1 \;<\; 2\,z(I)
    \qquad \Longrightarrow \qquad
    k \;<\; 2\,z(I)+1.
    $$

    Poiché sia $k$ sia $z(I)$ sono interi positivi, abbiamo

    $$
    k \;\le\; 2\,z(I).
    $$

    Dividendo per $z(I)\ge 1$ si ottiene

    $$
    \frac{k}{z(I)} = \frac{\mathscr{A}(I)}{z(I)} \;\le\; 2.
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

- Poiché ogni algoritmo Any Fit produce soluzioni che soddisfano la proprietà di riempimento a metà, segue immediatamente che

    $$
    \frac{\mathscr{A}(I)}{z(I)} \le 2
    \qquad\text{per ogni algoritmo Any Fit } \mathscr{A}
    $$

    e per ogni istanza $I$ del BPP. In particolare

    $$
    \frac{FF(I)}{z(I)} \le 2 ,
    \qquad
    \frac{BF(I)}{z(I)} \le 2
    \qquad\text{e}\qquad
    \frac{WF(I)}{z(I)} \le 2 ,
    $$

    e quindi FF, BF e WF sono algoritmi di $2$-approssimazione.

### 36.5.1 Il rapporto di prestazione nel caso peggiore di NF

<a id="box-17-prop-NF2approx"></a>

!!! teorema "Proposizione 36.5"

    Per ogni istanza $I$ del BPP, abbiamo:

    \begin{equation*}
    \frac{ NF(I) }{z(I)} \le 2 . \tag{36.1}
    \end{equation*}

??? dimostrazione "Dimostrazione"

    Sia $k := NF(I)$, e siano $P_1,P_2,\dots,P_k$ gli schemi di carico prodotti da NF, indicizzati nell'ordine di apertura dei contenitori.

    Fissiamo un qualsiasi $b\in\{1,2,\dots,k-1\}$. Lo schema di carico $P_b$ corrisponde a un contenitore che viene chiuso quando l'oggetto successivo (chiamiamolo $f$) non vi entra, quindi

    $$
    \sum_{i\in P_{b}} w_i + w_{f} > c.
    $$

    Lo stesso oggetto $f$ è il primo oggetto posto nel contenitore successivo, il cui schema di carico è $P_{b+1}$, quindi

    $$
    w_{f} \le \sum_{i\in P_{b+1}} w_i.
    $$

    Di conseguenza,

    $$
    \sum_{i\in P_{b}} w_i + \sum_{i\in P_{b+1}} w_i \;>\; c.
    $$

    Consideriamo ora le coppie consecutive disgiunte $(P_1,P_2),(P_3,P_4),\dots$. Sommando la disuguaglianza precedente sulle $\lfloor k/2\rfloor$ coppie si ottiene

    $$
    \underbrace{\sum_{b=1}^{k} \ \sum_{i\in P_{b}} w_i}_{\displaystyle =\sum_{i\in\mathscr{I}} w_i ~\le~ z(I)\;c } \;>\; \Big\lfloor \frac{k}{2}\Big\rfloor\, c
    ~~~~ \Longrightarrow ~~~~
    z(I) \;>\; \Big\lfloor \frac{k}{2}\Big\rfloor
    .
    $$

    Poiché $z(I)$ è intero, segue che

    $$
    z(I)\ge \Big\lfloor \frac{k}{2}\Big\rfloor +1.
    $$

    Allora

    $$
    \begin{cases}
    \text{se $k$ è pari, allora } \Big\lfloor \dfrac{k}{2}\Big\rfloor=\dfrac{k}{2}
    \ \Longrightarrow\
    z(I)\ge \dfrac{k}{2}+1
    \ \Longrightarrow\
    k\le 2z(I)-2<2z(I),\\[20pt]
    \text{se $k$ è dispari, allora } \Big\lfloor \dfrac{k}{2}\Big\rfloor=\dfrac{k-1}{2}
    \ \Longrightarrow\
    z(I)\ge \dfrac{k+1}{2}
    \ \Longrightarrow\
    k\le 2z(I)-1<2z(I).
    \end{cases}
    $$

    Di conseguenza $k<2z(I)$, e dividendo per $z(I)\ge 1$ si ottiene

    $$
    \frac{k}{z(I)}=\frac{NF(I)}{z(I)}\le 2.
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

<a id="box-18-prop-NFtight"></a>

!!! teorema "Proposizione 36.6"

    Esistono istanze $I_n$ del BPP tali che:

    \begin{equation*}
    \frac{ NF(I_n) }{z(I_n)} \;\to\; 2 \qquad\text{per}\qquad n\to+\infty . \tag{36.2}
    \end{equation*}

??? dimostrazione "Dimostrazione"

    Fissiamo un intero $n \ge 8$ divisibile per $4$ e consideriamo l'istanza $I_n$ del BPP con capacità dei contenitori $c=n$ e insieme di oggetti $\mathscr{I}=\{1,2,\dots,n\}$, dove i pesi degli oggetti sono

    $$
    w_i=
    \begin{cases}
    \dfrac{n}{2}, & \text{se $i$ è dispari},\\[8pt]
    2, & \text{se $i$ è pari}.
    \end{cases}
    $$

    Gli oggetti sono esaminati da NF nell'ordine naturale $1,2,\dots,n$. Per ogni $i$ dispari,

    $$
    w_i+w_{i+1}=\frac{n}{2}+2<n,
    $$

    quindi NF pone gli oggetti $i$ e $i+1$ nello stesso contenitore. Lo spazio rimanente è

    $$
    n-\left(\frac{n}{2}+2\right)=\frac{n}{2}-2<\frac{n}{2},
    $$

    quindi l'oggetto successivo, di peso $\frac{n}{2}$, non entra e NF apre un nuovo contenitore. Di conseguenza,

    $$
    NF(I_n)=\frac{n}{2}.
    $$

    Ponendo gli $\frac{n}{2}$ oggetti di peso $\frac{n}{2}$ due per contenitore si ottengono $\frac{n}{4}$ contenitori pieni, e ponendo tutti gli $\frac{n}{2}$ oggetti piccoli insieme (poiché $\frac{n}{2}\;\cdot\;2=n$) in un contenitore aggiuntivo si ha $z(I_n)\le \frac{n}{4}+1$. D'altra parte,

    $$
    z(I_n) \ge \left\lceil \frac{\sum_{i\in\mathscr{I}} w_i}{c} \right\rceil
    =\left\lceil \frac{\frac{n}{2}\;\frac{n}{2}+\frac{n}{2}\;2}{n} \right\rceil =\left\lceil \frac{n}{4}+1 \right\rceil=\frac{n}{4}+1,
    $$

    Quindi

    $$
    z(I_n)=\frac{n}{4}+1.
    $$

    Di conseguenza,

    $$
    \lim_{n\to\infty}\frac{NF(I_n)}{z(I_n)}
    =\lim_{n\to\infty}\frac{\frac{n}{2}}{\frac{n}{4}+1}
    =\lim_{n\to\infty}\frac{\frac{n}{2}}{\frac{n+4}{4}}
    =\lim_{n\to\infty}\frac{2n}{n+4}
    =\lim_{n\to\infty}\frac{2}{1+\frac{4}{n}}
    =2.
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

!!! chiave ""

    Dalla [Proposizione 36.5](#box-17-prop-NF2approx) e dalla [Proposizione 36.6](#box-18-prop-NFtight) segue che il rapporto di prestazione nel caso peggiore di NF è due, cioè abbiamo

    $$
    r(NF)=2
    $$

### 36.5.2 Il rapporto di prestazione nel caso peggiore di WF { #sez-sec-WFratio }

<a id="box-19-prop-WFtight"></a>

!!! teorema "Proposizione 36.7"

    Esistono istanze $I_n$ del BPP tali che:

    \begin{equation*}
    \frac{ WF(I_n) }{z(I_n)} \;\to\; 2 \qquad\text{per}\qquad n\to+\infty . \tag{36.3}
    \end{equation*}

??? dimostrazione "Dimostrazione"

    Fissiamo un intero $n \ge 8$ divisibile per $4$ e consideriamo l'istanza $I_n$ del BPP con capacità dei contenitori $c=n$ e insieme di oggetti $\mathscr{I}=\{1,2,\dots,n\}$, dove i pesi degli oggetti sono

    $$
    w_i=
    \begin{cases}
    \dfrac{n}{2}, & \text{se $i$ è dispari},\\[8pt]
    2, & \text{se $i$ è pari},
    \end{cases}
    $$

    cioè la stessa istanza usata sopra per NF. Gli oggetti sono esaminati da WF nell'ordine naturale $1,2,\dots,n$.

    Mostriamo per induzione che, dopo che sono stati esaminati i primi $2k$ oggetti, WF ha aperto esattamente $k$ contenitori, ciascuno con capacità residua $\frac{n}{2}-2$.

    Per $k=1$, l'oggetto $1$ (di peso $\frac{n}{2}$) è posto nel contenitore $1$, la cui capacità residua diventa $\frac{n}{2}$; poi l'oggetto $2$ (di peso $2$) è posto nel contenitore $1$, l'unico contenitore aperto, la cui capacità residua diventa $\frac{n}{2}-2$.

    Supponiamo che l'affermazione valga per un certo $k$, e consideriamo gli oggetti $2k+1$ e $2k+2$. L'oggetto $2k+1$ ha peso $\frac{n}{2}$, mentre ogni contenitore aperto ha capacità residua $\frac{n}{2}-2<\frac{n}{2}$: l'oggetto non entra da nessuna parte, quindi WF apre il contenitore $k+1$, la cui capacità residua diventa $\frac{n}{2}$. L'oggetto $2k+2$ ha peso $2$ ed entra in ogni contenitore aperto; poiché il contenitore $k+1$ è quello con la capacità residua <em>massima</em>, WF vi pone l'oggetto, e la capacità residua del contenitore $k+1$ diventa $\frac{n}{2}-2$. Questo dimostra l'affermazione per $k+1$.

    È proprio la regola Worst Fit a mantenere ogni contenitore a capacità residua $\frac{n}{2}-2$: gli oggetti piccoli sono sempre posti nel contenitore più vuoto, quindi nessun contenitore riceve mai due oggetti di peso $\frac{n}{2}$. Prendendo $k=\frac{n}{2}$ otteniamo

    $$
    WF(I_n)=\frac{n}{2}.
    $$

    Ponendo gli $\frac{n}{2}$ oggetti di peso $\frac{n}{2}$ due per contenitore si ottengono $\frac{n}{4}$ contenitori pieni, e ponendo tutti gli $\frac{n}{2}$ oggetti piccoli insieme (poiché $\frac{n}{2}\;\cdot\;2=n$) in un contenitore aggiuntivo si ha $z(I_n)\le \frac{n}{4}+1$. D'altra parte,

    $$
    z(I_n) \ge \left\lceil \frac{\sum_{i\in\mathscr{I}} w_i}{c} \right\rceil
    =\left\lceil \frac{\frac{n}{2}\;\frac{n}{2}+\frac{n}{2}\;2}{n} \right\rceil =\left\lceil \frac{n}{4}+1 \right\rceil=\frac{n}{4}+1,
    $$

    quindi

    $$
    z(I_n)=\frac{n}{4}+1.
    $$

    Di conseguenza,

    $$
    \lim_{n\to\infty}\frac{WF(I_n)}{z(I_n)}
    =\lim_{n\to\infty}\frac{\frac{n}{2}}{\frac{n}{4}+1}
    =\lim_{n\to\infty}\frac{2n}{n+4}
    =\lim_{n\to\infty}\frac{2}{1+\frac{4}{n}}
    =2.
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

!!! chiave ""

    Dalla [Proposizione 36.4](#box-16-prop-halffull2approx) e dalla [Proposizione 36.7](#box-19-prop-WFtight) segue che il rapporto di prestazione nel caso peggiore di WF è due, cioè abbiamo

    $$
    r(WF)=2
    $$

    Per WF il fattore $2$ non si può quindi migliorare.

- Abbiamo $r(WF)=r(NF)=2$: nel caso peggiore WF non è migliore di NF. I due algoritmi sono però lontani dall'essere equivalenti. WF non apre mai un nuovo contenitore finché l'oggetto entra ancora in uno dei contenitori aperti finora, mentre NF chiude un contenitore appena un oggetto non vi entra e non lo riconsidera mai. Di conseguenza NF può lasciare un numero arbitrario di contenitori riempiti per meno della metà della loro capacità, mentre WF, come mostrato nella sezione sulla proprietà di riempimento a metà, può lasciarne al più uno.

- Il valore $r(WF)=2$ è dovuto a

    D.S. Johnson, <em>Fast algorithms for bin packing</em>, Journal of Computer and System Sciences, 8(3):272–314, 1974.

### 36.5.3 I rapporti di prestazione nel caso peggiore di FF e BF

<a id="box-20-propFF"></a>

!!! teorema "Proposizione 36.8"

    Per ogni istanza $I$ del BPP, abbiamo:

    \begin{equation*}
    FF(I)\;\le\;\frac{17}{10}\,z(I) ~~~~
    \text{e} ~~~~
    BF(I)\;\le\;\frac{17}{10}\,z(I). \tag{36.4}
    \end{equation*}

??? dimostrazione "Dimostrazione"

    Dimostrazione omessa. I due bound sono stati dimostrati per la prima volta nella forma più debole

    $$
    FF(I)\le\frac{17}{10}\,z(I)+2 \qquad\text{e}\qquad BF(I)\le\frac{17}{10}\,z(I)+2
    $$

    in

    D.S. Johnson, A. Demers, J.D. Ullman, M.R. Garey e R.L. Graham, <em>Worst-case performance bounds for simple one-dimensional packing algorithms</em>, SIAM Journal on Computing, 3(4):299–325, 1974.

    La costante additiva è stata poi eliminata, nella forma enunciata sopra, rispettivamente in

    G. Dósa e J. Sgall, <em>First Fit bin packing: a tight analysis</em>, STACS 2013, pp. 538–549,

    G. Dósa e J. Sgall, <em>Optimal analysis of Best Fit bin packing</em>, ICALP 2014, pp. 429–441. <span class="qed">□</span>

<a id="box-21-propFFtight"></a>

!!! teorema "Proposizione 36.9"

    Esistono istanze $I_n$ del BPP tali che:

    \begin{equation*}
    \frac{FF(I_n)}{z(I_n)} \;\to\; \frac{17}{10} ~~~~
    \text{e} ~~~~
    \frac{BF(I_n)}{z(I_n)} \;\to\; \frac{17}{10}
    \qquad\text{per}\qquad n\to+\infty . \tag{36.5}
    \end{equation*}

??? dimostrazione "Dimostrazione"

    Dimostrazione omessa. Famiglie di istanze su cui il rapporto di FF e BF tende a $\frac{17}{10}$ sono date nell'articolo di Johnson, Demers, Ullman, Garey e Graham citato sopra, e in

    D.S. Johnson, <em>Near-optimal bin packing algorithms</em>, tesi di dottorato, Massachusetts Institute of Technology, 1973. <span class="qed">□</span>

!!! chiave ""

    Dalla [Proposizione 36.8](#box-20-propFF) e dalla [Proposizione 36.9](#box-21-propFFtight) segue che il rapporto di prestazione nel caso peggiore di FF e BF è diciassette decimi, cioè abbiamo

    $$
    r(FF)=r(BF)=\frac{17}{10}
    $$

    A differenza di WF, FF e BF restano strettamente sotto il fattore $2$ che la sola condizione Any Fit garantisce.

### 36.5.4 Che cosa dà e che cosa non dà la condizione Any Fit

- <strong>Che cosa dà la condizione Any Fit.</strong> La sola condizione Any Fit garantisce la proprietà di riempimento a metà, e quindi il bound

    $$
    \mathscr{A}(I)\le 2\,z(I)
    $$

    per ogni algoritmo $\mathscr{A}$ della classe. Questo bound non si può migliorare per la classe nel suo complesso: WF è un algoritmo Any Fit e, come mostrato sopra, $r(WF)=2$.

- <strong>Che cosa lascia libero la condizione Any Fit.</strong> La regola usata per scegliere uno dei contenitori in cui l'oggetto entra è ciò che distingue i membri della famiglia. Sulle istanze della [Proposizione 36.9](#box-21-propFFtight) il rapporto di FF e BF tende a $\frac{17}{10}$, mentre su quelle della [Proposizione 36.7](#box-19-prop-WFtight) il rapporto di WF tende a $2$: la sola regola di scelta spiega tutto il divario fra $\frac{17}{10}$ e $2$.

- È noto che nessun algoritmo della classe può scendere sotto $\frac{17}{10}$, quindi $\frac{17}{10}$ e $2$ sono esattamente il comportamento migliore e quello peggiore che la condizione Any Fit consente, ed entrambi sono raggiunti, il primo da FF e BF, il secondo da WF.

- La classe Any Fit e i bound precedenti si devono all'articolo di Johnson già citato nella Sezione [36.5.2](#sez-sec-WFratio): in particolare, il lower bound $\frac{17}{10}$ per ogni algoritmo Any Fit è dovuto a quell'articolo (D.S. Johnson, 1974).

## 36.6 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Credere che Next Fit sia un algoritmo Any Fit.</strong> NF non riconsidera mai un contenitore chiuso, quindi può aprire un nuovo contenitore per un oggetto che entrerebbe in uno più vecchio ([Esempio 36.3](#box-4-ex-notAF)).

    - <strong>Scegliere il contenitore sbagliato in BF e WF.</strong> BF pone l'oggetto nel contenitore con la capacità residua <em>minima</em> fra i contenitori in cui entra, WF in quello con la capacità residua <em>massima</em>; in caso di pareggio, entrambi prendono il contenitore di indice minimo.

    - <strong>Leggere la proprietà di riempimento a metà come «nessuna coppia di contenitori si può fondere».</strong> Due contenitori di peso totale $6$ e $1$ con $c=10$ soddisfano la proprietà e si possono fondere; la proprietà è ciò che dimostra la garanzia $2$.

    - <strong>Trattare $r=2$ come un valore raggiunto.</strong> I rapporti nel caso peggiore di NF e WF sono estremi superiori: le famiglie di istanze si avvicinano a $2$ al crescere di $n$, e nessuna istanza lo raggiunge.

    - <strong>Cambiare l'ordine degli oggetti.</strong> I quattro algoritmi esaminano gli oggetti nell'ordine in cui sono dati; ordinarli prima è un algoritmo diverso.

## 36.7 In sintesi

!!! chiave "In sintesi"

    - NF, FF, BF e WF collocano ogni oggetto appena arriva; NF mantiene un solo contenitore aperto, gli altri tre mantengono tutti i contenitori aperti finora e aprono un nuovo contenitore solo quando l'oggetto non entra da nessuna parte (classe Any Fit).

    - In una soluzione Any Fit gli oggetti di due contenitori non entrano mai insieme, quindi tutti i contenitori tranne al più uno sono pieni per più della metà (proprietà di riempimento a metà), e $\mathscr{A}(I)\le 2\,z(I)$.

    - $r(NF)=r(WF)=2$ e $r(FF)=r(BF)=\frac{17}{10}$: la sola regola di scelta separa il comportamento migliore e quello peggiore della classe Any Fit.

    <strong>Quadro riassuntivo dell'istanza del BPP</strong> $c=10$, $w=(6,5,4,7,3)$. I bound su $z(I)$ trovati finora:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Fonte</th>
    <th>Lower bound</th>
    <th>Upper bound</th>
    <th>Da</th>
    </tr>
    <tr>
    <td>Bound di conteggio</td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td>–</td>
    <td><span class="arithmatex">\(\left\lceil \frac{25}{10} \right\rceil\)</span></td>
    </tr>
    <tr>
    <td>Questo capitolo, NF</td>
    <td>–</td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(bin=(1,2,2,3,3)\)</span></td>
    </tr>
    <tr>
    <td>Questo capitolo, FF, BF, WF</td>
    <td>–</td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(3\)</span> contenitori ciascuno, con tre assegnamenti diversi</td>
    </tr>
    <tr>
    <td>Valore ottimo</td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td>lower e upper bound coincidono</td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Bin packing (BPP)](../esercizi/bin-packing-approximation.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Istanze tight](../laboratorio/istanze-tight.md#voce=nf).