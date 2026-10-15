---
title: "Approssimazione per P||Cmax"
---

# Approssimazione per $P\|C_{\max}$

<div class="info-capitolo" markdown>

**Parte 5 · Algoritmi di approssimazione · Capitolo 40** · [:material-file-pdf-box: Dispensa, volume 5 (PDF)](../pdf/dispensa-5-algoritmi-di-approssimazione.pdf) · [:material-presentation: Slide](../pdf/slide-pcmax-approximation.pdf) · [:material-pencil: Esercizi: Macchine parallele identiche (P||Cmax)](../esercizi/pcmax-approximation.md) · [:material-gesture-tap: App: Istanze tight](../laboratorio/istanze-tight.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, il capitolo [«Principi degli algoritmi di approssimazione»](approximation.md): rapporto di prestazione, garanzia di prestazione relativa, garanzia tight e rapporto di prestazione nel caso peggiore.

    - Da questo modulo, il capitolo [«Problemi di scheduling»](../problemi-di-ottimizzazione-combinatoria/pcmax/index.md): la definizione e l'istanza di riferimento di $P\,||\,C_{\max}$, e il suo lower bound elementare.

    - Da questo modulo, il capitolo [«Euristiche costruttive»](../algoritmi-euristici/constructive-heuristics/index.md): gli algoritmi $LIST$ e $LPT$ come regole costruttive.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo saremo in grado di:

    - eseguire a mano $LIST$ e $LPT$ e disegnare lo schedule che ne risulta;

    - dimostrare le garanzie $2-\frac{1}{m}$ di $LIST$ e $\frac{4}{3}-\frac{1}{3m}$ di $LPT$;

    - costruire le famiglie di istanze che rendono tight queste garanzie;

    - spiegare perché ordinare i lavori per tempo di esecuzione non crescente migliora la garanzia.

Il problema di questo capitolo è il [problema di scheduling su macchine parallele identiche ($P\,||\,C_{\max}$)](../problemi-di-ottimizzazione-combinatoria/pcmax/index.md): la sua definizione e le sue ipotesi sono nella sua pagina.

## 40.1 Notazione

- Come nella pagina del problema, ci sono $m$ macchine identiche e un insieme $\mathscr{J}=\{1,2,\dots,n\}$ di lavori con tempi di esecuzione $t_j$. Una soluzione assegna ogni lavoro $j\in\mathscr{J}$ a una macchina $mach_j=h$; l'insieme dei lavori della macchina $h$ è $J_h$, il suo carico è $L_h=\sum_{j\in J_h}t_j$, e il makespan è $C_{\max}=\max_h L_h$.

- <strong>Richiamo.</strong> Come nel capitolo [«Principi degli algoritmi di approssimazione»](approximation.md#box-2-def-pratio), $z(I)$ è il valore ottimo dell'istanza $I$ e $\mathscr{A}(I)$ il valore della soluzione restituita dall'algoritmo $\mathscr{A}$. $P\,||\,C_{\max}$ è un problema di minimo, quindi

    $$
    \mathscr{A}(I) \ge z(I) ~~~~~~~\text{e}~~~~~~~ \frac{\mathscr{A}(I)}{z(I)} \ge 1
    $$

    per ogni istanza $I$, e il rapporto di prestazione nel caso peggiore è $r(\mathscr{A})=\sup_I \mathscr{A}(I)/z(I)$.

- Usiamo il lower bound elementare delle note sui problemi di ottimizzazione combinatoria:

    \begin{equation*}
    \label{eq:pcmaxlb}
    z(I) \;\ge\; \max\left\{ \max_{j\in\mathscr{J}} t_j,\;\; \frac{\sum_{j\in\mathscr{J}} t_j}{m} \right\}. \tag{40.1}
    \end{equation*}

- L'istanza di riferimento ha $m=3$ e $t=(5,5,4,4,3,3,3)$; il bound dà $\max\{5,27/3\}=9$, e $z(I)=9$ con $J_1=\{1,3\}$, $J_2=\{2,4\}$, $J_3=\{5,6,7\}$.

## 40.2 Gli algoritmi $LIST$ e $LPT$

### 40.2.1 List scheduling { #sez-sec-LIST }

!!! chiave ""

    Il <em>List Scheduling Algorithm</em> (indicato con $LIST$) è un'euristica costruttiva per $P\,||\,C_{\max}$. Esamina i lavori nell'ordine di una lista $\lambda$ data e assegna ogni lavoro a una macchina di carico corrente minimo (in caso di pareggio, alla macchina di indice minimo).

!!! algoritmo "Algoritmo: List Scheduling"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> istanza di <span class="arithmatex">\(P\,||\,C_{\max}\)</span> con <span class="arithmatex">\(n\)</span> lavori, tempi <span class="arithmatex">\(t[1..n]\)</span>, <span class="arithmatex">\(m\)</span> macchine; lista <span class="arithmatex">\(\lambda[1..n]\)</span></div><div class="pc" style="--liv:0"><strong>Output:</strong> assegnamento lavori-macchine <span class="arithmatex">\(mach[1..n]\)</span> e makespan <span class="arithmatex">\(C_{\max}\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> ListScheduling(<span class="arithmatex">\(n, m, t, \lambda\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(mach := \text{nuovo vettore}[1..n]\)</span> <span class="pc-com">▹ assegnamento lavori-macchine</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>for</strong> <span class="arithmatex">\(h := 1\)</span> <strong>to</strong> <span class="arithmatex">\(m\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><span class="arithmatex">\(L[h] \leftarrow 0\)</span> <span class="pc-com">▹ carichi delle macchine</span></div><div class="pc" style="--liv:1"><span class="pc-n">5</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">6</span><strong>for</strong> <span class="arithmatex">\(k := 1\)</span> <strong>to</strong> <span class="arithmatex">\(n\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">7</span><span class="arithmatex">\(j := \lambda[k]\)</span>
    <span class="arithmatex">\(s :=\)</span> una macchina con <span class="arithmatex">\(L[s]\)</span> minimo (indice minimo)
    <span class="arithmatex">\(mach[j] \leftarrow s\)</span>
    <span class="arithmatex">\(L[s] \leftarrow L[s] + t[j]\)</span> <span class="pc-com">▹ <span class="arithmatex">\(k\)</span>-esimo lavoro della lista macchina meno carica assegnare il lavoro <span class="arithmatex">\(j\)</span> alla macchina <span class="arithmatex">\(s\)</span></span></div><div class="pc" style="--liv:1"><span class="pc-n">8</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">9</span><strong>return</strong> <span class="arithmatex">\(mach\)</span>, <span class="arithmatex">\(C_{\max}=\max_h L[h]\)</span></div></div>

- $LIST$ è lo stesso algoritmo delle note sulle euristiche costruttive, dove è introdotto come regola greedy. Qui ci interessa il suo caso peggiore: quanto può essere cattiva una lista?

- Ogni macchina esegue i suoi lavori senza tempi morti, quindi il lavoro $j$ assegnato all'iterazione $k$ <strong>inizia</strong> all'istante $S_j$, pari al carico della sua macchina subito prima dell'assegnamento, e termina in $S_j+t_j$.

<a id="box-1-ex-list"></a>

!!! esempio "Esempio 40.1: $LIST$ sull'istanza di riferimento, prima i lavori più brevi"

    Consideriamo la lista $\lambda=(7,6,5,4,3,2,1)$. I carichi prima di ogni assegnamento e la macchina scelta sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>lavoro <span class="arithmatex">\(j\)</span></th>
    <th><span class="arithmatex">\(t_j\)</span></th>
    <th>carichi <span class="arithmatex">\((L_1,L_2,L_3)\)</span> prima</th>
    <th>macchina</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(7\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\((0,0,0)\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\((3,0,0)\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\((3,3,0)\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\((3,3,3)\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td><span class="arithmatex">\((7,3,3)\)</span></td>
    <td><span class="arithmatex">\(2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\((7,7,3)\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td><span class="arithmatex">\(5\)</span></td>
    <td><span class="arithmatex">\((7,7,8)\)</span></td>
    <td><span class="arithmatex">\(1\)</span></td>
    </tr>
    </table></div>

    I carichi finali sono $(12,7,8)$, con $J_1=\{7,4,1\}$, $J_2=\{6,3\}$, $J_3=\{5,2\}$, e $LIST(I)=12$:

    ![Figura 1](../img/pcmax-approximation/fig01.svg){ .fig loading=lazy  }

    L'ultimo lavoro, il lavoro $1$, inizia in $S_1=7$, il carico minimo in quel momento: tutte le macchine sono occupate almeno fino all'istante $7$. È l'osservazione su cui si costruisce la garanzia di $LIST$.

### 40.2.2 Longest processing time first { #sez-sec-LPT }

!!! chiave ""

    Il <em>Longest Processing Time first Algorithm</em> (indicato con $LPT$) è un'euristica costruttiva per $P\,||\,C_{\max}$. Ordina i lavori per tempo di esecuzione non crescente e applica $LIST$ a questa lista: ogni lavoro, dal più lungo al più breve, viene assegnato a una macchina meno carica.

!!! algoritmo "Algoritmo: Longest Processing Time first"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> istanza di <span class="arithmatex">\(P\,||\,C_{\max}\)</span> con <span class="arithmatex">\(n\)</span> lavori, tempi <span class="arithmatex">\(t[1..n]\)</span>, <span class="arithmatex">\(m\)</span> macchine</div><div class="pc" style="--liv:0"><strong>Output:</strong> assegnamento lavori-macchine <span class="arithmatex">\(mach[1..n]\)</span> e makespan <span class="arithmatex">\(C_{\max}\)</span></div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> LPT(<span class="arithmatex">\(n, m, t\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(\lambda :=\)</span> i lavori ordinati per <span class="arithmatex">\(t[j]\)</span> non crescente (pareggi per indice) <span class="pc-com">▹ prima i lavori più lunghi</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>return</strong> ListScheduling(<span class="arithmatex">\(n, m, t, \lambda\)</span>)</div></div>

- Nelle dimostrazioni conviene rinumerare i lavori nell'ordine di $\lambda$, così che $t_1\ge t_2\ge\dots\ge t_n$ e $LPT$ assegna i lavori nell'ordine $1,2,\dots,n$.

<a id="box-2-ex-lpt"></a>

!!! esempio "Esempio 40.2: $LPT$ sull'istanza di riferimento"

    I lavori sono già ordinati, $\lambda=(1,2,3,4,5,6,7)$. I lavori $1$, $2$, $3$ vanno sulle tre macchine vuote, con carichi $(5,5,4)$; il lavoro $4$ va sulla macchina $3$, la meno carica: $(5,5,8)$; il lavoro $5$ va sulla macchina $1$: $(8,5,8)$; il lavoro $6$ sulla macchina $2$: $(8,8,8)$; il lavoro $7$ trova tre macchine di carico $8$ e va sulla macchina $1$: $(11,8,8)$. Quindi $J_1=\{1,5,7\}$, $J_2=\{2,6\}$, $J_3=\{3,4\}$ e $LPT(I)=11$:

    ![Figura 2](../img/pcmax-approximation/fig02.svg){ .fig loading=lazy  }

    Con $z(I)=9$, il rapporto è $\frac{11}{9}$: l'ordinamento migliora il makespan da $12$ a $11$, ma l'ultimo lavoro, per quanto breve, sbilancia tre macchine perfettamente bilanciate.

## 40.3 Una proprietà del list scheduling

- Le garanzie della prossima sezione confrontano il valore di una soluzione euristica con il lower bound $\eqref{eq:pcmaxlb}$ su $z(I)$. Oltre al bound, usano una proprietà degli schedule costruiti da $LIST$: il lavoro che termina per ultimo non può iniziare troppo tardi.

<a id="box-3-obs-start"></a>

!!! teorema "Osservazione 40.1"

    Sia $\ell$ un lavoro che termina per ultimo in uno schedule costruito da $LIST$ (con una lista qualsiasi). Allora il suo istante di inizio soddisfa

    $$
    S_\ell \;\le\; \frac{1}{m}\sum_{j\in\mathscr{J}\setminus\{\ell\}} t_j .
    $$

??? dimostrazione "Dimostrazione"

    Quando $\ell$ viene assegnato, $S_\ell$ è il minimo degli $m$ carichi, quindi non supera la loro media. I carichi in quel momento contengono solo lavori assegnati prima di $\ell$, quindi la loro somma è al più $\sum_{j\neq\ell}t_j$, e $S_\ell\le\frac1m\sum_{j\neq\ell}t_j$. <span class="qed">□</span>

## 40.4 Garanzie di prestazione

### 40.4.1 Il rapporto di prestazione nel caso peggiore di LIST

<a id="box-4-prop-LIST"></a>

!!! teorema "Proposizione 40.2"

    Per $P\,||\,C_{\max}$, per ogni istanza $I$ e ogni lista $\lambda$,

    $$
    \frac{LIST(I)}{z(I)} \;\le\; 2-\frac{1}{m} .
    $$

??? dimostrazione "Dimostrazione"

    Sia $\ell$ un lavoro che termina per ultimo, così che $LIST(I)=S_\ell+t_\ell$. Per l'[Osservazione 40.1](#box-3-obs-start),

    $$
    LIST(I) \;\le\; \frac{1}{m}\sum_{j\neq\ell} t_j + t_\ell
    \;=\; \underbrace{\frac{1}{m}\sum_{j\in\mathscr{J}} t_j}_{\le\, z(I)} + \Big(1-\frac1m\Big)\underbrace{t_\ell}_{\le\, z(I)}
    \;\le\; \Big(2-\frac1m\Big)\,z(I),
    $$

    dove entrambi i bound vengono dalla $\eqref{eq:pcmaxlb}$. Dividendo per $z(I)$ si ottiene la tesi. <span class="qed">□</span>

<a id="box-5-prop-LISTtight"></a>

!!! teorema "Proposizione 40.3"

    Per ogni $m\ge 2$ esistono, per $P\,||\,C_{\max}$, un'istanza $I_m$ con $m$ macchine e una lista $\lambda$ tali che

    $$
    \frac{LIST(I_m)}{z(I_m)} \;=\; 2-\frac{1}{m} .
    $$

??? dimostrazione "Dimostrazione"

    $I_m$ ha $n=m(m-1)+1$ lavori: i lavori $1,\dots,m(m-1)$ con $t_j=1$ e il lavoro $n$ con $t_n=m$; la lista è $\lambda=(1,2,\dots,n)$. Abbiamo $n>m$ per $m\ge2$.

    I lavori unitari vengono assegnati a turni di $m$: in ogni turno tutte le macchine hanno lo stesso carico, i lavori vanno sulle macchine $1,2,\dots,m$ in quest'ordine e ogni carico cresce di $1$. Dopo gli $m-1$ turni tutti i carichi valgono $m-1$, e il lavoro $n$ inizia in $m-1$ sulla macchina $1$:

    $$
    LIST(I_m)=(m-1)+m=2m-1 .
    $$

    Mettendo il lavoro $n$ da solo sulla macchina $1$ e gli $m(m-1)$ lavori unitari, $m$ per macchina, sulle macchine $2,\dots,m$ si ottiene makespan $m$, e la $\eqref{eq:pcmaxlb}$ dà $z(I_m)\ge t_n=m$. Quindi $z(I_m)=m$ e

    $$
    \frac{LIST(I_m)}{z(I_m)}=\frac{2m-1}{m}=2-\frac1m .
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

!!! chiave ""

    Dalla [Proposizione 40.2](#box-4-prop-LIST) e dalla [Proposizione 40.3](#box-5-prop-LISTtight) segue che $LIST$ è un algoritmo di $\left(2-\frac1m\right)$-approssimazione, qualunque sia la lista, e che il rapporto di prestazione nel caso peggiore di $LIST$ su $m$ macchine è

    $$
    r(LIST)=2-\frac{1}{m}
    $$

- Per $m=3$ la famiglia ha $t=(1,1,1,1,1,1,3)$, $LIST(I_3)=5$ e $z(I_3)=3$. Il lavoro critico è quello lungo, messo per ultimo: $LPT$ lo metterebbe per primo e troverebbe l'ottimo.

- Nell'[Esempio 40.1](#box-1-ex-list), $LIST(I)=12\le\frac53\cdot9=15$.

- Il bound e la famiglia sono dovuti a Graham (1966).

### 40.4.2 Il rapporto di prestazione nel caso peggiore di LPT

<a id="box-6-prop-LPT"></a>

!!! teorema "Proposizione 40.4"

    Per $P\,||\,C_{\max}$, per ogni istanza $I$,

    $$
    \frac{LPT(I)}{z(I)} \;\le\; \frac{4}{3}-\frac{1}{3m} .
    $$

??? dimostrazione "Dimostrazione"

    Numeriamo i lavori in modo che $t_1\ge t_2\ge\dots\ge t_n$, l'ordine in cui $LPT$ li assegna, e sia $\ell$ un lavoro che termina per ultimo, così che $LPT(I)=S_\ell+t_\ell$. I lavori dopo $\ell$ non hanno alcun ruolo: sia $I'$ l'istanza con i soli lavori $1,\dots,\ell$. $LPT$ li assegna su $I'$ esattamente come su $I$, quindi $LPT(I')=LPT(I)$, e $z(I')\le z(I)$ poiché uno schedule di $I$ ristretto ai lavori di $I'$ è uno schedule di $I'$. Basta quindi dimostrare $LPT(I')\le\left(\frac43-\frac1{3m}\right)z(I')$. In $I'$ il lavoro $\ell$ è il più breve. Distinguiamo due casi.

    <strong>Caso 1: $t_\ell\le\frac{z(I')}{3}$.</strong> Come nella dimostrazione della [Proposizione 40.2](#box-4-prop-LIST), con l'[Osservazione 40.1](#box-3-obs-start) applicata a $I'$,

    $$
    LPT(I') \;\le\; \frac1m\sum_{j=1}^{\ell} t_j + \Big(1-\frac1m\Big)t_\ell
    \;\le\; z(I') + \Big(1-\frac1m\Big)\frac{z(I')}{3}
    \;=\; \Big(\frac43-\frac1{3m}\Big)\,z(I').
    $$

    <strong>Caso 2: $t_\ell>\frac{z(I')}{3}$.</strong> Ogni lavoro di $I'$ è più lungo di $\frac{z(I')}{3}$, quindi in uno schedule ottimo di $I'$ nessuna macchina ha tre lavori, e $\ell\le 2m$. Se $\ell\le m$, il lavoro $\ell$ inizia su una macchina vuota e $LPT(I')=t_\ell\le z(I')$. Altrimenti $\ell=m+r$ con $1\le r\le m$; poniamo $k:=m-r+1$, così che $1\le k\le m$. Mostriamo che $z(I')\ge t_k+t_\ell\ge LPT(I')$.

    <em>Lower bound.</em> Consideriamo uno schedule ottimo di $I'$. Se due dei lavori $1,\dots,k$ condividono una macchina, il suo carico è almeno $2t_k\ge t_k+t_\ell$. Altrimenti stanno su $k$ macchine diverse; le altre $m-k=r-1$ macchine ricevono al più $2(r-1)$ lavori, mentre i lavori $k+1,\dots,\ell$ sono $\ell-k=2r-1$. Quindi uno di essi condivide una macchina con uno dei lavori $1,\dots,k$, e quel carico è almeno $t_k+t_\ell$. In entrambi i casi $z(I')\ge t_k+t_\ell$.

    <em>Upper bound.</em> I primi $m$ lavori vanno su $m$ macchine diverse, poiché una macchina vuota ha carico $0$ e ogni lavoro ha durata positiva. Prima del lavoro $\ell$, le $m$ macchine contengono $\ell-1=m+r-1$ lavori, almeno uno per macchina, quindi al più $r-1$ macchine contengono due o più lavori e almeno $m-r+1=k$ macchine contengono esattamente un lavoro, uno dei lavori $1,\dots,m$. Sono $k$ lavori diversi fra $1,\dots,m$, quindi il massimo indice fra di essi è almeno $k$, e la sua durata è al più $t_k$. Quindi il carico minimo prima del lavoro $\ell$ è $S_\ell\le t_k$, e $LPT(I')=S_\ell+t_\ell\le t_k+t_\ell$.

    Pertanto nel Caso 2 vale $LPT(I')\le z(I')$, risultato ancora migliore della tesi. <span class="qed">□</span>

<a id="box-7-prop-LPTtight"></a>

!!! teorema "Proposizione 40.5"

    Per ogni $m\ge 2$ esiste, per $P\,||\,C_{\max}$, un'istanza $I_m$ con $m$ macchine tale che

    $$
    \frac{LPT(I_m)}{z(I_m)} \;=\; \frac{4}{3}-\frac{1}{3m} .
    $$

??? dimostrazione "Dimostrazione"

    $I_m$ ha $n=2m+1$ lavori, già ordinati: due lavori per ciascuna durata $2m-1,2m-2,\dots,m+1$, e tre lavori di durata $m$,

    $$
    t=(2m-1,\,2m-1,\,2m-2,\,2m-2,\,\dots,\,m+1,\,m+1,\,m,\,m,\,m).
    $$

    Per $j\le 2m$ la durata è $t_j=2m-\lceil j/2\rceil$, e $t_{2m+1}=m$.

    <em>Ottimo.</em> La durata totale è $2\sum_{v=m+1}^{2m-1}v+3m=3m^2$, quindi la $\eqref{eq:pcmaxlb}$ dà $z(I_m)\ge 3m$. Lo schedule che accoppia un lavoro di durata $v$ con un lavoro di durata $3m-v$, per $v=m+1,\dots,2m-1$ (entrambe le durate stanno in $\{m+1,\dots,2m-1\}$, e ogni durata si usa due volte), riempie $m-1$ macchine con carico $3m$, e mette i tre lavori di durata $m$ sull'ultima macchina, di nuovo con carico $3m$. Quindi $z(I_m)=3m$.

    <em>$LPT$.</em> I lavori $1,\dots,m$ vanno sulle macchine $1,\dots,m$. Poi il lavoro $m+1$ va su una macchina con il lavoro singolo più breve, $t_m$, e il suo carico diventa $t_m+t_{m+1}$. In generale, affermiamo che il lavoro $m+q$, per $q=1,\dots,m$, va su una macchina il cui unico lavoro ha durata $t_{m+1-q}$, e il carico diventa

    $$
    t_{m+1-q}+t_{m+q}=3m-1 .
    $$

    <em>L'identità.</em> Con $j=m+1-q$, così che $2m+1-j=m+q$: se $j=2i-1$ è dispari allora $\lceil j/2\rceil=i$ e $\lceil (2m+1-j)/2\rceil=m-i+1$, e se $j=2i$ è pari le due parti intere superiori sono ancora $i$ e $m-i+1$. In entrambi i casi $t_j+t_{2m+1-j}=(2m-i)+(m+i-1)=3m-1$.

    <em>L'affermazione.</em> Segue per induzione. Una macchina con due lavori ha carico $3m-1>2m-1\ge$ ogni lavoro singolo, quindi non è mai la meno carica finché restano macchine con un solo lavoro. Fra le macchine con un solo lavoro, la meno carica contiene il lavoro rimanente più breve, di durata $t_{m+1-q}$ (a parità di durata i carichi sono uguali).

    Dopo $2m$ lavori tutti i carichi valgono $3m-1$, e l'ultimo lavoro, di durata $m$, dà

    $$
    LPT(I_m)=3m-1+m=4m-1, \qquad \frac{LPT(I_m)}{z(I_m)}=\frac{4m-1}{3m}=\frac43-\frac1{3m}.
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

!!! chiave ""

    Dalla [Proposizione 40.4](#box-6-prop-LPT) e dalla [Proposizione 40.5](#box-7-prop-LPTtight) segue che $LPT$ è un algoritmo di $\left(\frac43-\frac1{3m}\right)$-approssimazione, e che il suo rapporto di prestazione nel caso peggiore su $m$ macchine è

    $$
    r(LPT)=\frac{4}{3}-\frac{1}{3m}
    $$

    Ordinare la lista abbassa la garanzia di $LIST$ da $2-\frac1m$ a $\frac43-\frac1{3m}$.

- Per $m=3$ la famiglia è $t=(5,5,4,4,3,3,3)$, l'istanza di riferimento: i carichi dopo sei lavori sono $(8,8,8)=3m-1$, il settimo lavoro dà $LPT(I)=11=4m-1$, e $z(I)=9=3m$ ([Esempio 40.2](#box-2-ex-lpt)). L'istanza di riferimento è un caso peggiore per $LPT$: $\frac{11}{9}=\frac43-\frac19$.

- Sulle istanze tight l'ultimo lavoro ha $t_\ell=m=\frac{z(I_m)}{3}$: stanno esattamente sul confine fra i due casi della dimostrazione, e ogni disuguaglianza del Caso 1 vale all'uguaglianza.

- Il bound e la famiglia sono dovuti a Graham (1969).

## 40.5 Fonti

- R.L. Graham, Bounds for certain multiprocessing anomalies, <em>Bell System Technical Journal</em> 45(9):1563–1581, 1966.

- R.L. Graham, Bounds on multiprocessing timing anomalies, <em>SIAM Journal on Applied Mathematics</em> 17(2):416–429, 1969.

## 40.6 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Usare la garanzia di $LPT$ per una lista non ordinata.</strong> $LIST$ ha la garanzia $2-\frac{1}{m}$ per ogni lista; la garanzia migliore $\frac{4}{3}-\frac{1}{3m}$ richiede i lavori ordinati per tempo di esecuzione non crescente.

    - <strong>Calcolare il rapporto con il lower bound.</strong> Il bound $\eqref{eq:pcmaxlb}$ può essere minore di $z(I)$: il rapporto $\mathscr{A}(I)/\LB$ è solo un upper bound sul rapporto di prestazione $\mathscr{A}(I)/z(I)$, e i due coincidono solo quando il bound è tight.

    - <strong>Risolvere i pareggi con un'altra regola.</strong> $LIST$ assegna ogni lavoro a una macchina meno carica di indice minimo; un'altra regola per i pareggi può dare uno schedule diverso, e le soluzioni degli esercizi seguono la regola dell'algoritmo List Scheduling.

## 40.7 In sintesi

!!! chiave "In sintesi"

    - Le garanzie di $LIST$ e $LPT$ si dimostrano con il bound sui carichi $\eqref{eq:pcmaxlb}$ su $z(I)$ e con l'[Osservazione 40.1](#box-3-obs-start): il lavoro che termina per ultimo inizia non più tardi del carico medio degli altri lavori.

    - Entrambi i rapporti sono tight, con le famiglie di istanze di Graham; per $m=3$ l'istanza di riferimento è l'istanza tight di $LPT$.

    - Ordinare la lista abbassa la garanzia da $2-\frac1m$ a $\frac43-\frac1{3m}$.

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>problema</th>
    <th>algoritmo</th>
    <th>rapporto nel caso peggiore</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(P\,||\,C_{\max}\)</span></td>
    <td><span class="arithmatex">\(LIST\)</span></td>
    <td><span class="arithmatex">\(2-\frac1m\)</span> (tight)</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(P\,||\,C_{\max}\)</span></td>
    <td><span class="arithmatex">\(LPT\)</span></td>
    <td><span class="arithmatex">\(\frac43-\frac1{3m}\)</span> (tight)</td>
    </tr>
    </table></div>

    <strong>Quadro riassuntivo dell'istanza di riferimento.</strong> I bound su $z(I)$ trovati finora:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Istanza</th>
    <th>Lower bound</th>
    <th>Valori euristici</th>
    <th>Valore ottimo</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(P\,||\,C_{\max}\)</span>, <span class="arithmatex">\(m=3\)</span>, <span class="arithmatex">\(t=(5,5,4,4,3,3,3)\)</span></td>
    <td><span class="arithmatex">\(9\)</span>, bound sui carichi</td>
    <td><span class="arithmatex">\(LIST\)</span> <span class="arithmatex">\(12\)</span> (lista <span class="arithmatex">\(7,6,\dots,1\)</span>), <span class="arithmatex">\(LPT\)</span> <span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(9\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Macchine parallele identiche (P||Cmax)](../esercizi/pcmax-approximation.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Istanze tight](../laboratorio/istanze-tight.md#voce=lpt).