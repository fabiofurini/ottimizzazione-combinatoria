---
title: "Variable neighbourhood descent"
---

# 31.11 Variable neighbourhood descent { #sez-sec-vnd }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 31** · [:material-book-open-variant: Capitolo 31: Ricerca locale](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-pencil: Esercizi: Ricerca locale](../../esercizi/local-search.md) · [:material-gesture-tap: App: TSP: nearest neighbour e 2-opt](../../laboratorio/tsp-nn-2opt.md)

</div>

- Gli esempi delle sezioni precedenti mostrano che un ottimo locale per un intorno spesso non è un ottimo locale per un altro: la soluzione di $LPT$ per move e swap, l'ottimo locale 2-opt di lunghezza $41$ per 2-opt e Or-opt. L'idea naturale è usare <strong>più intorni</strong> $N_1,\dots,N_K$, e fermarsi solo quando nessuno di essi contiene un vicino migliorante.

!!! chiave ""

    La <em>variable neighbourhood descent</em> (indicata con $VND$) esplora gli intorni $N_1,\dots,N_K$ in quest'ordine. Cerca una mossa migliorante nell'intorno corrente $N_k$: se ne trova una, la applica e torna a $N_1$; altrimenti passa a $N_{k+1}$. Si ferma quando la soluzione corrente è un ottimo locale per tutti i $K$ intorni.

!!! algoritmo "Algoritmo: Variable neighbourhood descent"

    <div class="pseudocodice" markdown="0"><div class="pc" style="--liv:0"><strong>Input:</strong> una soluzione ammissibile <span class="arithmatex">\(x\)</span>, i passi <span class="arithmatex">\(\textit{Step}_1,\dots,\textit{Step}_K\)</span> di <span class="arithmatex">\(K\)</span> intorni, una regola</div><div class="pc" style="--liv:0"><strong>Output:</strong> un ottimo locale <span class="arithmatex">\(x\)</span> per tutti i <span class="arithmatex">\(K\)</span> intorni</div><div class="pc" style="--liv:0"><span class="pc-n">1</span><strong>Function</strong> VND(<span class="arithmatex">\(x, \textit{Step}_1,\dots,\textit{Step}_K, \textit{rule}\)</span>)</div><div class="pc" style="--liv:1"><span class="pc-n">2</span><span class="arithmatex">\(k := 1\)</span> <span class="pc-com">▹ intorno corrente</span></div><div class="pc" style="--liv:1"><span class="pc-n">3</span><strong>while</strong> <span class="arithmatex">\(k \le K\)</span> <strong>do</strong></div><div class="pc" style="--liv:2"><span class="pc-n">4</span><strong>if</strong> <span class="arithmatex">\(\textit{Step}_k(x, \textit{rule})\)</span> <strong>then</strong></div><div class="pc" style="--liv:3"><span class="pc-n">5</span><span class="arithmatex">\(k \leftarrow 1\)</span> <span class="pc-com">▹ mossa migliorante applicata: tornare al primo intorno</span></div><div class="pc" style="--liv:2"><span class="pc-n">6</span><strong>else</strong></div><div class="pc" style="--liv:3"><span class="pc-n">7</span><span class="arithmatex">\(k \leftarrow k+1\)</span> <span class="pc-com">▹ ottimo locale per <span class="arithmatex">\(N_k\)</span>: intorno successivo</span></div><div class="pc" style="--liv:2"><span class="pc-n">8</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">9</span><strong>end</strong></div><div class="pc" style="--liv:1"><span class="pc-n">10</span><strong>return</strong> <span class="arithmatex">\(x\)</span></div></div>

<div class="colab-pulsanti" markdown="0"><span class="colab-etichetta">Esegui in Colab:</span><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_python.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook Python del capitolo (in inglese)">Python</a><a class="colab-pulsante" href="https://colab.research.google.com/github/fabiofurini/combinatorial-optimization/blob/main/notebooks/local-search_cpp.ipynb" target="_blank" rel="noopener" title="Apri in Google Colab il notebook C++ del capitolo (in inglese)">C++</a></div>

- $VND$ si ferma dopo un numero finito di mosse, per l'argomento della [Proposizione 31.2](ricerca-locale-lo-schema.md#box-2-prop-termination). Quando si ferma, $\textit{Step}_K$ è fallito e, dall'ultima mossa migliorante, sono falliti sulla stessa soluzione tutti i passi $\textit{Step}_1,\dots,\textit{Step}_{K-1}$: la soluzione restituita è un ottimo locale per ogni $N_k$, cioè per l'unione $N_1\cup\dots\cup N_K$.

- Gli intorni sono ordinati dal <strong>più piccolo e meno costoso</strong> al più grande: gli intorni costosi si esplorano solo quando quelli economici sono esauriti. $VND$ è la parte deterministica della variable neighbourhood search di Mladenovic e Hansen (<em>Computers &amp; Operations Research</em> 24, 1997).

<a id="box-16-ex-vndpcm"></a>

!!! esempio "Esempio 31.9: $VND$ su $P\,||\,C_{\max}$ con move e swap"

    Sull'istanza di riferimento, dalla soluzione di $LPT$, con $N_1=$ move e $N_2=$ swap, e il makespan come obiettivo:

    <div class="tabella" markdown="0"><table>
    <tr>
    <th><span class="arithmatex">\(k\)</span></th>
    <th>risultato di <span class="arithmatex">\(\textit{Step}_k\)</span></th>
    <th>carichi</th>
    <th>poi</th>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td>nessuna mossa migliorante</td>
    <td><span class="arithmatex">\((11,8,8)\)</span></td>
    <td><span class="arithmatex">\(k=2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td>swap dei lavori <span class="arithmatex">\(1\)</span> e <span class="arithmatex">\(3\)</span></td>
    <td><span class="arithmatex">\((10,8,9)\)</span></td>
    <td><span class="arithmatex">\(k=1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td>nessuna mossa migliorante</td>
    <td><span class="arithmatex">\((10,8,9)\)</span></td>
    <td><span class="arithmatex">\(k=2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td>swap dei lavori <span class="arithmatex">\(3\)</span> e <span class="arithmatex">\(6\)</span></td>
    <td><span class="arithmatex">\((9,9,9)\)</span></td>
    <td><span class="arithmatex">\(k=1\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(1\)</span></td>
    <td>nessuna mossa migliorante</td>
    <td><span class="arithmatex">\((9,9,9)\)</span></td>
    <td><span class="arithmatex">\(k=2\)</span></td>
    </tr>
    <tr>
    <td><span class="arithmatex">\(2\)</span></td>
    <td>nessuno swap migliorante</td>
    <td><span class="arithmatex">\((9,9,9)\)</span></td>
    <td>stop</td>
    </tr>
    </table></div>

    Nella soluzione con carichi $(10,8,9)$ la mossa migliore dà makespan $11$ (lavoro $5$ o lavoro $7$ dalla macchina $1$ alla macchina $2$), quindi move è di nuovo esaurito, e swap trova l'ottimo.

<a id="box-17-ex-vndtsp"></a>

!!! esempio "Esempio 31.10: $VND$ sul TSP con 2-opt e Or-opt"

    Sull'istanza con $10$ città dell'[Esempio 31.3](tsp-2-opt-e-or-opt.md#box-6-ex-tsp10), dal giro di $NN$ (lunghezza $49$), con $N_1=$ 2-opt, $N_2=$ Or-opt e la regola first improvement, $VND$ esegue le quattro mosse 2-opt della ricerca locale 2-opt ($49\to47\to46\to43\to41$), poi la mossa Or-opt dell'[Esempio 31.4](tsp-2-opt-e-or-opt.md#box-7-ex-oropt), che inserisce la città $9$ fra le città $3$ e $4$ ($41\to39$), e si ferma: il giro ottimo è un ottimo locale per entrambi gli intorni. Con la regola best improvement, il solo 2-opt raggiunge già l'ottimo.

- Sulle due istanze medie della Sezione [31.9](paesaggi-piatti-e-obiettivi-ausiliari.md#sez-sec-flat), con $100$ soluzioni di partenza casuali (seme $1$) e best improvement, $VND$ con $N_1=$ move e $N_2=$ swap dà:

<div class="tabella" markdown="0"><table>
<tr>
<th>istanza</th>
<th>obiettivo</th>
<th>esecuzioni che terminano in un ottimo</th>
<th>valore medio</th>
</tr>
<tr>
<td><span class="arithmatex">\(P\,||\,C_{\max}\)</span>, <span class="arithmatex">\(m=4\)</span>, <span class="arithmatex">\(n=12\)</span></td>
<td><span class="arithmatex">\(C_{\max}\)</span></td>
<td><span class="arithmatex">\(15\)</span></td>
<td><span class="arithmatex">\(20.62\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(P\,||\,C_{\max}\)</span>, <span class="arithmatex">\(m=4\)</span>, <span class="arithmatex">\(n=12\)</span></td>
<td><span class="arithmatex">\(\sum_h L_h^2\)</span></td>
<td><span class="arithmatex">\(68\)</span></td>
<td><span class="arithmatex">\(19.32\)</span></td>
</tr>
<tr>
<td>BPP, <span class="arithmatex">\(c=10\)</span>, <span class="arithmatex">\(n=12\)</span></td>
<td><span class="arithmatex">\(\sum_b L_b^2\)</span></td>
<td><span class="arithmatex">\(89\)</span></td>
<td><span class="arithmatex">\(5.11\)</span></td>
</tr>
</table></div>

- Rispetto ai singoli intorni della Sezione [31.9](paesaggi-piatti-e-obiettivi-ausiliari.md#sez-sec-flat), $VND$ con l'obiettivo ausiliario raggiunge l'ottimo in $68$ esecuzioni su $100$ per $P\,||\,C_{\max}$ (solo move: $4$) e in $89$ per il BPP (solo move: $76$). Combinare gli intorni e usare l'obiettivo ausiliario sono miglioramenti indipendenti, e si sommano.

---

**Avanti:** [31.12 Ricerca locale multi-start](ricerca-locale-multi-start.md)
