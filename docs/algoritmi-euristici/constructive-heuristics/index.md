---
title: "Euristiche costruttive"
---

# Euristiche costruttive

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 30** · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-presentation: Slide (1/2)](../../pdf/slide-constructive-heuristics-1.pdf) · [:material-presentation: Slide (2/2)](../../pdf/slide-constructive-heuristics-2.pdf) · [:material-pencil: Esercizi: Euristiche costruttive](../../esercizi/constructive-heuristics.md) · [:material-gesture-tap: App: Euristiche per il bin packing](../../laboratorio/euristiche-bin-packing.md) · [:material-gesture-tap: App: List scheduling e LPT](../../laboratorio/list-scheduling-lpt.md) · [:material-gesture-tap: App: Colorazione: greedy e DSATUR](../../laboratorio/colorazione-greedy-dsatur.md) · [:material-gesture-tap: App: TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, il capitolo [«Algoritmi euristici: definizioni»](../heuristics.md): bound primali e duali, il gap e le quattro istanze di riferimento.

    - Da questo modulo, i capitoli sui problemi: il KP, il BPP, $P\,||\,C_{\max}$, il TSP e il VCP.

!!! chiave "Obiettivi"

    Alla fine di questo capitolo saremo in grado di:

    - applicare l'algoritmo greedy al KP con i tre ordinamenti (profitto, peso, efficienza);

    - eseguire FF, FFD e BFD per il BPP, e LIST e LPT per $P\,||\,C_{\max}$;

    - costruire un giro del TSP con il nearest neighbour e con le euristiche di inserimento;

    - applicare la costruzione randomizzata, l'inserimento con regret e il metodo pilota;

    - confrontare i risultati con i bound duali, e spiegare quando un'euristica costruttiva fallisce.

## 30.1 Euristiche costruttive { #sez-sec-constructive }

<a id="box-1-def-constructive"></a>

!!! definizione "Definizione 30.1: Euristica costruttiva"

    Un'<strong>euristica costruttiva</strong> è un algoritmo euristico che costruisce una soluzione ammissibile passo dopo passo: parte dalla <strong>soluzione parziale</strong> vuota e la estende con un elemento alla volta, finché la soluzione non è completa.

- Gli elementi dipendono dal problema: gli oggetti selezionati per lo zaino, gli assegnamenti degli oggetti ai contenitori e dei lavori alle macchine, gli archi di un giro.

- La qualità del risultato dipende da come si sceglie, a ogni passo, l'elemento da aggiungere (Sezione [30.3](i-problemi-e-le-ipotesi.md#sez-sec-greedy)).

<div class="grid cards sottopagine" markdown>

-   **Panoramica**

    Euristiche costruttive

    [:octicons-arrow-right-24: Apri](#sez-sec-constructive)

-   **I problemi e le ipotesi · Il paradigma greedy**

    Il paradigma greedy

    [:octicons-arrow-right-24: Apri](i-problemi-e-le-ipotesi.md)

-   **30.4 Il problema dello zaino 0/1: quale ordinamento?**

    [:octicons-arrow-right-24: Apri](il-problema-dello-zaino-0-1-quale-ordinamento.md)

-   **30.5 Il problema del bin packing: prima ordinare, poi riempire**

    Best Fit Decreasing · Che cosa dà l'ordinamento, e che cosa non dà

    [:octicons-arrow-right-24: Apri](il-problema-del-bin-packing-prima-ordinare-poi-riempire.md)

-   **30.6 Scheduling su macchine parallele: prima i lavori più lunghi**

    Longest processing time first

    [:octicons-arrow-right-24: Apri](scheduling-su-macchine-parallele-prima-i-lavori-piu-lunghi.md)

-   **30.7 Il problema del commesso viaggiatore: accodare o inserire?**

    Nearest neighbour multi-start · Euristiche di inserimento · Un confronto su un'istanza più grande

    [:octicons-arrow-right-24: Apri](il-problema-del-commesso-viaggiatore-accodare-o-inserire.md)

-   **30.8 Colorazione dei vertici: greedy e DSATUR**

    DSATUR · Che cosa garantisce la colorazione greedy · DSATUR come euristica

    [:octicons-arrow-right-24: Apri](colorazione-dei-vertici-greedy-e-dsatur.md)

-   **30.9 Costruzione randomizzata**

    [:octicons-arrow-right-24: Apri](costruzione-randomizzata.md)

-   **30.10 Look-ahead e regret**

    Look-ahead: il metodo pilota

    [:octicons-arrow-right-24: Apri](look-ahead-e-regret.md)

-   **30.11 Che cosa danno le euristiche costruttive, e che cosa non danno**

    [:octicons-arrow-right-24: Apri](che-cosa-danno-le-euristiche-costruttive-e-che-cosa-non-dann.md)

-   **Errori tipici · In sintesi**

    In sintesi

    [:octicons-arrow-right-24: Apri](errori-tipici.md)

</div>

---

**Avanti:** [I problemi e le ipotesi · Il paradigma greedy](i-problemi-e-le-ipotesi.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Euristiche costruttive](../../esercizi/constructive-heuristics.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Euristiche per il bin packing](../../laboratorio/euristiche-bin-packing.md), [List scheduling e LPT](../../laboratorio/list-scheduling-lpt.md), [Colorazione: greedy e DSATUR](../../laboratorio/colorazione-greedy-dsatur.md), [TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md).