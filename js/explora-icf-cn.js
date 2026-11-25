// Preicfes · Ciencias Naturales, mundo 1 «Indagación Científica» (Explora, escenas «hoja» y «dibujo»). Experimentos cortos propios.
{
  const n1 = x => String(Math.round(x * 10) / 10);
  // Dos vasos con hielo: lo que queda (0 a 1) en cada uno y lo que cambia entre ellos.
  const vasos = (v, K) => [[90, v.a, v.ra], [250, v.b, v.rb]].map(([x, h, r]) => K.pl([[x - 40, 40], [x - 34, 150], [x + 34, 150], [x + 40, 40]], 'lm') + K.r(x - 26, 146 - 90 * h, 52, 90 * h, 'fa', 6) + K.t(x, 172, r, 's')).join('') + K.f(v.f, K.t(170, 24, v.txt, 'ta'));
  // Puntos sobre ejes: datos [x, y], con X de 0 a 5 y Y de 0 a hi.
  const X = x => 52 + x * 52, Y = (y, hi) => 160 - y / hi * 130;
  const ejes = (K, hi, st, ex, ey) => { let h = K.l(52, 160, 322, 160, 'lm') + K.l(52, 160, 52, 22, 'lm') + K.t(187, 194, ex, 's tm') + K.t(56, 16, ey, 's tm', 'start'); for (let k = 0; k <= hi; k += st) h += K.l(52, Y(k, hi), 318, Y(k, hi), 'ls') + K.t(46, Y(k, hi) + 4, k, 's tm', 'end'); for (let k = 1; k <= 5; k++) h += K.t(X(k), 176, k, 's tm'); return h; };
  const puntos = (v, K) => ejes(K, 50, 10, 'cucharadas de sal', 'minutos') + [[1, 40], [2, 34], [3, 28], [4, 22]].map(([x, y], i) => K.f(v.n - i, K.c(X(x), Y(y, 50), 6, 'fA'))).join('') + K.f(v.l, K.l(X(0.6), Y(42.4, 50), X(4.3), Y(20.2, 50), 'lg')) + K.f(v.q, K.l(X(4.3), Y(20.2, 50), X(5), Y(16, 50), 'lg d') + K.t(X(5), Y(16, 50) - 10, '?', 'ta'));

  xpLec('icf-cn-indaga-1', [
    ['Cambiar una sola cosa',
      xpMira('dibujo', 'Empecemos por la idea: para saber si algo influye, se cambia **solo eso**.', { dib: vasos, v: { a: 1, b: 1, ra: 'con sal', rb: 'sin sal', f: 0, txt: '' }, alto: 186 }, [
        ['Dos vasos con el mismo hielo. A uno se le echa sal.', {}],
        ['A los diez minutos, el de sal se derritió más.', { a: 0.3, b: 0.7 }],
        ['Como solo cambió la sal, la diferencia es por la sal.', { f: 1, txt: 'solo cambió la sal' }],
        ['Pero si el de sal estuviera además al sol…', { f: 1, txt: '¿sal o sol?', ra: 'sal y sol', rb: 'sin sal, sombra' }],
        ['…no se sabría cuál de las dos cosas lo derritió.', {}],
      ], 'Si cambian dos cosas a la vez, no se sabe cuál fue.'),
      xpHaz('hoja', '¿El color del vaso influye en que se caliente el agua? Subraya la prueba que sirve.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Vaso negro al sol, blanco a la sombra.'], ['Vaso negro y blanco, iguales, los dos al sol.'], ['Vaso negro lleno, blanco a la mitad.']], pista: 'En esa cambian dos cosas. Busca la que solo cambia el color.' }, 'Solo debe ser distinto el color.')],
    ['Los nombres de las variables',
      xpMira('hoja', 'Segunda idea: en todo experimento hay tres papeles.', { paras: [['Se riegan tres plantas con', 'distinta cantidad de agua.'], ['Se mide', 'cuánto crecen.'], ['Todas tienen', 'la misma tierra y el mismo sol.']] }, [
        ['Lo que el investigador cambia a propósito: el agua.', { luz: [1], nota: { 0: 'independiente' } }],
        ['Lo que mide para ver el efecto: cuánto crecen.', { luz: [3], nota: { 1: 'dependiente' } }],
        ['Lo que deja igual para no confundirse.', { luz: [5], nota: { 2: 'controladas' } }],
        ['La dependiente «depende» de la que se cambió.', { luz: [1, 3] }],
        ['Y un grupo sin el cambio sirve de comparación: el control.', {}],
      ], 'Independiente: se cambia. Dependiente: se mide. Controlada: igual.'),
      xpHaz('hoja', 'Se prueban tres jabones en manchas iguales y se mide cuánto tardan en salir. Pon los papeles.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['dependiente', 'controlada', 'independiente'], meta: [2, 0, 1], paras: [['El jabón'], ['El tiempo'], ['La mancha']], pista: 'Pregunta qué se cambia, qué se mide y qué se deja igual.' }, 'El jabón se cambia, el tiempo se mide, la mancha es igual.')],
    ['Una hipótesis se puede tumbar',
      xpMira('hoja', 'Tercera idea: una **hipótesis** es una respuesta que los datos pueden desmentir.', { letras: ['A', 'B', 'C'], paras: [['Con más abono, la planta crece más.'], ['Las plantas son bonitas.'], ['¿Crecen con abono?']] }, [
        ['Esta dice qué pasará: se puede medir y fallar.', { luz: [0], nota: { 0: 'hipótesis' } }],
        ['Esta es un gusto: ninguna regla la mide.', { luz: [1], nota: { 1: 'opinión' } }],
        ['Esta pregunta, todavía no responde.', { luz: [2], nota: { 2: 'pregunta' } }],
        ['Si los datos la contradicen, se cambia la hipótesis.', { luz: [0] }],
        ['Los datos no se cambian para darle la razón.', {}],
      ], 'Una hipótesis dice algo que se puede medir y que puede resultar falso.'),
      xpHaz('hoja', 'Subraya la hipótesis que se puede poner a prueba.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['El perro es el mejor animal.'], ['¿Duermen mucho los gatos?'], ['Un gato duerme más horas que un perro.'], ['Los gatos son misteriosos.']], pista: 'Esa pregunta u opina. Busca la que se puede medir con un reloj.' }, 'Horas de sueño: se miden y se comparan.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Se quiere saber si el agua caliente disuelve más rápido el azúcar. **Tacha** las dos cosas que **no** deben cambiar.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [0, 2], paras: [['Cuánta azúcar se echa'], ['La temperatura del agua'], ['Cuánta agua hay']], pista: 'Alguna de las tachadas es justo lo que se quiere estudiar.' }, 'Solo la temperatura cambia.')],
  ], 'Cambia una cosa, mide otra, deja lo demás igual y acepta lo que digan los datos.');

  xpLec('icf-cn-indaga-2', [
    ['Leer la tendencia',
      xpMira('dibujo', 'Empecemos por la idea: más que un dato suelto, importa **hacia dónde van** todos.', { dib: puntos, v: { n: 0, l: 0, q: 0 }, alto: 200 }, [
        ['Con una cucharada de sal, el hielo tarda 40 minutos.', { n: 1 }],
        ['Con dos, 34; con tres, 28; con cuatro, 22.', { n: 4 }],
        ['Todos bajan: a más sal, menos tiempo.', { l: 1 }],
        ['Y bajan parejo: 6 minutos por cucharada.', {}, '$40 - 34 = 6 \\qquad 28 - 22 = 6$'],
        ['Para cinco cucharadas se puede predecir, no asegurar.', { q: 1 }, '$22 - 6 = 16$'],
      ], 'Mira si sube, baja o sigue igual, y cuánto en cada paso.'),
      xpHaz('dibujo', 'Con 1, 2 y 3 cucharadas de levadura, una masa tarda 48, 40 y 32 minutos en crecer. Si sigue igual, lleva el punto a lo que tardaría con **4**.', { dib: (v, K) => ejes(K, 50, 10, 'cucharadas de levadura', 'minutos') + [[1, 48], [2, 40], [3, 32]].map(([x, y]) => K.c(X(x), Y(y, 50), 6, 'fA')).join('') + K.l(X(4), 160, X(4), Y(v.y, 50), 'lm d'), v: { y: 44 }, metas: { y: 24 }, alto: 200, manijas: [{ k: 'y', min: 0, max: 50, paso: 2, r: 10, en: v => [X(4), Y(v.y, 50)], de: (x, y) => (160 - y) / 130 * 50 }],
        lee: v => `$32 \\to ${n1(v.y)}$`, dice: v => `De 3 a 4 cucharadas cambiaría ${Math.abs(32 - v.y)} minutos.` }, 'Baja 8 en cada paso: $32 - 8 = 24$.')],
    ['Qué se puede concluir',
      xpMira('hoja', 'Segunda idea: una conclusión no puede decir **más** que los datos.', { letras: ['1', 'a', 'b', 'c'], paras: [['Se probaron 20 pilas de una marca: duraron 9 horas en promedio.'], ['Esas 20 pilas duraron 9 horas en promedio.'], ['Todas las marcas duran 9 horas.'], ['Duran 9 horas por su color.']] }, [
        ['Arriba están los datos.', { luz: [0] }],
        ['Esta dice justo lo que se midió.', { luz: [0, 1], nota: { 1: 'válida' } }],
        ['Esta habla de marcas que nadie probó.', { luz: [2], nota: { 2: 'dice de más' } }],
        ['Esta da una causa que nadie investigó.', { luz: [3], nota: { 3: 'inventa causa' } }],
        ['Cuidado con «todos», «siempre» y «porque».', {}],
      ], 'Si habla de algo que no se midió, dice de más.'),
      xpHaz('hoja', 'En 30 casas con huerta se gastó menos en mercado que en 30 sin huerta. **Tacha** las dos que dicen de más.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [0, 2], paras: [['En todo el país pasa lo mismo.'], ['Esas 30 casas con huerta gastaron menos.'], ['La huerta cura enfermedades.']], pista: 'Alguna de las tachadas dice justo lo que se midió.' }, 'Ni el país ni las enfermedades se midieron.')],
    ['Repetir y medir bien',
      xpMira('hoja', 'Tercera idea: una medida puede fallar; **repetir** descubre el error.', { paras: [['Primera medida: 5.1 s.'], ['Segunda: 5.0 s.'], ['Tercera: 8.7 s.'], ['Cuarta: 4.9 s.']] }, [
        ['Cuatro veces el mismo experimento.', {}],
        ['Tres se parecen: alrededor de 5 segundos.', { luz: [0, 1, 3] }],
        ['Una se aparta: algo pasó al medir.', { luz: [2], nota: { 2: 'sospechosa' } }],
        ['Si solo se hubiera medido esa, el error no se vería.', { luz: [2] }],
        ['Con muchos datos se usa el promedio, revisando los raros.', {}],
      ], 'Una sola medida no muestra su error; varias, sí.'),
      xpHaz('hoja', 'Subraya la medida que habría que **repetir**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['21.2 °C'], ['12.1 °C'], ['21.0 °C'], ['21.3 °C']], pista: 'Esa se parece a las otras. Busca la que se aparta.' }, 'Parece que cambiaron las cifras de lugar.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Con 10, 20 y 30 g de abono la planta creció 4, 7 y 7 cm. Subraya lo que se concluye.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['A más abono, siempre crece más.'], ['De 20 a 30 g no creció más.'], ['Con 40 g va a morir.']], pista: 'Esa no cuadra con los tres datos o habla de algo que no se probó.' }, 'De 20 a 30 g siguió en 7 cm: eso dicen los datos.')],
  ], 'Lee la tendencia, no concluyas de más y repite para ver el error.');
}
