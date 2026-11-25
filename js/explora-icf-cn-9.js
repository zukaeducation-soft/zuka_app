// Preicfes · Ciencias Naturales, mundo 9 «Reacciones y Cantidades» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // 2 CO + O2 → 2 CO2 con bolas: a moléculas de CO, b de O2, z de CO2.
  const C = (K, x, y) => K.c(x, y, 9, 'ff'), O = (K, x, y) => K.c(x, y, 9, 'fa');
  const bolas = (v, K) => Array.from({ length: 2 }, (_, i) => K.f(v.a - i, C(K, 40, 50 + i * 50) + O(K, 57, 50 + i * 50)) + K.f(v.z - i, O(K, 246, 50 + i * 50) + C(K, 263, 50 + i * 50) + O(K, 280, 50 + i * 50))).join('') + K.f(v.b, O(K, 118, 75) + O(K, 135, 75)) + K.l(164, 75, 206, 75, 'gr') + K.l(206, 75, 198, 69, 'gr') + K.l(206, 75, 198, 81, 'gr') + K.t(170, 150, v.t, 'ta');
  // Recetas: p de A (2 por receta), q de B (1 por receta), n recetas usadas.
  const receta = (v, K) => Array.from({ length: 8 }, (_, i) => K.c(50 + i * 32, 46, 11, i < v.n * 2 ? 'ff' : 'fa')).join('') + Array.from({ length: 5 }, (_, i) => K.r(40 + i * 32, 86, 20, 20, i < v.n ? 'ff' : 'fg', 3)).join('') + K.t(20, 22, 'A', 'b') + K.t(20, 101, 'B', 'b') + K.t(170, 150, v.t, 'ta');
  // Escala de pH con una marca.
  const escala = (v, K) => Array.from({ length: 15 }, (_, i) => K.r(21 + i * 20, 60, 18, 28, i < 7 ? 'ff' : i > 7 ? 'fg' : 'fc', 2) + K.t(30 + i * 20, 80, i, 's')).join('') + K.c(30 + v.h * 20, 44, 7, 'fF') + K.t(170, 124, v.t, 'ta');

  xpLec('icf-cn-reacciones-1', [
    ['Físico o químico',
      xpMira('hoja', 'Empecemos por la idea: en una **reacción** aparecen sustancias **nuevas**.', { paras: [['Se parte un vaso'], ['Se evapora alcohol'], ['Arde un fósforo'], ['Se pudre una fruta']] }, [
        ['El vaso roto sigue siendo vidrio.', { luz: [0], nota: { 0: 'físico' } }],
        ['El vapor sigue siendo alcohol.', { luz: [1], nota: { 1: 'físico' } }],
        ['Salen gases y ceniza: algo nuevo.', { luz: [2], nota: { 2: 'químico' } }],
        ['También aparecen sustancias nuevas.', { luz: [3], nota: { 3: 'químico' } }],
        ['Gas, color o calor son pistas, no pruebas.', {}],
      ], 'Misma sustancia: físico. Sustancia nueva: químico.'),
      xpHaz('hoja', 'Subraya el cambio **químico**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Moler café'], ['Fermentar jugo de uva'], ['Congelar agua']], pista: '¿Dónde aparece algo que no estaba?' }, 'Al fermentar aparece alcohol.')],
    ['Los átomos se reacomodan',
      xpMira('dibujo', 'Segunda idea: los átomos **no se crean ni se destruyen**.', { dib: bolas, v: { a: 1, b: 1, z: 0, t: 'CO + O₂ → CO₂' }, alto: 164 }, [
        ['Un carbono con un oxígeno, y un par de oxígenos.', {}],
        ['Si sale una molécula, sobra un oxígeno.', { z: 1, t: 'antes 3 oxígenos, después 2' }],
        ['Se pone otra molécula a la izquierda.', { a: 2, t: '2CO + O₂ → ?' }],
        ['Ahora salen dos y todo cuadra.', { z: 2, t: '2CO + O₂ → 2CO₂' }],
        ['Dos carbonos y cuatro oxígenos en cada lado.', {}],
      ], 'Los mismos átomos antes y después.'),
      xpHaz('fichas', 'Balancea: ? Na + Cl₂ → ? NaCl. Pon los dos números.', { slots: fila('Na', 'NaCl'), fichas: ['2', '2', '1', '3', '4'], meta: ['2', '2'], alto: 96, pista: 'El par de cloros necesita dos sodios.' }, '$2Na + Cl_2 \\to 2NaCl$.')],
    ['La masa no cambia',
      xpMira('fichas', 'Tercera idea: en un recipiente **cerrado** la masa es la misma.', { slots: fila('reactivos', 'sólido', 'gas'), fichas: ['50', '28', '22'], alto: 96 }, [
        ['Se calientan 50 gramos de un mineral.', { pon: { 0: '50' } }],
        ['Queda un sólido de 28 gramos.', { pon: { 1: '28' } }],
        ['Lo que falta se fue como gas.', { pon: { 2: '22' } }, '$50 - 28 = 22$'],
        ['Con tapa, la balanza no cambia.', {}],
        ['Y si se une oxígeno del aire, pesa más.', {}],
      ], 'Entra lo mismo que sale.'),
      xpHaz('fichas', 'Se queman 12 g de carbono y salen 44 g de gas. Pon el oxígeno que se unió y el total de reactivos.', { slots: fila('oxígeno', 'reactivos'), fichas: ['32', '44', '56', '12', '28'], meta: ['32', '44'], alto: 96, pista: 'Los reactivos juntos pesan lo que el gas.' }, '$44 - 12 = 32$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Una lana de acero se quema en una balanza al aire y pesa **más**. Subraya la explicación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El fuego pesa'], ['Se crearon átomos'], ['Se le unió oxígeno del aire']], pista: '¿De dónde pueden venir esos átomos?' }, 'El oxígeno que se unió ya estaba en el aire.')],
  ], 'Algo nuevo, los mismos átomos y la misma masa.');

  xpLec('icf-cn-reacciones-2', [
    ['El mol',
      xpMira('fichas', 'Empecemos por la idea: el **mol** es un paquete; su masa se **suma** con los átomos.', { slots: fila('C', 'O₂', 'CO₂'), fichas: ['12', '32', '44'], alto: 96 }, [
        ['Un mol de carbono pesa 12 gramos.', { pon: { 0: '12' } }],
        ['Dos oxígenos de 16 pesan 32.', { pon: { 1: '32' } }, '$2 \\cdot 16 = 32$'],
        ['Juntos, un mol pesa 44 gramos.', { pon: { 2: '44' } }, '$12 + 32 = 44$'],
        ['Con 88 gramos hay dos moles.', {}, '$88 \\div 44 = 2$'],
        ['Mismo número de partículas, distinta masa.', {}],
      ], 'Gramos entre masa molar: moles.'),
      xpHaz('fichas', 'Con H = 1, C = 12: pon la masa de un mol de CH₄ y los moles que hay en 48 g.', { slots: fila('un mol (g)', 'moles'), fichas: ['16', '3', '13', '4', '48'], meta: ['16', '3'], alto: 96, pista: 'Suma un carbono y cuatro hidrógenos.' }, '$12 + 4 = 16$ y $48 \\div 16 = 3$.')],
    ['La receta',
      xpMira('hoja', 'Segunda idea: los coeficientes son la **receta**, en moles.', { paras: [['2Al + 3Cl₂ → 2AlCl₃'], ['2 de Al piden 3 de Cl₂'], ['4 de Al piden 6 de Cl₂'], ['y dan 4 de AlCl₃'], ['«2 gramos piden 3 gramos»']] }, [
        ['Esta es la ecuación balanceada.', { luz: [0] }],
        ['Se lee como una receta.', { luz: [1] }],
        ['Con el doble, todo se duplica.', { luz: [2] }],
        ['También lo que sale.', { luz: [3] }],
        ['No se lee en gramos: son moles.', { luz: [4], tacha: [4] }],
      ], 'Cuántas veces se hace la receta.'),
      xpHaz('fichas', 'En 4Fe + 3O₂ → 2Fe₂O₃, con 8 moles de Fe, pon los de O₂ y los de Fe₂O₃.', { slots: fila('O₂', 'Fe₂O₃'), fichas: ['6', '4', '3', '2', '8'], meta: ['6', '4'], alto: 96, pista: '8 es el doble de 4.' }, 'Receta doble: 6 y 4.')],
    ['El que limita',
      xpMira('dibujo', 'Tercera idea: el que se **acaba primero** decide cuánto sale.', { dib: receta, v: { n: 0, t: 'cada receta: 2 de A y 1 de B' }, alto: 164 }, [
        ['Hay ocho de A y cinco de B.', {}],
        ['Cada receta gasta dos de A y uno de B.', { n: 1 }],
        ['Ya van tres recetas completas.', { n: 3 }],
        ['A la cuarta se acaba A.', { n: 4, t: 'A se acabó; sobra 1 de B' }],
        ['A limita, aunque había más de A que de B.', {}],
      ], 'Divide lo que hay entre lo que pide la receta.'),
      xpHaz('hoja', 'La receta pide 3 de P y 2 de Q. Hay 12 de P y 10 de Q. Subraya el que limita.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['P'], ['Q'], ['Ninguno']], pista: 'Cuenta cuántas recetas permite cada uno.' }, 'P permite 4 recetas; Q, 5.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Se esperaban 60 g y se obtuvieron 45 g. Pon lo que faltó y el rendimiento en %.', { slots: fila('faltó (g)', 'rendimiento'), fichas: ['15', '75', '25', '45', '133'], meta: ['15', '75'], alto: 96, pista: 'Divide lo obtenido entre lo esperado.' }, '$45 \\div 60 = 0.75$.')],
  ], 'Paquetes, receta y el que se acaba.');

  xpLec('icf-cn-reacciones-3', [
    ['La escala',
      xpMira('dibujo', 'Empecemos por la idea: el **pH** dice qué tan ácida o básica es una disolución.', { dib: escala, v: { h: 7, t: 'neutra' }, alto: 136 }, [
        ['En la mitad está el 7: neutra.', {}],
        ['El vinagre tiene cerca de 3: ácido.', { h: 3, t: 'ácida' }],
        ['Un limpiador de hornos llega a 13: básico.', { h: 13, t: 'básica' }],
        ['A menor pH, más iones H⁺.', { h: 2, t: 'muchos H⁺' }],
        ['A mayor pH, menos.', { h: 11, t: 'pocos H⁺' }],
      ], 'Menos de 7 ácida; más de 7 básica.'),
      xpHaz('dibujo', 'Arrastra la marca a un pH **neutro**.', { dib: escala, v: { h: 4, t: '' }, metas: { h: 7 }, manijas: [{ k: 'h', min: 0, max: 14, paso: 1, et: 'pH' }], alto: 190, pista: 'Es el punto medio de la escala.' }, 'El 7 es neutro.')],
    ['Por diez',
      xpMira('hoja', 'Segunda idea: cada paso de pH es **por diez**.', { paras: [['pH 6: 1 parte de H⁺'], ['pH 5: 10 partes'], ['pH 4: 100 partes'], ['«pH 4 es dos más que pH 6»']] }, [
        ['Tomemos la de pH 6 como una parte.', { luz: [0] }],
        ['Un paso más ácida: diez veces.', { luz: [1] }],
        ['Dos pasos: cien veces.', { luz: [2] }, '$10 \\cdot 10 = 100$'],
        ['No se restan: se multiplican dieces.', { luz: [3], tacha: [3] }],
        ['Pequeños cambios de pH son grandes.', {}],
      ], 'Cuenta los pasos: un diez por cada uno.'),
      xpHaz('hoja', 'P tiene pH 8 y Q, pH 5. Subraya cuántas veces más H⁺ tiene Q.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['3'], ['30'], ['1 000']], pista: 'Son tres pasos.' }, '$10 \\cdot 10 \\cdot 10$.')],
    ['Neutralizar y diluir',
      xpMira('hoja', 'Tercera idea: **neutralizar** no es lo mismo que **diluir**.', { paras: [['Ácido + base → agua + sal'], ['Ácido + agua → menos ácido'], ['Con base de más: básica'], ['Con agua de más: se acerca a 7']] }, [
        ['Los H⁺ y los OH⁻ forman agua.', { luz: [0], nota: { 0: 'neutralizar' } }],
        ['Aquí solo se reparten más.', { luz: [1], nota: { 1: 'diluir' } }],
        ['Si se pasa, cambia de lado.', { luz: [2] }],
        ['Con agua nunca cambia de lado.', { luz: [3] }],
        ['Ante un ácido fuerte, siempre con cuidado.', {}],
      ], 'Con base se puede pasar de 7; con agua, no.'),
      xpHaz('hoja', 'Pon al margen qué se hizo.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['diluir', 'neutralizar'], meta: [1, 0], paras: [['Echar bicarbonato a un jugo ácido'], ['Echarle agua al jugo ácido']], pista: 'Alguna no va ahí: ¿se agregó una base o agua?' }, 'Con base se neutraliza; con agua se diluye.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un cultivo necesita pH entre 6 y 7; el suelo tiene 8.5. Subraya lo que conviene agregar.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Cal, que es básica'], ['Un abono ácido'], ['Jabón']], pista: '¿Hacia qué lado hay que moverlo?' }, 'Está básico: hay que bajarlo con algo ácido.')],
  ], 'La escala, por diez y neutralizar.');
}
