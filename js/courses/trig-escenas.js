// Trigonometría: ejercicios con las escenas de la explicación (spec 2026-11-25-explora-algebra-trigonometria). Va después de
// sin-escribir.js: quita «arma la cuenta», «escala la solución», «ordena» y los juegos repetidos de cada lección, y pone los nuevos
// antes del juego que cierra. Los juegos están en js/games/trig-escena.js.
const TRIG_ESCENAS = (() => {
  const E = (game, q, params, explain, hint) => ({ ...play(game, q, { mira: hint, ok: 'Esa era la idea.', ...params }, explain, { hint }) });
  // Fichas: [rótulos], [buenas], [sobran]
  const C = (game, q, et, metas, sobra, explain, hint, x = {}) => E(game, q, { et, metas, fichas: [...metas, ...sobra], mira: metas.map(() => hint), trampas: {}, ...x }, explain, hint);
  const r = (metas, x = {}) => ({ metas, ...x });
  return {
    'trig-41a': [
      E('coterminal-rueda', 'Un ángulo de **−165°** termina en un punto de la rueda. Lleva el punto hasta allá.', r([195]), '$-165^\\circ + 360^\\circ = 195^\\circ$: los dos terminan en el mismo lugar.', 'El signo menos gira hacia el otro lado. ¿En qué cuadrante acaba si vas hacia abajo?'),
      E('radianes-rueda', 'Lleva el punto al ángulo de $\\tfrac{7\\pi}{6}$ radianes.', r([210]), '$\\pi$ es media vuelta: $\\tfrac{7}{6} \\cdot 180^\\circ = 210^\\circ$.', 'Un sexto de π son 30 grados. Cuenta cuántos sextos hay.'),
      C('grados-radianes', 'Pasa cada ángulo a radianes.', ['72°', '108°', '−40°'], ['2π/5', '3π/5', '−2π/9'], ['5π/2', '5π/3', '2π/9'], 'Se multiplica por $\\tfrac{\\pi}{180}$: $\\tfrac{72\\pi}{180} = \\tfrac{2\\pi}{5}$.', 'Cada ángulo es una fracción de 180. Simplifica esa fracción y ponle π.', { g: 72 }),
      C('vueltas-sobran-trig', 'A **1100°** se le quitan todas las vueltas completas que caben. ¿Cuántas son y cuántos grados quedan?', ['vueltas', 'queda'], ['3', '20'], ['2', '380', '30'], '$3 \\cdot 360 = 1080$ y sobran $20^\\circ$.', 'Cada vuelta son 360 grados. Quita todas las que quepan enteras.', { g: 360, cap: '1100°' }),
    ],
    'trig-41b': [
      E('sector-fraccion', 'Pinta el sector que es **cinco doceavos** del disco.', { ks: [['g', 0, 360, 'ángulo', 30]], v: { g: 30 }, meta: { g: 150 } }, '$\\tfrac{5}{12} \\cdot 360^\\circ = 150^\\circ$ de la vuelta.', 'Un doceavo de vuelta son 30 grados. Cuenta cuántos necesitas.'),
      E('vuelta-arco', 'Una rueda de radio 1 rueda hasta que su arco mide $\\tfrac{4\\pi}{3}$. Lleva el punto al ángulo que giró.', r([240]), 'Con radio 1 el arco es el ángulo: $\\tfrac{4\\pi}{3} = 240^\\circ$.', 'Con radio 1, el arco y el ángulo en radianes miden lo mismo.'),
      C('arco-cuenta', 'Un péndulo de 60 cm barre **30°**. Pon el ángulo en radianes y el arco en centímetros.', ['radianes', 'arco'], ['π/6', '10π'], ['π/3', '1800', '20π'], '$s = r\\theta = 60 \\cdot \\tfrac{\\pi}{6} = 10\\pi$.', 'Primero pasa los grados a radianes; luego, radio por ángulo.', { g: 30, cap: '30°' }),
      C('velocidad-cuenta', 'Una rueda de 2 m de radio da **3 vueltas** por minuto. Pon cuántos radianes y cuántos metros por minuto recorre el borde.', ['rad/min', 'm/min'], ['6π', '12π'], ['3π', '6', '24π'], 'Cada vuelta son $2\\pi$: $\\omega = 6\\pi$ y $v = r\\omega = 12\\pi$.', 'Cada vuelta tiene dos pi radianes; la velocidad del borde es radio por eso.', { g: 360, cap: '3 vueltas' }),
    ],
    'trig-1': [
      E('catetos-razon', 'Mueve los catetos hasta que la **tangente** de θ sea $\\tfrac{4}{7}$.', { ks: [['x', 2, 12, 'adyacente'], ['y', 2, 8, 'opuesto']], v: { x: 4, y: 4 }, meta: { x: 7, y: 4 } }, 'Tangente es opuesto sobre adyacente: 4 sobre 7.', 'La tangente compara el cateto de enfrente con el de al lado, en ese orden.'),
      C('lados-nombra', 'Triángulo de lados 20, 21 y 29. Desde θ, el opuesto es el **20**. Pon los otros.', ['adyacente', 'hipotenusa'], ['21', '29'], ['20', '41'], 'La hipotenusa es el lado más largo y el adyacente, el cateto que queda.', '¿Cuál lado mira al ángulo recto? El otro cateto está al lado de θ.', { t: { co: '20' } }),
      C('razones-tres', 'Opuesto 33, adyacente 56, hipotenusa 65. Pon cada razón de θ.', ['sen', 'cos', 'tan'], ['33/65', '56/65', '33/56'], ['65/33', '56/33'], 'SOH, CAH y TOA: cada razón con sus dos lados.', 'Seno y coseno llevan abajo la hipotenusa. La tangente no la usa.', { t: { co: '33', ca: '56', hi: '65' } }),
      E('escalera-apoya', 'La altura a la que llega una escalera es la **mitad** de su largo. Inclínala.', { ks: [['g', 15, 75, 'ángulo con el piso', 15]], v: { g: 75 }, meta: { g: 30 } }, '$\\operatorname{sen}30^\\circ = \\tfrac12$: la altura es la mitad de la hipotenusa.', 'Altura sobre escalera es el seno. ¿De qué ángulo notable el seno es un medio?'),
    ],
    'trig-2': [
      E('notables-rueda', 'Marca los **dos** ángulos del primer cuadrante con $\\operatorname{sen} = \\tfrac{\\sqrt2}{2}$ y con $\\operatorname{sen} = \\tfrac{\\sqrt3}{2}$.', r([45, 60], { ini: [15, 75] }), 'El de 45° viene del medio cuadrado y el de 60°, del medio equilátero.', 'Uno sale de partir un cuadrado y otro, de partir un triángulo equilátero.'),
      C('recta-notables', 'El triángulo de **60°** tiene adyacente 5. Pon el opuesto y la hipotenusa.', ['opuesto', 'hipotenusa'], ['5√3', '10'], ['5√2', '10√3', '5'], 'En 30–60 los lados son 1, √3 y 2: aquí, por 5.', 'Frente a 60° está la raíz de tres veces el lado corto; la hipotenusa es su doble.', { t: { a: '60°', ca: '5', b: 64, h: 110 } }),
      C('recta-mitad', 'La diagonal de una cancha cuadrada mide **14√2** m. Pon el lado y el perímetro.', ['lado', 'perímetro'], ['14', '56'], ['28', '14√2', '196'], 'La diagonal es lado por √2: el lado mide 14.', 'La diagonal de un cuadrado es el lado por raíz de dos.', { t: { a: '45°', hi: '14√2', b: 110, h: 110 } }),
      E('mirador', 'Desde **50 m**, la altura de una torre es justo de 50 m. Inclina la mirada.', { d: 50, ks: [['g', 15, 60, 'elevación', 15]], v: { g: 15 }, meta: { g: 45 } }, '$\\tan 45^\\circ = 1$: altura y distancia iguales.', 'Altura sobre distancia da 1. ¿De qué ángulo notable es la tangente 1?'),
    ],
    'trig-42c': [
      C('seis-razones', 'Opuesto 5, adyacente 12, hipotenusa 13. Pon las recíprocas.', ['csc', 'sec', 'cot'], ['13/5', '13/12', '12/5'], ['5/13', '5/12'], 'Son seno, coseno y tangente dados vuelta.', 'Cosecante voltea al seno; secante, al coseno; cotangente, a la tangente.', { t: { co: '5', ca: '12', hi: '13' } }),
      C('de-una-todas', 'θ es agudo y $\\cot\\theta = \\tfrac{45}{28}$. Pon la hipotenusa y el seno.', ['hipotenusa', 'sen'], ['53', '28/53'], ['73', '45/53', '53/28'], 'Adyacente 45 y opuesto 28: $\\sqrt{2025 + 784} = 53$.', 'La cotangente es adyacente sobre opuesto. Completa con Pitágoras.', { t: { ca: '45', co: '28' } }),
      C('depresion-faro', 'Desde una torre de 60 m se ve un auto con depresión de **45°**; otro, con **30°**. Pon la distancia de cada uno a la base.', ['a 45°', 'a 30°'], ['60', '60√3'], ['30', '20√3', '120'], 'Distancia es altura entre tangente: $\\tfrac{60}{1}$ y $\\tfrac{60}{\\sqrt3/3} = 60\\sqrt3$.', 'La depresión es igual al ángulo en el auto. Altura sobre distancia es su tangente.', { t: { co: '60' } }),
    ],
    'trig-3': [
      E('punto-unidad', 'Lleva el punto a donde está $\\left(\\tfrac12, -\\tfrac{\\sqrt3}{2}\\right)$.', r([300]), 'Coseno $\\tfrac12$ y seno negativo: $300^\\circ$.', 'Derecha y abajo. ¿Qué ángulo notable tiene coseno un medio?'),
      E('gemelos-seno', 'Marca los **dos** ángulos cuya altura es la línea punteada: $\\operatorname{sen}\\theta = -\\tfrac12$.', r([210, 330], { linea: ['y', -0.5] }), 'Referencia 30° por debajo del eje: 210° y 330°.', 'Los dos puntos están a la misma altura, uno a cada lado.'),
      C('valores-eje', 'Pon el valor en los ejes.', ['cos 270°', 'sen 450°', 'tan 360°'], ['0', '1', '0'], ['−1', 'no existe'], 'Los puntos son (0, −1), (0, 1) y (1, 0).', 'Quita vueltas. La x es el coseno; la altura, el seno; la tangente los divide.', { gs: [270, 90] }),
      E('gemelos-coseno', 'Marca los **dos** ángulos sobre la línea vertical: $\\cos\\theta = \\tfrac{\\sqrt2}{2}$.', r([45, 315], { linea: ['x', 0.707], ini: [90, 180] }), 'Mismo coseno: un ángulo y su espejo de abajo.', 'El espejo sobre el eje horizontal conserva x.'),
    ],
    'trig-43b': [
      E('cuadrante-referencia', 'Lleva el punto al ángulo del **cuarto cuadrante** con referencia **60°**.', r([300]), '$360^\\circ - 60^\\circ = 300^\\circ$.', 'Desde el eje derecho, baja lo que diga la referencia.'),
      C('signo-valor', 'Pon cada valor con su signo.', ['cos 150°', 'sen 225°', 'tan 300°'], ['−√3/2', '−√2/2', '−√3'], ['√3/2', '√3', '√2/2'], 'Referencias 30°, 45° y 60° con el signo del cuadrante.', 'Halla la referencia y después mira si ese lado es positivo en el cuadrante.', { gs: [150, 225, 300] }),
      C('referencia-valor', '$\\tan\\theta = \\tfrac{8}{15}$ y θ está en el **tercer** cuadrante. Pon sen y cos.', ['sen', 'cos'], ['−8/17', '−15/17'], ['8/17', '15/17', '−8/15'], 'Hipotenusa 17; en el tercero, los dos negativos.', 'Arma el triángulo con Pitágoras y luego mira los signos del tercer cuadrante.', { gs: [208] }),
    ],
    'trig-44a': [
      E('ola-amplitud', 'Ajusta la ola para que toque justo las **dos líneas** y empiece **subiendo**.', { franja: [3, -3], ks: [['A', -4, 4, 'A']], v: { A: 1 }, meta: { A: 3 } }, 'Va de −3 a 3: amplitud 3, y empieza subiendo con signo positivo.', 'La amplitud es lo que se aleja del centro. Un signo menos la voltearía.'),
      E('ola-centro', 'Lleva la ola hasta que quede entre **las dos líneas** (arriba 1, abajo −3).', { franja: [1, -3], ks: [['A', 1, 3, 'amplitud'], ['k', -2, 2, 'centro']], v: { A: 1, k: 0 }, meta: { A: 2, k: -1 } }, 'Centro $\\tfrac{1 - 3}{2} = -1$ y amplitud $1 - (-1) = 2$.', 'El centro es el promedio de los extremos; la amplitud, de ahí hasta el tope.'),
      C('lee-ola', 'Lee la ola del dibujo: pon su máximo, su mínimo y su amplitud.', ['máximo', 'mínimo', 'amplitud'], ['−1', '−3', '1'], ['−2', '2', '3'], 'Se mueve alrededor de −2 y se aleja 1: de −3 a −1.', 'Mira el punto más alto y el más bajo; la amplitud es la mitad de lo que los separa. Cada raya vale 1.', { o: { A: 1, k: -2 } }),
      C('ficha-ola', 'La ola $y = -2\\operatorname{sen}x - 1$ está dibujada. Pon su amplitud, su centro y su máximo.', ['amplitud', 'centro', 'máximo'], ['2', '−1', '1'], ['−2', '3', '−3'], 'La amplitud es $|{-2}| = 2$; el máximo, $-1 + 2 = 1$.', 'La amplitud nunca es negativa. Al centro se le suma para hallar el máximo.', { o: { A: -2, k: -1 } }),
    ],
    'trig-44b': [
      E('ola-periodo', 'Haz que la ola coincida con la **sombra**: mueve ω.', { sombra: 1, ks: [['w', 0.5, 3, 'ω', 0.5]], v: { A: 2, w: 1 }, meta: { w: 1.5 } }, 'En 4π caben tres ciclos: cada uno mide $\\tfrac{4\\pi}{3}$ y $\\omega = 1.5$.', 'Cuenta cuántos ciclos completos hace la sombra en el cuadro, que mide 4π.'),
      E('ola-desfase', 'La sombra es la misma ola **corrida**. Mueve cuánto: cada paso es un cuarto de π, cerca de 0.79.', { sombra: 1, ks: [['f', 0, 3.1415926, 'corrimiento', 0.78539815]], v: { A: 2, w: 1, f: 0 }, meta: { f: 2.356 } }, 'Se corrió $\\tfrac{3\\pi}{4}$ hacia la derecha.', 'Mira dónde empieza a subir la sombra y llévala hasta allí.'),
      C('lee-periodo', 'Lee la ola: pon el periodo, ω y la amplitud. Cada columna mide π/2.', ['periodo', 'ω', 'amplitud'], ['3π', '2/3', '3'], ['2π', '3/2', '6'], 'Un ciclo ocupa seis columnas: 3π, y $\\omega = \\tfrac{2\\pi}{3\\pi} = \\tfrac23$.', 'Mide una ola completa en columnas y divide 2π entre ese largo.', { o: { A: 3, w: 2 / 3 } }),
      C('ficha-desfase', '$y = 2\\operatorname{sen}(3x - \\pi)$ se escribe $2\\operatorname{sen}\\,3(x - \\square)$. Pon el desfase y el periodo.', ['desfase', 'periodo'], ['π/3', '2π/3'], ['π', '3π', '6π'], 'Se saca factor 3: $3(x - \\tfrac{\\pi}{3})$; y $T = \\tfrac{2\\pi}{3}$.', 'Saca el 3 de los dos términos antes de leer el desfase.', { o: { A: 2, w: 3, f: 1.047 } }),
    ],
    'trig-45': [
      E('arco-inverso', 'Lleva el punto a $\\arccos\\left(-\\tfrac{\\sqrt3}{2}\\right)$.', r([150]), 'El arcocoseno responde entre 0° y 180°: 150°.', 'La respuesta tiene que estar en la mitad de arriba.'),
      C('rango-inversa', 'Pon cada ángulo, en su ventana.', ['arcsen(√3/2)', 'arctan(−1)', 'arccos 0'], ['60°', '−45°', '90°'], ['120°', '135°', '0°'], 'arcsen y arctan van de −90° a 90°; arccos, de 0° a 180°.', 'Pregunta de qué ángulo es ese valor y escoge el de la ventana.', { cap: '¿de qué ángulo?' }),
      C('triangulo-inversa', '¿Cuánto valen $\\cos(\\operatorname{arcsen}\\tfrac{20}{29})$ y $\\tan(\\operatorname{arcsen}\\tfrac{20}{29})$?', ['cos', 'tan'], ['21/29', '20/21'], ['29/21', '21/20', '20/29'], 'El ángulo tiene opuesto 20 e hipotenusa 29: adyacente 21.', 'Dibuja el triángulo de ese ángulo y completa con Pitágoras.', { t: { co: '20', hi: '29' } }),
      C('deshace-inversa', 'Deshacer solo funciona dentro de la ventana. Pon cada resultado.', ['arcsen(sen 70°)', 'arcsen(sen 110°)', 'arccos(cos 200°)'], ['70°', '70°', '160°'], ['110°', '200°', '−20°'], '110° tiene el mismo seno que 70°, y 200° el mismo coseno que 160°.', 'Si el ángulo está fuera de la ventana, busca el gemelo que sí está.', { cap: 'deshacer' }),
    ],
    'trig-4': [
      E('pitagoras-uno', '$\\cos^2\\theta$ vale **0.28**. Mueve $\\operatorname{sen}^2\\theta$ (en centésimas) hasta que se cumpla Pitágoras.', { cs: 28, ks: [['s', 0, 100, 'centésimas', 4]], v: { s: 0 }, meta: { s: 72 } }, '$0.72 + 0.28 = 1$: juntos siempre hacen uno.', 'Los dos cuadrados juntos tienen que completar 1.'),
      E('secante-barra', '$\\tan^2\\theta = 6$. Mueve $\\sec^2\\theta$ hasta que sea la suma correcta.', { t: 6, ks: [['s', 1, 10, 'sec²']], v: { s: 1 }, meta: { s: 7 } }, '$\\sec^2\\theta = 1 + \\tan^2\\theta = 7$.', 'La secante al cuadrado es la tangente al cuadrado y algo más.'),
      E('negativo-espejo', 'El punto de **150°** tiene un espejo: lleva el punto a **−150°**.', r([210]), 'El ángulo negativo es el espejo de abajo: termina donde $-150^\\circ + 360^\\circ = 210^\\circ$.', 'Girar al revés refleja sobre el eje horizontal.'),
      C('par-impar', '$\\cos\\theta = \\tfrac{5}{13}$ y $\\operatorname{sen}\\theta = \\tfrac{12}{13}$. Pon los valores en −θ.', ['cos(−θ)', 'sen(−θ)', 'tan(−θ)'], ['5/13', '−12/13', '−12/5'], ['−5/13', '12/13', '12/5'], 'El coseno es par; seno y tangente, impares.', 'El espejo de abajo conserva x y cambia el signo de y.', { gs: [67, 293] }),
    ],
    'trig-47b': [
      C('simplifica-senos', 'Pasa todo a seno y coseno y simplifica.', ['cot θ · sen θ', 'cos θ · csc θ'], ['cos θ', 'cot θ'], ['sen θ', '1', 'tan θ'], '$\\tfrac{\\cos}{\\operatorname{sen}}\\operatorname{sen} = \\cos$ y $\\cos \\cdot \\tfrac{1}{\\operatorname{sen}} = \\cot$.', 'Escribe cada una con seno y coseno; después cancela o reconoce el cociente.', { cap: 'todo en sen y cos' }),
      C('demuestra-pasos', '$\\csc\\theta - \\operatorname{sen}\\theta$ con denominador sen θ: pon lo de arriba y el resultado.', ['arriba', 'resultado'], ['cos²θ', 'cos θ · cot θ'], ['1', 'sen²θ', 'tan θ'], '$\\tfrac{1 - \\operatorname{sen}^2}{\\operatorname{sen}} = \\tfrac{\\cos^2}{\\operatorname{sen}}$.', 'Uno menos seno al cuadrado es una identidad conocida.', { cap: 'csc θ − sen θ' }),
      C('conjugado-trig', '$\\tfrac{1}{1 - \\cos\\theta}$ por su conjugado: pon arriba y abajo.', ['arriba', 'abajo'], ['1 + cos θ', 'sen²θ'], ['1 − cos θ', 'cos²θ', '1'], '$(1 - \\cos)(1 + \\cos) = 1 - \\cos^2 = \\operatorname{sen}^2$.', 'El conjugado tiene el signo contrario; abajo queda una diferencia de cuadrados.', { cap: '1 / (1 − cos θ)' }),
      C('reemplaza-identidad', 'Con $\\operatorname{sen}^2\\theta = \\tfrac{1}{4}$, pon el valor de cada una.', ['cos²θ', 'csc²θ', 'cot²θ'], ['3/4', '4', '3'], ['1/4', '1/3', '2'], '$1 - \\tfrac14$, $\\tfrac{1}{1/4}$ y $4 - 1$.', 'Usa Pitágoras, la recíproca y después csc² menos 1.', { cap: 'sen²θ = 1/4' }),
    ],
    'trig-48a': [
      E('suma-angulos', 'El primer ángulo es de **90°**. Agrega el que hace falta para llegar a **135°**.', { a: 90, ks: [['b', 0, 90, 'segundo ángulo', 15]], v: { b: 0 }, meta: { b: 45 } }, '$135^\\circ = 90^\\circ + 45^\\circ$: dos conocidos.', 'Resta para saber cuánto falta: debe salir un ángulo notable.'),
      E('resta-angulos', 'Quita a **60°** el ángulo notable que deja **15°**.', { a: 60, ks: [['b', 0, 60, 'se quita', 15]], v: { b: 0 }, meta: { b: 45 } }, '$15^\\circ = 60^\\circ - 45^\\circ$.', 'Piensa cuánto hay entre 60 y 15.'),
      C('suma-formula', '$\\operatorname{sen}15^\\circ = \\operatorname{sen}(45^\\circ - 30^\\circ)$: pon los dos productos que se restan.', ['sen·cos', 'cos·sen'], ['√6/4', '√2/4'], ['1/2', '√3/2', '√8/4'], '$\\tfrac{\\sqrt2}{2}\\cdot\\tfrac{\\sqrt3}{2} - \\tfrac{\\sqrt2}{2}\\cdot\\tfrac12 = \\tfrac{\\sqrt6 - \\sqrt2}{4}$.', 'El seno cruza: seno por coseno, y coseno por seno.', { ops: ['−'], cap: 'sen(45° − 30°)' }),
      C('suma-tangente', '$\\tan a = \\tfrac12$ y $\\tan b = \\tfrac13$. Pon arriba, abajo y $\\tan(a + b)$.', ['arriba', 'abajo', 'resultado'], ['5/6', '5/6', '1'], ['1/6', '7/6', '2/5'], '$\\tfrac12 + \\tfrac13 = \\tfrac56$ y $1 - \\tfrac16 = \\tfrac56$: el cociente es 1.', 'Arriba la suma; abajo, uno menos el producto.', { cap: 'tan(a + b)' }),
    ],
    'trig-48b': [
      E('doble-vuelta', 'El punto está en **75°**. Llévalo al **doble** de ese ángulo.', r([150], { ini: [75] }), '$2 \\cdot 75^\\circ = 150^\\circ$: cambió de cuadrante.', 'Suma el ángulo consigo mismo.'),
      E('mitad-angulo', 'El radio amarillo está en **210°**. Pon el otro en la **mitad** de ese ángulo.', { g: 210, ks: [['m', 0, 180, 'mitad', 15]], v: { m: 0 }, meta: { m: 105 } }, 'La mitad de 210° es 105°, en el segundo cuadrante.', 'La mitad de un ángulo del tercer cuadrante no está en el tercero.'),
      C('doble-cuenta', '$\\cos a = \\tfrac{8}{17}$, a agudo. Pon sen a, sen 2a y cos 2a.', ['sen a', 'sen 2a', 'cos 2a'], ['15/17', '240/289', '−161/289'], ['161/289', '30/17', '120/289'], '$2 \\cdot \\tfrac{15}{17} \\cdot \\tfrac{8}{17}$ y $\\tfrac{64 - 225}{289}$.', 'El doble del producto; y coseno al cuadrado menos seno al cuadrado.', { cap: 'cos a = 8/17' }),
      C('mitad-cuenta', '$\\cos 2a = -\\tfrac{1}{9}$, a agudo. Pon sen²a, cos²a y tan²a.', ['sen²a', 'cos²a', 'tan²a'], ['5/9', '4/9', '5/4'], ['1/9', '10/9', '4/5'], '$\\tfrac{1 + 1/9}{2} = \\tfrac59$ y $\\tfrac{1 - 1/9}{2} = \\tfrac49$.', 'Seno al cuadrado lleva uno menos; coseno al cuadrado, uno más; y la mitad.', { cap: 'cos 2a = −1/9' }),
    ],
    'trig-49': [
      E('corta-ola', 'Mueve la recta hasta que haya **una sola** solución por ciclo y esté **abajo**.', { ks: [['h', -1.5, 1.5, 'altura', 0.5]], v: { h: 0 }, meta: { h: -1 } }, '$\\operatorname{sen}x = -1$ toca solo el valle de cada ciclo.', 'La recta debe rozar la ola sin cruzarla, en la parte baja.'),
      E('pareja-ecuacion', 'Marca las **dos** soluciones de $2\\cos x + \\sqrt3 = 0$ en una vuelta.', r([150, 210]), '$\\cos x = -\\tfrac{\\sqrt3}{2}$: referencia 30° a la izquierda.', 'Despeja el coseno y mira de qué lado de la rueda es negativo.'),
      C('despeja-trig', '$4\\operatorname{sen}^2x - 3 = 0$: pon sen²x, la referencia y cuántas soluciones hay en una vuelta.', ['sen²x', 'referencia', 'cuántas'], ['3/4', '60°', '4'], ['2', '30°', '4/3'], '$\\operatorname{sen}x = \\pm\\tfrac{\\sqrt3}{2}$: una por cuadrante.', 'El cuadrado permite dos signos: piensa en los cuatro cuadrantes.', { cap: '4 sen²x − 3 = 0' }),
      C('factoriza-trig', '$2\\cos^2x + \\cos x = 0$: pon los dos valores de cos x, el mayor primero.', ['uno', 'otro'], ['0', '−1/2'], ['1/2', '1', '−2'], '$\\cos x(2\\cos x + 1) = 0$.', 'Saca factor común: cada factor puede ser cero.', { cap: '2 cos²x + cos x = 0' }),
    ],
    'trig-46a': [
      E('angulo-tercero', 'En un triángulo, A = 47° y B = 68°. Mueve C hasta completar.', { A: 47, B: 68, ks: [['C', 20, 100, 'C (grados)', 5]], v: { C: 20 }, meta: { C: 65 } }, '$180 - 47 - 68 = 65$.', 'Los tres ángulos juntos llenan 180 grados.'),
      E('cuelga-lado', 'Con A = 30° y b = 12, mueve a hasta que haya **un triángulo rectángulo**.', { b: 12, ks: [['a', 3, 14, 'lado a']], v: { a: 3 }, meta: { a: 6 } }, 'La altura es $12\\operatorname{sen}30^\\circ = 6$: el lado cae derecho.', 'El lado que cuelga debe medir justo la altura: b por el seno de 30°.'),
      C('senos-ley', 'A = 45°, B = 60° y a = 4. Pon C y b.', ['C', 'b'], ['75°', '2√6'], ['105°', '4√3', '2√3'], '$b = \\tfrac{4\\operatorname{sen}60^\\circ}{\\operatorname{sen}45^\\circ} = 4\\cdot\\tfrac{\\sqrt3}{\\sqrt2} = 2\\sqrt6$.', 'Primero el ángulo que falta; luego, lado sobre seno de su opuesto.', { a: '4', b: 'b' }),
      C('senos-pareja', '¿Con qué ley se empieza? Datos: **a, B, C**; **a, b, c**; **b, c, A**.', ['a, B, C', 'a, b, c', 'b, c, A'], ['senos', 'cosenos', 'cosenos'], ['ninguna', 'senos'], 'Con dos ángulos sale el tercero y hay pareja; en las otras no hay ángulo opuesto conocido.', 'Busca si puedes tener un lado y su ángulo opuesto.', { a: 'a', b: 'b', c: 'c' }),
    ],
    'trig-46b': [
      E('abre-bisagra', 'Lados 6 y 6. Abre el ángulo hasta que el tercer lado mida también **6**.', { a: 6, b: 6, ks: [['g', 15, 150, 'ángulo', 15]], v: { g: 15 }, meta: { g: 60 } }, 'Tres lados iguales: cada ángulo mide 60°.', '¿Qué triángulo tiene los tres lados iguales? ¿Cuánto miden sus ángulos?'),
      E('area-bisagra', 'Lados 5 y 8. Abre el ángulo, **más de 90°**, para que el área sea la **misma que con 45°**.', { a: 5, b: 8, ks: [['g', 30, 165, 'ángulo', 15]], v: { g: 45 }, meta: { g: 135 } }, '$\\operatorname{sen}135^\\circ = \\operatorname{sen}45^\\circ$: la misma altura.', 'Busca el ángulo obtuso que tiene el mismo seno.'),
      C('cosenos-ley', 'Lados 7 y 8 con **120°** entre ellos. Pon $-2ab\\cos C$, c² y c.', ['corrección', 'c²', 'c'], ['56', '169', '13'], ['−56', '57', '113'], '$49 + 64 + 56 = 169$: el ángulo obtuso agrega.', 'El coseno de 120° es menos un medio: la corrección suma.', { a: '7', b: '8', c: 'c' }),
      C('cosenos-angulo', 'Lados 3, 5 y 7. Para el ángulo opuesto a **7**, pon a² + b² − c², 2ab y el coseno.', ['a²+b²−c²', '2ab', 'cos'], ['−15', '30', '−1/2'], ['15', '1/2', '83'], '$9 + 25 - 49 = -15$ y $-\\tfrac{15}{30} = -\\tfrac12$.', 'El lado que se resta es el opuesto al ángulo buscado.', { a: '3', b: '5', c: '7' }),
      C('area-senos', 'Lados 6 y 10 con **30°** entre ellos. Pon la altura sobre el 10 y el área.', ['altura', 'área'], ['3', '15'], ['6', '30', '5'], 'Altura $6\\operatorname{sen}30^\\circ = 3$; área $\\tfrac12\\cdot10\\cdot3$.', 'La altura es un lado por el seno; el área, media base por altura.', { an: 30, a: '6', c: '10' }),
    ],
    'trig-151': [
      E('argumento-plano', 'Lleva el radio a la dirección del número $-1 - i$.', r([225]), 'Está en el tercer cuadrante, a 45° del eje: 225°.', 'Izquierda y abajo por igual. ¿Cuánto se pasó de media vuelta?'),
      E('polar-flecha', 'Lleva la flecha hasta el punto amarillo, $-4i$: pon módulo y ángulo.', { pto: [0, -4], ks: [['r', 1, 5, 'módulo'], ['g', 0, 330, 'ángulo', 30]], v: { r: 2, g: 30 }, meta: { r: 4, g: 270 } }, '$-4i = 4\\operatorname{cis}270^\\circ$.', 'El módulo es la distancia al centro; el ángulo se cuenta desde la derecha.'),
      C('componentes-polar', '$10\\operatorname{cis}150^\\circ$: pon la parte real y la imaginaria.', ['real', 'imaginaria'], ['−5√3', '5'], ['5√3', '−5', '10'], '$10\\cos150^\\circ = -5\\sqrt3$ y $10\\operatorname{sen}150^\\circ = 5$.', 'Segundo cuadrante: la parte real es negativa. Referencia 30°.', { t: { a: '30°', hi: '10' } }),
      C('modulo-argumento', '$z = 3 - 3\\sqrt3\\,i$: pon el módulo y el argumento entre 0° y 360°.', ['módulo', 'argumento'], ['6', '300°'], ['36', '60°', '240°'], '$\\sqrt{9 + 27} = 6$; cuarto cuadrante con referencia 60°.', 'Pitágoras para el módulo; dibuja el cuadrante antes de decir el ángulo.', { cap: '3 − 3√3 i' }),
    ],
    'trig-152': [
      E('producto-polar', 'z (amarillo) es $2\\operatorname{cis}30^\\circ$. Lleva la flecha a $z \\cdot 2\\operatorname{cis}120^\\circ$.', { z: [2, 30], ks: [['r', 1, 5, 'módulo'], ['g', 0, 330, 'ángulo', 30]], v: { r: 1, g: 0 }, meta: { r: 4, g: 150 } }, 'Módulos: $2 \\cdot 2 = 4$. Ángulos: $30^\\circ + 120^\\circ$.', 'Los módulos se multiplican y los ángulos se suman.'),
      E('cociente-polar', 'z es $4\\operatorname{cis}210^\\circ$. Lleva la flecha a $z \\div 2\\operatorname{cis}60^\\circ$.', { z: [4, 210], ks: [['r', 1, 5, 'módulo'], ['g', 0, 330, 'ángulo', 30]], v: { r: 1, g: 0 }, meta: { r: 2, g: 150 } }, 'Módulos: $4 \\div 2 = 2$. Ángulos: $210^\\circ - 60^\\circ$.', 'Dividir hace lo contrario de multiplicar.'),
      E('demoivre-rueda', 'w tiene módulo 1 y ángulo **75°**. Lleva el punto a $w^4$.', r([300], { ini: [75] }), '$4 \\cdot 75^\\circ = 300^\\circ$.', 'Elevar repite el giro tantas veces como diga el exponente.'),
      C('potencia-polar', '$(\\sqrt3 + i)^3$: pon el módulo, el ángulo y el resultado.', ['módulo', 'ángulo', 'resultado'], ['8', '90°', '8i'], ['2', '30°', '−8'], '$2\\operatorname{cis}30^\\circ$ al cubo es $8\\operatorname{cis}90^\\circ = 8i$.', 'Pasa a polar; el módulo al cubo y tres veces el ángulo.', { cap: '(√3 + i)³' }),
    ],
    'trig-153': [
      E('raiz-primera', 'Lleva el punto a la primera raíz **cuarta** de $\\operatorname{cis}240^\\circ$.', r([60]), '$240^\\circ \\div 4 = 60^\\circ$.', 'La raíz parte el ángulo en tantas partes como el índice.'),
      E('raices-opuestas', 'Marca las **dos** raíces cuadradas de $\\operatorname{cis}150^\\circ$.', r([75, 255], { ini: [15, 120] }), 'La mitad de 150° y media vuelta más.', 'Una es la mitad del ángulo; la otra está enfrente.'),
      E('petalos', 'Arma las raíces **sextas** de un número cuya primera raíz está en **40°**.', { ks: [['n', 2, 8, 'cuántas raíces'], ['a', 0, 60, 'primera', 10]], v: { n: 2, a: 0 }, meta: { n: 6, a: 40 } }, 'Seis raíces, cada $60^\\circ$, empezando en $40^\\circ$.', 'El índice dice cuántas son; la primera ya la conoces.'),
      C('raices-ordenadas', 'Raíces cúbicas de $8\\operatorname{cis}90^\\circ$: pon el módulo y los tres ángulos en orden.', ['módulo', '1.ª', '2.ª', '3.ª'], ['2', '30°', '150°', '270°'], ['8', '90°', '120°'], '$90 \\div 3 = 30$ y luego cada $120^\\circ$.', 'Parte el ángulo en tres y después suma un tercio de vuelta.', { cap: 'w³ = 8 cis 90°' }),
    ],
  };
})();
{
  const FUERA = ['arma-la-cuenta', 'escala-solucion', 'ordena-terminos', 'une-parejas'];
  for (const l of COURSE_TRIG.units.flatMap(u => u.lessons)) {
    const vistos = new Set(), fin = l.ex.at(-1), base = l.ex.slice(0, -1).filter(e => !FUERA.includes(e.game) && e.type === 'play' && e.game !== fin.game && !vistos.has(e.game) && vistos.add(e.game));
    l.ex = [...base, ...(TRIG_ESCENAS[l.id] || []), fin];
  }
}
