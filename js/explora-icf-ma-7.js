// Preicfes · Matemáticas, mundo 7 «Ecuaciones en Contexto» (Explora, escenas «dibujo» y «fichas»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Balanza: a y c cajas x, b y d pesas a cada lado.
  const bal = (v, K) => { const cajas = (x, n, m) => Array.from({ length: Math.round(n) }, (_, i) => K.r(x + (i % 4) * 26, 92 - Math.floor(i / 4) * 26, 24, 24, 'fa', 3) + K.t(x + 12 + (i % 4) * 26, 108 - Math.floor(i / 4) * 26, 'x', 's')).join('') + (m > 0.5 ? K.t(x + 50, 136, `+ ${Math.round(m)}`, 'b tg') : ''); return K.l(30, 118, 310, 118, 'gr') + K.l(170, 118, 170, 160, 'lm') + K.l(140, 162, 200, 162, 'lm') + cajas(36, v.a, v.b) + cajas(196, v.c, v.d) + K.t(170, 30, v.t || '', 'ta'); };
  // Rectángulo (x + a)(x + b).
  const rec = (v, K) => { const x = 90, y = 30, u = 80; return K.r(x, y, u, u, 'fa', 0) + K.f(v.p, K.r(x + u, y, 60, u, 'fg', 0) + K.r(x, y + u, u, 40, 'fg', 0)) + K.f(v.q, K.r(x + u, y + u, 60, 40, 'ff', 0)) + K.t(x + u / 2, y - 8, 'x', 's tm') + K.t(x + u + 30, y - 8, '5', 's tm') + K.t(x - 8, y + u / 2, 'x', 's tm', 'end') + K.t(x - 8, y + u + 24, '2', 's tm', 'end') + K.t(x + u / 2, y + u / 2 + 5, 'x²', 'b') + K.f(v.p, K.t(x + u + 30, y + u / 2 + 5, '5x') + K.t(x + u / 2, y + u + 25, '2x')) + K.f(v.q, K.t(x + u + 30, y + u + 25, '10')) + K.t(170, 178, v.t || '', 'ta'); };
  // Recta numérica con un rayo desde b hacia d; lleno si e.
  const ray = (v, K) => { const X = n => 170 + n * 24; let s = K.l(20, 70, 320, 70, 'lm'); for (let i = -6; i <= 6; i++) s += K.l(X(i), 65, X(i), 75, 'lm') + K.t(X(i), 94, i, 's tm'); return s + (v.d > 0 ? K.r(X(v.b), 62, 320 - X(v.b), 16, 'fa', 0) : K.r(20, 62, X(v.b) - 20, 16, 'fa', 0)) + K.c(X(v.b), 70, 8, v.e > 0.5 ? 'fG' : 'fn') + K.t(170, 34, v.t || '', 'ta'); };
  // Recibos: filas de cuadros y círculos con total.
  const rbo = (v, K) => [[3, v.p, v.s], [3, v.q, v.r]].map(([a, b, t], k) => { const y = 34 + k * 56; return Array.from({ length: a }, (_, i) => K.r(30 + i * 32, y, 26, 26, 'fa', 3)).join('') + Array.from({ length: Math.round(b) }, (_, i) => K.c(142 + i * 30, y + 13, 12, 'fg')).join('') + K.t(316, y + 18, Math.round(t), 'b', 'end'); }).join('') + K.t(170, 168, v.t || '', 'ta');

  xpLec('icf-ma-ecuaciones-1', [
    ['La balanza',
      xpMira('dibujo', 'Empecemos por la idea: una ecuación es una **balanza derecha**.', { dib: bal, v: { a: 4, b: 3, c: 2, d: 13, t: '4x + 3 = 2x + 13' }, alto: 176 }, [
        ['Cuatro cajas y 3 pesan lo mismo que dos cajas y 13.', {}],
        ['Se quitan dos cajas de cada lado.', { a: 2, c: 0, t: '2x + 3 = 13' }],
        ['Se quitan tres de cada lado.', { b: 0, d: 10, t: '2x = 10' }],
        ['Y se reparte en dos: cada caja pesa cinco.', { a: 1, d: 5, t: 'x = 5' }],
        ['Siempre lo mismo en los dos lados.', {}],
      ], 'Lo que haces en un lado lo haces en el otro.'),
      xpHaz('fichas', '$6x + 2 = 4x + 14$. Pon lo que queda al quitar $4x$ y 2, y el valor de x.', { slots: fila('2x =', 'x ='), fichas: ['12', '6', '16', '8', '10'], meta: ['12', '6'], alto: 96, pista: 'Quita lo mismo de los dos lados.' }, '$2x = 12$ y $x = 6$.')],
    ['De la frase a la letra',
      xpMira('fichas', 'Segunda idea: se le pone **x** a lo que no se sabe y lo demás se escribe con ella.', { slots: fila('Ana', 'Beto', 'Caro'), fichas: ['x', 'x + 4', '2(x + 4)'], alto: 96 }, [
        ['No sabemos cuánto tiene Ana: le decimos equis.', { pon: { 0: 'x' } }],
        ['Beto tiene cuatro más que Ana.', { pon: { 1: 'x + 4' } }],
        ['Caro tiene el doble de Beto, con los cuatro incluidos.', { pon: { 2: '2(x + 4)' } }],
        ['Si juntos tienen 52, se suman las tres.', {}, '$4x + 12 = 52$'],
        ['Cuarenta en cuatro partes: Ana tiene diez.', {}, '$x = 10$'],
      ], 'Una sola letra, y todo escrito con ella.'),
      xpHaz('fichas', 'Iris tiene x años; su tío, el triple menos 5. Pon la edad del tío y la suma de las dos.', { slots: fila('tío', 'suma'), fichas: ['3x − 5', '4x − 5', '5 − 3x', '3x − 4', '4x + 5'], meta: ['3x − 5', '4x − 5'], alto: 96, pista: 'Al triple se le quitan 5; después suma x.' }, '$x + 3x - 5 = 4x - 5$.')],
    ['Comprobar',
      xpMira('fichas', 'Tercera idea: el valor se **lleva al enunciado**.', { slots: fila('menor', 'mayor', 'suma'), fichas: ['14', '23', '37'], alto: 96 }, [
        ['Dos números suman 37 y uno tiene 9 más.', {}, '$x + x + 9 = 37$'],
        ['Sin los nueve quedan 28: el menor es catorce.', { pon: { 0: '14' } }, '$28 \\div 2 = 14$'],
        ['El mayor tiene nueve más.', { pon: { 1: '23' } }],
        ['Se comprueba: suman lo que dice el enunciado.', { pon: { 2: '37' } }, '$14 + 23 = 37$'],
        ['Si no cuadra, se revisa la ecuación, no el enunciado.', {}],
      ], 'Responde lo que preguntan y comprueba.'),
      xpHaz('fichas', 'Tres números seguidos suman 63. Pon el menor y el mayor.', { slots: fila('menor', 'mayor'), fichas: ['20', '22', '21', '19', '23'], meta: ['20', '22'], alto: 96, pista: 'El del medio es el promedio.' }, '$63 \\div 3 = 21$: 20, 21 y 22.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un terreno es 8 m más largo que ancho y su cerca mide 76 m. Pon el ancho y el largo.', { slots: fila('ancho', 'largo'), fichas: ['15', '23', '30', '38', '19'], meta: ['15', '23'], alto: 96, pista: 'Medio borde es un ancho y un largo: 38.' }, '$2a + 8 = 38$: 15 y 23.')],
  ], 'Nombra, plantea, equilibra y comprueba.');

  xpLec('icf-ma-ecuaciones-2', [
    ['Lo semejante se junta',
      xpMira('fichas', 'Empecemos por la idea: se juntan los de la **misma clase**.', { slots: fila('x²', 'x', 'números'), fichas: ['3x²', '2x', '4'], alto: 96 }, [
        ['Tenemos $3x^2 + 5x + 7 - 3x - 3$.', {}],
        ['De equis cuadrado solo hay uno.', { pon: { 0: '3x²' } }],
        ['Cinco equis menos tres equis.', { pon: { 1: '2x' } }, '$5x - 3x = 2x$'],
        ['Y de números, siete menos tres.', { pon: { 2: '4' } }, '$7 - 3 = 4$'],
        ['Equis y equis cuadrado no se juntan.', {}],
      ], 'x con x, x² con x², números con números.'),
      xpHaz('fichas', 'Junta $9x + 4 - 6x + 2$.', { slots: fila('de x', 'números'), fichas: ['3x', '6', '15x', '2', '9x'], meta: ['3x', '6'], alto: 96, pista: 'El signo va con su término.' }, '$3x + 6$.')],
    ['Un producto es un rectángulo',
      xpMira('dibujo', 'Segunda idea: $(x + 5)(x + 2)$ es un **rectángulo** con cuatro pedazos.', { dib: rec, v: { p: 0, q: 0, t: '' }, alto: 186 }, [
        ['El cuadrado grande mide equis por equis.', {}],
        ['Una franja mide cinco por equis y otra, dos por equis.', { p: 1 }],
        ['La esquina mide cinco por dos.', { q: 1 }, '$5 \\cdot 2 = 10$'],
        ['Las franjas se juntan: siete equis.', { t: 'x² + 7x + 10' }, '$5x + 2x = 7x$'],
        ['Al revés: de la suma se vuelve al rectángulo.', {}],
      ], 'Cuatro pedazos; las dos franjas se juntan.'),
      xpHaz('fichas', '$(x + 3)(x + 8)$: pon las franjas juntas y la esquina.', { slots: fila('franjas', 'esquina'), fichas: ['11x', '24', '24x', '11', '5x'], meta: ['11x', '24'], alto: 96, pista: 'Las franjas se suman; la esquina se multiplica.' }, '$x^2 + 11x + 24$.')],
    ['Sacar lo común',
      xpMira('fichas', 'Tercera idea: el **factor común** es el alto que comparten.', { slots: fila('alto', 'ancho 1', 'ancho 2'), fichas: ['5', '2x', '3'], alto: 96 }, [
        ['Tenemos diez equis más quince.', {}, '$10x + 15$'],
        ['Cinco divide a los dos: es el alto.', { pon: { 0: '5' } }],
        ['Diez equis entre cinco.', { pon: { 1: '2x' } }, '$10x \\div 5 = 2x$'],
        ['Y quince repartido entre cinco.', { pon: { 2: '3' } }, '$15 \\div 5 = 3$'],
        ['Queda cinco por todo el paréntesis.', {}, '$5(2x + 3)$'],
      ], 'Saca lo que divide a todos y déjalo afuera.'),
      xpHaz('fichas', '$14x + 21$. Pon el factor común y lo que queda adentro.', { slots: fila('factor', 'adentro'), fichas: ['7', '2x + 3', '14', '2x + 21', '3x + 2'], meta: ['7', '2x + 3'], alto: 96, pista: 'Busca el número más grande que divide a los dos.' }, '$7(2x + 3)$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Si $a + b = 12$, pon el valor de $5a + 5b$ y el de $5a + 5b - 8$.', { slots: fila('5a + 5b', 'menos 8'), fichas: ['60', '52', '17', '9', '68'], meta: ['60', '52'], alto: 96, pista: 'Saca el 5 y usa la suma.' }, '$5 \\cdot 12 = 60$ y $60 - 8 = 52$.')],
  ], 'Junta, arma el rectángulo y saca lo común.');

  xpLec('icf-ma-ecuaciones-3', [
    ['Comparar recibos',
      xpMira('dibujo', 'Empecemos por la idea: al **restar**, lo igual desaparece.', { dib: rbo, v: { p: 2, q: 5, s: 19, r: 25, t: '' }, alto: 178 }, [
        ['Tres cuadros y dos círculos valen 19.', {}],
        ['Tres cuadros y cinco círculos, 25.', {}],
        ['Los cuadros son iguales: no cuentan en la diferencia.', { t: '5 − 2 = 3 círculos más' }],
        ['Tres círculos más valen seis más: dos cada uno.', { t: '25 − 19 = 6' }, '$6 \\div 3 = 2$'],
        ['Sin los círculos, tres cuadros valen quince.', { t: '19 − 4 = 15' }, '$15 \\div 3 = 5$'],
      ], 'Resta los recibos: solo queda lo distinto.'),
      xpHaz('fichas', 'Dos tintos y un pan valen 11; dos tintos y cuatro panes, 20. Pon un pan y un tinto.', { slots: fila('pan', 'tinto'), fichas: ['3', '4', '9', '5', '8'], meta: ['3', '4'], alto: 96, pista: 'Tres panes más valen 9 más.' }, '$9 \\div 3 = 3$ y $(11 - 3) \\div 2 = 4$.')],
    ['Suponer que todos son iguales',
      xpMira('fichas', 'Segunda idea: **supón** que todos son de una clase y corrige.', { slots: fila('todas gallinas', 'faltan', 'vacas').map(s => ({ ...s, w: 78 })), fichas: ['24', '10', '5'], alto: 96 }, [
        ['Doce animales, entre gallinas y vacas, con 34 patas.', {}],
        ['Si todas fueran gallinas habría 24 patas.', { pon: { 0: '24' } }, '$12 \\cdot 2 = 24$'],
        ['Faltan diez patas para completar.', { pon: { 1: '10' } }, '$34 - 24 = 10$'],
        ['Cambiar una gallina por una vaca suma dos.', {}, '$4 - 2 = 2$'],
        ['Hay cinco vacas y siete gallinas.', { pon: { 2: '5' } }, '$10 \\div 2 = 5$'],
      ], 'Supón, mira lo que falta y reparte entre lo que sube cada cambio.'),
      xpHaz('fichas', 'Hay 16 boletas de 3 y de 8 que suman 78. Pon lo que sumarían todas de 3 y cuántas son de 8.', { slots: fila('todas de 3', 'de 8'), fichas: ['48', '6', '10', '30', '128'], meta: ['48', '6'], alto: 96, pista: 'Faltan 30 y cada cambio sube 5.' }, '$16 \\cdot 3 = 48$; $30 \\div 5 = 6$.')],
    ['Suma y diferencia',
      xpMira('fichas', 'Tercera idea: con la **suma** y la **diferencia** se hallan los dos.', { slots: fila('sin ventaja', 'menor', 'mayor'), fichas: ['30', '15', '21'], alto: 96 }, [
        ['Dos números suman 36 y se llevan 6.', {}],
        ['Se quita la ventaja.', { pon: { 0: '30' } }, '$36 - 6 = 30$'],
        ['Quedan dos iguales: el menor.', { pon: { 1: '15' } }, '$30 \\div 2 = 15$'],
        ['El mayor tiene seis más.', { pon: { 2: '21' } }, '$15 + 6 = 21$'],
        ['En el plano es el punto donde se cruzan dos rectas.', {}],
      ], 'Quita la ventaja, reparte y devuélvela.'),
      xpHaz('fichas', 'Dos hermanos tienen juntos 47 años y se llevan 5. Pon la edad de cada uno.', { slots: fila('menor', 'mayor'), fichas: ['21', '26', '42', '24', '23'], meta: ['21', '26'], alto: 96, pista: 'Quita los 5 y parte en dos.' }, '$42 \\div 2 = 21$ y $21 + 5 = 26$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Se mezclan 4 L de jugo puro con agua hasta que el jugo sea el 20 % de todo. Pon el total de litros y el agua agregada.', { slots: fila('total', 'agua'), fichas: ['20', '16', '8', '24', '5'], meta: ['20', '16'], alto: 96, pista: '4 L son la quinta parte del total.' }, '$4 \\cdot 5 = 20$ y $20 - 4 = 16$.')],
  ], 'Compara, supón o usa suma y diferencia.');

  xpLec('icf-ma-ecuaciones-4', [
    ['Muchas respuestas',
      xpMira('dibujo', 'Empecemos por la idea: una desigualdad la cumplen **muchos** números.', { dib: ray, v: { b: 2, d: 1, e: 0, t: 'x > 2' }, alto: 110 }, [
        ['Los mayores que dos se pintan hacia la derecha.', {}],
        ['El dos no entra: el círculo queda vacío.', {}],
        ['Con mayor o igual, sí entra: se llena.', { e: 1, t: 'x ≥ 2' }],
        ['Menores que tres: hacia la izquierda.', { b: 3, d: -1, e: 0, t: 'x < 3' }],
        ['Prueba un número pintado para comprobar.', { t: '1 < 3' }],
      ], 'Pinta hacia donde se cumple y decide si el borde entra.'),
      xpHaz('dibujo', 'Pinta $x \\le -1$: mueve el borde, el lado y si entra.', { dib: ray, v: { b: 0, d: 1, e: 0 }, metas: { b: -1, d: -1, e: 1 }, alto: 270, manijas: [{ k: 'b', min: -5, max: 5, paso: 1, et: 'borde' }, { k: 'd', min: -1, max: 1, paso: 2, et: 'lado' }, { k: 'e', min: 0, max: 1, paso: 1, et: 'entra' }], lee: v => `$x ${v.d > 0 ? (v.e ? '\\ge' : '>') : (v.e ? '\\le' : '<')} ${v.b}$`, dice: () => 'Menor o igual: hacia la izquierda y con el borde.' }, 'El borde −1 entra y se pinta a la izquierda.')],
    ['El signo que se voltea',
      xpMira('fichas', 'Segunda idea: multiplicar o dividir por un **negativo** voltea el signo.', { slots: fila('3 y 5', '+ 4', '· 2', '· (−1)').map(s => ({ ...s, w: 66 })), fichas: ['3 < 5', '7 < 9', '6 < 10', '−3 > −5'], alto: 96 }, [
        ['Tres es menor que cinco.', { pon: { 0: '3 < 5' } }],
        ['Si a los dos se les suma cuatro, sigue igual.', { pon: { 1: '7 < 9' } }],
        ['Si los dos se doblan, también.', { pon: { 2: '6 < 10' } }],
        ['Con menos uno quedan al otro lado del cero.', { pon: { 3: '−3 > −5' } }],
        ['El más grande pasó a ser el más pequeño.', { marca: [3] }],
      ], 'Solo un negativo que multiplica o divide lo voltea.'),
      xpHaz('fichas', 'Resuelve $-3x < 12$ y $2x - 1 \\ge 9$.', { slots: fila('primera', 'segunda'), fichas: ['x > −4', 'x ≥ 5', 'x < −4', 'x ≥ 4', 'x ≤ 5'], meta: ['x > −4', 'x ≥ 5'], alto: 96, pista: 'En la primera se divide entre un negativo.' }, '$x > -4$ y $2x \\ge 10$.')],
    ['Como máximo, al menos',
      xpMira('fichas', 'Tercera idea: las palabras dicen **qué signo** va.', { slots: fila('como máximo', 'al menos', 'menos de', 'más de').map(s => ({ ...s, w: 66 })), fichas: ['≤', '≥', '<', '>'], alto: 96 }, [
        ['«Como máximo 10» permite diez o menos.', { pon: { 0: '≤' } }],
        ['«Al menos 10» permite diez o más.', { pon: { 1: '≥' } }],
        ['«Menos de 10» no deja entrar al diez.', { pon: { 2: '<' } }],
        ['Y «más de 10» tampoco.', { pon: { 3: '>' } }],
        ['Si son personas o cajas, la respuesta es entera.', {}],
      ], 'Máximo ≤, al menos ≥; con «de» el borde no entra.'),
      xpHaz('fichas', 'Con 100 mil se pagan 28 de entrada y 9 por juego. Pon lo que queda para juegos y cuántos como máximo.', { slots: fila('queda', 'máximo'), fichas: ['72', '8', '11', '128', '9'], meta: ['72', '8'], alto: 96, pista: 'Quita la entrada y reparte.' }, '$100 - 28 = 72$ y $72 \\div 9 = 8$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un ascensor aguanta 500 kg. Suben 2 personas de 70 y cajas de 25. Pon los kilos libres y las cajas como máximo.', { slots: fila('libres', 'cajas'), fichas: ['360', '14', '15', '430', '20'], meta: ['360', '14'], alto: 96, pista: 'Las cajas no se parten.' }, '$500 - 140 = 360$; $360 \\div 25 = 14.4$: 14.')],
  ], 'Pinta, cuida el signo y lee bien las palabras.');
}
