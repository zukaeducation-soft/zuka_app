// «Promedio, mediana y moda» · Preuniversitario, razonamiento lógico, mundo 9 (Tablas y gráficas), lección pu-gr-2. Datos puros.
// Reto: las notas de 30 estudiantes (nota 1 a 5 con 3, 3, 12, 9 y 3 estudiantes); el promedio es 96 / 30 = 3.2. En medio: el
// promedio como nivelar (6, 2, 9, 3 → 5), la tabla de frecuencias (libros: 0·2 + 1·5 + 2·3 = 11), los goles de 20 partidos
// (total 33), la mediana (2, 4, 6, 7, 9 → 6; con 11, 6.5), la mediana de los goles (décimo 1, undécimo 2 → 1.5), la moda y el dato
// extremo (3, 4, 4, 5, 34: media 10, mediana y moda 4) y las horas de celular (3, 4, 2, 5, 4, 7, 10: promedio 5, mediana 4).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LAS NOTAS DEL GRUPO', dur: 30,
      caps: [[1.0, 9.4, 'Notas de 1 a 5 en un grupo de 30', 'la gráfica dice cuántos sacaron cada nota'], [10.0, 19.4, '3, 3, 12, 9 y 3 estudiantes', 'para las notas 1, 2, 3, 4 y 5'], [20.0, 29.4, 'La nota promedio del grupo', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Un grupo de treinta estudiantes presentó una evaluación calificada de uno a cinco.'], [10.0, 19.4, 'La gráfica muestra cuántos sacaron cada nota: tres, tres, doce, nueve y tres estudiantes.'], [20.0, 29.4, 'Hay que hallar la nota promedio del grupo. No es el promedio de uno a cinco. Al final lo resolvemos.']] },
    { id: 'nivelar', name: 'EL PROMEDIO NIVELA', dur: 28,
      caps: [[0.8, 8.4, 'Cuatro torres: 6, 2, 9 y 3', 'el promedio las deja parejas'], [9.0, 17.4, 'Lo que sobra llena lo que falta', 'a la altura 5 todo queda igual'], [18.0, 26.4, 'Suma ÷ cantidad', '20 ÷ 4 = 5']],
      narr: [[0.8, 8.4, 'Cuatro torres de fichas miden seis, dos, nueve y tres. El promedio es la altura que tendrían si se repartieran parejo.'], [9.0, 17.4, 'Lo que sobra en las altas llena justo lo que falta en las bajas: todas quedan en cinco.'], [18.0, 26.4, 'Por eso el promedio es la suma entre la cantidad: veinte fichas entre cuatro torres, cinco.']] },
    { id: 'tabla', name: 'LA TABLA DE FRECUENCIAS', dur: 28,
      caps: [[0.8, 8.4, 'Libros leídos por 10 personas', '0 libros: 2 · 1 libro: 5 · 2 libros: 3'], [9.0, 17.4, 'Cada fila vale dato × veces', '0 · 2 + 1 · 5 + 2 · 3 = 11'], [18.0, 26.4, 'Promedio: 11 ÷ 10 = 1.1', 'se divide entre las personas, no entre 3']],
      narr: [[0.8, 8.4, 'Diez personas dicen cuántos libros leyeron este mes: dos leyeron cero, cinco leyeron uno y tres leyeron dos.'], [9.0, 17.4, 'La tabla no repite los datos: cada fila vale el dato por las veces que aparece. En total, once libros.'], [18.0, 26.4, 'El promedio es once entre diez personas: uno coma uno. Se divide entre la cantidad de personas, no entre las tres filas.']] },
    { id: 'goles', name: 'LOS GOLES DEL TORNEO', dur: 30,
      caps: [[0.8, 9.4, '20 partidos de un torneo', '0 a 4 goles: 4, 6, 5, 3 y 2 partidos'], [10.0, 19.4, '0 · 4 + 1 · 6 + 2 · 5', '+ 3 · 3 + 4 · 2'], [20.0, 29.4, '0 + 6 + 10 + 9 + 8 = 33', 'el total de goles del torneo']],
      narr: [[0.8, 9.4, 'Otro problema: un equipo jugó veinte partidos. En cuatro no anotó, en seis hizo un gol, en cinco dos, en tres tres y en dos cuatro.'], [10.0, 19.4, 'Para el total de goles, cada fila vale goles por partidos: cero, seis, diez, nueve y ocho.'], [20.0, 29.4, 'Sumados, treinta y tres goles en todo el torneo.']] },
    { id: 'mediana', name: 'LA MEDIANA', dur: 28,
      caps: [[0.8, 8.4, 'La mediana es el dato del medio', 'pero primero hay que ordenar'], [9.0, 17.4, '6, 2, 9, 4, 7 → 2, 4, 6, 7, 9', 'la mediana es 6'], [18.0, 26.4, 'Con un 11 más, son seis datos', 'se promedian los dos del medio: 6.5']],
      narr: [[0.8, 8.4, 'La mediana es el dato que queda en el medio, con la mitad de los datos a cada lado. Pero solo después de ordenarlos.'], [9.0, 17.4, 'Seis, dos, nueve, cuatro, siete. Ordenados: dos, cuatro, seis, siete, nueve. La mediana es seis.'], [18.0, 26.4, 'Si llega un once, hay seis datos y quedan dos en el medio: seis y siete. La mediana es su promedio, seis coma cinco.']] },
    { id: 'medgoles', name: 'LA MEDIANA DE LOS GOLES', dur: 30,
      caps: [[0.8, 9.4, 'Los 20 partidos, en fila y en orden', 'cuatro ceros, seis unos, cinco doses'], [10.0, 19.4, 'Con 20 datos, el medio: 10.º y 11.º', 'el décimo es 1 y el undécimo es 2'], [20.0, 29.4, 'Mediana: (1 + 2) ÷ 2 = 1.5', 'sin escribir los veinte datos']],
      narr: [[0.8, 9.4, 'Ahora la mediana de los goles. Se ponen los veinte partidos en fila, en orden: cuatro ceros, seis unos, cinco doses y así.'], [10.0, 19.4, 'Con veinte datos, los del medio son el décimo y el undécimo. Los ceros llegan al cuarto, los unos al décimo: el décimo es uno y el undécimo es dos.'], [20.0, 29.4, 'La mediana es uno coma cinco. Se halla contando en la tabla, sin escribir los veinte datos.']] },
    { id: 'moda', name: 'LA MODA Y EL DATO EXTREMO', dur: 28,
      caps: [[0.8, 8.4, 'La moda: el dato que más se repite', 'la barra más alta de la gráfica'], [9.0, 17.4, '3, 4, 4, 5 y 34', 'media 10 · mediana 4 · moda 4'], [18.0, 26.4, 'Un dato extremo jala la media', 'la mediana casi no se mueve']],
      narr: [[0.8, 8.4, 'La moda es el dato que más se repite: en una gráfica de barras, el de la barra más alta.'], [9.0, 17.4, 'Cinco datos: tres, cuatro, cuatro, cinco y treinta y cuatro. La media es diez, pero la mediana y la moda son cuatro.'], [18.0, 26.4, 'Un solo dato muy grande jala la media hacia él. La mediana casi no se entera.']] },
    { id: 'celular', name: 'LAS HORAS DE CELULAR', dur: 30,
      caps: [[0.8, 9.4, 'Horas de celular en una semana', '3, 4, 2, 5, 4, 7 y 10'], [10.0, 19.4, 'Promedio: 35 ÷ 7 = 5 horas', 'lo superan el sábado y el domingo'], [20.0, 29.4, 'Ordenados: 2, 3, 4, 4, 5, 7, 10', 'la mediana es 4']],
      narr: [[0.8, 9.4, 'Otro problema: una gráfica muestra las horas que Sebastián usó el celular cada día de la semana.'], [10.0, 19.4, 'Suman treinta y cinco horas en siete días: el promedio es cinco. Solo el sábado y el domingo pasan de cinco.'], [20.0, 29.4, 'Ordenados, el dato del medio es el cuarto: cuatro. Media cinco, mediana cuatro: el domingo jala la media.']] },
    { id: 'resolver', name: 'LAS NOTAS, RESUELTAS', dur: 30,
      caps: [[0.8, 9.4, 'Cada nota por sus estudiantes', '1 · 3 + 2 · 3 + 3 · 12 + 4 · 9 + 5 · 3'], [10.0, 19.4, '3 + 6 + 36 + 36 + 15 = 96', 'los puntos de todo el grupo'], [20.0, 29.4, '96 ÷ 30 = 3.2', 'entre los 30 estudiantes, no entre 5']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Como en la tabla de goles, cada nota se multiplica por los estudiantes que la sacaron.'], [10.0, 19.4, 'Tres, seis, treinta y seis, treinta y seis y quince: noventa y seis puntos en todo el grupo.'], [20.0, 29.4, 'Noventa y seis entre treinta estudiantes: tres coma dos. Promediar uno, dos, tres, cuatro y cinco daría tres, y no es la respuesta.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'El promedio es 3.2', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: tres coma dos. Cada nota pesa según cuántos la sacaron.'], [11.0, 20.4, 'El promedio nivela, la mediana pide orden, la moda es la que más se repite, y en una tabla cada fila vale dato por veces.'], [21.0, 29.4, 'Cada dato pesa según cuántas veces aparece.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 9', TITLE = 'PROMEDIO, MEDIANA Y MODA', LINE = 'Cada dato pesa según sus veces.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-gr-2', KEYS: ['goles', 'celular', '96', '34'] };
})();
if (typeof module !== 'undefined') module.exports = D;
