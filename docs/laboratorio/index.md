---
hide:
  - navigation
---

# Laboratorio interattivo

Qui l'ottimizzazione combinatoria si tocca con mano: ogni app esegue un algoritmo passo per passo sulle istanze di riferimento del corso,
che si possono anche cambiare. Scegli un'app: si apre a tutta pagina. Tutto gira nel browser; i numeri sono calcolati dall'algoritmo, non scritti a mano.

## Problemi

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
