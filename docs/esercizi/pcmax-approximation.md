---
title: "Esercizi · Approssimazione per P||Cmax"
---

# Esercizi · Approssimazione per P||Cmax

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 40** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 40: Macchine parallele identiche (P||Cmax)](../algoritmi-di-approssimazione/pcmax-approximation.md) · [:material-file-pdf-box: Eserciziario, volume 5 (PDF)](../pdf/esercizi-5-algoritmi-di-approssimazione.pdf)

</div>

<a id="esercizio-40-1"></a>

!!! esercizio "Esercizio 40.1: Approssimazione di $P\,||\,C_{\max}$ 1"

    Consideriamo $m=3$ macchine identiche e un insieme $\mathscr{J}=\{1,\dots,7\}$ di $7$ lavori ($n=7$), con i seguenti tempi di esecuzione:

    $$
    \begin{array}{l|ccccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} & {j=7} \\[1ex]
    \hline {t_j} & {2} & {2} & {4} & {8} & {8} & {6} & {6} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare $LIST$ con la lista $\lambda=(1,2,\dots,7)$. Mostrare, per ogni lavoro, i carichi prima dell'assegnamento e la macchina scelta, e indicare $LIST(I)$.

    2. Individuare un lavoro $\ell$ che termina per ultimo nello schedule della Domanda 1 e verificare la disuguaglianza $S_\ell\le\frac1m\sum_{j\neq\ell}t_j$ usata nella dimostrazione della garanzia di $LIST$.

    3. Applicare $LPT$ e indicare $LPT(I)$.

    4. Calcolare il lower bound $\max\{\max_j t_j,\frac1m\sum_j t_j\}$ su $z(I)$ e determinare $z(I)$. Calcolare i due rapporti $\frac{LIST(I)}{z(I)}$ e $\frac{LPT(I)}{z(I)}$ e confrontarli con le garanzie $2-\frac1m$ e $\frac43-\frac1{3m}$.

??? soluzione "Soluzione"

    1. Ogni lavoro va su una macchina di carico minimo (indice minimo in caso di pareggio):

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>lavoro <span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(t_j\)</span></th>
        <th>carichi <span class="arithmatex">\((L_1,L_2,L_3)\)</span> prima</th>
        <th>macchina</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((0,0,0)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((2,0,0)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((2,2,0)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\((2,2,4)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\((10,2,4)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\((10,10,4)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\((10,10,10)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        </table></div>

        Quindi $mach=(1,2,3,1,2,3,1)$, $J_1=\{1,4,7\}$, $J_2=\{2,5\}$, $J_3=\{3,6\}$, i carichi sono $(16,10,10)$ e

        $$
        LIST(I)=16 .
        $$

    2. Il lavoro $\ell=7$ termina per ultimo: inizia in $S_7=10$ sulla macchina $1$ e termina in $16$. Il bound dà

        $$
        S_7=10 \;\le\; \frac13\sum_{j\neq7}t_j=\frac{2+2+4+8+8+6}{3}=\frac{30}{3}=10,
        $$

        che vale all'uguaglianza: quando arriva il lavoro $7$ i tre carichi sono uguali, quindi il minimo coincide con la media.

    3. I lavori ordinati per tempo di esecuzione non crescente (pareggi per indice) sono $\lambda=(4,5,6,7,3,1,2)$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>lavoro <span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(t_j\)</span></th>
        <th>carichi <span class="arithmatex">\((L_1,L_2,L_3)\)</span> prima</th>
        <th>macchina</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\((0,0,0)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\((8,0,0)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\((8,8,0)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\((8,8,6)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((8,8,12)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((12,8,12)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\((12,10,12)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        </table></div>

        Quindi $J_1=\{3,4\}$, $J_2=\{1,2,5\}$, $J_3=\{6,7\}$, i carichi sono $(12,12,12)$ e

        $$
        LPT(I)=12 .
        $$

    4. Il lower bound è

        $$
        z(I)\;\ge\;\max\left\{8,\;\frac{2+2+4+8+8+6+6}{3}\right\}=\max\left\{8,\;\frac{36}{3}\right\}=12 .
        $$

        $LPT$ lo raggiunge, quindi $z(I)=12$ e lo schedule di $LPT$ è ottimo. I rapporti sono

        $$
        \frac{LIST(I)}{z(I)}=\frac{16}{12}=\frac43\;\le\;2-\frac13=\frac53,
        \qquad
        \frac{LPT(I)}{z(I)}=\frac{12}{12}=1\;\le\;\frac43-\frac19=\frac{11}{9}.
        $$

        Entrambe le garanzie valgono. Con la lista nell'ordine dei dati, i due lavori più lunghi arrivano quando le macchine sono già cariche, e $LIST$ supera l'ottimo di $4$ unità; ordinare la lista li mette per primi e chiude il divario.

<a id="esercizio-40-2"></a>

!!! esercizio "Esercizio 40.2: Approssimazione di $P\,||\,C_{\max}$ 2"

    Consideriamo $m=3$ macchine identiche e un insieme $\mathscr{J}=\{1,\dots,7\}$ di $7$ lavori ($n=7$), con i seguenti tempi di esecuzione:

    $$
    \begin{array}{l|ccccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} & {j=7} \\[1ex]
    \hline {t_j} & {1} & {1} & {1} & {1} & {1} & {1} & {3} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare $LIST$ con la lista $\lambda=(1,2,\dots,7)$ e indicare $LIST(I)$.

    2. Determinare $z(I)$, esibendo uno schedule ottimo e un lower bound di pari valore.

    3. Calcolare $\frac{LIST(I)}{z(I)}$ e confrontarlo con la garanzia di $LIST$. Stabilire a quale istanza delle note corrisponde.

    4. Applicare $LPT$ e indicare $LPT(I)$. Spiegare perché ordinare la lista elimina il caso sfavorevole.

??? soluzione "Soluzione"

    1. &#8203;

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>lavoro <span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(t_j\)</span></th>
        <th>carichi <span class="arithmatex">\((L_1,L_2,L_3)\)</span> prima</th>
        <th>macchina</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((0,0,0)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((1,0,0)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((1,1,0)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((1,1,1)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((2,1,1)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\((2,2,1)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\((2,2,2)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        </table></div>

        I carichi sono $(5,2,2)$, con $J_1=\{1,4,7\}$, $J_2=\{2,5\}$, $J_3=\{3,6\}$, e

        $$
        LIST(I)=5 .
        $$

    2. Lo schedule $J_1=\{7\}$, $J_2=\{1,2,3\}$, $J_3=\{4,5,6\}$ ha carichi $(3,3,3)$ e makespan $3$. Il lower bound dà

        $$
        z(I)\;\ge\;\max\left\{3,\;\frac{6\cdot1+3}{3}\right\}=\max\{3,3\}=3 .
        $$

        Quindi $z(I)=3$.

    3. &#8203;

        $$
        \frac{LIST(I)}{z(I)}=\frac53=2-\frac13 ,
        $$

        esattamente la garanzia $2-\frac1m$ per $m=3$: il bound di $LIST$ è raggiunto. È l'istanza tight $I_m$ delle note per $m=3$: $m(m-1)=6$ lavori unitari seguiti da un lavoro di durata $m=3$. I lavori unitari riempiono tutte le macchine fino a $m-1=2$, e il lavoro lungo inizia sopra una di esse.

    4. La lista ordinata è $\lambda=(7,1,2,3,4,5,6)$. Il lavoro $7$ va sulla macchina $1$, con carichi $(3,0,0)$; i lavori unitari vanno poi sulle macchine $2,3,2,3,2,3$ (la macchina $1$ non è più la meno carica, poiché il suo carico $3$ non è mai minore degli altri), con carichi $(3,3,3)$. Quindi

        $$
        LPT(I)=3=z(I).
        $$

        Il lavoro lungo è quello che fa danno quando arriva per ultimo; $LPT$ lo assegna per primo, e i lavori brevi livellano i carichi intorno a esso.

<a id="esercizio-40-3"></a>

!!! esercizio "Esercizio 40.3: Approssimazione di $P\,||\,C_{\max}$ 3"

    Consideriamo $m=4$ macchine identiche e un insieme $\mathscr{J}=\{1,\dots,9\}$ di $9$ lavori ($n=9$), con i seguenti tempi di esecuzione:

    $$
    \begin{array}{l|ccccccccc}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} & {j=5} & {j=6} & {j=7} & {j=8} & {j=9} \\[1ex]
    \hline {t_j} & {7} & {7} & {6} & {6} & {5} & {5} & {4} & {4} & {4} \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Applicare $LPT$ e indicare $LPT(I)$.

    2. Determinare $z(I)$.

    3. Calcolare $\frac{LPT(I)}{z(I)}$ e confrontarlo con la garanzia $\frac43-\frac1{3m}$.

    4. Stabilire quale dei due casi della dimostrazione della garanzia di $LPT$ si applica al lavoro $\ell$ che termina per ultimo. Verificare che ogni disuguaglianza di quel caso valga all'uguaglianza su questa istanza.

??? soluzione "Soluzione"

    1. I lavori sono già ordinati, $\lambda=(1,2,\dots,9)$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>lavoro <span class="arithmatex">\(j\)</span></th>
        <th><span class="arithmatex">\(t_j\)</span></th>
        <th>carichi <span class="arithmatex">\((L_1,L_2,L_3,L_4)\)</span> prima</th>
        <th>macchina</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\((0,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\((7,0,0,0)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\((7,7,0,0)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\((7,7,6,0)\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((7,7,6,6)\)</span></td>
        <td><span class="arithmatex">\(3\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(6\)</span></td>
        <td><span class="arithmatex">\(5\)</span></td>
        <td><span class="arithmatex">\((7,7,11,6)\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(7\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((7,7,11,11)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(8\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((11,7,11,11)\)</span></td>
        <td><span class="arithmatex">\(2\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(9\)</span></td>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\((11,11,11,11)\)</span></td>
        <td><span class="arithmatex">\(1\)</span></td>
        </tr>
        </table></div>

        Quindi $J_1=\{1,7,9\}$, $J_2=\{2,8\}$, $J_3=\{3,5\}$, $J_4=\{4,6\}$, i carichi sono $(15,11,11,11)$ e

        $$
        LPT(I)=15 .
        $$

    2. Il tempo di esecuzione totale è $48$, quindi $z(I)\ge\max\{7,\frac{48}{4}\}=12$. Lo schedule $J_1=\{1,5\}$, $J_2=\{2,6\}$, $J_3=\{3,4\}$, $J_4=\{7,8,9\}$ ha carichi $(12,12,12,12)$. Quindi $z(I)=12$.

    3. &#8203;

        $$
        \frac{LPT(I)}{z(I)}=\frac{15}{12}=\frac54=\frac43-\frac1{12}=\frac43-\frac{1}{3\cdot4}.
        $$

        La garanzia di $LPT$ è raggiunta: è l'istanza tight delle note per $m=4$, con due lavori per ciascuna durata $2m-1=7$, $6$, $m+1=5$ e tre lavori di durata $m=4$; dopo $2m=8$ lavori tutti i carichi valgono $3m-1=11$, e l'ultimo lavoro dà $4m-1=15$, mentre $z(I)=3m=12$.

    4. L'ultimo lavoro è $\ell=9$, con $t_9=4=\frac{z(I)}{3}$, quindi si applica il Caso 1 ($t_\ell\le\frac{z}{3}$), al suo confine. Le sue disuguaglianze sono:

        \begin{align*}
        LPT(I) = S_9+t_9 = 11+4 &= 15,\\
        \frac1m\sum_{j}t_j+\Big(1-\frac1m\Big)t_9 = \frac{48}{4}+\frac34\cdot4 &= 15,\\
        z(I)+\Big(1-\frac1m\Big)\frac{z(I)}{3} = 12+\frac34\cdot4 &= 15,\\
        \Big(\frac43-\frac1{3m}\Big)z(I)=\frac54\cdot12 &= 15.
        \end{align*}

        Tutte le quantità sono uguali: l'istante di inizio $S_9=11$ è pari alla media $\frac{48-4}{4}=11$ degli altri carichi (le quattro macchine sono perfettamente bilanciate), $\frac1m\sum_j t_j=z(I)$, e $t_9=\frac{z(I)}3$.
