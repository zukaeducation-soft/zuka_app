// Preicfes · Sociales y Ciudadanas, mundo 5 «Problemas Complejos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  // Una fábrica junto a un río con peces; con `bota`, sale un chorro sucio al río.
  const rioFab = v => X.foto((v.rio ? X.rio(188, 18) : '') + (v.peces ? X.pez(70, 192, 0.55) + X.pez(150, 190, 0.5, '#e0b030') : '') +
    (v.fab ? X.edificio(256, 172, 120, 'fabrica', { humo: v.humo ? 1 : 0 }) : '') + (v.bota ? '<path d="M214 166 L214 180 Q210 188 196 189" stroke="#5b4a2a" stroke-width="5" fill="none"/><ellipse cx="168" cy="190" rx="44" ry="6" fill="#6b5a3a" opacity=".75"/>' : '') +
    (v.r ? X.rot(110, 30, v.r, 'oscuro') : ''), 212, 'campo');
  // Un pueblo con sus casas, una fábrica, el río y dos personas que piden cosas distintas.
  const caras = v => X.foto((v.rio ? X.rio(192, 14) : '') + (v.casa ? X.edificio(52, 172, 80, 'casa') : '') + (v.fab ? X.edificio(272, 172, 110, 'fabrica') : '') +
    (v.a ? X.persona(140, 180, 0.8, '#d08a2c', { cartel: 'Empleo' }) : '') + (v.b ? X.persona(200, 180, 0.8, '#3f9b6a', { cartel: 'Agua' }) : '') +
    (v.r ? X.rot(170, 26, v.r, 'oscuro') : ''), 212, 'campo');
  // La alcaldía saca una medida y la gente se acomoda.
  const medida = v => X.foto((v.cap ? X.edificio(264, 166, 110, 'capitolio') : '') +
    (v.doc ? X.documento(12, 14, 120, 86, ['Desde el lunes:', 'nueva regla'], { titulo: 'Decreto', sello: 'A' }) : '') +
    (v.gente ? X.persona(150, 180, 0.8, '#3f6fb5') + X.persona(182, 182, 0.82, '#b5493f') + X.persona(214, 180, 0.8, '#3f9b6a') : '') +
    (v.r ? X.rot(170, 198, v.r, 'oscuro') : ''), 208, 'ciudad');

  xpAmplia('icf-sc-sistemico-1', {
    conecta: 'icf-sc-fuentes-2',
    desde: [
      ['Desde cero: causa y consecuencia',
        xpMira('dibujo', 'Desde el principio: una **causa** hace que algo pase; una **consecuencia** es lo que resulta.', { dib: rioFab, v: { rio: 1, peces: 1 }, alto: 212 }, [
          ['En la lección de pruebas viste que un mismo dato puede tener otra explicación.', { rio: 1, peces: 1 }],
          ['Una causa es lo que hace que algo pase; la consecuencia es lo que resulta.', { rio: 1, peces: 1, fab: 1, humo: 1 }],
          ['La fábrica bota residuos al río: esa es una causa.', { rio: 1, peces: 1, fab: 1, humo: 1, bota: 1, r: 'causa' }],
          ['Los peces desaparecen: esa es una consecuencia.', { rio: 1, peces: 0, fab: 1, humo: 1, bota: 1, r: 'consecuencia' }],
          ['Como fichas de dominó: una tumba a la siguiente, siempre en orden.', { rio: 1, peces: 0, fab: 1, humo: 1, bota: 1, r: 'causa → consecuencia' }],
        ], 'Causa: lo que hace que algo pase. Consecuencia: lo que resulta. Van en orden, como fichas de dominó.'),
        xpHaz('hoja', '«Llovió una semana entera y el río se desbordó». Subraya la **consecuencia**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Llovió una semana entera.'], ['El río se desbordó.'], ['Era el mes de octubre.']], pista: 'La consecuencia es lo que resultó. ¿Qué pasó por culpa de lo otro?' }, 'El desborde resultó de la lluvia.')],
    ],
    despues: [
      ['Más difícil: consecuencia cercana y lejana',
        xpMira('hoja', 'Un paso más: las consecuencias van en **eslabones**. Unas aparecen enseguida y otras mucho después.', { paras: [['Cierran la única fábrica del pueblo.'], ['Cien personas quedan sin empleo.'], ['Las tiendas venden menos.'], ['Algunas familias se van a la ciudad y baja la matrícula del colegio.']] }, [
          ['La consecuencia directa aparece enseguida: se pierde el empleo.', { luz: [0, 1], nota: { 1: 'directa' } }],
          ['Sin salario, la gente compra menos en las tiendas.', { luz: [2], nota: { 2: 'segunda' } }],
          ['Más lejos: familias que se van y un colegio con menos niños.', { luz: [3], nota: { 3: 'lejana' } }],
          ['Cuantos más eslabones, más otras causas pueden meterse en el camino.', {}],
          ['Trampa: si piden la consecuencia directa, no elijas la lejana aunque sea cierta.', {}],
        ], 'Distingue la consecuencia directa de las lejanas: cada eslabón suma otras causas posibles.'),
        xpHaz('hoja', 'Sube el precio del pasaje de bus. Subraya la consecuencia **más directa**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Los usuarios gastan más para moverse.'], ['Meses después baja la venta de ropa en el centro.'], ['Cambia el clima de la ciudad.']], pista: 'La directa no necesita otros eslabones en el medio.' }, 'Pagar más por el pasaje pasa enseguida.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **¿cuál es la causa de fondo?** Una opción será el detonante, que suena muy lógico.', { letras: ['A', 'B', 'C', 'D'], paras: [['La lluvia fuerte de la última semana.'], ['La pérdida de humedales y quebradas que recogían el agua.'], ['Que la gente no quiere a su ciudad.'], ['Que el alcalde lleva poco tiempo.']] }, [
          ['El caso: las inundaciones aumentaron tras diez años de tapar humedales y quebradas con cemento.', {}],
          ['La lluvia dispara la inundación, pero llueve igual que antes: es el detonante.', { luz: [0], nota: { 0: 'detonante' } }],
          ['Esta juzga a la gente sin ningún dato del caso.', { luz: [2], nota: { 2: 'sin dato' } }],
          ['Esta solo coincide en el tiempo: juntas no es por.', { luz: [3], nota: { 3: 'coincidencia' } }],
          ['Sin dónde guardar el agua, cualquier aguacero inunda: esa es la causa de fondo.', { luz: [1], nota: { 1: 'sirve' } }],
        ], 'La causa de fondo venía preparando el problema; el detonante solo lo disparó.'),
      xpHaz('hoja', 'Cerraron un puerto y, meses después, bajaron las ventas de los restaurantes cercanos. Subraya la **cadena** correcta.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Los restaurantes subieron precios y por eso cerró el puerto.'], ['Menos barcos y viajeros, menos clientes, menos ventas.'], ['Bajaron las ventas porque cambió el menú.'], ['Las ventas bajas hicieron cerrar el puerto.']], pista: 'Revisa el orden de las flechas: ¿qué pasó primero? Una opción trae una causa sin dato.' }, 'Del cierre a los clientes y de los clientes a las ventas.')],
    cierre: 'Separa detonante y causa de fondo, sigue la cadena eslabón por eslabón y no confundas juntas con por.',
  });

  xpAmplia('icf-sc-sistemico-2', {
    conecta: 'icf-sc-sistemico-1',
    desde: [
      ['Desde cero: un problema con varias caras',
        xpMira('dibujo', 'Desde el principio: un problema es como un dado. Según la **cara** que mires, ves una cosa distinta.', { dib: caras, v: { rio: 1, fab: 1 }, alto: 212 }, [
          ['En la lección anterior viste que una causa trae consecuencias en cadena.', { rio: 1, fab: 1 }],
          ['Esas consecuencias caen en varias dimensiones: caras de un mismo problema.', { rio: 1, fab: 1, casa: 1 }],
          ['La fábrica da empleo: esa es la cara económica.', { rio: 1, fab: 1, casa: 1, a: 1 }],
          ['Si el río se ensucia, es la cara ambiental.', { rio: 1, fab: 1, casa: 1, a: 1, b: 1 }],
          ['También hay cara social, cultural, legal y política, según qué se toque.', { rio: 1, fab: 1, casa: 1, a: 1, b: 1, r: 'seis caras' }],
        ], 'Un problema tiene varias caras: económica, ambiental, social, cultural, legal y política.'),
        xpHaz('hoja', 'Subraya la frase de la dimensión **ambiental**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La fábrica paga buenos salarios.'], ['Los peces del río están desapareciendo.'], ['El concejo cambió la norma de usos del suelo.']], pista: 'Lo ambiental habla de la naturaleza: agua, aire, animales, plantas.' }, 'Los peces del río son la cara ambiental.')],
    ],
    despues: [
      ['Más difícil: el choque cambia con el tiempo',
        xpMira('hoja', 'Un paso más: mira las dimensiones **y el tiempo**. Quien pierde hoy puede ganar mañana.', { paras: [['Se prohíbe pescar en la ciénaga tres meses al año.'], ['Los peces se reproducen y vuelven a aumentar.'], ['Los pescadores pierden su ingreso esos meses.'], ['Se les paga un apoyo mientras dura la veda.']] }, [
          ['Prohibir la pesca unos meses deja que los peces se reproduzcan.', { luz: [0, 1], nota: { 1: 'ambiental' } }],
          ['Hoy, los pescadores pierden su ingreso: choque económico.', { luz: [2], nota: { 2: 'corto plazo' } }],
          ['Pero en unos años habrá más peces, y esos pescadores ganan.', { luz: [1], nota: { 1: 'largo plazo' } }],
          ['El apoyo durante la veda cubre el hueco del corto plazo.', { luz: [3], nota: { 3: 'puente' } }],
          ['Trampa: mirar un solo momento. La pérdida de hoy puede ser la ganancia de mañana.', {}],
        ], 'Mira las dimensiones y el tiempo: lo que hoy pierde un grupo puede ganarlo mañana.'),
        xpHaz('hoja', 'Una ciudad cobra por entrar en carro al centro. Subraya la lectura que mira **corto y largo plazo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Hoy molesta a quienes manejan; con el tiempo puede bajar el trancón y el humo.'], ['Es solo un cobro más y no cambia nada.'], ['Es buena porque todo el mundo usa bicicleta.']], pista: 'Busca la opción que dice qué pasa ahora y qué pasa después.' }, 'Molestia hoy, menos trancón y humo después.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **¿qué dimensiones entran en choque?** Las dos tienen que salir del caso.', { letras: ['A', 'B', 'C', 'D'], paras: [['La económica, por los turistas, y la ambiental, porque el páramo produce agua.'], ['La cultural y la deportiva, porque los turistas hacen deporte.'], ['Ninguna, porque los aeropuertos traen progreso.'], ['Solo la política, porque el alcalde decide.']] }, [
          ['El caso: un municipio quiere hacer un aeropuerto en un páramo para traer turistas.', {}],
          ['Esta inventa una dimensión que el caso no trae.', { luz: [1], nota: { 1: 'inventa' } }],
          ['Esta suena positiva, pero niega el choque que el caso muestra.', { luz: [2], nota: { 2: 'atractiva' } }],
          ['Esta reduce todo a quién decide.', { luz: [3], nota: { 3: 'reduce' } }],
          ['Turistas que traen dinero contra un páramo que da agua: ahí chocan.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Nombra qué mejora y qué empeora en el caso: esas son las dimensiones que chocan.'),
      xpHaz('hoja', 'Plan: tumbar las casas de bahareque de un barrio antiguo para hacer edificios modernos. Subraya la dimensión que se **descuida** más.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['La económica, porque los edificios valen más.'], ['La cultural, porque se pierde una arquitectura que es memoria del barrio.'], ['La ambiental, porque los edificios dan sombra.'], ['Ninguna, porque modernizar siempre es mejor.']], pista: 'Pregunta qué se pierde que no se puede volver a comprar.' }, 'Las casas antiguas son memoria: dimensión cultural.')],
    cierre: 'Nombra las caras del problema, di cuáles chocan, mira el tiempo y busca ceder en cada una.',
  });

  xpAmplia('icf-sc-sistemico-3', {
    conecta: 'icf-sc-sistemico-2',
    desde: [
      ['Desde cero: qué es intervenir',
        xpMira('dibujo', 'Desde el principio: **intervenir** es actuar a propósito para cambiar un problema. Y la gente siempre responde.', { dib: medida, v: { cap: 1 }, alto: 208 }, [
          ['En la lección anterior viste que un problema tiene caras que chocan.', { cap: 1 }],
          ['Intervenir es actuar a propósito sobre él: una ley, un programa, un cobro.', { cap: 1, doc: 1 }],
          ['Toda intervención tiene una meta: lo que se quiere lograr.', { cap: 1, doc: 1, r: 'meta' }],
          ['Y la gente responde: cambia lo que hace para acomodarse.', { cap: 1, doc: 1, gente: 1 }],
          ['Como apretar un globo: lo que hundes por un lado sale por otro.', { cap: 1, doc: 1, gente: 1, r: 'la gente se acomoda' }],
        ], 'Intervenir es actuar para cambiar un problema; tiene una meta y la gente se acomoda.'),
        xpHaz('hoja', 'Subraya cuál es una **intervención**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Llovió más de lo normal en abril.'], ['Un barrio cumplió 50 años.'], ['El alcalde crea un programa de comedores escolares.']], pista: 'Una intervención la hace alguien a propósito para cambiar algo.' }, 'El programa es una acción hecha a propósito.')],
    ],
    despues: [
      ['Más difícil: cuando sale al revés',
        xpMira('hoja', 'Un paso más: una medida puede lograr **lo contrario** de lo que buscaba.', { paras: [['Un jardín infantil multa a los padres que recogen tarde a los niños.'], ['Antes, llegar tarde daba vergüenza.'], ['Ahora muchos piensan: «pago y listo».'], ['Los retrasos aumentan en vez de bajar.']] }, [
          ['La meta era clara: que los padres llegaran a tiempo.', { luz: [0], nota: { 0: 'meta' } }],
          ['Pero la multa cambió el sentido de llegar tarde.', { luz: [1] }],
          ['Lo volvió un servicio que se paga: ya no da vergüenza.', { luz: [2], nota: { 2: 'se acomodan' } }],
          ['Resultado: más retrasos. El efecto fue el contrario.', { luz: [3], nota: { 3: 'al revés' } }],
          ['Trampa: suponer que la gente obedece sin pensar. Responde a la regla nueva.', {}],
        ], 'Una medida puede lograr lo contrario si cambia cómo la gente entiende lo que hace.'),
        xpHaz('hoja', 'Para cuidar un parque, empiezan a cobrar la entrada. Subraya el efecto **no buscado** más probable.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Las familias pobres dejan de ir y se quedan sin dónde jugar.'], ['El parque recibe dinero para mantenerse.'], ['Los árboles crecen más rápido.']], pista: 'Uno es justo lo que se buscaba. El no buscado le cae a alguien que nadie tuvo en cuenta.' }, 'Nadie quería dejar sin parque a quien no puede pagar.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **¿qué efecto no esperado es más probable?** Piensa cómo se acomodaría la gente.', { letras: ['A', 'B', 'C', 'D'], paras: [['La gente compra varias botellas pequeñas y toma lo mismo.'], ['Las gaseosas desaparecen del país.'], ['La venta de agua sube un 100 %.'], ['Nadie vuelve a tomar gaseosa.']] }, [
          ['El caso: un impuesto alto, solo a las gaseosas de botella grande, para que se tome menos.', {}],
          ['Esta exagera: un impuesto no borra un producto.', { luz: [1], nota: { 1: 'exagera' } }],
          ['Esta inventa una cifra que el caso no da.', { luz: [2], nota: { 2: 'inventa' } }],
          ['Esta es absoluta: «nadie» casi nunca es verdad.', { luz: [3], nota: { 3: 'absoluto' } }],
          ['El impuesto deja libre la botella pequeña: la gente se pasa a ella.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'El efecto no esperado sale de ver por dónde se escapa la gente de la regla.'),
      xpHaz('hoja', 'Meta: bajar las muertes en las vías. Subraya lo que de verdad **mide** si se logró.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['El número de multas que se pusieron.'], ['Los kilómetros de vía pintados.'], ['Las muertes en las vías por cada 100 000 habitantes, antes y después.'], ['Los afiches repartidos en la campaña.']], pista: 'Tres opciones miden lo que se hizo, no lo que se quería lograr.' }, 'Mide la meta misma, antes y después.')],
    cierre: 'Qué busca la medida, cómo se acomodará la gente, a quién le pesa y cómo sabremos si sirvió.',
  });
}
