// Ejemplos resueltos y dibujados de Ciencias Naturales del Preicfes (libro 8). Mismo formato que rl.js: `de` es el paso de la
// explicación de la app cuya escena se usa, `v` / `en` lo que cambia, `m` los momentos [lo que se explica, lo que cambia, cuenta].
// Situaciones propias, distintas de los ejercicios de la lección y de los ejemplos de su explicación.
// H(título, pregunta, párrafos [[trozos]], opciones, pasos, respuesta): hoja marcada, como en cl.js (trozos contados desde 0).
const H = (t, q, T, O, m, r) => {
  const nT = T.flat().length, id = k => (typeof k === 'string' ? nT + 'ABCD'.indexOf(k) : k), pa = k => (/[A-D]/.test(k) ? T.length + 'ABCD'.indexOf(k) : +k);
  return [{ t, q, escena: 'hoja', en: { letras: [...T.map((_, i) => `${i + 1}`), ...'ABCD'.slice(0, O.length)], paras: [...T, ...O.map(o => [o])] },
    m: m.map(([d, v = {}]) => [d, { ...(v.luz ? { luz: v.luz.map(id) } : {}), ...(v.x ? { tacha: v.x.map(id) } : {}), ...(v.n ? { nota: Object.fromEntries(Object.entries(v.n).map(([k, s]) => [pa(k), s])) } : {}) }]), r }];
};
const n2 = x => String(Math.round(x * 100) / 100);
// Ejes: X e Y pasan de datos a pantalla; xs e ys son las marcas (la primera es el origen).
const ejes = (K, X, Y, xs, ys, ex, ey) => {
  const x0 = X(xs[0]), y0 = Y(ys[0]), x1 = X(xs.at(-1)), y1 = Y(ys.at(-1));
  let h = K.l(x0, y0, x1 + 8, y0, 'lm') + K.l(x0, y0, x0, y1 - 6, 'lm');
  ys.slice(1).forEach(y => { h += K.l(x0, Y(y), x1, Y(y), 'ls') + K.t(x0 - 6, Y(y) + 4, y, 's tm', 'end'); });
  xs.forEach(x => { h += K.t(X(x), y0 + 16, x, 's tm'); });
  return h + K.t(x1 + 8, y0 + 32, ex, 's tm', 'end') + K.t(x0 + 4, y1 - 12, ey, 's tm', 'start');
};

// ---------------------------------------------------------------------------------------------------------- dibujos propios
// Dos pelotas soltadas desde ha y hb metros; ra y rb, lo que rebotan.
const rebote = (v, K) => {
  const Y = h => 180 - h * 70;
  let s = K.l(30, 180, 320, 180, 'lm') + K.l(48, 180, 48, Y(2.2), 'lm');
  [0, 1, 2].forEach(h => { s += K.l(44, Y(h), 52, Y(h), 'lm') + K.t(40, Y(h) + 4, `${h} m`, 's tm', 'end'); });
  [[130, v.ha, v.ka, v.ra], [240, v.hb, v.kb, v.rb]].forEach(([x, h, k, r]) => {
    const R = k === 'tenis' ? 11 : 7, cl = k === 'tenis' ? 'fA' : 'fg';
    s += K.l(x, Y(h) + R + 2, x, 178, 'ls d') + K.c(x, Y(h), R, cl);
    if (r > 0.02) s += K.c(x, Y(r), R, 'fn d') + K.t(x + 18, Y(r) + 4, `rebota ${Math.round(r * 100)} cm`, 's tf', 'start');
    s += K.t(x, 198, k, 's') + K.t(x, 212, `desde ${n2(h)} m`, 's tm');
  });
  return s + K.t(185, 18, v.f || '', 'ta');
};
// Largo de un resorte según la masa colgada.
const RX = m => 60 + m * 1.2, RY = c => 170 - c * 5.6;
const resorte = (v, K) => ejes(K, RX, RY, [0, 50, 100, 150, 200], [0, 5, 10, 15, 20, 25], 'masa (g)', 'largo (cm)')
  + [[0, 10], [50, 13], [100, 16], [150, 19]].map(([m, c], i) => K.f(v.n - i, K.c(RX(m), RY(c), 5, 'fA'))).join('')
  + K.f(v.l, K.l(RX(0), RY(10), RX(150), RY(19), 'lg'))
  + K.f(v.p, K.l(RX(150), RY(19), RX(200), RY(22), 'lg d') + K.c(RX(200), RY(22), 6, 'fc') + K.t(RX(200), RY(22) - 12, '22?', 's ta'))
  + K.f(v.e, K.t(240, 130, '5 000 g → 310 cm: nadie lo midió', 's tf'));
// Temperatura de un nadador: q son las de 0, 10, 20, 30 y 40 minutos.
const NX = t => 56 + t * 6, NY = T => 170 - (T - 35.5) * 60, NQ = [37.0, 36.5, 36.2, 36.6, 37.0];
const nadador = (v, K) => ejes(K, NX, NY, [0, 10, 20, 30, 40], [35.5, 36, 36.5, 37, 37.5], 'minutos', '°C')
  + K.l(NX(0), NY(37), NX(40), NY(37), 'lg d') + K.t(178, NY(37) - 6, 'normal', 's tg')
  + K.r(NX(0), 8, NX(20) - NX(0), 7, 'fa', 3) + K.t(NX(20) + 6, 15, 'en el agua', 's tm', 'start')
  + K.pl(NQ.slice(0, Math.round(v.n)).map((T, i) => [NX(i * 10), NY(T)]), 'la gr')
  + NQ.slice(0, Math.round(v.n)).map((T, i) => K.c(NX(i * 10), NY(T), 5, 'fA') + K.t(NX(i * 10) + (i ? 0 : 6), NY(T) + 20, T.toFixed(1), 's', i ? 'middle' : 'start')).join('')
  + K.f(v.k, K.t(NX(12), 160, 'tiembla · piel pálida', 's tf')) + K.t(250, 150, v.t || '', 's ta');
// Dos probetas: niveles a y b (mL), piedra (sa), cera (sb) empujada con alambre o al fondo del alcohol (al).
const PY = L => 184 - L * 2;
const probetas = (v, K) => [[105, v.a, 'piedra 30 g', v.ta], [235, v.b, 'cera 18 g', v.tb]].map(([x, L, n, t], k) => {
  let s = K.r(x - 30, PY(L), 60, 184 - PY(L), k && v.al > 0.5 ? 'fo' : 'fa', 2) + K.pl([[x - 30, 24], [x - 30, 184], [x + 30, 184], [x + 30, 24]]);
  [40, 50, 60, 70, 80].forEach(q => { s += K.l(x - 30, PY(q), x - 22, PY(q), 'lm') + K.t(x - 34, PY(q) + 4, q, 's tm', 'end'); });
  if (!k) s += K.f(v.sa, K.c(x, 174, 9, 'fk'));
  else s += K.f(v.sb, v.al > 0.5 ? K.r(x - 12, 166, 24, 14, 'fg', 3) : K.l(x, PY(L) + 10, x, 16, 'lm') + K.r(x - 12, PY(L) + 10, 24, 14, 'fg', 3));
  return s + K.t(x, 12, n, 's') + K.t(x, 202, t || '', 's ta');
}).join('') + K.t(170, 100, 'mL', 's tm');
// Separar agua de mar turbia: s es la etapa (0 a 4).
const separa = (v, K) => {
  let s = K.r(20, 60, 70, 80, 'fn', 4) + K.r(22, 80, 66, 58, 'fa', 2) + K.r(26, 126, 58, 10, 'fg', 2)
    + [[34, 92], [52, 104], [70, 90], [44, 114], [64, 116]].map(([x, y]) => K.c(x, y, 2.6, 'ff')).join('') + K.t(55, 158, 'agua de mar', 's') + K.t(55, 172, '500 g', 's tm');
  s += K.f(v.s, K.ar(96, 100, 124, 100, 'lm') + K.p([[130, 62], [200, 62], [172, 100], [172, 128], [158, 128], [158, 100]], 'fn') + K.r(146, 70, 38, 10, 'fg', 2) + K.t(165, 158, 'filtro: arena', 's tg') + K.t(165, 172, '20 g', 's tm'));
  s += K.f(v.s - 1, K.ar(204, 100, 232, 100, 'lm') + K.t(218, 90, '480 g', 's tm'));
  s += K.f(v.s - 2, K.c(262, 108, 22, 'fa') + [[254, 112], [266, 104], [270, 116]].map(([x, y]) => K.c(x, y, 2.6, 'ff')).join('') + K.p([[254, 144], [262, 132], [270, 144]], 'ff')
    + K.pl([[276, 92], [308, 74], [308, 116]], 'lm') + K.r(298, 116, 22, 22, 'fa', 3) + K.t(256, 158, 'sal 15 g', 's tf') + K.t(296, 172, 'agua 465 g', 's ta'));
  return s + K.f(v.s - 3, K.t(170, 28, '20 + 15 + 465 = 500 g', 'ta'));
};
// Vaso con agua (w de 0 a 1), d granos disueltos y q cuadritos de 2 g en el fondo.
const vasoSal = (v, K) => {
  const h = 120 * v.w, top = 160 - h;
  return K.r(100, 30, 140, 130, 'fn', 6) + K.r(101, top, 138, h - 1, 'fa', 4)
    + Array.from({ length: Math.round(v.d) }, (_, i) => K.c(110 + (i * 37) % 120, 146 - ((i * 53) % 97) / 97 * Math.max(4, h - 26), 2.6, 'ff')).join('')
    + Array.from({ length: Math.round(v.q) }, (_, i) => K.r(108 + i * 11, 150, 8, 8, 'fk', 1)).join('')
    + K.f(v.q, K.r(252, 150, 8, 8, 'fk', 1) + K.t(264, 158, '= 2 g', 's tm', 'start')) + K.t(170, 22, v.p || '', 's tm') + K.t(170, 182, v.t || '', 'ta');
};
// Tres frascos con azul de bromotimol: 0 verde, 1 su color final (A azul, B y C amarillo).
const frascos = (v, K) => [[60, 'A · planta a la luz', v.a, 'fa', 'azul', 1], [170, 'B · caracol', v.b, 'fg', 'amarillo', 0], [280, 'C · planta a oscuras', v.c, 'fg', 'amarillo', 1]].map(([x, n, e, cl, col, pl], i) => {
  let s = K.r(x - 34, 40, 68, 112, e > 0.5 ? cl : 'fo', 8) + K.r(x - 28, 32, 56, 9, 'fk', 2);
  if (pl) s += K.pl([[x, 150], [x - 4, 124], [x + 2, 100], [x - 2, 76]], 'gr') + [[x - 10, 118], [x + 10, 104], [x - 8, 86]].map(([a, b]) => K.c(a, b, 5, 'fc')).join('');
  else s += K.c(x, 138, 10, 'fc') + K.c(x, 138, 4, 'fn') + K.l(x - 18, 147, x + 12, 147, 'gr');
  if (i === 2) s += K.r(x - 42, 24, 84, 136, 'fn d', 10);
  return s + K.t(x, 176, n, 's') + K.t(x, 192, e > 0.5 ? col : 'verde', 's tm');
}).join('');
// Conejos en una isla, año por año.
const IX = a => 52 + a * 34, IY = n => 170 - n * 0.27, IQ = [20, 60, 160, 300, 380, 400, 400];
const isla = (v, K) => ejes(K, IX, IY, [0, 1, 2, 3, 4, 5, 6, 7], [0, 100, 200, 300, 400, 500], 'años', 'conejos')
  + K.pl(IQ.slice(0, Math.round(v.n)).map((n, a) => [IX(a), IY(n)]), 'la gr') + IQ.slice(0, Math.round(v.n)).map((n, a) => K.c(IX(a), IY(n), 5, 'fA')).join('')
  + K.f(v.k, K.l(IX(0), IY(400), IX(7), IY(400), 'lf d') + K.t(IX(0) + 6, IY(400) - 6, 'capacidad de carga: 400', 's tf', 'start'))
  + K.f(v.e, K.c(IX(7), IY(500), 6, 'fF') + K.t(IX(7) + 10, IY(500) + 4, '500', 's tf', 'start') + K.ar(IX(7), IY(500) + 8, IX(7), IY(400) + 10, 'lf'));
// Ratones sobre arena blanca: k oscuros de 20, repartidos.
const ORDEN = [3, 17, 8, 12, 0, 19, 6, 14, 10, 1, 15, 5, 18, 9, 2, 13, 7, 11, 4, 16];
const ratones = (v, K) => K.r(30, 14, 280, 146, 'fc', 10) + Array.from({ length: 20 }, (_, i) => K.c(70 + (i % 5) * 50, 34 + Math.floor(i / 5) * 34, 11, ORDEN.indexOf(i) < Math.round(v.k) ? 'fk' : 'fn')).join('') + K.t(170, 182, v.t || '', 'ta');
// Dos vasos en balanzas: A azúcar que se disuelve (ma), B dos líquidos que forman un sólido amarillo (mb).
const balanzas = (v, K) => [[90, 'A · azúcar en agua', v.ma, 'físico'], [250, 'B · dos líquidos', v.mb, 'químico']].map(([x, n, e, c], i) => {
  let s = K.r(x - 55, 146, 110, 9, 'fc', 3) + K.r(x - 40, 155, 80, 26, 'fn', 4) + K.t(x, 173, '150.0 g', 's') + K.r(x - 30, 60, 60, 86, 'fn', 6) + K.r(x - 28, 84, 56, 60, 'fa', 4);
  if (!i) s += e > 0.5 ? [[x - 14, 100], [x + 10, 112], [x - 4, 126], [x + 16, 96], [x - 18, 132]].map(([a, b]) => K.c(a, b, 2.6, 'fc')).join('') : [0, 1, 2, 3].map(k => K.r(x - 22 + k * 11, 134, 9, 9, 'fc', 1)).join('');
  else if (e > 0.5) s += K.r(x - 28, 128, 56, 16, 'fG', 3) + [[x - 12, 104], [x + 12, 112]].map(([a, b]) => K.c(a, b, 2.6, 'fG')).join('');
  s += K.f(e, K.t(x, 46, c, 'b ta')) + K.f(v.h, K.r(x - 44, 151, 88, 34, 'fn d', 6));
  return s + K.t(x, 200, n, 's');
}).join('');
// 2H₂ + O₂ → 2H₂O: n recetas hechas con 6 H₂ y 4 O₂.
const agua = (K, x, y) => K.c(x, y, 9, 'ff') + K.c(x - 10, y + 7, 5, 'fc') + K.c(x + 10, y + 7, 5, 'fc');
const moles = (v, K) => K.t(10, 44, 'H₂', 's tm', 'start') + K.t(10, 96, 'O₂', 's tm', 'start') + K.t(10, 150, 'H₂O', 's tm', 'start')
  + Array.from({ length: 6 }, (_, i) => K.f(1 - Math.max(0, Math.min(1, 2 * v.n - i)) + 0.15, K.c(54 + i * 46, 40, 6, 'fc') + K.c(64 + i * 46, 40, 6, 'fc'))).join('')
  + Array.from({ length: 4 }, (_, i) => K.f(1 - Math.max(0, Math.min(1, v.n - i)) + 0.15, K.c(80 + i * 60, 92, 9, 'ff') + K.c(96 + i * 60, 92, 9, 'ff'))).join('')
  + Array.from({ length: 6 }, (_, i) => K.f(2 * v.n - i, agua(K, 59 + i * 46, 144))).join('') + K.t(170, 184, v.t || '', 'ta');
// El pez en el estanque: rayo en el agua (s), en el aire (a) e imagen aparente (p).
const pez = (K, x, y, cl) => K.p([[x - 12, y], [x, y - 6], [x + 10, y], [x, y + 6]], cl) + K.p([[x + 10, y], [x + 18, y - 6], [x + 18, y + 6]], cl);
const estanque = (v, K) => {
  const S = [170, 90], F = [120, 176.6], E = [229.8, 22.8], A = [120, 146.2];
  return K.r(20, 90, 300, 100, 'fa', 0) + K.l(170, 14, 170, 190, 'lm d') + pez(K, ...F, 'fF') + K.t(104, 181, 'pez', 's tm', 'end')
    + K.c(...E, 5, 'fk') + K.t(E[0] + 10, E[1] + 4, 'ojo', 's tm', 'start')
    + K.f(v.s, K.ar(...F, ...S, 'lg gr') + K.ang(S, [170, 190], F, 24, '30°', 'fg', 's'))
    + K.f(v.a, K.ar(...S, ...E, 'lg gr') + K.ang(S, [170, 14], E, 24, '42°', 'fg', 's'))
    + K.f(v.p, K.l(...S, ...A, 'lm d') + pez(K, ...A, 'fn d') + K.t(98, 134, 'lo que se ve', 's tm', 'end')) + K.t(92, 40, v.t || '', 's ta');
};
// Salón de 20: el enfermo es el 7; con V = 1 solo 0, 7 y 19 no están vacunados. w: rondas de contagio.
const VEC = i => [i - 5, i + 5, i % 5 ? i - 1 : -1, i % 5 < 4 ? i + 1 : -1].filter(j => j >= 0 && j < 20);
const enfermos = (V, w) => { const vac = i => V > 0.5 && ![0, 7, 19].includes(i); let e = new Set([7]); for (let k = 0; k < w; k++) e = new Set([...e, ...[...e].flatMap(VEC).filter(j => !vac(j))]); return { e, vac }; };
const salon = (v, K) => {
  const { e, vac } = enfermos(v.V, Math.round(v.w));
  return Array.from({ length: 20 }, (_, i) => K.c(70 + (i % 5) * 50, 30 + Math.floor(i / 5) * 34, 12, e.has(i) ? 'fF' : vac(i) ? 'fa' : 'fc')).join('')
    + K.f(v.h, K.c(70, 30, 17, 'fn d') + K.c(270, 132, 17, 'fn d'))
    + K.c(52, 170, 6, 'fa') + K.t(62, 174, 'vacunado', 's tm', 'start') + K.c(148, 170, 6, 'fF') + K.t(158, 174, 'enfermo', 's tm', 'start') + K.c(236, 170, 6, 'fc') + K.t(246, 174, 'sin vacuna', 's tm', 'start')
    + K.t(170, 198, v.t || '', 'ta');
};
// Dos masas de agua: la de 2 kg es el doble de grande que la de 1 kg.
const mezcla = (v, K) => K.r(36, 56, 128, 76, v.a > v.b + 1 ? 'ff' : 'fg', 6) + K.r(206, 80, 64, 52, v.b > v.a + 1 ? 'ff' : 'fa', 6)
  + K.t(100, 100, `${Math.round(v.a)}°`, 'b') + K.t(238, 112, `${Math.round(v.b)}°`, 'b') + K.t(100, 150, '2 kg', 's tm') + K.t(238, 150, '1 kg', 's tm')
  + (v.a > v.b + 1 ? K.ar(168, 106, 202, 106, 'lf gr') : '') + K.t(170, 178, v.t || '', 'ta');
// n células con c cromosomas, centrados.
const celulas = (v, K) => Array.from({ length: Math.round(v.n) }, (_, i) => { const n = Math.round(v.n), c = Math.round(v.c), x = 170 + (i - (n - 1) / 2) * 74; return K.c(x, 92, n > 2 ? 30 : 34, 'fn') + Array.from({ length: c }, (_, j) => K.l(x - (c - 1) * 4 + j * 8, 80, x - (c - 1) * 4 + j * 8, 104, j % 2 ? 'lg gr' : 'la gr')).join(''); }).join('') + K.t(170, 150, v.t || '', 'ta');
// Energía de dos bombillos en un mes: a y b en kWh; c muestra el CO₂.
const bombillos = (v, K) => [[50, 'incandescente', '60 W', v.a, 0.2 * 9], [116, 'LED', '9 W', v.b, 0.2 * 1.35]].map(([y, n, w, e, co]) =>
  K.t(98, y + 12, n, 's', 'end') + K.t(98, y + 26, w, 's tm', 'end') + K.r(106, y, e * 22, 26, n === 'LED' ? 'fa' : 'fg', 3)
  + K.f(e * 4, K.t(110, y - 6, `${n2(e)} kWh`, 's ta', 'start')) + K.f(v.c, K.t(296, y + 18, `CO₂: ${n2(co)} kg`, 's tf', 'end'))).join('') + K.t(170, 186, v.t || '', 'ta');

Object.assign(EJ, {
  // ------------------------------------------------------------------------------------------- Indagación científica
  'icf-cn-indaga-1': [{ t: 'Dos pelotas, dos alturas', q: 'Laura quiere saber si la altura desde la que se suelta una pelota cambia cuánto rebota. Suelta una pelota de tenis desde 1 m y una de ping-pong desde 2 m. La de ping-pong rebota más y Laura concluye que la altura influye. ¿Es válida su conclusión? ¿Cómo debió hacerlo?', escena: 'dibujo', en: { dib: rebote, alto: 220, v: { ha: 1, hb: 2, ka: 'tenis', kb: 'ping-pong', ra: 0, rb: 0, f: '' } }, m: [
    ['Dos pelotas distintas, soltadas desde alturas distintas.', {}],
    ['La de ping-pong rebota 140 cm y la de tenis, 55 cm. Hay una diferencia clara.', { ra: 0.55, rb: 1.4 }],
    ['Pero cambiaron dos cosas a la vez: la pelota y la altura. No hay forma de saber cuál de las dos causó la diferencia.', { f: '¿la pelota o la altura?' }],
    ['Se arregla usando la misma pelota de tenis y cambiando solo la altura: 1 m y 2 m. Ahora la diferencia solo puede venir de la altura.', { kb: 'tenis', rb: 1.1, f: 'solo cambia la altura' }],
  ], r: 'No es válida: cambiaron dos variables. Con la misma pelota desde 1 m y 2 m, la altura es la variable independiente, el rebote la dependiente, y la pelota y el piso quedan controlados.' }],
  'icf-cn-indaga-2': [{ t: 'El resorte que se estira', q: 'Un grupo cuelga masas de un resorte y mide su largo: con 0 g mide 10 cm; con 50 g, 13 cm; con 100 g, 16 cm, y con 150 g, 19 cm. ¿Cuánto medirá con 200 g? ¿Se puede asegurar cuánto medirá con 5 000 g?', escena: 'dibujo', en: { dib: resorte, alto: 204, v: { n: 0, l: 0, p: 0, e: 0 } }, m: [
    ['Primero se ubican los cuatro datos: cada punto es una masa con el largo que se midió.', { n: 4 }],
    ['Los puntos suben en línea recta: cada 50 g más, el resorte se estira 3 cm.', { l: 1 }, '$13 - 10 = 16 - 13 = 19 - 16 = 3$'],
    ['Siguiendo la tendencia, con 200 g mediría 22 cm. Es una predicción razonable, porque queda muy cerca de lo medido.', { p: 1 }, '$19 + 3 = 22$'],
    ['Con 5 000 g la cuenta daría 310 cm, pero eso dice de más: está lejísimos de los datos y el resorte podría deformarse o romperse.', { e: 1 }, '$10 + 100 \\cdot 3 = 310$'],
  ], r: 'Unos 22 cm, como predicción. Con 5 000 g no se puede asegurar nada: ninguna medida se acerca y la tendencia puede dejar de cumplirse.' }],

  // ------------------------------------------------------------------------------------------- Célula y organismos
  'icf-cn-celula-1': [{ t: 'Las tiras de papa', q: 'Dos tiras de papa de 10 g se dejan una hora, una en agua destilada y otra en agua con mucha sal. Al pesarlas, una pesa 11 g y la otra 8 g. ¿Cuál es cuál y por qué?', de: 0, v: { r: 52, d: 4, a: 0, f: 0, t: '' }, m: [
    ['Dentro de cada célula de papa hay sales y azúcares disueltos: los puntos. En agua destilada no hay nada disuelto afuera.', { t: 'en agua destilada' }],
    ['Hay más soluto adentro, así que el agua entra a la célula.', { f: 1, t: 'el agua entra' }],
    ['Las células se llenan y la tira gana masa: pasa de 10 a 11 g y se pone firme.', { r: 62, f: 0, t: '10 g → 11 g' }],
    ['En agua muy salada hay más soluto afuera: el agua sale, las células se encogen y la tira baja a 8 g y se ablanda.', { r: 42, a: 8, f: -1, t: 'en sal: 10 g → 8 g' }],
  ], r: 'La de 11 g estuvo en agua destilada y la de 8 g en agua salada. El agua cruza la membrana hacia donde hay más soluto; la sal casi no pasa.' }],
  'icf-cn-celula-2': [{ t: 'El nadador en el lago frío', q: 'Un nadador entra a un lago frío. Su temperatura es 37.0 °C al entrar, 36.5 °C a los 10 minutos y 36.2 °C a los 20, cuando sale. A los 30 minutos marca 36.6 °C y a los 40, 37.0 °C. En el agua tiritaba y tenía la piel pálida. ¿Qué pasó en su cuerpo?', escena: 'dibujo', en: { dib: nadador, alto: 210, v: { n: 1, k: 0, t: '' } }, m: [
    ['Al entrar al agua fría pierde calor y su temperatura baja de 37.0 a 36.5 °C.', { n: 2 }],
    ['La piel avisa al cerebro y el cuerpo responde: tiembla, lo que produce calor, y cierra los vasos de la piel, lo que lo guarda. Por eso se ve pálido.', { k: 1 }],
    ['Aun así, el agua le quita calor más rápido de lo que él lo produce: a los 20 minutos va en 36.2 °C.', { n: 3 }],
    ['Fuera del agua las respuestas ganan y vuelve a 37.0 °C. No importa que haya bajado: importa que volvió.', { n: 5, t: 'vuelve a su valor' }],
  ], r: 'Su temperatura bajó y el cuerpo la corrigió temblando y cerrando los vasos de la piel; al salir, volvió a 37.0 °C. Es homeostasis: cambio, aviso, respuesta y efecto que corrige.' }],
  'icf-cn-celula-3': [{ t: 'Seis letras de ADN', q: 'Un trozo de ADN dice TACCGA. ¿Qué ARN mensajero sale de él y qué aminoácidos indica? (AUG: metionina, Met; GCU: alanina, Ala).', escena: 'fichas', en: { alto: 96, slots: [{ x: 48, y: 46, w: 62, et: 'ADN TAC' }, { x: 128, y: 46, w: 62, et: 'ADN CGA' }, { x: 210, y: 46, w: 62, et: 'aminoácido' }, { x: 290, y: 46, w: 62, et: 'aminoácido' }], fichas: ['AUG', 'GCU', 'Met', 'Ala', 'ATG', 'UAC'] }, m: [
    ['Se copia letra por letra: la T se vuelve A, la A se vuelve U y la C se vuelve G. Así, TAC da AUG.', { pon: { 0: 'AUG' } }],
    ['Con el segundo grupo igual: C da G, G da C y A da U. CGA da GCU.', { pon: { 1: 'GCU' } }],
    ['El ribosoma lee de a tres. AUG indica metionina, el aminoácido con que empiezan las proteínas.', { pon: { 2: 'Met' } }],
    ['Y GCU indica alanina. Seis letras son dos codones y dos aminoácidos.', { pon: { 3: 'Ala' }, marca: [2, 3] }, '$6 \\div 3 = 2$'],
  ], r: 'ARN AUG GCU, que indica metionina y alanina. ATG sería copiar con T, que el ARN no usa; UAC sería repetir el ADN cambiando solo la T.' }],

  // ------------------------------------------------------------------------------------------- Movimiento y fuerzas
  'icf-cn-movimiento-1': [{ t: 'El carro que se devuelve', q: 'Un carro de pruebas en una pista recta pasa por las posiciones 0, 30, 60, 60 y 30 m en los segundos 0, 1, 2, 3 y 4. ¿Qué hizo en cada tramo? ¿Cuánto recorrió y dónde terminó?', de: 0, v: { q: [0, 30, 60, 60, 30], n: 1, t: '' }, m: [
    ['En los dos primeros segundos va de 0 a 60 m: 30 m cada segundo. La línea sube recta.', { n: 3, t: '30 m/s' }, '$60 \\div 2 = 30$ m/s'],
    ['Del segundo 2 al 3 la línea queda plana: sigue en 60 m, está detenido.', { n: 4, t: 'quieto en 60 m' }],
    ['Del 3 al 4 la línea baja a 30 m: se devuelve a 30 m/s. Su velocidad es −30 m/s.', { n: 5, t: '−30 m/s' }],
    ['Recorrió 60 m de ida y 30 de vuelta, 90 m en total, pero terminó solo 30 m adelante de donde salió.', { t: 'recorrió 90 m; quedó en 30 m' }, '$60 + 30 = 90$'],
  ], r: 'Avanzó a 30 m/s, se detuvo un segundo y regresó a 30 m/s. Recorrió 90 m, pero su posición final es 30 m: distancia recorrida y posición no son lo mismo.' }],
  'icf-cn-movimiento-2': [{ t: 'El cajón que arranca', q: 'Pedro empuja un cajón de 20 kg con 100 N y el piso lo frena con 40 N. ¿Con qué aceleración arranca? Si el roce fuera de 100 N, ¿qué pasaría?', de: 0, v: { d: 50, i: 0, t: '', p: 'cajón de 20 kg' }, m: [
    ['Pedro empuja hacia la derecha con 100 N.', {}],
    ['El roce va en contra, con 40 N. Como son contrarias, se restan: la fuerza neta es 60 N.', { i: 20, t: 'neta: 60 N' }, '$100 - 40 = 60$'],
    ['Esos 60 N se reparten en los 20 kg: el cajón gana 3 m/s cada segundo.', { p: 'a = 60 ÷ 20 = 3 m/s²' }, '$a = \\tfrac{60}{20} = 3$ m/s²'],
    ['Si el roce fuera de 100 N, la neta sería cero: el cajón no aceleraría. Si estaba quieto, seguiría quieto.', { i: 50, t: 'neta: 0 N', p: 'sin aceleración' }, '$100 - 100 = 0$'],
  ], r: 'Arranca con 3 m/s². Con un roce de 100 N la fuerza neta es cero y el cajón no acelera, aunque sobre él actúen dos fuerzas.' }],
  'icf-cn-movimiento-3': [{ t: 'Desde el puente', q: 'Desde un puente de 45 m se sueltan a la vez una tuerca de 0.1 kg y una piedra de 2 kg. Sin contar el aire, ¿cuánto tardan en llegar al agua y con qué velocidad llegan? (gravedad: 10 m/s²)', de: 0, v: { y: 0, z: 0, r1: 7, r2: 13, a: 'tuerca', b: 'piedra', t: '' }, m: [
    ['Las dos salen quietas. Sin aire, cada segundo ganan 10 m/s, pesen lo que pesen.', { t: 'salen quietas' }],
    ['En el primer segundo pasan de 0 a 10 m/s: en promedio van a 5 m/s y bajan 5 m.', { y: 5 / 45, z: 5 / 45, t: '1 s: bajaron 5 m, van a 10 m/s' }],
    ['En el segundo, de 10 a 20 m/s: bajan 15 m más. Ya llevan 20 m.', { y: 20 / 45, z: 20 / 45, t: '2 s: 20 m, a 20 m/s' }, '$5 + 15 = 20$'],
    ['En el tercero bajan 25 m más: completan los 45 m. Llegan juntas, a los 3 s y a 30 m/s.', { y: 1, z: 1, t: '3 s: 45 m, a 30 m/s' }, '$5 + 15 + 25 = 45$'],
  ], r: 'Tardan 3 s y llegan a 30 m/s, las dos a la vez. Sin aire, la masa no cambia la caída.' }],

  // ------------------------------------------------------------------------------------------- Materia y mezclas
  'icf-cn-materia-1': [{ t: 'La piedra y la cera', q: 'Una piedra de 30 g sube el agua de una probeta de 50 a 62 mL. Un trozo de cera de 18 g, empujado con un alambre fino hasta quedar cubierto, la sube de 50 a 70 mL. ¿Cuál flota en el agua (1 g/cm³)? ¿Y la cera en alcohol (0.8 g/cm³)?', escena: 'dibujo', en: { dib: probetas, alto: 210, v: { a: 50, b: 50, sa: 0, sb: 0, ta: '', tb: '', al: 0 } }, m: [
    ['El agua que sube es el volumen del objeto sumergido: la piedra ocupa 12 cm³.', { a: 62, sa: 1, ta: '12 cm³' }, '$62 - 50 = 12$'],
    ['Su densidad es 30 g en 12 cm³: 2.5 g por cm³. Es más densa que el agua: se hunde.', { ta: '2.5 g/cm³: se hunde' }, '$30 \\div 12 = 2.5$'],
    ['La cera cubierta ocupa 20 cm³: 18 g entre 20 da 0.9. Es menos densa que el agua: al soltarla, flota.', { b: 70, sb: 1, tb: '0.9 g/cm³: flota' }, '$18 \\div 20 = 0.9$'],
    ['En alcohol, de 0.8, la cera es más densa que el líquido: se va al fondo.', { b: 70, al: 1, tb: 'en alcohol: se hunde' }],
  ], r: 'La piedra (2.5 g/cm³) se hunde y la cera (0.9 g/cm³) flota en agua; en alcohol la cera se hunde, porque 0.9 es más que 0.8. Flota lo que es menos denso que el líquido.' }],
  'icf-cn-materia-2': [{ t: 'Agua de mar turbia', q: 'Un balde tiene 500 g de agua de mar turbia: 465 g de agua, 15 g de sal disuelta y 20 g de arena. ¿Cómo se recuperan las tres cosas y cuánto debe pesar cada una?', escena: 'dibujo', en: { dib: separa, alto: 182, v: { s: 0 } }, m: [
    ['La arena no se disuelve y sus granos son grandes: se queda en un filtro de papel. Pesa 20 g.', { s: 1 }],
    ['Por el filtro pasa agua con sal: 480 g de una mezcla homogénea. Ningún filtro separa la sal disuelta.', { s: 2 }, '$500 - 20 = 480$'],
    ['Se destila: el agua hierve, su vapor se enfría en el tubo y se recoge. La sal no se evapora y queda en el balón.', { s: 3 }],
    ['Al pesar todo salen los 500 g del comienzo: al separar, la masa se conserva.', { s: 4 }, '$20 + 15 + 465 = 500$'],
  ], r: 'Primero filtrar (sale la arena, 20 g) y después destilar (se recogen 465 g de agua y quedan 15 g de sal). El orden importa: la sal disuelta pasa por cualquier filtro.' }],
  'icf-cn-materia-3': [{ t: 'Poca agua para tanta sal', q: 'A 20 °C, en 100 g de agua caben 36 g de sal. Se echan 30 g de sal en solo 50 g de agua y se agita. ¿Cuánta sal queda en el fondo? ¿Qué pasa si después se agregan otros 50 g de agua?', escena: 'dibujo', en: { dib: vasoSal, alto: 192, v: { w: 0.5, d: 0, q: 0, t: '', p: '50 g de agua' } }, m: [
    ['Con la mitad del agua cabe la mitad de la sal: 18 g se disuelven.', { d: 18, t: 'caben 18 g' }, '$36 \\div 2 = 18$'],
    ['Los otros 12 g se quedan en el fondo por más que se agite: la disolución está saturada.', { q: 6, t: 'saturada: 12 g en el fondo' }, '$30 - 18 = 12$'],
    ['Con 50 g más de agua hay 100 g: caben 36 y solo hay 30. Se disuelve todo y faltan 6 g para el límite.', { w: 1, d: 30, q: 0, t: 'insaturada', p: '100 g de agua' }, '$36 - 30 = 6$'],
  ], r: 'Quedan 12 g en el fondo. Al agregar 50 g de agua se disuelve todo y la disolución queda insaturada: el límite depende de cuánta agua hay.' }],

  // ------------------------------------------------------------------------------------------- Ecosistemas
  'icf-cn-ecosistemas-1': [{ t: 'Maíz o pollo', q: 'Una finca produce maíz con 10 000 kcal de energía. Si la familia se come el maíz, ¿cuánta energía aprovecha? ¿Y si se lo da a unos pollos y después se come los pollos? (en cada paso pasa cerca de la décima parte)', de: 2, v: { n: 0, k: ['maíz 10 000', '', '', ''], t: '' }, m: [
    ['El maíz guarda 10 000 kcal: es el productor, la base de la pirámide.', { n: 1 }],
    ['Si los pollos comen el maíz, les llega la décima parte: 1 000 kcal. Lo demás se va en calor y en lo que no se come.', { n: 2, k: ['maíz 10 000', 'pollos 1 000', '', ''] }, '$10\\,000 \\div 10 = 1\\,000$'],
    ['A la familia que se come los pollos le llega otra décima parte: solo 100 kcal.', { n: 3, k: ['maíz 10 000', 'pollos 1 000', 'familia 100', ''] }, '$1\\,000 \\div 10 = 100$'],
    ['Si la familia come el maíz directamente, queda un nivel más abajo: le llegan 1 000 kcal, diez veces más.', { n: 2, k: ['maíz 10 000', 'familia 1 000', '', ''], t: 'un paso menos: 10 veces más' }],
  ], r: '1 000 kcal comiendo maíz y 100 kcal comiendo pollo. Cada paso de la cadena pierde cerca del 90 %; por eso comer más abajo en la cadena alimenta a más gente con la misma cosecha.' }],
  'icf-cn-ecosistemas-2': [{ t: 'Tres frascos con indicador', q: 'Tres frascos cerrados tienen agua con azul de bromotimol, que es verde al comenzar, se pone azul si baja el dióxido de carbono y amarillo si sube. A tiene una planta acuática a la luz; B, un caracol; C, la misma planta a oscuras. ¿De qué color queda cada uno al día siguiente?', escena: 'dibujo', en: { dib: frascos, alto: 198, v: { a: 0, b: 0, c: 0 } }, m: [
    ['Al comenzar los tres están verdes: tienen el mismo dióxido de carbono disuelto.', {}],
    ['A la luz, la planta hace fotosíntesis: toma más CO₂ del que suelta al respirar. A se pone azul.', { a: 1 }],
    ['El caracol solo respira: suelta CO₂ y no toma nada. B se pone amarillo.', { b: 1 }],
    ['A oscuras la planta no hace fotosíntesis, pero sigue respirando: C también se pone amarillo.', { c: 1 }],
  ], r: 'A azul, B amarillo y C amarillo. La fotosíntesis saca carbono del agua y la respiración lo devuelve; las plantas respiran siempre, con luz o sin ella.' }],
  'icf-cn-ecosistemas-3': [{ t: 'Los conejos de la isla', q: 'En una isla sin depredadores se sueltan 20 conejos. Cada año se cuentan: 20, 60, 160, 300, 380, 400 y 400. ¿Por qué dejan de crecer? ¿Qué pasaría si llegaran 100 conejos más?', escena: 'dibujo', en: { dib: isla, alto: 204, v: { n: 0, k: 0, e: 0 } }, m: [
    ['Al comienzo sobran pasto y espacio: la población se multiplica rápido.', { n: 3 }],
    ['Después crece cada vez menos: 140 en un año, luego 80, luego 20.', { n: 6 }, '$300 - 160 = 140 \\quad 380 - 300 = 80 \\quad 400 - 380 = 20$'],
    ['Se queda en 400: es la capacidad de carga, los que alcanzan a sostener la comida y el espacio de la isla.', { n: 7, k: 1 }],
    ['Con 100 más llegaría a 500 por un tiempo, pero faltaría comida: mueren o nacen menos, y vuelve hacia 400.', { e: 1 }],
  ], r: 'Dejan de crecer porque la isla solo sostiene unos 400 conejos. Si llegan 100 más, la población pasa el límite, se agota la comida y baja otra vez hacia 400.' }],

  // ------------------------------------------------------------------------------------------- Energía y calor
  'icf-cn-energia-1': [{ t: 'La patinadora en la rampa', q: 'Una patinadora de 40 kg parte quieta desde lo alto de una rampa de 5 m. Sin roce, ¿con qué energía y con qué velocidad llega abajo? Si en realidad llega con 1 620 J, ¿cuánta energía se volvió calor? (gravedad: 10 m/s²)', de: 0, v: { h: 1, c: 0, t: '' }, m: [
    ['Arriba y quieta, toda su energía es potencial: masa por gravedad por altura.', { t: 'potencial: 2 000 J' }, '$40 \\cdot 10 \\cdot 5 = 2\\,000$ J'],
    ['A mitad de la altura ya cambió la mitad: 1 000 J de potencial y 1 000 J de cinética.', { h: 0.5, t: '1 000 J + 1 000 J' }],
    ['Abajo, sin roce, los 2 000 J son cinéticos: va a 10 m/s.', { h: 0, t: 'cinética: 2 000 J' }, '$\\tfrac12 \\cdot 40 \\cdot v^2 = 2\\,000 \\Rightarrow v = 10$'],
    ['Si llega con 1 620 J, los 380 J que faltan calentaron las ruedas y la rampa. Va a 9 m/s.', { c: 0.19, t: '1 620 J y 380 J de calor' }, '$2\\,000 - 1\\,620 = 380$'],
  ], r: 'Sin roce llega con 2 000 J y a 10 m/s. Con roce, 380 J se volvieron calor y llega a 9 m/s: la energía total sigue siendo 2 000 J.' }],
  'icf-cn-energia-2': [{ t: 'Agua caliente y agua fría', q: 'En un termo se mezclan 2 kg de agua a 80 °C con 1 kg de agua a 20 °C. ¿A qué temperatura quedan? ¿Por qué no a 50 °C?', escena: 'dibujo', en: { dib: mezcla, alto: 186, v: { a: 80, b: 20, t: '' } }, m: [
    ['El agua caliente le pasa calor a la fría hasta que se igualen.', { t: 'el calor pasa de la caliente a la fría' }],
    ['Hay el doble de agua caliente: por cada grado que ella baja, la fría sube dos.', { a: 75, b: 30, t: 'baja 5, sube 10' }],
    ['Se igualan en 60 °C: la caliente bajó 20 grados y la fría subió 40.', { a: 60, b: 60, t: 'equilibrio: 60°' }, '$T = \\tfrac{2 \\cdot 80 + 1 \\cdot 20}{3} = 60$'],
    ['50 °C es el punto medio, que solo vale con masas iguales. El equilibrio queda más cerca del agua que había en mayor cantidad.', { t: 'más cerca de la masa mayor' }],
  ], r: 'A 60 °C. El calor que pierde el agua caliente lo gana la fría, pero hay el doble de caliente: baja 20 °C mientras la fría sube 40 °C.' }],

  // ------------------------------------------------------------------------------------------- Átomo y enlaces
  'icf-cn-atomo-1': [{ t: 'Una partícula con cargas de más', q: 'Una partícula tiene 13 protones, 14 neutrones y 10 electrones. ¿Qué elemento es, cuál es su masa y qué carga tiene? (el aluminio tiene número atómico 13)', de: 0, v: { p: 13, n: 0, e: 0, t: '' }, m: [
    ['Tiene trece protones, y los protones deciden el elemento: es aluminio.', { t: '13 protones: aluminio' }],
    ['Con los 14 neutrones, el núcleo tiene 27 partículas: esa es su masa.', { n: 14, t: 'masa 27' }, '$13 + 14 = 27$'],
    ['Alrededor hay 10 electrones: 2 en la primera capa y 8 en la segunda.', { e: 10, t: '10 electrones' }],
    ['Hay trece cargas positivas y diez negativas: sobran tres positivas. Perdió tres electrones.', { t: 'ion Al³⁺' }, '$13 - 10 = +3$'],
  ], r: 'Es aluminio, de masa 27 y carga +3: el ion Al³⁺. Neutro tendría 13 electrones.' }],
  'icf-cn-atomo-2': H('Tres sólidos sin etiqueta', 'En un laboratorio se prueban tres sólidos de distintos colores. ¿Qué enlace tiene cada uno?', [
    ['X: se funde a 801 °C.', 'Sólido no conduce;', 'disuelto en agua, sí.'],
    ['Y: se funde a 1 085 °C.', 'Conduce estando sólido', 'y se dobla sin romperse.'],
    ['Z: se funde a 80 °C.', 'No conduce ni sólido ni disuelto.'],
  ], ['X iónico, Y metálico, Z covalente', 'X metálico, Y iónico, Z covalente', 'X covalente, Y metálico, Z iónico', 'Los tres son iónicos'], [
    ['X solo conduce disuelto: al disolverse, sus iones quedan libres. Además, se funde muy caliente (801 °C), como una red de iones.', { luz: [0, 1, 2], n: { 0: 'iónico' } }],
    ['Y conduce sólido y se dobla: tiene electrones que se mueven por toda la pieza. Eso descarta B.', { luz: [4, 5], n: { 1: 'metálico' }, x: ['B'] }],
    ['Z se funde fácil y no conduce de ninguna forma: son moléculas que comparten electrones. Fuera C y D.', { luz: [6, 7], n: { 2: 'covalente' }, x: ['C', 'D'] }],
    ['Solo A acomoda los tres.', { luz: ['A'] }],
  ], 'A. Son, por ejemplo, la sal de cocina, el cobre y la naftalina.'),

  // ------------------------------------------------------------------------------------------- Herencia y evolución
  'icf-cn-herencia-1': [{ t: '¿NN o Nn?', q: 'En los perros de cierta raza el pelo negro (N) domina al café (n). Un perro negro se cruza con una perra café. ¿Cómo se puede saber si el perro es NN o Nn?', de: 2, v: { p: ['N', 'N'], m: ['n', 'n'], n: 0, t: '' }, m: [
    ['La perra café es nn: solo puede dar n. Si el perro fuera NN, solo daría N.', {}],
    ['Entonces todas las crías serían Nn: todas negras.', { n: 4, t: '4 de 4 negras' }],
    ['Si el perro es Nn, da N o n con la misma probabilidad.', { p: ['N', 'n'], n: 0, t: '' }],
    ['La mitad de las crías serían nn, cafés. Basta un cachorro café para saber que el padre es Nn.', { n: 4, t: '2 de 4 cafés' }],
  ], r: 'Se miran las crías: si sale alguna café, el perro es Nn; si en muchas crías todas salen negras, casi seguro es NN. Cruzar con un recesivo deja ver lo que el dominante esconde.' }],
  'icf-cn-herencia-2': [{ t: 'Los cromosomas de una planta', q: 'Las células de la hoja de una planta tienen 6 cromosomas. ¿Cuántos tienen las células de la punta de la raíz que crece, sus granos de polen y el embrión de la semilla que se forma al fecundar?', escena: 'dibujo', en: { dib: celulas, alto: 160, v: { n: 1, c: 6, t: '' } }, m: [
    ['Una célula de la hoja tiene 6 cromosomas.', { t: 'hoja: 6 cromosomas' }],
    ['La raíz crece por mitosis: cada célula da dos iguales a ella, con 6.', { n: 2, t: 'raíz, por mitosis: 6 y 6' }],
    ['El polen se forma por meiosis: cuatro células con la mitad, 3 cada una.', { n: 4, c: 3, t: 'polen, por meiosis: 3' }, '$6 \\div 2 = 3$'],
    ['Al fecundar se juntan un polen y un óvulo, de 3 cada uno: el embrión vuelve a tener 6.', { n: 1, c: 6, t: 'embrión: 3 + 3 = 6' }, '$3 + 3 = 6$'],
  ], r: 'Raíz: 6, porque la mitosis copia. Polen: 3, porque la meiosis reduce a la mitad. Embrión: 6, la suma de dos gametos.' }],
  'icf-cn-herencia-3': [{ t: 'Ratones en la arena blanca', q: 'En una playa de arena blanca vive una población de ratones, unos de pelaje oscuro y otros claro; el color se hereda. Al comienzo, 14 de cada 20 son oscuros. Los búhos los cazan de noche guiándose por la vista. ¿Qué se espera tras muchas generaciones y por qué?', escena: 'dibujo', en: { dib: ratones, alto: 192, v: { k: 14, t: '' } }, m: [
    ['Al comienzo hay de los dos colores: 14 oscuros y 6 claros. La variación ya existe.', { t: '14 oscuros de 20' }],
    ['Sobre la arena blanca, los búhos ven mejor a los oscuros. Los claros sobreviven más y dejan más crías claras.', { k: 9, t: 'después: 9 de 20' }],
    ['Generación tras generación la proporción sigue cambiando.', { k: 4, t: 'más tarde: 4 de 20' }, '$\\tfrac{14}{20} = 70\\,\\% \\;\\to\\; \\tfrac{4}{20} = 20\\,\\%$'],
    ['Ningún ratón se aclaró: cambió la población. En arena oscura habrían ganado los oscuros.', { t: 'cambia la población, no cada ratón' }],
  ], r: 'Que aumente la proporción de ratones claros: se camuflan, sobreviven más y transmiten su color a más crías. Es selección natural sobre una variación que ya existía.' }],

  // ------------------------------------------------------------------------------------------- Reacciones y cantidades
  'icf-cn-reacciones-1': [{ t: 'Dos vasos en la balanza', q: 'En el vaso A se disuelven 30 g de azúcar en 120 g de agua. En el vaso B se juntan dos disoluciones transparentes, de yoduro de potasio y de nitrato de plomo, que pesan 150 g en total, y aparece un sólido amarillo. ¿Cuál es un cambio químico? ¿Qué marca cada balanza al final?', escena: 'dibujo', en: { dib: balanzas, alto: 208, v: { ma: 0, mb: 0, h: 0 } }, m: [
    ['Antes de mezclar, la balanza ya descontó el vaso: el contenido pesa 150.0 g.', {}],
    ['En A el azúcar deja de verse, pero sigue ahí, repartido en el agua: sigue siendo azúcar. Es un cambio físico.', { ma: 1 }],
    ['En B aparece un sólido amarillo que no estaba: yoduro de plomo, una sustancia nueva. Es un cambio químico.', { mb: 1 }],
    ['Las dos balanzas siguen en 150.0 g: si nada entra ni sale del vaso, la masa no cambia, haya o no reacción.', { h: 1 }, '$120 + 30 = 150$'],
  ], r: 'B es químico, porque aparece una sustancia nueva; A es físico. Las dos balanzas marcan 150 g: los átomos se reacomodan, pero no se crean ni se destruyen.' }],
  'icf-cn-reacciones-2': [{ t: 'El que se acaba primero', q: 'Se hacen reaccionar 6 moles de H₂ con 4 moles de O₂ según $2H_2 + O_2 \\to 2H_2O$. ¿Cuál reactivo limita, cuánta agua sale y qué sobra? (H = 1, O = 16)', escena: 'dibujo', en: { dib: moles, alto: 192, v: { n: 0, t: 'receta: 2 H₂ + 1 O₂ → 2 H₂O' } }, m: [
    ['La receta pide 2 moléculas de H₂ por cada una de O₂. Una vez hecha, salen 2 de agua.', { n: 1, t: '1 receta: 2 H₂O' }],
    ['A la tercera receta se acaba el hidrógeno: ya salieron 6 moléculas de agua y queda 1 de O₂ sin usar.', { n: 3, t: 'se acabó el H₂; sobra 1 O₂' }, '$6 \\div 2 = 3$ recetas'],
    ['Limita el H₂ aunque había más H₂ que O₂: la receta pide el doble. Cada mol de agua pesa 18 g.', { t: '6 mol de agua: 108 g' }, '$6 \\cdot 18 = 108$'],
  ], r: 'Limita el H₂: salen 6 moles de agua (108 g) y sobra 1 mol de O₂. Tener menos moles de O₂ no lo hace el limitante: hay que dividir entre lo que pide la receta.' }],
  'icf-cn-reacciones-3': [{ t: 'El acuario', q: 'El agua de un acuario tenía pH 7 y, con restos de comida que se pudren, bajó a pH 5. ¿Cuántas veces más iones H⁺ tiene ahora? Para corregirlo se agrega bicarbonato, que es básico: ¿hasta dónde conviene subirlo?', de: 0, v: { h: 7, t: '' }, m: [
    ['Al comienzo el agua estaba en 7: neutra.', { t: 'neutra' }],
    ['Un paso hacia el ácido, pH 6: diez veces más iones H⁺.', { h: 6, t: '10 veces más H⁺' }],
    ['Otro paso, pH 5: diez veces más otra vez. En total, cien veces.', { h: 5, t: '100 veces más H⁺' }, '$10 \\cdot 10 = 100$'],
    ['El bicarbonato neutraliza el ácido y el pH sube. Se agrega poco a poco, midiendo, hasta quedar cerca de 7 sin pasarse.', { h: 7, t: 'de vuelta cerca de 7' }],
  ], r: 'Tiene cien veces más H⁺: son dos pasos de pH. Con la base se neutraliza y se sube despacio hasta cerca de 7; con base de más, el agua quedaría básica.' }],

  // ------------------------------------------------------------------------------------------- Ondas, luz y sonido
  'icf-cn-ondas-1': [{ t: 'La cuerda que se sacude', q: 'Una estudiante sacude el extremo de una cuerda larga 4 veces por segundo y las crestas quedan a 0.5 m una de otra. ¿Con qué rapidez viaja la onda? Si la sacude 8 veces por segundo, ¿qué cambia?', de: 0, v: { n: 3, A: 30, g: 0, k: 0, t: '' }, m: [
    ['Cada sacudida forma una cresta: 4 por segundo es la frecuencia, 4 Hz.', { t: 'f = 4 Hz' }],
    ['De cresta a cresta hay 0.5 m: es la longitud de onda.', { t: 'λ = 0.5 m' }],
    ['En un segundo salen 4 crestas separadas 0.5 m: la onda avanza 2 m cada segundo.', { g: 1, t: 'v = 0.5 · 4 = 2 m/s' }, '$0.5 \\cdot 4 = 2$ m/s'],
    ['Al doble de frecuencia, la cuerda es la misma y la rapidez no cambia: las crestas quedan más juntas, a 0.25 m.', { n: 6, t: '8 Hz: λ = 0.25 m' }, '$2 \\div 8 = 0.25$'],
  ], r: 'Viaja a 2 m/s. Con 8 Hz la rapidez sigue en 2 m/s, porque la pone la cuerda, y la longitud de onda baja a 0.25 m.' }],
  'icf-cn-ondas-2': [{ t: 'El pez que no está donde se ve', q: 'Desde la orilla, una niña ve un pez dentro de un estanque y quiere tocarlo con un palo. ¿Dónde está el pez de verdad: donde lo ve, más arriba o más abajo? Explícalo con lo que hace la luz.', escena: 'dibujo', en: { dib: estanque, alto: 196, v: { s: 0, a: 0, p: 0, t: '' } }, m: [
    ['La luz que sale del pez sube por el agua hasta la superficie, a 30° de la normal.', { s: 1 }],
    ['Al pasar al aire va más rápido y se aleja de la normal: sale a unos 42° y llega al ojo.', { a: 1, t: 'se aleja de la normal' }],
    ['El ojo no sabe que la luz se dobló: la prolonga en línea recta hacia atrás y ve el pez más arriba de donde está.', { p: 1, t: 'el pez parece más arriba' }],
  ], r: 'Más abajo de donde se ve. Al salir del agua la luz se refracta y se aleja de la normal; el ojo la sigue en línea recta y forma una imagen más alta que el pez.' }],

  // ------------------------------------------------------------------------------------------- Gases y disoluciones
  'icf-cn-gases-1': [{ t: 'El globo que se calienta', q: 'Un globo tiene 5 L a 27 °C. Se calienta, a la misma presión, hasta 87 °C. ¿Cuál es su nuevo volumen? ¿Por qué no se multiplica por 87 ÷ 27?', de: 2, v: { r: 40, t: '' }, m: [
    ['Primero se pasa a kelvin: 27 °C son 300 K.', { t: '300 K: 5 L' }, '$27 + 273 = 300$'],
    ['Y 87 °C son 360 K: los kelvin crecen 1.2 veces.', { t: '360 K: ¿cuántos litros?' }, '$87 + 273 = 360 \\qquad 360 \\div 300 = 1.2$'],
    ['El volumen crece en la misma proporción: 5 por 1.2 son 6 L.', { r: 43, t: '360 K: 6 L' }, '$5 \\cdot 1.2 = 6$'],
    ['Con Celsius daría 87 ÷ 27, unas 3.2 veces: cerca de 16 L, que es falso. El 0 °C no es la ausencia de movimiento.', { t: 'en °C daría 16 L: falso' }],
  ], r: '6 L. La proporción vale en kelvin: de 300 K a 360 K es 1.2 veces. Hacerla en Celsius da unos 16 L, un error.' }],
  'icf-cn-gases-2': [{ t: 'El jugo concentrado', q: 'Un jugo concentrado tiene 0.5 L con 120 g de azúcar por litro. La etiqueta dice que se sirve a 30 g/L. ¿Cuánta agua hay que agregar?', de: 0, v: { n: 0.25, t: '' }, m: [
    ['En medio litro a 120 g/L hay 60 g de azúcar.', { t: '60 g en 0.5 L' }, '$120 \\cdot 0.5 = 60$'],
    ['Al agregar agua, el azúcar sigue siendo el mismo: solo se reparte en más volumen.', { n: 0.5, t: '60 g en 1 L: 60 g/L' }],
    ['Para que cada litro tenga 30 g, los 60 g deben quedar en 2 L.', { n: 1, t: '60 g en 2 L: 30 g/L' }, '$60 \\div 30 = 2$'],
    ['Ya había medio litro: se agregan 1.5 L de agua, no 2.', { t: 'se agregan 1.5 L' }, '$2 - 0.5 = 1.5$'],
  ], r: 'Se agregan 1.5 L de agua, para un volumen final de 2 L. El producto de concentración por volumen no cambia: $120 \\cdot 0.5 = 30 \\cdot 2$.' }],

  // ------------------------------------------------------------------------------------------- Electricidad y magnetismo
  'icf-cn-electrico-1': [{ t: 'Dos bombillos en casa', q: 'Dos bombillos iguales de 240 Ω se conectan a 120 V. ¿Qué corriente y qué potencia tiene cada uno si van en serie? ¿Y si van en paralelo? ¿Por qué en las casas se usa el paralelo?', de: 2, v: { p: 0, a: 1, b: 1, t: '' }, m: [
    ['En serie hay un solo camino: la corriente atraviesa 480 Ω y es de 0.25 A.', { t: 'serie: 120 ÷ 480 = 0.25 A' }, '$240 + 240 = 480 \\qquad 120 \\div 480 = 0.25$ A'],
    ['Cada bombillo se queda con la mitad del voltaje, 60 V, y da solo 15 W: alumbra poco.', { t: 'cada uno: 60 V · 0.25 A = 15 W' }, '$60 \\cdot 0.25 = 15$ W'],
    ['En paralelo cada uno recibe los 120 V: le pasan 0.5 A y da 60 W, cuatro veces más.', { p: 1, t: 'cada uno: 120 V · 0.5 A = 60 W' }, '$120 \\div 240 = 0.5 \\qquad 120 \\cdot 0.5 = 60$ W'],
    ['Y si uno se daña, el otro sigue prendido: cada aparato de la casa tiene su propio camino.', { a: 0, t: 'uno se daña: el otro sigue' }],
  ], r: 'En serie: 0.25 A y 15 W cada uno. En paralelo: 0.5 A y 60 W cada uno, y funcionan por separado. Por eso las casas se conectan en paralelo.' }],
  'icf-cn-electrico-2': [{ t: 'Tres veces más lejos', q: 'Dos esferas con cargas opuestas se atraen con una fuerza de 36 mN cuando están a 3 cm. ¿Qué fuerza hay cuando están a 9 cm? ¿Y si además se duplica una de las cargas?', de: 0, v: { d: 70, s: 1, f: 26, t: '' }, m: [
    ['A 3 cm, las cargas opuestas se atraen con 36 mN.', { t: 'a 3 cm: 36 mN' }],
    ['Al triple de distancia, la fuerza se divide entre tres al cuadrado, nueve: queda en 4 mN.', { d: 210, f: 2.9, t: 'a 9 cm: 36 ÷ 9 = 4 mN' }, '$3^2 = 9 \\qquad 36 \\div 9 = 4$'],
    ['Duplicar una de las cargas duplica la fuerza: 8 mN.', { f: 5.8, t: 'carga doble: 8 mN' }, '$4 \\cdot 2 = 8$'],
  ], r: 'A 9 cm, 4 mN; con una carga doble, 8 mN. La distancia cuenta al cuadrado; la carga, de forma directa. Dividir 36 entre 3 es el error típico.' }],

  // ------------------------------------------------------------------------------------------- Ciencia, tecnología y sociedad
  'icf-cn-cts-1': [{ t: 'El salón vacunado', q: 'A un salón de 20 estudiantes llega uno con sarampión. Supón que cada día contagia a los compañeros que tiene al lado, si no están vacunados. ¿Qué pasa si nadie está vacunado? ¿Y si 17 lo están y solo el enfermo y otros dos, sentados lejos, no?', escena: 'dibujo', en: { dib: salon, alto: 206, v: { V: 0, w: 0, h: 0, t: '' } }, m: [
    ['Sin vacunas, el primer día el enfermo contagia a los cuatro que tiene al lado.', { w: 1, t: 'nadie vacunado: 5 enfermos' }],
    ['Al día siguiente, cada uno contagia a los suyos: ya son 12 de 20.', { w: 2, t: 'segundo día: 12 enfermos' }],
    ['Con 17 vacunados llega el mismo enfermo, pero sus vecinos no se contagian: el virus no tiene a quién pasar.', { V: 1, t: '17 vacunados: 1 enfermo' }],
    ['Los dos sin vacuna quedan a salvo porque los rodean vacunados. Eso es la inmunidad de rebaño.', { h: 1, t: 'los 2 sin vacuna, a salvo' }],
  ], r: 'Sin vacunas el contagio se riega por el salón; con 17 vacunados no pasa del primero y protege también a los que no se vacunaron. La vacuna cuida a quien la recibe y a los demás.' }],
  'icf-cn-cts-2': [{ t: 'El bombillo que se cambia', q: 'Un bombillo incandescente de 60 W y uno LED de 9 W dan la misma luz. Si cada uno se prende 5 horas al día durante 30 días, ¿cuánta energía gasta cada uno? Si producir cada kWh suelta 0.2 kg de CO₂, ¿cuánto CO₂ se evita al cambiarlo?', escena: 'dibujo', en: { dib: bombillos, alto: 194, v: { a: 0, b: 0, c: 0, t: '' } }, m: [
    ['El incandescente: 60 W por 5 horas por 30 días son 9 000 Wh, es decir, 9 kWh.', { a: 9 }, '$60 \\cdot 5 \\cdot 30 = 9\\,000$ Wh'],
    ['El LED da la misma luz con 9 W: 1 350 Wh, 1.35 kWh en el mes.', { b: 1.35 }, '$9 \\cdot 5 \\cdot 30 = 1\\,350$ Wh'],
    ['La diferencia, 7.65 kWh, es energía que ya no hay que producir.', { t: 'ahorro: 7.65 kWh al mes' }, '$9 - 1.35 = 7.65$'],
    ['Con 0.2 kg de CO₂ por kWh, son 1.8 kg contra 0.27 kg: se evitan 1.53 kg al mes por bombillo.', { c: 1, t: 'se evitan 1.53 kg de CO₂' }, '$7.65 \\cdot 0.2 = 1.53$'],
  ], r: 'El incandescente gasta 9 kWh y el LED 1.35 kWh; el cambio evita 1.53 kg de CO₂ al mes por bombillo. La energía más limpia es la que no se gasta.' }],
  'icf-cn-cts-3': H('La bebida para la memoria', 'Una empresa estudió su bebida para la memoria. ¿Qué conclusión permiten los datos?', [
    ['A 40 estudiantes, elegidos al azar, se les dio la bebida durante un mes:', '24 mejoraron en una prueba de memoria.'],
    ['A otros 40, también al azar, se les dio una bebida igual pero sin el ingrediente, sin que nadie supiera cuál tomaba:', '22 mejoraron.'],
    ['La empresa anunció:', '«Con nuestra bebida, el 60 % mejora su memoria».'],
  ], ['La bebida mejora la memoria del 60 % de las personas.', 'La diferencia es de 5 puntos y puede deberse al azar.', 'La bebida empeora la memoria.', 'El grupo de control no sirvió, porque también mejoró.'], [
    ['Con la bebida mejoraron 24 de 40: el 60 %.', { luz: [1], n: { 0: '60 %' } }],
    ['Sin el ingrediente mejoraron 22 de 40, el 55 %: muchos mejoran solo por repetir la prueba o por esperarlo.', { luz: [3], n: { 1: '55 %' } }],
    ['El anuncio usa el primer grupo y calla el control: eso descarta A.', { luz: [5], n: { 2: 'calla el control' }, x: ['A'] }],
    ['La diferencia es de 5 puntos: con 40 por grupo puede ser azar. No prueba que empeore, y el control sí sirvió: mostró cuánto se mejora sin el ingrediente.', { luz: ['B'], x: ['C', 'D'] }],
  ], 'B. El efecto de la bebida es la diferencia con el grupo de control, no el 60 %; y 5 puntos con grupos tan pequeños no alcanzan para concluir.'),
});
