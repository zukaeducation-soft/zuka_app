// Gimnasio (spec 2026-11-19-gimnasio, pruebas tests/gimnasio.test.js): retos un poco más difíciles que los de las lecciones,
// guiados por un entrenador. Cada reto es un problema de varios pasos; cada paso es un juego gráfico ya existente con una sola
// ronda armada para ese paso, una sugerencia del entrenador (qué hacer y por qué) y dos ayudas que salen al fallar. Lo que sale
// bien queda escrito en el cuaderno: al final se ve el procedimiento completo y la estrategia. Aquí no se pierden vidas.
// Reto nuevo = solo datos en GYM_RETOS; `after` son las lecciones que lo abren (basta una hecha).

if (typeof ICON !== 'undefined') ICON.gym = svg('<path d="M6.5 6v12M17.5 6v12M3.5 9v6M20.5 9v6M6.5 12h11"/>');

const GYM_RETOS = [
  {
    id: 'gym-concreto', after: ['alg-12', 'alg-12e', 'pu-pr-1'], level: 2,
    title: 'Concreto para la losa', strategy: 'Partes iguales y después el factor',
    problem: 'Para una losa se mezclan cemento, arena y grava en la razón $1 : 3 : 4$ y se preparan 480 kg. El ingeniero pide un 25 % más de mezcla, con la misma receta. ¿Cuánta arena habrá en total?',
    steps: [
      { title: 'Cuenta las partes', coach: 'Una razón de tres números parte el total en partes iguales. Súmalas, mira cuánto pesa una sola y reparte.',
        ex: play('reparto', 'Reparte los 480 kg en la razón 1 : 3 : 4', { total: 480, parts: [1, 3, 4], tol: 0.02 },
          'Son $1 + 3 + 4 = 8$ partes de 60 kg: 60 de cemento, 180 de arena y 240 de grava.', { hint: '¿En cuántas partes iguales se corta la barra?' }),
        hints: ['Suma los números de la razón: así sabes en cuántas partes iguales se corta la barra.', 'Cada parte pesa 480 ÷ 8. La arena se lleva tres de esas partes.'],
        note: 'Una parte: 480 ÷ 8 = 60 kg. Cemento 60, arena 180, grava 240' },
      { title: 'Aplica el aumento', coach: 'Un aumento del 25 % no se suma a ojo: es quedarse con el 100 % y agregarle su cuarta parte. Estira la barra de la arena.',
        ex: play('estira-barra', 'Estira la arena un 25 % más', { max: 200, rounds: [{ base: 180, text: 'La arena con 25 % más', pct: 125 }] },
          'Un 25 % más es el 125 %: $180 \\cdot 1.25 = 225$ kg.', { hint: 'Más del 100 %: el 100 % es lo que ya había.' }),
        hints: ['La barra punteada es el 100 %. ¿Hasta qué porcentaje llega si le sumas un 25 %?', 'Lleva la barra al 125 %: el factor es 1.25.'],
        note: 'Arena con 25 % más: 180 · 1.25 = 225 kg' },
      { title: 'Comprueba por otro camino', coach: 'Un buen hábito: verificar con otra ruta. Ahora el aumento va primero, sobre toda la mezcla, y después se reparte con la misma receta: la arena debe dar lo mismo.',
        ex: play('reparto', 'Reparte la mezcla completa (480 kg + 25 %) en 1 : 3 : 4', { total: 600, parts: [1, 3, 4], tol: 0.02 },
          '480 kg con 25 % más son 600 kg; en 8 partes de 75 kg: 75, 225 y 300. La arena coincide.', { hint: 'El total nuevo es 480 · 1.25.' }),
        hints: ['Reparte el total nuevo en las mismas 8 partes de la receta.', 'Son 600 kg: cada parte pesa 75 kg y la arena se lleva tres.'],
        note: 'Comprobación: 600 ÷ 8 = 75; la arena es 3 · 75 = 225 kg' },
    ],
    answer: 'Habrá 225 kg de arena.',
    wrap: 'Con una razón de varios números: primero las partes iguales (total ÷ suma de la razón), luego cada cantidad. Un cambio porcentual se aplica como un factor, y da igual hacerlo antes o después de repartir.',
  },
  {
    id: 'gym-obra', after: ['alg-12f', 'pu-pr-2'], level: 3,
    title: 'La obra que se adelanta', strategy: 'Contar el trabajo en obreros·día',
    problem: '6 obreros harían una obra en 30 días. Después de 10 días de trabajo, el dueño pide entregarla 8 días antes de lo previsto. ¿Cuántos obreros hay que contratar además de los que hay?',
    steps: [
      { title: 'Separa lo hecho de lo que falta', coach: 'No mezcles todo el problema a la vez: parte la obra en lo que ya se hizo y lo que falta. Los días pasados son una parte de los 30.',
        ex: play('barra-razon', 'Parte los 30 días: hechos y por hacer', { rounds: [{ T: 30, p: 1, q: 2, A: 'días hechos', B: 'días que faltan' }] },
          'Pasaron 10 de 30 días: $10 : 20 = 1 : 2$. A los 6 obreros les faltan 20 días de trabajo.', { hint: 'Ya pasaron 10 días.' }),
        hints: ['Ya pasaron 10 días del plan. Deja ese tramo a un lado de la manija.', 'Corta la cinta en 10: quedan 10 hechos y 20 por hacer.'],
        note: 'Faltan 20 días de 6 obreros: 6 · 20 = 120 obreros·día' },
      { title: 'Ajusta al nuevo plazo', coach: 'El trabajo que falta no cambia: se mide en obreros·día. Con menos días hacen falta más obreros, de modo que el producto se mantenga. El juego ya muestra el plazo nuevo: comprueba que sea lo que faltaba menos lo que se adelanta.',
        ex: play('la-obra', 'Deja los obreros justos para el trabajo que falta', { workers: 6, days: 20, askDays: 12, max: 20 },
          'Quedan $20 - 8 = 12$ días: $120 \\div 12 = 10$ obreros.', { hint: 'Al plazo de 20 días le quitan 8.' }),
        hints: ['El producto obreros × días debe seguir igual al trabajo que falta.', 'Quedan 12 días: divide los 120 obreros·día entre 12.'],
        note: 'En 12 días: 120 ÷ 12 = 10 obreros' },
    ],
    answer: 'Hacen falta 10 obreros: hay que contratar 10 − 6 = 4 más.',
    wrap: 'Cuando cambian los trabajadores o el plazo a mitad del camino, mide el trabajo en una unidad que no cambie (obreros·día), separa lo hecho de lo que falta y reparte solo lo que falta. Al final, relee qué se pregunta: aquí, los que hay que contratar además.',
  },
  {
    id: 'gym-bus', after: ['pu-pr-3', 'alg-12f'], level: 2,
    title: 'Alcanzar al bus', strategy: 'Ventaja ÷ diferencia de velocidades',
    problem: 'Un bus sale de Medellín a 60 km/h. Hora y media después sale un carro por la misma vía a 90 km/h. ¿Cuánto tarda el carro en alcanzarlo y a cuántos kilómetros de Medellín?',
    steps: [
      { title: 'Mide la ventaja', coach: 'Antes de que salga el carro, el bus ya avanzó. Esa ventaja es lo que el carro debe descontar. A velocidad fija, distancia y tiempo son directamente proporcionales.',
        ex: play('duplica-magnitud', 'La ventaja del bus', { rounds: [{ text: 'El bus va a 60 km/h. ¿Cuánto avanza en la hora y media que le lleva al carro?', nx: 'horas', ny: 'km', uy: 'km', x0: 1, y0: 60, x1: 1.5, y1: 90, step: 5, ymax: 120 }] },
          'En 1.5 h el bus recorre $60 \\cdot 1.5 = 90$ km.', { hint: 'En una hora son 60 km.' }),
        hints: ['Si en una hora avanza 60 km, en media hora avanza la mitad de eso.', 'Hora y media es una hora más media: 60 + 30.'],
        note: 'Ventaja del bus: 60 · 1.5 = 90 km' },
      { title: 'Descuenta la diferencia', coach: 'No hace falta seguir a los dos por separado: cada hora el carro le quita al bus la diferencia de velocidades. ¿Cuántas horas tarda en borrar la ventaja? (En el juego, el bus es el carro que va adelante.)',
        ex: play('persecucion', '¿Cuándo lo alcanza?', { rounds: [{ head: 90, v1: 60, v2: 90 }] },
          'Se acerca $90 - 60 = 30$ km por hora: $90 \\div 30 = 3$ h.', { hint: 'Resta las velocidades.' }),
        hints: ['Cada hora la distancia entre ellos baja lo que el carro va más rápido que el bus.', 'Se acercan 30 km por hora y la ventaja es de 90 km.'],
        note: 'Se acercan 90 − 60 = 30 km/h: lo alcanza en 90 ÷ 30 = 3 h' },
      { title: 'Ubica el encuentro', coach: 'Ya sabes cuánto viaja el carro. Su distancia a Medellín sale de su velocidad y ese tiempo. Comprueba con el bus: él lleva hora y media más de viaje.',
        ex: play('duplica-magnitud', '¿Dónde lo alcanza?', { rounds: [{ text: 'El carro va a 90 km/h durante las horas que tarda en alcanzar al bus.', nx: 'horas', ny: 'km', uy: 'km', x0: 1, y0: 90, x1: 3, y1: 270, step: 10, ymax: 300 }] },
          '$90 \\cdot 3 = 270$ km. El bus lleva $4.5$ h: $60 \\cdot 4.5 = 270$ km. Coinciden.', { hint: 'Usa el tiempo del paso anterior.' }),
        hints: ['Multiplica la velocidad del carro por las horas que encontraste en el paso anterior.', 'Son 3 horas a 90 km/h.'],
        note: 'Encuentro: 90 · 3 = 270 km (el bus: 60 · 4.5 = 270 km)' },
    ],
    answer: 'Lo alcanza 3 horas después de salir, a 270 km de Medellín.',
    wrap: 'En una persecución: calcula la ventaja, divídela entre la diferencia de velocidades y obtienes el tiempo. La posición sale de cualquiera de los dos; calcularla con los dos es la mejor comprobación.',
  },
  {
    id: 'gym-muro', after: ['pu-pr-3', 'alg-12f'], level: 3,
    title: 'Pintar a dos manos', strategy: 'Sumar rapideces, no tiempos',
    problem: 'Ana pinta un muro sola en 6 horas y Beto en 3 horas. Pintan juntos durante una hora y luego Beto se va. ¿Cuánto tarda Ana en terminar sola?',
    steps: [
      { title: 'Mide la rapidez del equipo', coach: 'La trampa es sumar las horas. Lo que se suma es lo que hace cada uno en una hora. Prueba cuánto tardarían juntos el muro completo.',
        ex: play('trabajo-conjunto', 'Juntos se suman las rapideces', { rounds: [{ who: ['Ana', 'Beto'], a: 6, b: 3 }] },
          'En una hora: $\\tfrac16 + \\tfrac13 = \\tfrac12$ del muro. Juntos tardarían 2 h.', { hint: 'Cada hora, Ana hace 1/6 y Beto 1/3.' }),
        hints: ['En una hora Ana pinta 1/6 del muro y Beto 1/3. Súmalos: eso hacen juntos por hora.', 'Juntos hacen la mitad del muro por hora.'],
        note: 'Juntos: 1/6 + 1/3 = 1/2 del muro por hora (todo en 2 h)' },
      { title: 'Lo que dejan pintado', coach: 'Piensa el muro en franjas iguales para no pelear con fracciones: con 6 franjas, Ana pinta 1 por hora y Beto 2. Reparte lo que pintan en la hora juntos según lo que aporta cada uno y cuenta cuántas quedan sin pintar.',
        ex: play('barra-razon', 'Lo que pintan en la hora juntos: Ana frente a Beto', { rounds: [{ T: 3, p: 1, q: 2, A: 'Ana', B: 'Beto' }] },
          'En la hora juntos pintan $1 + 2 = 3$ de las 6 franjas: Ana 1 y Beto 2. Quedan 3 sin pintar.', { hint: 'Beto va al doble de rápido que Ana.' }),
        hints: ['Beto pinta el doble que Ana en el mismo tiempo: su tramo de la cinta debe ser el doble.', 'Ana 1 franja y Beto 2.'],
        note: 'Tras 1 h juntos: 3 de 6 franjas pintadas; faltan 3' },
      { title: 'Ana termina sola', coach: 'Ahora solo trabaja Ana, a su ritmo. Más franjas, más tiempo, en la misma proporción.',
        ex: play('duplica-magnitud', 'Ana termina sola', { rounds: [{ text: 'Ana sola pinta 1 franja por hora. ¿Cuántas horas para las franjas que faltan?', nx: 'franjas', ny: 'horas', uy: 'h', x0: 1, y0: 1, x1: 3, y1: 3, step: 0.5, ymax: 6 }] },
          'Ana pinta 1 franja por hora: las 3 que faltan le toman 3 h.', { hint: 'Directa: el doble de franjas, el doble de horas.' }),
        hints: ['Mira cuántas franjas faltan y cuántas pinta Ana en una hora.', 'Le faltan 3 franjas y pinta una por hora.'],
        note: 'Ana sola: 3 franjas a 1 por hora = 3 h' },
    ],
    answer: 'Ana tarda 3 horas más (4 horas en total desde que empezaron).',
    wrap: 'En trabajo conjunto se suman las rapideces (lo hecho en una hora). Si el equipo cambia a mitad del trabajo, parte el trabajo en unidades iguales, cuenta lo hecho y reparte lo que falta con la rapidez del nuevo equipo.',
  },
  {
    id: 'gym-tele', after: ['alg-13c', 'alg-13d', 'pu-pr-5'], level: 2,
    title: 'Sube y luego rebaja', strategy: 'Encadenar factores',
    problem: 'Una tienda sube un 20 % el precio de un televisor de 1 500 000 pesos y una semana después lo anuncia con 20 % de descuento. ¿Quedó al precio de antes? ¿Cuál fue el cambio total?',
    steps: [
      { title: 'Convierte el aumento en factor', coach: 'Cada cambio porcentual es una multiplicación: subir un porcentaje es tomar más del 100 % del precio que había en ese momento.',
        ex: play('estira-barra', 'El precio con el aumento', { max: 200, rounds: [{ base: 1500000, text: 'El televisor con 20 % más', pct: 120 }] },
          'Un 20 % más es el 120 %: $1\\,500\\,000 \\cdot 1.2 = 1\\,800\\,000$.', { hint: 'Más del 100 %.' }),
        hints: ['La barra punteada es el 100 % del precio. Súmale el 20 %.', 'Lleva la barra al 120 %: el factor es 1.2.'],
        note: 'Con el aumento: 1 500 000 · 1.2 = 1 800 000' },
      { title: 'Encadena el descuento', coach: 'El descuento se calcula sobre el precio nuevo, no sobre el de antes: por eso los porcentajes no se cancelan. Pega los dos cambios y busca el cambio único que los reemplaza.',
        ex: play('cascada', 'Aplica los dos cambios y halla el cambio único', { price: 1500000, changes: [20, -20], step: 1 },
          'Los factores se multiplican: $1.2 \\cdot 0.8 = 0.96$, un descuento único del 4 %.', { hint: 'Multiplica los dos factores.' }),
        hints: ['Escribe cada cambio como factor (subir 20 % y bajar 20 %) y multiplícalos.', 'El producto da 0.96: ¿cuánto le falta para el 100 %?'],
        note: 'Factores: 1.2 · 0.8 = 0.96 → descuento único del 4 %' },
      { title: 'Comprueba deshaciendo', coach: 'Para comprobar, haz el camino de vuelta: si solo vieras el precio final con el descuento, ¿podrías recuperar el precio inflado? Deshacer un porcentaje es dividir por su factor, no sumar el porcentaje.',
        ex: play('precio-original', 'Recupera el precio antes del descuento', { rounds: [{ r: -20, now: 1440, step: 100, max: 2400 }] },
          'El precio final es $1\\,500\\,000 \\cdot 0.96 = 1\\,440\\,000$, y $1\\,440 \\div 0.8 = 1\\,800$ mil: el precio inflado.', { hint: 'Divide entre el factor del descuento.' }),
        hints: ['Con 20 % de descuento se paga el 80 %: el precio final es el 80 % del de antes.', 'Divide 1 440 entre 0.8.'],
        note: 'Vuelta: 1 440 000 ÷ 0.8 = 1 800 000' },
    ],
    answer: 'No: queda en 1 440 000 pesos, un 4 % menos que al principio.',
    wrap: 'Varios cambios porcentuales seguidos se encadenan multiplicando sus factores (1 + p/100). Por eso subir y bajar el mismo porcentaje nunca deja el precio igual. Para deshacer un cambio se divide por su factor.',
  },
  {
    id: 'gym-chaqueta', after: ['alg-13c', 'pu-pr-5'], level: 3,
    title: 'La chaqueta con impuesto y rebaja', strategy: 'Deshacer los cambios en reversa',
    problem: 'A una chaqueta le sumaron un 25 % de impuesto y después, en temporada de rebajas, le quitaron un 30 %. Pagaste 70 mil pesos. ¿Cuál era su precio sin impuesto?',
    steps: [
      { title: 'Deshaz el último cambio', coach: 'Como al quitarse la ropa: lo último que se puso sale primero. El último cambio fue la rebaja; el 30 % se calculó sobre el precio con impuesto, así que no basta con sumarlo a 70.',
        ex: play('precio-original', 'Quita la rebaja', { rounds: [{ r: -30, now: 70, step: 5, max: 150 }] },
          'Pagaste el 70 %: $70 \\div 0.7 = 100$ mil con impuesto.', { hint: 'Con la rebaja pagaste el 70 % del precio.' }),
        hints: ['Con un 30 % de descuento pagas el 70 % de lo que costaba. Divide entre ese factor.', '70 es el 70 % de cuánto: 70 ÷ 0.7.'],
        note: 'Sin la rebaja: 70 ÷ 0.7 = 100 mil' },
      { title: 'Deshaz el impuesto', coach: 'Ahora el impuesto. Ese precio es el 125 % del precio base: vuelve a dividir por el factor, no restes el porcentaje.',
        ex: play('precio-original', 'Quita el impuesto', { rounds: [{ r: 25, now: 100, step: 5, max: 150 }] },
          'Con impuesto es el 125 %: $100 \\div 1.25 = 80$ mil.', { hint: 'Restarle el 25 % no sirve.' }),
        hints: ['El precio con impuesto es el 125 % del base. Divide entre el factor de ese aumento.', 'Divide 100 entre 1.25.'],
        note: 'Sin el impuesto: 100 ÷ 1.25 = 80 mil' },
    ],
    answer: 'El precio sin impuesto era 80 mil pesos (80 · 1.25 · 0.7 = 70).',
    wrap: 'Para volver al principio de una cadena de cambios porcentuales, deshazlos en orden inverso y dividiendo por cada factor. Restar o sumar el porcentaje al final da otro número, porque cada porcentaje se calculó sobre un precio distinto.',
  },

  // ---- Ecuaciones con contexto (Preuniversitario mundo 13; Álgebra: ecuaciones lineales y sistemas) ----
  {
    id: 'gym-hermanas', after: ['pu-ec-1', 'alg-1'], level: 2,
    title: 'Las tres hermanas', strategy: 'Una sola incógnita para todo',
    problem: 'Sara tiene 4 años más que Lina, y Eva tiene el doble de la edad de Lina. Entre las tres suman 48 años. ¿Qué edad tiene cada una? ¿Dentro de cuántos años sumarán 72?',
    steps: [
      { title: 'Escribe todo con una x', coach: 'Toma como x a la que sirve de referencia: las otras dos se describen a partir de Lina, así queda una sola incógnita. La cinta ya pone a Lina como x y a las otras a partir de ella: desliza x hasta llenarla justo.',
        ex: play('cinta-ecuacion', 'La cinta de las tres edades', { rounds: [{ say: 'Lina: x · Sara: 4 más · Eva: el doble de Lina. Suman 48', parts: [[1, 0, 'Lina'], [1, 4, 'Sara'], [2, 0, 'Eva']], total: 48, lo: 0, hi: 20 }] },
          '$x + (x + 4) + 2x = 4x + 4 = 48$: $x = 11$. Lina tiene 11, Sara 15 y Eva 22.', { hint: 'Junta todas las x y todos los números sueltos.' }),
        hints: ['Junta las x (hay 1 + 1 + 2 de ellas) y aparte los años sueltos.', 'Cuatro x más 4 deben dar 48: cuatro x son 44.'],
        note: 'Lina x, Sara x + 4, Eva 2x: 4x + 4 = 48 → Lina 11, Sara 15, Eva 22' },
      { title: 'Despeja el futuro', coach: 'Cada año que pasa, cada una cumple uno: la suma de las tres crece de a tres por año. El juego trae la suma dentro de t años ya planteada (llama x a la t): compruébala y despeja deshaciendo en orden inverso.',
        ex: play('despeja-x', 'Despeja los años que faltan', { rounds: [{ a: 3, b: 48, c: 72, cards: [['+', -48], ['+', 48], ['×', 1 / 3], ['×', 3]] }] },
          '$48 + 3t = 72$: se quita 48 a los dos lados, $3t = 24$, y se divide entre 3: $t = 8$.', { hint: 'Primero quita lo que se suma.' }),
        hints: ['Lo último que le pasó a la incógnita fue sumarle 48: eso se deshace primero.', 'Resta 48 a los dos lados y luego multiplica por 1/3.'],
        note: 'Dentro de t años: 48 + 3t = 72 → 3t = 24 → t = 8' },
    ],
    answer: 'Lina tiene 11 años, Sara 15 y Eva 22. Dentro de 8 años sumarán 72 (19 + 23 + 30).',
    wrap: 'Con varias cantidades relacionadas, nombra x a la que sirve de referencia y escribe las demás con ella: queda una sola ecuación. Se despeja deshaciendo en orden inverso y se comprueba sumando.',
  },
  {
    id: 'gym-madre', after: ['pu-ec-2', 'alg-1'], level: 3,
    title: 'La madre y el hijo', strategy: 'El tiempo pasa igual para todos',
    problem: 'Una madre tiene el triple de la edad de su hijo. Dentro de 12 años tendrá el doble. ¿Qué edades tienen hoy? ¿Hace cuántos años la madre tenía cinco veces la edad del hijo?',
    steps: [
      { title: 'Plantea con barras', coach: 'Dibuja las edades como barras: el hijo es x y la madre, una barra tres veces más larga. La trampa: dentro de 12 años a los dos se les suma lo mismo; el doble se toma de las edades futuras.',
        ex: play('edades-barras', 'Las edades hoy y dentro de 12 años', { rounds: [{ k1: 3, L: 12, k2: 2 }] },
          '$3x + 12 = 2(x + 12)$ da $x = 12$: el hijo tiene 12 y la madre 36.', { hint: 'Dentro de 12 años, los dos tienen 12 años más.' }),
        hints: ['Dentro de 12 años la madre tiene 3x + 12 y el hijo x + 12. La madre debe tener el doble del hijo.', '3x + 12 = 2x + 24: quita 2x y 12 de los dos lados.'],
        note: 'Hoy: 3x + 12 = 2(x + 12) → hijo 12, madre 36' },
      { title: 'Mira hacia atrás', coach: 'Hace t años los dos tenían t años menos. Plantea «madre = 5 · hijo», abre el paréntesis y pasa las t al lado donde queden sumando. El juego te deja la ecuación ya ordenada (llama x a la t): compruébala y despeja.',
        ex: play('despeja-x', 'Despeja los años hacia atrás', { rounds: [{ a: 4, b: 36, c: 60, cards: [['+', -36], ['+', 36], ['×', 1 / 4], ['×', 4]] }] },
          '$36 - t = 5(12 - t)$ es $36 - t = 60 - 5t$; sumando $5t$ a los dos lados: $4t + 36 = 60$, así que $t = 6$. Hace 6 años tenían 30 y 6.', { hint: 'Primero quita el número que se suma.' }),
        hints: ['Abre el paréntesis: 5(12 − t) = 60 − 5t. Al sumar 5t a los dos lados queda 4t + 36 = 60.', 'Resta 36 y luego multiplica por 1/4.'],
        note: 'Hace t años: 36 − t = 5(12 − t) → 4t + 36 = 60 → t = 6 (madre 30, hijo 6)' },
    ],
    answer: 'Hoy el hijo tiene 12 años y la madre 36. Hace 6 años tenían 6 y 30: cinco veces.',
    wrap: 'En problemas de edades el tiempo pasa igual para todos: se suma (o se resta) el mismo número a cada edad, y la diferencia entre ellas nunca cambia. Escribe cada edad «en ese momento» antes de plantear la relación.',
  },
  {
    id: 'gym-cafe', after: ['pu-ec-2'], level: 2,
    title: 'La mezcla de café', strategy: 'El valor total se conserva',
    problem: 'Un tostador mezcla café de 12 mil pesos el kilo con café de 8 mil para tener 20 kg que valgan 9 mil el kilo. ¿Cuántos kilos pone de cada uno? Si después le añade 4 kg más del café caro, ¿a cuánto debe vender el kilo para no perder?',
    steps: [
      { title: 'Plantea el valor de la mezcla', coach: 'Al mezclar, el dinero no se pierde: lo que vale la mezcla es lo que vale el caro más lo que vale el barato. Si x son los kilos del caro, el resto hasta 20 es del barato.',
        ex: play('mezcla-precio', 'Los kilos de cada café', { rounds: [{ a: ['café de 12 mil', 12000], b: ['café de 8 mil', 8000], total: 20, target: 9000, step: 1 }] },
          '$12\\,000x + 8\\,000(20 - x) = 9\\,000 \\cdot 20$ da $4\\,000x = 20\\,000$: 5 kg del caro y 15 del barato.', { hint: 'El precio de la mezcla queda entre los dos.' }),
        hints: ['El precio buscado está más cerca del barato que del caro: lleva poco café caro.', 'Con solo barato valdría 160 mil; faltan 20 mil y cada kilo caro aporta 4 mil más.'],
        note: 'x kg caros: 12x + 8(20 − x) = 9 · 20 → 5 kg de 12 mil y 15 kg de 8 mil' },
      { title: 'Mezcla la mezcla', coach: 'Los 20 kg ya hechos son como un solo café de 9 mil. Al añadir café caro el precio sube, pero poco: es un promedio en el que pesa más lo que tiene más kilos. Aquí cada bloque es un kilo y los precios van en miles (9 es 9 mil).',
        ex: play('balanza-promedio', 'El precio nuevo como promedio ponderado', { rounds: [{ groups: [{ lab: 'mezcla de 9 mil', n: 20, mean: 9 }, { lab: 'café de 12 mil', n: 4, mean: 12 }], lo: 8, hi: 13 }] },
          '$\\tfrac{20 \\cdot 9 + 4 \\cdot 12}{24} = \\tfrac{228}{24} = 9.5$ mil el kilo.', { hint: 'Hay muchos más kilos de mezcla que de café caro.' }),
        hints: ['Multiplica cada precio por sus kilos, suma, y divide entre todos los kilos.', 'Valor total: 180 + 48 mil en 24 kg.'],
        note: 'Promedio: (20 · 9 + 4 · 12) ÷ 24 = 9.5 mil el kilo' },
    ],
    answer: 'Pone 5 kg del café de 12 mil y 15 kg del de 8 mil. Con los 4 kg extra, debe vender el kilo a 9 500 pesos.',
    wrap: 'En las mezclas se conserva el valor total: kilos por precio de cada parte suman lo de la mezcla. Una mezcla ya hecha se trata como un solo ingrediente con su precio promedio.',
  },
  {
    id: 'gym-recibos', after: ['pu-ec-3', 'alg-101'], level: 2,
    title: 'Los dos recibos', strategy: 'Comparar para eliminar',
    problem: 'En una panadería, 3 panes y 2 jugos cuestan 12 mil pesos; 1 pan y 2 jugos cuestan 8 mil. ¿Cuánto vale un pan y cuánto un jugo?',
    steps: [
      { title: 'Compara los recibos', coach: 'Los dos recibos tienen los mismos jugos. Si a un recibo le restas el otro, los jugos se van y queda una ecuación con una sola incógnita (x es el pan, y el jugo).',
        ex: play('elimina-variable', 'Borra los jugos', { rounds: [{ e1: [3, 2, 12], e2: [1, 2, 8] }] },
          'Restar el segundo recibo del primero ($k = -1$) borra los jugos: $2x = 4$, el pan vale 2 mil.', { hint: 'Busca el número que borra la y.' }),
        hints: ['Multiplica el segundo recibo por un número y súmalo al primero: la y debe desaparecer.', 'Con k = −1 los jugos se cancelan.'],
        note: 'Restando: (3x + 2y) − (x + 2y) = 12 − 8 → 2x = 4 → pan a 2 mil' },
      { title: 'Sustituye', coach: 'Con el precio del pan, el recibo más corto te da el del jugo. Ajusta los dos precios hasta que los dos recibos cuadren (en el juego, a es el pan y b el jugo).',
        ex: play('dos-compras', 'Los dos precios', { rounds: [{ names: ['pan', 'jugo'], e1: [3, 2, 12], e2: [1, 2, 8], max: 8 }] },
          'Con el pan a 2 mil: $2 + 2y = 8$, el jugo vale 3 mil. Revisa: $3 \\cdot 2 + 2 \\cdot 3 = 12$.', { hint: 'Empieza por el pan.' }),
        hints: ['Pon el pan en el precio que hallaste: en el segundo recibo, los 2 jugos cuestan lo que falta para 8.', 'Dos jugos valen 6 mil.'],
        note: 'Sustituyendo: 2 + 2y = 8 → jugo a 3 mil' },
      { title: 'Comprueba en el plano', coach: 'Cada recibo es una recta de precios posibles. Si tus precios están bien, el punto (pan, jugo) cae justo en el cruce de las dos rectas.',
        ex: play('dos-rectas', 'El cruce de los dos recibos', { rounds: [{ e1: [3, 2, 12], e2: [1, 2, 8] }] },
          'El único punto que cumple los dos recibos es el cruce $(2, 3)$.', { hint: 'Cada recibo es una recta: busca dónde se cruzan.' }),
        hints: ['Lleva el punto hasta una de las rectas y muévelo a lo largo de ella hasta que también quede sobre la otra.', 'Es el punto con x = precio del pan y y = precio del jugo.'],
        note: 'Cruce de las rectas: (2, 3)' },
    ],
    answer: 'El pan vale 2 mil pesos y el jugo 3 mil.',
    wrap: 'Con dos incógnitas y dos datos, compara las ecuaciones: si una incógnita aparece igual en las dos, al restarlas desaparece. El valor hallado se sustituye en la ecuación más sencilla, y el cruce de las rectas confirma la respuesta.',
  },

  // ---- Conteo y combinatoria (Preuniversitario mundo 5) ----
  {
    id: 'gym-claves', after: ['pu-co-4'], level: 2,
    title: 'Contraseñas de la app', strategy: 'Casillas y complemento',
    problem: 'Una app pide contraseñas de 4 caracteres: dos letras (de 26, se pueden repetir) y luego dos dígitos distintos. ¿Cuántas contraseñas hay? ¿Cuántas tienen al menos una letra A?',
    steps: [
      { title: 'Cuenta casilla por casilla', coach: 'Dibuja una casilla por carácter y pregúntate, en orden, cuántas opciones caben en cada una con lo que dice la regla. Como las elecciones van una tras otra, las opciones se multiplican.',
        ex: play('placas-codigo', 'Las opciones de cada casilla', { rounds: [{ ask: '¿Cuántas contraseñas hay?', slots: ['letra', 'letra', 'dígito', 'dígito'], rule: '2 letras (pueden repetirse) y 2 dígitos distintos.', want: [26, 26, 10, 9], tray: [26, 26, 25, 10, 10, 9] }] },
          'Las letras pueden repetirse: 26 y 26. Los dígitos no: 10 para el primero y 9 para el segundo. $26 \\cdot 26 \\cdot 10 \\cdot 9 = 60\\,840$.', { hint: '«Distintos» quita una opción a la segunda casilla de dígitos.' }),
        hints: ['Las letras se pueden repetir; los dígitos no: el segundo dígito tiene una opción menos que el primero.', 'Letras: 26 y 26. Dígitos: 10 y 9.'],
        note: 'Todas: 26 · 26 · 10 · 9 = 60 840' },
      { title: 'Cuenta lo contrario', coach: '«Al menos una A» tiene muchos casos (A al principio, al final, en las dos…). Es más corto contar las que no tienen ninguna A y restarlas del total. Arriba van todas; abajo, las que prohíben la A.',
        ex: play('complemento-conteo', 'Todas menos las que no tienen A', { rounds: [{ ask: 'Contraseñas con al menos una A', slots: ['letra', 'letra', 'dígito', 'dígito'], all: [26, 26, 10, 9], none: [25, 25, 10, 9], tray: [26, 25, 10, 9, 8] }] },
          'Sin ninguna A: $25 \\cdot 25 \\cdot 10 \\cdot 9 = 56\\,250$. Con al menos una A: $60\\,840 - 56\\,250 = 4\\,590$.', { hint: 'Abajo, las letras no pueden ser A.' }),
        hints: ['Para no tener ninguna A, cada casilla de letra pierde una opción. Los dígitos no cambian.', 'Abajo: 25, 25, 10 y 9.'],
        note: 'Al menos una A: 60 840 − 25 · 25 · 10 · 9 = 60 840 − 56 250 = 4 590' },
    ],
    answer: 'Hay 60 840 contraseñas, y 4 590 tienen al menos una A.',
    wrap: 'Para contar arreglos, una casilla por elección y se multiplican las opciones de cada una (lo que no se repite pierde una opción). Cuando piden «al menos uno», cuenta el contrario («ninguno») y réstalo del total.',
  },
  {
    id: 'gym-papaya', after: ['pu-co-2'], level: 2,
    title: 'Las letras de PAPAYA', strategy: 'Contar como distintas y dividir por las repeticiones',
    problem: '¿De cuántas maneras se pueden ordenar las letras de la palabra PAPAYA? ¿Cuántos de esos ordenamientos empiezan por Y?',
    steps: [
      { title: 'Imagina que son distintas', coach: 'Haz como si todas las letras fueran diferentes (P₁, A₁, P₂…): cada posición es una casilla, y la letra usada ya no está para las siguientes.',
        ex: play('placas-codigo', 'Las letras como si fueran distintas', { rounds: [{ ask: '¿Cuántas filas si las letras fueran distintas?', slots: ['1.ª', '2.ª', '3.ª', '4.ª', '5.ª', '6.ª'], rule: 'Cada letra se usa una vez.', want: [6, 5, 4, 3, 2, 1], tray: [6, 6, 5, 4, 3, 2, 1] }] },
          'Seis letras distintas: $6 \\cdot 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1 = 6! = 720$ filas.', { hint: 'Cada casilla tiene una letra menos para escoger.' }),
        hints: ['¿Cuántas letras puedes poner en la primera casilla? ¿Y en la segunda, si una ya se usó?', 'Las casillas van de 6 hasta 1.'],
        note: 'Si fueran distintas: 6 · 5 · 4 · 3 · 2 · 1 = 720' },
      { title: 'Divide por las repeticiones', coach: 'Las tres A son iguales: intercambiarlas no cambia la palabra, así que cada palabra quedó contada 3! veces por ellas. Lo mismo pasa con las dos P. Pon en el denominador un k! por cada letra que se repite k veces.',
        ex: play('anagramas', 'Ordenamientos de PAPAYA', { rounds: [{ word: 'PAPAYA' }] },
          'A se repite 3 veces y P 2: $\\tfrac{6!}{3! \\cdot 2!} = \\tfrac{720}{12} = 60$.', { hint: 'Cuenta cuántas veces aparece cada letra.' }),
        hints: ['Cuenta cuántas veces sale cada letra; las que salen una sola vez no se dividen.', 'La A sale tres veces y la P dos: el denominador es 3! · 2!.'],
        note: 'Repetidas A (3) y P (2): 720 ÷ (3! · 2!) = 60' },
      { title: 'Fija la primera letra', coach: 'Si la Y va primero, ya no se mueve: solo se ordenan las otras cinco letras, con sus mismas repeticiones. Es el mismo método con una palabra más corta.',
        ex: play('anagramas', 'Lo que queda detrás de la Y', { rounds: [{ word: 'PAPAA' }] },
          'Detrás de la Y van P, A, P, A, A: $\\tfrac{5!}{3! \\cdot 2!} = \\tfrac{120}{12} = 10$.', { hint: 'Las mismas letras repetidas de antes.' }),
        hints: ['Sin la Y, ¿qué letras se siguen repitiendo y cuántas veces?', 'Quedan tres A y dos P: el denominador vuelve a ser 3! · 2!.'],
        note: 'Empiezan por Y: 5! ÷ (3! · 2!) = 10' },
    ],
    answer: 'PAPAYA se ordena de 60 maneras, y 10 de ellas empiezan por Y.',
    wrap: 'Con objetos repetidos, cuenta como si todos fueran distintos (n!) y divide por las veces que se cuenta cada arreglo: k! por cada objeto que se repite k veces. Si una posición está fija, se ordena solo el resto.',
  },
  {
    id: 'gym-comite', after: ['pu-co-3'], level: 3,
    title: 'El comité del curso', strategy: 'Elegir es ordenar «sí» y «no»',
    problem: 'De 7 estudiantes se va a elegir un comité de 3 personas, sin cargos (da igual en qué orden se elijan). ¿Cuántos comités distintos se pueden formar?',
    steps: [
      { title: 'Primero con orden', coach: 'Empieza por lo fácil: cuenta como si importara el orden (presidente, secretario, vocal). Es el principio de las casillas, y nadie puede ocupar dos puestos.',
        ex: play('placas-codigo', 'Si importara el orden', { rounds: [{ ask: '¿Cuántas listas ordenadas hay?', slots: ['1.º', '2.º', '3.º'], rule: '7 personas; nadie ocupa dos puestos.', want: [7, 6, 5], tray: [7, 7, 6, 5, 4] }] },
          'Con orden: $7 \\cdot 6 \\cdot 5 = 210$ listas.', { hint: 'Cada puesto tiene una persona menos para escoger.' }),
        hints: ['¿Cuántas personas quedan para el segundo puesto si el primero ya está ocupado?', 'Las casillas son 7, 6 y 5.'],
        note: 'Con orden: 7 · 6 · 5 = 210' },
      { title: 'Ahora el orden no importa', coach: 'Un truco potente: un comité es una fila de 7 letras con tres S (sí entra) y cuatro N (no entra). Cada forma de ordenar esas letras es un comité distinto, y las S entre sí, igual que las N, son iguales.',
        ex: play('anagramas', 'Comités como palabras de S y N', { rounds: [{ word: 'SSSNNNN' }] },
          '$\\tfrac{7!}{3! \\cdot 4!} = \\tfrac{5040}{144} = 35$. Es lo mismo que $210 \\div 3!$: cada comité salía 6 veces en la lista con orden.', { hint: 'Las S se repiten 3 veces y las N 4.' }),
        hints: ['En la palabra hay dos letras repetidas: S y N. Pon un factorial por cada una.', 'El denominador es 3! · 4!.'],
        note: 'Sin orden: 7! ÷ (3! · 4!) = 35 (o 210 ÷ 3!)' },
      { title: 'Comprueba con la lista', coach: 'Elegir quién entra es lo mismo que elegir quién se queda por fuera. Compruébalo sin usar el 3: busca en la lista el tamaño de los que se quedan afuera y mira que da la misma cantidad de grupos.',
        ex: play('elige-comite', 'Grupos de 7 personas: los que se quedan afuera', { rounds: [{ n: 7, ways: 35 }] },
          '$C(7, 3) = C(7, 4) = 35$: escoger los 3 que entran es escoger los 4 que no.', { hint: 'Si 3 entran, ¿cuántos se quedan?' }),
        hints: ['Desliza el tamaño del grupo hasta el de los que no entran y mira cuántos grupos lista el juego.', 'De 7, si entran 3 se quedan 4.'],
        note: 'C(7, 3) = C(7, 4) = 35' },
    ],
    answer: 'Se pueden formar 35 comités.',
    wrap: 'Cuando el orden no importa, cuenta primero con orden y divide por las formas de ordenar a los elegidos; o piensa el grupo como una palabra de «sí» y «no». Escoger los que entran es lo mismo que escoger los que no: C(n, k) = C(n, n − k).',
  },
];

// Mundos del curso con retos: [{ unit, ui, retos }] en el orden del curso. Un reto va en el primer mundo del curso que tiene
// alguna de sus lecciones `after`.
function gymRetos(c) {
  const out = [], seen = new Set();
  c.units.forEach((u, ui) => {
    const ids = new Set(u.lessons.map(l => l.id));
    const retos = GYM_RETOS.filter(r => !seen.has(r.id) && r.after.some(id => ids.has(id)));
    retos.forEach(r => seen.add(r.id));
    if (retos.length) out.push({ unit: u, ui, retos });
  });
  return out;
}
const gymOpen = (r, done, unlockAll) => !!unlockAll || r.after.some(id => !!(done || {})[id]);
// helps: ayudas usadas en cada paso (3 = se mostró la solución del paso).
const gymStars = helps => (helps.some(h => h >= 3) ? 1 : helps.some(h => h > 0) ? 2 : 3);
const gymLevel = n => `<span class="gym-lvl" aria-label="Nivel ${n} de 3">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}</span>`;
const gymStarsHTML = n => `<span class="gym-stars" aria-label="${n} de 3 estrellas">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}">★</i>`).join('')}</span>`;

// ---- pestaña Gimnasio ----
function renderGym() {
  const c = courseById(S.course), groups = gymRetos(c), mine = S.gym || {};
  const head = `<header class="tu-head"><h1>Gimnasio</h1>
    <p class="muted">Retos un poco más difíciles que los de las lecciones. Un entrenador te sugiere el procedimiento paso a paso y te ayuda si te equivocas. Aquí no pierdes vidas.</p></header>`;
  if (!groups.length) {
    const others = cursosVisibles().filter(o => o.id !== c.id && gymRetos(o).length);
    view.innerHTML = `<div class="gym tutorias">${head}
      <section class="card gym-empty"><h3>${esc(c.name)} aún no tiene retos</h3>
        <p class="muted">Por ahora el Gimnasio entrena proporciones y porcentajes. Pronto llegan retos para más mundos.</p>
        ${others.length ? `<div class="course-list">${others.map(o => `<button class="course-row" data-course="${o.id}" style="--c:${o.color}">${courseArt(o, 'lg')}
          <span class="cr-body"><b>${esc(o.name)}</b><small>${gymRetos(o).reduce((n, g) => n + g.retos.length, 0)} retos</small></span>${ICON.right}</button>`).join('')}</div>` : ''}
      </section></div>`;
    view.querySelectorAll('[data-course]').forEach(b => b.onclick = () => { S.course = b.dataset.course; save(); go('gym'); });
    return;
  }
  const total = groups.reduce((n, g) => n + g.retos.length, 0), done = groups.reduce((n, g) => n + g.retos.filter(r => mine[r.id]).length, 0);
  view.innerHTML = `<div class="gym tutorias" style="--c:${c.color}">${head}
    <p class="gym-count">${courseArt(c, 'sm')}<span><b>${esc(c.name)}</b> · ${done} de ${total} retos superados</span></p>
    ${groups.map(g => {
      const w = WORLDS[g.unit.world] || { name: g.unit.title };
      return `<section class="gym-world"><h2><small>Mundo ${worldNo(c, g.ui)}</small>${esc(w.name)}</h2>
        <div class="gym-list">${g.retos.map(r => {
          const open = gymOpen(r, S.done, S.unlockAll), best = mine[r.id]?.best;
          const key = lessonsOf(c).find(l => r.after.includes(l.id));
          return `<button class="gym-card${open ? '' : ' locked'}${best ? ' done' : ''}" data-reto="${r.id}"${open ? '' : ' aria-disabled="true"'}>
            <span class="gym-card-top">${gymLevel(r.level)}${best ? gymStarsHTML(best) : ''}</span>
            <b>${esc(r.title)}</b>
            <small>${open ? `Estrategia: ${esc(r.strategy)}` : `${ICON.lock || ''}Termina «${esc(key?.title || 'la lección')}» para abrirlo`}</small>
          </button>`;
        }).join('')}</div></section>`;
    }).join('')}
  </div>`;
  view.querySelectorAll('[data-reto]').forEach(b => b.onclick = () => {
    const r = GYM_RETOS.find(x => x.id === b.dataset.reto);
    if (!gymOpen(r, S.done, S.unlockAll)) return toast('Termina la lección de este tema para abrir el reto.');
    startReto(c, r);
  });
}

// ---- un reto guiado ----
function startReto(c, r) {
  setGameCourse(c.id);
  const back = tab;
  cleanup?.(); cleanup = null;
  const helps = r.steps.map(() => 0), notes = [];
  let pos = -1, handle = null, finished = false;

  const ov = $('#overlay');
  ov.innerHTML = `<div class="lesson gym-run" style="--c:${c.color}">
    <div class="lesson-top">
      <button class="icon-btn" data-close aria-label="Salir">${ICON.x}</button>
      <div class="pbar"><i></i></div>
      <span class="tb-stat gym-badge" title="Gimnasio">${ICON.gym}</span>
    </div>
    <div class="lesson-body"></div>
    <div class="lesson-foot"><button class="btn main">Empezar</button></div>
    <div class="feedback" role="status"></div>
  </div>`;
  ov.classList.add('open');
  document.body.classList.add('in-lesson');
  const root = $('.lesson', ov), body = $('.lesson-body', ov), btn = $('.btn.main', ov), fb = $('.feedback', ov), bar = $('.pbar i', ov);

  const teardown = () => { handle?.destroy?.(); handle = null; };
  function close(to) {
    if (!finished && pos >= 0) {
      return ask({ title: '¿Salir del reto?', text: 'Lo que llevas de este reto no se guarda.', ok: 'Salir', cancel: 'Seguir entrenando', danger: true })
        .then(yes => { if (yes && lessonClose === close) { finished = true; close(to); } });
    }
    teardown();
    document.removeEventListener('keydown', onKey);
    ov.classList.remove('open'); ov.innerHTML = '';
    document.body.classList.remove('in-lesson');
    lessonClose = null;
    go(typeof to === 'string' ? to : back);
  }
  lessonClose = close;
  ov.querySelectorAll('[data-close]').forEach(b => { b.onclick = () => close(); });

  const plan = cur => `<ol class="gym-plan">${r.steps.map((s, i) => `<li class="${i < cur ? 'ok' : i === cur ? 'now' : ''}"><span>${i < cur ? ICON.check : i + 1}</span>${esc(s.title)}</li>`).join('')}</ol>`;
  const notebook = () => (notes.length ? `<section class="gym-notes"><h3>Tu cuaderno</h3><ol>${notes.map(n => `<li>${tex(n)}</li>`).join('')}</ol></section>` : '');
  const strat = () => `<div class="gym-strat"><small>Estrategia</small><b>${esc(r.strategy)}</b></div>`;

  function intro() {
    body.className = 'lesson-body';
    body.innerHTML = `<div class="gym-intro">
      <p class="gym-eyebrow">Reto guiado ${gymLevel(r.level)}</p>
      <h2>${esc(r.title)}</h2>
      <div class="gym-problem">${tex(r.problem)}</div>
      ${strat()}
      <h3>El plan</h3>${plan(-1)}
      <p class="muted">El entrenador te acompaña en cada paso. Si te equivocas no pierdes vidas: te da una ayuda y lo vuelves a intentar.</p>
    </div>`;
    btn.textContent = 'Empezar'; btn.disabled = false;
    btn.onclick = () => { pos = 0; step(); };
  }

  function coach(text, label) {
    $('.coach p', body).innerHTML = tex(text);
    $('.coach small', body).textContent = label;
    const k = $('.coach', body); k.classList.remove('nudge'); void k.offsetWidth; k.classList.add('nudge');
  }

  function step() {
    teardown();
    root.classList.remove('fb-open');
    fb.className = 'feedback';
    body.className = 'lesson-body';
    body.style.paddingBottom = '';
    body.scrollTop = 0;
    bar.style.width = `${(pos / r.steps.length) * 100}%`;
    if (pos >= r.steps.length) return finish();
    const s = r.steps[pos];
    const dots = `<span class="gym-dots" aria-label="Paso ${pos + 1} de ${r.steps.length}">${r.steps.map((_, i) => `<i class="${i < pos ? 'ok' : i === pos ? 'now' : ''}"></i>`).join('')}</span>`;
    // Un solo contenedor: mountSketch (kit.js) mide el primer hijo de .lesson-body para achicar el juego si no cabe.
    body.innerHTML = `<div class="gym-step"><details class="gym-reto"><summary><span>El reto</span>${dots}</summary><div>${tex(r.problem)}</div></details>
      <div class="coach" role="note"><span class="coach-av">${ICON.gym}</span><div><small>Paso ${pos + 1} · ${esc(s.title)}</small><p></p></div></div>
      <div class="gym-ex"></div>${notebook()}</div>`;
    coach(s.coach, `Paso ${pos + 1} · ${s.title}`);
    btn.textContent = 'Comprobar'; btn.disabled = true;
    handle = renderExercise($('.gym-ex', body), s.ex, ok => { btn.disabled = !ok; });
    btn.onclick = check;
  }

  function showFb(kind, html, label, then) {
    fb.className = `feedback show ${kind}`;
    fb.innerHTML = `<div class="fb-in">${html}<button class="btn">${label}</button></div>`;
    root.classList.add('fb-open');
    body.style.paddingBottom = `${Math.max(0, fb.offsetHeight - $('.lesson-foot', ov).offsetHeight) + 24}px`;
    const t0 = Date.now();   // un doble toque en «Comprobar» no cierra la ayuda sin leerla
    $('.btn', fb).onclick = () => { if (Date.now() - t0 < 350) return; fb.classList.remove('show'); root.classList.remove('fb-open'); body.style.paddingBottom = ''; then(); };
  }

  function check() {
    const s = r.steps[pos], res = handle.check();
    if (res.ok) {
      handle.lock(true); Sfx.ok();
      notes.push(s.note);
      return showFb('ok', `<div class="fb-head"><span class="fb-icon">${ICON.check}</span><h4>¡Paso logrado!</h4></div>
        ${s.ex.explain ? `<p class="fb-exp">${tex(s.ex.explain)}</p>` : ''}
        <p class="gym-noted"><small>Al cuaderno</small>${tex(s.note)}</p>`, pos + 1 < r.steps.length ? 'Siguiente paso' : 'Ver el resultado', () => { pos++; step(); });
    }
    Sfx.bad();
    helps[pos]++;
    if (helps[pos] <= s.hints.length) {
      const h = s.hints[helps[pos] - 1];
      return showFb('bad', `<div class="fb-head"><span class="fb-icon">${ICON.bulb}</span><h4>Todavía no. Te ayudo</h4></div>
        <p class="fb-exp">${tex(h)}</p>`, 'Intentar de nuevo', () => { btn.disabled = true; coach(h,`Ayuda ${helps[pos]} de ${s.hints.length} · ${s.title}`); });
    }
    handle.lock(false);
    notes.push(s.note);
    showFb('bad', `<div class="fb-head"><span class="fb-icon">${ICON.bulb}</span><h4>Así se resuelve este paso</h4></div>
      <div class="fb-sol">${tex(typeof texify === 'function' ? texify(res.solution) : res.solution)}</div>
      ${s.ex.explain ? `<p class="fb-exp">${tex(s.ex.explain)}</p>` : ''}
      <p class="gym-noted"><small>Al cuaderno</small>${tex(s.note)}</p>`, pos + 1 < r.steps.length ? 'Siguiente paso' : 'Ver el resultado', () => { pos++; step(); });
  }

  function finish() {
    finished = true;
    S.gym ||= {};
    // XP completa la primera vez o al mejorar las estrellas; repetir el mismo resultado da 5.
    const stars = gymStars(helps), prev = S.gym[r.id]?.best || 0, xp = stars > prev ? (stars === 3 ? 15 : 10) : 5;
    S.gym[r.id] = { best: Math.max(prev, stars), at: Date.now() };
    addXP(xp); const newStreak = markStreak(); save();
    bar.style.width = '100%';
    body.innerHTML = `<div class="gym-done"><canvas class="confetti"></canvas>
      <h2>${stars === 3 ? '¡Reto superado sin ayudas!' : '¡Reto superado!'}</h2>
      <p class="muted">${esc(r.title)}</p>
      <div class="gym-done-stats">${gymStarsHTML(stars)}<b>${ICON.bolt}+${xp} XP</b></div>
      <div class="gym-answer"><small>Respuesta</small><p>${tex(r.answer)}</p></div>
      ${strat()}
      <p class="gym-wrap">${tex(r.wrap)}</p>
      <section class="gym-notes"><h3>Tu procedimiento</h3><ol>${notes.map(n => `<li>${tex(n)}</li>`).join('')}</ol></section>
      ${newStreak ? `<p class="streak-up">${ICON.flame} ¡Racha de ${S.streak} ${S.streak === 1 ? 'día' : 'días'}!</p>` : ''}
    </div>`;
    btn.textContent = 'Volver al gimnasio'; btn.disabled = false; btn.onclick = () => close();
    Sfx.win();
    requestAnimationFrame(() => confetti($('.confetti', body)));
  }

  function onKey(e) {
    if (e.key !== 'Enter' || e.target.closest?.('input, textarea')) return;
    const target = fb.classList.contains('show') ? $('.btn', fb) : !btn.disabled && btn;
    // Enter sobre otro control (la X, «El reto», «Ver pista»…) hace lo suyo, no comprueba.
    if (e.target !== target && e.target.closest?.('button, summary, a, details')) return;
    if (target) { e.preventDefault(); target.click(); }
  }
  document.addEventListener('keydown', onKey);
  intro();
}
