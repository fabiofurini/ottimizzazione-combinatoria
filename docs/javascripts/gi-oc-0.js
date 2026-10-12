/* Laboratorio di «Ottimizzazione combinatoria / Combinatorial Optimization»: strumenti comuni delle ricette.
 *
 * Si carica dopo interattivi.js (window.GI) e gi-comune.js (window.GI_MIP) e prima delle ricette
 * gi-oc-a.js, gi-oc-b.js, che li trovano in window.GI_OC. Vengono dal laboratorio di Modellazione MIP
 * (passo per passo con ◀ ▶ «Esegui», disegno che si rifà solo quando cambia lo stato) e dalle istanze di
 * riferimento del corso (zaino, bin packing, P||Cmax, TSP).
 *
 * Il cursore del passo si chiama «passo» / «step»: la sua chiave è "text{passo}" / "text{step}",
 * cioè il nome TeX senza «\», come vuole GI_MIP.inputDi.
 */
(function () {
  "use strict";
  const GI = window.GI, M = window.GI_MIP, T = GI.T;

  const PASSO = T("text{passo}", "text{step}");
  const parPasso = (descr, val = 1) => ({ k: PASSO, nome: "\\" + PASSO, min: 0, max: 20, step: 1, val, colore: "a", cifre: 0, descr });
  const DESCR_PASSO = T("◀ ▶ un passo alla volta, «Esegui» per vederli tutti", "◀ ▶ one step at a time, «Run» to watch all of them");
  const vaiA = (st, v) => { const i = M.inputDi(st, PASSO); if (i) i.value = v; };
  const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
  const somma = (v) => v.reduce((a, b) => a + b, 0);
  const lista = (A) => A.join(", ");
  const pct = (x) => GI.num(100 * x, 1) + "\\,\\%";
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
  /** al cambio di voce (algoritmo) il passo torna a 1 e «Esegui» si ferma */
  function nuovaVoce(st, primo = 1) {
    if (st.dati.voce !== st.chiave()) {
      if (st.dati.voce !== undefined) { vaiA(st, primo); M.ferma(st); }
      st.dati.voce = st.chiave();
    }
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
  /** legge dati dall'utente: finestra di dialogo con un esempio; restituisce il testo o null */
  const chiedi = (msg, esempio) => { try { return window.prompt(msg, esempio); } catch (e) { return null; } };
  /** «4, 4, 5, 3» -> [4, 4, 5, 3]; null se non sono tutti interi positivi */
  const interi = (s) => {
    const v = String(s).split(/[\s,;]+/).filter(Boolean).map(Number);
    return v.length && v.every((x) => Number.isInteger(x) && x >= 1) ? v : null;
  };
  /** colori per i colori del grafo (6) */
  const PALETTE = (C) => [C.a, C.b, C.c, C.d, C.e, C.viola, C.verde];

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
  /** mostra o nasconde il cursore `nome` (i cursori che servono solo a una voce di «funzioni») */
  const mostraCursore = (st, nome, si) => { const c = M.ctrlDi(st, nome); if (c) c.style.display = si ? "" : "none"; };
  /** generatore di Park e Miller (1988), quello delle note sulle metaeuristiche:
   *  seed ← 16807·seed mod (2^31 − 1), u = seed / (2^31 − 1). r = parkMiller(1); r() → u */
  const parkMiller = (seed) => { let s = seed; const r = () => { s = (16807 * s) % 2147483647; return s / 2147483647; }; r.seme = () => s; return r; };
  /** frazione {n, d} in testo semplice (per le etichette del disegno): 7/3 */
  const frTxt = (q) => (q.d === 1 ? String(q.n) : `${q.n}/${q.d}`);

  window.GI_OC = { PASSO, parPasso, DESCR_PASSO, vaiA, clamp, somma, lista, pct, decrescente, nuovoId, osservaDimensioni, nuovaVoce, dim, pix, disegno, daIndirizzo, chiedi, interi, PALETTE,
    menuIstanze, mostraCursore, parkMiller, frTxt };
})();
