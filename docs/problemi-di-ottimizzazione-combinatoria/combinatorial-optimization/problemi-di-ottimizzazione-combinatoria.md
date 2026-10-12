---
title: "Problemi di ottimizzazione combinatoria"
---

# 1.1 Problemi di ottimizzazione combinatoria

<div class="info-capitolo" markdown>

**Parte 1 · Problemi di ottimizzazione combinatoria · Capitolo 1** · [:material-book-open-variant: Capitolo 1: Ottimizzazione combinatoria](index.md) · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-problemi-di-ottimizzazione-combinatoria.pdf) · [:material-pencil: Esercizi: Ottimizzazione combinatoria](../../esercizi/combinatorial-optimization.md) · [:material-gesture-tap: App: Forza bruta sul problema dello zaino 0/1](../../laboratorio/zaino-forza-bruta.md)

</div>

<a id="box-1-def-cop"></a>

!!! definizione "Definizione 1.1: problema di ottimizzazione combinatoria"

    Dati:

    1. un insieme <u>finito</u> $\mathscr{U} = \{1,2,\dots,n\}$, detto <strong>insieme base</strong>,

    2. una famiglia $\mathcal{F} \subseteq 2^{\mathscr{U}}$ di sottoinsiemi di $\mathscr{U}$, detti <strong>soluzioni ammissibili</strong>,

    3. una <strong>funzione obiettivo</strong> $f : \mathcal{F} \rr \R$,

    il <strong>problema di ottimizzazione combinatoria</strong> associato chiede di trovare una soluzione ammissibile $\tilde S \in \mathcal{F}$ tale che

    $$
    f(\tilde S) \ge f(S), \qquad \forall S \in \mathcal{F} \qquad \text{(forma di massimo)},
    $$

    oppure tale che

    $$
    f(\tilde S) \le f(S), \qquad \forall S \in \mathcal{F} \qquad \text{(forma di minimo)}.
    $$

- La regione ammissibile $\mathcal{F}$ è un insieme <strong>finito</strong>, poiché $|2^{\mathscr{U}}| = 2^n$. Di conseguenza, una soluzione ottima esiste sempre quando $\mathcal{F} \neq \emptyset$.

- Nella maggior parte dei problemi la funzione obiettivo è <strong>lineare</strong> (additiva): ogni elemento $j \in \mathscr{U}$ ha un peso $c_j$ e

    $$
    f(S) = \sum_{j \in S} c_j .
    $$

    Alcuni problemi hanno un obiettivo diverso, per esempio la più grande fra diverse somme, che è un massimo e non una somma.

- Un <strong>problema</strong> è una domanda generale con dati simbolici; un'<strong>istanza</strong> $I$ del problema si ottiene fissando i numeri. Indichiamo con $z(I)$ il valore ottimo dell'istanza $I$.

<a id="box-2-ex-oc1-small"></a>

!!! esempio "Esempio 1.1: una piccola istanza"

    Consideriamo l'insieme base $\mathscr{U} = \{1,2,3,4\}$, i pesi $\vet{c} = (7,6,4,3)$ e l'obiettivo additivo $f(S) = \sum_{j \in S} c_j$, da massimizzare. Le soluzioni ammissibili sono gli $11$ sottoinsiemi

    $$
    \mathcal{F} = \big\{ \emptyset, \{1\}, \{2\}, \{3\}, \{4\}, \{1,3\}, \{1,4\}, \{2,3\}, \{2,4\}, \{3,4\},
    \{2,3,4\} \big\}.
    $$

    Per esempio, $f(\{1,3\}) = 7+4 = 11$ e $f(\{2,3,4\}) = 6+4+3 = 13$, mentre il sottoinsieme $\{1,2\}$ non è ammissibile. Chiamiamo questa istanza <span style="color:#1971c2">[Esempio 1.1](#box-2-ex-oc1-small)</span>.

- Qui $\mathcal{F}$ è elencata. Nei problemi del corso non è mai elencata: è descritta da una regola, per esempio un vincolo di capacità, ed è troppo grande per essere scritta.

!!! chiave ""

    L'<strong>ottimizzazione combinatoria</strong> studia i problemi di ottimizzazione su <strong>strutture discrete</strong> e <strong>oggetti combinatori</strong>, come grafi, sottoinsiemi, permutazioni, sequenze, partizioni, coperture e impaccamenti.

- Le <strong>caratteristiche principali</strong> dei problemi di ottimizzazione combinatoria sono:

    1. l'insieme delle soluzioni ammissibili è <strong>finito</strong>;

    2. il numero di soluzioni ammissibili è tipicamente <strong>enorme</strong>: cresce in modo esponenziale (o più rapido) con la dimensione dell'istanza;

    3. trovare una soluzione ottima può essere <strong>computazionalmente molto difficile</strong> (Sezione [1.6](cenni-di-complessita-computazionale.md#sez-sec-complexity));

    4. servono algoritmi specializzati per esplorare lo spazio delle soluzioni senza enumerarlo.

---

**Avanti:** [1.2 Categorie di problemi di ottimizzazione combinatoria](categorie-di-problemi-di-ottimizzazione-combinatoria.md)
