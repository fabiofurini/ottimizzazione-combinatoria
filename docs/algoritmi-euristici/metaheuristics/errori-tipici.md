---
title: "Errori tipici · In sintesi"
---

# Errori tipici · In sintesi

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 32** · [:material-book-open-variant: Capitolo 32: Metaeuristiche](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-pencil: Esercizi: Metaeuristiche](../../esercizi/metaheuristics.md) · [:material-gesture-tap: App: TSP: simulated annealing e tabu search](../../laboratorio/simulated-annealing-tabu-search.md)

</div>

## 32.12 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Riportare una sola esecuzione.</strong> I risultati dipendono dal seme: riportare minimo, media e massimo su più esecuzioni.

    - <strong>Calibrare e valutare sulle stesse istanze.</strong> Il quadro è ottimistico; usare istanze di addestramento per i parametri e istanze diverse per la valutazione.

    - <strong>Perdere la soluzione migliore.</strong> Nel simulated annealing e nella tabu search la soluzione corrente può essere peggiore della migliore trovata: la migliore va memorizzata a parte.

    - <strong>Scegliere la durata tabu senza provarla.</strong> Con durata $0$ la tabu search è una ricerca locale; una durata troppo piccola cicla, una troppo grande vieta quasi ogni mossa.

    - <strong>Contare male i numeri casuali.</strong> Ogni iterazione ne consuma un numero fisso (dieci nell'algoritmo genetico degli esercizi, con $n=5$); un conteggio sbagliato cambia tutti i passi successivi.

## 32.13 In sintesi

!!! chiave "In sintesi"

    - Una metaeuristica esce dagli ottimi locali accettando soluzioni peggiori (SA, TS), perturbando (ILS, VNS), randomizzando la costruzione (GRASP), distruggendo e riparando (LNS) o ricombinando una popolazione (GA).

    - Ogni metodo bilancia intensificazione e diversificazione con pochi parametri, e i risultati ne dipendono fortemente.

    - Non usano rilassamenti: producono solo bound primali, e non possono dire quanto siano buone le loro soluzioni.

    <strong>Quadro riassuntivo delle istanze medie.</strong> Miglior valore dei metodi a confronto con l'ottimo (l'ottimo calcolato da un algoritmo esatto):

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>istanza</th>
    <th>costruttiva</th>
    <th>ricerca locale</th>
    <th>migliore metaeuristica</th>
    <th>ottimo</th>
    </tr>
    <tr>
    <td>TSP20 (min)</td>
    <td><span class="arithmatex">\(326\)</span> (<span class="arithmatex">\(NN\)</span>)</td>
    <td><span class="arithmatex">\(319\)</span> (2-opt)</td>
    <td><span class="arithmatex">\(291\)</span></td>
    <td><span class="arithmatex">\(291\)</span></td>
    </tr>
    <tr>
    <td>KP20 (max)</td>
    <td><span class="arithmatex">\(490\)</span> (greedy)</td>
    <td><span class="arithmatex">\(514\)</span></td>
    <td><span class="arithmatex">\(521\)</span></td>
    <td><span class="arithmatex">\(521\)</span></td>
    </tr>
    <tr>
    <td>PCM15 (min)</td>
    <td><span class="arithmatex">\(73\)</span> (<span class="arithmatex">\(LPT\)</span>)</td>
    <td>—</td>
    <td><span class="arithmatex">\(69\)</span></td>
    <td><span class="arithmatex">\(69\)</span></td>
    </tr>
    <tr>
    <td>BPP24 (min)</td>
    <td><span class="arithmatex">\(10\)</span> (FFD)</td>
    <td>—</td>
    <td><span class="arithmatex">\(9\)</span></td>
    <td><span class="arithmatex">\(9\)</span></td>
    </tr>
    </table></div>

---

**Avanti:** [Bibliografia](bibliografia.md)
