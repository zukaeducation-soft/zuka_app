// Ejemplos resueltos y dibujados de Razonamiento lógico (libros 1 y 2). `de`: paso de la explicación de la app cuya escena se usa;
// `v` / `en`: lo que cambia en ella; `m`: momentos [lo que se explica, lo que cambia en el dibujo, cuenta]; `r`: respuesta.
Object.assign(EJ, {
  // ------------------------------------------------------------------------------------------------ Libro 1
  'pu-cm-1': [{ t: 'La nevera', q: 'A las 6 de la mañana un cuarto frío está a −6 °C. Le suben la temperatura 9 grados y, al cerrar, vuelve a bajar 5. ¿A cuánto queda?', de: 7, en: { desde: -6 }, m: [
    ['Partimos de −6: seis pasos a la izquierda del 0. Todo lo que sigue son caminatas desde ahí.', { de: -6, a: -6 }],
    ['Subir 9 es sumar un positivo: nueve pasos a la derecha. Los primeros seis llegan al 0 y quedan tres más.', { de: -6, a: 3 }, '$-6 + 9 = 3$'],
    ['Bajar 5 son cinco pasos a la izquierda desde el 3: tres hasta el 0 y dos más. Al final la ficha quedó 4 a la derecha de donde salió, porque subir 9 y bajar 5 es subir 4.', { de: 3, a: -2 }, '$3 - 5 = -2$'],
  ], r: '−2 °C. En una sola cuenta, $-6 + 9 - 5 = -2$.' }],
  'pu-cm-2': [{ t: 'La caneca de agua', q: 'Una caneca de 40 litros tiene agua hasta $\\tfrac58$. Se gasta $\\tfrac14$ de la caneca. ¿Cuántos litros quedan?', de: 0, m: [
    ['La caneca partida en 8 partes iguales: 5 están llenas. Cada octavo son 40 ÷ 8 = 5 litros.', { barras: [{ n: 5, d: 8, label: '5/8' }] }, '$40 \\div 8 = 5$ litros'],
    ['Lo que se gasta viene en cuartos, que son pedazos más grandes. No se puede restar así.', { barras: [{ n: 5, d: 8, label: '5/8' }, { n: 1, d: 4, label: '1/4' }] }],
    ['Cortamos el cuarto en dos: un cuarto mide lo mismo que dos octavos. Ya son pedazos iguales.', { barras: [{ n: 5, d: 8, label: '5/8' }, { n: 2, d: 8, label: '2/8' }] }, '$\\tfrac14 = \\tfrac28$'],
    ['Cinco octavos menos dos octavos son tres octavos, y cada uno vale 5 litros.', { barras: [{ n: 5, d: 8, label: '5/8' }, { n: 2, d: 8, label: '2/8' }, { n: 3, d: 8, label: '3/8' }] }, '$\\tfrac58 - \\tfrac28 = \\tfrac38$, y $3 \\cdot 5 = 15$'],
  ], r: '15 litros. Restar 5 − 1 y 8 − 4 daría $\\tfrac44$, la caneca llena: no tiene sentido.' }],
  'pu-cm-3': [{ t: 'Dos descuentos seguidos', q: 'Una chaqueta de 80 000 pesos tiene el 25 % de descuento y, al pagar con tarjeta, otro 20 % sobre el precio ya rebajado. ¿Cuánto se paga?', de: 6, m: [
    ['Las 100 casillas son el precio entero. Cada casilla vale 800 pesos.', { k: 100 }, '$80\\,000 \\div 100 = 800$'],
    ['El primer descuento quita 25 casillas: quedan 75.', { k: 100, quita: 25 }],
    ['El segundo se saca de lo que queda, no de las 100. El 20 % de 75 son 15 casillas.', { k: 75, quita: 15 }, '$0.20 \\cdot 75 = 15$'],
    ['Quedan 60 casillas: se paga el 60 %. Sesenta casillas de 800 pesos.', { k: 60 }, '$60 \\cdot 800 = 48\\,000$'],
  ], r: '48 000 pesos. Sumar 25 + 20 y pagar el 55 % es el error: ese segundo 20 % no es del precio inicial.' }],
  'pu-cm-4': [{ t: 'El lado de un terreno', q: 'Un terreno cuadrado tiene 45 m² de área. ¿Entre qué enteros está su lado y de cuál está más cerca?', de: 6, m: [
    ['Buscamos un lado que, multiplicado por sí mismo, dé 45. Probemos 6: 36 cuadros. Faltan 9.', { s: 6 }, '$6^2 = 36$'],
    ['Con 7 hay 49 cuadros: se pasa por 4. El lado está entre 6 y 7.', { s: 7 }, '$7^2 = 49$'],
    ['45 está a 9 de 36 y a 4 de 49: más cerca del 7. Con 6.7 la cuenta da 44.89, casi exacto.', { s: 7 }, '$\\sqrt{45} \\approx 6.7$'],
  ], r: 'Entre 6 y 7, más cerca de 7.' }],
  'pu-ar-1': [{ t: 'El sueldo de la semana', q: 'Nora recibe 90 mil. Gasta la tercera parte en transporte y después la tercera parte de lo que le queda en comida. ¿Con cuánto termina?', de: 0, v: { T: 90, g1: 30, g2: 20, n1: 3, n2: 3 }, m: [
    ['La barra entera son los 90 mil. Se parte en tres: cada tercio vale 30 mil.', {}, '$90 \\div 3 = 30$'],
    ['Se va un tercio. Lo que queda, 60 mil, es ahora el nuevo todo.', { a: 1, q: 1 }, '$90 - 30 = 60$'],
    ['Esos 60 se vuelven a partir en tres: cada parte vale 20 mil, no 30.', { c2: 1 }, '$60 \\div 3 = 20$'],
    ['Se va una de esas partes y quedan dos: 40 mil.', { b: 1 }, '$60 - 20 = 40$'],
  ], r: '40 mil. Corto: queda $\\tfrac23$ de $\\tfrac23$, es decir $\\tfrac49$ de 90. Quien gasta dos veces 30 se equivoca de todo.' }],
  'pu-ar-2': [{ t: 'Subir el promedio', q: 'En cuatro pruebas el promedio de Iván es 6. ¿Cuánto debe sacar en la quinta para que el promedio sea 7?', de: 2, v: { n: 4, m: 6, x: 11, p: 6 }, m: [
    ['Cuatro pruebas que promedian 6 pesan lo mismo que cuatro columnas de 6: suman 24.', {}, '$4 \\cdot 6 = 24$'],
    ['Cinco pruebas que promedien 7 deben sumar 35. La quinta columna pone lo que falta.', { f: 1 }, '$5 \\cdot 7 = 35$'],
    ['Faltan 11. Esa columna sobresale 4 del 7, y con esos 4 se sube en 1 cada una de las otras cuatro.', { l: 1, p: 7 }, '$35 - 24 = 11$'],
  ], r: '11 puntos. No basta con sacar 8: una sola nota debe levantar a las otras cuatro.' }],
  'pu-ar-3': [{ t: 'Una suma con letras', q: 'En la suma $A8 + 3B = 85$ cada letra es una cifra. ¿Cuánto valen A y B?', de: 2, v: { r1: ['A', '8'], r2: ['3', 'B'], r3: ['8', '5'], ll: 0 }, m: [
    ['Se empieza por las unidades, porque ahí no llega nada de otra columna.', {}],
    ['8 más B debe terminar en 5. Con una cifra solo se puede 8 + 7 = 15: B es 7.', { r2: ['3', '7'] }, '$8 + 7 = 15$'],
    ['Se escribe 5 y se lleva 1 a las decenas.', { ll: 1 }],
    ['Decenas: 1 que se lleva, más A, más 3, da 8. Entonces A es 4.', { r1: ['4', '8'] }, '$1 + 4 + 3 = 8$'],
  ], r: 'A = 4 y B = 7. Comprobamos: $48 + 37 = 85$.' }],
  'pu-ar-4': [{ t: 'Tres guantes del mismo color', q: 'Una caja tiene muchos guantes de dos colores. A oscuras, ¿cuántos hay que sacar para tener **con seguridad** tres del mismo color?', de: 0, v: { l: [0, 1, 0, 1, 0, 0], n: 0, t: '' }, m: [
    ['La palabra clave es «con seguridad»: hay que pensar en la peor suerte, no en la mejor.', { n: 1 }],
    ['Con tres podría salir el trío de una vez, pero también dos y uno.', { n: 3, t: '2 y 1: no hay trío' }],
    ['La peor suerte llega hasta cuatro: dos de cada color y todavía ningún trío.', { n: 4, t: '2 y 2: no hay trío' }],
    ['El quinto, sea del color que sea, completa un trío.', { n: 5, t: '5: trío seguro' }, '$2 + 2 + 1 = 5$'],
  ], r: '5 guantes.' }],
  'pu-op-1': [{ t: 'Una receta con cuadrado', q: 'Si $a \\mathbin{\\blacklozenge} b = 3a - b^2$, ¿cuánto vale $5 \\mathbin{\\blacklozenge} 2$? ¿Y $2 \\mathbin{\\blacklozenge} 5$?', de: 0, v: { re: 'a ◆ b = 3a − b²' }, m: [
    ['La receta dice qué hacer con el primero (se triplica) y con el segundo (se eleva al cuadrado y se resta).', {}],
    ['En 5 ◆ 2 el primero es 5 y el segundo es 2. Se reemplaza cada uno en su sitio.', { a: '5', b: '2', c: '3 · 5 − 2²' }],
    ['Primero el cuadrado, después la resta: 15 menos 4.', { r: '11' }, '$15 - 4 = 11$'],
    ['En 2 ◆ 5 los papeles se cambian: el 5 es ahora el que se eleva.', { a: '2', b: '5', c: '3 · 2 − 5²', r: '−19' }, '$6 - 25 = -19$'],
  ], r: '11 y −19. El orden importa: esta operación no es conmutativa.' }],
  'pu-op-2': [{ t: 'La incógnita adentro', q: 'Si $a \\oplus b = 3a - b$, ¿qué $x$ cumple $2 \\oplus (x \\oplus 1) = 1$?', de: 2, en: { alto: 200 }, v: { re: 'a ⊕ b = 3a − b', l: ['2 ⊕ (x ⊕ 1) = 1', '2 ⊕ (3x − 1) = 1', '6 − (3x − 1) = 1', '7 − 3x = 1', 'x = 2'], n: 1 }, m: [
    ['Hay dos operaciones. Se trabaja primero lo del paréntesis.', {}],
    ['x ⊕ 1 es el triple de x menos 1. Se deja entre paréntesis, porque entra como una sola pieza.', { n: 2 }],
    ['Ahora el primero es 2 y el segundo es todo (3x − 1): el triple de 2 menos esa pieza.', { n: 3 }],
    ['El menos le cambia el signo a todo lo de adentro: 6 − 3x + 1.', { n: 4 }],
    ['7 menos algo da 1: ese algo, 3x, es 6.', { n: 5 }, '$3x = 6$'],
  ], r: '$x = 2$. Comprobamos: $2 \\oplus 1 = 5$ y $2 \\oplus 5 = 6 - 5 = 1$.' }],
  'pu-pr-1': [{ t: 'La herencia en partes', q: 'Tres socios reparten 63 millones en razón 2 : 3 : 4. ¿Cuánto recibe cada uno?', de: 2, v: { r: [2, 3, 4], T: 63, val: 0, tot: 0 }, m: [
    ['La razón dice en cuántas partes iguales se piensa: 2, 3 y 4.', {}],
    ['En total son nueve partes, todas del mismo tamaño.', {}, '$2 + 3 + 4 = 9$'],
    ['Cada parte vale 63 entre 9: siete millones.', { val: 1 }, '$63 \\div 9 = 7$'],
    ['Ahora se entregan: 2 partes, 3 partes y 4 partes de 7.', { tot: 1 }, '$14$, $21$ y $28$'],
  ], r: '14, 21 y 28 millones. Suman 63: bien.' }],
  'pu-pr-2': [{ t: 'Las impresoras', q: 'Ocho impresoras iguales terminan un pedido en 6 horas. Si solo funcionan 4, ¿cuánto tardan? ¿Y con 12?', de: 2, v: { a: 8, b: 6, ea: 'impresoras', eb: 'horas' }, m: [
    ['El área del rectángulo es el trabajo: 8 impresoras por 6 horas, 48 horas de impresora.', {}, '$8 \\cdot 6 = 48$'],
    ['Con la mitad de impresoras el rectángulo se angosta. Para conservar el área debe ser el doble de alto.', { a: 4, b: 12 }, '$48 \\div 4 = 12$'],
    ['Con 12 se ensancha y se aplasta: bastan 4 horas.', { a: 12, b: 4 }, '$48 \\div 12 = 4$'],
  ], r: '12 horas y 4 horas. Más máquinas, menos tiempo: es proporcionalidad inversa y lo que no cambia es el producto.' }],
  'pu-pr-3': [{ t: 'Dos mangueras', q: 'Una manguera llena una piscina en 6 horas y otra en 3. Abiertas al tiempo, ¿cuánto tardan?', de: 4, v: { t: 0, A: 6, B: 3, dos: 0 }, m: [
    ['Nadie sabe sumar horas aquí. Preguntemos qué hace cada una en **una** hora. La primera: un sexto de la piscina.', { t: 1, ta: '1/6' }],
    ['La segunda, en una hora: un tercio, que son dos sextos.', { dos: 1, tb: '2/6' }],
    ['Juntas, en una hora: tres sextos, la mitad.', {}, '$\\tfrac16 + \\tfrac26 = \\tfrac36 = \\tfrac12$'],
    ['Si en una hora llenan la mitad, en dos la llenan toda.', { t: 2, ta: '2/6', tb: '4/6' }],
  ], r: '2 horas: menos que la más rápida sola. Promediar 6 y 3 daría 4.5, más que las 3 de la segunda: imposible.' }],
  'pu-pr-4': [{ t: 'De la parte al total', q: 'El 45 % de los inscritos en un curso son 36 personas. ¿Cuántos inscritos hay?', de: 4, v: { p: 45, T: 80, q: 36, ocT: 1 }, m: [
    ['Las 36 personas **no** son el total: son el pedazo del 45 %.', {}],
    ['Bajamos a una pieza cómoda. El 5 % es la novena parte del 45 %: 36 entre 9.', { p: 5, q: 4 }, '$36 \\div 9 = 4$'],
    ['El 100 % son veinte piezas del 5 %: 20 por 4.', { p: 100, q: 80, ocT: 0 }, '$20 \\cdot 4 = 80$'],
  ], r: '80 inscritos. En una cuenta: $36 \\div 0.45 = 80$.' }],
  'pu-pr-5': [{ t: 'Sube y baja', q: 'El precio de un producto sube 25 % y después baja 20 %. ¿Quedó más caro, más barato o igual?', de: 2, v: { eb: 'sube 25 %', ec: 'ahora vale' }, m: [
    ['Como no dan el precio, usamos 100: así los porcentajes se leen solos.', {}],
    ['Sube el 25 %: 100 se multiplica por 1.25.', { fb: 1, b: 125 }, '$100 \\cdot 1.25 = 125$'],
    ['La bajada del 20 % se saca de 125, no de 100.', { fc: 1, c: 125 }, '$0.20 \\cdot 125 = 25$'],
    ['125 menos 25: volvió a 100.', { c: 100, ec: 'baja 20 %' }, '$1.25 \\cdot 0.80 = 1$'],
  ], r: 'Quedó igual. Restar 25 − 20 y decir «subió 5 %» es el error: los dos porcentajes no tienen la misma base.' }],
  'pu-ec-1': [{ t: 'Tres amigas y sus láminas', q: 'Mar tiene el triple de láminas que Luz, y Noa tiene 5 más que Luz. Entre las tres tienen 65. ¿Cuántas tiene cada una?', de: 4, v: { f: [[1, 'Luz', 0], [3, 'Mar', 0], [1, 'Noa', 5]], x: 'x', t: 'suman 65' }, m: [
    ['Todo se compara con Luz, así que lo de Luz es la caja x. Mar son tres cajas y Noa, una caja y 5 más.', {}, '$x + 3x + (x + 5) = 65$'],
    ['Contemos: hay cinco cajas iguales y 5 láminas sueltas. Quitamos las sueltas.', {}, '$5x = 65 - 5 = 60$'],
    ['Cinco cajas valen 60: cada una, 12.', { x: '12', t: '12 + 36 + 17 = 65' }, '$x = 12$'],
  ], r: 'Luz 12, Mar 36 y Noa 17.' }],
  'pu-ec-2': [{ t: 'Boletas de dos precios', q: 'Se vendieron 12 boletas, unas de 2 mil y otras de 5 mil, y se recogieron 45 mil. ¿Cuántas de cada una?', de: 2, v: { n: 12, k: 0, G: 5, P: 2, t: 'deben ser 45' }, m: [
    ['Supongamos que todas fueran de las baratas.', {}],
    ['Serían 24 mil: faltan 21 para llegar a 45.', { t: null }, '$12 \\cdot 2 = 24$'],
    ['Cada vez que una de 2 se cambia por una de 5, el total sube 3.', { k: 1 }, '$5 - 2 = 3$'],
    ['Faltan 21: se necesitan 21 entre 3, siete cambios.', { k: 7 }, '$21 \\div 3 = 7$'],
  ], r: '7 boletas de 5 mil y 5 de 2 mil. Comprobamos: $35 + 10 = 45$.' }],
  'pu-ec-3': [{ t: 'Dos recibos parecidos', q: 'Tres cafés y dos tortas cuestan 23 mil; tres cafés y una torta, 19 mil. ¿Cuánto vale cada cosa?', de: 0, v: { f: [[3, 2, 23], [3, 1, 19]] }, m: [
    ['Se ponen los dos recibos uno debajo del otro y se busca lo que tienen igual: tres cafés.', {}],
    ['Solo se diferencian en una torta. Y los precios, en 4: esa torta vale 4 mil.', { p: 't = 23 − 19 = 4' }, '$23 - 19 = 4$'],
    ['En el segundo recibo, quitamos la torta: tres cafés valen 15 mil.', { p: '3c = 19 − 4 = 15' }, '$19 - 4 = 15$'],
    ['Cada café vale 5 mil.', { p: 'c = 5' }, '$15 \\div 3 = 5$'],
  ], r: 'Café, 5 mil; torta, 4 mil. En el primer recibo: $15 + 8 = 23$.' }],
  'pu-nu-1': [{ t: 'Las sillas del auditorio', q: '¿De cuántas maneras se pueden acomodar 18 sillas en filas iguales, sin que sobre ninguna?', de: 0, v: { n: 18, c: 3 }, m: [
    ['En filas de 3 salen seis filas exactas: 3 y 6 son divisores de 18.', {}, '$3 \\cdot 6 = 18$'],
    ['En filas de 4 sobran 2: el 4 no sirve.', { c: 4 }, '$18 = 4 \\cdot 4 + 2$'],
    ['En filas de 6, tres filas: es la pareja del 3 al revés.', { c: 6 }],
    ['En filas de 9, dos filas. Y faltan las más sencillas: una fila de 18, o 18 filas de 1.', { c: 9 }, '$1 \\cdot 18$, $2 \\cdot 9$, $3 \\cdot 6$'],
  ], r: '6 maneras: filas de 1, 2, 3, 6, 9 o 18. Buscar los divisores en parejas evita que se escape alguno.' }],
  'pu-nu-2': [{ t: 'Dos alarmas', q: 'Una alarma suena cada 6 minutos y otra cada 9. Acaban de sonar juntas. ¿En cuántos minutos vuelven a coincidir?', de: 0, v: { a: 6, b: 9, t: 0, max: 30, ok: 0 }, m: [
    ['Las dos parten de 0. Cada salto es un timbre: arriba de 6 en 6, abajo de 9 en 9.', {}],
    ['A los 9 suena la segunda; la primera ya sonó a los 6 y volverá a los 12.', { t: 12 }],
    ['A los 18 suenan las dos: tres saltos de 6 y dos de 9.', { t: 18, ok: 1 }, '$3 \\cdot 6 = 2 \\cdot 9 = 18$'],
  ], r: 'En 18 minutos, el mínimo común múltiplo. Multiplicar 6 por 9 da 54: coinciden ahí también, pero no por primera vez.' }],
  'pu-nu-3': [{ t: '¿Qué día será?', q: 'Hoy es martes. ¿Qué día será dentro de 31 días?', de: 2, v: { n: 31, d: 7, s: 0 }, m: [
    ['Los días se repiten de 7 en 7. Se arman grupos de 7 con los 31 días.', {}],
    ['Salen cuatro semanas completas, que caen otra vez en martes, y sobran 3 días.', {}, '$31 = 4 \\cdot 7 + 3$'],
    ['Solo importan los que sobran: tres días después del martes.', {}, 'miércoles, jueves, **viernes**'],
  ], r: 'Viernes.' }],
  'pu-ge-1': [{ t: 'Un solo dato y ocho ángulos', q: 'Una recta corta a dos paralelas y forma un ángulo de 110°. ¿Cuánto miden los demás?', de: 2, v: { a: 110, cor: 0, alt: 0, con: 0 }, m: [
    ['Con un ángulo basta. El de al lado completa media vuelta.', {}, '$180^\\circ - 110^\\circ = 70^\\circ$'],
    ['En la otra paralela, el que está en la misma esquina mide igual: 110° (correspondientes).', { cor: 1 }],
    ['Los que forman la Z, entre las paralelas y a lados distintos, también son iguales (alternos internos).', { cor: 0, alt: 1 }],
    ['Los conjugados, entre las paralelas y del mismo lado, suman 180°.', { alt: 0, con: 1 }, '$110^\\circ + 70^\\circ = 180^\\circ$'],
  ], r: 'Cuatro ángulos de 110° y cuatro de 70°. En esta figura solo hay dos medidas, y suman 180°.' }],
  'pu-ge-2': [{ t: 'La escalera contra la pared', q: 'Una escalera de 10 m se apoya en una pared. Su pie está a 6 m de la pared. ¿A qué altura llega?', escena: 'dibujo', en: { alto: 200, v: { c: 0, q: 0, h: 0 }, dib: (v, K) => K.l(60, 175, 250, 175, 'lm') + K.l(80, 20, 80, 175) + K.l(80, 35, 185, 175, 'la gr') + K.r(80, 163, 12, 12, 'fn', 0)
      + K.t(146, 95, '10', 'ta') + K.t(132, 194, '6', 'tg') + K.t(62, 110, v.h > 0.5 ? '8' : '?', 'tf')
      + K.f(v.c, K.t(268, 60, '10² = 100', 'ta') + K.t(268, 84, '6² = 36', 'tg')) + K.f(v.q, K.l(228, 92, 308, 92, 'lm') + K.t(268, 112, 'sobra 64', 'tf')) }, m: [
    ['La pared, el piso y la escalera forman un triángulo rectángulo. La escalera es la hipotenusa: está frente al ángulo recto.', {}],
    ['El cuadrado de la hipotenusa vale 100 y el del cateto que conocemos, 36.', { c: 1 }, '$10^2 = 6^2 + h^2$'],
    ['El otro cuadrado es lo que falta para 100.', { q: 1 }, '$h^2 = 100 - 36 = 64$'],
    ['Un cuadrado de área 64 tiene lado 8.', { h: 1 }, '$h = \\sqrt{64} = 8$'],
  ], r: '8 m. Es el triángulo 3, 4, 5 multiplicado por 2: 6, 8, 10. Restar 10 − 6 no funciona, porque se restan áreas.' }],
  'pu-ge-3': [{ t: 'La altura del poste', q: 'Un niño de 1.5 m da una sombra de 2 m. A la misma hora, un poste da una sombra de 8 m. ¿Cuánto mide el poste?', de: 2, v: { h0: 1.5, s0: 2, h: 6, s: 8, ray: 1, obj: 0, u: 22 }, m: [
    ['El rayo de sol, el niño y su sombra cierran un triángulo.', {}],
    ['El poste forma otro. El sol llega con la misma inclinación: los triángulos tienen la misma forma.', { obj: 1, lh: '?' }],
    ['La sombra del poste es 4 veces la del niño; entonces la altura también es 4 veces.', {}, '$8 \\div 2 = 4$'],
    ['Cuatro veces 1.5 metros.', { lh: '6' }, '$4 \\cdot 1.5 = 6$'],
  ], r: '6 m. No se suma: que la sombra tenga 6 m más no quiere decir que el poste mida 6 m más.' }],
  'pu-ge-4': [{ t: 'Un lote en forma de trapecio', q: 'Un lote tiene dos lados paralelos de 10 m y 4 m, separados 5 m. ¿Cuál es su área?', de: 4, v: { B: 10, b: 4, h: 5, dos: 0, g: 0 }, m: [
    ['Dos bases paralelas y una altura que las separa. No es un rectángulo, pero se puede completar.', {}],
    ['Ponemos una copia igual, girada media vuelta.', { dos: 1 }],
    ['Juntas forman un paralelogramo: su base es 10 + 4 y su altura sigue siendo 5.', { g: 1 }, '$14 \\cdot 5 = 70$'],
    ['El lote es la mitad de esa figura.', {}, '$70 \\div 2 = 35$'],
  ], r: '35 m². También: el promedio de las bases, 7, por la altura, 5.' }],
  'pu-ge-5': [{ t: 'Una pared con ventana', q: 'Hay que pintar una pared de 9 m por 5 m que tiene una ventana de 4 m por 2 m. ¿Cuántos metros cuadrados se pintan?', de: 0, v: { W: 9, H: 5, w: 4, h: 2, f: 0 }, m: [
    ['La pared entera: 5 filas de 9 cuadros.', {}, '$9 \\cdot 5 = 45$'],
    ['La ventana ocupa 4 por 2 cuadros que no se pintan.', { f: 1 }, '$4 \\cdot 2 = 8$'],
    ['Lo sombreado es todo menos el hueco. No importa en qué lugar esté.', {}, '$45 - 8 = 37$'],
  ], r: '37 m².' }],
  'pu-ge-6': [{ t: 'El acuario', q: 'Un acuario tiene base de 5 dm por 2 dm y se llena hasta 4 dm de altura. ¿Cuántos litros de agua tiene? (1 dm³ es 1 litro.)', de: 0, v: { a: 5, b: 2, c: 0 }, m: [
    ['El piso tiene 5 por 2 cuadros de un decímetro.', {}, '$5 \\cdot 2 = 10$'],
    ['Una capa de agua de 1 dm de alto son 10 cubitos: 10 litros.', { c: 1 }],
    ['Hasta 4 dm hay cuatro capas iguales.', { c: 4 }, '$10 \\cdot 4 = 40$'],
  ], r: '40 litros. Volumen es área de la base por altura: cuántos caben en el piso por cuántos pisos hay.' }],
  // ------------------------------------------------------------------------------------------------ Libro 2
  'pu-or-1': [{ t: 'La fila del banco', q: 'Rosa, Iván, Luz y Paz hacen fila. Luz es la última, Iván está justo delante de Luz y Rosa no es la primera. ¿En qué orden están?', de: 0, en: { fichas: ['Rosa', 'Iván', 'Luz', 'Paz'] }, m: [
    ['Cuatro casillas: la 1 es la primera de la fila. Se empieza por la pista que da un puesto exacto.', { p: 'Luz es la última', pon: { 3: 'Luz' } }],
    ['«Justo delante de Luz» es la casilla anterior, pegada: Iván es el tercero.', { p: 'Iván, justo delante de Luz', pon: { 2: 'Iván' } }],
    ['Quedan los puestos 1 y 2. Rosa no es la primera: va en el 2.', { p: 'Rosa no es la primera', pon: { 1: 'Rosa' } }],
    ['Paz ocupa el único lugar libre. Se relee cada pista y todas se cumplen.', { p: 'Paz · Rosa · Iván · Luz', pon: { 0: 'Paz' } }],
  ], r: 'Paz, Rosa, Iván, Luz.' }],
  'pu-or-2': [{ t: 'La rueda de sillas', q: 'Ocho sillas numeradas del 1 al 8 están en círculo, en el sentido del reloj. Desde la 6 se avanzan 5 puestos. ¿A qué silla se llega?', de: 4, v: { n: 8, de: 6, k: 6 }, m: [
    ['Partimos de la silla 6. El puesto donde se empieza no se cuenta como paso.', {}],
    ['Dos pasos: 7 y 8. Se acabaron los números.', { k: 8 }],
    ['El tercer paso vuelve a la silla 1.', { k: 9 }],
    ['Faltan dos: 2 y 3.', { k: 11 }, '$6 + 5 = 11$, y $11 - 8 = 3$'],
  ], r: 'A la silla 3.' }],
  'pu-or-3': [{ t: 'Tres bebidas', q: 'Eva, Gil y Sol piden té, café y jugo, cada quien algo distinto. Gil no pidió té ni jugo, y Sol no pidió té. ¿Qué pidió cada uno?', de: 0, en: { filas: ['Eva', 'Gil', 'Sol'], cols: ['té', 'café', 'jugo'] }, m: [
    ['Se tacha lo que las pistas niegan: en la fila de Gil, té y jugo.', { x: [3, 5] }],
    ['A Gil le queda un solo hueco: café. Si el café es de Gil, no es de Eva ni de Sol.', { on: [4], x: [1, 7] }],
    ['Sol no pidió té: solo le queda el jugo, y así el jugo tampoco es de Eva.', { x: [6, 2], on: [8] }],
    ['A Eva le queda el té. Cada fila y cada columna tiene un solo ✓.', { on: [0] }],
  ], r: 'Eva té, Gil café y Sol jugo.' }],
  'pu-or-4': [{ t: 'El equipo del torneo', q: 'Va L o va M, pero no los dos. Además, si va L, entonces va M. ¿Quién va?', de: 0, en: { filas: ['L y M', 'solo L', 'solo M', 'ninguno'] }, m: [
    ['Cuatro casos posibles. Ninguna pista se salta: se revisa una regla a la vez.', {}],
    ['Primera regla: va uno y solo uno. Chocan «los dos» y «ninguno».', { x: [0, 3] }],
    ['Segunda regla: si va L, va M. El caso «solo L» la rompe.', { x: [1] }],
    ['Queda un caso. Como es el único, es seguro.', { on: [2] }],
  ], r: 'Va M y L no va.' }],
  'pu-lo-1': [{ t: 'Dos frases con la misma tabla', q: '¿En qué casos es falsa la frase «no estudias o apruebas», $\\lnot p \\lor q$?', de: 4, en: { cols: ['p', 'q', '¬p ∨ q'] }, m: [
    ['p: estudias. q: apruebas. Con dos letras hay cuatro filas.', {}],
    ['Fila 1: ¬p es F, pero q es V. Una «o» se conforma con una verdadera: V.', { on: [2] }],
    ['Fila 2: ¬p es F y q es F. No hay ninguna verdadera: F.', { x: [5] }],
    ['Filas 3 y 4: p es F, así que ¬p es V. Con eso basta, sin mirar q.', { on: [8, 11] }],
  ], r: 'Solo cuando estudias y no apruebas. Es la misma tabla de «si estudias, apruebas»: las dos frases dicen lo mismo.' }],
  'pu-lo-2': [{ t: 'Negar un «todos»', q: '¿Cuál es la negación de «todos los bombillos están prendidos»?', de: 4, v: { b: [1, 1, 1, 1, 1], t: 'todos prendidos' }, m: [
    ['La frase es verdadera cuando no hay ni uno apagado.', {}],
    ['Preguntemos qué es lo **mínimo** que la vuelve falsa. Con el cuarto apagado ya es mentira.', { b: [1, 1, 1, 0, 1], t: 'uno apagado: ya es falsa' }],
    ['Con todos apagados también es falsa, pero es mucho más de lo necesario: la negación debe cubrir todos los casos en que falla.', { b: [0, 0, 0, 0, 0], t: 'también es falsa' }],
    ['En los dos casos se cumple lo mismo: hay al menos uno apagado.', { b: [1, 0, 1, 1, 0], t: 'alguno apagado' }],
  ], r: '«Al menos un bombillo está apagado». «Todos están apagados» es la trampa.' }],
  'pu-lo-3': [{ t: 'Cuadrados y rectángulos', q: '«Si es cuadrado, es rectángulo». Una figura no es rectángulo. ¿Qué se sabe? Y si otra sí es rectángulo, ¿qué se sabe?', de: 2, v: { p: 'cuadrado', q: 'rectángulo', lp: 0, lq: 0, x: 150, y: 108, pt: 0 }, m: [
    ['Los cuadrados quedan dentro de los rectángulos.', {}],
    ['La primera figura está afuera del círculo grande…', { pt: 1, x: 304, y: 50 }],
    ['…y entonces no puede estar en el chico. No es cuadrado, seguro.', {}, '$\\lnot q \\to \\lnot p$'],
    ['La segunda está en el grande. Podría estar aquí, sin ser cuadrado…', { x: 225, y: 100, lq: 1 }],
    ['…o dentro del chico. Con ese dato no se sabe.', { x: 152, y: 116 }],
  ], r: 'La primera no es cuadrado. De la segunda no se puede concluir nada.' }],
  'pu-lo-4': [{ t: 'Violines y trompetas', q: '«Todos los violines son de cuerda. Ninguna trompeta es de cuerda». ¿Qué se concluye de violines y trompetas?', de: 4, v: { ta: 'violín', tb: 'cuerda', tc: '', cx: 276, cy: 110, cr: 0 }, m: [
    ['«Todos» mete un círculo dentro del otro: los violines, dentro de los de cuerda.', {}],
    ['«Ninguna» separa: las trompetas no tocan el círculo de cuerda.', { tc: 'trompeta', cr: 44 }],
    ['Para tocar a los violines, las trompetas tendrían que entrar al círculo grande, y no pueden.', {}],
  ], r: 'Ningún violín es trompeta (y ninguna trompeta es violín).' }],
  'pu-lo-5': [{ t: 'Una sola verdad', q: 'Alguien rompió el vidrio. Ana: «Yo no fui». Eva: «Fue Leo». Leo: «Eva miente». Solo **una** de las tres frases es verdadera. ¿Quién fue?', de: 2, en: { filas: ['si fue Ana', 'si fue Eva', 'si fue Leo'], cols: ['Ana', 'Eva', 'Leo'], pie: 'Ana: «yo no fui» · Eva: «fue Leo» · Leo: «Eva miente»' }, m: [
    ['Una fila por sospechoso. En cada una se pregunta si cada frase sería verdadera.', {}],
    ['Si fue Ana: «yo no fui» es falsa, «fue Leo» es falsa y «Eva miente» es verdadera. Una sola verdad.', { x: [0, 1], on: [2] }],
    ['Si fue Eva: Ana dice la verdad, Eva miente y Leo dice la verdad. Son dos: no cumple.', { on: [3, 5], x: [4] }],
    ['Si fue Leo: Ana y Eva dicen la verdad. También son dos.', { on: [6, 7], x: [8] }],
    ['Solo la primera fila tiene una verdad.', { luz: [0, 1, 2] }],
  ], r: 'Fue Ana.' }],
  'pu-cj-1': [{ t: 'La intersección escondida', q: 'A tiene 18 elementos, B tiene 14 y en la unión hay 25. ¿Cuántos están solo en A?', de: 4, v: { a: 1, i: 1, b: 1, o: 0, na: '', ni: '', nb: '', no: '', p: '' }, m: [
    ['Si no hubiera elementos comunes, la unión tendría 32.', { p: '18 + 14 = 32' }],
    ['Pero tiene 25. Los 7 de más se contaron dos veces: son los comunes.', { ni: '7', p: '32 − 25 = 7' }, '$32 - 25 = 7$'],
    ['De los 18 de A, 7 ya están en el centro.', { na: '11', p: '18 − 7 = 11' }, '$18 - 7 = 11$'],
    ['De los 14 de B quedan 7 solos. Comprobamos la unión.', { nb: '7', p: '11 + 7 + 7 = 25' }],
  ], r: '11 elementos.' }],
  'pu-cj-2': [{ t: 'Té, café o nada', q: 'De 60 personas, 35 toman té, 30 toman café y 5 no toman ninguno. ¿Cuántas toman los dos?', de: 0, v: { A: 'té', B: 'café', na: '', ni: '', nb: '', no: '', p: '60 personas' }, m: [
    ['Los 5 que no toman nada van afuera. Dentro de los círculos quedan 55.', { no: '5' }, '$60 - 5 = 55$'],
    ['Pero 35 y 30 suman 65: sobran 10. Esos 10 se contaron en los dos grupos.', { ni: '10' }, '$35 + 30 - 55 = 10$'],
    ['Solo té: 35 menos 10.', { na: '25' }],
    ['Solo café: 30 menos 10. Y todo suma 60.', { nb: '20' }, '$25 + 10 + 20 + 5 = 60$'],
  ], r: '10 personas.' }],
  'pu-co-1': [{ t: 'Cita médica', q: 'Para una cita se elige sede (norte o sur) y día (lunes, martes o viernes). ¿Cuántas citas distintas se pueden pedir?', de: 0, v: { A: 2, b: 3, n1: 0, n2: 0, e1: ['norte', 'sur'], e2: ['lun', 'mar', 'vie'] }, m: [
    ['Primera decisión: la sede. Dos ramas.', { n1: 1 }],
    ['Cada sede ofrece los mismos tres días: cada rama se abre en tres.', { n2: 1 }],
    ['Cada punta es una cita completa. Se cuentan las puntas.', {}, '$2 \\cdot 3 = 6$'],
  ], r: '6 citas. Se multiplica porque se elige sede **y** día.' }],
  'pu-co-2': [{ t: 'El podio', q: 'Cinco corredoras compiten por oro, plata y bronce. ¿Cuántos podios distintos puede haber?', de: 2, en: { fichas: ['Ana', 'Bea', 'Caro', 'Dora', 'Eva'] }, m: [
    ['Tres puestos. Para el oro hay 5 opciones.', { pon: { 0: 'Caro' }, p: '5' }],
    ['Quien ganó el oro ya no puede ganar la plata: quedan 4.', { pon: { 1: 'Ana' }, p: '5 · 4' }],
    ['Para el bronce, 3.', { pon: { 2: 'Eva' }, p: '5 · 4 · 3 = 60' }, '$5 \\cdot 4 \\cdot 3 = 60$'],
    ['Si Ana y Caro cambian de puesto es otro podio: el orden cuenta, así que no se divide.', { marca: [0, 1] }],
  ], r: '60 podios.' }],
  'pu-co-3': [{ t: 'Los saludos', q: 'En una reunión de 5 personas, cada una saluda una vez a cada una de las demás. ¿Cuántos saludos hay?', escena: 'dibujo', en: { alto: 190, v: { k: 0, p: '' }, dib: (v, K) => { const P = [0, 1, 2, 3, 4].map(i => K.at(120, 98, 72, 90 + i * 72)); let h = '';
      for (let i = 0; i < 4; i++) for (let j = i + 1; j < 5; j++) h += K.f(v.k - i, K.l(P[i][0], P[i][1], P[j][0], P[j][1], ['la', 'lf', 'lg', 'lo'][i]));
      P.forEach(([x, y], i) => { h += K.c(x, y, 13, 'fc') + K.t(x, y + 5, 'ABCDE'[i]); });
      ['A: 4', 'B: 3 más', 'C: 2 más', 'D: 1 más'].forEach((t, i) => { h += K.f(v.k - i, K.t(232, 52 + i * 26, t, ['ta', 'tf', 'tg', 'to'][i], 'start')); }); return h + K.t(222, 164, v.p, '', 'start'); } }, m: [
    ['Cada persona es un punto y cada saludo, una línea. A saluda a las otras cuatro.', { k: 1 }],
    ['B ya saludó a A: le faltan tres. La línea AB no se traza dos veces.', { k: 2 }],
    ['A C le faltan dos y a D, uno. E ya saludó a todas.', { k: 4, p: '4 + 3 + 2 + 1 = 10' }, '$4 + 3 + 2 + 1 = 10$'],
    ['La cuenta corta: 5 personas por 4 saludos serían 20, pero cada línea tiene dos puntas y se contó dos veces.', {}, '$\\tfrac{5 \\cdot 4}{2} = 10$'],
  ], r: '10 saludos. El saludo de A con B es el mismo de B con A: el orden no cuenta y por eso se divide entre 2.' }],
  'pu-co-4': [{ t: 'Múltiplos de 3 o de 4', q: 'De los números del 1 al 30, ¿cuántos son múltiplos de 3 o de 4?', de: 0, m: [
    ['Pintamos los múltiplos de 3: son diez.', { on: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29] }, '$30 \\div 3 = 10$'],
    ['Los de 4 son siete: 4, 8, 12, 16, 20, 24 y 28.', { luz: [3, 7, 11, 15, 19, 23, 27] }],
    ['El 12 y el 24 ya estaban pintados: están en los dos grupos.', { luz: [11, 23] }],
    ['Se suman los dos grupos y se quitan una vez los repetidos.', { on: [3, 7, 15, 19, 27] }, '$10 + 7 - 2 = 15$'],
  ], r: '15 números.' }],
  'pu-co-5': [{ t: 'Cuadrados en una tableta', q: '¿Cuántos cuadrados, de cualquier tamaño, hay en una cuadrícula de 2 filas por 4 columnas?', de: 0, v: { f: 2, c: 4, s: 1, px: 0, py: 0, ver: 0, p: '' }, m: [
    ['Se cuenta por tamaños, para no repetir ni olvidar.', {}],
    ['De lado 1 hay uno por casilla: ocho.', { ver: 1, px: 3, py: 1, p: 'lado 1: 8' }, '$2 \\cdot 4 = 8$'],
    ['De lado 2: la esquina puede empezar en las columnas 1, 2 o 3. Son tres.', { s: 2, px: 1, py: 0, p: 'lado 2: 3' }, '$1 \\cdot 3 = 3$'],
    ['De lado 3 no cabe ninguno: solo hay dos filas.', {}, '$8 + 3 = 11$'],
  ], r: '11 cuadrados.' }],
  'pu-pb-1': [{ t: 'La suma 9', q: 'Se lanzan dos dados. ¿Cuál es la probabilidad de que la suma sea 9?', de: 2, m: [
    ['Todas las casillas son igual de fáciles: 6 filas por 6 columnas, 36 casos.', {}, '$6 \\cdot 6 = 36$'],
    ['Buscamos las que suman 9: 3 y 6, 4 y 5, 5 y 4, 6 y 3.', { on: [17, 22, 27, 32] }],
    ['Cuatro favorables de 36 posibles.', {}, '$\\tfrac{4}{36} = \\tfrac19$'],
  ], r: '$\\tfrac19$. Ojo: 4 y 5 no es la misma casilla que 5 y 4.' }],
  'pu-pb-2': [{ t: 'Dos bolas sin devolver', q: 'Una bolsa tiene 4 bolas naranjas y 3 verdes. Se sacan dos, sin devolver la primera. ¿Cuál es la probabilidad de que las dos sean naranjas?', de: 4, v: { r: 4, g: 3, l: ['4/7', '3/6', '2/7'], n: 0 }, m: [
    ['Al empezar hay 7 bolas y 4 sirven.', { n: 1 }, '$\\tfrac47$'],
    ['Salió una naranja y no volvió: ahora hay 6 bolas y 3 naranjas.', { r: 3, n: 2 }, '$\\tfrac36$'],
    ['Deben pasar las dos cosas: se multiplican.', { n: 3 }, '$\\tfrac47 \\cdot \\tfrac36 = \\tfrac{12}{42} = \\tfrac27$'],
  ], r: '$\\tfrac27$. Si la primera se devolviera, sería $\\tfrac47 \\cdot \\tfrac47 = \\tfrac{16}{49}$.' }],
  'pu-se-1': [{ t: 'Saltos que crecen', q: '¿Qué número sigue? $\\; 2,\\ 5,\\ 11,\\ 20,\\ 32,\\ \\ldots$', de: 2, v: { t: ['2', '5', '11', '20', '32'], op: ['+3', '+6', '+9', '+12'], op2: ['+3', '+3', '+3'], d: 0, d2: 0 }, m: [
    ['No se suma siempre lo mismo. Escribamos qué pasa de un término al siguiente.', {}],
    ['Los saltos son 3, 6, 9 y 12: forman su propia sucesión.', { d: 1 }],
    ['Y esa sí es sencilla: cada salto crece 3.', { d2: 1 }],
    ['El salto que sigue es 15, y el término, 32 más 15.', { t: ['2', '5', '11', '20', '32', '47'], op: ['+3', '+6', '+9', '+12', '+15'], op2: ['+3', '+3', '+3', '+3'] }, '$32 + 15 = 47$'],
  ], r: '47.' }],
  'pu-se-2': [{ t: 'Letras y números juntos', q: '¿Qué término sigue? $\\;$ B3, D6, F11, H18, …', escena: 'dibujo', en: { alto: 150, v: { a: 0, b: 0, f: 0 }, dib: (v, K) => { const L = ['B', 'D', 'F', 'H'], N = [3, 6, 11, 18], X = i => 50 + i * 60; let h = '';
      for (let i = 0; i < 4 + (v.f > 0.5); i++) h += K.r(X(i) - 24, 52, 48, 34, 'fa', 8) + K.t(X(i), 74, (L[i] || 'J'), 'b ta') + K.r(X(i) - 24, 92, 48, 34, 'fg', 8) + K.t(X(i), 114, (N[i] || 27), 'b tg');
      for (let i = 0; i < 3 + (v.f > 0.5); i++) h += K.f(v.a, K.t(X(i) + 30, 42, '+2', 'ta')) + K.f(v.b, K.t(X(i) + 30, 146, '+' + [3, 5, 7, 9][i], 'tg'));
      return h; } }, m: [
    ['Son dos sucesiones escritas en una. Se separan: arriba las letras, abajo los números.', {}],
    ['Las letras avanzan de dos en dos: B, D, F, H. Sigue la J.', { a: 1 }],
    ['Los números suben 3, 5 y 7. El salto que sigue es 9.', { b: 1 }, '$18 + 9 = 27$'],
    ['Se juntan las dos respuestas.', { f: 1 }],
  ], r: 'J27. También se ve así: $1^2 + 2$, $2^2 + 2$, $3^2 + 2$, $4^2 + 2$, $5^2 + 2$.' }],
  'pu-se-3': [{ t: 'El collar de tres colores', q: 'Un collar repite naranja, amarillo y verde. ¿De qué color es la cuenta 29?', de: 0, v: { c: 3, n: 3, max: 30 }, m: [
    ['Cada vuelta completa es una fila de tres.', {}],
    ['La cuenta 27 cierra una vuelta, porque 27 es múltiplo de 3: es verde.', { n: 27 }, '$27 = 9 \\cdot 3$'],
    ['Sobran dos cuentas: la 28 y la 29. La 29 está donde la segunda.', { n: 29 }, '$29 = 9 \\cdot 3 + 2$'],
  ], r: 'Amarilla. Solo importa el residuo: 2.' }],
  'pu-cd-1': [{ t: 'Escribir 22 con bombillos', q: '¿Cómo se escribe 22 con cinco bombillos que valen 16, 8, 4, 2 y 1?', de: 4, v: { b: '00000', p: '' }, m: [
    ['Se prueba siempre desde el más grande. ¿Cabe el 16 en 22? Sí, y faltan 6.', { b: '10000', p: '22 − 16 = 6' }, '$22 - 16 = 6$'],
    ['¿Cabe el 8 en 6? No: ese queda apagado. ¿El 4? Sí, y faltan 2.', { b: '10100', p: '6 − 4 = 2' }, '$6 - 4 = 2$'],
    ['El 2 completa justo. El 1 queda apagado.', { b: '10110', p: '16 + 4 + 2 = 22' }],
  ], r: '10110.' }],
  'pu-cd-2': [{ t: 'La máquina de números', q: 'Una máquina convierte 34 en 25, 12 en 5 y 21 en 5. ¿En qué convierte 43?', de: 0, v: { e: [['34', '25'], ['12', '5'], ['21', '5']], p: '' }, m: [
    ['Con un solo ejemplo hay muchas reglas: por ejemplo, restar 9.', { p: '¿34 − 9?' }],
    ['La probamos con el segundo: 12 menos 9 son 3, no 5. Se descarta.', { p: '12 − 9 = 3 ✗' }],
    ['25 es 9 más 16: los cuadrados de 3 y de 4. Con 12: 1 más 4 son 5.', { p: '1² + 2² = 5 ✓' }, '$3^2 + 4^2 = 25$'],
    ['Con 21: 4 más 1 son 5. Cumple con los tres: esa es la regla.', { p: '2² + 1² = 5 ✓' }, '$4^2 + 3^2 = 25$'],
  ], r: 'En 25.' }],
  'pu-es-1': [{ t: 'El mensajero', q: 'Un mensajero va de A a B por las calles: 6 cuadras al este y 2 al norte. Cada cuadra mide 80 m. ¿Cuánto recorre por el camino más corto?', de: 0, v: { ax: 1, ay: 1, bx: 7, by: 3, t: 0, otro: 0 }, m: [
    ['Solo se camina por las líneas. Se cuentan las cuadras hacia cada lado.', {}],
    ['Primero al este y luego al norte: seis más dos.', { t: 1 }, '$6 + 2 = 8$'],
    ['Por otro camino sin devolverse la cuenta es la misma.', { otro: 1 }],
    ['Ocho cuadras de 80 metros.', {}, '$8 \\cdot 80 = 640$'],
  ], r: '640 m.' }],
  'pu-es-2': [{ t: 'El cubo pintado de 3 × 3 × 3', q: 'Un cubo se pinta por fuera y se corta en 27 cubitos. ¿Cuántos tienen exactamente dos caras pintadas?', escena: 'dibujo', en: { alto: 210, v: { p: '', e: 0, a: 0 }, dib: (v, K) => K.caja([110, 196], 30, 3, 3, 3)
      + K.f(v.e, [[0, 0, 3], [3, 0, 3], [0, 3, 3], [3, 3, 3], [0, 0, 0], [3, 0, 0], [0, 3, 0]].map(q => { const w = K.iso([110, 196], 30, ...q); return K.c(w[0], w[1], 5, 'fF'); }).join(''))
      + K.f(v.a, [[1.5, 0, 3], [0, 1.5, 3], [3, 1.5, 3], [1.5, 3, 3], [0, 0, 1.5], [3, 0, 1.5], [0, 3, 1.5], [1.5, 0, 0], [0, 1.5, 0]].map(q => { const w = K.iso([110, 196], 30, ...q); return K.c(w[0], w[1], 5, 'fG'); }).join(''))
      + (v.p ? v.p.split('|').map((t, i) => K.t(222, 80 + i * 26, t, ['tf', 'tg', 'ta', ''][i], 'start')).join('') : '') }, m: [
    ['La pintura solo queda en las caras de afuera. El lugar de cada cubito dice cuántas caras pintadas tiene.', {}],
    ['En las esquinas hay tres caras pintadas. Un cubo siempre tiene 8 esquinas (una no se ve).', { e: 1, p: '3 caras: 8' }],
    ['Sobre cada arista, entre dos esquinas, queda 1 cubito con dos caras. Las aristas son 12.', { a: 1, p: '3 caras: 8|2 caras: 12' }, '$12 \\cdot 1 = 12$'],
    ['En el centro de cada cara hay 1 con una sola cara, y 1 en el interior sin pintar. Todo debe sumar 27.', { p: '3 caras: 8|2 caras: 12|1 cara: 6|ninguna: 1' }, '$8 + 12 + 6 + 1 = 27$'],
  ], r: '12 cubitos.' }],
  'pu-es-3': [{ t: 'Caras opuestas', q: 'Este molde se dobla y forma un cubo. ¿Qué cara queda opuesta a la B?', escena: 'dibujo', en: { alto: 170, v: { b: 0, a: 0, e: 0 }, dib: (v, K) => { const s = 48, q = (x, y, t, c) => K.r(70 + x * s, 10 + y * s, s, s, c, 2) + K.t(70 + x * s + s / 2, 10 + y * s + 31, t, 'b');
      return q(0, 1, 'A', v.a > 0.5 ? 'fg' : 'fc') + q(1, 1, 'B', v.b > 0.5 ? 'fa' : 'fc') + q(2, 1, 'C', v.a > 0.5 ? 'fg' : 'fc') + q(3, 1, 'D', v.b > 0.5 ? 'fa' : 'fc') + q(1, 0, 'E', v.e > 0.5 ? 'ff' : 'fc') + q(2, 2, 'F', v.e > 0.5 ? 'ff' : 'fc'); } }, m: [
    ['Hay una fila de cuatro caras: A, B, C y D. Al doblarla se vuelve un anillo alrededor del cubo.', {}],
    ['En el anillo, las vecinas se tocan. La opuesta es la que está saltando una: entre B y D está C.', { b: 1 }],
    ['Por lo mismo, A y C son opuestas.', { a: 1 }],
    ['Las dos que sobran, E arriba y F abajo, tapan los dos lados del anillo: son opuestas entre sí.', { e: 1 }],
  ], r: 'La D.' }],
  'pu-es-4': [{ t: 'Dos giros seguidos', q: 'Una F gira 90° en el sentido del reloj y luego 180° más. ¿A qué giro único equivale?', de: 2, v: { g: 0 }, m: [
    ['La posición de partida.', {}],
    ['Primer giro, un cuarto de vuelta: lo que miraba arriba ahora mira a la derecha.', { g: 90 }],
    ['Segundo giro, media vuelta más: lo que miraba a la derecha mira ahora a la izquierda.', { g: 270 }, '$90^\\circ + 180^\\circ = 270^\\circ$'],
  ], r: '270° en el sentido del reloj, que es lo mismo que 90° en sentido contrario.' }],
  'pu-gr-1': [{ t: 'El mes que se duplicó', q: 'Las ventas de una tienda fueron 40, 25, 35 y 50. ¿En qué porcentaje crecieron de febrero a abril? ¿Cuánto se vendió en total?', de: 0, v: { vals: [40, 25, 35, 50], hi: 70, st: 10, rot: ['ene', 'feb', 'mar', 'abr'], on: -1, nota: '' }, m: [
    ['Se lee cada barra en el eje. La de febrero está entre 20 y 30: 25.', { on: 1, nota: '25' }],
    ['La de abril llega a 50. La diferencia es 25.', { on: 3, nota: '50 − 25 = 25' }],
    ['El porcentaje se compara con **de dónde se parte**, febrero: 25 de 25.', { nota: '25 ÷ 25 = 100 %' }, '$\\tfrac{25}{25} = 100\\,\\%$'],
    ['Para el total se suman las cuatro barras.', { on: -1, nota: '150' }, '$40 + 25 + 35 + 50 = 150$'],
  ], r: 'Crecieron el 100 % (se duplicaron) y en total se vendieron 150.' }],
  'pu-gr-2': [{ t: 'Nivelar', q: 'Cuatro equipos hicieron 3, 8, 6 y 11 goles. ¿Cuál es el promedio?', de: 0, v: { d: [3, 8, 6, 11], t: 0, l: 0 }, m: [
    ['Cada columna es un equipo. Si se juntan todos los goles son 28.', {}, '$3 + 8 + 6 + 11 = 28$'],
    ['Se reparten por igual entre los cuatro: a cada uno le tocan 7.', { t: 1, l: 1 }, '$28 \\div 4 = 7$'],
    ['Lo que sobra por encima de 7 (1 y 4) llena justo lo que falta por debajo (4 y 1).', { t: 0 }, '$1 + 4 = 4 + 1$'],
  ], r: '7 goles.' }],
  'pu-gr-3': [{ t: 'El eje que exagera', q: 'En una gráfica, la marca B parece el doble de alta que la A. Los valores son 48 y 50, y el eje empieza en 46. ¿Cuánto mayor es B en realidad?', de: 0, v: { a: 48, b: 50, f: 46, top: 51 }, m: [
    ['Sobre el eje recortado, A mide 2 y B mide 4: por eso parece el doble.', {}, '$48 - 46 = 2$ y $50 - 46 = 4$'],
    ['Se baja el eje hasta 0 para ver las barras completas. Ya casi no se distinguen.', { f: 0 }],
    ['La diferencia es 2 sobre 48.', {}, '$\\tfrac{2}{48} \\approx 4.2\\,\\%$'],
  ], r: 'Apenas un 4 % mayor. Antes de comparar alturas, mira dónde empieza el eje.' }],
});
