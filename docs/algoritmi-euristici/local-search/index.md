---
title: "Ricerca locale"
---

# Ricerca locale

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 31** · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-presentation: Slide (1/2)](../../pdf/slide-local-search-1.pdf) · [:material-presentation: Slide (2/2)](../../pdf/slide-local-search-2.pdf) · [:material-pencil: Esercizi: Ricerca locale](../../esercizi/local-search.md) · [:material-gesture-tap: App: TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, il capitolo [«Algoritmi euristici: definizioni»](../heuristics.md): intorni, ottimi locali, intensificazione e diversificazione.

    - Da questo modulo, il capitolo [«Euristiche costruttive»](../constructive-heuristics/index.md): le soluzioni di partenza usate qui.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo saremo in grado di:

    - definire gli intorni del KP, del BPP, del TSP e di $P\,||\,C_{\max}$;

    - eseguire una ricerca locale con le regole first improvement e best improvement;

    - valutare una mossa in modo incrementale, in $O(1)$ per la mossa 2-opt;

    - uscire da un plateau con un obiettivo ausiliario, e gestire le soluzioni non ammissibili con una penalità;

    - combinare più intorni (variable neighbourhood descent) e più ripartenze (multi-start).

## 31.1 Ricerca locale { #sez-sec-ls }

<a id="box-1-def-ls"></a>

!!! definizione "Definizione 31.1: Ricerca locale"

    Dato un intorno $N$, una <strong>ricerca locale</strong> (indicata con $LS$) è un'euristica di miglioramento. Parte da una soluzione ammissibile e, a ogni iterazione, cerca nell'intorno della soluzione corrente una soluzione <em>migliore</em>. Se la trova, si sposta su di essa e ripete; se nessun vicino è migliore, la soluzione corrente è un ottimo locale rispetto a $N$ e la ricerca si ferma.

- L'<strong>intorno</strong> $N(S)$ di una soluzione ammissibile $S$, la <strong>mossa</strong> da $S$ a un vicino e l'<strong>ottimo locale</strong> rispetto a $N$ sono definiti nel capitolo [«Algoritmi euristici: definizioni»](../heuristics.md).

!!! chiave ""

    Una ricerca locale migliora una soluzione ammissibile spostandosi da una soluzione a un vicino migliore, e si ferma in un ottimo locale rispetto a $N$.

<div class="grid cards sottopagine" markdown>

-   **Panoramica**

    Ricerca locale

    [:octicons-arrow-right-24: Apri](#sez-sec-ls)

-   **31.2 I problemi, le ipotesi e le soluzioni di partenza**

    [:octicons-arrow-right-24: Apri](i-problemi-le-ipotesi-e-le-soluzioni-di-partenza.md)

-   **Ricerca locale: lo schema · Intorni per i quattro problemi**

    KP: flip e swap · BPP: move e swap · TSP: 2-opt e Or-opt · P\,||\,Cmax: move e swap · Riepilogo

    [:octicons-arrow-right-24: Apri](ricerca-locale-lo-schema.md)

-   **31.5 First improvement e best improvement**

    Best improvement · Confronto

    [:octicons-arrow-right-24: Apri](first-improvement-e-best-improvement.md)

-   **31.6 Valutare una mossa in modo incrementale**

    [:octicons-arrow-right-24: Apri](valutare-una-mossa-in-modo-incrementale.md)

-   **31.7 TSP: 2-opt e Or-opt**

    La ricerca locale Or-opt · First e best improvement su un'istanza media · 3-opt e Lin–Kernighan

    [:octicons-arrow-right-24: Apri](tsp-2-opt-e-or-opt.md)

-   **31.8 $P\,||\,C_{\max}$: move e swap**

    La ricerca locale swap

    [:octicons-arrow-right-24: Apri](p-cmax-move-e-swap.md)

-   **31.9 Paesaggi piatti e obiettivi ausiliari**

    L'obiettivo ausiliario · La ricerca locale move per il BPP · La ricerca locale swap per il BPP · Proprietà dell'obiettivo ausiliario · Esempi

    [:octicons-arrow-right-24: Apri](paesaggi-piatti-e-obiettivi-ausiliari.md)

-   **31.10 KP: ammissibilità e penalità**

    Penalizzare il peso in eccesso

    [:octicons-arrow-right-24: Apri](kp-ammissibilita-e-penalita.md)

-   **31.11 Variable neighbourhood descent**

    [:octicons-arrow-right-24: Apri](variable-neighbourhood-descent.md)

-   **31.12 Ricerca locale multi-start**

    Che cosa dà la ricerca locale, e che cosa non dà

    [:octicons-arrow-right-24: Apri](ricerca-locale-multi-start.md)

-   **Errori tipici · In sintesi**

    In sintesi

    [:octicons-arrow-right-24: Apri](errori-tipici.md)

</div>

---

**Avanti:** [31.2 I problemi, le ipotesi e le soluzioni di partenza](i-problemi-le-ipotesi-e-le-soluzioni-di-partenza.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Ricerca locale](../../esercizi/local-search.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md).