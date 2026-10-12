---
title: Ottimizzazione combinatoria
hide:
  - navigation
  - toc
---

<div class="hero" markdown>

![Lavori in corso: sito e materiale didattico sono ancora in costruzione](img/cantiere.svg){ width="560" }

**Sito in costruzione.** Il materiale è in lavorazione e in revisione.

# Ottimizzazione combinatoria

Materiale didattico ideato e sviluppato da **[Fabio Furini](https://fabiofurini.github.io/)**, professore
associato al [DIAG](https://www.diag.uniroma1.it/), Sapienza Università di Roma.

**Le dispense del corso, online**: i problemi di zaino, di packing, di colorazione, di cricca, di routing, di scheduling e di lot sizing, risolti in tutti i modi: formulazioni e loro proprietà, programmazione dinamica, algoritmi euristici, di approssimazione e ad hoc; con definizioni, risultati con dimostrazione, esempi svolti passo per passo, esercizi con le soluzioni, notebook Colab e app interattive.

Per gli studenti della laurea magistrale in Ingegneria gestionale della Sapienza, e per chi vuole imparare a risolvere i problemi di ottimizzazione combinatoria. Prerequisiti: [Programmazione lineare intera](https://fabiofurini.github.io/programmazione-lineare-intera/) per le formulazioni e [Algoritmi](https://fabiofurini.github.io/algoritmi/) per gli algoritmi.

[:material-school: Studia il corso](problemi-di-ottimizzazione-combinatoria/combinatorial-optimization/index.md){ .md-button .md-button--primary }
[:material-star-outline: Esplora i problemi](problemi-scelti/index.md){ .md-button }
[:material-pencil: Esercitati](esercizi/index.md){ .md-button }
[:material-download: Il materiale](materiale.md){ .md-button }

</div>

## Le parti del corso

Le stesse voci del menu: ogni scheda dice a quale parte e a quali capitoli della dispensa corrisponde.

<div class="grid cards" markdown>

-   :material-puzzle-outline: **Ottimizzazione combinatoria**

    ---

    *Parte 1 · Capitolo 1*

    Che cos'è un problema di ottimizzazione combinatoria: categorie, conteggio delle soluzioni, esplosione combinatoria, bound e gap, complessità.

    [:octicons-arrow-right-24: Il capitolo](problemi-di-ottimizzazione-combinatoria/combinatorial-optimization/index.md)

-   :material-star-outline: **Problemi scelti**

    ---

    *Parte 1 · Capitoli 2–8*

    Problemi di zaino · Problemi di packing · Problemi di colorazione · Problemi di cricca · Problemi di routing · Problemi di scheduling · Problemi di lot sizing

    [:octicons-arrow-right-24: Le famiglie](problemi-scelti/index.md)

-   :material-function-variant: **Formulazioni**

    ---

    *Parte 2 · Capitoli 9–15*

    Problemi di zaino · Problemi di packing · Problemi di colorazione · Problemi di cricca · Problemi di routing · Problemi di scheduling · Problemi di lot sizing

    [:octicons-arrow-right-24: I capitoli](formulazioni/index.md)

-   :material-table-arrow-right: **Programmazione dinamica**

    ---

    *Parte 3 · Capitoli 16–28*

    Principi · Problemi di zaino · Problemi di lot sizing · Problemi misti

    [:octicons-arrow-right-24: I capitoli](programmazione-dinamica/index.md)

-   :material-map-marker-path: **Euristiche**

    ---

    *Parte 4 · Capitoli 29–33*

    Definizioni · Euristiche costruttive · Ricerca locale · Metaeuristiche · Euristiche MIP

    [:octicons-arrow-right-24: I capitoli](algoritmi-euristici/index.md)

-   :material-approximately-equal: **Approssimazione**

    ---

    *Parte 5 · Capitoli 34–40*

    Principi · Problemi di zaino · Problemi di packing · Problemi di colorazione · Problemi di cricca · Problemi di routing · Problemi di scheduling

    [:octicons-arrow-right-24: I capitoli](algoritmi-di-approssimazione/index.md)

-   :material-tools: **Algoritmi ad hoc**

    ---

    *Parte 6 · Capitoli 41–42*

    Problemi di zaino · Problemi di colorazione

    [:octicons-arrow-right-24: I capitoli](algoritmi-specializzati/index.md)

-   :material-view-list: **Catalogo**

    ---

    *Tutti i problemi*

    Una pagina per problema, per famiglia: definizione, ipotesi e che cosa fa il corso sul problema.

    [:octicons-arrow-right-24: Il catalogo](catalogo/index.md) · [:material-file-pdf-box: PDF](pdf/catalogo-problemi-combinatori.pdf)

-   :material-gesture-tap: **Laboratorio**

    ---

    *App interattive*

    Gli algoritmi del corso passo per passo, sulle istanze di riferimento o su istanze tue.

    [:octicons-arrow-right-24: Le app](laboratorio/index.md)

-   :simple-googlecolab: **Notebook Colab**

    ---

    *Python · C++*

    Il codice degli algoritmi dei capitoli, da eseguire in Google Colab sugli esempi e sugli esercizi.

    [:octicons-arrow-right-24: I notebook](notebook.md)

</div>

## Come usare queste dispense

- **Sito e PDF.** Ogni capitolo del sito è un capitolo della dispensa, con gli stessi numeri e gli stessi colori; i capitoli lunghi sono divisi in una pagina per sezione o per problema.
- **In testa a ogni capitolo** la barra con la parte, il PDF del volume, gli esercizi e le app del capitolo; in fondo, il link agli esercizi.
- **Per problema.** Il catalogo ha una pagina per ogni problema: la definizione e i capitoli che lo trattano, tecnica per tecnica.
- **Il codice.** Nelle pagine gli algoritmi sono in pseudocodice; i pulsanti «Esegui in Colab» aprono il notebook con il codice in Python e C++.

I box hanno gli stessi colori della dispensa:

<div class="grid" markdown>

!!! definizione "Definizione"
    Il significato preciso di un concetto nuovo.

!!! teorema "Teorema, proposizione, osservazione"
    Un risultato da ricordare, con le sue ipotesi.

!!! esempio "Esempio"
    Un calcolo svolto per intero, un passo alla volta.

!!! formula "Formula"
    In rosa le formule da avere sempre sotto mano (per esempio le ricorrenze della programmazione dinamica).

!!! algoritmo "Algoritmo"
    Lo pseudocodice, passo per passo come nella dispensa.

!!! chiave ""
    **In verde** il punto chiave da portare a casa.

</div>

??? dimostrazione "Dimostrazione: si apre con un clic"
    Le dimostrazioni ci sono tutte, ma chiuse: prima leggi l'enunciato, poi apri la dimostrazione quando vuoi studiarla. Lo stesso vale per le soluzioni degli esercizi.

---

Dello stesso autore:

- **[Programmazione lineare](https://fabiofurini.github.io/programmazione-lineare/)** — poliedri, algoritmo del simplesso, dualità e simplesso duale, con il laboratorio interattivo;
- **[Ottimizzazione convessa](https://fabiofurini.github.io/ottimizzazione-convessa/)** — insiemi e funzioni convesse, problemi di ottimizzazione convessa, con grafici interattivi;
- **[Algoritmi](https://fabiofurini.github.io/algoritmi/)** — rappresentazione dei numeri, pseudocodice, ordinamento e ricerca, analisi e algoritmi ricorsivi;
- **[Programmazione lineare intera](https://fabiofurini.github.io/programmazione-lineare-intera/)** — rilassamento continuo, disuguaglianze valide, piani di taglio, branch-and-bound e branch-and-cut;
- **[Ottimizzazione su reti](https://fabiofurini.github.io/ottimizzazione-su-reti/)** — grafi, alberi ricoprenti, cammini minimi, flussi su reti, simplesso su reti e gestione dei progetti;
- **[Modellazione MIP](https://fabiofurini.github.io/modellazione-mip/)** — modelli di programmazione lineare a variabili intere, dalla formulazione alla soluzione con i solver;
- **[Laboratorio di Ricerca Operativa](https://fabiofurini.github.io/laboratorio-ricerca-operativa/)** — modellazione e risoluzione di problemi di ottimizzazione con Python e i solver;
- **[Analisi Matematica 1](https://fabiofurini.github.io/analisi-matematica-1/)** — numeri reali, funzioni, limiti, derivate e serie, con i grafici interattivi;
- **[Algebra lineare](https://fabiofurini.github.io/algebra-lineare/)** — vettori, matrici, determinanti, sistemi lineari e autovalori, con il laboratorio di calcolo.

Materiale didattico di **[Fabio Furini](https://fabiofurini.github.io/)** —
[DIAG](https://www.diag.uniroma1.it/), Sapienza Università di Roma.

*This website is also available in [English](https://fabiofurini.github.io/combinatorial-optimization/).*
