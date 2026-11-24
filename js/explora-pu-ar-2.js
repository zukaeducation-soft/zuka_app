// Preuniversitario · pu-ar-2 «Promedios» (Explora). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Rectángulo n × promedio: su área es la suma. Con un dato nuevo x al lado.
  const rect = (v, K) => {
    const u = v.u ?? 9, w = 34, x0 = 60, y = 178; let h = K.l(40, y, 320, y, 'lm');
    h += K.r(x0, y - v.m * u, v.n * w, v.m * u, 'fa', 3); for (let i = 1; i < v.n; i++) h += K.l(x0 + i * w, y, x0 + i * w, y - v.m * u, 'lr');
    h += K.t(x0 - 8, y - v.m * u / 2 + 5, N(v.m), 'ta', 'end') + K.t(x0 + v.n * w / 2, y + 17, `${Math.round(v.n)} datos`, 's tm');
    if (v.x != null && v.f > 0.01) h += K.f(v.f, K.r(x0 + v.n * w + 6, y - v.x * u, w, v.x * u, 'fg', 3) + K.t(x0 + v.n * w + 23, y + 17, N(v.x), 's tg'));
    return h + K.f(v.l ?? 0, K.l(50, y - (v.p ?? 0) * u, 316, y - (v.p ?? 0) * u, 'lf d') + K.t(318, y - (v.p ?? 0) * u - 6, N(v.p ?? 0), 'tf', 'end'));
  };
  // Pesos en porcentaje: tramos de una barra con su nota.
  const pesos = (v, K) => { let x = 24, h = ''; v.w.forEach((w, i) => { const L = w * 2.92; h += K.r(x, 66, L, 40, ['fa', 'fg', 'ff'][i], 5) + K.t(x + L / 2, 91, v.nt[i], 'b') + K.t(x + L / 2, 124, `${w} %`, 's tm') + K.f(v.a, K.t(x + L / 2, 152, v.ap[i], 'ta')); x += L; }); return h + K.t(170, 40, v.t || '', 'b ta'); };

  xpLec('pu-ar-2', [
    ['La suma escondida',
      xpMira('dibujo', 'Empecemos por la idea: todo promedio **esconde una suma**.', { dib: rect, v: { n: 4, m: 7, x: 0, f: 0, l: 0, p: 0 }, alto: 200 }, [
        ['Cuatro números promedian 7. No sabemos cuáles son.', {}],
        ['Pero es como si los cuatro midieran 7: un rectángulo de 4 por 7.', {}, '$4 \\cdot 7 = 28$'],
        ['Su suma es 28, sean los que sean. Esa es la llave de casi todo.', {}, '$\\text{suma} = n \\cdot \\text{promedio}$'],
        ['Seis números que promedian 12 suman 72.', { n: 6, m: 12 }, '$6 \\cdot 12 = 72$'],
      ], 'Suma = cuántos son × promedio. Con la suma se resuelven los problemas de promedios.'),
      xpHaz('dibujo', 'Seis datos suman 54. Arrastra el nivel hasta su promedio.', { dib: rect, v: { n: 6, m: 5, f: 0 }, metas: { m: 9 }, alto: 200, manijas: [{ k: 'm', min: 1, max: 16, paso: 1, r: 11, en: v => [162, 178 - v.m * 9], de: (x, y) => (178 - y) / 9 }],
        lee: v => `$6 \\cdot ${v.m} = ${6 * v.m}$`, dice: v => `Seis datos de ${v.m} suman ${6 * v.m}.` }, '$54 \\div 6 = 9$.')],
    ['Entra uno, sale uno',
      xpMira('dibujo', 'Segunda idea: si entra o sale un dato, **cambia la suma**.', { dib: rect, v: { n: 4, m: 7, x: 12, f: 0, l: 0, p: 7 }, alto: 200 }, [
        ['Cuatro números promedian 7: suman 28.', {}, '$4 \\cdot 7 = 28$'],
        ['Entra un 12. Ahora son cinco y suman 40.', { f: 1 }, '$28 + 12 = 40$'],
        ['El promedio nuevo es 40 entre 5: ocho.', { l: 1, p: 8 }, '$40 \\div 5 = 8$'],
        ['El 12 tenía 5 de más sobre el 7, y se repartieron entre los cinco: subió 1.', {}, '$12 - 7 = 5 \\quad 5 \\div 5 = 1$'],
        ['Si el que entra es igual al promedio, no cambia nada.', { x: 7, p: 7 }],
      ], 'Suma vieja ± el dato = suma nueva; divide entre la cantidad nueva.'),
      xpHaz('dibujo', 'Tres datos promedian 10. Entra otro y el promedio sube a 12. Ajusta el dato que entró.', { dib: (v, K) => rect({ n: 3, m: 10, x: v.x, f: 1, l: 1, p: (30 + v.x) / 4, u: 7 }, K), v: { x: 8 }, metas: { x: 18 }, alto: 200, manijas: [{ k: 'x', min: 0, max: 22, paso: 1, r: 11, en: v => [185, 178 - v.x * 7], de: (x, y) => (178 - y) / 7 }],
        lee: v => `$\\tfrac{30 + ${v.x}}{4} = ${N((30 + v.x) / 4)}$`, dice: v => `La suma va en ${30 + v.x}. Cuatro datos de 12 suman 48.` }, '$48 - 30 = 18$.')],
    ['Notas con peso',
      xpMira('dibujo', 'Tercera idea: si las notas **no pesan igual**, cada una aporta según su porcentaje.', { dib: pesos, v: { w: [30, 70], nt: ['5.0', '3.0'], ap: ['1.5', '2.1'], a: 0, t: '' }, alto: 168 }, [
        ['Un trabajo vale el 30 % y se sacó 5.0. El examen vale el 70 % y se sacó 3.0.', {}],
        ['El trabajo aporta el 30 % de 5: 1.5. El examen, el 70 % de 3: 2.1.', { a: 1 }, '$0.3 \\cdot 5 = 1.5 \\quad 0.7 \\cdot 3 = 2.1$'],
        ['La definitiva es la suma de los aportes: 3.6.', { t: '3.6' }, '$1.5 + 2.1 = 3.6$'],
        ['No es 4.0, el promedio simple: el examen pesa más y jala hacia abajo.', {}, '$3.6 \\neq 4.0$'],
      ], 'Promedio ponderado: suma de nota × peso, con los pesos en decimales.'),
      xpHaz('fichas', 'Un taller vale el 25 % con nota 4.0 y el final el 75 % con nota 3.2. Pon cada aporte y la definitiva.', { slots: [{ x: 62, y: 58, w: 92, et: 'taller' }, { x: 170, y: 58, w: 92, et: 'final' }, { x: 278, y: 58, w: 92, et: 'definitiva' }], fichas: ['1.0', '2.4', '3.4', '3.6', '0.8', '3.0'], meta: ['1.0', '2.4', '3.4'], alto: 106, pista: 'La cuarta parte de 4.0 y las tres cuartas partes de 3.2.' }, '$0.25 \\cdot 4 = 1.0$, $0.75 \\cdot 3.2 = 2.4$ y juntas 3.4.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Ocho hombres pesan en promedio 70 kg y dos mujeres, 55 kg. Pon la suma de ellos, la de ellas y el promedio de los diez.', { slots: [{ x: 62, y: 58, w: 92, et: 'ellos' }, { x: 170, y: 58, w: 92, et: 'ellas' }, { x: 278, y: 58, w: 92, et: 'promedio' }], fichas: ['560', '110', '67', '62.5', '670', '65'], meta: ['560', '110', '67'], alto: 106, pista: 'Diez personas pesan 560 + 110.' }, '$\\tfrac{560 + 110}{10} = 67$ kg, no 62.5.')],
  ], 'La suma escondida, lo que entra y lo que sale, y los pesos de cada nota.');
}
