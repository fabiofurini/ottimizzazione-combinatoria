---
title: "Esercizi · Principi degli algoritmi di approssimazione"
---

# Esercizi · Principi degli algoritmi di approssimazione

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 34** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 34: Principi](../algoritmi-di-approssimazione/approximation.md) · [:material-file-pdf-box: Eserciziario, volume 5 (PDF)](../pdf/esercizi-5-algoritmi-di-approssimazione.pdf)

</div>

!!! formula "Definizioni usate in questi esercizi"

    Le misure del capitolo [Principi degli algoritmi di approssimazione](../algoritmi-di-approssimazione/approximation.md), per un algoritmo $\mathscr{A}$ di valore $\mathscr{A}(I)$ su un'istanza $I$ di valore ottimo $z(I)$:

    \begin{align*}
    &\text{rapporto di prestazione:} && \frac{\mathscr{A}(I)}{z(I)}~\text{(minimo)}, && \frac{z(I)}{\mathscr{A}(I)}~\text{(massimo)}; \tag{A1}\\
    &\text{errore additivo:} && \mathscr{A}(I)-z(I)~\text{(minimo)}, && z(I)-\mathscr{A}(I)~\text{(massimo)}; \tag{A2}\\
    &\text{errore relativo:} && \frac{\mathscr{A}(I)-z(I)}{z(I)}~\text{(minimo)}, && \frac{z(I)-\mathscr{A}(I)}{z(I)}~\text{(massimo)}. \tag{A3}
    \end{align*}

    Il rapporto di prestazione nel caso peggiore è l'estremo superiore del rapporto di prestazione (A1) su tutte le istanze:

    \begin{equation*}
    r(\mathscr{A})=\sup_{I}~\frac{\mathscr{A}(I)}{z(I)}~\text{(minimo)}, \qquad r(\mathscr{A})=\sup_{I}~\frac{z(I)}{\mathscr{A}(I)}~\text{(massimo)}. \tag{A4}
    \end{equation*}

<a id="esercizio-34-1"></a>

!!! esercizio "Esercizio 34.1: Rapporti di prestazione ed errori (1)"

    Un algoritmo euristico $\mathscr{A}$ per un problema di <strong>minimo</strong> e un algoritmo euristico $\mathscr{B}$ per un problema di <strong>massimo</strong> danno i seguenti valori su alcune istanze:

    $$
    \begin{array}{lccccc}
    \hline {\mathscr{A}}\text{ (min)} & {I_1} & {I_2} & {I_3} & {I_4} & {I_5} \\
    \hline {\mathscr{A}(I)} & {12} & {9} & {15} & {20} & {7} \\
    {z(I)} & {10} & {9} & {10} & {16} & {6} \\
    \hline
    \end{array}
    $$

    $$
    \begin{array}{lccc}
    \hline {\mathscr{B}}\text{ (max)} & {I_1} & {I_2} & {I_3} \\
    \hline {\mathscr{B}(I)} & {30} & {25} & {16} \\
    {z(I)} & {36} & {25} & {24} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Calcolare il rapporto di prestazione, l'errore additivo e l'errore relativo di $\mathscr{A}$ sulle sue cinque istanze.

    2. Fare lo stesso per $\mathscr{B}$ sulle sue tre istanze.

    3. Usando solo questi dati, quale delle costanti $\alpha=\frac{7}{5}$ e $\alpha=\frac{3}{2}$ può essere una garanzia di prestazione relativa di $\mathscr{A}$? Che cosa servirebbe per dimostrare che $\mathscr{A}$ è un algoritmo di $\frac{3}{2}$-approssimazione?

    4. Supporre che sia dimostrato che $\mathscr{A}$ è un algoritmo di $\frac{3}{2}$-approssimazione. La garanzia è tight? Dare un lower bound su $r(\mathscr{A})$ e su $r(\mathscr{B})$.

??? soluzione "Soluzione"

    Usiamo le definizioni (A1)–(A4) del box all'inizio del capitolo.

    1. Per un problema di minimo il rapporto è $\frac{\mathscr{A}(I)}{z(I)}$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>istanza</th>
        <th><span class="arithmatex">\(\mathscr{A}(I)\)</span></th>
        <th><span class="arithmatex">\(z(I)\)</span></th>
        <th>rapporto</th>
        <th>errore additivo</th>
        <th>errore relativo</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(I_1\)</span></td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(\frac{6}{5}\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(\frac{1}{5}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(I_2\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(I_3\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(\frac{3}{2}\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(\frac{1}{2}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(I_4\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(\frac{5}{4}\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(\frac{1}{4}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(I_5\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\frac{7}{6}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(\frac{1}{6}\)</span></td>
        </tr>
        </table></div>

    2. Per un problema di massimo il rapporto è $\frac{z(I)}{\mathscr{B}(I)}$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>istanza</th>
        <th><span class="arithmatex">\(\mathscr{B}(I)\)</span></th>
        <th><span class="arithmatex">\(z(I)\)</span></th>
        <th>rapporto</th>
        <th>errore additivo</th>
        <th>errore relativo</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(I_1\)</span></td>
        <td><span class="arithmatex">\(30\)</span></td>
        <td><span class="arithmatex">\(36\)</span></td>
        <td><span class="arithmatex">\(\frac{6}{5}\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(\frac{1}{6}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(I_2\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(0\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(I_3\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(24\)</span></td>
        <td><span class="arithmatex">\(\frac{3}{2}\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(\frac{1}{3}\)</span></td>
        </tr>
        </table></div>

        Tutti i rapporti sono almeno $1$, come deve essere per soluzioni ammissibili.

    3. Su $I_3$ il rapporto è $\frac{3}{2}>\frac{7}{5}$: $\alpha=\frac{7}{5}$ non è una garanzia di prestazione relativa. I dati non escludono $\alpha=\frac{3}{2}$, perché ogni rapporto è al più $\frac{3}{2}$. Una dimostrazione deve mostrare $\mathscr{A}(I)\le\frac{3}{2}\,z(I)$ per <em>ogni</em> istanza $I$: un numero finito di esempi può solo smentire una garanzia.

    4. Sì: l'istanza $I_3$ raggiunge il rapporto $\frac{3}{2}$, quindi nessuna costante minore è una garanzia, e $r(\mathscr{A})=\frac{3}{2}$. Senza una dimostrazione, i dati danno solo lower bound: $r(\mathscr{A})\ge\frac{3}{2}$ e $r(\mathscr{B})\ge\frac{3}{2}$ (istanza $I_3$ di $\mathscr{B}$).

<a id="esercizio-34-2"></a>

!!! esercizio "Esercizio 34.2: Una garanzia tight per un algoritmo semplice (1)"

    Per $P\|C_{\max}$ consideriamo l'algoritmo $\mathrm{ONE}$, che assegna tutti i lavori alla macchina $1$, così che $\mathrm{ONE}(I)=\sum_{j\in\mathscr{J}}t_j$. Ogni istanza soddisfa $z(I)\ge\frac{\sum_j t_j}{m}$, perché la somma degli $m$ carichi è $\sum_j t_j$. Consideriamo le istanze

    - **$I_1$:** $m=2$ e $t=(7,5,4,3,3)$;

    - **$I_2$:** $m=3$ e $t=(9,2,2,2,1)$;

    - **$I_3$:** $m=3$ e $t=(5,5,4,4,3,3,3)$;

    **Domande**

    1. Calcolare $\mathrm{ONE}(I)$, $z(I)$ (per enumerazione) e il rapporto di prestazione sulle tre istanze.

    2. Dimostrare che $\mathrm{ONE}$ è un algoritmo di $m$-approssimazione per ogni numero fissato $m$ di macchine.

    3. Costruire, per ogni $m\ge 2$, un'istanza su cui il rapporto è esattamente $m$, e verificarla con $m=4$. Che cosa si può concludere?

    4. $\mathrm{ONE}$ ha una garanzia di prestazione additiva finita? Usare l'istanza $I_1$ con tutti i tempi di lavorazione moltiplicati per $10$.

??? soluzione "Soluzione"

    Usiamo le definizioni (A1)–(A4) del box all'inizio del capitolo.

    1. &#8203;

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>istanza</th>
        <th><span class="arithmatex">\(m\)</span></th>
        <th><span class="arithmatex">\(\mathrm{ONE}(I)\)</span></th>
        <th><span class="arithmatex">\(z(I)\)</span></th>
        <th>rapporto</th>
        <th>garanzia <span class="arithmatex">\(m\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(I_1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(22\)</span></td>
        <td><span class="arithmatex">\(11\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(I_2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(\frac{16}{9}\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(I_3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(27\)</span></td>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        </table></div>

        Il rapporto non supera mai $m$, ed è uguale a $m$ su $I_1$ e $I_3$.

    2. Per ogni istanza, $z(I)\ge\frac{\sum_j t_j}{m}$ dà

        $$
        \frac{\mathrm{ONE}(I)}{z(I)}=\frac{\sum_j t_j}{z(I)}\le\frac{\sum_j t_j}{\frac{\sum_j t_j}{m}}=m .
        $$

    3. Prendiamo $n=2m$ lavori di tempo $1$. Due lavori per macchina danno $z(I)=2$, mentre $\mathrm{ONE}(I)=2m$: il rapporto è $m$. Con $m=4$: $\mathrm{ONE}(I)=8$, $z(I)=2$ (enumerazione) e il rapporto è $4$. La garanzia $m$ è tight e $r(\mathrm{ONE})=m$.

    4. Moltiplicando i tempi di $I_1$ per $10$ si ottiene $t=(70,50,40,30,30)$, con $\mathrm{ONE}(I)=220$ e $z(I)=110$: l'errore additivo passa da $11$ a $110$. Moltiplicando per un qualsiasi $K$ l'errore si moltiplica per $K$, quindi nessuna costante $\beta$ lo limita: $e(\mathrm{ONE})=\infty$, mentre il rapporto resta $2$.

<a id="esercizio-34-3"></a>

!!! esercizio "Esercizio 34.3: Un algoritmo senza garanzia (1)"

    Per il BPP consideriamo l'algoritmo $\mathrm{SEP}$, che mette ogni oggetto in un contenitore separato, così che $\mathrm{SEP}(I)=n$. Consideriamo l'istanza $I_0$ con $c=10$ e pesi $(6,5,4,3,2)$ e, per $k\in\Z_{\ge 2}$, le istanze $I_k$ con $c=k$ e $2k$ oggetti di peso $1$.

    **Domande**

    1. Calcolare $\mathrm{SEP}(I_0)$, $z(I_0)$, il rapporto di prestazione e l'errore additivo su $I_0$.

    2. Calcolare il rapporto di prestazione su $I_k$ per $k=3,5,10$ (usare l'enumerazione per $k=3$) e la sua espressione per ogni $k$.

    3. $\mathrm{SEP}$ è un algoritmo di $\alpha$-approssimazione per qualche costante $\alpha$? Dare $r(\mathrm{SEP})$ ed $e(\mathrm{SEP})$.

    4. Usando $z(I)\ge 2$, mostrare che $\frac{\mathrm{SEP}(I)}{z(I)}\le\frac{n}{2}$. Perché $\frac{n}{2}$ non è una garanzia di prestazione relativa?

??? soluzione "Soluzione"

    Usiamo le definizioni (A1)–(A4) del box all'inizio del capitolo.

    1. $\mathrm{SEP}(I_0)=5$ e $z(I_0)=2$ (schemi $\{1,3\}$ e $\{2,4,5\}$). Il rapporto è $\frac{5}{2}$ e l'errore additivo è $5-2=3$.

    2. Due contenitori di capacità $k$ contengono i $2k$ oggetti unitari, e un contenitore non basta, quindi $z(I_k)=2$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(k\)</span></th>
        <th><span class="arithmatex">\(c\)</span></th>
        <th><span class="arithmatex">\(\mathrm{SEP}(I_k)=2k\)</span></th>
        <th><span class="arithmatex">\(z(I_k)\)</span></th>
        <th>rapporto</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        </table></div>

        In generale il rapporto è $\frac{2k}{2}=k$.

    3. No: per ogni costante $\alpha$, l'istanza $I_k$ con $k>\alpha$ ha rapporto $k>\alpha$. Quindi $r(\mathrm{SEP})=\infty$. Anche l'errore additivo su $I_k$, pari a $2k-2$, è illimitato: $e(\mathrm{SEP})=\infty$.

    4. Se $z(I)\ge 2$, allora $\frac{\mathrm{SEP}(I)}{z(I)}=\frac{n}{z(I)}\le\frac{n}{2}$. Il bound dipende dall'istanza attraverso $n$: una garanzia di prestazione relativa deve essere un'unica costante $\alpha$ valida per tutte le istanze.

<a id="esercizio-34-4"></a>

!!! esercizio "Esercizio 34.4: Rapporto illimitato di un algoritmo greedy (1)"

    Per il KP consideriamo l'algoritmo $\mathrm{GR}$: ordinare gli oggetti per efficienza $\frac{p_j}{w_j}$ non crescente (pareggi: indice minimo) e inserire ogni oggetto, in questo ordine, se entra nella capacità residua. Consideriamo l'istanza $I_0$ con $c=9$, $p=(10,7,6,4)$, $w=(5,4,3,3)$ e, per $M\in\Z_{\ge 3}$, le istanze $I_M$ con $c=M$ e due oggetti: $p_1=2$, $w_1=1$ e $p_2=M$, $w_2=M$.

    **Domande**

    1. Applicare $\mathrm{GR}$ a $I_0$, calcolare $z(I_0)$ per enumerazione, il rapporto di prestazione e l'errore relativo.

    2. Applicare $\mathrm{GR}$ a $I_M$ e calcolare $z(I_M)$, il rapporto di prestazione e l'errore additivo per $M=3,10,100$.

    3. $\mathrm{GR}$ è un algoritmo di $\alpha$-approssimazione per qualche costante $\alpha$? È un algoritmo di approssimazione $\beta$-additivo?

    4. Quale proprietà delle istanze $I_M$ fa fallire $\mathrm{GR}$?

??? soluzione "Soluzione"

    Usiamo le definizioni (A1)–(A4) del box all'inizio del capitolo.

    1. Le efficienze sono $2$, $\frac{7}{4}$, $2$, $\frac{4}{3}$: l'ordine è $(1,3,2,4)$. $\mathrm{GR}$ inserisce gli oggetti $1$, $3$ e ottiene $\mathrm{GR}(I_0)=16$. L'enumerazione dà $z(I_0)=17$ (oggetti $\{1,2\}$). Il rapporto è $\frac{17}{16}$ e l'errore relativo è $\frac{17-16}{17}=\frac{1}{17}$.

    2. L'oggetto $1$ ha efficienza $2$ e l'oggetto $2$ ha efficienza $1$: $\mathrm{GR}$ inserisce l'oggetto $1$, e poi l'oggetto $2$ non entra nella capacità residua $M-1$. Quindi $\mathrm{GR}(I_M)=2$, mentre il solo oggetto $2$ dà $z(I_M)=M$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(M\)</span></th>
        <th><span class="arithmatex">\(\mathrm{GR}(I_M)\)</span></th>
        <th><span class="arithmatex">\(z(I_M)\)</span></th>
        <th>rapporto</th>
        <th>errore additivo</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(\frac{3}{2}\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(100\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(100\)</span></td>
        <td><span class="arithmatex">\(50\)</span></td>
        <td><span class="arithmatex">\(98\)</span></td>
        </tr>
        </table></div>

    3. Il rapporto $\frac{M}{2}$ cresce senza limite, quindi nessuna costante $\alpha$ va bene e $r(\mathrm{GR})=\infty$. Anche l'errore additivo $M-2$ è illimitato: $e(\mathrm{GR})=\infty$.

    4. L'oggetto efficiente è piccolo e blocca l'oggetto grande, il cui profitto è quasi tutto il valore ottimo: l'ordine per efficienza ignora quanto profitto porta un oggetto in termini assoluti.

<a id="esercizio-34-5"></a>

!!! esercizio "Esercizio 34.5: Schemi di approssimazione (1)"

    Uno schema di approssimazione $\{\mathscr{A}_\varepsilon\}_{\varepsilon\in(0,1)}$ viene eseguito su alcune istanze. La tabella riporta il tipo di problema, il parametro di accuratezza $\varepsilon$, il valore ottimo e il valore restituito:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>caso</th>
    <th>problema</th>
    <th><span class="arithmatex">\(\varepsilon\)</span></th>
    <th><span class="arithmatex">\(z(I)\)</span></th>
    <th><span class="arithmatex">\(\mathscr{A}_\varepsilon(I)\)</span></th>
    </tr>
    <tr>
    <td>(1)</td>
    <td>minimo</td>
    <td><span class="arithmatex">\(\frac{1}{10}\)</span></td>
    <td><span class="arithmatex">\(100\)</span></td>
    <td><span class="arithmatex">\(108\)</span></td>
    </tr>
    <tr>
    <td>(2)</td>
    <td>minimo</td>
    <td><span class="arithmatex">\(\frac{1}{10}\)</span></td>
    <td><span class="arithmatex">\(60\)</span></td>
    <td><span class="arithmatex">\(67\)</span></td>
    </tr>
    <tr>
    <td>(3)</td>
    <td>massimo</td>
    <td><span class="arithmatex">\(\frac{1}{5}\)</span></td>
    <td><span class="arithmatex">\(50\)</span></td>
    <td><span class="arithmatex">\(41\)</span></td>
    </tr>
    <tr>
    <td>(4)</td>
    <td>massimo</td>
    <td><span class="arithmatex">\(\frac{1}{5}\)</span></td>
    <td><span class="arithmatex">\(50\)</span></td>
    <td><span class="arithmatex">\(38\)</span></td>
    </tr>
    </table></div>

    **Domande**

    1. Per ogni caso, calcolare l'errore relativo e stabilire se il valore è compatibile con la definizione di schema di approssimazione.

    2. Tradurre $\varepsilon=\frac{1}{4}$ in una garanzia di prestazione relativa, per un problema di minimo e per un problema di massimo. Qual è l'accuratezza?

    3. Uno schema per un problema di massimo deve essere un algoritmo di $\frac{5}{4}$-approssimazione. Quale valore di $\varepsilon$ serve?

    4. Classificare i seguenti tempi di esecuzione di uno schema di approssimazione su istanze di dimensione $n$: $O(n^{1/\varepsilon})$, $O(n^{3}/\varepsilon)$, $O(n\,2^{1/\varepsilon})$, $O(n^{2}/\varepsilon^{2})$, $O(2^{n}/\varepsilon)$.

??? soluzione "Soluzione"

    1. - **(1)** $\frac{108-100}{100}=\frac{2}{25}$ $\le$ $\frac{1}{10}$: compatibile.

        - **(2)** $\frac{67-60}{60}=\frac{7}{60}$ $>$ $\frac{1}{10}$: non compatibile, lo schema sbaglia su questa istanza.

        - **(3)** $\frac{50-41}{50}=\frac{9}{50}$ $\le$ $\frac{1}{5}$: compatibile.

        - **(4)** $\frac{50-38}{50}=\frac{6}{25}$ $>$ $\frac{1}{5}$: non compatibile, lo schema sbaglia su questa istanza.

    2. Per un problema di minimo $\mathscr{A}_\varepsilon(I)\le(1+\varepsilon)\,z(I)$, quindi la garanzia è $1+\frac{1}{4}=\frac{5}{4}$. Per un problema di massimo $\mathscr{A}_\varepsilon(I)\ge(1-\varepsilon)\,z(I)$, quindi la garanzia è $\frac{1}{1-\varepsilon}=\frac{4}{3}$. L'accuratezza è $\frac{1}{\varepsilon}=4$.

    3. Serve $\frac{1}{1-\varepsilon}\le\frac{5}{4}$, cioè $1-\varepsilon\ge\frac{4}{5}$ e $\varepsilon\le\frac{1}{5}$: va bene qualunque $\varepsilon\le\frac{1}{5}$, e $\varepsilon=\frac{1}{5}$ è il più grande.

    4. - $O(n^{1/\varepsilon})$: PTAS, non FPTAS.

        - $O(n^{3}/\varepsilon)$: FPTAS.

        - $O(n\,2^{1/\varepsilon})$: PTAS, non FPTAS.

        - $O(n^{2}/\varepsilon^{2})$: FPTAS.

        - $O(2^{n}/\varepsilon)$: non è un PTAS.

        Un PTAS richiede un polinomio in $n$ per ogni $\varepsilon$ fissato; un FPTAS richiede un polinomio sia in $n$ sia in $\frac{1}{\varepsilon}$. I termini $n^{1/\varepsilon}$ e $2^{1/\varepsilon}$ non sono polinomiali in $\frac{1}{\varepsilon}$, e $2^n$ non è polinomiale in $n$.
