// Preicfes · Ciencias Naturales, mundo 1 «Indagación Científica», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  // Laboratorio: una planta que crece (v.a de 0 a 1) junto a otra que no recibe nada; rótulos opcionales.
  const dosPlantas = (v, K) => X.foto(X.planta(100, 166, 34 + 34 * (v.a || 0), 1, { flor: v.flor }) + X.planta(240, 166, 34 + 10 * (v.a || 0), 0.9) +
    (v.r ? X.rot(100, 188, v.r1 || 'con abono') + X.rot(240, 188, v.r2 || 'sin abono') : '') + (v.lupa ? X.lupa(300, 40, 18) : '') +
    (v.preg ? X.rot(170, 26, v.preg, 'oscuro') : ''), 200, 'lab');

  xpAmplia('icf-cn-indaga-1', {
    conecta: null,
    desde: [
      ['Desde cero: qué es investigar',
        xpMira('dibujo', 'Antes de las palabras difíciles: **investigar** es hacerle una pregunta a la naturaleza y dejar que ella responda.', { dib: dosPlantas, v: { a: 0 }, alto: 200 }, [
          ['Todo empieza con algo que te llama la atención.', { lupa: 1 }],
          ['Por ejemplo: ¿el abono hace crecer más a una planta?', { lupa: 1, preg: '¿el abono ayuda?' }],
          ['Se arma una prueba: dos plantas, solo una recibe abono.', { r: 1, preg: '¿el abono ayuda?' }],
          ['Pasan los días y se mide cuánto crece cada una.', { r: 1, a: 1 }],
          ['La medida, no la opinión, responde la pregunta.', { r: 1, a: 1, flor: 1 }],
        ], 'Investigar es preguntar, probar, medir y responder con los datos.'),
        xpHaz('hoja', 'Una buena pregunta de investigación se puede responder **midiendo**. Subraya la que sí se puede investigar.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['¿Es linda la rosa?'], ['¿Las plantas son felices?'], ['¿Una planta crece más con 4 horas de luz que con 2?']], pista: 'Esa pregunta no tiene una regla ni un instrumento que la mida. Busca la que dice qué se puede contar.' }, 'Horas de luz y centímetros se miden: esa sí se investiga.')],
    ],
    despues: [
      ['Más difícil: el grupo de control',
        xpMira('dibujo', 'Un paso más: la planta **sin** abono no sobra. Es el **control**, la que deja ver si el abono hizo algo.', { dib: dosPlantas, v: { a: 0, r: 1 }, alto: 200 }, [
          ['Imagina que solo hubiera una planta con abono.', { r: 1, r2: 'no está' }],
          ['Creció 10 cm. ¿Mucho o poco? No hay con qué comparar.', { a: 1, r: 1, r2: 'no está' }],
          ['Con el control al lado sí se ve la diferencia.', { a: 1, r: 1 }],
          ['El control vive igual: misma luz, agua y tierra.', { a: 1, r: 1, r2: 'control' }],
          ['Solo le falta lo que se está probando.', { a: 1, r: 1, r2: 'control', flor: 1 }],
        ], 'El grupo de control es igual a los demás, pero sin lo que se prueba.'),
        xpHaz('hoja', 'Se prueba si un jarabe calma la tos en 20 personas. Subraya el grupo que sirve de **control**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['10 personas que toman el jarabe.'], ['10 personas parecidas que toman agua con azúcar.'], ['Personas que no tienen tos.']], pista: 'El control se parece en todo al grupo que recibe el jarabe y solo le falta el jarabe.' }, 'Se parecen en todo y no reciben el jarabe: ese es el control.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen casi nunca te piden la definición: te muestran **varios diseños** y preguntan cuál sirve.', { letras: ['A', 'B', 'C', 'D'], paras: [['Dos vasos al sol: uno con tapa, otro sin tapa.'], ['Un vaso con tapa al sol y otro sin tapa a la sombra.'], ['Un solo vaso con tapa.'], ['Dos vasos sin tapa al sol.']] }, [
          ['La pregunta: ¿la tapa evita que el agua se evapore?', {}],
          ['Esta cambia dos cosas: la tapa y el sol. Trampa.', { luz: [1], nota: { 1: 'dos cambios' } }],
          ['Esta no tiene con qué comparar.', { luz: [2], nota: { 2: 'sin control' } }],
          ['Esta no cambia la tapa: no prueba nada.', { luz: [3], nota: { 3: 'nada cambia' } }],
          ['Solo cambia la tapa: ese diseño responde.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Descarta los diseños que cambian dos cosas o que no tienen con qué comparar.'),
      xpHaz('hoja', 'Se quiere saber si la **temperatura** del agua cambia lo que tarda en disolverse un dulce. Subraya el diseño correcto.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['Agua fría con un dulce entero y agua caliente con un dulce molido.'], ['Agua caliente con un dulce, una sola vez.'], ['Agua fría y caliente con dulces distintos.'], ['Agua fría y caliente, el mismo dulce y la misma cantidad de agua.']], pista: 'En esa cambia algo más que la temperatura, o no hay con qué comparar.' }, 'Solo cambia la temperatura: lo demás queda igual.')],
    cierre: 'Pregunta medible, una sola cosa cambia, un control para comparar.',
  });

  // Laboratorio: un vaso con agua al sol, su termómetro, el cronómetro y la tabla que se va llenando (v.k filas).
  const FILAS = [['0 min', '18 °C'], ['5 min', '21 °C'], ['10 min', '24 °C'], ['15 min', '27 °C']];
  const tomaDatos = (v, K) => X.foto(X.sol(40, 30, 16) + X.vaso(96, 166, 74, 96, 0.62, 'agua') + X.termometro(110, 160, 112, 0.25 + 0.12 * Math.min(4, v.k || 1), '') +
    X.cronometro(178, 62, 22, ['00:00', '00:00', '05:00', '10:00', '15:00'][Math.min(4, v.k || 0)]) +
    (v.k ? X.rot(268, 30, 'tiempo · °C', 'oscuro') : '') + FILAS.slice(0, v.k || 0).map(([a, b], i) => X.rot(268, 56 + i * 24, `${a} · ${b}`)).join('') +
    (v.par ? X.flecha(214, 56 + 24 * (v.k - 1) - 4, 236, 56 + 24 * (v.k - 1) - 4) : ''), 200, 'lab');

  xpAmplia('icf-cn-indaga-2', {
    conecta: 'icf-cn-indaga-1',
    desde: [
      ['Desde cero: qué es un dato',
        xpMira('dibujo', 'Antes de concluir hay que tener **datos**. Mira cómo nacen en un experimento sencillo: un vaso de agua al sol.', { dib: tomaDatos, v: { k: 0 }, alto: 200 }, [
          ['En la lección de variables viste que se cambia una cosa y se mide otra.', {}],
          ['Aquí cambia el tiempo al sol y se mide la temperatura del agua.', { k: 1 }],
          ['Un dato es una medida con su unidad: 18 °C, no «está fresca».', { k: 1 }],
          ['Se mide cada cinco minutos y se anota en orden: eso es una tabla.', { k: 3 }],
          ['Cada fila junta lo que cambió con lo que se midió.', { k: 4, par: 1 }],
          ['Esos pares, dibujados como puntos, forman una gráfica.', { k: 4 }],
        ], 'Un dato es una medida con número y unidad; la tabla los ordena en parejas.'),
        xpHaz('hoja', 'Un dato sirve para comparar porque tiene **número y unidad**. Subraya el que sí es un dato.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El agua se sentía calientica.'], ['A los 10 minutos, el agua marcó 24 °C.'], ['Al rato el vaso estaba como tibio.']], pista: 'Esa frase describe una sensación. Busca la que trae un número con su unidad.' }, 'Número, unidad y momento: con eso se puede comparar.')],
    ],
    despues: [
      ['Más difícil: ir juntos no es causar',
        xpMira('hoja', 'Un paso más: que dos cosas **suban juntas** no prueba que una cause la otra. Puede haber una tercera detrás.', { paras: [['En los meses de lluvia se venden más botas de caucho.'], ['En esos mismos meses hay más casos de gripa.'], ['¿Las botas causan la gripa?'], ['No: la lluvia y el frío hacen subir las dos.']] }, [
          ['Dos datos que suben al mismo tiempo.', { luz: [0, 1] }],
          ['Es tentador decir que uno causa el otro.', { luz: [2], nota: { 2: 'trampa' } }],
          ['Pero nadie hizo un experimento con botas.', { luz: [2] }],
          ['Hay una tercera cosa que mueve a las dos: el invierno.', { luz: [3], nota: { 3: 'tercera causa' } }],
          ['Para hablar de causa hay que cambiar una sola cosa y controlar el resto.', {}],
        ], 'Ir juntos es una relación; para decir «causa» hace falta un experimento controlado.'),
        xpHaz('hoja', 'En una ciudad, los barrios con más árboles midieron menos calor en la tarde. Subraya lo que esos datos **sí** permiten decir.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Sembrar un árbol baja la temperatura 5 °C.'], ['Donde había más árboles se midió menos calor.'], ['Los árboles son la única causa del fresco.']], pista: 'Esa frase pone un número o una causa que nadie probó. Busca la que repite lo medido.' }, 'Solo se midió que van juntos: eso es lo que se puede afirmar.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Tres vasos con 50, 100 y 150 mL de agua, al sol: en una hora bajaron 4, 4 y 4 mL. Preguntan qué conclusión **apoyan** los datos.', { letras: ['A', 'B', 'C', 'D'], paras: [['A más agua en el vaso, más agua se evapora.'], ['En esa hora, la cantidad de agua no cambió lo que se evaporó.'], ['El agua siempre se evapora 4 mL por hora.'], ['Se evaporan 4 mL porque el sol calienta la superficie.']] }, [
        ['Antes de leer opciones, mira los datos: 4, 4 y 4.', {}],
        ['Esta suena lógica, pero los datos dicen lo contrario.', { luz: [0], nota: { 0: 'contra los datos' } }],
        ['Esta dice «siempre»: solo se midió una hora, un día.', { luz: [2], nota: { 2: 'absoluto' } }],
        ['Esta da una causa que el experimento no puso a prueba.', { luz: [3], nota: { 3: 'causa sin probar' } }],
        ['Esta dice justo lo que se midió: es la respuesta.', { luz: [1], nota: { 1: 'apoyada' } }],
      ], 'La buena repite lo medido; las trampas contradicen, generalizan o inventan causas.'),
      xpHaz('hoja', 'Lechugas con 2, 4 y 6 horas de luz al día pesaron 80, 120 y 160 g al mes. Subraya la conclusión que apoyan los datos.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Con 10 horas pesarán 240 g sin falta.'], ['Las lechugas crecen solo por la luz.'], ['En este ensayo, a más horas de luz, más pesaron.'], ['La luz no influye en el peso de las lechugas.']], pista: 'Esa opción asegura algo que no se midió, dice «solo» o contradice la tabla.' }, 'Dice lo que pasó en el ensayo, sin «siempre» ni «solo».')],
    cierre: 'Un dato es una medida; concluye solo lo que muestran los datos, sin causas ni «siempre» de más.',
  });
}
