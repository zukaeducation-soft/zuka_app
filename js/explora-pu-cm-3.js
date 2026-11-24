// Preuniversitario · pu-cm-3 «Decimales y porcentajes»: explicación interactiva (spec 2026-11-23-explora-leccion-interactiva;
// escena «cien» en js/explora-numeros.js). Los ejemplos no son los de los ejercicios de la lección (2/5, 0.625, 5/6, 21 de 60,
// 75 % de 16, 15 % de 40, 25 % de 120, 3/5, el 80 % y el 45 % de una elección, el tanque con 14 litros…).
EXPLORA['pu-cm-3'] = {
  caps: ['De cada 100', 'Fracción, decimal y porcentaje', 'El porcentaje de una cantidad', 'Subir y bajar', 'Ahora sí, un problema'],
  pasos: [
    // ---- De cada 100 ----
    { cap: 0, tipo: 'muestra', escena: 'cien', en: {},
      texto: 'Empecemos por la idea: **por ciento** quiere decir «de cada 100».',
      momentos: [
        { k: 0, dice: 'Esta cuadrícula tiene 100 casillas. Ella entera es el total.' },
        { k: 30, cuenta: '$30\\,\\%$', dice: 'Pintamos 30 de las 100 casillas: eso es el 30 por ciento.' },
        { k: 100, cuenta: '$100\\,\\% = 1$', dice: 'Si se pinta todo, es el 100 %: el total completo, ni más ni menos.' },
        { k: 50, cuenta: '$50\\,\\% = \\tfrac12$', dice: 'El 50 % es la mitad: 50 de las 100 casillas.' },
      ],
      idea: 'Por ciento es «de cada 100»: el $100\\,\\%$ es el total.' },
    { cap: 0, tipo: 'cien', meta: 45,
      texto: '**Tu turno.** Pinta el 45 %: arrastra sobre la cuadrícula.',
      idea: '45 de cada 100 casillas: $45\\,\\%$.' },

    // ---- Fracción, decimal y porcentaje ----
    { cap: 1, tipo: 'muestra', escena: 'cien', en: {},
      texto: 'Segunda idea: una misma cantidad se escribe de **tres formas**.',
      momentos: [
        { k: 20, cuenta: '$\\tfrac15 = \\tfrac{20}{100} = 20\\,\\%$', dice: 'Un quinto del total son 20 de las 100 casillas: el 20 %.' },
        { k: 20, cuenta: '$20\\,\\% = 0.20$', dice: 'Como decimal son 20 centésimas: 0.20. Fracción, decimal y porcentaje dicen lo mismo.' },
        { k: 36, cuenta: '$\\tfrac{9}{25} = \\tfrac{36}{100} = 36\\,\\%$', dice: 'Para pasar una fracción a porcentaje se lleva a centésimas: 9/25 son 36/100, el 36 %.' },
        { k: 36, cuenta: '$9 \\div 25 = 0.36$', dice: 'O se divide arriba entre abajo: 9 entre 25 da 0.36. Correr el punto dos lugares da el porcentaje.' },
      ],
      idea: 'Fracción, decimal y porcentaje son tres formas de lo mismo: $\\tfrac15 = 0.2 = 20\\,\\%$.' },
    { cap: 1, tipo: 'cien', meta: 65,
      texto: '**Tu turno.** Pinta trece veinteavos de la cuadrícula. ¿Qué porcentaje es?',
      idea: '$\\tfrac{13}{20} = \\tfrac{65}{100} = 65\\,\\%$.' },

    // ---- El porcentaje de una cantidad ----
    { cap: 2, tipo: 'muestra', escena: 'cien', en: {},
      texto: 'Tercera idea: **el porcentaje de una cantidad**. Ahora la cuadrícula vale 50 000 pesos.',
      momentos: [
        { k: 100, cuenta: '$50\\,000 \\div 100 = 500$', dice: 'Si toda la cuadrícula son 50 000 pesos, cada casilla vale 500.' },
        { k: 10, cuenta: '$10\\,\\% \\text{ de } 50\\,000 = 5\\,000$', dice: 'El 10 % son 10 casillas: 5 000 pesos. Atajo: el 10 % corre el punto un lugar.' },
        { k: 15, cuenta: '$15\\,\\% = 5\\,000 + 2\\,500 = 7\\,500$', dice: 'El 15 % se arma por pedazos: el 10 % más su mitad, el 5 %.' },
        { k: 15, cuenta: '$0.15 \\cdot 50\\,000 = 7\\,500$', dice: 'O de una vez: el porcentaje en decimal por la cantidad.' },
      ],
      idea: 'El porcentaje de una cantidad: el porcentaje en decimal por la cantidad. El $10\\,\\%$ corre el punto.' },
    { cap: 2, tipo: 'cien', meta: 30, total: 240,
      texto: '**Tu turno.** La cuadrícula vale 240. Pinta el 30 % y mira cuánto es.',
      idea: '$0.30 \\cdot 240 = 72$.' },

    // ---- Subir y bajar ----
    { cap: 3, tipo: 'muestra', escena: 'cien', en: {},
      texto: 'Última idea: **subir y bajar** un porcentaje es multiplicar.',
      momentos: [
        { k: 100, dice: 'Un precio de 200 000 baja un 20 %. Se quitan 20 de cada 100 casillas.' },
        { k: 100, quita: 20, cuenta: '$200\\,000 \\cdot 0.8 = 160\\,000$', dice: 'Queda el 80 %: bajar un 20 % es multiplicar por 0.8.' },
        { k: 80, cuenta: '$\\times 1.1$', dice: 'Ahora el nuevo precio sube un 10 %. Ese 10 % se calcula sobre el nuevo, no sobre el viejo.' },
        { k: 88, cuenta: '$0.8 \\cdot 1.1 = 0.88$', dice: 'Suben 8 casillas, el 10 % de 80. Queda el 88 %: bajar 20 y subir 10 no es bajar 10.' },
      ],
      idea: 'Bajar un porcentaje es multiplicar por menos de 1; subir, por más de 1. Los cambios seguidos se multiplican.' },
    { cap: 3, tipo: 'cien', meta: 60, k: 100,
      texto: '**Tu turno.** Una batería llena pierde el 40 % de su carga. Deja pintado solo lo que queda.',
      idea: 'Perder el $40\\,\\%$ deja el $60\\,\\%$: se multiplica por $0.6$.' },

    // ---- Ahora sí, un problema ----
    { cap: 4, tipo: 'cien', meta: 55, total: 600,
      texto: 'De 600 hinchas en el estadio, el 55 % llevaba la camiseta local. La cuadrícula son los 600: pinta ese porcentaje. ¿Cuántos son?',
      idea: 'Cada casilla son 6 hinchas: $0.55 \\cdot 600 = 330$.' },
    { cap: 4, tipo: 'cierre', clave: 'pu-cm-3', real: '',
      texto: 'Eso es todo lo que construiste. Con estas ideas ya puedes con los ejercicios.',
      idea: 'De cada 100, las tres formas de escribirlo, el porcentaje de una cantidad y subir o bajar multiplicando.' },
  ],
};
