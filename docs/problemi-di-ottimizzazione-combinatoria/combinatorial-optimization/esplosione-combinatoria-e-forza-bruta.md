---
title: "Esplosione combinatoria e forza bruta"
---

# 1.4 Esplosione combinatoria e forza bruta { #sez-sec-bruteforce }

<div class="info-capitolo" markdown>

**Parte 1 · Problemi di ottimizzazione combinatoria · Capitolo 1** · [:material-book-open-variant: Capitolo 1: Ottimizzazione combinatoria](index.md) · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-problemi-di-ottimizzazione-combinatoria.pdf) · [:material-pencil: Esercizi: Ottimizzazione combinatoria](../../esercizi/combinatorial-optimization.md) · [:material-gesture-tap: App: Forza bruta sul problema dello zaino 0/1](../../laboratorio/zaino-forza-bruta.md)

</div>

- Poiché la regione ammissibile è finita, un problema di ottimizzazione combinatoria si può sempre risolvere per <strong>enumerazione completa</strong>: elenchiamo tutte le soluzioni candidate, scartiamo quelle non ammissibili e teniamo la migliore. Questo algoritmo si chiama <strong>forza bruta</strong>.

!!! algoritmo "Algoritmo"

    - <strong>Input:</strong> un'istanza di un problema di ottimizzazione combinatoria in forma di massimo.

    - <strong>Output:</strong> una soluzione ottima e il valore ottimo.

    - **Passo 0:** <strong>Inizializzazione</strong>. Porre $\bar S \leftarrow$ nessuna e $\LB \leftarrow -\infty$.

    - **Passo 1:** <strong>Enumerazione</strong>. Per ogni soluzione candidata $S$ (sottoinsieme, ordinamento, partizione):

        1. se $S$ non è ammissibile, scartarla;

        2. se $S$ è ammissibile e $f(S) > \LB$, porre $\bar S \leftarrow S$ e $\LB \leftarrow f(S)$.

    - **Passo 2:** <strong>Output</strong>. Restituire $\tilde S = \bar S$ e $z(I) = \LB$. <code>STOP</code>

<a id="box-6-ex-oc1-bf"></a>

!!! esempio "Esempio 1.3: forza bruta sulla piccola istanza"

    Per l'istanza dell'<span style="color:#1971c2">[Esempio 1.1](problemi-di-ottimizzazione-combinatoria.md#box-2-ex-oc1-small)</span> i $2^4=16$ sottoinsiemi di $\mathscr{U}$ sono:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">\(S\)</span></th>
    <th><span class="arithmatex">\(f(S)\)</span></th>
    <th>ammissibile</th>
    <th><span class="arithmatex">\(S\)</span></th>
    <th><span class="arithmatex">\(f(S)\)</span></th>
    <th>ammissibile</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\emptyset\)</span></td>
    <td><span class="arithmatex">\(0\)</span></td>
    <td>sì</td>
    <td><span class="arithmatex">\(\{2,3\}\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td>sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\{1\}\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td>sì</td>
    <td><span class="arithmatex">\(\{2,4\}\)</span></td>
    <td><span class="arithmatex">\(9\)</span></td>
    <td>sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\{2\}\)</span></td>
    <td><span class="arithmatex">\(6\)</span></td>
    <td>sì</td>
    <td><span class="arithmatex">\(\{3,4\}\)</span></td>
    <td><span class="arithmatex">\(7\)</span></td>
    <td>sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\{3\}\)</span></td>
    <td><span class="arithmatex">\(4\)</span></td>
    <td>sì</td>
    <td><span class="arithmatex">\(\{1,2,3\}\)</span></td>
    <td><span class="arithmatex">\(17\)</span></td>
    <td>no</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\{4\}\)</span></td>
    <td><span class="arithmatex">\(3\)</span></td>
    <td>sì</td>
    <td><span class="arithmatex">\(\{1,2,4\}\)</span></td>
    <td><span class="arithmatex">\(16\)</span></td>
    <td>no</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\{1,2\}\)</span></td>
    <td><span class="arithmatex">\(13\)</span></td>
    <td>no</td>
    <td><span class="arithmatex">\(\{1,3,4\}\)</span></td>
    <td><span class="arithmatex">\(14\)</span></td>
    <td>no</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\{1,3\}\)</span></td>
    <td><span class="arithmatex">\(11\)</span></td>
    <td>sì</td>
    <td><span class="arithmatex">\(\{2,3,4\}\)</span></td>
    <td><span class="arithmatex">\(\mathbf{13}\)</span></td>
    <td>sì</td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(\{1,4\}\)</span></td>
    <td><span class="arithmatex">\(10\)</span></td>
    <td>sì</td>
    <td><span class="arithmatex">\(\{1,2,3,4\}\)</span></td>
    <td><span class="arithmatex">\(20\)</span></td>
    <td>no</td>
    </tr>
    </table></div>

    Fra gli $11$ sottoinsiemi ammissibili, il migliore è $\tilde S = \{2,3,4\}$, con $z(I)=13$. È l'unica soluzione ottima: anche il sottoinsieme $\{1,2\}$ ha valore $13$, ma non è ammissibile.

## 1.4.1 Crescita esponenziale

- La forza bruta funziona per le piccole istanze viste sopra, ma il numero di candidate cresce molto rapidamente con la dimensione $n$ dell'istanza. La tabella seguente confronta la crescita polinomiale e quella esponenziale.

$$
\begin{array}{rrrrrr}
\hline {n} & {n^2} & {n^3} & {2^n} & {(n-1)!/2} & {B(n)} \\
\hline {5} & {25} & {125} & {32} & {12} & {52} \\
{10} & {100} & {1\,000} & {1\,024} & {181\,440} & {115\,975} \\
{15} & {225} & {3\,375} & {32\,768} & {\approx 4.36 \cdot 10^{10}} & {\approx 1.38 \cdot 10^{9}} \\
{20} & {400} & {8\,000} & {1\,048\,576} & {\approx 6.08 \cdot 10^{16}} & {\approx 5.17 \cdot 10^{13}} \\
{25} & {625} & {15\,625} & {\approx 3.36 \cdot 10^{7}} & {\approx 3.10 \cdot 10^{23}} & {\approx 4.64 \cdot 10^{18}} \\
{30} & {900} & {27\,000} & {\approx 1.07 \cdot 10^{9}} & {\approx 4.42 \cdot 10^{30}} & {\approx 8.47 \cdot 10^{23}} \\
\hline
\end{array}
$$

![Figura 1](../../img/combinatorial-optimization/fig01.svg){ .fig .cornice loading=lazy style="width:65%" }

## 1.4.2 Tempi di calcolo

- Supponiamo che un calcolatore valuti $10^9$ soluzioni candidate al secondo, e calcoliamo il tempo di un'enumerazione completa (un anno $=365.25$ giorni):

<div class="tabella" markdown="0"><table>
<tr>
<th><span class="arithmatex">\(n\)</span></th>
<th><span class="arithmatex">\(2^n\)</span></th>
<th>tempo a <span class="arithmatex">\(10^9\)</span> al secondo</th>
<th>tempo a <span class="arithmatex">\(10^{12}\)</span> al secondo</th>
</tr>
<tr>
<td><span class="arithmatex">\(10\)</span></td>
<td><span class="arithmatex">\(1\,024\)</span></td>
<td><span class="arithmatex">\(\approx 1.02\)</span> microsecondi</td>
<td><span class="arithmatex">\(\approx 1.02\)</span> nanosecondi</td>
</tr>
<tr>
<td><span class="arithmatex">\(20\)</span></td>
<td><span class="arithmatex">\(\approx 1.05 \cdot 10^{6}\)</span></td>
<td><span class="arithmatex">\(\approx 1.05\)</span> millisecondi</td>
<td><span class="arithmatex">\(\approx 1.05\)</span> microsecondi</td>
</tr>
<tr>
<td><span class="arithmatex">\(30\)</span></td>
<td><span class="arithmatex">\(\approx 1.07 \cdot 10^{9}\)</span></td>
<td><span class="arithmatex">\(\approx 1.07\)</span> secondi</td>
<td><span class="arithmatex">\(\approx 1.07\)</span> millisecondi</td>
</tr>
<tr>
<td><span class="arithmatex">\(40\)</span></td>
<td><span class="arithmatex">\(\approx 1.10 \cdot 10^{12}\)</span></td>
<td><span class="arithmatex">\(\approx 18.3\)</span> minuti</td>
<td><span class="arithmatex">\(\approx 1.10\)</span> secondi</td>
</tr>
<tr>
<td><span class="arithmatex">\(50\)</span></td>
<td><span class="arithmatex">\(\approx 1.13 \cdot 10^{15}\)</span></td>
<td><span class="arithmatex">\(\approx 13.0\)</span> giorni</td>
<td><span class="arithmatex">\(\approx 18.8\)</span> minuti</td>
</tr>
<tr>
<td><span class="arithmatex">\(60\)</span></td>
<td><span class="arithmatex">\(\approx 1.15 \cdot 10^{18}\)</span></td>
<td><span class="arithmatex">\(\approx 36.5\)</span> anni</td>
<td><span class="arithmatex">\(\approx 13.3\)</span> giorni</td>
</tr>
<tr>
<td><span class="arithmatex">\(70\)</span></td>
<td><span class="arithmatex">\(\approx 1.18 \cdot 10^{21}\)</span></td>
<td><span class="arithmatex">\(\approx 3.74 \cdot 10^{4}\)</span> anni</td>
<td><span class="arithmatex">\(\approx 37.4\)</span> anni</td>
</tr>
<tr>
<td><span class="arithmatex">\(80\)</span></td>
<td><span class="arithmatex">\(\approx 1.21 \cdot 10^{24}\)</span></td>
<td><span class="arithmatex">\(\approx 3.83 \cdot 10^{7}\)</span> anni</td>
<td><span class="arithmatex">\(\approx 3.83 \cdot 10^{4}\)</span> anni</td>
</tr>
</table></div>

<div class="tabella" markdown="0"><table>
<tr>
<th></th>
<th colspan="3">ordinamenti ciclici: <span class="arithmatex">\((n-1)!/2\)</span></th>
<th colspan="2">partizioni: <span class="arithmatex">\(B(n)\)</span></th>
</tr>
<tr>
<td><span class="arithmatex">\(n\)</span></td>
<td>numero</td>
<td><span class="arithmatex">\(10^9\)</span> al secondo</td>
<td><span class="arithmatex">\(10^{12}\)</span> al secondo</td>
<td>numero</td>
<td><span class="arithmatex">\(10^9\)</span> al secondo</td>
</tr>
<tr>
<td><span class="arithmatex">\(10\)</span></td>
<td><span class="arithmatex">\(181\,440\)</span></td>
<td><span class="arithmatex">\(\approx 181\)</span> microsecondi</td>
<td><span class="arithmatex">\(\approx 181\)</span> nanosecondi</td>
<td><span class="arithmatex">\(115\,975\)</span></td>
<td><span class="arithmatex">\(\approx 116\)</span> microsecondi</td>
</tr>
<tr>
<td><span class="arithmatex">\(15\)</span></td>
<td><span class="arithmatex">\(\approx 4.36 \cdot 10^{10}\)</span></td>
<td><span class="arithmatex">\(\approx 43.6\)</span> secondi</td>
<td><span class="arithmatex">\(\approx 43.6\)</span> millisecondi</td>
<td><span class="arithmatex">\(\approx 1.38 \cdot 10^{9}\)</span></td>
<td><span class="arithmatex">\(\approx 1.38\)</span> secondi</td>
</tr>
<tr>
<td><span class="arithmatex">\(20\)</span></td>
<td><span class="arithmatex">\(\approx 6.08 \cdot 10^{16}\)</span></td>
<td><span class="arithmatex">\(\approx 1.93\)</span> anni</td>
<td><span class="arithmatex">\(\approx 16.9\)</span> ore</td>
<td><span class="arithmatex">\(\approx 5.17 \cdot 10^{13}\)</span></td>
<td><span class="arithmatex">\(\approx 14.4\)</span> ore</td>
</tr>
<tr>
<td><span class="arithmatex">\(25\)</span></td>
<td><span class="arithmatex">\(\approx 3.10 \cdot 10^{23}\)</span></td>
<td><span class="arithmatex">\(\approx 9.83 \cdot 10^{6}\)</span> anni</td>
<td><span class="arithmatex">\(\approx 9.83 \cdot 10^{3}\)</span> anni</td>
<td><span class="arithmatex">\(\approx 4.64 \cdot 10^{18}\)</span></td>
<td><span class="arithmatex">\(\approx 147\)</span> anni</td>
</tr>
</table></div>

- Un calcolatore $1000$ volte più veloce non cambia il quadro: poiché $2^{10} = 1024 > 1000$, nello stesso tempo enumera i sottoinsiemi di soli $10$ elementi in più, circa. Per gli ordinamenti ciclici il guadagno è ancora minore: passare da $n$ a $n+1$ elementi moltiplica il loro numero per $n$, e $15 \cdot 16 \cdot 17 = 4080 > 1000$, quindi da $15$ elementi in su il calcolatore più veloce guadagna meno di $3$ elementi.

!!! chiave ""

    L'enumerazione completa è possibile solo per <strong>istanze molto piccole</strong>. Calcolatori più veloci non aiutano: un numero esponenziale di candidate vanifica qualunque accelerazione costante. Servono approcci più intelligenti, che <strong>escludono</strong> intere parti dello spazio delle soluzioni senza esplorarle.

---

**Avanti:** [1.5 Bound primali, bound duali e gap](bound-primali-bound-duali-e-gap.md)
