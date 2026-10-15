---
title: "Esercizi · Clique massima: limiti dell'approssimazione"
---

# Esercizi · Clique massima: limiti dell'approssimazione

<div class="info-capitolo" markdown>

**Esercizi · Capitolo 38** · ogni soluzione si apre con un clic · [:material-book-open-variant: Capitolo 38: Clique massima (MCP)](../algoritmi-di-approssimazione/clique-inapproximability.md) · [:material-file-pdf-box: Eserciziario, volume 5 (PDF)](../pdf/esercizi-5-algoritmi-di-approssimazione.pdf)

</div>

!!! formula "Risultati usati in questi esercizi"

    Dal capitolo [Clique massima: limiti dell'approssimazione](../algoritmi-di-approssimazione/clique-inapproximability.md), per i grafi $G=(V,E)$ e $H=(W,F)$:

    \begin{align*}
    &\text{prodotto forte:} && (u,x)\sim(v,y) \iff (u=v \text{ oppure } \{u,v\}\in E) \text{ e } (x=y \text{ oppure } \{x,y\}\in F); \tag{Q1}\\
    &\text{numero di clique:} && \omega(G\boxtimes H)=\omega(G)\,\omega(H),\quad |K|\le|p(K)|\cdot\max_u|K_u|; \tag{Q2}\\
    &\text{amplificazione:} && \text{rapporto } \alpha \text{ su } G\boxtimes G \ \Rightarrow\ \text{rapporto } \sqrt{\alpha} \text{ su } G;\\ &&& t \text{ prodotti: } \alpha^{1/2^t}; \tag{Q3}\\
    &\text{grado limitato:} && \omega(G)\le\Delta(G)+1, \text{ enumerazione di } \textstyle\sum_{v} 2^{\deg(v)} \text{ sottoinsiemi}; \tag{Q4}\\
    &\text{insiemi stabili:} && \alpha(G)=\omega(\overline{G}),\\ &&& \text{un insieme stabile massimale } S \text{ ha } \tfrac{\alpha(G)}{|S|}\le\Delta(G)+1. \tag{Q5}
    \end{align*}

<a id="esercizio-38-1"></a>

!!! esercizio "Esercizio 38.1: Il prodotto forte (1)"

    Sia $G$ il cammino con i vertici $1,2,3$ e gli spigoli $\{1,2\},\{2,3\}$, e consideriamo il prodotto forte $G\boxtimes G$, i cui vertici sono le coppie $(i,j)$ con $i,j\in\{1,2,3\}$.

    **Domande**

    1. Elencare i vicini di $(2,2)$ e di $(1,1)$ in $G\boxtimes G$, e contarne gli spigoli.

    2. $\{(1,1),(2,2),(3,3)\}$ è una clique di $G\boxtimes G$?

    3. Calcolare $\omega(G)$ e $\omega(G\boxtimes G)$, e dare tutte le clique massime di $G\boxtimes G$.

    4. Per la clique $K=\{(1,1),(1,2),(2,1),(2,2)\}$, calcolare la proiezione $p(K)$ e le fibre $K_u$, e verificare la disuguaglianza di (Q2).

??? soluzione "Soluzione"

    Usiamo i risultati (Q1)–(Q5) del riquadro all'inizio del capitolo.

    1. Per (Q1), $(2,2)$ è adiacente a ogni altra coppia, perché $2$ è adiacente a $1$ e $3$: i suoi $8$ vicini sono tutti gli altri vertici. Il vertice $(1,1)$ ha i vicini $(1,2), (2,1), (2,2)$. Contando i vicini di tutti i vertici e dividendo per due, $G\boxtimes G$ ha $20$ spigoli.

    2. No: $(1,1)$ e $(3,3)$ non sono adiacenti, perché $1\neq3$ e $\{1,3\}$ non è uno spigolo di $G$.

    3. $\omega(G)=2$ (gli spigoli), e per (Q2) $\omega(G\boxtimes G)=2\cdot2=4$. L'enumerazione lo conferma, con le $4$ clique massime $\{i,i+1\}\times\{j,j+1\}$, $i,j\in\{1,2\}$: $\{(1,1),(1,2),(2,1),(2,2)\}$, $\{(1,2),(1,3),(2,2),(2,3)\}$, $\{(2,1),(2,2),(3,1),(3,2)\}$, $\{(2,2),(2,3),(3,2),(3,3)\}$.

    4. $p(K)=\{1,2\}$, con le fibre $K_1=K_2=\{1,2\}$: sono tutte clique di $G$, e $|K|=4\le|p(K)|\cdot\max_u|K_u|=2\cdot2=4$.

<a id="esercizio-38-2"></a>

!!! esercizio "Esercizio 38.2: Amplificare un rapporto (1)"

    Supponiamo che un algoritmo polinomiale $\mathscr{A}$ per il MCP abbia la garanzia $\frac{\omega(G)}{\mathscr{A}(I)}\le\alpha$ con $\alpha=4$ su ogni grafo, e applichiamo la costruzione del capitolo a un grafo $G$ con $n=50$ vertici: $t$ prodotti forti, poi $\mathscr{A}$, poi $t$ estrazioni di una clique di dimensione almeno pari alla radice quadrata.

    **Domande**

    1. Calcolare il rapporto garantito e il numero di vertici del grafo dato ad $\mathscr{A}$, per $t=0,1,2,3,4$.

    2. Qual è il più piccolo $t$ che dà il rapporto $\beta=\frac{3}{2}$? E $\beta=\frac{5}{4}$, $\beta=\frac{11}{10}$?

    3. Su $G\boxtimes G$ l'algoritmo restituisce una clique $K$ con $10$ vertici. Quanto è grande, almeno, la clique di $G$ estratta da essa? Che cosa dice la garanzia di $\mathscr{A}$ su $\omega(G)$?

    4. Perché $t$ non può crescere con $n$, per esempio $t=\log_2 n$, per ottenere il rapporto $1$?

??? soluzione "Soluzione"

    Usiamo i risultati (Q1)–(Q5) del riquadro all'inizio del capitolo.

    1. Per (Q3) il rapporto dopo $t$ prodotti è $\alpha^{1/2^t}$, e il grafo ha $n^{2^t}$ vertici:

        <div class="tabella" markdown="0"><table>
        <tr>
        <th><span class="arithmatex">\(t\)</span></th>
        <th>rapporto <span class="arithmatex">\(4^{1/2^t}\)</span></th>
        <th>vertici <span class="arithmatex">\(50^{2^t}\)</span></th>
        </tr>
        <tr>
        <td><span class="arithmatex">\(0\)</span></td>
        <td><span class="arithmatex">\(4.000\)</span></td>
        <td><span class="arithmatex">\(50\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(1\)</span></td>
        <td><span class="arithmatex">\(2.000\)</span></td>
        <td><span class="arithmatex">\(2\,500\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(2\)</span></td>
        <td><span class="arithmatex">\(1.414\)</span></td>
        <td><span class="arithmatex">\(6\,250\,000\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(3\)</span></td>
        <td><span class="arithmatex">\(1.189\)</span></td>
        <td><span class="arithmatex">\(3.9\cdot 10^{13}\)</span></td>
        </tr>
        <tr>
        <td><span class="arithmatex">\(4\)</span></td>
        <td><span class="arithmatex">\(1.091\)</span></td>
        <td><span class="arithmatex">\(1.5\cdot 10^{27}\)</span></td>
        </tr>
        </table></div>

    2. Serve $4^{1/2^t}\le\beta$, cioè $2^t\ge\frac{\ln 4}{\ln\beta}$:

        - $\beta=\frac{3}{2}$: $\frac{\ln 4}{\ln\beta}\approx3.42$, quindi $t=2$ (rapporto $1.414$).

        - $\beta=\frac{5}{4}$: $\frac{\ln 4}{\ln\beta}\approx6.21$, quindi $t=3$ (rapporto $1.189$).

        - $\beta=\frac{11}{10}$: $\frac{\ln 4}{\ln\beta}\approx14.55$, quindi $t=4$ (rapporto $1.091$).

    3. Per (Q2), $|p(K)|\cdot\max_u|K_u|\ge10$; entrambi sono interi, e $3\cdot3=9<10$, quindi il più grande ha almeno $4$ vertici, una clique di $G$. La garanzia dà $10\ge\frac{\omega(G)^2}{4}$, quindi $\omega(G)^2\le40$ e $\omega(G)\le6$: la clique estratta rispetta il rapporto $\sqrt{4}=2$, perché $2\cdot4\ge6$.

    4. Il grafo dato ad $\mathscr{A}$ ha $n^{2^t}$ vertici: per $t=\log_2 n$ ha $n^n$ vertici, e l'algoritmo non è più polinomiale. La costruzione dà ogni rapporto <em>costante</em> $\beta>1$, con $t$ costante.

<a id="esercizio-38-3"></a>

!!! esercizio "Esercizio 38.3: Casi particolari del MCP e del MSSP (1)"

    Consideriamo il prisma $G$, con $V=\{1,\dots,6\}$ e

    $$
    E=\{\{1,2\},\allowbreak \{1,3\},\allowbreak \{2,3\},\allowbreak \{4,5\},\allowbreak \{4,6\},\allowbreak \{5,6\},\allowbreak \{1,4\},\allowbreak \{2,5\},\allowbreak \{3,6\}\},
    $$

    e la stella $S_4$, con il centro $1$ adiacente ai vertici $2,3,4,5$ e nessun altro spigolo.

    **Domande**

    1. Calcolare $\Delta(G)$ e il numero di sottoinsiemi esaminati dall'enumerazione di (Q4). Quali clique massime trova?

    2. Verificare che $G$ soddisfa $m\le 3n-6$ ($G$ è planare). Quale bound su $\omega(G)$ dà la planarità, e quale il grado?

    3. Costruire un insieme stabile massimale di $G$ aggiungendo i vertici nell'ordine $1,\dots,6$ finché è possibile, e confrontarlo con $\alpha(G)$ e con il bound (Q5).

    4. Fare lo stesso sulla stella $S_4$. Quanto è vicino il rapporto al bound $\Delta+1$?

??? soluzione "Soluzione"

    Usiamo i risultati (Q1)–(Q5) del riquadro all'inizio del capitolo.

    1. Ogni vertice ha grado $3$: $\Delta(G)=3$, e l'enumerazione esamina $\sum_v 2^{\deg(v)}=6\cdot 2^3=48$ sottoinsiemi. Trova le due clique massime $\{1,2,3\}$ e $\{4,5,6\}$ (ciascuna a partire da uno qualsiasi dei suoi vertici): $\omega(G)=3$.

    2. $m=9\le 3\cdot6-6=12$. La planarità dà $\omega(G)\le4$, il grado $\omega(G)\le\Delta(G)+1=4$; il valore vero è $3$.

    3. Il vertice $1$ si prende; $2,3,4$ sono adiacenti a $1$; $5$ si prende; $6$ è adiacente a $5$: $S=\{1,5\}$. Un insieme stabile ha al più un vertice per triangolo, quindi $\alpha(G)=2$ e $S$ è ottimo. Il bound (Q5) garantisce $|S|\ge\frac{n}{\Delta+1}=\frac{3}{2}$, quindi $|S|\ge 2$.

    4. Il centro $1$ si prende per primo, e ogni altro vertice è adiacente a esso: $S=\{1\}$. Le foglie formano un insieme stabile, $\alpha(S_4)=4$, e il rapporto è $\frac{4}{1}=4$, contro il bound $\Delta+1=5$: un insieme stabile massimale può essere lontano da uno massimo.

<a id="esercizio-38-4"></a>

!!! esercizio "Esercizio 38.4: Grafo complementare e insiemi stabili (1)"

    Sia $G$ il grafo di Petersen, l'istanza di riferimento del VCP, con $V=\{1,\dots,10\}$ e $E=\{\{1,2\},\allowbreak \{1,5\},\allowbreak \{1,6\},\allowbreak \{2,3\},\allowbreak \{2,7\},\allowbreak \{3,4\},\allowbreak \{3,8\},\allowbreak \{4,5\},\allowbreak \{4,9\},\allowbreak \{5,10\},\allowbreak \{6,8\},\allowbreak \{6,9\},\allowbreak \{7,9\},\allowbreak \{7,10\},\allowbreak \{8,10\}\}$.

    **Domande**

    1. Calcolare il numero di spigoli e i gradi del grafo complementare $\overline{G}$. $\overline{G}$ è planare?

    2. Calcolare $\alpha(G)$ e dedurre $\omega(\overline{G})$. Quanti sottoinsiemi esamina l'enumerazione di (Q4) su $\overline{G}$?

    3. Costruire un insieme stabile massimale di $G$ aggiungendo i vertici nell'ordine $1,\dots,10$ finché è possibile. Che cosa garantisce (Q5)?

    4. Un algoritmo per il MCP ha rapporto al più $\rho$ su ogni grafo con $10$ vertici. Che cosa dà per il MSSP su $G$?

??? soluzione "Soluzione"

    Usiamo i risultati (Q1)–(Q5) del riquadro all'inizio del capitolo.

    1. $\overline{G}$ ha $\binom{10}{2}-15=30$ spigoli, e ogni vertice ha grado $9-3=6$. Poiché $30>3\cdot10-6=24$, $\overline{G}$ non è planare: il caso particolare dei grafi planari non si applica al MSSP su $G$.

    2. I due $5$-cicli $1,\dots,5$ e $6,\dots,10$ contengono ciascuno al più $2$ vertici di un insieme stabile, e $\{1,4,7,8\}$ è stabile: $\alpha(G)=4$, quindi $\omega(\overline{G})=4$, come conferma l'enumerazione. Su $\overline{G}$ l'enumerazione esamina $10\cdot 2^6=640$ sottoinsiemi.

    3. L'ordine dà $S=\{1,3,7\}$: ogni altro vertice è adiacente a uno di essi. Per (Q5), $|S|\ge\frac{n}{\Delta(G)+1}=\frac{5}{2}$, quindi $|S|\ge 3$, e il rapporto è $\frac{\alpha(G)}{|S|}=\frac{4}{3}\le\Delta(G)+1=4$.

    4. Applicato a $\overline{G}$, che ha gli stessi $10$ vertici, restituisce una clique di $\overline{G}$, cioè un insieme stabile di $G$, con almeno $\frac{\omega(\overline{G})}{\rho}=\frac{\alpha(G)}{\rho}$ vertici: lo stesso rapporto $\rho$ per il MSSP.
