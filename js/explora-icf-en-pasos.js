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
