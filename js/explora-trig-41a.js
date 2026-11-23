// Trigonometría · trig-41a «Grados y radianes»: explicación interactiva (spec 2026-11-23-explora-leccion-interactiva; motor en
// js/explora.js, escena «angulo» en js/explora-angulo.js). Mismo formato que pu-cm-1 y alg-0a: cada capítulo abre con una
// explicación que corre sola, sigue «tu turno» y el problema va al final. Los ejemplos no salen en los ejercicios de la
// lección (5π/6, −3π/4, 5π/3, 405°, −210°, 765°, −300°…) y no se dice cuántos grados mide un radián: eso lo calcula un ejercicio.
EXPLORA['trig-41a'] = {
  caps: ['Un ángulo es un giro', 'Grados', 'Radianes', 'Convertir', 'Coterminales', 'Ahora sí, un problema'],
  pasos: [
    // ---- Un ángulo es un giro ----
    { cap: 0, tipo: 'muestra', escena: 'angulo', en: { etq: 'grados' },
      texto: 'Empecemos por la idea: un ángulo **mide un giro**. Mira la rueda.',
      momentos: [
        { de: 0, a: 0, cuenta: '$\\theta = 0^\\circ$', dice: 'Todo empieza en el eje x positivo. Esa raya fija es el **lado inicial**.' },
        { de: 0, a: 120, ms: 1800, cuenta: '$\\theta = 120^\\circ$', dice: 'El **lado terminal** gira. Contra las agujas del reloj, el ángulo es **positivo**.' },
        { de: 120, a: -75, ms: 2400, cuenta: '$\\theta = -75^\\circ$', dice: 'Si gira como las agujas del reloj, el ángulo es **negativo**: la espiral cambia de color.' },
        { de: -75, a: -75, cuenta: '$\\theta = -75^\\circ$', dice: 'Vértice en el origen y lado inicial sobre el semieje x positivo: así es un ángulo en **posición estándar**.' },
      ],
      idea: 'Un ángulo mide un giro desde el eje x positivo: contra el reloj es positivo; a favor del reloj, negativo.' },
    { cap: 0, tipo: 'angulo', etq: 'grados', meta: -60,
      texto: '**Tu turno.** Arrastra el lado terminal para girar 60° como las agujas del reloj.',
      idea: 'Girar 60° a favor del reloj es $-60^\\circ$.' },

    // ---- Grados ----
    { cap: 1, tipo: 'muestra', escena: 'angulo', en: { etq: 'grados' },
      texto: 'La primera forma de medir: **en grados**.',
      momentos: [
        { de: 0, a: 360, ms: 3200, cuenta: '$360^\\circ$', dice: 'Una vuelta completa mide **360°**: la espiral da la vuelta entera.' },
        { de: 360, a: 180, ms: 2000, cuenta: '$180^\\circ$', dice: 'Media vuelta mide 180°: el lado terminal apunta justo al lado contrario.' },
        { de: 180, a: 90, ms: 1500, cuenta: '$90^\\circ$', dice: 'Un cuarto de vuelta mide 90°: es un ángulo recto, como la esquina de una hoja.' },
        { de: 90, a: 90, cuenta: '$90^\\circ$', dice: '¿Por qué 360? Se atribuye a los babilonios: 360 se reparte en partes iguales de muchas formas.' },
      ],
      idea: 'Una vuelta mide $360^\\circ$, media vuelta $180^\\circ$ y un cuarto de vuelta $90^\\circ$.' },
    { cap: 1, tipo: 'angulo', etq: 'grados', meta: 270,
      texto: '**Tu turno.** Gira tres cuartos de vuelta contra las agujas del reloj.',
      idea: 'Tres cuartos de 360° son $270^\\circ$.' },

    // ---- Radianes ----
    { cap: 2, tipo: 'muestra', escena: 'angulo', en: { etq: 'rad' },
      texto: 'La segunda forma de medir usa **el radio** del círculo: el **radián**.',
      momentos: [
        { de: 0, a: 0, radio: true, etiqueta: '', dice: 'Este es el radio, en dorado: la distancia del centro al borde del círculo.' },
        { de: 0, a: 180 / Math.PI, ms: 2200, radio: true, arco: true, etiqueta: '1 rad', cuenta: '$\\theta = 1 \\text{ rad}$', dice: 'Giramos hasta que el arco recorrido mida lo mismo que el radio. Ese ángulo es **un radián**.' },
        { de: 180 / Math.PI, a: 180, ms: 3000, radios: true, etiqueta: 'π rad', cuenta: '$180^\\circ = \\pi \\text{ rad}$', dice: '¿Cuántos radios caben en media vuelta? Tres… y un poquito más: exactamente π, unos 3.14.' },
        { de: 180, a: 360, ms: 3000, radios: true, etiqueta: '2π rad', cuenta: '$360^\\circ = 2\\pi \\text{ rad}$', dice: 'Una vuelta completa son 2π radianes: un poco más de seis radios alrededor.' },
        { de: 360, a: 90, ms: 2400, cuenta: '$90^\\circ = \\tfrac{\\pi}{2} \\text{ rad}$', dice: 'Los ángulos de todos los días son fracciones de vuelta: por eso en radianes llevan π. Un cuarto de vuelta es π/2.' },
      ],
      idea: 'Un **radián** es el ángulo cuyo arco mide lo mismo que el radio. Media vuelta son $\\pi$ radianes.' },
    { cap: 2, tipo: 'angulo', etq: 'rad', meta: 45,
      texto: '**Tu turno.** Gira hasta $\\tfrac{\\pi}{4}$: la mitad de un cuarto de vuelta.',
      idea: '$\\tfrac{\\pi}{4}$ es la mitad de $\\tfrac{\\pi}{2}$: $45^\\circ$.' },

    // ---- Convertir ----
    { cap: 3, tipo: 'muestra', escena: 'angulo', en: { etq: 'ambos' },
      texto: 'Ahora, cómo **pasar de una medida a la otra**.',
      momentos: [
        { de: 0, a: 180, ms: 2000, cuenta: '$180^\\circ = \\pi \\text{ rad}$', dice: 'La llave: media vuelta mide 180° y también π radianes. Las dos cosas son lo mismo.' },
        { de: 180, a: 60, ms: 1800, cuenta: '$60^\\circ \\cdot \\tfrac{\\pi}{180} = \\tfrac{\\pi}{3}$', dice: 'De grados a radianes: multiplica por π/180. Así, 60° son π/3.' },
        { de: 60, a: 225, ms: 2000, cuenta: '$\\tfrac{5\\pi}{4} \\cdot \\tfrac{180}{\\pi} = 225^\\circ$', dice: 'De radianes a grados: multiplica por 180/π. Así, 5π/4 son 225°.' },
        { de: 225, a: 225, cuenta: '$\\tfrac{5\\pi}{4} = 5 \\cdot 45^\\circ = 225^\\circ$', dice: 'Truco: piensa π como 180°. Entonces π/4 son 45°, y 5π/4 son cinco veces 45°.' },
      ],
      idea: 'Como $180^\\circ = \\pi$ rad: de grados a radianes se multiplica por $\\tfrac{\\pi}{180}$, y al revés por $\\tfrac{180}{\\pi}$.' },
    { cap: 3, tipo: 'angulo', etq: 'grados', meta: 330, pista: 'Piensa π como 180°: π/6 son 30°, y 11π/6 son once veces eso.',
      texto: '**Tu turno.** Gira hasta $\\tfrac{11\\pi}{6}$. La rueda solo muestra grados: convierte primero.',
      idea: '$\\tfrac{11\\pi}{6} \\cdot \\tfrac{180}{\\pi} = 11 \\cdot 30^\\circ = 330^\\circ$.' },
    { cap: 3, tipo: 'casillas', filas: [{ tex: '$90^\\circ$', r: 'π/2' }, { tex: '$\\tfrac{\\pi}{6}$', r: '30°' }], fichas: ['30°', 'π/3', 'π/2', '60°'],
      pista: 'Piensa π como 180°: un cuarto de vuelta es π/2, y π/6 es la sexta parte de 180°.',
      texto: 'Toca la ficha con la otra medida de cada ángulo.',
      idea: '$90^\\circ = \\tfrac{\\pi}{2}$ y $\\tfrac{\\pi}{6} = 30^\\circ$.' },

    // ---- Coterminales ----
    { cap: 4, tipo: 'muestra', escena: 'angulo', en: { etq: 'grados' },
      texto: 'Última idea: ángulos distintos pueden **terminar en el mismo lugar**.',
      momentos: [
        { de: 0, a: 30, ms: 1200, cuenta: '$30^\\circ$', dice: 'Mira dónde termina el ángulo de 30°.' },
        { de: 30, a: 390, ms: 3400, cuenta: '$390^\\circ = 30^\\circ + 360^\\circ$', dice: 'Ahora da una vuelta completa más: 390°. ¡El lado terminal queda en el mismo sitio!' },
        { de: 390, a: -330, ms: 4200, cuenta: '$-330^\\circ = 30^\\circ - 360^\\circ$', dice: 'Y girando hacia atrás, −330° también termina ahí.' },
        { de: -330, a: -330, cuenta: '$\\theta + 360^\\circ \\cdot k$', dice: 'Se llaman **coterminales**: difieren en vueltas completas, θ + 360°·k con k entero.' },
      ],
      idea: 'Los **coterminales** terminan en el mismo lado y difieren en vueltas completas: $\\theta + 360^\\circ k$, $k$ entero.' },
    { cap: 4, tipo: 'angulo', etq: 'grados', cot: 75,
      texto: '**Tu turno.** Gira hasta un ángulo coterminal con 75°, distinto de 75°: con una vuelta de más o de menos.',
      idea: '$75^\\circ + 360^\\circ = 435^\\circ$ y $75^\\circ - 360^\\circ = -285^\\circ$ terminan en el mismo lado.' },

    // ---- Ahora sí, un problema ----
    { cap: 5, tipo: 'angulo', etq: 'ambos', meta: -120, pista: 'Una hora es una vuelta entera, a favor del reloj. Empieza donde quieras: cuenta el giro.',
      texto: 'El minutero de un reloj se mueve durante 20 minutos. ¿Qué ángulo recorre, en grados y en radianes? Ojo con el sentido. Gíralo.',
      idea: '20 minutos son un tercio de vuelta a favor del reloj: $-120^\\circ = -\\tfrac{2\\pi}{3}$.' },
    { cap: 5, tipo: 'cierre', clave: 'trig-41a', real: '',
      texto: 'Eso es todo lo que construiste. Con estas ideas ya puedes con los ejercicios.',
      idea: 'Ángulo como giro, grados, radianes, cómo convertir y ángulos coterminales.' },
  ],
};
