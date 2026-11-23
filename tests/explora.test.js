// Explicación interactiva en lugar del video (spec 2026-11-23-explora-leccion-interactiva): la lógica de cada tipo de
// paso es pura, cada paso se puede cumplir, no nace cumplido, y la lección piloto pu-cm-1 enseña matemática correcta.
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const path = require('path');
const { loadScripts, get, ROOT } = require('./load');

const read = f => fs.readFileSync(path.join(ROOT, f), 'utf8').replace(/\r\n/g, '\n');
const html = read('index.html'), sw = read('sw.js');
const ctx = loadScripts(['js/explora.js', 'js/explora-pu-cm-1.js']);
const XP = get(ctx, 'XP'), EXPLORA = get(ctx, 'EXPLORA');
const L = EXPLORA['pu-cm-1'];

test('explora.js, su contenido y su hoja de estilo están en index.html y en el service worker', () => {
  for (const f of ['js/explora.js', 'js/explora-pu-cm-1.js']) {
    assert.ok(html.includes(`src="${f}"`), `falta ${f} en index.html`);
    assert.ok(sw.includes(`'${f}'`), `falta ${f} en SHELL`);
  }
  assert.ok(html.includes('href="css/explora.css"') && sw.includes("'css/explora.css'"));
  assert.ok(html.indexOf('js/explora.js') < html.indexOf('js/player.js'), 'explora.js va antes de player.js');
});

test('el reproductor entrega la explicación interactiva en lugar del video', () => {
  assert.match(read('js/player.js'), /exploraPlayer\(/);
});

test('la lección piloto tiene capítulos y entre 12 y 26 pasos cortos, cada uno con su idea', () => {
  assert.ok(L && L.caps.length >= 4);
  assert.ok(L.pasos.length >= 12 && L.pasos.length <= 26, `${L.pasos.length} pasos`);
  L.pasos.forEach((p, i) => {
    assert.ok(XP[p.tipo], `paso ${i}: tipo desconocido ${p.tipo}`);
    assert.ok(p.cap >= 0 && p.cap < L.caps.length, `paso ${i}: capítulo`);
    assert.ok(p.texto && p.texto.replace(/[$*\\]/g, '').length <= 170, `paso ${i}: texto de ${p.texto.length} letras`);
    assert.ok(p.idea && p.idea.length <= 130, `paso ${i}: idea`);
  });
  const caps = L.pasos.map(p => p.cap);
  assert.equal(caps.join(), [...caps].sort((a, b) => a - b).join(), 'los capítulos van en orden');
  assert.equal(new Set(caps).size, L.caps.length, 'ningún capítulo vacío');
  assert.equal(L.pasos.at(-1).tipo, 'cierre');
});

test('ningún paso nace cumplido (salvo el cierre) y todos se pueden cumplir', () => {
  L.pasos.forEach((p, i) => {
    const t = XP[p.tipo];
    if (p.tipo !== 'cierre') assert.equal(t.ok(t.ini(p), p), false, `paso ${i} (${p.tipo}) ya nace cumplido`);
    assert.equal(t.ok(t.sol(p), p), true, `paso ${i} (${p.tipo}) no se puede cumplir`);
    assert.equal(typeof t.lee(t.sol(p), p), 'string');
  });
});

test('casi todo se hace arrastrando o tocando la escena: a lo sumo dos pasos de fichas', () => {
  assert.ok(L.pasos.filter(p => p.tipo === 'casillas').length <= 2);
  assert.ok(L.pasos.filter(p => p.tipo === 'recta' || p.tipo === 'saltos').length >= 8);
});

test('recta: cada modo mide lo que dice', () => {
  const R = XP.recta;
  assert.equal(R.ok({ v: -5 }, { modo: 'espejo', min: -8, max: 8, desde: 2, meta: 5 }), true);
  assert.equal(R.ok({ v: 5 }, { modo: 'espejo', min: -8, max: 8, desde: 2, meta: 5 }), false);
  assert.match(R.lee({ v: 6 }, { modo: 'distancia', ancla: -2, min: -8, max: 8, desde: -2, meta: 6 }), /= 8\$$/);
  assert.match(R.lee({ v: 2 }, { modo: 'salto', desde: -4, min: -8, max: 8, meta: 2 }), /-4 \+ 6 = 2/);
  assert.match(R.lee({ v: -3 }, { modo: 'salto', desde: 2, min: -8, max: 8, meta: -3 }), /2 \+ \(-5\) = -3/);
  assert.match(R.lee({ v: 6 }, { modo: 'salto', resta: -5, desde: 1, min: -8, max: 8, meta: 6 }), /1 - \(-5\) = 6/);
  const dos = { modo: 'dos', ancla: 1, metas: [-3, 5], min: -8, max: 8 };
  assert.equal(R.ok({ sel: [5, -3] }, dos), true);
  assert.equal(R.ok({ sel: [5] }, dos), false);
  assert.equal(R.ok({ sel: [5, -3, 4] }, dos), false);
});

test('la escena responde con una frase a cada movimiento', () => {
  const R = XP.recta, resta = { modo: 'salto', resta: 7, desde: 3, min: -8, max: 8, meta: -4 };
  assert.match(R.dice({ v: 5 }, resta), /sumando 7/, 'ir al lado equivocado se dice');
  assert.match(R.dice({ v: 0 }, resta), /Llevas 3 de 7 pasos/);
  assert.match(R.dice({ v: -6 }, resta), /Te pasaste/);
  assert.match(R.dice({ v: -4 }, resta), /Justo/);
  assert.match(R.dice({ v: 6 }, { modo: 'distancia', ancla: -2, min: -8, max: 8 }), /8 pasos\. Son 2 hasta el 0 y 6 más/);
  assert.match(R.dice({ sel: [4] }, { modo: 'dos', ancla: 1, dist: 4, metas: [-3, 5] }), /a 3 pasos del 1, no a 4/);
  assert.match(R.dice({ sel: [5] }, { modo: 'dos', ancla: 1, dist: 4, metas: [-3, 5] }), /Falta el del otro lado/);
  assert.match(XP.saltos.dice({ b: -4 }, { a: -3 }), /se volteó.*12/);
  assert.match(XP.signos.dice({ neg: [true, true, false] }), /lado positivo/);
  for (const p of L.pasos) {
    const t = XP[p.tipo];
    if (!t.dice || p.tipo === 'muestra') continue;   // las explicaciones tienen su propio límite
    for (const s of [t.ini(p), t.sol(p)]) assert.ok(t.dice(s, p).length <= 90, p.tipo + ': frase larga');
  }
});

test('predice y mira: se elige, la escena se anima sola y el paso se cumple al verla', () => {
  const P = XP.predice, pasos = [
    { escena: 'recta', en: { modo: 'salto', min: -8, max: 8, desde: 1 }, de: 1, a: 6, opciones: ['A la izquierda', 'A la derecha'], bien: 1, cuenta: '$1 - (-5) = 6$', porque: 'Restar es ir al revés.' },
    { escena: 'saltos', en: { a: -3, min: -15, max: 15, meta: 12, desde: 4 }, de: -12, a: 12, opciones: ['−12', '12'], bien: 1, cuenta: '$(-3) \\cdot (-4) = 12$', porque: 'El menos voltea la cadena.' },
  ];
  for (const p of pasos) {
    assert.equal(P.ok({ pick: p.bien, visto: false }, p), false, 'no basta elegir');
    assert.equal(P.ok({ pick: 0, visto: true }, p), true, 'no se califica la apuesta');
    assert.ok(p.opciones[p.bien] && p.porque && p.cuenta && XP[p.escena]);
    assert.equal(P.dice({ pick: 1 - p.bien, visto: true }, p), p.porque);
    assert.notEqual(p.de, p.a);
  }
  const s = pasos.find(p => p.escena === 'saltos');
  assert.equal(s.en.a * XP.saltos.veces(s.a, s.en), 12);
  assert.equal(s.en.a * XP.saltos.veces(s.de, s.en), -12);
});

test('recta: las metas de la lección salen de sus propias cuentas', () => {
  for (const p of L.pasos.filter(p => p.tipo === 'recta')) {
    if (p.modo === 'dos') for (const m of p.metas) assert.equal(Math.abs(m - p.ancla), p.dist);
    if (p.resta != null) assert.equal(p.meta, p.desde - p.resta);
    if (p.suma != null) assert.equal(p.meta, p.desde + p.suma);
    if (p.modo !== 'dos') assert.ok(p.meta >= p.min && p.meta <= p.max && p.desde !== p.meta);
  }
});

test('saltos: la punta cae en múltiplos y el signo de las veces voltea la cadena', () => {
  const T = XP.saltos, p = { a: -3, min: -15, max: 15, meta: 12 };
  assert.equal(T.ok({ b: -4 }, p), true);
  assert.equal(T.ok({ b: 4 }, p), false);
  assert.match(T.lee({ b: -4 }, p), /\(-3\) \\cdot \(-4\) = 12/);
  assert.equal(T.veces(-12.4, p), 4);
  assert.equal(T.veces(40, p), -5, 'no se sale de la recta');
});

test('signos: par de menos da positivo, impar da negativo', () => {
  const G = XP.signos, p = { factores: [2, 3, 1, 2], menos: 3 };
  assert.equal(G.valor({ neg: [true, true, false, false] }, p), 12);
  assert.equal(G.valor({ neg: [true, true, true, false] }, p), -12);
  assert.equal(G.ok({ neg: [true, true, true, false] }, p), true);
  assert.equal(G.ok({ neg: [true, false, false, false] }, p), false);
});

test('capas: el orden es paréntesis, potencias, × y ÷ de izquierda a derecha, + y −', () => {
  const K = XP.capas;
  const run = expr => {
    let s = K.ini({ expr }); const orden = [];
    while (!K.ok(s)) { const i = K.sigue(s.toks); orden.push(s.toks[i]); s = K.aplica(s, i); }
    return { v: s.toks[0], orden: orden.join(' ') };
  };
  assert.deepEqual(run('6 + 2 * ( 1 - 4 ) ^ 2'), { v: 24, orden: '- ^ * +' });
  assert.deepEqual(run('20 / 4 * 5 - 3'), { v: 22, orden: '/ * -' });
  assert.deepEqual(run('( 4 - 9 ) * ( 3 + 1 )'), { v: -20, orden: '- + *' });
  assert.deepEqual(run('2 ^ 3 - ( 7 - ( 1 + 2 ) )'), { v: 4, orden: '+ - ^ -' });
  const s = K.ini({ expr: '6 + 2 * ( 1 - 4 ) ^ 2' });
  assert.equal(K.toca(s, 1).fallo, 'paren', 'tocar el + antes del paréntesis avisa qué capa va primero');
  assert.equal(K.toca(s, 6).fallo, undefined);
});

test('casillas: el menos fuera de la potencia no se eleva', () => {
  const p = L.pasos.find(p => p.tipo === 'casillas');
  const by = Object.fromEntries(p.filas.map(f => [f.tex, f.r]));
  assert.equal(by['$-3^2$'], '−9');
  assert.equal(by['$(-3)^2$'], '9');
  for (const f of p.filas) assert.ok(p.fichas.includes(f.r));
  assert.ok(p.fichas.length > p.filas.length, 'sobran fichas con los errores típicos');
});

test('los ejemplos de la explicación no son los de los ejercicios de la lección', () => {
  const calc = read('js/courses/preuda-r-calculo.js');
  const ex = calc.slice(calc.indexOf("setLesson('pu-cm-1'"), calc.indexOf("setLesson('pu-cm-2'"));
  const capas = L.pasos.find(p => p.tipo === 'capas');
  assert.ok(!ex.includes(capas.expr));
  assert.ok(!/-3\^2|\(-3\)\^2/.test(ex), 'la pareja −3² y (−3)² no sale en los ejercicios');
});

test('primero se explica y después se pide: cada capítulo abre con una explicación y el problema va al final', () => {
  assert.equal(L.pasos[0].tipo, 'muestra', 'la lección abre explicando, no preguntando');
  assert.ok(!L.pasos.some(p => p.tipo === 'apuesta'), 'sin reto de entrada');
  L.caps.slice(0, -1).forEach((c, k) => assert.equal(L.pasos.find(p => p.cap === k).tipo, 'muestra', 'el capítulo «' + c + '» abre con su explicación'));
  const ultimo = L.pasos.filter(p => p.cap === L.caps.length - 1);
  assert.ok(/equipo|torneo/.test(ultimo[0].texto), 'el problema de contexto va en el último capítulo');
  assert.ok(L.pasos.filter(p => p.tipo === 'muestra').length >= 6);
});

test('explicaciones: momentos cortos, escena conocida y cuentas correctas', () => {
  const M = XP.muestra;
  for (const p of L.pasos.filter(p => p.tipo === 'muestra')) {
    assert.ok(XP[p.escena] && p.momentos.length >= 4 && p.momentos.length <= 7);
    assert.equal(M.ok({ n: p.momentos.length, fin: false }, p), false, 'no se cumple hasta ver el último momento');
    assert.equal(M.dice(M.ini(), p), p.momentos[0].dice, 'la primera frase sale desde el principio');
    for (const m of p.momentos) {
      assert.ok(m.dice.length <= 115, 'momento largo: ' + m.dice);
      if (p.escena === 'recta') assert.ok(m.de >= p.en.min && m.a <= p.en.max && m.a >= p.en.min);
      const c = m.cuenta && m.cuenta.match(/^\$(-?\d+) ([+-]) \(?(-?\d+)\)? = (-?\d+)\$$/);
      if (c) assert.equal(c[2] === '+' ? +c[1] + +c[3] : c[1] - c[3], +c[4], m.cuenta);
      if (c && p.escena === 'recta' && p.en.modo === 'salto') assert.equal(m.a, +c[4], 'la ficha termina en el resultado de ' + m.cuenta);
    }
    if (p.escena === 'capas') assert.equal(p.momentos.length, XP.capas.ini(p.en).toks.filter(t => typeof t === 'string' && '+-*/^'.includes(t)).length, 'un momento por operación');
    if (p.escena === 'saltos') for (const m of p.momentos) assert.equal(Math.abs(m.a % p.en.a), 0, 'la punta cae en un múltiplo');
  }
  const capas = L.pasos.find(p => p.tipo === 'muestra' && p.escena === 'capas');
  assert.equal(XP.capas.sol(capas.en).toks[0], 53);
});

test('la explicación corre sola: cada momento deja entre 1.5 y 5.6 segundos para leer', () => {
  const src = fs.readFileSync(path.join(ROOT, 'js/explora.js'), 'utf8');
  const bloque = src.slice(src.indexOf('XPD.muestra ='), src.indexOf('XPD.signos ='));
  assert.ok(!/stage\.onclick/.test(bloque), 'la escena de una explicación no se toca');
  assert.ok(!/Toca para seguir/.test(src), 'no se pide un toque para seguir');
  for (const p of L.pasos.filter(p => p.tipo === 'muestra')) {
    for (const m of p.momentos) {
      const t = XP.muestra.pausa(m);
      assert.ok(t >= 1500 && t <= 5600, m.dice + ': ' + t + ' ms');
    }
  }
});

test('sonidos: existen, y sin audio (Node) no rompen nada', () => {
  const XS = get(ctx, 'XS');
  for (const k of ['tick', 'hop', 'flip', 'merge', 'pop', 'nope', 'page', 'whoosh', 'idea']) {
    assert.equal(typeof XS[k], 'function', k);
    assert.doesNotThrow(() => XS[k](3), k);
  }
  const src = fs.readFileSync(path.join(ROOT, 'js/explora.js'), 'utf8');
  assert.match(src, /S\.sfx !== false/, 'respeta el interruptor de sonido de la app');
});

test('el texto entra palabra a palabra sin partir fórmulas ni negritas', () => {
  ctx.tex = s => s;
  const html = get(ctx, 'xpPalabras')('Sumar **es caminar**: $-4 + 5 = 1$ ya.');
  const w = [...html.matchAll(/<span class="xp-w"[^>]*>(.*?)<\/span>/g)].map(m => m[1]);
  assert.deepEqual(w, ['Sumar', '**es caminar**:', '$-4 + 5 = 1$', 'ya.']);
});

test('las explicaciones son detalladas: cuatro o más momentos y al menos tres con adornos en la recta', () => {
  const M = L.pasos.filter(p => p.tipo === 'muestra');
  assert.ok(M.every(p => p.momentos.length >= 4));
  const adornos = M.flatMap(p => p.momentos).filter(m => m.zona || m.marcas);
  assert.ok(adornos.length >= 3);
  for (const m of adornos) {
    if (m.zona) assert.ok(['pos', 'neg', 'ambas'].includes(m.zona));
    for (const v of m.marcas || []) assert.ok(v >= -8 && v <= 8);
  }
});

test('revisión: las zonas solo en «La recta», sonido que no se apila y botón de sonido con estado', () => {
  const sumar = L.pasos.find(p => p.tipo === 'muestra' && p.cap === 1);
  assert.ok(sumar.momentos.every(m => !m.zona), 'en sumar, la zona confundía sentido con signo');
  assert.ok(!L.pasos.some(p => /Escucha/.test(JSON.stringify(p))), 'nada depende de oír');
  const src = fs.readFileSync(path.join(ROOT, 'js/explora.js'), 'utf8');
  assert.match(src, /ac\.state !== 'running'/);
  assert.match(src, /aria-pressed/);
});
