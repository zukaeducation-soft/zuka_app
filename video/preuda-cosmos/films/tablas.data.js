// «Tablas de doble entrada» · Preuniversitario, razonamiento lógico, mundo 3 (Acertijos de orden), lección pu-or-3. Datos puros.
// Reto: Laura, Mónica y Natalia (médica, abogada, ingeniera; Bogotá, Cali, Medellín): Natalia es ingeniera y vive en
// Medellín. En medio: la tabla, un solo ✓ por fila y columna, las pistas negativas (Pía, Quique y Rosa con sus bebidas), la
// pista que une dos tablas, las cuatro cajas de 3, 5, 8 y 12 kg (roja 12 y verde 5) y las pistas con cuentas.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'TRES PROFESIONALES', dur: 30,
      caps: [[1.0, 9.4, 'Tres profesiones, tres ciudades', 'Laura, Mónica y Natalia'], [10.0, 19.4, 'Cuatro pistas', 'dos hablan de ciudades, una une las dos cosas'], [20.0, 29.4, 'Qué es Natalia y dónde vive', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Laura, Mónica y Natalia son médica, abogada e ingeniera, y viven en Bogotá, Cali y Medellín, no necesariamente en ese orden.'], [10.0, 19.4, 'La abogada vive en Cali. Mónica vive en Bogotá. Natalia no vive en Cali. La ingeniera no vive en Bogotá.'], [20.0, 29.4, 'Hay que decir con certeza qué es Natalia y dónde vive. Para no perderse hace falta una tabla. Al final lo resolvemos.']] },
    { id: 'tabla', name: 'LA TABLA', dur: 28,
      caps: [[0.8, 8.4, 'Personas en las filas', 'opciones en las columnas'], [9.0, 17.4, 'Cada casilla es una pregunta', 'Pía toma agua: sí o no'], [18.0, 26.4, '✓ para sí, ✗ para no', 'la tabla guarda lo que ya se sabe']],
      narr: [[0.8, 8.4, 'Pía, Quique y Rosa toman chocolate, agua y limonada, uno cada uno. Tabla: personas en filas, bebidas en columnas.'], [9.0, 17.4, 'Cada casilla es una pregunta de sí o no: si Pía toma agua o no, si Quique toma chocolate o no.'], [18.0, 26.4, 'Se marca un chulo para sí y una equis para no. Así la memoria queda en el papel y no en la cabeza.']] },
    { id: 'negativas', name: 'LAS PISTAS CON NO', dur: 28,
      caps: [[0.8, 8.4, '«Pía no toma agua»', 'una ✗ en su fila'], [9.0, 17.4, '«Quique no toma chocolate ni agua»', 'dos ✗: solo le queda la limonada'], [18.0, 26.4, 'Las pistas con no son las más útiles', 'van tachando hasta dejar una']],
      narr: [[0.8, 8.4, 'Pía no toma agua: equis en la casilla de Pía y agua.'], [9.0, 17.4, 'Quique no toma chocolate ni agua: dos equis. En su fila queda una sola casilla libre: Quique toma limonada.'], [18.0, 26.4, 'Las pistas negativas parecen débiles, pero son las que más trabajan: tachan casillas hasta que queda una sola.']] },
    { id: 'unico', name: 'UN SOLO ✓ POR FILA', dur: 28,
      caps: [[0.8, 8.4, 'La limonada es de Quique', 'nadie más puede tomarla'], [9.0, 17.4, 'Se tacha toda su columna', 'y en la fila de Pía solo queda el chocolate'], [18.0, 26.4, 'Rosa se queda con el agua', 'cada ✓ provoca otras ✗']],
      narr: [[0.8, 8.4, 'Como la limonada es de Quique, nadie más la toma: en cada columna hay un solo chulo.'], [9.0, 17.4, 'Se tacha la columna de la limonada. Ahora en la fila de Pía solo queda el chocolate.'], [18.0, 26.4, 'Y a Rosa le queda el agua. Cada chulo provoca equis en su fila y en su columna, y eso deja nuevos chulos.']] },
    { id: 'enlace', name: 'PISTAS QUE UNEN', dur: 30,
      caps: [[0.8, 9.4, 'Dos cosas por persona', 'profesión y ciudad: dos tablas'], [10.0, 19.4, '«La abogada vive en Cali»', 'no dice quién: une las dos tablas'], [20.0, 29.4, 'Quien viva en Cali es la abogada', 'se resuelve primero la tabla más fácil']],
      narr: [[0.8, 9.4, 'Cuando cada persona tiene dos cosas, profesión y ciudad, conviene hacer dos tablas, una para cada una.'], [10.0, 19.4, 'Algunas pistas no nombran a nadie: la abogada vive en Cali. Esa pista une las dos tablas.'], [20.0, 29.4, 'Se espera a saber quién vive en Cali; en ese momento se sabe también quién es la abogada. Se empieza por la tabla con más pistas directas.']] },
    { id: 'cajas', name: 'LAS CUATRO CAJAS', dur: 30,
      caps: [[0.8, 9.4, 'Cuatro cajas, cuatro pesos', '3, 5, 8 y 12 kilogramos'], [10.0, 19.4, 'Verde + azul = negra', 'la única suma posible: 3 + 5 = 8'], [20.0, 29.4, 'La verde no es la más liviana', 'verde 5, azul 3 y roja 12']],
      narr: [[0.8, 9.4, 'Otro problema: cuatro cajas, roja, azul, verde y negra, pesan tres, cinco, ocho y doce kilos. Hay que hallar el peso de la roja y el de la verde.'], [10.0, 19.4, 'La verde y la azul juntas pesan lo mismo que la negra. De todas las sumas de dos pesos, solo tres más cinco da otro peso: ocho. La negra pesa ocho.'], [20.0, 29.4, 'La verde no es la más liviana: pesa cinco, y la azul tres. A la roja le queda doce, y efectivamente pesa más que la azul.']] },
    { id: 'cuentas', name: 'PISTAS CON CUENTAS', dur: 28,
      caps: [[0.8, 8.4, 'Una pista con suma', 'se prueban todas las parejas'], [9.0, 17.4, 'Seis parejas de cuatro pesos', 'solo una suma da otro de los pesos'], [18.0, 26.4, 'Una lista corta lo dice todo', 'la cuenta se vuelve una casilla']],
      narr: [[0.8, 8.4, 'Cuando una pista trae una cuenta, como una suma, se prueban todas las parejas posibles.'], [9.0, 17.4, 'Con cuatro pesos hay seis parejas. Solo una suma da otro de los pesos de la lista.'], [18.0, 26.4, 'Esa lista corta convierte la cuenta en chulos y equis. Luego la tabla hace el resto.']] },
    { id: 'pasos', name: 'EL MÉTODO', dur: 28,
      caps: [[0.8, 8.4, '1. Armar la tabla', 'una por cada tipo de dato'], [9.0, 17.4, '2. Primero las pistas directas', 'y las negativas'], [18.0, 26.4, '3. Propagar', 'cada ✓ tacha su fila y su columna']],
      narr: [[0.8, 8.4, 'Primero, armar la tabla: una por cada tipo de dato que hay que emparejar.'], [9.0, 17.4, 'Segundo, poner las pistas directas, que nombran a alguien, y las negativas.'], [18.0, 26.4, 'Tercero, propagar: cada chulo tacha su fila y su columna, y cada fila con una sola casilla libre da un chulo nuevo.']] },
    { id: 'resolver', name: 'LAS TRES, RESUELTAS', dur: 30,
      caps: [[0.8, 9.4, 'Ciudades: Mónica en Bogotá', 'Natalia no en Cali: Medellín; Laura, Cali'], [10.0, 19.4, 'Laura vive en Cali', 'entonces Laura es la abogada'], [20.0, 29.4, 'La ingeniera no vive en Bogotá', 'Mónica es médica; Natalia, ingeniera']],
      narr: [[0.8, 9.4, 'Volvamos al reto. En la tabla de ciudades, Mónica vive en Bogotá. Natalia no vive en Cali ni en Bogotá: vive en Medellín. Laura, en Cali.'], [10.0, 19.4, 'La abogada vive en Cali, y quien vive en Cali es Laura: Laura es la abogada.'], [20.0, 29.4, 'La ingeniera no vive en Bogotá, así que no es Mónica. Mónica es médica, y Natalia es ingeniera y vive en Medellín.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Natalia: ingeniera, en Medellín', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: Natalia es ingeniera y vive en Medellín. Dos tablas y una pista que las une.'], [11.0, 20.4, 'Filas y columnas, un solo chulo en cada una, las pistas con no y propagar hasta el final.'], [21.0, 29.4, 'Cada ✓ tacha su fila y su columna.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 3', TITLE = 'TABLAS DE DOBLE ENTRADA', LINE = 'Cada ✓ tacha su fila y su columna.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-or-3', KEYS: ['Natalia', 'Medellín', 'Quique', 'limonada'] };
})();
if (typeof module !== 'undefined') module.exports = D;
