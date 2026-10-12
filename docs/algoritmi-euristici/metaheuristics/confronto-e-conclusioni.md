---
title: "Confronto e conclusioni"
---

# 32.11 Confronto e conclusioni { #sez-sec-closing }

<div class="info-capitolo" markdown>

**Parte 4 · Algoritmi euristici · Capitolo 32** · [:material-book-open-variant: Capitolo 32: Metaeuristiche](index.md) · [:material-file-pdf-box: Dispensa, volume 4 (PDF)](../../pdf/dispensa-4-algoritmi-euristici.pdf) · [:material-pencil: Esercizi: Metaeuristiche](../../esercizi/metaheuristics.md) · [:material-gesture-tap: App: TSP: simulated annealing e tabu search](../../laboratorio/simulated-annealing-tabu-search.md)

</div>

## 32.11.1 I metodi sulle istanze medie

- La tabella raccoglie i risultati degli esperimenti delle sezioni precedenti: per ogni metodo, il miglior valore trovato in $10$ esecuzioni ($seed=1,\dots,10$), come minimo, media e massimo, e il numero di esecuzioni che raggiungono l'ottimo. I metodi deterministici danno lo stesso valore in ogni esecuzione.

<div class="tabella" markdown="0"><table>
<tr>
<th>istanza</th>
<th>metodo</th>
<th>parametri</th>
<th>min</th>
<th>media</th>
<th>max</th>
<th>ottime</th>
</tr>
<tr>
<td>TSP20</td>
<td>NN</td>
<td>—</td>
<td><span class="arithmatex">\(326\)</span></td>
<td><span class="arithmatex">\(326\)</span></td>
<td><span class="arithmatex">\(326\)</span></td>
<td><span class="arithmatex">\(0\)</span></td>
</tr>
<tr>
<td></td>
<td>NN + 2-opt</td>
<td>—</td>
<td><span class="arithmatex">\(319\)</span></td>
<td><span class="arithmatex">\(319\)</span></td>
<td><span class="arithmatex">\(319\)</span></td>
<td><span class="arithmatex">\(0\)</span></td>
</tr>
<tr>
<td></td>
<td><span class="arithmatex">\(SA\)</span></td>
<td><span class="arithmatex">\(T_0=20\)</span>, <span class="arithmatex">\(\alpha=0.95\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(294.3\)</span></td>
<td><span class="arithmatex">\(298\)</span></td>
<td><span class="arithmatex">\(5\)</span></td>
</tr>
<tr>
<td></td>
<td><span class="arithmatex">\(SA\)</span></td>
<td><span class="arithmatex">\(T_0=20\)</span>, <span class="arithmatex">\(\alpha=0.99\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(291.0\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
</tr>
<tr>
<td></td>
<td><span class="arithmatex">\(TS\)</span></td>
<td><span class="arithmatex">\(tenure=5\)</span>, <span class="arithmatex">\(200\)</span> it.</td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
</tr>
<tr>
<td></td>
<td><span class="arithmatex">\(ILS\)</span></td>
<td><span class="arithmatex">\(100\)</span> it.</td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(291.0\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
</tr>
<tr>
<td></td>
<td><span class="arithmatex">\(GRASP\)</span></td>
<td><span class="arithmatex">\(\alpha=0.25\)</span>, <span class="arithmatex">\(20\)</span> it.</td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(291.0\)</span></td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
</tr>
<tr>
<td></td>
<td><span class="arithmatex">\(LNS\)</span></td>
<td><span class="arithmatex">\(q=5\)</span>, <span class="arithmatex">\(200\)</span> it.</td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(293.8\)</span></td>
<td><span class="arithmatex">\(319\)</span></td>
<td><span class="arithmatex">\(9\)</span></td>
</tr>
<tr>
<td></td>
<td>ALNS</td>
<td><span class="arithmatex">\(q=5\)</span>, <span class="arithmatex">\(200\)</span> it.</td>
<td><span class="arithmatex">\(291\)</span></td>
<td><span class="arithmatex">\(299.4\)</span></td>
<td><span class="arithmatex">\(319\)</span></td>
<td><span class="arithmatex">\(7\)</span></td>
</tr>
<tr>
<td>KP20</td>
<td>greedy</td>
<td>—</td>
<td><span class="arithmatex">\(490\)</span></td>
<td><span class="arithmatex">\(490\)</span></td>
<td><span class="arithmatex">\(490\)</span></td>
<td><span class="arithmatex">\(0\)</span></td>
</tr>
<tr>
<td></td>
<td>greedy + ricerca locale</td>
<td>—</td>
<td><span class="arithmatex">\(514\)</span></td>
<td><span class="arithmatex">\(514\)</span></td>
<td><span class="arithmatex">\(514\)</span></td>
<td><span class="arithmatex">\(0\)</span></td>
</tr>
<tr>
<td></td>
<td><span class="arithmatex">\(GRASP\)</span></td>
<td><span class="arithmatex">\(\alpha=0.25\)</span>, <span class="arithmatex">\(20\)</span> it.</td>
<td><span class="arithmatex">\(521\)</span></td>
<td><span class="arithmatex">\(521.0\)</span></td>
<td><span class="arithmatex">\(521\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
</tr>
<tr>
<td></td>
<td><span class="arithmatex">\(GA\)</span></td>
<td><span class="arithmatex">\(P=10\)</span>, <span class="arithmatex">\(300\)</span> it.</td>
<td><span class="arithmatex">\(508\)</span></td>
<td><span class="arithmatex">\(516.9\)</span></td>
<td><span class="arithmatex">\(521\)</span></td>
<td><span class="arithmatex">\(4\)</span></td>
</tr>
<tr>
<td></td>
<td>memetico</td>
<td><span class="arithmatex">\(P=10\)</span>, <span class="arithmatex">\(300\)</span> it.</td>
<td><span class="arithmatex">\(521\)</span></td>
<td><span class="arithmatex">\(521.0\)</span></td>
<td><span class="arithmatex">\(521\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
</tr>
<tr>
<td>PCM15</td>
<td>LPT</td>
<td>—</td>
<td><span class="arithmatex">\(73\)</span></td>
<td><span class="arithmatex">\(73\)</span></td>
<td><span class="arithmatex">\(73\)</span></td>
<td><span class="arithmatex">\(0\)</span></td>
</tr>
<tr>
<td></td>
<td><span class="arithmatex">\(TS\)</span></td>
<td><span class="arithmatex">\(tenure=15\)</span>, <span class="arithmatex">\(300\)</span> it.</td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
</tr>
<tr>
<td></td>
<td><span class="arithmatex">\(VNS\)</span></td>
<td><span class="arithmatex">\(k_{\max}=3\)</span>, <span class="arithmatex">\(300\)</span> it.</td>
<td><span class="arithmatex">\(69\)</span></td>
<td><span class="arithmatex">\(69.3\)</span></td>
<td><span class="arithmatex">\(70\)</span></td>
<td><span class="arithmatex">\(7\)</span></td>
</tr>
<tr>
<td>BPP24</td>
<td>FFD</td>
<td>—</td>
<td><span class="arithmatex">\(10\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
<td><span class="arithmatex">\(0\)</span></td>
</tr>
<tr>
<td></td>
<td><span class="arithmatex">\(LNS\)</span>, riparazione FFD</td>
<td><span class="arithmatex">\(q=3\)</span>, <span class="arithmatex">\(200\)</span> it.</td>
<td><span class="arithmatex">\(10\)</span></td>
<td><span class="arithmatex">\(10.0\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
<td><span class="arithmatex">\(0\)</span></td>
</tr>
<tr>
<td></td>
<td><span class="arithmatex">\(LNS\)</span>, riparazione esatta</td>
<td><span class="arithmatex">\(q=3\)</span>, <span class="arithmatex">\(200\)</span> it.</td>
<td><span class="arithmatex">\(9\)</span></td>
<td><span class="arithmatex">\(9.0\)</span></td>
<td><span class="arithmatex">\(9\)</span></td>
<td><span class="arithmatex">\(10\)</span></td>
</tr>
</table></div>

- Ogni metaeuristica migliora la ricerca locale su cui è costruita, e con parametri adatti diverse di esse raggiungono l'ottimo in ogni esecuzione. La tabella mostra però anche quanto il risultato dipenda dai parametri (la durata tabu di $TS$, l'intensità $q$ della distruzione, il raffreddamento di $SA$) e dalle componenti (la riparazione di $LNS$, la ricerca locale dell'algoritmo memetico). Su quattro istanze piccole non stabilisce una classifica dei metodi: una classifica del genere richiede molte istanze e tempi di calcolo uguali, come discusso nel capitolo [«Algoritmi euristici: definizioni»](../heuristics.md).

## 32.11.2 Intensificazione e diversificazione

- Ogni metaeuristica di questo capitolo combina una componente che <strong>intensifica</strong> (cerca intorno alle soluzioni buone già trovate) e una componente che <strong>diversifica</strong> (sposta la ricerca in regioni inesplorate), e ha parametri che fissano l'equilibrio fra le due.

<div class="tabella" markdown="0"><table>
<tr>
<th>metodo</th>
<th>intensificazione</th>
<th>diversificazione</th>
<th>equilibrio fissato da</th>
</tr>
<tr>
<td><span class="arithmatex">\(SA\)</span></td>
<td>accettare solo mosse miglioranti a bassa temperatura</td>
<td>accettare mosse peggioranti ad alta temperatura</td>
<td><span class="arithmatex">\(T_0\)</span>, fattore di raffreddamento <span class="arithmatex">\(\alpha\)</span>, <span class="arithmatex">\(L\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(TS\)</span></td>
<td>spostarsi sul miglior vicino; ripartire da soluzioni d'élite</td>
<td>lista tabu; penalità sugli attributi frequenti</td>
<td>durata tabu, criterio di aspirazione</td>
</tr>
<tr>
<td><span class="arithmatex">\(ILS\)</span></td>
<td>ricerca locale dopo ogni kick; accettare solo ottimi locali migliori</td>
<td>il kick</td>
<td>intensità del kick, criterio di accettazione</td>
</tr>
<tr>
<td><span class="arithmatex">\(VNS\)</span></td>
<td>ricerca locale; ritorno a <span class="arithmatex">\(k=1\)</span> dopo un miglioramento</td>
<td>shaking in <span class="arithmatex">\(N_k\)</span> con <span class="arithmatex">\(k\)</span> crescente</td>
<td><span class="arithmatex">\(k_{\max}\)</span>, gli intorni <span class="arithmatex">\(N_k\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(GRASP\)</span></td>
<td>ricerca locale su ogni soluzione costruita</td>
<td>costruzione randomizzata</td>
<td><span class="arithmatex">\(\alpha\)</span></td>
</tr>
<tr>
<td><span class="arithmatex">\(LNS\)</span> / ALNS</td>
<td>riparazione (euristica o esatta), accettazione</td>
<td>distruzione casuale</td>
<td><span class="arithmatex">\(q\)</span>, scelta dei metodi, pesi</td>
</tr>
<tr>
<td><span class="arithmatex">\(GA\)</span> / memetico</td>
<td>selezione, sostituzione, ricerca locale (memetico)</td>
<td>crossover, mutazione</td>
<td>dimensione della popolazione, <span class="arithmatex">\(p_m\)</span></td>
</tr>
</table></div>

## 32.11.3 Parametri e calibrazione

- Una metaeuristica è un algoritmo solo dopo che i suoi parametri sono stati fissati, e gli esperimenti di questo capitolo mostrano che i parametri possono fare la differenza fra trovare l'ottimo in ogni esecuzione e non trovarlo mai. Sceglierli si chiama <strong>calibrazione</strong> (tuning).

- I parametri vanno calibrati su istanze di <strong>addestramento</strong> e valutati su istanze <em>diverse</em>, altrimenti il quadro è ottimistico. Calibrare un parametro alla volta ignora le loro interazioni (per $SA$, il $T_0$ migliore dipende da $\alpha$); strumenti come <code>irace</code> (López-Ibáñez et al., 2016) li calibrano tutti insieme. Un metodo che funziona bene per un ampio intervallo di parametri è preferibile a uno che funziona molto bene solo per un intervallo ristretto.

## 32.11.4 Che cosa questi metodi non usano

- Nessuna delle metaeuristiche di questo capitolo usa un <strong>rilassamento</strong> del problema o un <strong>solver MIP</strong>. Manipolano solo soluzioni ammissibili (o penalizzate), e producono solo bound <em>primali</em>.

- Di conseguenza, non possono dire quanto siano buone le loro soluzioni. Sulle istanze medie abbiamo potuto misurare la qualità solo perché i valori ottimi erano stati calcolati a parte, con algoritmi esatti.

- Le due eccezioni confermano la regola: per $P\,||\,C_{\max}$ e il BPP, $TS$, $VNS$ e $LNS$ si sono fermati appena hanno raggiunto un lower bound semplice, che è un bound <em>duale</em> che certifica l'ottimalità; quando l'ottimo è sopra il bound, un certificato del genere non esiste, e la ricerca prosegue fino al limite di iterazioni.

- La riparazione esatta di $LNS$ (Sezione [32.9.1](large-neighbourhood-search.md#sez-sec-lns-bpp)), infine, ha mostrato che riottimizzare in modo esatto una parte della soluzione, con il resto fissato, dà intorni molto potenti.

!!! chiave ""

    Le metaeuristiche escono dagli ottimi locali, ma danno solo un lato del gap: il bound primale.

---

**Avanti:** [Errori tipici · In sintesi](errori-tipici.md)
