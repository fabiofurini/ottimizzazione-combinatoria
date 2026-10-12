---
title: "Esercizi · Algoritmi euristici: definizioni"
---

# Esercizi · Algoritmi euristici: definizioni

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 29** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 29: Definizioni](../algoritmi-euristici/heuristics.md) · [:material-file-pdf-box: Eserciziario, volume 4 (PDF)](../pdf/esercizi-4-algoritmi-euristici.pdf)

</div>

<a id="esercizio-29-1"></a>

!!! esercizio "Esercizio 29.1: Gap ed errore relativo (1)"

    Consideriamo uno zaino di capacità $c=12$ e $n=5$ oggetti con i seguenti profitti e pesi:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\[1ex]
    \hline {p_j} & {20} & {18} & {14} & {9} & {6} \\
    {w_j} & {6} & {5} & {4} & {3} & {2} \\
    \hline
    \end{array}
    $$

    Un algoritmo euristico restituisce gli oggetti $\{1,2\}$.

    **Domande**

    1. Verificare che la soluzione euristica sia ammissibile e darne il valore $\mathscr{A}(I)$. È un bound primale o duale, un upper bound o un lower bound?

    2. Calcolare il bound duale $\mathrm{UB}(I)$ dato dal rilassamento lineare, arrotondato per difetto.

    3. Calcolare il gap della soluzione euristica.

    4. Trovare il valore ottimo $z(I)$ per enumerazione, calcolare l'errore relativo e verificare che sia al più il gap.

??? soluzione "Soluzione"

    !!! nota ""

        Per un valore euristico $\mathscr{A}(I)$ e un bound duale, il gap è la differenza dei due bound divisa per il minore:

        \begin{align*}
        gap(I)&=\frac{\mathscr{A}(I)-\mathrm{LB}(I)}{\mathrm{LB}(I)}~~\text{(minimo)},\\
        gap(I)&=\frac{\mathrm{UB}(I)-\mathscr{A}(I)}{\mathscr{A}(I)}~~\text{(massimo)},
        \end{align*}

        e l'errore relativo è $\frac{\mathscr{A}(I)-z(I)}{z(I)}$ (minimo) oppure $\frac{z(I)-\mathscr{A}(I)}{z(I)}$ (massimo). L'errore relativo è al più il gap.

    1. Il peso è $6+5=11\le 12$, quindi la soluzione è ammissibile, con $\mathscr{A}(I)=20+18=38$. Il KP è un problema di massimo: $\mathscr{A}(I)$ è un bound primale, e un lower bound su $z(I)$.

    2. Le efficienze $\frac{p_j}{w_j}$ sono $\frac{10}{3}$, $\frac{18}{5}$, $\frac{7}{2}$, $3$, $3$, quindi gli oggetti ordinati per efficienza non crescente sono $(2,3,1,4,5)$. Il rilassamento inserisce gli oggetti $2$, $3$ (peso $9$) e una frazione $\frac{1}{2}$ dell'oggetto $1$:

        $$
        z(I)\le 18+14+20\cdot\frac{1}{2}=42 .
        $$

        I profitti sono interi, quindi $\mathrm{UB}(I)=\lfloor 42\rfloor=42$.

    3. &#8203;

        $$
        gap(I)=\frac{\mathrm{UB}(I)-\mathscr{A}(I)}{\mathscr{A}(I)}=\frac{42-38}{38}=\frac{2}{19}\approx 10.5\% .
        $$

    4. Enumerando i $2^5=32$ sottoinsiemi si ottiene $z(I)=41$, raggiunto da $\{2,3,4\}$ (peso $12$). L'errore relativo è

        $$
        \frac{z(I)-\mathscr{A}(I)}{z(I)}=\frac{41-38}{41}=\frac{3}{41}\approx 7.3\%~\le~ 10.5\% .
        $$

        Il gap sovrastima l'errore perché $\mathrm{UB}(I)>z(I)$, e perché divide per $\mathscr{A}(I)<z(I)$.

<a id="esercizio-29-2"></a>

!!! esercizio "Esercizio 29.2: Gap per problemi di minimo (1)"

    Consideriamo le tre istanze e le soluzioni euristiche seguenti.

    - **(a)** BPP con $c=10$ e pesi $(6, 5, 4, 4, 3, 3, 2, 2)$; schemi di riempimento euristici $\{1\}$, $\{2,3\}$, $\{4,5\}$, $\{6,7,8\}$.

    - **(b)** BPP con $c=10$ e pesi $(6, 6, 6, 5, 2)$; schemi di riempimento euristici $\{1\}$, $\{2\}$, $\{3\}$, $\{4\}$, $\{5\}$.

    - **(c)** $P\|C_{\max}$ con $m=3$ e tempi di lavorazione $(7, 6, 5, 4, 3, 3, 2)$; schedulazione euristica $J_1=\{1,4\}$, $J_2=\{2,5,6\}$, $J_3=\{3,7\}$.

    **Domande**

    1. Verificare che le tre soluzioni euristiche siano ammissibili e darne i valori $\mathscr{A}(I)$.

    2. Calcolare i bound duali $\mathrm{LB}(I)=\left\lceil\frac{\sum_j w_j}{c}\right\rceil$ per il BPP e $\mathrm{LB}(I)=\max\left\{\max_j t_j,\left\lceil\frac{\sum_j t_j}{m}\right\rceil\right\}$ per $P\|C_{\max}$, e i gap.

    3. Calcolare i valori ottimi (Gurobi per il BPP, enumerazione per $P\|C_{\max}$) e gli errori relativi. Quando il gap e l'errore sono uguali?

??? soluzione "Soluzione"

    !!! nota ""

        Per un valore euristico $\mathscr{A}(I)$ e un bound duale, il gap è la differenza dei due bound divisa per il minore:

        \begin{align*}
        gap(I)&=\frac{\mathscr{A}(I)-\mathrm{LB}(I)}{\mathrm{LB}(I)}~~\text{(minimo)},\\
        gap(I)&=\frac{\mathrm{UB}(I)-\mathscr{A}(I)}{\mathscr{A}(I)}~~\text{(massimo)},
        \end{align*}

        e l'errore relativo è $\frac{\mathscr{A}(I)-z(I)}{z(I)}$ (minimo) oppure $\frac{z(I)-\mathscr{A}(I)}{z(I)}$ (massimo). L'errore relativo è al più il gap.

    1. - **(a)** I pesi degli schemi sono $6$, $9$, $7$, $7$, tutti al più $10$: $\mathscr{A}(I)=4$.

        - **(b)** Ogni oggetto è da solo nel suo contenitore: $\mathscr{A}(I)=5$.

        - **(c)** I carichi sono $11$, $12$, $7$: $\mathscr{A}(I)=12$.

        I tre problemi sono tutti problemi di minimo, quindi questi valori sono upper bound su $z(I)$.

    2. - **(a)** $\mathrm{LB}(I)=\left\lceil \frac{29}{10}\right\rceil=3$ e $gap(I)=\frac{4-3}{3}\approx 33.3\%$.

        - **(b)** $\mathrm{LB}(I)=\left\lceil \frac{5}{2}\right\rceil=3$ e $gap(I)=\frac{5-3}{3}\approx 66.7\%$.

        - **(c)** $\mathrm{LB}(I)=\max\{7,\lceil 30/3\rceil\}=10$ e $gap(I)=\frac{12-10}{10}=\frac{1}{5}\approx 20.0\%$.

    3. - **(a)** $z(I)=3$, per esempio con $\{1,3\}$, $\{2,5,7\}$, $\{4,6,8\}$; l'errore è $\frac{4-3}{3}\approx 33.3\%$.

        - **(b)** $z(I)=4$: i tre oggetti di peso $6$ richiedono tre contenitori, e l'oggetto di peso $5$ non entra con nessuno di essi; l'errore è $\frac{5-4}{4}=\frac{1}{4}= 25.0\%$, molto minore del gap.

        - **(c)** $z(I)=10$, per esempio con $\{1,5\}$, $\{2,4\}$, $\{3,6,7\}$; l'errore è $\frac{1}{5}\approx 20.0\%$.

        Il gap è uguale all'errore relativo esattamente quando il bound duale è uguale a $z(I)$, come in (a) e (c). In (b) il bound è debole, e il gap sovrastima l'errore.

<a id="esercizio-29-3"></a>

!!! esercizio "Esercizio 29.3: Un bound duale per il TSP (1)"

    Consideriamo un'istanza del TSP con $n=5$ città e le distanze simmetriche

    $$
    \begin{array}{c|ccccc}
    \hline
    d_{ij} & 1 & 2 & 3 & 4 & 5\\
    \hline
    1 & - & 4 & 10 & 2 & 8\\
    2 & 4 & - & 11 & 2 & 5\\
    3 & 10 & 11 & - & 4 & 2\\
    4 & 2 & 2 & 4 & - & 2\\
    5 & 8 & 5 & 2 & 2 & -\\
    \hline
    \end{array}
    $$

    Due algoritmi euristici restituiscono i giri $\sigma_1=(1,2,3,4,5)$ e $\sigma_2=(1,4,2,5,3)$.

    **Domande**

    1. Calcolare le lunghezze $L(\sigma_1)$ e $L(\sigma_2)$.

    2. Calcolare il bound duale del capitolo basato sulle due distanze minime da ogni città.

    3. Calcolare i gap dei due giri.

    4. Trovare il giro ottimo enumerando i giri distinti e calcolare gli errori relativi. Confrontarli con i gap.

??? soluzione "Soluzione"

    !!! nota ""

        Per un valore euristico $\mathscr{A}(I)$ e un bound duale, il gap è la differenza dei due bound divisa per il minore:

        \begin{align*}
        gap(I)&=\frac{\mathscr{A}(I)-\mathrm{LB}(I)}{\mathrm{LB}(I)}~~\text{(minimo)},\\
        gap(I)&=\frac{\mathrm{UB}(I)-\mathscr{A}(I)}{\mathscr{A}(I)}~~\text{(massimo)},
        \end{align*}

        e l'errore relativo è $\frac{\mathscr{A}(I)-z(I)}{z(I)}$ (minimo) oppure $\frac{z(I)-\mathscr{A}(I)}{z(I)}$ (massimo). L'errore relativo è al più il gap.

    1. $L(\sigma_1)=4+11+4+2+8=29$ e $L(\sigma_2)=2+2+5+2+10=21$.

    2. Le due distanze minime da ogni città sono $(2,4)$ per la città $1$, $(2,4)$ per la città $2$, $(2,4)$ per la città $3$, $(2,2)$ per la città $4$, $(2,2)$ per la città $5$. Quindi

        $$
        \mathrm{LB}(I)=\left\lceil\frac{1}{2}\left(6+6+6+4+4\right)\right\rceil=\left\lceil 13\right\rceil=13.
        $$

    3. $gap_1=\frac{29-13}{13}=\frac{16}{13}\approx 123.1\%$ e $gap_2=\frac{21-13}{13}=\frac{8}{13}\approx 61.5\%$.

    4. Ci sono $\frac{(n-1)!}{2}=12$ giri distinti, e il più corto è $(1,2,5,3,4)$, di lunghezza $z(I)=17$. Gli errori relativi sono $\frac{29-17}{17}\approx 70.6\%$ e $\frac{21-17}{17}\approx 23.5\%$, minori dei gap, perché $\mathrm{LB}(I)=13<z(I)=17$. Entrambe le misure classificano $\sigma_2$ meglio di $\sigma_1$.

<a id="esercizio-29-4"></a>

!!! esercizio "Esercizio 29.4: Intorni e ottimi locali (1)"

    Consideriamo uno zaino di capacità $c=11$ e $n=5$ oggetti:

    $$
    \begin{array}{l|ccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} \\[1ex]
    \hline {p_j} & {12} & {10} & {9} & {7} & {4} \\
    {w_j} & {6} & {5} & {4} & {3} & {2} \\
    \hline
    \end{array}
    $$

    Le soluzioni sono rappresentate da vettori binari $\vet x\in\{0,1\}^n$. L'intorno <strong>flip</strong> aggiunge o toglie un oggetto; l'intorno <strong>swap</strong> toglie un oggetto scelto e aggiunge un oggetto non scelto. Contano solo i vicini ammissibili.

    **Domande**

    1. Dare la dimensione dello spazio di ricerca e il numero dei suoi elementi che sono soluzioni ammissibili.

    2. Considerare la soluzione $\{1,3\}$. Elencarne i vicini flip e i vicini swap, e stabilire se è un ottimo locale per ciascun intorno.

    3. Fare lo stesso per la soluzione $\{1,2\}$.

    4. Trovare l'ottimo globale per enumerazione. Uno dei due intorni è esatto su questa istanza?

??? soluzione "Soluzione"

    1. Lo spazio di ricerca è $\{0,1\}^5$, con $2^5=32$ vettori; $20$ di essi rispettano la capacità. Gli altri la superano: la rappresentazione può descrivere oggetti inammissibili.

    2. La soluzione ha peso $10$ e profitto $21$.

        Vicini flip:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>vicino</th>
        <th>mossa</th>
        <th>peso</th>
        <th>profitto</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{3\}\)</span></td>
        <td>esce <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,2,3\}\)</span></td>
        <td>entra <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td>— (inammissibile)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1\}\)</span></td>
        <td>esce <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,3,4\}\)</span></td>
        <td>entra <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td>— (inammissibile)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,3,5\}\)</span></td>
        <td>entra <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td>— (inammissibile)</td>
        </tr>
        </table></div>

        Nessun vicino flip ammissibile ha profitto maggiore di $21$: la soluzione è un ottimo locale per l'intorno flip.

        Vicini swap:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>vicino</th>
        <th>mossa</th>
        <th>peso</th>
        <th>profitto</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,3\}\)</span></td>
        <td>esce <span class="arithmatex">\(1\)</span>, entra <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{3,4\}\)</span></td>
        <td>esce <span class="arithmatex">\(1\)</span>, entra <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{3,5\}\)</span></td>
        <td>esce <span class="arithmatex">\(1\)</span>, entra <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,2\}\)</span></td>
        <td>esce <span class="arithmatex">\(3\)</span>, entra <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,4\}\)</span></td>
        <td>esce <span class="arithmatex">\(3\)</span>, entra <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,5\}\)</span></td>
        <td>esce <span class="arithmatex">\(3\)</span>, entra <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        </tr>
        </table></div>

        Il vicino $\{1,2\}$ ha profitto $22>21$: la soluzione non è un ottimo locale per l'intorno swap.

    3. La soluzione ha peso $11$ e profitto $22$.

        Vicini flip:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>vicino</th>
        <th>mossa</th>
        <th>peso</th>
        <th>profitto</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2\}\)</span></td>
        <td>esce <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1\}\)</span></td>
        <td>esce <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,2,3\}\)</span></td>
        <td>entra <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td>— (inammissibile)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,2,4\}\)</span></td>
        <td>entra <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td>— (inammissibile)</td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,2,5\}\)</span></td>
        <td>entra <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(13\)</span></td>
        <td>— (inammissibile)</td>
        </tr>
        </table></div>

        Vicini swap:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>vicino</th>
        <th>mossa</th>
        <th>peso</th>
        <th>profitto</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,3\}\)</span></td>
        <td>esce <span class="arithmatex">\(1\)</span>, entra <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,4\}\)</span></td>
        <td>esce <span class="arithmatex">\(1\)</span>, entra <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{2,5\}\)</span></td>
        <td>esce <span class="arithmatex">\(1\)</span>, entra <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,3\}\)</span></td>
        <td>esce <span class="arithmatex">\(2\)</span>, entra <span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,4\}\)</span></td>
        <td>esce <span class="arithmatex">\(2\)</span>, entra <span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(19\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\{1,5\}\)</span></td>
        <td>esce <span class="arithmatex">\(2\)</span>, entra <span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        </tr>
        </table></div>

        Nessun vicino ammissibile è migliore: $\{1,2\}$ è un ottimo locale per entrambi gli intorni.

    4. L'ottimo globale è $\{1,4,5\}$, di peso $11$ e profitto $z(I)=23$. La soluzione $\{1,2\}$ è un ottimo locale per entrambi gli intorni con profitto $22<23$, quindi nessuno dei due intorni è esatto: per raggiungere l'ottimo da $\{1,2\}$ bisogna togliere un oggetto e aggiungerne due.

<a id="esercizio-29-5"></a>

!!! esercizio "Esercizio 29.5: Euristiche costruttive, ricerca locale e metaeuristiche (1)"

    Consideriamo $P\|C_{\max}$ con $m=2$ macchine e $n=6$ lavori:

    $$
    \begin{array}{l|cccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} \\[1ex]
    \hline {t_j} & {8} & {4} & {4} & {6} & {3} & {7} \\
    \hline
    \end{array}
    $$

    Una soluzione è rappresentata dal vettore $\vet{mach}$, dove $mach_j$ è la macchina del lavoro $j$. Si propongono tre procedure:

    - **(P1)** considerare i lavori nell'ordine $1,\dots,n$ e assegnare ogni lavoro alla macchina con il carico corrente minimo (pareggi: indice di macchina minimo); non cambiare mai un assegnamento;

    - **(P2)** partendo da una soluzione, spostare un lavoro sull'altra macchina, scegliendo la mossa con il makespan minimo (pareggi: indice di lavoro minimo); ripetere finché il makespan diminuisce strettamente;

    - **(P3)** ripetere (P2) molte volte, ogni volta da una soluzione ottenuta assegnando ogni lavoro a una macchina casuale, e tenere la soluzione migliore trovata.

    **Domande**

    1. Dare la dimensione dello spazio di ricerca di questa rappresentazione. I suoi elementi sono tutti ammissibili?

    2. Classificare le tre procedure usando le classi del capitolo.

    3. Applicare (P1), e poi applicare (P2) partendo dalla sua soluzione. Mostrare i vicini esaminati a ogni passo.

    4. Trovare il valore ottimo per enumerazione. La soluzione restituita da (P2) è un ottimo globale? Sarebbe un ottimo locale per l'intorno che scambia due lavori su macchine diverse?

    5. Spiegare i ruoli dell'intensificazione e della diversificazione in (P2) e (P3).

??? soluzione "Soluzione"

    1. Lo spazio di ricerca è $\{1,2\}^6$, con $m^n=2^6=64$ vettori. Ogni vettore è una schedulazione ammissibile, perché le macchine non hanno capacità.

    2. (P1) è un'euristica costruttiva: estende una soluzione parziale un lavoro alla volta e non rivede mai una scelta. (P2) è una ricerca locale con l'intorno che sposta un lavoro. (P3) è una metaeuristica: guida la ricerca locale oltre il primo ottimo locale facendola ripartire da altre soluzioni.

    3. (P1) dà $\vet{mach}=(1,2,2,1,2,2)$, con carichi $(14,18)$ e makespan $18$.

        \*\*Iterazione 1\*\*<br> I vicini della soluzione di (P1) sono:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th>makespan</th>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(1\)</span> sulla macchina <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((6,26)\)</span></td>
        <td><span class="arithmatex">\(26\)</span></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(2\)</span> sulla macchina <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((18,14)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(3\)</span> sulla macchina <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((18,14)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(4\)</span> sulla macchina <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((8,24)\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(5\)</span> sulla macchina <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((17,15)\)</span></td>
        <td><span class="arithmatex">\(17\)</span></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(6\)</span> sulla macchina <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((21,11)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        </tr>
        </table></div>

        Il migliore ha makespan $17<18$: la nuova soluzione è $\vet{mach}=(1,2,2,1,1,2)$.

        \*\*Iterazione 2\*\*<br> I suoi vicini sono:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>mossa</th>
        <th>carichi</th>
        <th>makespan</th>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(1\)</span> sulla macchina <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((9,23)\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(2\)</span> sulla macchina <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((21,11)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(3\)</span> sulla macchina <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((21,11)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(4\)</span> sulla macchina <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((11,21)\)</span></td>
        <td><span class="arithmatex">\(21\)</span></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(5\)</span> sulla macchina <span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((14,18)\)</span></td>
        <td><span class="arithmatex">\(18\)</span></td>
        </tr>
        <tr>
        <td>lavoro <span class="arithmatex">\(6\)</span> sulla macchina <span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((24,8)\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        </tr>
        </table></div>

        Nessun vicino ha makespan minore di $17$: (P2) si ferma in un ottimo locale.

    4. L'enumerazione dà $z(I)=16$, per esempio con $J_1=\{1,2,3\}$ e $J_2=\{4,5,6\}$. L'ottimo locale di (P2), di makespan $17$, non è un ottimo globale. Scambiando i lavori $1$ e $6$ si ottengono carichi $(16,16)$ e makespan $16$: per l'intorno di scambio la soluzione non è un ottimo locale. Essere un ottimo locale dipende dall'intorno.

    5. (P2) è pura intensificazione: scende e si ferma sul fondo della prima valle che incontra. Le soluzioni di partenza casuali di (P3) sono diversificazione: portano la ricerca in altre regioni dello spazio di ricerca, dove un'altra ricerca locale può trovare una valle migliore. Tenere la soluzione migliore rende utili le esecuzioni ripetute.
