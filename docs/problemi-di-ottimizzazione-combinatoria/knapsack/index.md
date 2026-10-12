---
title: "Problemi di zaino"
---

# Problemi di zaino

<div class="info-capitolo" markdown>

**Parte 1 · Problemi di ottimizzazione combinatoria · Capitolo 2** · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-problemi-di-ottimizzazione-combinatoria.pdf) · [:material-pencil: Esercizi: Problemi di zaino](../../esercizi/knapsack.md) · [:material-gesture-tap: App: Forza bruta sul problema dello zaino 0/1](../../laboratorio/zaino-forza-bruta.md)

</div>

!!! nota "Prerequisiti"

    - Da questo modulo, [Capitolo 1 «Problemi di ottimizzazione combinatoria»](../combinatorial-optimization/index.md): istanze, soluzioni ammissibili, bound primali e duali e gap.

    - Dai <em>Preliminari</em>: sottoinsiemi di un insieme finito e il numero $2^n$ di sottoinsiemi.

!!! chiave "Obiettivi"

    Al termine di questo capitolo saremo in grado di:

    - enunciare la definizione del problema dello zaino 0/1 e delle sue varianti, con istanze e soluzioni ammissibili;

    - spiegare le ipotesi sui dati e perché si possono fare senza perdita di generalità;

    - contare le soluzioni candidate e le soluzioni ammissibili di una piccola istanza;

    - trovare a mano una soluzione ammissibile e calcolare un semplice bound duale combinatorio;

    - distinguere le varianti: copie degli oggetti, più risorse, più zaini, classi di oggetti.

## 2.1 Panoramica della famiglia

- I <strong>problemi di zaino</strong> hanno gli stessi dati: un insieme $\mathscr{I} = \{1,2,\dots,n\}$ di $n$ oggetti, per ogni oggetto $j \in \mathscr{I}$ un <em>peso</em> $w_j \in \Z_{\ge 1}$ e un <em>profitto</em> $p_j \in \Z_{\ge 1}$, e uno o più zaini con una <em>capacità</em> in $\Z_{\ge 1}$.

- Una soluzione decide quali oggetti selezionare, o quante copie di ogni oggetto: il peso totale degli oggetti selezionati non deve superare la capacità dello zaino che li riceve.

- L'obiettivo è massimizzare il profitto totale degli oggetti selezionati.

!!! chiave ""

    Un problema di zaino seleziona oggetti di profitto totale massimo il cui peso totale rispetta le capacità. I membri della famiglia differiscono nel numero di copie degli oggetti, nel numero di capacità e di zaini, e nelle classi in cui gli oggetti sono raggruppati.

- La tabella elenca i membri della famiglia, con la sezione che definisce ciascuno di essi.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Sigla</strong></th>
<th><strong>Differenza rispetto al KP</strong></th>
<th><strong>Sezione</strong></th>
</tr>
<tr>
<td>problema dello zaino 0/1</td>
<td>KP</td>
<td>una copia di ogni oggetto, uno zaino</td>
<td><a href="il-problema-dello-zaino-0-1/#sez-sec-kp-KP">2.2</a></td>
</tr>
<tr>
<td>problema del subset sum</td>
<td>SSP</td>
<td><span class="arithmatex">\(p_j = w_j\)</span>, peso totale esattamente uguale a <span class="arithmatex">\(c\)</span></td>
<td><a href="il-problema-del-subset-sum/#sez-sec-kp-SSP">2.3</a></td>
</tr>
<tr>
<td>problema dello zaino limitato</td>
<td>BKP</td>
<td>al più <span class="arithmatex">\(b_j\)</span> copie dell'oggetto <span class="arithmatex">\(j\)</span></td>
<td><a href="il-problema-dello-zaino-limitato/#sez-sec-kp-BKP">2.4</a></td>
</tr>
<tr>
<td>problema dello zaino illimitato</td>
<td>UKP</td>
<td>un numero illimitato di copie di ogni oggetto</td>
<td><a href="il-problema-dello-zaino-illimitato/#sez-sec-kp-UKP">2.5</a></td>
</tr>
<tr>
<td>problema dello zaino multidimensionale</td>
<td>MDKP</td>
<td><span class="arithmatex">\(k\)</span> capacità <span class="arithmatex">\(c_d\)</span> e pesi <span class="arithmatex">\(w_{dj}\)</span></td>
<td><a href="il-problema-dello-zaino-multidimensionale/#sez-sec-kp-MDKP">2.6</a></td>
</tr>
<tr>
<td>problema degli zaini multipli</td>
<td>MKP</td>
<td><span class="arithmatex">\(m\)</span> zaini con capacità <span class="arithmatex">\(c_k\)</span></td>
<td><a href="il-problema-degli-zaini-multipli/#sez-sec-kp-MKP">2.7</a></td>
</tr>
<tr>
<td>problema dello zaino a scelta multipla</td>
<td>MCKP</td>
<td>classi <span class="arithmatex">\(\mathscr{J}_h\)</span>, esattamente un oggetto per classe</td>
<td><a href="il-problema-dello-zaino-a-scelta-multipla/#sez-sec-kp-MCKP">2.8</a></td>
</tr>
<tr>
<td>problema dello zaino con setup</td>
<td>KPS</td>
<td>classi <span class="arithmatex">\(\mathscr{J}_h\)</span> con costi di setup <span class="arithmatex">\(f_h\)</span> e pesi di setup <span class="arithmatex">\(s_h\)</span></td>
<td><a href="il-problema-dello-zaino-con-setup/#sez-sec-kp-KPS">2.9</a></td>
</tr>
</table></div>

### 2.1.1 Le varianti in breve { #sez-sec-kp-glance }

- Ogni problema della famiglia è illustrato su una piccola istanza, nella sua sezione della tabella precedente e con la notazione di quella sezione.

- La tabella riporta, per queste istanze, il numero di soluzioni candidate, il numero di soluzioni ammissibili e il valore ottimo, calcolati per enumerazione.

- Nel BKP e nell'UKP una soluzione candidata è il vettore dei numeri di copie di ogni oggetto, così che copie identiche non sono contate due volte.

- La soluzione ottima non è sempre unica: l'MKP, l'MCKP e il KPS hanno più soluzioni ottime con lo stesso valore, e nel SSP tre sottoinsiemi raggiungono il valore obiettivo.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Variante</strong></th>
<th><strong>Soluzioni candidate</strong></th>
<th><strong>Numero</strong></th>
<th><strong>Ammissibili</strong></th>
<th><strong>Ottimo</strong></th>
<th><strong>Soluzioni ottime</strong></th>
</tr>
<tr>
<td>KP</td>
<td>sottoinsiemi di <span class="arithmatex">\(6\)</span> oggetti</td>
<td><span class="arithmatex">\(64\)</span></td>
<td><span class="arithmatex">\(13\)</span></td>
<td><span class="arithmatex">\(15\)</span></td>
<td><span class="arithmatex">\(\{1,4\}\)</span></td>
</tr>
<tr>
<td>SSP</td>
<td>sottoinsiemi di <span class="arithmatex">\(6\)</span> oggetti</td>
<td><span class="arithmatex">\(64\)</span></td>
<td><span class="arithmatex">\(3\)</span></td>
<td>sì</td>
<td><span class="arithmatex">\(\{6\}\)</span>, <span class="arithmatex">\(\{1,4\}\)</span>, <span class="arithmatex">\(\{2,3\}\)</span></td>
</tr>
<tr>
<td>BKP</td>
<td>copie <span class="arithmatex">\(x_j \le b_j\)</span></td>
<td><span class="arithmatex">\(144\)</span></td>
<td><span class="arithmatex">\(18\)</span></td>
<td><span class="arithmatex">\(18\)</span></td>
<td>due copie dell'oggetto <span class="arithmatex">\(1\)</span> e l'oggetto <span class="arithmatex">\(5\)</span></td>
</tr>
<tr>
<td>UKP</td>
<td>copie <span class="arithmatex">\(x_j \le \hat b_j\)</span></td>
<td><span class="arithmatex">\(320\)</span></td>
<td><span class="arithmatex">\(22\)</span></td>
<td><span class="arithmatex">\(24\)</span></td>
<td>quattro copie dell'oggetto <span class="arithmatex">\(1\)</span></td>
</tr>
<tr>
<td>MDKP</td>
<td>sottoinsiemi di <span class="arithmatex">\(4\)</span> oggetti</td>
<td><span class="arithmatex">\(16\)</span></td>
<td><span class="arithmatex">\(9\)</span></td>
<td><span class="arithmatex">\(14\)</span></td>
<td><span class="arithmatex">\(\{3,4\}\)</span></td>
</tr>
<tr>
<td>MKP</td>
<td>ogni oggetto in uno zaino o in nessuno</td>
<td><span class="arithmatex">\(243\)</span></td>
<td><span class="arithmatex">\(109\)</span></td>
<td><span class="arithmatex">\(30\)</span></td>
<td><span class="arithmatex">\((S_1,S_2) = (\{1,2\},\{4,5\})\)</span>, <span class="arithmatex">\((\{2,4\},\{1,5\})\)</span>, <span class="arithmatex">\((\{4,5\},\{1,2\})\)</span></td>
</tr>
<tr>
<td>MCKP</td>
<td>un oggetto per classe</td>
<td><span class="arithmatex">\(8\)</span></td>
<td><span class="arithmatex">\(3\)</span></td>
<td><span class="arithmatex">\(17\)</span></td>
<td><span class="arithmatex">\(\{1,4,5\}\)</span>, <span class="arithmatex">\(\{2,3,5\}\)</span></td>
</tr>
<tr>
<td>KPS</td>
<td>sottoinsiemi di <span class="arithmatex">\(6\)</span> oggetti</td>
<td><span class="arithmatex">\(64\)</span></td>
<td><span class="arithmatex">\(40\)</span></td>
<td><span class="arithmatex">\(16\)</span></td>
<td><span class="arithmatex">\(\{1,2,3\}\)</span>, <span class="arithmatex">\(\{4,5,6\}\)</span>, <span class="arithmatex">\(\{1,2,3,6\}\)</span></td>
</tr>
</table></div>

- Nell'MCKP solo $3$ delle $8$ scelte di un oggetto per classe entrano nello zaino: la condizione di ammissibilità fra le ipotesi della Sezione [2.8](il-problema-dello-zaino-a-scelta-multipla.md#sez-sec-kp-MCKP) non è una formalità.

<div class="grid cards sottopagine" markdown>

-   **Panoramica**

    Panoramica della famiglia · Le varianti in breve

    [:octicons-arrow-right-24: Apri](#21-panoramica-della-famiglia)

-   **2.2 Il problema dello zaino 0/1**

    Contare le soluzioni, una prima soluzione e un bound semplice

    [:octicons-arrow-right-24: Apri](il-problema-dello-zaino-0-1.md)

-   **2.3 Il problema del subset sum**

    [:octicons-arrow-right-24: Apri](il-problema-del-subset-sum.md)

-   **2.4 Il problema dello zaino limitato**

    [:octicons-arrow-right-24: Apri](il-problema-dello-zaino-limitato.md)

-   **2.5 Il problema dello zaino illimitato**

    [:octicons-arrow-right-24: Apri](il-problema-dello-zaino-illimitato.md)

-   **2.6 Il problema dello zaino multidimensionale**

    [:octicons-arrow-right-24: Apri](il-problema-dello-zaino-multidimensionale.md)

-   **2.7 Il problema degli zaini multipli**

    [:octicons-arrow-right-24: Apri](il-problema-degli-zaini-multipli.md)

-   **2.8 Il problema dello zaino a scelta multipla**

    [:octicons-arrow-right-24: Apri](il-problema-dello-zaino-a-scelta-multipla.md)

-   **2.9 Il problema dello zaino con setup**

    Osservazioni · Errori tipici · In sintesi

    [:octicons-arrow-right-24: Apri](il-problema-dello-zaino-con-setup.md)

</div>

---

**Avanti:** [2.2 Il problema dello zaino 0/1](il-problema-dello-zaino-0-1.md)

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di zaino](../../esercizi/knapsack.md)

---

**Approfondimento:** [:material-view-list: che cosa fa il corso su questo problema](../../catalogo/knapsack-problem.md)

<!-- laboratorio-interattivo: sezione generata da interattivi.py -->

:material-flask-outline: **Nel laboratorio interattivo:** [Forza bruta sul problema dello zaino 0/1](../../laboratorio/zaino-forza-bruta.md).