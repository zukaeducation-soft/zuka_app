// Preuniversitario · pu-pr-1 «Razones, repartos y escalas» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Vasos: a de un color y b de otro, en grupos.
  const vasos = (v, K) => {
    const A = Math.round(v.a), B = Math.round(v.b), col = v.col ?? 10; let h = '';
    const pone = (n, y, cls) => { let s = ''; for (let i = 0; i < n; i++) { const r = Math.floor(i / col), c = i % col; s += K.p([[46 + c * 28, y + r * 34], [68 + c * 28, y + r * 34], [65 + c * 28, y + 26 + r * 34], [49 + c * 28, y + 26 + r * 34]], cls); } return s; };
    h += pone(A, 28, 'fa') + pone(B, 110, 'fg');
    return h + K.t(24, 46, A, 'b ta') + K.t(24, 128, B, 'b') + K.t(46, 20, v.ea ?? 'de jugo', 's tm', 'start') + K.t(46, 102, v.eb ?? 'de agua', 's tm', 'start');
  };
  // Barra partida en partes iguales, con grupos de colores.
  const C = ['fa', 'fg', 'ff'];
  const barra = (v, K) => {
    const r = v.r, n = r.reduce((x, y) => x + y, 0), w = 300 / n; let h = '', k = 0;
    r.forEach((g, i) => { for (let j = 0; j < g; j++, k++) h += K.r(20 + k * w + 1, 60, w - 2, 44, C[i]); });
    h += K.f(v.val, Array.from({ length: n }, (_, i) => K.t(20 + (i + 0.5) * w, 87, N(v.T / n), 's')).join(''));
    k = 0; r.forEach((g, i) => { h += K.f(v.tot, K.t(20 + (k + g / 2) * w, 126, N(g * v.T / n), ['ta', 'tg', 'tf'][i])); k += g; });
    return h + K.t(170, 34, `${v.T} en total`, 'tm');
  };
  const corte = (v, K) => {
    const x = 20 + v.c / 84 * 300;
    return K.r(20, 60, x - 20, 44, 'fa') + K.r(x, 60, 320 - x, 44, 'fg') + Array.from({ length: 6 }, (_, i) => K.l(20 + (i + 1) * 300 / 7, 60, 20 + (i + 1) * 300 / 7, 104, 'ls')).join('') + K.t(20 + (x - 20) / 2, 130, N(v.c), 'ta') + K.t((x + 320) / 2, 130, N(84 - v.c), 'tg') + K.t(170, 36, '84 horas', 'tm');
  };
  const mapa = (v, K) => {
    let h = K.r(20, 20, 300, 64, 'fc') + K.c(40, 60, 5, 'fF') + K.c(40 + v.cm * 34, 60, 5, 'fF') + K.l(40, 60, 40 + v.cm * 34, 60, 'lf d') + K.t(40 + v.cm * 17, 48, `${N(v.cm)} cm`, 'tf') + K.t(30, 34, 'mapa', 's tm', 'start');
    h += K.f(v.real, K.ar(170, 92, 170, 114, 'lm') + K.t(184, 109, `× ${v.esc}`, 'ta', 'start') + K.t(170, 144, v.txt || '', 'b ta'));
    return h;
  };
  const regla = (v, K) => K.t(170, 24, 'mapa: 7 cm · escala 1 : 20 000', 'tm') + K.r(50, 38, 7 * 24, 14, 'ff') + K.r(40, 96, v.km * 125, 30, 'fa') + [0.4, 0.8, 1.2, 1.6, 2].map(k => K.l(40 + k * 125, 126, 40 + k * 125, 134, 'lm') + K.t(40 + k * 125, 149, k, 's tm')).join('') + K.t(316, 149, 'km', 's tm');

  xpLec('pu-pr-1', [
    ['Tantos por cada tantos',
      xpMira('dibujo', 'Empecemos por la idea: una **razón** dice tantos de esto por cada tantos de aquello.', { dib: vasos, v: { a: 2, b: 3, col: 10 }, alto: 190 }, [
        ['Dos vasos de jugo por cada tres de agua: la razón es 2 a 3.', {}, '$2 : 3$'],
        ['Si hacemos el doble, 4 de jugo y 6 de agua. Sabe igual: la razón no cambió.', { a: 4, b: 6 }, '$\\tfrac{2}{3} = \\tfrac{4}{6}$'],
        ['Con el triple, 6 y 9. Los dos se multiplican por el mismo número.', { a: 6, b: 9 }, '$\\tfrac{2}{3} = \\tfrac{6}{9}$'],
        ['Volvamos a 2 y 3. Si a cada uno le sumamos 1, queda 3 y 4: sabe distinto.', { a: 3, b: 4 }, '$\\tfrac{2}{3} \\neq \\tfrac{3}{4}$'],
        ['Para saber si dos razones son iguales, multiplica en cruz: 2 por 9 y 3 por 6, 18 y 18.', { a: 6, b: 9 }, '$2 \\cdot 9 = 3 \\cdot 6$'],
      ], 'Dos razones iguales forman una proporción: se multiplica (o divide) por lo mismo, y los productos en cruz coinciden.'),
      xpHaz('dibujo', 'Un tono lleva 2 tarros de azul por cada 5 de blanco. Hay 20 de blanco: ajusta los de azul.', { dib: vasos, v: { a: 2, b: 20, col: 10, ea: 'azul', eb: 'blanco' }, metas: { a: 8 }, alto: 240, manijas: [{ k: 'a', min: 1, max: 12, paso: 1, et: '' }],
        lee: v => `$\\tfrac{2}{5} \\; \\tfrac{${v.a}}{20} \\qquad 2 \\cdot 20 = 40 \\quad 5 \\cdot ${v.a} = ${5 * v.a}$`, dice: v => (5 * v.a === 40 ? 'Los productos en cruz coinciden.' : 'Los productos en cruz aún no coinciden.') }, 'De 5 a 20 es por 4: también $2 \\cdot 4 = 8$ de azul.')],
    ['Repartir por partes',
      xpMira('dibujo', 'Segunda idea: repartir en una razón es partir en **partes iguales** y darlas.', { dib: barra, v: { r: [1, 2, 3], T: 48, val: 0, tot: 0 }, alto: 150 }, [
        ['Repartimos 48 dulces entre tres niños en razón 1, 2 y 3.', {}],
        ['En total son 1 más 2 más 3: seis partes iguales.', {}, '$1 + 2 + 3 = 6$'],
        ['Cada parte vale 48 entre 6: 8 dulces.', { val: 1 }, '$48 \\div 6 = 8$'],
        ['Ahora se entregan: 1 parte son 8, 2 partes son 16 y 3 partes son 24.', { tot: 1 }, '$8 + 16 + 24 = 48$'],
        ['No se divide 48 entre 3: a cada uno le toca según sus partes.', {}],
      ], 'Suma las partes, divide el total entre ellas y multiplica por las de cada uno.'),
      xpHaz('dibujo', 'Dos personas se reparten 84 horas de trabajo en razón 3 : 4. Arrastra el corte.', { dib: corte, v: { c: 72 }, metas: { c: 36 }, alto: 150, manijas: [{ k: 'c', min: 12, max: 72, paso: 4, en: v => [20 + v.c / 84 * 300, 82], de: x => (x - 20) / 300 * 84, r: 11 }],
        lee: v => `$\\tfrac{${v.c}}{${84 - v.c}} \\qquad 84 \\div 7 = 12$`, dice: v => `La primera hace ${v.c} y la otra ${84 - v.c}.` }, 'Son 7 partes de 12 horas: $3 \\cdot 12 = 36$ y $4 \\cdot 12 = 48$.')],
    ['Escalas',
      xpMira('dibujo', 'Tercera idea: una **escala** es una razón entre el mapa y la realidad.', { dib: mapa, v: { cm: 1, real: 0, esc: '50 000', txt: '' }, alto: 165 }, [
        ['Escala 1 : 50 000 quiere decir: 1 cm del mapa son 50 000 cm de verdad.', {}, '$1 : 50\\,000$'],
        ['50 000 cm son 500 m, porque cada metro tiene 100 cm.', { real: 1, txt: '50 000 cm = 500 m' }, '$50\\,000 \\div 100 = 500$'],
        ['Si en el mapa hay 6 cm, son 6 veces 500 m: 3 000 m.', { cm: 6, txt: '6 · 500 m = 3 000 m' }, '$6 \\cdot 500 = 3\\,000$'],
        ['Y 3 000 m son 3 km. Las dos medidas de la escala van en la misma unidad.', { txt: '3 km' }, '$3\\,000 \\text{ m} = 3 \\text{ km}$'],
      ], 'Escala 1 : N: lo real es N veces lo del mapa, en la misma unidad. Luego se cambia de unidad.'),
      xpHaz('dibujo', 'En un mapa 1 : 20 000, dos colegios están a 7 cm. Estira la barra hasta la distancia real.', { dib: regla, v: { km: 0.2 }, metas: { km: 1.4 }, alto: 165, manijas: [{ k: 'km', min: 0.1, max: 2.2, paso: 0.1, en: v => [40 + v.km * 125, 111], de: x => (x - 40) / 125, r: 11 }],
        lee: v => `$${N(v.km)} \\text{ km} = ${N(v.km * 1000)} \\text{ m} = ${N(v.km * 5)} \\cdot 200 \\text{ m}$`, dice: v => `Cada centímetro son 200 m: esta barra son ${N(v.km * 5)} cm del mapa.` }, '1 cm son 200 m: $7 \\cdot 200 = 1\\,400$ m, o sea 1.4 km.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una mezcla de 640 g lleva maní, almendras y pasas en razón 4 : 1 : 3. Pon los gramos de cada una.', {
        fondo: K => [4, 1, 3].map((g, i) => Array.from({ length: g }, (_, j) => K.r(30 + ([0, 4, 5][i] + j) * 35 + 1, 24, 33, 26, C[i])).join('')).join(''),
        slots: [{ x: 70, y: 100, w: 84, et: 'maní' }, { x: 170, y: 100, w: 84, et: 'almendras' }, { x: 270, y: 100, w: 84, et: 'pasas' }], fichas: ['80', '160', '240', '320', '213'], meta: ['320', '80', '240'], alto: 150, pista: 'Son 8 partes iguales. ¿Cuánto pesa cada una?' }, '8 partes de 80 g: $4 \\cdot 80 = 320$, $80$ y $3 \\cdot 80 = 240$.')],
  ], 'Razones que se agrandan por igual, repartos por partes y escalas que son una razón.');
}
