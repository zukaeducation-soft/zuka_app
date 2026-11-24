// Preuniversitario · pu-cm-3 «Decimales y porcentajes»: explicación interactiva (spec 2026-11-23-explora-leccion-interactiva;
// escena «cien» en js/explora-numeros.js). Los ejemplos no son los de los ejercicios de la lección (2/5, 0.625, 5/6, 21 de 60,
// 75 % de 16, 15 % de 40, 25 % de 120, 3/5, el 80 % y el 45 % de una elección, el tanque con 14 litros…).
EXPLORA['pu-cm-3'] = {
  caps: ['De cada 100', 'Fracción, decimal y porcentaje', 'El porcentaje de una cantidad', 'Subir y bajar', 'Ahora sí, un problema'],
  pasos: [
    // ---- De cada 100 ----
    { cap: 0, tipo: 'muestra', escena: 'cien', en: {},
      texto: '¿Qué significa **por ciento**? Significa «de cada 100», y aquí lo vas a ver.',
      momentos: [
        { k: 0, dice: 'Esta cuadrícula tiene 100 casillas y todas juntas forman el total.' },
        { k: 30, cuenta: '$30\\,\\%$', dice: 'Si pintamos 30, tenemos el 30 por ciento. Así de simple.' },
        { k: 100, cuenta: '$100\\,\\% = 1$', dice: 'Cuando se pintan todas llegamos al 100 %, que es el total completo.' },
        { k: 50, cuenta: '$50\\,\\% = \\tfrac12$', dice: 'Y con 50 casillas pintadas queda justo la mitad: el 50 %.' },
      ],
      idea: 'Por ciento es «de cada 100»: el $100\\,\\%$ es el total.' },
    { cap: 0, tipo: 'cien', meta: 45,
      texto: '**Tu turno.** Ahora pinta el 45 %, arrastrando sobre la cuadrícula.',
      idea: '45 de cada 100 casillas: $45\\,\\%$.' },

    // ---- Fracción, decimal y porcentaje ----
    { cap: 1, tipo: 'muestra', escena: 'cien', en: {},
      texto: 'Lo curioso es que una misma cantidad se puede escribir de **tres formas**.',
      momentos: [
        { k: 20, cuenta: '$\\tfrac15 = \\tfrac{20}{100} = 20\\,\\%$', dice: 'Un quinto de la cuadrícula ocupa 20 casillas, o sea, el 20 %.' },
        { k: 20, cuenta: '$20\\,\\% = 0.20$', dice: 'También son 20 centésimas. Con decimales se escribe 0.20, que es lo mismo que 0.2.' },
        { k: 36, cuenta: '$\\tfrac{9}{25} = \\tfrac{36}{100} = 36\\,\\%$', dice: '¿Y si son 9 de cada 25? Multiplicamos los dos números por 4 y quedan 36 de cada 100: el 36 %.' },
        { k: 36, cuenta: '$9 \\div 25 = 0.36$', dice: 'Dividir también sirve: 9 entre 25 da 0.36. Corremos el punto dos lugares y sale 36 %.' },
      ],
      idea: 'Fracción, decimal y porcentaje son tres formas de lo mismo: $\\tfrac15 = 0.2 = 20\\,\\%$.' },
    { cap: 1, tipo: 'cien', meta: 65,
      texto: '**Tu turno.** Intenta pintar 13 de cada 20 casillas de la cuadrícula. ¿Qué porcentaje es?',
      idea: '$\\tfrac{13}{20} = \\tfrac{65}{100} = 65\\,\\%$.' },

    // ---- El porcentaje de una cantidad ----
    { cap: 2, tipo: 'muestra', escena: 'cien', en: {},
      texto: 'Veamos cómo sacar **el porcentaje de una cantidad**. Digamos que la cuadrícula vale 50 000 pesos.',
      momentos: [
        { k: 100, cuenta: '$50\\,000 \\div 100 = 500$', dice: 'Repartimos ese dinero entre las 100 casillas, y a cada una le tocan 500 pesos.' },
        { k: 10, cuenta: '$10\\,\\% \\text{ de } 50\\,000 = 5\\,000$', dice: 'Para el 10 % tomamos 10 casillas: 5 000 pesos. Es la décima parte del total.' },
        { k: 15, cuenta: '$15\\,\\% = 5\\,000 + 2\\,500 = 7\\,500$', dice: 'Con eso armamos el 15 %: al 10 % le sumamos su mitad, el 5 %. Son 7 500 pesos.' },
        { k: 15, cuenta: '$0.15 \\cdot 50\\,000 = 7\\,500$', dice: 'Hay un camino directo: escribir el porcentaje como decimal y multiplicarlo por la cantidad.' },
        { k: 25, cuenta: '$12 \\div 48 = 0.25 = 25\\,\\%$', dice: 'Al revés también funciona. ¿Qué porcentaje es 12 de 48? Dividimos 12 entre 48: da 0.25, el 25 %.' },
      ],
      idea: 'El porcentaje de una cantidad: el porcentaje en decimal por la cantidad. El $10\\,\\%$ corre el punto.' },
    { cap: 2, tipo: 'cien', meta: 30, total: 240,
      texto: '**Tu turno.** Esta vez la cuadrícula vale 240. Pinta el 30 % y mira cuánto es.',
      idea: '$0.30 \\cdot 240 = 72$.' },

    // ---- Subir y bajar ----
    { cap: 3, tipo: 'muestra', escena: 'cien', en: {},
      texto: 'Los precios suben y bajan todo el tiempo. Vas a ver que **subir y bajar** un porcentaje es multiplicar.',
      momentos: [
        { k: 100, dice: 'Unos tenis cuestan 200 000 pesos y les hacen un descuento del 20 %.' },
        { k: 100, quita: 20, cuenta: '$200\\,000 \\cdot 0.8 = 160\\,000$', dice: 'Quitamos 20 casillas y queda el 80 %. Por eso, bajar un 20 % es multiplicar por 0.8.' },
        { k: 80, cuenta: '$\\times 1.1$', dice: 'Después, el precio sube un 10 %. Ojo: ese 10 % sale del precio rebajado, no del original.' },
        { k: 88, cuenta: '$0.8 \\cdot 1.1 = 0.88$', dice: 'El 10 % de 80 son 8 casillas, y quedamos en 88 %. ¡No es lo mismo que bajar 10!' },
        { k: 80, cuenta: '$160\\,000 \\div 0.8 = 200\\,000$', dice: '¿Cómo volver al precio original? Si 160 000 es el 80 %, dividimos entre 0.8.' },
        { k: 100, cuenta: '$80 \\cdot 1.25 = 100$', dice: 'Y para volver de 80 a 100 se suben 20, la cuarta parte de 80: un 25 %, ¡no un 20 %!' },
      ],
      idea: 'Bajar un porcentaje es multiplicar por menos de 1; subir, por más de 1. Los cambios seguidos se multiplican.' },
    { cap: 3, tipo: 'cien', meta: 60, k: 100,
      texto: '**Tu turno.** Una batería llena pierde el 40 % de su carga. Deja pintado solo lo que queda.',
      idea: 'Perder el $40\\,\\%$ deja el $60\\,\\%$: se multiplica por $0.6$.' },

    // ---- Ahora sí, un problema ----
    { cap: 4, tipo: 'cien', meta: 55, total: 600,
      texto: 'De 600 hinchas en el estadio, el 55 % llevaba la camiseta local. La cuadrícula representa a los 600: pinta ese porcentaje. ¿Cuántos son?',
      idea: 'Cada casilla son 6 hinchas: $0.55 \\cdot 600 = 330$.' },
    { cap: 4, tipo: 'cierre', clave: 'pu-cm-3', real: '',
      texto: 'Eso es todo lo que construiste. Con estas ideas ya puedes con los ejercicios.',
      idea: 'De cada 100, las tres formas de escribirlo, el porcentaje de una cantidad y subir o bajar multiplicando.' },
  ],
};
