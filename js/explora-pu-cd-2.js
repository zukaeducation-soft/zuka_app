// Preuniversitario · pu-cd-2 «Deducir la regla» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Máquina con varios ejemplos (entrada → salida) y una pregunta.
  const maq = (v, K) => v.e.map(([a, b], i) => K.t(90, 42 + i * 40, a, 'b') + K.ar(112, 36 + i * 40, 142, 36 + i * 40, 'lm') + K.r(146, 20 + i * 40, 48, 32, 'fa', 9) + K.t(170, 41 + i * 40, '?', 'tm') + K.ar(198, 36 + i * 40, 228, 36 + i * 40, 'lm') + K.t(252, 42 + i * 40, b, 'b ta')).join('') + K.t(170, 34 + v.e.length * 40, v.p || '', 'tg');
  const slots = (n, y) => Array.from({ length: n }, (_, i) => ({ x: 170 + (i - (n - 1) / 2) * 64, y, w: 56 }));
  const ej = (K, y, a, b) => K.t(120, y, a, 'b') + K.ar(156, y - 6, 188, y - 6, 'lm') + K.t(226, y, b, 'b ta');

  xpLec('pu-cd-2', [
    ['La máquina de números',
      xpMira('dibujo', 'Empecemos por la idea: una regla se adivina con un ejemplo y se **comprueba** con los demás.', { dib: maq, v: { e: [['23', '6'], ['41', '4'], ['15', '5']], p: '' }, alto: 165 }, [
        ['Una máquina recibe 23 y entrega 6. ¿Qué hizo?', {}],
        ['Con un solo ejemplo hay muchas reglas: 23 menos 17, o 2 por 3…', { p: '¿23 − 17? ¿2 · 3?' }],
        ['Probamos «restar 17» con el segundo: 41 menos 17 son 24, no 4. Se descarta.', { p: '41 − 17 = 24 ✗' }],
        ['Probamos «multiplicar las cifras»: 4 por 1 son 4. Sirve.', { p: '4 · 1 = 4 ✓' }],
        ['Y con 15: 1 por 5 son 5. Cumple con todos: esa es la regla.', { p: '1 · 5 = 5 ✓' }],
      ], 'Propón una regla con un ejemplo y pruébala con **todos**. Si falla en uno, se descarta.'),
      xpHaz('fichas', 'Una máquina hace 2 → 5, 4 → 17 y 5 → 26. ¿Qué entrega con el 7? Pon la cuenta y el resultado.', { slots: [{ x: 100, y: 138, w: 110, et: 'cuenta' }, { x: 246, y: 138, w: 84, et: 'resultado' }], fichas: ['7·7+1', '7·4+1', '50', '29', '36'], meta: ['7·7+1', '50'], alto: 186, fondo: K => ej(K, 34, 2, 5) + ej(K, 66, 4, 17) + ej(K, 98, 5, 26), pista: '2 · 2 + 1, 4 · 4 + 1… ¿y con 7?' }, 'La regla es multiplicar por sí mismo y sumar 1: $49 + 1 = 50$.')],
    ['Letras que cambian de puesto',
      xpMira('fichas', 'Segunda idea: a veces las letras son las mismas, pero **cambian de puesto**.', { slots: slots(4, 110), fichas: ['L', 'A', 'G', 'O'], alto: 146, fondo: (K, v) => K.t(170, 34, 'LAGO → ALOG', 'b ta') + K.t(170, 66, v.p || '', 'tg') }, [
        ['LAGO se escribe ALOG. Están las mismas cuatro letras: solo se movieron.', { pon: { 0: 'L', 1: 'A', 2: 'G', 3: 'O' } }],
        ['Mira los puestos: la primera y la segunda se intercambiaron.', { saca: [0, 1], pon: { 0: 'A', 1: 'L' }, v: { p: 'puestos 1 y 2' } }],
        ['La tercera y la cuarta también.', { saca: [2, 3], pon: { 2: 'O', 3: 'G' }, v: { p: 'puestos 3 y 4' } }],
        ['La regla habla de puestos, no de letras. Sirve para cualquier palabra de cuatro.', { v: { p: '1 ↔ 2 y 3 ↔ 4' } }],
      ], 'Si las letras son las mismas, numera los puestos y mira a dónde va cada uno.'),
      xpHaz('fichas', 'En ese código, LAGO se escribe ALOG. Escribe SOPA.', { slots: slots(4, 70), fichas: ['S', 'O', 'P', 'A'], meta: ['O', 'S', 'A', 'P'], alto: 106, fondo: K => K.t(170, 30, 'SOPA', 'b'), pista: 'Se cambian la 1 con la 2 y la 3 con la 4.' }, 'SOPA pasa a OSAP.')],
    ['El corrimiento que crece',
      xpMira('dibujo', 'Tercera idea: a veces cada letra avanza una **cantidad distinta**.', { dib: (v, K) => [...'SOL'].map((l, i) => { const x = 100 + i * 70, d = ['T', 'Q', 'O'][i]; return K.t(x, 50, l, 'B') + K.f(v['a' + i], K.ar(x, 60, x, 100, 'lm') + K.t(x + 18, 86, `+${i + 1}`, 'tg') + K.t(x, 130, d, 'B ta')); }).join(''), v: { a0: 0, a1: 0, a2: 0 }, alto: 150 }, [
        ['SOL se escribe TQO. ¿Es un corrimiento fijo? Vamos letra por letra.', {}],
        ['De S a T hay 1 lugar.', { a0: 1 }],
        ['De O a Q hay 2. Ya no es fijo.', { a1: 1 }],
        ['De L a O hay 3. La regla: la primera avanza 1, la segunda 2, la tercera 3.', { a2: 1 }],
      ], 'Escribe cuánto avanza cada letra: si no es igual, busca el patrón de los avances.'),
      xpHaz('fichas', 'Con esa regla (avanzar 1, 2, 3…), cifra la palabra MAR.', { slots: slots(3, 96), fichas: ['N', 'C', 'U', 'B', 'S', 'T'], meta: ['N', 'C', 'U'], alto: 130, fondo: K => [...'MAR'].map((l, i) => K.t(106 + i * 64, 42, l, 'B') + K.t(126 + i * 64, 62, `+${i + 1}`, 's tg')).join(''), pista: 'M avanza 1, A avanza 2 y R avanza 3.' }, 'M → N, A → C y R → U: NCU.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'PAN se escribe ▲●■ y PAZ se escribe ▲●◆. Escribe ZAPA con los mismos símbolos.', { slots: slots(4, 96), fichas: ['▲', '●', '●', '■', '◆', '▲'], meta: ['◆', '●', '▲', '●'], alto: 130, fondo: K => [...'ZAPA'].map((l, i) => K.t(74 + i * 64, 50, l, 'B')).join(''), pista: 'P y A son iguales en las dos palabras; lo que cambia es N y Z.' }, 'Z ◆, A ●, P ▲ y A ●: ◆●▲●.')],
  ], 'Proponer y comprobar, mirar puestos, medir avances y comparar lo que cambia.');
}
