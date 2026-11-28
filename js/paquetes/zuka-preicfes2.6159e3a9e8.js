// Generado por tools/empaquetar.js: no editar a mano.
;
//#archivo js/explora-icf-sc-7-pasos.js
// Preicfes · Sociales y Ciudadanas, mundo 7 «Historia del Mundo», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  const T = (x, y, s, c = '#1d2328', tam = 11, peso = 600) => `<text x="${x}" y="${y}" fill="${c}" font-size="${tam}" font-weight="${peso}" style="text-anchor:middle;font-family:Jost,system-ui,sans-serif">${s}</text>`;
  const bola = (x, y, r, c, s) => `<circle cx="${x}" cy="${y + 2}" r="${r}" fill="#000" opacity=".18"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}" stroke="#3b2a12" stroke-width=".8"/>` + (s ? T(x, y + 4, s, '#fff', r > 20 ? 11 : 8) : '');
  // La plaza de una revolución: el parlamento, la urna, la gente y la declaración.
  const plaza = v => X.foto((v.cap ? X.edificio(270, 166, 110, 'capitolio', { bandera: false }) : '') + (v.urna ? X.urna(170, 178, 0.68, v.e || 0) : '') +
    (v.gente ? X.persona(70, 180, 0.8, '#3f6fb5') + X.persona(104, 182, 0.82, '#b5493f') : '') +
    (v.doc ? X.documento(12, 12, 128, 88, ['Libres e iguales', 'en derechos'], { titulo: 'Declaración', fecha: '1789' }) : '') +
    (v.r ? X.rot(220, 198, v.r, 'oscuro') : ''), 208, 'ciudad');
  // Mapa esquemático sobre una mesa: dos potencias, sus aliados y, al final, los dos bloques.
  const mapa = v => {
    const b = v.bloques, A = b ? 'EE. UU.' : 'Potencia 1', B = b ? 'URSS' : 'Potencia 2';
    let s = `<rect x="14" y="14" width="312" height="172" rx="8" fill="#e9e2cf" stroke="#9c7b45"/>`;
    if (v.doc && !v.a) s += X.documento(110, 40, 124, 92, ['Si atacan a uno,', 'responden todos'], { titulo: 'Tratado' });
    if (v.a) {
      if (v.al) s += [[40, 52], [42, 148], [100, 162]].map(([x, y]) => `<line x1="96" y1="100" x2="${x}" y2="${y}" stroke="#2c5d9a" stroke-width="2" stroke-dasharray="4 3"/>` + bola(x, y, 12, '#7fa6d8')).join('') +
        [[300, 46], [298, 154], [206, 38]].map(([x, y]) => `<line x1="244" y1="100" x2="${x}" y2="${y}" stroke="#9a3c2c" stroke-width="2" stroke-dasharray="4 3"/>` + bola(x, y, 12, '#d89a8f')).join('');
      s += bola(96, 100, 36, '#3f6fb5', A) + bola(244, 100, 38, '#b5493f', B);
      if (b) s += `<line x1="170" y1="56" x2="170" y2="150" stroke="#1d2328" stroke-width="3" stroke-dasharray="6 4"/>` + X.rot(170, 176, 'Guerra Fría', 'oscuro');
    }
    return X.foto(s + (v.r ? X.rot(170, 176, v.r, 'oscuro') : ''), 200, 'papel');
  };
  // Una marcha pacífica y el periódico que la cuenta.
  const marcha = v => X.foto((v.per ? X.periodico(12, 12, 124, 92, 'Marcha pacífica') : '') +
    (v.gente ? X.persona(160, 180, 0.8, '#3f6fb5') + X.persona(196, 182, 0.84, '#7a4fb5', { cartel: 'Iguales' }) + X.persona(250, 180, 0.8, '#3f9b6a') + X.persona(286, 182, 0.84, '#b5493f', { cartel: 'Votar' }) : '') +
    (v.r ? X.rot(170, 200, v.r, 'oscuro') : ''), 210, 'ciudad');

  xpAmplia('icf-sc-mundo-1', {
    conecta: 'icf-sc-historia-1',
    desde: [
      ['Desde cero: rey, ciudadanos y revolución',
        xpMira('dibujo', 'Desde el principio: tres palabras para entender las revoluciones de hace más de dos siglos.', { dib: plaza, v: { cap: 1 }, alto: 208 }, [
          ['En la lección de la independencia viste que llegaban ideas de libertad desde Europa.', { cap: 1 }],
          ['Monarquía absoluta: un rey que hace las leyes, gobierna y juzga sin rendir cuentas.', { cap: 1, r: 'manda uno solo' }],
          ['Democracia: el poder sale de los ciudadanos, que votan y eligen.', { cap: 1, r: 'mandan los ciudadanos', gente: 1, urna: 1, e: 1 }],
          ['Revolución: un cambio grande y rápido que pasa de un orden a otro.', { cap: 1, r: 'revolución', gente: 1, urna: 1, e: 1, doc: 1 }],
          ['Es como cambiar las reglas del juego, no solo el jugador.', { cap: 1, r: 'otras reglas', gente: 1, urna: 1, e: 1, doc: 1 }],
        ], 'Monarquía absoluta: uno manda solo. Democracia: mandan los ciudadanos. Revolución: cambiar las reglas.'),
        xpHaz('hoja', 'Subraya el rasgo de una **monarquía absoluta**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El rey hace las leyes, gobierna y juzga sin rendir cuentas.'], ['Los ciudadanos eligen a sus gobernantes cada cuatro años.'], ['Un congreso puede frenar al gobierno.']], pista: 'En la absoluta nadie le pone límites al rey. ¿Cuál no tiene límites?' }, 'Todo el poder en una sola persona.')],
    ],
    despues: [
      ['Más difícil: revoluciones en cadena',
        xpMira('hoja', 'Un paso más: las revoluciones se **encadenaron**. Ordénalas y verás quién pudo influir en quién.', { paras: [['1776: trece colonias británicas declaran su independencia.'], ['1789: en Francia cae el orden de privilegios por nacimiento.'], ['1804: Haití se independiza, fundado por antiguos esclavizados.'], ['1810: juntas de gobierno en la América española.']] }, [
          ['Primero, unas colonias se separan de su rey: un ejemplo posible para otros.', { luz: [0], nota: { 0: 'ejemplo' } }],
          ['Luego, en Francia, se ataca el privilegio por nacimiento.', { luz: [1], nota: { 1: 'ideas' } }],
          ['Haití va más lejos: los esclavizados se liberan y fundan un país.', { luz: [2], nota: { 2: 'más lejos' } }],
          ['Esas noticias e ideas llegan a la América española en 1810.', { luz: [3], nota: { 3: 'aquí' } }],
          ['Trampa: invertir el orden. Algo no puede influir en lo que pasó antes.', {}],
        ], 'Las revoluciones se encadenaron: 1776, 1789, 1804 y 1810. Cada una solo influye en las que vienen después.'),
        xpHaz('hoja', 'Subraya lo que **no** pudo influir en la independencia de las trece colonias, en 1776.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Las ideas de libertad de pensadores ingleses.'], ['La Revolución francesa de 1789.'], ['Los impuestos británicos a las colonias.']], pista: 'Mira los años: una de ellas pasó después de 1776.' }, '1789 es posterior: no pudo influir en 1776.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: una **fuente** y la pregunta por su uso correcto. Cuidado con hacerle decir de más.', { letras: ['A', 'B', 'C', 'D'], paras: [['Muestra las condiciones de trabajo que llevaron a leyes de protección a la infancia.'], ['Prueba que en toda Europa los niños trabajaban 12 horas.'], ['Muestra que la industria no le cambió la vida a nadie.'], ['Prueba que los niños preferían la fábrica a la escuela.']] }, [
          ['La fuente: un informe inglés de 1833 cuenta que niños de 9 años trabajaban 12 horas en fábricas de algodón.', {}],
          ['Esta generaliza: un informe inglés no habla por toda Europa.', { luz: [1], nota: { 1: 'generaliza' } }],
          ['Esta contradice la fuente: la fábrica cambió la vida de esos niños.', { luz: [2], nota: { 2: 'contradice' } }],
          ['Esta inventa lo que los niños pensaban: la fuente no lo dice.', { luz: [3], nota: { 3: 'inventa' } }],
          ['Esta usa la fuente para lo que sí muestra: condiciones que pedían leyes.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Usa la fuente para lo que muestra: ni más lugares, ni más gente, ni pensamientos que no dice.'),
      xpHaz('hoja', 'En la Francia revolucionaria se proclamó la igualdad, pero para votar había que pagar impuestos. Subraya lo **correcto**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Todos los franceses votaban desde 1789.'], ['La igualdad proclamada convivía con exclusiones en la práctica.'], ['La revolución quitó todos los derechos.'], ['Solo votaban las mujeres.']], pista: 'Compara lo que se dijo con quién podía votar de verdad.' }, 'Se proclamó para todos, pero no todos votaban.')],
    cierre: 'Qué cambió y para quién, en qué orden pasó y qué lucha quedó abierta.',
  });

  xpAmplia('icf-sc-mundo-2', {
    conecta: 'icf-sc-mundo-1',
    desde: [
      ['Desde cero: potencias, alianzas y bloques',
        xpMira('dibujo', 'Desde el principio: para entender las guerras del siglo XX hacen falta tres palabras.', { dib: mapa, v: { doc: 1 }, alto: 200 }, [
          ['En la lección de las revoluciones viste cómo las ideas cruzaban fronteras.', { doc: 1 }],
          ['Una potencia es un país con mucho poder militar y económico.', { doc: 1, a: 1 }],
          ['Una alianza es un pacto: si atacan a uno, los demás lo defienden.', { doc: 1, a: 1, al: 1 }],
          ['Como un pleito de colegio: un empujón y entran los amigos de cada lado.', { doc: 1, a: 1, al: 1, r: 'un empujón, todos entran' }],
          ['Después de 1945 quedaron dos bloques: Estados Unidos y la Unión Soviética.', { doc: 1, a: 1, al: 1, r: '', bloques: 1 }],
        ], 'Potencia: país con mucho poder. Alianza: pacto de defensa. Tras 1945, dos bloques enfrentados.'),
        xpHaz('hoja', 'Subraya qué es una **alianza**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Un pacto entre países para defenderse si atacan a uno.'], ['Una guerra entre dos ciudades.'], ['Un país con mucho petróleo.']], pista: 'Piensa en el pleito del colegio: ¿por qué entran los amigos?' }, 'Un pacto de defensa mutua.')],
    ],
    despues: [
      ['Más difícil: lo que se aprendió de la guerra',
        xpMira('hoja', 'Un paso más: después de 1945, el mundo creó **reglas nuevas** para que el horror no se repitiera.', { paras: [['1945: termina la guerra y nace la ONU.'], ['1948: Declaración Universal de los Derechos Humanos.'], ['En Núremberg se juzgó a líderes nazis.'], ['La idea: hay crímenes que ofenden a toda la humanidad.']] }, [
          ['El horror de la guerra empujó a crear la ONU, para resolver conflictos hablando.', { luz: [0], nota: { 0: 'ONU' } }],
          ['En 1948 se escribieron derechos para toda persona, en cualquier país.', { luz: [1], nota: { 1: 'derechos' } }],
          ['Por primera vez se juzgó a líderes por crímenes contra la humanidad.', { luz: [2], nota: { 2: 'juicio' } }],
          ['Cumplir órdenes no sirvió de excusa para un genocidio.', { luz: [3] }],
          ['Trampa: creer que la ONU acabó con las guerras. Hubo muchas después de 1945.', {}],
        ], 'Tras la Segunda Guerra nacieron la ONU, los derechos humanos universales y los juicios por crímenes graves.'),
        xpHaz('hoja', 'Subraya lo que **cambió** con la Declaración de 1948.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Se acabaron todas las guerras del mundo.'], ['Cada país quedó libre de tratar a su gente como quisiera.'], ['Se reconocieron derechos para toda persona, sin importar su país.']], pista: 'Una opción exagera y otra dice lo contrario. Busca la que habla de «toda persona».' }, 'Derechos para toda persona, en cualquier lugar.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: un **hecho de la Guerra Fría** y la pregunta «¿por qué fue tan grave?».', { letras: ['A', 'B', 'C', 'D'], paras: [['Porque podía desatar una guerra nuclear directa entre las dos potencias.'], ['Porque Cuba quería invadir Estados Unidos.'], ['Porque los misiles eran de la Segunda Guerra.'], ['Porque la ONU había prohibido las islas.']] }, [
          ['El hecho: en 1962 la Unión Soviética puso misiles en Cuba, muy cerca de Estados Unidos.', {}],
          ['Esta exagera: el peligro no era una invasión cubana.', { luz: [1], nota: { 1: 'exagera' } }],
          ['Esta mezcla épocas: la Segunda Guerra había terminado en 1945.', { luz: [2], nota: { 2: 'anacronismo' } }],
          ['Esta no tiene ningún sentido histórico.', { luz: [3], nota: { 3: 'absurda' } }],
          ['Misiles cerca del rival: las dos potencias quedaron a un paso de chocar de frente.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Ubica el hecho en su época y pregunta qué ponía en riesgo.'),
      xpHaz('hoja', 'Un cartel alemán de 1930 culpa a un grupo religioso de la crisis económica. Subraya lo que **muestra** esa fuente.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['Que ese grupo causó la crisis de 1929.'], ['Que en Alemania no hubo crisis.'], ['Que la propaganda solo informaba.'], ['Cómo la propaganda buscaba un culpable, preparando la persecución.']], pista: 'El cartel tiene interés en culpar. ¿Prueba lo que acusa o muestra a quien lo hizo?' }, 'Una fuente con interés muestra a quien la hizo, no prueba lo que acusa.')],
    cierre: 'Chispa y pólvora, crisis y dictaduras, reglas nuevas después de 1945 y dos bloques enfrentados.',
  });

  xpAmplia('icf-sc-mundo-3', {
    conecta: 'icf-sc-mundo-2',
    desde: [
      ['Desde cero: colonia y movimiento social',
        xpMira('dibujo', 'Desde el principio: dos ideas para la segunda mitad del siglo XX, cuando muchos pueblos pidieron su lugar.', { dib: marcha, v: { per: 1 }, alto: 210 }, [
          ['En la lección de la Guerra Fría viste un mundo partido en dos bloques.', { per: 1 }],
          ['Colonia: territorio gobernado por otro país, que se lleva sus riquezas.', { per: 1, r: 'colonia' }],
          ['Descolonizar es dejar de ser colonia y volverse un país independiente.', { per: 1, r: 'descolonizar' }],
          ['Un movimiento social es gente organizada para cambiar algo que ve injusto.', { per: 1, r: 'movimiento social', gente: 1 }],
          ['Como un salón que se pone de acuerdo para pedir algo juntos, no cada uno solo.', { per: 1, r: 'juntos', gente: 1 }],
        ], 'Colonia: gobernada por otro país. Descolonizar: independizarse. Movimiento social: gente organizada contra algo injusto.'),
        xpHaz('hoja', 'Subraya un **movimiento social**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Mujeres que se organizan durante años para conseguir el voto.'], ['Una persona que se queja sola en su casa.'], ['Un partido de fútbol del domingo.']], pista: 'Busca gente organizada, por tiempo largo, para cambiar algo injusto.' }, 'Organizadas y por años: movimiento social.')],
    ],
    despues: [
      ['Más difícil: la ley llega antes que la práctica',
        xpMira('hoja', 'Un paso más: los logros de un movimiento llegan **por partes**. Mira el caso de Colombia.', { paras: [['1954: en Colombia se reconoce el voto de las mujeres.'], ['1957: votan por primera vez, en un plebiscito.'], ['1991: la Constitución reconoce la diversidad étnica y cultural.'], ['Aun así, la igualdad real sigue siendo una tarea.']] }, [
          ['Un movimiento puede tardar décadas: el voto femenino llegó aquí en 1954.', { luz: [0], nota: { 0: 'ley' } }],
          ['Y se usó por primera vez tres años después.', { luz: [1], nota: { 1: 'práctica' } }],
          ['En 1991 se reconoció que Colombia es un país diverso.', { luz: [2], nota: { 2: 'Constitución' } }],
          ['Pero una ley escrita no cambia de un día para otro la vida diaria.', { luz: [3], nota: { 3: 'tarea' } }],
          ['Trampa: creer que el logro legal acabó el problema. Ley y práctica son distintas.', {}],
        ], 'Los logros de un movimiento llegan por partes: primero la ley, después la práctica.'),
        xpHaz('hoja', 'Una ley prohíbe pagarles menos a las mujeres por el mismo trabajo. Subraya lo que **no** se puede concluir solo con eso.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Que ya no existe ninguna diferencia de salario.'], ['Que pagar menos por eso es ilegal.'], ['Que existe una norma sobre esos salarios.']], pista: 'Una ley dice lo que debe pasar. ¿Dice lo que ya pasa?' }, 'La ley no prueba que la práctica cambió.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: un **caso histórico** y la pregunta «¿qué afirmación es correcta?». Busca la que no generaliza.', { letras: ['A', 'B', 'C', 'D'], paras: [['La descolonización tuvo caminos distintos: unos negociados y otros por guerra.'], ['Todas las colonias se independizaron sin violencia.'], ['Argelia era una colonia británica.'], ['Después de la independencia no quedó ningún problema.']] }, [
          ['El caso: Argelia se independizó de Francia en 1962, tras una guerra de ocho años.', {}],
          ['Esta generaliza con «todas»: el caso mismo la desmiente.', { luz: [1], nota: { 1: 'generaliza' } }],
          ['Esta cambia el dato: la metrópoli era Francia.', { luz: [2], nota: { 2: 'dato falso' } }],
          ['Esta es absoluta: fronteras y desigualdades siguieron.', { luz: [3], nota: { 3: 'absoluto' } }],
          ['Hubo independencias pactadas y otras por guerra: esta lo dice sin exagerar.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Descarta lo que generaliza, cambia datos o dice «ningún»; queda la afirmación prudente.'),
      xpHaz('hoja', 'Unos estudiantes se sientan en silencio en una cafetería que no atiende a personas negras, aunque los saquen. Subraya la **herramienta**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Una huelga, porque dejan de trabajar.'], ['Una sentada: desobediencia civil no violenta.'], ['Una guerra de guerrillas.'], ['Un referendo.']], pista: 'No trabajan allí ni votan nada: ocupan un lugar en paz para mostrar una injusticia.' }, 'Ocupar en paz un lugar injusto: una sentada.')],
    cierre: 'Caminos distintos para dejar de ser colonia, gente que se organiza y leyes que llegan antes que la práctica.',
  });
}
;
//#archivo js/explora-icf-sc-8.js
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
;
//#archivo js/explora-icf-sc-8-pasos.js
// Preicfes · Sociales y Ciudadanas, mundo 8 «Territorio y Ambiente», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  // Una montaña en el campo con termómetros a dos alturas.
  const montana = v => X.foto((v.m ? `<path d="M6 176 L118 62 L170 40 L222 64 L334 176 Z" fill="#7d8f62" stroke="#5d6e46"/><path d="M8 176 L118 62 L170 40 L170 176 Z" fill="#000" opacity=".08"/>` +
      `<path d="M150 50 L170 40 L192 52 L182 58 L170 52 L160 58Z" fill="#f4f6f7"/>` : '') +
    (v.t1 ? X.termometro(44, 172, 60, 0.85, '30 °C') : '') + (v.t2 ? X.termometro(250, 118, 50, 0.4, '18 °C') + X.rot(250, 136, '2 000 m') : '') +
    (v.r ? X.rot(170, 24, v.r, 'oscuro') : ''), 210, 'campo');
  // Un bosque junto al río: los árboles que quedan (v.arb de 0 a 5) y los tocones de los talados.
  const bosque = v => {
    const xs = [40, 92, 144, 196, 248], k = Math.round(v.arb ?? 5);
    return X.foto((v.sol ? X.sol(300, 36, 18) : '') + (v.rio ? X.rio(190, 14) : '') +
      xs.map((x, i) => (i < k ? X.arbol(x, 170, 0.8) : (v.tocones ? `<rect x="${x - 6}" y="160" width="12" height="10" rx="2" fill="#8a5a33" stroke="#5b3a1f"/><ellipse cx="${x}" cy="160" rx="6" ry="2.5" fill="#c99a64"/>` : ''))).join('') +
      (v.r ? X.rot(170, 24, v.r, 'oscuro') : ''), 210, 'campo');
  };

  xpAmplia('icf-sc-geografia-1', {
    conecta: 'icf-sc-fuentes-1',
    desde: [
      ['Desde cero: región, clima y altura',
        xpMira('dibujo', 'Desde el principio: una **región** es una zona con rasgos en común. En Colombia, el clima depende mucho de la **altura**.', { dib: montana, v: { m: 1 }, alto: 210 }, [
          ['En la lección de fuentes viste un mapa viejo que dejaba una selva en blanco.', { m: 1 }],
          ['Una región es una zona que comparte rasgos: relieve, clima, gente o economía.', { m: 1, r: 'región' }],
          ['Hay seis regiones naturales: Andina, Caribe, Pacífica, Orinoquía, Amazonía e Insular.', { m: 1, r: 'seis regiones' }],
          ['Cerca del ecuador no hay estaciones fuertes: el clima cambia sobre todo con la altura.', { m: 1, r: 'altura', t1: 1 }],
          ['Subir la montaña es como abrir la nevera: cada piso, más frío.', { m: 1, r: 'más alto, más frío', t1: 1, t2: 1 }],
        ], 'Región: zona con rasgos comunes. En Colombia, a más altura, menos temperatura.'),
        xpHaz('hoja', 'Subraya lo que más explica que haga frío en un pueblo de montaña colombiano.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Que en ese pueblo es invierno en diciembre.'], ['Que está a mucha altura sobre el nivel del mar.'], ['Que tiene muchos habitantes.']], pista: 'En el trópico no hay estaciones fuertes. ¿Qué cambia al subir la montaña?' }, 'La altura enfría el clima.')],
    ],
    despues: [
      ['Más difícil: escala y densidad juntas',
        xpMira('hoja', 'Un paso más: a veces hay que usar **la escala y la densidad** en el mismo problema.', { paras: [['En un mapa a escala 1 : 100 000, un municipio mide 3 cm por 2 cm.'], ['1 cm del mapa son 100 000 cm reales: 1 km.'], ['El municipio mide 3 km por 2 km: 6 km².'], ['Si viven 18 000 personas, hay 3 000 por km².']] }, [
          ['Primero, la escala: cuánto vale cada centímetro del mapa.', { luz: [0], nota: { 0: 'escala' } }],
          ['100 000 cm son 1 000 m: un kilómetro por cada centímetro.', { luz: [1], nota: { 1: '1 cm = 1 km' } }],
          ['La escala se aplica a cada lado, y después se multiplica: 3 por 2.', { luz: [2], nota: { 2: '6 km²' } }],
          ['La densidad es gente dividida por área: 18 000 entre 6.', { luz: [3], nota: { 3: '3 000 por km²' } }],
          ['Trampa: dividir por el área del mapa sin convertir. Primero se pasa cada lado a kilómetros.', {}],
        ], 'Convierte cada lado con la escala, multiplica para el área y divide la gente por el área.'),
        xpHaz('hoja', 'Mapa a escala 1 : 50 000. Una vereda mide 6 cm por 2 cm y viven 900 personas. Subraya su **densidad**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['75 personas por km².'], ['300 personas por km².'], ['18 personas por km².']], pista: 'Cada centímetro vale medio kilómetro. Convierte los dos lados antes de multiplicar.' }, '3 km por 1 km son 3 km²; 900 entre 3 da 300.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: un **cambio en la población** y la pregunta «¿qué es más probable?».', { letras: ['A', 'B', 'C', 'D'], paras: [['Aumenta la demanda de colegios y de vivienda.'], ['La población envejece rápidamente.'], ['Baja la densidad del municipio.'], ['Cambia el clima del municipio.']] }, [
          ['El caso: a un municipio llegan muchas familias jóvenes desde el campo.', {}],
          ['Esta invierte el efecto: llegan jóvenes, la población se rejuvenece.', { luz: [1], nota: { 1: 'invertida' } }],
          ['Esta también invierte: más gente en la misma área sube la densidad.', { luz: [2], nota: { 2: 'invertida' } }],
          ['Esta se sale del tema: la gente no cambia la altura ni el clima.', { luz: [3], nota: { 3: 'fuera' } }],
          ['Familias jóvenes traen niños y necesitan casa: colegios y vivienda.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Pregunta quién llega o se va y qué necesita: de ahí sale el efecto probable.'),
      xpHaz('hoja', 'Barranquilla está casi al nivel del mar y Tunja, a unos 2 800 m. Subraya lo que mejor explica su diferencia de temperatura.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['La distancia de cada una a Bogotá.'], ['El número de habitantes.'], ['La altura: al subir, baja la temperatura.'], ['Que Tunja queda al sur del ecuador.']], pista: 'Una opción tiene un dato falso de ubicación. Busca el rasgo del relieve.' }, 'Tunja está mucho más alta: es más fría.')],
    cierre: 'Regiones con rasgos comunes, clima que baja con la altura, mapas con escala y gente que se concentra y se mueve.',
  });

  xpAmplia('icf-sc-geografia-2', {
    conecta: 'icf-sc-geografia-1',
    desde: [
      ['Desde cero: recursos que se reponen y que se acaban',
        xpMira('dibujo', 'Desde el principio: un **recurso natural** es algo de la naturaleza que la gente usa para vivir o producir.', { dib: bosque, v: { arb: 5 }, alto: 210 }, [
          ['En la lección de regiones viste que cada zona tiene su relieve y su clima.', { arb: 5 }],
          ['Un recurso natural es lo que usamos de la naturaleza: agua, suelo, bosque, petróleo.', { arb: 5, rio: 1 }],
          ['Renovable: se repone con el tiempo, como un bosque. No renovable: se acaba, como el petróleo.', { arb: 5, rio: 1, sol: 1 }],
          ['Pero si se tala más rápido de lo que crece, el bosque también se acaba.', { arb: 2, rio: 1, sol: 1, tocones: 1 }],
          ['Es como una alcancía: si sacas más de lo que metes, se vacía.', { arb: 2, rio: 1, sol: 1, tocones: 1, r: 'sacar menos de lo que entra' }],
        ], 'Recurso: lo que usamos de la naturaleza. Renovable se repone si se usa con medida; no renovable se acaba.'),
        xpHaz('hoja', 'Subraya el recurso **no renovable**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El carbón de una mina.'], ['La madera de un bosque sembrado.'], ['El agua de la lluvia.']], pista: 'Busca el que tardó millones de años en formarse y no vuelve a crecer.' }, 'El carbón no se repone a escala humana.')],
    ],
    despues: [
      ['Más difícil: gana uno aquí, paga otro allá',
        xpMira('hoja', 'Un paso más: en un territorio, quien gana y quien paga **no viven en el mismo lugar**.', { paras: [['En la parte alta de una cuenca se tala el bosque para potreros.'], ['El ganadero tiene más pasto.'], ['Abajo, la quebrada se seca en verano y se desborda en invierno.'], ['Quien gana y quien paga no viven en el mismo sitio.']] }, [
          ['Arriba se cambia bosque por potrero.', { luz: [0], nota: { 0: 'arriba' } }],
          ['El beneficio se queda con quien taló.', { luz: [1], nota: { 1: 'gana' } }],
          ['El costo baja con el agua: sequías y crecientes.', { luz: [2], nota: { 2: 'paga' } }],
          ['Por eso se mira la cuenca entera, no solo un predio.', { luz: [3] }],
          ['Trampa: juzgar un proyecto solo donde se hace. Sus efectos viajan.', {}],
        ], 'El beneficio y el costo pueden quedar en lugares distintos: mira la cuenca entera.'),
        xpHaz('hoja', 'Un pueblo pide cuidar un páramo que queda lejos. Subraya la **mejor razón**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El páramo guarda y regula el agua que llega al pueblo.'], ['El páramo se ve bonito en las fotos.'], ['El páramo queda cerca de la capital.']], pista: 'Piensa en la cuenca: ¿qué baja del páramo hasta el pueblo?' }, 'El agua del pueblo nace allá arriba.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **¿qué pregunta ayuda más a evaluar si un proyecto es sostenible?** Busca las tres patas.', { letras: ['A', 'B', 'C', 'D'], paras: [['¿Cuánto dinero dejará el primer año?'], ['¿Dará empleo a la gente del lugar sin destruir los humedales que regulan el agua?'], ['¿Le gusta el proyecto al gobernador?'], ['¿Hay proyectos así en otros países?']] }, [
          ['El caso: sembrar palma en una zona de humedales para dar empleo.', {}],
          ['Esta mira una sola pata, la económica, y a corto plazo.', { luz: [0], nota: { 0: 'una pata' } }],
          ['Esta acepta por autoridad: el gusto de alguien no mide nada.', { luz: [2], nota: { 2: 'autoridad' } }],
          ['Esta no dice nada sobre este lugar.', { luz: [3], nota: { 3: 'no pesa' } }],
          ['Esta junta gente, economía y ambiente: las tres patas.', { luz: [1], nota: { 1: 'sirve' } }],
        ], 'Sostenible: economía, sociedad y ambiente a la vez, en ese lugar y con el tiempo.'),
      xpHaz('hoja', 'Una ciudad crece hacia una zona que se inunda. Subraya la medida que atiende **al ambiente y a la gente**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Construir allí sin estudios, porque hay demanda.'], ['Prohibir toda construcción en la ciudad.'], ['Dejar la zona inundable como parque y ofrecer vivienda segura en otro lugar.'], ['Rellenar el humedal con escombros.']], pista: 'Descarta lo que ignora el agua y lo que deja a la gente sin casa.' }, 'Cuida el humedal y da vivienda segura.')],
    cierre: 'Usar con medida, mirar las tres patas y recordar que el costo puede caerle a otro, río abajo.',
  });
}
;
//#archivo js/explora-icf-sc-9.js
// Preicfes · Sociales y Ciudadanas, mundo 9 «Economía y Globalización» (Explora, escenas «dibujo» y «hoja»).
{
  // Oferta y demanda: o y d corren las curvas; e enciende el equilibrio.
  const curvas = (v, K) => { const x0 = 70, x1 = 270, X = (x0 + x1) / 2 + (v.o + v.d) / 2, Y = 96 + (v.o - v.d) / 2; return K.l(60, 20, 60, 176, 'lm') + K.l(60, 176, 290, 176, 'lm') + K.t(54, 18, 'precio', 's tm', 'start') + K.t(290, 190, 'cantidad', 's tm', 'end') + K.l(110 + v.o, 156, 230 + v.o, 36, 'la gr') + K.t(234 + v.o, 34, 'oferta', 's ta', 'start') + K.l(110 + v.d, 36, 230 + v.d, 156, 'lg gr') + K.t(234 + v.d, 166, 'demanda', 's tg', 'start') + K.f(v.e, K.l(60, Y, X, Y, 'lm') + K.c(X, Y, 6, 'fF')); };

  xpLec('icf-sc-economia-1', [
    ['Oferta y demanda',
      xpMira('dibujo', 'Empecemos por la idea: el precio sale del cruce entre **oferta** y **demanda**.', { dib: curvas, v: { o: 0, d: 0, e: 0 }, alto: 198 }, [
        ['Si sube el precio, se quiere comprar menos.', {}],
        ['Y se quiere vender más.', {}],
        ['Donde coinciden está el equilibrio.', { e: 1 }],
        ['Si se daña la cosecha, la oferta baja: sube el precio.', { o: -36 }],
        ['Si todos lo buscan, sube la demanda: también sube.', { o: 0, d: 36 }],
      ], 'Menos oferta o más demanda: sube el precio.'),
      xpHaz('hoja', 'Hubo tanta piña que se dañaba en los camiones. Subraya qué pasó con su precio.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Subió'], ['Bajó'], ['Quedó igual']], pista: '¿Aumentó lo que se ofrece o lo que se quiere?' }, 'Más oferta con la misma demanda: baja.')],
    ['Quién manda',
      xpMira('hoja', 'Segunda idea: importa **cuántos venden** y si **se ponen de acuerdo**.', { paras: [['Muchos puestos de jugo'], ['Una sola empresa de luz'], ['Cuatro fábricas pactan el precio'], ['El Estado vigila']] }, [
        ['Con muchos, ninguno manda.', { luz: [0], nota: { 0: 'competencia' } }],
        ['Con uno solo, no hay a dónde ir.', { luz: [1], nota: { 1: 'monopolio' } }],
        ['Este pacto secreto es ilegal.', { luz: [2], nota: { 2: 'cartel' } }],
        ['Por eso hay reglas y multas.', { luz: [3] }],
        ['También hay daños que pagan otros: externalidades.', {}],
      ], 'Competencia, monopolio y cartel.'),
      xpHaz('hoja', 'Pon al margen qué es cada caso.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['cartel', 'externalidad', 'monopolio'], meta: [2, 0, 1], paras: [['Un solo tren lleva a la isla.'], ['Dos cines acuerdan subir la boleta.'], ['El ruido de un bar no deja dormir al barrio.']], pista: 'Alguna no va ahí: ¿un vendedor, un pacto o un daño?' }, 'Uno solo, un pacto y un daño a terceros.')],
    ['Impuestos',
      xpMira('hoja', 'Tercera idea: pregunta **cuándo se paga** y **a quién le pesa más**.', { paras: [['Renta: según lo que se gana'], ['IVA: al comprar'], ['Cobra más proporción a quien más tiene'], ['Pesa más sobre quien menos tiene']] }, [
        ['Este depende de la persona.', { luz: [0], nota: { 0: 'directo' } }],
        ['Este lo paga cualquiera que compre.', { luz: [1], nota: { 1: 'indirecto' } }],
        ['Así, el que más tiene pone más.', { luz: [2], nota: { 2: 'progresivo' } }],
        ['Así, al que menos tiene le duele más.', { luz: [3], nota: { 3: 'regresivo' } }],
        ['Igual en pesos no es igual en peso.', {}],
      ], 'Directo o indirecto; progresivo o regresivo.'),
      xpHaz('hoja', 'Subraya el cobro **más progresivo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['50 mil por persona'], ['5 % a todos'], ['2 % al que gana poco y 20 % al que gana mucho']], pista: 'Busca el que cobra mayor proporción al que más gana.' }, 'La proporción aumenta con el ingreso.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Se fija la libra de queso en la mitad de lo que cuesta producirla. Subraya lo más probable.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Escasez y venta a escondidas'], ['Más queso en las tiendas'], ['Mejor queso']], pista: '¿Qué harán los que venden?' }, 'Los vendedores ofrecen menos a ese precio.')],
  ], 'El cruce, cuántos venden y a quién le pesa.');

  xpLec('icf-sc-economia-2', [
    ['Inflación',
      xpMira('hoja', 'Empecemos por la idea: hay **inflación** cuando sube **casi todo**.', { letras: ['1', '2', '3', '4'], paras: [['Canasta de ayer: 200 mil'], ['Canasta de hoy: 216 mil'], ['Sueldo: sigue en un millón'], ['Alcanza para menos']] }, [
        ['La misma canasta, un año después.', { luz: [0, 1] }],
        ['Subió ocho de cada cien.', { luz: [1], nota: { 1: '+8 %' } }, '$16 \\div 200 = 0.08$'],
        ['El recibo dice lo mismo.', { luz: [2], nota: { 2: 'nominal' } }],
        ['Pero ahora compra menos cosas.', { luz: [3], nota: { 3: 'real' } }],
        ['Para quedar igual, debía subir 8 %.', {}],
      ], 'Nominal es en pesos; real, en compras.'),
      xpHaz('hoja', 'El sueldo subió 6 % y los precios 9 %. Subraya lo que pasó con el salario **real**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Subió'], ['Bajó'], ['Quedó igual']], pista: '¿Qué subió más rápido?' }, 'Los precios corrieron más que el sueldo.')],
    ['Quién es desempleado',
      xpMira('hoja', 'Segunda idea: cuenta como **desempleado** quien **busca y no encuentra**.', { paras: [['Busca y no encuentra'], ['Trabaja sin contrato'], ['No trabaja ni busca'], ['Tasa = desempleados ÷ fuerza laboral']] }, [
        ['Este sí cuenta: es desempleado.', { luz: [0], nota: { 0: 'desempleado' } }],
        ['Este trabaja, pero es informal.', { luz: [1], nota: { 1: 'ocupado' } }],
        ['Este no entra en la cuenta.', { luz: [2], tacha: [2] }],
        ['La fuerza laboral son los dos primeros.', { luz: [0, 1, 3] }],
        ['Si muchos dejan de buscar, la tasa baja sin empleos.', {}],
      ], 'Buscar y no encontrar.'),
      xpHaz('hoja', 'En un pueblo, 90 trabajan, 10 buscan y 50 no buscan. Subraya la tasa de desempleo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['40 %'], ['10 %'], ['60 %']], pista: 'Los que no buscan no entran.' }, '$10 \\div 100 = 10$ %.')],
    ['Pobreza y reparto',
      xpMira('hoja', 'Tercera idea: **cuánto falta** y **cómo se reparte** son preguntas distintas.', { paras: [['¿Alcanza la canasta?'], ['¿Hay agua, escuela y salud?'], ['¿Cómo se reparte?'], ['Promedio: 10. Uno tiene 91 y nueve tienen 1']] }, [
        ['Esta mira solo el ingreso.', { luz: [0], nota: { 0: 'pobreza monetaria' } }],
        ['Mira las condiciones de vida.', { luz: [1], nota: { 1: 'multidimensional' } }],
        ['Y esta mira las diferencias.', { luz: [2], nota: { 2: 'desigualdad' } }],
        ['El promedio esconde el reparto.', { luz: [3] }, '$(91 + 9) \\div 10 = 10$'],
        ['El Gini va de 0, todos igual, a 1.', { luz: [2] }],
      ], 'Lo que falta y cómo se reparte.'),
      xpHaz('hoja', 'El Gini de A es 0.28 y el de B, 0.55. Subraya el país más **desigual**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['A'], ['B'], ['No se puede saber']], pista: 'Más cerca de 1, más desigual.' }, '0.55 está más lejos del reparto igual.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'El banco central baja la tasa de interés. Subraya el efecto más probable.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Se gasta menos'], ['Los préstamos son más caros'], ['Se gasta más y los precios pueden subir']], pista: 'Piensa en los préstamos.' }, 'Créditos baratos: más gasto y más presión en los precios.')],
  ], 'Lo que alcanza, quién busca y cómo se reparte.');

  xpLec('icf-sc-economia-3', [
    ['Una red',
      xpMira('hoja', 'Empecemos por la idea: un objeto puede ser hecho por **muchos países**.', { paras: [['Metal de Chile'], ['Pantalla de Corea'], ['Programas de Irlanda'], ['Armado en México'], ['Vendido en Pasto']] }, [
        ['Un celular empieza en una mina.', { luz: [0] }],
        ['La pantalla llega de otro continente.', { luz: [1] }],
        ['Los programas viajan por internet.', { luz: [2] }],
        ['Lo arman en otro lugar.', { luz: [3] }],
        ['Y lo compra alguien en Nariño.', { luz: [4] }],
      ], 'Comercio, dinero, información y personas.'),
      xpHaz('hoja', 'Subraya lo que **más** aceleró esa red.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Transporte e internet más baratos'], ['Que nació el comercio'], ['Que hay menos países']], pista: 'El comercio es muy antiguo.' }, 'La velocidad es lo nuevo.')],
    ['Abrir la puerta',
      xpMira('hoja', 'Segunda idea: al bajar los **aranceles**, unos ganan y otros arriesgan.', { paras: [['Arancel: se cobra al entrar'], ['Vende afuera'], ['Compra más barato'], ['Compite con gigantes']] }, [
        ['Sin él, lo de afuera entra más barato.', { luz: [0] }],
        ['El exportador encuentra clientes.', { luz: [1], nota: { 1: 'gana' } }],
        ['El comprador ahorra un poco.', { luz: [2], nota: { 2: 'gana' } }],
        ['El pequeño productor puede quebrar.', { luz: [3], nota: { 3: 'arriesga' } }],
        ['La pregunta es quién lo prepara y lo apoya.', {}],
      ], 'La puerta se abre en los dos sentidos.'),
      xpHaz('hoja', 'Entran zapatos muy baratos sin arancel. Pon al margen quién gana y quién arriesga.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['arriesga', 'gana'], meta: [1, 0], paras: [['Quien compra zapatos'], ['El taller que los hace en el barrio']], pista: 'Alguna no va ahí: ¿le baja el precio o le llega competencia?' }, 'El comprador ahorra; el taller compite.')],
    ['También viajan',
      xpMira('hoja', 'Tercera idea: viajan **costumbres**, **reglas** y **problemas**.', { paras: [['Música y comidas'], ['Empresas en muchos países'], ['Crisis y virus'], ['ONU, FMI, OMC']] }, [
        ['Se mezclan: a eso le dicen glocal.', { luz: [0] }],
        ['Buscan mercado y costos bajos.', { luz: [1] }],
        ['Lo de allá golpea acá.', { luz: [2] }],
        ['Estos intentan coordinar respuestas.', { luz: [3] }],
        ['Y no todos los países pesan igual allí.', { luz: [3] }],
      ], 'Lo bueno y lo malo cruzan fronteras.'),
      xpHaz('hoja', 'Subraya el ejemplo de lo **glocal**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un carro importado'], ['Rap en lengua nasa'], ['Un arancel']], pista: 'Busca algo mundial mezclado con algo local.' }, 'Un género mundial en una lengua local.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un país baja sus reglas ambientales para atraer fábricas. Subraya el mejor argumento en **contra**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El daño lo pagan sus habitantes'], ['Llegan empleos'], ['Las fábricas son grandes']], pista: 'Piensa quién asume el costo.' }, 'Es una externalidad: otros pagan el daño.')],
  ], 'Red, puertas y cosas que cruzan.');
}
;
//#archivo js/explora-icf-sc-9-pasos.js
// Preicfes · Sociales y Ciudadanas, mundo 9 «Economía y Globalización», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  // Un puesto de plaza de mercado con su toldo, el vendedor, la fruta y una compradora con un billete.
  const puesto = v => {
    let s = '';
    if (v.puesto) {
      s += `<path d="M48 46 L212 46 L202 70 L58 70Z" fill="#d7263d"/>` + [0, 1, 2, 3].map(k => `<path d="M${68 + k * 40} 46 L${88 + k * 40} 46 L${85 + k * 40} 70 L${71 + k * 40} 70Z" fill="#fff" opacity=".85"/>`).join('') +
        `<rect x="62" y="70" width="4" height="96" fill="#6b4423"/><rect x="194" y="70" width="4" height="96" fill="#6b4423"/>`;
      if (v.vende) s += X.persona(130, 132, 0.8, '#3f9b6a');
      s += `<rect x="56" y="122" width="148" height="44" rx="3" fill="#9a6b42" stroke="#6b4423"/>` +
        [['#f39c32', 78], ['#e2c23b', 104], ['#5c9e3c', 130], ['#f39c32', 156], ['#e2c23b', 182]].map(([c, x]) => `<circle cx="${x}" cy="114" r="9" fill="${c}" stroke="#000" stroke-opacity=".2"/><circle cx="${x - 3}" cy="111" r="2.5" fill="#fff" opacity=".4"/>`).join('');
    }
    if (v.compra) s += X.persona(256, 182, 0.85, '#7a4fb5');
    if (v.plata) s += X.billete(268, 104, 56, '$ 5 000');
    return X.foto(s + (v.r ? X.rot(170, 200, v.r, 'oscuro') : ''), 210, 'ciudad');
  };
  // Dos recibos del mismo mercado, antes y ahora, y el billete que ya no alcanza igual.
  const recibos = v => X.foto((v.antes ? X.documento(14, 14, 148, 104, ['Arroz: $ 3 000', 'Huevos: $ 12 000', 'Total: $ 15 000'], { titulo: 'Antes' }) : '') +
    (v.ahora ? X.documento(180, 14, 148, 104, ['Arroz: $ 3 600', 'Huevos: $ 14 400', 'Total: $ 18 000'], { titulo: 'Ahora' }) : '') +
    (v.plata ? X.billete(126, 136, 90, '$ 15 000') : '') + (v.r ? X.rot(170, 196, v.r, 'oscuro') : ''), 208, 'mesa');
  // Un barco de contenedores en el mar.
  const barco = v => {
    let s = '';
    if (v.barco) {
      s += `<path d="M34 150 L306 150 L286 182 L54 182Z" fill="#2b3440"/><rect x="34" y="150" width="272" height="5" fill="#c0392b"/><rect x="262" y="104" width="34" height="46" fill="#e9eef0" stroke="#56646c"/>` +
        `<rect x="268" y="112" width="22" height="6" fill="#7fa6d8"/>`;
      if (v.cont) [['#c0392b', '#3f6fb5', '#e2a03b'], ['#3f9b6a', '#e2a03b', '#c0392b']].forEach((fila, r) => { for (let k = 0; k < 9; k++) s += `<rect x="${52 + k * 23}" y="${136 - r * 15}" width="21" height="13" fill="${fila[k % 3]}" stroke="#000" stroke-opacity=".3"/>`; });
    }
    return X.foto(s + (v.r ? X.rot(170, 30, v.r, 'oscuro') : ''), 206, 'agua');
  };

  xpAmplia('icf-sc-economia-1', {
    conecta: 'icf-sc-geografia-2',
    desde: [
      ['Desde cero: mercado, oferta y demanda',
        xpMira('dibujo', 'Desde el principio: un **mercado** no es solo la plaza. Es cualquier lugar donde unos venden y otros compran.', { dib: puesto, v: { puesto: 1 }, alto: 210 }, [
          ['En la lección de recursos viste que lo que se acaba se vuelve escaso.', { puesto: 1 }],
          ['Un mercado es cualquier lugar donde unos venden y otros compran.', { puesto: 1, vende: 1, compra: 1 }],
          ['Oferta: cuánto quieren vender. Demanda: cuánto quieren comprar.', { puesto: 1, vende: 1, compra: 1, r: 'oferta y demanda' }],
          ['El precio es lo que se paga, y sale del tira y afloje entre los dos lados.', { puesto: 1, vende: 1, compra: 1, plata: 1, r: 'precio' }],
          ['Como en una subasta: si muchos quieren lo poco que hay, el precio sube.', { puesto: 1, vende: 1, compra: 1, plata: 1, r: 'poco y muy pedido: sube' }],
        ], 'Mercado: unos venden y otros compran. El precio sale de cruzar oferta y demanda.'),
        xpHaz('hoja', 'Llega el Día de la Madre y todos quieren flores; los cultivos son los mismos. Subraya qué pasa con el **precio**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Sube, porque crece la demanda con la misma oferta.'], ['Baja, porque hay muchas flores.'], ['No cambia nunca.']], pista: 'Recuerda la subasta: ¿hay más gente queriendo lo mismo que había?' }, 'Más demanda con la misma oferta: sube.')],
    ],
    despues: [
      ['Más difícil: dos cambios a la vez',
        xpMira('hoja', 'Un paso más: a veces cambian **la oferta y la demanda al mismo tiempo**. Mira hacia dónde empuja cada una.', { paras: [['Una sequía daña buena parte de la cosecha de cebolla.'], ['Al mismo tiempo, llegan más turistas a comer al pueblo.'], ['Menos oferta y más demanda empujan el precio hacia arriba.'], ['Si una empujara arriba y otra abajo, no se sabría sin cifras.']] }, [
          ['La sequía baja la oferta: hay menos cebolla.', { luz: [0], nota: { 0: 'oferta baja' } }],
          ['Los turistas suben la demanda: más gente la quiere.', { luz: [1], nota: { 1: 'demanda sube' } }],
          ['Las dos empujan al mismo lado: el precio sube con seguridad.', { luz: [2], nota: { 2: 'sube' } }],
          ['Si empujaran a lados distintos, el resultado dependería de cuál pesa más.', { luz: [3], nota: { 3: 'depende' } }],
          ['Trampa: afirmar «sube» cuando dos fuerzas se oponen. Sin datos, no se sabe.', {}],
        ], 'Si oferta y demanda empujan al mismo lado, el precio se sabe; si se oponen, depende de cuál pesa más.'),
        xpHaz('hoja', 'Mejora la cosecha de mango y, a la vez, se ponen de moda los jugos de mango. Subraya lo **correcto** sobre el precio.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Seguro baja, porque hay más mango.'], ['Seguro sube, porque se venden más jugos.'], ['No se sabe sin cifras: la oferta empuja abajo y la demanda, arriba.']], pista: 'Mira hacia dónde empuja cada cambio. ¿Van al mismo lado?' }, 'Dos fuerzas opuestas: depende de cuál pese más.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **un impuesto** y la pregunta «¿qué tipo es y a quién le pesa más?».', { letras: ['A', 'B', 'C', 'D'], paras: [['Es indirecto y pesa más, en proporción, a quien gana menos.'], ['Es directo, porque se cobra sobre el ingreso de cada uno.'], ['Es progresivo, porque los ricos compran más.'], ['No lo paga nadie, porque lo cobra la tienda.']] }, [
          ['El caso: un impuesto a las bebidas azucaradas, igual por botella para ricos y pobres.', {}],
          ['Esta confunde: va en el precio de la botella, no sobre el ingreso.', { luz: [1], nota: { 1: 'confunde' } }],
          ['Esta suena lógica, pero progresivo es cobrar más proporción a quien más gana.', { luz: [2], nota: { 2: 'trampa' } }],
          ['Esta invierte quién paga: la tienda lo cobra, pero lo paga el comprador.', { luz: [3], nota: { 3: 'invertida' } }],
          ['Igual valor para todos: el que gana menos entrega una parte mayor de su ingreso.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Pregunta cuándo se paga el impuesto y qué parte del ingreso se lleva a cada uno.'),
      xpHaz('hoja', 'En un pueblo hay una sola empresa de buses, que sube el pasaje al doble. Mucha gente sigue pagando. Subraya lo que mejor lo **explica**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Hay mucha competencia entre empresas.'], ['No hay otra empresa a la cual cambiarse: es un monopolio.'], ['La demanda de buses desapareció.'], ['El gobierno bajó el pasaje.']], pista: 'Si el precio sube al doble y nadie se cambia, ¿a dónde podrían irse?' }, 'Sin competencia, el único vendedor fija el precio.')],
    cierre: 'El precio sale del cruce de oferta y demanda; importa cuántos venden y a quién le pesa cada impuesto.',
  });

  xpAmplia('icf-sc-economia-2', {
    conecta: 'icf-sc-economia-1',
    desde: [
      ['Desde cero: lo que alcanza tu plata',
        xpMira('dibujo', 'Desde el principio: lo que importa no es cuántos billetes tienes, sino **cuánto alcanzan a comprar**.', { dib: recibos, v: { antes: 1 }, alto: 208 }, [
          ['En la lección de precios viste que cada precio sale de la oferta y la demanda.', { antes: 1 }],
          ['Inflación es cuando suben los precios de casi todo, no de una sola cosa.', { antes: 1, ahora: 1 }],
          ['El mismo mercado pasó de $ 15 000 a $ 18 000: un 20 % más caro.', { antes: 1, ahora: 1, r: '20 % más caro' }],
          ['Con el mismo billete de antes, ahora llevas menos cosas.', { antes: 1, ahora: 1, plata: 1, r: 'alcanza para menos' }],
          ['Como un globo que se desinfla: el billete es el mismo, pero rinde menos.', { antes: 1, ahora: 1, plata: 1, r: 'menos poder de compra' }],
        ], 'Inflación: suben casi todos los precios y el mismo dinero alcanza para menos.'),
        xpHaz('hoja', 'Subraya qué es **inflación**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Suben los precios de casi todo durante un tiempo.'], ['Sube solo el precio del tomate una semana.'], ['Se imprimen menos billetes.']], pista: 'Inflación no es una sola cosa cara: es casi todo, y por un tiempo.' }, 'Casi todo sube: eso es inflación.')],
    ],
    despues: [
      ['Más difícil: el promedio que esconde',
        xpMira('hoja', 'Un paso más: una cifra promedio **no le pasa igual a todos**. Mira qué compra cada hogar.', { paras: [['Un hogar pobre gasta la mitad de su ingreso en comida.'], ['Un hogar rico gasta una décima parte en comida.'], ['Este año la comida subió mucho más que lo demás.'], ['La misma inflación golpea más al hogar pobre.']] }, [
          ['En el hogar pobre, la comida es casi todo el gasto.', { luz: [0], nota: { 0: 'la mitad' } }],
          ['En el hogar rico, la comida es una parte pequeña.', { luz: [1], nota: { 1: 'una décima' } }],
          ['Si la comida sube más que lo demás…', { luz: [2] }],
          ['…el golpe es mayor para quien más gasta en comida.', { luz: [3], nota: { 3: 'pesa más' } }],
          ['Trampa: pensar que una cifra promedio le pasa igual a todos.', {}],
        ], 'Una inflación promedio no golpea igual: pesa más a quien gasta más en lo que más sube.'),
        xpHaz('hoja', 'El ingreso promedio de un pueblo subió, pero casi todo el aumento fue para cinco familias. Subraya lo **correcto**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La mayoría de las familias mejoró mucho.'], ['El promedio subió, aunque la mayoría casi no cambió.'], ['Bajó la desigualdad.']], pista: 'Un promedio puede subir porque unos pocos suben mucho. ¿Qué le pasó a la mayoría?' }, 'Pocos subieron mucho: el promedio esconde al resto.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **«Sí/No, porque…»** sobre quién cuenta como desempleado. Decide primero y luego mira la razón.', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque no tiene contrato.'], ['No, porque trabaja: su trabajo es informal.'], ['Sí, porque gana poco.'], ['No, porque los vendedores no aparecen en ninguna estadística.']] }, [
          ['El caso: una vendedora ambulante trabaja todos los días. ¿Cuenta como desempleada?', {}],
          ['Esta confunde no tener contrato con no tener trabajo.', { luz: [0], nota: { 0: 'confunde' } }],
          ['Esta confunde ganar poco con estar desempleada: eso es otra cosa.', { luz: [2], nota: { 2: 'confunde' } }],
          ['Esta trae un dato falso: el trabajo informal sí se mide.', { luz: [3], nota: { 3: 'falso' } }],
          ['Trabaja, aunque sin contrato ni seguridad social: es informal, no desempleada.', { luz: [1], nota: { 1: 'sirve' } }],
        ], 'Desempleado: busca y no encuentra. Informal: trabaja sin contrato. Pobre: no le alcanza.'),
      xpHaz('hoja', 'La tasa de desempleo no cambió en dos años, pero más gente dejó de buscar trabajo por cansancio. Subraya la lectura **prudente**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['El empleo mejoró mucho.'], ['La tasa quieta puede esconder gente que ya no busca y no se cuenta.'], ['Todos encontraron trabajo.'], ['La tasa de desempleo no sirve para nada.']], pista: 'Quien deja de buscar ya no cuenta como desempleado. ¿Qué le hace eso a la tasa?' }, 'Dejar de buscar saca gente de la cuenta.')],
    cierre: 'Lo que alcanza la plata, quién busca y no encuentra, quién trabaja informal y cómo se reparte lo que hay.',
  });

  xpAmplia('icf-sc-economia-3', {
    conecta: 'icf-sc-economia-1',
    desde: [
      ['Desde cero: comprar y vender entre países',
        xpMira('dibujo', 'Desde el principio: los países también **compran y venden** entre sí, y casi todo viaja en barco.', { dib: barco, v: { barco: 1 }, alto: 206 }, [
          ['En la lección de precios viste cómo se cruzan oferta y demanda.', { barco: 1 }],
          ['Exportar es venderle a otro país; importar es comprarle.', { barco: 1, r: 'exportar e importar' }],
          ['Colombia exporta, por ejemplo, café y flores, e importa celulares y maquinaria.', { barco: 1, cont: 1, r: 'café sale, celulares entran' }],
          ['Un arancel es un impuesto a lo que entra de afuera.', { barco: 1, cont: 1, r: 'arancel' }],
          ['Globalización: países cada vez más conectados por comercio, dinero, ideas y personas.', { barco: 1, cont: 1, r: 'globalización' }],
        ], 'Exportar es vender afuera, importar es comprar afuera; el arancel cobra lo que entra.'),
        xpHaz('hoja', 'Subraya un caso de **importación** para Colombia.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un caficultor del Huila vende café a Japón.'], ['Una tienda de Medellín compra computadores hechos en Asia.'], ['Un bogotano compra arepas en Bogotá.']], pista: 'Importar es comprarle a otro país. ¿Quién trae algo de afuera?' }, 'Los computadores entran de afuera.')],
    ],
    despues: [
      ['Más difícil: la cadena se rompe lejos',
        xpMira('hoja', 'Un paso más: hoy un producto pasa por **varios países**. Un problema lejano puede sentirse aquí.', { paras: [['Un celular se diseña en un país, sus piezas se hacen en otro y se arma en un tercero.'], ['Una fábrica de chips lejana se detiene por una inundación.'], ['Faltan piezas y se arman menos celulares.'], ['Aquí suben los precios aunque nada pasó en Colombia.']] }, [
          ['Hoy un producto viaja por varios países antes de llegar a tus manos.', { luz: [0], nota: { 0: 'cadena' } }],
          ['Si un eslabón se rompe lejos…', { luz: [1], nota: { 1: 'falla' } }],
          ['…se produce menos: baja la oferta.', { luz: [2], nota: { 2: 'oferta baja' } }],
          ['Y el precio sube aquí, aunque el problema fue allá.', { luz: [3], nota: { 3: 'efecto aquí' } }],
          ['Trampa: buscar solo causas locales. En una red, lo lejano también pesa.', {}],
        ], 'En una economía conectada, un problema lejano puede subir precios aquí por la cadena.'),
        xpHaz('hoja', 'Sube mucho el precio mundial del trigo. Colombia importa casi todo su trigo. Subraya el efecto **más probable**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Sube el precio del pan.'], ['Baja el precio del pan.'], ['No pasa nada, porque el trigo es de afuera.']], pista: 'El pan se hace con trigo. Si el trigo que se compra afuera cuesta más…' }, 'Lo que se importa más caro encarece el pan.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **¿qué actor tiene más razones para oponerse?** Arma la tabla de quién gana y quién pierde.', { letras: ['A', 'B', 'C', 'D'], paras: [['Los cultivadores de maíz del país, que competirían con maíz más barato.'], ['Las familias que compran maíz, porque pagarían más.'], ['Los importadores, porque venderían más.'], ['Nadie, porque el libre comercio beneficia a todos por igual.']] }, [
          ['El caso: un tratado quita el arancel al maíz importado, más barato que el nacional.', {}],
          ['Esta invierte: las familias pagarían menos, no más.', { luz: [1], nota: { 1: 'invertida' } }],
          ['Esta también invierte: los importadores ganan, así que estarían a favor.', { luz: [2], nota: { 2: 'invertida' } }],
          ['Esta generaliza: abrir la puerta siempre deja ganadores y perdedores.', { luz: [3], nota: { 3: 'generaliza' } }],
          ['Quienes producen aquí compiten con algo más barato: ellos se oponen.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Al bajar un arancel ganan quienes compran e importan; arriesgan quienes producen aquí.'),
      xpHaz('hoja', 'Una empresa extranjera abre una planta en Colombia porque aquí los salarios son más bajos que en su país. Subraya lo **correcto**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Lo hace para pagar los salarios más altos del mundo.'], ['Crea empleo aquí, pero podría irse si halla salarios más bajos en otra parte.'], ['Solo trae ventajas, sin ningún riesgo.'], ['No tiene relación con la globalización.']], pista: 'Descarta lo que contradice el caso y lo que dice «solo» o «ningún».' }, 'Empleo hoy, con el riesgo de que se vaya.')],
    cierre: 'Países conectados: lo que entra y sale, quién gana y quién arriesga, y problemas lejanos que llegan aquí.',
  });
}
;
//#archivo js/explora-icf-sc-10.js
// Preicfes · Sociales y Ciudadanas, mundo 10 «Modelos para Decidir» (Explora, escena «hoja»).
xpLec('icf-sc-modelos-1', [
  ['Tres que se confunden',
    xpMira('hoja', 'Empecemos por la idea: **Estado**, **gobierno** y **nación** no son lo mismo.', { paras: [['Organización con leyes y territorio'], ['Personas que dirigen por un tiempo'], ['Grupo que se siente unido'], ['Una nación en dos Estados']] }, [
      ['Esta continúa con los años.', { luz: [0], nota: { 0: 'Estado' } }],
      ['Estas cambian en las elecciones.', { luz: [1], nota: { 1: 'gobierno' } }],
      ['Este comparte historia o lengua.', { luz: [2], nota: { 2: 'nación' } }],
      ['Por eso no siempre coinciden.', { luz: [3] }],
      ['Si nadie manda sobre el Estado, es soberano.', { luz: [0] }],
    ], 'Organización, personas y sentimiento de grupo.'),
    xpHaz('hoja', 'Pon al margen el concepto.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['nación', 'Estado', 'gobierno'], meta: [2, 0, 1], paras: [['El gabinete que termina en agosto'], ['El pueblo gitano, en muchos países'], ['El que sigue obligado por un tratado, gane quien gane']], pista: 'Alguna no va ahí: ¿cambia con las elecciones o se siente unida?' }, 'Cambia, se siente unido y continúa.')],
  ['Poder y legitimidad',
    xpMira('hoja', 'Segunda idea: se puede mandar por **fuerza** o con **legitimidad**.', { paras: [['Obedecen por miedo'], ['Obedecen porque lo reconocen'], ['Ley bien aprobada'], ['Ley que casi todos sienten injusta']] }, [
      ['Sin la amenaza, no obedecerían.', { luz: [0], nota: { 0: 'fuerza' } }],
      ['Aquí aceptan su derecho a mandar.', { luz: [1], nota: { 1: 'legitimidad' } }],
      ['Cumplir las reglas la hace legal.', { luz: [2], nota: { 2: 'legal' } }],
      ['Puede ser legal y no legítima.', { luz: [3], nota: { 3: 'poco legítima' } }],
      ['Una cosa es la norma; otra, que la acepten.', {}],
    ], 'Legal: según la norma. Legítimo: reconocido.'),
    xpHaz('hoja', 'Subraya el caso **legal pero poco legítimo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un robo'], ['Un impuesto aprobado que todo el pueblo rechaza'], ['Una elección limpia y aceptada']], pista: 'Debe cumplir la norma y no ser reconocido.' }, 'Se aprobó según la norma, pero casi nadie lo acepta.')],
  ['Mirar a la gente',
    xpMira('hoja', 'Tercera idea: **clase**, **etnia** y **género** son capas; la **cultura** se aprende.', { paras: [['Ingresos y trabajo'], ['Origen y cultura'], ['Lo que se espera de hombres y mujeres'], ['Juzgar con mi medida'], ['Entender sus razones']] }, [
      ['Esta es la clase social.', { luz: [0], nota: { 0: 'clase' } }],
      ['Esta es la etnia.', { luz: [1], nota: { 1: 'etnia' } }],
      ['Y este es el género.', { luz: [2], nota: { 2: 'género' } }],
      ['Frente a otra cultura, esto es etnocentrismo.', { luz: [3] }],
      ['Y esto es relativismo, con los derechos como límite.', { luz: [4] }],
    ], 'Capas que se cruzan y culturas que se entienden.'),
    xpHaz('hoja', 'Subraya la frase **etnocentrista**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['«¿Por qué celebran así?»'], ['«Celebran de otra forma»'], ['«Celebran mal: lo correcto es como aquí»']], pista: 'Busca la que juzga con la medida propia.' }, 'Pone lo propio como la medida de todo.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Una nieta de campesinos sin escuela llega a ser médica. Subraya el concepto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Movilidad social'], ['Soberanía'], ['Etnocentrismo']], pista: '¿Qué cambió en su familia?' }, 'Cambió de posición social.')],
], 'Tres que se confunden, dos modos de mandar y capas.');

xpLec('icf-sc-modelos-2', [
  ['Un modelo',
    xpMira('hoja', 'Empecemos por la idea: un **modelo** simplifica para **comparar**, como un mapa.', { paras: [['Quién decide'], ['Quién es dueño'], ['Quién paga'], ['Quién queda por fuera']] }, [
      ['Un mapa no es el territorio.', {}],
      ['Estas preguntas sirven para cualquier propuesta.', { luz: [0, 1] }],
      ['También sirven estas otras dos.', { luz: [2, 3] }],
      ['Se comparan respuestas, no nombres.', {}],
      ['La realidad casi siempre mezcla.', {}],
    ], 'Cuatro preguntas para comparar.'),
    xpHaz('hoja', 'Subraya la mejor razón para usar modelos.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Dicen qué gobierno es el bueno'], ['Ayudan a comparar ideas complicadas'], ['Describen cada detalle de un país']], pista: 'Simplifican: ¿para qué?' }, 'Simplificar permite comparar.')],
  ['Cuatro lógicas',
    xpMira('hoja', 'Segunda idea: hay varias **lógicas** sobre lo que debe hacer el Estado.', { paras: [['Estado pequeño y mercado'], ['Mercado, impuestos y derechos para todos'], ['Empresas de todos'], ['Asamblea y vida en común']] }, [
      ['Esta pone primero la libertad.', { luz: [0], nota: { 0: 'liberal' } }],
      ['Esta reparte para igualar.', { luz: [1], nota: { 1: 'bienestar' } }],
      ['Esta prefiere la propiedad común.', { luz: [2], nota: { 2: 'socialista' } }],
      ['Esta, la comunidad y sus costumbres.', { luz: [3], nota: { 3: 'comunitaria' } }],
      ['Cada una recibe críticas serias.', {}],
    ], 'Libertad, igualdad, propiedad común y comunidad.'),
    xpHaz('hoja', 'Pon al margen la lógica de cada medida.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['bienestar', 'comunitaria', 'liberal'], meta: [2, 0, 1], paras: [['Vender los buses públicos a quien compita mejor'], ['Pensión para todos, pagada con impuestos'], ['El cabildo reparte las tierras según la costumbre']], pista: 'Alguna no va ahí: ¿mercado, reparto o asamblea?' }, 'Competir, repartir y decidir en comunidad.')],
  ['Evaluar una decisión',
    xpMira('hoja', 'Tercera idea: ante una decisión, mira **valor**, **beneficio** y **costo**.', { paras: [['«Cobrar por entrar al parque»'], ['Valor: quien lo usa lo paga'], ['Gana: el mantenimiento'], ['Pierde: quien no puede pagar']] }, [
      ['Esta es la decisión.', { luz: [0] }],
      ['Detrás hay un valor.', { luz: [1] }],
      ['Alguien se beneficia de ella.', { luz: [2] }],
      ['Y alguien queda por fuera.', { luz: [3] }],
      ['Se puede ajustar: gratis para algunos.', {}],
    ], 'Qué valor, quién gana y quién queda por fuera.'),
    xpHaz('hoja', 'Se propone educación privada con becas solo para los mejores. Subraya la mejor **crítica** desde la igualdad.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Los colegios competirían'], ['Quedan por fuera quienes no pagan ni ganan beca'], ['Habría muchos uniformes']], pista: 'Desde la igualdad, ¿quién preocupa?' }, 'Deja por fuera a una parte.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', 'Un país tiene empresas privadas y salud pública gratuita. Subraya lo correcto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Es un modelo puro'], ['No tiene modelo'], ['Mezcla lógicas']], pista: 'Casi ningún país usa uno solo.' }, 'Mercado y derechos: una mezcla.')],
], 'Simplificar, cuatro lógicas y evaluar.');
;
//#archivo js/explora-icf-sc-10-pasos.js
// Preicfes · Sociales y Ciudadanas, mundo 10 «Modelos para Decidir», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  // Tres maneras de mandar en una plaza: la fuerza, el dinero y unas reglas aceptadas.
  const poder = v => X.foto((v.cap ? X.edificio(272, 166, 106, 'capitolio') : '') +
    (v.doc ? X.documento(12, 8, 112, 72, ['Horario de', 'la cuadra'], { titulo: 'Reglas', sello: 'JAC' }) : '') +
    (v.plata ? X.billete(138, 22, 74, '$ 20 000') : '') +
    (v.gente ? X.persona(150, 182, 0.8, '#3f6fb5') + X.persona(184, 184, 0.82, '#b5493f') : '') +
    (v.guardia ? X.persona(70, 182, 0.9, '#2b3440', { cartel: '¡Obedece!' }) : '') + (v.r ? X.rot(220, 200, v.r, 'oscuro') : ''), 210, 'ciudad');
  // La maqueta de una casa sobre la mesa, junto a su plano.
  const maqueta = v => X.foto((v.casa ? X.edificio(104, 166, 112, 'casa') : '') +
    (v.plano ? X.documento(200, 12, 128, 100, ['Sala', 'Cocina', 'Dos cuartos'], { titulo: 'Plano' }) : '') +
    (v.r ? X.rot(170, 186, v.r, 'oscuro') : ''), 200, 'mesa');

  xpAmplia('icf-sc-modelos-1', {
    conecta: 'icf-sc-constitucion-1',
    desde: [
      ['Desde cero: qué es el poder',
        xpMira('dibujo', 'Desde el principio: el **poder** es lograr que otros hagan algo. Lo importante es **de dónde** sale.', { dib: poder, v: { cap: 1 }, alto: 210 }, [
          ['En la primera lección viste que un Estado tiene autoridades que gobiernan.', { cap: 1 }],
          ['Poder es lograr que otros hagan algo que no habrían hecho solos.', { cap: 1, gente: 1 }],
          ['Puede venir de la fuerza: se obedece por miedo al castigo.', { cap: 1, gente: 1, guardia: 1, r: 'fuerza' }],
          ['Puede venir del dinero: se paga para que algo se haga.', { cap: 1, gente: 1, guardia: 1, plata: 1, r: 'dinero' }],
          ['O de la autoridad: la gente reconoce que quien manda tiene derecho a hacerlo.', { cap: 1, gente: 1, guardia: 1, plata: 1, doc: 1, r: 'autoridad' }],
        ], 'Poder: lograr que otros actúen. Puede venir de la fuerza, del dinero o de una autoridad reconocida.'),
        xpHaz('hoja', 'Subraya el caso de poder por **autoridad reconocida**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un ladrón obliga a entregar un celular.'], ['Los vecinos cumplen el horario de la junta porque la eligieron y aceptan sus reglas.'], ['Una empresa paga para que hablen bien de ella.']], pista: 'Busca a quien obedecen sin miedo y sin pago, porque aceptan su derecho a mandar.' }, 'Obedecen porque reconocen a la junta.')],
    ],
    despues: [
      ['Más difícil: legal, legítimo, los dos o ninguno',
        xpMira('hoja', 'Un paso más: **legal** y **legítimo** pueden ir juntos, separados o faltar los dos.', { paras: [['Un presidente elegido gobierna según la ley y la mayoría lo acepta.'], ['Una ley se aprobó con todas las reglas, pero casi nadie la acepta.'], ['Una protesta pacífica sin permiso, contra una injusticia que muchos reconocen.'], ['Un grupo armado cobra «impuestos» a la fuerza.']] }, [
          ['Legal y legítimo: cumple la norma y la gente lo acepta.', { luz: [0], nota: { 0: 'los dos' } }],
          ['Legal, pero poco legítimo: siguió las reglas y no convence.', { luz: [1], nota: { 1: 'solo legal' } }],
          ['Puede ser legítimo sin ser legal: muchos lo ven justo aunque rompa una norma.', { luz: [2], nota: { 2: 'solo legítimo' } }],
          ['Ni legal ni legítimo: solo fuerza.', { luz: [3], nota: { 3: 'ninguno' } }],
          ['Trampa: creer que legal y legítimo siempre van juntos.', {}],
        ], 'Legal: según la norma. Legítimo: aceptado como justo. Pueden ir juntos, separados o faltar los dos.'),
        xpHaz('hoja', 'La esclavitud fue legal en Colombia hasta 1851. Subraya lo **correcto**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Ser legal no la volvía justa: muchos la rechazaban ya entonces.'], ['Era legítima, porque era legal.'], ['Era ilegal desde 1810.']], pista: 'Una opción confunde legal con legítimo y otra cambia la fecha.' }, 'Legal no es lo mismo que justo o aceptado.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: un caso y **«¿qué concepto lo describe mejor?»**. Las opciones son palabras que se confunden.', { letras: ['A', 'B', 'C', 'D'], paras: [['Poder por la fuerza, sin legitimidad.'], ['Gobierno legítimo, porque la gente obedece.'], ['Estado de derecho, porque hay reglas.'], ['Nación, porque viven juntos.']] }, [
          ['El caso: un grupo armado controla un pueblo, pone reglas y cobra; la gente obedece por miedo.', {}],
          ['Obedecer por miedo no es aceptar: esta confunde obediencia con legitimidad.', { luz: [1], nota: { 1: 'confunde' } }],
          ['Tener reglas no es Estado de derecho: el que manda no está bajo ninguna ley.', { luz: [2], nota: { 2: 'confunde' } }],
          ['Vivir juntos no es lo que se pregunta: se pregunta cómo se manda.', { luz: [3], nota: { 3: 'fuera' } }],
          ['Miedo y castigo, sin aceptación: poder por la fuerza.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Busca de dónde sale la obediencia: miedo, pago o reconocimiento.'),
      xpHaz('hoja', 'Cambia el presidente, pero los ministerios, las leyes y los jueces siguen. Subraya lo que **muestra**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Que la nación desaparece en cada elección.'], ['Que el gobierno es lo mismo que el Estado.'], ['Que el gobierno cambia y el Estado permanece.'], ['Que los jueces dependen del presidente.']], pista: 'Fíjate en qué se fue y qué se quedó.' }, 'Se fue el gobierno; el Estado siguió.')],
    cierre: 'De dónde sale el poder, si es legal o legítimo, qué es Estado, gobierno y nación, y las capas de cada persona.',
  });

  xpAmplia('icf-sc-modelos-2', {
    conecta: 'icf-sc-modelos-1',
    desde: [
      ['Desde cero: qué es un modelo',
        xpMira('dibujo', 'Desde el principio: un **modelo** es una versión simple de algo complicado, hecha para pensarlo mejor.', { dib: maqueta, v: { casa: 1 }, alto: 200 }, [
          ['En la lección anterior viste el poder, la legitimidad, el Estado y el gobierno.', { casa: 1 }],
          ['Un modelo es una versión simple de algo complicado, para pensarlo mejor.', { casa: 1, r: 'versión simple' }],
          ['Como la maqueta de una casa: no tiene tubos, pero deja ver si caben los cuartos.', { casa: 1, plano: 1, r: 'maqueta' }],
          ['En la sociedad, un modelo responde: quién decide, quién produce y quién reparte.', { casa: 1, plano: 1, r: 'decide · produce · reparte' }],
          ['Lo que deja por fuera también importa: ninguna maqueta es la casa.', { casa: 1, plano: 1, r: 'simplifica a propósito' }],
        ], 'Modelo: versión simple de algo complejo; sirve para pensar y comparar, pero deja cosas por fuera.'),
        xpHaz('hoja', 'La maqueta de un colegio no muestra los enchufes. Subraya lo **correcto**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Igual sirve para ver si caben los salones.'], ['No sirve para nada, porque le faltan detalles.'], ['Es igual al colegio real.']], pista: 'Un modelo simplifica a propósito. ¿Para qué sigue sirviendo?' }, 'Simplifica, pero responde su pregunta.')],
    ],
    despues: [
      ['Más difícil: la misma palabra, dos propuestas',
        xpMira('hoja', 'Un paso más: dos modelos pueden defender la **misma palabra**, como «igualdad», y pedir cosas distintas.', { paras: [['Igualdad de oportunidades: todos parten de la misma línea.'], ['Igualdad de resultados: todos llegan a algo parecido.'], ['Becas para quien no puede pagar buscan lo primero.'], ['Un ingreso mínimo para todos se acerca a lo segundo.']] }, [
          ['Dos personas pueden decir «igualdad» y pedir cosas distintas.', {}],
          ['Oportunidades: que nadie arranque con desventaja.', { luz: [0], nota: { 0: 'oportunidades' } }],
          ['Resultados: que nadie quede muy por debajo al final.', { luz: [1], nota: { 1: 'resultados' } }],
          ['Las becas apuntan al arranque; un ingreso mínimo, a la llegada.', { luz: [2, 3], nota: { 2: 'arranque', 3: 'llegada' } }],
          ['Trampa: creer que la misma palabra significa lo mismo en dos discursos.', {}],
        ], 'Una misma palabra, como igualdad, puede pedir cosas distintas: mira qué propone cada uno.'),
        xpHaz('hoja', 'Subraya la medida que busca **igualdad de oportunidades**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Dar a todas las familias el mismo ingreso, sin importar el trabajo.'], ['Clases de refuerzo gratis para quienes empiezan con atraso.'], ['Subir el impuesto a los cigarrillos.']], pista: 'Oportunidades se fija en el arranque: ¿quién empieza con desventaja?' }, 'El refuerzo empareja el punto de partida.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: una decisión pública y **«¿cuál es la crítica más fuerte desde tal lógica?»**.', { letras: ['A', 'B', 'C', 'D'], paras: [['Las familias pobres podrían quedar sin agua si no pueden pagar.'], ['Las empresas privadas siempre roban.'], ['Cobrar por consumo es ilegal.'], ['El agua del municipio sabe mal.']] }, [
          ['La decisión: una empresa privada manejará el agua y cobrará según el consumo. Lógica: igualdad.', {}],
          ['Esta generaliza con «siempre»: no es una crítica, es un prejuicio.', { luz: [1], nota: { 1: 'generaliza' } }],
          ['Esta trae un dato falso: cobrar por consumo es común.', { luz: [2], nota: { 2: 'falso' } }],
          ['Esta no tiene que ver con la lógica pedida.', { luz: [3], nota: { 3: 'fuera' } }],
          ['La igualdad pregunta quién queda por fuera: los que no pueden pagar.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Lee qué lógica pide la pregunta y busca a quién deja por fuera la decisión.'),
      xpHaz('hoja', 'Una comunidad decide en asamblea cómo usar el bosque que comparte. Subraya la **lógica** que se ve.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Mercado: cada quien compra su parte.'], ['Decisión comunitaria sobre un bien común.'], ['Monarquía: decide un rey.'], ['Ninguna, porque no hay Estado.']], pista: 'Mira quién decide y de quién es el bosque.' }, 'Decide la comunidad sobre lo que es de todos.')],
    cierre: 'Simplificar para comparar, distinguir lógicas aunque usen la misma palabra y evaluar a quién deja por fuera.',
  });
}
;
//#archivo js/explora-icf-cn.js
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
;
//#archivo js/explora-icf-cn-pasos.js
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
;
//#archivo js/explora-icf-cn-2.js
// Preicfes · Ciencias Naturales, mundo 2 «Célula y Organismos» (Explora, escenas «hoja» y «dibujo»). Ejemplos propios.
{
  // Célula con puntos de soluto adentro y afuera; r es su tamaño y f la flecha del agua (1 entra, −1 sale).
  const AD = [[150, 90], [175, 110], [195, 85], [165, 125], [185, 130], [150, 110]], AF = [[40, 50], [60, 140], [300, 60], [280, 145], [50, 95], [310, 105], [90, 40], [255, 35]];
  const celula = (v, K) => K.r(20, 20, 300, 160, 'fn', 8) + K.c(170, 105, v.r, 'fa') + AD.slice(0, Math.round(v.d)).map(([x, y]) => K.c(x, y, 5, 'fF')).join('') + AF.slice(0, Math.round(v.a)).map(([x, y]) => K.c(x, y, 5, 'fF')).join('') + (v.f > 0.5 ? K.ar(62, 105, 105, 105, 'lg gr') + K.ar(278, 105, 235, 105, 'lg gr') : v.f < -0.5 ? K.ar(105, 105, 62, 105, 'lg gr') + K.ar(235, 105, 278, 105, 'lg gr') : '') + K.t(170, 198, v.t || '', 's ta');
  // Curva: valores en cuatro horas, con un nivel normal punteado.
  const curva = (v, K) => { const X = i => 60 + i * 78, Y = q => 170 - q * 0.55; return K.l(50, 170, 320, 170, 'lm') + K.l(50, 20, 50, 170, 'lm') + K.l(50, Y(90), 320, Y(90), 'lg d') + K.t(318, Y(90) + 14, 'normal', 's tg', 'end') + K.pl(v.q.slice(0, v.n).map((q, i) => [X(i), Y(q)]), 'la gr') + v.q.slice(0, v.n).map((q, i) => K.c(X(i), Y(q), 5, 'fA') + K.t(X(i), Y(q) - 10, q, 's')).join('') + ['0 h', '1 h', '2 h', '3 h'].map((t, i) => K.t(X(i), 188, t, 's tm')).join(''); };

  xpLec('icf-cn-celula-1', [
    ['El agua busca lo salado',
      xpMira('dibujo', 'Empecemos por la idea: por la membrana pasa el **agua**, casi no la sal.', { dib: celula, v: { r: 52, d: 5, a: 2, f: 0, t: '' }, alto: 206 }, [
        ['Los puntos son sal disuelta: hay más adentro.', { t: 'más sal adentro' }],
        ['El agua va hacia donde hay más sal: entra.', { f: 1, t: 'el agua entra' }],
        ['La célula se hincha.', { r: 64, f: 0, t: '' }],
        ['Ahora hay más sal afuera.', { r: 52, a: 8, d: 3, t: 'más sal afuera' }],
        ['El agua sale y la célula se encoge: eso es la ósmosis.', { f: -1, r: 40, t: 'el agua sale' }],
      ], 'Ósmosis: el agua va hacia donde hay más sustancia disuelta.'),
      xpHaz('hoja', '¿Dónde **entra** agua a la célula? Subraya los dos casos.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0, 2], paras: [['Fríjol seco en agua pura'], ['Pepino en sal'], ['Ciruela pasa en agua'], ['Carne salada']], pista: 'En alguna hay más sal afuera que adentro.' }, 'En agua pura hay más soluto dentro: entra.')],
    ['A favor o en contra',
      xpMira('hoja', 'Segunda idea: ir **a favor** no gasta energía; ir **en contra**, sí.', { paras: [['Oxígeno: de donde hay mucho a donde hay poco.'], ['Agua: hacia donde hay más sal.'], ['Una raíz mete un mineral que ya tiene en abundancia.'], ['Una célula saca sodio hacia donde hay más.']] }, [
        ['De mucho a poco: solo. Es difusión.', { luz: [0], nota: { 0: 'sin gasto' } }],
        ['La ósmosis tampoco gasta.', { luz: [1], nota: { 1: 'sin gasto' } }],
        ['De poco a mucho, en contra: cuesta.', { luz: [2], nota: { 2: 'con gasto' } }],
        ['Es como subir agua con una bomba: transporte activo.', { luz: [3], nota: { 3: 'con gasto' } }],
        ['Si la célula se queda sin energía, esto se detiene.', { luz: [2, 3] }],
      ], 'A favor es gratis; en contra hace falta energía.'),
      xpHaz('hoja', 'Subraya el caso que **gasta** energía.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Perfume que se riega por el cuarto'], ['Célula que mete yodo donde ya hay más'], ['Agua que entra a una pasa']], pista: 'Esa va de más a menos, o es ósmosis.' }, 'Meter donde ya hay más va en contra.')],
    ['Con pared o sin pared',
      xpMira('dibujo', 'Tercera idea: la **pared** de las plantas evita que la célula reviente.', { dib: (v, K) => K.f(v.p, K.r(100, 35, 140, 140, 'fc', 10)) + celula(v, K), v: { r: 48, d: 5, a: 1, f: 1, t: '', p: 0 }, alto: 206 }, [
        ['Un glóbulo rojo en agua destilada.', { t: 'glóbulo rojo' }],
        ['Entra agua y se hincha…', { r: 68, t: 'se hincha' }],
        ['…hasta que puede romperse: no tiene pared.', { r: 74, t: 'puede romperse' }],
        ['Una célula vegetal sí la tiene.', { r: 50, p: 1, t: 'célula vegetal' }],
        ['Se llena hasta donde la pared deja y queda rígida.', { r: 66, t: 'rígida' }],
      ], 'Con pared, la célula se pone rígida; sin ella, puede reventar.'),
      xpHaz('hoja', 'Pon al margen lo que le pasa a cada una en agua pura.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['puede romperse', 'queda rígida'], meta: [1, 0], paras: [['Célula de tomate'], ['Glóbulo rojo']], pista: '¿Cuál de las dos tiene pared?' }, 'El tomate tiene pared; el glóbulo, no.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Riegan una planta con agua muy salada. Subraya lo que ocurre.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Las raíces se llenan de agua.'], ['La pared desaparece.'], ['Sale agua de las raíces y se marchita.']], pista: '¿Dónde quedó más sal: en el suelo o en la raíz?' }, 'Hay más sal afuera: el agua sale.')],
  ], 'El agua va a lo salado, en contra cuesta energía y la pared protege.');

  xpLec('icf-cn-celula-2', [
    ['Volver al equilibrio',
      xpMira('dibujo', 'Empecemos por la idea: **homeostasis** es mantener el interior estable.', { dib: curva, v: { q: [90, 150, 110, 92], n: 1 }, alto: 200 }, [
        ['Azúcar en la sangre antes de comer: 90.', {}],
        ['Una hora después de comer sube.', { n: 2 }],
        ['El cuerpo responde y empieza a bajar.', { n: 3 }],
        ['A las tres horas volvió cerca del comienzo.', { n: 4 }],
        ['No importa que suba: importa que vuelva.', {}],
      ], 'Homeostasis: ante un cambio, el cuerpo vuelve a su valor.'),
      xpHaz('hoja', 'Temperatura de tres personas tras correr, al inicio y una hora después. Subraya a quien **no** recuperó el equilibrio.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['36.5 → 37.8 → 36.6'], ['36.6 → 38.9 → 38.7'], ['36.4 → 37.5 → 36.5']], pista: 'Esa volvió a su valor del comienzo.' }, 'B sigue en 38.7: no volvió.')],
    ['El cuerpo se avisa',
      xpMira('hoja', 'Segunda idea: hay un **aviso**, una **respuesta** y un **efecto**.', { paras: [['Hace frío.'], ['La piel avisa al cerebro.'], ['Los músculos tiemblan.'], ['El cuerpo se calienta.']] }, [
        ['Primero ocurre un cambio: hace frío.', { luz: [0], nota: { 0: 'cambio' } }],
        ['Algo lo detecta y avisa.', { luz: [1], nota: { 1: 'aviso' } }],
        ['El cuerpo responde con un movimiento.', { luz: [2], nota: { 2: 'respuesta' } }],
        ['Y el efecto corrige el cambio.', { luz: [3], nota: { 3: 'efecto' } }],
        ['Con el azúcar es igual: páncreas, insulina y células.', {}],
      ], 'Cambio, aviso, respuesta y efecto que lo corrige.'),
      xpHaz('hoja', 'Hace mucho calor. Pon al margen cada parte.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['respuesta', 'efecto', 'aviso'], meta: [2, 0, 1], paras: [['La piel detecta el calor.'], ['Las glándulas sudan.'], ['El cuerpo se enfría.']], pista: 'Alguno no va ahí: ¿detecta, actúa o corrige?' }, 'Detectar, sudar y enfriarse.')],
    ['Nadie trabaja solo',
      xpMira('hoja', 'Tercera idea: los sistemas **dependen** unos de otros.', { paras: [['Digestivo: rompe el alimento.'], ['Circulatorio: lo reparte.'], ['Respiratorio: trae oxígeno y saca CO₂.'], ['Excretor: filtra desechos.']] }, [
        ['El digestivo deja la comida en moléculas pequeñas.', { luz: [0], nota: { 0: 'rompe' } }],
        ['Sin sangre que las lleve, no llegan a las células.', { luz: [1], nota: { 1: 'reparte' } }],
        ['Sin oxígeno, la célula no aprovecha bien la glucosa.', { luz: [2], nota: { 2: 'oxígeno' } }],
        ['Y los desechos salen por los riñones.', { luz: [3], nota: { 3: 'limpia' } }],
        ['Si uno falla, los demás lo sienten.', { luz: [0, 1, 2, 3] }],
      ], 'Romper, repartir, respirar y limpiar: un solo equipo.'),
      xpHaz('hoja', 'Subraya el sistema que **reparte** el oxígeno por el cuerpo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Respiratorio'], ['Circulatorio'], ['Excretor']], pista: 'Ese lo toma del aire o limpia: ¿quién lo lleva?' }, 'Uno lo toma del aire y el otro lo reparte.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Al subir una montaña alta hay menos oxígeno y el corazón se acelera. Subraya la explicación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Así llega más oxígeno por minuto a las células.'], ['El corazón fabrica oxígeno.'], ['Con el frío se contrae.']], pista: '¿Qué gana el cuerpo si la sangre pasa más veces?' }, 'Más vueltas de sangre compensan el poco oxígeno.')],
  ], 'Vuelve al equilibrio, se avisa y trabaja en equipo.');

  xpLec('icf-cn-celula-3', [
    ['Copiar la receta',
      xpMira('hoja', 'Empecemos por la idea: el ADN no sale del núcleo; sale una **copia**.', { letras: ['ADN', 'ARN'], paras: [['T', 'A', 'G', 'C'], ['A', 'U', 'C', 'G']] }, [
        ['Arriba, cuatro letras de ADN.', { luz: [0, 1, 2, 3] }],
        ['La T se copia como A.', { luz: [0, 4] }],
        ['La A se copia como U: el ARN no usa T.', { luz: [1, 5] }],
        ['La G se copia como C y la C como G.', { luz: [2, 3, 6, 7] }],
        ['La copia es el ARN mensajero: transcripción.', { luz: [4, 5, 6, 7], nota: { 1: 'copia' } }],
      ], 'Transcripción: A con U, T con A, G con C y C con G.'),
      xpHaz('fichas', 'ADN: A C T. Pon su ARN mensajero.', { slots: [0, 1, 2].map(i => ({ x: 90 + i * 80, y: 46, w: 56, et: ['A', 'C', 'T'][i] })), fichas: ['U', 'G', 'A', 'T', 'C'], meta: ['U', 'G', 'A'], alto: 96, pista: 'El ARN no tiene T.' }, 'A con U, C con G y T con A.')],
    ['Leer de tres en tres',
      xpMira('hoja', 'Segunda idea: el ribosoma lee **tripletas**, los codones.', { paras: [['AUG', 'GAA', 'GUA'], ['met', 'glu', 'val']] }, [
        ['Nueve letras de ARN son tres codones.', { luz: [0, 1, 2] }, '$9 \\div 3 = 3$'],
        ['Cada codón indica un aminoácido.', { luz: [0, 3] }],
        ['GAA indica ácido glutámico.', { luz: [1, 4] }],
        ['Y el codón GUA indica valina.', { luz: [2, 5] }],
        ['Unidos en fila forman la proteína: traducción.', { luz: [3, 4, 5], nota: { 1: 'proteína' } }],
      ], 'Tres letras, un codón; un codón, un aminoácido.'),
      xpHaz('fichas', 'Un ARN de 18 letras. Pon cuántos codones tiene y cuántos aminoácidos indica (sin contar señales de parada).', { slots: [{ x: 110, y: 46, w: 90, et: 'codones' }, { x: 230, y: 46, w: 90, et: 'aminoácidos' }], fichas: ['6', '6', '18', '9', '54'], meta: ['6', '6'], alto: 96, pista: 'Divide entre 3; hay un aminoácido por codón.' }, '$18 \\div 3 = 6$ y uno por cada codón.')],
    ['Cuando cambia una letra',
      xpMira('hoja', 'Tercera idea: una **mutación** puede no hacer nada o cambiarlo todo.', { paras: [['GAA → GAG', 'mismo aminoácido'], ['GAA → GUA', 'otro aminoácido'], ['UN SOL MÁS', 'UNS OLM ÁS']] }, [
        ['GAA y GAG indican lo mismo: la proteína no cambia.', { luz: [0, 1], nota: { 0: 'sin efecto' } }],
        ['GUA indica otro: puede cambiar.', { luz: [2, 3], nota: { 1: 'cambia uno' } }],
        ['Si se quita o agrega una letra, todo se corre.', { luz: [4], nota: { 2: 'se corre' } }],
        ['Como leer con los espacios mal puestos.', { luz: [5] }],
        ['Por eso quitar una suele ser peor que cambiar una.', {}],
      ], 'Cambiar una letra afecta un codón; quitar una, todos los que siguen.'),
      xpHaz('hoja', 'Subraya el cambio que **más** puede dañar la proteína.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Cambiar GAA por GAG'], ['Quitar la segunda letra del gen'], ['Cambiar una letra del último codón']], pista: 'Ese afecta un solo codón.' }, 'Quitarla corre todos los grupos desde el comienzo.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'ADN: C T T. Pon su ARN y el aminoácido (GAA: glutámico, GUA: valina).', { slots: [{ x: 110, y: 46, w: 90, et: 'ARN' }, { x: 230, y: 46, w: 110, et: 'aminoácido' }], fichas: ['GAA', 'glutámico', 'GTT', 'valina', 'GUA'], meta: ['GAA', 'glutámico'], alto: 96, pista: 'C con G y T con A.' }, 'CTT se copia GAA, que indica ácido glutámico.')],
  ], 'Copiar, leer de a tres y cuidar las letras.');
}
;
//#archivo js/explora-icf-cn-2-pasos.js
// Preicfes · Ciencias Naturales, mundo 2 «Célula y Organismos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB, n = x => Math.round(x * 100) / 100;

  // Microscopio y lo que se ve en el ocular: k = 0 nada, 1 célula animal, 2 célula vegetal; r1, r2: rótulos.
  const ocular = (v, K) => {
    const cx = 236, cy = 92;
    let s = X.microscopio(78, 168, 1.05) + `<path d="M96 52 L${cx - 60} ${cy - 30} M96 64 L${cx - 60} ${cy + 30}" stroke="#ffffff" stroke-width="1" stroke-dasharray="3 4" opacity=".7"/>` +
      `<circle cx="${cx}" cy="${cy}" r="70" fill="#000" opacity=".25" filter="url(#xlb-sombra)"/><circle cx="${cx}" cy="${cy}" r="66" fill="#f6f3e8" stroke="#2f3539" stroke-width="6"/>`;
    if (v.k === 1) s += X.celula(cx - 4, cy, 44, 'animal');
    if (v.k === 2) s += X.celula(cx, cy, 44, 'vegetal');
    if (v.r1) s += X.rot(cx, 182, v.r1, 'oscuro');
    if (v.r2) s += X.rot(cx + 46, 22, v.r2, 'oscuro');
    if (v.r3) s += X.rot(78, 22, v.r3);
    return X.foto(s, 200, 'lab');
  };
  // Dos vasos con sal disuelta: a y b granos, nivel na y nb.
  const granos = (x, y, h, nivel, cant) => {
    const ly = y - 3 - (h - 10) * nivel;
    return Array.from({ length: cant }, (_, i) => `<circle cx="${n(x - 24 + ((i * 29) % 48))}" cy="${n(ly + 8 + ((i * 17) % Math.max(6, y - ly - 14)))}" r="2.6" fill="#ffffff" stroke="#8aa9b8" stroke-width=".7"/>`).join('');
  };
  const concentra = (v, K) => X.foto(X.vaso(96, 166, 74, 96, v.na ?? 0.7, 'agua') + granos(96, 166, 96, v.na ?? 0.7, v.a || 0) +
    X.vaso(244, 166, 74, 96, v.nb ?? 0.7, 'agua') + granos(244, 166, 96, v.nb ?? 0.7, v.b || 0) +
    (v.ra ? X.rot(96, 188, v.ra) : '') + (v.rb ? X.rot(244, 188, v.rb) : '') + (v.t ? X.rot(170, 24, v.t, 'oscuro') : ''), 200, 'lab');

  xpAmplia('icf-cn-celula-1', {
    conecta: 'icf-cn-indaga-2',
    desde: [
      ['Desde cero: qué es una célula',
        xpMira('dibujo', 'Todo ser vivo está hecho de **células**. Son tan pequeñas que para verlas hace falta un microscopio.', { dib: ocular, v: { k: 0 }, alto: 200 }, [
          ['En la lección de datos viste que se concluye solo con lo que se observa y se mide.', { r3: 'microscopio' }],
          ['Al microscopio, una muestra de mejilla deja ver formas redondeadas: células.', { k: 1 }],
          ['La célula es la pieza más pequeña que está viva, como un ladrillo en una casa.', { k: 1 }],
          ['La envuelve la membrana, una bolsa fina que escoge qué entra y qué sale.', { k: 1, r1: 'membrana' }],
          ['Adentro, el núcleo guarda las instrucciones de la célula.', { k: 1, r1: 'membrana', r2: 'núcleo' }],
          ['Las de las plantas tienen además una pared dura por fuera, como una caja.', { k: 2, r1: 'pared + membrana', r2: 'núcleo' }],
        ], 'La célula es la unidad viva: membrana que escoge, núcleo que manda y, en plantas, pared.'),
        xpHaz('hoja', 'Cada parte tiene su oficio. Subraya la parte que **escoge** qué entra y qué sale de la célula.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El núcleo'], ['La membrana'], ['La pared de las plantas']], pista: 'Esa parte guarda instrucciones o solo da firmeza. Busca la bolsa que deja pasar unas cosas y otras no.' }, 'La membrana es la puerta: deja pasar unas sustancias y otras no.')],
      ['Desde cero: qué es estar concentrado',
        xpMira('dibujo', 'Para entender cómo se mueve el agua hacen falta tres palabras: **soluto**, **solvente** y **concentración**.', { dib: concentra, v: { a: 0, b: 0, na: 0.7, nb: 0.7 }, alto: 200 }, [
          ['Se echa sal en agua: la sal es el soluto y el agua, el solvente.', { a: 8, ra: 'sal en agua' }],
          ['Concentración es cuánta sal hay en cada porción de agua.', { a: 8, ra: '8 granos' }],
          ['Al lado, la misma sal en la mitad del agua.', { a: 8, b: 8, nb: 0.35, ra: '8 granos', rb: '8 granos' }],
          ['Esa está más concentrada, como un jugo cargado.', { a: 8, b: 8, nb: 0.35, ra: 'menos concentrada', rb: 'más concentrada' }],
          ['La de la izquierda es como un jugo aguado.', { a: 8, b: 8, nb: 0.35, ra: 'menos concentrada', rb: 'más concentrada' }],
          ['La membrana deja pasar el agua, casi no la sal: eso decide hacia dónde va.', { a: 8, b: 8, nb: 0.35, t: 'pasa el agua, no la sal' }],
        ], 'Más soluto en la misma agua, o el mismo soluto en menos agua: más concentrado.'),
        xpHaz('hoja', 'Subraya el vaso **más concentrado**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['200 mL de agua con 2 cucharadas de sal'], ['100 mL de agua con 2 cucharadas de sal'], ['200 mL de agua con 1 cucharada de sal']], pista: 'Compara cuánta sal le toca a cada porción de agua, no solo cuánta sal hay.' }, 'La misma sal en menos agua: le toca más a cada porción.')],
    ],
    despues: [
      ['Más difícil: el agua no se detiene',
        xpMira('hoja', 'Un paso más: el agua cruza la membrana **en los dos sentidos**. Lo que cuenta es hacia dónde pasa más.', { paras: [['Una persona deshidratada llega al hospital.'], ['Si le ponen agua pura en la vena…'], ['…entra agua a los glóbulos rojos y pueden reventar.'], ['Por eso el suero lleva la misma concentración de sal que la sangre.']] }, [
          ['El agua entra y sale todo el tiempo de cada célula.', {}],
          ['Agua pura en la sangre: afuera queda menos concentrado.', { luz: [1], nota: { 1: 'menos sal afuera' } }],
          ['Entra mucha más agua de la que sale: el glóbulo se hincha.', { luz: [2], nota: { 2: 'peligro' } }],
          ['Con igual concentración, entra tanta como sale.', { luz: [3], nota: { 3: 'equilibrio' } }],
          ['La célula ni se hincha ni se arruga: queda como estaba.', { luz: [3] }],
        ], 'Con igual concentración el agua sigue pasando, pero entra tanta como sale.'),
        xpHaz('hoja', 'Unas fresas picadas se dejan con mucho azúcar encima y sueltan jugo. Subraya la explicación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El azúcar entra a las fresas y las infla.'], ['Afuera quedó más concentrado: sale agua de sus células.'], ['El azúcar rompe la pared y la derrite.']], pista: '¿Dónde quedó más soluto: dentro de la fresa o en el azúcar de afuera?' }, 'El agua va hacia lo más concentrado: sale de la fresa.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un estudiante afirma: «una tajada de zanahoria en agua muy salada gana masa». El examen pregunta si tiene razón y **por qué**.', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque la sal entra y la hace pesar más.'], ['Sí, porque el agua siempre entra a las células.'], ['No, porque pierde agua: afuera está más concentrado.'], ['No, porque la membrana no deja pasar el agua.']] }, [
        ['Decide tú primero: más sal afuera, el agua sale. Pierde masa.', {}],
        ['Esta suena científica, pero la sal casi no cruza.', { luz: [0], nota: { 0: 'razón falsa' } }],
        ['Esta dice «siempre»: depende de dónde hay más soluto.', { luz: [1], nota: { 1: 'absoluto' } }],
        ['Esta dice «No», pero su razón es falsa: el agua sí pasa.', { luz: [3], nota: { 3: 'buen no, mal porqué' } }],
        ['Esta tiene la conclusión y la razón correctas.', { luz: [2], nota: { 2: 'correcta' } }],
      ], 'Decide el Sí o el No con tu cuenta y luego revisa que el «porque» sea cierto.'),
      xpHaz('hoja', 'Trozos de mango deshidratado pasan la noche en agua de la llave. Alguien dice que se hinchan. ¿Tiene razón?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['Sí, porque dentro del mango hay más azúcar y el agua entra.'], ['Sí, porque el agua gasta energía para entrar.'], ['No, porque el agua sale hacia donde hay menos azúcar.'], ['No, porque el mango seco ya no tiene células.']], pista: 'Mira dónde hay más soluto, y si la razón dice algo que no es cierto.' }, 'Adentro está más concentrado: el agua entra sin gastar energía.')],
    cierre: 'Membrana que escoge, agua que va a lo más concentrado, energía para ir en contra y pared que aguanta.',
  });

  // Niveles: célula, tejido, órgano, sistema y organismo (k cuántos se ven).
  const corazon = (x, y, s) => `<path d="M${n(x)} ${n(y + 16 * s)} C${n(x - 22 * s)} ${n(y)} ${n(x - 18 * s)} ${n(y - 18 * s)} ${n(x - 6 * s)} ${n(y - 14 * s)} C${n(x - 2 * s)} ${n(y - 13 * s)} ${n(x)} ${n(y - 10 * s)} ${n(x)} ${n(y - 8 * s)} C${n(x)} ${n(y - 10 * s)} ${n(x + 2 * s)} ${n(y - 13 * s)} ${n(x + 6 * s)} ${n(y - 14 * s)} C${n(x + 18 * s)} ${n(y - 18 * s)} ${n(x + 22 * s)} ${n(y)} ${n(x)} ${n(y + 16 * s)}Z" fill="url(#xlb-l-rojo)" stroke="#8b1222" stroke-width="1.2"/>` +
    `<path d="M${n(x - 8 * s)} ${n(y - 6 * s)} q4 -4 8 -2" stroke="#fff" stroke-opacity=".5" fill="none"/>`;
  const tejido = (x, y) => [0, 1, 2].flatMap(i => [0, 1, 2].map(j => `<rect x="${n(x - 24 + i * 16)}" y="${n(y - 24 + j * 16)}" width="15" height="15" rx="4" fill="url(#xlb-celula)" stroke="#b5527d" stroke-width=".8"/><circle cx="${n(x - 16.5 + i * 16)}" cy="${n(y - 16.5 + j * 16)}" r="2.6" fill="url(#xlb-nucleo)"/>`)).join('');
  const sistema = (x, y) => `<path d="M${x} ${y - 26} C${x + 30} ${y - 26} ${x + 30} ${y + 30} ${x} ${y + 30} C${x - 30} ${y + 30} ${x - 30} ${y - 26} ${x} ${y - 26}" stroke="#c0392b" stroke-width="3" fill="none"/>` +
    `<path d="M${x - 4} ${y - 30} C${x - 36} ${y - 34} ${x - 36} ${y + 36} ${x - 4} ${y + 34}" stroke="#2949b8" stroke-width="2.4" fill="none" opacity=".85"/>` + corazon(x, y, 0.9);
  const niveles = (v, K) => {
    const P = [[36, 'célula'], [102, 'tejido'], [170, 'órgano'], [236, 'sistema'], [302, 'organismo']], k = v.k || 0;
    let s = '';
    if (k >= 1) s += X.celula(36, 100, 18, 'animal');
    if (k >= 2) s += tejido(102, 100);
    if (k >= 3) s += corazon(170, 98, 1.5);
    if (k >= 4) s += sistema(236, 98);
    if (k >= 5) s += X.persona(302, 160, 1.2, '#3f6fb5');
    for (let i = 1; i < Math.min(k, 5); i++) s += X.flecha(P[i - 1][0] + 22, 150, P[i][0] - 22, 150);
    P.slice(0, k).forEach(([x, t]) => { s += X.rot(x, 182, t); });
    if (v.t) s += X.rot(170, 24, v.t, 'oscuro');
    return X.foto(s, 200, 'lab');
  };

  xpAmplia('icf-cn-celula-2', {
    conecta: 'icf-cn-celula-1',
    desde: [
      ['Desde cero: de la célula al cuerpo',
        xpMira('dibujo', 'Un cuerpo tiene billones de células, pero no están revueltas: se organizan por **niveles**, de lo más pequeño a lo más grande.', { dib: niveles, v: { k: 0 }, alto: 200 }, [
          ['En la lección de transporte viste que cada célula toma y saca sustancias por su membrana.', { k: 1 }],
          ['Muchas células parecidas juntas forman un tejido, como ladrillos en un muro.', { k: 2 }],
          ['Varios tejidos forman un órgano, como el corazón.', { k: 3 }],
          ['Órganos que trabajan juntos forman un sistema: corazón, venas y arterias.', { k: 4 }],
          ['Todos los sistemas juntos forman el organismo: tú.', { k: 5 }],
          ['Mantener estable el interior de todo eso se llama homeostasis.', { k: 5, t: 'homeostasis = estable por dentro' }],
        ], 'Célula, tejido, órgano, sistema y organismo: cada nivel está hecho del anterior.'),
        xpHaz('hoja', 'Pon al margen el nivel de cada cosa.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['sistema', 'órgano', 'tejido'], meta: [1, 2, 0], paras: [['El estómago'], ['Una capa de células del músculo'], ['Boca, estómago e intestinos trabajando juntos']], pista: 'Alguno no va ahí: ¿es una capa de células, una pieza o un equipo de piezas?' }, 'Capa de células: tejido. Pieza: órgano. Equipo: sistema.')],
    ],
    despues: [
      ['Más difícil: el riñón y el agua',
        xpMira('hoja', 'Un caso que mezcla esta lección con la anterior: el riñón cuida que la sangre no quede ni muy **aguada** ni muy **concentrada**.', { paras: [['Día de sol sin beber agua: poca orina y oscura.'], ['Tarde de tomar mucha agua: mucha orina y clara.'], ['En los dos casos el riñón ajusta cuánta agua suelta.'], ['La meta: la sangre siempre con la misma concentración.']] }, [
          ['Sin beber, la sangre se concentra.', { luz: [0], nota: { 0: 'guarda agua' } }],
          ['El riñón guarda agua: la orina sale poca y oscura.', { luz: [0] }],
          ['Con mucha agua, la sangre se diluye.', { luz: [1], nota: { 1: 'suelta agua' } }],
          ['El riñón suelta el sobrante: orina abundante y clara.', { luz: [1] }],
          ['Dos respuestas opuestas para una misma meta: eso es homeostasis.', { luz: [2, 3], nota: { 3: 'meta' } }],
        ], 'El riñón guarda o suelta agua para que la sangre quede con la misma concentración.'),
        xpHaz('hoja', 'Un ciclista suda dos litros y no bebe nada. Subraya lo que hace su riñón.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Suelta más agua para limpiar el cuerpo.'], ['Guarda agua: orina poca y concentrada.'], ['Deja de funcionar hasta que beba.']], pista: 'Al sudar, la sangre perdió agua. ¿Qué conviene: soltar más o guardar?' }, 'Perdió agua: el riñón la guarda para no concentrar la sangre.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se mide cada hora la temperatura de una persona que pasa de un cuarto frío a uno caliente. ¿Qué serie muestra que **mantiene el equilibrio**?', { letras: ['A', 'B', 'C', 'D'], paras: [['36.5 → 33.0 → 39.0 °C'], ['36.5 → 36.7 → 36.6 °C'], ['36.5 → 37.5 → 38.5 °C'], ['La misma del cuarto en cada hora']] }, [
        ['Homeostasis no es que nada cambie: es volver cerca del valor normal.', {}],
        ['Esta sigue al cuarto: baja con el frío y sube con el calor.', { luz: [0], nota: { 0: 'sigue al ambiente' } }],
        ['Esta sube y no vuelve: el equilibrio se perdió.', { luz: [2], nota: { 2: 'no vuelve' } }],
        ['Esta confunde el cuerpo con el aire del cuarto.', { luz: [3], nota: { 3: 'otra cosa' } }],
        ['Esta cambia muy poco y se queda cerca de 36.5: es la respuesta.', { luz: [1], nota: { 1: 'equilibrio' } }],
      ], 'En las series busca la que se queda cerca de su valor aunque el ambiente cambie.'),
      xpHaz('hoja', 'La temperatura de un lagarto sube y baja con la del sol; la de un perro casi no cambia. ¿Qué lo explica?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['El perro regula su temperatura por dentro; el lagarto depende del ambiente.'], ['El lagarto no tiene células.'], ['El perro no tiene sangre.'], ['Los dos regulan su temperatura de la misma forma.']], pista: 'Hay opciones falsas sobre el cuerpo o que contradicen lo que dice la pregunta. ¿Quién se mantiene estable?' }, 'El perro mantiene su temperatura; el lagarto usa el sol.')],
    cierre: 'Células en niveles, un interior que vuelve a su valor y sistemas que trabajan en equipo.',
  });

  // Célula con núcleo y la doble hélice del ADN al lado (k: 0 hélice, 1 letras, 2 gen, 3 proteína).
  const BASE = 'ATGCGTACCATG', PAR = { A: 'T', T: 'A', G: 'C', C: 'G' }, COL = { A: '#e2544a', T: '#f2c230', G: '#3fb56a', C: '#3f8ee0' };
  const helice = (v, K) => {
    const k = v.k || 0, x0 = 150, dx = 15, yc = 92, A = 34;
    let s = X.celula(66, 96, 44, 'animal') + `<path d="M74 86 L${x0 - 6} 46 M74 108 L${x0 - 6} 140" stroke="#ffffff" stroke-width="1" stroke-dasharray="3 4" opacity=".8"/>` +
      `<rect x="${x0 - 8}" y="40" width="${dx * 12 + 10}" height="106" rx="10" fill="#0d1a2b" opacity=".85"/>`;
    const y1 = i => yc + A * Math.sin(i * 0.55), y2 = i => yc - A * Math.sin(i * 0.55);
    for (let i = 0; i < 12; i++) {
      const x = x0 + 4 + i * dx, a = y1(i), b = y2(i), m = (a + b) / 2, B = BASE[i];
      if (Math.abs(a - b) < 8) continue;
      s += `<line x1="${n(x)}" y1="${n(a)}" x2="${n(x)}" y2="${n(m)}" stroke="${COL[B]}" stroke-width="5"/><line x1="${n(x)}" y1="${n(m)}" x2="${n(x)}" y2="${n(b)}" stroke="${COL[PAR[B]]}" stroke-width="5"/>`;
      const letra = (y, L) => `<text x="${n(x)}" y="${n(y)}" fill="${COL[L]}" font-size="9" font-weight="700" style="text-anchor:middle;font-family:Jost,system-ui,sans-serif">${L}</text>`;
      if (k >= 1) s += letra(Math.max(a, b) + 13, a > b ? B : PAR[B]) + letra(Math.min(a, b) - 6, a > b ? PAR[B] : B);
    }
    const tira = f => `<polyline points="${Array.from({ length: 45 }, (_, j) => { const i = j / 4; return `${n(x0 + 4 + i * dx)},${n(f(i))}`; }).join(' ')}" stroke="url(#xlb-metal)" stroke-width="4" fill="none" stroke-linecap="round"/>`;
    s += tira(y1) + tira(y2);
    if (k >= 2) s += `<path d="M${x0 + 2} 34 v-6 h${dx * 6} v6" stroke="#ffe25a" stroke-width="2" fill="none"/>` + X.rot(x0 + 2 + dx * 3, 22, 'un gen = una receta', 'oscuro');
    if (k >= 3) s += [0, 1, 2, 3, 4, 5].map(j => `<circle cx="${n(x0 + 10 + j * 22)}" cy="170" r="8" fill="${['#e2544a', '#3fb56a', '#3f8ee0', '#f2c230', '#c79bf0', '#e2544a'][j]}" stroke="#1d2328" stroke-width=".8"/>`).join('') + X.rot(x0 + 64, 192, 'proteína: aminoácidos en fila');
    if (v.r) s += X.rot(66, 168, v.r);
    return X.foto(s, 206, 'lab');
  };

  xpAmplia('icf-cn-celula-3', {
    conecta: 'icf-cn-celula-1',
    desde: [
      ['Desde cero: un recetario en cada célula',
        xpMira('dibujo', 'En el núcleo hay una molécula larguísima, el **ADN**. Es como un libro de recetas que dice qué fabricar y cómo.', { dib: helice, v: { k: 0 }, alto: 206 }, [
          ['En la lección de la célula viste que el núcleo guarda las instrucciones.', { r: 'núcleo' }],
          ['Esas instrucciones son el ADN: dos tiras enrolladas como una escalera torcida.', {}],
          ['Está escrito con solo cuatro letras: A, T, G y C.', { k: 1 }],
          ['Las letras van en parejas fijas: A con T y G con C.', { k: 1 }],
          ['Un gen es un tramo del ADN: una receta para una proteína.', { k: 2 }],
          ['Las proteínas son los platos que hacen el trabajo, como la queratina del pelo.', { k: 3 }],
        ], 'ADN: el recetario. Gen: una receta. Proteína: lo que se fabrica con ella.'),
        xpHaz('hoja', 'En el ADN cada letra tiene una pareja fija. Subraya la pareja correcta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['A con G'], ['G con C'], ['T con C']], pista: 'En el ADN la A siempre va con la T. ¿Con quién queda la G?' }, 'A con T y G con C: así se arman los peldaños.')],
    ],
    despues: [
      ['Más difícil: el mismo libro, otras recetas',
        xpMira('hoja', 'Algo que confunde: casi todas tus células tienen **el mismo ADN**. Entonces, ¿por qué una neurona no se parece a una célula de la piel?', { paras: [['Una célula de la piel y una del ojo tienen el mismo ADN.'], ['La de la piel lee los genes de la queratina.'], ['La del ojo lee los genes de los pigmentos de la vista.'], ['Cambia qué recetas se leen, no el libro.']] }, [
          ['Todas vienen de una sola célula: copiaron el mismo libro.', { luz: [0], nota: { 0: 'mismo ADN' } }],
          ['Pero cada una abre el libro en páginas distintas.', { luz: [1, 2] }],
          ['La de la piel fabrica queratina.', { luz: [1], nota: { 1: 'queratina' } }],
          ['La del ojo fabrica las proteínas que captan la luz.', { luz: [2], nota: { 2: 'pigmentos' } }],
          ['Distintas proteínas, distinto trabajo, mismo ADN.', { luz: [3] }],
        ], 'Las células de un cuerpo comparten el ADN y se diferencian por los genes que leen.'),
        xpHaz('hoja', 'Subraya lo cierto sobre una neurona y una célula del hígado de la misma persona.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Tienen ADN distinto.'], ['Tienen el mismo ADN, pero leen genes distintos.'], ['La neurona no tiene ADN.']], pista: 'Las dos vienen de la misma primera célula. ¿Qué cambia entonces?' }, 'El libro es el mismo; las recetas que se leen, no.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un tramo de ADN dice **TAC CGA**. Se copia a ARN y se lee. El examen pregunta qué afirmación es correcta.', { letras: ['A', 'B', 'C', 'D'], paras: [['El ARN es TAC CGA, igual al ADN.'], ['El ARN es AUG GCU e indica dos aminoácidos.'], ['El ARN es ATG GCT, con T.'], ['El ARN es AUG GCU e indica seis aminoácidos.']] }, [
        ['Haz tú la copia: T da A, A da U, C da G y G da C.', {}, '$\\text{TAC} \\to \\text{AUG} \\qquad \\text{CGA} \\to \\text{GCU}$'],
        ['Esta no copia nada: deja el ADN igual.', { luz: [0], nota: { 0: 'sin copiar' } }],
        ['Esta usa T: el ARN no tiene T, tiene U.', { luz: [2], nota: { 2: 'T en el ARN' } }],
        ['Esta cuenta letras, no codones: son 6 letras y 2 codones.', { luz: [3], nota: { 3: 'letras ≠ codones' } }],
        ['Copia bien y cuenta de tres en tres: es la respuesta.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Copia letra por letra, cambia T por U y cuenta aminoácidos de tres en tres.'),
      xpHaz('hoja', 'Un tramo de ADN dice **GGA TTC**. ¿Cuál es su ARN y cuántos aminoácidos indica?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['CCT AAG, dos aminoácidos'], ['GGA UUC, dos aminoácidos'], ['CCU AAG, dos aminoácidos'], ['CCU AAG, seis aminoácidos']], pista: 'Revisa tres cosas: que cada letra cambie por su pareja, que no quede T y que cuentes de a tres.' }, 'GGA da CCU y TTC da AAG: dos codones, dos aminoácidos.')],
    cierre: 'ADN en el núcleo, copia en ARN con U, lectura de tres en tres y mismas recetas en todo el cuerpo.',
  });
}
;
//#archivo js/explora-icf-cn-3.js
// Preicfes · Ciencias Naturales, mundo 3 «Movimiento y Fuerzas» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  // Gráfica posición contra tiempo: q son las posiciones de 0 a 4 s; n cuántas se ven.
  const X = t => 56 + t * 62, Y = q => 168 - q * 1.5;
  const pos = (v, K) => K.l(56, 168, 318, 168, 'lm') + K.l(56, 168, 56, 18, 'lm') + [0, 30, 60, 90].map(k => K.l(56, Y(k), 314, Y(k), 'ls') + K.t(48, Y(k) + 4, k, 's tm', 'end')).join('') + [0, 1, 2, 3, 4].map(t => K.t(X(t), 184, t, 's tm')).join('') + K.t(318, 200, 'segundos', 's tm', 'end') + K.t(60, 14, 'metros', 's tm', 'start') + K.pl(v.q.slice(0, v.n).map((q, t) => [X(t), Y(q)]), 'la gr') + v.q.slice(0, v.n).map((q, t) => K.c(X(t), Y(q), 5, 'fA')).join('') + K.t(190, 30, v.t || '', 'ta');
  // Caja con fuerzas hacia la derecha (d) y hacia la izquierda (i).
  const caja = (v, K) => K.l(20, 150, 320, 150, 'lm') + K.r(140, 100, 60, 50, 'fa', 4) + (v.d > 1 ? K.ar(200, 125, 200 + v.d, 125, 'lg gr') + K.t(204 + v.d / 2, 112, `${Math.round(v.d * 2)} N`, 's tg') : '') + (v.i > 1 ? K.ar(140, 125, 140 - v.i, 125, 'lf gr') + K.t(136 - v.i / 2, 112, `${Math.round(v.i * 2)} N`, 's tf') : '') + K.t(170, 40, v.t || '', 'ta') + K.t(170, 180, v.p || '', 's tm');
  // Torre: dos bolas que caen; y es la altura que han bajado (0 a 1).
  const torre = (v, K) => K.r(40, 30, 30, 140, 'fn', 2) + K.l(20, 172, 320, 172, 'lm') + K.c(120, 40 + v.y * 122, v.r1, 'fA') + K.c(210, 40 + v.z * 122, v.r2, 'fG') + K.t(120, 22, v.a || '', 's ta') + K.t(210, 22, v.b || '', 's tg') + K.t(170, 194, v.t || '', 's tm');

  xpLec('icf-cn-movimiento-1', [
    ['La gráfica cuenta un viaje',
      xpMira('dibujo', 'Empecemos por la idea: la gráfica muestra **dónde está** en cada momento.', { dib: pos, v: { q: [0, 20, 40, 60, 80], n: 1, t: '' }, alto: 206 }, [
        ['A los cero segundos está en cero.', {}],
        ['Cada segundo avanza 20 metros.', { n: 5 }, '$20 \\text{ m cada segundo}$'],
        ['Una recta: la velocidad no cambia.', { t: 'constante' }],
        ['Si se queda en 40, la línea es horizontal: está quieto.', { q: [0, 20, 40, 40, 40], t: 'quieto desde 2 s' }],
        ['Si baja, se devuelve.', { q: [0, 30, 60, 40, 20], t: 'se devuelve' }],
      ], 'Recta: velocidad constante. Horizontal: quieto. Baja: se devuelve.'),
      xpHaz('hoja', 'La posición fue 0, 10, 20, 20, 20 m. Subraya lo que pasó.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Avanzó todo el tiempo.'], ['Avanzó y luego se quedó quieto.'], ['Se devolvió.']], pista: 'Mira si los números cambian al final.' }, 'De 20 a 20 no cambia: quieto.')],
    ['Más rápido o más lento',
      xpMira('dibujo', 'Segunda idea: la **inclinación** es la velocidad.', { dib: pos, v: { q: [0, 10, 20, 30, 40], n: 5, t: '10 m/s' }, alto: 206 }, [
        ['Diez metros por segundo: poca inclinación.', {}],
        ['Veinte metros por segundo: más empinada.', { q: [0, 20, 40, 60, 80], t: '20 m/s' }],
        ['Si cada segundo avanza más, la línea se curva.', { q: [0, 5, 20, 45, 80], t: 'acelera' }],
        ['Avanza 5, 15, 25 y 35: gana 10 cada vez.', {}, '$15 - 5 = 25 - 15 = 10$'],
        ['Eso es acelerar: cambiar la velocidad.', {}],
      ], 'Velocidad: cuánto cambia la posición. Aceleración: cuánto cambia la velocidad.'),
      xpHaz('fichas', 'Un carro pasa de 12 a 20 m/s en 4 s. Pon cuánto cambió la velocidad y la aceleración.', { slots: [{ x: 110, y: 46, w: 90, et: 'cambio (m/s)' }, { x: 230, y: 46, w: 90, et: 'm/s cada s' }], fichas: ['8', '2', '32', '5', '3'], meta: ['8', '2'], alto: 96, pista: 'Resta las velocidades y reparte en 4 segundos.' }, '$20 - 12 = 8$ y $8 \\div 4 = 2$.')],
    ['Media y signo',
      xpMira('hoja', 'Tercera idea: la **media** mira todo el viaje y el **signo**, el sentido.', { paras: [['100 m en 20 s, parando dos veces.'], ['100 m en 20 s, sin parar.'], ['De 100 a 0 m en 20 s.']] }, [
        ['La media es toda la distancia entre todo el tiempo.', { luz: [0], nota: { 0: '5 m/s' } }, '$100 \\div 20 = 5$'],
        ['Sin parar da lo mismo.', { luz: [1], nota: { 1: '5 m/s' } }],
        ['Por eso la media no cuenta las paradas.', { luz: [0, 1] }],
        ['De regreso la velocidad es −5.', { luz: [2], nota: { 2: '−5 m/s' } }],
        ['El menos indica el sentido, no que vaya despacio.', {}],
      ], 'Media: total entre total. Signo: hacia dónde.'),
      xpHaz('fichas', 'Una ciclista hace 30 km en 2 horas, con una parada de media hora incluida. Pon su velocidad media y la que llevó mientras rodaba.', { slots: [{ x: 110, y: 46, w: 90, et: 'media (km/h)' }, { x: 230, y: 46, w: 90, et: 'rodando' }], fichas: ['15', '20', '12', '60', '17'], meta: ['15', '20'], alto: 96, pista: 'La media usa las 2 horas; rodando fue hora y media.' }, '$30 \\div 2 = 15$ y $30 \\div 1.5 = 20$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Dos gráficas de posición se cruzan a los 3 s. Subraya lo que se concluye.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['A los 3 s están en el mismo lugar.'], ['A los 3 s van igual de rápido.'], ['Chocan y se detienen.']], pista: 'El eje vertical es la posición.' }, 'El cruce es la misma posición, no la misma velocidad.')],
  ], 'Lee el eje, mira la inclinación y separa media, signo y lugar.');

  xpLec('icf-cn-movimiento-2', [
    ['Juntar las fuerzas',
      xpMira('dibujo', 'Empecemos por la idea: importa la **fuerza neta**, la que resulta de juntar todas.', { dib: caja, v: { d: 30, i: 0, t: '', p: '' }, alto: 196 }, [
        ['Sesenta newtons hacia la derecha.', { t: 'neta: 60 N' }],
        ['El piso frena con veinte: se restan.', { i: 10, t: 'neta: 40 N' }, '$60 - 20 = 40$'],
        ['Si frena con sesenta, la neta es cero.', { i: 30, t: 'neta: 0 N' }, '$60 - 60 = 0$'],
        ['Con neta cero no cambia su movimiento.', { p: 'quieta sigue quieta; si iba, sigue igual' }],
        ['No quiere decir que no haya fuerzas.', {}],
      ], 'Mismo sentido se suma; contrario se resta. Neta cero: no cambia.'),
      xpHaz('dibujo', 'Empujan con 80 N a la derecha. Mueve el roce hasta que la neta sea **30 N**.', { dib: (v, K) => caja({ d: 40, i: v.r / 2, t: `neta: ${80 - v.r} N` }, K), v: { r: 10 }, metas: { r: 50 }, alto: 240, manijas: [{ k: 'r', min: 0, max: 80, paso: 10, et: 'roce (N)' }], lee: v => `$80 - ${v.r} = ${80 - v.r}$`, dice: () => 'El roce va en sentido contrario.' }, '$80 - 50 = 30$.')],
    ['Fuerza, masa y aceleración',
      xpMira('fichas', 'Segunda idea: la aceleración es la fuerza neta **repartida** en la masa.', { slots: [{ x: 70, y: 50, w: 90, et: '40 N, 10 kg' }, { x: 170, y: 50, w: 90, et: '80 N, 10 kg' }, { x: 270, y: 50, w: 90, et: '40 N, 20 kg' }], fichas: ['4', '8', '2'], alto: 100 }, [
        ['Cuarenta newtons sobre diez kilos.', { pon: { 0: '4' } }, '$40 \\div 10 = 4$'],
        ['El doble de fuerza: el doble de aceleración.', { pon: { 1: '8' } }, '$80 \\div 10 = 8$'],
        ['El doble de masa: la mitad.', { pon: { 2: '2' } }, '$40 \\div 20 = 2$'],
        ['Por eso un camión lleno arranca lento.', { marca: [2] }],
        ['Se escribe: fuerza neta igual a masa por aceleración.', { marca: [] }, '$F = m \\cdot a$'],
      ], 'Más fuerza, más aceleración; más masa, menos.'),
      xpHaz('fichas', 'Fuerza neta 90 N, masa 30 kg. Pon la aceleración, y la que habría con 60 kg.', { slots: [{ x: 110, y: 46, w: 90, et: 'con 30 kg' }, { x: 230, y: 46, w: 90, et: 'con 60 kg' }], fichas: ['3', '1.5', '6', '2 700', '60'], meta: ['3', '1.5'], alto: 96, pista: 'Divide la fuerza entre la masa.' }, '$90 \\div 30 = 3$ y $90 \\div 60 = 1.5$.')],
    ['Fuerzas por pares',
      xpMira('hoja', 'Tercera idea: si empujas algo, te **empuja** igual y al contrario.', { paras: [['El remo empuja el agua.', 'El agua empuja el bote.'], ['El pie empuja el suelo.', 'El suelo empuja el cuerpo.'], ['El cohete empuja el gas.', 'El gas empuja el cohete.']] }, [
        ['Empujas el agua y ella empuja el bote.', { luz: [0, 1], nota: { 0: 'par' } }],
        ['Caminar es que el suelo te empuje.', { luz: [2, 3], nota: { 1: 'par' } }],
        ['El cohete sube porque el gas lo empuja.', { luz: [4, 5], nota: { 2: 'par' } }],
        ['Son iguales y contrarias.', {}],
        ['No se anulan: actúan sobre objetos distintos.', { luz: [0, 1] }],
      ], 'Acción y reacción: iguales, contrarias y sobre cuerpos distintos.'),
      xpHaz('hoja', 'Pateas un balón. Subraya la **pareja** de esa fuerza.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El peso del balón'], ['El balón empuja tu pie'], ['El roce del pasto']], pista: 'Debe ser entre los mismos dos: pie y balón.' }, 'Pie y balón se empujan mutuamente.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un tren va recto a 70 km/h sin cambiar. Subraya lo cierto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['No actúa ninguna fuerza.'], ['La del motor es mayor que el roce.'], ['Las fuerzas se equilibran: la neta es cero.']], pista: 'Su movimiento no cambia. ¿Qué dice eso de la neta?' }, 'Velocidad constante: neta cero, aunque haya fuerzas.')],
  ], 'Junta las fuerzas, reparte en la masa y busca la pareja.');

  xpLec('icf-cn-movimiento-3', [
    ['Caer igual',
      xpMira('dibujo', 'Empecemos por la idea: sin aire, **todo cae igual**.', { dib: torre, v: { y: 0, z: 0, r1: 9, r2: 14, a: '1 kg', b: '3 kg', t: '' }, alto: 202 }, [
        ['Dos bolas de masa distinta.', {}],
        ['Se sueltan al tiempo…', { y: 0.5, z: 0.5 }],
        ['…y llegan al tiempo.', { y: 1, z: 1, t: 'llegan juntas' }],
        ['Cada segundo ganan unos 10 m/s.', { t: '10, 20, 30 m/s' }, '$10 \\to 20 \\to 30$'],
        ['En el aire una pluma se demora: el aire la frena.', { t: '' }],
      ], 'Sin aire, la masa no cambia la caída: unos 10 m/s más cada segundo.'),
      xpHaz('fichas', 'Se suelta una piedra. Pon su velocidad a los 2 y a los 5 segundos (10 m/s más cada segundo).', { slots: [{ x: 110, y: 46, w: 90, et: 'a los 2 s' }, { x: 230, y: 46, w: 90, et: 'a los 5 s' }], fichas: ['20', '50', '10', '12', '25'], meta: ['20', '50'], alto: 96, pista: 'Empieza en cero y gana 10 en cada segundo.' }, '$2 \\cdot 10$ y $5 \\cdot 10$.')],
    ['Masa y peso',
      xpMira('hoja', 'Segunda idea: la **masa** es materia; el **peso**, la fuerza con que te atraen.', { paras: [['Tierra: masa 60 kg', 'peso 600 N'], ['Luna: masa 60 kg', 'peso 100 N'], ['Lejos de todo: masa 60 kg', 'peso casi 0 N']] }, [
        ['En la Tierra, 60 kilos y 600 newtons.', { luz: [0, 1] }, '$60 \\cdot 10 = 600$'],
        ['En la Luna, la misma masa.', { luz: [2], nota: { 1: 'igual masa' } }],
        ['Pero pesa seis veces menos.', { luz: [3] }],
        ['Lejos de todo, la masa sigue ahí.', { luz: [4, 5], nota: { 2: 'igual masa' } }],
        ['Kilogramos para masa; newtons para peso.', {}],
      ], 'La masa no cambia de lugar a lugar; el peso, sí.'),
      xpHaz('fichas', 'Una roca de 12 kg pesa 120 N en la Tierra. En la Luna, pon su masa y su peso.', { slots: [{ x: 110, y: 46, w: 90, et: 'masa (kg)' }, { x: 230, y: 46, w: 90, et: 'peso (N)' }], fichas: ['12', '20', '2', '120', '720'], meta: ['12', '20'], alto: 96, pista: 'La masa no cambia; el peso es la sexta parte.' }, 'Masa 12 kg y peso $120 \\div 6 = 20$ N.')],
    ['Orbitar es caer',
      xpMira('hoja', 'Tercera idea: una **órbita** es caer mientras se avanza de lado.', { paras: [['Lanzas una bola: cae cerca.'], ['Más rápido: cae más lejos.'], ['Muy rápido: cae siguiendo la curva de la Tierra.'], ['Nunca llega al suelo.']] }, [
        ['Toda bola lanzada cae.', { luz: [0], nota: { 0: 'despacio' } }],
        ['Con más velocidad llega más lejos.', { luz: [1], nota: { 1: 'más rápido' } }],
        ['Si va muy rápido, el suelo se curva al mismo ritmo.', { luz: [2], nota: { 2: 'órbita' } }],
        ['Cae siempre, pero no llega.', { luz: [3] }],
        ['Por eso flotan los astronautas: caen con su nave.', {}],
      ], 'La Luna sí cae: cae alrededor de la Tierra.'),
      xpHaz('hoja', '¿Por qué flota una astronauta en la estación? Subraya.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Allá no hay gravedad.'], ['No tiene masa.'], ['Cae junto con la estación.']], pista: 'La gravedad llega hasta allá y la masa no se pierde.' }, 'Ella y la estación caen a la vez.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Se sueltan al tiempo, en el vacío, un tornillo y un papel. Subraya lo que ocurre.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Llegan al tiempo.'], ['Llega antes el tornillo.'], ['El papel flota.']], pista: 'En el vacío no hay aire que frene al papel.' }, 'Sin aire, caen igual.')],
  ], 'Caer igual, pesar distinto y orbitar cayendo.');
}
;
//#archivo js/explora-icf-cn-3-pasos.js
// Preicfes · Ciencias Naturales, mundo 3 «Movimiento y Fuerzas», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB, n = x => Math.round(x * 100) / 100;
  const txt = (x, y, s, c = '#1d2328', t = 10) => `<text x="${n(x)}" y="${n(y)}" fill="${c}" font-size="${t}" font-weight="600" style="text-anchor:middle;font-family:Jost,system-ui,sans-serif">${s}</text>`;

  // Una calle con marcas cada 10 m, una persona en la posición p (m) y un cronómetro.
  const calle = (v, K) => {
    const xm = m => 34 + m * 5.4, p = v.p || 0;
    let s = `<rect x="0" y="150" width="340" height="16" fill="#8d8f8f"/><path d="M0 158 H340" stroke="#f4f4f4" stroke-width="1.5" stroke-dasharray="10 8"/>` +
      `<rect x="${xm(0) - 2}" y="70" width="4" height="80" fill="#5b646a"/><rect x="${xm(0) - 18}" y="62" width="36" height="14" rx="2" fill="#2f7d4a"/>` + txt(xm(0), 72, 'esquina', '#ffffff', 8);
    for (let m = 0; m <= 50; m += 10) s += `<rect x="${n(xm(m) - 1)}" y="166" width="2" height="8" fill="#ffffff"/>` + txt(xm(m), 186, `${m} m`, '#ffffff', 9);
    s += X.persona(xm(p), 150, 0.95, '#c0392b') + X.cronometro(296, 46, 22, v.c || '00:00');
    if (v.r) s += X.rot(Math.max(76, xm(p)), 40, v.r, 'oscuro');
    return X.foto(s, 200, 'campo', 166);
  };
  // Gráfica de velocidad contra tiempo: m = 1 horizontal en 10, 2 sube, 3 pegada al cero.
  const vel = (v, K) => {
    const Xs = t => 56 + t * 62, Y = q => 160 - q * 5;
    let h = K.l(56, 160, 318, 160, 'lm') + K.l(56, 160, 56, 30, 'lm') + [0, 10, 20].map(q => K.l(56, Y(q), 314, Y(q), 'ls') + K.t(48, Y(q) + 4, q, 's tm', 'end')).join('') +
      [0, 1, 2, 3, 4].map(t => K.t(Xs(t), 176, t, 's tm')).join('') + K.t(318, 194, 'segundos', 's tm', 'end') + K.t(60, 22, 'velocidad (m/s)', 's tm', 'start');
    const L = { 1: [10, 10, 10, 10, 10], 2: [0, 5, 10, 15, 20], 3: [0, 0, 0, 0, 0] }[v.m];
    if (L) h += K.pl(L.map((q, t) => [Xs(t), Y(q)]), 'la gr');
    if (v.t) h += K.t(200, 50, v.t, 'ta');
    return h;
  };

  xpAmplia('icf-cn-movimiento-1', {
    conecta: 'icf-cn-indaga-2',
    desde: [
      ['Desde cero: dónde estás y cuánto tardas',
        xpMira('dibujo', 'Para describir un viaje bastan dos medidas: **dónde** está algo y **cuándo**. Con ellas sale la velocidad.', { dib: calle, v: { p: 0 }, alto: 200 }, [
          ['En la lección de datos viste que una tabla junta lo que cambia con lo que se mide.', {}],
          ['Posición: dónde está algo, contado desde un punto cero, aquí la esquina.', { r: 'posición: 0 m' }],
          ['Como cuando dices «estoy a 20 metros de la esquina».', { p: 20, r: 'posición: 20 m' }],
          ['El tiempo se mide con un cronómetro: llegó ahí a los 10 segundos.', { p: 20, c: '00:10', r: '20 m a los 10 s' }],
          ['Velocidad: cuántos metros avanza en cada segundo.', { p: 20, c: '00:10', r: '2 m cada segundo' }, '$20 \\div 10 = 2$'],
          ['Si cada segundo avanza lo mismo, la velocidad es constante.', { p: 40, c: '00:20', r: '40 m a los 20 s' }],
        ], 'Posición: dónde está. Tiempo: cuándo. Velocidad: cuánto avanza en cada segundo.'),
        xpHaz('hoja', 'Cada medida tiene su unidad. Subraya la que es una **velocidad**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['30 metros'], ['5 segundos'], ['3 metros cada segundo']], pista: 'Esa es solo una distancia o solo un tiempo. La velocidad junta las dos.' }, 'Metros por cada segundo: distancia repartida en el tiempo.')],
    ],
    despues: [
      ['Más difícil: la gráfica de velocidad',
        xpMira('dibujo', 'La trampa más común: confundir la gráfica de **posición** con la de **velocidad**. Mira qué dice el eje vertical.', { dib: vel, v: { m: 0 }, alto: 200 }, [
          ['Ahora el eje vertical no dice dónde está, sino qué tan rápido va.', {}],
          ['Una línea horizontal aquí no es quieto: va siempre a 10 m/s.', { m: 1, t: 'velocidad constante' }],
          ['Una línea que sube es acelerar: cada segundo va más rápido.', { m: 2, t: 'acelera' }],
          ['Quieto, en esta gráfica, es estar pegado al cero.', { m: 3, t: 'quieto' }],
          ['Antes de leer cualquier gráfica, mira qué dice cada eje.', {}],
        ], 'En velocidad contra tiempo, horizontal es rapidez constante; quieto es estar en cero.'),
        xpHaz('hoja', 'En una gráfica de **velocidad** contra tiempo, la línea es horizontal en 15 m/s. Subraya lo que pasa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Está quieto.'], ['Va siempre a 15 m/s.'], ['Está frenando.']], pista: 'Esa sería la lectura de una gráfica de posición. Aquí el eje dice velocidad.' }, 'La velocidad no cambia: va parejo a 15 m/s.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un bus sale del paradero, avanza parejo 3 minutos, se detiene 2 en un semáforo y sigue. ¿Qué tabla de **posiciones** (m, cada minuto) lo representa?', { letras: ['A', 'B', 'C', 'D'], paras: [['0, 400, 800, 1200, 1200, 1200, 1600'], ['0, 400, 800, 1200, 0, 0, 400'], ['0, 400, 800, 1200, 1600, 2000, 2400'], ['200, 600, 1000, 1400, 1400, 1400, 1800']] }, [
        ['Revisa tres cosas: dónde empieza, cómo cambia y dónde se repite.', {}],
        ['Esta vuelve al cero: confunde detenerse con regresar.', { luz: [1], nota: { 1: 'regresa' } }],
        ['Esta nunca se detiene: le falta el semáforo.', { luz: [2], nota: { 2: 'no para' } }],
        ['Esta tiene la forma buena, pero no sale del paradero, sale de 200.', { luz: [3], nota: { 3: 'mal comienzo' } }],
        ['Sale de 0, avanza parejo, repite 1200 dos veces y sigue.', { luz: [0], nota: { 0: 'correcta' } }],
      ], 'En las tablas de posición, quieto es repetir el número; volver es que baje.'),
      xpHaz('hoja', 'Una ciclista arranca quieta y cada segundo va más rápido. ¿Qué tabla de posiciones (m, cada segundo) la representa?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['0, 3, 6, 9, 12'], ['0, 1, 4, 9, 16'], ['0, 5, 5, 5, 5'], ['16, 9, 4, 1, 0']], pista: 'Calcula cuánto avanza en cada segundo. Si va más rápido, cada salto debe ser mayor que el anterior.' }, 'Avanza 1, 3, 5 y 7: cada segundo más que el anterior.')],
    cierre: 'Lee qué dice cada eje: en posición, horizontal es quieto; en velocidad, horizontal es ir parejo.',
  });

  // Soporte con resorte (l = 0 suelto, 1 estirado con la pesa) y una caja que se empuja (e).
  const fuerza = (v, K) => {
    let s = X.soporte(40, 166, 150, 140) + X.resorte(96, 34, v.l ? 76 : 44, v.pesa ? '1 kg' : '');
    s += `<rect x="200" y="122" width="76" height="44" rx="3" fill="#b8844f" stroke="#6b4423"/><path d="M204 136 H272 M204 150 H272" stroke="#6b4423" stroke-width=".8" opacity=".6"/>`;
    if (v.e) s += X.flecha(146, 144, 196, 144) + X.rot(168, 118, v.re || '', 'oscuro');
    if (v.rr) s += X.rot(150, 66, v.rr);
    return X.foto(s, 200, 'lab');
  };

  xpAmplia('icf-cn-movimiento-2', {
    conecta: 'icf-cn-movimiento-1',
    desde: [
      ['Desde cero: qué es una fuerza',
        xpMira('dibujo', 'Para cambiar un movimiento hace falta una **fuerza**. Veamos qué es y cómo se mide.', { dib: fuerza, v: {}, alto: 200 }, [
          ['En la lección de movimiento viste que acelerar es cambiar la velocidad.', {}],
          ['Una fuerza es un empujón o un jalón: lo que puede cambiar un movimiento.', { e: 1, re: 'empujón' }],
          ['Tiene tamaño y dirección: no es igual empujar de lado que hacia arriba.', { e: 1, re: 'tamaño y dirección' }],
          ['Se mide en newtons. Un resorte la mide: entre más se estira, más fuerza.', { e: 1, re: 'empujón', rr: 'dinamómetro' }],
          ['Una bolsa de un kilo lo estira con unos 10 newtons: su peso.', { e: 1, re: 'empujón', l: 1, pesa: 1, rr: '1 kg ≈ 10 N' }],
        ], 'Una fuerza empuja o hala, tiene tamaño y dirección y se mide en newtons.'),
        xpHaz('hoja', 'Subraya lo que **sí** es una fuerza.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La rapidez de un bus'], ['El jalón de una cuerda sobre un balde'], ['La masa de una piedra']], pista: 'Esa describe qué tan rápido va algo o cuánta materia tiene. Busca un empujón o un jalón.' }, 'El jalón de la cuerda tiene tamaño y dirección: es una fuerza.')],
    ],
    despues: [
      ['Más difícil: equilibrio no es acción y reacción',
        xpMira('hoja', 'Una confusión que el examen aprovecha: dos fuerzas iguales y contrarias **no siempre** son un par de acción y reacción.', { paras: [['Un libro está quieto sobre la mesa.'], ['La Tierra lo hala hacia abajo: su peso.'], ['La mesa lo empuja hacia arriba con la misma fuerza.'], ['Las dos actúan sobre el libro: es equilibrio.'], ['La pareja del peso es el libro halando a la Tierra.']] }, [
          ['Sobre el libro hay dos fuerzas: peso y empuje de la mesa.', { luz: [1, 2] }],
          ['Son iguales y contrarias, y el libro sigue quieto.', { luz: [2], nota: { 2: 'iguales' } }],
          ['Pero las dos están sobre el mismo cuerpo: eso es equilibrio.', { luz: [3], nota: { 3: 'equilibrio' } }],
          ['Un par de acción y reacción actúa sobre cuerpos distintos.', { luz: [4] }],
          ['La Tierra hala al libro y el libro hala a la Tierra: ese es el par.', { luz: [4], nota: { 4: 'par' } }],
        ], 'Equilibrio: fuerzas sobre el mismo cuerpo. Par: entre dos cuerpos, una sobre cada uno.'),
        xpHaz('hoja', 'Una lámpara cuelga quieta de un cable. Subraya la pareja de acción y reacción del **peso** de la lámpara.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El cable hala la lámpara hacia arriba.'], ['La lámpara hala a la Tierra hacia arriba.'], ['El techo sostiene el cable.']], pista: 'El peso es entre la Tierra y la lámpara. Su pareja debe ser entre esos mismos dos.' }, 'Si la Tierra hala la lámpara, la lámpara hala a la Tierra.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un ascensor sube con velocidad constante. Alguien afirma que el cable hala **más** de lo que pesa el ascensor. ¿Tiene razón?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque si sube, la fuerza hacia arriba debe ganar.'], ['Sí, porque un cable siempre hala más que el peso.'], ['No, porque con velocidad constante la neta es cero: hala igual al peso.'], ['No, porque sobre el ascensor no actúa ninguna fuerza.']] }, [
        ['Decide primero: velocidad constante, nada cambia. Neta cero.', {}],
        ['Esta es la intuición de todos los días, y es falsa.', { luz: [0], nota: { 0: 'intuición' } }],
        ['Esta dice «siempre»: al arrancar sí gana, pero ya no.', { luz: [1], nota: { 1: 'absoluto' } }],
        ['Buen «No», mala razón: hay peso y hay jalón del cable.', { luz: [3], nota: { 3: 'razón falsa' } }],
        ['Esta tiene la conclusión y el porqué correctos.', { luz: [2], nota: { 2: 'correcta' } }],
      ], 'Velocidad constante, en cualquier dirección, quiere decir fuerza neta cero.'),
      xpHaz('hoja', 'Una caja de 20 kg recibe 100 N hacia la derecha y 40 N hacia la izquierda. ¿Qué le pasa?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['Acelera hacia la derecha, 3 m/s más cada segundo.'], ['Acelera 7 m/s más cada segundo, sumando las fuerzas.'], ['Acelera 5 m/s más cada segundo, sin restar la de 40 N.'], ['Se queda quieta porque hay fuerzas contrarias.']], pista: 'Primero la neta: las contrarias se restan. Después reparte entre la masa.' }, 'Neta $100 - 40 = 60$ N y $60 \\div 20 = 3$.')],
    cierre: 'Fuerza neta: se suman o se restan; se reparte en la masa; equilibrio y par de acción no son lo mismo.',
  });

  // La Tierra con personas paradas alrededor y objetos que caen hacia el centro.
  const tierra = (v, K) => {
    const cx = 170, cy = 110, R = 50, k = v.k || 0;
    let s = `<circle cx="${cx}" cy="${cy}" r="${R + 8}" fill="#7fb8e6" opacity=".25"/><circle cx="${cx}" cy="${cy}" r="${R}" fill="url(#xlb-l-azul)"/>` +
      `<path d="M${cx - 30} ${cy - 30} q18 -14 30 -2 q10 12 -4 22 q-16 6 -26 -6z M${cx + 8} ${cy + 6} q22 -8 30 8 q2 20 -18 24 q-18 -6 -12 -32z M${cx - 40} ${cy + 12} q10 -4 14 8 q-4 12 -14 6z" fill="url(#xlb-hoja)" opacity=".9"/>` +
      `<circle cx="${cx - 18}" cy="${cy - 22}" r="16" fill="#fff" opacity=".12"/>`;
    if (k >= 3) [0, 90, 180, 270].forEach(a => { s += `<g transform="rotate(${a} ${cx} ${cy})">${X.persona(cx, cy - R, 0.7, ['#c0392b', '#3f6fb5', '#2f7d4a', '#8e44ad'][a / 90])}</g>`; });
    if (k >= 2) (k >= 3 ? [45, 135, 225, 315] : [45]).forEach(a => {
      const r = Math.PI * (a - 90) / 180, P = d => [cx + d * Math.cos(r), cy + d * Math.sin(r)];
      s += `<circle cx="${n(P(100)[0])}" cy="${n(P(100)[1])}" r="7" fill="url(#xlb-l-rojo)" stroke="#8b1222"/>` + X.flecha(...P(90), ...P(64), '#ffe25a');
    });
    if (k >= 4) s += X.rot(cx, 218, 'el jalón de la Tierra sobre ti: tu peso', 'oscuro');
    if (v.t) s += X.rot(cx, 16, v.t);
    return X.foto(s, 228, 'noche');
  };
  // Dos hojas que caen: a (bola) y b (plana), de 0 (arriba) a 1 (piso).
  const hojas = (v, K) => {
    const y = f => 40 + f * 112, ya = y(v.a || 0), yb = y(v.b || 0);
    let s = `<circle cx="110" cy="${n(ya)}" r="13" fill="#f4f6f7" stroke="#9aa5ab"/><path d="M100 ${n(ya - 4)} l8 6 l6 -9 M104 ${n(ya + 7)} l9 -3 l5 6" stroke="#9aa5ab" fill="none"/>` +
      `<g transform="rotate(-8 230 ${n(yb)})"><rect x="200" y="${n(yb - 2)}" width="62" height="4" fill="#f4f6f7" stroke="#9aa5ab"/></g>`;
    if (v.aire) s += [210, 230, 250].map(x => X.flecha(x, yb + 30, x, yb + 10, '#7fd3ff')).join('') + X.rot(300, yb + 24, 'aire');
    if (v.r) s += X.rot(110, 190, 'hoja en bola') + X.rot(230, 190, 'hoja plana');
    if (v.t) s += X.rot(170, 20, v.t, 'oscuro');
    return X.foto(s, 200, 'lab');
  };

  xpAmplia('icf-cn-movimiento-3', {
    conecta: 'icf-cn-movimiento-2',
    desde: [
      ['Desde cero: qué es la gravedad',
        xpMira('dibujo', 'Si sueltas algo, cae. La fuerza que lo hala se llama **gravedad**, y funciona igual en cualquier lugar del planeta.', { dib: tierra, v: { k: 1 }, alto: 228 }, [
          ['En la lección de fuerzas viste que una fuerza cambia el movimiento y se mide en newtons.', {}],
          ['La gravedad es una fuerza de atracción: todo lo que tiene masa atrae a lo demás.', { k: 1, t: 'todo lo que tiene masa atrae' }],
          ['La Tierra tiene muchísima masa: por eso su jalón se nota tanto.', { k: 2 }],
          ['Todo cae hacia su centro: «abajo» es hacia el centro, también al otro lado.', { k: 3 }],
          ['Ese jalón de la Tierra sobre ti es tu peso.', { k: 4 }],
        ], 'La gravedad atrae todo hacia el centro de la Tierra; ese jalón es el peso.'),
        xpHaz('hoja', 'Subraya hacia dónde cae una piedra que se suelta en la Antártida.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Hacia el espacio, porque allá está «abajo» en el mapa.'], ['Hacia el centro de la Tierra, como en todas partes.'], ['Hacia el norte, donde hay más tierra.']], pista: 'El mapa no decide para dónde se cae. ¿Hacia dónde hala la Tierra?' }, 'En todo el planeta, abajo es hacia el centro de la Tierra.')],
    ],
    despues: [
      ['Más difícil: con aire, la forma importa',
        xpMira('dibujo', 'En el vacío todo cae igual. Pero aquí hay aire, y el aire **frena** según la forma. Mira dos hojas de papel idénticas.', { dib: hojas, v: { a: 0, b: 0 }, alto: 200 }, [
          ['Dos hojas iguales: una arrugada en bola y otra plana.', { r: 1 }],
          ['Tienen la misma masa, así que pesan lo mismo.', { r: 1, t: 'mismo peso' }],
          ['Se sueltan juntas: la bola llega primero.', { a: 1, b: 0.4 }],
          ['La hoja plana empuja más aire y el aire la frena más.', { a: 1, b: 0.45, aire: 1 }],
          ['No es el peso: es cuánta superficie choca con el aire.', { a: 1, b: 1 }],
          ['Por eso un paracaídas grande baja despacio.', { a: 1, b: 1, t: 'más superficie, más freno' }],
        ], 'Con aire, la forma cambia la caída: más superficie, más freno, aunque el peso sea igual.'),
        xpHaz('hoja', 'Un paracaidista abre el paracaídas y baja más despacio. Subraya por qué.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Pierde masa al abrirlo.'], ['El paracaídas empuja mucho aire y el aire lo frena.'], ['Allá arriba se acaba la gravedad.']], pista: 'Su masa y la gravedad siguen iguales. ¿Qué cambió al abrir la tela?' }, 'Más superficie empuja más aire: más freno.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se suelta una llave desde un balcón, sin contar el aire. ¿Qué tabla muestra su **velocidad** (m/s) cada segundo?', { letras: ['A', 'B', 'C', 'D'], paras: [['0, 10, 20, 30'], ['0, 10, 10, 10'], ['0, 5, 20, 45'], ['10, 20, 30, 40']] }, [
        ['Recuerda: parte quieta y gana unos 10 m/s cada segundo.', {}],
        ['Esta deja de ganar velocidad: la gravedad no se apaga.', { luz: [1], nota: { 1: 'no acelera' } }],
        ['Esos son los metros que baja, no su velocidad: otro eje.', { luz: [2], nota: { 2: 'es la distancia' } }],
        ['Esta tiene buen ritmo, pero no parte de cero: se soltó quieta.', { luz: [3], nota: { 3: 'mal comienzo' } }],
        ['Parte de 0 y suma 10 cada segundo: es la respuesta.', { luz: [0], nota: { 0: 'correcta' } }],
      ], 'Fíjate qué mide la tabla: velocidad suma 10 cada segundo; distancia crece cada vez más.'),
      xpHaz('hoja', 'En el vacío se sueltan juntas una bola de 2 kg y otra de 6 kg. ¿Qué afirmación es correcta?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['La de 6 kg cae tres veces más rápido.'], ['Caen igual, pero la de 6 kg pesa tres veces más.'], ['Caen igual porque pesan lo mismo.'], ['La de 2 kg llega primero por ser liviana.']], pista: 'Separa dos ideas: cómo caen y cuánto pesan. Una opción acierta en lo primero con una razón falsa.' }, 'Caen igual; el peso sí depende de la masa.')],
    cierre: 'Todo cae hacia el centro de la Tierra; sin aire caen igual, pero el peso depende de la masa.',
  });
}
;
//#archivo js/explora-icf-cn-4.js
// Preicfes · Ciencias Naturales, mundo 4 «Materia y Mezclas» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Doce partículas que se separan: s de 0 (sólido) a 1 (gas).
  const PX = [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [1, 1], [2, 1], [3, 1], [0, 2], [1, 2], [2, 2], [3, 2]], GX = [[78, 44], [150, 36], [224, 50], [262, 92], [84, 104], [140, 82], [196, 100], [250, 140], [74, 152], [124, 136], [178, 150], [222, 156]], LX = [[70, 160], [104, 158], [138, 161], [172, 158], [206, 160], [240, 159], [268, 150], [86, 136], [120, 132], [156, 135], [192, 133], [228, 136]];
  const part = (v, K) => K.r(56, 24, 228, 148, 'fn', 8) + PX.map(([i, j], k) => { const S = [119 + i * 34, 94 + j * 32], A = v.s <= 1 ? S : LX[k], B = v.s <= 1 ? LX[k] : GX[k], f = v.s <= 1 ? v.s : v.s - 1; return K.c(A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f, 10, 'fA'); }).join('') + K.t(170, 194, v.t || '', 'ta');
  // Temperatura contra tiempo; n: tramos que se ven.
  const CUR = [[40, 150], [70, 128], [130, 128], [190, 56], [290, 56]];
  const curva = (v, K) => K.l(40, 166, 320, 166, 'lm') + K.l(40, 166, 40, 24, 'lm') + K.t(32, 132, '0', 's tm', 'end') + K.t(32, 60, '100', 's tm', 'end') + K.t(44, 16, '°C', 's tm', 'start') + K.t(318, 184, 'tiempo', 's tm', 'end') + K.pl(CUR.slice(0, Math.round(v.n) + 1), 'la gr') + K.t(190, 36, v.t || '', 'ta');
  // Vaso con soluto: d disueltos (puntos) y q en el fondo.
  const vaso = (v, K) => K.r(100, 40, 140, 120, 'fn', 6) + Array.from({ length: Math.round(v.d) }, (_, i) => K.c(116 + (i * 37) % 112, 54 + (i * 23) % 80, 4, 'fA')).join('') + Array.from({ length: Math.round(v.q) }, (_, i) => K.r(108 + i * 12, 148, 9, 9, 'fF', 1)).join('') + K.t(170, 186, v.t || '', 'ta') + K.t(170, 24, v.p || '', 's tm');

  xpLec('icf-cn-materia-1', [
    ['Partículas',
      xpMira('dibujo', 'Empecemos por la idea: los estados se distinguen por **cómo se mueven** las partículas.', { dib: part, v: { s: 0, t: '' }, alto: 204 }, [
        ['En un sólido vibran en su sitio, muy juntas.', { t: 'sólido' }],
        ['Al calentar se sueltan y se deslizan.', { s: 1, t: 'líquido' }],
        ['Con más energía se separan del todo.', { s: 2, t: 'gas' }],
        ['Son las mismas doce: ni crecen ni desaparecen.', {}],
        ['Al enfriar, vuelven a juntarse.', { s: 1, t: 'líquido' }],
      ], 'Cambia el movimiento y la distancia; no las partículas.'),
      xpHaz('hoja', 'El vapor toca una tapa fría y salen gotas. Subraya lo que les pasa a sus partículas.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Encogen.'], ['Se vuelven otras.'], ['Se juntan y se deslizan.']], pista: 'Siguen siendo las mismas.' }, 'Al enfriar se juntan; siguen siendo agua.')],
    ['El tramo plano',
      xpMira('dibujo', 'Segunda idea: mientras **cambia de estado**, la temperatura no sube.', { dib: curva, v: { n: 0, t: '' }, alto: 192 }, [
        ['El hielo se calienta hasta llegar a 0 °C.', { n: 1, t: 'hielo' }],
        ['Se derrite: la línea queda plana.', { n: 2, t: 'hielo y agua: 0 °C' }],
        ['Ya todo es agua: sube otra vez.', { n: 3, t: 'agua' }],
        ['Hierve: otra vez plana, a nivel del mar a 100.', { n: 4, t: 'agua y vapor: 100 °C' }],
        ['Ahí la energía vence las fuerzas entre partículas, no calienta.', {}],
        ['En la montaña hierve antes: el aire presiona menos.', {}],
      ], 'Plano: cambio de estado. A menor presión, hierve a menos.'),
      xpHaz('hoja', 'En una mezcla de hielo y agua a 0 °C se enciende la llama. Subraya qué pasa primero.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Sube a 10 °C.'], ['Sigue a 0 °C mientras haya hielo.'], ['Hierve.']], pista: 'Todavía hay hielo por derretir.' }, 'La energía derrite el hielo antes de calentar.')],
    ['Densidad',
      xpMira('fichas', 'Tercera idea: la **densidad** dice cuánta masa hay en cada unidad de volumen.', { slots: fila('g por cm³', 'en agua'), fichas: ['0.5', 'flota', '4'], alto: 96 }, [
        ['Un corcho de 10 gramos ocupa 20 centímetros cúbicos.', {}],
        ['Se reparte la masa entre el volumen.', { pon: { 0: '0.5' } }, '$10 \\div 20 = 0.5$'],
        ['El agua tiene 1: el corcho es menos denso.', { pon: { 1: 'flota' } }],
        ['Pesar mucho no es hundirse: un tronco flota.', {}],
        ['Importa la masa comparada con el volumen.', {}],
      ], 'Densidad: masa entre volumen. Lo menos denso flota.'),
      xpHaz('fichas', 'Un bloque de 120 g ocupa 150 cm³. Pon su densidad y lo que hace en el agua.', { slots: fila('g por cm³', 'en agua'), fichas: ['0.8', 'flota', '1.25', 'se hunde', '30'], meta: ['0.8', 'flota'], alto: 96, pista: 'Masa entre volumen, y compara con 1.' }, '$120 \\div 150 = 0.8$, menos que 1: flota.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'En un páramo, unos fríjoles tardan más en ablandarse en olla abierta. Subraya por qué.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El agua hierve a menor temperatura.'], ['El agua no hierve.'], ['Los fríjoles son más densos.']], pista: 'Allá el aire presiona menos.' }, 'Hierve antes de llegar a 100: cocina más frío.')],
  ], 'Partículas, tramos planos, presión y densidad.');

  xpLec('icf-cn-materia-2', [
    ['Mezcla o compuesto',
      xpMira('hoja', 'Empecemos por la idea: en una **mezcla** cada sustancia sigue siendo ella.', { letras: ['A', 'B', 'C'], paras: [['Limonada: agua, limón y azúcar.'], ['Agua: hidrógeno y oxígeno unidos.'], ['Granola: avena, pasas y nueces.']] }, [
        ['En la limonada cada cosa conserva su sabor.', { luz: [0], nota: { 0: 'mezcla' } }],
        ['En el agua hay dos elementos unidos en algo nuevo.', { luz: [1], nota: { 1: 'compuesto' } }],
        ['En la granola hasta se ven las partes.', { luz: [2], nota: { 2: 'mezcla' } }],
        ['Si se ve pareja es homogénea; si no, heterogénea.', { luz: [0, 2] }],
        ['Un compuesto no se separa con un colador.', { luz: [1] }],
      ], 'Mezcla: juntas. Compuesto: unidas. Homogénea: pareja.'),
      xpHaz('hoja', 'Pon al margen qué es cada cosa.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['heterogénea', 'compuesto', 'homogénea'], meta: [2, 0, 1], paras: [['Agua con azúcar disuelta'], ['Agua con piedras'], ['Óxido de hierro']], pista: 'Alguna no va ahí: ¿pareja, con partes o unida en algo nuevo?' }, 'Pareja, con partes y unida.')],
    ['Busca la diferencia',
      xpMira('hoja', 'Segunda idea: para separar, busca **en qué se diferencian**.', { paras: [['Clavos y arena'], ['Arroz y agua'], ['Aceite y vinagre'], ['Agua y sal']] }, [
        ['Los clavos se pegan al imán.', { luz: [0], nota: { 0: 'imán' } }],
        ['El arroz no pasa por el colador.', { luz: [1], nota: { 1: 'filtrar' } }],
        ['El aceite flota: se saca por arriba.', { luz: [2], nota: { 2: 'decantar' } }],
        ['La sal no se evapora: queda al hervir.', { luz: [3], nota: { 3: 'evaporar' } }],
        ['Si quieres el agua, enfría el vapor: destilar.', { luz: [3] }],
      ], 'Imán, filtro, decantar, evaporar o destilar: según la diferencia.'),
      xpHaz('hoja', 'Pon al margen el método.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['destilar', 'imán', 'filtrar'], meta: [2, 0, 1], paras: [['Hojas de té en agua'], ['Alcohol y agua'], ['Virutas de hierro y aserrín']], pista: 'Alguna no va ahí: ¿granos, hervor distinto o hierro?' }, 'Las hojas se filtran, los líquidos se destilan y el hierro se atrae.')],
    ['El orden y la masa',
      xpMira('fichas', 'Tercera idea: **la masa se conserva** y el porcentaje es sobre todo.', { slots: fila('mezcla (g)', 'sal (%)'), fichas: ['250', '20'], alto: 96 }, [
        ['Se juntan 200 gramos de agua y 50 de sal.', {}],
        ['La mezcla pesa la suma de las dos.', { pon: { 0: '250' } }, '$200 + 50 = 250$'],
        ['Cincuenta de doscientos cincuenta son un quinto.', { pon: { 1: '20' } }, '$50 \\div 250 = 0.2$'],
        ['No se divide entre el agua: se divide entre todo.', { marca: [0] }],
        ['Al separarlas vuelven a salir 200 y 50.', { marca: [] }],
      ], 'Nada se pierde; el porcentaje va sobre el total.'),
      xpHaz('fichas', 'Se mezclan 90 g de agua y 30 g de azúcar. Pon la masa y el porcentaje de azúcar.', { slots: fila('mezcla (g)', 'azúcar (%)'), fichas: ['120', '25', '33', '60', '30'], meta: ['120', '25'], alto: 96, pista: 'El total incluye el azúcar.' }, '$30 \\div 120 = 0.25$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Hay que separar hierro, azúcar y agua y recuperar las tres. Subraya el orden que sirve.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Imán y luego filtro'], ['Imán y luego destilar'], ['Filtro y luego filtro']], pista: 'El azúcar disuelta pasa por el filtro.' }, 'El imán saca el hierro; destilar separa el agua del azúcar.')],
  ], 'Distingue, busca la diferencia y cuida la masa.');

  xpLec('icf-cn-materia-3', [
    ['Hasta cuánto cabe',
      xpMira('dibujo', 'Empecemos por la idea: la **solubilidad** es lo máximo que cabe disuelto.', { dib: vaso, v: { d: 0, q: 0, t: '', p: 'caben 24 a 20 °C' }, alto: 200 }, [
        ['Con 12 gramos, se disuelve todo.', { d: 12, t: 'insaturada' }],
        ['Con 24 gramos está justo en el límite.', { d: 24, t: 'saturada' }],
        ['Con 30 gramos, 6 se quedan en el fondo.', { q: 6, t: 'saturada y sobran 6' }, '$30 - 24 = 6$'],
        ['Disolver no es derretir: el agua lo rodea y lo reparte.', {}],
        ['Y la masa es la del agua más la del soluto.', {}],
      ], 'Menos del límite: insaturada. En el límite: saturada. Lo demás, al fondo.'),
      xpHaz('fichas', 'En 100 g de agua caben 35 g. Se echan 50 g. Pon lo disuelto y lo que queda en el fondo.', { slots: fila('disuelto', 'en el fondo'), fichas: ['35', '15', '50', '85', '0'], meta: ['35', '15'], alto: 96, pista: 'Se disuelve hasta el límite.' }, '$50 - 35 = 15$.')],
    ['Más rápido o más',
      xpMira('dibujo', 'Segunda idea: agitar **apura**; calentar, en muchos sólidos, hace que **quepa más**.', { dib: vaso, v: { d: 24, q: 6, t: '', p: '20 °C' }, alto: 200 }, [
        ['Hay 6 gramos en el fondo.', { t: 'sobran 6' }],
        ['Se agita: se disuelve más rápido, pero no más.', { t: 'agitar: siguen sobrando 6' }],
        ['Se calienta a 60 grados: ahora caben más.', { d: 30, q: 0, t: 'se disolvió todo', p: '60 °C' }],
        ['También cabría más con más agua.', {}],
        ['Con la sal de cocina, calentar casi no ayuda.', {}],
      ], 'Agitar y moler apuran. Calentar o agregar agua: cabe más.'),
      xpHaz('hoja', 'Pon al margen qué logra cada acción con un sólido como el azúcar.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['cabe más', 'más rápido'], meta: [1, 0], paras: [['Moler los granos'], ['Duplicar el agua']], pista: 'Mira si al final se disuelve más.' }, 'Moler apura; con más agua cabe más.')],
    ['Gases y semejantes',
      xpMira('hoja', 'Tercera idea: con los **gases** es al revés, y no todo disuelve a todo.', { paras: [['Oxígeno en agua fría: 11 mg por litro'], ['Oxígeno en agua tibia: 7.5 mg por litro'], ['Aceite en agua: no se disuelve'], ['Grasa en gasolina: se disuelve']] }, [
        ['En agua fría cabe más oxígeno.', { luz: [0] }],
        ['En agua tibia cabe menos: el gas se escapa.', { luz: [1], nota: { 1: 'menos gas' } }],
        ['El agua no disuelve el aceite.', { luz: [2], nota: { 2: 'distintos' } }],
        ['La gasolina sí disuelve la grasa.', { luz: [3], nota: { 3: 'semejantes' } }],
        ['Lo semejante disuelve a lo semejante.', { luz: [3] }],
      ], 'Más calor, menos gas. Lo semejante disuelve a lo semejante.'),
      xpHaz('hoja', 'Una fábrica vierte agua caliente, sin químicos, a un río y los peces sufren. Subraya por qué.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El agua caliente tiene más oxígeno.'], ['El agua caliente disuelve a los peces.'], ['En agua más caliente cabe menos oxígeno.']], pista: 'Con los gases es al revés.' }, 'Al calentarse, el río pierde oxígeno.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'En 100 g de agua caben 40 g a 20 °C y 70 g a 60 °C. Se disuelven 70 g a 60 °C y se enfría con un cristal. Pon lo disuelto y lo que se cristaliza.', { slots: fila('disuelto', 'cristales'), fichas: ['40', '30', '70', '110', '20'], meta: ['40', '30'], alto: 96, pista: 'A 20 °C solo caben los de esa temperatura.' }, '$70 - 40 = 30$ se cristalizan.')],
  ], 'Hasta cuánto, qué apura, qué aumenta y qué pasa con los gases.');
}
;
//#archivo js/explora-icf-cn-4-pasos.js
// Preicfes · Ciencias Naturales, mundo 4 «Materia y Mezclas», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB, n = x => Math.round(x * 100) / 100;
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));

  // Un vaso de agua quieta donde cae una gota de tinta que se riega sola (f de 0 a 1).
  const tinta = (v, K) => {
    const f = v.f || 0, cx = 170;
    let s = X.vaso(cx, 166, 96, 112, 0.72, 'agua', { marcas: false });
    if (f > 0 && f < 1) s += `<ellipse cx="${cx}" cy="${n(100 + 24 * f)}" rx="${n(10 + 30 * f)}" ry="${n(8 + 24 * f)}" fill="#3f63d0" opacity=".5" filter="url(#xlb-sombra)"/>` +
      `<ellipse cx="${cx}" cy="${n(98 + 18 * f)}" rx="${n(5 + 12 * f)}" ry="${n(4 + 10 * f)}" fill="#2949b8" opacity=".55" filter="url(#xlb-sombra)"/>`;
    if (f >= 1) s += `<rect x="126" y="91" width="88" height="71" rx="3" fill="#3f63d0" opacity=".38"/>`;
    if (v.g) s += X.gota(cx, f ? 40 : 66, 8, 'azul');
    if (v.lupa) s += X.lupa(276, 70, 24) + X.rot(290, 128, 'no se ven');
    if (v.t) s += X.rot(cx, 22, v.t, 'oscuro');
    return X.foto(s, 200, 'lab');
  };

  xpAmplia('icf-cn-materia-1', {
    conecta: 'icf-cn-celula-1',
    desde: [
      ['Desde cero: todo está hecho de partículas',
        xpMira('dibujo', 'Antes de hablar de sólidos, líquidos y gases: ¿de qué están hechas las cosas? De **partículas** que nunca se quedan quietas.', { dib: tinta, v: {}, alto: 200 }, [
          ['En la lección de transporte viste que una sustancia se riega sola de donde hay mucho a donde hay poco.', {}],
          ['Materia es todo lo que tiene masa y ocupa espacio: agua, aire, tu lápiz.', { t: 'materia: masa y espacio' }],
          ['Está hecha de partículas tan pequeñas que no se ven ni con lupa.', { lupa: 1 }],
          ['Cae una gota de tinta en el agua quieta.', { g: 1 }],
          ['Nadie revuelve, y aun así el color se riega: las partículas se mueven solas.', { g: 1, f: 0.5 }],
          ['Al rato todo queda parejo. Qué tan libres se mueven decide el estado.', { f: 1, t: 'sólido, líquido o gas' }],
        ], 'La materia está hecha de partículas que se mueven solas; su movimiento decide el estado.'),
        xpHaz('hoja', 'Materia es lo que tiene masa y ocupa espacio. Subraya lo que **no** es materia.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El aire dentro de una bomba'], ['La luz de una linterna'], ['El vapor que sale de la olla']], pista: 'El aire y el vapor no se ven bien, pero inflan cosas y ocupan espacio. ¿Cuál no tiene masa?' }, 'La luz es energía: no tiene masa ni llena una bomba.')],
    ],
    despues: [
      ['Más difícil: evaporar no es hervir',
        xpMira('hoja', 'Dos maneras de pasar de líquido a gas que el examen mezcla a propósito: **evaporar** y **hervir**.', { paras: [['La ropa se seca al sol a 20 °C.'], ['El agua de la olla hierve con burbujas por dentro.'], ['Evaporar: solo por la superficie y a cualquier temperatura.'], ['Hervir: en todo el líquido y a una temperatura fija.']] }, [
          ['La ropa se seca sin que el agua llegue a 100 °C.', { luz: [0], nota: { 0: 'evapora' } }],
          ['Las partículas más rápidas escapan por la superficie.', { luz: [2] }],
          ['En la olla salen burbujas de vapor desde el fondo.', { luz: [1], nota: { 1: 'hierve' } }],
          ['Eso solo pasa al llegar a su punto de ebullición.', { luz: [3] }],
          ['Las dos dan vapor; cambia dónde y cuándo ocurre.', { luz: [2, 3] }],
        ], 'Evaporar: por la superficie y a cualquier temperatura. Hervir: en todo el líquido, a una fija.'),
        xpHaz('hoja', 'Un charco desaparece en una tarde fresca. Subraya lo correcto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Hirvió con el sol.'], ['Se evaporó: algunas partículas escaparon por la superficie.'], ['Sus partículas desaparecieron.']], pista: 'La tarde estaba fresca, lejos de 100 °C, y las partículas no se destruyen.' }, 'Sin hervir, el agua se evapora poco a poco por arriba.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Mientras el agua hierve, un estudiante sube la llama y dice que el agua se calentará **más**. ¿Tiene razón?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque más llama siempre da más temperatura.'], ['No: la energía extra vuelve vapor más agua y sigue a la misma temperatura.'], ['No, porque la llama no le da energía al agua.'], ['Sí, porque las burbujas suben la temperatura.']] }, [
        ['Recuerda el tramo plano: mientras hierve, la temperatura no sube.', {}],
        ['Esta dice «siempre»: falla justo en el cambio de estado.', { luz: [0], nota: { 0: 'absoluto' } }],
        ['Buen «No», mala razón: la llama sí da energía.', { luz: [2], nota: { 2: 'razón falsa' } }],
        ['Esta suena científica, pero las burbujas son vapor, no calor extra.', { luz: [3], nota: { 3: 'suena bien' } }],
        ['La energía sirve para soltar partículas: hierve más rápido, no más caliente.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Mientras cambia de estado, más energía acelera el cambio, pero la temperatura se queda igual.'),
      xpHaz('hoja', 'Se calienta hielo a −10 °C en olla abierta, a nivel del mar, hasta que hierve un buen rato. ¿Qué serie de temperaturas (°C) es correcta?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['−10, 0, 0, 0, 50, 100, 100, 100'], ['−10, 10, 30, 50, 70, 90, 110, 130'], ['0, 0, 0, 50, 100, 100, 100, 100'], ['−10, 0, 0, 0, 50, 100, 120, 140']], pista: 'Revisa dónde empieza, si tiene los dos tramos planos y si se queda en 100 mientras hierve.' }, 'Empieza en −10, se detiene en 0 y en 100.')],
    cierre: 'Partículas que se mueven; el estado cambia con la energía, con tramos planos y evaporación sin hervir.',
  });

  // Tres vasos: agua pura, agua con arena y agua con sal (se ve igual que la pura).
  const tresVasos = (v, K) => {
    const k = v.k || 0;
    let s = X.vaso(66, 166, 66, 86, 0.66, 'agua') + X.rot(66, 188, 'agua pura');
    if (k >= 1) s += X.vaso(170, 166, 66, 86, 0.66, 'turbio', { solido: 0.6 }) + X.rot(170, 188, 'agua y arena');
    if (k >= 2) s += X.vaso(274, 166, 66, 86, 0.66, 'agua') + X.rot(274, 188, 'agua y sal');
    if (v.ojo) s += X.rot(274, 60, '¿pura?', 'oscuro');
    if (v.t) s += X.rot(170, 24, v.t, 'oscuro');
    return X.foto(s, 200, 'lab');
  };
  // Aparatos de separación: k = 1 filtración, 2 decantación, 3 destilación.
  const embudo = fx => `<path d="M${fx - 30} 50 L${fx + 30} 50 L${fx + 4} 92 V122 H${fx - 4} V92 Z" fill="url(#xlb-vidrio)" stroke="#5d7684" stroke-width="1.3"/>` +
    `<path d="M${fx - 25} 52 L${fx + 25} 52 L${fx} 88 Z" fill="#f6f3e8" opacity=".95"/><path d="M${fx - 18} 58 H${fx + 18} L${fx + 6} 76 H${fx - 6} Z" fill="url(#xlb-l-turbio)" opacity=".9"/>` +
    `<path d="M${fx - 9} 80 Q${fx} 72 ${fx + 9} 80 L${fx} 88 Z" fill="#a07a4a"/>`;
  const decanta = fx => `<clipPath id="xlb-dec"><path d="M${fx - 6} 36 C${fx - 42} 60 ${fx - 38} 100 ${fx - 4} 118 L${fx + 4} 118 C${fx + 38} 100 ${fx + 42} 60 ${fx + 6} 36 Z"/></clipPath>` +
    `<g clip-path="url(#xlb-dec)"><rect x="${fx - 45}" y="58" width="90" height="26" fill="url(#xlb-l-aceite)"/><rect x="${fx - 45}" y="84" width="90" height="40" fill="url(#xlb-l-agua)"/></g>` +
    `<path d="M${fx - 6} 36 C${fx - 42} 60 ${fx - 38} 100 ${fx - 4} 118 L${fx + 4} 118 C${fx + 38} 100 ${fx + 42} 60 ${fx + 6} 36 Z" fill="url(#xlb-vidrio)" stroke="#5d7684" stroke-width="1.3"/>` +
    `<rect x="${fx - 7}" y="26" width="14" height="11" rx="2" fill="#7b4f2a"/><rect x="${fx - 3}" y="118" width="6" height="22" fill="url(#xlb-vidrio)" stroke="#5d7684"/>` +
    `<rect x="${fx - 11}" y="124" width="22" height="6" rx="2" fill="#2f3539"/>`;
  const destila = () => {
    let s = `<rect x="40" y="103" width="62" height="4" fill="#59626a"/><path d="M46 107 L42 166 M96 107 L100 166" stroke="#59626a" stroke-width="2.5"/>` + X.mechero(71, 166, 0.8) +
      X.matraz(71, 103, 0.8, 0.45, 'agua', { burbujas: 4, tapon: 1 });
    s += `<path d="M71 26 V18 L250 96" stroke="#5d7684" stroke-width="4" fill="none" stroke-linejoin="round"/><path d="M71 26 V18 L250 96" stroke="#e8f4fb" stroke-width="2" fill="none" stroke-linejoin="round"/>` +
      `<path d="M126 38 L214 77" stroke="#7fd3ff" stroke-width="16" stroke-linecap="round" opacity=".45"/><path d="M126 38 L214 77" stroke="#5d7684" stroke-width="17" stroke-linecap="round" fill="none" opacity=".25"/>` +
      X.vaso(262, 166, 52, 62, 0.25, 'agua') + X.gota(251, 108, 4, 'agua');
    return s + X.rot(170, 40, 'tubo frío') + X.rot(262, 188, 'agua sin sal') + X.rot(71, 188, 'agua con sal');
  };
  const aparatos = (v, K) => {
    const k = v.k || 0;
    let s = '';
    if (k === 1) s += X.soporte(118, 166, 150, 104) + embudo(170) + X.vaso(170, 166, 56, 52, 0.4, 'agua') + X.gota(170, 128, 4, 'agua') + X.rot(250, 70, 'papel de filtro') + X.rot(250, 140, 'pasa el líquido');
    if (k === 2) s += X.soporte(118, 166, 150, 104) + decanta(170) + X.vaso(170, 166, 56, 20, 0.5, 'agua') + X.rot(260, 70, 'aceite arriba') + X.rot(260, 100, 'agua abajo') + X.rot(260, 130, 'llave');
    if (k === 3) s += destila();
    if (v.t) s += X.rot(170, 20, v.t, 'oscuro');
    return X.foto(s, 200, 'lab');
  };

  xpAmplia('icf-cn-materia-2', {
    conecta: 'icf-cn-materia-1',
    desde: [
      ['Desde cero: sustancia pura y mezcla',
        xpMira('dibujo', 'Casi nada de lo que usas es una sola sustancia. Empecemos por distinguir lo **puro** de lo **mezclado**.', { dib: tresVasos, v: { k: 0 }, alto: 200 }, [
          ['En la lección de estados viste que cada sustancia tiene sus partículas y sus propiedades.', {}],
          ['Sustancia pura: un solo tipo de partículas, como el agua destilada.', { t: 'un solo tipo de partícula' }],
          ['Mezcla: dos o más sustancias juntas sin unirse, como agua y arena.', { k: 1, t: 'mezcla: juntas, no unidas' }],
          ['Algunas mezclas se ven parejas y engañan, como agua con sal.', { k: 2, ojo: 1 }],
          ['Para separarlas se busca una propiedad en que se diferencien.', { k: 2, t: 'tamaño, densidad, hervor, imán…' }],
        ], 'Pura: un solo tipo de partícula. Mezcla: varias juntas, aunque a veces se vea pareja.'),
        xpHaz('hoja', 'Subraya la **sustancia pura**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Jugo de mora'], ['Agua de mar'], ['Azúcar refinada, sola en el frasco']], pista: 'Ese tiene varias sustancias juntas, aunque se vea parejo. ¿Cuál es de un solo tipo?' }, 'El azúcar refinada es casi solo sacarosa: una sustancia.')],
      ['Desde cero: los aparatos de separar',
        xpMira('dibujo', 'En el laboratorio cada método tiene su aparato. Conocerlos ayuda a leer los **montajes** que muestra el examen.', { dib: aparatos, v: { k: 1 }, alto: 200 }, [
          ['Filtración: el papel deja pasar el líquido y atrapa los granos.', { k: 1, t: 'filtración' }],
          ['Lo que pasa es el filtrado; lo atrapado, el residuo.', { k: 1, t: 'residuo arriba, filtrado abajo' }],
          ['Decantación: dos líquidos que no se mezclan forman capas.', { k: 2, t: 'decantación' }],
          ['Se abre la llave y sale primero el de abajo, el más denso.', { k: 2, t: 'sale primero el de abajo' }],
          ['Destilación: se hierve, el vapor pasa por un tubo frío y vuelve a ser líquido.', { k: 3 }],
          ['La sal no se evapora a esa temperatura: se queda en el matraz.', { k: 3 }],
        ], 'Filtrar atrapa sólidos; decantar separa capas; destilar recoge lo que hierve primero.'),
        xpHaz('hoja', 'Subraya el aparato que sirve para separar **agua y aceite**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Embudo con papel de filtro'], ['Embudo de decantación con llave'], ['Imán']], pista: 'Agua y aceite son dos líquidos que forman capas. ¿Qué aparato saca una capa sin la otra?' }, 'Se abre la llave, sale el agua y el aceite queda arriba.')],
    ],
    despues: [
      ['Más difícil: separar en varios pasos',
        xpMira('hoja', 'Cuando hay tres o cuatro sustancias, **el orden** de los pasos decide si se recupera cada una.', { paras: [['Mezcla: agua, aceite, arena y sal disuelta.'], ['1. Decantar: sale el aceite aparte.'], ['2. Filtrar: la arena queda en el papel.'], ['3. Evaporar: la sal queda en el fondo.']] }, [
          ['Cuatro sustancias, cuatro diferencias que aprovechar.', { luz: [0] }],
          ['El aceite no se mezcla con el agua: se decanta primero.', { luz: [1], nota: { 1: 'capas' } }],
          ['La arena no se disuelve: el filtro la atrapa.', { luz: [2], nota: { 2: 'granos' } }],
          ['La sal disuelta pasa el filtro: solo se recupera evaporando.', { luz: [3], nota: { 3: 'disuelta' } }],
          ['Si se evapora antes de filtrar, la sal queda revuelta con arena.', { luz: [2, 3] }],
        ], 'Saca primero lo que se separa fácil y deja para el final lo que está disuelto.'),
        xpHaz('hoja', 'Hay agua con arena y sal disuelta. Subraya el orden que recupera la **sal limpia**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Evaporar y luego filtrar.'], ['Filtrar y luego evaporar.'], ['Solo filtrar.']], pista: 'Si evaporas primero, ¿con qué queda revuelta la sal? ¿Y el filtro atrapa algo disuelto?' }, 'El filtro quita la arena; al evaporar queda la sal sola.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se filtra agua con arena y azúcar disuelta. El examen pregunta qué queda **en el papel** y qué pasa **al vaso**.', { letras: ['A', 'B', 'C', 'D'], paras: [['En el papel, arena y azúcar; al vaso, agua.'], ['En el papel, arena; al vaso, agua con azúcar.'], ['En el papel, azúcar; al vaso, agua con arena.'], ['En el papel, arena; al vaso, agua pura, porque el papel atrapa el azúcar.']] }, [
        ['Piensa en tamaños: los granos de arena no pasan; lo disuelto, sí.', {}],
        ['Esta cree que el papel atrapa lo disuelto.', { luz: [0], nota: { 0: 'disuelto no' } }],
        ['Esta lo voltea: la arena es la que no pasa.', { luz: [2], nota: { 2: 'al revés' } }],
        ['Esta acierta en el papel, pero su razón es falsa.', { luz: [3], nota: { 3: 'razón falsa' } }],
        ['Arena en el papel; agua dulce en el vaso: es la respuesta.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Un filtro detiene granos, nunca lo que está disuelto.'),
      xpHaz('hoja', 'Se quiere sacar **agua para beber** de agua de mar. ¿Qué método da agua sin sal?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Filtrar con papel.'], ['Dejar reposar y decantar.'], ['Destilar y recoger el vapor enfriado.'], ['Evaporar al sol y guardar lo que queda.']], pista: 'La sal está disuelta. ¿Qué método se queda con el agua y deja la sal atrás?' }, 'El vapor deja la sal en el recipiente y se enfría como agua dulce.')],
    cierre: 'Puro o mezcla; cada diferencia tiene su aparato; el orden importa y lo disuelto no se filtra.',
  });

  // Un vaso de agua sobre una balanza; se echa azúcar (s: montoncito al fondo, d: disuelta).
  const disuelve = (v, K) => {
    let s = X.balanza(110, 166, v.m || '170.0 g') + X.vaso(110, 136, 70, 80, 0.6, 'agua', { solido: v.s || 0 });
    if (v.d) s += Array.from({ length: 18 }, (_, i) => `<circle cx="${n(84 + (i * 23) % 52)}" cy="${n(92 + (i * 13) % 38)}" r="1.4" fill="#ffffff" opacity=".9"/>`).join('');
    if (v.cu) s += `<path d="M150 44 L118 104" stroke="url(#xlb-metal)" stroke-width="4" stroke-linecap="round"/><ellipse cx="116" cy="108" rx="7" ry="4" fill="url(#xlb-metal)"/>`;
    s += `<rect x="226" y="96" width="54" height="64" rx="4" fill="#f4f1ea" stroke="#bdb6a6"/><rect x="226" y="112" width="54" height="18" fill="#c0392b"/>` +
      `<text x="253" y="125" fill="#fff" font-size="10" font-weight="700" style="text-anchor:middle;font-family:Jost,system-ui,sans-serif">AZÚCAR</text>`;
    if (v.r1) s += X.rot(110, 20, v.r1, 'oscuro');
    if (v.r2) s += X.rot(253, 188, v.r2);
    return X.foto(s, 200, 'lab');
  };
  // Curva de solubilidad del nitrato de potasio (g en 100 g de agua).
  const SOL = [[20, 32], [40, 64], [60, 110]];
  const curvaSol = (v, K) => {
    const Xs = t => 56 + (t / 70) * 250, Y = g => 166 - g * 1.2;
    let h = K.l(56, 166, 318, 166, 'lm') + K.l(56, 166, 56, 22, 'lm') + [0, 40, 80, 120].map(g => K.l(56, Y(g), 314, Y(g), 'ls') + K.t(48, Y(g) + 4, g, 's tm', 'end')).join('') +
      [20, 40, 60].map(t => K.t(Xs(t), 182, `${t} °C`, 's tm')).join('') + K.t(60, 16, 'g en 100 g de agua', 's tm', 'start');
    h += K.pl(SOL.slice(0, v.n || 0).map(([t, g]) => [Xs(t), Y(g)]), 'la gr') + SOL.slice(0, v.n || 0).map(([t, g]) => K.c(Xs(t), Y(g), 5, 'fA') + K.t(Xs(t) - 14, Y(g) - 6, g, 's')).join('');
    if (v.baja) h += K.ar(Xs(40), Y(64), Xs(20) + 6, Y(64), 'lf gr') + K.l(Xs(20), Y(64), Xs(20), Y(32), 'lf d') + K.t(Xs(20) + 30, Y(48) + 4, '32 g salen', 's tf', 'start');
    if (v.t) h += K.t(210, 40, v.t, 'ta');
    return h;
  };

  xpAmplia('icf-cn-materia-3', {
    conecta: 'icf-cn-materia-2',
    desde: [
      ['Desde cero: qué es disolver',
        xpMira('dibujo', 'Echas azúcar al agua, revuelves y deja de verse. ¿Dónde quedó? Con tres palabras se explica: **soluto**, **solvente** y **solución**.', { dib: disuelve, v: {}, alto: 200 }, [
          ['En la lección de mezclas viste que el agua con sal es una mezcla que se ve pareja.', { r2: 'agua: 170 g' }],
          ['Se echan 14 gramos de azúcar al agua.', { s: 0.7, r2: 'azúcar: 14 g', m: '184.0 g' }],
          ['Lo que se disuelve, el azúcar, es el soluto; el agua es el solvente.', { s: 0.7, cu: 1, r1: 'soluto + solvente', m: '184.0 g' }],
          ['Al revolver, sus partículas se reparten entre las del agua.', { cu: 1, d: 1, r1: 'se reparte', m: '184.0 g' }],
          ['La mezcla pareja que resulta se llama solución.', { d: 1, r1: 'solución', m: '184.0 g' }],
          ['No desapareció: sabe dulce y la balanza marca la suma.', { d: 1, r1: '170 + 14 = 184 g', m: '184.0 g' }],
        ], 'Soluto en solvente da una solución; el soluto no desaparece y la masa se suma.'),
        xpHaz('hoja', 'Se prepara café instantáneo en agua caliente. Pon al margen el papel de cada uno.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['solvente', 'soluto'], meta: [1, 0], paras: [['El polvo de café'], ['El agua caliente']], pista: 'Alguno no va ahí: ¿cuál se disuelve y cuál disuelve?' }, 'El polvo se disuelve: soluto. El agua lo disuelve: solvente.')],
    ],
    despues: [
      ['Más difícil: leer la curva y enfriar',
        xpMira('dibujo', 'En el examen la solubilidad llega como **curva**: cuánto cabe en 100 g de agua a cada temperatura. Aquí, el nitrato de potasio.', { dib: curvaSol, v: { n: 0 }, alto: 196 }, [
          ['Cada punto es el máximo que cabe a esa temperatura.', { n: 1 }],
          ['A 20 °C caben unos 32 g; a 40 °C, 64; a 60 °C, 110.', { n: 3 }],
          ['Debajo de la curva, insaturada; justo en ella, saturada.', { n: 3, t: 'el punto es el límite' }],
          ['Se disuelven 64 g a 40 °C y se enfría hasta 20 °C.', { n: 3, baja: 1 }],
          ['Ahora solo caben 32: los otros salen como cristales.', { n: 3, baja: 1 }, '$64 - 32 = 32$'],
        ], 'Al enfriar una solución saturada, sale como cristales lo que ya no cabe a la nueva temperatura.'),
        xpHaz('fichas', 'Con la misma curva: a 60 °C se disuelven 100 g en 100 g de agua y se enfría a 40 °C. Pon lo que sigue disuelto y lo que se cristaliza.', { slots: fila('disuelto', 'cristales'), fichas: ['64', '36', '100', '46', '110'], meta: ['64', '36'], alto: 96, pista: 'A 40 °C solo caben los de la curva en ese punto; el resto sale.' }, 'Caben 64; salen $100 - 64 = 36$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una tabla muestra cuánta sal y cuánto azúcar caben en 100 g de agua a 20, 40 y 60 °C. ¿Qué pregunta se puede **responder** con ella?', { letras: ['A', 'B', 'C', 'D'], paras: [['¿Cuál se disuelve más rápido si se agita?'], ['¿Cómo cambia lo máximo que cabe de cada una con la temperatura?'], ['¿Cuál de las dos es más dulce?'], ['¿Cuánta sal cabe en aceite?']] }, [
        ['La tabla tiene tres cosas: sustancia, temperatura y máximo que cabe.', {}],
        ['La rapidez no se midió: nadie tomó tiempos.', { luz: [0], nota: { 0: 'no se midió' } }],
        ['El sabor no aparece en la tabla.', { luz: [2], nota: { 2: 'otra cosa' } }],
        ['Todo fue en agua: del aceite no hay datos.', { luz: [3], nota: { 3: 'otro solvente' } }],
        ['Máximo según la temperatura: eso sí está en la tabla.', { luz: [1], nota: { 1: 'se responde' } }],
      ], 'Una pregunta se responde con los datos solo si usa lo que se midió.'),
      xpHaz('hoja', 'Una gaseosa abierta en la nevera conserva más gas que otra al sol. Alguien dice que en frío el gas se queda más disuelto. ¿Tiene razón?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['Sí, porque en un líquido frío cabe más gas.'], ['Sí, porque el frío vuelve líquido el gas.'], ['No, porque el calor siempre disuelve más.'], ['No, porque el gas no se disuelve en agua.']], pista: 'Recuerda que con los gases pasa al revés que con muchos sólidos. Revisa también el «porque».' }, 'En frío cabe más gas; al calentarse, se escapa.')],
    cierre: 'Soluto en solvente; hasta un límite que cambia con la temperatura; al enfriar, cristaliza lo que sobra.',
  });
}
;
//#archivo js/explora-icf-cn-5.js
// Preicfes · Ciencias Naturales, mundo 5 «Ecosistemas y Energía» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Cadena de cuatro círculos con n flechas.
  const NOM = ['pasto', 'saltamontes', 'sapo', 'culebra'];
  const cadena = (v, K) => NOM.map((s, i) => K.c(50 + i * 80, 80, 24, ['fa', 'fg', 'ff', 'fF'][i]) + K.t(50 + i * 80, 126, s, 's') + (i < 3 ? K.f(v.n - i, K.ar(76 + i * 80, 80, 104 + i * 80, 80, 'lg gr')) : '')).join('') + K.t(170, 30, v.t || '', 'ta') + K.f(v.h, K.c(170, 170, 18, 'fn') + K.t(170, 202, 'hongos y bacterias', 's tm') + [0, 1, 2, 3].map(i => K.l(50 + i * 80, 132, 170 + (i - 1.5) * 12, 154, 'lm')).join(''));
  // Pirámide: niveles de ancho proporcional a la raíz para que se vean.
  const pir = (v, K) => [0, 1, 2, 3].map(i => K.f(v.n - i, K.r(170 - [150, 100, 60, 26][i], 140 - i * 34, 2 * [150, 100, 60, 26][i], 32, ['fa', 'fg', 'ff', 'fF'][i], 2) + K.t(170, 161 - i * 34, v.k[i], 's'))).join('') + K.t(170, 190, v.t || '', 'ta');
  // Dos curvas: presas y depredadores.
  const A = [30, 80, 120, 70, 30, 60, 115], B = [20, 25, 55, 80, 45, 20, 40];
  const olas = (v, K) => { const X = i => 46 + i * 44, Y = y => 150 - y; return K.l(46, 150, 318, 150, 'lm') + K.l(46, 150, 46, 20, 'lm') + K.pl(A.slice(0, Math.round(v.a) + 1).map((y, i) => [X(i), Y(y)]), 'la gr') + K.pl(B.slice(0, Math.round(v.b) + 1).map((y, i) => [X(i), Y(y)]), 'lf gr') + K.t(60, 14, 'presas', 's ta', 'start') + K.t(120, 14, 'depredadores', 's tf', 'start') + K.t(318, 168, 'años', 's tm', 'end') + K.t(182, 186, v.t || '', 's tm'); };

  xpLec('icf-cn-ecosistemas-1', [
    ['La cadena',
      xpMira('dibujo', 'Empecemos por la idea: la flecha va **hacia quien come**.', { dib: cadena, v: { n: 0, h: 0, t: '' }, alto: 214 }, [
        ['El pasto fabrica su alimento con luz: productor.', { t: 'productor' }],
        ['El saltamontes come pasto: consumidor primario.', { n: 1, t: 'primario' }],
        ['El sapo come saltamontes: secundario.', { n: 2, t: 'secundario' }],
        ['La culebra come sapos: terciaria.', { n: 3, t: 'terciaria' }],
        ['Los descomponedores reciben de todos.', { h: 1, t: '' }],
      ], 'Productor, primario, secundario, terciario; y descomponedores para todos.'),
      xpHaz('hoja', 'Maíz → gallina → zorro. Pon al margen el nivel.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['secundario', 'productor', 'primario'], meta: [2, 0, 1], paras: [['Gallina'], ['Zorro'], ['Maíz']], pista: 'Alguna no va ahí: empieza por quien usa la luz.' }, 'El maíz produce, la gallina es primaria y el zorro, secundario.')],
    ['La décima parte',
      xpMira('dibujo', 'Segunda idea: de un nivel al otro pasa **cerca de la décima parte** de la energía.', { dib: pir, v: { n: 1, k: ['20 000', '2 000', '200', '20'], t: '' }, alto: 200 }, [
        ['Las plantas guardan veinte mil.', { t: 'productores' }],
        ['A los primarios pasan dos mil.', { n: 2 }, '$20\\,000 \\div 10 = 2\\,000$'],
        ['A los secundarios, doscientos.', { n: 3 }, '$2\\,000 \\div 10 = 200$'],
        ['Y a los terciarios, solo veinte.', { n: 4 }, '$200 \\div 10 = 20$'],
        ['Lo demás se va como calor o no se come.', { t: 'por eso hay pocos arriba' }],
      ], 'Cada paso, cerca del 10 %: por eso arriba hay pocos.'),
      xpHaz('fichas', 'Los productores tienen 9 000. Pon lo que llega a primarios y a secundarios.', { slots: fila('primarios', 'secundarios'), fichas: ['900', '90', '4500', '9', '8100'], meta: ['900', '90'], alto: 96, pista: 'Saca la décima parte y otra vez la décima parte.' }, '$9\\,000 \\div 10 = 900$ y $900 \\div 10 = 90$.')],
    ['Mover un eslabón',
      xpMira('hoja', 'Tercera idea: si cambia un eslabón, **se mueve la red**.', { paras: [['pasto → saltamontes → sapo → culebra'], ['Se acaban los sapos.'], ['Suben los saltamontes.'], ['Baja el pasto y bajan las culebras.']] }, [
        ['Esta es la cadena de antes.', { luz: [0] }],
        ['Una enfermedad acaba con los sapos.', { luz: [1], nota: { 1: 'cambio' } }],
        ['Sin quien los coma, suben los saltamontes.', { luz: [2], nota: { 2: 'suben' } }],
        ['Comen más pasto: el pasto baja.', { luz: [3] }],
        ['Y la culebra pierde su comida: también baja.', { luz: [3], nota: { 3: 'bajan' } }],
      ], 'Mira quién lo comía y a quién se comía.'),
      xpHaz('hoja', 'Algas → camarón → pez. Se pesca casi todo el pez. Subraya lo que pasa primero con el **camarón**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Aumenta'], ['Disminuye'], ['Se vuelve productor']], pista: '¿Quién se lo comía?' }, 'Sin su depredador, aumenta.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'A un consumidor secundario le llegan 60 kcal. Si en cada paso pasa la décima parte, pon las del primario y las de los productores.', { slots: fila('primario', 'productores'), fichas: ['600', '6000', '6', '0.6', '120'], meta: ['600', '6000'], alto: 96, pista: 'Ahora vas hacia abajo: multiplica por diez.' }, '$60 \\cdot 10 = 600$ y $600 \\cdot 10 = 6\\,000$.')],
  ], 'La flecha, la décima parte y la red que se mueve.');

  xpLec('icf-cn-ecosistemas-2', [
    ['El carbono',
      xpMira('hoja', 'Empecemos por la idea: el **carbono** va del aire a los seres vivos y vuelve.', { paras: [['Aire: dióxido de carbono'], ['Planta: lo toma y hace azúcar'], ['Animal: come azúcar y respira'], ['Fuego: quema leña o gasolina']] }, [
        ['El carbono está en el aire como gas.', { luz: [0] }],
        ['La fotosíntesis lo toma y hace azúcar.', { luz: [1], nota: { 1: 'lo toma' } }],
        ['Al respirar, los seres vivos lo devuelven.', { luz: [2], nota: { 2: 'lo devuelve' } }],
        ['Quemar también lo devuelve, y muy rápido.', { luz: [3], nota: { 3: 'lo devuelve rápido' } }],
        ['Las plantas también respiran, de día y de noche.', { luz: [1] }],
      ], 'Fotosíntesis toma; respirar, descomponer y quemar devuelven.'),
      xpHaz('hoja', 'Subraya lo que **saca** dióxido de carbono del aire.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Una vaca que respira'], ['Un bosque que crece'], ['Un incendio']], pista: '¿Cuál guarda carbono en madera y hojas?' }, 'El bosque que crece lo guarda.')],
    ['El nitrógeno',
      xpMira('hoja', 'Segunda idea: el **nitrógeno** necesita bacterias para servirle a la planta.', { paras: [['Aire: mucho nitrógeno, pero así no sirve.'], ['Bacterias en la raíz del fríjol: lo convierten.'], ['Suelo: queda disuelto.'], ['Planta: lo toma por la raíz.']] }, [
        ['En el aire hay de sobra, pero la planta no puede usarlo.', { luz: [0], tacha: [0] }],
        ['Unas bacterias lo convierten.', { luz: [1], nota: { 1: 'lo convierten' } }],
        ['Así queda disuelto en el suelo.', { luz: [2] }],
        ['Y la planta lo toma por la raíz.', { luz: [3], nota: { 3: 'lo toma' } }],
        ['Por eso sembrar fríjol ayuda al suelo.', { luz: [1] }],
      ], 'Aire, bacterias, suelo y raíz.'),
      xpHaz('hoja', 'Pon al margen qué hace cada uno con el nitrógeno.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['lo convierte', 'lo toma ya convertido'], meta: [1, 0], paras: [['La raíz del maíz'], ['Las bacterias de la raíz del fríjol']], pista: '¿Quién hace el trabajo y quién lo aprovecha?' }, 'Las bacterias convierten; el maíz aprovecha.')],
    ['Demasiado',
      xpMira('fichas', 'Tercera idea: **demasiados** nutrientes en el agua quitan el oxígeno.', { slots: fila('1', '2', '3', '4').map(s => ({ ...s, w: 64 })), fichas: ['nitratos', 'algas', 'mueren', 'sin O₂'], alto: 96 }, [
        ['El abono que sobra llega al río.', { pon: { 0: 'nitratos' } }],
        ['Con tanto alimento, las algas se disparan.', { pon: { 1: 'algas' } }],
        ['Tapan la luz y muchas mueren.', { pon: { 2: 'mueren' } }],
        ['Las bacterias que las descomponen gastan el oxígeno.', { pon: { 3: 'sin O₂' } }],
        ['Los peces no mueren por el abono: les falta oxígeno.', { marca: [3] }],
      ], 'Nitratos, algas, descomposición y falta de oxígeno.'),
      xpHaz('hoja', 'Una laguna se puso verde y murieron los peces. Subraya la explicación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Las algas se comieron los peces.'], ['El agua se calentó por el color.'], ['Al descomponerse las algas, se gastó el oxígeno.']], pista: 'Sigue la cadena hasta el oxígeno.' }, 'La descomposición consume el oxígeno.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una pila de compost pasa de 50 a 30 kg. Pon los kilos que perdió y qué porcentaje de la masa es.', { slots: fila('kilos', 'porcentaje'), fichas: ['20', '40', '60', '30', '67'], meta: ['20', '40'], alto: 96, pista: 'Compara lo perdido con los 50 del comienzo.' }, '$20 \\div 50 = 0.4$: salió al aire, no se destruyó.')],
  ], 'La materia circula: sigue dónde está y quién la mueve.');

  xpLec('icf-cn-ecosistemas-3', [
    ['Quién gana y quién pierde',
      xpMira('hoja', 'Empecemos por la idea: pregunta qué le pasa **a cada uno**.', { paras: [['Pez payaso y anémona: se protegen.'], ['Ave que anida en un árbol.'], ['Pulga y gato.'], ['Dos plantas por la misma luz.']] }, [
        ['Ganan los dos: mutualismo.', { luz: [0], nota: { 0: 'mutualismo' } }],
        ['El ave gana y al árbol le da igual: comensalismo.', { luz: [1], nota: { 1: 'comensalismo' } }],
        ['La pulga gana y el gato pierde: parasitismo.', { luz: [2], nota: { 2: 'parasitismo' } }],
        ['Las dos gastan energía: competencia.', { luz: [3], nota: { 3: 'competencia' } }],
        ['Y si uno mata y come al otro: depredación.', {}],
      ], 'Gana-gana, gana-igual, gana-pierde y pierde-pierde.'),
      xpHaz('hoja', 'Pon al margen la relación.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['competencia', 'mutualismo', 'parasitismo'], meta: [2, 0, 1], paras: [['Un gusano vive en el intestino de un perro.'], ['Dos gallos se pelean por la comida.'], ['Las bacterias de la vaca le digieren el pasto y reciben alimento.']], pista: 'Alguna no va ahí: di qué le pasa a cada uno.' }, 'El perro pierde, los gallos gastan y la vaca y sus bacterias ganan.')],
    ['Suben y bajan',
      xpMira('dibujo', 'Segunda idea: los depredadores **siguen** a sus presas, con retraso.', { dib: olas, v: { a: 0, b: 0, t: '' }, alto: 196 }, [
        ['Primero suben las presas.', { a: 2, t: 'hay más comida' }],
        ['Después suben los depredadores.', { b: 3, t: 'crían más' }],
        ['Con tantos, las presas bajan.', { a: 4, t: 'las cazan más' }],
        ['Y sin comida, bajan los depredadores.', { b: 5, t: 'falta comida' }],
        ['Entonces las presas vuelven a subir.', { a: 6, b: 6, t: '' }],
      ], 'Primero las presas, después los depredadores.'),
      xpHaz('hoja', 'Un año hay muchísimos conejos. Subraya lo más probable para los zorros al año siguiente.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Aumentan'], ['Desaparecen'], ['Comen pasto']], pista: 'Los depredadores siguen a la comida.' }, 'Con más comida crían más.')],
    ['El límite',
      xpMira('fichas', 'Tercera idea: cada lugar sostiene **hasta cierto número**.', { slots: fila('por hectárea', 'hectáreas', 'caben'), fichas: ['3', '20', '60'], alto: 96 }, [
        ['Un bosque sostiene tres monos por hectárea.', { pon: { 0: '3' } }],
        ['Y tiene veinte hectáreas.', { pon: { 1: '20' } }],
        ['Su capacidad de carga son sesenta monos.', { pon: { 2: '60' } }, '$3 \\cdot 20 = 60$'],
        ['Si hay ochenta, se agota la comida y bajan.', {}],
        ['Una invasora crece desplazando a las demás.', {}],
      ], 'Capacidad de carga: cuántos sostiene el lugar.'),
      xpHaz('fichas', 'Una ladera sostiene 5 cabras por hectárea y tiene 8 hectáreas. Hay 52. Pon las que caben y las que sobran.', { slots: fila('caben', 'sobran'), fichas: ['40', '12', '13', '47', '92'], meta: ['40', '12'], alto: 96, pista: 'Multiplica y compara con las que hay.' }, '$5 \\cdot 8 = 40$ y $52 - 40 = 12$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Llega un pez que come lo mismo que el pez local y nadie se lo come. Subraya lo más probable.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El local aumenta.'], ['El local disminuye por la competencia.'], ['Los dos se vuelven productores.']], pista: 'Comen lo mismo y al nuevo nadie lo caza.' }, 'Compiten, y el nuevo tiene ventaja.')],
  ], 'Di quién gana, sigue los números y respeta el límite.');
}
;
//#archivo js/explora-icf-cn-5-pasos.js
// Preicfes · Ciencias Naturales, mundo 5 «Ecosistemas y Energía», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB, n = x => Math.round(x * 100) / 100;
  // Piezas propias: conejo, hongo, colibrí y nube.
  const conejo = (x, y, s = 1) => `<ellipse cx="${n(x)}" cy="${n(y + 3)}" rx="${n(20 * s)}" ry="3" fill="#000" opacity=".25"/>` +
    `<ellipse cx="${n(x)}" cy="${n(y - 10 * s)}" rx="${n(18 * s)}" ry="${n(12 * s)}" fill="#b7a58f" stroke="#7d6a52" stroke-width=".8"/><circle cx="${n(x - 17 * s)}" cy="${n(y - 8 * s)}" r="${n(4 * s)}" fill="#f4efe6"/>` +
    `<circle cx="${n(x + 17 * s)}" cy="${n(y - 20 * s)}" r="${n(8 * s)}" fill="#b7a58f" stroke="#7d6a52" stroke-width=".8"/><ellipse cx="${n(x + 14 * s)}" cy="${n(y - 34 * s)}" rx="${n(3 * s)}" ry="${n(9 * s)}" fill="#b7a58f" stroke="#7d6a52" stroke-width=".8"/>` +
    `<ellipse cx="${n(x + 21 * s)}" cy="${n(y - 33 * s)}" rx="${n(3 * s)}" ry="${n(9 * s)}" fill="#b7a58f" stroke="#7d6a52" stroke-width=".8"/><circle cx="${n(x + 20 * s)}" cy="${n(y - 21 * s)}" r="${n(1.3 * s)}" fill="#1d2328"/>`;
  const hongo = (x, y, s = 1) => `<rect x="${n(x - 4 * s)}" y="${n(y - 16 * s)}" width="${n(8 * s)}" height="${n(16 * s)}" rx="2" fill="#f1e7d2" stroke="#b9a988" stroke-width=".7"/>` +
    `<path d="M${n(x - 16 * s)} ${n(y - 14 * s)} Q${n(x)} ${n(y - 36 * s)} ${n(x + 16 * s)} ${n(y - 14 * s)} Z" fill="#c0392b" stroke="#7d1e15" stroke-width=".8"/>` +
    `<circle cx="${n(x - 6 * s)}" cy="${n(y - 22 * s)}" r="${n(2 * s)}" fill="#fff"/><circle cx="${n(x + 5 * s)}" cy="${n(y - 25 * s)}" r="${n(1.6 * s)}" fill="#fff"/>`;
  const colibri = (x, y, s = 1) => `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(9 * s)}" ry="${n(5 * s)}" fill="#2e9e6a" stroke="#1d5f40" stroke-width=".6"/><circle cx="${n(x + 8 * s)}" cy="${n(y - 3 * s)}" r="${n(4 * s)}" fill="#2e9e6a"/>` +
    `<path d="M${n(x + 11 * s)} ${n(y - 3 * s)} L${n(x + 22 * s)} ${n(y - 1 * s)}" stroke="#1d2328" stroke-width="1.2"/><path d="M${n(x - 2 * s)} ${n(y - 3 * s)} L${n(x - 8 * s)} ${n(y - 15 * s)} L${n(x + 4 * s)} ${n(y - 4 * s)} Z" fill="#7fd3a8" opacity=".85"/>` +
    `<path d="M${n(x - 8 * s)} ${n(y)} L${n(x - 16 * s)} ${n(y + 4 * s)}" stroke="#1d5f40" stroke-width="2"/><circle cx="${n(x + 9 * s)}" cy="${n(y - 4 * s)}" r=".9" fill="#1d2328"/>`;
  const nube = (x, y, s = 1, gris = 0) => [[0, 0, 18], [-18, 6, 13], [18, 6, 14], [-6, 10, 14], [8, -8, 13]].map(([a, b, r]) => `<circle cx="${n(x + a * s)}" cy="${n(y + b * s)}" r="${n(r * s)}" fill="${gris ? '#b9c3cb' : '#ffffff'}"/>`).join('');

  // Campo: el Sol, una planta (productor), un conejo (consumidor) y un hongo (descomponedor).
  const campo = (v, K) => {
    const k = v.k || 0;
    let s = X.sol(44, 36, 18) + X.planta(110, 166, 46, 1, { hojas: 7 });
    if (k >= 1) s += X.flecha(70, 52, 100, 86, '#ffe25a') + X.rot(110, 188, 'productor');
    if (k >= 2) s += conejo(206, 162, 1.1) + X.rot(206, 188, 'consumidor');
    if (k >= 3) s += `<rect x="262" y="154" width="54" height="10" rx="4" fill="#6b4423"/>` + hongo(276, 156, 0.9) + hongo(298, 156, 0.7) + X.rot(288, 188, 'descomponedor');
    if (v.t) s += X.rot(200, 24, v.t, 'oscuro');
    return X.foto(s, 200, 'campo', 166);
  };

  xpAmplia('icf-cn-ecosistemas-1', {
    conecta: 'icf-cn-celula-2',
    desde: [
      ['Desde cero: quién fabrica la comida',
        xpMira('dibujo', 'Todo ser vivo necesita energía para vivir. La pregunta de esta lección es **de dónde sale** y cómo pasa de uno a otro.', { dib: campo, v: { k: 0 }, alto: 200 }, [
          ['En la lección de sistemas viste que el alimento se rompe y la sangre lo lleva a las células.', {}],
          ['Esa energía casi siempre empieza en el Sol.', { t: 'la energía empieza en el Sol' }],
          ['Las plantas usan la luz para fabricar azúcar: son los productores.', { k: 1 }],
          ['Quien no fabrica su comida se come a otro: son los consumidores.', { k: 2 }],
          ['Hongos y bacterias deshacen lo muerto: son los descomponedores.', { k: 3 }],
          ['Ecosistema: un lugar con sus seres vivos, su suelo, su agua y su aire.', { k: 3, t: 'ecosistema' }],
        ], 'Productores fabrican con luz, consumidores comen a otros y descomponedores reciclan lo muerto.'),
        xpHaz('hoja', 'Subraya el **productor**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un hongo en un tronco podrido'], ['Un helecho al sol'], ['Una mariposa']], pista: 'Ese se alimenta de otros seres o de lo muerto. ¿Cuál fabrica su comida con luz?' }, 'El helecho hace fotosíntesis: fabrica su alimento.')],
    ],
    despues: [
      ['Más difícil: comer en dos niveles',
        xpMira('hoja', 'Las cadenas reales se cruzan y forman **redes**. Un mismo animal puede ocupar dos niveles distintos.', { paras: [['Papa → persona'], ['Pasto → vaca → persona'], ['Al comer papa, la persona es consumidor primario.'], ['Al comer carne de res, es secundario.']] }, [
          ['Dos cadenas que terminan en la misma persona.', { luz: [0, 1] }],
          ['Al comer la planta, está en el primer nivel de consumidores.', { luz: [2], nota: { 2: 'primario' } }],
          ['Al comer al que comió la planta, sube un nivel.', { luz: [3], nota: { 3: 'secundario' } }],
          ['Y como pasa la décima parte por nivel, comer más abajo rinde más.', { luz: [0] }],
          ['Por eso el mismo terreno alimenta más personas con papa que con carne.', { luz: [0, 1] }],
        ], 'En una red, un animal cambia de nivel según lo que coma; más abajo, más energía disponible.'),
        xpHaz('hoja', 'Con el mismo terreno sembrado, subraya lo que alimenta a **más** personas.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Sembrar maíz y comerlo.'], ['Sembrar maíz, dárselo a cerdos y comer los cerdos.'], ['Da lo mismo.']], pista: 'Cada paso de un nivel al otro pierde cerca de nueve décimas partes. ¿Cuál tiene menos pasos?' }, 'Un paso menos: no se pierde la energía que gastaría el cerdo.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En un potrero: pasto → grillo → rana → garza. Una fumigación mata casi todos los grillos. ¿Qué pasa **primero**?', { letras: ['A', 'B', 'C', 'D'], paras: [['Aumentan las ranas, porque tienen menos competencia.'], ['Disminuyen las ranas, porque pierden su alimento.'], ['Disminuye el pasto, porque lo comen más.'], ['Aumentan las garzas, porque hay más ranas.']] }, [
        ['Mira quién comía grillos y a quién se comían los grillos.', {}],
        ['Esta invierte el efecto: sin alimento, las ranas no suben.', { luz: [0], nota: { 0: 'al revés' } }],
        ['Esta también va al revés: sin grillos, el pasto descansa.', { luz: [2], nota: { 2: 'al revés' } }],
        ['Esta salta dos eslabones y además se equivoca de sentido.', { luz: [3], nota: { 3: 'lejana y falsa' } }],
        ['El efecto directo: las ranas pierden su comida.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Busca el efecto directo: primero cambia quien se comía al afectado y quien era su comida.'),
      xpHaz('hoja', 'En un lago, el fitoplancton guarda 50 000 kcal. Si en cada nivel pasa cerca del 10 %, ¿cuánto llega a los **consumidores secundarios**?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['5 000 kcal'], ['500 kcal'], ['50 kcal'], ['45 000 kcal']], pista: 'Cuenta los pasos: productores a primarios es uno; a secundarios, otro. Divide entre 10 en cada uno.' }, '$50\\,000 \\div 10 \\div 10 = 500$.')],
    cierre: 'La energía entra con el Sol, pasa por niveles perdiendo cerca del 90 % y los cambios recorren la red.',
  });

  // Ciclo del agua: mar, Sol, nube y lluvia (k: 1 evapora, 2 nube, 3 llueve, 4 vuelve por el río).
  const ciclo = (v, K) => {
    const k = v.k || 0;
    let s = X.sol(40, 34, 16) + `<path d="M0 150 Q60 140 120 152 V166 H0Z" fill="url(#xlb-l-agua)"/>` + `<path d="M190 166 L260 92 L330 166Z" fill="#8a9a7a"/><path d="M247 106 L260 92 L274 108 L266 104 L260 110 L252 104Z" fill="#ffffff"/>`;
    if (k >= 1) s += [36, 66, 96].map(x => X.flecha(x, 144, x, 104, '#e8f4fb')).join('') + X.rot(66, 92, 'evaporación');
    if (k >= 2) s += nube(250, 42, 1, k >= 3) + X.rot(176, 34, 'condensación');
    if (k >= 3) s += [232, 248, 264, 280].map((x, i) => X.gota(x, 74 + (i % 2) * 10, 4, 'agua')).join('') + X.rot(300, 110, 'lluvia');
    if (k >= 4) s += `<path d="M262 120 C240 140 200 136 170 150 S120 156 110 156" stroke="#4f97c9" stroke-width="5" fill="none" stroke-linecap="round"/>` + X.rot(170, 186, 'el río vuelve al mar');
    if (v.t) s += X.rot(170, 186, v.t, 'oscuro');
    return X.foto(s, 200, 'campo', 166);
  };
  // Tres tubos con indicador: con planta a la luz, con planta a oscuras y sin planta.
  const ramita = x => `<path d="M${x} 154 V92" stroke="#2f7d2a" stroke-width="2"/>` + [100, 114, 128, 142].map((y, i) => `<path d="M${x} ${y} q${i % 2 ? 9 : -9} -5 ${i % 2 ? 12 : -12} 2 q${i % 2 ? -5 : 5} 3 ${i % 2 ? -12 : 12} -2Z" fill="url(#xlb-hoja)"/>`).join('');
  const tubos = (v, K) => {
    let s = `<circle cx="110" cy="100" r="60" fill="url(#xlb-luz)"/><circle cx="270" cy="100" r="60" fill="url(#xlb-luz)"/>`;
    [[110, v.c1 || 'verde', 1], [190, v.c2 || 'verde', 1], [270, v.c3 || 'verde', 0]].forEach(([x, c, p]) => { s += X.tubo(x, 160, 104, 0.82, c, { r: 13 }) + (p ? ramita(x) : ''); });
    s += `<rect x="173" y="50" width="34" height="114" rx="6" fill="url(#xlb-metal)" opacity="${v.ver ? 0.25 : 0.95}"/>`;
    s += X.rot(110, 188, 'planta, luz') + X.rot(190, 188, 'planta, oscuras') + X.rot(274, 188, 'sin planta');
    if (v.t) s += X.rot(190, 22, v.t, 'oscuro');
    return X.foto(s, 200, 'lab');
  };

  xpAmplia('icf-cn-ecosistemas-2', {
    conecta: 'icf-cn-ecosistemas-1',
    desde: [
      ['Desde cero: la materia da vueltas',
        xpMira('dibujo', 'La energía entra y se va como calor. La **materia** no: los mismos átomos dan vueltas. El ciclo más fácil de ver es el del agua.', { dib: ciclo, v: { k: 0 }, alto: 200 }, [
          ['En la lección de cadenas viste que la energía se pierde en cada paso y no vuelve.', {}],
          ['La materia es distinta: no se gasta, cambia de lugar y de forma.', { t: 'la materia da vueltas' }],
          ['El Sol calienta el mar y el agua se evapora.', { k: 1 }],
          ['Arriba se enfría y forma nubes: se condensa.', { k: 2 }],
          ['Las gotas crecen y caen como lluvia.', { k: 3 }],
          ['Los ríos la devuelven al mar, y el ciclo empieza otra vez.', { k: 4 }],
        ], 'La energía fluye y se va; la materia circula: el agua se evapora, se condensa, llueve y vuelve.'),
        xpHaz('hoja', 'Pon al margen qué le pasa al agua en cada caso.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['se condensa', 'se evapora', 'se precipita'], meta: [1, 0, 2], paras: [['El charco que se seca al sol'], ['Las gotitas que se forman en la nube'], ['El aguacero sobre la montaña']], pista: 'Alguno no va ahí: ¿pasa a vapor, vuelve a gotas o cae?' }, 'Seca: evapora. Nube: condensa. Aguacero: precipita.')],
    ],
    despues: [
      ['Más difícil: la planta hace las dos cosas',
        xpMira('dibujo', 'Un montaje típico: tubos con agua y un **indicador** verde que se pone amarillo con mucho CO₂ y azul con poco.', { dib: tubos, v: {}, alto: 200 }, [
          ['Tres tubos con el mismo indicador verde.', { t: 'verde al comienzo' }],
          ['Con planta y luz se pone azul: la planta tomó CO₂.', { c1: 'azul' }],
          ['Con planta a oscuras se pone amarillo: solo respiró.', { c1: 'azul', c2: 'aceite', ver: 1 }],
          ['Sin planta sigue verde: es el control.', { c1: 'azul', c2: 'aceite', ver: 1, t: 'el control no cambia' }],
          ['La planta siempre respira; con luz, la fotosíntesis gana.', { c1: 'azul', c2: 'aceite', ver: 1 }],
        ], 'La planta respira siempre; a la luz toma más CO₂ del que suelta. El tubo sin planta es el control.'),
        xpHaz('hoja', 'Un caracol solo, en un tubo con indicador verde, pasa una hora a la luz. Subraya qué color esperas.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Azul, porque la luz le hace tomar CO₂.'], ['Amarillo, porque respira y suelta CO₂.'], ['Verde, porque con luz no respira.']], pista: 'El caracol no hace fotosíntesis, con luz o sin ella. ¿Qué hace todo el tiempo?' }, 'Solo respira: suelta CO₂ y el indicador se pone amarillo.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se quiere saber si la **luz** hace que una planta acuática tome CO₂. El examen pregunta qué par de tubos sirve.', { letras: ['A', 'B', 'C', 'D'], paras: [['Planta a la luz y caracol a oscuras.'], ['Planta a la luz y planta igual a oscuras.'], ['Una planta a la luz, sola.'], ['Planta a la luz y tubo sin planta a oscuras.']] }, [
        ['La pregunta es sobre la luz: solo la luz debe cambiar.', {}],
        ['Esta cambia la luz y el ser vivo: dos cosas.', { luz: [0], nota: { 0: 'dos cambios' } }],
        ['Esta no tiene con qué comparar.', { luz: [2], nota: { 2: 'sin comparar' } }],
        ['Esta cambia la luz y quita la planta: otra vez dos.', { luz: [3], nota: { 3: 'dos cambios' } }],
        ['Misma planta, misma agua; solo cambia la luz.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'En los montajes, el par correcto cambia solo la variable de la pregunta.'),
      xpHaz('hoja', 'Un agricultor siembra arveja un año y maíz al siguiente en el mismo lote, sin abono, y el maíz crece bien. ¿Qué lo explica?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['Las bacterias de la raíz de la arveja dejaron nitrógeno que el maíz puede usar.'], ['La arveja sacó el nitrógeno del suelo y lo devolvió al aire.'], ['El maíz toma el nitrógeno directo del aire.'], ['La arveja dejó azúcar en el suelo.']], pista: 'Recuerda quién convierte el nitrógeno del aire y dónde viven esas bacterias.' }, 'La arveja, con sus bacterias, deja nitrógeno en una forma útil.')],
    cierre: 'La materia circula: agua, carbono y nitrógeno van y vuelven, y cada montaje cambia una sola cosa.',
  });

  // Un colibrí, una población de colibríes y la comunidad entera.
  const vecinos = (v, K) => {
    const k = v.k || 0;
    let s = '';
    if (k >= 3) s += X.arbol(60, 166, 1.3) + X.planta(250, 166, 30, 1, { flor: 1, hojas: 4 }) + conejo(160, 164, 0.9) + hongo(310, 166, 0.8);
    const B = k >= 2 ? [[150, 60], [190, 44], [230, 70], [120, 92], [270, 40]] : k >= 1 ? [[190, 60]] : [];
    B.forEach(([x, y]) => { s += colibri(x, y, 1.1); });
    if (v.t) s += X.rot(170, 188, v.t, 'oscuro');
    return X.foto(s, 200, 'campo', 166);
  };

  xpAmplia('icf-cn-ecosistemas-3', {
    conecta: 'icf-cn-ecosistemas-1',
    desde: [
      ['Desde cero: especie, población y comunidad',
        xpMira('dibujo', 'Para hablar de cómo se relacionan los seres vivos hacen falta tres palabras que el examen usa sin explicar.', { dib: vecinos, v: { k: 0 }, alto: 200 }, [
          ['En la lección de cadenas viste que en un ecosistema unos se comen a otros.', {}],
          ['Especie: seres parecidos que pueden tener crías fértiles entre sí.', { k: 1, t: 'especie: un tipo de colibrí' }],
          ['Todos los de una especie que viven en un lugar forman una población.', { k: 2, t: 'población: los colibríes de aquí' }],
          ['Todas las poblaciones del lugar juntas forman la comunidad.', { k: 3, t: 'comunidad: todos los que viven aquí' }],
          ['Y comerse no es la única relación: también se ayudan o se estorban.', { k: 3 }],
        ], 'Especie: un tipo de ser. Población: los de una especie en un lugar. Comunidad: todas las poblaciones.'),
        xpHaz('hoja', 'Pon al margen qué es cada grupo.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['comunidad', 'población', 'especie'], meta: [1, 0, 2], paras: [['Todas las vacas de una finca'], ['Las vacas, el pasto, las garzas y los hongos de la finca'], ['Las vacas en general, que pueden tener crías entre sí']], pista: 'Alguno no va ahí: ¿una especie en un lugar, muchas especies juntas o el tipo de ser?' }, 'Vacas de la finca: población. Todos juntos: comunidad. El tipo: especie.')],
    ],
    despues: [
      ['Más difícil: cuando una relación sostiene a otra',
        xpMira('hoja', 'Las relaciones se encadenan. El caso que más sale: los **polinizadores** y las cosechas.', { paras: [['La abeja toma néctar de la flor del aguacate.'], ['Al pasar de flor en flor, lleva el polen.'], ['Sin ese polen, la flor no forma fruto.'], ['Si un veneno mata las abejas, baja la cosecha.']] }, [
          ['La abeja gana comida: el néctar.', { luz: [0], nota: { 0: 'gana la abeja' } }],
          ['La planta gana quien le lleve el polen.', { luz: [1], nota: { 1: 'gana la planta' } }],
          ['Ganan las dos: es mutualismo.', { luz: [0, 1] }],
          ['Y del fruto dependen otros: animales y agricultores.', { luz: [2] }],
          ['Matar un polinizador toca a toda la red, no solo a la abeja.', { luz: [3], nota: { 3: 'efecto en cadena' } }],
        ], 'Un mutualismo puede sostener a muchos: si cae el polinizador, caen los frutos y quienes los usan.'),
        xpHaz('hoja', 'Un murciélago come néctar de una flor que solo él poliniza. Desaparecen los murciélagos. Subraya lo más probable.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La planta forma más frutos.'], ['La planta deja de formar frutos y su población baja.'], ['A la planta no le pasa nada.']], pista: 'Si nadie más lleva su polen, ¿cómo forma frutos y semillas?' }, 'Sin polinizador no hay frutos ni semillas nuevas.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Dos escarabajos que comen semillas: cada uno solo llega a 300 individuos. Juntos, uno llega a 250 y el otro a 40. ¿Qué relación es más probable?', { letras: ['A', 'B', 'C', 'D'], paras: [['Mutualismo, porque viven juntos.'], ['Competencia, porque juntos los dos quedan con menos.'], ['Depredación, porque uno se comió al otro.'], ['Comensalismo, porque a uno no le pasa nada.']] }, [
        ['Compara cada uno solo y acompañado: los dos bajan.', {}],
        ['Vivir juntos no es ayudarse: aquí los dos pierden.', { luz: [0], nota: { 0: 'no se ayudan' } }],
        ['Nada dice que se coman: los dos comen semillas.', { luz: [2], nota: { 2: 'sin evidencia' } }],
        ['A los dos les pasa algo: de 300 a 250 y a 40.', { luz: [3], nota: { 3: 'falso' } }],
        ['Los dos pierden porque usan lo mismo: competencia.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Compara cada especie sola y acompañada: si las dos bajan, compiten.'),
      xpHaz('hoja', 'Una orquídea crece sobre un árbol sin quitarle agua ni comida; solo usa la altura para recibir luz. ¿Qué relación es?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Parasitismo, porque vive encima de otro.'], ['Comensalismo: ella gana y al árbol le da igual.'], ['Mutualismo, porque los dos ganan.'], ['Competencia, porque los dos pierden.']], pista: 'Pregunta qué gana o pierde cada uno. ¿Al árbol le quitan algo?' }, 'La orquídea gana luz y el árbol no gana ni pierde.')],
    cierre: 'Especie, población y comunidad; pregunta qué gana o pierde cada uno y sigue el efecto por la red.',
  });
}
;
//#archivo js/explora-icf-cn-6.js
// Preicfes · Ciencias Naturales, mundo 6 «Energía y Calor» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Rampa: h de 1 (arriba) a 0 (abajo); barras de potencial, cinética y calor (c).
  const rampa = (v, K) => { const x = 40 + (1 - v.h) * 120, y = 60 + (1 - v.h) * 84; const P = v.h * 100, Q = v.c * 100, C = Math.max(0, 100 - P - Q); return K.l(30, 60, 160, 150, 'lm') + K.l(160, 150, 200, 150, 'lm') + K.c(x + 4, y - 10, 9, 'fA') + [[P, 'pot', 'fa'], [C, 'cin', 'fg'], [Q, 'calor', 'ff']].map(([n, t, c], i) => K.r(222 + i * 34, 150 - n, 24, n, c, 2) + K.t(234 + i * 34, 168, t, 's tm')).join('') + K.t(120, 26, v.t || '', 'ta'); };
  // Dos bloques: temperaturas a y b, flecha de calor.
  const par = (v, K) => K.r(60, 60, 90, 70, v.a > v.b + 1 ? 'ff' : 'fg', 6) + K.r(190, 60, 90, 70, v.b > v.a + 1 ? 'ff' : 'fa', 6) + K.t(105, 100, `${Math.round(v.a)}°`, 'b') + K.t(235, 100, `${Math.round(v.b)}°`, 'b') + (v.a > v.b + 1 ? K.ar(153, 95, 187, 95, 'lf gr') : '') + K.t(170, 166, v.t || '', 'ta');
  const barras = (v, K) => [['agua', v.x, 'fa'], ['arena', v.y, 'fg']].map(([s, n, c], i) => K.r(90, 40 + i * 60, n * 2, 34, c, 3) + K.t(82, 62 + i * 60, s, 's tm', 'end') + K.t(98 + n * 2, 62 + i * 60, `${Math.round(n)}°`, 's', 'start')).join('') + K.t(170, 176, v.t || '', 'ta');

  xpLec('icf-cn-energia-1', [
    ['Dos formas',
      xpMira('dibujo', 'Empecemos por la idea: en alto hay energía **potencial**; en movimiento, **cinética**.', { dib: rampa, v: { h: 1, c: 0, t: '' }, alto: 180 }, [
        ['Arriba y quieta: toda es potencial.', { t: 'potencial 100' }],
        ['Al bajar, una parte se vuelve cinética.', { h: 0.5, t: '50 y 50' }],
        ['Abajo va más rápido: toda es cinética.', { h: 0, t: 'cinética 100' }],
        ['La suma no cambió en ningún momento.', {}],
        ['A esa suma se le llama energía mecánica.', { h: 0.7, t: '70 y 30' }],
      ], 'Sin roce, potencial más cinética siempre da lo mismo.'),
      xpHaz('fichas', 'Una bola tiene 60 J arriba, quieta. Sin roce, a cierta altura le quedan 45 de potencial. Pon la cinética ahí y la que tendrá abajo.', { slots: fila('ahí', 'abajo'), fichas: ['15', '60', '45', '105', '30'], meta: ['15', '60'], alto: 96, pista: 'Las dos deben sumar 60.' }, '$60 - 45 = 15$; abajo, toda: 60.')],
    ['Con roce',
      xpMira('dibujo', 'Segunda idea: con **roce**, una parte pasa a calor; nada desaparece.', { dib: rampa, v: { h: 1, c: 0, t: '' }, alto: 180 }, [
        ['Arranca con cien, toda potencial.', {}],
        ['El roce calienta un poco la pista.', { h: 0.5, c: 0.1, t: '50 + 40 + 10' }],
        ['Abajo le queda menos cinética.', { h: 0, c: 0.2, t: '80 + 20' }, '$100 - 20 = 80$'],
        ['Si sube, no llega a la misma altura.', {}],
        ['La total sigue siendo cien: parte es calor.', { t: 'total 100' }],
      ], 'La energía total se conserva; la mecánica, solo sin roce.'),
      xpHaz('hoja', 'Un columpio se va frenando solo. Subraya adónde va su energía.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Desaparece.'], ['Pasa al aire y a las cadenas como calor.'], ['Se vuelve altura.']], pista: 'Nada se pierde: se transforma.' }, 'El roce la convierte en calor.')],
    ['El cuadrado',
      xpMira('fichas', 'Tercera idea: la cinética va con el **cuadrado** de la velocidad.', { slots: fila('v: 1', 'v: 2', 'v: 3'), fichas: ['1', '4', '9'], alto: 96 }, [
        ['A cierta velocidad tiene una unidad.', { pon: { 0: '1' } }],
        ['Al doble de velocidad, cuatro.', { pon: { 1: '4' } }, '$2^2 = 4$'],
        ['Al triple de velocidad, nueve.', { pon: { 2: '9' } }, '$3^2 = 9$'],
        ['Por eso frenar cuesta mucho más.', {}],
        ['En cambio, con la masa es parejo: doble masa, doble energía.', {}],
      ], 'Doble velocidad: cuatro veces. Doble masa: dos veces.'),
      xpHaz('fichas', 'Una moto va a 20 y pasa a 80 km/h. Pon por cuánto se multiplica su velocidad y por cuánto su energía cinética.', { slots: fila('velocidad', 'energía'), fichas: ['4', '16', '8', '2', '60'], meta: ['4', '16'], alto: 96, pista: 'La energía va con el cuadrado.' }, '$80 \\div 20 = 4$ y $4^2 = 16$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un bloque de 3 kg está a 4 m de altura (gravedad 10). Cae y llega con 90 J de cinética. Pon su potencial al comienzo y lo que pasó a calor.', { slots: fila('potencial', 'calor'), fichas: ['120', '30', '90', '12', '210'], meta: ['120', '30'], alto: 96, pista: 'Masa por gravedad por altura; después, resta.' }, '$3 \\cdot 10 \\cdot 4 = 120$ y $120 - 90 = 30$.')],
  ], 'Se transforma, se conserva y la velocidad pesa al cuadrado.');

  xpLec('icf-cn-energia-2', [
    ['No son lo mismo',
      xpMira('dibujo', 'Empecemos por la idea: el **calor** pasa de lo más caliente a lo más frío hasta igualarse.', { dib: par, v: { a: 80, b: 20, t: '' }, alto: 178 }, [
        ['Dos bloques iguales: uno a 80 y otro a 20.', {}],
        ['El calor pasa del caliente al frío.', { a: 70, b: 30, t: 'pasa calor' }],
        ['Uno baja lo mismo que el otro sube.', { a: 60, b: 40 }],
        ['Cuando se igualan, deja de pasar.', { a: 50, b: 50, t: 'equilibrio' }, '$(80 + 20) \\div 2 = 50$'],
        ['Temperatura es lo que marcan; calor, lo que pasó.', {}],
      ], 'Temperatura se tiene; calor pasa, hasta el equilibrio.'),
      xpHaz('fichas', 'Se juntan dos bloques iguales, a 90 y a 30 grados, sin perder calor. Pon el equilibrio y cuánto baja el caliente.', { slots: fila('equilibrio', 'baja'), fichas: ['60', '30', '120', '45', '90'], meta: ['60', '30'], alto: 96, pista: 'Son iguales: el punto medio.' }, '$(90 + 30) \\div 2 = 60$ y $90 - 60 = 30$.')],
    ['Tres caminos',
      xpMira('hoja', 'Segunda idea: el calor viaja por **conducción**, **convección** o **radiación**.', { paras: [['Plancha que toca la camisa'], ['Agua de la olla que sube y baja'], ['Sol que calienta la acera'], ['Cobija con aire quieto']] }, [
        ['Por contacto, de partícula en partícula.', { luz: [0], nota: { 0: 'conducción' } }],
        ['Por un fluido que se mueve.', { luz: [1], nota: { 1: 'convección' } }],
        ['En ondas, aun en el vacío.', { luz: [2], nota: { 2: 'radiación' } }],
        ['El aire quieto casi no lo deja pasar.', { luz: [3], nota: { 3: 'aislante' } }],
        ['El metal, en cambio, lo conduce muy bien.', { luz: [0] }],
      ], 'Contacto, fluido u ondas; el aire quieto frena.'),
      xpHaz('hoja', 'Pon al margen el camino del calor.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['convección', 'radiación', 'conducción'], meta: [2, 0, 1], paras: [['Sartén sobre la hornilla, contacto directo'], ['Aire caliente que sube en una chimenea'], ['Calor de una bombilla sin tocarla, de lado']], pista: 'Alguna no va ahí: ¿contacto, fluido u ondas?' }, 'La sartén por contacto, el aire sube y la bombilla radia.')],
    ['Unos cuestan más',
      xpMira('dibujo', 'Tercera idea: el **calor específico** dice cuánto cuesta subir un grado.', { dib: barras, v: { x: 0, y: 0, t: '' }, alto: 186 }, [
        ['Un kilo de agua y uno de arena, con el mismo fuego.', {}],
        ['La arena sube rápido.', { x: 4, y: 21, t: 'mismo calor' }],
        ['El agua sube despacio: pide más calor por grado.', { x: 12, y: 63 }],
        ['Al enfriarse ocurre igual: la arena baja primero.', { x: 10, y: 30, t: 'de noche' }],
        ['Por eso el mar cambia poco de temperatura.', {}],
      ], 'Mayor calor específico: cambia más despacio.'),
      xpHaz('fichas', 'A 1 kg de agua se le dan 12 600 J. Si cada grado pide 4 200, pon cuánto sube y cuánto subirían 3 kg con el mismo calor.', { slots: fila('1 kg', '3 kg'), fichas: ['3', '1', '9', '6', '12'], meta: ['3', '1'], alto: 96, pista: 'Con el triple de agua, el calor se reparte en más.' }, '$12\\,600 \\div 4\\,200 = 3$; con el triple de masa, 1.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Una banca de metal y una de madera llevan toda la noche afuera. La de metal se siente más fría. Subraya la explicación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El metal está a menor temperatura.'], ['La madera produce calor.'], ['El metal se lleva más rápido el calor del cuerpo.']], pista: 'Llevan horas en el mismo lugar.' }, 'Tienen igual temperatura; el metal conduce mejor.')],
  ], 'El calor pasa, por tres caminos, y unos se calientan más fácil.');
}
;
//#archivo js/explora-icf-cn-6-pasos.js
// Preicfes · Ciencias Naturales, mundo 6 «Energía y Calor», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB, n = x => Math.round(x * 100) / 100;

  // Tres caras de la energía: pila y bombillo (k ≥ 1), llama que calienta agua (k ≥ 2) y una bolsa que se sube un metro (k ≥ 3).
  const formas = (v, K) => {
    const k = v.k || 0, sube = k >= 3 ? 1 : 0, yb = 150 - 64 * sube;
    let s = X.cable([[46, 140], [30, 140], [30, 76], [50, 76]]) + X.cable([[90, 140], [104, 140], [104, 76], [70, 76]], '#2b2f33') + X.pila(68, 140, '1.5 V') + X.bombillo(60, 66, k >= 1 ? 1 : 0);
    s += X.vaso(176, 120, 56, 64, 0.6, 'agua', { burbujas: k >= 2 ? 6 : 0 }) + `<rect x="146" y="120" width="60" height="4" fill="#59626a"/><path d="M152 124 L148 166 M200 124 L204 166" stroke="#59626a" stroke-width="2.5"/>` + X.mechero(176, 166, k >= 2 ? 0.75 : 0);
    s += `<rect x="252" y="${n(yb - 4)}" width="64" height="4" fill="#8a5a30"/>` +
      `<path d="M266 ${n(yb - 4)} L262 ${n(yb - 40)} Q284 ${n(yb - 48)} 306 ${n(yb - 40)} L302 ${n(yb - 4)} Z" fill="#f4f1ea" stroke="#bdb6a6"/>` +
      `<text x="284" y="${n(yb - 18)}" fill="#c0392b" font-size="10" font-weight="700" style="text-anchor:middle;font-family:Jost,system-ui,sans-serif">ARROZ 1 kg</text>`;
    if (sube) s += X.flecha(326, 150, 326, 92) + X.rot(268, 122, '1 m más arriba');
    if (v.t) s += X.rot(170, 22, v.t, 'oscuro');
    return X.foto(s, 200, 'lab');
  };

  xpAmplia('icf-cn-energia-1', {
    conecta: 'icf-cn-movimiento-3',
    desde: [
      ['Desde cero: qué es la energía',
        xpMira('dibujo', 'Todos hablamos de **energía**, pero ¿qué es? Antes de las fórmulas, mira lo que hace en tres situaciones de la casa.', { dib: formas, v: { k: 0 }, alto: 200 }, [
          ['En la lección de gravedad viste que todo cae hacia la Tierra, cada vez más rápido.', {}],
          ['La energía es lo que permite causar un cambio: mover, calentar o iluminar.', { t: 'energía: lo que causa cambios' }],
          ['No se ve, pero se nota en lo que hace: la pila enciende el bombillo.', { k: 1 }],
          ['La llama le pasa energía al agua y la calienta.', { k: 2 }],
          ['Se mide en julios: subir un kilo de arroz un metro pide unos 10 julios.', { k: 3 }, '$1 \\text{ kg} \\cdot 10 \\cdot 1 \\text{ m} = 10 \\text{ J}$'],
          ['No se crea ni se destruye: pasa de una forma a otra.', { k: 3, t: 'se transforma' }],
        ], 'Energía: lo que permite causar cambios. Se mide en julios y solo cambia de forma.'),
        xpHaz('hoja', 'Subraya la frase correcta sobre la energía.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Se gasta y desaparece.'], ['Pasa de una forma a otra, como de la pila a la luz.'], ['Solo la tienen los seres vivos.']], pista: 'Cuando el bombillo apaga la pila, ¿la energía se acabó o se fue a otra parte?' }, 'La de la pila se vuelve luz y calor: cambia de forma.')],
    ],
    despues: [
      ['Más difícil: dónde va más rápido',
        xpMira('hoja', 'Un caso que mezcla las ideas: una patinadora en una rampa en forma de **U**, sin roce. ¿Dónde va más rápido?', { paras: [['Se suelta quieta desde lo alto de un lado.'], ['Abajo, donde la altura es mínima, va más rápido.'], ['Sube al otro lado hasta la misma altura de donde salió.'], ['Por una rampa larga o corta, llega abajo con la misma rapidez.']] }, [
          ['Arriba y quieta: toda su energía es potencial.', { luz: [0], nota: { 0: 'potencial' } }],
          ['Abajo la potencial es mínima: toda pasó a cinética.', { luz: [1], nota: { 1: 'más rápido' } }],
          ['Sin roce, vuelve a la misma altura: no perdió nada.', { luz: [2] }],
          ['La rapidez abajo depende de cuánto bajó, no del camino.', { luz: [3], nota: { 3: 'solo la altura' } }],
          ['Con roce, en cambio, cada subida es un poco más baja.', {}],
        ], 'Sin roce, la rapidez en un punto depende solo de cuánto ha bajado desde donde se soltó.'),
        xpHaz('hoja', 'Una niña se lanza quieta por un rodadero desde 3 m, sin roce. Subraya dónde lleva la **mayor** rapidez.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Arriba, al soltarse.'], ['Abajo, al final del rodadero.'], ['A la mitad de la bajada.']], pista: 'La cinética crece mientras baja. ¿Dónde ha bajado más?' }, 'Abajo toda la potencial se volvió cinética.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una pelota de 0.5 kg se suelta desde 4 m, sin roce: arriba tiene 20 J. ¿Qué tabla de energía (J) **arriba, a la mitad y abajo** es correcta?', { letras: ['A', 'B', 'C', 'D'], paras: [['Potencial 20, 10, 0 · cinética 0, 10, 20'], ['Potencial 20, 10, 0 · cinética 0, 5, 10'], ['Potencial 20, 10, 0 · cinética 20, 10, 0'], ['Potencial 0, 10, 20 · cinética 20, 10, 0']] }, [
        ['La regla: sin roce, potencial más cinética da siempre 20.', {}, '$0.5 \\cdot 10 \\cdot 4 = 20$'],
        ['Aquí la suma baja a 15 y a 10: se perdió energía.', { luz: [1], nota: { 1: 'no se conserva' } }],
        ['Aquí las dos bajan juntas: arriba sumaría 40.', { luz: [2], nota: { 2: 'suma 40' } }],
        ['Aquí la potencial crece al bajar: está al revés.', { luz: [3], nota: { 3: 'al revés' } }],
        ['Lo que pierde la potencial lo gana la cinética: suma 20.', { luz: [0], nota: { 0: 'correcta' } }],
      ], 'Suma cada fila: sin roce, potencial más cinética debe dar lo mismo en todos los puntos.'),
      xpHaz('hoja', 'Un carro duplica su velocidad. Alguien dice que su energía cinética también se duplica. ¿Tiene razón?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Sí, porque energía y velocidad crecen igual.'], ['No: se multiplica por cuatro, porque va con el cuadrado de la velocidad.'], ['No, se queda igual porque la masa no cambia.'], ['Sí, porque doble masa da doble energía.']], pista: 'Recuerda cómo pesa la velocidad en la cinética. Una opción habla de la masa, que aquí no cambió.' }, 'Doble velocidad: $2^2 = 4$ veces la energía.')],
    cierre: 'La energía causa cambios y se transforma; sin roce, potencial más cinética da siempre lo mismo.',
  });

  // Un tinto caliente y un vaso de agua con hielo, con sus termómetros y partículas (h: se ven).
  const pts = (x, y, rapido) => Array.from({ length: 7 }, (_, i) => {
    const a = x - 18 + (i * 13) % 36, b = y + (i * 11) % 26, L = rapido ? 7 : 2;
    return `<circle cx="${n(a)}" cy="${n(b)}" r="2.2" fill="#ffffff"/><path d="M${n(a - L)} ${n(b + (i % 2 ? 2 : -2))} L${n(a - 2)} ${n(b)}" stroke="#ffffff" stroke-width="1" opacity=".7"/>`;
  }).join('');
  const temperatura = (v, K) => {
    let s = X.vaso(96, 166, 70, 84, 0.7, 'cafe') + X.termometro(118, 160, 104, 0.82, v.m ? '80 °C' : '') + X.vaso(236, 166, 70, 84, 0.7, 'agua', { hielo: 2 }) + X.termometro(258, 160, 104, 0.12, v.m ? '5 °C' : '');
    if (v.h) s += pts(92, 116, 1) + pts(232, 124, 0);
    if (v.c) s += [80, 96, 112].map((x, i) => `<path d="M${x} 74 q-6 -10 0 -20 q6 -10 0 -20" stroke="#ffffff" stroke-width="2" fill="none" opacity="${0.8 - i * 0.15}"/>`).join('') + X.rot(96, 20, 'calor hacia el aire');
    s += X.rot(96, 188, 'tinto') + X.rot(236, 188, 'agua con hielo');
    if (v.t) s += X.rot(236, 20, v.t, 'oscuro');
    return X.foto(s, 200, 'mesa');
  };

  xpAmplia('icf-cn-energia-2', {
    conecta: 'icf-cn-materia-1',
    desde: [
      ['Desde cero: qué mide un termómetro',
        xpMira('dibujo', 'En la casa decimos «hace calor» para todo. En ciencias, **temperatura** y **calor** son cosas distintas. Empecemos por las partículas.', { dib: temperatura, v: {}, alto: 200 }, [
          ['En la lección de estados viste que las partículas se mueven más cuando se calientan.', { h: 1 }],
          ['La temperatura mide qué tan agitadas están, en promedio.', { h: 1, t: 'más agitadas, más temperatura' }],
          ['Se mide con termómetro, en grados Celsius.', { h: 1, m: 1 }],
          ['A nivel del mar, el agua se congela a 0 °C y hierve a 100 °C.', { m: 1 }],
          ['El calor es la energía que pasa de lo caliente a lo frío.', { m: 1, c: 1 }],
          ['Por eso el tinto se enfría en la mesa: le da calor al aire.', { m: 1, c: 1 }],
        ], 'Temperatura: qué tan agitadas están las partículas. Calor: energía que pasa de lo caliente a lo frío.'),
        xpHaz('hoja', 'Subraya la frase correcta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Lo frío tiene «frío» adentro que se pasa a lo demás.'], ['El calor pasa del objeto caliente al frío.'], ['Calor y temperatura son lo mismo.']], pista: 'El frío no viaja. ¿Qué es lo que pasa de un objeto al otro?' }, 'Solo viaja el calor, y siempre de lo caliente a lo frío.')],
    ],
    despues: [
      ['Más difícil: mezclar cantidades distintas',
        xpMira('hoja', 'Con masas iguales, el equilibrio queda en el punto medio. ¿Y si una cantidad es **mayor**? Se mezcla 1 kg de agua a 70 °C con 3 kg a 10 °C, sin perder calor.', { paras: [['1 kg de agua a 70 °C'], ['3 kg de agua a 10 °C'], ['Se mezclan en un termo.']] }, [
          ['Si fueran iguales, quedaría en el punto medio: 40 °C.', { luz: [0, 1] }],
          ['Pero hay el triple de agua fría: tira más hacia 10.', { luz: [1], nota: { 1: 'pesa más' } }],
          ['Cada kilo cuenta en el promedio.', { luz: [2] }, '$(1 \\cdot 70 + 3 \\cdot 10) \\div 4 = 25$'],
          ['Queda en 25 °C, más cerca de la temperatura de la mayor cantidad.', { luz: [2], nota: { 2: '25 °C' } }],
          ['El kilo caliente bajó 45 grados; cada kilo frío subió 15.', {}, '$1 \\cdot 45 = 3 \\cdot 15$'],
        ], 'Al mezclar la misma sustancia, el equilibrio queda más cerca de la temperatura de la mayor masa.'),
        xpHaz('hoja', 'Se mezclan 2 kg de agua a 76 °C con 1 kg a 16 °C, sin perder calor. Subraya la temperatura final.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['46 °C, el punto medio.'], ['56 °C, más cerca de la de los 2 kg.'], ['92 °C, la suma.']], pista: 'Hay más agua caliente que fría. ¿Hacia cuál temperatura se corre el resultado?' }, '$(2 \\cdot 76 + 1 \\cdot 16) \\div 3 = 56$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una lata de gaseosa sale de la nevera y se sostiene en la mano. Alguien dice que la lata le **pasa frío** a la mano. ¿Tiene razón?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque el frío viaja de la lata a la mano.'], ['No: el calor pasa de la mano a la lata, y la mano lo siente como frío.'], ['No, porque entre ellas no pasa nada.'], ['Sí, porque la lata tiene más temperatura.']] }, [
        ['Decide el sentido: siempre de lo caliente a lo frío.', {}],
        ['Esta pone a viajar el frío: lo que viaja es calor.', { luz: [0], nota: { 0: 'sentido falso' } }],
        ['Buen «No», mala razón: sí pasa energía, por eso la mano se enfría.', { luz: [2], nota: { 2: 'razón falsa' } }],
        ['Esta invierte las temperaturas: la lata está más fría.', { luz: [3], nota: { 3: 'al revés' } }],
        ['La mano pierde calor y por eso la sentimos fría.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'El calor siempre va de lo caliente a lo frío; sentir frío es perder calor.'),
      xpHaz('hoja', 'Un tinto a 80 °C se deja en un cuarto a 20 °C. ¿Qué serie de temperaturas (cada 10 minutos) es la más probable?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['80, 62, 48, 38, 31'], ['80, 60, 40, 20, 0'], ['80, 80, 80, 80, 80'], ['80, 85, 90, 95, 100']], pista: 'El tinto se enfría hacia la temperatura del cuarto. ¿Puede bajar de 20 sin algo más frío al lado?' }, 'Baja cada vez más despacio y se acerca a 20 °C sin pasarse.')],
    cierre: 'Temperatura es agitación; el calor va de lo caliente a lo frío hasta igualarse, y la mayor masa pesa más en el equilibrio.',
  });
}
;
//#archivo js/explora-icf-cn-7.js
// Preicfes · Ciencias Naturales, mundo 7 «Átomo y Enlaces» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Átomo: p protones, n neutrones, e electrones repartidos en capas 2 y 8.
  const atomo = (v, K) => { const e = Math.round(v.e), cap = [Math.min(2, e), Math.max(0, e - 2)], nuc = Math.round(v.p) + Math.round(v.n); return K.c(170, 92, 78, 'fn') + K.c(170, 92, 48, 'fn') + Array.from({ length: nuc }, (_, i) => K.c(170 + 5 * Math.sqrt(i) * Math.cos(i * 2.4), 92 + 5 * Math.sqrt(i) * Math.sin(i * 2.4), 5, i < Math.round(v.p) ? 'fF' : 'fk')).join('') + cap.map((m, k) => Array.from({ length: m }, (_, i) => { const [x, y] = K.at(170, 92, [48, 78][k], 90 + 360 * i / m); return K.c(x, y, 5, 'fA'); }).join('')).join('') + K.t(170, 194, v.t || '', 'ta'); };
  // Dos átomos: electrón que pasa (t de 0 a 1), o se comparte (s).
  const par = (v, K) => K.c(110, 90, 44, 'fn') + K.c(230, 90, 44, 'fn') + K.t(110, 95, v.a, 'b') + K.t(230, 95, v.b, 'b') + (v.mar > 0.5 ? Array.from({ length: 10 }, (_, i) => K.c(60 + i * 24, i % 2 ? 60 : 120, 4, 'fA')).join('') : v.s > 0.01 ? K.c(170 + v.k, 82, 5, 'fA') + K.c(170 + v.k, 98, 5, 'fG') : K.c(154 + v.x * 32, 90, 6, 'fA')) + K.t(170, 168, v.t || '', 'ta');

  xpLec('icf-cn-atomo-1', [
    ['Tres partículas',
      xpMira('dibujo', 'Empecemos por la idea: el **núcleo** tiene protones y neutrones; alrededor, electrones.', { dib: atomo, v: { p: 6, n: 6, e: 6, t: '' }, alto: 202 }, [
        ['Seis protones en el centro: es carbono.', { t: '6 protones' }],
        ['Con los neutrones, la masa es doce.', { t: 'masa 12' }, '$6 + 6 = 12$'],
        ['Seis electrones: está neutro.', { t: 'neutro' }],
        ['Con siete protones ya sería nitrógeno.', { p: 7, e: 7, t: '7 protones' }],
        ['Los protones mandan: deciden el elemento.', {}],
      ], 'Protones: qué elemento es. Masa: protones más neutrones.'),
      xpHaz('fichas', 'Un átomo neutro tiene 9 protones y masa 19. Pon sus neutrones y sus electrones.', { slots: fila('neutrones', 'electrones'), fichas: ['10', '9', '19', '28', '8'], meta: ['10', '9'], alto: 96, pista: 'Resta los protones a la masa; neutro tiene iguales cargas.' }, '$19 - 9 = 10$; neutro: 9.')],
    ['Isótopos e iones',
      xpMira('dibujo', 'Segunda idea: cambian **neutrones**, isótopo; cambian **electrones**, ion.', { dib: atomo, v: { p: 3, n: 4, e: 3, t: 'litio' }, alto: 202 }, [
        ['Litio: tres protones, cuatro neutrones, tres electrones.', {}],
        ['Con un neutrón menos, es un isótopo.', { n: 3, t: 'litio 6' }],
        ['Sigue siendo litio: tiene tres protones.', {}],
        ['Si pierde un electrón, es un ion.', { n: 4, e: 2, t: 'carga +1' }, '$3 - 2 = +1$'],
        ['El núcleo no cambió.', {}],
      ], 'Isótopo: otros neutrones. Ion: otros electrones.'),
      xpHaz('hoja', 'Pon al margen qué es, comparado con oxígeno neutro (8 p, 8 n, 8 e).', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['ion', 'otro elemento', 'isótopo'], meta: [2, 0, 1], paras: [['8 p, 10 n, 8 e'], ['8 p, 8 n, 10 e'], ['9 p, 10 n, 9 e']], pista: 'Alguna no va ahí: mira qué número cambió.' }, 'Neutrones, electrones o protones.')],
    ['La tabla',
      xpMira('hoja', 'Tercera idea: la **tabla** ordena por protones y agrupa a los parecidos.', { paras: [['Grupo: columna, se parecen'], ['Periodo: fila'], ['Al bajar: más capas, más grande'], ['Al avanzar: más atracción, más pequeño'], ['Izquierda: metales. Derecha: no metales']] }, [
        ['Los de una columna tienen iguales electrones externos.', { luz: [0], nota: { 0: 'se parecen' } }],
        ['Cada fila es un periodo.', { luz: [1] }],
        ['Al bajar, el átomo crece.', { luz: [2], nota: { 2: 'crece' } }],
        ['Al avanzar, en general se encoge.', { luz: [3], nota: { 3: 'se encoge' } }],
        ['Unos pierden electrones y otros los ganan.', { luz: [4] }],
      ], 'Grupo: se parecen. Bajar: crece. Avanzar: se encoge.'),
      xpHaz('hoja', 'Litio, sodio y potasio están en la misma columna, de arriba abajo. Subraya el más **grande**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Litio'], ['Sodio'], ['Potasio']], pista: 'Al bajar hay más capas.' }, 'El de más abajo tiene más capas.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'El ion de azufre tiene 16 protones y 18 electrones; su masa es 32. Pon la carga y los neutrones.', { slots: fila('carga', 'neutrones'), fichas: ['−2', '16', '+2', '14', '18'], meta: ['−2', '16'], alto: 96, pista: 'Compara protones con electrones; resta protones a la masa.' }, '$16 - 18 = -2$ y $32 - 16 = 16$.')],
  ], 'Protones identifican; neutrones y electrones varían; la tabla ordena.');

  xpLec('icf-cn-atomo-2', [
    ['Entregar',
      xpMira('dibujo', 'Empecemos por la idea: en el enlace **iónico** un metal entrega electrones.', { dib: par, v: { a: 'Na', b: 'Cl', x: 0, s: 0, k: 0, mar: 0, t: '' }, alto: 178 }, [
        ['El sodio tiene un electrón suelto.', {}],
        ['Se lo entrega al cloro.', { x: 1, t: 'pasa un electrón' }],
        ['Quedan con cargas opuestas y se atraen.', { a: 'Na⁺', b: 'Cl⁻', t: '+1 y −1' }],
        ['Forman una red dura que se funde muy caliente.', {}],
        ['Disuelta, sus iones se mueven y conduce.', { t: 'disuelta conduce' }],
      ], 'Iónico: metal con no metal, red dura, conduce disuelto.'),
      xpHaz('hoja', 'Subraya la sustancia con enlace **iónico**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Oxígeno del aire (O₂)'], ['Bromuro de potasio (KBr)'], ['Cobre (Cu)']], pista: 'Busca un metal con un no metal.' }, 'El potasio es metal y el bromo, no metal.')],
    ['Compartir',
      xpMira('dibujo', 'Segunda idea: en el **covalente** dos no metales comparten.', { dib: par, v: { a: 'O', b: 'O', x: 0, s: 1, k: 0, mar: 0, t: '' }, alto: 178 }, [
        ['Los dos jalan igual: están en el medio.', { t: 'apolar' }],
        ['Si uno jala más, quedan más cerca de él.', { a: 'H', k: 22, t: 'polar' }],
        ['Un lado queda un poco negativo.', {}],
        ['Así es el agua: por eso disuelve la sal.', {}],
        ['Muchas covalentes se funden fácil y no conducen.', { t: 'no conduce' }],
      ], 'Covalente: comparten. Igual, apolar; desigual, polar.'),
      xpHaz('hoja', 'Pon al margen el enlace.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['polar', 'apolar'], meta: [1, 0], paras: [['Dos átomos iguales comparten'], ['Uno atrae más los electrones']], pista: 'Alguna no va ahí: ¿jalan igual?' }, 'Igual, apolar; desigual, polar.')],
    ['Un mar',
      xpMira('dibujo', 'Tercera idea: en el **metálico** los electrones se mueven por toda la pieza.', { dib: par, v: { a: 'Cu', b: 'Cu', x: 0, s: 0, k: 0, mar: 1, t: '' }, alto: 178 }, [
        ['Los electrones externos quedan sueltos.', { t: 'mar de electrones' }],
        ['Por eso conduce electricidad y calor.', {}],
        ['Y conduce aunque esté sólido.', { t: 'conduce sólido' }],
        ['Y se dobla: las capas se deslizan.', {}],
        ['La sal, en cambio, se parte.', {}],
      ], 'Metálico: conduce sólido y se dobla.'),
      xpHaz('hoja', 'Subraya la prueba que distingue un **metal** de una sal.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Si conduce estando sólido'], ['Si es blanco o gris'], ['Si cabe en un frasco']], pista: 'La sal sólida no conduce.' }, 'Solo el metal conduce sólido.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'El calcio pierde 2 electrones y el flúor gana 1. Pon la carga del calcio y cuántos flúor hacen falta.', { slots: fila('calcio', 'flúor'), fichas: ['+2', '2', '−2', '1', '+1'], meta: ['+2', '2'], alto: 96, pista: 'Las cargas deben sumar cero.' }, '$+2 - 1 - 1 = 0$: dos flúor.')],
  ], 'Entregar, compartir o soltar: se nota en las propiedades.');
}
;
//#archivo js/explora-icf-cn-7-pasos.js
// Preicfes · Ciencias Naturales, mundo 7 «Átomo y Enlaces», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación
// empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));

  // Un lápiz en la mesa, la lupa y un círculo que se acerca: z = 1 grafito, 2 átomos, 3 un átomo por dentro.
  const zoom = (v, K) => {
    const z = v.z || 0, cx = 255, cy = 88, R = 60;
    let s = `<path d="M40 146 H170 V158 H40Z" fill="#e7b56a" stroke="#9c6b2c"/><path d="M40 146 L18 152 L40 158Z" fill="#e9cfa1" stroke="#9c6b2c"/><path d="M24 150.4 L18 152 L24 153.6Z" fill="#3a3a3a"/>` +
      `<path d="M170 146 H182 V158 H170Z" fill="#d66a8a"/><path d="M40 149 H170" stroke="#fff" stroke-opacity=".35"/>`;
    if (z >= 1) {
      s += X.lupa(58, 120, 20) + `<path d="M74 110 L${cx - R + 4} ${cy}" stroke="#fff" stroke-opacity=".7" stroke-dasharray="4 4"/>` +
        `<circle cx="${cx}" cy="${cy}" r="${R}" fill="#f4f6f8" stroke="#3b4247" stroke-width="3"/>`;
      if (z < 2) for (let i = 0; i < 16; i++) s += `<rect x="${cx - 40 + (i * 37) % 80}" y="${cy - 34 + (i * 23) % 68}" width="${8 + (i % 3) * 4}" height="5" rx="2" fill="#4a4f55" opacity=".7"/>`;
      else if (z < 3) for (let r = -2; r <= 2; r++) for (let c = -2; c <= 2; c++) { if (Math.hypot(c * 20 + (r % 2 ? 10 : 0), r * 18) > 46) continue; s += `<circle cx="${cx + c * 20 + (r % 2 ? 10 : 0)}" cy="${cy + r * 18}" r="9" fill="url(#xlb-metal)" stroke="#4d565c" stroke-width=".8"/>`; }
      else {
        s += `<ellipse cx="${cx}" cy="${cy}" rx="24" ry="24" fill="none" stroke="#8a969c" stroke-dasharray="3 3"/><ellipse cx="${cx}" cy="${cy}" rx="46" ry="46" fill="none" stroke="#8a969c" stroke-dasharray="3 3"/>`;
        for (let i = 0; i < 12; i++) s += `<circle cx="${(cx + 5 * Math.sqrt(i) * Math.cos(i * 2.4)).toFixed(1)}" cy="${(cy + 5 * Math.sqrt(i) * Math.sin(i * 2.4)).toFixed(1)}" r="4.4" fill="${i % 2 ? '#9aa3a8' : '#e0524f'}" stroke="#333" stroke-width=".5"/>`;
        [[24, 90], [24, 270], [46, 30], [46, 120], [46, 210], [46, 300]].forEach(([r, g]) => { s += `<circle cx="${(cx + r * Math.cos(g * Math.PI / 180)).toFixed(1)}" cy="${(cy - r * Math.sin(g * Math.PI / 180)).toFixed(1)}" r="4" fill="#3a6fd6" stroke="#fff" stroke-width=".8"/>`; });
      }
    }
    return X.foto(s + (v.r ? X.rot(170, 186, v.r, 'oscuro') : ''), 200, 'mesa', 168);
  };
  // Casilla de la tabla periódica (potasio) con el dato que se mira (h: 1 número atómico, 2 masa, 3 ion).
  const casilla = (v, K) => {
    const h = Math.round(v.h || 0);
    return K.r(110, 18, 120, 128, 'fc', 8) + (h === 1 ? K.r(116, 26, 40, 26, 'fg', 5) : '') + (h === 2 ? K.r(182, 26, 44, 26, 'fg', 5) : '') + (h === 3 ? K.r(140, 70, 60, 40, 'fg', 6) : '') +
      K.t(122, 45, '19', 'b', 'start') + K.t(220, 45, '39.1', 's', 'end') + K.t(170, 102, h === 3 ? 'K⁺' : 'K', 'b') + K.t(170, 132, 'potasio', 's tm') +
      K.t(170, 172, v.t || '', 'ta');
  };

  xpAmplia('icf-cn-atomo-1', {
    conecta: 'icf-cn-materia-1',
    desde: [
      ['Desde cero: de qué está hecha la materia',
        xpMira('dibujo', 'Antes de contar partículas: todo lo que tocas está hecho de **átomos**, piezas tan pequeñas que no se ven ni con lupa.', { dib: zoom, v: { z: 0, r: '' }, alto: 200 }, [
          ['En la lección de estados viste que la materia está hecha de partículas.', { z: 0 }],
          ['Mira la punta de un lápiz: es grafito, una forma del carbono.', { z: 1, r: 'grafito' }],
          ['Si pudieras acercarte millones de veces, verías bolitas: los átomos.', { z: 2, r: 'átomos' }],
          ['Cada átomo tiene un centro, el núcleo, y electrones alrededor.', { z: 3, r: 'núcleo y electrones' }],
          ['El protón es positivo, el electrón negativo y el neutrón no tiene carga.', { z: 3, r: 'protón +, electrón −' }],
          ['Un elemento es una clase de átomo: carbono, oxígeno, hierro…', { z: 3, r: 'elemento: una clase de átomo' }],
        ], 'La materia está hecha de átomos: un núcleo con protones y neutrones, y electrones alrededor.'),
        xpHaz('hoja', 'Subraya la frase **correcta** sobre las cargas del átomo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El protón es negativo.'], ['El electrón es negativo.'], ['El neutrón es positivo.']], pista: 'El núcleo es positivo por los protones, y el neutrón no tiene carga.' }, 'Protón positivo, electrón negativo, neutrón sin carga.')],
    ],
    despues: [
      ['Más difícil: leer una casilla de la tabla',
        xpMira('dibujo', 'Un paso más: te dan una **casilla** de la tabla y piden contar partículas. Cada número dice algo distinto.', { dib: casilla, v: { h: 0, t: '' }, alto: 184 }, [
          ['Cada casilla trae el símbolo, el número atómico y la masa atómica.', { h: 0, t: '' }],
          ['El número atómico, 19, son los protones: es potasio.', { h: 1, t: '19 protones' }],
          ['La masa, casi 39, suma protones y neutrones.', { h: 2, t: '39 − 19 = 20 neutrones' }, '$39 - 19 = 20$'],
          ['Neutro tiene 19 electrones; el ion K⁺ perdió uno.', { h: 3, t: 'K⁺: 18 electrones' }, '$19 - 1 = 18$'],
          ['La masa trae decimales porque promedia isótopos: se redondea.', { h: 2, t: 'masa promedio: 39.1' }],
        ], 'Número atómico: protones. Masa menos protones: neutrones. La carga dice cuántos electrones sobran o faltan.'),
        xpHaz('fichas', 'Una casilla dice: calcio, número atómico 20, masa 40. Pon los neutrones y los electrones del ion Ca²⁺.', { slots: fila('neutrones', 'electrones'), fichas: ['20', '18', '22', '40', '60'], meta: ['20', '18'], alto: 96, pista: 'Resta los protones a la masa; el ion +2 perdió dos electrones.' }, '$40 - 20 = 20$ neutrones y $20 - 2 = 18$ electrones.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Tres átomos: W (10 p, 10 n), X (10 p, 12 n) y Y (11 p, 11 n). Te preguntan cuáles son del **mismo elemento**.', { letras: ['A', 'B', 'C', 'D'], paras: [['W y Y, porque cada uno tiene tantos neutrones como protones.'], ['X y Y, porque los dos tienen masa 22.'], ['W y X, porque tienen el mismo número de protones.'], ['Los tres, porque todos son átomos neutros.']] }, [
        ['Decide tú primero: el elemento lo dicen los protones.', {}],
        ['La A usa un dato cierto, pero no es el que decide.', { luz: [0], nota: { 0: 'criterio falso' } }],
        ['La B compara masas: misma masa no es mismo elemento.', { luz: [1], nota: { 1: 'masa' } }],
        ['La D generaliza: ser neutro no dice qué elemento es.', { luz: [3], nota: { 3: 'generaliza' } }],
        ['La C cuenta protones: 10 y 10. Son isótopos.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'Busca el dato que decide, los protones, y desconfía de razones ciertas que no responden.'),
      xpHaz('hoja', 'Un ion de bario tiene 56 protones y 54 electrones. Subraya la afirmación **correcta**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Es otro elemento, porque perdió electrones.'], ['Tiene carga −2, porque le faltan electrones.'], ['Tiene carga +2 y sigue siendo bario.'], ['Tiene carga +2, porque ganó dos protones.']], pista: 'Compara protones con electrones y pregúntate qué partícula cambió de verdad.' }, 'Faltan dos electrones: carga +2. El núcleo no cambió: sigue siendo bario.')],
    cierre: 'Los protones dicen el elemento; neutrones y electrones pueden variar; la tabla lo ordena todo.',
  });

  // Tres cosas de la cocina: sal en un plato, un vaso de agua y un alambre de cobre; k muestra sus rótulos.
  const cocina = (v, K) => {
    const k = v.k || 0;
    let s = `<ellipse cx="70" cy="160" rx="44" ry="9" fill="#f4f4f4" stroke="#b9b9b9"/>`;
    for (let i = 0; i < 18; i++) { const x = 46 + (i * 29) % 48, y = 152 - Math.floor(i / 6) * 6 - (i % 3); s += `<rect x="${x}" y="${y}" width="5" height="5" fill="#ffffff" stroke="#9aa3a8" stroke-width=".6" transform="rotate(${(i * 17) % 40 - 20} ${x + 2.5} ${y + 2.5})"/>`; }
    s += X.vaso(170, 166, 56, 76, 0.7, 'agua');
    const bob = [[230, 160]]; for (let i = 0; i < 14; i++) bob.push([250 + i * 4, 150 + (i % 2 ? -18 : 6)]);
    s += X.cable(bob, '#c87533') + X.cable([[306, 156], [320, 140]], '#c87533');
    if (k >= 1) s += X.rot(68, 132, 'sal: regala');
    if (k >= 2) s += X.rot(170, 78, 'agua: comparte');
    if (k >= 3) s += X.rot(270, 116, 'cobre: fondo común');
    return X.foto(s, 200, 'mesa', 168);
  };

  xpAmplia('icf-cn-atomo-2', {
    conecta: 'icf-cn-atomo-1',
    desde: [
      ['Desde cero: por qué se pegan los átomos',
        xpMira('dibujo', 'Antes de los nombres: un **enlace** es la forma en que dos o más átomos quedan pegados. Todo depende de qué hacen con sus electrones.', { dib: cocina, v: { k: 0 }, alto: 200 }, [
          ['En la lección del átomo viste que los metales pierden electrones y los no metales los ganan.', { k: 0 }],
          ['Los átomos se unen formando enlaces, como piezas que se enganchan.', { k: 0 }],
          ['En la sal, un átomo le regala un electrón al otro.', { k: 1 }],
          ['En el agua, los átomos comparten electrones, como dos bajo una misma sombrilla.', { k: 2 }],
          ['En el cobre, todos ponen electrones en un fondo común, como cuando se hace una vaca.', { k: 3 }],
          ['Regalar, compartir o juntar: así se unen casi todas las sustancias.', { k: 3 }],
        ], 'Enlace: cómo se pegan los átomos. Regalan (iónico), comparten (covalente) o juntan (metálico).'),
        xpHaz('hoja', 'Pon al margen qué hacen los átomos con sus electrones en cada sustancia.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['regalan', 'comparten', 'fondo común'], meta: [2, 0, 1], paras: [['Un alambre de cobre'], ['La sal de cocina'], ['El agua']], pista: 'Alguna no va ahí: ¿es un metal, un metal con un no metal, o dos no metales?' }, 'Metal: fondo común. Sal: regalan. Agua: comparten.')],
    ],
    despues: [
      ['Más difícil: el enlace por sus propiedades',
        xpMira('hoja', 'Casi nunca te nombran el enlace: te dan una **tabla de propiedades** y tú lo deduces. Hay que usar dos pistas, no una.', { paras: [['P: funde a 1 000 °C; sólida no conduce; disuelta, sí.'], ['Q: funde a 1 080 °C; sólida conduce.'], ['R: funde a 5 °C; no conduce nunca.'], ['«Funde muy caliente: es iónica»']] }, [
          ['P y Q funden muy calientes: con eso solo no basta.', { luz: [0, 1] }],
          ['Q conduce sólida: sus electrones se mueven. Es metálica.', { luz: [1], nota: { 1: 'metálico' } }],
          ['P solo conduce disuelta: sus iones se sueltan. Es iónica.', { luz: [0], nota: { 0: 'iónico' } }],
          ['R funde fácil y no conduce: es covalente.', { luz: [2], nota: { 2: 'covalente' } }],
          ['Una sola pista engaña: un metal también funde muy caliente.', { luz: [3], tacha: [3] }],
        ], 'Conduce sólido: metálico. Solo disuelto: iónico. Funde fácil y no conduce: covalente.'),
        xpHaz('hoja', 'Una sustancia dura funde a 900 °C y sólida no conduce. Subraya la prueba que **falta** para saber si es iónica.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Ver si conduce disuelta en agua.'], ['Pesarla en una balanza.'], ['Mirar su color.']], pista: 'Piensa en qué propiedad separa lo iónico de lo covalente.' }, 'Si disuelta conduce, tiene iones: es iónica.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Con un bombillo se prueban tres líquidos: agua con bicarbonato prende; agua con alcohol y aceite no. ¿Qué conclusión tiene **evidencia**?', { letras: ['A', 'B', 'C', 'D'], paras: [['El bicarbonato es un metal, porque prendió el bombillo.'], ['El bicarbonato disuelto suelta iones que se mueven; el alcohol no.'], ['El agua sola hace prender el bombillo.'], ['El alcohol es iónico, porque se mezcla con el agua.']] }, [
        ['Fíjate en qué se probó y qué no se probó.', {}],
        ['La A confunde: conducir disuelto no es ser metal.', { luz: [0], nota: { 0: 'confunde' } }],
        ['La C habla del agua sola, que nadie probó.', { luz: [2], nota: { 2: 'sin dato' } }],
        ['La D suena científica, pero mezclarse no es tener iones.', { luz: [3], nota: { 3: 'suena bien' } }],
        ['La B explica justo lo que se vio: hay iones sueltos.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'La conclusión buena sale de los datos del experimento, no de lo que suena científico.'),
      xpHaz('hoja', 'Dos sólidos grises: X conduce y se dobla; Y no conduce sólido y se parte al golpearlo. Subraya lo que se **concluye**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['Los dos son metales, porque son grises.'], ['Y es metálico, porque es muy duro.'], ['X es iónico, porque conduce.'], ['X es metálico y Y puede ser iónico.']], pista: 'El color no dice el enlace. Mira quién conduce sólido y quién se parte.' }, 'Conducir sólido y doblarse: metálico. Partirse sin conducir: puede ser iónico.')],
    cierre: 'Regalar, compartir o juntar electrones: se descubre mirando si conduce, cuándo, y cómo se funde.',
  });
}
;
//#archivo js/explora-icf-cn-8.js
// Preicfes · Ciencias Naturales, mundo 8 «Herencia y Evolución» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Cuadro de cruces: padre p1 p2 arriba, madre m1 m2 a la izquierda; n casillas llenas.
  const cuadro = (v, K) => { const u = 56, x = 124, y = 44, P = v.p, M = v.m; let h = ''; for (let i = 0; i < 2; i++) { h += K.t(x + u * (i + 0.5), 34, P[i], 'b ta') + K.t(x - 14, y + u * (i + 0.5) + 5, M[i], 'b tg'); for (let j = 0; j < 2; j++) { const k = i * 2 + j, g = [P[j], M[i]].sort().join(''); h += K.r(x + u * j, y + u * i, u - 3, u - 3, v.n > k ? (/[A-Z]/.test(g) ? 'fa' : 'ff') : 'fn', 3) + K.f(v.n - k, K.t(x + u * (j + 0.5) - 2, y + u * (i + 0.5) + 4, g, 'b')); } } return h + K.t(170, 186, v.t || '', 'ta'); };
  // Población: k oscuros entre 20.
  const pob = (v, K) => Array.from({ length: 20 }, (_, i) => K.c(70 + (i % 5) * 50, 34 + Math.floor(i / 5) * 34, 11, i < Math.round(v.k) ? 'fF' : 'fA')).join('') + K.t(170, 184, v.t || '', 'ta');
  // División celular: n células con c cromosomas.
  const celulas = (v, K) => Array.from({ length: Math.round(v.n) }, (_, i) => { const n = Math.round(v.n), x = 170 + (i - (n - 1) / 2) * 74; return K.c(x, 92, n > 2 ? 30 : 34, 'fn') + Array.from({ length: Math.round(v.c) }, (_, j) => K.l(x - 12 + j * 8, 80, x - 12 + j * 8, 104, j % 2 ? 'lg gr' : 'la gr')).join(''); }).join('') + K.t(170, 176, v.t || '', 'ta');

  xpLec('icf-cn-herencia-1', [
    ['Dos alelos',
      xpMira('hoja', 'Empecemos por la idea: de cada gen recibes **dos alelos**, uno de cada progenitor.', { paras: [['A: dominante'], ['a: recesivo'], ['AA o Aa: se ve lo dominante'], ['aa: se ve lo recesivo']] }, [
        ['Con uno dominante basta.', { luz: [0] }],
        ['El recesivo necesita dos.', { luz: [1] }],
        ['Estos dos se ven iguales.', { luz: [2], nota: { 2: 'mismo fenotipo' } }],
        ['Solo este muestra lo recesivo.', { luz: [3] }],
        ['Genotipo son las letras; fenotipo, lo que se ve.', {}],
      ], 'Letras: genotipo. Lo que se ve: fenotipo.'),
      xpHaz('hoja', 'En la arveja, la semilla lisa (R) domina a la rugosa. Subraya el genotipo de una planta de semilla **rugosa**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['RR'], ['Rr'], ['rr']], pista: 'Lo recesivo necesita dos iguales.' }, 'Sin ninguna R se ve lo recesivo.')],
    ['El cuadro',
      xpMira('dibujo', 'Segunda idea: el **cuadro** muestra las cuatro combinaciones.', { dib: cuadro, v: { p: ['B', 'b'], m: ['B', 'b'], n: 0, t: '' }, alto: 196 }, [
        ['El padre puede dar B o b; la madre también.', {}],
        ['Primera casilla: una B de cada uno.', { n: 1 }],
        ['Las otras tres se llenan igual.', { n: 4 }],
        ['Tres llevan alguna B: se ve lo dominante.', { t: '3 de 4' }],
        ['Solo una es bb: la cuarta parte.', { t: '1 de 4' }],
      ], 'Bb con Bb: tres a uno.'),
      xpHaz('fichas', 'Se cruza Rr con rr. Pon cuántas casillas de cuatro son Rr y cuántas rr.', { slots: fila('Rr', 'rr'), fichas: ['2', '2', '1', '3', '4'], meta: ['2', '2'], alto: 96, pista: 'Uno da R o r; el otro, solo r.' }, 'La mitad de cada una.')],
    ['Lo que se espera',
      xpMira('fichas', 'Tercera idea: la probabilidad vale en **muchos** nacimientos, no en cada camada.', { slots: fila('esperado', 'en 4', 'en 400'), fichas: ['1 de 4', '0 o 2', '98'], alto: 96 }, [
        ['Se espera uno recesivo de cada cuatro.', { pon: { 0: '1 de 4' } }],
        ['En una camada de cuatro puede salir otra cosa.', { pon: { 1: '0 o 2' } }],
        ['En cuatrocientas se acerca a cien.', { pon: { 2: '98' } }, '$400 \\div 4 = 100$'],
        ['También hay genes sin dominancia: flores rosadas.', {}],
        ['Y genes en el cromosoma X: más frecuentes en hombres.', {}],
      ], 'Mientras más nacimientos, más se acerca.'),
      xpHaz('fichas', 'Dos Aa tienen 240 hijos (son plantas). Pon los recesivos y los dominantes que se esperan.', { slots: fila('recesivos', 'dominantes'), fichas: ['60', '180', '120', '80', '240'], meta: ['60', '180'], alto: 96, pista: 'La cuarta parte y el resto.' }, '$240 \\div 4 = 60$ y $240 - 60 = 180$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Dos cobayos negros tienen una cría blanca. El negro domina. Subraya los genotipos de los padres.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['NN y NN'], ['Nn y Nn'], ['NN y nn']], pista: 'La cría es nn: recibió una n de cada uno.' }, 'Cada padre tiene una n escondida.')],
  ], 'Dos alelos, cuatro casillas y muchos nacimientos.');

  xpLec('icf-cn-herencia-2', [
    ['Uno o dos progenitores',
      xpMira('hoja', 'Empecemos por la idea: hay reproducción con **uno** o con **dos** progenitores.', { paras: [['Bacteria que se parte'], ['Papa sembrada por pedazos'], ['Polen que llega a otra flor'], ['Óvulo y espermatozoide']] }, [
        ['Aquí hay un solo progenitor.', { luz: [0], nota: { 0: 'asexual' } }],
        ['Aquí también: hijas iguales.', { luz: [1], nota: { 1: 'asexual' } }],
        ['Aquí hay dos progenitores.', { luz: [2], nota: { 2: 'sexual' } }],
        ['Y aquí: hijos variados.', { luz: [3], nota: { 3: 'sexual' } }],
        ['Una es rápida; la otra da variedad.', {}],
      ], 'Asexual: uno, iguales. Sexual: dos, variados.'),
      xpHaz('hoja', 'Subraya la ventaja de la reproducción **asexual**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Es rápida y no necesita pareja.'], ['Da hijos muy distintos.'], ['Protege de enfermedades nuevas.']], pista: 'Las otras dos son de la sexual.' }, 'Rápida y sin pareja, pero sin variedad.')],
    ['Dos divisiones',
      xpMira('dibujo', 'Segunda idea: **mitosis** copia; **meiosis** reduce a la mitad.', { dib: celulas, v: { n: 1, c: 4, t: 'una célula, 4 cromosomas' }, alto: 186 }, [
        ['Una célula con cuatro cromosomas.', {}],
        ['Por mitosis: dos iguales, con cuatro.', { n: 2, t: 'mitosis: 2 células, 4 cada una' }],
        ['Sirve para crecer y reparar.', {}],
        ['Por meiosis: cuatro, con la mitad.', { n: 4, c: 2, t: 'meiosis: 4 células, 2 cada una' }],
        ['Sirve para formar gametos, y casi siempre son distintos.', {}],
      ], 'Mitosis: dos iguales. Meiosis: cuatro con la mitad.'),
      xpHaz('fichas', 'Una especie tiene 20 cromosomas. Pon los de sus gametos y los del cigoto.', { slots: fila('gameto', 'cigoto'), fichas: ['10', '20', '40', '5', '80'], meta: ['10', '20'], alto: 96, pista: 'El gameto lleva la mitad; dos gametos se juntan.' }, '$20 \\div 2 = 10$ y $10 + 10 = 20$.')],
    ['El seguro de la variedad',
      xpMira('hoja', 'Tercera idea: la **variedad** protege cuando algo cambia.', { paras: [['Todas iguales'], ['Llega una plaga'], ['Mueren casi todas'], ['Variadas: algunas resisten']] }, [
        ['Iguales: si nada cambia, van bien.', { luz: [0] }],
        ['Pero llega una plaga.', { luz: [1], nota: { 1: 'cambio' } }],
        ['Si una cae, caen todas.', { luz: [2] }],
        ['Entre distintas, alguna aguanta.', { luz: [3], nota: { 3: 'sobreviven' } }],
        ['Por eso se guardan semillas viejas.', {}],
      ], 'Variedad: el seguro de vida de una especie.'),
      xpHaz('hoja', 'Subraya el cultivo con **menor** riesgo ante un hongo nuevo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Mil matas de un mismo esqueje'], ['Mil matas de semillas de muchas plantas'], ['Mil matas de estolones de una sola planta']], pista: '¿Dónde hay plantas distintas?' }, 'La variedad aumenta la opción de que alguna resista.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Una mula nace de yegua (64 cromosomas) y burro (62). Subraya cuántos tiene.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['126'], ['64'], ['63']], pista: 'Cada gameto lleva la mitad.' }, '$32 + 31 = 63$.')],
  ], 'Uno o dos, copiar o reducir, y variar.');

  xpLec('icf-cn-herencia-3', [
    ['La población cambia',
      xpMira('dibujo', 'Empecemos por la idea: no cambia el individuo, cambia la **proporción**.', { dib: pob, v: { k: 2, t: '2 oscuros de 20' }, alto: 194 }, [
        ['Dos escarabajos de veinte son oscuros.', {}],
        ['Los pájaros ven mejor a los claros.', { t: 'cazan más claros' }],
        ['Los oscuros dejan más crías oscuras.', { k: 8, t: '8 de 20' }],
        ['Generación tras generación aumentan.', { k: 15, t: '15 de 20' }],
        ['Ninguno cambió de color.', {}],
      ], 'Variación, herencia, más nacen y unos se reproducen más.'),
      xpHaz('hoja', 'Subraya la explicación **correcta** de por qué hoy hay más ratones de pelo grueso en el frío.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Les creció porque lo necesitaban.'], ['Los de pelo grueso sobrevivieron y tuvieron más crías.'], ['El frío les cambió los genes a todos.']], pista: '¿Cambia el individuo o la población?' }, 'La variación ya existía y fue seleccionada.')],
    ['Al azar y escogido',
      xpMira('hoja', 'Segunda idea: la mutación es **al azar**; el ambiente **selecciona**.', { paras: [['Mutación: aparece sin propósito'], ['Ambiente: favorece a unos'], ['Otro ambiente: favorece a otros'], ['«Se adaptó porque quería»']] }, [
        ['La mutación no la pide nadie.', { luz: [0], nota: { 0: 'al azar' } }],
        ['Luego el lugar decide cuál conviene.', { luz: [1], nota: { 1: 'selecciona' } }],
        ['En otra parte conviene lo contrario.', { luz: [2] }],
        ['Este es el error típico.', { luz: [3], tacha: [3] }],
        ['Estar adaptado es estarlo a un lugar.', { luz: [1, 2] }],
      ], 'Primero la variación; después, la selección.'),
      xpHaz('hoja', 'Pon al margen qué es cada cosa.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['selección', 'mutación'], meta: [1, 0], paras: [['Un cambio en el ADN de una cría'], ['Los peces rápidos escapan y se reproducen más']], pista: 'Alguna no va ahí: ¿aparece al azar o se favorece?' }, 'El ADN muta; los rápidos son seleccionados.')],
    ['Las pruebas',
      xpMira('hoja', 'Tercera idea: muchas **pruebas** apuntan a lo mismo.', { paras: [['Fósiles intermedios'], ['Mismos huesos en brazo, ala y aleta'], ['ADN parecido entre parientes'], ['Bacterias resistentes']] }, [
        ['La roca guarda formas de paso.', { luz: [0] }],
        ['Un mismo plan, acomodado distinto.', { luz: [1] }],
        ['Mientras más cercanos, más parecido.', { luz: [2] }],
        ['Y lo vemos ocurrir hoy.', { luz: [3], nota: { 3: 'ahora' } }],
        ['Por eso el antibiótico se toma completo.', { luz: [3] }],
      ], 'Roca, huesos, ADN y lo que pasa hoy.'),
      xpHaz('hoja', 'La aleta de la ballena y el ala del murciélago tienen los mismos huesos. Subraya lo que sugiere.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Tienen un antepasado común.'], ['Viven en el mismo lugar.'], ['Comen lo mismo.']], pista: 'Una nada y el otro vuela: ¿de dónde viene el plan?' }, 'Un mismo plan heredado, acomodado distinto.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'De 100 insectos, 5 resisten un veneno. Tras fumigar quedan 4 resistentes y 6 que no. Pon el porcentaje de resistentes antes y después.', { slots: fila('antes (%)', 'después (%)'), fichas: ['5', '40', '4', '10', '60'], meta: ['5', '40'], alto: 96, pista: 'Compara con el total de cada momento.' }, '5 de 100 y 4 de 10.')],
  ], 'Cambia la proporción, el ambiente escoge y hay pruebas.');
}
;
//#archivo js/explora-icf-cn-8-pasos.js
// Preicfes · Ciencias Naturales, mundo 8 «Herencia y Evolución», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  // Cromosoma en forma de X, con su letra (alelo) opcional.
  const crom = (x, y, c, et = '') => `<g transform="rotate(-14 ${x} ${y})"><rect x="${x - 4}" y="${y - 15}" width="8" height="30" rx="4" fill="${c}" stroke="#00000055"/></g>` +
    `<g transform="rotate(14 ${x} ${y})"><rect x="${x - 4}" y="${y - 15}" width="8" height="30" rx="4" fill="${c}" stroke="#00000055"/></g><circle cx="${x}" cy="${y}" r="3" fill="#ffffffaa"/>` +
    (et ? `<text x="${x}" y="${y + 30}" fill="#1d2328" font-size="11" font-weight="700" style="text-anchor:middle;font-family:Jost,sans-serif">${et}</text>` : '');
  // Papá, mamá e hija con sus pares de cromosomas; k: 1 pares, 3 la hija recibe uno de cada uno, 4 letras.
  const familia = (v, K) => {
    const k = v.k || 0, L = k >= 4;
    let s = X.persona(70, 166, 1, '#3f6fb5') + X.persona(140, 166, 1, '#b5517a') + X.persona(262, 166, 0.82, '#4f9a55');
    if (k >= 1) s += crom(60, 36, '#3d73c9', L ? 'A' : '') + crom(80, 36, '#8db8f2', L ? 'a' : '') + crom(130, 36, '#c9497a', L ? 'a' : '') + crom(150, 36, '#f2a3c0', L ? 'a' : '');
    if (k >= 2) s += X.flecha(60, 14, 246, 14) + X.flecha(160, 58, 268, 58);
    if (k >= 3) s += crom(252, 36, '#3d73c9', L ? 'A' : '') + crom(272, 36, '#c9497a', L ? 'a' : '');
    return X.foto(s + (v.r ? X.rot(170, 190, v.r, 'oscuro') : ''), 200, 'campo', 170);
  };
  // Cruce de prueba: un negro (NN si g = 0, Nn si g = 1) con un blanco nn; n casillas llenas.
  const prueba = (v, K) => {
    const P = v.g > 0.5 ? ['N', 'n'] : ['N', 'N'], u = 52, x = 118, y = 40;
    let h = '';
    for (let i = 0; i < 2; i++) {
      h += K.t(x + u * (i + 0.5), 32, P[i], 'b ta') + K.t(x - 14, y + u * (i + 0.5) + 5, 'n', 'b tg');
      for (let j = 0; j < 2; j++) { const k = i * 2 + j, g = P[j] + 'n'; h += K.r(x + u * j, y + u * i, u - 3, u - 3, v.n > k ? (g.includes('N') ? 'fa' : 'ff') : 'fn', 3) + K.f(v.n - k, K.t(x + u * (j + 0.5) - 2, y + u * (i + 0.5) + 4, g, 'b')); }
    }
    return h + K.t(170, 172, v.t || '', 'ta');
  };

  xpAmplia('icf-cn-herencia-1', {
    conecta: 'icf-cn-celula-3',
    desde: [
      ['Desde cero: qué se hereda',
        xpMira('dibujo', 'Antes de las letras: **heredar** es recibir de tus papás las instrucciones que arman tu cuerpo. Mira dónde están y cómo llegan.', { dib: familia, v: { k: 0, r: '' }, alto: 200 }, [
          ['En la lección del ADN viste que el ADN guarda las recetas para hacer proteínas.', { k: 0 }],
          ['Cada receta se llama gen: por ejemplo, la del color de los ojos.', { k: 1, r: 'gen: una receta' }],
          ['Los genes van en cromosomas, que vienen en pares.', { k: 1, r: 'cromosomas en pares' }],
          ['De cada par, la hija recibe uno del papá y uno de la mamá.', { k: 3, r: 'uno de cada uno' }],
          ['Las dos copias pueden ser versiones distintas: se llaman alelos.', { k: 4, r: 'alelos: A y a' }],
          ['Es como un recetario con dos copias de cada receta, una de cada familia.', { k: 4, r: 'dos copias' }],
        ], 'Gen: una receta. Alelo: una versión de esa receta. Recibes un alelo de cada progenitor.'),
        xpHaz('hoja', 'Subraya lo que es un **alelo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Una versión de un gen, como ojos café u ojos azules.'], ['Un cromosoma entero.'], ['Una célula del cuerpo.']], pista: 'El alelo es más pequeño que un cromosoma: es una de las formas de un mismo gen.' }, 'Un gen puede venir en versiones: esas son los alelos.')],
    ],
    despues: [
      ['Más difícil: el cruce de prueba',
        xpMira('dibujo', 'Un paso más: lo dominante **esconde** a lo recesivo. ¿Cómo saber qué letras tiene un animal que se ve dominante?', { dib: prueba, v: { g: 0, n: 0, t: '' }, alto: 184 }, [
          ['Un conejo negro puede ser NN o Nn: por fuera se ven iguales.', { t: '¿NN o Nn?' }],
          ['El truco: cruzarlo con uno blanco, nn, que solo puede dar n.', { t: 'cruce con nn' }],
          ['Si era NN, todas las crías salen Nn: negras.', { n: 4, t: 'NN: todas negras' }],
          ['Si era Nn, la mitad sale nn: blanca.', { g: 1, n: 4, t: 'Nn: la mitad blancas' }],
          ['Basta una cría blanca para saber que tenía una n escondida.', { g: 1, n: 4, t: 'una blanca lo delata' }],
        ], 'Para destapar el genotipo se cruza con un recesivo: si aparece lo recesivo, había una letra escondida.'),
        xpHaz('hoja', 'Una planta alta (T domina) se cruza con una enana (tt). Salen 50 altas y 48 enanas. Subraya el genotipo de la alta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['TT'], ['Tt'], ['tt']], pista: 'Las enanas recibieron una t de cada planta. ¿Pudo darla la alta?' }, 'Salen mitad y mitad: la alta era Tt.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se cruzan dos moscas de alas largas y nacen 300 de alas largas y 100 de alas cortas. ¿Qué se **concluye**?', { letras: ['A', 'B', 'C', 'D'], paras: [['Alas cortas es dominante, porque volvió a aparecer.'], ['Los dos padres son Aa: sale una corta de cada cuatro.'], ['Un padre es AA y el otro es aa.'], ['Es puro azar: con otros 400 hijos podría salir cualquier cosa.']] }, [
        ['Antes de leer opciones, saca tu cuenta: 300 a 100 es 3 a 1.', {}, '$300 \\div 100 = 3$'],
        ['La A invierte: lo que reaparece es lo recesivo que estaba escondido.', { luz: [0], nota: { 0: 'invierte' } }],
        ['La C no da cortas: AA con aa da todas Aa.', { luz: [2], nota: { 2: 'no cuadra' } }],
        ['La D olvida que con 400 hijos la proporción ya se cumple.', { luz: [3], nota: { 3: 'azar' } }],
        ['La B explica el 3 a 1: Aa con Aa.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Saca tu cuenta antes de leer: 3 a 1 dice que los dos padres esconden un recesivo.'),
      xpHaz('hoja', 'En el ganado, sin cuernos (S) domina. Un toro sin cuernos y una vaca con cuernos tienen 6 terneros sin cuernos. Subraya lo que tiene más apoyo.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['El toro es SS con total seguridad.'], ['El toro es ss.'], ['El toro quizá es SS, pero con 6 terneros no es seguro.'], ['La vaca es SS.']], pista: 'Con pocos terneros, una cría con cuernos pudo no salir por azar. Desconfía de «total seguridad».' }, 'Seis crías apuntan a SS, pero no lo prueban: con Ss, cada cría tenía 1 de 2 de salir sin cuernos.')],
    cierre: 'Dos alelos por gen, uno de cada padre; lo dominante esconde, y la proporción se lee en muchas crías.',
  });

  // Sábila con hijuelo a la izquierda; a la derecha dos flores y una abeja que lleva polen (a de 0 a 1).
  const abeja = (x, y) => `<ellipse cx="${x - 3}" cy="${y - 7}" rx="6" ry="4" fill="#e8f4fb" opacity=".85"/><ellipse cx="${x + 4}" cy="${y - 8}" rx="6" ry="4" fill="#e8f4fb" opacity=".85"/>` +
    `<ellipse cx="${x}" cy="${y}" rx="10" ry="6.5" fill="#f2c230" stroke="#6b4f12" stroke-width=".8"/><path d="M${x - 3} ${y - 6} V${y + 6} M${x + 3} ${y - 6} V${y + 6}" stroke="#2b2b2b" stroke-width="2.2"/><circle cx="${x + 10}" cy="${y - 1}" r="3.2" fill="#2b2b2b"/>`;
  const sabila = (x, y, s) => { let q = `<path d="M${x - 16 * s} ${y} H${x + 16 * s} L${x + 12 * s} ${y - 24 * s} H${x - 12 * s}Z" fill="url(#xlb-barro)"/>`; [-40, -20, 0, 20, 40].forEach((a, i) => { q += `<path d="M${x} ${y - 22 * s} Q${x + a * 0.9 * s} ${y - 50 * s} ${x + a * 1.1 * s} ${y - (66 - Math.abs(a) * 0.4) * s} Q${x + a * 0.5 * s} ${y - 40 * s} ${x + 4 * s} ${y - 22 * s}Z" fill="${i % 2 ? '#5f9a6a' : '#78b27f'}" stroke="#3d6b45" stroke-width=".7"/>`; }); return q; };
  const dosCaminos = (v, K) => {
    const k = v.k || 0, a = v.a || 0;
    let s = sabila(70, 168, 1) + (k >= 1 ? sabila(122, 168, 0.55) : '') + X.planta(232, 168, 58, 1, { flor: 1 }) + X.planta(306, 168, 50, 1, { flor: 1 });
    if (a > 0.01) { const bx = 238 + a * 64, by = 88 - Math.sin(a * Math.PI) * 30; s += abeja(bx, by) + `<circle cx="${bx - 6}" cy="${by + 8}" r="1.6" fill="#ffd23f"/><circle cx="${bx - 1}" cy="${by + 9}" r="1.6" fill="#ffd23f"/>`; }
    return X.foto(s + (v.r1 ? X.rot(90, 190, v.r1, 'oscuro') : '') + (v.r2 ? X.rot(262, 190, v.r2, 'oscuro') : ''), 200, 'campo', 172);
  };

  xpAmplia('icf-cn-herencia-2', {
    conecta: 'icf-cn-herencia-1',
    desde: [
      ['Desde cero: copiar o mezclar',
        xpMira('dibujo', 'Antes de las divisiones: todo ser vivo viene de otro. La pregunta es si viene de **uno** o de **dos**.', { dib: dosCaminos, v: { k: 0, a: 0, r1: '', r2: '' }, alto: 200 }, [
          ['En la lección anterior viste que recibes un alelo de cada progenitor.', { k: 0 }],
          ['Un progenitor es el ser vivo que da origen a otro.', { k: 0 }],
          ['La sábila saca hijuelos: una sola planta, hijas iguales a ella.', { k: 1, r1: 'un progenitor' }],
          ['Es como sacar fotocopias: reproducción asexual.', { k: 1, r1: 'asexual: copias' }],
          ['La abeja lleva polen de una flor a otra: hay dos progenitores.', { k: 1, a: 1, r1: 'asexual: copias', r2: 'dos progenitores' }],
          ['El polen lleva la célula sexual masculina; el óvulo es la femenina: son gametos.', { k: 1, a: 1, r1: 'asexual: copias', r2: 'gametos' }],
          ['Es como barajar dos mazos: reproducción sexual, hijos variados.', { k: 1, a: 1, r1: 'asexual: copias', r2: 'sexual: mezcla' }],
        ], 'Asexual: un progenitor, copias. Sexual: dos progenitores que aportan gametos, hijos variados.'),
        xpHaz('hoja', 'Subraya qué es un **gameto**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Una célula sexual con la mitad de los cromosomas, como el óvulo.'], ['Un hijo recién nacido.'], ['Una célula cualquiera de la piel.']], pista: 'El gameto es la célula que se une con otra para formar un hijo.' }, 'Óvulo y espermatozoide: gametos con la mitad.')],
    ],
    despues: [
      ['Más difícil: contar cromosomas en cada paso',
        xpMira('fichas', 'Un paso más: te preguntan cuántos cromosomas hay en **cada célula** del ciclo. La trampa es duplicar o dividir donde no toca.', { slots: [{ x: 70, y: 46, w: 84, et: 'piel' }, { x: 170, y: 46, w: 84, et: 'gameto' }, { x: 270, y: 46, w: 84, et: 'cigoto' }], fichas: ['38', '19', '38'], alto: 96 }, [
          ['Una célula de la piel de un gato tiene 38 cromosomas.', { pon: { 0: '38' } }],
          ['La mitosis copia: cada célula nueva de piel también tiene 38.', {}],
          ['La meiosis reparte: cada gameto lleva 19.', { pon: { 1: '19' } }, '$38 \\div 2 = 19$'],
          ['Dos gametos se unen: el cigoto vuelve a 38.', { pon: { 2: '38' } }, '$19 + 19 = 38$'],
          ['Así el número no se duplica en cada generación.', {}],
        ], 'Mitosis: el mismo número. Meiosis: la mitad. Fecundación: se suman dos mitades.'),
        xpHaz('hoja', 'Por un error en la meiosis, un óvulo humano lleva 24 cromosomas. Lo fecunda un espermatozoide normal, de 23. Subraya los del cigoto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['46'], ['47'], ['48']], pista: 'Suma lo que trae cada gameto, sin suponer que todo salió normal.' }, '$24 + 23 = 47$: un cromosoma de más.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un vivero propaga rosas solo por esquejes, pedazos de tallo. ¿Las hijas tendrán flores de otro color que la madre? Mira las opciones «Sí/No, porque…».', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque cada esqueje mezcla genes de dos plantas.'], ['Sí, porque el ambiente del vivero cambia sus genes.'], ['No, porque vienen de un solo progenitor y copian sus genes por mitosis.'], ['No, porque las rosas no tienen genes del color.']] }, [
        ['Decide primero el Sí o el No con lo que sabes: es asexual.', {}],
        ['La A describe la reproducción sexual, no el esqueje.', { luz: [0], nota: { 0: 'otra cosa' } }],
        ['La B suena científica, pero el ambiente no reescribe genes así.', { luz: [1], nota: { 1: 'suena bien' } }],
        ['La D dice No, pero con una razón falsa.', { luz: [3], nota: { 3: 'razón falsa' } }],
        ['La C tiene el No y también la razón buena.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'En «Sí/No, porque…» decide primero con tu cuenta y luego revisa que la razón también sea cierta.'),
      xpHaz('hoja', 'Las bacterias se reproducen partiéndose en dos. Aun así aparecen bacterias distintas. Subraya **por qué**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Porque se aparean de dos en dos.'], ['Porque a veces hay errores al copiar el ADN: mutaciones.'], ['Porque la meiosis las mezcla.'], ['Porque crecen muy rápido.']], pista: 'Sin pareja no hay mezcla. Piensa qué puede cambiar al copiar.' }, 'Las mutaciones dan variedad aunque haya un solo progenitor.')],
    cierre: 'Uno o dos progenitores; la mitosis copia, la meiosis reduce a la mitad, y la variedad protege.',
  });

  // Peces variados en un río; una red (red de 0 a 1) se lleva los grandes (q de 0 a 1); g = 1 la generación siguiente.
  const PECES = [[50, 60, 1.3, '#f39c32'], [120, 92, 0.7, '#e8d44d'], [200, 52, 1.1, '#d9643a'], [272, 100, 0.6, '#f0b35a'], [80, 140, 0.65, '#c9a23a'], [176, 132, 1.25, '#f39c32'], [252, 150, 0.75, '#e07b39'], [300, 58, 0.9, '#f2c14e']];
  const HIJOS = [[50, 64, 0.62, '#e8d44d'], [112, 100, 0.7, '#f0b35a'], [196, 56, 0.66, '#c9a23a'], [276, 96, 0.6, '#e07b39'], [80, 140, 0.72, '#f2c14e'], [170, 134, 0.95, '#d9643a'], [250, 150, 0.64, '#e8d44d'], [302, 60, 0.68, '#f0b35a']];
  const rio = (v, K) => {
    let s = '';
    if ((v.g || 0) < 0.5) PECES.forEach(([x, y, e, c]) => { const op = e >= 0.9 ? 1 - (v.q || 0) : 1; if (op > 0.02) s += `<g opacity="${op.toFixed(2)}">${X.pez(x, y, e, c)}</g>`; });
    else HIJOS.forEach(([x, y, e, c]) => { s += X.pez(x, y, e, c); });
    if ((v.red || 0) > 0.01) { let m = ''; for (let x = 150; x <= 340; x += 22) m += `<path d="M${x} 0 V200" stroke="#7a5230" stroke-width="1.6"/>`; for (let y = 10; y <= 200; y += 22) m += `<path d="M150 ${y} H340" stroke="#7a5230" stroke-width="1.6"/>`; s += `<g opacity="${(0.8 * v.red).toFixed(2)}">${m}</g>`; }
    return X.foto(s + (v.r ? X.rot(170, 188, v.r) : ''), 200, 'agua');
  };
  // Porcentaje de peces pequeños por generación, dibujado hasta la generación x.
  const PCT = [20, 35, 55, 70, 78, 80];
  const curva = (v, K) => {
    const X0 = 50, Y0 = 150, gx = i => X0 + i * 50, gy = p => Y0 - p * 1.2, x = Math.max(0, Math.min(5, v.x || 0));
    let h = K.l(X0, Y0, 310, Y0, 'lm') + K.l(X0, Y0, X0, 20, 'lm') + K.t(X0 - 6, gy(100) + 4, '100', 's tm', 'end') + K.t(X0 - 6, gy(50) + 4, '50', 's tm', 'end') + K.t(X0 - 6, Y0 + 4, '0', 's tm', 'end') +
      K.l(X0, gy(50), 310, gy(50), 'ls d') + K.t(180, Y0 + 18, 'generación', 's tm') + K.t(X0 + 4, 16, '% de peces pequeños', 's tm', 'start');
    const pts = []; for (let i = 0; i <= Math.floor(x); i++) pts.push([gx(i), gy(PCT[i])]);
    const f = x - Math.floor(x); if (f > 0.01 && x < 5) { const i = Math.floor(x); pts.push([gx(i + f), gy(PCT[i] + (PCT[i + 1] - PCT[i]) * f)]); }
    if (pts.length > 1) h += K.pl(pts, 'la gr');
    pts.forEach(p => { h += K.c(p[0], p[1], 4, 'fA'); });
    return h + K.t(180, 188, v.t || '', 'ta');
  };

  xpAmplia('icf-cn-herencia-3', {
    conecta: 'icf-cn-herencia-2',
    desde: [
      ['Desde cero: una población que cambia',
        xpMira('dibujo', 'Antes de Darwin: una **población** cambia cuando algo hace que unos tengan más crías que otros. Mira un río.', { dib: rio, v: { red: 0, q: 0, g: 0, r: '' }, alto: 200 }, [
          ['En la lección anterior viste que la reproducción sexual da hijos variados.', {}],
          ['Una población son todos los de una especie que viven en un lugar.', { r: 'población' }],
          ['Estos peces no son iguales: unos grandes, otros pequeños. Es la variación.', { r: 'variación' }],
          ['Llega una red con huecos grandes: atrapa a los grandes.', { red: 1, r: 'la red escoge' }],
          ['Los pequeños escapan y tienen más crías.', { red: 1, q: 1, r: 'sobreviven los pequeños' }],
          ['Años después la población tiene más peces pequeños.', { red: 0, q: 1, g: 1, r: 'cambió la población' }],
          ['Ningún pez se encogió: cambió cuántos hay de cada tipo.', { red: 0, q: 1, g: 1, r: 'selección' }],
        ], 'Variación, algo que escoge y herencia: cambia la población, no cada individuo.'),
        xpHaz('hoja', 'Subraya lo que es una **población**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Todos los peces de una misma especie que viven en un río.'], ['Un solo pez muy grande.'], ['Todos los animales del planeta.']], pista: 'Población: una especie, un lugar, muchos individuos.' }, 'Misma especie y mismo lugar: una población.')],
    ],
    despues: [
      ['Más difícil: leer la gráfica del cambio',
        xpMira('dibujo', 'Un paso más: el cambio se muestra en una **gráfica**. Mira el punto de partida, cómo sube y dónde se aplana.', { dib: curva, v: { x: 0, t: '' }, alto: 198 }, [
          ['La gráfica cuenta el porcentaje de peces pequeños en cada generación.', { x: 0, t: 'empieza en 20 %' }],
          ['Primero sube rápido: la red sigue escogiendo.', { x: 3, t: 'sube' }],
          ['Después casi no cambia: ya casi todos son pequeños.', { x: 5, t: 'se aplana cerca de 80 %' }],
          ['Mira dónde empieza: no arranca en cero, ya había pequeños.', { x: 5, t: 'la variación ya existía' }],
          ['Si se deja de pescar así, la ventaja desaparece y puede bajar.', { x: 5, t: 'sin red, sin ventaja' }],
        ], 'En la gráfica: punto de partida, subida y meseta. Lo que se favorece depende de lo que escoge.'),
        xpHaz('hoja', 'Si se prohíbe pescar con esa red, subraya lo que se espera con **más sentido**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Que el porcentaje de pequeños siga subiendo siempre.'], ['Que ser pequeño deje de dar ventaja y el porcentaje pueda bajar.'], ['Que los peces pequeños crezcan de golpe.']], pista: 'Sin la red, ¿qué escoge ahora a unos más que a otros?' }, 'Sin la presión que escogía, el rasgo ya no tiene ventaja.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Hoy casi todos los colibríes de una isla tienen pico largo, que alcanza el néctar de flores hondas. ¿Qué **explica** mejor el cambio?', { letras: ['A', 'B', 'C', 'D'], paras: [['Estiraron el pico al comer y se lo heredaron a sus crías.'], ['Los de pico largo comían mejor, tenían más crías y les heredaban el rasgo.'], ['Las flores cambiaron los genes de todos para que comieran mejor.'], ['Los colibríes decidieron tener crías de pico largo.']] }, [
        ['Busca la opción con variación, ventaja y herencia.', {}],
        ['La A: lo que se estira en vida no pasa a los genes.', { luz: [0], nota: { 0: 'no se hereda' } }],
        ['La C: el ambiente escoge, pero no fabrica mutaciones a la medida.', { luz: [2], nota: { 2: 'suena bien' } }],
        ['La D le pone intención: nadie decide sus genes.', { luz: [3], nota: { 3: 'intención' } }],
        ['La B tiene las tres piezas: esa es la selección natural.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Desconfía de «se estiró», «lo necesitaba» o «decidió»: la selección escoge entre lo que ya varía.'),
      xpHaz('hoja', 'Un herbicida mataba casi toda la maleza de una finca; años después casi no hace efecto. Subraya la **mejor** explicación.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['El herbicida le enseñó a la maleza a resistir.'], ['La maleza se volvió resistente porque lo necesitaba.'], ['Todas las plantas mutaron a la vez el mismo día.'], ['Las pocas que ya resistían sobrevivieron y se multiplicaron.']], pista: 'La resistencia tuvo que existir antes del herbicida, en unas pocas.' }, 'El herbicida no crea la resistencia: deja vivas a las que ya la tenían.')],
    cierre: 'Hay variación, el ambiente escoge y se hereda: así cambia la población, y fósiles, huesos y ADN lo muestran.',
  });
}
;
//#archivo js/explora-icf-cn-9.js
// Preicfes · Ciencias Naturales, mundo 9 «Reacciones y Cantidades» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // 2 CO + O2 → 2 CO2 con bolas: a moléculas de CO, b de O2, z de CO2.
  const C = (K, x, y) => K.c(x, y, 9, 'ff'), O = (K, x, y) => K.c(x, y, 9, 'fa');
  const bolas = (v, K) => Array.from({ length: 2 }, (_, i) => K.f(v.a - i, C(K, 40, 50 + i * 50) + O(K, 57, 50 + i * 50)) + K.f(v.z - i, O(K, 246, 50 + i * 50) + C(K, 263, 50 + i * 50) + O(K, 280, 50 + i * 50))).join('') + K.f(v.b, O(K, 118, 75) + O(K, 135, 75)) + K.l(164, 75, 206, 75, 'gr') + K.l(206, 75, 198, 69, 'gr') + K.l(206, 75, 198, 81, 'gr') + K.t(170, 150, v.t, 'ta');
  // Recetas: p de A (2 por receta), q de B (1 por receta), n recetas usadas.
  const receta = (v, K) => Array.from({ length: 8 }, (_, i) => K.c(50 + i * 32, 46, 11, i < v.n * 2 ? 'ff' : 'fa')).join('') + Array.from({ length: 5 }, (_, i) => K.r(40 + i * 32, 86, 20, 20, i < v.n ? 'ff' : 'fg', 3)).join('') + K.t(20, 22, 'A', 'b') + K.t(20, 101, 'B', 'b') + K.t(170, 150, v.t, 'ta');
  // Escala de pH con una marca.
  const escala = (v, K) => Array.from({ length: 15 }, (_, i) => K.r(21 + i * 20, 60, 18, 28, i < 7 ? 'ff' : i > 7 ? 'fg' : 'fc', 2) + K.t(30 + i * 20, 80, i, 's')).join('') + K.c(30 + v.h * 20, 44, 7, 'fF') + K.t(170, 124, v.t, 'ta');

  xpLec('icf-cn-reacciones-1', [
    ['Físico o químico',
      xpMira('hoja', 'Empecemos por la idea: en una **reacción** aparecen sustancias **nuevas**.', { paras: [['Se parte un vaso'], ['Se evapora alcohol'], ['Arde un fósforo'], ['Se pudre una fruta']] }, [
        ['El vaso roto sigue siendo vidrio.', { luz: [0], nota: { 0: 'físico' } }],
        ['El vapor sigue siendo alcohol.', { luz: [1], nota: { 1: 'físico' } }],
        ['Salen gases y ceniza: algo nuevo.', { luz: [2], nota: { 2: 'químico' } }],
        ['También aparecen sustancias nuevas.', { luz: [3], nota: { 3: 'químico' } }],
        ['Gas, color o calor son pistas, no pruebas.', {}],
      ], 'Misma sustancia: físico. Sustancia nueva: químico.'),
      xpHaz('hoja', 'Subraya el cambio **químico**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Moler café'], ['Fermentar jugo de uva'], ['Congelar agua']], pista: '¿Dónde aparece algo que no estaba?' }, 'Al fermentar aparece alcohol.')],
    ['Los átomos se reacomodan',
      xpMira('dibujo', 'Segunda idea: los átomos **no se crean ni se destruyen**.', { dib: bolas, v: { a: 1, b: 1, z: 0, t: 'CO + O₂ → CO₂' }, alto: 164 }, [
        ['Un carbono con un oxígeno, y un par de oxígenos.', {}],
        ['Si sale una molécula, sobra un oxígeno.', { z: 1, t: 'antes 3 oxígenos, después 2' }],
        ['Se pone otra molécula a la izquierda.', { a: 2, t: '2CO + O₂ → ?' }],
        ['Ahora salen dos y todo cuadra.', { z: 2, t: '2CO + O₂ → 2CO₂' }],
        ['Dos carbonos y cuatro oxígenos en cada lado.', {}],
      ], 'Los mismos átomos antes y después.'),
      xpHaz('fichas', 'Balancea: ? Na + Cl₂ → ? NaCl. Pon los dos números.', { slots: fila('Na', 'NaCl'), fichas: ['2', '2', '1', '3', '4'], meta: ['2', '2'], alto: 96, pista: 'El par de cloros necesita dos sodios.' }, '$2Na + Cl_2 \\to 2NaCl$.')],
    ['La masa no cambia',
      xpMira('fichas', 'Tercera idea: en un recipiente **cerrado** la masa es la misma.', { slots: fila('reactivos', 'sólido', 'gas'), fichas: ['50', '28', '22'], alto: 96 }, [
        ['Se calientan 50 gramos de un mineral.', { pon: { 0: '50' } }],
        ['Queda un sólido de 28 gramos.', { pon: { 1: '28' } }],
        ['Lo que falta se fue como gas.', { pon: { 2: '22' } }, '$50 - 28 = 22$'],
        ['Con tapa, la balanza no cambia.', {}],
        ['Y si se une oxígeno del aire, pesa más.', {}],
      ], 'Entra lo mismo que sale.'),
      xpHaz('fichas', 'Se queman 12 g de carbono y salen 44 g de gas. Pon el oxígeno que se unió y el total de reactivos.', { slots: fila('oxígeno', 'reactivos'), fichas: ['32', '44', '56', '12', '28'], meta: ['32', '44'], alto: 96, pista: 'Los reactivos juntos pesan lo que el gas.' }, '$44 - 12 = 32$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Una lana de acero se quema en una balanza al aire y pesa **más**. Subraya la explicación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El fuego pesa'], ['Se crearon átomos'], ['Se le unió oxígeno del aire']], pista: '¿De dónde pueden venir esos átomos?' }, 'El oxígeno que se unió ya estaba en el aire.')],
  ], 'Algo nuevo, los mismos átomos y la misma masa.');

  xpLec('icf-cn-reacciones-2', [
    ['El mol',
      xpMira('fichas', 'Empecemos por la idea: el **mol** es un paquete; su masa se **suma** con los átomos.', { slots: fila('C', 'O₂', 'CO₂'), fichas: ['12', '32', '44'], alto: 96 }, [
        ['Un mol de carbono pesa 12 gramos.', { pon: { 0: '12' } }],
        ['Dos oxígenos de 16 pesan 32.', { pon: { 1: '32' } }, '$2 \\cdot 16 = 32$'],
        ['Juntos, un mol pesa 44 gramos.', { pon: { 2: '44' } }, '$12 + 32 = 44$'],
        ['Con 88 gramos hay dos moles.', {}, '$88 \\div 44 = 2$'],
        ['Mismo número de partículas, distinta masa.', {}],
      ], 'Gramos entre masa molar: moles.'),
      xpHaz('fichas', 'Con H = 1, C = 12: pon la masa de un mol de CH₄ y los moles que hay en 48 g.', { slots: fila('un mol (g)', 'moles'), fichas: ['16', '3', '13', '4', '48'], meta: ['16', '3'], alto: 96, pista: 'Suma un carbono y cuatro hidrógenos.' }, '$12 + 4 = 16$ y $48 \\div 16 = 3$.')],
    ['La receta',
      xpMira('hoja', 'Segunda idea: los coeficientes son la **receta**, en moles.', { paras: [['2Al + 3Cl₂ → 2AlCl₃'], ['2 de Al piden 3 de Cl₂'], ['4 de Al piden 6 de Cl₂'], ['y dan 4 de AlCl₃'], ['«2 gramos piden 3 gramos»']] }, [
        ['Esta es la ecuación balanceada.', { luz: [0] }],
        ['Se lee como una receta.', { luz: [1] }],
        ['Con el doble, todo se duplica.', { luz: [2] }],
        ['También lo que sale.', { luz: [3] }],
        ['No se lee en gramos: son moles.', { luz: [4], tacha: [4] }],
      ], 'Cuántas veces se hace la receta.'),
      xpHaz('fichas', 'En 4Fe + 3O₂ → 2Fe₂O₃, con 8 moles de Fe, pon los de O₂ y los de Fe₂O₃.', { slots: fila('O₂', 'Fe₂O₃'), fichas: ['6', '4', '3', '2', '8'], meta: ['6', '4'], alto: 96, pista: '8 es el doble de 4.' }, 'Receta doble: 6 y 4.')],
    ['El que limita',
      xpMira('dibujo', 'Tercera idea: el que se **acaba primero** decide cuánto sale.', { dib: receta, v: { n: 0, t: 'cada receta: 2 de A y 1 de B' }, alto: 164 }, [
        ['Hay ocho de A y cinco de B.', {}],
        ['Cada receta gasta dos de A y uno de B.', { n: 1 }],
        ['Ya van tres recetas completas.', { n: 3 }],
        ['A la cuarta se acaba A.', { n: 4, t: 'A se acabó; sobra 1 de B' }],
        ['A limita, aunque había más de A que de B.', {}],
      ], 'Divide lo que hay entre lo que pide la receta.'),
      xpHaz('hoja', 'La receta pide 3 de P y 2 de Q. Hay 12 de P y 10 de Q. Subraya el que limita.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['P'], ['Q'], ['Ninguno']], pista: 'Cuenta cuántas recetas permite cada uno.' }, 'P permite 4 recetas; Q, 5.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Se esperaban 60 g y se obtuvieron 45 g. Pon lo que faltó y el rendimiento en %.', { slots: fila('faltó (g)', 'rendimiento'), fichas: ['15', '75', '25', '45', '133'], meta: ['15', '75'], alto: 96, pista: 'Divide lo obtenido entre lo esperado.' }, '$45 \\div 60 = 0.75$.')],
  ], 'Paquetes, receta y el que se acaba.');

  xpLec('icf-cn-reacciones-3', [
    ['La escala',
      xpMira('dibujo', 'Empecemos por la idea: el **pH** dice qué tan ácida o básica es una disolución.', { dib: escala, v: { h: 7, t: 'neutra' }, alto: 136 }, [
        ['En la mitad está el 7: neutra.', {}],
        ['El vinagre tiene cerca de 3: ácido.', { h: 3, t: 'ácida' }],
        ['Un limpiador de hornos llega a 13: básico.', { h: 13, t: 'básica' }],
        ['A menor pH, más iones H⁺.', { h: 2, t: 'muchos H⁺' }],
        ['A mayor pH, menos.', { h: 11, t: 'pocos H⁺' }],
      ], 'Menos de 7 ácida; más de 7 básica.'),
      xpHaz('dibujo', 'Arrastra la marca a un pH **neutro**.', { dib: escala, v: { h: 4, t: '' }, metas: { h: 7 }, manijas: [{ k: 'h', min: 0, max: 14, paso: 1, et: 'pH' }], alto: 190, pista: 'Es el punto medio de la escala.' }, 'El 7 es neutro.')],
    ['Por diez',
      xpMira('hoja', 'Segunda idea: cada paso de pH es **por diez**.', { paras: [['pH 6: 1 parte de H⁺'], ['pH 5: 10 partes'], ['pH 4: 100 partes'], ['«pH 4 es dos más que pH 6»']] }, [
        ['Tomemos la de pH 6 como una parte.', { luz: [0] }],
        ['Un paso más ácida: diez veces.', { luz: [1] }],
        ['Dos pasos: cien veces.', { luz: [2] }, '$10 \\cdot 10 = 100$'],
        ['No se restan: se multiplican dieces.', { luz: [3], tacha: [3] }],
        ['Pequeños cambios de pH son grandes.', {}],
      ], 'Cuenta los pasos: un diez por cada uno.'),
      xpHaz('hoja', 'P tiene pH 8 y Q, pH 5. Subraya cuántas veces más H⁺ tiene Q.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['3'], ['30'], ['1 000']], pista: 'Son tres pasos.' }, '$10 \\cdot 10 \\cdot 10$.')],
    ['Neutralizar y diluir',
      xpMira('hoja', 'Tercera idea: **neutralizar** no es lo mismo que **diluir**.', { paras: [['Ácido + base → agua + sal'], ['Ácido + agua → menos ácido'], ['Con base de más: básica'], ['Con agua de más: se acerca a 7']] }, [
        ['Los H⁺ y los OH⁻ forman agua.', { luz: [0], nota: { 0: 'neutralizar' } }],
        ['Aquí solo se reparten más.', { luz: [1], nota: { 1: 'diluir' } }],
        ['Si se pasa, cambia de lado.', { luz: [2] }],
        ['Con agua nunca cambia de lado.', { luz: [3] }],
        ['Ante un ácido fuerte, siempre con cuidado.', {}],
      ], 'Con base se puede pasar de 7; con agua, no.'),
      xpHaz('hoja', 'Pon al margen qué se hizo.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['diluir', 'neutralizar'], meta: [1, 0], paras: [['Echar bicarbonato a un jugo ácido'], ['Echarle agua al jugo ácido']], pista: 'Alguna no va ahí: ¿se agregó una base o agua?' }, 'Con base se neutraliza; con agua se diluye.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un cultivo necesita pH entre 6 y 7; el suelo tiene 8.5. Subraya lo que conviene agregar.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Cal, que es básica'], ['Un abono ácido'], ['Jabón']], pista: '¿Hacia qué lado hay que moverlo?' }, 'Está básico: hay que bajarlo con algo ácido.')],
  ], 'La escala, por diez y neutralizar.');
}
;
//#archivo js/explora-icf-cn-9-pasos.js
// Preicfes · Ciencias Naturales, mundo 9 «Reacciones y Cantidades», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const r2 = x => Math.round(x * 100) / 100;

  // Pastilla efervescente que cae (c de 0 a 1) en un vaso, burbujea (b) y se deshace (d); un clavo que se oxida (o).
  const pastilla = (v, K) => {
    const c = v.c || 0, d = v.d || 0, o = v.o || 0, y = 40 + c * 92, rr = 13 * (1 - d * 0.85);
    let s = X.vaso(120, 166, 84, 104, 0.65, 'agua', { burbujas: Math.round((v.b || 0) * 16) });
    if (rr > 1.5) s += `<ellipse cx="120" cy="${r2(y)}" rx="${r2(rr)}" ry="${r2(rr * 0.4)}" fill="#f7f7f2" stroke="#b9b6aa"/>`;
    if ((v.b || 0) > 0.5) for (let i = 0; i < 6; i++) s += `<circle cx="${100 + i * 8}" cy="${92 - (i % 3) * 7}" r="1.8" fill="none" stroke="#ffffff" stroke-width=".9"/>`;
    s += `<path d="M232 158 L300 150" stroke="#6f787e" stroke-width="7" stroke-linecap="round"/><path d="M232 158 L300 150" stroke="url(#xlb-metal)" stroke-width="5" stroke-linecap="round"/><rect x="296" y="142" width="7" height="18" rx="2" fill="#8d969c" transform="rotate(-7 300 151)"/>`;
    if (o > 0.01) s += `<path d="M236 157 L298 150" stroke="#a0522d" stroke-width="6" stroke-linecap="round" opacity="${r2(0.9 * o)}" stroke-dasharray="7 3"/>`;
    return X.foto(s + (v.r ? X.rot(250, 40, v.r, 'oscuro') : ''), 200, 'lab');
  };
  // Matraz con agua y pastilla sobre una balanza; con tapón (tap) el gas no sale. l = lectura.
  const balanza = (v, K) => {
    const tap = (v.tap || 0) > 0.5, b = (v.b || 0) > 0.5;
    let s = X.balanza(170, 168, v.l || '0.0 g') + X.matraz(170, 146, 0.9, 0.4, 'agua', { tapon: tap, burbujas: b ? 7 : 0 });
    if (b && !tap) s += `<circle cx="166" cy="62" r="2.4" fill="none" stroke="#fff"/><circle cx="174" cy="50" r="3" fill="none" stroke="#fff"/><circle cx="168" cy="38" r="3.4" fill="none" stroke="#fff"/>` + X.flecha(196, 64, 220, 30);
    return X.foto(s + (v.r ? X.rot(270, 40, v.r, 'oscuro') : ''), 200, 'lab');
  };

  xpAmplia('icf-cn-reacciones-1', {
    conecta: 'icf-cn-atomo-2',
    desde: [
      ['Desde cero: qué es una reacción',
        xpMira('dibujo', 'Antes de las ecuaciones: una **reacción química** es cuando unas sustancias se convierten en otras distintas. Se nota en el vaso.', { dib: pastilla, v: { c: 0, b: 0, d: 0, o: 0, r: '' }, alto: 200 }, [
          ['En la lección de enlaces viste que los átomos se unen regalando o compartiendo electrones.', {}],
          ['Una pastilla efervescente cae al agua.', { c: 1 }],
          ['Salen burbujas de un gas que no estaba: dióxido de carbono.', { c: 1, b: 1, d: 0.5, r: 'gas nuevo' }],
          ['Los átomos de la pastilla rompen sus enlaces y se unen de otra forma.', { c: 1, b: 1, d: 1, r: 'enlaces nuevos' }],
          ['Lo que entra se llama reactivo; lo que sale, producto.', { c: 1, b: 1, d: 1, r: 'reactivos → productos' }],
          ['El clavo que se oxida también es una reacción, solo que lenta.', { c: 1, b: 1, d: 1, o: 1, r: 'óxido: sustancia nueva' }],
        ], 'Reacción: los átomos rompen enlaces y forman otros. Entran reactivos, salen productos nuevos.'),
        xpHaz('hoja', 'Pon al margen qué es cada cosa en la pastilla que burbujea.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['reactivo', 'producto'], meta: [1, 0], paras: [['El gas de las burbujas'], ['La pastilla antes de caer']], pista: 'Alguna no va ahí: ¿estaba antes o apareció después?' }, 'La pastilla entra; el gas sale.')],
    ],
    despues: [
      ['Más difícil: abierto o cerrado',
        xpMira('dibujo', 'Un paso más: se compara una reacción **abierta** con una **cerrada** sobre una balanza. La diferencia es si el gas escapa.', { dib: balanza, v: { tap: 0, b: 0, l: '150.0 g', r: '' }, alto: 200 }, [
          ['Matraz abierto con agua y una pastilla: la balanza marca 150.0 g.', { tap: 0, b: 0, l: '150.0 g' }],
          ['Burbujea y el gas se escapa por la boca.', { b: 1, l: '149.2 g' }],
          ['Baja la lectura, pero la materia no se destruyó: se fue al aire.', { b: 1, l: '149.2 g', r: 'el gas salió' }],
          ['Se repite con tapón: el gas queda adentro.', { tap: 1, b: 1, l: '150.0 g', r: 'nada sale' }],
          ['Con todo encerrado, la masa no cambia: se conserva.', { tap: 1, b: 1, l: '150.0 g', r: 'masa igual' }],
        ], 'Si un gas escapa, la balanza baja; con todo cerrado, la masa se conserva.'),
        xpHaz('fichas', 'En un frasco cerrado se mezclan 80 g de reactivos y sale gas. Pon la masa final cerrado, y la que marca abierto si escapan 6 g.', { slots: fila('cerrado', 'abierto'), fichas: ['80', '74', '86', '6', '0'], meta: ['80', '74'], alto: 96, pista: 'Cerrado no sale nada; abierto, resta lo que escapó.' }, 'Cerrado: 80 g. Abierto: $80 - 6 = 74$ g.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una vela encendida en un plato pesa 30 g al empezar y 21 g al apagarse. ¿Qué conclusión es **correcta**?', { letras: ['A', 'B', 'C', 'D'], paras: [['Se destruyeron 9 g de materia.'], ['Fue un cambio físico, porque la vela solo se derritió.'], ['La parafina que falta se volvió gases que salieron al aire.'], ['La vela pesa menos porque el fuego la empujó hacia arriba.']] }, [
        ['Recuerda: la masa no se destruye, pero puede escaparse.', {}],
        ['La A contradice la conservación de la masa.', { luz: [0], nota: { 0: 'imposible' } }],
        ['La B mira solo la cera derretida; la que ardió formó gases nuevos.', { luz: [1], nota: { 1: 'incompleta' } }],
        ['La D suena a física, pero no explica la masa que falta.', { luz: [3], nota: { 3: 'suena bien' } }],
        ['La C: se formaron dióxido de carbono y vapor que se fueron.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'Si la masa baja en un sistema abierto, busca qué gas se escapó.'),
      xpHaz('hoja', 'Se disuelve azúcar en agua y nada nuevo aparece; se calienta azúcar sola y queda un carbón negro. Subraya lo **correcto**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Los dos son químicos, porque el azúcar desaparece.'], ['Disolver es químico, porque ya no se ve el azúcar.'], ['Disolver es físico; calentar hasta carbón es químico.'], ['Calentar es físico, porque solo cambia el color.']], pista: 'Pregunta en cada caso si apareció una sustancia que no estaba.' }, 'El azúcar disuelto sigue siendo azúcar; el carbón es nuevo.')],
    cierre: 'Sustancias nuevas, los mismos átomos reacomodados y la misma masa si nada se escapa.',
  });

  // Cartón de huevos, balanza con carbón (k = 2) o con hierro (k = 3).
  const paquetes = (v, K) => {
    const k = v.k || 0;
    let s = '';
    if (k >= 1) { s += `<path d="M22 150 H118 L112 166 H28Z" fill="#b9ad97" stroke="#7d7360"/>`; for (let i = 0; i < 12; i++) s += `<ellipse cx="${30 + (i % 6) * 15}" cy="${146 - Math.floor(i / 6) * 9}" rx="6.5" ry="8" fill="#f3e3c3" stroke="#c9b48c" stroke-width=".7"/>`; }
    s += X.balanza(220, 168, v.l || '0.0 g');
    if (k >= 2 && k < 3) s += `<path d="M190 146 Q220 120 250 146Z" fill="#2b2b2b"/><path d="M200 140 Q215 130 226 138" stroke="#555" fill="none"/>`;
    if (k >= 3) for (let i = 0; i < 6; i++) s += `<path d="M${194 + i * 9} 146 L${200 + i * 9} 118" stroke="#6f787e" stroke-width="4" stroke-linecap="round"/><path d="M${194 + i * 9} 146 L${200 + i * 9} 118" stroke="url(#xlb-metal)" stroke-width="2.6"/>`;
    return X.foto(s + (v.r ? X.rot(170, 34, v.r, 'oscuro') : ''), 200, 'mesa', 168);
  };

  xpAmplia('icf-cn-reacciones-2', {
    conecta: 'icf-cn-reacciones-1',
    desde: [
      ['Desde cero: contar por paquetes',
        xpMira('dibujo', 'Antes de las cuentas: los químicos cuentan átomos **por paquetes**, como los huevos por docenas. Ese paquete se llama **mol**.', { dib: paquetes, v: { k: 0, l: '0.0 g', r: '' }, alto: 200 }, [
          ['En la lección anterior viste que una ecuación se balancea contando átomos.', {}],
          ['Los huevos se cuentan por docenas: un paquete de 12.', { k: 1, r: '1 docena = 12 huevos' }],
          ['Los átomos son tantos que se cuentan por moles, un paquete gigante.', { k: 1, r: '1 mol ≈ 6 · 10²³ partículas' }],
          ['Un mol de carbono pesa 12 gramos.', { k: 2, l: '12.0 g', r: '1 mol de carbono' }],
          ['Un mol de hierro pesa casi 56 gramos: sus átomos pesan más.', { k: 3, l: '55.8 g', r: '1 mol de hierro' }],
          ['Mismo número de partículas, distinta masa: cada átomo pesa diferente.', { k: 3, l: '55.8 g', r: 'igual número, otra masa' }],
        ], 'Un mol es un paquete con el mismo número de partículas; su masa en gramos sale de sumar los átomos.'),
        xpHaz('hoja', 'Subraya lo que tienen **igual** un mol de hierro y un mol de agua.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La masa en gramos.'], ['El número de partículas.'], ['El color.']], pista: 'Una docena de huevos y una de naranjas no pesan igual. ¿Qué tienen igual?' }, 'Un mol de lo que sea tiene el mismo número de partículas.')],
    ],
    despues: [
      ['Más difícil: de gramos a gramos',
        xpMira('fichas', 'Un paso más: te dan **gramos** de un reactivo y piden **gramos** de producto. Hay que pasar por moles: 2H₂ + O₂ → 2H₂O.', { slots: fila('mol H₂', 'mol H₂O', 'g H₂O'), fichas: ['4', '4', '72'], alto: 96 }, [
          ['Hay 8 gramos de hidrógeno, H₂, que pesa 2 gramos por mol.', { pon: { 0: '4' } }, '$8 \\div 2 = 4$'],
          ['La receta dice: 2 de H₂ dan 2 de agua.', {}],
          ['Entonces 4 moles de H₂ dan 4 moles de agua.', { pon: { 1: '4' } }],
          ['Cada mol de agua pesa 18 gramos.', { pon: { 2: '72' } }, '$4 \\cdot 18 = 72$'],
          ['Gramos, moles, receta y otra vez gramos.', {}],
        ], 'Gramos a moles, la receta en moles, y de vuelta a gramos.'),
        xpHaz('fichas', 'C + O₂ → CO₂, con C = 12 y O = 16. Con 60 g de carbono, pon los moles de CO₂ y sus gramos.', { slots: fila('mol CO₂', 'g CO₂'), fichas: ['5', '220', '60', '44', '1'], meta: ['5', '220'], alto: 96, pista: 'Pasa los 60 g a moles; un mol de CO₂ pesa 44 g.' }, '$60 \\div 12 = 5$ y $5 \\cdot 44 = 220$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un estudiante calcula el oxígeno que sale al separar 54 g de agua: 2H₂O → 2H₂ + O₂. ¿En qué paso está el **error**?', { letras: ['A', 'B', 'C', 'D'], paras: [['Paso 1: un mol de agua pesa 18 g.'], ['Paso 2: 54 g de agua son 3 moles.'], ['Paso 3: 3 moles de agua dan 3 moles de O₂.'], ['Paso 4: 3 moles de O₂ pesan 96 g.']] }, [
        ['Revisa cada paso con tu propia cuenta, de arriba abajo.', {}],
        ['El paso 1 está bien: dos hidrógenos de 1 más un oxígeno de 16.', { luz: [0], nota: { 0: 'bien' } }, '$2 + 16 = 18$'],
        ['El paso 2 también: 54 entre 18.', { luz: [1], nota: { 1: 'bien' } }, '$54 \\div 18 = 3$'],
        ['El 3 copia mal la receta: 2 de agua dan solo 1 de O₂.', { luz: [2], nota: { 2: 'error' } }],
        ['El 4 hace bien su cuenta, pero arrastra el error anterior.', { luz: [3], nota: { 3: 'arrastra' } }],
      ], 'En «¿en qué paso está el error?», la respuesta es el primer paso que falla, aunque los siguientes cuadren.'),
      xpHaz('hoja', 'N₂ + 3H₂ → 2NH₃. Hay 6 moles de H₂ y nitrógeno de sobra. Subraya cuántos moles de NH₃ salen y por qué.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['6, porque sale lo mismo que entra.'], ['2, porque ese es el coeficiente.'], ['12, porque se multiplica 6 por 2.'], ['4, porque cada 3 de H₂ dan 2 de NH₃.']], pista: '6 moles de H₂ alcanzan para hacer la receta dos veces.' }, 'Receta doble: 6 de H₂ dan 4 de NH₃.')],
    cierre: 'El mol es un paquete; los coeficientes, la receta en moles; y el que se acaba primero decide.',
  });

  // Tres tubos (limón, agua, jabón) y sus tiras de tornasol; k: 1 limón, 2 jabón, 3 agua.
  const tornasol = (v, K) => {
    const k = v.k || 0;
    let s = X.gradilla(96, 166, [[0.6, 'aceite'], [0.6, 'agua'], [0.6, 'leche']]);
    [[200, 'limón', 1, '#e0473f'], [248, 'agua', 3, '#8d63b8'], [296, 'jabón', 2, '#3a64c9']].forEach(([x, et, desde, col]) => {
      s += `<rect x="${x - 7}" y="64" width="14" height="66" rx="1.5" fill="#efe6cf" stroke="#b9ab88" stroke-width=".7"/>`;
      if (k >= desde) s += `<rect x="${x - 7}" y="96" width="14" height="34" rx="1.5" fill="${col}"/>`;
      s += X.rot(x, 150, et);
    });
    return X.foto(s + (v.r ? X.rot(248, 34, v.r, 'oscuro') : ''), 200, 'lab');
  };
  // pH mientras se agrega base (x de 0 a 20 mL): sube despacio, salta cerca de 10 mL y termina básico.
  const ph = x => 2 + 10 / (1 + Math.exp(-(x - 10) * 1.3));
  const curvaPH = (v, K) => {
    const X0 = 50, Y0 = 156, gx = x => X0 + x * 12.5, gy = p => Y0 - p * 9.6, x = Math.max(0, Math.min(20, v.x || 0));
    let h = K.l(X0, Y0, 310, Y0, 'lm') + K.l(X0, Y0, X0, 14, 'lm') + K.l(X0, gy(7), 310, gy(7), 'ls d') + K.t(X0 - 6, gy(7) + 4, '7', 's tm', 'end') + K.t(X0 - 6, gy(14) + 8, '14', 's tm', 'end') + K.t(X0 - 6, Y0 + 4, '0', 's tm', 'end') +
      K.t(180, Y0 + 18, 'base agregada (mL)', 's tm') + K.t(X0 + 4, 14, 'pH', 's tm', 'start');
    const pts = []; for (let i = 0; i <= 40; i++) { const xx = x * i / 40; pts.push([gx(xx), gy(ph(xx))]); }
    if (x > 0.05) h += K.pl(pts, 'la gr');
    h += K.c(gx(x), gy(ph(x)), 5, 'fA');
    return h + K.t(190, 190, v.t || '', 'ta');
  };

  xpAmplia('icf-cn-reacciones-3', {
    conecta: 'icf-cn-reacciones-1',
    desde: [
      ['Desde cero: ácido, básico y neutro',
        xpMira('dibujo', 'Antes del número: hay sustancias **ácidas**, **básicas** y **neutras**. Se reconocen con un papel que cambia de color, el indicador.', { dib: tornasol, v: { k: 0, r: '' }, alto: 200 }, [
          ['En la lección de reacciones viste que al reaccionar aparecen sustancias nuevas.', {}],
          ['El limón y el vinagre saben agrios: son ácidos.', { k: 1, r: 'ácido: agrio' }],
          ['El jabón se siente resbaloso: es una base.', { k: 2, r: 'base: resbalosa' }],
          ['El agua pura no es ni lo uno ni lo otro: es neutra.', { k: 3, r: 'neutra' }],
          ['El papel tornasol avisa: rojo con ácido, azul con base.', { k: 3, r: 'indicador' }],
          ['Nunca se prueba con la lengua: para eso está el indicador.', { k: 3, r: 'sin probar' }],
        ], 'Ácido: agrio, como el limón. Base: resbalosa, como el jabón. Neutra: el agua pura. El indicador lo muestra.'),
        xpHaz('hoja', 'Pon al margen qué es cada sustancia según su tornasol.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['ácida', 'básica'], meta: [1, 0], paras: [['Agua con cal: el papel se pone azul.'], ['Jugo de naranja: el papel se pone rojo.']], pista: 'Alguna no va ahí: rojo es ácido; azul, básico.' }, 'Azul: básica. Rojo: ácida.')],
    ],
    despues: [
      ['Más difícil: la curva de una neutralización',
        xpMira('dibujo', 'Un paso más: una gráfica muestra cómo cambia el pH mientras se agrega una base. Mira dónde empieza, dónde salta y dónde termina.', { dib: curvaPH, v: { x: 0, t: '' }, alto: 198 }, [
          ['Un vaso con ácido: el pH empieza en 2.', { x: 0, t: 'empieza ácido' }],
          ['Se agrega base poco a poco: al principio casi no sube.', { x: 8, t: 'sube despacio' }],
          ['Cerca del punto neutro, unas gotas lo hacen saltar.', { x: 10, t: 'pH 7: neutro' }],
          ['Si se sigue echando base, pasa de 7 y queda básico.', { x: 20, t: 'se pasó: básico' }],
          ['Por eso se neutraliza gota a gota, midiendo.', { x: 20, t: 'gota a gota' }],
        ], 'Al neutralizar, el pH cambia poco, salta cerca de 7 y, si sobra base, termina básico.'),
        xpHaz('hoja', 'A un limpiador de pH 12 se le agrega vinagre gota a gota. Subraya cómo cambia el pH.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Sube hasta 14.'], ['Se queda en 12.'], ['Baja y, si sobra vinagre, pasa de 7 a ácido.']], pista: 'El vinagre es ácido: ¿hacia qué lado empuja?' }, 'Ahora va al revés: de básico a neutro y luego a ácido.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una hormiga pica y deja ácido en la piel. Hay leche de magnesia (pH 10), vinagre (pH 3), agua (pH 7) y limpiador (pH 13). ¿Qué conviene aplicar?', { letras: ['A', 'B', 'C', 'D'], paras: [['Vinagre, porque es un líquido que limpia.'], ['Agua, porque neutraliza cualquier cosa.'], ['Leche de magnesia, una base suave.'], ['Limpiador, porque es la base más fuerte.']] }, [
        ['Qué se pide: algo que neutralice un ácido sin dañar la piel.', {}],
        ['La A agrega más ácido: empeora.', { luz: [0], nota: { 0: 'más ácido' } }],
        ['La B confunde diluir con neutralizar.', { luz: [1], nota: { 1: 'diluye' } }],
        ['La D sí es una base, pero tan fuerte que quema.', { luz: [3], nota: { 3: 'demasiado' } }],
        ['La C es base y suave: neutraliza sin hacer daño.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'Para neutralizar se usa lo contrario, pero suave: una opción puede ser cierta y aun así peligrosa.'),
      xpHaz('hoja', 'El agua de un acuario tiene pH 8 y los peces necesitan pH 7. Subraya la acción **correcta**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['Agregar bicarbonato, que es básico.'], ['Agregar sal de cocina.'], ['Esperar a que el pH llegue solo a 7.'], ['Agregar poco a poco algo ácido y medir otra vez.']], pista: 'Está básica: ¿qué la mueve hacia 7 sin pasarse?' }, 'Para bajar el pH, un ácido en pequeñas cantidades, midiendo.')],
    cierre: 'Menos de 7, ácido; más de 7, básico; cada paso es por diez, y se neutraliza con lo contrario, despacio.',
  });
}
;
//#archivo js/explora-icf-cn-10.js
// Preicfes · Ciencias Naturales, mundo 10 «Ondas, Luz y Sonido» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Onda con n vueltas, amplitud A y fase g; un corcho en x = 170.
  const onda = (v, K) => { const y = x => 80 - v.A * Math.sin(2 * Math.PI * (v.n * (x - 24) / 292 - v.g)); return K.l(24, 80, 316, 80, 'lm') + K.pl(Array.from({ length: 121 }, (_, i) => { const x = 24 + 292 * i / 120; return [x, y(x)]; }), 'la gr') + K.f(v.k, K.c(170, y(170), 8, 'ff')) + K.t(170, 160, v.t, 'ta'); };
  // Espejo: llega a g de la normal y sale a s.
  const espejo = (v, K) => { const c = [170, 140]; return K.l(40, 140, 300, 140, 'gr') + K.f(v.nn, K.l(170, 20, 170, 140, 'lm d') + K.t(178, 26, 'normal', 's tm', 'start')) + K.l(...K.at(...c, 110, 90 + v.g), ...c, 'la gr') + K.f(v.s, K.l(...c, ...K.at(...c, 110, 90 - v.g), 'lg gr')) + K.t(170, 170, v.t, 'ta'); };
  // Aire arriba, agua abajo: entra a g, sale a r.
  const agua = (v, K) => { const c = [170, 90]; return K.r(20, 90, 300, 86, 'fa', 0) + K.l(170, 14, 170, 172, 'lm d') + K.l(...K.at(...c, 84, 90 + v.g), ...c, 'gr') + K.f(v.s, K.l(...c, ...K.at(...c, 84, 270 + v.r), 'lg gr')) + K.t(30, 24, 'aire', 's tm', 'start') + K.t(30, 168, 'agua', 's tm', 'start') + K.t(170, 196, v.t, 'ta'); };

  xpLec('icf-cn-ondas-1', [
    ['Viaja la energía',
      xpMira('dibujo', 'Empecemos por la idea: la onda **viaja**; la materia **vibra** y se queda.', { dib: onda, v: { n: 3, A: 34, g: 0, k: 0, t: '' }, alto: 172 }, [
        ['Una onda avanza por el agua.', { g: 1 }],
        ['Hay un corcho flotando.', { k: 1 }],
        ['Cuando pasa la cresta, sube.', { g: 1.25, t: 'sube y baja' }],
        ['Después baja, en el mismo sitio.', { g: 1.75 }],
        ['Lo que avanzó fue la energía.', { t: 'viaja la energía' }],
      ], 'Viaja la energía, no la materia.'),
      xpHaz('hoja', 'En un estadio, la gente hace «la ola» sin moverse de su puesto. Subraya lo que viaja.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Las personas'], ['El movimiento que pasa de uno a otro'], ['Las sillas']], pista: '¿Alguien cambia de puesto?' }, 'La perturbación pasa; cada quien se queda.')],
    ['Medir una onda',
      xpMira('dibujo', 'Segunda idea: **amplitud**, **longitud** y **frecuencia** son medidas distintas.', { dib: onda, v: { n: 2, A: 20, g: 0, k: 0, t: '' }, alto: 172 }, [
        ['De cresta a cresta: la longitud de onda.', { t: 'longitud: cresta a cresta' }],
        ['Si crece la altura, crece la amplitud.', { A: 46, t: 'más amplitud: más fuerte' }],
        ['Si hay más crestas, la longitud es menor.', { A: 30, n: 5, t: 'menos longitud' }],
        ['La frecuencia cuenta vibraciones por segundo.', { t: 'frecuencia en hertz' }],
        ['El periodo es lo que tarda una.', {}, '$T = \\tfrac{1}{f}$'],
      ], 'Altura, distancia y cuántas por segundo.'),
      xpHaz('fichas', 'Un punto vibra 30 veces en 6 s. Pon la frecuencia (Hz) y el periodo (s).', { slots: fila('frecuencia', 'periodo'), fichas: ['5', '0.2', '6', '30', '2'], meta: ['5', '0.2'], alto: 96, pista: 'Divide las vibraciones entre los segundos.' }, '$30 \\div 6 = 5$ Hz y $1 \\div 5 = 0.2$ s.')],
    ['La rapidez',
      xpMira('fichas', 'Tercera idea: **rapidez = longitud por frecuencia**, y la pone el **medio**.', { slots: fila('longitud', 'frecuencia', 'rapidez'), fichas: ['2 m', '170 Hz', '340 m/s'], alto: 96 }, [
        ['En el aire el sonido va a 340.', { pon: { 2: '340 m/s' } }],
        ['Con 170 vibraciones por segundo…', { pon: { 1: '170 Hz' } }],
        ['…cada onda mide dos metros.', { pon: { 0: '2 m' } }, '$2 \\cdot 170 = 340$'],
        ['Con el doble de frecuencia mediría uno.', {}, '$1 \\cdot 340 = 340$'],
        ['La rapidez no cambió: el medio es el mismo.', {}],
      ], 'Si una sube, la otra baja.'),
      xpHaz('fichas', 'Una ola viaja a 6 m/s con longitud de 3 m. Pon la frecuencia, y la longitud si la frecuencia sube a 6 Hz.', { slots: fila('frecuencia', 'nueva longitud'), fichas: ['2', '1', '18', '3', '6'], meta: ['2', '1'], alto: 96, pista: 'El producto debe dar 6.' }, '$3 \\cdot 2 = 6$ y $1 \\cdot 6 = 6$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'En el mismo aire, un pito agudo y un tambor grave. Subraya lo correcto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El pito llega primero'], ['El tambor llega primero'], ['Llegan a la vez, si suenan juntos y a igual distancia']], pista: '¿Quién pone la rapidez?' }, 'El medio pone la rapidez: es la misma.')],
  ], 'Energía, medidas y rapidez.');

  xpLec('icf-cn-ondas-2', [
    ['Rebotar',
      xpMira('dibujo', 'Empecemos por la idea: en la **reflexión** sale con el **mismo ángulo**.', { dib: espejo, v: { g: 30, nn: 0, s: 0, t: '' }, alto: 180 }, [
        ['Un rayo llega a un espejo.', {}],
        ['La normal es perpendicular al espejo.', { nn: 1 }],
        ['Sale al otro lado, con el mismo ángulo.', { s: 1, t: '30° y 30°' }],
        ['Si llega más inclinado, sale más inclinado.', { g: 60, t: '60° y 60°' }],
        ['Los ángulos se miden desde la normal.', {}],
      ], 'El ángulo que llega es igual al que sale.'),
      xpHaz('fichas', 'Un rayo llega a 25° de la normal. Pon el ángulo de salida y el que hay entre los dos rayos.', { slots: fila('sale', 'entre los dos'), fichas: ['25', '50', '65', '90', '130'], meta: ['25', '50'], alto: 96, pista: 'La normal está en medio de los dos.' }, '25° a cada lado: 50°.')],
    ['El eco',
      xpMira('fichas', 'Segunda idea: el **eco** recorre **ida y vuelta**.', { slots: fila('tiempo', 'recorrido', 'distancia'), fichas: ['1 s', '340 m', '170 m'], alto: 96 }, [
        ['El eco vuelve en un segundo.', { pon: { 0: '1 s' } }],
        ['El sonido recorrió 340 metros.', { pon: { 1: '340 m' } }],
        ['Pero fue y volvió.', {}],
        ['La pared está a la mitad.', { pon: { 2: '170 m' } }, '$340 \\div 2 = 170$'],
        ['Así miden los barcos y los murciélagos.', {}],
      ], 'Recorrido entre dos.'),
      xpHaz('fichas', 'En el agua (1 500 m/s) el eco vuelve en 2 s. Pon el recorrido y la profundidad, en metros.', { slots: fila('recorrido', 'profundidad'), fichas: ['3 000', '1 500', '750', '6 000', '2'], meta: ['3 000', '1 500'], alto: 96, pista: 'Multiplica y después parte en dos.' }, '$1\\,500 \\cdot 2 = 3\\,000$; la mitad, 1 500.')],
    ['Doblarse',
      xpMira('dibujo', 'Tercera idea: en la **refracción** cambia la rapidez y, si entra inclinada, la **dirección**.', { dib: agua, v: { g: 50, r: 35, s: 0, t: '' }, alto: 206 }, [
        ['Un rayo llega inclinado al agua.', {}],
        ['En el agua va más despacio.', { t: 'más despacio' }],
        ['Por eso se acerca a la normal.', { s: 1, t: 'se acerca a la normal' }],
        ['Si llega derecho, no se desvía.', { g: 0, r: 0, t: 'derecho: sin desvío' }],
        ['Al salir al aire ocurre lo contrario.', { g: 50, r: 35, t: 'al salir, se aleja' }],
      ], 'Más despacio, se acerca; más rápido, se aleja.'),
      xpHaz('hoja', 'La luz sale inclinada de un diamante al aire, donde va más rápido. Subraya lo que hace.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Se aleja de la normal'], ['Se acerca a la normal'], ['Cambia de color']], pista: '¿Va más rápido o más despacio al salir?' }, 'Al ir más rápido se aleja de la normal.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Pon al margen qué fenómeno hace posible cada cosa.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['reflexión total', 'refracción', 'absorción'], meta: [1, 0, 2], paras: [['Una lupa que agranda'], ['La luz que viaja por una fibra óptica'], ['Un estudio de grabación con espumas, sin eco']], pista: 'Alguna no va ahí: ¿se dobla, rebota adentro o se queda?' }, 'Se dobla, rebota toda adentro y se queda en la espuma.')],
  ], 'Rebotar, volver y doblarse.');
}
;
//#archivo js/explora-icf-cn-10-pasos.js
// Preicfes · Ciencias Naturales, mundo 10 «Ondas, Luz y Sonido», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  const r2 = x => Math.round(x * 100) / 100;

  // Una persona sacude una cuerda atada a un poste: la onda llega hasta f (0 a 1), amplitud A, fase g; una cinta roja en x = 200.
  const cuerda = (v, K) => {
    const A = v.A || 0, f = v.f || 0, g = v.g || 0, x0 = 50, x1 = 306, fr = x0 + f * (x1 - x0);
    const y = x => (x > fr ? 120 : 120 - A * Math.sin(2 * Math.PI * ((x - x0) / 86 - g)) * Math.min(1, (fr - x) / 30 + 0.2));
    const pts = Array.from({ length: 97 }, (_, i) => { const x = x0 + (x1 - x0) * i / 96; return `${r2(x)},${r2(y(x))}`; }).join(' ');
    const s = `<rect x="304" y="52" width="10" height="118" rx="2" fill="#7a5230"/><rect x="304" y="52" width="3" height="118" fill="#a5764a"/>` + X.persona(38, 170, 1, '#3f6fb5') +
      `<polyline points="${pts}" stroke="#000" stroke-opacity=".25" stroke-width="5" fill="none"/><polyline points="${pts}" stroke="#c9934f" stroke-width="3" fill="none"/>` +
      `<rect x="196" y="${r2(y(200) - 7)}" width="8" height="14" rx="2" fill="#e8434f" stroke="#a51f2a" stroke-width=".7"/>`;
    return X.foto(s + (v.r ? X.rot(170, 30, v.r, 'oscuro') : ''), 200, 'campo', 170);
  };

  xpAmplia('icf-cn-ondas-1', {
    conecta: 'icf-cn-energia-1',
    desde: [
      ['Desde cero: qué es una onda',
        xpMira('dibujo', 'Antes de medir: una **onda** es una perturbación que viaja y lleva energía de un lugar a otro. Mírala en una cuerda.', { dib: cuerda, v: { f: 0, A: 0, g: 0, r: '' }, alto: 200 }, [
          ['En la lección de energía viste que la energía pasa de una forma a otra.', {}],
          ['Sacude una cuerda atada a un poste: la mano sube y baja.', { f: 0.3, A: 22, g: 0.5, r: 'la mano vibra' }],
          ['La forma avanza hacia el poste: eso es una onda.', { f: 1, A: 22, g: 1.5, r: 'avanza la onda' }],
          ['La cinta roja solo sube y baja: no viaja con la onda.', { f: 1, A: 22, g: 2.5, r: 'la cuerda se queda' }],
          ['Lo más alto es la cresta y lo más bajo, el valle.', { f: 1, A: 22, g: 3, r: 'cresta y valle' }],
          ['La cuerda es el medio: el material por donde pasa la onda.', { f: 1, A: 22, g: 3.5, r: 'el medio: la cuerda' }],
        ], 'Onda: viaja la perturbación con su energía; el medio solo vibra en su sitio.'),
        xpHaz('hoja', 'Subraya qué es el **medio** de una onda.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El material por donde pasa, como la cuerda o el aire.'], ['El punto más alto de la onda.'], ['La mitad de la cuerda.']], pista: 'El medio es lo que vibra para que la onda pueda pasar.' }, 'Cuerda, agua o aire: el medio.')],
    ],
    despues: [
      ['Más difícil: cuando la onda cambia de medio',
        xpMira('hoja', 'Un paso más: si una onda pasa del aire al agua, algo se queda y algo cambia. Eso es justo lo que suelen preguntar.', { paras: [['Aire: 500 Hz, 340 m/s, 0.68 m'], ['Agua: 500 Hz, 1 500 m/s, 3 m'], ['La frecuencia la pone lo que vibra'], ['La rapidez la pone el medio']] }, [
          ['Un parlante vibra 500 veces por segundo en el aire.', { luz: [0] }],
          ['El sonido entra al agua y sigue con 500 Hz.', { luz: [1], nota: { 1: 'misma frecuencia' } }],
          ['La frecuencia no cambia: la decide quien vibra.', { luz: [2] }],
          ['En el agua va más rápido, así que cada onda es más larga.', { luz: [1, 3] }, '$3 \\cdot 500 = 1\\,500$'],
          ['Rapidez y longitud cambian juntas; la frecuencia se queda.', { luz: [3], nota: { 3: 'cambia' } }],
        ], 'Al cambiar de medio, la frecuencia se queda; cambian la rapidez y la longitud de onda.'),
        xpHaz('hoja', 'Una onda de 10 Hz pasa de una cuerda gruesa (2 m/s) a una delgada (6 m/s). Subraya su frecuencia en la delgada.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['10 Hz'], ['30 Hz'], ['3.3 Hz']], pista: 'La mano que vibra no cambió.' }, 'Sigue en 10 Hz; su longitud pasa de 0.2 m a 0.6 m.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el mismo aire, se duplica la frecuencia de un parlante. ¿Qué pasa con su sonido? Mira por qué cada opción falsa engaña.', { letras: ['A', 'B', 'C', 'D'], paras: [['La rapidez se duplica, porque vibra más rápido.'], ['La amplitud se duplica y suena más fuerte.'], ['La longitud se duplica, porque van juntas.'], ['La longitud de onda baja a la mitad y la rapidez no cambia.']] }, [
        ['Primero: el medio es el mismo, así que la rapidez es la misma.', {}],
        ['La A confunde vibrar más seguido con viajar más rápido.', { luz: [0], nota: { 0: 'confunde' } }],
        ['La B mezcla frecuencia con amplitud: el tono no es el volumen.', { luz: [1], nota: { 1: 'otra medida' } }],
        ['La C invierte: si una sube, la otra baja.', { luz: [2], nota: { 2: 'invierte' } }],
        ['La D: rapidez fija, frecuencia doble, longitud a la mitad.', { luz: [3], nota: { 3: 'sirve' } }, '$v = \\lambda \\cdot f$'],
      ], 'Con el mismo medio la rapidez no cambia: si la frecuencia sube, la longitud de onda baja.'),
      xpHaz('hoja', 'Un sonido se oye más fuerte, pero con el mismo tono. Subraya lo que **cambió**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['La frecuencia.'], ['La rapidez en el aire.'], ['La amplitud.'], ['La longitud de onda.']], pista: 'El tono, agudo o grave, depende de la frecuencia. ¿Qué medida es el volumen?' }, 'Más fuerte es más amplitud; el tono sigue igual.')],
    cierre: 'La onda lleva energía; la frecuencia la pone quien vibra, la rapidez el medio, y $v = \\lambda f$.',
  });

  // Pecera con agua (superficie en y = 90). Un rayo de linterna llega a (150, 90): s lo dibuja, re rebota, w entra doblado,
  // nn la normal, d el camino que habría seguido sin doblarse.
  const pecera = (v, K) => {
    const rayo = (x1, y1, x2, y2) => `<line x1="${x1}" y1="${y1}" x2="${r2(x2)}" y2="${r2(y2)}" stroke="#ff4b4b" stroke-opacity=".35" stroke-width="6" stroke-linecap="round"/><line x1="${x1}" y1="${y1}" x2="${r2(x2)}" y2="${r2(y2)}" stroke="#ff3030" stroke-width="2.2" stroke-linecap="round"/>`;
    const s0 = v.s || 0;
    let s = `<rect x="86" y="90" width="208" height="76" fill="url(#xlb-l-agua)" opacity=".75"/><rect x="86" y="60" width="208" height="106" fill="url(#xlb-vidrio)" stroke="#5d7684" stroke-width="1.6"/>` + X.pez(250, 136, 0.8);
    s += `<g transform="rotate(30 34 26)"><rect x="14" y="18" width="40" height="16" rx="4" fill="#2f3539"/><rect x="50" y="15" width="8" height="22" rx="2" fill="url(#xlb-metal)"/></g>`;
    if ((v.d || 0) > 0.01) s += `<line x1="150" y1="90" x2="278" y2="150" stroke="#9aa3a8" stroke-width="1.6" stroke-dasharray="4 4" opacity="${r2(v.d)}"/>`;
    if ((v.nn || 0) > 0.01) s += `<line x1="150" y1="40" x2="150" y2="164" stroke="#ffffff" stroke-width="1.4" stroke-dasharray="5 4" opacity="${r2(v.nn)}"/>`;
    if (s0 > 0.01) s += rayo(52, 44, 52 + 98 * s0, 44 + 46 * s0);
    if ((v.re || 0) > 0.01) s += rayo(150, 90, 150 + 98 * v.re, 90 - 46 * v.re);
    if ((v.w || 0) > 0.01) s += rayo(150, 90, 150 + 63 * v.w, 90 + 68 * v.w);
    return X.foto(s + (v.r ? X.rot(246, 30, v.r, 'oscuro') : ''), 200, 'lab');
  };
  // Del agua (abajo) al aire (arriba): un rayo sale de (60, 168) con ángulo g desde la normal; pasado el límite, rebota.
  const atrapa = (v, K) => {
    const g = v.g * Math.PI / 180, hx = 60 + 78 * Math.tan(g), hy = 90, sn = 1.33 * Math.sin(g), sale = sn < 1;
    let h = K.r(10, 90, 320, 86, 'fa', 0) + K.t(18, 22, 'aire', 's tm', 'start') + K.t(18, 166, 'agua', 's tm', 'start') + K.l(hx, 26, hx, 170, 'lm d') +
      K.l(60, 168, hx, hy, 'la gr');
    if (sale) { const r = Math.asin(sn); h += K.l(hx, hy, hx + 70 * Math.sin(r), hy - 70 * Math.cos(r), 'lg gr'); }
    else h += K.l(hx, hy, hx + 70 * Math.sin(g), hy + 70 * Math.cos(g), 'lg gr');
    return h + K.t(170, 190, v.t || (sale ? 'sale al aire' : 'no sale: rebota toda'), 'ta');
  };

  xpAmplia('icf-cn-ondas-2', {
    conecta: 'icf-cn-ondas-1',
    desde: [
      ['Desde cero: la luz cambia de camino',
        xpMira('dibujo', 'Antes de los ángulos: la luz va en línea recta hasta que llega a otro material. Ahí puede **rebotar**, **doblarse** o las dos.', { dib: pecera, v: { s: 0, re: 0, w: 0, nn: 0, d: 0, r: '' }, alto: 200 }, [
          ['En la lección anterior viste que la rapidez de una onda la pone el medio.', {}],
          ['La luz también es una onda, y viaja en línea recta.', { s: 1 }],
          ['Al llegar al agua, una parte rebota: es la reflexión.', { s: 1, re: 1, r: 'reflexión: rebota' }],
          ['Otra parte entra y se dobla: es la refracción.', { s: 1, re: 1, w: 1, r: 'refracción: se dobla' }],
          ['La normal es una línea imaginaria, perpendicular a la superficie.', { s: 1, re: 1, w: 1, nn: 1, r: 'la normal' }],
          ['Sin doblarse, la luz habría seguido la línea gris.', { s: 1, re: 1, w: 1, nn: 1, d: 1, r: 'se acercó a la normal' }],
        ], 'Reflexión: rebota. Refracción: entra a otro medio y se dobla. Los ángulos se miden desde la normal.'),
        xpHaz('hoja', 'Pon al margen qué le pasa a la luz en cada caso.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['reflexión', 'refracción'], meta: [1, 0], paras: [['El fondo de una piscina parece menos hondo.'], ['Ves tu cara en una vitrina oscura.']], pista: 'Alguna no va ahí: ¿la luz cambia de medio o se devuelve?' }, 'La piscina: refracción. La vitrina: reflexión.')],
    ],
    despues: [
      ['Más difícil: la luz atrapada',
        xpMira('dibujo', 'Un paso más: cuando la luz va del agua al aire, se aleja de la normal. Si está muy inclinada, pasa algo curioso: no sale.', { dib: atrapa, v: { g: 20, t: '' }, alto: 204 }, [
          ['Ahora la luz sale del agua hacia el aire, al revés que antes.', { g: 20, t: 'sale y se aleja de la normal' }],
          ['Con más inclinación, sale más tendida.', { g: 40, t: 'sale más tendida' }],
          ['Hay un ángulo límite, cerca de 49° en el agua: sale casi rasante.', { g: 48, t: 'casi rasante' }],
          ['Más inclinada que eso, no sale: rebota toda adentro.', { g: 60, t: 'reflexión total' }],
          ['Así viaja la luz por una fibra óptica, rebotando sin escaparse.', { g: 65, t: 'fibra óptica' }],
        ], 'Del agua al aire, pasado el ángulo límite, la luz no sale: se refleja toda. Así funciona la fibra óptica.'),
        xpHaz('dibujo', 'Arrastra el ángulo hasta que la luz quede **atrapada** en el agua.', { dib: atrapa, v: { g: 20, t: '' }, manijas: [{ k: 'g', min: 10, max: 70, paso: 5, et: 'ángulo con la normal' }], cumple: v => v.g >= 50, sol: { g: 60 }, alto: 250, pista: 'Inclínala más allá del ángulo límite, unos 49°.' }, 'Pasado el ángulo límite, rebota toda adentro.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un estudiante mide en un espejo el ángulo con que llega la luz y con el que sale: 20° y 20°, 35° y 35°, 50° y 50°. ¿Qué concluye bien?', { letras: ['A', 'B', 'C', 'D'], paras: [['La luz se vuelve más lenta al tocar el espejo.'], ['Con más ángulo, la luz rebota con más fuerza.'], ['Pasa igual en el agua y en cualquier material.'], ['El ángulo de salida es igual al de llegada.']] }, [
        ['Mira solo lo que midió: dos ángulos en cada intento.', {}],
        ['La A habla de rapidez, que nadie midió.', { luz: [0], nota: { 0: 'sin dato' } }],
        ['La B inventa una «fuerza» del rebote.', { luz: [1], nota: { 1: 'sin dato' } }],
        ['La C generaliza a materiales que no se probaron.', { luz: [2], nota: { 2: 'generaliza' } }],
        ['La D dice justo lo que muestran los tres pares.', { luz: [3], nota: { 3: 'sirve' } }],
      ], 'Una conclusión válida no va más allá de lo que se midió.'),
      xpHaz('hoja', 'Un delfín oye el eco de un pez 0.04 s después de chillar. En el agua el sonido va a 1 500 m/s. Subraya a qué distancia está el pez.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['60 m, porque 1 500 · 0.04.'], ['30 m, porque el sonido fue y volvió.'], ['37 500 m, porque 1 500 ÷ 0.04.'], ['15 m, porque es la cuarta parte.']], pista: 'El tiempo del eco cuenta la ida y la vuelta.' }, '$1\\,500 \\cdot 0.04 = 60$ m de recorrido: el pez está a 30 m.')],
    cierre: 'La luz rebota con el mismo ángulo, se dobla al cambiar de rapidez y, muy inclinada, queda atrapada.',
  });
}
;
//#archivo js/explora-icf-cn-11.js
// Preicfes · Ciencias Naturales, mundos 11 «Gases y Disoluciones» y 12 «Electricidad y Magnetismo» (Explora). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const puntos = (K, x, y, w, h, n) => Array.from({ length: n }, (_, i) => K.c(x + 8 + ((i * 37) % 97) / 97 * (w - 16), y + 8 + ((i * 59) % 83) / 83 * (h - 16), 3.2, 'ff')).join('');
  // Émbolo con volumen w (0 a 1).
  const emb = (v, K) => { const w = 230 * v.w; return K.r(40, 30, 250, 76, 'fn', 4) + K.r(40, 30, w, 76, 'fa', 2) + puntos(K, 40, 30, w, 76, 18) + K.r(40 + w, 26, 10, 84, 'fk', 2) + K.t(170, 140, v.t, 'ta'); };
  const globo = (v, K) => K.c(170, 76, v.r, 'fa') + K.l(170, 76 + v.r, 170, 148, 'lm') + K.t(170, 168, v.t, 'ta');
  // Vaso con nivel n y 16 granos de soluto.
  const vaso = (v, K) => K.r(120, 16, 100, 110, 'fn', 4) + K.r(120, 126 - 110 * v.n, 100, 110 * v.n, 'fa', 2) + Array.from({ length: 16 }, (_, i) => K.c(130 + (i * 43 % 83), 122 - (i * 29 % 89) / 89 * Math.max(6, 110 * v.n - 10), 2.8, 'ff')).join('') + K.t(170, 152, v.t, 'ta');
  const pila = (K, x, y) => K.l(x - 10, y, x + 10, y, 'gr') + K.l(x - 5, y + 8, x + 5, y + 8, 'gr'), bom = (K, x, y, on) => K.c(x, y, 13, on > 0.5 ? 'ff' : 'fc') + K.l(x - 6, y - 6, x + 6, y + 6, 'lm') + K.l(x - 6, y + 6, x + 6, y - 6, 'lm');
  // Serie (p = 0) o paralelo (p = 1) con dos bombillos; a y b prendidos.
  const circ = (v, K) => (v.p < 0.5 ? K.pl([[70, 70], [70, 24], [270, 24], [270, 120], [70, 120], [70, 78]], 'gr') + bom(K, 130, 24, v.a) + bom(K, 210, 24, v.b) : K.pl([[70, 70], [70, 24], [270, 24], [270, 120], [70, 120], [70, 78]], 'gr') + K.l(170, 24, 170, 120, 'gr') + bom(K, 170, 72, v.a) + bom(K, 270, 72, v.b)) + pila(K, 70, 70) + K.t(170, 154, v.t, 'ta');
  const cargas = (v, K) => { const x = v.d / 2; return K.c(170 - x, 70, 20, v.s > 0 ? 'ff' : 'fa') + K.t(170 - x, 76, v.s > 0 ? '+' : '−', 'b') + K.c(170 + x, 70, 20, 'fa') + K.t(170 + x, 76, '−', 'b') + K.l(170 - x, 110, 170 - x + (v.s > 0 ? 1 : -1) * v.f, 110, 'la gr') + K.l(170 + x, 110, 170 + x - (v.s > 0 ? 1 : -1) * v.f, 110, 'la gr') + K.t(170, 148, v.t, 'ta'); };

  xpLec('icf-cn-gases-1', [
    ['Boyle',
      xpMira('dibujo', 'Empecemos por la idea: con la **misma temperatura**, presión por volumen **no cambia**.', { dib: emb, v: { w: 1, t: '12 L a 1 atm' }, alto: 152 }, [
        ['El gas ocupa doce litros.', {}],
        ['Sus partículas chocan con las paredes.', {}],
        ['A la mitad, chocan el doble de seguido.', { w: 0.5, t: '6 L a 2 atm' }, '$12 \\cdot 1 = 6 \\cdot 2$'],
        ['A la cuarta parte, cuatro veces.', { w: 0.25, t: '3 L a 4 atm' }, '$3 \\cdot 4 = 12$'],
        ['El producto siempre es el mismo.', {}],
      ], 'Menos volumen, más presión.'),
      xpHaz('fichas', 'Un gas ocupa 10 L a 3 atm. Pon el producto y el volumen a 5 atm.', { slots: fila('producto', 'litros'), fichas: ['30', '6', '15', '50', '2'], meta: ['30', '6'], alto: 96, pista: 'Multiplica y después divide entre 5.' }, '$10 \\cdot 3 = 30$ y $30 \\div 5 = 6$.')],
    ['Charles',
      xpMira('dibujo', 'Segunda idea: con la **misma presión**, el volumen sigue a los **kelvin**.', { dib: globo, v: { r: 40, t: '200 K: 4 L' }, alto: 178 }, [
        ['Un globo a doscientos kelvin.', {}],
        ['Al calentarlo, sus partículas empujan más.', { r: 46, t: '300 K: 6 L' }, '$\\tfrac{4}{200} = \\tfrac{6}{300}$'],
        ['Con el doble de kelvin, el doble de volumen.', { r: 50, t: '400 K: 8 L' }],
        ['Para pasar de Celsius se suman 273.', {}, '$27 + 273 = 300$'],
        ['En Celsius la proporción no vale.', {}],
      ], 'Volumen y kelvin, en proporción.'),
      xpHaz('fichas', 'Pon 7 °C en kelvin, y el volumen de 5 L a 280 K si pasa a 560 K.', { slots: fila('kelvin', 'litros'), fichas: ['280', '10', '266', '2.5', '7'], meta: ['280', '10'], alto: 96, pista: 'Suma 273; los kelvin se duplican.' }, '$7 + 273 = 280$; el doble de 5 es 10.')],
    ['Recipiente rígido',
      xpMira('hoja', 'Tercera idea: si el **volumen** no cambia, la **presión** sigue a los kelvin.', { paras: [['Lata a 300 K: 2 atm'], ['Lata a 450 K: 3 atm'], ['Más partículas, más presión'], ['PV = nRT']] }, [
        ['La lata no puede crecer.', { luz: [0] }],
        ['Con 1.5 veces los kelvin, 1.5 veces la presión.', { luz: [1] }, '$2 \\cdot 1.5 = 3$'],
        ['Por eso no se arroja al fuego.', { luz: [1] }],
        ['Al inflar entran más partículas.', { luz: [2] }],
        ['Una sola ecuación lo reúne todo.', { luz: [3] }],
      ], 'Mira qué queda fijo.'),
      xpHaz('hoja', 'Pon al margen qué queda fijo.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['el volumen', 'la temperatura'], meta: [1, 0], paras: [['Se empuja despacio una jeringa tapada'], ['Se calienta un tanque de acero cerrado']], pista: 'Alguna no va ahí: ¿cambia el tamaño o el calor?' }, 'Despacio, la temperatura no cambia; el acero no crece.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Una llanta a 2 atm y 300 K se calienta a 330 K sin cambiar de tamaño. Subraya su presión.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['1.8 atm'], ['2.2 atm'], ['32 atm']], pista: 'Los kelvin subieron un 10 %.' }, '$2 \\cdot 1.1 = 2.2$.')],
  ], 'Boyle, Charles y lo que queda fijo.');

  xpLec('icf-cn-gases-2', [
    ['Soluto y disolución',
      xpMira('dibujo', 'Empecemos por la idea: la concentración compara el **soluto** con la **disolución**.', { dib: vaso, v: { n: 0.4, t: '16 g en 2 L' }, alto: 162 }, [
        ['Los puntos son el soluto.', {}],
        ['Dieciséis gramos en dos litros.', {}, '$16 \\div 2 = 8$ g/L'],
        ['Si hay más agua, están más separados.', { n: 0.8, t: '16 g en 4 L' }, '$16 \\div 4 = 4$ g/L'],
        ['El soluto es el mismo.', {}],
        ['Mucho soluto no es lo mismo que concentrado.', {}],
      ], 'Soluto entre disolución.'),
      xpHaz('fichas', 'Pon la concentración de 18 g en 3 L, y el porcentaje de 4 g en 80 g de disolución.', { slots: fila('g/L', '%'), fichas: ['6', '5', '54', '4', '20'], meta: ['6', '5'], alto: 96, pista: 'Divide en los dos casos.' }, '$18 \\div 3 = 6$ y $4 \\div 80 = 5\\%$.')],
    ['Diluir',
      xpMira('fichas', 'Segunda idea: al **diluir**, concentración por volumen **no cambia**.', { slots: fila('antes', 'después', 'se agrega'), fichas: ['1 L', '3 L', '2 L'], alto: 96 }, [
        ['Un litro a doce gramos por litro.', { pon: { 0: '1 L' } }],
        ['Se quiere a cuatro gramos por litro.', {}],
        ['Los doce gramos llenan tres litros.', { pon: { 1: '3 L' } }, '$12 \\div 4 = 3$'],
        ['Se agregan dos, no tres.', { pon: { 2: '2 L' } }, '$3 - 1 = 2$'],
        ['Ojo: el volumen final no es lo agregado.', {}],
      ], 'Gramos iguales; resta lo que ya había.'),
      xpHaz('fichas', '3 L a 8 g/L se llevan a 2 g/L. Pon el volumen final y el agua que se agrega.', { slots: fila('final (L)', 'agua (L)'), fichas: ['12', '9', '24', '8', '3'], meta: ['12', '9'], alto: 96, pista: 'Hay 24 g.' }, '$24 \\div 2 = 12$ y $12 - 3 = 9$.')],
    ['Otras cosas que se hacen',
      xpMira('hoja', 'Tercera idea: **evaporar** concentra; **sacar** un poco no cambia nada.', { paras: [['Evaporar agua'], ['Agregar soluto'], ['Servir un vaso'], ['1 ppm = 1 mg por kg']] }, [
        ['Menos agua, mismo soluto.', { luz: [0], nota: { 0: 'sube' } }],
        ['Más soluto, casi el mismo volumen.', { luz: [1], nota: { 1: 'sube' } }],
        ['Sale soluto y sale agua por igual.', { luz: [2], nota: { 2: 'no cambia' } }],
        ['Para cantidades mínimas: partes por millón.', { luz: [3] }],
        ['En un remedio, un cero de más importa.', {}],
      ], 'Pregunta qué salió y qué entró.'),
      xpHaz('hoja', 'De 1 L a 6 g/L se evapora medio litro de agua. Subraya la nueva concentración.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['3 g/L'], ['6 g/L'], ['12 g/L']], pista: 'Los 6 g quedan en medio litro.' }, '$6 \\div 0.5 = 12$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un agua tiene 5 mg de cloro en 4 kg; lo permitido es hasta 2 ppm. Subraya lo correcto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Cumple: 1.25 ppm'], ['No cumple: 5 ppm'], ['No cumple: 20 ppm']], pista: 'Divide los miligramos entre los kilogramos.' }, '$5 \\div 4 = 1.25$.')],
  ], 'Soluto entre disolución, diluir y lo que cambia.');

  xpLec('icf-cn-electrico-1', [
    ['Ohm',
      xpMira('fichas', 'Empecemos por la idea: **voltaje = corriente · resistencia**.', { slots: fila('voltaje', 'resistencia', 'corriente'), fichas: ['9 V', '3 Ω', '3 A'], alto: 96 }, [
        ['La pila empuja con nueve voltios.', { pon: { 0: '9 V' } }],
        ['La resistencia se opone: tres ohmios.', { pon: { 1: '3 Ω' } }],
        ['Entonces pasan tres amperios.', { pon: { 2: '3 A' } }, '$9 \\div 3 = 3$'],
        ['Con el doble de resistencia, la mitad.', {}, '$9 \\div 6 = 1.5$'],
        ['Sin camino cerrado no pasa nada.', {}],
      ], 'Corriente es voltaje entre resistencia.'),
      xpHaz('fichas', 'Pon la corriente de 20 V en 5 Ω, y el voltaje que hace pasar 3 A por 7 Ω.', { slots: fila('corriente', 'voltaje'), fichas: ['4 A', '21 V', '100 A', '10 V', '2 A'], meta: ['4 A', '21 V'], alto: 96, pista: 'Divide en la primera y multiplica en la segunda.' }, '$20 \\div 5 = 4$ y $3 \\cdot 7 = 21$.')],
    ['Serie y paralelo',
      xpMira('dibujo', 'Segunda idea: en **serie** hay un camino; en **paralelo**, varios.', { dib: circ, v: { p: 0, a: 1, b: 1, t: 'en serie' }, alto: 164 }, [
        ['Dos bombillos en el mismo camino.', {}],
        ['Si uno se quema, se corta el camino.', { a: 0, b: 0, t: 'se apagan los dos' }],
        ['Ahora cada uno tiene el suyo.', { p: 1, a: 1, b: 1, t: 'en paralelo' }],
        ['Si uno se quema, el otro sigue.', { a: 0, t: 'el otro sigue' }],
        ['En serie se suman las resistencias.', {}, '$4 + 6 = 10$ Ω'],
      ], 'Serie: un camino. Paralelo: varios.'),
      xpHaz('fichas', '6 V en paralelo a dos resistencias de 3 Ω. Pon la corriente de cada rama y la total.', { slots: fila('cada rama', 'total'), fichas: ['2 A', '4 A', '1 A', '6 A', '3 A'], meta: ['2 A', '4 A'], alto: 96, pista: 'Cada una recibe los 6 V.' }, '$6 \\div 3 = 2$ y $2 + 2 = 4$.')],
    ['Potencia',
      xpMira('hoja', 'Tercera idea: **potencia = voltaje · corriente**; la energía es potencia por **tiempo**.', { paras: [['120 V · 5 A = 600 W'], ['600 W · 2 h = 1 200 Wh'], ['1 000 Wh = 1 kWh'], ['Recibo: se cobran kWh']] }, [
        ['Un horno pequeño usa esto.', { luz: [0] }],
        ['En dos horas gasta esta energía.', { luz: [1] }],
        ['Mil vatios hora son un kilovatio hora.', { luz: [2] }],
        ['Eso se paga en el recibo.', { luz: [3] }],
        ['Poca potencia por mucho tiempo también suma.', {}],
      ], 'Vatios por horas.'),
      xpHaz('fichas', 'Un televisor de 80 W encendido 5 h. Pon los Wh y los kWh.', { slots: fila('Wh', 'kWh'), fichas: ['400', '0.4', '16', '4', '40'], meta: ['400', '0.4'], alto: 96, pista: 'Multiplica y después divide entre mil.' }, '$80 \\cdot 5 = 400$ Wh.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'En serie, 12 V con 2 Ω y 4 Ω. Subraya el voltaje de la resistencia de **4 Ω**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['12 V'], ['8 V'], ['4 V']], pista: 'Halla primero la corriente.' }, '$12 \\div 6 = 2$ A y $2 \\cdot 4 = 8$ V.')],
  ], 'Ohm, caminos y vatios por horas.');

  xpLec('icf-cn-electrico-2', [
    ['Cargas',
      xpMira('dibujo', 'Empecemos por la idea: iguales se **repelen**, distintas se **atraen**; y la **distancia** importa mucho.', { dib: cargas, v: { d: 160, s: -1, f: 9, t: '' }, alto: 158 }, [
        ['Dos cargas negativas se repelen.', { t: 'iguales: se repelen' }],
        ['Una positiva y una negativa se atraen.', { s: 1, t: 'distintas: se atraen' }],
        ['Al acercarse, la fuerza crece.', { d: 80, f: 36, t: 'a la mitad: 4 veces más' }],
        ['Al alejarse, baja con el cuadrado.', { d: 200, f: 5.8, t: 'más lejos, menos' }],
        ['La carga no se crea: pasa de un cuerpo a otro.', {}],
      ], 'Al doble de lejos, la cuarta parte.'),
      xpHaz('fichas', 'Dos cargas se atraen con fuerza 100. Pon la fuerza al doble de distancia y con una carga tres veces mayor.', { slots: fila('doble distancia', 'carga · 3'), fichas: ['25', '300', '50', '900', '200'], meta: ['25', '300'], alto: 96, pista: 'La distancia, al cuadrado; la carga, no.' }, '$100 \\div 4 = 25$ y $100 \\cdot 3 = 300$.')],
    ['Imanes',
      xpMira('hoja', 'Segunda idea: todo imán tiene **dos polos**, aunque se parta.', { paras: [['N con S: se atraen'], ['N con N: se repelen'], ['Partido: N-S y N-S'], ['Atrae hierro, níquel y cobalto'], ['No atrae cobre ni aluminio']] }, [
        ['Los polos distintos se buscan.', { luz: [0] }],
        ['Polos iguales se rechazan.', { luz: [1] }],
        ['Al partirlo salen dos imanes completos.', { luz: [2] }],
        ['Atrae solo algunos metales.', { luz: [3] }],
        ['Y deja quietos a otros.', { luz: [4], tacha: [4] }],
      ], 'Dos polos, siempre.'),
      xpHaz('hoja', 'Subraya lo que un imán **sí** atrae.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Alambre de cobre'], ['Papel de aluminio'], ['Puntilla de hierro']], pista: 'No atrae todos los metales.' }, 'El hierro sí; cobre y aluminio, no.')],
    ['De ida y vuelta',
      xpMira('hoja', 'Tercera idea: la **corriente** produce magnetismo y el **imán que se mueve**, corriente.', { paras: [['Alambre + clavo + pila'], ['Más vueltas, más fuerza'], ['Imán que entra y sale de una bobina'], ['Generador de una represa']] }, [
        ['Con corriente, el clavo atrae.', { luz: [0], nota: { 0: 'electroimán' } }],
        ['Se puede apagar y hacer más fuerte.', { luz: [1] }],
        ['Al mover el imán aparece corriente.', { luz: [2], nota: { 2: 'inducción' } }],
        ['Si se queda quieto, no.', { luz: [2] }],
        ['Así se produce casi toda la electricidad.', { luz: [3] }],
      ], 'Ida: electroimán. Vuelta: inducción.'),
      xpHaz('hoja', 'Pon al margen qué ocurre.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['inducción', 'electroimán'], meta: [1, 0], paras: [['Una cerradura que se abre con un botón y corriente'], ['Una bicicleta cuya rueda mueve un imán y prende una luz']], pista: 'Alguna no va ahí: ¿entra corriente o sale corriente?' }, 'La cerradura recibe corriente; la bicicleta la produce.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un imán quieto dentro de una bobina no prende la luz. Subraya qué hay que hacer.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Mover el imán'], ['Enfriar la bobina'], ['Pintar el imán']], pista: 'La corriente aparece con un cambio.' }, 'Al moverlo aparece corriente.')],
  ], 'Cargas, polos, y de ida y vuelta.');
}
;
//#archivo js/explora-icf-cn-11-pasos.js
// Preicfes · Ciencias Naturales, mundos 11 «Gases y Disoluciones» y 12 «Electricidad y Magnetismo», paso a paso (spec
// 2026-11-28-preicfes-paso-a-paso): cada explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo
// pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const r2 = x => Math.round(x * 100) / 100;

  // Balón con partículas adentro (n: más partículas, p: más inflado, c: choques marcados) y un inflador.
  const balon = (v, K) => {
    const p = v.p || 0, R = 34 + p * 10, cx = 210, cy = 128 - p * 6, n = 8 + Math.round((v.n || 0) * 10);
    let s = `<rect x="58" y="96" width="22" height="70" rx="4" fill="url(#xlb-metal)" stroke="#4d565c"/><rect x="66" y="70" width="6" height="28" fill="#5b646a"/><rect x="50" y="64" width="38" height="8" rx="3" fill="#2f3539"/><rect x="50" y="162" width="38" height="6" rx="2" fill="#2f3539"/>` +
      `<path d="M80 150 C120 160 140 150 ${cx - R + 2} ${r2(cy + 10)}" stroke="#2f3539" stroke-width="3" fill="none"/>` +
      `<circle cx="${cx}" cy="${r2(cy)}" r="${r2(R)}" fill="#f7f7f5" stroke="#5b646a" stroke-width="1.5"/>`;
    [[0, 0], [-0.55, -0.45], [0.55, -0.45], [-0.6, 0.5], [0.6, 0.5]].forEach(([a, b]) => { const x = cx + a * R, y = cy + b * R, q = R * 0.2; s += `<path d="M${r2(x)} ${r2(y - q)} L${r2(x + q)} ${r2(y - q * 0.3)} L${r2(x + q * 0.6)} ${r2(y + q * 0.8)} L${r2(x - q * 0.6)} ${r2(y + q * 0.8)} L${r2(x - q)} ${r2(y - q * 0.3)}Z" fill="#2b2f33" opacity=".85"/>`; });
    for (let i = 0; i < n; i++) { const a = i * 2.4, d = R * 0.78 * Math.sqrt((i + 0.5) / n); s += `<circle cx="${r2(cx + d * Math.cos(a))}" cy="${r2(cy + d * Math.sin(a))}" r="3.4" fill="#3a6fd6" stroke="#fff" stroke-width=".8"/>`; }
    if ((v.c || 0) > 0.5) [30, 110, 200, 290].forEach(g => { const a = g * Math.PI / 180, x = cx + R * Math.cos(a), y = cy + R * Math.sin(a); s += `<circle cx="${r2(x)}" cy="${r2(y)}" r="5" fill="none" stroke="#ff9b1a" stroke-width="2"/>`; });
    return X.foto(s + (v.r ? X.rot(190, 30, v.r, 'oscuro') : ''), 200, 'campo', 172);
  };
  // Presión contra volumen a temperatura fija: n puntos, c la curva P = 12 / V, mal la recta que no sirve.
  const PV = [[12, 1], [6, 2], [3, 4], [2, 6]];
  const hiper = (v, K) => {
    const X0 = 50, Y0 = 156, gx = V => X0 + V * 20, gy = P => Y0 - P * 20;
    let h = K.l(X0, Y0, 320, Y0, 'lm') + K.l(X0, Y0, X0, 14, 'lm') + K.t(X0 + 8, Y0 - 6, 'volumen (L)', 's tm', 'start') + K.t(X0 + 4, 16, 'presión (atm)', 's tm', 'start');
    [2, 6, 12].forEach(V => { h += K.t(gx(V), Y0 + 14, V, 's tm'); }); [1, 2, 4, 6].forEach(P => { h += K.t(X0 - 6, gy(P) + 4, P, 's tm', 'end'); });
    if ((v.c || 0) > 0.01) h += K.f(v.c, K.pl(Array.from({ length: 41 }, (_, i) => { const V = 1.8 + i * 11.2 / 40; return [gx(V), gy(12 / V)]; }), 'la gr'));
    if ((v.mal || 0) > 0.01) h += K.f(v.mal, K.l(gx(2), gy(6), gx(12), gy(1), 'lf d'));
    PV.slice(0, Math.round(v.n || 0)).forEach(([V, P]) => { h += K.c(gx(V), gy(P), 5, 'fA'); });
    return h + K.t(185, 192, v.t || '', 'ta');
  };

  xpAmplia('icf-cn-gases-1', {
    conecta: 'icf-cn-energia-2',
    desde: [
      ['Desde cero: qué es un gas',
        xpMira('dibujo', 'Antes de las leyes: un **gas** es un montón de partículas sueltas. Tres medidas lo describen: presión, volumen y temperatura.', { dib: balon, v: { p: 0, n: 0, c: 0, r: '' }, alto: 200 }, [
          ['En la lección de calor viste que el calor pasa de lo caliente a lo frío.', {}],
          ['Un gas son partículas sueltas que vuelan y chocan sin parar.', { r: 'partículas sueltas' }],
          ['Al chocar con la pared del balón la empujan: eso es la presión.', { c: 1, r: 'presión: empuje de los choques' }],
          ['Con el inflador entran más partículas: más choques, más presión.', { c: 1, n: 1, p: 1, r: 'más partículas, más presión' }],
          ['El volumen es el espacio que ocupa el gas: se mide en litros.', { c: 1, n: 1, p: 1, r: 'volumen: litros' }],
          ['Calentar las hace ir más rápido; en gases se usa kelvin: 0 °C son 273 K.', { c: 1, n: 1, p: 1, r: 'temperatura: kelvin' }],
        ], 'Presión: empuje de los choques. Volumen: espacio que ocupa. Temperatura: qué tan rápido se mueven, en kelvin.'),
        xpHaz('hoja', 'Subraya qué es la **presión** de un gas.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El empuje de sus partículas al chocar con las paredes.'], ['El color del gas.'], ['Lo que pesa el recipiente.']], pista: 'Piensa en lo que hacen las partículas contra la pared del balón.' }, 'Choques contra la pared: presión.')],
    ],
    despues: [
      ['Más difícil: la gráfica de Boyle',
        xpMira('dibujo', 'Un paso más: te preguntan **cuál gráfica** representa la ley de Boyle. Mira la forma, no solo si sube o baja.', { dib: hiper, v: { n: 0, c: 0, mal: 0, t: '' }, alto: 198 }, [
          ['Con la temperatura fija, se mide la presión para varios volúmenes.', { n: 1, t: '12 L: 1 atm' }],
          ['Con la mitad del volumen, el doble de presión.', { n: 2, t: '6 L: 2 atm' }],
          ['Con 3 L, 4 atm; con 2 L, 6 atm.', { n: 4, t: 'P · V = 12 siempre' }],
          ['Los puntos no forman una recta: forman una curva que baja cada vez más despacio.', { n: 4, c: 1, t: 'curva, no recta' }],
          ['La recta es la trampa: no pasa por todos los puntos.', { n: 4, c: 1, mal: 1, t: 'la recta no sirve' }],
        ], 'Presión contra volumen da una curva que baja cada vez más despacio: el producto siempre es el mismo.'),
        xpHaz('hoja', 'Con la temperatura fija, subraya la forma de la gráfica de presión contra volumen.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Una recta que sube.'], ['Una recta horizontal.'], ['Una curva que baja cada vez más despacio.']], pista: 'Si el volumen se duplica, la presión se va a la mitad: ¿eso es una recta?' }, 'Curva que baja: es una relación inversa.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una lata cerrada de aerosol está a 27 °C y 3 atm. Se calienta a 54 °C. ¿Su presión se duplica? Mira las opciones «Sí/No, porque…».', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque la temperatura se duplicó.'], ['Sí, porque el gas se expande el doble.'], ['No, porque la lata impide que cambie la presión.'], ['No: de 300 K a 327 K sube solo un 9 %, a unos 3.27 atm.']] }, [
        ['Decide primero con tu cuenta, en kelvin: 300 K y 327 K.', {}, '$27 + 273 = 300$'],
        ['La A usa Celsius: 54 no es el doble en kelvin.', { luz: [0], nota: { 0: 'en Celsius' } }],
        ['La B habla de expandirse, pero la lata es rígida.', { luz: [1], nota: { 1: 'no crece' } }],
        ['La C dice No con una razón falsa: la presión sí cambia.', { luz: [2], nota: { 2: 'razón falsa' } }],
        ['La D: la presión sigue a los kelvin, un 9 % más.', { luz: [3], nota: { 3: 'sirve' } }, '$3 \\cdot 1.09 \\approx 3.27$'],
      ], 'Con gases, pasa siempre a kelvin antes de comparar; luego revisa que la razón también sea cierta.'),
      xpHaz('hoja', 'Una bomba de bicicleta tapada tiene 300 mL de aire a 1 atm. Se empuja hasta 75 mL sin cambiar la temperatura. Subraya su presión.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['0.25 atm, porque el volumen bajó.'], ['225 atm, porque 300 − 75.'], ['1 atm, porque el aire es el mismo.'], ['4 atm, porque el volumen bajó a la cuarta parte.']], pista: 'Presión por volumen no cambia: ¿cuántas veces más pequeño quedó?' }, '$300 \\div 75 = 4$: cuatro veces la presión.')],
    cierre: 'Presión, volumen y temperatura en kelvin: mira qué queda fijo y cómo se mueven los otros dos.',
  });

  // Dos vasos de agua y panela: k 1 los bloques arriba (1 y 3), k 2 ya disueltos (claro y oscuro).
  const bloque = (x, y) => `<path d="M${x - 11} ${y - 7} H${x + 11} L${x + 13} ${y + 7} H${x - 13}Z" fill="#8a5a22" stroke="#5a3712" stroke-width=".8"/><path d="M${x - 11} ${y - 7} H${x + 11} L${x + 9} ${y - 3} H${x - 9}Z" fill="#b07a3a"/>`;
  const panela = (v, K) => {
    const k = v.k || 0;
    let s = X.vaso(110, 168, 74, 96, 0.72, k >= 2 ? 'te' : 'agua') + X.vaso(240, 168, 74, 96, 0.72, k >= 2 ? 'cafe' : 'agua');
    if (k >= 1 && k < 2) s += bloque(110, 58) + bloque(226, 58) + bloque(254, 58) + bloque(240, 43);
    if (k >= 1) s += X.rot(110, 188, '1 bloque') + X.rot(240, 188, '3 bloques');
    return X.foto(s + (v.r ? X.rot(175, 20, v.r, 'oscuro') : ''), 200, 'mesa', 170);
  };

  xpAmplia('icf-cn-gases-2', {
    conecta: 'icf-cn-materia-3',
    desde: [
      ['Desde cero: soluto, solvente y disolución',
        xpMira('dibujo', 'Antes de las cuentas: una **disolución** es una mezcla pareja, como el agua de panela. Tiene dos partes con nombre propio.', { dib: panela, v: { k: 0, r: '' }, alto: 200 }, [
          ['En la lección de solubilidad viste que en el agua solo cabe hasta cierta cantidad.', {}],
          ['El agua es el solvente: lo que disuelve.', { r: 'solvente: el agua' }],
          ['La panela es el soluto: lo que se disuelve.', { k: 1, r: 'soluto: la panela' }],
          ['Al revolver queda una sola mezcla pareja: la disolución.', { k: 2, r: 'disolución' }],
          ['Con más panela en la misma agua, queda más concentrada.', { k: 2, r: 'más soluto, más concentrada' }],
          ['Concentración: cuánto soluto hay en cada porción de disolución.', { k: 2, r: 'soluto por porción' }],
        ], 'Solvente: el que disuelve. Soluto: lo disuelto. Concentración: cuánto soluto hay por cada porción.'),
        xpHaz('hoja', 'Pon al margen qué es cada cosa en un tinto con azúcar.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['soluto', 'solvente'], meta: [1, 0], paras: [['El agua del tinto'], ['El azúcar que se disuelve']], pista: 'Alguna no va ahí: ¿cuál disuelve y cuál se disuelve?' }, 'El agua disuelve; el azúcar se disuelve.')],
    ],
    despues: [
      ['Más difícil: mezclar dos disoluciones',
        xpMira('fichas', 'Un paso más: si se juntan dos disoluciones, las concentraciones **no se suman**. Se suman los gramos y los litros.', { slots: fila('gramos', 'litros', 'g/L'), fichas: ['14', '2', '7'], alto: 96 }, [
          ['Un litro a 10 g/L tiene 10 gramos; otro a 4 g/L, 4 gramos.', {}],
          ['Juntos tienen 14 gramos de soluto.', { pon: { 0: '14' } }, '$10 + 4 = 14$'],
          ['Y entre los dos ocupan 2 litros.', { pon: { 1: '2' } }],
          ['La mezcla queda a 7 g/L, entre las dos.', { pon: { 2: '7' } }, '$14 \\div 2 = 7$'],
          ['La trampa es sumar: 14 g/L sería más que las dos.', {}],
        ], 'Al mezclar: gramos con gramos, litros con litros. La concentración queda entre las dos.'),
        xpHaz('fichas', 'Se mezclan 2 L a 6 g/L con 2 L a 10 g/L. Pon los gramos totales y la concentración final.', { slots: fila('gramos', 'g/L'), fichas: ['32', '8', '16', '4', '12'], meta: ['32', '8'], alto: 96, pista: 'Cada una: concentración por litros. Luego divide entre los 4 L.' }, '$12 + 20 = 32$ g y $32 \\div 4 = 8$ g/L.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Tres vasos de jugo en polvo: P, 10 g en 200 mL; Q, 10 g en 500 mL; R, 30 g en 1 000 mL. ¿Cuál quedó **más concentrado**?', { letras: ['A', 'B', 'C', 'D'], paras: [['R, porque tiene más soluto.'], ['Q, porque tiene más agua que P.'], ['P y Q quedaron iguales, porque tienen 10 g.'], ['P, porque tiene más soluto en cada litro.']] }, [
        ['Pasa todo a la misma unidad: gramos por litro.', {}],
        ['P: 50 g/L. Q: 20 g/L. R: 30 g/L.', {}, '$10 \\div 0.2 = 50$'],
        ['La A mira el total, no la proporción.', { luz: [0], nota: { 0: 'total' } }],
        ['La C olvida que el agua es distinta.', { luz: [2], nota: { 2: 'falta el agua' } }],
        ['La B confunde más agua con más concentrado: es al revés.', { luz: [1], nota: { 1: 'invierte' } }],
        ['La D compara bien: 50 es lo más alto.', { luz: [3], nota: { 3: 'sirve' } }],
      ], 'Para comparar concentraciones, divide cada soluto entre su volumen, en la misma unidad.'),
      xpHaz('hoja', 'Un suero tiene 9 g de sal por litro. Se sirven 250 mL. Subraya la concentración de lo servido.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['2.25 g/L, porque es la cuarta parte.'], ['36 g/L, porque 9 · 4.'], ['9 g/L, porque servir no cambia la concentración.'], ['0.25 g/L, porque son 250 mL.']], pista: 'Sale soluto y agua en la misma proporción. ¿Qué cambia: los gramos o los gramos por litro?' }, 'Hay 2.25 g en 0.25 L: siguen siendo 9 g/L.')],
    cierre: 'Concentración es soluto entre disolución; al diluir o mezclar, cuenta gramos y litros por aparte.',
  });

  // Pila, interruptor (c: 1 cerrado) y bombillo sobre la mesa.
  const circuito = (v, K) => {
    const c = v.c || 0, on = c > 0.5;
    let s = X.cable([[124, 150], [160, 150]]) + X.cable([[186, 150], [300, 150], [300, 100], [259, 100]]) + X.cable([[241, 100], [36, 100], [36, 150], [60, 150]], '#2b2f33');
    s += `<rect x="154" y="152" width="40" height="8" rx="2" fill="#3b4247"/><circle cx="162" cy="150" r="3" fill="url(#xlb-metal)" stroke="#4d565c"/><circle cx="186" cy="150" r="3" fill="url(#xlb-metal)" stroke="#4d565c"/>` +
      `<line x1="162" y1="150" x2="${r2(162 + 24 * Math.cos((1 - c) * 0.6))}" y2="${r2(150 - 24 * Math.sin((1 - c) * 0.6))}" stroke="#c0392b" stroke-width="3" stroke-linecap="round"/>`;
    s += X.pila(92, 150, '9 V') + X.bombillo(250, 76, on ? 1 : 0);
    if (on && (v.e || 0) > 0.5) [[140, 150], [240, 150], [300, 126], [150, 100], [60, 100], [36, 128]].forEach(([x, y]) => { s += `<circle cx="${x}" cy="${y}" r="2.6" fill="#ffd23f" stroke="#7a5b00" stroke-width=".5"/>`; });
    return X.foto(s + (v.r ? X.rot(150, 30, v.r, 'oscuro') : ''), 200, 'mesa', 168);
  };

  xpAmplia('icf-cn-electrico-1', {
    conecta: 'icf-cn-atomo-2',
    desde: [
      ['Desde cero: qué es un circuito',
        xpMira('dibujo', 'Antes de las fórmulas: un **circuito** es un camino cerrado por donde la pila empuja electrones. Si el camino se abre, no pasa nada.', { dib: circuito, v: { c: 0, e: 0, r: '' }, alto: 200 }, [
          ['En la lección de enlaces viste que en un metal los electrones se mueven libres.', {}],
          ['La pila empuja esos electrones: ese empuje es el voltaje.', { r: 'voltaje: el empuje (V)' }],
          ['Los cables de cobre son el camino de los electrones.', { r: 'cables: el camino' }],
          ['Con el interruptor cerrado, el camino da la vuelta y el bombillo prende.', { c: 1, e: 1, r: 'circuito cerrado' }],
          ['Lo que pasa por segundo es la corriente; lo que estorba, la resistencia.', { c: 1, e: 1, r: 'corriente (A), resistencia (Ω)' }],
          ['Como una manguera: la presión, el agua que pasa y la parte estrecha.', { c: 1, e: 1, r: 'como una manguera' }],
          ['Si se abre el interruptor, se corta el camino y se apaga.', { c: 0, e: 0, r: 'circuito abierto' }],
        ], 'Voltaje empuja, corriente es lo que pasa, resistencia estorba. Sin camino cerrado no hay corriente.'),
        xpHaz('hoja', 'Subraya en qué caso **prende** el bombillo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un solo cable de un polo de la pila al bombillo, sin volver al otro polo.'], ['Dos cables que forman un camino cerrado.'], ['El circuito con el interruptor abierto.']], pista: 'La corriente tiene que salir de la pila y volver a ella.' }, 'Sin vuelta a la pila no hay corriente.')],
    ],
    despues: [
      ['Más difícil: agregar bombillos',
        xpMira('hoja', 'Un paso más: ¿qué pasa con el brillo al **agregar** bombillos iguales? Depende de si van en serie o en paralelo.', { paras: [['Serie, 1 bombillo: brillo normal'], ['Serie, 2 bombillos: los dos brillan menos'], ['Paralelo, 2 bombillos: cada uno brilla normal'], ['Paralelo: la pila entrega más corriente y dura menos']] }, [
          ['Con un bombillo, el brillo es el de siempre.', { luz: [0] }],
          ['En serie, dos bombillos suman resistencia: pasa menos corriente.', { luz: [1], nota: { 1: 'menos brillo' } }],
          ['En paralelo, cada uno recibe todo el voltaje de la pila.', { luz: [2], nota: { 2: 'igual brillo' } }],
          ['Pero la pila alimenta dos caminos: entrega el doble de corriente.', { luz: [3] }],
          ['Por eso en las casas todo va en paralelo.', { luz: [2, 3] }],
        ], 'En serie, más bombillos brillan menos. En paralelo brillan igual, pero la pila se gasta más rápido.'),
        xpHaz('hoja', 'Tres bombillos iguales están en serie con una pila. Se agrega un cuarto en la misma fila. Subraya lo que pasa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Todos brillan más.'], ['Solo el nuevo brilla.'], ['Todos brillan menos.']], pista: 'En serie, cada bombillo nuevo agrega resistencia al único camino.' }, 'Más resistencia en serie: menos corriente para todos.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Dos bombillos iguales están en paralelo con una pila. Se desenrosca uno. ¿Qué pasa con el otro?', { letras: ['A', 'B', 'C', 'D'], paras: [['Se apaga, porque se rompe el circuito.'], ['Brilla el doble, porque recibe la corriente del otro.'], ['Sigue igual, porque su rama sigue cerrada con el mismo voltaje.'], ['Brilla menos, porque la pila se cansa.']] }, [
        ['Primero imagina el dibujo: dos caminos separados.', {}],
        ['La A piensa en serie: allá sí se apagaría.', { luz: [0], nota: { 0: 'es serie' } }],
        ['La B supone que la corriente se pasa de rama.', { luz: [1], nota: { 1: 'no se pasa' } }],
        ['La D inventa un cansancio que nada en el dibujo muestra.', { luz: [3], nota: { 3: 'sin dato' } }],
        ['La C: su camino sigue cerrado y recibe el mismo voltaje.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'Primero identifica si es serie o paralelo: muchas opciones falsas responden por el otro circuito.'),
      xpHaz('hoja', 'Un horno de 1 000 W y un cargador de 10 W se usan 1 hora cada uno. Subraya lo **correcto**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['Gastan lo mismo, porque fue el mismo tiempo.'], ['El cargador gasta más, porque se calienta.'], ['Ninguno gasta: la energía se conserva.'], ['El horno gasta 100 veces más energía.']], pista: 'Energía es potencia por tiempo. El tiempo es igual: compara las potencias.' }, '$1\\,000 \\div 10 = 100$: cien veces más energía.')],
    cierre: 'Camino cerrado, voltaje igual a corriente por resistencia, serie o paralelo, y energía es potencia por tiempo.',
  });

  // Peinilla frotada (q) que baja (b) hacia papelitos que saltan (a).
  const PAPEL = [[96, 2], [118, 6], [140, 1], [160, 5], [182, 3], [204, 7], [226, 2], [248, 4]];
  const peinilla = (v, K) => {
    const b = v.b || 0, a = v.a || 0, py = 36 + b * 52;
    let s = `<rect x="100" y="${r2(py)}" width="140" height="14" rx="4" fill="#2d6cdf"/>`;
    for (let i = 0; i < 26; i++) s += `<rect x="${103 + i * 5.2}" y="${r2(py + 13)}" width="2.6" height="16" rx="1" fill="#2d6cdf"/>`;
    if ((v.q || 0) > 0.5) for (let i = 0; i < 6; i++) s += `<text x="${118 + i * 21}" y="${r2(py + 11)}" fill="#fff" font-size="12" font-weight="700" style="text-anchor:middle">−</text>`;
    PAPEL.forEach(([x, g], i) => { const near = Math.abs(x - 170) < 70, y = 160 - (near ? a * (160 - (py + 34)) * (0.6 + (i % 3) * 0.2) : 0); s += `<rect x="${x - 5}" y="${r2(y - 3)}" width="10" height="6" rx="1" fill="#ffffff" stroke="#b9b6aa" stroke-width=".6" transform="rotate(${g * 12 - 40} ${x} ${r2(y)})"/>`; });
    return X.foto(s + (v.r ? X.rot(170, 186, v.r, 'oscuro') : ''), 200, 'mesa', 166);
  };

  xpAmplia('icf-cn-electrico-2', {
    conecta: 'icf-cn-electrico-1',
    desde: [
      ['Desde cero: la carga eléctrica',
        xpMira('dibujo', 'Antes de las fuerzas: frota una peinilla en tu pelo y acércala a unos papelitos. Así se ve la **carga eléctrica**.', { dib: peinilla, v: { b: 0, q: 0, a: 0, r: '' }, alto: 200 }, [
          ['En la lección anterior viste que la corriente es carga eléctrica que se mueve.', {}],
          ['Toda la materia tiene cargas positivas y negativas, en igual cantidad.', { r: 'neutra: iguales cargas' }],
          ['Al peinarte, la peinilla le quita electrones al pelo.', { q: 1, r: 'gana electrones' }],
          ['Queda con carga negativa de más: está cargada.', { q: 1, r: 'carga negativa' }],
          ['Al acercarla, los papelitos saltan hacia ella: se atraen.', { q: 1, b: 1, a: 1, r: 'atracción' }],
          ['Cargas iguales se repelen; distintas se atraen.', { q: 1, b: 1, a: 1, r: 'iguales se repelen' }],
        ], 'Frotar pasa electrones de un cuerpo a otro y deja carga. Iguales se repelen y distintas se atraen.'),
        xpHaz('hoja', 'Dos peinillas se frotan con el mismo pelo y quedan negativas. Subraya qué hacen al acercarlas.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Se repelen.'], ['Se atraen.'], ['Nada, porque son de plástico.']], pista: 'Las dos tienen la misma carga.' }, 'Iguales se repelen.')],
    ],
    despues: [
      ['Más difícil: la brújula y la Tierra',
        xpMira('hoja', 'Un paso más: la **brújula** es un imán pequeño que gira libre. Se alinea con el imán gigante que es la Tierra.', { paras: [['La aguja es un imán con polo N y polo S'], ['Su polo N apunta al norte geográfico'], ['Polos distintos se atraen'], ['Cerca del norte geográfico hay un polo S magnético']] }, [
          ['La aguja de la brújula es un imán que gira libre.', { luz: [0] }],
          ['Su polo norte apunta hacia el norte de la Tierra.', { luz: [1] }],
          ['Pero recuerda: lo que atrae a un polo N es un polo S.', { luz: [2] }],
          ['Entonces, cerca del norte geográfico hay un polo sur magnético.', { luz: [3], nota: { 3: 'sorpresa' } }],
          ['Si acercas un imán, la aguja le hace caso a él.', {}],
        ], 'La brújula es un imán: su polo N apunta al norte porque allá hay un polo S magnético.'),
        xpHaz('hoja', 'Se acerca el polo N de un imán a una brújula. Subraya hacia dónde apunta el extremo N de la aguja.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Hacia el imán.'], ['Lejos del imán.'], ['Sigue al norte, sin cambio.']], pista: 'Dos polos iguales se rechazan.' }, 'N con N se repelen: la aguja se voltea.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se frota una peinilla y se cuentan los papelitos que levanta: 5 frotes, 2; 10 frotes, 4; 20 frotes, 8. ¿Qué conclusión tiene **evidencia**?', { letras: ['A', 'B', 'C', 'D'], paras: [['Con 100 frotes levantará justo 40 papelitos.'], ['En este rango, más frotes levantan más papelitos.'], ['Una peinilla de metal levantaría los mismos.'], ['Los papelitos ya tenían carga antes de empezar.']] }, [
        ['Mira qué cambió (los frotes) y qué se midió (los papelitos).', {}],
        ['La A va mucho más allá de lo medido.', { luz: [0], nota: { 0: 'extrapola' } }],
        ['La C habla de un material que nadie probó.', { luz: [2], nota: { 2: 'sin dato' } }],
        ['La D afirma algo que el experimento no midió.', { luz: [3], nota: { 3: 'sin dato' } }],
        ['La B dice lo que muestran los datos, y solo eso.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Una conclusión con evidencia se queda dentro de lo que se midió.'),
      xpHaz('hoja', 'Se quiere saber si la humedad del aire cambia cuántos papelitos levanta la peinilla. Subraya el **mejor** diseño.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Peinillas distintas, en días distintos.'], ['Una sola prueba en un día seco.'], ['Misma peinilla y mismos frotes, en aire seco y en aire húmedo.'], ['Aire húmedo, pero con más frotes.']], pista: 'Solo debe cambiar la humedad; lo demás queda igual.' }, 'Una sola cosa cambia: la humedad.')],
    cierre: 'Cargas iguales se repelen y distintas se atraen; los imanes tienen dos polos, y corriente e imán se crean el uno al otro.',
  });
}
;
//#archivo js/explora-icf-cn-12.js
// Preicfes · Ciencias Naturales, mundo 13 «Ciencia y Sociedad» (Explora, escenas «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));

  xpLec('icf-cn-cts-1', [
    ['Prevenir y curar',
      xpMira('hoja', 'Empecemos por la idea: **vacuna** previene, **antibiótico** mata **bacterias**; contra virus, no.', { paras: [['Vacuna: enseña a las defensas'], ['Antibiótico: contra bacterias'], ['Antibiótico para la gripa'], ['Muchos vacunados protegen a otros']] }, [
        ['Deja memoria para reconocer al virus.', { luz: [0] }],
        ['Este solo sirve contra bacterias.', { luz: [1] }],
        ['La gripa es un virus: no sirve.', { luz: [2], tacha: [2] }],
        ['Y crea bacterias resistentes.', { luz: [1] }],
        ['Si casi todos están protegidos, no circula.', { luz: [3] }],
      ], 'Prevenir no es curar.'),
      xpHaz('hoja', 'Un niño tiene varicela, causada por un virus. Subraya lo que **no** sirve.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Reposo y líquidos'], ['Un antibiótico contra el virus'], ['No contagiar a otros']], pista: '¿Contra qué actúa el antibiótico?' }, 'Los antibióticos no actúan contra virus.')],
    ['Comparar riesgos',
      xpMira('fichas', 'Segunda idea: los riesgos se comparan en **proporción**.', { slots: fila('con', 'sin'), fichas: ['1 %', '15 %'], alto: 96 }, [
        ['Con cinturón, 5 heridos de 500.', { pon: { 0: '1 %' } }, '$5 \\div 500$'],
        ['Sin cinturón, 3 heridos de 20.', { pon: { 1: '15 %' } }, '$3 \\div 20$'],
        ['Cinco es más que tres…', {}],
        ['…pero el riesgo fue quince veces menor.', {}, '$15 \\div 1 = 15$'],
        ['Los grupos no eran del mismo tamaño.', {}],
      ], 'Divide cada caso entre su grupo.'),
      xpHaz('fichas', 'Con vacuna enfermaron 6 de 300; sin ella, 9 de 90. Pon los dos riesgos.', { slots: fila('con', 'sin'), fichas: ['2 %', '10 %', '6 %', '9 %', '3 %'], meta: ['2 %', '10 %'], alto: 96, pista: 'Divide cada uno entre su grupo.' }, '$6 \\div 300$ y $9 \\div 90$.')],
    ['Ver por dentro',
      xpMira('hoja', 'Tercera idea: cada tecnología **ve** algo y tiene su **cuidado**.', { paras: [['Rayos X: huesos'], ['Ecografía: sonido'], ['Resonancia: imanes'], ['Rayos X: lo necesario']] }, [
        ['Atraviesan la carne y paran en el hueso.', { luz: [0] }],
        ['Sirve para ver a un bebé.', { luz: [1] }],
        ['Muestra tejidos blandos; sin metales.', { luz: [2] }],
        ['Su energía puede dañar el ADN.', { luz: [3] }],
        ['Se compara el beneficio con el riesgo.', {}],
      ], 'Beneficio frente a riesgo.'),
      xpHaz('hoja', 'Pon al margen la técnica más adecuada.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['ecografía', 'rayos X'], meta: [1, 0], paras: [['Ver si un brazo se quebró'], ['Ver el corazón de un bebé por nacer']], pista: 'Alguna no va ahí: ¿hueso o bebé?' }, 'El hueso detiene los rayos X; el sonido no daña el ADN.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', '«Se enfermaron 40 vacunados y 30 sin vacunar». Subraya el dato que **falta**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El color de la vacuna'], ['El nombre del médico'], ['Cuántos había en cada grupo']], pista: '¿Con qué se divide?' }, 'Sin el tamaño de los grupos no hay riesgo que comparar.')],
  ], 'Prevenir, comparar y ver por dentro.');

  xpLec('icf-cn-cts-2', [
    ['Energía',
      xpMira('hoja', 'Empecemos por la idea: toda fuente de energía tiene **ventajas** y **costos**.', { paras: [['Sol y viento: se reponen'], ['No soplan ni brillan siempre'], ['Carbón y petróleo: se acaban'], ['Todas cuestan al fabricarse']] }, [
        ['Estas fuentes son renovables.', { luz: [0], nota: { 0: 'renovables' } }],
        ['Por eso hacen falta baterías.', { luz: [1] }],
        ['Sueltan gases al quemarse.', { luz: [2], nota: { 2: 'no renovables' } }],
        ['Paneles y baterías exigen minerales.', { luz: [3] }],
        ['Se decide mirando todo el ciclo.', {}],
      ], 'Ventajas y costos de principio a fin.'),
      xpHaz('hoja', 'Subraya la **desventaja** de los paneles solares.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Se repone cada día'], ['De noche no producen'], ['No sueltan humo al funcionar']], pista: 'Las otras son ventajas.' }, 'De noche hace falta guardar energía.')],
    ['Efecto invernadero',
      xpMira('hoja', 'Segunda idea: el efecto invernadero es **necesario**; el problema es su **aumento**.', { paras: [['Entra la luz del sol'], ['La Tierra devuelve calor'], ['Los gases retienen una parte'], ['Más gases, más calor']] }, [
        ['La luz pasa y calienta el suelo.', { luz: [0] }],
        ['El suelo devuelve calor.', { luz: [1] }],
        ['Una parte no se escapa.', { luz: [2] }],
        ['Sin eso, el planeta sería helado.', { luz: [2] }],
        ['Al quemar y talar, los gases aumentan.', { luz: [3] }],
      ], 'Necesario, pero sin exceso.'),
      xpHaz('fichas', 'Un carro suelta 2 kg de CO₂ por cada 10 km. Pon los kg en 150 km y en un mes de 900 km.', { slots: fila('150 km', '900 km'), fichas: ['30', '180', '75', '300', '90'], meta: ['30', '180'], alto: 96, pista: 'Cuenta cuántos tramos de 10 km hay.' }, '$15 \\cdot 2 = 30$ y $90 \\cdot 2 = 180$.')],
    ['Residuos',
      xpMira('hoja', 'Tercera idea: primero **reducir**, después **reutilizar** y al final **reciclar**.', { paras: [['Reducir: no usar la bolsa'], ['Reutilizar: usarla otra vez'], ['Reciclar: fundirla'], ['Pilas: aparte']] }, [
        ['Lo que no se produce no contamina.', { luz: [0] }],
        ['Usar otra vez casi no gasta.', { luz: [1] }],
        ['Reciclar también gasta energía.', { luz: [2] }],
        ['Sus metales ensucian agua y suelo.', { luz: [3] }],
        ['Lo orgánico sirve de compost.', {}],
      ], 'En ese orden.'),
      xpHaz('hoja', 'Subraya la acción que es **reducir**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Fundir botellas'], ['Sembrar en una lata vieja'], ['Llevar vaso propio y no pedir uno']], pista: 'Evita que el residuo aparezca.' }, 'No se produce el vaso desechable.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Se quiere saber si una turbina afecta a los murciélagos. Subraya lo mejor.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Contarlos antes y después, y en un lugar sin turbina'], ['Preguntar si les gustan'], ['Suponer que no']], pista: 'Mide y compara.' }, 'Comparar permite corregir.')],
  ], 'Costos, aumento y reducir primero.');

  xpLec('icf-cn-cts-3', [
    ['Testimonio y prueba',
      xpMira('hoja', 'Empecemos por la idea: un **testimonio** no es una **prueba**.', { paras: [['«A mí me sirvió»'], ['El dolor sube y baja solo'], ['Esperar mejorar ayuda: placebo'], ['Los que no mejoraron no aparecen']] }, [
        ['Un testimonio puede ser sincero.', { luz: [0] }],
        ['Pero quizá habría mejorado igual.', { luz: [1] }],
        ['O fue el efecto de esperarlo.', { luz: [2], nota: { 2: 'placebo' } }],
        ['Y solo se muestran los casos buenos.', { luz: [3] }],
        ['Por eso hace falta comparar.', {}],
      ], 'Sincero no es lo mismo que probado.'),
      xpHaz('hoja', 'Subraya la evidencia **más sólida** de que un jarabe sirve.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Mil comentarios'], ['Lo toma una cantante'], ['Mejoró más que uno falso, al azar']], pista: 'Busca una comparación.' }, 'Hay grupo de control y azar.')],
    ['Un buen experimento',
      xpMira('hoja', 'Segunda idea: **azar**, **control** y **doble ciego** dejan **un solo** cambio.', { paras: [['Al azar: grupos parecidos'], ['Control: uno falso, igual'], ['Doble ciego: nadie sabe'], ['Lo único distinto: el remedio']] }, [
        ['Así no quedan los sanos a un lado.', { luz: [0] }],
        ['Todos creen recibir lo mismo.', { luz: [1] }],
        ['Ni el paciente ni quien mide lo sabe.', { luz: [2] }],
        ['Si hay diferencia, se sabe de qué es.', { luz: [3] }],
        ['Con pocos casos, puede ser el azar.', {}],
      ], 'Cambiar una sola cosa.'),
      xpHaz('hoja', 'Pon al margen qué regla se **incumplió**.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['control', 'azar'], meta: [1, 0], paras: [['Los jóvenes tomaron el remedio y los viejos, el falso'], ['Todos tomaron el remedio']], pista: 'Alguna no va ahí: ¿cómo se repartieron o con quién se comparó?' }, 'Se repartió por edad; y no hubo con quién comparar.')],
    ['Datos y valores',
      xpMira('hoja', 'Tercera idea: la ciencia **mide**; la sociedad **decide** con datos y valores.', { paras: [['¿Cuánto contamina?'], ['¿Se permite?'], ['¿Quién pagó el estudio?'], ['¿Lo repitieron otros?']] }, [
        ['Esta se responde midiendo.', { luz: [0], nota: { 0: 'datos' } }],
        ['Esta también mira lo que importa.', { luz: [1], nota: { 1: 'valores' } }],
        ['Si lo pagó el vendedor, con cuidado.', { luz: [2] }],
        ['Un estudio solo casi nunca basta.', { luz: [3] }],
        ['Decidir sin datos sale caro.', {}],
      ], 'Datos primero, y después valores.'),
      xpHaz('hoja', 'Subraya la pregunta que la ciencia **sola** puede responder.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['¿Cuántos decibeles hay en la plaza?'], ['¿Debe cerrarse la discoteca?'], ['¿Es justo el cobro?']], pista: '¿Cuál basta con medir?' }, 'Los decibeles se miden; lo demás también se valora.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Con remedio mejoran 45 de 60; con placebo, 30 de 60. Pon los puntos de diferencia y cuántos de más mejoraron.', { slots: fila('puntos', 'de más'), fichas: ['25', '15', '75', '50', '45'], meta: ['25', '15'], alto: 96, pista: 'Pasa cada grupo a porcentaje.' }, '$75\\% - 50\\% = 25$ puntos y $45 - 30 = 15$.')],
  ], 'Comparar, un solo cambio y decidir.');
}
;
//#archivo js/explora-icf-cn-12-pasos.js
// Preicfes · Ciencias Naturales, mundo 13 «Ciencia y Sociedad», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const r2 = x => Math.round(x * 100) / 100;

  // Microscopio y lo que se ve en el círculo: k 1 bacterias, 2 un virus junto a una célula, 3 anticuerpos.
  const virus = (x, y, r) => { let q = `<circle cx="${x}" cy="${y}" r="${r}" fill="#9b6ad0" stroke="#5b3590"/>`; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; q += `<line x1="${r2(x + r * Math.cos(a))}" y1="${r2(y + r * Math.sin(a))}" x2="${r2(x + (r + 3) * Math.cos(a))}" y2="${r2(y + (r + 3) * Math.sin(a))}" stroke="#5b3590" stroke-width="1.4"/><circle cx="${r2(x + (r + 3.5) * Math.cos(a))}" cy="${r2(y + (r + 3.5) * Math.sin(a))}" r="1.3" fill="#c9a4ef"/>`; } return q; };
  const anti = (x, y, g) => `<g transform="rotate(${g} ${x} ${y})" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round"><path d="M${x} ${y + 7} V${y} L${x - 5} ${y - 6} M${x} ${y} L${x + 5} ${y - 6}"/></g>`;
  const micro = (v, K) => {
    const k = v.k || 0, cx = 238, cy = 90;
    let s = X.microscopio(84, 168, 1);
    if (k >= 1) {
      s += `<path d="M78 46 L${cx - 62} ${cy - 20}" stroke="#fff" stroke-opacity=".7" stroke-dasharray="4 4"/><circle cx="${cx}" cy="${cy}" r="64" fill="#f3efe0" stroke="#3b4247" stroke-width="3"/>`;
      [[-30, -28, 20], [-8, -38, -30], [18, -22, 60], [-36, 6, 80], [30, 10, 10], [-14, 30, -50], [10, 40, 35]].forEach(([dx, dy, g]) => { s += `<rect x="${cx + dx - 11}" y="${cy + dy - 5}" width="22" height="10" rx="5" fill="#7cc46a" stroke="#3e8a32" transform="rotate(${g} ${cx + dx} ${cy + dy})"/>`; });
      if (k >= 2) s += virus(cx + 38, cy - 34, 4) + virus(cx + 44, cy - 22, 4) + X.rot(cx, cy + 54, 'virus: casi invisibles');
      if (k >= 3) [[-22, -12, 30], [6, -6, -20], [-20, 20, 70], [20, 26, -40]].forEach(([dx, dy, g]) => { s += anti(cx + dx, cy + dy, g); });
    }
    return X.foto(s + (v.r ? X.rot(140, 28, v.r, 'oscuro') : ''), 200, 'lab');
  };
  // Grupo de 20 (5 × 4): v = 1 vacunados 16; el contagio avanza s pasos desde la persona 7.
  const SIN = [7, 3, 15, 19];
  const grupo = (v, K) => {
    const vac = i => (v.v || 0) > 0.5 && !SIN.includes(i), pasos = Math.floor(v.s || 0), enf = new Set([7]);
    for (let p = 0; p < pasos; p++) [...enf].forEach(i => { const r = Math.floor(i / 5), c = i % 5; [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].forEach(([a, b]) => { const j = a * 5 + b; if (a >= 0 && a < 4 && b >= 0 && b < 5 && !vac(j)) enf.add(j); }); });
    let h = '';
    for (let i = 0; i < 20; i++) { const x = 70 + (i % 5) * 50, y = 30 + Math.floor(i / 5) * 34; h += K.c(x, y, 12, enf.has(i) ? 'fF' : vac(i) ? 'fo' : 'fc'); if (vac(i)) h += K.t(x, y + 4, '✓', 's'); }
    return h + K.t(170, 172, v.t || '', 'ta');
  };

  xpAmplia('icf-cn-cts-1', {
    conecta: 'icf-cn-herencia-3',
    desde: [
      ['Desde cero: microbios y defensas',
        xpMira('dibujo', 'Antes de la tecnología: hay seres diminutos que causan enfermedades, los **microbios**. Conocerlos dice qué remedio sirve.', { dib: micro, v: { k: 0, r: '' }, alto: 200 }, [
          ['En la lección de selección viste que el ambiente escoge a los que resisten.', {}],
          ['Con un microscopio se ven las bacterias: seres vivos de una sola célula.', { k: 1, r: 'bacterias: células vivas' }],
          ['Los virus son mucho más pequeños y solo se multiplican dentro de una célula.', { k: 2, r: 'virus: dentro de células' }],
          ['El cuerpo tiene defensas: el sistema inmune fabrica anticuerpos.', { k: 3, r: 'anticuerpos' }],
          ['La vacuna enseña a las defensas antes de que llegue el microbio.', { k: 3, r: 'vacuna: enseña' }],
          ['El antibiótico ataca bacterias; contra los virus no sirve.', { k: 3, r: 'antibiótico: bacterias' }],
        ], 'Bacteria: célula viva. Virus: necesita una célula. La vacuna enseña a las defensas; el antibiótico ataca bacterias.'),
        xpHaz('hoja', 'Pon al margen qué es cada uno.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['bacteria', 'virus'], meta: [1, 0], paras: [['Solo se multiplica dentro de una célula.'], ['Ser vivo de una sola célula que se reproduce solo.']], pista: 'Alguna no va ahí: ¿puede vivir por su cuenta?' }, 'El virus necesita una célula; la bacteria es una célula.')],
    ],
    despues: [
      ['Más difícil: la protección de grupo',
        xpMira('dibujo', 'Un paso más: una vacuna protege a quien la recibe, pero cuando casi todos la tienen, también protege a **los demás**.', { dib: grupo, v: { v: 0, s: 0, t: '' }, alto: 184 }, [
          ['Llega un enfermo a un grupo donde nadie está vacunado.', { v: 0, s: 0, t: '1 enfermo' }],
          ['Contagia a sus vecinos, y ellos a los suyos.', { v: 0, s: 4, t: 'se riega por el grupo' }],
          ['Ahora casi todos están vacunados.', { v: 1, s: 0, t: '16 de 20 vacunados' }],
          ['El enfermo no encuentra a quién pasarle el virus.', { v: 1, s: 4, t: 'el contagio se detiene' }],
          ['Hasta los pocos sin vacuna quedan protegidos.', { v: 1, s: 4, t: 'protección de grupo' }],
        ], 'Si casi todos están vacunados, el microbio no encuentra a quién pasar: protege también a los no vacunados.'),
        xpHaz('hoja', 'En un barrio de 100 personas se vacunan 90. Subraya quiénes quedan **más protegidos**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Solo los 90 vacunados.'], ['Nadie: la vacuna solo sirve en el laboratorio.'], ['También los 10 sin vacuna, porque el virus circula menos.']], pista: 'Piensa en el grupo de 20: ¿a quién podía contagiar el enfermo?' }, 'Con pocos contagiables, el virus casi no circula.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En un colegio, de 200 que se lavaban las manos se enfermaron 6; de 50 que no se las lavaban, 8. ¿Qué conclusión es **correcta**?', { letras: ['A', 'B', 'C', 'D'], paras: [['Lavarse no sirve, porque igual hubo 6 enfermos.'], ['Sin lavado el riesgo fue mayor: 16 % frente a 3 %.'], ['El riesgo fue casi igual, porque 6 y 8 se parecen.'], ['Hubo más enfermos sin lavado porque eran más estudiantes.']] }, [
        ['Antes de leer, divide cada caso entre su grupo.', {}, '$6 \\div 200 = 3\\%$'],
        ['Sin lavado fueron 8 de 50.', {}, '$8 \\div 50 = 16\\%$'],
        ['La A exige cero enfermos: proteger no es garantizar.', { luz: [0], nota: { 0: 'absoluto' } }],
        ['La C compara totales, no proporciones.', { luz: [2], nota: { 2: 'totales' } }],
        ['La D usa un dato falso: sin lavado eran menos.', { luz: [3], nota: { 3: 'dato falso' } }],
        ['La B compara bien: más de cinco veces el riesgo.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Compara riesgos con el porcentaje de cada grupo; desconfía de los totales y de los absolutos.'),
      xpHaz('hoja', 'Con un jarabe la gripa dura 5 días; sin él, también 5 días, en grupos parecidos. Subraya la afirmación con **evidencia**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['El jarabe cura la gripa.'], ['El jarabe es peligroso.'], ['Con estos datos, el jarabe no acorta la gripa.'], ['La gripa la causa una bacteria.']], pista: 'Compara los dos grupos: ¿hubo alguna diferencia?' }, 'Sin diferencia entre grupos, no hay evidencia de que sirva.')],
    cierre: 'La vacuna previene, el antibiótico solo sirve contra bacterias, y los riesgos se comparan en proporción.',
  });

  // Sol, embalse, represa con turbina, torre y casa: k 1 embalse, 2 turbina, 3 la casa se ilumina.
  const represa = (v, K) => {
    const k = v.k || 0;
    let s = X.sol(38, 34, 16) + `<path d="M0 132 Q60 124 150 130 V172 H0Z" fill="#4f97c9" opacity="${k >= 1 ? 0.95 : 0.6}"/><path d="M0 136 Q60 128 150 134" stroke="#bfe3f7" stroke-width="1.4" fill="none" opacity=".7"/>` +
      `<path d="M150 112 L170 112 L178 172 L150 172Z" fill="#b9c0c4" stroke="#6f787e"/><path d="M178 172 Q200 162 236 172Z" fill="#4f97c9"/>`;
    if (k >= 2) { s += `<circle cx="188" cy="160" r="9" fill="url(#xlb-metal)" stroke="#4d565c"/>`; for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + 0.4; s += `<line x1="188" y1="160" x2="${r2(188 + 8 * Math.cos(a))}" y2="${r2(160 + 8 * Math.sin(a))}" stroke="#2f3539" stroke-width="2"/>`; } }
    s += `<path d="M236 172 L246 78 L256 172 M240 120 H252 M238 140 H254 M243 96 H249" stroke="#5b646a" stroke-width="2" fill="none"/>` + X.cable([[194, 152], [246, 82], [296, 110]], '#2b2f33');
    s += X.edificio(300, 172, 58, 'casa');
    if (k >= 3) s += `<circle cx="300" cy="148" r="16" fill="url(#xlb-luz)"/>`;
    return X.foto(s + (v.r ? X.rot(110, 26, v.r, 'oscuro') : ''), 200, 'campo', 172);
  };

  xpAmplia('icf-cn-cts-2', {
    conecta: 'icf-cn-ecosistemas-2',
    desde: [
      ['Desde cero: de dónde sale la energía',
        xpMira('dibujo', 'Antes de comparar: la luz de tu casa sale de algún lado. En Colombia, buena parte viene del agua de los ríos.', { dib: represa, v: { k: 0, r: '' }, alto: 200 }, [
          ['En la lección de ciclos viste que el carbono pasa del aire a los seres vivos y vuelve.', {}],
          ['Un recurso es algo de la naturaleza que usamos: agua, sol, petróleo.', { r: 'recursos' }],
          ['La represa guarda el agua del río en un embalse.', { k: 1, r: 'embalse' }],
          ['El agua cae, mueve una turbina y se produce electricidad.', { k: 2, r: 'turbina: electricidad' }],
          ['Los cables la llevan hasta las casas.', { k: 3, r: 'la casa se ilumina' }],
          ['El agua vuelve con la lluvia: es renovable. El petróleo no vuelve: no renovable.', { k: 3, r: 'renovable o no' }],
        ], 'Recurso renovable: se repone, como el agua y el sol. No renovable: se acaba, como el petróleo y el carbón.'),
        xpHaz('hoja', 'Pon al margen qué tipo de recurso es cada uno.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['renovable', 'no renovable'], meta: [1, 0], paras: [['Gas natural sacado de un pozo.'], ['Viento que mueve un molino.']], pista: 'Alguna no va ahí: ¿se repone solo o se acaba?' }, 'El viento vuelve a soplar; el gas del pozo se acaba.')],
    ],
    despues: [
      ['Más difícil: comparar fuentes en una tabla',
        xpMira('hoja', 'Un paso más: muchas veces te dan una **tabla** de emisiones por cada kWh. Ninguna fuente sale en cero si se cuenta su fabricación.', { paras: [['Carbón: cerca de 1 000 g de CO₂ por kWh'], ['Gas: cerca de 450 g'], ['Solar: cerca de 40 g'], ['Agua de represa: cerca de 20 g'], ['«La solar no contamina nada»']] }, [
          ['El carbón es el que más gas suelta por cada kWh.', { luz: [0] }],
          ['El gas suelta menos de la mitad.', { luz: [1] }],
          ['La solar no suelta humo al funcionar, pero fabricar paneles sí.', { luz: [2], nota: { 2: 'fabricación' } }],
          ['La represa suelta poco gas, pero inunda tierra.', { luz: [3], nota: { 3: 'otro costo' } }],
          ['Por eso «nada» es una trampa: todas tienen algún costo.', { luz: [4], tacha: [4] }],
        ], 'Compara por kWh y con todo el ciclo; ninguna fuente es gratis para el ambiente.'),
        xpHaz('fichas', 'Una casa gasta 150 kWh al mes. Con la tabla, pon los kg de CO₂ al mes si la energía viene del carbón y si viene de la represa.', { slots: fila('carbón (kg)', 'represa (kg)'), fichas: ['150', '3', '15', '30', '1 000'], meta: ['150', '3'], alto: 96, pista: 'Multiplica los kWh por los gramos de cada fuente y pasa a kilos.' }, '$150 \\cdot 1\\,000$ g son 150 kg; $150 \\cdot 20$ g son 3 kg.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Al construir una represa se inunda un bosque. ¿Cuál es la consecuencia **más directa** sobre el ambiente?', { letras: ['A', 'B', 'C', 'D'], paras: [['Se acaba para siempre el agua del río.'], ['Sube de inmediato la temperatura de todo el planeta.'], ['Se pierde el hábitat de las plantas y animales del bosque.'], ['La represa empieza a producir petróleo.']] }, [
        ['La pregunta pide lo más directo, no lo más lejano.', {}],
        ['La A usa un absoluto: el río sigue, solo se represa.', { luz: [0], nota: { 0: 'absoluto' } }],
        ['La B es una consecuencia lejana y exagerada.', { luz: [1], nota: { 1: 'lejana' } }],
        ['La D no tiene nada que ver con una represa.', { luz: [3], nota: { 3: 'sin relación' } }],
        ['La C sale directo del dato: el bosque queda bajo el agua.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'Distingue la consecuencia directa de la lejana, y desconfía de «para siempre» y «todo».'),
      xpHaz('hoja', 'Un colegio quiere bajar la basura de botellas plásticas. Subraya la acción que más **reduce**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['Reciclar todas las botellas.'], ['Quemar las botellas en el patio.'], ['Enterrar las botellas.'], ['Instalar un filtro de agua y usar termos propios.']], pista: 'Reducir es que la botella ni siquiera llegue.' }, 'Sin botellas compradas no hay residuo que reciclar.')],
    cierre: 'Toda fuente tiene ventajas y costos en su ciclo; el exceso de gases calienta, y reducir va primero.',
  });

  // Testimonio y evidencia: una persona con cartel; luego dos grupos de 5 (remedio y placebo) y los que mejoran.
  const evidencia = (v, K) => {
    const k = v.k || 0;
    let s = X.persona(48, 172, 1.1, '#8a5aa8', k >= 1 ? { cartel: '¡Me sirvió!' } : {});
    if (k >= 2) {
      for (let i = 0; i < 5; i++) s += X.persona(128 + i * 18, 172, 0.68, k >= 3 && i < 4 ? '#43a047' : '#9aa3a8') + X.persona(232 + i * 18, 172, 0.68, k >= 3 && i < 2 ? '#43a047' : '#9aa3a8');
      s += X.rot(164, 100, 'remedio') + X.rot(268, 100, 'placebo');
    }
    return X.foto(s + (v.r ? X.rot(216, 26, v.r, 'oscuro') : ''), 200, 'lab');
  };

  xpAmplia('icf-cn-cts-3', {
    conecta: 'icf-cn-indaga-2',
    desde: [
      ['Desde cero: qué es una evidencia',
        xpMira('dibujo', 'Antes de decidir: no todo lo que se dice es una prueba. Una **evidencia** es algo medido que cualquiera puede revisar.', { dib: evidencia, v: { k: 0, r: '' }, alto: 200 }, [
          ['En la lección de datos viste que importa hacia dónde van todos los datos, no uno suelto.', {}],
          ['Una persona asegura: «a mí me sirvió». Eso es un testimonio.', { k: 1, r: 'testimonio' }],
          ['Una evidencia es un dato medido que se puede revisar.', { k: 1, r: 'evidencia: medida' }],
          ['Para medir se arman dos grupos parecidos: uno con remedio y otro con placebo.', { k: 2, r: 'dos grupos' }],
          ['El placebo es una pastilla falsa que se ve igual.', { k: 2, r: 'placebo: falsa' }],
          ['Se cuentan los que mejoran en cada grupo y se comparan.', { k: 3, r: '4 de 5 frente a 2 de 5' }],
        ], 'Testimonio: lo que alguien cuenta. Evidencia: datos medidos en grupos que se comparan.'),
        xpHaz('hoja', 'Subraya la que es una **evidencia** medida.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['«Siento que el té me quita el estrés».'], ['«Mi abuela dice que funciona».'], ['«En 50 personas, la presión bajó 10 puntos con el ejercicio».']], pista: 'Busca la que tiene números que alguien midió.' }, 'Datos medidos en un grupo: evidencia.')],
    ],
    despues: [
      ['Más difícil: ir juntos no es causar',
        xpMira('hoja', 'Un paso más: que dos cosas **suban juntas** no prueba que una cause la otra. Puede haber una tercera detrás.', { paras: [['En el mes que más helados se venden…'], ['…hay más quemaduras de sol'], ['«Los helados queman la piel»'], ['La causa común: días de mucho sol']] }, [
          ['Los datos muestran que las dos cosas suben juntas.', { luz: [0, 1] }],
          ['La conclusión apurada: una causa la otra.', { luz: [2] }],
          ['Pero el helado no tiene nada que ver con la piel al sol.', { luz: [2], tacha: [2] }],
          ['Hay una causa común: los días soleados traen las dos.', { luz: [3], nota: { 3: 'tercera causa' } }],
          ['Para probar una causa se necesita un experimento con control.', {}],
        ], 'Ir juntos no es causar: busca una tercera causa o un experimento con control.'),
        xpHaz('hoja', 'Los niños con más libros en casa sacan mejores notas. Subraya la conclusión **más cuidadosa**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Comprar libros sube las notas, seguro.'], ['Van juntos, pero puede haber otra causa, como el tiempo que les dedican.'], ['Los libros bajan las notas.']], pista: 'Van juntos: ¿eso solo prueba que uno causa el otro?' }, 'Correlación no es causa: puede haber otra explicación.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un anuncio dice: «9 de cada 10 dentistas recomiendan la crema X». ¿Qué haría falta para **confiar** en ese dato?', { letras: ['A', 'B', 'C', 'D'], paras: [['Nada: si lo dicen dentistas, es cierto.'], ['Saber de qué color es la crema.'], ['Que la crema sea la más cara.'], ['Saber a cuántos dentistas preguntaron y quién pagó la encuesta.']] }, [
        ['Pregúntate: ¿cuántos casos hay y quién los contó?', {}],
        ['La A acepta por autoridad, sin mirar los datos.', { luz: [0], nota: { 0: 'autoridad' } }],
        ['La B no tiene que ver con la pregunta.', { luz: [1], nota: { 1: 'no importa' } }],
        ['La C confunde precio con calidad.', { luz: [2], nota: { 2: 'no importa' } }],
        ['La D pide el tamaño de la muestra y quién pagó: eso decide.', { luz: [3], nota: { 3: 'sirve' } }],
      ], 'Ante un dato, pregunta cuántos casos hubo, cómo se escogieron y quién pagó el estudio.'),
      xpHaz('hoja', 'Un concejo debe decidir si fumigar un barrio contra el zancudo. Subraya la pregunta que la ciencia responde **midiendo**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['¿Es justo que paguen los vecinos?'], ['¿Qué barrio es más bonito?'], ['¿A quién le gusta el olor?'], ['¿Cuántos zancudos hay antes y después, comparado con un barrio sin fumigar?']], pista: 'Busca la que se responde con un conteo y una comparación.' }, 'Contar y comparar con un control: eso lo responde la ciencia.')],
    cierre: 'Un testimonio no es prueba: compara grupos con control, desconfía de la correlación y decide con datos y valores.',
  });
}
;
//#archivo js/explora-icf-en.js
// Preicfes · Inglés, mundo 1 «Avisos y Vocabulario» (Explora, escena «hoja»): se explica en español con ejemplos en inglés propios.
xpLec('icf-en-avisos-1', [
  ['¿Dónde está el aviso?',
    xpMira('hoja', 'Empecemos por la idea: un aviso tiene una palabra que **delata el lugar**.', { paras: [['Fasten your', 'seat belt.'], ['Do not feed the', 'animals.'], ['Try on', 'clothes', 'here.']] }, [
      ['Tres avisos sin lugar. ¿Dónde los verías?', {}],
      ['«Seat belt» es cinturón: un carro o un avión.', { luz: [1], nota: { 0: 'on a plane' } }],
      ['Y «animals» lleva a un zoológico.', { luz: [3], nota: { 1: 'at the zoo' } }],
      ['«Clothes» es ropa: una tienda para probarse.', { luz: [5], nota: { 2: 'in a shop' } }],
      ['No hace falta entender todo: basta la palabra clave.', { luz: [1, 3, 5] }],
    ], 'Busca la palabra que solo tiene sentido en un lugar.'),
    xpHaz('hoja', 'Pon al margen dónde se ve cada aviso.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['in a hotel', 'at the beach', 'in a cinema'], meta: [2, 0, 1], paras: [['The film starts at 8.'], ['Leave your room key here.'], ['Do not swim after 5.']], pista: 'Alguno no va ahí: busca film, room y swim.' }, '«Film», «room» y «swim» delatan el lugar.')],
  ['¿Ordena o informa?',
    xpMira('hoja', 'Segunda idea: el verbo dice si el aviso **te pide algo** o solo **informa**.', { paras: [['You must wear a helmet.'], ['No smoking.'], ['Please wait here.'], ['The shop opens at nine.']] }, [
      ['«Must» obliga: hay que usar casco.', { luz: [0], nota: { 0: 'obliga' } }],
      ['«No» y un verbo en «-ing»: prohíbe.', { luz: [1], nota: { 1: 'prohíbe' } }],
      ['«Please» y un verbo: pide.', { luz: [2], nota: { 2: 'pide' } }],
      ['«Opens» solo cuenta a qué hora.', { luz: [3], nota: { 3: 'informa' } }],
      ['«Can» permite y «cannot» no deja.', {}],
    ], 'Must obliga, no -ing prohíbe, please pide; lo demás informa.'),
    xpHaz('hoja', 'Subraya los **dos** avisos que **prohíben**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1, 3], paras: [['Open until six.'], ['No parking.'], ['You can pay by card.'], ['You cannot take photos.']], pista: 'Alguno informa o permite. Busca «no -ing» o «cannot».' }, '«No parking» y «cannot» prohíben.')],
  ['Decirlo con otras palabras',
    xpMira('hoja', 'Tercera idea: la opción correcta casi nunca **repite** las palabras del aviso.', { letras: ['1', 'a', 'b', 'c'], paras: [['Children under five travel free.'], ['Children of five pay nothing.'], ['A child of three does not pay.'], ['Children cannot travel.']] }, [
      ['El aviso: los menores de cinco viajan gratis.', { luz: [0] }],
      ['La a repite «children» y «five», pero «under five» no incluye cinco.', { luz: [1], nota: { 1: 'falsa' } }],
      ['La b no repite casi nada y dice lo mismo: tres es menor que cinco.', { luz: [2], nota: { 2: 'igual' } }],
      ['La c cambia «free» por «cannot»: es otra cosa.', { luz: [3], nota: { 3: 'falsa' } }],
      ['Compara ideas, no palabras iguales.', {}],
    ], 'Desconfía de la opción que copia palabras: compara la idea.'),
    xpHaz('hoja', '«Cash only.» Subraya la opción que dice **lo mismo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['You can only buy cash.'], ['Only one person can pay.'], ['You cannot use a card.']], pista: 'Esa copia una palabra, pero cambia la idea.' }, 'Solo efectivo es lo mismo que no se puede usar tarjeta.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Keep this door closed. Baby sleeping.» Subraya dónde lo verías.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['In a car park'], ['In a house'], ['In a football stadium']], pista: '¿Dónde hay una puerta y un bebé dormido?' }, '«Baby sleeping» delata el lugar.')],
], 'Palabra que delata, verbo que ordena o informa y la misma idea con otras palabras.');

xpLec('icf-en-avisos-2', [
  ['¿Persona, lugar o cosa?',
    xpMira('hoja', 'Empecemos por la idea: la descripción dice primero **qué clase** de palabra es.', { paras: [['This person', 'drives a bus.'], ['A place', 'where you see paintings.'], ['You use it', 'to cut bread.']] }, [
      ['«This person»: buscas una persona.', { luz: [0], nota: { 0: 'person' } }],
      ['Maneja un bus: «driver».', { luz: [1] }],
      ['«A place»: buscas un lugar. Pinturas: «museum».', { luz: [2, 3], nota: { 1: 'place' } }],
      ['«You use it»: buscas una cosa. Cortar pan: «knife».', { luz: [4, 5], nota: { 2: 'thing' } }],
      ['Con la clase ya descartas la mitad de las opciones.', {}],
    ], 'Primero la clase de palabra, después el significado.'),
    xpHaz('hoja', 'Pon al margen la palabra de cada descripción.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['kitchen', 'nurse', 'umbrella'], meta: [1, 2, 0], paras: [['This person helps sick people.'], ['You need it when it rains.'], ['You cook in this room.']], pista: 'Mira si pide persona, cosa o lugar.' }, '«Person», «it» y «room» ya dicen la clase.')],
  ['Las pistas del verbo',
    xpMira('hoja', 'Segunda idea: el verbo dice **cuándo** pasa algo.', { paras: [['She lived in Cali.'], ['She lives in Cali.'], ['She will live in Cali.'], ['She has lived here for years.']] }, [
      ['«Lived» termina en «-ed»: eso ya pasó.', { luz: [0], nota: { 0: 'past' } }],
      ['«Lives» está en presente: es así ahora.', { luz: [1], nota: { 1: 'present' } }],
      ['«Will live» habla del futuro: pasará.', { luz: [2], nota: { 2: 'future' } }],
      ['«Has lived… for years»: empezó antes y sigue.', { luz: [3], nota: { 3: 'until now' } }],
      ['«Ago» va con el pasado; «now», con el presente.', {}],
    ], '-ed ya pasó, will pasará, has… for sigue hasta hoy.'),
    xpHaz('hoja', 'Subraya la oración que dice que **todavía** enseña.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['He taught here ten years ago.'], ['He has taught here for ten years.'], ['He will teach here in ten years.']], pista: 'Esa ya terminó o no ha empezado. Busca «has… for».' }, '«Has taught for ten years»: empezó y sigue.')],
  ['Palabras que apuntan',
    xpMira('hoja', 'Tercera idea: «he», «she», «it» y «they» **apuntan** a algo ya dicho.', { paras: [['Laura', 'gave', 'the keys', 'to', 'her brother.'], ['He', 'lost', 'them', 'that night.']] }, [
      ['«He» es un hombre: ¿quién?', { luz: [5] }],
      ['En la oración hay un hombre: su hermano, «her brother».', { luz: [4, 5], sello: { 5: 'brother' } }],
      ['«Them» son varias cosas: ¿cuáles?', { luz: [7] }],
      ['Varias cosas hay una sola vez: las llaves, «the keys».', { luz: [2, 7], sello: { 7: 'keys' } }],
      ['«It» es una sola cosa; «they» y «them», varias.', {}],
    ], 'He, she: personas. It: una cosa. They, them: varias.'),
    xpHaz('hoja', 'Subraya a qué apunta «it»: «She read it in one day».', { modo: 'toca', meta: [2], paras: [['Marta', 'took two pens', 'and a book', 'to her friends.', 'She read it in one day.']], pista: '«It» es una sola cosa y se puede leer.' }, 'Solo el libro es una cosa que se lee.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«You wear it on your head when it is sunny.» Subraya la palabra.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['sunglasses'], ['beach'], ['shoes'], ['hat']], pista: 'Debe ser una cosa y va en la cabeza, no en los ojos.' }, '«Wear it on your head»: una cosa para la cabeza.')],
], 'Clase de palabra, tiempo del verbo y a qué apunta cada pronombre.');
;
//#archivo js/explora-icf-en-pasos.js
// Preicfes · Inglés, mundo 1 «Avisos y Vocabulario», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación empieza
// desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Avisos dibujados con XLAB en la calle.
{
  const X = XLAB;
  // Un aviso en su poste, en la calle (v.i escoge el aviso; v.r pone abajo lo que significa).
  const AV = [[['NO PARKING', 'Fire exit'], 'rojo'], [['PLEASE KNOCK', 'Doctor inside'], 'azul'], [['WET PAINT', 'Do not touch'], 'peligro'], [['OPEN', '8 a.m. to 6 p.m.'], 'verde']];
  const unAviso = v => {
    const [lin, tipo] = AV[Math.round(v.i || 0)];
    return X.foto(X.aviso(85, 26, 170, 76, lin, tipo, { poste: 64 }) + (v.r ? X.rot(170, 186, v.r, 'oscuro') : ''), 200, 'ciudad');
  };

  xpAmplia('icf-en-avisos-1', {
    conecta: null,
    desde: [
      ['Desde cero: qué es un aviso',
        xpMira('dibujo', 'Antes de todo: un **aviso** es un letrero corto que te dice qué hacer o qué saber.', { dib: unAviso, v: { i: 0 }, alto: 200 }, [
          ['Un aviso es un letrero corto que te habla en la calle, en un bus o en una tienda.', { i: 0 }],
          ['Usa muy pocas palabras porque se lee de pasada, en dos segundos.', { i: 0 }],
          ['«No parking» significa no parquear: no dejes el carro aquí.', { i: 0, r: 'no parquear' }],
          ['«Wet paint» es pintura fresca; el amarillo avisa un peligro.', { i: 2, r: 'pintura fresca' }],
          ['«Open» es abierto, y las horas dicen desde cuándo y hasta cuándo.', { i: 3, r: 'abierto' }],
        ], 'Un aviso es un mensaje corto: pocas palabras que te dicen qué hacer o qué saber.'),
        xpHaz('hoja', 'En la puerta de un consultorio dice «Please knock». Subraya lo que te pide.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Toca la puerta antes de entrar.'], ['Entra sin hacer ruido.'], ['Espera afuera hasta mañana.']], pista: '«Knock» es el golpe con los nudillos en la puerta.' }, '«Knock» es tocar la puerta: el aviso pide avisar antes de entrar.')],
      ['Desde cero: las palabras de siempre',
        xpMira('hoja', 'Unas pocas palabras salen en **casi todos** los avisos. Con ellas ya entiendes la mitad.', { paras: [['exit', 'salida'], ['entrance', 'entrada'], ['push · pull', 'empuja · hala'], ['free', 'gratis']] }, [
          ['Hay unas pocas palabras que se repiten en casi todos los avisos.', {}],
          ['«Exit» es la salida; «entrance», la entrada.', { luz: [0, 2], nota: { 0: 'salir', 1: 'entrar' } }],
          ['En las puertas: «push» es empujar y «pull» es halar.', { luz: [4], nota: { 2: 'puertas' } }],
          ['«Free» casi siempre es gratis: no se paga.', { luz: [6], nota: { 3: 'sin pagar' } }],
          ['Con estas pocas ya entiendes muchos avisos de la calle.', { luz: [0, 2, 4, 6] }],
        ], 'Exit salida, entrance entrada, push empuja, pull hala, free gratis.'),
        xpHaz('hoja', 'En una puerta de vidrio dice «PULL». Subraya lo que haces.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La empujas hacia adentro.'], ['La halas hacia ti.'], ['Esperas a que se abra sola.']], pista: '«Push» sería empujar; este aviso dice lo otro.' }, '«Pull» es halar: la puerta se abre hacia ti.')],
    ],
    despues: [
      ['Más difícil: el lugar que comparte una palabra',
        xpMira('hoja', 'Un paso más: la opción que **repite** una palabra del aviso suele ser la trampa del lugar.', { letras: ['aviso', 'A', 'B', 'C'], paras: [['Keep your ticket until the end of your journey.'], ['At a ticket office'], ['On a train'], ['In a cinema']] }, [
          ['El aviso dice: guarda el tiquete hasta el final del viaje.', { luz: [0] }],
          ['La A repite «ticket», pero allí se compra; no se viaja.', { luz: [1], nota: { 1: 'trampa' } }],
          ['«Journey» es viaje: dentro del tren se viaja.', { luz: [2], nota: { 2: 'sirve' } }],
          ['En un cine hay tiquete, pero no hay ningún viaje.', { luz: [3], nota: { 3: 'trampa' } }],
          ['Busca la palabra que solo encaja en un lugar, no la que se repite.', {}],
        ], 'El lugar que repite una palabra del aviso suele ser la trampa.'),
        xpHaz('hoja', '«Swimmers must wear a cap in the water.» Subraya dónde lo verías.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['In a hat shop'], ['At a swimming pool'], ['In a bathroom']], pista: 'Esa repite «cap», pero allí nadie nada. ¿Dónde hay nadadores?' }, 'Nadadores con gorro en el agua: una piscina.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen te muestran un aviso y cuatro frases: solo una dice **lo mismo**.', { letras: ['aviso', 'A', 'B', 'C', 'D'], paras: [['PHONES OFF DURING THE SHOW'], ['You must switch off your phone while the show is on.'], ['Phones are on sale at the show.'], ['The show is about phones.'], ['You can use your phone during the show.']] }, [
        ['Pregunta típica: ¿qué dice el aviso? Cuatro opciones y una sola idea igual.', { luz: [0] }],
        ['La B repite «phones» y «show», pero habla de vender.', { luz: [2], nota: { 2: 'trampa' } }],
        ['La C también copia palabras y cambia el tema.', { luz: [3], nota: { 3: 'trampa' } }],
        ['La D dice lo contrario: «off» es apagado.', { luz: [4], nota: { 4: 'al revés' } }],
        ['La A usa otras palabras y dice lo mismo: esa es.', { luz: [1], nota: { 1: 'igual' } }],
      ], 'Descarta lo que copia palabras o dice lo contrario; queda la misma idea.'),
      xpHaz('hoja', '«Shop closed for lunch. Back at 2 p.m.» Subraya lo que dice el aviso.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['The shop sells lunch.'], ['The shop opens again at two.'], ['The shop is closed all day.'], ['You can have lunch in the shop at two.']], pista: 'Hay opciones que copian «lunch». Busca la que dice cuándo vuelven.' }, '«Back at 2» es que a las dos abren otra vez.')],
    cierre: 'Palabra que delata el lugar, verbo que manda y la misma idea con otras palabras.',
  });

  xpAmplia('icf-en-avisos-2', {
    conecta: 'icf-en-avisos-1',
    desde: [
      ['Desde cero: describir sin decir la palabra',
        xpMira('hoja', 'Antes de todo: aquí te **describen** algo en inglés y tú pones el nombre.', { paras: [['This person', 'works in a school.'], ['A place', 'where you buy medicine.'], ['You use it', 'to write on paper.']] }, [
          ['En la lección de avisos viste que una palabra clave delata el lugar.', {}],
          ['Aquí es al revés: te describen algo y tú pones la palabra.', {}],
          ['Es una persona y trabaja en un colegio: «teacher», profesor.', { luz: [0, 1], nota: { 0: 'teacher' } }],
          ['Un lugar donde compras medicina: «pharmacy», la droguería.', { luz: [2, 3], nota: { 1: 'pharmacy' } }],
          ['Una cosa para escribir en papel: «pen», el lapicero.', { luz: [4, 5], nota: { 2: 'pen' } }],
        ], 'Una definición en inglés describe sin nombrar: tú adivinas la palabra.'),
        xpHaz('hoja', 'Pon al margen la palabra de cada descripción.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['bakery', 'pilot', 'fork'], meta: [1, 2, 0], paras: [['This person flies a plane.'], ['You eat with it.'], ['A shop that sells bread.']], pista: 'Flies, eat y sells: cada verbo apunta a alguien o a algo.' }, 'Pilot vuela, fork sirve para comer y bakery vende pan.')],
    ],
    despues: [
      ['Más difícil: opciones del mismo tema',
        xpMira('hoja', 'Un paso más: cuando todas las opciones son del **mismo tema**, decide por cada detalle.', { letras: ['?', 'A', 'B', 'C', 'D'], paras: [['You put food in it to keep it cold.'], ['oven'], ['fridge'], ['ice'], ['kitchen']] }, [
          ['Las cuatro opciones son de la cocina: por eso confunden.', { luz: [0] }],
          ['«Oven», el horno, también guarda comida, pero la calienta.', { luz: [1], nota: { 1: 'al revés' } }],
          ['«Ice» repite la idea de frío, pero no guardas comida en él.', { luz: [3], nota: { 3: 'trampa' } }],
          ['«Kitchen» es un lugar, y la pista dice «put food in it»: una cosa.', { luz: [4], nota: { 4: 'es lugar' } }],
          ['«Fridge», la nevera, cumple todo: cosa, comida y frío.', { luz: [2], nota: { 2: 'sirve' } }],
        ], 'Si todas son del mismo tema, decide por cada detalle de la pista.'),
        xpHaz('hoja', '«This person checks your teeth.» Subraya la palabra.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['nurse'], ['dentist'], ['farmer']], pista: '«Teeth» son dientes. ¿Quién se ocupa solo de ellos?' }, '«Teeth» son dientes: el que los revisa es el dentist.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen te dan una **descripción** y cuatro palabras: gana la que cumple todas las pistas.', { letras: ['?', 'A', 'B', 'C', 'D'], paras: [['You need this to travel to another country. It has your photo.'], ['ticket'], ['passport'], ['photo'], ['suitcase']] }, [
        ['Una descripción con dos pistas: viajar a otro país y tener tu foto.', { luz: [0] }],
        ['«Photo» repite una palabra de la pista: trampa clásica.', { luz: [3], nota: { 3: 'repite' } }],
        ['«Ticket» sirve para viajar, pero no lleva tu foto.', { luz: [1], nota: { 1: 'falta algo' } }],
        ['«Suitcase», la maleta, viaja contigo, pero tampoco tiene foto.', { luz: [4], nota: { 4: 'falta algo' } }],
        ['«Passport» cumple las dos pistas: viajar y tu foto.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'La palabra correcta cumple todas las pistas, no solo una.'),
      xpHaz('hoja', '«You look at it to know the time. You wear it on your arm.» Subraya la palabra.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['clock'], ['watch'], ['arm'], ['time']], pista: 'Dos repiten palabras de la pista y otra da la hora, pero no se lleva puesta.' }, 'Watch da la hora y se lleva en el brazo; clock va en la pared.')],
    cierre: 'Persona, lugar o cosa; el tiempo del verbo; a qué apunta, y que cumpla todas las pistas.',
  });
}
;
//#archivo js/explora-icf-en-2.js
// Preicfes · Inglés, mundo 2 «Conversaciones Cortas» (Explora, escena «hoja»): se explica en español con ejemplos en inglés propios.
xpLec('icf-en-dialogos-1', [
  ['La palabra que pregunta',
    xpMira('hoja', 'Empecemos por la idea: la palabra del comienzo dice **qué dato** se pide.', { paras: [['Where', 'is my bag?'], ['When', 'is the party?'], ['Who', 'is that man?'], ['How long', 'is the film?']] }, [
      ['«Where» pide un lugar: «under the table».', { luz: [0], nota: { 0: 'lugar' } }],
      ['«When» pide un momento: «on Friday».', { luz: [2], nota: { 1: 'momento' } }],
      ['«Who» pide una persona: «my uncle».', { luz: [4], nota: { 2: 'persona' } }],
      ['«How long» pide duración: «two hours».', { luz: [6], nota: { 3: 'duración' } }],
      ['Y «why» pide una razón: «because…».', {}],
    ], 'Where lugar, when momento, who persona, how long duración, why razón.'),
    xpHaz('hoja', '«Where did you buy it?» Subraya la respuesta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Yesterday morning.'], ['At the market.'], ['Because I like it.']], pista: 'Esa es un momento o una razón: se pide un lugar.' }, '«Where» pide un lugar.')],
  ['El auxiliar se repite',
    xpMira('hoja', 'Segunda idea: la respuesta corta usa el **mismo auxiliar** de la pregunta.', { paras: [['Do you like tea?', 'Yes, I do.'], ['Is she at home?', 'No, she isn\'t.'], ['Can they swim?', 'Yes, they can.'], ['Did he call?', 'No, he didn\'t.']] }, [
      ['«Do» se responde con «do».', { luz: [0, 1], nota: { 0: 'do' } }],
      ['«Is» se responde con «is».', { luz: [2, 3], nota: { 1: 'is' } }],
      ['Si pregunta con «can», se responde con «can».', { luz: [4, 5], nota: { 2: 'can' } }],
      ['Y si pregunta con «did», va «did».', { luz: [6, 7], nota: { 3: 'did' } }],
      ['Cuidado: «you» se responde con «I».', { luz: [0, 1] }],
    ], 'Do con do, is con is, can con can, did con did.'),
    xpHaz('hoja', '«Does your sister work here?» Subraya la respuesta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Yes, she is.'], ['Yes, I do.'], ['No, she doesn\'t.']], pista: 'Debe llevar «does» y hablar de ella.' }, '«Does» y «she» vuelven en la respuesta.')],
  ['La trampa de la palabra repetida',
    xpMira('hoja', 'Tercera idea: repetir una palabra **no es** responder.', { letras: ['?', 'a', 'b', 'c'], paras: [['How much is the ticket?'], ['The ticket is blue.'], ['Five dollars.'], ['I have a ticket.']] }, [
      ['«How much» pide un precio.', { luz: [0] }],
      ['La a repite «ticket», pero dice un color.', { luz: [1], nota: { 1: 'trampa' } }],
      ['La b no repite nada y sí responde.', { luz: [2], nota: { 2: 'responde' } }],
      ['La c repite y cuenta otra cosa.', { luz: [3], nota: { 3: 'trampa' } }],
      ['Primero piensa qué dato se pide; luego busca.', {}],
    ], 'Busca el dato que se pide, no la palabra que se repite.'),
    xpHaz('hoja', '«What time does the shop close?» Subraya la respuesta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['The shop is closed.'], ['At nine.'], ['It is close to the park.']], pista: 'Esa repite una palabra, pero no da una hora.' }, 'Se pide una hora.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Why don\'t we go to the cinema?» Subraya la mejor respuesta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Good idea!'], ['Because it is dark.'], ['It is in the cinema.']], pista: 'No pregunta la razón: invita.' }, '«Why don’t we» invita; se acepta o se rechaza.')],
], 'Qué dato pide, qué auxiliar usa y sin caer en la palabra repetida.');

xpLec('icf-en-dialogos-2', [
  ['Pedir y ofrecer',
    xpMira('hoja', 'Empecemos por la idea: la cortesía tiene **fórmulas** fijas.', { paras: [['Could you help me?', 'Of course.'], ['Would you like some juice?', 'Yes, please.'], ['May I come in?', 'Sure, go ahead.']] }, [
      ['«Could you» pide un favor.', { luz: [0], nota: { 0: 'pide' } }],
      ['Se acepta con «of course» o «sure».', { luz: [1] }],
      ['«Would you like» ofrece: «yes, please» o «no, thanks».', { luz: [2, 3], nota: { 1: 'ofrece' } }],
      ['«May I» pide permiso.', { luz: [4], nota: { 2: 'permiso' } }],
      ['Y se da con «go ahead».', { luz: [5] }],
    ], 'Could you pide, would you like ofrece, may I pide permiso.'),
    xpHaz('hoja', '«Would you like some cake?» Subraya la respuesta cortés.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Yes, I would go.'], ['You\'re welcome.'], ['No, thanks. I\'m full.']], pista: 'Te ofrecen algo: se acepta o se agradece.' }, 'A una oferta: «yes, please» o «no, thanks».')],
  ['Do you mind?',
    xpMira('hoja', 'Segunda idea: «Do you mind…?» pregunta si **te molesta**.', { paras: [['Do you mind if I open the window?'], ['No, not at all.'], ['Yes, I do. It\'s cold.']] }, [
      ['Significa: ¿te molesta que la abra?', { luz: [0] }],
      ['«No, not at all»: no me molesta, ábrela.', { luz: [1], nota: { 1: 'da permiso' } }],
      ['«Yes, I do»: sí me molesta.', { luz: [2], nota: { 2: 'lo niega' } }],
      ['Es al revés de lo que parece.', { luz: [1, 2] }],
      ['También sirven «of course not» y «go ahead».', {}],
    ], 'Con «Do you mind», decir no es dar permiso.'),
    xpHaz('hoja', '«Do you mind if I sit here?» Subraya la respuesta que **da permiso**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Yes, I mind.'], ['Of course not.'], ['Yes, it\'s my seat.']], pista: 'Esa dice que sí molesta.' }, '«Of course not»: claro que no me molesta.')],
  ['Quejas, gracias y disculpas',
    xpMira('hoja', 'Tercera idea: escoge según lo que la otra persona **siente**.', { paras: [['My soup is cold.', 'I\'m sorry. I\'ll bring another.'], ['Thanks a lot!', 'You\'re welcome.'], ['Come to my house!', 'I\'d love to, but I can\'t.'], ['I\'m sorry I\'m late.', 'That\'s all right.']] }, [
      ['A una queja: disculpa y solución.', { luz: [0, 1], nota: { 0: 'queja' } }],
      ['A las gracias: «you’re welcome».', { luz: [2, 3], nota: { 1: 'gracias' } }],
      ['Para rechazar: «I’d love to, but…».', { luz: [4, 5], nota: { 2: 'rechazo amable' } }],
      ['A una disculpa: «that’s all right».', { luz: [6, 7], nota: { 3: 'disculpa' } }],
      ['Ponle nombre a la situación y la fórmula sale sola.', {}],
    ], 'Queja, gracias, invitación o disculpa: cada una con su fórmula.'),
    xpHaz('hoja', 'Pon al margen la respuesta de cada frase.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['That\'s all right', 'You\'re welcome', 'I\'m sorry'], meta: [1, 2, 0], paras: [['Thank you!'], ['This plate is dirty.'], ['Sorry, I broke your pen.']], pista: '¿Agradece, se queja o se disculpa?' }, 'Gracias, queja y disculpa.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Could you turn down the music? I\'m studying.» Subraya la mejor respuesta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Sure, I\'m sorry.'], ['Yes, please.'], ['No, I\'m not studying.']], pista: 'Pide un favor porque algo le molesta.' }, 'Se acepta el favor y se ofrece disculpa.')],
], 'Nombra la situación, usa su fórmula y cuidado con «Do you mind».');

xpLec('icf-en-dialogos-3', [
  ['Cómo se siente',
    xpMira('hoja', 'Empecemos por la idea: la reacción va con el **sentimiento**.', { paras: [['I failed the test.', 'Oh, I\'m sorry to hear that.'], ['I got a scholarship!', 'Congratulations!'], ['I\'m nervous about tomorrow.', 'Don\'t worry, you\'ll be fine.']] }, [
      ['Una mala noticia: se lamenta.', { luz: [0, 1], nota: { 0: 'triste' } }],
      ['Un logro: se felicita.', { luz: [2, 3], nota: { 1: 'logro' } }],
      ['Un susto: se anima.', { luz: [4, 5], nota: { 2: 'nervios' } }],
      ['«Sorry» no siempre es disculpa: también es lamento.', { luz: [1] }],
      ['Busca primero el sentimiento.', {}],
    ], 'Triste se lamenta, un logro se felicita, un susto se anima.'),
    xpHaz('hoja', '«My grandmother is in hospital.» Subraya la reacción.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Congratulations!'], ['You\'re welcome.'], ['I\'m sorry to hear that.']], pista: 'Es una noticia triste.' }, 'Se lamenta la noticia.')],
  ['Planes y promesas',
    xpMira('hoja', 'Segunda idea: «going to» es un plan; «will», una promesa o un cálculo.', { paras: [['I\'m going to visit my aunt.'], ['Don\'t worry, I will help you.'], ['It will rain tonight.'], ['What if we sell juice?']] }, [
      ['«Going to»: ya está decidido.', { luz: [0], nota: { 0: 'plan' } }],
      ['«Will»: promesa del momento.', { luz: [1], nota: { 1: 'promesa' } }],
      ['O lo que se calcula que pasará.', { luz: [2], nota: { 2: 'cálculo' } }],
      ['«What if» y «what about» sugieren.', { luz: [3], nota: { 3: 'sugerencia' } }],
      ['Una sugerencia se acepta: «sounds great».', {}],
    ], 'Going to: plan. Will: promesa o cálculo. What if: sugerencia.'),
    xpHaz('hoja', 'Pon al margen qué hace cada frase.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['promesa', 'sugerencia', 'plan'], meta: [1, 2, 0], paras: [['What about a pizza?'], ['We are going to paint the room.'], ['I will call you, I promise.']], pista: 'Mira «what about», «going to» y «will».' }, 'Sugerir, planear y prometer.')],
  ['¿De acuerdo?',
    xpMira('hoja', 'Tercera idea: aprende a ver si alguien **acepta** o **prefiere otra cosa**.', { paras: [['So do I.'], ['You\'re right.'], ['I don\'t think so.'], ['I\'d rather stay here.']] }, [
      ['«So do I»: yo también.', { luz: [0], nota: { 0: 'de acuerdo' } }],
      ['«You’re right»: tienes razón.', { luz: [1], nota: { 1: 'de acuerdo' } }],
      ['«I don’t think so»: no lo creo.', { luz: [2], nota: { 2: 'en desacuerdo' } }],
      ['«I’d rather»: prefiero otra cosa.', { luz: [3], nota: { 3: 'otra opción' } }],
      ['«Neither do I» es «yo tampoco»: también está de acuerdo.', {}],
    ], 'So do I y neither do I coinciden; I’d rather prefiere otra cosa.'),
    xpHaz('hoja', '«I don\'t like horror films.» Subraya a quien piensa **igual**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['So do I.'], ['Neither do I.'], ['I\'d rather watch one.']], pista: 'La frase es negativa: yo tampoco.' }, 'A una negación se le responde «neither do I».')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«I\'m exhausted. I worked twelve hours.» Subraya la mejor respuesta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['You should get some rest.'], ['Congratulations on your work!'], ['At twelve o\'clock.']], pista: '«Exhausted» es muy cansado: ¿qué le aconsejas?' }, 'A alguien agotado se le aconseja descansar.')],
], 'Sentimiento, plan y acuerdo: con eso se escoge la respuesta.');
;
//#archivo js/explora-icf-en-2-pasos.js
// Preicfes · Inglés, mundo 2 «Conversaciones Cortas», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación
// empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen (diálogos A–D con sus trampas).
{
  xpAmplia('icf-en-dialogos-1', {
    conecta: 'icf-en-avisos-2',
    desde: [
      ['Desde cero: cómo se pregunta en inglés',
        xpMira('hoja', 'Antes de todo: en inglés, una pregunta **empieza** con un verbo pequeño que ayuda.', { paras: [['You', 'are', 'happy.'], ['Are', 'you', 'happy?'], ['You', 'like', 'rice.'], ['Do', 'you', 'like', 'rice?']] }, [
          ['En la lección de palabras viste que el verbo dice cuándo pasa algo.', {}],
          ['Para preguntar, el inglés pone un verbo pequeño adelante.', {}],
          ['Con «are» basta cambiarlo de puesto: «Are you happy?».', { luz: [3, 4], nota: { 1: 'se voltea' } }],
          ['Con otros verbos entra un ayudante nuevo: «do».', { luz: [9], nota: { 3: 'entra do' } }],
          ['A ese verbo pequeño se le llama auxiliar: is, are, do, does, did, can.', {}],
        ], 'Una pregunta de sí o no empieza con un auxiliar: is, are, do, does, did o can.'),
        xpHaz('hoja', 'Subraya la pregunta bien formada.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['You speak English?'], ['Do you speak English?'], ['Speak you English?']], pista: 'Busca la que empieza con un auxiliar antes de «you».' }, '«Do» va primero y luego la persona.')],
    ],
    despues: [
      ['Más difícil: preguntas que engañan',
        xpMira('hoja', 'Un paso más: algunas preguntas **no se traducen** palabra por palabra.', { paras: [['What do you do?', 'I\'m a mechanic.'], ['What are you doing?', 'I\'m cooking.'], ['How often do you swim?', 'Twice a week.']] }, [
          ['Algunas preguntas no se entienden traduciendo cada palabra.', {}],
          ['«What do you do?» pregunta tu trabajo, no lo que haces ahora.', { luz: [0, 1], nota: { 0: 'trabajo' } }],
          ['«What are you doing?» sí es lo que haces en este momento.', { luz: [2, 3], nota: { 1: 'ahora' } }],
          ['«How often» pide cada cuánto: twice a week, dos veces por semana.', { luz: [4, 5], nota: { 2: 'frecuencia' } }],
          ['Lee la pregunta entera, no solo la primera palabra.', {}],
        ], 'What do you do pide el oficio; how often, cada cuánto.'),
        xpHaz('hoja', '«How often do you visit your grandparents?» Subraya la respuesta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['In Medellín.'], ['Every Sunday.'], ['They are fine.']], pista: 'Pide cada cuánto: busca una frecuencia.' }, '«Every Sunday» dice cada cuánto.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen alguien dice una frase y tú escoges la **respuesta natural** entre cuatro.', { letras: ['?', 'A', 'B', 'C', 'D'], paras: [['Is this seat free?'], ['Yes, it is free of charge.'], ['Sure, sit down.'], ['I\'m free tomorrow.'], ['It is a seat.']] }, [
        ['Alguien pregunta si el puesto está libre. ¿Qué dirías tú?', { luz: [0] }],
        ['La A repite «free», pero habla de no pagar: no tiene sentido aquí.', { luz: [1], nota: { 1: 'repite' } }],
        ['La C también usa «free» y habla de su tiempo libre.', { luz: [3], nota: { 3: 'repite' } }],
        ['La D repite «seat» y no responde nada.', { luz: [4], nota: { 4: 'repite' } }],
        ['La B no repite y es lo que dirías: siéntate.', { luz: [2], nota: { 2: 'natural' } }],
      ], 'Escoge lo que una persona diría de verdad, no lo que repite palabras.'),
      xpHaz('hoja', '«Can I borrow your pen?» Subraya la respuesta natural.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Yes, I can borrow it.'], ['Here you are.'], ['It\'s a blue pen.'], ['No, I don\'t borrow.']], pista: 'Tres opciones repiten palabras de la pregunta. ¿Qué dices al prestar algo?' }, '«Here you are» se dice al entregar algo.')],
    cierre: 'Auxiliar adelante, el dato que se pide y la respuesta natural, no la que repite.',
  });

  xpAmplia('icf-en-dialogos-2', {
    conecta: 'icf-en-dialogos-1',
    desde: [
      ['Desde cero: ser amable en inglés',
        xpMira('hoja', 'Antes de todo: cuatro palabras de cortesía que se usan **todo el día**.', { paras: [['please', 'por favor'], ['thank you', 'gracias'], ['sorry', 'perdón'], ['excuse me', 'disculpe']] }, [
          ['En la lección anterior viste que una pregunta empieza con un auxiliar.', {}],
          ['Las preguntas amables usan auxiliares suaves: could, would, may.', {}],
          ['«Please» suaviza un pedido, como el «por fa» de la casa.', { luz: [0], nota: { 0: 'pide' } }],
          ['«Thank you» agradece, y se responde «you’re welcome».', { luz: [2], nota: { 1: 'agradece' } }],
          ['«Sorry» pide perdón después; «excuse me» llama la atención antes.', { luz: [4, 6], nota: { 2: 'después', 3: 'antes' } }],
        ], 'Please pide, thank you agradece, sorry perdona y excuse me llama.'),
        xpHaz('hoja', 'Quieres pasar entre dos personas en el bus. Subraya lo que dices **antes**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Thank you.'], ['Excuse me.'], ['You\'re welcome.']], pista: 'Una agradece y otra responde a las gracias. ¿Cuál pide paso?' }, '«Excuse me» pide paso antes de molestar.')],
    ],
    despues: [
      ['Más difícil: quién hace la acción',
        xpMira('hoja', 'Un paso más: la misma puerta, tres preguntas, y en cada una la **hace alguien distinto**.', { paras: [['Could you close the door?'], ['Can I close the door?'], ['Shall I close the door?']] }, [
          ['Las tres hablan de la misma puerta, pero no de la misma persona.', {}],
          ['«Could you» pide que la otra persona lo haga.', { luz: [0], nota: { 0: 'tú lo haces' } }],
          ['«Can I» pide permiso para hacerlo yo.', { luz: [1], nota: { 1: 'yo, con permiso' } }],
          ['«Shall I» ofrece ayuda: ¿quieres que yo la cierre?', { luz: [2], nota: { 2: 'yo, ofrezco' } }],
          ['A una oferta se responde «yes, please» o «no, thanks, I’m fine».', {}],
        ], 'Could you pide un favor; can I pide permiso; shall I ofrece ayuda.'),
        xpHaz('hoja', '«Shall I carry your bag?» Subraya la respuesta que encaja.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Yes, please. It\'s heavy.'], ['Yes, I shall.'], ['Sorry, I can\'t carry it.']], pista: 'Te ofrecen ayuda a ti: acepta o agradece.' }, 'A una oferta se responde «yes, please» o «no, thanks».')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen la trampa suele ser una **fórmula de otra situación**.', { letras: ['?', 'A', 'B', 'C', 'D'], paras: [['I\'m sorry, I broke your glass.'], ['You\'re welcome.'], ['Don\'t worry, it was old.'], ['Yes, it is broken.'], ['I\'d love to.']] }, [
        ['Alguien se disculpa: rompió un vaso tuyo.', { luz: [0] }],
        ['La A responde a unas gracias, no a una disculpa.', { luz: [1], nota: { 1: 'otra fórmula' } }],
        ['La C repite «broke» y no calma a nadie.', { luz: [3], nota: { 3: 'repite' } }],
        ['La D acepta una invitación, y aquí nadie invita.', { luz: [4], nota: { 4: 'otra fórmula' } }],
        ['La B tranquiliza: así se responde una disculpa.', { luz: [2], nota: { 2: 'natural' } }],
      ], 'Nombra la situación y escoge su fórmula; descarta las de otra situación.'),
      xpHaz('hoja', '«Would you like to come to my birthday party?» Subraya la respuesta natural.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Yes, I like birthdays.'], ['You\'re welcome.'], ['I\'d love to. What time?'], ['It\'s my birthday.']], pista: 'Te invitan: acepta o rechaza con amabilidad.' }, '«I’d love to» acepta y pregunta la hora.')],
    cierre: 'Please, could you, can I y shall I: cada situación tiene su fórmula amable.',
  });

  xpAmplia('icf-en-dialogos-3', {
    conecta: 'icf-en-dialogos-2',
    desde: [
      ['Desde cero: palabras para sentir',
        xpMira('hoja', 'Antes de todo: para responder bien hay que **nombrar** lo que el otro siente.', { paras: [['happy', 'feliz'], ['sad', 'triste'], ['tired', 'cansado'], ['worried', 'preocupado'], ['angry', 'bravo']] }, [
          ['En la lección anterior viste que la cortesía tiene fórmulas fijas.', {}],
          ['Para reaccionar bien, primero hay que nombrar lo que el otro siente.', {}],
          ['«Happy» es feliz y «sad», triste: las más fáciles.', { luz: [0, 2] }],
          ['«Tired» es cansado; «worried», preocupado.', { luz: [4, 6] }],
          ['«Angry» es bravo, como cuando alguien está de mal genio.', { luz: [8] }],
          ['Con «I feel» o «I am», la persona te cuenta cómo está.', {}],
        ], 'Happy, sad, tired, worried, angry: nombra la emoción antes de responder.'),
        xpHaz('hoja', '«I didn\'t sleep at all last night.» Subraya cómo se siente.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['happy'], ['tired'], ['angry']], pista: '¿Cómo queda alguien que no durmió nada?' }, 'Sin dormir se queda cansado: tired.')],
    ],
    despues: [
      ['Más difícil: yo también, con el auxiliar justo',
        xpMira('hoja', 'Un paso más: «yo también» **cambia** según el verbo que usó la otra persona.', { paras: [['I\'m hungry.', 'So am I.'], ['I can dance.', 'So can I.'], ['I went to Cali.', 'So did I.'], ['I didn\'t go.', 'Neither did I.']] }, [
          ['«Yo también» cambia según el auxiliar de la frase.', {}],
          ['Con «am», va «so am I».', { luz: [0, 1], nota: { 0: 'am' } }],
          ['Con «can», va «so can I».', { luz: [2, 3], nota: { 1: 'can' } }],
          ['Con un pasado como «went», va «so did I».', { luz: [4, 5], nota: { 2: 'did' } }],
          ['Si la frase niega, «yo tampoco» es «neither did I».', { luz: [6, 7], nota: { 3: 'tampoco' } }],
        ], 'So + el mismo auxiliar + I; si la frase niega, neither.'),
        xpHaz('hoja', '«I\'m from Cartagena.» Subraya «yo también».', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['So do I.'], ['So am I.'], ['Neither am I.']], pista: 'La frase usa «am» y no niega.' }, '«I’m» pide «so am I».')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen la respuesta buena va con la **emoción** de quien habla.', { letras: ['?', 'A', 'B', 'C', 'D'], paras: [['I lost my job yesterday.'], ['Congratulations!'], ['Oh no, I\'m so sorry.'], ['Yes, you lost it.'], ['Sounds great!']] }, [
        ['Una mala noticia: perdió el trabajo.', { luz: [0] }],
        ['«Congratulations» felicita: va con logros, no con pérdidas.', { luz: [1], nota: { 1: 'otra emoción' } }],
        ['La C repite «lost» y suena frío.', { luz: [3], nota: { 3: 'repite' } }],
        ['«Sounds great» acepta un plan, y aquí no hay plan.', { luz: [4], nota: { 4: 'otra fórmula' } }],
        ['La B lamenta la noticia: es lo natural.', { luz: [2], nota: { 2: 'natural' } }],
      ], 'Primero la emoción del otro; luego la fórmula que va con ella.'),
      xpHaz('hoja', '«I won the school chess tournament!» Subraya la respuesta natural.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['I\'m sorry to hear that.'], ['Well done! You must be happy.'], ['Yes, I won it.'], ['Neither did I.']], pista: 'Es una buena noticia: descarta lo que lamenta o repite.' }, 'Un logro se felicita: well done.')],
    cierre: 'Nombra la emoción, mira el auxiliar y responde como lo haría una persona.',
  });
}
;
//#archivo js/explora-icf-en-3.js
// Preicfes · Inglés, mundo 3 «Gramática en Contexto» (Explora, escena «hoja»): se explica en español con ejemplos en inglés propios.
xpLec('icf-en-gramatica-1', [
  ['¿Terminó o llega hasta hoy?',
    xpMira('hoja', 'Empecemos por la idea: la **palabra de tiempo** escoge el verbo.', { paras: [['I', 'moved', 'here', 'in 2015.'], ['I', 'have lived', 'here', 'since 2015.'], ['I', 'have lived', 'here', 'for ten years.']] }, [
      ['«In 2015» es una fecha cerrada: pasado simple.', { luz: [1, 3], nota: { 0: 'terminó' } }],
      ['«Since 2015» va desde entonces hasta hoy.', { luz: [5, 7], nota: { 1: 'hasta hoy' } }],
      ['Por eso lleva «have» y participio.', { luz: [5] }],
      ['«For ten years» dice cuánto tiempo.', { luz: [11], nota: { 2: 'cuánto' } }],
      ['Con «yesterday», «ago» o «last»: pasado simple.', {}],
    ], 'Yesterday, ago, in 2015: pasado. Since y for: have + participio.'),
    xpHaz('hoja', '«She ___ three books since January.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['wrote'], ['has written'], ['writes']], pista: '«Since» llega hasta hoy: busca «has».' }, '«Since January» pide «has written».')],
  ['Lo que estaba pasando',
    xpMira('hoja', 'Segunda idea: «was + -ing» es lo que **estaba pasando** cuando algo ocurrió.', { paras: [['I', 'was cooking', 'when', 'the phone', 'rang.'], ['While', 'they', 'were sleeping,', 'it', 'rained.']] }, [
      ['«Was cooking»: la acción larga.', { luz: [1], nota: { 0: 'la larga' } }],
      ['«Rang»: la corta que la interrumpe.', { luz: [4] }],
      ['«When» trae la corta.', { luz: [2, 4] }],
      ['«While» trae la larga.', { luz: [5, 7], nota: { 1: 'while + larga' } }],
      ['Con «they» es «were».', { luz: [6, 7] }],
    ], 'Larga: was o were + -ing. Corta: pasado simple.'),
    xpHaz('hoja', '«We ___ football when it started to rain.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['play'], ['was playing'], ['were playing']], pista: 'Es la acción larga y el sujeto es «we».' }, '«We» va con «were».')],
  ['Mañana',
    xpMira('hoja', 'Tercera idea: hay varias maneras de hablar del **futuro**.', { paras: [['I am seeing the doctor at four.'], ['I am going to study medicine.'], ['I think it will be easy.'], ['If it rains, I will stay.']] }, [
      ['Con hora fijada: «am seeing».', { luz: [0], nota: { 0: 'cita' } }],
      ['Un plan: «going to».', { luz: [1], nota: { 1: 'plan' } }],
      ['Lo que se cree: «will».', { luz: [2], nota: { 2: 'predicción' } }],
      ['Después de «if» va presente; en la otra parte, «will».', { luz: [3], nota: { 3: 'condición' } }],
      ['Nunca «if it will rain».', {}],
    ], 'Cita: am -ing. Plan: going to. Predicción: will. If + presente.'),
    xpHaz('hoja', '«If you ___ the red fruits, the coffee will taste good.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['pick'], ['will pick'], ['picked']], pista: 'Después de «if» no va «will».' }, '«If» con presente y «will» en la otra parte.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Nobody ___ this door for years.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['opened'], ['has opened'], ['have opened']], pista: '«For years» llega hasta hoy y «nobody» va en singular.' }, '«Nobody» va con «has».')],
], 'Mira la palabra de tiempo, la acción larga y la condición.');

xpLec('icf-en-gramatica-2', [
  ['In, on, at',
    xpMira('hoja', 'Empecemos por la idea: de lo más **grande** a lo más **pequeño**: in, on, at.', { paras: [['in', 'July', 'in the garage'], ['on', 'Monday', 'on the table'], ['at', 'six o\'clock', 'at the door']] }, [
      ['«In»: un mes, un año, un lugar cerrado.', { luz: [0, 1, 2], nota: { 0: 'grande' } }],
      ['«On»: un día o una superficie.', { luz: [3, 4, 5], nota: { 1: 'mediano' } }],
      ['«At»: una hora o un punto.', { luz: [6, 7, 8], nota: { 2: 'pequeño' } }],
      ['«From… to» va de un punto a otro.', {}],
      ['«During» con un evento; «for» con una duración.', {}],
    ], 'In: mes o adentro. On: día o encima. At: hora o punto.'),
    xpHaz('hoja', 'Pon al margen la palabra que falta.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['on', 'at', 'in'], meta: [2, 1, 0], paras: [['___ December'], ['___ half past nine'], ['___ Saturday']], pista: 'Alguna no va ahí: mes, hora o día.' }, 'Mes con in, hora con at y día con on.')],
  ['¿Se puede contar?',
    xpMira('hoja', 'Segunda idea: **many** y **a few** cuentan; **much** y **a little**, no.', { paras: [['three apples', 'many apples', 'a few apples'], ['some water', 'much water', 'a little water']] }, [
      ['Se puede decir tres manzanas: se cuentan.', { luz: [0] }],
      ['Muchas: «many». Unas pocas: «a few».', { luz: [1, 2], nota: { 0: 'se cuentan' } }],
      ['No se dice «three waters» al medir agua.', { luz: [3] }],
      ['Mucha: «much». Un poco: «a little».', { luz: [4, 5], nota: { 1: 'no se cuenta' } }],
      ['Money, time, space y work tampoco se cuentan.', {}],
    ], 'Cuenta: many, a few. No se cuenta: much, a little.'),
    xpHaz('hoja', '«There isn\'t ___ milk, but there are ___ eggs.» Subraya las **dos**, en la pareja correcta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['many / a little'], ['much / a few'], ['a few / much']], pista: 'La leche no se cuenta; los huevos, sí.' }, 'Leche con much y huevos con a few.')],
  ['Unir ideas',
    xpMira('hoja', 'Tercera idea: la palabra que une dice **cómo** se relacionan.', { paras: [['It rained,', 'so', 'we stayed.'], ['We stayed', 'because', 'it rained.'], ['Although', 'it rained,', 'we went.'], ['It rained,', 'but', 'we went.']] }, [
      ['«So» trae el resultado.', { luz: [1], nota: { 0: 'resultado' } }],
      ['«Because» trae la causa.', { luz: [4], nota: { 1: 'causa' } }],
      ['«Although»: pasó lo que no se esperaba.', { luz: [6], nota: { 2: 'a pesar de' } }],
      ['Y «but» contrasta las dos ideas.', { luz: [10], nota: { 3: 'contraste' } }],
      ['Al revés cambia todo: «so» no es «because».', { luz: [1, 4] }],
    ], 'So: resultado. Because: causa. Although y but: contraste.'),
    xpHaz('hoja', '«___ he was tired, he finished the race.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Although'], ['Because'], ['So']], pista: 'Estaba cansado y aun así terminó.' }, 'No se esperaba que terminara.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«I looked in the room, but there wasn\'t ___.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['nobody'], ['somebody'], ['anybody']], pista: '«Wasn\'t» ya niega: no se niega dos veces.' }, 'En negación va «anybody».')],
], 'Lugar y tiempo, lo que se cuenta y lo que une.');

xpLec('icf-en-gramatica-3', [
  ['Más que',
    xpMira('hoja', 'Empecemos por la idea: las palabras **cortas** llevan -er; las **largas**, more.', { paras: [['cold', 'colder than'], ['big', 'bigger than'], ['happy', 'happier than'], ['expensive', 'more expensive than']] }, [
      ['Corta: se agrega -er y «than».', { luz: [0, 1] }],
      ['A veces se dobla la última letra.', { luz: [2, 3] }],
      ['Si termina en -y, cambia a -ier.', { luz: [4, 5] }],
      ['Si es larga, va «more» adelante.', { luz: [6, 7], nota: { 3: 'larga' } }],
      ['Nunca las dos: «more colder» no existe.', {}],
    ], 'Corta: -er than. Larga: more… than. Nunca las dos juntas.'),
    xpHaz('hoja', '«This bag is ___ than mine.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['more heavy'], ['heavier'], ['heaviest']], pista: 'Termina en -y y compara dos.' }, '«Heavy» pasa a «heavier».')],
  ['Igual o menos',
    xpMira('hoja', 'Segunda idea: «as… as» es **tan como**; con «not», es **menos**.', { paras: [['Leo is as tall as Ana.'], ['Leo is not as tall as Ana.'], ['Leo is shorter than Ana.']] }, [
      ['Tan alto como: iguales.', { luz: [0], nota: { 0: 'iguales' } }],
      ['No tan alto como: es menos.', { luz: [1], nota: { 1: 'menos' } }],
      ['Dice lo mismo que esta.', { luz: [1, 2], nota: { 2: 'lo mismo' } }],
      ['«Less… than» también: less tired than.', {}],
      ['Entre «as» y «as» no va -er.', { luz: [0] }],
    ], 'As… as: igual. Not as… as: menos.'),
    xpHaz('hoja', '«The train isn\'t as fast as the plane.» Subraya lo que dice **lo mismo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['The train is faster.'], ['They are equally fast.'], ['The plane is faster.']], pista: '¿Cuál de los dos es menos rápido?' }, 'El tren es menos rápido: el avión es más.')],
  ['El más de todos',
    xpMira('hoja', 'Tercera idea: para el **primero de todos** va «the» con -est o most.', { paras: [['the coldest month'], ['the most expensive house'], ['the best friend'], ['the worst day']] }, [
      ['Corta: «the» y -est.', { luz: [0], nota: { 0: 'el más frío' } }],
      ['Si es larga, va «the most».', { luz: [1], nota: { 1: 'la más cara' } }],
      ['«Good» cambia: better, the best.', { luz: [2], nota: { 2: 'el mejor' } }],
      ['«Bad» también: worse, the worst.', { luz: [3], nota: { 3: 'el peor' } }],
      ['Pista: «in the world», «of all», «of my life».', {}],
    ], 'The + -est o the most. Good: best. Bad: worst.'),
    xpHaz('hoja', '«It was ___ film of the year.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['the best'], ['better'], ['the more good']], pista: '«Of the year» escoge entre todas.' }, 'Entre todas: «the best».')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Ana is taller than Leo. Leo is as tall as Sam.» Subraya lo que se concluye.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Sam is the tallest.'], ['Ana is taller than Sam.'], ['Leo is taller than Sam.']], pista: 'Leo y Sam son iguales. ¿Y Ana?' }, 'Si Leo y Sam son iguales, Ana es más alta que los dos.')],
], 'Dos se comparan con than, iguales con as… as y el primero con the.');
;
//#archivo js/explora-icf-en-3-pasos.js
// Preicfes · Inglés, mundo 3 «Gramática en Contexto», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación
// empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen (un texto con huecos, A–D).
{
  xpAmplia('icf-en-gramatica-1', {
    conecta: 'icf-en-avisos-2',
    desde: [
      ['Desde cero: el verbo cambia con el tiempo',
        xpMira('hoja', 'Antes de todo: en inglés el **mismo verbo** cambia un poquito según el día del que hablas.', { paras: [['Today', 'I walk', 'to school.'], ['Yesterday', 'I walked', 'to school.'], ['Tomorrow', 'I will walk', 'to school.']] }, [
          ['En la lección de palabras viste que «-ed» dice que algo ya pasó.', {}],
          ['Aquí se arma la idea completa: el verbo cambia según el día.', {}],
          ['Hoy: «walk», el verbo tal cual.', { luz: [0, 1], nota: { 0: 'presente' } }],
          ['Ayer: se le pega «-ed» y queda «walked».', { luz: [3, 4], nota: { 1: 'pasado' } }],
          ['Mañana: «will» adelante y el verbo tal cual.', { luz: [6, 7], nota: { 2: 'futuro' } }],
          ['Algunos verbos son irregulares: go se vuelve went; buy, bought.', {}],
        ], 'Presente tal cual, pasado con -ed o irregular, futuro con will.'),
        xpHaz('hoja', '«Last Saturday we ___ to the river.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['go'], ['went'], ['will go']], pista: '«Last Saturday» ya pasó, y «go» es irregular.' }, '«Went» es el pasado de go.')],
    ],
    despues: [
      ['Más difícil: became o become, still o already',
        xpMira('hoja', 'Un paso más: formas **casi iguales** que se ponen juntas para confundir.', { paras: [['She became a doctor in May.'], ['She has become a doctor.'], ['He is still sleeping.'], ['He has already left.']] }, [
          ['Formas casi iguales: por eso aparecen juntas en las opciones.', {}],
          ['«Became» es pasado, con un momento cerrado como «in May».', { luz: [0], nota: { 0: 'pasado' } }],
          ['Con «has» va «become», la tercera forma, que no cambia.', { luz: [1], nota: { 1: 'has + become' } }],
          ['«Still» es todavía: la acción sigue pasando.', { luz: [2], nota: { 2: 'todavía' } }],
          ['«Already» es ya: pasó antes de lo que se esperaba.', { luz: [3], nota: { 3: 'ya' } }],
        ], 'Became con fecha; has become con has. Still: todavía. Already: ya.'),
        xpHaz('hoja', '«It\'s noon and my brother is ___ in bed.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['already'], ['still'], ['became']], pista: 'A mediodía sigue en la cama: ¿ya o todavía?' }, '«Still» dice que sigue en la cama.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen hay un **texto con huecos** y cuatro formas del mismo verbo.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['My grandfather ___ a farmer when he was twenty.'], ['become'], ['became'], ['has become'], ['becoming']] }, [
        ['Un hueco y cuatro formas del verbo «become», volverse.', { luz: [0] }],
        ['«When he was twenty» es un momento cerrado del pasado.', { luz: [0] }],
        ['«Become» y «becoming» no están en pasado.', { luz: [1, 4], nota: { 1: 'no', 4: 'no' } }],
        ['«Has become» llega hasta hoy: no va con «when he was».', { luz: [3], nota: { 3: 'trampa' } }],
        ['«Became» es el pasado simple: esa completa.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'Busca la palabra de tiempo y escoge la forma que va con ella.'),
      xpHaz('hoja', '«I ___ my homework. Can I watch TV now?» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['still do'], ['have already done'], ['will do yesterday'], ['am doing last week']], pista: 'Ya terminó: por eso pide ver televisión. Mira «already».' }, '«Have already done»: ya la terminó.')],
    cierre: 'Mira la palabra de tiempo, la forma del verbo y cuidado con became, still y already.',
  });

  xpAmplia('icf-en-gramatica-2', {
    conecta: 'icf-en-gramatica-1',
    desde: [
      ['Desde cero: las palabras pequeñas de lugar',
        xpMira('hoja', 'Antes de todo: unas **palabras pequeñas** dicen dónde está algo.', { paras: [['in', 'dentro'], ['on', 'encima'], ['under', 'debajo'], ['next to', 'al lado']] }, [
          ['En la lección anterior viste que la palabra de tiempo escoge el verbo.', {}],
          ['Ahora, palabras pequeñas que dicen dónde está algo.', {}],
          ['«In» es dentro: el celular está in the bag.', { luz: [0], nota: { 0: 'dentro' } }],
          ['«On» es encima: el libro está on the table.', { luz: [2], nota: { 1: 'encima' } }],
          ['«Under» es debajo y «next to», al lado.', { luz: [4, 6] }],
          ['Se llaman preposiciones y casi nunca se traducen palabra por palabra.', {}],
        ], 'In dentro, on encima, under debajo, next to al lado.'),
        xpHaz('hoja', '«My phone is ___ my bag. I have to open it to get it.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['on'], ['in'], ['next to']], pista: 'Para sacarlo tiene que abrir el bolso.' }, 'Si hay que abrirlo, está dentro: in.')],
    ],
    despues: [
      ['Más difícil: few o little, who, where o which',
        xpMira('hoja', 'Un paso más: parejas que el examen pone juntas para **confundir**.', { paras: [['few', 'friends'], ['little', 'money'], ['the man', 'who', 'cooks'], ['the town', 'where', 'I live'], ['the bike', 'which', 'I bought']] }, [
          ['«Few» va con lo que se cuenta: pocos amigos.', { luz: [0, 1], nota: { 0: 'se cuenta' } }],
          ['«Little» va con lo que no se cuenta: poca plata.', { luz: [2, 3], nota: { 1: 'no se cuenta' } }],
          ['Para unir ideas, «who» se usa con personas.', { luz: [5], nota: { 2: 'persona' } }],
          ['«Where» se usa con lugares.', { luz: [8], nota: { 3: 'lugar' } }],
          ['Y «which» se usa con cosas.', { luz: [11], nota: { 4: 'cosa' } }],
        ], 'Few cuenta y little no. Who persona, where lugar, which cosa.'),
        xpHaz('hoja', '«This is the café ___ we met.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['who'], ['where'], ['which']], pista: 'El café es un lugar donde pasó algo.' }, 'Un lugar donde pasó algo: where.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen el hueco se decide con **toda la oración**: gramática y sentido.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['There were ___ people at the concert, so we got good seats.'], ['few'], ['little'], ['much'], ['a lot of']] }, [
        ['El texto tiene un hueco; la pista está en el resto de la oración.', { luz: [0] }],
        ['«People» se cuenta: «little» y «much» quedan fuera.', { luz: [2, 3], nota: { 2: 'no cuenta', 3: 'no cuenta' } }],
        ['«A lot of» encaja en gramática, pero con mucha gente no hay buenos puestos.', { luz: [4], nota: { 4: 'sin sentido' } }],
        ['«Few»: poca gente, por eso hubo buenos puestos.', { luz: [1], nota: { 1: 'sirve' } }],
        ['Revisa dos cosas: la gramática y el sentido de toda la oración.', {}],
      ], 'Gramática y sentido: la opción correcta cumple las dos.'),
      xpHaz('hoja', '«My aunt, ___ lives in Pasto, sends us coffee every month.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['where'], ['which'], ['who'], ['when']], pista: '¿El hueco habla de una persona, de un lugar o de una cosa?' }, '«My aunt» es una persona: who.')],
    cierre: 'Preposiciones de lugar y tiempo, few o little, who, where o which y el conector justo.',
  });

  xpAmplia('icf-en-gramatica-3', {
    conecta: 'icf-en-gramatica-2',
    desde: [
      ['Desde cero: palabras que describen',
        xpMira('hoja', 'Antes de comparar hace falta un **adjetivo**: la palabra que dice cómo es algo.', { paras: [['a', 'big', 'house'], ['a', 'fast', 'car'], ['an', 'old', 'man']] }, [
          ['En la lección anterior viste palabras pequeñas como in, few y who.', {}],
          ['Para comparar hace falta primero un adjetivo: dice cómo es algo.', {}],
          ['«Big» es grande y va antes de la cosa: a big house.', { luz: [1] }],
          ['Al revés del español: no se dice «a house big».', { luz: [0, 1, 2] }],
          ['«Fast» es rápido y «old» es viejo.', { luz: [4, 7] }],
          ['Los adjetivos no cambian en plural: two big houses.', {}],
        ], 'El adjetivo dice cómo es algo y va antes de la cosa, sin plural.'),
        xpHaz('hoja', 'Subraya la frase bien escrita.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['a dog black'], ['a black dog'], ['a blacks dogs']], pista: 'El adjetivo va antes y no lleva s.' }, '«Black» va antes de «dog»: a black dog.')],
    ],
    despues: [
      ['Más difícil: el doble y la mitad',
        xpMira('hoja', 'Un paso más: comparaciones con **números** que se dicen de varias maneras.', { paras: [['Juice A: 2 000 pesos'], ['Juice B: 4 000 pesos'], ['B is twice as expensive as A.'], ['A is cheaper than B.'], ['A is half the price of B.']] }, [
          ['Dos jugos: A cuesta 2 000 pesos y B cuesta 4 000.', { luz: [0, 1] }],
          ['«Twice as expensive as»: B cuesta el doble.', { luz: [2], nota: { 2: 'el doble' } }],
          ['«Cheaper than» dice lo mismo, mirado desde el otro jugo.', { luz: [3], nota: { 3: 'más barato' } }],
          ['«Half the price»: A cuesta la mitad.', { luz: [4], nota: { 4: 'la mitad' } }],
          ['Tres frases distintas y una comparación: mira quién es el sujeto.', {}],
        ], 'Twice as… as: el doble. Half: la mitad. Cambiar el sujeto voltea la palabra.'),
        xpHaz('hoja', 'Sara tiene 16 años y Tomás, 8. Subraya la que es **cierta**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Tomás is older than Sara.'], ['Sara is twice as old as Tomás.'], ['Sara is as old as Tomás.']], pista: '16 es el doble de 8.' }, 'Sara tiene el doble de años que Tomás.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen aparecen **cuatro formas** del mismo adjetivo y un solo hueco.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Bogotá is ___ than Cartagena in December.'], ['cold'], ['colder'], ['more cold'], ['the coldest']] }, [
        ['Un hueco y cuatro formas del mismo adjetivo: típico de esta parte.', { luz: [0] }],
        ['«Than» avisa que se comparan dos ciudades.', { luz: [0] }],
        ['«Cold» sola no compara nada.', { luz: [1], nota: { 1: 'no compara' } }],
        ['«More cold» mezcla dos reglas, y «cold» es corta.', { luz: [3], nota: { 3: 'trampa' } }],
        ['«The coldest» es para el primero de todos, no para dos.', { luz: [4], nota: { 4: 'de todos' } }],
        ['«Colder than» es la que completa.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'Than pide -er o more; the pide -est o most; nunca las dos.'),
      xpHaz('hoja', '«Of all my friends, Juan is ___ person.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['the funniest'], ['funnier'], ['more funny'], ['the most funniest']], pista: '«Of all» escoge entre todos, y «funny» termina en -y.' }, 'Entre todos: the funniest.')],
    cierre: 'Adjetivo antes de la cosa; -er o more con than; the -est o the most entre todos.',
  });
}
;
//#archivo js/explora-icf-en-4.js
// Preicfes · Inglés, mundo 4 «Textos Cortos» (Explora, escena «hoja»): se explica en español con ejemplos en inglés propios.
xpLec('icf-en-corto-1', [
  ['¿Quién le escribe a quién?',
    xpMira('hoja', 'Empecemos por la idea: mira el **saludo** y la **firma** antes de leer.', { paras: [['Dear Ms Gil,', 'thank you for the books.', 'Regards, Omar'], ['Hi Tina!', 'See you at six.', 'Love, Dad']] }, [
      ['«Dear Ms Gil»: se le escribe a ella, con respeto.', { luz: [0], nota: { 0: 'formal' } }],
      ['«Regards, Omar»: escribe Omar.', { luz: [2] }],
      ['«Hi Tina!» y «Love, Dad» son de familia.', { luz: [3, 5], nota: { 1: 'informal' } }],
      ['El del saludo recibe; el de la firma escribe.', { luz: [0, 2] }],
      ['Con eso ya sabes quién es «I» y quién es «you».', {}],
    ], 'Saludo: quien recibe. Firma: quien escribe.'),
    xpHaz('hoja', '«Dear Coach, I can\'t come tomorrow. Regards, Nina.» Subraya quién **no puede ir**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['The coach'], ['Nina'], ['Both']], pista: 'Quien firma es «I».' }, '«I» es Nina, que firma.')],
  ['¿Para qué?',
    xpMira('hoja', 'Segunda idea: un mensaje corto siempre **quiere algo**.', { paras: [['Could you bring a chair?'], ['The shop is closed today.'], ['Would you like to come?'], ['Thanks for the cake!']] }, [
      ['«Could you…?» pide un favor.', { luz: [0], nota: { 0: 'pide' } }],
      ['Decir que está cerrado es avisar.', { luz: [1], nota: { 1: 'avisa' } }],
      ['«Would you like…?» invita a alguien.', { luz: [2], nota: { 2: 'invita' } }],
      ['«Thanks for» agradece algo que ya pasó.', { luz: [3], nota: { 3: 'agradece' } }],
      ['Con el propósito claro, lo demás son detalles.', {}],
    ], 'Pide, avisa, invita o agradece.'),
    xpHaz('hoja', 'Pon al margen el propósito.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['invita', 'avisa', 'pide'], meta: [2, 0, 1], paras: [['Can you feed the cat, please?'], ['Would you like to have dinner with us?'], ['The meeting is now at four.']], pista: 'Alguna no va ahí: busca «can you», «would you like» y un dato nuevo.' }, 'Pide, invita y avisa.')],
  ['Los datos y lo que se entiende',
    xpMira('hoja', 'Tercera idea: subraya **qué hacer y cuándo**, y une dos datos.', { paras: [['Grandma doesn\'t eat sugar.'], ['Please buy her cake', 'at the new bakery,', 'not at Luigi\'s.']] }, [
      ['Qué hay que comprar: un pastel.', { luz: [1] }],
      ['Dónde: en la panadería nueva.', { luz: [2], nota: { 1: 'dónde' } }],
      ['Y dónde no: «not at Luigi\'s».', { luz: [3] }],
      ['Une los datos: ella no come azúcar.', { luz: [0, 2] }],
      ['Se entiende que la nueva vende pastel sin azúcar.', {}],
    ], 'Qué, dónde, cuándo; y une dos datos para entender más.'),
    xpHaz('hoja', '«Wear your boots. It rained all night and we are walking to the farm.» Subraya lo que se entiende.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['The road is muddy.'], ['The farm is closed.'], ['They are going by car.']], pista: 'Une la lluvia, las botas y que van a pie.' }, 'Llovió, van a pie y piden botas: hay barro.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Hi Leo, the film starts at 7, not 8. Don\'t eat before: we are having pizza after. Ana». Subraya lo que Leo **debe hacer**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Eat at home'], ['Arrive at eight'], ['Arrive before seven']], pista: 'Cambió la hora y hay comida después.' }, 'La película empieza a las siete y comerán después.')],
], 'Quién, para qué, qué hacer y cuándo.');

xpLec('icf-en-corto-2', [
  ['La idea de todo el texto',
    xpMira('hoja', 'Empecemos por la idea: la **idea principal** sirve para todo el texto.', { letras: ['1', '2', '3'], paras: [['Rosa makes toys from old bottles.'], ['Children bring her the bottles on Fridays.'], ['Last year she made 300 toys.']] }, [
      ['El primer renglón presenta a Rosa y sus juguetes.', { luz: [0] }],
      ['El segundo dice de dónde salen las botellas.', { luz: [1], nota: { 1: 'detalle' } }],
      ['El tercero dice cuántos hizo.', { luz: [2], nota: { 2: 'detalle' } }],
      ['Lo común: una mujer convierte botellas en juguetes.', { luz: [0], nota: { 0: 'idea' } }],
      ['«300 toys» es cierto, pero no es la idea.', { luz: [2] }],
    ], 'La idea principal cubre todo; un detalle, solo una parte.'),
    xpHaz('hoja', '«The old cinema is a school now. Students paint where the seats were. The screen is a map.» Subraya la idea principal.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['The screen is a map.'], ['A cinema became a school.'], ['Students like painting.']], pista: 'Debe servir para las tres oraciones.' }, 'Todo el texto habla de un cine que hoy es escuela.')],
  ['Correct, wrong, doesn\'t say',
    xpMira('hoja', 'Segunda idea: **wrong** es que el texto dice lo contrario; **doesn\'t say**, que no lo menciona.', { letras: ['texto', 'a', 'b', 'c'], paras: [['Tom has a small boat. He fishes every morning.'], ['Tom fishes every day.'], ['Tom\'s boat is big.'], ['Tom has a brother.']] }, [
      ['«Every morning» es todos los días: correcto.', { luz: [0, 1], nota: { 1: 'correct' } }],
      ['Dice «small» y aquí «big»: lo contrario.', { luz: [0, 2], nota: { 2: 'wrong' } }],
      ['Del hermano no dice nada.', { luz: [3], nota: { 3: 'doesn\'t say' } }],
      ['Aunque pueda ser verdad, no está en el texto.', { luz: [3] }],
      ['Señala la oración; si no puedes, no lo dice.', {}],
    ], 'Correct: está. Wrong: dice lo contrario. Doesn\'t say: no está.'),
    xpHaz('hoja', 'Texto: «Lia works at night and sleeps in the morning. She has two cats». Pon al margen.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['doesn\'t say', 'correct', 'wrong'], meta: [2, 0, 1], paras: [['Lia works in the morning.'], ['Lia is a nurse.'], ['Lia has pets.']], pista: 'Alguna no va ahí: busca la oración que lo dice o lo niega.' }, 'De día duerme, no dice el oficio y los gatos son mascotas.')],
  ['La palabra por el contexto',
    xpMira('hoja', 'Tercera idea: si no conoces una palabra, **mira lo que la rodea**.', { paras: [['The bag was so heavy', 'that two men', 'could not lift it.'], ['She was exhausted:', 'she slept for ten hours.']] }, [
      ['¿«Heavy»? Dos hombres no pudieron con la bolsa.', { luz: [0, 1] }],
      ['Entonces «heavy» es pesada.', { luz: [0], nota: { 0: 'pesada' } }],
      ['¿«Exhausted»? Durmió diez horas.', { luz: [3, 4] }],
      ['Entonces es muy cansada.', { luz: [3], nota: { 1: 'muy cansada' } }],
      ['Cambia la palabra por la tuya y mira si suena.', {}],
    ], 'Lee antes y después: el contexto la explica.'),
    xpHaz('hoja', '«The soup was tasteless, so he added salt and lemon.» Subraya lo que significa «tasteless».', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['sin sabor'], ['muy caliente'], ['deliciosa']], pista: '¿Por qué alguien agrega sal y limón?' }, 'Le agrega sal y limón porque no sabe a nada.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«They thought few people would come, so they brought ten chairs. People sat on the floor.» Subraya lo que se entiende.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Nobody came.'], ['More than ten people came.'], ['The chairs were broken.']], pista: '¿Por qué se sentarían en el piso?' }, 'Faltaron sillas: llegaron más de diez.')],
], 'La idea de todo, lo que se puede señalar y la palabra por su contexto.');
;
//#archivo js/explora-icf-en-4-pasos.js
// Preicfes · Inglés, mundo 4 «Textos Cortos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación empieza desde
// cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen (lectura literal, A–D). Nota dibujada con XLAB.
{
  const X = XLAB;
  // Una nota pegada sobre la mesa; v.s, v.m y v.f ponen los rótulos del saludo, el mensaje y la firma.
  const nota = v => X.foto(X.aviso(70, 26, 170, 124, ['Hi Carla,', 'I\'m at the bank.', 'Back in ten minutes.', 'Pedro'], 'papel') +
    (v.s ? X.rot(292, 54, 'saludo', 'oscuro') : '') + (v.m ? X.rot(292, 92, 'mensaje', 'oscuro') : '') + (v.f ? X.rot(292, 128, 'firma', 'oscuro') : ''), 200, 'mesa');

  xpAmplia('icf-en-corto-1', {
    conecta: 'icf-en-dialogos-2',
    desde: [
      ['Desde cero: qué es un mensaje corto',
        xpMira('dibujo', 'Antes de todo: un **mensaje corto** es una nota, un chat o un correo de pocas líneas.', { dib: nota, v: {}, alto: 200 }, [
          ['En la lección de cortesía viste que «could you» pide un favor.', {}],
          ['Un mensaje corto es una nota, un chat o un correo de pocas líneas.', {}],
          ['Arriba va el saludo: a quién se le escribe.', { s: 1 }],
          ['En el medio, el mensaje: qué pasa o qué se pide.', { s: 1, m: 1 }],
          ['Abajo va la firma: quién escribe.', { s: 1, m: 1, f: 1 }],
          ['Pedro avisa que vuelve pronto: esta vez no pide nada.', { s: 1, m: 1, f: 1 }],
        ], 'Saludo, mensaje y firma: tres partes que se leen en segundos.'),
        xpHaz('hoja', 'En esa nota, subraya **quién** vuelve en diez minutos.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Carla'], ['Pedro'], ['The bank']], pista: 'Mira quién habla en primera persona, con «I».' }, '«I» es quien firma: Pedro.')],
    ],
    despues: [
      ['Más difícil: el dato que cambia',
        xpMira('hoja', 'Un paso más: muchos mensajes **corrigen** algo. Hay un dato viejo y uno nuevo.', { paras: [['The meeting is on Tuesday,', 'not Monday.'], ['Bring juice', 'instead of soda.'], ['Room 5 is closed;', 'we\'ll use Room 8.']] }, [
          ['Muchos mensajes corrigen algo: hay un dato viejo y uno nuevo.', {}],
          ['«Not Monday» tacha el dato viejo: la reunión es el martes.', { luz: [0], tacha: [1], nota: { 0: 'martes' } }],
          ['«Instead of» es en vez de: jugo, no gaseosa.', { luz: [2], tacha: [3], nota: { 1: 'jugo' } }],
          ['Un salón cerrado y otro que lo reemplaza: el 8.', { luz: [5], tacha: [4], nota: { 2: 'salón 8' } }],
          ['La pregunta casi siempre busca el dato nuevo.', {}],
        ], 'Not, instead of y closed marcan el dato viejo: responde con el nuevo.'),
        xpHaz('hoja', '«Dinner is at Grandma\'s, not at our house. Come at 7 instead of 6.» Subraya lo que es **cierto**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Dinner is at home at 6.'], ['Dinner is at Grandma\'s at 7.'], ['Dinner is at Grandma\'s at 6.']], pista: 'Quédate con el dato nuevo en los dos casos.' }, 'Donde la abuela y a las siete: los datos nuevos.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen lees un mensaje corto y escoges la frase que **coincide** con él.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Hi Sam, the pool is closed today. Let\'s play tennis at 4. Bring your racket. Kim'], ['Kim wants to swim today.'], ['Kim invites Sam to play tennis.'], ['Sam must buy a racket.'], ['The tennis court is closed.']] }, [
        ['Pregunta: ¿para qué escribe Kim? La respuesta está en el texto.', { luz: [0] }],
        ['La A dice nadar, pero la piscina está cerrada: al revés.', { luz: [1], nota: { 1: 'al revés' } }],
        ['La C cambia «bring» por «buy»: traer no es comprar.', { luz: [3], nota: { 3: 'cambia' } }],
        ['La D pone «closed» en otro lugar: lo cerrado es la piscina.', { luz: [4], nota: { 4: 'cambia' } }],
        ['La B: invita a jugar tenis a las cuatro.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'Compara cada opción con el texto: una palabra cambiada la vuelve falsa.'),
      xpHaz('hoja', '«Mum, I\'m at Lina\'s to study. Her dad will drive me home at 9. Don\'t wait for dinner. Eva» Subraya lo cierto.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Eva will eat at home.'], ['Lina\'s dad will take Eva home.'], ['Eva will walk home at 9.'], ['Mum must pick Eva up.']], pista: 'Busca quién maneja y si Eva come en casa.' }, 'El papá de Lina la lleva a las nueve.')],
    cierre: 'Quién escribe, para qué, el dato nuevo y cada opción comparada con el texto.',
  });

  xpAmplia('icf-en-corto-2', {
    conecta: 'icf-en-corto-1',
    desde: [
      ['Desde cero: tema, idea y detalle',
        xpMira('hoja', 'Antes de todo: tres palabras para hablar de un texto: **tema**, **detalle** e **idea principal**.', { paras: [['My street has a new garden.'], ['Neighbours planted tomatoes.'], ['Kids water them after school.']] }, [
          ['En la lección anterior viste que un mensaje corto quiere algo.', {}],
          ['Un texto tiene un tema: de qué habla, en dos o tres palabras.', {}],
          ['Aquí el tema es un jardín nuevo en la calle.', { luz: [0], nota: { 0: 'tema' } }],
          ['Las demás oraciones dan detalles: quién siembra y quién riega.', { luz: [1, 2], nota: { 1: 'detalle', 2: 'detalle' } }],
          ['La idea principal junta todo: los vecinos cuidan un jardín nuevo.', { luz: [0, 1, 2] }],
        ], 'Tema: de qué habla. Detalle: un dato. Idea principal: todo junto.'),
        xpHaz('hoja', 'En ese texto, subraya un **detalle**, no la idea principal.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['The neighbours look after a new garden.'], ['Kids water the plants after school.'], ['The street has a garden now.']], pista: 'Un detalle es un solo dato: quién, cuándo o cuánto.' }, 'Regar después del colegio es solo un dato.')],
    ],
    despues: [
      ['Más difícil: lo cierto que el texto no dice',
        xpMira('hoja', 'Un paso más: una opción puede ser **verdad en la vida** y no estar en el texto.', { letras: ['texto', 'a', 'b', 'c'], paras: [['Coffee grows well in the mountains of Caldas.'], ['Colombia sells coffee to other countries.'], ['Caldas has mountains.'], ['Coffee only grows in Caldas.']] }, [
          ['Trampa frecuente: una opción cierta en la vida, pero ausente del texto.', { luz: [0] }],
          ['La a es verdad, pero aquí nadie habla de vender afuera.', { luz: [1], nota: { 1: 'doesn\'t say' } }],
          ['La b sale de «the mountains of Caldas».', { luz: [2], nota: { 2: 'correct' } }],
          ['La c exagera: «grows well» no es «solo crece ahí».', { luz: [3], nota: { 3: 'exagera' } }],
          ['Responde con el texto en la mano, no con lo que sabes.', {}],
        ], 'Si no lo puedes señalar en el texto, no lo dice, aunque sea cierto.'),
        xpHaz('hoja', 'Texto: «Owls hunt at night and sleep during the day.» Subraya lo que el texto **sí** dice.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Owls are birds.'], ['Owls are awake at night.'], ['Owls eat mice.']], pista: 'Dos son ciertas en la vida, pero el texto no las menciona.' }, '«Hunt at night» dice que de noche están despiertos.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen preguntan **de qué trata** el texto: una sola opción lo cubre entero.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Diana teaches dance in her garage. At first, two girls came. Now forty children learn salsa there every week.'], ['Forty children.'], ['A garage that Diana built.'], ['A dance class that grew.'], ['Salsa music in Colombia.']] }, [
        ['Pregunta: ¿de qué trata el texto? Una opción cubre todo.', { luz: [0] }],
        ['La A es un número cierto, pero es solo un detalle.', { luz: [1], nota: { 1: 'detalle' } }],
        ['La B inventa: el texto no dice que ella construyó el garaje.', { luz: [2], nota: { 2: 'no lo dice' } }],
        ['La D es demasiado amplia: habla de todo un país.', { luz: [4], nota: { 4: 'muy amplia' } }],
        ['La C junta el inicio y el ahora: una clase que creció.', { luz: [3], nota: { 3: 'sirve' } }],
      ], 'La idea principal no es un detalle, no inventa y no es más amplia que el texto.'),
      xpHaz('hoja', '«Mateo found an old bike in the street. He fixed it and gave it to his neighbour.» ¿De qué trata? Subraya.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Old bikes in the city.'], ['A boy who repairs a bike and gives it away.'], ['Mateo\'s neighbour.'], ['How to fix a bike.']], pista: 'Busca la que cubre todo el texto: ni más amplia ni solo un detalle.' }, 'La B junta encontrar, arreglar y regalar.')],
    cierre: 'La idea cubre todo, el detalle es una parte y lo que no se señala, el texto no lo dice.',
  });
}
;
//#archivo js/explora-icf-en-5.js
// Preicfes · Inglés, mundo 5 «Textos Largos» (Explora, escena «hoja»): se explica en español con ejemplos en inglés propios.
xpLec('icf-en-largo-1', [
  ['Primero, de qué trata',
    xpMira('hoja', 'Empecemos por la idea: no leas todo de una vez; mira **título y primeras oraciones**.', { letras: ['título', '1', '2', '3'], paras: [['The doctor who travels by canoe'], ['Dr Mena visits twelve villages.'], ['Her canoe is also a small hospital.'], ['Last year she built a radio.']] }, [
      ['El título: una doctora que viaja en canoa.', { luz: [0] }],
      ['Párrafo 1: adónde va.', { luz: [1], nota: { 1: 'where' } }],
      ['Párrafo 2: con qué trabaja.', { luz: [2], nota: { 2: 'what with' } }],
      ['Párrafo 3: qué hizo después.', { luz: [3], nota: { 3: 'what next' } }],
      ['Ya tienes un mapa: sabes dónde buscar.', {}],
    ], 'Título y primeras oraciones: un mapa del texto.'),
    xpHaz('hoja', '«How does she talk to the villages?». Subraya dónde buscarías.', { modo: 'toca', letras: ['1', '2', '3'], meta: [2], paras: [['Dr Mena visits twelve villages.'], ['Her canoe is also a small hospital.'], ['Last year she built a radio.']], pista: '¿Cuál habla de un aparato para comunicarse?' }, 'La radio sirve para hablar con las veredas.')],
  ['La misma idea, otras palabras',
    xpMira('hoja', 'Segunda idea: la pregunta usa **otras palabras** que el texto.', { paras: [['She used to live in Cali.'], ['In the past, her home was Cali.'], ['The bus no longer stops here.'], ['The bus doesn\'t stop here any more.']] }, [
      ['«Used to live»: antes vivía, ya no.', { luz: [0], nota: { 0: 'antes' } }],
      ['«In the past» dice lo mismo.', { luz: [1], nota: { 1: 'igual' } }],
      ['«No longer»: ya no.', { luz: [2], nota: { 2: 'ya no' } }],
      ['«Any more», con «doesn\'t», también es ya no.', { luz: [3], nota: { 3: 'igual' } }],
      ['Busca la idea, no la misma palabra.', {}],
    ], 'Used to: antes. No longer y not any more: ya no.'),
    xpHaz('hoja', '«Tim gave up coffee in May.» Subraya la que dice lo mismo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Tim started to drink coffee in May.'], ['Tim stopped drinking coffee in May.'], ['Tim sold coffee in May.']], pista: '«Give up» es dejar de hacer algo.' }, '«Gave up» es dejó: «stopped».')],
  ['Detalle o idea',
    xpMira('hoja', 'Tercera idea: una opción puede ser **cierta** y no ser la **idea principal**.', { letras: ['texto', 'a', 'b', 'c'], paras: [['Ema repairs toys. She mends forty a week and gives them to schools.'], ['Ema gives repaired toys to schools.'], ['Ema mends forty toys.'], ['Ema sells toys.']] }, [
      ['Esto cuenta el texto.', { luz: [0] }],
      ['Esta lo cubre todo: idea principal.', { luz: [0, 1], nota: { 1: 'main idea' } }],
      ['Esta es cierta, pero es una parte.', { luz: [2], nota: { 2: 'detail' } }],
      ['Esta cambia la verdad.', { luz: [3], tacha: [3], nota: { 3: 'wrong' } }],
      ['Cierta no es lo mismo que principal.', {}],
    ], 'La principal cubre todo; el detalle, una parte.'),
    xpHaz('hoja', '«The lake was dirty. Neighbours cleaned it in two years. Now there are fish.» Subraya la idea principal.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['There are fish.'], ['It took two years.'], ['Neighbours brought a lake back to life.']], pista: 'Debe cubrir el antes, el cómo y el ahora.' }, 'Las otras dos son detalles ciertos.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Few people finished the race, although hundreds had started.» Subraya lo que dice.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Most runners didn\'t finish.'], ['Everybody finished.'], ['Nobody started.']], pista: '«Few» es pocos; «although», aunque.' }, 'Empezaron cientos y terminaron pocos.')],
], 'Haz el mapa, busca la idea con otras palabras y separa lo principal.');

xpLec('icf-en-largo-2', [
  ['¿Para qué escribe?',
    xpMira('hoja', 'Empecemos por la idea: pregunta **qué quiere** quien escribe.', { letras: ['A', 'B', 'C', 'D'], paras: [['You should try it at home.'], ['The bus was late again. This can\'t continue.'], ['This is how the machine works.'], ['When I was six, I met a bear.']] }, [
      ['«You should» quiere convencer o aconsejar.', { luz: [0], nota: { 0: 'to advise' } }],
      ['«This can\'t continue»: se queja.', { luz: [1], nota: { 1: 'to complain' } }],
      ['«This is how» explica algo.', { luz: [2], nota: { 2: 'to explain' } }],
      ['«When I was six» cuenta una historia.', { luz: [3], nota: { 3: 'to tell a story' } }],
      ['El propósito está en todo el texto, no en una palabra.', {}],
    ], 'To advise, to complain, to explain, to tell.'),
    xpHaz('hoja', 'Pon al margen el propósito.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['to complain', 'to thank', 'to explain'], meta: [2, 0, 1], paras: [['First, you open the box.'], ['The soup was cold and nobody apologised.'], ['You have helped us so much.']], pista: 'Alguna no va ahí: ¿enseña pasos, se queja o agradece?' }, 'Explica, se queja y agradece.')],
  ['Hecho u opinión',
    xpMira('hoja', 'Segunda idea: un **hecho** se comprueba; una **opinión** se discute.', { paras: [['The film lasts two hours.'], ['The film is too long.'], ['I think it needs music.'], ['It was made in Pasto.']] }, [
      ['Dos horas se miden: hecho.', { luz: [0], nota: { 0: 'fact' } }],
      ['«Too long» depende de quien mira.', { luz: [1], nota: { 1: 'opinion' } }],
      ['«I think» anuncia una opinión.', { luz: [2], nota: { 2: 'opinion' } }],
      ['El lugar se comprueba: hecho.', { luz: [3], nota: { 3: 'fact' } }],
      ['Adjetivos como «best» o «terrible» suelen opinar.', {}],
    ], 'Fact: se comprueba. Opinion: alguien puede no estar de acuerdo.'),
    xpHaz('hoja', 'Subraya la **opinión**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['The museum opens at nine.'], ['Entrance is free on Sundays.'], ['Nobody should miss it.']], pista: 'Busca la que alguien podría discutir.' }, '«Nobody should miss it» es lo que piensa quien escribe.')],
  ['Aceptar y limitar',
    xpMira('hoja', 'Tercera idea: el autor puede **reconocer** algo y luego decir **lo suyo**.', { paras: [['I understand why people use phones.'], ['They are useful.'], ['However,', 'I don\'t want them at dinner.'], ['I am asking for one hour.']] }, [
      ['«I understand» reconoce al otro.', { luz: [0, 1], nota: { 0: 'reconoce' } }],
      ['«However» avisa un cambio.', { luz: [2] }],
      ['Lo que viene es su opinión.', { luz: [3], nota: { 2: 'su opinión' } }],
      ['Y al final, lo que pide.', { luz: [4], nota: { 3: 'lo que pide' } }],
      ['No está contra los teléfonos: pide una hora.', { luz: [0, 4] }],
    ], '«I understand… However… I am asking for…».'),
    xpHaz('hoja', '«I love dogs. However, the beach isn\'t a good place for them.» Subraya lo que piensa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['He hates dogs.'], ['He doesn\'t want dogs on the beach.'], ['He wants more dogs on the beach.']], pista: 'Lo suyo viene después de «however».' }, 'Le gustan, pero no en la playa.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Thank you for your three letters. I have read them all, twice, and I still won\'t sell my house.» Subraya el tono.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Polite but firm'], ['Afraid'], ['Very happy to sell']], pista: 'Agradece, pero ¿cambia de idea?' }, 'Es amable y no cede.')],
], 'Para qué escribe, qué opina y qué pide.');
;
//#archivo js/explora-icf-en-5-pasos.js
// Preicfes · Inglés, mundo 5 «Textos Largos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación empieza desde
// cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen (mejor título y propósito, A–D).
{
  xpAmplia('icf-en-largo-1', {
    conecta: 'icf-en-corto-2',
    desde: [
      ['Desde cero: un texto largo sin miedo',
        xpMira('hoja', 'Antes de todo: un texto largo es como un tren: cada **párrafo** es un vagón con su carga.', { letras: ['1', '2', '3', '4'], paras: [['Juana grew up near the sea.'], ['She learned to swim at four.'], ['Later she trained every morning.'], ['Today she teaches children to swim, like her father did.']] }, [
          ['En la lección de textos cortos viste que la idea principal cubre todo.', {}],
          ['Un texto largo es lo mismo, pero repartido en varios párrafos.', {}],
          ['Cada párrafo tiene su propia tarea, como los vagones de un tren.', { luz: [0, 1, 2, 3] }],
          ['Casi siempre el primero presenta y el último cierra.', { luz: [0, 3], nota: { 0: 'presenta', 3: 'cierra' } }],
          ['Los del medio cuentan cómo pasó: aquí, cómo aprendió.', { luz: [1, 2], nota: { 1: 'cuenta', 2: 'cuenta' } }],
          ['No hace falta entender cada palabra: basta saber qué hace cada párrafo.', {}],
        ], 'Un texto largo son varios párrafos, cada uno con su tarea.'),
        xpHaz('hoja', 'Otro texto, de una cocinera. Subraya el párrafo que **cierra**.', { modo: 'toca', letras: ['1', '2', '3'], meta: [2], paras: [['Rocío learned to cook with her grandmother.'], ['At twenty she opened a small restaurant.'], ['Today her restaurant uses her grandmother\'s recipes.']], pista: 'El cierre mira hacia hoy y vuelve al comienzo.' }, 'El último cierra: hoy usa las recetas de la abuela.')],
    ],
    despues: [
      ['Más difícil: la respuesta en otro párrafo y con otras palabras',
        xpMira('hoja', 'Un paso más: la pregunta usa una palabra que **no está** en el texto.', { letras: ['1', '2', '3'], paras: [['The old factory gave jobs to the town for fifty years.'], ['People were proud of it.'], ['In the end it shut down: nobody bought its radios any more.']] }, [
          ['Pregunta: why did the factory close? Busquemos la respuesta.', {}],
          ['«Close» no aparece en el texto. ¿Se rinde uno? No.', {}],
          ['«Shut down» es cerrar: la respuesta está en el párrafo 3.', { luz: [2], nota: { 2: 'aquí' } }],
          ['La razón viene después de los dos puntos: nadie compraba radios.', { luz: [2] }],
          ['«Any more» es ya no: antes sí los compraban.', { luz: [2] }],
          ['Busca la idea en todo el texto, no la palabra exacta.', {}],
        ], 'La pregunta y el texto usan palabras distintas: busca la idea.'),
        xpHaz('hoja', 'Con ese texto: «How long did the factory work?» Subraya la respuesta.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Fifty years.'], ['Until people were proud.'], ['It sold radios.']], pista: '«How long» pide una duración; está en el primer párrafo.' }, '«For fifty years» es la duración.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen preguntan el **mejor título**: ni más amplio ni más estrecho que el texto.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Every year, students in Leticia count the pink dolphins of the Amazon. They use boats and cameras. This year they counted more than last year.'], ['Animals of the world'], ['A camera in a boat'], ['Young people who count river dolphins'], ['Why dolphins are pink']] }, [
        ['Pregunta clásica: ¿cuál es el mejor título para el texto?', { luz: [0] }],
        ['La A es demasiado amplia: el texto no habla de todo el mundo.', { luz: [1], nota: { 1: 'muy amplio' } }],
        ['La B es demasiado estrecha: la cámara es solo un detalle.', { luz: [2], nota: { 2: 'muy estrecho' } }],
        ['La D promete algo que el texto no explica.', { luz: [4], nota: { 4: 'no lo dice' } }],
        ['La C cubre quién, qué y dónde: ese es el título.', { luz: [3], nota: { 3: 'sirve' } }],
      ], 'El buen título no es más amplio ni más estrecho que el texto.'),
      xpHaz('hoja', '«In Barichara, old builders teach young people to make houses with earth. The houses stay cool in the heat.» Subraya el mejor título.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Houses of the world'], ['Learning to build with earth'], ['Hot days'], ['A young builder\'s hat']], pista: 'Descarta el muy amplio, el muy estrecho y el que no está en el texto.' }, 'La B cubre lo que se enseña y con qué material.')],
    cierre: 'Mapa de párrafos, la idea con otras palabras y el título justo: ni amplio ni estrecho.',
  });

  xpAmplia('icf-en-largo-2', {
    conecta: 'icf-en-largo-1',
    desde: [
      ['Desde cero: quién escribe y para quién',
        xpMira('hoja', 'Antes de todo: detrás de cada texto hay **alguien que escribe** y **alguien que lee**.', { paras: [['To: the Mayor'], ['Dear Sir,'], ['The park lights have not worked for a month.'], ['Please repair them.'], ['Yours, Luisa Díaz']] }, [
          ['En la lección anterior viste que cada párrafo tiene su tarea.', {}],
          ['Detrás de todo texto hay alguien que escribe y alguien que lee.', {}],
          ['Aquí lee el alcalde: el texto es formal, con «Dear Sir».', { luz: [0, 1], nota: { 1: 'formal' } }],
          ['Escribe Luisa, una vecina: lo dice la firma.', { luz: [4], nota: { 4: 'escribe' } }],
          ['Cuenta un problema y pide algo: se queja con respeto.', { luz: [2, 3], nota: { 2: 'problema', 3: 'pide' } }],
        ], 'Quién escribe, para quién y qué quiere: eso es el propósito.'),
        xpHaz('hoja', 'En esa carta, subraya la frase que dice **qué quiere** Luisa.', { modo: 'toca', letras: ['1', '2', '3'], meta: [1], paras: [['The park lights have not worked for a month.'], ['Please repair them.'], ['Yours, Luisa Díaz']], pista: 'El problema ya lo conoces; busca lo que pide.' }, '«Please repair them» es lo que pide.')],
    ],
    despues: [
      ['Más difícil: el tono',
        xpMira('hoja', 'Un paso más: el **tono** es cómo suena quien escribe, aunque no lo diga.', { paras: [['I can\'t wait for the trip!'], ['This is the third time I have written. I expect an answer today.'], ['I hope my son is all right there.']] }, [
          ['El tono es cómo suena quien escribe: alegre, bravo o preocupado.', {}],
          ['«Can\'t wait» y el signo de admiración: está emocionado.', { luz: [0], nota: { 0: 'excited' } }],
          ['«Third time» y «I expect»: está molesto y es firme.', { luz: [1], nota: { 1: 'angry' } }],
          ['«I hope… all right»: está preocupado por su hijo.', { luz: [2], nota: { 2: 'worried' } }],
          ['El tono no se dice: se nota en las palabras que escoge.', {}],
        ], 'El tono se nota en las palabras: excited, angry, worried, polite.'),
        xpHaz('hoja', '«Thank you for the invitation. I\'m afraid I can\'t go, but I hope it goes well.» Subraya el tono.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Angry'], ['Polite'], ['Excited']], pista: 'Agradece, se excusa con suavidad y desea suerte.' }, 'Agradece y se excusa: es amable, polite.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen preguntan **para qué** escribió el autor: mira todo el texto, sobre todo el final.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Our school needs more trees. In the afternoon the yard is too hot to play. Each student can bring one plant on Friday.'], ['To describe the school building.'], ['To complain about the students.'], ['To ask students to bring plants.'], ['To explain how trees grow.']] }, [
        ['Pregunta: ¿para qué escribió esto el autor? Mira todo el texto.', { luz: [0] }],
        ['La A habla del colegio, pero el texto no describe el edificio.', { luz: [1], nota: { 1: 'no lo hace' } }],
        ['La B: hay un problema, el calor, pero no culpa a los estudiantes.', { luz: [2], nota: { 2: 'trampa' } }],
        ['La D usa «trees», pero nadie explica cómo crecen.', { luz: [4], nota: { 4: 'repite' } }],
        ['La C: el final pide traer una planta. Ese es el propósito.', { luz: [3], nota: { 3: 'sirve' } }],
      ], 'El propósito sale de todo el texto; muchas veces se ve al final.'),
      xpHaz('hoja', '«Last week I lost my grey cat, Tito, near the church. He is friendly. Please call 300 555 0101.» ¿Para qué se escribe?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['To sell a cat.'], ['To find a lost cat.'], ['To describe a church.'], ['To complain about cats.']], pista: 'Mira lo que pide al final.' }, 'Pide que llamen: quiere encontrar a su gato.')],
    cierre: 'Quién escribe, para quién, con qué tono y para qué: todo el texto lo dice.',
  });
}
;
//#archivo js/explora-icf-en-6.js
// Preicfes · Inglés, mundo 6 «Palabras en Contexto» (Explora, escena «hoja»): se explica en español con ejemplos en inglés propios.
xpLec('icf-en-vocabulario-1', [
  ['Mira alrededor',
    xpMira('hoja', 'Empecemos por la idea: la palabra que falta debe encajar **antes y después**.', { letras: ['texto', 'a', 'b', 'c'], paras: [['It was raining, so she took her ___.'], ['umbrella'], ['sunglasses'], ['sing']] }, [
      ['«It was raining»: la pista está antes.', { luz: [0] }],
      ['Con lluvia se lleva paraguas.', { luz: [1], nota: { 1: 'encaja' } }],
      ['Gafas de sol no tiene sentido.', { luz: [2], tacha: [2] }],
      ['«Sing» es un verbo: aquí va una cosa.', { luz: [3], tacha: [3] }],
      ['Comprueba sentido y también gramática.', { luz: [0, 1] }],
    ], 'La palabra debe encajar en sentido y en gramática.'),
    xpHaz('hoja', '«The soup is too hot. ___ for a minute.» Subraya lo que encaja.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Run'], ['Wait'], ['Spoon']], pista: 'Debe ser una acción que tenga sentido con una sopa caliente.' }, 'Está caliente: hay que esperar.')],
  ['Cada palabra y su compañía',
    xpMira('hoja', 'Segunda idea: algunas palabras tienen su **compañía**.', { paras: [['make', 'a cake, a mistake, a noise'], ['do', 'homework, the dishes, sport'], ['say', 'something, hello'], ['tell', 'a person, a story']] }, [
      ['«Make» sirve para crear algo.', { luz: [0, 1] }],
      ['«Do» es para tareas y actividades.', { luz: [2, 3] }],
      ['«Say» lleva lo que se dice.', { luz: [4, 5] }],
      ['«Tell» lleva a quién: tell me.', { luz: [6, 7], nota: { 3: 'a quién' } }],
      ['Apréndelas en pareja, no sueltas.', {}],
    ], 'Make crea, do realiza, say algo, tell a alguien.'),
    xpHaz('hoja', '«Can you ___ me the truth?» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['say'], ['speak'], ['tell']], pista: 'Después va la persona: «me».' }, '«Tell me»: tell lleva a quién.')],
  ['Verbos con partícula',
    xpMira('hoja', 'Tercera idea: un verbo con **partícula** cambia de sentido.', { paras: [['look', 'mirar'], ['look after', 'cuidar'], ['look for', 'buscar'], ['turn down', 'rechazar']] }, [
      ['«Look» solo es mirar.', { luz: [0, 1] }],
      ['Con «after» es cuidar.', { luz: [2, 3] }],
      ['Con «for» es buscar.', { luz: [4, 5] }],
      ['«Turn down» es decir que no.', { luz: [6, 7] }],
      ['No traduzcas por partes: mira el contexto.', {}],
    ], 'La partícula manda: after cuida, for busca, down rechaza.'),
    xpHaz('hoja', '«I can\'t find my keys. I\'m looking ___ them.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['for'], ['after'], ['down']], pista: 'No las encuentra: las está buscando.' }, '«Looking for» es buscar.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«She was offered a job in Paris, but she turned it down because of her mother.» Subraya lo que pasó.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['She went to Paris.'], ['She didn\'t take the job.'], ['Her mother got the job.']], pista: '«Turn down» es rechazar.' }, 'Rechazó el empleo por su mamá.')],
], 'Antes y después, la compañía y la partícula.');

xpLec('icf-en-vocabulario-2', [
  ['Familias',
    xpMira('hoja', 'Empecemos por la idea: el **final** dice qué clase de palabra es.', { paras: [['help', 'helpful', 'helpfully'], ['danger', 'dangerous', 'dangerously'], ['act', 'action', 'active']] }, [
      ['«-ful» forma adjetivos: helpful, útil.', { luz: [1], nota: { 0: 'cómo es' } }],
      ['«-ly» forma adverbios: cómo se hace.', { luz: [2, 5] }],
      ['«-ous» también forma adjetivos.', { luz: [4] }],
      ['«-tion» o «-ion» forma sustantivos.', { luz: [7], nota: { 2: 'la cosa' } }],
      ['Después de «very» va adjetivo o adverbio.', { luz: [1, 4] }],
    ], '-ful y -ous: cómo es. -ly: cómo se hace. -tion: la cosa.'),
    xpHaz('hoja', '«He drives very ___.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['careful'], ['care'], ['carefully']], pista: 'Dice cómo maneja: un adverbio.' }, '«Carefully» dice cómo.')],
  ['Prefijos y -ed o -ing',
    xpMira('hoja', 'Segunda idea: «un-» y «dis-» dicen **lo contrario**; -ed siente, -ing causa.', { paras: [['happy', 'unhappy'], ['agree', 'disagree'], ['I am bored.'], ['The film is boring.']] }, [
      ['«Un-» le da la vuelta a happy.', { luz: [0, 1] }],
      ['«Dis-» le da la vuelta a agree.', { luz: [2, 3] }],
      ['«Bored»: así me siento.', { luz: [4], nota: { 2: 'siente' } }],
      ['«Boring»: así es la película.', { luz: [5], nota: { 3: 'causa' } }],
      ['Decir «I am boring» sería otra cosa.', { luz: [4, 5] }],
    ], 'Un- y dis-: contrario. -ed siente, -ing causa.'),
    xpHaz('hoja', '«The news was ___.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['surprised'], ['surprising'], ['surprise']], pista: 'La noticia causa la sorpresa.' }, 'Lo que causa lleva «-ing».')],
  ['Conectores',
    xpMira('hoja', 'Tercera idea: el **conector** dice qué hace la segunda idea.', { paras: [['It was late.', 'However,', 'we went out.'], ['It is cheap.', 'Moreover,', 'it is near.'], ['He was ill.', 'Therefore,', 'he stayed at home.']] }, [
      ['«However» contrasta: no se esperaba.', { luz: [1, 2], nota: { 0: 'contraste' } }],
      ['«Moreover» agrega algo del mismo lado.', { luz: [4, 5], nota: { 1: 'suma' } }],
      ['«Therefore» da el resultado.', { luz: [7, 8], nota: { 2: 'resultado' } }],
      ['«Although» también contrasta, pero une en una oración.', {}],
      ['Pregunta: ¿se opone, se suma o resulta?', {}],
    ], 'However contrasta, moreover suma, therefore resulta.'),
    xpHaz('hoja', '«The room was small. ___, it was very comfortable.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['However'], ['Therefore'], ['Moreover']], pista: 'Pequeño parece malo y cómodo, bueno.' }, 'Se oponen: «however».')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Although it was ___, the soup was delicious.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['tasty'], ['taste'], ['cold']], pista: '«Although» pide algo que se oponga a «delicious».' }, 'Fría, y aun así deliciosa.')],
], 'El final, el prefijo y el conector te dicen qué va.');
;
//#archivo js/explora-icf-en-6-pasos.js
// Preicfes · Inglés, mundo 6 «Palabras en Contexto», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación empieza
// desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen (un texto con huecos de vocabulario, A–D).
{
  xpAmplia('icf-en-vocabulario-1', {
    conecta: 'icf-en-corto-2',
    desde: [
      ['Desde cero: una palabra, dos sentidos',
        xpMira('hoja', 'Antes de todo: el **contexto** son las palabras de alrededor, y ellas escogen el sentido.', { paras: [['I drink a', 'glass', 'of milk every morning.'], ['The window is made of', 'glass.']] }, [
          ['En la lección de textos cortos viste que el contexto explica una palabra.', {}],
          ['El contexto son las palabras que rodean el hueco o la palabra rara.', {}],
          ['Aquí «glass» es un vaso: en él se toma leche.', { luz: [1], nota: { 0: 'vaso' } }],
          ['Aquí «glass» es vidrio: de eso está hecha la ventana.', { luz: [4], nota: { 1: 'vidrio' } }],
          ['La misma palabra cambia de sentido según lo que la rodea.', { luz: [1, 4] }],
        ], 'El contexto escoge el sentido: la misma palabra puede decir dos cosas.'),
        xpHaz('hoja', '«Turn on the light, please. It\'s very dark in here.» Subraya lo que significa «light».', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['liviano'], ['luz'], ['claro de color']], pista: '¿Qué se prende cuando está oscuro?' }, '«Turn on the light»: prender la luz.')],
    ],
    despues: [
      ['Más difícil: las palabras que se disfrazan',
        xpMira('hoja', 'Un paso más: algunas palabras **se parecen** al español y significan otra cosa.', { paras: [['library', 'biblioteca, no librería'], ['actually', 'en realidad, no actualmente'], ['carpet', 'alfombra, no carpeta'], ['embarrassed', 'con vergüenza, no embarazada']] }, [
          ['Algunas palabras se parecen al español y significan otra cosa.', {}],
          ['«Library» es biblioteca: allí los libros se prestan.', { luz: [0, 1] }],
          ['«Actually» es en realidad, no actualmente.', { luz: [2, 3] }],
          ['«Carpet» es alfombra, no la carpeta del colegio.', { luz: [4, 5] }],
          ['«Embarrassed» es con vergüenza: un clásico para confundir.', { luz: [6, 7] }],
          ['Si el sentido no encaja, desconfía del parecido.', {}],
        ], 'Library, actually, carpet, embarrassed: se parecen, pero dicen otra cosa.'),
        xpHaz('hoja', '«I forgot his name. I was so embarrassed!» Subraya cómo se sintió.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Con vergüenza'], ['Embarazada'], ['Muy feliz']], pista: 'Olvidar el nombre de alguien da… ¿qué sientes?' }, 'Olvidar un nombre da vergüenza: embarrassed.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen el texto tiene huecos y escoges la palabra que **encaja** en sentido y en pareja.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['We missed the bus, so we ___ a taxi.'], ['took'], ['made'], ['missed'], ['said']] }, [
        ['Un hueco y cuatro verbos: hay que escoger el que encaja.', { luz: [0] }],
        ['«Missed» repite el verbo de antes: copiar no es responder.', { luz: [3], nota: { 3: 'repite' } }],
        ['«Made» y «said» son verbos, pero no se dice «make a taxi».', { luz: [2, 4], nota: { 2: 'no encaja', 4: 'no encaja' } }],
        ['«Take a taxi» es la pareja natural: tomar un taxi.', { luz: [1], nota: { 1: 'sirve' } }],
        ['Prueba cada opción en voz baja dentro de la oración.', {}],
      ], 'Gana la palabra que encaja en sentido y en su pareja natural.'),
      xpHaz('hoja', '«It\'s cold in here. Please ___ the window.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['close'], ['open'], ['cold'], ['look']], pista: 'Hace frío: ¿qué haces con la ventana?' }, 'Con frío se cierra la ventana: close.')],
    cierre: 'Contexto, falsos amigos, parejas de palabras y partículas: así se escoge la palabra.',
  });

  xpAmplia('icf-en-vocabulario-2', {
    conecta: 'icf-en-gramatica-2',
    desde: [
      ['Desde cero: las cuatro clases de palabras',
        xpMira('hoja', 'Antes de las familias de palabras, conoce las **cuatro clases** que más se usan.', { paras: [['noun', 'una cosa: music'], ['verb', 'una acción: play'], ['adjective', 'cómo es: loud'], ['adverb', 'cómo se hace: loudly']] }, [
          ['En la lección de palabras pequeñas viste que «so» y «because» unen ideas.', {}],
          ['Un sustantivo nombra una cosa: music, la música.', { luz: [0, 1] }],
          ['Un verbo es una acción: play, tocar.', { luz: [2, 3] }],
          ['Un adjetivo dice cómo es algo: loud, ruidosa.', { luz: [4, 5] }],
          ['Un adverbio dice cómo se hace: loudly, con mucho ruido.', { luz: [6, 7] }],
        ], 'Sustantivo cosa, verbo acción, adjetivo cómo es, adverbio cómo se hace.'),
        xpHaz('hoja', '«She sings beautifully.» Subraya la palabra que dice **cómo** canta.', { modo: 'toca', meta: [2], paras: [['She', 'sings', 'beautifully.']], pista: 'Busca la que termina en -ly.' }, '«Beautifully» es un adverbio: dice cómo canta.')],
    ],
    despues: [
      ['Más difícil: el conector que suena bien y no cuadra',
        xpMira('hoja', 'Un paso más: un conector equivocado **suena bien**, pero cambia la lógica.', { paras: [['I studied a lot.', 'However,', 'I passed.'], ['I studied a lot.', 'Therefore,', 'I passed.'], ['I didn\'t study.', 'However,', 'I passed.']] }, [
          ['Las tres oraciones se parecen; solo cambia el conector o el dato.', {}],
          ['Estudiar mucho y pasar no sorprende: «however» no cuadra.', { luz: [1], nota: { 0: 'no cuadra' } }],
          ['Aquí sí: estudió, por eso pasó. «Therefore».', { luz: [4], nota: { 1: 'resultado' } }],
          ['No estudió y pasó: eso sí sorprende. «However».', { luz: [7], nota: { 2: 'sorpresa' } }],
          ['Pregunta siempre: ¿lo segundo se esperaba o no?', {}],
        ], 'Si lo segundo se esperaba, therefore; si sorprende, however.'),
        xpHaz('hoja', '«The bus was late. ___, we missed the start of the film.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['However'], ['Therefore'], ['Although']], pista: '¿Perderse el comienzo es una sorpresa o un resultado?' }, 'Perderse el comienzo es el resultado: therefore.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen las opciones son de la **misma familia**: decide la clase y luego el sentido.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['The guide was very ___ and smiled at everybody.'], ['friend'], ['friendly'], ['friendship'], ['unfriendly']] }, [
        ['Cuatro palabras de la misma familia: hay que escoger la clase correcta.', { luz: [0] }],
        ['Después de «very» va un adjetivo: «friend» y «friendship» son cosas.', { luz: [1, 3], nota: { 1: 'cosa', 3: 'cosa' } }],
        ['«Unfriendly» es adjetivo, pero dice lo contrario de sonreír.', { luz: [4], nota: { 4: 'al revés' } }],
        ['«Friendly», amable, encaja en clase y en sentido.', { luz: [2], nota: { 2: 'sirve' } }],
        ['Primero la clase de palabra; después, el sentido.', {}],
      ], 'Mira qué clase pide el hueco y luego el sentido de la oración.'),
      xpHaz('hoja', '«The test was easy. Everybody finished it ___.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['easy'], ['easily'], ['ease'], ['uneasy']], pista: 'Dice cómo lo terminaron: hace falta un adverbio.' }, '«Easily» dice cómo: sin problema.')],
    cierre: 'Clase de palabra, prefijo, final y conector: cada pista dice qué va en el hueco.',
  });
}
;
//#archivo js/explora-icf-en-7.js
// Preicfes · Inglés, mundo 7 «Inferir y Opinar» (Explora, escena «hoja»): se explica en español con ejemplos en inglés propios.
xpLec('icf-en-inferencia-1', [
  ['Unir dos datos',
    xpMira('hoja', 'Empecemos por la idea: **inferir** es unir dos datos del texto.', { letras: ['1', '2', 'idea', 'no'], paras: [['Her umbrella is wet.'], ['She is taking off her coat.'], ['It is raining outside.'], ['She is late for work.']] }, [
      ['Primer dato: la sombrilla está mojada.', { luz: [0] }],
      ['Segundo: se quita el abrigo, acaba de llegar.', { luz: [1] }],
      ['Juntos dicen que afuera llueve.', { luz: [0, 1, 2], nota: { 2: 'se deduce' } }],
      ['Esto no tiene ningún dato.', { luz: [3], tacha: [3] }],
      ['Si no puedes señalar el dato, es imaginación.', {}],
    ], 'Dos datos señalados, una idea.'),
    xpHaz('hoja', '«Tom\'s plate is empty and he is asking for more.» Subraya lo que se deduce.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['He cooked it.'], ['He is ill.'], ['He liked the food.']], pista: '¿Por qué pediría más?' }, 'Plato vacío y pedir más: le gustó.')],
  ['Los gestos',
    xpMira('hoja', 'Segunda idea: lo que alguien **hace** dice lo que siente.', { paras: [['She read the letter three times.'], ['He looked at the floor.'], ['They closed the door quietly.']] }, [
      ['Leerla tres veces: le importa mucho.', { luz: [0], nota: { 0: 'it matters' } }],
      ['Mirar al piso: siente pena o culpa.', { luz: [1], nota: { 1: 'ashamed' } }],
      ['Cerrar sin ruido: no quieren molestar.', { luz: [2], nota: { 2: 'careful' } }],
      ['Nadie escribió la emoción.', {}],
      ['Pregúntate por qué harías tú ese gesto.', { luz: [0, 1, 2] }],
    ], 'Gesto, razón, emoción.'),
    xpHaz('hoja', '«He kept looking at his watch.» Subraya lo que muestra.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['He loves his watch.'], ['He is impatient.'], ['He is asleep.']], pista: '¿Por qué alguien mira la hora muchas veces?' }, 'Mirar la hora muestra impaciencia.')],
  ['Must, might, can\'t',
    xpMira('hoja', 'Tercera idea: **must** es casi seguro, **might** es quizá, **can\'t** es imposible.', { paras: [['The lights are off and the car isn\'t there.'], ['They must be out.'], ['They might be at the cinema.'], ['They can\'t be at home.']] }, [
      ['Los datos: sin luz y sin carro.', { luz: [0] }],
      ['«Must be out»: casi seguro que salieron.', { luz: [1], nota: { 1: 'casi seguro' } }],
      ['«Might be at the cinema»: puede ser, no se sabe.', { luz: [2], nota: { 2: 'quizá' } }],
      ['«Can\'t be at home»: no puede ser.', { luz: [3], nota: { 3: 'imposible' } }],
      ['Escoge según la fuerza de la pista.', {}],
    ], 'Must: casi seguro. Might: quizá. Can\'t: imposible.'),
    xpHaz('hoja', '«He is eating a huge lunch. He ___ be hungry.» Subraya lo que completa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['must'], ['can\'t'], ['mustn\'t']], pista: 'La pista es fuerte: se come un almuerzo enorme.' }, 'Casi seguro: «must».')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«Nina put the photo back in the drawer before her brother came in.» Subraya lo que se deduce.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Her brother took the photo.'], ['She didn\'t want him to see it.'], ['The drawer was broken.']], pista: '¿Por qué la guardó antes de que entrara?' }, 'La guarda a tiempo: no quería que la viera.')],
], 'Señala los datos, mira los gestos y mide la fuerza.');

xpLec('icf-en-inferencia-2', [
  ['Fact or opinion',
    xpMira('hoja', 'Empecemos por la idea: un **hecho** se comprueba; una **opinión** se discute.', { paras: [['The park has 300 trees.'], ['The park should be bigger.'], ['In my opinion, it is dirty.'], ['It opens at six.']] }, [
      ['Los árboles se cuentan.', { luz: [0], nota: { 0: 'fact' } }],
      ['«Should» dice lo que alguien cree mejor.', { luz: [1], nota: { 1: 'opinion' } }],
      ['«In my opinion» lo anuncia.', { luz: [2], nota: { 2: 'opinion' } }],
      ['La hora se comprueba.', { luz: [3], nota: { 3: 'fact' } }],
      ['Busca should, I think, best, terrible.', {}],
    ], 'Contar o comprobar: fact. Should, I think: opinion.'),
    xpHaz('hoja', 'Subraya el **hecho**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['The bridge is 90 metres long.'], ['The bridge is ugly.'], ['They should paint it.']], pista: '¿Cuál se puede medir?' }, 'La longitud se mide.')],
  ['Opinion + reason',
    xpMira('hoja', 'Segunda idea: una opinión vale más con **razones**.', { letras: ['opinion', 'a', 'b', 'c'], paras: [['The library should open on Sundays.'], ['Many people only have free time then.'], ['The door is blue.'], ['In the next town, it is full on Sundays.']] }, [
      ['Esto es lo que opina.', { luz: [0] }],
      ['Esto responde por qué.', { luz: [1], nota: { 1: 'reason' } }],
      ['Esto no responde nada.', { luz: [2], tacha: [2] }],
      ['Esto es un hecho que la apoya.', { luz: [3], nota: { 3: 'evidence' } }],
      ['Únelas con «because»: si suena, sirve.', { luz: [0, 1] }],
    ], 'Opinion + because + reason.'),
    xpHaz('hoja', 'Opinion: «We shouldn\'t use plastic bags». Subraya la **razón**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['They are white.'], ['I have two bags.'], ['They stay in the sea for years.']], pista: 'Une con «because».' }, 'Solo esa responde por qué.')],
  ['Agree, disagree, change',
    xpMira('hoja', 'Tercera idea: alguien puede **aceptar** una parte y **cambiar** de idea.', { paras: [['You are right about the noise.'], ['But I don\'t agree with closing the bar.'], ['After the meeting, I changed my mind.']] }, [
      ['«You are right»: acepta una parte.', { luz: [0], nota: { 0: 'agrees' } }],
      ['«But I don\'t agree»: rechaza otra.', { luz: [1], nota: { 1: 'disagrees' } }],
      ['«Changed my mind»: ya piensa distinto.', { luz: [2], nota: { 2: 'change' } }],
      ['Aceptar algo no es aceptar todo.', { luz: [0, 1] }],
      ['Mira qué viene después de «but».', { luz: [1] }],
    ], 'You are right… but… changed my mind.'),
    xpHaz('hoja', '«I see your point, but I still think we need the road.» Subraya lo que piensa.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['He doesn\'t want the road.'], ['He wants the road.'], ['He has no opinion.']], pista: '«Still» dice que sigue pensando lo mismo.' }, 'Entiende al otro, pero mantiene su idea.')],
  ['Ahora sí, un problema',
    xpHaz('hoja', '«The film lasts three hours. I enjoyed every minute, although my brother fell asleep.» Subraya la **opinión**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['It lasts three hours.'], ['It is enjoyable.'], ['Her brother fell asleep.']], pista: '¿En cuál podrían no estar de acuerdo?' }, 'La duración y el sueño son hechos.')],
], 'Comprueba hechos, pide razones y mira qué cambia.');
;
//#archivo js/explora-icf-en-7-pasos.js
// Preicfes · Inglés, mundo 7 «Inferir y Opinar», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada explicación empieza
// desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen (inferencia y opinión del autor, A–D).
{
  xpAmplia('icf-en-inferencia-1', {
    conecta: 'icf-en-corto-1',
    desde: [
      ['Desde cero: qué es inferir',
        xpMira('hoja', 'Antes de todo: **inferir** es descubrir lo que el texto no dice, usando lo que sí dice.', { letras: ['dato', 'idea'], paras: [['Sebastián is carrying a towel and a swimsuit.'], ['He is going to swim.']] }, [
          ['En la lección de mensajes viste que se pueden unir dos datos.', {}],
          ['Inferir es descubrir algo que el texto no dice, usando lo que sí dice.', {}],
          ['Como un detective: la toalla y el vestido de baño son pistas.', { luz: [0], nota: { 0: 'pistas' } }],
          ['Nadie escribió «va a nadar», pero las pistas lo muestran.', { luz: [1], nota: { 1: 'se infiere' } }],
          ['Si una idea no tiene pistas en el texto, es inventada.', {}],
        ], 'Inferir: sacar lo que no se dice a partir de lo que sí se dice.'),
        xpHaz('hoja', '«Valentina has a backpack, a map and hiking boots.» Subraya lo que se infiere.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['She is going to a party.'], ['She is going for a long walk.'], ['She is sleeping.']], pista: 'Une las pistas: el mapa y las botas.' }, 'Mapa y botas de caminar: va de caminata.')],
    ],
    despues: [
      ['Más difícil: la inferencia que se pasa',
        xpMira('hoja', 'Un paso más: una buena inferencia **no va más allá** de las pistas.', { letras: ['texto', 'a', 'b', 'c'], paras: [['Pablo bought flowers and a cake on Sunday.'], ['Pablo bought something sweet.'], ['It was his mum\'s birthday.'], ['Pablo always buys flowers.']] }, [
          ['Una inferencia buena no va más allá de las pistas.', { luz: [0] }],
          ['«Something sweet» sale seguro: un pastel es dulce.', { luz: [1], nota: { 1: 'segura' } }],
          ['El cumpleaños de la mamá puede ser, pero nada lo dice.', { luz: [2], nota: { 2: 'quizá' } }],
          ['«Always» exagera: un domingo no es siempre.', { luz: [3], nota: { 3: 'exagera' } }],
          ['Desconfía de always, never, everybody y nobody.', {}],
        ], 'La inferencia correcta es la más segura; los absolutos exageran.'),
        xpHaz('hoja', '«Andrés smiled when he read his test result.» Subraya lo **más seguro**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['He got the best grade in the world.'], ['He was happy with his result.'], ['He never fails.']], pista: 'Una exagera y otra usa «never».' }, 'Sonreír al leerlo: quedó contento, nada más.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen preguntan **qué se puede inferir**: la buena usa todas las pistas.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['When Marta got home, the TV was on, there were two cups on the table and the dog was quiet.'], ['Marta\'s house was empty.'], ['Somebody the dog knows was at home.'], ['A thief came in.'], ['Marta drank two cups of coffee.']] }, [
        ['Pregunta típica: ¿qué se puede inferir? Las pistas están en el texto.', { luz: [0] }],
        ['La A choca con los datos: la tele encendida y dos tazas.', { luz: [1], nota: { 1: 'contradice' } }],
        ['La C asusta, pero el perro tranquilo no apoya un ladrón.', { luz: [3], nota: { 3: 'sin pistas' } }],
        ['La D usa las tazas, pero Marta apenas acaba de llegar.', { luz: [4], nota: { 4: 'trampa' } }],
        ['La B une las tres pistas: alguien conocido estaba en casa.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'La inferencia buena usa todas las pistas y no choca con ninguna.'),
      xpHaz('hoja', '«The fridge was empty. Dad wrote a list, took the car keys and two big bags.» Subraya lo que se infiere.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['Dad is going to buy food.'], ['Dad is cleaning the fridge.'], ['Dad sold the car.'], ['The family never eats.']], pista: 'Une la nevera vacía, la lista y las bolsas.' }, 'Va a mercar: nevera vacía, lista y bolsas.')],
    cierre: 'Pistas señaladas, inferencias seguras y nada de absolutos: así se lee entre líneas.',
  });

  xpAmplia('icf-en-inferencia-2', {
    conecta: 'icf-en-largo-2',
    desde: [
      ['Desde cero: qué es opinar',
        xpMira('hoja', 'Antes de todo: **opinar** es decir lo que uno piensa, aunque otro piense distinto.', { paras: [['fact', 'Bogotá is about 2 600 metres high.'], ['opinion', 'Bogotá is the best city to live in.']] }, [
          ['En la lección del autor y el lector viste que un hecho se comprueba.', {}],
          ['Opinar es decir lo que uno piensa, aunque otro piense distinto.', {}],
          ['La altura de Bogotá se mide: es un hecho, «fact».', { luz: [0, 1], nota: { 0: 'se mide' } }],
          ['«The best city» depende de cada persona: es una opinión.', { luz: [2, 3], nota: { 1: 'se discute' } }],
          ['Una opinión no es mentira: es una mirada personal.', {}],
        ], 'Fact se comprueba; opinion es una mirada que se puede discutir.'),
        xpHaz('hoja', 'Subraya la **opinión**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Medellín has a metro.'], ['Medellín is the most beautiful city.'], ['Medellín is in Antioquia.']], pista: '¿Cuál podría discutir alguien de otra ciudad?' }, '«The most beautiful» depende de quien mira.')],
    ],
    despues: [
      ['Más difícil: de quién es la opinión',
        xpMira('hoja', 'Un paso más: en un texto puede haber **varias voces**: la del autor y la de otros.', { paras: [['Some parents say that video games are a waste of time.'], ['However, I believe they can teach teamwork.']] }, [
          ['En un texto puede haber dos opiniones: la del autor y la de otros.', {}],
          ['«Some parents say» es la opinión de unos padres, no del autor.', { luz: [0], nota: { 0: 'otros' } }],
          ['«However, I believe» trae la del autor.', { luz: [1], nota: { 1: 'autor' } }],
          ['La trampa: atribuirle al autor lo que dijeron otros.', { luz: [0] }],
          ['Busca «I think», «I believe» o «in my view»: ahí habla el autor.', {}],
        ], 'Say o claim: otros. I think o I believe: el autor.'),
        xpHaz('hoja', '«Many people claim that cities are too noisy. In my view, the noise shows a city full of life.» Subraya lo que piensa el **autor**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Cities are too noisy.'], ['Noise shows a lively city.'], ['Nobody likes cities.']], pista: 'Su opinión viene después de «in my view».' }, 'Lo suyo va después de «in my view».')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En el examen preguntan qué **opina el autor**: separa su voz de la de los demás.', { letras: ['texto', 'A', 'B', 'C', 'D'], paras: [['Some people think school uniforms are boring. I agree they are not very nice. But I think they help students feel equal, so I want to keep them.'], ['Uniforms are boring and should go.'], ['Uniforms are very nice clothes.'], ['Uniforms help students feel equal.'], ['All students hate uniforms.']] }, [
        ['Pregunta: ¿qué opina el autor? Hay varias voces en el texto.', { luz: [0] }],
        ['La A es lo que piensan otros: «some people think».', { luz: [1], nota: { 1: 'otros' } }],
        ['La B dice lo contrario: él acepta que no son bonitos.', { luz: [2], nota: { 2: 'al revés' } }],
        ['La D exagera con «all»: nadie habló de todos.', { luz: [4], nota: { 4: 'exagera' } }],
        ['La C sale de «I think»: es la opinión del autor.', { luz: [3], nota: { 3: 'sirve' } }],
      ], 'Separa las voces: la opinión del autor va con I think o I believe.'),
      xpHaz('hoja', '«My friends say the new park is too small. I don\'t agree: it is small, but it is safe and clean.» Subraya lo que opina el autor.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['The park is too small to use.'], ['The park is good: it is safe and clean.'], ['All parks are dirty.'], ['The park is very big.']], pista: 'Lo de los amigos no es lo suyo; busca lo que viene después de «I don\'t agree».' }, 'Acepta que es pequeño, pero lo defiende.')],
    cierre: 'Hecho u opinión, de quién es la opinión y con qué razón la sostiene.',
  });
}
