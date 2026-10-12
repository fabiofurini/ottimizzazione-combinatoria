---
title: "Esercizi · Problemi di ottimizzazione combinatoria"
---

# Esercizi · Problemi di ottimizzazione combinatoria

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 1** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 1: Ottimizzazione combinatoria](../problemi-di-ottimizzazione-combinatoria/combinatorial-optimization/index.md) · [:material-file-pdf-box: Eserciziario, volume 1 (PDF)](../pdf/esercizi-1-problemi-di-ottimizzazione-combinatoria.pdf)

</div>

<a id="esercizio-1-1"></a>

!!! esercizio "Esercizio 1.1: Insieme base, soluzioni ammissibili e obiettivo"

    Consideriamo l'insieme base $\mathscr{U}=\{1,\dots,6\}$ con i pesi

    $$
    \begin{array}{l|cccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} \\[1ex]
    \hline {c_j} & {5} & {8} & {6} & {3} & {7} & {4} \\
    \hline
    \end{array}
    $$

    Un sottoinsieme $S\subseteq\mathscr{U}$ è ammissibile se non contiene due elementi consecutivi ($j$ e $j+1$), e l'obiettivo $f(S)=\sum_{j\in S} c_j$ è da massimizzare.

    **Domande**

    1. Calcolare il numero di soluzioni candidate. Stabilire se $\{1,3,4\}$ è ammissibile, e se lo è $\{2,4,6\}$.

    2. Contare i sottoinsiemi ammissibili, raggruppati per numero di elementi.

    3. Trovare la soluzione ottima e $z(I)$.

    4. Applicare la regola greedy: prendere l'elemento di peso massimo, scartare i suoi vicini e ripetere sugli elementi rimasti. Dare il bound primale e il suo gap relativo rispetto a $z(I)$.

??? soluzione "Soluzione"

    1. Le candidate sono i $2^6=64$ sottoinsiemi di $\mathscr{U}$. Il sottoinsieme $\{1,3,4\}$ non è ammissibile, poiché contiene $3$ e $4$; il sottoinsieme $\{2,4,6\}$ è ammissibile.

    2. Un sottoinsieme ammissibile di $6$ elementi ha al più $3$ elementi. Per enumerazione:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>elementi</th>
        <th>sottoinsiemi ammissibili</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td>totale</td>
        <td><span class="arithmatex">\(21\)</span></td>
        </tr>
        </table></div>

        I sottoinsiemi con $2$ elementi sono le $\binom{6}{2}=15$ coppie meno le $5$ coppie consecutive: $10$. Solo $21$ delle $64$ candidate sono ammissibili.

    3. I sottoinsiemi ammissibili con $3$ elementi sono $\{1,3,5\}$ ($f=18$), $\{1,3,6\}$ ($f=15$), $\{1,4,6\}$ ($f=12$), $\{2,4,6\}$ ($f=15$). Un sottoinsieme con al più $2$ elementi ha valore al più $7+8=15$. Quindi la soluzione ottima è $\tilde S=\{1,3,5\}$, con $z(I)=18$; è l'unica soluzione ottima.

    4. La regola greedy procede così:

        - prendiamo l'elemento $2$ (peso $8$) e scartiamo i suoi vicini $1, 3$;

        - prendiamo l'elemento $5$ (peso $7$) e scartiamo i suoi vicini $4, 6$;

        Restituisce $\bar S=\{2,5\}$, di valore $15$: un bound primale $\mathrm{LB}=15$. Il gap relativo rispetto a $z(I)$ è $\frac{18-15}{15}=\frac{1}{5}\approx 20.0\%$: prendere per primo l'elemento più pesante vieta due suoi vicini, i cui pesi insieme sono maggiori.

    !!! chiave ""

        Solo $21$ dei $64$ sottoinsiemi sono ammissibili; l'ottimo è $\tilde S=\{1,3,5\}$ con $z(I)=18$, mentre la regola greedy dà $15$.

<a id="esercizio-1-2"></a>

!!! esercizio "Esercizio 1.2: Contare le soluzioni"

    Contiamo gli oggetti combinatori di piccoli insiemi finiti.

    - **(a)** I sottoinsiemi di un insieme con $6$ elementi.

    - **(b)** Gli ordinamenti e gli ordinamenti ciclici di $6$ elementi.

    - **(c)** Le partizioni dell'insieme $\{1,2,3,4,5\}$.

    - **(d)** Gli assegnamenti di $4$ elementi a $2$ etichette.

    **Domande**

    1. Calcolare quanti sottoinsiemi ha l'insieme (a) e quanti di essi hanno esattamente $2$ elementi.

    2. Calcolare quanti sono gli ordinamenti dei $6$ elementi di (b), quanti di essi descrivono lo stesso ordinamento ciclico e quanti sono gli ordinamenti ciclici distinti.

    3. Calcolare i numeri di Bell $B(1),\dots,B(5)$ con la ricorsione del capitolo e dedurre quante partizioni ha l'insieme (c).

    4. Contare, per enumerazione, le partizioni dell'insieme (c), raggruppate per numero di blocchi.

    5. Calcolare quanti assegnamenti ha (d) e quante soluzioni distinte restano se le due etichette sono intercambiabili.

??? soluzione "Soluzione"

    1. I sottoinsiemi sono $2^6=64$; quelli con $2$ elementi sono $\binom{6}{2}=15$.

    2. Gli ordinamenti sono $6!=720$. Un ordinamento ciclico è descritto da $6$ ordinamenti, uno per ogni elemento di partenza, e da altri $6$ letti nel verso opposto: $2\cdot 6=12$ ordinamenti ciascuno. Gli ordinamenti ciclici distinti sono $\frac{720}{12}=60=\frac{(6-1)!}{2}$.

    3. Con $B(0)=1$ e $B(n)=\sum_{k=0}^{n-1}\binom{n-1}{k}B(k)$, ogni termine è un coefficiente binomiale per un numero di Bell già calcolato:

        \begin{align*}
        B(1)&=1\cdot 1=1\\
        B(2)&=1\cdot 1+1\cdot 1=2\\
        B(3)&=1\cdot 1+2\cdot 1+1\cdot 2=5\\
        B(4)&=1\cdot 1+3\cdot 1+3\cdot 2+1\cdot 5=15\\
        B(5)&=1\cdot 1+4\cdot 1+6\cdot 2+4\cdot 5+1\cdot 15=52.
        \end{align*}

        L'insieme (c) ha $B(5)=52$ partizioni.

    4. Per enumerazione:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>blocchi</th>
        <th>partizioni</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(15\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(25\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td>totale</td>
        <td><span class="arithmatex">\(52\)</span></td>
        </tr>
        </table></div>

        Per esempio, le $10$ partizioni in $4$ blocchi mettono insieme due elementi, e le coppie sono $\binom{5}{2}=10$.

    5. Ogni elemento va a una delle $2$ etichette: $2^4=16$ assegnamenti. Se le etichette sono intercambiabili, un assegnamento e quello con le due etichette scambiate sono la stessa soluzione. Gli assegnamenti con tutti gli elementi su un'etichetta danno $1$ soluzione (contata due volte fra i $16$), gli altri $14$ danno $\frac{14}{2}=7$ soluzioni con due blocchi non vuoti: $8$ soluzioni distinte, le partizioni dei $4$ elementi in al più $2$ blocchi.

    !!! chiave ""

        Le candidate sono $2^n$ sottoinsiemi, $n!$ ordinamenti, $(n-1)!/2$ ordinamenti ciclici, $B(n)$ partizioni e $m^n$ assegnamenti; con etichette intercambiabili, gli assegnamenti diventano partizioni in al più $m$ blocchi.

<a id="esercizio-1-3"></a>

!!! esercizio "Esercizio 1.3: Forza bruta e tempo di calcolo"

    Un calcolatore valuta $10^9$ soluzioni candidate al secondo, e concediamo un giorno di calcolo ($86\,400$ secondi).

    **Domande**

    1. Calcolare quante candidate si possono valutare in un giorno.

    2. Determinare il massimo numero $n$ di elementi per cui si possono enumerare in un giorno tutti i sottoinsiemi, tutti gli ordinamenti ciclici e tutte le partizioni.

    3. Rispondere alla stessa domanda per un calcolatore $1000$ volte più veloce. Calcolare quanti elementi guadagna in ciascun caso.

??? soluzione "Soluzione"

    1. $86\,400\cdot 10^9\approx 8.64\cdot 10^{13}$ candidate.

    2. Cerchiamo il massimo $n$ il cui numero di candidate non supera il budget:

        - sottoinsiemi: $2^{46}\approx 7.04\cdot 10^{13}\le 8.64\cdot 10^{13}<2^{47}\approx 1.41\cdot 10^{14}$, quindi $n=46$;

        - ordinamenti ciclici: $16!/2\approx 1.05\cdot 10^{13}\le 8.64\cdot 10^{13}<17!/2\approx 1.78\cdot 10^{14}$, quindi $n=17$;

        - partizioni: $B(20)\approx 5.17\cdot 10^{13}\le 8.64\cdot 10^{13}<B(21)\approx 4.75\cdot 10^{14}$, quindi $n=20$;

    3. Il budget diventa $\approx 8.64\cdot 10^{16}$:

        - sottoinsiemi: $2^{56}\approx 7.21\cdot 10^{16}\le 8.64\cdot 10^{16}<2^{57}\approx 1.44\cdot 10^{17}$, quindi $n=56$;

        - ordinamenti ciclici: $19!/2\approx 6.08\cdot 10^{16}\le 8.64\cdot 10^{16}<20!/2\approx 1.22\cdot 10^{18}$, quindi $n=20$;

        - partizioni: $B(23)\approx 4.42\cdot 10^{16}\le 8.64\cdot 10^{16}<B(24)\approx 4.46\cdot 10^{17}$, quindi $n=23$;

        Il calcolatore più veloce guadagna $10$ elementi per i sottoinsiemi, $3$ per le partizioni e $3$ per gli ordinamenti ciclici: un fattore $1000$ in velocità sposta il limite solo di pochi elementi.

    !!! chiave ""

        In un giorno la forza bruta tratta circa $46$ elementi per i sottoinsiemi, $20$ per le partizioni e $17$ per gli ordinamenti ciclici; un calcolatore $1000$ volte più veloce aggiunge solo pochi elementi.

<a id="esercizio-1-4"></a>

!!! esercizio "Esercizio 1.4: Bound primale, bound duale e gap"

    Consideriamo l'insieme base $\mathscr{U}=\{1,\dots,5\}$, i pesi $\vet{c}=(4,6,3,5,2)$, l'obiettivo $f(S)=\sum_{j\in S}c_j$ da <strong>minimizzare</strong> e le soluzioni ammissibili

    $$
    \mathcal{F}=\big\{\{1,2\}, \{1,4\}, \{3,4\}, \{2,3,5\}, \{1,3,5\}, \{2,4,5\}, \{1,2,3,4,5\}\big\}.
    $$

    **Domande**

    1. Calcolare quante sono le soluzioni candidate e quante quelle ammissibili.

    2. La soluzione $\{1,2\}$ è ammissibile: stabilire quale bound fornisce.

    3. Ogni sottoinsieme ammissibile ha almeno $2$ elementi: ricavarne un bound duale. Calcolare il gap assoluto e il gap relativo.

    4. Migliorare il bound duale esaminando separatamente i sottoinsiemi ammissibili con $2$ elementi e quelli con almeno $3$ elementi. Trovare una soluzione ottima e spiegare perché è ottima.

??? soluzione "Soluzione"

    1. Le candidate sono i $2^5=32$ sottoinsiemi di $\mathscr{U}$; $7$ di essi sono ammissibili.

    2. $f(\{1,2\})=4+6=10$ è il valore di una soluzione ammissibile di un problema di minimo, quindi un bound primale: $\mathrm{UB}=10$.

    3. Un sottoinsieme con almeno $2$ elementi pesa almeno quanto i due pesi più piccoli: $f(S)\ge 2+3=5$ per ogni $S\in\mathcal{F}$, quindi $\mathrm{LB}=5$. Il gap assoluto è $10-5=5$ e il gap relativo, diviso per il lower bound, è $\frac{5}{5}\approx 100.0\%$.

    4. I sottoinsiemi ammissibili con $2$ elementi sono $\{1,2\}$ ($f=10$), $\{1,4\}$ ($f=9$), $\{3,4\}$ ($f=8$): il loro minimo è $8$. Un sottoinsieme con almeno $3$ elementi pesa almeno $2+3+4=9$. Quindi $\mathrm{LB}=8$. La soluzione ammissibile $\{3,4\}$ ha valore $3+5=8=\mathrm{LB}$: il gap è nullo, quindi è ottima e $z(I)=8$.

    !!! chiave ""

        $\{1,2\}$ dà $\mathrm{UB}=10$, l'argomento sulla cardinalità dà $\mathrm{LB}=5$ e l'argomento per casi dà $\mathrm{LB}=8$, raggiunto da $\{3,4\}$: $z(I)=8$.

<a id="esercizio-1-5"></a>

!!! esercizio "Esercizio 1.5: Riconoscere l'oggetto combinatorio"

    Per ogni situazione, indicare l'oggetto combinatorio di una soluzione (sottoinsieme, ordinamento, ordinamento ciclico, partizione, assegnamento) e il numero di soluzioni candidate.

    **Domande**

    1. Un fondo di ricerca deve scegliere quali fra $12$ proposte finanziare con un budget fissato.

    2. Una tecnica deve visitare $8$ sedi (compreso il suo ufficio) e tornare in ufficio.

    3. $8$ scatole devono essere caricate su furgoni identici della stessa capacità (contare i modi di raggruppare le scatole).

    4. $8$ lavori devono essere assegnati a $3$ macchine (contare gli assegnamenti).

    5. Una fabbrica deve decidere in quali delle prossime $12$ settimane attrezzare la sua linea.

??? soluzione "Soluzione"

    1. Un sottoinsieme delle proposte: $2^{12} = 4096$ sottoinsiemi.

    2. Un ordinamento ciclico delle $8$ sedi: $(8-1)!/2 = 5040/2 = 2520$ ordinamenti ciclici.

    3. Una partizione delle scatole: $B(8) = 4140$ partizioni.

    4. Un assegnamento dei lavori alle macchine: $3^8 = 6561$ assegnamenti.

    5. Un sottoinsieme delle settimane: $2^{12} = 4096$ scelte.

<a id="esercizio-1-6"></a>

!!! esercizio "Esercizio 1.6: Forza bruta, bound e gap"

    Consideriamo l'insieme base $\mathscr{U} = \{1,2,3,4\}$, i pesi $\vet{c} = (8,5,4,3)$, l'obiettivo $f(S) = \sum_{j \in S} c_j$ da massimizzare e le soluzioni ammissibili

    $$
    \mathcal{F} = \big\{ \emptyset, \{1\}, \{2\}, \{3\}, \{4\}, \{1,4\}, \{2,3\}, \{2,4\}, \{3,4\}, \{2,3,4\} \big\}.
    $$

    **Domande**

    1. Calcolare quante sono le soluzioni candidate e quante quelle ammissibili.

    2. La soluzione $\{1,4\}$ è ammissibile: stabilire quale bound fornisce.

    3. Trovare un bound duale distinguendo i sottoinsiemi ammissibili che contengono l'elemento $1$ da quelli che non lo contengono, e calcolare il gap assoluto e il gap relativo.

    4. Trovare una soluzione ottima e spiegare perché è ottima.

??? soluzione "Soluzione"

    1. Le candidate sono i $2^4 = 16$ sottoinsiemi di $\mathscr{U}$; $10$ di essi sono ammissibili.

    2. $f(\{1,4\}) = 8+3 = 11$ è il valore di una soluzione ammissibile di un problema di massimo, quindi un bound primale: $\mathrm{LB} = 11$.

    3. I sottoinsiemi ammissibili che contengono $1$ sono $\{1\}$ e $\{1,4\}$, di valore al più $8+3 = 11$. Un sottoinsieme ammissibile senza $1$ ha valore al più $5+4+3 = 12$. Quindi $f(S) \le 12$ per ogni $S \in \mathcal{F}$, e $\mathrm{UB} = 12$. Il gap assoluto è $12-11 = 1$ e il gap relativo è $\tfrac{1}{11} \approx 9.1\%$.

    4. La soluzione ammissibile $\{2,3,4\}$ ha valore $5+4+3 = 12 = \mathrm{UB}$. Il gap è nullo, quindi è ottima e $z(I) = 12$: l'elemento di peso massimo non è nella soluzione ottima.

<a id="esercizio-1-7"></a>

!!! esercizio "Esercizio 1.7: Quanto può essere grande n?"

    Un calcolatore valuta $10^9$ soluzioni candidate al secondo, e concediamo un'ora di calcolo.

    **Domande**

    1. Determinare il massimo numero $n$ di elementi per cui si possono enumerare tutti i sottoinsiemi.

    2. Determinare il massimo numero $n$ di elementi per cui si possono enumerare tutti gli ordinamenti ciclici.

    3. Rispondere alle stesse domande per un calcolatore $1000$ volte più veloce.

??? soluzione "Soluzione"

    In un'ora il calcolatore valuta $3600 \cdot 10^9 = 3.6 \cdot 10^{12}$ candidate.

    1. $2^{41} \approx 2.20 \cdot 10^{12} \le 3.6 \cdot 10^{12} < 2^{42} \approx 4.40 \cdot 10^{12}$, quindi $n = 41$ elementi.

    2. Per $16$ elementi $15!/2 \approx 6.54 \cdot 10^{11} \le 3.6 \cdot 10^{12}$, mentre per $17$ elementi $16!/2 \approx 1.05 \cdot 10^{13} > 3.6 \cdot 10^{12}$; quindi $n = 16$ elementi.

    3. Il budget diventa $3.6 \cdot 10^{15}$. Per i sottoinsiemi, $2^{51} \approx 2.25 \cdot 10^{15} \le 3.6 \cdot 10^{15} < 2^{52} \approx 4.50 \cdot 10^{15}$, quindi $n = 51$ elementi: $10$ in più. Per gli ordinamenti ciclici, $18!/2 \approx 3.20 \cdot 10^{15} \le 3.6 \cdot 10^{15} < 19!/2 \approx 6.08 \cdot 10^{16}$, quindi $n = 19$ elementi: solo $3$ in più.

<a id="esercizio-1-8"></a>

!!! esercizio "Esercizio 1.8: Arrotondare i bound duali"

    In due istanze tutte le soluzioni ammissibili hanno valore intero.

    **Domande**

    1. In un'istanza di massimo, un'euristica trova una soluzione di valore $11$ e un rilassamento dà il bound duale $12.6$. Dare $\mathrm{LB}$, $\mathrm{UB}$ e il gap relativo, prima e dopo l'arrotondamento del bound duale.

    2. Si trova poi una soluzione di valore $12$: stabilire che cosa si può concludere.

    3. In un'istanza di minimo, un'euristica trova una soluzione di valore $15$ e un argomento dà il bound duale $13.2$. Dare $\mathrm{LB}$, $\mathrm{UB}$ e il gap relativo dopo l'arrotondamento.

??? soluzione "Soluzione"

    1. $\mathrm{LB} = 11$ (primale) e $\mathrm{UB} = 12.6$ (duale): il gap relativo è $\tfrac{1.6}{11} \approx 14.5\%$. Poiché i valori sono interi, anche $\lfloor 12.6 \rfloor = 12$ è un bound duale, e il gap diventa $\tfrac{1}{11} \approx 9.1\%$.

    2. Ora $\mathrm{LB} = 12 = \mathrm{UB}$: il gap è nullo e la soluzione di valore $12$ è ottima.

    3. Nella forma di minimo il bound primale è $\mathrm{UB} = 15$ e il bound duale è $\mathrm{LB} = \lceil 13.2 \rceil = 14$. Il gap relativo, diviso per il lower bound, è $\tfrac{15-14}{14} = \tfrac{1}{14} \approx 7.1\%$.
