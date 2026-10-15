---
title: "Formulazioni dei problemi di colorazione"
---

# Formulazioni dei problemi di colorazione

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 11** · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-coloring-formulations.pdf) · [:material-pencil: Esercizi: Problemi di colorazione](../../esercizi/coloring-formulations.md)

</div>

!!! nota "Prerequisiti"

    - Dal modulo <em>Programmazione lineare</em>, [Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/): il duale di un problema LP, dualità debole e forte.

    - Dal modulo <em>Programmazione lineare intera</em>, [Capitolo 1 «Programmazione lineare intera»](https://fabiofurini.github.io/programmazione-lineare-intera/modelli-e-bound/ilp/) e [Capitolo 2 «Bound primali e duali»](https://fabiofurini.github.io/programmazione-lineare-intera/modelli-e-bound/lp-relaxation/): problemi PLI, rilassamenti lineari e bound.

    - Da questo modulo, [Capitolo 4 «Problemi di colorazione»](../../problemi-di-ottimizzazione-combinatoria/coloring/index.md): il problema, le sue ipotesi e la notazione sui grafi.

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - scrivere il modello PLI del problema della colorazione dei vertici e spiegare il ruolo delle variabili di attivazione $y_c$;

    - scrivere i due rilassamenti lineari e i loro duali, e calcolarne le soluzioni ottime;

    - dimostrare che il valore ottimo dei rilassamenti lineari è $2$ per ogni grafo con almeno uno spigolo;

    - spiegare perché questo bound è molto debole, e perché il modello non basta per colorare un grafo.

## 11.1 Panoramica della famiglia

- I modelli PLI dei problemi di colorazione usano un upper bound $k$ sul numero di colori e l'insieme $\mathscr{C} = \{1,2,\dots,k\}$ dei colori che si possono usare.

- Le <strong>variabili di assegnamento</strong> binarie $x_{vc}$ danno un colore $c \in \mathscr{C}$ a ogni vertice $v \in V$, e le <strong>variabili di attivazione</strong> binarie $y_c$ dicono se il colore $c$ è usato.

- Ogni spigolo e ogni colore danno un vincolo, che vieta lo stesso colore sui due estremi dello spigolo, e la funzione obiettivo minimizza il numero $\sum_{c \in \mathscr{C}} y_c$ di colori usati.

!!! chiave ""

    I modelli di colorazione sono <strong>modelli di assegnamento</strong>, come i modelli di packing: un vertice è assegnato a un colore come un oggetto è assegnato a un contenitore, e i vincoli sugli spigoli prendono il posto dei vincoli di capacità.

- La tabella elenca i membri della famiglia, con il nome del loro modello PLI e la sezione che lo scrive.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Modello</strong></th>
<th><strong>Variabili</strong></th>
<th><strong>Sezione</strong></th>
</tr>
<tr>
<td>VCP</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{VCP}}\)</span></td>
<td>binarie <span class="arithmatex">\(x_{vc}\)</span> e <span class="arithmatex">\(y_c\)</span></td>
<td><a href="un-modello-pli-per-il-problema-della-colorazione-dei-vertici/#sez-sec-colf-VCP">11.2</a></td>
</tr>
</table></div>

<div class="grid cards sottopagine" markdown>

-   **Panoramica**

    Panoramica della famiglia

    [:octicons-arrow-right-24: Apri](#111-panoramica-della-famiglia)

-   **11.2 Un modello PLI per il problema della colorazione dei vertici**

    Un secondo rilassamento lineare · Errori tipici · In sintesi

    [:octicons-arrow-right-24: Apri](un-modello-pli-per-il-problema-della-colorazione-dei-vertici.md)

</div>

---

**Avanti:** [11.2 Un modello PLI per il problema della colorazione dei vertici](un-modello-pli-per-il-problema-della-colorazione-dei-vertici.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di colorazione](../../esercizi/coloring-formulations.md)
