---
title: Problemi di ottimizzazione combinatoria
hide:
  - navigation
  - toc
---

<div class="hero" markdown>

# Problemi di ottimizzazione combinatoria

<!-- collana-riga -->
<p class="collana-riga" markdown>Un corso della collana <b>Ricerca Operativa e Matematica</b> · [tutti i corsi](#la-collana)</p>
<!-- /collana-riga -->

Materiale didattico ideato e sviluppato da **[Fabio Furini](https://fabiofurini.github.io/)**, professore
associato al [DIAG](https://www.diag.uniroma1.it/), Sapienza Università di Roma.

**Le dispense del corso, online**: i problemi di zaino, di packing, di colorazione, di clique, di routing, di scheduling e di lot sizing, le loro formulazioni con le proprietà e i bound, e gli algoritmi ad hoc; con definizioni, risultati con dimostrazione, esempi svolti passo per passo, esercizi con le soluzioni e app interattive.

Prerequisiti: [Programmazione lineare](https://fabiofurini.github.io/programmazione-lineare/) e [Programmazione lineare intera](https://fabiofurini.github.io/programmazione-lineare-intera/) per le formulazioni e [Algoritmi](https://fabiofurini.github.io/algoritmi/) per gli algoritmi.

[Comincia :material-arrow-right:](problemi-di-ottimizzazione-combinatoria/combinatorial-optimization/index.md){ .md-button .md-button--primary }
[:material-pencil: Esercizi](esercizi/index.md){ .md-button }
[:material-gesture-tap: Laboratorio](laboratorio/index.md){ .md-button }
[:material-clipboard-check-outline: Quiz](autovalutazione.md){ .md-button }
[:material-download: Materiale](materiale.md){ .md-button }

</div>

<!-- collana-app -->
## Provalo subito

Il branch-and-bound per lo zaino 0-1 su cinque oggetti: l'albero completo, con i bound di Dantzig, i nodi potati, quelli inammissibili e le soluzioni che migliorano l'incumbent. Premi «Esegui» per vederlo crescere nodo per nodo.

<div class="gi" data-grafico="oc-bb-knapsack" data-vetrina="18 6 8 10 11 ; 4 3 5 7 8 ; 16 | 9 11 5 11 8 ; 2 6 4 9 7 ; 15"></div>

[:material-gesture-tap: Altre app nel laboratorio](laboratorio/index.md){ .md-button }
<!-- /collana-app -->

## Le parti del corso

Le stesse voci del menu: ogni scheda dice a quale parte e a quali capitoli della dispensa corrisponde.

<div class="grid cards" markdown>

-   :material-puzzle-outline: **Definizioni**

    ---

    *Parte 1 · Capitolo 1*

    Che cos'è un problema di ottimizzazione combinatoria: categorie, conteggio delle soluzioni, esplosione combinatoria, bound e gap, complessità.

    [:octicons-arrow-right-24: Il capitolo](problemi-di-ottimizzazione-combinatoria/combinatorial-optimization/index.md)

-   :material-star-outline: **Problemi**

    ---

    *Parte 1 · Capitoli 2–8*

    Problemi di zaino · Problemi di packing · Problemi di colorazione · Problemi di clique · Problemi di routing · Problemi di scheduling · Problemi di lot sizing

    [:octicons-arrow-right-24: Le famiglie](problemi-scelti/index.md)

-   :material-function-variant: **Formulazioni**

    ---

    *Parte 2 · Capitoli 9–15*

    Problemi di zaino · Problemi di packing · Problemi di colorazione · Problemi di clique · Problemi di routing · Problemi di scheduling · Problemi di lot sizing

    [:octicons-arrow-right-24: I capitoli](formulazioni/index.md)

-   :material-tools: **Algoritmi ad hoc**

    ---

    *Parte 3 · Capitoli 16–17*

    Problemi di zaino · Problemi di colorazione

    [:octicons-arrow-right-24: I capitoli](algoritmi-specializzati/index.md)

-   :material-table-large: **Programmazione dinamica**

    ---

    *Modulo della collana*

    Principi e algoritmi di PD per zaino, lot sizing, cambio monete e taglio delle aste.

    [:octicons-arrow-right-24: Il modulo](https://fabiofurini.github.io/programmazione-dinamica/)

-   :material-map-marker-path: **Algoritmi euristici**

    ---

    *Modulo della collana*

    Euristiche costruttive, ricerca locale, metaeuristiche ed euristiche MIP per i problemi di ottimizzazione combinatoria.

    [:octicons-arrow-right-24: Il modulo](https://fabiofurini.github.io/algoritmi-euristici/)

-   :material-approximately-equal: **Algoritmi di approssimazione**

    ---

    *Modulo della collana*

    Garanzie di prestazione, schemi di approssimazione e limiti dell'approssimazione per i problemi combinatori.

    [:octicons-arrow-right-24: Il modulo](https://fabiofurini.github.io/algoritmi-di-approssimazione/)

-   :material-clipboard-check-outline: **Autovalutazione**

    ---

    *Facsimile d'esame*

    Un facsimile nuovo a ogni avvio: 13 domande, 33 punti, con la soluzione e il link alle dispense.

    [:octicons-arrow-right-24: Mettiti alla prova](autovalutazione.md)

-   :material-gesture-tap: **Laboratorio**

    ---

    *App interattive*

    Gli algoritmi del corso passo per passo, sulle istanze di riferimento o su istanze tue.

    [:octicons-arrow-right-24: Le app](laboratorio/index.md)

</div>

<!-- collana-da-non-perdere -->
## Da non perdere

<div class="grid cards" markdown>

-   :material-pencil-box-multiple: **Esercizi con le soluzioni**

    ---

    Esercizi per ogni capitolo, ciascuno con la soluzione svolta che si apre con un clic.

    [:octicons-arrow-right-24: Gli esercizi](esercizi/index.md)

-   :material-clipboard-check-outline: **Quiz di autovalutazione**

    ---

    Un facsimile d'esame nuovo a ogni avvio: 13 domande, 33 punti, con la soluzione e il link alle dispense. In Materiale c'è anche la banca completa delle domande.

    [:octicons-arrow-right-24: Mettiti alla prova](autovalutazione.md)

-   :material-gesture-tap: **Laboratorio interattivo**

    ---

    App che girano nel browser: muovi i parametri e guarda le idee del corso lavorare, un passo alla volta.

    [:octicons-arrow-right-24: Il laboratorio](laboratorio/index.md)

-   :material-download: **Dispense in PDF**

    ---

    Dispense, eserciziari e slide in PDF, con la stessa numerazione del sito.

    [:octicons-arrow-right-24: Il materiale](materiale.md)

-   :material-format-list-numbered: **Indice completo**

    ---

    Tutti i capitoli con le loro sezioni in una pagina, e come è fatto ogni capitolo.

    [:octicons-arrow-right-24: L'indice](indice.md)

</div>
<!-- /collana-da-non-perdere -->

---

<!-- collana -->
## La collana

Tutti i corsi della collana hanno la stessa impostazione: dispense online e in PDF, esercizi con le soluzioni, laboratorio interattivo e quiz di autovalutazione.

<div class="grid cards" markdown>

-   :material-function-variant: **[Analisi Matematica 1](https://fabiofurini.github.io/analisi-matematica-1/)**

    numeri reali, funzioni, limiti, derivate e serie, con i grafici interattivi

-   :material-matrix: **[Algebra lineare](https://fabiofurini.github.io/algebra-lineare/)**

    vettori, matrici, determinanti, sistemi lineari e autovalori, con il laboratorio di calcolo

-   :material-code-braces: **[Algoritmi](https://fabiofurini.github.io/algoritmi/)**

    rappresentazione dei numeri, pseudocodice, ordinamento e ricerca, analisi e algoritmi ricorsivi

-   :material-vector-triangle: **[Programmazione lineare](https://fabiofurini.github.io/programmazione-lineare/)**

    poliedri, algoritmo del simplesso, dualità e simplesso duale, con il laboratorio interattivo

-   :material-dots-grid: **[Programmazione lineare intera](https://fabiofurini.github.io/programmazione-lineare-intera/)**

    rilassamento continuo, disuguaglianze valide, piani di taglio, branch-and-bound e branch-and-cut

-   :material-vector-curve: **[Ottimizzazione convessa](https://fabiofurini.github.io/ottimizzazione-convessa/)**

    insiemi e funzioni convesse, problemi di ottimizzazione convessa, con grafici interattivi

-   :material-graph-outline: **[Ottimizzazione su reti](https://fabiofurini.github.io/ottimizzazione-su-reti/)**

    grafi, alberi ricoprenti, cammini minimi, flussi su reti, simplesso su reti e gestione dei progetti

-   :material-hexagon-multiple-outline: **Problemi di ottimizzazione combinatoria** · *questo corso*

    zaino, bin packing, colorazione, TSP, scheduling e lot sizing: i problemi, le formulazioni e gli algoritmi ad hoc

-   :material-table-large: **[Programmazione dinamica](https://fabiofurini.github.io/programmazione-dinamica/)**

    principi e algoritmi di PD per zaino, lot sizing, cambio monete e taglio delle aste

-   :material-map-marker-path: **[Algoritmi euristici](https://fabiofurini.github.io/algoritmi-euristici/)**

    euristiche costruttive, ricerca locale, metaeuristiche ed euristiche MIP per i problemi di ottimizzazione combinatoria

-   :material-approximately-equal: **[Algoritmi di approssimazione](https://fabiofurini.github.io/algoritmi-di-approssimazione/)**

    garanzie di prestazione, schemi di approssimazione e limiti dell'approssimazione per i problemi combinatori

-   :material-chart-line: **[Modellazione PL](https://fabiofurini.github.io/modellazione-pl/)**

    modelli di programmazione lineare per problemi gestionali, risolti con Python e Gurobi

-   :material-chart-bell-curve-cumulative: **[Modellazione PNL](https://fabiofurini.github.io/modellazione-pnl/)**

    modelli di programmazione non lineare, dal portafoglio al machine learning, con Python e Gurobi

-   :material-vector-polygon: **[Modellazione MIP](https://fabiofurini.github.io/modellazione-mip/)**

    modelli di programmazione lineare a variabili intere, dalla formulazione alla soluzione con i solver

</div>
<!-- /collana -->

---

Materiale didattico di **[Fabio Furini](https://fabiofurini.github.io/)** —
[DIAG](https://www.diag.uniroma1.it/), Sapienza Università di Roma.

*Questo sito è disponibile anche in [inglese](https://fabiofurini.github.io/combinatorial-optimization/).*
