---
title: "Formulazioni dei problemi di lot sizing"
---

# Formulazioni dei problemi di lot sizing

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 15** · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-lot-sizing-formulations.pdf) · [:material-pencil: Esercizi: Problemi di lot sizing](../../esercizi/lot-sizing-formulations.md)

</div>

!!! nota "Prerequisiti"

    - Dal modulo <em>Programmazione lineare intera</em>, [Capitolo 1 «Programmazione lineare intera»](https://fabiofurini.github.io/programmazione-lineare-intera/models-and-bounds/ilp/) e [Capitolo 2 «Bound primali e duali»](https://fabiofurini.github.io/programmazione-lineare-intera/models-and-bounds/lp-relaxation/): problemi ILP, rilassamenti lineari e lower bound.

    - Da questo modulo, [Capitolo 8 «Problemi di lot sizing»](../../problemi-di-ottimizzazione-combinatoria/lot-sizing/index.md): il problema, le sue ipotesi, i piani e l'istanza di riferimento.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo saremo in grado di:

    - scrivere la formulazione big-M del problema di lot sizing capacitato e calcolare un valore debole e un valore forte di big-M;

    - scrivere la formulazione a cammino minimo e interpretarne le variabili come gli archi di una rete;

    - rappresentare un piano di produzione come combinazione di cammini della rete;

    - confrontare i bound LP delle formulazioni sull'istanza di riferimento;

    - scrivere il modello PLI del problema di lot sizing senza capacità;

    - estendere la formulazione big-M a più prodotti con tempi di setup, alla scorta iniziale, agli straordinari e alla domanda non soddisfatta, e calcolare i valori forti di big-M di ogni modello.

## 15.1 Panoramica della famiglia

- I modelli big-$M$ dei problemi di lot sizing usano, per ogni periodo $t \in T$, una <strong>variabile di produzione</strong> intera $x_t$, una <strong>variabile di scorta</strong> intera $s_t$ e una <strong>variabile di setup</strong> binaria $y_t$.

- I <strong>vincoli di bilanciamento del flusso</strong> collegano le scorte di periodi consecutivi alla produzione e alla domanda; le variabili di setup sono collegate alla produzione da vincoli big-$M$.

- La funzione obiettivo minimizza il costo totale di setup, di produzione e di mantenimento a scorta. La formulazione a cammino minimo del CLS sostituisce le variabili di produzione e di scorta con gli archi di una rete.

!!! chiave ""

    I modelli di lot sizing sono modelli di flusso sui periodi, con variabili di setup binarie che attivano la produzione. I membri della famiglia aggiungono prodotti, tempi di setup, una scorta iniziale, straordinari o domanda non soddisfatta agli stessi vincoli di bilanciamento e big-$M$.

- La tabella elenca i membri della famiglia, con i nomi dei loro modelli e le sezioni che li scrivono.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Modelli</strong></th>
<th><strong>Formulazione</strong></th>
<th><strong>Sezione</strong></th>
</tr>
<tr>
<td>CLS</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{CLSP}}\)</span></td>
<td>formulazione big-<span class="arithmatex">\(M\)</span></td>
<td><a href="modelli-pli-per-il-problema-di-lot-sizing-capacitato/#sez-sec-lsf-bigM">15.3</a></td>
</tr>
<tr>
<td>CLS</td>
<td><span class="arithmatex">\(\mathrm{MIP}^{\mathrm{SP}}_{\mathrm{CLSP}}\)</span></td>
<td>formulazione a cammino minimo</td>
<td><a href="modelli-pli-per-il-problema-di-lot-sizing-capacitato/#sez-sec-lsf-SP">15.5</a></td>
</tr>
<tr>
<td>ULS</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{ULS}}\)</span></td>
<td>big-<span class="arithmatex">\(M\)</span>, senza capacità</td>
<td><a href="modelli-pli-per-le-varianti/#sez-sec-lsf-variants">15.7</a></td>
</tr>
<tr>
<td>MLS</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{CLSP}}^{P}\)</span></td>
<td>big-<span class="arithmatex">\(M\)</span>, tempi di setup</td>
<td><a href="modelli-pli-per-le-varianti/#sez-sec-lsf-variants">15.7</a></td>
</tr>
<tr>
<td>LS-SI</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{SI}}\)</span></td>
<td>big-<span class="arithmatex">\(M\)</span>, variabili di scorta iniziale</td>
<td><a href="modelli-pli-per-le-varianti/#sez-sec-lsf-variants">15.7</a></td>
</tr>
<tr>
<td>LS-OT</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{OT}}\)</span></td>
<td>big-<span class="arithmatex">\(M\)</span>, variabili di straordinario</td>
<td><a href="modelli-pli-per-le-varianti/#sez-sec-lsf-variants">15.7</a></td>
</tr>
<tr>
<td>LS-UD</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{CLSP}}^{\mathrm{UD}}\)</span></td>
<td>big-<span class="arithmatex">\(M\)</span>, variabili di domanda non soddisfatta</td>
<td><a href="modelli-pli-per-le-varianti/#sez-sec-lsf-variants">15.7</a></td>
</tr>
</table></div>

<div class="grid cards sottopagine" markdown>

-   **Panoramica**

    Panoramica della famiglia

    [:octicons-arrow-right-24: Apri](#151-panoramica-della-famiglia)

-   **15.2 Modelli PLI per il problema di lot sizing capacitato**

    Valori deboli e forti di big-M

    [:octicons-arrow-right-24: Apri](modelli-pli-per-il-problema-di-lot-sizing-capacitato.md)

-   **15.7 Modelli PLI per le varianti**

    Più prodotti e tempi di setup · Scorta iniziale · Straordinari · Domanda non soddisfatta · Errori tipici

    [:octicons-arrow-right-24: Apri](modelli-pli-per-le-varianti.md)

</div>

---

**Avanti:** [15.2 Modelli PLI per il problema di lot sizing capacitato](modelli-pli-per-il-problema-di-lot-sizing-capacitato.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di lot sizing](../../esercizi/lot-sizing-formulations.md)
