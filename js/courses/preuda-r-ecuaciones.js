// Preuniversitario · mundo 13 «Ecuaciones y planteamiento»: lecciones y evaluación (spec 2026-11-18-preuda-razonamiento-completo).
// Reutiliza juegos de Álgebra (despeja-x, consecutivos, perimetro-x, edades-barras, dos-rectas, elimina-variable, dos-compras,
// espejo-desigualdad, rectangulo-pa, balanza-cajas) con datos nuevos.
PU_JUEGOS.push(({ setLesson, setExam }) => {
  const X = n => Math.floor(n / 10), Y = n => n % 10;
  setLesson('pu-ec-1', [
    play('arma-negacion', 'Del texto a la expresión', { rounds: [
      { ask: 'Traduce a una expresión', show: 'el triple de un número, disminuido en 4', tray: ['$3x$', '$3(x$', '$- 4$', '$- 4)$', '$x - 3$', '$4x$'], need: [0, 2] },
      { ask: 'Traduce a una expresión', show: 'el triple de la diferencia entre un número y 4', tray: ['$3x$', '$3(x$', '$- 4$', '$- 4)$', '$x - 3$', '$4x$'], need: [1, 3] },
      { ask: 'Traduce a una ecuación', show: 'la mitad de un número excede en 3 a su cuarta parte', tray: ['$\\tfrac{x}{2}$', '$\\tfrac{x}{4}$', '$=$', '$+ 3$', '$- 3$', '$2x$'], need: [0, 2, 1, 3], alt: [[0, 4, 2, 1], [1, 3, 2, 0]] },
    ] }, 'Con coma, primero se triplica y luego se resta: $3x - 4$. «El triple de la diferencia» multiplica todo: $3(x - 4)$. «Excede en 3» dice que la mitad es la cuarta parte más 3.',
      { hint: 'Lee la frase despacio: ¿qué se hace primero? Lo que se hace al final es lo de afuera.' }),
    play('cinta-ecuacion', 'La cinta de la ecuación', { rounds: [
      { say: 'El segundo tiene 2 más que el primero y el tercero el doble del primero: suman 34', parts: [[1, 0, 'primero'], [1, 2, 'segundo'], [2, 0, 'tercero']], total: 34, lo: 0, hi: 15 },
      { say: 'Un número excede a otro en 7 y suman 31', parts: [[1, 0, 'menor'], [1, 7, 'mayor']], total: 31, lo: 0, hi: 20 },
    ] }, '$x + (x + 2) + 2x = 4x + 2 = 34$ da $x = 8$. $x + (x + 7) = 31$ da $x = 12$: el mayor es 19.',
      { hint: 'Escribe cada cantidad con la misma x y junta todas las x.' }),
    play('consecutivos', 'Números seguidos', { rounds: [{ k: 3, d: 1, S: 96 }, { k: 4, d: 2, S: 100 }] },
      '$3x + 3 = 96$ da $x = 31$. Pares seguidos: $4x + 12 = 100$ da $x = 22$.',
      { hint: 'El primero es x; cada uno suma lo mismo al anterior.' }),
    play('perimetro-x', 'El rectángulo con perímetro', { rounds: [{ m: 4, P: 40 }, { k: 4, P: 50 }] },
      '$2(x + x + 4) = 40$ da $x = 8$. $2(x + 4x) = 50$ da $x = 5$.',
      { hint: 'Escribe el largo con x y suma los cuatro lados.' }),
    play('despeja-x', 'Despeja x', { rounds: [{ a: 5, b: -3, c: 22, cards: [['+', 3], ['+', -3], ['×', 0.2], ['×', 5]] }] },
      'Primero se quita el $-3$: $5x = 25$; luego se divide entre 5: $x = 5$.',
      { hint: 'Deshaz en orden inverso: lo último que le pasó a la x es lo primero que se quita.' }),
    play('tablero-cifras', 'Plantea con las cifras', { rounds: [{ conds: [{ say: 'las decenas exceden en 3 a las unidades', f: n => X(n) === Y(n) + 3 }, { say: 'sus cifras suman 11', f: n => X(n) + Y(n) === 11 }] }] },
      '$X = Y + 3$ y $X + Y = 11$: $2Y + 3 = 11$, $Y = 4$ y $X = 7$: el 74.',
      { hint: 'Escribe las decenas con la cifra de las unidades.' }),
    play('balanza-cajas', 'Despeja en la balanza', { rounds: [{ title: 'Ecuaciones', items: [{ a: 5, b: 2, c: 2, d: 17 }, { a: 3, b: 1, c: 1, d: 9 }] }] },
      '$5x + 2 = 2x + 17$ da $3x = 15$, $x = 5$. $3x + 1 = x + 9$ da $x = 4$.',
      { hint: 'Quita lo mismo de los dos platillos.' }),
  ]);

  setLesson('pu-ec-2', [
    play('edades-barras', 'Problemas de edades', { rounds: [{ k1: 3, L: 8, k2: 2 }, { k1: 4, L: 5, k2: 3 }] },
      '$3x + 8 = 2(x + 8)$ da $x = 8$. $4x + 5 = 3(x + 5)$ da $x = 10$. Todos envejecen lo mismo.',
      { hint: 'Dentro de L años, los dos tienen L años más.' }),
    play('mezcla-precio', 'La mezcla', { rounds: [
      { a: ['café A', 12000], b: ['café B', 8000], total: 10, target: 10000, step: 1 },
      { a: ['arroz', 3000], b: ['lenteja', 6000], total: 12, target: 4000, step: 1 },
    ] }, '$12\\,000a + 8\\,000(10 - a) = 100\\,000$ da $a = 5$. $3\\,000a + 6\\,000(12 - a) = 48\\,000$ da $a = 8$.',
      { hint: 'El valor de la mezcla es la suma de lo que vale cada parte.' }),
    play('alcancia-monedas', 'La alcancía', { rounds: [{ n: 12, v: [500, 200], total: 4200 }, { n: 15, v: [1000, 500], total: 11000 }] },
      '$500k + 200(12 - k) = 4\\,200$ da $k = 6$. $1\\,000k + 500(15 - k) = 11\\,000$ da $k = 7$.',
      { hint: 'Si todas fueran de la menor, ¿cuánto faltaría? Cada moneda grande aporta la diferencia.' }),
    play('balanza-promedio', 'La mezcla como promedio', { rounds: [{ groups: [{ lab: 'jugo de 2 mil', n: 2, mean: 2 }, { lab: 'jugo de 5 mil', n: 4, mean: 5 }], lo: 0, hi: 6 }] },
      'El precio de la mezcla es un promedio ponderado: $\\tfrac{2 \\cdot 2 + 4 \\cdot 5}{6} = 4$ mil el litro.',
      { hint: 'Hay más litros del caro: el precio se acerca a 5.' }),
    play('encuentro-caminantes', 'El encuentro', { rounds: [{ A: [50, 0], B: [30, 120], max: 10 }] },
      '$50t = 30t + 120$ da $20t = 120$: se encuentran a las 6 horas.',
      { hint: 'Se encuentran cuando están en el mismo punto.' }),
    play('cinta-ecuacion', 'Edades en una cinta', { rounds: [{ say: 'Ana tiene el triple de Luis; en 5 años sumarán 38', parts: [[3, 5, 'Ana en 5 años'], [1, 5, 'Luis en 5 años']], total: 38, lo: 0, hi: 15 }] },
      '$(3x + 5) + (x + 5) = 38$ da $4x = 28$: Luis tiene 7 y Ana 21.',
      { hint: 'Los dos suman 5 años.' }),
    play('rompe-cambios', 'Manda la pelota al planteamiento', { miss: 'escribe todo con una sola x', rounds: [{ title: 'Problemas', items: [
      { ask: 'Padre 30, hijo 6: ¿en cuántos años el padre tendrá el triple?', options: ['6', '4', '8'], answer: 0 },
      { ask: '10 monedas de 200 y 500 suman 3 500: de 500 hay…', options: ['5', '3', '7'], answer: 0 },
      { ask: '2 kg a 4 000 y 2 kg a 6 000: el kilo de la mezcla', options: ['5 000', '10 000', '4 500'], answer: 0 },
    ] }] }, '$30 + t = 3(6 + t)$ da $t = 6$. $500k + 200(10 - k) = 3\\,500$ da $k = 5$. Partes iguales: el promedio, 5 000.',
      { hint: 'Plantea antes de lanzar.' }),
  ]);

  setLesson('pu-ec-3', [
    play('dos-rectas', 'El cruce de las dos rectas', { rounds: [{ e1: [1, 1, 7], e2: [1, -1, 1] }, { e1: [2, 1, 8], e2: [1, -1, 1] }] },
      'El punto que cumple las dos está en el cruce: $(4, 3)$ y $(3, 2)$.',
      { hint: 'Desliza el punto por una recta hasta que caiga en la otra.' }),
    play('elimina-variable', 'Elimina una incógnita', { rounds: [{ e1: [4, 3, 18], e2: [1, 1, 5] }] },
      'Con $k = -3$: $4x + 3y - 3(x + y) = 18 - 15$ da $x = 3$, y luego $y = 2$.',
      { hint: 'Busca el número que deja los coeficientes de y opuestos.' }),
    play('dos-compras', 'Dos recibos', { rounds: [{ names: ['pan', 'leche'], e1: [3, 1, 9], e2: [1, 1, 5], max: 8 }] },
      'Del primer recibo al segundo cambian 2 panes y 4 mil: cada pan vale 2 y la leche 3.',
      { hint: 'Compara los dos recibos: ¿qué cambia de uno al otro?' }),
    play('espejo-desigualdad', 'El signo se voltea', { rounds: [{ op: '×', a: 1, b: 4, target: -3 }, { op: '+', a: -2, b: 3, target: 1 }] },
      'Multiplicar por $-3$ voltea el orden: $1 < 4$ pero $-3 > -12$. Sumar 3 no lo cambia.',
      { hint: 'Fíjate en el signo entre las dos imágenes.' }),
    play('intervalo-solucion', 'Pinta la solución', { rounds: [
      { tex: '2x + 1 > 7', f: x => 2 * x + 1 > 7, lo: -5, hi: 6 },
      { tex: '-3x + 2 \\le 8', f: x => -3 * x + 2 <= 8, lo: -5, hi: 5 },
      { tex: '4 - 2x \\ge -2', f: x => 4 - 2 * x >= -2, lo: -2, hi: 8 },
    ] }, '$2x > 6$: $x > 3$. $-3x \\le 6$: al dividir entre $-3$ se voltea, $x \\ge -2$. $-2x \\ge -6$: $x \\le 3$.',
      { hint: 'Despeja como una ecuación; si divides entre un negativo, voltea el signo.' }),
    play('rectangulo-pa', 'Perímetro y área a la vez', { rounds: [{ P: 22, A: 30, max: 11 }] },
      'Ancho más largo es 11 y su producto 30: 5 y 6.',
      { hint: 'Dos números que suman la mitad del perímetro.' }),
    play('vuela-precios', 'Vuela a la solución', { rounds: [{ title: 'Sistemas', items: [
      { ask: 'x + y = 9 y x − y = 3: x vale', options: ['6', '3', '9'], answer: 0 },
      { ask: '−2x < 6, entonces…', options: ['x > −3', 'x < −3', 'x > 3'], answer: 0 },
      { ask: '2 cuadernos + 1 lápiz = 7; 1 cuaderno + 1 lápiz = 4. Cuaderno', options: ['3', '1', '4'], answer: 0 },
    ] }] }, 'Sumando: $2x = 12$. Dividir entre $-2$ voltea: $x > -3$. Restando los recibos, el cuaderno vale 3.',
      { hint: 'Suma o resta las ecuaciones para que se vaya una letra.' }),
  ]);

  setExam('pu-ecuaciones', 'Ecuaciones y planteamiento', [
    ['pu-ec-1', 'Cada cantidad se escribe con la misma x.',
      play('cinta-ecuacion', 'Cinta', { rounds: [{ say: 'Uno tiene 5 más que otro y suman 27', parts: [[1, 0, 'menor'], [1, 5, 'mayor']], total: 27, lo: 0, hi: 20 }] }, '$2x + 5 = 27$: $x = 11$.', { hint: 'Junta las x.' })],
    ['pu-ec-1', 'Seguidos: el primero es x y los demás suman 1.',
      play('consecutivos', 'Seguidos', { rounds: [{ k: 3, d: 1, S: 57 }] }, '$3x + 3 = 57$: $x = 18$.', { hint: 'x, x + 1, x + 2.' })],
    ['pu-ec-2', 'En una mezcla, cantidad × precio de cada parte suma el valor total.',
      play('mezcla-precio', 'Mezcla', { rounds: [{ a: ['té A', 10000], b: ['té B', 4000], total: 6, target: 6000, step: 1 }] }, '$10a + 4(6 - a) = 36$: $a = 2$.', { hint: 'Valor total.' })],
    ['pu-ec-2', 'En monedas, número × valor de cada tipo.',
      play('alcancia-monedas', 'Monedas', { rounds: [{ n: 8, v: [500, 100], total: 2800 }] }, '$500k + 100(8 - k) = 2\\,800$: $k = 5$.', { hint: 'Valor total.' })],
    ['pu-ec-3', 'Al dividir entre un negativo, el signo se voltea.',
      play('intervalo-solucion', 'Desigualdad', { rounds: [{ tex: '-2x + 3 < 9', f: x => -2 * x + 3 < 9, lo: -6, hi: 4 }] }, '$-2x < 6$: $x > -3$.', { hint: 'Voltea.' })],
    ['pu-ec-3', 'La solución de un sistema es el cruce de las dos rectas.',
      play('dos-rectas', 'Cruce', { rounds: [{ e1: [1, 1, 5], e2: [1, -1, 3] }] }, 'El punto $(4, 1)$.', { hint: 'Cruce.' })],
  ]);
});

// Mundo 13 con el estándar de diez (spec 2026-11-20-preuda-razonamiento-diez): una ronda por juego, contexto y zona de examen.
PU_JUEGOS.push(({ diezLesson, addExam, sol, err, opc }) => {
  diezLesson('pu-ec-1', [
    ['arma-negacion', 1, 'Traduce a una expresión: «el triple de la diferencia entre un número y 4»', 'Primero se arma la diferencia y después se triplica: $3(x - 4)$. Sin paréntesis sería «el triple de un número, disminuido en 4».'],
    ['cinta-ecuacion', 0, 'Tres hermanos ahorran: el segundo tiene 2 más que el primero y el tercero tiene el doble del primero. Entre los tres suman 34', 'Con $x$ para el primero: $x + (x + 2) + 2x = 34$, es decir $4x + 2 = 34$ y $x = 8$.'],
    ['consecutivos', 1, 'Cuatro números pares seguidos suman 100. Encuéntralos', 'Los pares seguidos van de 2 en 2: $x + (x + 2) + (x + 4) + (x + 6) = 100$ da $x = 22$. Son 22, 24, 26 y 28.'],
    ['perimetro-x', 1, 'Una cancha mide de largo 4 veces su ancho y su perímetro es 50. Halla sus lados', '$2(x + 4x) = 50$ da $10x = 50$: el ancho es 5 y el largo 20.'],
    ['despeja-x', 0, 'Despeja la $x$ de $5x - 3 = 22$ deshaciendo las operaciones', 'Se deshace en orden contrario: primero se suma 3 ($5x = 25$) y después se divide entre 5: $x = 5$.'],
    ['tablero-cifras', 0, 'En un número de dos cifras, las decenas exceden en 3 a las unidades y las cifras suman 11. Encuéntralo', 'Dos cifras que suman 11 y se diferencian en 3: 7 y 4. Con la mayor en las decenas, es el 74.'],
    ['balanza-cajas', 0, 'Despeja lo que hay en la caja sin desequilibrar la balanza'],
  ], [
    sol('La tercera parte de un número más la cuarta parte del mismo número es igual a 35. ¿Cuál es el número?',
      ['Se plantea $\\tfrac{x}{3} + \\tfrac{x}{4} = 35$. En doceavos, la suma de la izquierda es [[7]] doceavos de $x$', 'Entonces $7x = 35 \\cdot 12 =$ [[420]]', 'El número es $420 \\div 7 =$ [[60]]', 'Comprobación: su tercera parte es 20 y su cuarta parte es [[15]]'],
      ['5', '84', '12'],
      '$\\tfrac{4x}{12} + \\tfrac{3x}{12} = \\tfrac{7x}{12}$. Multiplicando por 12 y dividiendo entre 7 sale 60, y $20 + 15 = 35$.',
      'Para sumar un tercio y un cuarto de la misma cantidad hace falta un denominador común.'),
    err('En una granja hay gallinas y conejos. En total se cuentan 20 cabezas y 56 patas. ¿Cuántos conejos hay?',
      ['Sea $c$ el número de conejos: las gallinas son $20 - c$', 'Patas: $4c + 2(20 - c) = 56$', 'Se opera el paréntesis: $4c + 40 - c = 56$', '$3c = 16$: no da un número entero de conejos'], 2,
      ['Se opera el paréntesis: $4c + 40 - 2c = 56$', 'Se opera el paréntesis: $4c + 20 - 2c = 56$', 'Se opera el paréntesis: $4c + 40 + 2c = 56$'],
      'El 2 multiplica a los dos términos del paréntesis: $2(20 - c) = 40 - 2c$. Queda $2c + 40 = 56$ y $c = 8$ conejos.',
      'Una cantidad de animales que no es entera avisa que algo se operó mal. Revisa cómo se abrió el paréntesis.'),
    opc('Hace 6 años, Juan tenía la mitad de la edad que tendrá dentro de 9 años. La edad actual de Juan es:',
      ['15', '21', '24', '12'], 1,
      'Con $x$ para la edad actual: $x - 6 = \\tfrac{x + 9}{2}$. Entonces $2x - 12 = x + 9$ y $x = 21$.',
      'Escribe con la misma x la edad de hace 6 años y la de dentro de 9 años.'),
  ]);

  diezLesson('pu-ec-2', [
    ['edades-barras', 0, 'Una madre tiene el triple de la edad de su hijo; dentro de 8 años tendrá el doble. Ajusta las barras', 'Con $x$ para el hijo: $3x + 8 = 2(x + 8)$ da $x = 8$. Hoy tienen 8 y 24; en 8 años, 16 y 32.'],
    ['mezcla-precio', 1, 'Se mezclan arroz de 3 000 y lenteja de 6 000 para tener 12 kilos que valgan 4 000 el kilo. Halla la mezcla', 'La mezcla vale $12 \\cdot 4\\,000 = 48\\,000$. Con 8 kilos de arroz y 4 de lenteja: $24\\,000 + 24\\,000$.'],
    ['alcancia-monedas', 0, 'En una alcancía hay 12 monedas de 500 y de 200 que suman 4 200. ¿Cuántas hay de cada una?', 'Con $x$ monedas de 500: $500x + 200(12 - x) = 4\\,200$ da $300x = 1\\,800$. Son 6 y 6.'],
    ['balanza-promedio', 0, 'Se mezclan 2 litros de jugo de 2 mil con 4 litros de jugo de 5 mil. Ubica el precio de la mezcla', '$\\tfrac{2 \\cdot 2 + 4 \\cdot 5}{6} = \\tfrac{24}{6} = 4$ mil el litro: más cerca del jugo que más litros aporta.'],
    ['encuentro-caminantes', 0, 'Un caminante lleva 120 m de ventaja a 30 m por minuto; otro lo sigue a 50 m por minuto. Para el reloj cuando se encuentren', '$50t = 30t + 120$ da $20t = 120$: se encuentran a los 6 minutos.'],
    ['cinta-ecuacion', 0, 'Ana tiene el triple de la edad de Luis y dentro de 5 años sus edades sumarán 38. Arma la cinta', '$(3x + 5) + (x + 5) = 38$ da $4x = 28$: Luis tiene 7 años y Ana 21.'],
    ['rompe-cambios', 0, 'Manda la pelota al planteamiento'],
  ], [
    { ...sol('Hoy Carlos tiene 4 veces la edad de su hija. Dentro de 20 años tendrá el doble de la edad de ella. ¿Qué edades tienen hoy?',
      ['Hoy la hija tiene $x$ años y Carlos $4x$. Dentro de 20 años, a cada edad se le suma [[20]]', 'La condición es $4x + 20 = 2(x + 20)$, es decir, $4x + 20 = 2x +$ [[40]]', 'Queda $2x = 20$: la hija tiene [[10]] años', 'Carlos tiene $4 \\cdot 10 =$ [[40]] años'],
      ['30', '5', '80'],
      'El tiempo pasa igual para los dos: dentro de 20 años tendrán 30 y 60, y 60 es el doble de 30. La condición del futuro se escribe con las edades del futuro.',
      'Haz una tabla con dos columnas, hoy y dentro de 20 años, y una fila para cada persona.'), q: 'Completa el procedimiento: arrastra cada ficha a su hueco.' },
    err('Se mezclan 6 kg de café de 10 000 pesos el kilo con 4 kg de café de 15 000 pesos el kilo. ¿Cuánto vale el kilo de la mezcla?',
      ['Valor del primer café: $6 \\cdot 10\\,000 = 60\\,000$ pesos', 'Valor del segundo café: $4 \\cdot 15\\,000 = 60\\,000$ pesos', 'Precio de la mezcla: $(10\\,000 + 15\\,000) \\div 2 = 12\\,500$ pesos el kilo'], 2,
      ['Precio de la mezcla: $120\\,000 \\div 10 = 12\\,000$ pesos el kilo', 'Precio de la mezcla: $120\\,000 \\div 2 = 60\\,000$ pesos el kilo', 'Precio de la mezcla: $120\\,000 \\div 6 = 20\\,000$ pesos el kilo'],
      'El precio de una mezcla es su valor total entre sus kilos: $120\\,000 \\div 10 = 12\\,000$. Queda más cerca del café que aporta más kilos.',
      'Los dos primeros pasos calcularon el valor de cada café. ¿Los usó el último paso?'),
    opc('En un parqueadero hay 20 vehículos entre motos y carros, y en total se cuentan 64 ruedas. La cantidad de carros que hay en el parqueadero es:',
      ['8', '10', '16', '12'], 3,
      'Si todos fueran motos habría 40 ruedas. Sobran 24, y cada carro aporta 2 ruedas más que una moto: $24 \\div 2 = 12$ carros.',
      'Llama c a los carros: las motos son 20 − c. Cuenta las ruedas de unos y otros.'),
  ]);

  diezLesson('pu-ec-3', [
    ['dos-rectas', 1, 'Dos condiciones a la vez: $2x + y = 8$ y $x - y = 1$. Busca el punto donde se cruzan', 'Sumando las dos ecuaciones se va la y: $3x = 9$, así que $x = 3$ y $y = 2$. Es el único punto que está en las dos rectas.'],
    ['elimina-variable', 0, 'Elimina una incógnita en $4x + 3y = 18$ y $x + y = 5$', 'Multiplicando la segunda por $-3$ y sumando: $x = 3$. Entonces $y = 2$.'],
    ['dos-compras', 0, 'Dos recibos de la misma tienda: 3 panes y 1 leche cuestan 9; 1 pan y 1 leche cuestan 5. Halla cada precio', 'La diferencia entre los recibos son 2 panes por 4: el pan vale 2 y la leche 3.'],
    ['espejo-desigualdad', 0, 'Multiplica los dos lados de $1 < 4$ por $-3$ y mira qué le pasa al signo', 'Queda $-3$ y $-12$: ahora el mayor es el de la izquierda. Al multiplicar por un negativo, el signo se voltea: $-3 > -12$.'],
    ['intervalo-solucion', 1, 'Pinta en la recta todos los números que cumplen $-3x + 2 \\le 8$', '$-3x \\le 6$, y al dividir entre $-3$ el signo se voltea: $x \\ge -2$.'],
    ['rectangulo-pa', 0, 'Un rectángulo tiene perímetro 22 y área 30. Halla sus lados', 'Los lados suman 11 y multiplican 30: son 5 y 6.'],
    ['vuela-precios', 0, 'Vuela a la respuesta', 'Sumando $x + y = 9$ y $x - y = 3$: $2x = 12$, $x = 6$. En $-2x < 6$, al dividir entre $-2$ el signo se voltea: $x > -3$. Restando las compras, un cuaderno vale 3.'],
  ], [
    sol('En una papelería, 2 cuadernos y 3 esferos cuestan 13 000 pesos, y 4 cuadernos y 1 esfero cuestan 16 000 pesos. ¿Cuánto cuesta un cuaderno?',
      ['Se duplica la primera compra: 4 cuadernos y 6 esferos cuestan [[26 000]] pesos', 'Se le resta la segunda compra: quedan [[5]] esferos por 10 000 pesos', 'Cada esfero cuesta [[2 000]] pesos', 'En la segunda compra, los 4 cuadernos cuestan 14 000: cada cuaderno, [[3 500]] pesos'],
      ['13 000', '4 000', '7'],
      'Para eliminar una incógnita se igualan sus cantidades en las dos compras y se restan. Se comprueba en la primera: $2 \\cdot 3\\,500 + 3 \\cdot 2\\,000 = 13\\,000$.',
      'Busca que las dos compras tengan la misma cantidad de cuadernos: así, al restarlas, desaparecen.'),
    err('¿Qué números cumplen la desigualdad $7 - 2x > 1$?',
      ['Se resta 7 a los dos lados: $-2x > -6$', 'Se divide entre $-2$: $x > 3$', 'Comprobación con $x = 5$: $7 - 10 = -3$, que no es mayor que 1'], 1,
      ['Se divide entre $-2$ y el signo se voltea: $x < 3$', 'Se divide entre $-2$: $x > -3$', 'Se divide entre $-2$ y el signo se voltea: $x < -3$'],
      'Al dividir entre un negativo, la desigualdad cambia de sentido: $x < 3$. Con $x = 0$ se comprueba: $7 > 1$.',
      'La comprobación del último paso avisa que algo falló. ¿Qué pasa con el signo al dividir entre un negativo?'),
    opc('Un parqueadero cobra 4 000 pesos por la primera hora y 2 500 pesos por cada hora adicional. Con 20 000 pesos, la mayor cantidad de horas completas que se puede dejar un carro es:',
      ['7', '8', '6', '5'], 0,
      'Después de la primera hora quedan 16 000 pesos, que alcanzan para $16\\,000 \\div 2\\,500 = 6.4$: 6 horas más. En total, 7.',
      'Separa la primera hora, que tiene otro precio, y mira para cuántas horas adicionales alcanza lo que queda.'),
  ]);

  addExam('pu-ecuaciones', [
    ['pu-ec-1', 'Tres números consecutivos se escriben x, x + 1 y x + 2.',
      opc('La suma de tres números enteros consecutivos es 72. El mayor de ellos es:', ['25', '24', '23', '26'], 0,
        'El del medio es $72 \\div 3 = 24$: los números son 23, 24 y 25.', 'En tres consecutivos, el del medio es el promedio.')],
    ['pu-ec-2', 'El tiempo pasa igual para todos: a cada edad se le suma lo mismo.',
      opc('Una madre tiene 36 años y su hijo tiene 8. La cantidad de años que deben pasar para que la edad de la madre sea el triple de la del hijo es:', ['4', '12', '6', '10'], 2,
        '$36 + t = 3(8 + t)$ da $36 + t = 24 + 3t$, así que $t = 6$: tendrán 42 y 14.', 'Suma la misma cantidad de años a las dos edades.')],
    ['pu-ec-3', 'Una desigualdad se despeja como una ecuación; solo cambia de sentido al multiplicar o dividir por un negativo.',
      opc('El mayor número entero que cumple la desigualdad $3x - 5 < 16$ es:', ['7', '6', '5', '8'], 1,
        '$3x < 21$, así que $x < 7$: el mayor entero es 6, porque el 7 no cumple.', 'Despeja y fíjate si el extremo está incluido o no.')],
  ]);
});
