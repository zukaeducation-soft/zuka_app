// «Del texto a la ecuación» · Preuniversitario, razonamiento lógico, mundo 13 (Ecuaciones), lección pu-ec-1. Datos puros.
// Reto: el abuelo tiene el doble de su hijo y este el triple del suyo; las tres edades suman 120 → el abuelo tiene 72. En medio: traducir
// (la coma cambia: 2x + 3 o 2(x + 3)), «menos que» (A = B − 4), elegir la x en lo más pequeño (lápiz y cuaderno: 2 000 y 6 000),
// Valentina y su libro (1/5, 1/4 de lo que faltaba y 40 páginas; queda 1/3 → 150), despejar como una balanza (4x + 5 = x + 17 → 4), el
// terreno (perímetro 36, largo el doble del ancho → 72 m²) y comprobar.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'TRES GENERACIONES', dur: 30,
      caps: [[1.0, 9.4, 'El abuelo: el doble de su hijo', 'el hijo: el triple de su propio hijo'], [10.0, 19.4, 'Las tres edades suman 120', 'tres personas, una sola pista'], [20.0, 29.4, 'La edad del abuelo', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Un abuelo tiene el doble de la edad de su hijo, y este, el triple de la de su propio hijo.'], [10.0, 19.4, 'Las edades de los tres suman ciento veinte años.'], [20.0, 29.4, 'Hay que hallar la edad del abuelo. Tres desconocidos y una sola suma: la clave es escoger bien la equis. Al final lo resolvemos.']] },
    { id: 'traducir', name: 'TRADUCIR CON CUIDADO', dur: 28,
      caps: [[0.8, 8.4, '«El doble de un número, más 3»', '2x + 3: primero el doble'], [9.0, 17.4, '«El doble de la suma de x y 3»', '2(x + 3): primero la suma'], [18.0, 26.4, '«La mitad de un número» es x ÷ 2', 'la frase dice qué va primero']],
      narr: [[0.8, 8.4, 'Traducir es pasar del español al álgebra. El doble de un número, más tres: primero se duplica y luego se suma. Dos equis más tres.'], [9.0, 17.4, 'En cambio, el doble de la suma de un número y tres: primero se suma, y luego se duplica. Dos por equis más tres, con paréntesis.'], [18.0, 26.4, 'La mitad de un número es equis entre dos. La frase dice qué se hace primero, y eso decide los paréntesis.']] },
    { id: 'menosque', name: 'MENOS QUE, MÁS QUE', dur: 28,
      caps: [[0.8, 8.4, '«Ana tiene 4 menos que Beto»', 'A = B − 4, no 4 − B'], [9.0, 17.4, 'Se le resta al nombrado al final', 'Beto tiene más: a él se le quitan 4'], [18.0, 26.4, 'Probar con números', 'si Beto tiene 10, Ana tiene 6']],
      narr: [[0.8, 8.4, 'Cuidado con el orden: Ana tiene cuatro menos que Beto se escribe A igual a B menos cuatro.'], [9.0, 17.4, 'Al que se nombra al final se le resta: Beto tiene más, y a él se le quitan cuatro para llegar a Ana.'], [18.0, 26.4, 'Si hay duda, se prueba con números: si Beto tiene diez, Ana tiene seis. Cuadra.']] },
    { id: 'incognita', name: 'ESCOGER LA X', dur: 28,
      caps: [[0.8, 8.4, 'Lápiz: la tercera parte del cuaderno', 'juntos cuestan 8 000'], [9.0, 17.4, 'x para el más pequeño: lápiz = x', 'cuaderno = 3x; sin fracciones'], [18.0, 26.4, 'x + 3x = 8 000 → x = 2 000', 'lápiz 2 000, cuaderno 6 000']],
      narr: [[0.8, 8.4, 'Escoger bien la equis ahorra trabajo. Un lápiz cuesta la tercera parte de un cuaderno, y juntos cuestan ocho mil.'], [9.0, 17.4, 'Si la equis es el lápiz, el más barato, el cuaderno es tres equis. Sin fracciones.'], [18.0, 26.4, 'Equis más tres equis es ocho mil: equis es dos mil. El lápiz cuesta dos mil y el cuaderno seis mil.']] },
    { id: 'valentina', name: 'EL LIBRO DE VALENTINA', dur: 30,
      caps: [[0.8, 9.4, 'Lunes 1/5; martes 1/4 del resto', 'miércoles 40 páginas; falta 1/3'], [10.0, 19.4, 'Tras el martes falta 4/5 · 3/4 = 3/5', '3/5 · x − 40 = x/3'], [20.0, 29.4, '4x/15 = 40', 'el libro tiene 150 páginas']],
      narr: [[0.8, 9.4, 'Otro problema: Valentina leyó un quinto de un libro el lunes, un cuarto de lo que le faltaba el martes y cuarenta páginas el miércoles. Le quedó un tercio.'], [10.0, 19.4, 'Después del martes le faltan cuatro quintos por tres cuartos: tres quintos del libro. Menos cuarenta, debe dar un tercio.'], [20.0, 29.4, 'Tres quintos menos un tercio son cuatro quinceavos, y eso son cuarenta páginas: el libro tiene ciento cincuenta.']] },
    { id: 'despejar', name: 'DESPEJAR ES EQUILIBRAR', dur: 28,
      caps: [[0.8, 8.4, '4x + 5 = x + 17', 'una balanza en equilibrio'], [9.0, 17.4, 'Quitar x y quitar 5 de los dos lados', '3x = 12'], [18.0, 26.4, 'x = 4', 'lo que se hace a un lado, al otro también']],
      narr: [[0.8, 8.4, 'Una ecuación es una balanza en equilibrio: cuatro equis más cinco pesa lo mismo que equis más diecisiete.'], [9.0, 17.4, 'Se quita una equis de cada lado, y cinco de cada lado. Queda tres equis igual a doce.'], [18.0, 26.4, 'Equis es cuatro. La regla de oro: lo que se hace a un lado se hace también al otro.']] },
    { id: 'terreno', name: 'EL TERRENO', dur: 30,
      caps: [[0.8, 9.4, 'Perímetro 36 m', 'el largo es el doble del ancho'], [10.0, 19.4, 'Ancho x, largo 2x', '2(x + 2x) = 36 → x = 6'], [20.0, 29.4, 'Área: 6 · 12 = 72 m²', 'la ecuación da el ancho; la pregunta, el área']],
      narr: [[0.8, 9.4, 'Otro problema: el perímetro de un terreno rectangular es treinta y seis metros, y su largo es el doble de su ancho. Se pide el área.'], [10.0, 19.4, 'Si el ancho es equis, el largo es dos equis. Dos veces equis más dos equis es treinta y seis: equis es seis.'], [20.0, 29.4, 'El terreno mide seis por doce: setenta y dos metros cuadrados. Ojo: la ecuación da el ancho, pero la pregunta pide el área.']] },
    { id: 'comprobar', name: 'COMPROBAR CON EL TEXTO', dur: 28,
      caps: [[0.8, 8.4, 'El libro: 150 páginas', 'lunes 30; faltan 120'], [9.0, 17.4, 'Martes: 1/4 de 120 = 30', 'faltan 90; miércoles 40, faltan 50'], [18.0, 26.4, '50 = 150 ÷ 3', 'el texto se cumple']],
      narr: [[0.8, 8.4, 'Se comprueba con el texto, no con la ecuación. Con ciento cincuenta páginas: el lunes lee treinta y faltan ciento veinte.'], [9.0, 17.4, 'El martes, un cuarto de ciento veinte: treinta. Faltan noventa. El miércoles lee cuarenta y faltan cincuenta.'], [18.0, 26.4, 'Cincuenta es justo un tercio de ciento cincuenta. El texto se cumple.']] },
    { id: 'resolver', name: 'LAS EDADES, RESUELTAS', dur: 30,
      caps: [[0.8, 9.4, 'x: la edad del nieto, el más joven', 'hijo 3x, abuelo 2 · 3x = 6x'], [10.0, 19.4, 'x + 3x + 6x = 120', '10x = 120 → x = 12'], [20.0, 29.4, 'Nieto 12, hijo 36, abuelo 72', '12 + 36 + 72 = 120']],
      narr: [[0.8, 9.4, 'Volvamos al reto. La equis va en el más joven, el nieto. El hijo tiene tres equis y el abuelo el doble: seis equis.'], [10.0, 19.4, 'Juntos: equis más tres equis más seis equis es diez equis, y eso es ciento veinte. Equis es doce.'], [20.0, 29.4, 'El nieto tiene doce, el hijo treinta y seis y el abuelo setenta y dos. Suman ciento veinte.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'El abuelo tiene 72 años', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: setenta y dos años.'], [11.0, 20.4, 'Traducir palabra por palabra, la equis en lo más pequeño, despejar como balanza y comprobar con el texto.'], [21.0, 29.4, 'Primero se traduce; después se calcula.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 13', TITLE = 'DEL TEXTO A LA ECUACIÓN', LINE = 'Primero se traduce; después se calcula.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-ec-1', KEYS: ['abuelo', 'páginas', 'terreno', 'lápiz'] };
})();
if (typeof module !== 'undefined') module.exports = D;
