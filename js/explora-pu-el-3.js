// Preuniversitario · pu-el-3 «Tiempo y preguntas EXCEPTO» (Explora). Textos cortos propios.
{
  // Barra de minutos: l lectura, q preguntas, r repaso; m: la pregunta difícil que se come el resto.
  const barra = (v, K) => {
    const T = v.t, X = x => 24 + 292 * x / T, tr = (a, b, cls, s) => (b - a > 0.1 ? K.r(X(a), 70, X(b) - X(a), 46, cls, 6) + (b - a > 1.6 ? K.t(X((a + b) / 2), 98, s, 's') : '') : '');
    let h = K.r(24, 70, 292, 46, 'fn', 6) + tr(0, v.l, 'fa', 'leer') + tr(v.l, v.l + v.q, 'fg', 'responder') + tr(v.l + v.q, v.l + v.q + v.r, 'fA', 'repasar') + K.f(v.m, K.r(X(v.l), 70, (X(T) - X(v.l)) * v.m, 46, 'fF', 6) + K.t(X(v.l) + (X(T) - X(v.l)) / 2, 98, 'una sola pregunta', 's'));
    for (let k = 0; k <= T; k += T > 12 ? 2 : 1) h += K.l(X(k), 120, X(k), 126, 'lm') + (k % (T > 12 ? 4 : 2) === 0 ? K.t(X(k), 142, k, 's tm') : '');
    return h + K.t(170, 46, `${T} minutos`, 's ta');
  };
  xpLec('pu-el-3', [
    ['El tiempo',
      xpMira('dibujo', 'Empecemos por la idea: el tiempo se **reparte antes** de empezar.', { dib: barra, v: { t: 18, l: 0, q: 0, r: 0, m: 0 }, alto: 160 }, [
        ['Un texto con ocho preguntas y 18 minutos para todo.', {}],
        ['Primero, una lectura completa: cinco minutos.', { l: 5 }],
        ['Después, las preguntas, volviendo siempre al texto: once minutos.', { q: 11 }],
        ['Y dos minutos para repasar las que quedaron marcadas.', { r: 2 }],
        ['El error es quedarse en una difícil: se come el tiempo de las demás.', { m: 1 }],
        ['Mejor: marcarla, seguir y volver. Y responder todas, porque fallar no resta.', { m: 0 }],
      ], 'Leer una vez, responder volviendo al texto, marcar la difícil y no dejar nada en blanco.'),
      xpHaz('dibujo', 'Tienes **12** minutos. Deja **4** para leer y **1** para repasar; lo demás es para responder. Mueve los dos deslizadores.', { dib: (v, K) => barra({ t: 12, l: v.l, q: v.q, r: 12 - v.l - v.q, m: 0 }, K), v: { l: 1, q: 3 }, alto: 260, manijas: [{ k: 'l', min: 1, max: 6, paso: 1, et: 'minutos para leer' }, { k: 'q', min: 2, max: 8, paso: 1, et: 'minutos para responder', limita: v => v.l + v.q <= 12 }], metas: { l: 4, q: 7 }, limita: v => v.l + v.q <= 12 }, 'La mayor parte del tiempo es para responder con el texto a la vista.')],
    ['Volver al párrafo',
      xpMira('hoja', 'Segunda idea: en una pregunta **EXCEPTO**, tres opciones están en el texto y una no.', { letras: ['1', '2', 'a', 'b', 'c', 'd'], paras: [['El faro se encendía con aceite y lo cuidaba una familia.'], ['Hoy funciona con energía solar y se vigila a distancia.'], ['tenía cuidadores'], ['usaba aceite'], ['recibe turistas'], ['usa energía solar']] }, [
        ['«Del faro se dice todo lo siguiente, EXCEPTO». Se subraya la palabra que manda.', {}],
        ['Tenía cuidadores: está en el párrafo 1. Se descarta.', { luz: [0, 2], tacha: [2], nota: { 2: 'párrafo 1' } }],
        ['Usaba aceite: también en el párrafo 1. Se descarta.', { luz: [0, 3], tacha: [3], nota: { 3: 'párrafo 1' } }],
        ['Energía solar: está en el párrafo 2. Se descarta.', { luz: [1, 5], tacha: [5], nota: { 5: 'párrafo 2' } }],
        ['Recibe turistas: puede ser cierto, pero el texto no lo dice.', { luz: [4], nota: { 4: 'en ninguno' } }],
        ['La que se queda sin párrafo es la respuesta.', { luz: [4] }],
      ], 'En EXCEPTO cada opción busca su párrafo. La que no lo encuentra es la respuesta.'),
      xpHaz('hoja', '«Todo lo siguiente se dice de la laguna, EXCEPTO». **Tacha** las tres opciones que sí tienen párrafo.', { modo: 'tacha', letras: ['1', '2', 'a', 'b', 'c', 'd'], quietos: [0, 1], meta: [2, 4, 5], paras: [['La laguna se alimenta de tres quebradas y en ella anidan patos.'], ['Desde hace un año está prohibido pescar.'], ['anidan aves'], ['se puede nadar'], ['recibe agua de quebradas'], ['no se puede pescar']], pista: 'Alguna de las tachadas no está en el texto. Vuelve a los párrafos 1 y 2 y busca cada una.' }, 'Que algo suene lógico no basta: tiene que estar escrito.')],
    ['La intrusa disfrazada',
      xpMira('hoja', 'Tercera idea: si la pregunta nombra **un párrafo**, solo vale lo que está ahí.', { letras: ['1', '2', 'a', 'b', 'c'], paras: [['El páramo guarda agua en su musgo y la suelta poco a poco.'], ['Las quemas y el ganado lo secan; por eso hay guardas.'], ['guarda agua'], ['hay guardas'], ['las quemas le hacen daño']] }, [
        ['«Según el párrafo 2, se dice todo, EXCEPTO». La orden nombra un párrafo.', { luz: [1] }],
        ['Que hay guardas y que las quemas dañan está ahí: se descartan.', { tacha: [3, 4], luz: [1] }],
        ['Guarda agua sí está en el texto, pero en el párrafo 1.', { luz: [0, 2], nota: { 2: 'otro párrafo' } }],
        ['Como la orden pide el 2, esa es la respuesta, aunque suene conocida.', { luz: [2] }],
        ['Ojo: «lo dice» es estar escrito; «se deduce» es tener que pensarlo con lo escrito.', { limpia: true }],
        ['Que da agua aun después de la lluvia no está escrito: se deduce de «poco a poco».', { luz: [0] }],
        ['Y una opción falsa se desmiente con una oración que diga lo contrario.', {}],
      ], 'Lo que está en otro párrafo no cuenta. Y deducir es sacar algo de lo escrito, sin inventar.'),
      xpHaz('hoja', 'Marca al margen: ¿el texto lo dice, se deduce de él o no está? El texto: «La panadería abre a las cinco; a las siete ya no hay pan».', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['no está', 'se deduce', 'lo dice'], meta: [1, 2, 0], paras: [['El pan se vende rápido.'], ['La panadería abre a las cinco.'], ['El pan es barato.']], pista: 'Alguno no va ahí. Pregúntate: ¿está escrito, sale de lo escrito o habría que inventarlo?' }, 'Escrito, deducido o inventado: tres cosas distintas.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', '«Según el **párrafo 1**, el taller hace todo lo siguiente, EXCEPTO». Subraya la respuesta.', { modo: 'toca', letras: ['1', '2', 'a', 'b', 'c'], quietos: [0, 1], meta: [3], paras: [['En el taller reparan radios viejos y enseñan a soldar.'], ['Los sábados regalan piezas sueltas a los colegios.'], ['dar clases de soldadura'], ['donar piezas'], ['arreglar aparatos']], pista: 'Esa sí está en el párrafo 1, quizá con otras palabras. Busca la que solo aparece en otro lado.' }, 'La orden manda: primero qué pide y dónde; después, las opciones.')],
  ], 'Reparte el tiempo, lee la orden, lleva cada opción a su párrafo y no dejes nada en blanco.');
}
