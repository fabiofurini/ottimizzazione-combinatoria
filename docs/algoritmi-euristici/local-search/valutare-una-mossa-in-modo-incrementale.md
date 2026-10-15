---
title: "Valutare una mossa in modo incrementale"
---

# 31.6 Valutare una mossa in modo incrementale { #sez-sec-incremental }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 31** · [:material-book-open-variant: Capitolo 31: Ricerca locale](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-presentation: Slide (1/2)](../../pdf/slide-local-search-1.pdf) · [:material-presentation: Slide (2/2)](../../pdf/slide-local-search-2.pdf) · [:material-pencil: Esercizi: Ricerca locale](../../esercizi/local-search.md) · [:material-gesture-tap: App: TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md)

</div>

- Ogni iterazione di $LS$ valuta molti vicini, e la maggior parte del tempo di esecuzione si spende lì. Calcolare $f(y)$ <strong>da zero</strong> costa $O(n)$ per ciascuno dei quattro problemi: il profitto di una soluzione del KP, i carichi dei contenitori o delle macchine, la lunghezza di un giro sono somme di $n$ termini.

- Una mossa cambia solo poche componenti della soluzione. La <strong>valutazione incrementale</strong> calcola la <strong>variazione</strong> $\Delta=f(y)-f(x)$ dalle componenti che cambiano, conservando alcune informazioni sulla soluzione corrente (il suo profitto e il suo peso, i suoi carichi), senza ricalcolare $f(y)$.

<a id="box-4-prop-twoopt"></a>

!!! teorema "Proposizione 31.3"

    Sia $\sigma'$ il giro ottenuto da $\sigma$ con la mossa 2-opt di posizioni $i<j$, e siano $u_1=\sigma_i$, $v_1=\sigma_{i+1}$, $u_2=\sigma_j$, $v_2=\sigma_{j+1}$. Allora $L(\sigma')=L(\sigma)+\Delta$, con

    $$
    \Delta \;=\; d_{u_1u_2}+d_{v_1v_2}-d_{u_1v_1}-d_{u_2v_2}.
    $$

??? dimostrazione "Dimostrazione"

    I giri $\sigma$ e $\sigma'$ hanno gli stessi lati, tranne che $\sigma$ contiene $\{u_1,v_1\}$ e $\{u_2,v_2\}$ mentre $\sigma'$ contiene $\{u_1,u_2\}$ e $\{v_1,v_2\}$. Il cammino invertito $v_1,\dots,u_2$ usa gli stessi lati nel verso opposto, e la sua lunghezza non cambia perché le distanze sono simmetriche. <span class="qed">□</span>

!!! chiave ""

    La variazione di lunghezza di una mossa 2-opt si calcola in tempo $O(1)$:

    $$
    \Delta \;=\; \underbrace{d_{u_1u_2}+d_{v_1v_2}}_{\text{lati aggiunti}}\;-\;\underbrace{d_{u_1v_1}+d_{u_2v_2}}_{\text{lati tolti}}
    $$

    e la mossa è migliorante se e solo se $\Delta<0$.

- Per esempio, sul giro $(1,3,2,4,5)$ dell'istanza di riferimento, di lunghezza $25$, la mossa con posizioni $i=2$, $j=4$ toglie $\{3,2\}$ e $\{4,5\}$ e aggiunge $\{3,4\}$ e $\{2,5\}$: $\Delta=d_{34}+d_{25}-d_{32}-d_{45}=4+4-4-7=-3$. Il nuovo giro $(1,3,4,2,5)$ ha lunghezza $25-3=22$, come conferma il calcolo diretto: $2+4+3+4+9=22$.

- <strong>Perché conta.</strong> L'intorno 2-opt ha $\frac{n(n-3)}{2}$ mosse. Con la valutazione incrementale un'iterazione di best improvement costa $O(n^2)$; ricalcolare ogni giro da zero costerebbe $O(n^3)$. Per $n=1000$ città, un'iterazione valuta $498\,500$ mosse: circa $5\cdot 10^5$ operazioni invece di circa $5\cdot 10^8$. L'inversione del cammino, che costa $O(n)$, si esegue una sola volta per iterazione, per la mossa accettata.

- La stessa idea si applica agli altri intorni:

<div class="tabella" markdown="0"><table>
<tr>
<th>mossa</th>
<th>variazione della soluzione</th>
<th>tempo</th>
</tr>
<tr>
<td>KP, flip di <span class="arithmatex">\(j\)</span></td>
<td>profitto <span class="arithmatex">\(\pm p_j\)</span>, peso <span class="arithmatex">\(\pm w_j\)</span></td>
<td><span class="arithmatex">\(O(1)\)</span></td>
</tr>
<tr>
<td>KP, swap <span class="arithmatex">\(j\)</span> fuori, <span class="arithmatex">\(k\)</span> dentro</td>
<td>profitto <span class="arithmatex">\(+p_k-p_j\)</span>, peso <span class="arithmatex">\(+w_k-w_j\)</span></td>
<td><span class="arithmatex">\(O(1)\)</span></td>
</tr>
<tr>
<td>BPP, move di <span class="arithmatex">\(j\)</span> da <span class="arithmatex">\(a\)</span> a <span class="arithmatex">\(b\)</span></td>
<td><span class="arithmatex">\(L_a-w_j\)</span>, <span class="arithmatex">\(L_b+w_j\)</span>; il contenitore <span class="arithmatex">\(a\)</span> si svuota sse <span class="arithmatex">\(L_a=w_j\)</span></td>
<td><span class="arithmatex">\(O(1)\)</span></td>
</tr>
<tr>
<td>TSP, 2-opt</td>
<td><span class="arithmatex">\(d_{u_1u_2}+d_{v_1v_2}-d_{u_1v_1}-d_{u_2v_2}\)</span></td>
<td><span class="arithmatex">\(O(1)\)</span></td>
</tr>
<tr>
<td>TSP, Or-opt</td>
<td><span class="arithmatex">\(d_{pq}+d_{as_1}+d_{s_\ell b}-d_{ps_1}-d_{s_\ell q}-d_{ab}\)</span></td>
<td><span class="arithmatex">\(O(1)\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(P\,||\,C_{\max}\)</span>, move di <span class="arithmatex">\(j\)</span> da <span class="arithmatex">\(a\)</span> a <span class="arithmatex">\(h\)</span></td>
<td><span class="arithmatex">\(L_a-t_j\)</span>, <span class="arithmatex">\(L_h+t_j\)</span>; <span class="arithmatex">\(C_{\max}=\max\{L_a-t_j,\,L_h+t_j,\,\max_{q\ne a,h}L_q\}\)</span></td>
<td><span class="arithmatex">\(O(m)\)</span></td>
</tr>
</table></div>

- La formula di Or-opt si ottiene come per 2-opt: la mossa toglie i lati $\{p,s_1\}$, $\{s_\ell,q\}$, $\{a,b\}$ e aggiunge $\{p,q\}$, $\{a,s_1\}$, $\{s_\ell,b\}$, e il segmento mantiene il suo orientamento.

- Il costo di un'iterazione di $LS$ è la dimensione dell'intorno per il costo della valutazione di una mossa (più il costo di applicare la mossa accettata, che si paga una volta per iterazione):

<div class="tabella" markdown="0"><table>
<tr>
<th>problema</th>
<th>intorno</th>
<th>valutazione di una mossa</th>
<th>costo di un'iterazione</th>
</tr>
<tr>
<td>KP</td>
<td>flip</td>
<td><span class="arithmatex">\(O(1)\)</span></td>
<td><span class="arithmatex">\(O(n)\)</span></td>
</tr>
<tr>
<td>KP</td>
<td>swap</td>
<td><span class="arithmatex">\(O(1)\)</span></td>
<td><span class="arithmatex">\(O(n^2)\)</span></td>
</tr>
<tr>
<td>BPP</td>
<td>move</td>
<td><span class="arithmatex">\(O(1)\)</span></td>
<td><span class="arithmatex">\(O(n\cdot nb)\)</span></td>
</tr>
<tr>
<td>BPP</td>
<td>swap</td>
<td><span class="arithmatex">\(O(1)\)</span></td>
<td><span class="arithmatex">\(O(n^2)\)</span></td>
</tr>
<tr>
<td>TSP</td>
<td>2-opt, Or-opt</td>
<td><span class="arithmatex">\(O(1)\)</span></td>
<td><span class="arithmatex">\(O(n^2)\)</span></td>
</tr>
<tr>
<td>TSP</td>
<td>3-opt</td>
<td><span class="arithmatex">\(O(1)\)</span></td>
<td><span class="arithmatex">\(O(n^3)\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(P\,||\,C_{\max}\)</span></td>
<td>move</td>
<td><span class="arithmatex">\(O(m)\)</span></td>
<td><span class="arithmatex">\(O(nm^2)\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(P\,||\,C_{\max}\)</span></td>
<td>swap</td>
<td><span class="arithmatex">\(O(m)\)</span></td>
<td><span class="arithmatex">\(O(n^2m)\)</span></td>
</tr>
</table></div>

- La valutazione incrementale non cambia gli ottimi locali, né il percorso seguito dalla ricerca: cambia solo il tempo necessario a seguirlo. Per questo il progetto di una ricerca locale parte sempre da due domande: <em>quali mosse?</em> e <em>quanto velocemente si può valutare una mossa?</em>

---

**Avanti:** [31.7 TSP: 2-opt e Or-opt](tsp-2-opt-e-or-opt.md)
