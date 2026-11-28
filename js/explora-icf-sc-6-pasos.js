// Preicfes · Sociales y Ciudadanas, mundo 6 «Historia de Colombia», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  const T = (x, y, s, c, tam = 10, peso = 600) => `<text x="${x}" y="${y}" fill="${c}" font-size="${tam}" font-weight="${peso}" style="text-anchor:middle;font-family:Jost,system-ui,sans-serif">${s}</text>`;
  // Línea de tiempo sobre una tira de papel: [x, año, rótulo]; se encienden las k primeras marcas.
  const linea = (pts, k = 0) => `<rect x="12" y="140" width="316" height="52" rx="6" fill="#efe2c2" stroke="#9c7b45"/><line x1="24" y1="160" x2="316" y2="160" stroke="#6b4f22" stroke-width="2"/>` +
    pts.map(([x, a, b], i) => { const on = i < k; return `<circle cx="${x}" cy="160" r="${on ? 6 : 4}" fill="${on ? '#a3242a' : '#b9a27a'}"/>` + T(x, 152, a, on ? '#3b2a12' : '#8c7650', 10) + T(x, 182, b, on ? '#3b2a12' : '#8c7650', 10, on ? 600 : 500); }).join('');
  // El acta de 1810 y la línea de tiempo de la independencia.
  const acta = v => X.foto((v.doc ? X.documento(14, 10, 160, 112, ['Santafé, julio de 1810', 'Se forma una junta', 'de gobierno.'], { titulo: 'Acta', sello: 'J' }) : '') +
    linea([[44, 'h. 1550', 'Colonia'], [140, '1810', 'Junta'], [222, '1819', 'Boyacá'], [298, '1851', 'Abolición']], v.t || 0) +
    (v.r ? X.rot(258, 62, v.r, 'oscuro') : ''), 200, 'papel');
  // Dos constituciones del siglo XIX, una federal y otra central.
  const cartas = v => X.foto((v.docs ? X.documento(14, 12, 146, 104, ['Nueve estados', 'soberanos'], { titulo: 'Rionegro', fecha: '1863' }) +
    X.documento(180, 12, 146, 104, ['Un poder central', 'en Bogotá'], { titulo: 'Constitución', fecha: '1886' }) : '') +
    linea([[44, '1819', 'Boyacá'], [126, '1863', 'Rionegro'], [212, '1886', 'Regeneración'], [298, '1899', 'Mil Días']], v.t || 0) +
    (v.r ? X.rot(170, 128, v.r, 'oscuro') : ''), 200, 'papel');
  // Una fábrica de comienzos del siglo XX con obreros en huelga y el periódico del día.
  const huelga = v => X.foto((v.fab ? X.edificio(262, 166, 120, 'fabrica') : '') + (v.per ? X.periodico(12, 12, 124, 92, 'Huelga', { nombre: 'EL OBRERO' }) : '') +
    (v.gente ? X.persona(120, 182, 0.8, '#5a5a5a') + X.persona(156, 184, 0.84, '#6b4423', v.cartel ? { cartel: v.cartel } : {}) + X.persona(196, 182, 0.8, '#3f4f6b') : '') +
    (v.r ? X.rot(170, 200, v.r, 'oscuro') : ''), 210, 'ciudad');

  xpAmplia('icf-sc-historia-1', {
    conecta: 'icf-sc-sistemico-1',
    desde: [
      ['Desde cero: colonia, criollos e independencia',
        xpMira('dibujo', 'Desde el principio: tres palabras para entender cómo Colombia dejó de depender de España.', { dib: acta, v: { doc: 1 }, alto: 200 }, [
          ['En la lección de causas viste la diferencia entre detonante y causa de fondo.', { doc: 1 }],
          ['Colonia: casi tres siglos en que España gobernó estas tierras desde lejos.', { doc: 1, t: 1 }],
          ['Criollos: hijos de españoles nacidos aquí; con riqueza, pero sin los cargos altos.', { doc: 1, t: 1, r: 'criollos' }],
          ['El 20 de julio de 1810 se firmó en Santafé el acta de una junta de gobierno.', { doc: 1, t: 2 }],
          ['La batalla de Boyacá, el 7 de agosto de 1819, aseguró la independencia.', { doc: 1, t: 3 }],
        ], 'Colonia: España gobernaba desde lejos. Criollos: ricos sin poder. 1810 abrió el camino y 1819 lo aseguró.'),
        xpHaz('hoja', 'Subraya quién era un **criollo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Un hijo de españoles nacido en Popayán.'], ['Un funcionario nacido en Sevilla y enviado a Santafé.'], ['Un pueblo indígena del altiplano.']], pista: 'Criollo: de familia española, pero nacido de este lado del mar.' }, 'Hijo de españoles nacido en América: criollo.')],
    ],
    despues: [
      ['Más difícil: razones de afuera y de adentro',
        xpMira('hoja', 'Un paso más: la independencia no tuvo **una** causa. Se juntaron ideas de afuera y malestar de adentro.', { paras: [['Las ideas de la Ilustración llegaban en libros prohibidos.'], ['Antonio Nariño imprimió los Derechos del Hombre y fue encarcelado.'], ['Los criollos estaban cansados de no llegar a los cargos altos.'], ['Las reformas de la Corona subieron impuestos y controles.']] }, [
          ['Ideas de afuera: libertad e igualdad, que circulaban en secreto.', { luz: [0], nota: { 0: 'ideas' } }],
          ['Nariño las imprimió y lo encarcelaron: esas ideas daban miedo.', { luz: [1], nota: { 1: 'ideas' } }],
          ['Razón de adentro: el malestar criollo por el poder que no tenían.', { luz: [2], nota: { 2: 'fondo' } }],
          ['Más impuestos y controles desde España aumentaron ese malestar.', { luz: [3], nota: { 3: 'fondo' } }],
          ['Trampa: explicar la independencia con una sola causa. Se juntaron varias.', {}],
        ], 'La independencia juntó ideas de afuera y malestar de adentro, que un detonante hizo estallar.'),
        xpHaz('hoja', 'Subraya una causa **de fondo** de la independencia, no un detonante.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un pleito por un florero un día de mercado.'], ['El malestar de los criollos por no llegar a los cargos altos.'], ['La llegada de un visitante español ese mismo día.']], pista: 'La causa de fondo venía de años atrás; el detonante pasa en un día.' }, 'El malestar criollo venía de mucho antes.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: una **fuente de la época** y la pregunta «¿qué muestra?». Cuidado con leerla con ojos de hoy.', { letras: ['A', 'B', 'C', 'D'], paras: [['Que protestaban contra impuestos y funcionarios, sin rechazar todavía al rey.'], ['Que ya querían la independencia total de España.'], ['Que el rey había quitado los impuestos.'], ['Que en la Nueva Granada todos estaban de acuerdo.']] }, [
          ['La fuente: en 1781 unos rebeldes contra nuevos impuestos gritaban «Viva el rey y muera el mal gobierno».', {}],
          ['Esta es un anacronismo: la independencia llegó casi treinta años después.', { luz: [1], nota: { 1: 'anacronismo' } }],
          ['Esta invierte lo que pasaba: protestaban porque subían los impuestos.', { luz: [2], nota: { 2: 'invertida' } }],
          ['Esta generaliza: una protesta muestra desacuerdo, no unanimidad.', { luz: [3], nota: { 3: 'generaliza' } }],
          ['«Viva el rey» y «muera el mal gobierno»: contra los funcionarios, no contra el rey.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Lee la fuente con los ojos de su época: no le pongas ideas que llegaron después.'),
      xpHaz('hoja', 'Una carta de 1812 se queja de que la guerra entre los mismos patriotas arruina el comercio. Subraya el **contexto**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['La Guerra de los Mil Días.'], ['La llegada de Colón.'], ['La Patria Boba, cuando centralistas y federalistas se enfrentaron.'], ['El Frente Nacional.']], pista: 'Mira el año de la carta y busca qué pasaba entre la junta de 1810 y la reconquista española.' }, 'Entre 1810 y 1816 los patriotas pelearon entre sí.')],
    cierre: 'Mira el orden colonial, las causas de afuera y de adentro, la resistencia y lo que cambió y siguió.',
  });

  xpAmplia('icf-sc-historia-2', {
    conecta: 'icf-sc-historia-1',
    desde: [
      ['Desde cero: un país por armar',
        xpMira('dibujo', 'Desde el principio: ganar la independencia era el comienzo. Después había que **armar** el país.', { dib: cartas, v: {}, alto: 200 }, [
          ['En la lección anterior viste cómo se logró la independencia, entre 1810 y 1819.', { t: 1 }],
          ['Después tocaba decidir: ¿quién manda, cómo y desde dónde?', { t: 1, r: '¿quién manda?' }],
          ['Por eso hubo varias constituciones: cada una respondía distinto.', { t: 3, docs: 1, r: '' }],
          ['Centralismo: decide la capital. Federalismo: cada región decide mucho.', { t: 3, docs: 1, r: 'centro o regiones' }],
          ['Como una familia que discute si las reglas las pone la mamá o cada hijo en su cuarto.', { t: 3, docs: 1 }],
        ], 'Tras la independencia hubo que armar el país: centralismo o federalismo, en varias constituciones.'),
        xpHaz('hoja', 'Subraya una idea **federalista**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Cada región hace sus propias leyes de educación.'], ['Todo se decide en la capital.'], ['El presidente nombra a todos los gobernadores.']], pista: 'Federalismo: el poder se reparte entre las regiones.' }, 'Que cada región haga sus leyes es federalismo.')],
    ],
    despues: [
      ['Más difícil: guerras civiles y un país que se parte',
        xpMira('hoja', 'Un paso más: las ideas distintas no se discutieron solo con votos. El siglo XIX terminó en **guerra**.', { paras: [['En el siglo XIX hubo varias guerras civiles entre los partidos.'], ['La más larga, la de los Mil Días, fue de 1899 a 1902.'], ['Dejó un país débil y endeudado.'], ['En 1903 Panamá se separó, con apoyo de Estados Unidos.']] }, [
          ['Las diferencias entre partidos terminaron varias veces en guerras.', { luz: [0] }],
          ['La de los Mil Días cerró el siglo con miles de muertos.', { luz: [1], nota: { 1: '1899 a 1902' } }],
          ['Después, el país quedó pobre y dividido.', { luz: [2], nota: { 2: 'consecuencia' } }],
          ['Debilitado, no pudo impedir que Panamá se separara.', { luz: [3], nota: { 3: '1903' } }],
          ['Trampa: dar una sola causa. El interés de Estados Unidos pesó, y también la guerra interna.', {}],
        ], 'Las guerras civiles debilitaron al país; Panamá se separó en 1903 en ese contexto.'),
        xpHaz('hoja', 'Subraya la lectura **más completa** de la separación de Panamá.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Fue solo culpa de Estados Unidos.'], ['Pesaron el interés de Estados Unidos en el canal y un país debilitado por la guerra.'], ['Panamá se separó porque no le gustaba el café.']], pista: 'La más completa junta lo de afuera con lo de adentro.' }, 'Interés de afuera y debilidad de adentro.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: una **fuente con fecha** y la pregunta «¿con qué proceso se relaciona?».', { letras: ['A', 'B', 'C', 'D'], paras: [['Con la Regeneración, que centralizó el poder y se alió con la Iglesia.'], ['Con el Olimpo Radical, que separó la Iglesia del Estado.'], ['Con la junta de gobierno de 1810.'], ['Con la Constitución de 1991.']] }, [
          ['La fuente: un acuerdo de 1887 le da a la Iglesia católica un papel central en la educación.', {}],
          ['Esta invierte la posición: los radicales querían alejar a la Iglesia.', { luz: [1], nota: { 1: 'invertida' } }],
          ['Esta queda casi ochenta años antes: anacronismo.', { luz: [2], nota: { 2: 'otra época' } }],
          ['Esta queda un siglo después, con otra Constitución.', { luz: [3], nota: { 3: 'otra época' } }],
          ['1887, poder central e Iglesia en la educación: la Regeneración.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Ubica la fecha y la idea de la fuente; descarta épocas equivocadas y posiciones invertidas.'),
      xpHaz('hoja', 'En 1863 una constitución crea nueve estados con mucho poder propio. Subraya lo **correcto**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Era centralista, porque todo se decidía en Bogotá.'], ['Era federalista, porque las regiones tenían mucho poder.'], ['Era de la Regeneración, que dio la Constitución de 1886.'], ['Fue la que abolió la esclavitud, en 1851.']], pista: 'Nueve estados con poder propio: ¿centro o regiones? Revisa también las fechas.' }, 'Rionegro repartió el poder entre los estados.')],
    cierre: 'Centro o regiones, Iglesia y voto: dos partidos, varias constituciones, guerras y un péndulo.',
  });

  xpAmplia('icf-sc-historia-3', {
    conecta: 'icf-sc-historia-2',
    desde: [
      ['Desde cero: palabras del siglo XX',
        xpMira('dibujo', 'Desde el principio: el siglo XX trae palabras nuevas. Conocerlas evita confundir épocas y actores.', { dib: huelga, v: { per: 1 }, alto: 210 }, [
          ['En la lección del siglo XIX viste las guerras entre los dos partidos.', { per: 1 }],
          ['En el siglo XX llegaron fábricas, obreros y peleas por el salario.', { per: 1, fab: 1, gente: 1 }],
          ['Una huelga es parar el trabajo, todos juntos, para exigir algo.', { per: 1, fab: 1, gente: 1, cartel: '8 horas' }],
          ['La Violencia, con mayúscula, fue la ola de muertes entre liberales y conservadores a mitad de siglo.', { per: 1, fab: 1, gente: 1, cartel: '8 horas', r: 'la Violencia' }],
          ['Después nacieron guerrillas y paramilitares: grupos armados por fuera de la ley.', { per: 1, fab: 1, gente: 1, cartel: '8 horas', r: 'grupos armados' }],
        ], 'Siglo XX: obreros y huelgas, la Violencia entre partidos y luego guerrillas y paramilitares.'),
        xpHaz('hoja', 'Subraya qué es una **huelga**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Los trabajadores dejan de trabajar juntos para exigir algo.'], ['Un día de fiesta nacional.'], ['Una guerra entre dos países.']], pista: 'Piensa en el cartel de los obreros: ¿qué hacen para que los oigan?' }, 'Parar juntos para exigir: huelga.')],
    ],
    despues: [
      ['Más difícil: lo que origina y lo que alimenta',
        xpMira('hoja', 'Un paso más: separa lo que **originó** el conflicto de lo que lo **alimentó** y lo alargó.', { paras: [['Muchos campesinos no tenían tierra propia.'], ['Las guerrillas crecieron donde el Estado casi no llegaba.'], ['El narcotráfico dio dinero a guerrillas y paramilitares.'], ['Millones de personas fueron desplazadas de sus tierras.']] }, [
          ['La tierra mal repartida fue una causa de fondo.', { luz: [0], nota: { 0: 'fondo' } }],
          ['Donde el Estado no llegaba, los grupos armados ocuparon su lugar.', { luz: [1], nota: { 1: 'ausencia' } }],
          ['El narcotráfico fue combustible: alargó y empeoró la guerra.', { luz: [2], nota: { 2: 'combustible' } }],
          ['Y la tierra volvió a aparecer como consecuencia: el desplazamiento.', { luz: [3], nota: { 3: 'consecuencia' } }],
          ['Trampa: confundir lo que alimenta un conflicto con lo que lo originó.', {}],
        ], 'La tierra está en el fondo y en las consecuencias; el narcotráfico alimentó y alargó la guerra.'),
        xpHaz('hoja', 'Subraya lo que **alimentó** el conflicto más que originarlo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['La tierra mal repartida desde antes.'], ['La exclusión de otros partidos durante el Frente Nacional.'], ['El dinero del narcotráfico.']], pista: 'Busca lo que llegó cuando el conflicto ya existía y le dio más fuerza.' }, 'El narcotráfico llegó después y le dio dinero a la guerra.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: un **testimonio** y la pregunta «¿qué fenómeno muestra?». Lee cada palabra del relato.', { letras: ['A', 'B', 'C', 'D'], paras: [['El desplazamiento forzado, que golpeó sobre todo a civiles del campo.'], ['Una mudanza por gusto a la ciudad.'], ['Una reforma agraria que entregó tierras.'], ['Que los campesinos fueron los culpables de la guerra.']] }, [
          ['El testimonio: «Nos sacaron de la finca en una noche y llegamos a la ciudad sin nada».', {}],
          ['Esta ignora «nos sacaron»: no fue por gusto.', { luz: [1], nota: { 1: 'ignora' } }],
          ['Esta invierte lo que pasó: perdieron la tierra, no la recibieron.', { luz: [2], nota: { 2: 'invertida' } }],
          ['Esta culpa a las víctimas: prejuicio sin ningún dato.', { luz: [3], nota: { 3: 'prejuicio' } }],
          ['Salir a la fuerza y sin nada: desplazamiento forzado.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'En un testimonio, las palabras exactas («nos sacaron») deciden la respuesta.'),
      xpHaz('hoja', 'Un informe muestra que la mayoría de las víctimas del conflicto fueron civiles. Subraya la conclusión que **se apoya** en él.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Que solo murieron combatientes.'], ['Que el conflicto golpeó sobre todo a quienes no tenían armas.'], ['Que el conflicto ya terminó por completo.'], ['Que los civiles empezaron la guerra.']], pista: 'Civil es quien no tiene armas. Busca la que dice lo mismo que el dato, sin agregar.' }, 'Civiles: los que no portaban armas.')],
    cierre: 'Varias causas y varios actores: tierra, Estado ausente, narcotráfico, víctimas civiles e intentos de paz.',
  });
}
