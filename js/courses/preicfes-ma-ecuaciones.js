// Preicfes · Matemáticas · mundo 7 «Ecuaciones en Contexto» (spec 2026-11-25-preicfes-estructura). Números y contextos propios.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, sol, err, opc, guion } = ICF;

  const l1 = leccion('icf-ma-ecuaciones-1', 'Plantear ecuaciones', guion(
    ['Ponerle nombre', 'La cantidad que no se conoce se llama x; lo demás se escribe con ella.'],
    ['Balanza', 'Lo que se hace en un lado se hace en el otro.'],
    ['Frase por frase', '«El doble de x, más 3» no es «el doble de x más 3 juntos».'],
    ['Comprobar', 'El valor hallado se lleva al enunciado.']), [
    x('misma-x', 'Lina tiene **x** láminas. Omar tiene el triple que Lina, Paz 8 menos que Omar y Rita la mitad de Paz. Escribe cada cantidad.', { et: ['Omar', 'Paz', 'Rita'], metas: ['3x', '3x − 8', '(3x − 8)/2'], fichas: ['3x', '3x − 8', '(3x − 8)/2', '8 − 3x', '3x/2 − 8', 'x + 3', '3(x − 8)'], mira: ['El triple es tres veces.', 'A las de Omar quítales 8.', 'La mitad de todo lo de Paz.'], trampas: { '0:x + 3': 'Eso es tener 3 más.', '1:8 − 3x': 'Al revés: se le quitan 8 a Omar.', '1:3(x − 8)': 'Los 8 se quitan después de triplicar.', '2:3x/2 − 8': 'También los 8 se parten por la mitad.' }, ok: 'Todas con la misma x.' },
      'Triple: $3x$; 8 menos: $3x - 8$; mitad de eso: $\\tfrac{3x - 8}{2}$.', 'Escribe cada persona a partir de la anterior, sin cambiar de letra.'),
    x('sigue-equilibrada', 'La balanza está derecha: $5x + 4 = 3x + 18$. Toca **todos** los cambios que la dejan derecha.', { casos: [{ t: 'quitar 3x de cada lado', si: true }, { t: 'quitar 4 de la izquierda y sumar 4 a la derecha', no: 'Quitar en un lado y sumar en el otro no es hacer lo mismo.' }, { t: 'sumar 10 a cada lado', si: true }, { t: 'partir cada lado por la mitad', si: true }, { t: 'quitar 5x de la izquierda y 3x de la derecha', no: 'Se quitan cantidades distintas en cada lado.' }], no: 'Alguno de los marcados no hace lo mismo en los dos lados.', falta: 'Falta otro: sirve todo lo que se les haga a los dos lados por igual.', ok: 'Lo mismo a los dos lados: sigue derecha.' },
      'Quitar $3x$, sumar 10 o partir por la mitad, en los dos lados a la vez, la deja derecha.', 'Compara lo que se hace en un plato con lo que se hace en el otro.'),
    x('ancho-del-marco', 'El **largo** de una huerta es **1 menos que el doble del ancho**, y su borde mide **34**. Mueve el ancho.', { k: 2, q: 1, P: 34, max: 10 },
      'Ancho $a$ y largo $2a - 1$: $2(3a - 1) = 34$ da $a = 6$ y el largo, 11.', 'La mitad del borde es un ancho y un largo juntos.'),
    x('cinco-seguidos', '**Cinco** números enteros seguidos suman **140**. Encuentra estos tres.', { n: 5, et: ['el del medio', 'el menor', 'el mayor'], metas: ['28', '26', '30'], fichas: ['28', '26', '30', '29', '27', '24', '32'], mira: ['Lo que les falta a los de antes les sobra a los de después.', 'Retrocede desde el del medio.', 'Avanza desde el del medio.'], trampas: { '1:27': 'Antes del medio hay dos números, no uno.', '2:29': 'Después del medio hay dos números, no uno.' }, ok: '26 + 27 + 28 + 29 + 30 = 140.' },
      'El del medio es $140 \\div 5 = 28$: van del 26 al 30.', 'Si repartes la suma por igual, ¿cuál de los cinco sale?'),
    x('dos-cuerdas', 'Una cinta mide **5 m más que el doble** de otra, y juntas miden **41 m**. Completa.', { et: ['la corta', 'la larga', 'se llevan'], metas: ['12', '29', '17'], fichas: ['12', '29', '17', '36', '24', '20', '5'], mira: ['Son tres veces la corta y 5 más: quita primero los 5.', 'El doble de la corta, más 5.', 'Resta las dos.'], trampas: { '0:36': 'Esas son las tres veces: falta repartir.', '1:24': 'Faltan los 5 de más.', '2:5': 'Los 5 son sobre el doble, no sobre la corta.' }, ok: '12 + 29 = 41.' },
      '$3c + 5 = 41$: $c = 12$, la larga 29 y se llevan 17.', 'Cuenta cuántas veces la corta hay en total y arregla los 5.'),
    x('hace-cuantos', 'Hoy una mamá tiene **44** años y su hijo **16**. Retrocede hasta que ella tuviera **cinco veces** la edad del hijo.', { a: 44, b: 16, k: 5, na: 'mamá', nb: 'hijo' },
      'Hace 9 años ella tenía 35 y él 7, y $35 = 5 \\cdot 7$.', 'La diferencia de edades no cambia: compárala con la edad del hijo.'),
    x('sube-ecuacion', 'Sube al valor que se pide. Puedes fallar **una** vez.', { tiros: [
      { q: '$7x - 5 = 4x + 22$. ¿Cuánto vale **x**?', r: 9, c: '27 \\div 3', e: { 27: 'Eso vale 3x.' } },
      { q: 'A un número le quito 18 y queda su **tercera parte**. ¿Cuál es?', r: 27, c: '18 \\cdot \\tfrac32', e: { 9: 'Esa es la tercera parte.', 54: 'Los 18 son dos terceras partes, no una.' } },
      { q: 'El doble de un número más 11 es **47**. ¿Cuál es?', r: 18, c: '36 \\div 2', e: { 36: 'Ese es el doble.', 29: 'Los 11 se quitan, no se suman.' } }] },
      '$3x = 27$; 18 son dos tercios de 27; $2x = 36$.', 'Escribe la frase como igualdad antes de calcular.'),
    sol('Tres hermanos reparten 94 mil: el segundo recibe 6 mil más que el primero y el tercero, el doble del primero. ¿Cuánto recibe cada uno?', ['Juntos: $x + (x + 6) + 2x$ son [[4x + 6]]', 'Sin los 6 quedan [[88]]', 'El primero recibe [[22]] mil'], ['4x', '100', '44'], '$4x = 88$: 22; el segundo 28 y el tercero 44.', 'Suma las tres partes escritas con la misma letra.'),
    err('«El doble de la edad de Iván, aumentada en 5, es 44». Lo que se dobla es la edad ya aumentada.', ['Sea $x$ la edad de Iván', 'La edad aumentada en 5 es $x + 5$', 'El doble de eso es $2x + 5 = 44$'], 2, ['El doble de eso es $2(x + 5) = 44$', 'El doble de eso es $x + 10 = 44$', 'El doble de eso es $2x - 5 = 44$'], 'Se dobla toda la edad aumentada: $2(x + 5) = 44$, $x = 17$.', '¿Los 5 también se doblan?'),
    opc('Un libro de 180 páginas se lee en tres días: cada día se leen 10 páginas más que el anterior. Si $x$ son las del primer día, la ecuación es:', ['$x + 10x + 20x = 180$', '$3x + 10 = 180$', '$3x + 20 = 180$', '$3x + 30 = 180$'], 3, '$x + (x + 10) + (x + 20) = 3x + 30$.', 'Escribe las páginas de cada día y súmalas.'),
  ]);

  const l2 = leccion('icf-ma-ecuaciones-2', 'Expresiones algebraicas', guion(
    ['Términos semejantes', 'Se juntan los de la misma clase: $3x$ con $2x$, números con números.'],
    ['Áreas', 'Un producto es un rectángulo: $(x + a)(x + b)$ tiene cuatro pedazos.'],
    ['Factor común', 'Es el alto que comparten dos rectángulos.'],
    ['Reemplazar', 'Dos expresiones equivalentes dan lo mismo con cualquier número.']), [
    x('junta-terminos', 'Junta los términos de la misma clase.', { t: ['5x', '+ 8', '− 2x', '− 3', '+ 4x'], c: [0, 1, 0, 1, 0], et: ['los de x', 'los números', 'con x = 2'], metas: ['7x', '5', '19'], fichas: ['7x', '5', '19', '11x', '3x', '12', '24'], mira: ['Mira el signo que va delante de cada uno.', 'Resta los números con su signo.', 'Reemplaza en lo que quedó.'], trampas: { '0:11x': 'El 2x se resta.' }, ok: '7x + 5.' },
      '$5x - 2x + 4x = 7x$ y $8 - 3 = 5$; con $x = 2$, $14 + 5 = 19$.', 'El signo que va delante de un término es suyo.'),
    x('area-letras', 'Un lote mide $(x + 6)$ por $(x + 4)$. Pon el área del cuadrado grande, de los **dos** pedazos iguales de color juntos y de la esquina.', { a: 6, b: 4, et: ['cuadrado', 'los dos juntos', 'la esquina'], metas: ['x²', '10x', '24'], fichas: ['x²', '10x', '24', '24x', '10', '2x'], mira: ['Su lado mide x por los dos lados.', 'Uno mide 6 por x y otro, x por 4.', 'Multiplica los dos números.'], trampas: { '1:24x': 'Los dos se suman: 6x y 4x.', '2:10': 'La esquina se multiplica, no se suma.' }, ok: 'x² + 10x + 24.' },
      '$x^2$, $6x + 4x = 10x$ y $6 \\cdot 4 = 24$.', 'El área de cada pedazo es su base por su altura.'),
    x('factor-comun', 'Los dos rectángulos se pegan por el **alto común más grande**: $18x + 24$. Muévelo.', { a: 18, b: 24, x: 'x', k: 6, max: 12 },
      'El 6 divide a 18 y a 24, y no hay uno mayor: $6(3x + 4)$.', 'Busca el número más grande que divida a los dos.'),
    x('cuadrado-falta', 'Faltan cuadritos para completar el cuadrado: $x^2 + 6x + ?$', { a: 3, max: 14 },
      'Las tiras de $6x$ se parten en dos grupos de $3x$: la esquina es de 3 por 3, nueve.', 'La esquina mide lo mismo que el ancho de cada grupo de tiras.'),
    x('equivalen-no', 'Toca **todas** las que equivalen a $4(x + 3)$.', { casos: [{ t: '4x + 12', si: true }, { t: '4x + 3', no: 'Con x = 1 da 7, y la de arriba, 16: falta multiplicar el 3.' }, { t: '2(2x + 6)', si: true }, { t: '4x + 7', no: 'Con x = 1 da 11, y la de arriba, 16: el 3 se multiplica, no se suma.' }, { t: '12 + 4x', si: true }], no: 'Alguna de las marcadas da otro número: pruébala con x = 1.', falta: 'Falta otra que da lo mismo: prueba con x = 1.', ok: 'Con x = 1 todas valen 16.' },
      'El 4 multiplica a los dos: $4x + 12$, que también es $2(2x + 6)$.', 'Prueba cada una con un número cualquiera.'),
    x('tabla-lineal', 'Una máquina hace $3x - 2$. Pon lo que sale con 4, lo que entró si salió 34 y lo que sale con 0.', { ex: 'entra', ey: 'sale', t: [[1, 1], [4, null], [7, 19]], et: ['con 4', 'salió 34', 'con 0'], metas: ['10', '12', '−2'], fichas: ['10', '12', '−2', '14', '2', '100'], mira: ['Triplica y quita 2.', 'Devuélvete: suma 2 y reparte en 3.', 'Triplicar 0 da 0: falta quitar.'], trampas: { '0:14': 'Se quitan 2, no se suman.', '1:100': 'Eso es aplicarla de nuevo: aquí se devuelve.', '2:2': 'Quitar 2 a cero da un negativo.' }, ok: 'Ida y vuelta.' },
      '$3 \\cdot 4 - 2 = 10$; $(34 + 2) \\div 3 = 12$; con 0 da $-2$.', 'De ida se triplica y se quita; de vuelta, al revés.'),
    x('sube-tarifa', 'Sube al número que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Si $x = 5$, ¿cuánto vale $x^2 + 2x$?', r: 35, c: '25 + 10', e: { 20: 'x² es 5 por 5, no 5 por 2.' } },
      { q: 'Si $a = 4$ y $b = 3$, ¿cuánto vale $2a(b + 1)$?', r: 32, c: '8 \\cdot 4', e: { 25: 'El paréntesis va primero.' } },
      { q: 'Si $m + n = 9$, ¿cuánto vale $3m + 3n + 1$?', r: 28, c: '3 \\cdot 9 + 1', e: { 27: 'Falta sumar 1.', 10: 'La suma se triplica primero.' } }] },
      '$25 + 10$; $8 \\cdot 4$; $3(m + n) + 1 = 28$.', 'No siempre hace falta conocer cada letra: busca la suma.'),
    sol('El perímetro de un rectángulo de lados $x + 5$ y $2x$ es 40. ¿Cuánto mide $x$?', ['Los dos lados suman [[3x + 5]]', 'Eso es la mitad del perímetro: [[20]]', '$x =$ [[5]]'], ['2x + 5', '40', '15'], 'De $3x + 5 = 20$ sale $3x = 15$ y $x = 5$.', 'El perímetro es dos veces la suma de los lados.'),
    err('Alguien simplifica la expresión $2(x + 4) - 3(x - 1)$.', ['$2x + 8 - 3(x - 1)$', '$2x + 8 - 3x - 3$', 'Se juntan las x y los números'], 1, ['$2x + 8 - 3x + 3$', '$2x + 8 + 3x - 3$', '$2x + 4 - 3x + 3$'], '$-3 \\cdot (-1) = +3$: queda $-x + 11$.', 'Mira el signo del producto de los dos negativos.'),
    opc('Un número de dos cifras tiene $a$ decenas y $b$ unidades. El número se escribe:', ['$ab$', '$a + b$', '$10a + b$', '$10(a + b)$'], 2, 'Cada decena vale 10: $10a + b$.', 'Piensa en 47: ¿cuántas decenas y unidades tiene?'),
  ]);

  const l3 = leccion('icf-ma-ecuaciones-3', 'Sistemas', guion(
    ['Dos condiciones', 'Un sistema pide números que cumplan dos igualdades a la vez.'],
    ['Comparar recibos', 'Al restar, lo que es igual desaparece.'],
    ['Suponer', 'Si todos fueran de una clase, lo que sobra o falta dice cuántos hay de la otra.'],
    ['En el plano', 'La solución es el punto que está en las dos rectas.']), [
    x('resta-recibos', 'Los cuadros son **cuadernos** y los círculos **lápices**. Compara los dos recibos.', { f: [[4, 1, 26], [4, 4, 32]], et: ['más lápices', 'más precio', 'un lápiz', 'un cuaderno'], metas: ['3', '6', '2', '6'], fichas: ['3', '6', '2', '6', '5', '58', '24'], mira: ['¿En cuántos lápices se diferencian?', '¿En cuánto se diferencian los totales?', 'Reparte lo que cuesta de más entre los lápices de más.', 'Quita los lápices y reparte entre los cuadernos.'], trampas: { '1:58': 'Se restan los totales.', '3:24': 'Eso valen los cuatro cuadernos.' }, ok: '4 · 6 + 2 = 26 y 4 · 6 + 8 = 32.' },
      'Tres lápices más cuestan 6 más: 2 cada uno. $26 - 2 = 24$: 6 cada cuaderno.', 'Los cuadernos son iguales en los dos: compara solo lo distinto.'),
    x('todos-iguales', 'En un parqueadero hay **18** vehículos entre motos (2 llantas) y carros (4), y **52** llantas. Completa.', { n: 18, et: ['todos motos', 'faltan', 'carros', 'motos'], metas: ['36', '16', '8', '10'], fichas: ['36', '16', '8', '10', '72', '9', '14'], mira: ['Supón que los 18 son motos.', 'De lo que supusiste hasta 52.', 'Cada cambio de moto por carro sube 2.', 'Los demás, hasta completar 18.'], trampas: { '0:72': 'Eso sería con todos carros.' }, ok: '8 · 4 + 10 · 2 = 52.' },
      'Con todas motos serían 36; faltan 16 y cada carro sube 2: 8 carros.', 'Imagina que todos son de una sola clase y mira cuánto falta.'),
    x('aranas-hormigas', 'En un terrario hay **9** animales entre arañas (8 patas) y hormigas (6 patas), y **64** patas. Mueve la cantidad de arañas.', { n: 9, T: 64 },
      'Con todas hormigas serían 54; faltan 10 y cada araña suma 2: 5 arañas.', 'Supón que todas son hormigas y mira cuántas patas faltan.'),
    x('lleva-ventaja', 'Dos equipos suman **52** puntos y uno le lleva **8** al otro. Mueve el menor.', { s: 52, d: 8, max: 30 },
      'Sin los 8 quedan 44, dos veces el menor: 22.', 'Quita la ventaja del total y reparte por igual.'),
    x('punto-comun', 'Arrastra el punto hasta el que cumple **las dos** condiciones: $2x + y = 10$ y $x - y = 2$.', { e: [[2, 1, 10], [1, -1, 2]], l: [[1, 8, 5, 0], [2, 0, 8, 6]], texto: '(4, 2)' },
      '$2 \\cdot 4 + 2 = 10$ y $4 - 2 = 2$: el punto (4, 2).', 'Prueba puntos de una recta hasta que uno cumpla la otra.'),
    x('aguado', 'Hay **6 L** de jugo con **50 %** de pulpa. Agrega agua hasta que la pulpa sea el **30 %** de todo.', { L: 6, pu: 3, d: 30, max: 6 },
      'Hay 3 L de pulpa; para que sean el 30 % el total debe ser 10 L: 4 de agua.', 'La pulpa no cambia: ¿de cuántos litros es el 30 %?'),
    x('sube-sistema', 'Sube al número que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Dos números suman **46** y se llevan **14**. ¿Cuál es el **mayor**?', r: 30, c: '(46 + 14) \\div 2', e: { 16: 'Ese es el menor.' } },
      { q: 'Dos panes y un café valen **11**; un pan y un café, **8**. ¿Cuánto vale el **café**?', r: 5, c: '8 - 3', e: { 3: 'Eso vale un pan.' } },
      { q: 'Hay **15** billetes de 2 y de 5 que suman **51**. ¿Cuántos son de **5**?', r: 7, c: '(51 - 30) \\div 3', e: { 8: 'Esos son los de 2.', 21: 'Eso falta: cada cambio sube 3.' } }] },
      '$(46 + 14) \\div 2 = 30$; $11 - 8 = 3$ el pan y 5 el café; $21 \\div 3 = 7$.', 'Compara, resta o supón que todos son iguales.'),
    sol('En un teatro, 5 adultos y 2 niños pagan 120; 3 adultos y 2 niños, 80. ¿Cuánto paga cada uno?', ['Al restar desaparecen los [[niños]]', 'La resta de los pagos es [[40]]', 'Cada adulto paga [[20]]', 'Cada niño paga [[10]]'], ['adultos', '200', '60'], '$120 - 80 = 40$: 20 por adulto; $80 - 60 = 20$ por dos niños.', 'Resta los recibos: lo igual se va.'),
    err('Alguien resuelve el sistema $x + y = 15$, $x - y = 5$.', ['Se suman las dos ecuaciones', '$2x = 20$, $x = 10$', '$y = 15 + 10 = 25$'], 2, ['$y = 15 - 10 = 5$', '$y = 10 - 15 = -5$', '$y = 5 + 10 = 15$'], 'En $x + y = 15$, con $x = 10$ queda $y = 5$.', 'Reemplaza en la primera y despeja.'),
    opc('Un sistema tiene dos rectas paralelas distintas. El número de soluciones es:', ['Una', 'Dos', 'Ninguna', 'Infinitas'], 2, 'Las paralelas distintas no se cruzan: no hay punto común.', 'Piensa cuántos puntos comparten.'),
  ]);

  const l4 = leccion('icf-ma-ecuaciones-4', 'Desigualdades', guion(
    ['Muchas respuestas', 'Una desigualdad la cumplen muchos números: se pintan en la recta.'],
    ['El signo', 'Sumar o restar no lo cambia; multiplicar o dividir por un negativo lo voltea.'],
    ['El borde', 'Entra con ≤ o ≥ y no entra con < o >.'],
    ['Como máximo, al menos', '«Como máximo» es ≤; «al menos», ≥.']), [
    x('voltea-o-sigue', 'Se sabe que $4 > -2$. Si se les hace lo mismo a los dos números, ¿el signo **sigue** igual o **se voltea**?', { et: ['sumar 5', 'multiplicar por −2', 'dividir entre 2', 'dividir entre −1'], metas: ['sigue', 'se voltea', 'sigue', 'se voltea'], fichas: ['sigue', 'sigue', 'sigue', 'se voltea', 'se voltea', 'se voltea'], mira: ['Quedan 9 y 3: ¿cuál está más a la derecha?', 'Quedan −8 y 4: ¿cuál está más a la derecha?', 'Quedan 2 y −1: ¿cuál está más a la derecha?', 'Quedan −4 y 2: ¿cuál está más a la derecha?'], ok: 'Solo multiplicar o dividir por un negativo lo voltea.' },
      'Sumar y dividir entre positivo lo conservan; por un negativo se voltea.', 'Calcula los dos números nuevos y mira cuál queda más a la derecha.'),
    x('pinta-intervalo', 'Pinta todos los números que cumplen $1 - 2x > 5$.', { n: 1, m: -2, c: 5, b: -2, dir: -1, ab: 1, texto: 'x menor que −2, sin el −2' },
      '$-2x > 4$: al dividir entre $-2$ se voltea, $x < -2$, y el $-2$ no entra.', 'Despeja con cuidado del signo y prueba el borde.'),
    x('enteros-entre', 'Toca todos los enteros que cumplen las dos partes: $-3 < 2x + 1 \\le 9$.', { nums: [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5], ex: '2x + 1', g: n => 2 * n + 1, si: n => -3 < 2 * n + 1 && 2 * n + 1 <= 9, ok: 'El −2 da justo −3 y no entra; el 4 da 9 y sí.' },
      'Con $-1$ da $-1$; con 4 da 9. Van de $-1$ a 4.', 'Prueba cada entero y cuida los dos bordes.'),
    x('zona-conviene', 'Una app cobra **12** fijos y **2 por viaje**; otra, **4 por viaje** sin fijo. Pinta los viajes en que **la primera es más barata**.', { max: 12, x: 6, d: 1, st: 2, et: 'viajes en que la primera es más barata', ok: 'Con más de 6 gana la de menor cobro por viaje.' },
      '$12 + 2v < 4v$ da $v > 6$: con más de seis viajes.', 'Halla dónde empatan y prueba un número de cada lado.'),
    x('precio-posible', 'Se mezcla maní de **4 mil** con nueces de **12 mil** el kilo, poniendo **más maní**. ¿Cuánto puede valer el kilo de la mezcla? Toca todos.', { a: 4, b: 12, nums: [3, 5, 7, 8, 9, 13], ok: 'Entre 4 y 8: más cerca de lo que más se puso.' },
      'El promedio en partes iguales sería 8; con más maní queda entre 4 y 8.', 'Piensa en el precio si hubiera partes iguales.'),
    x('llega-presupuesto', 'Un paseo cuesta **90** fijos y **15 por persona** (en miles). ¿Cuántas personas pueden ir, **como máximo**, con **300**?', { b: 90, m: 15, total: 300, max: 20, et: 'personas', uno: 'persona' },
      '$90 + 15p \\le 300$: $p \\le 14$, así que máximo 14.', 'Quita lo fijo y mira cuántas veces cabe lo de cada uno.'),
    x('sube-tarifa', 'Sube al número que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'El mayor entero que cumple $3x - 4 < 20$', r: 7, c: '3x < 24 \\Rightarrow x_{\\text{máx}}', e: { 8: 'Con 8 da justo 20: no es menor.' } },
      { q: 'El menor entero que cumple $2x + 1 \\ge 24$', r: 12, c: '2x \\ge 23 \\Rightarrow x_{\\text{mín}}', e: { 11: 'Con 11 da 23: no alcanza.' } },
      { q: 'Un montacargas aguanta 400 kg. Sube un operario de 70 con cajas de 18 kg. ¿Cuántas cajas **como máximo**?', r: 18, c: '18n \\le 330 \\Rightarrow n_{\\text{máx}}', e: { 19: 'Con 19 se pasa.', 22: 'Falta contar al operario.' } }] },
      '$x < 8$: 7; $x \\ge 11.5$: 12; $330 \\div 18 = 18.3$: 18.', 'Mira si el borde entra y si la respuesta debe ser entera.'),
    sol('Una estudiante tiene 3.2, 4.1 y 3.5. ¿Cuánto necesita en la cuarta nota para que el promedio sea al menos 3.8?', ['Las cuatro deben sumar al menos [[15.2]]', 'Las tres que tiene suman [[10.8]]', 'Necesita al menos [[4.4]]'], ['3.8', '11.4', '4.0'], '$3.8 \\cdot 4 = 15.2$ y $15.2 - 10.8 = 4.4$.', 'Multiplica el promedio por las cuatro notas.'),
    err('Alguien resuelve la desigualdad $8 - 2x > 2$ paso a paso.', ['Se quita 8: $-2x > -6$', 'Se divide entre $-2$', 'Queda $x > 3$'], 2, ['Queda $x < 3$', 'Queda $x > -3$', 'Queda $x < -3$'], 'Al dividir entre un negativo el signo se voltea: $x < 3$.', '¿Qué le pasa al signo al dividir entre un negativo?'),
    opc('Para subir a una montaña rusa se debe medir al menos 1.40 m y pesar menos de 110 kg. Si $h$ es la altura y $p$ el peso, las condiciones son:', ['$h \\ge 1.40$ y $p < 110$', '$h > 1.40$ y $p \\le 110$', '$h \\le 1.40$ y $p < 110$', '$h \\ge 1.40$ y $p > 110$'], 0, '«Al menos» incluye 1.40; «menos de» no incluye 110.', 'Pregunta si el borde entra en cada frase.'),
  ]);

  return mundo('icf-ma-ecuaciones', 'Ecuaciones en Contexto', 'matematicas', [l1, l2, l3, l4], [
    ['icf-ma-ecuaciones-1', 'Escribe todas las cantidades con la misma letra.', play('cinta-ecuacion', 'Arma la cinta hasta el total pedido', { rounds: [{ say: 'Uno tiene 7 más que otro y suman 33', parts: [[1, 0, 'menor'], [1, 7, 'mayor']], total: 33, lo: 0, hi: 20 }] }, '$2x + 7 = 33$: 13 y 20.', { hint: 'Quita los 7 y reparte en dos.' })],
    ['icf-ma-ecuaciones-1', 'Despejar: lo mismo en los dos lados.', play('despeja-x', 'Despeja x aplicando lo mismo a los dos lados', { rounds: [{ a: 4, b: 9, c: 37, cards: [['+', -9], ['+', 9], ['×', 0.25], ['×', 4]] }] }, '$4x = 28$ y $x = 7$: se quita 9 y se parte en 4.', { hint: 'Quita primero lo que está solo.' })],
    ['icf-ma-ecuaciones-1', 'Comprueba siempre en el enunciado.', opc('La suma de un número y su mitad es 36. El número es:', ['18', '12', '24', '72'], 2, '$24 + 12 = 36$, así que es 24.', 'El número y su mitad son tres mitades.')],
    ['icf-ma-ecuaciones-2', 'Un producto es un rectángulo con cuatro pedazos.', play('llena-rectangulo', 'Multiplica llenando el rectángulo con los bloques', { rounds: [{ a: 1, b: 4 }] }, '$(x + 1)(x + 4) = x^2 + 5x + 4$.', { hint: 'Cuenta las franjas de cada lado y la esquina.' })],
    ['icf-ma-ecuaciones-2', 'Factor común: el alto que comparten.', play('une-rectangulos', 'Factor común: junta los rectángulos que comparten el alto', { rounds: [{ base: [5, 6], others: [[5, 4], [3, 4], [5, 2]] }] }, 'Los de alto 5: $5(6 + 4 + 2)$.', { hint: 'Solo pegan los que tienen el mismo alto.' })],
    ['icf-ma-ecuaciones-2', 'Equivalentes: dan lo mismo con cualquier número.', opc('La expresión $3(2x - 1) + 4$ equivale a:', ['$6x + 3$', '$6x + 1$', '$6x - 1$', '$5x + 3$'], 1, '$6x - 3 + 4 = 6x + 1$.', 'El 3 multiplica a los dos términos.')],
    ['icf-ma-ecuaciones-3', 'Supón que todas son iguales y corrige.', play('alcancia-monedas', 'Mueve la divisoria hasta que la alcancía sume lo pedido', { rounds: [{ n: 10, v: [500, 200], total: 3200 }] }, 'Con todas de 200 serían 2 000; faltan 1 200 y cada cambio sube 300: 4 de 500.', { hint: 'Empieza con todas de 200 y mira cuánto falta.' })],
    ['icf-ma-ecuaciones-3', 'En una mezcla se suman los costos y los kilos.', play('mezcla-precio', 'Mezcla hasta que el kilo valga lo pedido', { rounds: [{ a: ['café A', 12000], b: ['café B', 6000], total: 6, target: 8000, step: 1 }] }, 'Dos kilos de A y cuatro de B: $24 + 24 = 48$ mil en 6 kilos.', { hint: 'Calcula cuánto debe costar toda la mezcla.' })],
    ['icf-ma-ecuaciones-3', 'Al restar, lo igual desaparece.', opc('Tres jugos y dos tortas valen 27; tres jugos y cinco tortas, 45. Una torta vale:', ['9', '5', '3', '6'], 3, 'Tres tortas más valen 18: 6 cada una.', 'Compara los dos recibos.')],
    ['icf-ma-ecuaciones-4', 'El borde entra o no según el signo.', play('intervalo-solucion', 'Pinta la solución de la desigualdad', { rounds: [{ tex: '3x - 2 \\ge 4', f: x => 3 * x - 2 >= 4, lo: -3, hi: 7 }] }, '$3x \\ge 6$: $x \\ge 2$, con el 2.', { hint: 'Despeja y prueba si el borde cumple.' })],
    ['icf-ma-ecuaciones-4', 'Entre dos números: dos bordes.', play('dibuja-intervalo', 'Dibuja en la recta los números que cumplen $-1 \\le x < 4$', { min: -4, max: 8, a: -1, b: 4, aClosed: true, bClosed: false, set: '−1 ≤ x < 4' }, 'El $-1$ entra y el 4 no.', { hint: 'Mira qué signo lleva cada borde.' })],
    ['icf-ma-ecuaciones-4', 'Como máximo: menor o igual.', opc('Con 50 mil se compran empanadas de 3 mil y un jugo de 8 mil. Como máximo se compran:', ['14 empanadas', '16 empanadas', '13 empanadas', '15 empanadas'], 0, '$42 \\div 3 = 14$, justo.', 'Quita el jugo y reparte lo que queda.')],
  ]);
})());
