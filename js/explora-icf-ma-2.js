// Preicfes · Matemáticas, mundo 2 «Proporciones y Porcentajes» (Explora, escenas «dibujo» y «fichas»). Ejemplos propios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Dos barras de puntos: a de un color y b de otro.
  const puntos = (v, K) => { const f = (n, y, cls) => Array.from({ length: Math.round(n) }, (_, i) => K.c(40 + (i % 10) * 28, y + Math.floor(i / 10) * 26, 10, cls)).join(''); return f(v.a, 44, 'fA') + f(v.b, 118, 'fG') + K.t(24, 22, `${Math.round(v.a)} ${v.ea || 'de jugo'}`, 's ta', 'start') + K.t(24, 96, `${Math.round(v.b)} ${v.eb || 'de agua'}`, 's tg', 'start'); };
  // Barra de total T partida en n partes; las primeras k en un color. `m` marca un valor.
  const barra = (v, K) => { const w = 300 / v.n; return Array.from({ length: v.n }, (_, i) => K.r(20 + i * w + 1, 60, w - 2, 42, i < v.k ? 'fA' : 'fa', 3)).join('') + K.f(v.u ?? 0, Array.from({ length: v.n }, (_, i) => K.t(20 + (i + 0.5) * w, 86, N(v.T / v.n), 's')).join('')) + K.t(170, 38, v.tit || '', 'tm') + K.t(170, 134, v.pie || '', 'ta'); };
  // Barra de precio: antes y ahora, a escala.
  const precio = (v, K) => [[v.a, 50, 'fa', 'antes'], [v.b, 110, 'fA', 'ahora']].map(([q, y, c, t]) => K.r(60, y, q * v.s, 36, c, 4) + K.t(54, y + 23, t, 's tm', 'end') + K.t(66 + q * v.s, y + 23, N(q), '', 'start')).join('') + K.t(170, 34, v.tit || '', 'ta');
  // Rectángulo a × b: el producto es el trabajo.
  const rect = (v, K) => { const u = 14; let h = K.r(60, 178 - v.b * u, v.a * u, v.b * u, 'fa', 2); for (let i = 1; i < v.a; i++) h += K.l(60 + i * u, 178 - v.b * u, 60 + i * u, 178, 'lr'); for (let j = 1; j < v.b; j++) h += K.l(60, 178 - j * u, 60 + v.a * u, 178 - j * u, 'lr'); return h + K.t(60 + v.a * u / 2, 196, `${N(v.a)} ${v.ea}`, 's') + K.t(52, 178 - v.b * u / 2 + 4, N(v.b), 's', 'end') + K.t(250, 30, v.tit || '', 'ta'); };
  // Camino con dos móviles.
  const via = (v, K) => K.l(30, 100, 310, 100, 'lm') + K.c(30 + v.x * 280, 100, 10, 'fA') + K.c(30 + v.y * 280, 100, 10, 'fG') + K.t(30, 130, v.i || '', 's tm', 'start') + K.t(310, 130, v.d || '', 's tm', 'end') + K.t(170, 50, v.tit || '', 'ta');

  xpLec('icf-ma-proporcion-1', [
    ['Comparar dividiendo',
      xpMira('dibujo', 'Empecemos por la idea: una **razón** compara cuántas veces, no cuánto más.', { dib: puntos, v: { a: 2, b: 3 }, alto: 170 }, [
        ['Dos de jugo por tres de agua.', {}, '$2 : 3$'],
        ['Si duplico las dos, sabe igual.', { a: 4, b: 6 }, '$4 : 6 = 2 : 3$'],
        ['Si triplico, también: cada 2 sigue teniendo sus 3.', { a: 6, b: 9 }, '$6 : 9 = 2 : 3$'],
        ['Pero si a 2 y 3 les sumo uno a cada lado…', { a: 3, b: 4 }, '$3 : 4 \\ne 2 : 3$'],
        ['…ya no sabe igual: la razón se conserva multiplicando.', {}],
      ], 'Una razón se conserva al multiplicar o dividir las dos cantidades.'),
      xpHaz('dibujo', 'Mueve el jugo hasta que sepa igual que $3 : 2$, con 8 de agua.', { dib: puntos, v: { a: 4, b: 8 }, metas: { a: 12 }, alto: 236, manijas: [{ k: 'a', min: 1, max: 20, paso: 1, et: 'de jugo' }], lee: v => `$${v.a} : 8$`, dice: v => `Por cada 2 de agua hay ${N(v.a / 4)} de jugo.` }, 'El agua es 4 veces 2; el jugo, 4 veces 3: 12.')],
    ['Partes iguales',
      xpMira('dibujo', 'Segunda idea: para repartir se cuentan **partes iguales**.', { dib: barra, v: { n: 8, k: 3, T: 56, u: 0, tit: 'repartir 56 en razón 3 : 5', pie: '' }, alto: 150 }, [
        ['Cincuenta y seis en razón 3 a 5.', {}],
        ['Son 8 partes iguales: 3 de uno y 5 del otro.', { pie: '3 + 5 = 8 partes' }],
        ['Cada parte vale 7.', { u: 1, pie: '56 ÷ 8 = 7' }, '$56 \\div 8 = 7$'],
        ['Tres partes son 21.', { pie: '3 · 7 = 21' }, '$3 \\cdot 7 = 21$'],
        ['Cinco partes son 35; juntas dan 56.', { pie: '5 · 7 = 35' }, '$21 + 35 = 56$'],
      ], 'Suma la razón, divide el total y multiplica por cada número.'),
      xpHaz('fichas', 'Reparte 60 en razón 1 : 4. Pon lo que vale una parte y las dos cantidades.', { slots: [{ x: 66, y: 46, w: 80, et: 'una parte' }, { x: 170, y: 46, w: 80, et: 'la menor' }, { x: 274, y: 46, w: 80, et: 'la mayor' }], fichas: ['12', '12', '48', '15', '45', '30'], meta: ['12', '12', '48'], alto: 96, pista: 'Son 5 partes iguales, no 4.' }, '$60 \\div 5 = 12$; una parte es 12 y cuatro, 48.')],
    ['La escala',
      xpMira('dibujo', 'Tercera idea: una **escala** dice cuánto agranda el mapa.', { dib: barra, v: { n: 4, k: 4, T: 4, u: 0, tit: 'escala 1 : 30 000', pie: '4 cm en el mapa' }, alto: 150 }, [
        ['Cada centímetro del mapa vale 30 000 de verdad.', {}],
        ['Treinta mil centímetros son 300 metros.', { pie: '1 cm → 300 m' }, '$30\\,000 \\div 100 = 300$'],
        ['Cuatro centímetros son 1 200 metros.', { pie: '4 cm → 1 200 m' }, '$4 \\cdot 300 = 1\\,200$'],
        ['Es decir, 1.2 kilómetros.', { pie: '1.2 km' }, '$1\\,200 \\div 1\\,000 = 1.2$'],
        ['Al revés, de la realidad al mapa, se divide.', { pie: '' }],
      ], 'Del mapa a la realidad se multiplica; de la realidad al mapa, se divide.'),
      xpHaz('fichas', 'Plano 1 : 50. Pon cuánto mide de verdad una mesa de 3 cm.', { slots: [{ x: 110, y: 46, w: 90, et: 'en cm' }, { x: 230, y: 46, w: 90, et: 'en m' }], fichas: ['150', '1.5', '53', '15', '0.15'], meta: ['150', '1.5'], alto: 96, pista: 'Multiplica por 50 y después divide entre 100.' }, '$3 \\cdot 50 = 150$ cm, que son 1.5 m.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Verde y blanco van en razón 2 : 7. Hay 21 de blanco. Pon el verde y el total.', { slots: [{ x: 110, y: 46, w: 90, et: 'verde' }, { x: 230, y: 46, w: 90, et: 'total' }], fichas: ['6', '27', '16', '37', '9'], meta: ['6', '27'], alto: 96, pista: '21 son 7 partes: halla cuánto vale una.' }, 'Cada parte vale 3: verde 6, total $9 \\cdot 3 = 27$.')],
  ], 'Razón: multiplica. Reparto: partes iguales. Escala: cuánto vale un centímetro.');

  xpLec('icf-ma-proporcion-2', [
    ['De cada cien',
      xpMira('dibujo', 'Empecemos por la idea: un **porcentaje** se arma con decenas.', { dib: barra, v: { n: 10, k: 0, T: 60, u: 0, tit: 'el 35 % de 60', pie: '' }, alto: 150 }, [
        ['La barra entera son 60, el 100 %.', {}],
        ['Partida en diez, cada parte es el 10 %: 6.', { u: 1, pie: '10 % = 6' }, '$60 \\div 10 = 6$'],
        ['Tres partes son el 30 %: 18.', { k: 3, pie: '30 % = 18' }, '$3 \\cdot 6 = 18$'],
        ['El 5 % es media parte: 3.', { pie: '5 % = 3' }, '$6 \\div 2 = 3$'],
        ['Juntas, el 35 % es 21.', { pie: '35 % = 21' }, '$18 + 3 = 21$'],
      ], 'Halla el 10 % y arma con él cualquier porcentaje.'),
      xpHaz('dibujo', 'Pinta las partes que forman el 70 % de 90.', { dib: (v, K) => barra({ n: 10, k: v.k, T: 90, u: 1, tit: '', pie: `${v.k * 9}` }, K), v: { k: 2 }, metas: { k: 7 }, alto: 200, manijas: [{ k: 'k', min: 0, max: 10, paso: 1, et: 'partes' }], lee: v => `$${v.k * 10}\\,\\% = ${v.k * 9}$`, dice: () => 'Cada parte es el 10 %.' }, 'Siete partes de 9 son 63.')],
    ['Del pedazo al total',
      xpMira('dibujo', 'Segunda idea: si conoces la **parte**, puedes hallar el todo.', { dib: barra, v: { n: 5, k: 1, T: 70, u: 0, tit: '14 son el 20 %', pie: '' }, alto: 150 }, [
        ['Catorce personas son el 20 % de un grupo.', {}],
        ['El 20 % es una de cinco partes iguales.', { pie: '20 % = una de cinco' }],
        ['Si una vale 14, las cinco valen 70.', { u: 1, k: 5, pie: '5 · 14 = 70' }, '$5 \\cdot 14 = 70$'],
        ['También: 14 dividido entre 0.20.', {}, '$14 \\div 0.2 = 70$'],
        ['Sacarle el 20 % a 14 sería ir al revés.', { k: 1 }],
      ], 'Parte ÷ porcentaje (en decimal) = total.'),
      xpHaz('fichas', 'Nueve son el 30 %. Pon cuánto es el 10 % y el total.', { slots: [{ x: 110, y: 46, w: 90, et: 'el 10 %' }, { x: 230, y: 46, w: 90, et: 'el total' }], fichas: ['3', '30', '2.7', '27', '39'], meta: ['3', '30'], alto: 96, pista: 'El 30 % son tres veces el 10 %.' }, 'El 10 % es 3 y el total, 30.')],
    ['Los cambios multiplican',
      xpMira('dibujo', 'Tercera idea: cada cambio es un **factor** y los factores se multiplican.', { dib: precio, v: { a: 100, b: 100, s: 1.5, tit: '' }, alto: 160 }, [
        ['Empecemos con algo que vale 100.', {}],
        ['Sube 20 %: se multiplica por 1.20.', { b: 120, tit: '× 1.20' }, '$100 \\cdot 1.2 = 120$'],
        ['Ahora baja 20 %: se multiplica por 0.80.', { a: 120, b: 96, tit: '× 0.80' }, '$120 \\cdot 0.8 = 96$'],
        ['No volvió a 100: el segundo 20 % es de 120.', { a: 100, b: 96, tit: '−4 %' }],
        ['Para deshacer un cambio se divide entre su factor.', { tit: '' }, '$120 \\div 1.2 = 100$'],
      ], 'Subir p %: por 1 + p. Bajar p %: por 1 − p. Para volver, divide.'),
      xpHaz('dibujo', 'Un precio de 80 **baja 25 %**. Lleva la barra de ahora.', { dib: (v, K) => precio({ a: 80, b: v.b, s: 2.4 }, K), v: { b: 80 }, metas: { b: 60 }, alto: 200, manijas: [{ k: 'b', min: 20, max: 100, paso: 5, et: 'ahora' }], lee: v => `$${v.b} \\div 80 = ${N(v.b / 80)}$`, dice: v => (v.b < 80 ? `Bajó ${80 - v.b} de 80.` : 'Todavía no baja.') }, '$80 \\cdot 0.75 = 60$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un artículo de 200 sube 10 % y luego baja 50 %. Pon los dos valores.', { slots: [{ x: 110, y: 46, w: 90, et: 'después de subir' }, { x: 230, y: 46, w: 90, et: 'al final' }], fichas: ['220', '110', '120', '210', '100'], meta: ['220', '110'], alto: 96, pista: 'El 50 % se quita del precio ya subido.' }, '$200 \\cdot 1.1 = 220$ y $220 \\cdot 0.5 = 110$.')],
  ], 'Decenas para armar, división para volver y factores para los cambios.');

  xpLec('icf-ma-proporcion-3', [
    ['Crecen juntas',
      xpMira('dibujo', 'Empecemos por la idea: en una **directa** lo que vale uno no cambia.', { dib: puntos, v: { a: 2, b: 6, ea: 'kilos', eb: 'mil pesos' }, alto: 190 }, [
        ['Dos kilos cuestan 6 mil.', {}],
        ['Un kilo vale 3 mil.', { a: 1, b: 3 }, '$6 \\div 2 = 3$'],
        ['Cuatro kilos: cuatro veces 3.', { a: 4, b: 12 }, '$4 \\cdot 3 = 12$'],
        ['Se duplicaron los kilos y se duplicó el precio.', { a: 5, b: 15 }],
        ['El cociente siempre es 3: directa.', {}, '$15 \\div 5 = 3$'],
      ], 'Directa: el cociente no cambia. Halla lo que vale uno.'),
      xpHaz('fichas', '3 boletas cuestan 24 mil. Pon lo que vale una y lo que valen 7.', { slots: [{ x: 110, y: 46, w: 90, et: 'una' }, { x: 230, y: 46, w: 90, et: 'siete' }], fichas: ['8', '56', '28', '21', '72'], meta: ['8', '56'], alto: 96, pista: 'Divide para hallar una y multiplica por 7.' }, '$24 \\div 3 = 8$ y $7 \\cdot 8 = 56$.')],
    ['Una sube y la otra baja',
      xpMira('dibujo', 'Segunda idea: en una **inversa** el producto no cambia.', { dib: rect, v: { a: 4, b: 6, ea: 'obreros', tit: '24 cuadros' }, alto: 205 }, [
        ['Cuatro obreros tardan seis días.', {}, '$4 \\cdot 6 = 24$'],
        ['Cada cuadro es el trabajo de uno en un día: 24.', {}],
        ['Con ocho obreros, el mismo trabajo queda más bajo.', { a: 8, b: 3 }, '$24 \\div 8 = 3$'],
        ['Con tres, más alto: ocho días.', { a: 3, b: 8 }, '$24 \\div 3 = 8$'],
        ['El área es la misma; por eso se multiplica y se divide.', {}],
      ], 'Inversa: el producto no cambia. Más obreros, menos días.'),
      xpHaz('dibujo', '6 obreros tardan 4 días. Mueve los días hasta que **3** obreros hagan el mismo trabajo.', { dib: (v, K) => rect({ a: 3, b: v.b, ea: 'obreros', tit: `${3 * v.b} cuadros` }, K), v: { b: 3 }, metas: { b: 8 }, alto: 260, manijas: [{ k: 'b', min: 1, max: 11, paso: 1, et: 'días' }], lee: v => `$3 \\cdot ${v.b} = ${3 * v.b}$`, dice: () => 'Deben quedar 24 cuadros.' }, '$24 \\div 3 = 8$ días.')],
    ['Lo que hace uno en una hora',
      xpMira('fichas', 'Tercera idea: con tres cantidades, baja a **una máquina en una hora**.', { slots: [{ x: 70, y: 50, w: 92, et: 'máquinas · horas' }, { x: 170, y: 50, w: 92, et: 'por máquina y hora' }, { x: 270, y: 50, w: 92, et: 'lo que se pide' }], fichas: ['6', '10', '80'], alto: 100 }, [
        ['Dos máquinas en tres horas hacen 60 piezas.', {}],
        ['Son 2 por 3: seis horas de máquina.', { pon: { 0: '6' } }, '$2 \\cdot 3 = 6$'],
        ['Cada hora de máquina da 10 piezas.', { pon: { 1: '10' } }, '$60 \\div 6 = 10$'],
        ['Cuatro máquinas en dos horas: ocho horas de máquina.', {}, '$4 \\cdot 2 = 8$'],
        ['A diez por hora, hacen 80 piezas.', { pon: { 2: '80' } }, '$8 \\cdot 10 = 80$'],
      ], 'Halla lo que hace una en una hora y multiplica por lo que tengas.'),
      xpHaz('fichas', '5 vacas en 2 días dan 100 litros. Pon lo de una vaca en un día y lo de 3 vacas en 4 días.', { slots: [{ x: 110, y: 46, w: 90, et: 'una, un día' }, { x: 230, y: 46, w: 90, et: '3 vacas, 4 días' }], fichas: ['10', '120', '20', '60', '40'], meta: ['10', '120'], alto: 96, pista: '100 litros entre 10 vacas·día.' }, '$100 \\div 10 = 10$ y $3 \\cdot 4 \\cdot 10 = 120$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', '10 personas tienen agua para 9 días. Si son 15, pon las raciones y los días.', { slots: [{ x: 110, y: 46, w: 90, et: 'raciones' }, { x: 230, y: 46, w: 90, et: 'días' }], fichas: ['90', '6', '13.5', '150', '4'], meta: ['90', '6'], alto: 96, pista: 'Con más personas debe durar menos.' }, '$10 \\cdot 9 = 90$ y $90 \\div 15 = 6$.')],
  ], 'Directa: lo que vale uno. Inversa: el total que no cambia.');

  xpLec('icf-ma-proporcion-4', [
    ['Algo por cada uno',
      xpMira('fichas', 'Empecemos por la idea: una **tasa** es tanto por cada unidad.', { slots: [{ x: 110, y: 50, w: 120, et: 'paquete grande' }, { x: 240, y: 50, w: 120, et: 'paquete pequeño' }], fichas: ['20 por gramo', '24 por gramo'], alto: 100 }, [
        ['500 gramos cuestan 10 000 y 250 cuestan 6 000.', {}],
        ['El pequeño es más barato… ¿o no?', {}],
        ['El grande sale a 20 pesos por gramo.', { pon: { 0: '20 por gramo' } }, '$10\\,000 \\div 500 = 20$'],
        ['El pequeño, a 24.', { pon: { 1: '24 por gramo' } }, '$6\\,000 \\div 250 = 24$'],
        ['Se compara lo que vale una unidad.', { marca: [0] }],
      ], 'Para comparar, halla cuánto corresponde a una sola unidad.'),
      xpHaz('fichas', '40 dólares son 160 000 pesos. Pon cuánto vale un dólar y cuántos pesos son 15.', { slots: [{ x: 110, y: 46, w: 90, et: 'un dólar' }, { x: 230, y: 46, w: 90, et: '15 dólares' }], fichas: ['4 000', '60 000', '400', '6 000', '160 015'], meta: ['4 000', '60 000'], alto: 96, pista: 'Divide 160 000 entre 40.' }, '$160\\,000 \\div 40 = 4\\,000$ y $15 \\cdot 4\\,000 = 60\\,000$.')],
    ['Distancia, velocidad y tiempo',
      xpMira('dibujo', 'Segunda idea: la **velocidad** es kilómetros por cada hora.', { dib: via, v: { x: 0, y: 0, i: 'salida', d: '120 km', tit: '' }, alto: 150 }, [
        ['Un carro va a 60 kilómetros por hora.', { tit: '60 km/h' }],
        ['En una hora avanza 60: la mitad del camino.', { x: 0.5, tit: '1 h → 60 km' }],
        ['En dos horas, 120.', { x: 1, tit: '2 h → 120 km' }, '$60 \\cdot 2 = 120$'],
        ['Media hora es 0.5 de hora, no 0.30.', { x: 0.25, tit: '0.5 h → 30 km' }, '$60 \\cdot 0.5 = 30$'],
        ['Para el tiempo se divide: distancia entre velocidad.', {}, '$90 \\div 60 = 1.5$'],
      ], 'd = v · t; los minutos se pasan a fracción de hora.'),
      xpHaz('fichas', 'Un bus recorre 100 km a 80 km/h. Pon el tiempo en horas y los minutos de más.', { slots: [{ x: 110, y: 46, w: 90, et: 'horas' }, { x: 230, y: 46, w: 90, et: 'minutos de más' }], fichas: ['1.25', '15', '25', '0.8', '20'], meta: ['1.25', '15'], alto: 96, pista: 'La cuarta parte de una hora no son 25 minutos.' }, '$100 \\div 80 = 1.25$: una hora y 15 minutos.')],
    ['Juntos o detrás',
      xpMira('dibujo', 'Tercera idea: de frente las velocidades **se suman**; detrás, **se restan**.', { dib: via, v: { x: 0, y: 1, i: '50 km/h', d: '30 km/h', tit: '160 km los separan' }, alto: 150 }, [
        ['Dos carros salen uno hacia el otro.', {}],
        ['En una hora se acercan 80 kilómetros.', { x: 0.3125, y: 0.8125, tit: 'quedan 80 km' }, '$50 + 30 = 80$'],
        ['En dos horas se encuentran.', { x: 0.625, y: 0.625, tit: '160 ÷ 80 = 2 h' }, '$160 \\div 80 = 2$'],
        ['Si uno persigue al otro, solo cuenta la diferencia.', { x: 0, y: 0.25, i: '50 km/h', d: 'el otro va a 30 km/h', tit: '40 km de ventaja' }],
        ['Cada hora descuenta 20: lo alcanza en dos.', { x: 0.625, y: 0.625, tit: '40 ÷ 20 = 2 h' }, '$40 \\div 20 = 2$'],
      ], 'De frente: distancia ÷ suma. Detrás: ventaja ÷ diferencia.'),
      xpHaz('fichas', 'Uno va a 40 y otro lo sigue a 65; la ventaja es 75 km. Pon cuánto descuenta por hora y en cuántas lo alcanza.', { slots: [{ x: 110, y: 46, w: 90, et: 'por hora' }, { x: 230, y: 46, w: 90, et: 'horas' }], fichas: ['25', '3', '105', '2', '5'], meta: ['25', '3'], alto: 96, pista: 'Van en el mismo sentido: resta las velocidades.' }, '$65 - 40 = 25$ y $75 \\div 25 = 3$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Ida: 60 km a 20 km/h. Vuelta: 60 km a 60 km/h. Pon las horas en total y la velocidad media.', { slots: [{ x: 110, y: 46, w: 90, et: 'horas' }, { x: 230, y: 46, w: 90, et: 'media (km/h)' }], fichas: ['4', '30', '40', '3', '80'], meta: ['4', '30'], alto: 96, pista: 'Son 120 km; no promedies 20 y 60.' }, '$3 + 1 = 4$ horas y $120 \\div 4 = 30$ km/h.')],
  ], 'Una unidad para comparar, d = v · t y suma o resta según el sentido.');
}
