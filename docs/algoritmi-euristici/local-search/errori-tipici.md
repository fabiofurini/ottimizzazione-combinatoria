---
title: "Errori tipici · In sintesi"
---

# Errori tipici · In sintesi

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 31** · [:material-book-open-variant: Capitolo 31: Ricerca locale](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-pencil: Esercizi: Ricerca locale](../../esercizi/local-search.md) · [:material-gesture-tap: App: TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md)

</div>

## 31.13 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Dimenticare che un ottimo locale dipende dall'intorno.</strong> La soluzione di $LPT$ è un ottimo locale per move, ma non per swap.

    - <strong>Usare il numero di contenitori come unico obiettivo.</strong> È cieco: la maggior parte dei vicini ha lo stesso valore, e la ricerca si ferma su un plateau; l'obiettivo ausiliario $SQ$ li distingue.

    - <strong>Ignorare l'ordine di esame.</strong> Le mosse sono esaminate in un ordine fissato e i pareggi vanno alla prima esaminata (nell'[Esempio 31.6](paesaggi-piatti-e-obiettivi-ausiliari.md#box-12-ex-bppff) l'oggetto $3$ viene prima dell'oggetto $5$).

    - <strong>Calcolare il $\Delta$ sbagliato per una mossa 2-opt.</strong> Contano solo i due lati tolti e i due lati aggiunti; i due lati tolti non possono avere una città in comune.

    - <strong>Concludere che un ottimo locale è ottimo.</strong> Solo un bound duale può dirlo.

## 31.14 In sintesi

!!! chiave "In sintesi"

    - Una ricerca locale si sposta su un vicino migliore finché ne esiste uno: restituisce un ottimo locale, un bound primale migliore.

    - First improvement è più veloce a ogni passo, best improvement prende il guadagno massimo; entrambe si fermano in un ottimo locale dell'intorno.

    - Valutazione incrementale, obiettivi ausiliari e penalità rendono la ricerca veloce e capace di attraversare plateau e regioni non ammissibili.

    - La variable neighbourhood descent e il multi-start allargano ciò che la ricerca può raggiungere, ma le ripartenze non hanno memoria.

    <strong>Quadro delle istanze di riferimento.</strong> Soluzione di partenza e ottimo locale:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>problema</th>
    <th>partenza</th>
    <th>ricerca locale</th>
    <th><span class="arithmatex">\(z(I)\)</span></th>
    </tr>
    <tr>
    <td>TSP</td>
    <td><span class="arithmatex">\(25\)</span> (<span class="arithmatex">\(NN\)</span>)</td>
    <td><span class="arithmatex">\(18\)</span> (2-opt)</td>
    <td><span class="arithmatex">\(18\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(P\,||\,C_{\max}\)</span></td>
    <td><span class="arithmatex">\(11\)</span> (<span class="arithmatex">\(LPT\)</span>)</td>
    <td><span class="arithmatex">\(9\)</span> (swap, <span class="arithmatex">\(=\mathrm{LB}(I)\)</span>)</td>
    <td><span class="arithmatex">\(9\)</span></td>
    </tr>
    <tr>
    <td>BPP</td>
    <td><span class="arithmatex">\(4\)</span> (<span class="arithmatex">\(FF\)</span>)</td>
    <td><span class="arithmatex">\(3\)</span> (move, <span class="arithmatex">\(SQ\)</span>)</td>
    <td><span class="arithmatex">\(3\)</span></td>
    </tr>
    </table></div>

    I bound duali vengono dal capitolo [«Algoritmi euristici: definizioni»](../heuristics.md): la sola ricerca locale non certifica il suo risultato.

---

**Esercizi su questo capitolo:** [:material-pencil: Ricerca locale](../../esercizi/local-search.md)

