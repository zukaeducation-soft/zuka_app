// Ejercicios de «Validar Procedimientos» (Preicfes, icf-ma-argumenta; spec 2026-11-25-preicfes-estructura): si los datos alcanzan o sobran.
// Armazones en proposiciones-escena (renglones y frases).
(() => {
  XG.renglones('alcanza-o-no', { w: 104, x: 278 });   // cada renglón es un dato: con él, ¿alcanza o no alcanza?
  XG.frases('datos-que-sobran');                      // se tocan los datos que no hacen falta
  XG.frases('vale-o-no');                             // se tocan los procedimientos que sí valen
})();
