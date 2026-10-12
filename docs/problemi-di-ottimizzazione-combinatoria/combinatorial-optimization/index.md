---
title: "Problemi di ottimizzazione combinatoria"
---

# Problemi di ottimizzazione combinatoria

<div class="info-capitolo" markdown>

**Parte 1 · Problemi di ottimizzazione combinatoria · Capitolo 1** · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-problemi-di-ottimizzazione-combinatoria.pdf) · [:material-pencil: Esercizi: Ottimizzazione combinatoria](../../esercizi/combinatorial-optimization.md) · [:material-gesture-tap: App: Forza bruta sul problema dello zaino 0/1](../../laboratorio/zaino-forza-bruta.md)

</div>

<div class="grid cards sottopagine" markdown>

-   **1.1 Problemi di ottimizzazione combinatoria**

    [:octicons-arrow-right-24: Apri](problemi-di-ottimizzazione-combinatoria.md)

-   **1.2 Categorie di problemi di ottimizzazione combinatoria**

    Aree applicative · I problemi del corso per categoria

    [:octicons-arrow-right-24: Apri](categorie-di-problemi-di-ottimizzazione-combinatoria.md)

-   **1.3 Contare le soluzioni**

    Ordinamenti e ordinamenti ciclici · Partizioni e numeri di Bell

    [:octicons-arrow-right-24: Apri](contare-le-soluzioni.md)

-   **1.4 Esplosione combinatoria e forza bruta**

    Tempi di calcolo

    [:octicons-arrow-right-24: Apri](esplosione-combinatoria-e-forza-bruta.md)

-   **1.5 Bound primali, bound duali e gap**

    [:octicons-arrow-right-24: Apri](bound-primali-bound-duali-e-gap.md)

-   **Cenni di complessità computazionale**

    Algoritmi pseudo-polinomiali e problemi NP-hard in senso forte

    [:octicons-arrow-right-24: Apri](cenni-di-complessita-computazionale.md)

</div>

!!! nota "Prerequisiti"

    - Dai <em>Preliminari</em>: problemi di ottimizzazione (regione ammissibile, funzione obiettivo, soluzione ottima e valore ottimo), coefficienti binomiali e partizioni di un insieme finito.

    - Non serve alcuna conoscenza di programmazione intera: i bound di questo capitolo vengono da argomenti combinatori.

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - riconoscere un problema di ottimizzazione combinatoria, la categoria delle sue decisioni e l'oggetto combinatorio delle sue soluzioni (un sottoinsieme, un ordinamento, una partizione, un assegnamento);

    - contare le soluzioni candidate ($2^n$ sottoinsiemi, $n!$ ordinamenti, $(n-1)!/2$ ordinamenti ciclici, numeri di Bell per le partizioni) e stimare il tempo di calcolo di un'enumerazione a forza bruta;

    - definire bound primali, bound duali e gap, e usarli per certificare che una soluzione è ottima;

    - collocare un problema nelle classi P, NP e NP-hard, e distinguere un algoritmo pseudo-polinomiale da uno polinomiale.

---

**Avanti:** [1.1 Problemi di ottimizzazione combinatoria](problemi-di-ottimizzazione-combinatoria.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Ottimizzazione combinatoria](../../esercizi/combinatorial-optimization.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Forza bruta sul problema dello zaino 0/1](../../laboratorio/zaino-forza-bruta.md).