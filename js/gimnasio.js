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

  // ---- Aritmética y promedios (Preuniversitario mundo 12) ----
  {
    id: 'gym-prima', after: ['pu-ar-1'], level: 2,
    title: 'La prima de Laura', strategy: 'Lo que queda, y luego de atrás hacia adelante',
    problem: 'Laura recibe una prima. Gasta $\\tfrac13$ en ropa y después $\\tfrac34$ de lo que le quedó en un viaje. Al final le quedan 100 000 pesos. ¿De cuánto era la prima?',
    steps: [
      { title: 'Qué parte sobrevive', coach: 'Cada gasto es una fracción de lo que había en ese momento, no del total. Antes de pensar en pesos, mira qué parte de la prima sobrevive a los dos gastos.',
        ex: play('area-queda', 'La parte de la prima que queda', { rounds: [{ a: [1, 3], b: [3, 4] }] },
          'Tras la ropa queda $\\tfrac23$; el viaje se lleva $\\tfrac34$ de eso y deja $\\tfrac14$: $\\tfrac23 \\cdot \\tfrac14 = \\tfrac16$.', { hint: 'Pinta lo que queda, no lo que se gasta.' }),
        hints: ['Pinta lo que queda tras la ropa y, de eso, lo que queda tras el viaje.', 'Quedan dos de las tres columnas y una de las cuatro filas.'],
        note: 'Queda 2/3 · 1/4 = 1/6 de la prima' },
      { title: 'Vuelve al principio', coach: 'Ya sabes qué fracción de la prima es lo que le quedó. Ahora piensa al revés: ¿de qué número es lo que quedó esa fracción? Deshacer una fracción es multiplicar por su inverso.',
        ex: play('total-original', '¿De cuánto era la prima?', { rounds: [{ steps: [[1, 3, 'total'], [3, 4, 'resto']], left: 100000, step: 50000, max: 800000 }] },
          'Lo que queda es $\\tfrac16$ de la prima: $100\\,000 \\cdot 6 = 600\\,000$.', { hint: '¿Cuántas veces cabe lo que queda en la prima?' }),
        hints: ['Si lo que queda es una parte de la prima, ¿cuántas de esas partes caben en la prima entera?', 'Lo que queda es la sexta parte: multiplica por 6.'],
        note: 'Prima: 100 000 ÷ (1/6) = 100 000 · 6 = 600 000' },
      { title: 'Comprueba hacia adelante', coach: 'Con la prima que hallaste, corta cada gasto sobre lo que quedaba en ese momento y mira si al final sobra justo lo que dice el enunciado.',
        ex: play('corta-lo-que-queda', 'Los gastos de la prima, uno tras otro', { rounds: [{ total: 600000, steps: [[1, 3, 'total'], [3, 4, 'resto']] }] },
          'Ropa: $600\\,000 \\div 3 = 200\\,000$, quedan $400\\,000$. Viaje: $\\tfrac34$ de $400\\,000$ son $300\\,000$, quedan $100\\,000$. Cuadra.', { hint: 'La segunda fila se parte sobre lo que quedó.' }),
        hints: ['La primera fila se parte en tercios de la prima; la segunda, en cuartos de lo que quedó.', 'Corta 1 de 3 partes y luego 3 de 4.'],
        note: 'Comprobación: ropa 200 000, viaje 300 000, y quedan los del enunciado' },
    ],
    answer: 'La prima era de 600 000 pesos.',
    wrap: 'Cuando cada gasto es una fracción de lo que queda, multiplica las fracciones que quedan para saber qué parte del total sobrevive. Para volver al principio, divide lo que queda entre esa fracción, y comprueba haciendo el camino hacia adelante.',
  },
  {
    id: 'gym-examen', after: ['pu-ar-2'], level: 2,
    title: 'El quinto examen', strategy: 'Promedio × cantidad = suma',
    problem: 'Juan lleva cuatro exámenes con notas 2.5, 4.5, 3.0 y 4.0. ¿Cuál es su promedio? ¿Cuánto debe sacar en el quinto examen para que su promedio suba a 3.7?',
    steps: [
      { title: 'El promedio es nivelar', coach: 'El promedio es la altura a la que quedarían todas las barras si se nivelaran: lo que le sobra a las altas llena exactamente lo que les falta a las bajas.',
        ex: play('nivela-datos', 'Nivela las cuatro notas', { rounds: [{ data: [2.5, 4.5, 3, 4], hi: 5, step: 1 }] },
          'Las notas suman 14 y son 4: $14 \\div 4 = 3.5$. Por encima sobran $1 + 0.5 = 1.5$ y por debajo faltan $1 + 0.5 = 1.5$: se compensan.', { hint: 'Que sobre por arriba lo mismo que falta por abajo.' }),
        hints: ['Mueve la línea hasta que lo que sobresale por encima sea igual a lo que falta por debajo.', 'Suma las cuatro notas y divide entre 4.'],
        note: 'Promedio: (2.5 + 4.5 + 3 + 4) ÷ 4 = 14 ÷ 4 = 3.5' },
      { title: 'Convierte el promedio en suma', coach: 'No promedies promedios: el promedio guarda la suma. Con cinco exámenes y el promedio que quiere, la suma de las cinco notas queda fija; el quinto examen debe aportar lo que falte.',
        ex: play('dato-faltante', 'La nota del quinto examen', { rounds: [{ data: [2.5, 4.5, 3, 4, null], mean: 3.7, hi: 5, step: 0.5 }] },
          'Con promedio 3.7 en cinco exámenes, la suma es $3.7 \\cdot 5 = 18.5$. Ya tiene 14: le faltan $18.5 - 14 = 4.5$.', { hint: 'Promedio por cantidad da la suma.' }),
        hints: ['Multiplica el promedio que quiere por la cantidad de exámenes: esa es la suma que necesita.', 'Necesita una suma de 18.5 y ya tiene 14.'],
        note: 'Suma necesaria: 3.7 · 5 = 18.5; el quinto: 18.5 − 14 = 4.5' },
    ],
    answer: 'Su promedio es 3.5, y necesita 4.5 en el quinto examen.',
    wrap: 'El promedio guarda la suma: suma = promedio × cantidad. Para hallar un dato que falta, calcula la suma que pide el promedio deseado y resta lo que ya hay. Promediar es nivelar: lo que sobra arriba llena lo que falta abajo.',
  },
  {
    id: 'gym-peor', after: ['pu-ar-4'], level: 3,
    title: 'Bolas y dulces', strategy: 'Pensar en el caso extremo',
    problem: 'En una bolsa oscura hay 6 bolas rojas, 4 azules y 3 verdes. ¿Cuántas hay que sacar sin mirar para estar seguros de tener 2 del mismo color? ¿Y para tener 2 rojas? Después se reparten 18 dulces entre 4 niños: cada uno recibe al menos uno y todos cantidades distintas. ¿Cuánto es lo máximo que puede recibir uno? ¿Y lo menos que puede recibir el que más recibe?',
    steps: [
      { title: 'Gánale a la peor suerte', coach: 'Estar seguro es ganarle a la peor suerte. Imagina que la bolsa se empeña en no darte lo que pides: ¿cuántas puedes sacar sin que se cumpla? Una más ya lo asegura. Son dos pestañas: dos iguales y dos rojas.',
        ex: play('peor-caso-bolsa', 'Para estar seguros', { rounds: [{ bag: [['coral', 6], ['sky', 4], ['mint', 3]], kind: 'iguales', k: 2 }, { bag: [['coral', 6], ['sky', 4], ['mint', 3]], kind: 'color', k: 2, color: 'coral' }] },
          'Dos iguales: la peor suerte saca una de cada color (3); la cuarta repite. Dos rojas: la peor suerte saca antes las 7 azules y verdes y una roja; la siguiente asegura: $4 + 3 + 2 = 9$.', { hint: '¿Cuántas puedes sacar SIN que se cumpla?' }),
        hints: ['Para dos iguales, la peor suerte saca una de cada color antes de repetir. Para dos rojas, saca antes todas las de otros colores.', 'Dos iguales: 3 + 1. Dos rojas: 4 + 3 + 2.'],
        note: 'Dos iguales: 3 + 1 = 4. Dos rojas: 4 + 3 + 2 = 9' },
      { title: 'Lleva el reparto al extremo', coach: 'Para que uno reciba lo más posible, los demás reciben lo menos que pueden (al menos uno), sin repetir cantidades. Para que el que más recibe tenga lo menos posible es al revés: lo más parejo que permitan las cantidades distintas. Son dos pestañas.',
        ex: play('reparto-extremo', 'Repartos con extremos', { rounds: [{ n: 4, total: 18, ask: 'max' }, { n: 4, total: 18, ask: 'minmax' }] },
          'Máximo: los otros tres reciben 1, 2 y 3, y le quedan $18 - 6 = 12$. Menor máximo: cantidades seguidas, $6 + 5 + 4 + 3 = 18$; con 5 no alcanza, porque $5 + 4 + 3 + 2 = 14$ no llega a 18.', { hint: 'Los demás tienen que ser distintos.' }),
        hints: ['Los otros tres reciben lo mínimo con cantidades distintas: empieza en 1. Para lo más parejo, prueba cantidades seguidas.', 'Máximo: 18 − (1 + 2 + 3). Menor máximo: 6 + 5 + 4 + 3.'],
        note: 'Máximo: 18 − (1 + 2 + 3) = 12; menor máximo: 6 + 5 + 4 + 3 = 18 → 6' },
    ],
    answer: 'Hay que sacar 4 bolas para tener dos del mismo color y 9 para tener dos rojas. En el reparto, uno puede recibir hasta 12 dulces, y lo menos que puede recibir el que más recibe es 6.',
    wrap: 'En los problemas de «estar seguro» o de «lo máximo / lo mínimo», imagina el caso extremo: la peor suerte posible, o que los demás reciben lo menos que pueden. Lo que se resuelve en ese extremo es la respuesta.',
  },

  // ---- Azar y probabilidad (Preuniversitario mundo 16) ----
  {
    id: 'gym-dados', after: ['pu-pb-2'], level: 2,
    title: 'Dos dados', strategy: 'Contar lo contrario y no contar dos veces',
    problem: 'Se lanzan dos dados. ¿Qué probabilidad hay de que el producto de los dos sea mayor que 6? ¿Y de que la suma sea 7 o salga algún 6?',
    steps: [
      { title: 'Cuenta lo contrario', coach: 'Los 36 resultados de la tabla son igual de probables. El juego mide lo contrario de lo que se pregunta: marca los que NO cumplen (producto 6 o menos), que son menos y están juntos, y al final réstalos de todos.',
        ex: play('tabla-dados', 'Lo contrario: producto 6 o menos', { rounds: [{ say: 'el producto es 6 o menos', f: (a, b) => a * b <= 6 }] },
          'Con el 1 sirven los seis; con el 2, del 1 al 3; con el 3, el 1 y el 2; con 4, 5 o 6, solo el 1: $6 + 3 + 2 + 1 + 1 + 1 = 14$. Producto mayor que 6: $1 - \\tfrac{14}{36} = \\tfrac{22}{36} = \\tfrac{11}{18}$.', { hint: 'Recorre fila por fila: ¿hasta qué número del otro dado sirve?' }),
        hints: ['Recorre fila por fila: si el primer dado es 1, sirven todos; si es más grande, sirven menos.', 'Fila 1: seis casillas; fila 2: tres; fila 3: dos; filas 4, 5 y 6: una cada una.'],
        note: 'Producto ≤ 6: 14 de 36; producto > 6: 1 − 14/36 = 22/36 = 11/18' },
      { title: '«O»: no cuentes dos veces', coach: 'Para «A o B» se cuentan las casillas que cumplen alguna de las dos. Si una casilla cumple las dos a la vez, al sumar los dos grupos queda contada dos veces: hay que descontarla.',
        ex: play('tabla-dados', 'Suma 7 o algún 6', { rounds: [{ say: 'la suma es 7 o sale algún 6', f: (a, b) => a + b === 7 || a === 6 || b === 6 }] },
          'Suma 7: 6 casillas. Algún 6: 11 (la fila y la columna del 6, que comparten el (6, 6)). Las dos a la vez: (1, 6) y (6, 1). Total: $6 + 11 - 2 = 15$, así que $\\tfrac{15}{36} = \\tfrac{5}{12}$.', { hint: 'La suma 7 es una diagonal; «algún 6» es una fila y una columna.' }),
        hints: ['Marca la diagonal de la suma 7 y la fila y la columna del 6. ¿Qué casillas están en las dos?', 'Se cruzan en (1, 6) y (6, 1).'],
        note: 'Suma 7 (6) + algún 6 (11) − las dos (2) = 15 de 36 = 5/12' },
    ],
    answer: 'El producto es mayor que 6 con probabilidad $\\tfrac{11}{18}$, y la suma es 7 o sale algún 6 con probabilidad $\\tfrac{5}{12}$.',
    wrap: 'Con resultados igual de probables, P = casos favorables ÷ casos posibles. Si lo pedido abarca casi todo, cuenta lo contrario y réstalo de 1. En un «o», suma los casos y descuenta los que se cuentan dos veces.',
  },
  {
    id: 'gym-urna', after: ['pu-pb-2'], level: 3,
    title: 'La urna con devolución', strategy: 'El árbol multiplica por camino y suma caminos',
    problem: 'En una urna hay 8 bolas azules. ¿Cuántas rojas hay que echar para que la probabilidad de sacar una roja sea $\\tfrac37$? Con esa urna se saca una bola, se mira, se devuelve y se saca otra. ¿Qué probabilidad hay de que las dos sean del mismo color? ¿Y de sacar al menos una roja?',
    steps: [
      { title: 'Arma la urna', coach: 'La probabilidad es rojas ÷ total, y el total también crece con cada roja que echas. Piensa en la urna por grupos de 7: de cada 7 bolas, cuántas deben ser rojas y cuántas azules.',
        ex: play('urna-fraccion', 'Rojas para que $P = \\tfrac37$', { rounds: [{ color: 'coral', others: [['sky', 8]], target: [3, 7] }] },
          'Con $k$ rojas: $\\tfrac{k}{k + 8} = \\tfrac37$, así que $7k = 3k + 24$ y $k = 6$: 6 rojas de 14.', { hint: 'Con k rojas, el total es k + 8: ¿qué parte es k?' }),
        hints: ['Si las rojas son 3 de cada 7 bolas, las azules son las otras 4 de cada 7.', 'Por cada 4 azules van 3 rojas, y hay 8 azules: dos grupos.'],
        note: 'k ÷ (k + 8) = 3/7 → 7k = 3k + 24 → 6 rojas' },
      { title: 'Recorre el árbol', coach: 'Como la bola se devuelve, la segunda sacada no depende de la primera. Cada camino del árbol multiplica sus ramas; marca los caminos que sirven y suma sus probabilidades. Son dos pestañas.',
        ex: play('arbol-caminos', 'Dos sacadas con devolución', { rounds: [
          { steps: [[['R', 3, 7], ['A', 4, 7]], [['R', 3, 7], ['A', 4, 7]]], say: 'las dos son del mismo color', f: pa => pa[0] === pa[1] },
          { steps: [[['R', 3, 7], ['A', 4, 7]], [['R', 3, 7], ['A', 4, 7]]], say: 'sale al menos una roja', f: pa => pa.includes(0) },
        ] }, 'Mismo color: $\\tfrac37 \\cdot \\tfrac37 + \\tfrac47 \\cdot \\tfrac47 = \\tfrac{9}{49} + \\tfrac{16}{49} = \\tfrac{25}{49}$. Al menos una roja: todos menos azul-azul, $1 - \\tfrac{16}{49} = \\tfrac{33}{49}$.', { hint: 'Cada camino es una pareja de colores.' }),
        hints: ['«Mismo color» son dos caminos. Para «al menos una roja», piensa qué camino no tiene ninguna.', 'El único camino sin rojas es azul-azul.'],
        note: 'Mismo color: 9/49 + 16/49 = 25/49; al menos una roja: 1 − 16/49 = 33/49' },
    ],
    answer: 'Hay que echar 6 rojas. Mismo color: $\\tfrac{25}{49}$. Al menos una roja: $\\tfrac{33}{49}$.',
    wrap: 'Para dos sacadas, dibuja el árbol: la probabilidad de un camino es el producto de sus ramas y la de un suceso es la suma de sus caminos. «Al menos uno» suele ser más corto como 1 menos el camino donde no pasa nada.',
  },
  {
    id: 'gym-adivina', after: ['pu-pb-2'], level: 2,
    title: 'Adivinar el examen', strategy: 'Al menos uno = 1 − ninguno',
    problem: 'Un examen tiene 3 preguntas, cada una con 4 opciones y una sola correcta. Pedro no estudió y responde todas al azar. ¿Qué probabilidad tiene de acertar al menos una? ¿Y de acertar al menos dos?',
    steps: [
      { title: 'Cuenta todas y las de ningún acierto', coach: 'Primero cuenta las formas de responder: una casilla por pregunta. Luego cuenta las formas de fallar todas (en cada pregunta, solo valen las opciones malas). La resta son las que aciertan al menos una.',
        ex: play('complemento-conteo', 'Respuestas con al menos un acierto', { rounds: [{ ask: 'Formas de responder con al menos un acierto', slots: ['preg. 1', 'preg. 2', 'preg. 3'], all: [4, 4, 4], none: [3, 3, 3], tray: [4, 3, 2, 1] }] },
          'Todas: $4^3 = 64$. Sin ningún acierto: $3^3 = 27$. Con al menos uno: $64 - 27 = 37$.', { hint: 'Fallar una pregunta deja las opciones malas.' }),
        hints: ['Arriba, cuántas opciones tiene cada pregunta. Abajo, cuántas de esas son malas.', 'Arriba 4, 4, 4; abajo 3, 3, 3.'],
        note: 'Todas 4³ = 64; ninguna buena 3³ = 27; al menos una: 64 − 27 = 37 de 64' },
      { title: 'Al menos dos, en el árbol', coach: 'B es acertar (1 de 4) y M fallar (3 de 4). «Al menos dos» ya no es todo menos un camino: marca los caminos con dos o tres B y suma lo que vale cada uno.',
        ex: play('arbol-caminos', 'Tres preguntas al azar', { rounds: [{ steps: [[['B', 1, 4], ['M', 3, 4]], [['B', 1, 4], ['M', 3, 4]], [['B', 1, 4], ['M', 3, 4]]], say: 'acierta al menos dos', f: pa => pa.filter(i => i === 0).length >= 2 }] },
          'Con dos aciertos hay tres caminos (B‑B‑M, B‑M‑B, M‑B‑B), cada uno $\\tfrac14 \\cdot \\tfrac14 \\cdot \\tfrac34 = \\tfrac{3}{64}$; con tres, B‑B‑B: $\\tfrac{1}{64}$. Total: $\\tfrac{9}{64} + \\tfrac{1}{64} = \\tfrac{10}{64} = \\tfrac{5}{32}$.', { hint: 'Cuenta las B de cada camino.' }),
        hints: ['Recorre cada camino y cuenta cuántas B tiene: sirven los de dos o tres.', 'Son cuatro caminos: tres con dos B y el de tres B.'],
        note: 'Dos aciertos: 3 · 3/64 = 9/64; tres: 1/64; al menos dos: 10/64 = 5/32' },
    ],
    answer: 'Acierta al menos una con probabilidad $\\tfrac{37}{64}$, un poco más de la mitad; al menos dos, solo $\\tfrac{5}{32}$.',
    wrap: 'Cuando piden «al menos uno», calcula la probabilidad de «ninguno» (un solo caso: fallar todo) y réstala de 1. Cuando piden «al menos dos», ese atajo ya no basta: en el árbol, cada camino multiplica sus ramas y se suman los caminos que sirven.',
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
const gymStarsHTML = n => `<span class="gym-stars" aria-label="${n} de 3 estrellas">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}">★</i>`).join('')}</span>`;

// ---- Gimnasio cerebral por niveles (spec 2026-11-19-gimnasio-niveles) ----
const GYM_LEVELS = [
  { n: 1, name: 'Calentamiento', desc: 'Juegos de tus lecciones para entrar en calor. Cambian cada vez que repites.' },
  { n: 2, name: 'Fuerza', desc: 'Retos guiados un poco más difíciles que las lecciones. El entrenador te sugiere cada paso.' },
  { n: 3, name: 'Élite', desc: 'Los retos más exigentes: varios pasos y una estrategia completa.' },
];
// Barra con n discos por lado (más discos, más peso). Colores con --lc (el del nivel).
function gymPlates(n) {
  const p = [];
  for (let i = 0; i < n; i++) {
    const h = 20 - i * 5, y = 12 - h / 2;
    p.push(`<rect class="gp-plate" x="${15 - i * 5}" y="${y}" width="3.6" height="${h}" rx="1.4"/>`, `<rect class="gp-plate" x="${29.4 + i * 5}" y="${y}" width="3.6" height="${h}" rx="1.4"/>`);
  }
  return `<svg class="gym-plates" viewBox="0 0 48 24" aria-hidden="true"><rect class="gp-bar" x="2" y="10.6" width="44" height="2.8" rx="1.4"/>${p.join('')}</svg>`;
}
// Juegos que no van en el calentamiento: los de evaluación y, si hay otros, los «aburridos» (CLAUDE.md).
const GYM_NO_WARM = new Set(['pregunta-examen', 'laberinto-valor', 'domino-equivalencias', 'piramide-numerica', 'detective-pasos']);
const GYM_DULL = new Set(['arma-la-cuenta', 'escala-solucion', 'une-parejas', 'clasifica-cartas', 'ordena-terminos']);
// Calentamiento del mundo ui: tres juegos de las lecciones hechas (todas en modo revisión), intercalados por lección; n = veces
// superado, así al repetirlo salen otros.
function gymWarmup(c, ui, done, unlockAll, n = 0) {
  const u = c.units[ui], w = (typeof WORLDS !== 'undefined' && WORLDS[u.world]) || { name: u.title };
  const ls = u.lessons.filter(l => unlockAll || (done || {})[l.id]);
  const pick = ok => ls.map(l => l.ex.filter(e => e.type === 'play' && !GYM_NO_WARM.has(e.game) && ok(e)).map(ex => ({ l, ex })));
  let pools = pick(e => !GYM_DULL.has(e.game));
  if (!pools.some(p => p.length)) pools = pick(() => true);
  const flat = [];
  for (let k = 0; pools.some(p => p[k]); k++) pools.forEach(p => p[k] && flat.push(p[k]));
  // tres juegos distintos; al repetir, otros (o, si no hay más de tres, en otro orden)
  const start = flat.length > 3 ? n * 3 : n, steps = [], games = new Set(), seen = {};
  for (let i = 0; i < flat.length && steps.length < 3; i++) {
    const { l, ex } = flat[(start + i) % flat.length];
    if (games.has(ex.game)) continue;
    games.add(ex.game);
    seen[l.id] = (seen[l.id] || 0) + 1;
    let first = String(ex.explain || '').split(/\.\s/)[0];
    if ((first.match(/\$/g) || []).length % 2) first = '';   // no cortar dentro de una fórmula
    steps.push({
      title: seen[l.id] > 1 ? `${l.title} (${seen[l.id]})` : l.title,
      coach: `Calentamiento con «${l.title}». Antes de mover nada, recuerda la idea del video y lee bien qué pide el enunciado.`,
      hints: [ex.hint || 'Lee el enunciado otra vez: ¿qué te pide exactamente?', `La idea está en el video de «${l.title}»: piensa cómo la usaba allí.`],
      note: first && first.length <= 180 ? `«${l.title}»: ${first.replace(/\.$/, '')}.` : `Repasaste «${l.title}».`,
      ex,
    });
  }
  return {
    id: `cal-${c.id}-${ui}`, level: 1, warm: true, ui, after: u.lessons.map(l => l.id), open: steps.length > 0,
    title: `Calentamiento · ${w.name}`, strategy: 'Recuerda la idea del video antes de mover nada.',
    problem: 'Tres juegos de las lecciones que ya hiciste en este mundo, para entrar en calor antes de los retos.',
    answer: '', wrap: 'Ya calentaste. Cuando quieras, sube a Fuerza: retos más largos con el entrenador a tu lado.', steps,
  };
}
// Un reto guiado o un calentamiento por su id.
function gymFind(c, id, done, unlockAll, mine) {
  if (done === undefined && typeof S !== 'undefined') ({ done, unlockAll, gym: mine } = S);
  mine ||= {};
  const m = /^cal-.+-(\d+)$/.exec(id);
  if (m) return c.units[+m[1]] ? gymWarmup(c, +m[1], done, unlockAll, mine[id]?.n || 0) : undefined;
  return GYM_RETOS.find(r => r.id === id);
}
// Mundos del componente de ui hasta ui o hasta el último donde ya hizo alguna lección (si se adelantó), en orden.
function gymUpTo(c, ui, done = {}) {
  const same = c.units.map((u, i) => i).filter(i => c.units[i].block === c.units[ui]?.block);
  const top = Math.max(ui, ...same.filter(i => c.units[i].lessons.some(l => done[l.id])));
  return same.filter(i => i <= top);
}
// Tu nivel: calentar el mundo, luego el primer reto de Fuerza sin superar, luego Élite; todo superado: calentar.
function gymRecommend(c, ui, done, unlockAll, mine = {}) {
  const near = gymUpTo(c, ui, done || {}).reverse();
  const warmOf = i => gymWarmup(c, i, done, unlockAll, mine[`cal-${c.id}-${i}`]?.n || 0);
  const mineW = warmOf(ui);
  // si su mundo aún no tiene lecciones hechas, el calentamiento abierto más cercano
  const warm = mineW.open ? mineW : near.map(warmOf).find(w => w.open) || mineW;
  if (warm.open && !mine[warm.id]) return { level: 1, item: warm };
  const groups = gymRetos(c).filter(g => near.includes(g.ui)).sort((a, b) => b.ui - a.ui);
  for (const lv of [2, 3]) {
    const r = groups.flatMap(g => g.retos).find(x => x.level === lv && gymOpen(x, done, unlockAll) && !mine[x.id]);
    if (r) return { level: lv, item: r };
  }
  return { level: 1, item: warm };
}

// gymFocus: curso, mundo del nivel del estudiante y nivel elegido; lo pone el botón de las pesas.
let gymFocus = null;

function renderGym() {
  const c = courseById(S.course), mine = S.gym || {};
  const ui = gymFocus?.course === c.id && c.units[gymFocus.ui] ? gymFocus.ui : courseLevelUi(c, null, { done: S.done, last: S.lastLesson });
  const rec = gymRecommend(c, ui, S.done, S.unlockAll, mine);
  const lvl = gymFocus?.course === c.id && gymFocus.lvl ? gymFocus.lvl : rec.level;
  gymFocus = { course: c.id, ui, lvl };
  const u = c.units[ui], blockName = c.blocks?.find(b => b.id === u.block)?.name;
  const worlds = gymUpTo(c, ui, S.done || {}), block = c.units.map((x, i) => i).filter(i => c.units[i].block === u.block);
  const warms = worlds.map(i => gymWarmup(c, i, S.done, S.unlockAll, mine[`cal-${c.id}-${i}`]?.n || 0)).filter(w => w.open || w.ui === ui);
  const groups = gymRetos(c).filter(g => block.includes(g.ui));
  const byLevel = lv => (lv === 1 ? warms : groups.flatMap(g => g.retos).filter(r => r.level === lv));
  const isOpen = r => (r.warm ? r.open : gymOpen(r, S.done, S.unlockAll));
  const all = [1, 2, 3].flatMap(byLevel), passed = all.filter(r => mine[r.id]).length;
  const stars = all.reduce((t, r) => t + (mine[r.id]?.best || 0), 0);
  const wName = i => (WORLDS[c.units[i].world] || { name: c.units[i].title }).name;

  const item = r => {
    const open = isOpen(r), best = mine[r.id]?.best, key = !r.warm && lessonsOf(c).find(l => r.after.includes(l.id));
    const sub = open ? (r.warm ? `${r.steps.length} juegos de tus lecciones` : `Estrategia: ${esc(r.strategy)}`)
      : r.warm ? 'Haz una lección de este mundo para abrirlo' : `Termina «${esc(key?.title || 'la lección')}» para abrirlo`;
    return `<button class="gym-item lv${r.level}${open ? '' : ' locked'}${best ? ' done' : ''}" data-reto="${r.id}"${open ? '' : ' aria-disabled="true"'}>
      <span class="gi-ic">${gymPlates(r.level)}</span>
      <span class="gi-body"><b>${esc(r.warm ? wName(r.ui) : r.title)}</b><small>${open ? '' : ICON.lock}${sub}</small></span>
      <span class="gi-end">${best ? gymStarsHTML(best) : open ? ICON.right : ''}</span></button>`;
  };
  const section = (i, items) => `<section class="gym-world"><h2><small>Mundo ${worldNo(c, i)}${i === ui ? '<span class="gw-here">Tu mundo</span>' : ''}</small>${esc(wName(i))}</h2>
    <div class="gym-list">${items.map(item).join('')}</div></section>`;
  const list = lvl === 1 ? `<div class="gym-list">${warms.slice().reverse().map(item).join('')}</div>`
    : (() => {
      const gs = groups.map(g => ({ ui: g.ui, retos: g.retos.filter(r => r.level === lvl) })).filter(g => g.retos.length);
      return gs.length ? gs.map(g => section(g.ui, g.retos)).join('')
        : `<div class="gym-soon lv${lvl}">${mascotSVG('think', 'm-soon')}<p><b>Pronto llegan retos de este nivel</b> a ${esc(blockName || c.name)}. Mientras tanto, calienta con los juegos de tus lecciones.</p>
          <button class="btn ghost" data-lv="1">Ir al calentamiento</button></div>`;
    })();
  const t = rec.item, tOpen = isOpen(t), L = GYM_LEVELS[rec.level - 1];

  view.innerHTML = `<div class="gym" style="${gymFabColors(c)}">
    <button class="world-back" data-back-course>${ICON.back}<span>Volver al curso</span></button>
    <header class="gym-hero">
      <div class="gh-art">${GYM_3D}</div>
      <p class="gh-eyebrow">${esc(c.name)}${blockName ? ` · ${esc(blockName)}` : ''}</p>
      <h1>Gimnasio cerebral</h1>
      <p class="gh-sub">Entrena tu mente por niveles. Aquí no pierdes vidas: el entrenador te ayuda si te equivocas.</p>
      <div class="gh-stats">
        <span><b>${passed}<small>/${all.length}</small></b>superados</span>
        <span><b><i class="gh-star">★</i>${stars}</b>estrellas</span>
        <span class="lv${rec.level}"><b>${gymPlates(rec.level)}</b>tu nivel: ${rec.level}</span>
      </div>
    </header>
    <section class="gym-today lv${rec.level}">
      <p class="gt-eyebrow">Tu entrenamiento de hoy · Nivel ${rec.level}, ${L.name}</p>
      <div class="gt-row"><span class="gt-ic">${gymPlates(rec.level)}</span>
        <div><h2>${esc(t.title)}</h2><p>${tOpen ? esc(t.warm ? t.problem : `Estrategia: ${t.strategy}`) : 'Haz la primera lección de este mundo y vuelve a calentar.'}</p></div></div>
      ${tOpen ? `<button class="btn" data-reto="${t.id}">Entrenar ${ICON.right}</button>` : ''}
    </section>
    <h2 class="gym-h">Elige tu nivel</h2>
    <div class="gym-levels" role="group" aria-label="Niveles del gimnasio">${GYM_LEVELS.map(x => {
      const its = byLevel(x.n), d = its.filter(r => mine[r.id]).length;
      return `<button class="gym-lv lv${x.n}${x.n === lvl ? ' on' : ''}" aria-pressed="${x.n === lvl}" data-lv="${x.n}">
        ${x.n === rec.level ? '<span class="glv-tag">Tu nivel</span>' : ''}
        ${gymPlates(x.n)}<b>${x.name}</b><small>Nivel ${x.n}</small>
        <span class="glv-bar"><i style="width:${its.length ? (d / its.length) * 100 : 0}%"></i></span><small class="glv-n">${its.length ? `${d}/${its.length}` : 'Pronto'}</small></button>`;
    }).join('')}</div>
    <p class="gym-lv-desc">${GYM_LEVELS[lvl - 1].desc}</p>
    ${list}
  </div>`;
  $('[data-back-course]', view).onclick = () => go('learn');
  view.querySelectorAll('[data-lv]').forEach(b => b.onclick = () => {
    const lv = +b.dataset.lv, y = view.scrollTop, kbd = document.activeElement === b;
    gymFocus.lvl = lv; renderGym(); view.scrollTop = y;
    if (kbd) $(`.gym-lv[data-lv="${lv}"]`, view)?.focus();   // el foco del teclado sigue en el nivel
  });
  view.querySelectorAll('[data-reto]').forEach(b => b.onclick = () => {
    const r = gymFind(c, b.dataset.reto);
    if (!r || !isOpen(r)) return toast(r?.warm ? 'Haz una lección de este mundo para calentar aquí.' : 'Termina la lección de este tema para abrir el reto.');
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
  ov.innerHTML = `<div class="lesson gym-run" style="${typeof gymFabColors === 'function' ? gymFabColors(c) : `--c:${c.color}`}">
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

  let closeConcept = null;
  const conceptOf = s => (s.concept && typeof CONCEPTOS !== 'undefined' && CONCEPTOS[s.concept]) || null;
  const teardown = () => { closeConcept?.(); closeConcept = null; handle?.destroy?.(); handle = null; };
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
      <p class="gym-eyebrow lv${r.level}">${gymPlates(r.level)}${r.warm ? 'Calentamiento' : `Reto guiado · Nivel ${r.level}, ${GYM_LEVELS[r.level - 1].name}`}</p>
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
      <div class="coach" role="note"><span class="coach-av">${mascotSVG('think')}</span><div><small>Paso ${pos + 1} · ${esc(s.title)}</small><p></p>${conceptOf(s) ? `<button type="button" class="con-btn" data-concept>${ICON.bulb}Recordar el concepto</button>` : ''}</div></div>
      <div class="gym-ex"></div>${notebook()}</div>`;
    const cb = $('[data-concept]', body);
    if (cb) cb.onclick = () => { cb.classList.remove('pulse'); closeConcept?.(); closeConcept = CON.open(root, s.concept); };
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
      $('[data-concept]', body)?.classList.add('pulse');   // atascado: el concepto está a un toque
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
    // Un calentamiento repetido no da XP (son juegos de lecciones ya hechas): así no se llena la meta repitiéndolo.
    const stars = gymStars(helps), prev = S.gym[r.id]?.best || 0;
    const xp = stars > prev ? (r.warm ? 5 : stars === 3 ? 15 : 10) : r.warm ? 0 : 5;
    S.gym[r.id] = { best: Math.max(prev, stars), at: Date.now(), n: (S.gym[r.id]?.n || 0) + 1 };
    let newStreak = false;
    if (xp) { addXP(xp); newStreak = markStreak(); }
    save();
    bar.style.width = '100%';
    body.innerHTML = `<div class="gym-done"><canvas class="confetti"></canvas>
      ${mascotSVG('cheer', 'm-win')}
      <h2>${stars === 3 ? '¡Reto superado sin ayudas!' : '¡Reto superado!'}</h2>
      <p class="muted">${esc(r.title)}</p>
      <div class="gym-done-stats">${gymStarsHTML(stars)}${xp ? `<b>${ICON.bolt}+${xp} XP</b>` : ''}</div>
      ${r.answer ? `<div class="gym-answer"><small>Respuesta</small><p>${tex(r.answer)}</p></div>` : ''}
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
