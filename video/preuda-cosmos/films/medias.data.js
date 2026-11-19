// «Promedios» · Preuniversitario, razonamiento lógico, mundo 12 (Aritmética), lección pu-ar-2. Datos puros.
// Reto: el grupo promedia 3.9, los hombres 3.5 y las mujeres 4.1 → las mujeres son el doble de los hombres. En medio: promedio por
// cantidad es la suma (Daniela: cinco notas de 3.8 y la sexta sube el promedio a 4.0 → 5.0), el quinto amigo (4 · 25 y 5 · 27 → 35),
// retirar datos (ocho números de promedio 15 sin dos de promedio 9 → 17), el promedio ponderado (2 h a 80 y 3 h a 60 → 68), la ida y
// la vuelta (60 y 40 km/h → 48), tachar sin cambiar el promedio (Sofía: dos maneras) y la balanza de las distancias.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'HOMBRES Y MUJERES', dur: 30,
      caps: [[1.0, 9.4, 'Un grupo promedió 3.9', 'en una prueba de 0 a 5'], [10.0, 19.4, 'Los hombres, 3.5; las mujeres, 4.1', 'el del grupo queda en medio'], [20.0, 29.4, 'Qué se sabe de cuántos son', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. En una prueba calificada de cero a cinco, el promedio de todo un grupo fue tres coma nueve.'], [10.0, 19.4, 'El promedio de los hombres fue tres coma cinco y el de las mujeres, cuatro coma uno.'], [20.0, 29.4, 'Hay que decir qué relación hay entre la cantidad de hombres y la de mujeres. Al final lo resolvemos.']] },
    { id: 'suma', name: 'PROMEDIO POR CANTIDAD', dur: 28,
      caps: [[0.8, 8.4, 'Promedio × cantidad = suma', 'el promedio esconde una suma'], [9.0, 17.4, 'Daniela: 5 notas de promedio 3.8', 'suman 19; con 6 de promedio 4.0, suman 24'], [18.0, 26.4, 'La sexta nota: 24 − 19 = 5.0', 'se trabaja con sumas, no con promedios']],
      narr: [[0.8, 8.4, 'La clave de los promedios: promedio por cantidad es la suma. Todo promedio esconde una suma.'], [9.0, 17.4, 'Daniela tiene cinco notas con promedio tres coma ocho: suman diecinueve. Con la sexta, el promedio sube a cuatro: seis notas suman veinticuatro.'], [18.0, 26.4, 'La sexta nota es veinticuatro menos diecinueve: cinco. Se trabaja con sumas, no con promedios.']] },
    { id: 'amigo', name: 'EL QUINTO AMIGO', dur: 30,
      caps: [[0.8, 9.4, '4 amigos con promedio de 25 años', 'llega otro y el promedio sube a 27'], [10.0, 19.4, 'Antes: 4 · 25 = 100', 'después: 5 · 27 = 135'], [20.0, 29.4, 'El quinto: 135 − 100 = 35', 'tiene 35 años']],
      narr: [[0.8, 9.4, 'Otro problema: el promedio de edad de cuatro amigos es veinticinco años. Llega un quinto amigo y el promedio de los cinco sube a veintisiete.'], [10.0, 19.4, 'Antes, las edades sumaban cuatro por veinticinco, cien. Después, cinco por veintisiete, ciento treinta y cinco.'], [20.0, 29.4, 'La diferencia es la edad del que llegó: treinta y cinco años.']] },
    { id: 'quitar', name: 'QUITAR DATOS', dur: 28,
      caps: [[0.8, 8.4, '8 números de promedio 15', 'suman 120'], [9.0, 17.4, 'Se quitan 2 de promedio 9', 'que suman 18'], [18.0, 26.4, 'Quedan 6 que suman 102', 'promedio: 102 ÷ 6 = 17']],
      narr: [[0.8, 8.4, 'Quitar datos funciona igual. Ocho números con promedio quince suman ciento veinte.'], [9.0, 17.4, 'Se retiran dos de ellos, cuyo promedio es nueve: suman dieciocho.'], [18.0, 26.4, 'Quedan seis números que suman ciento dos. Su promedio es ciento dos entre seis: diecisiete.']] },
    { id: 'ponderado', name: 'EL PROMEDIO PONDERADO', dur: 28,
      caps: [[0.8, 8.4, 'Un carro: 2 h a 80 y 3 h a 60', 'el promedio no es 70'], [9.0, 17.4, 'Distancia: 160 + 180 = 340 km', 'tiempo: 5 horas'], [18.0, 26.4, '340 ÷ 5 = 68 km/h', 'pesan más las horas a 60']],
      narr: [[0.8, 8.4, 'Cuando los grupos tienen distinto tamaño, el promedio se pondera. Un carro va dos horas a ochenta y tres horas a sesenta.'], [9.0, 17.4, 'Recorre ciento sesenta más ciento ochenta: trescientos cuarenta kilómetros en cinco horas.'], [18.0, 26.4, 'Trescientos cuarenta entre cinco: sesenta y ocho. Las horas a sesenta son más, y pesan más.']] },
    { id: 'idavuelta', name: 'IDA Y VUELTA', dur: 28,
      caps: [[0.8, 8.4, 'Ida a 60 km/h, vuelta a 40', 'por el mismo camino'], [9.0, 17.4, 'Con 120 km: 2 h de ida y 3 de vuelta', '240 km en 5 horas'], [18.0, 26.4, '240 ÷ 5 = 48 km/h', 'no 50: a 40 va más tiempo']],
      narr: [[0.8, 8.4, 'Una trampa clásica: un bus va a sesenta kilómetros por hora y vuelve por el mismo camino a cuarenta.'], [9.0, 17.4, 'Si el camino mide ciento veinte, la ida tarda dos horas y la vuelta tres: doscientos cuarenta kilómetros en cinco horas.'], [18.0, 26.4, 'El promedio es cuarenta y ocho, no cincuenta: a cuarenta pasa más tiempo, y pesa más.']] },
    { id: 'tachar', name: 'TACHAR SIN CAMBIAR', dur: 30,
      caps: [[0.8, 9.4, '3, 4, 7, 8, 10, 12, 13, 15', 'promedio: 72 ÷ 8 = 9'], [10.0, 19.4, 'Quedan 6 con promedio 9: suman 54', 'los dos tachados suman 18'], [20.0, 29.4, '3 y 15, u 8 y 10', 'hay 2 maneras']],
      narr: [[0.8, 9.4, 'Otro problema: Sofía quiere tachar dos números de esta lista sin que cambie el promedio. Los ocho suman setenta y dos: el promedio es nueve.'], [10.0, 19.4, 'Si los seis que quedan deben promediar nueve, suman cincuenta y cuatro. Los dos tachados suman dieciocho.'], [20.0, 29.4, 'En la lista, las parejas que suman dieciocho son tres y quince, y ocho y diez. Hay dos maneras.']] },
    { id: 'balanza', name: 'LA BALANZA', dur: 28,
      caps: [[0.8, 8.4, 'El promedio es un equilibrio', 'lo que falta de un lado sobra del otro'], [9.0, 17.4, 'Cada grupo jala con su tamaño', 'por la distancia al promedio'], [18.0, 26.4, 'El grupo más grande', 'queda más cerca del promedio']],
      narr: [[0.8, 8.4, 'Un promedio es un punto de equilibrio: lo que a unos les falta para llegar, a otros les sobra.'], [9.0, 17.4, 'Al juntar dos grupos, cada uno jala con su tamaño multiplicado por su distancia al promedio.'], [18.0, 26.4, 'Por eso, el grupo más grande queda más cerca del promedio total, como un adulto cerca del centro de un balancín.']] },
    { id: 'resolver', name: 'EL GRUPO, RESUELTO', dur: 30,
      caps: [[0.8, 9.4, 'Hombres: 0.4 por debajo de 3.9', 'mujeres: 0.2 por encima'], [10.0, 19.4, 'Equilibrio: 0.4 · h = 0.2 · m', 'm = 2h'], [20.0, 29.4, 'Las mujeres son el doble', 'p. ej., 10 hombres y 20 mujeres']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Los hombres están cero coma cuatro por debajo de tres coma nueve; las mujeres, cero coma dos por encima.'], [10.0, 19.4, 'Para equilibrar, cero coma cuatro por los hombres tiene que igualar cero coma dos por las mujeres.'], [20.0, 29.4, 'Así que las mujeres son el doble de los hombres. Con diez hombres y veinte mujeres, el promedio da tres coma nueve.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Las mujeres son el doble', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: hay el doble de mujeres que de hombres.'], [11.0, 20.4, 'Promedio por cantidad es la suma, el ponderado pesa por tamaño, y el promedio es un punto de equilibrio.'], [21.0, 29.4, 'Detrás de cada promedio hay una suma.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 12', TITLE = 'PROMEDIOS', LINE = 'Detrás de cada promedio hay una suma.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-ar-2', KEYS: ['amigo', 'Sofía', 'Daniela', 'km/h'] };
})();
if (typeof module !== 'undefined') module.exports = D;
