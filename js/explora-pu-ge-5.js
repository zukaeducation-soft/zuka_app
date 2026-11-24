// Preuniversitario · pu-ge-5 «Áreas sombreadas y cuadrícula» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  const U = 24;
  const hueco = (v, K) => {
    const x = 170 - v.W * U / 2, y = 20, w = v.w * U, h = v.h * U;
    return K.r(x, y, v.W * U, v.H * U, 'fa') + K.f(v.f ?? 1, K.r(x + (v.W * U - w) / 2, y + (v.H * U - h) / 2, w, h, 'fc') + K.t(170, y + v.H * U / 2 + 5, `${N(v.w)} × ${N(v.h)}`, 'tm')) + K.t(170, y + v.H * U + 18, v.W, 'ta') + K.t(x - 9, y + v.H * U / 2 + 5, v.H, 'ta', 'end');
  };
  // Cuadrícula de puntos (x, y) con origen abajo a la izquierda.
  const G = 26, GX = 40, GY = 190, P = (x, y) => [GX + x * G, GY - y * G];
  const malla = (K, w, h) => { let s = ''; for (let i = 0; i <= w; i++) s += K.l(...P(i, 0), ...P(i, h), 'ls'); for (let j = 0; j <= h; j++) s += K.l(...P(0, j), ...P(w, j), 'ls'); return s; };
  const inscrito = (v, K) => {
    const A = [1, 1], B = [7, 2], C = [3, 6];
    const T = [[[1, 1], [7, 1], [7, 2]], [[7, 2], [7, 6], [3, 6]], [[3, 6], [1, 6], [1, 1]]];
    return malla(K, 10, 7) + K.f(v.caja, K.p([P(1, 1), P(7, 1), P(7, 6), P(1, 6)], 'fn d')) + T.map((t, i) => K.f(v['t' + i], K.p(t.map(q => P(...q)), 'ff'))).join('') + K.p([A, B, C].map(q => P(...q)), 'fa')
      + K.f(v.t0, K.t(...P(5.4, 1.08), '3', 's tf')) + K.f(v.t1, K.t(...P(5.8, 4.4), '8', 'tf')) + K.f(v.t2, K.t(...P(1.6, 4.2), '5', 'tf'));
  };
  const tri = (v, K) => malla(K, 10, 7) + K.p([P(1, 1), P(9, 1), P(v.x, v.y)], 'fa') + K.l(...P(v.x, v.y), ...P(v.x, 1), 'lf d');
  // Cuadrado con un semicírculo que se pasa de un lado al otro.
  const muerde = (v, K) => {
    const x = 70, y = 40, S = 120, r = S / 2, d = v.t * S;
    return K.r(x, y, S, S, 'fa') + `<path class="xf fc" d="M${x} ${y} A${r} ${r} 0 0 1 ${x} ${y + S} Z"/>` + K.f(v.pieza ?? 1, `<path class="xf fg" d="M${K.n(x + d)} ${K.n(y + (v.dy ?? 0))} a${r} ${r} 0 0 1 0 ${S} Z"/>`) + K.t(x + r, y + S + 20, '10', 'ta');
  };

  xpLec('pu-ge-5', [
    ['La grande menos lo que falta',
      xpMira('dibujo', 'Empecemos por la idea: un área con hueco es **la grande menos lo que se quita**.', { dib: hueco, v: { W: 8, H: 6, w: 3, h: 2, f: 0 }, alto: 190 }, [
        ['Una lámina de 8 por 6 tiene 48 cuadros de área.', {}, '$8 \\cdot 6 = 48$'],
        ['Le abrimos una ventana de 3 por 2: se van 6 cuadros.', { f: 1 }, '$3 \\cdot 2 = 6$'],
        ['Lo que queda sombreado es la diferencia: 48 menos 6 son 42.', {}, '$48 - 6 = 42$'],
        ['Con una ventana más grande, de 6 por 4, queda la mitad: 24.', { w: 6, h: 4 }, '$48 - 24 = 24$'],
        ['No importa dónde esté la ventana: solo cuánto ocupa.', {}],
      ], 'Área sombreada = figura grande − lo que se le quita. No hay que inventar una fórmula nueva.'),
      xpHaz('dibujo', 'Un marco de 10 por 7 lleva una foto de 5 de alto. Ajusta el ancho de la foto hasta que el marco, lo sombreado, mida 30.', { dib: hueco, v: { W: 10, H: 7, w: 3, h: 5 }, metas: { w: 8 }, alto: 212,
        manijas: [{ k: 'w', min: 2, max: 9, paso: 1, en: v => [170 + v.w * U / 2, 20 + 84], de: x => (x - 170) * 2 / U, r: 10 }],
        lee: v => `$70 - ${5 * v.w} = ${70 - 5 * v.w}$`, dice: v => `La foto ocupa ${v.w} · 5 = ${5 * v.w}.` }, '$70 - 40 = 30$: la foto mide 8 por 5.')],
    ['Triángulos en la cuadrícula',
      xpMira('dibujo', 'Segunda idea: en una cuadrícula, **encierra** la figura en una caja.', { dib: inscrito, v: { caja: 0, t0: 0, t1: 0, t2: 0 }, alto: 200 }, [
        ['Este triángulo está torcido: no tiene base horizontal. ¿Cómo medirlo?', {}],
        ['Lo encerramos en un rectángulo de 6 por 5: 30 cuadros.', { caja: 1 }, '$6 \\cdot 5 = 30$'],
        ['Sobran tres esquinas, y son triángulos fáciles. La de abajo: 6 por 1, la mitad, 3.', { t0: 1 }, '$\\tfrac{6 \\cdot 1}{2} = 3$'],
        ['La de la derecha, 4 por 4 entre 2, vale 8. La de la izquierda, 2 por 5 entre 2, vale 5.', { t1: 1, t2: 1 }, '$8 \\quad 5$'],
        ['A la caja le quitamos las tres: 30 menos 16 son 14.', {}, '$30 - 3 - 8 - 5 = 14$'],
      ], 'Figura torcida: enciérrala en un rectángulo y réstale los triángulos de las esquinas.'),
      xpHaz('dibujo', 'La base mide 8. Mueve el vértice hasta que el triángulo tenga área 20.', { dib: tri, v: { x: 5, y: 3 }, cumple: v => 4 * (v.y - 1) === 20, sol: { x: 5, y: 6 }, alto: 200,
        manijas: [{ k: ['x', 'y'], min: [0, 2], max: [10, 7], paso: 1, en: v => P(v.x, v.y), de: (x, y) => [(x - GX) / G, (GY - y) / G], r: 10 }],
        lee: v => `$\\tfrac{8 \\cdot ${v.y - 1}}{2} = ${4 * (v.y - 1)}$`, dice: v => `La altura es ${v.y - 1}. Moverlo hacia los lados no cambia el área.` }, 'Altura 5: $\\tfrac{8 \\cdot 5}{2} = 20$, esté donde esté el vértice a esa altura.')],
    ['Mover piezas',
      xpMira('dibujo', 'Tercera idea: a veces basta **mover una pieza** para ver una figura fácil.', { dib: muerde, v: { t: 1, pieza: 1 }, alto: 190 }, [
        ['Una figura rara: a la izquierda le falta medio círculo y a la derecha le sobra otro igual.', {}],
        ['Con fórmulas habría que sumar y restar medios círculos. Mejor miremos.', {}],
        ['La pieza que sobra llena justo el hueco que falta.', { t: 0 }],
        ['Queda un cuadrado de lado 10. El área es 100, sin usar π.', {}, '$10 \\cdot 10 = 100$'],
      ], 'Antes de calcular, busca si una pieza que sobra llena un hueco igual: el área no cambia al moverla.'),
      xpHaz('dibujo', 'Lleva el medio círculo dorado al hueco y mira qué figura queda.', { dib: muerde, v: { t: 1, dy: 0, pieza: 1 }, metas: { t: 0, dy: 0 }, alto: 190,
        manijas: [{ k: ['t', 'dy'], min: [0, -30], max: [1.2, 30], paso: [0.1, 10], inv: [0, 1], en: v => [70 + v.t * 120 + 24, 100 + v.dy], de: (x, y) => [(x - 94) / 120, y - 100], r: 10 }],
        lee: v => (v.t === 0 && v.dy === 0 ? '$10 \\cdot 10 = 100$' : ''), dice: v => (v.t === 0 && v.dy === 0 ? 'Encajó: es un cuadrado.' : 'Llévalo hasta que tape el hueco de la izquierda.') }, 'Lo que sobraba llenó lo que faltaba: un cuadrado de área 100.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una piscina de 8 m por 5 m tiene un andén de 1 m de ancho por todo el borde. ¿Qué área tiene el andén?', {
        fondo: K => K.r(20, 30, 150, 105, 'fg') + K.r(35, 45, 120, 75, 'fa') + K.t(95, 87, '8 × 5', 'ta') + K.t(95, 152, 'andén: 1 m a cada lado', 's tg') + K.t(192, 40, 'grande', 's tm', 'start') + K.t(192, 90, 'piscina', 's tm', 'start') + K.t(192, 140, 'andén', 's tg', 'start'),
        slots: [{ x: 285, y: 36, w: 76, h: 36 }, { x: 285, y: 86, w: 76, h: 36 }, { x: 285, y: 136, w: 76, h: 36 }], fichas: ['40', '54', '70', '30', '14'], meta: ['70', '40', '30'], alto: 170,
        pista: 'El andén agrega 1 m a cada lado: el rectángulo grande mide 10 por 7.' }, 'El grande mide 10 por 7: $70 - 40 = 30$ m² de andén.')],
  ], 'Restar lo que falta, encerrar en una caja y mover piezas: así cualquier área se vuelve fácil.');
}
