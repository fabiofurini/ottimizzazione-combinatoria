---
title: "Categorie di problemi di ottimizzazione combinatoria"
---

# 1.2 Categorie di problemi di ottimizzazione combinatoria { #sez-sec-categories }

<div class="info-capitolo" markdown>

**Parte 1 · Problemi di ottimizzazione combinatoria · Capitolo 1** · [:material-book-open-variant: Capitolo 1: Ottimizzazione combinatoria](index.md) · [:material-file-pdf-box: Dispensa, volume 1 (PDF)](../../pdf/dispensa-1-problemi-di-ottimizzazione-combinatoria.pdf) · [:material-pencil: Esercizi: Ottimizzazione combinatoria](../../esercizi/combinatorial-optimization.md) · [:material-gesture-tap: App: Forza bruta sul problema dello zaino 0/1](../../laboratorio/zaino-forza-bruta.md)

</div>

- Le decisioni di un problema di ottimizzazione combinatoria rientrano in cinque <strong>categorie</strong>. A ogni categoria sono associati un oggetto combinatorio, che è la forma di una soluzione, e un tipo naturale di variabili decisionali.

## 1.2.1 Categorie di decisioni

1. <strong>IN/OUT (inclusione/esclusione).</strong> Ogni elemento è selezionato oppure no: una soluzione è un <strong>sottoinsieme</strong> degli elementi, descritto da variabili binarie $x_j \in \{0,1\}$, con $x_j = 1$ se e solo se l'elemento $j$ è selezionato.

    - Esempi: selezionare i progetti da finanziare con un budget limitato, scegliere i prodotti di un portafoglio, decidere quali clienti visitare in un percorso.

2. <strong>Conteggio (quantità discrete).</strong> La decisione è quante unità di ogni elemento usare: una soluzione è un vettore di <strong>quantità intere</strong>, descritto da variabili intere $x_j \in \Z_{\ge 0}$.

    - Esempi: quante unità di un prodotto produrre, quanti operatori assegnare a un turno, quanti server attivare in un data center.

3. <strong>Assegnamento.</strong> Ogni elemento è assegnato a esattamente una fra diverse risorse distinte: una soluzione è una <strong>funzione</strong> dagli elementi alle risorse, descritta da variabili binarie $x_{ij} \in \{0,1\}$, uguali a $1$ se e solo se l'elemento $j$ è assegnato alla risorsa $i$.

    - Esempi: assegnare compiti a macchine o persone, abbinare studenti a progetti, allocare veicoli ai percorsi di consegna.

4. <strong>Ordinamento e sequenze.</strong> La decisione è l'ordine in cui gli elementi sono lavorati o visitati: una soluzione è una <strong>permutazione</strong> $\sigma = (\sigma_1,\dots,\sigma_n)$ degli elementi, o un ordinamento ciclico per un giro.

    - Esempi: l'ordine in cui sono lavorati i lavori, la sequenza delle operazioni su una macchina, l'ordine di visita dei clienti.

5. <strong>Configurazione e partizionamento.</strong> Gli elementi sono suddivisi in gruppi, ciascuno dei quali soddisfa una condizione come una capacità: una soluzione è una <strong>partizione</strong> degli elementi in gruppi intercambiabili.

    - Esempi: suddividere un insieme di elementi in gruppi, impaccare oggetti in contenitori, tagliare materiali minimizzando lo sfrido.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Categoria</strong></th>
<th><strong>Oggetto combinatorio</strong></th>
<th><strong>Variabili naturali</strong></th>
</tr>
<tr>
<td>IN/OUT</td>
<td>sottoinsieme</td>
<td><span class="arithmatex">\(x_j \in \{0,1\}\)</span></td>
</tr>
<tr>
<td>conteggio</td>
<td>vettore di quantità intere</td>
<td><span class="arithmatex">\(x_j \in \Z_{\ge 0}\)</span></td>
</tr>
<tr>
<td>assegnamento</td>
<td>funzione (classi etichettate)</td>
<td><span class="arithmatex">\(x_{ij} \in \{0,1\}\)</span>, una risorsa <span class="arithmatex">\(i\)</span> per ogni <span class="arithmatex">\(j\)</span></td>
</tr>
<tr>
<td>ordinamento e sequenze</td>
<td>permutazione, ordinamento ciclico</td>
<td><span class="arithmatex">\(x_{ij} \in \{0,1\}\)</span>, uguale a <span class="arithmatex">\(1\)</span> se <span class="arithmatex">\(j\)</span> segue <span class="arithmatex">\(i\)</span></td>
</tr>
<tr>
<td>configurazione e partizionamento</td>
<td>partizione (classi non etichettate)</td>
<td><span class="arithmatex">\(x_{ij} \in \{0,1\}\)</span>, elemento <span class="arithmatex">\(j\)</span> nel gruppo <span class="arithmatex">\(i\)</span></td>
</tr>
</table></div>

- La tabella riassume le cinque categorie, i loro oggetti combinatori e le loro variabili naturali.

- Con un insieme base opportuno ogni categoria rientra nella [Definizione 1.1](problemi-di-ottimizzazione-combinatoria.md#box-1-def-cop): per un assegnamento l'insieme base è l'insieme delle coppie (elemento, risorsa), per un ordinamento l'insieme delle coppie di elementi consecutivi.

- Assegnamento e partizionamento differiscono solo nelle risorse: risorse distinte danno classi etichettate, risorse identiche danno gruppi intercambiabili (Sezione [1.3](contare-le-soluzioni.md#sez-sec-counting)).

!!! chiave ""

    La categoria delle decisioni determina l'oggetto combinatorio delle soluzioni, il numero di soluzioni candidate e le variabili decisionali naturali.

## 1.2.2 Aree applicative

- I problemi di ottimizzazione combinatoria nascono in molte aree applicative. Le principali, con le loro decisioni tipiche e alcuni esempi, sono:

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Area</strong></th>
<th><strong>Decisioni tipiche</strong></th>
<th><strong>Esempi</strong></th>
</tr>
<tr>
<td>pianificazione della produzione</td>
<td>che cosa, quando e quanto produrre, con quali risorse</td>
<td>lot sizing, pianificazione della capacità, bilanciamento delle linee di assemblaggio</td>
</tr>
<tr>
<td>scheduling</td>
<td>ordine e tempi delle operazioni sulle risorse</td>
<td>scheduling dei lavori sulle macchine, scheduling di progetti, scheduling della manutenzione</td>
</tr>
<tr>
<td>localizzazione di impianti</td>
<td>dove aprire gli impianti e quali clienti serve ciascuno</td>
<td>localizzazione di magazzini, di stabilimenti, di servizi di emergenza</td>
</tr>
<tr>
<td>packing</td>
<td>come sistemare oggetti in contenitori</td>
<td>selezione del carico, carico di più veicoli, carico dei pallet</td>
</tr>
<tr>
<td>taglio</td>
<td>come tagliare il materiale grezzo nei pezzi richiesti</td>
<td>taglio di barre e lastre, minimizzazione dello sfrido, taglio a ghigliottina</td>
</tr>
<tr>
<td>logistica e catena di fornitura</td>
<td>percorsi, flotte e livelli di scorta</td>
<td>instradamento di veicoli, gestione della flotta, gestione delle scorte</td>
</tr>
<tr>
<td>trasporti</td>
<td>equipaggi, veicoli e orari di un sistema di mobilità</td>
<td>turnazione degli equipaggi, instradamento degli aerei, orari ferroviari</td>
</tr>
<tr>
<td>gestione del personale</td>
<td>assegnamento di persone a compiti, turni e ruoli</td>
<td>pianificazione della forza lavoro, turni degli infermieri, pianificazione dei turni</td>
</tr>
<tr>
<td>progettazione di reti</td>
<td>quali nodi e archi di una rete attivare</td>
<td>reti di telecomunicazione, energetiche e di trasporto</td>
</tr>
</table></div>

- Un problema reale combina spesso diverse categorie. Per esempio, la localizzazione di impianti decide quali impianti aprire (IN/OUT) e assegna ogni cliente a un impianto aperto (assegnamento).

## 1.2.3 I problemi del corso per categoria

- La tabella colloca i problemi del corso nelle loro categorie; ogni nome rimanda alla sua pagina.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Soluzione</strong></th>
<th><strong>Categoria</strong></th>
</tr>
<tr>
<td>problema dello zaino <a href="../../knapsack/il-problema-dello-zaino-0-1/">0/1 (KP)</a></td>
<td>sottoinsieme di oggetti</td>
<td>IN/OUT</td>
</tr>
<tr>
<td><a href="../../knapsack/il-problema-del-subset-sum/">problema del subset sum (SSP)</a></td>
<td>sottoinsieme di oggetti</td>
<td>IN/OUT</td>
</tr>
<tr>
<td><a href="../../knapsack/il-problema-dello-zaino-limitato/">problema dello zaino limitato (BKP)</a></td>
<td>numero di copie di ogni oggetto</td>
<td>conteggio</td>
</tr>
<tr>
<td><a href="../../knapsack/il-problema-dello-zaino-illimitato/">problema dello zaino illimitato (UKP)</a></td>
<td>numero di copie di ogni oggetto</td>
<td>conteggio</td>
</tr>
<tr>
<td><a href="../../knapsack/il-problema-dello-zaino-multidimensionale/">problema dello zaino multidimensionale (MDKP)</a></td>
<td>sottoinsieme di oggetti</td>
<td>IN/OUT</td>
</tr>
<tr>
<td><a href="../../knapsack/il-problema-degli-zaini-multipli/">problema degli zaini multipli (MKP)</a></td>
<td>ogni oggetto in uno zaino o in nessuno</td>
<td>assegnamento</td>
</tr>
<tr>
<td><a href="../../knapsack/il-problema-dello-zaino-a-scelta-multipla/">problema dello zaino a scelta multipla (MCKP)</a></td>
<td>un oggetto per classe</td>
<td>IN/OUT</td>
</tr>
<tr>
<td><a href="../../knapsack/il-problema-dello-zaino-con-setup/">problema dello zaino con setup (KPS)</a></td>
<td>sottoinsieme di classi e di oggetti</td>
<td>IN/OUT</td>
</tr>
<tr>
<td><a href="../../bin-packing/il-problema-del-bin-packing/">problema del bin packing (BPP)</a></td>
<td>partizione degli oggetti nei contenitori</td>
<td>partizionamento</td>
</tr>
<tr>
<td><a href="../../bin-packing/il-problema-del-cutting-stock/">problema del cutting stock (CSP)</a></td>
<td>numero di rotoli tagliati con ogni schema</td>
<td>configurazione, conteggio</td>
</tr>
<tr>
<td><a href="../../coloring/il-problema-della-colorazione-dei-vertici/">problema della colorazione dei vertici (VCP)</a></td>
<td>partizione dei vertici in insiemi stabili</td>
<td>partizionamento</td>
</tr>
<tr>
<td><a href="../../clique/il-problema-della-cricca-massima/">problema della clique massima (MCP)</a></td>
<td>sottoinsieme di vertici</td>
<td>IN/OUT</td>
</tr>
<tr>
<td><a href="../../clique/il-problema-della-cricca-massima/">problema dell'insieme stabile massimo (MSSP)</a></td>
<td>sottoinsieme di vertici</td>
<td>IN/OUT</td>
</tr>
<tr>
<td><a href="../../tsp/il-problema-del-commesso-viaggiatore/">problema del commesso viaggiatore (TSP)</a></td>
<td>ordinamento ciclico delle città</td>
<td>ordinamento</td>
</tr>
<tr>
<td><a href="../../tsp/varianti-tsp-metrico-e-tsp-asimmetrico/">problema del commesso viaggiatore asimmetrico (ATSP)</a></td>
<td>ordinamento delle città su un giro</td>
<td>ordinamento</td>
</tr>
<tr>
<td><a href="../../pcmax/scheduling-su-macchine-parallele-identiche/">scheduling su macchine parallele identiche (<span class="arithmatex">\(P\|C_{\max}\)</span>)</a></td>
<td>assegnamento dei lavori alle macchine</td>
<td>assegnamento</td>
</tr>
<tr>
<td><a href="../../lot-sizing/il-problema-del-lot-sizing-capacitato/">problema di lot sizing capacitato (CLS)</a></td>
<td>periodi di setup e quantità prodotte</td>
<td>IN/OUT, conteggio</td>
</tr>
</table></div>

---

**Avanti:** [1.3 Contare le soluzioni](contare-le-soluzioni.md)
