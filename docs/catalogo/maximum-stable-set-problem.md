---
title: "Problema dell'insieme stabile massimo (MSSP)"
---

# Problema dell'insieme stabile massimo (MSSP)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi di cricca](clique-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-maximum-stable-set-problem"></a>

<a id="box-1-def-catdef-mssp"></a>

!!! definizione "Definizione 1: Problema dell'insieme stabile massimo"

    Sia $G=(V,E)$ un grafo.

    1. Un <strong>insieme stabile</strong> (detto anche <strong>insieme indipendente</strong>) è un sottoinsieme $Q \subseteq V$ di vertici a due a due non adiacenti: $\{u,v\} \notin E$ per ogni $u,v \in Q$ con $u \neq v$.

    2. Il <strong>problema dell'insieme stabile massimo</strong> (MSSP) chiede di trovare un insieme stabile di $G$ il cui numero di vertici sia massimo. Il suo valore ottimo è il <strong>numero di stabilità</strong> $\alpha(G)$.

<strong>Ipotesi</strong>

- Consideriamo istanze non banali: il grafo ha almeno un lato e almeno un non-lato. Formalmente:

    $$
    1 \le m < \binom{n}{2}.
    $$

- L'ipotesi si può fare senza perdita di generalità: se il grafo non ha lati, ogni singolo vertice è una clique massima e $\omega(G)=1$; se il grafo è completo, $V$ stesso è una clique e $\omega(G)=n$.

## Che cosa fa il corso su questo problema { #sez-sec-cat-mssp-vert }

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Tecnica</strong></th>
<th><strong>Dove</strong></th>
</tr>
<tr>
<td><strong>Definizione</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/clique/il-problema-della-clique-massima/#box-3-mcpP-def-MSSP">Cap. 5 «Problemi di clique»</a></td>
</tr>
<tr>
<td><strong>Formulazioni</strong></td>
<td><a href="../../formulazioni/clique-formulations/un-modello-pli-per-il-problema-della-clique-massima-la-formu/#sez-sec-mcpf-MSSP">Cap. 12 «Formulazioni dei problemi di clique»</a></td>
</tr>
<tr>
<td><strong>Limiti dell'approssimazione</strong></td>
<td><a href="../../algoritmi-di-approssimazione/clique-inapproximability/#box-7-cli-cormssp">Cap. 38 «Clique massima: limiti dell'approssimazione»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/coloring/#esercizio-4-3">Esercizio 4.3</a>; <a href="../../esercizi/clique/">Cap. 5 (2 esercizi)</a>; <a href="../../esercizi/clique-formulations/#esercizio-12-6">Esercizio 12.6</a>; <a href="../../esercizi/clique-inapproximability/">Cap. 38 (2 esercizi)</a></td>
</tr>
</table></div>
