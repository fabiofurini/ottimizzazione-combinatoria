---
title: "Formulazioni dei problemi di scheduling"
---

# Formulazioni dei problemi di scheduling

<div class="info-capitolo" markdown>

**Parte 2 · Formulazioni dei problemi e loro proprietà · Capitolo 14** · [:material-file-pdf-box: Dispensa, volume 2 (PDF)](../../pdf/dispensa-2-formulazioni.pdf) · [:material-presentation: Slide](../../pdf/slide-pcmax-formulations.pdf) · [:material-pencil: Esercizi: Problemi di scheduling](../../esercizi/pcmax-formulations.md)

</div>

!!! nota "Prerequisiti"

    - Dal modulo <em>Programmazione lineare</em>, [Capitolo 9 «Teoria della dualità»](https://fabiofurini.github.io/programmazione-lineare/dualita/09-dualita/): il duale di un problema LP, dualità debole e forte.

    - Dal modulo <em>Programmazione lineare intera</em>, [Capitolo 1 «Programmazione lineare intera»](https://fabiofurini.github.io/programmazione-lineare-intera/modelli-e-bound/ilp/) e [Capitolo 2 «Bound primali e duali»](https://fabiofurini.github.io/programmazione-lineare-intera/modelli-e-bound/lp-relaxation/): problemi ILP, rilassamenti lineari e bound.

    - Da questo modulo, [Capitolo 7 «Problemi di scheduling»](../../problemi-di-ottimizzazione-combinatoria/pcmax/index.md): il problema, la sua ipotesi, il makespan e l'istanza dell'Esempio 7.1.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo saremo in grado di:

    - scrivere il modello PLI di $P\|C_{\max}$ e spiegare come la variabile di makespan è collegata ai carichi delle macchine;

    - scrivere i rilassamenti lineari e i loro duali, e dimostrare che il loro valore ottimo è $\sum_j t_j / m$;

    - dimostrare che il bound LP vale almeno $1/m$ del valore ottimo, e che il fattore è tight;

    - usare le disuguaglianze valide e i vincoli di rottura delle simmetrie del modello.

## 14.1 Panoramica della famiglia

- I modelli PLI dei problemi di scheduling su macchine parallele usano l'insieme $\mathscr{H}=\{1,2,\ldots,m\}$ delle macchine e una <strong>variabile di assegnamento</strong> binaria $x_{jh}$ per ogni lavoro $j \in \mathscr{J}$ e ogni macchina $h \in \mathscr{H}$.

- Una variabile continua $C_{\max}$ rappresenta il makespan: un vincolo per ogni macchina impone che $C_{\max}$ sia almeno pari al carico della macchina.

- La funzione obiettivo minimizza $C_{\max}$, quindi all'ottimo è uguale al carico massimo.

!!! chiave ""

    I modelli di scheduling sono modelli di assegnamento dei lavori alle macchine, come i modelli di packing assegnano gli oggetti ai contenitori; l'obiettivo min-max è linearizzato con la variabile di makespan $C_{\max}$.

- La tabella elenca i membri della famiglia, con il nome del loro modello PLI e la sezione che lo scrive.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Modello</strong></th>
<th><strong>Variabili</strong></th>
<th><strong>Sezione</strong></th>
</tr>
<tr>
<td><span class="arithmatex">\(P\|C_{\max}\)</span></td>
<td><span class="arithmatex">\(\mathrm{ILP}_{P\|C_{\max}}\)</span></td>
<td><span class="arithmatex">\(x_{jh}\)</span> binarie e <span class="arithmatex">\(C_{\max}\)</span> continua</td>
<td><a href="un-modello-pli-per-il-problema-di-scheduling-su-macchine-par/#sez-sec-pmf-PCmax">14.2</a></td>
</tr>
</table></div>

<div class="grid cards sottopagine" markdown>

-   **Panoramica**

    Panoramica della famiglia

    [:octicons-arrow-right-24: Apri](#141-panoramica-della-famiglia)

-   **14.2 Un modello PLI per il problema di scheduling su macchine parallele identiche**

    Alcune proprietà teoriche importanti

    [:octicons-arrow-right-24: Apri](un-modello-pli-per-il-problema-di-scheduling-su-macchine-par.md)

</div>

---

**Avanti:** [14.2 Un modello PLI per il problema di scheduling su macchine parallele identiche](un-modello-pli-per-il-problema-di-scheduling-su-macchine-par.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di scheduling](../../esercizi/pcmax-formulations.md)
