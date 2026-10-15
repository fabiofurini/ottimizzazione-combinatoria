---
title: "PD per il problema dello zaino illimitato"
---

# PD per il problema dello zaino illimitato

<div class="info-capitolo" markdown>

**Parte 3 · Programmazione dinamica · Capitolo 18** · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-programmazione-dinamica.pdf) · [:material-presentation: Slide](../../pdf/slide-dp-unbounded-knapsack.pdf) · [:material-pencil: Esercizi: Zaino illimitato (UKP)](../../esercizi/dp-unbounded-knapsack.md) · [:material-gesture-tap: App: Tabelle della PD per i problemi di zaino](../../laboratorio/tabella-pd-zaino.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, il capitolo [«PD per il problema dello zaino 0/1»](../dp-knapsack/index.md): la ricorrenza $v(j,k)$ su oggetti e capacità e la ricostruzione di una soluzione.

    - Da questo modulo, il capitolo [«Principi della programmazione dinamica»](../dp-principles.md): sottostruttura ottima, sottoproblemi sovrapposti, casi base.

    - Dal modulo <em>Algoritmi</em>: le [convenzioni dello pseudocodice (Capitolo 2)](https://fabiofurini.github.io/algoritmi/algoritmi-di-base/02-pseudocodice/) e [la dimensione dell'input (Capitolo 11)](https://fabiofurini.github.io/algoritmi/analisi/11-dimensione-input/).

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - spiegare perché l'UKP differisce dal problema dello zaino 0/1 (KP) e scrivere la ricorrenza $v(k)$ sulle sole capacità;

    - eseguire a mano l'algoritmo di PD sulle capacità e sulle coppie (tipo di oggetto, capacità);

    - ricostruire una soluzione ottima, compreso il caso in cui una parte della capacità resta inutilizzata;

    - contare i passi dei due algoritmi di PD e confrontarli.

Il problema di questo capitolo è il [problema dello zaino illimitato (UKP)](../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-illimitato.md): la sua definizione e le sue ipotesi sono nella sua pagina.

## 18.1 Istanze e soluzioni ammissibili

<a id="box-1-texukpex1"></a>

!!! esempio "Esempio 18.1: Istanza dell'UKP"

    Consideriamo uno zaino di capacità $c=7$ e $4$ tipi di oggetto, con i seguenti profitti e pesi:

    $$
    \begin{array}{l|rrrr}
    \hline  & {j=1} & {j=2} & {j=3} & {j=4} \\
    \hline {p_j} & 4 & 5 & 10 & 11 \\
    {w_j} & 2 & 3 & 5 & 6 \\
    \hline
    \end{array}
    $$

    Chiamiamo questa istanza dell'UKP <span style="color:#1971c2">[Esempio 18.1](#box-1-texukpex1)</span>.

!!! chiave ""

    Per ogni tipo di oggetto $j$, una soluzione ammissibile può usare al più $\lfloor c/w_j \rfloor$ copie del tipo di oggetto $j$, poiché con più copie si supererebbe la capacità $c$ già con il solo tipo di oggetto $j$. Di conseguenza, il numero di soluzioni ammissibili è al più $\prod_{j=1}^{n}\big(\lfloor c/w_j \rfloor+1\big)$.

- Il numero di possibili soluzioni dell'UKP cresce rapidamente con il numero $n$ di tipi di oggetto e con la capacità $c$, poiché ogni variabile $x_j$ può assumere in modo indipendente uno qualsiasi di $\lfloor c/w_j \rfloor+1$ valori. Pertanto, l'enumerazione di tutte le possibili soluzioni diventa presto impraticabile al crescere di $n$ o di $c$.

### 18.1.1 Codifica delle soluzioni ammissibili

Una soluzione ammissibile è descritta dal vettore intero

$$
(x_1,x_2,\dots,x_n),
$$

dove $x_j\in\Z_{\ge 0}$ è il numero di copie selezionate del tipo di oggetto $j$. La soluzione è ammissibile se

$$
\sum_{j=1}^{n} w_j x_j \le c.
$$

Il suo profitto totale è

$$
\sum_{j=1}^{n} p_j x_j.
$$

!!! chiave ""

    La differenza principale rispetto al KP è che le variabili non sono più binarie. Nell'UKP ogni variabile $x_j$ può assumere qualunque valore intero non negativo, purché il vincolo di capacità sia rispettato.

<div class="grid cards sottopagine" markdown>

-   **Panoramica**

    Istanze e soluzioni ammissibili · Codifica delle soluzioni ammissibili

    [:octicons-arrow-right-24: Apri](#181-istanze-e-soluzioni-ammissibili)

-   **18.2 Un primo algoritmo di PD**

    [:octicons-arrow-right-24: Apri](un-primo-algoritmo-di-pd.md)

-   **18.3 Un secondo algoritmo di PD**

    [:octicons-arrow-right-24: Apri](un-secondo-algoritmo-di-pd.md)

-   **Errori tipici · In sintesi**

    In sintesi

    [:octicons-arrow-right-24: Apri](errori-tipici.md)

</div>

---

**Avanti:** [18.2 Un primo algoritmo di PD](un-primo-algoritmo-di-pd.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Zaino illimitato (UKP)](../../esercizi/dp-unbounded-knapsack.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Tabelle della PD per i problemi di zaino](../../laboratorio/tabella-pd-zaino.md#voce=ukp).