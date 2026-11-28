// Preicfes · Sociales y Ciudadanas, mundo 9 «Economía y Globalización», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  // Un puesto de plaza de mercado con su toldo, el vendedor, la fruta y una compradora con un billete.
  const puesto = v => {
    let s = '';
    if (v.puesto) {
      s += `<path d="M48 46 L212 46 L202 70 L58 70Z" fill="#d7263d"/>` + [0, 1, 2, 3].map(k => `<path d="M${68 + k * 40} 46 L${88 + k * 40} 46 L${85 + k * 40} 70 L${71 + k * 40} 70Z" fill="#fff" opacity=".85"/>`).join('') +
        `<rect x="62" y="70" width="4" height="96" fill="#6b4423"/><rect x="194" y="70" width="4" height="96" fill="#6b4423"/>`;
      if (v.vende) s += X.persona(130, 132, 0.8, '#3f9b6a');
      s += `<rect x="56" y="122" width="148" height="44" rx="3" fill="#9a6b42" stroke="#6b4423"/>` +
        [['#f39c32', 78], ['#e2c23b', 104], ['#5c9e3c', 130], ['#f39c32', 156], ['#e2c23b', 182]].map(([c, x]) => `<circle cx="${x}" cy="114" r="9" fill="${c}" stroke="#000" stroke-opacity=".2"/><circle cx="${x - 3}" cy="111" r="2.5" fill="#fff" opacity=".4"/>`).join('');
    }
    if (v.compra) s += X.persona(256, 182, 0.85, '#7a4fb5');
    if (v.plata) s += X.billete(268, 104, 56, '$ 5 000');
    return X.foto(s + (v.r ? X.rot(170, 200, v.r, 'oscuro') : ''), 210, 'ciudad');
  };
  // Dos recibos del mismo mercado, antes y ahora, y el billete que ya no alcanza igual.
  const recibos = v => X.foto((v.antes ? X.documento(14, 14, 148, 104, ['Arroz: $ 3 000', 'Huevos: $ 12 000', 'Total: $ 15 000'], { titulo: 'Antes' }) : '') +
    (v.ahora ? X.documento(180, 14, 148, 104, ['Arroz: $ 3 600', 'Huevos: $ 14 400', 'Total: $ 18 000'], { titulo: 'Ahora' }) : '') +
    (v.plata ? X.billete(126, 136, 90, '$ 15 000') : '') + (v.r ? X.rot(170, 196, v.r, 'oscuro') : ''), 208, 'mesa');
  // Un barco de contenedores en el mar.
  const barco = v => {
    let s = '';
    if (v.barco) {
      s += `<path d="M34 150 L306 150 L286 182 L54 182Z" fill="#2b3440"/><rect x="34" y="150" width="272" height="5" fill="#c0392b"/><rect x="262" y="104" width="34" height="46" fill="#e9eef0" stroke="#56646c"/>` +
        `<rect x="268" y="112" width="22" height="6" fill="#7fa6d8"/>`;
      if (v.cont) [['#c0392b', '#3f6fb5', '#e2a03b'], ['#3f9b6a', '#e2a03b', '#c0392b']].forEach((fila, r) => { for (let k = 0; k < 9; k++) s += `<rect x="${52 + k * 23}" y="${136 - r * 15}" width="21" height="13" fill="${fila[k % 3]}" stroke="#000" stroke-opacity=".3"/>`; });
    }
    return X.foto(s + (v.r ? X.rot(170, 30, v.r, 'oscuro') : ''), 206, 'agua');
  };

  xpAmplia('icf-sc-economia-1', {
    conecta: 'icf-sc-geografia-2',
    desde: [
      ['Desde cero: mercado, oferta y demanda',
        xpMira('dibujo', 'Desde el principio: un **mercado** no es solo la plaza. Es cualquier lugar donde unos venden y otros compran.', { dib: puesto, v: { puesto: 1 }, alto: 210 }, [
          ['En la lección de recursos viste que lo que se acaba se vuelve escaso.', { puesto: 1 }],
          ['Un mercado es cualquier lugar donde unos venden y otros compran.', { puesto: 1, vende: 1, compra: 1 }],
          ['Oferta: cuánto quieren vender. Demanda: cuánto quieren comprar.', { puesto: 1, vende: 1, compra: 1, r: 'oferta y demanda' }],
          ['El precio es lo que se paga, y sale del tira y afloje entre los dos lados.', { puesto: 1, vende: 1, compra: 1, plata: 1, r: 'precio' }],
          ['Como en una subasta: si muchos quieren lo poco que hay, el precio sube.', { puesto: 1, vende: 1, compra: 1, plata: 1, r: 'poco y muy pedido: sube' }],
        ], 'Mercado: unos venden y otros compran. El precio sale de cruzar oferta y demanda.'),
        xpHaz('hoja', 'Llega el Día de la Madre y todos quieren flores; los cultivos son los mismos. Subraya qué pasa con el **precio**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Sube, porque crece la demanda con la misma oferta.'], ['Baja, porque hay muchas flores.'], ['No cambia nunca.']], pista: 'Recuerda la subasta: ¿hay más gente queriendo lo mismo que había?' }, 'Más demanda con la misma oferta: sube.')],
    ],
    despues: [
      ['Más difícil: dos cambios a la vez',
        xpMira('hoja', 'Un paso más: a veces cambian **la oferta y la demanda al mismo tiempo**. Mira hacia dónde empuja cada una.', { paras: [['Una sequía daña buena parte de la cosecha de cebolla.'], ['Al mismo tiempo, llegan más turistas a comer al pueblo.'], ['Menos oferta y más demanda empujan el precio hacia arriba.'], ['Si una empujara arriba y otra abajo, no se sabría sin cifras.']] }, [
          ['La sequía baja la oferta: hay menos cebolla.', { luz: [0], nota: { 0: 'oferta baja' } }],
          ['Los turistas suben la demanda: más gente la quiere.', { luz: [1], nota: { 1: 'demanda sube' } }],
          ['Las dos empujan al mismo lado: el precio sube con seguridad.', { luz: [2], nota: { 2: 'sube' } }],
          ['Si empujaran a lados distintos, el resultado dependería de cuál pesa más.', { luz: [3], nota: { 3: 'depende' } }],
          ['Trampa: afirmar «sube» cuando dos fuerzas se oponen. Sin datos, no se sabe.', {}],
        ], 'Si oferta y demanda empujan al mismo lado, el precio se sabe; si se oponen, depende de cuál pesa más.'),
        xpHaz('hoja', 'Mejora la cosecha de mango y, a la vez, se ponen de moda los jugos de mango. Subraya lo **correcto** sobre el precio.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Seguro baja, porque hay más mango.'], ['Seguro sube, porque se venden más jugos.'], ['No se sabe sin cifras: la oferta empuja abajo y la demanda, arriba.']], pista: 'Mira hacia dónde empuja cada cambio. ¿Van al mismo lado?' }, 'Dos fuerzas opuestas: depende de cuál pese más.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **un impuesto** y la pregunta «¿qué tipo es y a quién le pesa más?».', { letras: ['A', 'B', 'C', 'D'], paras: [['Es indirecto y pesa más, en proporción, a quien gana menos.'], ['Es directo, porque se cobra sobre el ingreso de cada uno.'], ['Es progresivo, porque los ricos compran más.'], ['No lo paga nadie, porque lo cobra la tienda.']] }, [
          ['El caso: un impuesto a las bebidas azucaradas, igual por botella para ricos y pobres.', {}],
          ['Esta confunde: va en el precio de la botella, no sobre el ingreso.', { luz: [1], nota: { 1: 'confunde' } }],
          ['Esta suena lógica, pero progresivo es cobrar más proporción a quien más gana.', { luz: [2], nota: { 2: 'trampa' } }],
          ['Esta invierte quién paga: la tienda lo cobra, pero lo paga el comprador.', { luz: [3], nota: { 3: 'invertida' } }],
          ['Igual valor para todos: el que gana menos entrega una parte mayor de su ingreso.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Pregunta cuándo se paga el impuesto y qué parte del ingreso se lleva a cada uno.'),
      xpHaz('hoja', 'En un pueblo hay una sola empresa de buses, que sube el pasaje al doble. Mucha gente sigue pagando. Subraya lo que mejor lo **explica**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Hay mucha competencia entre empresas.'], ['No hay otra empresa a la cual cambiarse: es un monopolio.'], ['La demanda de buses desapareció.'], ['El gobierno bajó el pasaje.']], pista: 'Si el precio sube al doble y nadie se cambia, ¿a dónde podrían irse?' }, 'Sin competencia, el único vendedor fija el precio.')],
    cierre: 'El precio sale del cruce de oferta y demanda; importa cuántos venden y a quién le pesa cada impuesto.',
  });

  xpAmplia('icf-sc-economia-2', {
    conecta: 'icf-sc-economia-1',
    desde: [
      ['Desde cero: lo que alcanza tu plata',
        xpMira('dibujo', 'Desde el principio: lo que importa no es cuántos billetes tienes, sino **cuánto alcanzan a comprar**.', { dib: recibos, v: { antes: 1 }, alto: 208 }, [
          ['En la lección de precios viste que cada precio sale de la oferta y la demanda.', { antes: 1 }],
          ['Inflación es cuando suben los precios de casi todo, no de una sola cosa.', { antes: 1, ahora: 1 }],
          ['El mismo mercado pasó de $ 15 000 a $ 18 000: un 20 % más caro.', { antes: 1, ahora: 1, r: '20 % más caro' }],
          ['Con el mismo billete de antes, ahora llevas menos cosas.', { antes: 1, ahora: 1, plata: 1, r: 'alcanza para menos' }],
          ['Como un globo que se desinfla: el billete es el mismo, pero rinde menos.', { antes: 1, ahora: 1, plata: 1, r: 'menos poder de compra' }],
        ], 'Inflación: suben casi todos los precios y el mismo dinero alcanza para menos.'),
        xpHaz('hoja', 'Subraya qué es **inflación**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Suben los precios de casi todo durante un tiempo.'], ['Sube solo el precio del tomate una semana.'], ['Se imprimen menos billetes.']], pista: 'Inflación no es una sola cosa cara: es casi todo, y por un tiempo.' }, 'Casi todo sube: eso es inflación.')],
    ],
    despues: [
      ['Más difícil: el promedio que esconde',
        xpMira('hoja', 'Un paso más: una cifra promedio **no le pasa igual a todos**. Mira qué compra cada hogar.', { paras: [['Un hogar pobre gasta la mitad de su ingreso en comida.'], ['Un hogar rico gasta una décima parte en comida.'], ['Este año la comida subió mucho más que lo demás.'], ['La misma inflación golpea más al hogar pobre.']] }, [
          ['En el hogar pobre, la comida es casi todo el gasto.', { luz: [0], nota: { 0: 'la mitad' } }],
          ['En el hogar rico, la comida es una parte pequeña.', { luz: [1], nota: { 1: 'una décima' } }],
          ['Si la comida sube más que lo demás…', { luz: [2] }],
          ['…el golpe es mayor para quien más gasta en comida.', { luz: [3], nota: { 3: 'pesa más' } }],
          ['Trampa: pensar que una cifra promedio le pasa igual a todos.', {}],
        ], 'Una inflación promedio no golpea igual: pesa más a quien gasta más en lo que más sube.'),
        xpHaz('hoja', 'El ingreso promedio de un pueblo subió, pero casi todo el aumento fue para cinco familias. Subraya lo **correcto**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La mayoría de las familias mejoró mucho.'], ['El promedio subió, aunque la mayoría casi no cambió.'], ['Bajó la desigualdad.']], pista: 'Un promedio puede subir porque unos pocos suben mucho. ¿Qué le pasó a la mayoría?' }, 'Pocos subieron mucho: el promedio esconde al resto.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **«Sí/No, porque…»** sobre quién cuenta como desempleado. Decide primero y luego mira la razón.', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque no tiene contrato.'], ['No, porque trabaja: su trabajo es informal.'], ['Sí, porque gana poco.'], ['No, porque los vendedores no aparecen en ninguna estadística.']] }, [
          ['El caso: una vendedora ambulante trabaja todos los días. ¿Cuenta como desempleada?', {}],
          ['Esta confunde no tener contrato con no tener trabajo.', { luz: [0], nota: { 0: 'confunde' } }],
          ['Esta confunde ganar poco con estar desempleada: eso es otra cosa.', { luz: [2], nota: { 2: 'confunde' } }],
          ['Esta trae un dato falso: el trabajo informal sí se mide.', { luz: [3], nota: { 3: 'falso' } }],
          ['Trabaja, aunque sin contrato ni seguridad social: es informal, no desempleada.', { luz: [1], nota: { 1: 'sirve' } }],
        ], 'Desempleado: busca y no encuentra. Informal: trabaja sin contrato. Pobre: no le alcanza.'),
      xpHaz('hoja', 'La tasa de desempleo no cambió en dos años, pero más gente dejó de buscar trabajo por cansancio. Subraya la lectura **prudente**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['El empleo mejoró mucho.'], ['La tasa quieta puede esconder gente que ya no busca y no se cuenta.'], ['Todos encontraron trabajo.'], ['La tasa de desempleo no sirve para nada.']], pista: 'Quien deja de buscar ya no cuenta como desempleado. ¿Qué le hace eso a la tasa?' }, 'Dejar de buscar saca gente de la cuenta.')],
    cierre: 'Lo que alcanza la plata, quién busca y no encuentra, quién trabaja informal y cómo se reparte lo que hay.',
  });

  xpAmplia('icf-sc-economia-3', {
    conecta: 'icf-sc-economia-1',
    desde: [
      ['Desde cero: comprar y vender entre países',
        xpMira('dibujo', 'Desde el principio: los países también **compran y venden** entre sí, y casi todo viaja en barco.', { dib: barco, v: { barco: 1 }, alto: 206 }, [
          ['En la lección de precios viste cómo se cruzan oferta y demanda.', { barco: 1 }],
          ['Exportar es venderle a otro país; importar es comprarle.', { barco: 1, r: 'exportar e importar' }],
          ['Colombia exporta, por ejemplo, café y flores, e importa celulares y maquinaria.', { barco: 1, cont: 1, r: 'café sale, celulares entran' }],
          ['Un arancel es un impuesto a lo que entra de afuera.', { barco: 1, cont: 1, r: 'arancel' }],
          ['Globalización: países cada vez más conectados por comercio, dinero, ideas y personas.', { barco: 1, cont: 1, r: 'globalización' }],
        ], 'Exportar es vender afuera, importar es comprar afuera; el arancel cobra lo que entra.'),
        xpHaz('hoja', 'Subraya un caso de **importación** para Colombia.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un caficultor del Huila vende café a Japón.'], ['Una tienda de Medellín compra computadores hechos en Asia.'], ['Un bogotano compra arepas en Bogotá.']], pista: 'Importar es comprarle a otro país. ¿Quién trae algo de afuera?' }, 'Los computadores entran de afuera.')],
    ],
    despues: [
      ['Más difícil: la cadena se rompe lejos',
        xpMira('hoja', 'Un paso más: hoy un producto pasa por **varios países**. Un problema lejano puede sentirse aquí.', { paras: [['Un celular se diseña en un país, sus piezas se hacen en otro y se arma en un tercero.'], ['Una fábrica de chips lejana se detiene por una inundación.'], ['Faltan piezas y se arman menos celulares.'], ['Aquí suben los precios aunque nada pasó en Colombia.']] }, [
          ['Hoy un producto viaja por varios países antes de llegar a tus manos.', { luz: [0], nota: { 0: 'cadena' } }],
          ['Si un eslabón se rompe lejos…', { luz: [1], nota: { 1: 'falla' } }],
          ['…se produce menos: baja la oferta.', { luz: [2], nota: { 2: 'oferta baja' } }],
          ['Y el precio sube aquí, aunque el problema fue allá.', { luz: [3], nota: { 3: 'efecto aquí' } }],
          ['Trampa: buscar solo causas locales. En una red, lo lejano también pesa.', {}],
        ], 'En una economía conectada, un problema lejano puede subir precios aquí por la cadena.'),
        xpHaz('hoja', 'Sube mucho el precio mundial del trigo. Colombia importa casi todo su trigo. Subraya el efecto **más probable**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Sube el precio del pan.'], ['Baja el precio del pan.'], ['No pasa nada, porque el trigo es de afuera.']], pista: 'El pan se hace con trigo. Si el trigo que se compra afuera cuesta más…' }, 'Lo que se importa más caro encarece el pan.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **¿qué actor tiene más razones para oponerse?** Arma la tabla de quién gana y quién pierde.', { letras: ['A', 'B', 'C', 'D'], paras: [['Los cultivadores de maíz del país, que competirían con maíz más barato.'], ['Las familias que compran maíz, porque pagarían más.'], ['Los importadores, porque venderían más.'], ['Nadie, porque el libre comercio beneficia a todos por igual.']] }, [
          ['El caso: un tratado quita el arancel al maíz importado, más barato que el nacional.', {}],
          ['Esta invierte: las familias pagarían menos, no más.', { luz: [1], nota: { 1: 'invertida' } }],
          ['Esta también invierte: los importadores ganan, así que estarían a favor.', { luz: [2], nota: { 2: 'invertida' } }],
          ['Esta generaliza: abrir la puerta siempre deja ganadores y perdedores.', { luz: [3], nota: { 3: 'generaliza' } }],
          ['Quienes producen aquí compiten con algo más barato: ellos se oponen.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Al bajar un arancel ganan quienes compran e importan; arriesgan quienes producen aquí.'),
      xpHaz('hoja', 'Una empresa extranjera abre una planta en Colombia porque aquí los salarios son más bajos que en su país. Subraya lo **correcto**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Lo hace para pagar los salarios más altos del mundo.'], ['Crea empleo aquí, pero podría irse si halla salarios más bajos en otra parte.'], ['Solo trae ventajas, sin ningún riesgo.'], ['No tiene relación con la globalización.']], pista: 'Descarta lo que contradice el caso y lo que dice «solo» o «ningún».' }, 'Empleo hoy, con el riesgo de que se vaya.')],
    cierre: 'Países conectados: lo que entra y sale, quién gana y quién arriesga, y problemas lejanos que llegan aquí.',
  });
}
