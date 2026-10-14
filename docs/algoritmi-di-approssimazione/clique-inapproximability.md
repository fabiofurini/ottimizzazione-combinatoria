---
title: "Clique massima: limiti dell'approssimazione"
---

# Clique massima: limiti dell'approssimazione

<div class="info-capitolo" markdown>

**Parte 5 · Algoritmi di approssimazione · Capitolo 38** · [:material-file-pdf-box: Dispensa, volume 5 (PDF)](../pdf/dispensa-5-algoritmi-di-approssimazione.pdf) · [:material-pencil: Esercizi: Clique massima (MCP)](../esercizi/clique-inapproximability.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, il capitolo [«Principi degli algoritmi di approssimazione»](approximation.md): rapporto di prestazione per un problema di massimo, algoritmo di $\alpha$-approssimazione, PTAS.

    - Da questo modulo, il capitolo [«Problemi di clique»](../problemi-di-ottimizzazione-combinatoria/clique/index.md): le definizioni del MCP e del MSSP, il numero di clique $\omega(G)$, il grafo complementare e $\omega(G)=\alpha(\overline{G})$.

    - Da questo modulo, il capitolo [«Colorazione dei vertici: limiti dell'approssimazione»](coloring-inapproximability.md): i grafi planari e il bound $m\le 3n-6$.

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - costruire il prodotto forte di due grafi e dimostrare $\omega(G\boxtimes H)=\omega(G)\,\omega(H)$;

    - dimostrare che un algoritmo a rapporto costante per il MCP ne darebbe uno per ogni rapporto costante;

    - enunciare i risultati di Håstad e Zuckerman, e concludere che il MCP e il MSSP non sono approssimabili;

    - risolvere il MCP all'ottimo sui grafi planari e sui grafi di grado limitato, e approssimare il MSSP sui grafi di grado limitato.

Il problema di questo capitolo è il [problema della clique massima (MCP)](../problemi-di-ottimizzazione-combinatoria/clique/index.md): la sua definizione e le sue ipotesi sono nella sua pagina.

## 38.1 Notazione

- Come nella pagina del problema, $G=(V,E)$ è un grafo semplice con $n$ vertici e $m$ spigoli, $N(v)$ è l'insieme dei vicini di $v$ e $\Delta(G)$ il grado massimo. Il valore ottimo del MCP è il numero di clique, $z(I)=\omega(G)$, e quello del MSSP è il numero di stabilità $\alpha(G)$.

- <strong>Richiamo.</strong> Come nel capitolo [«Principi degli algoritmi di approssimazione»](approximation.md#box-2-def-pratio), $\mathscr{A}(I)$ è il numero di vertici della clique restituita dall'algoritmo $\mathscr{A}$. Il MCP è un problema di massimo, quindi

    $$
    \mathscr{A}(I) \le \omega(G) ~~~~~~~\text{e}~~~~~~~ \frac{\omega(G)}{\mathscr{A}(I)} \ge 1
    $$

    per ogni istanza $I$.

- Un singolo vertice è una clique, quindi il rapporto $n$ è banale. Questo capitolo mostra che un algoritmo polinomiale non può fare molto meglio su tutti i grafi, e poi le classi di grafi su cui può.

## 38.2 Il MCP non è approssimabile

### 38.2.1 Il prodotto forte

<a id="box-1-cli-defprod"></a>

!!! definizione "Definizione 38.1: prodotto forte"

    Il <strong>prodotto forte</strong> di due grafi $G=(V,E)$ e $H=(W,F)$ è il grafo $G\boxtimes H$ con insieme dei vertici $V\times W$, in cui due vertici distinti $(u,x)$ e $(v,y)$ sono adiacenti se e solo se

    $$
    \big(u=v \ \text{ oppure }\ \{u,v\}\in E\big) \quad\text{e}\quad \big(x=y \ \text{ oppure }\ \{x,y\}\in F\big).
    $$

- $G\boxtimes H$ ha $|V|\,|W|$ vertici e si costruisce in tempo polinomiale nella dimensione di $G$ e $H$. In particolare $G\boxtimes G$ ha $n^2$ vertici.

- Per un insieme $K\subseteq V\times W$, la <strong>proiezione</strong> è $p(K)=\{u\in V:(u,x)\in K \text{ per qualche } x\}$, e la <strong>fibra</strong> di $u\in p(K)$ è $K_u=\{x\in W:(u,x)\in K\}$.

<a id="box-2-cli-propprod"></a>

!!! teorema "Proposizione 38.2"

    Per ogni coppia di grafi $G$ e $H$:

    1. se $K\subseteq V\times W$ è una clique di $G\boxtimes H$, allora $p(K)$ è una clique di $G$, ogni fibra $K_u$ è una clique di $H$, e $|K|\le|p(K)|\cdot\max_{u}|K_u|$;

    2. $\omega(G\boxtimes H)=\omega(G)\,\omega(H)$.

??? dimostrazione "Dimostrazione"

    <em>Parte 1.</em> Siano $u\neq v$ in $p(K)$, con $(u,x),(v,y)\in K$. Questi due vertici sono adiacenti e $u\neq v$, quindi $\{u,v\}\in E$: $p(K)$ è una clique. Siano $x\neq y$ in $K_u$: $(u,x)$ e $(u,y)$ sono adiacenti, quindi $\{x,y\}\in F$, e $K_u$ è una clique. Le fibre partizionano $K$, quindi

    $$
    |K| \;=\; \sum_{u\in p(K)} |K_u| \;\le\; |p(K)|\cdot\max_{u}|K_u| .
    $$

    <em>Parte 2.</em> Se $K_G$ e $K_H$ sono clique massime di $G$ e $H$, ogni coppia di vertici distinti di $K_G\times K_H$ soddisfa la definizione, quindi $\omega(G\boxtimes H)\ge\omega(G)\,\omega(H)$. Viceversa, per la Parte 1 ogni clique $K$ di $G\boxtimes H$ ha $|K|\le|p(K)|\cdot\max_u|K_u|\le\omega(G)\,\omega(H)$. <span class="qed">□</span>

- Anche il prodotto <em>lessicografico</em> soddisfa $\omega(G[H])=\omega(G)\,\omega(H)$; usiamo il prodotto forte, la cui definizione è simmetrica nei due grafi.

### 38.2.2 Un rapporto costante darebbe ogni rapporto costante

- La Parte 1 della [Proposizione 38.2](#box-2-cli-propprod) è costruttiva: da una clique $K$ di $G\boxtimes G$, $p(K)$ oppure la fibra più grande è una clique di $G$ con almeno $\sqrt{|K|}$ vertici, perché il prodotto delle loro dimensioni è almeno $|K|$. Entrambe si calcolano in tempo polinomiale.

<a id="box-3-cli-thmamp"></a>

!!! teorema "Teorema 38.3"

    Se il MCP ha un algoritmo polinomiale di $\alpha$-approssimazione per qualche costante $\alpha\ge1$, allora ha un algoritmo polinomiale di $\beta$-approssimazione per ogni costante $\beta>1$.

??? dimostrazione "Dimostrazione"

    Sia $\mathscr{A}$ un algoritmo polinomiale di $\alpha$-approssimazione, e definiamo l'algoritmo $\mathscr{B}$:

    1. costruire $G\boxtimes G$ ed eseguire $\mathscr{A}$ su di esso, ottenendo una clique $K$;

    2. restituire la più grande fra $p(K)$ e la fibra più grande di $K$, una clique di $G$ con almeno $\sqrt{|K|}$ vertici.

    Per la [Proposizione 38.2](#box-2-cli-propprod), $\omega(G\boxtimes G)=\omega(G)^2$, quindi $|K|\ge\frac{\omega(G)^2}{\alpha}$ e

    $$
    \mathscr{B}(I) \;\ge\; \sqrt{|K|} \;\ge\; \frac{\omega(G)}{\sqrt{\alpha}} :
    $$

    $\mathscr{B}$ è un algoritmo polinomiale di $\sqrt{\alpha}$-approssimazione. Applicando la costruzione $t$ volte si ottiene il rapporto $\alpha^{1/2^t}$, con $\mathscr{A}$ eseguito su un grafo con $n^{2^t}$ vertici. Scegliamo la costante $t$ con $2^t\ge\frac{\ln\alpha}{\ln\beta}$: allora $\alpha^{1/2^t}\le\beta$, e $n^{2^t}$ è un polinomio. <span class="qed">□</span>

- In altre parole, il MCP ha un algoritmo a rapporto costante se e solo se ha un PTAS: il prodotto forte <em>amplifica</em> qualunque rapporto costante. Il tempo di esecuzione cresce come una potenza $n^{2^t}$, che è polinomiale solo perché $t$ è una costante.

### 38.2.3 I risultati di Håstad e Zuckerman

- Il lato negativo è noto, e lo enunciamo senza dimostrazione: usa le dimostrazioni verificabili probabilisticamente.

<a id="box-4-cli-thmHZ"></a>

!!! teorema "Teorema 38.4: Håstad, 1999; Zuckerman, 2007"

    Per ogni $\varepsilon>0$, se $P\neq NP$, nessun algoritmo polinomiale $\mathscr{A}$ per il MCP soddisfa, per ogni grafo $G$ con $n$ vertici,

    $$
    \frac{\omega(G)}{\mathscr{A}(I)} \;\le\; n^{1-\varepsilon} .
    $$

- Håstad (1999) ha dimostrato il teorema nell'ipotesi che i problemi NP non si possano risolvere in tempo polinomiale randomizzato ($NP\neq ZPP$); Zuckerman (2007) lo ha dimostrato nell'ipotesi $P\neq NP$.

- Come per il VCP, il teorema esclude ogni rapporto costante: un algoritmo di $\alpha$-approssimazione ha rapporto al più $\alpha<n^{1/2}$ sui grafi con $n>\alpha^2$ vertici, e i grafi più piccoli si risolvono per enumerazione in tempo costante. Insieme al [Teorema 38.3](#box-3-cli-thmamp): a meno che $P=NP$, il MCP non ha né un rapporto costante né un PTAS.

!!! chiave ""

    Il MCP non è approssimabile: a meno che $P=NP$, nessun algoritmo polinomiale ha una garanzia di prestazione costante, e nemmeno una garanzia della forma $n^{1-\varepsilon}$. Esistono risultati positivi solo su classi particolari di grafi.

## 38.3 Casi particolari

### 38.3.1 Grafi planari

<a id="box-5-cli-propplanar"></a>

!!! teorema "Proposizione 38.5"

    Ogni grafo planare ha $\omega(G)\le 4$, e sui grafi planari il MCP si risolve all'ottimo in tempo $O(n^4)$.

??? dimostrazione "Dimostrazione"

    Un sottografo di un grafo planare è planare. Il grafo completo con $5$ vertici ha $10$ spigoli, più di $3\cdot5-6=9$, quindi non è planare, e un grafo planare non ha clique con $5$ vertici. I sottoinsiemi di al più $4$ vertici sono $O(n^4)$, e ciascuno si verifica in tempo costante. <span class="qed">□</span>

### 38.3.2 Grafi di grado massimo limitato

<a id="box-6-cli-propdeg"></a>

!!! teorema "Proposizione 38.6"

    Ogni grafo ha $\omega(G)\le\Delta(G)+1$, e il MCP si risolve all'ottimo in tempo $O(n\,2^{\Delta}\,\Delta^2)$, con $\Delta=\Delta(G)$.

??? dimostrazione "Dimostrazione"

    Una clique che contiene il vertice $v$ è contenuta in $\{v\}\cup N(v)$, che ha al più $\Delta+1$ vertici. Per ogni vertice $v$, enumeriamo i $2^{\deg(v)}\le 2^\Delta$ sottoinsiemi $S\subseteq N(v)$ e teniamo il più grande $\{v\}\cup S$ che sia una clique; verificare le coppie di $S$ richiede tempo $O(\Delta^2)$. Ogni clique massima si trova a partire da uno qualsiasi dei suoi vertici. <span class="qed">□</span>

- Il tempo è polinomiale per ogni $\Delta$ fissato, e anche quando $\Delta\le\log_2 n$, perché allora $2^\Delta\le n$.

### 38.3.3 Il problema dell'insieme stabile massimo

- Per $\omega(G)=\alpha(\overline{G})$ (capitolo [«Problemi di clique»](../problemi-di-ottimizzazione-combinatoria/clique/index.md)), un insieme stabile di $G$ è una clique di $\overline{G}$, che si costruisce in tempo $O(n^2)$ e ha lo stesso $n$.

- Un algoritmo con rapporto $\rho(n)$ per uno dei due problemi, applicato al grafo complementare, ha lo stesso rapporto $\rho(n)$ per l'altro.

<a id="box-7-cli-cormssp"></a>

!!! teorema "Corollario 38.7"

    Per ogni $\varepsilon>0$, se $P\neq NP$, nessun algoritmo polinomiale per il MSSP ha rapporto $\frac{\alpha(G)}{\mathscr{A}(I)}\le n^{1-\varepsilon}$ su ogni grafo. In particolare, il MSSP non ha un rapporto costante.

- I casi particolari <em>non</em> si trasferiscono: il complementare di un grafo planare, o di un grafo di grado limitato, è denso. Su quelle classi il MSSP resta NP-difficile, ma è approssimabile.

<a id="box-8-cli-propmssp"></a>

!!! teorema "Proposizione 38.8"

    Su ogni grafo, un insieme stabile <strong>massimale</strong> $S$ (a cui non si può aggiungere nessun vertice) ha $|S|\ge\frac{n}{\Delta(G)+1}$. Quindi l'algoritmo greedy che aggiunge vertici finché è possibile soddisfa

    $$
    \frac{\alpha(G)}{|S|} \;\le\; \Delta(G)+1 .
    $$

??? dimostrazione "Dimostrazione"

    Ogni vertice fuori da $S$ ha un vicino in $S$, altrimenti si potrebbe aggiungere. Quindi $V=\bigcup_{v\in S}\big(\{v\}\cup N(v)\big)$, e $n\le|S|\,(\Delta(G)+1)$. Poiché $\alpha(G)\le n$, il rapporto è al più $\frac{n}{|S|}\le\Delta(G)+1$. <span class="qed">□</span>

- Sui grafi di grado massimo al più un $\Delta$ fissato questo è un rapporto costante. Sui grafi planari il MSSP ha addirittura un PTAS (Baker, 1994).

## 38.4 Esempio

<a id="box-9-cli-ex-ref"></a>

!!! esempio "Esempio 38.1: Prodotto forte ed enumerazione sull'istanza di riferimento del MCP"

    L'istanza di riferimento del MCP è il ciclo $1,2,\dots,7,1$ con la corda $\{1,3\}$: $n=7$, $m=8$, $\Delta(G)=3$ e $\omega(G)=3$, con l'unica clique massima $\{1,2,3\}$ (in rosso).

    ![Figura 1](../img/clique-inapproximability/fig01.svg){ .fig loading=lazy  }

    - <strong>Prodotto forte.</strong> $G\boxtimes G$ ha $7^2=49$ vertici e $240$ spigoli, e $\omega(G\boxtimes G)=3^2=9$, raggiunto da $\{1,2,3\}\times\{1,2,3\}$.

    - Supponiamo che un algoritmo restituisca su $G\boxtimes G$ la clique $K=\{1,2,3\}\times\{4,5\}$, con $|K|=6$. La sua proiezione $p(K)=\{1,2,3\}$ e le sue fibre $K_u=\{4,5\}$ sono clique di $G$; la più grande ha $3\ge\sqrt6$ vertici.

    - <strong>Grado limitato.</strong> L'enumerazione della [Proposizione 38.6](#box-6-cli-propdeg) esamina $\sum_v 2^{\deg(v)}=2^3+2^2+2^3+4\cdot 2^2=36$ sottoinsiemi, e trova $\{1,2,3\}$ dai vertici $1$, $2$ e $3$.

    - <strong>Planarità.</strong> Il grafo è planare, come mostra la figura, e $\omega(G)=3\le 4$.

## 38.5 Fonti

- M.R. Garey, D.S. Johnson, <em>Computers and Intractability: A Guide to the Theory of NP-Completeness</em>, W.H. Freeman, 1979 (l'auto-miglioramento del MCP con i prodotti di grafi).

- J. Håstad, Clique is hard to approximate within $n^{1-\varepsilon}$, <em>Acta Mathematica</em> 182(1):105–142, 1999.

- D. Zuckerman, Linear degree extractors and the inapproximability of max clique and chromatic number, <em>Theory of Computing</em> 3:103–128, 2007.

- B.S. Baker, Approximation algorithms for NP-complete problems on planar graphs, <em>Journal of the ACM</em> 41(1):153–180, 1994.

## 38.6 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Invertire il rapporto.</strong> Il MCP è un problema di massimo: il rapporto è $\frac{\omega(G)}{\mathscr{A}(I)}$, almeno $1$.

    - <strong>Iterare il prodotto un numero di volte che cresce con $n$.</strong> Il grafo dopo $t$ prodotti ha $n^{2^t}$ vertici: è polinomiale solo per $t$ costante, quindi l'amplificazione dà ogni rapporto costante, non il rapporto $1$.

    - <strong>Trasferire i casi particolari al MSSP.</strong> Il complementare di un grafo planare non è planare: il MCP è facile sui grafi planari, il MSSP lì è NP-difficile.

    - <strong>Confondere il bound $\Delta(G)+1$ del MCP con quello del MSSP.</strong> Per il MCP, $\omega(G)\le\Delta(G)+1$ limita l'ottimo e rende veloce l'enumerazione; per il MSSP, $\Delta(G)+1$ limita il rapporto di un insieme stabile massimale.

## 38.7 In sintesi

!!! chiave "In sintesi"

    - Il prodotto forte eleva al quadrato il numero di clique, e una clique del prodotto restituisce una clique di $G$ di dimensione almeno pari alla radice quadrata della sua: un rapporto costante per il MCP darebbe ogni rapporto costante.

    - Per i risultati di Håstad e Zuckerman, a meno che $P=NP$ non è possibile nemmeno il rapporto $n^{1-\varepsilon}$: il MCP non è approssimabile, e nemmeno il MSSP, attraverso il grafo complementare.

    - Sui grafi planari e sui grafi di grado limitato il MCP si risolve all'ottimo per enumerazione; sui grafi di grado limitato un insieme stabile massimale ha rapporto al più $\Delta(G)+1$ per il MSSP.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>problema e grafi</th>
    <th>algoritmo</th>
    <th>risultato</th>
    </tr>
    <tr>
    <td>MCP, tutti i grafi</td>
    <td>polinomiale</td>
    <td>nessun rapporto costante, salvo <span class="arithmatex">\(P=NP\)</span></td>
    </tr>
    <tr>
    <td>MCP, planari</td>
    <td>enumerazione</td>
    <td>esatto, <span class="arithmatex">\(\omega(G)\le4\)</span></td>
    </tr>
    <tr>
    <td>MCP, grado <span class="arithmatex">\(\le\Delta\)</span></td>
    <td>enumerazione</td>
    <td>esatto, <span class="arithmatex">\(O(n\,2^\Delta\Delta^2)\)</span></td>
    </tr>
    <tr>
    <td>MSSP, tutti i grafi</td>
    <td>polinomiale</td>
    <td>nessun rapporto costante, salvo <span class="arithmatex">\(P=NP\)</span></td>
    </tr>
    <tr>
    <td>MSSP, grado <span class="arithmatex">\(\le\Delta\)</span></td>
    <td>stabile massimale</td>
    <td>rapporto <span class="arithmatex">\(\le\Delta+1\)</span></td>
    </tr>
    </table></div>

    <strong>Cruscotto dell'istanza di riferimento.</strong>

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Istanza</th>
    <th>Upper bound</th>
    <th>Valore trovato</th>
    <th>Valore ottimo</th>
    </tr>
    <tr>
    <td>ciclo con una corda</td>
    <td><span class="arithmatex">\(\Delta(G)+1=4\)</span></td>
    <td><span class="arithmatex">\(3\)</span>, enumerazione</td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Clique massima (MCP)](../esercizi/clique-inapproximability.md)
