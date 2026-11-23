// Voz de las explicaciones Explora (spec 2026-11-23-explora-leccion-interactiva, sección «Voz»): convierte lo que se lee en
// pantalla (con TeX entre $…$, **negritas** y símbolos) en lo que se dice en voz alta. Lo usan tools/explora-frases.js (que
// arma la lista de frases de una lección) y las pruebas. `DICHO` corrige a mano las frases que la regla general no dice bien.

const DICHO = {
  // pu-cm-1
  'El reflejo de −6 es 6. Por eso −(−6) = 6: el reflejo de un reflejo vuelve al original.':
    'El reflejo de menos seis es seis. Por eso, menos de menos seis es seis: el reflejo de un reflejo vuelve al original.',
  'Se escribe con barras, |3 − (−2)|. Las barras dicen: «cuenta los pasos, sin importar el sentido».':
    'Se escribe con dos barras: valor absoluto de tres menos menos dos. Las barras dicen: cuenta los pasos, sin importar el sentido.',
  '× y ÷ están en la **misma** capa: entre ellas va primero la que está más a la izquierda. Toca en orden.':
    'La multiplicación y la división están en la misma capa: entre ellas va primero la que está más a la izquierda. Toca en orden.',
  'Un detalle: en $-3^2$ la potencia va antes que el menos, que está **afuera**. En $(-3)^2$ se eleva todo. Toca cada resultado.':
    'Un detalle: en menos tres al cuadrado, sin paréntesis, la potencia va antes que el menos, que está afuera. Con el menos tres entre paréntesis, se eleva todo. Toca cada resultado.',
};

function tex(src) {
  let s = src;
  s = s.replace(/\\tfrac\{\\pi\}\{2\}|\\frac\{\\pi\}\{2\}/g, ' pi medios ');
  s = s.replace(/\\[td]?frac\{([^{}]*)\}\{([^{}]*)\}/g, ' $1 sobre $2 ');
  s = s.replace(/\^\\circ/g, ' grados');
  s = s.replace(/\^2\b/g, ' al cuadrado').replace(/\^3\b/g, ' al cubo').replace(/\^\{?(\w+)\}?/g, ' a la $1');
  s = s.replace(/\|([^|]+)\|/g, ' valor absoluto de $1, ');
  s = s.replace(/\\text\{\s*([^{}]*)\}/g, ' $1 ');
  const pal = { cdot: ' por ', times: ' por ', div: ' entre ', pi: ' pi ', theta: ' theta ', in: ' pertenece a ', notin: ' no pertenece a ',
    quad: ', ', ',': ' ', ' ': ' ', le: ' menor o igual que ', ge: ' mayor o igual que ', neq: ' distinto de ' };
  s = s.replace(/\\(notin|in|cdot|times|div|pi|theta|quad|le|ge|neq|,| )/g, (m, w) => pal[w] ?? ' ');
  s = s.replace(/\\[a-zA-Z]+/g, ' ').replace(/[{}]/g, ' ').replace(/\\\{|\\\}/g, ' ');
  return s;
}

// Lo que se dice. Las fórmulas pasan por `tex` y luego todo por los símbolos comunes.
function hablar(txt) {
  if (DICHO[txt]) return DICHO[txt];
  let s = String(txt).replace(/\*\*/g, '');
  s = s.replace(/\$([^$]+)\$/g, (m, f) => tex(f));
  s = s.replace(/\)\s*\(/g, ') por (');                                    // (−3)(−4): se multiplica
  s = s.replace(/π\/2\b/g, 'pi medios').replace(/(\d*)π\/(\d+)/g, (m, a, b) => `${a ? a + ' ' : ''}pi sobre ${b}`).replace(/π/g, 'pi');
  s = s.replace(/[−-](?=\s*[\d(a-zA-Zπ])/g, ' menos ');
  s = s.replace(/\+/g, ' más ').replace(/=/g, ' igual a ').replace(/</g, ' menor que ').replace(/>/g, ' mayor que ');
  s = s.replace(/[·×]/g, ' por ').replace(/÷/g, ' entre ').replace(/∈/g, ' pertenece a ').replace(/∉/g, ' no pertenece a ');
  s = s.replace(/°/g, ' grados').replace(/[()]/g, ' ');
  return s.replace(/\s+([,.:;…!?])/g, '$1').replace(/\s{2,}/g, ' ').trim();
}

module.exports = { hablar, DICHO };
