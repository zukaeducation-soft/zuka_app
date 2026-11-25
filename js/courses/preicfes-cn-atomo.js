// Preicfes · Ciencias Naturales · mundo 7 «Átomo y Enlaces» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const ATOMO = {
    id: 'icf-atomo', title: 'La casa vacía de la materia',
    ficha: { autor: 'Profesora de química', fuente: 'Guía de décimo grado', fecha: 'Febrero de 2026' },
    paras: [
      'Todo lo que tocas está hecho de átomos. Cada átomo tiene un núcleo diminuto, con protones, de carga positiva, y neutrones, sin carga. Alrededor se mueven los electrones, de carga negativa y casi dos mil veces más livianos que un protón. Si el núcleo fuera una canica en el centro de un estadio, los electrones andarían por las gradas. En medio no hay nada.',
      'El número de protones se llama número atómico y decide qué elemento es: con 6 protones es carbono; con 7, nitrógeno. No importa lo demás. El número de masa suma protones y neutrones. Un átomo neutro tiene tantos electrones como protones.',
      'Dos átomos del mismo elemento pueden tener distinto número de neutrones: son isótopos. El carbono 12 tiene 6 neutrones y el carbono 14 tiene 8. Químicamente se comportan casi igual. El carbono 14 es inestable: con el tiempo se transforma y emite radiación, y por eso sirve para calcular la edad de restos antiguos.',
      'Un átomo que gana o pierde electrones se vuelve un ion. El sodio pierde uno con facilidad y queda con carga +1: 11 protones y 10 electrones. El cloro gana uno y queda con carga −1. Al formarse un ion cambian los electrones; el núcleo no, así que sigue siendo el mismo elemento.',
      'La tabla periódica ordena los elementos por su número atómico. Las columnas son grupos: los elementos de un mismo grupo tienen igual número de electrones en su última capa y por eso se parecen. Las filas son periodos. Al bajar por un grupo, los átomos son más grandes, porque tienen más capas; al avanzar por un periodo, en general, son más pequeños, porque el núcleo atrae con más fuerza.',
      'A la izquierda y en el centro están los metales, que tienden a perder electrones; a la derecha, los no metales, que tienden a ganarlos. Los gases nobles, en la última columna, tienen completa su última capa y casi no reaccionan. El modelo también ha cambiado: Dalton imaginó esferas; Thomson descubrió el electrón; Rutherford, el núcleo; Bohr propuso niveles de energía.',
    ],
  };
  const l1 = leccion('icf-cn-atomo-1', 'El átomo y la tabla periódica', guion(
    ['Tres partículas', 'Protones y neutrones en el núcleo; electrones alrededor.'],
    ['¿Qué elemento es?', 'Lo decide el número de protones. Isótopo: otros neutrones. Ion: otros electrones.'],
    ['La tabla', 'Grupos que se parecen y periodos que avanzan.'],
    ['Tamaño', 'Crece al bajar y, en general, disminuye al avanzar.']), [
    x('pinta-tipos', 'Pinta cada dato con su partícula.', { doc: ATOMO, plumas: ['protón', 'neutrón', 'electrón'],
      ...P(['Decide qué elemento es.', 0, '¿Cuál da el número atómico?'], ['Está en el núcleo y no tiene carga.', 1, '¿Cuál es neutro?'], ['Es casi dos mil veces más liviano.', 2, '¿Cuál pesa menos?'], ['Cambia de número en un isótopo.', 1, '¿Qué distingue al carbono 12 del 14?'], ['Se gana o se pierde al formar un ion.', 2, '¿Qué cambia al volverse ion?']), bien: 'Identidad, masa y carga.' },
      'El protón decide, el neutrón distingue isótopos y el electrón forma iones.', 'Relee los párrafos 2, 3 y 4: cada uno habla de una.'),
    x('genero-o-cita', '¿Es un **isótopo** o un **ion** del átomo neutro?', { doc: ATOMO, rot: ['isótopo', 'ion'],
      ...F(['Carbono con 8 neutrones', 0, '¿Cambian los neutrones o los electrones?'], ['Sodio con 10 electrones', 1, '¿Cambian los neutrones o los electrones?'], ['Cloro que ganó un electrón', 1, '¿Cambian los neutrones o los electrones?'], ['Hidrógeno con un neutrón más', 0, '¿Cambian los neutrones o los electrones?']), bien: 'Neutrones o electrones.' },
      'El carbono y el hidrógeno cambian neutrones; el sodio y el cloro, electrones.', 'Mira qué partícula es distinta de la del átomo neutro.'),
    x('lee-escala', 'La gráfica muestra el radio (en picómetros) de tres átomos de un mismo grupo. Pon cada uno y cuánto **más** mide el tercero que el primero.', { vals: [150, 190, 230], rot: ['litio', 'sodio', 'potasio'], hi: 240, st: 40, et: ['litio', 'sodio', 'potasio', 'más'], ops: ['', '', ''], metas: ['150', '190', '230', '80'], fichas: ['150', '190', '230', '80', '143', '195', '380'],
      mira: ['Está a tres cuartos del camino entre 120 y 160.', 'Está a tres cuartos del camino entre 160 y 200.', 'Está a tres cuartos del camino entre 200 y 240.', 'Resta el primero al tercero.'], trampas: { '0:143': 'Cada línea vale 40: tres cuartos son 30.', '1:195': 'Cada línea vale 40: tres cuartos son 30.', '3:380': 'Eso es una suma.' }, ok: 'Al bajar por el grupo, crecen.' },
      'Las líneas van de 40 en 40: 150, 190 y 230. La diferencia es $230 - 150 = 80$ pm.', 'Mira cuánto vale cada línea y qué parte alcanza la barra.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: ATOMO, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Los elementos de un grupo se parecen.',
      ...T(['El número de neutrones decide qué elemento es.', 0, 'Busca cuál número lo decide.'], ['Al volverse ion, cambia el elemento.', 7, 'Busca qué no cambia.'], ['Al bajar por un grupo los átomos son más pequeños.', 11, 'Busca cómo cambia el tamaño.']), bien: 'Protones, mismo elemento y más grandes.' },
      'Deciden los protones, el núcleo no cambia y al bajar son más grandes.', 'Saca la palabra clave: neutrones, ion, bajar.'),
    x('voz-de-la-fuente', 'Ata cada idea al científico.', { ayuda: 'Tira un hilo desde cada idea hasta su autor.', doc: ATOMO, portadas: [['Dalton', 'modelo'], ['Thomson', 'modelo'], ['Rutherford', 'modelo'], ['Bohr', 'modelo']],
      ...T(['esferas', 0, '¿Quién las imaginó?'], ['el electrón', 1, '¿Quién lo descubrió?'], ['el núcleo', 2, '¿Quién lo descubrió?'], ['niveles de energía', 3, '¿Quién los propuso?']), bien: 'Un modelo se corrige con otro.' },
      'Dalton esferas, Thomson electrón, Rutherford núcleo y Bohr niveles.', 'Relee la última oración del texto: nombra a los cuatro.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: ATOMO, filas: [{ antes: 'Entre el núcleo y los electrones hay', topes: ['aire', 'neutrones', 'nada'], va: 2 }, { antes: 'Los gases nobles', topes: ['reaccionan mucho', 'casi no reaccionan', 'son metales'], va: 1 }, { antes: 'Los metales tienden a', topes: ['perder electrones', 'ganar electrones', 'ganar protones'], va: 0 }], mira: ['Relee la comparación del estadio.', 'Relee la última columna.', 'Relee dónde están los metales.'], luz: [[1, 'En medio no hay nada'], [6, 'casi no reaccionan'], [6, 'tienden a perder electrones']], bien: 'Vacío, estables y pierden.' },
      'En medio no hay nada, los nobles casi no reaccionan y los metales pierden electrones.', 'Busca en el texto la oración exacta de cada perilla.'),
    sol('Un átomo neutro tiene número atómico 17 y número de masa 35. ¿Cuántas partículas tiene de cada clase?', ['Protones: [[17]]', 'Neutrones: [[18]]', 'Si gana un electrón, queda con [[18]] electrones', 'Su carga será [[−1]]'], ['35', '16', '+1'], 'Protones 17; neutrones $35 - 17 = 18$; con un electrón más, 18 y carga $-1$.', 'El número de masa suma protones y neutrones.'),
    err('Alguien explica qué es el carbono 14.', ['Tiene 6 protones, como todo carbono', 'Su número de masa es 14', 'Por eso tiene 14 neutrones'], 2, ['Por eso tiene 8 neutrones', 'Por eso tiene 14 electrones', 'Por eso tiene 14 protones'], '$14 - 6 = 8$ neutrones: la masa suma los dos.', 'Resta los protones al número de masa.'),
    opc('Dos elementos de un mismo grupo de la tabla se parecen químicamente porque tienen:', ['El mismo número de protones', 'El mismo número de capas', 'Los mismos electrones en la última capa', 'La misma masa'], 2, 'Los electrones de la última capa deciden cómo reaccionan.', 'Piensa qué comparten los de una columna.'),
  ]);

  const ENLACE = {
    id: 'icf-enlace', title: 'Cuatro polvos blancos',
    ficha: { autor: 'Grupo de laboratorio', fuente: 'Bitácora de química', fecha: 'Marzo de 2026' },
    paras: [
      'Los átomos se unen porque juntos quedan más estables. La mayoría busca completar ocho electrones en su última capa. Hay tres maneras principales de lograrlo y cada una deja su huella en las propiedades de la sustancia.',
      'En el enlace iónico, un metal le entrega electrones a un no metal. Quedan iones de cargas opuestas que se atraen y forman una red ordenada. Por eso las sales son duras, se funden a temperaturas altas y, disueltas o fundidas, conducen la electricidad: sus iones pueden moverse. Sólidas no la conducen, porque los iones están fijos.',
      'En el enlace covalente, dos no metales comparten electrones. Si los comparten por igual, como en el oxígeno del aire, el enlace es apolar. Si uno atrae más, como el oxígeno en el agua, queda un lado un poco negativo y otro un poco positivo: es polar. Muchas sustancias covalentes se funden a temperaturas bajas y no conducen.',
      'En el enlace metálico, los átomos sueltan sus electrones más externos, que se mueven por toda la pieza como un mar. Eso explica que los metales conduzcan bien la electricidad y el calor, y que se puedan doblar sin romperse.',
      'El grupo recibió cuatro polvos o granos sin nombre y los probó. A se fundió a 801 °C, se disolvió en agua y su disolución encendió el bombillo. B se fundió a 186 °C, se disolvió y no lo encendió. C no se disolvió en agua, se fundió a 63 °C y no condujo. D no se disolvió, brillaba, y encendió el bombillo estando sólido.',
      'Con la tabla de la profesora los identificaron: sal, azúcar, parafina y limadura de aluminio. Nadie los probó con la lengua. No fue solo por seguridad: las propiedades que se miden dicen más que el sabor. El color, en cambio, no ayudó: tres eran blancos y solo el enlace los distinguía.',
    ],
  };
  const l2 = leccion('icf-cn-atomo-2', 'Tipos de enlace', guion(
    ['Iónico', 'Un metal entrega electrones a un no metal: sales.'],
    ['Covalente', 'Dos no metales comparten: por igual (apolar) o no (polar).'],
    ['Metálico', 'Electrones sueltos, como un mar.'],
    ['Propiedades', 'El enlace se nota en la fusión, la disolución y la electricidad.']), [
    x('pinta-tipos', 'Pinta cada caso con su enlace.', { doc: ENLACE, plumas: ['iónico', 'covalente', 'metálico'],
      ...P(['Un metal entrega electrones a un no metal.', 0, '¿Se entregan, se comparten o se sueltan?'], ['Dos no metales comparten.', 1, '¿Se entregan, se comparten o se sueltan?'], ['Electrones como un mar.', 2, '¿Se entregan, se comparten o se sueltan?'], ['El agua.', 1, '¿De qué son sus átomos: metales o no metales?'], ['El cobre de un cable.', 2, '¿Es un metal solo?']), bien: 'Entregar, compartir o soltar.' },
      'Entregar es iónico, compartir covalente y soltar metálico; el agua es covalente y el cobre, metálico.', 'Pregunta qué pasa con los electrones en cada caso.'),
    x('pista-tipo', 'Ata cada polvo a su sustancia.', { doc: ENLACE, lineas: ['A: 801 °C, conduce disuelta', 'B: 186 °C, se disuelve, no conduce', 'C: 63 °C, no se disuelve', 'D: brilla y conduce sólida'],
      ...T(['sal', 0, '¿Cuál tiene iones?'], ['azúcar', 1, '¿Cuál se disuelve sin iones?'], ['parafina', 2, '¿Cuál se funde primero?'], ['aluminio', 3, '¿Cuál es metal?']), bien: 'La propiedad delata el enlace.' },
      'La sal conduce disuelta, el azúcar no, la parafina no se disuelve y el aluminio brilla y conduce.', 'Usa juntos la temperatura de fusión y el bombillo.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: ENLACE, nums: [2, 3, 6], pregunta: 'Queda en pie', queda: 'La sal disuelta conduce la electricidad.',
      ...T(['La sal sólida conduce.', 3, 'Busca por qué no lo hace.'], ['En el agua los electrones se comparten por igual.', 6, 'Busca quién atrae más.'], ['El color permitió identificarlos.', 11, 'Busca qué no ayudó.']), bien: 'Fijos, polar y no ayudó.' },
      'Los iones están fijos, el oxígeno atrae más y el color no ayudó.', 'Saca la palabra clave: sólida, agua, color.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: ENLACE, nums: [2, 5], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['El polvo A se fundió a 801 °C.', 0, 'Léela junto a los datos.'], ['Al disolver B no se forman iones.', 1, '¿Por qué no encendió el bombillo?'], ['Si se funde A, encendería el bombillo.', 1, '¿Qué pasa con los iones de una sal fundida?'], ['C es más barato que D.', 2, '¿Se habla de precios?']),
      luz: [[5, 'A se fundió a 801'], [5, 'no lo encendió'], [2, 'fundidas']], bien: 'Sin iones que se muevan, no conduce.' },
      'Los 801 están escritos; que B no forma iones y que A fundida conduce se deducen; el precio no.', 'Usa la regla de los iones para explicar el bombillo.'),
    x('mayor-tramo', 'La gráfica muestra la temperatura de fusión (en decenas de °C) de cuatro sales. Toca el tramo en que más crece **en porcentaje**.', { v: [10, 16, 24, 33] },
      'De 10 a 16 crece 60 %; de 16 a 24, 50 %; de 24 a 33, 37.5 %.', 'Divide lo que creció cada tramo entre el valor con que empezó.'),
    x('balanza-tesis', 'Hipótesis: «este polvo es una sal». ¿Qué hace cada dato?', { doc: ENLACE, tesis: 'Este polvo es una sal',
      ...F(['Se funde a 770 °C y disuelto conduce.', 0, '¿Se parece a A?'], ['Conduce estando sólido.', 1, '¿Los iones fijos conducen?'], ['Se funde a 60 °C.', 1, '¿Las sales se funden tan bajo?'], ['Es blanco.', 2, '¿El color decide?']), bien: 'Fusión y electricidad, no color.' },
      'Fundirse alto y conducir disuelto la apoya; conducir sólido o fundirse a 60 la debilita; el color no pesa.', 'Compara cada dato con lo que hizo el polvo A.'),
    sol('El magnesio pierde 2 electrones y el cloro gana 1. ¿Qué compuesto forman?', ['El magnesio queda con carga [[+2]]', 'Cada cloro queda con carga [[−1]]', 'Para que la suma dé cero hacen falta [[2]] cloros', 'El enlace es [[iónico]]'], ['+1', '1', 'covalente'], 'Dos cloros de $-1$ compensan un magnesio de $+2$: $MgCl_2$.', 'Las cargas deben sumar cero.'),
    err('Alguien explica por qué se dobla un alambre de cobre.', ['El cobre tiene enlace metálico', 'Sus electrones forman un mar', 'Como sus iones están fijos, se rompe al doblarlo'], 2, ['Como el mar de electrones se acomoda, las capas se deslizan sin romperse', 'Como comparte electrones por parejas, se vuelve líquido', 'Como no tiene electrones, se estira'], 'El mar de electrones mantiene unida la pieza al deslizarse.', '¿Qué hace el mar de electrones cuando se mueve una capa?'),
    opc('Una sustancia no conduce sólida, se funde a 850 °C y, fundida, conduce. Su enlace es:', ['Iónico', 'Covalente apolar', 'Metálico', 'Covalente polar'], 0, 'Iones fijos en el sólido y móviles al fundirse: iónico.', 'Compara con lo que hace la sal.')]);

  const FUEGO = {
    id: 'icf-pirotecnia', title: 'Los colores de la pólvora',
    paras: [
      'Cada color de un fuego artificial viene de un metal: el sodio da amarillo; el cobre, verde azulado; el estroncio, rojo; el bario, verde.',
      'Al calentarse, los electrones del átomo suben a niveles de mayor energía. Cuando regresan, sueltan esa energía en forma de luz.',
      'Como cada elemento tiene sus propios niveles, cada uno emite sus propios colores: son como una huella digital. Así se sabe de qué están hechas las estrellas.',
      'Los metales se usan en forma de sales, porque son más estables y fáciles de manejar que el metal puro. El sodio puro, por ejemplo, reacciona con violencia con el agua.',
      'El helio se descubrió así: en 1868 se vio en la luz del Sol un color que no correspondía a ningún elemento conocido. Décadas después se encontró en la Tierra.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: FUEGO, ...p }, e, { hint: h });
  return mundo('icf-cn-atomo', 'Átomo y Enlaces', 'ciencias', [l1, l2], [
    ['icf-cn-atomo-1', 'Cada elemento tiene sus propios niveles de energía.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Qué metal da el rojo?', [1]], ['¿Por qué se emite luz?', [2]], ['¿Cómo se descubrió el helio?', [5]]] }, 'El rojo está en el 1, la luz en el 2 y el helio en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-atomo-1', 'La luz emitida identifica al elemento.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['El sodio da amarillo.', 0], ['La luz de una estrella permite saber si tiene sodio.', 1], ['Dos elementos no tienen los mismos niveles.', 1], ['El bario es el metal más caro.', 2]] }, 'El sodio está escrito; la estrella y los niveles se deducen; el precio no.', 'Une los párrafos 1 y 3.')],
    ['icf-cn-atomo-1', 'Los electrones suben y bajan de nivel.', opc('La luz de un fuego artificial se produce cuando los electrones:', ['Salen del núcleo', 'Regresan a un nivel de menor energía', 'Se vuelven protones', 'Se detienen'], 1, 'Al regresar sueltan energía en forma de luz.', 'Relee qué pasa cuando regresan.')],
    ['icf-cn-atomo-2', 'Las sales son compuestos iónicos, más estables que el metal.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Un elemento se comporta distinto solo que unido a otros.', cards: [['El cloro es tóxico, pero en la sal se come', true], ['El sodio reacciona con agua, la sal no', true], ['El agua caliente se enfría', false], ['Un cable se dobla', false]] }, 'Cloro y sodio cambian al unirse; enfriarse y doblarse no cambian la sustancia.', 'Busca casos en que el elemento está solo y luego unido.')],
    ['icf-cn-atomo-2', 'Metal con no metal: enlace iónico.', pl('intruso-excepto', 'La opción que no es razón para usar sales', { ask: 'Se usan sales en la pólvora por todo esto, EXCEPTO:', cards: [['Son más estables', [4]], ['Son más fáciles de manejar', [4]], ['El metal puro puede ser peligroso', [4]], ['Apagan los colores', null]] }, 'Las tres primeras están en el párrafo 4; los colores no se apagan.', 'Busca cada razón en el párrafo de las sales.')],
    ['icf-cn-atomo-2', 'En una sal, el metal entrega electrones.', opc('En el cloruro de estroncio, el estroncio (metal) y el cloro (no metal) se unen porque:', ['Comparten electrones por igual', 'Sueltan un mar de electrones', 'No tienen electrones', 'El metal entrega electrones al no metal'], 3, 'Metal con no metal: enlace iónico.', 'Pregunta qué hace un metal frente a un no metal.')],
  ]);
})());
