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
