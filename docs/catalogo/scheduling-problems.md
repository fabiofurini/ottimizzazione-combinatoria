---
title: "Problemi di scheduling"
---

# Problemi di scheduling

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-scheduling-problems"></a>

- Dati $n$ lavori con i loro tempi di processamento e $m$ macchine parallele, una soluzione assegna ogni lavoro a una macchina, che lo esegue senza interruzioni.

- L'obiettivo è minimizzare il makespan $C_{\max}$, l'istante di completamento dell'ultimo lavoro; nella notazione a tre campi $\alpha\|C_{\max}$ il campo $\alpha$ descrive le macchine: identiche ($P$), un numero fissato di macchine identiche ($Pm$), con velocità diverse ($Q$) o scorrelate ($R$).

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Sigla</strong></th>
<th><strong>Differenza</strong></th>
</tr>
<tr>
<td><a href="../scheduling-on-identical-parallel-machines/">Scheduling su macchine parallele identiche</a></td>
<td><span class="arithmatex">\(P\|C_{\max}\)</span></td>
<td>Il problema centrale della famiglia.</td>
</tr>
<tr>
<td><a href="../scheduling-on-a-fixed-number-of-identical-machines/">Scheduling su un numero fissato di macchine identiche</a></td>
<td><span class="arithmatex">\(Pm\|C_{\max}\)</span></td>
<td>Caso particolare di <span class="arithmatex">\(P\,||\,C_{\max}\)</span> con <span class="arithmatex">\(m\)</span> fissato; con <span class="arithmatex">\(m=2\)</span> chiede di dividere i lavori in due insiemi con carichi il più possibile uguali.</td>
</tr>
<tr>
<td><a href="../scheduling-on-parallel-machines-with-different-speeds/">Scheduling su macchine parallele con velocità diverse</a></td>
<td><span class="arithmatex">\(Q\|C_{\max}\)</span></td>
<td>Generalizza <span class="arithmatex">\(P\,||\,C_{\max}\)</span>, che è il caso di macchine con la stessa velocità.</td>
</tr>
<tr>
<td><a href="../scheduling-on-unrelated-parallel-machines/">Scheduling su macchine parallele scorrelate</a></td>
<td><span class="arithmatex">\(R\|C_{\max}\)</span></td>
<td>Generalizza <span class="arithmatex">\(Q\,||\,C_{\max}\)</span> e <span class="arithmatex">\(P\,||\,C_{\max}\)</span>.</td>
</tr>
</table></div>
