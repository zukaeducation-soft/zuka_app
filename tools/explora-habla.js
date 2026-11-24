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

// Fracciones (5/6 → cinco sextos), unidades (42 km → 42 kilómetros), porcentajes y miles (50 000 → 50000).
const NUM = ['cero', 'un', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve', 'diez', 'once', 'doce'];
const PARTE = { 2: 'medio', 3: 'tercio', 4: 'cuarto', 5: 'quinto', 6: 'sexto', 7: 'séptimo', 8: 'octavo', 9: 'noveno', 10: 'décimo',
  12: 'doceavo', 15: 'quinceavo', 20: 'veinteavo', 24: 'veinticuatroavo', 25: 'veinticincoavo', 30: 'treintavo', 100: 'centésimo' };
const UNIDAD = { 'km/h': ['kilómetro por hora', 'kilómetros por hora'], 'm²': ['metro cuadrado', 'metros cuadrados'], 'm³': ['metro cúbico', 'metros cúbicos'],
  'cm²': ['centímetro cuadrado', 'centímetros cuadrados'], km: ['kilómetro', 'kilómetros'], cm: ['centímetro', 'centímetros'], m: ['metro', 'metros'],
  kg: ['kilogramo', 'kilogramos'], g: ['gramo', 'gramos'], h: ['hora', 'horas'], s: ['segundo', 'segundos'] };
const DEC = ['', 'diez', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
const ESP = { 1: 'uno', 13: 'trece', 14: 'catorce', 15: 'quince', 16: 'dieciséis', 17: 'diecisiete', 18: 'dieciocho', 19: 'diecinueve',
  21: 'veintiuno', 22: 'veintidós', 23: 'veintitrés', 24: 'veinticuatro', 25: 'veinticinco', 26: 'veintiséis', 27: 'veintisiete', 28: 'veintiocho', 29: 'veintinueve' };
const letras = n => ESP[n] ?? NUM[n] ?? (n % 10 ? `${DEC[n / 10 | 0]} y ${letras(n % 10)}` : DEC[n / 10]);
// 0.25 → cero punto veinticinco; 0.05 → cero punto cero cinco; 0.20 → cero punto veinte.
const decimal = (a, b) => `${a.length < 3 ? letras(+a) : a} punto ${b[0] === '0' || b.length > 2 ? [...b].map(x => letras(+x)).join(' ') : letras(+b)}`;
function cantidades(s) {
  s = s.replace(/(?<!\d )\b(\d{1,3}) (\d{3})\b(?! \d{3}\b)/g, (m, n, r) => `${n === '1' ? '' : n + ' '}mil${+r ? ' ' + +r : ''}`);
  s = s.replace(/(?<![\d.])(\d+)\.(\d+)(?![\d.]\d)/g, (m, a, b) => decimal(a, b));
  s = s.replace(/\b\d{1,3}(?: \d{3})+\b/g, n => n.replace(/ /g, ''));
  s = s.replace(/(\d+) ?(km\/h|cm²|m²|m³|km|cm|kg|m|g|h|s)(?![\wáéíóúñ²³\/])/g,
    (m, n, u) => `${n === '1' ? (u === 'h' ? 'una' : 'un') : n} ${UNIDAD[u][n === '1' ? 0 : 1]}`);
  s = s.replace(/(\d) ?%/g, '$1 por ciento');
  return s.replace(/(?<![\d.\/])(\d+)\/(\d+)(?![\d.\/])/g, (m, a, b) => (PARTE[b] ? `${NUM[a] ?? a} ${PARTE[b]}${a === '1' ? '' : 's'}` : `${a} sobre ${b}`));
}

// Lo que se dice. Las fórmulas pasan por `tex` y luego todo por los símbolos comunes.
function hablar(txt) {
  if (DICHO[txt]) return DICHO[txt];
  let s = String(txt).replace(/\*\*/g, '');
  // Rótulos que se leen pero no se dicen: repetidos en cada paso suenan a máquina (pedido del usuario, 2026-11-24).
  s = s.replace(/^(?:Tu turno\.|(?:Primera|Segunda|Tercera|Cuarta|Quinta|Sexta|Última) idea:|Empecemos por la idea:)\s*(\S)/, (m, c) => c.toUpperCase())
    .replace(/^([¿¡])(\S)/, (m, a, c) => a + c.toUpperCase())
    .replace(/^Eso es todo lo que construiste\. Con estas ideas ya puedes con los ejercicios\.$/, 'Muy bien, ya tienes lo que necesitas. Vamos a practicar.');
  s = s.replace(/\$([^$]+)\$/g, (m, f) => tex(f));
  s = cantidades(s);
  s = s.replace(/\)\s*\(/g, ') por (');                                    // (−3)(−4): se multiplica
  s = s.replace(/π\/2\b/g, 'pi medios').replace(/(\d*)π\/(\d+)/g, (m, a, b) => `${a ? a + ' ' : ''}pi sobre ${b}`).replace(/π/g, 'pi');
  s = s.replace(/[−-](?=\s*[\d(a-zA-Zπ])/g, ' menos ');
  s = s.replace(/\+/g, ' más ').replace(/=/g, ' igual a ').replace(/</g, ' menor que ').replace(/>/g, ' mayor que ');
  s = s.replace(/[·×]/g, ' por ').replace(/÷/g, ' entre ').replace(/∈/g, ' pertenece a ').replace(/∉/g, ' no pertenece a ');
  s = s.replace(/°/g, ' grados').replace(/[()]/g, ' ');
  return s.replace(/\s+([,.:;…!?])/g, '$1').replace(/\s{2,}/g, ' ').trim();
}

module.exports = { hablar, DICHO };
