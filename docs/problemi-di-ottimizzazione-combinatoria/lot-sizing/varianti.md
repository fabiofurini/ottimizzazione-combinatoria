---
title: "Varianti"
---

# 8.6 Varianti { #sez-sec-ls-variants }

<div class="info-capitolo" markdown>

**Parte 1 · Problemi di ottimizzazione combinatoria · Capitolo 8** · [:material-book-open-variant: Capitolo 8: Problemi di lot sizing](index.md) · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-problemi-di-ottimizzazione-combinatoria.pdf) · [:material-presentation: Slide](../../pdf/slide-lot-sizing.pdf) · [:material-pencil: Esercizi: Problemi di lot sizing](../../esercizi/lot-sizing.md)

</div>

- Ogni variante mantiene i dati del CLS (periodi, domande, costi) e cambia una caratteristica del problema. Le definizioni qui sotto riportano solo ciò che cambia.

## 8.6.1 Il problema del lot sizing senza capacità

<a id="box-7-defULS"></a>

!!! definizione "Definizione 8.3: problema del lot sizing senza capacità"

    Il <strong>problema del lot sizing senza capacità</strong> (ULS) è il CLS in cui le capacità non sono vincolanti, per esempio $cap_t \ge \sum_{u \in T} d_u$ per ogni $t \in T$.

- Il ULS si risolve in tempo polinomiale con la programmazione dinamica.

## 8.6.2 Più prodotti e tempi di setup

<a id="box-8-defMLS"></a>

!!! definizione "Definizione 8.4: lot sizing con più prodotti e tempi di setup"

    Nel <strong>problema del lot sizing con più prodotti e tempi di setup</strong> (MLS) un insieme $P$ di prodotti condivide la risorsa di ogni periodo: $d_{pt}$ è la domanda del prodotto $p \in P$ nel periodo $t$, e $cap_t$ è il tempo disponibile nel periodo $t$. Produrre un'unità di $p$ richiede $vt_{pt}$ unità di tempo, e un setup di $p$ costa $sc_{pt}$ e richiede $st_{pt}$ unità di tempo.

## 8.6.3 Scorta iniziale

<a id="box-9-defLSSI"></a>

!!! definizione "Definizione 8.5: lot sizing con scorta iniziale"

    Nel <strong>problema del lot sizing con scorta iniziale</strong> (LS-SI) la quantità $si_p$ del prodotto $p$ disponibile all'inizio dell'orizzonte è una decisione, acquistata al costo $fc_p$ per unità.

## 8.6.4 Straordinario

<a id="box-10-defLSOT"></a>

!!! definizione "Definizione 8.6: lot sizing con straordinario"

    Nel <strong>problema del lot sizing con straordinario</strong> (LS-OT) la capacità non è fissa: il tempo di lavoro in orario normale costa $cw_t$ per unità fino a $cap^{N}_t$, e lo straordinario costa $co_t$ per unità fino a $cap^{O}_t$.

## 8.6.5 Domanda non soddisfatta

<a id="box-11-defLSUD"></a>

!!! definizione "Definizione 8.7: lot sizing con domanda non soddisfatta"

    Nel <strong>problema del lot sizing con domanda non soddisfatta</strong> (LS-UD) una parte della domanda può restare non soddisfatta, con una penalità $cu_{pt}$ per unità.

## 8.7 Osservazioni

- Nel 1958 Wagner e Whitin proposero un algoritmo di programmazione dinamica per il caso senza capacità e con domanda variabile nel tempo. L'algoritmo si basa su una proprietà dei piani ottimi: si produce solo quando la scorta è vuota.

- Con le capacità la proprietà non vale più, e il problema è NP-difficile ([Capitolo 1 «Problemi di ottimizzazione combinatoria»](../combinatorial-optimization/index.md)).

## 8.8 Errori tipici

!!! attenzione "Attenzione"

    - <strong>Produrre in ritardo.</strong> La produzione di un periodo non può servire la domanda di un periodo precedente: la scorta $s_t(\vet{x})$ deve essere non negativa in ogni periodo.

    - <strong>Addebitare un setup quando non si produce nulla.</strong> Un costo di setup si paga solo nei periodi con $x_t > 0$.

    - <strong>Dimenticare la scorta degli ultimi periodi.</strong> Il costo di mantenimento si paga sulla scorta alla fine di ogni periodo, compresi i periodi in cui il piano non produce nulla.

    - <strong>Credere che si produca solo con scorta vuota.</strong> La proprietà di Wagner e Whitin vale senza capacità; con le capacità il piano ottimo dell'<span style="color:#1971c2">[Esempio 8.1](il-problema-del-lot-sizing-capacitato.md#box-2-ex-cls5)</span> la viola.

    - <strong>Contare $2^m$ piani ammissibili.</strong> I $2^m$ sottoinsiemi di periodi sono le scelte di setup: alcune sono inammissibili, e a ciascuna ammissibile corrispondono uno o più piani.

## 8.9 In sintesi

!!! chiave "In sintesi"

    - Il problema del lot sizing capacitato chiede le quantità da produrre in ogni periodo, con capacità, setup e scorte, al minimo costo totale; una soluzione è un piano di produzione.

    - La parte combinatoria è la scelta dei periodi con un setup: ci sono $2^m$ scelte, solo alcune ammissibili, e a ciascuna corrispondono uno o più piani.

    - Il lot-for-lot dà rapidamente un piano, accorpare le domande lo migliora; il numero di setup richiesto dalla domanda totale dà un lower bound.

    - Con le capacità, i piani ottimi possono produrre mentre la scorta è positiva; senza capacità non lo fanno mai.

    - Le varianti aggiungono prodotti, tempi di setup, scorta iniziale, straordinario o domanda non soddisfatta; i loro modelli sono nel [Capitolo 15 «Formulazioni dei problemi di lot sizing»](../../formulazioni/lot-sizing-formulations/index.md).

    <strong>Quadro riassuntivo dell'istanza del CLS</strong> (minimizzazione: il lower bound è un bound duale, l'upper bound è il costo di un piano):

    <div class="tabella" markdown="0"><table>
    <tr>
    <th>Capitolo</th>
    <th>Lower bound</th>
    <th>Upper bound</th>
    <th>Da</th>
    </tr>
    <tr>
    <td>Questo capitolo</td>
    <td><span class="arithmatex">\(150\)</span></td>
    <td><span class="arithmatex">\(250\)</span></td>
    <td>almeno tre setup; lot-for-lot</td>
    </tr>
    <tr>
    <td>Questo capitolo, accorpando</td>
    <td><span class="arithmatex">\(150\)</span></td>
    <td><span class="arithmatex">\(180\)</span></td>
    <td>il piano <span class="arithmatex">\((3,0,4,4,0)\)</span></td>
    </tr>
    <tr>
    <td>Questo capitolo, enumerazione</td>
    <td><span class="arithmatex">\(180\)</span></td>
    <td><span class="arithmatex">\(180\)</span></td>
    <td>i <span class="arithmatex">\(94\)</span> piani ammissibili</td>
    </tr>
    </table></div>

---

**Esercizi su questo capitolo:** [:material-pencil: Problemi di lot sizing](../../esercizi/lot-sizing.md)

---

**Approfondimento:** [:material-view-list: che cosa fa il corso su questo problema](../../catalogo/capacitated-lot-sizing.md)

