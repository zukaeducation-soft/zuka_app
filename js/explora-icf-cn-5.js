// Preicfes · Ciencias Naturales, mundo 5 «Ecosistemas y Energía» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Cadena de cuatro círculos con n flechas.
  const NOM = ['pasto', 'saltamontes', 'sapo', 'culebra'];
  const cadena = (v, K) => NOM.map((s, i) => K.c(50 + i * 80, 80, 24, ['fa', 'fg', 'ff', 'fF'][i]) + K.t(50 + i * 80, 126, s, 's') + (i < 3 ? K.f(v.n - i, K.ar(76 + i * 80, 80, 104 + i * 80, 80, 'lg gr')) : '')).join('') + K.t(170, 30, v.t || '', 'ta') + K.f(v.h, K.c(170, 170, 18, 'fn') + K.t(170, 202, 'hongos y bacterias', 's tm') + [0, 1, 2, 3].map(i => K.l(50 + i * 80, 132, 170 + (i - 1.5) * 12, 154, 'lm')).join(''));
  // Pirámide: niveles de ancho proporcional a la raíz para que se vean.
  const pir = (v, K) => [0, 1, 2, 3].map(i => K.f(v.n - i, K.r(170 - [150, 100, 60, 26][i], 140 - i * 34, 2 * [150, 100, 60, 26][i], 32, ['fa', 'fg', 'ff', 'fF'][i], 2) + K.t(170, 161 - i * 34, v.k[i], 's'))).join('') + K.t(170, 190, v.t || '', 'ta');
  // Dos curvas: presas y depredadores.
  const A = [30, 80, 120, 70, 30, 60, 115], B = [20, 25, 55, 80, 45, 20, 40];
  const olas = (v, K) => { const X = i => 46 + i * 44, Y = y => 150 - y; return K.l(46, 150, 318, 150, 'lm') + K.l(46, 150, 46, 20, 'lm') + K.pl(A.slice(0, Math.round(v.a) + 1).map((y, i) => [X(i), Y(y)]), 'la gr') + K.pl(B.slice(0, Math.round(v.b) + 1).map((y, i) => [X(i), Y(y)]), 'lf gr') + K.t(60, 14, 'presas', 's ta', 'start') + K.t(120, 14, 'depredadores', 's tf', 'start') + K.t(318, 168, 'años', 's tm', 'end') + K.t(182, 186, v.t || '', 's tm'); };

  xpLec('icf-cn-ecosistemas-1', [
    ['La cadena',
      xpMira('dibujo', 'Empecemos por la idea: la flecha va **hacia quien come**.', { dib: cadena, v: { n: 0, h: 0, t: '' }, alto: 214 }, [
        ['El pasto fabrica su alimento con luz: productor.', { t: 'productor' }],
        ['El saltamontes come pasto: consumidor primario.', { n: 1, t: 'primario' }],
        ['El sapo come saltamontes: secundario.', { n: 2, t: 'secundario' }],
        ['La culebra come sapos: terciaria.', { n: 3, t: 'terciaria' }],
        ['Los descomponedores reciben de todos.', { h: 1, t: '' }],
      ], 'Productor, primario, secundario, terciario; y descomponedores para todos.'),
      xpHaz('hoja', 'Maíz → gallina → zorro. Pon al margen el nivel.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['secundario', 'productor', 'primario'], meta: [2, 0, 1], paras: [['Gallina'], ['Zorro'], ['Maíz']], pista: 'Alguna no va ahí: empieza por quien usa la luz.' }, 'El maíz produce, la gallina es primaria y el zorro, secundario.')],
    ['La décima parte',
      xpMira('dibujo', 'Segunda idea: de un nivel al otro pasa **cerca de la décima parte** de la energía.', { dib: pir, v: { n: 1, k: ['20 000', '2 000', '200', '20'], t: '' }, alto: 200 }, [
        ['Las plantas guardan veinte mil.', { t: 'productores' }],
        ['A los primarios pasan dos mil.', { n: 2 }, '$20\\,000 \\div 10 = 2\\,000$'],
        ['A los secundarios, doscientos.', { n: 3 }, '$2\\,000 \\div 10 = 200$'],
        ['Y a los terciarios, solo veinte.', { n: 4 }, '$200 \\div 10 = 20$'],
        ['Lo demás se va como calor o no se come.', { t: 'por eso hay pocos arriba' }],
      ], 'Cada paso, cerca del 10 %: por eso arriba hay pocos.'),
      xpHaz('fichas', 'Los productores tienen 9 000. Pon lo que llega a primarios y a secundarios.', { slots: fila('primarios', 'secundarios'), fichas: ['900', '90', '4500', '9', '8100'], meta: ['900', '90'], alto: 96, pista: 'Saca la décima parte y otra vez la décima parte.' }, '$9\\,000 \\div 10 = 900$ y $900 \\div 10 = 90$.')],
    ['Mover un eslabón',
      xpMira('hoja', 'Tercera idea: si cambia un eslabón, **se mueve la red**.', { paras: [['pasto → saltamontes → sapo → culebra'], ['Se acaban los sapos.'], ['Suben los saltamontes.'], ['Baja el pasto y bajan las culebras.']] }, [
        ['Esta es la cadena de antes.', { luz: [0] }],
        ['Una enfermedad acaba con los sapos.', { luz: [1], nota: { 1: 'cambio' } }],
        ['Sin quien los coma, suben los saltamontes.', { luz: [2], nota: { 2: 'suben' } }],
        ['Comen más pasto: el pasto baja.', { luz: [3] }],
        ['Y la culebra pierde su comida: también baja.', { luz: [3], nota: { 3: 'bajan' } }],
      ], 'Mira quién lo comía y a quién se comía.'),
      xpHaz('hoja', 'Algas → camarón → pez. Se pesca casi todo el pez. Subraya lo que pasa primero con el **camarón**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Aumenta'], ['Disminuye'], ['Se vuelve productor']], pista: '¿Quién se lo comía?' }, 'Sin su depredador, aumenta.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'A un consumidor secundario le llegan 60 kcal. Si en cada paso pasa la décima parte, pon las del primario y las de los productores.', { slots: fila('primario', 'productores'), fichas: ['600', '6000', '6', '0.6', '120'], meta: ['600', '6000'], alto: 96, pista: 'Ahora vas hacia abajo: multiplica por diez.' }, '$60 \\cdot 10 = 600$ y $600 \\cdot 10 = 6\\,000$.')],
  ], 'La flecha, la décima parte y la red que se mueve.');

  xpLec('icf-cn-ecosistemas-2', [
    ['El carbono',
      xpMira('hoja', 'Empecemos por la idea: el **carbono** va del aire a los seres vivos y vuelve.', { paras: [['Aire: dióxido de carbono'], ['Planta: lo toma y hace azúcar'], ['Animal: come azúcar y respira'], ['Fuego: quema leña o gasolina']] }, [
        ['El carbono está en el aire como gas.', { luz: [0] }],
        ['La fotosíntesis lo toma y hace azúcar.', { luz: [1], nota: { 1: 'lo toma' } }],
        ['Al respirar, los seres vivos lo devuelven.', { luz: [2], nota: { 2: 'lo devuelve' } }],
        ['Quemar también lo devuelve, y muy rápido.', { luz: [3], nota: { 3: 'lo devuelve rápido' } }],
        ['Las plantas también respiran, de día y de noche.', { luz: [1] }],
      ], 'Fotosíntesis toma; respirar, descomponer y quemar devuelven.'),
      xpHaz('hoja', 'Subraya lo que **saca** dióxido de carbono del aire.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Una vaca que respira'], ['Un bosque que crece'], ['Un incendio']], pista: '¿Cuál guarda carbono en madera y hojas?' }, 'El bosque que crece lo guarda.')],
    ['El nitrógeno',
      xpMira('hoja', 'Segunda idea: el **nitrógeno** necesita bacterias para servirle a la planta.', { paras: [['Aire: mucho nitrógeno, pero así no sirve.'], ['Bacterias en la raíz del fríjol: lo convierten.'], ['Suelo: queda disuelto.'], ['Planta: lo toma por la raíz.']] }, [
        ['En el aire hay de sobra, pero la planta no puede usarlo.', { luz: [0], tacha: [0] }],
        ['Unas bacterias lo convierten.', { luz: [1], nota: { 1: 'lo convierten' } }],
        ['Así queda disuelto en el suelo.', { luz: [2] }],
        ['Y la planta lo toma por la raíz.', { luz: [3], nota: { 3: 'lo toma' } }],
        ['Por eso sembrar fríjol ayuda al suelo.', { luz: [1] }],
      ], 'Aire, bacterias, suelo y raíz.'),
      xpHaz('hoja', 'Pon al margen qué hace cada uno con el nitrógeno.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['lo convierte', 'lo toma ya convertido'], meta: [1, 0], paras: [['La raíz del maíz'], ['Las bacterias de la raíz del fríjol']], pista: '¿Quién hace el trabajo y quién lo aprovecha?' }, 'Las bacterias convierten; el maíz aprovecha.')],
    ['Demasiado',
      xpMira('fichas', 'Tercera idea: **demasiados** nutrientes en el agua quitan el oxígeno.', { slots: fila('1', '2', '3', '4').map(s => ({ ...s, w: 64 })), fichas: ['nitratos', 'algas', 'mueren', 'sin O₂'], alto: 96 }, [
        ['El abono que sobra llega al río.', { pon: { 0: 'nitratos' } }],
        ['Con tanto alimento, las algas se disparan.', { pon: { 1: 'algas' } }],
        ['Tapan la luz y muchas mueren.', { pon: { 2: 'mueren' } }],
        ['Las bacterias que las descomponen gastan el oxígeno.', { pon: { 3: 'sin O₂' } }],
        ['Los peces no mueren por el abono: les falta oxígeno.', { marca: [3] }],
      ], 'Nitratos, algas, descomposición y falta de oxígeno.'),
      xpHaz('hoja', 'Una laguna se puso verde y murieron los peces. Subraya la explicación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Las algas se comieron los peces.'], ['El agua se calentó por el color.'], ['Al descomponerse las algas, se gastó el oxígeno.']], pista: 'Sigue la cadena hasta el oxígeno.' }, 'La descomposición consume el oxígeno.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una pila de compost pasa de 50 a 30 kg. Pon los kilos que perdió y qué porcentaje de la masa es.', { slots: fila('kilos', 'porcentaje'), fichas: ['20', '40', '60', '30', '67'], meta: ['20', '40'], alto: 96, pista: 'Compara lo perdido con los 50 del comienzo.' }, '$20 \\div 50 = 0.4$: salió al aire, no se destruyó.')],
  ], 'La materia circula: sigue dónde está y quién la mueve.');

  xpLec('icf-cn-ecosistemas-3', [
    ['Quién gana y quién pierde',
      xpMira('hoja', 'Empecemos por la idea: pregunta qué le pasa **a cada uno**.', { paras: [['Pez payaso y anémona: se protegen.'], ['Ave que anida en un árbol.'], ['Pulga y gato.'], ['Dos plantas por la misma luz.']] }, [
        ['Ganan los dos: mutualismo.', { luz: [0], nota: { 0: 'mutualismo' } }],
        ['El ave gana y al árbol le da igual: comensalismo.', { luz: [1], nota: { 1: 'comensalismo' } }],
        ['La pulga gana y el gato pierde: parasitismo.', { luz: [2], nota: { 2: 'parasitismo' } }],
        ['Las dos gastan energía: competencia.', { luz: [3], nota: { 3: 'competencia' } }],
        ['Y si uno mata y come al otro: depredación.', {}],
      ], 'Gana-gana, gana-igual, gana-pierde y pierde-pierde.'),
      xpHaz('hoja', 'Pon al margen la relación.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['competencia', 'mutualismo', 'parasitismo'], meta: [2, 0, 1], paras: [['Un gusano vive en el intestino de un perro.'], ['Dos gallos se pelean por la comida.'], ['Las bacterias de la vaca le digieren el pasto y reciben alimento.']], pista: 'Alguna no va ahí: di qué le pasa a cada uno.' }, 'El perro pierde, los gallos gastan y la vaca y sus bacterias ganan.')],
    ['Suben y bajan',
      xpMira('dibujo', 'Segunda idea: los depredadores **siguen** a sus presas, con retraso.', { dib: olas, v: { a: 0, b: 0, t: '' }, alto: 196 }, [
        ['Primero suben las presas.', { a: 2, t: 'hay más comida' }],
        ['Después suben los depredadores.', { b: 3, t: 'crían más' }],
        ['Con tantos, las presas bajan.', { a: 4, t: 'las cazan más' }],
        ['Y sin comida, bajan los depredadores.', { b: 5, t: 'falta comida' }],
        ['Entonces las presas vuelven a subir.', { a: 6, b: 6, t: '' }],
      ], 'Primero las presas, después los depredadores.'),
      xpHaz('hoja', 'Un año hay muchísimos conejos. Subraya lo más probable para los zorros al año siguiente.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Aumentan'], ['Desaparecen'], ['Comen pasto']], pista: 'Los depredadores siguen a la comida.' }, 'Con más comida crían más.')],
    ['El límite',
      xpMira('fichas', 'Tercera idea: cada lugar sostiene **hasta cierto número**.', { slots: fila('por hectárea', 'hectáreas', 'caben'), fichas: ['3', '20', '60'], alto: 96 }, [
        ['Un bosque sostiene tres monos por hectárea.', { pon: { 0: '3' } }],
        ['Y tiene veinte hectáreas.', { pon: { 1: '20' } }],
        ['Su capacidad de carga son sesenta monos.', { pon: { 2: '60' } }, '$3 \\cdot 20 = 60$'],
        ['Si hay ochenta, se agota la comida y bajan.', {}],
        ['Una invasora crece desplazando a las demás.', {}],
      ], 'Capacidad de carga: cuántos sostiene el lugar.'),
      xpHaz('fichas', 'Una ladera sostiene 5 cabras por hectárea y tiene 8 hectáreas. Hay 52. Pon las que caben y las que sobran.', { slots: fila('caben', 'sobran'), fichas: ['40', '12', '13', '47', '92'], meta: ['40', '12'], alto: 96, pista: 'Multiplica y compara con las que hay.' }, '$5 \\cdot 8 = 40$ y $52 - 40 = 12$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Llega un pez que come lo mismo que el pez local y nadie se lo come. Subraya lo más probable.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El local aumenta.'], ['El local disminuye por la competencia.'], ['Los dos se vuelven productores.']], pista: 'Comen lo mismo y al nuevo nadie lo caza.' }, 'Compiten, y el nuevo tiene ventaja.')],
  ], 'Di quién gana, sigue los números y respeta el límite.');
}
