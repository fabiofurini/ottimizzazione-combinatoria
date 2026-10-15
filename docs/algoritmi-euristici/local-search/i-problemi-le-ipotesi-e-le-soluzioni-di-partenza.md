---
title: "I problemi, le ipotesi e le soluzioni di partenza"
---

# 31.2 I problemi, le ipotesi e le soluzioni di partenza { #sez-sec-problems }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 31** · [:material-book-open-variant: Capitolo 31: Ricerca locale](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-presentation: Slide (1/2)](../../pdf/slide-local-search-1.pdf) · [:material-presentation: Slide (2/2)](../../pdf/slide-local-search-2.pdf) · [:material-pencil: Esercizi: Ricerca locale](../../esercizi/local-search.md) · [:material-gesture-tap: App: TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md)

</div>

- Gli algoritmi sono illustrati sui quattro problemi del capitolo [«Algoritmi euristici: definizioni»](../heuristics.md): il [problema dello zaino 0/1 (KP)](../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-0-1.md), il [problema del bin packing (BPP)](../../problemi-di-ottimizzazione-combinatoria/bin-packing/il-problema-del-bin-packing.md), il [problema del commesso viaggiatore (TSP)](../../problemi-di-ottimizzazione-combinatoria/tsp/il-problema-del-commesso-viaggiatore.md) e [$P\,||\,C_{\max}$](../../problemi-di-ottimizzazione-combinatoria/pcmax/scheduling-su-macchine-parallele-identiche.md). Le loro definizioni e ipotesi sono nelle rispettive pagine; la tabella richiama la notazione.

<div class="tabella" markdown="0"><table>
<tr>
<th>problema</th>
<th>dati</th>
<th>soluzione</th>
<th>obiettivo</th>
</tr>
<tr>
<td>KP</td>
<td><span class="arithmatex">\(p_j\)</span>, <span class="arithmatex">\(w_j\)</span> (<span class="arithmatex">\(j\in\mathscr{I}\)</span>), capacità <span class="arithmatex">\(c\)</span></td>
<td>vettore binario <span class="arithmatex">\(x\)</span></td>
<td>max profitto</td>
</tr>
<tr>
<td>BPP</td>
<td><span class="arithmatex">\(w_j\)</span> (<span class="arithmatex">\(j\in\mathscr{I}\)</span>), capacità <span class="arithmatex">\(c\)</span></td>
<td>vettore <span class="arithmatex">\(bin\)</span>, schemi <span class="arithmatex">\(P_b\)</span></td>
<td>min numero di contenitori <span class="arithmatex">\(nb\)</span></td>
</tr>
<tr>
<td>TSP</td>
<td><span class="arithmatex">\(d_{ij}\)</span> (<span class="arithmatex">\(i,j\in\mathscr{V}\)</span>)</td>
<td>giro <span class="arithmatex">\(\sigma\)</span></td>
<td>min lunghezza <span class="arithmatex">\(L(\sigma)\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(P\,||\,C_{\max}\)</span></td>
<td><span class="arithmatex">\(t_j\)</span> (<span class="arithmatex">\(j\in\mathscr{J}\)</span>), <span class="arithmatex">\(m\)</span> macchine</td>
<td>vettore <span class="arithmatex">\(mach\)</span>, insiemi <span class="arithmatex">\(J_h\)</span></td>
<td>min makespan <span class="arithmatex">\(C_{\max}\)</span></td>
</tr>
</table></div>

- Per $P\,||\,C_{\max}$, $L_h=\sum_{j\in J_h} t_j$ è il <strong>carico</strong> della macchina $h$ e $C_{\max}=\max_h L_h$. Per il BPP, $L_b=\sum_{j\in P_b} w_j$ è il <strong>carico</strong> del contenitore $b$. Una macchina (o un contenitore) il cui carico è uguale al valore obiettivo si dice <strong>critica</strong> (o critico).

- Le <strong>istanze di riferimento</strong> sono quelle del capitolo [«Algoritmi euristici: definizioni»](../heuristics.md): il KP con $p=(10,7,6,4)$, $w=(5,4,3,3)$, $c=9$; il BPP con $w=(4,4,5,3,2,3)$, $c=7$; il TSP con $5$ città; $P\,||\,C_{\max}$ con $t=(5,5,4,4,3,3,3)$ e $m=3$. I loro valori ottimi sono $17$, $3$, $18$ e $9$.

## 31.2.1 Soluzioni di partenza

- Una ricerca locale ha bisogno di una <strong>soluzione di partenza</strong> ammissibile. Usiamo le soluzioni calcolate nel capitolo [«Euristiche costruttive»](../constructive-heuristics/index.md), richiamate qui sotto.

<div class="tabella" markdown="0"><table>
<tr>
<th>problema</th>
<th>algoritmo</th>
<th>soluzione di partenza</th>
<th>valore</th>
<th><span class="arithmatex">\(z(I)\)</span></th>
</tr>
<tr>
<td>KP</td>
<td><span class="arithmatex">\(GR\)</span> (greedy per efficienza)</td>
<td><span class="arithmatex">\(x=(1,0,1,0)\)</span>, oggetti <span class="arithmatex">\(\{1,3\}\)</span></td>
<td><span class="arithmatex">\(16\)</span></td>
<td><span class="arithmatex">\(17\)</span></td>
</tr>
<tr>
<td>KP</td>
<td>greedy per peso <span class="arithmatex">\(GR_w\)</span></td>
<td><span class="arithmatex">\(x=(0,0,1,1)\)</span>, oggetti <span class="arithmatex">\(\{3,4\}\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
<td><span class="arithmatex">\(17\)</span></td>
</tr>
<tr>
<td>BPP</td>
<td><span class="arithmatex">\(NF\)</span></td>
<td><span class="arithmatex">\(\{1\},\{2\},\{3\},\{4,5\},\{6\}\)</span></td>
<td><span class="arithmatex">\(5\)</span></td>
<td><span class="arithmatex">\(3\)</span></td>
</tr>
<tr>
<td>BPP</td>
<td><span class="arithmatex">\(FF\)</span></td>
<td><span class="arithmatex">\(\{1,4\},\{2,5\},\{3\},\{6\}\)</span></td>
<td><span class="arithmatex">\(4\)</span></td>
<td><span class="arithmatex">\(3\)</span></td>
</tr>
<tr>
<td>BPP</td>
<td><span class="arithmatex">\(FFD\)</span></td>
<td><span class="arithmatex">\(\{3,5\},\{1,4\},\{2,6\}\)</span></td>
<td><span class="arithmatex">\(3\)</span></td>
<td><span class="arithmatex">\(3\)</span></td>
</tr>
<tr>
<td>TSP</td>
<td><span class="arithmatex">\(NN\)</span> dalla città <span class="arithmatex">\(1\)</span></td>
<td><span class="arithmatex">\(\sigma=(1,3,2,4,5)\)</span></td>
<td><span class="arithmatex">\(25\)</span></td>
<td><span class="arithmatex">\(18\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(P\,||\,C_{\max}\)</span></td>
<td><span class="arithmatex">\(LPT\)</span></td>
<td><span class="arithmatex">\(J_1=\{1,5,7\}\)</span>, <span class="arithmatex">\(J_2=\{2,6\}\)</span>, <span class="arithmatex">\(J_3=\{3,4\}\)</span></td>
<td><span class="arithmatex">\(11\)</span></td>
<td><span class="arithmatex">\(9\)</span></td>
</tr>
</table></div>

- La soluzione di $FFD$ è già ottima, quindi nessuna ricerca locale può migliorarla: per il BPP partiamo dalle soluzioni di $NF$ e $FF$.

- Per studiare il comportamento di una ricerca locale su molte soluzioni di partenza usiamo anche <strong>soluzioni di partenza casuali</strong>. Sono generate con il generatore minimal standard di Park–Miller: dato un <strong>seme</strong> intero $s_0\in\{1,\dots,2^{31}-2\}$, il $k$-esimo numero pseudo-casuale è

!!! chiave ""

    $$
    s_k = 16807\cdot s_{k-1} \bmod (2^{31}-1),
    \qquad\qquad
    u_k = \frac{s_k}{2^{31}-1}\in(0,1),
    $$

    e un intero pseudo-casuale in $\{0,1,\dots,q-1\}$ è $\lfloor q\, u_k\rfloor$.

- La sequenza è interamente determinata dal seme: lo stesso seme dà le stesse soluzioni di partenza, nelle note, negli esercizi e nel codice. Un <strong>giro casuale</strong> tiene la città $1$ in prima posizione e rimescola le altre città (Fisher–Yates: per $k=n,n-1,\dots,3$, la città in posizione $k$ si scambia con la città in una posizione casuale fra $2,\dots,k$); un'<strong>assegnazione casuale</strong> dei lavori estrae la macchina dei lavori $1,2,\dots,n$ in quest'ordine; una <strong>soluzione casuale del BPP</strong> si calcola con $FF$ su un ordine casuale degli oggetti (Fisher–Yates su tutte le posizioni: per $k=n,n-1,\dots,2$, l'oggetto in posizione $k$ si scambia con l'oggetto in una posizione casuale fra $1,\dots,k$).

---

**Avanti:** [Ricerca locale: lo schema · Intorni per i quattro problemi](ricerca-locale-lo-schema.md)
