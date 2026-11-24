// Preuniversitario · pu-pr-4 «Porcentajes» (Explora, escena «dibujo»: la doble barra). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Doble barra: abajo el porcentaje (0–100 a lo largo de v.L píxeles), arriba la cantidad (total v.T).
  const doble = (v, K) => {
    const L = v.L ?? 290, x = 25 + v.p / 100 * L, q = v.q ?? v.p * v.T / 100;
    return K.r(25, 56, L, 40, 'fc') + K.r(25, 56, x - 25, 40, 'fa') + [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(k => K.l(25 + k / 100 * L, 96, 25 + k / 100 * L, k % 50 ? 101 : 106, 'lm')).join('')
      + K.t(25, 121, '0 %', 's tm') + K.t(25 + L, 121, '100 %', 's tm') + (v.p > 12 && v.p < 86 ? K.t(x, 121, v.ocp ? '? %' : `${N(v.p)} %`, 'ta') : '') + K.t(25, 46, '0', 's tm') + (v.p < 86 ? K.t(25 + L, 46, v.ocT ? '?' : N(v.T), 's tm') : '') + K.t(x, 46, v.ocq ? '?' : N(q), 'tg');
  };

  xpLec('pu-pr-4', [
    ['El tanto por ciento de algo',
      xpMira('dibujo', 'Empecemos por la idea: una barra con **dos reglas**, la cantidad arriba y el porcentaje abajo.', { dib: doble, v: { p: 100, T: 60, L: 290 }, alto: 140 }, [
        ['La barra entera son 60 estudiantes: el 100 %.', {}, '$100\\,\\% = 60$'],
        ['La mitad es el 50 %: 30 estudiantes.', { p: 50 }, '$50\\,\\% = 30$'],
        ['El 10 % es la décima parte: 6. Es la pieza que más sirve.', { p: 10 }, '$10\\,\\% = 6$'],
        ['El 30 % son tres piezas del 10 %: 18.', { p: 30 }, '$3 \\cdot 6 = 18$'],
        ['Y el 35 % son 18 más media pieza, 3: son 21. Es igual a 0.35 por 60.', { p: 35 }, '$0.35 \\cdot 60 = 21$'],
      ], 'El p % de N es $\\tfrac{p}{100} \\cdot N$. A mano, ármalo con piezas del 10 %, del 5 % y del 1 %.'),
      xpHaz('dibujo', 'Un viaje es de 80 km y ya va el 65 %. Arrastra hasta los kilómetros recorridos.', { dib: (v, K) => doble({ ...v, p: v.q / 0.8 }, K), v: { q: 8, T: 80, L: 290 }, metas: { q: 52 }, alto: 140, manijas: [{ k: 'q', min: 0, max: 80, paso: 4, en: v => [25 + v.q / 80 * 290, 76], de: x => (x - 25) / 290 * 80, r: 11 }],
        lee: v => `$10\\,\\% = 8 \\qquad \\tfrac{${v.q}}{80} = ${N(v.q / 0.8)}\\,\\%$`, dice: v => `${v.q} km de 80 son el ${N(v.q / 0.8)} %.` }, 'Seis piezas de 8 son 48, y media pieza más, 4: 52 km.')],
    ['¿Qué porcentaje es?',
      xpMira('dibujo', 'Segunda idea: para saber **qué porcentaje** es, compara la parte con el total.', { dib: doble, v: { p: 40, T: 25, q: 10, ocp: 1, L: 290 }, alto: 140 }, [
        ['De 25 penaltis, un arquero tapó 10. ¿Qué porcentaje es?', {}],
        ['La fracción es 10 de 25, dos quintos.', {}, '$\\tfrac{10}{25} = \\tfrac25$'],
        ['Si 25 fueran 100, se multiplicaría por 4. Los 10 también: 40.', {}, '$\\tfrac{10}{25} = \\tfrac{40}{100}$'],
        ['Es el 40 %. La cuenta corta: parte entre total, por 100.', { ocp: 0 }, '$\\tfrac{10}{25} \\cdot 100 = 40$'],
        ['Cuidado: si divides 25 entre 10 sale 2.5. La parte va arriba y el total abajo.', {}, '$\\tfrac{\\text{parte}}{\\text{total}}$'],
      ], 'Qué porcentaje es A de B: $\\tfrac{A}{B} \\cdot 100$. El total siempre va abajo.'),
      xpHaz('dibujo', 'De 40 libros, 14 son novelas. Arrastra el porcentaje hasta que coincida con 14.', { dib: doble, v: { p: 10, T: 40, L: 290 }, metas: { p: 35 }, alto: 140, manijas: [{ k: 'p', min: 0, max: 100, paso: 5, en: v => [25 + v.p * 2.9, 76], de: x => (x - 25) / 2.9, r: 11 }],
        lee: v => `$${v.p}\\,\\% \\text{ de } 40 = ${N(v.p * 0.4)}$`, dice: v => `El ${v.p} % de 40 libros son ${N(v.p * 0.4)}.` }, '$\\tfrac{14}{40} \\cdot 100 = 35$: son el 35 %.')],
    ['Al revés: hallar el total',
      xpMira('dibujo', 'Tercera idea: si se conoce la parte, se **sube** hasta el 100 %.', { dib: doble, v: { p: 30, T: 70, q: 21, ocT: 1, L: 290 }, alto: 140 }, [
        ['El 30 % de una caja son 21 naranjas. ¿Cuántas hay en total?', {}],
        ['Bajamos a la pieza del 10 %: la tercera parte de 21, que es 7.', { p: 10, q: 7 }, '$21 \\div 3 = 7$'],
        ['Y subimos al 100 %: diez piezas de 7 son 70.', { p: 100, q: 70, ocT: 0 }, '$10 \\cdot 7 = 70$'],
        ['No se le saca el 30 % a 21: esa es la parte, no el total.', { p: 30, q: 21 }, '$\\tfrac{21}{0.30} = 70$'],
      ], 'Para volver al total: divide hasta el 10 % o el 1 % y sube al 100 %.'),
      xpHaz('dibujo', 'Veintisiete jugadores son el 45 % de un club. Estira el total hasta que el 45 % sean 27.', { dib: (v, K) => { const L = v.T * 3.4; return doble({ ...v, p: 45, L }, K); }, v: { T: 32 }, metas: { T: 60 }, alto: 140, manijas: [{ k: 'T', min: 20, max: 80, paso: 4, en: v => [25 + v.T * 3.4, 76], de: x => (x - 25) / 3.4, r: 11 }],
        lee: v => `$45\\,\\% \\text{ de } ${v.T} = ${N(0.45 * v.T)}$`, dice: v => `Si el club tuviera ${v.T}, el 45 % serían ${N(0.45 * v.T)}.` }, 'El 5 % son 3 jugadores; el 100 %, veinte veces eso: 60.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'En un colegio de 250 personas, el 40 % toma bus. De ellas, el 30 % vive fuera de la ciudad. Completa.', { slots: [{ x: 70, y: 72, w: 92, et: 'toman bus' }, { x: 170, y: 72, w: 92, et: 'viven afuera' }, { x: 270, y: 72, w: 92, et: '% del colegio' }], fichas: ['100', '75', '30', '12 %', '70 %'], meta: ['100', '30', '12 %'], alto: 122, fondo: K => K.r(25, 16, 290, 20, 'fc') + K.r(25, 16, 116, 20, 'fa') + K.r(25, 16, 35, 20, 'fg'), pista: 'El 30 % se saca de los que toman bus, no de los 250.' }, 'El 40 % de 250 son 100; el 30 % de esos 100 son 30, y 30 de 250 son el 12 %.')],
  ], 'La parte, el porcentaje y el total: tres preguntas sobre la misma barra de dos reglas.');
}
