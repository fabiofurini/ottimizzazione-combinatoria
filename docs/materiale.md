---
title: Materiale
---

# Materiale

Le dispense, gli eserciziari e il catalogo dei problemi in PDF, con la stessa numerazione di definizioni, teoremi, esempi ed esercizi del sito, e i notebook Colab con il codice degli algoritmi. Testo e figure sono rilasciati con licenza [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/deed.it), il codice con licenza MIT.

## Dispense

<div class="tabella-download" markdown>

| Volume | Contenuto | Capitoli | File |
|---|---|:---:|---|
| 1. Problemi di ottimizzazione combinatoria | I problemi di ottimizzazione combinatoria e le loro famiglie: problemi di zaino, di packing, di colorazione, di cricca, di routing, di scheduling e di lot sizing. Per ogni problema: definizione, ipotesi, istanze, conteggio delle soluzioni, una prima soluzione a mano e un bound semplice. | 1–8 | [:material-file-pdf-box: PDF](pdf/dispensa-1-problemi-di-ottimizzazione-combinatoria.pdf) (0.8 MB) |
| 2. Formulazioni dei problemi e loro proprietà | I modelli di programmazione lineare intera dei problemi del volume 1, i loro rilassamenti lineari e i duali, i bound che ne derivano e il confronto fra formulazioni più deboli e più forti. | 9–15 | [:material-file-pdf-box: PDF](pdf/dispensa-2-formulazioni.pdf) (1.0 MB) |
| 3. Programmazione dinamica | I principi della programmazione dinamica e gli algoritmi di PD per i problemi di zaino, il lot sizing, il cambio monete e il taglio delle aste: ricorrenze, pseudocodice, complessità e tabelle svolte. | 16–28 | [:material-file-pdf-box: PDF](pdf/dispensa-3-programmazione-dinamica.pdf) (1.3 MB) |
| 4. Algoritmi euristici | Algoritmi euristici: euristiche costruttive, ricerca locale, metaeuristiche ed euristiche basate sulla programmazione lineare intera, applicate ai problemi del corso. | 29–33 | [:material-file-pdf-box: PDF](pdf/dispensa-4-algoritmi-euristici.pdf) (1.7 MB) |
| 5. Algoritmi di approssimazione | Algoritmi di approssimazione: rapporti di prestazione e schemi di approssimazione, con algoritmi e analisi del caso peggiore per lo zaino, il bin packing, il TSP metrico e lo scheduling su macchine parallele, e i limiti dell'approssimazione per la colorazione dei vertici, la cricca massima e il TSP generale. | 34–40 | [:material-file-pdf-box: PDF](pdf/dispensa-5-algoritmi-di-approssimazione.pdf) (1.1 MB) |
| 6. Algoritmi ad hoc | Algoritmi ad hoc: il branch-and-bound sull'elemento critico per il problema dello zaino 0/1 e il branch-and-bound DSATUR per la colorazione dei vertici. | 41–42 | [:material-file-pdf-box: PDF](pdf/dispensa-6-algoritmi-specializzati.pdf) (0.5 MB) |

</div>

## Eserciziari

<div class="tabella-download" markdown>

| Volume | Contenuto | Capitoli | File |
|---|---|:---:|---|
| 1. Problemi di ottimizzazione combinatoria | Ottimizzazione combinatoria · Problemi di zaino · Problemi di packing · Problemi di colorazione · Problemi di cricca · Problemi di routing · Problemi di scheduling · Problemi di lot sizing | 1–8 | [:material-file-pdf-box: PDF](pdf/esercizi-1-problemi-di-ottimizzazione-combinatoria.pdf) (0.6 MB) |
| 2. Formulazioni dei problemi e loro proprietà | Problemi di zaino · Problemi di packing · Problemi di colorazione · Problemi di cricca · Problemi di routing · Problemi di scheduling · Problemi di lot sizing | 9–15 | [:material-file-pdf-box: PDF](pdf/esercizi-2-formulazioni.pdf) (0.6 MB) |
| 3. Programmazione dinamica | Principi · Problemi di zaino · Problemi di lot sizing · Problemi misti | 16–28 | [:material-file-pdf-box: PDF](pdf/esercizi-3-programmazione-dinamica.pdf) (1.0 MB) |
| 4. Algoritmi euristici | Definizioni · Euristiche costruttive · Ricerca locale · Metaeuristiche · Euristiche MIP | 29–33 | [:material-file-pdf-box: PDF](pdf/esercizi-4-algoritmi-euristici.pdf) (0.7 MB) |
| 5. Algoritmi di approssimazione | Principi · Problemi di zaino · Problemi di packing · Problemi di colorazione · Problemi di cricca · Problemi di routing · Problemi di scheduling | 34–40 | [:material-file-pdf-box: PDF](pdf/esercizi-5-algoritmi-di-approssimazione.pdf) (0.7 MB) |
| 6. Algoritmi ad hoc | Problemi di zaino · Problemi di colorazione | 41–42 | [:material-file-pdf-box: PDF](pdf/esercizi-6-algoritmi-specializzati.pdf) (0.5 MB) |

</div>

## Catalogo dei problemi

<div class="tabella-download" markdown>

| | Contenuto | File |
|---|---|---|
| [Catalogo dei problemi di ottimizzazione combinatoria](catalogo/index.md) | Tutti i problemi definiti nel corso, raggruppati per famiglia: per ciascuno la definizione, le ipotesi e che cosa fa il corso sul problema, tecnica per tecnica. | [:material-file-pdf-box: PDF](pdf/catalogo-problemi-combinatori.pdf) (0.6 MB) |

</div>

## Notebook Colab

Il codice dei capitoli sugli algoritmi, un notebook per capitolo e per linguaggio, da eseguire in Google Colab o da scaricare (link **.ipynb**). Come si usano: [la pagina dei notebook](notebook.md).

<div class="tabella-notebook" markdown>

| Capitolo | Python | C++ |
|---|:---:|:---:|
| [30. Euristiche costruttive](algoritmi-euristici/constructive-heuristics/index.md) | [![Apri in Colab (Python)](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_python.ipynb) [.ipynb](https://github.com/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_python.ipynb) | [![Apri in Colab (C++)](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_cpp.ipynb) [.ipynb](https://github.com/fabiofurini/combinatorial-optimization/blob/main/notebooks/constructive-heuristics_cpp.ipynb) |
| [31. Ricerca locale](algoritmi-euristici/local-search/index.md) | [![Apri in Colab (Python)](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_python.ipynb) [.ipynb](https://github.com/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_python.ipynb) | [![Apri in Colab (C++)](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_cpp.ipynb) [.ipynb](https://github.com/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_cpp.ipynb) |
| [32. Metaeuristiche](algoritmi-euristici/metaheuristics/index.md) | [![Apri in Colab (Python)](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/metaheuristics_python.ipynb) [.ipynb](https://github.com/fabiofurini/combinatorial-optimization/blob/main/notebooks/metaheuristics_python.ipynb) | [![Apri in Colab (C++)](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/metaheuristics_cpp.ipynb) [.ipynb](https://github.com/fabiofurini/combinatorial-optimization/blob/main/notebooks/metaheuristics_cpp.ipynb) |
| [33. Euristiche MIP per i problemi classici](algoritmi-euristici/mip-heuristics-classical.md) | [![Apri in Colab (Python)](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/mip-heuristics-classical_python.ipynb) [.ipynb](https://github.com/fabiofurini/combinatorial-optimization/blob/main/notebooks/mip-heuristics-classical_python.ipynb) |  |
| [35. Algoritmi di approssimazione per lo zaino](algoritmi-di-approssimazione/knapsack-approximation.md) | [![Apri in Colab (Python)](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/knapsack-approximation_python.ipynb) [.ipynb](https://github.com/fabiofurini/combinatorial-optimization/blob/main/notebooks/knapsack-approximation_python.ipynb) | [![Apri in Colab (C++)](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/knapsack-approximation_cpp.ipynb) [.ipynb](https://github.com/fabiofurini/combinatorial-optimization/blob/main/notebooks/knapsack-approximation_cpp.ipynb) |
| [36. Algoritmi di approssimazione per il bin packing](algoritmi-di-approssimazione/bin-packing-approximation.md) | [![Apri in Colab (Python)](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/bin-packing-approximation_python.ipynb) [.ipynb](https://github.com/fabiofurini/combinatorial-optimization/blob/main/notebooks/bin-packing-approximation_python.ipynb) | [![Apri in Colab (C++)](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/bin-packing-approximation_cpp.ipynb) [.ipynb](https://github.com/fabiofurini/combinatorial-optimization/blob/main/notebooks/bin-packing-approximation_cpp.ipynb) |

</div>
