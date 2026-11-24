// Preuniversitario · pu-gr-2 «Promedio, mediana y moda» (Explora). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Barras que se nivelan: t = 0 los datos, t = 1 todos en el promedio.
  const nivel = (v, K) => { const d = v.d, n = d.length, m = d.reduce((a, b) => a + b, 0) / n, u = 12, w = 220 / n; let h = K.l(40, 170, 300, 170, 'lm'); d.forEach((x, i) => { const y = x + (m - x) * v.t; h += K.r(60 + i * w + 5, 170 - y * u, w - 10, y * u, 'fa', 3) + K.t(60 + (i + 0.5) * w, 188, v.t > 0.98 ? N(m) : x, 's'); }); return h + K.f(v.l, K.l(50, 170 - m * u, 296, 170 - m * u, 'lg d') + K.t(300, 170 - m * u + 5, N(m), 'tg', 'start')); };
  const fila = (n, y = 84) => Array.from({ length: n }, (_, i) => ({ x: 170 + (i - (n - 1) / 2) * 60, y, w: 52 }));
  // Balanza: grupos de n personas sentadas en su valor, y el apoyo.
  const bal = (v, K) => { const X = x => 30 + x * 28, y = 130; let h = K.l(X(0), y, X(10), y, 'gr'); for (let k = 0; k <= 10; k++) h += K.l(X(k), y, X(k), y + 5, 'lm') + K.t(X(k), y + 20, k, 's tm'); v.g.forEach(([n, x], j) => { for (let i = 0; i < n; i++) h += K.c(X(x), y - 10 - i * 17, 8, j ? 'fG' : 'fA'); }); return h + K.f(v.a ?? 1, K.p([[X(v.x), y + 26], [X(v.x) - 14, y + 50], [X(v.x) + 14, y + 50]], 'fF')); };

  xpLec('pu-gr-2', [
    ['Promedio: nivelar',
      xpMira('dibujo', 'Empecemos por la idea: el promedio es **repartir por igual**.', { dib: nivel, v: { d: [2, 8, 5, 9], t: 0, l: 0 }, alto: 200 }, [
        ['Cuatro amigos tienen 2, 8, 5 y 9 láminas.', {}],
        ['Las juntan todas: son 24.', {}, '$2 + 8 + 5 + 9 = 24$'],
        ['Y las reparten por igual: a cada uno le tocan 6. Ese es el promedio.', { t: 1, l: 1 }, '$24 \\div 4 = 6$'],
        ['Lo que les sobra a unos llena lo que les falta a otros.', { t: 0 }],
        ['Nadie tenía 6: el promedio no tiene que ser uno de los datos.', {}],
      ], 'Promedio = suma de todos ÷ cuántos son. Es el nivel donde todo queda parejo.'),
      xpHaz('dibujo', 'Los datos son 5, 10, 6 y uno más. Súbelo hasta que el promedio sea 8.', { dib: (v, K) => nivel({ d: [5, 10, 6, v.x], t: 0, l: 1 }, K), v: { x: 1 }, metas: { x: 11 }, alto: 200, manijas: [{ k: 'x', min: 0, max: 13, paso: 1, r: 10, en: v => [60 + 3.5 * 55, 170 - v.x * 12], de: (x, y) => (170 - y) / 12 }],
        lee: v => `$\\tfrac{5 + 10 + 6 + ${v.x}}{4} = ${N((21 + v.x) / 4)}$`, dice: v => `La suma va en ${21 + v.x}. Para promedio 8 con 4 datos debe ser 32.` }, '$4 \\cdot 8 = 32$ y $32 - 21 = 11$.')],
    ['Mediana y moda',
      xpMira('fichas', 'Segunda idea: la **mediana** es el del medio y la **moda**, el más repetido.', { slots: fila(5), fichas: ['30', '3', '5', '3', '2'], alto: 122, fondo: (K, v) => K.t(170, 34, v.p || '', 'ta') }, [
        ['Cinco salarios. Para la mediana hay que ponerlos en orden.', { pon: { 0: '2', 1: '3', 2: '3', 3: '5', 4: '30' } }],
        ['La mediana es el del medio: dos a un lado y dos al otro. Es 3.', { marca: [2], v: { p: 'mediana 3' } }],
        ['La moda es el que más se repite: también 3.', { marca: [1, 2], v: { p: 'moda 3' } }],
        ['El promedio es 43 entre 5: 8.6. El 30 lo jala hacia arriba.', { marca: [4], v: { p: 'promedio 8.6' } }, '$43 \\div 5 = 8.6$'],
        ['Un dato exagerado mueve el promedio, pero casi no mueve la mediana.', { v: { p: 'promedio 8.6 · mediana 3' } }],
      ], 'Mediana: ordena y toma el del medio (con cantidad par, el promedio de los dos del medio). Moda: el más repetido.'),
      xpHaz('fichas', 'Los datos son 9, 3, 14, 3, 6 y 7. Pon el promedio, la mediana y la moda.', { slots: [{ x: 62, y: 58, w: 92, et: 'promedio' }, { x: 170, y: 58, w: 92, et: 'mediana' }, { x: 278, y: 58, w: 92, et: 'moda' }], fichas: ['7', '6.5', '3', '6', '14', '8.5'], meta: ['7', '6.5', '3'], alto: 106, pista: 'Ordena: 3, 3, 6, 7, 9, 14. Hay dos en el medio.' }, 'Suma 42 entre 6 es 7; en el medio están 6 y 7: 6.5; y el 3 se repite.')],
    ['No todos pesan igual',
      xpMira('dibujo', 'Tercera idea: si un grupo es más grande, **jala más** el promedio.', { dib: bal, v: { g: [[1, 2], [1, 10]], x: 6, a: 1 }, alto: 190 }, [
        ['Una persona con 2 y otra con 10. La tabla se equilibra en el centro: 6.', {}, '$\\tfrac{2 + 10}{2} = 6$'],
        ['Si en el 10 hay tres personas, el equilibrio se corre hacia ellas.', { g: [[1, 2], [3, 10]], x: 8 }],
        ['Cada una cuenta: 2 más tres veces 10 son 32, entre cuatro personas, 8.', {}, '$\\tfrac{2 + 3 \\cdot 10}{4} = 8$'],
        ['No es el promedio de 2 y 10: hay que multiplicar cada valor por cuántos lo tienen.', {}, '$8 \\neq 6$'],
      ], 'Promedio de grupos: (valor × cuántos) de cada grupo, sumado, entre el total de personas.'),
      xpHaz('dibujo', 'Un grupo de 1 persona sacó 3 y otro de 3 personas sacó 7. Mueve el apoyo al punto de equilibrio.', { dib: (v, K) => bal({ g: [[1, 3], [3, 7]], x: v.x }, K), v: { x: 4 }, metas: { x: 6 }, alto: 190, manijas: [{ k: 'x', min: 0, max: 10, paso: 0.5, r: 11, en: v => [30 + v.x * 28, 172], de: x => (x - 30) / 28 }],
        lee: () => '$\\tfrac{1 \\cdot 3 + 3 \\cdot 7}{4}$', dice: v => (v.x < 6 ? 'Todavía pesa más el lado del 7: córrelo hacia allá.' : v.x > 6 ? 'Te pasaste: ahora pesa más el lado del 3.' : 'En equilibrio.') }, '$\\tfrac{3 + 21}{4} = 6$, más cerca del grupo grande.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'El promedio de 5 números es 12. Se quita uno y el promedio de los que quedan es 11. Pon las dos sumas y el que se quitó.', { slots: [{ x: 62, y: 58, w: 92, et: 'suma de 5' }, { x: 170, y: 58, w: 92, et: 'suma de 4' }, { x: 278, y: 58, w: 92, et: 'se quitó' }], fichas: ['60', '44', '16', '1', '55', '48'], meta: ['60', '44', '16'], alto: 106, pista: 'Suma = promedio por cuántos son: 5 · 12 y 4 · 11.' }, '$60 - 44 = 16$.')],
  ], 'Nivelar, ordenar para hallar el del medio, contar repetidos y dejar que el grupo grande pese más.');
}
