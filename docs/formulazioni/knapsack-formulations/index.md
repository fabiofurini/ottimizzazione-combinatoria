---
title: "Formulazioni dei problemi di zaino"
---

# Formulazioni dei problemi di zaino

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 9** · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-knapsack-formulations.pdf) · [:material-pencil: Esercizi: Problemi di zaino](../../esercizi/knapsack-formulations.md) · [:material-gesture-tap: App: Rilassamento continuo e upper bound per lo zaino 0/1](../../laboratorio/zaino-rilassamento-bound.md)

</div>

!!! nota "Prerequisiti"

    - Dal modulo <em>Programmazione lineare</em>, [Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/): il duale di un problema LP, dualità debole e forte.

    - Dal modulo <em>Programmazione lineare intera</em>, [Capitolo 1 «Programmazione lineare intera»](https://fabiofurini.github.io/programmazione-lineare-intera/models-and-bounds/ilp/) e [Capitolo 2 «Bound primali e duali»](https://fabiofurini.github.io/programmazione-lineare-intera/models-and-bounds/lp-relaxation/): problemi PLI, rilassamenti lineari e upper bound.

    - Da questo modulo, [Capitolo 2 «Problemi di zaino»](../../problemi-di-ottimizzazione-combinatoria/knapsack/index.md): il problema dello zaino 0/1 e le sue varianti, le loro ipotesi e le loro istanze di riferimento.

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - scrivere il modello PLI del problema dello zaino 0/1 e spiegare ciascuno dei suoi vincoli;

    - scrivere i modelli PLI del SSP, del BKP, dell'UKP, del MDKP, del MKP, del MCKP e del KPS, e scriverli su un'istanza numerica;

    - scrivere i due rilassamenti lineari e i loro duali, e calcolarne le soluzioni ottime con formule chiuse;

    - calcolare l'oggetto critico, la capacità residua e il valore $z(\mathrm{LP}_{\mathrm{KP}})$;

    - calcolare gli upper bound di Dantzig e di Martello-Toth, arrotondandoli correttamente;

    - spiegare perché $z(\mathrm{LP}_{\mathrm{KP}})$ non supera mai il doppio di $z(\mathrm{ILP}_{\mathrm{KP}})$.

## 9.1 Panoramica della famiglia

- I modelli PLI dei problemi di zaino usano una variabile $x_j$ per ogni oggetto $j \in \mathscr{I}$: una <strong>variabile binaria</strong> quando l'oggetto è selezionato o no, una <strong>variabile intera</strong> quando conta le copie selezionate dell'oggetto.

- Ogni capacità dà un <strong>vincolo di zaino</strong> sul peso totale degli oggetti selezionati, e la funzione obiettivo ne massimizza il profitto totale.

- I membri della famiglia aggiungono un indice alle variabili (lo zaino $k$ dell'oggetto $j$ nel MKP), alcuni vincoli sulle classi di oggetti (MCKP, KPS) o variabili binarie di setup $y_h$ (KPS).

!!! chiave ""

    Lo schema comune dei modelli di zaino è

    $$
    \max \Big\{ \sum_{j \in \mathscr{I}} p_j \, x_j \;:\; \sum_{j \in \mathscr{I}} w_j \, x_j \le c,~~ x_j \in D_j~~ \forall j \in \mathscr{I} \Big\},
    $$

    dove il dominio $D_j$ è $\{0,1\}$, $\{0,1,\dots,b_j\}$ o $\Z_{\ge 0}$. I membri della famiglia cambiano i domini e aggiungono capacità, zaini o classi.

- La tabella elenca i membri della famiglia, con il nome del loro modello PLI e la sezione che lo scrive.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Modello</strong></th>
<th><strong>Variabili</strong></th>
<th><strong>Sezione</strong></th>
</tr>
<tr>
<td>KP</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{KP}}\)</span></td>
<td>binarie <span class="arithmatex">\(x_j\)</span></td>
<td><a href="un-modello-pli-per-il-problema-dello-zaino-0-1/#sez-sec-kpf-KP">9.2</a></td>
</tr>
<tr>
<td>SSP</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{SSP}}\)</span></td>
<td>binarie <span class="arithmatex">\(x_j\)</span></td>
<td><a href="un-modello-pli-per-il-problema-del-subset-sum/#sez-sec-kpf-SSP">9.6</a></td>
</tr>
<tr>
<td>BKP</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{BKP}}\)</span></td>
<td>intere <span class="arithmatex">\(x_j \in \{0,1,\dots,b_j\}\)</span></td>
<td><a href="un-modello-pli-per-il-problema-dello-zaino-limitato/#sez-sec-kpf-BKP">9.7</a></td>
</tr>
<tr>
<td>UKP</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{UKP}}\)</span></td>
<td>intere <span class="arithmatex">\(x_j \in \Z_{\ge 0}\)</span></td>
<td><a href="un-modello-pli-per-il-problema-dello-zaino-illimitato/#sez-sec-kpf-UKP">9.8</a></td>
</tr>
<tr>
<td>MDKP</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{MDKP}}\)</span></td>
<td>binarie <span class="arithmatex">\(x_j\)</span>, un vincolo per capacità</td>
<td><a href="un-modello-pli-per-il-problema-dello-zaino-multidimensionale/#sez-sec-kpf-MDKP">9.9</a></td>
</tr>
<tr>
<td>MKP</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{MKP}}\)</span></td>
<td>binarie <span class="arithmatex">\(x_{jk}\)</span>, oggetto <span class="arithmatex">\(j\)</span> nello zaino <span class="arithmatex">\(k\)</span></td>
<td><a href="un-modello-pli-per-il-problema-degli-zaini-multipli/#sez-sec-kpf-MKP">9.10</a></td>
</tr>
<tr>
<td>MCKP</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{MCKP}}\)</span></td>
<td>binarie <span class="arithmatex">\(x_j\)</span>, un oggetto per classe</td>
<td><a href="un-modello-pli-per-il-problema-dello-zaino-a-scelta-multipla/#sez-sec-kpf-MCKP">9.11</a></td>
</tr>
<tr>
<td>KPS</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{KPS}}\)</span></td>
<td>binarie <span class="arithmatex">\(x_j\)</span> e variabili di setup <span class="arithmatex">\(y_h\)</span></td>
<td><a href="un-modello-pli-per-il-problema-dello-zaino-con-setup/#sez-sec-kpf-KPS">9.12</a></td>
</tr>
</table></div>

<div class="grid cards sottopagine" markdown>

-   **Panoramica**

    Panoramica della famiglia

    [:octicons-arrow-right-24: Apri](#91-panoramica-della-famiglia)

-   **9.2 Un modello PLI per il problema dello zaino 0/1**

    Efficienza degli oggetti · Oggetto critico e capacità residua · Alcune proprietà teoriche importanti

    [:octicons-arrow-right-24: Apri](un-modello-pli-per-il-problema-dello-zaino-0-1.md)

-   **9.6 Un modello PLI per il problema del subset sum**

    [:octicons-arrow-right-24: Apri](un-modello-pli-per-il-problema-del-subset-sum.md)

-   **9.7 Un modello PLI per il problema dello zaino limitato**

    [:octicons-arrow-right-24: Apri](un-modello-pli-per-il-problema-dello-zaino-limitato.md)

-   **9.8 Un modello PLI per il problema dello zaino illimitato**

    [:octicons-arrow-right-24: Apri](un-modello-pli-per-il-problema-dello-zaino-illimitato.md)

-   **9.9 Un modello PLI per il problema dello zaino multidimensionale**

    [:octicons-arrow-right-24: Apri](un-modello-pli-per-il-problema-dello-zaino-multidimensionale.md)

-   **9.10 Un modello PLI per il problema degli zaini multipli**

    [:octicons-arrow-right-24: Apri](un-modello-pli-per-il-problema-degli-zaini-multipli.md)

-   **9.11 Un modello PLI per il problema dello zaino a scelta multipla**

    [:octicons-arrow-right-24: Apri](un-modello-pli-per-il-problema-dello-zaino-a-scelta-multipla.md)

-   **9.12 Un modello PLI per il problema dello zaino con setup**

    In sintesi

    [:octicons-arrow-right-24: Apri](un-modello-pli-per-il-problema-dello-zaino-con-setup.md)

</div>

---

**Avanti:** [9.2 Un modello PLI per il problema dello zaino 0/1](un-modello-pli-per-il-problema-dello-zaino-0-1.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di zaino](../../esercizi/knapsack-formulations.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Rilassamento continuo e upper bound per lo zaino 0/1](../../laboratorio/zaino-rilassamento-bound.md).