// Ejemplos resueltos y dibujados de Matemáticas del Preicfes (libro 5). Problemas originales, distintos de los ejercicios y de
// los ejemplos de cada explicación. `de`: paso de la explicación cuya escena se usa; `v` / `en`: lo que cambia; `m`: momentos
// [lo que se explica, lo que cambia en el dibujo, cuenta]; `r`: respuesta. Las lecciones cuyo dibujo tiene números fijos usan
// aquí su propio `dib`, hecho con las mismas piezas (XPK).
const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
const angosta = l => l.map(s => ({ ...s, w: 62 }));

// Parábola h = −0.5(x − 1)(x − 9): ceros (c), eje (e), pareja a igual altura (p) y vértice (v).
const parab = (v, K) => {
  const X = x => 30 + x * 28, Y = y => 150 - y * 14, f = x => -0.5 * (x - 1) * (x - 9);
  let h = K.l(20, 150, 320, 150, 'lm') + K.pl(Array.from({ length: 41 }, (_, i) => { const x = 1 + 8 * i / 40; return [X(x), Y(f(x))]; }), 'la gr');
  h += K.f(v.c, K.c(X(1), 150, 5, 'fF') + K.c(X(9), 150, 5, 'fF') + K.t(X(1), 168, '1', 's') + K.t(X(9), 168, '9', 's'));
  h += K.f(v.e, K.l(X(5), Y(9), X(5), 150, 'lg d') + K.t(X(5), 168, '5', 's'));
  h += K.f(v.p, K.l(X(3), Y(6), X(7), Y(6), 'lg d') + K.c(X(3), Y(6), 5, 'fA') + K.c(X(7), Y(6), 5, 'fA') + K.t(X(7) + 10, Y(6) + 4, '6 m', 's', 'start') + K.t(X(3), 168, '3', 's') + K.t(X(7), 168, '7', 's'));
  h += K.f(v.v, K.c(X(5), Y(8), 6, 'fg') + K.t(X(5) + 12, Y(8) - 4, '8 m', 's', 'start'));
  return h + K.t(170, 192, v.t || '', 'ta');
};
// Altura 3 + 2 sen(πt/6) de 0 a 24 s: periodo (q), media (m), amplitud (a) y puntos más bajos (b).
const marea = (v, K) => {
  const X = h => 30 + h * 11.5, Y = y => 150 - y * 22, f = h => 3 + 2 * Math.sin(Math.PI * h / 6);
  let s = K.l(30, 150, 310, 150, 'lm') + K.l(30, 150, 30, Y(5.6), 'lm');
  [0, 6, 12, 18, 24].forEach(h => { s += K.l(X(h), 146, X(h), 154, 'lm') + K.t(X(h), 168, h, 's tm'); });
  [1, 3, 5].forEach(y => { s += K.l(26, Y(y), 34, Y(y), 'lm') + K.t(22, Y(y) + 4, y, 's tm', 'end'); });
  s += K.f(v.m, K.l(30, Y(3), 310, Y(3), 'lg d'));
  s += K.pl(Array.from({ length: 97 }, (_, i) => { const h = i / 4; return [X(h), Y(f(h))]; }), 'la gr');
  s += K.f(v.q, K.c(X(3), Y(5), 5, 'fF') + K.c(X(15), Y(5), 5, 'fF') + K.l(X(3), Y(5) - 12, X(15), Y(5) - 12, 'la') + K.t(X(9), Y(5) - 18, 'periodo: 12 s', 's ta'));
  s += K.f(v.a, K.l(X(15), Y(3), X(15), Y(5), 'lo gr'));
  s += K.f(v.b, K.c(X(9), Y(1), 5, 'fA') + K.c(X(21), Y(1), 5, 'fA') + K.t(X(9), Y(1) + 18, '9 s', 's') + K.t(X(21), Y(1) + 18, '21 s', 's'));
  return s + K.t(170, 190, v.t || '', 'ta');
};
// Barras de un rumor que se triplica: 4 · 3^i personas, hasta el día n.
const rumor = (v, K) => {
  let s = K.l(30, 160, 310, 160, 'lm');
  for (let i = 0; i <= 4; i++) {
    const q = 4 * 3 ** i, h = q * 0.4, x = 44 + i * 56;
    s += K.t(x + 18, 178, `día ${i}`, 's tm') + K.f(v.n - i + 1, K.r(x, 160 - h, 36, h, i === Math.round(v.n) ? 'fA' : 'fa', 2) + K.t(x + 18, 154 - h, q, 's'));
  }
  return s;
};
// Vista desde arriba con la altura de cada torre (filas de atrás hacia el frente) y la vista de frente, columna por columna.
const TORRE = [[2, 0, 1], [3, 1, 2], [1, 2, 0]];
const vista = (v, K) => {
  const u = 32, x0 = 30, y0 = 34; let s = K.t(x0 + 47, y0 - 10, 'atrás', 's tm') + K.t(x0 + 47, y0 + 3 * u + 14, 'frente', 's tm');
  TORRE.forEach((f, r) => f.forEach((n, c) => { s += K.r(x0 + c * u, y0 + r * u, u - 2, u - 2, c === v.c ? 'fa' : 'fn', 3) + K.t(x0 + c * u + 15, y0 + r * u + 20, n, 'b'); }));
  s += K.l(194, 162, 306, 162, 'lm') + K.t(251, 180, 'vista de frente', 's tm');
  for (let c = 0; c < Math.round(v.n); c++) {
    const alto = Math.max(...TORRE.map(f => f[c]));
    for (let z = 0; z < alto; z++) s += K.r(202 + c * 34, 160 - (z + 1) * 32, 30, 30, c === v.c ? 'fA' : 'fa', 2);
  }
  return s + K.t(170, 202, v.t || '', 'ta');
};
// Plano con cuadrícula de 1: A(−1, 2) y B(4, 14); catetos (l), distancia (h) y punto medio (m).
const mapa = (v, K) => {
  const u = 12, X = x => 130 + x * u, Y = y => 186 - y * u; let s = '';
  for (let i = -3; i <= 8; i++) s += K.l(X(i), Y(0), X(i), Y(15), i ? 'lr' : 'lm');
  for (let j = 0; j <= 15; j++) s += K.l(X(-3), Y(j), X(8), Y(j), j ? 'lr' : 'lm');
  s += K.f(v.l, K.l(X(-1), Y(2), X(4), Y(2), 'lg gr') + K.l(X(4), Y(2), X(4), Y(14), 'lf gr') + K.t(X(1.5), Y(2) + 16, '5', 's tg') + K.t(X(4) + 8, Y(8) + 4, '12', 's tf', 'start'));
  s += K.f(v.h, K.l(X(-1), Y(2), X(4), Y(14), 'la gr') + K.t(X(0) + 2, Y(9.5) + 4, '13', 's ta', 'end'));
  s += K.f(v.m, K.c(X(1.5), Y(8), 5, 'fF') + K.t(X(1.5) - 14, Y(8) + 18, 'M(1.5, 8)', 's', 'end'));
  return s + K.c(X(-1), Y(2), 5, 'fA') + K.c(X(4), Y(14), 5, 'fA') + K.t(X(-1) - 8, Y(2) + 4, 'A', 'b', 'end') + K.t(X(4) + 8, Y(14) + 4, 'B', 'b', 'start');
};
// Tiempos por vuelta de Ana (4, 5, 5, 6) y Beto (2, 4, 6, 8): promedio (m), desviaciones de Beto (d), sus cuadrados (q) y los de Ana (a).
const vueltas = (v, K) => {
  const X = x => 30 + x * 28, A = [[4, 0], [5, -7], [5, 7], [6, 0]], B = [2, 4, 6, 8]; let s = K.l(30, 150, 310, 150, 'lm');
  for (let i = 0; i <= 10; i++) s += K.t(X(i), 168, i, 's tm');
  s += K.f(v.m, K.l(X(5), 30, X(5), 150, 'lo d') + K.t(X(5), 22, 'promedio 5', 's tm'));
  s += K.t(30, 64, 'Ana', 's ta', 'start') + K.t(30, 122, 'Beto', 's tg', 'start');
  s += A.map(([x, d]) => K.c(X(x) + d, 60, 7, 'fA')).join('') + B.map(x => K.c(X(x), 118, 7, 'fG')).join('');
  s += K.f(v.d, B.map(x => K.t(X(x), 104, x < 5 ? `−${5 - x}` : `+${x - 5}`, 's')).join(''));
  s += K.f(v.q, B.map(x => K.t(X(x), 140, (x - 5) ** 2, 's tg')).join(''));
  s += K.f(v.a, A.map(([x, d]) => K.t(X(x) + d * 1.4, 84, (x - 5) ** 2, 's ta')).join(''));
  return s + K.t(170, 192, v.t || '', 'ta');
};
// Caja de las edades 15, 16, 16, 17, 18, 19, 21, 22, 25: mediana (k ≥ 1), cuartiles (k ≥ 2) y caja con bigotes (k ≥ 3).
const EDAD = [15, 16, 16, 17, 18, 19, 21, 22, 25];
const cajaEdad = (v, K) => {
  const X = a => 30 + (a - 14) * 23, k = v.k; let s = K.l(30, 150, 306, 150, 'lm');
  for (let a = 14; a <= 26; a += 2) s += K.l(X(a), 146, X(a), 154, 'lm') + K.t(X(a), 168, a, 's tm');
  if (k >= 1) s += K.l(X(18), 36, X(18), 140, 'lg d') + K.t(X(18), 28, 'Me 18', 's tg');
  if (k >= 2) s += K.l(X(16), 36, X(16), 140, 'lo d') + K.l(X(21.5), 36, X(21.5), 140, 'lo d') + K.t(X(16), 28, 'Q1 16', 's') + K.t(X(21.5), 28, 'Q3 21.5', 's');
  if (k >= 3) s += K.l(X(15), 69, X(25), 69, 'lm') + K.r(X(16), 52, X(21.5) - X(16), 34, 'fa', 2) + K.l(X(18), 52, X(18), 86, 'lg gr');
  s += EDAD.map((a, i) => K.c(X(a), i === 2 ? 112 : 126, 6, (k >= 1 && i === 4) || (k >= 2 && [1, 2, 6, 7].includes(i)) ? 'fA' : 'fa')).join('');
  return s + K.t(170, 192, v.t || '', 'ta');
};
// Venn de 50 estudiantes: fútbol 28, voleibol 21, los dos 9. Centro (b), lunas (a) y afuera (u).
const venn2 = (v, K) => K.r(16, 8, 308, 140, 'fn', 6) + K.c(134, 78, 56, 'fa') + K.c(206, 78, 56, 'fg') + K.t(62, 30, 'fútbol', 's ta') + K.t(278, 30, 'voleibol', 's tg')
  + K.f(v.b, K.t(170, 84, '9', 'b')) + K.f(v.a, K.t(106, 84, '19', 'b') + K.t(234, 84, '12', 'b')) + K.f(v.u, K.t(298, 136, '10', 'b')) + K.t(170, 170, v.t || '', 'ta');

Object.assign(EJ, {
  // ------------------------------------------------------------------------------------------------ Datos y gráficas
  'icf-ma-datos-1': [{ t: 'Las visitas del museo', q: 'La gráfica muestra los visitantes de un museo el sábado y el domingo. El eje va de 0 a 250 y sus rayas van de 50 en 50; la barra del sábado queda en la mitad entre 100 y 150 y la del domingo toca la raya de 200. ¿En qué porcentaje aumentaron las visitas?', de: 0, v: { vals: [125, 200], hi: 250, st: 50, rot: ['sábado', 'domingo'], on: -1, nota: '', lin: 0 }, m: [
    ['Antes de leer las barras, la escala: cada raya vale 50, no 10.', {}],
    ['El sábado está entre 100 y 150, justo en la mitad: 125.', { on: 0, nota: '125' }, '$100 + 25 = 125$'],
    ['El domingo toca la raya de 200.', { on: 1, nota: '200' }],
    ['Subió 75 sobre lo que había antes, que eran 125. La línea marca ese «antes».', { lin: 125, nota: '+75' }, '$200 - 125 = 75$'],
    ['75 de 125 son tres quintos: el 60 %.', { nota: '+60 %' }, '$\\tfrac{75}{125} = 0.6 = 60\\,\\%$'],
  ], r: 'Aumentaron el 60 %. Dividir 75 entre 200 (lo de ahora) daría 37.5 %: el porcentaje se calcula sobre lo de antes.' }],
  'icf-ma-datos-2': [{ t: 'La cuenta pareja', q: 'Tres amigos pagaron una cuenta: Ana puso 14 mil, Beto 5 mil y Caro 8 mil. Quieren quedar parejos. ¿Cuánto debe poner cada uno al final y quién le da cuánto a quién?', de: 0, v: { vals: [14, 5, 8], hi: 15, st: 3, rot: ['Ana', 'Beto', 'Caro'], on: -1, nota: '', lin: 0 }, m: [
    ['Cada barra es lo que puso cada uno.', {}],
    ['Entre los tres pusieron 27 mil.', { nota: '27' }, '$14 + 5 + 8 = 27$'],
    ['Parejo es repartir por igual: 9 mil cada uno. Esa es la línea del promedio.', { lin: 9 }, '$27 \\div 3 = 9$'],
    ['Ana está 5 por encima; Beto, 4 por debajo, y Caro, 1 por debajo.', { on: 0, nota: '+5, −4, −1' }],
    ['Beto le da 4 a Ana y Caro le da 1: los tres quedan en 9. Lo que sobraba arriba llenó lo que faltaba abajo.', { vals: [9, 9, 9], on: -1, nota: 'todos en 9' }],
  ], r: 'Cada uno pone 9 mil: Beto le da 4 mil a Ana y Caro le da 1 mil.' }],
  'icf-ma-datos-3': [{ t: '¿Dónde se recicla más?', q: 'En el barrio A reciclan 36 de sus 48 hogares; en el barrio B, 44 de sus 80 hogares. Una gráfica con la cantidad de hogares que reciclan muestra más alta la barra de B. ¿En qué barrio se recicla más?', de: 2, v: { vals: [36, 44], hi: 100, st: 25, rot: ['A: 36', 'B: 44'], on: 1, nota: '' }, m: [
    ['La gráfica cuenta hogares: B gana por 8.', {}],
    ['Pero los barrios no son del mismo tamaño: A tiene 48 hogares y B, 80.', { vals: [48, 80], rot: ['A: 48', 'B: 80'], on: -1, nota: 'hogares' }],
    ['En A recicla el 75 % de sus hogares.', { vals: [75, 0], rot: ['A: 75 %', 'B: ?'], on: 0, nota: '' }, '$\\tfrac{36}{48} = 75\\,\\%$'],
    ['En B, el 55 %. Comparando la parte de cada barrio, gana A.', { vals: [75, 55], rot: ['A: 75 %', 'B: 55 %'], nota: 'gana A' }, '$\\tfrac{44}{80} = 55\\,\\%$'],
  ], r: 'En A (75 % contra 55 %). Más hogares que reciclan no es mayor proporción: cada cantidad se divide entre el total de su barrio.' }],

  // ------------------------------------------------------------------------------------------------ Proporciones y porcentajes
  'icf-ma-proporcion-1': [{ t: 'La ganancia de dos socios', q: 'Dos socios montaron un negocio: uno puso 40 millones y el otro, 60. La ganancia del año fue de 35 millones y se reparte en proporción a lo que puso cada uno. ¿Cuánto recibe cada socio?', de: 2, v: { n: 5, k: 2, T: 35, u: 0, tit: 'ganancia: 35 millones', pie: '' }, m: [
    ['Los aportes 40 y 60 están en razón 2 : 3: se dividen los dos entre 20.', { pie: '40 : 60 = 2 : 3' }, '$40 \\div 20 = 2, \\; 60 \\div 20 = 3$'],
    ['La ganancia se piensa en 2 + 3 = 5 partes iguales; las dos de color son del primero.', { pie: '2 + 3 = 5 partes' }],
    ['Cada parte vale 7 millones.', { u: 1, pie: '35 ÷ 5 = 7' }, '$35 \\div 5 = 7$'],
    ['El primero se lleva 2 partes y el segundo, 3.', { pie: '2 · 7 = 14 y 3 · 7 = 21' }, '$14 + 21 = 35$'],
  ], r: '14 millones el primero y 21 el segundo. Partir mitad y mitad (17.5 cada uno) ignora que el segundo puso más.' }],
  'icf-ma-proporcion-2': [{ t: 'Los votos de Laura', q: 'En la elección de personero votaron 240 estudiantes y Laura obtuvo el 45 % de los votos. ¿Cuántos votos sacó?', de: 0, v: { n: 10, k: 0, T: 240, u: 0, tit: 'el 45 % de 240', pie: '' }, m: [
    ['Los 240 votos son la barra entera: el 100 %.', {}],
    ['Partida en diez, cada parte es el 10 %: 24 votos.', { u: 1, pie: '10 % = 24' }, '$240 \\div 10 = 24$'],
    ['Cuatro partes son el 40 %.', { k: 4, pie: '40 % = 96' }, '$4 \\cdot 24 = 96$'],
    ['El 5 % es media parte: 12 votos.', { pie: '5 % = 12' }, '$24 \\div 2 = 12$'],
    ['Se juntan: el 45 % son 108 votos.', { pie: '45 % = 108' }, '$96 + 12 = 108$'],
  ], r: '108 votos. Se comprueba con una sola cuenta: $240 \\cdot 0.45 = 108$.' }],
  'icf-ma-proporcion-3': [{ t: 'Los pintores', q: 'Cuatro pintores pintan un colegio en 9 días. Si llegan dos pintores más y todos trabajan igual, ¿cuántos días tardan? ¿Y si fueran 12 pintores?', de: 2, v: { a: 4, b: 9, ea: 'pintores', tit: '36 cuadros' }, m: [
    ['Cada cuadro es lo que pinta un pintor en un día: el colegio entero son 36.', {}, '$4 \\cdot 9 = 36$'],
    ['Con 6 pintores el trabajo es el mismo: el rectángulo se ensancha y baja hasta 6 días.', { a: 6, b: 6 }, '$36 \\div 6 = 6$'],
    ['Con 12 pintores bastan 3 días.', { a: 12, b: 3 }, '$36 \\div 12 = 3$'],
    ['Cambian los dos lados, pero el área es siempre 36: es una proporción inversa.', { tit: 'siempre 36' }],
  ], r: '6 días con 6 pintores y 3 días con 12. Una regla de tres directa daría 13.5 días: más pintores no pueden tardar más.' }],
  'icf-ma-proporcion-4': [{ t: 'Dos ciclistas de frente', q: 'Dos ciclistas están a 210 km uno del otro y salen al mismo tiempo, uno hacia el otro: el primero a 40 km/h y el segundo a 30 km/h. ¿Cuándo se encuentran y a qué distancia del punto de salida del primero?', de: 4, v: { x: 0, y: 1, i: '40 km/h', d: '30 km/h', tit: '210 km los separan' }, m: [
    ['Salen a la vez desde las dos puntas.', {}],
    ['En una hora uno avanza 40 y el otro 30: se acercan 70 km.', { x: 0.1905, y: 0.8571, tit: 'quedan 140 km' }, '$40 + 30 = 70$'],
    ['Para cerrar los 210 km a 70 por hora hacen falta 3 horas.', { x: 0.5714, y: 0.5714, tit: '210 ÷ 70 = 3 h' }, '$210 \\div 70 = 3$'],
    ['En esas 3 horas el primero recorrió 120 km y el segundo, 90.', { tit: '120 km y 90 km' }, '$40 \\cdot 3 = 120, \\; 30 \\cdot 3 = 90$'],
  ], r: 'A las 3 horas, a 120 km de donde salió el primero. Restar las velocidades (40 − 30) solo sirve si van en el mismo sentido.' }],

  // ------------------------------------------------------------------------------------------------ Conteo y probabilidad
  'icf-ma-azar-1': [{ t: 'Modelos y colores', q: 'Un celular viene en 4 modelos y cada modelo, en 3 colores. ¿Cuántas versiones distintas se pueden comprar? ¿Y si sacan un color nuevo para todos los modelos?', de: 0, v: { a: 4, b: 3, f: 0, t: '' }, m: [
    ['Primero se escoge el modelo: cuatro ramas.', {}],
    ['Cada modelo se abre en los tres colores.', { f: 1 }],
    ['Al final hay una hoja por versión: 12.', { t: '4 · 3 = 12' }, '$4 \\cdot 3 = 12$'],
    ['Con un color más, cada una de las cuatro ramas gana una hoja: 16, no 13.', { b: 4, t: '4 · 4 = 16' }, '$4 \\cdot 4 = 16$'],
  ], r: '12 versiones, y 16 con el color nuevo. Sumar 4 + 3 = 7 contaría elegir un modelo **o** un color, no las dos cosas.' }],
  'icf-ma-azar-2': [{ t: 'El comité de la salida', q: 'En un grupo de 8 estudiantes se escoge un comité de 3 para organizar la salida, sin cargos: los tres hacen lo mismo. ¿Cuántos comités distintos se pueden formar?', de: 2, en: { slots: angosta(fila('1.º', '2.º', '3.º', 'comités')), fichas: ['8', '7', '6', '56'] }, m: [
    ['Hagamos de cuenta que sí importa el orden: el primero se escoge entre 8.', { pon: { 0: '8' } }],
    ['El segundo, entre los 7 que quedan, y el tercero, entre 6. Con orden serían 336.', { pon: { 1: '7', 2: '6' } }, '$8 \\cdot 7 \\cdot 6 = 336$'],
    ['Pero Ana, Beto y Caro son el mismo comité en cualquier orden: cada grupo se contó 6 veces.', { marca: [0, 1, 2] }, '$3 \\cdot 2 \\cdot 1 = 6$'],
    ['Se divide entre 6: hay 56 comités.', { pon: { 3: '56' }, marca: [3] }, '$336 \\div 6 = 56$'],
  ], r: '56 comités. Si hubiera presidente, secretario y tesorero, el orden importaría y serían 336.' }],
  'icf-ma-azar-3': [{ t: 'La rifa', q: 'En una rifa se vendieron 24 boletas y Juan compró 6. ¿Qué probabilidad tiene de ganar? ¿Y si compra 2 boletas más? En ese caso, ¿cuál es la probabilidad de que no gane?', de: 0, v: { n: 24, k: 6, t: '' }, m: [
    ['Hay 24 boletas en la urna; las 6 de Juan van de otro color.', {}],
    ['Sirven 6 de 24: un cuarto.', { t: '6 de 24 = 1/4' }, '$\\tfrac{6}{24} = \\tfrac14$'],
    ['Con dos más, sirven 8 de 24: un tercio.', { k: 8, t: '8 de 24 = 1/3' }, '$\\tfrac{8}{24} = \\tfrac13$'],
    ['No ganar son las otras 16 boletas: lo que falta para completar 1.', { t: 'no gana: 16 de 24' }, '$1 - \\tfrac13 = \\tfrac23$'],
  ], r: '$\\tfrac14$; con 8 boletas, $\\tfrac13$, y la de no ganar, $\\tfrac23$.' }],
  'icf-ma-azar-4': [{ t: 'Medias a oscuras', q: 'En un cajón hay 7 medias sueltas: 4 negras y 3 blancas. A oscuras se sacan dos, una después de la otra, sin devolver la primera. ¿Qué probabilidad hay de que las dos sean negras?', de: 2, v: { n: 7, k: 4, t: '' }, m: [
    ['Siete medias, cuatro negras: la primera es negra con 4 de 7.', { t: 'primera negra: 4/7' }],
    ['Sale una negra y no vuelve: quedan 6 medias y solo 3 negras.', { n: 6, k: 3, t: 'quedan 3 de 6' }],
    ['La segunda es negra con 3 de 6. Cambiaron los dos números.', { t: 'segunda negra: 3/6' }],
    ['Tienen que pasar las dos cosas: se multiplica.', { t: '4/7 · 3/6 = 2/7' }, '$\\tfrac47 \\cdot \\tfrac36 = \\tfrac{12}{42} = \\tfrac27$'],
  ], r: '$\\tfrac27$. Si la primera se devolviera, sería $\\tfrac47 \\cdot \\tfrac47 = \\tfrac{16}{49}$.' }],

  // ------------------------------------------------------------------------------------------------ Áreas y volúmenes
  'icf-ma-medida-1': [{ t: 'El lote del parque', q: 'Un lote con forma de trapecio tiene bases de 15 m y 9 m, y una altura de 6 m. Se va a cubrir de césped. ¿Cuántos metros cuadrados de césped hacen falta?', de: 4, v: { B: 15, k: 9, f: 0, t: '' }, m: [
    ['Abajo, la base de 15; arriba, la de 9. La altura es 6.', { t: 'bases 15 y 9' }],
    ['A mitad de camino entre las dos bases está el 12.', { t: 'promedio: 12' }, '$(15 + 9) \\div 2 = 12$'],
    ['Las puntas que sobran a los lados llenan los huecos: queda un rectángulo de 12 por 6.', { f: 1 }],
    ['Su área es 72.', { t: 'área: 72 m²' }, '$12 \\cdot 6 = 72$'],
  ], r: '72 m². Sumar las bases y multiplicar por la altura sin partir en dos daría 144: el doble.' }],
  'icf-ma-medida-2': [{ t: 'El aspersor', q: 'Un aspersor de jardín lanza agua hasta 6 m y gira de un lado a otro barriendo un ángulo de 120°. ¿Qué área riega? ¿Y si lo graduaran a 240°?', de: 2, v: { r: 6, a: 0, q: 0, t: '' }, m: [
    ['Si diera la vuelta completa regaría un círculo de radio 6: 36π.', { a: 360, t: 'círculo: 36π' }, '$\\pi \\cdot 6^2 = 36\\pi$'],
    ['Pero solo barre 120°, la tercera parte de la vuelta.', { a: 120, t: '120 de 360: un tercio' }, '$120 \\div 360 = \\tfrac13$'],
    ['Un tercio de 36π son 12π, cerca de 37.7 m².', { t: '12π ≈ 37.7 m²' }, '$36\\pi \\div 3 = 12\\pi$'],
    ['A 240° barre el doble: 24π.', { a: 240, t: '240°: 24π' }],
  ], r: '$12\\pi \\approx 37.7$ m², y $24\\pi$ a 240°. Multiplicar 120 por 6 mezcla grados con metros.' }],
  'icf-ma-medida-3': [{ t: 'El molde de gelatina', q: 'Un molde cilíndrico de gelatina tiene 900 cm³ de capacidad. Un cono con la misma base y la misma altura se llena de gelatina y se vacía en el molde. ¿Cuántos conos hacen falta para llenarlo y cuánto cabe en cada cono, en litros?', de: 2, v: { n: 0, t: '' }, m: [
    ['El cono y el molde tienen la misma boca y la misma altura.', { t: 'molde: 900 cm³' }],
    ['Un cono vaciado llena solo un tercio del molde.', { n: 1, t: 'un cono: 300 cm³' }, '$900 \\div 3 = 300$'],
    ['Con el segundo van dos tercios.', { n: 2, t: 'dos conos: 600 cm³' }],
    ['El tercero lo llena.', { n: 3, t: 'tres conos: 900 cm³' }, '$3 \\cdot 300 = 900$'],
  ], r: 'Tres conos; en cada uno caben 300 cm³, que son 0.3 L, porque un litro son 1 000 cm³.' }],

  // ------------------------------------------------------------------------------------------------ Funciones lineales
  'icf-ma-lineal-1': [{ t: 'El embalse que baja', q: 'En temporada seca, el nivel de un embalse baja lo mismo cada semana. En la semana 1 estaba a 20 m y en la semana 5, a 12 m. ¿Cuánto baja por semana y en qué semana llegará a 6 m?', de: 0, v: { b: 22, m: -2, p: 1, q: 5, e: 0, s: 0, t: '' }, m: [
    ['La recta es el nivel del embalse, semana a semana.', {}],
    ['De la semana 1 a la 5 pasan cuatro semanas…', { e: 1 }, '$5 - 1 = 4$'],
    ['…y el nivel pasa de 20 a 12: baja 8 metros.', { t: 'baja 8 en 4 semanas' }, '$12 - 20 = -8$'],
    ['Repartido: baja 2 m por semana. La pendiente es negativa.', { t: 'pendiente −2' }, '$-8 \\div 4 = -2$'],
    ['De 12 a 6 faltan 6 m: tres semanas más después de la quinta.', { p: 5, q: 8, t: 'semana 8: 6 m' }, '$6 \\div 2 = 3, \\; 5 + 3 = 8$'],
  ], r: 'Baja 2 m por semana (pendiente −2) y llega a 6 m en la semana 8.' }],
  'icf-ma-lineal-2': [{ t: 'La lavandería', q: 'Una lavandería cobra 4 mil pesos fijos por visita y 2.5 mil por cada kilo de ropa. Si pagaste 19 mil, ¿cuántos kilos llevaste?', de: 2, v: { b: 4, m: 2.5, e: 0, p: 0, q: 1, s: 0, t: '' }, m: [
    ['Sin ropa ya se pagan 4 mil: la recta empieza en 4.', { t: 'y = 4 + 2.5x' }],
    ['Cada kilo sube la recta 2.5.', { e: 1 }],
    ['Se pagaron 19: quitando lo fijo quedan 15 para los kilos.', { q: 6, t: '19 − 4 = 15' }, '$19 - 4 = 15$'],
    ['A 2.5 por kilo, 15 alcanzan para 6 kilos.', { t: 'x = 6' }, '$15 \\div 2.5 = 6$'],
  ], r: '6 kilos. Dividir 19 entre 2.5 sin quitar lo fijo da 7.6: el error típico.' }],
  'icf-ma-lineal-3': [{ t: 'Dos alquileres de bicicleta', q: 'Ruedas cobra 2 mil fijos y 3 mil por hora; Pedal cobra 10 mil fijos y 1 mil por hora. ¿Con cuántas horas cobran lo mismo y desde cuándo conviene Pedal?', de: 0, v: { b: 2, m: 3, s: 0, b2: 10, m2: 1, e: 0, t: '' }, m: [
    ['Ruedas empieza en 2 y sube 3 por hora.', { t: 'Ruedas: 2 + 3x' }],
    ['Pedal empieza en 10 y sube solo 1.', { s: 1, t: 'Pedal: 10 + x' }],
    ['Al comienzo Pedal va 8 arriba, y cada hora Ruedas se acerca 2.', { t: 'se llevan 8, se acercan 2' }, '$10 - 2 = 8, \\; 3 - 1 = 2$'],
    ['Se alcanzan a las 4 horas: los dos cobran 14 mil.', { e: 1, p: 4, q: 4, t: '4 h: los dos 14' }, '$8 \\div 2 = 4$'],
    ['Después del cruce Ruedas queda arriba: con 6 horas cobra 20 y Pedal, 16.', { q: 6, t: '6 h: 20 contra 16' }, '$2 + 18 = 20, \\; 10 + 6 = 16$'],
  ], r: 'Empatan a las 4 horas (14 mil). Pedal conviene para más de 4 horas; para menos, Ruedas.' }],

  // ------------------------------------------------------------------------------------------------ Triángulos y semejanza
  'icf-ma-forma-1': [{ t: 'La cercha del techo', q: 'La cercha de un techo es un triángulo isósceles y cada ángulo de la base mide 35°. ¿Cuánto mide el ángulo de la punta? Si otra cercha tuviera la punta de 100°, ¿cuánto mediría cada ángulo de su base?', de: 2, v: { a: 35, b: 35, f: 0, t: '' }, m: [
    ['Los dos ángulos de la base miden 35°.', {}],
    ['Entre los dos ya van 70°.', { t: '35 + 35 = 70' }],
    ['La punta completa los 180°: 110°.', { f: 1, t: '35 + 35 + 110 = 180' }, '$180 - 70 = 110$'],
    ['Con la punta de 100° quedan 80° para la base, repartidos en dos ángulos iguales.', { a: 40, b: 40, t: '40 + 40 + 100 = 180' }, '$(180 - 100) \\div 2 = 40$'],
  ], r: 'La punta mide 110°; con la punta de 100°, cada ángulo de la base mide 40°.' }],
  'icf-ma-forma-2': [{ t: 'La escalera contra la pared', q: 'Una escalera de 6.5 m se apoya en una pared vertical con el pie a 2.5 m de ella. ¿A qué altura de la pared llega?', de: 2, en: { fichas: ['42.25', '6.25', '36', '6'] }, m: [
    ['La escalera queda frente al ángulo recto del piso con la pared: es la hipotenusa.', {}],
    ['El cuadrado de la escalera mide 42.25.', { pon: { 0: '42.25' } }, '$6.5^2 = 42.25$'],
    ['El del tramo del piso, 6.25.', { pon: { 1: '6.25' } }, '$2.5^2 = 6.25$'],
    ['Lo que le falta al cuadrado grande es el cuadrado de la altura.', { pon: { 2: '36' } }, '$42.25 - 6.25 = 36$'],
    ['La altura mide 6 m.', { pon: { 3: '6' } }, '$\\sqrt{36} = 6$'],
  ], r: '6 m. Sumar los cuadrados daría $\\sqrt{48.5} \\approx 7$ m: más que la escalera, imposible.' }],
  'icf-ma-forma-3': [{ t: 'Calles paralelas', q: 'Tres calles paralelas cortan dos avenidas. Sobre la primera avenida, las cuadras entre calles miden 90 m y 150 m; sobre la segunda, la primera cuadra mide 60 m. ¿Cuánto mide la segunda cuadra de esa avenida?', de: 2, en: { fichas: ['90', '150', '60', '100'] }, m: [
    ['En la primera avenida las cuadras miden 90 y 150.', { pon: { 0: '90', 1: '150' } }],
    ['La segunda es cinco tercios de la primera.', { marca: [0, 1] }, '$\\tfrac{150}{90} = \\tfrac53$'],
    ['En la otra avenida la primera cuadra mide 60.', { pon: { 2: '60' }, marca: [] }],
    ['Las paralelas guardan la razón: 60 por cinco tercios.', { pon: { 3: '100' } }, '$60 \\cdot \\tfrac53 = 100$'],
  ], r: '100 m. Restar (150 − 90 = 60, y 60 + 60 = 120) es el error típico: la razón se multiplica, no se suma.' }],
  'icf-ma-forma-4': [{ t: 'El cable del poste', q: 'Un cable tensor va desde la punta de un poste de 6 m hasta un punto del suelo a 8 m del pie del poste. ¿Cuánto mide el cable? Halla la tangente, el seno y el coseno del ángulo θ que forma el cable con el suelo.', de: 0, v: { e: 2, f: 0, t: '' }, m: [
    ['θ está abajo, donde el cable toca el suelo.', {}],
    ['Frente a θ queda el poste (opuesto, 6); el suelo lo toca (adyacente, 8). El cable es la hipotenusa.', { f: 1 }, '$\\sqrt{36 + 64} = 10$'],
    ['Tangente: opuesto sobre adyacente.', { t: 'tan θ = 6/8 = 0.75' }, '$\\tfrac68 = 0.75$'],
    ['Seno y coseno llevan abajo la hipotenusa.', { t: 'sen θ = 0.6 · cos θ = 0.8' }, '$\\tfrac{6}{10} = 0.6, \\; \\tfrac{8}{10} = 0.8$'],
  ], r: 'El cable mide 10 m; $\\tan\\theta = 0.75$, $\\operatorname{sen}\\theta = 0.6$ y $\\cos\\theta = 0.8$. Si se cambian opuesto y adyacente, la tangente sale $\\tfrac43$.' }],

  // ------------------------------------------------------------------------------------------------ Ecuaciones en contexto
  'icf-ma-ecuaciones-1': [{ t: 'Las bolsas de arroz', q: 'En una balanza, cinco bolsas iguales de arroz y una pesa de 4 kg equilibran a dos bolsas iguales a esas y 19 kg. ¿Cuánto pesa cada bolsa?', de: 0, v: { a: 5, b: 4, c: 2, d: 19, t: '5x + 4 = 2x + 19' }, m: [
    ['La balanza está derecha: los dos platos pesan lo mismo.', {}],
    ['Se quitan dos bolsas de cada plato y sigue derecha.', { a: 3, c: 0, t: '3x + 4 = 19' }],
    ['Se quitan 4 kg de cada plato.', { b: 0, d: 15, t: '3x = 15' }, '$19 - 4 = 15$'],
    ['Tres bolsas pesan 15: cada una, 5 kg.', { a: 1, d: 5, t: 'x = 5' }, '$15 \\div 3 = 5$'],
  ], r: '5 kg. Se comprueba: $5 \\cdot 5 + 4 = 29$ y $2 \\cdot 5 + 19 = 29$.' }],
  'icf-ma-ecuaciones-2': [{ t: 'La cerca del jardín', q: 'Un jardín rectangular mide $3x + 4$ metros de largo y $x + 2$ de ancho. Escribe su perímetro de la forma más corta. ¿Cuánto mide si $x = 5$?', de: 0, en: { slots: fila('dos largos', 'dos anchos', 'perímetro'), fichas: ['6x + 8', '2x + 4', '8x + 12'] }, m: [
    ['El borde tiene dos largos y dos anchos.', {}],
    ['Dos largos: el 2 multiplica a cada término del paréntesis.', { pon: { 0: '6x + 8' } }, '$2(3x + 4) = 6x + 8$'],
    ['Dos anchos.', { pon: { 1: '2x + 4' } }, '$2(x + 2) = 2x + 4$'],
    ['Se juntan las x con las x y los números con los números.', { pon: { 2: '8x + 12' } }, '$6x + 2x = 8x, \\; 8 + 4 = 12$'],
    ['Todo es múltiplo de 4: queda $4(2x + 3)$. Con $x = 5$, 52 m.', { marca: [2] }, '$4(2 \\cdot 5 + 3) = 52$'],
  ], r: '$8x + 12 = 4(2x + 3)$; con $x = 5$ mide 52 m. El error típico es $2(3x + 4) = 6x + 4$: el 2 multiplica a los dos términos.' }],
  'icf-ma-ecuaciones-3': [{ t: 'Cuadernos y lapiceros', q: 'Tres cuadernos y un lapicero cuestan 15 mil; tres cuadernos y tres lapiceros, 21 mil. ¿Cuánto vale cada cuaderno y cada lapicero?', de: 0, v: { p: 1, q: 3, s: 15, r: 21, t: '' }, m: [
    ['Arriba, tres cuadernos y un lapicero: 15. Abajo, tres cuadernos y tres lapiceros: 21.', {}],
    ['Los cuadernos son los mismos en los dos recibos: la diferencia está en los 2 lapiceros de más.', { t: '3 − 1 = 2 lapiceros más' }],
    ['Esos 2 lapiceros valen 6 mil más: 3 mil cada uno.', { t: '21 − 15 = 6' }, '$6 \\div 2 = 3$'],
    ['Arriba, sin el lapicero, tres cuadernos valen 12: cada uno, 4.', { p: 0, s: 12, t: '15 − 3 = 12' }, '$12 \\div 3 = 4$'],
  ], r: 'Cuaderno 4 mil y lapicero 3 mil. Se comprueba abajo: $12 + 9 = 21$.' }],
  'icf-ma-ecuaciones-4': [{ t: 'Lo que debe sobrar', q: 'Juan tiene 18 mil pesos y compra 3 cuadernos de igual precio x, en miles. Quiere que le queden al menos 6 mil. ¿Qué precios le sirven?', de: 0, v: { b: 4, d: 1, e: 1, t: '¿x ≥ 4?' }, m: [
    ['Se plantea $18 - 3x \\ge 6$ y se quitan 18 de los dos lados: $-3x \\ge -12$. Dividir entre −3 sin más daría x ≥ 4.', {}, '$-3x \\ge 6 - 18$'],
    ['Pero dividir entre un negativo voltea el signo: x ≤ 4. El 4 entra.', { d: -1, t: 'x ≤ 4' }, '$-3x \\ge -12 \\;\\Rightarrow\\; x \\le 4$'],
    ['Se prueba un número pintado: a 3 mil le quedan 9. Sirve.', { t: 'x = 3: quedan 9' }, '$18 - 9 = 9 \\ge 6$'],
    ['Y uno sin pintar: a 5 mil le quedan 3. No alcanza.', { t: 'x = 5: quedan 3' }, '$18 - 15 = 3 < 6$'],
  ], r: 'Le sirve cualquier precio de hasta 4 mil: $x \\le 4$ (y mayor que 0). Olvidar voltear el signo da $x \\ge 4$, justo al revés.' }],

  // ------------------------------------------------------------------------------------------------ Validar procedimientos
  'icf-ma-argumenta-1': [{ t: 'Cali y el Valle', q: 'Todo el que vive en Cali vive en el Valle del Cauca. Sara vive en Cali; Tomás vive en el Valle; Lina no vive en el Valle. ¿Qué se puede concluir de cada uno?', de: 0, v: { a: 'Cali', b: 'Valle', f: 0, x: 150, y: 120, t: '' }, m: [
    ['La frase mete a Cali dentro del Valle.', {}],
    ['Sara está en el círculo pequeño: por fuerza está en el grande. Vive en el Valle.', { f: 1, t: 'Sara: seguro en el Valle' }],
    ['Tomás está en el grande, pero puede estar fuera del pequeño: no se sabe si vive en Cali.', { x: 214, y: 110, t: 'Tomás: no se sabe' }],
    ['Lina está fuera del grande: no puede estar en el pequeño. No vive en Cali.', { x: 290, y: 60, t: 'Lina: seguro no vive en Cali' }],
  ], r: 'Sara vive en el Valle y Lina no vive en Cali; de Tomás no se concluye nada. Usar la frase al revés («vive en el Valle, luego en Cali») es el error típico.' }],
  'icf-ma-argumenta-2': [{ t: 'Termina en 4', q: 'Alguien afirma: «Si un número termina en 4, es múltiplo de 4». ¿Cuál de estos números la tumba: 24, 9 o 14?', de: 2, en: { letras: ['F', 'a', 'b', 'c'], paras: [['Si un número termina en 4, es múltiplo de 4.'], ['24: termina en 4 y es de 4'], ['9: no termina en 4'], ['14: termina en 4 y no es de 4']] }, m: [
    ['Condición: terminar en 4. Conclusión: ser múltiplo de 4.', { luz: [0] }],
    ['El 24 cumple las dos: no la tumba.', { luz: [1], nota: { 1: 'cumple' } }],
    ['El 9 ni siquiera cumple la condición: no sirve para tumbarla.', { luz: [2], tacha: [2], nota: { 2: 'no cuenta' } }],
    ['El 14 termina en 4 y no es múltiplo de 4: cumple la condición y falla la conclusión.', { luz: [3], nota: { 3: 'la tumba' } }, '$14 \\div 4 = 3.5$'],
  ], r: 'El 14. Un contraejemplo tiene que cumplir la condición y fallar la conclusión; con uno solo, la frase es falsa.' }],
  'icf-ma-argumenta-3': [{ t: 'La cerca del lote', q: 'Un lote rectangular tiene 36 m² de área. ¿Alcanza ese dato para saber cuánta cerca necesita? ¿Y si además se sabe que el largo es cuatro veces el ancho?', de: 0, v: { b: 9, h: 4, t: '' }, m: [
    ['Con área 36 puede medir 9 por 4: la cerca sería de 26 m.', { t: '9 · 4: cerca de 26' }, '$2(9 + 4) = 26$'],
    ['O 6 por 6: la cerca sería de 24 m.', { b: 6, h: 6, t: '6 · 6: cerca de 24' }, '$2(6 + 6) = 24$'],
    ['Dos respuestas distintas con el mismo dato: el área sola no alcanza.', { t: 'no alcanza' }],
    ['Si el largo es cuatro veces el ancho, solo queda 12 por 3: 30 m de cerca.', { b: 12, h: 3, t: '12 · 3: cerca de 30' }, '$x \\cdot 4x = 36 \\Rightarrow x = 3$'],
  ], r: 'El área sola no alcanza (puede ser 26, 24, 30…); con los dos datos, la cerca mide 30 m.' }],

  // ------------------------------------------------------------------------------------------------ Dinero y créditos
  'icf-ma-finanzas-1': [{ t: 'El préstamo de la moto', q: 'Se prestan 800 mil pesos al 2.5 % mensual de interés simple. ¿Cuánto se debe, en total, al cabo de 4 meses?', de: 0, en: { slots: angosta(fila('mes 1', 'mes 2', 'mes 3', 'mes 4')), fichas: ['820', '840', '860', '880'] }, m: [
    ['El interés de un mes es el 2.5 % de 800: 20 mil.', {}, '$0.025 \\cdot 800 = 20$'],
    ['Al primer mes se deben 820.', { pon: { 0: '820' } }],
    ['En simple, cada mes se suman los mismos 20, porque siempre se calculan sobre los 800.', { pon: { 1: '840', 2: '860' } }],
    ['Al cuarto mes se deben 880.', { pon: { 3: '880' } }, '$800 + 4 \\cdot 20 = 880$'],
  ], r: '880 mil. Con interés compuesto, al mes 2 ya serían $800 \\cdot 1.025^2 = 840.5$: el interés también ganaría interés.' }],
  'icf-ma-finanzas-2': [{ t: 'El televisor en oferta', q: 'Un televisor de 2 000 000 de pesos tiene 30 % de descuento y, si se paga en efectivo, un 10 % adicional sobre el precio ya rebajado. ¿Cuánto se paga y cuál es el descuento total?', de: 2, v: { q: 100, t: 'precio completo' }, m: [
    ['El precio completo es la barra entera: el 100 %.', {}],
    ['Con el 30 % de descuento queda el 70 %.', { q: 70, t: '30 % menos' }, '$1 - 0.3 = 0.7$'],
    ['El 10 % adicional se saca de ese 70 %: se va un 7 % más.', { q: 63, t: 'y 10 % de lo que quedó' }, '$0.7 \\cdot 0.9 = 0.63$'],
    ['Se paga el 63 %: el descuento total es del 37 %.', { t: 'descuento total: 37 %' }, '$2\\,000\\,000 \\cdot 0.63 = 1\\,260\\,000$'],
  ], r: 'Se pagan 1 260 000 pesos: un descuento del 37 %, no del 40 %. Los porcentajes sucesivos no se suman.' }],

  // ------------------------------------------------------------------------------------------------ Funciones que curvan
  'icf-ma-curvas-1': [{ t: 'El chorro de la fuente', q: 'El chorro de una fuente sale del suelo a 1 m de una pared y cae a 9 m de ella; su altura es $h = -0.5(x - 1)(x - 9)$. A 3 m de la pared va a 6 m de altura. ¿En qué otro punto vuelve a estar a 6 m y cuál es su altura máxima?', escena: 'dibujo', en: { dib: parab, v: { c: 0, e: 0, p: 0, v: 0, t: '' }, alto: 198 }, m: [
    ['El chorro sale en 1 y cae en 9: ahí la altura es cero.', { c: 1 }],
    ['La parábola es simétrica: su eje está a mitad de camino, en 5.', { e: 1 }, '$\\tfrac{1 + 9}{2} = 5$'],
    ['En 3 va a 6 m. El 3 está 2 antes del eje; 2 después, en 7, va a la misma altura.', { p: 1 }, '$5 - 3 = 2, \\; 5 + 2 = 7$'],
    ['Lo más alto está sobre el eje: se reemplaza x = 5.', { v: 1 }, '$-0.5 \\cdot 4 \\cdot (-4) = 8$'],
  ], r: 'Vuelve a estar a 6 m a 7 m de la pared, y su altura máxima es 8 m, a 5 m de la pared.' }],
  'icf-ma-curvas-2': [{ t: 'El rumor', q: 'Un rumor lo conocen 4 personas el día 0 y cada día el número de personas que lo saben se triplica. ¿Cuántas lo saben el día 4? ¿Cuántas veces más que el día 1?', escena: 'dibujo', en: { dib: rumor, v: { n: 0 }, alto: 186 }, m: [
    ['El día 0 lo saben 4 personas: la barra casi no se ve.', {}],
    ['Cada día se multiplica por 3: 12 el día 1 y 36 el día 2.', { n: 2 }, '$4 \\cdot 3^2 = 36$'],
    ['El día 3 son 108: al principio parecía poco y ahora se dispara.', { n: 3 }, '$36 \\cdot 3 = 108$'],
    ['El día 4 son 324. Del día 1 al 4 hay tres pasos de por 3: se multiplicó por 27.', { n: 4 }, '$4 \\cdot 3^4 = 324, \\; 3^3 = 27$'],
  ], r: '324 personas, 27 veces las 12 del día 1. No son 9 veces (3 · 3): son tres pasos de por 3. Sumar 3 cada día (4, 7, 10…) sería una recta.' }],
  'icf-ma-curvas-3': [{ t: 'La rueda del molino', q: 'Un balde de la rueda de un molino de agua sube y baja entre 1 m y 5 m de altura. Está en lo más alto a los 3 s y otra vez a los 15 s. ¿Cuáles son el periodo, la línea media y la amplitud, y cuándo está en lo más bajo?', escena: 'dibujo', en: { dib: marea, v: { q: 0, m: 0, a: 0, b: 0, t: '' }, alto: 196 }, m: [
    ['La altura del balde sube hasta 5 y baja hasta 1, una y otra vez.', {}],
    ['De lo más alto a lo más alto pasan 12 segundos: ese es el periodo.', { q: 1 }, '$15 - 3 = 12$'],
    ['La línea media está a mitad de camino entre 1 y 5.', { m: 1, t: 'línea media: 3 m' }, '$\\tfrac{1 + 5}{2} = 3$'],
    ['De la línea media a lo más alto hay 2 m: la amplitud.', { a: 1, t: 'amplitud: 2 m' }, '$5 - 3 = 2$'],
    ['Lo más bajo llega medio periodo después de lo más alto: a los 9 s y a los 21 s.', { b: 1, t: 'lo más bajo: 9 s y 21 s' }, '$3 + 6 = 9$'],
  ], r: 'Periodo 12 s, línea media 3 m y amplitud 2 m; lo más bajo, a los 9 s y a los 21 s. La amplitud no es 4: eso mide de lo más bajo a lo más alto.' }],
  'icf-ma-curvas-4': [{ t: 'El saldo de la tarjeta', q: 'El saldo de una tarjeta de transporte, en miles, es $S = 24 - 3v$ después de v viajes. ¿Con cuánto empezó, cuándo queda en cero y qué valores tiene sentido que tome v?', de: 0, v: { r: '24 − 3v', x: 0, y: 24, s: 0, t: '' }, m: [
    ['Sin viajes, entra 0 y sale el saldo inicial: 24 mil. Es el corte con el eje y.', { s: 1, t: 'corte con el eje y' }, '$24 - 3 \\cdot 0 = 24$'],
    ['Con 5 viajes quedan 9 mil. Cada entrada da una sola salida.', { x: 5, y: 9, t: 'después de 5 viajes' }, '$24 - 15 = 9$'],
    ['Queda en cero cuando 3v llega a 24: a los 8 viajes. Es el corte con el eje x.', { x: 8, y: 0, t: 'corte con el eje x' }, '$24 - 3v = 0 \\Rightarrow v = 8$'],
    ['No hay viajes negativos, ni medios, ni más de 8 con ese saldo.', { t: 'dominio: 0, 1, …, 8' }],
  ], r: 'Empezó con 24 mil y queda en 0 a los 8 viajes; v va de 0 a 8, en enteros. El rango va de 0 a 24, de 3 en 3.' }],

  // ------------------------------------------------------------------------------------------------ Movimientos y vistas
  'icf-ma-espacio-1': [{ t: 'Reflejar y bajar', q: 'El triángulo de vértices A(1, 1), B(3, 1) y C(1, 3) se refleja en el eje y y después se traslada 3 unidades hacia abajo. ¿Dónde queda B? ¿Cambia el área?', de: 0, v: { dx: 0, dy: 0, e: 1, g: 0, k: 1, t: '' }, m: [
    ['El triángulo está arriba a la derecha; su copia todavía está encima.', {}],
    ['Se refleja en el eje y: cada punto queda igual de lejos, al otro lado. La x cambia de signo.', { e: -1, t: 'reflejo en el eje y' }, '$B(3, 1) \\to (-3, 1)$'],
    ['Ahora baja 3: a cada y se le restan 3.', { dy: -3, t: 'y después 3 hacia abajo' }, '$(-3, 1) \\to (-3, -2)$'],
    ['Ningún lado se estiró: el área sigue siendo 2.', { t: 'área 2 antes y después' }, '$\\tfrac{2 \\cdot 2}{2} = 2$'],
  ], r: 'B queda en (−3, −2) y el área no cambia: reflejar y trasladar no deforman.' }],
  'icf-ma-espacio-2': [{ t: 'Cubos vistos de frente', q: 'En la vista desde arriba de una figura de cubos, cada casilla dice cuántos cubos hay apilados. Las filas, de atrás hacia el frente, son 2, 0, 1; 3, 1, 2, y 1, 2, 0. ¿Cómo se ve la figura de frente y cuántos cubos tiene?', escena: 'dibujo', en: { dib: vista, v: { c: -1, n: 0, t: '' }, alto: 208 }, m: [
    ['Cada número es la altura de la torre que está en esa casilla.', {}],
    ['De frente, en cada columna solo se ve la torre más alta. En la primera hay 2, 3 y 1: se ven 3 cubos.', { c: 0, n: 1 }],
    ['En la segunda columna, 0, 1 y 2: se ven 2.', { c: 1, n: 2 }],
    ['En la tercera, 1, 2 y 0: se ven 2.', { c: 2, n: 3 }],
    ['Pero la figura tiene 12 cubos: la vista esconde los de atrás.', { c: -1, t: 'en total: 12 cubos' }, '$3 + 6 + 3 = 12$'],
  ], r: 'De frente se ven columnas de 3, 2 y 2 cubos; la figura tiene 12. Contar solo lo que se ve daría 7.' }],
  'icf-ma-espacio-3': [{ t: 'De la casa al colegio', q: 'En un mapa con cuadrícula de 1 km, la casa está en A(−1, 2) y el colegio en B(4, 14). ¿Qué distancia hay en línea recta? ¿Dónde queda el punto que está justo a mitad de camino?', escena: 'dibujo', en: { dib: mapa, v: { l: 0, h: 0, m: 0 }, alto: 196 }, m: [
    ['La casa en A(−1, 2) y el colegio en B(4, 14).', {}],
    ['Se restan las x: 5 km a la derecha. Se restan las y: 12 km hacia arriba.', { l: 1 }, '$4 - (-1) = 5, \\; 14 - 2 = 12$'],
    ['Los dos tramos forman un triángulo rectángulo: la línea recta es su hipotenusa.', { h: 1 }, '$\\sqrt{25 + 144} = \\sqrt{169} = 13$'],
    ['El punto medio promedia las coordenadas.', { m: 1 }, '$\\tfrac{-1 + 4}{2} = 1.5, \\; \\tfrac{2 + 14}{2} = 8$'],
  ], r: '13 km en línea recta; la mitad del camino queda en (1.5, 8). Restar 4 − 1 en lugar de 4 − (−1) daría un tramo de 3: el error típico.' }],

  // ------------------------------------------------------------------------------------------------ Dispersión y comparación
  'icf-ma-dispersion-1': [{ t: '¿Quién es más regular?', q: 'Ana tardó 4, 5, 5 y 6 minutos en cuatro vueltas a la pista; Beto, 2, 4, 6 y 8 minutos. ¿Tienen el mismo promedio? ¿Quién es más regular? Compara sus varianzas.', escena: 'dibujo', en: { dib: vueltas, v: { m: 0, d: 0, q: 0, a: 0, t: '' }, alto: 198 }, m: [
    ['Los dos promedian 5 minutos por vuelta.', { m: 1 }, '$\\tfrac{4 + 5 + 5 + 6}{4} = \\tfrac{2 + 4 + 6 + 8}{4} = 5$'],
    ['Pero los tiempos de Beto se apartan 3, 1, 1 y 3 del promedio.', { d: 1 }],
    ['Se elevan al cuadrado y se promedian: la varianza de Beto es 5.', { q: 1, t: 'Beto: varianza 5' }, '$\\tfrac{9 + 1 + 1 + 9}{4} = 5$'],
    ['La de Ana es 0.5: sus tiempos casi no cambian.', { a: 1, t: 'Ana: varianza 0.5' }, '$\\tfrac{1 + 0 + 0 + 1}{4} = 0.5$'],
  ], r: 'Mismo promedio, pero Ana es más regular: varianza 0.5 contra 5 (desviaciones de 0.71 y 2.24 min, aproximadas). El promedio no dice qué tan regados están los datos.' }],
  'icf-ma-dispersion-2': [{ t: 'La caja de las edades', q: 'Las edades de los nueve jugadores de un equipo son 18, 25, 16, 21, 15, 22, 16, 19 y 17. ¿Cuáles son la mediana y los cuartiles? ¿Cuánto mide la caja?', escena: 'dibujo', en: { dib: cajaEdad, v: { k: 0, t: '' }, alto: 198 }, m: [
    ['Primero se ordenan sobre la recta: 15, 16, 16, 17, 18, 19, 21, 22 y 25.', {}],
    ['La del centro es la quinta, 18: deja cuatro a cada lado.', { k: 1 }, '$\\text{mediana} = 18$'],
    ['Abajo quedan 15, 16, 16 y 17: su centro es 16. Arriba, 19, 21, 22 y 25: su centro está entre 21 y 22. Sin contar la mediana, cada mitad tiene cuatro datos.', { k: 2 }, '$Q_1 = 16, \\; Q_3 = \\tfrac{21 + 22}{2} = 21.5$'],
    ['La caja va de Q1 a Q3 y guarda la mitad central; los bigotes llegan a 15 y a 25.', { k: 3, t: 'caja de 5.5 años' }, '$21.5 - 16 = 5.5$'],
  ], r: 'Mediana 18, $Q_1 = 16$ y $Q_3 = 21.5$; la caja mide 5.5 años. Sin ordenar, el del centro de la lista sería 15: el error típico.' }],
  'icf-ma-dispersion-3': [{ t: 'Heladerías y bicicletas', q: 'En ocho ciudades se contaron las heladerías y las bicicletas robadas en un año, y la nube de puntos sube. ¿Qué correlación hay? ¿Se puede decir que las heladerías causan los robos?', de: 0, v: { s: 0.9, d: 0, l: 0, t: '' }, m: [
    ['Cada punto es una ciudad: cuántas heladerías tiene y cuántas bicicletas le roban.', {}],
    ['Los puntos suben juntos: la correlación es positiva y bastante fuerte.', { l: 1, t: 'correlación positiva' }],
    ['Pero cerrar heladerías no salva bicicletas: las ciudades grandes tienen más de las dos cosas.', { t: '¿causa? no: el tamaño' }],
    ['Si al contar por cada mil habitantes la nube pierde el rumbo, la relación venía del tamaño.', { s: 0, d: 1, l: 0, t: 'por habitante: sin rumbo' }],
  ], r: 'Correlación positiva, pero no hay causa: el tamaño de la ciudad mueve las dos cosas. Ir juntas no es causar.' }],

  // ------------------------------------------------------------------------------------------------ Números y sucesiones
  'icf-ma-numeros-1': [{ t: 'La luz del Sol', q: 'El Sol está a unos 150 000 000 km de la Tierra y la luz viaja a unos 300 000 km por segundo. Escribe los dos números en notación científica. ¿Cuántos segundos tarda la luz en llegar?', de: 4, en: { slots: fila('distancia', 'velocidad', 'tiempo'), fichas: ['1.5·10⁸', '3·10⁵', '5·10²'] }, m: [
    ['Ciento cincuenta millones: la coma corre 8 lugares hasta dejar 1.5.', { pon: { 0: '1.5·10⁸' } }, '$150\\,000\\,000 = 1.5 \\cdot 10^8$'],
    ['Trescientos mil: la coma corre 5 lugares.', { pon: { 1: '3·10⁵' } }, '$300\\,000 = 3 \\cdot 10^5$'],
    ['Tiempo es distancia entre velocidad: los números se dividen y los exponentes se restan.', { marca: [0, 1] }, '$\\tfrac{1.5}{3} = 0.5, \\; 10^{8 - 5} = 10^3$'],
    ['0.5 no está entre 1 y 10: se corre la coma y queda 5 por 10 a la 2.', { pon: { 2: '5·10²' }, marca: [] }, '$0.5 \\cdot 10^3 = 5 \\cdot 10^2 = 500$'],
  ], r: '500 segundos, unos 8 minutos y 20 segundos. Dividir los exponentes (8 ÷ 5) en vez de restarlos es el error típico.' }],
  'icf-ma-numeros-2': [{ t: 'Fútbol y voleibol', q: 'De 50 estudiantes, 28 juegan fútbol, 21 juegan voleibol y 9 juegan los dos. ¿Cuántos juegan solo voleibol? ¿Cuántos no juegan ninguno?', escena: 'dibujo', en: { dib: venn2, v: { a: 0, b: 0, u: 0, t: '' }, alto: 178 }, m: [
    ['De los 50, 28 juegan fútbol y 21 voleibol.', { t: '50 estudiantes' }],
    ['Se empieza por el centro: 9 juegan los dos.', { b: 1 }],
    ['Solo fútbol son 19 y solo voleibol, 12.', { a: 1 }, '$28 - 9 = 19, \\; 21 - 9 = 12$'],
    ['En alguno de los dos hay 40: afuera quedan 10.', { u: 1, t: 'ninguno: 10' }, '$19 + 9 + 12 = 40, \\; 50 - 40 = 10$'],
  ], r: '12 juegan solo voleibol y 10 no juegan ninguno. Sumar 28 + 21 = 49 cuenta dos veces a los 9 del centro.' }],
  'icf-ma-numeros-3': [{ t: 'Las sillas del teatro', q: 'En un teatro, la fila 1 tiene 18 sillas y cada fila tiene 3 sillas más que la anterior. ¿Cuántas sillas tiene la fila 12? ¿Qué fila tiene 60 sillas?', de: 0, en: { slots: angosta(fila('fila 1', 'fila 2', 'fila 12', 'con 60')), fichas: ['18', '21', '51', '15'] }, m: [
    ['La fila 1 tiene 18 sillas.', { pon: { 0: '18' } }],
    ['Cada fila suma 3: la segunda tiene 21.', { pon: { 1: '21' } }],
    ['De la fila 1 a la 12 hay 11 saltos de 3.', { pon: { 2: '51' } }, '$18 + 11 \\cdot 3 = 51$'],
    ['Para 60 faltan 42 sobre las 18 de la primera: son 14 saltos, que llevan a la fila 15.', { pon: { 3: '15' } }, '$(60 - 18) \\div 3 = 14, \\; 1 + 14 = 15$'],
  ], r: 'La fila 12 tiene 51 sillas y la fila 15 tiene 60. Hacer $18 + 12 \\cdot 3 = 54$ cuenta un salto de más.' }],
});
