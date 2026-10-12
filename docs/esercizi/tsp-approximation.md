---
title: "Esercizi · TSP: il caso generale e il caso metrico"
---

# Esercizi · TSP: il caso generale e il caso metrico

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 39** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 39: Commesso viaggiatore (TSP)](../algoritmi-di-approssimazione/tsp-approximation.md) · [:material-file-pdf-box: Eserciziario, volume 5 (PDF)](../pdf/esercizi-5-algoritmi-di-approssimazione.pdf)

</div>

<a id="esercizio-39-1"></a>

!!! esercizio "Esercizio 39.1: Approssimazione del TSP metrico 1"

    Consideriamo un insieme $\mathscr{V}=\{1,\dots,6\}$ di $6$ città di coordinate $1{:}\,(3,4)$, $2{:}\,(6,1)$, $3{:}\,(3,8)$, $4{:}\,(8,8)$, $5{:}\,(0,4)$, $6{:}\,(8,0)$ e distanze pari alle distanze euclidee arrotondate all'intero più vicino (l'istanza è metrica):

    $$
    \begin{array}{c|cccccc}
    \hline {d_{ij}} & {1} & {2} & {3} & {4} & {5} & {6} \\
    \hline {1} & --- & {4} & {4} & {6} & {3} & {6} \\
    {2} & {4} & --- & {8} & {7} & {7} & {2} \\
    {3} & {4} & {8} & --- & {5} & {5} & {9} \\
    {4} & {6} & {7} & {5} & --- & {9} & {8} \\
    {5} & {3} & {7} & {5} & {9} & --- & {9} \\
    {6} & {6} & {2} & {9} & {8} & {9} & --- \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Calcolare un albero ricoprente di costo minimo $T$ con l'algoritmo di Kruskal (spigoli per distanza non decrescente, pareggi per coppia di indici) e il suo peso $d(T)$.

    2. Applicare l'algoritmo del doppio albero $DT$: indicare il circuito euleriano dell'albero raddoppiato dalla città $1$ (regola di Fleury), il giro ottenuto con le scorciatoie, e $DT(I)$.

    3. Applicare l'algoritmo di Christofides $CH$: indicare l'insieme $O$ delle città di grado dispari, l'abbinamento perfetto di peso minimo $M$ (confrontando tutti gli abbinamenti perfetti di $O$), il circuito euleriano di $T\cup M$ dalla città $1$, il giro e $CH(I)$.

    4. Il giro ottimo ha lunghezza $z(I)=27$. Calcolare i due rapporti e verificare le disuguaglianze $DT(I)\le2\,d(T)\le2\,z(I)$ e $CH(I)\le d(T)+d(M)\le\frac32\,z(I)$.

??? soluzione "Soluzione"

    1. L'algoritmo di Kruskal esamina $\{2,6\}$ ($2$, preso), $\{1,5\}$ ($3$, preso), $\{1,2\}$ ($4$, preso), $\{1,3\}$ ($4$, preso), $\{3,4\}$ ($5$, preso). Dopo cinque spigoli l'albero copre le sei città:

        $$
        T=\big\{\{2,6\},\{1,5\},\{1,2\},\{1,3\},\{3,4\}\big\},\qquad d(T)=2+3+4+4+5=18 .
        $$

        È l'unico MST dell'istanza.

    2. I vicini in $T$ sono $1{:}\,\{2,3,5\}$, $2{:}\,\{1,6\}$, $3{:}\,\{1,4\}$, $4{:}\,\{3\}$, $5{:}\,\{1\}$, $6{:}\,\{2\}$. Il circuito euleriano dell'albero raddoppiato dalla città $1$ è la visita in profondità con i figli in ordine crescente:

        $$
        W=(1,2,6,2,1,3,4,3,1,5,1),\qquad 4+2+2+4+4+5+5+4+3+3=36=2\,d(T).
        $$

        Mantenendo ogni città alla sua prima occorrenza otteniamo $\sigma=(1,2,6,3,4,5)$, di lunghezza

        $$
        DT(I)=d_{12}+d_{26}+d_{63}+d_{34}+d_{45}+d_{51}=4+2+9+5+9+3=32 .
        $$

    3. I gradi in $T$ sono $\deg(1)=3$, $\deg(2)=2$, $\deg(3)=2$, $\deg(4)=1$, $\deg(5)=1$, $\deg(6)=1$, quindi $O=\{1,4,5,6\}$. I suoi tre abbinamenti perfetti pesano

        $$
        \{\{1,4\},\{5,6\}\}{:}\ 6+9=15,\quad
        \{\{1,5\},\{4,6\}\}{:}\ 3+8=11,\quad
        \{\{1,6\},\{4,5\}\}{:}\ 6+9=15,
        $$

        quindi $M=\{\{1,5\},\{4,6\}\}$, con $d(M)=11$. Il multigrafo $T\cup M$ ha due copie di $\{1,5\}$. La regola di Fleury dalla città $1$ (vicini $2,3,5,5$) va in $2$, poi in $6$, in $4$ (lungo $M$), in $3$, torna in $1$, e infine va in $5$ e in $1$ lungo le due copie di $\{1,5\}$:

        $$
        W=(1,2,6,4,3,1,5,1),\qquad 4+2+8+5+4+3+3=29=d(T)+d(M).
        $$

        La città $1$ si ripete a metà; saltandola con una scorciatoia otteniamo $\sigma=(1,2,6,4,3,5)$, di lunghezza

        $$
        CH(I)=d_{12}+d_{26}+d_{64}+d_{43}+d_{35}+d_{51}=4+2+8+5+5+3=27 .
        $$

        La scorciatoia sostituisce $3\to1\to5$ ($4+3$) con $3\to5$ ($5$) e fa risparmiare $2$.

    4. I rapporti sono

        $$
        \frac{DT(I)}{z(I)}=\frac{32}{27},\qquad \frac{CH(I)}{z(I)}=\frac{27}{27}=1 ,
        $$

        quindi $CH$ trova il giro ottimo, che è unico. Le disuguaglianze delle dimostrazioni sono

        \begin{gather*}
        DT(I)=32\le 2\,d(T)=36\le 2\,z(I)=54,\\
        CH(I)=27\le d(T)+d(M)=29\le\frac32\,z(I)=\frac{81}{2}.
        \end{gather*}

<a id="esercizio-39-2"></a>

!!! esercizio "Esercizio 39.2: Approssimazione del TSP metrico 2"

    Consideriamo un insieme $\mathscr{V}=\{1,\dots,6\}$ di $6$ città di coordinate $1{:}\,(2,4)$, $2{:}\,(6,0)$, $3{:}\,(7,3)$, $4{:}\,(0,7)$, $5{:}\,(0,1)$, $6{:}\,(2,1)$ e distanze pari alle distanze euclidee arrotondate all'intero più vicino (l'istanza è metrica):

    $$
    \begin{array}{c|cccccc}
    \hline {d_{ij}} & {1} & {2} & {3} & {4} & {5} & {6} \\
    \hline {1} & --- & {6} & {5} & {4} & {4} & {3} \\
    {2} & {6} & --- & {3} & {9} & {6} & {4} \\
    {3} & {5} & {3} & --- & {8} & {7} & {5} \\
    {4} & {4} & {9} & {8} & --- & {6} & {6} \\
    {5} & {4} & {6} & {7} & {6} & --- & {2} \\
    {6} & {3} & {4} & {5} & {6} & {2} & --- \\
    \hline
    \end{array}
    $$

    **Domande**

    1. Calcolare un albero ricoprente di costo minimo $T$ con l'algoritmo di Kruskal e il suo peso $d(T)$.

    2. Applicare $CH$: indicare $O$, i pesi di tutti gli abbinamenti perfetti di $O$, l'abbinamento $M$, il circuito euleriano di $T\cup M$ dalla città $1$ (regola di Fleury), il giro e $CH(I)$.

    3. Applicare $DT$ e indicare $DT(I)$.

    4. L'unico giro ottimo è $(1,3,2,6,5,4)$. Calcolare $z(I)$ e i due rapporti. Stabilire se $CH$ è ottimo su questa istanza. Verificare il bound $d(M)\le\frac{z(I)}{2}$ restringendo con le scorciatoie il giro ottimo alle città di $O$, come nella dimostrazione delle note.

??? soluzione "Soluzione"

    1. L'algoritmo di Kruskal esamina $\{5,6\}$ ($2$, preso), $\{1,6\}$ ($3$, preso), $\{2,3\}$ ($3$, preso), $\{1,4\}$ ($4$, preso), $\{1,5\}$ ($4$, chiude il ciclo $1,5,6$: scartato), $\{2,6\}$ ($4$, preso). Quindi

        $$
        T=\big\{\{5,6\},\{1,6\},\{2,3\},\{1,4\},\{2,6\}\big\},\qquad d(T)=2+3+3+4+4=16 ,
        $$

        l'unico MST dell'istanza.

    2. I gradi in $T$ sono $\deg(1)=2$, $\deg(2)=2$, $\deg(3)=1$, $\deg(4)=1$, $\deg(5)=1$, $\deg(6)=3$, quindi $O=\{3,4,5,6\}$. I suoi abbinamenti perfetti pesano

        $$
        \{\{3,4\},\{5,6\}\}{:}\ 8+2=10,\quad
        \{\{3,5\},\{4,6\}\}{:}\ 7+6=13,\quad
        \{\{3,6\},\{4,5\}\}{:}\ 5+6=11,
        $$

        quindi $M=\{\{3,4\},\{5,6\}\}$, con $d(M)=10$; $T\cup M$ ha due copie di $\{5,6\}$. La regola di Fleury dalla città $1$ (vicini $4$, $6$) va in $4$, poi in $3$ lungo $M$, in $2$ e in $6$. Nella città $6$ gli spigoli non usati sono $\{6,1\}$ e le due copie di $\{6,5\}$: la città $1$ ha l'indice minimo, ma $\{6,1\}$ è un ponte degli spigoli non usati (rimuoverlo isola la città $1$ dalle due copie di $\{5,6\}$), quindi il cammino va in $5$, torna in $6$ e infine va in $1$:

        $$
        W=(1,4,3,2,6,5,6,1),\qquad 4+8+3+4+2+2+3=26=d(T)+d(M).
        $$

        Saltando con una scorciatoia la seconda visita della città $6$ otteniamo $\sigma=(1,4,3,2,6,5)$, di lunghezza

        $$
        CH(I)=d_{14}+d_{43}+d_{32}+d_{26}+d_{65}+d_{51}=4+8+3+4+2+4=25 .
        $$

    3. I vicini in $T$ sono $1{:}\,\{4,6\}$, $2{:}\,\{3,6\}$, $3{:}\,\{2\}$, $4{:}\,\{1\}$, $5{:}\,\{6\}$, $6{:}\,\{1,2,5\}$. La visita in profondità dalla città $1$ è

        $$
        W=(1,4,1,6,2,3,2,6,5,6,1),\qquad \text{di lunghezza } 32=2\,d(T),
        $$

        e le scorciatoie danno $\sigma=(1,4,6,2,3,5)$, di lunghezza

        $$
        DT(I)=4+6+4+3+7+4=28 .
        $$

    4. $z(I)=d_{13}+d_{32}+d_{26}+d_{65}+d_{54}+d_{41}=5+3+4+2+6+4=24$, e

        $$
        \frac{CH(I)}{z(I)}=\frac{25}{24},\qquad \frac{DT(I)}{z(I)}=\frac{28}{24}=\frac76 .
        $$

        Qui $CH$ non è ottimo, ma supera l'ottimo di una sola unità. Restringendo con le scorciatoie il giro ottimo a $O=\{3,4,5,6\}$ otteniamo il ciclo $(3,6,5,4)$, di lunghezza $d_{36}+d_{65}+d_{54}+d_{43}=5+2+6+8=21\le24$. I suoi spigoli alterni formano gli abbinamenti $\{\{3,6\},\{5,4\}\}$, di peso $11$, e $\{\{6,5\},\{4,3\}\}$, di peso $10$, e infatti

        $$
        d(M)=10\le\min\{11,10\}\le\frac{21}{2}\le\frac{z(I)}{2}=12 .
        $$

<a id="esercizio-39-3"></a>

!!! esercizio "Esercizio 39.3: Approssimazione del TSP metrico 3"

    Consideriamo due grafi con $5$ vertici, $V=\{1,2,3,4,5\}$:

    $$
    G_1:\ E_1=\big\{\{1,2\},\{2,3\},\{3,4\},\{4,5\},\{5,1\},\{1,3\}\big\},
    $$

    $$
    G_2:\ E_2=\big\{\{1,3\},\{1,4\},\{1,5\},\{2,3\},\{2,4\},\{2,5\}\big\}.
    $$

    Supponiamo che un algoritmo polinomiale $\mathscr{A}$ per il TSP abbia la garanzia $\frac{\mathscr{A}(I)}{z(I)}\le\alpha$ con $\alpha=2$ su ogni istanza del TSP.

    **Domande**

    1. Costruire le istanze $I_{G_1}$ e $I_{G_2}$ del TSP della dimostrazione delle note: $d_{ij}=1$ se $\{i,j\}$ è uno spigolo e $d_{ij}=\lceil\alpha n\rceil+1$ altrimenti.

    2. Stabilire se $G_1$ e $G_2$ sono hamiltoniani, e calcolare $z(I_{G_1})$ e $z(I_{G_2})$.

    3. Stabilire che cosa può restituire $\mathscr{A}$ sulle due istanze. Spiegare come $\mathscr{A}$ deciderebbe se un grafo è hamiltoniano.

    4. Stabilire se $I_{G_2}$ è metrica e se $\mathscr{A}$ potrebbe essere l'algoritmo di Christofides.

??? soluzione "Soluzione"

    1. Con $n=5$ e $\alpha=2$, le coppie che non sono spigoli ricevono distanza $\lceil 2\cdot5\rceil+1=11$:

        $$
        \begin{array}{c|ccccc}
        \hline {I_{G_1}} & {1} & {2} & {3} & {4} & {5} \\
        \hline {1} & --- & {1} & {1} & {11} & {1} \\
        {2} & {1} & --- & {1} & {11} & {11} \\
        {3} & {1} & {1} & --- & {1} & {11} \\
        {4} & {11} & {11} & {1} & --- & {1} \\
        {5} & {1} & {11} & {11} & {1} & --- \\
        \hline
        \end{array}
        $$

        $$
        \begin{array}{c|ccccc}
        \hline {I_{G_2}} & {1} & {2} & {3} & {4} & {5} \\
        \hline {1} & --- & {11} & {1} & {1} & {1} \\
        {2} & {11} & --- & {1} & {1} & {1} \\
        {3} & {1} & {1} & --- & {11} & {11} \\
        {4} & {1} & {1} & {11} & --- & {11} \\
        {5} & {1} & {1} & {11} & {11} & --- \\
        \hline
        \end{array}
        $$

    2. $G_1$ contiene il ciclo $(1,2,3,4,5)$, che è hamiltoniano, quindi il giro $(1,2,3,4,5)$ ha lunghezza $5$ e $z(I_{G_1})=5$.

        $G_2$ è il grafo bipartito completo con lati $\{1,2\}$ e $\{3,4,5\}$. Un ciclo in un grafo bipartito alterna i due lati, quindi ha lo stesso numero di vertici su ciascun lato: nessun ciclo può contenere i tre vertici $3,4,5$ e solo due vertici dell'altro lato, e $G_2$ non è hamiltoniano. Ogni giro di $I_{G_2}$ usa almeno una distanza $11$. Il giro $(1,3,2,4,5)$ usa gli spigoli $\{1,3\},\{3,2\},\{2,4\},\{1,5\}$ e la coppia $\{4,5\}$, che non è uno spigolo, quindi la sua lunghezza è $4\cdot1+11=15$, e

        $$
        z(I_{G_2})=15 .
        $$

        (Enumerando i $12$ giri, le loro lunghezze sono solo $15$ e $35$.)

    3. Su $I_{G_1}$: $\mathscr{A}(I_{G_1})\le2\cdot5=10$. Un giro che usa una distanza $11$ ha lunghezza almeno $4+11=15>10$, quindi $\mathscr{A}$ deve restituire un giro di lunghezza $5$, cioè un ciclo hamiltoniano di $G_1$.

        Su $I_{G_2}$: $\mathscr{A}(I_{G_2})\ge z(I_{G_2})=15>10$.

        Quindi il test “$\mathscr{A}(I_G)\le\alpha n=10$” risponde “sì” su $G_1$ e “no” su $G_2$. In generale, costruire $I_G$ ed eseguire $\mathscr{A}$ richiede tempo polinomiale e dà la risposta corretta su ogni grafo, quindi il problema NP-completo del ciclo hamiltoniano sarebbe risolto in tempo polinomiale: un tale $\mathscr{A}$ non può esistere a meno che $P=NP$.

    4. $I_{G_2}$ non è metrica: per esempio $d_{12}=11>d_{13}+d_{32}=1+1=2$. La garanzia $\frac32$ dell'algoritmo di Christofides vale solo per le istanze metriche, quindi non dice nulla su $I_{G_2}$, e non c'è contraddizione con la proposizione delle note: è la disuguaglianza triangolare a rendere approssimabile il TSP.
