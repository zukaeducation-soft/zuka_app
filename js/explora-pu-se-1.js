// Preuniversitario · pu-se-1 «Sucesiones numéricas» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Términos en fichas con arcos que dicen qué pasa de uno a otro (v.op: rótulos; v.d, v.d2: qué tanto se ven).
  const suc = (v, K) => {
    const T = v.t, n = T.length, w = Math.min(58, 320 / n), X = i => 170 + (i - (n - 1) / 2) * w; let h = '';
    T.forEach((t, i) => { const c = v.col ? ['fa', 'fg'][i % 2] : t === '?' ? 'fg' : 'fa'; h += K.r(X(i) - w / 2 + 4, 110, w - 8, 38, c, 9) + K.t(X(i), 135, t, v.col ? ['ta', 'tg'][i % 2] : ''); });
    const arc = (a, b, y, hh, cl = 'la') => `<path class="xl ${cl}" d="M${K.n(a)} ${y} Q${K.n((a + b) / 2)} ${y - hh} ${K.n(b)} ${y}"/>`;
    const s = v.col ? 2 : 1;
    let A = ''; for (let i = 0; i + s < n; i++) if (v.op[i] != null && v.op[i] !== '') A += arc(X(i) + 4, X(i + s) - 4, 106, v.col ? 60 : 34, v.col && i % 2 ? 'lg' : 'la') + K.t((X(i) + X(i + s)) / 2, v.col ? (i % 2 ? 52 : 68) : 80, v.op[i], v.col ? ['ta', 'tg'][i % 2] : 'ta');
    let B = ''; if (v.op2) v.op2.forEach((t, i) => { B += arc((X(i) + X(i + 1)) / 2 + 3, (X(i + 1) + X(i + 2)) / 2 - 3, 66, 26, 'lg') + K.t(X(i + 1), 44, t, 'tg'); });
    return h + K.f(v.d, A) + K.f(v.d2 ?? 0, B);
  };

  xpLec('pu-se-1', [
    ['Siempre se suma lo mismo',
      xpMira('dibujo', 'Empecemos por la idea: para ver una sucesión, mira **qué pasa** de un término al otro.', { dib: suc, v: { t: ['4', '11', '18', '25'], op: ['+7', '+7', '+7'], d: 0 }, alto: 165 }, [
        ['Una sucesión es una fila de números con una regla escondida.', {}],
        ['De 4 a 11 se suma 7. De 11 a 18, otra vez 7. Siempre 7.', { d: 1 }],
        ['El que sigue es 25 más 7: treinta y dos.', { t: ['4', '11', '18', '25', '32'], op: ['+7', '+7', '+7', '+7'] }, '$25 + 7 = 32$'],
        ['¿Y el décimo? Desde el primero hasta el décimo hay 9 saltos, no 10.', {}, '$10 - 1 = 9$'],
        ['Entonces es 4 más 9 saltos de 7: sesenta y siete.', {}, '$4 + 9 \\cdot 7 = 67$'],
      ], 'Término n = primero + (n − 1) saltos. Los saltos son uno menos que los términos.'),
      xpHaz('fichas', 'La sucesión es 8, 14, 20, 26… Arma el término 12: saltos, lo que avanzan y el término.', { slots: [{ x: 62, y: 56, w: 92, et: 'saltos' }, { x: 170, y: 56, w: 92, et: 'avanzan' }, { x: 278, y: 56, w: 92, et: 'término 12' }], fichas: ['11', '66', '74', '12', '72', '80'], meta: ['11', '66', '74'], alto: 104, pista: 'Del primero al doce hay 11 saltos de 6.' }, '$11 \\cdot 6 = 66$ y $8 + 66 = 74$.')],
    ['Los saltos también cambian',
      xpMira('dibujo', 'Segunda idea: si los saltos no son iguales, mira **los saltos de los saltos**.', { dib: suc, v: { t: ['1', '3', '7', '13', '21'], op: ['+2', '+4', '+6', '+8'], op2: ['+2', '+2', '+2'], d: 0, d2: 0 }, alto: 165 }, [
        ['Aquí no se suma siempre lo mismo.', {}],
        ['Los saltos son 2, 4, 6 y 8. ¡Los saltos forman otra sucesión!', { d: 1 }],
        ['Cada salto crece de 2 en 2.', { d2: 1 }],
        ['El salto que sigue es 10, y el término, 21 más 10: treinta y uno.', { t: ['1', '3', '7', '13', '21', '31'], op: ['+2', '+4', '+6', '+8', '+10'], op2: ['+2', '+2', '+2', '+2'] }, '$21 + 10 = 31$'],
      ], 'Escribe las diferencias. Si no son iguales, busca la regla de las diferencias.'),
      xpHaz('fichas', 'Pon los saltos que faltan y el término que sigue en 5, 6, 9, 14, 21.', { slots: [0, 1, 2, 3, 4].map(i => ({ x: 50 + i * 54, y: 46, w: 48, h: 36 })).concat([{ x: 300, y: 98, w: 48, h: 36 }]), fijas: { 0: '+1', 1: '+3' }, fichas: ['+5', '+7', '+9', '30', '28', '+8'], meta: ['+1', '+3', '+5', '+7', '+9', '30'], alto: 126, fondo: K => [5, 6, 9, 14, 21].map((t, i) => K.t(24 + i * 54, 103, t, 'b')).join(''), pista: 'De 9 a 14 hay 5, de 14 a 21 hay 7. ¿Qué salto sigue?' }, 'Los saltos son 1, 3, 5, 7 y 9: el que sigue es $21 + 9 = 30$.')],
    ['Otras reglas',
      xpMira('dibujo', 'Tercera idea: tres reglas más que **aparecen mucho**.', { dib: suc, v: { t: ['2', '6', '18', '54'], op: ['×3', '×3', '×3'], d: 1, col: 0 }, alto: 165 }, [
        ['A veces se multiplica: cada término es 3 veces el anterior. Sigue 162.', {}, '$54 \\cdot 3 = 162$'],
        ['A veces se suman los dos anteriores: 1 más 4 son 5, 4 más 5 son 9, 5 más 9 son 14.', { t: ['1', '4', '5', '9', '14'], op: ['', '', '', ''] }, '$9 + 14 = 23$'],
        ['Y a veces hay dos sucesiones mezcladas, una por turno.', { t: ['3', '50', '6', '45', '9', '40'], op: ['+3', '−5', '+3', '−5', '', ''], col: 1 }],
        ['Los lugares impares suben de 3 en 3; los pares bajan de 5 en 5. Sigue el 12.', { t: ['3', '50', '6', '45', '9', '40', '12'], op: ['+3', '−5', '+3', '−5', '+3', '', ''] }, '$9 + 3 = 12$'],
      ], 'Prueba: ¿se suma?, ¿se multiplica?, ¿se suman los dos anteriores?, ¿son dos mezcladas?'),
      xpHaz('fichas', 'Hay dos sucesiones mezcladas: 7, 60, 9, 55, 11, 50. Pon los dos términos que siguen.', { slots: [{ x: 248, y: 62, w: 56 }, { x: 310, y: 62, w: 56 }], fichas: ['13', '45', '12', '49', '40'], meta: ['13', '45'], alto: 104, fondo: K => [7, 60, 9, 55, 11, 50].map((t, i) => K.t(24 + i * 35, 67, t, i % 2 ? 'b tg' : 'b ta')).join(''), pista: 'Salta de uno en uno: 7, 9, 11 por un lado y 60, 55, 50 por el otro.' }, 'Una sube de 2 en 2, $11 + 2 = 13$; la otra baja de 5 en 5, $50 - 5 = 45$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'En 1, 2, 6, 24… cada paso multiplica por un número distinto. Pon los multiplicadores y el término que sigue.', { slots: [0, 1, 2, 3].map(i => ({ x: 66 + i * 62, y: 46, w: 54, h: 36 })).concat([{ x: 290, y: 98, w: 56, h: 36 }]), fichas: ['×2', '×3', '×4', '×5', '120', '48', '×6'], meta: ['×2', '×3', '×4', '×5', '120'], alto: 126, fondo: K => [1, 2, 6, 24].map((t, i) => K.t(36 + i * 62, 103, t, 'b')).join(''), pista: 'De 1 a 2 es por 2, de 2 a 6 es por 3. ¿Y de 6 a 24?' }, 'Por 2, por 3, por 4 y ahora por 5: $24 \\cdot 5 = 120$.')],
  ], 'Mira los saltos, los saltos de los saltos, los productos y las sucesiones mezcladas.');
}
