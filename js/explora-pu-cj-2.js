// Preuniversitario · pu-cj-2 «Encuestas» (Explora). Los ejemplos no son los de los ejercicios.
{
  const dos = (v, K) => K.r(16, 8, 308, 168, 'fc', 10) + K.c(130, 94, 66, 'fa') + K.c(210, 94, 66, 'fg') + K.t(62, 30, v.A, 's ta') + K.t(278, 30, v.B, 's tg') + K.t(102, 100, v.na ?? '', 'b') + K.t(170, 100, v.ni ?? '', 'b') + K.t(238, 100, v.nb ?? '', 'b') + K.t(52, 164, v.no ?? '', 'b tm') + (v.p ? K.t(170, 198, v.p, 'ta') : '');
  const C3 = [[135, 84], [205, 84], [170, 144]], tres = (v, K) => K.c(...C3[0], 62, 'fa') + K.c(...C3[1], 62, 'fg') + K.c(...C3[2], 62, 'ff') + K.t(70, 26, v.e?.[0] ?? 'A', 'ta') + K.t(270, 26, v.e?.[1] ?? 'B', 'tg') + K.t(250, 196, v.e?.[2] ?? 'C', 'tf') + [['abc', 170, 108], ['ab', 170, 70], ['ac', 132, 126], ['bc', 208, 126], ['a', 102, 74], ['b', 238, 74], ['c', 170, 176]].map(([k, x, y]) => K.t(x, y + 5, v[k] ?? '', 'b')).join('');
  // Dos barras sobre una de total T: la de B se corre y lo que se solapa es «los dos».
  const barras = (v, K) => { const u = 290 / v.M, a = v.a * u, b = v.b * u, xb = 24 + a - v.s * u; return K.t(24, 22, `${v.T - v.n} tienen alguno`, 's tm', 'start') + K.r(24, 30, (v.T - v.n) * u, 18, 'fc') + K.r(24 + (v.T - v.n) * u, 30, v.n * u, 18, 'fM') + K.r(24, 62, a, 32, 'fa') + K.t(30, 83, `A ${v.a}`, 's', 'start') + K.r(xb, 98, b, 32, 'fg') + K.t(xb + 6, 119, `B ${v.b}`, 's', 'start') + (v.s > 0 ? K.r(xb, 62, v.s * u, 68, 'ff d') + K.t(xb + v.s * u / 2, 150, `los dos ${Math.round(v.s)}`, 'tf') : '') + K.l(24 + (v.T - v.n) * u, 26, 24 + (v.T - v.n) * u, 134, 'lo d'); };

  xpLec('pu-cj-2', [
    ['Del centro hacia afuera',
      xpMira('dibujo', 'Empecemos por la idea: una encuesta se llena **desde el centro**.', { dib: dos, v: { A: 'música', B: 'cine', na: '', ni: '', nb: '', no: '', p: '50 personas' }, alto: 205 }, [
        ['De 50 personas, 28 oyen música, 20 van a cine y 9 hacen las dos cosas.', {}],
        ['Primero el centro: los 9 que hacen las dos.', { ni: '9' }],
        ['De los 28 de música, 9 ya están puestos. Solo música: 19.', { na: '19' }, '$28 - 9 = 19$'],
        ['De los 20 de cine, solo cine: 11.', { nb: '11' }, '$20 - 9 = 11$'],
        ['Adentro hay 39. De 50, afuera quedan 11 que no hacen ninguna.', { no: '11' }, '$50 - (19 + 9 + 11) = 11$'],
      ], 'Primero los que hacen las dos; luego se restan; al final, los de afuera.'),
      xpHaz('fichas', 'De 45 lectores, 24 leen novela, 19 leen poesía y 8 leen las dos. Llena el diagrama.', { slots: [{ x: 102, y: 94, w: 52 }, { x: 170, y: 94, w: 44 }, { x: 238, y: 94, w: 52 }, { x: 54, y: 156, w: 52, h: 34 }], fichas: ['16', '8', '11', '10', '24', '19', '2'], meta: ['16', '8', '11', '10'], alto: 186, fondo: K => dos({ A: 'novela', B: 'poesía' }, K), pista: 'El centro es 8. A cada grupo réstale esos 8.' }, 'Centro 8, solo novela 16, solo poesía 11 y afuera $45 - 35 = 10$.')],
    ['Cuando no dicen el centro',
      xpMira('dibujo', 'Segunda idea: si no dicen cuántos hacen las dos, **lo que sobra** los delata.', { dib: barras, v: { T: 32, M: 38, n: 3, a: 20, b: 17, s: 0 }, alto: 165 }, [
        ['De 32 personas, 20 tienen A, 17 tienen B y 3 no tienen ninguno.', {}],
        ['Con alguno hay 32 menos 3: veintinueve. Es la línea verde.', {}, '$32 - 3 = 29$'],
        ['Pero 20 más 17 son 37: la barra se pasa por 8.', {}, '$37 - 29 = 8$'],
        ['Esos 8 se contaron dos veces: se solapan las barras hasta la línea.', { s: 8 }],
        ['Ocho tienen los dos. Solo A: 12. Solo B: 9.', {}, '$12 + 8 + 9 = 29$'],
      ], 'Los dos = (A + B) − los que tienen alguno.'),
      xpHaz('dibujo', 'De 50 personas, 30 tienen A, 26 tienen B y 4 ninguno. Corre la barra B hasta que cuadre con la línea.', { dib: barras, v: { T: 50, M: 60, n: 4, a: 30, b: 26, s: 0 }, metas: { s: 10 }, alto: 165, manijas: [{ k: 's', min: 0, max: 20, paso: 1, r: 11, en: v => [24 + (v.a + v.b - v.s) * 290 / 60, 114], de: x => 56 - (x - 24) * 60 / 290 }],
        lee: v => `$30 + 26 - ${v.s} = ${56 - v.s}$`, dice: v => `Con alguno hay ${56 - v.s}. Deben ser 50 − 4 = 46.` }, '$56 - 46 = 10$ tienen los dos.')],
    ['Tres conjuntos',
      xpMira('dibujo', 'Tercera idea: con tres círculos es **lo mismo**: del centro hacia afuera.', { dib: tres, v: { e: ['inglés', 'francés', 'alemán'], abc: '', ab: '', ac: '', bc: '', a: '', b: '', c: '' }, alto: 212 }, [
        ['Los que estudian los tres idiomas son 3: van en el centro.', { abc: '3' }],
        ['Inglés y francés son 7 en total. Tres ya están en el centro: quedan 4.', { ab: '4' }, '$7 - 3 = 4$'],
        ['Inglés y alemán son 5: quedan 2. Francés y alemán son 4: queda 1.', { ac: '2', bc: '1' }, '$5 - 3 = 2 \\quad 4 - 3 = 1$'],
        ['Inglés son 15. Ya hay 3, 4 y 2 adentro: solo inglés, 6.', { a: '6' }, '$15 - 9 = 6$'],
        ['Francés son 13 en total: quedan 5. Alemán son 10: quedan 4.', { b: '5', c: '4' }],
      ], 'Centro, luego las parejas (restando el centro) y al final los que hacen una sola.'),
      xpHaz('fichas', 'En A y B hay 5, en A y C 6, en B y C 4 (contando los 2 que están en los tres) y en A 15. Llena las zonas vacías.', { slots: [{ x: 170, y: 64, w: 40, h: 36 }, { x: 126, y: 130, w: 40, h: 36 }, { x: 214, y: 130, w: 40, h: 36 }, { x: 98, y: 72, w: 42, h: 36 }], fichas: ['3', '4', '2', '6', '5', '9'], meta: ['3', '4', '2', '6'], alto: 212, fondo: K => tres({ abc: '2' }, K), pista: 'A cada pareja réstale los 2 del centro.' }, '$5 - 2 = 3$, $6 - 2 = 4$, $4 - 2 = 2$ y $15 - 2 - 3 - 4 = 6$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'En una oficina de 36 todos toman té o café: 20 té y 22 café. Pon los que toman los dos, solo té y solo café.', { slots: [{ x: 66, y: 58, w: 88, et: 'los dos' }, { x: 170, y: 58, w: 88, et: 'solo té' }, { x: 274, y: 58, w: 88, et: 'solo café' }], fichas: ['6', '14', '16', '20', '22', '8'], meta: ['6', '14', '16'], alto: 106, pista: '20 + 22 son 42, y solo hay 36 personas.' }, '$42 - 36 = 6$; solo té 14 y solo café 16.')],
  ], 'Del centro hacia afuera, y lo que sobra al sumar es lo que está en los dos.');
}
