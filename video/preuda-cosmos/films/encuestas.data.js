// «Encuestas» · Preuniversitario, razonamiento lógico, mundo 14 (Conjuntos), lección pu-cj-2. Datos puros.
// Reto: 100 estudiantes; 50 inglés, 40 francés, 30 alemán; 15 inglés y francés, 10 inglés y alemán, 8 francés y alemán, 3 los tres
// → 10 no estudian ninguno. En medio: las ocho zonas de tres conjuntos, llenar desde el centro (solo inglés: 28), las series y las
// novelas (45; 28, 21 y 6 → 18 solo series), la incógnita en el centro, la fórmula de inclusión y exclusión, el club con la tabla
// incompleta (50 socios, 30 hombres, 6 hombres zurdos → 24 hombres diestros) y «exactamente dos».
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'EL INSTITUTO DE IDIOMAS', dur: 30,
      caps: [[1.0, 9.4, '100 estudiantes, tres idiomas', 'inglés 50, francés 40, alemán 30'], [10.0, 19.4, 'Parejas: 15, 10 y 8', 'y 3 estudian los tres'], [20.0, 29.4, 'Cuántos no estudian ninguno', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. En un instituto hay cien estudiantes: cincuenta estudian inglés, cuarenta francés y treinta alemán.'], [10.0, 19.4, 'Quince estudian inglés y francés, diez inglés y alemán, ocho francés y alemán, y tres estudian los tres idiomas.'], [20.0, 29.4, 'Hay que hallar cuántos no estudian ninguno de los tres. Al final lo resolvemos.']] },
    { id: 'ocho', name: 'OCHO ZONAS', dur: 28,
      caps: [[0.8, 8.4, 'Tres círculos que se cruzan', 'forman siete zonas adentro'], [9.0, 17.4, 'Solo uno, exactamente dos, los tres', '3 + 3 + 1 zonas'], [18.0, 26.4, 'Y la octava: ninguno', 'las ocho suman el total']],
      narr: [[0.8, 8.4, 'Con tres conjuntos, los tres círculos se cruzan y forman siete zonas adentro.'], [9.0, 17.4, 'Tres zonas de un solo conjunto, tres de exactamente dos, y una en el centro con los tres.'], [18.0, 26.4, 'Y la octava, por fuera: los de ninguno. Las ocho zonas suman el total.']] },
    { id: 'centro', name: 'DEL CENTRO HACIA AFUERA', dur: 28,
      caps: [[0.8, 8.4, 'Primero el centro: los 3 de los tres', 'ese número va solo'], [9.0, 17.4, 'Luego las parejas, menos el centro', 'inglés y francés solamente: 15 − 3 = 12'], [18.0, 26.4, 'Luego las lunas', 'solo inglés: 50 − 12 − 7 − 3 = 28']],
      narr: [[0.8, 8.4, 'Con tres conjuntos el orden es aún más importante. Primero el centro: los tres que estudian los tres idiomas.'], [9.0, 17.4, 'Luego las parejas, quitando el centro: inglés y francés, pero no alemán, son quince menos tres, doce.'], [18.0, 26.4, 'Y al final las lunas: solo inglés es cincuenta menos doce, menos siete, menos tres. Veintiocho.']] },
    { id: 'series', name: 'SERIES Y NOVELAS', dur: 30,
      caps: [[0.8, 9.4, '45 personas: 28 ven series', '21 ven novelas, 6 no ven ninguna'], [10.0, 19.4, 'Alguna: 45 − 6 = 39', 'las dos: 28 + 21 − 39 = 10'], [20.0, 29.4, 'Solo series: 28 − 10 = 18', '18 personas']],
      narr: [[0.8, 9.4, 'Otro problema: de cuarenta y cinco personas, veintiocho ven series, veintiuna ven novelas y seis no ven ninguna de las dos.'], [10.0, 19.4, 'Ven alguna treinta y nueve. Como veintiocho más veintiuno da cuarenta y nueve, sobran diez: ven las dos.'], [20.0, 29.4, 'Solo series son veintiocho menos diez: dieciocho personas.']] },
    { id: 'incognita', name: 'LA X EN EL CENTRO', dur: 28,
      caps: [[0.8, 8.4, 'Si no se sabe la intersección', 'se llama x'], [9.0, 17.4, '(28 − x) + x + (21 − x) + 6 = 45', 'las zonas suman el total'], [18.0, 26.4, '55 − x = 45 → x = 10', 'el mismo resultado, con ecuación']],
      narr: [[0.8, 8.4, 'Otra forma: si no se conoce la intersección, se llama equis y se escribe cada zona con ella.'], [9.0, 17.4, 'Solo series es veintiocho menos equis, solo novelas veintiuno menos equis, y las cuatro zonas suman cuarenta y cinco.'], [18.0, 26.4, 'Queda cincuenta y cinco menos equis igual a cuarenta y cinco: equis es diez. El mismo resultado.']] },
    { id: 'formula', name: 'SUMAR, RESTAR, SUMAR', dur: 28,
      caps: [[0.8, 8.4, 'Al sumar los tres conjuntos', 'las parejas quedan contadas dos veces'], [9.0, 17.4, 'Se restan las tres parejas', 'pero el centro se quita de más'], [18.0, 26.4, 'Se suma otra vez el centro', 'A + B + C − parejas + los tres']],
      narr: [[0.8, 8.4, 'Con tres conjuntos hay una fórmula. Al sumar los tres, los que están en dos quedan contados dos veces.'], [9.0, 17.4, 'Se restan las tres parejas. Pero los del centro estaban en las tres parejas, y se quitaron de más.'], [18.0, 26.4, 'Así que se suman otra vez. Sumar, restar, sumar: es el principio de inclusión y exclusión.']] },
    { id: 'club', name: 'LA TABLA DEL CLUB', dur: 30,
      caps: [[0.8, 9.4, '50 socios: 30 hombres', '10 zurdos, de ellos 6 hombres'], [10.0, 19.4, 'Cada fila y columna suma su total', 'la tabla es otro diagrama'], [20.0, 29.4, 'Hombres diestros: 30 − 6 = 24', 'se completa casilla por casilla']],
      narr: [[0.8, 9.4, 'Otro problema: un club deportivo tiene cincuenta socios. Treinta son hombres, hay diez zurdos, y seis de los zurdos son hombres.'], [10.0, 19.4, 'Una tabla de doble entrada es otro diagrama: cada fila y cada columna suman su total.'], [20.0, 29.4, 'Los hombres diestros son treinta menos seis: veinticuatro. Y así se completa casilla por casilla.']] },
    { id: 'exactamente', name: 'EXACTAMENTE DOS', dur: 28,
      caps: [[0.8, 8.4, 'Exactamente dos idiomas', 'las tres parejas sin el centro'], [9.0, 17.4, '12 + 7 + 5 = 24 estudiantes', 'el centro no cuenta'], [18.0, 26.4, 'Al menos dos: 24 + 3 = 27', 'una palabra cambia la cuenta']],
      narr: [[0.8, 8.4, 'Las palabras cambian la cuenta. Exactamente dos idiomas son las tres parejas, sin el centro.'], [9.0, 17.4, 'Doce, siete y cinco: veinticuatro estudiantes. Los del centro estudian tres, no dos.'], [18.0, 26.4, 'En cambio, al menos dos incluye el centro: veinticuatro más tres, veintisiete.']] },
    { id: 'resolver', name: 'LOS IDIOMAS, RESUELTOS', dur: 30,
      caps: [[0.8, 9.4, '50 + 40 + 30 = 120', 'se suman los tres'], [10.0, 19.4, '120 − 15 − 10 − 8 + 3 = 90', 'estudian al menos uno'], [20.0, 29.4, 'Ninguno: 100 − 90 = 10', 'diez estudiantes']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Se suman los tres idiomas: cincuenta más cuarenta más treinta, ciento veinte.'], [10.0, 19.4, 'Se restan las parejas, quince, diez y ocho, y se suma el centro, tres: noventa estudian al menos uno.'], [20.0, 29.4, 'Los que no estudian ninguno son cien menos noventa: diez.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, '10 no estudian ninguno', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: diez estudiantes.'], [11.0, 20.4, 'Ocho zonas que suman el total, del centro hacia afuera, sumar, restar y sumar, y leer con cuidado solo, exactamente y al menos.'], [21.0, 29.4, 'Empieza por el centro.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 14', TITLE = 'ENCUESTAS', LINE = 'Empieza por el centro.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-cj-2', KEYS: ['alemán', 'series', 'zurdos', 'idioma'] };
})();
if (typeof module !== 'undefined') module.exports = D;
