/* Laboratorio di «Problemi di ottimizzazione combinatoria / Combinatorial Optimization Problems»: strumenti comuni delle ricette.
 *
 * Si carica dopo interattivi.js (window.GI) e gi-comune.js (window.GI_MIP) e prima delle ricette
 * gi-oc-a.js, gi-oc-d.js, gi-oc-e.js, che li trovano in window.GI_OC. Vengono dal laboratorio di Modellazione MIP
 * (passo per passo con ◀ ▶ «Esegui», disegno che si rifà solo quando cambia lo stato) e dalle istanze di
 * riferimento del corso (zaino, colorazione).
 *
 * Il cursore del passo si chiama «passo» / «step»: la sua chiave è "text{passo}" / "text{step}",
 * cioè il nome TeX senza «\», come vuole GI_MIP.inputDi.
 */
(function () {
  "use strict";
  const GI = window.GI, M = window.GI_MIP, T = GI.T;

  const PASSO = T("text{passo}", "text{step}");
  const parPasso = (descr, val = 1) => ({ k: PASSO, nome: "\\" + PASSO, min: 0, max: 20, step: 1, val, colore: "a", cifre: 0, descr });
  const vaiA = (st, v) => { const i = M.inputDi(st, PASSO); if (i) i.value = v; };
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const somma = (v) => v.reduce((a, b) => a + b, 0);
  const lista = (A) => A.join(", ");
  const decrescente = (v) => v.map((_, j) => j).sort((i, j) => (v[j] - v[i]) || (i - j));
  let contatore = 0;
  const nuovoId = () => "i" + (++contatore);

  /** la board ricalcola il disegno quando cambia dimensione */
  function osservaDimensioni(board, st) {
    if (st.dati.ro) st.dati.ro.disconnect();
    if (!window.ResizeObserver || !board.containerObj) return;
    st.dati.ro = new ResizeObserver(() => {
      if (!document.body.contains(st.el) || st.board !== board) return;
      const [w, h] = [board.containerObj.clientWidth, board.containerObj.clientHeight];
      if (w > 0 && h > 0 && st.dati.roDim !== w + "x" + h) { st.dati.roDim = w + "x" + h; st.aggiorna(); }
    });
    st.dati.ro.observe(board.containerObj);
  }
  /** dimensioni del disegno in pixel; se il contenitore è cambiato la board si adegua prima di disegnare */
  const dim = (board) => {
    const el = board.containerObj, cw = el ? el.clientWidth : 0, ch = el ? el.clientHeight : 0;
    if (cw > 0 && ch > 0 && (Math.abs(cw - board.canvasWidth) > 1 || Math.abs(ch - board.canvasHeight) > 1)) board.resizeContainer(cw, ch, true, true);
    return [Math.round(board.canvasWidth || 600), Math.round(board.canvasHeight || 400)];
  };
  /** board in coordinate pixel con l'origine in alto a sinistra: restituisce [W, H] */
  function pix(board) {
    const [W, H] = dim(board);
    board.setBoundingBox([0, H, W, 0], false);
    return [W, H];
  }
  /** disegno in pixel (origine in alto a sinistra) sopra crea(tipo, parenti, attributi) di M.ridisegna */
  function disegno(crea, H) {
    return {
      rect: (x, y, w, h, a) => M.rett(crea, x, H - y - h, x + w, H - y, a),
      line: (x0, y0, x1, y1, a) => M.linea(crea, x0, H - y0, x1, H - y1, a),
      text: (x, y, s, a) => M.scritta(crea, x, H - y, s, a),
      dot: (x, y, r, a) => crea("point", [x, H - y], Object.assign({ name: "", fixed: true, size: r, highlight: false, showInfobox: false, withLabel: false, strokeWidth: 1.5 }, a)),
    };
  }
  /** stato iniziale da un link: #passo=3 (o #step=3) e #voce=chiave (una voce di «funzioni») */
  function daIndirizzo(st) {
    if (st.dati.indirizzo) return;
    st.dati.indirizzo = true;
    const h = decodeURIComponent(location.hash || "");
    const v = /voce=([\w-]+)/.exec(h), k = /(?:passo|step)=(\d+)/.exec(h);
    if (!v && !k) return;
    setTimeout(() => {
      if (v && v[1] !== st.chiave()) {
        const R = window.GI_RICETTE[st.el.dataset.grafico], i = Object.keys(R.funzioni || {}).indexOf(v[1]);
        const b = st.el.querySelectorAll(".gi-chip")[i];
        if (b) b.click();
      }
      if (k) setTimeout(() => st.imposta(PASSO, +k[1]), 50);
    }, 30);
  }
  /** sceglie la voce k di «funzioni» come un clic sul suo pulsante (la board si ricrea) */
  function scegliVoce(st, k) {
    if (!k || k === st.chiave()) return;
    const R = window.GI_RICETTE[st.el.dataset.grafico], i = Object.keys((R && R.funzioni) || {}).indexOf(k);
    const b = st.el.querySelectorAll(".gi-chip")[i];
    if (b) b.click();
  }
  /** Vetrina: l'app nella home della collana, <div class="gi" data-grafico="…" data-vetrina="…"> (COLLANA/collana.py,
   *  sesto campo di APP). Senza l'attributo non fa nulla: nel laboratorio l'app resta com'è.
   *  Va chiamata in monta(board, st), dopo M.comandi e menuIstanze; agisce una volta sola per grafico:
   *  prepara(valore) carica l'istanza della vetrina (il valore lo legge la ricetta) e può restituire { passo };
   *  poi il passo va lì (default: l'ultimo, cioè il disegno completo) e il pannello si alleggerisce:
   *  restano le voci, i cursori, ◀ ▶ «Esegui» e le letture; spariscono «Prova tu», il menu delle istanze,
   *  i pulsanti delle istanze e «Azzera» (che sono nella pagina del laboratorio). */
  function vetrina(st, prepara) {
    const v = st.el.dataset.vetrina, D = st.dati;
    if (!v || D.vetrina) return;
    D.vetrina = true;
    st.el.classList.add("gi-vetrina");
    // nella home la colonna unica del telefono non deve allargarsi oltre lo schermo (formule e alberi larghi)
    const corpo = st.el.querySelector(".gi-corpo");
    if (corpo) for (const c of corpo.children) c.style.minWidth = "0";
    setTimeout(() => {
      let opz = {};
      try { opz = prepara(v) || {}; } catch (e) { console.error("GI: vetrina «" + st.el.dataset.grafico + "»", e); }
      st.aggiorna();
      const i = M.inputDi(st, PASSO);
      if (i) { i.value = opz.passo != null ? Math.min(+opz.passo, +i.max) : i.max; st.aggiorna(); }
      const pan = M.pannello(st);
      pan.querySelectorAll(".gi-domanda").forEach((e) => { e.hidden = true; });
      if (D.menu) D.menu.style.display = "none";
      if (D.comandi) {
        let dopo = false;
        for (const b of D.comandi.children) { if (dopo) b.style.display = "none"; if (b.tagName === "SELECT") dopo = true; }
      }
      for (const div of pan.children) {
        if (div !== D.comandi && div.children.length === 1 && div.firstElementChild.matches("button.gi-btn")) div.style.display = "none";
      }
    }, 40);
  }
  /** legge dati dall'utente: finestra di dialogo con un esempio; restituisce il testo o null */
  const chiedi = (msg, esempio) => { try { return window.prompt(msg, esempio); } catch (e) { return null; } };
  /** «4, 4, 5, 3» -> [4, 4, 5, 3]; null se non sono tutti interi positivi */
  const interi = (s) => {
    const v = String(s).split(/[\s,;]+/).filter(Boolean).map(Number);
    return v.length && v.every((x) => Number.isInteger(x) && x >= 1) ? v : null;
  };
  /** frazione {n, d} in testo semplice (per le etichette del disegno): 7/3 */
  const frTxt = (q) => (q.d === 1 ? String(q.n) : `${q.n}/${q.d}`);

  /** Menu a tendina delle istanze, sopra i pulsanti dei comandi (va chiamato dopo M.comandi, in monta):
   *  voci = [[nome, titolo], …] (le istanze dei capitoli, con il nome che hanno nelle dispense);
   *  scelta() = indice della voce corrente (−1: nessuna, per esempio un'istanza casuale);
   *  cambia(i) carica la voce i. Si crea una volta sola per grafico; a ogni chiamata si riallinea. */
  function menuIstanze(st, voci, scelta, cambia) {
    const D = st.dati;
    let sel = D.menu && st.el.contains(D.menu) ? D.menu : null;
    if (!sel || sel.dataset.voci !== voci.map((v) => v[0]).join("|")) {
      if (sel) sel.remove();
      sel = GI.h("select", { class: "gi-btn", title: T("istanza", "instance"), "aria-label": T("istanza", "instance"),
        style: "margin:.1em 0 .45em;max-width:100%;display:block" },
      `<option value="-1" disabled>${T("Istanza: altra", "Instance: other")}</option>` +
        voci.map(([n, t], i) => `<option value="${i}" title="${String(t || "").replace(/"/g, "&quot;")}">${T("Istanza: ", "Instance: ")}${n}</option>`).join(""));
      sel.dataset.voci = voci.map((v) => v[0]).join("|");
      sel.onchange = () => { M.ferma(st); cambia(+sel.value); };
      if (D.comandi && st.el.contains(D.comandi)) D.comandi.before(sel);
      else M.pannello(st).prepend(sel);
      D.menu = sel;
    }
    sel.value = String(scelta());
    return sel;
  }

  window.GI_OC = { PASSO, parPasso, vaiA, clamp, somma, lista, decrescente, nuovoId, osservaDimensioni, dim, pix, disegno, daIndirizzo, chiedi, interi, frTxt, menuIstanze, vetrina, scegliVoce };
})();
