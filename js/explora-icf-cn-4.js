// Preicfes · Ciencias Naturales, mundo 4 «Materia y Mezclas» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Doce partículas que se separan: s de 0 (sólido) a 1 (gas).
  const PX = [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [1, 1], [2, 1], [3, 1], [0, 2], [1, 2], [2, 2], [3, 2]], GX = [[78, 44], [150, 36], [224, 50], [262, 92], [84, 104], [140, 82], [196, 100], [250, 140], [74, 152], [124, 136], [178, 150], [222, 156]], LX = [[70, 160], [104, 158], [138, 161], [172, 158], [206, 160], [240, 159], [268, 150], [86, 136], [120, 132], [156, 135], [192, 133], [228, 136]];
  const part = (v, K) => K.r(56, 24, 228, 148, 'fn', 8) + PX.map(([i, j], k) => { const S = [119 + i * 34, 94 + j * 32], A = v.s <= 1 ? S : LX[k], B = v.s <= 1 ? LX[k] : GX[k], f = v.s <= 1 ? v.s : v.s - 1; return K.c(A[0] + (B[0] - A[0]) * f, A[1] + (B[1] - A[1]) * f, 10, 'fA'); }).join('') + K.t(170, 194, v.t || '', 'ta');
  // Temperatura contra tiempo; n: tramos que se ven.
  const CUR = [[40, 150], [70, 128], [130, 128], [190, 56], [290, 56]];
  const curva = (v, K) => K.l(40, 166, 320, 166, 'lm') + K.l(40, 166, 40, 24, 'lm') + K.t(32, 132, '0', 's tm', 'end') + K.t(32, 60, '100', 's tm', 'end') + K.t(44, 16, '°C', 's tm', 'start') + K.t(318, 184, 'tiempo', 's tm', 'end') + K.pl(CUR.slice(0, Math.round(v.n) + 1), 'la gr') + K.t(190, 36, v.t || '', 'ta');
  // Vaso con soluto: d disueltos (puntos) y q en el fondo.
  const vaso = (v, K) => K.r(100, 40, 140, 120, 'fn', 6) + Array.from({ length: Math.round(v.d) }, (_, i) => K.c(116 + (i * 37) % 112, 54 + (i * 23) % 80, 4, 'fA')).join('') + Array.from({ length: Math.round(v.q) }, (_, i) => K.r(108 + i * 12, 148, 9, 9, 'fF', 1)).join('') + K.t(170, 186, v.t || '', 'ta') + K.t(170, 24, v.p || '', 's tm');

  xpLec('icf-cn-materia-1', [
    ['Partículas',
      xpMira('dibujo', 'Empecemos por la idea: los estados se distinguen por **cómo se mueven** las partículas.', { dib: part, v: { s: 0, t: '' }, alto: 204 }, [
        ['En un sólido vibran en su sitio, muy juntas.', { t: 'sólido' }],
        ['Al calentar se sueltan y se deslizan.', { s: 1, t: 'líquido' }],
        ['Con más energía se separan del todo.', { s: 2, t: 'gas' }],
        ['Son las mismas doce: ni crecen ni desaparecen.', {}],
        ['Al enfriar, vuelven a juntarse.', { s: 1, t: 'líquido' }],
      ], 'Cambia el movimiento y la distancia; no las partículas.'),
      xpHaz('hoja', 'Se evapora un charco. Subraya lo que les pasa a sus partículas.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Crecen.'], ['Se destruyen.'], ['Se separan y van al aire.']], pista: 'Siguen siendo las mismas.' }, 'Se separan; siguen siendo agua.')],
    ['El tramo plano',
      xpMira('dibujo', 'Segunda idea: mientras **cambia de estado**, la temperatura no sube.', { dib: curva, v: { n: 0, t: '' }, alto: 192 }, [
        ['El hielo se calienta hasta llegar a 0 °C.', { n: 1, t: 'hielo' }],
        ['Se derrite: la línea queda plana.', { n: 2, t: 'hielo y agua: 0 °C' }],
        ['Ya todo es agua: sube otra vez.', { n: 3, t: 'agua' }],
        ['Hierve: otra vez plana, a nivel del mar a 100.', { n: 4, t: 'agua y vapor: 100 °C' }],
        ['Ahí la energía separa partículas, no calienta.', {}],
        ['En la montaña hierve antes: el aire presiona menos.', {}],
      ], 'Plano: cambio de estado. A menor presión, hierve a menos.'),
      xpHaz('hoja', 'En una mezcla de hielo y agua a 0 °C se enciende la llama. Subraya qué pasa primero.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Sube a 10 °C.'], ['Sigue a 0 °C mientras haya hielo.'], ['Hierve.']], pista: 'Todavía hay hielo por derretir.' }, 'La energía derrite el hielo antes de calentar.')],
    ['Densidad',
      xpMira('fichas', 'Tercera idea: la **densidad** dice cuánta masa hay en cada unidad de volumen.', { slots: fila('g por cm³', 'en agua'), fichas: ['0.5', 'flota', '4'], alto: 96 }, [
        ['Un corcho de 10 gramos ocupa 20 centímetros cúbicos.', {}],
        ['Se reparte la masa entre el volumen.', { pon: { 0: '0.5' } }, '$10 \\div 20 = 0.5$'],
        ['El agua tiene 1: el corcho es menos denso.', { pon: { 1: 'flota' } }],
        ['Pesar mucho no es hundirse: un tronco flota.', {}],
        ['Importa la masa comparada con el volumen.', {}],
      ], 'Densidad: masa entre volumen. Lo menos denso flota.'),
      xpHaz('fichas', 'Un bloque de 120 g ocupa 150 cm³. Pon su densidad y lo que hace en el agua.', { slots: fila('g por cm³', 'en agua'), fichas: ['0.8', 'flota', '1.25', 'se hunde', '30'], meta: ['0.8', 'flota'], alto: 96, pista: 'Masa entre volumen, y compara con 1.' }, '$120 \\div 150 = 0.8$, menos que 1: flota.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'En un páramo, unos fríjoles tardan más en ablandarse en olla abierta. Subraya por qué.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El agua hierve a menor temperatura.'], ['El agua no hierve.'], ['Los fríjoles son más densos.']], pista: 'Allá el aire presiona menos.' }, 'Hierve antes de llegar a 100: cocina más frío.')],
  ], 'Partículas, tramos planos, presión y densidad.');

  xpLec('icf-cn-materia-2', [
    ['Mezcla o compuesto',
      xpMira('hoja', 'Empecemos por la idea: en una **mezcla** cada sustancia sigue siendo ella.', { letras: ['A', 'B', 'C'], paras: [['Limonada: agua, limón y azúcar.'], ['Agua: hidrógeno y oxígeno unidos.'], ['Granola: avena, pasas y nueces.']] }, [
        ['En la limonada cada cosa conserva su sabor.', { luz: [0], nota: { 0: 'mezcla' } }],
        ['En el agua hay dos elementos unidos en algo nuevo.', { luz: [1], nota: { 1: 'compuesto' } }],
        ['En la granola hasta se ven las partes.', { luz: [2], nota: { 2: 'mezcla' } }],
        ['Si se ve pareja es homogénea; si no, heterogénea.', { luz: [0, 2] }],
        ['Un compuesto no se separa con un colador.', { luz: [1] }],
      ], 'Mezcla: juntas. Compuesto: unidas. Homogénea: pareja.'),
      xpHaz('hoja', 'Pon al margen qué es cada cosa.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['heterogénea', 'compuesto', 'homogénea'], meta: [2, 0, 1], paras: [['Agua con azúcar disuelta'], ['Agua con piedras'], ['Óxido de hierro']], pista: 'Alguna no va ahí: ¿pareja, con partes o unida en algo nuevo?' }, 'Pareja, con partes y unida.')],
    ['Busca la diferencia',
      xpMira('hoja', 'Segunda idea: para separar, busca **en qué se diferencian**.', { paras: [['Clavos y arena'], ['Arroz y agua'], ['Aceite y vinagre'], ['Agua y sal']] }, [
        ['Los clavos se pegan al imán.', { luz: [0], nota: { 0: 'imán' } }],
        ['El arroz no pasa por el colador.', { luz: [1], nota: { 1: 'filtrar' } }],
        ['El aceite flota: se saca por arriba.', { luz: [2], nota: { 2: 'decantar' } }],
        ['La sal no se evapora: queda al hervir.', { luz: [3], nota: { 3: 'evaporar' } }],
        ['Si quieres el agua, enfría el vapor: destilar.', { luz: [3] }],
      ], 'Imán, filtro, decantar, evaporar o destilar: según la diferencia.'),
      xpHaz('hoja', 'Pon al margen el método.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['destilar', 'imán', 'filtrar'], meta: [2, 0, 1], paras: [['Hojas de té en agua'], ['Alcohol y agua'], ['Virutas de hierro y aserrín']], pista: 'Alguna no va ahí: ¿granos, hervor distinto o hierro?' }, 'Las hojas se filtran, los líquidos se destilan y el hierro se atrae.')],
    ['El orden y la masa',
      xpMira('fichas', 'Tercera idea: **la masa se conserva** y el porcentaje es sobre todo.', { slots: fila('mezcla (g)', 'sal (%)'), fichas: ['250', '20'], alto: 96 }, [
        ['Se juntan 200 gramos de agua y 50 de sal.', {}],
        ['La mezcla pesa la suma de las dos.', { pon: { 0: '250' } }, '$200 + 50 = 250$'],
        ['Cincuenta de doscientos cincuenta son un quinto.', { pon: { 1: '20' } }, '$50 \\div 250 = 0.2$'],
        ['No se divide entre el agua: se divide entre todo.', { marca: [0] }],
        ['Al separarlas vuelven a salir 200 y 50.', { marca: [] }],
      ], 'Nada se pierde; el porcentaje va sobre el total.'),
      xpHaz('fichas', 'Se mezclan 90 g de agua y 30 g de azúcar. Pon la masa y el porcentaje de azúcar.', { slots: fila('mezcla (g)', 'azúcar (%)'), fichas: ['120', '25', '33', '60', '30'], meta: ['120', '25'], alto: 96, pista: 'El total incluye el azúcar.' }, '$30 \\div 120 = 0.25$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Hay que separar hierro, azúcar y agua y recuperar las tres. Subraya el orden que sirve.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Imán y luego filtro'], ['Imán y luego destilar'], ['Filtro y luego filtro']], pista: 'El azúcar disuelta pasa por el filtro.' }, 'El imán saca el hierro; destilar separa el agua del azúcar.')],
  ], 'Distingue, busca la diferencia y cuida la masa.');

  xpLec('icf-cn-materia-3', [
    ['Hasta cuánto cabe',
      xpMira('dibujo', 'Empecemos por la idea: la **solubilidad** es lo máximo que cabe disuelto.', { dib: vaso, v: { d: 0, q: 0, t: '', p: 'caben 24 a 20 °C' }, alto: 200 }, [
        ['Con 12 gramos, se disuelve todo.', { d: 12, t: 'insaturada' }],
        ['Con 24 gramos está justo en el límite.', { d: 24, t: 'saturada' }],
        ['Con 30 gramos, 6 se quedan en el fondo.', { q: 6, t: 'saturada y sobran 6' }, '$30 - 24 = 6$'],
        ['Disolver no es derretir: el agua lo rodea y lo reparte.', {}],
        ['Y la masa es la del agua más la del soluto.', {}],
      ], 'Menos del límite: insaturada. En el límite: saturada. Lo demás, al fondo.'),
      xpHaz('fichas', 'En 100 g de agua caben 35 g. Se echan 50 g. Pon lo disuelto y lo que queda en el fondo.', { slots: fila('disuelto', 'en el fondo'), fichas: ['35', '15', '50', '85', '0'], meta: ['35', '15'], alto: 96, pista: 'Se disuelve hasta el límite.' }, '$50 - 35 = 15$.')],
    ['Más rápido o más',
      xpMira('dibujo', 'Segunda idea: agitar **apura**; calentar, en muchos sólidos, hace que **quepa más**.', { dib: vaso, v: { d: 24, q: 6, t: '', p: '20 °C' }, alto: 200 }, [
        ['Hay 6 gramos en el fondo.', { t: 'sobran 6' }],
        ['Se agita: se disuelve más rápido, pero no más.', { t: 'agitar: siguen sobrando 6' }],
        ['Se calienta a 60 grados: ahora caben más.', { d: 30, q: 0, t: 'se disolvió todo', p: '60 °C' }],
        ['También cabría más con más agua.', {}],
        ['Con la sal de cocina, calentar casi no ayuda.', {}],
      ], 'Agitar y moler apuran. Calentar o agregar agua: cabe más.'),
      xpHaz('hoja', 'Pon al margen qué logra cada acción con un sólido como el azúcar.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['cabe más', 'más rápido'], meta: [1, 0], paras: [['Moler los granos'], ['Duplicar el agua']], pista: 'Mira si al final se disuelve más.' }, 'Moler apura; con más agua cabe más.')],
    ['Gases y semejantes',
      xpMira('hoja', 'Tercera idea: con los **gases** es al revés, y no todo disuelve a todo.', { paras: [['Oxígeno en agua fría: 11 mg por litro'], ['Oxígeno en agua tibia: 7.5 mg por litro'], ['Aceite en agua: no se disuelve'], ['Grasa en gasolina: se disuelve']] }, [
        ['En agua fría cabe más oxígeno.', { luz: [0] }],
        ['En agua tibia cabe menos: el gas se escapa.', { luz: [1], nota: { 1: 'menos gas' } }],
        ['El agua no disuelve el aceite.', { luz: [2], nota: { 2: 'distintos' } }],
        ['La gasolina sí disuelve la grasa.', { luz: [3], nota: { 3: 'semejantes' } }],
        ['Lo semejante disuelve a lo semejante.', { luz: [3] }],
      ], 'Más calor, menos gas. Lo semejante disuelve a lo semejante.'),
      xpHaz('hoja', 'Una fábrica vierte agua caliente, sin químicos, a un río y los peces sufren. Subraya por qué.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El agua caliente tiene más oxígeno.'], ['El agua caliente disuelve a los peces.'], ['En agua más caliente cabe menos oxígeno.']], pista: 'Con los gases es al revés.' }, 'Al calentarse, el río pierde oxígeno.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'En 100 g de agua caben 40 g a 20 °C y 70 g a 60 °C. Se disuelven 70 g a 60 °C y se enfría con un cristal. Pon lo disuelto y lo que se cristaliza.', { slots: fila('disuelto', 'cristales'), fichas: ['40', '30', '70', '110', '20'], meta: ['40', '30'], alto: 96, pista: 'A 20 °C solo caben los de esa temperatura.' }, '$70 - 40 = 30$ se cristalizan.')],
  ], 'Hasta cuánto, qué apura, qué aumenta y qué pasa con los gases.');
}
