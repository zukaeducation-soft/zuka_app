// Preuniversitario · pu-cm-2 «Fracciones»: explicación interactiva (spec 2026-11-23-explora-leccion-interactiva; escena «barras»
// en js/explora-numeros.js). Cada capítulo abre explicando, sigue «tu turno» y el problema va al final. Los ejemplos no son los
// de los ejercicios de la lección (tabla de quintos, 6/9, entre 1/2 y 3/5, 11/12, 7/8 − 1/2, 1/3 de 3/4, 3/5 = 21, 1/4 + 2/3…).
EXPLORA['pu-cm-2'] = {
  caps: ['Partes iguales', 'Fracciones equivalentes', 'Comparar y sumar', 'La fracción de una cantidad', 'Ahora sí, un problema'],
  pasos: [
    // ---- Partes iguales ----
    { cap: 0, tipo: 'muestra', escena: 'barras', en: {},
      texto: 'Mira esta barra: con ella vas a descubrir **qué es una fracción**.',
      momentos: [
        { barras: [{ n: 0, d: 1 }], dice: 'Está entera, todavía sin cortar. Una fracción aparece cuando la partimos en pedazos iguales.' },
        { barras: [{ n: 0, d: 8 }], dice: 'Aquí la cortamos en 8. Ese número se escribe abajo y se llama **denominador**.' },
        { barras: [{ n: 3, d: 8 }], cuenta: '$\\tfrac38$', dice: 'Si tomamos 3 pedazos, el 3 va arriba: es el **numerador**. Tenemos tres octavos.' },
        { barras: [{ n: 8, d: 8 }], cuenta: '$\\tfrac88 = 1$', dice: '¿Y si los tomamos todos? Volvemos a la barra completa: ocho octavos son 1.' },
        { barras: [{ n: 3, d: 8 }], cuenta: '$\\tfrac38$', dice: 'Eso sí, los pedazos deben ser iguales; con uno más grande, no sabríamos cuánto es tres octavos.' },
      ],
      idea: 'El denominador dice en cuántas partes **iguales** se corta; el numerador, cuántas se toman.' },
    { cap: 0, tipo: 'barras', meta: [4, 7], d: 7,
      texto: '**Tu turno.** Esta barra viene cortada en séptimos. Arrastra sobre ella hasta tomar cuatro.',
      idea: 'Cuatro de siete partes iguales: $\\tfrac47$.' },

    // ---- Fracciones equivalentes ----
    { cap: 1, tipo: 'muestra', escena: 'barras', en: {},
      texto: 'Dos fracciones pueden verse muy distintas y valer **la misma cantidad**. Fíjate.',
      momentos: [
        { barras: [{ n: 1, d: 2, label: '1/2' }], cuenta: '$\\tfrac12$', dice: 'Aquí tenemos media barra, o sea, un medio.' },
        { barras: [{ n: 1, d: 2, label: '1/2' }, { n: 2, d: 4, label: '2/4' }], cuenta: '$\\tfrac12 = \\tfrac24$',
          dice: 'Cortamos cada mitad en dos. Ahora son dos cuartos, pero ¡mide exactamente lo mismo!' },
        { barras: [{ n: 1, d: 2, label: '1/2' }, { n: 2, d: 4, label: '2/4' }, { n: 4, d: 8, label: '4/8' }], cuenta: '$\\tfrac12 = \\tfrac24 = \\tfrac48$',
          dice: 'Otro corte más y quedan cuatro octavos. Multiplicar arriba y abajo por lo mismo no cambia el valor.' },
        { barras: [{ n: 10, d: 12, label: '10/12' }, { n: 5, d: 6, label: '5/6' }], cuenta: '$\\tfrac{10}{12} = \\tfrac56$',
          dice: 'Simplificar es devolverse: si dividimos arriba y abajo entre 2, diez doceavos se vuelven cinco sextos.' },
      ],
      idea: 'Multiplicar o dividir arriba y abajo por el mismo número da una fracción **equivalente**: la misma cantidad.' },
    { cap: 1, tipo: 'barras', meta: [1, 3], d: 3, cortar: true, dpide: 12,
      texto: '**Tu turno.** ¿Cómo se vería un tercio en una barra de 12 pedazos? Córtala con la regla de abajo y llénala.',
      idea: 'Un tercio son cuatro doceavos: $\\tfrac13 = \\tfrac{4}{12}$.' },

    // ---- Comparar y sumar ----
    { cap: 2, tipo: 'muestra', escena: 'barras', en: {},
      texto: 'Para comparar o sumar fracciones hay un truco: usar **partes del mismo tamaño**.',
      momentos: [
        { barras: [{ n: 5, d: 6, label: '5/6' }, { n: 4, d: 5, label: '4/5' }], dice: '¿Cuál es mayor, 5/6 o 4/5? A simple vista cuesta decidir, porque los pedazos no miden igual.' },
        { barras: [{ n: 25, d: 30, label: '25/30' }, { n: 24, d: 30, label: '24/30' }], cuenta: '$\\tfrac56 = \\tfrac{25}{30} \\quad \\tfrac45 = \\tfrac{24}{30}$',
          dice: 'Cortemos las dos barras en treinta partes iguales. Ahora basta con contar: 25 contra 24.' },
        { barras: [{ n: 25, d: 30, label: '25/30' }, { n: 24, d: 30, label: '24/30' }], cuenta: '$\\tfrac56 > \\tfrac45$',
          dice: 'Gana 5/6, por muy poquito. Un atajo es multiplicar en cruz: 5 por 5 da 25, y 4 por 6 da 24.' },
        { barras: [{ n: 1, d: 2, label: '1/2' }, { n: 1, d: 3, label: '1/3' }], cuenta: '$\\tfrac12 + \\tfrac13$',
          dice: 'Con la suma ocurre igual: un medio y un tercio no se pueden juntar así, porque son pedazos distintos.' },
        { barras: [{ n: 3, d: 6, label: '3/6' }, { n: 2, d: 6, label: '2/6' }, { n: 5, d: 6, label: '5/6' }], cuenta: '$\\tfrac36 + \\tfrac26 = \\tfrac56$',
          dice: 'En sextos sale fácil: tres más dos, cinco sextos. Sumar arriba y abajo daría 2/5, y eso está mal.' },
      ],
      idea: 'Para comparar o sumar, primero partes del mismo tamaño (el mismo denominador); luego se cuentan.' },
    { cap: 2, tipo: 'barras', meta: [7, 10], d: 2, cortar: true,
      texto: '**Tu turno.** Suma un medio y un quinto. Busca un corte en el que quepan los dos y llena el resultado.',
      idea: 'En décimos: $\\tfrac12 + \\tfrac15 = \\tfrac{5}{10} + \\tfrac{2}{10} = \\tfrac{7}{10}$.' },

    // ---- La fracción de una cantidad ----
    { cap: 3, tipo: 'muestra', escena: 'barras', en: {},
      texto: 'Ahora la barra va a valer algo. Así se calcula **la fracción de una cantidad**.',
      momentos: [
        { barras: [{ n: 0, d: 1, total: 20 }], dice: 'Imagina que son 20 dulces y quieres tres cuartos. ¿Cuántos te tocan?' },
        { barras: [{ n: 0, d: 4, total: 20 }], cuenta: '$20 \\div 4 = 5$', dice: 'Los repartimos en 4 grupos iguales: quedan 5 en cada uno.' },
        { barras: [{ n: 3, d: 4, total: 20 }], cuenta: '$\\tfrac34 \\text{ de } 20 = 3 \\cdot 5 = 15$',
          dice: 'Tomas 3 grupos: son 15 dulces. Dividimos entre el de abajo y multiplicamos por el de arriba.' },
        { barras: [{ n: 3, d: 4, total: 20 }], cuenta: '$\\tfrac34 \\cdot 20 = \\tfrac{60}{4} = 15$',
          dice: 'Si prefieres, multiplica primero y divide después: llegas al mismo resultado.' },
      ],
      idea: 'La fracción de una cantidad: se divide entre el denominador y se multiplica por el numerador.' },
    { cap: 3, tipo: 'barras', meta: [5, 6], d: 6, total: 42,
      texto: '**Tu turno.** En un viaje de 42 km ya recorriste cinco sextos. Marca esa parte y descubre cuántos kilómetros llevas.',
      idea: 'Cada sexto son 7 km: $\\tfrac56 \\text{ de } 42 = 35$.' },

    // ---- Ahora sí, un problema ----
    { cap: 4, tipo: 'barras', meta: [2, 3], d: 1, cortar: true, total: 24,
      texto: 'Ana se lleva dos tercios de una cinta de 24 m. Corta la cinta y toma su parte: ¿cuántos metros le tocan?',
      idea: 'Cada tercio son 8 m: Ana se lleva $\\tfrac23 \\text{ de } 24 = 16$ m.' },
    { cap: 4, tipo: 'cierre', clave: 'pu-cm-2', real: '',
      texto: 'Eso es todo lo que construiste. Con estas ideas ya puedes con los ejercicios.',
      idea: 'Partes iguales, fracciones equivalentes, comparar y sumar con el mismo denominador, y la fracción de una cantidad.' },
  ],
};
