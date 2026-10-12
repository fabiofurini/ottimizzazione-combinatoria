---
title: "Problema della colorazione dei vertici (VCP)"
---

# Problema della colorazione dei vertici (VCP)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi di colorazione](coloring-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-vertex-coloring-problem"></a>

<a id="box-1-def-catdef-vcp"></a>

!!! definizione "Definizione 1: Problema della colorazione dei vertici"

    Dato:

    1. un <em>grafo</em> semplice $G = (V,E)$, dove

        $$
        V = \{1,2,\dots,n\}
        $$

        è l'insieme degli $n$ <em>vertici</em> e

        $$
        E \subseteq \big\{\, \{u,v\} : u,v \in V,~ u \neq v \,\big\}
        $$

        è l'insieme degli $m$ <em>lati</em>,

    il <strong>problema della colorazione dei vertici</strong> (VCP) chiede di decidere come assegnare un colore a ogni vertice, in modo che due vertici adiacenti non abbiano lo stesso colore e il numero totale di colori usati sia minimo.

<strong>Ipotesi</strong>

- Facciamo le seguenti ipotesi:

    1. Il grafo non ha vertici isolati. Un vertice isolato può ricevere un qualunque colore usato dal resto del grafo; se il grafo non ha lati, il valore ottimo è uno. Formalmente:

        $$
        \deg(v) \ge 1, \qquad \forall\, v \in V.
        $$

    2. Nessun vertice ha l'intorno contenuto nell'intorno di un altro vertice. Formalmente:

        $$
        N(u) \not\subseteq N(v), \qquad \forall\, u,v \in V,~ u \neq v.
        $$

- La seconda ipotesi si può fare senza perdita di generalità, perché:

    1. se $N(u) \subseteq N(v)$, il vertice $u$ si può eliminare senza cambiare il numero cromatico: ogni colorazione di $G \setminus \{u\}$ si estende a $u$ con il colore di $v$;

    2. i vertici $u$ e $v$ non sono adiacenti: altrimenti $v \in N(u) \subseteq N(v)$, il che è impossibile in un grafo semplice, quindi $u$ e $v$ possono condividere un colore.

## Che cosa fa il corso su questo problema { #sez-sec-cat-vcp-vert }

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Tecnica</strong></th>
<th><strong>Dove</strong></th>
</tr>
<tr>
<td><strong>Definizione</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/coloring/il-problema-della-colorazione-dei-vertici/#box-3-defVCP">Cap. 4 «Problemi di colorazione»</a></td>
</tr>
<tr>
<td><strong>Formulazioni</strong></td>
<td><a href="../../formulazioni/coloring-formulations/">Cap. 11 «Formulazioni dei problemi di colorazione»</a></td>
</tr>
<tr>
<td><strong>Euristiche</strong></td>
<td><a href="../../algoritmi-euristici/constructive-heuristics/colorazione-dei-vertici-greedy-e-dsatur/#sez-sec-VCPgreedy">Cap. 30 «Euristiche costruttive»</a></td>
</tr>
<tr>
<td><strong>Limiti dell'approssimazione</strong></td>
<td><a href="../../algoritmi-di-approssimazione/coloring-inapproximability/">Cap. 37 «Colorazione dei vertici: limiti dell'approssimazione»</a></td>
</tr>
<tr>
<td><strong>Algoritmi ad hoc</strong></td>
<td><a href="../../algoritmi-specializzati/dsatur-branch-and-bound/">Cap. 42 «Colorazione dei vertici: il branch-and-bound DSATUR»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/coloring/">Cap. 4 (5 esercizi)</a>; <a href="../../esercizi/coloring-formulations/">Cap. 11 (5 esercizi)</a>; <a href="../../esercizi/constructive-heuristics/">Cap. 30 (3 esercizi)</a>; <a href="../../esercizi/coloring-inapproximability/">Cap. 37 (5 esercizi)</a>; <a href="../../esercizi/dsatur-branch-and-bound/">Cap. 42 (5 esercizi)</a></td>
</tr>
<tr>
<td><strong>Istanze di riferimento</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/coloring/il-problema-della-colorazione-dei-vertici/#box-5-ex-vcp2">Cap. 4</a> (<span class="arithmatex">\(z=3\)</span>)</td>
</tr>
</table></div>

### Proprietà { #sez-sec-cat-vcp-properties }

- NP-difficile in senso forte: decidere se $\chi(G)\le 3$ è NP-completo ([Cap. 1](../problemi-di-ottimizzazione-combinatoria/combinatorial-optimization/cenni-di-complessita-computazionale.md#box-12-def-pseudo)).

- Bound di cricca $\omega(G) \le \chi(G)$ e bound degli insiemi stabili $\lceil n/\alpha(G) \rceil \le \chi(G)$ ([Cap. 4](../problemi-di-ottimizzazione-combinatoria/coloring/il-problema-della-colorazione-dei-vertici.md#box-6-obs-clique-bound)).

- I bound possono non raggiungere $\chi(G)$: sul grafo di Petersen $\omega(G)=2<\chi(G)=3$ ([Cap. 4](../problemi-di-ottimizzazione-combinatoria/coloring/il-problema-della-colorazione-dei-vertici.md#box-7-obs-stable-bound)).

- Brooks: $\chi(G)\le\Delta$ per un grafo connesso che non è né completo né un ciclo dispari ([Cap. 4](../problemi-di-ottimizzazione-combinatoria/coloring/il-problema-della-colorazione-dei-vertici.md#43-osservazioni)).

### Formulazioni { #sez-sec-cat-vcp-formulations }

- Il modello $\ILP_{\VCP}$ ha $kn$ variabili $x_{vc}$ e $k$ variabili $y_c$, e $k!$ copie equivalenti di ogni colorazione ([Cap. 11](../formulazioni/coloring-formulations/un-modello-pli-per-il-problema-della-colorazione-dei-vertici.md#sez-sec-colf-VCP)).

- Entrambi i rilassamenti lineari valgono $2$ per ogni grafo con almeno un lato ([Cap. 11](../formulazioni/coloring-formulations/un-modello-pli-per-il-problema-della-colorazione-dei-vertici.md#box-10-cor_lp_vcp_value)).

- Sul grafo completo con $n$ vertici il gap è $n-2$ e il rapporto $\frac{2}{n}$ tende a $0$ ([Cap. 11](../formulazioni/coloring-formulations/un-modello-pli-per-il-problema-della-colorazione-dei-vertici.md#115-errori-tipici)).

### Euristiche { #sez-sec-cat-vcp-heuristics }

- La colorazione greedy usa al più $\Delta(G)+1$ colori, e l'ordine dei vertici conta ([Cap. 30](../algoritmi-euristici/constructive-heuristics/colorazione-dei-vertici-greedy-e-dsatur.md#sez-sec-VCPgreedy)).

- $DSATUR$ colora per primo il vertice che vede più colori; è esatto sui grafi bipartiti ([Cap. 30](../algoritmi-euristici/constructive-heuristics/colorazione-dei-vertici-greedy-e-dsatur.md#sez-sec-VCPgreedy)).

### Approssimazione { #sez-sec-cat-vcp-approximation }

- Non approssimabile: nessun algoritmo polinomiale garantisce un rapporto inferiore a $\frac43$, a meno che $P=NP$, e nemmeno $n^{1-\varepsilon}$ (Zuckerman) ([Cap. 37](../algoritmi-di-approssimazione/coloring-inapproximability.md#box-1-vci-thm43)).

- Casi particolari: grafi bipartiti e grafi di intervalli in modo esatto, grafi planari entro $2$ colori dall'ottimo ([Cap. 37](../algoritmi-di-approssimazione/coloring-inapproximability.md#box-9-vci-corPL)).

### Algoritmi ad hoc { #sez-sec-cat-vcp-adhocalgorithms }

- Il branch-and-bound DSATUR fa branching sul vertice più saturo, con un figlio per ogni colore ammissibile e uno per un colore nuovo, e pota un nodo quando $q(k)\ge\UB$ ([Cap. 42](../algoritmi-specializzati/dsatur-branch-and-bound.md#box-1-def-VCPnode)).

- Sul grafo di Petersen dimostra $\chi(G)=3$ con $6$ nodi ([Cap. 42](../algoritmi-specializzati/dsatur-branch-and-bound.md#box-3-ex-petersenBB)).
