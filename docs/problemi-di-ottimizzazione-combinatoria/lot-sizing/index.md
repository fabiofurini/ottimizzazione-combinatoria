---
title: "Problemi di lot sizing"
---

# Problemi di lot sizing

<div class="info-capitolo" markdown>

**Parte 1 · Problemi di ottimizzazione combinatoria · Capitolo 8** · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-problemi-di-ottimizzazione-combinatoria.pdf) · [:material-pencil: Esercizi: Problemi di lot sizing](../../esercizi/lot-sizing.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, [Capitolo 1 «Problemi di ottimizzazione combinatoria»](../combinatorial-optimization/index.md): che cos'è un problema di ottimizzazione combinatoria, il numero di soluzioni candidate, e i bound primali e duali.

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - descrivere un piano di produzione tramite le sue quantità, scorte e setup, e calcolarne il costo;

    - enunciare il problema del lot sizing capacitato e indicarne le principali varianti;

    - stabilire se un piano è ammissibile, e contare le scelte di setup ammissibili di un'istanza;

    - costruire a mano un primo piano, accorpando le domande di periodi consecutivi;

    - calcolare un lower bound sul costo dal numero di setup richiesto dalla domanda totale.

## 8.1 Panoramica della famiglia

- I <strong>problemi di lot sizing</strong> hanno gli stessi dati: un insieme $T = \{1,2,\dots,m\}$ di $m$ periodi di tempo e, per ogni periodo $t \in T$, una <em>domanda</em> $d_t$, una <em>capacità</em> produttiva e tre costi: il costo di setup $sc_t$, il costo variabile di produzione $vc_t$ e il costo di mantenimento a scorta $hc_t$.

- Una soluzione è un <strong>piano di produzione</strong>: la quantità prodotta in ogni periodo, che determina la scorta alla fine di ciascun periodo e i periodi con un setup.

- L'obiettivo è soddisfare tutte le domande al minimo costo totale di setup, produzione e mantenimento a scorta.

!!! chiave ""

    Un problema di lot sizing bilancia i costi di setup, pagati in ogni periodo con produzione, e i costi di mantenimento della scorta. I membri della famiglia differiscono per le capacità, per il numero di prodotti e per il modo in cui la domanda e la capacità si possono modificare.

- La tabella elenca i membri della famiglia, con la sezione che definisce ciascuno di essi.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Sigla</strong></th>
<th><strong>Differenza rispetto al CLS</strong></th>
<th><strong>Sezione</strong></th>
</tr>
<tr>
<td>problema del lot sizing capacitato</td>
<td>CLS</td>
<td>un prodotto, capacità <span class="arithmatex">\(cap_t\)</span></td>
<td><a href="il-problema-del-lot-sizing-capacitato/#sez-sec-ls-CLS">8.2</a></td>
</tr>
<tr>
<td>problema del lot sizing senza capacità</td>
<td>ULS</td>
<td>nessuna capacità vincolante</td>
<td><a href="varianti/#sez-sec-ls-variants">8.6</a></td>
</tr>
<tr>
<td>più prodotti e tempi di setup</td>
<td>MLS</td>
<td>prodotti che condividono il tempo di ogni periodo</td>
<td><a href="varianti/#sez-sec-ls-variants">8.6</a></td>
</tr>
<tr>
<td>scorta iniziale</td>
<td>LS-SI</td>
<td>la scorta iniziale è una decisione</td>
<td><a href="varianti/#sez-sec-ls-variants">8.6</a></td>
</tr>
<tr>
<td>straordinario</td>
<td>LS-OT</td>
<td>capacità aggiuntiva a un costo più alto</td>
<td><a href="varianti/#sez-sec-ls-variants">8.6</a></td>
</tr>
<tr>
<td>domanda non soddisfatta</td>
<td>LS-UD</td>
<td>parte della domanda persa con una penalità</td>
<td><a href="varianti/#sez-sec-ls-variants">8.6</a></td>
</tr>
</table></div>

<div class="grid cards sottopagine" markdown>

-   **Panoramica**

    Panoramica della famiglia

    [:octicons-arrow-right-24: Apri](#81-panoramica-della-famiglia)

-   **8.2 Il problema del lot sizing capacitato**

    Contare le soluzioni · Un primo piano a mano · Un lower bound combinatorio

    [:octicons-arrow-right-24: Apri](il-problema-del-lot-sizing-capacitato.md)

-   **8.6 Varianti**

    Più prodotti e tempi di setup · Scorta iniziale · Straordinario · Domanda non soddisfatta · Osservazioni

    [:octicons-arrow-right-24: Apri](varianti.md)

</div>

---

**Avanti:** [8.2 Il problema del lot sizing capacitato](il-problema-del-lot-sizing-capacitato.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di lot sizing](../../esercizi/lot-sizing.md)

---

**Approfondimento:** [:material-view-list: che cosa fa il corso su questo problema](../../catalogo/capacitated-lot-sizing.md)
