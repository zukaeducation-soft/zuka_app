// Preicfes · Matemáticas, mundo 1 «Datos y Gráficas» (Explora, escenas «dibujo», «fichas» y «hoja»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 10) / 10), Y0 = 168, H = 136;
  // Barras con eje desde `lo` hasta `hi`, rayas cada `st`; `lin` dibuja una línea a esa altura.
  const barras = (v, K) => {
    const n = v.vals.length, w = 250 / n, Y = x => Y0 - (Math.max(v.lo || 0, x) - (v.lo || 0)) / (v.hi - (v.lo || 0)) * H; let h = '';
    for (let k = v.lo || 0; k <= v.hi + 1e-6; k += v.st) h += K.l(60, Y(k), 320, Y(k), 'ls') + K.t(52, Y(k) + 4, N(k), 's tm', 'end');
    v.vals.forEach((x, i) => { h += K.r(66 + i * w + 8, Y(x), w - 16, Y0 - Y(x), i === v.on ? 'fA' : 'fa', 3) + K.t(66 + (i + 0.5) * w, Y0 + 17, v.rot[i], 's'); });
    return h + (v.lin > 0 ? K.l(60, Y(v.lin), 320, Y(v.lin), 'lg d') : '') + (v.nota ? K.t(190, 20, v.nota, 'tg') : '');
  };
  const manija = (k, i, n, hi, paso, en = 0) => ({ k, min: en, max: hi, paso, r: 10, en: v => [66 + (i + 0.5) * 250 / n, Y0 - v[k] / hi * H], de: (x, y) => (Y0 - y) / H * hi });
  const torta = (v, K) => { const m = K.at(150, 100, 52, 90 - v.g / 2); return K.sec(150, 100, 80, 90 - 360, 90 - v.g, 'fn') + K.sec(150, 100, 80, 90 - v.g, 90, 'fA') + K.t(m[0], m[1] + 5, v.r || '', 's') + K.t(252, 40, `${N(v.g)}°`, 'tm', 'start'); };

  xpLec('icf-ma-datos-1', [
    ['Primero, la escala',
      xpMira('dibujo', 'Empecemos por la idea: una gráfica se lee por su **escala**, no a ojo.', { dib: barras, v: { vals: [50, 75, 25], hi: 100, st: 50, rot: ['lun', 'mar', 'mié'], on: -1, nota: '' }, alto: 195 }, [
        ['Lluvia de tres días. Las rayas van de 50 en 50.', {}],
        ['El lunes llega justo a una raya: 50.', { on: 0, nota: '50' }],
        ['El martes queda a mitad entre 50 y 100: 75.', { on: 1, nota: '75' }, '$50 + 25 = 75$'],
        ['El miércoles, a mitad entre 0 y 50: 25.', { on: 2, nota: '25' }],
        ['Si creyeras que va de 10 en 10, todo saldría mal.', { on: -1, nota: '' }],
      ], 'Mira cuánto vale una raya y qué parte de ella alcanza la barra.'),
      xpHaz('dibujo', 'Pasa la tabla a la gráfica: A = 30, B = 60, C = 90. Arrastra cada barra.', { dib: (v, K) => barras({ vals: [v.a, v.b, v.c], hi: 120, st: 60, rot: ['A', 'B', 'C'], on: -1 }, K), v: { a: 15, b: 15, c: 15 }, metas: { a: 30, b: 60, c: 90 }, alto: 195, manijas: ['a', 'b', 'c'].map((k, i) => manija(k, i, 3, 120, 15)),
        lee: v => `$${v.a}, \\; ${v.b}, \\; ${v.c}$`, dice: () => 'Las rayas van de 60 en 60: la mitad de una raya son 30.' }, 'El 30 y el 90 caen a mitad de raya.')],
    ['Cambio y porcentaje',
      xpMira('dibujo', 'Segunda idea: el cambio en porcentaje se mide sobre lo que había **antes**.', { dib: barras, v: { vals: [8, 8], hi: 16, st: 4, rot: ['antes', 'ahora'], on: 1, nota: '' }, alto: 195 }, [
        ['Antes había 8 estudiantes en el coro.', {}],
        ['Ahora hay 12: entraron 4.', { vals: [8, 12], nota: '+4' }, '$12 - 8 = 4$'],
        ['Cuatro es la mitad de 8: subió el 50 %.', { nota: '+50 %' }, '$\\tfrac{4}{8} = 50\\,\\%$'],
        ['Si de 12 vuelve a 8, pierde 4 de 12: un tercio.', { vals: [12, 8], nota: '−33 %' }, '$\\tfrac{4}{12} \\approx 33\\,\\%$'],
        ['Mismo cambio, distinto porcentaje: se divide por lo de antes.', {}],
      ], 'Cambio porcentual = lo que cambió ÷ lo que había antes.'),
      xpHaz('dibujo', 'Antes: 40. Arrastra la barra de ahora hasta que el aumento sea del 25 %.', { dib: (v, K) => barras({ vals: [40, v.b], hi: 80, st: 20, rot: ['antes', 'ahora'], on: 1 }, K), v: { b: 70 }, metas: { b: 50 }, alto: 195, manijas: [manija('b', 1, 2, 80, 5, 10)],
        lee: v => `$\\tfrac{${v.b} - 40}{40} = ${N((v.b - 40) / 40 * 100)}\\,\\%$`, dice: v => (v.b >= 40 ? `Subió ${v.b - 40} sobre 40.` : `Bajó ${40 - v.b} sobre 40.`) }, 'El 25 % de 40 son 10: $40 + 10 = 50$.')],
    ['La torta',
      xpMira('dibujo', 'Tercera idea: en la torta, el total es la **vuelta completa**.', { dib: torta, v: { g: 360, r: '100 %' }, alto: 200 }, [
        ['El 100 % da toda la vuelta: 360°.', {}, '$100\\,\\% = 360^\\circ$'],
        ['La mitad del total ocupa media vuelta.', { g: 180, r: '50 %' }, '$50\\,\\% = 180^\\circ$'],
        ['El 10 % es la décima parte: 36°.', { g: 36, r: '10 %' }, '$360^\\circ \\div 10 = 36^\\circ$'],
        ['El 30 % son tres veces eso: 108°.', { g: 108, r: '30 %' }, '$3 \\cdot 36^\\circ = 108^\\circ$'],
        ['Del ángulo al porcentaje: divide entre 360.', { g: 90, r: '25 %' }, '$\\tfrac{90}{360} = 25\\,\\%$'],
      ], 'El sector es la misma fracción de 360° que la parte es del total.'),
      xpHaz('dibujo', 'De 50 personas, 10 prefieren el té. Abre su sector.', { dib: (v, K) => torta({ g: v.g, r: 'té' }, K), v: { g: 144 }, metas: { g: 72 }, alto: 200, manijas: [{ k: 'g', min: 18, max: 342, paso: 18, r: 10, en: v => XPK.at(150, 100, 80, 90 - v.g), de: (x, y, v) => { const g = ((90 - Math.atan2(100 - y, x - 150) * 180 / Math.PI) % 360 + 360) % 360; return Math.abs(g - v.g) > 180 ? (v.g > 180 ? 342 : 18) : g; } }],
        lee: v => `$${N(v.g / 3.6)}\\,\\% \\text{ de } 50 = ${N(v.g / 360 * 50)}$`, dice: v => `${v.g}° son el ${N(v.g / 3.6)} % de la vuelta.` }, '10 de 50 son el 20 %: $2 \\cdot 36^\\circ = 72^\\circ$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Ventas: enero 10, febrero 20, marzo 15. Subraya la afirmación **correcta**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Siempre aumentaron.'], ['De enero a febrero subieron el 50 %.'], ['De enero a febrero se duplicaron.'], ['En marzo fueron las menores.']], pista: 'Esa no cuadra con los tres números. Revísala uno por uno.' }, 'De 10 a 20 es el doble: un aumento del 100 %.')],
  ], 'Escala primero, lo de antes para el porcentaje y 360° para la torta.');

  xpLec('icf-ma-datos-2', [
    ['Repartir parejo',
      xpMira('dibujo', 'Empecemos por la idea: el **promedio** es lo que tocaría si se repartiera todo por igual.', { dib: barras, v: { vals: [2, 11, 5], hi: 12, st: 3, rot: ['Ana', 'Bea', 'Ciro'], on: -1, nota: '', lin: 0 }, alto: 195 }, [
        ['Ana tiene 2 láminas, Bea 11 y Ciro 5.', {}],
        ['Juntan todas: son 18.', { nota: '18' }, '$2 + 11 + 5 = 18$'],
        ['Entre tres, a cada uno le tocan 6.', { lin: 6 }, '$18 \\div 3 = 6$'],
        ['Bea cede lo que le sobra y llena a los demás.', { vals: [6, 6, 6], nota: 'promedio 6' }],
        ['Lo que sobra arriba llena justo lo que falta abajo.', {}],
      ], 'Promedio: suma todo y reparte entre cuántos son.'),
      xpHaz('dibujo', 'Los datos son 4, 9 y uno más. Muévelo hasta que el promedio sea 8.', { dib: (v, K) => barras({ vals: [4, 9, v.c], hi: 15, st: 5, rot: ['4', '9', '?'], on: 2, lin: (13 + v.c) / 3 }, K), v: { c: 5 }, metas: { c: 11 }, alto: 195, manijas: [manija('c', 2, 3, 15, 1)],
        lee: v => `$\\tfrac{4 + 9 + ${v.c}}{3} = ${N((13 + v.c) / 3)}$`, dice: () => 'Tres datos con promedio 8 deben sumar 24.' }, 'Deben sumar 24 y ya hay 13: faltan 11.')],
    ['El del centro y el que más sale',
      xpMira('fichas', 'Segunda idea: la **mediana** es el del centro, con los datos **en orden**.', { slots: [0, 1, 2, 3, 4].map(i => ({ x: 50 + i * 60, y: 60, w: 50 })), fichas: ['9', '3', '7', '3', '4'], alto: 110 }, [
        ['Cinco datos en desorden.', {}],
        ['Primero se ordenan de menor a mayor.', { pon: { 0: '3', 1: '3', 2: '4', 3: '7', 4: '9' } }],
        ['La mediana es el del centro: 4. Deja dos a cada lado.', { marca: [2] }, '$\\text{mediana} = 4$'],
        ['La moda es el que más se repite: 3.', { marca: [0, 1] }, '$\\text{moda} = 3$'],
        ['Con una cantidad par hay dos en el centro: se promedian.', { marca: [] }],
      ], 'Mediana: ordena y busca el centro. Moda: el que más se repite.'),
      xpHaz('fichas', 'Datos: 8, 2, 6, 2, 10, 5. Pon la mediana y la moda.', { slots: [{ x: 110, y: 46, w: 90, et: 'mediana' }, { x: 230, y: 46, w: 90, et: 'moda' }], fichas: ['5.5', '2', '6', '4', '10'], meta: ['5.5', '2'], alto: 96, pista: 'Ordena: 2, 2, 5, 6, 8, 10. Con seis datos hay dos en el centro.' }, 'Los del centro son 5 y 6: $\\tfrac{5 + 6}{2} = 5.5$. El 2 se repite.')],
    ['El dato que jala y el que pesa',
      xpMira('dibujo', 'Tercera idea: un dato muy grande **jala** el promedio, pero no la mediana.', { dib: barras, v: { vals: [1, 2, 2, 3, 2], hi: 24, st: 6, rot: ['1', '2', '2', '3', '2'], on: -1, nota: '', lin: 0 }, alto: 195 }, [
        ['Cinco sueldos parecidos: el promedio y la mediana son 2.', { lin: 2 }],
        ['El último se va a 22.', { vals: [1, 2, 2, 3, 22], rot: ['1', '2', '2', '3', '22'], on: 4 }],
        ['El promedio salta a 6: nadie gana eso.', { lin: 6, nota: 'promedio 6' }, '$30 \\div 5 = 6$'],
        ['La mediana sigue en 2: describe mejor al grupo.', { lin: 2, nota: 'mediana 2' }],
        ['En notas con peso, cada una jala según su porcentaje.', { nota: '' }, '$0.4 \\cdot 5 + 0.6 \\cdot 3 = 3.8$'],
      ], 'Un dato extremo mueve el promedio y casi nunca la mediana.'),
      xpHaz('fichas', 'El taller vale 30 % y sacó 5.0; el examen, 70 % y sacó 3.0. Pon los aportes y la nota.', { slots: [{ x: 66, y: 46, w: 80, et: 'taller' }, { x: 170, y: 46, w: 80, et: 'examen' }, { x: 274, y: 46, w: 80, et: 'nota' }], fichas: ['1.5', '2.1', '3.6', '4.0', '3.0'], meta: ['1.5', '2.1', '3.6'], alto: 96, pista: 'Multiplica cada nota por su peso y después suma los aportes.' }, '$0.3 \\cdot 5 = 1.5$, $0.7 \\cdot 3 = 2.1$ y $1.5 + 2.1 = 3.6$.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Cuatro amigos promedian 10 años. Llega uno más y promedian 11. Mueve su edad.', { dib: (v, K) => barras({ vals: [10, 10, 10, 10, v.e], hi: 20, st: 5, rot: ['10', '10', '10', '10', '?'], on: 4, lin: (40 + v.e) / 5 }, K), v: { e: 12 }, metas: { e: 15 }, alto: 195, manijas: [manija('e', 4, 5, 20, 1)],
        lee: v => `$\\tfrac{40 + ${v.e}}{5} = ${N((40 + v.e) / 5)}$`, dice: () => 'Cinco personas con promedio 11 suman 55.' }, 'Antes sumaban 40; ahora deben sumar 55: tiene 15.')],
  ], 'Promedio reparte, mediana parte en dos, moda repite; y los extremos jalan.');

  xpLec('icf-ma-datos-3', [
    ['El eje que engaña',
      xpMira('dibujo', 'Empecemos por la idea: si el eje **no empieza en cero**, el dibujo exagera.', { dib: barras, v: { vals: [52, 54], lo: 50, hi: 55, st: 1, rot: ['A: 52', 'B: 54'], on: 1, nota: '' }, alto: 195 }, [
        ['B parece el doble de A.', {}],
        ['Pero mira el eje: empieza en 50.', { nota: 'desde 50' }],
        ['Desde cero, casi no hay diferencia.', { lo: 0, hi: 60, st: 20, nota: 'desde 0' }],
        ['En números: 2 más que 52, cerca del 4 %.', { nota: '+4 %' }, '$\\tfrac{2}{52} \\approx 4\\,\\%$'],
        ['Se comparan los números, no las alturas.', { nota: '' }],
      ], 'Antes de comparar barras, mira dónde empieza el eje.'),
      xpHaz('dibujo', 'A vendió 30 y B 36. Baja el piso del eje hasta que el dibujo no engañe.', { dib: (v, K) => barras({ vals: [30, 36], lo: v.p, hi: 40, st: (40 - v.p) / 4, rot: ['A: 30', 'B: 36'], on: 1 }, K), v: { p: 24 }, metas: { p: 0 }, alto: 240, manijas: [{ k: 'p', min: 0, max: 24, paso: 4, et: 'piso del eje' }],
        lee: v => `$\\text{B parece } ${N((36 - v.p) / (30 - v.p))} \\text{ veces A}$`, dice: v => (v.p ? 'Todavía se corta la parte de abajo de las barras.' : 'Ahora se ven completas.') }, 'Desde 0, B es 1.2 veces A: un 20 % más.')],
    ['Grupos de distinto tamaño',
      xpMira('dibujo', 'Segunda idea: para comparar grupos distintos, usa **porcentajes**.', { dib: barras, v: { vals: [30, 40], hi: 100, st: 25, rot: ['A: 30', 'B: 40'], on: -1, nota: '' }, alto: 195 }, [
        ['En A aprobaron 30 y en B, 40. ¿Gana B?', {}],
        ['A tiene 50 estudiantes; B tiene 80.', { vals: [50, 80], rot: ['A: 50', 'B: 80'] }],
        ['En A aprobó el 60 %.', { vals: [60, 80], rot: ['A: 60 %', 'B: 80'], on: 0 }, '$\\tfrac{30}{50} = 60\\,\\%$'],
        ['En B aprobó el 50 %. Gana A.', { vals: [60, 50], rot: ['A: 60 %', 'B: 50 %'], on: 1 }, '$\\tfrac{40}{80} = 50\\,\\%$'],
        ['Más personas no es mayor proporción.', { on: -1 }],
      ], 'Cada cantidad se divide entre el total de su propio grupo.'),
      xpHaz('fichas', 'Ganaron 12 de 20 en el equipo rojo y 15 de 30 en el azul. Pon cada porcentaje.', { slots: [{ x: 110, y: 46, w: 90, et: 'rojo' }, { x: 230, y: 46, w: 90, et: 'azul' }], fichas: ['60 %', '50 %', '12 %', '15 %', '24 %'], meta: ['60 %', '50 %'], alto: 96, pista: 'Divide 12 entre 20 y 15 entre 30.' }, 'El rojo tiene menos triunfos, pero mayor proporción.')],
    ['La muestra',
      xpMira('hoja', 'Tercera idea: una **muestra** sirve si se parece a todos.', { paras: [['Se quiere saber cuánto deporte hace la gente de un pueblo.'], ['Preguntar en el gimnasio.'], ['Sortear personas de todos los barrios.'], ['Preguntar a quien quiera llamar.']] }, [
        ['La población es todo el pueblo.', { luz: [0] }],
        ['En el gimnasio todos hacen deporte: sale cargada.', { luz: [1], nota: { 1: 'sesgada' } }],
        ['Con un sorteo, cualquiera puede salir.', { luz: [2], nota: { 2: 'sirve' } }],
        ['Solo llaman los interesados: también sale cargada.', { luz: [3], nota: { 3: 'sesgada' } }],
        ['Y la conclusión habla solo de quienes podían salir.', { luz: [2] }],
      ], 'Sirve si cualquiera de la población podía salir.'),
      xpHaz('hoja', '¿Qué música prefieren los estudiantes de un colegio? Subraya la muestra que sirve.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Los de la banda de rock.'], ['Cinco de cada curso, por sorteo.'], ['Los que fueron al concierto.']], pista: 'En esa algunos estudiantes nunca podrían salir.' }, 'Con sorteo en cada curso, todos pueden salir.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'De 100 clientes de una panadería, 70 comen pan a diario. **Tacha** las dos conclusiones que no valen.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [0, 2], paras: [['El 70 % del país come pan a diario.'], ['30 de los encuestados no comen pan a diario.'], ['Comen pan porque es barato.']], pista: 'Alguna de las tachadas sale directo de los números.' }, 'Los clientes no son el país, y nadie preguntó por qué.')],
  ], 'Eje desde cero, porcentajes para comparar y muestras donde cualquiera pueda salir.');
}
