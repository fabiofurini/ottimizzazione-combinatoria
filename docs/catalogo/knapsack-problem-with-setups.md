---
title: "Problema dello zaino con setup (KPS)"
---

# Problema dello zaino con setup (KPS)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi di zaino](knapsack-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-knapsack-problem-with-setups"></a>

<a id="box-1-def-catdef-kps"></a>

!!! definizione "Definizione 1: Problema dello zaino con setup"

    Dati:

    1. uno zaino di <em>capacità</em> $c \in \Z_{\ge 1}$,

    2. un insieme $\mathscr{I} = \{1,2,\dots,n\}$ di $n$ oggetti,

    3. una partizione dell'insieme degli oggetti in $q \in \Z_{\ge 2}$ classi,

    4. per ogni classe $h \in \{1,2,\dots,q\}$, il sottoinsieme $\mathscr{J}_h \subseteq \mathscr{I}$ degli oggetti di quella classe, con un <em>costo di setup</em> $f_h \in \Z_{\ge 1}$ e un <em>peso di setup</em> $s_h \in \Z_{\ge 1}$ associati,

    5. per ogni oggetto $j \in \mathscr{I}$, un <em>ricavo</em> $p_j \in \Z_{\ge 1}$ e un <em>peso</em> $w_j \in \Z_{\ge 1}$,

    il <strong>problema dello zaino con setup</strong> (KPS) chiede di decidere quali oggetti inserire nello zaino, in modo che il peso totale degli oggetti selezionati più i pesi di setup delle loro classi non superi la capacità dello zaino e il ricavo totale degli oggetti selezionati meno i costi di setup delle loro classi sia massimo.

<strong>Ipotesi</strong>

- Facciamo le seguenti ipotesi:

    1. Ogni classe contiene almeno un oggetto. Formalmente:

        $$
        \mathscr{J}_h \neq \emptyset \qquad \forall\, h\in\{1,2,\dots,q\}.
        $$

    2. Ogni oggetto entra nello zaino insieme al peso di setup della sua classe (altrimenti non può mai essere selezionato). Formalmente:

        $$
        w_j + s_h \le c \qquad \forall\, h\in\{1,2,\dots,q\},\ \forall\, j\in \mathscr{J}_h.
        $$

## Che cosa fa il corso su questo problema { #sez-sec-cat-kps-vert }

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Tecnica</strong></th>
<th><strong>Dove</strong></th>
</tr>
<tr>
<td><strong>Definizione</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/knapsack/il-problema-dello-zaino-con-setup/#box-16-defKPS">Cap. 2 «Problemi di zaino»</a></td>
</tr>
<tr>
<td><strong>Formulazioni</strong></td>
<td><a href="../../formulazioni/knapsack-formulations/un-modello-pli-per-il-problema-dello-zaino-con-setup/#sez-sec-kpf-KPS">Cap. 9 «Formulazioni dei problemi di zaino»</a></td>
</tr>
<tr>
<td><strong>Programmazione dinamica</strong></td>
<td><a href="../../programmazione-dinamica/dp-principles/#164-gli-algoritmi-di-pd-di-questo-modulo">Cap. 16 «Principi della programmazione dinamica»</a>; <a href="../../programmazione-dinamica/dp-knapsack-setups/">Cap. 23 «PD per il problema dello zaino con setup»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/knapsack-formulations/#esercizio-9-12">Esercizio 9.12</a>; <a href="../../esercizi/dp-knapsack-setups/">Cap. 23 (5 esercizi)</a></td>
</tr>
</table></div>
