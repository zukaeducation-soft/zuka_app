// «Operaciones y Venn» · Preuniversitario, razonamiento lógico, mundo 14 (Conjuntos), lección pu-cj-1. Datos puros.
// Reto: 200 empleados; 60 % habla inglés, 25 % francés y 30 % ninguno → 15 %, 30 empleados, hablan los dos. En medio: las cuatro
// zonas de dos conjuntos, las operaciones (unión, intersección, diferencia, complemento), las familias con perro y gato (60, 32, 25
// y 8 → 11 sin ninguno), el doble conteo, el mismo cálculo con porcentajes (70 %, 50 %, 10 % → 30 %), «solo» y «exactamente uno»,
// y llenar desde el centro.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'DOS IDIOMAS', dur: 30,
      caps: [[1.0, 9.4, '200 empleados', '60 % inglés, 25 % francés'], [10.0, 19.4, 'El 30 % no habla ninguno', 'los porcentajes suman más de 100'], [20.0, 29.4, 'Cuántos hablan los dos', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. En una empresa trabajan doscientos empleados. El sesenta por ciento habla inglés y el veinticinco por ciento, francés.'], [10.0, 19.4, 'Y el treinta por ciento no habla ninguno de los dos. Sesenta más veinticinco más treinta pasa de cien: algo se está contando dos veces.'], [20.0, 29.4, 'Hay que hallar cuántos empleados hablan los dos idiomas. Al final lo resolvemos.']] },
    { id: 'zonas', name: 'LAS CUATRO ZONAS', dur: 28,
      caps: [[0.8, 8.4, 'Dos conjuntos dentro del universo', 'el rectángulo es todo el grupo'], [9.0, 17.4, 'Solo A, los dos, solo B', 'cada persona cae en una sola zona'], [18.0, 26.4, 'Y afuera: ninguno', 'las cuatro zonas suman el total']],
      narr: [[0.8, 8.4, 'Un diagrama de Venn tiene un rectángulo, que es todo el grupo, y dentro, un círculo por cada conjunto.'], [9.0, 17.4, 'Dos círculos que se cruzan forman zonas: solo A, los dos, y solo B. Cada persona cae en una sola zona.'], [18.0, 26.4, 'Y por fuera de los círculos, los de ninguno. Las cuatro zonas juntas suman el total.']] },
    { id: 'operaciones', name: 'LAS OPERACIONES', dur: 28,
      caps: [[0.8, 8.4, 'Unión A ∪ B: A o B', 'intersección A ∩ B: A y B'], [9.0, 17.4, 'Diferencia A − B: A pero no B', 'la luna de A que no toca B'], [18.0, 26.4, 'Complemento Aᶜ: lo que no es A', 'todo el resto del universo']],
      narr: [[0.8, 8.4, 'La unión es todo lo que está en A o en B. La intersección, solo lo que está en los dos a la vez.'], [9.0, 17.4, 'La diferencia A menos B es lo de A que no está en B: la luna de A.'], [18.0, 26.4, 'Y el complemento de A es todo lo que no está en A, dentro del universo.']] },
    { id: 'perros', name: 'PERROS Y GATOS', dur: 30,
      caps: [[0.8, 9.4, '60 familias: 32 perro, 25 gato', '8 tienen perro y gato'], [10.0, 19.4, 'Unión: 32 + 25 − 8 = 49', 'el 8 se había contado dos veces'], [20.0, 29.4, 'Ninguno: 60 − 49 = 11', '11 familias sin perro ni gato']],
      narr: [[0.8, 9.4, 'Otro problema: en una encuesta a sesenta familias, treinta y dos tienen perro, veinticinco tienen gato y ocho tienen los dos.'], [10.0, 19.4, 'Las que tienen alguno son treinta y dos más veinticinco menos ocho: cuarenta y nueve. Las ocho estaban contadas dos veces.'], [20.0, 29.4, 'Las que no tienen ni perro ni gato son sesenta menos cuarenta y nueve: once.']] },
    { id: 'doble', name: 'EL DOBLE CONTEO', dur: 28,
      caps: [[0.8, 8.4, 'n(A) + n(B) cuenta dos veces', 'a los que están en los dos'], [9.0, 17.4, 'n(A ∪ B) = n(A) + n(B) − n(A ∩ B)', 'se resta una vez lo repetido'], [18.0, 26.4, 'Si la suma pasa del total', 'lo que sobra es la intersección']],
      narr: [[0.8, 8.4, 'Al sumar los de A y los de B, los que están en los dos se cuentan dos veces.'], [9.0, 17.4, 'Por eso la unión es A más B menos la intersección: se resta una vez lo repetido.'], [18.0, 26.4, 'Y al revés: si la suma pasa de la unión, lo que sobra es exactamente la intersección.']] },
    { id: 'porcentajes', name: 'CON PORCENTAJES', dur: 28,
      caps: [[0.8, 8.4, '70 % ve fútbol, 50 % ve tenis', 'y 10 % no ve ninguno'], [9.0, 17.4, 'Alguno: 100 − 10 = 90 %', '70 + 50 = 120 %'], [18.0, 26.4, 'Sobran 30 %: ven los dos', 'los porcentajes se tratan igual']],
      narr: [[0.8, 8.4, 'Con porcentajes se hace igual. En un curso, el setenta por ciento ve fútbol, el cincuenta ve tenis y el diez no ve ninguno.'], [9.0, 17.4, 'Ven alguno el noventa por ciento. Pero setenta más cincuenta da ciento veinte.'], [18.0, 26.4, 'Sobra un treinta por ciento: son los que ven los dos. El cien por ciento funciona como el total.']] },
    { id: 'solo', name: 'SOLO Y EXACTAMENTE UNO', dur: 28,
      caps: [[0.8, 8.4, 'Solo fútbol: 70 − 30 = 40 %', 'se quita la intersección'], [9.0, 17.4, 'Solo tenis: 50 − 30 = 20 %', 'la otra luna'], [18.0, 26.4, 'Exactamente uno: 40 + 20 = 60 %', 'la unión menos la intersección']],
      narr: [[0.8, 8.4, 'Con la intersección se llena todo. Solo fútbol es setenta menos treinta: cuarenta por ciento.'], [9.0, 17.4, 'Solo tenis, cincuenta menos treinta: veinte por ciento.'], [18.0, 26.4, 'Y exactamente uno de los dos es cuarenta más veinte: sesenta por ciento. Cuarenta, treinta, veinte y diez suman cien.']] },
    { id: 'centro', name: 'DESDE EL CENTRO', dur: 28,
      caps: [[0.8, 8.4, 'El orden para llenar un Venn', 'primero la intersección'], [9.0, 17.4, 'Luego las lunas', 'cada conjunto menos lo del centro'], [18.0, 26.4, 'Al final, lo de afuera', 'el total menos todo lo de adentro']],
      narr: [[0.8, 8.4, 'Hay un orden que no falla para llenar un diagrama: se empieza por la intersección, el centro.'], [9.0, 17.4, 'Luego las lunas: cada conjunto menos lo que ya está en el centro.'], [18.0, 26.4, 'Y al final, lo de afuera: el total menos todo lo que quedó adentro.']] },
    { id: 'resolver', name: 'LOS IDIOMAS, RESUELTOS', dur: 30,
      caps: [[0.8, 9.4, 'Alguno: 100 − 30 = 70 %', '60 + 25 = 85 %'], [10.0, 19.4, 'Los dos: 85 − 70 = 15 %', 'el 15 % de 200 = 30'], [20.0, 29.4, 'Solo francés: 25 − 15 = 10 %', '20 empleados']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Si el treinta por ciento no habla ninguno, el setenta habla alguno. Pero sesenta más veinticinco da ochenta y cinco.'], [10.0, 19.4, 'Sobra un quince por ciento: son los que hablan los dos. El quince por ciento de doscientos es treinta.'], [20.0, 29.4, 'Y con eso se llena el resto: solo francés es veinticinco menos quince, un diez por ciento: veinte empleados.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, '30 empleados hablan los dos', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: treinta empleados.'], [11.0, 20.4, 'Cuatro zonas que suman el total, la unión resta una vez la intersección, y se llena desde el centro hacia afuera.'], [21.0, 29.4, 'Lo que se cuenta dos veces es la intersección.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 14', TITLE = 'OPERACIONES Y VENN', LINE = 'Lo contado dos veces es la intersección.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-cj-1', KEYS: ['inglés', 'perro', 'fútbol y tenis', 'empleados'] };
})();
if (typeof module !== 'undefined') module.exports = D;
