// Preuniversitario · pu-gr-1 «Leer gráficas» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 10) / 10);
  // Barras con eje: vals, hi, paso.
  const Y0 = 172, H = 140;
  const barras = (v, K) => {
    const n = v.vals.length, w = 250 / n, Y = x => Y0 - x / v.hi * H; let h = '';
    for (let k = 0; k <= v.hi; k += v.st) h += K.l(60, Y(k), 320, Y(k), 'ls') + K.t(52, Y(k) + 4, k, 's tm', 'end');
    v.vals.forEach((x, i) => { h += K.r(66 + i * w + 8, Y(x), w - 16, Y0 - Y(x), i === v.on ? 'fA' : 'fa', 3) + K.t(66 + (i + 0.5) * w, Y0 + 17, v.rot[i], 's'); });
    return h + (v.lin != null ? K.l(60, Y(v.lin), 320, Y(v.lin), 'lg d') : '') + (v.nota ? K.t(190, 22, v.nota, 'tg') : '');
  };
  const cambio = (v, K) => { const Y = x => 170 - x * v.u; return K.l(40, 170, 300, 170, 'lm') + K.r(70, Y(v.a), 70, 170 - Y(v.a), 'fa') + K.r(200, Y(v.b), 70, 170 - Y(v.b), 'fg') + K.l(70, Y(v.a), 290, Y(v.a), 'lm d') + K.t(105, 188, `antes ${N(v.a)}`, 's') + K.t(235, 188, `ahora ${N(v.b)}`, 's') + K.f(v.f ?? 1, K.t(170, Y(Math.max(v.a, v.b)) - 12 < 14 ? 14 : Y(Math.max(v.a, v.b)) - 12, v.txt || '', 'tf')); };
  const COL = ['fa', 'fg', 'ff', 'fc'];
  const torta = (v, K) => { let a = 90, h = ''; v.p.forEach((x, i) => { const b = a - x * 3.6; h += K.sec(150, 104, 84, b, a, COL[i]); const m = K.at(150, 104, 56, (a + b) / 2); h += x > 7 ? K.t(m[0], m[1] + 5, v.r[i] ?? '', 's') : ''; a = b; }); return h + K.t(250, 40, v.t || '', 'tm', 'start'); };

  xpLec('pu-gr-1', [
    ['Leer el eje',
      xpMira('dibujo', 'Empecemos por la idea: antes de mirar las barras, mira **el eje**.', { dib: barras, v: { vals: [30, 60, 20, 40], hi: 70, st: 10, rot: ['ene', 'feb', 'mar', 'abr'], on: -1, nota: '' }, alto: 195 }, [
        ['Las ventas de cuatro meses. El eje de la izquierda va de 10 en 10.', {}],
        ['La barra de febrero llega hasta la línea del 60: se vendieron 60.', { on: 1, nota: '60' }],
        ['La de marzo llega a 20. Febrero superó a marzo por 40.', { on: 2, nota: '60 − 20 = 40' }, '$60 - 20 = 40$'],
        ['Para el total se suman todas: 30, 60, 20 y 40 son 150.', { on: -1, nota: '150' }, '$30 + 60 + 20 + 40 = 150$'],
        ['Fíjate siempre en cuánto vale cada línea: no siempre es de uno en uno.', { nota: '' }],
      ], 'Primero la escala del eje, luego la punta de cada barra.'),
      xpHaz('dibujo', 'Pasa la tabla a la gráfica: A = 15, B = 35, C = 25. Arrastra la punta de cada barra.', { dib: (v, K) => barras({ vals: [v.a, v.b, v.c], hi: 40, st: 10, rot: ['A', 'B', 'C'], on: -1 }, K), v: { a: 5, b: 5, c: 5 }, metas: { a: 15, b: 35, c: 25 }, alto: 195,
        manijas: ['a', 'b', 'c'].map((k, i) => ({ k, min: 0, max: 40, paso: 5, r: 10, en: v => [66 + (i + 0.5) * 250 / 3, Y0 - v[k] / 40 * H], de: (x, y) => (Y0 - y) / H * 40 })),
        lee: v => `$${v.a}, \\; ${v.b}, \\; ${v.c}$`, dice: () => 'El eje va de 10 en 10: el 15 queda a mitad entre 10 y 20.' }, 'Los números que no tienen línea van a mitad de camino.')],
    ['¿Cuánto cambió, en porcentaje?',
      xpMira('dibujo', 'Segunda idea: el cambio se compara con **lo que había antes**.', { dib: cambio, v: { a: 40, b: 40, u: 1.9, txt: '', f: 1 }, alto: 200 }, [
        ['Un negocio vendía 40.', {}],
        ['Ahora vende 60. Aumentó 20 unidades.', { b: 60, txt: '+20' }, '$60 - 40 = 20$'],
        ['20 es la mitad de 40: aumentó el 50 %.', { txt: '+50 %' }, '$\\tfrac{20}{40} = 50\\,\\%$'],
        ['Al revés, si de 60 baja a 40, pierde 20 de 60: la tercera parte.', { a: 60, b: 40, txt: '−33.3 %' }, '$\\tfrac{20}{60} \\approx 33.3\\,\\%$'],
        ['La misma diferencia, distinto porcentaje: depende de dónde se empieza.', {}],
      ], 'Variación porcentual = cambio ÷ valor de **antes**.'),
      xpHaz('dibujo', 'Antes se vendían 50. Arrastra la barra de ahora hasta que el aumento sea del 30 %.', { dib: cambio, v: { a: 50, b: 55, u: 1.6, f: 0 }, metas: { b: 65 }, alto: 200, manijas: [{ k: 'b', min: 10, max: 95, paso: 5, r: 11, en: v => [235, 170 - v.b * 1.6], de: (x, y) => (170 - y) / 1.6 }],
        lee: v => `$\\tfrac{${v.b} - 50}{50} = ${Math.round((v.b - 50) / 50 * 100)}\\,\\%$`, dice: v => (v.b >= 50 ? `Aumentó ${v.b - 50} sobre 50.` : `Bajó ${50 - v.b} sobre 50.`) }, 'El 30 % de 50 son 15: $50 + 15 = 65$.')],
    ['La torta',
      xpMira('dibujo', 'Tercera idea: en una gráfica circular, **toda la vuelta** es el 100 %.', { dib: torta, v: { p: [100, 0, 0], r: ['100 %', '', ''], t: '360°' }, alto: 205 }, [
        ['La torta completa es el 100 % y da toda la vuelta: 360°.', {}, '$100\\,\\% = 360^\\circ$'],
        ['La mitad es el 50 % y mide 180°.', { p: [50, 50, 0], r: ['50 %', '50 %', ''], t: '180°' }, '$50\\,\\% = 180^\\circ$'],
        ['Un cuarto es el 25 %: un ángulo recto, 90°.', { p: [25, 75, 0], r: ['25 %', '75 %', ''], t: '90°' }, '$25\\,\\% = 90^\\circ$'],
        ['Cada 1 % son 3.6°. El 40 % mide 40 por 3.6: 144°.', { p: [40, 60, 0], r: ['40 %', '60 %', ''], t: '144°' }, '$40 \\cdot 3.6^\\circ = 144^\\circ$'],
      ], 'El 100 % son 360°, así que cada 1 % son 3.6°.'),
      xpHaz('dibujo', 'De 150 personas, 45 prefieren el café. Abre el sector del café hasta su tamaño.', { dib: (v, K) => torta({ p: [v.g / 3.6, 100 - v.g / 3.6], r: ['café', ''], t: `${v.g}°` }, K), v: { g: 36 }, metas: { g: 108 }, alto: 205,
        manijas: [{ k: 'g', min: 18, max: 342, paso: 18, r: 10, en: v => XPK.at(150, 104, 84, 90 - v.g), de: (x, y, v) => { const g = ((90 - Math.atan2(104 - y, x - 150) * 180 / Math.PI) % 360 + 360) % 360; return Math.abs(g - v.g) > 180 ? (v.g > 180 ? 342 : 18) : g; } }],
        lee: v => `$${N(v.g / 3.6)}\\,\\% \\text{ de } 150 = ${N(v.g / 360 * 150)}$`, dice: v => `${v.g}° son el ${N(v.g / 3.6)} % de la vuelta.` }, '45 de 150 son el 30 %: $30 \\cdot 3.6^\\circ = 108^\\circ$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Las ventas fueron 10, 15, 21 y 28. Pon el aumento en porcentaje de cada tramo.', { slots: [0, 1, 2].map(i => ({ x: 80 + i * 90, y: 142, w: 76, et: ['10 → 15', '15 → 21', '21 → 28'][i] })), fichas: ['50 %', '40 %', '33 %', '5 %', '70 %'], meta: ['50 %', '40 %', '33 %'], alto: 190, fondo: K => K.pl([[60, 100], [140, 82], [220, 60], [300, 34]], 'la gr') + [[60, 100, 10], [140, 82, 15], [220, 60, 21], [300, 34, 28]].map(([x, y, t]) => K.c(x, y, 4, 'fA') + K.t(x, y - 10, t, 's')).join(''), pista: 'Divide cada aumento, 5, 6 y 7, entre el valor de antes.' }, '$\\tfrac{5}{10}$, $\\tfrac{6}{15}$ y $\\tfrac{7}{21}$: el último sube más unidades, pero el primero sube más en porcentaje.')],
  ], 'Mirar la escala, comparar con lo de antes y repartir los 360° de la torta.');
}
