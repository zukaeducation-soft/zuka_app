// Preicfes · Matemáticas, mundo 4 «Áreas y Volúmenes», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): desde qué es medir
// (palito y cuadrito), radio, diámetro y π, y qué es el volumen, hasta las trampas que más salen (perímetro frente a área, m² a
// cm², radio frente a diámetro, m³ a litros) y el formato del examen.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Rectángulo de 5 por 3 en cuadros de 28: `lado` resalta el borde de abajo; k cuadros pintados.
  const malla = (v, K) => {
    const u = 28, x0 = 100, y0 = 140; let h = '';
    for (let i = 0; i < 15; i++) h += K.r(x0 + (i % 5) * u, y0 - (Math.floor(i / 5) + 1) * u, u, u, i < Math.round(v.k) ? 'fa' : 'fc', 0);
    if (v.lado) { h += K.l(x0, y0, x0 + 5 * u, y0, 'lg gr'); for (let i = 0; i <= 5; i++) h += K.l(x0 + i * u, y0 - 5, x0 + i * u, y0 + 5, 'lg'); }
    if (v.uno) h += K.r(x0, y0 - u, u, u, 'fA', 0);
    return h + K.t(x0 + 2.5 * u, y0 + 22, '5 m', 's tm') + K.t(x0 - 10, y0 - 1.5 * u + 4, '3 m', 's tm', 'end') + K.t(170, 22, v.t || '', 'ta');
  };
  // Un metro cuadrado partido en 10 × 10; las primeras f filas pintadas.
  const metro = (v, K) => {
    let h = '';
    for (let i = 0; i < 100; i++) h += K.r(110 + (i % 10) * 12, 24 + Math.floor(i / 10) * 12, 12, 12, Math.floor(i / 10) < Math.round(v.f) ? 'fa' : 'fc', 0);
    return h + K.t(170, 162, '100 cm', 's tm') + K.t(102, 88, '100 cm', 's tm', 'end') + K.t(240, 80, v.t || '', 'ta', 'start');
  };
  // Círculo de radio 3 (u = 12): radio, diámetro y el borde estirado, medido en diámetros.
  const circulo = (v, K) => {
    const c = [170, 66], r = 36; let h = K.c(c[0], c[1], r, 'fc') + K.c(c[0], c[1], 3, 'fk');
    if (v.r) h += K.l(c[0], c[1], c[0] + r, c[1], 'lg gr') + K.t(c[0] + r / 2, c[1] - 6, v.rr || 'r = 3', 's tg');
    if (v.d) h += K.l(c[0] - r, c[1] + 0.1, c[0] + r, c[1] + 0.1, 'lf gr') + K.t(c[0], c[1] + 18, v.dd || 'd = 6', 's tf');
    if (v.e) {
      const L = Math.PI * 2 * r, x0 = 170 - L / 2;
      h += K.l(x0, 140, x0 + L, 140, 'la gr');
      for (let k = 0; k <= 3; k++) h += K.l(x0 + k * 2 * r, 134, x0 + k * 2 * r, 146, 'lf') + (k < 3 ? K.t(x0 + (k + 0.5) * 2 * r, 160, 'd', 's tf') : '');
      h += K.t(x0 + L + 5, 145, '+0.14', 's tm', 'start');
    }
    return h + K.t(170, 186, v.t || '', 'ta');
  };
  // Caja de a × b × c cubitos.
  const caja = (v, K) => K.caja([150, 150], 22, v.a, v.b, v.c, 'fa') + K.t(270, 40, v.t || '', 'ta', 'middle');

  xpAmplia('icf-ma-medida-1', {
    conecta: 'icf-ma-azar-1',
    desde: [
      ['Desde cero: medir con palitos y cuadritos',
        xpMira('dibujo', '**Medir** es contar cuántas veces cabe una unidad. Para un borde la unidad es un palito; para una superficie, un cuadrito.', { dib: malla, v: { k: 0, lado: 0, uno: 0, t: '' }, alto: 180 }, [
          ['En la lección de conteo viste que 3 filas por 2 columnas son 6 casillas.', {}],
          ['Medir es contar cuántas veces cabe una unidad. Para un borde, un palito de 1 m.', { lado: 1 }],
          ['El lado de abajo mide 5 palitos: 5 metros.', { lado: 1, t: 'borde: metros' }],
          ['Para una superficie, la unidad es un cuadrito de 1 m por 1 m: un metro cuadrado.', { uno: 1, lado: 0, t: '1 m²' }],
          ['Aquí caben 5 por 3 cuadritos: 15 metros cuadrados.', { k: 15, uno: 0, t: '15 m²' }, '$5 \\cdot 3 = 15$'],
          ['Metros para bordes, metros cuadrados para superficies: nunca se mezclan.', { k: 15, lado: 1 }],
        ], 'Borde en metros (m), superficie en metros cuadrados (m²).'),
        xpHaz('hoja', 'Se va a comprar **guardaescoba**, la tira que va pegada a lo largo del borde del piso. Subraya qué hay que medir.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['El área del piso, en m².'], ['El perímetro del piso, en m.'], ['El volumen del cuarto, en m³.']], pista: 'La tira no cubre el piso: va pegada al borde, alrededor.' }, 'La tira rodea el cuarto: se mide el perímetro, en metros.')],
    ],
    despues: [
      ['Más difícil: pasar unidades de área',
        xpMira('dibujo', 'Un metro tiene 100 cm, pero un **metro cuadrado** no tiene 100 cm². Mira por qué.', { dib: metro, v: { f: 0, t: '' }, alto: 176 }, [
          ['Un metro tiene 100 centímetros. ¿Cuántos centímetros cuadrados tiene un metro cuadrado?', {}],
          ['Tentación: decir 100. Pero un metro cuadrado es un cuadrado de 100 por 100.', {}],
          ['Cada fila del dibujo son 100 cuadritos de 1 cm², y hay 100 filas.', { f: 1, t: '100' }],
          ['En total, 100 por 100: 10 000 centímetros cuadrados.', { f: 10, t: '10 000' }, '$100 \\cdot 100 = 10\\,000$'],
          ['Al pasar áreas, el cambio de unidad se eleva al cuadrado.', {}, '$1 \\text{ m}^2 = 10\\,000 \\text{ cm}^2$'],
        ], '1 m² = 100 · 100 = 10 000 cm²: en área el cambio va al cuadrado.'),
        xpHaz('fichas', 'Una baldosa mide 50 cm por 50 cm. Pon su área en cm² y cuántas baldosas cubren **1 m²**.', { slots: fila('área (cm²)', 'en 1 m²'), fichas: ['2 500', '4', '100', '2', '250'], meta: ['2 500', '4'], alto: 96, pista: 'Un metro cuadrado tiene 10 000 cm². ¿Cuántas veces cabe la baldosa?' }, '$50 \\cdot 50 = 2\\,500$ y $10\\,000 \\div 2\\,500 = 4$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un lote rectangular mide 20 m por 10 m. Para cercarlo con una vuelta de alambre, Lucía compra 200 m. ¿Hizo bien la cuenta?', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque 20 · 10 = 200.'], ['No, porque la cerca rodea el lote: 2 · (20 + 10) = 60 m.'], ['No, porque bastan 30 m: 20 + 10.'], ['Sí, porque un lote grande necesita mucho alambre.']] }, [
        ['Antes de leer las opciones: cercar es rodear, así que se pide el perímetro.', {}],
        ['Se suman los cuatro lados: 60 m. Entonces la respuesta es No.', {}, '$20 + 10 + 20 + 10 = 60$'],
        ['A multiplica: eso es el área, la superficie, en metros cuadrados.', { luz: [0], nota: { 0: 'es el área' } }],
        ['C suma solo dos lados: le falta la otra mitad del borde.', { luz: [2], nota: { 2: 'dos lados' } }],
        ['D da una razón que suena bien, pero no sale de ninguna cuenta.', { luz: [3], nota: { 3: 'sin cuenta' } }],
        ['B rodea los cuatro lados. Es la correcta.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Decide primero si la situación pide rodear o cubrir.'),
      xpHaz('hoja', 'Un salón de 8 m por 5 m se cubrirá con baldosas de 1 m². Diego dice que necesita 26 baldosas. ¿Tiene razón? Subraya.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Sí, porque 2 · (8 + 5) = 26.'], ['No, necesita 40, porque cubrir es contar cuadros: 8 · 5.'], ['No, necesita 13: 8 + 5.'], ['Sí, porque las baldosas se ponen por el borde.']], pista: 'Las baldosas cubren todo el piso. ¿Eso es rodear o cubrir?' }, 'Cubrir es área: $8 \\cdot 5 = 40$ baldosas.')],
    cierre: 'Rodear suma lados en metros; cubrir cuenta cuadros en m²; y 1 m² son 10 000 cm².',
  });

  xpAmplia('icf-ma-medida-2', {
    conecta: 'icf-ma-medida-1',
    desde: [
      ['Desde cero: radio, diámetro y π',
        xpMira('dibujo', 'El círculo no tiene lados. Para medirlo se usan su **radio**, su **diámetro** y un número especial: **π**.', { dib: circulo, v: { r: 0, d: 0, e: 0, t: '' }, alto: 196 }, [
          ['En la lección de perímetro y área viste que rodear suma lados y cubrir cuenta cuadros.', {}],
          ['El círculo no tiene lados. Su centro es el punto del medio.', { t: 'centro' }],
          ['El radio va del centro hasta el borde. Aquí mide 3.', { r: 1, t: 'radio' }],
          ['El diámetro cruza de borde a borde por el centro: son dos radios, 6.', { r: 1, d: 1, t: 'diámetro = 2 radios' }],
          ['Si estiras el borde, mide un poco más de 3 diámetros: unas 3.14 veces.', { d: 1, e: 1, t: 'borde ≈ 3.14 diámetros' }],
          ['Ese número, 3.14…, se llama π. Por eso el borde es π por el diámetro.', { d: 1, e: 1, t: 'borde = π · d' }, '$\\pi \\cdot 6 = 2\\pi \\cdot 3$'],
        ], 'Diámetro = 2 radios; el borde del círculo mide π por el diámetro.'),
        xpHaz('fichas', 'Una rueda tiene **radio** 20 cm. Pon su diámetro y lo que avanza en una vuelta, con $\\pi \\approx 3.14$.', { slots: fila('diámetro', 'una vuelta (cm)'), fichas: ['40', '125.6', '62.8', '10', '1256'], meta: ['40', '125.6'], alto: 96, pista: 'El diámetro son dos radios. En una vuelta, la rueda avanza su borde.' }, '$d = 40$ y $3.14 \\cdot 40 = 125.6$ cm.')],
    ],
    despues: [
      ['Más difícil: radio frente a diámetro',
        xpMira('dibujo', 'La trampa más común con círculos: el problema da el **diámetro** y la fórmula del área pide el **radio**.', { dib: circulo, v: { r: 0, d: 1, e: 0, dd: 'd = 30 cm', t: '' }, alto: 196 }, [
          ['Una pizza mide 30 cm de diámetro. ¿Cuál es su área?', {}],
          ['La fórmula del área usa el radio, no el diámetro: primero se parte en dos.', { r: 1, rr: 'r = 15', t: 'radio 15' }],
          ['El área es π por 15 al cuadrado: 225π cm².', { r: 1, rr: 'r = 15', t: '225π' }, '$\\pi \\cdot 15^2 = 225\\pi$'],
          ['Quien usa el 30 obtiene 900π: cuatro veces más. Trampa.', { t: '900π: trampa' }, '$30^2 = 900$'],
          ['Dos pizzas de 20 cm de diámetro, con radio 10, dan 200π entre las dos.', { t: '2 · 100π' }, '$2 \\cdot \\pi \\cdot 10^2 = 200\\pi$'],
          ['Una sola de 30 cm, con 225π, trae más que las dos de 20.', { t: '225π > 200π' }],
        ], 'Si te dan el diámetro, pártelo en dos antes de usar πr².'),
        xpHaz('fichas', 'Un tapete redondo mide **4 m de diámetro**. Pon su radio y su área, contada en π.', { slots: fila('radio (m)', 'área (en π)'), fichas: ['2', '4', '16', '8', '1'], meta: ['2', '4'], alto: 96, pista: 'Parte el diámetro en dos y eleva ese número al cuadrado.' }, 'Radio 2: $\\pi \\cdot 2^2 = 4\\pi$ m².')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'A una lámina cuadrada de 10 cm de lado se le recorta el círculo más grande posible. ¿Cuál expresión da el área que **sobra**, en cm²?', { letras: ['A', 'B', 'C', 'D'], paras: [['100 − 25π'], ['100 − 100π'], ['40 − 10π'], ['100 − 10π']] }, [
        ['Sobra el cuadrado menos el círculo: hay que hallar las dos áreas.', {}],
        ['El cuadrado de lado 10 tiene 100 cm².', {}, '$10 \\cdot 10 = 100$'],
        ['El círculo más grande toca los cuatro lados: su diámetro es 10 y su radio, 5.', {}],
        ['B usa 10 como radio: confunde el radio con el diámetro.', { luz: [1], nota: { 1: 'diámetro' } }],
        ['C resta bordes y D usa π por el diámetro, la fórmula del borde. No son áreas.', { luz: [2, 3], nota: { 2: 'bordes', 3: 'borde' } }],
        ['A resta π por 5 al cuadrado. Es la correcta.', { luz: [0], nota: { 0: 'correcta' } }, '$100 - 25\\pi \\approx 21.5$'],
      ], 'En una figura compuesta, halla cada pieza con su fórmula y luego suma o resta.'),
      xpHaz('hoja', 'Un parque cuadrado de 20 m de lado tiene en el centro una fuente redonda de **6 m de diámetro**. Subraya el área de prado que queda, en m².', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['400 − 36π'], ['400 − 9π'], ['80 − 6π'], ['400 − 6π']], pista: 'La fuente da el diámetro. ¿Qué número va al cuadrado en el área del círculo?' }, 'Radio 3: $400 - 9\\pi$ m² de prado.')],
    cierre: 'El radio es la mitad del diámetro; el área usa el radio al cuadrado, y lo compuesto se suma o se resta.',
  });

  xpAmplia('icf-ma-medida-3', {
    conecta: 'icf-ma-medida-2',
    desde: [
      ['Desde cero: qué es el volumen',
        xpMira('dibujo', 'El **volumen** es cuánto espacio ocupa algo. Se mide con **cubitos**, como el área se medía con cuadritos.', { dib: caja, v: { a: 1, b: 1, c: 1, t: '' }, alto: 176 }, [
          ['En la lección de círculos viste que el área del círculo es π por el radio al cuadrado.', {}],
          ['El volumen es cuánto espacio ocupa algo. Se mide con cubitos.', {}],
          ['Un cubito de 1 cm de largo, ancho y alto es un centímetro cúbico: 1 cm³.', { t: '1 cm³' }],
          ['Una caja de 3 por 2 por 2 se llena con 12 cubitos: 12 cm³.', { a: 3, b: 2, c: 2, t: '12 cm³' }, '$3 \\cdot 2 \\cdot 2 = 12$'],
          ['La capacidad es cuánto líquido cabe adentro de un recipiente.', { t: 'capacidad' }],
          ['Un cubo de 10 cm de lado guarda justo 1 litro: 1 000 cm³.', { t: '1 L = 1 000 cm³' }, '$10 \\cdot 10 \\cdot 10 = 1\\,000$'],
        ], 'Volumen en cubitos (cm³, m³); capacidad en litros: 1 L = 1 000 cm³.'),
        xpHaz('fichas', 'Un cartón de leche mide 10 cm por 10 cm de base y 20 cm de alto. Pon su volumen en cm³ y en litros.', { slots: fila('cm³', 'litros'), fichas: ['2 000', '2', '200', '20', '0.2'], meta: ['2 000', '2'], alto: 96, pista: 'Multiplica las tres medidas. Cada 1 000 cm³ es un litro.' }, '$10 \\cdot 10 \\cdot 20 = 2\\,000$ cm³: 2 litros.')],
    ],
    despues: [
      ['Más difícil: pasar unidades de volumen',
        xpMira('fichas', 'Así como 1 m² son 10 000 cm², un **metro cúbico** guarda muchísimos centímetros cúbicos: el cambio va **al cubo**.', { slots: fila('cm en 1 m', 'cm³ en 1 m³', 'litros en 1 m³'), fichas: ['100', '1 000 000', '1 000'], alto: 96 }, [
          ['Un metro tiene 100 cm. ¿Cuántos cm³ tiene un metro cúbico?', {}],
          ['Un metro cúbico es un cubo de 100 por 100 por 100 centímetros.', { pon: { 0: '100' } }],
          ['Son 100 por 100 por 100: un millón de centímetros cúbicos.', { pon: { 1: '1 000 000' } }, '$100^3 = 1\\,000\\,000$'],
          ['Cada litro son 1 000 cm³, así que en 1 m³ caben 1 000 litros.', { pon: { 2: '1 000' } }, '$1\\,000\\,000 \\div 1\\,000 = 1\\,000$'],
          ['Largo: por 100. Área: por 100 al cuadrado. Volumen: por 100 al cubo.', { marca: [1] }],
        ], '1 m³ = 1 000 000 cm³ = 1 000 litros.'),
        xpHaz('fichas', 'Un tanque de **2 m³** se llena con baldes de 10 litros. Pon los litros del tanque y cuántos baldes hacen falta.', { slots: fila('litros', 'baldes'), fichas: ['2 000', '200', '20', '2 000 000', '20 000'], meta: ['2 000', '200'], alto: 96, pista: 'Cada metro cúbico son 1 000 litros. Después reparte en baldes de 10.' }, '$2 \\cdot 1\\,000 = 2\\,000$ L y $2\\,000 \\div 10 = 200$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un tanque cilíndrico tiene 1 m de radio y 2 m de alto. ¿Cuántos litros le caben? Usa $\\pi \\approx 3.14$.', { letras: ['A', 'B', 'C', 'D'], paras: [['6.28 litros'], ['6 280 litros'], ['25 120 litros'], ['2 093 litros']] }, [
        ['Cilindro: área de la base por la altura. La base es un círculo de radio 1.', {}],
        ['Base: π por 1 al cuadrado, 3.14 m². Por 2 de alto: 6.28 m³.', {}, '$3.14 \\cdot 1^2 \\cdot 2 = 6.28$'],
        ['A deja metros cúbicos y los llama litros: unidades mezcladas.', { luz: [0], nota: { 0: 'unidades' } }],
        ['C usa 2 como radio: confunde el radio con el diámetro.', { luz: [2], nota: { 2: 'diámetro' } }],
        ['D toma un tercio, como si fuera un cono. Pero es un cilindro.', { luz: [3], nota: { 3: 'es un cono' } }],
        ['Cada metro cúbico son 1 000 litros: 6 280 litros. B es la correcta.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Calcula el volumen en m³ y conviértelo a litros al final.'),
      xpHaz('hoja', 'Una piscina mide 5 m de largo, 3 m de ancho y 1.2 m de hondo. Subraya cuántos litros le caben.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['18 litros'], ['18 000 litros'], ['9.2 litros'], ['1 800 litros']], pista: 'Multiplica las tres medidas en metros y fíjate en la unidad del resultado.' }, '$5 \\cdot 3 \\cdot 1.2 = 18$ m³, que son 18 000 litros.')],
    cierre: 'Volumen es base por altura en cubitos; 1 L = 1 000 cm³ y 1 m³ = 1 000 L.',
  });
}
