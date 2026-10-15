---
title: "Errori tipici · In sintesi"
---

# Errori tipici · In sintesi

<div class="info-capitolo" markdown>

**Parte 3 · Programmazione dinamica · Capitolo 18** · [:material-book-open-variant: Capitolo 18: Zaino illimitato (UKP)](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-programmazione-dinamica.pdf) · [:material-presentation: Slide](../../pdf/slide-dp-unbounded-knapsack.pdf) · [:material-pencil: Esercizi: Zaino illimitato (UKP)](../../esercizi/dp-unbounded-knapsack.md) · [:material-gesture-tap: App: Tabelle della PD per i problemi di zaino](../../laboratorio/tabella-pd-zaino.md)

</div>

## 18.4 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Usare la riga $j-1$ nella seconda ricorrenza.</strong> Il termine $p_j+v(j,k-w_j)$ si riferisce alla stessa riga $j$: è questo che consente più copie del tipo di oggetto $j$.

    - <strong>Supporre che la capacità sia riempita.</strong> Una parte della capacità può restare inutilizzata: quando nessun tipo di oggetto entra, $v(k)=0$, non $-\infty$; nell'[Esempio 18.1](index.md#box-1-texukpex1), $v(1)=0$.

    - <strong>Ricostruire oltre la fine.</strong> La ricostruzione si ferma quando la capacità residua è $0$, oppure quando $s[k]=0$ nel primo algoritmo di PD e $j=0$ nel secondo; altrimenti si legge fuori dai vettori.

    - <strong>Dimenticare il caso base.</strong> $v(0)=0$, e $v[0..c]$ ha $c+1$ celle, non $c$.

## 18.5 In sintesi

!!! chiave "In sintesi"

    - Nell'UKP un tipo di oggetto si può usare un numero qualsiasi di volte, quindi il valore ottimo dipende solo dalla capacità residua: $v(k)=\max_{j:\,w_j\le k}\{p_j+v(k-w_j)\}$.

    - Il primo algoritmo di PD riempie un vettore di $c+1$ celle in $\Theta(nc)$ passi; il secondo riempie la matrice $v(j,k)$ e riusa la stessa riga per le copie successive.

    - Una soluzione ottima si legge all'indietro dalle informazioni memorizzate, fermandosi quando la capacità residua è nulla o inutilizzata.

    - Il tempo di esecuzione è pseudopolinomiale, come per il KP.

    <strong>Cruscotto dell'esempio dell'UKP.</strong> L'[Esempio 18.1](index.md#box-1-texukpex1) ($c=7$, quattro tipi di oggetto):

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Metodo</th>
    <th>Lower bound</th>
    <th>Upper bound</th>
    <th>Origine</th>
    </tr>
    <tr>
    <td>Algoritmo di PD</td>
    <td><span class="arithmatex">\(14\)</span></td>
    <td><span class="arithmatex">\(14\)</span></td>
    <td>valore ottimo, soluzione <span class="arithmatex">\((1,0,1,0)\)</span></td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Zaino illimitato (UKP)](../../esercizi/dp-unbounded-knapsack.md)

