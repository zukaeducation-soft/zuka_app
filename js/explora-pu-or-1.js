// Preuniversitario · pu-or-1 «Orden en línea» (Explora, escena «fichas»). Los ejemplos no son los de los ejercicios.
{
  const fila = (n, y = 100) => Array.from({ length: n }, (_, i) => ({ x: 170 + (i - (n - 1) / 2) * (n > 4 ? 66 : 78), y, w: n > 4 ? 62 : 72, et: String(i + 1) }));
  const pistas = (...l) => K => l.map((t, i) => K.t(170, 20 + i * 18, t, 's')).join('');

  xpLec('pu-or-1', [
    ['Dibuja la fila',
      xpMira('fichas', 'Empecemos por la idea: las pistas de orden se **dibujan**, no se memorizan.', { slots: fila(4), fichas: ['Ana', 'Leo', 'Mar', 'Pol'], alto: 150,
        fondo: (K, v) => K.t(170, 22, v.p || '', 'ta') }, [
        ['Cuatro personas hacen fila. Dibujamos cuatro casillas: la 1 es la primera.', { v: { p: '' } }],
        ['Primero las pistas firmes, las que dicen un puesto exacto: «Mar es la tercera».', { v: { p: 'Mar es la tercera' }, pon: { 2: 'Mar' } }],
        ['«Leo está justo detrás de Mar»: justo detrás es la casilla siguiente.', { v: { p: 'Leo está justo detrás de Mar' }, pon: { 3: 'Leo' } }],
        ['Quedan Ana y Pol. «Ana está antes que Pol»: antes no quiere decir pegada, solo más adelante.', { v: { p: 'Ana está antes que Pol' }, pon: { 0: 'Ana' } }],
        ['Y Pol ocupa el único lugar libre. La fila quedó armada.', { pon: { 1: 'Pol' }, v: { p: 'Ana · Pol · Mar · Leo' } }],
      ], 'Dibuja casillas numeradas y pon primero las pistas que dicen un puesto exacto.'),
      xpHaz('fichas', 'Ordena cuatro libros en el estante con estas pistas.', { slots: fila(4, 112), fichas: ['rojo', 'azul', 'verde', 'negro'], meta: ['verde', 'rojo', 'azul', 'negro'], alto: 158,
        fondo: pistas('El verde va en el puesto 1.', 'El negro es el último de la derecha.', 'El rojo está antes que el azul.'), pista: 'Empieza por el verde y el negro: dicen un puesto exacto.' }, 'Con el verde y el negro fijos, solo el rojo puede ir antes que el azul.')],
    ['Bloques que viajan juntos',
      xpMira('fichas', 'Segunda idea: lo que va **pegado** viaja como un bloque.', { slots: fila(5), fichas: ['Eva', 'Flor', 'Gus', 'Hugo', 'Inés'], alto: 150, fondo: (K, v) => K.t(170, 22, v.p || '', 'ta') }, [
        ['Cinco puestos. «Flor está justo después de Eva»: son un bloque, Eva-Flor.', { v: { p: 'bloque Eva–Flor' } }],
        ['«Gus está en el centro.» El bloque no cabe partido: va antes o después de Gus.', { v: { p: 'Gus está en el centro' }, pon: { 2: 'Gus' } }],
        ['Probamos el bloque a la izquierda.', { pon: { 0: 'Eva', 1: 'Flor' }, marca: [0, 1] }],
        ['Pero falta otra pista: «Hugo es el primero». Choca. El bloque debe ir a la derecha.', { saca: [0, 1], v: { p: 'Hugo es el primero' }, pon: { 0: 'Hugo', 3: 'Eva', 4: 'Flor' } }],
        ['Inés toma el lugar que queda: la segunda.', { pon: { 1: 'Inés' } }],
      ], 'Junta en un bloque lo que va pegado y busca dónde cabe entero.'),
      xpHaz('fichas', 'Cinco camisetas cuelgan en fila. Cuélgalas con las pistas.', { slots: fila(5, 130), fichas: ['A', 'B', 'C', 'D', 'E'], meta: ['E', 'C', 'A', 'B', 'D'], alto: 176,
        fondo: pistas('C es la segunda.', 'B va justo después de A.', 'D es la última.', 'E está antes que A.'), pista: 'Con C en el 2 y D en el 5, ¿dónde cabe entero el bloque A-B?' }, 'Con C en el 2 y D en el 5, el bloque A-B solo cabe en 3-4, y E queda de primera.')],
    ['Probar y descartar',
      xpMira('fichas', 'Tercera idea: si quedan dos caminos, se **prueba** cada uno hasta que uno choque.', { slots: fila(4), fichas: ['Sol', 'Tito', 'Leo', 'Ana'], alto: 150, fondo: (K, v) => K.t(170, 22, v.p || '', v.mal ? 'tf' : 'ta') }, [
        ['Sol es la primera, Leo va justo delante de Ana, y Tito no es el último.', { pon: { 0: 'Sol' }, v: { p: 'Tito no es el último', mal: 0 } }],
        ['Tito puede ser el segundo o el tercero. Probemos el tercero.', { pon: { 2: 'Tito' }, marca: [2] }],
        ['Leo y Ana quedarían en 2 y 4, separados por Tito. Choca: ese camino se borra.', { pon: { 1: 'Leo', 3: 'Ana' }, v: { p: 'Leo y Ana deben ir pegados', mal: 1 } }],
        ['Entonces Tito es el segundo, y Leo con Ana quedan al final. Todo cumple.', { saca: [1, 2, 3], v: { p: 'Sol · Tito · Leo · Ana', mal: 0 } , pon: { 1: 'Tito', 2: 'Leo', 3: 'Ana' } }],
      ], 'Con dos posibilidades, supón una; si choca con una pista, la otra es la verdadera.'),
      xpHaz('fichas', 'Cuatro carros están parqueados del 1 al 4. Ubícalos.', { slots: fila(4, 112), fichas: ['rojo', 'gris', 'blanco', 'negro'], meta: ['blanco', 'negro', 'gris', 'rojo'], alto: 158,
        fondo: pistas('El blanco está justo a la izquierda del negro.', 'El gris no está en una punta.', 'El rojo no está en el 1.'), pista: 'Prueba el bloque blanco-negro en 1-2, en 2-3 y en 3-4.' }, 'En 2-3 el gris caería en una punta; en 3-4 el rojo caería en el 1. Solo queda 1-2.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Una línea de metro tiene cinco estaciones. Ponlas en orden con las pistas.', { slots: fila(5, 130), fichas: ['Sol', 'Río', 'Faro', 'Luna', 'Prado'], meta: ['Sol', 'Prado', 'Río', 'Faro', 'Luna'], alto: 176,
        fondo: pistas('Río queda en el centro.', 'Prado está justo antes de Río.', 'Luna es la última.', 'Sol está antes que Faro.'), pista: 'Pon primero Río y Luna, que dicen un puesto exacto.' }, 'Fijas Río y Luna, pegas Prado a Río, y los dos puestos que quedan los decide «Sol antes que Faro».')],
  ], 'Casillas numeradas, pistas firmes primero, bloques pegados y probar hasta que un camino choque.');
}
