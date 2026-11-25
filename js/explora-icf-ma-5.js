// Preicfes · Matemáticas, mundo 5 «Funciones Lineales» (Explora, escenas «dibujo» y «fichas»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Plano de 0 a 8 y de 0 a 24 (o v.h): recta y = b + m x, con el escalón entre p y q.
  const X = x => 52 + x * 32, Y = (y, h) => 176 - y / h * 144;
  const ejes = (K, h) => { let s = ''; for (let i = 0; i <= 8; i += 2) s += K.l(X(i), 32, X(i), 176, i ? 'ls' : 'lm') + K.t(X(i), 192, i, 's tm'); for (let k = 0; k <= 4; k++) s += K.l(52, Y(k * h / 4, h), 308, Y(k * h / 4, h), k ? 'ls' : 'lm') + (k ? K.t(46, Y(k * h / 4, h) + 4, Math.round(k * h / 4), 's tm', 'end') : ''); return s; };
  const plano = (v, K) => { const h = 24, f = x => v.b + v.m * x, seg = (b, m, cls) => K.pl([[X(0), Y(b, h)], [X(8), Y(b + m * 8, h)]], cls); return ejes(K, h) + seg(v.b, v.m, 'la gr') + K.f(v.e, K.pl([[X(v.p), Y(f(v.p), h)], [X(v.q), Y(f(v.p), h)], [X(v.q), Y(f(v.q), h)]], 'lg gr') + K.c(X(v.p), Y(f(v.p), h), 5, 'fG') + K.c(X(v.q), Y(f(v.q), h), 5, 'fG')) + K.f(v.s, seg(v.b2, v.m2, 'lf gr')) + K.t(180, 20, v.t || '', 'ta'); };
  const D = { b: 4, m: 2, p: 1, q: 3, e: 0, s: 0, b2: 12, m2: 1, t: '' };
  // Barra de fijo más n pedazos.
  const barra = (v, K) => { const u = 7; return K.r(30, 60, v.b * u, 34, 'fg', 0) + Array.from({ length: Math.round(v.n) }, (_, i) => K.r(30 + (v.b + i * v.m) * u, 60, v.m * u, 34, 'fa', 0)).join('') + K.t(30, 48, 'fijo', 's tm', 'start') + K.t(170, 128, v.t || '', 'ta'); };

  xpLec('icf-ma-lineal-1', [
    ['Por cada uno',
      xpMira('dibujo', 'Empecemos por la idea: la **pendiente** es lo que sube entre lo que avanza.', { dib: plano, v: { ...D }, alto: 204 }, [
        ['Un tanque empieza con cuatro litros y se va llenando.', {}],
        ['Del minuto 1 al 3 avanza dos minutos.', { e: 1 }, '$3 - 1 = 2$'],
        ['Y sube de 6 a 10: cuatro litros.', {}, '$10 - 6 = 4$'],
        ['Cuatro litros en dos minutos: dos por minuto.', { t: '2 litros por minuto' }, '$4 \\div 2 = 2$'],
        ['En otro tramo, del 2 al 7, también da dos.', { p: 2, q: 7 }, '$10 \\div 5 = 2$'],
      ], 'Pendiente: lo que sube entre lo que avanza, igual en toda la recta.'),
      xpHaz('fichas', 'De la semana 2 a la 8 una planta pasa de 9 a 27 cm. Pon lo que avanza, lo que sube y la pendiente.', { slots: fila('avanza', 'sube', 'por semana'), fichas: ['6', '18', '3', '8', '27', '12'], meta: ['6', '18', '3'], alto: 96, pista: 'Resta las semanas, resta los centímetros y reparte.' }, '$18 \\div 6 = 3$ cm por semana.')],
    ['Sube, baja o nada',
      xpMira('dibujo', 'Segunda idea: el **signo** dice si crece o baja.', { dib: plano, v: { ...D, b: 4, m: 2 }, alto: 204 }, [
        ['Si sube hacia la derecha, es positiva.', { t: 'pendiente 2' }],
        ['Más empinada: cambia más rápido.', { b: 0, m: 3, t: 'pendiente 3' }],
        ['Horizontal: no cambia, la pendiente es cero.', { b: 12, m: 0, t: 'pendiente 0' }],
        ['Si baja hacia la derecha, es negativa.', { b: 20, m: -2, t: 'pendiente −2' }],
        ['Una batería que se gasta baja; un ahorro sube.', {}],
      ], 'Positiva sube, negativa baja, cero no cambia.'),
      xpHaz('dibujo', 'La recta empieza en 20. Mueve la pendiente hasta que en 8 llegue a **4**.', { dib: (v, K) => plano({ ...D, b: 20, m: v.m }, K), v: { m: 0 }, metas: { m: -2 }, alto: 250, manijas: [{ k: 'm', min: -2.5, max: 0.5, paso: 0.5, et: 'pendiente' }], lee: v => `$20 + 8 \\cdot (${v.m}) = ${20 + 8 * v.m}$`, dice: () => 'Mira cuánto tiene que bajar en ocho pasos.' }, 'Baja 16 en 8: pendiente −2.')],
    ['Con unidades',
      xpMira('fichas', 'Tercera idea: la pendiente lleva **dos unidades**.', { slots: fila('km por hora', '$ por kilo', 'mm por día'), fichas: ['60', '3', '4'], alto: 96 }, [
        ['180 kilómetros en 3 horas: se reparten.', { pon: { 0: '60' } }, '$180 \\div 3 = 60$'],
        ['De 2 a 6 kilos el precio sube 12.', { pon: { 1: '3' } }, '$12 \\div 4 = 3$'],
        ['Un hongo crece 20 milímetros en 5 días.', { pon: { 2: '4' } }, '$20 \\div 5 = 4$'],
        ['Primero se nombra lo que cambia.', {}],
        ['Después, por cada cuánto: kilómetros por hora.', {}],
      ], 'Lo que cambia por cada unidad de lo que avanza.'),
      xpHaz('fichas', 'Un camión gasta 45 galones en 360 km. Pon los km por galón y los galones para 80 km.', { slots: fila('km por galón', 'para 80 km'), fichas: ['8', '10', '0.125', '16', '40'], meta: ['8', '10'], alto: 96, pista: 'Reparte los kilómetros entre los galones.' }, '$360 \\div 45 = 8$ y $80 \\div 8 = 10$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una vela mide 22 cm a la 1 hora y 13 cm a las 4. Pon cuánto baja por hora, cuánto medía al encenderla y a qué hora se acaba, redondeada a la siguiente hora.', { slots: fila('por hora', 'al comienzo', 'se acaba'), fichas: ['3', '25', '9', '4', '22', '8'], meta: ['3', '25', '9'], alto: 96, pista: 'Baja 9 en 3 horas; al comienzo tenía una hora más de vela.' }, '$9 \\div 3 = 3$; $22 + 3 = 25$; $25 \\div 3$ pasa de 8.')],
  ], 'Sube entre avanza, con su signo y sus dos unidades.');

  xpLec('icf-ma-lineal-2', [
    ['Fijo más por cada uno',
      xpMira('dibujo', 'Empecemos por la idea: muchos cobros son **un fijo más algo por cada unidad**.', { dib: barra, v: { b: 10, m: 4, n: 0, t: '' }, alto: 148 }, [
        ['Entrar vale diez mil: se paga una sola vez.', { t: '10' }],
        ['Cada juego vale cuatro mil: uno.', { n: 1, t: '10 + 4 = 14' }],
        ['Con tres juegos se suman tres veces cuatro.', { n: 3, t: '10 + 4 · 3 = 22' }, '$10 + 4 \\cdot 3 = 22$'],
        ['Con x juegos: diez más cuatro equis.', { t: '10 + 4x' }, '$y = 10 + 4x$'],
        ['El fijo no se multiplica: se paga una vez.', {}],
      ], 'Total = fijo + cambio · cantidad.'),
      xpHaz('fichas', 'Una pizzería cobra 18 por la base y 3 por ingrediente. Pon lo fijo, el cambio y el precio con 4 ingredientes.', { slots: fila('fijo', 'cambio', 'con 4'), fichas: ['18', '3', '30', '21', '84', '12'], meta: ['18', '3', '30'], alto: 96, pista: 'La base se paga una vez; cada ingrediente suma.' }, '$18 + 3 \\cdot 4 = 30$.')],
    ['En el plano',
      xpMira('dibujo', 'Segunda idea: lo fijo es **donde empieza** la recta; el cambio, **su inclinación**.', { dib: plano, v: { ...D, b: 0, m: 2 }, alto: 204 }, [
        ['Sin fijo, la recta empieza en cero.', { t: 'y = 2x' }],
        ['Con un fijo de seis, empieza más arriba.', { b: 6, t: 'y = 6 + 2x' }],
        ['Si cada unidad vale menos, se inclina menos.', { m: 1, t: 'y = 6 + x' }],
        ['Si se gasta, baja: se resta.', { b: 20, m: -2, t: 'y = 20 − 2x' }],
        ['Leerla al revés: empieza en 20 y pierde 2 cada vez.', {}],
      ], 'Corta el eje en lo fijo y se inclina según el cambio.'),
      xpHaz('dibujo', 'Arma la recta de **8 fijos y 1.5 por cada uno**.', { dib: (v, K) => plano({ ...D, b: v.b, m: v.m }, K), v: { b: 0, m: 0 }, metas: { b: 8, m: 1.5 }, alto: 290, manijas: [{ k: 'b', min: 0, max: 12, paso: 2, et: 'fijo' }, { k: 'm', min: 0, max: 1.5, paso: 0.5, et: 'por cada uno' }], lee: v => `$y = ${v.b} + ${v.m}x$`, dice: () => 'Mira dónde empieza y cuánto sube por paso.' }, 'Empieza en 8 y sube 1.5 por paso.')],
    ['Devolverse',
      xpMira('fichas', 'Tercera idea: si se conoce el total, **se quita lo fijo y se reparte**.', { slots: fila('sin el fijo', 'cantidad'), fichas: ['35', '5'], alto: 96 }, [
        ['Pagué 50: quince fijos y siete por hora.', {}, '$15 + 7x = 50$'],
        ['Lo fijo se quita de los dos lados.', { pon: { 0: '35' } }, '$50 - 15 = 35$'],
        ['Lo que queda se reparte entre siete.', { pon: { 1: '5' } }, '$35 \\div 7 = 5$'],
        ['Se comprueba: quince más siete por cinco.', {}, '$15 + 35 = 50$'],
        ['Dividir antes de quitar el fijo es el error típico.', {}],
      ], 'Quita lo fijo, reparte y comprueba.'),
      xpHaz('fichas', 'Un celular tiene 96 fotos y toma 12 por día. Pon cuántas faltan para 180 y en cuántos días se llega.', { slots: fila('faltan', 'días'), fichas: ['84', '7', '15', '276', '8'], meta: ['84', '7'], alto: 96, pista: 'Quita las que ya tiene.' }, '$180 - 96 = 84$ y $84 \\div 12 = 7$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Por 3 clases se pagan 44 y por 8 clases, 84, con matrícula incluida. Pon lo de cada clase, la matrícula y lo de 10 clases.', { slots: fila('por clase', 'matrícula', '10 clases'), fichas: ['8', '20', '100', '10', '24', '80'], meta: ['8', '20', '100'], alto: 96, pista: 'De 3 a 8 clases sube 40 en cinco clases.' }, '$40 \\div 5 = 8$; $44 - 24 = 20$; $20 + 80 = 100$.')],
  ], 'Fijo más cambio por cantidad; y para devolverse, quita y reparte.');

  xpLec('icf-ma-lineal-3', [
    ['El cruce',
      xpMira('dibujo', 'Empecemos por la idea: dos planes empatan **en el cruce**.', { dib: plano, v: { ...D, b: 4, m: 2, s: 0, b2: 12, m2: 1 }, alto: 204 }, [
        ['El plan A empieza en 4 y sube 2 por cada uno.', { t: 'A: 4 + 2x' }],
        ['El plan B empieza en 12 y sube solo 1.', { s: 1, t: 'B: 12 + x' }],
        ['Al comienzo se llevan ocho.', {}, '$12 - 4 = 8$'],
        ['Con cada unidad A se acerca uno.', {}, '$2 - 1 = 1$'],
        ['Se alcanzan en ocho: los dos valen veinte.', { t: 'x = 8, los dos 20' }, '$8 \\div 1 = 8$'],
      ], 'Empate: lo que se llevan entre lo que se acercan.'),
      xpHaz('fichas', 'A: 3 fijos y 5 por día. B: 15 fijos y 2 por día. Pon cuánto se llevan al comienzo, cuánto se acercan por día y el día del empate.', { slots: fila('se llevan', 'se acercan', 'empate'), fichas: ['12', '3', '4', '18', '7', '6'], meta: ['12', '3', '4'], alto: 96, pista: 'Resta los fijos, resta los cambios y reparte.' }, '$12 \\div 3 = 4$ días: los dos valen 23.')],
    ['De cada lado',
      xpMira('dibujo', 'Segunda idea: **antes** del cruce gana el de menor fijo; **después**, el que sube menos.', { dib: plano, v: { ...D, b: 2, m: 2, s: 1, b2: 10, m2: 0 }, alto: 204 }, [
        ['B cobra diez fijos y ya no sube.', { t: 'empatan en 4' }],
        ['A empieza en dos y sube dos por cada uno.', {}],
        ['Con dos unidades A va en seis: gana A.', { t: 'antes: gana A' }, '$2 + 2 \\cdot 2 = 6$'],
        ['Con siete, A va en dieciséis: gana B.', { t: 'después: gana B' }, '$2 + 2 \\cdot 7 = 16$'],
        ['Prueba siempre un número de cada lado.', {}],
      ], 'Antes del cruce, menor fijo; después, menor pendiente.'),
      xpHaz('fichas', 'A: 6 por clase. B: 30 fijos y 1 por clase. Empatan en 6. Pon lo que cuesta cada uno con 10 clases.', { slots: fila('A', 'B'), fichas: ['60', '40', '36', '310', '31'], meta: ['60', '40'], alto: 96, pista: 'Usa diez clases en cada plan.' }, 'A 60 y B 40: después del empate gana B.')],
    ['Decidir',
      xpMira('fichas', 'Tercera idea: se decide con **lo que vas a usar**.', { slots: fila('A en 3', 'B en 3', 'A en 12', 'B en 12').map(s => ({ ...s, w: 62 })), fichas: ['13', '19', '40', '28'], alto: 96 }, [
        ['A: cuatro fijos y tres por viaje. B: dieciséis y uno.', {}],
        ['Con tres viajes, A cuesta trece.', { pon: { 0: '13' } }, '$4 + 9 = 13$'],
        ['Y B cuesta diecinueve: conviene A.', { pon: { 1: '19' } }, '$16 + 3 = 19$'],
        ['Con doce viajes, A cuesta cuarenta.', { pon: { 2: '40' } }, '$4 + 36 = 40$'],
        ['Y B, veintiocho: ahora conviene B.', { pon: { 3: '28' } }, '$16 + 12 = 28$'],
      ], 'No hay plan mejor: hay plan mejor para tu cantidad.'),
      xpHaz('fichas', 'A: 25 fijos y 2 por GB. B: 5 por GB. Usas 10 GB. Pon lo que cuesta cada uno.', { slots: fila('A', 'B'), fichas: ['45', '50', '27', '70', '15'], meta: ['45', '50'], alto: 96, pista: 'Calcula los dos con diez.' }, 'A 45 y B 50: para 10 GB conviene A.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Comprar una impresora cuesta 240 y cada hoja sale a 1. En la tienda cada hoja vale 4 y no hay fijo. Pon cuánto se ahorra por hoja y con cuántas hojas se recupera.', { slots: fila('ahorro', 'hojas'), fichas: ['3', '80', '60', '5', '240'], meta: ['3', '80'], alto: 96, pista: 'Resta lo de cada hoja y reparte lo fijo.' }, '$4 - 1 = 3$ y $240 \\div 3 = 80$.')],
  ], 'Halla el cruce, prueba cada lado y decide con tu cantidad.');
}
