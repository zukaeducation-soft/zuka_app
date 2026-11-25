// Preicfes · Sociales y Ciudadanas, mundo 8 «Territorio y Ambiente» (Explora, escena «hoja»).
xpLec('icf-sc-geografia-1', [
  ['Regiones y altura',
    xpMira('hoja', 'Empecemos por la idea: seis regiones y un clima que depende de la **altura**.', { letras: ['1', '2', '3', '4'], paras: [['Andina: montañas y mucha gente'], ['Caribe y Pacífica: costas; una seca, otra lluviosa'], ['Orinoquía y Amazonía: enormes y poco pobladas'], ['Insular: islas']] }, [
      ['En la Andina vive la mayoría.', { luz: [0] }],
      ['Dos costas muy distintas.', { luz: [1], nota: { 1: 'seca y lluviosa' } }],
      ['Más de la mitad del país, con poca gente.', { luz: [2], nota: { 2: 'baja densidad' } }],
      ['Y las islas, rodeadas de mar.', { luz: [3] }],
      ['Cada mil metros que se suben, unos seis grados menos.', {}, '$1\\,000 \\text{ m} \\to 6\\,^\\circ\\text{C menos}$'],
    ], 'Seis regiones; al subir mil metros, unos seis grados menos.'),
    xpHaz('hoja', 'Al nivel del mar hay 28 °C. Subraya la temperatura aproximada a 3 000 m.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['28 °C'], ['10 °C'], ['22 °C']], pista: 'Baja unos seis grados por cada mil metros.' }, '$28 - 18 = 10$.')],
  ['Mapas que escogen',
    xpMira('hoja', 'Segunda idea: un mapa **escoge** qué mostrar y a qué **escala**.', { paras: [['Político: límites'], ['Físico: relieve y ríos'], ['Temático: un asunto'], ['1 : 1 000 000 → 1 cm son 10 km'], ['1 : 10 000 → 1 cm son 100 m']] }, [
      ['Este mapa muestra las fronteras.', { luz: [0] }],
      ['Este, montañas y agua.', { luz: [1] }],
      ['Este, una sola cosa: lluvias, empleo…', { luz: [2] }],
      ['Con esta escala cabe un país.', { luz: [3], nota: { 3: 'poco detalle' } }],
      ['Con esta, un barrio y sus calles.', { luz: [4], nota: { 4: 'mucho detalle' } }],
    ], 'Qué muestra, qué deja fuera y cuánto redujo.'),
    xpHaz('hoja', 'En un mapa 1 : 50 000, dos pueblos están a 4 cm. Subraya la distancia real.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['50 km'], ['20 km'], ['2 km']], pista: 'Cada centímetro son 50 000 cm: 500 metros.' }, '$4 \\cdot 500 = 2\\,000$ m.')],
  ['La población se mueve',
    xpMira('hoja', 'Tercera idea: la población se **concentra**, se **mueve** y **envejece**.', { paras: [['Densidad: habitantes por km²'], ['Del campo a la ciudad'], ['Por decisión o a la fuerza'], ['Pirámide: base que se encoge, punta que crece']] }, [
      ['No importa solo cuántos: también en cuánto espacio.', { luz: [0] }],
      ['Hoy, tres de cada cuatro viven en ciudades.', { luz: [1], nota: { 1: 'migración' } }],
      ['Unos eligieron; otros huyeron.', { luz: [2] }],
      ['Nacen menos y se vive más.', { luz: [3], nota: { 3: 'envejece' } }],
      ['El dibujo anuncia qué hará falta.', { luz: [3] }],
    ], 'Densidad, migración y pirámide.'),
    xpHaz('hoja', 'A: 10 000 personas en 50 km². B: 12 000 en 120 km². Subraya el de **mayor densidad**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['A'], ['B'], ['Igual']], pista: 'Divide personas entre kilómetros cuadrados.' }, 'A: 200 por km²; B: 100.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'La pirámide de un municipio tiene la base muy ancha. Subraya lo que más va a necesitar pronto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Hogares para ancianos'], ['Cupos en jardines y primaria'], ['Menos maestros']], pista: '¿Qué edades están en la base?' }, 'En la base están los niños.')],
], 'Altura, mapas y gente que se mueve.');

xpLec('icf-sc-geografia-2', [
  ['Renovable no es infinito',
    xpMira('hoja', 'Empecemos por la idea: **renovable** se recupera, si se usa con medida.', { paras: [['Agua, bosque, viento'], ['Petróleo, carbón'], ['Bosque talado más rápido de lo que crece']] }, [
      ['Estos se recuperan con el tiempo.', { luz: [0], nota: { 0: 'renovables' } }],
      ['Estos tardan millones de años.', { luz: [1], nota: { 1: 'no renovables' } }],
      ['Pero este se acaba igual.', { luz: [2], tacha: [2] }],
      ['Importa la velocidad a la que se usa.', { luz: [2] }],
      ['Cuidar es no gastar más de lo que vuelve.', {}],
    ], 'Se recupera si se usa despacio.'),
    xpHaz('hoja', 'Un río recibe 100 litros por segundo y se sacan 130. Subraya lo que pasará.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Nada: el agua es renovable.'], ['El río irá bajando.'], ['El río crecerá.']], pista: 'Compara lo que entra con lo que sale.' }, 'Sale más de lo que entra.')],
  ['Tres patas',
    xpMira('hoja', 'Segunda idea: lo **sostenible** tiene tres patas: economía, sociedad y ambiente.', { paras: [['Da empleo'], ['No expulsa a nadie'], ['Cuida el agua'], ['Da empleo y envenena el río'], ['Cuida el río y expulsa a su gente']] }, [
      ['Esta es la pata económica.', { luz: [0], nota: { 0: 'económica' } }],
      ['Esta es la pata social.', { luz: [1], nota: { 1: 'social' } }],
      ['Y esta es la pata ambiental.', { luz: [2], nota: { 2: 'ambiental' } }],
      ['Aquí falta una: cojea.', { luz: [3], tacha: [3] }],
      ['Aquí falta otra: también cojea.', { luz: [4], tacha: [3, 4] }],
    ], 'Si falla una, no es sostenible.'),
    xpHaz('hoja', 'Subraya el proyecto **más sostenible**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Hotel que seca la laguna y da empleo'], ['Parque cerrado, sin los que vivían allí'], ['Ecoturismo manejado por la comunidad, con límite de visitas']], pista: 'Revisa las tres patas en cada uno.' }, 'Da ingreso, incluye a la gente y cuida el lugar.')],
  ['Quién está en la mesa',
    xpMira('hoja', 'Tercera idea: toda decisión sobre el territorio **reparte** ganancias y pérdidas.', { paras: [['Empresa: gana'], ['Ciudad: gana agua'], ['Campesino: pierde su siembra'], ['Consulta, audiencias, ordenamiento']] }, [
      ['Primero: alguien gana dinero.', { luz: [0] }],
      ['Alguien gana un servicio.', { luz: [1] }],
      ['Alguien pierde su sustento.', { luz: [2], nota: { 2: '¿está en la mesa?' } }],
      ['Estas reglas buscan que se le oiga.', { luz: [3], nota: { 3: 'que se oiga' } }],
      ['Un mapa sin casas es peligroso.', { luz: [2] }],
    ], 'Pregunta quién gana, quién pierde y quién decide.'),
    xpHaz('hoja', 'Se hará una represa y el plano no muestra viviendas. Subraya la mejor pregunta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['¿Quién vive allí y qué dice?'], ['¿De qué color será?'], ['¿Quién dibujó el plano más bonito?']], pista: 'Piensa qué deja por fuera el plano.' }, 'Hay que oír a quienes viven en el lugar.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'En un país poco industrial, la mayor emisión de gases viene de talar bosques. Subraya la medida que más ayudaría.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Cerrar todas las fábricas'], ['Frenar la deforestación con alternativas para quienes viven de ella'], ['Pintar los techos de verde']], pista: 'Ataca la mayor fuente sin olvidar a la gente.' }, 'Va a la fuente principal y cuida la pata social.')],
], 'Usar con medida, tres patas y oír a todos.');
