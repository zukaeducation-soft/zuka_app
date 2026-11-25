// Lo que pasa en los ejercicios de arrastrar fichas al comprobar (spec 2026-11-24-ejercicios-explora, «Al comprobar, las fichas se mueven»).
// Lo usa XG.rotula (figura-kit.js):
//   XG.ROTULA[nombre](K, p, v, f)   dibujo encima de la escena que ejecuta lo puesto; v: la ficha de cada lugar; f de 0 a 1
//   XG.ORDEN[nombre]                en qué orden se revisan los lugares, si no es el de siempre
//   XG.cadena(ops, v)               lo que da la cuenta con las fichas puestas («9», «·», «8», «=»), o null si no hay cuenta
// Todo es puro.
(() => {
  const mcd = (a, b) => (b ? mcd(b, a % b) : Math.abs(a));
  const num = s => { const m = /^(−?\d+(?:\.\d+)?)(?:\/(\d+))?$/.exec(String(s).replace('-', '−')); if (!m) return null; const a = +m[1].replace('−', '-'), b = +(m[2] || 1); return Number.isInteger(a) ? [a, b] : [Math.round(a * 1000), 1000 * b]; };
  const red = ([a, b]) => { const g = mcd(a, b) || 1; return b / g < 0 ? [-a / g, -b / g] : [a / g, b / g]; };
  const esc = r => { const [a, b] = red(r); return (b === 1 ? String(a) : `${a}/${b}`).replace('-', '−'); };
  XG.cadena = (ops, v) => {
    const k = ops?.indexOf('=') ?? -1; if (k < 1 || ops.slice(0, k).some(o => !['·', '+', '−', '÷'].includes(o)) || (ops.slice(0, k).some(o => '·÷'.includes(o)) && ops.slice(0, k).some(o => '+−'.includes(o)))) return null;
    const n = v.slice(0, k + 1).map(num); if (n.some(x => !x)) return null;
    let r = n[0];
    for (let i = 0; i < k; i++) { const [a, b] = r, [c, d] = n[i + 1], o = ops[i]; if (o === '÷' && !c) return null; r = red(o === '·' ? [a * c, b * d] : o === '÷' ? [a * d, b * c] : o === '+' ? [a * d + c * b, b * d] : [a * d - c * b, b * d]); }
    const tx = s => String(s).replace('−', '-').replace(/^(-?\d+)\/(\d+)$/, '\\tfrac{$1}{$2}'), par = s => (s.startsWith('-') ? `(${s})` : s);
    return { en: k + 1, t: esc(r), tex: `$${v.slice(0, k + 1).map((x, i) => (i ? ` ${{ '·': '\\cdot', '÷': '\\div', '−': '-', '+': '+' }[ops[i - 1]]} ${par(tx(x))}` : tx(x))).join('')} = ${tx(esc(r))}$` };
  };
  const mezcla = (a, b, f) => a + (b - a) * f, paso = (f, k, n) => Math.max(0, Math.min(1, f * n - k));
  const crece = (K, [a, b], [c, d], f, cls) => (f > 0 ? K.l(a, b, mezcla(a, c, f), mezcla(b, d, f), cls) : '');
  const marco = (K, x, q) => (q > 0 && q < 1 ? K.r(x - 28, 38, 56, 138 * Math.min(1, q * 1.4), 'fn gr', 10) : '');
  const N = x => String(Math.round(x * 100) / 100).replace('-', '−'), V = s => +String(s).replace('−', '-');

  XG.ORDEN = { 'desde-el-final': [1, 0], 'deshace-operador': [1, 0], 'llena-encuesta': [1, 0, 2, 3], 'arbol-operador': [0, 1, 2], 'suma-con-letras': [0, 1, 2] };
  XG.ROTULA = {
    // Los resultados suben por el árbol.
    'arbol-operador': (K, p, v, f) => [[90, 1], [250, 1]].map(([x]) => crece(K, [x - 32, 140], [x - 10, 116], paso(f, 0, 2), 'la gr') + crece(K, [x + 32, 140], [x + 10, 116], paso(f, 0, 2), 'la gr')).join('') + crece(K, [100, 76], [150, 48], paso(f, 1, 2), 'lg gr') + crece(K, [240, 76], [190, 48], paso(f, 1, 2), 'lg gr'),
    'arbol-primos': (K, p, v, f) => { const l = [[131, 30, 58], [178, 76, 108], [226, 126, 158]], d = [+p.n, V(v[1]), V(v[3])]; return l.map(([x, a, y], i) => { const q = paso(f, i, 3), ok = V(v[2 * i]) * V(v[2 * i + 1]) === d[i]; return crece(K, [x - 8, a], [x - 38, y - 20], q, 'la gr') + crece(K, [x + 8, a], [x + 38, y - 20], q, 'la gr') + (q >= 1 ? K.t(i < 2 ? [215, 263][i] : 148, [62, 112, 162][i], `${v[2 * i]} · ${v[2 * i + 1]} ${ok ? '=' : '≠'} ${d[i]}`, ok ? 's to' : 's tf', i < 2 ? 'start' : 'end') : ''); }).join(''); },
    'arbol-bolsa': (K, p, v, f) => crece(K, [82, 103], [126, 58], paso(f, 0, 2), 'lf gr') + crece(K, [82, 103], [126, 148], paso(f, 0, 2), 'la gr') + [[58, 36], [58, 80], [148, 126], [148, 170]].map(([a, b], i) => crece(K, [150, a], [206, b], paso(f, 1, 2), i % 2 ? 'la gr' : 'lf gr')).join(''),
    // Cada círculo suma lo que tiene adentro.
    'tres-circulos'(K, p, v, f) { const [ab, ac, bc, a, b, c] = v.map(V), z = V(p.c), s = [a + ab + ac + z, b + ab + bc + z, c + ac + bc + z]; return [[138, 66, 'la'], [202, 66, 'lg'], [170, 120, 'lf']].map(([x, y, l], i) => K.arc(x, y, 54, 90, 90 + 359 * paso(f, i, 3), `${l} gr`)).join('') + [[76, 40, 'end'], [264, 40, 'start'], [232, 178, 'start']].map(([x, y, q], i) => (paso(f, i, 3) >= 1 ? K.t(x, y, `suma ${s[i]}`, 's', q) : '')).join(''); },
    'llena-encuesta': (K, p, v, f) => [1, 0, 2, 3].map((i, k) => { const q = paso(f, k, 4), [x, y] = [[98, 92], [170, 92], [242, 92], [46, 154]][i]; return q > 0 && q < 1 ? K.f(1 - q, K.c(x, y, 14 + 30 * q, 'fn gr')) : ''; }).join('') + K.t(316, 168, `van ${[1, 0, 2, 3].reduce((s, i, k) => s + (paso(f, k, 4) >= 1 ? V(v[i]) : 0), 0)}`, 's', 'end'),
    // La fila del primero y la columna del segundo se cruzan.
    'lee-operacion'(K, p, v, f) { const L = p.letras, par = [['q', 's'], ['s', 'q'], ['r', v[2]]], n = L.length; return par.map(([a, b], k) => { const q = paso(f, k, 3); if (q <= 0 || (q >= 1 && k < 2)) return ''; const x = 46 + L.indexOf(b) * 32, y = 46 + L.indexOf(a) * 34; return crece(K, [30, y], [x, y], Math.min(1, q * 2), 'lg gr') + crece(K, [x, 28], [x, y], Math.max(0, q * 2 - 1), 'la gr') + (q > 0.95 ? K.c(x, y, 13, 'fn gr') : ''); }).join(''); },
    'cadena-en-tabla'(K, p, v, f) { const L = p.letras, o = (a, b) => p.tab[L.indexOf(a)][L.indexOf(b)], par = [['t', 'u'], [o('t', 'u'), 'v'], ['u', 'v'], ['t', o('u', 'v')], [v[2], 'u']]; return par.map(([a, b], k) => { const q = paso(f, k, 5); if (q <= 0 || (q >= 1 && k < 4)) return ''; const x = 46 + L.indexOf(b) * 32, y = 46 + L.indexOf(a) * 38; return crece(K, [30, y], [x, y], Math.min(1, q * 2), 'lg gr') + crece(K, [x, 28], [x, y], Math.max(0, q * 2 - 1), 'la gr') + (q > 0.9 ? K.c(x, y, 13, 'fn gr') : ''); }).join(''); },
    // Las columnas se operan con las cifras puestas.
    'suma-con-letras': (K, p, v, f) => marco(K, 206, paso(f, 0, 2)) + marco(K, 146, paso(f, 1, 2)) + (f >= 1 ? K.t(330, 158, `da ${10 * V(v[2]) + 8 + 40 + V(v[0])}`, 'b', 'end') : ''),
    'resta-con-letras': (K, p, v, f) => marco(K, 206, paso(f, 0, 2)) + marco(K, 146, paso(f, 1, 2)) + (f >= 1 ? K.t(330, 158, `da ${N(70 + V(v[0]) - 10 * V(v[1]) - 8)}`, 'b', 'end') : ''),
    'producto-con-letras': (K, p, v, f) => crece(K, [140, 80], [100, 80], paso(f, 0, 2), 'lg gr') + crece(K, [140, 72], [62, 72], paso(f, 1, 2), 'la gr') + (f >= 1 ? K.t(330, 64, `${v[1]}${p.u} × ${p.k} = ${(10 * V(v[1]) + V(p.u)) * p.k}`, 's', 'end') : ''),
    // Se comprueba hacia adelante con lo que puso.
    'desde-el-final'(K, p, v, f) { const g = p.s.map(t => { const [a, b] = t.match(/(\d+)\/(\d+)/).slice(1).map(Number); return (b - a) / b; }), r = [V(v[0]) * g[0], V(v[1]) * g[1]]; return [[46, 170], [170, 297]].map(([a, b], i) => { const q = paso(f, i, 2), x = mezcla(a, b, q); return q > 0 && q < 1 ? K.c(x, 70, 7, 'fA') : q >= 1 ? K.t((a + b) / 2, 92, `da ${N(r[i])}`, r[i] === (i ? V(p.queda) : V(v[1])) ? 's to' : 's tf') : ''; }).join(''); },
    'deshace-operador'(K, p, v, f) { const k = p.s.map(t => +t.match(/\d+/)[0]), r = [V(v[0]) * k[0] + 3, V(v[1]) * k[1] + 3]; return [[44, 170], [170, 298]].map(([a, b], i) => { const q = paso(f, i, 2), x = mezcla(a, b, q); return q > 0 && q < 1 ? K.c(x, 62, 7, 'fA') : q >= 1 ? K.t((a + b) / 2, 86, `da ${N(r[i])}`, r[i] === (i ? V(p.sale) : V(v[1])) ? 's to' : 's tf') : ''; }).join(''); },
    // Se tachan parejas desde los extremos hasta el del medio.
    'ordena-centro'(K, p, v, f) { const n = p.d.length, m = (n - 1) / 2, X = i => 170 + (i - m) * 47; let h = ''; for (let k = 0; k < m; k++) { const q = paso(f, k, m); for (const i of [k, n - 1 - k]) h += crece(K, [X(i) - 17, 92], [X(i) + 17, 60], q, 'lf gr'); } return h + (f >= 1 ? K.c(X(m), 76, 25, 'fn gr') + K.l(170, 102, 170, 116, 'lo gr') : ''); },
    'tabla-edades': (K, p, v, f) => [66, 120].map((y, i) => [196, 290].map((x, j) => crece(K, [130, y + 24], [x, y + 24], paso(f, i * 2 + j, 4), j ? 'lg' : 'la')).join('')).join(''),
    'cadena-todos': (K, p, v, f) => [[148, 46, 'lf'], [126, 74, 'la'], [106, 100, 'lg']].map(([y, r, l], k) => K.arc(130, y, r, 90, 90 + 359 * paso(f, k, 3), `${l} gr`)).join(''),
    'suma-letras'(K, p, v, f) { const n = p.w.length, s = v.slice(0, n).reduce((a, x, i) => a + (paso(f, i, n) >= 1 ? V(x) : 0), 0); return Array.from({ length: n }, (_, i) => { const q = paso(f, i, n); return q > 0 && q < 1 ? K.c(mezcla(40 + i * 62, 40 + n * 62 + 12, q), 60, 6, 'fA') : ''; }).join('') + K.t(40 + n * 62 + 12, 26, `van ${s}`, 's'); },
    'pasos-despeje': (K, p, v, f) => [0, 1, 2].map(i => crece(K, [282, 30 + i * 50], [282, 66 + i * 50], paso(f, i, 3), 'la gr')).join(''),
    'ciclo-ultima': (K, p, v, f) => [0, 1, 2, 3].map(i => { const q = paso(f, i, 4), a = 28 + i * 56; return q > 0 && q < 1 ? K.t(mezcla(a, a + 56, q), 58 - 14 * Math.sin(Math.PI * q), '× 2', 's ta') : ''; }).join(''),
  };
})();
