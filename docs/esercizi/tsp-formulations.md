---
title: "Esercizi · Formulazioni dei problemi di routing"
---

# Esercizi · Formulazioni dei problemi di routing

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 13** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 13: Problemi di routing](../formulazioni/tsp-formulations/index.md) · [:material-file-pdf-box: Eserciziario, volume 2 (PDF)](../pdf/esercizi-2-formulazioni.pdf)

</div>

!!! chiave ""

    <strong>Formulazioni usate in questi esercizi.</strong> I modelli del [Capitolo 13 «Formulazioni dei problemi di routing»](../formulazioni/tsp-formulations/index.md), sugli archi $A=\{(i,j): i,j\in\mathscr{V},~i\neq j\}$. Il modello $\mathrm{ILP}^{\mathrm{MTZ}}_{\mathrm{TSP}}$:

    \begin{align*}
    && \min ~~ \sum_{(i,j)\in A} d_{ij}\,x_{ij} \tag{T0}\\
    && \text{soggetto a} \quad \sum_{j\in\mathscr{V},\,j\neq i} x_{ij} &= 1, & \forall i\in\mathscr{V}, \tag{T1}\\
    && \sum_{i\in\mathscr{V},\,i\neq j} x_{ij} &= 1, & \forall j\in\mathscr{V}, \tag{T2}\\
    && u_i-u_j+(n-1)\,x_{ij} &\le n-2, & \forall i,j\in\mathscr{V}\setminus\{1\},~i\neq j, \tag{MTZ}\\
    && x_{ij} &\in\{0,1\}, & \forall (i,j)\in A, \tag{T3}\\
    && 1\le u_i &\le n-1, & \forall i\in\mathscr{V}\setminus\{1\}. \tag{T4}
    \end{align*}

    Il modello $\mathrm{ILP}^{\mathrm{DFJ}}_{\mathrm{TSP}}$:

    \begin{align*}
    && \min ~~ \sum_{(i,j)\in A} d_{ij}\,x_{ij} \tag{T0}\\
    && \text{soggetto a} \quad \sum_{j\in\mathscr{V},\,j\neq i} x_{ij} &= 1, & \forall i\in\mathscr{V}, \tag{T1}\\
    && \sum_{i\in\mathscr{V},\,i\neq j} x_{ij} &= 1, & \forall j\in\mathscr{V}, \tag{T2}\\
    && \sum_{i\in S}\sum_{j\in S,\,j\neq i} x_{ij} &\le |S|-1, & \forall S\subseteq\mathscr{V}\setminus\{1\},~|S|\ge 2, \tag{SEC}\\
    && x_{ij} &\in\{0,1\}, & \forall (i,j)\in A. \tag{T3}
    \end{align*}

    Il rilassamento di assegnamento $\mathrm{LP}\text{-}0_{\mathrm{TSP}}$ mantiene solo (T0), (T1), (T2) e $x_{ij}\ge 0$. I rilassamenti $\mathrm{LP}^{\mathrm{MTZ}}_{\mathrm{TSP}}$ e $\mathrm{LP}^{\mathrm{DFJ}}_{\mathrm{TSP}}$ rilassano (T3) in $x_{ij}\ge 0$ (i bound $x_{ij}\le 1$ sono implicati da (T1)). Il modello $\mathrm{ILP}_{\mathrm{ATSP}}$ del TSP asimmetrico è il modello $\mathrm{ILP}^{\mathrm{DFJ}}_{\mathrm{TSP}}$ con distanze $d_{ij}$ che possono differire da $d_{ji}$.

<a id="esercizio-13-1"></a>

!!! esercizio "Esercizio 13.1: Il modello MTZ del TSP (1)"

    Consideriamo un'istanza del TSP con $\mathscr{V}=\{1,\dots,4\}$ ($n=4$ città) e la matrice delle distanze simmetrica

    $$
    \begin{array}{c|cccc}
    \toprule
    d_{ij} & 1 & 2 & 3 & 4\\
    \midrule
    1 & - & 3 & 5 & 4\\
    2 & 3 & - & 4 & 6\\
    3 & 5 & 4 & - & 2\\
    4 & 4 & 6 & 2 & -\\
    \bottomrule
    \end{array}
    $$

    **Domande**

    1. Contare le variabili e i vincoli (oltre ai domini) del modello $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{MTZ}}$ per $n=4$.

    2. Scrivere il modello $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{MTZ}}$ per questa istanza.

    3. Elencare i giri distinti con le loro lunghezze e indicare il giro ottimo $\sigma$.

    4. Scrivere i valori delle variabili $x_{ij}$ e $u_i$ che rappresentano $\sigma$ e verificare uno per uno i vincoli (MTZ).

    5. Risolvere con Gurobi il rilassamento lineare $\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}}$ e confrontarne il valore con il valore ottimo.

??? soluzione "Soluzione"

    1. Ci sono $n(n-1)=12$ variabili binarie $x_{ij}$ e $n-1=3$ variabili continue $u_i$. Ci sono $2n=8$ vincoli di grado e $(n-1)(n-2)=6$ vincoli (MTZ), quindi $14$ vincoli lineari.

    2. Con $A=\{(i,j): i,j\in\mathscr{V},~i\neq j\}$ il modello è:

        $$
        \begin{array}{rlcl}
        {\min} & {3\,x_{12}+5\,x_{13}+4\,x_{14}+3\,x_{21}+4\,x_{23}+6\,x_{24}+5\,x_{31}} &  &  \\
        & {+4\,x_{32}+2\,x_{34}+4\,x_{41}+6\,x_{42}+2\,x_{43}} &  &  \\[1ex]
        \text{soggetto a} & {x_{12}+x_{13}+x_{14}} & {=} & {1} \\
        & {x_{21}+x_{23}+x_{24}} & {=} & {1} \\
        & {x_{31}+x_{32}+x_{34}} & {=} & {1} \\
        & {x_{41}+x_{42}+x_{43}} & {=} & {1} \\
        & {x_{21}+x_{31}+x_{41}} & {=} & {1} \\
        & {x_{12}+x_{32}+x_{42}} & {=} & {1} \\
        & {x_{13}+x_{23}+x_{43}} & {=} & {1} \\
        & {x_{14}+x_{24}+x_{34}} & {=} & {1} \\
        & {u_2-u_3+3\,x_{23}} & {\le} & {2} \\
        & {u_2-u_4+3\,x_{24}} & {\le} & {2} \\
        & {u_3-u_2+3\,x_{32}} & {\le} & {2} \\
        & {u_3-u_4+3\,x_{34}} & {\le} & {2} \\
        & {u_4-u_2+3\,x_{42}} & {\le} & {2} \\
        & {u_4-u_3+3\,x_{43}} & {\le} & {2} \\[1ex]
        & {x_{12},~x_{13},~x_{14},~\dots,~x_{43}} & {\in} & {\{0,1\}} \\
        & {u_2,~u_3,~u_4} & {\ge} & {1} \\
        & {u_2,~u_3,~u_4} & {\le} & {3}
        \end{array}
        $$

    3. Partendo dalla città $1$, e contando ogni giro una sola volta (in un solo verso), i giri distinti sono $\frac{(n-1)!}{2}=3$:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>giro</th>
        <th>lunghezza</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,2,3,4)\)</span></td>
        <td><span class="arithmatex">\(3+4+2+4=13\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,2,4,3)\)</span></td>
        <td><span class="arithmatex">\(3+6+2+5=16\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3,2,4)\)</span></td>
        <td><span class="arithmatex">\(5+4+6+4=19\)</span></td>
        </tr>
        </table></div>

        Il giro ottimo è $\sigma=(1,2,3,4)$, di lunghezza $L(\sigma)=13$.

    4. Il giro usa gli archi

        $$
        x_{12}=1,~~x_{23}=1,~~x_{34}=1,~~x_{41}=1
        $$

        e tutte le altre $x_{ij}$ valgono $0$. Le posizioni dopo la città $1$ sono $u_2=1$, $u_3=2$, $u_4=3$. I vincoli (MTZ) danno:

        - $(i,j)=(2,3)$: $1-2+3\cdot1=2\le 2$

        - $(i,j)=(2,4)$: $1-3+3\cdot0=-2\le 2$

        - $(i,j)=(3,2)$: $2-1+3\cdot0=1\le 2$

        - $(i,j)=(3,4)$: $2-3+3\cdot1=2\le 2$

        - $(i,j)=(4,2)$: $3-1+3\cdot0=2\le 2$

        - $(i,j)=(4,3)$: $3-2+3\cdot0=1\le 2$

        Valgono tutti; quelli degli archi selezionati $(i,j)$ con $i,j\neq 1$ valgono all'uguaglianza.

    5. Gurobi dà $z(\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}})=12$, contro il valore ottimo $13$: il rilassamento lascia un gap di $1$.

<a id="esercizio-13-2"></a>

!!! esercizio "Esercizio 13.2: Il modello DFJ del TSP (1)"

    Consideriamo un'istanza del TSP con $\mathscr{V}=\{1,\dots,4\}$ ($n=4$ città) e la matrice delle distanze simmetrica

    $$
    \begin{array}{c|cccc}
    \toprule
    d_{ij} & 1 & 2 & 3 & 4\\
    \midrule
    1 & - & 3 & 5 & 4\\
    2 & 3 & - & 4 & 6\\
    3 & 5 & 4 & - & 2\\
    4 & 4 & 6 & 2 & -\\
    \bottomrule
    \end{array}
    $$

    **Domande**

    1. Contare i vincoli di eliminazione dei sottogiri del modello $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{DFJ}}$ per $n=4$ e scriverli.

    2. Gli archi $(1,2)$, $(2,1)$, $(3,4)$, $(4,3)$ soddisfano i vincoli di grado. Trovare il vincolo di eliminazione dei sottogiri che violano.

    3. Fare lo stesso per gli archi $(1,3)$, $(3,1)$, $(2,4)$, $(4,2)$, che formano due sottogiri, entrambi di lunghezza $22$.

    4. Risolvere con Gurobi il rilassamento di assegnamento $\mathrm{LP}\text{-}0_{\mathrm{TSP}}$ (solo vincoli di grado), il rilassamento $\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{DFJ}}$ e il modello $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{DFJ}}$, e confrontare i valori.

??? soluzione "Soluzione"

    1. Gli insiemi sono i sottoinsiemi $S\subseteq\{2,3,4\}$ con $|S|\ge 2$: sono $2^{n-1}-n=4$. I vincoli sono

        \begin{align*}
        S=\{2,3\}:~~ & x_{23} + x_{32} \le 1 \\
        S=\{2,4\}:~~ & x_{24} + x_{42} \le 1 \\
        S=\{3,4\}:~~ & x_{34} + x_{43} \le 1 \\
        S=\{2,3,4\}:~~ & x_{23} + x_{24} + x_{32} + x_{34} + x_{42} + x_{43} \le 2
        \end{align*}

    2. Gli archi formano i sottogiri $1\to 2\to 1$ e $3\to 4\to 3$, di lunghezza totale $10$. Il sottogiro su $\{3,4\}$ non contiene la città $1$: per $S=\{3,4\}$ il vincolo dà $x_{34}+x_{43}=2>1$. Gli altri tre vincoli valgono, per esempio $S=\{2,3,4\}$ dà $0+0+1+0+1+0=2\le 2$.

    3. Gli archi formano $1\to 3\to 1$ e $2\to 4\to 2$. Il sottogiro senza la città $1$ è su $\{2,4\}$: $x_{24}+x_{42}=2>1$. Basta un insieme $S$ per ogni soluzione con sottogiri, perché uno dei sottogiri non contiene mai la città $1$.

    4. Gurobi dà $z(\mathrm{LP}\text{-}0_{\mathrm{TSP}})=10$ per il rilassamento di assegnamento, $z(\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{DFJ}})=13$ e $z(\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{DFJ}})=13$, raggiunto dal giro $(1,2,3,4)$. I vincoli di eliminazione dei sottogiri alzano il bound da $10$ a $13$, che è il valore ottimo.

<a id="esercizio-13-3"></a>

!!! esercizio "Esercizio 13.3: Soluzioni ammissibili dei modelli del TSP (1)"

    Consideriamo un'istanza del TSP con $\mathscr{V}=\{1,\dots,5\}$ ($n=5$ città) e la matrice delle distanze simmetrica

    $$
    \begin{array}{c|ccccc}
    \toprule
    d_{ij} & 1 & 2 & 3 & 4 & 5\\
    \midrule
    1 & - & 2 & 3 & 3 & 7\\
    2 & 2 & - & 4 & 12 & 6\\
    3 & 3 & 4 & - & 6 & 11\\
    4 & 3 & 12 & 6 & - & 5\\
    5 & 7 & 6 & 11 & 5 & -\\
    \bottomrule
    \end{array}
    $$

    Consideriamo le seguenti soluzioni candidate (gli archi non elencati hanno $x_{ij}=0$):

    - **(a)** gli archi del giro $(1,3,2,5,4)$, con $u_2=2$, $u_3=1$, $u_4=4$, $u_5=3$;

    - **(b)** gli archi dello stesso giro, con $u_2=1,~u_3=2,~u_4=3,~u_5=4$;

    - **(c)** gli archi $(1,2)$, $(2,3)$, $(3,1)$, $(4,5)$, $(5,4)$, con $u_2=1$, $u_3=2$, $u_4=3$, $u_5=4$;

    - **(d)** $x_{ij}=\frac{1}{4}$ per ogni arco $(i,j)$, con $u_2=u_3=u_4=u_5=1$.

    **Domande**

    1. Verificare i vincoli di grado per ogni candidata.

    2. Per ogni candidata, stabilire se soddisfa i vincoli (MTZ) con le posizioni date e se le sue variabili di arco soddisfano i vincoli di eliminazione dei sottogiri. Indicare un vincolo violato, quando c'è.

    3. Quali candidate rappresentano una soluzione ammissibile dei modelli interi? Per la candidata (c), mostrare che nessuna scelta delle posizioni $u_i$ soddisfa i vincoli (MTZ).

    4. Calcolare il valore obiettivo della candidata (d) e confrontarlo con il valore ottimo e con $z(\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}})$ (usare Gurobi).

??? soluzione "Soluzione"

    1. In (a), (b) e (c) ogni città ha un arco uscente e un arco entrante. In (d) ogni città ha $4$ archi uscenti e $4$ archi entranti di valore $\frac{1}{4}$: entrambe le somme valgono $1$. Tutti i vincoli di grado valgono.

    2. - **(a)** Gli archi formano un giro, e le posizioni sono quelle del giro: ogni arco selezionato $(i,j)$ con $i,j\neq 1$ dà $u_j=u_i+1$, e ogni vincolo vale. Valgono anche i vincoli di eliminazione dei sottogiri.

        - **(b)** Gli archi formano lo stesso giro, quindi i vincoli di eliminazione dei sottogiri valgono. Le posizioni sono sbagliate: l'arco $(3,2)$ è selezionato e $u_3-u_2+4x_{32}=2-1+4=5>3$.

        - **(c)** Con le posizioni date l'arco $(5,4)$ dà $u_5-u_4+4x_{54}=4-3+4=5>3$. Il sottogiro su $S=\{4,5\}$ viola $x_{45}+x_{54}\le 1$, poiché $x_{45}+x_{54}=2$.

        - **(d)** Ogni arco ha $x_{ij}=\frac{1}{4}$, quindi con $u_i=1$ ogni vincolo (MTZ) dà $4\cdot\frac{1}{4}=1\le 3$. Un insieme $S$ contiene $|S|(|S|-1)$ archi, di valore totale $\frac{|S|(|S|-1)}{4}\le |S|-1$ poiché $|S|\le 4$: tutti i vincoli di eliminazione dei sottogiri valgono.

    3. Solo (a) e (b) sono intere e formano un giro. La candidata (a) è ammissibile per entrambi i modelli interi; gli archi di (b) sono ammissibili per $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{DFJ}}$, e diventano ammissibili per $\mathrm{ILP}_{\mathrm{TSP}}^{\mathrm{MTZ}}$ con le posizioni di (a). La candidata (d) è ammissibile solo per i due rilassamenti.

        Per (c), gli archi selezionati $(4,5)$ e $(5,4)$ impongono $u_5\ge u_4+1$ e $u_4\ge u_5+1$. Sommando otteniamo $0\ge 2$, che è impossibile: nessuna scelta delle posizioni funziona, perché il sottogiro $4\to 5\to 4$ non contiene la città $1$.

    4. Il valore di (d) è un quarto della somma delle $d_{ij}$ su tutti gli archi, ossia $\frac{2\cdot 59}{4}=\frac{59}{2}$. È maggiore del valore ottimo $L((1,3,2,5,4))=21$, quindi non migliora il bound $z(\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}})=20$ dato da Gurobi; mostra solo che i rilassamenti contengono punti frazionari lontani da ogni giro.

<a id="esercizio-13-4"></a>

!!! esercizio "Esercizio 13.4: Confronto fra i rilassamenti del TSP (1)"

    Consideriamo un'istanza del TSP con $\mathscr{V}=\{1,\dots,5\}$ ($n=5$ città) e la matrice delle distanze simmetrica

    $$
    \begin{array}{c|ccccc}
    \toprule
    d_{ij} & 1 & 2 & 3 & 4 & 5\\
    \midrule
    1 & - & 5 & 12 & 2 & 9\\
    2 & 5 & - & 2 & 8 & 12\\
    3 & 12 & 2 & - & 9 & 9\\
    4 & 2 & 8 & 9 & - & 5\\
    5 & 9 & 12 & 9 & 5 & -\\
    \bottomrule
    \end{array}
    $$

    **Domande**

    1. Contare le variabili e i vincoli (oltre ai domini) dei tre rilassamenti: $\mathrm{LP}\text{-}0_{\mathrm{TSP}}$ (solo vincoli di grado), $\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}}$ e $\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{DFJ}}$.

    2. Risolvere con Gurobi i tre rilassamenti e riportarne le soluzioni ottime.

    3. Trovare il giro ottimo enumerando i $12$ giri distinti e calcolare il gap $\frac{z-\LB}{\LB}$ di ogni bound.

    4. Mostrare che la soluzione ottima di $\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}}$ trovata da Gurobi sta nella regione debole della Proposizione 13.3 del capitolo e che viola vincoli di eliminazione dei sottogiri.

??? soluzione "Soluzione"

    1. Tutti e tre usano le $20$ variabili di arco; il rilassamento MTZ aggiunge le $4$ posizioni. I vincoli sono:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>rilassamento</th>
        <th>variabili</th>
        <th>vincoli</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}\text{-}0_{\mathrm{TSP}}\)</span> (solo vincoli di grado)</td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(10\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}}\)</span></td>
        <td><span class="arithmatex">\(20+4\)</span></td>
        <td><span class="arithmatex">\(10+12\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{DFJ}}\)</span></td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(10+11\)</span></td>
        </tr>
        </table></div>

    2. - $\mathrm{LP}\text{-}0_{\mathrm{TSP}}$: valore $20$, con $x_{15}=x_{23}=x_{32}=x_{41}=x_{54}=1$: i sottogiri $1\to 5\to 4\to 1$, $2\to 3\to 2$.

        - $\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}}$: valore $\frac{43}{2}$, con $x_{14}=x_{23}=x_{32}=x_{45}=\frac{3}{4},~~x_{51}=\frac{1}{2},~~x_{12}=x_{21}=x_{35}=x_{41}=x_{53}=x_{54}=\frac{1}{4}$ e $u_2=u_3=u_4=u_5=1$.

        - $\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{DFJ}}$: valore $23$, con $x_{12}=x_{23}=x_{35}=x_{41}=x_{54}=1$, che è il giro $(1,2,3,5,4)$.

    3. Il giro ottimo è $\sigma=(1,2,3,5,4)$, di lunghezza $L(\sigma)=23$. I gap sono:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>bound</th>
        <th>valore</th>
        <th>gap da <span class="arithmatex">\(23\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}\text{-}0_{\mathrm{TSP}}\)</span> (solo vincoli di grado)</td>
        <td><span class="arithmatex">\(20\)</span></td>
        <td><span class="arithmatex">\(15.0\%\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}}\)</span></td>
        <td><span class="arithmatex">\(\frac{43}{2}\)</span></td>
        <td><span class="arithmatex">\(7.0\%\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{DFJ}}\)</span></td>
        <td><span class="arithmatex">\(23\)</span></td>
        <td><span class="arithmatex">\(0.0\%\)</span></td>
        </tr>
        </table></div>

        Il rilassamento DFJ chiude il gap su questa istanza.

    4. Ogni arco $(i,j)$ con $i,j\neq 1$ ha $x_{ij}\le\frac{3}{4}=\frac{n-2}{n-1}$, e tutte le posizioni valgono $1$: è la regione debole della Proposizione 13.3, dove ogni vincolo (MTZ) dà $4x_{ij}\le 3$. Per $S=\{2,3\}$ gli archi dentro $S$ hanno valore totale $\frac{3}{2}>1$: il vincolo di eliminazione dei sottogiri di $S$ è violato, e il rilassamento DFJ taglia questo punto.

<a id="esercizio-13-5"></a>

!!! esercizio "Esercizio 13.5: Aggiunta dei vincoli di eliminazione dei sottogiri (1)"

    Consideriamo un'istanza del TSP con $\mathscr{V}=\{1,\dots,5\}$ ($n=5$ città) e la matrice delle distanze simmetrica

    $$
    \begin{array}{c|ccccc}
    \toprule
    d_{ij} & 1 & 2 & 3 & 4 & 5\\
    \midrule
    1 & - & 4 & 10 & 2 & 8\\
    2 & 4 & - & 11 & 2 & 5\\
    3 & 10 & 11 & - & 4 & 2\\
    4 & 2 & 2 & 4 & - & 2\\
    5 & 8 & 5 & 2 & 2 & -\\
    \bottomrule
    \end{array}
    $$

    Partiamo dai soli vincoli di grado e aggiungiamo i vincoli di eliminazione dei sottogiri uno alla volta, solo quando sono violati.

    **Domande**

    1. Risolvere con Gurobi il rilassamento di assegnamento $\mathrm{LP}\text{-}0_{\mathrm{TSP}}$ (solo vincoli di grado) e descriverne la soluzione ottima.

    2. Aggiungere il vincolo di eliminazione del sottogiro che non contiene la città $1$, risolvere di nuovo e ripetere, finché la soluzione è un giro. Indicare il valore di ogni rilassamento.

    3. Calcolare il valore ottimo per enumerazione e il gap $\frac{z-\LB}{\LB}$ di ogni rilassamento risolto, insieme al rilassamento MTZ.

??? soluzione "Soluzione"

    1. Gurobi dà valore $12$ con $x_{14}=1$, $x_{21}=1$, $x_{35}=1$, $x_{42}=1$, $x_{53}=1$. Gli archi formano i sottogiri $1\to 4\to 2\to 1$ e $3\to 5\to 3$.  La soluzione soddisfa i vincoli di grado ma non è un giro: le iterazioni seguenti partono da questa soluzione.

    2. \*\*Iterazione 1\*\*<br> Gurobi dà valore $12$ con $x_{14}=1$, $x_{21}=1$, $x_{35}=1$, $x_{42}=1$, $x_{53}=1$. Gli archi formano i sottogiri $1\to 4\to 2\to 1$ e $3\to 5\to 3$. Il sottogiro su $S=\{3,5\}$ viola il suo vincolo, che aggiungiamo:

        $$
        x_{35} + x_{53}\le 1.
        $$

        \*\*Iterazione 2\*\*<br> Gurobi dà valore $16$ con $x_{12}=1$, $x_{21}=1$, $x_{34}=1$, $x_{45}=1$, $x_{53}=1$. Gli archi formano i sottogiri $1\to 2\to 1$ e $3\to 4\to 5\to 3$. Il sottogiro su $S=\{3,4,5\}$ viola il suo vincolo, che aggiungiamo:

        $$
        x_{34} + x_{35} + x_{43} + x_{45} + x_{53} + x_{54}\le 2.
        $$

        \*\*Iterazione 3\*\*<br> Gurobi dà valore $17$ con $x_{12}=1$, $x_{25}=1$, $x_{34}=1$, $x_{41}=1$, $x_{53}=1$. Gli archi formano il giro $(1,2,5,3,4)$. Nessun vincolo di eliminazione dei sottogiri è violato, e la procedura termina.

    3. L'enumerazione dà il giro ottimo $(1,2,5,3,4)$, di lunghezza $17$, che è il giro trovato all'ultima iterazione. Gurobi dà $z(\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}})=14$. I gap sono:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>rilassamento</th>
        <th>valore</th>
        <th>gap da <span class="arithmatex">\(17\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}\text{-}0_{\mathrm{TSP}}\)</span> (solo vincoli di grado)</td>
        <td><span class="arithmatex">\(12\)</span></td>
        <td><span class="arithmatex">\(41.7\%\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(\mathrm{LP}_{\mathrm{TSP}}^{\mathrm{MTZ}}\)</span></td>
        <td><span class="arithmatex">\(14\)</span></td>
        <td><span class="arithmatex">\(21.4\%\)</span></td>
        </tr>
        <tr>
        <td>con <span class="arithmatex">\(1\)</span> vincolo di eliminazione dei sottogiri</td>
        <td><span class="arithmatex">\(16\)</span></td>
        <td><span class="arithmatex">\(6.2\%\)</span></td>
        </tr>
        <tr>
        <td>con <span class="arithmatex">\(2\)</span> vincoli di eliminazione dei sottogiri</td>
        <td><span class="arithmatex">\(17\)</span></td>
        <td><span class="arithmatex">\(0.0\%\)</span></td>
        </tr>
        </table></div>

        Due vincoli di eliminazione dei sottogiri, sugli $11$ del modello DFJ, bastano a chiudere il gap.

<a id="esercizio-13-6"></a>

!!! esercizio "Esercizio 13.6: Modello PLI del TSP asimmetrico (ATSP)"

    Consideriamo un'istanza dell'ATSP con $\mathscr{V}=\{1,\dots,4\}$ ($n=4$ città) e la matrice delle distanze asimmetrica

    $$
    \begin{array}{c|cccc}
    \toprule
    d_{ij} & 1 & 2 & 3 & 4\\
    \midrule
    1 & - & 8 & 7 & 5\\
    2 & 8 & - & 3 & 6\\
    3 & 9 & 8 & - & 8\\
    4 & 2 & 9 & 9 & -\\
    \bottomrule
    \end{array}
    $$

    dove $d_{ij}$ è la distanza dalla città $i$ alla città $j$.

    **Domande**

    1. Contare le variabili e i vincoli del modello $\mathrm{ILP}_{\mathrm{ATSP}}$ del capitolo (il modello DFJ sugli archi, con $d_{ij}\neq d_{ji}$ ammesso) e scriverlo per questa istanza.

    2. Risolvere con Gurobi il modello con i soli vincoli di grado. Descrivere la soluzione e trovare il vincolo di eliminazione dei sottogiri che viola.

    3. Risolvere con Gurobi il modello $\mathrm{ILP}_{\mathrm{ATSP}}$: indicare il giro ottimo e la sua lunghezza.

    4. Elencare le lunghezze di tutti i giri, ciascuno nel suo verso, e verificare il risultato. Confrontare il giro ottimo con lo stesso giro percorso al contrario.

??? soluzione "Soluzione"

    1. Ci sono $n(n-1)=12$ variabili binarie $x_{ij}$, $2n=8$ vincoli di grado e $2^{n-1}-n=4$ vincoli di eliminazione dei sottogiri, uno per ogni $S\subseteq\{2,3,4\}$ con $|S|\ge 2$. Il modello è:

        $$
        \begin{array}{rlcl}
        {\min} & {8\,x_{12}+7\,x_{13}+5\,x_{14}+8\,x_{21}+3\,x_{23}+6\,x_{24}+9\,x_{31}} &  &  \\
        & {+8\,x_{32}+8\,x_{34}+2\,x_{41}+9\,x_{42}+9\,x_{43}} &  &  \\[1ex]
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

    2. Gurobi restituisce il valore $18$ con $x_{14}=x_{23}=x_{32}=x_{41}=1$: due sottogiri, $1\to4\to1$ e $2\to3\to2$. Il sottogiro su $S=\{2,3\}$ usa $2>|S|-1=1$ archi dentro $S$: viola il vincolo $x_{23}+x_{32}\le 1$.

    3. Gurobi restituisce $z(\mathrm{ILP}_{\mathrm{ATSP}})=21$ con il giro $\tilde\sigma=(1,2,3,4)$, ossia $\tilde x_{12}=\tilde x_{23}=\tilde x_{34}=\tilde x_{41}=1$, di lunghezza $8+3+8+2=21$. Il modello MTZ dà lo stesso valore.

    4. I $(n-1)!=6$ giri che partono dalla città $1$ sono:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th>giro</th>
        <th>lunghezza</th>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,2,3,4)\)</span></td>
        <td><span class="arithmatex">\(8+3+8+2=21\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,2,4,3)\)</span></td>
        <td><span class="arithmatex">\(8+6+9+9=32\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3,2,4)\)</span></td>
        <td><span class="arithmatex">\(7+8+6+2=23\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,3,4,2)\)</span></td>
        <td><span class="arithmatex">\(7+8+9+8=32\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4,2,3)\)</span></td>
        <td><span class="arithmatex">\(5+9+3+9=26\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\((1,4,3,2)\)</span></td>
        <td><span class="arithmatex">\(5+9+8+8=30\)</span></td>
        </tr>
        </table></div>

        Il minimo $21$ è raggiunto solo da $(1,2,3,4)$: il giro ottimo è unico. Percorso al contrario è il giro $(1,4,3,2)$, di lunghezza $30$: nell'ATSP i due versi sono soluzioni diverse.
