// «MCM y MCD» · Preuniversitario, razonamiento lógico, mundo 15 (Teoría de números), lección pu-nu-2. Datos puros.
// Reto: tres luces cada 12, 18 y 30 segundos; coinciden cada mcm = 180 s = 3 min → 10 veces en 30 minutos. En medio: coincidir (4 y 6
// → 12), el mcm y el mcd con factores (8 y 12 → 24 y 4), los buses de dos rutas (cada 12 y cada 20 minutos, desde las 6:00 y las
// 6:20 → 7:00), el mcd para partir (cintas de 24 y 36 → 12), el piso de 360 × 270 (baldosas de 90 → 12), cuál de los dos usar y el
// menor número que deja residuo 3 entre 4, 5 y 6 (63).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'TRES LUCES', dur: 30,
      caps: [[1.0, 9.4, 'Luces cada 12, 18 y 30 segundos', 'ahora se encienden las tres juntas'], [10.0, 19.4, 'Cuándo vuelven a coincidir', 'durante los próximos 30 minutos'], [20.0, 29.4, 'Cuántas veces coinciden', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Tres luces se encienden cada doce, dieciocho y treinta segundos. En este momento se encienden las tres a la vez.'], [10.0, 19.4, 'Hay que contar cuántas veces volverán a encenderse juntas durante los próximos treinta minutos.'], [20.0, 29.4, 'Cada luz tiene su ritmo, y hay que hallar el ritmo común. Al final lo resolvemos.']] },
    { id: 'coincidir', name: 'CUÁNDO COINCIDEN', dur: 28,
      caps: [[0.8, 8.4, 'Una cada 4, otra cada 6', '4, 8, 12, 16… y 6, 12, 18…'], [9.0, 17.4, 'El primero de las dos listas', '12: el mínimo común múltiplo'], [18.0, 26.4, 'Después coinciden cada 12', '12, 24, 36…']],
      narr: [[0.8, 8.4, 'Si una cosa pasa cada cuatro minutos y otra cada seis, se pueden listar los múltiplos: cuatro, ocho, doce, dieciséis... y seis, doce, dieciocho...'], [9.0, 17.4, 'El primero que aparece en las dos listas es doce: el mínimo común múltiplo.'], [18.0, 26.4, 'Después vuelven a coincidir cada doce: en veinticuatro, treinta y seis, y así.']] },
    { id: 'factores', name: 'CON LOS FACTORES', dur: 28,
      caps: [[0.8, 8.4, '8 = 2³ y 12 = 2² · 3', 'se factoriza cada número'], [9.0, 17.4, 'MCM: cada primo, mayor exponente', '2³ · 3 = 24'], [18.0, 26.4, 'MCD: solo los comunes, con el menor', '2² = 4']],
      narr: [[0.8, 8.4, 'Con números grandes, mejor factorizar. Ocho es dos al cubo, y doce es dos al cuadrado por tres.'], [9.0, 17.4, 'El mínimo común múltiplo toma cada primo con su mayor exponente: dos al cubo por tres, veinticuatro.'], [18.0, 26.4, 'El máximo común divisor toma solo los primos comunes, con el menor exponente: dos al cuadrado, cuatro.']] },
    { id: 'buses', name: 'LOS BUSES DE DOS RUTAS', dur: 30,
      caps: [[0.8, 9.4, 'Ruta 1: cada 12 min desde las 6:00', 'ruta 2: cada 20 min desde las 6:20'], [10.0, 19.4, 'Ruta 1: 6:00, 6:12, … 6:48, 7:00', 'ruta 2: 6:20, 6:40, 7:00'], [20.0, 29.4, 'Salen juntos a las 7:00 a. m.', 'luego cada mcm(12, 20) = 60 min']],
      narr: [[0.8, 9.4, 'Otro problema: salen buses de dos rutas. Los de la ruta uno, cada doce minutos desde las seis; los de la dos, cada veinte desde las seis y veinte.'], [10.0, 19.4, 'Como no empiezan juntos, se listan las salidas: la ruta uno llega a las siete; la ruta dos, también.'], [20.0, 29.4, 'Salen juntos por primera vez a las siete. Desde ahí coinciden cada sesenta minutos, el mínimo común múltiplo.']] },
    { id: 'partir', name: 'PARTIR EN PEDAZOS IGUALES', dur: 28,
      caps: [[0.8, 8.4, 'Cintas de 24 y 36 cm', 'en trozos iguales, lo más largos posible'], [9.0, 17.4, 'El trozo debe dividir a los dos', 'divisores comunes: 1, 2, 3, 4, 6, 12'], [18.0, 26.4, 'El mayor: 12 cm', 'el máximo común divisor']],
      narr: [[0.8, 8.4, 'El máximo común divisor sirve para partir. Dos cintas de veinticuatro y treinta y seis centímetros se cortan en trozos iguales, lo más largos posible.'], [9.0, 17.4, 'El trozo tiene que caber exacto en las dos: debe dividir a veinticuatro y a treinta y seis.'], [18.0, 26.4, 'El mayor de esos divisores es doce: trozos de doce centímetros, dos de una cinta y tres de la otra.']] },
    { id: 'baldosas', name: 'EL PISO DEL SALÓN', dur: 30,
      caps: [[0.8, 9.4, 'Piso de 360 × 270 cm', 'baldosas cuadradas lo más grandes posible'], [10.0, 19.4, 'El lado: mcd(360, 270) = 90 cm', 'cabe exacto a lo largo y a lo ancho'], [20.0, 29.4, '360 ÷ 90 = 4 y 270 ÷ 90 = 3', '4 · 3 = 12 baldosas']],
      narr: [[0.8, 9.4, 'Otro problema: el piso de un salón mide trescientos sesenta por doscientos setenta centímetros, y se cubre con baldosas cuadradas iguales, lo más grandes posible, sin cortar.'], [10.0, 19.4, 'El lado de la baldosa tiene que dividir a los dos lados: el máximo común divisor, noventa centímetros.'], [20.0, 29.4, 'Caben cuatro a lo largo y tres a lo ancho: doce baldosas.']] },
    { id: 'cual', name: 'MCM O MCD', dur: 28,
      caps: [[0.8, 8.4, 'Volver a coincidir, encontrarse', 'el mínimo común múltiplo: hacia arriba'], [9.0, 17.4, 'Partir, repartir, el mayor tamaño', 'el máximo común divisor: hacia abajo'], [18.0, 26.4, 'El MCM no es menor que los números', 'el MCD, menor o igual']],
      narr: [[0.8, 8.4, 'Para saber cuál usar: si el problema habla de volver a coincidir o de encontrarse, es el mínimo común múltiplo. Va hacia arriba.'], [9.0, 17.4, 'Si habla de partir, repartir o del mayor tamaño posible, es el máximo común divisor. Va hacia abajo.'], [18.0, 26.4, 'Una comprobación rápida: el mínimo común múltiplo no es menor que ningún número, y el máximo común divisor no es mayor.']] },
    { id: 'residuo', name: 'SOBRAN TRES', dur: 28,
      caps: [[0.8, 8.4, 'Residuo 3 al dividir entre 4, 5 y 6', 'el menor posible'], [9.0, 17.4, 'Si sobran 3, al quitarlos', 'queda un múltiplo de 4, 5 y 6'], [18.0, 26.4, 'mcm(4, 5, 6) = 60', '60 + 3 = 63']],
      narr: [[0.8, 8.4, 'Un último caso: el menor número mayor que tres que deja residuo tres al dividirlo entre cuatro, entre cinco y entre seis.'], [9.0, 17.4, 'Si siempre sobran tres, al quitarlos queda un número que se divide exacto entre cuatro, cinco y seis.'], [18.0, 26.4, 'El menor de esos es el mínimo común múltiplo, sesenta. Y el número buscado es sesenta y tres.']] },
    { id: 'resolver', name: 'LAS LUCES, RESUELTAS', dur: 30,
      caps: [[0.8, 9.4, 'Se factorizan 12, 18 y 30', '2² · 3;  2 · 3²;  2 · 3 · 5'], [10.0, 19.4, 'mcm = 2² · 3² · 5 = 180 s', '180 s = 3 minutos'], [20.0, 29.4, '30 ÷ 3 = 10 veces', 'en los próximos 30 minutos']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Doce es dos al cuadrado por tres; dieciocho, dos por tres al cuadrado; treinta, dos por tres por cinco.'], [10.0, 19.4, 'Cada primo con su mayor exponente: dos al cuadrado por tres al cuadrado por cinco, ciento ochenta segundos, tres minutos.'], [20.0, 29.4, 'En treinta minutos hay diez bloques de tres: las luces vuelven a coincidir diez veces.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Coinciden 10 veces', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: diez veces.'], [11.0, 20.4, 'El mínimo común múltiplo para coincidir, el máximo común divisor para partir, los dos con los factores primos.'], [21.0, 29.4, 'Coincidir es múltiplo; partir es divisor.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 15', TITLE = 'MCM Y MCD', LINE = 'Coincidir es múltiplo; partir, divisor.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-nu-2', KEYS: ['360', 'cintas', '180', '63'] };
})();
if (typeof module !== 'undefined') module.exports = D;
