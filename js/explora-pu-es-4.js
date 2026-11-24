// Preuniversitario · pu-es-4 «Giros, espejos y dobleces» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Espejo: figura F en cuadritos y su reflejo a distancia de un eje vertical.
  const F = [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2], [1, 2], [0, 3], [0, 4]];
  const espejo = (v, K) => {
    const u = 22, ax = 170, y = 40, x = (c, s) => ax + s * (1.4 + 2 - c) * u;
    return K.l(ax, 22, ax, 170, 'lg d') + F.map(([c, r]) => K.r(x(c, -1) - u, y + r * u, u - 2, u - 2, 'fa')).join('') + K.f(v.r, F.map(([c, r]) => K.r(x(c, 1), y + r * u, u - 2, u - 2, 'fg')).join(''))
      + K.f(v.d, K.l(x(1, -1) - u / 2, y + 2 * u + 10, x(1, 1) + u / 2, y + 2 * u + 10, 'lf d') + K.t(ax, 188, 'la misma distancia', 's tf'));
  };
  // Giro de una F alrededor de su centro; g en grados, sentido del reloj.
  const giro = (v, K) => {
    const u = 26, G = [[0, 0], [1, 0], [2, 0], [0, 1], [0, 2], [1, 2], [0, 3], [0, 4]], cx = 170, cy = 105, a = v.g * Math.PI / 180;
    const R = (x, y) => [cx + x * Math.cos(a) - y * Math.sin(a), cy + x * Math.sin(a) + y * Math.cos(a)];
    const cel = (c, r, f) => { const x = (c - 1) * u - u / 2, y = (r - 2) * u - u / 2; return [[x, y], [x + u - 2, y], [x + u - 2, y + u - 2], [x, y + u - 2]].map(f); };
    return K.c(cx, cy, 92, 'fn d') + G.map(([c, r]) => K.p(cel(c, r, ([x, y]) => [cx + x, cy + y]), 'fc')).join('') + G.map(([c, r]) => K.p(cel(c, r, ([x, y]) => R(x, y)), 'fa')).join('') + K.c(cx, cy, 4, 'fk') + K.l(cx, cy, cx + 92 * Math.sin(a), cy - 92 * Math.cos(a), 'la');
  };
  // Papel doblado d veces (0..n) con un hueco; abierto = se ven los huecos.
  const papel = (v, K) => {
    const d = Math.round(v.d), x = 40, y = 40, S = 120, w = S / 2 ** Math.ceil(d / 2), h = S / 2 ** Math.floor(d / 2);
    const c = 2 ** Math.ceil(d / 2), r = 2 ** Math.floor(d / 2);
    let A = ''; const W = S / c, HH = S / r, rad = Math.max(1.6, Math.min(W, HH) * 0.13), np = v.np || 1;
    for (let i = 0; i < c; i++) for (let j = 0; j < r; j++) for (let k = 0; k < np; k++) { const fx = (k + 1) / (np + 1); A += K.c(190 + (i + (i % 2 ? 1 - fx : fx)) * W, y + (j + 0.5) * HH, rad, 'fF'); }
    let B = ''; for (let k = 0; k < np; k++) B += K.c(x + w * (k + 1) / (np + 1), y + h / 2, Math.max(2, rad), 'fF');
    return K.t(100, 24, 'doblado', 's tm') + K.r(x, y, S, S, 'fn d', 2) + K.r(x, y, w, h, 'fa', 2) + B + K.t(250, 24, 'abierto', 's tm') + K.r(190, y, S, S, 'fa', 2) + K.f(v.ab ?? 1, Array.from({ length: c - 1 }, (_, i) => K.l(190 + (i + 1) * W, y, 190 + (i + 1) * W, y + S, 'ls')).join('') + Array.from({ length: r - 1 }, (_, i) => K.l(190, y + (i + 1) * HH, 310, y + (i + 1) * HH, 'ls')).join('') + A) + K.t(100, 180, `${2 ** d} ${d ? 'capas' : 'capa'}`, 'ta');
  };
  const reloj = (K, cx, cy, r, h, cls) => { let s = K.c(cx, cy, r, 'fc'); for (let i = 0; i < 12; i++) { const p = K.at(cx, cy, r - 6, 90 - i * 30), q = K.at(cx, cy, r, 90 - i * 30); s += K.l(...p, ...q, 'lm'); } const m = K.at(cx, cy, r - 12, 90), t = K.at(cx, cy, r * 0.55, 90 - h * 30); return s + K.l(cx, cy, ...m, 'lm') + K.l(cx, cy, ...t, `${cls} gr`) + K.c(cx, cy, 3, 'fk'); };
  // Reflejo hacia abajo: 8 filas × 6 columnas; las 4 de arriba están dadas.
  const DADAS = [6, 7, 8, 12, 18, 19, 20], dados = Object.fromEntries(DADAS.map(i => [i, 1]));
  const meta = DADAS.map(i => (7 - Math.floor(i / 6)) * 6 + i % 6);

  xpLec('pu-es-4', [
    ['El espejo',
      xpMira('dibujo', 'Empecemos por la idea: un espejo deja cada punto a la **misma distancia**, al otro lado.', { dib: espejo, v: { r: 0, d: 0 }, alto: 200 }, [
        ['Una F frente a un espejo vertical: la línea punteada.', {}],
        ['Su reflejo queda volteado: lo que estaba cerca del espejo sigue cerca.', { r: 1 }],
        ['Cada cuadrito y su reflejo están en el mismo renglón y a la misma distancia del espejo.', { d: 1 }],
        ['Un espejo vertical cambia izquierda por derecha, pero no arriba por abajo.', {}],
        ['Por eso letras como A, M y O se ven iguales, y la F no.', { d: 0 }],
      ], 'Reflejar: mismo renglón y misma distancia al espejo, del otro lado.'),
      xpHaz('rejilla', 'El espejo está en la línea horizontal, como un lago. Pinta el reflejo de la figura.', { f: 8, c: 6, cw: 32, ch: 24, dados, meta, sobre: (K, g) => K.l(g.x(0) - 8, g.y(4), g.x(6) + 8, g.y(4), 'lg gr'), dice: c => `${c.filter((x, i) => x && !dados[i]).length} de ${meta.length}. La fila pegada a la línea se refleja pegada a la línea.` }, 'Cada cuadrito baja a la misma distancia de la línea, en su misma columna.')],
    ['Los giros',
      xpMira('dibujo', 'Segunda idea: al **girar**, la figura no se voltea: da vueltas completa.', { dib: giro, v: { g: 0 }, alto: 212 }, [
        ['La misma F, con un punto fijo en el centro.', {}],
        ['Un cuarto de vuelta en el sentido del reloj: 90°. Queda acostada.', { g: 90 }, '$90^\\circ$'],
        ['Media vuelta: 180°. Queda de cabeza.', { g: 180 }, '$180^\\circ$'],
        ['Tres cuartos, 270°, es lo mismo que un cuarto hacia el otro lado.', { g: 270 }, '$270^\\circ = -90^\\circ$'],
        ['Y con cuatro cuartos vuelve al principio. Ningún giro da el reflejo del espejo.', { g: 360 }, '$360^\\circ$'],
      ], 'Girar da vueltas; reflejar voltea. 270° a un lado es 90° al otro.'),
      xpHaz('dibujo', 'Deja la F como queda tras **cinco** cuartos de vuelta en el sentido del reloj. Gírala por la manija.', { dib: giro, v: { g: 0 }, cumple: v => v.g % 360 === 90, sol: { g: 90 }, alto: 212,
        manijas: [{ k: 'g', min: 0, max: 450, paso: 90, r: 11, en: v => [170 + 92 * Math.sin(v.g * Math.PI / 180), 105 - 92 * Math.cos(v.g * Math.PI / 180)], de: (x, y, v) => { const g = Math.atan2(x - 170, 105 - y) * 180 / Math.PI; return v.g + (((g - v.g) % 360) + 540) % 360 - 180; } }],
        lee: v => `$${v.g}^\\circ$`, dice: v => `${v.g / 90} ${v.g === 90 ? 'cuarto' : 'cuartos'} de vuelta. Cuatro cuartos no cambian nada.` }, 'Cinco cuartos son una vuelta completa y un cuarto más: queda igual que con 90°.')],
    ['Doblar y perforar',
      xpMira('dibujo', 'Tercera idea: cada doblez **duplica** las capas.', { dib: papel, v: { d: 0, ab: 0 }, alto: 195 }, [
        ['Una hoja sin doblar: una capa. Si se perfora, queda un hueco.', { ab: 1 }, '$1$'],
        ['Se dobla una vez por la mitad: dos capas. El mismo golpe deja dos huecos.', { d: 1 }, '$2$'],
        ['Dos dobleces: cuatro capas y cuatro huecos.', { d: 2 }, '$2 \\cdot 2 = 4$'],
        ['Tres dobleces: ocho. Cada doblez multiplica por 2.', { d: 3 }, '$2^3 = 8$'],
        ['Los huecos quedan en espejo a cada lado de cada doblez.', {}],
      ], 'Con d dobleces hay $2^d$ capas: cada perforación deja $2^d$ huecos.'),
      xpHaz('dibujo', 'Se hacen **dos** perforaciones en la hoja doblada y al abrirla hay 16 huecos. ¿Cuántos dobleces tenía?', { dib: papel, v: { d: 0, np: 2, ab: 1 }, metas: { d: 3 }, alto: 245, manijas: [{ k: 'd', min: 0, max: 5, paso: 1, et: 'dobleces' }],
        lee: v => `$2 \\cdot 2^{${v.d}} = ${2 * 2 ** v.d}$`, dice: v => `${2 ** v.d} ${v.d ? 'capas' : 'capa'} por 2 perforaciones: ${2 * 2 ** v.d} huecos.` }, '$16 = 2 \\cdot 8$: ocho capas, tres dobleces.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'En un espejo, un reloj de agujas sin números parece marcar las 10 en punto. Mueve la aguja corta del reloj real.', { dib: (v, K) => reloj(K, 90, 100, 66, 10, 'lg') + reloj(K, 250, 100, 66, v.h, 'la') + K.l(170, 24, 170, 176, 'lm d') + K.t(90, 188, 'en el espejo', 's tg') + K.t(250, 188, 'real', 's ta'), v: { h: 6 }, metas: { h: 2 }, alto: 200,
        manijas: [{ k: 'h', min: 0, max: 11, paso: 1, r: 10, en: v => XPK.at(250, 100, 38, 90 - v.h * 30), de: (x, y) => ((90 - Math.atan2(100 - y, x - 250) * 180 / Math.PI + 360) % 360) / 30 % 11.5 }],
        lee: v => `$${v.h || 12}\\!:\\!00$`, dice: () => 'El espejo cambia izquierda por derecha: la aguja a un lado del 12 se ve al otro.' }, 'La aguja real está igual de lejos del 12, al otro lado: son las 2. Juntas suman 12.')],
  ], 'El espejo voltea a la misma distancia, el giro da vueltas y cada doblez duplica las capas.');
}
