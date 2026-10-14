---
title: "Problema della clique massima (MCP)"
---

# Problema della clique massima (MCP)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi di clique](clique-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-maximum-clique-problem"></a>

<a id="box-1-def-catdef-mcp"></a>

!!! definizione "Definizione 1: Problema della clique massima"

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

    il <strong>problema della clique massima</strong> (MCP) chiede di trovare una clique $K \subseteq V$ di $G$ il cui numero di vertici sia massimo. Il suo valore ottimo è il numero di clique $\omega(G)$.

<strong>Ipotesi</strong>

- Consideriamo istanze non banali: il grafo ha almeno un lato e almeno un non-lato. Formalmente:

    $$
    1 \le m < \binom{n}{2}.
    $$

- L'ipotesi si può fare senza perdita di generalità: se il grafo non ha lati, ogni singolo vertice è una clique massima e $\omega(G)=1$; se il grafo è completo, $V$ stesso è una clique e $\omega(G)=n$.

## Che cosa fa il corso su questo problema { #sez-sec-cat-mcp-vert }

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Tecnica</strong></th>
<th><strong>Dove</strong></th>
</tr>
<tr>
<td><strong>Definizione</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/clique/il-problema-della-cricca-massima/#box-2-mcpP-def-MCP">Cap. 5 «Problemi di clique»</a></td>
</tr>
<tr>
<td><strong>Formulazioni</strong></td>
<td><a href="../../formulazioni/clique-formulations/un-modello-pli-per-il-problema-della-cricca-massima-la-formu/#sez-sec-mcpf-MCP">Cap. 12 «Formulazioni dei problemi di clique»</a></td>
</tr>
<tr>
<td><strong>Limiti dell'approssimazione</strong></td>
<td><a href="../../algoritmi-di-approssimazione/clique-inapproximability/">Cap. 38 «Clique massima: limiti dell'approssimazione»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/coloring/">Cap. 4 (2 esercizi)</a>; <a href="../../esercizi/clique/">Cap. 5 (5 esercizi)</a>; <a href="../../esercizi/clique-formulations/">Cap. 12 (5 esercizi)</a>; <a href="../../esercizi/clique-inapproximability/">Cap. 38 (4 esercizi)</a></td>
</tr>
<tr>
<td><strong>Istanze di riferimento</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/clique/il-problema-della-cricca-massima/#box-6-mcpP-ex1">Cap. 5</a> (<span class="arithmatex">\(z=3\)</span>)</td>
</tr>
</table></div>

### Proprietà { #sez-sec-cat-mcp-properties }

- NP-difficile: decidere se esiste una clique con $k$ vertici è uno dei $21$ problemi NP-completi di Karp ([Cap. 5](../problemi-di-ottimizzazione-combinatoria/clique/index.md)).

- Upper bound: grado $\Delta+1$, lati, conteggio dei gradi $k^{\max}$ e colorazione $\chi(G)$ ([Cap. 5](../problemi-di-ottimizzazione-combinatoria/clique/il-problema-della-cricca-massima.md#box-8-mcpP-obs-degree)).

- Una prima clique a mano: si parte da un vertice di grado massimo e si aggiungono vertici adiacenti a tutti quelli scelti ([Cap. 5](../problemi-di-ottimizzazione-combinatoria/clique/il-problema-della-cricca-massima.md#box-6-mcpP-ex1)).

### Formulazioni { #sez-sec-cat-mcp-formulations }

- Il modello $\ILP_{\MCP}$ ha una variabile binaria per vertice e un vincolo $x_u+x_v\le1$ per ogni coppia di vertici non adiacenti ([Cap. 12](../formulazioni/clique-formulations/un-modello-pli-per-il-problema-della-cricca-massima-la-formu.md#eq-mcpF-ILP)).

- $x_v=\frac12$ per tutti i vertici è ammissibile, quindi $z(\LP_{\MCP})\ge n/2$: il bound del rilassamento lineare può essere arbitrariamente debole ([Cap. 12](../formulazioni/clique-formulations/un-modello-pli-per-il-problema-della-cricca-massima-la-formu.md#box-7-mcpF-prop-gap)).

- Le disuguaglianze di clique sugli insiemi stabili di $G$ rafforzano il modello, e il duale del loro rilassamento è un rilassamento del VCP: $\omega(G)\le z(\LP^{\mathrm{CL}}_{\MCP})\le\chi(G)$ ([Cap. 12](../formulazioni/clique-formulations/un-modello-pli-per-il-problema-della-cricca-massima-la-formu.md#box-11-mcpF-prop-dual)).

### Approssimazione { #sez-sec-cat-mcp-approximation }

- Non approssimabile: per ogni $\varepsilon>0$ nessun algoritmo polinomiale garantisce un rapporto entro $n^{1-\varepsilon}$, a meno che $P=NP$ (Zuckerman) ([Cap. 38](../algoritmi-di-approssimazione/clique-inapproximability.md#box-4-cli-thmHZ)).

- Casi particolari: grafi planari e grafi di grado limitato, risolti in modo esatto per enumerazione ([Cap. 38](../algoritmi-di-approssimazione/clique-inapproximability.md#box-6-cli-propdeg)).
