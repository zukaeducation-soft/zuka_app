// Preicfes · Ciencias Naturales, mundo 7 «Átomo y Enlaces» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Átomo: p protones, n neutrones, e electrones repartidos en capas 2 y 8.
  const atomo = (v, K) => { const e = Math.round(v.e), cap = [Math.min(2, e), Math.max(0, e - 2)], nuc = Math.round(v.p) + Math.round(v.n); return K.c(170, 92, 78, 'fn') + K.c(170, 92, 48, 'fn') + Array.from({ length: nuc }, (_, i) => K.c(170 + 5 * Math.sqrt(i) * Math.cos(i * 2.4), 92 + 5 * Math.sqrt(i) * Math.sin(i * 2.4), 5, i < Math.round(v.p) ? 'fF' : 'fk')).join('') + cap.map((m, k) => Array.from({ length: m }, (_, i) => { const [x, y] = K.at(170, 92, [48, 78][k], 90 + 360 * i / m); return K.c(x, y, 5, 'fA'); }).join('')).join('') + K.t(170, 194, v.t || '', 'ta'); };
  // Dos átomos: electrón que pasa (t de 0 a 1), o se comparte (s).
  const par = (v, K) => K.c(110, 90, 44, 'fn') + K.c(230, 90, 44, 'fn') + K.t(110, 95, v.a, 'b') + K.t(230, 95, v.b, 'b') + (v.mar > 0.5 ? Array.from({ length: 10 }, (_, i) => K.c(60 + i * 24, i % 2 ? 60 : 120, 4, 'fA')).join('') : v.s > 0.01 ? K.c(170 + v.k, 82, 5, 'fA') + K.c(170 + v.k, 98, 5, 'fG') : K.c(154 + v.x * 32, 90, 6, 'fA')) + K.t(170, 168, v.t || '', 'ta');

  xpLec('icf-cn-atomo-1', [
    ['Tres partículas',
      xpMira('dibujo', 'Empecemos por la idea: el **núcleo** tiene protones y neutrones; alrededor, electrones.', { dib: atomo, v: { p: 6, n: 6, e: 6, t: '' }, alto: 202 }, [
        ['Seis protones en el centro: es carbono.', { t: '6 protones' }],
        ['Con los neutrones, la masa es doce.', { t: 'masa 12' }, '$6 + 6 = 12$'],
        ['Seis electrones: está neutro.', { t: 'neutro' }],
        ['Con siete protones ya sería nitrógeno.', { p: 7, e: 7, t: '7 protones' }],
        ['Los protones mandan: deciden el elemento.', {}],
      ], 'Protones: qué elemento es. Masa: protones más neutrones.'),
      xpHaz('fichas', 'Un átomo neutro tiene 9 protones y masa 19. Pon sus neutrones y sus electrones.', { slots: fila('neutrones', 'electrones'), fichas: ['10', '9', '19', '28', '8'], meta: ['10', '9'], alto: 96, pista: 'Resta los protones a la masa; neutro tiene iguales cargas.' }, '$19 - 9 = 10$; neutro: 9.')],
    ['Isótopos e iones',
      xpMira('dibujo', 'Segunda idea: cambian **neutrones**, isótopo; cambian **electrones**, ion.', { dib: atomo, v: { p: 3, n: 4, e: 3, t: 'litio' }, alto: 202 }, [
        ['Litio: tres protones, cuatro neutrones, tres electrones.', {}],
        ['Con un neutrón menos, es un isótopo.', { n: 3, t: 'litio 6' }],
        ['Sigue siendo litio: tiene tres protones.', {}],
        ['Si pierde un electrón, es un ion.', { n: 4, e: 2, t: 'carga +1' }, '$3 - 2 = +1$'],
        ['El núcleo no cambió.', {}],
      ], 'Isótopo: otros neutrones. Ion: otros electrones.'),
      xpHaz('hoja', 'Pon al margen qué es, comparado con oxígeno neutro (8 p, 8 n, 8 e).', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['ion', 'otro elemento', 'isótopo'], meta: [2, 0, 1], paras: [['8 p, 10 n, 8 e'], ['8 p, 8 n, 10 e'], ['9 p, 10 n, 9 e']], pista: 'Alguna no va ahí: mira qué número cambió.' }, 'Neutrones, electrones o protones.')],
    ['La tabla',
      xpMira('hoja', 'Tercera idea: la **tabla** ordena por protones y agrupa a los parecidos.', { paras: [['Grupo: columna, se parecen'], ['Periodo: fila'], ['Al bajar: más capas, más grande'], ['Al avanzar: más atracción, más pequeño'], ['Izquierda: metales. Derecha: no metales']] }, [
        ['Los de una columna tienen iguales electrones externos.', { luz: [0], nota: { 0: 'se parecen' } }],
        ['Cada fila es un periodo.', { luz: [1] }],
        ['Al bajar, el átomo crece.', { luz: [2], nota: { 2: 'crece' } }],
        ['Al avanzar, en general se encoge.', { luz: [3], nota: { 3: 'se encoge' } }],
        ['Unos pierden electrones y otros los ganan.', { luz: [4] }],
      ], 'Grupo: se parecen. Bajar: crece. Avanzar: se encoge.'),
      xpHaz('hoja', 'Litio, sodio y potasio están en la misma columna, de arriba abajo. Subraya el más **grande**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Litio'], ['Sodio'], ['Potasio']], pista: 'Al bajar hay más capas.' }, 'El de más abajo tiene más capas.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'El ion de azufre tiene 16 protones y 18 electrones; su masa es 32. Pon la carga y los neutrones.', { slots: fila('carga', 'neutrones'), fichas: ['−2', '16', '+2', '14', '18'], meta: ['−2', '16'], alto: 96, pista: 'Compara protones con electrones; resta protones a la masa.' }, '$16 - 18 = -2$ y $32 - 16 = 16$.')],
  ], 'Protones identifican; neutrones y electrones varían; la tabla ordena.');

  xpLec('icf-cn-atomo-2', [
    ['Entregar',
      xpMira('dibujo', 'Empecemos por la idea: en el enlace **iónico** un metal entrega electrones.', { dib: par, v: { a: 'Na', b: 'Cl', x: 0, s: 0, k: 0, mar: 0, t: '' }, alto: 178 }, [
        ['El sodio tiene un electrón suelto.', {}],
        ['Se lo entrega al cloro.', { x: 1, t: 'pasa un electrón' }],
        ['Quedan con cargas opuestas y se atraen.', { a: 'Na⁺', b: 'Cl⁻', t: '+1 y −1' }],
        ['Forman una red dura que se funde muy caliente.', {}],
        ['Disuelta, sus iones se mueven y conduce.', { t: 'disuelta conduce' }],
      ], 'Iónico: metal con no metal, red dura, conduce disuelto.'),
      xpHaz('hoja', 'Subraya la sustancia con enlace **iónico**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Oxígeno del aire (O₂)'], ['Bromuro de potasio (KBr)'], ['Cobre (Cu)']], pista: 'Busca un metal con un no metal.' }, 'El potasio es metal y el bromo, no metal.')],
    ['Compartir',
      xpMira('dibujo', 'Segunda idea: en el **covalente** dos no metales comparten.', { dib: par, v: { a: 'O', b: 'O', x: 0, s: 1, k: 0, mar: 0, t: '' }, alto: 178 }, [
        ['Los dos jalan igual: están en el medio.', { t: 'apolar' }],
        ['Si uno jala más, quedan más cerca de él.', { a: 'H', k: 22, t: 'polar' }],
        ['Un lado queda un poco negativo.', {}],
        ['Así es el agua: por eso disuelve la sal.', {}],
        ['Muchas covalentes se funden fácil y no conducen.', { t: 'no conduce' }],
      ], 'Covalente: comparten. Igual, apolar; desigual, polar.'),
      xpHaz('hoja', 'Pon al margen el enlace.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['polar', 'apolar'], meta: [1, 0], paras: [['Dos átomos iguales comparten'], ['Uno atrae más los electrones']], pista: 'Alguna no va ahí: ¿jalan igual?' }, 'Igual, apolar; desigual, polar.')],
    ['Un mar',
      xpMira('dibujo', 'Tercera idea: en el **metálico** los electrones se mueven por toda la pieza.', { dib: par, v: { a: 'Cu', b: 'Cu', x: 0, s: 0, k: 0, mar: 1, t: '' }, alto: 178 }, [
        ['Los electrones externos quedan sueltos.', { t: 'mar de electrones' }],
        ['Por eso conduce electricidad y calor.', {}],
        ['Y conduce aunque esté sólido.', { t: 'conduce sólido' }],
        ['Y se dobla: las capas se deslizan.', {}],
        ['La sal, en cambio, se parte.', {}],
      ], 'Metálico: conduce sólido y se dobla.'),
      xpHaz('hoja', 'Subraya la prueba que distingue un **metal** de una sal.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Si conduce estando sólido'], ['Si es blanco o gris'], ['Si cabe en un frasco']], pista: 'La sal sólida no conduce.' }, 'Solo el metal conduce sólido.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'El calcio pierde 2 electrones y el flúor gana 1. Pon la carga del calcio y cuántos flúor hacen falta.', { slots: fila('calcio', 'flúor'), fichas: ['+2', '2', '−2', '1', '+1'], meta: ['+2', '2'], alto: 96, pista: 'Las cargas deben sumar cero.' }, '$+2 - 1 - 1 = 0$: dos flúor.')],
  ], 'Entregar, compartir o soltar: se nota en las propiedades.');
}
