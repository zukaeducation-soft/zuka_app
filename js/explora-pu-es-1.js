// Preuniversitario · pu-es-1 «Rejillas y caminos» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const U = 32, X = i => 26 + i * U, Y = j => 186 - j * U, COL = 9, FIL = 5;
  const calles = K => { let h = ''; for (let i = 0; i <= COL; i++) h += K.l(X(i), Y(0), X(i), Y(FIL), 'ls'); for (let j = 0; j <= FIL; j++) h += K.l(X(0), Y(j), X(COL), Y(j), 'ls'); return h; };
  const rosa = K => K.t(326, 22, 'N', 's tm') + K.ar(326, 44, 326, 28, 'lm');
  const pto = (K, x, y, s, cls = 'fF', dx = -12, dy = 16) => K.c(X(x), Y(y), 6, cls) + K.t(X(x) + dx, Y(y) + dy, s, '');
  const manija = { k: ['x', 'y'], min: [0, 0], max: [COL, FIL], paso: 1, r: 10, en: v => [X(v.x), Y(v.y)], de: (x, y) => [(x - 26) / U, (186 - y) / U] };
  // De A a B primero al este y luego al norte; t de 0 a 1 recorre el camino.
  const camino = (v, K) => {
    const dx = v.bx - v.ax, dy = v.by - v.ay, n = Math.abs(dx) + Math.abs(dy), k = v.t * n, e = Math.min(k, Math.abs(dx)), m = k - e;
    const P = v.otro ? [[v.ax, v.ay], [v.ax, v.ay + Math.sign(dy) * Math.min(k, Math.abs(dy))], [v.ax + Math.sign(dx) * Math.max(0, k - Math.abs(dy)), v.ay + Math.sign(dy) * Math.min(k, Math.abs(dy))]] : [[v.ax, v.ay], [v.ax + Math.sign(dx) * e, v.ay], [v.ax + Math.sign(dx) * e, v.ay + Math.sign(dy) * m]];
    return calles(K) + rosa(K) + K.pl(P.map(q => [X(q[0]), Y(q[1])]), 'la gr') + K.f(v.rec ?? 0, K.l(X(v.ax), Y(v.ay), X(v.bx), Y(v.by), 'lg gr')) + pto(K, v.ax, v.ay, 'A') + pto(K, v.bx, v.by, 'B', 'fG', 12, -8);
  };
  // Recorrido por tramos; p = cuántas cuadras lleva.
  const DIR = { N: [0, 1], S: [0, -1], E: [1, 0], O: [-1, 0] };
  const ruta = (K, x, y, ms, p) => { const P = [[x, y]]; for (const [d, n] of ms) { const k = Math.min(n, Math.max(0, p)); x += DIR[d][0] * k; y += DIR[d][1] * k; p -= n; P.push([x, y]); } return K.pl(P.map(q => [X(q[0]), Y(q[1])]), 'la gr') + K.c(X(x), Y(y), 7, 'fA'); };
  const MS = [['N', 4], ['E', 5], ['S', 1], ['O', 2]];

  xpLec('pu-es-1', [
    ['Caminar por las calles',
      xpMira('dibujo', 'Empecemos por la idea: en una ciudad no se vuela, se camina **por las calles**.', { dib: camino, v: { ax: 1, ay: 1, bx: 6, by: 4, t: 0, otro: 0 }, alto: 206 }, [
        ['De A a B. Solo se puede caminar por las calles de la rejilla.', {}],
        ['Cinco cuadras al este y tres al norte: ocho cuadras.', { t: 1 }, '$5 + 3 = 8$'],
        ['Por otro camino, primero al norte y luego al este, también son ocho.', { otro: 1 }, '$3 + 5 = 8$'],
        ['Mientras no te devuelvas, todos los caminos miden igual: lo que separa a lo ancho más lo que separa a lo alto.', {}],
        ['Con B más cerca, tres y dos: cinco cuadras.', { bx: 4, by: 3 }, '$3 + 2 = 5$'],
      ], 'Distancia por calles = cuadras a lo ancho + cuadras a lo alto.'),
      xpHaz('dibujo', 'Lleva el punto a una esquina que esté a 6 cuadras de A. Hay varias: encuentra una.', { dib: (v, K) => calles(K) + pto(K, 3, 1, 'A') + K.pl([[X(3), Y(1)], [X(v.x), Y(1)], [X(v.x), Y(v.y)]], 'la gr'), v: { x: 4, y: 2 }, cumple: v => Math.abs(v.x - 3) + Math.abs(v.y - 1) === 6, sol: { x: 6, y: 4 }, alto: 206, manijas: [manija],
        lee: v => `$${Math.abs(v.x - 3)} + ${Math.abs(v.y - 1)} = ${Math.abs(v.x - 3) + Math.abs(v.y - 1)}$`, dice: v => `${Math.abs(v.x - 3)} a lo ancho y ${Math.abs(v.y - 1)} a lo alto.` }, 'Sirve cualquier esquina cuyas cuadras a lo ancho y a lo alto sumen 6.')],
    ['Juntar los movimientos',
      xpMira('dibujo', 'Segunda idea: lo que importa es **dónde terminas**, no las vueltas que diste.', { dib: (v, K) => calles(K) + rosa(K) + ruta(K, 2, 0, MS, v.p) + pto(K, 2, 0, 'A') + K.f(v.n, K.l(X(2), Y(0), X(5), Y(0), 'lg gr') + K.l(X(5), Y(0), X(5), Y(3), 'lg gr')), v: { p: 0, n: 0 }, alto: 206 }, [
        ['Desde A: cuatro cuadras al norte y cinco al este.', { p: 9 }],
        ['Luego una al sur y dos al oeste.', { p: 12 }],
        ['Caminó 12 cuadras en total.', {}, '$4 + 5 + 1 + 2 = 12$'],
        ['Norte y sur se restan: 4 menos 1, tres al norte. Este y oeste también: 5 menos 2, tres al este.', { n: 1 }, '$4 - 1 = 3 \\quad 5 - 2 = 3$'],
        ['Así que terminó a 6 cuadras de A, aunque caminó 12.', {}, '$3 + 3 = 6$'],
      ], 'Norte contra sur, este contra oeste: se restan. Lo que queda dice dónde terminas.'),
      xpHaz('dibujo', 'Desde A: 4 al este, 3 al norte, 6 al oeste y 1 al sur. Lleva el punto a donde se termina.', { dib: (v, K) => calles(K) + rosa(K) + pto(K, 4, 2, 'A'), v: { x: 5, y: 2 }, metas: { x: 2, y: 4 }, alto: 206, manijas: [manija],
        lee: v => `$${Math.abs(v.x - 4)} \\text{ al ${v.x >= 4 ? 'este' : 'oeste'}}, \\; ${Math.abs(v.y - 2)} \\text{ al ${v.y >= 2 ? 'norte' : 'sur'}}$`, dice: () => 'Junta primero este con oeste, y luego norte con sur.' }, '6 al oeste y 4 al este dejan 2 al oeste; 3 al norte y 1 al sur dejan 2 al norte.')],
    ['En línea recta',
      xpMira('dibujo', 'Tercera idea: la **línea recta** es el atajo, y se mide con Pitágoras.', { dib: camino, v: { ax: 1, ay: 1, bx: 5, by: 4, t: 1, otro: 0, rec: 0 }, alto: 206 }, [
        ['De A a B hay 4 cuadras al este y 3 al norte: 7 por las calles.', {}, '$4 + 3 = 7$'],
        ['Un pájaro va derecho: su camino es la hipotenusa de un triángulo rectángulo.', { rec: 1 }],
        ['Nueve más dieciséis son 25, y su raíz es 5.', {}, '$\\sqrt{4^2 + 3^2} = 5$'],
        ['En línea recta son 5 cuadras: menos que las 7 de caminar.', {}, '$5 < 7$'],
      ], 'Por calles se suman los lados; en línea recta se usa $\\sqrt{a^2 + b^2}$.'),
      xpHaz('fichas', 'De la plaza al hospital hay 12 cuadras al este y 5 al norte. Pon la distancia por calles y en línea recta.', { slots: [{ x: 100, y: 56, w: 100, et: 'por calles' }, { x: 240, y: 56, w: 100, et: 'línea recta' }], fichas: ['17', '13', '7', '60', '15'], meta: ['17', '13'], alto: 104, pista: 'Por calles se suma; en línea recta, 144 más 25 y la raíz.' }, '$12 + 5 = 17$ y $\\sqrt{144 + 25} = \\sqrt{169} = 13$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Un parque queda a 4 cuadras de la estación M y a 4 de la estación N, al norte de ellas. Ubícalo.', { dib: (v, K) => calles(K) + pto(K, 1, 1, 'M', 'fF', 0, 20) + pto(K, 7, 1, 'N', 'fF', 0, 20), v: { x: 2, y: 4 }, cumple: v => Math.abs(v.x - 1) + Math.abs(v.y - 1) === 4 && Math.abs(v.x - 7) + Math.abs(v.y - 1) === 4 && v.y > 1, sol: { x: 4, y: 2 }, alto: 210, manijas: [manija],
        lee: v => `$M: ${Math.abs(v.x - 1) + Math.abs(v.y - 1)} \\qquad N: ${Math.abs(v.x - 7) + Math.abs(v.y - 1)}$`, dice: () => 'Las dos distancias deben dar 4. ¿Dónde está igual de lejos de M y de N?' }, 'Está a mitad de camino: 3 cuadras a lo ancho de cada una y 1 al norte, $3 + 1 = 4$.')],
  ], 'Por calles se suma, los movimientos contrarios se restan, y en línea recta manda Pitágoras.');
}
