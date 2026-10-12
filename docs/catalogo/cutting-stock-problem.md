---
title: "Problema del cutting stock (CSP)"
---

# Problema del cutting stock (CSP)

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-folder-outline: Problemi di packing](packing-problems.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-cutting-stock-problem"></a>

<a id="box-1-def-catdef-csp"></a>

!!! definizione "Definizione 1: Problema del cutting stock"

    Dati:

    1. un numero infinito di contenitori, ciascuno di <em>capacità</em> $c \in \Z_{\ge 1}$,

    2. un insieme $\mathscr{I} = \{1,2,\dots,n\}$ di $n$ oggetti,

    3. per ogni oggetto $j \in \mathscr{I}$, un <em>peso</em> $w_j \in \Z_{\ge 1}$ e un <em>numero di copie richieste</em> $d_j \in \Z_{\ge 1}$,

    il <strong>problema del cutting stock</strong> (CSP) chiede di decidere in quale contenitore sistemare ogni copia di ogni oggetto, in modo che il peso totale delle copie in ogni contenitore non superi la capacità del contenitore, che il numero richiesto di copie di ogni oggetto sia sistemato nei contenitori e che il numero totale di contenitori usati sia minimo.

<strong>Ipotesi</strong>

- Facciamo le seguenti ipotesi:

    1. Il peso totale di tutte le copie richieste supera la capacità di un contenitore (altrimenti tutte le copie entrerebbero in un solo contenitore). Formalmente:

        $$
        \sum_{j\in \mathscr{I}} d_j\, w_j \;>\; c.
        $$

    2. Ogni oggetto, da solo, entra in un contenitore (altrimenti nessuna copia di quell'oggetto può essere impaccata). Formalmente:

        $$
        w_j \le c, \qquad \forall\, j\in \mathscr{I}.
        $$

## Che cosa fa il corso su questo problema { #sez-sec-cat-csp-vert }

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Tecnica</strong></th>
<th><strong>Dove</strong></th>
</tr>
<tr>
<td><strong>Definizione</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/bin-packing/il-problema-del-cutting-stock/#box-4-defCSP">Cap. 3 «Problemi di packing»</a></td>
</tr>
<tr>
<td><strong>Formulazioni</strong></td>
<td><a href="../../formulazioni/bin-packing-formulations/un-modello-pli-per-il-problema-del-cutting-stock/#sez-sec-bpf-CSP">Cap. 10 «Formulazioni dei problemi di packing»</a></td>
</tr>
<tr>
<td><strong>Esercizi</strong></td>
<td><a href="../../esercizi/bin-packing/#esercizio-3-4">Esercizio 3.4</a>; <a href="../../esercizi/bin-packing-formulations/#esercizio-10-6">Esercizio 10.6</a></td>
</tr>
<tr>
<td><strong>Istanze di riferimento</strong></td>
<td><a href="../../problemi-di-ottimizzazione-combinatoria/bin-packing/il-problema-del-cutting-stock/#box-5-ex-csp">Cap. 3</a> (<span class="arithmatex">\(z=3\)</span>)</td>
</tr>
</table></div>
