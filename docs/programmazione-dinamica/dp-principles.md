---
title: "Principi della programmazione dinamica"
---

# Principi della programmazione dinamica

<div class="info-capitolo" markdown>

**Parte 3 · Programmazione dinamica · Capitolo 16** · [:material-file-pdf-box: Dispensa, volume 3 (PDF)](../pdf/dispensa-3-programmazione-dinamica.pdf) · [:material-presentation: Slide](../pdf/slide-dp-principles.pdf) · [:material-pencil: Esercizi: Principi](../esercizi/dp-principles.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, il capitolo [«Problemi di ottimizzazione combinatoria»](../problemi-di-ottimizzazione-combinatoria/combinatorial-optimization/index.md): i problemi di ottimizzazione combinatoria, le loro soluzioni ammissibili e il fatto che il loro numero cresce in modo esponenziale.

    - Da questo modulo, il capitolo [«Problemi di zaino»](../problemi-di-ottimizzazione-combinatoria/knapsack/index.md): il problema dello zaino 0/1 (KP), l'esempio guida degli algoritmi di PD.

    - Dal modulo <em>Algoritmi</em>: [pseudocodice (Capitolo 2)](https://fabiofurini.github.io/algoritmi/algoritmi-di-base/02-pseudocodice/), [ricorsione (Capitolo 14)](https://fabiofurini.github.io/algoritmi/ricorsione/14-ricorsione/) e la crescita del tempo di esecuzione di un algoritmo ([Capitolo 10 «Crescita asintotica»](https://fabiofurini.github.io/algoritmi/notazione-asintotica/10-crescita-asintotica/)).

!!! chiave "Obiettivi"

    Alla fine di questo capitolo saremo in grado di:

    - spiegare perché l'enumerazione di tutte le soluzioni ammissibili non funziona, e che cosa fa invece un algoritmo di PD;

    - enunciare i principi di divisione, conquista e combinazione, e la differenza fra sottoproblemi indipendenti e sottoproblemi sovrapposti;

    - verificare su un problema la sottostruttura ottima e i sottoproblemi sovrapposti;

    - elencare i passi di un algoritmo di PD: ricorrenza, casi base, tabella di memorizzazione e ricostruzione di una soluzione ottima.

## 16.1 Dividere, conquistare, combinare

<a id="box-1-def-DP"></a>

!!! definizione "Definizione 16.1: Algoritmo di PD"

    Un <strong><em>algoritmo di programmazione dinamica (PD)</em></strong> è un algoritmo esatto per trovare una soluzione ottima di una classe di problemi di ottimizzazione con proprietà specifiche (Sezione [16.2](#sez-sec-dp-properties)). Decompone il problema originale in sottoproblemi più piccoli dello stesso tipo e riusa l'informazione calcolata risolvendoli.

- Un algoritmo a forza bruta elenca tutte le soluzioni ammissibili, e il loro numero cresce in modo esponenziale ($2^n$ sottoinsiemi di oggetti per il KP). Un algoritmo di PD evita questa enumerazione riusando i valori ottimi dei sottoproblemi.

- Un algoritmo di PD sfrutta il <strong><em>paradigma divide et impera</em></strong> (dividere, conquistare e combinare), i cui principi sono:

    1. <strong>Principio di divisione</strong> $\rightsquigarrow$  decomporre il problema in un certo numero di sottoproblemi, che sono problemi più piccoli dello stesso tipo;

    2. <strong>Principio di conquista</strong> $\rightsquigarrow$  risolvere i sottoproblemi in modo ricorsivo. Se le dimensioni dei sottoproblemi sono abbastanza piccole, risolverli direttamente;

    3. <strong>Principio di combinazione</strong> $\rightsquigarrow$ combinare soluzioni ottime dei sottoproblemi per ottenere una soluzione ottima del problema originale.

- Gli algoritmi di PD dividono il problema in <strong><em>sottoproblemi indipendenti</em></strong>, li risolvono ricorsivamente e poi ne combinano le soluzioni per risolvere il problema originale. Qui indipendenti significa che ogni sottoproblema generato dalla divisione si può risolvere senza influire sugli altri.

- In un algoritmo di PD lo stesso sottoproblema può essere generato più volte durante il processo ricorsivo di soluzione. Per evitare calcoli ridondanti, il valore ottimo di ogni sottoproblema si memorizza in una <strong><em>tabella di memorizzazione</em></strong>.

- Ogni volta che lo stesso sottoproblema viene generato di nuovo, il suo valore ottimo si legge dalla tabella di memorizzazione invece di essere ricalcolato.

## 16.2 Proprietà del problema richieste dagli algoritmi di PD { #sez-sec-dp-properties }

- Gli algoritmi di PD funzionano solo per problemi di ottimizzazione combinatoria che ammettono un processo di decomposizione ricorsiva con le seguenti proprietà:

    1. <strong><em>Sottostruttura ottima</em></strong> $\rightsquigarrow$ l'idea è che, quando un problema è decomposto in sottoproblemi più piccoli, una soluzione ottima del problema si può costruire a partire da soluzioni ottime dei sottoproblemi.

        In pratica, per verificare questa proprietà si controllano di solito i seguenti punti:

        - il problema si può decomporre in sottoproblemi più piccoli dello stesso tipo;

        - i sottoproblemi si possono risolvere in modo indipendente;

        - le soluzioni ottime dei sottoproblemi si possono combinare per ottenere una soluzione ottima del problema originale;

        - si può stabilire una <strong>relazione di ricorrenza</strong> per calcolare il valore ottimo del problema.

    2. <strong><em>Sottoproblemi sovrapposti</em></strong> $\rightsquigarrow$ l'idea è che, quando un problema è decomposto ricorsivamente in sottoproblemi più piccoli, gli stessi sottoproblemi possono essere generati più volte.

        In pratica, per verificare questa proprietà si controllano di solito i seguenti punti:

        - il processo di decomposizione ricorsiva genera lo stesso sottoproblema più di una volta;

        - è possibile memorizzare i valori ottimi dei sottoproblemi in una tabella di memorizzazione; allora, ogni volta che lo stesso sottoproblema serve di nuovo, il suo valore ottimo si legge dalla tabella invece di essere ricalcolato.

!!! chiave ""

    Gli algoritmi di PD si possono usare quando un problema ha sia la <u>sottostruttura ottima</u> sia i <u>sottoproblemi sovrapposti</u>.

## 16.3 Passi per progettare un algoritmo di PD

- Identificare il <strong><em>processo di decomposizione ricorsiva</em></strong> che, a partire da un problema dato, genera i suoi sottoproblemi, che sono problemi più piccoli dello stesso tipo, e verificare le due proprietà seguenti:

    1. la proprietà di sottostruttura ottima, controllando che una soluzione ottima del problema si possa ottenere combinando le soluzioni ottime dei suoi sottoproblemi;

    2. la proprietà dei sottoproblemi sovrapposti, controllando se il processo di decomposizione ricorsiva genera più volte gli stessi sottoproblemi;

- La costruzione di un algoritmo di PD segue di solito due passi principali:

    1. calcolo del valore ottimo

        - definire una <strong><em>relazione di ricorrenza</em></strong> che esprime il valore ottimo di un problema in funzione dei valori ottimi dei suoi sottoproblemi;

        - specificare i <strong><em>casi base</em></strong>, ossia i sottoproblemi la cui soluzione ottima è immediata (il valore ottimo ne segue direttamente);

        - determinare un algoritmo di PD che calcoli i valori ottimi di tutti i sottoproblemi rilevanti, di solito <strong><em>dal basso verso l'alto</em></strong> (bottom-up), memorizzando ogni valore in una tabella di memorizzazione, in modo che sia calcolato una sola volta e letto ogni volta che serve di nuovo;

    2. costruzione di una soluzione ottima

        - specificare l'informazione aggiuntiva da memorizzare per ricostruire una soluzione ottima del problema.

        - identificare il modo di costruire una soluzione ottima dall'informazione memorizzata.

## 16.4 Gli algoritmi di PD di questo modulo

- Ogni algoritmo di PD di questo modulo segue i due passi precedenti: una ricorrenza con i suoi casi base dà il valore ottimo, una tabella aggiuntiva dà una soluzione ottima.

<div class="tabella" markdown="0"><table>
<tr>
<th>Problema</th>
<th>Stato</th>
<th>Ricorrenza su</th>
<th>Passi</th>
</tr>
<tr>
<td>KP</td>
<td><span class="arithmatex">\(v(j,k)\)</span></td>
<td>oggetti e capacità</td>
<td><span class="arithmatex">\(\Theta(nc)\)</span></td>
</tr>
<tr>
<td>UKP</td>
<td><span class="arithmatex">\(v(k)\)</span></td>
<td>capacità</td>
<td><span class="arithmatex">\(\Theta(nc)\)</span></td>
</tr>
<tr>
<td>BKP</td>
<td><span class="arithmatex">\(v(j,k)\)</span></td>
<td>oggetti e capacità</td>
<td><span class="arithmatex">\(\Theta(nc\,b_{\max})\)</span></td>
</tr>
<tr>
<td>SSP</td>
<td><span class="arithmatex">\(r(j,k)\)</span></td>
<td>oggetti e valori da raggiungere</td>
<td><span class="arithmatex">\(\Theta(nc)\)</span></td>
</tr>
<tr>
<td>MCKP</td>
<td><span class="arithmatex">\(v(h,k)\)</span></td>
<td>classi e capacità</td>
<td><span class="arithmatex">\(\Theta(nc)\)</span></td>
</tr>
<tr>
<td>MDKP</td>
<td><span class="arithmatex">\(v(j,k_1,\dots,k_m)\)</span></td>
<td>oggetti e vettori di capacità</td>
<td><span class="arithmatex">\(\Theta(m\,n\prod_{d}(c_d+1))\)</span></td>
</tr>
<tr>
<td>KPS</td>
<td><span class="arithmatex">\(v(h,k)\)</span>, <span class="arithmatex">\(u(h,i,k)\)</span></td>
<td>classi, oggetti e capacità</td>
<td><span class="arithmatex">\(\Theta(nc)\)</span></td>
</tr>
<tr>
<td>MKP</td>
<td><span class="arithmatex">\(v(j,k_1,\dots,k_m)\)</span></td>
<td>oggetti e capacità residue</td>
<td><span class="arithmatex">\(\Theta(m\,n\prod_{i}(c_i+1))\)</span></td>
</tr>
<tr>
<td>RCP</td>
<td><span class="arithmatex">\(v(\ell)\)</span></td>
<td>lunghezze dell'asta</td>
<td><span class="arithmatex">\(\Theta(n^2)\)</span></td>
</tr>
<tr>
<td>CCP</td>
<td><span class="arithmatex">\(v(k)\)</span></td>
<td>importi del resto</td>
<td><span class="arithmatex">\(\Theta(nc)\)</span></td>
</tr>
<tr>
<td>ULS</td>
<td><span class="arithmatex">\(v(t)\)</span></td>
<td>periodi</td>
<td><span class="arithmatex">\(\Theta(m^2)\)</span></td>
</tr>
<tr>
<td>CLS</td>
<td><span class="arithmatex">\(v(t,k)\)</span></td>
<td>periodi e scorte</td>
<td><span class="arithmatex">\(O(mDC)\)</span></td>
</tr>
</table></div>

- In tutti gli esempi numerici i dati sono interi: il numero di stati è finito, e ogni stato è una cella della tabella. I tempi di esecuzione $\Theta(nc)$, $\Theta(nc\,b_{\max})$ e $O(mDC)$ contengono numeri dell'input (una capacità, un bound, una domanda), non solo la sua dimensione: sono <strong>pseudo-polinomiali</strong>.

- Con un vettore di capacità (MDKP, MKP) la tabella ha una dimensione per ogni capacità: il numero di passi è pseudo-polinomiale solo per un numero fissato $m$ di dimensioni o di zaini.

## 16.5 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Usare la PD senza la sottostruttura ottima.</strong> Se una soluzione ottima del problema non si può costruire da soluzioni ottime dei sottoproblemi, la ricorrenza è sbagliata.

    - <strong>Usare la PD senza sottoproblemi sovrapposti.</strong> Se ogni sottoproblema compare una sola volta, memorizzare i valori in una tabella non porta alcun vantaggio: l'algoritmo di PD è una semplice ricorsione.

    - <strong>Dimenticare i casi base.</strong> La ricorrenza ha bisogno dei sottoproblemi il cui valore ottimo è immediato, altrimenti la ricorsione non termina.

    - <strong>Confondere il valore ottimo con una soluzione ottima.</strong> La tabella dei valori ottimi non dà la soluzione: serve una tabella aggiuntiva delle decisioni.

## 16.6 In sintesi

!!! chiave "In sintesi"

    - Un algoritmo di PD è un algoritmo esatto che divide un problema in sottoproblemi dello stesso tipo, li risolve ricorsivamente e combina le soluzioni ottime.

    - Funziona quando il problema ha la sottostruttura ottima e sottoproblemi sovrapposti; i valori ottimi si memorizzano in una tabella di memorizzazione.

    - La progettazione ha due passi: il valore ottimo (ricorrenza, casi base, tabella bottom-up) e una soluzione ottima (decisioni memorizzate e lette a ritroso).

    - La forza bruta richiede tempo esponenziale; la PD richiede un tempo polinomiale nel numero di stati, e pseudo-polinomiale quando un numero dell'input è una dimensione della tabella.

---

**Esercizi su questo capitolo:** [:material-pencil: Principi](../esercizi/dp-principles.md)
