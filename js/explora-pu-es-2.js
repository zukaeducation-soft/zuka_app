// Preuniversitario · pu-es-2 «Vistas y cubos» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Construcción: h[fila][columna] (fila 0 = la de adelante). Se dibuja de atrás hacia adelante.
  const pila = (K, o, u, h, sube = 1, num = 0) => {
    let s = '';
    for (let r = h.length - 1; r >= 0; r--) for (let c = h[0].length - 1; c >= 0; c--) {
      const n = Math.round(h[r][c] * sube);
      for (let z = 0; z < n; z++) s += K.caja(K.iso(o, u, c, r, z), u, 1, 1, 1, z % 2 ? 'cu b' : 'cu', false);
      if (num && n) { const p = K.iso(o, u, c + 0.5, r + 0.5, n); s += K.t(p[0], p[1] + 5, h[r][c], 's'); }
    }
    return s;
  };
  const H = [[1, 1, 2], [1, 3, 3]];
  // Vista plana: columnas de cuadros.
  const vista = (K, x, y, a, et) => a.map((n, i) => Array.from({ length: n }, (_, z) => K.r(x + i * 24, y - (z + 1) * 24, 22, 22, 'fg')).join('')).join('') + K.t(x + a.length * 12, y + 17, et, 's tm');
  const max = a => Math.max(...a);
  const cubo = (v, K) => {
    const n = 7, u = 15, o = [170, 196], I = (x, y, z) => K.iso(o, u, x, y, z), q = (P, cl) => K.p(P, cl);
    let h = K.caja(o, u, n, n, n, 'fa');
    const top = (x, y, cl) => q([I(x, y, n), I(x + 1, y, n), I(x + 1, y + 1, n), I(x, y + 1, n)], cl), fr = (x, z, cl) => q([I(x, 0, z), I(x + 1, 0, z), I(x + 1, 0, z + 1), I(x, 0, z + 1)], cl), iz = (y, z, cl) => q([I(0, y, z), I(0, y + 1, z), I(0, y + 1, z + 1), I(0, y, z + 1)], cl);
    let e = '', a = '', c = '';
    for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) {
      const b = (i === 0 || i === n - 1) + (j === 0 || j === n - 1), k = b === 2 ? 'e' : b === 1 ? 'a' : 'c', cl = { e: 'fF', a: 'fG', c: 'fo' }[k], s = top(i, j, cl) + fr(i, j, cl) + iz(i, j, cl);
      if (k === 'e') e += s; else if (k === 'a') a += s; else c += s;
    }
    return h + K.f(v.c, c) + K.f(v.a, a) + K.f(v.e, e);
  };

  xpLec('pu-es-2', [
    ['Contar por torres',
      xpMira('dibujo', 'Empecemos por la idea: para no perder cubos escondidos, cuenta **por torres**.', { dib: (v, K) => pila(K, [140, 190], 34, H, v.s, v.n), v: { s: 1, n: 0 }, alto: 205 }, [
        ['Esta construcción tiene cubos que no se ven, debajo y detrás de otros.', {}],
        ['Mírala como torres. Cada torre tiene una altura: se escribe arriba.', { n: 1 }],
        ['La fila de adelante tiene torres de 1, 1 y 2: cuatro cubos.', {}, '$1 + 1 + 2 = 4$'],
        ['La de atrás, de 1, 3 y 3: siete cubos.', {}, '$1 + 3 + 3 = 7$'],
        ['En total, once. Ningún cubo flota: debajo de cada uno hay otro o el piso.', {}, '$4 + 7 = 11$'],
      ], 'Escribe la altura de cada torre y suma: así cuentas también los cubos escondidos.'),
      xpHaz('fichas', 'Cuenta los cubos de cada fila y el total. Los números dicen la altura de cada torre.', { slots: [{ x: 66, y: 196, w: 84, et: 'adelante' }, { x: 170, y: 196, w: 84, et: 'atrás' }, { x: 274, y: 196, w: 84, et: 'en total' }], fichas: ['5', '8', '13', '6', '10', '11'], meta: ['5', '8', '13'], alto: 242, fondo: K => pila(K, [150, 160], 28, [[1, 2, 2], [2, 2, 4]], 1, 1), pista: 'Adelante hay torres de 1, 2 y 2.' }, 'Adelante $1 + 2 + 2 = 5$, atrás $2 + 2 + 4 = 8$: 13 cubos.')],
    ['Las vistas',
      xpMira('dibujo', 'Segunda idea: una **vista** aplasta la construcción y deja ver solo lo más alto.', { dib: (v, K) => pila(K, [110, 170], 26, H, 1, 1) + K.f(v.f, vista(K, 210, 84, [0, 1, 2].map(c => max(H.map(r => r[c]))), 'de frente')) + K.f(v.l, vista(K, 222, 190, H.map(r => max(r)).reverse(), 'desde la izquierda')), v: { f: 0, l: 0 }, alto: 210 }, [
        ['La misma construcción, con la altura de cada torre.', {}],
        ['De frente, cada columna muestra su torre más alta: de izquierda a derecha, 1, 3 y 3.', { f: 1 }, '$1, \\; 3, \\; 3$'],
        ['Las torres bajitas de adelante no tapan a las altas, y las de atrás no se ven si son más bajas.', {}],
        ['Desde la izquierda se mira cada fila: la de atrás llega a 3 y la de adelante, a 2.', { l: 1 }, '$3, \\; 2$'],
        ['Construcciones distintas pueden tener las mismas vistas.', {}],
      ], 'En una vista, cada columna muestra la altura **máxima** de las torres que están en esa dirección.'),
      xpHaz('rejilla', 'Vista desde arriba: toca cada casilla para darle altura (0 a 3). De frente, por columnas, se debe ver 1, 3 y 2; por filas, 2 y 3.', { f: 2, c: 3, estados: 4, unoAUno: true, rot: ['0', '1', '2', '3'], filas: ['fila: 2', 'fila: 3'], cols: ['1', '3', '2'], izq: 70, cw: 64, ch: 52, cumple: c => [1, 3, 2].every((m, k) => Math.max(c[k], c[k + 3]) === m) && [2, 3].every((m, r) => Math.max(c[3 * r], c[3 * r + 1], c[3 * r + 2]) === m), sol: { 0: 1, 1: 0, 2: 2, 3: 1, 4: 3, 5: 0 },
        lee: c => `$\\text{columnas: } ${[0, 1, 2].map(k => Math.max(c[k], c[k + 3])).join(', ')} \\quad \\text{filas: } ${[0, 1].map(r => Math.max(c[3 * r], c[3 * r + 1], c[3 * r + 2])).join(', ')}$`, dice: c => `Llevas ${c.reduce((a, b) => a + b, 0)} cubos.` }, 'El 3 solo cabe donde se cruzan la columna del 3 y la fila del 3; lo demás se puede armar de varias formas.')],
    ['El cubo pintado',
      xpMira('dibujo', 'Tercera idea: si se pinta un cubo y se corta, la pintura depende del **lugar**.', { dib: cubo, v: { e: 0, a: 0, c: 0 }, alto: 215 }, [
        ['Un cubo de arista 7 se pinta por fuera y se corta en cubitos: 343.', {}, '$7^3 = 343$'],
        ['Las esquinas tienen 3 caras pintadas. Siempre son 8.', { e: 1 }, '$8$'],
        ['Los de las aristas, sin las esquinas, tienen 2: hay 12 aristas con 5 cada una.', { a: 1 }, '$12 \\cdot 5 = 60$'],
        ['Los del centro de cada cara tienen 1: son 6 caras de 5 por 5.', { c: 1 }, '$6 \\cdot 25 = 150$'],
        ['Y por dentro queda un cubo de 5 sin pintura: 125. Todo suma 343.', {}, '$5^3 = 125$'],
      ], 'Con arista n: 8 esquinas, $12(n-2)$ en aristas, $6(n-2)^2$ en caras y $(n-2)^3$ sin pintar.'),
      xpHaz('fichas', 'Un cubo de arista 5 se pinta y se corta en cubitos. ¿Cuántos tienen 3, 2 y 1 caras pintadas?', { slots: [{ x: 66, y: 56, w: 84, et: '3 caras' }, { x: 170, y: 56, w: 84, et: '2 caras' }, { x: 274, y: 56, w: 84, et: '1 cara' }], fichas: ['8', '36', '54', '60', '27', '150'], meta: ['8', '36', '54'], alto: 104, pista: 'En cada arista, quitando esquinas, quedan 3. En cada cara, 3 por 3.' }, '8 esquinas, $12 \\cdot 3 = 36$ y $6 \\cdot 9 = 54$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un bloque de 5 × 4 × 3 se pinta por fuera y se corta en cubitos de 1. ¿Cuántos hay, cuántos sin pintar y cuántos con pintura?', { slots: [{ x: 66, y: 176, w: 84, et: 'en total' }, { x: 170, y: 176, w: 84, et: 'sin pintar' }, { x: 274, y: 176, w: 84, et: 'con pintura' }], fichas: ['60', '6', '54', '24', '36', '12'], meta: ['60', '6', '54'], alto: 222, fondo: K => K.caja([160, 140], 21, 5, 4, 3, 'fa'), pista: 'Sin pintar queda un bloque de 3 por 2 por 1: se quita una capa por cada lado.' }, '$5 \\cdot 4 \\cdot 3 = 60$; adentro $3 \\cdot 2 \\cdot 1 = 6$; con pintura 54.')],
  ], 'Torres con su altura, vistas que guardan el máximo, y la pintura según el lugar.');
}
