// Trigonometría · los tres mundos (Funciones Periódicas, Identidades y Triángulos, El Plano Complejo), Explora. trig-41a tiene su
// propio archivo. Ejemplos propios, que no salen en los ejercicios.
{
  const P = XM.pasos, rad = g => g * Math.PI / 180;
  const R = (v, K) => XM.rueda(K, 130, 110, 84, v.g) + (v.p ? K.t(246, 60, v.p, 'b ta', 'start') : '') + (v.q ? K.t(246, 96, v.q, 'ta', 'start') : '');
  const ang = (max = 360, paso = 15, et = 'ángulo (grados)') => [xpRegla('g', 0, max, et, paso)];
  // Triángulo rectángulo de ángulo g en la esquina izquierda y base b.
  const tri = (K, x, y, b, g, o = {}) => { const h = b * Math.tan(rad(g)); return K.p([[x, y], [x + b, y], [x + b, y - h]], 'fc') + K.l(x, y, x + b, y, 'lg gr') + K.l(x + b, y, x + b, y - h, 'lf gr') + K.l(x, y, x + b, y - h, 'la gr') + K.ang([x, y], [x + b, y], [x + b, y - h], 26, o.a ?? '', 'fa') + K.r(x + b - 10, y - 10, 10, 10, 'fn') + K.t(x + b / 2, y + 20, o.ca ?? '', 's tg') + K.t(x + b + 8, y - h / 2 + 5, o.co ?? '', 's tf', 'start') + K.t(x + b / 2 - 10, y - h / 2 - 10, o.hi ?? '', 's ta', 'end'); };

  // ---------------------------------------------------------------------------------------------------------- trig-41b
  const piz = (v, K) => K.c(120, 110, 84, 'fc') + K.sec(120, 110, 84, 0, v.g, 'fa') + K.arc(120, 110, 84, 0, v.g, 'lf gr') + (v.p ? K.t(226, 70, v.p, 'b ta', 'start') : '') + (v.q ? K.t(226, 104, v.q, 'ta', 'start') : '');
  xpLec('trig-41b', [
    ['El largo del arco', xpMira('dibujo', 'Empecemos por la idea: el arco mide **radio por ángulo**, en radianes.', { dib: piz, v: { g: 0, p: '', q: '' }, alto: 210 }, [
      ['Un radián es el ángulo cuyo arco mide un radio.', { g: 57.3, p: '1 rad' }, '$s = r$'],
      ['Con dos radianes, el arco mide dos radios.', { g: 114.6, p: '2 rad' }, '$s = 2r$'],
      ['Con θ radianes, θ radios.', { p: 'θ rad' }, '$s = r\\theta$'],
      ['La vuelta completa son dos pi.', { g: 360, p: '2π rad' }, '$s = 2\\pi r$'],
      ['En grados no sirve: primero se pasa a radianes.', { g: 90, p: 'π/2 rad' }, '$90^\\circ = \\tfrac{\\pi}{2}$'],
    ], '$s = r\\theta$, con θ en radianes.'),
    xpFila('Radio 8 y ángulo $\\tfrac{3\\pi}{4}$. Pon el arco y lo que mediría con radio 4.', ['radio 8', 'radio 4'], ['6π', '3π'], ['24π', '12π', '2π'], 'Multiplica radio por ángulo.', '$8 \\cdot \\tfrac{3\\pi}{4} = 6\\pi$.')],
    ['El pedazo de área', xpMira('dibujo', 'Segunda idea: el sector es la **misma fracción** de vuelta, pero de área.', { dib: piz, v: { g: 90, p: '', q: '' }, alto: 210 }, [
      ['Un cuarto de vuelta es un cuarto del disco.', { p: '1/4' }, '$\\tfrac14 \\pi r^2$'],
      ['Un sexto de vuelta, un sexto.', { g: 60, p: '1/6' }, '$\\tfrac16 \\pi r^2$'],
      ['En general, la fracción es θ sobre 2π.', { p: 'θ/2π' }, '$\\tfrac{\\theta}{2\\pi} \\cdot \\pi r^2$'],
      ['Al simplificar, el pi se cancela.', {}, '$A = \\tfrac12 r^2\\theta$'],
    ], '$A = \\tfrac12 r^2\\theta$.'),
    xpMueve('Pinta el sector que es **tres octavos** del disco.', 290, { g: 45, p: '' }, ang(360, 45), { g: 135 }, piz, '$\\tfrac38 \\cdot 360^\\circ = 135^\\circ$.', { lee: v => `$${v.g}^\\circ$` })],
    ['Girar y avanzar', xpMira('dibujo', 'Tercera idea: la **velocidad lineal** es radio por velocidad angular.', { dib: (v, K) => K.c(120, 110, 84, 'fn') + K.c(120, 110, 42, 'fn') + [84, 42].map((r, i) => { const [x, y] = K.at(120, 110, r, v.g); return K.l(120, 110, x, y, 'lm') + K.c(x, y, 8, i ? 'fG' : 'fA'); }).join('') + K.t(226, 110, v.p, 'ta', 'start'), v: { g: 0, p: '' }, alto: 210 }, [
      ['Dos puntos de un mismo disco, uno al doble de distancia.', {}, '$r \\ \\text{y} \\ 2r$'],
      ['Giran el mismo ángulo en el mismo tiempo.', { g: 120 }, '$\\omega = \\tfrac{\\theta}{t}$'],
      ['Pero el de afuera recorre el doble.', { p: '2r vs r' }, '$v = r\\omega$'],
      ['Las vueltas por minuto se pasan a radianes: por 2π.', {}, '$1 \\ \\text{vuelta} = 2\\pi$'],
    ], '$v = r\\omega$, con ω en radianes por unidad de tiempo.'),
    xpFila('Una rueda de radio 3 m da 5 vueltas por minuto. Pon ω y v (por minuto).', ['ω', 'v'], ['10π', '30π'], ['5π', '15π', '3π'], 'Cada vuelta son 2π; luego por el radio.', '$\\omega = 10\\pi$ y $v = 30\\pi$ m.')],
    ['Ahora sí, un problema', xpFila('Un aspersor riega un sector de $120^\\circ$ con radio 6 m. Pon el ángulo en radianes y el área.', ['radianes', 'área'], ['2π/3', '12π'], ['3π/2', '4π', '24π'], 'Un tercio de vuelta; un tercio del disco de 36π.', '$\\tfrac12 \\cdot 36 \\cdot \\tfrac{2\\pi}{3} = 12\\pi$.')],
  ], 'En radianes todo es multiplicar: arco, sector y velocidad.');

  // ---------------------------------------------------------------------------------------------------------- trig-1
  const sohD = (v, K) => tri(K, 50, 170, v.b, v.g, { a: 'θ', ca: 'adyacente', co: 'opuesto', hi: 'hipotenusa' }) + K.t(300, 30, v.p || '', 'ta', 'end');
  xpLec('trig-1', [
    ['Los nombres de los lados', xpMira('dibujo', 'Empecemos por la idea: los catetos se nombran **desde el ángulo**.', { dib: sohD, v: { b: 170, g: 35, p: '' }, alto: 200 }, [
      ['La hipotenusa mira al ángulo recto: es la más larga.', {}, '$\\text{hip}$'],
      ['El **opuesto** está enfrente de θ.', {}, '$\\text{op}$'],
      ['El **adyacente** está al lado de θ.', {}, '$\\text{ady}$'],
      ['Si se mira desde el otro ángulo, los catetos cambian de nombre.', {}, '$\\text{op} \\leftrightarrow \\text{ady}$'],
    ], 'Opuesto: enfrente. Adyacente: al lado. Hipotenusa: frente al recto.'),
    xpFila('Triángulo de lados 8, 15 y 17. Desde el ángulo opuesto al **8**, pon los lados.', ['opuesto', 'adyacente', 'hipotenusa'], ['8', '15', '17'], ['23', '25'], 'La hipotenusa es la más larga.', 'Opuesto 8, adyacente 15, hipotenusa 17.')],
    ['Razones que no cambian', xpMira('dibujo', 'Segunda idea: el tamaño cambia; **la razón, no**.', { dib: sohD, v: { b: 100, g: 35, p: '' }, alto: 200 }, [
      ['Opuesto sobre hipotenusa: el seno.', { p: 'sen = op/hip' }, '$\\operatorname{sen}\\theta = \\tfrac{\\text{op}}{\\text{hip}}$'],
      ['Agrandamos el triángulo con el mismo ángulo.', { b: 190 }, '$\\tfrac{2\\,\\text{op}}{2\\,\\text{hip}}$'],
      ['Todos los lados crecen igual: la razón se conserva.', {}, '$\\operatorname{sen}\\theta$'],
      ['Coseno: adyacente sobre hipotenusa.', { p: 'cos = ady/hip' }, '$\\cos\\theta = \\tfrac{\\text{ady}}{\\text{hip}}$'],
      ['Tangente: opuesto sobre adyacente.', { p: 'tan = op/ady' }, '$\\tan\\theta = \\tfrac{\\text{op}}{\\text{ady}}$'],
    ], 'SOH · CAH · TOA: razones que dependen solo del ángulo.'),
    xpFila('Opuesto 9, adyacente 40, hipotenusa 41. Pon cada razón.', ['sen', 'cos', 'tan'], ['9/41', '40/41', '9/40'], ['41/9', '40/9'], 'SOH, CAH, TOA.', 'Cada una con sus dos lados.')],
    ['Hallar un lado', xpMira('dibujo', 'Tercera idea: se escoge la razón que une **lo que tienes con lo que buscas**.', { dib: (v, K) => tri(K, 60, 160, 140, 40, { a: '40°', ca: v.ca, co: 'x', hi: '' }) + K.t(250, 60, v.p, 'ta', 'middle'), v: { ca: '20', p: '' }, alto: 190 }, [
      ['Se conoce el adyacente, 20, y se busca el opuesto.', {}, '$\\text{ady} = 20$'],
      ['La que une opuesto y adyacente es la tangente.', { p: 'tan 40° = x/20' }, '$\\tan 40^\\circ = \\tfrac{x}{20}$'],
      ['Se despeja: veinte veces la tangente.', { p: 'x = 20 · tan 40°' }, '$x = 20\\tan 40^\\circ$'],
      ['Con calculadora, cerca de 16.8.', {}, '$x \\approx 16.8$'],
    ], 'Mira qué dos lados intervienen y usa su razón.'),
    xpFila('$\\operatorname{sen}\\theta = 0.6$ e hipotenusa 25. Pon el opuesto y el adyacente.', ['opuesto', 'adyacente'], ['15', '20'], ['10', '41', '24'], '0.6 por 25; luego Pitágoras.', '$15$ y $\\sqrt{625 - 225} = 20$.')],
    ['Ahora sí, un problema', xpFila('Una rampa de 13 m sube 5 m. Pon el seno y el coseno de su inclinación.', ['sen', 'cos'], ['5/13', '12/13'], ['13/5', '5/12', '8/13'], 'La rampa es la hipotenusa; falta el cateto del piso.', '$\\sqrt{169 - 25} = 12$.')],
  ], 'Nombra los lados desde el ángulo y elige la razón.');

  // ---------------------------------------------------------------------------------------------------------- trig-2
  xpLec('trig-2', [
    ['Medio cuadrado', xpMira('dibujo', 'Empecemos por la idea: el de **45°** es medio cuadrado.', { dib: (v, K) => K.r(80, 20, 140, 140, 'fc') + K.l(80, 160, 220, 20, 'la gr') + K.t(150, 180, '1', 's') + K.t(232, 94, '1', 's') + K.f(v.h, K.t(136, 80, '√2', 'b ta')), v: { h: 0 }, alto: 195 }, [
      ['Un cuadrado de lado 1, partido por la diagonal.', {}, '$1, 1$'],
      ['Los dos catetos son iguales: el ángulo es 45°.', {}, '$45^\\circ$'],
      ['La diagonal mide raíz de dos.', { h: 1 }, '$\\sqrt{1 + 1}$'],
      ['Por eso seno y coseno coinciden.', {}, '$\\operatorname{sen}45^\\circ = \\tfrac{\\sqrt2}{2}$'],
      ['Y la tangente es 1.', {}, '$\\tan 45^\\circ = 1$'],
    ], '45°: $\\tfrac{\\sqrt2}{2}$, $\\tfrac{\\sqrt2}{2}$ y 1.'),
    xpFila('Un cuadrado tiene lado 6. Pon su diagonal, y el lado de uno con diagonal 10.', ['diagonal', 'lado'], ['6√2', '5√2'], ['12', '10√2', '3√2'], 'Por √2 para ir; entre √2 para volver.', '$\\tfrac{10}{\\sqrt2} = 5\\sqrt2$.')],
    ['Medio triángulo equilátero', xpMira('dibujo', 'Segunda idea: **30° y 60°** salen de medio equilátero.', { dib: (v, K) => K.p([[80, 170], [240, 170], [160, 32]], 'fc') + K.f(v.h, K.l(160, 32, 160, 170, 'lf gr') + K.t(120, 188, '1', 's') + K.t(172, 120, '√3', 'b tf', 'start')) + K.t(108, 94, '2', 'b') + K.t(94, 162, '60°', 's', 'start'), v: { h: 0 }, alto: 200 }, [
      ['Un triángulo equilátero de lado 2: ángulos de 60°.', {}, '$60^\\circ$'],
      ['La altura lo parte en dos: la base queda en 1.', { h: 1 }, '$1, 2$'],
      ['Por Pitágoras, la altura es raíz de tres.', {}, '$\\sqrt{4 - 1} = \\sqrt3$'],
      ['Desde 60°: opuesto raíz de tres, adyacente 1.', {}, '$\\operatorname{sen}60^\\circ = \\tfrac{\\sqrt3}{2}, \\ \\cos 60^\\circ = \\tfrac12$'],
      ['Desde 30° se intercambian.', {}, '$\\operatorname{sen}30^\\circ = \\tfrac12, \\ \\cos 30^\\circ = \\tfrac{\\sqrt3}{2}$'],
    ], 'Lados 1, √3, 2: de ahí salen todas las de 30° y 60°.'),
    xpFila('Pon cada valor.', ['sen 60°', 'tan 30°', 'cos 60°'], ['√3/2', '√3/3', '1/2'], ['√3', '√2/2', '1'], 'Dibuja el triángulo 1, √3, 2.', '$\\tan 30^\\circ = \\tfrac{1}{\\sqrt3} = \\tfrac{\\sqrt3}{3}$.')],
    ['Complementarios', xpMira('dibujo', 'Tercera idea: el seno de uno es el **coseno del otro**.', { dib: (v, K) => tri(K, 60, 160, 170, v.g, { a: `${Math.round(v.g)}°`, ca: '', co: '', hi: '' }) + K.t(110, 40, `el otro: ${90 - Math.round(v.g)}°`, 's'), v: { g: 30 }, alto: 190 }, [
      ['Los dos ángulos agudos suman 90°.', {}, '$30^\\circ + 60^\\circ$'],
      ['El opuesto de uno es el adyacente del otro.', { g: 38 }, '$\\operatorname{sen}\\theta$'],
      ['Entonces el seno de θ es el coseno de 90° − θ.', {}, '$\\operatorname{sen}\\theta = \\cos(90^\\circ - \\theta)$'],
      ['Por eso el **co**seno: el seno del complemento.', {}, '$\\cos 20^\\circ = \\operatorname{sen}70^\\circ$'],
    ], '$\\operatorname{sen}\\theta = \\cos(90^\\circ - \\theta)$.'),
    xpFila('Pon el ángulo que falta.', ['sen 25° = cos', 'cos 48° = sen'], ['65°', '42°'], ['25°', '132°', '52°'], 'Juntos suman 90°.', '$90 - 25$ y $90 - 48$.')],
    ['Ahora sí, un problema', xpFila('Una escalera de 8 m forma 60° con el piso. Pon la altura a la que llega y qué tan lejos está su pie.', ['altura', 'pie'], ['4√3', '4'], ['8√3', '4√2', '2'], '$8\\operatorname{sen}60^\\circ$ y $8\\cos 60^\\circ$.', 'Altura $4\\sqrt3$ y pie a 4 m.')],
  ], 'Dos figuras bastan: medio cuadrado y medio equilátero.');

  // ---------------------------------------------------------------------------------------------------------- trig-42c
  xpLec('trig-42c', [
    ['Las tres volteadas', xpMira('dibujo', 'Empecemos por la idea: hay **seis** razones: tres y sus recíprocas.', { dib: (v, K) => [['sen', 'csc'], ['cos', 'sec'], ['tan', 'cot']].map((r, i) => K.t(90, 50 + i * 42, r[0], 'b ta') + K.f(v.n - i, K.t(170, 50 + i * 42, '↔', 'b tm') + K.t(250, 50 + i * 42, r[1], 'b tf'))).join(''), v: { n: 0 }, alto: 160 }, [
      ['La cosecante voltea al seno.', { n: 1 }, '$\\csc\\theta = \\tfrac{1}{\\operatorname{sen}\\theta}$'],
      ['La secante voltea al **co**seno.', { n: 2 }, '$\\sec\\theta = \\tfrac{1}{\\cos\\theta}$'],
      ['La cotangente voltea a la tangente.', { n: 3 }, '$\\cot\\theta = \\tfrac{1}{\\tan\\theta}$'],
      ['Ojo: van cruzadas, seno con **co**secante.', {}, '$\\operatorname{sen} \\leftrightarrow \\csc$'],
      ['Cada pareja multiplica 1.', {}, '$\\operatorname{sen}\\theta \\cdot \\csc\\theta = 1$'],
    ], 'csc con sen, sec con cos, cot con tan: productos 1.'),
    xpFila('Opuesto 7, adyacente 24, hipotenusa 25. Pon cada razón.', ['csc', 'sec', 'cot'], ['25/7', '25/24', '24/7'], ['7/25', '7/24'], 'Voltea seno, coseno y tangente.', 'Son las recíprocas.')],
    ['De una a todas', xpMira('dibujo', 'Segunda idea: con **una** razón se dibuja el triángulo y salen las demás.', { dib: (v, K) => tri(K, 60, 160, 150, 37, { a: 'θ', ca: v.a, co: v.o, hi: v.h }), v: { a: '', o: '3', h: '' }, alto: 190 }, [
      ['Se sabe que la tangente es tres cuartos.', { a: '4' }, '$\\tan\\theta = \\tfrac34$'],
      ['Opuesto 3, adyacente 4. La hipotenusa, por Pitágoras.', { h: '5' }, '$\\sqrt{9 + 16} = 5$'],
      ['Y ya salen seno y coseno.', {}, '$\\tfrac35, \\tfrac45$'],
      ['Y también todas sus recíprocas.', {}, '$\\tfrac53, \\tfrac54, \\tfrac43$'],
    ], 'Dibuja, completa con Pitágoras y lee.'),
    xpFila('$\\sec\\theta = \\tfrac{17}{15}$, θ agudo. Pon el opuesto, sen y tan.', ['opuesto', 'sen', 'tan'], ['8', '8/17', '8/15'], ['15/17', '15/8', '2'], 'Hipotenusa 17 y adyacente 15.', '$\\sqrt{289 - 225} = 8$.')],
    ['Medir sin tocar', xpMira('dibujo', 'Tercera idea: un ángulo y una distancia **miden lo que no se alcanza**.', { dib: (v, K) => tri(K, 50, 170, 190, v.g, { a: `${Math.round(v.g)}°`, ca: '30 m', co: 'altura', hi: '' }), v: { g: 20 }, alto: 200 }, [
      ['Desde 30 m se mira la punta de un árbol.', {}, '$\\text{ángulo de elevación}$'],
      ['El ángulo se mide desde la horizontal hacia arriba.', { g: 38 }, '$38^\\circ$'],
      ['La altura es 30 por la tangente.', {}, '$h = 30\\tan 38^\\circ$'],
      ['Hacia abajo se llama depresión: es igual visto desde el otro lado.', {}, '$\\text{elevación} = \\text{depresión}$'],
    ], 'Altura = distancia · tan(elevación).'),
    xpFila('A 40 m de una torre la punta se ve a 45°. Pon la altura; y la altura si fuera a 60°.', ['45°', '60°'], ['40', '40√3'], ['20', '20√3', '80'], 'tan 45° = 1 y tan 60° = √3.', '$40 \\cdot 1$ y $40\\sqrt3$.')],
    ['Ahora sí, un problema', xpFila('Desde un faro de 50 m se ve un bote con depresión de 30°. Pon la tangente y la distancia del bote a la base.', ['tan 30°', 'distancia'], ['√3/3', '50√3'], ['√3', '25', '50/√3'], '$\\tan 30^\\circ = \\tfrac{50}{d}$.', '$d = \\tfrac{50}{\\tan 30^\\circ} = 50\\sqrt3$.')],
  ], 'Una razón dibuja el triángulo; un ángulo mide de lejos.');

  // ---------------------------------------------------------------------------------------------------------- trig-3
  xpLec('trig-3', [
    ['El punto que gira', xpMira('dibujo', 'Empecemos por la idea: en la rueda de radio 1, el punto es **(cos, sen)**.', { dib: R, v: { g: 30, p: '', q: '' }, alto: 225 }, [
      ['Un triángulo de hipotenusa 1 dentro de la rueda.', {}, '$r = 1$'],
      ['El cateto horizontal es el coseno; el vertical, el seno.', { p: '(cos, sen)' }, '$(\\cos\\theta, \\operatorname{sen}\\theta)$'],
      ['Así el ángulo puede pasar de 90°.', { g: 130 }, '$\\theta = 130^\\circ$'],
      ['El coseno quedó a la izquierda: es negativo.', { q: 'cos < 0' }, '$\\cos 130^\\circ < 0$'],
      ['Ninguno pasa de 1 ni baja de −1.', { g: 200 }, '$-1 \\le \\operatorname{sen}\\theta \\le 1$'],
    ], 'En radio 1: x es el coseno, y es el seno.'),
    xpMueve('Lleva el punto a donde **cos = −1**.', 290, { g: 30 }, ang(360, 15), { g: 180 }, R, '$\\cos 180^\\circ = -1$.', { lee: v => `$\\theta = ${v.g}^\\circ$` })],
    ['Los cuatro puntos', xpMira('dibujo', 'Segunda idea: en los ejes los valores son **0, 1 o −1**.', { dib: R, v: { g: 0, p: '(1, 0)', q: '' }, alto: 225 }, [
      ['En 0°, el punto es (1, 0).', {}, '$\\cos 0 = 1, \\ \\operatorname{sen}0 = 0$'],
      ['En 90°, arriba: (0, 1).', { g: 90, p: '(0, 1)' }, '$\\operatorname{sen}90^\\circ = 1$'],
      ['En 180° está en (−1, 0).', { g: 180, p: '(−1, 0)' }, '$\\cos 180^\\circ = -1$'],
      ['En 270°, abajo: (0, −1).', { g: 270, p: '(0, −1)' }, '$\\operatorname{sen}270^\\circ = -1$'],
      ['La tangente no existe donde el coseno es 0.', { g: 90, p: '' }, '$\\tan 90^\\circ \\ \\text{no existe}$'],
    ], 'La tangente es seno sobre coseno.'),
    xpFila('Pon cada valor.', ['sen 270°', 'cos 90°', 'tan 180°'], ['−1', '0', '0'], ['1', 'no existe'], 'Mira el punto en la rueda.', '$\\tan 180^\\circ = \\tfrac{0}{-1}$.')],
    ['Simetrías', xpMira('dibujo', 'Tercera idea: los **espejos** de la rueda dan los demás valores.', { dib: R, v: { g: 40, p: '', q: '' }, alto: 225 }, [
      ['Empecemos con el punto de 40°.', {}, '$40^\\circ$'],
      ['Su espejo a la izquierda es 140°: mismo seno, coseno opuesto.', { g: 140 }, '$\\operatorname{sen}140^\\circ = \\operatorname{sen}40^\\circ$'],
      ['El de enfrente es 220°: los dos opuestos.', { g: 220 }, '$\\operatorname{sen}220^\\circ = -\\operatorname{sen}40^\\circ$'],
      ['El de abajo es 320°: mismo coseno.', { g: 320 }, '$\\cos 320^\\circ = \\cos 40^\\circ$'],
      ['Y cada vuelta completa repite todo.', {}, '$\\theta + 360^\\circ$'],
    ], 'Espejos de θ: 180° − θ, 180° + θ y 360° − θ.'),
    xpMueve('Halla el otro ángulo entre 0° y 180° con el **mismo seno** que 60°.', 290, { g: 60 }, ang(180, 15), { g: 120 }, R, '$180^\\circ - 60^\\circ$.', { lee: v => `$\\theta = ${v.g}^\\circ$` })],
    ['Ahora sí, un problema', xpFila('Una rueda de radio 1 empieza a la derecha y gira 210°. Pon x e y del punto.', ['x', 'y'], ['−√3/2', '−1/2'], ['√3/2', '1/2', '−1'], '210° es 180° + 30°: los dos opuestos.', '$\\cos 210^\\circ$ y $\\operatorname{sen}210^\\circ$.')],
  ], 'El punto de la rueda lleva el coseno y el seno.');

  // ---------------------------------------------------------------------------------------------------------- trig-43b
  xpLec('trig-43b', [
    ['Los signos', xpMira('dibujo', 'Empecemos por la idea: el **cuadrante** decide los signos.', { dib: R, v: { g: 50, p: 'I', q: 'todas +' }, alto: 225 }, [
      ['Primero: derecha y arriba. Todo positivo.', {}, '$\\text{I: } +, +$'],
      ['Segundo: izquierda y arriba. Solo el seno.', { g: 130, p: 'II', q: 'sen +' }, '$\\text{II: } -, +$'],
      ['Tercero: izquierda y abajo. Solo la tangente.', { g: 230, p: 'III', q: 'tan +' }, '$\\text{III: } -, -$'],
      ['Cuarto: derecha y abajo. Solo el coseno.', { g: 310, p: 'IV', q: 'cos +' }, '$\\text{IV: } +, -$'],
      ['Todas, seno, tangente, coseno: en orden de giro.', {}, '$\\text{T, S, T, C}$'],
    ], 'I todas; II seno; III tangente; IV coseno.'),
    xpFila('Pon el cuadrante.', ['sen > 0, cos < 0', 'tan > 0, sen < 0', 'cos > 0, tan < 0'], ['II', 'III', 'IV'], ['I'], '¿Derecha o izquierda? ¿Arriba o abajo?', 'Segundo, tercero y cuarto.')],
    ['El ángulo de referencia', xpMira('dibujo', 'Segunda idea: el **de referencia** es lo que falta hasta el eje horizontal.', { dib: R, v: { g: 150, p: '', q: '' }, alto: 225 }, [
      ['150° está a 30° del eje.', { p: 'ref 30°' }, '$180^\\circ - 150^\\circ$'],
      ['El de 240° pasó 60° del eje.', { g: 240, p: 'ref 60°' }, '$240^\\circ - 180^\\circ$'],
      ['A 315° le faltan 45° para la vuelta.', { g: 315, p: 'ref 45°' }, '$360^\\circ - 315^\\circ$'],
      ['El valor es el del ángulo de referencia; el signo, el del cuadrante.', {}, '$\\cos 240^\\circ = -\\cos 60^\\circ$'],
    ], 'Valor del de referencia con el signo del cuadrante.'),
    xpMueve('Lleva el ángulo al **tercer cuadrante** con referencia 30°.', 290, { g: 30 }, ang(360, 15), { g: 210 }, R, '$180^\\circ + 30^\\circ$.', { lee: v => `$\\theta = ${v.g}^\\circ$` })],
    ['De un valor a los demás', xpMira('dibujo', 'Tercera idea: con una razón y el **cuadrante** salen las demás, con su signo.', { dib: (v, K) => P(K, v, ['sen θ = 3/5, cuadrante II', 'cateto: √(25 − 9) = 4', 'cos θ = −4/5', 'tan θ = −3/4'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['El triángulo de referencia es 3, 4, 5.', { n: 2 }, '$3, 4, 5$'],
      ['En el segundo, el coseno es negativo.', { n: 3 }, '$\\cos\\theta = -\\tfrac45$'],
      ['La tangente también es negativa.', { n: 4 }, '$-\\tfrac34$'],
      ['Sin saber el cuadrante habría dos respuestas.', {}, '$\\pm\\tfrac45$'],
    ], 'Triángulo para el tamaño; cuadrante para el signo.'),
    xpFila('$\\cos\\theta = \\tfrac{5}{13}$ en el cuarto. Pon sen y tan.', ['sen', 'tan'], ['−12/13', '−12/5'], ['12/13', '12/5', '−5/12'], 'En el cuarto el seno es negativo.', 'El cateto que falta es 12.')],
    ['Ahora sí, un problema', xpFila('Pon cada valor.', ['sen 330°', 'cos 135°', 'tan 225°'], ['−1/2', '−√2/2', '1'], ['1/2', '√2/2', '−1'], 'Referencias 30°, 45° y 45°.', 'Cada una con el signo de su cuadrante.')],
  ], 'Referencia para el valor, cuadrante para el signo.');

  // ---------------------------------------------------------------------------------------------------------- trig-44a
  const onda = (v, K) => { const p = XM.plano(K, 0, 12.57, -4, 4, { H: 200, g: 1.5708, gy: 1 }); return p.s + XM.curva(K, p, x => v.A * Math.sin(v.w * (x - (v.f || 0))) + v.k) + K.l(18, p.Y(v.k), 322, p.Y(v.k), 'lf d'); };
  xpLec('trig-44a', [
    ['De la rueda a la ola', xpMira('dibujo', 'Empecemos por la idea: la altura del punto que gira **dibuja una ola**.', { dib: (v, K) => { const [px, py] = K.at(70, 110, 54, v.g), q = []; for (let a = 0; a <= v.g; a += 5) q.push([140 + a * 0.5, 110 - 54 * Math.sin(rad(a))]); return K.c(70, 110, 54, 'fn') + K.l(70, 110, px, py, 'la gr') + K.c(px, py, 6, 'fF') + K.l(136, 110, 326, 110, 'lm') + (q.length > 1 ? K.pl(q, 'lf gr') : '') + K.l(px, py, 140 + v.g * 0.5, py, 'lm d'); }, v: { g: 0 }, alto: 190 }, [
      ['Empieza a la derecha, a altura 0.', {}, '$\\operatorname{sen}0 = 0$'],
      ['Un cuarto de vuelta: llega a lo más alto.', { g: 90 }, '$\\operatorname{sen}\\tfrac{\\pi}{2} = 1$'],
      ['Media vuelta: otra vez en 0.', { g: 180 }, '$\\operatorname{sen}\\pi = 0$'],
      ['Tres cuartos: lo más bajo.', { g: 270 }, '$\\operatorname{sen}\\tfrac{3\\pi}{2} = -1$'],
      ['Vuelta completa: la ola se repite.', { g: 360 }, '$2\\pi$'],
    ], 'La gráfica del seno es la altura del punto; se repite cada 2π.'),
    xpFila('Pon la altura del seno en cada momento.', ['1/4 de vuelta', '1/2 vuelta', '3/4 de vuelta'], ['1', '0', '−1'], ['1/2', '2'], 'Arriba, en medio, abajo.', '1, 0 y −1.')],
    ['La amplitud', xpMira('dibujo', 'Segunda idea: la **amplitud** es cuánto se aleja del centro.', { dib: onda, v: { A: 1, w: 1, k: 0 }, alto: 210 }, [
      ['La ola simple sube 1 y baja 1.', {}, '$y = \\operatorname{sen}x$'],
      ['Por 3: sube 3 y baja 3.', { A: 3 }, '$y = 3\\operatorname{sen}x$'],
      ['Con signo menos se voltea, pero la amplitud es 2.', { A: -2 }, '$|{-2}| = 2$'],
      ['El ancho de la ola no cambió.', {}, '$|A|$'],
    ], 'Amplitud: $|A|$, la mitad entre lo más alto y lo más bajo.'),
    xpMueve('Haz que la ola vaya de **−2 a 2** y empiece **bajando**.', 270, { A: 1, w: 1, k: 0 }, [xpRegla('A', -3, 3, 'A')], { A: -2 }, onda, '$y = -2\\operatorname{sen}x$.', { lee: v => `$y = ${v.A}\\operatorname{sen}x$` })],
    ['El centro', xpMira('dibujo', 'Tercera idea: sumar un número **sube toda la ola**.', { dib: onda, v: { A: 1, w: 1, k: 0 }, alto: 210 }, [
      ['La línea del medio está en 0.', {}, '$k = 0$'],
      ['Si se suma 2, sube a 2.', { k: 2 }, '$y = \\operatorname{sen}x + 2$'],
      ['Con amplitud 2 y centro 1, va de −1 a 3.', { A: 2, k: 1 }, '$1 \\pm 2$'],
      ['El centro es el promedio de los extremos.', {}, '$k = \\tfrac{\\max + \\min}{2}$'],
    ], 'Va de $k - |A|$ a $k + |A|$.'),
    xpMueve('Arma una ola que vaya de **−1 a 3**: mueve la amplitud y el centro.', 310, { A: 1, w: 1, k: 0 }, [xpRegla('A', 1, 3, 'amplitud'), xpRegla('k', -1, 2, 'centro')], { A: 2, k: 1 }, onda, '$y = 2\\operatorname{sen}x + 1$.', { lee: v => `$${v.k - v.A} \\ \\text{a} \\ ${v.k + v.A}$` })],
    ['Ahora sí, un problema', xpFila('La marea va de 1 m a 7 m. Pon el centro y la amplitud.', ['centro', 'amplitud'], ['4', '3'], ['6', '8', '7'], 'El promedio; y cuánto se aleja de él.', '$\\tfrac{1+7}{2} = 4$ y $7 - 4 = 3$.')],
  ], 'Amplitud: cuánto se aleja; centro: de dónde.');

  // ---------------------------------------------------------------------------------------------------------- trig-44b
  xpLec('trig-44b', [
    ['El periodo', xpMira('dibujo', 'Empecemos por la idea: el **periodo** es lo que tarda en repetirse.', { dib: onda, v: { A: 2, w: 1, k: 0, f: 0 }, alto: 210 }, [
      ['La ola simple se repite cada 2π.', {}, '$T = 2\\pi$'],
      ['Con 2x adentro va el doble de rápido: cada π.', { w: 2 }, '$T = \\tfrac{2\\pi}{2}$'],
      ['Con x sobre 2, más lento: cada 4π.', { w: 0.5 }, '$T = \\tfrac{2\\pi}{1/2} = 4\\pi$'],
      ['Se divide 2π entre el número que acompaña a la x.', {}, '$T = \\tfrac{2\\pi}{|\\omega|}$'],
    ], '$T = \\tfrac{2\\pi}{|\\omega|}$.'),
    xpMueve('Haz que la ola complete **cuatro** ciclos en el cuadro (de 0 a 4π).', 270, { A: 2, w: 1, k: 0, f: 0 }, [xpRegla('w', 0.5, 3, 'ω', 0.5)], { w: 2 }, onda, 'Cada ciclo mide π: ω = 2.', { lee: v => `$y = 2\\operatorname{sen}(${v.w}x)$` })],
    ['El desfase', xpMira('dibujo', 'Segunda idea: restar adentro **corre la ola** a la derecha.', { dib: onda, v: { A: 2, w: 1, k: 0, f: 0 }, alto: 210 }, [
      ['La ola empieza a subir en 0.', {}, '$y = 2\\operatorname{sen}x$'],
      ['Con x − π/2 empieza a subir en π/2.', { f: 1.5708 }, '$y = 2\\operatorname{sen}(x - \\tfrac{\\pi}{2})$'],
      ['Si hay número adelante, se saca factor antes.', {}, '$2x - \\pi = 2(x - \\tfrac{\\pi}{2})$'],
      ['El coseno es el seno corrido un cuarto hacia la izquierda.', { f: -1.5708 }, '$\\cos x = \\operatorname{sen}(x + \\tfrac{\\pi}{2})$'],
    ], '$A\\operatorname{sen}\\omega(x - c)$: desfase c.'),
    xpFila('$y = 3\\operatorname{sen}(4x - \\pi)$. Pon el periodo y el desfase.', ['periodo', 'desfase'], ['π/2', 'π/4'], ['π', '4', '2π'], '2π entre 4; saca factor 4.', '$4(x - \\tfrac{\\pi}{4})$.')],
    ['La tangente', xpMira('dibujo', 'Tercera idea: la tangente se repite cada **π** y tiene asíntotas.', { dib: (v, K) => { const p = XM.plano(K, -4.7, 4.7, -5, 5, { H: 200, g: 1.5708, gy: 5 }); return p.s + [-1, 0, 1].map(i => K.l(p.X(Math.PI * (i + 0.5)), 8, p.X(Math.PI * (i + 0.5)), 192, 'lf d')).join('').replace(/NaN/g, '0') + XM.curva(K, p, x => { const t = Math.tan(x); return Math.abs(Math.cos(x)) < 0.08 ? NaN : t * v.a; }); }, v: { a: 0.3 }, alto: 210 }, [
      ['Es seno sobre coseno.', { a: 1 }, '$\\tan x = \\tfrac{\\operatorname{sen}x}{\\cos x}$'],
      ['Donde el coseno es 0 hay una asíntota.', {}, '$x = \\tfrac{\\pi}{2} + k\\pi$'],
      ['Entre asíntotas sube siempre.', {}, '$\\text{creciente}$'],
      ['Se repite cada π, no cada 2π.', {}, '$T = \\pi$'],
      ['No tiene amplitud: no hay tope.', {}, '$(-\\infty, \\infty)$'],
    ], 'Tangente: periodo π y asíntotas en $\\tfrac{\\pi}{2} + k\\pi$.'),
    xpFila('Pon el periodo de cada una.', ['tan x', 'tan 2x', 'sen(x/3)'], ['π', 'π/2', '6π'], ['2π', '3π', '2π/3'], 'La tangente usa π; el seno, 2π.', '$\\pi$, $\\tfrac{\\pi}{2}$ y $6\\pi$.')],
    ['Ahora sí, un problema', xpFila('Una noria tarda 8 minutos por vuelta y va de 2 a 18 m. Pon la amplitud y ω.', ['amplitud', 'ω'], ['8', 'π/4'], ['16', '10', 'π/8'], 'La mitad de 16; y 2π entre 8.', '$\\omega = \\tfrac{2\\pi}{8}$.')],
  ], 'Periodo por dentro, desfase con factor; la tangente va cada π.');

  // ---------------------------------------------------------------------------------------------------------- trig-45
  xpLec('trig-45', [
    ['Preguntar por el ángulo', xpMira('dibujo', 'Empecemos por la idea: el inverso pregunta **¿de qué ángulo es?**', { dib: R, v: { g: 30, p: 'sen = 1/2', q: '' }, alto: 225 }, [
      ['Altura un medio. ¿Qué ángulo la da?', {}, '$\\operatorname{sen}\\theta = \\tfrac12$'],
      ['El ángulo de 30° sirve.', {}, '$30^\\circ$'],
      ['Pero 150° también: hay dos, y más con vueltas.', { g: 150 }, '$150^\\circ$'],
      ['Para que haya una sola respuesta se escoge una ventana.', { g: 30 }, '$-90^\\circ \\le \\theta \\le 90^\\circ$'],
      ['Esa respuesta es el arcoseno.', {}, '$\\operatorname{arcsen}\\tfrac12 = 30^\\circ$'],
    ], 'Arcoseno: el ángulo entre −90° y 90° con ese seno.'),
    xpFila('Pon cada ángulo.', ['arcsen 1', 'arcsen (−1/2)', 'arcsen 0'], ['90°', '−30°', '0°'], ['210°', '330°', '180°'], 'La respuesta va de −90° a 90°.', '$-30^\\circ$, no $210^\\circ$.')],
    ['Tres ventanas', xpMira('dibujo', 'Segunda idea: cada inversa tiene **su ventana**.', { dib: (v, K) => XM.rueda(K, 130, 110, 84, v.g, { arco: 0, cs: 0 }) + K.sec(130, 110, 84, v.a, v.b, 'fa') + K.t(240, 70, v.p, 'b ta', 'start'), v: { g: 0, a: -90, b: 90, p: 'arcsen' }, alto: 225 }, [
      ['Arcoseno: el lado derecho.', {}, '$[-90^\\circ, 90^\\circ]$'],
      ['Arcocoseno: la mitad de arriba.', { a: 0, b: 180, p: 'arccos' }, '$[0^\\circ, 180^\\circ]$'],
      ['Arcotangente: el derecho, sin las puntas.', { a: -89, b: 89, p: 'arctan' }, '$(-90^\\circ, 90^\\circ)$'],
      ['Si el coseno es negativo, el arcocoseno cae a la izquierda.', { a: 0, b: 180, g: 120, p: 'arccos' }, '$\\arccos(-\\tfrac12) = 120^\\circ$'],
    ], 'arcsen y arctan: derecha. arccos: arriba.'),
    xpFila('Pon cada ángulo.', ['arccos (−1)', 'arctan 1', 'arccos (−√2/2)'], ['180°', '45°', '135°'], ['0°', '225°', '−45°'], 'Arccos va de 0° a 180°.', 'Cada uno en su ventana.')],
    ['Deshacer con cuidado', xpMira('dibujo', 'Tercera idea: deshace **solo dentro de la ventana**.', { dib: (v, K) => P(K, v, ['arcsen(sen 40°) = 40°', 'arcsen(sen 140°) = 40°', 'cos(arcsen 3/5) = 4/5'], 44, 38), v: { n: 0 }, alto: 150 }, [
      ['40° está en la ventana: vuelve igual.', { n: 1 }, '$40^\\circ$'],
      ['140° no: vuelve el gemelo que sí está.', { n: 2 }, '$180^\\circ - 140^\\circ$'],
      ['Una mezcla se dibuja: seno tres quintos.', {}, '$3, 4, 5$'],
      ['El coseno de ese ángulo es cuatro quintos.', { n: 3 }, '$\\tfrac45$'],
    ], 'Si el ángulo está fuera, cambia por su gemelo.'),
    xpFila('Pon cada resultado.', ['arccos(cos 300°)', 'tan(arccos 5/13)'], ['60°', '12/5'], ['300°', '−60°', '5/12'], '¿Qué ángulo entre 0° y 180° tiene ese coseno?', '$\\cos 300^\\circ = \\cos 60^\\circ$.')],
    ['Ahora sí, un problema', xpFila('Una rampa sube 5 m en 5 m de piso; otra sube $\\sqrt3$ m por cada metro. Pon los ángulos.', ['primera', 'segunda'], ['45°', '60°'], ['30°', '90°', '1°'], 'arctan 1 y arctan √3.', '$\\arctan 1$ y $\\arctan\\sqrt3$.')],
  ], 'La inversa responde con un ángulo de su ventana.');

  // ---------------------------------------------------------------------------------------------------------- trig-4
  xpLec('trig-4', [
    ['Pitágoras en la rueda', xpMira('dibujo', 'Empecemos por la idea: seno y coseno son **catetos de hipotenusa 1**.', { dib: R, v: { g: 35, p: 'c²+s²=1', q: '' }, alto: 225 }, [
      ['El triángulo de la rueda tiene hipotenusa 1.', {}, '$x^2 + y^2 = 1$'],
      ['Con cualquier ángulo se cumple.', { g: 125 }, '$\\cos^2\\theta + \\operatorname{sen}^2\\theta = 1$'],
      ['También abajo: los cuadrados borran el signo.', { g: 250 }, '$(-0.34)^2 + (-0.94)^2 \\approx 1$'],
      ['Conocido uno, sale el otro, salvo el signo.', {}, '$\\operatorname{sen}\\theta = \\pm\\sqrt{1 - \\cos^2\\theta}$'],
    ], '$\\operatorname{sen}^2\\theta + \\cos^2\\theta = 1$.'),
    xpFila('$\\operatorname{sen}\\theta = 0.8$, agudo. Pon $\\operatorname{sen}^2\\theta$, $\\cos^2\\theta$ y $\\cos\\theta$.', ['sen²', 'cos²', 'cos'], ['0.64', '0.36', '0.6'], ['0.2', '0.4', '1.6'], 'Juntos suman 1.', '$1 - 0.64 = 0.36$.')],
    ['Dividir por coseno', xpMira('dibujo', 'Segunda idea: al dividir todo entre cos² nace **otra pitagórica**.', { dib: (v, K) => P(K, v, ['sen² + cos² = 1', 'sen²/cos² + 1 = 1/cos²', 'tan² + 1 = sec²', '1 + cot² = csc²'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Se divide cada término entre coseno al cuadrado.', { n: 2 }, '$\\tfrac{\\operatorname{sen}^2}{\\cos^2} + 1 = \\tfrac{1}{\\cos^2}$'],
      ['Seno sobre coseno es tangente; uno sobre coseno, secante.', { n: 3 }, '$\\tan^2\\theta + 1 = \\sec^2\\theta$'],
      ['Si se divide entre seno al cuadrado, sale la otra.', { n: 4 }, '$1 + \\cot^2\\theta = \\csc^2\\theta$'],
      ['Las tres son la misma, vista de tres maneras.', {}, '$x^2 + y^2 = 1$'],
    ], '$1 + \\tan^2 = \\sec^2$ y $1 + \\cot^2 = \\csc^2$.'),
    xpFila('$\\tan\\theta = 2$. Pon $\\sec^2\\theta$ y $\\cos^2\\theta$.', ['sec²', 'cos²'], ['5', '1/5'], ['3', '1/3', '4'], '1 + tan²; y su recíproco.', '$1 + 4 = 5$.')],
    ['Ángulos negativos', xpMira('dibujo', 'Tercera idea: al girar al revés, **el coseno queda y el seno cambia**.', { dib: R, v: { g: 40, p: '', q: '' }, alto: 225 }, [
      ['Miremos el punto de 40°.', {}, '$40^\\circ$'],
      ['El de −40° es su espejo de abajo.', { g: -40 }, '$-40^\\circ$'],
      ['Mismo x: el coseno es **par**.', {}, '$\\cos(-\\theta) = \\cos\\theta$'],
      ['La altura y se vuelve opuesta: el seno es **impar**.', {}, '$\\operatorname{sen}(-\\theta) = -\\operatorname{sen}\\theta$'],
      ['La tangente también es impar.', {}, '$\\tan(-\\theta) = -\\tan\\theta$'],
    ], 'Coseno par; seno y tangente impares.'),
    xpFila('Si $\\cos\\theta = \\tfrac13$ y $\\operatorname{sen}\\theta = a$, pon cada uno.', ['cos(−θ)', 'sen(−θ)'], ['1/3', '−a'], ['−1/3', 'a', '3'], 'El espejo conserva x y cambia y.', 'Par e impar.')],
    ['Ahora sí, un problema', xpFila('$(1 - \\operatorname{sen}\\theta)(1 + \\operatorname{sen}\\theta)$ se simplifica. Pon el producto y lo que vale con $\\cos\\theta = \\tfrac25$.', ['es igual a', 'vale'], ['cos²θ', '4/25'], ['1', '2/5', '21/25'], 'Diferencia de cuadrados: 1 − sen².', '$\\cos^2\\theta = \\tfrac{4}{25}$.')],
  ], 'Una sola idea, Pitágoras en radio 1, da las identidades.');

  // ---------------------------------------------------------------------------------------------------------- trig-47b
  xpLec('trig-47b', [
    ['Todo en senos y cosenos', xpMira('dibujo', 'Empecemos por la idea: si no se ve el camino, **pasa todo a seno y coseno**.', { dib: (v, K) => P(K, v, ['tan θ · cos θ', '(sen θ / cos θ) · cos θ', 'sen θ'], 44, 38), v: { n: 1 }, alto: 150 }, [
      ['La tangente es seno sobre coseno.', { n: 2 }, '$\\tfrac{\\operatorname{sen}\\theta}{\\cos\\theta}\\cos\\theta$'],
      ['Ahora el coseno se cancela.', { n: 3 }, '$\\operatorname{sen}\\theta$'],
      ['Vale para todo θ donde las dos existan.', {}, '$\\cos\\theta \\neq 0$'],
      ['Eso es una identidad: una igualdad que siempre se cumple.', {}, '$\\tan\\theta\\cos\\theta = \\operatorname{sen}\\theta$'],
    ], 'Cambia tan, cot, sec y csc por senos y cosenos.'),
    xpFila('Simplifica cada una.', ['sec θ · cot θ', 'csc θ · tan θ'], ['csc θ', 'sec θ'], ['1', 'sen θ', 'cos θ'], 'Escribe seno y coseno y cancela.', '$\\tfrac{1}{\\cos}\\tfrac{\\cos}{\\operatorname{sen}}$ y $\\tfrac{1}{\\operatorname{sen}}\\tfrac{\\operatorname{sen}}{\\cos}$.')],
    ['Trabajar un solo lado', xpMira('dibujo', 'Segunda idea: se **transforma el lado largo** hasta llegar al otro.', { dib: (v, K) => P(K, v, ['sec θ − cos θ', '1/cos θ − cos θ', '(1 − cos² θ)/cos θ', 'sen² θ/cos θ = sen θ · tan θ'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Queremos llegar a seno por tangente.', { n: 2 }, '$\\tfrac{1}{\\cos\\theta} - \\cos\\theta$'],
      ['Se suma con denominador común.', { n: 3 }, '$\\tfrac{1 - \\cos^2\\theta}{\\cos\\theta}$'],
      ['Arriba aparece Pitágoras: sen².', { n: 4 }, '$\\tfrac{\\operatorname{sen}^2\\theta}{\\cos\\theta}$'],
      ['No se pasan cosas de un lado al otro: aún no se sabe si son iguales.', {}, '$\\text{un solo lado}$'],
    ], 'Transforma un lado; no pases términos.'),
    xpFila('$\\tfrac{1 - \\operatorname{sen}^2\\theta}{\\cos\\theta}$: pon lo que hay arriba y el resultado.', ['arriba', 'resultado'], ['cos²θ', 'cos θ'], ['sen²θ', '1', 'tan θ'], 'Pitágoras arriba.', '$\\tfrac{\\cos^2\\theta}{\\cos\\theta}$.')],
    ['El conjugado', xpMira('dibujo', 'Tercera idea: con 1 − seno abajo, multiplica por **1 + seno**.', { dib: (v, K) => P(K, v, ['cos θ/(1 − sen θ)', '· (1 + sen θ)/(1 + sen θ)', 'cos θ(1 + sen θ)/cos² θ', '(1 + sen θ)/cos θ'], 34, 34, ''), v: { n: 1 }, alto: 160 }, [
      ['Se multiplica por un uno escogido.', { n: 2 }, '$\\tfrac{1 + \\operatorname{sen}\\theta}{1 + \\operatorname{sen}\\theta}$'],
      ['Abajo queda 1 − sen²: coseno al cuadrado.', { n: 3 }, '$1 - \\operatorname{sen}^2\\theta = \\cos^2\\theta$'],
      ['Por último se cancela un coseno.', { n: 4 }, '$\\tfrac{1 + \\operatorname{sen}\\theta}{\\cos\\theta}$'],
      ['Para negar una identidad basta un ángulo que falle.', {}, '$\\operatorname{sen}2\\theta \\neq 2\\operatorname{sen}\\theta$'],
    ], 'El conjugado hace aparecer Pitágoras; un contraejemplo niega.'),
    xpFila('$(\\sec\\theta - 1)(\\sec\\theta + 1)$: pon el producto y su valor si $\\tan\\theta = 3$.', ['es igual a', 'vale'], ['tan²θ', '9'], ['sec²θ', '3', '10'], 'sec² − 1.', '$\\tan^2\\theta = 9$.')],
    ['Ahora sí, un problema', xpFila('Simplifica $\\tfrac{\\operatorname{sen}\\theta}{\\csc\\theta} + \\tfrac{\\cos\\theta}{\\sec\\theta}$. Pon cada término y la suma.', ['primero', 'segundo', 'suma'], ['sen²θ', 'cos²θ', '1'], ['0', 'sen θ', '2'], 'Dividir entre csc es multiplicar por sen.', '$\\operatorname{sen}^2\\theta + \\cos^2\\theta$.')],
  ], 'Senos y cosenos, un solo lado, Pitágoras y conjugado.');

  // ---------------------------------------------------------------------------------------------------------- trig-48a
  const dosA = (v, K) => { const [ax, ay] = K.at(60, 170, 150, v.a), [bx, by] = K.at(60, 170, 150, v.a + v.b); return K.l(50, 170, 320, 170, 'lm') + K.sec(60, 170, 60, 0, v.a, 'fa') + K.sec(60, 170, 60, v.a, v.a + v.b, 'fg') + K.l(60, 170, ax, ay, 'la gr') + K.l(60, 170, bx, by, 'lf gr') + K.l(bx, by, bx, 170, 'lf d') + K.t(250, 40, v.p || '', 'ta'); };
  xpLec('trig-48a', [
    ['No se reparte', xpMira('dibujo', 'Empecemos por la idea: el seno de una suma **no** es la suma de senos.', { dib: dosA, v: { a: 30, b: 0, p: '' }, alto: 190 }, [
      ['Un ángulo de 30° y otro de 30° encima.', { b: 30 }, '$30^\\circ + 30^\\circ$'],
      ['Juntos, 60°: la altura es 0.87.', { p: 'sen 60° ≈ 0.87' }, '$\\operatorname{sen}60^\\circ = \\tfrac{\\sqrt3}{2}$'],
      ['Sumando los senos daría 1.', { p: '1/2 + 1/2 = 1' }, '$\\operatorname{sen}30^\\circ + \\operatorname{sen}30^\\circ$'],
      ['El segundo ángulo ya no parte de la horizontal: sube menos.', { p: '' }, '$\\operatorname{sen}(a+b) \\neq \\operatorname{sen}a + \\operatorname{sen}b$'],
    ], 'El seno no se distribuye.'),
    xpFila('Pon los dos valores.', ['cos(60° + 30°)', 'cos 60° + cos 30°'], ['0', '1/2 + √3/2'], ['1', '√3'], 'El primero es cos 90°.', 'No son iguales.')],
    ['Las fórmulas', xpMira('dibujo', 'Segunda idea: en el seno se **mezclan**; en el coseno, no.', { dib: (v, K) => P(K, v, ['sen(a + b) = sen a cos b + cos a sen b', 'cos(a + b) = cos a cos b − sen a sen b', 'sen 75° = sen(45° + 30°)', '√2/2 · √3/2 + √2/2 · 1/2'], 34, 34, 's'), v: { n: 0 }, alto: 160 }, [
      ['Seno: cruzados y con el mismo signo.', { n: 1 }, '$\\operatorname{sen}(a \\pm b)$'],
      ['Coseno: iguales y con el signo contrario.', { n: 2 }, '$\\cos(a \\pm b)$'],
      ['75° se arma con 45° y 30°.', { n: 3 }, '$75^\\circ = 45^\\circ + 30^\\circ$'],
      ['Se reemplazan los valores notables.', { n: 4 }, '$\\tfrac{\\sqrt6 + \\sqrt2}{4}$'],
    ], 'Seno cruza y conserva signo; coseno no cruza y lo cambia.'),
    xpFila('$\\cos 75^\\circ = \\cos(45^\\circ + 30^\\circ)$: pon los dos productos y el resultado.', ['cos · cos', 'sen · sen', 'resultado'], ['√6/4', '√2/4', '(√6−√2)/4'], ['(√6+√2)/4', '1/2'], 'El coseno resta.', '$\\tfrac{\\sqrt6 - \\sqrt2}{4}$.')],
    ['La tangente de una suma', xpMira('dibujo', 'Tercera idea: la tangente sale de **dividir** las dos.', { dib: (v, K) => P(K, v, ['tan(a + b) = sen(a+b)/cos(a+b)', '(tan a + tan b)/(1 − tan a tan b)', 'tan 105° = tan(60° + 45°)', '(√3 + 1)/(1 − √3) = −2 − √3'], 34, 34, 's'), v: { n: 1 }, alto: 160 }, [
      ['Se divide todo entre coseno por coseno.', { n: 2 }, '$\\tfrac{\\tan a + \\tan b}{1 - \\tan a\\tan b}$'],
      ['Arriba la suma; abajo, uno menos el producto.', {}, '$\\tan(a + b)$'],
      ['Probemos con 60° y 45°.', { n: 3 }, '$105^\\circ$'],
      ['Da negativo: 105° está en el segundo cuadrante.', { n: 4 }, '$-2 - \\sqrt3$'],
    ], '$\\tan(a \\pm b) = \\tfrac{\\tan a \\pm \\tan b}{1 \\mp \\tan a\\tan b}$.'),
    xpFila('$\\tan a = 2$, $\\tan b = 3$. Pon arriba, abajo y $\\tan(a+b)$.', ['arriba', 'abajo', 'resultado'], ['5', '−5', '−1'], ['6', '7', '1'], 'Uno menos seis.', '$\\tfrac{5}{-5}$.')],
    ['Ahora sí, un problema', xpFila('$\\operatorname{sen}a = \\tfrac35$ y $\\operatorname{sen}b = \\tfrac{5}{13}$, agudos. Pon $\\cos a$, $\\cos b$ y $\\operatorname{sen}(a+b)$.', ['cos a', 'cos b', 'sen(a+b)'], ['4/5', '12/13', '56/65'], ['16/65', '33/65', '3/4'], '$\\tfrac35\\cdot\\tfrac{12}{13} + \\tfrac45\\cdot\\tfrac{5}{13}$.', '$\\tfrac{36 + 20}{65}$.')],
  ], 'Con dos ángulos conocidos se arman otros.');

  // ---------------------------------------------------------------------------------------------------------- trig-48b
  xpLec('trig-48b', [
    ['El doble', xpMira('dibujo', 'Empecemos por la idea: el doble es **la suma consigo mismo**.', { dib: (v, K) => P(K, v, ['sen 2a = sen(a + a)', '= 2 sen a cos a', 'cos 2a = cos² a − sen² a', '= 1 − 2 sen² a = 2 cos² a − 1'], 34, 34, ''), v: { n: 1 }, alto: 160 }, [
      ['Se usa la suma con b igual a a.', { n: 2 }, '$\\operatorname{sen}2a = 2\\operatorname{sen}a\\cos a$'],
      ['El coseno da una resta de cuadrados.', { n: 3 }, '$\\cos 2a = \\cos^2 a - \\operatorname{sen}^2 a$'],
      ['Con Pitágoras tiene otras dos caras.', { n: 4 }, '$1 - 2\\operatorname{sen}^2 a = 2\\cos^2 a - 1$'],
      ['Doblar el ángulo no dobla el seno.', {}, '$\\operatorname{sen}60^\\circ \\neq 2\\operatorname{sen}30^\\circ$'],
    ], '$\\operatorname{sen}2a = 2\\operatorname{sen}a\\cos a$; $\\cos 2a = \\cos^2a - \\operatorname{sen}^2a$.'),
    xpFila('$\\operatorname{sen}a = \\tfrac35$, agudo. Pon $\\cos a$, $\\operatorname{sen}2a$ y $\\cos 2a$.', ['cos a', 'sen 2a', 'cos 2a'], ['4/5', '24/25', '7/25'], ['6/5', '12/25', '8/5'], '$2\\cdot\\tfrac35\\cdot\\tfrac45$ y $\\tfrac{16}{25} - \\tfrac{9}{25}$.', '24/25 y 7/25.')],
    ['La mitad', xpMira('dibujo', 'Segunda idea: de cos 2a se **despeja** la mitad.', { dib: (v, K) => P(K, v, ['cos 2a = 1 − 2 sen² a', 'sen² a = (1 − cos 2a)/2', 'sen² 15° = (1 − cos 30°)/2', '= (2 − √3)/4'], 34, 34, ''), v: { n: 1 }, alto: 160 }, [
      ['Se despeja el seno al cuadrado.', { n: 2 }, '$\\operatorname{sen}^2 a = \\tfrac{1 - \\cos 2a}{2}$'],
      ['El coseno al cuadrado lleva más.', {}, '$\\cos^2 a = \\tfrac{1 + \\cos 2a}{2}$'],
      ['Con a = 15° se usa el coseno de 30°.', { n: 3 }, '$\\cos 30^\\circ = \\tfrac{\\sqrt3}{2}$'],
      ['El signo de la raíz lo da el cuadrante de la mitad.', { n: 4 }, '$\\operatorname{sen}15^\\circ = \\tfrac{\\sqrt{2 - \\sqrt3}}{2}$'],
    ], '$\\operatorname{sen}^2a = \\tfrac{1 - \\cos2a}{2}$, $\\cos^2a = \\tfrac{1 + \\cos2a}{2}$.'),
    xpFila('$\\cos 2a = \\tfrac{7}{25}$, a agudo. Pon $\\operatorname{sen}^2a$ y $\\operatorname{sen}a$.', ['sen² a', 'sen a'], ['9/25', '3/5'], ['16/25', '4/5', '18/25'], 'Uno menos 7/25, la mitad.', '$\\tfrac{18/25}{2}$.')],
    ['Verlo en la rueda', xpMira('dibujo', 'Tercera idea: doblar el ángulo **salta** en la rueda.', { dib: (v, K) => XM.rueda(K, 130, 110, 84, v.g) + (([x, y]) => K.l(130, 110, x, y, 'lf gr') + K.c(x, y, 6, 'fF'))(K.at(130, 110, 84, 2 * v.g)), v: { g: 20 }, alto: 225 }, [
      ['Un radio es a; el rojo, 2a.', {}, '$a, \\ 2a$'],
      ['Con a = 45°, el doble está arriba.', { g: 45 }, '$\\operatorname{sen}90^\\circ = 1$'],
      ['Con 60°, el doble ya tiene coseno negativo.', { g: 60 }, '$\\cos 120^\\circ = -\\tfrac12$'],
      ['Con 90°, el doble está a la izquierda.', { g: 90 }, '$\\cos 180^\\circ = -1$'],
    ], 'El doble puede cambiar de cuadrante y de signo.'),
    xpMueve('Mueve a hasta que $\\operatorname{sen}2a$ sea **1**.', 290, { g: 15 }, ang(90, 15, 'a (grados)'), { g: 45 }, (v, K) => XM.rueda(K, 130, 110, 84, v.g) + (([x, y]) => K.l(130, 110, x, y, 'lf gr') + K.c(x, y, 6, 'fF'))(K.at(130, 110, 84, 2 * v.g)), '$2 \\cdot 45^\\circ = 90^\\circ$.', { lee: v => `$2a = ${2 * v.g}^\\circ$` })],
    ['Ahora sí, un problema', xpFila('El alcance de un tiro depende de $\\operatorname{sen}2a$. Con $\\operatorname{sen}a\\cos a = 0.4$, pon $\\operatorname{sen}2a$; y el ángulo de mayor alcance.', ['sen 2a', 'mejor a'], ['0.8', '45°'], ['0.4', '90°', '0.16'], 'El doble del producto; y sen 2a = 1.', 'Máximo en $2a = 90^\\circ$.')],
  ], 'Doble: suma consigo. Mitad: se despeja.');

  // ---------------------------------------------------------------------------------------------------------- trig-49
  const red = (v, K) => { const p = XM.plano(K, 0, 12.57, -1.6, 1.6, { H: 180, g: 1.5708, gy: 1 }); return p.s + XM.curva(K, p, Math.sin) + K.l(18, p.Y(v.h), 322, p.Y(v.h), 'lf gr') + (Math.abs(v.h) <= 1 ? [Math.asin(v.h), Math.PI - Math.asin(v.h)].flatMap(x => [x, x + 2 * Math.PI, x + 4 * Math.PI]).filter(x => x >= -0.001 && x <= 12.57).map(x => K.c(p.X(x), p.Y(v.h), 5, 'fF')).join('') : ''); };
  xpLec('trig-49', [
    ['Infinitas soluciones', xpMira('dibujo', 'Empecemos por la idea: una recta corta la ola **muchas veces**.', { dib: red, v: { h: 0.5 }, alto: 190 }, [
      ['Seno igual a un medio: cada cruce es una solución.', {}, '$\\operatorname{sen}x = \\tfrac12$'],
      ['En cada ciclo hay dos: 30° y 150°.', {}, '$\\tfrac{\\pi}{6}, \\tfrac{5\\pi}{6}$'],
      ['Las demás se repiten cada vuelta.', {}, '$x = \\tfrac{\\pi}{6} + 2k\\pi$'],
      ['Con 1 solo hay una por ciclo.', { h: 1 }, '$\\operatorname{sen}x = 1$'],
      ['Con más de 1, ninguna.', { h: 1.4 }, '$\\operatorname{sen}x = 1.4 \\ \\text{no}$'],
    ], 'Halla las de un ciclo y suma vueltas.'),
    xpMueve('Sube la recta hasta que haya **una sola** solución por ciclo, arriba.', 250, { h: 0 }, [xpRegla('h', -1, 1.5, 'altura', 0.5)], { h: 1 }, red, 'La recta apenas toca la cresta.', { lee: v => `$\\operatorname{sen}x = ${v.h}$` })],
    ['Despejar primero', xpMira('dibujo', 'Segunda idea: se **despeja la función** y luego se busca el ángulo.', { dib: (v, K) => P(K, v, ['2 cos x + 1 = 0', 'cos x = −1/2', 'x = 120° o 240°'], 44, 38), v: { n: 1 }, alto: 150 }, [
      ['Como si cos x fuera una letra.', { n: 2 }, '$\\cos x = -\\tfrac12$'],
      ['Referencia 60°; el coseno es negativo en II y III.', { n: 3 }, '$120^\\circ, 240^\\circ$'],
      ['Entre 0 y 360 esas son las dos.', {}, '$0 \\le x < 360^\\circ$'],
      ['En general se suman vueltas completas.', {}, '$+\\ 360^\\circ k$'],
    ], 'Despeja, referencia, cuadrantes, vueltas.'),
    xpFila('$2\\operatorname{sen}x - \\sqrt3 = 0$ entre 0° y 360°. Ponlas en orden.', ['menor', 'mayor'], ['60°', '120°'], ['30°', '240°', '150°'], 'sen x = √3/2: primero y segundo.', '60° y 120°.')],
    ['Factorizar', xpMira('dibujo', 'Tercera idea: si hay cuadrados, se **factoriza** como cuadrática.', { dib: (v, K) => P(K, v, ['2 sen² x − sen x = 0', 'sen x (2 sen x − 1) = 0', 'sen x = 0  o  sen x = 1/2', '0°, 180°, 30°, 150°'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['No se divide entre seno: se perderían soluciones.', {}, '$\\operatorname{sen}x \\neq 0 \\ ?$'],
      ['Mejor se saca factor común.', { n: 2 }, '$\\operatorname{sen}x(2\\operatorname{sen}x - 1)$'],
      ['Cada factor da sus ángulos.', { n: 3 }, '$\\operatorname{sen}x = 0, \\tfrac12$'],
      ['Son cuatro en una vuelta.', { n: 4 }, '$0^\\circ, 30^\\circ, 150^\\circ, 180^\\circ$'],
    ], 'Factoriza; si hay dos funciones, déjalas en una.'),
    xpFila('$\\cos^2x = 1$ entre 0° y 360° (sin 360°). Pon cuántas hay y la mayor.', ['cuántas', 'mayor'], ['2', '180°'], ['1', '4', '270°'], 'cos x = 1 o cos x = −1.', '0° y 180°.')],
    ['Ahora sí, un problema', xpFila('Una noria está a $h = 10 + 8\\operatorname{sen}x$. ¿A qué dos ángulos está a 14 m?', ['menor', 'mayor'], ['30°', '150°'], ['60°', '120°', '210°'], '8 sen x = 4.', '$\\operatorname{sen}x = \\tfrac12$.')],
  ], 'Un ciclo, sus dos ángulos y las vueltas.');

  // ---------------------------------------------------------------------------------------------------------- trig-46a
  const T3 = (K, A, B, C, o = {}) => K.p([A, B, C], 'fc') + K.t(A[0] - 10, A[1] + 14, 'A', 's') + K.t(B[0] + 10, B[1] + 14, 'B', 's') + K.t(C[0], C[1] - 8, 'C', 's') + K.t((A[0] + B[0]) / 2, A[1] + 18, o.c || 'c', 's ta') + K.t((B[0] + C[0]) / 2 + 12, (B[1] + C[1]) / 2, o.a || 'a', 's ta', 'start') + K.t((A[0] + C[0]) / 2 - 10, (A[1] + C[1]) / 2, o.b || 'b', 's ta', 'end');
  const osc = (v, K) => { const A = [50, 160], C = [50 + 120 * Math.cos(rad(40)), 160 - 120 * Math.sin(rad(40))], r = v.r, hh = 160 - C[1], d = Math.sqrt(Math.max(0, r * r - hh * hh)); return K.l(30, 160, 330, 160, 'lm') + K.l(...A, ...C, 'la gr') + (r >= hh - 0.01 ? [-d, d].map(q => (C[0] + q > A[0] + 2 ? K.l(C[0], C[1], C[0] + q, 160, 'lf gr') + K.c(C[0] + q, 160, 5, 'fF') : '')).join('') : K.l(C[0], C[1], C[0], C[1] + r, 'lf gr')) + K.t(200, 40, v.p || '', 'ta'); };
  xpLec('trig-46a', [
    ['Cada lado con su ángulo', xpMira('dibujo', 'Empecemos por la idea: la altura une **dos lados con sus ángulos**.', { dib: (v, K) => T3(K, [50, 160], [280, 160], [150, 50]) + K.f(v.h, K.l(150, 50, 150, 160, 'lf gr') + K.t(160, 120, 'h', 'b tf', 'start')), v: { h: 0 }, alto: 190 }, [
      ['Un triángulo cualquiera, sin ángulo recto.', {}, '$A, B, C$'],
      ['Se traza la altura: dos triángulos rectángulos.', { h: 1 }, '$h$'],
      ['Desde A, la altura es b por seno de A.', {}, '$h = b\\operatorname{sen}A$'],
      ['Desde B, es a por seno de B. Es la misma.', {}, '$b\\operatorname{sen}A = a\\operatorname{sen}B$'],
      ['Cada lado sobre el seno de su opuesto da lo mismo.', {}, '$\\tfrac{a}{\\operatorname{sen}A} = \\tfrac{b}{\\operatorname{sen}B} = \\tfrac{c}{\\operatorname{sen}C}$'],
    ], 'Lado sobre seno del ángulo opuesto: igual en los tres.'),
    xpFila('A = 30°, B = 45° y a = 6. Pon C y b.', ['C', 'b'], ['105°', '6√2'], ['75°', '3√2', '12'], 'Suman 180°; $b = \\tfrac{6\\operatorname{sen}45^\\circ}{\\operatorname{sen}30^\\circ}$.', '$12 \\cdot \\tfrac{\\sqrt2}{2}$.')],
    ['Cuándo sirve', xpMira('dibujo', 'Segunda idea: hace falta **una pareja completa**: un lado y su ángulo opuesto.', { dib: (v, K) => T3(K, [50, 160], [280, 160], [150, 50], { a: v.a, b: v.b, c: v.c }) + K.t(170, 24, v.p, 'ta'), v: { a: '?', b: '9', c: '?', p: '' }, alto: 190 }, [
      ['Dos ángulos y un lado: se halla el tercer ángulo y sirve.', { p: 'A, B y un lado ✓' }, '$180^\\circ - A - B$'],
      ['Dos lados y el ángulo opuesto a uno: sirve, con cuidado.', { a: '7', p: 'a, b y A ✓' }, '$\\tfrac{7}{\\operatorname{sen}A}$'],
      ['Dos lados y el ángulo entre ellos: no hay pareja.', { c: '10', a: '?', p: 'b, c y A ✗' }, '$\\text{cosenos}$'],
      ['Con tres lados tampoco hay pareja.', { a: '7', p: 'a, b y c ✗' }, '$\\text{cosenos}$'],
    ], 'Sin pareja lado–opuesto se usa la ley de cosenos.'),
    xpFila('¿Cuál ley? Datos conocidos:', ['A, B, a', 'a, b, C', 'a, b, A'], ['senos', 'cosenos', 'senos'], ['ninguna', 'cosenos'], '¿Hay un lado con su opuesto?', 'En a, b, C no hay pareja.')],
    ['El caso dudoso', xpMira('dibujo', 'Tercera idea: con dos lados y un opuesto puede haber **0, 1 o 2** triángulos.', { dib: osc, v: { r: 60, p: 'no alcanza' }, alto: 180 }, [
      ['El lado rojo cuelga de C. Si es corto, no llega.', {}, '$a < h$'],
      ['Si mide justo la altura, hay uno: rectángulo.', { r: 77.13, p: 'uno' }, '$a = h$'],
      ['Un poco más largo: toca en dos sitios. Dos triángulos.', { r: 95, p: 'dos' }, '$h < a < b$'],
      ['Más largo que b: solo uno.', { r: 140, p: 'uno' }, '$a \\ge b$'],
    ], 'Compara a con la altura $h = b\\operatorname{sen}A$ y con b.'),
    xpFila('A = 30° y b = 16: la altura es 8. ¿Cuántos triángulos?', ['a = 6', 'a = 11', 'a = 20'], ['0', '2', '1'], ['3'], 'Compara con 8 y con 16.', 'No llega; dos; uno.')],
    ['Ahora sí, un problema', xpFila('Desde A y B, a 20 m, se ve un árbol C con A = 45° y B = 105°. Pon C y la distancia AC sobre $\\operatorname{sen}B$.', ['C', '20/sen C'], ['30°', '40'], ['60°', '20', '10'], 'El lado de 20 es opuesto a C.', '$\\tfrac{20}{1/2} = 40$.')],
  ], 'Una pareja completa manda; en el dudoso, mira la altura.');

  // ---------------------------------------------------------------------------------------------------------- trig-46b
  const bis = (v, K) => { const [x, y] = K.at(130, 160, 110, v.g); return K.l(130, 160, 280, 160, 'lg gr') + K.l(130, 160, x, y, 'la gr') + K.l(x, y, 280, 160, 'lf gr') + K.ang([130, 160], [280, 160], [x, y], 26, `${Math.round(v.g)}°`, 'fa') + K.t(240, 60, v.p || '', 'ta'); };
  xpLec('trig-46b', [
    ['Pitágoras con corrección', xpMira('dibujo', 'Empecemos por la idea: la ley de cosenos es **Pitágoras corregido**.', { dib: bis, v: { g: 90, p: '' }, alto: 185 }, [
      ['Con 90° vale Pitágoras.', {}, '$c^2 = a^2 + b^2$'],
      ['Si el ángulo se cierra, el tercer lado se acorta: hay que quitar.', { g: 50 }, '$c^2 < a^2 + b^2$'],
      ['Si se abre, se alarga: hay que agregar.', { g: 130 }, '$c^2 > a^2 + b^2$'],
      ['La corrección es 2ab por el coseno, que cambia de signo en 90°.', {}, '$c^2 = a^2 + b^2 - 2ab\\cos C$'],
    ], '$c^2 = a^2 + b^2 - 2ab\\cos C$.'),
    xpFila('Lados 3 y 8 con 60° entre ellos. Pon $2ab\\cos C$, $c^2$ y c.', ['corrección', 'c²', 'c'], ['24', '49', '7'], ['48', '97', '73'], '2 · 3 · 8 · ½; 9 + 64 − 24.', '$c = 7$.')],
    ['Hallar un ángulo', xpMira('dibujo', 'Segunda idea: con tres lados se **despeja el coseno**.', { dib: (v, K) => P(K, v, ['lados 5, 6 y 7', '49 = 25 + 36 − 60 cos C', 'cos C = 12/60 = 1/5'], 44, 38), v: { n: 1 }, alto: 150 }, [
      ['El lado solo a la izquierda es el opuesto al ángulo buscado.', { n: 2 }, '$7^2 = 5^2 + 6^2 - 2 \\cdot 5 \\cdot 6\\cos C$'],
      ['De ahí se despeja el coseno.', { n: 3 }, '$\\cos C = \\tfrac{12}{60}$'],
      ['Positivo: el ángulo es agudo.', {}, '$C < 90^\\circ$'],
      ['Si sale negativo, es obtuso.', {}, '$C > 90^\\circ$'],
    ], '$\\cos C = \\tfrac{a^2 + b^2 - c^2}{2ab}$.'),
    xpFila('Lados 5, 16 y 19. Para el ángulo opuesto a 19: pon arriba, abajo y el coseno.', ['a²+b²−c²', '2ab', 'cos C'], ['−80', '160', '−1/2'], ['80', '1/2', '642'], '25 + 256 − 361.', 'Ángulo de $120^\\circ$.')],
    ['El área', xpMira('dibujo', 'Tercera idea: el área es **medio lado por lado por seno**.', { dib: bis, v: { g: 30, p: '' }, alto: 185 }, [
      ['La base es un lado; la altura, el otro por el seno.', {}, '$h = a\\operatorname{sen}C$'],
      ['El área es media base por altura.', {}, '$A = \\tfrac12 ab\\operatorname{sen}C$'],
      ['Crece hasta 90° y después baja.', { g: 90 }, '$\\operatorname{sen}90^\\circ = 1$'],
      ['Con 150° vale lo mismo que con 30°.', { g: 150 }, '$\\operatorname{sen}150^\\circ = \\operatorname{sen}30^\\circ$'],
    ], '$A = \\tfrac12 ab\\operatorname{sen}C$; es mayor con 90°.'),
    xpMueve('Abre la bisagra hasta que el área sea la **máxima**.', 250, { g: 30 }, ang(165, 15), { g: 90 }, bis, 'El seno vale 1 en 90°.', { lee: v => `$C = ${v.g}^\\circ$` })],
    ['Ahora sí, un problema', xpFila('Dos caminos de 16 y 10 km salen de un pueblo con 60°. Pon la distancia entre los extremos y el área.', ['distancia', 'área'], ['14', '40√3'], ['196', '80', '2√129'], '256 + 100 − 160; y ½ · 16 · 10 · √3/2.', '$\\sqrt{196}$ y $40\\sqrt3$.')],
  ], 'Pitágoras corregido y el área con seno.');

  // ---------------------------------------------------------------------------------------------------------- trig-151
  const Z = (v, K) => { const p = XM.plano(K, -6.6, 6.6, -4, 4, { H: 200 }), x = v.r * Math.cos(rad(v.g)), y = v.r * Math.sin(rad(v.g)); const u = (p.X(1) - p.X(0)), w = (p.Y(0) - p.Y(1)); return p.s + `<ellipse class="xl lm d" cx="${p.X(0)}" cy="${p.Y(0)}" rx="${XPK.n(v.r * u)}" ry="${XPK.n(v.r * w)}"/>` + K.l(p.X(x), p.Y(0), p.X(x), p.Y(y), 'lf') + K.ar(p.X(0), p.Y(0), p.X(x), p.Y(y), 'la gr') + K.t(14, 24, v.p || '', 'b ta', 'start'); };
  xpLec('trig-151', [
    ['Distancia y giro', xpMira('dibujo', 'Empecemos por la idea: un complejo se dice con **cuánto** y **hacia dónde**.', { dib: Z, v: { r: 2, g: 0, p: '' }, alto: 210 }, [
      ['Hay dos maneras de llegar a un punto: cuadras o distancia y dirección.', {}, '$a + bi$'],
      ['La distancia es el módulo r.', { r: 3 }, '$r = |z|$'],
      ['La dirección es el argumento θ.', { g: 60, p: '60°' }, '$\\theta = 60^\\circ$'],
      ['Sus cuadras salen con coseno y seno.', {}, '$a = r\\cos\\theta, \\ b = r\\operatorname{sen}\\theta$'],
      ['Esa es la llamada forma polar.', {}, '$z = r(\\cos\\theta + i\\operatorname{sen}\\theta)$'],
    ], '$z = r(\\cos\\theta + i\\operatorname{sen}\\theta) = r\\operatorname{cis}\\theta$.'),
    xpMueve('Lleva la flecha a $3\\operatorname{cis}135^\\circ$.', 300, { r: 1, g: 0, p: '' }, [xpRegla('r', 1, 4, 'módulo'), xpRegla('g', 0, 315, 'ángulo', 45)], { r: 3, g: 135 }, Z, 'Distancia 3, dirección 135°.', { lee: v => `$${v.r}\\operatorname{cis}${v.g}^\\circ$` })],
    ['De cuadras a polar', xpMira('dibujo', 'Segunda idea: **Pitágoras** da el módulo y el **cuadrante** corrige el ángulo.', { dib: Z, v: { r: 2.83, g: 45, p: '2 + 2i' }, alto: 210 }, [
      ['2 + 2i: módulo raíz de 8, ángulo 45°.', {}, '$\\sqrt{4 + 4} = 2\\sqrt2$'],
      ['El −2 + 2i tiene el mismo módulo.', { g: 135, p: '−2 + 2i' }, '$2\\sqrt2$'],
      ['La calculadora da −45°, pero está en el segundo: es 135°.', {}, '$180^\\circ - 45^\\circ$'],
      ['Dibuja siempre antes de escribir el ángulo.', {}, '$\\tan\\theta = \\tfrac{b}{a}$'],
    ], '$r = \\sqrt{a^2 + b^2}$; θ con el cuadrante.'),
    xpFila('$z = -\\sqrt3 + i$. Pon el módulo y el argumento.', ['módulo', 'argumento'], ['2', '150°'], ['4', '−30°', '30°'], '3 + 1; está en el segundo, referencia 30°.', '$2\\operatorname{cis}150^\\circ$.')],
    ['De polar a cuadras', xpMira('dibujo', 'Tercera idea: para volver se **multiplica** por coseno y seno.', { dib: Z, v: { r: 4, g: 60, p: '4 cis 60°' }, alto: 210 }, [
      ['Cuatro en dirección 60°.', {}, '$4\\operatorname{cis}60^\\circ$'],
      ['Horizontal: 4 por un medio.', {}, '$4 \\cdot \\tfrac12 = 2$'],
      ['Vertical: 4 por raíz de tres medios.', {}, '$4 \\cdot \\tfrac{\\sqrt3}{2} = 2\\sqrt3$'],
      ['Sumar vueltas no cambia el número.', {}, '$60^\\circ + 360^\\circ = 420^\\circ$'],
    ], '$a = r\\cos\\theta$ y $b = r\\operatorname{sen}\\theta$.'),
    xpFila('$6\\operatorname{cis}120^\\circ$: pon la parte real y la imaginaria.', ['real', 'imaginaria'], ['−3', '3√3'], ['3', '−3√3', '6'], 'Segundo cuadrante: coseno −½.', '$-3 + 3\\sqrt3\\,i$.')],
    ['Ahora sí, un problema', xpFila('Un barco está 5 al este y 5 al sur del puerto: $5 - 5i$. Pon la distancia y la dirección (0° a 360°).', ['distancia', 'dirección'], ['5√2', '315°'], ['10', '45°', '225°'], 'Cuarto cuadrante, referencia 45°.', '$5\\sqrt2\\operatorname{cis}315^\\circ$.')],
  ], 'Cuánto y hacia dónde: módulo y argumento.');

  // ---------------------------------------------------------------------------------------------------------- trig-152
  const mul = (v, K) => { const p = XM.plano(K, -7.8, 7.8, -5, 5, { H: 210 }), q = (r, g) => [p.X(r * Math.cos(rad(g))), p.Y(r * Math.sin(rad(g)))]; return p.s + K.ar(p.X(0), p.Y(0), ...q(v.r, v.g), 'la gr') + K.ar(p.X(0), p.Y(0), ...q(v.s, v.h), 'lf gr') + K.t(14, 24, v.p || '', 'b ta', 'start'); };
  xpLec('trig-152', [
    ['Multiplicar es girar y estirar', xpMira('dibujo', 'Empecemos por la idea: los módulos **se multiplican** y los ángulos **se suman**.', { dib: mul, v: { r: 2, g: 30, s: 2, h: 30, p: '' }, alto: 220 }, [
      ['Empezamos en 2 cis 30°.', {}, '$2\\operatorname{cis}30^\\circ$'],
      ['Multiplicar por 2 cis 60°: primero gira 60°.', { h: 90 }, '$30^\\circ + 60^\\circ$'],
      ['Y además se estira al doble.', { s: 4 }, '$2 \\cdot 2 = 4$'],
      ['El producto: 4 cis 90°, que es 4i.', { p: '4 cis 90°' }, '$4\\operatorname{cis}90^\\circ = 4i$'],
      ['Dividir hace lo contrario: divide y resta.', {}, '$\\tfrac{r_1}{r_2}\\operatorname{cis}(\\theta_1 - \\theta_2)$'],
    ], 'Producto: módulos por, ángulos más. Cociente: entre y menos.'),
    xpMueve('Lleva la flecha roja al producto de $2\\operatorname{cis}45^\\circ$ por $2\\operatorname{cis}90^\\circ$.', 310, { r: 2, g: 45, s: 2, h: 45, p: '' }, [xpRegla('s', 1, 5, 'módulo'), xpRegla('h', 0, 315, 'ángulo', 45)], { s: 4, h: 135 }, mul, '$4\\operatorname{cis}135^\\circ$.', { lee: v => `$${v.s}\\operatorname{cis}${v.h}^\\circ$` })],
    ['Potencias: De Moivre', xpMira('dibujo', 'Segunda idea: elevar es **multiplicar muchas veces** por el mismo.', { dib: mul, v: { r: 1.5, g: 30, s: 1.5, h: 30, p: 'z' }, alto: 220 }, [
      ['Aquí está z, con ángulo 30°.', {}, '$z = r\\operatorname{cis}30^\\circ$'],
      ['Al cuadrado: 60° y módulo al cuadrado.', { s: 2.25, h: 60, p: 'z²' }, '$r^2\\operatorname{cis}60^\\circ$'],
      ['Al cubo: 90° y módulo al cubo.', { s: 3.375, h: 90, p: 'z³' }, '$r^3\\operatorname{cis}90^\\circ$'],
      ['En general, n veces el ángulo.', {}, '$z^n = r^n\\operatorname{cis}(n\\theta)$'],
      ['Los puntos dibujan una espiral.', { s: 5, h: 120, p: 'z⁴' }, '$z^4$'],
    ], '$(r\\operatorname{cis}\\theta)^n = r^n\\operatorname{cis}(n\\theta)$.'),
    xpFila('$(2\\operatorname{cis}20^\\circ)^5$: pon el módulo y el ángulo.', ['módulo', 'ángulo'], ['32', '100°'], ['10', '25°', '160°'], '2 a la 5; cinco veces 20°.', '$32\\operatorname{cis}100^\\circ$.')],
    ['Cuando conviene', xpMira('dibujo', 'Tercera idea: para potencias grandes, **pasa a polar**.', { dib: (v, K) => P(K, v, ['(1 + i)⁸', '√2 cis 45°', '(√2)⁸ cis 360°', '16'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Multiplicar ocho veces sería largo.', {}, '$(1 + i)^8$'],
      ['En polar: raíz de dos, 45°.', { n: 2 }, '$\\sqrt2\\operatorname{cis}45^\\circ$'],
      ['Módulo a la 8 es 16; ocho veces 45 es 360.', { n: 3 }, '$16\\operatorname{cis}360^\\circ$'],
      ['Una vuelta completa: es el número 16.', { n: 4 }, '$16$'],
    ], 'Polar, De Moivre y volver.'),
    xpFila('$(1 + i)^4$: pon el módulo, el ángulo y el resultado.', ['módulo', 'ángulo', 'resultado'], ['4', '180°', '−4'], ['2', '45°', '4i'], '(√2)⁴ y 4 · 45°.', '$4\\operatorname{cis}180^\\circ = -4$.')],
    ['Ahora sí, un problema', xpFila('Un engranaje multiplica por $3\\operatorname{cis}40^\\circ$ en cada paso. Tras 3 pasos, pon el estiramiento y el giro.', ['estira', 'gira'], ['27', '120°'], ['9', '43°', '64°'], '3 al cubo; tres veces 40°.', '$27\\operatorname{cis}120^\\circ$.')],
  ], 'Multiplicar gira y estira; elevar lo repite.');

  // ---------------------------------------------------------------------------------------------------------- trig-153
  const flor = (v, K) => { const n = Math.round(v.n); return K.c(120, 110, 80, 'fn') + Array.from({ length: n }, (_, k) => { const [x, y] = K.at(120, 110, 80, v.a + 360 * k / n); return K.l(120, 110, x, y, 'la') + K.c(x, y, 7, k ? 'fG' : 'fF'); }).join('') + K.l(20, 110, 225, 110, 'lm') + K.t(240, 70, v.p || '', 'ta', 'start'); };
  xpLec('trig-153', [
    ['Deshacer la potencia', xpMira('dibujo', 'Empecemos por la idea: la raíz **parte el ángulo** y saca raíz del módulo.', { dib: (v, K) => P(K, v, ['w³ = 8 cis 60°', 'módulo: raíz cúbica de 8 = 2', 'ángulo: 60° ÷ 3 = 20°', 'w = 2 cis 20°'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Buscamos w que al cubo dé 8 cis 60°.', {}, '$w^3 = z$'],
      ['El módulo: la raíz cúbica de 8.', { n: 2 }, '$\\sqrt[3]{8} = 2$'],
      ['El ángulo: la tercera parte.', { n: 3 }, '$60^\\circ \\div 3 = 20^\\circ$'],
      ['Esa es una raíz. Pero no la única.', { n: 4 }, '$2\\operatorname{cis}20^\\circ$'],
    ], 'Primera raíz: $\\sqrt[n]{r}\\operatorname{cis}\\tfrac{\\theta}{n}$.'),
    xpFila('Una raíz cuarta de $16\\operatorname{cis}80^\\circ$: pon módulo y ángulo.', ['módulo', 'ángulo'], ['2', '20°'], ['4', '320°', '40°'], 'Raíz cuarta de 16; la cuarta parte de 80.', '$2\\operatorname{cis}20^\\circ$.')],
    ['Las hermanas', xpMira('dibujo', 'Segunda idea: hay **n raíces**, repartidas como pétalos.', { dib: flor, v: { n: 1, a: 20, p: '' }, alto: 220 }, [
      ['60° y 420° son la misma dirección.', {}, '$60^\\circ + 360^\\circ$'],
      ['420 entre 3 es 140: otra raíz, a 120° de la primera.', { n: 3, p: '3 raíces' }, '$140^\\circ$'],
      ['La tercera, a otros 120°: 260°.', {}, '$260^\\circ$'],
      ['La siguiente sería 380°: ya es la primera.', {}, '$380^\\circ = 20^\\circ$'],
      ['Con n raíces, la separación es 360 entre n.', { n: 5, p: '5 raíces' }, '$\\tfrac{360^\\circ}{n}$'],
    ], 'n raíces separadas $\\tfrac{360^\\circ}{n}$ en un círculo de radio $\\sqrt[n]{r}$.'),
    xpMueve('Pon las raíces **octavas** con la primera en 10°.', 310, { n: 2, a: 0, p: '' }, [xpRegla('n', 2, 8, 'cuántas raíces'), xpRegla('a', 0, 60, 'primera (grados)', 10)], { n: 8, a: 10 }, flor, 'Ocho raíces, cada 45°.', { lee: v => `$\\tfrac{360^\\circ}{${v.n}}$` })],
    ['Las raíces de 1', xpMira('dibujo', 'Tercera idea: las raíces de 1 hacen un **polígono regular**.', { dib: (v, K) => flor(v, K) + K.f(v.l, K.p(Array.from({ length: Math.max(3, Math.round(v.n)) }, (_, k) => K.at(120, 110, 80, 360 * k / Math.max(3, Math.round(v.n)))), 'fa')), v: { n: 2, a: 0, p: '', l: 0 }, alto: 220 }, [
      ['Las raíces cuadradas de 1 son 1 y −1.', {}, '$\\pm1$'],
      ['Las cúbicas forman un triángulo.', { n: 3, l: 1 }, '$0^\\circ, 120^\\circ, 240^\\circ$'],
      ['Cuartas: un cuadrado, con i y −i.', { n: 4 }, '$1, i, -1, -i$'],
      ['Si se suman todas, dan 0: se equilibran.', {}, '$1 + i - 1 - i = 0$'],
    ], 'Las raíces de 1 son los vértices de un polígono y suman 0.'),
    xpFila('Raíces cuadradas de $-9 = 9\\operatorname{cis}180^\\circ$: pon el módulo y los ángulos.', ['módulo', 'menor', 'mayor'], ['3', '90°', '270°'], ['9', '180°', '45°'], 'La mitad de 180; y media vuelta más.', '$3i$ y $-3i$.')],
    ['Ahora sí, un problema', xpFila('Resuelve $z^3 = 27$: pon el módulo y los ángulos de las tres, en orden.', ['módulo', '1.ª', '2.ª', '3.ª'], ['3', '0°', '120°', '240°'], ['9', '90°', '180°'], '27 tiene ángulo 0°.', '3, $3\\operatorname{cis}120^\\circ$ y $3\\operatorname{cis}240^\\circ$.')],
  ], 'n raíces: un círculo repartido en partes iguales.');
}
