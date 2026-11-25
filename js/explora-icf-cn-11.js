// Preicfes · Ciencias Naturales, mundos 11 «Gases y Disoluciones» y 12 «Electricidad y Magnetismo» (Explora). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const puntos = (K, x, y, w, h, n) => Array.from({ length: n }, (_, i) => K.c(x + 8 + ((i * 37) % 97) / 97 * (w - 16), y + 8 + ((i * 59) % 83) / 83 * (h - 16), 3.2, 'ff')).join('');
  // Émbolo con volumen w (0 a 1).
  const emb = (v, K) => { const w = 230 * v.w; return K.r(40, 30, 250, 76, 'fn', 4) + K.r(40, 30, w, 76, 'fa', 2) + puntos(K, 40, 30, w, 76, 18) + K.r(40 + w, 26, 10, 84, 'fk', 2) + K.t(170, 140, v.t, 'ta'); };
  const globo = (v, K) => K.c(170, 76, v.r, 'fa') + K.l(170, 76 + v.r, 170, 148, 'lm') + K.t(170, 168, v.t, 'ta');
  // Vaso con nivel n y 16 granos de soluto.
  const vaso = (v, K) => K.r(120, 16, 100, 110, 'fn', 4) + K.r(120, 126 - 110 * v.n, 100, 110 * v.n, 'fa', 2) + Array.from({ length: 16 }, (_, i) => K.c(130 + (i * 43 % 83), 122 - (i * 29 % 89) / 89 * Math.max(6, 110 * v.n - 10), 2.8, 'ff')).join('') + K.t(170, 152, v.t, 'ta');
  const pila = (K, x, y) => K.l(x - 10, y, x + 10, y, 'gr') + K.l(x - 5, y + 8, x + 5, y + 8, 'gr'), bom = (K, x, y, on) => K.c(x, y, 13, on > 0.5 ? 'ff' : 'fc') + K.l(x - 6, y - 6, x + 6, y + 6, 'lm') + K.l(x - 6, y + 6, x + 6, y - 6, 'lm');
  // Serie (p = 0) o paralelo (p = 1) con dos bombillos; a y b prendidos.
  const circ = (v, K) => (v.p < 0.5 ? K.pl([[70, 70], [70, 24], [270, 24], [270, 120], [70, 120], [70, 78]], 'gr') + bom(K, 130, 24, v.a) + bom(K, 210, 24, v.b) : K.pl([[70, 70], [70, 24], [270, 24], [270, 120], [70, 120], [70, 78]], 'gr') + K.l(170, 24, 170, 120, 'gr') + bom(K, 170, 72, v.a) + bom(K, 270, 72, v.b)) + pila(K, 70, 70) + K.t(170, 154, v.t, 'ta');
  const cargas = (v, K) => { const x = v.d / 2; return K.c(170 - x, 70, 20, v.s > 0 ? 'ff' : 'fa') + K.t(170 - x, 76, v.s > 0 ? '+' : '−', 'b') + K.c(170 + x, 70, 20, 'fa') + K.t(170 + x, 76, '−', 'b') + K.l(170 - x, 110, 170 - x + (v.s > 0 ? 1 : -1) * v.f, 110, 'la gr') + K.l(170 + x, 110, 170 + x - (v.s > 0 ? 1 : -1) * v.f, 110, 'la gr') + K.t(170, 148, v.t, 'ta'); };

  xpLec('icf-cn-gases-1', [
    ['Boyle',
      xpMira('dibujo', 'Empecemos por la idea: con la **misma temperatura**, presión por volumen **no cambia**.', { dib: emb, v: { w: 1, t: '12 L a 1 atm' }, alto: 152 }, [
        ['El gas ocupa doce litros.', {}],
        ['Sus partículas chocan con las paredes.', {}],
        ['A la mitad, chocan el doble de seguido.', { w: 0.5, t: '6 L a 2 atm' }, '$12 \\cdot 1 = 6 \\cdot 2$'],
        ['A la cuarta parte, cuatro veces.', { w: 0.25, t: '3 L a 4 atm' }, '$3 \\cdot 4 = 12$'],
        ['El producto siempre es el mismo.', {}],
      ], 'Menos volumen, más presión.'),
      xpHaz('fichas', 'Un gas ocupa 10 L a 3 atm. Pon el producto y el volumen a 5 atm.', { slots: fila('producto', 'litros'), fichas: ['30', '6', '15', '50', '2'], meta: ['30', '6'], alto: 96, pista: 'Multiplica y después divide entre 5.' }, '$10 \\cdot 3 = 30$ y $30 \\div 5 = 6$.')],
    ['Charles',
      xpMira('dibujo', 'Segunda idea: con la **misma presión**, el volumen sigue a los **kelvin**.', { dib: globo, v: { r: 40, t: '200 K: 4 L' }, alto: 178 }, [
        ['Un globo a doscientos kelvin.', {}],
        ['Al calentarlo, sus partículas empujan más.', { r: 46, t: '300 K: 6 L' }, '$\\tfrac{4}{200} = \\tfrac{6}{300}$'],
        ['Con el doble de kelvin, el doble de volumen.', { r: 50, t: '400 K: 8 L' }],
        ['Para pasar de Celsius se suman 273.', {}, '$27 + 273 = 300$'],
        ['En Celsius la proporción no vale.', {}],
      ], 'Volumen y kelvin, en proporción.'),
      xpHaz('fichas', 'Pon 7 °C en kelvin, y el volumen de 5 L a 280 K si pasa a 560 K.', { slots: fila('kelvin', 'litros'), fichas: ['280', '10', '266', '2.5', '7'], meta: ['280', '10'], alto: 96, pista: 'Suma 273; los kelvin se duplican.' }, '$7 + 273 = 280$; el doble de 5 es 10.')],
    ['Recipiente rígido',
      xpMira('hoja', 'Tercera idea: si el **volumen** no cambia, la **presión** sigue a los kelvin.', { paras: [['Lata a 300 K: 2 atm'], ['Lata a 450 K: 3 atm'], ['Más partículas, más presión'], ['PV = nRT']] }, [
        ['La lata no puede crecer.', { luz: [0] }],
        ['Con 1.5 veces los kelvin, 1.5 veces la presión.', { luz: [1] }, '$2 \\cdot 1.5 = 3$'],
        ['Por eso no se arroja al fuego.', { luz: [1] }],
        ['Al inflar entran más partículas.', { luz: [2] }],
        ['Una sola ecuación lo reúne todo.', { luz: [3] }],
      ], 'Mira qué queda fijo.'),
      xpHaz('hoja', 'Pon al margen qué queda fijo.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['el volumen', 'la temperatura'], meta: [1, 0], paras: [['Se empuja despacio una jeringa tapada'], ['Se calienta un tanque de acero cerrado']], pista: 'Alguna no va ahí: ¿cambia el tamaño o el calor?' }, 'Despacio, la temperatura no cambia; el acero no crece.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Una llanta a 2 atm y 300 K se calienta a 330 K sin cambiar de tamaño. Subraya su presión.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['1.8 atm'], ['2.2 atm'], ['32 atm']], pista: 'Los kelvin subieron un 10 %.' }, '$2 \\cdot 1.1 = 2.2$.')],
  ], 'Boyle, Charles y lo que queda fijo.');

  xpLec('icf-cn-gases-2', [
    ['Soluto y disolución',
      xpMira('dibujo', 'Empecemos por la idea: la concentración compara el **soluto** con la **disolución**.', { dib: vaso, v: { n: 0.4, t: '16 g en 2 L' }, alto: 162 }, [
        ['Los puntos son el soluto.', {}],
        ['Dieciséis gramos en dos litros.', {}, '$16 \\div 2 = 8$ g/L'],
        ['Si hay más agua, están más separados.', { n: 0.8, t: '16 g en 4 L' }, '$16 \\div 4 = 4$ g/L'],
        ['El soluto es el mismo.', {}],
        ['Mucho soluto no es lo mismo que concentrado.', {}],
      ], 'Soluto entre disolución.'),
      xpHaz('fichas', 'Pon la concentración de 18 g en 3 L, y el porcentaje de 4 g en 80 g de disolución.', { slots: fila('g/L', '%'), fichas: ['6', '5', '54', '4', '20'], meta: ['6', '5'], alto: 96, pista: 'Divide en los dos casos.' }, '$18 \\div 3 = 6$ y $4 \\div 80 = 5\\%$.')],
    ['Diluir',
      xpMira('fichas', 'Segunda idea: al **diluir**, concentración por volumen **no cambia**.', { slots: fila('antes', 'después', 'se agrega'), fichas: ['1 L', '3 L', '2 L'], alto: 96 }, [
        ['Un litro a doce gramos por litro.', { pon: { 0: '1 L' } }],
        ['Se quiere a cuatro gramos por litro.', {}],
        ['Los doce gramos llenan tres litros.', { pon: { 1: '3 L' } }, '$12 \\div 4 = 3$'],
        ['Se agregan dos, no tres.', { pon: { 2: '2 L' } }, '$3 - 1 = 2$'],
        ['Ojo: el volumen final no es lo agregado.', {}],
      ], 'Gramos iguales; resta lo que ya había.'),
      xpHaz('fichas', '3 L a 8 g/L se llevan a 2 g/L. Pon el volumen final y el agua que se agrega.', { slots: fila('final (L)', 'agua (L)'), fichas: ['12', '9', '24', '8', '3'], meta: ['12', '9'], alto: 96, pista: 'Hay 24 g.' }, '$24 \\div 2 = 12$ y $12 - 3 = 9$.')],
    ['Otras cosas que se hacen',
      xpMira('hoja', 'Tercera idea: **evaporar** concentra; **sacar** un poco no cambia nada.', { paras: [['Evaporar agua'], ['Agregar soluto'], ['Servir un vaso'], ['1 ppm = 1 mg por kg']] }, [
        ['Menos agua, mismo soluto.', { luz: [0], nota: { 0: 'sube' } }],
        ['Más soluto, casi el mismo volumen.', { luz: [1], nota: { 1: 'sube' } }],
        ['Sale soluto y sale agua por igual.', { luz: [2], nota: { 2: 'no cambia' } }],
        ['Para cantidades mínimas: partes por millón.', { luz: [3] }],
        ['En un remedio, un cero de más importa.', {}],
      ], 'Pregunta qué salió y qué entró.'),
      xpHaz('hoja', 'De 1 L a 6 g/L se evapora medio litro de agua. Subraya la nueva concentración.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['3 g/L'], ['6 g/L'], ['12 g/L']], pista: 'Los 6 g quedan en medio litro.' }, '$6 \\div 0.5 = 12$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un agua tiene 5 mg de cloro en 4 kg; lo permitido es hasta 2 ppm. Subraya lo correcto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Cumple: 1.25 ppm'], ['No cumple: 5 ppm'], ['No cumple: 20 ppm']], pista: 'Divide los miligramos entre los kilogramos.' }, '$5 \\div 4 = 1.25$.')],
  ], 'Soluto entre disolución, diluir y lo que cambia.');

  xpLec('icf-cn-electrico-1', [
    ['Ohm',
      xpMira('fichas', 'Empecemos por la idea: **voltaje = corriente · resistencia**.', { slots: fila('voltaje', 'resistencia', 'corriente'), fichas: ['9 V', '3 Ω', '3 A'], alto: 96 }, [
        ['La pila empuja con nueve voltios.', { pon: { 0: '9 V' } }],
        ['La resistencia se opone: tres ohmios.', { pon: { 1: '3 Ω' } }],
        ['Entonces pasan tres amperios.', { pon: { 2: '3 A' } }, '$9 \\div 3 = 3$'],
        ['Con el doble de resistencia, la mitad.', {}, '$9 \\div 6 = 1.5$'],
        ['Sin camino cerrado no pasa nada.', {}],
      ], 'Corriente es voltaje entre resistencia.'),
      xpHaz('fichas', 'Pon la corriente de 20 V en 5 Ω, y el voltaje que hace pasar 3 A por 7 Ω.', { slots: fila('corriente', 'voltaje'), fichas: ['4 A', '21 V', '100 A', '10 V', '2 A'], meta: ['4 A', '21 V'], alto: 96, pista: 'Divide en la primera y multiplica en la segunda.' }, '$20 \\div 5 = 4$ y $3 \\cdot 7 = 21$.')],
    ['Serie y paralelo',
      xpMira('dibujo', 'Segunda idea: en **serie** hay un camino; en **paralelo**, varios.', { dib: circ, v: { p: 0, a: 1, b: 1, t: 'en serie' }, alto: 164 }, [
        ['Dos bombillos en el mismo camino.', {}],
        ['Si uno se quema, se corta el camino.', { a: 0, b: 0, t: 'se apagan los dos' }],
        ['Ahora cada uno tiene el suyo.', { p: 1, a: 1, b: 1, t: 'en paralelo' }],
        ['Si uno se quema, el otro sigue.', { a: 0, t: 'el otro sigue' }],
        ['En serie se suman las resistencias.', {}, '$4 + 6 = 10$ Ω'],
      ], 'Serie: un camino. Paralelo: varios.'),
      xpHaz('fichas', '6 V en paralelo a dos resistencias de 3 Ω. Pon la corriente de cada rama y la total.', { slots: fila('cada rama', 'total'), fichas: ['2 A', '4 A', '1 A', '6 A', '3 A'], meta: ['2 A', '4 A'], alto: 96, pista: 'Cada una recibe los 6 V.' }, '$6 \\div 3 = 2$ y $2 + 2 = 4$.')],
    ['Potencia',
      xpMira('hoja', 'Tercera idea: **potencia = voltaje · corriente**; la energía es potencia por **tiempo**.', { paras: [['120 V · 5 A = 600 W'], ['600 W · 2 h = 1 200 Wh'], ['1 000 Wh = 1 kWh'], ['Recibo: se cobran kWh']] }, [
        ['Un horno pequeño usa esto.', { luz: [0] }],
        ['En dos horas gasta esta energía.', { luz: [1] }],
        ['Mil vatios hora son un kilovatio hora.', { luz: [2] }],
        ['Eso se paga en el recibo.', { luz: [3] }],
        ['Poca potencia por mucho tiempo también suma.', {}],
      ], 'Vatios por horas.'),
      xpHaz('fichas', 'Un televisor de 80 W encendido 5 h. Pon los Wh y los kWh.', { slots: fila('Wh', 'kWh'), fichas: ['400', '0.4', '16', '4', '40'], meta: ['400', '0.4'], alto: 96, pista: 'Multiplica y después divide entre mil.' }, '$80 \\cdot 5 = 400$ Wh.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'En serie, 12 V con 2 Ω y 4 Ω. Subraya el voltaje de la resistencia de **4 Ω**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['12 V'], ['8 V'], ['4 V']], pista: 'Halla primero la corriente.' }, '$12 \\div 6 = 2$ A y $2 \\cdot 4 = 8$ V.')],
  ], 'Ohm, caminos y vatios por horas.');

  xpLec('icf-cn-electrico-2', [
    ['Cargas',
      xpMira('dibujo', 'Empecemos por la idea: iguales se **repelen**, distintas se **atraen**; y la **distancia** importa mucho.', { dib: cargas, v: { d: 160, s: -1, f: 9, t: '' }, alto: 158 }, [
        ['Dos cargas negativas se repelen.', { t: 'iguales: se repelen' }],
        ['Una positiva y una negativa se atraen.', { s: 1, t: 'distintas: se atraen' }],
        ['Al acercarse, la fuerza crece.', { d: 80, f: 36, t: 'a la mitad: 4 veces más' }],
        ['Al alejarse, baja con el cuadrado.', { d: 200, f: 5.8, t: 'más lejos, menos' }],
        ['La carga no se crea: pasa de un cuerpo a otro.', {}],
      ], 'Al doble de lejos, la cuarta parte.'),
      xpHaz('fichas', 'Dos cargas se atraen con fuerza 100. Pon la fuerza al doble de distancia y con una carga tres veces mayor.', { slots: fila('doble distancia', 'carga · 3'), fichas: ['25', '300', '50', '900', '200'], meta: ['25', '300'], alto: 96, pista: 'La distancia, al cuadrado; la carga, no.' }, '$100 \\div 4 = 25$ y $100 \\cdot 3 = 300$.')],
    ['Imanes',
      xpMira('hoja', 'Segunda idea: todo imán tiene **dos polos**, aunque se parta.', { paras: [['N con S: se atraen'], ['N con N: se repelen'], ['Partido: N-S y N-S'], ['Atrae hierro, níquel y cobalto'], ['No atrae cobre ni aluminio']] }, [
        ['Los polos distintos se buscan.', { luz: [0] }],
        ['Polos iguales se rechazan.', { luz: [1] }],
        ['Al partirlo salen dos imanes completos.', { luz: [2] }],
        ['Atrae solo algunos metales.', { luz: [3] }],
        ['Y deja quietos a otros.', { luz: [4], tacha: [4] }],
      ], 'Dos polos, siempre.'),
      xpHaz('hoja', 'Subraya lo que un imán **sí** atrae.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Alambre de cobre'], ['Papel de aluminio'], ['Puntilla de hierro']], pista: 'No atrae todos los metales.' }, 'El hierro sí; cobre y aluminio, no.')],
    ['De ida y vuelta',
      xpMira('hoja', 'Tercera idea: la **corriente** produce magnetismo y el **imán que se mueve**, corriente.', { paras: [['Alambre + clavo + pila'], ['Más vueltas, más fuerza'], ['Imán que entra y sale de una bobina'], ['Generador de una represa']] }, [
        ['Con corriente, el clavo atrae.', { luz: [0], nota: { 0: 'electroimán' } }],
        ['Se puede apagar y hacer más fuerte.', { luz: [1] }],
        ['Al mover el imán aparece corriente.', { luz: [2], nota: { 2: 'inducción' } }],
        ['Si se queda quieto, no.', { luz: [2] }],
        ['Así se produce casi toda la electricidad.', { luz: [3] }],
      ], 'Ida: electroimán. Vuelta: inducción.'),
      xpHaz('hoja', 'Pon al margen qué ocurre.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['inducción', 'electroimán'], meta: [1, 0], paras: [['Una cerradura que se abre con un botón y corriente'], ['Una bicicleta cuya rueda mueve un imán y prende una luz']], pista: 'Alguna no va ahí: ¿entra corriente o sale corriente?' }, 'La cerradura recibe corriente; la bicicleta la produce.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un imán quieto dentro de una bobina no prende la luz. Subraya qué hay que hacer.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Mover el imán'], ['Enfriar la bobina'], ['Pintar el imán']], pista: 'La corriente aparece con un cambio.' }, 'Al moverlo aparece corriente.')],
  ], 'Cargas, polos, y de ida y vuelta.');
}
