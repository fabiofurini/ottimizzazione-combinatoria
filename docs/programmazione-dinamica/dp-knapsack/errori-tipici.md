---
title: "Errori tipici · In sintesi"
---

# Errori tipici · In sintesi

<div class="info-capitolo" markdown>

**Parte 3 · Programmazione dinamica · Capitolo 17** · [:material-book-open-variant: Capitolo 17: Zaino 0/1 (KP)](index.md) · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../../pdf/dispensa-3-programmazione-dinamica.pdf) · [:material-presentation: Slide (1/2)](../../pdf/slide-dp-knapsack-1.pdf) · [:material-presentation: Slide (2/2)](../../pdf/slide-dp-knapsack-2.pdf) · [:material-pencil: Esercizi: Zaino 0/1 (KP)](../../esercizi/dp-knapsack.md) · [:material-gesture-tap: App: Tabelle della PD per i problemi di zaino](../../laboratorio/tabella-pd-zaino.md)

</div>

## 17.4 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Aggiornare il vettore unico in ordine crescente di capacità.</strong> La cella ${v}[k-w_j]$ conterrebbe già la riga $j$ e l'oggetto $j$ potrebbe essere selezionato più di una volta; le capacità si scorrono a partire da $c$ verso il basso.

    - <strong>Dimenticare i casi base.</strong> Senza oggetti disponibili il valore ottimo è $0$ per ogni capacità: $v(0,k)=0$ per ogni $k \in \{0,1,\dots,c\}$, non solo per $k=0$.

    - <strong>Ricostruire con l'indice sbagliato.</strong> A ogni passo l'indice dell'oggetto diminuisce di uno, mentre la capacità diminuisce di $w_j$ solo se l'oggetto $j$ è selezionato.

    - <strong>Chiamare polinomiale $\Theta(nc)$.</strong> La capacità $c$ si scrive con $\log c$ cifre, quindi il tempo di esecuzione è esponenziale nella dimensione dell'input.

    - <strong>Leggere $u(n,q)$ come il valore ottimo.</strong> Nel secondo algoritmo di PD $u(n,q)$ è un peso minimo; il valore ottimo è il più grande $q$ con $u(n,q)\le c$.

## 17.5 In sintesi

!!! chiave "In sintesi"

    - La ricorrenza $v(j,k)$ sceglie fra lasciare fuori l'oggetto $j$ e prenderlo; ha la sottostruttura ottima e i sottoproblemi sovrapposti.

    - La matrice si riempie bottom-up in $\Theta(nc)$ passi; un solo vettore scorso verso il basso dà il valore ottimo con sole $c+1$ celle.

    - Una soluzione ottima si ricava dalla matrice ${s}$ delle decisioni, letta all'indietro a partire da $(n,c)$.

    - Il tempo di esecuzione $\Theta(nc)$ è pseudopolinomiale; le liste di stati non dominati memorizzano solo gli stati raggiungibili.

    - Scambiando profitti e pesi si ottengono $\Theta(nP)$ passi, il che è meglio quando il profitto totale $P$ è piccolo.

    <strong>Cruscotto dell'esempio del KP.</strong> L'[Esempio 17.1](index.md#box-1-texexpbox1) ($c=5$, tre oggetti) con i bound trovati finora:

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
    <td>valore ottimo, <span class="arithmatex">\(\Theta(nc)\)</span> passi</td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Zaino 0/1 (KP)](../../esercizi/dp-knapsack.md)

