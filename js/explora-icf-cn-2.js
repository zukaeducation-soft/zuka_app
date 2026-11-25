// Preicfes · Ciencias Naturales, mundo 2 «Célula y Organismos» (Explora, escenas «hoja» y «dibujo»). Ejemplos propios.
{
  // Célula con puntos de soluto adentro y afuera; r es su tamaño y f la flecha del agua (1 entra, −1 sale).
  const AD = [[150, 90], [175, 110], [195, 85], [165, 125], [185, 130], [150, 110]], AF = [[40, 50], [60, 140], [300, 60], [280, 145], [50, 95], [310, 105], [90, 40], [255, 35]];
  const celula = (v, K) => K.r(20, 20, 300, 160, 'fn', 8) + K.c(170, 105, v.r, 'fa') + AD.slice(0, Math.round(v.d)).map(([x, y]) => K.c(x, y, 5, 'fF')).join('') + AF.slice(0, Math.round(v.a)).map(([x, y]) => K.c(x, y, 5, 'fF')).join('') + (v.f > 0.5 ? K.ar(62, 105, 105, 105, 'lg gr') + K.ar(278, 105, 235, 105, 'lg gr') : v.f < -0.5 ? K.ar(105, 105, 62, 105, 'lg gr') + K.ar(235, 105, 278, 105, 'lg gr') : '') + K.t(170, 198, v.t || '', 's ta');
  // Curva: valores en cuatro horas, con un nivel normal punteado.
  const curva = (v, K) => { const X = i => 60 + i * 78, Y = q => 170 - q * 0.55; return K.l(50, 170, 320, 170, 'lm') + K.l(50, 20, 50, 170, 'lm') + K.l(50, Y(90), 320, Y(90), 'lg d') + K.t(318, Y(90) + 14, 'normal', 's tg', 'end') + K.pl(v.q.slice(0, v.n).map((q, i) => [X(i), Y(q)]), 'la gr') + v.q.slice(0, v.n).map((q, i) => K.c(X(i), Y(q), 5, 'fA') + K.t(X(i), Y(q) - 10, q, 's')).join('') + ['0 h', '1 h', '2 h', '3 h'].map((t, i) => K.t(X(i), 188, t, 's tm')).join(''); };

  xpLec('icf-cn-celula-1', [
    ['El agua busca lo salado',
      xpMira('dibujo', 'Empecemos por la idea: por la membrana pasa el **agua**, casi no la sal.', { dib: celula, v: { r: 52, d: 5, a: 2, f: 0, t: '' }, alto: 206 }, [
        ['Los puntos son sal disuelta: hay más adentro.', { t: 'más sal adentro' }],
        ['El agua va hacia donde hay más sal: entra.', { f: 1, t: 'el agua entra' }],
        ['La célula se hincha.', { r: 64, f: 0, t: '' }],
        ['Ahora hay más sal afuera.', { r: 52, a: 8, d: 3, t: 'más sal afuera' }],
        ['El agua sale y la célula se encoge: eso es la ósmosis.', { f: -1, r: 40, t: 'el agua sale' }],
      ], 'Ósmosis: el agua va hacia donde hay más sustancia disuelta.'),
      xpHaz('hoja', '¿Dónde **entra** agua a la célula? Subraya los dos casos.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0, 2], paras: [['Fríjol seco en agua pura'], ['Pepino en sal'], ['Ciruela pasa en agua'], ['Carne salada']], pista: 'En alguna hay más sal afuera que adentro.' }, 'En agua pura hay más soluto dentro: entra.')],
    ['A favor o en contra',
      xpMira('hoja', 'Segunda idea: ir **a favor** no gasta energía; ir **en contra**, sí.', { paras: [['Oxígeno: de donde hay mucho a donde hay poco.'], ['Agua: hacia donde hay más sal.'], ['Una raíz mete un mineral que ya tiene en abundancia.'], ['Una célula saca sodio hacia donde hay más.']] }, [
        ['De mucho a poco: solo. Es difusión.', { luz: [0], nota: { 0: 'sin gasto' } }],
        ['La ósmosis tampoco gasta.', { luz: [1], nota: { 1: 'sin gasto' } }],
        ['De poco a mucho, en contra: cuesta.', { luz: [2], nota: { 2: 'con gasto' } }],
        ['Es como subir agua con una bomba: transporte activo.', { luz: [3], nota: { 3: 'con gasto' } }],
        ['Si la célula se queda sin energía, esto se detiene.', { luz: [2, 3] }],
      ], 'A favor es gratis; en contra hace falta energía.'),
      xpHaz('hoja', 'Subraya el caso que **gasta** energía.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Perfume que se riega por el cuarto'], ['Célula que mete yodo donde ya hay más'], ['Agua que entra a una pasa']], pista: 'Esa va de más a menos, o es ósmosis.' }, 'Meter donde ya hay más va en contra.')],
    ['Con pared o sin pared',
      xpMira('dibujo', 'Tercera idea: la **pared** de las plantas evita que la célula reviente.', { dib: (v, K) => K.f(v.p, K.r(100, 35, 140, 140, 'fc', 10)) + celula(v, K), v: { r: 48, d: 5, a: 1, f: 1, t: '', p: 0 }, alto: 206 }, [
        ['Un glóbulo rojo en agua destilada.', { t: 'glóbulo rojo' }],
        ['Entra agua y se hincha…', { r: 68, t: 'se hincha' }],
        ['…hasta que puede romperse: no tiene pared.', { r: 74, t: 'puede romperse' }],
        ['Una célula vegetal sí la tiene.', { r: 50, p: 1, t: 'célula vegetal' }],
        ['Se llena hasta donde la pared deja y queda rígida.', { r: 66, t: 'rígida' }],
      ], 'Con pared, la célula se pone rígida; sin ella, puede reventar.'),
      xpHaz('hoja', 'Pon al margen lo que le pasa a cada una en agua pura.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['puede romperse', 'queda rígida'], meta: [1, 0], paras: [['Célula de tomate'], ['Glóbulo rojo']], pista: '¿Cuál de las dos tiene pared?' }, 'El tomate tiene pared; el glóbulo, no.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Riegan una planta con agua muy salada. Subraya lo que ocurre.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Las raíces se llenan de agua.'], ['La pared desaparece.'], ['Sale agua de las raíces y se marchita.']], pista: '¿Dónde quedó más sal: en el suelo o en la raíz?' }, 'Hay más sal afuera: el agua sale.')],
  ], 'El agua va a lo salado, en contra cuesta energía y la pared protege.');

  xpLec('icf-cn-celula-2', [
    ['Volver al equilibrio',
      xpMira('dibujo', 'Empecemos por la idea: **homeostasis** es mantener el interior estable.', { dib: curva, v: { q: [90, 150, 110, 92], n: 1 }, alto: 200 }, [
        ['Azúcar en la sangre antes de comer: 90.', {}],
        ['Una hora después de comer sube.', { n: 2 }],
        ['El cuerpo responde y empieza a bajar.', { n: 3 }],
        ['A las tres horas volvió cerca del comienzo.', { n: 4 }],
        ['No importa que suba: importa que vuelva.', {}],
      ], 'Homeostasis: ante un cambio, el cuerpo vuelve a su valor.'),
      xpHaz('hoja', 'Temperatura de cuatro personas tras correr, al inicio y una hora después. Subraya a quien **no** recuperó el equilibrio.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['36.5 → 37.8 → 36.6'], ['36.6 → 38.9 → 38.7'], ['36.4 → 37.5 → 36.5']], pista: 'Esa volvió a su valor del comienzo.' }, 'B sigue en 38.7: no volvió.')],
    ['El cuerpo se avisa',
      xpMira('hoja', 'Segunda idea: hay un **aviso**, una **respuesta** y un **efecto**.', { paras: [['Hace frío.'], ['La piel avisa al cerebro.'], ['Los músculos tiemblan.'], ['El cuerpo se calienta.']] }, [
        ['Primero ocurre un cambio: hace frío.', { luz: [0], nota: { 0: 'cambio' } }],
        ['Algo lo detecta y avisa.', { luz: [1], nota: { 1: 'aviso' } }],
        ['El cuerpo responde con un movimiento.', { luz: [2], nota: { 2: 'respuesta' } }],
        ['Y el efecto corrige el cambio.', { luz: [3], nota: { 3: 'efecto' } }],
        ['Con el azúcar es igual: páncreas, insulina y células.', {}],
      ], 'Cambio, aviso, respuesta y efecto que lo corrige.'),
      xpHaz('hoja', 'Hace mucho calor. Pon al margen cada parte.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['respuesta', 'efecto', 'aviso'], meta: [2, 0, 1], paras: [['La piel detecta el calor.'], ['Las glándulas sudan.'], ['El cuerpo se enfría.']], pista: 'Alguno no va ahí: ¿detecta, actúa o corrige?' }, 'Detectar, sudar y enfriarse.')],
    ['Nadie trabaja solo',
      xpMira('hoja', 'Tercera idea: los sistemas **dependen** unos de otros.', { paras: [['Digestivo: rompe el alimento.'], ['Circulatorio: lo reparte.'], ['Respiratorio: trae oxígeno y saca CO₂.'], ['Excretor: filtra desechos.']] }, [
        ['El digestivo deja la comida en moléculas pequeñas.', { luz: [0], nota: { 0: 'rompe' } }],
        ['Sin sangre que las lleve, no llegan a las células.', { luz: [1], nota: { 1: 'reparte' } }],
        ['Sin oxígeno, la célula no aprovecha bien la glucosa.', { luz: [2], nota: { 2: 'oxígeno' } }],
        ['Y los desechos salen por los riñones.', { luz: [3], nota: { 3: 'limpia' } }],
        ['Si uno falla, los demás lo sienten.', { luz: [0, 1, 2, 3] }],
      ], 'Romper, repartir, respirar y limpiar: un solo equipo.'),
      xpHaz('hoja', 'Subraya el sistema que **reparte** el oxígeno por el cuerpo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Respiratorio'], ['Circulatorio'], ['Excretor']], pista: 'Ese lo toma del aire o limpia: ¿quién lo lleva?' }, 'Uno lo toma del aire y el otro lo reparte.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Al subir una montaña alta hay menos oxígeno y el corazón se acelera. Subraya la explicación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Así llega más oxígeno por minuto a las células.'], ['El corazón fabrica oxígeno.'], ['Con el frío se contrae.']], pista: '¿Qué gana el cuerpo si la sangre pasa más veces?' }, 'Más vueltas de sangre compensan el poco oxígeno.')],
  ], 'Vuelve al equilibrio, se avisa y trabaja en equipo.');

  xpLec('icf-cn-celula-3', [
    ['Copiar la receta',
      xpMira('hoja', 'Empecemos por la idea: el ADN no sale del núcleo; sale una **copia**.', { letras: ['ADN', 'ARN'], paras: [['T', 'A', 'G', 'C'], ['A', 'U', 'C', 'G']] }, [
        ['Arriba, cuatro letras de ADN.', { luz: [0, 1, 2, 3] }],
        ['La T se copia como A.', { luz: [0, 4] }],
        ['La A se copia como U: el ARN no usa T.', { luz: [1, 5] }],
        ['La G se copia como C y la C como G.', { luz: [2, 3, 6, 7] }],
        ['La copia es el ARN mensajero: transcripción.', { luz: [4, 5, 6, 7], nota: { 1: 'copia' } }],
      ], 'Transcripción: A con U, T con A, G con C y C con G.'),
      xpHaz('fichas', 'ADN: A C T. Pon su ARN mensajero.', { slots: [0, 1, 2].map(i => ({ x: 90 + i * 80, y: 46, w: 56, et: ['A', 'C', 'T'][i] })), fichas: ['U', 'G', 'A', 'T', 'C'], meta: ['U', 'G', 'A'], alto: 96, pista: 'El ARN no tiene T.' }, 'A con U, C con G y T con A.')],
    ['Leer de tres en tres',
      xpMira('hoja', 'Segunda idea: el ribosoma lee **tripletas**, los codones.', { paras: [['AUG', 'GAA', 'GUA'], ['met', 'glu', 'val']] }, [
        ['Nueve letras de ARN son tres codones.', { luz: [0, 1, 2] }, '$9 \\div 3 = 3$'],
        ['Cada codón indica un aminoácido.', { luz: [0, 3] }],
        ['GAA indica ácido glutámico.', { luz: [1, 4] }],
        ['Y el codón GUA indica valina.', { luz: [2, 5] }],
        ['Unidos en fila forman la proteína: traducción.', { luz: [3, 4, 5], nota: { 1: 'proteína' } }],
      ], 'Tres letras, un codón; un codón, un aminoácido.'),
      xpHaz('fichas', 'Un ARN de 18 letras. Pon cuántos codones tiene y cuántos aminoácidos indica (sin contar señales de parada).', { slots: [{ x: 110, y: 46, w: 90, et: 'codones' }, { x: 230, y: 46, w: 90, et: 'aminoácidos' }], fichas: ['6', '6', '18', '9', '54'], meta: ['6', '6'], alto: 96, pista: 'Divide entre 3; hay un aminoácido por codón.' }, '$18 \\div 3 = 6$ y uno por cada codón.')],
    ['Cuando cambia una letra',
      xpMira('hoja', 'Tercera idea: una **mutación** puede no hacer nada o cambiarlo todo.', { paras: [['GAA → GAG', 'mismo aminoácido'], ['GAA → GUA', 'otro aminoácido'], ['UN SOL MÁS', 'UNS OLM ÁS']] }, [
        ['GAA y GAG indican lo mismo: la proteína no cambia.', { luz: [0, 1], nota: { 0: 'sin efecto' } }],
        ['GUA indica otro: puede cambiar.', { luz: [2, 3], nota: { 1: 'cambia uno' } }],
        ['Si se quita o agrega una letra, todo se corre.', { luz: [4], nota: { 2: 'se corre' } }],
        ['Como leer con los espacios mal puestos.', { luz: [5] }],
        ['Por eso quitar una suele ser peor que cambiar una.', {}],
      ], 'Cambiar una letra afecta un codón; quitar una, todos los que siguen.'),
      xpHaz('hoja', 'Subraya el cambio que **más** puede dañar la proteína.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Cambiar GAA por GAG'], ['Quitar la segunda letra del gen'], ['Cambiar una letra del último codón']], pista: 'Ese afecta un solo codón.' }, 'Quitarla corre todos los grupos desde el comienzo.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'ADN: C T T. Pon su ARN y el aminoácido (GAA: glutámico, GUA: valina).', { slots: [{ x: 110, y: 46, w: 90, et: 'ARN' }, { x: 230, y: 46, w: 110, et: 'aminoácido' }], fichas: ['GAA', 'glutámico', 'GTT', 'valina', 'GUA'], meta: ['GAA', 'glutámico'], alto: 96, pista: 'C con G y T con A.' }, 'CTT se copia GAA, que indica ácido glutámico.')],
  ], 'Copiar, leer de a tres y cuidar las letras.');
}
