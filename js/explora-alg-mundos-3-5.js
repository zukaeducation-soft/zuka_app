// Álgebra · mundos 3 (Escalas y Proporciones), 4 (Exponentes y Radicales) y 5 (Sucesiones y Series), Explora. Ejemplos propios.
{
  // ---------------------------------------------------------------------------------------------------------- alg-12
  const dosB = (v, K) => XM.bolas(K, 40, 50, v.a, 'fa', 24, 10) + XM.bolas(K, 40, 90, v.b, 'fg', 24, 10) + (v.p ? K.t(170, 136, v.p, 'b ta') : '');
  const parte = (v, K) => XM.barra(K, 50, [...Array.from({ length: Math.round(v.a) }, () => [1, '', 'fa']), ...Array.from({ length: Math.round(v.b) }, () => [1, '', 'fg'])], { h: 44 }) + K.t(170, 34, `${Math.round(v.a)} : ${Math.round(v.b)}`, 'b ta');
  xpLec('alg-12', [
    ['Comparar dividiendo', xpMira('dibujo', 'Empecemos por la idea: una **razón** compara dividiendo.', { dib: dosB, v: { a: 8, b: 4, p: '' }, alto: 150 }, [
      ['Un arroz con 8 tazas de agua y 4 de arroz.', {}],
      ['Restando, hay 4 más de agua. Dividiendo, hay el doble.', { p: '8 : 4' }, '$\\tfrac84 = 2$'],
      ['Con 4 de agua y 2 de arroz sabe igual: la razón es la misma.', { a: 4, b: 2, p: '4 : 2 = 2 : 1' }, '$\\tfrac42 = 2$'],
      ['La resta cambió; la razón, no.', {}, '$8 : 4 = 4 : 2$'],
      ['El orden importa: agua a arroz no es arroz a agua.', { p: '2 : 1 ≠ 1 : 2' }, '$2 : 1 \\neq 1 : 2$'],
    ], 'La razón de a a b es $\\tfrac{a}{b}$; se conserva al agrandar las dos partes por igual.'),
    xpMueve('Con **9** tazas de agua, pon el arroz para conservar la razón 3 : 1.', 220, { a: 9, b: 1, p: '' }, [xpRegla('b', 1, 8, 'tazas de arroz')], { b: 3 }, dosB, '$9 : 3 = 3 : 1$.', { lee: v => `$9 : ${v.b}$` })],
    ['Parte y todo', xpMira('dibujo', 'Segunda idea: de una razón salen las **fracciones del todo**.', { dib: parte, v: { a: 2, b: 3 }, alto: 120 }, [
      ['Una pintura lleva 2 partes de rojo por 3 de blanco.', {}, '$2 : 3$'],
      ['Son 5 partes en total.', {}, '$2 + 3 = 5$'],
      ['El rojo es dos quintos del total, no dos tercios.', {}, '$\\tfrac25$'],
      ['Dos tercios compara rojo con blanco.', {}, '$\\tfrac23$'],
    ], 'Si la razón es a : b, la primera parte es $\\tfrac{a}{a+b}$ del todo.'),
    xpFila('La razón de gatos a perros es 3 : 5 y hay 40 animales. Completa.', ['una parte', 'gatos', 'perros'], ['5', '15', '25'], ['8', '24', '16'], 'Son ocho partes iguales.', '$40 \\div 8 = 5$: $15$ gatos y $25$ perros.')],
    ['Por cada uno', xpMira('dibujo', 'Tercera idea: la **tasa** dice cuánto por cada uno.', { dib: (v, K) => XM.barra(K, 50, Array.from({ length: Math.round(v.k) }, () => [1, v.t, 'fa']), { h: 44, T: 4 }) + K.t(170, 34, v.p, 'b ta'), v: { k: 4, t: '', p: '240 km en 4 h' }, alto: 120 }, [
      ['Un tren hace 240 km en 4 horas.', {}, '$\\tfrac{240}{4}$'],
      ['Se reparte en cuatro horas iguales: 60 por hora.', { t: '60' }, '$60 \\ \\tfrac{\\text{km}}{\\text{h}}$'],
      ['En una hora, 60.', { k: 1, p: '60 km en 1 h' }, '$60$'],
      ['En tres horas, tres veces eso.', { k: 3, p: '180 km en 3 h' }, '$3 \\cdot 60 = 180$'],
    ], 'La tasa por unidad permite comparar y calcular cualquier cantidad.'),
    xpFila('A: 6 libras por 24 mil. B: 4 libras por 18 mil. Pon el precio por libra (en miles) y la más barata.', ['A', 'B', 'barata'], ['4', '4.5', 'tienda A'], ['tienda B', '6'], 'Divide pesos entre libras en cada una.', '$24 \\div 6 = 4$ y $18 \\div 4 = 4.5$.')],
    ['Ahora sí, un problema', xpFila('Una mezcla lleva 3 partes de té por 1 de miel. Para 20 vasos, ¿cuántos de cada una?', ['té', 'miel'], ['15', '5'], ['60', '10', '4'], 'Son cuatro partes: ¿de cuántos vasos cada una?', '$20 \\div 4 = 5$: 15 y 5.')],
  ], 'Razón: comparar dividiendo. Se conserva al escalar y reparte el todo.');

  // ---------------------------------------------------------------------------------------------------------- alg-12e
  const rayo = (v, K) => { const P = XM.plano(K, 0, 6, 0, 12, { H: 170, gy: 2 }); return P.s + XM.curva(K, P, x => v.k * x) + K.c(P.X(v.x), P.Y(v.k * v.x), 6, 'fA') + K.t(P.X(v.x) - 10, P.Y(v.k * v.x) - 8, `(${K.sig(v.x)}, ${K.sig(v.k * v.x)})`, 's', 'end'); };
  const hip = (v, K) => { const P = XM.plano(K, 0, 12, 0, 12, { H: 190, g: 2 }); const y = 24 / v.x; return P.s + XM.curva(K, P, x => 24 / x) + `<rect class="xf fa" x="${P.X(0)}" y="${P.Y(y)}" width="${P.X(v.x) - P.X(0)}" height="${P.Y(0) - P.Y(y)}"/>` + K.c(P.X(v.x), P.Y(y), 6, 'fA') + K.t(Math.min(P.X(v.x) + 8, 236), Math.max(18, P.Y(y) - 8), `${K.sig(v.x)} · ${K.sig(y)} = 24`, 's', 'start'); };
  xpLec('alg-12e', [
    ['Dos razones iguales', xpMira('dibujo', 'Empecemos por la idea: una **proporción** son dos razones iguales.', { dib: (v, K) => XM.pasos(K, v, ['4/6 = 10/15', '4 · 15 = 6 · 10', '60 = 60'], 44, 38), v: { n: 1 }, alto: 150 }, [
      ['Cuatro sextos y diez quinceavos: las dos valen dos tercios.', {}, '$\\tfrac46 = \\tfrac{10}{15}$'],
      ['En cruz: 4 por 15 y 6 por 10.', { n: 2 }, '$4 \\cdot 15 = 6 \\cdot 10$'],
      ['Dan lo mismo. Siempre pasa si las razones son iguales.', { n: 3 }, '$60 = 60$'],
      ['Con eso se halla el que falte.', {}, '$\\tfrac{a}{b} = \\tfrac{c}{d} \\Leftrightarrow ad = bc$'],
    ], '$\\tfrac{a}{b} = \\tfrac{c}{d}$ cuando $ad = bc$.'),
    xpFila('Completa: $\\tfrac{6}{9} = \\tfrac{14}{x}$.', ['9 · 14', 'x'], ['126', '21'], ['84', '17', '20'], 'Seis por x es lo mismo que nueve por catorce.', '$x = \\tfrac{126}{6} = 21$.')],
    ['Crecen juntas', xpMira('dibujo', 'Segunda idea: en la **directa**, el cociente no cambia y la gráfica es una recta por el origen.', { dib: rayo, v: { k: 2, x: 1 }, alto: 180 }, [
      ['Cada metro de cinta vale 2 mil: un metro, dos mil.', {}, '$\\tfrac21 = 2$'],
      ['Al doble de metros, el doble de pesos.', { x: 2 }, '$\\tfrac42 = 2$'],
      ['Con 5 metros, 10 mil. El cociente sigue en 2.', { x: 5 }, '$\\tfrac{10}{5} = 2$'],
      ['Todos los puntos caen en una recta que sale del cero.', {}, '$y = 2x$'],
    ], 'Directa: $\\tfrac{y}{x} = k$; si una se multiplica, la otra también.'),
    xpMueve('Mueve la constante hasta que con 4 metros se paguen **6** mil.', 260, { k: 2.5, x: 4 }, [xpRegla('k', 0.5, 2.5, 'miles por metro', 0.5)], { k: 1.5 }, rayo, '$\\tfrac64 = 1.5$.', { lee: v => `$4 \\cdot ${v.k} = ${4 * v.k}$` })],
    ['Una sube y la otra baja', xpMira('dibujo', 'Tercera idea: en la **inversa**, lo que no cambia es el **producto**.', { dib: hip, v: { x: 2 }, alto: 200 }, [
      ['2 pintores tardan 12 horas: 24 horas de trabajo.', {}, '$2 \\cdot 12 = 24$'],
      ['Con el doble de pintores, la mitad del tiempo.', { x: 4 }, '$4 \\cdot 6 = 24$'],
      ['Con 8, tres horas. El área del rectángulo no cambia.', { x: 8 }, '$8 \\cdot 3 = 24$'],
      ['La gráfica baja y nunca toca los ejes.', {}, '$y = \\tfrac{24}{x}$'],
    ], 'Inversa: $x \\cdot y = k$; si una se duplica, la otra queda en la mitad.'),
    xpMueve('El trabajo son 24 horas. ¿Cuántos pintores para terminar en **4** horas?', 280, { x: 2 }, [xpRegla('x', 2, 12, 'pintores')], { x: 6 }, hip, '$24 \\div 4 = 6$.', { lee: v => `$${v.x} \\cdot ${Math.round(2400 / v.x) / 100}$` })],
    ['Ahora sí, un problema', xpFila('Una reserva alcanza para 10 caballos durante 18 días. ¿Cuántas raciones hay y cuánto dura con 12 caballos?', ['raciones', 'días'], ['180', '15'], ['120', '21.6', '20'], 'Más caballos, menos días: se conserva el producto.', '$10 \\cdot 18 = 180$; $180 \\div 12 = 15$.')],
  ], 'Directa conserva el cociente; inversa conserva el producto.');

  // ---------------------------------------------------------------------------------------------------------- alg-12f
  const tabla = (f, v, K) => f.map((r, i) => r.map((t, j) => K.f(v.n - i, K.r(22 + j * 100, 24 + i * 42, 96, 36, i ? 'fc' : 'fa', 6) + K.t(70 + j * 100, 47 + i * 42, t, i ? 'b' : 's'))).join('')).join('');
  xpLec('alg-12f', [
    ['Pasar por uno', xpMira('dibujo', 'Empecemos por la idea: la **regla de tres** pasa por uno.', { dib: (v, K) => tabla([['frascos', 'gramos', ''], ['6', '270', ''], ['1', '45', '÷ 6'], ['10', '450', '· 10']], v, K), v: { n: 1 }, alto: 200 }, [
      ['Seis frascos traen 270 gramos. ¿Cuánto traen diez?', { n: 2 }, '$6 \\to 270$'],
      ['Uno solo trae la sexta parte: 45.', { n: 3 }, '$270 \\div 6 = 45$'],
      ['Diez, diez veces eso.', { n: 4 }, '$10 \\cdot 45 = 450$'],
      ['Es lo mismo que la cruz: diez por 270 entre seis.', {}, '$x = \\tfrac{10 \\cdot 270}{6}$'],
    ], 'Primero cuánto toca a uno; luego, a los que pidan.'),
    xpFila('8 m de tela valen 56 mil. ¿Cuánto vale 1 m y cuánto 5 m (en miles)?', ['1 m', '5 m'], ['7', '35'], ['40', '8', '30'], 'Reparte 56 en ocho.', '$56 \\div 8 = 7$ y $7 \\cdot 5 = 35$.')],
    ['Primero, ¿directa o inversa?', xpMira('dibujo', 'Segunda idea: antes de la cuenta se pregunta **qué pasa con más**.', { dib: (v, K) => tabla([['grifos', 'minutos', ''], ['3', '20', '60'], ['1', '60', '· 3'], ['5', '12', '÷ 5']], v, K), v: { n: 1 }, alto: 200 }, [
      ['Tres grifos llenan un tanque en 20 minutos. ¿Y cinco?', { n: 2 }, '$3 \\to 20$'],
      ['Más grifos, **menos** tiempo: es inversa.', {}, '$3 \\cdot 20 = 60$'],
      ['Uno solo tardaría el triple.', { n: 3 }, '$60$'],
      ['Entre cinco, la quinta parte.', { n: 4 }, '$60 \\div 5 = 12$'],
    ], 'Si más trae menos, se multiplica primero: es inversa.'),
    xpFila('4 tractores aran en 15 h. ¿Cuánto tarda 1 y cuánto tardan 6?', ['1 tractor', '6 tractores'], ['60', '10'], ['22.5', '90', '2.5'], 'Más tractores, menos horas.', '$4 \\cdot 15 = 60$; $60 \\div 6 = 10$.')],
    ['Más de dos cantidades', xpMira('dibujo', 'Tercera idea: en la **compuesta** se lleva todo a uno, paso a paso.', { dib: (v, K) => tabla([['obreros', 'días', 'metros'], ['4', '3', '60'], ['1', '1', '5'], ['6', '2', '60']], v, K), v: { n: 1 }, alto: 200 }, [
      ['Cuatro obreros en 3 días hacen 60 m de muro.', { n: 2 }, '$4 \\cdot 3 = 12$'],
      ['Son doce días de obrero: cada uno vale 5 metros.', { n: 3 }, '$60 \\div 12 = 5$'],
      ['Seis obreros en 2 días son otra vez doce.', { n: 4 }, '$6 \\cdot 2 \\cdot 5 = 60$'],
      ['Cada cantidad se mira por aparte con lo que se pide.', {}, '$\\text{uno, en un día}$'],
    ], 'Compuesta: halla lo que hace uno en una unidad y vuelve a armar.'),
    xpFila('3 máquinas en 4 h llenan 240 frascos. ¿Cuántos llena una en 1 h? ¿Y 5 en 2 h?', ['una en 1 h', '5 en 2 h'], ['20', '200'], ['60', '80', '400'], 'Son doce horas de máquina.', '$240 \\div 12 = 20$ y $5 \\cdot 2 \\cdot 20 = 200$.')],
    ['Ahora sí, un problema', xpFila('6 personas comen 36 panes en 3 días. ¿Cuántos panes por persona y día? ¿Cuántos comen 5 en 4 días?', ['por día', 'total'], ['2', '40'], ['6', '30', '24'], 'Son 18 raciones.', '$36 \\div 18 = 2$; $5 \\cdot 4 \\cdot 2 = 40$.')],
  ], 'Directa o inversa primero; después, pasar por uno.');

  // ---------------------------------------------------------------------------------------------------------- alg-13
  const cien = (v, K) => { const n = Math.round(v.k); let h = ''; for (let i = 0; i < 100; i++) h += K.r(80 + (i % 10) * 18, 12 + Math.floor(i / 10) * 14, 16, 12, i < n ? 'fa' : 'fc', 2); return h + (v.p ? K.t(170, 174, v.p, 'ta') : ''); };
  const doble = (v, K) => XM.barra(K, 60, [[v.k, `${K.sig(v.k)} %`, 'fa'], [100 - v.k, '', 'fc']], { h: 40 }) + K.t(20, 48, '0', 's tm') + K.t(320, 48, v.T, 's tm') + K.t(20 + v.k * 3, 120, K.sig(v.k * v.T / 100), 'b ta');
  xpLec('alg-13', [
    ['De cada cien', xpMira('dibujo', 'Empecemos por la idea: **por ciento** es «de cada cien».', { dib: cien, v: { k: 0, p: '' }, alto: 185 }, [
      ['Cien semillas. Germinan 35.', { k: 35 }, '$35\\,\\%$'],
      ['Es la fracción 35 sobre 100.', {}, '$\\tfrac{35}{100} = 0.35$'],
      ['La mitad es 50 de cada cien.', { k: 50 }, '$50\\,\\% = \\tfrac12$'],
      ['El total completo, cien.', { k: 100 }, '$100\\,\\% = 1$'],
      ['Se puede pasar de 100: 150 % es una vez y media.', {}, '$150\\,\\% = 1.5$'],
    ], '$p\\,\\%$ es $\\tfrac{p}{100}$.'),
    xpMueve('Pinta el porcentaje que equivale a $\\tfrac{3}{20}$.', 250, { k: 50, p: '' }, [xpRegla('k', 0, 60, 'por ciento', 5)], { k: 15 }, cien, '$\\tfrac{3}{20} = \\tfrac{15}{100}$.', { lee: v => `$${v.k}\\,\\%$` })],
    ['El porcentaje de algo', xpMira('dibujo', 'Segunda idea: el **10 %** y la **mitad** sirven para casi todo.', { dib: doble, v: { k: 10, T: 80 }, alto: 140 }, [
      ['De 80 sillas, el 10 % son 8.', {}, '$80 \\div 10 = 8$'],
      ['El 30 %, tres veces eso.', { k: 30 }, '$3 \\cdot 8 = 24$'],
      ['El 5 %, la mitad del 10 %.', { k: 5 }, '$4$'],
      ['El 35 %: 30 más 5.', { k: 35 }, '$24 + 4 = 28$'],
      ['O de una: 0.35 por 80.', {}, '$0.35 \\cdot 80 = 28$'],
    ], '$p\\,\\%$ de T es $\\tfrac{p}{100} \\cdot T$; se arma con el 10 % y el 5 %.'),
    xpMueve('Mueve la barra hasta que la parte sea **33** de 60.', 210, { k: 10, T: 60 }, [xpRegla('k', 0, 100, 'por ciento', 5)], { k: 55 }, doble, '50 % son 30 y 5 % son 3.', { lee: v => `$${v.k}\\,\\% \\to ${v.k * 0.6}$` })],
    ['Qué porcentaje y cuál era el todo', xpMira('dibujo', 'Tercera idea: hay tres preguntas con la misma barra.', { dib: doble, v: { k: 20, T: 150 }, alto: 140 }, [
      ['Parte: el 20 % de 150 es 30.', {}, '$0.2 \\cdot 150 = 30$'],
      ['Porcentaje: 60 de 150. Se divide.', { k: 40 }, '$\\tfrac{60}{150} = 40\\,\\%$'],
      ['Todo: si 45 es el 30 %, el 10 % es 15…', { k: 30 }, '$45 \\div 3 = 15$'],
      ['…y el total, diez veces eso.', { k: 100 }, '$150$'],
    ], 'Parte = porcentaje · todo; las otras dos se despejan.'),
    xpFila('18 es el 24 % de un número. Pon el 1 % y el número.', ['1 %', 'el número'], ['0.75', '75'], ['4.32', '43', '0.24'], 'Reparte 18 en veinticuatro.', '$18 \\div 24 = 0.75$ y $100 \\cdot 0.75 = 75$.')],
    ['Ahora sí, un problema', xpFila('De 250 boletas, se vendió el 64 %. ¿Cuántas se vendieron y cuántas faltan?', ['vendidas', 'faltan'], ['160', '90'], ['64', '186', '100'], 'El 1 % son 2.5 boletas; o la mitad (125) más el 14 %.', '$0.64 \\cdot 250 = 160$.')],
  ], 'Un porcentaje es una razón sobre cien: siempre di de qué todo.');

  // ---------------------------------------------------------------------------------------------------------- alg-13c
  const sube = (v, K) => XM.barra(K, 40, [[100, 'antes: 100', 'fa']], { h: 34, W: 200, T: 100 }) + K.r(20, 96, 2 * v.f, 34, 'fg') + K.t(30, 118, `ahora: ${K.sig(v.f)}`, 's', 'start') + K.l(220, 30, 220, 140, 'lm d');
  xpLec('alg-13c', [
    ['Un solo factor', xpMira('dibujo', 'Empecemos por la idea: subir o bajar es **multiplicar** por un factor.', { dib: sube, v: { f: 100 }, alto: 150 }, [
      ['El precio de antes es el 100 %.', {}, '$100\\,\\%$'],
      ['Sube 30 %: queda el 130 %, o 1.3 veces.', { f: 130 }, '$1 + 0.3 = 1.3$'],
      ['Baja 30 %: queda el 70 %, o 0.7 veces.', { f: 70 }, '$1 - 0.3 = 0.7$'],
      ['Lo que se paga es lo que queda, no lo que se quita.', {}, '$0.7 \\cdot \\text{precio}$'],
    ], 'Subir p %: $\\cdot (1 + \\tfrac{p}{100})$. Bajar p %: $\\cdot (1 - \\tfrac{p}{100})$.'),
    xpMueve('Pon el nuevo valor de 100 después de **bajar 15 %**.', 230, { f: 100 }, [xpRegla('f', 50, 150, 'de cada 100', 5)], { f: 85 }, sube, 'Queda el 85 %: factor $0.85$.', { lee: v => `$\\cdot ${v.f / 100}$` })],
    ['Cuánto cambió', xpMira('dibujo', 'Segunda idea: el cambio se compara con lo **de antes**.', { dib: (v, K) => XM.barra(K, 40, [[v.a, K.sig(v.a), 'fa']], { h: 34, T: 100 }) + XM.barra(K, 90, [[v.b, K.sig(v.b), 'fg']], { h: 34, T: 100 }), v: { a: 50, b: 50 }, alto: 140 }, [
      ['Un club pasó de 50 socios…', {}],
      ['…a 70. Subió 20.', { b: 70 }, '$70 - 50 = 20$'],
      ['De los 50 que había, 20 es el 40 %.', {}, '$\\tfrac{20}{50} = 40\\,\\%$'],
      ['Si vuelve de 70 a 50, baja 20 de 70: menos del 29 %.', { a: 70, b: 50 }, '$\\tfrac{20}{70} \\approx 28.6\\,\\%$'],
    ], 'Cambio porcentual: $\\tfrac{\\text{nuevo} - \\text{viejo}}{\\text{viejo}}$.'),
    xpFila('De 80 a 92. Pon lo que subió y el porcentaje.', ['subió', 'por ciento'], ['12', '15 %'], ['12 %', '13 %', '172'], 'Compara con el 80.', '$\\tfrac{12}{80} = 0.15$.')],
    ['Volver al precio', xpMira('dibujo', 'Tercera idea: para volver atrás se **divide** entre el factor.', { dib: (v, K) => XM.pasos(K, v, ['antes · 0.8 = 48', 'antes = 48 ÷ 0.8', 'antes = 60'], 44, 38), v: { n: 1 }, alto: 150 }, [
      ['Con 20 % de rebaja un libro quedó en 48 mil.', {}, '$x \\cdot 0.8 = 48$'],
      ['48 es el 80 %, no el 100 %.', { n: 2 }, '$x = 48 \\div 0.8$'],
      ['Antes del descuento valía 60.', { n: 3 }, '$60$'],
      ['Sumarle el 20 % a 48 da 57.6: no es lo mismo.', {}, '$48 \\cdot 1.2 = 57.6$'],
    ], 'El precio anterior es el nuevo dividido entre el factor.'),
    xpFila('Tras subir 25 %, un arriendo quedó en 900 mil. Pon el factor y el valor de antes.', ['factor', 'antes'], ['1.25', '720'], ['0.75', '675', '0.25'], '900 es el 125 %.', '$900 \\div 1.25 = 720$.')],
    ['Ahora sí, un problema', xpFila('Una silla de 160 mil baja 35 %. Pon el factor y lo que se paga.', ['factor', 'se paga'], ['0.65', '104'], ['0.35', '56', '125'], 'Queda el 65 %.', '$160 \\cdot 0.65 = 104$.')],
  ], 'Un cambio es un factor; volver es dividir; comparar, con lo de antes.');

  // ---------------------------------------------------------------------------------------------------------- alg-13d
  const casc = (v, K) => [100, 100 * v.f, 100 * v.f * v.g].map((x, i) => K.r(40 + i * 95, 160 - x * 0.75, 70, x * 0.75, ['fa', 'fg', 'ff'][i]) + K.t(75 + i * 95, 152 - x * 0.75, K.sig(Math.round(x * 10) / 10), 'b')).join('');
  xpLec('alg-13d', [
    ['Los factores se multiplican', xpMira('dibujo', 'Empecemos por la idea: cambios seguidos **se multiplican**, no se suman.', { dib: casc, v: { f: 1, g: 1 }, alto: 170 }, [
      ['El precio empieza en 100.', {}, '$100 \\text{ al principio}$'],
      ['Baja 20 %: quedan 80.', { f: 0.8 }, '$100 \\cdot 0.8 = 80$'],
      ['Baja otro 50 %, pero de 80: quedan 40.', { g: 0.5 }, '$80 \\cdot 0.5 = 40$'],
      ['En total bajó 60 %, no 70 %.', {}, '$0.8 \\cdot 0.5 = 0.4$'],
    ], 'Factor total = producto de los factores.'),
    xpMueve('El primero sube 20 % (120). Mueve el segundo hasta que termine en **90**.', 250, { f: 1.2, g: 1.5 }, [xpRegla('g', 0.5, 1.5, 'segundo factor', 0.25)], { g: 0.75 }, casc, '$1.2 \\cdot 0.75 = 0.9$.', { lee: v => `$1.2 \\cdot ${v.g} = ${Math.round(120 * v.g) / 100}$` })],
    ['Subir y bajar lo mismo', xpMira('dibujo', 'Segunda idea: subir p % y bajar p % **no** deja igual.', { dib: casc, v: { f: 1, g: 1 }, alto: 170 }, [
      ['Sube 30 %: de 100 a 130.', { f: 1.3 }, '$\\cdot 1.3$'],
      ['Baja 30 %, pero de 130: son 39.', { g: 0.7 }, '$\\cdot 0.7$'],
      ['Queda 91: se perdió 9 %.', {}, '$1.3 \\cdot 0.7 = 0.91$'],
      ['El orden no importa: multiplicar es conmutativo.', { f: 0.7, g: 1.3 }, '$0.7 \\cdot 1.3 = 0.91$'],
    ], '$(1 + r)(1 - r) = 1 - r^2$: siempre menos de 1.'),
    xpFila('Sube 10 % y luego baja 10 %. Pon el factor total y el cambio.', ['factor', 'cambio'], ['0.99', '−1 %'], ['1', '0 %', '1.01'], '$1.1 \\cdot 0.9$.', 'Se pierde el 1 %.')],
    ['Repetir el mismo cambio', xpMira('dibujo', 'Tercera idea: el mismo cambio muchas veces es una **potencia**.', { dib: (v, K) => Array.from({ length: Math.round(v.n) + 1 }, (_, i) => K.r(22 + i * 50, 170 - 20 * 1.5 ** i, 40, 20 * 1.5 ** i, 'fa') + K.t(42 + i * 50, 162 - 20 * 1.5 ** i, K.sig(Math.round(20 * 1.5 ** i)), 's')).join(''), v: { n: 0 }, alto: 180 }, [
      ['20 abejas; cada mes hay 50 % más.', {}, '$20 \\text{ abejas}$'],
      ['Un mes: por 1.5.', { n: 1 }, '$20 \\cdot 1.5$'],
      ['Dos meses: por 1.5 otra vez.', { n: 2 }, '$20 \\cdot 1.5^2$'],
      ['A los cuatro meses ya pasan de 100.', { n: 4 }, '$20 \\cdot 1.5^4 \\approx 101$'],
    ], 'n veces el factor f: $\\cdot f^n$.'),
    xpFila('Un valor baja a la mitad tres veces. Pon el factor total y la baja en por ciento.', ['factor', 'baja'], ['1/8', '87.5 %'], ['1/6', '150 %', '12.5 %'], 'Un medio por un medio por un medio.', '$\\tfrac18 = 12.5\\,\\%$ queda.')],
    ['Ahora sí, un problema', xpFila('«20 % de descuento más otro 25 %». De 100, ¿cuánto se paga y de cuánto fue el descuento?', ['se paga', 'descuento'], ['60', '40 %'], ['55', '45 %', '80'], '$0.8 \\cdot 0.75$.', 'No es 45 %: el segundo se toma sobre 80.')],
  ], 'Cambios en cadena: multiplica factores.');

  // ---------------------------------------------------------------------------------------------------------- alg-21a
  const torre = (v, K) => { const b = v.b, e = Math.round(v.e), N = Math.round(b ** e); const c = N > 32 ? 16 : Math.max(1, Math.round(Math.sqrt(N))), u = N > 32 ? 13 : 24; return Array.from({ length: Math.min(N, 130) }, (_, i) => K.r(170 - c * u / 2 + (i % c) * u, 40 + Math.floor(i / c) * u, u - 2, u - 2, 'fa', 2)).join('') + K.t(170, 26, `${b}${['⁰', '¹', '²', '³', '⁴', '⁵', '⁶'][e]} = ${N}`, 'b ta'); };
  xpLec('alg-21a', [
    ['Multiplicar repetido', xpMira('dibujo', 'Empecemos por la idea: una **potencia** cuenta factores iguales.', { dib: torre, v: { b: 3, e: 1 }, alto: 190 }, [
      ['Empecemos con un solo factor: el 3.', {}, '$3^1 = 3$'],
      ['Dos factores de 3.', { e: 2 }, '$3^2 = 3 \\cdot 3 = 9$'],
      ['Tres factores: 27, no 9.', { e: 3 }, '$3^3 = 3 \\cdot 3 \\cdot 3 = 27$'],
      ['La base se repite; el exponente dice cuántas veces.', {}, '$a^n$'],
      ['Bajar un exponente divide entre 3. Por eso a la cero da 1.', { e: 0 }, '$3^0 = 1$'],
    ], '$a^n$: n factores iguales a a. Y $a^0 = 1$ si $a \\neq 0$.'),
    xpMueve('¿Qué exponente hace que 2 llegue a **64**?', 240, { b: 2, e: 1 }, [xpRegla('e', 0, 6, 'exponente')], { e: 6 }, torre, '$2^6 = 64$.', { lee: v => `$2^{${v.e}}$` })],
    ['El signo', xpMira('dibujo', 'Segunda idea: con base negativa manda la **cantidad** de factores.', { dib: (v, K) => { const e = Math.round(v.e); return Array.from({ length: e }, (_, i) => K.c(50 + i * 50, 60, 20, 'ff') + K.t(50 + i * 50, 66, v.q > 0.5 ? '2' : '−2', 'b')).join('') + K.t(170, 130, v.q > 0.5 ? '−(2 · 2 · 2 · 2) = −16' : e % 2 ? 'sobra uno: negativo' : 'en parejas: positivo', 'ta'); }, v: { e: 1, q: 0 }, alto: 150 }, [
      ['Un factor −2: negativo.', {}, '$(-2)^1 = -2$'],
      ['Dos: una pareja da positivo.', { e: 2 }, '$(-2)^2 = 4$'],
      ['Con tres factores sobra uno.', { e: 3 }, '$(-2)^3 = -8$'],
      ['Con cuatro hay dos parejas.', { e: 4 }, '$(-2)^4 = 16$'],
      ['Sin paréntesis, el menos no entra en la potencia.', { q: 1 }, '$-2^4 = -16$'],
    ], 'Exponente par: positivo; impar: negativo. Sin paréntesis el signo queda afuera.'),
    xpFila('Pon cada resultado.', ['(−3)²', '−3²', '(−1)⁷'], ['9', '−9', '−1'], ['1', '6', '−6'], '¿El menos está dentro del paréntesis? ¿Cuántos factores hay?', 'El paréntesis mete el signo.')],
    ['Exponentes negativos', xpMira('dibujo', 'Tercera idea: bajar más allá de cero **divide**.', { dib: (v, K) => XM.pasos(K, v, ['5² = 25', '5¹ = 5', '5⁰ = 1', '5⁻¹ = 1/5', '5⁻² = 1/25'], 30, 30), v: { n: 1 }, alto: 170 }, [
      ['Cada escalón divide entre 5.', { n: 2 }, '$25 \\div 5 = 5$'],
      ['El siguiente es 1.', { n: 3 }, '$5^0 = 1$'],
      ['Uno más: un quinto.', { n: 4 }, '$5^{-1} = \\tfrac15$'],
      ['Y otro: uno sobre 25.', { n: 5 }, '$5^{-2} = \\tfrac{1}{25}$'],
      ['El exponente negativo no hace negativo: invierte.', {}, '$a^{-n} = \\tfrac{1}{a^n}$'],
    ], '$a^{-n} = \\tfrac{1}{a^n}$: invierte, no cambia el signo.'),
    xpFila('Pon cada resultado.', ['2⁻³', '10⁻²', '(1/4)⁻¹'], ['1/8', '1/100', '4'], ['−8', '−4', '1/6'], 'El negativo voltea la fracción.', 'Invertir: $\\tfrac18$, $\\tfrac1{100}$ y 4.')],
    ['Ahora sí, un problema', xpMueve('Una hoja se corta en 3 y cada pedazo otra vez en 3. ¿Cuántas rondas para tener **81** pedazos?', 240, { b: 3, e: 0 }, [xpRegla('e', 0, 4, 'rondas')], { e: 4 }, torre, '$3^4 = 81$.', { lee: v => `$3^{${v.e}}$` })],
  ], 'El exponente cuenta factores; el cero da 1 y el negativo invierte.');

  // ---------------------------------------------------------------------------------------------------------- alg-21b
  const fac = (K, x, y, n, t, c) => Array.from({ length: Math.round(n) }, (_, i) => K.r(x + i * 30, y, 26, 26, c, 5) + K.t(x + 13 + i * 30, y + 19, t, 's')).join('');
  xpLec('alg-21b', [
    ['Juntar y quitar', xpMira('dibujo', 'Empecemos por la idea: las leyes solo **cuentan factores**.', { dib: (v, K) => fac(K, 40, 40, v.a, 'x', 'fa') + fac(K, 40 + v.a * 30 + 6 * v.s, 40, v.b, 'x', 'fg') + K.f(v.d, K.l(30, 80, 300, 80) + fac(K, 40, 90, v.c, 'x', 'ff')), v: { a: 3, b: 2, s: 5, d: 0, c: 2 }, alto: 130 }, [
      ['Tres factores de x y otros dos.', {}, '$x^3 \\cdot x^2$'],
      ['Juntos son cinco: los exponentes se suman.', { s: 0 }, '$x^{3+2} = x^5$'],
      ['Si abajo hay dos, se cancelan dos de arriba.', { d: 1 }, '$\\tfrac{x^5}{x^2}$'],
      ['Quedan tres: los exponentes se restan.', { b: 0, c: 0 }, '$x^{5-2} = x^3$'],
    ], '$x^m x^n = x^{m+n}$ y $\\tfrac{x^m}{x^n} = x^{m-n}$.'),
    xpFila('Pon cada exponente.', ['x⁴ · x³', 'x⁹ ÷ x²', 'x ÷ x⁴'], ['7', '7', '−3'], ['12', '4', '11'], 'Suma al multiplicar y resta al dividir. x es x a la 1.', '$4+3$, $9-2$ y $1-4$.')],
    ['Potencia de potencia', xpMira('dibujo', 'Segunda idea: repetir un paquete **multiplica** exponentes.', { dib: (v, K) => Array.from({ length: Math.round(v.k) }, (_, i) => K.r(60, 18 + i * 40, 220, 34, 'fc', 8) + fac(K, 110, 22 + i * 40, 4, 'x', 'fa')).join(''), v: { k: 1 }, alto: 150 }, [
      ['Un paquete de cuatro x.', {}, '$x^4 = x \\cdot x \\cdot x \\cdot x$'],
      ['El cubo son tres paquetes.', { k: 3 }, '$(x^4)^3$'],
      ['Tres por cuatro: doce factores.', {}, '$x^{4 \\cdot 3} = x^{12}$'],
      ['El exponente entra a cada factor de un producto.', {}, '$(ab)^n = a^n b^n$'],
      ['Pero no a una suma.', {}, '$(a + b)^2 \\neq a^2 + b^2$'],
    ], '$(x^m)^n = x^{mn}$ y $(ab)^n = a^n b^n$.'),
    xpFila('$(2x^3)^4$: pon el número y el exponente.', ['número', 'exponente'], ['16', '12'], ['8', '7', '2'], 'El 4 entra al 2 y a la x.', '$2^4 x^{12} = 16x^{12}$.')],
    ['Notación científica', xpMira('dibujo', 'Tercera idea: el 10 elevado **corre la coma**.', { dib: (v, K) => K.t(170, 60, v.a, 'B') + K.t(170, 110, v.b, 'b ta'), v: { a: '45 000', b: '' }, alto: 140 }, [
      ['Este es un número grande.', {}, '$45\\,000$'],
      ['La coma corre cuatro puestos a la izquierda.', { b: '4.5 · 10⁴' }, '$4.5 \\cdot 10^4$'],
      ['Uno pequeño la corre a la derecha: exponente negativo.', { a: '0.05', b: '5 · 10⁻²' }, '$5 \\cdot 10^{-2}$'],
      ['Al multiplicar, se suman los exponentes del 10.', { a: '(2·10³)(4·10⁵)', b: '8 · 10⁸' }, '$8 \\cdot 10^8$'],
    ], 'El exponente del 10 dice cuántos puestos corre la coma.'),
    xpFila('Pon el exponente del 10.', ['7 200 000', '0.00006', '(3·10⁴)(2·10⁻⁷)'], ['6', '−5', '−3'], ['5', '−4', '−28'], 'Cuenta los puestos hasta dejar una sola cifra antes de la coma.', '$7.2 \\cdot 10^6$, $6 \\cdot 10^{-5}$ y $6 \\cdot 10^{-3}$.')],
    ['Ahora sí, un problema', xpFila('Un cubo tiene arista $3a^2$. Su volumen es $(3a^2)^3$: pon el número y el exponente.', ['número', 'exponente'], ['27', '6'], ['9', '5', '8'], 'Tres veces el paquete.', '$27a^6$.')],
  ], 'Juntar suma, quitar resta, repetir multiplica.');

  // ---------------------------------------------------------------------------------------------------------- alg-22a
  const cuad = (v, K) => { const s = v.s * 20; return XM.reja(K, 90, 14, v.s, v.s, 20) + K.t(90 + s / 2, 30 + s, `lado ${K.sig(v.s)}`, 's') + K.t(300, 60, `área ${K.sig(v.s * v.s)}`, 'ta', 'end'); };
  xpLec('alg-22a', [
    ['Deshacer la potencia', xpMira('dibujo', 'Empecemos por la idea: la **raíz** pregunta por el lado.', { dib: cuad, v: { s: 2 }, alto: 190 }, [
      ['Un cuadrado de lado 2 tiene área 4.', {}, '$2^2 = 4$'],
      ['Con área 25, el lado es 5.', { s: 5 }, '$\\sqrt{25} = 5$'],
      ['La raíz cúbica pregunta por la arista de un cubo.', {}, '$\\sqrt[3]{27} = 3$'],
      ['El cuadrado borra el signo: raíz de x² es |x|.', {}, '$\\sqrt{x^2} = |x|$'],
      ['De un negativo no hay raíz cuadrada real; cúbica sí.', {}, '$\\sqrt[3]{-8} = -2$'],
    ], '$\\sqrt[n]{a} = b$ si $b^n = a$ (con índice par, $b \\ge 0$).'),
    xpMueve('Halla $\\sqrt{49}$: mueve el lado.', 250, { s: 3 }, [xpRegla('s', 1, 8, 'lado')], { s: 7 }, cuad, '$7^2 = 49$.', { lee: v => `$${v.s}^2 = ${v.s ** 2}$` })],
    ['El exponente fracción', xpMira('dibujo', 'Segunda idea: la raíz es un **exponente partido**.', { dib: (v, K) => XM.pasos(K, v, ['x^½ · x^½ = x¹', 'x^½ = √x', '8^⅔ = 2² = 4'], 44, 40), v: { n: 0 }, alto: 150 }, [
      ['¿Qué exponente, sumado consigo mismo, da 1? Un medio.', { n: 1 }, '$x^{1/2} \\cdot x^{1/2} = x$'],
      ['Por eso elevar a un medio es sacar raíz cuadrada.', { n: 2 }, '$x^{1/2} = \\sqrt{x}$'],
      ['Abajo va el índice; arriba, la potencia.', {}, '$x^{m/n} = \\sqrt[n]{x^m}$'],
      ['Ocho a los dos tercios: raíz cúbica y luego al cuadrado.', { n: 3 }, '$8^{2/3} = 2^2 = 4$'],
    ], '$x^{m/n} = \\sqrt[n]{x^m}$: abajo el índice.'),
    xpFila('Pon cada resultado.', ['81^½', '27^⅔', '16^¾'], ['9', '9', '8'], ['40', '18', '12'], 'Primero la raíz que dice abajo; luego la potencia.', '$9$, $3^2 = 9$ y $2^3 = 8$.')],
    ['La raíz de un producto', xpMira('dibujo', 'Tercera idea: la raíz **entra en productos**, no en sumas.', { dib: (v, K) => XM.pasos(K, v, ['√(4 · 25) = 2 · 5 = 10', '√(9 + 16) = √25 = 5', '√9 + √16 = 3 + 4 = 7'], 44, 40), v: { n: 0 }, alto: 150 }, [
      ['Raíz de 4 por 25: se puede separar.', { n: 1 }, '$\\sqrt{ab} = \\sqrt{a}\\sqrt{b}$'],
      ['Con una suma, primero se suma.', { n: 2 }, '$\\sqrt{9 + 16} = 5$'],
      ['Separarla daría 7: no es igual.', { n: 3 }, '$\\sqrt{9} + \\sqrt{16} = 7$'],
      ['Lo mismo con cocientes: sí; con restas: no.', {}, '$\\sqrt{\\tfrac{a}{b}} = \\tfrac{\\sqrt a}{\\sqrt b}$'],
    ], 'La raíz se reparte en productos y cocientes, nunca en sumas.'),
    xpFila('Pon cada resultado.', ['√(36 · 4)', '√(100/25)', '√(64 + 36)'], ['12', '2', '10'], ['14', '4', '20'], 'Solo la última no se separa.', '$6 \\cdot 2$, $10 \\div 5$ y $\\sqrt{100}$.')],
    ['Ahora sí, un problema', xpMueve('Un mosaico cuadrado usa **36** baldosas. ¿Cuántas van en cada lado?', 250, { s: 2 }, [xpRegla('s', 1, 8, 'por lado')], { s: 6 }, cuad, '$\\sqrt{36} = 6$.', { lee: v => `$${v.s}^2 = ${v.s ** 2}$` })],
  ], 'La raíz deshace la potencia y es un exponente fraccionario.');

  // ---------------------------------------------------------------------------------------------------------- alg-22b
  const sacar = (v, K) => XM.pasos(K, v, v.l || [], 44, 38);
  xpLec('alg-22b', [
    ['Sacar del radical', xpMira('dibujo', 'Empecemos por la idea: de una raíz cuadrada sale **uno por cada pareja**.', { dib: (v, K) => XM.pasos(K, v, ['√50 = √(2 · 5 · 5)', 'pareja de 5: sale un 5', '√50 = 5√2'], 44, 38), v: { n: 0 }, alto: 150 }, [
      ['Se parte 50 en factores primos.', { n: 1 }, '$50 = 2 \\cdot 5 \\cdot 5$'],
      ['Los dos cincos hacen pareja: sale uno.', { n: 2 }, '$\\sqrt{5 \\cdot 5} = 5$'],
      ['El 2 no tiene pareja: se queda.', { n: 3 }, '$5\\sqrt2$'],
      ['En la raíz cúbica salen de a tríos.', {}, '$\\sqrt[3]{54} = 3\\sqrt[3]{2}$'],
    ], 'Índice n: sale uno por cada grupo de n factores iguales.'),
    xpFila('$\\sqrt{72}$ simplificada al máximo: pon lo que sale y lo que queda.', ['afuera', 'adentro'], ['6', '2'], ['3', '8', '9'], '72 es 36 por 2.', '$\\sqrt{72} = 6\\sqrt2$.')],
    ['Sumar raíces', xpMira('dibujo', 'Segunda idea: solo se suman raíces **iguales por dentro**.', { dib: (v, K) => XM.pasos(K, v, ['√12 + √27', '2√3 + 3√3', '5√3'], 44, 38), v: { n: 1 }, alto: 150 }, [
      ['Parecen distintas. Simplifiquemos cada una.', {}, '$\\sqrt{12} + \\sqrt{27}$'],
      ['Las dos traen raíz de tres.', { n: 2 }, '$2\\sqrt3 + 3\\sqrt3$'],
      ['Dos y tres de lo mismo: cinco.', { n: 3 }, '$5\\sqrt3$'],
      ['Raíz de 2 más raíz de 3 no se junta.', {}, '$\\sqrt2 + \\sqrt3 \\neq \\sqrt5$'],
    ], 'Simplifica y suma los de la misma raíz.'),
    xpFila('$\\sqrt{8} + \\sqrt{18}$: simplifica cada una y suma.', ['√8', '√18', 'suma'], ['2√2', '3√2', '5√2'], ['√26', '6√2', '4√2'], '8 es 4 por 2; 18 es 9 por 2.', 'Cinco de $\\sqrt2$.')],
    ['Racionalizar', xpMira('dibujo', 'Tercera idea: se multiplica por **un uno bien escogido** para limpiar el denominador.', { dib: (v, K) => XM.pasos(K, v, ['6/√3 · √3/√3 = 2√3', '1/(√5 − 2) · (√5 + 2)/(√5 + 2)', '= (√5 + 2)/(5 − 4) = √5 + 2'], 44, 38, 'x'), v: { n: 0 }, alto: 150 }, [
      ['Con una sola raíz, por ella misma.', { n: 1 }, '$\\tfrac{6}{\\sqrt3} = 2\\sqrt3$'],
      ['Con una resta, por su conjugado: la misma con más.', { n: 2 }, '$(a - b)(a + b) = a^2 - b^2$'],
      ['Los cuadrados borran la raíz.', { n: 3 }, '$5 - 4 = 1$'],
      ['El valor no cambió: se multiplicó por 1.', {}, '$\\tfrac{\\sqrt5 + 2}{\\sqrt5 + 2} = 1$'],
    ], 'Una raíz: por ella. Suma o resta: por el conjugado.'),
    xpFila('$\\tfrac{4}{\\sqrt7 - \\sqrt3}$: pon el denominador que queda y el resultado.', ['abajo', 'resultado'], ['4', '√7 + √3'], ['10', '√7 − √3', '16'], 'Por el conjugado: $7 - 3$.', 'El 4 se cancela.')],
    ['Ahora sí, un problema', xpFila('Un lote cuadrado mide 80 m². Pon su lado simplificado y su perímetro.', ['lado', 'perímetro'], ['4√5', '16√5'], ['8√10', '20√5', '2√20'], '80 es 16 por 5.', '$\\sqrt{80} = 4\\sqrt5$; por cuatro lados, $16\\sqrt5$.')],
  ], 'Sacar grupos, sumar iguales y limpiar el denominador.');

  // ---------------------------------------------------------------------------------------------------------- alg-14
  const esc = (v, K) => Array.from({ length: Math.round(v.n) }, (_, i) => { const x = v.a + v.d * i; return K.r(24 + i * 50, 170 - x * 6, 40, Math.max(2, x * 6), 'fa') + K.t(44 + i * 50, 162 - x * 6, K.sig(x), 'b'); }).join('');
  xpLec('alg-14', [
    ['La diferencia', xpMira('dibujo', 'Empecemos por la idea: en una **aritmética** se suma siempre lo mismo.', { dib: esc, v: { a: 4, d: 3, n: 1 }, alto: 180 }, [
      ['El primero es 4.', {}, '$a_1 = 4$'],
      ['Se suma 3: 7, 10, 13…', { n: 4 }, '$d = 3$'],
      ['Para llegar al sexto se dan cinco saltos.', { n: 6 }, '$a_6 = 4 + 5 \\cdot 3 = 19$'],
      ['Siempre un salto menos que el puesto.', {}, '$a_n = a_1 + (n - 1)d$'],
    ], '$a_n = a_1 + (n-1)d$.'),
    xpMueve('El primero es 5. Mueve la diferencia hasta que el **quinto** sea 21.', 250, { a: 5, d: 1, n: 5 }, [xpRegla('d', 1, 5, 'diferencia')], { d: 4 }, esc, '$5 + 4 \\cdot 4 = 21$.', { lee: v => `$5 + 4 \\cdot ${v.d} = ${5 + 4 * v.d}$` })],
    ['Con dos términos basta', xpMira('dibujo', 'Segunda idea: dos términos y los **saltos que los separan** dan la diferencia.', { dib: (v, K) => { const L = XM.linea(K, 3, 8, 110, {}); return L.s + K.t(L.X(3), 80, '11', 'b ta') + K.t(L.X(8), 80, '31', 'b ta') + Array.from({ length: Math.round(v.k) }, (_, i) => K.pl([[L.X(3 + i), 100], [L.X(3.5 + i), 86], [L.X(4 + i), 100]], 'la')).join(''); }, v: { k: 0 }, alto: 150 }, [
      ['El tercero es 11 y el octavo, 31.', {}, '$a_3 = 11, \\ a_8 = 31$'],
      ['Del 3 al 8 hay cinco saltos.', { k: 5 }, '$8 - 3 = 5$'],
      ['Subió 20 en cinco saltos: 4 cada uno.', {}, '$d = \\tfrac{20}{5} = 4$'],
      ['Hacia atrás dos saltos: el primero es 3.', {}, '$11 - 2 \\cdot 4 = 3$'],
    ], '$d = \\tfrac{a_m - a_k}{m - k}$.'),
    xpFila('$a_4 = 17$ y $a_{10} = 47$. Pon los saltos, d y $a_1$.', ['saltos', 'd', 'primero'], ['6', '5', '2'], ['30', '7', '10'], 'De 4 a 10; luego, tres saltos hacia atrás.', '$30 \\div 6 = 5$; $17 - 15 = 2$.')],
    ['¿Está en la lista?', xpMira('dibujo', 'Tercera idea: un número está si cae en un **salto entero**.', { dib: (v, K) => { const L = XM.linea(K, 0, 40, 100, { p: 5 }); return L.s + [0, 1, 2, 3, 4, 5].map(i => K.c(L.X(2 + 7 * i), 100, 6, 'fa')).join('') + K.c(L.X(v.x), 70, 7, 'fF'); }, v: { x: 30 }, alto: 140 }, [
      ['2, 9, 16, 23, 30, 37…: suma 7.', {}, '$a_n = 2 + 7(n-1)$'],
      ['¿El 30? Faltan 28: cuatro saltos justos.', {}, '$28 \\div 7 = 4$'],
      ['¿El 33? Faltan 31: no son saltos enteros.', { x: 33 }, '$31 \\div 7 = 4.4\\ldots$'],
      ['Entonces 33 no está en la lista.', {}],
    ], 'Está si $\\tfrac{x - a_1}{d}$ es un entero no negativo.'),
    xpFila('En 6, 11, 16, … ¿cuántos saltos hay hasta 91 y qué puesto ocupa?', ['saltos', 'puesto'], ['17', '18'], ['16', '91', '15'], 'Faltan 85, de a cinco.', '$85 \\div 5 = 17$; puesto 18.')],
    ['Ahora sí, un problema', xpMueve('Un sendero tiene 3 farolas en la primera cuadra y en cada una siguiente suma las mismas. En la **sexta** hay 18. ¿Cuántas suma?', 250, { a: 3, d: 1, n: 6 }, [xpRegla('d', 1, 4, 'suma')], { d: 3 }, esc, '$3 + 5 \\cdot 3 = 18$.', { lee: v => `$3 + 5 \\cdot ${v.d}$` })],
  ], 'Primero más los saltos: un salto menos que el puesto.');

  // ---------------------------------------------------------------------------------------------------------- alg-14b
  const par = (v, K) => { const n = 6; let h = ''; for (let i = 0; i < n; i++) { const a = 2 + i * 2, b = 2 + (n - 1 - i) * 2; h += K.r(50 + i * 42, 160 - a * 8, 34, a * 8, 'fa') + K.f(v.g, K.r(50 + i * 42, 160 - (a + b) * 8, 34, b * 8, 'fg')); } return h; };
  xpLec('alg-14b', [
    ['La escalera doble', xpMira('dibujo', 'Empecemos por la idea: dos escaleras iguales hacen **un rectángulo**.', { dib: par, v: { g: 0 }, alto: 175 }, [
      ['Sumar 2 + 4 + 6 + 8 + 10 + 12: una escalera.', {}, '$S$'],
      ['Se pone otra igual, volteada, encima.', { g: 1 }, '$2S$'],
      ['Todas las columnas miden lo mismo: 14.', {}, '$2 + 12 = 14$'],
      ['Seis columnas de 14 son dos escaleras.', {}, '$S = \\tfrac{6 \\cdot 14}{2} = 42$'],
      ['Cuántos, por primero más último, sobre dos.', {}, '$S_n = \\tfrac{n(a_1 + a_n)}{2}$'],
    ], '$S_n = \\tfrac{n(a_1 + a_n)}{2}$.'),
    xpFila('$5 + 8 + 11 + \\cdots + 32$ tiene 10 términos. Pon el primero más el último y la suma.', ['1.º + último', 'suma'], ['37', '185'], ['370', '27', '160'], 'Diez columnas de ese alto, la mitad.', '$\\tfrac{10 \\cdot 37}{2} = 185$.')],
    ['Contar los términos', xpMira('dibujo', 'Segunda idea: antes de sumar hay que saber **cuántos son**.', { dib: (v, K) => XM.pasos(K, v, ['7, 11, 15, …, 47', '(47 − 7) ÷ 4 = 10 saltos', '11 términos', '11 · 54 ÷ 2 = 297'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['De 7 a 47, de cuatro en cuatro.', {}, '$d = 4$'],
      ['Son 40 de diferencia: diez saltos.', { n: 2 }, '$40 \\div 4 = 10$'],
      ['Y un término más que saltos.', { n: 3 }, '$n = 11$'],
      ['Ahora sí, la suma.', { n: 4 }, '$\\tfrac{11 \\cdot 54}{2} = 297$'],
    ], 'Términos = saltos + 1.'),
    xpFila('$10 + 13 + \\cdots + 40$. Pon los saltos, los términos y la suma.', ['saltos', 'términos', 'suma'], ['10', '11', '275'], ['30', '250', '12'], 'De 10 a 40, de a tres.', '$\\tfrac{11 \\cdot 50}{2} = 275$.')],
    ['El promedio', xpMira('dibujo', 'Tercera idea: la suma es el **promedio** por cuántos hay.', { dib: (v, K) => [3, 5, 7, 9, 11].map((a, i) => { const y = K.lerp(a, 7, v.t); return K.r(60 + i * 46, 160 - y * 11, 38, y * 11, 'fa') + K.t(79 + i * 46, 152 - y * 11, K.sig(Math.round(y)), 's'); }).join(''), v: { t: 0 }, alto: 170 }, [
      ['3, 5, 7, 9, 11: cinco barras.', {}, '$n = 5$'],
      ['Se emparejan: lo que sobra a las altas cubre las bajas.', { t: 1 }, '$\\tfrac{3 + 11}{2} = 7$'],
      ['Quedan cinco de siete.', {}, '$5 \\cdot 7 = 35$'],
      ['El promedio es la mitad del primero y el último.', {}, '$\\tfrac{a_1 + a_n}{2}$'],
    ], 'Suma = promedio de los extremos · cantidad.'),
    xpFila('9 términos que van de 4 a 36 en aritmética. Pon el promedio y la suma.', ['promedio', 'suma'], ['20', '180'], ['40', '360', '16'], 'La mitad de 4 más 36.', '$9 \\cdot 20 = 180$.')],
    ['Ahora sí, un problema', xpFila('Un coro tiene 12 filas: la primera con 8 sillas y cada una suma 2. Pon la última fila y el total.', ['última', 'total'], ['30', '228'], ['32', '240', '456'], 'Once saltos de dos; luego, doce columnas.', '$8 + 22 = 30$; $\\tfrac{12 \\cdot 38}{2} = 228$.')],
  ], 'Dos escaleras hacen un rectángulo: $n$ por primero más último, la mitad.');

  // ---------------------------------------------------------------------------------------------------------- alg-14c
  const geo = (v, K) => Array.from({ length: Math.round(v.n) }, (_, i) => { const x = v.a * v.r ** i, h = Math.min(140, x * v.u); return K.r(24 + i * 50, 170 - h, 40, h, 'fa') + K.t(44 + i * 50, 162 - h, K.sig(x), 's'); }).join('');
  xpLec('alg-14c', [
    ['La razón', xpMira('dibujo', 'Empecemos por la idea: en una **geométrica** se multiplica siempre por lo mismo.', { dib: geo, v: { a: 2, r: 3, n: 1, u: 0.8 }, alto: 180 }, [
      ['El primer término es 2.', {}, '$a_1 = 2 \\text{ primero}$'],
      ['Por 3 cada vez: 6, 18, 54…', { n: 4 }, '$r = 3$'],
      ['El quinto: cuatro veces por 3.', { n: 5 }, '$2 \\cdot 3^4 = 162$'],
      ['Un salto menos que el puesto, pero ahora en el exponente.', {}, '$a_n = a_1 r^{n-1}$'],
    ], '$a_n = a_1 \\cdot r^{\\,n-1}$.'),
    xpMueve('Empieza en 3. ¿Qué razón lleva al **cuarto** a 24?', 250, { a: 3, r: 1, n: 4, u: 1 }, [xpRegla('r', 1, 3, 'razón')], { r: 2 }, geo, '$3 \\cdot 2^3 = 24$.', { lee: v => `$3 \\cdot ${v.r}^3 = ${3 * v.r ** 3}$` })],
    ['Crecer, encoger y alternar', xpMira('dibujo', 'Segunda idea: la **razón** decide cómo se mueve.', { dib: (v, K) => { const P = XM.plano(K, 0, 6, -8, 8, { H: 180, gy: 4 }); return P.s + [0, 1, 2, 3, 4, 5].map(i => { const y = v.a * v.r ** i; return Math.abs(y) <= 8 ? K.c(P.X(i + 0.3), P.Y(y), 6, 'fA') + K.l(P.X(i + 0.3), P.Y(0), P.X(i + 0.3), P.Y(y), 'la') : ''; }).join(''); }, v: { a: 1, r: 1.5 }, alto: 190 }, [
      ['Razón mayor que 1: crece.', {}, '$r > 1$'],
      ['Entre 0 y 1: se encoge hacia cero.', { a: 8, r: 0.5 }, '$0 < r < 1$'],
      ['Negativa: salta de un lado a otro.', { a: 8, r: -0.75 }, '$r < 0$'],
      ['Igual a 1: no se mueve.', { a: 5, r: 1 }, '$r = 1$'],
    ], 'El tamaño de r dice si crece; su signo, si alterna.'),
    xpMueve('Mueve la razón para que, desde 8, los puntos **alternen y se encojan** a la cuarta parte.', 270, { a: 8, r: 1 }, [xpRegla('r', -1, 1, 'razón', 0.25)], { r: -0.25 }, (v, K) => { const P = XM.plano(K, 0, 6, -8, 8, { H: 180, gy: 4 }); return P.s + [0, 1, 2, 3, 4, 5].map(i => { const y = 8 * v.r ** i; return K.c(P.X(i + 0.3), P.Y(y), 6, 'fA') + K.l(P.X(i + 0.3), P.Y(0), P.X(i + 0.3), P.Y(y), 'la'); }).join(''); }, '$r = -\\tfrac14$.', { lee: v => `$r = ${v.r}$` })],
    ['Con dos términos', xpMira('dibujo', 'Tercera idea: entre dos términos se **divide** y se saca la raíz de los saltos.', { dib: (v, K) => XM.pasos(K, v, ['a₂ = 10,  a₅ = 80', '80 ÷ 10 = 8 = r³', 'r = 2', 'a₁ = 10 ÷ 2 = 5'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Del segundo al quinto hay tres saltos.', {}, '$5 - 2 = 3$'],
      ['Se multiplicó por 8 en tres saltos.', { n: 2 }, '$r^3 = 8$'],
      ['Cada salto es por 2.', { n: 3 }, '$r = \\sqrt[3]{8} = 2$'],
      ['Un salto atrás, el primero.', { n: 4 }, '$a_1 = 5$'],
    ], '$r^{\\,m-k} = \\tfrac{a_m}{a_k}$.'),
    xpFila('$a_2 = 12$ y $a_4 = 108$, con razón positiva. Pon $r^2$, r y $a_1$.', ['r²', 'r', 'primero'], ['9', '3', '4'], ['96', '48', '6'], 'Divide 108 entre 12.', '$r = 3$ y $12 \\div 3 = 4$.')],
    ['Ahora sí, un problema', xpMueve('Un rumor empieza con 4 personas y cada hora se multiplica igual. A las 2 horas lo saben **36** (tercer término). ¿Por cuánto?', 250, { a: 4, r: 1, n: 3, u: 1 }, [xpRegla('r', 1, 4, 'razón')], { r: 3 }, geo, '$4 \\cdot 3^2 = 36$.', { lee: v => `$4 \\cdot ${v.r}^2 = ${4 * v.r ** 2}$` })],
  ], 'Se multiplica por la razón en cada salto.');

  // ---------------------------------------------------------------------------------------------------------- alg-14d
  const cinta = (v, K) => { let x = 20, h = '', w = 150; for (let i = 0; i < Math.round(v.n); i++) { h += K.r(x, 60, w, 50, ['fa', 'fg', 'ff', 'fo'][i % 4]) + (w > 30 ? K.t(x + w / 2, 90, `1/${2 ** (i + 1)}`, 's') : ''); x += w; w /= 2; } return h + K.r(20, 60, 300, 50, 'fn') + K.t(170, 140, v.p, 'b ta'); };
  xpLec('alg-14d', [
    ['Multiplicar y restar', xpMira('dibujo', 'Empecemos por la idea: si se multiplica por r y se resta, **casi todo se cancela**.', { dib: (v, K) => XM.pasos(K, v, ['S = 2 + 6 + 18 + 54', '3S = 6 + 18 + 54 + 162', '3S − S = 162 − 2', 'S = 160 ÷ 2 = 80'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Una suma geométrica de razón 3.', {}, '$S$'],
      ['Por 3, cada término se corre un puesto.', { n: 2 }, '$3S$'],
      ['Al restar solo sobreviven los de las puntas.', { n: 3 }, '$2S = 162 - 2$'],
      ['Y de ahí se despeja.', { n: 4 }, '$S = 80$'],
      ['Con letras, la fórmula.', {}, '$S_n = a_1\\tfrac{r^n - 1}{r - 1}$'],
    ], '$S_n = a_1\\tfrac{r^n - 1}{r - 1}$, si $r \\neq 1$.'),
    xpFila('$S = 2 + 8 + 32 + 128$. Pon el término que sobra al hacer 4S, la resta y S.', ['sobra', '3S', 'S'], ['512', '510', '170'], ['128', '168', '126'], 'El siguiente sería 128 por 4; menos 2.', '$510 \\div 3 = 170$.')],
    ['Infinitos y una suma finita', xpMira('dibujo', 'Segunda idea: si cada pedazo se encoge, infinitos pedazos **caben**.', { dib: cinta, v: { n: 0, p: '' }, alto: 160 }, [
      ['Una cinta de largo 1. Se pinta la mitad.', { n: 1 }, '$\\tfrac12$'],
      ['Luego la mitad de lo que falta.', { n: 2 }, '$\\tfrac12 + \\tfrac14$'],
      ['Y así. Siempre falta, pero cada vez menos.', { n: 6 }, '$\\tfrac12 + \\tfrac14 + \\tfrac18 + \\cdots$'],
      ['El total al que se acerca es 1.', { n: 8, p: '→ 1' }, '$S = 1$'],
      ['Si la razón está entre −1 y 1, hay suma.', {}, '$S = \\tfrac{a_1}{1 - r}$'],
    ], 'Si $|r| < 1$: $S = \\tfrac{a_1}{1 - r}$.'),
    xpFila('$12 + 3 + \\tfrac34 + \\cdots$ Pon r, $1 - r$ y la suma.', ['r', '1 − r', 'suma'], ['1/4', '3/4', '16'], ['4', '9', '48'], 'Cada uno es un cuarto del anterior.', '$12 \\div \\tfrac34 = 16$.')],
    ['Decimales periódicos', xpMira('dibujo', 'Tercera idea: un decimal periódico es una **suma infinita**.', { dib: (v, K) => XM.pasos(K, v, ['0.27 27 27…', '27/100 + 27/10 000 + …', 'a = 27/100,  r = 1/100', '27/99 = 3/11'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Cero punto 27 que se repite.', {}, '$0.\\overline{27}$'],
      ['Es 27 centésimas, más 27 diezmilésimas…', { n: 2 }, '$\\tfrac{27}{100} + \\tfrac{27}{10\\,000} + \\cdots$'],
      ['Geométrica de razón un centésimo.', { n: 3 }, '$r = \\tfrac{1}{100}$'],
      ['La suma es 27 sobre 99.', { n: 4 }, '$\\tfrac{27}{99} = \\tfrac{3}{11}$'],
    ], 'El período sobre tantos nueves como cifras.'),
    xpFila('Pon cada fracción simplificada.', ['0.555…', '0.3636…'], ['5/9', '4/11'], ['55/100', '36/90', '5/10'], 'Cinco novenos y treinta y seis noventa y nueveavos.', '$\\tfrac59$ y $\\tfrac{36}{99} = \\tfrac{4}{11}$.')],
    ['Ahora sí, un problema', xpFila('Un péndulo recorre 20 cm y cada vez el 80 % del anterior. Pon $1 - r$ y el recorrido total (cm).', ['1 − r', 'total'], ['0.2', '100'], ['0.8', '25', '36'], 'La razón es 0.8.', '$20 \\div 0.2 = 100$ cm.')],
  ], 'Multiplicar y restar cancela; con $|r| < 1$ hay suma infinita.');

  // ---------------------------------------------------------------------------------------------------------- alg-15
  xpLec('alg-15', [
    ['Sumar con instrucciones', xpMira('dibujo', 'Empecemos por la idea: **sigma** es una orden de sumar.', { dib: (v, K) => [1, 2, 3, 4].map((k, i) => K.f(v.n - i, K.r(30 + i * 74, 70, 60, 46, 'fa', 8) + K.t(60 + i * 74, 98, `${3 * k - 1}`, 'b') + K.t(60 + i * 74, 60, `k = ${k}`, 's tm'))).join('') + K.t(170, 30, 'Σ (3k − 1),  k de 1 a 4', 'b ta'), v: { n: 0 }, alto: 135 }, [
      ['Abajo dice dónde empieza k; arriba, dónde acaba.', {}, '$\\sum_{k=1}^{4}(3k - 1)$'],
      ['k vale 1: el término es 2.', { n: 1 }, '$3 \\cdot 1 - 1 = 2$'],
      ['k vale 2, 3 y 4: 5, 8 y 11.', { n: 4 }, '$5, 8, 11$'],
      ['Al final se suman todos.', {}, '$2 + 5 + 8 + 11 = 26$'],
      ['La letra k no importa: puede ser cualquiera.', {}, '$\\sum_{j=1}^{4}(3j - 1)$'],
    ], 'Sigma: pon cada k en la receta y suma.'),
    xpFila('$\\sum_{k=2}^{4} k^2$: pon los términos y la suma.', ['k = 2', 'k = 3', 'k = 4', 'suma'], ['4', '9', '16', '29'], ['30', '6', '8'], 'Empieza en 2, no en 1.', '$4 + 9 + 16 = 29$.')],
    ['Partir y sacar', xpMira('dibujo', 'Segunda idea: la suma se **parte** y el número sale.', { dib: (v, K) => XM.pasos(K, v, ['Σ (2k + 5), 10 términos', '2 Σ k + Σ 5', '2 · 55 + 10 · 5', '160'], 34, 34), v: { n: 1 }, alto: 160 }, [
      ['Diez términos, cada uno con un 2k y un 5.', {}, '$\\sum_{k=1}^{10}(2k + 5)$'],
      ['Se agrupan: el 2 sale y los cincos se suman aparte.', { n: 2 }, '$2\\sum k + \\sum 5$'],
      ['La suma de 1 a 10 es 55; diez cincos, 50.', { n: 3 }, '$\\sum_{k=1}^{n} k = \\tfrac{n(n+1)}{2}$'],
      ['En total son 160.', { n: 4 }, '$110 + 50$'],
      ['Un producto no se parte: solo sumas.', {}, '$\\sum ab \\neq \\sum a \\sum b$'],
    ], '$\\sum (ca_k + d) = c\\sum a_k + nd$.'),
    xpFila('$\\sum_{k=1}^{8}(3k + 2)$: pon $\\sum k$, la suma de los 2 y el total.', ['Σ k', 'los 2', 'total'], ['36', '16', '124'], ['52', '2', '110'], 'De 1 a 8; ocho veces 2; y tres por la primera.', '$3 \\cdot 36 + 16 = 124$.')],
    ['Telescopios y productos', xpMira('dibujo', 'Tercera idea: a veces los de en medio **se cancelan**; y con Π se multiplica.', { dib: (v, K) => XM.pasos(K, v, ['(1/1 − 1/2) + (1/2 − 1/3) + (1/3 − 1/4)', '= 1 − 1/4 = 3/4', 'Π k, de 1 a 5 = 5! = 120'], 44, 38, 'x'), v: { n: 1 }, alto: 150 }, [
      ['Cada pedazo quita lo que el siguiente pone.', {}, '$\\sum (\\tfrac1k - \\tfrac{1}{k+1})$'],
      ['Sobreviven el primero y el último.', { n: 2 }, '$1 - \\tfrac14$'],
      ['La letra pi mayúscula manda a multiplicar.', { n: 3 }, '$\\prod_{k=1}^{5} k = 5!$'],
      ['El factorial de 0 es 1, por acuerdo.', {}, '$0! = 1$'],
    ], 'Telescópica: quedan las puntas. $\\prod$ multiplica.'),
    xpFila('$\\sum_{k=1}^{9}(\\tfrac1k - \\tfrac{1}{k+1})$: pon el primero, lo que se resta al final y la suma.', ['queda', 'se resta', 'suma'], ['1', '1/10', '9/10'], ['1/9', '8/9', '0'], 'El último término lleva 1/(9 + 1).', '$1 - \\tfrac{1}{10}$.')],
    ['Ahora sí, un problema', xpFila('Un taller paga 4k + 1 miles el día k, durante 6 días. Pon $\\sum k$, la suma de los 1 y el pago total.', ['Σ k', 'los 1', 'total'], ['21', '6', '90'], ['25', '85', '24'], 'De 1 a 6 la suma es 21.', '$4 \\cdot 21 + 6 = 90$.')],
  ], 'Sigma ordena sumar: se parte, se saca el número y a veces se cancela.');
}
