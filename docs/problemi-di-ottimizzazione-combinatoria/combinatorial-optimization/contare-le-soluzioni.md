---
title: "Contare le soluzioni"
---

# 1.3 Contare le soluzioni { #sez-sec-counting }

<div class="info-capitolo" markdown>

**Parte 1 · Problemi di ottimizzazione combinatoria · Capitolo 1** · [:material-book-open-variant: Capitolo 1: Ottimizzazione combinatoria](index.md) · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-problemi-di-ottimizzazione-combinatoria.pdf) · [:material-pencil: Esercizi: Ottimizzazione combinatoria](../../esercizi/combinatorial-optimization.md) · [:material-gesture-tap: App: Forza bruta sul problema dello zaino 0/1](../../laboratorio/zaino-forza-bruta.md)

</div>

- Prima di risolvere un problema ci chiediamo <strong>quante</strong> soluzioni candidate ha. La risposta dipende solo dall'oggetto combinatorio: sottoinsiemi, ordinamenti o partizioni.

## 1.3.1 Sottoinsiemi

<a id="box-3-prop-subsets"></a>

!!! teorema "Proposizione 1.2"

    Un insieme con $n$ elementi ha $2^n$ sottoinsiemi.

??? dimostrazione "Dimostrazione"

    Un sottoinsieme $S \subseteq \{1,2,\dots,n\}$ è identificato dal vettore binario ${\vet{x}} \in \{0,1\}^n$ con $x_j = 1$ se e solo se $j \in S$. Ognuna delle $n$ componenti assume $2$ valori in modo indipendente, quindi i vettori sono $2 \cdot 2 \cdots 2 = 2^n$. Equivalentemente, il numero di sottoinsiemi con $k$ elementi è $\binom{n}{k}$, e abbiamo:

    $$
    \sum_{k=0}^{n} \binom{n}{k} = 2^n .
    $$

    <p class="qed-riga"><span class="qed">□</span></p>

- Geometricamente, i $2^n$ vettori binari sono i vertici dell'ipercubo unitario $[0,1]^n$: il quadrato per $n=2$ ($4$ vertici) e il cubo per $n=3$ ($8$ vertici).

- Ogni decisione IN/OUT su $n$ elementi è un sottoinsieme: i $2^n$ sottoinsiemi sono le sue soluzioni candidate.

## 1.3.2 Ordinamenti e ordinamenti ciclici

- Gli $n$ elementi di un insieme si possono ordinare in $n! = n \cdot (n-1) \cdots 2 \cdot 1$ modi (<strong>permutazioni</strong>).

- Un <strong>ordinamento ciclico</strong> dispone gli $n$ elementi lungo un cerchio, come in un giro attraverso $n$ luoghi: l'elemento di partenza e il verso di percorrenza non contano.

<a id="box-4-prop-tours"></a>

!!! teorema "Proposizione 1.3"

    Per $n \ge 3$ elementi, il numero di ordinamenti ciclici distinti, dove una sequenza, le sue rotazioni e la sua inversa sono lo stesso ordinamento ciclico, è

    $$
    \frac{(n-1)!}{2}.
    $$

??? dimostrazione "Dimostrazione"

    Poiché l'elemento di partenza non cambia un ordinamento ciclico, possiamo partire sempre dall'elemento $1$: i restanti $n-1$ elementi si possono ordinare in $(n-1)!$ modi. Ogni ordinamento ciclico si ottiene due volte, una per ogni verso, per esempio $(1,3,5,2,4)$ e $(1,4,2,5,3)$. Quindi il numero di ordinamenti ciclici distinti è $(n-1)!/2$. <span class="qed">□</span>

- Per $n=4$ ci sono $3!/2 = 3$ ordinamenti ciclici: $(1,2,3,4)$, $(1,2,4,3)$ e $(1,3,2,4)$. Ogni altra sequenza è una rotazione o un'inversa di uno di essi, per esempio $(2,1,4,3)$ è l'inversa di $(1,2,3,4)$ fatta partire dall'elemento $2$.

## 1.3.3 Partizioni e numeri di Bell

- Una <strong>partizione</strong> di un insieme finito $A$ è una collezione di sottoinsiemi non vuoti e a due a due disgiunti di $A$ la cui unione è $A$. Le decisioni di raggruppamento, come la suddivisione di oggetti in gruppi, hanno partizioni come soluzioni.

- Il numero di partizioni di un insieme con $n$ elementi è il <strong>numero di Bell</strong> $B(n)$, definito dalla ricorsione:

    \begin{equation*}
    \label{eq:oc1-bell}
    B(0) = 1, \qquad B(n) = \sum_{k=0}^{n-1} \binom{n-1}{k} \, B(k), \quad \forall n \ge 1 . \tag{1.1}
    \end{equation*}

    La ricorsione conta le partizioni in base al blocco che contiene l'elemento $n$: se questo blocco ha altri $n-1-k$ elementi, essi si possono scegliere in $\binom{n-1}{n-1-k}=\binom{n-1}{k}$ modi, e i restanti $k$ elementi si partizionano in $B(k)$ modi.

- I primi numeri di Bell sono:

    $$
    \begin{array}{c|ccccccccccc}
    n & 0 & 1 & 2 & 3 & 4 & 5 & 6 & 7 & 8 & 9 & 10 \\ \hline
    B(n) & 1 & 1 & 2 & 5 & 15 & 52 & 203 & 877 & 4140 & 21147 & 115975
    \end{array}
    $$

- Un <strong>assegnamento</strong> di $n$ elementi a $m$ etichette è una funzione dagli elementi alle etichette: ce ne sono $m^n$. Se le etichette sono intercambiabili (risorse identiche), due assegnamenti che differiscono solo per una ridenominazione delle etichette sono la stessa soluzione; le soluzioni distinte sono le partizioni degli elementi in al più $m$ blocchi.

<a id="box-5-ex-oc1-objects"></a>

!!! esempio "Esempio 1.2: quante soluzioni candidate"

    Per un insieme con $n=5$ elementi, i numeri dei quattro oggetti combinatori sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>oggetto combinatorio</th>
    <th>numero</th>
    </tr>
    <tr>
    <td>sottoinsiemi</td>
    <td><span class="arithmatex">\(2^5 = 32\)</span></td>
    </tr>
    <tr>
    <td>ordinamenti (permutazioni)</td>
    <td><span class="arithmatex">\(5! = 120\)</span></td>
    </tr>
    <tr>
    <td>ordinamenti ciclici</td>
    <td><span class="arithmatex">\(4!/2 = 12\)</span></td>
    </tr>
    <tr>
    <td>partizioni</td>
    <td><span class="arithmatex">\(B(5) = 52\)</span></td>
    </tr>
    <tr>
    <td>assegnamenti a <span class="arithmatex">\(3\)</span> etichette</td>
    <td><span class="arithmatex">\(3^5 = 243\)</span></td>
    </tr>
    <tr>
    <td>partizioni in al più <span class="arithmatex">\(3\)</span> blocchi</td>
    <td><span class="arithmatex">\(1+15+25 = 41\)</span></td>
    </tr>
    </table></div>

    L'ultima riga conta le partizioni di $5$ elementi in $1$, $2$ o $3$ blocchi (rispettivamente $1$, $15$ e $25$); le altre $10+1$ partizioni delle $52$ hanno $4$ o $5$ blocchi.

- Questi numeri contano le soluzioni <strong>candidate</strong>. Quelle ammissibili possono essere molte meno: nell'<span style="color:#1971c2">[Esempio 1.1](problemi-di-ottimizzazione-combinatoria.md#box-2-ex-oc1-small)</span> solo $11$ dei $16$ sottoinsiemi sono ammissibili.

---

**Avanti:** [1.4 Esplosione combinatoria e forza bruta](esplosione-combinatoria-e-forza-bruta.md)
