---
title: "Problemi di scheduling"
---

# Problemi di scheduling

<div class="info-capitolo" markdown>

**Parte 1 · Problemi di ottimizzazione combinatoria · Capitolo 7** · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-problemi-di-ottimizzazione-combinatoria.pdf) · [:material-pencil: Esercizi: Problemi di scheduling](../../esercizi/pcmax.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, [Capitolo 1 «Problemi di ottimizzazione combinatoria»](../combinatorial-optimization/index.md): che cos'è un problema di ottimizzazione combinatoria, il numero di soluzioni candidate, i bound primali e duali e le partizioni di un insieme (numeri di Bell).

    - Da questo modulo, [Capitolo 3 «Problemi di packing»](../bin-packing/index.md): il problema del bin packing.

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - classificare un problema di scheduling con la notazione a tre campi ed enunciare il problema $P\,||\,C_{\max}$;

    - descrivere uno schedule tramite gli insiemi di lavori delle macchine e calcolare carichi e makespan;

    - contare gli assegnamenti e gli schedule distinti di un'istanza;

    - costruire a mano un primo schedule, assegnando ogni lavoro alla macchina meno carica;

    - calcolare un lower bound sul makespan ottimo e usarlo per dimostrare che uno schedule è ottimo.

## 7.1 Panoramica della famiglia

- I <strong>problemi di scheduling</strong> di questo capitolo hanno gli stessi dati: un insieme $\mathscr{J} = \{1,2,\dots,n\}$ di $n$ lavori, $m$ macchine parallele e, per ogni lavoro, un <em>tempo di processamento</em>.

- Una soluzione assegna ogni lavoro a una macchina: i lavori $J_h$ della macchina $h$ sono processati uno dopo l'altro, e la macchina li completa all'istante $L_h$, il suo <strong>carico</strong>.

- L'obiettivo è minimizzare il <strong>makespan</strong> $C_{\max} = \max_h L_h$, l'istante di completamento dell'ultimo lavoro.

!!! chiave ""

    Un problema di scheduling su macchine parallele ripartisce i lavori fra le macchine in modo che l'ultima macchina finisca il prima possibile. I membri della famiglia differiscono per l'ambiente delle macchine, descritto dalla notazione a tre campi.

- La tabella elenca i membri della famiglia, con la sezione che definisce ciascuno di essi.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Notazione</strong></th>
<th><strong>Macchine</strong></th>
<th><strong>Sezione</strong></th>
</tr>
<tr>
<td>macchine parallele identiche</td>
<td><span class="arithmatex">\(P\,||\,C_{\max}\)</span></td>
<td>ogni lavoro richiede <span class="arithmatex">\(t_j\)</span> su ogni macchina</td>
<td><a href="scheduling-su-macchine-parallele-identiche/#sez-sec-pm-PCmax">7.2</a></td>
</tr>
<tr>
<td>macchine con velocità diverse</td>
<td><span class="arithmatex">\(Q\,||\,C_{\max}\)</span></td>
<td>la macchina <span class="arithmatex">\(h\)</span> ha una propria velocità</td>
<td><a href="#sez-sec-threefield">7.1.1</a></td>
</tr>
<tr>
<td>macchine parallele scorrelate</td>
<td><span class="arithmatex">\(R\,||\,C_{\max}\)</span></td>
<td>il lavoro <span class="arithmatex">\(j\)</span> richiede <span class="arithmatex">\(t_{jh}\)</span> sulla macchina <span class="arithmatex">\(h\)</span></td>
<td><a href="#sez-sec-threefield">7.1.1</a></td>
</tr>
</table></div>

### 7.1.1 La notazione a tre campi { #sez-sec-threefield }

- I problemi di scheduling si classificano con la <strong>notazione a tre campi</strong> $\alpha\,|\,\beta\,|\,\gamma$ di Graham, Lawler, Lenstra e Rinnooy Kan, dove:

    1. $\alpha$ descrive l'<strong>ambiente delle macchine</strong>: $1$ per una sola macchina, $P$ per macchine parallele identiche, $Q$ per macchine parallele con velocità diverse, $R$ per macchine parallele scorrelate;

    2. $\beta$ descrive le <strong>caratteristiche dei lavori</strong>, come le date di rilascio $r_j$ o i vincoli di precedenza <em>prec</em>; un campo vuoto indica che non ce ne sono;

    3. $\gamma$ descrive la <strong>funzione obiettivo</strong>, come il makespan $C_{\max}$ o la somma dei tempi di completamento $\sum_j C_j$.

- In questa notazione, $P\,||\,C_{\max}$ è il problema di schedulare lavori senza caratteristiche aggiuntive su macchine parallele identiche, minimizzando il makespan.

<div class="grid cards sottopagine" markdown>

-   **Panoramica**

    Panoramica della famiglia · La notazione a tre campi

    [:octicons-arrow-right-24: Apri](#71-panoramica-della-famiglia)

-   **7.2 Scheduling su macchine parallele identiche**

    Contare le soluzioni · Un primo schedule a mano · Un lower bound combinatorio · Relazione con il problema del bin packing · Osservazioni

    [:octicons-arrow-right-24: Apri](scheduling-su-macchine-parallele-identiche.md)

</div>

---

**Avanti:** [7.2 Scheduling su macchine parallele identiche](scheduling-su-macchine-parallele-identiche.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di scheduling](../../esercizi/pcmax.md)

---

**Approfondimento:** [:material-view-list: che cosa fa il corso su questo problema](../../catalogo/scheduling-on-identical-parallel-machines.md)
