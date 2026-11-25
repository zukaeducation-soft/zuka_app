// Segundo ejemplo dibujado de las lecciones de Razonamiento lógico (mismo formato que rl.js; va después).
const mas = {
  'pu-cm-1': { t: 'La distancia entre dos cotas', q: 'Un buzo está a −3 m y una gaviota a 5 m. ¿Qué distancia vertical los separa?', de: 4, en: { ancla: -3, desde: -3 }, m: [
    ['Se cuentan los pasos desde −3 hasta 5, no se restan a ojo los números.', { de: -3, a: -3 }],
    ['Tres pasos hasta el 0 y cinco más al otro lado.', { de: -3, a: 5 }, '$3 + 5 = 8$'],
    ['Con barras: lo que hay entre los dos, sin signo.', { de: 5, a: 5 }, '$|5 - (-3)| = 8$'],
  ], r: '8 m. Restar 5 − 3 y decir 2 es olvidar que están a lados distintos del 0.' },
  'pu-cm-2': { t: 'Las gafas del salón', q: 'En un salón de 24 estudiantes, $\\tfrac38$ usan gafas. ¿Cuántos no usan?', de: 6, m: [
    ['La barra entera son los 24 estudiantes.', { barras: [{ n: 0, d: 1, total: 24 }] }],
    ['El 8 de abajo dice en cuántos grupos se reparten: quedan 3 en cada uno.', { barras: [{ n: 0, d: 8, total: 24 }] }, '$24 \\div 8 = 3$'],
    ['El 3 de arriba dice cuántos grupos usan gafas: son 9 estudiantes.', { barras: [{ n: 3, d: 8, total: 24 }] }, '$3 \\cdot 3 = 9$'],
    ['Quedan 5 grupos de 3 sin gafas.', {}, '$5 \\cdot 3 = 15$'],
  ], r: '15 estudiantes. La pregunta era por los que **no** usan.' },
  'pu-cm-3': { t: 'Armar un porcentaje', q: 'Sin calculadora, ¿cuánto es el 35 % de 40 000 pesos?', de: 4, m: [
    ['Los 40 000 se reparten entre las 100 casillas: 400 pesos en cada una.', { k: 100 }, '$40\\,000 \\div 100 = 400$'],
    ['La pieza cómoda es el 10 %: 4 000 pesos.', { k: 10 }, '$10 \\cdot 400 = 4\\,000$'],
    ['Tres piezas hacen el 30 %.', { k: 30 }, '$3 \\cdot 4\\,000 = 12\\,000$'],
    ['Falta un 5 %, media pieza: 2 000. Se suma.', { k: 35 }, '$12\\,000 + 2\\,000 = 14\\,000$'],
  ], r: '14 000 pesos.' },
  'pu-ar-1': { t: 'De atrás hacia adelante', q: 'Luis gastó la mitad de su dinero y luego la tercera parte de lo que le quedaba. Le sobraron 20 mil. ¿Cuánto tenía?', de: 4, v: { T: 60, g1: 30, g2: 10, n1: 2, n2: 3, eq: 'sobraron 20' }, m: [
    ['Lo único que se sabe está al final: los 20 mil. Desde ahí se regresa.', {}],
    ['Si gastó un tercio de lo que había, los 20 son los otros dos tercios: cada tercio vale 10.', { e2: '10' }, '$20 \\div 2 = 10$'],
    ['Antes de ese gasto tenía tres tercios: 30 mil. Y esos 30 eran la mitad del principio.', { e1: '30' }, '$3 \\cdot 10 = 30$'],
    ['La otra mitad vale lo mismo.', { t: '60' }, '$2 \\cdot 30 = 60$'],
  ], r: '60 mil. Comprobamos: 60 − 30 = 30; un tercio de 30 son 10; quedan 20.' },
  'pu-ar-2': { t: 'La nota definitiva', q: 'El taller vale el 40 % y el examen, el 60 %. Sara sacó 4.5 y 3.5. ¿Cuál es su definitiva?', de: 4, v: { w: [40, 60], nt: ['4.5', '3.5'], ap: ['1.8', '2.1'], a: 0, t: '' }, m: [
    ['El ancho de cada pedazo es lo que pesa esa nota.', {}],
    ['Cada nota aporta su porcentaje: el 40 % de 4.5 y el 60 % de 3.5.', { a: 1 }, '$0.4 \\cdot 4.5 = 1.8$ y $0.6 \\cdot 3.5 = 2.1$'],
    ['La definitiva es la suma de los aportes.', { t: '3.9' }, '$1.8 + 2.1 = 3.9$'],
  ], r: '3.9. El promedio simple daría 4.0: el examen pesa más y baja la nota.' },
  'pu-ar-4': { t: 'El corral más grande', q: 'Con 20 m de malla se cerca un corral rectangular. ¿Cuál es la mayor área posible, con medidas enteras?', de: 2, v: { a: 1, S: 10, u: 15 }, m: [
    ['Dos largos y dos anchos gastan 20 m: un largo y un ancho suman 10. Con 1 por 9 hay poco espacio.', {}, '$1 \\cdot 9 = 9$'],
    ['Con 2 por 8 ya son 16.', { a: 2 }, '$2 \\cdot 8 = 16$'],
    ['Con 4 por 6, 24.', { a: 4 }, '$4 \\cdot 6 = 24$'],
    ['Con 5 por 5, 25: es el cuadrado. Después (6 por 4) vuelve a bajar.', { a: 5 }, '$5 \\cdot 5 = 25$'],
  ], r: '25 m². Con el mismo borde, gana el más parejo.' },
  'pu-op-1': { t: 'Cuidado con el signo', q: 'Si $a \\mathbin{\\blacklozenge} b = a^2 - 2b$, ¿cuánto vale $(-3) \\mathbin{\\blacklozenge} 4$? ¿Y $4 \\mathbin{\\blacklozenge} (-3)$?', de: 2, v: { re: 'a ◆ b = a² − 2b' }, m: [
    ['El primero se eleva al cuadrado; del segundo se resta el doble.', {}],
    ['En (−3) ◆ 4 el cuadrado es de todo el −3, con su signo: da 9.', { a: '−3', b: '4', c: '(−3)² − 2 · 4' }, '$(-3)^2 = 9$'],
    ['Nueve menos ocho.', { r: '1' }, '$9 - 8 = 1$'],
    ['En 4 ◆ (−3) se resta el doble de un negativo: restar −6 es sumar 6.', { a: '4', b: '−3', c: '4² − 2 · (−3)', r: '22' }, '$16 + 6 = 22$'],
  ], r: '1 y 22.' },
  'pu-pr-1': { t: 'Del mapa al camino', q: 'En un mapa a escala 1 : 25 000 un sendero mide 6 cm. ¿Cuántos kilómetros son?', de: 4, v: { cm: 1, real: 0, esc: '25 000', txt: '' }, m: [
    ['1 cm del mapa son 25 000 cm del terreno. Las dos medidas están en centímetros.', {}],
    ['25 000 cm son 250 m, porque cada metro tiene 100 cm.', { real: 1, txt: '25 000 cm = 250 m' }, '$25\\,000 \\div 100 = 250$'],
    ['El sendero tiene 6 de esos centímetros.', { cm: 6, txt: '6 · 250 m = 1 500 m' }, '$6 \\cdot 250 = 1\\,500$'],
    ['1 500 m son un kilómetro y medio.', { txt: '1.5 km' }],
  ], r: '1.5 km.' },
  'pu-pr-2': { t: 'La tela', q: 'Tres metros de tela cuestan 15 mil pesos. ¿Cuánto cuestan 8 metros?', de: 0, v: { X: 10, Y: 50, x: 3, k: 5, ex: 'metros', ey: 'precio (miles)' }, m: [
    ['Más metros, más precio, siempre en la misma proporción: si una barra crece al doble, la otra también.', {}],
    ['El camino corto es averiguar cuánto vale uno.', { x: 1 }, '$15 \\div 3 = 5$'],
    ['Ocho metros son ocho veces eso.', { x: 8 }, '$8 \\cdot 5 = 40$'],
  ], r: '40 mil pesos.' },
  'pu-pr-3': { t: 'Al encuentro', q: 'Dos ciclistas están a 240 km y salen al tiempo, uno hacia el otro, a 50 y 30 km/h. ¿En cuántas horas se encuentran?', de: 0, v: { D: 240, va: 50, vb: 30, t: 0 }, m: [
    ['Los dos avanzan sobre el mismo camino: la distancia se la van comiendo entre ambos.', {}],
    ['En una hora uno recorre 50 y el otro 30: se acercan 80.', { t: 1 }, '$50 + 30 = 80$'],
    ['¿Cuántas veces cabe 80 en 240?', { t: 3 }, '$240 \\div 80 = 3$'],
  ], r: 'En 3 horas. El primero recorrió 150 km y el segundo 90: suman 240.' },
  'pu-pr-4': { t: '¿Qué porcentaje es?', q: 'De 40 preguntas, Ana acertó 14. ¿Qué porcentaje acertó?', de: 2, v: { p: 35, T: 40, q: 14, ocp: 1 }, m: [
    ['La parte son 14 y el total, 40. La parte va arriba.', {}, '$\\tfrac{14}{40}$'],
    ['Si 40 fueran 100, se multiplicaría por 2.5. Los 14 también.', {}, '$14 \\cdot 2.5 = 35$'],
    ['Acertó el 35 %. La cuenta corta: parte entre total, por 100.', { ocp: 0 }, '$14 \\div 40 = 0.35$'],
  ], r: '35 %.' },
  'pu-ec-1': { t: 'La balanza con cajas a los dos lados', q: 'Resuelve $4x + 3 = x + 18$.', de: 2, v: { c1: 4, p1: 3, c2: 1, p2: 18, d: 0, t: '4x + 3 = x + 18' }, m: [
    ['Cuatro cajas y 3 equilibran una caja y 18. Lo que se haga, se hace en los dos platos.', {}],
    ['Se quita una caja de cada plato: sigue en equilibrio.', { c1: 3, c2: 0, t: '3x + 3 = 18' }, '$4x - x = 3x$'],
    ['Se quitan 3 de cada plato.', { p1: 0, p2: 15, t: '3x = 15' }, '$18 - 3 = 15$'],
    ['Tres cajas pesan 15: una pesa 5.', { c1: 1, p2: 5, t: 'x = 5' }, '$15 \\div 3 = 5$'],
  ], r: '$x = 5$. Comprobamos: $4 \\cdot 5 + 3 = 23$ y $5 + 18 = 23$.' },
  'pu-ec-2': { t: 'El café mezclado', q: 'Se mezclan 4 kg de café de 5 mil el kilo con 1 kg de café de 10 mil. ¿Cuánto vale el kilo de la mezcla?', de: 4, v: { a: 1, pa: 5, b: 1, pb: 10 }, m: [
    ['Si fuera un kilo de cada uno, quedaría en la mitad: 7.5.', {}],
    ['Pero hay cuatro veces más del barato: el precio se corre hacia 5.', { a: 4 }],
    ['Se suma todo lo que vale y se reparte entre los 5 kilos.', {}, '$\\tfrac{4 \\cdot 5 + 1 \\cdot 10}{5} = \\tfrac{30}{5} = 6$'],
  ], r: '6 mil el kilo.' },
  'pu-ec-3': { t: 'Suma y diferencia', q: 'Dos números suman 24 y se llevan 4. ¿Cuáles son?', de: 2, v: { s: 10, d: 4, p: 'suman 24', n: 0 }, m: [
    ['El mayor es igual al menor y un pedazo más, de 4.', {}],
    ['Sin ese pedazo los dos serían iguales y sumarían 20.', { d: 0, p: '24 − 4 = 20' }, '$24 - 4 = 20$'],
    ['Cada uno es la mitad: 10. Ese es el menor.', { n: 1, p: 'menor: 10' }, '$20 \\div 2 = 10$'],
    ['Al mayor se le devuelve su pedazo.', { d: 4, p: 'mayor: 14' }, '$10 + 4 = 14$'],
  ], r: '10 y 14.' },
  'pu-nu-2': { t: 'Cortar dos cuerdas', q: 'Dos cuerdas miden 18 y 24 m. Se cortan en pedazos iguales, lo más largos posible y sin que sobre. ¿Cuánto mide cada pedazo?', de: 2, v: { a: 18, b: 24, s: 1 }, m: [
    ['El pedazo debe dividir exactamente a los dos largos. Con 1 m siempre se puede, pero es muy corto.', {}],
    ['Con 4 m, en la primera sobran 2: no sirve.', { s: 4 }, '$18 = 4 \\cdot 4 + 2$'],
    ['Con 6 m no sobra en ninguna: tres pedazos y cuatro pedazos.', { s: 6 }, '$18 = 3 \\cdot 6$ y $24 = 4 \\cdot 6$'],
    ['Más largo no se puede: 9 divide a 18, pero no a 24, y 8 divide a 24, pero no a 18.', { s: 9 }],
  ], r: '6 m, el máximo común divisor.' },
  'pu-ge-1': { t: 'El ángulo del hexágono', q: '¿Cuánto mide cada ángulo interior de un hexágono regular?', de: 6, v: { n: 6, f: 0 }, m: [
    ['Seis lados iguales y seis ángulos iguales. No se sabe cuánto miden, pero sí cómo sumarlos.', {}],
    ['Desde un vértice se corta en triángulos: salen cuatro, dos menos que los lados.', { f: 1 }, '$6 - 2 = 4$'],
    ['Cada triángulo aporta 180°, y la suma se reparte entre los seis ángulos.', {}, '$4 \\cdot 180^\\circ = 720^\\circ$ y $720^\\circ \\div 6 = 120^\\circ$'],
  ], r: '120°.' },
  'pu-ge-4': { t: 'Un pedazo de pizza', q: 'Una pizza tiene 6 de radio. ¿Cuál es el área de una porción de 120°?', de: 8, v: { g: 360, r: 6 }, m: [
    ['La pizza entera: π por el radio al cuadrado.', {}, '$\\pi \\cdot 6^2 = 36\\pi$'],
    ['120° es la tercera parte de una vuelta.', { g: 120 }, '$\\tfrac{120}{360} = \\tfrac13$'],
    ['La porción es la tercera parte del área.', {}, '$36\\pi \\div 3 = 12\\pi$'],
  ], r: '$12\\pi$.' },
  'pu-ge-6': { t: 'Forrar una caja', q: '¿Cuánto papel se necesita para forrar, sin pliegues, una caja de 4 por 3 de base y 2 de alto?', de: 4, v: { a: 4, b: 3, h: 2, s: 0 }, m: [
    ['Forrar es cubrir las caras: se suman áreas, no volumen.', {}],
    ['Al abrirla se ven seis rectángulos, en tres parejas iguales.', { s: 1 }],
    ['Tapa y base: 12 cada una. Frente y atrás: 8. Costados: 6. Y hay dos de cada una.', {}, '$2 \\cdot (12 + 8 + 6) = 52$'],
  ], r: '52 unidades cuadradas.' },
  'pu-cj-2': { t: 'Las dos barras', q: 'En un grupo de 28, 18 tienen bicicleta (A), 15 tienen patines (B) y 4 no tienen ninguno. ¿Cuántos tienen las dos cosas?', de: 2, v: { T: 28, M: 34, n: 4, a: 18, b: 15, s: 0 }, m: [
    ['Con alguna de las dos hay 28 menos 4: es la línea hasta donde pueden llegar las barras.', {}, '$28 - 4 = 24$'],
    ['Pero 18 y 15 suman 33: se pasan por 9.', {}, '$33 - 24 = 9$'],
    ['Para que quepan hay que solaparlas: esos 9 se contaron dos veces.', { s: 9 }],
  ], r: '9 personas. Solo bicicleta, 9; solo patines, 6; 9 + 9 + 6 = 24.' },
  'pu-co-5': { t: 'Diagonales del heptágono', q: '¿Cuántas diagonales tiene un polígono de 7 lados?', de: 2, v: { n: 7, una: 0, todas: 0 }, m: [
    ['Desde un vértice no salen diagonales a él mismo ni a sus dos vecinos.', {}],
    ['Quedan cuatro.', { una: 1 }, '$7 - 3 = 4$'],
    ['Siete vértices con cuatro diagonales serían 28, pero cada una se contó desde sus dos puntas.', { todas: 1 }, '$\\tfrac{7 \\cdot 4}{2} = 14$'],
  ], r: '14 diagonales.' },
  'pu-pb-1': { t: 'Par o mayor que 4', q: 'Se lanza un dado. ¿Cuál es la probabilidad de que salga un número par o mayor que 4?', de: 0, v: { s: [], p: '' }, m: [
    ['Seis casos, todos igual de fáciles.', {}],
    ['Pares: 2, 4 y 6.', { s: [2, 4, 6], p: 'par' }],
    ['Mayores que 4: 5 y 6. El 6 ya estaba marcado: no se cuenta otra vez.', { s: [2, 4, 5, 6], p: 'par o mayor que 4' }, '$\\tfrac46 = \\tfrac23$'],
  ], r: '$\\tfrac23$. Sumar 3 + 2 cuenta el 6 dos veces.' },
  'pu-pb-2': { t: 'Al menos una cara', q: 'Se lanzan tres monedas. ¿Cuál es la probabilidad de que salga al menos una cara?', de: 0, v: { p: 0.875, f: 0, ta: '7/8', tb: '1/8', ea: 'al menos una', eb: 'ninguna' }, m: [
    ['«Al menos una» incluye una, dos o tres caras: son muchos casos.', {}],
    ['Lo contrario es uno solo: ninguna cara, es decir, tres sellos seguidos.', { f: 1 }, '$\\tfrac12 \\cdot \\tfrac12 \\cdot \\tfrac12 = \\tfrac18$'],
    ['El resto de la barra es lo que se busca.', {}, '$1 - \\tfrac18 = \\tfrac78$'],
  ], r: '$\\tfrac78$.' },
  'pu-se-1': { t: 'Un término lejano', q: 'En 9, 15, 21, 27, … ¿cuál es el término 20?', de: 0, v: { t: ['9', '15', '21', '27'], op: ['+6', '+6', '+6'], d: 0 }, m: [
    ['No hace falta escribir los veinte.', {}],
    ['Se suma siempre 6.', { d: 1 }],
    ['Del primero al veinte hay 19 saltos, uno menos que términos.', {}, '$20 - 1 = 19$'],
    ['El primero más 19 saltos de 6.', {}, '$9 + 19 \\cdot 6 = 9 + 114 = 123$'],
  ], r: '123.' },
  'pu-cd-1': { t: 'Cifrar con el disco', q: 'En una clave, cada letra avanza 3 lugares en el alfabeto de 26 letras. ¿Cómo se escribe PAN?', de: 0, v: { k: 0, t: '', c: '' }, m: [
    ['Sin girar, cada letra queda frente a sí misma.', {}],
    ['Se gira tres lugares: la A queda frente a la D.', { k: 3, t: 'A → D' }],
    ['Cada letra se busca afuera y se lee la de adentro: P a S, A a D, N a Q.', { t: 'PAN', c: 'SDQ' }],
  ], r: 'SDQ. Para descifrar se retroceden tres lugares.' },
  'pu-gr-1': { t: 'El ángulo en la torta', q: 'En una torta, el 35 % de los encuestados eligió el bus. ¿Cuántos grados mide ese pedazo?', de: 4, v: { p: [100, 0, 0], r: ['100 %', '', ''], t: '360°' }, m: [
    ['La torta completa, el 100 %, da toda la vuelta: 360°.', {}],
    ['Cada 1 % ocupa la centésima parte.', {}, '$360^\\circ \\div 100 = 3.6^\\circ$'],
    ['El 35 % son 35 de esos pedacitos.', { p: [35, 65, 0], r: ['35 %', '65 %', ''], t: '126°' }, '$35 \\cdot 3.6^\\circ = 126^\\circ$'],
  ], r: '126°.' },
  'pu-gr-2': { t: 'El punto de equilibrio', q: 'Tres empleados ganan 4 (millones) y uno gana 8. ¿Cuál es el salario promedio?', de: 4, v: { g: [[1, 4], [1, 8]], x: 6, a: 1 }, m: [
    ['Con una persona en cada valor, la tabla se equilibra en la mitad: 6.', {}],
    ['Pero en el 4 hay tres: el equilibrio se corre hacia ellos.', { g: [[3, 4], [1, 8]], x: 5 }],
    ['Cada persona cuenta: tres veces 4, más 8, entre cuatro personas.', {}, '$\\tfrac{3 \\cdot 4 + 8}{4} = \\tfrac{20}{4} = 5$'],
  ], r: '5 millones.' },
};
for (const id in mas) EJ[id].push(mas[id]);
