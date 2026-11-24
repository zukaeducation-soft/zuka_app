// Preuniversitario · pu-op-2 «Anidados y ecuaciones» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Renglones de una cuenta que se van revelando.
  const pasos = (v, K) => K.t(170, 28, v.re, 'b tg') + v.l.map((t, i) => K.f(Math.max(0, Math.min(1, v.n - i)), K.t(170, 72 + i * 38, t, i === v.l.length - 1 ? 'B ta' : 'b'))).join('');
  // Balanza de una ecuación: izquierda y derecha en números.
  const bal = (K, izq, der, ti, td) => { const a = Math.max(-14, Math.min(14, (der - izq) * 1.2)), d = a; return K.l(80, 96 - d, 260, 96 + d, 'gr') + K.p([[170, 96], [156, 140], [184, 140]], 'fc') + K.r(44, 58 - d, 84, 36, 'fa', 8) + K.t(86, 81 - d, ti, '') + K.r(212, 58 + d, 84, 36, 'fg', 8) + K.t(254, 81 + d, td, ''); };

  xpLec('pu-op-2', [
    ['De adentro hacia afuera',
      xpMira('dibujo', 'Empecemos por la idea: si hay paréntesis, primero lo de **adentro**.', { dib: pasos, v: { re: 'a ⊕ b = a + 2b', l: ['(3 ⊕ 1) ⊕ 4', '5 ⊕ 4', '13'], n: 1 }, alto: 170 }, [
        ['Con esta receta queremos (3 ⊕ 1) ⊕ 4.', {}, '$a \\oplus b = a + 2b$'],
        ['Adentro: 3 más el doble de 1 son 5. El paréntesis se cambia por 5.', { n: 2 }, '$3 + 2 \\cdot 1 = 5$'],
        ['Ahora 5 ⊕ 4: 5 más 8, trece.', { n: 3 }, '$5 + 2 \\cdot 4 = 13$'],
        ['Si el paréntesis está al otro lado cambia: 1 ⊕ 4 son 9, y 3 ⊕ 9 son 21.', { l: ['3 ⊕ (1 ⊕ 4)', '3 ⊕ 9', '21'] }, '$3 + 2 \\cdot 9 = 21$'],
      ], 'Resuelve el paréntesis, ponlo como un solo número y sigue.'),
      xpHaz('fichas', 'Con $a \\oplus b = a + 2b$, calcula $(2 \\oplus 5) \\oplus 1$: primero lo de adentro y luego el final.', { slots: [{ x: 110, y: 56, w: 92, et: '2 ⊕ 5' }, { x: 230, y: 56, w: 92, et: 'resultado' }], fichas: ['12', '14', '9', '25', '7'], meta: ['12', '14'], alto: 104, pista: '2 más el doble de 5. Ese resultado es el nuevo primer número.' }, '$2 + 10 = 12$ y $12 + 2 = 14$.')],
    ['Cuando hay una x',
      xpMira('dibujo', 'Segunda idea: con una x se reemplaza igual, y queda una **ecuación**.', { dib: pasos, v: { re: 'a ⊕ b = a + 2b', l: ['x ⊕ 4 = 15', 'x + 8 = 15', 'x = 7'], n: 1 }, alto: 170 }, [
        ['¿Qué x cumple x ⊕ 4 = 15? Aquí x es el primero y 4 el segundo.', {}],
        ['Reemplazamos: x más el doble de 4.', { n: 2 }, '$x + 2 \\cdot 4 = 15$'],
        ['Quitamos 8 a los dos lados: x es 7.', { n: 3 }, '$x = 15 - 8 = 7$'],
        ['Comprobamos: 7 ⊕ 4 son 7 más 8, quince.', {}, '$7 + 8 = 15$'],
      ], 'Reemplaza, y resuelve la ecuación que queda. Al final, comprueba.'),
      xpHaz('dibujo', 'Con $a \\oplus b = a + 2b$, mueve la x hasta que $5 \\oplus x = 19$.', { dib: (v, K) => bal(K, 5 + 2 * v.x, 19, `5 + 2·${v.x}`, '19'), v: { x: 2 }, metas: { x: 7 }, alto: 205, manijas: [{ k: 'x', min: 0, max: 12, paso: 1, et: 'x' }],
        lee: v => `$5 + 2 \\cdot ${v.x} = ${5 + 2 * v.x}$`, dice: v => (5 + 2 * v.x < 19 ? 'Le falta peso a la izquierda.' : 5 + 2 * v.x > 19 ? 'La izquierda pesa de más.' : 'En equilibrio.') }, '$5 + 2x = 19$, así que $2x = 14$ y $x = 7$.')],
    ['Dos operaciones juntas',
      xpMira('dibujo', 'Tercera idea: con **dos símbolos**, cada uno usa su propia receta.', { dib: pasos, v: { re: 'a ⊕ b = a + 2b ; a ⊙ b = a · b − 1', l: ['(2 ⊙ 3) ⊕ 4', '5 ⊕ 4', '13'], n: 1 }, alto: 170 }, [
        ['Ahora hay dos recetas. Queremos (2 ⊙ 3) ⊕ 4.', {}],
        ['Adentro está ⊙: 2 por 3, menos 1, da 5.', { n: 2 }, '$2 \\cdot 3 - 1 = 5$'],
        ['Afuera está ⊕: 5 más el doble de 4, trece.', { n: 3 }, '$5 + 8 = 13$'],
        ['Escribe cada receta antes de empezar, para no mezclarlas.', {}],
      ], 'Cada símbolo, su receta; primero el de adentro.'),
      xpHaz('fichas', 'Con $a \\oplus b = a + 2b$ y $a \\odot b = a \\cdot b - 1$, calcula $(1 \\oplus 3) \\odot 2$.', { slots: [{ x: 110, y: 56, w: 92, et: '1 ⊕ 3' }, { x: 230, y: 56, w: 92, et: 'resultado' }], fichas: ['7', '13', '2', '11', '3'], meta: ['7', '13'], alto: 104, pista: 'Adentro: 1 más el doble de 3.' }, '$1 + 6 = 7$ y $7 \\cdot 2 - 1 = 13$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Con $a \\oplus b = a + 2b$, ¿qué número operado consigo mismo da 24? Mueve la x.', { dib: (v, K) => bal(K, 3 * v.x, 24, `${v.x} + 2·${v.x}`, '24'), v: { x: 2 }, metas: { x: 8 }, alto: 205, manijas: [{ k: 'x', min: 0, max: 12, paso: 1, et: 'x' }],
        lee: v => `$${v.x} \\oplus ${v.x} = ${v.x} + 2 \\cdot ${v.x} = ${3 * v.x}$`, dice: v => (3 * v.x < 24 ? 'Aún no llega a 24.' : 3 * v.x > 24 ? 'Se pasó de 24.' : 'En equilibrio.') }, '$x + 2x = 3x = 24$: $x = 8$.')],
  ], 'De adentro hacia afuera, reemplazar la x y no mezclar las recetas.');
}
