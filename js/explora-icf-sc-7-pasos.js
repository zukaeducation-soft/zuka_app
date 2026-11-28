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
