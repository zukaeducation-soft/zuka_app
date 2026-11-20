// Gimnasio del Preuniversitario, razonamiento lógico (spec 2026-11-20-preuda-razonamiento-diez): los conceptos animados que
// el estudiante puede recordar dentro de un paso (CONCEPTOS, motor en js/conceptos.js), los retos guiados de los mundos que
// no tenían y el concepto de cada paso de los retos que ya existían (GYM_CONCEPT_DE). Va después de js/gimnasio.js.
const CONCEPTOS_PU = {
  'fraccion-a-porcentaje': {
    title: 'De fracción a porcentaje',
    scene: { type: 'barra', bars: [
      { label: 'el todo en 5 partes', b: 0, segs: [{ w: .2, t: '1/5', c: 'a' }, { w: .2, t: '1/5', c: 'a' }, { w: .2, t: '', c: 'mute', dim: 1 }, { w: .2, t: '', c: 'mute', dim: 1 }, { w: .2, t: '', c: 'mute', dim: 1 }] },
      { label: 'el mismo todo son 100', b: 1, segs: [{ w: .2, t: '20', c: 'g' }, { w: .2, t: '20', c: 'g' }, { w: .2, t: '20', c: 'mute', dim: 1 }, { w: .2, t: '20', c: 'mute', dim: 1 }, { w: .2, t: '20', c: 'mute', dim: 1 }] },
      { label: '2 partes de 20', b: 2, segs: [{ w: .4, t: '40 %', c: 'ok' }] },
    ] },
    beats: ['$\\tfrac25$ es tomar 2 de 5 partes iguales.', 'Un porcentaje reparte el mismo todo en 100: cada quinto vale 20.', 'Dos quintos son $2 \\cdot 20 = 40$ de cada 100: el 40 %.'],
  },
  'lo-que-queda-de-cien': {
    title: 'Lo que queda del 100 %',
    scene: { type: 'barra', bars: [
      { label: 'el grupo completo', b: 0, segs: [{ w: 1, t: '100 %', c: 'a' }] },
      { label: 'se quitan las partes conocidas', b: 1, segs: [{ w: .4, t: '40 %', c: 'g' }, { w: .25, t: '25 %', c: 'f' }, { w: .35, t: '?', c: 'ok', b: 2 }] },
    ] },
    beats: ['Todo grupo completo es el 100 %.', 'Las partes que ya conoces ocupan su pedazo de la barra.', 'Lo que falta es el resto: $100 - 40 - 25 = 35\\,\\%$.'],
  },
  'porcentaje-por-pedazos': {
    title: 'Un porcentaje por pedazos',
    scene: { type: 'barra', bars: [
      { label: '40 personas', b: 0, segs: [{ w: 1, t: '100 %  →  40', c: 'a' }] },
      { label: 'la décima parte', b: 1, segs: [{ w: .1, t: '4', c: 'g' }, { w: .1, t: '4', c: 'g' }, { w: .1, t: '4', c: 'g' }, { w: .05, t: '2', c: 'f', b: 2 }] },
      { label: '30 % + 5 %', b: 3, segs: [{ w: .35, t: '35 %  →  14', c: 'ok' }] },
    ] },
    beats: ['El 100 % son las 40 personas.', 'El 10 % es la décima parte: 4. Tres pedazos de esos son el 30 %.', 'El 5 % es la mitad del 10 %: 2 personas.', '$35\\,\\% = 30\\,\\% + 5\\,\\%$: $12 + 2 = 14$ personas.'],
  },
  'area-por-resta': {
    title: 'Un área por resta',
    scene: { type: 'figura', shapes: [
      { k: 'rect', at: [110, 18], w: 100, h: 100, c: 'a', fill: 'a', b: 0 },
      { k: 'text', t: '12 · 12 = 144', at: [160, 136], c: 'a', s: 12, b: 0 },
      { k: 'circle', at: [160, 68], r: 33, c: 'g', fill: 'g', k2: 40, b: 1 },
      { k: 'text', t: '16π', at: [160, 73], c: 'ink', s: 13, b: 1 },
      { k: 'text', t: 'pasto = 144 − 16π', at: [160, 160], c: 'ok', s: 14, b: 2 },
    ] },
    beats: ['El jardín completo es un cuadrado: lado por lado.', 'La fuente es un círculo: $\\pi$ por el radio al cuadrado.', 'Lo sombreado no tiene fórmula propia: es el todo menos lo de adentro.'],
  },
  'orden-ancla': {
    title: 'Primero el dato fijo',
    scene: { type: 'tabla', hw: 8, cols: ['1.º', '2.º', '3.º', '4.º', '5.º'], rows: [''],
      cells: [[{ t: 'G', b: 2 }, { t: 'H', b: 2 }, { t: 'F', b: 0 }, '', '']],
      hl: [{ r: 0, c: 2, col: 'a', b: 0 }, { r: 0, c: 0, cs: 2, col: 'g', b: 1 }, { r: 0, c: 3, cs: 2, col: 'g', b: 1 }, { r: 0, c: 0, cs: 2, col: 'ok', b: 2 }],
      foot: { t: 'una sola opción sobrevive', b: 2 } },
    beats: ['Empieza por quien tiene puesto seguro: ese dato no se mueve.', 'Una pareja «justo después» ocupa dos casillas seguidas: mira dónde cabe.', 'Las pistas negativas tachan opciones hasta dejar una sola.'],
  },
  'razon-en-partes': {
    title: 'Una razón son partes iguales',
    scene: { type: 'barra', bars: [
      { label: 'razón 1 : 3 : 4', b: 0, segs: [{ w: 1 / 8, t: '1', c: 'a' }, { w: 3 / 8, t: '3', c: 'g' }, { w: 4 / 8, t: '4', c: 'f' }] },
      { label: '8 partes iguales de 60', b: 1, segs: [1, 2, 3, 4, 5, 6, 7, 8].map(() => ({ w: 1 / 8, t: '60', c: 'mute', dim: 1 })) },
      { label: 'cada cantidad', b: 2, segs: [{ w: 1 / 8, t: '60', c: 'a' }, { w: 3 / 8, t: '180', c: 'g' }, { w: 4 / 8, t: '240', c: 'f' }] },
    ] },
    beats: ['Una razón $1 : 3 : 4$ corta el total en $1 + 3 + 4 = 8$ partes iguales.', 'Cada parte vale el total entre 8: $480 \\div 8 = 60$.', 'Cada cantidad es su número de partes: 60, 180 y 240.'],
  },
  'aumento-como-factor': {
    title: 'Un aumento es un factor',
    scene: { type: 'barra', bars: [
      { label: 'antes', b: 0, segs: [{ w: .64, t: '100 %', c: 'a' }] },
      { label: 'se le suma su cuarta parte', b: 1, segs: [{ w: .64, t: '100 %', c: 'a' }, { w: .16, t: '+25 %', c: 'g' }] },
      { label: 'después', b: 2, segs: [{ w: .8, t: '125 %  →  × 1.25', c: 'ok' }] },
    ] },
    beats: ['El valor de antes es siempre el 100 %.', 'Aumentar un 25 % es agregarle su cuarta parte.', 'Queda el 125 %: multiplicar por 1.25. Un descuento del 25 % sería por 0.75.'],
  },
  'cambios-en-cadena': {
    title: 'Dos cambios seguidos',
    scene: { type: 'barra', bars: [
      { label: 'precio inicial', b: 0, segs: [{ w: .66, t: '100', c: 'a' }] },
      { label: 'sube el 20 % de 100', b: 1, segs: [{ w: .792, t: '120', c: 'g' }] },
      { label: 'baja el 20 % de 120', b: 2, segs: [{ w: .634, t: '96', c: 'ok' }, { w: .158, t: '−24', c: 'bad', dim: 1 }] },
    ] },
    beats: ['Empieza con 100: así los porcentajes se leen directo.', 'El aumento del 20 % se calcula sobre 100: sube a 120.', 'El descuento del 20 % se calcula sobre 120: baja 24, no 20. Queda en 96.'],
  },
  'inversa-constante': {
    title: 'Obreros por días no cambia',
    scene: { type: 'pasos', lines: ['6 obreros · 20 días = 120', 'menos días  →  más obreros', '120 ÷ 12 días = 10 obreros'] },
    beats: ['El trabajo que falta se mide en obreros por días: ese producto no cambia.', 'Si el plazo se acorta, el mismo trabajo se reparte entre más obreros.', 'Divide el trabajo entre los días que quedan.'],
  },
  'alcance': {
    title: 'Alcanzar es cerrar la ventaja',
    scene: { type: 'recta', min: 0, max: 270, ticks: [0, 90, 180, 270],
      dots: [{ v: 0, t: 'carro', c: 'a', b: 0 }, { v: 90, t: 'bus', c: 'g', b: 0 }, { v: 270, t: 'km 270', c: 'ok', b: 2 }],
      hops: [{ from: 0, to: 90, t: 'carro +90', c: 'a', b: 1 }, { from: 90, to: 150, t: 'bus +60', c: 'g', b: 1 }] },
    beats: ['Cuando el carro arranca, el bus ya lleva 90 km de ventaja.', 'Cada hora el carro avanza 90 y el bus 60: la ventaja se achica 30 km.', 'La ventaja de 90 se acaba en $90 \\div 30 = 3$ horas, en el kilómetro 270.'],
  },
  'trabajo-por-hora': {
    title: 'Se suma lo que hacen por hora',
    scene: { type: 'barra', bars: [
      { label: 'el muro completo', b: 0, segs: [{ w: 1, t: '1 muro', c: 'mute', dim: 1 }] },
      { label: 'en una hora', b: 1, segs: [{ w: 1 / 5, t: 'Ana', c: 'a' }, { w: 1 / 20, t: '', c: 'g' }, { w: 3 / 4, t: '', c: 'mute', dim: 1 }] },
      { label: 'juntos', b: 2, segs: [{ w: 1 / 4, t: '1/4 por hora', c: 'ok' }] },
    ] },
    beats: ['No se suman los tiempos: se suma lo que hace cada uno en una hora.', 'Si Ana tarda 5 horas y Beto 20, en una hora Ana pinta $\\tfrac15$ y Beto $\\tfrac{1}{20}$.', 'Juntos pintan $\\tfrac15 + \\tfrac{1}{20} = \\tfrac14$ del muro cada hora: 4 horas.'],
  },
  'deshacer-porcentaje': {
    title: 'Deshacer un porcentaje',
    scene: { type: 'pasos', lines: ['precio · 0.70 = 70', 'se deshace dividiendo', '70 ÷ 0.70 = 100'] },
    beats: ['Quitar el 30 % fue multiplicar el precio por 0.70.', 'Para volver atrás se hace la operación contraria: dividir entre el mismo factor.', 'Sumarle el 30 % al precio final no sirve: ese 30 % era de otro número.'],
  },
  'casillas-multiplican': {
    title: 'Las casillas se multiplican',
    scene: { type: 'arbol', levels: [{ n: 2, b: 0, name: '1.ª casilla' }, { n: 3, b: 1, name: '2.ª casilla' }], foot: { t: '2 · 3 = 6', b: 2 } },
    beats: ['Cada casilla abre tantas ramas como opciones tiene.', 'La casilla siguiente abre sus opciones desde cada rama.', 'Por eso las opciones de cada casilla se multiplican.'],
  },
  'complemento': {
    title: 'Al menos uno, por resta',
    scene: { type: 'barra', bars: [
      { label: 'todos los casos', b: 0, segs: [{ w: 1, t: 'todos', c: 'a' }] },
      { label: 'los que NO sirven', b: 1, segs: [{ w: .3, t: 'ninguno', c: 'bad' }, { w: .7, t: '', c: 'mute', dim: 1 }] },
      { label: 'los que sirven', b: 2, segs: [{ w: .3, t: '', c: 'mute', dim: 1 }, { w: .7, t: 'todos − ninguno', c: 'ok' }] },
    ] },
    beats: ['Contar «al menos uno» caso por caso es largo: hay muchos casos.', 'Lo contrario es un solo caso fácil: «ninguno».', 'Al menos uno = todos menos ninguno.'],
  },
  'repetidas-dividen': {
    title: 'Las letras repetidas dividen',
    scene: { type: 'pasos', lines: ['A₁ A₂  =  A₂ A₁', 'cada palabra se contó 2! veces', 'n! ÷ repeticiones'] },
    beats: ['Si las letras repetidas fueran distintas, cada palabra saldría varias veces.', 'Dos letras iguales se cambian entre sí de $2!$ maneras sin que la palabra cambie.', 'Por eso se divide $n!$ entre el factorial de cada repetición.'],
  },
  'orden-no-importa': {
    title: 'Cuando el orden no importa',
    scene: { type: 'pasos', lines: [{ t: 'A B C    A C B    B A C', s: 14 }, { t: 'B C A    C A B    C B A', s: 14 }, '6 filas  =  1 comité', 'se divide entre 3! = 6'] },
    beats: ['Con orden, un mismo grupo aparece varias veces.', 'Tres personas se pueden ordenar de $3! = 6$ maneras.', 'Las seis filas son un solo comité.', 'Sin orden: los ordenamientos se dividen entre 6.'],
  },
  'cubo-pintado': {
    title: 'El cubo pintado, por posición',
    scene: { type: 'tabla', hw: 52, cols: ['3 caras', '2 caras', '1 cara', 'ninguna'], rows: ['dónde', 'cuántos'],
      cells: [[{ t: 'esquina', b: 0 }, { t: 'arista', b: 1 }, { t: 'centro', b: 2 }, { t: 'adentro', b: 3 }], [{ t: '8', b: 0 }, { t: '24', b: 1 }, { t: '24', b: 2 }, { t: '8', b: 3 }]],
      hl: [{ r: 0, c: 0, rs: 2, col: 'a', b: 0 }, { r: 0, c: 1, rs: 2, col: 'g', b: 1 }, { r: 0, c: 2, rs: 2, col: 'f', b: 2 }, { r: 0, c: 3, rs: 2, col: 'ok', b: 3 }] },
    beats: ['Las esquinas tocan tres caras del cubo: siempre son 8.', 'En cada arista, sin contar las esquinas, quedan cubitos con dos caras pintadas.', 'En el centro de cada cara están los de una sola cara pintada.', 'Adentro queda un cubo más pequeño, sin nada de pintura.'],
  },
  'ciclo-residuo': {
    title: 'En un ciclo manda el residuo',
    scene: { type: 'ciclo', items: ['3', '9', '7', '1'], marks: [{ i: 1, b: 2, c: 'ok' }], center: { t: 'ciclo de 4', b: 1 }, foot: { t: '50 = 4 · 12 + 2', b: 2 } },
    beats: ['Las últimas cifras de $3^1, 3^2, 3^3, 3^4$ son 3, 9, 7 y 1, y se repiten.', 'El ciclo tiene 4 cifras: cada 4 potencias se vuelve al comienzo.', 'El residuo de dividir el exponente entre 4 dice el lugar: residuo 2, la segunda cifra.'],
  },
  'cesar': {
    title: 'La clave es el salto',
    scene: { type: 'pasos', lines: ['S  →  V', 'O  →  R', 'cada letra avanza 3', 'descifrar: retroceder 3'] },
    beats: ['Compara una letra con su versión cifrada.', 'Todas las letras se mueven lo mismo.', 'Ese número de puestos es la clave.', 'Para leer el mensaje, cada letra se devuelve los mismos puestos.'],
  },
  'cambio-porcentual': {
    title: 'El cambio, sobre el valor de antes',
    scene: { type: 'pasos', lines: ['cambio = después − antes', 'se compara con el de antes', '10 ÷ 100 = 10 %'] },
    beats: ['Primero se halla cuánto cambió la cantidad.', 'Ese cambio se compara siempre con el valor de antes, que es el 100 %.', 'Diez ciclistas más sobre cien que había: un aumento del 10 %.'],
  },
  'proporcion-no-cantidad': {
    title: 'Más cantidad no es más proporción',
    scene: { type: 'barra', bars: [
      { label: 'antes: 100 de 400', b: 0, segs: [{ w: .2, t: '25 %', c: 'a' }, { w: .6, t: '', c: 'mute', dim: 1 }] },
      { label: 'ahora: 110 de 500', b: 1, segs: [{ w: .22, t: '22 %', c: 'g' }, { w: .78, t: '', c: 'mute', dim: 1 }] },
      { label: 'la parte creció menos que el todo', b: 2, segs: [{ w: .25, t: '25 %', c: 'a' }, { w: .22, t: '22 %', c: 'g' }] },
    ] },
    beats: ['Antes, 100 de 400 estudiantes: la cuarta parte del colegio.', 'Ahora hay más ciclistas, pero el colegio creció más: 110 de 500.', 'La cantidad subió y la proporción bajó: son dos preguntas distintas.'],
  },
  'suponer': {
    title: 'Suponer y buscar el choque',
    scene: { type: 'pasos', lines: [{ t: 'supón: N dice la verdad', s: 14 }, { t: '→  L y M dicen la verdad', s: 14 }, { t: '→  M afirma: «N miente»', s: 14 }, 'contradicción: N miente'] },
    beats: ['Escoge a alguien y supón que dice la verdad.', 'Saca todo lo que se sigue de esa suposición.', 'Si aparece algo que choca con lo supuesto, hay una contradicción.', 'Una suposición que lleva a contradicción se descarta: era falsa.'],
  },
  'operador-receta': {
    title: 'Un operador es una receta',
    scene: { type: 'pasos', lines: [{ t: 'a ★ b = 3a − b', s: 15 }, { t: '2 ★ 1 = 3·2 − 1 = 5', s: 15 }, { t: '(2 ★ 1) ★ 4 = 5 ★ 4', s: 15 }, '5 ★ 4 = 3·5 − 4 = 11'] },
    beats: ['El operador es una receta: el triple del primero menos el segundo.', 'Se reemplaza cada letra por el número que ocupa su lugar.', 'Con paréntesis, el resultado de adentro pasa a ser el primer número.', 'Se aplica la receta otra vez con los números nuevos.'],
  },
  'fraccion-del-resto': {
    title: 'Una fracción de lo que queda',
    scene: { type: 'barra', bars: [
      { label: 'la prima completa', b: 0, segs: [{ w: 1, t: '1', c: 'a' }] },
      { label: 'gasta 1/5 del total', b: 1, segs: [{ w: 1 / 5, t: '1/5', c: 'bad', dim: 1 }, { w: 4 / 5, t: 'queda 4/5', c: 'a' }] },
      { label: 'gasta 1/2 de lo que queda', b: 2, segs: [{ w: 1 / 5, t: '', c: 'mute', dim: 1 }, { w: 2 / 5, t: '1/2 del resto', c: 'bad', dim: 1 }, { w: 2 / 5, t: '2/5', c: 'ok' }] },
    ] },
    beats: ['La barra completa es la prima.', 'El primer gasto se quita del total: quedan $\\tfrac45$.', 'El segundo gasto es una fracción de lo que queda, no del total: sobrevive $\\tfrac12$ de $\\tfrac45$, que es $\\tfrac25$.'],
  },
  'promedio-suma': {
    title: 'Todo promedio esconde una suma',
    scene: { type: 'pasos', lines: ['promedio · cantidad = suma', '3.7 · 5 = 18.5', 'falta: 18.5 − 14 = 4.5'] },
    beats: ['Todo promedio esconde una suma: el promedio por la cantidad de datos.', 'Para el promedio que se quiere, calcula la suma que hace falta.', 'El dato que falta es esa suma menos lo que ya se lleva.'],
  },
  'peor-caso': {
    title: 'Gánale a la peor suerte',
    scene: { type: 'pasos', lines: [{ t: 'peor suerte: roja, azul, verde', s: 14 }, { t: 'la siguiente repite color', s: 14 }, '3 + 1 = 4'] },
    beats: ['Imagina la peor suerte posible: cada bola sale de un color distinto.', 'Cuando ya salió una de cada color, la siguiente tiene que repetir.', 'Para estar seguros: el peor caso y una más.'],
  },
  'todo-con-una-x': {
    title: 'Todo con una sola x',
    scene: { type: 'barra', bars: [
      { label: 'Lina', b: 0, segs: [{ w: .3, t: 'x', c: 'a' }] },
      { label: 'Sara: 4 más', b: 1, segs: [{ w: .3, t: 'x', c: 'a' }, { w: .12, t: '4', c: 'g' }] },
      { label: 'Eva: el doble', b: 2, segs: [{ w: .3, t: 'x', c: 'a' }, { w: .3, t: 'x', c: 'a' }] },
    ] },
    beats: ['Elige como $x$ la cantidad de la que dependen las demás: la edad de Lina.', 'Sara tiene 4 más: su barra es $x + 4$.', 'Eva tiene el doble: $2x$. Las tres barras juntas suman 48.'],
  },
  'edades-tiempo': {
    title: 'Edades: hoy y después',
    scene: { type: 'tabla', hw: 52, cols: ['hoy', 'después'], rows: ['hijo', 'madre'],
      cells: [[{ t: 'x', b: 0 }, { t: 'x + 12', b: 1 }], [{ t: '3x', b: 0 }, { t: '3x + 12', b: 1 }]],
      hl: [{ r: 0, c: 1, rs: 2, col: 'ok', b: 2 }], foot: { t: '3x + 12 = 2(x + 12)', b: 2 } },
    beats: ['Hoy: el hijo tiene $x$ años y la madre, el triple.', 'El tiempo pasa igual para los dos: a cada edad se le suman 12.', 'La condición del futuro se escribe con las edades del futuro.'],
  },
  'mezcla-valor': {
    title: 'En una mezcla se suman valores',
    scene: { type: 'pasos', lines: ['valor = kilos · precio', { t: '12x + 8(20 − x) = 9 · 20', s: 15 }, 'se suman valores, no precios'] },
    beats: ['Cada café aporta su valor: sus kilos por su precio.', 'El valor de la mezcla es la suma de los dos valores.', 'Nunca se promedian los precios sin mirar los kilos de cada uno.'],
  },
  'eliminar': {
    title: 'Restar para eliminar',
    scene: { type: 'pasos', lines: ['3 panes + 2 jugos = 12', '1 pan + 2 jugos = 8', 'se restan: 2 panes = 4'] },
    beats: ['Dos recibos con las mismas cosas, en cantidades distintas.', 'Los dos recibos tienen la misma cantidad de jugos.', 'Al restar los recibos, los jugos desaparecen y queda una sola incógnita.'],
  },
  'venn-dos': {
    title: 'Una encuesta en dos círculos',
    scene: { type: 'venn', a: 'prensa', b: 'televisión', regs: { out: { t: '20', b: 0, c: 'mute' }, ab: { t: '15', b: 1, c: 'ok' }, a: { t: '30', b: 2 }, b: { t: '15', b: 2 } } },
    beats: ['Los 20 que no hacen nada quedan fuera de los dos círculos: adentro hay 60.', 'Las listas suman $45 + 30 = 75$. Sobran 15: están en los dos círculos.', 'Lo que queda de cada lista va en su zona de «solo»: 30 y 15.'],
  },
  'mcm-coincidir': {
    title: 'Coincidir es buscar el MCM',
    scene: { type: 'recta', min: 0, max: 24, ticks: [0, 8, 12, 16, 24],
      hops: [{ from: 0, to: 8, c: 'a', b: 0 }, { from: 8, to: 16, c: 'a', b: 0 }, { from: 16, to: 24, c: 'a', b: 0 }, { from: 0, to: 12, c: 'g', b: 1, down: true }, { from: 12, to: 24, c: 'g', b: 1, down: true }],
      dots: [{ v: 24, t: 'coinciden', c: 'ok', b: 2 }] },
    beats: ['Un faro destella cada 8 segundos: 8, 16, 24…', 'El otro, cada 12 segundos: 12, 24…', 'El primer instante que está en las dos listas es el mínimo común múltiplo: 24.'],
  },
  'contar-contrario': {
    title: 'Contar lo contrario',
    scene: { type: 'pasos', lines: [{ t: 'todos los resultados, igual de probables', s: 13 }, { t: 'si lo contrario es más corto, cuéntalo', s: 13 }, 'P = 1 − P(lo contrario)'] },
    beats: ['Primero el total de resultados, todos igual de probables.', 'A veces lo que NO sirve es una lista mucho más corta.', 'La probabilidad buscada es 1 menos la de lo contrario.'],
  },
  'no-contar-dos': {
    title: 'Con «o», no cuentes dos veces',
    scene: { type: 'venn', a: 'dobles', b: 'suma 6', regs: { a: { t: '5', b: 0 }, b: { t: '4', b: 0 }, ab: { t: '1', b: 1, c: 'ok' }, out: { t: '26', b: 2, c: 'mute' } } },
    beats: ['Con dos dados, «dobles» tiene 6 resultados y «suma 6» tiene 5.', 'El (3, 3) está en las dos listas: se cuenta una sola vez.', 'La unión tiene $6 + 5 - 1 = 10$ resultados: $P = \\tfrac{10}{36}$.'],
  },
  'arbol-multiplica': {
    title: 'En el árbol: por y más',
    scene: { type: 'arbol', levels: [{ n: 2, b: 0, labels: ['R', 'A'], name: '1.ª' }, { n: 2, b: 1, labels: ['R', 'A'], name: '2.ª' }], foot: { t: '× en el camino, + entre caminos', b: 2 } },
    beats: ['Cada extracción abre ramas, cada una con su probabilidad.', 'A lo largo de un camino, las probabilidades se multiplican.', 'Si sirven varios caminos, sus resultados se suman.'],
  },
};
if (typeof CONCEPTOS !== 'undefined') Object.assign(CONCEPTOS, CONCEPTOS_PU);

GYM_RETOS.push(
  {
    id: 'gym-transporte', after: ['pu-cm-2', 'pu-cm-3'], level: 2,
    title: 'Cómo llega el curso', strategy: 'Todo a porcentaje y después la cantidad',
    problem: 'En un curso de 40 estudiantes, $\\tfrac25$ llegan a pie, el 25 % llega en bus y el resto en bicicleta. ¿Cuántos estudiantes llegan en bicicleta?',
    steps: [
      { title: 'Pasa la fracción a porcentaje', concept: 'fraccion-a-porcentaje',
        coach: 'Los datos vienen en dos idiomas: una fracción y un porcentaje. Para juntarlos, pásalos al mismo. Pinta en la cuadrícula los que llegan a pie.',
        ex: play('cuadricula-cien', 'Pinta la parte del curso que llega a pie', { rounds: [{ ask: '2/5', count: 40 }] },
          '$\\tfrac25 = \\tfrac{40}{100}$: el 40 % del curso llega a pie.', { hint: 'La cuadrícula tiene 100 casillas: ¿cuánto vale un quinto de 100?' }),
        hints: ['Parte las 100 casillas en 5 grupos iguales: cada quinto son 20 casillas.', 'Dos quintos son dos de esos grupos: 40 casillas.'],
        note: 'A pie: 2/5 = 40 %' },
      { title: 'Halla el resto del 100 %', concept: 'lo-que-queda-de-cien',
        coach: 'Ahora todo está en porcentaje. El curso completo es el 100 %: quita lo que ya conoces y lo que queda es la bicicleta.',
        ex: play('estira-barra', 'Deja en la barra solo la parte de la bicicleta', { max: 200, rounds: [{ base: 100, text: 'Lo que queda del 100 % al quitar 40 % y 25 %', pct: 35 }] },
          '$100 - 40 - 25 = 35$: el 35 % llega en bicicleta.', { hint: 'Suma primero lo que ya conoces y quítalo del 100 %.' }),
        hints: ['A pie y en bus suman 40 % + 25 %. ¿Cuánto falta para el 100 %?', 'Juntos son el 65 %. Encoge la barra hasta el 35 %.'],
        note: 'Bicicleta: 100 % − 40 % − 25 % = 35 %' },
      { title: 'Del porcentaje a la cantidad', concept: 'porcentaje-por-pedazos',
        coach: 'Falta lo que pregunta el problema: cuántos estudiantes. Arma el 35 % con pedazos fáciles: el 10 % y su mitad.',
        ex: play('pinta-personas', 'Pinta a los que llegan en bicicleta', { rounds: [{ total: 40, pct: 35, what: 'llegan en bicicleta' }] },
          'El 10 % de 40 es 4; el 30 % son 12 y el 5 % son 2. En total, 14.', { hint: 'Halla el 10 % del curso y arma con él el 35 %.' }),
        hints: ['El 10 % de 40 es 4 estudiantes. ¿Cuántos son el 30 %? ¿Y el 5 %?', 'El 30 % son 12 y el 5 % son 2: pinta 14.'],
        note: '35 % de 40: 12 + 2 = 14 estudiantes' },
    ],
    answer: 'Llegan en bicicleta 14 estudiantes.',
    wrap: 'Cuando un problema mezcla fracciones y porcentajes, pásalos todos a porcentaje, halla el que falta como el resto del 100 % y solo al final conviértelo en cantidad.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-jardin', after: ['pu-ge-4', 'pu-ge-5'], level: 2,
    title: 'El pasto del jardín', strategy: 'El todo menos lo de adentro',
    problem: 'Un jardín cuadrado de 12 m de lado tiene en el centro una fuente circular de 4 m de radio. En el resto se siembra pasto, que cuesta 5 000 pesos por metro cuadrado. Con $\\pi \\approx 3$, ¿cuánto cuesta sembrar el pasto?',
    steps: [
      { title: 'Lo grande menos lo de adentro', concept: 'area-por-resta',
        coach: 'El pasto no tiene una fórmula propia: es el cuadrado completo menos el círculo de la fuente. Arma esa resta en la figura.',
        ex: play('sombreado-resta', 'Halla el área del pasto', { rounds: [{ s: 12, kind: 'circ', target: [144, 16] }] },
          'El cuadrado mide $12 \\cdot 12 = 144$ y la fuente $\\pi \\cdot 4^2 = 16\\pi$: el pasto ocupa $144 - 16\\pi$ m².', { hint: 'Los dos datos que necesitas son el lado del jardín y el radio de la fuente.' }),
        hints: ['El área del cuadrado es lado por lado. La de la fuente es $\\pi$ por el radio al cuadrado.', 'Cuadrado: $12 \\cdot 12$. Fuente: $\\pi \\cdot 4^2$. Lo sombreado es la resta.'],
        note: 'Pasto: cuadrado menos fuente, 144 − 16π m²' },
      { title: 'Pasa a números y cobra',
        coach: 'Ya tienes el área con $\\pi$. Ahora reemplaza $\\pi$ por el valor que da el problema y multiplica por el precio de cada metro cuadrado.',
        ex: play('completa-solucion', 'Completa la cuenta del pasto', { q: 'El pasto ocupa $144 - 16\\pi$ m² y cada metro cuadrado cuesta 5 000 pesos. Con $\\pi \\approx 3$, ¿cuánto cuesta sembrarlo?',
          lines: ['La fuente mide $16 \\cdot 3 =$ [[48]] m²', 'El pasto ocupa $144 - 48 =$ [[96]] m²', 'Costo: $96 \\cdot 5\\,000 =$ [[480 000]] pesos'], extra: ['720 000', '192', '240 000'] },
          'Con $\\pi \\approx 3$ la fuente mide 48 m² y el pasto 96 m². A 5 000 pesos el metro, cuesta 480 000 pesos.', { hint: 'Primero el área de la fuente en números, después la resta y al final el precio.' }),
        hints: ['Reemplaza $\\pi$ por 3 solo en la parte de la fuente y después resta.', 'La fuente son 48 m². Resta eso del jardín completo y multiplica por el precio.'],
        note: 'Costo: 96 · 5 000 = 480 000 pesos' },
    ],
    answer: 'Sembrar el pasto cuesta 480 000 pesos.',
    wrap: 'Cuando una región no tiene fórmula propia, búscala como una resta: la figura grande menos lo que se le quita. Deja $\\pi$ como letra hasta el final y reemplázala una sola vez.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-podio', after: ['pu-or-1', 'pu-or-4'], level: 2,
    title: 'La carrera sin empates', strategy: 'Dato fijo, pareja pegada y descarte',
    problem: 'Dario, Elena, Felipe, Gloria y Hernán corrieron una carrera sin empates. Felipe llegó tercero. Hernán llegó justo después de Gloria. Elena llegó antes que Dario. Hernán no fue el último. ¿Quién ganó la carrera y quién llegó de último?',
    steps: [
      { title: 'Ubica el dato fijo y la pareja', concept: 'orden-ancla',
        coach: 'No pruebes todos los órdenes: son demasiados. Empieza por quien tiene puesto seguro y mira en qué casillas cabe la pareja que llegó seguida.',
        ex: play('completa-solucion', 'Completa el razonamiento', { q: 'Felipe llegó tercero, Hernán llegó justo después de Gloria y Hernán no fue el último. ¿Qué puestos ocupan Gloria y Hernán?',
          lines: ['Felipe ocupa el puesto [[3]]: quedan libres 1, 2, 4 y 5', 'Gloria y Hernán van seguidos: caben en 1 y 2, o en 4 y [[5]]', 'Como Hernán no fue el último, Gloria y Hernán ocupan los puestos 1 y [[2]]'], extra: ['4', '6'] },
          'Con Felipe en el centro, una pareja seguida solo cabe adelante o atrás. Atrás, Hernán sería el último: van adelante.', { hint: 'Dibuja cinco casillas y marca primero la de Felipe.' }),
        hints: ['Con el centro ocupado, dos puestos seguidos solo quedan al comienzo o al final de la fila.', 'Si la pareja fuera al final, Hernán llegaría de último, y eso no puede ser.'],
        note: 'Felipe en el centro; Gloria y Hernán seguidos y adelante' },
      { title: 'Acomoda a todos',
        coach: 'Con la pareja adelante quedan dos casillas atrás para dos personas. La pista que falta dice quién va primero de esas dos.',
        ex: play('carrera-llegada', 'Arma el orden de llegada', { rounds: [{ names: ['Dario', 'Elena', 'Felipe', 'Gloria', 'Hernán'], clues: [
          { t: 'at', a: 'Felipe', i: 2, say: 'Felipe llegó tercero' }, { t: 'justBefore', a: 'Gloria', b: 'Hernán', say: 'Hernán llegó justo después de Gloria' },
          { t: 'before', a: 'Elena', b: 'Dario', say: 'Elena llegó antes que Dario' }, { t: 'notAt', a: 'Hernán', i: 4, say: 'Hernán no fue el último' }] }] },
          'Gloria, Hernán, Felipe, Elena y Dario: cada pista se cumple y no hay otro orden posible.', { hint: 'Pon primero a Felipe y a la pareja; después usa la pista de Elena y Dario.' }),
        hints: ['Atrás quedan dos puestos para Elena y Dario. ¿Cuál de los dos llegó antes?', 'Elena va antes que Dario: ella es cuarta y él quinto.'],
        note: 'Orden de llegada: Gloria, Hernán, Felipe, Elena, Dario' },
    ],
    answer: 'Ganó Gloria y Dario llegó de último.',
    wrap: 'En un acertijo de orden: primero el dato que fija un puesto, después las parejas que van pegadas (ocupan dos casillas seguidas) y al final las pistas negativas, que descartan. Así casi nunca hay que probar todos los casos.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-cubo', after: ['pu-es-2'], level: 2,
    title: 'El cubo pintado de rojo', strategy: 'Clasificar por posición y comprobar con el total',
    problem: 'Un cubo de madera de 4 cm de arista se pinta de rojo por fuera y luego se corta en cubitos de 1 cm de arista. ¿Cuántos cubitos tienen pintura en exactamente dos caras? ¿Cuántos no tienen pintura?',
    steps: [
      { title: 'Clasifica por posición', concept: 'cubo-pintado',
        coach: 'No cuentes cubito por cubito. Cada cubito queda en una de cuatro posiciones: esquina, arista, centro de cara o interior. La posición dice cuántas caras pintadas tiene.',
        ex: play('cubo-pintado', 'Clasifica los cubitos del cubo de 4', { rounds: [{ n: 4 }] },
          'Las aristas (sin las esquinas) dan los de dos caras: $12 \\cdot 2 = 24$. Adentro queda un cubo de arista 2: $2^3 = 8$ sin pintura.', { hint: 'Fíjate en dónde está el cubito: de eso depende cuántas caras le quedaron pintadas.' }),
        hints: ['Un cubito de esquina toca tres caras del cubo grande; uno de arista, dos; uno del centro de una cara, una sola.', 'Cada arista tiene 4 cubitos: quita los 2 de las esquinas. Adentro, la arista se acorta 2 cm.'],
        note: 'Dos caras: los 24 de las aristas. Sin pintura: los del cubo de adentro, 8' },
      { title: 'Comprueba con el total',
        coach: 'Un buen cierre: sumar todas las clases y ver que dan el total de cubitos. Si no cuadra, alguna clase quedó mal contada.',
        ex: play('completa-solucion', 'Completa la comprobación', { q: 'El cubo de 4 cm se cortó en cubitos de 1 cm. Cuenta cada clase de cubito y comprueba que entre todas completan el cubo.',
          lines: ['Esquinas, con 3 caras pintadas: [[8]]', 'Aristas sin esquinas, con 2 caras: $12 \\cdot 2 =$ [[24]]', 'Centros de las caras, con 1 cara: $6 \\cdot 4 =$ [[24]]', 'Adentro, sin pintura: $2^3 =$ [[8]]. Entre todos suman [[64]], que es $4^3$'], extra: ['12', '16', '27'] },
          '$8 + 24 + 24 + 8 = 64 = 4^3$: no sobra ni falta ningún cubito.', { hint: 'Usa los números del cubo: cuántas esquinas, cuántas aristas y cuántas caras tiene.' }),
        hints: ['Un cubo tiene 8 esquinas, 12 aristas y 6 caras. En cada arista, quita los dos cubitos de las esquinas.', 'En cada cara, los de una sola cara pintada forman un cuadrado de $2 \\times 2$.'],
        note: 'Comprobación: 8 + 24 + 24 + 8 = 64 cubitos' },
    ],
    answer: 'Hay 24 cubitos con dos caras pintadas y 8 sin pintura.',
    wrap: 'En los problemas de cubos pintados no se cuenta de a uno: se clasifica por posición (esquinas, aristas, centros de cara e interior) y se comprueba que las clases sumen el total, $n^3$.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-potencias', after: ['pu-se-3'], level: 3,
    title: 'La última cifra de una suma enorme', strategy: 'Buscar el ciclo y usar el residuo',
    problem: '¿En qué cifra termina el número $3^{50} + 7^{50}$?',
    steps: [
      { title: 'El ciclo del 3', concept: 'ciclo-residuo',
        coach: 'Nadie calcula ese número: es enorme. Pero sus últimas cifras se repiten en un ciclo corto. Encuentra el ciclo y mira en qué lugar cae el exponente.',
        ex: play('ultima-cifra', 'Halla la última cifra de la primera potencia', { rounds: [{ a: 3, n: 50 }] },
          'Las últimas cifras del 3 son 3, 9, 7, 1. Como $50 = 4 \\cdot 12 + 2$, es la segunda del ciclo: 9.', { hint: 'Divide el exponente entre el largo del ciclo: el residuo dice el lugar.' }),
        hints: ['Escribe las últimas cifras de las primeras potencias hasta que alguna se repita.', 'El ciclo es 3, 9, 7, 1. Divide 50 entre 4 y mira el residuo.'],
        note: 'Última cifra de 3⁵⁰ = 9' },
      { title: 'El ciclo del 7',
        coach: 'Repite la idea con la otra base: su ciclo tiene otras cifras, pero el mismo largo.',
        ex: play('ultima-cifra', 'Halla la última cifra de la segunda potencia', { rounds: [{ a: 7, n: 50 }] },
          'Las últimas cifras del 7 son 7, 9, 3, 1. Con residuo 2 es la segunda: 9.', { hint: 'Busca el ciclo de las últimas cifras del 7.' }),
        hints: ['El ciclo del 7 también tiene cuatro cifras. Halla el residuo del exponente al dividirlo entre el largo del ciclo.', 'El ciclo es 7, 9, 3, 1 y el residuo es el mismo de antes.'],
        note: 'Última cifra de 7⁵⁰ = 9' },
      { title: 'Suma solo las unidades',
        coach: 'La última cifra de una suma depende solo de las últimas cifras de los sumandos. Súmalas y quédate con las unidades.',
        ex: play('completa-solucion', 'Completa el cierre', { q: 'El número $3^{50}$ termina en 9 y el número $7^{50}$ también termina en 9. ¿En qué cifra termina su suma?',
          lines: ['Las unidades de los sumandos son [[9]] y [[9]]', 'Esas unidades suman [[18]]', 'La suma termina en [[8]]: la decena que sobra no cambia las unidades'], extra: ['6', '0', '81'] },
          '$9 + 9 = 18$: la suma termina en 8.', { hint: 'Suma las dos últimas cifras y mira en qué termina el resultado.' }),
        hints: ['Para saber en qué termina una suma basta sumar las unidades de cada número.', 'Las dos unidades son iguales. Súmalas y mira solo la cifra final.'],
        note: 'Unidades: 9 + 9 = 18, la suma termina en 8' },
    ],
    answer: 'El número termina en 8.',
    wrap: 'Las últimas cifras de las potencias se repiten en ciclos cortos. Con potencias enormes: halla el ciclo, divide el exponente entre su largo y usa el residuo. En sumas y productos solo cuentan las unidades.',
  },
  {
    id: 'gym-mensaje', after: ['pu-cd-1', 'pu-cd-2'], level: 2,
    title: 'El mensaje interceptado', strategy: 'Sacar la clave de un ejemplo y deshacerla',
    problem: 'Se interceptó un mensaje cifrado que dice FDVD. Se sabe que, con la misma clave, la palabra SOL se escribe VRO. ¿Qué dice el mensaje?',
    steps: [
      { title: 'Descubre la clave con el ejemplo', concept: 'cesar',
        coach: 'Un ejemplo resuelto es la llave: compara letra por letra la palabra y su versión cifrada y mira cuántos puestos se movió cada una.',
        ex: play('completa-solucion', 'Completa el razonamiento', { q: 'Con cierta clave, la palabra SOL se escribe VRO. ¿Cuál es la clave y cómo se descifra un mensaje?',
          lines: ['De la S a la V se avanza [[3]] letras; de la O a la R, lo mismo', 'Para descifrar se hace lo contrario: se [[retrocede]] esa cantidad', 'La F del mensaje viene de la [[C]]'], extra: ['avanza', '4', 'I'] },
          'S, T, U, V: tres puestos. Todas las letras se movieron igual, así que descifrar es retroceder tres.', { hint: 'Compara la primera letra de la palabra con la primera de su cifrado.' }),
        hints: ['Cuenta en el alfabeto los puestos que hay de la S a la V.', 'Son tres puestos hacia adelante. Para leer el mensaje hay que ir hacia atrás.'],
        note: 'Clave: cada letra avanzó tres puestos; para leer, se retrocede' },
      { title: 'Descifra el mensaje',
        coach: 'Con la clave en la mano, pon la rueda en la posición que deshace el salto y lee letra por letra.',
        ex: play('rueda-cesar', 'Gira la rueda y descifra', { rounds: [{ pair: ['SOL', 'VRO'], msg: 'FDVD' }] },
          'Retrocediendo tres puestos: F → C, D → A, V → S, D → A. El mensaje dice CASA.', { hint: 'Usa el ejemplo para ubicar la rueda y después lee el mensaje.' }),
        hints: ['Alinea la rueda para que la S quede frente a la V, como en el ejemplo.', 'Cada letra del mensaje se devuelve tres puestos: la F pasa a C.'],
        note: 'FDVD se descifra como CASA' },
    ],
    answer: 'El mensaje dice CASA.',
    wrap: 'En los problemas de códigos, la regla se saca de un ejemplo resuelto, se comprueba con todas sus letras y después se aplica al revés para descifrar.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-ciclistas', after: ['pu-gr-1', 'pu-gr-3'], level: 2,
    title: 'El anuncio del rector', strategy: 'Separar cantidad y proporción',
    problem: 'Un colegio pasó de 400 a 500 estudiantes, y los que llegan en bicicleta pasaron de 100 a 110. El rector anuncia: «cada vez más estudiantes prefieren la bicicleta». ¿En qué porcentaje aumentó el número de ciclistas? ¿Aumentó también su proporción en el colegio?',
    steps: [
      { title: 'Mide el cambio de la cantidad', concept: 'cambio-porcentual',
        coach: 'Primero mira la cantidad: cuántos ciclistas había y cuántos hay. El cambio se mide comparándolo con el valor de antes.',
        ex: play('variacion-barras', 'Halla la variación de los ciclistas', { rounds: [{ from: 100, to: 110, what: 'Ciclistas' }] },
          'Hay 10 ciclistas más sobre los 100 de antes: un aumento del 10 %.', { hint: 'Divide lo que cambió entre el valor de antes.' }),
        hints: ['El aumento son los ciclistas nuevos. Compáralos con los que había al comienzo, no con los de ahora.', 'Los ciclistas nuevos son la décima parte de los que había.'],
        note: 'Ciclistas: de 100 a 110, un aumento del 10 %' },
      { title: 'Compara las proporciones', concept: 'proporcion-no-cantidad',
        coach: 'Ahora mira la proporción: qué parte del colegio va en bicicleta antes y ahora. Si el total crece más rápido que la parte, la proporción baja.',
        ex: play('tabla-doble', 'Compara la proporción de antes con la de ahora', { rounds: [{ rows: [['antes', 100, 400], ['ahora', 110, 500]], what: 'llega en bicicleta' }] },
          'Antes: $100 \\div 400 = 25\\,\\%$. Ahora: $110 \\div 500 = 22\\,\\%$. La proporción bajó.', { hint: 'Compara las dos filas en porcentaje, no en cantidad.' }),
        hints: ['En cada fila, divide los ciclistas entre el total de estudiantes de ese momento.', 'Antes eran la cuarta parte del colegio. Ahora, 110 de 500 es un poco menos.'],
        note: 'Proporción de ciclistas: bajó (del 25 % al 22 %)' },
    ],
    answer: 'Los ciclistas aumentaron un 10 %, pero su proporción bajó del 25 % al 22 %.',
    wrap: 'Ante una afirmación sobre datos, separa dos preguntas: ¿cambió la cantidad? y ¿cambió la proporción? Cuando el total también cambia, las dos respuestas pueden ir en sentidos contrarios.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-testigos', after: ['pu-lo-5'], level: 3,
    title: 'Los tres testigos', strategy: 'Suponer y buscar la contradicción',
    problem: 'Tres testigos declaran. Lucas dice: «Mateo miente». Mateo dice: «Nadia miente». Nadia dice: «Lucas y Mateo dicen la verdad». ¿Quién dice la verdad y quién miente?',
    steps: [
      { title: 'Supón y busca el choque', concept: 'suponer',
        coach: 'No adivines. Escoge a la persona cuya frase dice más cosas, supón que dice la verdad y mira si todo encaja o si algo choca.',
        ex: play('completa-solucion', 'Completa el razonamiento', { q: 'Lucas dice: «Mateo miente». Mateo dice: «Nadia miente». Nadia dice: «Lucas y Mateo dicen la verdad». Supón que Nadia dice la verdad. ¿Qué pasa?',
          lines: ['Si Nadia dice la verdad, entonces Lucas y Mateo [[dicen la verdad]]', 'Pero Mateo afirma que Nadia [[miente]]: eso choca con lo que se supuso', 'Hay una [[contradicción]]: la suposición era falsa y Nadia miente'], extra: ['mienten', 'coincidencia'] },
          'Suponer que Nadia dice la verdad obliga a creerle a Mateo, y Mateo dice que Nadia miente. Las dos cosas no pueden pasar a la vez.', { hint: 'Si Nadia dice la verdad, su frase es cierta: ¿qué dice su frase sobre los otros dos?' }),
        hints: ['La frase de Nadia habla de Lucas y de Mateo. Si es cierta, ¿qué pasa con lo que dice Mateo?', 'Mateo estaría diciendo la verdad, y Mateo afirma que Nadia miente.'],
        note: 'Suponer que Nadia dice la verdad lleva a una contradicción: Nadia miente' },
      { title: 'Encadena lo que queda',
        coach: 'Ya hay un dato firme. Úsalo para revisar la frase de quien habló de esa persona, y después la del que falta.',
        ex: play('quien-miente', 'Marca quién miente y quién dice la verdad', { rounds: [{ people: [
          { name: 'Lucas', say: 'Mateo miente', f: t => !t[1] }, { name: 'Mateo', say: 'Nadia miente', f: t => !t[2] }, { name: 'Nadia', say: 'Lucas y Mateo dicen la verdad', f: t => t[0] && t[1] }] }] },
          'Nadia miente, así que Mateo (que lo afirma) dice la verdad. Y Lucas, que acusa a Mateo de mentir, miente.', { hint: 'Empieza por quien habló de la persona que ya sabes que miente.' }),
        hints: ['Mateo afirma algo que ya comprobaste. ¿Dice la verdad?', 'Mateo dice la verdad. Lucas afirma lo contrario de eso.'],
        note: 'Nadia miente, Mateo dice la verdad y Lucas miente' },
    ],
    answer: 'Solo Mateo dice la verdad; Lucas y Nadia mienten.',
    wrap: 'En los problemas de verdad y mentira: supón que alguien dice la verdad, saca las consecuencias y busca un choque. Si lo hay, esa persona miente, y ese dato firme destraba a los demás.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-operador', after: ['pu-op-1', 'pu-op-2'], level: 2,
    title: 'El operador estrella', strategy: 'Reemplazar con la receta, de adentro hacia afuera',
    problem: 'En los números enteros se define la operación $a \\star b = 3a - b$. Calcula $(2 \\star 1) \\star 4$ y halla el valor de $x$ para el cual $x \\star 5 = 16$.',
    steps: [
      { title: 'Resuelve el anidado', concept: 'operador-receta',
        coach: 'Un operador nuevo es una receta: dice qué hacer con el primer número y qué con el segundo. Cuando hay paréntesis, se resuelve primero lo de adentro y su resultado ocupa ese lugar.',
        ex: play('anida-operador', 'Calcula de adentro hacia afuera', { rounds: [{ sym: '\\star', tex: '3a - b', f: (a, b) => 3 * a - b, expr: [[2, 1], 4] }] },
          '$2 \\star 1 = 6 - 1 = 5$ y luego $5 \\star 4 = 15 - 4 = 11$.', { hint: 'Empieza por el paréntesis y usa su resultado como primer número.' }),
        hints: ['Resuelve primero el paréntesis con la receta: el triple del primero menos el segundo.', 'El paréntesis vale 5. Ahora aplica la receta con 5 de primero y 4 de segundo.'],
        note: 'Anidado: (2 ★ 1) ★ 4 = 5 ★ 4 = 11' },
      { title: 'Despeja la x del operador',
        coach: 'Ahora la incógnita está dentro del operador. Reemplaza con la receta, como si la x fuera un número, y te queda una ecuación corriente.',
        ex: play('busca-x-operador', 'Halla la x', { rounds: [{ sym: '\\star', tex: '3a - b', f: (a, b) => 3 * a - b, k: 5, side: 'left', target: 16, lo: -5, hi: 10 }] },
          'Al reemplazar queda $3x - 5 = 16$: $3x = 21$ y $x = 7$.', { hint: 'Escribe la receta con la x en el primer lugar y despeja.' }),
        hints: ['La x ocupa el primer lugar: la receta le pide su triple. El 5 ocupa el segundo.', 'La ecuación es $3x - 5 = 16$. Suma 5 a los dos lados y divide entre 3.'],
        note: 'Ecuación: 3x − 5 = 16, así que x = 7' },
    ],
    answer: 'El anidado vale 11, y la ecuación se cumple con x = 7.',
    wrap: 'Con un operador definido no hay nada que memorizar: se reemplaza cada letra por lo que ocupa su lugar. Los paréntesis van primero, y una incógnita dentro del operador se convierte en una ecuación corriente.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-noticias', after: ['pu-cj-1', 'pu-cj-2'], level: 2,
    title: 'La encuesta de las noticias', strategy: 'Quitar a los de afuera y buscar lo que sobra',
    problem: 'En una encuesta a 80 personas, 45 leen prensa digital, 30 ven noticieros de televisión y 20 no hacen ninguna de las dos cosas. ¿Cuántas personas hacen las dos? ¿Cuántas solo leen prensa digital?',
    steps: [
      { title: 'Halla la intersección', concept: 'venn-dos',
        coach: 'Empieza por quitar a los que no hacen nada: los demás están en al menos una de las dos listas. Si al sumar las dos listas sobra gente, los que sobran se contaron dos veces.',
        ex: play('solapa-barras', 'Solapa las barras hasta que todo cuadre', { rounds: [{ labels: ['prensa digital', 'televisión'], total: 80, a: 45, b: 30, none: 20 }] },
          'Hacen algo $80 - 20 = 60$ personas. Las listas suman 75: sobran 15, que están en las dos.', { hint: 'Compara la suma de las dos listas con los que hacen al menos una cosa.' }),
        hints: ['Resta del total a los que no hacen ninguna: esa es la unión.', 'La unión tiene 60 personas y las dos listas juntas suman 75.'],
        note: 'Los dos: 45 + 30 − 60 = 15' },
      { title: 'Llena las zonas y comprueba',
        coach: 'Con la intersección en la mano, llena el diagrama de adentro hacia afuera y comprueba que todas las zonas juntas dan el total de encuestados.',
        ex: play('completa-solucion', 'Completa el diagrama', { q: 'De 80 encuestados, 45 leen prensa digital, 30 ven noticieros de televisión, 15 hacen las dos cosas y 20 no hacen ninguna. Llena las zonas del diagrama.',
          lines: ['Solo prensa digital: $45 - 15 =$ [[30]]', 'Solo televisión: $30 - 15 =$ [[15]]', 'Las cuatro zonas suman $30 + 15 + 15 + 20 =$ [[80]]: cuadra con el total'], extra: ['45', '60', '75'] },
          'A cada lista se le quitan los que están en las dos. Las zonas (30, 15, 15 y 20) completan los 80 encuestados.', { hint: 'Empieza por el centro del diagrama y resta.' }),
        hints: ['A cada lista quítale los que están en las dos.', 'Solo prensa son 30. Haz lo mismo con la otra lista y suma las cuatro zonas.'],
        note: 'Zonas: 30 solo prensa, 15 los dos, 15 solo televisión y 20 ninguna = 80' },
    ],
    answer: 'Hacen las dos cosas 15 personas, y 30 solo leen prensa digital.',
    wrap: 'En una encuesta de dos listas: quita a los que no están en ninguna, compara la suma de las listas con lo que queda (el exceso es la intersección) y llena el diagrama del centro hacia afuera. Al final, las zonas deben sumar el total.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-faros', after: ['pu-nu-2'], level: 2,
    title: 'Los dos faros', strategy: 'Coincidir es un múltiplo común',
    problem: 'Dos faros destellan juntos a medianoche. El faro norte destella cada 8 segundos y el faro sur cada 12 segundos. ¿Cada cuánto tiempo vuelven a destellar juntos? ¿Cuántas veces coinciden en los 2 minutos siguientes, sin contar el instante inicial?',
    steps: [
      { title: 'Busca el primer instante común', concept: 'mcm-coincidir',
        coach: 'Cada faro destella en los múltiplos de su tiempo. Coinciden cuando un instante es múltiplo de los dos a la vez: busca el primero.',
        ex: play('ritmos-mcm', 'Avanza hasta que los dos destellen juntos', { rounds: [{ a: 8, b: 12, max: 30, labels: ['faro norte', 'faro sur'] }] },
          'Múltiplos de 8: 8, 16, 24. Múltiplos de 12: 12, 24. El primero que comparten es 24.', { hint: 'Avanza el tiempo hasta que los dos destellos caigan en el mismo instante.' }),
        hints: ['Escribe los primeros múltiplos de cada número y busca el primero que aparece en las dos listas.', 'El faro sur destella a los 12 segundos y otra vez 12 después. ¿Ese instante es múltiplo de 8?'],
        note: 'Coinciden cada MCM(8, 12) = 24 segundos' },
      { title: 'Cuenta las coincidencias',
        coach: 'Ya sabes cada cuánto coinciden. Pasa el tiempo total a segundos y cuenta cuántos de esos tramos caben.',
        ex: play('completa-solucion', 'Completa la cuenta', { q: 'Los dos faros coinciden cada 24 segundos. ¿Cuántas veces coinciden en los 2 minutos siguientes, sin contar el instante inicial? ¿Cuántas veces destella el faro norte en ese tiempo?',
          lines: ['Dos minutos son [[120]] segundos', 'Coinciden una vez cada 24 segundos: $120 \\div 24 =$ [[5]] veces', 'En ese tiempo, el faro norte destella $120 \\div 8 =$ [[15]] veces'], extra: ['6', '10', '96'] },
          '$120 \\div 24 = 5$ coincidencias, la última justo al cumplirse los dos minutos.', { hint: 'Todo en la misma unidad: segundos.' }),
        hints: ['Convierte los minutos a segundos antes de dividir.', 'Son 120 segundos. Divide entre el tiempo que pasa de una coincidencia a la siguiente.'],
        note: 'En 2 minutos: 120 ÷ 24 = 5 coincidencias' },
    ],
    answer: 'Destellan juntos cada 24 segundos y coinciden 5 veces en los 2 minutos siguientes.',
    wrap: 'Cuando dos cosas se repiten con ritmos distintos, coinciden en los múltiplos comunes, y la primera vez es el mínimo común múltiplo. Si el problema pide partir sin que sobre, lo que se busca es el máximo común divisor.',
  },
);

// Concepto de cada paso de los retos que ya existían: { reto: [concepto del paso 1, del paso 2, …] } (null = sin concepto).
const GYM_CONCEPT_DE = {
  'gym-concreto': ['razon-en-partes', 'aumento-como-factor', null],
  'gym-obra': [null, 'inversa-constante'],
  'gym-bus': [null, 'alcance', null],
  'gym-muro': ['trabajo-por-hora', null, null],
  'gym-tele': [null, 'cambios-en-cadena', null],
  'gym-chaqueta': ['deshacer-porcentaje', null],
  'gym-claves': ['casillas-multiplican', 'complemento'],
  'gym-papaya': [null, 'repetidas-dividen', null],
  'gym-comite': [null, 'orden-no-importa', null],
  'gym-prima': ['fraccion-del-resto', null, null],
  'gym-examen': [null, 'promedio-suma'],
  'gym-peor': ['peor-caso', null],
  'gym-hermanas': ['todo-con-una-x', null],
  'gym-madre': ['edades-tiempo', null],
  'gym-cafe': ['mezcla-valor', null],
  'gym-recibos': ['eliminar', null, null],
  'gym-dados': ['contar-contrario', 'no-contar-dos'],
  'gym-urna': [null, 'arbol-multiplica'],
  'gym-adivina': ['contar-contrario', 'arbol-multiplica'],
  // (los mundos siguientes añaden aquí)
};
for (const r of GYM_RETOS) (GYM_CONCEPT_DE[r.id] || []).forEach((c, i) => { if (c && r.steps[i]) r.steps[i].concept = c; });
