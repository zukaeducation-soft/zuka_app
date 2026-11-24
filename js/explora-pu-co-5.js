// Preuniversitario · pu-co-5 «Contar figuras y caminos» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Cuadrícula f × c con un cuadrado de lado s resaltado que se puede correr.
  const cuad = (v, K) => {
    const u = 40, x = 170 - v.c * u / 2, y = 20, s = Math.round(v.s); let h = '';
    for (let i = 0; i < v.f; i++) for (let j = 0; j < v.c; j++) h += K.r(x + j * u, y + i * u, u, u, 'fc', 0);
    return h + K.f(v.ver ?? 1, K.r(x + v.px * u + 2, y + v.py * u + 2, s * u - 4, s * u - 4, 'fa gr', 4)) + K.t(170, y + v.f * u + 22, v.p || '', 'ta');
  };
  const diag = (v, K) => {
    const n = Math.round(v.n), P = Array.from({ length: n }, (_, i) => K.at(170, 100, 84, 90 + i * 360 / n)); let h = '';
    for (let i = 0; i < n; i++) for (let j = i + 2; j < n; j++) if (!(i === 0 && j === n - 1)) h += K.f(i === 0 ? v.una : v.todas, K.l(...P[i], ...P[j], i === 0 ? 'la' : 'lg'));
    return h + K.p(P, 'fn') + P.map((p, i) => K.c(...p, i ? 4 : 6, i ? 'fk' : 'fA')).join('');
  };
  // Esquinas de una cuadrícula de calles con el número de caminos.
  const X = i => 76 + i * 62, Y = j => 176 - j * 48, calles = (a, b) => K => { let h = ''; for (let i = 0; i <= a; i++) h += K.l(X(i), Y(0), X(i), Y(b), 'lm'); for (let j = 0; j <= b; j++) h += K.l(X(0), Y(j), X(a), Y(j), 'lm'); return h; };
  const esq = (a, b) => { const s = []; for (let j = 0; j <= b; j++) for (let i = 0; i <= a; i++) s.push({ x: X(i), y: Y(j), w: 42, h: 34 }); return s; };

  xpLec('pu-co-5', [
    ['Contar por tamaños',
      xpMira('dibujo', 'Empecemos por la idea: las figuras se cuentan **por tamaños**, para no olvidar ninguna.', { dib: cuad, v: { f: 3, c: 3, s: 1, px: 0, py: 0, ver: 0, p: '' }, alto: 175 }, [
        ['En una cuadrícula de 3 por 3 hay más cuadrados de los que se ven.', {}],
        ['Los pequeños, de lado 1: nueve.', { ver: 1, px: 2, py: 2, p: 'lado 1: 9' }, '$9$'],
        ['Los de lado 2: la esquina puede estar en 2 lugares a lo ancho y 2 a lo alto. Son cuatro.', { s: 2, px: 1, py: 1, p: 'lado 2: 4' }, '$2 \\cdot 2 = 4$'],
        ['Y el grande, de lado 3: uno.', { s: 3, px: 0, py: 0, p: 'lado 3: 1' }, '$1$'],
        ['En total 9 más 4 más 1: catorce.', {}, '$9 + 4 + 1 = 14$'],
        ['Con triángulos pegados en abanico es igual: los de un pedazo, los de dos, los de tres…', {}],
      ], 'Cuenta por tamaños: para cada uno, en cuántos lugares cabe. Luego suma.'),
      xpHaz('fichas', 'Una cuadrícula de 2 filas por 4 columnas: ¿cuántos cuadrados hay de cada tamaño?', { slots: [{ x: 66, y: 140, w: 84, et: 'lado 1' }, { x: 170, y: 140, w: 84, et: 'lado 2' }, { x: 274, y: 140, w: 84, et: 'en total' }], fichas: ['8', '3', '11', '4', '2', '12'], meta: ['8', '3', '11'], alto: 186, fondo: K => { let h = ''; for (let i = 0; i < 2; i++) for (let j = 0; j < 4; j++) h += K.r(94 + j * 38, 18 + i * 38, 38, 38, 'fc', 0); return h; }, pista: 'Un cuadrado de lado 2 ocupa las dos filas: solo se corre a lo ancho.' }, 'Lado 1: 8. Lado 2: cabe en 3 lugares. Total 11.')],
    ['Diagonales y parejas',
      xpMira('dibujo', 'Segunda idea: cada diagonal es una **pareja** de vértices que no son vecinos.', { dib: diag, v: { n: 6, una: 0, todas: 0 }, alto: 195 }, [
        ['Un hexágono. Desde el vértice marcado, ¿cuántas diagonales salen?', {}],
        ['A él mismo no va, y sus dos vecinos ya están unidos por lados. Quedan 6 menos 3: tres.', { una: 1 }, '$6 - 3 = 3$'],
        ['De cada uno de los 6 vértices salen 3: serían 18.', { todas: 1 }, '$6 \\cdot 3 = 18$'],
        ['Pero cada diagonal tiene dos puntas y se contó dos veces. Son 9.', {}, '$\\tfrac{6 \\cdot 3}{2} = 9$'],
      ], 'Un polígono de n lados tiene $\\tfrac{n (n - 3)}{2}$ diagonales.'),
      xpHaz('dibujo', 'Arrastra el número de lados hasta que haya exactamente 20 diagonales.', { dib: diag, v: { n: 4, una: 1, todas: 1 }, metas: { n: 8 }, alto: 250, manijas: [{ k: 'n', min: 3, max: 11, paso: 1, et: 'lados' }],
        lee: v => `$\\tfrac{${v.n} \\cdot ${v.n - 3}}{2} = ${v.n * (v.n - 3) / 2}$`, dice: v => `De cada vértice salen ${v.n - 3}.` }, '$\\tfrac{8 \\cdot 5}{2} = 20$: un octágono.')],
    ['Caminos que se suman',
      xpMira('fichas', 'Tercera idea: a cada esquina se llega **desde la izquierda o desde abajo**.', { slots: esq(2, 2), fichas: ['1', '1', '1', '1', '2', '3', '3', '6'], alto: 206, fondo: calles(2, 2), fijas: { 0: 'A' } }, [
        ['Desde A solo se camina al este o al norte. ¿De cuántas maneras se llega a cada esquina?', {}],
        ['Por el borde de abajo y por el de la izquierda hay un solo camino: derecho.', { pon: { 1: '1', 2: '1', 3: '1', 6: '1' } }],
        ['A la esquina del centro se llega desde la izquierda o desde abajo: 1 más 1, dos.', { pon: { 4: '2' }, marca: [1, 3] }, '$1 + 1 = 2$'],
        ['Cada esquina suma la de su izquierda y la de abajo: 1 más 2 son 3.', { pon: { 5: '3', 7: '3' } }, '$1 + 2 = 3$'],
        ['Y la última, 3 más 3: seis caminos.', { pon: { 8: '6' } }, '$3 + 3 = 6$'],
        ['Si una esquina estuviera cerrada, por ella no llegaría nadie: aportaría 0 a las siguientes.', { marca: [4] }],
        ['Un camino también es una palabra, como EENN o ENEN: siempre dos E y dos N, en otro orden.', {}],
      ], 'Los caminos a una esquina son los de su izquierda más los de abajo.'),
      xpHaz('fichas', 'Completa los caminos que faltan hasta la esquina de arriba a la derecha.', { slots: esq(3, 3).map(s => ({ ...s, y: s.y - 2 })), fichas: ['10', '10', '20', '9', '12', '6'], fijas: { 0: 'A', 1: '1', 2: '1', 3: '1', 4: '1', 5: '2', 6: '3', 7: '4', 8: '1', 9: '3', 10: '6', 12: '1', 13: '4' }, meta: ['A', '1', '1', '1', '1', '2', '3', '4', '1', '3', '6', '10', '1', '4', '10', '20'], alto: 206, fondo: calles(3, 3), pista: 'Suma el número de la izquierda y el de abajo.' }, '$4 + 6 = 10$ dos veces, y $10 + 10 = 20$ caminos.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una tira tiene 5 cuadritos en fila. Cuenta los rectángulos: ¿cuántos hay de cada largo y en total?', { slots: [0, 1, 2, 3, 4].map(i => ({ x: 34 + i * 54, y: 96, w: 48, et: `largo ${i + 1}` })).concat([{ x: 308, y: 96, w: 56, et: 'total' }]), fichas: ['5', '4', '3', '2', '1', '15', '10', '6'], meta: ['5', '4', '3', '2', '1', '15'], alto: 142, fondo: K => Array.from({ length: 5 }, (_, i) => K.r(80 + i * 36, 18, 36, 36, 'fc', 0)).join(''), pista: 'Un rectángulo de largo 2 puede empezar en 4 lugares.' }, '$5 + 4 + 3 + 2 + 1 = 15$ rectángulos.')],
  ], 'Contar por tamaños, parejas que no se cuentan doble y caminos que se suman.');
}
