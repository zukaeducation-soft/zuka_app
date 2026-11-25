// Preicfes · Ciencias Naturales, mundo 8 «Herencia y Evolución» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Cuadro de cruces: padre p1 p2 arriba, madre m1 m2 a la izquierda; n casillas llenas.
  const cuadro = (v, K) => { const u = 56, x = 124, y = 44, P = v.p, M = v.m; let h = ''; for (let i = 0; i < 2; i++) { h += K.t(x + u * (i + 0.5), 34, P[i], 'b ta') + K.t(x - 14, y + u * (i + 0.5) + 5, M[i], 'b tg'); for (let j = 0; j < 2; j++) { const k = i * 2 + j, g = [P[j], M[i]].sort().join(''); h += K.r(x + u * j, y + u * i, u - 3, u - 3, v.n > k ? (/[A-Z]/.test(g) ? 'fa' : 'ff') : 'fn', 3) + K.f(v.n - k, K.t(x + u * (j + 0.5) - 2, y + u * (i + 0.5) + 4, g, 'b')); } } return h + K.t(170, 186, v.t || '', 'ta'); };
  // Población: k oscuros entre 20.
  const pob = (v, K) => Array.from({ length: 20 }, (_, i) => K.c(70 + (i % 5) * 50, 34 + Math.floor(i / 5) * 34, 11, i < Math.round(v.k) ? 'fF' : 'fA')).join('') + K.t(170, 184, v.t || '', 'ta');
  // División celular: n células con c cromosomas.
  const celulas = (v, K) => Array.from({ length: Math.round(v.n) }, (_, i) => { const n = Math.round(v.n), x = 170 + (i - (n - 1) / 2) * 74; return K.c(x, 92, n > 2 ? 30 : 34, 'fn') + Array.from({ length: Math.round(v.c) }, (_, j) => K.l(x - 12 + j * 8, 80, x - 12 + j * 8, 104, j % 2 ? 'lg gr' : 'la gr')).join(''); }).join('') + K.t(170, 176, v.t || '', 'ta');

  xpLec('icf-cn-herencia-1', [
    ['Dos alelos',
      xpMira('hoja', 'Empecemos por la idea: de cada gen recibes **dos alelos**, uno de cada progenitor.', { paras: [['A: dominante'], ['a: recesivo'], ['AA o Aa: se ve lo dominante'], ['aa: se ve lo recesivo']] }, [
        ['Con uno dominante basta.', { luz: [0] }],
        ['El recesivo necesita dos.', { luz: [1] }],
        ['Estos dos se ven iguales.', { luz: [2], nota: { 2: 'mismo fenotipo' } }],
        ['Solo este muestra lo recesivo.', { luz: [3] }],
        ['Genotipo son las letras; fenotipo, lo que se ve.', {}],
      ], 'Letras: genotipo. Lo que se ve: fenotipo.'),
      xpHaz('hoja', 'La nariz ancha (N) domina. Subraya el genotipo de una persona de nariz **angosta**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['NN'], ['Nn'], ['nn']], pista: 'Lo recesivo necesita dos iguales.' }, 'Sin ninguna N se ve lo recesivo.')],
    ['El cuadro',
      xpMira('dibujo', 'Segunda idea: el **cuadro** muestra las cuatro combinaciones.', { dib: cuadro, v: { p: ['B', 'b'], m: ['B', 'b'], n: 0, t: '' }, alto: 196 }, [
        ['El padre puede dar B o b; la madre también.', {}],
        ['Primera casilla: una B de cada uno.', { n: 1 }],
        ['Las otras tres se llenan igual.', { n: 4 }],
        ['Tres llevan alguna B: se ve lo dominante.', { t: '3 de 4' }],
        ['Solo una es bb: la cuarta parte.', { t: '1 de 4' }],
      ], 'Bb con Bb: tres a uno.'),
      xpHaz('fichas', 'Se cruza Rr con rr. Pon cuántas casillas de cuatro son Rr y cuántas rr.', { slots: fila('Rr', 'rr'), fichas: ['2', '2', '1', '3', '4'], meta: ['2', '2'], alto: 96, pista: 'Uno da R o r; el otro, solo r.' }, 'La mitad de cada una.')],
    ['Lo que se espera',
      xpMira('fichas', 'Tercera idea: la probabilidad vale en **muchos** nacimientos, no en cada camada.', { slots: fila('esperado', 'en 4', 'en 400'), fichas: ['1 de 4', '0 ó 2', '98'], alto: 96 }, [
        ['Se espera uno recesivo de cada cuatro.', { pon: { 0: '1 de 4' } }],
        ['En una camada de cuatro puede salir otra cosa.', { pon: { 1: '0 ó 2' } }],
        ['En cuatrocientas se acerca a cien.', { pon: { 2: '98' } }, '$400 \\div 4 = 100$'],
        ['También hay genes sin dominancia: flores rosadas.', {}],
        ['Y genes en el cromosoma X: más frecuentes en hombres.', {}],
      ], 'Mientras más nacimientos, más se acerca.'),
      xpHaz('fichas', 'Dos Aa tienen 240 hijos (son plantas). Pon los recesivos y los dominantes que se esperan.', { slots: fila('recesivos', 'dominantes'), fichas: ['60', '180', '120', '80', '240'], meta: ['60', '180'], alto: 96, pista: 'La cuarta parte y el resto.' }, '$240 \\div 4 = 60$ y $240 - 60 = 180$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Dos cobayos negros tienen una cría blanca. El negro domina. Subraya los genotipos de los padres.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['NN y NN'], ['Nn y Nn'], ['NN y nn']], pista: 'La cría es nn: recibió una n de cada uno.' }, 'Cada padre tiene una n escondida.')],
  ], 'Dos alelos, cuatro casillas y muchos nacimientos.');

  xpLec('icf-cn-herencia-2', [
    ['Uno o dos progenitores',
      xpMira('hoja', 'Empecemos por la idea: hay reproducción con **uno** o con **dos** progenitores.', { paras: [['Bacteria que se parte'], ['Papa sembrada por pedazos'], ['Polen que llega a otra flor'], ['Óvulo y espermatozoide']] }, [
        ['Aquí hay un solo progenitor.', { luz: [0], nota: { 0: 'asexual' } }],
        ['Aquí también: hijas iguales.', { luz: [1], nota: { 1: 'asexual' } }],
        ['Aquí hay dos progenitores.', { luz: [2], nota: { 2: 'sexual' } }],
        ['Y aquí: hijos variados.', { luz: [3], nota: { 3: 'sexual' } }],
        ['Una es rápida; la otra da variedad.', {}],
      ], 'Asexual: uno, iguales. Sexual: dos, variados.'),
      xpHaz('hoja', 'Subraya la ventaja de la reproducción **asexual**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Es rápida y no necesita pareja.'], ['Da hijos muy distintos.'], ['Protege de enfermedades nuevas.']], pista: 'Las otras dos son de la sexual.' }, 'Rápida y sin pareja, pero sin variedad.')],
    ['Dos divisiones',
      xpMira('dibujo', 'Segunda idea: **mitosis** copia; **meiosis** reduce a la mitad.', { dib: celulas, v: { n: 1, c: 4, t: 'una célula, 4 cromosomas' }, alto: 186 }, [
        ['Una célula con cuatro cromosomas.', {}],
        ['Por mitosis: dos iguales, con cuatro.', { n: 2, t: 'mitosis: 2 células, 4 cada una' }],
        ['Sirve para crecer y reparar.', {}],
        ['Por meiosis: cuatro, con la mitad.', { n: 4, c: 2, t: 'meiosis: 4 células, 2 cada una' }],
        ['Sirve para formar gametos, y todos son distintos.', {}],
      ], 'Mitosis: dos iguales. Meiosis: cuatro con la mitad.'),
      xpHaz('fichas', 'Una especie tiene 20 cromosomas. Pon los de sus gametos y los del cigoto.', { slots: fila('gameto', 'cigoto'), fichas: ['10', '20', '40', '5', '80'], meta: ['10', '20'], alto: 96, pista: 'El gameto lleva la mitad; dos gametos se juntan.' }, '$20 \\div 2 = 10$ y $10 + 10 = 20$.')],
    ['El seguro de la variedad',
      xpMira('hoja', 'Tercera idea: la **variedad** protege cuando algo cambia.', { paras: [['Todas iguales'], ['Llega una plaga'], ['Mueren casi todas'], ['Variadas: algunas resisten']] }, [
        ['Iguales: si nada cambia, van bien.', { luz: [0] }],
        ['Pero llega una plaga.', { luz: [1], nota: { 1: 'cambio' } }],
        ['Si una cae, caen todas.', { luz: [2] }],
        ['Entre distintas, alguna aguanta.', { luz: [3], nota: { 3: 'sobreviven' } }],
        ['Por eso se guardan semillas viejas.', {}],
      ], 'Variedad: el seguro de vida de una especie.'),
      xpHaz('hoja', 'Subraya el cultivo con **menor** riesgo ante un hongo nuevo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Mil matas de un mismo esqueje'], ['Mil matas de semillas de muchas plantas'], ['Mil matas de una sola bacteria']], pista: '¿Dónde hay plantas distintas?' }, 'La variedad aumenta la opción de que alguna resista.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Una mula nace de yegua (64 cromosomas) y burro (62). Subraya cuántos tiene.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['126'], ['64'], ['63']], pista: 'Cada gameto lleva la mitad.' }, '$32 + 31 = 63$.')],
  ], 'Uno o dos, copiar o reducir, y variar.');

  xpLec('icf-cn-herencia-3', [
    ['La población cambia',
      xpMira('dibujo', 'Empecemos por la idea: no cambia el individuo, cambia la **proporción**.', { dib: pob, v: { k: 2, t: '2 oscuros de 20' }, alto: 194 }, [
        ['Dos escarabajos de veinte son oscuros.', {}],
        ['Los pájaros ven mejor a los claros.', { t: 'cazan más claros' }],
        ['Los oscuros dejan más crías oscuras.', { k: 8, t: '8 de 20' }],
        ['Generación tras generación aumentan.', { k: 15, t: '15 de 20' }],
        ['Ninguno cambió de color.', {}],
      ], 'Variación, herencia, más nacen y unos se reproducen más.'),
      xpHaz('hoja', 'Subraya la explicación **correcta** de por qué hoy hay más ratones de pelo grueso en el frío.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Les creció porque lo necesitaban.'], ['Los de pelo grueso sobrevivieron y tuvieron más crías.'], ['El frío les cambió los genes a todos.']], pista: '¿Cambia el individuo o la población?' }, 'La variación ya existía y fue seleccionada.')],
    ['Al azar y escogido',
      xpMira('hoja', 'Segunda idea: la mutación es **al azar**; el ambiente **selecciona**.', { paras: [['Mutación: aparece sin propósito'], ['Ambiente: favorece a unos'], ['Otro ambiente: favorece a otros'], ['«Se adaptó porque quería»']] }, [
        ['La mutación no la pide nadie.', { luz: [0], nota: { 0: 'al azar' } }],
        ['Luego el lugar decide cuál conviene.', { luz: [1], nota: { 1: 'selecciona' } }],
        ['En otra parte conviene lo contrario.', { luz: [2] }],
        ['Este es el error típico.', { luz: [3], tacha: [3] }],
        ['Estar adaptado es estarlo a un lugar.', { luz: [1, 2] }],
      ], 'Primero la variación; después, la selección.'),
      xpHaz('hoja', 'Pon al margen qué es cada cosa.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['selección', 'mutación'], meta: [1, 0], paras: [['Un cambio en el ADN de una cría'], ['Los peces rápidos escapan y se reproducen más']], pista: 'Alguna no va ahí: ¿aparece al azar o se favorece?' }, 'El ADN muta; los rápidos son seleccionados.')],
    ['Las pruebas',
      xpMira('hoja', 'Tercera idea: muchas **pruebas** apuntan a lo mismo.', { paras: [['Fósiles intermedios'], ['Mismos huesos en brazo, ala y aleta'], ['ADN parecido entre parientes'], ['Bacterias resistentes']] }, [
        ['La roca guarda formas de paso.', { luz: [0] }],
        ['Un mismo plan, acomodado distinto.', { luz: [1] }],
        ['Mientras más cercanos, más parecido.', { luz: [2] }],
        ['Y lo vemos ocurrir hoy.', { luz: [3], nota: { 3: 'ahora' } }],
        ['Por eso el antibiótico se toma completo.', { luz: [3] }],
      ], 'Roca, huesos, ADN y lo que pasa hoy.'),
      xpHaz('hoja', 'Subraya por qué no se debe suspender un antibiótico.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Quedan vivas las más resistentes.'], ['Las bacterias aprenden.'], ['El remedio se daña.']], pista: '¿Cuáles mueren primero?' }, 'Mueren las sensibles; las otras se multiplican.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'De 100 insectos, 5 resisten un veneno. Tras fumigar quedan 4 resistentes y 6 que no. Pon el porcentaje de resistentes antes y después.', { slots: fila('antes (%)', 'después (%)'), fichas: ['5', '40', '4', '10', '60'], meta: ['5', '40'], alto: 96, pista: 'Compara con el total de cada momento.' }, '5 de 100 y 4 de 10.')],
  ], 'Cambia la proporción, el ambiente escoge y hay pruebas.');
}
