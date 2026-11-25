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
      xpMira('hoja', 'Tercera idea: si empujas algo, te **empuja** igual y al contrario.', { paras: [['El remo empuja el agua.', 'El agua empuja el bote.'], ['El pie empuja el suelo.', 'El suelo empuja el cuerpo.'], ['El gas sale hacia abajo.', 'El cohete sube.']] }, [
        ['Empujas el agua y ella empuja el bote.', { luz: [0, 1], nota: { 0: 'par' } }],
        ['Caminar es que el suelo te empuje.', { luz: [2, 3], nota: { 1: 'par' } }],
        ['El cohete sube porque el gas baja.', { luz: [4, 5], nota: { 2: 'par' } }],
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
