---
title: "Errori tipici · In sintesi"
---

# Errori tipici · In sintesi

<div class="info-capitolo" markdown>

**Parte 3 · Programmazione dinamica · Capitolo 28** · [:material-book-open-variant: Capitolo 28: Taglio delle aste (RCP)](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-programmazione-dinamica.pdf) · [:material-presentation: Slide](../../pdf/slide-dp-rod-cutting.pdf) · [:material-pencil: Esercizi: Taglio delle aste (RCP)](../../esercizi/dp-rod-cutting.md)

</div>

## 28.4 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Contare i vettori invece degli schemi di taglio.</strong> I $2^{n-1}$ schemi di taglio di una barra di lunghezza $n$ sono più dei vettori soluzione quando $n\ge 3$, perché schemi diversi possono dare lo stesso vettore.

    - <strong>Dimenticare il caso base.</strong> $v(0)=0$ si usa quando il primo pezzo ha la lunghezza dell'intera barra: $v(\ell)$ contiene il termine $p_\ell+v(0)$.

    - <strong>Usare la riga $j-1$ nella seconda ricorrenza.</strong> Il termine $p_j+v(j,\ell-j)$ resta nella riga $j$: altrimenti ogni lunghezza dei pezzi si potrebbe tagliare una sola volta.

    - <strong>Fermare la ricostruzione troppo presto.</strong> La regola $x_{{s}[\ell]}\leftarrow x_{{s}[\ell]}+1$, $\ell\leftarrow\ell-{s}[\ell]$ si ripete finché $\ell=0$; l'ultimo pezzo completa la barra.

## 28.5 In sintesi

!!! chiave "In sintesi"

    - L'RCP chiede come tagliare una barra di lunghezza $n$ in pezzi, con ogni lunghezza disponibile un numero qualsiasi di volte, per massimizzare il profitto totale.

    - La ricorrenza $v(\ell)=\max_{j\le\ell}\{p_j+v(\ell-j)\}$ ha sottostruttura ottima e sottoproblemi sovrapposti, e $v(0)=0$.

    - Il vettore $v$ si riempie bottom-up in $\Theta(n^2)$ passi, un numero polinomiale perché l'input contiene $n$ profitti.

    - Il vettore ${s}$ dei primi pezzi dà una soluzione ottima per ogni lunghezza della barra senza costi aggiuntivi.

    <strong>Quadro riassuntivo dell'esempio dell'RCP.</strong> [Esempio 28.1](index.md#box-1-texexpbox1) (barra di lunghezza $4$):

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Metodo</th>
    <th>Lower bound</th>
    <th>Upper bound</th>
    <th>Origine</th>
    </tr>
    <tr>
    <td>Algoritmo di PD</td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td>valore ottimo, due pezzi di lunghezza <span class="arithmatex">\(2\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Taglio delle aste (RCP)](../../esercizi/dp-rod-cutting.md)

