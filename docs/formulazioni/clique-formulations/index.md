---
title: "Formulazioni dei problemi di clique"
---

# Formulazioni dei problemi di clique

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 12** · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-clique-formulations.pdf) · [:material-pencil: Esercizi: Problemi di clique](../../esercizi/clique-formulations.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, [Capitolo 5 «Problemi di clique»](../../problemi-di-ottimizzazione-combinatoria/clique/index.md): il problema, le sue ipotesi, clique, insiemi stabili, il grafo complementare e $\omega(G)=\alpha(\overline{G})$.

    - Da questo modulo, [Capitolo 4 «Problemi di colorazione»](../../problemi-di-ottimizzazione-combinatoria/coloring/index.md) e [Capitolo 11 «Formulazioni dei problemi di colorazione»](../coloring-formulations/index.md): il numero cromatico $\chi(G)$ e un modello PLI con i suoi rilassamenti lineari.

    - Dal modulo <em>Programmazione lineare intera</em>, [Capitolo 2 «Bound primali e duali»](https://fabiofurini.github.io/programmazione-lineare-intera/models-and-bounds/lp-relaxation/), [Capitolo 3 «Formulazioni ideali»](https://fabiofurini.github.io/programmazione-lineare-intera/formulations/ideal-formulations/) e [Capitolo 4 «Disuguaglianze valide»](https://fabiofurini.github.io/programmazione-lineare-intera/formulations/valid-inequalities/): rilassamenti lineari, formulazioni più forti e disuguaglianze valide.

    - Dal modulo <em>Programmazione lineare</em>, [Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/): il duale di un problema LP e la dualità debole.

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - scrivere la formulazione sugli spigoli del problema della clique massima sui non-spigoli di $G$, cioè sugli spigoli di $\overline{G}$;

    - spiegare perché il suo rilassamento lineare è debole: il punto $x_v=\tfrac{1}{2}$ è sempre ammissibile;

    - scrivere la formulazione a clique e confrontare i due bound LP su un grafo piccolo;

    - dimostrare $\omega(G)\le z(\mathrm{LP}^{\mathrm{CL}}_{\mathrm{MCP}})\le\chi(G)$ con la dualità LP e una formulazione di colorazione;

    - scrivere la formulazione sugli spigoli e la formulazione a clique del problema dell'insieme stabile massimo;

    - scrivere i modelli PLI dei problemi della clique massima pesata sui vertici e pesata sugli spigoli, linearizzando il prodotto $x_u\,x_v$ con le variabili $y_{uv}$.

## 12.1 Panoramica della famiglia

- I modelli PLI dei problemi di clique usano una <strong>variabile binaria di selezione</strong> $x_v$ per ogni vertice $v \in V$, pari a $1$ se il vertice è nella clique.

- Due vertici non adiacenti non possono essere selezionati entrambi: i <strong>vincoli di conflitto</strong> si scrivono sui non-spigoli di $G$, cioè sugli spigoli del grafo complementare $\overline{G}$, oppure sulle sue clique.

- La funzione obiettivo massimizza il numero di vertici selezionati o il loro peso totale; il problema pesato sugli spigoli aggiunge una variabile per spigolo.

!!! chiave ""

    I modelli di clique selezionano vertici con variabili binarie e vietano la selezione di due vertici non adiacenti. Gli stessi modelli, scritti sugli spigoli di $G$ invece che di $\overline{G}$, selezionano insiemi stabili.

- La tabella elenca i membri della famiglia, con il nome dei loro modelli PLI e le sezioni che li scrivono.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Modelli</strong></th>
<th><strong>Vincoli di conflitto</strong></th>
<th><strong>Sezione</strong></th>
</tr>
<tr>
<td>MCP</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{MCP}}\)</span> (formulazione sugli spigoli)</td>
<td>sui non-spigoli di <span class="arithmatex">\(G\)</span></td>
<td><a href="un-modello-pli-per-il-problema-della-clique-massima-la-formu/#sez-sec-mcpf-MCP">12.2</a></td>
</tr>
<tr>
<td>MCP</td>
<td><span class="arithmatex">\(\mathrm{ILP}^{\mathrm{CL}}_{\mathrm{MCP}}\)</span> (formulazione a clique)</td>
<td>sugli insiemi stabili massimali di <span class="arithmatex">\(G\)</span></td>
<td><a href="un-modello-pli-per-il-problema-della-clique-massima-la-formu/#sez-sec-mcpf-CL">12.5</a></td>
</tr>
<tr>
<td>MSSP</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{MSSP}}\)</span>, <span class="arithmatex">\(\mathrm{ILP}^{\mathrm{CL}}_{\mathrm{MSSP}}\)</span></td>
<td>sugli spigoli e sulle clique di <span class="arithmatex">\(G\)</span></td>
<td><a href="un-modello-pli-per-il-problema-della-clique-massima-la-formu/#sez-sec-mcpf-MSSP">12.7</a></td>
</tr>
<tr>
<td>VWMCP</td>
<td><span class="arithmatex">\(\mathrm{ILP}^{\mathrm{VW}}_{\mathrm{MCP}}\)</span></td>
<td>sui non-spigoli di <span class="arithmatex">\(G\)</span></td>
<td><a href="modelli-pli-per-le-varianti-pesate/#sez-sec-mcpf-weighted">12.8</a></td>
</tr>
<tr>
<td>EWMCP</td>
<td><span class="arithmatex">\(\mathrm{ILP}^{\mathrm{EW}}_{\mathrm{MCP}}\)</span></td>
<td>sui non-spigoli di <span class="arithmatex">\(G\)</span></td>
<td><a href="modelli-pli-per-le-varianti-pesate/#sez-sec-mcpf-weighted">12.8</a></td>
</tr>
</table></div>

<div class="grid cards sottopagine" markdown>

-   **Panoramica**

    Panoramica della famiglia

    [:octicons-arrow-right-24: Apri](#121-panoramica-della-famiglia)

-   **12.2 Un modello PLI per il problema della clique massima: la formulazione sugli spigoli**

    Un secondo rilassamento lineare · Disuguaglianze di clique: una formulazione più forte · La relazione con la colorazione dei vertici · Insiemi stabili sul grafo complementare

    [:octicons-arrow-right-24: Apri](un-modello-pli-per-il-problema-della-clique-massima-la-formu.md)

-   **12.8 Modelli PLI per le varianti pesate**

    Il problema della clique massima pesata sugli spigoli · Errori tipici · In sintesi

    [:octicons-arrow-right-24: Apri](modelli-pli-per-le-varianti-pesate.md)

</div>

---

**Avanti:** [12.2 Un modello PLI per il problema della clique massima: la formulazione sugli spigoli](un-modello-pli-per-il-problema-della-clique-massima-la-formu.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di clique](../../esercizi/clique-formulations.md)
