// Preuniversitario · pu-ge-3 «Semejanza y escala» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Dos rectángulos: el modelo w0 × h0 y la copia w × h (u píxeles por unidad).
  const foto = (v, K) => {
    const u = 19, x = 108, y = 190, w = v.w * u, h = v.h * u, cara = (X, Y, W, H) => K.c(X + W * 0.5, Y + H * 0.42, 1, 'sn fM') + `<ellipse class="xf fg" cx="${X + W / 2}" cy="${Y + H / 2}" rx="${W * 0.2}" ry="${H * 0.32}"/>`;
    return K.r(12, y - 3 * u, 4 * u, 3 * u, 'fc') + cara(12, y - 3 * u, 4 * u, 3 * u) + K.t(12 + 2 * u, y + 18, '4', 'tm') + K.t(12 + 2 * u, y - 3 * u - 8, 'modelo', 's tm')
      + K.r(x, y - h, w, h, 'fa') + cara(x, y - h, w, h) + K.t(x + w / 2, y + 18, N(v.w), 'ta') + K.t(x - 8, y - h / 2 + 5, N(v.h), 'tg', 'end') + K.t(20, y - 3 * u / 2 + 5, '3', 'tm');
  };
  // Sombras: objeto de altura h y sombra s; vara de referencia de altura h0 y sombra s0.
  const som = (v, K) => {
    const u = v.u ?? 16, y = 180, x1 = 30, x2 = 120, ray = (x, h, s, c) => K.l(x, y - h * u, x + s * u, y, `${c} d`);
    return K.l(10, y, 330, y, 'lm') + K.l(x1, y, x1, y - v.h0 * u, 'gr la') + K.l(x1, y + 3, x1 + v.s0 * u, y + 3, 'gr lm') + K.f(v.ray ?? 1, ray(x1, v.h0, v.s0, 'lg')) + K.t(x1 - 9, y - v.h0 * u - 4, N(v.h0), 'ta') + K.t(x1 + v.s0 * u / 2, y + 20, N(v.s0), 'tm')
      + K.f(v.obj ?? 1, K.l(x2, y, x2, y - v.h * u, 'gr lf') + K.l(x2, y + 3, x2 + v.s * u, y + 3, 'gr lm') + (v.paralelo ? ray(x2, v.h, v.h * v.s0 / v.h0, 'lg') : ray(x2, v.h, v.s, 'lg')) + K.t(x2 - 14, y - v.h * u + 5, v.lh ?? N(v.h), 'tf', 'end') + K.t(x2 + v.s * u / 2, y + 20, N(v.s), 'tm'));
  };
  const cubo = (v, K) => {
    const k = Math.max(1, Math.round(v.k));
    if (v.m > 1.5) return K.caja([170, 195], 92 / Math.max(k, 2), k, k, k, 'fa');
    if (v.m > 0.5) { const u = 150 / Math.max(k, 3); let h = ''; for (let i = 0; i < k; i++) for (let j = 0; j < k; j++) h += K.r(170 - k * u / 2 + i * u + 1, 185 - (j + 1) * u, u - 2, u - 2, 'fa'); return h; }
    const u = 250 / Math.max(k, 3); let h = ''; for (let i = 0; i < k; i++) h += K.l(45 + i * u + 3, 110, 45 + (i + 1) * u - 3, 110, 'la gr'); return h;
  };

  xpLec('pu-ge-3', [
    ['La misma forma',
      xpMira('dibujo', 'Empecemos por la idea: ser **semejante** es tener la misma forma en otro tamaño.', { dib: foto, v: { w: 4, h: 3 }, alto: 215 }, [
        ['Una foto de 4 por 3 y su copia. Todavía son iguales.', {}],
        ['Si solo se estira el ancho, la cara se deforma: ya no es la misma forma.', { w: 8 }],
        ['Para que no se deforme, el alto debe crecer igual: si el ancho se duplicó, el alto también.', { h: 6 }, '$\\tfrac84 = \\tfrac63 = 2$'],
        ['Ese 2 es la razón de semejanza. Es el mismo para todos los lados.', {}, '$k = 2$'],
        ['También sirve para achicar: todo por un medio da 2 por 1.5.', { w: 2, h: 1.5 }, '$\\tfrac24 = \\tfrac{1.5}{3} = \\tfrac12$'],
      ], 'Dos figuras son semejantes si tienen los mismos ángulos y todos los lados se multiplican por el **mismo** número, la razón.'),
      xpHaz('dibujo', 'Estira la foto de 4 por 3 hasta que tenga 10 de ancho, sin deformarla.', { dib: foto, v: { w: 5, h: 2 }, alto: 215, metas: { w: 10, h: 7.5 },
        manijas: [{ k: ['w', 'h'], min: [1, 1], max: [11, 8.5], paso: [0.5, 0.5], r: 10, en: v => [108 + v.w * 19, 190 - v.h * 19], de: (x, y) => [(x - 108) / 19, (190 - y) / 19] }],
        lee: v => `$\\tfrac{${v.w}}{4} = ${N(v.w / 4)} \\qquad \\tfrac{${v.h}}{3} = ${N(v.h / 3)}$`, dice: v => (Math.abs(v.w / 4 - v.h / 3) < 0.01 ? 'Las dos razones coinciden: no hay deformación.' : 'Las dos razones deben ser iguales.') }, 'La razón es 2.5: $4 \\cdot 2.5 = 10$ y $3 \\cdot 2.5 = 7.5$.')],
    ['Sombras y Tales',
      xpMira('dibujo', 'Segunda idea: a la misma hora, las **sombras** forman triángulos semejantes.', { dib: som, v: { h0: 2, s0: 3, h: 6, s: 9, ray: 1, obj: 0, u: 19 }, alto: 210 }, [
        ['Una vara de 2 m da una sombra de 3 m. El rayo de sol cierra un triángulo.', {}],
        ['Al lado hay un árbol con 9 m de sombra. El sol llega inclinado igual.', { obj: 1, lh: '?' }],
        ['Los rayos son paralelos: los triángulos tienen la misma forma. La sombra es 3 veces la otra.', {}, '$\\tfrac{9}{3} = 3$'],
        ['Entonces la altura también es 3 veces la de la vara: 6 m.', { lh: '6' }, '$2 \\cdot 3 = 6$'],
        ['Eso es el teorema de Tales: rectas paralelas cortan segmentos proporcionales.', {}, '$\\tfrac{2}{3} = \\tfrac{6}{9}$'],
      ], 'Con los rayos paralelos, altura y sombra guardan la misma razón en todos los objetos.'),
      xpHaz('dibujo', 'Una estaca de 1 m da 1.5 m de sombra y un poste da 9 m. Sube el poste hasta que su rayo caiga donde acaba su sombra.', { dib: som, v: { h0: 1, s0: 1.5, h: 2, s: 9, paralelo: 1, u: 21 }, metas: { h: 6 }, alto: 210,
        manijas: [{ k: 'h', min: 1, max: 8, paso: 0.5, en: v => [120, 180 - v.h * 21], de: (x, y) => (180 - y) / 21, r: 10 }],
        lee: v => `$\\tfrac{1}{1.5} = \\tfrac{${v.h}}{${N(v.h * 1.5)}}$`, dice: v => `Un poste de ${N(v.h)} m daría ${N(v.h * 1.5)} m de sombra.` }, 'La sombra es 6 veces la de la estaca: el poste mide 6 m.')],
    ['Largo, área y volumen',
      xpMira('dibujo', 'Tercera idea: al agrandar, el **área** y el **volumen** crecen más que el largo.', { dib: cubo, v: { k: 1, m: 0 }, alto: 205 }, [
        ['Un segmento se duplica: ahora mide 2 veces lo de antes.', { k: 2 }, '$\\text{largo: } \\times 2$'],
        ['Pero un cuadrado con el lado doble tiene 4 cuadritos: crece a lo ancho y a lo alto.', { m: 1 }, '$\\text{área: } \\times 4 \\quad (2^2 = 4)$'],
        ['Y un cubo con la arista doble tiene 8 cubitos: crece en tres direcciones.', { m: 2 }, '$\\text{volumen: } \\times 8 \\quad (2^3 = 8)$'],
        ['Con el lado cuatro veces más largo: 16 cuadritos.', { m: 1, k: 4 }, '$4^2 = 16$'],
        ['Y 64 cubitos. El error típico es multiplicar también el área y el volumen por 4.', { m: 2 }, '$4^3 = 64$'],
      ], 'Si los largos se multiplican por k, las áreas por $k^2$ y los volúmenes por $k^3$.'),
      xpHaz('dibujo', 'Un afiche cuadrado se agrandó y ahora gasta 25 veces el papel de antes. ¿Por cuánto se multiplicó su lado?', { dib: (v, K) => cubo({ ...v, m: 1 }, K), v: { k: 1 }, metas: { k: 5 }, alto: 255, manijas: [{ k: 'k', min: 1, max: 8, paso: 1, et: 'lado × ' }],
        lee: v => `$\\text{área: } \\times ${v.k * v.k} \\quad (${v.k}^2 = ${v.k * v.k})$`, dice: v => `Lado por ${v.k}: caben ${v.k * v.k} ${v.k === 1 ? 'afiche' : 'afiches'} de los de antes.` }, '$5^2 = 25$: el lado se multiplicó por 5, no por 25.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'En un plano a escala 1 : 50, una pared mide 6 cm. Estira la pared real hasta su largo verdadero, en metros.', {
        dib: (v, K) => K.t(170, 24, 'plano: 1 cm → 50 cm = 0.5 m', 'tm') + K.r(50, 46, 120, 16, 'fg') + K.t(182, 60, '6 cm', 'tg', 'start') + K.r(40, 104, v.m * 52, 34, 'fa') + [1, 2, 3, 4, 5].map(i => K.l(40 + i * 52, 138, 40 + i * 52, 146, 'lm') + K.t(40 + i * 52, 161, `${i}`, 's tm')).join('') + K.t(316, 161, 'm', 's tm'),
        v: { m: 0.5 }, metas: { m: 3 }, alto: 175, manijas: [{ k: 'm', min: 0.5, max: 5, paso: 0.5, en: v => [40 + v.m * 52, 121], de: x => (x - 40) / 52 }],
        lee: v => `$${N(v.m)} \\text{ m} = ${N(v.m * 100)} \\text{ cm} = 50 \\cdot ${N(v.m * 2)}$`, dice: v => `${N(v.m)} m reales caben en ${N(v.m * 2)} cm del plano.` }, '$6 \\cdot 50 = 300$ cm: la pared mide 3 m.')],
  ], 'La misma razón en todos los lados, sombras proporcionales, y áreas que crecen con $k^2$ y volúmenes con $k^3$.');
}
