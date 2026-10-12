---
hide:
  - navigation
---

# Laboratorio interattivo

Qui l'ottimizzazione combinatoria si tocca con mano: ogni app esegue un algoritmo passo per passo sulle istanze di riferimento del corso,
che si possono anche cambiare. Scegli un'app: si apre a tutta pagina. Tutto gira nel browser; i numeri sono calcolati dall'algoritmo, non scritti a mano.

## Problemi di ottimizzazione combinatoria

<div class="grid cards" markdown>

-   :material-format-list-checks: **Forza bruta sul problema dello zaino 0/1**

    ---

    Tutti i 2ⁿ sottoinsiemi degli oggetti, uno alla volta: quali sono ammissibili, il migliore trovato e l'esplosione combinatoria.

    [Apri l'app →](zaino-forza-bruta.md)

</div>

## Formulazioni dei problemi e loro proprietà

<div class="grid cards" markdown>

-   :material-chart-bar: **Rilassamento continuo e upper bound per lo zaino 0/1**

    ---

    Gli oggetti per efficienza, l'oggetto critico tagliato dalla capacità, la soluzione del rilassamento e i bound di Dantzig e di Martello-Toth.

    [Apri l'app →](zaino-rilassamento-bound.md)

</div>

## Programmazione dinamica

<div class="grid cards" markdown>

-   :material-table-large: **Tabelle della PD per i problemi di zaino**

    ---

    Zaino 0/1, illimitato, limitato e subset sum: la tabella si riempie una cella alla volta, con le celle da cui dipende; poi la ricostruzione della soluzione.

    [Apri l'app →](tabella-pd-zaino.md)

-   :material-factory: **Wagner-Whitin per il lot sizing senza capacità**

    ---

    La ricorrenza v(t) prova tutti i periodi dell'ultima produzione: un cammino minimo nella rete dei lotti di produzione, poi il piano ottimo.

    [Apri l'app →](wagner-whitin-lot-sizing.md)

</div>

## Algoritmi euristici

<div class="grid cards" markdown>

-   :material-package-variant-closed: **Euristiche per il bin packing**

    ---

    Next Fit, First Fit, Best Fit, Worst Fit e FFD passo per passo, con il bound e l'ottimo. In «Impacchetti tu» provi a battere l'algoritmo.

    [Apri l'app →](euristiche-bin-packing.md)

-   :material-graph-outline: **Colorazione: greedy e DSATUR**

    ---

    Il grafo si colora vertice per vertice con il greedy e con DSATUR: Petersen, grafo a corona o grafo casuale.

    [Apri l'app →](colorazione-greedy-dsatur.md)

-   :material-map-marker-path: **TSP: nearest neighbour e 2-opt**

    ---

    Il giro si costruisce città per città e poi il 2-opt lo migliora: sull'istanza del corso o nel piano, con le città da trascinare.

    [Apri l'app →](tsp-nn-2opt.md)

-   :material-fire: **TSP: simulated annealing e tabu search**

    ---

    Le due metaeuristiche con il 2-opt, sull'istanza di riferimento, su TSP20 e sull'istanza degli esercizi, con i numeri casuali delle note: giro corrente, miglior giro e curva delle lunghezze.

    [Apri l'app →](simulated-annealing-tabu-search.md)

-   :material-chart-gantt: **List scheduling e LPT**

    ---

    Il diagramma di Gantt si costruisce lavoro per lavoro; accanto il bound max{max t_j, ⌈Σ t_j / m⌉} e l'ottimo.

    [Apri l'app →](list-scheduling-lpt.md)

</div>

## Algoritmi di approssimazione

<div class="grid cards" markdown>

-   :material-approximately-equal: **Zaino 0/1: greedy, Ext-Greedy, H² e FPTAS**

    ---

    Gli algoritmi di approssimazione del capitolo passo per passo, con il rapporto z(I)/A(I); nell'FPTAS i profitti scalati e la PD sui profitti.

    [Apri l'app →](zaino-approssimazione.md)

-   :material-vector-polyline: **TSP metrico: double tree e Christofides**

    ---

    Albero ricoprente minimo, accoppiamento dei vertici dispari, circuito euleriano e scorciatoie, sull'istanza di riferimento, sugli esercizi e sulle famiglie tight.

    [Apri l'app →](tsp-metrico-double-tree-christofides.md)

-   :material-target: **Istanze tight**

    ---

    Next Fit, greedy esteso e LPT su famiglie di istanze: il rapporto con l'ottimo si avvicina alla garanzia, che non si può migliorare.

    [Apri l'app →](istanze-tight.md)

</div>

## Algoritmi ad hoc

<div class="grid cards" markdown>

-   :material-file-tree: **Branch-and-bound per lo zaino**

    ---

    L'albero cresce nodo per nodo, con i bound di Dantzig, le potature e l'incumbent.

    [Apri l'app →](branch-and-bound-zaino.md)

-   :material-file-tree-outline: **Colorazione: il branch-and-bound DSATUR**

    ---

    L'albero delle colorazioni parziali nodo per nodo: vertice più saturo, un figlio per colore ammissibile più un colore nuovo, potatura con q ≥ UB.

    [Apri l'app →](branch-and-bound-dsatur.md)

</div>
