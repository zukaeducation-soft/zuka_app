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
