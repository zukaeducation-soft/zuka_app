// Preicfes · Ciencias Naturales, mundo 4 «Materia y Mezclas», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB, n = x => Math.round(x * 100) / 100;
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));

  // Un vaso de agua quieta donde cae una gota de tinta que se riega sola (f de 0 a 1).
  const tinta = (v, K) => {
    const f = v.f || 0, cx = 170;
    let s = X.vaso(cx, 166, 96, 112, 0.72, 'agua', { marcas: false });
    if (f > 0 && f < 1) s += `<ellipse cx="${cx}" cy="${n(100 + 24 * f)}" rx="${n(10 + 30 * f)}" ry="${n(8 + 24 * f)}" fill="#3f63d0" opacity=".5" filter="url(#xlb-sombra)"/>` +
      `<ellipse cx="${cx}" cy="${n(98 + 18 * f)}" rx="${n(5 + 12 * f)}" ry="${n(4 + 10 * f)}" fill="#2949b8" opacity=".55" filter="url(#xlb-sombra)"/>`;
    if (f >= 1) s += `<rect x="126" y="91" width="88" height="71" rx="3" fill="#3f63d0" opacity=".38"/>`;
    if (v.g) s += X.gota(cx, f ? 40 : 66, 8, 'azul');
    if (v.lupa) s += X.lupa(276, 70, 24) + X.rot(290, 128, 'no se ven');
    if (v.t) s += X.rot(cx, 22, v.t, 'oscuro');
    return X.foto(s, 200, 'lab');
  };

  xpAmplia('icf-cn-materia-1', {
    conecta: 'icf-cn-celula-1',
    desde: [
      ['Desde cero: todo está hecho de partículas',
        xpMira('dibujo', 'Antes de hablar de sólidos, líquidos y gases: ¿de qué están hechas las cosas? De **partículas** que nunca se quedan quietas.', { dib: tinta, v: {}, alto: 200 }, [
          ['En la lección de transporte viste que una sustancia se riega sola de donde hay mucho a donde hay poco.', {}],
          ['Materia es todo lo que tiene masa y ocupa espacio: agua, aire, tu lápiz.', { t: 'materia: masa y espacio' }],
          ['Está hecha de partículas tan pequeñas que no se ven ni con lupa.', { lupa: 1 }],
          ['Cae una gota de tinta en el agua quieta.', { g: 1 }],
          ['Nadie revuelve, y aun así el color se riega: las partículas se mueven solas.', { g: 1, f: 0.5 }],
          ['Al rato todo queda parejo. Qué tan libres se mueven decide el estado.', { f: 1, t: 'sólido, líquido o gas' }],
        ], 'La materia está hecha de partículas que se mueven solas; su movimiento decide el estado.'),
        xpHaz('hoja', 'Materia es lo que tiene masa y ocupa espacio. Subraya lo que **no** es materia.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El aire dentro de una bomba'], ['La luz de una linterna'], ['El vapor que sale de la olla']], pista: 'El aire y el vapor no se ven bien, pero inflan cosas y ocupan espacio. ¿Cuál no tiene masa?' }, 'La luz es energía: no tiene masa ni llena una bomba.')],
    ],
    despues: [
      ['Más difícil: evaporar no es hervir',
        xpMira('hoja', 'Dos maneras de pasar de líquido a gas que el examen mezcla a propósito: **evaporar** y **hervir**.', { paras: [['La ropa se seca al sol a 20 °C.'], ['El agua de la olla hierve con burbujas por dentro.'], ['Evaporar: solo por la superficie y a cualquier temperatura.'], ['Hervir: en todo el líquido y a una temperatura fija.']] }, [
          ['La ropa se seca sin que el agua llegue a 100 °C.', { luz: [0], nota: { 0: 'evapora' } }],
          ['Las partículas más rápidas escapan por la superficie.', { luz: [2] }],
          ['En la olla salen burbujas de vapor desde el fondo.', { luz: [1], nota: { 1: 'hierve' } }],
          ['Eso solo pasa al llegar a su punto de ebullición.', { luz: [3] }],
          ['Las dos dan vapor; cambia dónde y cuándo ocurre.', { luz: [2, 3] }],
        ], 'Evaporar: por la superficie y a cualquier temperatura. Hervir: en todo el líquido, a una fija.'),
        xpHaz('hoja', 'Un charco desaparece en una tarde fresca. Subraya lo correcto.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Hirvió con el sol.'], ['Se evaporó: algunas partículas escaparon por la superficie.'], ['Sus partículas desaparecieron.']], pista: 'La tarde estaba fresca, lejos de 100 °C, y las partículas no se destruyen.' }, 'Sin hervir, el agua se evapora poco a poco por arriba.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Mientras el agua hierve, un estudiante sube la llama y dice que el agua se calentará **más**. ¿Tiene razón?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque más llama siempre da más temperatura.'], ['No: la energía extra vuelve vapor más agua y sigue a la misma temperatura.'], ['No, porque la llama no le da energía al agua.'], ['Sí, porque las burbujas suben la temperatura.']] }, [
        ['Recuerda el tramo plano: mientras hierve, la temperatura no sube.', {}],
        ['Esta dice «siempre»: falla justo en el cambio de estado.', { luz: [0], nota: { 0: 'absoluto' } }],
        ['Buen «No», mala razón: la llama sí da energía.', { luz: [2], nota: { 2: 'razón falsa' } }],
        ['Esta suena científica, pero las burbujas son vapor, no calor extra.', { luz: [3], nota: { 3: 'suena bien' } }],
        ['La energía sirve para soltar partículas: hierve más rápido, no más caliente.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Mientras cambia de estado, más energía acelera el cambio, pero la temperatura se queda igual.'),
      xpHaz('hoja', 'Se calienta hielo a −10 °C en olla abierta, a nivel del mar, hasta que hierve un buen rato. ¿Qué serie de temperaturas (°C) es correcta?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['−10, 0, 0, 0, 50, 100, 100, 100'], ['−10, 10, 30, 50, 70, 90, 110, 130'], ['0, 0, 0, 50, 100, 100, 100, 100'], ['−10, 0, 0, 0, 50, 100, 120, 140']], pista: 'Revisa dónde empieza, si tiene los dos tramos planos y si se queda en 100 mientras hierve.' }, 'Empieza en −10, se detiene en 0 y en 100.')],
    cierre: 'Partículas que se mueven; el estado cambia con la energía, con tramos planos y evaporación sin hervir.',
  });

  // Tres vasos: agua pura, agua con arena y agua con sal (se ve igual que la pura).
  const tresVasos = (v, K) => {
    const k = v.k || 0;
    let s = X.vaso(66, 166, 66, 86, 0.66, 'agua') + X.rot(66, 188, 'agua pura');
    if (k >= 1) s += X.vaso(170, 166, 66, 86, 0.66, 'turbio', { solido: 0.6 }) + X.rot(170, 188, 'agua y arena');
    if (k >= 2) s += X.vaso(274, 166, 66, 86, 0.66, 'agua') + X.rot(274, 188, 'agua y sal');
    if (v.ojo) s += X.rot(274, 60, '¿pura?', 'oscuro');
    if (v.t) s += X.rot(170, 24, v.t, 'oscuro');
    return X.foto(s, 200, 'lab');
  };
  // Aparatos de separación: k = 1 filtración, 2 decantación, 3 destilación.
  const embudo = fx => `<path d="M${fx - 30} 50 L${fx + 30} 50 L${fx + 4} 92 V122 H${fx - 4} V92 Z" fill="url(#xlb-vidrio)" stroke="#5d7684" stroke-width="1.3"/>` +
    `<path d="M${fx - 25} 52 L${fx + 25} 52 L${fx} 88 Z" fill="#f6f3e8" opacity=".95"/><path d="M${fx - 18} 58 H${fx + 18} L${fx + 6} 76 H${fx - 6} Z" fill="url(#xlb-l-turbio)" opacity=".9"/>` +
    `<path d="M${fx - 9} 80 Q${fx} 72 ${fx + 9} 80 L${fx} 88 Z" fill="#a07a4a"/>`;
  const decanta = fx => `<clipPath id="xlb-dec"><path d="M${fx - 6} 36 C${fx - 42} 60 ${fx - 38} 100 ${fx - 4} 118 L${fx + 4} 118 C${fx + 38} 100 ${fx + 42} 60 ${fx + 6} 36 Z"/></clipPath>` +
    `<g clip-path="url(#xlb-dec)"><rect x="${fx - 45}" y="58" width="90" height="26" fill="url(#xlb-l-aceite)"/><rect x="${fx - 45}" y="84" width="90" height="40" fill="url(#xlb-l-agua)"/></g>` +
    `<path d="M${fx - 6} 36 C${fx - 42} 60 ${fx - 38} 100 ${fx - 4} 118 L${fx + 4} 118 C${fx + 38} 100 ${fx + 42} 60 ${fx + 6} 36 Z" fill="url(#xlb-vidrio)" stroke="#5d7684" stroke-width="1.3"/>` +
    `<rect x="${fx - 7}" y="26" width="14" height="11" rx="2" fill="#7b4f2a"/><rect x="${fx - 3}" y="118" width="6" height="22" fill="url(#xlb-vidrio)" stroke="#5d7684"/>` +
    `<rect x="${fx - 11}" y="124" width="22" height="6" rx="2" fill="#2f3539"/>`;
  const destila = () => {
    let s = `<rect x="40" y="103" width="62" height="4" fill="#59626a"/><path d="M46 107 L42 166 M96 107 L100 166" stroke="#59626a" stroke-width="2.5"/>` + X.mechero(71, 166, 0.8) +
      X.matraz(71, 103, 0.8, 0.45, 'agua', { burbujas: 4, tapon: 1 });
    s += `<path d="M71 26 V18 L250 96" stroke="#5d7684" stroke-width="4" fill="none" stroke-linejoin="round"/><path d="M71 26 V18 L250 96" stroke="#e8f4fb" stroke-width="2" fill="none" stroke-linejoin="round"/>` +
      `<path d="M126 38 L214 77" stroke="#7fd3ff" stroke-width="16" stroke-linecap="round" opacity=".45"/><path d="M126 38 L214 77" stroke="#5d7684" stroke-width="17" stroke-linecap="round" fill="none" opacity=".25"/>` +
      X.vaso(262, 166, 52, 62, 0.25, 'agua') + X.gota(251, 108, 4, 'agua');
    return s + X.rot(170, 40, 'tubo frío') + X.rot(262, 188, 'agua sin sal') + X.rot(71, 188, 'agua con sal');
  };
  const aparatos = (v, K) => {
    const k = v.k || 0;
    let s = '';
    if (k === 1) s += X.soporte(118, 166, 150, 104) + embudo(170) + X.vaso(170, 166, 56, 52, 0.4, 'agua') + X.gota(170, 128, 4, 'agua') + X.rot(250, 70, 'papel de filtro') + X.rot(250, 140, 'pasa el líquido');
    if (k === 2) s += X.soporte(118, 166, 150, 104) + decanta(170) + X.vaso(170, 166, 56, 20, 0.5, 'agua') + X.rot(260, 70, 'aceite arriba') + X.rot(260, 100, 'agua abajo') + X.rot(260, 130, 'llave');
    if (k === 3) s += destila();
    if (v.t) s += X.rot(170, 20, v.t, 'oscuro');
    return X.foto(s, 200, 'lab');
  };

  xpAmplia('icf-cn-materia-2', {
    conecta: 'icf-cn-materia-1',
    desde: [
      ['Desde cero: sustancia pura y mezcla',
        xpMira('dibujo', 'Casi nada de lo que usas es una sola sustancia. Empecemos por distinguir lo **puro** de lo **mezclado**.', { dib: tresVasos, v: { k: 0 }, alto: 200 }, [
          ['En la lección de estados viste que cada sustancia tiene sus partículas y sus propiedades.', {}],
          ['Sustancia pura: un solo tipo de partículas, como el agua destilada.', { t: 'un solo tipo de partícula' }],
          ['Mezcla: dos o más sustancias juntas sin unirse, como agua y arena.', { k: 1, t: 'mezcla: juntas, no unidas' }],
          ['Algunas mezclas se ven parejas y engañan, como agua con sal.', { k: 2, ojo: 1 }],
          ['Para separarlas se busca una propiedad en que se diferencien.', { k: 2, t: 'tamaño, densidad, hervor, imán…' }],
        ], 'Pura: un solo tipo de partícula. Mezcla: varias juntas, aunque a veces se vea pareja.'),
        xpHaz('hoja', 'Subraya la **sustancia pura**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Jugo de mora'], ['Agua de mar'], ['Azúcar refinada, sola en el frasco']], pista: 'Ese tiene varias sustancias juntas, aunque se vea parejo. ¿Cuál es de un solo tipo?' }, 'El azúcar refinada es casi solo sacarosa: una sustancia.')],
      ['Desde cero: los aparatos de separar',
        xpMira('dibujo', 'En el laboratorio cada método tiene su aparato. Conocerlos ayuda a leer los **montajes** que muestra el examen.', { dib: aparatos, v: { k: 1 }, alto: 200 }, [
          ['Filtración: el papel deja pasar el líquido y atrapa los granos.', { k: 1, t: 'filtración' }],
          ['Lo que pasa es el filtrado; lo atrapado, el residuo.', { k: 1, t: 'residuo arriba, filtrado abajo' }],
          ['Decantación: dos líquidos que no se mezclan forman capas.', { k: 2, t: 'decantación' }],
          ['Se abre la llave y sale primero el de abajo, el más denso.', { k: 2, t: 'sale primero el de abajo' }],
          ['Destilación: se hierve, el vapor pasa por un tubo frío y vuelve a ser líquido.', { k: 3 }],
          ['La sal no se evapora a esa temperatura: se queda en el matraz.', { k: 3 }],
        ], 'Filtrar atrapa sólidos; decantar separa capas; destilar recoge lo que hierve primero.'),
        xpHaz('hoja', 'Subraya el aparato que sirve para separar **agua y aceite**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Embudo con papel de filtro'], ['Embudo de decantación con llave'], ['Imán']], pista: 'Agua y aceite son dos líquidos que forman capas. ¿Qué aparato saca una capa sin la otra?' }, 'Se abre la llave, sale el agua y el aceite queda arriba.')],
    ],
    despues: [
      ['Más difícil: separar en varios pasos',
        xpMira('hoja', 'Cuando hay tres o cuatro sustancias, **el orden** de los pasos decide si se recupera cada una.', { paras: [['Mezcla: agua, aceite, arena y sal disuelta.'], ['1. Decantar: sale el aceite aparte.'], ['2. Filtrar: la arena queda en el papel.'], ['3. Evaporar: la sal queda en el fondo.']] }, [
          ['Cuatro sustancias, cuatro diferencias que aprovechar.', { luz: [0] }],
          ['El aceite no se mezcla con el agua: se decanta primero.', { luz: [1], nota: { 1: 'capas' } }],
          ['La arena no se disuelve: el filtro la atrapa.', { luz: [2], nota: { 2: 'granos' } }],
          ['La sal disuelta pasa el filtro: solo se recupera evaporando.', { luz: [3], nota: { 3: 'disuelta' } }],
          ['Si se evapora antes de filtrar, la sal queda revuelta con arena.', { luz: [2, 3] }],
        ], 'Saca primero lo que se separa fácil y deja para el final lo que está disuelto.'),
        xpHaz('hoja', 'Hay agua con arena y sal disuelta. Subraya el orden que recupera la **sal limpia**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Evaporar y luego filtrar.'], ['Filtrar y luego evaporar.'], ['Solo filtrar.']], pista: 'Si evaporas primero, ¿con qué queda revuelta la sal? ¿Y el filtro atrapa algo disuelto?' }, 'El filtro quita la arena; al evaporar queda la sal sola.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se filtra agua con arena y azúcar disuelta. El examen pregunta qué queda **en el papel** y qué pasa **al vaso**.', { letras: ['A', 'B', 'C', 'D'], paras: [['En el papel, arena y azúcar; al vaso, agua.'], ['En el papel, arena; al vaso, agua con azúcar.'], ['En el papel, azúcar; al vaso, agua con arena.'], ['En el papel, arena; al vaso, agua pura, porque el papel atrapa el azúcar.']] }, [
        ['Piensa en tamaños: los granos de arena no pasan; lo disuelto, sí.', {}],
        ['Esta cree que el papel atrapa lo disuelto.', { luz: [0], nota: { 0: 'disuelto no' } }],
        ['Esta lo voltea: la arena es la que no pasa.', { luz: [2], nota: { 2: 'al revés' } }],
        ['Esta acierta en el papel, pero su razón es falsa.', { luz: [3], nota: { 3: 'razón falsa' } }],
        ['Arena en el papel; agua dulce en el vaso: es la respuesta.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Un filtro detiene granos, nunca lo que está disuelto.'),
      xpHaz('hoja', 'Se quiere sacar **agua para beber** de agua de mar. ¿Qué método da agua sin sal?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Filtrar con papel.'], ['Dejar reposar y decantar.'], ['Destilar y recoger el vapor enfriado.'], ['Evaporar al sol y guardar lo que queda.']], pista: 'La sal está disuelta. ¿Qué método se queda con el agua y deja la sal atrás?' }, 'El vapor deja la sal en el recipiente y se enfría como agua dulce.')],
    cierre: 'Puro o mezcla; cada diferencia tiene su aparato; el orden importa y lo disuelto no se filtra.',
  });

  // Un vaso de agua sobre una balanza; se echa azúcar (s: montoncito al fondo, d: disuelta).
  const disuelve = (v, K) => {
    let s = X.balanza(110, 166, v.m || '170.0 g') + X.vaso(110, 136, 70, 80, 0.6, 'agua', { solido: v.s || 0 });
    if (v.d) s += Array.from({ length: 18 }, (_, i) => `<circle cx="${n(84 + (i * 23) % 52)}" cy="${n(92 + (i * 13) % 38)}" r="1.4" fill="#ffffff" opacity=".9"/>`).join('');
    if (v.cu) s += `<path d="M150 44 L118 104" stroke="url(#xlb-metal)" stroke-width="4" stroke-linecap="round"/><ellipse cx="116" cy="108" rx="7" ry="4" fill="url(#xlb-metal)"/>`;
    s += `<rect x="226" y="96" width="54" height="64" rx="4" fill="#f4f1ea" stroke="#bdb6a6"/><rect x="226" y="112" width="54" height="18" fill="#c0392b"/>` +
      `<text x="253" y="125" fill="#fff" font-size="10" font-weight="700" style="text-anchor:middle;font-family:Jost,system-ui,sans-serif">AZÚCAR</text>`;
    if (v.r1) s += X.rot(110, 20, v.r1, 'oscuro');
    if (v.r2) s += X.rot(253, 188, v.r2);
    return X.foto(s, 200, 'lab');
  };
  // Curva de solubilidad del nitrato de potasio (g en 100 g de agua).
  const SOL = [[20, 32], [40, 64], [60, 110]];
  const curvaSol = (v, K) => {
    const Xs = t => 56 + (t / 70) * 250, Y = g => 166 - g * 1.2;
    let h = K.l(56, 166, 318, 166, 'lm') + K.l(56, 166, 56, 22, 'lm') + [0, 40, 80, 120].map(g => K.l(56, Y(g), 314, Y(g), 'ls') + K.t(48, Y(g) + 4, g, 's tm', 'end')).join('') +
      [20, 40, 60].map(t => K.t(Xs(t), 182, `${t} °C`, 's tm')).join('') + K.t(60, 16, 'g en 100 g de agua', 's tm', 'start');
    h += K.pl(SOL.slice(0, v.n || 0).map(([t, g]) => [Xs(t), Y(g)]), 'la gr') + SOL.slice(0, v.n || 0).map(([t, g]) => K.c(Xs(t), Y(g), 5, 'fA') + K.t(Xs(t) - 14, Y(g) - 6, g, 's')).join('');
    if (v.baja) h += K.ar(Xs(40), Y(64), Xs(20) + 6, Y(64), 'lf gr') + K.l(Xs(20), Y(64), Xs(20), Y(32), 'lf d') + K.t(Xs(20) + 30, Y(48) + 4, '32 g salen', 's tf', 'start');
    if (v.t) h += K.t(210, 40, v.t, 'ta');
    return h;
  };

  xpAmplia('icf-cn-materia-3', {
    conecta: 'icf-cn-materia-2',
    desde: [
      ['Desde cero: qué es disolver',
        xpMira('dibujo', 'Echas azúcar al agua, revuelves y deja de verse. ¿Dónde quedó? Con tres palabras se explica: **soluto**, **solvente** y **solución**.', { dib: disuelve, v: {}, alto: 200 }, [
          ['En la lección de mezclas viste que el agua con sal es una mezcla que se ve pareja.', { r2: 'agua: 170 g' }],
          ['Se echan 14 gramos de azúcar al agua.', { s: 0.7, r2: 'azúcar: 14 g', m: '184.0 g' }],
          ['Lo que se disuelve, el azúcar, es el soluto; el agua es el solvente.', { s: 0.7, cu: 1, r1: 'soluto + solvente', m: '184.0 g' }],
          ['Al revolver, sus partículas se reparten entre las del agua.', { cu: 1, d: 1, r1: 'se reparte', m: '184.0 g' }],
          ['La mezcla pareja que resulta se llama solución.', { d: 1, r1: 'solución', m: '184.0 g' }],
          ['No desapareció: sabe dulce y la balanza marca la suma.', { d: 1, r1: '170 + 14 = 184 g', m: '184.0 g' }],
        ], 'Soluto en solvente da una solución; el soluto no desaparece y la masa se suma.'),
        xpHaz('hoja', 'Se prepara café instantáneo en agua caliente. Pon al margen el papel de cada uno.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['solvente', 'soluto'], meta: [1, 0], paras: [['El polvo de café'], ['El agua caliente']], pista: 'Alguno no va ahí: ¿cuál se disuelve y cuál disuelve?' }, 'El polvo se disuelve: soluto. El agua lo disuelve: solvente.')],
    ],
    despues: [
      ['Más difícil: leer la curva y enfriar',
        xpMira('dibujo', 'En el examen la solubilidad llega como **curva**: cuánto cabe en 100 g de agua a cada temperatura. Aquí, el nitrato de potasio.', { dib: curvaSol, v: { n: 0 }, alto: 196 }, [
          ['Cada punto es el máximo que cabe a esa temperatura.', { n: 1 }],
          ['A 20 °C caben unos 32 g; a 40 °C, 64; a 60 °C, 110.', { n: 3 }],
          ['Debajo de la curva, insaturada; justo en ella, saturada.', { n: 3, t: 'el punto es el límite' }],
          ['Se disuelven 64 g a 40 °C y se enfría hasta 20 °C.', { n: 3, baja: 1 }],
          ['Ahora solo caben 32: los otros salen como cristales.', { n: 3, baja: 1 }, '$64 - 32 = 32$'],
        ], 'Al enfriar una solución saturada, sale como cristales lo que ya no cabe a la nueva temperatura.'),
        xpHaz('fichas', 'Con la misma curva: a 60 °C se disuelven 100 g en 100 g de agua y se enfría a 40 °C. Pon lo que sigue disuelto y lo que se cristaliza.', { slots: fila('disuelto', 'cristales'), fichas: ['64', '36', '100', '46', '110'], meta: ['64', '36'], alto: 96, pista: 'A 40 °C solo caben los de la curva en ese punto; el resto sale.' }, 'Caben 64; salen $100 - 64 = 36$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una tabla muestra cuánta sal y cuánto azúcar caben en 100 g de agua a 20, 40 y 60 °C. ¿Qué pregunta se puede **responder** con ella?', { letras: ['A', 'B', 'C', 'D'], paras: [['¿Cuál se disuelve más rápido si se agita?'], ['¿Cómo cambia lo máximo que cabe de cada una con la temperatura?'], ['¿Cuál de las dos es más dulce?'], ['¿Cuánta sal cabe en aceite?']] }, [
        ['La tabla tiene tres cosas: sustancia, temperatura y máximo que cabe.', {}],
        ['La rapidez no se midió: nadie tomó tiempos.', { luz: [0], nota: { 0: 'no se midió' } }],
        ['El sabor no aparece en la tabla.', { luz: [2], nota: { 2: 'otra cosa' } }],
        ['Todo fue en agua: del aceite no hay datos.', { luz: [3], nota: { 3: 'otro solvente' } }],
        ['Máximo según la temperatura: eso sí está en la tabla.', { luz: [1], nota: { 1: 'se responde' } }],
      ], 'Una pregunta se responde con los datos solo si usa lo que se midió.'),
      xpHaz('hoja', 'Una gaseosa abierta en la nevera conserva más gas que otra al sol. Alguien dice que en frío el gas se queda más disuelto. ¿Tiene razón?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['Sí, porque en un líquido frío cabe más gas.'], ['Sí, porque el frío vuelve líquido el gas.'], ['No, porque el calor siempre disuelve más.'], ['No, porque el gas no se disuelve en agua.']], pista: 'Recuerda que con los gases pasa al revés que con muchos sólidos. Revisa también el «porque».' }, 'En frío cabe más gas; al calentarse, se escapa.')],
    cierre: 'Soluto en solvente; hasta un límite que cambia con la temperatura; al enfriar, cristaliza lo que sobra.',
  });
}
