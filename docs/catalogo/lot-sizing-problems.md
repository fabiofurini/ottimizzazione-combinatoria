---
title: "Problemi di lot sizing"
---

# Problemi di lot sizing

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-lot-sizing-problems"></a>

- Dato un insieme $T=\{1,2,\dots,m\}$ di periodi con una domanda $d_t$ in ogni periodo $t\in T$, una soluzione fissa i periodi con un setup e la quantità prodotta in ciascuno di essi, in modo che ogni domanda sia soddisfatta.

- L'obiettivo è minimizzare il costo totale di setup, produzione e mantenimento a scorta; i membri della famiglia differiscono per le capacità, per il numero di prodotti e per il trattamento della scorta iniziale, dello straordinario e della domanda non soddisfatta.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Sigla</strong></th>
<th><strong>Differenza</strong></th>
</tr>
<tr>
<td><a href="../capacitated-lot-sizing/">Lot sizing capacitato</a></td>
<td>CLS</td>
<td>Il problema centrale della famiglia.</td>
</tr>
<tr>
<td><a href="../uncapacitated-lot-sizing-problem/">Problema del lot sizing senza capacità</a></td>
<td>ULS</td>
<td>Caso particolare del CLS in cui le capacità non sono vincolanti, per esempio <span class="arithmatex">\(cap_t \ge \sum_u d_u\)</span>.</td>
</tr>
<tr>
<td><a href="../capacitated-lot-sizing-with-constant-capacity/">Lot sizing capacitato con capacità costante</a></td>
<td>CLS-C</td>
<td>Caso particolare del CLS; la proprietà zero-inventory ordering è sostituita da una più debole: fra due periodi con scorta vuota al più un periodo produce una quantità strettamente compresa fra <span class="arithmatex">\(0\)</span> e <span class="arithmatex">\(C\)</span>.</td>
</tr>
<tr>
<td><a href="../lot-sizing-with-several-products-and-setup-times/">Lot sizing con più prodotti e tempi di setup</a></td>
<td>MLS</td>
<td>Generalizza il CLS, che è il caso di un solo prodotto con <span class="arithmatex">\(vt_t=1\)</span> e nessun tempo di setup.</td>
</tr>
<tr>
<td><a href="../lot-sizing-with-initial-stock/">Lot sizing con scorta iniziale</a></td>
<td>LS-SI</td>
<td>Toglie l'ipotesi di scorta iniziale vuota del CLS.</td>
</tr>
<tr>
<td><a href="../lot-sizing-with-overtime/">Lot sizing con straordinario</a></td>
<td>LS-OT</td>
<td>Sostituisce la capacità fissa <span class="arithmatex">\(cap_t\)</span> del CLS con due livelli di capacità con costi diversi.</td>
</tr>
<tr>
<td><a href="../lot-sizing-with-unsatisfied-demand/">Lot sizing con domanda non soddisfatta</a></td>
<td>LS-UD</td>
<td>Rilassa i vincoli di domanda del CLS, con una penalità nell'obiettivo.</td>
</tr>
</table></div>
