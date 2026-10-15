---
title: "Formulazioni dei problemi di packing"
---

# Formulazioni dei problemi di packing

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 10** · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-bin-packing-formulations.pdf) · [:material-pencil: Esercizi: Problemi di packing](../../esercizi/bin-packing-formulations.md)

</div>

!!! nota "Prerequisiti"

    - Dal modulo <em>Programmazione lineare</em>, [Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/): il duale di un problema LP, dualità debole e forte.

    - Dal modulo <em>Programmazione lineare intera</em>, [Capitolo 1 «Programmazione lineare intera»](https://fabiofurini.github.io/programmazione-lineare-intera/models-and-bounds/ilp/) e [Capitolo 2 «Bound primali e duali»](https://fabiofurini.github.io/programmazione-lineare-intera/models-and-bounds/lp-relaxation/): problemi PLI, rilassamenti lineari e bound.

    - Da questo modulo, [Capitolo 3 «Problemi di packing»](../../problemi-di-ottimizzazione-combinatoria/bin-packing/index.md): il problema e le sue ipotesi.

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - scrivere il modello PLI del problema del bin packing e spiegare il legame fra le variabili di assegnamento e le variabili di attivazione;

    - scrivere i due rilassamenti lineari e i loro duali, e dimostrare che il loro valore ottimo è $\sum_{j} w_j / c$;

    - arrotondare per eccesso il bound del rilassamento per ottenere un lower bound sul numero di contenitori;

    - dimostrare che il bound del rilassamento è almeno la metà del valore ottimo, e che il fattore è tight;

    - scrivere il modello PLI del problema del cutting stock, con variabili intere per le copie degli oggetti.

## 10.1 Panoramica della famiglia

- I modelli PLI dei problemi di packing usano un upper bound $m$ sul numero di contenitori e l'insieme $\mathscr{B} = \{1,2,\dots,m\}$ dei contenitori che si possono usare.

- Le <strong>variabili di assegnamento</strong> $x_{jb}$ mettono gli oggetti $j \in \mathscr{I}$ nei contenitori $b \in \mathscr{B}$, e le <strong>variabili di attivazione</strong> binarie $y_b$ dicono se il contenitore $b$ è usato.

- Ogni contenitore dà un vincolo di capacità, che collega anche i due tipi di variabili, e la funzione obiettivo minimizza il numero $\sum_{b \in \mathscr{B}} y_b$ di contenitori usati.

!!! chiave ""

    I modelli di packing sono <strong>modelli di assegnamento</strong>: ogni oggetto, o ogni copia di un oggetto, è assegnato a un contenitore usato, e gli oggetti assegnati a un contenitore ne rispettano la capacità. I membri della famiglia cambiano il dominio delle variabili di assegnamento.

- La tabella elenca i membri della famiglia, con il nome del loro modello PLI e la sezione che lo scrive.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Modello</strong></th>
<th><strong>Variabili di assegnamento</strong></th>
<th><strong>Sezione</strong></th>
</tr>
<tr>
<td>BPP</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{BPP}}\)</span></td>
<td>binarie <span class="arithmatex">\(x_{jb}\)</span></td>
<td><a href="un-modello-pli-per-il-problema-del-bin-packing/#sez-sec-bpf-BPP">10.2</a></td>
</tr>
<tr>
<td>CSP</td>
<td><span class="arithmatex">\(\mathrm{ILP}_{\mathrm{CSP}}\)</span></td>
<td>intere <span class="arithmatex">\(x_{jb}\)</span>, le copie dell'oggetto <span class="arithmatex">\(j\)</span> nel contenitore <span class="arithmatex">\(b\)</span></td>
<td><a href="un-modello-pli-per-il-problema-del-cutting-stock/#sez-sec-bpf-CSP">10.5</a></td>
</tr>
</table></div>

<div class="grid cards sottopagine" markdown>

-   **Panoramica**

    Panoramica della famiglia

    [:octicons-arrow-right-24: Apri](#101-panoramica-della-famiglia)

-   **10.2 Un modello PLI per il problema del bin packing**

    Alcune proprietà teoriche importanti

    [:octicons-arrow-right-24: Apri](un-modello-pli-per-il-problema-del-bin-packing.md)

-   **10.5 Un modello PLI per il problema del cutting stock**

    In sintesi

    [:octicons-arrow-right-24: Apri](un-modello-pli-per-il-problema-del-cutting-stock.md)

</div>

---

**Avanti:** [10.2 Un modello PLI per il problema del bin packing](un-modello-pli-per-il-problema-del-bin-packing.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di packing](../../esercizi/bin-packing-formulations.md)
