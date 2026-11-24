// Preuniversitario · pu-es-3 «Desarrollos del cubo» (Explora). Los ejemplos no son los de los ejercicios.
{
  const CL = { 0: 'fc', 1: 'fa', 2: 'fg', 3: 'ff' };
  // Desarrollo: celdas [columna, fila] con letra y color de pareja (0 = sin marcar).
  const red = (K, x, y, u, cel, let_, col = []) => cel.map(([c, r], i) => K.r(x + c * u, y + r * u, u, u, CL[col[i] || 0], 2) + K.t(x + (c + 0.5) * u, y + (r + 0.5) * u + 6, let_[i], 'b')).join('');
  const N1 = [[0, 1], [1, 1], [2, 1], [3, 1], [1, 0], [2, 2]];
  const N2 = [[0, 0], [1, 0], [1, 1], [2, 1], [2, 2], [3, 2]];
  // Dado en perspectiva: arriba, frente y derecha.
  const dado = (K, cx, cy, u, a, f, d) => {
    const A = [[cx - u, cy - u * 0.5], [cx, cy - u], [cx + u, cy - u * 0.5], [cx, cy]], F = [[cx - u, cy - u * 0.5], [cx, cy], [cx, cy + u * 1.1], [cx - u, cy + u * 0.6]], D = [[cx, cy], [cx + u, cy - u * 0.5], [cx + u, cy + u * 0.6], [cx, cy + u * 1.1]];
    return K.p(A, 'fa') + K.p(F, 'fc') + K.p(D, 'fg') + K.t(cx, cy - u * 0.5 + 7, a, 'b') + K.t(cx - u / 2, cy + u * 0.38, f, 'b') + K.t(cx + u / 2, cy + u * 0.38, d, 'b');
  };
  const rot3 = (K, cx, cy, u) => K.t(cx, cy - u - 8, 'arriba', 's tm') + K.t(cx - u - 6, cy + u * 0.3, 'frente', 's tm', 'end') + K.t(cx + u + 6, cy + u * 0.3, 'derecha', 's tm', 'start');
  // Parejas de caras opuestas en colores.
  const par = (v, K) => red(K, 78, 24, 46, N1, ['P', 'Q', 'R', 'S', 'T', 'U'], [v.a > 0.5 ? 1 : 0, v.b > 0.5 ? 2 : 0, v.a > 0.5 ? 1 : 0, v.b > 0.5 ? 2 : 0, v.c > 0.5 ? 3 : 0, v.c > 0.5 ? 3 : 0]);

  xpLec('pu-es-3', [
    ['Caras opuestas en el molde',
      xpMira('dibujo', 'Empecemos por la idea: al doblar el molde, ¿qué caras quedan **frente a frente**?', { dib: par, v: { a: 0, b: 0, c: 0 }, alto: 180 }, [
        ['Este molde se dobla y arma un cubo. Tiene seis caras: P, Q, R, S, T y U.', {}],
        ['En una fila recta, las vecinas se tocan. La opuesta está saltando una: P y R.', { a: 1 }],
        ['Por lo mismo, Q y S son opuestas: entre ellas está R.', { b: 1 }],
        ['Las dos que sobran, una arriba y otra abajo de la fila, son las tapas: T y U.', { c: 1 }],
        ['Son tres parejas. Dos caras opuestas nunca se tocan en el molde.', {}],
        ['No todo molde cierra: si dos caras caen en el mismo sitio, otro sitio queda abierto.', {}],
      ], 'En una fila recta, la cara opuesta está **saltando una**. Las dos que sobran son opuestas.'),
      xpHaz('fichas', 'Este molde se dobla en un cubo. Pon la cara opuesta de cada una.', { slots: [{ x: 66, y: 196, w: 70, et: 'opuesta de A' }, { x: 170, y: 196, w: 70, et: 'opuesta de B' }, { x: 274, y: 196, w: 70, et: 'opuesta de E' }], fichas: ['C', 'D', 'F', 'A', 'B'], meta: ['C', 'D', 'F'], alto: 242, fondo: K => red(K, 86, 14, 42, [[0, 1], [1, 1], [2, 1], [3, 1], [0, 0], [3, 2]], ['A', 'B', 'C', 'D', 'E', 'F']), pista: 'A, B, C y D están en fila: salta una. Las que sobran son las tapas.' }, 'A con C, B con D, y las tapas E con F, aunque no estén en la misma columna.')],
    ['El dado suma siete',
      xpMira('dibujo', 'Segunda idea: en un dado corriente, las caras opuestas **suman 7**.', { dib: (v, K) => dado(K, 170, 100, 62, 4, 2, 1) + rot3(K, 170, 100, 62) + K.f(v.o, K.t(40, 30, 'abajo: 3', 'ta', 'start') + K.f(v.o2, K.t(40, 188, 'atrás: 5', 'ta', 'start') + K.t(232, 188, 'izquierda: 6', 'ta', 'start'))), v: { o: 0, o2: 0 }, alto: 200 }, [
        ['Un dado muestra el 4 arriba, el 2 al frente y el 1 a la derecha.', {}],
        ['Debajo del 4 está el que completa 7: el 3.', { o: 1 }, '$7 - 4 = 3$'],
        ['Atrás, detrás del 2, está el 5. Y a la izquierda, frente al 1, el 6.', { o2: 1 }, '$7 - 2 = 5 \\quad 7 - 1 = 6$'],
        ['Las tres visibles suman 7 y las escondidas 14. En total siempre son 21.', {}, '$7 + 14 = 21$'],
      ], 'Opuestas: 1 con 6, 2 con 5 y 3 con 4. Las seis caras suman 21.'),
      xpHaz('fichas', 'Se ven el 6 arriba, el 5 al frente y el 4 a la derecha. Pon las tres escondidas.', { slots: [{ x: 66, y: 190, w: 70, et: 'abajo' }, { x: 170, y: 190, w: 70, et: 'atrás' }, { x: 274, y: 190, w: 70, et: 'izquierda' }], fichas: ['1', '2', '3', '4', '5'], meta: ['1', '2', '3'], alto: 236, fondo: K => dado(K, 170, 72, 50, 6, 5, 4), pista: 'Cada escondida completa 7 con la que tiene enfrente.' }, 'Abajo $7 - 6 = 1$, atrás $7 - 5 = 2$, izquierda $7 - 4 = 3$.')],
    ['Rodar el dado',
      xpMira('dibujo', 'Tercera idea: al **volcar** el dado, cada cara pasa al sitio siguiente.', { dib: (v, K) => (v.m < 0.5 ? dado(K, 100, 96, 52, 1, 2, 4) : dado(K, 240, 96, 52, 3, 2, 1)) + K.f(v.fl, K.ar(150, 178, 200, 178, 'la gr')) + K.t(v.m < 0.5 ? 100 : 240, 28, v.p || '', 'ta'), v: { m: 0, fl: 0, p: '' }, alto: 195 }, [
        ['Arriba el 1, al frente el 2 y a la derecha el 4. Lo volcamos hacia la derecha.', {}],
        ['La cara de la derecha, el 4, es la que va a quedar contra la mesa.', { fl: 1 }],
        ['La de arriba, el 1, pasa a la derecha. Y la de la izquierda, 7 menos 4, sube: el 3.', { m: 1 }, '$7 - 4 = 3$'],
        ['El frente no cambia: el dado giró alrededor de él. Sigue el 2.', {}],
        ['Hacia adelante es igual: sube la de atrás, la de arriba pasa al frente y los lados no cambian.', {}],
        ['Cuatro vuelcos hacia el mismo lado lo dejan como al principio.', { m: 0, fl: 0 }],
      ], 'Al volcar a la derecha: arriba → derecha → abajo → izquierda → arriba. El frente y atrás no cambian.'),
      xpHaz('fichas', 'Arriba el 2, al frente el 1 y a la derecha el 4. Se vuelca una vez hacia la derecha. ¿Qué se ve ahora?', { slots: [{ x: 66, y: 190, w: 70, et: 'arriba' }, { x: 170, y: 190, w: 70, et: 'frente' }, { x: 274, y: 190, w: 70, et: 'derecha' }], fichas: ['3', '1', '2', '4', '5', '6'], meta: ['3', '1', '2'], alto: 236, fondo: K => dado(K, 170, 72, 50, 2, 1, 4), pista: 'Sube la cara de la izquierda, que es la opuesta del 4.' }, 'Sube la izquierda, $7 - 4 = 3$; el frente sigue en 1 y el 2 pasa a la derecha.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Este molde en escalera también arma un cubo. Pon la cara opuesta de cada una.', { slots: [{ x: 66, y: 196, w: 70, et: 'opuesta de 1' }, { x: 170, y: 196, w: 70, et: 'opuesta de 2' }, { x: 274, y: 196, w: 70, et: 'opuesta de 3' }], fichas: ['4', '5', '6', '1', '2', '3'], meta: ['4', '5', '6'], alto: 242, fondo: K => red(K, 86, 14, 42, N2, ['1', '2', '3', '4', '5', '6']), pista: 'Imagina que el cubo rueda por la escalera: tras tres vuelcos, 1, 2, 3, llega a la cara opuesta de la primera.' }, 'Al rodar por la escalera, la cara opuesta aparece cada tres: 1 con 4, 2 con 5 y 3 con 6.')],
  ], 'Opuestas saltando una, caras que suman 7, y vuelcos que pasan cada cara al sitio siguiente.');
}
