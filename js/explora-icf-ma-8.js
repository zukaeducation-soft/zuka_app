// Preicfes · Matemáticas, mundo 8 «Validar Procedimientos» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Dos conjuntos, uno dentro del otro; p es un punto que se mueve.
  const dentro = (v, K) => K.c(170, 96, 76, 'fa') + K.c(150, 104, 36, 'fg') + K.t(150, 108, v.a, 's') + K.t(206, 50, v.b, 's') + K.f(v.f, K.c(v.x, v.y, 7, 'fF')) + K.t(170, 194, v.t || '', 'ta');
  // Rectángulo de base b y altura h.
  const rec = (v, K) => K.r(170 - v.b * 8, 150 - v.h * 14, v.b * 16, v.h * 14, 'fa', 0) + K.t(170, 168, Math.round(v.b), 's tm') + K.t(162 - v.b * 8, 154 - v.h * 7, Math.round(v.h), 's tm', 'end') + K.t(170, 24, v.t || '', 'ta');

  xpLec('icf-ma-argumenta-1', [
    ['Si… entonces',
      xpMira('dibujo', 'Empecemos por la idea: «si es de 6, es par» pone un conjunto **dentro** de otro.', { dib: dentro, v: { a: 'de 6', b: 'pares', f: 0, x: 150, y: 120, t: '' }, alto: 202 }, [
        ['Todos los múltiplos de 6 están entre los pares.', {}],
        ['El 18 está adentro: es de 6 y es par.', { f: 1, t: '18' }],
        ['El 8 es par y no es de 6: la frase no va al revés.', { x: 214, y: 110, t: '8' }],
        ['El 7 no es par: tampoco puede ser de 6.', { x: 290, y: 60, t: '7' }],
        ['Si no es par, no es de 6: eso sí vale.', {}],
      ], 'Vale de ida; y de vuelta solo si se niegan las dos.'),
      xpHaz('hoja', '«Si llueve, el piso se moja». El piso está seco. Subraya lo que se concluye.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Llovió.'], ['No llovió.'], ['No se sabe.']], pista: 'Si hubiera llovido, ¿cómo estaría el piso?' }, 'Al negar lo segundo se niega lo primero.')],
    ['Basta o hace falta',
      xpMira('hoja', 'Segunda idea: una condición puede **bastar** o solo **hacer falta**.', { paras: [['Ser de 10 … para ser par'], ['Ser par … para ser de 10'], ['Tener 4 lados iguales … para ser cuadrado']] }, [
        ['Todo el que es de 10 es par: basta.', { luz: [0], nota: { 0: 'basta' } }],
        ['Sin ser par no se puede ser de 10.', { luz: [1] }],
        ['Pero el 6 es par y no es de 10: solo hace falta.', { luz: [1], nota: { 1: 'hace falta' } }],
        ['El rombo tiene 4 lados iguales y no es cuadrado.', { luz: [2], nota: { 2: 'hace falta' } }],
        ['Busca un caso que cumpla lo primero y falle lo segundo.', {}],
      ], 'Basta: con eso alcanza. Hace falta: sin eso no se puede.'),
      xpHaz('hoja', 'Pon al margen qué es, para que un triángulo sea **equilátero**.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['basta', 'hace falta'], meta: [1, 0], paras: [['Tener dos ángulos iguales'], ['Tener tres ángulos de 60°']], pista: 'Alguna no va ahí: ¿un isósceles siempre es equilátero?' }, 'Dos iguales no alcanzan; tres de 60°, sí.')],
    ['Paso a paso',
      xpMira('fichas', 'Tercera idea: un procedimiento vale si **cada paso** se justifica.', { slots: fila('paso 1', 'paso 2', 'paso 3'), fichas: ['50', '10', '60'], alto: 96 }, [
        ['Se quiere el 12 % de 500.', {}],
        ['El 10 % es la décima parte: cincuenta.', { pon: { 0: '50' } }, '$500 \\div 10 = 50$'],
        ['El 2 % son dos veces el 1 %: diez.', { pon: { 1: '10' } }, '$2 \\cdot 5 = 10$'],
        ['Al juntarlos se obtiene sesenta.', { pon: { 2: '60' } }, '$50 + 10 = 60$'],
        ['Otro camino también vale: 500 por 0.12.', {}, '$500 \\cdot 0.12 = 60$'],
      ], 'Dos caminos distintos valen si cada paso es cierto.'),
      xpHaz('hoja', 'Para hallar el 15 % de 80, subraya el procedimiento **equivocado**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['80 por 0.15'], ['10 % más la mitad de ese 10 %'], ['80 entre 15']], pista: 'Calcula los tres: dos dan lo mismo.' }, 'Los dos primeros dan 12; el otro, 5.33.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', '«Si un número es de 9, es de 3». Luis dice: «21 es de 3; entonces es de 9». Subraya el error.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['21 no es de 3.'], ['Usó la frase al revés.'], ['La frase es falsa.']], pista: 'Mira en qué dirección la usó.' }, 'Ser de 3 no basta para ser de 9.')],
  ], 'Dirección, condición y cada paso con su razón.');

  xpLec('icf-ma-argumenta-2', [
    ['Uno basta',
      xpMira('hoja', 'Empecemos por la idea: un «todos» cae con **un solo** caso.', { letras: ['frase', '3', '5', '9'], paras: [['Todos los impares son primos.'], ['3: impar y primo'], ['5: impar y primo'], ['9: impar y no primo']] }, [
        ['La frase habla de todos los impares.', { luz: [0] }],
        ['El tres la cumple.', { luz: [1], nota: { 1: 'cumple' } }],
        ['El cinco también la cumple.', { luz: [2], nota: { 2: 'cumple' } }],
        ['El nueve es 3 por 3: no es primo.', { luz: [3], nota: { 3: 'la tumba' } }],
        ['Con uno solo, la frase ya es falsa.', { tacha: [0], luz: [3] }],
      ], 'Mil a favor no la prueban; uno en contra la tumba.'),
      xpHaz('hoja', '«Todo múltiplo de 4 es múltiplo de 8». Subraya el que la tumba.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['16'], ['20'], ['10']], pista: 'Debe ser de 4 y no ser de 8.' }, '20 es de 4 y no de 8; 10 ni siquiera es de 4.')],
    ['Cumplir y fallar',
      xpMira('hoja', 'Segunda idea: el contraejemplo **cumple** la condición y **falla** la conclusión.', { letras: ['frase', 'a', 'b', 'c'], paras: [['Si un número es mayor que 2, su cuadrado es mayor que 5.'], ['3: cuadrado 9'], ['1: cuadrado 1'], ['2.1: cuadrado 4.41']] }, [
        ['Condición: mayor que 2. Conclusión: cuadrado mayor que 5.', { luz: [0] }],
        ['El tres cumple las dos: no la tumba.', { luz: [1], tacha: [1] }],
        ['El uno no cumple la condición: no cuenta.', { luz: [2], tacha: [1, 2] }],
        ['El 2.1 cumple la condición y falla la conclusión.', { luz: [3], nota: { 3: 'la tumba' } }],
        ['Los decimales, el cero y los negativos suelen tumbar.', {}],
      ], 'Cumple la primera parte y falla la segunda.'),
      xpHaz('hoja', '«Si sumo dos números, el resultado es mayor que el primero». Subraya la pareja que la tumba.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['2 y 9'], ['10 y 1'], ['4 y 0']], pista: 'Busca una suma que no pase del primero.' }, '$4 + 0 = 4$, que no es mayor que 4.')],
    ['Siempre o a veces',
      xpMira('hoja', 'Tercera idea: para decir **siempre** hace falta una razón general.', { paras: [['Par + par'], ['2a + 2b'], ['2(a + b): siempre par'], ['Impar · 3 es de 3: siempre'], ['Impar + 3 es de 4: a veces']] }, [
        ['Probar con dos pares no basta.', { luz: [0] }],
        ['Se escriben con letras: valen por todos.', { luz: [1] }],
        ['Es dos veces algo: siempre es par.', { luz: [2], nota: { 2: 'siempre' } }],
        ['Multiplicar por 3 siempre da de 3.', { luz: [3], nota: { 3: 'siempre' } }],
        ['Cinco más tres es ocho, pero siete más tres es diez.', { luz: [4], nota: { 4: 'a veces' } }],
      ], 'Razón general: siempre. Un caso que falla: a veces.'),
      xpHaz('hoja', 'Pon al margen si ocurre siempre o a veces, con n entero.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['a veces', 'siempre'], meta: [1, 0], paras: [['n + n es par'], ['n · n es par']], pista: 'Alguna no va ahí: prueba con 3.' }, '$2n$ siempre es par; $3 \\cdot 3 = 9$ no.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', '«Cuando el perímetro aumenta, el área aumenta». Subraya el cambio que la tumba.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['De 4 por 4 a 5 por 5'], ['De 4 por 4 a 9 por 1'], ['De 2 por 3 a 2 por 6']], pista: 'Calcula perímetro y área antes y después.' }, 'El perímetro pasa de 16 a 20 y el área, de 16 a 9.')],
  ], 'Uno tumba, cumple y falla, y «siempre» pide razón.');

  xpLec('icf-ma-argumenta-3', [
    ['¿Una sola respuesta?',
      xpMira('dibujo', 'Empecemos por la idea: la información **alcanza** si solo hay una respuesta.', { dib: rec, v: { b: 6, h: 4, t: '' }, alto: 180 }, [
        ['Se sabe que el perímetro es 20. ¿Cuál es el área?', { t: 'perímetro 20' }],
        ['Puede ser 6 por 4: área 24.', { t: 'área 24' }, '$6 \\cdot 4 = 24$'],
        ['También 8 por 2: área 16.', { b: 8, h: 2, t: 'área 16' }, '$8 \\cdot 2 = 16$'],
        ['Dos respuestas: no alcanza.', { t: 'no alcanza' }],
        ['Si además es cuadrado, solo queda 5 por 5.', { b: 5, h: 5, t: 'área 25' }, '$20 \\div 4 = 5$'],
      ], 'Dos respuestas posibles: no alcanza.'),
      xpHaz('hoja', '¿Alcanza para saber el precio de un lápiz? Subraya el dato que **sí**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Dos lápices y un borrador valen 7'], ['Un lápiz vale menos que un borrador'], ['Cinco lápices valen 10']], pista: 'Busca el que deja un solo precio.' }, '$10 \\div 5 = 2$.')],
    ['Lo que sobra',
      xpMira('hoja', 'Segunda idea: un dato **sobra** si la respuesta no cambia al cambiarlo.', { letras: ['a', 'b', 'c', 'd'], paras: [['Tanque de 2 m por 3 m por 1 m'], ['Es verde'], ['Costó 900 mil'], ['¿Cuántos litros le caben?']] }, [
        ['Lo que se pide son los litros.', { luz: [3] }],
        ['Las medidas hacen falta.', { luz: [0], nota: { 0: 'hace falta' } }],
        ['Si fuera rojo le cabría lo mismo.', { luz: [1], tacha: [1] }],
        ['Y si costara el doble, también.', { luz: [2], tacha: [1, 2] }],
        ['Primero la pregunta, después los datos.', { luz: [3, 0] }],
      ], 'Cambia el dato: si la respuesta no cambia, sobra.'),
      xpHaz('hoja', 'Se pide la edad promedio de 3 hermanos. **Tacha** lo que sobra.', { modo: 'tacha', letras: ['A', 'B', 'C'], meta: [1], paras: [['Sus edades suman 45'], ['Viven en Pasto'], ['Son tres']], pista: 'Cambia cada dato y mira si cambia el promedio.' }, '$45 \\div 3 = 15$, vivan donde vivan.')],
    ['Solos o juntos',
      xpMira('hoja', 'Tercera idea: prueba cada dato **por separado** y luego **juntos**.', { letras: ['¿?', '1', '2'], paras: [['¿Cuánto vale n, entero positivo?'], ['Dato 1: n es menor que 8'], ['Dato 2: n es múltiplo de 5']] }, [
        ['Con el primero puede ser 1, 2, 3…', { luz: [1], nota: { 1: 'no alcanza' } }],
        ['Con el segundo, 5, 10, 15…', { luz: [2], nota: { 2: 'no alcanza' } }],
        ['Con los dos, solo el 5.', { luz: [1, 2] }],
        ['Juntos, los dos datos alcanzan.', { nota: { 1: 'juntos, sí', 2: 'juntos, sí' } }],
        ['No uses el dato 1 cuando pruebas el 2.', {}],
      ], 'Uno, el otro y los dos: en ese orden.'),
      xpHaz('hoja', '¿Es x mayor que y? Dato 1: x + 2 = y. Dato 2: x es par. Subraya lo correcto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Basta el dato 1.'], ['Basta el dato 2.'], ['Hacen falta los dos.']], pista: 'Con el primero, ¿quién es mayor?' }, 'Si $y = x + 2$, y es mayor: se responde que no.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', '«Entre Ana y Beto recogieron 30 tapas; Ana recogió más». Subraya lo que se puede afirmar.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Ana recogió 20.'], ['Ana recogió más de 15.'], ['Beto recogió 14.']], pista: 'Busca lo que vale en todos los casos posibles.' }, 'Con 16 y 14 o con 29 y 1, Ana siempre pasa de 15.')],
  ], 'Una respuesta, lo que sobra y cada dato por separado.');
}
