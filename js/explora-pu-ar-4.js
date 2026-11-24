// Preuniversitario · pu-ar-4 «Máximos y mínimos» (Explora). Los ejemplos no son los de los ejercicios.
{
  const CL = ['fF', 'fG', 'fA', 'fM', 'fk'];
  // Bolas que salen en el peor orden: lista de colores; se ven las primeras n.
  const bolas = (v, K) => { let h = ''; const L = v.l, n = Math.round(v.n); for (let i = 0; i < n; i++) h += K.c(40 + (i % 8) * 37, 60 + Math.floor(i / 8) * 40, 14, CL[L[i]]); return h + K.t(170, 28, v.t || '', 'b ta'); };
  const rect = (v, K) => { const u = v.u ?? 14, w = v.a * u, h = (v.S - v.a) * u; return K.r(170 - w / 2, 190 - h, w, h, 'fa', 3) + K.t(170, 208, K.sig(v.a), 'ta') + K.t(170 - w / 2 - 8, 194 - h / 2, K.sig(v.S - v.a), 'tg', 'end') + K.t(170, 194 - h / 2, K.sig(v.a * (v.S - v.a)), 'b'); };
  const torres = (v, K) => v.d.map((n, i) => { const x = 40 + i * 56; let h = ''; const u = Math.min(16, 130 / Math.max(...v.d)); for (let j = 0; j < n; j++) h += K.r(x, 160 - (j + 1) * u, 36, u - 2, i === v.d.length - 1 ? 'fg' : 'fa', 2); return h + K.t(x + 18, 178, n, ''); }).join('') + K.t(170, 20, v.t || '', 'b ta');
  // Cajas de 8 con sus libros.
  const cajas = (v, K) => { let h = '', q = 43; for (let i = 0; i < v.n; i++) { const x = 30 + (i % 4) * 74, y = 26 + Math.floor(i / 4) * 66; h += K.r(x, y, 62, 50, 'fc', 6); for (let j = 0; j < 8 && q > 0; j++, q--) h += K.r(x + 5 + (j % 4) * 13.5, y + 5 + Math.floor(j / 4) * 22, 11, 18, 'fa', 2); } return h + K.t(170, 168, q > 0 ? `quedan ${q} por fuera` : 'todos guardados', q > 0 ? 'tf' : 'to'); };

  xpLec('pu-ar-4', [
    ['El peor caso',
      xpMira('dibujo', 'Empecemos por la idea: «estar **seguro**» es aguantar la peor suerte.', { dib: bolas, v: { l: [0, 1, 2, 3, 4, 4], n: 0, t: '' }, alto: 130 }, [
        ['Un cajón con medias de 5 colores, muchas de cada uno. ¿Cuántas sacar para tener **seguro** un par?', {}],
        ['Con dos podría salir un par de una vez. Pero eso sería suerte.', { n: 2, l: [0, 0, 1, 2, 3, 3] }],
        ['La peor suerte: las cinco primeras salen todas distintas.', { n: 5, l: [0, 1, 2, 3, 4, 4], t: '5 y ningún par' }],
        ['La sexta repite algún color, sea el que sea. Con 6 es seguro.', { n: 6, t: '6: par seguro' }, '$5 + 1 = 6$'],
      ], 'Imagina la peor suerte posible y suma 1.'),
      xpHaz('dibujo', 'En una urna hay 4 bolas naranjas, 6 amarillas y 3 verdes. Saca bolas en el peor orden hasta tener **seguro** 2 verdes.', { dib: bolas, v: { l: [1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 2, 2, 2], n: 2 }, metas: { n: 12 }, alto: 200, manijas: [{ k: 'n', min: 0, max: 13, paso: 1, et: 'bolas sacadas' }],
        lee: v => `$6 + 4 = 10 ${v.n > 10 ? ` \\quad ${v.n} - 10 = ${v.n - 10}` : ''}$`, dice: v => `${v.n} sacadas: ${Math.max(0, v.n - 10)} ${v.n === 11 ? 'verde' : 'verdes'} en el peor caso.` }, 'Pueden salir antes las 10 que no son verdes: $10 + 2 = 12$.')],
    ['El producto más grande',
      xpMira('dibujo', 'Segunda idea: con la misma cerca, gana **el cuadrado**.', { dib: rect, v: { a: 1, S: 8, u: 19 }, alto: 218 }, [
        ['Con 16 m de cerca, largo y ancho suman 8. Si mide 1 por 7, el área es 7.', {}, '$1 \\cdot 7 = 7$'],
        ['Con 2 por 6 ya son 12.', { a: 2 }, '$2 \\cdot 6 = 12$'],
        ['Con 3 por 5 son quince.', { a: 3 }, '$3 \\cdot 5 = 15$'],
        ['Con 4 por 4 llega a 16: lo máximo. Es el cuadrado.', { a: 4 }, '$4 \\cdot 4 = 16$'],
        ['Más allá vuelve a bajar: 6 por 2 son 12.', { a: 6 }, '$6 \\cdot 2 = 12$'],
      ], 'Si la suma es fija, el producto es mayor cuando los dos números son iguales.'),
      xpHaz('dibujo', 'Con 28 m de cerca, ajusta el ancho hasta el corral de mayor área.', { dib: rect, v: { a: 2, S: 14, u: 11.5 }, metas: { a: 7 }, alto: 265, manijas: [{ k: 'a', min: 1, max: 13, paso: 1, et: 'ancho' }],
        lee: v => `$${v.a} \\cdot ${14 - v.a} = ${v.a * (14 - v.a)}$`, dice: v => `Los lados suman 14: ${v.a} y ${14 - v.a}.` }, 'Largo y ancho suman 14: 7 por 7, 49 m².')],
    ['Repartos extremos',
      xpMira('dibujo', 'Tercera idea: para que **uno** reciba lo más posible, los demás reciben lo mínimo.', { dib: torres, v: { d: [1, 3, 4, 7], t: '' }, alto: 190 }, [
        ['Se reparten 15 monedas entre 4 amigos. Todos reciben algo y cantidades distintas.', { t: '15 monedas' }],
        ['¿Cuánto puede recibir, como mucho, uno? Los otros deben recibir lo menos posible.', {}],
        ['Lo menos, sin repetir: 1, 2 y 3. Suman 6.', { d: [1, 2, 3, 0] }, '$1 + 2 + 3 = 6$'],
        ['El resto es para el último: 9 monedas.', { d: [1, 2, 3, 9] }, '$15 - 6 = 9$'],
        ['Para el mínimo del que más recibe, se reparte lo más parejo posible.', { d: [2, 3, 4, 6] }, '$2 + 3 + 4 + 6 = 15$'],
      ], 'Máximo de uno: los demás al mínimo. Mínimo del mayor: todos lo más parejo posible.'),
      xpHaz('fichas', 'Se reparten 25 dulces entre 5 niños, todos con algo y cantidades distintas. Pon los cuatro mínimos, su suma y lo máximo que recibe uno.', { slots: [0, 1, 2, 3].map(i => ({ x: 36 + i * 54, y: 58, w: 48, et: i ? '' : 'mínimos' })).concat([{ x: 258, y: 58, w: 56, et: 'suma' }, { x: 314, y: 58, w: 48, et: 'máximo' }]), fichas: ['1', '2', '3', '4', '10', '15', '5', '21'], cumple: q => [0, 1, 2, 3].map(i => q[i][0]).sort().join('') === '1234' && q[4][0] === '10' && q[5][0] === '15', sol: ['1', '2', '3', '4', '10', '15'], alto: 106, pista: 'Lo menos posible sin repetir: 1, 2, 3 y 4.' }, '$1 + 2 + 3 + 4 = 10$ y $25 - 10 = 15$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Hay 43 libros y en cada caja caben 8. ¿Cuál es la **menor** cantidad de cajas que sirve?', { dib: cajas, v: { n: 2 }, metas: { n: 6 }, alto: 225, manijas: [{ k: 'n', min: 1, max: 8, paso: 1, et: 'cajas' }],
        lee: v => `$8 \\cdot ${v.n} = ${8 * v.n}$`, dice: v => (8 * v.n < 43 ? `Faltan ${43 - 8 * v.n} libros por guardar.` : v.n > 6 ? 'Sobran cajas enteras: con menos también cabían.' : 'Caben todos, y con una caja menos no.') }, '$5 \\cdot 8 = 40$ no alcanza; con 6 cajas sí, aunque la última no se llene.')],
  ], 'La peor suerte más uno, el cuadrado para el producto, y los demás al mínimo.');
}
