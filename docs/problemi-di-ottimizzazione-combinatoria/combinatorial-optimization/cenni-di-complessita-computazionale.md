---
title: "Cenni di complessità computazionale"
---

# Cenni di complessità computazionale

<div class="info-capitolo" markdown>

**Parte 1 · Problemi di ottimizzazione combinatoria · Capitolo 1** · [:material-book-open-variant: Capitolo 1: Ottimizzazione combinatoria](index.md) · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-problemi-di-ottimizzazione-combinatoria.pdf) · [:material-presentation: Slide](../../pdf/slide-combinatorial-optimization.pdf) · [:material-pencil: Esercizi: Ottimizzazione combinatoria](../../esercizi/combinatorial-optimization.md) · [:material-gesture-tap: App: Forza bruta sul problema dello zaino 0/1](../../laboratorio/zaino-forza-bruta.md)

</div>

## 1.6 Cenni di complessità computazionale { #sez-sec-complexity }

- La forza bruta richiede tempo esponenziale. Esiste un algoritmo che risolve un problema di ottimizzazione combinatoria in tempo polinomiale? La complessità computazionale classifica i problemi in base a questa domanda; qui diamo solo le definizioni che servono nel corso.

- La <strong>dimensione</strong> di un'istanza è il numero di bit necessari per scriverla. Per esempio, un'istanza con $n$ numeri, il più grande dei quali è $M$, ha dimensione dell'ordine di $n \log_2 M$: un numero $M$ si scrive con circa $\log_2 M$ bit, non con $M$ simboli.

- Un algoritmo è <strong>polinomiale</strong> se il suo tempo di esecuzione è limitato da un polinomio nella dimensione dell'istanza.

- La <strong>versione decisionale</strong> di un problema di ottimizzazione pone una domanda sì/no, per esempio: “esiste una soluzione ammissibile di valore almeno $k$?”.

<a id="box-11-def-pnp"></a>

!!! definizione "Definizione 1.7: le classi P e NP"

    1. <strong>P</strong> è la classe dei problemi decisionali che si possono risolvere con un algoritmo polinomiale.

    2. <strong>NP</strong> è la classe dei problemi decisionali le cui istanze “sì” ammettono un certificato che si può verificare in tempo polinomiale (per esempio, una soluzione ammissibile di cui ammissibilità e valore si calcolano in tempo polinomiale).

    3. Un problema decisionale in NP è <strong>NP-completo</strong> se ogni problema in NP si può ridurre a esso in tempo polinomiale. Un problema di ottimizzazione è <strong>NP-hard</strong> se la sua versione decisionale è NP-completa (più in generale, se un algoritmo polinomiale per esso darebbe un algoritmo polinomiale per un problema NP-completo).

- Non è noto se $P = NP$. Non si conosce alcun algoritmo polinomiale per un problema NP-completo, ed è opinione diffusa che non ne esista nessuno: per un problema NP-hard non ci aspettiamo un algoritmo esatto polinomiale.

### 1.6.1 Algoritmi pseudo-polinomiali e problemi NP-hard in senso forte

- Alcuni problemi NP-hard si possono risolvere in tempo polinomiale in $n$ <strong>e nel valore</strong> dei numeri dell'istanza. Per esempio, un algoritmo che richiede tempo $O(n\,M)$, dove $M$ è il numero più grande dell'istanza, non è polinomiale: $M$ è esponenziale nel suo numero di bit $\log_2 M$.

<a id="box-12-def-pseudo"></a>

!!! definizione "Definizione 1.8: algoritmo pseudo-polinomiale, problemi NP-hard in senso debole e forte"

    1. Un algoritmo è <strong>pseudo-polinomiale</strong> se il suo tempo di esecuzione è limitato da un polinomio nella dimensione dell'istanza e nel numero più grande che vi compare.

    2. Un problema NP-hard è <strong>NP-hard in senso forte</strong> se resta NP-hard quando tutti i suoi numeri sono limitati da un polinomio nella dimensione dell'istanza (equivalentemente, quando i numeri sono scritti in unario). Altrimenti, se ammette un algoritmo pseudo-polinomiale, si dice <strong>NP-hard in senso debole</strong> (NP-hard in senso ordinario).

- Un problema NP-hard in senso forte non ha algoritmi pseudo-polinomiali, a meno che $P = NP$.

!!! chiave ""

    Che un problema sia NP-hard non significa che un'istanza non si possa risolvere: significa che non ci aspettiamo un algoritmo che risolva <em>ogni</em> istanza in tempo polinomiale. In pratica combiniamo <strong>metodi esatti</strong> che chiudono il gap fra bound primali e duali, <strong>euristiche</strong> che trovano rapidamente buone soluzioni, e <strong>algoritmi di approssimazione</strong> che garantiscono un gap limitato nel caso peggiore.

- I problemi dei prossimi capitoli sono tutti NP-hard: il problema dello zaino 0/1 è NP-hard in senso debole, mentre il bin packing, la colorazione dei vertici, la clique massima e il problema del commesso viaggiatore sono NP-hard in senso forte. Ogni capitolo discute la complessità del suo problema.

## 1.7 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Confondere soluzioni candidate e ammissibili.</strong> I numeri $2^n$, $(n-1)!/2$ e $B(n)$ contano le candidate; le soluzioni ammissibili possono essere molte meno, per esempio $11$ sottoinsiemi su $16$ nell'<span style="color:#1971c2">[Esempio 1.1](problemi-di-ottimizzazione-combinatoria.md#box-2-ex-oc1-small)</span>.

    - <strong>Scambiare i due versi dei bound.</strong> In un problema di massimo un bound primale è un lower bound e un bound duale è un upper bound; in un problema di minimo i ruoli si scambiano.

    - <strong>Arrotondare un bound duale quando l'obiettivo non è intero.</strong> L'arrotondamento dell'[Osservazione 1.6](bound-primali-bound-duali-e-gap.md#box-9-obs-rounding) richiede $f(S) \in \Z$ per ogni soluzione ammissibile.

    - <strong>Contare due volte soluzioni equivalenti.</strong> Un ordinamento ciclico e il suo inverso sono lo stesso ordinamento ciclico, e due assegnamenti che differiscono per una ridenominazione di etichette intercambiabili sono la stessa soluzione.

    - <strong>Leggere NP-hard come irrisolvibile.</strong> Essere NP-hard è un'affermazione sul caso peggiore: molte istanze di dimensione pratica si risolvono, e il resto del corso mostra come.

## 1.8 In sintesi

!!! chiave "In sintesi"

    - Un problema di ottimizzazione combinatoria ha un insieme base finito, una famiglia di sottoinsiemi ammissibili e una funzione obiettivo; una soluzione ottima esiste quando esiste una soluzione ammissibile.

    - La categoria delle decisioni dà l'oggetto combinatorio di una soluzione: un sottoinsieme, un vettore di quantità intere, un assegnamento, un ordinamento o una partizione.

    - Le soluzioni candidate sono $2^n$ sottoinsiemi, $n!$ ordinamenti, $(n-1)!/2$ ordinamenti ciclici e $B(n)$ partizioni: la forza bruta funziona solo su istanze molto piccole.

    - Una soluzione ammissibile dà un bound primale, un rilassamento o un argomento combinatorio dà un bound duale; un gap nullo certifica che la soluzione ammissibile è ottima.

    - I problemi del corso sono NP-hard: per essi non ci aspettiamo un algoritmo esatto polinomiale.

    <strong>Quadro riassuntivo della piccola istanza.</strong>

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span style="color:#1971c2"><a href="../problemi-di-ottimizzazione-combinatoria/#box-2-ex-oc1-small">Esempio 1.1</a></span> (max)</th>
    <th>lower bound</th>
    <th>upper bound</th>
    <th>da</th>
    </tr>
    <tr>
    <td>primi bound</td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td><span class="arithmatex">\(14\)</span></td>
    <td>scelta greedy, uno dei pesi <span class="arithmatex">\(7\)</span> e <span class="arithmatex">\(6\)</span></td>
    </tr>
    <tr>
    <td>bound finali</td>
    <td><span class="arithmatex">\(13\)</span></td>
    <td><span class="arithmatex">\(13\)</span></td>
    <td>soluzione <span class="arithmatex">\(\{2,3,4\}\)</span>, argomento sulla cardinalità</td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Ottimizzazione combinatoria](../../esercizi/combinatorial-optimization.md)

