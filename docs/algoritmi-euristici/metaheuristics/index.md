---
title: "Metaeuristiche"
---

# Metaeuristiche

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 32** · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-pencil: Esercizi: Metaeuristiche](../../esercizi/metaheuristics.md) · [:material-gesture-tap: App: TSP: simulated annealing e tabu search](../../laboratorio/simulated-annealing-tabu-search.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, il capitolo [«Ricerca locale»](../local-search/index.md): intorni, first e best improvement, variable neighbourhood descent e multi-start.

    - Da questo modulo, i capitoli [«Euristiche costruttive»](../constructive-heuristics/index.md) (costruzione randomizzata) e [«Algoritmi euristici: definizioni»](../heuristics.md) (intensificazione e diversificazione, valutazione sperimentale).

!!! chiave "Obiettivi"

    Alla fine di questo capitolo saremo in grado di:

    - eseguire a mano simulated annealing, tabu search, iterated local search e variable neighbourhood search, con numeri casuali assegnati;

    - eseguire GRASP, large neighbourhood search e un algoritmo genetico o memetico su istanze piccole;

    - spiegare come ciascun metodo esce da un ottimo locale, e quali parametri lo regolano;

    - confrontare i metodi sulle stesse istanze, con più semi;

    - dire che cosa le metaeuristiche non danno: un bound duale.

## 32.1 Metaeuristiche { #sez-sec-metaheuristic }

<a id="box-1-def-metaheuristic"></a>

!!! definizione "Definizione 32.1: Metaeuristica"

    Una <strong>metaeuristica</strong> è una strategia generale che guida una ricerca locale oltre il primo ottimo locale, per esplorare altre regioni dell'insieme delle soluzioni ammissibili.

- Una metaeuristica è uno <em>schema</em>, non un algoritmo: un algoritmo si ottiene scegliendo la rappresentazione, gli intorni, la ricerca locale e i parametri.

- Ogni metaeuristica bilancia <strong>intensificazione</strong> e <strong>diversificazione</strong>, definite nel capitolo [«Algoritmi euristici: definizioni»](../heuristics.md).

!!! chiave ""

    Una ricerca locale si ferma nel primo ottimo locale; una metaeuristica ne esce accettando soluzioni peggiori, saltando a una nuova soluzione di partenza, o combinando più soluzioni buone.

<div class="grid cards sottopagine" markdown>

-   **Panoramica**

    Metaeuristiche

    [:octicons-arrow-right-24: Apri](#sez-sec-metaheuristic)

-   **32.2 I problemi e le ipotesi**

    Numeri casuali · Le istanze

    [:octicons-arrow-right-24: Apri](i-problemi-e-le-ipotesi.md)

-   **Come uscire da un ottimo locale · Simulated annealing**

    Lo schema di raffreddamento e i parametri · Esempi · Soluzioni inammissibili: simulated annealing con penalità · Un esperimento sull'istanza media del TSP · Proprietà

    [:octicons-arrow-right-24: Apri](come-uscire-da-un-ottimo-locale.md)

-   **32.5 Tabu search**

    Tabu search per il TSP, e l'effetto della durata tabu

    [:octicons-arrow-right-24: Apri](tabu-search.md)

-   **32.6 Iterated local search**

    [:octicons-arrow-right-24: Apri](iterated-local-search.md)

-   **32.7 Variable neighbourhood search**

    [:octicons-arrow-right-24: Apri](variable-neighbourhood-search.md)

-   **32.8 GRASP**

    [:octicons-arrow-right-24: Apri](grasp.md)

-   **32.9 Large neighbourhood search**

    Adaptive large neighbourhood search

    [:octicons-arrow-right-24: Apri](large-neighbourhood-search.md)

-   **32.10 Metodi basati su popolazioni: algoritmi genetici e memetici**

    [:octicons-arrow-right-24: Apri](metodi-basati-su-popolazioni-algoritmi-genetici-e-memetici.md)

-   **32.11 Confronto e conclusioni**

    Intensificazione e diversificazione · Parametri e calibrazione · Che cosa questi metodi non usano

    [:octicons-arrow-right-24: Apri](confronto-e-conclusioni.md)

-   **Errori tipici · In sintesi**

    In sintesi

    [:octicons-arrow-right-24: Apri](errori-tipici.md)

-   **Bibliografia**

    [:octicons-arrow-right-24: Apri](bibliografia.md)

</div>

---

**Avanti:** [32.2 I problemi e le ipotesi](i-problemi-e-le-ipotesi.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Metaeuristiche](../../esercizi/metaheuristics.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [TSP: simulated annealing e tabu search](../../laboratorio/simulated-annealing-tabu-search.md).