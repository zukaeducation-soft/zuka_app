// «Permutaciones» · Preuniversitario, razonamiento lógico, mundo 5 (Conteo), lección pu-co-2. Datos puros.
// Reto: ordenar las letras de LIBRO con las dos vocales juntas (4! · 2 = 48). En medio: ordenar tres libros (6), el
// factorial, el podio de 8 corredores (336), presidente, secretario y tesorero entre 6 (120), el bloque que se amarra, las
// letras repetidas (PAPA: 6) y cuándo importa el orden.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LAS LETRAS DE LIBRO', dur: 30,
      caps: [[1.0, 9.4, 'Ordenar L, I, B, R, O', 'todas las letras, sin repetir'], [10.0, 19.4, 'Las vocales, juntas', 'I y O una al lado de la otra'], [20.0, 29.4, 'Cuántas maneras', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Se ordenan las cinco letras de la palabra LIBRO, todas, sin repetir.'], [10.0, 19.4, 'La condición: las dos vocales, la I y la O, deben quedar juntas, una al lado de la otra.'], [20.0, 29.4, 'Hay que contar cuántas maneras hay de hacerlo. Al final lo resolvemos.']] },
    { id: 'ordenar', name: 'ORDENAR TRES LIBROS', dur: 28,
      caps: [[0.8, 8.4, 'Tres libros en un estante', 'el primer lugar: 3 opciones'], [9.0, 17.4, 'El segundo: 2; el último: 1', 'el que queda'], [18.0, 26.4, '3 · 2 · 1 = 6 órdenes', 'cada orden es una permutación']],
      narr: [[0.8, 8.4, 'Tres libros se ponen en fila en un estante. Para el primer lugar hay tres opciones.'], [9.0, 17.4, 'Para el segundo quedan dos, y para el último, uno solo: el que sobra.'], [18.0, 26.4, 'Tres por dos por uno: seis órdenes. Cada manera de ordenar todo se llama permutación.']] },
    { id: 'factorial', name: 'EL FACTORIAL', dur: 28,
      caps: [[0.8, 8.4, 'n! = n · (n − 1) · … · 1', 'se lee «ene factorial»'], [9.0, 17.4, 'Crece muy rápido', '4! = 24, 5! = 120, 6! = 720'], [18.0, 26.4, '10! = 3 628 800', 'diez libros: más de tres millones de órdenes']],
      narr: [[0.8, 8.4, 'El producto desde ene hasta uno se escribe con un signo de admiración: ene factorial.'], [9.0, 17.4, 'Crece muy rápido: cuatro factorial es veinticuatro; cinco, ciento veinte; seis, setecientos veinte.'], [18.0, 26.4, 'Diez libros se pueden ordenar de más de tres millones de maneras. Por eso se cuenta, no se dibuja.']] },
    { id: 'podio', name: 'EL PODIO', dur: 28,
      caps: [[0.8, 8.4, '8 corredores, 3 medallas', 'oro, plata y bronce'], [9.0, 17.4, '8 · 7 · 6 = 336', 'se ordenan solo tres de los ocho'], [18.0, 26.4, 'Ordenar r de n', 'se multiplican r factores, bajando de a uno']],
      narr: [[0.8, 8.4, 'Ocho corredores compiten por oro, plata y bronce. No se ordenan todos: solo los tres primeros.'], [9.0, 17.4, 'El oro puede ser cualquiera de los ocho; la plata, de los siete restantes; el bronce, de seis. Trescientos treinta y seis podios.'], [18.0, 26.4, 'Para ordenar ere elementos de ene, se multiplican ere factores, empezando en ene y bajando de a uno.']] },
    { id: 'cargos', name: 'TRES CARGOS', dur: 30,
      caps: [[0.8, 9.4, 'Presidente, secretario y tesorero', 'de un grupo de 6 personas'], [10.0, 19.4, 'Los cargos son distintos', 'Ana presidenta no es Ana tesorera'], [20.0, 29.4, '6 · 5 · 4 = 120', 'el orden importa']],
      narr: [[0.8, 9.4, 'Otro problema: de un grupo de seis personas se escogen presidente, secretario y tesorero, sin que nadie ocupe dos cargos.'], [10.0, 19.4, 'Los cargos son distintos: no es lo mismo Ana presidenta y Beto tesorero que al revés. El orden importa.'], [20.0, 29.4, 'Seis opciones para presidente, cinco para secretario y cuatro para tesorero: ciento veinte maneras.']] },
    { id: 'bloque', name: 'AMARRAR UN BLOQUE', dur: 30,
      caps: [[0.8, 9.4, 'Cuatro amigos; dos quieren ir juntos', 'se amarran como un solo bloque'], [10.0, 19.4, 'Ahora son 3 cosas para ordenar', '3! = 6'], [20.0, 29.4, 'Y el bloque tiene 2 órdenes', '6 · 2 = 12']],
      narr: [[0.8, 9.4, 'Cuatro amigos hacen fila y dos de ellos quieren ir juntos. Se amarran y se tratan como un solo bloque.'], [10.0, 19.4, 'Ahora hay tres cosas que ordenar: el bloque y los otros dos. Eso da tres factorial, seis.'], [20.0, 29.4, 'Pero dentro del bloque los dos pueden ir en dos órdenes. Seis por dos: doce filas.']] },
    { id: 'repetidas', name: 'LETRAS REPETIDAS', dur: 28,
      caps: [[0.8, 8.4, 'Anagramas de PAPA', 'si las letras fueran distintas: 4! = 24'], [9.0, 17.4, 'Las P son iguales; las A también', 'cada palabra sale 2 · 2 = 4 veces'], [18.0, 26.4, '24 ÷ 4 = 6 palabras', 'PAPA, PAAP, PPAA, APAP, APPA, AAPP']],
      narr: [[0.8, 8.4, 'Cuántas palabras salen al ordenar las letras de PAPA. Si las cuatro letras fueran distintas, serían veinticuatro.'], [9.0, 17.4, 'Pero las dos P son iguales, y las dos A también: cada palabra aparece cuatro veces en esa cuenta.'], [18.0, 26.4, 'Veinticuatro entre cuatro: seis palabras distintas. Se divide entre los factoriales de las repeticiones.']] },
    { id: 'importa', name: 'CUÁNDO IMPORTA EL ORDEN', dur: 28,
      caps: [[0.8, 8.4, 'Una clave, una fila, unos cargos', 'cambiar el orden da otro resultado'], [9.0, 17.4, 'Un comité, un equipo, un grupo', 'cambiar el orden da lo mismo'], [18.0, 26.4, 'Si importa: permutaciones', 'si no importa: combinaciones, la próxima lección']],
      narr: [[0.8, 8.4, 'Antes de contar hay que preguntarse si importa el orden. En una clave, una fila o unos cargos, cambiar el orden da otro resultado.'], [9.0, 17.4, 'En un comité o en un equipo, cambiar el orden da el mismo grupo.'], [18.0, 26.4, 'Si el orden importa, son permutaciones. Si no importa, son combinaciones, que se cuentan distinto.']] },
    { id: 'resolver', name: 'LIBRO, RESUELTO', dur: 30,
      caps: [[0.8, 9.4, 'Se amarran I y O', 'quedan 4 piezas: L, B, R y el bloque'], [10.0, 19.4, '4! = 24 órdenes', 'para las cuatro piezas'], [20.0, 29.4, 'IO u OI: × 2 = 48', 'las vocales juntas, de 48 maneras']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Se amarran la I y la O en un bloque. Quedan cuatro piezas: la L, la B, la R y el bloque.'], [10.0, 19.4, 'Cuatro piezas se ordenan de cuatro factorial maneras: veinticuatro.'], [20.0, 29.4, 'Y dentro del bloque las vocales pueden ir como I O o como O I: veinticuatro por dos, cuarenta y ocho.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Hay 48 maneras', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: cuarenta y ocho. El bloque se ordena como una pieza y luego se ordena por dentro.'], [11.0, 20.4, 'Ordenar todo es factorial; ordenar algunos, factores que bajan; juntos se amarran; repetidas se dividen.'], [21.0, 29.4, 'Si el orden importa, cada fila cuenta.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 5', TITLE = 'PERMUTACIONES', LINE = 'Si el orden importa, cada fila cuenta.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-co-2', KEYS: ['LIBRO', 'PAPA', 'tesorero'] };
})();
if (typeof module !== 'undefined') module.exports = D;
