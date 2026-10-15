---
title: "Problemi di cricca"
---

# Problemi di cricca

<div class="info-capitolo" markdown>

[:material-view-list: **Catalogo dei problemi di ottimizzazione combinatoria**](index.md) · [:material-file-pdf-box: Catalogo (PDF)](../pdf/catalogo-problemi-combinatori.pdf)

</div>

<a id="sec:cat-pagina-clique-problems"></a>

- Dato un grafo non orientato $G=(V,E)$, una cricca è un sottoinsieme di vertici a due a due adiacenti; l'obiettivo è massimizzarne la cardinalità $\omega(G)$, o un peso dei suoi vertici o dei suoi lati.

- Un insieme stabile di $G$ è una cricca del grafo complementare $\bar G$, quindi il problema dell'insieme stabile massimo appartiene alla stessa famiglia.

<div class="tabella" markdown="0"><table>
<tr>
<th><strong>Problema</strong></th>
<th><strong>Sigla</strong></th>
<th><strong>Differenza</strong></th>
</tr>
<tr>
<td><a href="../maximum-clique-problem/">Problema della cricca massima</a></td>
<td>MCP</td>
<td>Il problema centrale della famiglia.</td>
</tr>
<tr>
<td><a href="../maximum-stable-set-problem/">Problema dell'insieme stabile massimo</a></td>
<td>MSSP</td>
<td>Un sottoinsieme è una cricca di <span class="arithmatex">\(G\)</span> se e solo se è un insieme stabile di <span class="arithmatex">\(\overline{G}\)</span>: <span class="arithmatex">\(\omega(G) = \alpha(\overline{G})\)</span> e <span class="arithmatex">\(\alpha(G) = \omega(\overline{G})\)</span>.</td>
</tr>
<tr>
<td><a href="../vertex-weighted-maximum-clique-problem/">Problema della cricca massima pesata sui vertici</a></td>
<td>VWMCP</td>
<td>Con tutti i pesi <span class="arithmatex">\(w_v=1\)</span> è l'MCP.</td>
</tr>
<tr>
<td><a href="../edge-weighted-maximum-clique-problem/">Problema della cricca massima pesata sui lati</a></td>
<td>EWMCP</td>
<td>Con <span class="arithmatex">\(r_{uv}=1\)</span> è di nuovo l'MCP, perché <span class="arithmatex">\(r(K)=\binom{|K|}{2}\)</span> cresce con <span class="arithmatex">\(|K|\)</span>.</td>
</tr>
</table></div>
