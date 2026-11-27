// Generado por tools/empaquetar.js: no editar a mano.
;
//#archivo js/courses/algebra-revision.js
// Revisión de la práctica de Álgebra (spec 2026-11-18-algebra-revision). Va después de algebra-taller.js. Rehace, mundo
// por mundo, las lecciones ya revisadas: sin los motores genéricos del taller, sin juegos repetidos en el curso y con
// una escena propia por idea; y su evaluación, con al menos dos preguntas por lección hechas con juegos de sus lecciones.
// ALG_REVISADOS lista los mundos terminados (las pruebas los revisan con las reglas nuevas).
const ALG_REVISADOS = [];
// Mecánicas que el usuario descartó (escoger, tarjetas, armar con fichas de solo tocar).
const ALG_ABURRIDOS = ['escala-solucion', 'arma-la-cuenta', 'une-parejas', 'clasifica-cartas', 'ordena-terminos', 'verdadero-falso'];
(() => {
  const units = COURSE_ALGEBRA.units, lessons = units.flatMap(u => u.lessons);
  const L = id => lessons.find(l => l.id === id);
  // Un ejercicio que la lección ya tenía.
  const keep = (id, game) => { const e = L(id).ex.find(e => e.game === game); if (!e) throw new Error(`${id} no tiene ${game}`); return e; };
  const setLesson = (id, list) => { L(id).ex = list.map((e, i) => ({ ...e, canvasGuide: true, motion: i === list.length - 1 })); };
  // Evaluación: lo que tenía (sin motores del taller) más las preguntas nuevas, en el orden de las lecciones.
  function setExam(world, extra) {
    const u = units.find(u => u.world === world), order = u.lessons.map(l => l.id);
    const old = u.exam.items.filter(it => !String(it.ex.game).startsWith('taller-') && !ALG_ABURRIDOS.includes(it.ex.game));
    // La pista de una pregunta corta se completa con la idea que repasa (orienta sin dar el resultado).
    const items = [...old, ...extra.map(([lesson, review, ex]) => ({ lesson, review: review.length > 30 ? review : `${review} ${ex.explain}`, ex: { ...ex, hint: ex.hint.length >= 30 ? ex.hint : `${ex.hint} ${review}`, canvasGuide: true, exam: true, params: { ...ex.params, autoDemo: false } } }))];
    u.exam.items = items.map((it, k) => [it, k]).sort((a, b) => order.indexOf(a[0].lesson) - order.indexOf(b[0].lesson) || a[1] - b[1]).map(([it]) => it);
    u.exam.minutes = Math.max(12, Math.round(u.exam.items.length * 1.5));
    ALG_REVISADOS.push(world);
  }

  // ───────── Mundo 1 · Teoría de Conjuntos ─────────
  {
    const a = ['cumple-notacion', 'tacha-repetidos', 'atrapa-elementos', 'lazo-conjunto'].map(g => keep('alg-0a', g));
    setLesson('alg-0a', [a[0], a[1],
      play('tamiz-rango', 'De la regla a la lista: deja adentro solo lo que cumple', { rounds: [
        { name: 'A', text: 'los días después del martes y antes del sábado', labels: ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'], lo: 2, hi: 4 },
        { name: 'B', text: 'los días desde el viernes hasta el domingo', labels: ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'], lo: 4, hi: 6 },
        { name: 'C', text: 'las letras desde la c hasta la g', labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j'], lo: 2, hi: 6 },
        { name: 'D', text: 'los días que hay entre el lunes y el martes', labels: ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'], lo: 1, hi: 0 },
      ] }, 'Por comprensión se da la regla; por extensión se escriben los elementos. «Después del martes y antes del sábado» deja por fuera al martes y al sábado: $A = \\{\\text{mié}, \\text{jue}, \\text{vie}\\}$. «Desde… hasta» incluye los dos extremos: $B$ tiene tres días y $C$ cinco letras. Entre el lunes y el martes no hay ningún día: $D = \\varnothing$.',
      { hint: '«Después de» y «antes de» dejan por fuera lo que nombran; «desde» y «hasta» lo incluyen. Si nada cumple, junta los corchetes.' }),
      play('cajas-anidadas', 'Un conjunto puede guardar conjuntos: arma cada uno', { rounds: [
        { name: 'A', target: ['1', '{2, 3}'], tray: ['1', '2', '3', '{2, 3}', '{1}'] },
        { name: 'B', target: ['{a}', 'b'], tray: ['a', 'b', '{a}', '{b}', '{a, b}'] },
        { name: 'C', target: ['{x, y}'], tray: ['x', 'y', '{x}', '{y}', '{x, y}'] },
        { name: 'D', target: ['{1}', '{1, 2}'], tray: ['1', '2', '{1}', '{2}', '{1, 2}'] },
      ] }, '$A = \\{1, \\{2, 3\\}\\}$ tiene dos elementos: el 1 y la bolsa $\\{2, 3\\}$; el 2 y el 3 sueltos no son elementos de A. $B = \\{\\{a\\}, b\\}$ tiene dos. $C = \\{\\{x, y\\}\\}$ tiene un solo elemento, aunque dentro de la bolsa haya dos. Y $D = \\{\\{1\\}, \\{1, 2\\}\\}$ tiene dos elementos, los dos conjuntos.',
      { hint: 'Lee la notación por capas: cada coma de afuera separa un elemento. Una llave dentro de otra es una bolsa que entra entera, tenga lo que tenga.' }),
      a[2],
      play('gemelos', 'Cada hilo une elementos iguales. Deja A = B sin sacar de más', { rounds: [
        { goal: '=', A: ['t', 'e', 'l', 'a', 's'], B: ['l', 'a', 't', 'e', 'e'] },
        { goal: '=', A: ['m', 'a', 'r'], B: ['r', 'a', 'm', 'o'] },
        { goal: '=', A: ['c', 'a', 's', 'o'], B: ['s', 'a', 'c', 'a', 'r'] },
        { goal: '=', A: ['1', '3', '5', '7'], B: ['7', '5', '9', '1', '3', '3'] },
      ] }, 'Dos conjuntos son iguales si tienen los mismos elementos: el orden y las repeticiones no cuentan. Por eso la e repetida no estorba y solo sobra la s; luego sobra la o de B; en la tercera sobran la o de A y la r de B; en la última, el 3 repetido no estorba y sobra el 9.',
      { hint: 'Sigue los hilos: un elemento sin hilo no tiene gemelo al otro lado y no deja que los conjuntos sean iguales. Los repetidos sí tienen hilo.' }),
      a[3]]);

    const b = ['arma-conjunto', 'mueve-circulos', 'cubo-partes', 'orbita-conjuntos'].map(g => keep('alg-0b', g));
    setLesson('alg-0b', [b[0], b[1],
      play('escalera-inclusion', 'Muñecas de conjuntos: cada uno envuelve al de adentro', { rounds: [
        { sets: [['a', 'b', 'c'], [], ['a'], ['a', 'c'], ['b', 'd']] },
        { sets: [['1', '2'], ['1', '2', '3', '4'], ['2'], ['1', '2', '4'], ['3']] },
        { sets: [['x'], ['x', 'y', 'z'], [], ['y'], ['x', 'y']] },
      ] }, 'Cada conjunto de la cadena tiene todos los elementos del anterior y alguno más. El vacío está contenido en cualquier conjunto, así que va en el centro cuando aparece. $\\{b, d\\}$ no cabe en la cadena de $\\{a, c\\}$ porque no contiene a $a$. En la tercera hay dos cadenas igual de largas: por $\\{x\\}$ o por $\\{y\\}$.',
      { hint: 'Empieza por el conjunto con menos elementos. Antes de soltar uno nuevo, revisa que tenga todos los elementos del que ya está adentro.' }),
      b[2],
      play('arbol-partes', 'El árbol de los subconjuntos: cada elemento parte las ramas en dos', { rounds: [
        { target: 8, pool: ['p', 'q', 'r', 's', 't'] },
        { target: 1, pool: ['p', 'q', 'r'] },
        { target: 16, pool: ['p', 'q', 'r', 's', 't'] },
        { target: 32, pool: ['p', 'q', 'r', 's', 't'] },
      ] }, 'Cada elemento nuevo parte cada hoja en dos: sin él y con él. Por eso las hojas se duplican: $2, 4, 8, 16, 32$. Un conjunto de $n$ elementos tiene $2^n$ subconjuntos, y el vacío tiene uno solo, él mismo: $2^0 = 1$.',
      { hint: 'Mira cuánto cambia el número de hojas cada vez que agregas un elemento. ¿Cuántas veces hay que duplicar para llegar a la meta?' }),
      b[3],
      play('anillos-subconjunto', 'Aros de subconjuntos: el aro solo encaja si la estaca lo contiene', { rounds: [
        { title: 'Encaja el aro', items: [
          { ring: ['a', 'c'], pegs: [['a', 'b'], ['a', 'b', 'c'], ['c', 'd']] },
          { ring: ['1', '2'], pegs: [['2', '3'], ['1', '3', '4'], ['1', '2', '5']] },
          { ring: ['m'], pegs: [['n', 'o'], ['l', 'm'], ['p']] }] },
        { title: 'Casos especiales', items: [
          { ring: [], pegs: [['a'], ['b'], ['c']] },
          { ring: ['x', 'y', 'z'], pegs: [['x', 'y'], ['x', 'y', 'z'], ['y', 'z', 'w']] },
          { ring: ['2', '4'], pegs: [['4'], ['1', '2', '3'], ['2', '4', '6']] }] },
      ] }, '$X \\subseteq Y$ cuando cada elemento de X está en Y. El vacío encaja en cualquier estaca, y todo conjunto es subconjunto de sí mismo: $\\{x, y, z\\} \\subseteq \\{x, y, z\\}$.',
      { hint: 'Antes de lanzar, busca cada elemento del aro en la estaca. Basta que falte uno para que no encaje.' })]);

    const c = ['reparte-venn', 'pinta-venn', 'encuesta-venn', 'descifra-zona'].map(g => keep('alg-0c', g));
    setLesson('alg-0c', [c[0], c[1],
      play('solapa-cardinal', 'Solapa B sobre A hasta que la unión tenga el total', { rounds: [
        { a: 12, b: 9, total: 17, A: 'leen', B: 'escuchan pódcast' },
        { a: 15, b: 10, total: 15, A: 'usan bici', B: 'usan casco' },
        { a: 7, b: 8, total: 15, A: 'estudian de día', B: 'de noche' },
        { a: 20, b: 14, total: 26, A: 'toman café', B: 'toman té' },
      ] }, 'Al sumar $n(A) + n(B)$, los que están en los dos se cuentan dos veces; por eso se resta una vez la intersección: $n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$. $12 + 9 - 17 = 4$; $15 + 10 - 15 = 10$ (todos los del casco usan bici: $B \\subseteq A$); $7 + 8 - 15 = 0$ (disjuntos); $20 + 14 - 26 = 8$.',
      { hint: 'Suma los dos grupos y compara con el total: lo que sobra son personas contadas dos veces.' }),
      play('goma-diferencia', 'Borra lo que la operación deja por fuera', { rounds: [
        { op: 'A-B', U: ['1', '2', '3', '4', '5', '6', '7', '8'], A: ['1', '2', '3', '4', '6'], B: ['2', '4', '5', '7'] },
        { op: 'Ac', U: ['a', 'b', 'c', 'd', 'e', 'f', 'g'], A: ['a', 'c', 'e'], B: ['e', 'f'] },
        { op: 'B-A', U: ['m', 'a', 'r', 'i', 'o', 's'], A: ['m', 'a', 'r'], B: ['r', 'i', 'o', 'm'] },
        { op: 'AdB', U: ['1', '2', '3', '4', '5', '6', '7'], A: ['1', '2', '3', '4'], B: ['3', '4', '5', '6'] },
      ] }, '$A - B$ deja lo de A que no está en B: $\\{1, 3, 6\\}$. El complemento deja lo de U que no está en A: $\\{b, d, f, g\\}$. $B - A = \\{i, o\\}$: no es lo mismo que $A - B$. Y la diferencia simétrica quita de la unión lo que es común: $\\{1, 2, 5, 6\\}$.',
      { hint: 'Antes de borrar, busca en el diagrama la zona de cada elemento: solo se borra lo que cae en la parte que la operación excluye.' }),
      c[2],
      play('busca-b', 'Las operaciones al revés: encuentra el conjunto B', { rounds: [
        { U: ['1', '2', '3', '4', '5', '6'], A: ['1', '2', '3'], conds: [['union', ['1', '2', '3', '4', '5']], ['inter', ['2']]] },
        { U: ['a', 'e', 'i', 'o', 'u', 'y'], A: ['a', 'e', 'i'], conds: [['union', ['a', 'e', 'i', 'o', 'u']], ['inter', []]] },
        { U: ['1', '2', '3', '4', '5', '6', '7', '8'], A: ['2', '4', '6', '8'], conds: [['inter', ['4', '8']], ['BmA', ['1']]] },
        { U: ['w', 'x', 'y', 'z'], A: ['x', 'y'], conds: [['union', ['w', 'x', 'y', 'z']], ['inter', ['x', 'y']]] },
      ] }, 'La intersección dice qué elementos de A están en B, y la unión, qué más puede tener B. En la primera, B tiene el 2 (lo común) y el 4 y el 5 (lo que la unión agrega): $B = \\{2, 4, 5\\}$. Luego $B = \\{o, u\\}$, $B = \\{1, 4, 8\\}$ y $B = \\{w, x, y, z\\}$, que contiene a A.',
      { hint: 'Empieza por la pista de la intersección: eso de A va en B. Luego mira qué agrega la otra pista y qué elementos no pueden estar.' }),
      c[3]]);

    setExam('conjuntos', [
      ['alg-0a', 'Por comprensión se da la regla y por extensión se escriben los elementos; «desde» y «hasta» incluyen los extremos, «antes de» y «después de» no.',
        play('tamiz-rango', 'Deja adentro solo lo que cumple', { rounds: [
          { name: 'P', text: 'las vocales que van después de la e', labels: ['a', 'e', 'i', 'o', 'u'], lo: 2, hi: 4 },
          { name: 'Q', text: 'los días antes del jueves', labels: ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'], lo: 0, hi: 2 }] },
        '$P = \\{i, o, u\\}$ y $Q = \\{\\text{lun}, \\text{mar}, \\text{mié}\\}$.', { hint: 'Revisa los extremos uno por uno.' })],
      ['alg-0a', 'Una bolsa dentro de un conjunto es un solo elemento, tenga lo que tenga.',
        play('cajas-anidadas', 'Arma el conjunto', { rounds: [{ name: 'E', target: ['a', '{b, c}'], tray: ['a', 'b', 'c', '{b, c}', '{a}'] }] },
        '$E = \\{a, \\{b, c\\}\\}$ tiene dos elementos.', { hint: 'Cada coma de afuera separa un elemento.' })],
      ['alg-0a', 'Dos conjuntos son iguales si tienen los mismos elementos; el orden y las repeticiones no cuentan.',
        play('gemelos', 'Deja A = B sin sacar de más', { rounds: [{ goal: '=', A: ['c', 'a', 'm', 'p', 'o'], B: ['m', 'o', 'c', 'a', 'a'] }] },
        'Sobra la p: $\\{m, o, c, a, a\\} = \\{c, a, m, o\\}$.', { hint: 'Busca el elemento sin hilo.' })],
      ['alg-0b', 'El vacío no tiene elementos; $\\{\\varnothing\\}$ tiene uno, y 0 no es el vacío.',
        play('cajas-anidadas', 'Arma cada conjunto', { rounds: [
          { name: 'F', target: ['∅'], tray: ['∅', '{∅}', '0', '{0}'] },
          { name: 'H', target: ['0', '∅'], tray: ['0', '∅', '{0}', '{∅}', '1'] }] },
        '$F = \\{\\varnothing\\}$ tiene un elemento, el vacío. $H = \\{0, \\varnothing\\}$ tiene dos: el número 0 y el conjunto vacío.', { hint: 'Una bolsa vacía también es una pieza.' })],
      ['alg-0b', '$A \\subseteq B$ pide que todo elemento de A esté en B; disjuntos es no compartir nada.',
        play('gemelos', 'Logra la relación sin sacar de más', { rounds: [
          { goal: 'sub', A: ['3', '6', '9'], B: ['1', '3', '6', '12'] },
          { goal: 'disj', A: ['p', 'e', 'z'], B: ['p', 'a', 'z', 'o'] }] },
        'Para $A \\subseteq B$ sobra el 9. Para que sean disjuntos salen de B la p y la z.', { hint: 'Mira qué elementos tienen hilo.' })],
      ['alg-0b', 'En una cadena de inclusión cada conjunto contiene al anterior; el vacío está contenido en todos.',
        play('escalera-inclusion', 'Arma la cadena más larga', { rounds: [{ sets: [['m', 'n'], [], ['m', 'n', 'o'], ['n'], ['o', 'p']] }] },
        '$\\varnothing \\subseteq \\{n\\} \\subseteq \\{m, n\\} \\subseteq \\{m, n, o\\}$.', { hint: 'Empieza por el más pequeño.' })],
      ['alg-0b', 'Un conjunto de $n$ elementos tiene $2^n$ subconjuntos: cada elemento duplica las posibilidades.',
        play('arbol-partes', 'Haz crecer el árbol', { rounds: [{ target: 4, pool: ['a', 'b', 'c', 'd'] }] },
        '$2^2 = 4$: dos elementos.', { hint: 'Cada elemento duplica las hojas.' })],
      ['alg-0c', 'La intersección es lo común. A − B quita de A lo que también está en B.',
        play('goma-diferencia', 'Borra lo que la operación deja por fuera', { rounds: [
          { op: 'A-B', U: ['C', 'L', 'I', 'M', 'A', 'R'], A: ['C', 'L', 'I', 'M', 'A'], B: ['M', 'A', 'R'] },
          { op: 'Ac', U: ['1', '2', '3', '4', '5', '6'], A: ['2', '4', '6'], B: ['1', '2'] }] },
        'Las letras de CLIMA que no están en MAR son $\\{C, L, I\\}$. El complemento de $\\{2, 4, 6\\}$ en $\\{1, \\dots, 6\\}$ es $\\{1, 3, 5\\}$.', { hint: 'Ubica cada elemento en su zona.' })],
      ['alg-0c', 'Lo común de A va en B; lo que la unión agrega fuera de A también; nada más.',
        play('busca-b', 'Encuentra el conjunto B', { rounds: [{ U: ['1', '2', '3', '4', '5', '6'], A: ['1', '2', '4'], conds: [['union', ['1', '2', '3', '4']], ['inter', ['1']]] }] },
        '$B = \\{1, 3\\}$.', { hint: 'Empieza por la intersección.' })],
      ['alg-0c', 'Al sumar dos grupos, los que están en ambos se cuentan dos veces.',
        play('solapa-cardinal', 'Solapa B sobre A', { rounds: [{ a: 9, b: 6, total: 11, A: 'hablan inglés', B: 'hablan francés' }] },
        '$9 + 6 - 11 = 4$ hablan los dos idiomas.', { hint: 'Suma y compara con el total.' })],
    ]);
  }
  // ───────── Mundo 2 · La Recta Real ─────────
  {
    const n11 = ['ascensor', 'recta-espejo', 'fuga-de-familia', 'buzo-enteros'].map(g => keep('alg-11', g));
    setLesson('alg-11', [n11[0], n11[1],
      play('globo-lastre', 'Lleva el canasto a la altura de la bandera', { rounds: [
        { g: 3, s: 7, act: 'addG', target: -1 }, { g: 5, s: 2, act: 'addS', target: -2 }, { g: 4, s: 4, act: 'remS', target: 3 }, { g: 6, s: 1, act: 'remG', target: -1 },
      ] }, 'Cada globo vale $+1$ y cada saco $-1$: la altura es globos menos sacos. Amarrar globos es sumar positivos y colgar sacos es sumar negativos. Soltar un globo es restar un positivo: baja. Soltar un saco es restar un negativo: **sube**. Por eso $0 - (-3) = 3$.',
        { hint: 'Calcula primero a qué altura está el canasto y cuántos niveles le faltan hasta la bandera. Luego piensa qué le hace a la altura cada cosa que permite la ronda.' }),
      play('pares-cero', 'Suma y resta enteros con fichas + y −', { rounds: [
        { op: '+', a: 5, b: -8 }, { op: '+', a: -4, b: 6 }, { op: '-', a: 3, b: -4 }, { op: '-', a: -2, b: 5 },
      ] }, 'Una ficha $+$ y una $-$ juntas valen 0: se anulan. $5 + (-8)$: se anulan cinco parejas y quedan tres $-$, o sea $-3$. Para restar se quitan fichas: en $3 - (-4)$ no hay fichas $-$ que quitar, así que se agregan cuatro pares cero (no cambian el valor) y se quitan las cuatro $-$: quedan siete $+$. Igual, $-2 - 5 = -7$.',
        { hint: 'Restar es quitar. Si en la mesa no hay fichas del signo que hay que quitar, agrega pares cero: un par + y − vale 0, así que no cambia nada.' }),
      n11[2],
      play('flecha-resta', 'Pon la flecha del cambio: de antes a después', { min: -9, max: 9, rounds: [
        { text: 'La temperatura pasa de −3 °C a 5 °C', from: -3, to: 5 }, { text: 'Un dron baja de 4 m a 6 m bajo el agua', from: 4, to: -6 },
        { text: 'Un buzo sube de −8 m a −2 m', from: -8, to: -2 }, { text: 'La temperatura baja de 7 °C a 0 °C', from: 7, to: 0 },
      ] }, 'El cambio es después menos antes, y la flecha lo dibuja: $5 - (-3) = 8$ (sube 8 grados), $-6 - 4 = -10$ (el dron baja 10 metros), $-2 - (-8) = 6$ (el buzo sube 6 metros) y $0 - 7 = -7$.',
        { hint: 'La cola de la flecha va en el valor de antes y la punta en el de después. Si la flecha va hacia la izquierda, el cambio es negativo.' }),
      n11[3]]);

    const n11b = ['pizzeria', 'candado-fraccion', 'pon-la-rayita', 'carrera-fracciones'].map(g => keep('alg-11b', g));
    setLesson('alg-11b', [n11b[0], n11b[1],
      play('tableta-fraccion', 'Corta la tableta y toma la fracción que pide cada ronda', { rounds: [
        { total: 24, cols: 6, num: 3, den: 4, what: 'galletas' }, { total: 30, cols: 6, num: 2, den: 5, what: 'galletas' },
        { total: 42, cols: 7, num: 5, den: 6, what: 'galletas' }, { total: 20, cols: 5, num: 3, den: 10, what: 'galletas' },
      ] }, 'La fracción de una cantidad se reparte en tantas partes iguales como dice el denominador y se toman las del numerador. $\\tfrac34$ de 24: cuatro partes de 6, se toman tres, $18$. $\\tfrac25$ de 30 es $12$; $\\tfrac56$ de 42, $35$; y $\\tfrac{3}{10}$ de 20, $6$.',
        { hint: 'El número de abajo dice en cuántas partes iguales cortar; el de arriba, cuántas de esas partes tomar.' }),
      play('agrupa-fraccion', 'Simplifica agrupando las partes de la barra', { rounds: [
        { num: 6, den: 8 }, { num: 9, den: 12 }, { num: 10, den: 15 }, { num: 12, den: 18 },
      ] }, 'Simplificar es juntar las partes en grupos iguales sin cortar ninguno: el grupo tiene que repartir justo las partes pintadas y las de toda la barra. El grupo más grande que sirve es el máximo común divisor: $\\tfrac68 = \\tfrac34$ (de a 2), $\\tfrac{9}{12} = \\tfrac34$ (de a 3), $\\tfrac{10}{15} = \\tfrac23$ (de a 5) y $\\tfrac{12}{18} = \\tfrac23$ (de a 6).',
        { hint: 'Un grupo sirve si cabe un número exacto de veces en las partes pintadas y también en toda la barra. Prueba grupos cada vez más grandes.' }),
      play('corta-igual', 'Recorta las barras en pedacitos del mismo tamaño para poder operar', { rounds: [
        { a: [1, 4], b: [2, 3] }, { a: [5, 6], b: [1, 4] }, { a: [3, 5], b: [1, 2], op: '-' }, { a: [7, 8], b: [1, 6], op: '-' },
      ] }, 'Solo se suman o restan pedazos del mismo tamaño: por eso se busca un denominador común. $\\tfrac14 + \\tfrac23 = \\tfrac{3}{12} + \\tfrac{8}{12} = \\tfrac{11}{12}$, $\\tfrac56 + \\tfrac14 = \\tfrac{13}{12}$, $\\tfrac35 - \\tfrac12 = \\tfrac{1}{10}$ y $\\tfrac78 - \\tfrac16 = \\tfrac{17}{24}$.',
        { hint: 'Busca un número de pedacitos que se pueda repartir en los cortes de la primera barra y también en los de la segunda: un múltiplo de los dos denominadores.' }),
      n11b[2], n11b[3]]);

    const n11c = ['cajas-numericas', 'lupa-densidad', 'ubica-en-recta', 'compas-raiz', 'acorrala-raiz', 'frena-aguja'].map(g => keep('alg-11c', g));
    setLesson('alg-11c', [n11c[0], n11c[1], n11c[2], n11c[3],
      play('espiral-teodoro', 'Arma la espiral de las raíces', { rounds: [{ n: 5 }, { n: 3 }, { n: 7 }, { n: 10 }] },
        'Cada triángulo tiene un cateto de 1 y otro igual a la hipotenusa anterior. Por Pitágoras, si la anterior mide $\\sqrt{k}$, la nueva mide $\\sqrt{k + 1}$: con 4 triángulos se llega a $\\sqrt5 \\approx 2.236$, con 2 a $\\sqrt3$, con 6 a $\\sqrt7$ y con 9 a $\\sqrt{10}$. En la recta quedan entre dos enteros: no son fracciones.',
        { hint: 'Mira la hipotenusa que tienes y cuánto aumenta lo de adentro de la raíz con cada triángulo nuevo.' }),
      n11c[4], n11c[5]]);

    const n12b = ['corta-rectangulo', 'inversos-gemelos'].map(g => keep('alg-12b', g));
    setLesson('alg-12b', [n12b[0],
      play('agrupa-amigos', 'Reagrupa la suma en parejas redondas', { rounds: [
        { nums: [17, 38, 83, 62], unit: 100 }, { nums: [26, 45, 74, 55], unit: 100 }, { nums: [8, 13, 92, 87], unit: 100 }, { nums: [36, 19, 64, 81], unit: 100 },
      ] }, 'Por la conmutativa y la asociativa se puede sumar en cualquier orden y agrupar como se quiera. $(17 + 83) + (38 + 62) = 100 + 100 = 200$; $(26 + 74) + (45 + 55) = 200$; $(8 + 92) + (13 + 87) = 200$ y $(36 + 64) + (19 + 81) = 200$.',
        { hint: 'Mira las unidades: busca parejas cuyas unidades sumen 10, y luego revisa si las decenas completan la centena.' }),
      play('multiplica-primero', 'Multiplica primero la pareja que da una cifra redonda', { rounds: [
        { nums: [25, 13, 4] }, { nums: [2, 37, 5] }, { nums: [17, 20, 5] }, { nums: [125, 3, 8] },
      ] }, 'En un producto el orden y los paréntesis tampoco cambian el resultado: $(25 \\cdot 4) \\cdot 13 = 1300$, $(2 \\cdot 5) \\cdot 37 = 370$, $17 \\cdot (20 \\cdot 5) = 1700$ y $(125 \\cdot 8) \\cdot 3 = 3000$. Elegir bien la primera pareja vuelve la cuenta fácil.',
        { hint: 'Busca dos factores que juntos den 10, 100 o 1000: 2 y 5, 4 y 25, 8 y 125.' }),
      n12b[1],
      play('une-rectangulos', 'Factor común: junta los rectángulos que comparten el alto', { rounds: [
        { base: [6, 7], others: [[6, 3], [4, 3]] }, { base: [4, 9], others: [[3, 9], [4, 6]] },
        { base: [5, 8], others: [[5, 2], [8, 5]] }, { base: [7, 4], others: [[7, 3], [2, 4], [7, 3]] },
      ] }, 'La distributiva leída al revés: si dos productos comparten un factor, sus rectángulos tienen el mismo alto y se pegan en uno solo. $6 \\cdot 7 + 6 \\cdot 3 = 6 \\cdot 10 = 60$; $4 \\cdot 9 + 4 \\cdot 6 = 4 \\cdot 15$; $5 \\cdot 8 + 5 \\cdot 2 = 5 \\cdot 10$; $7 \\cdot 4 + 7 \\cdot 3 + 7 \\cdot 3 = 7 \\cdot 10$. Un $8 \\cdot 5$ tiene alto 8: no comparte el 5 como alto.',
        { hint: 'Fíjate solo en el alto de cada rectángulo, el primer número: tiene que ser igual al de la base.' }),
      play('deshaz-camino', 'Regresa al número de partida deshaciendo los pasos', { rounds: [
        { x: 2, ops: [['×', 4], ['+', 3]], cards: [['+', -3], ['×', 0.25], ['+', 3], ['×', 4], ['×', -0.25]] },
        { x: -5, ops: [['+', 6], ['×', -2]], cards: [['×', -0.5], ['+', -6], ['×', 2], ['+', 6], ['×', 0.5]] },
        { x: 3, ops: [['×', 1 / 3], ['+', 4]], cards: [['+', -4], ['×', 3], ['+', 4], ['×', 1 / 3], ['×', -3]] },
      ] }, 'Sumar el opuesto deshace una suma y multiplicar por el recíproco deshace un producto, porque llevan al neutro: $a + (-a) = 0$ y $a \\cdot \\tfrac1a = 1$. Y se deshace al revés: lo último que se hizo es lo primero que se quita. $2 \\to 8 \\to 11$, y de regreso $11 - 3 = 8$, $8 \\cdot \\tfrac14 = 2$.',
        { hint: 'Empieza por la última puerta de la ida. ¿Qué número la deshace: el opuesto o el recíproco?' }),
      play('vagon-inverso', 'Inversos: lleva el vagón al 0 y la liga al largo 1', { rounds: [
        { title: 'Opuestos', items: [{ kind: '+', a: 5 }, { kind: '+', a: -3 }, { kind: '+', a: -6 }] },
        { title: 'Recíprocos', items: [{ kind: '×', a: [3, 1] }, { kind: '×', a: [2, 3] }, { kind: '×', a: [1, 4] }] },
      ] }, 'El opuesto lleva al neutro de la suma: $5 + (-5) = 0$. El recíproco lleva al neutro del producto: $3 \\cdot \\tfrac13 = 1$, $\\tfrac23 \\cdot \\tfrac32 = 1$ y $\\tfrac14 \\cdot 4 = 1$. El 0 no tendría recíproco: ninguna liga de largo 0 se estira hasta 1.',
        { hint: 'Para el vagón, suma lo mismo que está lejos del 0 pero hacia el otro lado. Para la liga, voltea la fracción.' })]);

    const n12c = ['arma-producto', 'cancela-balanza'].map(g => keep('alg-12c', g));
    setLesson('alg-12c', [n12c[0],
      play('resta-opuesto', 'Resta sumando el opuesto, con flechas', { min: -12, max: 12, rounds: [
        { a: 5, b: 8 }, { a: -3, b: -6 }, { a: 2, b: -4 }, { a: -1, b: 5 },
      ] }, 'Restar $b$ es sumar su opuesto: $a - b = a + (-b)$. Se voltea la flecha de $b$ y se pega a la de $a$: $5 - 8 = 5 + (-8) = -3$; $-3 - (-6) = -3 + 6 = 3$; $2 - (-4) = 6$; $-1 - 5 = -6$.',
        { hint: 'Primero voltea la flecha de abajo: el opuesto apunta al otro lado. Después pega su cola en la punta de la flecha de arriba.' }),
      play('voltea-flecha', 'Estira y voltea la flecha hasta el aro', { rounds: [
        { a: 3, target: -9 }, { a: -2, target: 8 }, { a: -6, target: -12 }, { a: 4, target: -16 },
      ] }, 'El multiplicador repite la flecha y, si es negativo, la refleja en el 0: $3 \\cdot (-3) = -9$, $(-2)(-4) = 8$, $(-6) \\cdot 2 = -12$ y $4 \\cdot (-4) = -16$. Dos negativos dan positivo porque voltear dos veces deja la flecha como estaba.',
        { hint: 'Decide cuántas copias de la flecha caben hasta el aro y mira de qué lado del 0 está el aro: así sabes si hay que voltear.' }),
      play('parte-flecha', 'Divide partiendo la flecha y volteando si hace falta', { min: -18, max: 18, rounds: [
        { a: -12, b: 3 }, { a: 15, b: -5 }, { a: -18, b: -6 }, { a: 7, b: 2 },
      ] }, 'Dividir es multiplicar por el recíproco: $a \\div b = a \\cdot \\tfrac1b$. Partir en 3 es tomar $\\tfrac13$: $(-12) \\div 3 = -4$. Si el divisor es negativo se voltea además: $15 \\div (-5) = -3$ y $(-18) \\div (-6) = 3$. Y $7 \\div 2 = 3.5$.',
        { hint: 'El número de pedazos es el valor del divisor sin signo. El signo del divisor dice si hay que voltear el pedazo.' }),
      n12c[1],
      play('capas-operacion', 'Resuelve capa por capa, cuidando los signos', { rounds: [
        { title: 'Con signos', items: [{ expr: '-3 * ( 4 - 6 ) + 5' }, { expr: '12 / -4 - 2 * -3' }, { expr: '-8 - ( 2 - 7 ) * 2' }] },
      ] }, 'Primero los paréntesis, luego × y ÷ de izquierda a derecha, y al final + y −, con la ley de los signos en cada paso: $-3(4 - 6) + 5 = -3(-2) + 5 = 11$; $12 \\div (-4) - 2(-3) = -3 + 6 = 3$; $-8 - (-5) \\cdot 2 = -8 + 10 = 2$.',
        { hint: 'Antes de operar dos números, mira sus signos: dos iguales dan positivo y dos distintos, negativo.' }),
      play('rebote-signos', 'Saltos con signo: cada salto multiplica por un negativo', { rounds: [
        { title: 'Saltos con signo', items: [{ f: -2, n: 2, target: 12 }, { f: -2, n: 3, target: 24 }, { f: -3, n: 2, target: -18 }] },
        { title: 'Pares e impares', items: [{ f: -1, n: 5, target: 4 }, { f: -2, n: 1, target: -10 }, { f: -2, n: 4, target: -16 }] },
      ] }, 'Cada salto multiplica por un negativo y cambia de lado del 0. Con un número par de saltos el signo vuelve a ser el del comienzo; con un número impar, cambia: $3 \\cdot (-2)^2 = 12$, $-3 \\cdot (-2)^3 = 24$, $-2 \\cdot (-3)^2 = -18$, $-4 \\cdot (-1)^5 = 4$.',
        { hint: 'Calcula primero cuánto multiplican todos los saltos juntos y con qué signo; después busca de dónde hay que salir.' })]);

    const n12d = ['tren-ordenado', 'dobla-la-recta', 'distancia-justa', 'dibuja-intervalo', 'serpiente-orden'].map(g => keep('alg-12d', g));
    setLesson('alg-12d', [n12d[0], n12d[1],
      play('espejo-desigualdad', 'Mira qué le pasa al orden al sumar o multiplicar', { rounds: [
        { op: '×', a: 2, b: 5, target: -6 }, { op: '+', a: -3, b: 1, target: 2 }, { op: '×', a: -4, b: 2, target: 2 }, { op: '×', a: 1, b: 3, target: 2 },
      ] }, 'Sumar el mismo número corre los dos puntos igual: el orden se conserva ($-3 < 1 \\Rightarrow 2 < 6$). Multiplicar por un positivo también lo conserva ($1 < 3 \\Rightarrow 2 < 6$). Multiplicar por un negativo refleja la recta en el 0 y el orden **se voltea**: $2 < 5 \\Rightarrow -6 > -15$ y $-4 < 2 \\Rightarrow 2 > -1$.',
        { hint: 'Busca el número que lleva a a la bandera. Luego compara: ¿b quedó a la derecha o a la izquierda de a?' }),
      n12d[2], n12d[3],
      play('correa-del-perro', 'Pon el poste, la correa y la zona de cada desigualdad', { min: -8, max: 8, rounds: [
        { txt: '|x − 3| > 2', c: 3, r: 2, out: true, closed: false }, { txt: '|x + 2| ≥ 4', c: -2, r: 4, out: true, closed: true }, { txt: '|x| < 5', c: 0, r: 5, out: false, closed: false },
      ] }, '$|x - c|$ es la distancia de $x$ al poste $c$. «Menor que» es lo que alcanza la correa; «mayor que» es lo que queda fuera de su alcance, a los dos lados. $|x - 3| > 2$: $x < 1$ o $x > 5$. $|x + 2| \\ge 4$: $x \\le -6$ o $x \\ge 2$ (el poste está en $-2$). $|x| < 5$: $-5 < x < 5$.',
        { hint: 'Escribe la desigualdad como distancia: |x + 2| es la distancia de x a −2. Luego decide si la zona es adentro o afuera del alcance.' }),
      n12d[4]]);

    setExam('numeros', [
      ['alg-11', 'Restar es quitar fichas; si no hay de las que hay que quitar, se agregan pares cero.',
        play('pares-cero', 'Calcula con fichas', { rounds: [{ op: '-', a: -1, b: -3 }, { op: '+', a: 4, b: -7 }] }, '$-1 - (-3) = 2$ y $4 + (-7) = -3$.', { hint: 'Un par + y − vale cero.' })],
      ['alg-11', 'El cambio es después menos antes, con su signo.',
        play('flecha-resta', 'Pon la flecha del cambio', { min: -9, max: 9, rounds: [{ text: 'La temperatura sube de −6 °C a −1 °C', from: -6, to: -1 }] }, '$-1 - (-6) = 5$.', { hint: 'Cola en el antes, punta en el después.' })],
      ['alg-11b', 'Simplificar es agrupar partes sin cortar ninguna: el grupo más grande es el máximo común divisor.',
        play('agrupa-fraccion', 'Simplifica agrupando', { rounds: [{ num: 8, den: 12 }] }, '$\\tfrac{8}{12} = \\tfrac23$, de a 4.', { hint: 'Prueba grupos cada vez más grandes.' })],
      ['alg-11b', 'Para sumar fracciones hace falta un denominador común.',
        play('corta-igual', 'Recorta en pedacitos iguales', { rounds: [{ a: [2, 5], b: [1, 3] }] }, '$\\tfrac25 + \\tfrac13 = \\tfrac{6}{15} + \\tfrac{5}{15} = \\tfrac{11}{15}$.', { hint: 'Busca un múltiplo de los dos denominadores.' })],
      ['alg-11c', 'Cada triángulo de la espiral suma uno bajo la raíz: $\\sqrt{k} \\to \\sqrt{k + 1}$.',
        play('espiral-teodoro', 'Arma la espiral', { rounds: [{ n: 6 }] }, 'Con 5 triángulos se llega a $\\sqrt6 \\approx 2.449$.', { hint: 'Cuenta los triángulos desde $\\sqrt2$.' })],
      ['alg-11c', 'La diagonal de un rectángulo de lados a y b mide $\\sqrt{a^2 + b^2}$.',
        play('compas-raiz', 'Elige los lados del rectángulo para que el compás caiga en la banderita', { rounds: [{ n: 13 }], max: 4 }, '$2^2 + 3^2 = 13$: la diagonal mide $\\sqrt{13}$.', { hint: 'Busca dos cuadrados que sumen 13.' })],
      ['alg-12b', 'El opuesto deshace una suma y el recíproco un producto; se deshace en orden contrario.',
        play('deshaz-camino', 'Regresa al número de partida', { rounds: [{ x: 4, ops: [['+', -7], ['×', 2]], cards: [['×', 0.5], ['+', 7], ['×', 2], ['+', -7]] }] }, '$4 \\to -3 \\to -6$; de regreso $-6 \\cdot \\tfrac12 = -3$ y $-3 + 7 = 4$.', { hint: 'Empieza por la última puerta.' })],
      ['alg-12b', 'La conmutativa y la asociativa permiten sumar en el orden más cómodo.',
        play('agrupa-amigos', 'Suma en parejas redondas', { rounds: [{ nums: [47, 29, 53, 71], unit: 100 }] }, '$(47 + 53) + (29 + 71) = 200$.', { hint: 'Mira las unidades.' })],
      ['alg-12c', 'Restar es sumar el opuesto.',
        play('resta-opuesto', 'Resta sumando el opuesto', { min: -12, max: 12, rounds: [{ a: -4, b: 3 }] }, '$-4 - 3 = -4 + (-3) = -7$.', { hint: 'Voltea y pega.' })],
      ['alg-12c', 'Dividir es multiplicar por el recíproco; el signo sigue la ley de los signos.',
        play('parte-flecha', 'Divide partiendo la flecha', { min: -18, max: 18, rounds: [{ a: -15, b: -3 }] }, '$(-15) \\div (-3) = 5$.', { hint: 'Tres pedazos y voltear.' })],
      ['alg-12d', 'Multiplicar por un negativo voltea el orden.',
        play('espejo-desigualdad', 'Mira qué le pasa al orden', { rounds: [{ op: '×', a: -3, b: 1, target: 6 }] }, 'Por $-2$: $-3 < 1 \\Rightarrow 6 > -2$.', { hint: 'Busca el factor que lleva a a la bandera.' })],
      ['alg-12d', '$|x - c| > r$ son los puntos a más de r del poste c, a los dos lados.',
        play('correa-del-perro', 'Pon el poste, la correa y la zona', { min: -8, max: 8, rounds: [{ txt: '|x + 1| > 3', c: -1, r: 3, out: true, closed: false }] }, '$x < -4$ o $x > 2$.', { hint: 'El poste está en −1.' })],
    ]);
  }
  // ───────── Mundo 3 · Escalas y Proporciones ─────────
  {
    const r12 = ['limonada', 'estira-foto'].map(g => keep('alg-12', g));
    setLesson('alg-12', [r12[0],
      play('barra-razon', 'Parte la cinta en la razón pedida', { rounds: [
        { T: 35, p: 2, q: 5, A: 'jugo', B: 'agua' }, { T: 24, p: 5, q: 3, A: 'rojas', B: 'azules' },
        { T: 36, p: 4, q: 5, A: 'niños', B: 'adultos' }, { T: 30, p: 1, q: 4, A: 'vinagre', B: 'aceite' },
      ] }, 'En $p : q$ el todo tiene $p + q$ partes iguales. En 35 con $2 : 5$ hay 7 partes de 5: quedan $10$ y $25$. Con $5 : 3$ en 24, 8 partes de 3: $15$ y $9$. Con $4 : 5$ en 36, partes de 4: $16$ y $20$. Con $1 : 4$ en 30, partes de 6: $6$ y $24$.',
        { hint: 'Suma los dos números de la razón: así sabes en cuántas partes iguales se reparte la cinta. Luego mira cuánto vale cada parte.' }),
      r12[1],
      play('rejilla-razon', 'Pinta las baldosas en la razón pedida', { rounds: [
        { rows: 3, cols: 5, p: 2, q: 3 }, { rows: 4, cols: 6, p: 1, q: 2 }, { rows: 3, cols: 6, p: 5, q: 1 }, { rows: 4, cols: 5, p: 3, q: 7 },
      ] }, 'Razones equivalentes: multiplicar los dos términos por el mismo número no cambia la razón. En 15 baldosas $2 : 3$ es $6 : 9$; en 24, $1 : 2$ es $8 : 16$; en 18, $5 : 1$ es $15 : 3$; en 20, $3 : 7$ es $6 : 14$.',
        { hint: 'El total de baldosas tiene que repartirse en p + q partes iguales: pinta p de esas partes.' }),
      play('receta-escala', 'Agranda o achica la receta', { rounds: [
        { base: 4, items: [['harina', 300, 'g'], ['leche', 200, 'mL'], ['azúcar', 80, 'g']], goal: [0, 450] },
        { base: 6, items: [['arroz', 450, 'g'], ['agua', 900, 'mL']], goal: [1, 300] },
        { base: 2, items: [['avena', 60, 'g'], ['leche', 250, 'mL']], goal: [1, 1250] },
      ] }, 'La razón entre ingredientes y porciones se conserva: si la harina pasa de 300 g a 450 g, se multiplicó por $\\tfrac32$, y las porciones también: $4 \\cdot \\tfrac32 = 6$. Con 300 mL de agua en lugar de 900 se divide entre 3: $2$ porciones. Y $1250$ mL de leche son 5 veces 250: $10$ porciones.',
        { hint: 'Compara la cantidad pedida con la de la receta: ¿por cuánto se multiplicó? Multiplica por lo mismo las porciones.' }),
      play('bici-cambios', 'Elige el piñón para llegar a la bandera', { rounds: [
        { title: 'Cambios', items: [{ front: 48, cogs: [16, 12, 24], turns: 3, target: 12 }, { front: 36, cogs: [12, 24, 18], turns: 4, target: 8 }, { front: 40, cogs: [10, 20, 16], turns: 2, target: 5 }] },
      ] }, 'Por cada pedalada la rueda da plato : piñón vueltas. $48 : 12 = 4$, y 3 pedaladas dan 12 vueltas. $36 : 18 = 2$, por 4 son 8. $40 : 16 = 2.5$, por 2 son 5.',
        { hint: 'Divide las vueltas de la meta entre las pedaladas: eso debe dar el plato dividido entre el piñón.' })]);

    const r12e = ['balanza-proporcion', 'sombra-arbol', 'cuadrado-media', 'duplica-magnitud', 'grafica-relacion', 'reparto'].map(g => keep('alg-12e', g));
    setLesson('alg-12e', [...r12e,
      play('llaves-tanque', 'Proporción inversa: llena el tanque a tiempo', { rounds: [
        { title: 'Más llaves, menos tiempo', items: [{ taps: 2, hours: 6, target: 3 }, { taps: 3, hours: 8, target: 6 }, { taps: 4, hours: 3, target: 2 }] },
      ] }, 'Llaves y horas son inversamente proporcionales: el producto se conserva. $2 \\cdot 6 = 12$, así que en 3 horas hacen falta $12 \\div 3 = 4$ llaves; $3 \\cdot 8 = 24$ da 4 llaves para 6 horas; $4 \\cdot 3 = 12$ da 6 llaves para 2 horas.',
        { hint: 'Multiplica las llaves por las horas del dato: ese producto se mantiene. Divide entre las horas de la meta.' })]);

    const r12f = ['arma-regla', 'bascula', 'la-obra', 'engranajes', 'resortera-tres'].map(g => keep('alg-12f', g));
    setLesson('alg-12f', [r12f[0], r12f[1], r12f[2],
      play('mapa-escala', 'Ubica el pueblo a la distancia real', { rounds: [
        { cm: 1, km: 25, real: 150 }, { cm: 2, km: 15, real: 60 }, { cm: 1, km: 40, real: 100 }, { cm: 4, km: 50, real: 75 },
      ] }, 'Es una regla de tres directa: más kilómetros, más centímetros. $150 \\div 25 = 6$ cm; $60$ km son 4 veces 15, así que $4 \\cdot 2 = 8$ cm; $100 \\div 40 = 2.5$ cm; y 75 km son $\\tfrac32$ de 50: $6$ cm.',
        { hint: 'Busca cuántos km vale un solo centímetro (reducir a la unidad) y cuántos de esos caben en la distancia real.' }),
      r12f[3], r12f[4]]);

    const r13 = ['cuadricula-cien', 'rueda-porcentaje', 'cruz-porcentaje', 'mezcla'].map(g => keep('alg-13', g));
    setLesson('alg-13', [r13[0], r13[1],
      play('pinta-personas', 'Pinta a las personas que pide cada ronda', { rounds: [
        { total: 20, pct: 45, what: 'usan gafas' }, { total: 40, pct: 15, what: 'trotan' }, { total: 25, pct: 68, what: 'leen' }, { total: 8, pct: 75, what: 'cantan' },
      ] }, 'El por ciento es de cada 100: en un grupo de 20, cada persona es el 5 %, así que el 45 % son 9. En 40, cada una es 2.5 %: el 15 % son 6. En 25, cada una es 4 %: el 68 % son 17. En 8, el 75 % son tres cuartos: 6.',
        { hint: 'Averigua qué porcentaje vale una sola persona del grupo (100 entre el total) y cuántas hacen falta.' }),
      r13[2], r13[3],
      play('tanque-porcentaje', 'Llena el tanque al porcentaje pedido', { rounds: [
        { title: 'Litros', items: [{ cap: 80, pct: 35, step: 2 }, { cap: 60, pct: 15, step: 3 }, { cap: 200, pct: 12, step: 4 }] },
        { title: 'Más finos', items: [{ cap: 50, pct: 8, step: 2 }, { cap: 120, pct: 75, step: 6 }, { cap: 40, pct: 5, step: 1 }] },
      ] }, 'El $p\\,\\%$ de una capacidad es $\\tfrac{p}{100}$ de ella: $0.35 \\cdot 80 = 28$ L, $0.15 \\cdot 60 = 9$ L, $0.12 \\cdot 200 = 24$ L, $0.08 \\cdot 50 = 4$ L, $\\tfrac34$ de 120 son 90 L y el 5 % de 40 son 2 L.',
        { hint: 'Calcula primero el 1 % o el 10 % del tanque y luego junta las veces que haga falta.' })]);

    const r13c = ['estira-barra', 'etiqueta-rebaja', 'bodegas'].map(g => keep('alg-13c', g));
    setLesson('alg-13c', [r13c[0], r13c[1],
      play('factor-cambio', 'Encuentra el factor del cambio', { rounds: [
        { from: 80, to: 92 }, { from: 120, to: 90 }, { from: 40, to: 50 }, { from: 50, to: 40 },
      ] }, 'Cambiar un $r\\,\\%$ es multiplicar por $1 \\pm \\tfrac{r}{100}$, y el porcentaje se mide sobre el valor de antes: $80 \\cdot 1.15 = 92$ (+15 %), $120 \\cdot 0.75 = 90$ (−25 %). De 40 a 50 es $\\times 1.25$ (+25 %), pero de 50 a 40 es $\\times 0.8$ (−20 %): no es simétrico.',
        { hint: 'Divide el valor de después entre el de antes: ese es el factor. Si es mayor que 1 aumentó; si es menor, bajó.' }),
      r13c[2],
      play('precio-original', 'Encuentra el precio de antes', { rounds: [
        { r: -20, now: 48, step: 5, max: 100 }, { r: -25, now: 90, step: 5, max: 160 }, { r: 15, now: 69, step: 5, max: 100 }, { r: -40, now: 27, step: 5, max: 60 },
      ] }, 'Para volver se divide entre el factor: $48 \\div 0.8 = 60$, $90 \\div 0.75 = 120$, $69 \\div 1.15 = 60$, $27 \\div 0.6 = 45$. Sumar el 20 % a 48 daría 57.6, no 60: el porcentaje se calculó sobre el precio de antes.',
        { hint: 'El precio de ahora es el de antes por el factor. Prueba un precio de antes y mira si al aplicar el cambio sale la etiqueta.' }),
      play('rampa-precio', 'Elige el sello para que la etiqueta llegue con su precio', { rounds: [
        { title: 'Descuentos', items: [{ from: 200, to: 170 }, { from: 80, to: 60 }, { from: 50, to: 45 }] },
        { title: 'Aumentos', items: [{ from: 120, to: 150 }, { from: 40, to: 46 }, { from: 300, to: 345 }] },
      ] }, 'El porcentaje es el cambio dividido entre el precio de arriba: de 200 a 170 bajan 30, que es el 15 % de 200; de 80 a 60, el 25 %; de 50 a 45, el 10 %. De 120 a 150 sube 30: el 25 %; de 40 a 46 y de 300 a 345, el 15 %.',
        { hint: 'Mira cuánto cambió el precio y qué parte es eso del precio de arriba.' })]);

    const r13d = ['cascada', 'rebote', 'dos-etapas'].map(g => keep('alg-13d', g));
    setLesson('alg-13d', [r13d[0], r13d[1],
      play('semanas-rebaja', 'Cambios repetidos: ¿en qué semana cruza la línea?', { rounds: [
        { r: -10, line: 50 }, { r: -20, line: 30 }, { r: 5, line: 150 }, { r: -30, line: 10 },
      ] }, 'Repetir un cambio es multiplicar otra vez por el mismo factor: $100 \\cdot 0.9^n$. $0.9^6 \\approx 0.53$ y $0.9^7 \\approx 0.48$: la semana 7. $0.8^6 \\approx 0.26$: la 6. $1.05^9 \\approx 1.55$: la 9. $0.7^7 \\approx 0.08$: la 7. No basta con multiplicar el porcentaje por las semanas.',
        { hint: 'Cada semana se multiplica por el mismo factor. Mira las barras: ¿cuál es la primera que cruza la línea?' }),
      r13d[2],
      play('sube-y-baja', 'Sube y baja el mismo porcentaje', { rounds: [{ end: 91 }, { end: 84 }, { end: 96 }, { end: 75 }] },
        'Subir $x$ y bajar $x$ multiplica por $(1 + x)(1 - x) = 1 - x^2$: siempre queda por debajo. Con 30 % queda $100(1 - 0.09) = 91$; con 40 %, 84; con 20 %, 96; con 50 %, 75.',
        { hint: 'Después de subir, el porcentaje de bajada se calcula sobre un precio más grande. Mira cuánto se pierde con cada porcentaje.' }),
      play('rompe-cambios', 'Mueve la paleta y manda la pelota al ladrillo del resultado', { rounds: [
        { title: 'Dos cambios', items: [
          { ask: '100 → −20 % → −10 %', options: ['72', '70', '80'], answer: 0 },
          { ask: '200 → +10 % → +10 %', options: ['240', '220', '242'], answer: 2 },
          { ask: '50 → −50 % → +50 %', options: ['50', '37.5', '25'], answer: 1 }] },
      ] }, 'Los cambios seguidos se multiplican: $100 \\cdot 0.8 \\cdot 0.9 = 72$; $200 \\cdot 1.1 \\cdot 1.1 = 242$; $50 \\cdot 0.5 \\cdot 1.5 = 37.5$. Sumar los porcentajes daría otra cosa.',
        { hint: 'Aplica el primer cambio, y el segundo sobre lo que resultó.' })]);

    setExam('razones', [
      ['alg-12', 'En $p : q$ el todo tiene $p + q$ partes iguales.',
        play('barra-razon', 'Parte la cinta', { rounds: [{ T: 28, p: 3, q: 4, A: 'té', B: 'leche' }] }, '$12$ de té y $16$ de leche.', { hint: 'Siete partes de 4.' })],
      ['alg-12', 'Las razones equivalentes multiplican los dos términos por lo mismo.',
        play('rejilla-razon', 'Pinta en la razón', { rounds: [{ rows: 2, cols: 6, p: 1, q: 3 }] }, '$3 : 9 = 1 : 3$.', { hint: 'Cuatro partes de 3.' })],
      ['alg-12e', 'En el reparto proporcional se suman las partes y el total se divide en esa razón.',
        play('barra-razon', 'Reparte la cinta', { rounds: [{ T: 45, p: 4, q: 5, A: 'Ana', B: 'Beto' }] }, 'Nueve partes de 5: 20 y 25.', { hint: 'Suma 4 + 5.' })],
      ['alg-12e', 'En una proporción directa el cociente se conserva.',
        play('receta-escala', 'Ajusta la receta', { rounds: [{ base: 3, items: [['tomate', 6, 'u'], ['cebolla', 2, 'u']], goal: [0, 14] }] }, 'Dos tomates por porción: 7 porciones.', { hint: 'Reduce a una porción.' })],
      ['alg-12f', 'Con una escala se arma una regla de tres directa.',
        play('mapa-escala', 'Ubica el pueblo', { rounds: [{ cm: 1, km: 30, real: 105 }, { cm: 3, km: 20, real: 50 }] }, '$105 \\div 30 = 3.5$ cm y $50 \\cdot 3 \\div 20 = 7.5$ cm.', { hint: 'Reduce a la unidad.' })],
      ['alg-12f', 'En la proporción inversa lo que se conserva es el producto.',
        play('la-obra', 'Deja en la obra los obreros justos', { workers: 6, days: 20, askDays: 15, max: 12 }, '$6 \\cdot 20 = 120$ jornadas: en 15 días hacen falta 8 obreros.', { hint: 'Obreros × días se mantiene.' })],
      ['alg-13', 'El $p\\,\\%$ es $p$ de cada 100.',
        play('pinta-personas', 'Pinta a las personas', { rounds: [{ total: 20, pct: 65, what: 'votaron' }] }, 'Cada persona es el 5 %: 13.', { hint: '100 entre 20.' })],
      ['alg-13', 'Un porcentaje es una razón parte : todo con el todo en 100.',
        play('cuadricula-cien', 'Pinta en la cuadrícula el porcentaje', { rounds: [{ ask: '3 de cada 4', count: 75 }] }, '$\\tfrac34 = \\tfrac{75}{100}$.', { hint: 'Lleva el denominador a 100.' })],
      ['alg-13c', 'Un cambio porcentual es un factor sobre el valor de antes.',
        play('factor-cambio', 'Encuentra el factor', { rounds: [{ from: 60, to: 45 }] }, '$\\times 0.75$: −25 %.', { hint: 'Divide después entre antes.' })],
      ['alg-13c', 'Para recuperar el precio de antes se divide entre el factor.',
        play('precio-original', 'Encuentra el precio de antes', { rounds: [{ r: -30, now: 56, step: 5, max: 120 }] }, '$56 \\div 0.7 = 80$.', { hint: 'Prueba precios y aplica el cambio.' })],
      ['alg-13d', 'Un cambio repetido es una potencia del factor.',
        play('semanas-rebaja', '¿En qué semana cruza la línea?', { rounds: [{ r: -15, line: 50 }] }, '$0.85^4 \\approx 0.52$ y $0.85^5 \\approx 0.44$: la semana 5.', { hint: 'Mira las barras.' })],
      ['alg-13d', 'Subir y bajar el mismo porcentaje deja el precio por debajo: $(1 + x)(1 - x) = 1 - x^2$.',
        play('sube-y-baja', 'Sube y baja el mismo porcentaje', { rounds: [{ end: 99 }] }, 'Con 10 %: $100 \\cdot 0.99 = 99$.', { hint: '$1 - x^2$.' })],
    ]);
  }
  // ───────── Mundo 4 · Exponentes y Radicales ─────────
  {
    const p21a = ['arbol-potencia', 'torre-producto', 'pares-negativos', 'torre-pisos'].map(g => keep('alg-21a', g));
    setLesson('alg-21a', [p21a[0], p21a[1],
      play('escalera-potencias', 'Sube y baja por la escalera de potencias', { rounds: [
        { base: 2, num: 1, den: 8 }, { base: 5, num: 1, den: 1 }, { base: 10, num: 1, den: 100 }, { base: 4, num: 64, den: 1 },
      ] }, 'Bajar un escalón es dividir entre la base. Por eso $5^0 = 5 \\div 5 = 1$ (no 0), y por debajo del cero salen fracciones: $2^{-3} = \\tfrac18$ y $10^{-2} = \\tfrac{1}{100}$. Y $4^3 = 64$.',
        { hint: 'Desde $b^1 = b$, cada escalón hacia abajo divide entre la base y cada uno hacia arriba multiplica.' }),
      p21a[2],
      play('cubo-bloques', 'Arma el cubo con los bloques pedidos', { rounds: [{ vol: 27 }, { vol: 64 }, { vol: 8 }, { vol: 125 }] },
        'El cubo de un número es el volumen de un cubo de esa arista: $3^3 = 27$, $4^3 = 64$, $2^3 = 8$ y $5^3 = 125$. Al doblar la arista el volumen se multiplica por 8.',
        { hint: 'Multiplica la arista por sí misma tres veces: largo por ancho por alto.' }),
      p21a[3]]);

    const p21b = ['cuenta-factores', 'cambia-de-piso', 'salta-la-coma'].map(g => keep('alg-21b', g));
    setLesson('alg-21b', [p21b[0],
      play('cancela-pisos', 'Divide potencias cancelando por parejas', { rounds: [
        { a: 7, b: 3, v: 'x' }, { a: 2, b: 5, v: 'y' }, { a: 4, b: 4, v: 'a' }, { a: 6, b: 1, v: 'm' },
      ] }, 'Cada pareja $\\tfrac{x}{x}$ vale 1, así que se restan los exponentes: $\\tfrac{x^7}{x^3} = x^4$. Si abajo hay más, sobran abajo: $\\tfrac{y^2}{y^5} = \\tfrac{1}{y^3} = y^{-3}$. Con los mismos, todo se cancela: $\\tfrac{a^4}{a^4} = a^0 = 1$.',
        { hint: 'Cancela de a una pareja: una de arriba con una de abajo. Al final cuenta cuántas quedan y dónde.' }),
      p21b[1],
      play('copias-potencia', 'Potencia de una potencia: copia la caja', { rounds: [
        { a: 3, total: 12, v: 'x' }, { a: 2, total: 10, v: 'y' }, { a: 4, total: 8, v: 'a' }, { a: 5, total: 15, v: 'b' },
      ] }, 'Elevar $x^a$ a la $b$ es poner $b$ copias de la caja, y cada caja trae $a$ factores: $(x^a)^b = x^{ab}$. $(x^3)^4 = x^{12}$, $(y^2)^5 = y^{10}$, $(a^4)^2 = a^8$, $(b^5)^3 = b^{15}$.',
        { hint: 'Cada copia trae los mismos factores. ¿Cuántas cajas iguales hacen falta para juntar todos los pedidos?' }),
      p21b[2],
      play('escala-leyes', 'Lleva al escalador a la bandera usando **todas** las tarjetas: el orden importa', { rounds: [
        { title: 'Dos tarjetas', items: [{ start: 2, cards: [{ op: 'mul', k: 1 }, { op: 'pow', k: 3 }], target: 7 }, { start: 3, cards: [{ op: 'pow', k: 2 }, { op: 'div', k: 1 }], target: 4 }] },
        { title: 'Tres tarjetas', items: [{ start: 2, cards: [{ op: 'pow', k: 2 }, { op: 'div', k: 4 }, { op: 'mul', k: 3 }], target: 6 }, { start: 1, cards: [{ op: 'div', k: 5 }, { op: 'mul', k: 2 }, { op: 'pow', k: 3 }], target: 4 }] },
      ] }, 'Multiplicar por $x^k$ suma $k$ al exponente, dividir lo resta y elevar a la $k$ lo multiplica. Como elevar multiplica todo lo que se lleva, el orden cambia el resultado: desde $x^2$, primero $(\\;)^3$ y luego $\\cdot x$ deja $x^7$; al revés daría $x^9$.',
        { hint: 'Fíjate cuándo te conviene elevar: multiplica todo lo que llevas hasta ese momento.' })]);

    const p22a = ['lado-del-cuadrado', 'reparte-factores', 'siembra-raices'].map(g => keep('alg-22a', g));
    setLesson('alg-22a', [p22a[0], p22a[1],
      play('fraccion-exponente', 'El exponente fraccionario: raíz y potencia', { rounds: [
        { a: 27, target: 9 }, { a: 16, target: 8 }, { a: 64, target: 16 }, { a: 81, target: 27 },
      ] }, 'En $a^{m/n}$ el denominador es el índice de la raíz y el numerador la potencia: $27^{2/3} = (\\sqrt[3]{27})^2 = 3^2 = 9$, $16^{3/4} = 2^3 = 8$, $64^{2/3} = 4^2 = 16$ y $81^{3/4} = 3^3 = 27$.',
        { hint: 'Busca primero una raíz que deje un número entero pequeño; después mira a qué potencia hay que elevarlo.' }),
      play('absoluto-raiz', 'La raíz de un cuadrado es el valor absoluto', { rounds: [
        { kind: 'eq', v: 4, neg: true }, { kind: 'neq' }, { kind: 'eq', v: 3, neg: false }, { kind: 'eq', v: 6, neg: true },
      ] }, 'Al elevar al cuadrado se pierde el signo y la raíz devuelve el positivo: $\\sqrt{(-4)^2} = \\sqrt{16} = 4 = |-4|$. Por eso $\\sqrt{x^2} = |x|$, que es distinto de $x$ cuando $x$ es negativo.',
        { hint: 'Prueba con un número negativo: ¿qué queda después de elevarlo al cuadrado y sacarle raíz?' }),
      play('suma-raices', 'La raíz no se reparte en una suma', { rounds: [{ a: 9, b: 16 }, { a: 36, b: 64 }, { a: 1, b: 3 }, { a: 4, b: 5 }] },
        'El cuadrado nuevo tiene el área de los dos: $\\sqrt{9 + 16} = \\sqrt{25} = 5$, pero $\\sqrt9 + \\sqrt{16} = 7$. Igual $\\sqrt{100} = 10 \\ne 14$, $\\sqrt4 = 2 \\ne 1 + \\sqrt3$ y $\\sqrt9 = 3 \\ne 2 + \\sqrt5$.',
        { hint: 'Suma primero las dos áreas y busca el lado de un cuadrado con esa área.' }),
      p22a[2]]);

    const p22b = ['saca-del-radical', 'parte-baldosa', 'tabla-conjugado', 'muro-radicales'].map(g => keep('alg-22b', g));
    setLesson('alg-22b', [p22b[0], p22b[1],
      play('copias-raiz', 'Mete el coeficiente al radical', { rounds: [{ k: 3, n: 5 }, { k: 2, n: 7 }, { k: 4, n: 2 }, { k: 5, n: 3 }] },
        '$k\\sqrt n$ son $k$ segmentos de $\\sqrt n$, y miden lo mismo que $\\sqrt{k^2 n}$: $3\\sqrt5 = \\sqrt{45}$, $2\\sqrt7 = \\sqrt{28}$, $4\\sqrt2 = \\sqrt{32}$ y $5\\sqrt3 = \\sqrt{75}$. Al revés, sacar del radical es encontrar ese cuadrado escondido.',
        { hint: 'Para entrar a la raíz, el coeficiente entra elevado al cuadrado.' }),
      play('racionaliza-uno', 'Racionaliza con un uno disfrazado', { rounds: [
        { k: 6, n: 3, cards: [2, 3, -3, 6] }, { k: 5, n: 2, cards: [-2, 5, 2, 3] }, { k: 10, n: 5, cards: [5, 10, -5, 2] },
      ] }, 'Multiplicar por $\\tfrac{\\sqrt n}{\\sqrt n}$ es multiplicar por 1, y abajo queda $\\sqrt n \\cdot \\sqrt n = n$: $\\tfrac{6}{\\sqrt3} = \\tfrac{6\\sqrt3}{3} = 2\\sqrt3$, $\\tfrac{5}{\\sqrt2} = \\tfrac{5\\sqrt2}{2}$, $\\tfrac{10}{\\sqrt5} = 2\\sqrt5$. Otro uno deja la raíz abajo.',
        { hint: '¿Qué hay que multiplicar por la raíz de abajo para que deje de ser raíz?' }),
      p22b[2], p22b[3]]);

    setExam('potencias', [
      ['alg-21a', 'Bajar un escalón divide entre la base: $b^0 = 1$ y $b^{-n} = \\tfrac{1}{b^n}$.',
        play('escalera-potencias', 'Busca el exponente', { rounds: [{ base: 2, num: 1, den: 4 }, { base: 10, num: 1000, den: 1 }] }, '$2^{-2} = \\tfrac14$ y $10^3 = 1000$.', { hint: 'Cuenta escalones desde $b^1$.' })],
      ['alg-21b', 'Al dividir potencias de la misma base se restan los exponentes.',
        play('cancela-pisos', 'Cancela por parejas', { rounds: [{ a: 9, b: 4, v: 'z' }] }, '$\\tfrac{z^9}{z^4} = z^5$.', { hint: 'Cada pareja vale 1.' })],
      ['alg-21b', 'Potencia de una potencia: se multiplican los exponentes.',
        play('copias-potencia', 'Copia la caja', { rounds: [{ a: 2, total: 12, v: 'x' }] }, '$(x^2)^6 = x^{12}$.', { hint: 'Cada caja trae 2 factores.' })],
      ['alg-22a', '$a^{m/n} = (\\sqrt[n]{a})^m$.',
        play('fraccion-exponente', 'Raíz y potencia', { rounds: [{ a: 125, target: 25 }] }, '$125^{2/3} = 5^2 = 25$.', { hint: 'Saca primero la raíz.' })],
      ['alg-22a', 'La raíz no se reparte en una suma.',
        play('suma-raices', 'Arma el cuadrado', { rounds: [{ a: 64, b: 36 }] }, '$\\sqrt{100} = 10 \\ne 8 + 6$.', { hint: 'Suma las áreas.' })],
      ['alg-22b', '$k\\sqrt n = \\sqrt{k^2 n}$.',
        play('copias-raiz', 'Una sola raíz', { rounds: [{ k: 3, n: 7 }] }, '$3\\sqrt7 = \\sqrt{63}$.', { hint: 'El 3 entra como 9.' })],
      ['alg-22b', 'Racionalizar es multiplicar por un uno que quita la raíz de abajo.',
        play('racionaliza-uno', 'Quita la raíz de abajo', { rounds: [{ k: 4, n: 7, cards: [7, -7, 2] }] }, '$\\tfrac{4}{\\sqrt7} = \\tfrac{4\\sqrt7}{7}$.', { hint: 'La misma raíz arriba y abajo.' })],
    ]);
  }
  // ───────── Mundo 5 · Sucesiones y Series ─────────
  {
    const s14 = ['pisa-huellas', 'escalera-aritmetica', 'cuenta-saltos', 'traza-progresion'].map(g => keep('alg-14', g));
    setLesson('alg-14', [s14[0], s14[1],
      play('goteo-tanque', 'El tanque que gotea: una progresión que baja', { rounds: [
        { a1: 60, d: -4, target: 36 }, { a1: 90, d: -8, target: 34 }, { a1: 75, d: -6, target: 9 },
      ] }, 'Con diferencia negativa la progresión baja: $a_n = a_1 + (n - 1)d$. $60 - 4(n - 1) = 36$ da $n - 1 = 6$: la medición 7. $90 - 8 \\cdot 7 = 34$: la 8. $75 - 6 \\cdot 11 = 9$: la 12.',
        { hint: 'Calcula cuánto tiene que bajar y cuántas horas tarda en bajar eso; la medición es una más que las horas.' }),
      s14[2],
      play('poste-cerca', 'Los postes de la cerca: términos y saltos', { rounds: [
        { L: 24, d: 3 }, { L: 50, d: 5 }, { L: 18, d: 2 }, { L: 36, d: 4 },
      ] }, 'Entre el primer poste y el último hay un tramo menos que postes, igual que entre $a_1$ y $a_n$ hay $n - 1$ saltos: $24 \\div 3 = 8$ tramos, 9 postes; $50 \\div 5 = 10$ tramos, 11 postes; 9 tramos, 10 postes; 9 tramos, 10 postes.',
        { hint: 'Cuenta primero los tramos que caben en la cerca; los postes son uno más, porque las dos puntas llevan poste.' }),
      s14[3]]);

    const s14b = ['dos-escaleras', 'parejas-gauss', 'suma-filas', 'encesta-suma'].map(g => keep('alg-14b', g));
    setLesson('alg-14b', [s14b[0], s14b[1],
      play('nivela-barras', 'Nivela las barras: la suma es n por el promedio', { rounds: [
        { a1: 3, d: 2, n: 6 }, { a1: 2, d: 3, n: 5 }, { a1: 5, d: 4, n: 4 }, { a1: 1, d: 1, n: 8 },
      ] }, 'En una progresión aritmética lo que sobra a un lado del promedio llena lo que falta al otro: todas las barras quedan a la altura $\\tfrac{a_1 + a_n}{2}$. Por eso $S_n = n \\cdot \\tfrac{a_1 + a_n}{2}$: $6 \\cdot 8 = 48$, $5 \\cdot 8 = 40$, $4 \\cdot 11 = 44$ y $8 \\cdot 4.5 = 36$.',
        { hint: 'La línea queda justo entre la primera y la última barra: promedia esas dos alturas.' }),
      s14b[2],
      play('alcancia-semanas', 'La alcancía: ahorra un poco más cada semana', { rounds: [
        { a1: 2, d: 1, goal: 27 }, { a1: 4, d: 4, goal: 40 }, { a1: 2, d: 2, goal: 56 }, { a1: 5, d: 2, goal: 60 },
      ] }, 'El total es la suma de la progresión: $S_n = \\tfrac{n(a_1 + a_n)}{2}$. $2 + 3 + \\cdots + 7 = 27$ en 6 semanas; $4 + 8 + 12 + 16 = 40$ en 4; $2 + 4 + \\cdots + 14 = 56$ en 7; $5 + 7 + \\cdots + 15 = 60$ en 6.',
        { hint: 'Ve sumando semana a semana, o usa n por el promedio de la primera y la última semana.' }),
      s14b[3]]);

    const s14c = ['rebota-pelota', 'rellena-medios', 'dobla-fichas'].map(g => keep('alg-14c', g));
    setLesson('alg-14c', [s14c[0],
      play('razon-terminos', 'Halla la razón con dos términos', { rounds: [
        { i: 2, ai: 3, j: 5, aj: 81 }, { i: 1, ai: 64, j: 4, aj: 8 }, { i: 3, ai: 2, j: 5, aj: 50 }, { i: 1, ai: 5, j: 3, aj: 45 },
      ] }, 'Entre $a_i$ y $a_j$ hay $j - i$ multiplicaciones por $r$: $r^{j - i} = \\tfrac{a_j}{a_i}$. $r^3 = 27$ da $r = 3$; $r^3 = \\tfrac18$ da $r = \\tfrac12$; $r^2 = 25$ da $r = 5$ (o $-5$); $r^2 = 9$ da $r = 3$ o $r = -3$: con un número par de pasos, el signo no se ve.',
        { hint: 'Divide el término de adelante entre el de atrás y cuenta cuántas veces se multiplicó.' }),
      s14c[1],
      play('carrera-crecimiento', 'Sumar o multiplicar: ¿cuándo gana la geométrica?', { rounds: [
        { a: 10, d: 5, g: 1, r: 2 }, { a: 20, d: 10, g: 2, r: 3 }, { a: 50, d: 20, g: 1, r: 3 },
      ] }, 'La aritmética suma siempre lo mismo y la geométrica multiplica: al principio la primera va adelante, pero la segunda termina pasándola. $2^6 = 64 > 40$ en el término 7; $2 \\cdot 3^3 = 54 > 50$ en el 4; $3^5 = 243 > 150$ en el 6.',
        { hint: 'Compara las dos barras puesto por puesto y busca la primera vez que la coral es más alta.' }),
      play('cultivo-celulas', 'El cultivo: ¿qué generación tiene tantas células?', { rounds: [
        { a1: 3, r: 2, target: 96 }, { a1: 1, r: 3, target: 243 }, { a1: 5, r: 4, target: 320 }, { a1: 2, r: 5, target: 250 },
      ] }, '$a_n = a_1 \\cdot r^{n - 1}$: $3 \\cdot 2^5 = 96$ (generación 6), $3^5 = 243$ (6), $5 \\cdot 4^3 = 320$ (4) y $2 \\cdot 5^3 = 250$ (4).',
        { hint: 'Divide la meta entre lo del comienzo y busca qué potencia de la razón da eso.' }),
      s14c[2]]);

    const s14d = ['resta-corrida', 'limite-serie', 'rana-zenon'].map(g => keep('alg-14d', g));
    setLesson('alg-14d', [s14d[0],
      play('torre-geometrica', 'Apila términos de una geométrica', { rounds: [
        { a: 3, r: 2, target: 45 }, { a: 1, r: 3, target: 121 }, { a: 5, r: 2, target: 155 }, { a: 2, r: 4, target: 42 },
      ] }, '$S_n = \\tfrac{a(r^n - 1)}{r - 1}$: $3 + 6 + 12 + 24 = 3(2^4 - 1) = 45$; $1 + 3 + 9 + 27 + 81 = \\tfrac{3^5 - 1}{2} = 121$; $5(2^5 - 1) = 155$; $\\tfrac{2(4^3 - 1)}{3} = 42$.',
        { hint: 'Suma de a un bloque y mira cuánto falta; o usa la fórmula con varios n.' }),
      s14d[1],
      play('cuadrado-mitades', 'Pinta un cuadrado por capas que se achican', { rounds: [
        { r: [1, 2], target: [15, 16] }, { r: [1, 3], target: [26, 27] }, { r: [1, 2], target: [63, 64] }, { r: [1, 4], target: [63, 64] },
      ] }, 'Cada capa pinta una parte de lo que falta, así que lo que falta se multiplica por $r$ en cada capa: después de $n$ capas falta $r^n$ y está pintado $1 - r^n$. $1 - (\\tfrac12)^4 = \\tfrac{15}{16}$, $1 - (\\tfrac13)^3 = \\tfrac{26}{27}$, $1 - (\\tfrac12)^6 = \\tfrac{63}{64}$ y $1 - (\\tfrac14)^3 = \\tfrac{63}{64}$. Nunca se llena: la suma infinita es 1.',
        { hint: 'Fíjate en lo que falta por pintar: ¿qué fracción queda después de cada capa?' }),
      play('ajusta-razon', 'Elige la razón de la suma infinita', { rounds: [
        { a: 6, S: 12 }, { a: 3, S: 12 }, { a: 8, S: 40 }, { a: 5, S: 4 },
      ] }, 'Con $|r| < 1$ la suma infinita es $S = \\tfrac{a}{1 - r}$: $\\tfrac{6}{1 - 0.5} = 12$, $\\tfrac{3}{0.25} = 12$, $\\tfrac{8}{0.2} = 40$ y $\\tfrac{5}{1.25} = 4$ con $r = -0.25$. Con $r = 1$ o más los puntos se escapan: diverge.',
        { hint: 'Despeja: $1 - r = \\tfrac{a}{S}$.' }),
      s14d[2]]);

    const s15 = ['arma-sigma', 'parte-sigma', 'maquina-sigma'].map(g => keep('alg-15', g));
    setLesson('alg-15', [s15[0],
      play('sigma-indices', 'Pon los límites de la sigma', { rounds: [
        { f: '2k', vals: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20], lo: 2, hi: 6 },
        { f: 'k^2', vals: [1, 4, 9, 16, 25, 36, 49, 64, 81, 100], lo: 3, hi: 7 },
        { f: '(3k - 1)', vals: [2, 5, 8, 11, 14, 17, 20, 23, 26, 29], lo: 1, hi: 5 },
        { f: '(k + 4)', vals: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14], lo: 4, hi: 9 },
      ] }, 'El índice $k$ va del límite de abajo al de arriba, y cada valor de $k$ da un término: $4 + 6 + \\cdots + 12 = \\sum_{k=2}^{6} 2k$, $9 + 16 + \\cdots + 49 = \\sum_{k=3}^{7} k^2$, $2 + 5 + 8 + 11 + 14 = \\sum_{k=1}^{5}(3k - 1)$ y $8 + \\cdots + 13 = \\sum_{k=4}^{9}(k + 4)$.',
        { hint: 'Busca en la fila qué k da el primer término de la suma y cuál da el último.' }),
      s15[1],
      play('cambia-indice', 'Corre el índice de la sigma', { rounds: [
        { lo: 1, hi: 5, add: 2 }, { lo: 0, hi: 4, add: 3 }, { lo: 2, hi: 6, add: 1 }, { lo: 1, hi: 4, add: 5 },
      ] }, 'Con $j = k + c$ los términos son los mismos y solo cambian los límites: $\\sum_{k=1}^{5}(k + 2) = \\sum_{j=3}^{7} j$, $\\sum_{k=0}^{4}(k + 3) = \\sum_{j=3}^{7} j$, $\\sum_{k=2}^{6}(k + 1) = \\sum_{j=3}^{7} j$ y $\\sum_{k=1}^{4}(k + 5) = \\sum_{j=6}^{9} j$.',
        { hint: 'El primer término de arriba tiene que quedar sobre el primero de abajo.' }),
      play('factorial-cajas', 'El factorial: ¿cuántos objetos en fila?', { rounds: [{ target: 120 }, { target: 24 }, { target: 720 }, { target: 6 }] },
        'Para la primera casilla hay $n$ opciones, para la segunda $n - 1$, y así: $n! = n(n - 1)\\cdots 1$. $5! = 120$, $4! = 24$, $6! = 720$ y $3! = 6$.',
        { hint: 'Multiplica las opciones de cada casilla: cada una tiene una menos que la anterior.' }),
      s15[2]]);

    setExam('progresiones', [
      ['alg-14', 'En una progresión aritmética del primer término al n-ésimo hay $n - 1$ saltos.',
        play('goteo-tanque', 'El tanque que gotea', { rounds: [{ a1: 40, d: -3, target: 16 }] }, '$40 - 3 \\cdot 8 = 16$: la medición 9.', { hint: 'Cuenta horas.' })],
      ['alg-14', 'Entre el primer término y el n-ésimo hay n − 1 saltos.',
        play('poste-cerca', 'Los postes de la cerca', { rounds: [{ L: 42, d: 6 }] }, '7 tramos, 8 postes.', { hint: 'Cuenta los tramos y suma uno.' })],
      ['alg-14b', 'La suma de una progresión aritmética es n por el promedio de los extremos.',
        play('nivela-barras', 'Nivela las barras', { rounds: [{ a1: 4, d: 3, n: 5 }] }, 'Promedio 10: $S = 50$.', { hint: 'Promedia la primera y la última.' })],
      ['alg-14b', '$S_n = \\tfrac{n(a_1 + a_n)}{2}$.',
        play('alcancia-semanas', 'La alcancía', { rounds: [{ a1: 3, d: 3, goal: 45 }] }, '$3 + 6 + 9 + 12 + 15 = 45$.', { hint: 'Suma semana a semana.' })],
      ['alg-14c', '$r^{j - i} = \\tfrac{a_j}{a_i}$.',
        play('razon-terminos', 'Halla la razón', { rounds: [{ i: 1, ai: 2, j: 4, aj: 54 }] }, '$r^3 = 27$: $r = 3$.', { hint: 'Divide y cuenta pasos.' })],
      ['alg-14c', '$a_n = a_1 r^{n - 1}$.',
        play('cultivo-celulas', 'El cultivo', { rounds: [{ a1: 4, r: 3, target: 324 }] }, '$4 \\cdot 3^4 = 324$: generación 5.', { hint: 'Divide entre 4.' })],
      ['alg-14d', '$S_n = \\tfrac{a(r^n - 1)}{r - 1}$.',
        play('torre-geometrica', 'Apila términos', { rounds: [{ a: 4, r: 3, target: 52 }] }, '$4 + 12 + 36 = 52$.', { hint: 'Suma bloque a bloque.' })],
      ['alg-14d', 'Con $|r| < 1$ la suma infinita es $\\tfrac{a}{1 - r}$.',
        play('ajusta-razon', 'Elige la razón', { rounds: [{ a: 9, S: 12 }] }, '$\\tfrac{9}{1 - 0.25} = 12$.', { hint: '$1 - r = a/S$.' })],
      ['alg-15', 'En Σ el índice recorre de un límite a otro.',
        play('sigma-indices', 'Pon los límites', { rounds: [{ f: '3k', vals: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30], lo: 2, hi: 5 }] }, '$6 + 9 + 12 + 15 = \\sum_{k=2}^{5} 3k$.', { hint: '¿Qué k da el 6?' })],
      ['alg-15', '$n! = n(n - 1)\\cdots 1$ cuenta las filas posibles.',
        play('factorial-cajas', 'El factorial', { rounds: [{ target: 5040 }] }, '$7! = 5040$.', { hint: 'Multiplica las opciones.' })],
    ]);
  }
  // ───────── Mundo 6 · Álgebra de Polinomios ─────────
  {
    setLesson('alg-23a', [
      play('bloques-polinomio', 'Arma y suma polinomios con bloques', { rounds: [
        { mode: 'arma', target: [1, -2, 3] }, { mode: 'arma', target: [-2, 1, -1] }, { mode: 'suma', P: [1, 2, -1], Q: [1, -3, 2] }, { mode: 'suma', P: [2, 0, 3], Q: [-1, 1, -3] },
      ] }, 'Cada término es un tipo de bloque: los cuadrados son $x^2$, las barras $x$ y los cuadritos 1; el signo menos es el color rojo. Para sumar se juntan bloques del mismo tipo y un bloque con su opuesto se anula: $(x^2 + 2x - 1) + (x^2 - 3x + 2) = 2x^2 - x + 1$.',
        { hint: 'Cuenta cuántos bloques de cada tipo pide el polinomio y de qué color. Al sumar, las barras rojas se comen las azules.' }),
      play('reduce-semejantes', 'Reduce: anula los bloques opuestos', { rounds: [
        { tiles: [[2, 0], [1, 0], [1, 1], [0, 0], [1, 0], [0, 1], [0, 1]] },
        { tiles: [[2, 0], [2, 1], [2, 0], [1, 1], [1, 1], [0, 0], [0, 0], [0, 1]] },
        { tiles: [[1, 0], [1, 0], [1, 1], [1, 1], [1, 1], [0, 1], [0, 0]] },
      ] }, 'Solo se anulan piezas iguales de signo contrario: una barra con una barra roja, un cuadrito con uno rojo. Un cuadrado y una barra no son semejantes. Quedan $x^2 + x - 1$, $x^2 - 2x + 1$ y $-x$.',
        { hint: 'Busca parejas del mismo tipo y distinto color. Lo que queda sin pareja es el resultado.' }),
      play('resta-voltea', 'Resta polinomios volteando los bloques', { rounds: [
        { P: [1, 3, 2], Q: [0, 1, 4] }, { P: [2, -1, 0], Q: [1, -2, 3] }, { P: [0, 2, 5], Q: [1, 2, -1] },
      ] }, 'Restar Q es sumar su opuesto: se voltean todos sus bloques. $(x^2 + 3x + 2) - (x + 4) = x^2 + 2x - 2$; $(2x^2 - x) - (x^2 - 2x + 3) = x^2 + x - 3$; $(2x + 5) - (x^2 + 2x - 1) = -x^2 + 6$.',
        { hint: 'Antes de llevar un bloque de Q a la mesa, pásalo por el volteador: restar es sumar el opuesto.' }),
      play('evalua-polinomio', 'Evalúa el polinomio con bloques', { rounds: [
        { c: [1, -2, 3], target: 11 }, { c: [2, 1, -1], target: 14 }, { c: [-1, 0, 10], target: 1 }, { c: [1, 3, 0], target: -2 },
      ] }, 'Evaluar es poner el número en lugar de $x$, con paréntesis: $4^2 - 2\\cdot4 + 3 = 11$ (también sirve $x = -2$). $2(-3)^2 + (-3) - 1 = 14$. $-3^2$ no es lo mismo que $-(3)^2$… y aquí $-(\\pm3)^2 + 10 = 1$. $(-1)^2 + 3(-1) = -2$.',
        { hint: 'Mueve x y mira cómo cambia cada término. El cuadrado de un negativo es positivo.' }),
      play('llena-rectangulo', 'Multiplica llenando el rectángulo', { rounds: [{ a: 2, b: 3 }, { a: 3, b: 4 }, { a: 2, b: 5 }, { a: 1, b: 3 }] },
        'Multiplicar es llenar el rectángulo de lados $(x + a)$ y $(x + b)$: un cuadrado $x^2$, $a + b$ barras y $a\\cdot b$ cuadritos. $(x + 2)(x + 3) = x^2 + 5x + 6$; $(x + 3)(x + 4) = x^2 + 7x + 12$; $(x + 2)(x + 5) = x^2 + 7x + 10$; $(x + 1)(x + 3) = x^2 + 4x + 3$.',
        { hint: 'Mira el marco: la esquina grande es x por x, las franjas son x por 1 y la esquina chica es a por b.' }),
      keep('alg-23a', 'torre-grados')]);

    setLesson('alg-3', [keep('alg-3', 'bloques-area'),
      play('parte-cuadrado', 'El cuadrado de un binomio, de cabeza', { rounds: [{ N: 23 }, { N: 41 }, { N: 58 }, { N: 72 }] },
        '$(a + b)^2 = a^2 + 2ab + b^2$: el cuadrado se parte en $a^2$, dos rectángulos $ab$ y $b^2$. Con un corte en la decena se calcula de cabeza: $23^2 = 400 + 120 + 9 = 529$, $41^2 = 1600 + 80 + 1 = 1681$, $58^2 = 2500 + 800 + 64 = 3364$, $72^2 = 4900 + 280 + 4 = 5184$.',
        { hint: 'Corta el lado en la decena: los cuadrados y el rectángulo de la decena son fáciles de calcular.' }),
      play('diferencia-cuadrados', 'Suma por diferencia: mueve la esquina', { rounds: [{ p: 32, q: 28 }, { p: 43, q: 37 }, { p: 55, q: 45 }, { p: 26, q: 14 }] },
        '$(a + b)(a - b) = a^2 - b^2$: $a$ es el punto medio y $b$ la distancia a él. $32 \\cdot 28 = 30^2 - 2^2 = 896$; $43 \\cdot 37 = 40^2 - 3^2 = 1591$; $55 \\cdot 45 = 50^2 - 5^2 = 2475$; $26 \\cdot 14 = 20^2 - 6^2 = 364$.',
        { hint: 'a queda justo en la mitad de los dos factores y b es cuánto se aleja cada uno de esa mitad.' }),
      play('binomios-comun', 'Dos binomios con x: suma y producto', { rounds: [{ s: 7, p: 10 }, { s: 9, p: 20 }, { s: 6, p: 5 }, { s: 10, p: 21 }] },
        'En $(x + a)(x + b)$ las barras son $a + b$ y los cuadritos $a\\cdot b$: $x^2 + 7x + 10 = (x + 2)(x + 5)$, $x^2 + 9x + 20 = (x + 4)(x + 5)$, $x^2 + 6x + 5 = (x + 1)(x + 5)$, $x^2 + 10x + 21 = (x + 3)(x + 7)$.',
        { hint: 'Busca dos números que multiplicados den los cuadritos y sumados den las barras.' }),
      play('marco-cuadro', 'El marco del cuadro', { rounds: [{ w: 1, area: 44 }, { w: 2, area: 64 }, { w: 3, area: 84 }, { w: 1, area: 20 }] },
        'El marco es el cuadrado grande menos el cuadro: $(x + 2w)^2 - x^2 = 4wx + 4w^2$. Con $w = 1$: $4x + 4 = 44$, $x = 10$. Con $w = 2$: $8x + 16 = 64$, $x = 6$. Con $w = 3$: $12x + 36 = 84$, $x = 4$. Y $4x + 4 = 20$ da $x = 4$.',
        { hint: 'Desarrolla el cuadrado grande: los $x^2$ se cancelan y queda algo que crece de a poco con x.' }),
      keep('alg-3', 'arma-la-mesa')]);

    setLesson('alg-24c', [
      play('triangulo-pascal', 'Completa la fila del triángulo de Pascal', { rounds: [{ n: 3, extra: [2, 4] }, { n: 5, extra: [6, 8] }, { n: 6, extra: [12, 18] }] },
        'Cada número es la suma de los dos de arriba: la fila 3 es $1, 3, 3, 1$; la 5, $1, 5, 10, 10, 5, 1$; la 6, $1, 6, 15, 20, 15, 6, 1$. Son los coeficientes de $(a + b)^n$.',
        { hint: 'Para cada casilla vacía suma los dos números que tiene justo encima.' }),
      play('elige-parentesis', '¿De cuántas maneras sale el término?', { rounds: [{ n: 3, k: 2 }, { n: 4, k: 1 }, { n: 5, k: 2 }] },
        'Cada término sale de elegir a o b en cada paréntesis. $a b^2$ en $(a + b)^3$ sale de 3 maneras (bba, bab, abb); $a^3b$ en $(a + b)^4$, de 4; $a^3b^2$ en $(a + b)^5$, de 10. Ese número es el coeficiente: $\\binom{n}{k}$.',
        { hint: 'Cambia una ficha a la vez de paréntesis para no repetir maneras. Piensa en qué paréntesis van las b.' }),
      play('exponentes-binomio', 'Busca el término con la potencia pedida', { rounds: [{ n: 5, c: 2, p: 3 }, { n: 6, c: 1, p: 4 }, { n: 4, c: 3, p: 1 }, { n: 7, c: 1, p: 2 }] },
        'En $(x + c)^n$ el término $k$ es $\\binom{n}{k} x^{n - k} c^k$: los exponentes de $x$ bajan y los de $c$ suben. $10 \\cdot 2^2 x^3 = 40x^3$; $15x^4$; $4 \\cdot 27x = 108x$; $21x^2$.',
        { hint: 'El exponente de x más el del número siempre suman n.' }),
      play('fila-potencia', 'Cada fila suma una potencia de 2', { rounds: [{ total: 32 }, { total: 8 }, { total: 128 }, { total: 1 }] },
        'La fila $n$ cuenta todas las maneras de elegir a o b en $n$ paréntesis, que son $2^n$: $2^5 = 32$, $2^3 = 8$, $2^7 = 128$ y la fila 0, que es solo un 1, suma $2^0 = 1$.',
        { hint: 'Mira cuánto suma cada fila al pasar a la siguiente: se duplica.' }),
      play('once-potencias', 'Las potencias de 11 y Pascal', { rounds: [{ value: 1331 }, { value: 121 }, { value: 14641 }, { value: 161051 }] },
        '$11^n = (10 + 1)^n$ y sus cifras son la fila $n$ de Pascal: $11^2 = 121$, $11^3 = 1331$, $11^4 = 14641$. En la fila 5 hay un 10, que se lleva: $1, 5, 10, 10, 5, 1$ da $161051 = 11^5$.',
        { hint: 'Compara las cifras del número con las filas del triángulo.' }),
      keep('alg-24c', 'camino-pascal')]);

    setLesson('alg-24b', [
      play('factor-comun-bloques', 'Factor común: reparte en filas iguales', { rounds: [{ p: 6, q: 9 }, { p: 4, q: 10 }, { p: 12, q: 18 }, { p: 5, q: 15 }] },
        'Sacar factor común es acomodar los bloques en filas iguales: $6x + 9 = 3(2x + 3)$, $4x + 10 = 2(2x + 5)$, $12x + 18 = 6(2x + 3)$, $5x + 15 = 5(x + 3)$. El mayor número de filas que reparte justo es el máximo común divisor.',
        { hint: 'Busca el número más grande que divide tanto a las barras como a los cuadritos.' }),
      play('diferencia-esquina', 'Diferencia de cuadrados: quita una esquina', { rounds: [{ c: 9 }, { c: 25 }, { c: 36 }, { c: 4 }] },
        'Si $c = b^2$, se quita una esquina de $b$ por $b$ y la tira se pasa abajo: $x^2 - 9 = (x + 3)(x - 3)$, $x^2 - 25 = (x + 5)(x - 5)$, $x^2 - 36 = (x + 6)(x - 6)$, $x^2 - 4 = (x + 2)(x - 2)$.',
        { hint: '¿Qué número al cuadrado da lo que se resta?' }),
      play('suma-producto', 'Factoriza con suma y producto', { rounds: [{ s: -1, p: -12 }, { s: 7, p: 12 }, { s: -8, p: 15 }, { s: 2, p: -15 }] },
        '$x^2 + sx + p = (x + m)(x + n)$ con $m + n = s$ y $mn = p$: $x^2 - x - 12 = (x - 4)(x + 3)$, $x^2 + 7x + 12 = (x + 3)(x + 4)$, $x^2 - 8x + 15 = (x - 3)(x - 5)$, $x^2 + 2x - 15 = (x + 5)(x - 3)$.',
        { hint: 'Si el producto es negativo, un número es positivo y el otro negativo; si es positivo, tienen el mismo signo que la suma.' }),
      play('agrupa-terminos', 'Factoriza agrupando de a dos', { rounds: [
        { terms: ['x^3', '2x^2', '3x', '6'], groups: { '0,1': ['x^2', 'x + 2'], '2,3': ['3', 'x + 2'], '0,2': ['x', 'x^2 + 3'], '1,3': ['2', 'x^2 + 3'] }, goods: [['0,1', '2,3'], ['0,2', '1,3']], result: '(x + 2)(x^2 + 3)' },
        { terms: ['ax', 'ay', 'bx', 'by'], groups: { '0,1': ['a', 'x + y'], '2,3': ['b', 'x + y'], '0,2': ['x', 'a + b'], '1,3': ['y', 'a + b'] }, goods: [['0,1', '2,3'], ['0,2', '1,3']], result: '(a + b)(x + y)' },
        { terms: ['2x^2', '6x', '5x', '15'], groups: { '0,1': ['2x', 'x + 3'], '2,3': ['5', 'x + 3'], '0,2': ['x', '2x + 5'], '1,3': ['3', '2x + 5'] }, goods: [['0,1', '2,3'], ['0,2', '1,3']], result: '(x + 3)(2x + 5)' },
      ] }, 'Se agrupan de a dos para que cada grupo tenga un factor común y deje el mismo paréntesis: $x^2(x + 2) + 3(x + 2) = (x + 2)(x^2 + 3)$. Otra agrupación puede servir igual; otras no dejan el mismo paréntesis.',
        { hint: 'En cada caja saca el factor común. Si los dos paréntesis salen iguales, ya está.' }),
      keep('alg-24b', 'completa-cuadrado'), keep('alg-24b', 'reparte-barras')]);

    setExam('polinomios', [
      ['alg-23a', 'Un polinomio se arma con bloques de cada grado; el signo menos es el color contrario.',
        play('bloques-polinomio', 'Arma el polinomio', { rounds: [{ mode: 'arma', target: [2, -3, 1] }] }, '$2x^2 - 3x + 1$: dos cuadrados, tres barras rojas y un cuadrito.', { hint: 'Cuenta los bloques de cada tipo y su color.' })],
      ['alg-23a', 'Restar un polinomio es sumar su opuesto.',
        play('resta-voltea', 'Resta volteando', { rounds: [{ P: [1, 0, 4], Q: [1, -2, 1] }] }, '$(x^2 + 4) - (x^2 - 2x + 1) = 2x + 3$.', { hint: 'Voltea todo Q antes de sumarlo.' })],
      ['alg-3', '$(x + a)(x + b) = x^2 + (a + b)x + ab$.',
        play('binomios-comun', 'Dos binomios con x', { rounds: [{ s: 8, p: 15 }] }, '$(x + 3)(x + 5)$.', { hint: 'Suma 8 y producto 15.' })],
      ['alg-3', '$(a + b)(a - b) = a^2 - b^2$.',
        play('diferencia-cuadrados', 'Mueve la esquina', { rounds: [{ p: 62, q: 58 }] }, '$62 \\cdot 58 = 60^2 - 2^2 = 3596$.', { hint: 'a está en la mitad.' })],
      ['alg-24c', 'El término $k$ de $(x + c)^n$ es $\\binom{n}{k}x^{n - k}c^k$.',
        play('exponentes-binomio', 'Busca el término', { rounds: [{ n: 6, c: 2, p: 4 }] }, '$\\binom62 x^4 \\cdot 2^2 = 60x^4$.', { hint: 'Los exponentes suman 6.' })],
      ['alg-24c', 'Cada número del triángulo de Pascal suma los dos de arriba.',
        play('triangulo-pascal', 'Completa la fila', { rounds: [{ n: 7, extra: [14, 28] }] }, 'Fila 7: $1, 7, 21, 35, 35, 21, 7, 1$.', { hint: 'Suma los dos de arriba.' })],
      ['alg-24b', 'Factorizar un trinomio es buscar dos números con esa suma y ese producto.',
        play('suma-producto', 'Factoriza', { rounds: [{ s: 2, p: -8 }] }, '$x^2 + 2x - 8 = (x + 4)(x - 2)$.', { hint: 'Producto negativo: signos distintos.' })],
      ['alg-24b', '$x^2 - b^2 = (x + b)(x - b)$.',
        play('diferencia-esquina', 'Quita una esquina', { rounds: [{ c: 49 }] }, '$x^2 - 49 = (x + 7)(x - 7)$.', { hint: '¿Qué número al cuadrado da 49?' })],
    ]);
  }
  // ───────── Mundo 7 · Parábolas y Complejos ─────────
  {
    setLesson('alg-23c', [
      play('plano-complejo', 'Ubica cada complejo en su plano', { rounds: [{ a: -1, b: 4 }, { a: 3, b: -2 }, { a: -2, b: -3 }, { a: 0, b: 4 }] },
        'El complejo $a + bi$ es el punto que está $a$ a lo ancho y $b$ a lo alto: $-1 + 4i$ va a la izquierda y arriba; $3 - 2i$, a la derecha y abajo. $4i$ no tiene parte real: vive en el eje vertical.',
        { hint: 'La parte real se mide a lo ancho (eje horizontal) y la imaginaria a lo alto.' }),
      play('vueltas-i', 'Las potencias de i dan cuartos de vuelta', { rounds: [{ n: 7 }, { n: 10 }, { n: 16 }, { n: 11 }] },
        'Multiplicar por $i$ es un cuarto de vuelta y cuatro cuartos vuelven al 1, así que solo importa el residuo de dividir entre 4: $i^7 = i^3 = -i$, $i^{10} = i^2 = -1$, $i^{16} = 1$, $i^{11} = -i$.',
        { hint: 'Quita todas las vueltas completas (de 4 en 4) y mira cuántos cuartos sobran.' }),
      play('suma-complejos', 'Suma complejos flecha tras flecha', { rounds: [
        { z1: [2, 1], target: [5, -1] }, { z1: [-3, 2], target: [1, 4] }, { z1: [1, -4], target: [-2, -1] },
      ] }, 'Se suma real con real e imaginaria con imaginaria: $z_2 = \\text{meta} - z_1$. $(5 - i) - (2 + i) = 3 - 2i$; $(1 + 4i) - (-3 + 2i) = 4 + 2i$; $(-2 - i) - (1 - 4i) = -3 + 3i$.',
        { hint: 'Cuenta cuánto le falta a la punta de z₁ para llegar a la estrella, a lo ancho y a lo alto.' }),
      play('conjugado-espejo', 'El conjugado es el reflejo en el eje real', { rounds: [{ a: 2, b: 5 }, { a: -3, b: 1 }, { a: 4, b: -2 }] },
        'El conjugado cambia el signo de la parte imaginaria: es el reflejo en el eje real. Y $z \\cdot \\bar z = a^2 + b^2$ siempre es real: $(2 + 5i)(2 - 5i) = 29$, $(-3 + i)(-3 - i) = 10$, $(4 - 2i)(4 + 2i) = 20$.',
        { hint: 'La parte real no cambia; la imaginaria queda igual de lejos del eje, del otro lado.' }),
      play('modulo-circulo', 'El módulo es la distancia al origen', { rounds: [{ a: 6, b: 8 }, { a: 5, b: 12 }, { a: -8, b: 6 }, { a: 0, b: -7 }] },
        '$|a + bi| = \\sqrt{a^2 + b^2}$, por Pitágoras con catetos $|a|$ y $|b|$: $|6 + 8i| = 10$, $|5 + 12i| = 13$, $|-8 + 6i| = 10$, $|-7i| = 7$.',
        { hint: 'Arma el triángulo con la parte real y la imaginaria como catetos: el módulo es la hipotenusa.' }),
      keep('alg-23c', 'gira-complejos')]);

    setLesson('alg-1', [
      play('despeja-x', 'Despeja x aplicando lo mismo a los dos lados', { rounds: [
        { a: 4, b: -5, c: 23, cards: [['+', 5], ['+', -5], ['×', 0.25], ['×', 4]] },
        { a: 3, b: 7, c: -2, cards: [['+', -7], ['+', 7], ['×', 1 / 3], ['×', 3]] },
        { a: 5, div: true, b: 2, c: 6, cards: [['+', -2], ['+', 2], ['×', 5], ['×', 0.2]] },
        { a: -2, b: 3, c: 11, cards: [['+', -3], ['×', -0.5], ['×', 0.5], ['+', 3]] },
      ] }, 'Se deshace primero lo que se sumó y luego lo que multiplica, con la misma operación a los dos lados: $4x - 5 = 23 \\Rightarrow 4x = 28 \\Rightarrow x = 7$; $3x = -9$, $x = -3$; $\\tfrac{x}{5} = 4$, $x = 20$; $-2x = 8$, $x = -4$.',
        { hint: 'Primero quita el número que se suma o resta; después lo que multiplica a x, multiplicando por su recíproco.' }),
      play('encuentro-caminantes', '¿Cuándo se encuentran?', { rounds: [
        { A: [60, 0], B: [40, 300], max: 20 }, { A: [80, 100], B: [50, 400], max: 14 }, { A: [90, 0], B: [60, 240], max: 12 },
      ] }, 'Se encuentran cuando sus posiciones son iguales: $60t = 40t + 300$ da $20t = 300$, $t = 15$; $80t + 100 = 50t + 400$ da $t = 10$; $90t = 60t + 240$ da $t = 8$.',
        { hint: 'El de atrás descuenta cada minuto la diferencia de velocidades. ¿Cuántos minutos tarda en descontar la ventaja?' }),
      play('consecutivos', 'Números seguidos que suman', { rounds: [{ k: 3, d: 1, S: 72 }, { k: 4, d: 1, S: 90 }, { k: 3, d: 2, S: 51 }, { k: 5, d: 1, S: 115 }] },
        'Si el primero es $x$, los siguientes son $x + 1$, $x + 2$…: $3x + 3 = 72$ da $x = 23$; $4x + 6 = 90$ da $x = 21$; de dos en dos, $3x + 6 = 51$ da $x = 15$; $5x + 10 = 115$ da $x = 21$.',
        { hint: 'Escribe todos con x: el primero es x y cada uno suma lo mismo al anterior. Junta las x y los números.' }),
      play('sin-o-infinitas', 'Ninguna o infinitas soluciones', { rounds: [
        { a: 2, b: 3, c: 2, want: 'infinitas' }, { a: 3, b: -1, c: 3, want: 'ninguna' }, { a: -2, b: 5, c: -2, want: 'infinitas' }, { a: 4, b: 0, c: 4, want: 'ninguna' },
      ] }, 'Con la misma $x$ a los dos lados, al restar se va la $x$. Si quedan iguales ($0 = 0$) toda $x$ sirve: las rectas son la misma. Si quedan distintas ($3 = 5$) ninguna sirve: las rectas son paralelas.',
        { hint: 'Resta lo mismo a los dos lados: ¿queda una igualdad cierta o una falsa?' }),
      play('perimetro-x', 'El rectángulo de perímetro dado', { rounds: [{ m: 3, P: 26 }, { k: 2, P: 36 }, { m: 5, P: 50 }, { k: 3, P: 48 }] },
        'El perímetro es dos veces ancho más largo: $2(x + x + 3) = 26$ da $4x + 6 = 26$, $x = 5$; $2(x + 2x) = 36$ da $x = 6$; $2(2x + 5) = 50$ da $x = 10$; $2(x + 3x) = 48$ da $x = 6$.',
        { hint: 'Escribe el largo con x y suma los cuatro lados.' }),
      keep('alg-1', 'balanza-cajas')]);

    setLesson('alg-4a', [keep('alg-4a', 'mueve-parabola'),
      play('simetria-parabola', 'Encuentra el eje de simetría', { rounds: [
        { a: 1, h: 2, k: -3, x1: -1 }, { a: -1, h: -1, k: 4, x1: 1 }, { a: 0.5, h: 0.5, k: -2, x1: 3 }, { a: 2, h: -2, k: 1, x1: -3 },
      ] }, 'Dos puntos de la parábola a la misma altura están a igual distancia del eje: el eje pasa por el punto medio. Entre $-1$ y $5$ el medio es 2; entre 1 y $-3$, $-1$; entre 3 y $-2$, $0.5$; entre $-3$ y $-1$, $-2$.',
        { hint: 'Suma las dos x y divide entre 2.' }),
      play('abertura-a', 'Ajusta la abertura de la parábola', { rounds: [
        { h: 1, k: -2, pt: [3, 6] }, { h: -2, k: 5, pt: [0, 1] }, { h: 0, k: -4, pt: [4, 0] }, { h: 2, k: 3, pt: [4, 1] },
      ] }, 'Con el vértice fijo, $a$ se halla con un punto: $a \\cdot 2^2 - 2 = 6$ da $a = 2$; $a \\cdot 2^2 + 5 = 1$ da $a = -1$; $16a - 4 = 0$ da $a = \\tfrac14$; $4a + 3 = 1$ da $a = -\\tfrac12$.',
        { hint: 'Si el punto está más abajo que el vértice, a es negativo. Cuenta cuánto sube o baja desde el vértice y a qué distancia horizontal.' }),
      play('forma-canonica', 'Pasa a la forma canónica', { rounds: [{ b: -4, c: 1 }, { b: 6, c: 5 }, { b: 2, c: -3 }, { b: -6, c: 8 }] },
        'Se completa el cuadrado: $x^2 - 4x + 1 = (x - 2)^2 - 3$, $x^2 + 6x + 5 = (x + 3)^2 - 4$, $x^2 + 2x - 3 = (x + 1)^2 - 4$, $x^2 - 6x + 8 = (x - 3)^2 - 1$. El vértice queda a la vista: $h = -\\tfrac{b}{2}$.',
        { hint: 'h es la mitad del número que acompaña a x, con el signo cambiado. Para k, mira qué le falta o le sobra al cuadrado.' }),
      play('ingreso-maximo', 'El precio del mayor ingreso', { rounds: [{ base: 40, drop: 2 }, { base: 60, drop: 3 }, { base: 30, drop: 1 }, { base: 48, drop: 4 }] },
        'El ingreso es precio por ventas, $I = p(b - dp)$: una parábola que abre hacia abajo con ceros en $0$ y en $\\tfrac{b}{d}$. Su vértice está en la mitad: $p = 10$ (ingreso 200), $p = 10$ (300), $p = 15$ (225) y $p = 6$ (144). Subir más el precio hace vender tan poco que el ingreso baja.',
        { hint: 'El ingreso vale cero si el precio es 0 y también si ya no se vende nada. El mejor precio está a medio camino.' }),
      keep('alg-4a', 'apunta-chorro')]);

    setLesson('alg-4', [keep('alg-4', 'raices-imanes'),
      play('producto-cero', 'Si un producto es cero, algún factor es cero', { rounds: [{ p: 3, q: -2 }, { p: -4, q: -1 }, { p: 5, q: 0 }, { p: 2, q: 2 }] },
        'Un producto vale cero solo si algún factor vale cero: $(x - 3)(x + 2) = 0$ da $x = 3$ o $x = -2$. Si un factor es $x$ solo, una raíz es 0. Y $(x - 2)^2 = 0$ tiene una raíz doble: $x = 2$ dos veces.',
        { hint: 'Busca para qué x cada paréntesis vale cero: el signo dentro del paréntesis es el contrario de la raíz.' }),
      play('discriminante-traslada', '¿Cuántas veces corta el eje?', { rounds: [{ b: 4, want: 1 }, { b: -6, want: 0 }, { b: 2, want: 2 }, { b: -4, want: 1 }] },
        'Subir la parábola cambia $\\Delta = b^2 - 4c$: si es positivo hay dos cortes, si es cero toca una vez y si es negativo no corta. Con $b = 4$, toca cuando $c = 4$; con $b = -6$, no corta si $c > 9$; con $b = 2$, corta dos veces si $c < 1$.',
        { hint: 'Calcula para qué c el discriminante vale cero; arriba de eso no corta y abajo corta dos veces.' }),
      play('raices-simetricas', 'Las raíces a los dos lados del eje', { rounds: [{ a: 1, b: -2, c: -8 }, { a: 1, b: 4, c: -5 }, { a: 2, b: -4, c: -6 }, { a: -1, b: 2, c: 3 }] },
        'La fórmula general es $x = h \\pm d$ con $h = -\\tfrac{b}{2a}$ y $d = \\tfrac{\\sqrt{\\Delta}}{2|a|}$: $1 \\pm 3$; $-2 \\pm 3$; $1 \\pm \\tfrac{\\sqrt{64}}{4} = 1 \\pm 2$; $1 \\pm \\tfrac{\\sqrt{16}}{2} = 1 \\pm 2$.',
        { hint: 'Las dos raíces están a la misma distancia del eje. Calcula el discriminante y divide su raíz entre 2a.' }),
      play('area-ecuacion', 'El terreno de área dada', { rounds: [{ m: 3, area: 40 }, { m: 2, area: 63 }, { m: 5, area: 84 }, { m: 4, area: 96 }] },
        '$x(x + 3) = 40$ es $x^2 + 3x - 40 = 0 = (x + 8)(x - 5)$: sirve $x = 5$; la raíz $-8$ no es una medida. Igual $x = 7$ ($7\\cdot9 = 63$), $x = 7$ ($7 \\cdot 12 = 84$) y $x = 8$ ($8 \\cdot 12 = 96$).',
        { hint: 'Prueba anchos y multiplica por el largo; o factoriza la ecuación y quédate con la raíz positiva.' }),
      keep('alg-4', 'donde-cae')]);

    setExam('cuadraticas', [
      ['alg-23c', 'Los complejos se suman parte por parte: es poner una flecha después de la otra.',
        play('suma-complejos', 'Suma complejos', { rounds: [{ z1: [-1, 3], target: [2, 1] }] }, '$z_2 = 3 - 2i$.', { hint: 'Meta menos z₁.' })],
      ['alg-23c', '$|a + bi| = \\sqrt{a^2 + b^2}$.',
        play('modulo-circulo', 'El módulo', { rounds: [{ a: 9, b: 12 }] }, '$\\sqrt{81 + 144} = 15$.', { hint: 'Catetos 9 y 12.' })],
      ['alg-1', 'Para despejar se aplica la misma operación a los dos lados.',
        play('despeja-x', 'Despeja x', { rounds: [{ a: 6, b: -4, c: 20, cards: [['+', 4], ['+', -4], ['×', 1 / 6], ['×', 6]] }] }, '$6x = 24$, $x = 4$.', { hint: 'Primero el −4.' })],
      ['alg-1', 'Plantear es escribir lo desconocido con una letra.',
        play('consecutivos', 'Números seguidos', { rounds: [{ k: 3, d: 1, S: 48 }] }, '$3x + 3 = 48$: 15, 16 y 17.', { hint: 'x, x + 1 y x + 2.' })],
      ['alg-4a', 'Completar el cuadrado deja el vértice a la vista.',
        play('forma-canonica', 'Forma canónica', { rounds: [{ b: -8, c: 10 }] }, '$(x - 4)^2 - 6$.', { hint: 'h es la mitad de −8 cambiada de signo.' })],
      ['alg-4a', 'El eje de la parábola pasa por el punto medio de dos puntos a la misma altura.',
        play('simetria-parabola', 'El eje de simetría', { rounds: [{ a: 1, h: -3, k: -5, x1: 0 }] }, 'Entre 0 y −6: $x = -3$.', { hint: 'Promedia las x.' })],
      ['alg-4', 'Si un producto vale cero, algún factor vale cero.',
        play('producto-cero', 'Producto cero', { rounds: [{ p: -3, q: 6 }] }, '$x = -3$ o $x = 6$.', { hint: 'Cada paréntesis por separado.' })],
      ['alg-4', 'El discriminante cuenta los cortes con el eje.',
        play('discriminante-traslada', '¿Cuántos cortes?', { rounds: [{ b: -2, want: 1 }] }, 'Toca una vez con $c = 1$.', { hint: '$\\Delta = 0$.' })],
    ]);
  }
  // ───────── Mundo 8 · Raíces de Polinomios ─────────
  {
    setLesson('alg-23b', [
      play('bolsas-residuo', 'Empaca y mira lo que sobra', { rounds: [{ N: 53, d: 6 }, { N: 40, d: 7 }, { N: 62, d: 9 }, { N: 35, d: 5 }] },
        'Dividir es empacar: $53 = 6 \\cdot 8 + 5$, $40 = 7 \\cdot 5 + 5$, $62 = 9 \\cdot 6 + 8$ y $35 = 5 \\cdot 7 + 0$. El residuo siempre es menor que el divisor; si alcanza para otra bolsa, se empaca. Con polinomios pasa igual: el residuo tiene grado menor que el divisor.',
        { hint: 'Llena bolsas mientras alcance para una completa. Lo que queda suelto, si es menos que una bolsa, es el residuo.' }),
      play('grado-cociente', 'Los grados en la división', { rounds: [{ n: 5, m: 2 }, { n: 4, m: 1 }, { n: 3, m: 1 }, { n: 6, m: 4 }] },
        'Si $P = D \\cdot Q + R$, al multiplicar $D \\cdot Q$ se suman los grados: el grado de $Q$ es el de $P$ menos el de $D$. Grado 5 entre grado 2 da cociente de grado 3; 4 entre 1, grado 3; 3 entre 1, grado 2; 6 entre 4, grado 2.',
        { hint: 'Al multiplicar dos polinomios, el término de mayor grado sale de multiplicar los dos de mayor grado: los exponentes se suman.' }),
      play('lado-faltante', 'Divide buscando el lado que falta', { rounds: [{ a: 2, s: 7, p: 13 }, { a: 3, s: 5, p: 6 }, { a: 1, s: 6, p: 8 }, { a: 4, s: 7, p: 15 }] },
        'Dividir entre $x + a$ es armar un rectángulo con ese lado: el otro lado es el cociente y lo que no cabe, el residuo. $x^2 + 7x + 13 = (x + 2)(x + 5) + 3$; $x^2 + 5x + 6 = (x + 3)(x + 2)$, exacta; $x^2 + 6x + 8 = (x + 1)(x + 5) + 3$; $x^2 + 7x + 15 = (x + 4)(x + 3) + 3$.',
        { hint: 'Las barras deben cuadrar: a + b tiene que ser el número de barras. Después mira cuántos cuadritos sobran.' }),
      play('completa-identidad', 'La prueba de la división', { rounds: [
        { P: [1, 5, 9], d: 2, Q: [1, 3] }, { P: [1, 1, -4], d: -3, Q: [1, 4] }, { P: [2, 7, 10], d: 1, Q: [2, 5] }, { P: [1, -6, 7], d: -2, Q: [1, -4] },
      ] }, 'Dividendo = divisor · cociente + residuo: $(x + 2)(x + 3) = x^2 + 5x + 6$, así que el residuo es $9 - 6 = 3$. Igual: $8$, $5$ y $-1$.',
        { hint: 'Multiplica el divisor por el cociente y compara con el dividendo: lo que le falta es el residuo.' }),
      play('iguala-coeficientes', 'Polinomios iguales, coeficientes iguales', { rounds: [
        { c: 2, P: [1, -3, -4, 12] }, { c: -1, P: [1, 4, 5, 2] }, { c: 3, P: [1, -1, -5, -3] }, { c: -2, P: [1, 2, -3, -6] },
      ] }, 'Dos polinomios son iguales si tienen los mismos coeficientes. Al desarrollar $(x - c)(x^2 + ax + b)$ sale $x^3 + (a - c)x^2 + (b - ca)x - cb$: se iguala término a término. $(x - 2)(x^2 - x - 6)$, $(x + 1)(x^2 + 3x + 2)$, $(x - 3)(x^2 + 2x + 1)$, $(x + 2)(x^2 - 3)$.',
        { hint: 'Empieza por el coeficiente de x²: solo depende de a. Luego busca b con el de x.' }),
      keep('alg-23b', 'empaca-filas')]);

    setLesson('alg-92', [keep('alg-92', 'division-sintetica'),
      play('signo-divisor', 'El residuo es P(c): ojo con el signo', { rounds: [
        { P: [1, 0, -3, 2], c: -2 }, { P: [2, -1, 0, 5], c: 1 }, { P: [1, 2, -5], c: 3 }, { P: [1, 0, 1], c: -3 },
      ] }, 'Al dividir entre $x - c$ el residuo es $P(c)$, y $x + 2$ es $x - (-2)$: se evalúa en $-2$. $P(-2) = -8 + 6 + 2 = 0$ (división exacta); $P(1) = 6$; $P(3) = 10$; $P(-3) = 10$.',
        { hint: 'El número que va en lugar de x es el que anula el divisor: si el divisor es x + 3, es −3.' }),
      play('llena-sintetica', 'Completa la división sintética', { rounds: [
        { coef: [1, -4, 1, 6], c: 3, extra: [2, -6] }, { coef: [2, 3, -5, 1], c: -2, extra: [4, 5] }, { coef: [1, 0, -7, 6], c: 2, extra: [-1, 5] },
      ] }, 'Se baja el primer coeficiente; luego se multiplica por $c$ y se suma en la columna siguiente. Entre $x - 3$: $1, -1, -2, 0$ (exacta). Entre $x + 2$: $2, -1, -3, 7$ (residuo 7). Entre $x - 2$: $1, 2, -3, 0$.',
        { hint: 'Cada número de abajo es el de arriba más c por el de abajo de la columna anterior.' }),
      play('factor-k', 'Ajusta k para que haya un factor', { rounds: [
        { P: [1, null, -4, 4], c: 2 }, { P: [1, 3, null, 6], c: -1 }, { P: [1, null, -6], c: 2 },
      ] }, 'Por el teorema del factor, $x - c$ es factor si $P(c) = 0$: $8 + 4k - 8 + 4 = 0$ da $k = -1$; $-1 + 3 - k + 6 = 0$ da $k = 8$; $4 + 2k - 6 = 0$ da $k = 1$.',
        { hint: 'Evalúa el polinomio en c con k como letra e iguala a cero.' }),
      play('arma-factores', 'De los ceros a los factores', { rounds: [
        { roots: [-2, 1, 3], chips: [-3, -2, -1, 1, 2, 3] }, { roots: [0, 4], chips: [-4, 0, 2, 4] }, { roots: [-3, -1, 2], chips: [-3, -2, -1, 1, 2, 3] },
      ] }, 'Si $c$ es un cero, $x - c$ es un factor: el número dentro del factor tiene el signo contrario al cero. Ceros $-2, 1, 3$: $(x + 2)(x - 1)(x - 3)$. Un cero en 0 da el factor $x$.',
        { hint: 'En cada casilla pon el número que hace cero ese paréntesis: es el cero de la gráfica.' }),
      keep('alg-92', 'sondea-niebla')]);

    setLesson('alg-93', [
      play('tramo-signo', 'El signo del polinomio en cada tramo', { rounds: [
        { zeros: [-2, 3], want: -1 }, { zeros: [-1, 1, 4], want: 1 }, { zeros: [0, 2], want: 1, a: -1 }, { zeros: [-3, 2], want: 1 },
      ] }, 'Entre dos ceros seguidos el polinomio no cambia de signo, y en un cero simple cambia. Cada factor $x - c$ es negativo a la izquierda de $c$ y positivo a la derecha; el signo del producto sale de contar los negativos.',
        { hint: 'Mira cuántos factores son negativos en el tramo: si son pares, el producto es positivo.' }),
      play('multiplicidad', 'Cruza o rebota: la multiplicidad', { rounds: [
        { zeros: [-3, 1], want: ['cruza', 'rebota'], deg: 3 }, { zeros: [-2, 1], want: ['rebota', 'cruza'], deg: 5 }, { zeros: [0, 3], want: ['cruza', 'cruza'], deg: 4 }, { zeros: [-1, 2], want: ['rebota', 'rebota'], deg: 4 },
      ] }, 'Con exponente impar la gráfica cruza el eje; con exponente par, lo toca y se devuelve. El grado es la suma de los exponentes: $(x + 3)(x - 1)^2$ tiene grado 3; $(x + 2)^2(x - 1)^3$, grado 5; $x(x - 3)^3$ o $x^3(x - 3)$, grado 4; $(x + 1)^2(x - 2)^2$, grado 4.',
        { hint: 'Elige primero exponentes con la paridad correcta y luego ajústalos para que sumen el grado.' }),
      play('prueba-candidatos', 'Prueba los candidatos a cero', { rounds: [
        { P: [1, 0, -7, 6], cands: [-6, -3, -2, -1, 1, 2, 3, 6] }, { P: [1, 2, -1, -2], cands: [-2, -1, 1, 2] }, { P: [1, -1, -4, 4], cands: [-4, -2, -1, 1, 2, 4] },
      ] }, 'Un cero entero debe dividir al término independiente. $x^3 - 7x + 6$ tiene ceros $1, 2, -3$; $x^3 + 2x^2 - x - 2$, ceros $-2, -1, 1$; $x^3 - x^2 - 4x + 4$, ceros $1, 2, -2$.',
        { hint: 'Prueba cada candidato: si P(c) da cero, es un cero. Un cúbico tiene a lo más tres.' }),
      play('arma-ceros', 'Pon los ceros con su multiplicidad', { rounds: [
        { zeros: [[-2, 1], [1, 2]] }, { zeros: [[-1, 2], [3, 1]] }, { zeros: [[0, 1], [2, 1], [-3, 1]] },
      ] }, 'Un polinomio de grado $n$ tiene $n$ ceros contando los repetidos: donde la gráfica rebota hay un cero doble. $(x + 2)(x - 1)^2$; $(x + 1)^2(x - 3)$; $x(x - 2)(x + 3)$.',
        { hint: 'Donde la curva cruza el eje pon un cero; donde lo toca y se devuelve, pon dos en el mismo lugar.' }),
      play('factoriza-cubica', 'Del cúbico a la parábola', { rounds: [
        { P: [1, -1, -4, 4], c: 1 }, { P: [1, 0, 0, -8], c: 2 }, { P: [1, -1, 1, -1], c: 1 }, { P: [1, 4, 1, -6], c: 1 },
      ] }, 'Con un cero $c$ se divide entre $x - c$ y queda una parábola. $x^3 - 8 = (x - 2)(x^2 + 2x + 4)$, cuyos otros ceros son complejos: $-1 \\pm \\sqrt3\\, i$. $x^3 - x^2 + x - 1 = (x - 1)(x^2 + 1)$ tiene $\\pm i$. Los ceros complejos llegan en parejas conjugadas.',
        { hint: 'Prueba los divisores del último coeficiente hasta que P(c) dé cero.' }),
      keep('alg-93', 'cruza-o-rebota')]);

    setExam('grado-superior', [
      ['alg-23b', 'Dividendo = divisor · cociente + residuo, con residuo menor que el divisor.',
        play('bolsas-residuo', 'Empaca', { rounds: [{ N: 71, d: 8 }] }, '$71 = 8 \\cdot 8 + 7$.', { hint: 'El residuo es menor que 8.' })],
      ['alg-23b', 'Dos polinomios iguales tienen los mismos coeficientes.',
        play('iguala-coeficientes', 'Iguala coeficientes', { rounds: [{ c: 1, P: [1, 1, -5, 3] }] }, '$(x - 1)(x^2 + 2x - 3)$.', { hint: 'Empieza por x².' })],
      ['alg-92', 'La división sintética baja, multiplica y suma.',
        play('llena-sintetica', 'Completa la tabla', { rounds: [{ coef: [1, -3, 0, 4], c: 2, extra: [1, 6] }] }, 'Abajo: $1, -1, -2, 0$.', { hint: 'Baja el primero.' })],
      ['alg-92', 'x − c es factor si P(c) = 0.',
        play('factor-k', 'Ajusta k', { rounds: [{ P: [1, null, 2, -8], c: 2 }] }, '$8 + 4k + 4 - 8 = 0$: $k = -1$.', { hint: 'Evalúa en 2.' })],
      ['alg-93', 'Los ceros enteros dividen al término independiente.',
        play('prueba-candidatos', 'Prueba candidatos', { rounds: [{ P: [1, -6, 11, -6], cands: [-3, -2, -1, 1, 2, 3, 6] }] }, 'Ceros $1, 2, 3$.', { hint: 'Divisores de 6.' })],
      ['alg-93', 'Entre dos ceros seguidos el polinomio no cambia de signo.',
        play('tramo-signo', 'El signo en cada tramo', { rounds: [{ zeros: [-1, 2, 5], want: -1 }] }, 'Negativo antes de −1 y entre 2 y 5.', { hint: 'Cuenta factores negativos.' })],
    ]);
  }
  // ───────── Mundo 9 · Fracciones Algebraicas ─────────
  {
    setLesson('alg-25a', [
      play('prohibidos', 'Los valores prohibidos: donde el denominador vale cero', { rounds: [
        { tex: '\\dfrac{x + 3}{(x - 2)(x + 4)}', bad: [2, -4] }, { tex: '\\dfrac{5}{x^2 - 16}', bad: [4, -4] },
        { tex: '\\dfrac{x - 6}{x^2 + 2x}', bad: [0, -2] }, { tex: '\\dfrac{2x}{x^2 - 5x + 6}', bad: [2, 3] },
      ] }, 'No se puede dividir entre cero: se excluyen los valores que anulan el denominador. $(x - 2)(x + 4) = 0$ en $2$ y $-4$; $x^2 - 16 = (x - 4)(x + 4)$; $x^2 + 2x = x(x + 2)$; $x^2 - 5x + 6 = (x - 2)(x - 3)$. El numerador no importa: si vale cero, la fracción vale 0 y existe.',
        { hint: 'Factoriza el denominador y busca qué número anula cada factor. Lo de arriba puede valer cero sin problema.' }),
      keep('alg-25a', 'cancela-factores'),
      play('evalua-racional', 'Evalúa la fracción: busca el x que da la meta', { rounds: [
        { n: [1, 4], d: [1, -2], target: 3 }, { n: [2, 1], d: [1, 1], target: 3 }, { n: [1, -6], d: [1, 2], target: 0 }, { n: [3, 0], d: [1, -3], target: 2 },
      ] }, 'El valor de la fracción es numerador entre denominador. $\\dfrac{5 + 4}{5 - 2} = 3$; $\\dfrac{2(-2) + 1}{-2 + 1} = 3$; la fracción vale 0 donde el numerador es 0 (en $x = 6$); $\\dfrac{3(-6)}{-6 - 3} = 2$. Donde el denominador vale 0 la fracción no existe.',
        { hint: 'Mira las dos barras: la fracción vale la meta cuando el numerador es la meta veces el denominador.' }),
      play('cerca-asintota', 'Acércate al valor prohibido', { rounds: [
        { k: 1, a: 2, side: 1, target: 30 }, { k: 2, a: -3, side: -1, target: 15 }, { k: 3, a: 1, side: 1, target: 1000 },
      ] }, 'Cerca del valor que anula el denominador, se divide entre un número muy pequeño y la fracción se dispara: $\\dfrac{1}{0.02} = 50$, $\\dfrac{2}{-0.1} = -20$, $\\dfrac{3}{0.001} = 3000$. Por eso la gráfica sube (o baja) sin fin junto a la asíntota vertical.',
        { hint: 'Dividir entre 0.1 es multiplicar por 10; entre 0.01, por 100. Cuanto más cerca, más grande el resultado.' }),
      play('cruz-asintotas', 'Lleva la cruz de asíntotas a su lugar', { rounds: [
        { p: 3, q: -1, h: -1, xr: [-7, 6], yr: [-4, 9] }, { p: -2, q: 5, h: 4, xr: [-4, 9], yr: [-7, 5] },
      ] }, 'En $y = \\dfrac{3x - 1}{x + 1}$ la vertical está en $x = -1$ (ahí se anula el denominador) y la horizontal en $y = 3$, el cociente de los coeficientes de $x$. En $y = \\dfrac{-2x + 5}{x - 4}$: $x = 4$ y $y = -2$.',
        { hint: 'La vertical va donde se anula el denominador. Para la horizontal piensa en x enorme: los números sueltos dejan de pesar.' }),
      keep('alg-25a', 'rio-o-hueco')]);

    setLesson('alg-25b', [
      play('denominador-comun', 'Arma el mínimo común denominador', { rounds: [
        { d1: ['x', 'x-3'], d2: ['x-3', 'x+2'], chips: ['x', 'x-3', 'x+2', 'x-2', 'x^2'] },
        { d1: ['x', 'x'], d2: ['x', 'x+1'], chips: ['x', 'x', 'x', 'x+1', 'x-1'] },
        { d1: ['x+1', 'x-1'], d2: ['x+1', 'x+1'], chips: ['x+1', 'x+1', 'x+1', 'x-1', 'x'] },
        { d1: ['x-2'], d2: ['x+5', 'x-2'], chips: ['x-2', 'x-2', 'x+5', 'x+2'] },
      ] }, 'Cada factor entra con la mayor potencia que aparece, y un factor que comparten no se repite: $x(x - 3)(x + 2)$; $x^2(x + 1)$; $(x + 1)^2(x - 1)$; y $(x - 2)(x + 5)$, porque el primer denominador ya está dentro del segundo.',
        { hint: 'Factor por factor: ¿cuántas veces aparece como máximo en un mismo denominador? Esa es la cantidad de copias.' }),
      play('amplifica-fraccion', 'Completa cada fracción al común denominador', { rounds: [
        { f1: ['3', ['x']], f2: ['2', ['x+4']], chips: ['x', 'x+4', 'x-4', '4'], sum: '\\dfrac{3(x + 4) + 2x}{x(x + 4)} = \\dfrac{5x + 12}{x(x + 4)}' },
        { f1: ['5', ['x+2']], f2: ['1', ['x-2']], chips: ['x-2', 'x+2', 'x', '2'], sum: '\\dfrac{5(x - 2) + (x + 2)}{(x + 2)(x - 2)} = \\dfrac{6x - 8}{x^2 - 4}' },
        { f1: ['x', ['x+1', 'x-1']], f2: ['2', ['x+1']], chips: ['x-1', 'x+1', 'x'], sum: '\\dfrac{x + 2(x - 1)}{(x + 1)(x - 1)} = \\dfrac{3x - 2}{x^2 - 1}' },
      ] }, 'Se multiplica arriba y abajo por el factor que le falta a cada denominador: eso es multiplicar por 1 y la fracción no cambia. Si una fracción ya tiene el común denominador, no se toca. Luego se suman los numeradores.',
        { hint: 'Compara cada denominador con el común: el factor que le falta es el que va arriba y abajo.' }),
      play('resta-fracciones', 'El menos de la resta va a todo el numerador', { rounds: [
        { A: ['3x', '+1'], B: ['x', '-4'], den: 'x + 2' }, { A: ['x^2'], B: ['x', '-6'], C: ['2x', '-1'], den: 'x - 3' }, { A: ['4x', '-2'], B: ['-x', '+5'], C: ['x'], den: '2x' },
      ] }, 'Al restar una fracción, el signo menos multiplica a todo su numerador; la que se suma queda igual: $3x + 1 - (x - 4) = 2x + 5$; $x^2 - (x - 6) + (2x - 1) = x^2 + x + 5$; $4x - 2 - (-x + 5) + x = 6x - 7$. Olvidar un término es el error más común.',
        { hint: 'Mira qué signo hay delante de cada paréntesis: solo el menos cambia los signos, y los cambia todos.' }),
      play('multiplica-cancela', 'Multiplica y cancela cruzado', { rounds: [
        { top: ['x', 'x+5'], bottom: ['x+5', '3', 'x'] }, { top: ['x-4', 'x+1'], bottom: ['x+1', 'x+4', 'x-4'] }, { top: ['x', 'x', 'x-3'], bottom: ['x-3', 'x', '5'] },
      ] }, 'Al multiplicar fracciones todo lo de arriba queda multiplicando, y todo lo de abajo también: un factor de un numerador se cancela con uno igual de cualquier denominador. Quedan $\\dfrac{1}{3}$, $\\dfrac{1}{x + 4}$ y $\\dfrac{x}{5}$.',
        { hint: 'Busca parejas iguales: una arriba y otra abajo, sin importar de qué fracción venga cada una.' }),
      play('voltea-divide', 'Dividir es multiplicar por la recíproca', { rounds: [
        { a: ['x + 1', '4'], b: ['x + 1', '8'], res: '\\dfrac{(x + 1) \\cdot 8}{4 (x + 1)} = 2', wrong: '\\tfrac12' },
        { a: ['x^2', 'x - 2'], b: ['x', 'x - 2'], res: '\\dfrac{x^2 (x - 2)}{(x - 2)\\, x} = x', wrong: '\\tfrac1x' },
        { a: ['3', 'x + 5'], b: ['6', 'x(x + 5)'], res: '\\dfrac{3 \\cdot x(x + 5)}{(x + 5) \\cdot 6} = \\dfrac{x}{2}', wrong: '\\tfrac2x' },
        { a: ['x^2 - 1', '3'], b: ['x - 1', '1'], res: '\\dfrac{(x - 1)(x + 1)}{3 (x - 1)} = \\dfrac{x + 1}{3}', wrong: '\\tfrac{3}{x + 1}' },
      ] }, 'Dividir entre una fracción es multiplicar por la fracción volteada: $\\dfrac{a}{b} \\div \\dfrac{c}{d} = \\dfrac{a}{b} \\cdot \\dfrac{d}{c}$; se voltea solo el divisor. Una expresión sola es una fracción con 1 abajo: $x - 1 = \\tfrac{x - 1}{1}$. Después se cancelan los factores comunes.',
        { hint: 'Pregúntate cuál es el divisor: la fracción que va después del signo ÷. Solo esa cambia.' }),
      keep('alg-25b', 'llena-estanque')]);

    setLesson('alg-101', [
      play('dos-rectas', 'La solución es el punto de las dos rectas', { rounds: [
        { e1: [1, 1, 3], e2: [1, -1, -1] }, { e1: [2, 1, 1], e2: [1, -1, 5] }, { e1: [1, 2, -4], e2: [3, -1, 2] }, { e1: [1, 0, -3], e2: [1, 1, 1] },
      ] }, 'Cada ecuación es una recta: sus puntos la cumplen. El punto que cumple las dos está en las dos rectas, en su cruce: $(1, 2)$, $(2, -3)$, $(0, -2)$ y $(-3, 4)$. La ecuación $x = -3$ es una recta vertical.',
        { hint: 'Pon el punto sobre una de las rectas y deslízalo por ella hasta que la otra ecuación también se encienda.' }),
      keep('alg-101', 'afina-sistema'),
      play('elimina-variable', 'Suma las ecuaciones para que se vaya la y', { rounds: [
        { e1: [3, 2, 12], e2: [1, 1, 5] }, { e1: [2, -3, 1], e2: [1, 1, 3] }, { e1: [1, 4, 7], e2: [3, -2, 7] },
      ] }, 'Sumar a una ecuación otra multiplicada por un número no cambia la solución. Con $k = -2$, $3x + 2y - 2(x + y) = 12 - 10$ da $x = 2$; con $k = 3$, $5x = 10$; con $k = 2$, $7x = 21$ y $x = 3$.',
        { hint: 'La y se va cuando su coeficiente de la fila 1 y k veces el de la fila 2 son opuestos.' }),
      play('dos-compras', 'Dos recibos, los mismos precios', { rounds: [
        { names: ['cuaderno', 'lápiz'], e1: [2, 1, 11], e2: [1, 1, 7], max: 8 },
        { names: ['empanada', 'jugo'], e1: [3, 2, 12], e2: [1, 1, 5], max: 8 },
        { names: ['boleta', 'crispeta'], e1: [2, 3, 34], e2: [1, 2, 20], max: 10 },
      ] }, 'Cada recibo es una ecuación y los dos se cumplen a la vez. Entre $2a + b = 11$ y $a + b = 7$ la única diferencia es un cuaderno, que cuesta 4; el lápiz, 3. Luego empanada 2 y jugo 3; boleta 8 y crispeta 6.',
        { hint: 'Compara los dos recibos: ¿qué tiene de más uno que el otro, y cuánto más cuesta?' }),
      keep('alg-101', 'combina-vectores'),
      keep('alg-101', 'bote-corriente')]);

    setLesson('alg-102', [
      play('corte-parabola-recta', 'La recta que corta a la parábola', { rounds: [
        { a: 1, m: -1, x0: -3 }, { a: 1, m: -2, x0: 1 }, { a: 2, m: 2, x0: -1 }, { a: 1, m: 0, x0: 2 },
      ] }, 'En un corte las dos expresiones de $y$ valen lo mismo: al igualarlas queda una cuadrática. $x^2 = -x + 6$ da $x^2 + x - 6 = 0$, con cortes $-3$ y $2$; $x^2 = -2x + 3$, cortes $1$ y $-3$; $2x^2 = 2x + 4$, cortes $-1$ y $2$; $x^2 = 4$, cortes $\\pm 2$.',
        { hint: 'La recta debe pasar por el punto de la parábola en la línea punteada: su altura es a por x al cuadrado.' }),
      play('circulo-recta', 'Dos, uno o ningún corte', { rounds: [
        { R: 5, m: 0, want: 1 }, { R: 4, m: 0.75, want: 1 }, { R: 3, m: 1, want: 0 }, { R: 5, m: -0.75, want: 2 },
      ] }, 'Al sustituir la recta en el círculo queda una cuadrática: si su discriminante es positivo hay dos cortes, si es cero la recta solo toca el círculo y si es negativo no lo corta. La horizontal $y = 5$ toca a $x^2 + y^2 = 25$ en $(0, 5)$.',
        { hint: 'Mira el discriminante abajo: un solo corte es exactamente cero, cuando la recta apenas roza el círculo.' }),
      play('rectangulo-pa', 'Perímetro y área a la vez', { rounds: [{ P: 18, A: 20, max: 9 }, { P: 20, A: 21, max: 9 }, { P: 16, A: 15, max: 8 }] },
        'Pedir perímetro y área es un sistema no lineal: $x + y = 9$ y $xy = 20$ dan $x^2 - 9x + 20 = 0$, lados 4 y 5. Igual: 3 y 7; 3 y 5. Muchos rectángulos tienen el perímetro pedido, pero solo uno tiene además el área.',
        { hint: 'Primero consigue el perímetro; luego desliza la esquina sin cambiarlo (lo que gana un lado lo pierde el otro) hasta el área.' }),
      play('parciales-tapar', 'Fracciones parciales: iguala los numeradores', { rounds: [{ p: 2, q: -1, c: 2, d: 5 }, { p: 3, q: -2, c: 1, d: 7 }, { p: 1, q: 4, c: 2, d: 1 }] },
        'Al juntar $\\dfrac{A}{x - p} + \\dfrac{B}{x - q}$ el numerador es $A(x - q) + B(x - p)$. Igualar el coeficiente de $x$ y el número suelto da un sistema: $A = 3$, $B = -1$; $A = 2$, $B = -1$; $A = -1$, $B = 3$.',
        { hint: 'La barra de x pide A + B; la del número depende de los dos de otra manera. Ajusta uno y corrige con el otro.' }),
      play('tapa-evalua', 'Tapa un factor y evalúa', { rounds: [
        { num: [1, 9], ps: [3, -3] }, { num: [3, 9], ps: [-1, -4] }, { num: [1, -4], ps: [0, 1, -2] },
      ] }, 'Para hallar el numerador de $\\dfrac{A}{x - p}$ se tapa $x - p$ en la fracción original y lo que queda se evalúa en $x = p$: $\\dfrac{3 + 9}{3 + 3} = 2$. Funciona porque, al multiplicar todo por $x - p$ y poner $x = p$, las demás fracciones se anulan.',
        { hint: 'Cada factor se tapa con el número que lo vuelve cero: cuidado con el signo dentro del paréntesis.' }),
      keep('alg-102', 'cruce-curvas')]);

    setExam('racionales', [
      ['alg-25a', 'Los valores prohibidos son los que anulan el denominador.',
        play('prohibidos', 'Tacha los valores prohibidos', { rounds: [{ tex: '\\dfrac{x + 1}{x^2 - 25}', bad: [5, -5] }] }, '$x^2 - 25 = (x - 5)(x + 5)$: se excluyen $5$ y $-5$.', { hint: 'Factoriza el denominador.' })],
      ['alg-25a', 'La fracción vale la meta cuando el numerador es la meta veces el denominador.',
        play('evalua-racional', 'Busca el x', { rounds: [{ n: [1, 1], d: [1, -3], target: 3 }] }, '$\\dfrac{5 + 1}{5 - 3} = 3$.', { hint: 'Compara las barras.' })],
      ['alg-25b', 'El común denominador lleva cada factor con su mayor potencia.',
        play('denominador-comun', 'Arma el común denominador', { rounds: [{ d1: ['x', 'x+6'], d2: ['x+6', 'x-5'], chips: ['x', 'x+6', 'x-5', 'x-6'] }] }, '$x(x + 6)(x - 5)$.', { hint: 'El factor compartido va una vez.' })],
      ['alg-25b', 'Al restar, el menos cambia el signo de todo el numerador.',
        play('resta-fracciones', 'Resta y suma', { rounds: [{ A: ['2x'], B: ['x', '-3'], C: ['-x', '+4'], den: 'x + 1' }] }, '$2x - (x - 3) + (-x + 4) = 7$.', { hint: 'Solo el menos cambia signos.' })],
      ['alg-101', 'La solución de un sistema está en el cruce de las rectas.',
        play('dos-rectas', 'Busca el cruce', { rounds: [{ e1: [1, 1, 4], e2: [2, -1, 5] }] }, 'El punto $(3, 1)$ cumple las dos.', { hint: 'Desliza el punto por una recta.' })],
      ['alg-101', 'Sumando un múltiplo de una ecuación se elimina una incógnita.',
        play('elimina-variable', 'Elimina la y', { rounds: [{ e1: [4, 3, 10], e2: [1, 1, 3] }] }, 'Con $k = -3$: $x = 1$, y luego $y = 2$.', { hint: 'Coeficientes de y opuestos.' })],
      ['alg-102', 'En los cortes de dos curvas las dos expresiones de y son iguales.',
        play('corte-parabola-recta', 'Corta la parábola', { rounds: [{ a: 1, m: 1, x0: -2 }] }, '$x^2 = x + 6$: cortes en $-2$ y $3$.', { hint: 'Pasa por el punto marcado.' })],
      ['alg-102', 'Cada fracción parcial sale de igualar los numeradores.',
        play('parciales-tapar', 'Halla A y B', { rounds: [{ p: 4, q: -1, c: 3, d: -2 }] }, '$A = 2$, $B = 1$.', { hint: 'La barra de x pide A + B.' })],
    ]);
  }
  // ───────── Mundo 10 · Crecimiento Exponencial ─────────
  {
    setLesson('alg-71', [
      play('ajusta-exponencial', 'La curva exponencial por dos puntos', { rounds: [
        { a: 2, b: 3, pts: [[0, 2], [1, 6]] }, { a: 5, b: 0.5, pts: [[0, 5], [1, 2.5]] }, { a: 3, b: 2, pts: [[1, 6], [2, 12]] }, { a: 4, b: 0.25, pts: [[-1, 16], [0, 4]] },
      ] }, 'En $y = a \\cdot b^x$, $a$ es la altura en $x = 0$ y $b$ es el factor por el que se multiplica la altura en cada paso a la derecha: de 2 a 6 se multiplica por 3; de 5 a 2.5, por $\\tfrac12$. Si no está el punto de $x = 0$, se retrocede un paso dividiendo: $6 \\div 2 = 3$.',
        { hint: 'Divide la altura de un punto entre la del punto anterior: ese cociente es b. La altura en x = 0 es a.' }),
      keep('alg-71', 'proyector-sombras'),
      play('mueve-asintota', 'Corre la exponencial y su asíntota', { rounds: [
        { b: 2, h: 1, k: -3 }, { b: 2, h: -2, k: 2 }, { b: 0.5, h: 0, k: 1 }, { b: 3, h: 1, k: -4 },
      ] }, '$y = b^{x - h} + k$ es $b^x$ corrida $h$ a la derecha y $k$ hacia arriba. Su asíntota horizontal sube con ella: queda en $y = k$. El punto $(0, 1)$ de $b^x$ pasa a $(h, k + 1)$.',
        { hint: 'Primero sube o baja hasta que la curva tenga la forma de los puntos; luego córrela a los lados.' }),
      play('mitad-espejo', 'Base menor que 1: el reflejo', { rounds: [{ b: 2, target: 8 }, { b: 3, target: 9 }, { b: 2, target: 0.25 }, { b: 2, target: 32 }] },
        '$\\left(\\tfrac1b\\right)^x = b^{-x}$: la curva de base $\\tfrac1b$ es el reflejo de $b^x$ en el eje $y$ y decrece. Para pasar de 1 hay que ir a la izquierda: $\\left(\\tfrac12\\right)^{-3} = 2^3 = 8$, $\\left(\\tfrac13\\right)^{-2} = 9$; en cambio $\\left(\\tfrac12\\right)^{2} = \\tfrac14$.',
        { hint: 'Un exponente negativo voltea la fracción. Mira la curva clara: su reflejo te dice dónde está la altura pedida.' }),
      play('hacia-e', 'Repartir el interés: el número e', { rounds: [{ target: 2.5 }, { target: 2.65 }, { target: 2.7 }] },
        'Con el 100 % anual pagado en $n$ partes, un peso se vuelve $\\left(1 + \\tfrac1n\\right)^n$: 2 con un pago, 2.25 con dos, 2.59 con diez, 2.705 con cien. Crece, pero cada vez menos, y nunca pasa de $e \\approx 2.718$.',
        { hint: 'Desliza n y mira cómo se frena la barra: entre más pagos, menos gana cada pago nuevo.' }),
      keep('alg-71', 'lirios-laguna')]);

    setLesson('alg-13b', ['crece-planta', 'carrera-interes', 'ajusta-capital', 'mejor-oferta', 'alcancias-gemelas', 'dos-bancos'].map(g => keep('alg-13b', g)));

    setLesson('alg-72', [
      play('exponente-buscado', 'El logaritmo es un exponente', { rounds: [{ b: 2, N: 64 }, { b: 3, N: 81 }, { b: 10, N: 0.001 }, { b: 5, N: 1 }] },
        '$\\log_b N$ es cuántas veces hay que multiplicar por $b$ para pasar de 1 a $N$: $2^6 = 64$, $3^4 = 81$. Si $N$ es menor que 1 hay que dividir: $10^{-3} = 0.001$. Y $\\log_5 1 = 0$, porque sin multiplicar se queda en 1.',
        { hint: 'Empieza en 1 y multiplica por la base hasta llegar al número; si el número es menor que 1, divide.' }),
      keep('alg-72', 'espejo-diagonal'),
      play('entre-potencias10', 'El logaritmo decimal cuenta cifras', { rounds: [
        { N: 1024, tex: '2^{10}' }, { N: 16807, tex: '7^{5}' }, { N: 0.05, tex: '0.05' }, { N: 1048576, tex: '2^{20}' },
      ] }, 'Si $10^k \\le N < 10^{k + 1}$, el logaritmo de $N$ está entre $k$ y $k + 1$, y $N$ tiene $k + 1$ cifras antes de la coma: $2^{10} = 1024$ (4 cifras, $\\log \\approx 3.01$); $7^5 = 16\\,807$; $0.05$ está entre $10^{-2}$ y $10^{-1}$; $2^{20}$ pasa del millón.',
        { hint: 'Cuenta las cifras del número antes de la coma; para un decimal, mira cuántas posiciones tiene detrás.' }),
      play('expande-log', 'Abre el logaritmo en una suma', { rounds: [
        { tex: '\\log \\dfrac{x^2 y}{z}', parts: [['x', 2], ['y', 1], ['z', -1]], tray: [-2, -1, 0.5, 1, 2, 3] },
        { tex: '\\log \\dfrac{\\sqrt{x}}{y^3}', parts: [['x', 0.5], ['y', -3]], tray: [-3, -0.5, 0.5, 1, 3] },
        { tex: '\\log_2 (8x^4)', base: 2, parts: [['8', 1], ['x', 4]], tray: [1, 2, 3, 4, 8] },
        { tex: '\\log \\dfrac{1}{x\\,y^2}', parts: [['x', -1], ['y', -2]], tray: [-2, -1, 0.5, 1, 2] },
      ] }, 'El logaritmo de un producto es la suma de los logaritmos; el de un cociente, la resta; y un exponente baja como factor: $\\log \\dfrac{x^2 y}{z} = 2\\log x + \\log y - \\log z$. Una raíz cuadrada es el exponente $\\tfrac12$. Y $\\log_2 8 = 3$.',
        { hint: 'Lo que está abajo de la fracción entra restando; el exponente de cada letra pasa a multiplicar.' }),
      play('cabe-barra', 'Cambio de base: cuántas veces cabe', { rounds: [{ b: 4, a: 64 }, { b: 9, a: 27 }, { b: 2, a: 32 }, { b: 25, a: 5 }] },
        '$\\log_b a = \\dfrac{\\log a}{\\log b}$: cuántas barras de $\\log b$ caben en la de $\\log a$. $\\log_4 64 = 3$; $\\log_9 27 = \\tfrac32$, porque $9^{1.5} = 27$; $\\log_{25} 5 = \\tfrac12$, porque $\\sqrt{25} = 5$. Así se calcula cualquier base con la tecla log.',
        { hint: 'Pon copias de la barra de abajo hasta igualar el largo de la de arriba; puede caber media barra.' }),
      keep('alg-72', 'regla-de-calculo')]);

    setLesson('alg-73', [keep('alg-73', 'balanza-exponencial'),
      play('baja-con-log', 'Cuando las bases no coinciden: logaritmo', { rounds: [{ b: 5, N: 20, max: 4 }, { b: 2, N: 10, max: 6 }, { b: 1.05, N: 2, max: 20 }] },
        'Si no se puede escribir con la misma base, se toma logaritmo a los dos lados: $x \\log b = \\log N$, y se divide entre $\\log b$. $5^x = 20$ da $x \\approx 1.86$; $2^x = 10$, $x \\approx 3.32$; y al 5 % el dinero se duplica en $x \\approx 14.2$ periodos.',
        { hint: 'Con logaritmos la potencia se vuelve un producto: busca la x donde la barra que crece alcanza a la fija.' }),
      play('sube-al-exponente', 'Del logaritmo a la potencia', { rounds: [{ b: 2, k: -1, c: 3 }, { b: 3, k: 4, c: 2 }, { b: 5, k: -5, c: 1 }, { b: 2, k: 3, c: -1 }] },
        '$\\log_b(x + k) = c$ quiere decir $x + k = b^c$: $x - 1 = 8$, $x = 9$; $x + 4 = 9$, $x = 5$; $x - 5 = 5$, $x = 10$; $x + 3 = \\tfrac12$, $x = -2.5$. La solución debe dejar positivo lo de adentro del logaritmo.',
        { hint: 'Escribe la ecuación como potencia: la base del logaritmo elevada al otro lado es lo de adentro.' }),
      play('media-vida', 'La vida media', { rounds: [
        { A0: 200, T: 5, target: 25, thing: 'cafeína', unit: 'mg' }, { A0: 80, T: 8, target: 5, thing: 'un medicamento', unit: 'mg' }, { A0: 1000, T: 2, target: 62.5, thing: 'cloro', unit: 'g' },
      ] }, 'Cada vida media la cantidad se divide entre 2: $200 \\to 100 \\to 50 \\to 25$ en 3 vidas medias, 15 horas. En general $A_0\\left(\\tfrac12\\right)^{t/T} = A$ da $t = T \\log_2 \\tfrac{A_0}{A}$.',
        { hint: 'Cuenta cuántas veces hay que partir por la mitad la cantidad inicial para llegar a la pedida.' }),
      play('cambio-u', 'La incógnita escondida: u = aˣ', { rounds: [{ a: 2, p: -6, q: 8 }, { a: 3, p: -4, q: 3 }, { a: 2, p: -1, q: -2 }] },
        'Con $u = a^x$ la ecuación queda $u^2 + pu + q = 0$. $u^2 - 6u + 8 = 0$ da $u = 2$ y $u = 4$: $x = 1$ y $x = 2$. $u^2 - 4u + 3 = 0$: $u = 1$ ($x = 0$) y $u = 3$ ($x = 1$). En $u^2 - u - 2 = 0$ el cero $u = -1$ no sirve: $2^x$ nunca es negativo.',
        { hint: 'Busca dónde la parábola corta el eje u, pero recuerda que una potencia de base positiva nunca es negativa.' }),
      keep('alg-73', 'piedras-selva')]);

    setExam('exp-log', [
      ['alg-71', 'En y = a·bˣ, a es la altura en x = 0 y b el factor de cada paso.',
        play('ajusta-exponencial', 'Curva por dos puntos', { rounds: [{ a: 2, b: 4, pts: [[0, 2], [1, 8]] }] }, '$y = 2 \\cdot 4^x$.', { hint: 'Divide las alturas.' })],
      ['alg-71', 'Una base menor que 1 refleja la curva: (1/b)ˣ = b⁻ˣ.',
        play('mitad-espejo', 'Base menor que 1', { rounds: [{ b: 3, target: 27 }] }, '$\\left(\\tfrac13\\right)^{-3} = 27$.', { hint: 'Exponente negativo.' })],
      ['alg-13b', 'En el interés compuesto cada periodo gana sobre lo ya ganado.',
        play('crece-planta', 'Haz crecer la planta', { rounds: [{ kind: 'compuesto', C: 800, M1: 880, step: 1 }] }, 'Cada mes se multiplica por 1.1: $880$, $968$, $1064.8$.', { hint: 'Compuesto multiplica.' })],
      ['alg-13b', 'Una tasa simple que iguale a la compuesta debe ser mayor.',
        play('alcancias-gemelas', 'Alcancías gemelas', { tol: 0.06, max: 40, rounds: [{ C: 1000, r: 30, n: 2 }] }, '$1000 \\cdot 1.3^2 = 1690$: la simple necesita $34.5\\,\\%$.', { hint: 'Mayor que 30 %.' })],
      ['alg-72', 'El logaritmo es el exponente que lleva la base al número.',
        play('exponente-buscado', 'Busca el exponente', { rounds: [{ b: 4, N: 0.0625 }] }, '$4^{-2} = \\tfrac{1}{16}$.', { hint: 'Divide entre 4.' })],
      ['alg-72', 'Productos se vuelven sumas y exponentes, factores.',
        play('expande-log', 'Abre el logaritmo', { rounds: [{ tex: '\\log (x^3 y)', parts: [['x', 3], ['y', 1]], tray: [-1, 1, 2, 3] }] }, '$3\\log x + \\log y$.', { hint: 'El exponente baja.' })],
      ['alg-73', 'log_b(x + k) = c quiere decir x + k = bᶜ.',
        play('sube-al-exponente', 'Del logaritmo a la potencia', { rounds: [{ b: 3, k: -2, c: 2 }] }, '$x - 2 = 9$: $x = 11$.', { hint: 'Pasa a potencia.' })],
      ['alg-73', 'Con bases distintas se toma logaritmo a los dos lados.',
        play('baja-con-log', 'Resuelve', { rounds: [{ b: 3, N: 50, max: 5 }] }, '$x = \\dfrac{\\log 50}{\\log 3} \\approx 3.56$.', { hint: 'Iguala las barras.' })],
    ]);
  }
  // ───────── Séptimo juego de las lecciones que tenían seis (pedido del 2026-11-18) ─────────
  {
    // Entra antes del juego en movimiento, que sigue siendo el último.
    const add7 = (id, ex) => { const l = L(id); l.ex.splice(l.ex.length - 1, 0, { ...ex, canvasGuide: true, motion: false }); };
    add7('alg-12', play('tasa-unitaria', 'Compara precios por unidad', { rounds: [
      { names: ['paquete A', 'paquete B'], packs: [[6, 9000], [4, 7200]], step: 100, max: 2500 },
      { names: ['paquete A', 'paquete B'], packs: [[12, 18000], [8, 10400]], step: 100, max: 2500 },
      { names: ['paquete A', 'paquete B'], packs: [[3, 4500], [5, 8000]], step: 100, max: 2500 },
    ] }, 'Para comparar paquetes de distinto tamaño se divide: precio ÷ unidades. $9000 \\div 6 = 1500$ frente a $7200 \\div 4 = 1800$; $18\\,000 \\div 12 = 1500$ frente a $10\\,400 \\div 8 = 1300$; $1500$ frente a $1600$. El paquete más grande no siempre es el más barato.',
      { hint: 'Las copias del precio unitario deben llenar la barra del paquete exactamente: ni sobra ni falta.' }));
    add7('alg-12f', play('tabla-compuesta', 'Regla de tres compuesta: reduce a la unidad', { rounds: [
      { who: 'hornos', what: 'panes', m1: 2, h1: 3, c1: 1200, m2: 3, h2: 5, step: 50, max: 500 },
      { who: 'pintores', what: 'paredes', m1: 4, h1: 2, c1: 16, m2: 6, h2: 3, step: 1, max: 10 },
      { who: 'bombas', what: 'litros', m1: 5, h1: 2, c1: 3000, m2: 2, h2: 7, step: 50, max: 500 },
    ] }, 'Si el resultado es proporcional a dos magnitudes, se busca lo que hace una unidad de cada una: $1200 \\div (2 \\cdot 3) = 200$ panes por horno y hora, y $200 \\cdot 3 \\cdot 5 = 3000$. Luego $16 \\div 8 = 2$ y $2 \\cdot 18 = 36$; $3000 \\div 10 = 300$ y $300 \\cdot 14 = 4200$.',
      { hint: 'Cada casilla es un trabajador durante una hora; reparte el total conocido entre todas las casillas.' }));
    add7('alg-13', play('estira-todo', '¿De qué número es ese porcentaje?', { rounds: [
      { part: 15, p: 25, step: 5, max: 150 }, { part: 9, p: 12, step: 5, max: 150 }, { part: 36, p: 120, step: 5, max: 150 }, { part: 14, p: 35, step: 5, max: 150 },
    ] }, 'Si la parte es el $p\\,\\%$ del total, el total es parte $\\div p \\cdot 100$: $15 \\div 25 \\cdot 100 = 60$, $9 \\div 12 \\cdot 100 = 75$, $36 \\div 120 \\cdot 100 = 30$ y $14 \\div 35 \\cdot 100 = 40$. Si el porcentaje pasa de 100, la parte es mayor que el total.',
      { hint: 'Estira el total hasta que la marca del porcentaje caiga sobre la parte: la barra entera es el 100 %.' }));
    add7('alg-13c', play('oferta-lleve', '«Lleve tantos, pague menos» en porcentaje', { rounds: [{ take: 5, pay: 4 }, { take: 4, pay: 3 }, { take: 2, pay: 1 }, { take: 10, pay: 7 }] },
      'En «lleve $n$, pague $m$» se regalan $n - m$ de cada $n$: el descuento es $\\tfrac{n - m}{n}$. Lleve 5 pague 4: $\\tfrac15 = 20\\,\\%$; 4 por 3: $25\\,\\%$; 2 por 1: $50\\,\\%$; 10 por 7: $30\\,\\%$.',
      { hint: 'El descuento es la parte que no se paga comparada con todo lo que te llevas.' }));
    add7('alg-13d', play('puntos-o-porciento', 'Puntos porcentuales o por ciento', { rounds: [
      { what: 'El desempleo', from: 20, to: 25 }, { what: 'La humedad', from: 40, to: 30 }, { what: 'La aprobación', from: 10, to: 15 }, { what: 'La tasa', from: 50, to: 60 },
    ] }, 'La diferencia entre dos porcentajes se mide en puntos; el cambio relativo, sobre el valor de antes: de 20 % a 25 % son 5 puntos, pero $\\tfrac{5}{20} = 25\\,\\%$ de aumento. De 40 a 30: $-25\\,\\%$; de 10 a 15: $+50\\,\\%$; de 50 a 60: $+20\\,\\%$.',
      { hint: 'Compara la diferencia con el valor de antes, no con 100.' }));

    add7('alg-21a', play('ubica-potencias', 'Ubica las potencias en la recta', { rounds: [
      { chips: [['2^5', 32], ['3^3', 27], ['5^2', 25], ['4^3', 64]], max: 70, snap: 1 },
      { chips: [['2^{-1}', 0.5], ['3^0', 1], ['10^{-1}', 0.1], ['2^1', 2]], max: 2.5, snap: 0.1 },
    ] }, 'Para comparar potencias hay que calcularlas: $2^5 = 32$ pasa a $5^2 = 25$ aunque su base sea menor, y $4^3 = 64$ queda lejos. Un exponente 0 da 1 y uno negativo da una fracción: $2^{-1} = \\tfrac12$, $10^{-1} = 0.1$.',
      { hint: 'Calcula cada potencia multiplicando la base tantas veces como dice el exponente; un exponente negativo divide.' }));
    add7('alg-21b', play('reparte-exponente', 'El exponente le llega a cada factor', { rounds: [{ a: 2, b: 5, n: 3 }, { a: 3, b: 2, n: 2 }, { a: 6, b: 2, n: 3, div: true }, { a: 2, b: 3, n: 4 }] },
      '$(a \\cdot b)^n = a^n \\cdot b^n$ porque al repetir el producto $n$ veces cada factor aparece $n$ veces: $(2 \\cdot 5)^3 = 2^3 \\cdot 5^3 = 1000$. Con un cociente pasa igual: $(6 \\div 2)^3 = 6^3 \\div 2^3 = 27$.',
      { hint: 'Escribe la potencia como el producto repetido y cuenta cuántas veces aparece cada factor.' }));
    add7('alg-22a', play('lado-cubo', 'La raíz cúbica es el lado del cubo', { rounds: [{ V: 27 }, { V: 125 }, { V: 64 }, { V: 8 }] },
      '$\\sqrt[3]{V}$ es el lado del cubo de volumen $V$: $3^3 = 27$, $5^3 = 125$, $4^3 = 64$ y $2^3 = 8$.',
      { hint: 'Cuenta los cubitos de una capa y multiplícalos por el número de capas.' }));
    add7('alg-22b', play('indice-radical', 'Simplifica el índice', { rounds: [{ n0: 6, m0: 8, n: 2, m: 2 }, { n0: 4, m0: 9, n: 2, m: 3 }, { n0: 6, m0: 25, n: 3, m: 5 }, { n0: 9, m0: 27, n: 3, m: 3 }] },
      'Si el radicando es una potencia, índice y exponente se dividen entre lo mismo: $\\sqrt[6]{8} = \\sqrt[6]{2^3} = 2^{3/6} = \\sqrt{2}$; $\\sqrt[4]{9} = \\sqrt[4]{3^2} = \\sqrt3$; $\\sqrt[6]{25} = \\sqrt[3]{5}$; $\\sqrt[9]{27} = \\sqrt[3]{3}$.',
      { hint: 'Escribe el radicando como potencia de un número primo y simplifica la fracción exponente.' }));

    add7('alg-14', play('arregla-termino', 'Un término rompe la progresión', { rounds: [
      { terms: [3, 7, 11, 16, 19], fix: [3, 15] }, { terms: [20, 17, 13, 11, 8], fix: [2, 14] }, { terms: [-5, -2, 1, 4, 8], fix: [4, 7] }, { terms: [2, 8, 10, 14, 18], fix: [1, 6] },
    ] }, 'En una progresión aritmética la diferencia es constante. En $3, 7, 11, 16, 19$ casi todas son $+4$: el cuarto debía ser 15. Luego $-3$ pide 14; $+3$ pide 7; y $+4$ pide 6 en el segundo lugar.',
      { hint: 'Busca la diferencia que más se repite; el término mal es el que tiene diferencias raras a sus dos lados.' }));
    add7('alg-14b', play('suma-impares', 'La suma de los impares es un cuadrado', { rounds: [{ S: 49 }, { S: 36 }, { S: 81 }, { S: 100 }] },
      'Cada impar es una escuadra que agranda el cuadrado: $1 + 3 + \\dots + (2n - 1) = n^2$. Con 7 impares la suma es 49; con 6, 36; con 9, 81; con 10, 100. Es la suma aritmética: $n \\cdot \\tfrac{1 + (2n - 1)}{2} = n^2$.',
      { hint: 'Mira la forma: con n escuadras tienes un cuadrado de lado n.' }));
    add7('alg-14c', play('zigzag-razon', 'Razón negativa o menor que 1', { rounds: [{ a: 1, r: -2 }, { a: 8, r: -0.5 }, { a: 2, r: -1 }, { a: 1, r: 3 }] },
      'La razón es cada término dividido entre el anterior: $-2 \\div 1 = -2$ (los signos se alternan), $-4 \\div 8 = -\\tfrac12$ (se alternan y se achican), $-2 \\div 2 = -1$ (vaivén) y $3 \\div 1 = 3$.',
      { hint: 'Divide un término entre el anterior; el signo del cociente dice si la cadena hace zigzag.' }));
    add7('alg-14d', play('periodico-serie', 'El decimal periódico es una serie', { rounds: [{ block: '3' }, { block: '45' }, { block: '12' }, { block: '6' }] },
      '$0.\\overline{45} = \\tfrac{45}{100} + \\tfrac{45}{100^2} + \\dots$ es geométrica de razón $\\tfrac1{100}$: suma $\\tfrac{45/100}{1 - 1/100} = \\tfrac{45}{99} = \\tfrac{5}{11}$. Igual: $0.\\overline3 = \\tfrac13$, $0.\\overline{12} = \\tfrac{4}{33}$, $0.\\overline6 = \\tfrac23$.',
      { hint: 'El bloque que se repite va sobre tantos nueves como cifras tenga; luego simplifica.' }));
    add7('alg-15', play('producto-telescopico', 'Productoria telescópica', { rounds: [{ kind: 'up', target: 6 }, { kind: 'down', target: 0.125 }, { kind: 'up', target: 11 }] },
      'En $\\prod \\tfrac{k + 1}{k}$ cada numerador se cancela con el denominador siguiente y quedan los extremos: $\\tfrac{n + 1}{1}$. En $\\prod_{k = 2}^{n} \\tfrac{k - 1}{k}$ queda $\\tfrac1n$.',
      { hint: 'Escribe los primeros factores y tacha lo que se repite arriba y abajo: ¿qué sobrevive?' }));

    add7('alg-23a', play('monomio-area', 'El producto de monomios es un área', { rounds: [{ f: [[3, 1], [2, 2]] }, { f: [[4, 2], [5, 1]] }, { f: [[2, 3], [4, 2]] }, { f: [[3, 1], [3, 1]] }] },
      'Los números se multiplican y los exponentes de la misma letra se suman: $3x \\cdot 2x^2 = 6x^3$, $4x^2 \\cdot 5x = 20x^3$, $2x^3 \\cdot 4x^2 = 8x^5$, $3x \\cdot 3x = 9x^2$.',
      { hint: 'Separa: primero el producto de los números, después cuántas x quedan multiplicándose en total.' }));
    add7('alg-3', play('cubo-del-binomio', 'El cubo de un binomio', { rounds: [{ b: 1 }, { b: 2 }, { b: 3 }] },
      'El cubo de arista $x + b$ se parte en un cubo $x^3$, tres losas $b x^2$, tres barras $b^2 x$ y un cubito $b^3$: $(x + 2)^3 = x^3 + 6x^2 + 12x + 8$.',
      { hint: 'Hay tres losas iguales y tres barras iguales: cada coeficiente es 3 por el área o el largo de una pieza.' }));
    add7('alg-24c', play('elige-comite', 'Comités: los números de Pascal', { rounds: [{ n: 4, ways: 6 }, { n: 5, ways: 10 }, { n: 6, ways: 15 }, { n: 7, ways: 35 }] },
      'Cada persona es un paréntesis $(1 + x)$: entra al comité (se toma la $x$) o no. Las maneras de escoger $k$ entre $n$ son $\\binom{n}{k}$, un número de la fila $n$ de Pascal: $\\binom42 = 6$, $\\binom52 = 10$, $\\binom62 = 15$, $\\binom73 = 35$. Escoger a $k$ es lo mismo que dejar por fuera a $n - k$.',
      { hint: 'Busca el número en la fila del triángulo de Pascal que corresponde al número de personas.' }));
    add7('alg-24b', play('parte-medio', 'Parte el término del medio', { rounds: [{ a: 2, b: 7, c: 3 }, { a: 3, b: -1, c: -2 }, { a: 6, b: 5, c: 1 }, { a: 2, b: -5, c: 2 }] },
      'Se buscan $m$ y $n$ con $m + n = b$ y $mn = ac$: $2x^2 + 7x + 3$ pide $6$ y $1$, y $2x^2 + 6x + x + 3 = (2x + 1)(x + 3)$. Luego $-3, 2$; $3, 2$; $-4, -1$.',
      { hint: 'Primero multiplica a por c; luego busca entre los divisores de ese número dos que sumen b.' }));

    add7('alg-23c', play('cuadrado-complejo', 'La raíz cuadrada de un complejo', { rounds: [{ t: [-4, 0] }, { t: [0, 2] }, { t: [3, 4] }, { t: [-5, 12] }] },
      'Al elevar $a + bi$ al cuadrado sale $a^2 - b^2 + 2ab\\,i$: el ángulo se duplica y el módulo se eleva al cuadrado. Así $(2i)^2 = -4$, $(1 + i)^2 = 2i$, $(2 + i)^2 = 3 + 4i$ y $(2 + 3i)^2 = -5 + 12i$. El opuesto también sirve.',
      { hint: 'El módulo de z debe ser la raíz del módulo de la estrella, y su ángulo la mitad.' }));
    add7('alg-1', play('edades-barras', 'Un problema de edades', { rounds: [{ k1: 3, L: 10, k2: 2 }, { k1: 4, L: 6, k2: 2 }, { k1: 5, L: 4, k2: 3 }, { k1: 3, L: 12, k2: 2 }] },
      'Con $x$ la edad del hijo: $3x + 10 = 2(x + 10)$ da $x = 10$. Luego $4x + 6 = 2(x + 6)$, $x = 3$; $5x + 4 = 3(x + 4)$, $x = 4$; $3x + 12 = 2(x + 12)$, $x = 12$. Los dos envejecen lo mismo.',
      { hint: 'La primera condición ya la cumple la barra; mueve la edad hasta que también se cumpla la segunda.' }));
    add7('alg-4a', play('tres-puntos', 'La parábola por tres puntos', { rounds: [{ a: 1, b: -2, c: -3, xs: [-1, 0, 3] }, { a: -1, b: 2, c: 3, xs: [0, 1, 3] }, { a: 2, b: 0, c: -4, xs: [0, 1, 2] }] },
      'Tres puntos con $x$ distintas fijan una sola parábola. El punto con $x = 0$ da $c$ directamente; los otros dos dan un sistema para $a$ y $b$: $y = x^2 - 2x - 3$, $y = -x^2 + 2x + 3$ y $y = 2x^2 - 4$.',
      { hint: 'Empieza por c: es la altura del punto que está sobre el eje y.' }));
    add7('alg-4', play('vieta-raices', 'Suma y producto de las raíces', { rounds: [{ S: 5, P: 6 }, { S: -1, P: -6 }, { S: 0, P: -9 }, { S: -4, P: 4 }] },
      'Si $x^2 - Sx + P = (x - r_1)(x - r_2)$, entonces $r_1 + r_2 = S$ y $r_1 r_2 = P$: raíces 2 y 3; $-3$ y 2; $3$ y $-3$; y $-2$ doble.',
      { hint: 'Con producto negativo las raíces tienen signos distintos; con suma cero son opuestas.' }));

    add7('alg-23b', play('reparte-terminos', 'Divide término a término', { rounds: [
      { terms: ['6x^3', '+4x^2', '-2x'], d: '2x', ans: ['3x^2', '+2x', '-1'], tray: ['3x^2', '+2x', '-1', '3x^3', '+2x^2', '-x'] },
      { terms: ['9x^4', '-3x^2'], d: '3x^2', ans: ['3x^2', '-1'], tray: ['3x^2', '-1', '6x^2', '-x', '3x^6'] },
      { terms: ['10x^5', '+5x^3', '+15x'], d: '5x', ans: ['2x^4', '+x^2', '+3'], tray: ['2x^4', '+x^2', '+3', '2x^5', '+x^3', '+3x'] },
    ] }, 'Un divisor monomio reparte: cada término se divide por separado, números entre números y exponentes que se restan: $\\tfrac{6x^3}{2x} = 3x^2$, $\\tfrac{-2x}{2x} = -1$. Un término igual al divisor da 1, no 0.',
      { hint: 'En cada término: divide los números y resta el exponente del divisor al del término.' }));
    add7('alg-92', play('divisor-fraccion', 'Dividir entre ax − b', { rounds: [{ P: [2, -1, 3, -1], a: 2, b: 1 }, { P: [4, 0, -1, 5], a: 2, b: -1 }, { P: [1, 2, 0, -3], a: 1, b: 2 }] },
      'El residuo de dividir entre $ax - b$ es $P\\left(\\tfrac ba\\right)$: el número que anula el divisor. Entre $2x - 1$ se evalúa en $\\tfrac12$ y el residuo es $0.5$; entre $2x + 1$, en $-\\tfrac12$ (residuo 5); entre $x - 2$, en 2 (residuo 13).',
      { hint: 'Busca el valor de x que hace cero al divisor completo, con su coeficiente incluido.' }));
    add7('alg-93', play('ceros-fraccion', 'Ceros que son fracciones', { rounds: [{ P: [2, -3, -3, 2], zeros: [-1, 0.5, 2] }, { P: [2, -1, -1], zeros: [-0.5, 1] }, { P: [4, 0, -1], zeros: [-0.5, 0.5] }] },
      'Un cero racional $\\tfrac pq$ tiene $p$ divisor del término independiente y $q$ divisor del coeficiente principal; por eso con 2 o 4 adelante aparecen mitades: $2x^3 - 3x^2 - 3x + 2 = (x + 1)(2x - 1)(x - 2)$.',
      { hint: 'Prueba enteros y mitades: si el primer coeficiente es 2 o 4, los ceros pueden ser medios.' }));

    add7('alg-25a', play('signo-afuera', 'Factores opuestos', { rounds: [
      { top: ['2-x'], bottom: ['x-2'], pairs: [[0, 0]], res: '-1' },
      { top: ['x+3', '5-x'], bottom: ['x-5', 'x'], pairs: [[1, 0]], res: '-\\dfrac{x+3}{x}' },
      { top: ['x-4'], bottom: ['4-x', 'x+1'], pairs: [[0, 0]], res: '-\\dfrac{1}{x+1}' },
      { top: ['3-x', 'x+2'], bottom: ['x+2', 'x-3'], pairs: [[0, 1]], res: '-1' },
    ] }, '$a - b$ y $b - a$ son opuestos: $2 - x = -(x - 2)$. Se saca el signo de uno, los factores iguales se cancelan y queda un $-1$: $\\tfrac{2 - x}{x - 2} = -1$. Un factor como $x + 3$ no tiene opuesto aquí.',
      { hint: 'Busca parejas que tengan los mismos números pero restados al revés; basta voltear uno de los dos.' }));
    add7('alg-25b', play('fraccion-compuesta', 'Simplifica la fracción compuesta', { rounds: [
      { tex: '\\dfrac{\\frac1x + \\frac12}{x + 2}', chips: ['x', '2', '2x', 'x^2'], good: 2, res: '\\dfrac{2 + x}{2x(x + 2)} = \\dfrac{1}{2x}', why: ['queda el 1/2 adentro', 'queda el 1/x adentro', '', 'queda el 1/2 adentro'] },
      { tex: '\\dfrac{1 - \\frac1x}{1 - \\frac{1}{x^2}}', chips: ['x', 'x^2', 'x - 1', '2x'], good: 1, res: '\\dfrac{x^2 - x}{x^2 - 1} = \\dfrac{x}{x + 1}', why: ['queda el 1/x² adentro', '', 'no quita ninguna fracción', 'queda el 1/x² adentro'] },
      { tex: '\\dfrac{\\frac3x}{\\frac{6}{x^2}}', chips: ['3', 'x', 'x^2', '6'], good: 2, res: '\\dfrac{3x}{6} = \\dfrac{x}{2}', why: ['quedan las dos fracciones', 'queda el 6/x² como 6/x', '', 'quedan las dos fracciones'] },
    ] }, 'Se multiplica arriba y abajo por el común denominador de las fracciones de adentro; así todas desaparecen a la vez: con $2x$, $\\tfrac{\\frac1x + \\frac12}{x + 2} = \\tfrac{2 + x}{2x(x + 2)} = \\tfrac1{2x}$.',
      { hint: 'Mira los denominadores pequeños de adentro: el multiplicador debe ser múltiplo de todos.' }));
    add7('alg-101', play('escalera-sistema', 'Tres ecuaciones en escalera', { rounds: [
      { eqs: [[1, 2, -1, -6], [0, 1, 1, 1], [0, 0, 2, 6]], sol: [1, -2, 3] },
      { eqs: [[1, -1, 3, -2], [0, 2, 1, 1], [0, 0, 1, -1]], sol: [2, 1, -1] },
      { eqs: [[1, 1, 1, -1], [0, 1, -2, -4], [0, 0, 3, 6]], sol: [-3, 0, 2] },
    ] }, 'En un sistema escalonado la última ecuación tiene una sola incógnita: $2z = 6$ da $z = 3$; con ella, $y + 3 = 1$ da $y = -2$; y con las dos, $x - 4 - 3 = -6$ da $x = 1$.',
      { hint: 'Empieza por la ecuación de abajo, que solo tiene z; cada valor hallado sirve para la de arriba.' }));
    add7('alg-102', play('parciales-repetido', 'Fracciones parciales con factor repetido', { rounds: [{ p: 1, c: 2, d: -1 }, { p: -2, c: 3, d: 5 }, { p: 3, c: 1, d: 4 }, { p: -1, c: -1, d: 3 }] },
      'Un factor al cuadrado pide dos fracciones: $\\tfrac{A}{x - p} + \\tfrac{B}{(x - p)^2}$, cuyo numerador común es $A(x - p) + B$. El coeficiente de $x$ da $A$ y el número suelto da $B$: $\\tfrac{2x - 1}{(x - 1)^2} = \\tfrac{2}{x - 1} + \\tfrac{1}{(x - 1)^2}$.',
      { hint: 'Solo A acompaña a la x: empieza por A con la barra de x y luego ajusta B con la del número.' }));

    add7('alg-71', play('cruce-potencias', 'Exponencial contra polinomio', { rounds: [{ b: 2, g: 'sq', zeros: [2, 4] }, { b: 2, g: 'lin', zeros: [1, 2] }, { b: 2, g: 'plus1', zeros: [0, 1] }] },
      '$2^x$ y $x^2$ valen lo mismo en $x = 2$ y $x = 4$; después la exponencial gana para siempre: $2^5 = 32 > 25$. Con $2x$ se cruzan en 1 y 2; con $x + 1$, en 0 y 1. Multiplicar siempre por lo mismo termina superando a cualquier polinomio.',
      { hint: 'Compara las dos tablas de valores en x = 0, 1, 2, …: busca dónde dan el mismo número.' }));
    add7('alg-13b', play('regla-del-72', 'La regla del 72', { rounds: [{ r: 8 }, { r: 12 }, { r: 9 }, { r: 24 }] },
      'Al $r\\,\\%$ compuesto el dinero se duplica en unos $72 \\div r$ periodos: al 8 % la regla dice 9 años y $1.08^9 \\approx 1.999$, así que se duplica al décimo. Al 12 %: regla 6, real 7; al 9 %: regla 8, real 9; al 24 %: regla 3, real 4.',
      { hint: 'La barra debe pasar la marca de 2 pesos; la regla del 72 te da un buen punto de partida.' }));
    add7('alg-72', play('escala-sonido', 'Los decibeles son un logaritmo', { rounds: [{ tex: '10^{3}', db: 30 }, { tex: '1\\,000\\,000', db: 60 }, { tex: '1', db: 0 }, { tex: '10^{11}', db: 110 }] },
      'El nivel en decibeles es $10 \\log \\tfrac{I}{I_0}$: diez veces el exponente de la intensidad relativa. $10^3$ da 30 dB; $1\\,000\\,000 = 10^6$ da 60; $1 = 10^0$ da 0 (el umbral); $10^{11}$ da 110. Cada 10 dB más es diez veces más intensidad.',
      { hint: 'Escribe la intensidad como potencia de 10 y multiplica su exponente por 10.' }));
    add7('alg-73', play('dos-ciudades', '¿Cuándo una ciudad alcanza a la otra?', { rounds: [
      { names: ['Villa Sol', 'Río Claro'], A: 50000, a: 2, B: 40000, b: 5 },
      { names: ['El Alto', 'La Vega'], A: 90000, a: 1, B: 60000, b: 4 },
      { names: ['Norte', 'Sur'], A: 30000, a: 3, B: 20000, b: 8 },
    ] }, 'Con tasas $a\\,\\%$ y $b\\,\\%$ se iguala $A\\left(1 + \\tfrac{a}{100}\\right)^t = B\\left(1 + \\tfrac{b}{100}\\right)^t$ y se toma logaritmo: $t = \\dfrac{\\log(A/B)}{\\log\\frac{1 + b/100}{1 + a/100}}$. Para la primera, $t \\approx 7.7$: el pueblo de abajo pasa en el año 8.',
      { hint: 'Compara las barras año tras año: la de crecimiento rápido acorta la distancia cada vez más.' }));
  }
})();
;
//#archivo js/courses/trig-escenas.js
// Trigonometría: ejercicios con las escenas de la explicación (spec 2026-11-25-explora-algebra-trigonometria). Va después de
// sin-escribir.js: quita «arma la cuenta», «escala la solución», «ordena» y los juegos repetidos de cada lección, y pone los nuevos
// antes del juego que cierra. Los juegos están en js/games/trig-escena.js.
const TRIG_ESCENAS = (() => {
  const E = (game, q, params, explain, hint) => ({ ...play(game, q, { mira: hint, ok: 'Esa era la idea.', ...params }, explain, { hint }) });
  // Fichas: [rótulos], [buenas], [sobran]
  const C = (game, q, et, metas, sobra, explain, hint, x = {}) => E(game, q, { et, metas, fichas: [...metas, ...sobra], mira: metas.map(() => hint), trampas: {}, ...x }, explain, hint);
  const r = (metas, x = {}) => ({ metas, ...x });
  return {
    'trig-41a': [
      E('coterminal-rueda', 'Un ángulo de **−165°** termina en un punto de la rueda. Lleva el punto hasta allá.', r([195]), '$-165^\\circ + 360^\\circ = 195^\\circ$: los dos terminan en el mismo lugar.', 'El signo menos gira hacia el otro lado. ¿En qué cuadrante acaba si vas hacia abajo?'),
      E('radianes-rueda', 'Lleva el punto al ángulo de $\\tfrac{7\\pi}{6}$ radianes.', r([210]), '$\\pi$ es media vuelta: $\\tfrac{7}{6} \\cdot 180^\\circ = 210^\\circ$.', 'Un sexto de π son 30 grados. Cuenta cuántos sextos hay.'),
      C('grados-radianes', 'Pasa cada ángulo a radianes.', ['72°', '108°', '−40°'], ['2π/5', '3π/5', '−2π/9'], ['5π/2', '5π/3', '2π/9'], 'Se multiplica por $\\tfrac{\\pi}{180}$: $\\tfrac{72\\pi}{180} = \\tfrac{2\\pi}{5}$.', 'Cada ángulo es una fracción de 180. Simplifica esa fracción y ponle π.', { g: 72 }),
      C('vueltas-sobran-trig', 'A **1100°** se le quitan todas las vueltas completas que caben. ¿Cuántas son y cuántos grados quedan?', ['vueltas', 'queda'], ['3', '20'], ['2', '380', '30'], '$3 \\cdot 360 = 1080$ y sobran $20^\\circ$.', 'Cada vuelta son 360 grados. Quita todas las que quepan enteras.', { g: 360, cap: '1100°' }),
    ],
    'trig-41b': [
      E('sector-fraccion', 'Pinta el sector que es **cinco doceavos** del disco.', { ks: [['g', 0, 360, 'ángulo', 30]], v: { g: 30 }, meta: { g: 150 } }, '$\\tfrac{5}{12} \\cdot 360^\\circ = 150^\\circ$ de la vuelta.', 'Un doceavo de vuelta son 30 grados. Cuenta cuántos necesitas.'),
      E('vuelta-arco', 'Una rueda de radio 1 rueda hasta que su arco mide $\\tfrac{4\\pi}{3}$. Lleva el punto al ángulo que giró.', r([240]), 'Con radio 1 el arco es el ángulo: $\\tfrac{4\\pi}{3} = 240^\\circ$.', 'Con radio 1, el arco y el ángulo en radianes miden lo mismo.'),
      C('arco-cuenta', 'Un péndulo de 60 cm barre **30°**. Pon el ángulo en radianes y el arco en centímetros.', ['radianes', 'arco'], ['π/6', '10π'], ['π/3', '1800', '20π'], '$s = r\\theta = 60 \\cdot \\tfrac{\\pi}{6} = 10\\pi$.', 'Primero pasa los grados a radianes; luego, radio por ángulo.', { g: 30, cap: '30°' }),
      C('velocidad-cuenta', 'Una rueda de 2 m de radio da **3 vueltas** por minuto. Pon cuántos radianes y cuántos metros por minuto recorre el borde.', ['rad/min', 'm/min'], ['6π', '12π'], ['3π', '6', '24π'], 'Cada vuelta son $2\\pi$: $\\omega = 6\\pi$ y $v = r\\omega = 12\\pi$.', 'Cada vuelta tiene dos pi radianes; la velocidad del borde es radio por eso.', { g: 360, cap: '3 vueltas' }),
    ],
    'trig-1': [
      E('catetos-razon', 'Mueve los catetos hasta que la **tangente** de θ sea $\\tfrac{4}{7}$.', { ks: [['x', 2, 12, 'adyacente'], ['y', 2, 8, 'opuesto']], v: { x: 4, y: 4 }, meta: { x: 7, y: 4 } }, 'Tangente es opuesto sobre adyacente: 4 sobre 7.', 'La tangente compara el cateto de enfrente con el de al lado, en ese orden.'),
      C('lados-nombra', 'Triángulo de lados 20, 21 y 29. Desde θ, el opuesto es el **20**. Pon los otros.', ['adyacente', 'hipotenusa'], ['21', '29'], ['20', '41'], 'La hipotenusa es el lado más largo y el adyacente, el cateto que queda.', '¿Cuál lado mira al ángulo recto? El otro cateto está al lado de θ.', { t: { co: '20' } }),
      C('razones-tres', 'Opuesto 33, adyacente 56, hipotenusa 65. Pon cada razón de θ.', ['sen', 'cos', 'tan'], ['33/65', '56/65', '33/56'], ['65/33', '56/33'], 'SOH, CAH y TOA: cada razón con sus dos lados.', 'Seno y coseno llevan abajo la hipotenusa. La tangente no la usa.', { t: { co: '33', ca: '56', hi: '65' } }),
      E('escalera-apoya', 'La altura a la que llega una escalera es la **mitad** de su largo. Inclínala.', { ks: [['g', 15, 75, 'ángulo con el piso', 15]], v: { g: 75 }, meta: { g: 30 } }, '$\\operatorname{sen}30^\\circ = \\tfrac12$: la altura es la mitad de la hipotenusa.', 'Altura sobre escalera es el seno. ¿De qué ángulo notable el seno es un medio?'),
    ],
    'trig-2': [
      E('notables-rueda', 'Marca los **dos** ángulos del primer cuadrante con $\\operatorname{sen} = \\tfrac{\\sqrt2}{2}$ y con $\\operatorname{sen} = \\tfrac{\\sqrt3}{2}$.', r([45, 60], { ini: [15, 75] }), 'El de 45° viene del medio cuadrado y el de 60°, del medio equilátero.', 'Uno sale de partir un cuadrado y otro, de partir un triángulo equilátero.'),
      C('recta-notables', 'El triángulo de **60°** tiene adyacente 5. Pon el opuesto y la hipotenusa.', ['opuesto', 'hipotenusa'], ['5√3', '10'], ['5√2', '10√3', '5'], 'En 30–60 los lados son 1, √3 y 2: aquí, por 5.', 'Frente a 60° está la raíz de tres veces el lado corto; la hipotenusa es su doble.', { t: { a: '60°', ca: '5', b: 64, h: 110 } }),
      C('recta-mitad', 'La diagonal de una cancha cuadrada mide **14√2** m. Pon el lado y el perímetro.', ['lado', 'perímetro'], ['14', '56'], ['28', '14√2', '196'], 'La diagonal es lado por √2: el lado mide 14.', 'La diagonal de un cuadrado es el lado por raíz de dos.', { t: { a: '45°', hi: '14√2', b: 110, h: 110 } }),
      E('mirador', 'Desde **50 m**, la altura de una torre es justo de 50 m. Inclina la mirada.', { d: 50, ks: [['g', 15, 60, 'elevación', 15]], v: { g: 15 }, meta: { g: 45 } }, '$\\tan 45^\\circ = 1$: altura y distancia iguales.', 'Altura sobre distancia da 1. ¿De qué ángulo notable es la tangente 1?'),
    ],
    'trig-42c': [
      C('seis-razones', 'Opuesto 5, adyacente 12, hipotenusa 13. Pon las recíprocas.', ['csc', 'sec', 'cot'], ['13/5', '13/12', '12/5'], ['5/13', '5/12'], 'Son seno, coseno y tangente dados vuelta.', 'Cosecante voltea al seno; secante, al coseno; cotangente, a la tangente.', { t: { co: '5', ca: '12', hi: '13' } }),
      C('de-una-todas', 'θ es agudo y $\\cot\\theta = \\tfrac{45}{28}$. Pon la hipotenusa y el seno.', ['hipotenusa', 'sen'], ['53', '28/53'], ['73', '45/53', '53/28'], 'Adyacente 45 y opuesto 28: $\\sqrt{2025 + 784} = 53$.', 'La cotangente es adyacente sobre opuesto. Completa con Pitágoras.', { t: { ca: '45', co: '28' } }),
      C('depresion-faro', 'Desde una torre de 60 m se ve un auto con depresión de **45°**; otro, con **30°**. Pon la distancia de cada uno a la base.', ['a 45°', 'a 30°'], ['60', '60√3'], ['30', '20√3', '120'], 'Distancia es altura entre tangente: $\\tfrac{60}{1}$ y $\\tfrac{60}{\\sqrt3/3} = 60\\sqrt3$.', 'La depresión es igual al ángulo en el auto. Altura sobre distancia es su tangente.', { t: { co: '60' } }),
    ],
    'trig-3': [
      E('punto-unidad', 'Lleva el punto a donde está $\\left(\\tfrac12, -\\tfrac{\\sqrt3}{2}\\right)$.', r([300]), 'Coseno $\\tfrac12$ y seno negativo: $300^\\circ$.', 'Derecha y abajo. ¿Qué ángulo notable tiene coseno un medio?'),
      E('gemelos-seno', 'Marca los **dos** ángulos cuya altura es la línea punteada: $\\operatorname{sen}\\theta = -\\tfrac12$.', r([210, 330], { linea: ['y', -0.5] }), 'Referencia 30° por debajo del eje: 210° y 330°.', 'Los dos puntos están a la misma altura, uno a cada lado.'),
      C('valores-eje', 'Pon el valor en los ejes.', ['cos 270°', 'sen 450°', 'tan 360°'], ['0', '1', '0'], ['−1', 'no existe'], 'Los puntos son (0, −1), (0, 1) y (1, 0).', 'Quita vueltas. La x es el coseno; la altura, el seno; la tangente los divide.', { gs: [270, 90] }),
      E('gemelos-coseno', 'Marca los **dos** ángulos sobre la línea vertical: $\\cos\\theta = \\tfrac{\\sqrt2}{2}$.', r([45, 315], { linea: ['x', 0.707], ini: [90, 180] }), 'Mismo coseno: un ángulo y su espejo de abajo.', 'El espejo sobre el eje horizontal conserva x.'),
    ],
    'trig-43b': [
      E('cuadrante-referencia', 'Lleva el punto al ángulo del **cuarto cuadrante** con referencia **60°**.', r([300]), '$360^\\circ - 60^\\circ = 300^\\circ$.', 'Desde el eje derecho, baja lo que diga la referencia.'),
      C('signo-valor', 'Pon cada valor con su signo.', ['cos 150°', 'sen 225°', 'tan 300°'], ['−√3/2', '−√2/2', '−√3'], ['√3/2', '√3', '√2/2'], 'Referencias 30°, 45° y 60° con el signo del cuadrante.', 'Halla la referencia y después mira si ese lado es positivo en el cuadrante.', { gs: [150, 225, 300] }),
      C('referencia-valor', '$\\tan\\theta = \\tfrac{8}{15}$ y θ está en el **tercer** cuadrante. Pon sen y cos.', ['sen', 'cos'], ['−8/17', '−15/17'], ['8/17', '15/17', '−8/15'], 'Hipotenusa 17; en el tercero, los dos negativos.', 'Arma el triángulo con Pitágoras y luego mira los signos del tercer cuadrante.', { gs: [208] }),
    ],
    'trig-44a': [
      E('ola-amplitud', 'Ajusta la ola para que toque justo las **dos líneas** y empiece **subiendo**.', { franja: [3, -3], ks: [['A', -4, 4, 'A']], v: { A: 1 }, meta: { A: 3 } }, 'Va de −3 a 3: amplitud 3, y empieza subiendo con signo positivo.', 'La amplitud es lo que se aleja del centro. Un signo menos la voltearía.'),
      E('ola-centro', 'Lleva la ola hasta que quede entre **las dos líneas** (arriba 1, abajo −3).', { franja: [1, -3], ks: [['A', 1, 3, 'amplitud'], ['k', -2, 2, 'centro']], v: { A: 1, k: 0 }, meta: { A: 2, k: -1 } }, 'Centro $\\tfrac{1 - 3}{2} = -1$ y amplitud $1 - (-1) = 2$.', 'El centro es el promedio de los extremos; la amplitud, de ahí hasta el tope.'),
      C('lee-ola', 'Lee la ola del dibujo: pon su máximo, su mínimo y su amplitud.', ['máximo', 'mínimo', 'amplitud'], ['−1', '−3', '1'], ['−2', '2', '3'], 'Se mueve alrededor de −2 y se aleja 1: de −3 a −1.', 'Mira el punto más alto y el más bajo; la amplitud es la mitad de lo que los separa. Cada raya vale 1.', { o: { A: 1, k: -2 } }),
      C('ficha-ola', 'La ola $y = -2\\operatorname{sen}x - 1$ está dibujada. Pon su amplitud, su centro y su máximo.', ['amplitud', 'centro', 'máximo'], ['2', '−1', '1'], ['−2', '3', '−3'], 'La amplitud es $|{-2}| = 2$; el máximo, $-1 + 2 = 1$.', 'La amplitud nunca es negativa. Al centro se le suma para hallar el máximo.', { o: { A: -2, k: -1 } }),
    ],
    'trig-44b': [
      E('ola-periodo', 'Haz que la ola coincida con la **sombra**: mueve ω.', { sombra: 1, ks: [['w', 0.5, 3, 'ω', 0.5]], v: { A: 2, w: 1 }, meta: { w: 1.5 } }, 'En 4π caben tres ciclos: cada uno mide $\\tfrac{4\\pi}{3}$ y $\\omega = 1.5$.', 'Cuenta cuántos ciclos completos hace la sombra en el cuadro, que mide 4π.'),
      E('ola-desfase', 'La sombra es la misma ola **corrida**. Mueve cuánto: cada paso es un cuarto de π, cerca de 0.79.', { sombra: 1, ks: [['f', 0, 3.1415926, 'corrimiento', 0.78539815]], v: { A: 2, w: 1, f: 0 }, meta: { f: 2.356 } }, 'Se corrió $\\tfrac{3\\pi}{4}$ hacia la derecha.', 'Mira dónde empieza a subir la sombra y llévala hasta allí.'),
      C('lee-periodo', 'Lee la ola: pon el periodo, ω y la amplitud. Cada columna mide π/2.', ['periodo', 'ω', 'amplitud'], ['3π', '2/3', '3'], ['2π', '3/2', '6'], 'Un ciclo ocupa seis columnas: 3π, y $\\omega = \\tfrac{2\\pi}{3\\pi} = \\tfrac23$.', 'Mide una ola completa en columnas y divide 2π entre ese largo.', { o: { A: 3, w: 2 / 3 } }),
      C('ficha-desfase', '$y = 2\\operatorname{sen}(3x - \\pi)$ se escribe $2\\operatorname{sen}\\,3(x - \\square)$. Pon el desfase y el periodo.', ['desfase', 'periodo'], ['π/3', '2π/3'], ['π', '3π', '6π'], 'Se saca factor 3: $3(x - \\tfrac{\\pi}{3})$; y $T = \\tfrac{2\\pi}{3}$.', 'Saca el 3 de los dos términos antes de leer el desfase.', { o: { A: 2, w: 3, f: 1.047 } }),
    ],
    'trig-45': [
      E('arco-inverso', 'Lleva el punto a $\\arccos\\left(-\\tfrac{\\sqrt3}{2}\\right)$.', r([150]), 'El arcocoseno responde entre 0° y 180°: 150°.', 'La respuesta tiene que estar en la mitad de arriba.'),
      C('rango-inversa', 'Pon cada ángulo, en su ventana.', ['arcsen(√3/2)', 'arctan(−1)', 'arccos 0'], ['60°', '−45°', '90°'], ['120°', '135°', '0°'], 'arcsen y arctan van de −90° a 90°; arccos, de 0° a 180°.', 'Pregunta de qué ángulo es ese valor y escoge el de la ventana.', { cap: '¿de qué ángulo?' }),
      C('triangulo-inversa', '¿Cuánto valen $\\cos(\\operatorname{arcsen}\\tfrac{20}{29})$ y $\\tan(\\operatorname{arcsen}\\tfrac{20}{29})$?', ['cos', 'tan'], ['21/29', '20/21'], ['29/21', '21/20', '20/29'], 'El ángulo tiene opuesto 20 e hipotenusa 29: adyacente 21.', 'Dibuja el triángulo de ese ángulo y completa con Pitágoras.', { t: { co: '20', hi: '29' } }),
      C('deshace-inversa', 'Deshacer solo funciona dentro de la ventana. Pon cada resultado.', ['arcsen(sen 70°)', 'arcsen(sen 110°)', 'arccos(cos 200°)'], ['70°', '70°', '160°'], ['110°', '200°', '−20°'], '110° tiene el mismo seno que 70°, y 200° el mismo coseno que 160°.', 'Si el ángulo está fuera de la ventana, busca el gemelo que sí está.', { cap: 'deshacer' }),
    ],
    'trig-4': [
      E('pitagoras-uno', '$\\cos^2\\theta$ vale **0.28**. Mueve $\\operatorname{sen}^2\\theta$ (en centésimas) hasta que se cumpla Pitágoras.', { cs: 28, ks: [['s', 0, 100, 'centésimas', 4]], v: { s: 0 }, meta: { s: 72 } }, '$0.72 + 0.28 = 1$: juntos siempre hacen uno.', 'Los dos cuadrados juntos tienen que completar 1.'),
      E('secante-barra', '$\\tan^2\\theta = 6$. Mueve $\\sec^2\\theta$ hasta que sea la suma correcta.', { t: 6, ks: [['s', 1, 10, 'sec²']], v: { s: 1 }, meta: { s: 7 } }, '$\\sec^2\\theta = 1 + \\tan^2\\theta = 7$.', 'La secante al cuadrado es la tangente al cuadrado y algo más.'),
      E('negativo-espejo', 'El punto de **150°** tiene un espejo: lleva el punto a **−150°**.', r([210]), 'El ángulo negativo es el espejo de abajo: termina donde $-150^\\circ + 360^\\circ = 210^\\circ$.', 'Girar al revés refleja sobre el eje horizontal.'),
      C('par-impar', '$\\cos\\theta = \\tfrac{5}{13}$ y $\\operatorname{sen}\\theta = \\tfrac{12}{13}$. Pon los valores en −θ.', ['cos(−θ)', 'sen(−θ)', 'tan(−θ)'], ['5/13', '−12/13', '−12/5'], ['−5/13', '12/13', '12/5'], 'El coseno es par; seno y tangente, impares.', 'El espejo de abajo conserva x y cambia el signo de y.', { gs: [67, 293] }),
    ],
    'trig-47b': [
      C('simplifica-senos', 'Pasa todo a seno y coseno y simplifica.', ['cot θ · sen θ', 'cos θ · csc θ'], ['cos θ', 'cot θ'], ['sen θ', '1', 'tan θ'], '$\\tfrac{\\cos}{\\operatorname{sen}}\\operatorname{sen} = \\cos$ y $\\cos \\cdot \\tfrac{1}{\\operatorname{sen}} = \\cot$.', 'Escribe cada una con seno y coseno; después cancela o reconoce el cociente.', { cap: 'todo en sen y cos' }),
      C('demuestra-pasos', '$\\csc\\theta - \\operatorname{sen}\\theta$ con denominador sen θ: pon lo de arriba y el resultado.', ['arriba', 'resultado'], ['cos²θ', 'cos θ · cot θ'], ['1', 'sen²θ', 'tan θ'], '$\\tfrac{1 - \\operatorname{sen}^2}{\\operatorname{sen}} = \\tfrac{\\cos^2}{\\operatorname{sen}}$.', 'Uno menos seno al cuadrado es una identidad conocida.', { cap: 'csc θ − sen θ' }),
      C('conjugado-trig', '$\\tfrac{1}{1 - \\cos\\theta}$ por su conjugado: pon arriba y abajo.', ['arriba', 'abajo'], ['1 + cos θ', 'sen²θ'], ['1 − cos θ', 'cos²θ', '1'], '$(1 - \\cos)(1 + \\cos) = 1 - \\cos^2 = \\operatorname{sen}^2$.', 'El conjugado tiene el signo contrario; abajo queda una diferencia de cuadrados.', { cap: '1 / (1 − cos θ)' }),
      C('reemplaza-identidad', 'Con $\\operatorname{sen}^2\\theta = \\tfrac{1}{4}$, pon el valor de cada una.', ['cos²θ', 'csc²θ', 'cot²θ'], ['3/4', '4', '3'], ['1/4', '1/3', '2'], '$1 - \\tfrac14$, $\\tfrac{1}{1/4}$ y $4 - 1$.', 'Usa Pitágoras, la recíproca y después csc² menos 1.', { cap: 'sen²θ = 1/4' }),
    ],
    'trig-48a': [
      E('suma-angulos', 'El primer ángulo es de **90°**. Agrega el que hace falta para llegar a **135°**.', { a: 90, ks: [['b', 0, 90, 'segundo ángulo', 15]], v: { b: 0 }, meta: { b: 45 } }, '$135^\\circ = 90^\\circ + 45^\\circ$: dos conocidos.', 'Resta para saber cuánto falta: debe salir un ángulo notable.'),
      E('resta-angulos', 'Quita a **60°** el ángulo notable que deja **15°**.', { a: 60, ks: [['b', 0, 60, 'se quita', 15]], v: { b: 0 }, meta: { b: 45 } }, '$15^\\circ = 60^\\circ - 45^\\circ$.', 'Piensa cuánto hay entre 60 y 15.'),
      C('suma-formula', '$\\operatorname{sen}15^\\circ = \\operatorname{sen}(45^\\circ - 30^\\circ)$: pon los dos productos que se restan.', ['sen·cos', 'cos·sen'], ['√6/4', '√2/4'], ['1/2', '√3/2', '√8/4'], '$\\tfrac{\\sqrt2}{2}\\cdot\\tfrac{\\sqrt3}{2} - \\tfrac{\\sqrt2}{2}\\cdot\\tfrac12 = \\tfrac{\\sqrt6 - \\sqrt2}{4}$.', 'El seno cruza: seno por coseno, y coseno por seno.', { ops: ['−'], cap: 'sen(45° − 30°)' }),
      C('suma-tangente', '$\\tan a = \\tfrac12$ y $\\tan b = \\tfrac13$. Pon arriba, abajo y $\\tan(a + b)$.', ['arriba', 'abajo', 'resultado'], ['5/6', '5/6', '1'], ['1/6', '7/6', '2/5'], '$\\tfrac12 + \\tfrac13 = \\tfrac56$ y $1 - \\tfrac16 = \\tfrac56$: el cociente es 1.', 'Arriba la suma; abajo, uno menos el producto.', { cap: 'tan(a + b)' }),
    ],
    'trig-48b': [
      E('doble-vuelta', 'El punto está en **75°**. Llévalo al **doble** de ese ángulo.', r([150], { ini: [75] }), '$2 \\cdot 75^\\circ = 150^\\circ$: cambió de cuadrante.', 'Suma el ángulo consigo mismo.'),
      E('mitad-angulo', 'El radio amarillo está en **210°**. Pon el otro en la **mitad** de ese ángulo.', { g: 210, ks: [['m', 0, 180, 'mitad', 15]], v: { m: 0 }, meta: { m: 105 } }, 'La mitad de 210° es 105°, en el segundo cuadrante.', 'La mitad de un ángulo del tercer cuadrante no está en el tercero.'),
      C('doble-cuenta', '$\\cos a = \\tfrac{8}{17}$, a agudo. Pon sen a, sen 2a y cos 2a.', ['sen a', 'sen 2a', 'cos 2a'], ['15/17', '240/289', '−161/289'], ['161/289', '30/17', '120/289'], '$2 \\cdot \\tfrac{15}{17} \\cdot \\tfrac{8}{17}$ y $\\tfrac{64 - 225}{289}$.', 'El doble del producto; y coseno al cuadrado menos seno al cuadrado.', { cap: 'cos a = 8/17' }),
      C('mitad-cuenta', '$\\cos 2a = -\\tfrac{1}{9}$, a agudo. Pon sen²a, cos²a y tan²a.', ['sen²a', 'cos²a', 'tan²a'], ['5/9', '4/9', '5/4'], ['1/9', '10/9', '4/5'], '$\\tfrac{1 + 1/9}{2} = \\tfrac59$ y $\\tfrac{1 - 1/9}{2} = \\tfrac49$.', 'Seno al cuadrado lleva uno menos; coseno al cuadrado, uno más; y la mitad.', { cap: 'cos 2a = −1/9' }),
    ],
    'trig-49': [
      E('corta-ola', 'Mueve la recta hasta que haya **una sola** solución por ciclo y esté **abajo**.', { ks: [['h', -1.5, 1.5, 'altura', 0.5]], v: { h: 0 }, meta: { h: -1 } }, '$\\operatorname{sen}x = -1$ toca solo el valle de cada ciclo.', 'La recta debe rozar la ola sin cruzarla, en la parte baja.'),
      E('pareja-ecuacion', 'Marca las **dos** soluciones de $2\\cos x + \\sqrt3 = 0$ en una vuelta.', r([150, 210]), '$\\cos x = -\\tfrac{\\sqrt3}{2}$: referencia 30° a la izquierda.', 'Despeja el coseno y mira de qué lado de la rueda es negativo.'),
      C('despeja-trig', '$4\\operatorname{sen}^2x - 3 = 0$: pon sen²x, la referencia y cuántas soluciones hay en una vuelta.', ['sen²x', 'referencia', 'cuántas'], ['3/4', '60°', '4'], ['2', '30°', '4/3'], '$\\operatorname{sen}x = \\pm\\tfrac{\\sqrt3}{2}$: una por cuadrante.', 'El cuadrado permite dos signos: piensa en los cuatro cuadrantes.', { cap: '4 sen²x − 3 = 0' }),
      C('factoriza-trig', '$2\\cos^2x + \\cos x = 0$: pon los dos valores de cos x, el mayor primero.', ['uno', 'otro'], ['0', '−1/2'], ['1/2', '1', '−2'], '$\\cos x(2\\cos x + 1) = 0$.', 'Saca factor común: cada factor puede ser cero.', { cap: '2 cos²x + cos x = 0' }),
    ],
    'trig-46a': [
      E('angulo-tercero', 'En un triángulo, A = 47° y B = 68°. Mueve C hasta completar.', { A: 47, B: 68, ks: [['C', 20, 100, 'C (grados)', 5]], v: { C: 20 }, meta: { C: 65 } }, '$180 - 47 - 68 = 65$.', 'Los tres ángulos juntos llenan 180 grados.'),
      E('cuelga-lado', 'Con A = 30° y b = 12, mueve a hasta que haya **un triángulo rectángulo**.', { b: 12, ks: [['a', 3, 14, 'lado a']], v: { a: 3 }, meta: { a: 6 } }, 'La altura es $12\\operatorname{sen}30^\\circ = 6$: el lado cae derecho.', 'El lado que cuelga debe medir justo la altura: b por el seno de 30°.'),
      C('senos-ley', 'A = 45°, B = 60° y a = 4. Pon C y b.', ['C', 'b'], ['75°', '2√6'], ['105°', '4√3', '2√3'], '$b = \\tfrac{4\\operatorname{sen}60^\\circ}{\\operatorname{sen}45^\\circ} = 4\\cdot\\tfrac{\\sqrt3}{\\sqrt2} = 2\\sqrt6$.', 'Primero el ángulo que falta; luego, lado sobre seno de su opuesto.', { a: '4', b: 'b' }),
      C('senos-pareja', '¿Con qué ley se empieza? Datos: **a, B, C**; **a, b, c**; **b, c, A**.', ['a, B, C', 'a, b, c', 'b, c, A'], ['senos', 'cosenos', 'cosenos'], ['ninguna', 'senos'], 'Con dos ángulos sale el tercero y hay pareja; en las otras no hay ángulo opuesto conocido.', 'Busca si puedes tener un lado y su ángulo opuesto.', { a: 'a', b: 'b', c: 'c' }),
    ],
    'trig-46b': [
      E('abre-bisagra', 'Lados 6 y 6. Abre el ángulo hasta que el tercer lado mida también **6**.', { a: 6, b: 6, ks: [['g', 15, 150, 'ángulo', 15]], v: { g: 15 }, meta: { g: 60 } }, 'Tres lados iguales: cada ángulo mide 60°.', '¿Qué triángulo tiene los tres lados iguales? ¿Cuánto miden sus ángulos?'),
      E('area-bisagra', 'Lados 5 y 8. Abre el ángulo, **más de 90°**, para que el área sea la **misma que con 45°**.', { a: 5, b: 8, ks: [['g', 30, 165, 'ángulo', 15]], v: { g: 45 }, meta: { g: 135 } }, '$\\operatorname{sen}135^\\circ = \\operatorname{sen}45^\\circ$: la misma altura.', 'Busca el ángulo obtuso que tiene el mismo seno.'),
      C('cosenos-ley', 'Lados 7 y 8 con **120°** entre ellos. Pon $-2ab\\cos C$, c² y c.', ['corrección', 'c²', 'c'], ['56', '169', '13'], ['−56', '57', '113'], '$49 + 64 + 56 = 169$: el ángulo obtuso agrega.', 'El coseno de 120° es menos un medio: la corrección suma.', { a: '7', b: '8', c: 'c' }),
      C('cosenos-angulo', 'Lados 3, 5 y 7. Para el ángulo opuesto a **7**, pon a² + b² − c², 2ab y el coseno.', ['a²+b²−c²', '2ab', 'cos'], ['−15', '30', '−1/2'], ['15', '1/2', '83'], '$9 + 25 - 49 = -15$ y $-\\tfrac{15}{30} = -\\tfrac12$.', 'El lado que se resta es el opuesto al ángulo buscado.', { a: '3', b: '5', c: '7' }),
      C('area-senos', 'Lados 6 y 10 con **30°** entre ellos. Pon la altura sobre el 10 y el área.', ['altura', 'área'], ['3', '15'], ['6', '30', '5'], 'Altura $6\\operatorname{sen}30^\\circ = 3$; área $\\tfrac12\\cdot10\\cdot3$.', 'La altura es un lado por el seno; el área, media base por altura.', { an: 30, a: '6', c: '10' }),
    ],
    'trig-151': [
      E('argumento-plano', 'Lleva el radio a la dirección del número $-1 - i$.', r([225]), 'Está en el tercer cuadrante, a 45° del eje: 225°.', 'Izquierda y abajo por igual. ¿Cuánto se pasó de media vuelta?'),
      E('polar-flecha', 'Lleva la flecha hasta el punto amarillo, $-4i$: pon módulo y ángulo.', { pto: [0, -4], ks: [['r', 1, 5, 'módulo'], ['g', 0, 330, 'ángulo', 30]], v: { r: 2, g: 30 }, meta: { r: 4, g: 270 } }, '$-4i = 4\\operatorname{cis}270^\\circ$.', 'El módulo es la distancia al centro; el ángulo se cuenta desde la derecha.'),
      C('componentes-polar', '$10\\operatorname{cis}150^\\circ$: pon la parte real y la imaginaria.', ['real', 'imaginaria'], ['−5√3', '5'], ['5√3', '−5', '10'], '$10\\cos150^\\circ = -5\\sqrt3$ y $10\\operatorname{sen}150^\\circ = 5$.', 'Segundo cuadrante: la parte real es negativa. Referencia 30°.', { t: { a: '30°', hi: '10' } }),
      C('modulo-argumento', '$z = 3 - 3\\sqrt3\\,i$: pon el módulo y el argumento entre 0° y 360°.', ['módulo', 'argumento'], ['6', '300°'], ['36', '60°', '240°'], '$\\sqrt{9 + 27} = 6$; cuarto cuadrante con referencia 60°.', 'Pitágoras para el módulo; dibuja el cuadrante antes de decir el ángulo.', { cap: '3 − 3√3 i' }),
    ],
    'trig-152': [
      E('producto-polar', 'z (amarillo) es $2\\operatorname{cis}30^\\circ$. Lleva la flecha a $z \\cdot 2\\operatorname{cis}120^\\circ$.', { z: [2, 30], ks: [['r', 1, 5, 'módulo'], ['g', 0, 330, 'ángulo', 30]], v: { r: 1, g: 0 }, meta: { r: 4, g: 150 } }, 'Módulos: $2 \\cdot 2 = 4$. Ángulos: $30^\\circ + 120^\\circ$.', 'Los módulos se multiplican y los ángulos se suman.'),
      E('cociente-polar', 'z es $4\\operatorname{cis}210^\\circ$. Lleva la flecha a $z \\div 2\\operatorname{cis}60^\\circ$.', { z: [4, 210], ks: [['r', 1, 5, 'módulo'], ['g', 0, 330, 'ángulo', 30]], v: { r: 1, g: 0 }, meta: { r: 2, g: 150 } }, 'Módulos: $4 \\div 2 = 2$. Ángulos: $210^\\circ - 60^\\circ$.', 'Dividir hace lo contrario de multiplicar.'),
      E('demoivre-rueda', 'w tiene módulo 1 y ángulo **75°**. Lleva el punto a $w^4$.', r([300], { ini: [75] }), '$4 \\cdot 75^\\circ = 300^\\circ$.', 'Elevar repite el giro tantas veces como diga el exponente.'),
      C('potencia-polar', '$(\\sqrt3 + i)^3$: pon el módulo, el ángulo y el resultado.', ['módulo', 'ángulo', 'resultado'], ['8', '90°', '8i'], ['2', '30°', '−8'], '$2\\operatorname{cis}30^\\circ$ al cubo es $8\\operatorname{cis}90^\\circ = 8i$.', 'Pasa a polar; el módulo al cubo y tres veces el ángulo.', { cap: '(√3 + i)³' }),
    ],
    'trig-153': [
      E('raiz-primera', 'Lleva el punto a la primera raíz **cuarta** de $\\operatorname{cis}240^\\circ$.', r([60]), '$240^\\circ \\div 4 = 60^\\circ$.', 'La raíz parte el ángulo en tantas partes como el índice.'),
      E('raices-opuestas', 'Marca las **dos** raíces cuadradas de $\\operatorname{cis}150^\\circ$.', r([75, 255], { ini: [15, 120] }), 'La mitad de 150° y media vuelta más.', 'Una es la mitad del ángulo; la otra está enfrente.'),
      E('petalos', 'Arma las raíces **sextas** de un número cuya primera raíz está en **40°**.', { ks: [['n', 2, 8, 'cuántas raíces'], ['a', 0, 60, 'primera', 10]], v: { n: 2, a: 0 }, meta: { n: 6, a: 40 } }, 'Seis raíces, cada $60^\\circ$, empezando en $40^\\circ$.', 'El índice dice cuántas son; la primera ya la conoces.'),
      C('raices-ordenadas', 'Raíces cúbicas de $8\\operatorname{cis}90^\\circ$: pon el módulo y los tres ángulos en orden.', ['módulo', '1.ª', '2.ª', '3.ª'], ['2', '30°', '150°', '270°'], ['8', '90°', '120°'], '$90 \\div 3 = 30$ y luego cada $120^\\circ$.', 'Parte el ángulo en tres y después suma un tercio de vuelta.', { cap: 'w³ = 8 cis 90°' }),
    ],
  };
})();
{
  const FUERA = ['arma-la-cuenta', 'escala-solucion', 'ordena-terminos', 'une-parejas'];
  for (const l of COURSE_TRIG.units.flatMap(u => u.lessons)) {
    const vistos = new Set(), fin = l.ex.at(-1), base = l.ex.slice(0, -1).filter(e => !FUERA.includes(e.game) && e.type === 'play' && e.game !== fin.game && !vistos.has(e.game) && vistos.add(e.game));
    l.ex = [...base, ...(TRIG_ESCENAS[l.id] || []), fin];
  }
}
;
//#archivo js/explora.js
// Explora: la explicación interactiva que ocupa el lugar del video (spec 2026-11-23-explora-leccion-interactiva).
// El estudiante construye la idea paso a paso: una frase, una escena que se arrastra y una meta. Al cumplirla se revela
// la idea, que entra al «andamio» (lo que lleva construido). Sin vidas, sin reloj y sin «Comprobar».
//
//   EXPLORA['<id de lección>'] = { caps: ['Capítulo', …], pasos: [{ cap, tipo, texto, idea, …parámetros }] }
//   XP[tipo]  = { ini(p) → estado, ok(estado, p), sol(p) → estado cumplido, lee(estado, p) → renglón en TeX }   (puro)
//   XPD[tipo] = (escena, p, estado, api) → dibuja y escucha el dedo; api.set(estado), api.nota(texto), api.memo
// Va después de ui.js y antes de player.js (makePlayer llama a exploraPlayer).

const EXPLORA = {};
const EXPLORA_VOZ = 'https://zukavoz.b-cdn.net/';   // Bunny Storage (tools/subir-voz.js): <base><lección>/<lista de js/explora-voces.js>
const XP_VOZ_PLAZO = 6000;   // si una frase no empieza a sonar en este tiempo, la explicación sigue con el tiempo de lectura

// De dónde sale la voz de una lección, en orden: lo publicado en Bunny y, si no responde, la copia propia. Sin narración
// publicada no se pide nada. En localhost manda la carpeta local: así se oye lo nuevo antes de subirlo.
function xpVozFuentes(id, host) {
  const f = typeof EXPLORA_VOCES !== 'undefined' && EXPLORA_VOCES[id];
  const propia = ['media/voz/' + id + '/', 'voz.json'];
  const bunny = f ? [[EXPLORA_VOZ + id + '/', f]] : [];
  return /^(localhost|127\.0\.0\.1)$/.test(host) ? [propia, ...bunny] : f ? [...bunny, propia] : [];
}
// Pide algo con un plazo (los navegadores viejos, sin plazo).
const xpPide = (url, ms) => fetch(url, AbortSignal.timeout ? { signal: AbortSignal.timeout(ms) } : {});
const XP = {};

const xpPar = n => (n < 0 ? `(${n})` : `${n}`);            // en TeX: un negativo va entre paréntesis
const xpMenos = n => String(n).replace('-', '−');           // en pantalla: menos tipográfico
const xpSigno = n => (n > 0 ? '+' : '') + xpMenos(n);
// Los sonidos de los ejercicios de una lección con explicación (los juegos los reciben como api.sfx): los mismos de la escena.
const XP_SFX = { tap: () => XS.pop(), ok: () => XS.idea(), bad: () => XS.nope(), win: () => XS.idea() };
const xpPasos = n => `${n} ${n === 1 ? 'paso' : 'pasos'}`;

XP.apuesta = {
  ini: () => ({ pick: null }),
  ok: s => s.pick != null,
  sol: p => ({ pick: p.opciones[0] }),
  lee: () => '',
};

// Ficha en la recta. modo: 'llegar' (a meta), 'espejo' (el reflejo cae en meta), 'distancia' (desde `ancla`),
// 'salto' (sale de `desde`; con `resta` la cuenta es desde − resta) y 'dos' (tocar los lugares a `dist` de `ancla`).
XP.recta = {
  ini: p => (p.modo === 'dos' ? { sel: [] } : { v: p.desde }),
  ok(s, p) {
    if (p.modo === 'dos') return s.sel.length === p.metas.length && p.metas.every(m => s.sel.includes(m));
    return (p.modo === 'espejo' ? -s.v : s.v) === p.meta;
  },
  sol: p => (p.modo === 'dos' ? { sel: [...p.metas] } : { v: p.modo === 'espejo' ? -p.meta : p.meta }),
  lee(s, p) {
    if (p.modo === 'dos') return s.sel.length ? s.sel.map(m => `$|{${m}} - ${xpPar(p.ancla)}| = ${Math.abs(m - p.ancla)}$`).join(' · ') : '';
    if (p.modo === 'espejo') return `$-(${s.v}) = ${-s.v}$`;
    if (p.modo === 'distancia') return `$|{${s.v}} - ${xpPar(p.ancla)}| = ${Math.abs(s.v - p.ancla)}$`;
    if (p.modo === 'salto') {
      if (p.resta != null) return `$${p.desde} - ${xpPar(p.resta)} = ${s.v === p.meta ? s.v : '\\,?'}$`;
      const d = s.v - p.desde;
      return d ? `$${p.desde} + ${xpPar(d)} = ${s.v}$` : `$${p.desde}$`;
    }
    return `$${s.v}$`;
  },
  // La frase con que la escena responde a cada movimiento (todas las `dice` son puras).
  dice(s, p) {
    if (p.modo === 'dos') {
      const m = s.sel.at(-1);
      if (m == null) return `Cuenta ${xpPasos(p.dist)} desde el ${xpMenos(p.ancla)}, hacia un lado.`;
      const d = Math.abs(m - p.ancla);
      if (d !== p.dist) return `El ${xpMenos(m)} está a ${xpPasos(d)} del ${xpMenos(p.ancla)}, no a ${p.dist}.`;
      return `El ${xpMenos(m)} está a ${xpPasos(d)}: sirve.${XP.recta.ok(s, p) ? '' : ' Falta el del otro lado.'}`;
    }
    const v = s.v;
    if (p.modo === 'espejo') {
      return v === 0 ? 'En el 0 la ficha y su reflejo se juntan: el opuesto de 0 es 0.'
        : `Tu ficha está a ${xpPasos(Math.abs(v))} del 0. Su reflejo también, al otro lado.`;
    }
    if (p.modo === 'distancia') {
      const d = Math.abs(v - p.ancla), lo = Math.min(v, p.ancla), hi = Math.max(v, p.ancla);
      if (!d) return 'Sin moverse, la distancia es 0.';
      return `De ${xpMenos(p.ancla)} a ${xpMenos(v)} hay ${xpPasos(d)}.${lo < 0 && hi > 0 ? ` Son ${-lo} hasta el 0 y ${hi} más.` : ''}`;
    }
    if (p.modo === 'salto') {
      const d = v - p.desde, n = p.resta != null ? -p.resta : p.suma;
      if (!d) return 'La ficha aún no se mueve.';
      if (n == null) return `Te moviste ${xpPasos(Math.abs(d))} a la ${d > 0 ? 'derecha' : 'izquierda'}.`;
      if (Math.sign(d) !== Math.sign(n)) {
        return p.resta != null ? `Así estarías sumando ${xpMenos(p.resta)}. Restar va al otro lado.` : `Sumar ${xpMenos(n)} va hacia la ${n > 0 ? 'derecha' : 'izquierda'}.`;
      }
      if (Math.abs(d) < Math.abs(n)) return `Llevas ${Math.abs(d)} de ${xpPasos(Math.abs(n))}.`;
      return Math.abs(d) > Math.abs(n) ? `Te pasaste: eran ${xpPasos(Math.abs(n))}.` : 'Justo ahí.';
    }
    return v === 0 ? 'El 0 no es positivo ni negativo: es la frontera.'
      : `Estás en ${xpMenos(v)}: a la ${v > 0 ? 'derecha del 0, es positivo' : 'izquierda del 0, es negativo'}.`;
  },
};

// Cadena de b saltos iguales de tamaño a que sale del 0; se arrastra la punta. Con b negativo la cadena se voltea.
XP.saltos = {
  ini: p => ({ b: p.desde ?? 1 }),
  ok: (s, p) => p.a * s.b === p.meta,
  sol: p => ({ b: p.meta / p.a }),
  lee: (s, p) => `$${xpPar(p.a)} \\cdot ${xpPar(s.b)} = ${p.a * s.b}$`,
  dice(s, p) {
    const n = Math.abs(s.b), t = `${n} ${n === 1 ? 'salto' : 'saltos'}`;
    if (!s.b) return 'Cero saltos: te quedas en el 0.';
    return s.b > 0 ? `${t} de ${xpMenos(p.a)}: vas por ${xpMenos(p.a * s.b)}.` : `Cruzaste el 0 y la cadena se volteó: ${t} al revés, ${xpMenos(p.a * s.b)}.`;
  },
  // Veces que corresponden a la posición x de la punta, sin salirse de la recta.
  veces(x, p) {
    let b = Math.round(x / p.a);
    while (p.a * b > p.max || p.a * b < p.min) b -= Math.sign(b);
    return b || 0;
  },
};

// Factores que se tocan para cambiarles el signo; hay que usar `menos` signos menos.
XP.signos = {
  ini: p => ({ neg: p.factores.map(() => false) }),
  valor: (s, p) => p.factores.reduce((t, f, i) => t * (s.neg[i] ? -f : f), 1),
  ok: (s, p) => s.neg.filter(Boolean).length === p.menos,
  sol: p => ({ neg: p.factores.map((_, i) => i < p.menos) }),
  lee: (s, p) => `$${p.factores.map((f, i) => `(${s.neg[i] ? -f : f})`).join('')} = ${XP.signos.valor(s, p)}$`,
  dice(s) {
    const n = s.neg.filter(Boolean).length;
    if (!n) return 'Sin signos menos nadie da la vuelta: positivo.';
    return n % 2 ? `${n === 1 ? 'Una vuelta' : `${n} vueltas`}: quedas mirando al lado negativo.` : `${n} vueltas: vuelves a mirar al lado positivo.`;
  },
};

// Predice y mira: se elige qué va a pasar y la escena (`escena`: 'recta' o 'saltos', con parámetros `en`) se anima sola
// de `de` a `a`. No se califica: acertar o no cambia la frase (`porque` explica al que no acertó).
XP.predice = {
  ini: () => ({ pick: null, visto: false }),
  ok: s => s.visto,
  sol: p => ({ pick: p.bien, visto: true }),
  lee: (s, p) => (s.visto ? p.cuenta : ''),
  dice(s, p) {
    if (s.pick == null) return 'Elige, y la escena te muestra qué pasa.';
    if (!s.visto) return 'Mira…';
    return s.pick === p.bien ? 'Lo viste venir.' : p.porque;
  },
};

// Explicación: la escena (`escena` con parámetros `en`) muestra la idea sola, por momentos { dice, de, a, cuenta };
// corre sola, sin toques: el estudiante solo mira y lee (interviene después, en la práctica y en el problema).
// Se cumple al terminar el último momento.
XP.muestra = {
  // Tiempo de lectura tras la animación de un momento: 0.8 s más 0.215 s por palabra.
  pausa: m => 800 + 215 * m.dice.split(/\s+/).length,
  ini: () => ({ n: 0, fin: false }),
  ok: (s, p) => s.fin && s.n >= p.momentos.length,
  sol: p => ({ n: p.momentos.length, fin: true }),
  lee: (s, p) => p.momentos[Math.max(0, s.n - 1)].cuenta || '',
  dice: (s, p) => p.momentos[Math.max(0, s.n - 1)].dice,
};

// Jerarquía: la expresión son fichas (números y operadores separados por espacios) y se toca la operación que sigue.
const XP_CAPA = { paren: 'Antes va lo que está dentro del paréntesis.', pot: 'Antes va la potencia.',
  mul: 'Antes van × y ÷, de izquierda a derecha.', sum: 'Sumas y restas van de izquierda a derecha.' };
XP.capas = {
  ini: p => ({ toks: p.expr.split(' ').map(t => (/^-?\d+$/.test(t) ? +t : t)), fallos: 0 }),
  ok: s => s.toks.length === 1,
  // Índice del operador que toca: dentro del paréntesis más interno, ^ primero, luego × ÷, luego + −.
  sigue(toks) {
    const hi = toks.indexOf(')'), lo = hi < 0 ? -1 : toks.lastIndexOf('(', hi);
    const a = lo + 1, b = hi < 0 ? toks.length : hi;
    for (const ops of ['^', '*/', '+-']) {
      for (let i = a; i < b; i++) if (typeof toks[i] === 'string' && ops.includes(toks[i])) return i;
    }
    return -1;
  },
  capa(toks, i) { return toks.includes(')') ? 'paren' : toks[i] === '^' ? 'pot' : '*/'.includes(toks[i]) ? 'mul' : 'sum'; },
  aplica(s, i) {
    const t = [...s.toks], a = t[i - 1], b = t[i + 1];
    const r = { '+': a + b, '-': a - b, '*': a * b, '/': a / b, '^': a ** b }[t[i]];
    t.splice(i - 1, 3, r);
    if (t[i - 2] === '(' && t[i] === ')') t.splice(i - 2, 3, r);   // un paréntesis con un solo número ya no hace falta
    return { toks: t, fallos: s.fallos };
  },
  toca(s, i) {
    const n = XP.capas.sigue(s.toks);
    return i === n ? XP.capas.aplica(s, i) : { ...s, fallos: s.fallos + 1, fallo: XP.capas.capa(s.toks, n) };
  },
  sol(p) { let s = XP.capas.ini(p); while (!XP.capas.ok(s)) s = XP.capas.aplica(s, XP.capas.sigue(s.toks)); return s; },
  lee: () => '',
  dice(s) {
    const n = s.toks.filter(t => typeof t === 'string' && '+-*/^'.includes(t)).length;
    return n ? `${n === 1 ? 'Queda una operación' : `Quedan ${n} operaciones`}.` : 'Quedó un solo número: ese es el resultado.';
  },
};

// Fichas a casillas: cada fila { tex, r } recibe la ficha r.
XP.casillas = {
  ini: p => ({ puesto: p.filas.map(() => null) }),
  ok: (s, p) => p.filas.every((f, i) => s.puesto[i] === f.r),
  sol: p => ({ puesto: p.filas.map(f => f.r) }),
  lee: () => '',
};

XP.cierre = { ini: () => ({}), ok: () => true, sol: () => ({}), lee: () => '' };

// Conjunto: fichas (`items`, pueden repetirse) que se arrastran dentro o fuera de una membrana llamada `nombre`. Fichas con
// la misma etiqueta son el mismo elemento: si ya hay una adentro, la otra se funde con ella. Se cumple cuando adentro
// están exactamente los elementos de `meta`. Con `cardinal`, el renglón muestra también n(·).
const xpEl = x => (/^[A-Za-z0-9]$/.test(x) ? x : `\\text{${x}}`);
XP.conjunto = {
  ini: () => ({ en: [], ult: null }),
  elems: (s, p) => [...new Set(s.en.map(k => p.items[k]))],
  ok(s, p) { const c = XP.conjunto.elems(s, p); return c.length === p.meta.length && p.meta.every(x => c.includes(x)); },
  sol: p => ({ en: p.items.map((x, k) => (p.meta.includes(x) ? k : -1)).filter(k => k >= 0), ult: null }),
  lee(s, p) {
    const c = XP.conjunto.elems(s, p);
    return `$${p.nombre} = \\{${c.length ? c.map(xpEl).join(', ') : '\\,'}\\}$` + (p.cardinal ? ` $\\quad n(${p.nombre}) = ${c.length}$` : '');
  },
  dice(s, p) {
    const u = s.ult, N = p.nombre;
    if (!u) return 'Arrastra adentro lo que cumple la regla. Toca un elemento para sacarlo.';
    if (u.que === 'dup') return `${u.lab} ya estaba adentro: en un conjunto nada se repite.`;
    if (u.que === 'out') return `${u.lab} salió del conjunto: ahora ${u.lab} ∉ ${N}.`;
    return p.meta.includes(u.lab) ? `${u.lab} cumple la regla: ${u.lab} ∈ ${N}.` : `${u.lab} no cumple la regla: no va en ${N}.`;
  },
};

// ------------------------------------------------------------------------------------------------------------------
// Dibujo. Nada de lo que sigue corre al cargar el archivo (las pruebas lo cargan sin navegador).

const xpStill = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;
const xpTick = () => { try { if (navigator.userActivation?.hasBeenActive) navigator.vibrate?.(6); } catch (e) { /* sin vibración */ } };

// Sonidos de la explicación: todos sintetizados (sin archivos) y suaves; se apagan con el sonido de la app (S.sfx).
const XS = (() => {
  let ac = null, bus = null, last = 0, lastPop = 0, lenta = false;
  const cache = new Map();
  const on = () => typeof S === 'undefined' || S.sfx !== false;
  const ctx = () => {
    if (!on() || typeof window === 'undefined') return null;
    try {
      ac ||= new (window.AudioContext || window.webkitAudioContext)();
      if (ac.state !== 'running') { ac.resume?.().catch?.(() => {}); if (ac.state !== 'running') return null; }
      if (!bus) { bus = ac.createGain(); bus.gain.value = 0.7; bus.connect(ac.destination); }
      return ac;
    } catch (e) { return null; }
  };
  // Nota con ataque corto, caída suave y, si se pide, un deslizamiento de tono (to).
  const tone = (f, d, { type = 'sine', t0 = 0, g = 0.05, to = 0 } = {}) => {
    const a = ctx(); if (!a) return;
    const o = a.createOscillator(), v = a.createGain(), st = a.currentTime + t0;
    o.type = type; o.frequency.setValueAtTime(f, st);
    if (to) o.frequency.exponentialRampToValueAtTime(to, st + d);
    v.gain.setValueAtTime(0.0001, st); v.gain.exponentialRampToValueAtTime(g, st + 0.012);
    v.gain.exponentialRampToValueAtTime(0.0001, st + d);
    o.connect(v).connect(bus); o.start(st); o.stop(st + d + 0.02);
  };
  // Soplo de aire filtrado: el paso de una pantalla a otra.
  const soplo = (d, f0, f1, g = 0.035) => {
    const a = ctx(); if (!a) return;
    const n = Math.floor(a.sampleRate * d), buf = a.createBuffer(1, n, a.sampleRate), ch = buf.getChannelData(0);
    for (let k = 0; k < n; k++) ch[k] = Math.random() * 2 - 1;
    const src = a.createBufferSource(), bp = a.createBiquadFilter(), v = a.createGain(), st = a.currentTime;
    src.buffer = buf; bp.type = 'bandpass'; bp.Q.value = 1.2;
    bp.frequency.setValueAtTime(f0, st); bp.frequency.exponentialRampToValueAtTime(f1, st + d);
    v.gain.setValueAtTime(0.0001, st); v.gain.exponentialRampToValueAtTime(g, st + d * 0.35); v.gain.exponentialRampToValueAtTime(0.0001, st + d);
    src.connect(bp).connect(v).connect(bus); src.start(st);
  };
  return {
    // Cada marca de la recta que se cruza: más aguda a la derecha, más grave a la izquierda.
    tick(v) { const t = Date.now(); if (t - last < 38) return; last = t; tone(620 * 2 ** (v / 30), 0.045, { type: 'triangle', g: 0.03 }); },
    hop(k) { tone(500 + 45 * k, 0.11, { type: 'triangle', g: 0.035, to: 760 + 45 * k }); },
    flip() { tone(300, 0.14, { type: 'square', g: 0.018, to: 150 }); tone(560, 0.18, { t0: 0.07, g: 0.04, to: 880 }); },
    merge() { tone(392, 0.09, { g: 0.04 }); tone(523, 0.1, { t0: 0.05, g: 0.04 }); tone(784, 0.18, { t0: 0.1, g: 0.035 }); },
    pop() { const t = Date.now(); if (t - lastPop < 45) return; lastPop = t; tone(660, 0.07, { type: 'triangle', g: 0.04, to: 990 }); },
    nope() { tone(220, 0.16, { type: 'triangle', g: 0.04, to: 165 }); },
    page() { tone(523, 0.12, { g: 0.025 }); tone(784, 0.16, { t0: 0.06, g: 0.02 }); },
    whoosh(dir = 1) { soplo(0.32, dir > 0 ? 500 : 1800, dir > 0 ? 1800 : 500); },
    idea() { [523, 659, 784, 1046].forEach((f, k) => tone(f, 0.32, { t0: k * 0.07, g: 0.04 })); },
    // Voz: baja y decodifica (una vez) el audio de una frase. Devuelve una promesa del búfer o null si no hay audio.
    carga(url) {
      const a = ctx(); if (!a) return null;
      if (!cache.has(url)) cache.set(url, xpPide(url, 20000).then(r => (r.ok ? r.arrayBuffer() : Promise.reject(r.status))).then(b => a.decodeAudioData(b)).catch(() => { cache.delete(url); return null; }));
      return cache.get(url);
    },
    // Dice una frase (la promesa de su audio) y llama a fin(true) al terminar, o a fin(false) si no se pudo o no empezó a tiempo. Devuelve cómo callarla, o null sin audio.
    voz(p, fin) {
      if (!p) return null;
      let parar = false, src = null;
      // Con mala red no se espera lo mismo en cada frase: tras un fallo el plazo se acorta hasta que una vuelva a sonar.
      let plazo = setTimeout(() => { parar = true; lenta = true; fin(false); }, lenta ? 1500 : XP_VOZ_PLAZO);
      p.then(buf => {
        if (parar) return;
        clearTimeout(plazo);
        if (!buf || !ac || ac.state !== 'running') return fin(false);
        src = ac.createBufferSource(); src.buffer = buf;
        const g = ac.createGain(); g.gain.value = 1.35;
        src.connect(g).connect(bus);
        lenta = false;
        src.onended = () => { if (!parar) { parar = true; clearTimeout(plazo); fin(true); } };
        src.start();
        if (typeof usoVivo === 'function') usoVivo(buf.duration);   // oír la explicación cuenta como estudio
        // Si el sistema detiene el sonido (una llamada), la explicación no se queda esperando el final.
        plazo = setTimeout(() => { if (parar) return; parar = true; try { src.stop(); } catch (e) { /* ya paró */ } fin(false); }, buf.duration * 1000 + 2500);
      });
      return () => { parar = true; clearTimeout(plazo); try { src?.stop(); } catch (e) { /* ya paró */ } };
    },
  };
})();

// Texto que entra palabra a palabra (las fórmulas $…$ y las **negritas** entran enteras).
function xpPalabras(txt, paso = 45) {
  const w = String(txt).match(/[^\s$*]*\$[^$]+\$[^\s$]*|[^\s$*]*\*\*[^*]+\*\*[^\s*$]*|\S+/g) || [];
  return w.map((t, k) => `<span class="xp-w" style="--w:${k}; --dw:${paso}ms">${tex(t)}</span>`).join(' ');
}

// Resorte: lleva un valor de `from` a `to` llamando a `on` en cada cuadro. Devuelve cómo detenerlo.
function xpSpring(from, to, on) {
  if (xpStill() || from === to) { on(to); return () => {}; }
  let x = from, v = 0, last = performance.now(), id = 0;
  const f = t => {
    const dt = Math.min(0.032, (t - last) / 1000); last = t;
    v += (-260 * (x - to) - 22 * v) * dt; x += v * dt;
    if (Math.abs(x - to) < 0.004 && Math.abs(v) < 0.04) return on(to);
    on(x); id = requestAnimationFrame(f);
  };
  id = requestAnimationFrame(f);
  return () => cancelAnimationFrame(id);
}

// Recorrido con tiempo fijo y arranque y frenada suaves (para lo que la escena muestra sola).
function xpTween(from, to, ms, on, done) {
  if (xpStill()) { on(to); done(); return () => {}; }
  let t0 = 0, id = requestAnimationFrame(function f(t) {
    t0 ||= t;
    const k = Math.min(1, (t - t0) / ms), e = k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2;
    on(from + (to - from) * e);
    if (k < 1) id = requestAnimationFrame(f); else done();
  });
  return () => cancelAnimationFrame(id);
}

// Destello al ganar una idea: chispas que salen del centro de la escena.
function xpChispas(stage) {
  if (xpStill()) return;
  const r = stage.getBoundingClientRect(), host = stage.closest('.explora');
  if (!host) return;
  const h = host.getBoundingClientRect();
  for (let k = 0; k < 10; k++) {
    const d = document.createElement('i'), ang = (k / 10) * 2 * Math.PI + 0.3, far = 46 + 26 * (k % 3);
    d.className = 'xp-chispa';
    d.style.left = (r.left - h.left + r.width / 2) / zk() + 'px'; d.style.top = (r.top - h.top + r.height / 2) / zk() + 'px';
    host.appendChild(d);
    d.animate([{ transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
      { transform: `translate(calc(-50% + ${Math.cos(ang) * far}px), calc(-50% + ${Math.sin(ang) * far}px)) scale(.2)`, opacity: 0 }],
    { duration: 620, easing: 'cubic-bezier(.2,.8,.2,1)' }).onfinish = () => d.remove();
  }
}

const XP_W = 340, XP_H = 156, XP_PAD = 24, XP_Y = 108;
function xpAxis(stage, p, cada = 1) {
  const n = p.max - p.min, X = v => XP_PAD + (v - p.min) / n * (XP_W - 2 * XP_PAD);
  let h = `<line class="xp-ax" x1="8" y1="${XP_Y}" x2="${XP_W - 8}" y2="${XP_Y}"/>`;
  for (let v = p.min; v <= p.max; v++) {
    const big = v % cada === 0;
    h += `<line class="xp-tk${v === 0 ? ' z' : ''}" x1="${X(v)}" y1="${XP_Y - (big ? 6 : 3)}" x2="${X(v)}" y2="${XP_Y + (big ? 6 : 3)}"/>`;
    if (big) h += `<text class="xp-lb${v === 0 ? ' z' : ''}" x="${X(v)}" y="${XP_Y + 24}">${xpMenos(v)}</text>`;
  }
  stage.innerHTML = `<svg class="xp-svg" viewBox="0 0 ${XP_W} ${XP_H}" role="img"><g class="xp-over"></g>${h}<g class="xp-dyn"></g></svg>`;
  const svg = stage.firstChild;
  // Posición del dedo en unidades de la recta.
  const at = e => { const r = svg.getBoundingClientRect(); return p.min + ((e.clientX - r.left) * XP_W / r.width - XP_PAD) / (XP_W - 2 * XP_PAD) * n; };
  return { svg, dyn: svg.querySelector('.xp-dyn'), over: svg.querySelector('.xp-over'), X, at };
}
const xpArc = (x1, x2, h, cls) => `<path class="${cls}" d="M${x1} ${XP_Y} Q${(x1 + x2) / 2} ${XP_Y - h * 2} ${x2} ${XP_Y}"/>`;
const xpClamp = (x, a, b) => Math.max(a, Math.min(b, x));

const XPD = {};
const XP_MEM = {};   // por lección: { memo, estados, hechos, i } (ver exploraPlayer)

XPD.recta = (stage, p, s, api) => {
  const { svg, dyn, over, X, at } = xpAxis(stage, p);
  let c = s.v ?? 0, touched = false, stop = null, lastV = Math.round(c), adorno = '';
  // Adornos de un momento de explicación: zona ('pos', 'neg', 'ambas') y marcas (números con aro que late).
  const adornar = (m = {}) => {
    const key = JSON.stringify([m.zona, m.marcas]); if (key === adorno) return; adorno = key;
    let h = '';
    const tramo = (a, b, cls, label, lx) => `<path class="xp-zone ${cls}" pathLength="1" d="M${X(a)} ${XP_Y} H${X(b)}"/>`
      + `<text class="xp-zlab ${cls}" x="${lx}" y="${XP_Y - 62}">${label}</text>`;
    if (m.zona === 'pos' || m.zona === 'ambas') h += tramo(0, p.max, 'pos', 'positivos', (X(0) + X(p.max)) / 2);
    if (m.zona === 'neg' || m.zona === 'ambas') h += tramo(0, p.min, 'neg', 'negativos', (X(0) + X(p.min)) / 2);
    for (const v of m.marcas || []) h += `<circle class="xp-mark" cx="${X(v)}" cy="${XP_Y}" r="17"/>`;
    over.innerHTML = h;
  };
  const tok = (x, t, cls = '') => `<g class="xp-tok ${cls}"><circle cx="${x}" cy="${XP_Y}" r="15"/><text x="${x}" y="${XP_Y + 5}">${xpMenos(t)}</text></g>`;
  function draw() {
    const v = Math.round(c), x = X(c);
    if (v !== lastV) { lastV = v; XS.tick(v); }
    let h = '';
    if (p.modo === 'dos') {
      h += `<circle class="xp-anc" cx="${X(p.ancla)}" cy="${XP_Y}" r="6"/>`;
      for (const m of s.sel) {
        h += xpArc(X(p.ancla), X(m), 17, `xp-arc${Math.abs(m - p.ancla) === p.dist ? ' good' : ''}`)
          + `<text class="xp-tag" x="${(X(p.ancla) + X(m)) / 2}" y="${XP_Y - 42}">${Math.abs(m - p.ancla)}</text>`
          + `<circle class="xp-ring${Math.abs(m - p.ancla) === p.dist ? ' good' : ''}" cx="${X(m)}" cy="${XP_Y}" r="11"/>`;
      }
      dyn.innerHTML = h; return;
    }
    // Estela: de dónde salió la ficha hasta donde va (en el espejo, desde el 0 hacia los dos lados).
    if (p.modo === 'llegar' && Math.abs(c - p.desde) > 0.05) h += `<line class="xp-trail" x1="${X(p.desde)}" y1="${XP_Y}" x2="${x}" y2="${XP_Y}"/>`;
    if (p.modo === 'espejo' && Math.abs(c) > 0.05) h += `<line class="xp-trail" x1="${X(0)}" y1="${XP_Y}" x2="${x}" y2="${XP_Y}"/><line class="xp-trail ghost" x1="${X(0)}" y1="${XP_Y}" x2="${X(-c)}" y2="${XP_Y}"/>`;
    if (p.modo === 'espejo') {
      h += `<line class="xp-mir" x1="${X(0)}" y1="${XP_Y - 70}" x2="${X(0)}" y2="${XP_Y + 10}"/>`
        + `<line class="xp-link" x1="${x}" y1="${XP_Y}" x2="${X(-c)}" y2="${XP_Y}"/>` + tok(X(-c), -v, 'ghost');
    }
    if (p.modo === 'distancia') {
      h += `<circle class="xp-anc" cx="${X(p.ancla)}" cy="${XP_Y}" r="6"/>` + xpArc(X(p.ancla), x, 20, 'xp-arc');
      const a = Math.min(p.ancla, v), b = Math.max(p.ancla, v);
      for (let k = a + 1; k <= b; k++) h += `<circle class="xp-step-dot" cx="${X(k - 0.5)}" cy="${XP_Y - 12}" r="2.4"/>`;
      if (v !== p.ancla) h += `<text class="xp-tag" x="${(X(p.ancla) + x) / 2}" y="${XP_Y - 48}">${Math.abs(v - p.ancla)} ${Math.abs(v - p.ancla) === 1 ? 'paso' : 'pasos'}</text>`;
    }
    if (p.modo === 'salto') {
      const x0 = X(p.desde), y = XP_Y - 40, d = v - p.desde, dir = Math.sign(c - p.desde);
      h += `<circle class="xp-anc hollow" cx="${x0}" cy="${XP_Y}" r="7"/>`;
      if (Math.abs(c - p.desde) > 0.15) {
        h += `<line class="xp-arrow" x1="${x0}" y1="${y}" x2="${x - dir * 7}" y2="${y}"/>`
          + `<path class="xp-head" d="M${x} ${y} l${-dir * 10} -6 v12 z"/>`
          + `<text class="xp-tag" x="${(x0 + x) / 2}" y="${y - 11}">${xpSigno(d)}</text>`;
      }
    }
    if (!touched) h += `<circle class="xp-halo" cx="${x}" cy="${XP_Y}" r="15"/>`;
    // El número bajo la ficha se agranda, como una lupa.
    h += `<rect class="xp-lb-bg" x="${X(v) - 11}" y="${XP_Y + 12}" width="22" height="18" rx="6"/><text class="xp-lb-on" x="${X(v)}" y="${XP_Y + 26}">${xpMenos(v)}</text>`;
    dyn.innerHTML = h + tok(x, v);
  }
  if (p.modo === 'dos') {
    svg.onpointerdown = e => {
      const m = xpClamp(Math.round(at(e)), p.min, p.max);
      if (m === p.ancla) return;
      s = { sel: s.sel.includes(m) ? s.sel.filter(k => k !== m) : [...s.sel, m].slice(-p.metas.length) };
      xpTick(); api.set(s); draw();
    };
  } else {
    const move = e => {
      c = xpClamp(at(e), p.min, p.max);
      if (Math.round(c) !== s.v) { s = { v: Math.round(c) }; xpTick(); api.set(s, true); }
      draw();
    };
    svg.onpointerdown = e => { touched = true; stop?.(); svg.setPointerCapture(e.pointerId); svg.classList.add('drag'); move(e); svg.onpointermove = move; };
    svg.onpointerup = svg.onpointercancel = () => {
      svg.onpointermove = null; svg.classList.remove('drag');
      api.set(s);   // la meta cuenta donde se suelta la ficha, no por donde pasa
      stop = xpSpring(c, s.v, x => { c = x; draw(); });
    };
  }
  draw();
  // mover(x): lleva la ficha sin dedo (la usa «predice y mira»).
  return Object.assign(() => stop?.(), { mover(x, m) { touched = true; c = x; s = { v: Math.round(x) }; if (m) adornar(m); draw(); } });
};

XPD.saltos =(stage, p, s, api) => {
  const { svg, dyn, X, at } = xpAxis(stage, p, Math.abs(p.a));
  let c = p.a * s.b, touched = false, stop = null, lastB = s.b, signo = Math.sign(s.b);
  function draw() {
    const b = s.b, n = Math.abs(b), paso = p.a * Math.sign(b), x = X(c);
    if (b !== lastB) { if (b && signo && Math.sign(b) !== signo) XS.flip(); else XS.hop(n); if (b) signo = Math.sign(b); lastB = b; }
    let h = `<circle class="xp-goal" cx="${X(p.meta)}" cy="${XP_Y}" r="15"/>`;
    for (let k = 0; k < n; k++) h += xpArc(X(paso * k), X(paso * (k + 1)), 13, `xp-hop${b < 0 ? ' flip' : ''}`)
      + `<circle class="xp-land${b < 0 ? ' flip' : ''}" cx="${X(paso * (k + 1))}" cy="${XP_Y}" r="3.2"/>`;
    h += `<text class="xp-tag" x="${xpClamp(x, 70, XP_W - 70)}" y="${XP_Y - 44}">${xpMenos(b)} ${n === 1 ? 'vez' : 'veces'}${b < 0 ? ' · se voltea' : ''}</text>`;
    if (!touched) h += `<circle class="xp-halo" cx="${x}" cy="${XP_Y}" r="13"/>`;
    dyn.innerHTML = h + `<g class="xp-tok${b < 0 ? ' flip' : ''}"><circle cx="${x}" cy="${XP_Y}" r="13"/></g>`;
  }
  const move = e => {
    c = xpClamp(at(e), p.min, p.max);
    const b = XP.saltos.veces(c, p);
    if (b !== s.b) { s = { b }; xpTick(); api.set(s, true); }
    draw();
  };
  svg.onpointerdown = e => { touched = true; stop?.(); svg.setPointerCapture(e.pointerId); svg.classList.add('drag'); move(e); svg.onpointermove = move; };
  svg.onpointerup = svg.onpointercancel = () => {
    svg.onpointermove = null; svg.classList.remove('drag');
    api.set(s);
    stop = xpSpring(c, p.a * s.b, x => { c = x; draw(); });
  };
  draw();
  return Object.assign(() => stop?.(), { mover(x) { touched = true; c = x; s = { b: XP.saltos.veces(x, p) }; draw(); } });
};

// Predice y mira: la escena de adentro no se toca; al elegir, se anima sola de p.de a p.a.
XPD.predice = (stage, p, s, api) => {
  stage.innerHTML = `<div class="xp-watch"></div><div class="xp-tray">${p.opciones.map((o, k) => `<button type="button" class="xp-chip" data-k="${k}">${o}</button>`).join('')}</div>`;
  const box = stage.firstChild, chips = [...stage.querySelectorAll('.xp-chip')];
  const escena = XPD[p.escena](box, p.en, XP[p.escena].ini(p.en), { set() {}, nota() {}, memo: {} });
  let stop = null;
  if (!s.visto) s = XP.predice.ini();   // si se salió a media animación, se vuelve a elegir
  const marca =() => chips.forEach((c, k) => { c.disabled = s.pick != null; c.classList.toggle('on', s.pick === k); });
  escena.mover(s.visto ? p.a : p.de); marca();
  stage.onclick = e => {
    const chip = e.target.closest('.xp-chip'); if (!chip || s.pick != null) return;
    s = { pick: +chip.dataset.k, visto: false }; xpTick(); api.set(s, true); marca();
    stop = xpTween(p.de, p.a, 1500, x => escena.mover(x), () => { s = { ...s, visto: true }; api.set(s); });
  };
  return () => { stop?.(); escena(); };
};

// Explicación por momentos: arranca sola y pasa sola de un momento al siguiente, dejando tiempo para leer.
// La escena no se toca; al final queda «Ver otra vez».
XPD.muestra = (stage, p, s, api) => {
  stage.innerHTML = `<div class="xp-watch" inert></div><div class="xp-dots" aria-hidden="true">${p.momentos.map(() => '<i></i>').join('')}</div>
    <button type="button" class="xp-sigue" hidden></button>`;
  const box = stage.firstChild, btn = stage.lastElementChild, total = p.momentos.length, mudo = { set() {}, nota() {}, memo: {} };
  const dots = [...stage.querySelectorAll('.xp-dots i')];
  const puntos = n => dots.forEach((d, k) => { d.className = k < n - 1 ? 'done' : k === n - 1 ? 'now' : ''; });
  let escena = null, stop = null, busy = false, timer = 0;
  const en = { ...p.en, momentos: p.momentos };
  const monta = () => { escena?.(); escena = XPD[p.escena](box, en, XP[p.escena].ini(en), mudo); };
  const espera = t => { btn.textContent = t; btn.hidden = false; };
  function play(n) {
    const m = p.momentos[n];
    busy = true; btn.hidden = true;
    s = { n: n + 1, fin: false }; api.set(s, true); puntos(n + 1);
    if (n) XS.page();
    // El momento sigue cuando terminan la animación y la frase. Con voz, la frase es la voz (y un respiro corto);
    // sin voz, el tiempo de lectura de siempre.
    let anim = false, oido = false;
    const sigue = () => {
      if (!anim || !oido) return;
      timer = setTimeout(() => {
        if (n + 1 < total) return play(n + 1);
        busy = false; s = { n: total, fin: true }; api.set(s); puntos(total + 1); espera('Ver otra vez');
      }, habla ? 450 : XP.muestra.pausa(m));
    };
    let habla = api.decir(m.dice, ok => { if (ok === false) habla = null; oido = true; sigue(); });
    if (!habla) oido = true;
    const done = () => { anim = true; sigue(); };
    if (escena.anima) stop = escena.anima(m, done);
    else if (m.a == null || m.a === m.de) { escena.mover(m.a ?? m.de, m); done(); }
    else { escena.mover(m.de, m); stop = xpTween(m.de, m.a, m.ms || 1500, x => escena.mover(x, m), done); }
  }
  btn.onclick = () => { if (busy) return; xpTick(); monta(); play(0); };
  monta();
  if (s.fin) {   // ya vista: queda en su último cuadro y se puede repetir
    const u = p.momentos[total - 1];
    if (!escena.anima) escena.mover(u.a ?? u.de, u); else escena.salta?.(p.momentos);
    puntos(total + 1); espera('Ver otra vez');
  } else if (!api.decir(p.texto, () => { timer = setTimeout(() => play(0), 250); })) timer = setTimeout(() => play(0), 500);
  return () => { clearTimeout(timer); stop?.(); escena(); };
};

XPD.signos =(stage, p, s, api) => {
  stage.innerHTML = `<div class="xp-fact">${p.factores.map((f, i) => `<button type="button" class="xp-f" data-i="${i}"><span></span></button>`).join('<i>·</i>')}</div>
    <div class="xp-coin"><b></b><small></small></div>`;
  const coin = stage.querySelector('.xp-coin');
  function draw(flip) {
    stage.querySelectorAll('.xp-f').forEach((b, i) => {
      b.classList.toggle('neg', s.neg[i]); b.firstChild.textContent = xpMenos(s.neg[i] ? -p.factores[i] : p.factores[i]);
      if (flip === i && !xpStill()) b.animate([{ transform: 'rotateY(90deg)' }, { transform: 'none' }], { duration: 260, easing: 'cubic-bezier(.2,.8,.2,1)' });
    });
    const n = s.neg.filter(Boolean).length, v = XP.signos.valor(s, p);
    if (flip != null) XS.flip();
    coin.classList.toggle('neg', v < 0);
    coin.querySelector('b').textContent = xpSigno(v);
    coin.querySelector('small').textContent = `${n} ${n === 1 ? 'signo menos' : 'signos menos'} · ${n % 2 ? 'impar' : 'par'}`;
    if (flip != null && !xpStill()) coin.animate([{ transform: 'rotateX(90deg) scale(.9)' }, { transform: 'none' }], { duration: 320, easing: 'cubic-bezier(.2,.8,.2,1)' });
  }
  stage.onclick = e => {
    const b = e.target.closest('.xp-f'); if (!b) return;
    const i = +b.dataset.i;
    s = { neg: s.neg.map((x, k) => (k === i ? !x : x)) };
    xpTick(); api.set(s); draw(i);
  };
  draw();
  // anima(m): en una explicación, voltea el signo del factor m.i (o solo espera si el momento no voltea nada).
  return Object.assign(() => {}, { anima(m, done) {
    if (m.i != null) { s = { neg: s.neg.map((x, k) => (k === m.i ? !x : x)) }; draw(m.i); }
    const t = setTimeout(done, 1100);
    return () => clearTimeout(t);
  } });
};

XPD.capas = (stage, p, s, api) => {
  const OP = { '+': '+', '-': '−', '*': '×', '/': '÷' };
  function draw(nuevo) {
    const t = s.toks, h = [];
    for (let i = 0; i < t.length; i++) {
      if (typeof t[i] === 'number') {
        const par = t[i] < 0 && (i > 0 || t[i + 1] === '^');
        h.push(`<span class="xp-n${i === nuevo ? ' new' : ''}">${par ? '(' : ''}${xpMenos(t[i])}${par ? ')' : ''}</span>`);
      } else if (t[i] === '^') {   // el exponente va pegado a su base: no se separan al partir el renglón
        h.push(`<span class="xp-grp">${h.pop()}<button type="button" class="xp-op pow" data-i="${i}">${t[i + 1]}</button></span>`); i++;
      } else if (t[i] === '(' || t[i] === ')') h.push(`<span class="xp-par">${t[i]}</span>`);
      else h.push(`<button type="button" class="xp-op" data-i="${i}">${OP[t[i]]}</button>`);
    }
    stage.innerHTML = `<div class="xp-expr${XP.capas.ok(s) ? ' done' : ''}">${h.join('')}</div>`;
  }
  stage.onclick = e => {
    const b = e.target.closest('.xp-op'); if (!b || XP.capas.ok(s)) return;
    const i = +b.dataset.i, r = XP.capas.toca(s, i);
    if (r.fallo) {
      s = { toks: r.toks, fallos: r.fallos }; api.nota(XP_CAPA[r.fallo]); XS.nope();
      if (!xpStill()) b.animate([{ transform: 'translateX(-5px)' }, { transform: 'translateX(5px)' }, { transform: 'none' }], { duration: 240 });
      return;
    }
    // La ficha nueva queda donde estaba el primer número de la operación (uno antes si se quitó un paréntesis).
    const nuevo = r.toks.length === s.toks.length - 4 ? i - 2 : i - 1;
    s = r; xpTick(); XS.merge(); api.nota(''); api.set(s); draw(nuevo);
  };
  draw();
  // anima(): en una explicación, señala la operación que sigue y la funde sola.
  return Object.assign(() => {}, { anima(m, done) {
    const i = XP.capas.sigue(s.toks);
    let t2 = 0;
    stage.querySelector(`.xp-op[data-i="${i}"]`)?.classList.add('now'); XS.pop();
    const t1 = setTimeout(() => {
      const r = XP.capas.aplica(s, i), nuevo = r.toks.length === s.toks.length - 4 ? i - 2 : i - 1;
      s = r; draw(nuevo); XS.merge(); t2 = setTimeout(done, 700);
    }, 1000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  } });
};

XPD.casillas = (stage, p, s, api) => {
  let malas = [], timer = 0;
  function draw() {
    const usadas = s.puesto.filter(x => x != null);
    stage.innerHTML = `<div class="xp-rows">${p.filas.map((f, i) => `<div class="xp-row"><span class="xp-q">${tex(f.tex)} =</span>
      <button type="button" class="xp-slot${s.puesto[i] != null ? ' full' : ''}${malas.includes(i) ? ' bad' : ''}" data-slot="${i}">${s.puesto[i] ?? ''}</button></div>`).join('')}</div>
      <div class="xp-tray">${p.fichas.map(f => `<button type="button" class="xp-chip" data-f="${f}"${usadas.includes(f) ? ' disabled' : ''}>${f}</button>`).join('')}</div>`;
  }
  stage.onclick = e => {
    const chip = e.target.closest('.xp-chip'), slot = e.target.closest('.xp-slot');
    if (malas.length) return;
    if (chip) { const i = s.puesto.indexOf(null); if (i < 0) return; s = { puesto: s.puesto.map((x, k) => (k === i ? chip.dataset.f : x)) }; }
    else if (slot && s.puesto[+slot.dataset.slot] != null) s = { puesto: s.puesto.map((x, k) => (k === +slot.dataset.slot ? null : x)) };
    else return;
    xpTick(); XS.pop(); api.nota(''); api.set(s);
    if (!s.puesto.includes(null) && !XP.casillas.ok(s, p)) {
      XS.nope();
      malas = p.filas.map((f, i) => (s.puesto[i] === f.r ? -1 : i)).filter(i => i >= 0);
      api.nota(p.pista || 'Casi. Mira otra vez las que tiemblan.');
      timer = setTimeout(() => { s = { puesto: s.puesto.map((x, k) => (malas.includes(k) ? null : x)) }; malas = []; api.set(s); draw(); }, 900);
    }
    draw();
  };
  draw();
  return () => clearTimeout(timer);
};

XPD.conjunto = (stage, p, s, api) => {
  stage.innerHTML = `<div class="xc"><div class="xc-mem"><i class="xc-name">${esc(p.nombre)}</i></div>${p.items.map((x, k) =>
    `<button type="button" class="xc-chip" data-k="${k}">${esc(x)}</button>`).join('')}</div>`;
  const box = stage.firstChild, mem = box.firstChild, chips = [...box.querySelectorAll('.xc-chip')];
  const dentro = k => s.en.includes(k);
  const primero = lab => s.en.find(k => p.items[k] === lab);   // la ficha que representa a ese elemento
  let orden = s.en.filter(k => primero(p.items[k]) === k);       // orden de los elementos adentro (la mezcla lo cambia)
  let marcado = -1, arr = null, anchoYa = 0;
  const filas = (ks, w, ancho) => {
    const out = [[]]; let x = 0;
    for (const k of ks) { if (x + w[k] > ancho && out.at(-1).length) { out.push([]); x = 0; } out.at(-1).push(k); x += w[k] + 8; }
    return out;
  };
  function layout() {
    const W = box.clientWidth || 300, w = chips.map(c => c.offsetWidth || 40);
    const mw = W * 0.94, mx = (W - mw) / 2, my = 2, pos = {};
    const fi = filas(orden, w, mw * 0.68), mh = Math.max(132, fi.length * 40 + 60);
    mem.style.cssText = `left:${mx}px;top:${my}px;width:${mw}px;height:${mh}px`;
    fi.forEach((f, r) => {
      let x = (W - f.reduce((a, k) => a + w[k] + 8, -8)) / 2;
      const y = my + mh / 2 - (fi.length * 40 - 6) / 2 + r * 40;
      for (const k of f) { pos[k] = [x, y]; x += w[k] + 8; }
    });
    for (const k of s.en) if (!pos[k]) pos[k] = [...(pos[primero(p.items[k])] || [W / 2, my + mh / 2])];   // fundidas
    const ft = filas(p.items.map((_, k) => k).filter(k => !dentro(k)), w, W - 12);
    ft.forEach((f, r) => {
      let x = (W - f.reduce((a, k) => a + w[k] + 8, -8)) / 2;
      for (const k of f) { pos[k] = [x, my + mh + 16 + r * 44]; x += w[k] + 8; }
    });
    box.style.height = `${my + mh + 16 + Math.max(1, ft.filter(f => f.length).length) * 44}px`;
    chips.forEach((c, k) => {
      const fund = dentro(k) && primero(p.items[k]) !== k;
      c.classList.toggle('in', dentro(k) && !fund);
      c.classList.toggle('gone', fund);
      c.classList.toggle('bad', !!p.meta && dentro(k) && !fund && !p.meta.includes(p.items[k]));
      c.classList.toggle('mark', k === marcado);
      c.setAttribute('aria-pressed', String(dentro(k)));
      if (arr?.el !== c) c.style.transform = `translate(${pos[k][0]}px, ${pos[k][1]}px)${fund ? ' scale(.4)' : ''}`;
    });
  }
  function poner(k, quieto) {
    if (dentro(k)) return;
    const dup = primero(p.items[k]) != null;
    s = { en: [...s.en, k], ult: { lab: p.items[k], que: dup ? 'dup' : 'in' } };
    if (!dup) orden.push(k);
    if (!quieto) dup ? XS.merge() : p.meta && !p.meta.includes(p.items[k]) ? XS.nope() : XS.pop();
  }
  function sacar(k, quieto) {
    if (!dentro(k)) return;
    const lab = p.items[k], quita = primero(lab) === k ? s.en.filter(j => p.items[j] === lab) : [k];   // salen también sus copias
    s = { en: s.en.filter(j => !quita.includes(j)), ult: { lab, que: 'out' } };
    orden = orden.filter(j => !quita.includes(j));
    if (!quieto) XS.tick(-12);
  }
  box.onclick = e => {
    const c = e.target.closest('.xc-chip');
    if (!c || e.detail !== 0 || c.classList.contains('gone')) return;
    const k = +c.dataset.k; if (dentro(k)) sacar(k); else poner(k);
    xpTick(); api.set(s); layout();
  };
  box.onpointerdown = e => {
    if (arr) return;   // un segundo dedo no roba la ficha que ya se arrastra
    const c = e.target.closest('.xc-chip'); if (!c || c.classList.contains('gone')) return;
    e.preventDefault();
    const m = /translate\(([-\d.]+)px, ([-\d.]+)px\)/.exec(c.style.transform) || [0, 0, 0];
    arr = { el: c, k: +c.dataset.k, x0: e.clientX, y0: e.clientY, bx: +m[1], by: +m[2], mov: false };
    try { c.setPointerCapture(e.pointerId); } catch (er) { /* sin captura */ }
    c.classList.add('drag');
  };
  box.onpointermove = e => {
    if (!arr) return;
    const dx = (e.clientX - arr.x0) / zk(), dy = (e.clientY - arr.y0) / zk();
    if (Math.hypot(dx, dy) > 6) arr.mov = true;
    if (arr.mov) arr.el.style.transform = `translate(${arr.bx + dx}px, ${arr.by + dy}px) scale(1.08)`;
  };
  box.onpointercancel = () => { if (!arr) return; arr.el.classList.remove('drag'); arr = null; layout(); };
  box.onpointerup = () => {
    if (!arr) return;
    const { el, k, mov } = arr; arr = null; el.classList.remove('drag');
    if (!mov) { if (dentro(k)) sacar(k); else poner(k); }   // un toque también sirve
    else {
      const mr = mem.getBoundingClientRect(), cr = el.getBoundingClientRect();
      const ex = ((cr.left + cr.right) / 2 - mr.left - mr.width / 2) / (mr.width / 2);
      const ey = ((cr.top + cr.bottom) / 2 - mr.top - mr.height / 2) / (mr.height / 2);
      if (ex * ex + ey * ey <= 1) poner(k); else sacar(k);
    }
    xpTick(); api.set(s); layout();
  };
  // Un momento de explicación: meter (pon), sacar (saca), reordenar (mezcla) y señalar (marca), uno tras otro.
  const pasos = (m, quieto) => [
    ...(m.pon || []).map(lab => () => { const k = p.items.findIndex((x, j) => x === lab && !dentro(j)); if (k >= 0) poner(k, quieto); }),
    ...(m.saca || []).map(lab => () => { const k = primero(lab); if (k != null) sacar(k, quieto); }),
    ...(m.mezcla ? [() => { orden.sort((a, b) => p.items[a].localeCompare(p.items[b])); if (!quieto) XS.flip(); }] : []),
    ...(m.marca != null ? [() => { marcado = primero(m.marca) ?? p.items.indexOf(m.marca); if (!quieto) XS.pop(); }] : []),
  ];
  const ro = typeof ResizeObserver === 'function' ? new ResizeObserver(() => { if (box.clientWidth !== anchoYa) { anchoYa = box.clientWidth; layout(); } }) : null;
  ro?.observe(box);
  box.classList.add('quieto'); layout();
  requestAnimationFrame(() => requestAnimationFrame(() => box.classList.remove('quieto')));
  document.fonts?.ready?.then(() => { if (box.isConnected) layout(); });
  return Object.assign(() => ro?.disconnect(), {
    anima(m, done) {
      marcado = -1; layout();
      const ps = pasos(m);
      let i = 0, t = 0;
      const sig = () => { if (i < ps.length) { ps[i++](); layout(); t = setTimeout(sig, 430); } else t = setTimeout(done, 450); };
      sig();
      return () => clearTimeout(t);
    },
    // Explicación ya vista: queda en su último cuadro, sin animar.
    salta(ms) { box.classList.add('quieto'); for (const m of ms) pasos(m, true).forEach(f => f()); marcado = -1; layout(); void box.offsetWidth; requestAnimationFrame(() => requestAnimationFrame(() => box.classList.remove('quieto'))); },
  });
};

XPD.apuesta = (stage, p, s, api) => {
  function draw() {
    stage.innerHTML = `<div class="xp-tray big">${p.opciones.map(o => `<button type="button" class="xp-chip${s.pick === o ? ' on' : ''}" data-f="${o}">${o}</button>`).join('')}</div>`;
  }
  stage.onclick = e => {
    const chip = e.target.closest('.xp-chip'); if (!chip) return;
    s = { pick: chip.dataset.f }; api.memo[p.clave] = s.pick; xpTick(); api.set(s); draw();
  };
  draw();
};

XPD.cierre = (stage, p, s, api) => {
  const pick = api.memo[p.clave], bien = pick === p.real;
  stage.innerHTML = `${pick == null ? '' : `<div class="xp-bet ${bien ? 'ok' : 'off'}"><span>Apostaste <b>${esc(pick)}</b></span><span>Era <b>${esc(p.real)}</b></span>
      <small>${bien ? 'Tu intuición ya iba bien. Ahora sabes por qué.' : 'Ahora lo puedes medir, y no hace falta apostar.'}</small></div>`}
    <ol class="xp-built">${api.ideas().map((t, i) => `<li style="--i:${i}">${tex(t)}</li>`).join('')}</ol>`;
};

// ------------------------------------------------------------------------------------------------------------------
// La explicación como «reproductor»: mismo contrato que los videos (play, destroy, opts.onEnd). Devuelve null si la
// lección no tiene explicación (o se pide otra parte, o es el feed de Clips): makePlayer sigue con el video.

function exploraPlayer(host, lesson, course, opts) {
  const def = EXPLORA[lesson.id];
  if (!def || opts.feed || (opts.clip && opts.clip !== lesson.clip)) return null;
  const hayVideo = !!(lesson.clip.bunny || lesson.clip.video || lesson.clip.youtube);
  // Lo construido se recuerda mientras la app esté abierta: al volver a la explicación desde un ejercicio (repaso)
  // se retoma donde iba, con «A practicar» a la mano, y no hay que rehacer los pasos.
  const mem = XP_MEM[lesson.id] ||= { memo: {}, estados: [], hechos: [], i: 0 };
  // Voz: si la lección tiene sus audios (js/explora-voces.js), cada frase se dice; si no, todo sigue igual que sin voz.
  let vozBase = '';
  let voces = null, callar = null, pendiente = null, muerto = false, copia = null;
  const fuentes = xpVozFuentes(lesson.id, location.hostname);
  const lista = fuentes.reduce((antes, [base, f]) => antes.then(j => j
    || xpPide(base + f, 5000).then(r => (r.ok ? r.json() : null)).then(x => { if (x) vozBase = base; return x; }).catch(() => null)), Promise.resolve(null)).then(j => {
    voces = j;
    if (j && !muerto) Object.keys(j).slice(0, 8).forEach(t => XS.carga(vozBase + j[t].f));   // las primeras frases, listas de una vez
  }).catch(() => {});
  // El audio de una frase; si su fuente falla, se busca la misma frase (por su texto) en la copia propia.
  const audio = txt => XS.carga(vozBase + voces[txt].f)?.then(b => {
    const otra = b ? null : fuentes.find(x => x[0] !== vozBase);
    if (!otra) return b;
    copia ||= xpPide(otra[0] + otra[1], 5000).then(r => (r.ok ? r.json() : null)).catch(() => null);
    return copia.then(j => (j?.[txt] ? XS.carga(otra[0] + j[txt].f) : null));
  });
  const silencio = () => { callar?.(); callar = pendiente = null; };
  const decir = (txt, fin) => {
    silencio();
    const v = voces?.[txt];
    if (!v || (typeof S !== 'undefined' && S.sfx === false)) return false;
    pendiente = fin;
    callar = XS.voz(audio(txt), ok => { pendiente = null; fin(ok); });
    return !!callar;
  };
  const { memo, estados, hechos } = mem;
  let i = Math.min(mem.i, def.pasos.length - 1), clean = null, video = null;
  const lesEl = host.closest('.lesson');
  lesEl?.classList.add('has-explora');
  // Las teclas de la lección (Enter, flechas) saltarían la explicación: aquí no pasan de este punto.
  const keys = e => {
    if (!['Enter', ' ', 'ArrowDown', 'ArrowRight', 'ArrowUp', 'ArrowLeft'].includes(e.key)) return;
    e.stopPropagation();   // la lección no avanza con estas teclas
    if (e.target.closest?.('.xp-stage') && e.target.onkeydown) e.target.onkeydown(e);   // pero la escena sí las recibe
  };
  document.addEventListener('keydown', keys, true);
  const suelta = () => { document.removeEventListener('keydown', keys, true); lesEl?.classList.remove('has-explora'); };

  host.innerHTML = `<div class="explora">
    <header class="xp-top">
      <div class="xp-segs">${def.caps.map(() => '<i><b></b></i>').join('')}</div>
      <div class="xp-meta"><span class="xp-cap"></span><button type="button" class="xp-snd" aria-label="Sonido"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9v6h4l5 4V5L8 9z"/><path class="on" d="M16.5 8.5a5 5 0 0 1 0 7M19 6a8.5 8.5 0 0 1 0 12"/><path class="off" d="M17 9l5 6M22 9l-5 6"/></svg></button><button type="button" class="xp-ideas" aria-label="Ideas que llevas"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 18h16M6 13h12M8 8h8"/></svg><b>0</b></button></div>
    </header>
    <div class="xp-step"><p class="xp-text"></p><div class="xp-stage"></div><div class="xp-read"></div><p class="xp-nota" role="status"></p>
      <div class="xp-idea" aria-live="polite"><span>Idea</span><p></p></div></div>
    <footer class="xp-foot"><button type="button" class="xp-back" aria-label="Paso anterior">‹</button><button type="button" class="btn xp-next" disabled>Seguir</button></footer>
    ${hayVideo ? '<button type="button" class="xp-video">Prefiero ver el video</button>' : ''}
    <div class="xp-sheet" hidden><div class="xp-sheet-in"><h4>Lo que llevas construido</h4><ol></ol><button type="button" class="btn ghost xp-sheet-x">Volver</button></div></div>
  </div>`;
  const $x = q => host.querySelector(q);
  const root = $x(".explora"), step = $x('.xp-step'), stage = $x('.xp-stage'), read = $x('.xp-read'), nota = $x('.xp-nota');
  const idea = $x('.xp-idea'), next = $x('.xp-next'), back = $x('.xp-back'), sheet = $x('.xp-sheet');
  // La lección pasa de video a ejercicios deslizando: aquí el dedo es para la escena, así que el gesto no sale.
  root.addEventListener('touchstart', e => e.stopPropagation(), { passive: true });

  // El andamio: si la lección tiene explicaciones (`muestra`), guarda sus ideas (los conceptos); si no, las de cada paso.
  const conMuestra = def.pasos.some(p => p.tipo === 'muestra');
  const ideas = () => def.pasos.filter((p, k) => hechos[k] && (conMuestra ? p.tipo === 'muestra' : p.tipo !== 'apuesta' && p.tipo !== 'cierre')).map(p => p.idea);
  function chrome() {
    const p = def.pasos[i];
    host.querySelectorAll('.xp-segs i').forEach((seg, c) => {
      const mine = def.pasos.map((q, k) => (q.cap === c ? k : -1)).filter(k => k >= 0);
      seg.firstChild.style.width = mine.filter(k => hechos[k]).length / mine.length * 100 + '%';
      seg.classList.toggle('now', c === p.cap);
    });
    $x('.xp-cap').textContent = def.caps[p.cap];
    $x('.xp-ideas b').textContent = ideas().length;
    back.disabled = i === 0;
    next.disabled = !hechos[i];
    next.textContent = i === def.pasos.length - 1 ? 'A practicar' : 'Seguir';
    idea.classList.toggle('show', !!hechos[i]);
    if (hayVideo) $x('.xp-video').hidden = i > 0;
    // En computador (js/escritorio.js): riel con los capítulos y las ideas, y la escena del tamaño del panel.
    if (typeof exploraRiel === 'function') exploraRiel(root, { lesson, course, pasos: def.pasos, caps: def.caps, cap: p.cap, hechos, ideas: ideas(), ir: k => { if (k !== i) { const d = k > i ? 1 : -1; i = k; show(d); } } });
  }
  function cumple(first) {
    hechos[i] = true;
    if (first) {
      XS.idea();
      xpChispas(stage);
      idea.classList.remove('gana'); void idea.offsetWidth; idea.classList.add('gana');
      const n = $x('.xp-ideas');
      if (!xpStill()) n.animate([{ transform: 'scale(1.25)' }, { transform: 'none' }], { duration: 380, easing: 'cubic-bezier(.2,.8,.2,1)' });
    }
    chrome();
  }
  function show(dir = 1) {
    clean?.(); clean = null; silencio();
    mem.i = i;
    const k = i, p = def.pasos[i], t = XP[p.tipo];   // k: este paso; una escena vieja no escribe en el paso que se ve ahora
    let s = estados[i] ?? t.ini(p);
    $x('.xp-text').innerHTML = xpPalabras(p.texto, 22);
    XS.whoosh(dir);
    idea.lastElementChild.innerHTML = tex(p.idea); idea.classList.remove('gana');
    nota.textContent = '';
    stage.onclick = null; stage.className = `xp-stage t-${p.tipo}`;
    // Renglón de la cuenta y frase con que la escena responde (un aviso de error la tapa hasta el siguiente movimiento).
    // Lo que cambia entra suave: la cuenta se funde y la frase nueva entra palabra a palabra (si no cambió, no se toca).
    let ya = { lee: null, dice: null };
    const leer = () => {
      const l = t.lee(s, p), d = t.dice?.(s, p) || '';
      if (l !== ya.lee) { ya.lee = l; read.innerHTML = tex(l); if (p.tipo === 'muestra') { read.classList.remove('swap'); void read.offsetWidth; read.classList.add('swap'); } }
      if (d !== ya.dice || nota.classList.contains('aviso')) {
        ya.dice = d; nota.classList.remove('aviso');
        nota.innerHTML = p.tipo === 'muestra' ? xpPalabras(d) : tex(d);
      }
    };
    const api = {
      memo, ideas,
      decir: (txt, fin) => (k === i ? decir(txt, ok => { if (k === i) fin(ok); }) : false),
      nota: m => { if (k !== i) return; if (!m) return leer(); nota.classList.add('aviso'); nota.textContent = m; },
      // vivo: el dedo sigue arrastrando; se actualiza el renglón pero la meta se mira al soltar.
      set(ns, vivo) { if (k !== i) return; s = estados[k] = ns; leer(); if (!vivo && !hechos[k] && t.ok(s, p)) cumple(true); },
    };
    clean = XPD[p.tipo](stage, p, s, api) || null;
    if (p.tipo !== 'muestra') decir(p.texto, () => {});   // en la práctica se dice el enunciado; la explicación dice lo suyo
    // La frase siguiente, lista antes de llegar.
    if (voces) for (const q of [def.pasos[i + 1]].filter(Boolean)) [q.texto, ...(q.momentos || []).map(m => m.dice)].forEach(x => voces[x] && XS.carga(vozBase + voces[x].f));
    leer();
    if (p.tipo === 'cierre') hechos[i] = true;
    chrome();
    if (!xpStill()) step.animate([{ opacity: 0, transform: `translateX(${dir * 28}px)` }, { opacity: 1, transform: 'none' }], { duration: 300, easing: 'cubic-bezier(.2,.8,.2,1)' });
    step.scrollTop = 0;
  }
  next.onclick = () => { if (i === def.pasos.length - 1) return opts.onEnd?.(); i++; show(1); };
  back.onclick = () => { if (i > 0) { i--; show(-1); } };
  $x('.xp-ideas').onclick = () => {
    const l = ideas();
    sheet.querySelector('ol').innerHTML = l.length ? l.map(t => `<li>${tex(t)}</li>`).join('') : '<li class="none">Aún nada: cada paso que resuelvas deja aquí su idea.</li>';
    sheet.hidden = false;
  };
  const snd = $x('.xp-snd');
  const pinta = () => {
    const on = typeof S === 'undefined' || S.sfx !== false;
    snd.classList.toggle('mute', !on); snd.setAttribute('aria-pressed', String(on));
    snd.setAttribute('aria-label', on ? 'Sonido encendido' : 'Sonido apagado');
  };
  snd.onclick = () => {
    if (typeof S === 'undefined') return;
    S.sfx = S.sfx === false; if (typeof save === 'function') save(); 
    if (S.sfx === false) { const f = pendiente; silencio(); f?.(false); }   // al callar a mitad de frase se sigue con el tiempo de lectura
    pinta(); XS.pop();
  };
  pinta();
  sheet.onclick = e => { if (e.target === sheet || e.target.closest('.xp-sheet-x')) sheet.hidden = true; };
  if (hayVideo) {
    $x('.xp-video').onclick = () => {
      clean?.(); clean = null; silencio(); suelta(); host.innerHTML = '';
      video = makeClipPlayer(host, lesson, course, opts); video.play();
    };
  }

  return {
    // Se empieza cuando llega la lista de voces (o a los 0.8 s, sin voz): así el primer enunciado también se dice.
    play() { let ya = false; const va = () => { if (!ya && !muerto) { ya = true; show(1); } }; lista.then(va); setTimeout(va, 800); },
    destroy() { muerto = true; clean?.(); clean = null; silencio(); suelta(); if (video) video.destroy(); else host.innerHTML = ''; },
  };
}
;
//#archivo js/explora-escenas.js
// Explora · tres escenas por datos para las lecciones de Razonamiento lógico (spec 2026-11-23-explora-leccion-interactiva):
//   dibujo   un dibujo SVG que depende de unos valores `v` (números): `dib(v, K)` devuelve el SVG con las piezas de K. En la
//            práctica se arrastran las `manijas` ([{ k, min, max, paso, en(v) → [x, y], de(x, y, v) → valor }]; con `k: [a, b]`
//            mueven dos valores) o un deslizador abajo (manija sin `en`: { k, min, max, paso, et }). Meta: `metas` {k: valor} o
//            `cumple(v)` con `sol`. En las explicaciones cada momento cambia `v` y el dibujo va solo hasta ahí.
//   fichas   fichas que se arrastran a casilleros o zonas (`slots`: { x, y, w, h, et, n }), con un `fondo(K, v)` detrás.
//   rejilla  una tabla de celdas que se tocan o se pintan arrastrando (marcas, ✓ / ✗, V / F).
// Y los ayudantes con que se escriben las lecciones: xpLec, xpMira (explicación) y xpHaz (práctica). Va después de explora.js.

// ------------------------------------------------------------------------------------------------- escribir lecciones
// xpLec(id, [[capítulo, paso, paso…], …, ['Ahora sí, un problema', paso]], idea del cierre)
function xpLec(id, caps, cierre, adios = 'Eso es todo lo que construiste. Con estas ideas ya puedes con los ejercicios.') {
  const ult = caps.length - 1, pasos = caps.flatMap(([, ...ps], c) => ps.map(p => ({ ...p, cap: c,
    texto: p.tipo === 'muestra' || c === ult ? p.texto : `**Tu turno.** ${p.texto}` })));
  EXPLORA[id] = { caps: caps.map(c => c[0]), pasos: [...pasos, { cap: ult, tipo: 'cierre', clave: id, real: '', texto: adios, idea: cierre }] };
}
// Explicación: momentos [lo que dice, lo que cambia en la escena, cuenta].
const xpMira = (escena, texto, en, momentos, idea) => ({ tipo: 'muestra', escena, texto, en, idea,
  momentos: momentos.map(([dice, d = {}, cuenta]) => ({ dice, ...(escena === 'dibujo' ? { v: d } : d), ...(cuenta ? { cuenta } : {}) })) });
const xpHaz = (tipo, texto, params, idea) => ({ tipo, texto, ...params, idea });

// ------------------------------------------------------------------------------------------------- piezas de dibujo
const XPK = {
  n: x => Math.round(x * 100) / 100,   // coordenada corta
  t: (x, y, s, cls = '', a = 'middle') => `<text class="xt ${cls}" x="${XPK.n(x)}" y="${XPK.n(y)}" style="text-anchor:${a}">${s}</text>`,
  l: (x1, y1, x2, y2, cls = '') => `<line class="xl ${cls}" x1="${XPK.n(x1)}" y1="${XPK.n(y1)}" x2="${XPK.n(x2)}" y2="${XPK.n(y2)}"/>`,
  r: (x, y, w, h, cls = '', rx = 3) => `<rect class="xf ${cls}" x="${XPK.n(x)}" y="${XPK.n(y)}" width="${XPK.n(Math.max(0, w))}" height="${XPK.n(Math.max(0, h))}" rx="${rx}"/>`,
  c: (x, y, r, cls = '') => `<circle class="xf ${cls}" cx="${XPK.n(x)}" cy="${XPK.n(y)}" r="${XPK.n(Math.max(0, r))}"/>`,
  p: (pts, cls = '') => `<polygon class="xf ${cls}" points="${pts.map(q => q.map(XPK.n).join(',')).join(' ')}"/>`,
  pl: (pts, cls = '') => `<polyline class="xl ${cls}" points="${pts.map(q => q.map(XPK.n).join(',')).join(' ')}"/>`,
  // Arco y sector, en grados contra las agujas del reloj.
  at: (x, y, r, g) => [x + r * Math.cos(g * Math.PI / 180), y - r * Math.sin(g * Math.PI / 180)],
  arc(x, y, r, a, b, cls = '') {
    if (Math.abs(b - a) < 0.2) return '';
    if (Math.abs(b - a) >= 359.9) return `<circle class="xl ${cls}" cx="${x}" cy="${y}" r="${r}"/>`;
    const p = XPK.at(x, y, r, a), q = XPK.at(x, y, r, b);
    return `<path class="xl ${cls}" d="M${p.map(XPK.n)} A${r} ${r} 0 ${Math.abs(b - a) > 180 ? 1 : 0} ${b > a ? 0 : 1} ${q.map(XPK.n)}"/>`;
  },
  sec(x, y, r, a, b, cls = '') {
    if (Math.abs(b - a) < 0.2) return '';
    if (Math.abs(b - a) >= 359.9) return XPK.c(x, y, r, cls);
    const p = XPK.at(x, y, r, a), q = XPK.at(x, y, r, b);
    return `<path class="xf ${cls}" d="M${XPK.n(x)} ${XPK.n(y)} L${p.map(XPK.n)} A${r} ${r} 0 ${Math.abs(b - a) > 180 ? 1 : 0} ${b > a ? 0 : 1} ${q.map(XPK.n)} Z"/>`;
  },
  // Ángulo en el vértice V entre los rayos a P y Q (el menor), con su rótulo.
  ang(V, P, Q, r, label = '', cls = 'fa', tcls = '') {
    const g = W => Math.atan2(V[1] - W[1], W[0] - V[0]) * 180 / Math.PI;
    let a = g(P), b = g(Q); b = a + (((b - a) % 360) + 540) % 360 - 180;
    const m = XPK.at(V[0], V[1], r + 15, (a + b) / 2);
    return XPK.sec(V[0], V[1], r, a, b, cls) + (label ? XPK.t(m[0], m[1] + 5, label, tcls) : '');
  },
  ar(x1, y1, x2, y2, cls = '') {   // flecha
    const a = Math.atan2(y2 - y1, x2 - x1), q = d => `${XPK.n(x2 - 9 * Math.cos(a + d))} ${XPK.n(y2 - 9 * Math.sin(a + d))}`;
    return Math.hypot(x2 - x1, y2 - y1) < 2 ? '' : XPK.l(x1, y1, x2, y2, cls) + `<path class="xl ${cls.replace(/\bd\b/, '')}" d="M${q(0.45)} L${XPK.n(x2)} ${XPK.n(y2)} L${q(-0.45)}"/>`;
  },
  f: (f, s) => (f > 0.01 ? `<g opacity="${XPK.n(Math.min(1, f))}">${s}</g>` : ''),   // aparece poco a poco: f de 0 a 1
  // Cota horizontal o vertical con su rótulo.
  cota: (x1, y1, x2, y2, s, cls = 'tm') => XPK.l(x1, y1, x2, y2, 'lm') + (y1 === y2
    ? XPK.l(x1, y1 - 4, x1, y1 + 4, 'lm') + XPK.l(x2, y1 - 4, x2, y1 + 4, 'lm') + XPK.t((x1 + x2) / 2, y1 + 17, s, cls)
    : XPK.l(x1 - 4, y1, x1 + 4, y1, 'lm') + XPK.l(x1 - 4, y2, x1 + 4, y2, 'lm') + XPK.t(x1 + 9, (y1 + y2) / 2 + 5, s, cls, 'start')),
  // Isométrica: x hacia la derecha, y hacia el fondo, z hacia arriba, en unidades de u píxeles.
  iso: (o, u, x, y, z) => [o[0] + (x - y) * u * 0.866, o[1] - (x + y) * u * 0.5 * 0.8 - z * u],
  // Caja de a × b × c con la esquina de enfrente en o; con `rej`, se ven los cubitos.
  caja(o, u, a, b, c, cls = 'fa', rej = true) {
    const I = (x, y, z) => XPK.iso(o, u, x, y, z), q = (P, cl) => XPK.p(P, cl); let h = '';
    if (c > 0.01) h += q([I(0, 0, 0), I(a, 0, 0), I(a, 0, c), I(0, 0, c)], cls) + q([I(0, 0, 0), I(0, b, 0), I(0, b, c), I(0, 0, c)], cls);
    h += q([I(0, 0, c), I(a, 0, c), I(a, b, c), I(0, b, c)], cls);
    const L = (P, Q) => { h += XPK.l(P[0], P[1], Q[0], Q[1], 'lr'); };
    if (rej) {
      for (let k = 1; k < a; k++) { L(I(k, 0, 0), I(k, 0, c)); L(I(k, 0, c), I(k, b, c)); }
      for (let k = 1; k < b; k++) { L(I(0, k, 0), I(0, k, c)); L(I(0, k, c), I(a, k, c)); }
      for (let k = 1; k < c; k++) { L(I(0, 0, k), I(a, 0, k)); L(I(0, 0, k), I(0, b, k)); }
    }
    return h;
  },
  lerp: (a, b, t) => a + (b - a) * t,
  sig: x => String(Math.round(x * 100) / 100).replace('-', '−'),
};

// -------------------------------------------------------------------------------------------------------------- dibujo
const xpArr = x => (Array.isArray(x) ? x : [x]);
// Manijas normalizadas: un deslizador es una manija cuya posición está en la regla de abajo.
function xpManijas(p) {
  const H = p.alto || 200, sl = (p.manijas || []).filter(m => !m.en), n = sl.length;
  return (p.manijas || []).map(m => {
    const ks = xpArr(m.k), g = (q, d) => { const a = xpArr(m[q] ?? d); return ks.map((_, i) => a[i] ?? a.at(-1)); };
    const b = { ...m, ks, mn: g('min', 0), mx: g('max', 10), ps: g('paso', 1) };
    if (m.en) return b;
    const y = H - 20 - (n - 1 - sl.indexOf(m)) * 44;
    return { ...b, regla: true, y, en: v => [34 + (v[ks[0]] - b.mn[0]) / (b.mx[0] - b.mn[0]) * 272, y], de: x => b.mn[0] + (x - 34) / 272 * (b.mx[0] - b.mn[0]) };
  });
}
const xpPaso = (x, mn, mx, ps) => Math.round((Math.round((xpClamp(x, mn, mx) - mn) / ps) * ps + mn) * 1000) / 1000;

XP.dibujo = {
  ini: p => ({ v: { ...p.v } }),
  ok: (s, p) => (p.cumple ? !!p.cumple(s.v) : Object.entries(p.metas).every(([k, x]) => Math.abs(s.v[k] - x) < 1e-6)),
  sol: p => ({ v: { ...p.v, ...(p.sol || p.metas) } }),
  lee: (s, p) => (p.lee ? p.lee(s.v) : ''),
  dice: (s, p) => (p.dice ? p.dice(s.v) : ''),
};

XPD.dibujo = (stage, p, s, api) => {
  const W = 340, H = p.alto || 200, ms = p.momentos ? [] : xpManijas(p);
  let vis = { ...s.v }, stop = null, dedo = null, act = null, tocado = false, foco = 0, teclas = false;
  stage.innerHTML = `<svg class="xp-svg xd" viewBox="0 0 ${W} ${H}" ${ms.length ? 'tabindex="0" role="application"' : 'role="img"'} aria-label="${ms.length ? 'Arrastra, o usa las flechas del teclado' : 'Dibujo'}"></svg>`;
  const svg = stage.firstChild;
  function draw() {
    let h = p.dib(vis, XPK);
    ms.forEach(m => {
      const [x, y] = m.en(vis);
      if (m.regla) {
        h += XPK.l(34, m.y, 306, m.y, 'lm');
        const n = (m.mx[0] - m.mn[0]) / m.ps[0];
        if (n <= 24) for (let k = 0; k <= n; k++) h += XPK.l(34 + k / n * 272, m.y - 4, 34 + k / n * 272, m.y + 4, 'lm');
        if (m.et) h += XPK.t(34, m.y - 22, m.et, 's tm', 'start');
      }
      const t = m.rot ? m.rot(vis) : m.regla ? XPK.sig(vis[m.ks[0]]) : '', r = m.r || (t.length > 2 ? 16 : 12);
      if (!tocado) h += `<circle class="xp-halo" cx="${XPK.n(x)}" cy="${XPK.n(y)}" r="${r}"/>`;
      if (teclas && ms[foco] === m) h += `<circle class="xl la" cx="${XPK.n(x)}" cy="${XPK.n(y)}" r="${r + 4}"/>`;
      h += `<g class="xp-tok"><circle cx="${XPK.n(x)}" cy="${XPK.n(y)}" r="${r}"/>${t ? `<text x="${XPK.n(x)}" y="${XPK.n(y + 5)}"${t.length > 3 ? ' style="font-size:11px"' : ''}>${t}</text>` : ''}</g>`;
    });
    svg.innerHTML = h;
  }
  const at = e => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height]; };
  function pon(m, raw, vivo) {
    const nv = { ...s.v };
    m.ks.forEach((k, i) => { nv[k] = xpPaso(raw[i], m.mn[i], m.mx[i], m.ps[i]); });
    if (m.limita && !m.limita(nv)) return;
    if (!m.ks.some(k => nv[k] !== s.v[k])) return;
    XS.tick((nv[m.ks[0]] - m.mn[0]) / ((m.mx[0] - m.mn[0]) || 1) * 18 - 6); xpTick();
    s = { v: nv }; vis = { ...nv }; draw(); api.set(s, vivo);
  }
  if (ms.length) {
    svg.onpointerdown = e => {
      if (dedo != null) return;
      const [x, y] = at(e), cerca = ms.map((m, i) => { const q = m.en(s.v); return { i, d: m.regla ? (Math.abs(y - m.y) < 22 ? 0 : 999) : Math.hypot(q[0] - x, q[1] - y) }; }).sort((a, b) => a.d - b.d)[0];
      if (cerca.d > 46) return;
      dedo = e.pointerId; foco = cerca.i; act = ms[foco]; tocado = true;
      try { svg.setPointerCapture(e.pointerId); } catch (er) { /* sin captura */ }
      svg.classList.add('drag');
      if (act.regla) pon(act, xpArr(act.de(x, y, s.v)), true); else draw();
    };
    svg.onpointermove = e => { if (e.pointerId !== dedo || !act) return; const [x, y] = at(e); pon(act, xpArr(act.de(x, y, s.v)), true); };
    svg.onpointerup = svg.onpointercancel = e => { if (e.pointerId !== dedo) return; dedo = null; act = null; svg.classList.remove('drag'); draw(); api.set(s); };
    svg.onkeydown = e => {
      teclas = true;
      const d = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowUp: [0, 1], ArrowDown: [0, -1] }[e.key];
      if (e.key === ' ' && ms.length > 1) { e.preventDefault(); foco = (foco + 1) % ms.length; tocado = true; draw(); return; }   // espacio: otra manija
      if (!d) return;
      e.preventDefault(); tocado = true;
      const m = ms[foco];
      pon(m, m.ks.map((k, i) => s.v[k] + m.ps[i] * (m.ks.length > 1 ? d[i] : d[0] + d[1]) * (m.inv?.[i] ? -1 : 1)), true); api.set(s);
    };
  }
  draw();
  const num = x => typeof x === 'number';
  return Object.assign(() => stop?.(), {
    anima(m, done) {
      const a = { ...vis }, b = { ...vis, ...m.v }, ks = Object.keys(m.v || {});
      if (ks.some(k => m.v[k] !== a[k])) XS.pop();
      stop = xpTween(0, 1, m.ms || (ks.length ? 1200 : 250), t => {
        vis = { ...b };
        for (const k in b) if (num(b[k]) && num(a[k]) && t < 1) vis[k] = a[k] + (b[k] - a[k]) * t;
        draw();
      }, done);
      return () => stop?.();
    },
    salta(l) { for (const m of l) vis = { ...vis, ...m.v }; draw(); },
  });
};

// -------------------------------------------------------------------------------------------------------------- fichas
// Estado: q[slot] = fichas puestas (etiquetas). `fichas`: las que hay abajo; con `repite` no se gastan. `fijas` {slot: ficha}.
// `donde(x, y)` → casillero (o −1) decide la zona donde se suelta cuando no son rectángulos (los círculos de un Venn).
const xpLista = x => (x == null ? [] : xpArr(x));
const xpIgual = (a, b) => [...a].sort().join('|') === [...b].sort().join('|');
XP.fichas = {
  ini: p => ({ q: p.slots.map((_, i) => xpLista(p.fijas?.[i])) }),
  ok: (s, p) => (p.cumple ? !!p.cumple(s.q) : p.meta.every((m, i) => xpIgual(s.q[i], xpLista(m)))),
  sol: p => ({ q: (p.sol || p.meta).map(xpLista) }),
  lee: (s, p) => (p.lee ? p.lee(s.q) : ''),
  puestas: (s, p) => s.q.reduce((n, l, i) => n + (p.fijas?.[i] != null ? 0 : l.length), 0),
  faltan: (s, p) => (p.sol || p.meta).reduce((n, l, i) => n + (p.fijas?.[i] != null ? 0 : xpLista(l).length), 0) - XP.fichas.puestas(s, p),
  dice(s, p) {
    if (p.dice) return p.dice(s.q);
    const f = XP.fichas.faltan(s, p), n = XP.fichas.puestas(s, p);
    return !n ? 'Arrastra cada ficha a su lugar. Con un toque también va o vuelve.' : f > 0 ? `${f === 1 ? 'Falta una ficha' : `Faltan ${f} fichas`}.` : 'Todas en su lugar: mira si cumplen.';
  },
  // Fichas que quedan abajo (null en el sitio de las que ya se pusieron).
  bandeja(s, p) {
    if (p.repite) return [...p.fichas];
    const u = s.q.flatMap((l, i) => (p.fijas?.[i] != null ? [] : l));
    return p.fichas.map(f => { const k = u.indexOf(f); if (k < 0) return f; u.splice(k, 1); return null; });
  },
};

XPD.fichas = (stage, p, s, api) => {
  const W = 340, HF = p.alto || 130, mira = !!p.momentos;
  const ancho = f => Math.max(36, String(f).length * 8 + 16);
  const filas = [[]];
  { let x = 0; p.fichas.forEach((f, k) => { const w = ancho(f); if (x + w > W - 8 && filas.at(-1).length) { filas.push([]); x = 0; } filas.at(-1).push(k); x += w + 8; }); }
  const H = HF + 14 + filas.length * 44, casa = [];   // casa: sitio de cada ficha en la bandeja
  filas.forEach((f, r) => { let x = (W - f.reduce((a, k) => a + ancho(p.fichas[k]) + 8, -8)) / 2; for (const k of f) { const w = ancho(p.fichas[k]); casa[k] = [x + w / 2, HF + 32 + r * 44]; x += w + 8; } });
  let v = { ...p.v }, marca = [], arr = null, stop = null, vuela = null, foco = null;
  stage.innerHTML = `<svg class="xp-svg xd xfi" viewBox="0 0 ${W} ${H}" role="group" aria-label="Fichas y casilleros"></svg>`;
  const svg = stage.firstChild, cap = i => p.slots[i].n || 1, SW = i => p.slots[i].w || 56, SH = i => p.slots[i].h || 42;
  const sitios = i => {   // dónde va cada ficha dentro de su casillero
    const sl = p.slots[i], l = s.q[i];
    if (cap(i) === 1) return l.map(() => [sl.x, sl.y]);
    const fs = [[]], out = []; let x = 0;
    l.forEach((f, k) => { const w = ancho(f); if (x + w > SW(i) - 8 && fs.at(-1).length) { fs.push([]); x = 0; } fs.at(-1).push(k); x += w + 5; });
    fs.forEach((f, r) => { let xx = sl.x - f.reduce((a, k) => a + ancho(l[k]) + 5, -5) / 2; for (const k of f) { const w = ancho(l[k]); out[k] = [xx + w / 2, sl.y + (sl.dy || 0) + (r - (fs.length - 1) / 2) * 34]; xx += w + 5; } });
    return out;
  };
  const ficha = (x, y, f, cls, data) => { const w = ancho(f); return `<g class="xfi-ch ${cls}" ${data} transform="translate(${XPK.n(x)} ${XPK.n(y)})"><rect x="${-w / 2}" y="-16" width="${w}" height="32" rx="9"/><text y="5">${f}</text></g>`; };
  const btn = (t, d) => (mira ? d : `${d} tabindex="0" role="button" aria-label="${String(t).replace(/"/g, '')}"`);
  function draw() {
    let h = p.fondo ? p.fondo(XPK, v, s.q) : '';
    p.slots.forEach((sl, i) => {
      const fija = p.fijas?.[i] != null, w = SW(i), hh = SH(i);
      if (!sl.libre) h += sl.red ? `<ellipse class="xfi-sl" cx="${sl.x}" cy="${sl.y}" rx="${w / 2}" ry="${hh / 2}"/>` : `<rect class="xfi-sl${marca.includes(i) ? ' on' : ''}" x="${sl.x - w / 2}" y="${sl.y - hh / 2}" width="${w}" height="${hh}" rx="10"/>`;
      if (sl.et) h += XPK.t(sl.x + (sl.ex || 0), sl.y + (sl.ey ?? hh / 2 + 16), sl.et, 's tm');
      const pos = sitios(i);
      s.q[i].forEach((f, k) => {
        if ((vuela && vuela.slot === i && vuela.k === k) || (arr?.mov && arr.slot === i && arr.k === k)) return;
        h += ficha(pos[k][0], pos[k][1], f, `in${fija ? ' fija' : ''}${marca.includes(i) ? ' mk' : ''}`, fija ? '' : btn(f, `data-slot="${i}" data-k="${k}"`));
      });
    });
    XP.fichas.bandeja(s, p).forEach((f, k) => {
      if (f == null || vuela?.casa === k || (arr?.mov && arr.casa === k && !p.repite)) return;
      h += ficha(casa[k][0], casa[k][1], f, '', btn(f, `data-casa="${k}"`));
    });
    if (vuela) h += ficha(vuela.x, vuela.y, vuela.f, 'in', '');
    if (arr?.mov) h += ficha(arr.x, arr.y, arr.f, 'drag', '');
    svg.innerHTML = h;
    if (mira) return;
    if (foco) { svg.querySelector(foco)?.focus?.(); foco = null; }
    svg.querySelectorAll('.xfi-ch[tabindex]').forEach(g => { g.onkeydown = e => { if (e.key !== 'Enter' && e.key !== ' ') return; e.preventDefault(); foco = '.xfi-ch[tabindex]'; toca(g.dataset); }; });
  }
  const quita = (i, k) => { s = { q: s.q.map((l, j) => (j === i ? l.filter((_, m) => m !== k) : l)) }; };
  const mete = (i, f) => { s = { q: s.q.map((l, j) => (j !== i ? l : cap(i) === 1 ? [f] : l.length < cap(i) ? [...l, f] : l)) }; };
  const fin = () => {
    XS.pop(); xpTick(); api.nota(''); api.set(s); draw();
    if (!XP.fichas.ok(s, p) && XP.fichas.faltan(s, p) <= 0) { XS.nope(); api.nota(p.pista || 'Casi: algo no cumple. Mueve una ficha y vuelve a mirar.'); }
  };
  const libre = i => p.fijas?.[i] == null;
  const zonas = p.slots.every((x, i) => !libre(i) || (x.n || 1) > 1);
  function toca(d) {
    if (d.casa != null) {
      const f = p.fichas[+d.casa], i = p.slots.findIndex((_, j) => libre(j) && s.q[j].length < cap(j));
      if (i < 0) return; mete(i, f);
    } else {
      const i = +d.slot, f = s.q[i][+d.k]; quita(i, +d.k);
      if (zonas) { const j = p.slots.findIndex((_, m) => m > i && libre(m) && s.q[m].length < cap(m)); if (j >= 0) mete(j, f); }   // en zonas, cada toque la pasa a la siguiente
    }
    fin();
  }
  const at = e => { const r = svg.getBoundingClientRect(); return [(e.clientX - r.left) * W / r.width, (e.clientY - r.top) * H / r.height]; };
  if (!mira) {
    svg.onpointerdown = e => {
      if (arr) return;
      const g = e.target.closest('[data-casa],[data-slot]'); if (!g) return;
      const d = { ...g.dataset }, [x, y] = at(e);
      arr = { id: e.pointerId, d, f: d.casa != null ? p.fichas[+d.casa] : s.q[+d.slot][+d.k], casa: d.casa != null ? +d.casa : -1, slot: d.slot != null ? +d.slot : -1, k: +d.k, x, y, x0: x, y0: y, mov: false };
      try { svg.setPointerCapture(e.pointerId); } catch (er) { /* sin captura */ }
    };
    svg.onpointermove = e => { if (!arr || e.pointerId !== arr.id) return; [arr.x, arr.y] = at(e); if (Math.hypot(arr.x - arr.x0, arr.y - arr.y0) > 7) arr.mov = true; if (arr.mov) draw(); };
    svg.onpointercancel = e => { if (arr && e.pointerId === arr.id) { arr = null; draw(); } };
    svg.onpointerup = e => {
      if (!arr || e.pointerId !== arr.id) return;
      const a = arr; arr = null;
      if (!a.mov) return toca(a.d);
      // El casillero donde se suelta (con un margen); si hay varios, el más cercano.
      const z = p.donde ? p.donde(a.x, a.y) : null;
      const c = p.donde ? (z >= 0 ? { i: z } : undefined) : p.slots.map((sl, i) => ({ i, dx: Math.abs(a.x - sl.x) - SW(i) / 2, dy: Math.abs(a.y - sl.y) - SH(i) / 2, d: Math.hypot(a.x - sl.x, a.y - sl.y) }))
        .filter(q => q.dx < 14 && q.dy < 14 && libre(q.i)).sort((q, r) => q.d - r.d)[0];
      if (a.slot >= 0) {
        if (c && c.i === a.slot) return draw();
        const sale = c && cap(c.i) === 1 ? s.q[c.i][0] : null;
        quita(a.slot, a.k);
        if (c) { mete(c.i, a.f); if (sale != null && cap(a.slot) === 1) mete(a.slot, sale); }   // dos fichas cambian de puesto
      } else if (c) mete(c.i, a.f); else return draw();
      fin();
    };
  }
  draw();
  const pasos = m => [...(m.saca || []).map(i => ({ saca: i })), ...Object.entries(m.pon || {}).flatMap(([i, l]) => xpLista(l).map(f => ({ slot: +i, f })))];
  const aplica = q => { if (q.saca != null) s = { q: s.q.map((l, i) => (i === q.saca ? [] : l)) }; else mete(q.slot, q.f); };
  return Object.assign(() => stop?.(), {
    anima(m, done) {
      if (m.v) v = { ...v, ...m.v };
      marca = m.marca || []; draw();
      const ps = pasos(m); let i = 0, t = 0, par = null;
      const sig = () => {
        if (i >= ps.length) { t = setTimeout(done, 350); return; }
        const q = ps[i++];
        if (q.saca != null) { aplica(q); XS.tick(-8); draw(); t = setTimeout(sig, 260); return; }
        const k = XP.fichas.bandeja(s, p).indexOf(q.f), de = k >= 0 ? casa[k] : [p.slots[q.slot].x, HF + 30];
        aplica(q);
        const kk = s.q[q.slot].length - 1, a = sitios(q.slot)[kk] || [p.slots[q.slot].x, p.slots[q.slot].y];
        par = xpTween(0, 1, 420, z => { vuela = { slot: q.slot, k: kk, casa: p.repite ? -1 : k, f: q.f, x: XPK.lerp(de[0], a[0], z), y: XPK.lerp(de[1], a[1], z) }; draw(); }, () => { vuela = null; XS.pop(); draw(); t = setTimeout(sig, 140); });
      };
      sig();
      return () => { clearTimeout(t); par?.(); };
    },
    salta(l) { for (const m of l) { if (m.v) v = { ...v, ...m.v }; pasos(m).forEach(aplica); } marca = []; draw(); },
  });
};

// ------------------------------------------------------------------------------------------------------------- rejilla
// Celdas f × c con estado 0, 1 (puesta) o 2 (tachada). `rot`: rótulo de cada estado (['', '✓', '✗']); `celda(i, r, c)`: rótulo fijo;
// `filas`, `cols`: encabezados; `dados` {i: estado} (no se cambian). Meta: índices puestos, objeto {i: estado} o cumple(celdas).
XP.rejilla = {
  ini: p => ({ c: Array.from({ length: p.f * p.c }, (_, i) => p.dados?.[i] ?? 0) }),
  ok(s, p) {
    if (p.cumple) return !!p.cumple(s.c);
    if (Array.isArray(p.meta)) return s.c.every((x, i) => (x === 1) === (p.meta.includes(i) || p.dados?.[i] === 1));
    return Object.entries(p.meta).every(([i, x]) => s.c[i] === x);
  },
  sol(p) {
    const c = XP.rejilla.ini(p).c, m = p.sol || p.meta;
    if (Array.isArray(m)) m.forEach(i => { c[i] = 1; }); else for (const i in m) c[i] = m[i];
    return { c };
  },
  lee: (s, p) => (p.lee ? p.lee(s.c) : ''),
  dice: (s, p) => (p.dice ? p.dice(s.c) : s.c.some((x, i) => x && !p.dados?.[i]) ? '' : `Toca${p.unoAUno ? '' : ' o arrastra sobre'} las casillas. Otro toque las cambia.`),
};

XPD.rejilla = (stage, p, s, api) => {
  const W = 340, izq = p.filas ? (p.izq || 78) : 0, est = p.estados || 2, y0 = p.cols ? 26 : 4;
  const cw = Math.min(p.cw || 44, (W - izq - 6) / p.c), ch = p.ch || Math.min(cw, 40), x0 = (W - izq - cw * p.c) / 2 + izq, H = y0 + ch * p.f + 6 + (p.pie ? 22 : 0);
  let luz = [], txt = {}, stop = null, dedo = null, pinta = 0, ult = -1, v = { ...p.v }, cur = -1, previa = null;
  stage.innerHTML = `<svg class="xp-svg xd xre" viewBox="0 0 ${W} ${H}" role="${p.momentos ? 'img' : 'application'}" aria-label="Tabla: flechas para moverse y Enter para marcar" ${p.momentos ? '' : 'tabindex="0"'}></svg>`;
  const svg = stage.firstChild, hueco = i => p.hueco?.(i, Math.floor(i / p.c), i % p.c);
  function draw() {
    let h = '';
    (p.cols || []).forEach((t, c) => { h += XPK.t(x0 + (c + 0.5) * cw, y0 - 8, t, 's'); });
    (p.filas || []).forEach((t, r) => { h += XPK.t(x0 - 8, y0 + (r + 0.5) * ch + 5, t, 's', 'end'); });
    for (let i = 0; i < p.f * p.c; i++) {
      const r = Math.floor(i / p.c), c = i % p.c, e = s.c[i], g = txt[i] ?? (p.celda ? p.celda(i, r, c) : ''), t = p.rot ? (p.rot[e] || g) : g;
      if (hueco(i)) continue;
      h += `<rect class="xre-c e${e}${luz.includes(i) ? ' luz' : ''}${i === cur ? ' cur' : ''}${p.dados?.[i] ? ' dado' : ''}" x="${XPK.n(x0 + c * cw + 1.5)}" y="${XPK.n(y0 + r * ch + 1.5)}" width="${XPK.n(cw - 3)}" height="${XPK.n(ch - 3)}" rx="${XPK.n(Math.min(7, cw / 5))}"/>`;
      if (t !== '') h += `<text class="xre-t e${e}" x="${XPK.n(x0 + (c + 0.5) * cw)}" y="${XPK.n(y0 + (r + 0.5) * ch + 5)}"${String(t).length * 8.4 > cw - 4 ? ' style="font-size:11px"' : ''}>${t}</text>`;
    }
    if (p.sobre) h += p.sobre(XPK, { x: c => x0 + c * cw, y: r => y0 + r * ch, cw, ch }, v, s.c);
    if (p.pie) h += XPK.t(W / 2, H - 4, p.pie, 's tm');
    svg.innerHTML = h;
  }
  const celda = e => {
    const b = svg.getBoundingClientRect(), x = (e.clientX - b.left) * W / b.width - x0, y = (e.clientY - b.top) * H / b.height - y0;
    const c = Math.floor(x / cw), r = Math.floor(y / ch);
    return c < 0 || r < 0 || c >= p.c || r >= p.f ? -1 : r * p.c + c;
  };
  const puede = i => i >= 0 && !p.dados?.[i] && !hueco(i);
  const pon = (i, e) => { if (s.c[i] === e) return; s = { c: s.c.map((x, k) => (k === i ? e : x)) }; XS.tick(i % 12); xpTick(); draw(); api.set(s, true); };
  // Al soltar se mira la meta; el aviso espera un poco, por si se sigue tocando (para poner ✗ se pasa por ✓).
  let aviso = 0;
  const suelta = () => {
    api.set(s); clearTimeout(aviso);
    if (p.pista) aviso = setTimeout(() => { if (!XP.rejilla.ok(s, p) && p.lleno?.(s.c)) { XS.nope(); api.nota(p.pista); } }, 900);
  };
  if (!p.momentos) {
    svg.onpointerdown = e => {
      if (dedo != null) return;
      clearTimeout(aviso);
      const i = celda(e); if (!puede(i)) return;
      dedo = e.pointerId; ult = i; previa = s; pinta = (s.c[i] + 1) % est;
      try { svg.setPointerCapture(e.pointerId); } catch (er) { /* sin captura */ }
      pon(i, pinta);
    };
    svg.onpointermove = e => { if (e.pointerId !== dedo || p.unoAUno || est > 2) return; const i = celda(e); if (i === ult || !puede(i)) return; ult = i; pon(i, pinta); };
    svg.onpointerup = e => {
      if (e.pointerId !== dedo) return;
      dedo = null; suelta();
    };
    svg.onpointercancel = e => {   // el gesto era desplazar la página: la casilla vuelve a como estaba
      if (e.pointerId !== dedo) return;
      dedo = null; s = previa; draw(); api.set(s);
    };
    svg.onkeydown = e => {
      const d = { ArrowRight: 1, ArrowLeft: -1, ArrowUp: -p.c, ArrowDown: p.c }[e.key];
      if (d) { e.preventDefault(); const q = cur + d; if (cur < 0) cur = 0; else if (q >= 0 && q < p.f * p.c) cur = q; draw(); } else if ((e.key === 'Enter' || e.key === ' ') && puede(cur)) { e.preventDefault(); pon(cur, (s.c[cur] + 1) % est); suelta(); }
    };
  }
  draw();
  const pasos = m => [...(m.off || []).map(i => [i, 0]), ...(m.on || []).map(i => [i, 1]), ...(m.x || []).map(i => [i, 2])];
  const antes = m => { if (m.limpia) { s = XP.rejilla.ini(p); txt = {}; } if (m.txt) txt = { ...txt, ...m.txt }; if (m.v) v = { ...v, ...m.v }; luz = m.luz || []; };
  return Object.assign(() => { stop?.(); clearTimeout(aviso); }, {
    anima(m, done) {
      antes(m); draw(); if (m.txt || m.luz) XS.pop();
      const ps = pasos(m), dt = Math.min(260, 1500 / Math.max(1, ps.length)); let i = 0, t = 0;
      const sig = () => { if (i >= ps.length) { t = setTimeout(done, 450); return; } const [k, e] = ps[i++]; s = { c: s.c.map((x, j) => (j === k ? e : x)) }; XS.tick(i); draw(); t = setTimeout(sig, dt); };
      sig();
      return () => clearTimeout(t);
    },
    salta(l) { for (const m of l) { antes(m); for (const [k, e] of pasos(m)) s = { c: s.c.map((x, j) => (j === k ? e : x)) }; } luz = []; draw(); },
  });
};
;
//#archivo js/explora-mate.js
// Explora · piezas de dibujo para las lecciones de Álgebra y Trigonometría (spec 2026-11-25-explora-algebra-trigonometria). Va
// después de explora-escenas.js. Todo son funciones puras que devuelven SVG con las piezas de XPK (K).
const XM = {
  // Recta numérica de a a b en la altura y: { X(valor) → píxel, s: dibujo }. o = { p: cada cuánto hay marca, n: 0 sin números, f: rótulo }
  linea(K, a, b, y = 100, o = {}) {
    const X = x => 24 + (x - a) / (b - a) * 292; let s = K.ar(12, y, 330, y);
    for (let x = a; x <= b + 1e-9; x += o.p || 1) s += K.l(X(x), y - 5, X(x), y + 5) + (o.n === 0 ? '' : K.t(X(x), y + 22, o.f ? o.f(x) : K.sig(x), 's tm'));
    return { X, s };
  },
  // Plano cartesiano: { X, Y, s }. o = { H alto, g paso de la cuadrícula, ex, ey rótulos de los ejes, num: cada cuánto números }
  plano(K, a, b, c, d, o = {}) {
    const H = o.H || 210, X = x => 18 + (x - a) / (b - a) * 304, Y = y => 8 + (d - y) / (d - c) * (H - 16), g = o.g || 1; let s = '';
    for (let x = Math.ceil(a / g) * g; x <= b; x += g) s += K.l(X(x), 8, X(x), H - 8, 'ls');
    for (let y = Math.ceil(c / (o.gy || g)) * (o.gy || g); y <= d; y += o.gy || g) s += K.l(18, Y(y), 322, Y(y), 'ls');
    if (c <= 0 && d >= 0) s += K.l(18, Y(0), 322, Y(0), 'lm'); if (a <= 0 && b >= 0) s += K.l(X(0), 8, X(0), H - 8, 'lm');
    return { X, Y, s, a, b, c, d };
  },
  curva(K, P, f, cls = 'la gr', u = P.a, w = P.b, n = 120) {
    let out = '', q = []; const cierra = () => { if (q.length > 1) out += K.pl(q, cls); q = []; };
    for (let i = 0; i <= n; i++) { const x = u + (w - u) * i / n, y = f(x); if (Number.isFinite(y) && y >= P.c && y <= P.d) q.push([P.X(x), P.Y(y)]); else cierra(); }
    cierra(); return out;
  },
  // Barra partida: segs = [[ancho, rótulo, clase]], anchos en partes de W.
  barra(K, y, segs, o = {}) {
    const x0 = o.x ?? 20, W = o.W || 300, h = o.h || 34, T = o.T || segs.reduce((a, s) => a + s[0], 0); let x = x0, s = '';
    for (const [w, t, c] of segs) { const p = w / T * W; s += K.r(x, y, p, h, c || 'fa') + (t !== '' && t != null && p > 10 ? K.t(x + p / 2, y + h / 2 + 5, t, 's') : ''); x += p; }
    return s;
  },
  // Renglones que van saliendo: se ven los primeros v.n.
  pasos: (K, v, l, y = 40, d = 36, cls = 'b') => l.map((t, i) => K.f(v.n - i, K.t(170, y + i * d, t, cls))).join(''),
  bolas: (K, x, y, n, cls = 'fa', u = 26, r = 10) => Array.from({ length: Math.round(n) }, (_, i) => K.c(x + i * u, y, r, cls)).join(''),
  // Rejilla de a × b cuadros de lado u.
  reja(K, x, y, a, b, u, cls = 'fa') { let s = ''; for (let i = 0; i < Math.round(a); i++) for (let j = 0; j < Math.round(b); j++) s += K.r(x + i * u, y + j * u, u - 2, u - 2, cls); return s; },
  // Rueda de radio r con el radio a g grados y sus proyecciones.
  rueda(K, x, y, r, g, o = {}) {
    const [px, py] = K.at(x, y, r, g);
    return K.l(x - r - 14, y, x + r + 14, y, 'lm') + K.l(x, y - r - 14, x, y + r + 14, 'lm') + K.arc(x, y, r, 0, 360, 'lm') + (o.arco === 0 ? '' : K.sec(x, y, 22, 0, g, 'fa'))
      + (o.cs === 0 ? '' : K.l(x, y, px, y, 'lg gr') + K.l(px, y, px, py, 'lf gr')) + K.l(x, y, px, py, 'la gr') + K.c(px, py, 5, 'fA');
  },
};
// Práctica de fichas en fila: rótulos de los casilleros, fichas buenas (en orden) y fichas que sobran.
const xpFila = (texto, et, ok, sobra, pista, idea, o = {}) => {
  const n = et.length, y = o.y || 58, W = Math.min(104, 340 / n - 12);
  return xpHaz('fichas', texto, { slots: et.map((e, i) => ({ x: 340 * (i + 0.5) / n, y, w: W, et: e })), fichas: [...ok, ...sobra].sort((a, b) => (a < b ? 1 : -1)), meta: ok, alto: y + 48, pista, ...(o.fondo ? { fondo: o.fondo } : {}) }, idea);
};
// Práctica de dibujo que se mueve.
const xpMueve = (texto, alto, v, manijas, metas, dib, idea, o = {}) => xpHaz('dibujo', texto, { alto, v, manijas, ...(typeof metas === 'function' ? { cumple: metas } : { metas }), dib, ...o }, idea);
const xpRegla = (k, min, max, et, paso = 1) => ({ k, min, max, paso, et });
;
//#archivo js/player.js
// Reproductor de clips verticales 9:16. Un clip es una secuencia de escenas animadas en canvas
// con fórmulas y subtítulos encima; si el clip trae `video`, se reproduce ese archivo.

const Narrator = {
  say(s) {
    if (!S.voice || !('speechSynthesis' in window) || !s) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(speakable(s));
    u.lang = 'es-ES'; u.rate = 1.05;
    speechSynthesis.speak(u);
  },
  stop() { if ('speechSynthesis' in window) speechSynthesis.cancel(); },
};

// Convierte TeX sencillo en algo pronunciable.
function speakable(s) {
  return s.replace(/\*\*/g, '').replace(/\$([^$]+)\$/g, (_, m) => m
    .replace(/\\[dt]?frac\{([^}]*)\}\{([^}]*)\}/g, ' $1 sobre $2 ')
    .replace(/\\sqrt\{([^}]*)\}/g, ' raíz de $1 ')
    .replace(/\^2/g, ' al cuadrado').replace(/\^\{?(\w+)\}?/g, ' a la $1 ')
    .replace(/\\(sen|sin|cos|tan)/g, (_, f) => ({ sen: ' seno ', sin: ' seno ', cos: ' coseno ', tan: ' tangente ' })[f])
    .replace(/\\theta/g, ' theta ').replace(/\\pi/g, ' pi ').replace(/\\lim/g, ' límite ')
    .replace(/\\[a-zA-Z]+/g, ' ').replace(/[{}_\\]/g, ' ').replace(/=/g, ' igual a ')
    .replace(/\s+/g, ' '));
}

class ClipPlayer {
  constructor(host, lesson, course, opts = {}) {
    this.lesson = lesson; this.course = course; this.opts = opts;
    this.scenes = (opts.clip || lesson.clip).scenes;
    this.total = this.scenes.reduce((s, x) => s + x.d, 0);
    this.t = 0; this.cur = -1; this.playing = false;
    const el = (this.el = document.createElement('div'));
    el.className = 'clip paused' + (opts.feed ? ' in-feed' : '');
    el.style.setProperty('--c', course.color);
    el.innerHTML = `<canvas></canvas>
      <div class="clip-prog">${this.scenes.map(() => '<i><b></b></i>').join('')}</div>
      <div class="clip-head"><span class="clip-course">${esc(course.name)}</span><strong>${esc(lesson.title)}</strong></div>
      <div class="clip-title"></div><div class="clip-steps"></div><div class="clip-text"></div>
      <div class="clip-play">${ICON.play}</div>`;
    host.appendChild(el);
    this.cv = el.querySelector('canvas');
    this.ctx = this.cv.getContext('2d');
    this.bars = [...el.querySelectorAll('.clip-prog b')];
    this.$title = el.querySelector('.clip-title');
    this.$steps = el.querySelector('.clip-steps');
    this.$text = el.querySelector('.clip-text');
    this.stepEls = [];
    el.addEventListener('click', () => this.toggle());
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(el);
  }

  resize() {
    const r = this.el.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
    if (!r.width) return;
    this.W = r.width; this.H = r.height;
    this.cv.width = Math.round(r.width * dpr); this.cv.height = Math.round(r.height * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.render();
  }

  toggle() { this.playing ? this.pause() : this.play(); }

  play() {
    if (this.playing) return;
    if (this.t >= this.total) { this.t = 0; this.cur = -1; }
    this.playing = true;
    this.el.classList.remove('paused');
    this.last = performance.now();
    this.render();
    this.speak();
    this.raf = requestAnimationFrame(this.tick);
  }

  pause() {
    this.playing = false;
    cancelAnimationFrame(this.raf);
    this.el.classList.add('paused');
    Narrator.stop();
  }

  tick = now => {
    if (!this.playing) return;
    this.t += Math.min(0.1, (now - this.last) / 1000);
    if (!this.opts.loop && typeof usoVivo === 'function') usoVivo();   // mirar la escena cuenta, aunque no se toque nada
    this.last = now;
    if (this.t >= this.total) {
      this.opts.onEnd?.();
      if (this.opts.loop) { this.t = 0; this.cur = -1; }
      else { this.t = this.total; this.render(); this.playing = false; this.el.classList.add('paused'); return; }
    }
    this.render();
    this.raf = requestAnimationFrame(this.tick);
  };

  sceneAt(t) {
    let acc = 0;
    for (let i = 0; i < this.scenes.length; i++) {
      const d = this.scenes[i].d;
      if (t < acc + d || i === this.scenes.length - 1) return [i, clamp01((t - acc) / d)];
      acc += d;
    }
  }

  render() {
    if (!this.W) return;
    const [i, lp] = this.sceneAt(this.t);
    if (i !== this.cur) { this.cur = i; this.showScene(i); }
    const sc = this.scenes[i], W = this.W, H = this.H;
    drawClipBg(this.ctx, W, H, this.course.color, this.t);
    // En el feed se deja libre la columna derecha de botones.
    const box = this.opts.feed
      ? { x: W * 0.07, y: H * 0.33, w: W * 0.86 - 64, h: H * 0.38 }
      : { x: W * 0.08, y: H * 0.3, w: W * 0.84, h: H * 0.4 };
    if (sc.viz) drawViz(this.ctx, sc.viz, ease(clamp01(lp / 0.8)), box);
    if (sc.steps) {
      const n = sc.steps.length, k = Math.min(n, 1 + Math.floor(lp * n * 1.25));
      this.stepEls.forEach((e, j) => e.classList.toggle('on', j < k));
    }
    this.bars.forEach((b, j) => { b.style.width = (j < i ? 100 : j > i ? 0 : lp * 100) + '%'; });
  }

  showScene(i) {
    const sc = this.scenes[i];
    this.$title.innerHTML = sc.title ? tex(sc.title) : '';
    this.$title.hidden = !sc.title;
    this.$steps.innerHTML = (sc.steps || []).map(s => `<div>${tex(s)}</div>`).join('');
    this.$steps.classList.toggle('below-title', !!sc.title);
    this.stepEls = [...this.$steps.children];
    this.$text.innerHTML = tex(sc.text);
    this.$text.classList.remove('in'); void this.$text.offsetWidth; this.$text.classList.add('in');
    if (this.playing) this.speak();
  }

  speak() {
    const sc = this.scenes[this.cur];
    if (sc) Narrator.say(sc.say || sc.text);
  }

  destroy() {
    this.pause();
    this.ro.disconnect();
    this.el.remove();
  }
}

// Controles compartidos de los videos: barra que se toca o arrastra para adelantar,
// tiempo y botones de ±10 s (visibles en pausa).
const VIDEO_UI = `
  <div class="seek" role="slider" tabindex="0" aria-label="Posición del video" aria-valuemin="0"><div class="seek-track"><b></b></div></div>
  <span class="seek-time"></span>
  <div class="seek-skip">
    <button type="button" data-skip="-10" aria-label="Retroceder 10 segundos">−10 s</button>
    <button type="button" data-skip="10" aria-label="Adelantar 10 segundos">+10 s</button>
  </div>`;

// Botón redondo de audio (estilo LinkedIn Learning): bocina normal o tachada.
const MUTE_BTN = `<button class="v-mute" type="button" aria-label="Silenciar">${ICON.sound}</button>`;
function syncMuteBtn(btn, muted) {
  btn.innerHTML = muted ? ICON.mute : ICON.sound;
  btn.setAttribute('aria-label', muted ? 'Activar sonido' : 'Silenciar');
  btn.classList.toggle('is-muted', muted);
}

// Piñón de ajustes: velocidad (se recuerda entre videos) y, con Bunny, calidad, en un solo menú.
const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
const GEAR_ICON = `<svg class="i" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>`;
const SPEED_UI = `<div class="v-speed">
    <button class="v-gear" type="button" aria-haspopup="true" aria-label="Ajustes del video">${GEAR_ICON}</button>
    <div class="v-q-menu" role="menu" hidden>
      <p class="v-set-h">Velocidad <span class="v-speed-now"></span></p>
      <div class="v-set-row v-speed-list"></div>
      <div class="v-quality" hidden>
        <p class="v-set-h">Calidad <span class="v-q-now"></span></p>
        <div class="v-set-row v-q-list"></div>
      </div>
    </div>
  </div>`;

function attachSpeed(el, apply) {
  const wrap = el.querySelector('.v-speed'), btn = wrap.querySelector('.v-gear'), menu = wrap.querySelector('.v-q-menu');
  const list = wrap.querySelector('.v-speed-list');
  const render = () => {
    const cur = S.videoSpeed || 1;
    wrap.querySelector('.v-speed-now').textContent = cur === 1 ? 'Normal' : `${cur}x`;
    list.querySelectorAll('button').forEach(b => b.classList.toggle('on', Number(b.dataset.r) === cur));
  };
  list.innerHTML = SPEEDS.map(r => `<button type="button" data-r="${r}">${r}x</button>`).join('');
  wrap.addEventListener('click', e => e.stopPropagation());
  btn.addEventListener('click', () => { menu.hidden = !menu.hidden; });
  list.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
    S.videoSpeed = Number(b.dataset.r);
    save();
    apply(S.videoSpeed);
    render();
  }));
  render();
  apply(S.videoSpeed || 1);
}

// Teclado de la barra: flechas de 5 en 5 segundos, Inicio y Fin. null = esa tecla no es de la barra.
function seekKey(key, t, d) {
  if (!d) return null;
  const a = { ArrowRight: t + 5, ArrowUp: t + 5, ArrowLeft: t - 5, ArrowDown: t - 5, Home: 0, End: d }[key];
  return a == null ? null : Math.min(d, Math.max(0, a));
}

function attachSeek(el, api) {
  const zone = el.querySelector('.seek'), bar = zone.querySelector('b'), label = el.querySelector('.seek-time');
  const mmss = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
  const show = t => {
    const d = api.duration();
    if (!d) return;
    bar.style.width = (100 * t) / d + '%';
    label.textContent = `${mmss(t)} / ${mmss(d)}`;
    zone.setAttribute('aria-valuemax', Math.round(d)); zone.setAttribute('aria-valuenow', Math.round(t)); zone.setAttribute('aria-valuetext', label.textContent);
  };
  const timeAt = e => {
    const r = zone.getBoundingClientRect();
    return clamp01((e.clientX - r.left) / r.width) * api.duration();
  };
  let dragging = false;
  zone.addEventListener('pointerdown', e => {
    e.stopPropagation();
    if (!api.duration()) return;
    dragging = true;
    zone.setPointerCapture(e.pointerId);
    el.classList.add('seeking');
    show(timeAt(e));
  });
  zone.addEventListener('pointermove', e => { if (dragging) show(timeAt(e)); });
  zone.addEventListener('pointerup', e => {
    if (!dragging) return;
    dragging = false;
    el.classList.remove('seeking');
    api.seek(timeAt(e));
  });
  zone.addEventListener('click', e => e.stopPropagation());
  zone.addEventListener('keydown', e => {
    const t = seekKey(e.key, api.time(), api.duration());
    if (t == null) return;
    e.preventDefault(); e.stopPropagation();   // la flecha mueve el video, no cambia de ejercicio
    api.seek(t); show(t);
  });
  el.querySelectorAll('[data-skip]').forEach(b => b.addEventListener('click', e => {
    e.stopPropagation();
    const t = Math.min(api.duration(), Math.max(0, api.time() + Number(b.dataset.skip)));
    api.seek(t);
    show(t);
  }));
  return { update: () => { if (!dragging) show(api.time()); } };
}

// hls.js reproduce los videos por partes (HLS) de Bunny Stream con varias calidades.
let hlsLib = null;
function loadHls() {
  hlsLib ??= new Promise((resolve, reject) => {
    if (window.Hls) return resolve(window.Hls);
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/hls.js/1.5.13/hls.min.js?sri';
    s.integrity = 'sha384-w6Gb3fXHb5e1LUYa/hYA5Q41bEDglN5ZPCG7Jvnoo8/X90oGnlPqBlBJCe38mEMm';   // la misma copia verificada que carga index.html
    s.crossOrigin = 'anonymous';
    s.onload = () => resolve(window.Hls);
    s.onerror = e => { hlsLib = null; reject(e); };   // sin red: la próxima vez se pide de nuevo
    document.head.appendChild(s);
  });
  return hlsLib;
}

const MAX_QUALITY = 1080;

// Variante para videos propios: un .mp4 (clip.video) o un video de Bunny Stream
// (clip.bunny = '<id del video>'). El video ya trae su encabezado y sus subtítulos;
// aquí van la barra para adelantar, el botón de sonido y, con Bunny, el de calidad.
class VideoClip {
  constructor(host, lesson, course, opts = {}) {
    this.opts = opts;
    this.wantPlay = false;
    const clip = opts.clip || lesson.clip;
    const base = clip.bunny ? `https://${bunnyHost(clip.bunny)}/${clip.bunny}` : '';
    const src = clip.bunny ? `${base}/playlist.m3u8` : clip.video;
    const el = (this.el = document.createElement('div'));
    // En la lección no hay miniatura: mientras carga se ve la rueda (.clip-loading) sobre fondo liso,
    // y no una imagen fija que luego salta al video. En el feed de Clips la miniatura sí ayuda a hojear.
    el.className = 'clip paused is-video' + (opts.feed ? ' in-feed' : ' loading');
    el.style.setProperty('--c', course.color);
    el.innerHTML = `<video playsinline preload="metadata"></video>
      <div class="clip-loading" role="status" aria-label="Cargando video"><i></i></div>
      <div class="clip-play">${ICON.play}</div>${VIDEO_UI}${MUTE_BTN}${SPEED_UI}`;
    host.appendChild(el);
    this.v = el.querySelector('video');
    this.muteBtn = el.querySelector('.v-mute');
    // Con sonido por defecto; si el navegador lo bloquea, play() arranca en silencio.
    this.v.muted = !!S.videoMuted;
    syncMuteBtn(this.muteBtn, this.v.muted);
    const seek = attachSeek(el, {
      duration: () => this.v.duration || 0,
      time: () => this.v.currentTime,
      seek: t => { this.v.currentTime = t; },
    });
    this.v.addEventListener('timeupdate', seek.update);
    this.v.addEventListener('volumechange', () => syncMuteBtn(this.muteBtn, this.v.muted));
    const setRate = r => { this.v.defaultPlaybackRate = r; this.v.playbackRate = r; };
    attachSpeed(el, setRate);
    this.v.addEventListener('loadedmetadata', () => setRate(S.videoSpeed || 1));
    // Arranque automático: si play() se pidió antes de que el video estuviera listo (HLS carga
    // aparte) o el navegador lo pospuso, se vuelve a intentar en cuanto se puede reproducir.
    this.v.addEventListener('canplay', () => { if (this.wantPlay && this.v.paused) this.play(); });
    // La rueda se ve desde que se pide reproducir hasta el primer cuadro en movimiento, y vuelve si
    // el video se queda esperando datos (conexión lenta).
    const loading = on => this.el.classList.toggle('loading', on);
    this.v.addEventListener('playing', () => loading(false));
    this.v.addEventListener('waiting', () => loading(this.wantPlay && !this.opts.feed));
    // Si el video no carga, quien creó el reproductor puede cambiarlo por las escenas de respaldo (opts.onFail).
    this.v.addEventListener('error', () => { this.stall(); opts.onFail?.(); });
    this.v.addEventListener('ended', () => {
      opts.onEnd?.();
      if (opts.loop) { this.v.currentTime = 0; this.play(); } else this.el.classList.add('paused');
    });
    this.muteBtn.addEventListener('click', e => {
      e.stopPropagation();
      this.v.muted = !this.v.muted;
      S.videoMuted = this.v.muted;
      save();
    });
    el.addEventListener('click', () => this.toggle());
    // Avance: segundos vistos del video de la lección (no en el feed de Clips).
    if (!opts.feed && lesson.id && typeof cuentaProgreso === 'function') {
      this.v.addEventListener('timeupdate', () => { if (this.v.currentTime > (S.secs?.[lesson.id] || 0) + 5) cuentaProgreso(lesson.id, { segundos: this.v.currentTime }); });
    }
    if (!clip.bunny) { this.v.src = src; return; }
    // Bunny: la dirección la entrega el servidor, firmada y solo si la cuenta puede ver el video (js/cuenta.js).
    // Mientras llega, play() solo deja anotado que se quiere reproducir (this.pending).
    const attach = b => {
      if (this.dead) return;
      this.pending = false;
      if (opts.feed) this.v.poster = `${b}/thumbnail.jpg`;
      this.attachHls(`${b}/playlist.m3u8`);
    };
    if (typeof cuentaVideoBase !== 'function') return attach(base);
    const ya = cuentaVideoBaseYa(clip.bunny);
    if (ya) return attach(ya);   // ya se pidió al abrir la hoja de la lección: arranca en el mismo toque
    this.pending = true;
    cuentaVideoBase(clip.bunny).then(attach, () => { if (!this.dead) { this.pending = false; this.stall(); opts.onFail?.(); } });
  }

  // hls.js se carga con la app (index.html), así el video arranca en el mismo toque que abre
  // la clase y el navegador permite el sonido. Si aún no está, se carga aquí.
  attachHls(src) {
    if (window.Hls) return this.setupHls(window.Hls, src);
    loadHls().then(Hls => this.setupHls(Hls, src), () => this.setupHls(null, src));
  }

  setupHls(Hls, src) {
    if (this.dead) return;
    if (Hls?.isSupported()) {
      this.hls = new Hls({ maxMaxBufferLength: 60 });
      this.hls.loadSource(src);
      this.hls.attachMedia(this.v);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => this.setupQuality());
      this.hls.on(Hls.Events.LEVEL_SWITCHED, () => this.showQuality());
      // Sin red o sin el video, hls.js no dispara 'error' en el <video>: se avisa aquí.
      this.hls.on(Hls.Events.ERROR, (_, d) => { if (d.fatal) this.stall(); });
    } else {
      // Safari en iPhone reproduce HLS por sí mismo; ahí la calidad es siempre automática.
      this.v.src = src;
    }
    if (this.wantPlay) this.play();
  }

  // Calidad "p" de un nivel: el nombre que le da Bunny (1080p/video.m3u8) o, si no, el lado
  // corto de la imagen (en un video vertical 1080 × 1920 es 1080p, no 1920p).
  qualityOf(level) {
    const named = String(level.url?.[0] ?? level.url ?? '').match(/(\d{3,4})p\//);
    if (named) return Number(named[1]);
    return Math.min(level.width || level.height, level.height || level.width) || 0;
  }

  // Una opción por calidad (hasta 1080p), de mayor a menor, más "Automática".
  setupQuality() {
    const best = new Map();
    this.hls.levels.forEach((l, i) => {
      const q = this.qualityOf(l);
      if (!q || q > MAX_QUALITY) return;
      if (!best.has(q) || l.bitrate > this.hls.levels[best.get(q)].bitrate) best.set(q, i);
    });
    this.levels = [...best].sort((a, b) => b[0] - a[0]).map(([height, index]) => ({ height, index }));
    if (!this.levels.length) return;
    const maxIndex = Math.max(...this.levels.map(l => l.index));
    this.hls.autoLevelCapping = maxIndex;
    const menu = this.el.querySelector('.v-quality .v-q-list');
    menu.innerHTML = [`<button type="button" data-q="auto">Auto</button>`,
      ...this.levels.map(l => `<button type="button" data-q="${l.height}">${l.height}p</button>`)].join('');
    menu.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
      S.videoQuality = b.dataset.q === 'auto' ? 'auto' : Number(b.dataset.q);
      save();
      this.applyQuality();
    }));
    this.applyQuality();
    this.el.querySelector('.v-quality').hidden = this.levels.length < 2;
  }

  applyQuality() {
    const pick = this.levels.find(l => l.height === S.videoQuality);
    this.hls.currentLevel = pick ? pick.index : -1;
    this.showQuality();
  }

  showQuality() {
    if (!this.hls || !this.levels) return;
    const auto = this.hls.autoLevelEnabled;
    const level = this.hls.levels[this.hls.currentLevel];
    const now = level && this.qualityOf(level);
    this.el.querySelector('.v-quality .v-q-now').textContent = auto ? `Auto${now ? ` · ${now}p` : ''}` : `${now}p`;
    this.el.querySelectorAll('.v-quality .v-q-list button').forEach(b => {
      b.classList.toggle('on', auto ? b.dataset.q === 'auto' : Number(b.dataset.q) === now);
    });
  }

  get playing() { return !this.v.paused; }
  toggle() { this.playing ? this.pause() : this.play(); }

  play() {
    this.wantPlay = true;
    this.v.autoplay = true;
    this.el.classList.remove('paused');
    if (!this.opts.feed && (this.v.paused || this.v.readyState < 3)) this.el.classList.add('loading');
    if (this.pending) return;   // aún sin dirección del video: setupHls llama a play() cuando llegue
    this.v.play().catch(e => {
      // Si el navegador bloquea el sonido, arranca en silencio y ofrece activarlo.
      // Si ni en silencio deja arrancar, se quita la rueda y queda el botón de reproducir.
      const blocked = er => { if (er?.name === 'NotAllowedError') this.pause(); };
      if (this.v.muted || !this.wantPlay) return blocked(e);
      this.v.muted = true; this.v.play().catch(blocked);
    });
  }

  // El video no pudo cargar: sin rueda, con el botón de reproducir para reintentar.
  stall() { this.wantPlay = false; this.el.classList.remove('loading'); this.el.classList.add('paused'); }

  pause() { this.wantPlay = false; this.v.autoplay = false; this.v.pause(); this.el.classList.add('paused'); this.el.classList.remove('loading'); }
  speak() {}

  destroy() {
    this.dead = true;
    this.pause();
    this.hls?.destroy();
    this.v.removeAttribute('src');
    this.v.load();
    this.el.remove();
  }
}

// Variante para videos de YouTube (clip: { youtube: '<id>' }). Usa el reproductor
// oficial sin controles; el iframe se agranda dentro de un marco con overflow oculto
// para recortar la franja de arriba (avatar y título del canal) y la de abajo
// (logo), y una capa transparente encima evita que esa interfaz aparezca al tocar.
let ytApi = null;
function loadYouTubeApi() {
  if (!ytApi) {
    ytApi = new Promise(resolve => {
      if (window.YT?.Player) return resolve();
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { prev?.(); resolve(); };
      const s = document.createElement('script');
      s.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(s);
    });
  }
  return ytApi;
}

class YouTubeClip {
  constructor(host, lesson, course, opts = {}) {
    this.opts = opts;
    this.wantPlay = false;
    this.player = null;
    const el = (this.el = document.createElement('div'));
    el.className = 'clip paused is-video is-youtube' + (opts.feed ? ' in-feed' : '');
    el.style.setProperty('--c', course.color);
    el.innerHTML = `<div class="yt-crop"><div class="yt-frame"></div></div>
      <div class="yt-shield"></div>
      <div class="clip-play">${ICON.play}</div>${VIDEO_UI}${MUTE_BTN}${SPEED_UI}`;
    host.appendChild(el);
    this.seekUi = attachSeek(el, {
      duration: () => this.player?.getDuration?.() || 0,
      time: () => { const s = this.player?.getCurrentTime?.() || 0; if (s !== this.vistoT && typeof usoVivo === 'function') usoVivo(); this.vistoT = s; return s; },
      seek: t => {
        this.player.seekTo(t, true);
        if (el.classList.contains('ended')) this.play();
      },
    });
    this.muteBtn = el.querySelector('.v-mute');
    syncMuteBtn(this.muteBtn, !!S.videoMuted);
    attachSpeed(el, r => this.player?.setPlaybackRate?.(r));
    el.querySelector('.yt-shield').addEventListener('click', () => this.toggle());
    this.muteBtn.addEventListener('click', e => {
      e.stopPropagation();
      if (!this.player?.isMuted) return;
      const muted = !this.player.isMuted();
      muted ? this.player.mute() : this.player.unMute();
      S.videoMuted = muted;
      save();
      syncMuteBtn(this.muteBtn, muted);
    });
    // El video 9:16 se ve completo (sin cortar los bordes) y el iframe tiene 64 px extra
    // arriba y abajo (franjas donde YouTube pinta avatar, título y logo), que quedan fuera.
    this.layout = () => {
      const f = el.querySelector('.yt-crop iframe');
      const { clientWidth: W, clientHeight: H } = el;
      if (!f || !W) return;
      const vw = Math.min(W, (H * 9) / 16), vh = (vw * 16) / 9;
      // El marco recortado mide justo lo que el video; el iframe sobresale 64 px por arriba y por abajo.
      Object.assign(el.querySelector('.yt-crop').style, {
        width: vw + 'px', height: vh + 'px', left: (W - vw) / 2 + 'px', top: (H - vh) / 2 + 'px',
      });
      Object.assign(f.style, { width: vw + 'px', height: vh + 128 + 'px', left: '0px', top: '-64px' });
    };
    this.ro = new ResizeObserver(this.layout);
    this.ro.observe(el);
    loadYouTubeApi().then(() => {
      if (this.dead) return;
      this.player = new YT.Player(el.querySelector('.yt-frame'), {
        videoId: (opts.clip || lesson.clip).youtube,
        host: 'https://www.youtube-nocookie.com',
        playerVars: {
          controls: 0, rel: 0, playsinline: 1, modestbranding: 1, iv_load_policy: 3,
          disablekb: 1, fs: 0, cc_load_policy: 0, origin: location.origin,
        },
        events: {
          onReady: () => {
            el.classList.add('ready');
            this.layout();
            if (S.videoMuted) this.player.mute();
            this.player.setPlaybackRate(S.videoSpeed || 1);
            if (this.wantPlay) this.play();
          },
          onStateChange: e => this.onState(e.data),
        },
      });
    });
  }

  get playing() { return this.player?.getPlayerState?.() === 1; }
  toggle() { this.wantPlay ? this.pause() : this.play(); }

  play() {
    this.wantPlay = true;
    this.el.classList.remove('paused', 'ended');
    if (!this.player?.playVideo) return;
    this.player.playVideo();
    // Si el navegador bloquea la reproducción con sonido, arranca en silencio y ofrece activarlo.
    clearTimeout(this.autoplayCheck);
    this.autoplayCheck = setTimeout(() => {
      if (this.wantPlay && !this.dead && this.player.getPlayerState() !== 1) {
        this.player.mute();
        this.player.playVideo();
        syncMuteBtn(this.muteBtn, true);
      }
    }, 900);
  }

  pause() {
    this.wantPlay = false;
    this.el.classList.add('paused');
    this.player?.pauseVideo?.();
  }

  onState(state) {
    clearInterval(this.ticker);
    if (state === 1) {
      this.el.classList.remove('paused', 'ended');
      syncMuteBtn(this.muteBtn, this.player.isMuted());
      this.ticker = setInterval(this.seekUi.update, 250);
    } else if (state === 2) {
      this.seekUi.update();
    } else if (state === 0) {
      this.seekUi.update();
      this.opts.onEnd?.();
      if (this.opts.loop) { this.player.seekTo(0); this.player.playVideo(); }
      else { this.wantPlay = false; this.el.classList.add('paused', 'ended'); }
    }
  }

  speak() {}

  destroy() {
    this.dead = true;
    this.wantPlay = false;
    clearInterval(this.ticker);
    clearTimeout(this.autoplayCheck);
    this.ro.disconnect();
    this.player?.destroy?.();
    this.el.remove();
  }
}

// Si la lección tiene explicación interactiva (js/explora.js), va en lugar del video; desde ella se puede pedir el video.
const makePlayer = (host, lesson, course, opts) =>
  (typeof exploraPlayer === 'function' && exploraPlayer(host, lesson, course, opts)) || makeClipPlayer(host, lesson, course, opts);
const makeClipPlayer = (host, lesson, course, opts) =>
  // opts.clip elige uno de los videos de la lección (ver clipsOf); por defecto, el primero.
  (opts.clip || lesson.clip).youtube ? new YouTubeClip(host, lesson, course, opts)
    : (opts.clip || lesson.clip).video || (opts.clip || lesson.clip).bunny ? new VideoClip(host, lesson, course, opts)
      : new ClipPlayer(host, lesson, course, opts);
;
//#archivo js/guia.js
// Guía «Cómo se juega» (spec 2026-11-16-guia-y-colores): antes de cada ejercicio o juego que el estudiante ve por
// primera vez sale una tarjeta con un primer ejemplo animado: una mano hace el gesto (tocar, arrastrar, girar,
// mantener, lanzar…) sobre una escena pequeña con fichas del propio juego. Después queda el botón «Cómo se juega»
// junto a la pista. Los pasos de cada juego están en GUIDES; las escenas, en GUIDE_SCENES (dibujadas en un lienzo
// con la paleta de los juegos, así sirven en tema claro y oscuro).
//   guideSteps(ex) → [[escena, texto, opciones]]      openGuide(ex, { auto })      guideButton(ex) → html

const GUIDE_MS = 3600;   // lo que dura una vuelta de la animación de un paso
const GUIDE_W = 300, GUIDE_H = 150;   // tamaño de diseño de la escena

const gEase = u => (u <= 0 ? 0 : u >= 1 ? 1 : u * u * (3 - 2 * u));
const gSeg = (t, a, b) => gEase((t - a) / (b - a));
const gMix = (a, b, u) => a + (b - a) * u;

function gBox(ctx, x, y, w, h, r) {
  ctx.beginPath();
  if (ctx.roundRect) ctx.roundRect(x, y, w, h, r); else ctx.rect(x, y, w, h);
}
function gText(ctx, txt, x, y, size, col, maxW = 280, weight = 700) {
  txt = String(txt);
  // Con matemática (a⁻³, 3/4, √12, $…$) se dibuja como fórmula.
  if (typeof formulaWanted === 'function' && formulaWanted(txt)) { ctx.fillStyle = col; drawFormulaCtx(ctx, txt, x, y + 1, { size, maxW, weight, align: 'center' }); return; }
  ctx.font = `${weight} ${size}px ${gameFont()}, system-ui, sans-serif`;
  const w = ctx.measureText(txt).width || 0;
  if (w > maxW) ctx.font = `${weight} ${Math.max(8, size * maxW / w)}px ${gameFont()}, system-ui, sans-serif`;
  ctx.fillStyle = col; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillText(txt, x, y + 1);
}
// Ficha centrada en (x, y) con labio; sin relleno propio usa la tarjeta del tema con borde.
function gTile(ctx, C, x, y, w, h, txt, fill, o = {}) {
  const f = fill || C.card, r = o.r ?? 8;
  if (o.ring) { ctx.strokeStyle = o.ring; ctx.lineWidth = 1.5; gBox(ctx, x - w / 2 - 3, y - h / 2 - 3, w + 6, h + 8, r + 3); ctx.stroke(); }
  ctx.fillStyle = fill ? shade(f, 0.74) : C.line; gBox(ctx, x - w / 2, y - h / 2 + 2, w, h, r); ctx.fill();
  ctx.fillStyle = f; gBox(ctx, x - w / 2, y - h / 2, w, h, r); ctx.fill();
  if (!fill) { ctx.strokeStyle = C.line; ctx.lineWidth = 1; gBox(ctx, x - w / 2, y - h / 2, w, h, r); ctx.stroke(); }
  if (txt != null && txt !== '') gText(ctx, txt, x, y, o.size ?? 16, fill ? inkOn(f, C.ink) : C.ink, w - 8);
}
function gPill(ctx, C, txt, x, y, col, size = 12) {
  ctx.font = `700 ${size}px ${gameFont()}, system-ui, sans-serif`;
  const w = Math.min(280, (ctx.measureText(String(txt)).width || 40) + 18), h = size + 11;
  ctx.fillStyle = col; gBox(ctx, x - w / 2, y - h / 2, w, h, h / 2); ctx.fill();
  gText(ctx, txt, x, y, size, inkOn(col, C.ink), w - 10);
}
function gSlot(ctx, C, x, y, w, h, col, solid) {
  ctx.strokeStyle = col || C.mute; ctx.lineWidth = solid ? 2.5 : 1.5;
  if (!solid) ctx.setLineDash([4, 4]);
  gBox(ctx, x - w / 2, y - h / 2, w, h, 10); ctx.stroke(); ctx.setLineDash([]);
}
const gDark = C => inkOn(C.bg) === '#FFFFFF';
// La mano: un índice que señala, con los otros dedos doblados y el pulgar a un lado; la yema queda en (x, y).
// Crema con borde azul noche (se ve sobre cualquier tema y cualquier ficha). Al presionar se encoge un poco y
// salen rayitas alrededor de la punta, además de la onda.
function gHand(ctx, C, x, y, down, pulse = 0) {
  const hot = gDark(C) ? C.sun : C.coral;
  if (down) {
    ctx.strokeStyle = hot; ctx.lineWidth = 2.5; ctx.globalAlpha = 0.85 - 0.6 * pulse;
    ctx.beginPath(); ctx.arc(x, y, 12 + 12 * pulse, 0, 6.2832); ctx.stroke(); ctx.globalAlpha = 1;
  }
  ctx.save(); ctx.translate(x, y); ctx.rotate(-0.36); ctx.scale(down ? 0.8 : 0.86, down ? 0.8 : 0.86);
  ctx.lineJoin = 'round'; ctx.lineCap = 'round';
  if (down) {
    ctx.strokeStyle = hot; ctx.lineWidth = 3;
    for (const a of [-2.75, -2.1, -1.57, -1.04, -0.39]) {
      ctx.beginPath(); ctx.moveTo(Math.cos(a) * 10, Math.sin(a) * 10 - 1); ctx.lineTo(Math.cos(a) * 16, Math.sin(a) * 16 - 1); ctx.stroke();
    }
  }
  ctx.fillStyle = '#FFF4E2'; ctx.strokeStyle = '#1D2052'; ctx.lineWidth = 2.4;
  ctx.beginPath();
  ctx.moveTo(-4.5, 1); ctx.arc(0, 1, 4.5, Math.PI, 0);                 // punta del índice
  ctx.lineTo(4.5, 14); ctx.arc(9, 14, 4.5, Math.PI, 0);                // nudillo del medio
  ctx.lineTo(13.5, 16); ctx.arc(17.5, 16, 4, Math.PI, 0);              // anular
  ctx.lineTo(21.5, 19); ctx.arc(25, 19, 3.5, Math.PI, 0);              // meñique
  ctx.lineTo(28.5, 30); ctx.bezierCurveTo(28.5, 42, 19, 46, 10, 46);   // canto de la mano
  ctx.bezierCurveTo(3, 46, -1, 42, -5, 37);                            // base
  ctx.lineTo(-14, 27); ctx.bezierCurveTo(-18, 22, -12, 17, -8, 21);    // pulgar
  ctx.lineTo(-4.5, 25); ctx.closePath();
  ctx.fill(); ctx.stroke();
  ctx.lineWidth = 2;                                                    // separación entre los dedos doblados
  ctx.beginPath(); ctx.moveTo(4.5, 14); ctx.lineTo(4.5, 23); ctx.moveTo(13.5, 16); ctx.lineTo(13.5, 24); ctx.moveTo(21.5, 19); ctx.lineTo(21.5, 25); ctx.stroke();
  ctx.restore();
}
// Mano que va de un punto a otro: u en 0…1.
const gGo = (a, b, u) => [gMix(a[0], b[0], u), gMix(a[1], b[1], u)];
function gHeart(ctx, x, y, s, col) {
  ctx.fillStyle = col; ctx.beginPath();
  ctx.arc(x - s * 0.42, y - s * 0.2, s * 0.5, 0, 6.2832); ctx.arc(x + s * 0.42, y - s * 0.2, s * 0.5, 0, 6.2832); ctx.fill();
  ctx.beginPath(); ctx.moveTo(x - s * 0.9, y + s * 0.05); ctx.lineTo(x + s * 0.9, y + s * 0.05); ctx.lineTo(x, y + s); ctx.closePath(); ctx.fill();
}

const GUIDE_SCENES = {
  // Tocar fichas: o = { items: [etiquetas], pick: [índices en orden] }
  tap(ctx, C, t, o) {
    const items = o.items || ['A', 'B', 'C'], picks = [].concat(o.pick ?? 0), n = items.length, gap = 8;
    const w = Math.min(n === 1 ? 150 : 70, (284 - (n - 1) * gap) / n), x0 = 150 - (n * w + (n - 1) * gap) / 2 + w / 2, y = 58;
    const X = i => x0 + i * (w + gap), m = picks.length, span = 0.82 / m, on = new Set();
    let h = [150, 138], down = false, pulse = 0;
    picks.forEach((pi, k) => {
      const a = 0.05 + k * span;
      if (t < a) return;
      const from = k ? [X(picks[k - 1]) + w * 0.24, y + 17] : [150, 138];
      h = gGo(from, [X(pi) + w * 0.24, y + 17], gSeg(t, a, a + span * 0.5));   // la yema toca abajo a la derecha: no tapa el rótulo
      const pr = (t - (a + span * 0.55)) / (span * 0.3);
      down = pr >= 0 && pr <= 1; pulse = Math.max(0, Math.min(1, pr));
      if (pr >= 0) on.has(pi) && o.toggle ? on.delete(pi) : on.add(pi);
    });
    items.forEach((s, i) => gTile(ctx, C, X(i), y, w, 46, s, on.has(i) ? C.mint : null, { ring: on.has(i) ? C.ok : null, size: 17 }));
    gHand(ctx, C, h[0], h[1], down, pulse);
  },
  // Arrastrar una ficha a una casilla: o = { tile, slot, cord (cuerda entre dos etiquetas), dot (se arrastra un punto) }
  drag(ctx, C, t, o) {
    const A = [76, 104], B = [222, 50], u = gSeg(t, 0.3, 0.68), placed = t > 0.7;
    const pos = [gMix(A[0], B[0], u), gMix(A[1], B[1], u) - Math.sin(Math.PI * u) * 12];
    if (o.dot) {
      ctx.strokeStyle = C.line; ctx.lineWidth = 1;
      for (let i = 0; i <= 6; i++) { ctx.beginPath(); ctx.moveTo(30 + i * 40, 18); ctx.lineTo(30 + i * 40, 132); ctx.stroke(); }
      for (let j = 0; j <= 3; j++) { ctx.beginPath(); ctx.moveTo(30, 18 + j * 38); ctx.lineTo(270, 18 + j * 38); ctx.stroke(); }
      ctx.strokeStyle = placed ? C.ok : C.mute; ctx.lineWidth = 2; ctx.setLineDash(placed ? [] : [4, 4]);
      ctx.beginPath(); ctx.arc(B[0], B[1], 15, 0, 6.2832); ctx.stroke(); ctx.setLineDash([]);
      ctx.strokeStyle = C.sky; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(pos[0], pos[1]); ctx.stroke();
      ctx.fillStyle = C.sky; ctx.globalAlpha = 0.3; ctx.beginPath(); ctx.arc(pos[0], pos[1], 17, 0, 6.2832); ctx.fill(); ctx.globalAlpha = 1;
      ctx.beginPath(); ctx.arc(pos[0], pos[1], 9, 0, 6.2832); ctx.fill();
    } else if (o.cord) {
      gTile(ctx, C, A[0], A[1], 84, 40, o.tile ?? 'A', C.sky);
      gTile(ctx, C, B[0], B[1], 84, 40, o.slot ?? 'B', null, { ring: placed ? C.ok : null });
      gTile(ctx, C, B[0], 112, 84, 40, o.other ?? '…', null);
      ctx.strokeStyle = placed ? C.ok : C.coral; ctx.lineWidth = 3; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(A[0] + 42, A[1]); ctx.lineTo(placed ? B[0] - 42 : pos[0], placed ? B[1] : pos[1]); ctx.stroke();
    } else {
      gSlot(ctx, C, B[0], B[1], 92, 46, placed ? C.ok : C.mute, placed);
      if (o.slot) gText(ctx, o.slot, B[0], B[1] + 36, 12, C.mute, 130);
      gSlot(ctx, C, A[0], A[1], 84, 40, C.line);
      gTile(ctx, C, pos[0], pos[1], 84, 40, o.tile ?? '5', C.sky, { size: 16 });
    }
    const pre = gSeg(t, 0.04, 0.24), h = t < 0.26 ? gGo([150, 140], [A[0], A[1] + 12], pre) : t < 0.74 ? [pos[0], pos[1] + 12] : gGo([B[0], B[1] + 12], [B[0] + 22, B[1] + 40], gSeg(t, 0.74, 0.9));
    gHand(ctx, C, h[0], h[1], t > 0.24 && t < 0.72, gSeg(t, 0.24, 0.34));
  },
  // Botones − / +: o = { from, to, label }
  step(ctx, C, t, o) {
    const from = o.from ?? 2, to = o.to ?? 4, dir = to >= from ? 1 : -1, n = Math.max(1, Math.min(3, Math.abs(to - from)));
    let done = 0, down = false, pulse = 0;
    for (let k = 0; k < n; k++) { const a = 0.24 + k * 0.19, pr = (t - a) / 0.1; if (pr >= 0) done = k + 1; if (pr >= 0 && pr <= 1) { down = true; pulse = pr; } }
    const v = from + dir * done, y = 98,   /* cada toque suma o resta uno */ bx = 150 + dir * 68;
    const shown = Math.min(12, Math.abs(v)), bw = 16, x0 = 150 - (shown * (bw + 4) - 4) / 2;
    for (let i = 0; i < shown; i++) { ctx.fillStyle = i >= Math.min(12, Math.abs(from)) ? C.mint : C.sky; gBox(ctx, x0 + i * (bw + 4), 30, bw, 26, 5); ctx.fill(); }
    ctx.fillStyle = C.card; ctx.strokeStyle = C.line; ctx.lineWidth = 2; gBox(ctx, 60, y - 20, 180, 40, 14); ctx.fill(); ctx.stroke();
    for (const s of [-1, 1]) {
      const hot = s === dir && down;
      ctx.fillStyle = hot ? C.mint : C.sky; ctx.beginPath(); ctx.arc(150 + s * 68, y, 14, 0, 6.2832); ctx.fill();
      gText(ctx, s < 0 ? '−' : '+', 150 + s * 68, y - 1, 20, inkOn(hot ? C.mint : C.sky, C.ink));
    }
    gText(ctx, negTxt(v), 150, y, 20, C.ink, 80);
    if (o.label) gText(ctx, o.label, 150, y + 34, 12, C.mute, 200);
    const h = gGo([150, 142], [bx, y + 12], gSeg(t, 0.04, 0.2));
    gHand(ctx, C, h[0], h[1], down, pulse);
  },
  // Deslizar una perilla (o.vert: subir una barra): o = { label }
  slide(ctx, C, t, o) {
    const u = gSeg(t, 0.28, 0.7), down = t > 0.22 && t < 0.74;
    let k;
    if (o.vert) {
      const base = 126, hgt = gMix(34, 88, u), goal = base - 88;
      ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(60, base); ctx.lineTo(240, base); ctx.stroke();
      ctx.fillStyle = C.line; gBox(ctx, 84, base - 60, 40, 60, 6); ctx.fill();
      ctx.strokeStyle = C.mute; ctx.lineWidth = 1.5; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(150, goal); ctx.lineTo(230, goal); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = t > 0.7 ? C.mint : C.sky; gBox(ctx, 170, base - hgt, 40, hgt, 6); ctx.fill();
      k = [190, base - hgt];
    } else {
      const x0 = 46, x1 = 254, y = 84, x = gMix(x0 + 30, x1 - 44, u);
      ctx.lineCap = 'round'; ctx.strokeStyle = C.line; ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
      ctx.strokeStyle = C.sky; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x, y); ctx.stroke();
      ctx.strokeStyle = C.mute; ctx.lineWidth = 1.5;
      for (let i = 0; i <= 8; i++) { ctx.beginPath(); ctx.moveTo(x0 + i * 26, y + 12); ctx.lineTo(x0 + i * 26, y + 18); ctx.stroke(); }
      if (o.label) gPill(ctx, C, o.label, x, y - 30, t > 0.7 ? C.mint : C.sky);
      k = [x, y];
    }
    ctx.fillStyle = C.cream; ctx.strokeStyle = C.night; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(k[0], k[1], 11, 0, 6.2832); ctx.fill(); ctx.stroke();
    const h = t < 0.24 ? gGo([150, 142], [k[0], k[1] + 12], gSeg(t, 0.04, 0.22)) : [k[0], k[1] + 12];
    gHand(ctx, C, h[0], h[1], down, gSeg(t, 0.22, 0.32));
  },
  // Girar alrededor de un centro (ruedas, agujas, brújulas).
  turn(ctx, C, t) {
    const cx = 150, cy = 80, r = 50, a0 = -0.25, a = gMix(a0, -2.1, gSeg(t, 0.28, 0.7));
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(cx, cy, r, 0, 6.2832); ctx.stroke();
    for (let i = 0; i < 12; i++) { const b = i * 0.5236; ctx.beginPath(); ctx.moveTo(cx + Math.cos(b) * (r - 5), cy + Math.sin(b) * (r - 5)); ctx.lineTo(cx + Math.cos(b) * r, cy + Math.sin(b) * r); ctx.stroke(); }
    ctx.fillStyle = C.sky; ctx.globalAlpha = 0.35; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r - 8, a, a0); ctx.closePath(); ctx.fill(); ctx.globalAlpha = 1;
    ctx.strokeStyle = C.mute; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(a0) * r, cy + Math.sin(a0) * r); ctx.stroke();
    const k = [cx + Math.cos(a) * r, cy + Math.sin(a) * r];
    ctx.strokeStyle = C.sky; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(k[0], k[1]); ctx.stroke();
    ctx.fillStyle = C.cream; ctx.strokeStyle = C.night; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(k[0], k[1], 10, 0, 6.2832); ctx.fill(); ctx.stroke();
    const h = t < 0.24 ? gGo([230, 140], [k[0], k[1] + 12], gSeg(t, 0.04, 0.22)) : [k[0], k[1] + 12];
    gHand(ctx, C, h[0], h[1], t > 0.22 && t < 0.74, gSeg(t, 0.22, 0.32));
  },
  // Mantener presionado y soltar a tiempo.
  hold(ctx, C, t) {
    const u = gSeg(t, 0.24, 0.66), down = t > 0.2 && t < 0.68, x = 96, base = 126, top = 24, lvl = gMix(8, 62, u);
    ctx.fillStyle = t > 0.68 ? C.mint : C.sky; gBox(ctx, x - 26, base - lvl, 52, lvl, 4); ctx.fill();
    ctx.strokeStyle = C.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x - 28, top); ctx.lineTo(x - 28, base); ctx.lineTo(x + 28, base); ctx.lineTo(x + 28, top); ctx.stroke();
    ctx.strokeStyle = C.coral; ctx.lineWidth = 2; ctx.setLineDash([5, 4]); ctx.beginPath(); ctx.moveTo(x - 38, base - 62); ctx.lineTo(x + 38, base - 62); ctx.stroke(); ctx.setLineDash([]);
    gTile(ctx, C, 200, 70, 108, 40, down ? 'presionado…' : t > 0.68 ? '¡suelta!' : 'mantén', down ? C.mint : C.sky, { size: 14 });
    const h = gGo([226, 144], [226, 88], gSeg(t, 0.04, 0.2));
    gHand(ctx, C, h[0], t > 0.72 ? h[1] + 14 * gSeg(t, 0.72, 0.85) : h[1], down, (t * 5) % 1);
  },
  // Lanzar: deslizar hacia el blanco, o (o.back) estirar hacia atrás y soltar.
  fling(ctx, C, t, o) {
    const fly = gSeg(t, 0.5, 0.82);
    if (o.back) {
      const F = [96, 100], pull = gSeg(t, 0.2, 0.46), P = t < 0.5 ? [gMix(F[0], 56, pull), gMix(F[1] - 6, 120, pull)] : [gMix(56, 244, fly), gMix(120, 112, fly) - Math.sin(Math.PI * fly) * 78];
      ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(30, 126); ctx.lineTo(276, 126); ctx.stroke();
      ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.strokeStyle = C.mute; ctx.beginPath(); ctx.moveTo(F[0], 126); ctx.lineTo(F[0], F[1]); ctx.moveTo(F[0], F[1]); ctx.lineTo(F[0] - 10, F[1] - 18); ctx.moveTo(F[0], F[1]); ctx.lineTo(F[0] + 10, F[1] - 18); ctx.stroke();
      if (t < 0.5) { ctx.strokeStyle = C.coral; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(F[0] - 10, F[1] - 18); ctx.lineTo(P[0], P[1]); ctx.lineTo(F[0] + 10, F[1] - 18); ctx.stroke(); }
      ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(244, 126); ctx.lineTo(244, 92); ctx.stroke();
      ctx.fillStyle = fly >= 1 ? C.ok : C.coral; ctx.beginPath(); ctx.moveTo(244, 92); ctx.lineTo(266, 99); ctx.lineTo(244, 106); ctx.closePath(); ctx.fill();
      ctx.fillStyle = C.sky; ctx.beginPath(); ctx.arc(P[0], P[1], 8, 0, 6.2832); ctx.fill();
      if (t > 0.2 && t < 0.5) gPill(ctx, C, `estirón ${Math.round(1 + pull * 3)}`, 76, 34, C.sky, 11);
      const h = t < 0.2 ? gGo([150, 142], [F[0], F[1] + 8], gSeg(t, 0.04, 0.18)) : t < 0.5 ? [P[0], P[1] + 12] : [56, 132];
      gHand(ctx, C, h[0], h[1], t > 0.18 && t < 0.5, gSeg(t, 0.18, 0.28));
    } else {
      const S0 = [120, 118], T = [214, 40], sw = gSeg(t, 0.2, 0.46), P = t < 0.5 ? S0 : [gMix(S0[0], T[0], fly), gMix(S0[1], T[1], fly) - Math.sin(Math.PI * fly) * 26];
      [[86, '12'], [214, '30']].forEach(([x, s]) => {
        const hit = x === 214 && fly >= 1;
        ctx.strokeStyle = hit ? C.ok : C.coral; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(x, 44, 26, 8, 0, 0, 6.2832); ctx.stroke();
        gText(ctx, s, x, 24, 14, C.ink);
      });
      if (t > 0.2 && t < 0.5) { ctx.strokeStyle = C.mute; ctx.lineWidth = 2; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(S0[0], S0[1]); ctx.lineTo(gMix(S0[0], T[0], sw * 0.5), gMix(S0[1], T[1], sw * 0.5)); ctx.stroke(); ctx.setLineDash([]); }
      ctx.fillStyle = C.coral; ctx.beginPath(); ctx.arc(P[0], P[1], 11, 0, 6.2832); ctx.fill();
      const h = t < 0.2 ? gGo([150, 144], [S0[0], S0[1] + 12], gSeg(t, 0.04, 0.18)) : t < 0.5 ? [gMix(S0[0], T[0], sw * 0.5), gMix(S0[1], T[1], sw * 0.5) + 12] : [167, 91];
      gHand(ctx, C, h[0], h[1], t > 0.18 && t < 0.48, gSeg(t, 0.18, 0.28));
    }
  },
  // Deslizar: una tarjeta a un lado, un tablero de fichas (o.board) o un corte (o.cut).
  swipe(ctx, C, t, o) {
    const u = gSeg(t, 0.26, 0.62);
    if (o.board) {
      const s = 40, x0 = 150 - 2 * s, y = 58, done = t > 0.62;
      for (let i = 0; i < 4; i++) gSlot(ctx, C, x0 + s / 2 + i * s, y, s - 6, s - 6, C.line);
      if (!done) { gTile(ctx, C, gMix(x0 + s / 2, x0 + 3.5 * s, u), y, s - 8, s - 8, '5', C.sky); gTile(ctx, C, gMix(x0 + 2.5 * s, x0 + 3.5 * s, u), y, s - 8, s - 8, '5', C.sky); }
      else gTile(ctx, C, x0 + 3.5 * s, y, s - 8, s - 8, '10', C.mint, { ring: C.ok });
      const h = t < 0.24 ? gGo([150, 142], [100, 112], gSeg(t, 0.04, 0.22)) : [gMix(100, 200, u), 112];
      ctx.strokeStyle = C.mute; ctx.lineWidth = 2; ctx.setLineDash([4, 4]); ctx.beginPath(); ctx.moveTo(100, 104); ctx.lineTo(h[0], 104); ctx.stroke(); ctx.setLineDash([]);
      gHand(ctx, C, h[0], h[1], t > 0.22 && t < 0.64, gSeg(t, 0.22, 0.32));
    } else if (o.cut) {
      const cut = t > 0.5, d = cut ? 3 * gSeg(t, 0.5, 0.7) : 0;
      gPill(ctx, C, o.ref ?? '2/3', 150, 22, C.sky, 13);
      if (cut) { gTile(ctx, C, 104 - d, 76 - d / 2, 30, 40, '', C.mint); gTile(ctx, C, 138 + d, 76 + d / 2, 30, 40, '', C.mint); gText(ctx, o.good ?? '4/6', 121, 76, 16, inkOn(C.mint, C.ink)); }
      else gTile(ctx, C, 121, 76, 64, 40, o.good ?? '4/6', null);
      gTile(ctx, C, 236, 104, 64, 40, o.bad ?? '3/5', null);
      const a = [70, 112], b = [168, 44], h = t < 0.24 ? gGo([150, 144], a, gSeg(t, 0.04, 0.22)) : gGo(a, b, u);
      if (t > 0.24) { ctx.strokeStyle = gDark(C) ? C.sun : C.coral; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(a[0], a[1]); ctx.lineTo(h[0], h[1]); ctx.stroke(); }
      gHand(ctx, C, h[0], h[1] + 12, t > 0.22 && t < 0.64, gSeg(t, 0.22, 0.32));
    } else {
      const x = gMix(150, 196, u), rot = 0.14 * u;
      gPill(ctx, C, o.left ?? '← una', 62, 22, C.line, 12); gPill(ctx, C, o.right ?? 'otra →', 238, 22, t > 0.62 ? C.mint : C.line, 12);
      ctx.save(); ctx.translate(x, 84); ctx.rotate(rot); gTile(ctx, C, 0, 0, 96, 60, o.card ?? '…', null, { size: 15 }); ctx.restore();
      const h = t < 0.24 ? gGo([150, 146], [172, 108], gSeg(t, 0.04, 0.22)) : [x + 22, 108];
      gHand(ctx, C, h[0], h[1], t > 0.22 && t < 0.64, gSeg(t, 0.22, 0.32));
    }
  },
  // Trazar un camino por puntos: o = { labels }
  trace(ctx, C, t, o) {
    const L = o.labels || ['1', '2', '3'], P = [[62, 104], [150, 44], [238, 100]], trap = [150, 112];
    const u = gSeg(t, 0.22, 0.74) * 2, cur = u <= 1 ? gGo(P[0], P[1], u) : gGo(P[1], P[2], u - 1), go = t > 0.2;
    if (go) { ctx.strokeStyle = C.sky; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(P[0][0], P[0][1]); if (u > 1) ctx.lineTo(P[1][0], P[1][1]); ctx.lineTo(cur[0], cur[1]); ctx.stroke(); }
    gTile(ctx, C, trap[0], trap[1], 38, 34, o.trap ?? '✕', null, { size: 14 });
    P.forEach((q, i) => { const hit = go && (i === 0 || u >= i - 0.02); gTile(ctx, C, q[0], q[1], 42, 36, L[i] ?? '', hit ? C.mint : null, { ring: hit ? C.ok : null }); });
    const h = go ? [cur[0] + 11, cur[1] + 14] : gGo([150, 144], [P[0][0] + 11, P[0][1] + 14], gSeg(t, 0.03, 0.18));
    gHand(ctx, C, h[0], h[1], go && t < 0.76, gSeg(t, 0.2, 0.3));
  },
  // Escribir en un teclado: o = { text }
  keys(ctx, C, t, o) {
    const keys = [...String(o.text ?? '20'), 'OK'], n = keys.length, w = Math.min(48, 260 / n - 8), x0 = 150 - (n * (w + 8) - 8) / 2 + w / 2, y = 100, span = 0.8 / n;
    let typed = '', h = [150, 144], down = false, pulse = 0, ok = false;
    keys.forEach((k, i) => {
      const a = 0.05 + i * span; if (t < a) return;
      h = gGo(i ? [x0 + (i - 1) * (w + 8) + w * 0.24, y + 15] : [150, 144], [x0 + i * (w + 8) + w * 0.24, y + 15], gSeg(t, a, a + span * 0.5));
      const pr = (t - (a + span * 0.55)) / (span * 0.3);
      if (pr >= 0) { if (k === 'OK') ok = true; else typed += k; }
      down = pr >= 0 && pr <= 1; pulse = Math.max(0, Math.min(1, pr));
    });
    ctx.fillStyle = C.card; ctx.strokeStyle = ok ? C.ok : C.line; ctx.lineWidth = 2; gBox(ctx, 80, 22, 140, 40, 12); ctx.fill(); ctx.stroke();
    gText(ctx, typed || '…', 150, 42, 20, typed ? C.ink : C.mute, 120);
    keys.forEach((k, i) => gTile(ctx, C, x0 + i * (w + 8), y, w, 40, k, k === 'OK' ? (ok ? C.ok : C.sky) : null, { size: 16 }));
    gHand(ctx, C, h[0], h[1], down, pulse);
  },
  // Pintar casillas arrastrando el dedo.
  paint(ctx, C, t) {
    const cols = 8, rows = 3, s = 26, x0 = 150 - cols * s / 2, y0 = 24, u = gSeg(t, 0.22, 0.76) * 11, n = Math.floor(u);
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
      const i = r * cols + c;
      ctx.fillStyle = i <= n && t > 0.22 ? C.sky : C.card; ctx.strokeStyle = C.line; ctx.lineWidth = 1.5;
      gBox(ctx, x0 + c * s + 2, y0 + r * s + 2, s - 4, s - 4, 5); ctx.fill(); ctx.stroke();
    }
    const i = Math.min(11, u), r = Math.floor(i / cols), c = i - r * cols, p = [x0 + (r ? Math.min(c, cols - 1) : c) * s + s / 2, y0 + r * s + s / 2];
    const h = t < 0.22 ? gGo([150, 144], [x0 + s / 2, y0 + s / 2 + 12], gSeg(t, 0.04, 0.2)) : [p[0], p[1] + 12];
    gPill(ctx, C, `${t > 0.22 ? n + 1 : 0} pintadas`, 150, 124, C.sky, 12);
    gHand(ctx, C, h[0], h[1], t > 0.2 && t < 0.78, gSeg(t, 0.2, 0.3));
  },
  // Tocar la pantalla (saltar, aletear, disparar): o = { label }
  touch(ctx, C, t, o) {
    ctx.strokeStyle = C.line; ctx.lineWidth = 2; ctx.setLineDash([6, 5]); gBox(ctx, 40, 16, 220, 118, 16); ctx.stroke(); ctx.setLineDash([]);
    let down = false, pulse = 0, pop = 0;
    for (const a of [0.24, 0.58]) { const pr = (t - a) / 0.16; if (pr >= 0 && pr <= 1) { down = true; pulse = pr; } if (pr >= 0 && pr <= 1.8) pop = Math.sin(Math.min(1, pr / 1.8) * Math.PI); }
    const by = 60 - pop * 26;
    ctx.fillStyle = C.sky; ctx.beginPath(); ctx.arc(110, by, 13, 0, 6.2832); ctx.fill();
    ctx.strokeStyle = C.ink; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(60, 76); ctx.lineTo(240, 76); ctx.stroke();
    if (o.label && pop > 0.15) gPill(ctx, C, o.label, 186, 44, C.mint, 12);
    const h = gGo([190, 142], [190, 112], gSeg(t, 0.04, 0.2));
    gHand(ctx, C, h[0], h[1], down, pulse);
  },
  // Pestañas de rondas.
  rounds(ctx, C, t, o) {
    const n = Math.max(2, Math.min(5, o.n ?? 3)), w = 46, x0 = 150 - (n * (w + 8) - 8) / 2 + w / 2, y = 46, on = t > 0.56;
    for (let i = 0; i < n; i++) {
      const done = i === 0, sel = on ? i === 1 : i === 0;
      gTile(ctx, C, x0 + i * (w + 8), y, w, 32, done ? '✓' : i + 1, done ? C.ok : sel ? C.sky : null, { ring: sel ? (gDark(C) ? C.sun : C.coral) : null, size: 15 });
    }
    gPill(ctx, C, `Ronda ${on ? 2 : 1} de ${o.n ?? n}`, 150, 104, on ? C.sky : C.line, 13);
    const h = gGo([150, 144], [x0 + w + 8 + 11, y + 13], gSeg(t, 0.1, 0.44)), pr = (t - 0.48) / 0.14;
    gHand(ctx, C, h[0], h[1], pr >= 0 && pr <= 1, Math.max(0, Math.min(1, pr)));
  },
  // Vidas de los juegos de acción.
  lives(ctx, C, t) {
    const lost = t > 0.3 && t < 0.72;
    for (let i = 0; i < 3; i++) {
      const off = lost && i === 2, x = 104 + i * 46;
      gHeart(ctx, x, 52, 17, off ? C.line : C.coral);
      if (off) { ctx.strokeStyle = C.mute; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x - 15, 68); ctx.lineTo(x + 15, 38); ctx.stroke(); }
    }
    gPill(ctx, C, lost ? 'Un error quita una vida' : t >= 0.72 ? 'Sin vidas, la ronda vuelve a empezar' : 'Tres vidas por ronda', 150, 108, lost ? C.coral : C.sky, 12);
  },
  // Cartel «Toca para empezar».
  start(ctx, C, t) {
    const gone = gSeg(t, 0.62, 0.8);
    ctx.globalAlpha = 1 - gone;
    ctx.fillStyle = shade(C.card, 0.8); gBox(ctx, 50, 38, 200, 62, 14); ctx.fill();
    ctx.fillStyle = C.card; ctx.strokeStyle = C.sky; ctx.lineWidth = 3; gBox(ctx, 50, 34, 200, 62, 14); ctx.fill(); ctx.stroke();
    gText(ctx, 'Toca para empezar', 150, 56, 16, C.ink, 180); gText(ctx, 'Sin prisa', 150, 78, 12, C.mute, 180, 500);
    ctx.globalAlpha = 1;
    if (gone > 0.5) gPill(ctx, C, '¡A jugar!', 150, 66, C.mint, 14);
    const h = gGo([150, 146], [150, 108], gSeg(t, 0.1, 0.42)), pr = (t - 0.46) / 0.14;
    gHand(ctx, C, h[0], h[1], pr >= 0 && pr <= 1, Math.max(0, Math.min(1, pr)));
  },
  // Botón «Comprobar».
  check(ctx, C, t) {
    const ok = t > 0.6;
    gTile(ctx, C, 150, 66, 200, 48, ok ? '✓  ¡Bien!' : 'Comprobar', ok ? C.ok : C.brand, { r: 16, size: 17 });
    const h = gGo([150, 146], [150, 84], gSeg(t, 0.1, 0.42)), pr = (t - 0.46) / 0.14;
    gHand(ctx, C, h[0], h[1], pr >= 0 && pr <= 1, Math.max(0, Math.min(1, pr)));
  },
};

// Juegos de acción (cartel de inicio y vidas): la guía les añade esos dos pasos.
const GUIDE_ARCADE = new Set(['rampa-precio', 'tanque-porcentaje', 'llaves-tanque', 'bici-cambios', 'rebote-signos', 'vagon-inverso', 'anillos-subconjunto', 'billar-rebote', 'capas-operacion', 'lazo-conjunto', 'cubo-partes', 'orbita-conjuntos', 'descifra-zona', 'lluvia-elementos', 'revienta-globos', 'luciernagas-venn', 'buzo-enteros', 'carrera-fracciones', 'frena-aguja',
  'dispara-inverso', 'salta-signos', 'serpiente-orden', 'sirve-la-razon', 'corta-proporciones', 'resortera-tres', 'caja-veloz', 'vuela-precios',
  'rompe-cambios', 'traza-progresion', 'encesta-suma', 'dobla-fichas', 'rana-zenon', 'maquina-sigma', 'torre-pisos', 'escala-leyes',
  'siembra-raices', 'muro-radicales', 'jefe-venn', 'jefe-ruta', 'jefe-rueda',
  'barco-muelle', 'aro-lanza', 'canica-tablero', 'tren-aguja', 'grua-carga', 'rueda-cabinas',
  'torre-grados', 'arma-la-mesa', 'camino-pascal', 'reparte-barras', 'gira-complejos', 'balanza-cajas', 'apunta-chorro', 'donde-cae', 'empaca-filas', 'sondea-niebla',
  'cruza-o-rebota', 'rio-o-hueco', 'llena-estanque', 'bote-corriente', 'cruce-curvas', 'lirios-laguna', 'dos-bancos', 'regla-de-calculo', 'piedras-selva',
  'quita-vueltas', 'rueda-rodante', 'toca-lados', 'figuras-notables', 'multiplica-razon', 'proyecta-punto', 'espejo-cuadrantes', 'ola-entre-lineas', 'crestas-faroles', 'ventana-inversa',
  'escala-triangulo', 'todo-en-senos', 'rectangulo-suma', 'tira-doble', 'red-periodica', 'pareja-opuesta', 'bisagra-area', 'parientes-polares', 'multiplicador-oculto', 'hermanas-raiz']);

// Los pasos propios de cada juego: [escena, texto, opciones]. El ejemplo de la escena es pequeño y distinto de los
// ejercicios: enseña el gesto, no la respuesta.
const GUIDES = {
  'jefe-rueda': [['tap', 'Toca en la rueda los puntos que responden el reto: quedan marcados.', { items: ['•', '•', '•', '•'], pick: [1, 3] }], ['tap', 'Con todas las runas puestas toca «¡Atacar!». Tocar un punto otra vez lo quita.', { items: ['¡Atacar!'], pick: [0] }]],
  'quita-vueltas': [['tap', 'Quita o pon vueltas completas hasta dejar el ángulo en el intervalo y toca «Listo».', { items: ['− 1 vuelta', '+ 1 vuelta', 'Listo'], pick: [0, 0, 2] }]],
  'rueda-rodante': [['step', 'Elige con − / + el ángulo que gira la rueda y toca «Rodar»: avanza lo que mide el arco.', { from: 1, to: 3, label: 'ángulo' }]],
  'toca-lados': [['tap', 'Toca dos lados: primero el que va arriba de la fracción y luego el que va abajo.', { items: ['opuesto', 'adyacente', 'hipotenusa'], pick: [0, 2] }]],
  'figuras-notables': [['tap', 'Busca el ángulo en una figura y toca dos lados: el de arriba de la fracción y el de abajo.', { items: ['1', '√3', '2'], pick: [1, 2] }]],
  'multiplica-razon': [['tap', 'Toca la razón que multiplica al lado conocido para dar el buscado: el juego calcula.', { items: ['sen', 'cos', 'tan'], pick: [2] }]],
  'proyecta-punto': [['step', 'Pon el coseno y el seno del punto con − / +, cada uno con su signo, y toca «Proyectar».', { from: 0, to: 2, label: 'seno' }]],
  'espejo-cuadrantes': [['tap', 'Cada espejo refleja el punto en un eje. Llévalo al cuadrante pedido sin gastar de más.', { items: ['Espejo ↕', 'Espejo ↔'], pick: [1, 0] }], ['step', 'En el cuadrante I, pon con − / + su ángulo de referencia y toca «Comprobar».', { from: 45, to: 30, label: 'referencia' }]],
  'ola-entre-lineas': [['step', 'Elige amplitud y línea media con − / + y toca «Lanzar ola»: debe tocar techo y piso.', { from: 1, to: 3, label: 'amplitud' }]],
  'crestas-faroles': [['step', 'Elige cuántas ondas caben y cuánto se corre la ola: cada cresta debe caer en un farol.', { from: 1, to: 2, label: 'ondas' }]],
  'ventana-inversa': [['step', 'Mueve dónde empieza la ventana y su ancho, y toca «Probar»: no puede repetir alturas.', { from: 4, to: 2, label: 'ancho' }]],
  'escala-triangulo': [['tap', 'Divide el triángulo entre cos θ o sen θ y toca el lado que quedó valiendo lo pedido.', { items: ['÷ cos θ', '÷ sen θ', '↶'], pick: [0] }]],
  'todo-en-senos': [['tap', 'Toca una ficha amarilla y elige qué va arriba y qué va abajo de su fracción.', { items: ['tan x', 'sen x', 'cos x'], pick: [0, 1, 2] }], ['tap', 'Toca una ficha de arriba y una igual de abajo: se cancelan. Al terminar, «Listo».', { items: ['cos x', 'cos x', 'Listo'], pick: [0, 1, 2] }]],
  'rectangulo-suma': [['tap', 'Toca un tramo de color y luego la ficha con su medida. Hazlo con los dos tramos.', { items: ['tramo', 'sen α cos β', 'cos α cos β'], pick: [0, 1] }]],
  'tira-doble': [['step', 'Mueve el corte de la tira con − / + y toca «Restar»: azul menos rojo debe dar lo pedido.', { from: 4, to: 6, label: 'corte' }]],
  'red-periodica': [['step', 'Pon con − / + la primera solución y el salto de la red, y toca «Lanzar»: ahí aparecen los peces.', { from: 2, to: 1, label: 'salto' }]],
  'pareja-opuesta': [['tap', 'Toca, en orden, lo que ya se puede calcular hasta llegar a lo que se pide.', { items: ['C = ?', 'c = ?'], pick: [0, 1] }]],
  'bisagra-area': [['step', 'Gira el lado con − / + hasta la línea punteada y toca «Marcar». Si otro ángulo sirve, márcalo.', { from: 90, to: 60, label: 'ángulo C' }]],
  'parientes-polares': [['step', 'Mueve el punto w con las perillas de módulo y de ángulo, y toca «Fijar».', { from: 45, to: 90, label: 'ángulo' }]],
  'multiplicador-oculto': [['tap', 'Mira cuánto giró y cuánto se estiró la bandera, y toca en la telaraña el número w que lo hace.', { items: ['•', '•', '•', '•'], pick: [2] }]],
  'hermanas-raiz': [['tap', 'Toca en la circunferencia dónde están las otras raíces: quedan igual de separadas.', { items: ['•', '•', '•', '•'], pick: [1, 3] }]],
  'acorrala-raiz': [['tap', 'Toca el tramo donde vive la raíz: está donde las marcas cambian de color.', { items: ['1.3', '1.4', '1.5'], pick: [1] }], ['tap', 'Cada toque abre una lupa: repite con las cifras que siguen.', { items: ['1.41', '1.42'], pick: [0] }]],
  'afina-sistema': [['slide', 'Desliza un coeficiente y mira cómo gira o se desplaza su recta.', { label: 'coeficiente' }]],
  'ajusta-capital': [['slide', 'Arrastra la pila de billetes para fijar el capital; el monto final se calcula solo.', { vert: true }]],
  'alcancias-gemelas': [['slide', 'Mueve la tasa simple hasta que las dos alcancías queden al mismo nivel.', { label: 'tasa' }]],
  'apila-alturas': [['slide', 'Arrastra cada cuenta hacia arriba o abajo hasta la altura que sale de operar f y g.', { vert: true }]],
  'arbol-potencia': [['step', 'Elige con − / + las ramas por nudo y los niveles: el árbol crece solo y cuenta sus hojas.', { from: 2, to: 3, label: 'niveles' }]],
  'arma-la-cuenta': [['drag', 'Arrastra números y operaciones al panel. El resultado se actualiza en vivo.', { tile: '6', slot: 'cuenta' }], ['tap', 'Sobran fichas: usa solo los datos que sirven. «⌫» borra la última.', { items: ['12', '÷', '3', '⌫'], pick: [0, 1, 2, 3] }]],
  'bloques-area': [['step', 'Mueve los números con − / +: el rectángulo cambia y cuenta sus barras y cuadritos.', { from: 2, to: 3, label: 'a' }]],
  'division-sintetica': [['step', 'Elige r con − / + y toca «Dividir»: el juego baja, multiplica y suma. El último es el residuo.', { from: 0, to: 2, label: 'r' }], ['tap', 'Hay pocas divisiones: mira el signo de los residuos anotados para decidir cuál probar.', { items: ['P(1) = −8', 'P(3) = 4'], pick: [0, 1] }]],
  'cancela-factores': [['drag', 'Arrastra cada factor de arriba sobre su igual de abajo para tachar ambos.', { tile: 'x + 3', slot: 'x + 3' }], ['tap', 'Confirma con «Listo» cuando hayas cancelado los factores comunes.', { items: ['Listo'], pick: [0] }]],
  'jefe-ruta': [['tap', 'En cada nivel, de abajo hacia arriba, toca el paso que sí se justifica.', { items: ['2x = 8', '2x = 2'], pick: [0] }], ['tap', 'Con la ruta completa toca «¡Atacar!». Si un paso falla, el juego dice en qué nivel.', { items: ['¡Atacar!'], pick: [0] }]],
  'torre-grados': [['tap', 'Toca los términos del exponente mayor al menor: se apilan en orden.', { items: ['3x', 'x⁴', '7'], pick: [1, 0, 2] }]],
  'arma-la-mesa': [['tap', 'Toca las piezas que completan la mesa y luego «Listo».', { items: ['3x', '9', '6', '3x'], pick: [0, 3, 1] }]],
  'camino-pascal': [['trace', 'Baja casilla por casilla, a la izquierda o a la derecha, hasta la estrella.', { labels: ['▼', '·', '★'], trap: '·' }]],
  'reparte-barras': [['tap', 'Pasa barras de un lado al otro hasta llenar justo el hueco.', { items: ['← barra', 'barra →', 'Listo'], pick: [1, 1, 2] }]],
  'gira-complejos': [['turn', 'Gira o refleja el complejo con los botones hasta llegar a la estrella.', {}]],
  'balanza-cajas': [['tap', 'Quita lo mismo de los dos platillos y al final reparte.', { items: ['− 1 suelta', '− 1 caja', 'Repartir'], pick: [0, 1, 2] }]],
  'apunta-chorro': [['drag', 'Toca en la cuadrícula el vértice del chorro y luego «Lanzar».', { dot: true }]],
  'donde-cae': [['tap', 'Pon un balde en cada marca donde cae el agua y abre la llave.', { items: ['1', '2', '3', '4'], pick: [1, 3] }]],
  'empaca-filas': [['tap', 'Arma filas del ancho del divisor; lo que no alcance es el residuo.', { items: ['Fila de alto x', 'Fila de alto 1', 'Listo'], pick: [0, 1, 2] }]],
  'sondea-niebla': [['tap', 'Alumbra pocas columnas, cambia a «Bandera» y marca los cruces.', { items: ['Linterna', 'Bandera', 'Listo'], pick: [0, 1, 2] }]],
  'cruza-o-rebota': [['tap', 'Toca la ficha de cada cero para elegir cruza o rebota, y dibuja.', { items: ['cruza', 'rebota', 'Dibujar'], pick: [0, 1, 2] }]],
  'rio-o-hueco': [['tap', 'Antes de cada paso decide: caminar, saltar el hueco o río.', { items: ['Caminar', 'Saltar', 'Río'], pick: [0, 1, 2] }]],
  'llena-estanque': [['step', 'Elige en cuántas partes medir el estanque; luego deja pasar las horas.', { from: 4, to: 6, label: 'partes' }]],
  'bote-corriente': [['step', 'Elige la corriente con − / +: el bote sale de la primera pista. Luego zarpa.', { from: 1, to: 3, label: 'corriente' }]],
  'cruce-curvas': [['slide', 'Mueve la mira con ◀ ▶ y marca donde las dos alturas son iguales.', { label: 'x' }]],
  'lirios-laguna': [['tap', 'Mueve el calendario con ◀ ▶ y responde con «Este día».', { items: ['◀ día', 'día ▶', 'Este día'], pick: [0, 0, 2] }]],
  'dos-bancos': [['tap', 'Toca el año en que crees que llega a la meta y corre los años.', { items: ['3', '4', '5', '6'], pick: [1] }]],
  'regla-de-calculo': [['slide', 'Corre la regla de arriba y toca abajo el número del resultado.', { label: 'regla' }]],
  'piedras-selva': [['tap', 'Pisa todas las piedras que sí son solución; las falsas quitan una vida.', { items: ['x = 4', 'x = −2', 'x = 8'], pick: [0] }]],
  'arma-conjunto': [['tap', 'Toca las fichas para meterlas a las llaves o sacarlas, hasta cumplir la condición.', { items: ['a', 'e', 'm'], pick: [0, 1] }]],
  'arma-notacion': [['tap', 'Toca las fichas en orden para escribir el conjunto: nombre, igual, llave y elementos.', { items: ['A', '=', '{', '1'], pick: [0, 1, 2, 3] }]],
  'arma-producto': [['tap', 'Elige dos o más fichas: la máquina las multiplica y cuenta cuántas son negativas.', { items: ['−2', '3', '−5'], pick: [0, 2] }]],
  'arma-regla': [['drag', 'Arrastra cada dato a la tabla: misma magnitud en la columna, misma situación en la fila.', { tile: '6 kg', slot: 'kilos' }], ['tap', 'Luego elige las flechas: paralelas si es directa, cruzadas si es inversa.', { items: ['⇉', '⤨'], pick: [0] }]],
  'arma-sigma': [['drag', 'Arrastra cada ficha a su casilla de la Σ: dónde empieza, dónde termina y el término.', { tile: 'k = 1', slot: 'abajo de la Σ' }]],
  'arma-tramos': [['slide', 'Arrastra las asas de cada tramo hasta su altura.', { vert: true }], ['tap', 'En el corte, decide si el punto de cada tramo va lleno o vacío.', { items: ['●', '○'], pick: [1] }]],
  'arma-triangulo': [['drag', 'Arrastra las esquinas del triángulo: los catetos cambian y la razón se calcula en vivo.', { dot: true }]],
  'ascensor': [['tap', 'Toca el piso donde termina el ascensor después de subir o bajar.', { items: ['−1', '0', '1', '2'], pick: [0] }]],
  'atajo-axiomas': [['tap', 'Toca el axioma que quieres usar: la expresión se reescribe sola. Si no sirve, tiembla.', { items: ['conm.', 'asoc.', 'distr.'], pick: [2] }]],
  'atrapa-elementos': [['tap', 'Toca las fichas que cumplen la condición: entran a las llaves. Otro toque las saca.', { items: ['3', '4', '6', '7'], pick: [0, 1, 2, 1], toggle: true }]],
  'atrapa-punto': [['tap', 'Toca el punto de la circunferencia que cumple la pista.', { items: ['30°', '45°', '60°'], pick: [1] }]],
  'balancin': [['slide', 'Arrastra el apoyo por la tabla (o usa − / +) hasta que quede en equilibrio.', {}]],
  'balanza-exponencial': [['step', 'Cambia x con − / +: cada platillo muestra su valor y el brazo cae hacia el mayor.', { from: 1, to: 3, label: 'x' }]],
  'balanza-proporcion': [['slide', 'Desliza x hasta que la balanza quede horizontal.', { label: 'x' }]],
  'bascula': [['slide', 'Arrastra la rueda del precio arriba o abajo (o toca − / +) hasta lo que cuestan los kilos.', { vert: true }]],
  'bodegas': [['slide', 'Arrastra el divisor para repartir los sacos; al soltar, una parte viaja de A a B.', {}]],
  'bolsa-razon': [['step', 'Pon o quita bolas de cada color con − / + hasta que la bolsa cumpla la razón.', { from: 2, to: 3, label: 'rojas' }]],
  'brazo-robot': [['drag', 'Arrastra la pinza para doblar el codo (o ajusta con − / +) hasta la gema.', { dot: true }]],
  'buzo-enteros': [['slide', 'Arrastra la sonda a la altura del resultado y suelta para acercar las perlas.', { vert: true }]],
  'cadena-cambios': [['tap', 'Toca dos sellos de la bandeja: la etiqueta muestra el precio después de cada uno.', { items: ['+10 %', '−50 %', '+20 %'], pick: [0, 1] }]],
  'cadena-razones': [['tap', 'Toca una tarjeta para voltear su fracción; el resultado se recalcula solo.', { items: ['9/7', '3/4'], pick: [0] }]],
  'caja-veloz': [['keys', 'Escribe el resultado en el teclado y toca OK.', { text: '20' }]],
  'cajas-numericas': [['drag', 'Arrastra cada número a la caja más pequeña que lo contiene.', { tile: '−3', slot: 'ℤ' }]],
  'cambia-de-piso': [['tap', 'Toca una potencia para mandarla al otro piso de la fracción: su exponente cambia de signo.', { items: ['a⁻³', 'b²'], pick: [0] }]],
  'cancela-balanza': [['tap', 'Toca una ficha de la izquierda y luego una igual de la derecha: las dos se van.', { items: ['3', 'x', '=', '3', '5'], pick: [0, 3] }]],
  'candado-absoluto': [['step', 'Gira cada rueda con ▲ / ▼: centro, símbolo y radio escriben la desigualdad.', { from: 2, to: 3, label: 'radio' }]],
  'candado-fraccion': [['step', 'Gira las ruedas con ▲ / ▼ para armar la fracción; el visor muestra su decimal.', { from: 3, to: 4, label: 'numerador' }]],
  'canon-inverso': [['turn', 'Arrastra el cañón (o usa − / +) para apuntar; solo cuenta lo que está dentro del rango.', {}]],
  'carrera-fracciones': [['tap', 'Toca una puerta para medirla en la regla, junto al número pedido.', { items: ['2/8', '0.5', '3/4'], pick: [0] }], ['tap', 'Si las dos barras miden lo mismo, tócala otra vez y el corredor pasa.', { items: ['2/8', '0.5', '3/4'], pick: [0, 0] }]],
  'carrera-interes': [['slide', 'Desliza el tiempo: los dos corredores avanzan y el medidor muestra la ventaja.', { label: 'mes' }]],
  'cascada': [['tap', 'Toca los stickers de descuento: el precio cae con cada uno.', { items: ['−20 %', '−10 %'], pick: [0, 1] }], ['slide', 'Luego fija con el deslizador el descuento único que da lo mismo.', { label: '%' }]],
  'clasifica-cartas': [['swipe', 'Desliza la tarjeta hacia el lado de su categoría (o usa los botones).', {}]],
  'cobra-intereses': [['tap', 'Toca el mes siguiente para cobrar su interés; el acumulado sube.', { items: ['1', '2', '3', '4'], pick: [0, 1, 2] }]],
  'cofre-candados': [['tap', 'Toca las llaves en el orden que deshace la función: el último candado se abre primero.', { items: ['− 3', '÷ 2', '√'], pick: [1, 0] }]],
  'combina-vectores': [['slide', 'Desliza cada coeficiente para ver cuántas veces se usa ese vector en el recorrido.', { label: 'a' }]],
  'compas-ambiguo': [['drag', 'Arrastra la punta del compás hasta la base; si la toca, suéltala ahí.', { dot: true }], ['tap', 'Si el brazo no alcanza, toca «No hay triángulo».', { items: ['No hay triángulo'], pick: [0] }]],
  'compas-raiz': [['step', 'Elige los catetos con − / +: la diagonal es la raíz que buscas.', { from: 1, to: 2, label: 'cateto' }], ['tap', 'Toca «Girar» y el compás acuesta la diagonal sobre la recta.', { items: ['Girar'], pick: [0] }]],
  'completa-cuadrado': [['step', 'Pasa unidades de la bandeja a la esquina con − / + hasta llenar el hueco.', { from: 1, to: 4, label: 'en la esquina' }]],
  'completa-simetria': [['slide', 'Arrastra los puntos de la izquierda hacia arriba o abajo para completar la simetría.', { vert: true }]],
  'conica-viva': [['step', 'Mueve las perillas del centro y de la forma: la cónica cambia en vivo.', { from: 1, to: 3, label: 'h' }]],
  'correa-del-perro': [['slide', 'Mueve el poste y estira la correa sobre la recta.', {}], ['tap', 'Elige la zona (adentro o afuera) y si las puntas cuentan.', { items: ['adentro', 'afuera'], pick: [0] }]],
  'corredores-dobles': [['hold', 'Mantén presionado «Correr» y suelta cuando se cumpla la condición; − / + ajustan.', {}]],
  'corta-pizza': [['turn', 'Arrastra el borde de la porción para abrirla; el arco y el área se calculan solos.', {}]],
  'corta-proporciones': [['swipe', 'Desliza el dedo para cortar las fichas que valen lo mismo que la fracción de arriba.', { cut: true }]],
  'corta-rectangulo': [['slide', 'Arrastra el corte: salta de cuadrito en cuadrito y parte el rectángulo en dos áreas.', {}]],
  'crece-planta': [['slide', 'Arrastra cada planta (o usa los botones) hasta la altura del mes que le toca.', { vert: true }]],
  'cruz-asintotas': [['drag', 'Arrastra la cruz punteada: la curva se dibuja pegada a ella.', { dot: true }]],
  'cruz-porcentaje': [['drag', 'Arrastra cada dato a su casilla de la cruz; la incógnita va con «?».', { tile: '?', slot: 'casilla B' }]],
  'cuadrado-media': [['drag', 'Arrastra la esquina del cuadrado hasta que su área iguale la del rectángulo.', { dot: true }]],
  'cuadricula-cien': [['paint', 'Arrastra el dedo para pintar casillas: por ciento es «de cada 100».', {}]],
  'cuenta-factores': [['step', 'Cuenta las x del dibujo y elige el exponente del resultado con − / +.', { from: 3, to: 5, label: 'exponente' }]],
  'cuenta-saltos': [['step', 'Elige los saltos con − / +: el juego dibuja los postes y hace la cuenta.', { from: 2, to: 4, label: 'saltos' }]],
  'cuerdas-iguales': [['slide', 'Desliza el anillo por el riel hasta que las dos cuerdas midan lo mismo.', {}]],
  'cumple-notacion': [['tap', 'Toca una ficha para meterla a la bolsa o sacarla, hasta que todas las frases se cumplan.', { items: ['perro', 'pez', 'gato'], pick: [0, 2] }]],
  'detective-pasos': [['tap', 'Toca la línea donde está el primer error.', { items: ['paso 1', 'paso 2', 'paso 3'], pick: [1] }], ['step', 'Con ‹ › elige cómo debía quedar ese paso.', { from: 1, to: 2, label: 'arreglo' }]],
  'detector-identidades': [['slide', 'Arrastra la lupa por el eje x y compara el valor de cada lado.', {}], ['tap', 'Luego decide: «Contraejemplo aquí» o «Es identidad».', { items: ['Contraejemplo', 'Identidad'], pick: [1] }]],
  'dibuja-intervalo': [['slide', 'Arrastra las dos asas sobre la recta hasta los extremos del intervalo.', {}], ['tap', 'Toca un asa para cambiarla entre llena (incluido) y vacía (excluido).', { items: ['●', '○'], pick: [1] }]],
  'directa-inversa': [['drag', 'Arrastra cada situación a la caja de su relación.', { tile: 'situación', slot: 'inversa' }]],
  'dispara-inverso': [['touch', 'Toca hacia donde quieres disparar: la ficha vuela hacia allá. Apúntale a su pareja.', { label: '¡fuego!' }]],
  'distancia-justa': [['slide', 'Coloca b en la recta: la cuerda muestra la distancia hasta a.', { label: 'b' }]],
  'dobla-fichas': [['swipe', 'Desliza el dedo hacia un lado: las fichas se corren y dos iguales se funden en el doble.', { board: true }]],
  'dobla-la-recta': [['slide', 'Pon el punto donde cae el valor absoluto: la recta se dobla por el cero.', {}]],
  'dobla-negativos': [['tap', 'Toca un trozo de la gráfica para doblarlo sobre el eje x; otro toque lo desdobla.', { items: ['∩', '∪', '∩'], pick: [1] }]],
  'domino-equivalencias': [['tap', 'Toca fichas para encadenarlas: cada cara debe valer lo mismo que la anterior.', { items: ['¼ | 2', '0.5 | ¼', '2 | 1'], pick: [1, 0] }]],
  'dos-escaleras': [['slide', 'Sube o baja la tapa hasta que las dos escaleras encajen sin huecos.', { vert: true }]],
  'dos-etapas': [['turn', 'Gira la perilla de la entrada: la máquina recalcula las dos etapas.', {}]],
  'duplica-magnitud': [['slide', 'Sube o baja la barra de «Después» hasta su nuevo valor.', { vert: true }]],
  'encadena-angulos': [['turn', 'Gira el primer brazo hasta un ángulo notable; el segundo suma o resta desde ahí.', {}]],
  'encesta-suma': [['fling', 'Desliza el dedo hacia la canasta de la suma y suelta para lanzar el balón.', {}]],
  'encuesta-venn': [['step', 'En cada zona del diagrama pon con − / + cuántas personas hay.', { from: 3, to: 5, label: 'solo en A' }]],
  'engranajes': [['step', 'Fija con − / + el dato que falta de la rueda B y compara los contadores.', { from: 8, to: 10, label: 'dientes' }]],
  'recta-muda': [['drag', 'Arrastra cada ficha al lugar de la recta donde vive su valor.', { tile: 'a', slot: 'lugar' }]],
  'dos-radares': [['slide', 'Arrastra el barco hasta el lugar donde los dos radares tienen razón.', { label: 'barco' }]],
  'arma-viaje': [['drag', 'Arrastra dos cartas a las casillas: juntas llevan la ficha hasta el aro.', { tile: '+ 3', slot: 'casilla' }]],
  'taller-saltos': [['slide', 'Ajusta cuánto mide el salto y cuántas veces se repite.', { label: 'salto' }]],
  'signos-condiciones': [['tap', 'Toca un número para cambiarle el signo hasta cumplir las dos condiciones.', { items: ['2', '−3', '4'], pick: [1] }]],
  'potencia-signo': [['tap', 'Toca los signos menos para encenderlos o apagarlos.', { items: ['−', '(', '−', ')'], pick: [2] }], ['slide', 'Arrastra el exponente. Al comprobar verás la cuenta completa.', { label: 'exponente' }]],
  'parentesis-justo': [['drag', 'Pasa el dedo del primer número al último que van dentro del paréntesis.', { tile: '( )', slot: 'cuenta' }]],
  'lanza-ficha': [['slide', 'Estira el impulso hacia un lado y suelta: la ficha sale saltando.', { label: 'impulso' }]],
  'corta-iguales': [['drag', 'Arrastra los cortes hasta que las partes sean iguales y toca las que tomas.', { tile: 'corte', slot: 'barra' }]],
  'fraccion-gemela': [['slide', 'Ajusta el numerador y el denominador de tu fracción.', { label: 'numerador' }]],
  'entre-fracciones': [['slide', 'Arma una fracción que caiga entre las dos marcas.', { label: 'numerador' }]],
  'piezas-exactas': [['drag', 'Arrastra tres pedazos a las casillas: juntos llegan justo a la marca.', { tile: '1/2', slot: 'casilla' }]],
  'resta-falta': [['slide', 'Arma la fracción que salió del tanque.', { label: 'numerador' }]],
  'parte-de-parte': [['drag', 'Arrastra la esquina para marcar la parte del terreno.', { tile: 'esquina', slot: 'terreno' }]],
  'total-escondido': [['slide', 'Ajusta cuánto vale cada parte y en cuántas partes va el total.', { label: 'parte' }]],
  'lanza-fraccion': [['slide', 'Estira el impulso hacia un lado y suelta: la ficha sale saltando.', { label: 'impulso' }]],
  'rejilla-otra': [['drag', 'Arrastra sobre las sillas para pintar la parte que se pide.', { tile: 'dedo', slot: 'sillas' }]],
  'cuelga-porcientos': [['drag', 'Arrastra cada ficha al lugar de la recta donde vive su valor.', { tile: '0.4', slot: 'lugar' }]],
  'cuelga-decimales': [['drag', 'Arrastra cada ficha al lugar de la recta donde vive su valor.', { tile: '0.4', slot: 'lugar' }]],
  'que-porcentaje': [['slide', 'Mueve la perilla hasta el porcentaje que representa esa parte.', { label: 'porcentaje' }]],
  'pedazos-porciento': [['drag', 'Arrastra tres cartas: juntas deben ser el porcentaje pedido del total.', { tile: '20', slot: 'casilla' }]],
  'etiqueta-vieja': [['slide', 'Mueve la perilla hasta el precio que tenía antes del descuento.', { label: 'precio' }]],
  'vuelta-al-precio': [['slide', 'Mueve la perilla hasta el descuento que devuelve el precio de antes.', { label: 'descuento' }]],
  'factor-final': [['slide', 'Mueve la perilla hasta lo que queda después de los dos cambios.', { label: 'queda' }]],
  'lanza-porciento': [['slide', 'Estira el impulso y suelta: la ficha sale saltando.', { label: 'impulso' }]],
  'crece-factor': [['slide', 'Elige cuántas rondas de multiplicar hacen falta.', { label: 'rondas' }]],
  'cuadrado-justo': [['slide', 'Mueve la perilla hasta el lado del cuadrado nuevo.', { label: 'lado' }]],
  'exponentes-justos': [['drag', 'Arrastra un número a cada exponente para que la igualdad se cumpla.', { tile: '3', slot: 'exponente' }]],
  'misma-potencia': [['slide', 'Mueve cada perilla: las dos potencias deben valer lo mismo.', { label: 'exponente' }]],
  'raiz-bandera': [['slide', 'Mueve la perilla hasta tu estimación de la raíz.', { label: 'estimación' }]],
  'estima-diez': [['slide', 'Ajusta la primera cifra y el número de ceros de tu estimación.', { label: 'ceros' }]],
  'lanza-potencia': [['slide', 'Estira el impulso y suelta: la ficha sale saltando.', { label: 'impulso' }]],
  'vecinos-razon': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'rayo', slot: 'figura' }]],
  'tres-parientes': [['drag', 'Arrastra cada medida a su ángulo.', { tile: '62°', slot: 'ángulo' }]],
  'cruce-ocho': [['drag', 'Arrastra cada medida al ángulo que le toca.', { tile: '72°', slot: 'ángulo' }]],
  'conjugados-justos': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'transversal', slot: 'figura' }]],
  'tercer-angulo': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'lado', slot: 'figura' }]],
  'exterior-alcanza': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'vértice', slot: 'figura' }]],
  'poligono-regular': [['slide', 'Arrastra la perilla de abajo hasta tu respuesta.', { label: 'lados' }]],
  'lanza-angulo': [['slide', 'Estira hasta el valor que crees y suelta.', { label: 'ángulo' }]],
  'cuadrado-catetos': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'cateto', slot: 'figura' }]],
  'cateto-falta': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'mástil', slot: 'figura' }]],
  'lados-familia': [['drag', 'Arrastra cada medida al lado que falta.', { tile: '20', slot: 'lado' }]],
  'diagonal-cuadrado': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'cinta', slot: 'figura' }]],
  'equilatero-partes': [['drag', 'Arrastra cada medida a su lugar del triángulo.', { tile: '6', slot: 'lado' }]],
  'a-diez-pasos': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'bandera', slot: 'figura' }]],
  'dos-pasos': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'cable', slot: 'figura' }]],
  'lanza-cuerda': [['slide', 'Estira hasta el valor que crees y suelta.', { label: 'cuerda' }]],
  'foto-fiel': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'esquina', slot: 'figura' }]],
  'sombra-poste': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'poste', slot: 'figura' }]],
  'tales-corte': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'punto', slot: 'figura' }]],
  'escala-mapa': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'camino', slot: 'figura' }]],
  'papel-factor': [['slide', 'Arrastra la perilla de abajo hasta tu respuesta.', { label: 'factor' }]],
  'tres-crecimientos': [['drag', 'Arrastra a cada material cuántas veces crece.', { tile: '× 5', slot: 'cinta' }]],
  'achica-area': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'esquina', slot: 'figura' }]],
  'lanza-escala': [['slide', 'Estira hasta el valor que crees y suelta.', { label: 'avance' }]],
  'misma-area': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'vértice', slot: 'figura' }]],
  'inclina-marco': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'marco', slot: 'figura' }]],
  'trapecio-gemelo': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'lado', slot: 'figura' }]],
  'radio-area': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'borde', slot: 'figura' }]],
  'arco-justo': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'borde', slot: 'figura' }]],
  'borde-mixto': [['drag', 'Arrastra la medida de cada parte del borde.', { tile: '3π', slot: 'curva' }]],
  'rombo-diagonales': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'punta', slot: 'figura' }]],
  'rueda-lanza': [['slide', 'Estira hasta el valor que crees y suelta.', { label: 'vueltas' }]],
  'marco-hueco': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'hueco', slot: 'figura' }]],
  'anillo-justo': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'hueco', slot: 'figura' }]],
  'vertice-lejos': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'vértice', slot: 'figura' }]],
  'caja-torcida': [['drag', 'Arrastra el área de cada parte.', { tile: '7', slot: 'esquina' }]],
  'techo-justo': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'techo', slot: 'figura' }]],
  'bandera-onda': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'lado', slot: 'figura' }]],
  'anden-ancho': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'andén', slot: 'figura' }]],
  'llena-lanza': [['slide', 'Estira hasta el valor que crees y suelta.', { label: 'pintura' }]],
  'capas-caja': [['slide', 'Arrastra la perilla de abajo hasta tu respuesta.', { label: 'capas' }]],
  'cilindro-altura': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'tapa', slot: 'figura' }]],
  'cono-agua': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'nivel', slot: 'figura' }]],
  'piramide-altura': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'punta', slot: 'figura' }]],
  'caras-caja': [['drag', 'Arrastra el área de cada cara y la de todas juntas.', { tile: '18', slot: 'tapa' }]],
  'cubo-arista': [['drag', 'Arrastra el punto que brilla: la figura cambia con él. Al comprobar verás si cumple.', { tile: 'esquina', slot: 'figura' }]],
  'litros-nivel': [['slide', 'Arrastra la perilla de abajo hasta tu respuesta.', { label: 'altura' }]],
  'llena-tanque': [['slide', 'Estira hasta el valor que crees y suelta.', { label: 'agua' }]],
  'fila-cine': [['drag', 'Arrastra cada persona a su puesto. Al comprobar se revisan las pistas una por una.', { tile: 'ficha', slot: 'lugar' }]],
  'pisos-edificio': [['drag', 'Arrastra cada familia a su piso.', { tile: 'ficha', slot: 'lugar' }]],
  'un-cambio': [['drag', 'Arrastra una ficha sobre otra: cambian de puesto.', { tile: 'ficha', slot: 'lugar' }]],
  'llegada-carrera': [['drag', 'Arrastra cada atleta a su puesto de llegada.', { tile: 'ficha', slot: 'lugar' }]],
  'mesa-amigos': [['drag', 'Arrastra cada persona a su silla.', { tile: 'ficha', slot: 'lugar' }]],
  'collar-cerrado': [['drag', 'Arrastra cada cuenta a su lugar del collar.', { tile: 'ficha', slot: 'lugar' }]],
  'cambia-mesa': [['drag', 'Arrastra una persona sobre otra: cambian de silla.', { tile: 'ficha', slot: 'lugar' }]],
  'casas-datos': [['drag', 'Arrastra cada dato a su casa.', { tile: 'ficha', slot: 'lugar' }]],
  'frente-silla': [['drag', 'Arrastra el número de la silla de enfrente.', { tile: 'ficha', slot: 'lugar' }]],
  'tres-zonas': [['drag', 'Arrastra cada afirmación a su zona.', { tile: 'ficha', slot: 'lugar' }]],
  'pistas-justas': [['drag', 'Arrastra las pistas a las casillas: deben dejar una sola fila.', { tile: 'ficha', slot: 'lugar' }]],
  'pista-falta': [['drag', 'Arrastra a la casilla la pista que basta.', { tile: 'ficha', slot: 'lugar' }]],
  'vuelta-silla': [['drag', 'Arrastra el señalador hasta la silla donde termina la cuenta.', { tile: 'señal', slot: 'silla' }]],
  'tacha-filas': [['tap', 'Toca los que cumplen; otro toque los quita. Al comprobar se ve por qué.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'puestos-posibles': [['tap', 'Toca los que cumplen; otro toque los quita. Al comprobar se ve por qué.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'misma-mesa': [['tap', 'Toca los que cumplen; otro toque los quita. Al comprobar se ve por qué.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'dos-lados': [['tap', 'Toca los que cumplen; otro toque los quita. Al comprobar se ve por qué.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'tacha-cruz': [['tap', 'Toca los que cumplen; otro toque los quita. Al comprobar se ve por qué.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'hueco-unico': [['tap', 'Toca los que cumplen; otro toque los quita. Al comprobar se ve por qué.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'tabla-ajena': [['tap', 'Toca los que cumplen; otro toque los quita. Al comprobar se ve por qué.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'casos-si': [['tap', 'Toca los que cumplen; otro toque los quita. Al comprobar se ve por qué.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'misma-regla': [['tap', 'Toca los que cumplen; otro toque los quita. Al comprobar se ve por qué.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'equipo-justo': [['tap', 'Toca los que cumplen; otro toque los quita. Al comprobar se ve por qué.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'quien-seguro': [['tap', 'Toca los que cumplen; otro toque los quita. Al comprobar se ve por qué.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'rompe-regla': [['tap', 'Toca los que cumplen; otro toque los quita. Al comprobar se ve por qué.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'maximo-grupo': [['tap', 'Toca los que cumplen; otro toque los quita. Al comprobar se ve por qué.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'tabla-oficios': [['tap', 'Un toque pone ✓, otro pone ✗ y otro borra.', { items: ['✓', '✗', ' '], pick: [0] }]],
  'tabla-dos-datos': [['tap', 'Un toque pone ✓, otro pone ✗ y otro borra.', { items: ['✓', '✗', ' '], pick: [0] }]],
  'corre-puesto': [['slide', 'Estira hasta el valor que crees y suelta.', { label: 'valor' }]],
  'gira-ruleta': [['slide', 'Estira hasta el valor que crees y suelta.', { label: 'valor' }]],
  'cae-caja': [['slide', 'Estira hasta el valor que crees y suelta.', { label: 'valor' }]],
  'cae-zona': [['slide', 'Estira hasta el valor que crees y suelta.', { label: 'valor' }]],
  'mismo-sabor': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'mezcla-total': [['slide', 'Mueve la perilla hasta tu respuesta. Al comprobar, la escena la ejecuta.', { label: 'valor' }]],
  'corta-reparto': [['drag', 'Arrastra el punto que brilla hasta tu respuesta. Al comprobar verás si cuadra.', { tile: 'punto', slot: 'figura' }]],
  'una-parte': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '12', slot: 'lugar' }]],
  'escala-real': [['drag', 'Arrastra el punto que brilla hasta tu respuesta. Al comprobar verás si cuadra.', { tile: 'punto', slot: 'figura' }]],
  'escala-plano': [['drag', 'Arrastra el punto que brilla hasta tu respuesta. Al comprobar verás si cuadra.', { tile: 'punto', slot: 'figura' }]],
  'arregla-razon': [['slide', 'Mueve la perilla hasta tu respuesta. Al comprobar, la escena la ejecuta.', { label: 'valor' }]],
  'sirve-partes': [['slide', 'Estira hasta el valor que crees y suelta.', { label: 'valor' }]],
  'precio-unidad': [['drag', 'Arrastra el punto que brilla hasta tu respuesta. Al comprobar verás si cuadra.', { tile: 'punto', slot: 'figura' }]],
  'crece-o-baja': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'rectangulo-trabajo': [['drag', 'Arrastra el punto que brilla hasta tu respuesta. Al comprobar verás si cuadra.', { tile: 'punto', slot: 'figura' }]],
  'tabla-directa': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '12', slot: 'lugar' }]],
  'cuadros-trabajo': [['slide', 'Mueve la perilla hasta tu respuesta. Al comprobar, la escena la ejecuta.', { label: 'valor' }]],
  'maquinas-justas': [['slide', 'Mueve la perilla hasta tu respuesta. Al comprobar, la escena la ejecuta.', { label: 'valor' }]],
  'raciones-dias': [['drag', 'Arrastra el punto que brilla hasta tu respuesta. Al comprobar verás si cuadra.', { tile: 'punto', slot: 'figura' }]],
  'lanza-regla': [['slide', 'Estira hasta el valor que crees y suelta.', { label: 'valor' }]],
  'tres-viajes': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '12', slot: 'lugar' }]],
  'reloj-encuentro': [['slide', 'Mueve la perilla hasta tu respuesta. Al comprobar, la escena la ejecuta.', { label: 'valor' }]],
  'reloj-caza': [['slide', 'Mueve la perilla hasta tu respuesta. Al comprobar, la escena la ejecuta.', { label: 'valor' }]],
  'sale-despues': [['slide', 'Mueve la perilla hasta tu respuesta. Al comprobar, la escena la ejecuta.', { label: 'valor' }]],
  'media-viaje': [['drag', 'Arrastra el punto que brilla hasta tu respuesta. Al comprobar verás si cuadra.', { tile: 'punto', slot: 'figura' }]],
  'juntos-llenan': [['slide', 'Mueve la perilla hasta tu respuesta. Al comprobar, la escena la ejecuta.', { label: 'valor' }]],
  'segunda-llave': [['slide', 'Mueve la perilla hasta tu respuesta. Al comprobar, la escena la ejecuta.', { label: 'valor' }]],
  'lanza-viaje': [['slide', 'Estira hasta el valor que crees y suelta.', { label: 'valor' }]],
  'parte-barra': [['drag', 'Arrastra el punto que brilla hasta tu respuesta. Al comprobar verás si cuadra.', { tile: 'punto', slot: 'figura' }]],
  'piezas-diez': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'porcentaje-barra': [['drag', 'Arrastra el punto que brilla hasta tu respuesta. Al comprobar verás si cuadra.', { tile: 'punto', slot: 'figura' }]],
  'compara-porciento': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'total-barra': [['drag', 'Arrastra el punto que brilla hasta tu respuesta. Al comprobar verás si cuadra.', { tile: 'punto', slot: 'figura' }]],
  'parte-de-la-parte': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '12', slot: 'lugar' }]],
  'mezcla-agua': [['drag', 'Arrastra el punto que brilla hasta tu respuesta. Al comprobar verás si cuadra.', { tile: 'punto', slot: 'figura' }]],
  'tiro-porciento': [['slide', 'Estira hasta el valor que crees y suelta.', { label: 'valor' }]],
  'factor-cada': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '12', slot: 'lugar' }]],
  'precio-nuevo': [['drag', 'Arrastra el punto que brilla hasta tu respuesta. Al comprobar verás si cuadra.', { tile: 'punto', slot: 'figura' }]],
  'dos-cambios': [['drag', 'Arrastra el punto que brilla hasta tu respuesta. Al comprobar verás si cuadra.', { tile: 'punto', slot: 'figura' }]],
  'cambio-unico': [['slide', 'Mueve la perilla hasta tu respuesta. Al comprobar, la escena la ejecuta.', { label: 'valor' }]],
  'mismo-final': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'vuelta-atras': [['drag', 'Arrastra el punto que brilla hasta tu respuesta. Al comprobar verás si cuadra.', { tile: 'punto', slot: 'figura' }]],
  'sin-iva': [['drag', 'Arrastra el punto que brilla hasta tu respuesta. Al comprobar verás si cuadra.', { tile: 'punto', slot: 'figura' }]],
  'tiro-precio': [['slide', 'Estira hasta el valor que crees y suelta.', { label: 'valor' }]],
  'arbol-ramas': [['slide', 'Mueve la perilla hasta tu respuesta. Al comprobar se dibuja todo.', { label: 'valor' }]],
  'se-multiplica': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'placa-casillas': [['drag', 'Arrastra cada número a su casilla.', { tile: '6', slot: 'casilla' }]],
  'rejilla-permitida': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'tira-colores': [['drag', 'Arrastra cada número a su casilla.', { tile: '6', slot: 'casilla' }]],
  'interruptores': [['slide', 'Mueve la perilla hasta tu respuesta. Al comprobar se dibuja todo.', { label: 'valor' }]],
  'rutas-tramos': [['drag', 'Arrastra cada número a su casilla.', { tile: '6', slot: 'casilla' }]],
  'sube-arbol': [['slide', 'Estira hasta tu cuenta y suelta: el ascensor sube.', { label: 'cuenta' }]],
  'fila-factorial': [['drag', 'Arrastra cada número a su casilla.', { tile: '6', slot: 'casilla' }]],
  'podio-puestos': [['drag', 'Arrastra cada número a su casilla.', { tile: '6', slot: 'casilla' }]],
  'cuantos-candidatos': [['slide', 'Mueve la perilla hasta tu respuesta. Al comprobar se dibuja todo.', { label: 'valor' }]],
  'palabras-distintas': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'repetidas-divide': [['drag', 'Arrastra cada número a su casilla.', { tile: '6', slot: 'casilla' }]],
  'paquete-juntos': [['drag', 'Arrastra cada número a su casilla.', { tile: '6', slot: 'casilla' }]],
  'casilla-exigente': [['drag', 'Arrastra cada número a su casilla.', { tile: '6', slot: 'casilla' }]],
  'sube-orden': [['slide', 'Estira hasta tu cuenta y suelta: el ascensor sube.', { label: 'cuenta' }]],
  'mismo-grupo': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'orden-no-importa': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'divide-ordenes': [['drag', 'Arrastra cada número a su casilla.', { tile: '6', slot: 'casilla' }]],
  'elige-deja': [['drag', 'Arrastra cada número a su casilla.', { tile: '6', slot: 'casilla' }]],
  'comite-mixto': [['drag', 'Arrastra cada número a su casilla.', { tile: '6', slot: 'casilla' }]],
  'con-o-sin': [['drag', 'Arrastra cada número a su casilla.', { tile: '6', slot: 'casilla' }]],
  'cuantos-saludos': [['slide', 'Mueve la perilla hasta tu respuesta. Al comprobar se dibuja todo.', { label: 'valor' }]],
  'sube-grupo': [['slide', 'Estira hasta tu cuenta y suelta: el ascensor sube.', { label: 'cuenta' }]],
  'cruce-numeros': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'suma-y-resta': [['drag', 'Arrastra cada número a su casilla.', { tile: '6', slot: 'casilla' }]],
  'cruce-barras': [['slide', 'Mueve la perilla hasta tu respuesta. Al comprobar se dibuja todo.', { label: 'valor' }]],
  'ruletas-alguno': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'lo-contrario': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'todos-ninguno': [['drag', 'Arrastra cada número a su casilla.', { tile: '6', slot: 'casilla' }]],
  'parte-casos': [['drag', 'Arrastra cada número a su casilla.', { tile: '6', slot: 'casilla' }]],
  'sube-casos': [['slide', 'Estira hasta tu cuenta y suelta: el ascensor sube.', { label: 'cuenta' }]],
  'cuadrados-tamano': [['drag', 'Arrastra cada número a su casilla.', { tile: '6', slot: 'casilla' }]],
  'donde-cabe': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'lados-diagonales': [['slide', 'Mueve la perilla hasta tu respuesta. Al comprobar se dibuja todo.', { label: 'valor' }]],
  'esquina-cerrada': [['drag', 'Arrastra cada número a su casilla.', { tile: '6', slot: 'casilla' }]],
  'palabra-camino': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'tira-larga': [['drag', 'Arrastra cada número a su casilla.', { tile: '6', slot: 'casilla' }]],
  'triangulos-abanico': [['slide', 'Mueve la perilla hasta tu respuesta. Al comprobar se dibuja todo.', { label: 'valor' }]],
  'sube-figuras': [['slide', 'Estira hasta tu cuenta y suelta: el ascensor sube.', { label: 'cuenta' }]],
  'esquina-dos': [['drag', 'Arrastra el punto que brilla hasta tu respuesta.', { tile: 'punto', slot: 'figura' }]],
  'rombo-cuadras': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'termina-ruta': [['drag', 'Arrastra el punto que brilla hasta tu respuesta.', { tile: 'punto', slot: 'figura' }]],
  'mismo-destino': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'vuelve-corto': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'atajo-recto': [['drag', 'Arrastra el punto que brilla hasta tu respuesta.', { tile: 'punto', slot: 'figura' }]],
  'regresa-ya': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'taxi-cuadras': [['slide', 'Estira hasta tu respuesta y suelta.', { label: 'valor' }]],
  'torres-suma': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'vista-frente': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'vista-izquierda': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'plano-maximo': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'pintura-lugar': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'donde-pintura': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'bloque-adentro': [['slide', 'Mueve la perilla hasta tu respuesta.', { label: 'alto' }]],
  'sube-cubos': [['slide', 'Estira hasta tu respuesta y suelta.', { label: 'valor' }]],
  'opuestas-molde': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'cierra-cubo': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'vecinas-cara': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'dado-escondidas': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'vuelca-dado': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'rueda-dado': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'dados-imposibles': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'sube-dado': [['slide', 'Estira hasta tu respuesta y suelta.', { label: 'valor' }]],
  'espejo-vertical': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'letras-espejo': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'gira-ele': [['drag', 'Arrastra el punto que brilla hasta tu respuesta.', { tile: 'punto', slot: 'figura' }]],
  'giro-o-espejo': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'hora-espejo': [['drag', 'Arrastra el punto que brilla hasta tu respuesta.', { tile: 'punto', slot: 'figura' }]],
  'papel-abierto': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'dobla-y-cuenta': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'sube-dobleces': [['slide', 'Estira hasta tu respuesta y suelta.', { label: 'valor' }]],
  'que-lugar': [['slide', 'Mueve la perilla hasta tu respuesta.', { label: 'valor' }]],
  'termino-lejano': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'saltos-crecen': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'cada-regla': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'rompe-fila': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'suma-dos': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'mezcladas-siguen': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'sube-termino': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'letra-sigue': [['drag', 'Arrastra el punto que brilla hasta tu respuesta.', { tile: 'punto', slot: 'figura' }]],
  'letras-atras': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'brazos-estrella': [['slide', 'Mueve la perilla hasta tu respuesta.', { label: 'valor' }]],
  'fijo-y-crece': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'escalera-cuatro': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'dos-reglas': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'mesas-hexagono': [['slide', 'Mueve la perilla hasta tu respuesta.', { label: 'valor' }]],
  'sube-patron': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'pieza-ciclo': [['drag', 'Arrastra el punto que brilla hasta tu respuesta.', { tile: 'punto', slot: 'figura' }]],
  'vueltas-sobran': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'dia-semana': [['drag', 'Arrastra el punto que brilla hasta tu respuesta.', { tile: 'punto', slot: 'figura' }]],
  'mismo-residuo': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'ultima-ciclo': [['drag', 'Arrastra cada respuesta a su lugar.', { tile: '6', slot: 'lugar' }]],
  'coinciden-otra': [['slide', 'Mueve la perilla hasta tu respuesta.', { label: 'valor' }]],
  'retrocede-ruleta': [['drag', 'Arrastra el punto que brilla hasta tu respuesta.', { tile: 'punto', slot: 'figura' }]],
  'sube-residuo': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'avanza-clave': [['slide', 'Mueve la perilla hasta los lugares que avanza.', { label: 'lugares' }]],
  'cifra-palabra': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'A', slot: 'lugar' }]],
  'descifra-mensaje': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'A', slot: 'lugar' }]],
  'suma-letras': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'A', slot: 'lugar' }]],
  'letra-falta': [['drag', 'Arrastra el señalador hasta la letra.', { tile: 'A', slot: 'letra' }]],
  'prende-focos': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['16', '8', '4'], pick: [1] }]],
  'lee-tablero': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'A', slot: 'lugar' }]],
  'sube-codigo': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'regla-todos': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['16', '8', '4'], pick: [1] }]],
  'maquina-cifras': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'A', slot: 'lugar' }]],
  'maquina-dos-pasos': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'A', slot: 'lugar' }]],
  'puestos-cambian': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'A', slot: 'lugar' }]],
  'devuelve-puestos': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'A', slot: 'lugar' }]],
  'avances-crecen': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'A', slot: 'lugar' }]],
  'clave-comparada': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'A', slot: 'lugar' }]],
  'sube-regla': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'lee-escala': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '50', slot: 'lugar' }]],
  'pasa-tabla': [['drag', 'Arrastra el punto que brilla hasta tu respuesta.', { tile: 'punto', slot: 'barra' }]],
  'mayor-tramo': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'barra-baja': [['drag', 'Arrastra el punto que brilla hasta tu respuesta.', { tile: 'punto', slot: 'barra' }]],
  'ida-vuelta-porciento': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '50', slot: 'lugar' }]],
  'abre-sector': [['drag', 'Arrastra el punto que brilla hasta tu respuesta.', { tile: 'punto', slot: 'sector' }]],
  'sector-cantidad': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '50', slot: 'lugar' }]],
  'sube-grafica': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'nivela-linea': [['drag', 'Arrastra el punto que brilla hasta tu respuesta.', { tile: 'punto', slot: 'línea' }]],
  'dato-para-promedio': [['drag', 'Arrastra el punto que brilla hasta tu respuesta.', { tile: 'punto', slot: 'barra' }]],
  'ordena-centro': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '50', slot: 'lugar' }]],
  'centros-par': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '50', slot: 'lugar' }]],
  'dato-exagerado': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'apoyo-grupos': [['drag', 'Arrastra el punto que brilla hasta tu respuesta.', { tile: 'punto', slot: 'apoyo' }]],
  'meses-mas': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '50', slot: 'lugar' }]],
  'sube-centro': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'sube-piso': [['slide', 'Mueve la perilla hasta tu respuesta.', { label: 'eje' }]],
  'diferencia-real': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '50', slot: 'lugar' }]],
  'pasan-porciento': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'misma-proporcion': [['slide', 'Mueve la perilla hasta tu respuesta.', { label: 'cuántos' }]],
  'muestra-parecida': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '50', slot: 'lugar' }]],
  'muestras-sirven': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'se-concluye': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'sube-dato-real': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'prende-circuito': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'valor-frases': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'V', slot: 'lugar' }]],
  'tabla-disyuncion': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'promesa-sigue': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'cuenta-filas': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'V', slot: 'lugar' }]],
  'nombra-columna': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'V', slot: 'lugar' }]],
  'frase-larga': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'V', slot: 'lugar' }]],
  'sube-filas': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'niega-y': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'V', slot: 'lugar' }]],
  'niega-mezclada': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'V', slot: 'lugar' }]],
  'tabla-negada': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'casos-tumban': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'parejas-negacion': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'V', slot: 'lugar' }]],
  'pinta-negacion': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'niega-cartel': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'V', slot: 'lugar' }]],
  'sube-niega': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'zonas-posibles': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'voltea-niega': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'V', slot: 'lugar' }]],
  'mismo-condicional': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'basta-falta': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'V', slot: 'lugar' }]],
  'revisa-regla': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'deduce-seguro': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'V', slot: 'lugar' }]],
  'cadena-si': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'V', slot: 'lugar' }]],
  'sube-regla-si': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'dibujo-contra': [['drag', 'Arrastra el círculo hasta su sitio.', { tile: 'círculo', slot: 'sitio' }]],
  'frase-dibujo': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'V', slot: 'lugar' }]],
  'se-voltea': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'donde-alguien': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'seguro-tres': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'cadena-todos': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'V', slot: 'lugar' }]],
  'tumba-todos': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'sube-circulos': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'quien-miente-tres': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'tabla-sospechosos': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'cadena-acusan': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'frases-opuestas': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'supone-choca': [['drag', 'Arrastra cada ficha a su lugar.', { tile: 'V', slot: 'lugar' }]],
  'tres-cofres': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'culpable-una-verdad': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'sube-mentira': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'arma-receta': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'maquina-ida-vuelta': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'cuales-conmutan': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'entran-negativos': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'lee-operacion': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'tabla-desigual': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'neutro-de-cada': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'sube-operador': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'dos-parentesis': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'arbol-operador': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'lugar-x': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'iguala-lados': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'cadena-en-tabla': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'x-consigo': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'deshace-operador': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'sube-anidado': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'fraccion-de-que': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'corta-barra': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'queda-producto': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'desde-el-final': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'dejan-lo-mismo': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'tres-tandas': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'porciento-resto': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'sube-resto': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'misma-suma': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'sube-baja-igual': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'cambia-uno': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'reparte-sobra': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'parte-pesos': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'cuantos-llegan': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'aportes-nota': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'sube-promedio': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'bloques-volteo': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'valor-letras': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'suma-con-letras': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'resta-con-letras': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'siempre-once': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'siete-veces': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'producto-con-letras': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'sube-cifras': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'peor-suerte': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'color-pedido': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'seguro-o-suerte': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'corral-pared': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'menor-cerca': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'reparto-distinto': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'techo-piso': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'sube-extremo': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'traduce-frases': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'sigue-equilibrada': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'pasos-despeje': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'misma-x': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'ancho-del-marco': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'cinco-seguidos': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'dos-cuerdas': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'sube-ecuacion': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'hace-cuantos': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'tabla-edades': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'todos-iguales': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'aranas-hormigas': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'aguado': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'precio-posible': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'se-llevan-igual': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'sube-edades': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'resta-recibos': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'iguala-recibos': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'lleva-ventaja': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'pendiente-escalon': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'tarifa-recta': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'llega-presupuesto': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'vacia-tanque': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'cruce-planes': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'zona-conviene': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'lee-pendiente': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'historia-grafica': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'tabla-lineal': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'sube-tarifa': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'tercer-lado': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'cierran-o-no': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'area-letras': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'junta-terminos': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'factor-comun': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'cuadrado-falta': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'equivalen-no': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'alcanza-o-no': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'datos-que-sobran': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'vale-o-no': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'desvios-cero': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'mueve-rango': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'arma-caja': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'percentil-puesto': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'predice-nube': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'fraccion-recta': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'coma-cientifica': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'cruce-grupos': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'que-termino': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'mitades-faltan': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'compensa-justo': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'varianza-pasos': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'suma-igual': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'elige-regular': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'lee-caja': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'compara-cajas': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'signo-correlacion': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'fuerza-r': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'tercer-factor': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'fraccion-decimal': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'opera-cientifica': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'a-que-conjunto': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'llena-zonas': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'cuantos-conjunto': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'suma-o-multiplica': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'se-acerca-a': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'lugar-lejano': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'riesgo-grupos': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'solida-o-no': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'mas-disperso': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'dice-la-caja': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'punto-raro': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'causa-o-no': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'entre-los-dos': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'pinta-zona': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'verdad-conjuntos': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'tiene-limite': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'buena-evidencia': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'sube-varianza': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'sube-percentil': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'sube-nube': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'sube-fraccion': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'sube-conjunto': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'sube-sucesion': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'sube-evidencia': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'traslada-punto': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'refleja-punto': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'rota-punto': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'homotecia-punto': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'cuarto-vertice': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'punto-medio': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'polar-gira': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'boyle-embolo': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'charles-globo': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'concentra-agua': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'diluye-agua': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'corriente-resistor': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'serie-resistencia': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'que-movimiento': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'polar-a-cartesiana': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'caja-coordenadas': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'gas-sube-baja': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'concentracion-tabla': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'mas-o-menos-concentrada': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'paralelo-ramas': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'atrae-repele': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'fuerza-cambia': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'que-se-conserva': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'mismo-polar': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'que-prende': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'sube-movimiento': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'sube-distancia': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'sube-gas': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'sube-vatios': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'vertice-parabola': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'ancho-maximo': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'raices-parabola': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'veces-factor': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'amplitud-onda': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'periodo-onda': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'altura-rueda': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'rango-ventana': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'corte-ejes': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'largo-onda': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'cuenta-vibraciones': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'refleja-angulo': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'eco-distancia': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'lee-parabola': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'abre-arriba': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'tabla-exponencial': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'crece-como': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'log-es': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'sube-o-baja-base': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'lee-onda': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'en-que-momento': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'lee-cortes': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'contexto-dominio': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'se-acerca-normal': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'tono-o-volumen': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'punto-en-curva': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'igual-potencia': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'es-periodica': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'dominio-valores': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'es-funcion': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'sube-parabola': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'sube-logaritmo': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'sube-onda': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'sube-funcion': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'sube-rapidez': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'plazo-simple': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'plazo-compuesto': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'antes-del-iva': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'un-solo-descuento': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'cuotas-justas': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'balancea-atomos': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'paquetes-limite': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'nivel-ph': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'simple-o-compuesto': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'tabla-ahorro': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'traduce-tasa': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'recibo-pago': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'cuota-partes': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'masa-cerrada': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'relacion-moles': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'da-el-saldo': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'oferta-mejor': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'conserva-atomos': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'sube-interes': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'sube-cuota': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'sube-moles': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'punto-comun': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'voltea-o-sigue': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'pinta-intervalo': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'enteros-entre': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'sube-sistema': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'ubica-cada': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'pinta-operacion': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'nombra-dibujo': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'zonas-y-total': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'ciertas-siempre': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'elementos-de': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'misma-zona': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'sube-union': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'llena-encuesta': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'corre-solape': [['slide', 'Corre la barra hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'tres-circulos': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'pinta-tres': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'lee-encuesta': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'desde-los-totales': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'porciento-comun': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'sube-encuesta': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'toca-primos': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'arbol-primos': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'opciones-divisor': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'cifra-que-falta': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'tabla-criterios': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'siempre-multiplo': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'basta-con': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'sube-divisores': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'saltos-cada-una': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'paquetes-iguales': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'exponentes-mcd': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'cual-de-los-dos': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'baldosa-mayor': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'producto-mcd': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'hora-del-cruce': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'sube-mcm': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'siempre-par': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'dos-residuos': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'opera-residuos': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'ciclo-ultima': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'rueda-semana': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'ultima-por-partes': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'arma-dividendo': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'sube-sobrante': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'ruleta-favorables': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'iguala-urnas': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'tabla-diferencia': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'coterminal-rueda': [['drag', 'Arrastra el punto por la rueda y comprueba.', { tile: '30°', slot: 'rueda' }]],
  'radianes-rueda': [['drag', 'Arrastra el punto por la rueda y comprueba.', { tile: '30°', slot: 'rueda' }]],
  'grados-radianes': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'vueltas-sobran-trig': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'sector-fraccion': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'vuelta-arco': [['drag', 'Arrastra el punto por la rueda y comprueba.', { tile: '30°', slot: 'rueda' }]],
  'arco-cuenta': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'velocidad-cuenta': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'catetos-razon': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'lados-nombra': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'razones-tres': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'escalera-apoya': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'notables-rueda': [['drag', 'Arrastra el punto por la rueda y comprueba.', { tile: '30°', slot: 'rueda' }]],
  'recta-notables': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'recta-mitad': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'mirador': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'seis-razones': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'de-una-todas': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'depresion-faro': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'punto-unidad': [['drag', 'Arrastra el punto por la rueda y comprueba.', { tile: '30°', slot: 'rueda' }]],
  'gemelos-seno': [['drag', 'Arrastra el punto por la rueda y comprueba.', { tile: '30°', slot: 'rueda' }]],
  'valores-eje': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'gemelos-coseno': [['drag', 'Arrastra el punto por la rueda y comprueba.', { tile: '30°', slot: 'rueda' }]],
  'cuadrante-referencia': [['drag', 'Arrastra el punto por la rueda y comprueba.', { tile: '30°', slot: 'rueda' }]],
  'signo-valor': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'referencia-valor': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'ola-amplitud': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'ola-centro': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'lee-ola': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'ficha-ola': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'ola-periodo': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'ola-desfase': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'lee-periodo': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'ficha-desfase': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'arco-inverso': [['drag', 'Arrastra el punto por la rueda y comprueba.', { tile: '30°', slot: 'rueda' }]],
  'rango-inversa': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'triangulo-inversa': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'deshace-inversa': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'pitagoras-uno': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'secante-barra': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'negativo-espejo': [['drag', 'Arrastra el punto por la rueda y comprueba.', { tile: '30°', slot: 'rueda' }]],
  'par-impar': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'simplifica-senos': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'demuestra-pasos': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'conjugado-trig': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'reemplaza-identidad': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'suma-angulos': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'resta-angulos': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'suma-formula': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'suma-tangente': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'doble-vuelta': [['drag', 'Arrastra el punto por la rueda y comprueba.', { tile: '30°', slot: 'rueda' }]],
  'mitad-angulo': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'doble-cuenta': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'mitad-cuenta': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'corta-ola': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'pareja-ecuacion': [['drag', 'Arrastra el punto por la rueda y comprueba.', { tile: '30°', slot: 'rueda' }]],
  'despeja-trig': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'factoriza-trig': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'angulo-tercero': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'cuelga-lado': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'senos-ley': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'senos-pareja': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'abre-bisagra': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'area-bisagra': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'cosenos-ley': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'cosenos-angulo': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'area-senos': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'argumento-plano': [['drag', 'Arrastra el punto por la rueda y comprueba.', { tile: '30°', slot: 'rueda' }]],
  'polar-flecha': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'componentes-polar': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'modulo-argumento': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'producto-polar': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'cociente-polar': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'demoivre-rueda': [['drag', 'Arrastra el punto por la rueda y comprueba.', { tile: '30°', slot: 'rueda' }]],
  'potencia-polar': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'raiz-primera': [['drag', 'Arrastra el punto por la rueda y comprueba.', { tile: '30°', slot: 'rueda' }]],
  'raices-opuestas': [['drag', 'Arrastra el punto por la rueda y comprueba.', { tile: '30°', slot: 'rueda' }]],
  'petalos': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'raices-ordenadas': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'fichas-venn': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'solapa-conjuntos': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'fichas-recta': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'tramo-recta': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'fichas-barra': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'barra-factor': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'fichas-torre': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'lado-area': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'fichas-escalera': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'escalera-salto': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'fichas-area': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'rectangulo-barras': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'fichas-parabola': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'vertice-mueve': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'fichas-cubica': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'toca-raiz': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'fichas-fraccion': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'cruce-rectas': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'fichas-crece': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'curva-crece': [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]],
  'cuantas-parejas': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'cero-a-uno': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'punto-escala': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'grupo-gafas': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'sube-favorables': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'lo-que-falta': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'cruce-sin-b': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'fallan-todos': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'no-se-afectan': [['tap', 'Toca los que cumplen; otro toque los quita.', { items: ['A', 'B', 'C'], pick: [1] }]],
  'arbol-bolsa': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'devuelve-o-no': [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]],
  'falla-cuadrado': [['slide', 'Mueve el punto hasta que se cumpla lo pedido.', { label: 'valor' }]],
  'sube-por-ciento': [['slide', 'Estira hasta tu respuesta y suelta: el ascensor sube.', { label: 'valor' }]],
  'antes-de-leer': [['drag', 'Lleva cada ficha al hueco de la apuesta.', { tile: 'tema', slot: '¿qué?' }]],
  'hilo-bordes': [['drag', 'Tira un hilo desde cada pregunta hasta el borde que la responde.', { tile: '¿quién?', slot: 'autor' }]],
  'donde-mirar': [['drag', 'Lleva cada pregunta al margen del párrafo donde la buscarías.', { tile: '¿?', slot: 'párrafo' }]],
  'portadas': [['drag', 'Pon en cada portada lo que va a hacer el texto.', { tile: 'explicar', slot: 'portada' }]],
  'voz-de-la-fuente': [['drag', 'Tira un hilo desde cada frase hasta la tarjeta que le toca.', { tile: '«…»', slot: 'tarjeta' }]],
  'comprueba-apuesta': [['tap', 'Toca la oración para subrayarla; otro toque la suelta.', {}]],
  'preguntas-previas': [['tap', 'Toca una pregunta para tacharla; otro toque la devuelve.', {}]],
  'orden-fuentes': [['drag', 'Arrastra cada tira de su asa hasta su puesto.', { tile: 'tira', slot: 'puesto' }]],
  'ordena-texto': [['drag', 'Arrastra cada tira de su asa hasta su puesto.', { tile: 'tira', slot: 'puesto' }]],
  'mapa-margen': [['drag', 'Lleva cada nota al margen de su párrafo.', { tile: 'nota', slot: 'margen' }]],
  'talla-idea': [['drag', 'Pon cada resumen en su talla.', { tile: 'idea', slot: 'talla' }]],
  'tacha-resumen': [['tap', 'Toca una oración para tacharla; otro toque la devuelve.', {}]],
  'subraya-tesis': [['tap', 'Toca la oración para subrayarla; otro toque la suelta.', {}]],
  'bisagras': [['drag', 'Lleva cada palabra al hueco que une las dos ideas.', { tile: 'pero', slot: '¿…?' }]],
  'arma-titulo': [['drag', 'Lleva las fichas a los huecos del título.', { tile: 'ficha', slot: 'título' }]],
  'pilares': [['drag', 'Lleva cada oración bajo el techo o al patio.', { tile: 'idea', slot: 'techo' }]],
  'lee-la-orden': [['tap', 'Toca los trozos de la orden que mandan.', {}]],
  'sella-parrafo': [['drag', 'Tira un hilo desde cada opción hasta el párrafo que la prueba.', { tile: 'opción', slot: 'párrafo' }]],
  'dentro-fuera': [['drag', 'Lleva cada opción al lugar donde está.', { tile: 'opción', slot: 'lugar' }]],
  'dice-deduce': [['drag', 'Lleva cada afirmación a su escalón.', { tile: 'frase', slot: 'escalón' }]],
  'descarta-prueba': [['drag', 'Tira un hilo desde cada opción falsa hasta la oración que la desmiente.', { tile: 'falsa', slot: 'prueba' }]],
  'reparte-tiempo': [['slide', 'Mueve las dos perillas para repartir los minutos.', { label: 'minutos' }]],
  'ruta-preguntas': [['drag', 'Arrastra cada paso de su asa hasta su puesto.', { tile: 'paso', slot: 'puesto' }]],
  'pinta-tipos': [['tap', 'Escoge un marcador y toca las oraciones que le tocan.', {}]],
  'pinta-voces': [['tap', 'Escoge un marcador y toca las oraciones que le tocan.', {}]],
  'pinta-preguntas': [['tap', 'Escoge un marcador y toca las oraciones que le tocan.', {}]],
  'pista-tipo': [['drag', 'Tira un hilo desde cada pista hasta su oración.', { tile: 'pista', slot: 'oración' }]],
  'pieza-argumento': [['drag', 'Tira un hilo desde cada pieza hasta su oración.', { tile: 'tesis', slot: 'oración' }]],
  'cambia-tipo': [['drag', 'Lleva las fichas a los huecos.', { tile: 'ficha', slot: 'hueco' }]],
  'todo-o-parte': [['drag', 'Lleva cada propósito a su lugar.', { tile: 'propósito', slot: 'lugar' }]],
  'genero-o-cita': [['drag', 'Lleva cada texto a su lugar.', { tile: 'texto', slot: 'lugar' }]],
  'pasos-del-proceso': [['drag', 'Arrastra cada paso de su asa hasta su puesto.', { tile: 'paso', slot: 'puesto' }]],
  'signo-oficio': [['drag', 'Tira un hilo desde cada oficio hasta el signo.', { tile: 'oficio', slot: '¿?' }]],
  'tira-referente': [['drag', 'Tira un hilo desde cada palabra hasta aquello a lo que apunta.', { tile: 'ese', slot: 'quién' }]],
  'linea-vida': [['drag', 'Lleva cada hecho a su momento.', { tile: 'hecho', slot: 'antes' }]],
  'subraya-rasgo': [['tap', 'Toca la oración para subrayarla; otro toque la suelta.', {}]],
  'ajusta-alcance': [['slide', 'Mueve cada perilla hasta que la oración diga lo mismo que el texto.', { label: 'algunos' }]],
  'cambia-palabra': [['drag', 'Lleva cada ficha al hueco de la palabra tachada.', { tile: 'palabra', slot: '¿…?' }]],
  'balanza-tesis': [['drag', 'Lleva cada dato al plato que le toca: apoya, debilita o no pesa.', { tile: 'dato', slot: 'apoya' }]],
  'globo-lastre': [['drag', 'Arrastra globos o sacos de arena: el canasto sube o baja y la cuenta se escribe sola.', { tile: 'saco', slot: 'canasto' }], ['tap', 'Déjalo a la altura de la bandera. «Reiniciar» lo devuelve al comienzo.', { items: ['Reiniciar'], pick: [0] }]],
  'voltea-flecha': [['slide', 'Arrastra el multiplicador: la flecha se repite y, a la izquierda del 0, se voltea.', {}]],
  'capas-operacion': [['drag', 'Arrastra un número sobre su vecino: el juego los opera y los funde en uno.', { tile: '5', slot: '8' }], ['drag', 'Para una potencia, junta la base con su exponente (la ficha pequeña de arriba).', { tile: '(−3)', slot: '²' }]],
  'tijera-angulos': [['turn', 'Arrastra la punta de la recta: los cuatro ángulos cambian a la vez.', {}]],
  'paralelas-gira': [['turn', 'Gira la recta de abajo hasta que no se cruce nunca con la de arriba.', {}]],
  'apice-triangulo': [['drag', 'Arrastra el vértice de arriba: los ángulos cambian, pero siempre suman 180°.', { tile: 'C', slot: 'arriba' }]],
  'suma-poligono': [['drag', 'Arrastra desde el punto hasta otro vértice para trazar una diagonal.', { tile: '•', slot: 'vértice' }]],
  'cuadrados-pitagoras': [['drag', 'Arrastra las puntas de los catetos: sus cuadrados crecen y la tira los suma.', { tile: 'cateto', slot: 'más largo' }]],
  'escalera-pared': [['slide', 'Arrastra el pie de la escalera: la punta sube o baja por la pared.', {}]],
  'billar-rebote': [['slide', 'Arrastra la mira por la banda de arriba y suelta: la bola sale.', {}]],
  'tableta-fraccion': [['slide', 'Arrastra el deslizador para cortar la tableta en partes iguales.', {}], ['drag', 'Luego arrastra el dedo sobre la tableta para tomar las partes que pide.', { tile: 'parte', slot: 'tableta' }]],
  'corta-igual': [['slide', 'Arrastra: las dos barras se recortan en pedacitos. Cuando encajan en las dos, se pueden juntar.', {}]],
  // Kit LEC de lectura (spec 2026-11-19-preuda-lectura-textos): el texto va arriba; las fichas se arrastran o se tocan y luego la zona.
  'anticipa-texto': [['drag', 'Antes de leer, mira la ficha y arrastra a cada casilla lo que esperas del texto.', { tile: 'explicar', slot: 'propósito' }]],
  'mapa-del-texto': [['drag', 'Arrastra a cada párrafo lo que hace en el texto. Abajo se arma el esqueleto.', { tile: 'da un ejemplo', slot: '¶3' }]],
  'resume-parrafo': [['drag', 'Arrastra a cada párrafo la frase que dice su idea central. Sobran frases.', { tile: 'idea central', slot: '¶2' }]],
  'donde-buscar': [['drag', 'Lleva cada pregunta al párrafo donde está su respuesta.', { tile: '¿quién?', slot: '¶4' }]],
  'lupa-evidencia': [['drag', 'Pon cada afirmación en su caja: lo dice el texto, se deduce o no lo dice.', { tile: 'afirmación', slot: 'se deduce' }]],
  'intruso-excepto': [['drag', 'Lleva cada opción a su párrafo. La que no tiene párrafo va a «No aparece».', { tile: 'opción B', slot: 'No aparece' }]],
  'palabra-a-la-medida': [['drag', 'Arrastra al hueco la palabra que dice lo mismo que la subrayada en esa oración.', { tile: 'prueba', slot: 'hueco' }]],
  'hilo-referente': [['drag', 'Tira el hilo desde el nudo hasta las palabras a las que se refiere. O tócalas.', { dot: true }]],
  'conector-bisagra': [['drag', 'Arrastra un conector a la bisagra: se dibuja la relación que crea entre las ideas.', { tile: 'sin embargo', slot: 'bisagra' }]],
  'signos-que-hablan': [['drag', 'Arrastra sobre el signo resaltado el oficio que cumple en esa oración.', { tile: 'cita', slot: '« »' }]],
  'quien-lo-dice': [['drag', 'Lleva cada idea a la voz que la sostiene: el autor o cada persona citada.', { tile: 'idea', slot: 'la experta' }]],
  'balanza-argumento': [['drag', 'Pon cada oración en el platillo que apoya o debilita la tesis. Lo ajeno se queda abajo.', { tile: 'dato', slot: 'apoya' }]],
  'termometro-tono': [['drag', 'Lee el fragmento y arrastra la aguja hasta su tono. También puedes tocar el tono.', { dot: true }]],
  'caso-nuevo': [['drag', 'Lleva cada situación a «Aplica la idea» si repite la idea del texto, o a «No la aplica».', { tile: 'situación', slot: 'aplica' }]],
  'puente-dos-textos': [['drag', 'Pon cada idea en «Solo Uno», «Los dos» o «Solo Dos», según qué texto la dice.', { tile: 'idea', slot: 'los dos' }]],
  'ordena-parrafos': [['drag', 'Los párrafos llegan revueltos: arrastra cada uno a su lugar debajo del primero.', { tile: 'párrafo', slot: '2' }]],
  'subraya-prueba': [['drag', 'Arrastra el subrayador hasta la oración que prueba la conclusión de arriba.', { tile: 'subrayador', slot: 'oración' }]],
  'resumen-esencial': [['drag', 'Llena los renglones del resumen solo con las ideas que sostienen todo el texto.', { tile: 'idea', slot: 'renglón' }]],
  'trampa-opcion': [['drag', 'Arrastra a cada opción su sello: la respuesta o la trampa que tiene. Sobra uno.', { tile: 'dice de más', slot: 'B' }]],
  'cadena-causas': [['drag', 'Arma la cadena: pon en cada eslabón un hecho, de la causa al efecto. Sobran hechos.', { tile: 'causa', slot: 'primero' }]],
  'completa-solucion': [['drag', 'Lee el problema y arrastra cada ficha al hueco de la solución donde va.', { tile: '40', slot: 'hueco' }], ['tap', 'Sobran fichas: son los errores típicos. Tocar un hueco lleno devuelve su ficha.', { items: ['40', '24', '15'], pick: [0] }]],
  'caza-error': [['tap', 'Esta solución tiene un paso equivocado. Toca el primer paso que no se justifica.', { items: ['paso 1', 'paso 2', 'paso 3'], pick: [1] }], ['drag', 'Arrastra sobre ese paso cómo debía quedar.', { tile: 'corrección', slot: 'paso 2' }]],
  'opcion-examen': [['tap', 'Así sale en el examen: resuelve en tu cuaderno o en tu cabeza y toca la opción correcta.', { items: ['A', 'B', 'C', 'D'], pick: [2] }]],
  'pregunta-examen': [['tap', 'Lee el texto, vuelve al párrafo que pide la pregunta y toca la opción correcta.', { items: ['A', 'B', 'C', 'D'], pick: [2] }]],
  'subraya-texto': [['tap', 'Lee el texto y toca los trozos que responden la consigna: quedan subrayados.', { items: ['El páramo', 'da agua a', 'dos millones'], pick: [2] }], ['tap', 'Tocar otra vez un trozo lo quita. Si hay varias pestañas, cada una es otra consigna.', { items: ['1', '2'], pick: [1] }]],
  'escala-solucion': [['trace', 'Traza una ruta desde la base y une un paso válido por nivel.', {}], ['tap', 'Toca un paso anterior para corregir lo que sigue.', { items: ['x = 4', 'x = 1'], pick: [1, 0] }]],
  'escala-leyes': [['tap', 'Toca las tarjetas en el orden que deja al escalador en la bandera. Se puede deshacer.', { items: ['· x³', '( )²', '÷ x⁴'], pick: [0, 1] }]],
  'escalera-aritmetica': [['slide', 'Arrastra el segundo peldaño: fija la diferencia y toda la escalera se acomoda.', { vert: true }]],
  'espejo-diagonal': [['drag', 'Arrastra cada ficha hasta su reflejo en el espejo y = x.', { dot: true }]],
  'espiral-potencias': [['step', 'Con «× z» y «÷ z» elige cuántas veces multiplicar; la espiral se ve al comprobar.', { from: 2, to: 4, label: 'n' }]],
  'estira-barra': [['slide', 'Estira o encoge la barra con el tirador (o − / +) hasta el porcentaje pedido.', { label: '%' }]],
  'estira-foto': [['slide', 'Arrastra el borde de abajo para fijar el alto sin deformar la foto.', { vert: true }]],
  'etiqueta-rebaja': [['drag', 'Arrastra a cada etiqueta el sticker con su precio final.', { tile: '$ 80', slot: 'etiqueta −20 %' }]],
  'tamiz-rango': [['slide', 'Arrastra los corchetes: los números que quedan adentro forman el conjunto.', {}]],
  'cajas-anidadas': [['drag', 'Arrastra a la membrana las fichas y bolsas que pide la notación.', { tile: '{2, 3}', slot: 'A' }]],
  'gemelos': [['drag', 'Arrastra a la papelera lo que impide la relación; los hilos unen elementos iguales.', { tile: 's', slot: 'papelera' }]],
  'escalera-inclusion': [['drag', 'Arrastra al centro los conjuntos, del más pequeño al más grande: cada uno debe contener al anterior.', { tile: '{a}', slot: 'centro' }]],
  'arbol-partes': [['drag', 'Arrastra un elemento al árbol: cada rama se parte en dos y las hojas se duplican.', { tile: 'p', slot: 'árbol' }]],
  'anillos-subconjunto': [['slide', 'Arrastra el lanzador bajo una estaca y suelta: el aro solo encaja si la estaca lo contiene.', {}]],
  'solapa-cardinal': [['slide', 'Arrastra B sobre A: lo que comparten pasa a la zona común y la cuenta se escribe sola.', {}]],
  'goma-diferencia': [['drag', 'Arrastra a la goma los elementos que la operación deja por fuera.', { tile: '2', slot: 'goma' }]],
  'busca-b': [['drag', 'Arrastra elementos del universo a B hasta que se cumplan las dos pistas.', { tile: '4', slot: 'B' }]],
  'pares-cero': [['drag', "Una ficha + sobre una − se anulan. Para restar, quita fichas; si faltan, agrega pares cero.", {"tile": "+", "slot": "−"}]],
  'flecha-resta': [['slide', "Arrastra la cola al valor de antes y la punta al de después: la flecha mide el cambio.", {}]],
  'agrupa-fraccion': [['slide', "Arrastra la manija para juntar las partes de la barra en grupos iguales.", {}]],
  'espiral-teodoro': [['turn', "Gira la punta alrededor del centro: cada triángulo nuevo suma uno bajo la raíz.", {}]],
  'agrupa-amigos': [['drag', "Arrastra los números de a dos a cada plato: cada plato muestra su suma.", {"tile": "17", "slot": "plato"}]],
  'une-rectangulos': [['drag', "Arrastra junto a la base los rectángulos que tienen su mismo alto.", {"tile": "6·3", "slot": "base"}]],
  'deshaz-camino': [['drag', "Arrastra a las puertas de regreso las tarjetas que deshacen cada paso.", {"tile": "−3", "slot": "puerta"}]],
  'multiplica-primero': [['drag', "Arrastra un factor sobre otro para multiplicarlos primero.", {"tile": "25", "slot": "4"}]],
  'vagon-inverso': [['slide', "Estira el resorte o elige el factor, y suelta: el vagón corre o la liga se estira.", {}]],
  'resta-opuesto': [['drag', "Voltea la flecha de abajo y pégala en la punta de la de arriba.", {"tile": "−b", "slot": "punta"}]],
  'parte-flecha': [['slide', "Corre la tijera para partir la flecha; si el divisor es negativo, voltea el pedazo.", {}]],
  'rebote-signos': [['slide', "Arrastra la ficha al punto de salida y suelta: salta sola.", {}]],
  'espejo-desigualdad': [['slide', "Arrastra el control: abajo se ven las imágenes y el signo entre ellas.", {}]],
  'barra-razon': [['slide', "Arrastra la manija para partir la cinta en dos tramos.", {}]],
  'rejilla-razon': [['paint', "Pasa el dedo por las baldosas para pintarlas o despintarlas.", {}]],
  'receta-escala': [['slide', "Arrastra las porciones: todos los ingredientes cambian en la misma razón.", {}]],
  'bici-cambios': [['slide', "Arrastra la cadena a un piñón y suelta: la bici pedalea sola.", {}]],
  'llaves-tanque': [['slide', "Elige cuántas llaves abrir y suelta: el agua corre y el reloj cuenta.", {}]],
  'mapa-escala': [['slide', "Arrastra el pueblo B sobre la regla del mapa.", {}]],
  'tanque-porcentaje': [['slide', "Sube la marca de nivel a los litros justos y suelta: el agua llena hasta ahí.", {}]],
  'precio-original': [['slide', "Arrastra el precio de antes: el cambio se aplica y se ve el de ahora.", {}]],
  'factor-cambio': [['slide', "Arrastra el factor hasta que la barra de antes quede igual a la de después.", {}]],
  'rampa-precio': [['slide', "Gira el sello y suelta: la etiqueta baja y cambia de precio al pasar.", {}]],
  'semanas-rebaja': [['slide', "Arrastra las semanas: aparece una barra por semana.", {}]],
  'sube-y-baja': [['slide', "Arrastra el porcentaje que sube y luego baja.", {}]],
  'escalera-potencias': [['slide', "Arrastra la marca por la escalera: subir multiplica por la base y bajar divide.", {}]],
  'cubo-bloques': [['slide', "Arrastra la arista: el cubo se arma con bloquecitos.", {}]],
  'cancela-pisos': [['drag', "Arrastra una ficha de arriba sobre una de abajo: la pareja se cancela.", {"tile": "x", "slot": "x"}]],
  'copias-potencia': [['slide', "Arrastra la manija para hacer copias de la caja de factores.", {}]],
  'fraccion-exponente': [['slide', "Arrastra la regla de la raíz y la de la potencia.", {}]],
  'absoluto-raiz': [['slide', "Arrastra x por la recta y mira x², la raíz y la distancia al cero.", {}]],
  'suma-raices': [['slide', "Arrastra el lado del cuadrado nuevo hasta que su área sea la suma.", {}]],
  'racionaliza-uno': [['drag', "Arrastra una tarjeta que valga 1 sobre la fracción.", {"tile": "√3/√3", "slot": "fracción"}]],
  'copias-raiz': [['slide', "Arrastra hasta que el segmento de abajo mida lo mismo que la fila de arriba.", {}]],
  'goteo-tanque': [['slide', "Arrastra las mediciones: aparece una barra por hora.", {}]],
  'poste-cerca': [['slide', 'Arrastra cuántos postes poner: entre dos postes hay un tramo.', {}]],
  'nivela-barras': [['slide', "Arrastra la línea hasta que lo que sobra arriba llene lo que falta abajo.", {}]],
  'alcancia-semanas': [['slide', "Arrastra las semanas: la alcancía muestra el total.", {}]],
  'razon-terminos': [['slide', "Arrastra la razón: los términos de en medio se llenan solos.", {}]],
  'carrera-crecimiento': [['slide', "Arrastra el puesto y compara la barra que suma con la que multiplica.", {}]],
  'cultivo-celulas': [['slide', "Arrastra las generaciones: las células se multiplican.", {}]],
  'cuadrado-mitades': [['slide', "Arrastra las capas: cada una pinta parte de lo que falta.", {}]],
  'torre-geometrica': [['slide', "Arrastra cuántos términos apilar en la torre.", {}]],
  'ajusta-razon': [['slide', "Arrastra la razón y mira hacia dónde van las sumas parciales.", {}]],
  'sigma-indices': [['slide', "Arrastra los dos topes: desde dónde y hasta dónde va k.", {}]],
  'cambia-indice': [['slide', "Arrastra el corrimiento hasta alinear los términos.", {}]],
  'factorial-cajas': [['slide', "Arrastra cuántos objetos se ponen en fila.", {}]],
  'bloques-polinomio': [['drag', "Arrastra bloques de la bandeja a la mesa; un bloque y su opuesto se anulan.", {"tile": "x²", "slot": "mesa"}]],
  'reduce-semejantes': [['drag', "Arrastra un bloque sobre otro igual de color contrario: se anulan.", {"tile": "x", "slot": "−x"}]],
  'resta-voltea': [['drag', "Pasa cada bloque de Q por el volteador y luego llévalo a la mesa.", {"tile": "x", "slot": "volteador"}]],
  'evalua-polinomio': [['slide', "Arrastra x por la recta: cada término muestra cuánto vale.", {}]],
  'llena-rectangulo': [['drag', "Arrastra bloques al marco hasta llenarlo.", {"tile": "x", "slot": "marco"}]],
  'parte-cuadrado': [['slide', "Arrastra el corte del lado: el cuadrado se parte en cuatro piezas.", {}]],
  'diferencia-cuadrados': [['slide', "Arrastra a y b: el cuadrado pierde una esquina y queda un rectángulo.", {}]],
  'binomios-comun': [['slide', "Arrastra a y b: el rectángulo se llena de barras y cuadritos.", {}]],
  'marco-cuadro': [['slide', "Arrastra el lado del cuadro: el marco se dibuja con su área.", {}]],
  'triangulo-pascal': [['drag', "Arrastra fichas a las casillas vacías de la fila.", {"tile": "10", "slot": "casilla"}]],
  'elige-parentesis': [['drag', "Arrastra fichas b a los paréntesis; cada manera nueva queda anotada.", {"tile": "b", "slot": "( a + b )"}]],
  'exponentes-binomio': [['slide', "Arrastra el número de término: los exponentes cambian.", {}]],
  'fila-potencia': [['slide', "Arrastra la fila de Pascal y mira cuánto suma.", {}]],
  'once-potencias': [['slide', "Arrastra n y compara la fila de Pascal con las cifras de 11ⁿ.", {}]],
  'factor-comun-bloques': [['slide', "Arrastra el número de filas: los bloques se reparten.", {}]],
  'diferencia-esquina': [['slide', "Arrastra el lado de la esquina que se quita.", {}]],
  'suma-producto': [['slide', "Arrastra las dos fichas por la recta: arriba se ven su suma y su producto.", {}]],
  'agrupa-terminos': [['drag', "Arrastra los términos de a dos a cada caja.", {"tile": "x³", "slot": "caja"}]],
  'plano-complejo': [['drag', "Arrastra el punto: el ancho es la parte real y el alto la imaginaria.", {"tile": "•", "slot": "plano"}]],
  'vueltas-i': [['turn', "Gira la flecha: cada cuarto de vuelta es multiplicar por i.", {}]],
  'suma-complejos': [['drag', "Arrastra la punta de la segunda flecha: sale de la punta de la primera.", {"tile": "z₂", "slot": "estrella"}]],
  'conjugado-espejo': [['drag', "Arrastra el punto al reflejo de z en el eje real.", {"tile": "z̄", "slot": "reflejo"}]],
  'modulo-circulo': [['slide', "Arrastra el borde del círculo hasta que pase por el punto.", {}]],
  'despeja-x': [['drag', "Arrastra una tarjeta a la ecuación: se aplica a los dos lados.", {"tile": "−5", "slot": "ecuación"}]],
  'encuentro-caminantes': [['slide', "Arrastra el reloj: los dos caminantes avanzan.", {}]],
  'consecutivos': [['slide', "Arrastra el primer número: los demás lo siguen.", {}]],
  'sin-o-infinitas': [['slide', "Arrastra d y mira las dos rectas.", {}]],
  'perimetro-x': [['slide', "Arrastra el ancho del rectángulo.", {}]],
  'simetria-parabola': [['slide', "Arrastra la recta de simetría.", {}]],
  'abertura-a': [['slide', "Arrastra a: la parábola se abre, se cierra o se voltea.", {}]],
  'forma-canonica': [['slide', "Arrastra h y k hasta que la parábola de trazos se monte encima.", {}]],
  'ingreso-maximo': [['slide', 'Arrastra el precio y mira el punto en la gráfica del ingreso.', {}]],
  'producto-cero': [['slide', "Arrastra las dos marcas: busca dónde se anula algún factor.", {}]],
  'discriminante-traslada': [['slide', "Arrastra c: la parábola sube o baja.", {}]],
  'raices-simetricas': [['slide', "Arrastra la distancia: las dos marcas se abren desde el eje.", {}]],
  'area-ecuacion': [['slide', "Arrastra x: el terreno cambia y se ve su área.", {}]],
  'bolsas-residuo': [['slide', "Arrastra cuántas bolsas llenar: lo que queda suelto es el residuo.", {}]],
  'grado-cociente': [['slide', "Arrastra el grado del cociente hasta igualar la torre de P.", {}]],
  'lado-faltante': [['slide', "Arrastra el otro lado del rectángulo: lo que no cabe es el residuo.", {}]],
  'completa-identidad': [['slide', "Arrastra el residuo hasta que la igualdad se cumpla.", {}]],
  'iguala-coeficientes': [['slide', "Arrastra a y b y compara coeficiente por coeficiente.", {}]],
  'signo-divisor': [['slide', "Arrastra c: la altura de la gráfica en c es el residuo.", {}]],
  'llena-sintetica': [['drag', "Arrastra fichas a la fila de abajo de la tabla.", {"tile": "−1", "slot": "casilla"}]],
  'factor-k': [['slide', "Arrastra k hasta que el residuo P(c) sea cero.", {}]],
  'arma-factores': [['drag', "Arrastra a cada casilla el número que anula ese factor.", {"tile": "3", "slot": "(x − □)"}]],
  'tramo-signo': [['slide', "Arrastra la ficha de prueba por los tramos de la recta.", {}]],
  'multiplicidad': [['slide', "Arrastra el exponente de cada cero: la curva cruza o rebota.", {}]],
  'prueba-candidatos': [['drag', "Arrastra un candidato al probador; si da 0, llévalo a los ceros.", {"tile": "2", "slot": "probador"}]],
  'arma-ceros': [['drag', "Arrastra fichas de cero a la recta; una sobre otra es un cero repetido.", {"tile": "cero", "slot": "recta"}]],
  'factoriza-cubica': [['slide', "Arrastra c buscando un cero del polinomio.", {}]],
  'prohibidos': [['drag', "Arrastra cruces a la recta, a los valores que anulan el denominador.", {"tile": "✕", "slot": "recta"}]],
  'evalua-racional': [['slide', "Arrastra x y mira el numerador y el denominador.", {}]],
  'cerca-asintota': [['slide', "Arrastra la distancia al valor prohibido: la fracción se dispara.", {}]],
  'denominador-comun': [['drag', "Arrastra a la caja los factores del común denominador.", {"tile": "x", "slot": "caja"}]],
  'amplifica-fraccion': [['drag', "Arrastra a cada fracción el factor que le falta.", {"tile": "x", "slot": "fracción"}]],
  'resta-fracciones': [['drag', "Arrastra el signo menos sobre cada término.", {"tile": "−", "slot": "término"}]],
  'voltea-divide': [['drag', "Arrastra la segunda fracción al volteador y luego junto a la primera.", {"tile": "a/b", "slot": "volteador"}]],
  'multiplica-cancela': [['drag', "Arrastra un factor de arriba sobre uno igual de abajo.", {"tile": "x", "slot": "x"}]],
  'dos-rectas': [['drag', "Arrastra el punto hasta el cruce de las dos rectas.", {"tile": "•", "slot": "cruce"}]],
  'elimina-variable': [['slide', "Arrastra k hasta que la barra de y desaparezca.", {}]],
  'dos-compras': [['slide', "Arrastra los dos precios hasta que cuadren los dos recibos.", {}]],
  'corte-parabola-recta': [['slide', "Arrastra la recta arriba o abajo hasta el corte marcado.", {}]],
  'circulo-recta': [['slide', "Arrastra la recta y mira cuántas veces corta el círculo.", {}]],
  'rectangulo-pa': [['drag', "Arrastra la esquina del rectángulo: perímetro y área a la vez.", {"tile": "•", "slot": "esquina"}]],
  'parciales-tapar': [['slide', "Arrastra A y B hasta que las barras lleguen a su meta.", {}]],
  'tapa-evalua': [['drag', "Arrastra la tapa a un factor y lleva el número a su casilla.", {"tile": "tapa", "slot": "factor"}]],
  'ajusta-exponencial': [['slide', "Arrastra a y b hasta que la curva pase por los dos puntos.", {}]],
  'mueve-asintota': [['drag', "Arrastra el punto ancla: la curva y su asíntota lo siguen.", {"tile": "•", "slot": "lugar"}]],
  'mitad-espejo': [['slide', "Arrastra x hasta la altura pedida.", {}]],
  'hacia-e': [['slide', "Arrastra n, el número de pagos al año.", {}]],
  'exponente-buscado': [['slide', "Arrastra el exponente: cuántas veces se multiplica por la base.", {}]],
  'entre-potencias10': [['drag', "Arrastra el número a su tramo entre potencias de 10.", {"tile": "N", "slot": "tramo"}]],
  'expande-log': [['drag', "Arrastra a cada término el número que lo multiplica.", {"tile": "2", "slot": "□·log x"}]],
  'cabe-barra': [['slide', "Arrastra cuántas barras de abajo caben en la de arriba.", {}]],
  'baja-con-log': [['drag', "Arrastra operaciones a la ecuación hasta dejar la x sola.", {"tile": "log", "slot": "ecuación"}]],
  'media-vida': [['slide', "Arrastra el tiempo por la curva de decaimiento.", {}]],
  'sube-al-exponente': [['slide', "Arrastra x hasta que el logaritmo llegue a la altura pedida.", {}]],
  'cambio-u': [['drag', "Arrastra banderas a los ceros de u que sirven.", {"tile": "bandera", "slot": "eje u"}]],
  'tasa-unitaria': [['slide', "Arrastra el precio de una unidad hasta llenar la barra del paquete.", {}]],
  'tabla-compuesta': [['slide', "Arrastra cuánto rinde cada casilla.", {}]],
  'estira-todo': [['slide', "Estira la barra del total hasta que la marca caiga en la parte.", {}]],
  'oferta-lleve': [['slide', "Arrastra el descuento hasta cubrir lo que no se paga.", {}]],
  'puntos-o-porciento': [['slide', "Arrastra el cambio relativo, medido sobre el valor de antes.", {}]],
  'ubica-potencias': [['drag', "Arrastra cada potencia a su valor en la recta.", {"tile": "2⁵", "slot": "recta"}]],
  'reparte-exponente': [['slide', "Arrastra el exponente de cada factor.", {}]],
  'lado-cubo': [['slide', "Arrastra el lado del cubo hasta el volumen pedido.", {}]],
  'indice-radical': [['slide', "Arrastra el índice y el radicando.", {}]],
  'arregla-termino': [['slide', "Arrastra una barra arriba o abajo.", {}]],
  'suma-impares': [['slide', "Arrastra cuántas escuadras de impares pones.", {}]],
  'zigzag-razon': [['slide', "Arrastra la razón de la progresión.", {}]],
  'periodico-serie': [['slide', "Arrastra numerador y denominador.", {}]],
  'producto-telescopico': [['slide', "Arrastra el límite de arriba del producto.", {}]],
  'monomio-area': [['slide', "Arrastra el número y el exponente del área.", {}]],
  'cubo-del-binomio': [['slide', "Arrastra los tres coeficientes.", {}]],
  'elige-comite': [['slide', "Arrastra cuántas personas tiene el comité.", {}]],
  'parte-medio': [['slide', "Arrastra m y n hasta cumplir suma y producto.", {}]],
  'cuadrado-complejo': [['drag', "Arrastra z por el plano.", {"tile": "z", "slot": "plano"}]],
  'edades-barras': [['slide', "Arrastra la edad del hijo.", {}]],
  'tres-puntos': [['slide', "Arrastra a, b y c hasta pasar por los puntos.", {}]],
  'vieta-raices': [['slide', "Arrastra las dos raíces por el eje.", {}]],
  'reparte-terminos': [['drag', "Arrastra a cada casilla el cociente de su término.", {"tile": "3x²", "slot": "casilla"}]],
  'divisor-fraccion': [['slide', "Arrastra c hasta que el divisor valga cero.", {}]],
  'ceros-fraccion': [['drag', "Arrastra banderas a los ceros.", {"tile": "bandera", "slot": "eje"}]],
  'signo-afuera': [['drag', "Arrastra el −1 sobre un factor para escribirlo al revés.", {"tile": "−1", "slot": "factor"}]],
  'fraccion-compuesta': [['drag', "Arrastra el multiplicador sobre la fracción.", {"tile": "2x", "slot": "fracción"}]],
  'escalera-sistema': [['slide', "Arrastra x, y y z hasta encender las tres.", {}]],
  'parciales-repetido': [['slide', "Arrastra A y B hasta que las barras lleguen.", {}]],
  'cruce-potencias': [['drag', "Arrastra banderas a los cruces.", {"tile": "bandera", "slot": "cruce"}]],
  'regla-del-72': [['slide', "Arrastra los años hasta el primero que cumple.", {}]],
  'escala-sonido': [['slide', "Arrastra el sonido por la escala de decibeles.", {}]],
  'dos-ciudades': [['slide', "Arrastra los años hasta el primero que cumple.", {}]],
  'factor-area': [['slide', "Arrastra el factor k que multiplica las longitudes.", {}]],
  'tales-rectas': [['drag', "Arrastra B' hasta que BB' quede paralela a AA'.", {"tile": "B'", "slot": "recta"}]],
  'corta-paralelogramo': [['slide', "Arrastra la base hasta el área pedida.", {}]],
  'mide-circulo': [['drag', "Arrastra el borde del círculo hasta la medida pedida.", {"tile": "r", "slot": "borde"}]],
  'trapecio-promedio': [['drag', "Arrastra el ancho del rectángulo hasta igualar el área.", {"tile": "ancho", "slot": "trapecio"}]],
  'triangulo-cuadricula': [['drag', "Arrastra el vértice por la cuadrícula hasta el área pedida.", {"tile": "•", "slot": "punto"}]],
  'poligono-cuadricula': [['drag', "Arrastra el vértice suelto por la cuadrícula.", {"tile": "•", "slot": "punto"}]],
  'sombreado-resta': [['drag', "Arrastra el borde de la figura de adentro.", {"tile": "borde", "slot": "cuadrado"}]],
  'prisma-capas': [['slide', "Arrastra la altura: cada capa es una copia de la base.", {}]],
  'cono-tercio': [['slide', "Arrastra la altura del cono hasta el volumen pedido.", {}]],
  'desarrollo-caja': [['slide', "Arrastra la altura de la caja hasta la superficie pedida.", {}]],
  'fila-pistas': [['drag', "Arrastra cada nombre a su puesto; las pistas se marcan al cumplirse.", {"tile": "Ana", "slot": "puesto"}]],
  'edificio-pisos': [['drag', "Arrastra cada nombre a su piso; las pistas se marcan al cumplirse.", {"tile": "Ana", "slot": "piso"}]],
  'carrera-llegada': [['drag', "Arrastra cada corredor a su puesto de llegada.", {"tile": "Ana", "slot": "puesto"}]],
  'dias-semana': [['drag', "Arrastra cada actividad a su día de la semana.", {"tile": "Arte", "slot": "día"}]],
  'mesa-redonda': [['drag', "Arrastra cada nombre a una silla; la primera persona ya está sentada.", {"tile": "Ana", "slot": "silla"}]],
  'collar-cuentas': [['drag', "Arrastra cada cuenta a un hueco del collar.", {"tile": "roja", "slot": "hueco"}]],
  'brujula-casas': [['drag', "Arrastra cada nombre a su casa alrededor de la plaza.", {"tile": "Ana", "slot": "casa"}]],
  'descarta-casos': [['drag', "Arrastra una pista sobre la tarjeta que la incumple para tacharla.", {"tile": "pista", "slot": "tarjeta"}]],
  'gira-mesa': [['turn', "Arrastra alrededor de la mesa de la derecha para girarla.", {}]],
  'ronda-saltos': [['drag', "Arrastra la corona hasta la persona que se queda.", {"tile": "corona", "slot": "persona"}]],
  'tabla-cruces': [['drag', "Arrastra las fichas ✓ a la tabla: una por fila y columna.", {"tile": "✓", "slot": "casilla"}]],
  'casilleros': [['drag', "Arrastra cada cosa al casillero de su dueño.", {"tile": "balón", "slot": "casillero"}]],
  'tres-listas': [['drag', "Arrastra colores y mascotas a las casillas de cada persona.", {"tile": "rojo", "slot": "casilla"}]],
  'comite-reglas': [['drag', "Arrastra personas al comité y de vuelta; las reglas se marcan.", {"tile": "F", "slot": "comité"}]],
  'tiene-podria': [['drag', "Prueba casos arriba y arrastra cada afirmación a su zona.", {"tile": "O va", "slot": "zona"}]],
  'trabajo-conjunto': [['slide', "Arrastra las horas que trabajan juntos hasta llenar el tanque.", {}]],
  'velocidad-media': [['slide', "Arrastra la velocidad constante que hace el viaje en el mismo tiempo.", {}]],
  'persecucion': [['slide', "Arrastra el tiempo hasta que los dos carros coincidan.", {}]],
  'arbol-opciones': [['slide', "Arrastra cuántas ramas tiene el nivel que falta.", {}]],
  'placas-codigo': [['drag', "Arrastra a cada casilla cuántas opciones tiene.", {"tile": "26", "slot": "casilla"}]],
  'anagramas': [['drag', "Arrastra al denominador un k! por cada letra repetida.", {"tile": "2!", "slot": "abajo"}]],
  'saludos': [['drag', "Arrastra de una persona a otra para trazar su saludo.", {"tile": "A", "slot": "B"}]],
  'diagonales': [['drag', "Arrastra de un vértice a otro no vecino para trazar la diagonal.", {"tile": "•", "slot": "vértice"}]],
  'cuenta-triangulos': [['drag', "Arrastra sobre la base de una recta a otra para marcar un triángulo.", {"tile": "•", "slot": "base"}]],
  'cuenta-cuadrados': [['slide', "Arrastra cuántos cuadrados hay de cada tamaño.", {}]],
  'complemento-conteo': [['drag', "Arrastra fichas: arriba todos los casos, abajo los que no sirven.", {"tile": "10", "slot": "casilla"}]],
  'suma-casos': [['drag', "Arrastra + o × al hueco entre los dos grupos.", {"tile": "+", "slot": "hueco"}]],
  'ruta-cuadras': [['trace', "Arrastra el dedo por las calles de A hasta B.", {}]],
  'brujula-pasos': [['drag', "Arrastra la ficha a la esquina donde termina el recorrido.", {"tile": "•", "slot": "esquina"}]],
  'punto-distancia': [['drag', "Arrastra la casa a la esquina que cumple las dos distancias.", {"tile": "casa", "slot": "esquina"}]],
  'torres-vistas': [['slide', "Arrastra cada casilla hacia arriba o abajo para cambiar su altura.", {}]],
  'cubos-ocultos': [['slide', "Arrastra el total de cubos, contando los escondidos.", {}]],
  'cubo-pintado': [['slide', "Arrastra cuántos cubitos tienen 3, 2, 1 y ninguna cara pintada.", {}]],
  'arma-desarrollo': [['drag', "Arrastra cuadrados a la cuadrícula hasta que el cubo cierre.", {"tile": "+", "slot": "casilla"}]],
  'caras-opuestas': [['drag', "Arrastra a cada hueco la letra que queda en la cara opuesta.", {"tile": "A", "slot": "hueco"}]],
  'dado-siete': [['drag', "Arrastra los números a las caras escondidas del dado.", {"tile": "6", "slot": "cara"}]],
  'espejo-figura': [['paint', "Pinta arrastrando las casillas del reflejo.", {}]],
  'gira-figura': [['turn', "Arrastra alrededor de la figura para girarla.", {}]],
  'dobla-papel': [['slide', "Arrastra cuántos agujeros habrá al abrir la hoja.", {}]],
  'reloj-espejo': [['turn', "Arrastra el minutero hasta la hora real.", {}]],
  'espejo-palabra': [['drag', "Arrastra las letras en el orden en que se ven en el espejo.", {"tile": "S", "slot": "casilla"}]],
  'diferencias-escalera': [['drag', "Arrastra la barra que falta; abajo se ven las diferencias.", {}]],
  'fibonacci-suma': [['drag', "Arrastra la barra que falta hasta que cada suma se cumpla.", {}]],
  'alterna-dos': [['drag', "Arrastra la barra que sigue; cada color es una sucesión.", {}]],
  'letras-salto': [['drag', "Arrastra la barra: su altura es la posición de la letra.", {}]],
  'figura-patron': [['drag', "Arrastra la figura que falta para darle sus puntos.", {}]],
  'ciclo-reloj': [['turn', "Gira la flecha de la rueda hasta el día pedido.", {}]],
  'ciclo-colores': [['drag', "Arrastra una cuenta de la bandeja al hueco de la posición pedida.", {}]],
  'ultima-cifra': [['slide', "Desliza el marcador hasta la cifra en que termina la potencia.", {}]],
  'clave-simbolos': [['drag', "Arrastra fichas de la bandeja a las casillas para cifrar o descifrar.", {}]],
  'permuta-codigo': [['drag', "Arrastra las letras a las casillas en el orden del código.", {}]],
  'rueda-cesar': [['turn', "Gira el anillo de adentro hasta que la pista se cumpla.", {}]],
  'altura-letras': [['drag', "Sube cada columna hasta la altura de su letra.", {}]],
  'binario-luces': [['tap', "Toca los bombillos para prenderlos o apagarlos.", {}]],
  'cuadro-polibio': [['tap', "Toca las letras del cuadro en orden.", {}]],
  'maquina-regla': [['drag', "Arrastra una regla a la máquina y desliza su número.", {}]],
  'lee-barras': [['slide', "Desliza el marcador hasta la respuesta que da la gráfica.", {}]],
  'arma-barras': [['drag', "Sube cada barra hasta el dato de la tabla.", {}]],
  'mayor-subida': [['drag', "Arrastra la lupa al tramo que pide la pregunta.", {}]],
  'variacion-barras': [['slide', "Desliza el porcentaje hasta que la barra fantasma iguale a la nueva.", {}]],
  'nivela-datos': [['drag', "Arrastra la línea hasta que sobre lo mismo que falta.", {}]],
  'ordena-mediana': [['drag', "Arrastra los valores a las casillas de menor a mayor.", {}]],
  'tres-centros': [['drag', "Arrastra cada alfiler a su lugar en la recta.", {}]],
  'dato-faltante': [['drag', "Sube la barra que falta hasta que el promedio dé justo.", {}]],
  'balanza-promedio': [['drag', "Arrastra el apoyo hasta que la regla quede quieta.", {}]],
  'muestra-sesgo': [['drag', "Arrastra el marco hasta que la muestra se parezca al pueblo.", {}]],
  'eje-engano': [['slide', "Baja el piso del eje y desliza el porcentaje.", {}]],
  'tabla-doble': [['drag', "Arrastra la parte pintada de cada barra hasta su porcentaje.", {}]],
  'circuito-logico': [['tap', "Toca los interruptores hasta que el bombillo quede como se pide.", {}]],
  'tabla-verdad': [['tap', "Toca cada casilla de la columna para ponerle V o F.", {}]],
  'rompe-promesa': [['tap', "Toca los casos en que la frase es falsa (o verdad).", {}]],
  'adivina-conectivo': [['drag', "Arrastra un conectivo a la casilla hasta que la columna coincida.", {}]],
  'arma-negacion': [['drag', "Arrastra las fichas a las casillas para escribir la frase.", {}]],
  'contraejemplo': [['tap', "Toca la ficha que tumba la frase.", {}]],
  'niega-todos': [['tap', "Toca las luces para volver falsa la frase con lo mínimo.", {}]],
  'flecha-deduce': [['tap', "Toca el foco sin dato: sí, no o no se sabe.", {}]],
  'arma-silogismo': [['drag', "Arrastra los círculos hasta cumplir todas las premisas.", {}]],
  'quien-miente': [['tap', "Toca a cada personaje para suponer si dice la verdad o miente.", {}]],
  'maquina-operador': [['slide', "Desliza los números de las bocas hasta lograr el resultado.", {}]],
  'cruce-tabla': [['tap', "Toca la casilla del cruce: fila del primero, columna del segundo.", {}]],
  'neutro-buscador': [['slide', "Desliza e hasta que no cambie a ningún número.", {}]],
  'adivina-operador': [['drag', "Arrastra una regla a la casilla hasta que sirva para todos los ejemplos.", {}]],
  'anida-operador': [['tap', "Toca la caja de adentro para calcularla; luego la de afuera.", {}]],
  'busca-x-operador': [['slide', "Desliza x hasta que la balanza quede pareja.", {}]],
  'corta-lo-que-queda': [['drag', "Arrastra el corte de cada fila hasta las partes que se gastan.", {}]],
  'area-queda': [['drag', "Arrastra las dos agarraderas para dejar pintado lo que queda.", {}]],
  'total-original': [['slide', "Desliza el total hasta que quede lo que se sabe.", {}]],
  'nota-ponderada': [['drag', "Sube la barra de la nota que falta hasta la meta.", {}]],
  'cripto-letras': [['drag', "Arrastra cada rueda arriba o abajo para cambiar la cifra.", {}]],
  'tablero-cifras': [['tap', "Toca un número para ponerlo a prueba.", {}]],
  'peor-caso-bolsa': [['slide', "Desliza cuántas bolas sacar; el juego saca con la peor suerte.", {}]],
  'rectangulo-max': [['drag', "Arrastra la esquina del rectángulo.", {}]],
  'reparto-extremo': [['drag', "Sube o baja la columna de cada niño.", {}]],
  'cinta-ecuacion': [['slide', "Desliza x hasta que la cinta llegue justo al total.", {}]],
  'mezcla-precio': [['slide', "Desliza cuántos kilos van del primero hasta el precio pedido.", {}]],
  'alcancia-monedas': [['drag', "Arrastra la divisoria entre las monedas de cada valor.", {}]],
  'intervalo-solucion': [['drag', "Arrastra la frontera, toca el punto y toca el lado de las soluciones.", {}]],
  'encuesta-tres': [['drag', "Arrastra arriba o abajo sobre cada zona para cambiar su número.", {}]],
  'solapa-barras': [['drag', "Arrastra la barra de abajo hasta que cuadren los de ninguno.", {}]],
  'criba-primos': [['tap', "Toca un número libre para tachar todos sus múltiplos.", {}]],
  'arbol-factores': [['drag', "Arrastra un primo sobre una hoja que divida.", {}]],
  'tabla-divisores': [['drag', "Arrastra las agarraderas de filas y columnas de la tabla.", {}]],
  'cifra-faltante': [['drag', "Arrastra la rueda de la cifra arriba o abajo.", {}]],
  'ritmos-mcm': [['drag', "Arrastra el marcador por la línea de tiempo.", {}]],
  'corta-mcd': [['slide', "Desliza el tamaño de la baldosa.", {}]],
  'pares-primos': [['tap', "Toca una ficha de arriba y luego su pareja de abajo.", {}]],
  'tabla-dados': [['tap', "Toca las casillas donde pasa el suceso.", {}]],
  'urna-fraccion': [['drag', "Arrastra bolas a la urna o sácalas de ella.", {}]],
  'ruleta-sectores': [['tap', "Toca los sectores para pintarlos o despintarlos.", {}]],
  'arbol-caminos': [['tap', "Toca las hojas de los caminos que sirven.", {}]],
  'area-probabilidad': [['drag', "Arrastra el borde del lado que falta.", {}]],
  'lazo-conjunto': [['trace', 'Rodea con el dedo los elementos que pertenecen (o tócalos) y entran al conjunto.', { labels: ['pera', 'uva', 'mango'], trap: 'papa' }], ['tap', 'Cuando adentro estén justo los que cumplen la condición, toca «Listo».', { items: ['pera', 'papa', 'Listo'], pick: [0, 2] }]],
  'cubo-partes': [['tap', 'Arma un subconjunto con los interruptores y toca «Encender». Enciéndelos todos sin repetir.', { items: ['x', 'y', 'Encender'], pick: [0, 2] }]],
  'orbita-conjuntos': [['tap', 'Marca todos los conjuntos que cumplen la relación con A y toca «Listo».', { items: ['{a}', '{a, e}', 'Listo'], pick: [0, 2] }]],
  'descifra-zona': [['slide', 'Desliza cada rueda hasta que el color coincida con la zona rayada y toca «Listo».', { label: 'operación' }]],
  'fabrica-subconjuntos': [['tap', 'En cada caja toca los elementos para encenderlos o apagarlos: todas deben ser distintas.', { items: ['a', 'b', 'c'], pick: [0, 2] }]],
  'fila-a-fila': [['tap', 'Toca la fila que cambia (y la otra, si hace falta) y elige la operación.', { items: ['F1', 'F2', 'F3'], pick: [1, 0] }], ['step', 'Elige k con las perillas y aplica. Se puede deshacer.', { from: 1, to: 2, label: 'k' }]],
  'flecha-vector': [['drag', 'Arrastra la punta de la flecha sobre la cuadrícula para construir el vector.', { dot: true }]],
  'flor-de-raices': [['turn', 'Gira la flor arrastrando un pétalo y elige el radio con − / +.', {}]],
  'frena-aguja': [['slide', 'Arrastra el punto sobre la recta: el cuadrado crece con él y muestra su área.', {}], ['tap', 'Ajusta con − / + y toca «¡Listo!» cuando el área sea la pedida.', { items: ['−', '+', '¡Listo!'], pick: [1, 2] }]],
  'fuga-de-familia': [['tap', 'Mete dos fichas en la máquina, en orden, para que el resultado se escape de la casa.', { items: ['3', '8', '5'], pick: [0, 1] }]],
  'grafica-relacion': [['slide', 'Arrastra cada punto en vertical hasta que la relación sea la pedida.', { vert: true }]],
  'inversos-gemelos': [['step', 'Arma el gemelo con el signo y las ruedas − / +; la máquina muestra el resultado.', { from: 2, to: 3, label: 'numerador' }]],
  'jefe-venn': [['tap', 'Toca los elementos del conjunto que ordena el Guardián y luego ataca.', { items: ['1', '2', '3', '4'], pick: [1, 2] }], ['drag', 'En otras fases, arrastra elementos de una zona a otra del diagrama.', { tile: '5', slot: 'zona A ∩ B' }]],
  'la-obra': [['drag', 'Arrastra obreros de la banca a la obra (o usa ±): el calendario cuenta los días.', { tile: 'obrero', slot: 'la obra' }]],
  'laberinto-valor': [['trace', 'Traza el camino de la entrada a la salida pisando solo casillas que cumplen la regla.', { labels: ['2', '4', '6'], trap: '5' }]],
  'lado-del-cuadrado': [['drag', 'Arrastra la esquina del cuadrado: el área se calcula sola; − y + ajustan fino.', { dot: true }]],
  'laser-recta': [['step', 'Con las perillas «sube», «avanza» y el corte, alinea el láser con los dos cristales.', { from: 1, to: 2, label: 'sube' }]],
  'limite-serie': [['tap', 'Toca «+ término» para sumar saltos cada vez más cortos.', { items: ['+ término'], pick: [0, 0] }], ['slide', 'Arrastra el marcador al valor al que se acerca la suma.', {}]],
  'limonada': [['slide', 'Desliza cada ingrediente y compara la razón y el color de las dos jarras.', { label: 'limón' }]],
  'lluvia-elementos': [['slide', 'Arrastra la canasta de lado a lado: atrapa lo que pertenece y esquiva lo que no.', { label: 'canasta' }]],
  'luciernagas-venn': [['tap', 'Toca una luciérnaga cuando esté en la zona de la operación pedida.', { items: ['✦', '✦', '✦'], pick: [1] }]],
  'lupa-densidad': [['tap', 'Amplía con la lupa (+) hasta ver espacio entre las dos banderitas.', { items: ['−', '+'], pick: [1, 1] }], ['slide', 'Suelta el punto estrictamente entre las dos.', {}]],
  'mapa-tesoro': [['turn', 'Gira la brújula para dar el rumbo.', {}], ['step', 'Con − / + elige los pasos exactos; la caminata se ve al comprobar.', { from: 2, to: 3, label: 'pasos' }]],
  'maquina-sigma': [['drag', 'Arrastra de la bandeja la ficha del término que pide la máquina.', { tile: '20', slot: '5k con k = 4' }]],
  'mejor-oferta': [['drag', 'Arrastra el carrito a la vitrina que sale más barata.', { tile: 'carrito', slot: 'vitrina' }]],
  'mezcla': [['tap', 'Toca «+ 10 g» para añadir agua (o «− 10 g»): el medidor muestra el % de alcohol.', { items: ['− 10 g', '+ 10 g'], pick: [1, 1] }]],
  'mide-altura': [['slide', 'Arrastra al topógrafo por el suelo hasta que vea la cima con el ángulo pedido.', {}]],
  'mueve-circulos': [['drag', 'Arrastra el círculo B para dibujar cómo se relaciona con A.', { dot: true }]],
  'mueve-parabola': [['drag', 'Toca o arrastra en la cuadrícula para poner el vértice.', { dot: true }], ['step', 'Con − / + cambia a: la parábola se abre o se cierra.', { from: 1, to: 2, label: 'a' }]],
  'muro-radicales': [['tap', 'Toca ladrillos del montón para ponerlos en fila hasta que mida lo pedido.', { items: ['√3', '√12', '√2'], pick: [0, 1] }]],
  'noria': [['turn', 'Gira la noria arrastrando la cabina dorada hasta un ángulo que cumpla la condición.', {}]],
  'ordena-terminos': [['drag', 'Arrastra las fichas a las cajas en el orden de la expansión.', { tile: '3k', slot: 'primera caja' }]],
  'parejas-gauss': [['tap', 'Toca dos fichas para unirlas con una cuerda: cada pareja debe sumar lo mismo.', { items: ['1', '2', '9', '10'], pick: [0, 3] }]],
  'pares-negativos': [['tap', 'Toca dos factores negativos para emparejarlos: cada pareja da positivo.', { items: ['−2', '−2', '−2'], pick: [0, 1] }], ['tap', 'Al final elige el signo del resultado.', { items: ['+', '−'], pick: [1] }]],
  'parte-baldosa': [['step', 'Parte la baldosa en una cuadrícula más fina con − / +.', { from: 1, to: 2, label: 'cortes por lado' }]],
  'parte-sigma': [['step', 'Cuenta las piezas de cada color y escribe la suma con − / +.', { from: 2, to: 4, label: 'piezas' }]],
  'pasaporte-numeros': [['tap', 'Toca las casillas para sellar todas las familias a las que pertenece el número.', { items: ['ℕ', 'ℤ', 'ℚ'], pick: [1, 2] }]],
  'pesca-raices': [['tap', 'Toca las marcas del muelle donde la ola cruza el agua para lanzar anzuelos.', { items: ['π/6', 'π/2', '5π/6'], pick: [0, 2] }]],
  'pinta-personas': [['tap', 'Toca las personitas para pintarlas hasta tener el porcentaje pedido.', { items: ['☺', '☺', '☺', '☺'], pick: [0, 1] }]],
  'pinta-venn': [['tap', 'Toca una zona del diagrama para pintarla o despintarla.', { items: ['solo A', 'A ∩ B', 'solo B'], pick: [0] }]],
  'piramide-numerica': [['drag', 'Arrastra fichas a los bloques vacíos: cada bloque sale de los dos que lo sostienen.', { tile: '7', slot: 'sobre 3 y 4' }]],
  'pisa-huellas': [['step', 'Fija con − / + dónde cae el primer paso y cuánto avanza cada uno.', { from: 2, to: 3, label: 'avance d' }]],
  'pizzeria': [['step', 'Elige en cuántas porciones cortar la pizza.', { from: 4, to: 7, label: 'porciones' }], ['tap', 'Toca las porciones que llevan ingredientes.', { items: ['◔', '◔', '◔', '◔'], pick: [0, 1, 2] }]],
  'pon-la-rayita': [['tap', 'Toca la primera cifra que se repite y luego la última del bloque: la rayita lo cubre.', { items: ['2', '7', '2', '7'], pick: [0, 1] }]],
  'porcentaje-cambio': [['step', 'Con −10, −1, +1 y +10 fija cuánto cambió, medido sobre el valor de antes.', { from: 9, to: 12, label: '%' }]],
  'proyector-sombras': [['slide', 'Arrastra los corchetes del riel: marcan la sombra de la gráfica sobre cada eje.', {}], ['tap', 'Toca un corchete para cambiarlo entre extremo lleno y vacío.', { items: ['[', '('], pick: [1] }]],
  'raices-imanes': [['slide', 'Desliza los imanes por el eje x hasta las raíces; dos juntos hacen una raíz doble.', {}]],
  'rana-zenon': [['touch', 'Cada toque en el estanque es un salto: mira la suma que lleva el marcador.', { label: 'salto' }], ['tap', 'Toca la bandera donde cae (o a la que se acerca sin llegar nunca).', { items: ['⚑', '⚑', '⚑'], pick: [1] }]],
  'rebota-pelota': [['slide', 'Arrastra cada pelota (o usa − / +) hasta la altura de su rebote.', { vert: true }]],
  'rebote': [['slide', 'Arrastra el «% de subida» hasta volver al precio original.', { label: '%' }]],
  'recta-espejo': [['slide', 'Toca o arrastra sobre la recta para poner el punto; su reflejo sale al otro lado del 0.', {}]],
  'reglas-del-juego': [['drag', 'Arrastra el nombre de cada propiedad sobre la igualdad que la muestra.', { tile: 'conmutativa', slot: 'una igualdad' }]],
  'rellena-medios': [['drag', 'Arrastra las fichas a los huecos entre el primer término y el último.', { tile: '8', slot: 'hueco' }]],
  'reparte-factores': [['step', 'Elige en cuántos grupos iguales repartir los factores y cuántos grupos tomar.', { from: 2, to: 3, label: 'grupos' }]],
  'reparte-venn': [['tap', 'Toca un elemento de la bandeja y luego la zona del diagrama donde va.', { items: ['4', 'solo A', 'A ∩ B'], pick: [0, 2] }]],
  'reparto': [['slide', 'Arrastra los dos separadores: la barra se parte en tres montos.', {}]],
  'resortera-tres': [['fling', 'Arrastra hacia atrás para estirar (se ve el número) y suelta.', { back: true }]],
  'resta-corrida': [['tap', 'Toca las columnas que tienen dos números iguales para tacharlos.', { items: ['6', '18', '54'], pick: [0, 1] }]],
  'revienta-globos': [['tap', 'Toca las burbujas cuyo conjunto cumple la misión de la ronda.', { items: ['{a}', '{a, b}', '∅'], pick: [0] }]],
  'rieles-paralelos': [['turn', 'Gira el riel con su manija (o con ◀ ▶) hasta dejarlo como pide la ronda.', {}]],
  'rompe-cambios': [['slide', 'Mueve la paleta con el dedo; al soltar, la pelota sale hacia arriba.', { label: 'paleta' }]],
  'rueda-angulo': [['turn', 'Gira el lado terminal arrastrando su punta; los botones ajustan de a un paso.', {}]],
  'rueda-porcentaje': [['turn', 'Gira la aguja hasta que el sector cubra justo la parte pedida.', {}]],
  'saca-del-radical': [['tap', 'Toca fichas iguales dentro de la raíz para sacarlas como un solo factor.', { items: ['2', '2', '3'], pick: [0, 1] }]],
  'salta-la-coma': [['tap', 'Con ◀ y ▶ corre el punto un lugar: el exponente de 10 lo compensa.', { items: ['◀', '▶'], pick: [1, 1] }]],
  'salta-signos': [['touch', 'Toca la pantalla para saltar las fichas peligrosas; las demás se atrapan corriendo.', { label: '¡salta!' }]],
  'sellos-graficas': [['tap', 'Toca los sellos en orden: cada uno transforma la gráfica actual. ↶ quita el último.', { items: ['→', '↑', '×2'], pick: [0, 2] }]],
  'semaforo-signos': [['tap', 'Toca cada casilla para poner + o −; la fila del producto se calcula sola.', { items: ['+', '−', '+'], pick: [1] }], ['tap', 'Luego enciende los tramos de la solución y decide los puntos críticos.', { items: ['tramo', 'tramo', 'tramo'], pick: [0, 2] }]],
  'serpiente-orden': [['slide', 'Desliza en la dirección del próximo paso. Come las fichas de menor a mayor.', { label: 'avanza' }]],
  'siembra-raices': [['tap', 'Toca las semillas de la respuesta y luego «Sembrar»: crecen hasta su potencia.', { items: ['−2', '0', '2', 'Sembrar'], pick: [0, 2, 3] }]],
  'sintoniza-onda': [['slide', 'Desliza las manijas de la onda hasta hacerla coincidir con la punteada.', { label: 'amplitud' }]],
  'sirve-la-razon': [['hold', 'Mantén presionado para servir y suelta cuando la cantidad mantenga la razón.', {}]],
  'sombra-arbol': [['slide', 'Ajusta la altura del árbol hasta que el rayo caiga justo en la banderita.', { vert: true }]],
  'sombra-equivalente': [['tap', 'Toca una operación: se aplica a los dos lados. El signo de la desigualdad también se toca.', { items: ['− 3', '÷ (−2)', '<'], pick: [0, 1, 2] }]],
  'suma-filas': [['slide', 'Arrastra la manija para desplegar más filas y compara la suma.', { vert: true }]],
  'tabla-conjugado': [['tap', 'Elige por cuál multiplicar: el juego arma la tabla y muestra qué se cancela. Prueba varias.', { items: ['√3 + 1', '√3 − 1'], pick: [0, 1] }]],
  'tacha-repetidos': [['tap', 'Toca las letras que sobran para tacharlas: cada una debe quedar una sola vez.', { items: ['O', 'S', 'O'], pick: [2] }]],
  'tanque-pitagorico': [['slide', 'Ajusta la perilla (arrastre o − / +) hasta que el líquido llegue justo a la marca.', { vert: true }]],
  'telarana-polar': [['drag', 'Arrastra la araña al nudo del resultado: el módulo en el hilo, el ángulo en el rayo.', { dot: true }]],
  'tirolesa': [['step', 'Suelta o recoge cable con los botones hasta que quede tenso entre las torres.', { from: 4, to: 5, label: 'cable' }]],
  'torre-pisos': [['slide', 'Arrastra el ascensor hasta el piso, contando desde la planta baja.', { vert: true }], ['tap', 'Cuando estés en el piso, toca «Entregar».', { items: ['Entregar'], pick: [0] }]],
  'torre-producto': [['slide', 'Sube la manija para construir la torre. Cada piso aplica una multiplicación.', { vert: true }]],
  'tragamonedas': [['step', 'Toca arriba o abajo de cada rodillo para armar el factor.', { from: 2, to: 3, label: 'décimas' }]],
  'traza-progresion': [['trace', 'Traza el camino pasando por los términos en orden; puedes levantar el dedo y pensar.', { labels: ['4', '7', '10'], trap: '9' }]],
  'tren-ordenado': [['drag', 'Arrastra cada vagón a su lugar: de menor a mayor, de izquierda a derecha.', { tile: '−2', slot: 'primer vagón' }]],
  'tuberia-maquinas': [['tap', 'Toca una máquina para meterla en el primer tubo libre; tocar un tubo lo vacía.', { items: ['x + 3', 'x²', '√x'], pick: [1, 0] }]],
  'ubica-en-recta': [['drag', 'Suelta cada número sobre la recta, en su lugar.', { tile: '½', slot: 'entre 0 y 1' }]],
  'une-factor': [['drag', 'Arrastra desde cada cambio hasta su factor para tender la cuerda.', { cord: true, tile: '+25 %', slot: '× 1.25', other: '× 0.75' }]],
  'une-parejas': [['drag', 'Arrastra desde una etiqueta de la izquierda hasta su pareja.', { cord: true, tile: 'A', slot: 'su pareja', other: 'otra' }]],
  'verdadero-falso': [['swipe', 'Desliza la tarjeta: a la derecha si es verdadera, a la izquierda si es falsa.', { left: 'falso', right: 'verdadero' }]],
  'voltea-desigualdad': [['tap', 'Después de cada operación elige «<» o «>» para el nuevo orden de los puntos.', { items: ['<', '>'], pick: [1] }]],
  'vuela-precios': [['slide', 'Arrastra el planeador hasta la altura del resultado y suelta para volar.', { vert: true }]],
  // Juegos en movimiento por preguntas (spec 2026-11-20-preuda-movimiento, kit js/games/mueve-kit.js).
  'barco-muelle': [['drag', 'Arrastra el barco entre las boyas hasta el muelle de la respuesta.', { tile: 'barco', slot: 'muelle' }]],
  'aro-lanza': [['fling', 'Desliza desde el aro hacia la estaca: el punteado muestra dónde cae. Suelta para lanzar.', {}]],
  'canica-tablero': [['slide', 'Sube o baja un lado del tablero: la canica rueda. Suelta sobre el hueco de la respuesta.', { label: 'inclinación' }]],
  'tren-aguja': [['turn', 'Gira la aguja del cambio hacia el ramal de la respuesta.', {}], ['drag', 'Luego empuja el tren con el dedo por la vía hasta la estación.', { tile: 'tren', slot: 'estación' }]],
  'grua-carga': [['slide', 'Arrastra el carro de la grúa sobre el camión de la respuesta y suelta: la caja baja sola.', { label: 'carro' }]],
  'rueda-cabinas': [['turn', 'Gira la rueda con el dedo hasta dejar en el andén la cabina de la respuesta y suelta.', {}]],
};

// Los ejercicios que no son juegos también tienen su ejemplo.
const GUIDE_TYPES = {
  mc: [['tap', 'Lee las opciones y toca la que creas correcta. Puedes cambiarla antes de comprobar.', { items: ['A', 'B', 'C'], pick: [1] }]],
  input: [['keys', 'Escribe tu respuesta con el teclado: valen decimales y fracciones como 3/4.', { text: '3/4' }]],
  order: [['tap', 'Toca las fichas en el orden correcto; tocar una que ya pusiste la devuelve.', { items: ['2.º', '1.º', '3.º'], pick: [1, 0, 2] }]],
  slider: [['slide', 'Mueve el deslizador y mira cómo cambia el dibujo hasta que cumpla lo pedido.', { label: 'valor' }]],
};

for (const [id, game] of Object.entries(typeof GAMES === 'undefined' ? {} : GAMES)) {
  if (game.algebraScene) GUIDES[id] = [['drag', game.instruction + '.', {}]];
}

const guideKey = ex => (ex?.type === 'play' ? ex.game : ex?.type);
const practiceGuideLines = ex => (ex?.type === 'play' ? GUIDES[ex.game] : GUIDE_TYPES[ex?.type])?.map(([, text]) => text) ?? [];

function guideSteps(ex) {
  if (!ex) return [];
  const check = txt => ['check', txt, {}];
  if (ex.type !== 'play') return GUIDE_TYPES[ex.type] ? [...GUIDE_TYPES[ex.type], check('Cuando estés seguro, toca «Comprobar».')] : [];
  const core = GUIDES[ex.game];
  if (!core) return [];
  const arcade = GUIDE_ARCADE.has(ex.game), n = Array.isArray(ex.params?.rounds) ? ex.params.rounds.length : 0;
  return [
    ...(arcade ? [['start', 'Toca el cartel para empezar la ronda.', {}]] : []),
    ...core,
    ...(!arcade && n > 1 ? [['rounds', `Son ${n} rondas: pasa de una a otra con las pestañas de arriba.`, { n }]] : []),
    ...(arcade ? [['lives', 'Tienes tres vidas por ronda. Si se acaban, la ronda empieza otra vez: no pierdes el ejercicio.', {}]] : []),
    check(arcade ? 'Al terminar todas las rondas, toca «Comprobar».' : 'Cuando quede como quieres, toca «Comprobar».'),
  ];
}

// Dibuja un cuadro de una escena en un lienzo 2D (t de 0 a 1).
function drawGuideScene(ctx, scene, t, opts, w, h, C = PALETTE) {
  const k = Math.min(w / GUIDE_W, h / GUIDE_H);
  ctx.save();
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = C.bg; ctx.fillRect(0, 0, w, h);
  ctx.translate((w - GUIDE_W * k) / 2, (h - GUIDE_H * k) / 2); ctx.scale(k, k);
  (GUIDE_SCENES[scene] || GUIDE_SCENES.tap)(ctx, C, t, opts || {});
  ctx.restore();
}

const GUIDE_ICON = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 11V5.5a1.5 1.5 0 0 1 3 0V11m0-1.5a1.5 1.5 0 0 1 3 0V11m0-.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-.6a6 6 0 0 1-4.6-2.2L4 15.2a1.5 1.5 0 0 1 2.2-2L9 15"/></svg>';

function guideButton(ex) {
  return guideSteps(ex).length ? `<button type="button" class="hint-btn guide-btn">${GUIDE_ICON}<span>Cómo se juega</span></button>` : '';
}

let guideOpen = null;
function closeGuide() { guideOpen?.close(); }

// La franja forma parte del área de práctica: al abrirla, el lienzo conserva su propia zona de toque.
let practiceGuideId = 0;
function mountPracticeGuide(host, button, ex, auto, replay) {
  const note = document.createElement('div');
  note.id = `instrucciones-juego-${++practiceGuideId}`;
  note.className = 'practice-guide';
  note.hidden = true;
  note.setAttribute('role', 'status');
  for (const text of practiceGuideLines(ex)) {
    const line = document.createElement('p');
    line.textContent = text;
    note.appendChild(line);
  }
  host.prepend(note);
  const stage = host.querySelector('.game-stage') || host;
  button.setAttribute('aria-controls', note.id);
  const guide = { close, el: note };
  let afterRelease = 0;
  const dismissIntro = () => { afterRelease = requestAnimationFrame(close); };
  function close() {
    stage.removeEventListener('pointerup', dismissIntro);
    cancelAnimationFrame(afterRelease);
    note.hidden = true;
    button.setAttribute('aria-expanded', 'false');
    if (guideOpen === guide) guideOpen = null;
  }
  function show(manual) {
    if (manual) { closeGuide(); guideOpen = guide; }
    note.hidden = false;
    button.setAttribute('aria-expanded', 'true');
    if (typeof S !== 'undefined' && !ex.exam && !(S.guides ||= {})[guideKey(ex)]) {
      S.guides[guideKey(ex)] = true;
      if (typeof save === 'function') save();
    }
  }
  button.onclick = () => {
    Sfx.tap();
    if (note.hidden) {
      show(true);
      replay?.();
      host.scrollIntoView({ block: 'nearest' });
    } else close();
  };
  if (auto) {
    show(false);
    stage.addEventListener('pointerup', dismissIntro, { once: true });
  } else close();
  return close;
}

function openGuide(ex, o = {}) {
  const steps = guideSteps(ex);
  if (!steps.length || typeof document === 'undefined') return null;
  closeGuide();
  const el = document.createElement('div');
  el.className = 'guide';
  el.innerHTML = `<div class="guide-bg"></div><div class="guide-card" role="dialog" aria-modal="true" aria-labelledby="guide-k" aria-describedby="guide-t">
    <p class="guide-kicker" id="guide-k"></p>
    <div class="guide-stage"><canvas aria-hidden="true"></canvas></div>
    <p class="guide-text" id="guide-t" aria-live="polite"></p>
    <div class="guide-dots" aria-hidden="true">${steps.map(() => '<i></i>').join('')}</div>
    <div class="guide-actions"><button type="button" class="btn ghost guide-back">Atrás</button><button type="button" class="btn guide-next"></button></div>
    ${o.auto ? '<button type="button" class="guide-off">No mostrar la guía al empezar</button>' : ''}</div>`;
  document.body.appendChild(el);
  const cv = el.querySelector('canvas'), ctx = cv.getContext('2d'), stage = el.querySelector('.guide-stage');
  const kicker = el.querySelector('.guide-kicker'), text = el.querySelector('.guide-text'), dots = [...el.querySelectorAll('.guide-dots i')];
  const back = el.querySelector('.guide-back'), next = el.querySelector('.guide-next');
  let i = 0, t0 = performance.now(), raf = 0, alive = true;
  const still = reducedMotion();
  const frame = now => {
    if (!alive) return;
    const r = { width: stage.clientWidth, height: stage.clientHeight }, dpr = Math.min(2, window.devicePixelRatio || 1);   // sin la escala de la entrada
    if (r.width) {
      const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
      if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawGuideScene(ctx, steps[i][0], still ? 0.9 : ((now - t0) % GUIDE_MS) / GUIDE_MS, steps[i][2], r.width, r.height);
    }
    raf = requestAnimationFrame(frame);
  };
  const show = () => {
    kicker.textContent = `Cómo se juega · ${i + 1} de ${steps.length}`;
    if (typeof tex === 'function' && typeof texify === 'function' && window.katex) text.innerHTML = tex(texify(steps[i][1])); else text.textContent = steps[i][1];
    dots.forEach((d, k) => d.classList.toggle('on', k === i));
    back.disabled = i === 0;
    next.textContent = i === steps.length - 1 ? '¡A jugar!' : 'Siguiente';
    t0 = performance.now();
  };
  const prevFocus = document.activeElement;
  // El teclado es de la guía mientras está abierta: no llega a la lección que hay debajo (flechas, números, Enter).
  const onKey = e => {
    if (e.key === 'Tab') {
      const f = [...el.querySelectorAll('button:not(:disabled)')], k = f.indexOf(document.activeElement);
      e.preventDefault(); f[(k + (e.shiftKey ? -1 : 1) + f.length) % f.length]?.focus();
    } else if (e.key === 'Escape') { e.preventDefault(); close(); }
    else if (e.key === 'ArrowRight') next.click();
    else if (e.key === 'ArrowLeft') back.click();
    e.stopPropagation();
  };
  // quiet: el ejercicio se quitó de la pantalla (no se devuelve el foco ni se avisa).
  function close(quiet) {
    if (!alive) return;
    alive = false; cancelAnimationFrame(raf); document.removeEventListener('keydown', onKey, true);
    el.remove(); guideOpen = null;
    if (typeof S !== 'undefined') { (S.guides ||= {})[guideKey(ex)] = true; if (typeof save === 'function') save(); }
    if (quiet === true) return;
    if (prevFocus?.isConnected && prevFocus !== document.body) prevFocus.focus?.({ preventScroll: true });
    o.onClose?.();
  }
  back.onclick = () => { if (i > 0) { i--; show(); } };
  next.onclick = () => { if (i < steps.length - 1) { i++; show(); } else close(); };
  el.querySelector('.guide-bg').onclick = () => close();
  const off = el.querySelector('.guide-off');
  if (off) off.onclick = () => { if (typeof S !== 'undefined') S.guideAuto = false; close(); };
  document.addEventListener('keydown', onKey, true);
  show(); raf = requestAnimationFrame(frame);
  requestAnimationFrame(() => el.classList.add('open'));
  setTimeout(() => el.classList.add('open'), 60);   // por si la pestaña está en segundo plano y no hay cuadros
  next.focus?.({ preventScroll: true });
  guideOpen = { close, el, go: k => { i = Math.max(0, Math.min(steps.length - 1, k)); show(); } };
  return guideOpen;
}

// ¿Sale sola? La primera vez que se ve ese juego (o ese tipo de ejercicio), fuera de las evaluaciones.
function guideWanted(ex) {
  // Un juego que se explica sobre el lienzo (mano que hace el gesto) no abre la tarjeta emergente.
  if (ex?.type === 'play' && typeof GAMES !== 'undefined' && GAMES[ex.game]?.demo) return false;
  if (ex?.exam) return false;
  if (typeof S === 'undefined' || !guideSteps(ex).length) return false;
  if (S.guideAuto === false || S.guides?.[guideKey(ex)]) return false;
  return !(typeof document !== 'undefined' && document.querySelector?.('#overlay.open .exam-foot'));   // js/exam.js
}
;
//#archivo js/alg-practica.js
// Ejercicios de Álgebra con las escenas de la explicación (spec 2026-11-25-explora-algebra-trigonometria). Va después de guia.js y
// antes de alg-practica-*.js, que traen los datos. Cada lección tiene siete: dos que se mueven (M), dos de fichas (F), uno de tocar
// los que cumplen (T), uno de frases ciertas (S) y uno en movimiento (V). AP.leccion(id, tiro, [...]) registra los juegos de la
// lección (id-m1, id-f1…) y reemplaza sus ejercicios. La evaluación del mundo conserva los juegos de la revisión anterior.
const AP = (() => {
  const N = x => String(Math.round(x * 100) / 100).replace('-', '−'), R = Math.round, K0 = () => XPK;
  const SUP = n => String(n).split('').map(c => ({ '-': '⁻', '−': '⁻' })[c] || '⁰¹²³⁴⁵⁶⁷⁸⁹'[+c]).join('');
  // ------------------------------------------------------------------------------------------------------- escenas
  // cada una: [alto, (v, K, p, f) → SVG]. v: perillas (o los datos, en las de fichas); p: datos; f: 0 al responder, 1 al comprobar.
  const P = (K, p, H, o) => { const [a, b, c, d] = p.ej || [-6, 6, -5, 7]; return XM.plano(K, a, b, c, d, { H, g: 1, gy: p.gy || 1, ...o }); };
  const rayo = (K, p) => (p.cap ? K.t(170, 24, p.cap, 'b ta') : '');
  const ESC = {
    texto: [64, (v, K, p) => K.r(20, 8, 300, 50, 'fc', 10) + K.t(170, 39, p.cap || '', 'b')],
    venn: [156, (v, K, p) => K.r(14, 6, 312, 144, 'fc', 10) + K.c(130, 80, 58, 'fa') + K.c(210, 80, 58, 'fg') + K.t(62, 28, p.A || 'A', 'ta') + K.t(278, 28, p.B || 'B', 'tg') + (p.z || []).map((t, i) => K.t([100, 170, 240, 170][i], [86, 86, 86, 146][i], t, 's')).join('')],
    solape: [140, (v, K, p, f) => { const u = 280 / (p.a + p.b); return K.r(30, 30, p.a * u, 34, 'fa') + K.t(38, 52, `A: ${p.a}`, 's', 'start') + K.r(30 + (p.a - v.i) * u, 72, p.b * u, 34, 'fg') + K.t(38 + (p.a - v.i) * u, 94, `B: ${p.b}`, 's', 'start') + K.f(f, K.t(170, 132, `unión ${p.a + p.b - v.i}`, 'ta')); }],
    partes: [140, (v, K, p, f) => { const n = R(v.n), T = 2 ** n, w = Math.min(38, 300 / Math.min(T, 8)); return K.t(170, 20, `${n} elementos`, 'ta') + K.f(f, Array.from({ length: T }, (_, i) => K.r(170 + (i % 8 - Math.min(T, 8) / 2) * w, 30 + Math.floor(i / 8) * Math.min(13, 104 / Math.ceil(T / 8)), w - 3, Math.min(10, 80 / Math.ceil(T / 8)), 'fa', 3)).join('')); }],
    recta: [110, (v, K, p, f) => { const [a, b] = p.r || [-10, 10], L = XM.linea(K, a, b, 70, { p: p.paso || 2 }); return rayo(K, p) + L.s + (p.pts || []).map((x, i) => K.c(L.X(x), 70, 6, ['fG', 'fF'][i % 2])).join('') + (v.x != null ? (p.de != null ? K.f(f, K.ar(L.X(p.de), 46, L.X(v.x), 46, 'la gr')) : '') + K.c(L.X(v.x), 70, 8, 'fA') : '') + (p.espejo && v.x != null ? K.f(f, K.c(L.X(-v.x), 70, 8, 'fF')) : ''); }],
    tramo: [110, (v, K, p, f) => { const L = XM.linea(K, -10, 10, 70, { p: 2 }); return L.s + K.r(L.X(Math.max(-10, v.c - v.r)), 64, L.X(Math.min(10, v.c + v.r)) - L.X(Math.max(-10, v.c - v.r)), 12, 'fa') + K.c(L.X(v.c), 70, 5, 'fF') + K.f(f, K.t(170, 34, `de ${N(v.c - v.r)} a ${N(v.c + v.r)}`, 'ta')); }],
    fraccion: [120, (v, K, p, f) => { const d = Math.max(1, R(v.d ?? p.d)), n = R(v.n ?? p.n); return Array.from({ length: d }, (_, i) => K.r(20 + i * 300 / d, 30, 300 / d, 40, i < n ? 'fa' : 'fc')).join('') + (p.guia ? XM.barra(K, 82, [[p.guia[0], '', 'fg'], [p.guia[1] - p.guia[0], '', 'fc']], { h: 26 }) : ''); }],
    reja: [150, (v, K, p, f) => { const a = R(v.a ?? p.a), b = R(v.b ?? p.b), u = Math.min(24, 124 / b, 280 / a); return XM.reja(K, 170 - a * u / 2, 10, a, b, u, 'fa') + K.f(f, K.t(170, 148, `${a} · ${b} = ${a * b}`, 's')); }],
    dosreja: [140, (v, K, p, f) => { const a = p.a, b = p.b, c = R(v.c ?? p.c), u = Math.min(22, 280 / (b + c + 1)); return XM.reja(K, 30, 14, b, a, u, 'fa') + XM.reja(K, 30 + (b + (f ? 1 - f : 1) * 0.8) * u, 14, c, a, u, 'fg'); }],
    barra: [96, (v, K, p) => rayo(K, p) + XM.barra(K, 40, p.segs || [[1, '', 'fa']], { h: 40, ...(p.T ? { T: p.T } : {}) })],
    dobleBarra: [130, (v, K, p, f) => XM.barra(K, 20, [[p.base, p.r1 || N(p.base), 'fa']], { T: p.T, h: 36 }) + XM.barra(K, 78, [[v.x, '', 'fg']], { T: p.T, h: 36 }) + K.f(f, K.t(170, 128, p.unir ? p.unir(v) : N(v.x), 's'))],
    bolas: [110, (v, K, p) => XM.bolas(K, 34, 34, v.a ?? p.a, 'fa', Math.min(26, 270 / (p.M || 10)), 9) + XM.bolas(K, 34, 78, v.b ?? p.b, 'fg', Math.min(26, 270 / (p.M || 10)), 9)],
    cien: [160, (v, K, p, f) => { let h = ''; for (let i = 0; i < 100; i++) h += K.r(80 + (i % 10) * 18, 8 + Math.floor(i / 10) * 14, 16, 12, i < R(v.k ?? p.k ?? 0) ? 'fa' : 'fc', 2); return h; }],
    cascada: [150, (v, K, p, f) => { const f1 = v.f1 ?? p.f1, f2 = v.f2 ?? p.f2, xs = [100, 100 * f1, 100 * f1 * f2], u = 120 / Math.max(160, ...xs); return xs.map((x, i) => (i >= (p.ve || 2) && !f ? K.r(50 + i * 92, 140 - 100 * u, 66, 100 * u, 'fn d') + K.t(83 + i * 92, 90, '?', 'b') : K.r(50 + i * 92, 140 - x * u, 66, x * u, ['fa', 'fg', 'ff'][i]) + K.t(83 + i * 92, 132 - x * u, N(x), 's'))).join(''); }],
    torre: [150, (v, K, p, f) => { const b = p.b, e = R(v.e ?? p.e), T = Math.min(256, b ** e), c = T > 128 ? 24 : T > 40 ? 16 : Math.max(1, Math.ceil(Math.sqrt(T))), u = Math.min(22, 300 / c, 110 / Math.ceil(T / c)); return K.t(170, 20, `${b}${SUP(e)}`, 'b ta') + K.f(f, Array.from({ length: T }, (_, i) => K.r(170 - c * u / 2 + (i % c) * u, 32 + Math.floor(i / c) * u, u - 2, u - 2, 'fa', 2)).join('')); }],
    cuadrado: [180, (v, K, p, f) => { const s = R(v.s ?? p.s), u = Math.min(20, 150 / s); return XM.reja(K, 170 - s * u / 2, 10, s, s, u, 'fa') + K.f(f, K.t(330, 24, `área ${s * s}`, 's', 'end')); }],
    factores: [100, (v, K, p) => { const l = p.l || [], u = Math.min(38, 300 / l.length); return rayo(K, p) + l.map((t, i) => K.r(170 - l.length * u / 2 + i * u, 42, u - 4, 34, i < (p.k ?? l.length) ? 'fa' : 'fg', 5) + K.t(168 - l.length * u / 2 + (i + 0.5) * u, 64, t, 's')).join(''); }],
    escalera: [150, (v, K, p, f) => { const n = p.n, xs = Array.from({ length: n }, (_, i) => (p.geo ? (v.a ?? p.a) * (v.d ?? p.d) ** i : (v.a ?? p.a) + (v.d ?? p.d) * i)), top = p.top || Math.max(...xs), w = 290 / n; return xs.map((x, i) => { const h = Math.max(2, Math.min(116, x / top * 112)); return K.r(25 + i * w, 142 - h, w - 6, h, 'fa') + (f || (p.ver || [0]).includes(i) ? K.t(25 + i * w + (w - 6) / 2, 136 - h, N(x), 's') : ''); }).join(''); }],
    cinta: [110, (v, K, p, f) => { let x = 20, w = 300 * (1 - p.r), h = ''; for (let i = 0; i < 7; i++) { h += K.r(x, 34, w, 46, ['fa', 'fg', 'ff', 'fo'][i % 4]); x += w; w *= p.r; } return rayo(K, p) + h + K.r(20, 34, 300, 46, 'fn'); }],
    tiles: [170, (v, K, p) => Array.from({ length: R(v.a ?? p.a ?? 0) }, (_, i) => K.r(20 + i * 56, 8, 50, 50, 'fa') + K.t(45 + i * 56, 38, 'x²', 's')).join('') + Array.from({ length: R(v.b ?? p.b ?? 0) }, (_, i) => K.r(20 + i * 24, 66, 18, 50, 'fg')).join('') + Array.from({ length: R(v.c ?? p.c ?? 0) }, (_, i) => K.r(20 + i * 24, 126, 18, 18, 'ff')).join('')],
    rect: [200, (v, K, p, f) => { const a = R(v.p), b = R(v.q); return K.r(60, 12, 76, 76, 'fa') + K.t(98, 56, 'x²', 'b') + Array.from({ length: a }, (_, i) => K.r(136 + i * 17, 12, 17, 76, 'fg')).join('') + Array.from({ length: b }, (_, i) => K.r(60, 88 + i * 17, 76, 17, 'fg')).join('') + XM.reja(K, 136, 88, a, b, 17, 'ff') + K.f(f, K.t(330, 194, `${a + b} barras, ${a * b} unidades`, 's', 'end')); }],
    area4: [130, (v, K, p) => K.r(80, 12, 100, 62, 'fa') + K.r(184, 12, 66, 62, 'fg') + K.r(80, 78, 100, 40, 'fg') + K.r(184, 78, 66, 40, 'ff') + (p.t || []).map((t, i) => K.t([130, 217, 130, 217][i], [48, 48, 103, 103][i], t, 's')).join('') + (p.lados || []).map((t, i) => K.t([70, 130, 217, 70][i], [48, 10, 10, 103][i], t, 's tm', i % 3 ? 'middle' : 'end')).join('')],
    pascal: [160, (v, K, p) => { let h = ''; for (let i = 0; i < (p.f || 5); i++) { let c = 1; for (let j = 0; j <= i; j++) { h += K.c(170 + (j - i / 2) * 42, 18 + i * 28, 12, 'fa') + K.t(170 + (j - i / 2) * 42, 23 + i * 28, c, 's'); c = c * (i - j) / (j + 1); } } return h; }],
    balanza: [150, (v, K, p) => K.l(40, 110, 300, 110, 'gr') + K.p([[170, 110], [152, 142], [188, 142]], 'fk') + XM.bolas(K, 58, 92, p.x, 'fa', 28, 12) + XM.bolas(K, 58, 66, p.u, 'fg', 18, 7) + XM.bolas(K, 200, 92, p.y, 'fa', 28, 12) + XM.bolas(K, 200, 66, Math.min(6, p.w), 'fg', 18, 7) + XM.bolas(K, 200, 48, Math.max(0, p.w - 6), 'fg', 18, 7)],
    balanzaX: [150, (v, K, p, f) => { const iz = p.x * v.n + p.u, de = p.y * v.n + p.w, g = f * Math.max(-12, Math.min(12, (de - iz))); return K.l(40, 100 - g, 300, 100 + g, 'gr') + K.p([[170, 100], [152, 140], [188, 140]], 'fk') + K.t(90, 84 - g, p.izq, 'ta') + K.t(250, 84 + g, p.der, 'tg') + K.f(f, K.t(90, 60 - g, N(iz), 's') + K.t(250, 60 + g, N(de), 's')); }],
    linea2: [190, (v, K, p, f) => { const q = P(K, p, 186); return q.s + XM.curva(K, q, x => (v.m ?? p.m) * x + (v.b ?? p.b)) + (p.o ? XM.curva(K, q, x => p.o[0] * x + p.o[1], 'lf gr') : ''); }],
    cruce: [190, (v, K, p, f) => { const q = P(K, { ej: [-1, 9, -1, 9], ...p }, 186); return q.s + p.l.map(([m, b], i) => XM.curva(K, q, x => m * x + b, i ? 'lf gr' : 'la gr')).join('') + K.c(q.X(v.x), q.Y(v.y), 6, 'fG'); }],
    parab: [190, (v, K, p, f) => { const q = P(K, p, 186), o = { a: 1, h: 0, k: 0, ...p.b0, ...v }; return q.s + (p.sombra ? XM.curva(K, q, x => p.sombra[0] * (x - p.sombra[1]) ** 2 + p.sombra[2], 'lm d') : '') + XM.curva(K, q, x => o.a * (x - o.h) ** 2 + o.k) + K.c(q.X(o.h), q.Y(Math.max(q.c, Math.min(q.d, o.k))), 5, 'fF'); }],
    raices: [190, (v, K, p, f) => { const q = P(K, { ej: [-6, 6, -8, 8], gy: 2, ...p }, 186), k = p.k || 1; return q.s + XM.curva(K, q, x => k * (x - v.r) * (x - v.s)) + K.c(q.X(v.r), q.Y(0), 6, 'fA') + K.c(q.X(v.s), q.Y(0), 6, 'fA'); }],
    curva: [170, (v, K, p) => { const q = P(K, p, 166); return q.s + XM.curva(K, q, x => p.fx(x)) + (p.pts || []).map(([x, y]) => K.c(q.X(x), q.Y(y), 5, 'fG')).join('') + (p.as != null ? K.l(q.X(p.as), 8, q.X(p.as), 158, 'lf d') : ''); }],
    sonda: [190, (v, K, p, f) => { const q = P(K, p, 186); const y = Math.max(q.c, Math.min(q.d, p.fx(v.x))); return q.s + K.l(q.X(v.x), 8, q.X(v.x), 178, 'lm d') + K.f(f, XM.curva(K, q, p.fx) + K.c(q.X(v.x), q.Y(y), 6, 'fF')); }],
    corta: [190, (v, K, p, f) => { const q = P(K, p, 186); return q.s + XM.curva(K, q, p.fx) + XM.curva(K, q, x => p.m * x + v.b, 'lf gr'); }],
    complejo: [200, (v, K, p, f) => { const q = XM.plano(K, -8.7, 8.7, -5, 5, { H: 190 }); return q.s + (p.z ? K.ar(q.X(0), q.Y(0), q.X(p.z[0]), q.Y(p.z[1]), 'lg gr') : '') + K.ar(q.X(0), q.Y(0), q.X(v.x), q.Y(v.y), 'la gr') + K.f(f, K.c(q.X(v.x), q.Y(v.y), 6, 'fA')); }],
    rio: [190, (v, K, p, f) => { const q = P(K, { ej: [-6, 6, -6, 6], gy: 2, ...p }, 186); return q.s + K.l(q.X(v.q), 8, q.X(v.q), 178, 'lf d') + K.f(f, XM.curva(K, q, x => (Math.abs(x - v.q) < 0.07 ? NaN : 2 / (x - v.q)))); }],
    expo: [190, (v, K, p, f) => { const q = P(K, { ej: [-4, 4, -2, 12], gy: 2, ...p }, 186), o = { a: 1, k: 0, ...p.b0, ...v }; return q.s + (p.sombra ? XM.curva(K, q, x => p.sombra[0] * p.base ** x + p.sombra[1], 'lm d') : '') + XM.curva(K, q, x => o.a * (v.base ?? p.base) ** x + o.k) + K.l(18, q.Y(o.k), 322, q.Y(o.k), 'lf d'); }],
    logv: [190, (v, K, p, f) => { const q = XM.plano(K, -1, 17, -3, 5, { H: 186, g: 2, gy: 1 }), L = x => (x > 0.02 ? Math.log(x) / Math.log(p.base) : NaN); return q.s + K.f(f, XM.curva(K, q, L)) + K.l(q.X(p.x), 8, q.X(p.x), 178, 'lm d') + K.c(q.X(p.x), q.Y(v.y), 6, 'fF'); }],
    cubica: [170, (v, K, p) => { const q = P(K, { ej: [-5, 5, -12, 12], gy: 4, ...p }, 166); return q.s + XM.curva(K, q, p.fx); }],
    ahorro: [150, (v, K, p, f) => Array.from({ length: 5 }, (_, i) => { const s = p.C * (1 + p.i * i), c = p.C * (1 + p.i) ** i, u = 110 / (p.C * (1 + p.i) ** 4); return K.r(30 + i * 60, 142 - s * u, 22, s * u, 'fa') + K.r(54 + i * 60, 142 - c * u, 22, c * u, 'fg'); }).join('')],
  };
  const esc = p => ESC[p.esc] || ESC.texto;

  // --------------------------------------------------------------------------------------------------------- juegos
  const man = p => p.ks.map(([k, min, max, et, paso]) => ({ k, min, max, et, paso: paso || 1 }));
  const mueve = name => XG.figura(name, {
    ini: p => ({ ...p.v }), manijas: man, sol: p => ({ ...p.v, ...p.meta }),
    ok: (v, p) => (p.vale ? !!p.vale(v) : Object.entries(p.meta).every(([k, x]) => Math.abs(v[k] - x) < 1e-6)),
    texto: p => p.ks.filter(([k]) => p.meta[k] != null).map(([k, , , et]) => `${et}: ${N(p.meta[k])}`).join('; '), alto: p => esc(p)[0] + 44 * p.ks.length + 6, ms: 1100, pie: 'Mueve la perilla. Al comprobar la escena responde.',
    dib: (v, K, p, f) => esc(p)[1](v, K, p, f || 0), aviso: (v, p) => p.mira, bien: (v, p) => p.ok,
  });
  const X = (p, i) => 170 + (i - (p.et.length - 1) / 2) * (324 / p.et.length);
  const cuenta = name => XG.rotula(name, {
    slots: p => p.et.map((_, i) => ({ x: R(X(p, i)), y: esc(p)[0] + 24, w: R(Math.min(96, 324 / p.et.length - 14)), h: 38 })), fichas: p => p.fichas, metas: p => p.metas, alto: p => esc(p)[0] + 66,
    texto: p => p.metas.map((m, i) => `${p.et[i]}: ${m}`).join('; '),
    fondo: (K, p, f) => esc(p)[1](p, K, p, f || 0) + p.et.map((t, i) => K.t(X(p, i), esc(p)[0] + 60, t, 's tm')).join(''),
    aviso: (q, p) => p.mira, bien: p => p.ok,
  });
  const si = p => p.casos.map((_, i) => i).filter(i => p.casos[i][1]);
  const dice = (on, p) => { const s = si(p); return on.some((x, i) => x && !s.includes(i)) ? 'Alguna de las marcadas no cumple. ' + p.mira : 'Falta alguna por marcar. ' + p.mira; };
  const toca = name => XG.marca(name, {
    sitios: p => p.casos.map((_, i) => ({ x: 92 + (i % 2) * 156, y: 30 + Math.floor(i / 2) * 54, w: 146, h: 44 })), cara: (K, p, i) => K.t(92 + (i % 2) * 156, 35 + Math.floor(i / 2) * 54, p.casos[i][0], p.casos[i][0].length > 13 ? 's' : ''), alto: p => Math.ceil(p.casos.length / 2) * 54 + 8,
    sol: si, aviso: dice, bien: p => p.ok, texto: p => si(p).map(i => p.casos[i][0]).join('; '), pie: 'Toca todas las que cumplen.',
  });
  const frases = name => XG.marca(name, {
    sitios: p => p.casos.map((_, i) => ({ x: 170, y: 26 + i * 46, w: 324, h: 40 })), cara: (K, p, i) => K.t(170, 31 + i * 46, p.casos[i][0], 's'), alto: p => p.casos.length * 46 + 8,
    sol: si, aviso: dice, bien: p => p.ok, texto: p => si(p).map(i => p.casos[i][0]).join('; '), pie: 'Toca todas las que cumplen.',
  });
  // En movimiento: se fija un valor y la escena lo lanza; con el valor justo llega a la meta.
  // Si el recorrido es muy largo, cada tiro lleva una ventana de 30 pasos que contiene su respuesta (sin quedar siempre en la mitad).
  const VAL = (t, k, p) => t.a + (k - 1) * p.paso;
  const TIRO = {
    globo: (K, q) => K.l(40, 30, 300, 30, 'lg d') + K.t(306, 34, 'meta', 's tm', 'start') + K.c(170, 130 - 100 * q + 4, 18, 'fa') + K.l(170, 152 - 100 * q, 170, 164 - 100 * q, 'lm'),
    rana: (K, q) => { const L = XM.linea(K, 0, 10, 130, { n: 0 }); return L.s + K.l(L.X(8), 96, L.X(8), 130, 'lg gr') + K.p([[L.X(8), 96], [L.X(8) + 22, 103], [L.X(8), 110]], 'fg') + K.c(L.X(8 * q), 116 - 50 * Math.abs(Math.sin(q * Math.PI * 3)), 10, 'fA'); },
    tanque: (K, q) => K.r(110, 20, 120, 120, 'fc') + K.r(110, 140 - 84 * q, 120, 84 * q, 'fa') + K.l(100, 56, 240, 56, 'lg d gr'),
    puente: (K, q) => K.r(10, 100, 60, 46, 'fc') + K.r(258, 100, 70, 46, 'fc') + K.r(70, 92, 188 * q, 9, 'fa') + K.c(70 + 188 * Math.min(q, 1) * 0.98, 80, 9, 'fA'),
    tren: (K, q) => K.l(14, 130, 326, 130, 'lm') + K.l(266, 96, 266, 130, 'lg gr') + [0, 1, 2].map(i => K.r(20 + 188 * q - i * 4 + i * 22 - 20 + 20, 108, 18, 18, ['fa', 'fa', 'fA'][i])).join(''),
    cohete: (K, q) => K.c(290, 34, 16, 'fg') + (([x, y]) => K.p([[x, y - 12], [x - 8, y + 10], [x + 8, y + 10]], 'fA'))([50 + 240 * q, 130 - 96 * q]),
    bola: (K, q) => K.pl([[20, 40], [120, 120], [320, 120]], 'lm') + K.c(250, 124, 14, 'fk') + (q < 0.34 ? K.c(20 + 100 * q / 0.34, 30 + 80 * q / 0.34, 10, 'fA') : K.c(120 + 130 * (q - 0.34) / 0.66, 110, 10, 'fA')),
    arco: (K, q) => K.l(14, 140, 326, 140, 'lm') + K.l(240, 112, 290, 112, 'lg gr') + K.c(40 + 225 * q, 140 - 400 * q * (1.07 - q) - 4, 9, 'fA'),
    bote: (K, q) => K.r(10, 60, 320, 70, 'fa') + K.l(270, 50, 270, 140, 'lg gr') + (x => K.p([[x - 22, 92], [x + 22, 92], [x + 12, 108], [x - 12, 108]], 'fA'))(40 + 230 * q),
    planta: (K, q) => K.l(40, 140, 300, 140, 'lm') + K.l(170, 140, 170, 140 - 90 * q, 'lo gr') + [0.3, 0.55, 0.8].filter(t => t < q + 0.01).map((t, i) => K.c(170 + (i % 2 ? -14 : 14), 140 - 90 * t, 8, 'fo')).join('') + K.l(100, 50, 240, 50, 'lg d'),
  };
  const vuela = (name, tipo) => XG.tiros(name, {
    perilla: (t, p) => ({ et: 'Tu valor', min: 0, max: R((t.b - t.a) / p.paso) + 1, cara: k => (k ? N(VAL(t, k, p)) : '·'), lee: k => N(VAL(t, k, p)) }), meta: (t, p) => R((t.r - t.a) / p.paso) + 1, alto: 160, ms: 1600,
    dib(t, k, K, p, f) { const m = R((t.r - t.a) / p.paso) + 1, q = k == null ? 0 : (k === m ? 1 : k < m ? 0.66 : 1.24) * f; return TIRO[tipo](K, q); },
    falla: (t, k, p) => (VAL(t, k, p) < t.r ? 'Se quedó corto. ' : 'Se pasó. ') + (t.e || p.mira), cuenta: t => `$${t.c}$`, pie: 'Estira hasta tu valor y suelta.',
  });

  // ------------------------------------------------------------------------------------------------- escribir ejercicios
  const base = (q, hint, explain) => ({ mira: hint, ok: 'Esa era la idea.' });
  const E = (tipo, q, params, explain, hint) => ({ tipo, q, params: { ...base(q, hint), ...params }, explain, hint });
  const M = (q, escena, ks, v, meta, explain, hint, x = {}) => E('m', q, { esc: escena, ks, v, meta, ...x }, explain, hint);
  const F = (q, escena, et, metas, sobra, explain, hint, x = {}) => E('f', q, { esc: escena, et, metas, fichas: [...metas, ...sobra], ...x }, explain, hint);
  const T = (q, casos, explain, hint) => E('t', q, { casos }, explain, hint);
  const S = (q, casos, explain, hint) => E('s', q, { casos }, explain, hint);
  const V = (q, min, max, tiros, explain, hint, paso = 1) => E('v', q, { min, max, paso, tiros: tiros.map(([q, r, c, e]) => { const n = (max - min) / paso, a = n <= 40 ? min : Math.max(min, Math.min(max - 30 * paso, r - paso * (3 + Math.abs(r * 7 + q.length) % 24))); return { q, r, c, e, a, b: n <= 40 ? max : a + 30 * paso }; }) }, explain, hint);
  const HACE = { m: mueve, f: cuenta, t: toca, s: frases };
  const GUIA = { m: [['slide', 'Mueve la perilla hasta tu respuesta y comprueba.', { label: 'valor' }]], f: [['drag', 'Arrastra cada ficha a su lugar.', { tile: '7', slot: 'lugar' }]], t: [['tap', 'Toca todas las que cumplen y comprueba.', { items: ['A', 'B', 'C'], pick: [0, 2] }]], s: [['tap', 'Toca las frases ciertas y comprueba.', { items: ['A', 'B', 'C'], pick: [0, 2] }]], v: [['slide', 'Estira hasta tu valor y suelta: la escena lo lanza.', { label: 'valor' }]] };
  const hechas = [];
  function leccion(id, tiro, list) {
    const l = COURSE_ALGEBRA.units.flatMap(u => u.lessons).find(x => x.id === id), n = {};
    l.ex = list.map((e, i) => {
      const k = n[e.tipo] = (n[e.tipo] || 0) + 1, name = `${id}-${e.tipo}${k}`;
      e.tipo === 'v' ? vuela(name, tiro) : HACE[e.tipo](name);
      if (typeof GUIDES !== 'undefined') GUIDES[name] = GUIA[e.tipo];
      return { ...play(name, e.q, e.params, e.explain, { hint: e.hint }), motion: i === list.length - 1 };
    });
    hechas.push(id);
  }
  return { M, F, T, S, V, leccion, hechas, ESC, TIRO };
})();
;
//#archivo js/alg-practica-1.js
// Ejercicios de Álgebra, mundos 1 (Teoría de Conjuntos), 2 (La Recta Real) y 3 (Escalas y Proporciones). Ver alg-practica.js.
{
  const { M, F, T, S, V, leccion } = AP;
  // ============================================================================================= 1 · Conjuntos
  leccion('alg-0a', 'globo', [
    T('A es el conjunto de las letras de **MANZANA**. Toca sus elementos, una vez cada uno.', [['m', 1], ['e', 0], ['a', 1], ['n', 1], ['z', 1], ['o', 0]], 'Repetir no agrega: $A = \\{m, a, n, z\\}$.', 'Recorre la palabra letra por letra. Las que se repiten cuentan una sola vez.'),
    S('¿Cuáles descripciones forman un conjunto **bien definido**?', [['los días de la semana', 1], ['las películas más divertidas', 0], ['las vocales de la palabra «sol»', 1], ['los ríos bastante largos', 0]], 'Ante cualquier objeto hay que poder decir, sin discutir, si entra o no.', 'Piensa si dos personas podrían discutir sobre qué entra.'),
    F('D es el conjunto de los puntos cardinales. Pon el símbolo que va en cada casilla.', 'texto', ['sur □ D', 'arriba □ D', 'oeste □ D'], ['∈', '∉', '∈'], ['∉', '='], 'El sur y el oeste son puntos cardinales; arriba, no.', 'Pregunta de cada palabra si está en la lista de D.', { cap: 'D = {norte, sur, este, oeste}' }),
    F('Pasa de la regla a la lista: **los meses que empiezan por «a»**. Ponlos en el orden del año.', 'texto', ['primero', 'segundo'], ['abril', 'agosto'], ['marzo', 'enero'], 'Solo abril y agosto cumplen la regla.', 'Recorre los doce meses y fíjate en la primera letra.', { cap: 'meses que empiezan por a' }),
    T('B = {sol, {luna}}. ¿Cuáles son **elementos** de B?', [['sol', 1], ['luna', 0], ['{luna}', 1], ['{sol}', 0]], 'La luna está dentro de una bolsa: el elemento es la bolsa $\\{\\text{luna}\\}$.', 'Cada coma de afuera separa un elemento. Lo que está entre llaves entra con sus llaves.'),
    S('¿Cuáles son **iguales** al conjunto {r, e, d}?', [['{d, r, e}', 1], ['{r, e, d, e}', 1], ['{r, e}', 0], ['{r, e, d, o}', 0]], 'Ni el orden ni las repeticiones cambian un conjunto; sacar o agregar, sí.', 'Revisa que tengan los mismos elementos, sin mirar el orden.'),
    V('¿Cuántos elementos tiene cada conjunto? Infla el globo con ese número.', 0, 8, [['letras de CASA', 3, 'n(\\{c, a, s\\}) = 3'], ['letras de AMOR', 4, 'n(\\{a, m, o, r\\}) = 4'], ['{x, {y, z}}', 2, 'n(\\{x, \\{y, z\\}\\}) = 2']], 'El cardinal cuenta elementos distintos, y una bolsa cuenta como uno.', 'No cuentes dos veces una letra repetida. Una bolsa con llaves es un solo elemento.'),
  ]);
  leccion('alg-0b', 'globo', [
    F('A = {2, 4}, B = {1, 2, 3, 4}. Pon el símbolo que va en cada casilla.', 'texto', ['A □ B', '4 □ B', '{4} □ B'], ['⊂', '∈', '⊂'], ['∈', '=', '∉'], 'A y {4} son conjuntos contenidos en B; el 4 es un elemento.', 'Un conjunto se compara con ⊂; un elemento suelto, con ∈.', { cap: 'A = {2, 4} ; B = {1, 2, 3, 4}' }),
    T('¿Cuáles son **subconjuntos** de {p, q, r}?', [['{q}', 1], ['{p, s}', 0], ['∅', 1], ['{r, q, p}', 1], ['{{p}}', 0], ['{p, r}', 1]], 'Todo lo que hay en el subconjunto debe estar en el grande; el vacío siempre cumple.', 'Busca si alguno tiene algo que no está en {p, q, r}. ¿El vacío tiene algo que se salga?'),
    M('Un conjunto tiene **64** subconjuntos. Mueve cuántos elementos tiene.', 'partes', [['n', 0, 7, 'elementos']], { n: 0 }, { n: 6 }, '$2^6 = 64$: cada elemento duplica.', 'Con uno hay dos subconjuntos. Duplica por cada elemento nuevo.'),
    S('¿Cuáles afirmaciones son **ciertas**?', [['∅ ⊆ {5, 6}', 1], ['{5} ∈ {5, 6}', 0], ['{5, 6} ⊆ {5, 6}', 1], ['∅ = {∅}', 0]], 'El vacío está contenido en todos y cada conjunto está contenido en sí mismo.', 'Distingue un elemento de un conjunto con ese elemento.'),
    F('Clasifica cada conjunto.', 'texto', ['meses de 40 días', 'capital de Perú', 'números pares'], ['vacío', 'unitario', 'infinito'], ['finito de 12', 'disjunto'], 'Ningún mes tiene 40 días, hay una sola capital y los pares no se acaban.', 'Pregunta cuántos elementos hay: ninguno, uno, o sin fin.', { cap: '¿cuántos elementos?' }),
    M('Sin contar el vacío ni el propio conjunto, {a, b, c, d} tiene **14** subconjuntos. ¿Cuántos elementos hacen falta para que sean **30**?', 'partes', [['n', 0, 6, 'elementos']], { n: 1 }, { n: 5 }, '$2^5 - 2 = 30$.', 'Al número de todos los subconjuntos le faltan dos. ¿Qué potencia de dos es?'),
    V('¿Cuántos subconjuntos tiene cada conjunto? Infla el globo.', 0, 20, [['{m, n}', 4, '2^2 = 4'], ['∅', 1, '2^0 = 1'], ['letras de CALA', 8, '2^3 = 8']], 'Son $2^n$, con n el número de elementos distintos.', 'Cuenta primero los elementos distintos y duplica tantas veces.'),
  ]);
  leccion('alg-0c', 'globo', [
    F('A = {1, 2, 3, 6}, B = {2, 4, 6}. Pon cuántos números van en cada zona.', 'venn', ['solo A', 'los dos', 'solo B'], ['2', '2', '1'], ['3', '4'], 'En común están el 2 y el 6.', 'Empieza por los que están en los dos conjuntos.'),
    T('Con A = {0, 2, 5, 7} y B = {2, 3, 7, 8}, toca los elementos de **A − B**.', [['0', 1], ['2', 0], ['3', 0], ['5', 1], ['7', 0], ['8', 0]], 'Se parte de A y se quita lo que también está en B.', 'Recorre solo A. ¿Cuáles de esos no están en B?'),
    M('A tiene **12** elementos, B tiene **10** y su unión **15**. Mueve cuántos comparten.', 'solape', [['i', 0, 10, 'comparten']], { i: 0 }, { i: 7 }, '$12 + 10 - 7 = 15$.', 'La suma se pasa de 15: lo que sobra se contó dos veces.', { a: 12, b: 10 }),
    S('¿Cuáles son ciertas **para cualquier** A y B?', [['A ∩ B ⊆ A', 1], ['A − B = B − A', 0], ['A ⊆ A ∪ B', 1], ['A ∪ ∅ = ∅', 0]], 'Lo común está en A, y A está en la unión.', 'Imagina dos círculos que se cruzan y busca si alguna falla.'),
    F('U = {1, …, 10}; A son los pares y B los múltiplos de 5. ¿Cuántos elementos?', 'venn', ['A ∪ B', 'A ∩ B', "(A ∪ B)'"], ['6', '1', '4'], ['7', '5', '2'], 'Los pares son cinco y B agrega el 5; el 10 está en los dos.', 'Haz las listas: pares y múltiplos de 5 hasta 10.'),
    F('De 50 turistas, 30 visitan el museo, 24 el parque y 9 los dos. Pon cada número.', 'venn', ['solo museo', 'solo parque', 'ninguno'], ['21', '15', '5'], ['30', '24', '9'], '$21 + 9 + 15 = 45$ y faltan 5.', 'Quita los 9 a cada total; lo que falte para 50 no visita nada.', { A: 'museo', B: 'parque', z: ['', '9', '', ''] }),
    V('Infla el globo con la respuesta: n(A) = 7, n(B) = 5.', 0, 14, [['si A ∩ B tiene 2, ¿n(A ∪ B)?', 10, '7 + 5 - 2 = 10'], ['si son disjuntos, ¿n(A ∪ B)?', 12, '7 + 5 = 12'], ['si B ⊂ A, ¿n(A ∪ B)?', 7, 'A \\cup B = A']], 'Se suma y se quita una vez lo común.', 'Suma los dos y quita lo que se contó dos veces. ¿Cuántos comparten en cada caso?'),
  ]);

  // ============================================================================================= 2 · Recta real
  const E = [-10, 10];
  leccion('alg-11', 'rana', [
    M('Una cometa está **6** m más arriba que el borde de un muro y baja **9** m. Lleva el punto a su altura respecto del borde.', 'recta', [['x', -10, 10, 'altura']], { x: 6 }, { x: -3 }, '$6 - 9 = -3$: tres metros por debajo.', 'Camina nueve pasos a la izquierda desde 6.', { de: 6 }),
    F('Pon el resultado de cada cuenta.', 'recta', ['−7 + 4', '−2 − 5', '3 − (−6)'], ['−3', '−7', '9'], ['−11', '3', '−9'], 'Restar un negativo es sumar.', 'Suma: a la derecha. Resta: a la izquierda. Restar un negativo cambia de sentido.'),
    T('¿Cuáles números son **enteros**?', [['−8', 1], ['1/2', 0], ['0', 1], ['2.5', 0], ['15', 1], ['−6/3', 1]], 'El cero y los negativos son enteros; $-\\tfrac63 = -2$ también.', 'Calcula las divisiones: ¿da un número sin partes?'),
    M('Pon el punto de modo que su **opuesto** quede en **−8**.', 'recta', [['x', -10, 10, 'punto']], { x: 0 }, { x: 8 }, 'El opuesto de 8 es $-8$.', 'El opuesto está al otro lado del cero, a la misma distancia.', { espejo: 1 }),
    S('¿Cuáles son ciertas?', [['todo natural es entero', 1], ['−(−9) = −9', 0], ['a + (−a) = 0', 1], ['0 es mayor que −1', 1], ['−10 es mayor que −2', 0]], 'Opuestos suman cero, y a la derecha se es mayor.', 'Ubica los números en la recta antes de decidir.'),
    F('Un submarino está a −120 m, sube 45 y baja 60. Pon cada profundidad.', 'recta', ['sube', 'baja'], ['−75', '−135'], ['−165', '75', '−15'], '$-120 + 45 = -75$ y $-75 - 60 = -135$.', 'Sube: menos profundo. Luego baja desde ahí.', { r: [-150, 0], paso: 30, pts: [-120] }),
    V('Haz que la rana salte justo a la meta: calcula.', -10, 10, [['$-5 + 8$', 3, '-5 + 8 = 3'], ['$2 - 9$', -7, '2 - 9 = -7'], ['$-1 - (-7)$', 6, '-1 + 7 = 6']], 'Restar es sumar el opuesto.', 'Cambia cada resta por la suma del opuesto.'),
  ]);
  leccion('alg-11b', 'rana', [
    M('Arma $\\tfrac{5}{8}$ de la cinta.', 'fraccion', [['d', 2, 10, 'partes'], ['n', 0, 10, 'tomadas']], { d: 3, n: 1 }, { d: 8, n: 5 }, 'Ocho partes iguales y cinco tomadas.', 'El de abajo dice en cuántas partes se corta.'),
    M('Con **15** partes, toma lo mismo que la barra de abajo, que es $\\tfrac45$.', 'fraccion', [['n', 0, 15, 'tomadas']], { n: 1 }, { n: 12 }, '$\\tfrac45 = \\tfrac{12}{15}$.', 'Reparte las quince partes en cinco grupos iguales: ¿cuántas van en cada uno?', { d: 15, guia: [4, 5] }),
    F('Simplifica cada fracción hasta donde se pueda.', 'texto', ['18/24', '35/45', '50/20'], ['3/4', '7/9', '5/2'], ['9/12', '5/9', '2/5'], 'Se divide arriba y abajo por el mayor divisor común.', 'Busca el mayor número que divide a los dos.', { cap: 'hasta que no se pueda más' }),
    T('¿Cuáles valen lo mismo que **0.6**?', [['3/5', 1], ['6/100', 0], ['60/100', 1], ['9/15', 1], ['6/5', 0], ['12/20', 1]], 'Todas las que se simplifican a $\\tfrac35$.', 'Seis décimos se simplifican. ¿Cuáles llegan a lo mismo?'),
    F('Pon el resultado de cada cuenta.', 'texto', ['1/2 + 1/3', '3/4 − 1/6', '2/3 · 9/4'], ['5/6', '7/12', '3/2'], ['2/5', '2/2', '11/7'], 'Sumar y restar pide el mismo denominador; multiplicar, no.', 'Usa sextos y doceavos. En el producto simplifica antes.', { cap: 'partes del mismo tamaño' }),
    S('¿Cuáles son ciertas?', [['1/3 = 0.333…', 1], ['0.4545… es racional', 1], ['7/0 = 0', 0], ['−5 es racional', 1], ['0.25 = 1/25', 0]], 'Un decimal que termina o se repite es racional, y no se divide entre cero.', 'Intenta escribir cada número como división de enteros.'),
    V('Salta hasta el numerador que falta.', 0, 24, [['$\\tfrac{3}{4} = \\tfrac{\\square}{20}$', 15, '\\tfrac34 = \\tfrac{15}{20}'], ['$\\tfrac{2}{7} = \\tfrac{\\square}{21}$', 6, '\\tfrac27 = \\tfrac{6}{21}'], ['$1.5 = \\tfrac{\\square}{8}$', 12, '\\tfrac32 = \\tfrac{12}{8}']], 'Arriba y abajo se multiplican por lo mismo.', 'Mira por cuánto se multiplicó abajo y haz lo mismo arriba.'),
  ]);
  leccion('alg-11c', 'rana', [
    T('¿Cuáles números son **irracionales**?', [['√3', 1], ['√16', 0], ['π', 1], ['0.777…', 0], ['√10', 1], ['22/7', 0]], 'Las raíces no exactas y π no se pueden escribir como fracción.', 'Descarta los que son fracción, decimal periódico o raíz exacta.'),
    M('Lleva el punto al **entero** que está justo antes de $\\sqrt{40}$.', 'recta', [['x', 0, 10, 'entero']], { x: 0 }, { x: 6 }, '$6^2 = 36 < 40 < 49 = 7^2$.', 'Busca el mayor entero cuyo cuadrado no pasa de 40.', { r: [0, 10], paso: 1 }),
    F('Pon cada número en su familia **más pequeña**.', 'texto', ['−√25', '0.1212…', '√11'], ['entero', 'racional', 'irracional'], ['natural', 'real'], '$-\\sqrt{25} = -5$; el periódico es fracción; $\\sqrt{11}$ no es exacta.', 'Calcula las raíces exactas antes de decidir.', { cap: 'ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ' }),
    F('Ordena de menor a mayor.', 'recta', ['1.º', '2.º', '3.º'], ['1.7', '√3', '7/4'], [], '$\\sqrt3 \\approx 1.732$ y $\\tfrac74 = 1.75$.', 'Eleva cada uno al cuadrado y compara.', { r: [1, 2], paso: 1 }),
    S('¿Cuáles son ciertas?', [['entre dos racionales distintos hay otro', 1], ['√2 + √2 es irracional', 1], ['todo real es racional', 0], ['√2 · √2 es irracional', 0], ['π está entre 3 y 4', 1]], '$\\sqrt2 \\cdot \\sqrt2 = 2$ es racional; $2\\sqrt2$ no.', 'Haz la cuenta antes de decidir: ¿desaparece la raíz?'),
    M('La diagonal de un rectángulo de lados 1 y **2** mide $\\sqrt{\\square}$. Mueve el número.', 'recta', [['x', 1, 9, 'dentro de la raíz']], { x: 1 }, { x: 5 }, '$1^2 + 2^2 = 5$.', 'Pitágoras: suma los cuadrados de los lados.', { r: [0, 10], paso: 1 }),
    V('Salta al entero más **cercano** a cada número.', 0, 12, [['$\\sqrt{50}$', 7, '7^2 = 49'], ['$\\sqrt{80}$', 9, '9^2 = 81'], ['$\\pi$', 3, '\\pi \\approx 3.14']], 'El cuadrado más próximo dice el entero.', 'Busca el cuadrado perfecto que queda más cerca.'),
  ]);
  leccion('alg-12b', 'rana', [
    M('Con **6** columnas en el primer bloque y 3 filas, agrega columnas hasta tener **30** cuadros.', 'dosreja', [['c', 1, 7, 'columnas']], { c: 1 }, { c: 4 }, '$3(6 + 4) = 30$.', '¿Cuántas columnas de 3 hacen 30? Ya hay seis.', { a: 3, b: 6 }),
    F('Agrupa para calcular fácil: $4 \\cdot 37 \\cdot 25$. Pon la pareja y el resultado.', 'factores', ['4 · 25', 'por 37'], ['100', '3700'], ['148', '925', '137'], '$(4 \\cdot 25) \\cdot 37 = 3700$.', 'Cambia el orden y multiplica primero los que dan cien.', { l: ['4', '37', '25'] }),
    T('¿Cuáles cuentas dan lo mismo si se **cambia el orden**?', [['9 + 4', 1], ['9 − 4', 0], ['9 · 4', 1], ['12 ÷ 4', 0]], 'Suma y producto son conmutativos; resta y división, no.', 'Escríbelas al revés y calcula.'),
    F('Pon lo que **deshace** cada operación.', 'texto', ['+ 9', '· 4/7', '· (−3)'], ['− 9', '· 7/4', '· (−1/3)'], ['· 9', '· 3', '− 4/7'], 'A una suma la deshace el opuesto y a un producto, el recíproco.', 'El recíproco voltea la fracción y conserva el signo.', { cap: 'inversos' }),
    F('Usa la distributiva: $6 \\cdot 98 = 6(100 - 2)$. Pon los dos productos y el resultado.', 'texto', ['6 · 100', '6 · 2', 'resultado'], ['600', '12', '588'], ['598', '606', '612'], '$600 - 12 = 588$.', 'El 6 multiplica a los dos; después se resta.', { cap: '6 · 100 − 6 · 2' }),
    S('¿Cuáles son ciertas?', [['a + 0 = a', 1], ['0 tiene recíproco', 0], ['a · 1 = a', 1], ['a(b + c) = ab + c', 0], ['(a + b) + c = a + (b + c)', 1]], 'Neutros, asociativa… y la distributiva llega a los dos términos.', 'Prueba con números pequeños, como 2, 3 y 4.'),
    V('Salta al número que falta.', -10, 10, [['$5 + \\square = 0$', -5, '5 + (-5) = 0'], ['$4(x + 2) = 4x + \\square$', 8, '4 \\cdot 2 = 8'], ['$\\tfrac16 \\cdot \\square = 1$', 6, '\\tfrac16 \\cdot 6 = 1']], 'Opuesto, distributiva y recíproco.', 'Piensa qué deja 0 en la suma y qué deja 1 en el producto.'),
  ]);
  leccion('alg-12c', 'rana', [
    M('Lleva el punto a $(-3)(-3)$.', 'recta', [['x', -10, 10, 'resultado']], { x: -3 }, { x: 9 }, 'Dos vueltas dejan la flecha en positivo.', 'Cada factor negativo voltea la flecha una vez.', { de: 0 }),
    F('Pon el resultado con su signo.', 'texto', ['−12 ÷ 3', '(−5)(4)', '−18 ÷ (−6)'], ['−4', '−20', '3'], ['4', '20', '−3'], 'Signos iguales, positivo; distintos, negativo.', 'Mira cuántos signos menos hay en cada cuenta.', { cap: 'signos' }),
    F('Cambia cada división por un producto y calcula.', 'texto', ['10 ÷ 1/3', '9 ÷ 3/2', '1/2 ÷ 4'], ['30', '6', '1/8'], ['10/3', '27/2', '2'], 'Se multiplica por el recíproco.', 'Voltea el segundo número y multiplica.', { cap: 'a ÷ b = a · 1/b' }),
    T('¿Cuáles productos son **negativos**?', [['(−1)(−4)', 0], ['(−2)(7)', 1], ['(−1)³', 1], ['(−3)(0)', 0], ['5 · (−6)', 1], ['(−2)(−2)(−2)', 1]], 'Con una cantidad impar de negativos, y sin cero.', 'Cuenta los factores negativos y cuidado con el cero.'),
    F('$(x + 4)(x - 9) = 0$. Pon las soluciones, la menor primero.', 'recta', ['menor', 'mayor'], ['−4', '9'], ['4', '−9', '0'], 'Un producto es 0 si algún factor lo es.', 'Iguala cada paréntesis a cero.'),
    S('¿Cuáles pasos son válidos?', [['de 5x = 5y se sigue x = y', 1], ['de 0x = 0y se sigue x = y', 0], ['de ab = 0 se sigue a = 0 o b = 0', 1], ['a − b = a + (−b)', 1]], 'Se cancela lo que no es cero.', 'Prueba con x = 2 y y = 7 en el que tiene ceros.'),
    V('Salta al resultado de cada cuenta.', -12, 12, [['$(-4)(3) + 5$', -7, '-12 + 5 = -7'], ['$-8 \\div (-2)$', 4, '-8 \\div (-2) = 4'], ['$-2(1 - 6)$', 10, '-2 \\cdot (-5) = 10']], 'Primero los productos y los paréntesis.', 'Resuelve el paréntesis o el producto antes de sumar.'),
  ]);
  leccion('alg-12d', 'rana', [
    M('Arma $|x - 1| \\le 6$: pon centro y distancia.', 'tramo', [['c', -5, 5, 'centro'], ['r', 1, 8, 'distancia']], { c: 0, r: 1 }, { c: 1, r: 6 }, 'De $-5$ a $7$.', 'El centro es lo que se resta a x; la distancia, el otro número.'),
    F('Pon el signo que va entre los dos.', 'recta', ['−9 □ −4', '−2(−9) □ −2(−4)', '−9 + 5 □ −4 + 5'], ['<', '>', '<'], ['=', '>'], 'Multiplicar por un negativo voltea; sumar, no.', 'Calcula los dos lados y ubícalos en la recta.', { pts: [-9, -4] }),
    T('¿Cuáles números cumplen $-2x < 6$?', [['−5', 0], ['0', 1], ['−3', 0], ['4', 1], ['−2', 1]], '$x > -3$: se volteó al dividir entre $-2$.', 'Prueba cada número en la desigualdad.'),
    F('Pon cada valor absoluto.', 'recta', ['|−6|', '|4 − 9|', '−|3|'], ['6', '5', '−3'], ['−6', '−5', '3'], 'El valor absoluto es una distancia; el menos de afuera se queda.', 'Calcula adentro, toma la distancia y después mira lo de afuera.'),
    M('Los números que están a lo más a distancia **r** de $-2$ van de **−9** a **5**. Mueve r.', 'tramo', [['r', 1, 8, 'distancia']], { c: -2, r: 1 }, { r: 7 }, 'De $-2$ a 5 hay siete.', 'Cuenta desde el centro hasta cualquiera de los bordes.'),
    S('¿Cuáles son ciertas?', [['|x| = 4 tiene dos soluciones', 1], ['|x| = −4 tiene dos soluciones', 0], ['si a < b entonces −a > −b', 1], ['|a − b| = |b − a|', 1]], 'Una distancia no es negativa y no depende del orden.', 'Piensa en distancias sobre la recta.'),
    V('Salta a la solución o al borde que se pide.', -10, 12, [['$|x - 3| = 5$, la mayor', 8, '3 + 5 = 8'], ['$|x + 1| = 6$, la menor', -7, '-1 - 6 = -7'], ['$3x - 4 > 11$: x es mayor que', 5, '3x > 15']], 'Centro más o menos la distancia.', 'Ubica el centro y camina la distancia a cada lado.'),
  ]);

  // ============================================================================================= 3 · Proporciones
  leccion('alg-12', 'tanque', [
    M('Una limonada lleva 12 vasos de agua. La razón agua a limón es **4 : 1**. Pon el limón.', 'bolas', [['b', 1, 10, 'limón']], { b: 1 }, { b: 3 }, '$12 : 3 = 4 : 1$.', '¿Cuántas veces cabe el 4 en 12?', { a: 12, M: 13 }),
    F('La razón de niñas a niños es **4 : 3** y hay **35** en total. Completa.', 'barra', ['una parte', 'niñas', 'niños'], ['5', '20', '15'], ['7', '28', '12'], 'Siete partes de 5.', 'Suma las partes y reparte el total.', { segs: [[4, 'niñas', 'fa'], [3, 'niños', 'fg']] }),
    T('¿Cuáles razones equivalen a **6 : 9**?', [['2 : 3', 1], ['9 : 6', 0], ['10 : 15', 1], ['12 : 15', 0], ['4 : 6', 1], ['7 : 10', 0]], 'Todas las que se simplifican a 2 : 3.', 'Simplifica dividiendo los dos por lo mismo. Sumar no conserva la razón.'),
    F('¿Qué fracción **del total** es cada parte si la razón es **5 : 2**?', 'barra', ['primera', 'segunda'], ['5/7', '2/7'], ['5/2', '2/5', '1/7'], 'El total son siete partes.', 'Compara con todas las partes, no con la otra.', { segs: [[5, '5', 'fa'], [2, '2', 'fg']] }),
    F('Un grifo da **84 litros** en 12 minutos. Pon los litros por minuto y en 5 minutos.', 'barra', ['por minuto', 'en 5 min'], ['7', '35'], ['72', '420', '12'], '$84 \\div 12 = 7$.', 'Reparte los litros entre los minutos.', { segs: Array.from({ length: 12 }, () => [1, '', 'fa']) }),
    S('¿Cuáles son ciertas si la razón de A a B es 3 : 4?', [['A es 3/4 de B', 1], ['A es 3/4 del total', 0], ['B es 4/7 del total', 1], ['A y B se diferencian siempre en 1', 0]], 'De la razón salen dos comparaciones: entre partes y con el total.', 'Imagina 30 y 40. ¿Cuáles fallan?'),
    V('Llena el tanque hasta la marca con la respuesta.', 0, 40, [['5 : 8 = 15 : □', 24, '8 \\cdot 3 = 24'], ['2 : 3, total 25. ¿La menor?', 10, '25 \\div 5 \\cdot 2 = 10'], ['90 km en 3 h: km por hora', 30, '90 \\div 3 = 30']], 'Busca cuánto vale una parte.', 'Multiplica los dos por lo mismo, o halla una parte.'),
  ]);
  leccion('alg-12e', 'tanque', [
    F('Completa: $\\tfrac{8}{12} = \\tfrac{x}{27}$.', 'texto', ['8 · 27', 'x'], ['216', '18'], ['96', '23', '36'], '$x = \\tfrac{216}{12} = 18$.', 'Multiplica en cruz y divide entre 12.', { cap: '8 · 27 = 12 · x' }),
    M('Mueve la pendiente: con **4** cajas se pagan **10** miles.', 'linea2', [['m', 0.5, 3, 'miles por caja', 0.5]], { m: 0.5 }, { m: 2.5 }, '$10 \\div 4 = 2.5$ por caja.', 'Divide lo que se paga entre las cajas.', { b: 0, ej: [0, 8, 0, 12], gy: 2 }),
    T('¿Cuáles son **inversas** (más de una, menos de la otra)?', [['obreros y días', 1], ['kilos y precio', 0], ['velocidad y tiempo', 1], ['lado y perímetro', 0], ['grifos y minutos', 1]], 'En las inversas el producto no cambia.', 'Pregunta: si una se duplica, ¿qué le pasa a la otra?'),
    M('El trabajo son **36** horas. Mueve las columnas (personas) hasta que tarden **4** horas.', 'reja', [['a', 1, 12, 'personas']], { a: 1 }, { a: 9 }, '$9 \\cdot 4 = 36$.', 'El producto de personas por horas no cambia.', { b: 4 }),
    F('Un árbol da **15 m** de sombra; a la misma hora, una vara de 2 m da **3 m**. Pon la razón de altura a sombra y la altura del árbol (m).', 'barra', ['razón', 'altura'], ['2/3', '10'], ['3/2', '22.5', '14'], '$\\tfrac23 \\cdot 15 = 10$.', 'La vara y su sombra dan la razón; el árbol conserva la misma.', { segs: [[2, 'vara', 'fa'], [3, 'sombra', 'fg']] }),
    S('y es directamente proporcional a x. ¿Cuáles son ciertas?', [['y/x no cambia', 1], ['x · y no cambia', 0], ['si x se triplica, y también', 1], ['la gráfica pasa por el origen', 1]], 'Cociente constante y recta por el origen.', 'Prueba con y = 5x y unos valores.'),
    V('Llena el tanque con la respuesta.', 0, 40, [['$\\tfrac{5}{6} = \\tfrac{x}{30}$', 25, '\\tfrac56 = \\tfrac{25}{30}'], ['6 grifos, 10 h. ¿Con 4 grifos?', 15, '60 \\div 4 = 15'], ['3 m valen 12. ¿8 m?', 32, '4 \\cdot 8 = 32']], 'Directa conserva el cociente; inversa, el producto.', 'Decide primero si al aumentar una sube o baja la otra.'),
  ]);
  leccion('alg-12f', 'tanque', [
    F('**9** cuadernos valen **54** mil. Pon lo que vale 1 y lo que valen 14 (miles).', 'barra', ['1', '14'], ['6', '84'], ['5', '59', '70'], '$54 \\div 9 = 6$ y $6 \\cdot 14 = 84$.', 'Primero cuánto vale uno.', { segs: Array.from({ length: 9 }, () => [1, '', 'fa']) }),
    F('**6** pintores tardan **10** días. Pon los días de uno y los de 4.', 'reja', ['1 pintor', '4 pintores'], ['60', '15'], ['40', '6.7', '24'], 'Son 60 días de trabajo.', 'Con menos pintores se demoran más.', { a: 6, b: 10 }),
    T('¿En cuáles se **multiplica primero** (regla de tres inversa)?', [['obreros y días', 1], ['litros y costo', 0], ['raciones y días', 1], ['copias y minutos', 0]], 'Cuando más de una trae menos de la otra.', 'Pregunta qué pasa con la otra si una aumenta.'),
    F('**5** máquinas en **6** horas hacen **240** piezas. Pon las de una en 1 h, y las de 3 en 4 h.', 'texto', ['una en 1 h', '3 en 4 h'], ['8', '96'], ['48', '40', '192'], '$240 \\div 30 = 8$ y $8 \\cdot 12 = 96$.', 'Cuenta primero cuántas horas de máquina son.', { cap: '5 · 6 = 30 horas de máquina' }),
    M('En un mapa **1 cm** son **4 km**. Mueve los centímetros para **28 km**.', 'recta', [['x', 0, 10, 'centímetros']], { x: 0 }, { x: 7 }, '$28 \\div 4 = 7$.', '¿Cuántas veces cabe 4 en 28?', { r: [0, 10], paso: 1 }),
    S('3 gatos comen 3 sobres en 3 días. ¿Cuáles son ciertas?', [['1 gato come 1 sobre en 3 días', 1], ['1 gato come 1 sobre en 1 día', 0], ['6 gatos comen 6 sobres en 3 días', 1], ['3 gatos comen 6 sobres en 6 días', 1]], 'Cada gato come un sobre en tres días.', 'Halla lo que come un gato y arma lo demás.'),
    V('Llena el tanque con la respuesta.', 0, 60, [['4 panes valen 10. ¿12 panes?', 30, '3 \\cdot 10 = 30'], ['8 obreros, 6 días. ¿3 obreros?', 16, '48 \\div 3 = 16'], ['2 llaves en 3 h dan 12. ¿5 en 4 h?', 40, '2 \\cdot 20 = 40']], 'Lleva todo a uno y vuelve a armar.', 'Halla lo que hace uno en una unidad de tiempo.'),
  ]);
  leccion('alg-13', 'tanque', [
    M('Pinta el porcentaje que vale $\\tfrac{9}{25}$.', 'cien', [['k', 0, 100, 'por ciento', 2]], { k: 0 }, { k: 36 }, '$\\tfrac{9}{25} = \\tfrac{36}{100}$.', 'Lleva la fracción a denominador cien.'),
    F('De **120** sillas. Pon cada parte.', 'barra', ['10 %', '5 %', '45 %'], ['12', '6', '54'], ['24', '45', '60'], '45 % son cuatro veces 12 y una de 6.', 'El 10 % es la décima parte; el 5 %, su mitad.', { segs: Array.from({ length: 10 }, () => [1, '', 'fa']) }),
    T('¿Cuáles equivalen al **75 %**?', [['3/4', 1], ['0.75', 1], ['7.5', 0], ['15/20', 1], ['75/10', 0], ['30 de 40', 1]], 'Todas son tres cuartos.', 'Pasa cada una a fracción de cien.'),
    M('**24** es el 60 % de un total. Mueve la barra del total.', 'dobleBarra', [['x', 20, 60, 'total', 5]], { x: 20 }, { x: 40 }, '$24 \\div 0.6 = 40$.', 'Si 24 es el 60 %, halla el 10 % primero.', { base: 24, T: 60, r1: '60 %: 24' }),
    F('**21** de **84** plantas florecieron. Pon la fracción y el porcentaje.', 'barra', ['fracción', 'por ciento'], ['1/4', '25 %'], ['1/3', '21 %', '63 %'], '$\\tfrac{21}{84} = \\tfrac14$.', 'Simplifica la fracción antes de pasarla a cien.', { segs: [[21, '21', 'fa'], [63, '', 'fc']] }),
    S('¿Cuáles son ciertas?', [['el 20 % de 50 es igual al 50 % de 20', 1], ['el 100 % de 8 es 100', 0], ['el 200 % de 6 es 12', 1], ['1 % es 1/10', 0]], 'Porcentaje es multiplicar: el orden no importa.', 'Calcula cada uno con cuidado.'),
    V('Llena el tanque con la respuesta.', 0, 60, [['15 % de 80', 12, '8 + 4 = 12'], ['¿qué % es 18 de 60?', 30, '\\tfrac{18}{60} = 30\\,\\%'], ['9 es el 18 % de…', 50, '9 \\div 0.18 = 50']], 'Parte, porcentaje o todo: se busca el que falta.', 'Usa el 10 % y el 5 %, o halla el 1 %.'),
  ]);
  leccion('alg-13c', 'tanque', [
    M('Un precio de **80** sube **25 %**. Mueve la barra del nuevo.', 'dobleBarra', [['x', 60, 120, 'nuevo', 5]], { x: 60 }, { x: 100 }, '$80 \\cdot 1.25 = 100$.', 'La cuarta parte de 80 se agrega.', { base: 80, T: 120 }),
    F('Pon el factor de cada cambio.', 'texto', ['sube 8 %', 'baja 45 %', 'baja 5 %'], ['1.08', '0.55', '0.95'], ['0.45', '1.8', '0.05'], 'El factor dice cuánto queda de cada uno.', 'Suma o resta al 100 % y pasa a decimal.', { cap: 'lo que queda' }),
    F('Pasó de **60** a **75**. Pon cuánto subió y el porcentaje.', 'barra', ['subió', 'por ciento'], ['15', '25 %'], ['20 %', '75', '15 %'], '$\\tfrac{15}{60} = 25\\,\\%$.', 'Compara el cambio con lo de antes.', { segs: [[60, '60', 'fa'], [15, '', 'fg']] }),
    T('¿Cuáles factores son de **descuento**?', [['0.7', 1], ['1.3', 0], ['0.99', 1], ['1.01', 0], ['0.5', 1]], 'Los menores que 1 dejan menos que antes.', 'Compara con 1: ¿queda más o menos?'),
    F('Tras bajar **20 %**, una camisa vale **72** mil. Pon el factor y el precio de antes.', 'texto', ['factor', 'antes'], ['0.8', '90'], ['0.2', '86.4', '92'], '$72 \\div 0.8 = 90$.', '72 es el 80 %, no el 100 %.', { cap: 'antes · factor = 72' }),
    S('¿Cuáles son ciertas?', [['subir 50 % es multiplicar por 1.5', 1], ['bajar 100 % deja 0', 1], ['de 40 a 50 sube 20 %', 0], ['pagar el 70 % es ahorrar 30 %', 1]], 'De 40 a 50 sube la cuarta parte: 25 %.', 'Mira contra qué número se compara.'),
    V('Llena el tanque con el precio final.', 0, 100, [['50 sube 30 %', 65, '50 \\cdot 1.3 = 65'], ['80 baja 25 %', 60, '80 \\cdot 0.75 = 60'], ['antes, si con −50 % quedó en 45', 90, '45 \\div 0.5 = 90']], 'Multiplica por el factor; hacia atrás, divide.', 'Escribe el factor de cada cambio.', 5),
  ]);
  leccion('alg-13d', 'tanque', [
    M('Primero baja a la mitad (50). Mueve el segundo factor para terminar en **60**.', 'cascada', [['f2', 0.5, 1.5, 'segundo factor', 0.1]], { f2: 1 }, { f2: 1.2 }, '$50 \\cdot 1.2 = 60$.', '¿Por cuánto se multiplica 50 para dar 60?', { f1: 0.5 }),
    F('De 100: sube **10 %** y luego sube **20 %**. Pon cada valor.', 'cascada', ['primero', 'segundo'], ['110', '132'], ['130', '120', '112'], '$110 \\cdot 1.2 = 132$, no 130.', 'El segundo aumento es sobre 110.', { f1: 1.1, f2: 1.2, ve: 1 }),
    F('Sube **40 %** y baja **40 %**. Pon el factor total y el cambio.', 'texto', ['factor', 'cambio'], ['0.84', '−16 %'], ['1', '0 %', '1.16'], '$1.4 \\cdot 0.6 = 0.84$.', 'Multiplica los dos factores.', { cap: '1.4 · 0.6' }),
    T('¿Cuáles dejan **menos** que al comienzo?', [['+15 % y −15 %', 1], ['−50 % y +100 %', 0], ['−20 % y +20 %', 1], ['+100 % y −50 %', 0], ['+25 % y −20 %', 0]], 'Se comparan los productos de factores con 1.', 'Multiplica los factores de cada pareja.'),
    M('Un valor se triplica en cada paso desde **1**. ¿En cuántos pasos llega a **81**?', 'torre', [['e', 0, 5, 'pasos']], { e: 0 }, { e: 4 }, '$3^4 = 81$.', 'Multiplica por tres una y otra vez.', { b: 3 }),
    S('¿Cuáles son ciertas?', [['−30 % y −30 % es −60 %', 0], ['−30 % y −30 % es −51 %', 1], ['el orden de los cambios no importa', 1], ['+20 % dos veces es +44 %', 1]], '$0.7 \\cdot 0.7 = 0.49$ y $1.2 \\cdot 1.2 = 1.44$.', 'Multiplica los factores y compara con 1.'),
    V('De 100, llena con lo que queda.', 0, 100, [['−40 % y −50 %', 30, '0.6 \\cdot 0.5 = 0.3'], ['+50 % y −50 %', 75, '1.5 \\cdot 0.5 = 0.75'], ['−10 % y −10 %', 81, '0.9 \\cdot 0.9 = 0.81']], 'Multiplica los factores.', 'El segundo cambio es sobre lo que dejó el primero.', 1),
  ]);
}
;
//#archivo js/alg-practica-2.js
// Ejercicios de Álgebra, mundos 4 (Exponentes y Radicales), 5 (Sucesiones y Series) y 6 (Álgebra de Polinomios). Ver alg-practica.js.
{
  const { M, F, T, S, V, leccion } = AP;
  // ============================================================================================= 4 · Potencias y raíces
  leccion('alg-21a', 'cohete', [
    M('¿Qué exponente hace que la torre de **4** llegue a **64**?', 'torre', [['e', 0, 4, 'exponente']], { e: 0 }, { e: 3 }, '$4 \\cdot 4 \\cdot 4 = 64$.', 'Multiplica por cuatro una y otra vez.', { b: 4 }),
    F('Pon el resultado de cada potencia.', 'factores', ['5³', '(−6)²', '−6²'], ['125', '36', '−36'], ['15', '−12', '12'], 'El paréntesis mete el signo en la potencia.', 'Escribe los factores uno por uno.', { l: ['5', '5', '5'] }),
    T('¿Cuáles potencias son **negativas**?', [['(−2)⁵', 1], ['(−7)²', 0], ['−3⁴', 1], ['(−1)¹⁰', 0], ['(−4)³', 1], ['5⁻²', 0]], 'Impar con base negativa, o el menos afuera.', 'Cuenta los factores negativos; el exponente negativo no cambia el signo.'),
    F('Pon cada potencia como fracción o entero.', 'texto', ['3⁻²', '8⁰', '(2/5)⁻¹'], ['1/9', '1', '5/2'], ['−9', '0', '2/5'], 'El exponente negativo invierte; el cero da 1.', 'Voltea la base cuando el exponente es negativo.', { cap: 'a⁻ⁿ = 1/aⁿ' }),
    M('Una bacteria se duplica cada hora. Desde **1**, ¿en cuántas horas hay **32**?', 'torre', [['e', 0, 6, 'horas']], { e: 1 }, { e: 5 }, 'Cinco duplicaciones: $2^5 = 32$.', 'Duplica contando las horas.', { b: 2 }),
    S('¿Cuáles igualdades con potencias son ciertas?', [['2⁴ = 4²', 1], ['3² = 2³', 0], ['10⁻³ = 0.001', 1], ['(−6)⁰ = −1', 0], ['1⁵⁰ = 50', 0]], '$2^4 = 16 = 4^2$.', 'Calcula los dos lados de cada una.'),
    V('Lanza el cohete con el **exponente** que falta.', -4, 8, [['$2^{\\square} = 128$', 7, '2^7 = 128'], ['$4^{\\square} = \\tfrac{1}{16}$', -2, '4^{-2} = \\tfrac{1}{16}'], ['$7^{\\square} = 1$', 0, '7^0 = 1']], 'El exponente cuenta factores; si divide, es negativo.', 'Pregunta cuántas veces se multiplica la base.'),
  ]);
  leccion('alg-21b', 'cohete', [
    F('Pon el exponente que queda.', 'factores', ['x⁵ · x²', 'x¹¹ ÷ x⁴', '(x⁵)²'], ['7', '7', '10'], ['25', '15', '3'], 'Juntar suma, quitar resta y repetir multiplica.', 'Escribe los factores y cuéntalos.', { l: ['x', 'x', 'x', 'x', 'x', 'x', 'x'], k: 5 }),
    F('$(3x^2y)^3$: pon el número y los exponentes.', 'factores', ['número', 'x a la', 'y a la'], ['27', '6', '3'], ['9', '5', '1'], 'El 3 entra a cada factor.', 'Repite el paquete tres veces y cuenta.', { l: ['3', 'x²', 'y'] }),
    T('¿Cuáles son iguales a $x^6$?', [['x² · x³', 0], ['(x³)²', 1], ['x⁹ ÷ x³', 1], ['x³ + x³', 0], ['x⁻² · x⁸', 1], ['(x²)⁴', 0]], 'Se comparan los exponentes: suma, producto o resta.', 'Suma al juntar, multiplica al repetir.'),
    F('Escribe cada número en notación científica: pon el exponente del 10.', 'texto', ['48 000', '0.0009', '3.1 millones'], ['4', '−4', '6'], ['5', '−3', '3'], '$4.8 \\cdot 10^4$, $9 \\cdot 10^{-4}$ y $3.1 \\cdot 10^6$.', 'Cuenta los puestos que corre la coma.', { cap: 'a · 10 a la …' }),
    M('Un cubo de arista $2^2$. ¿A qué potencia de 2 equivale su **volumen**?', 'torre', [['e', 0, 7, 'exponente']], { e: 2 }, { e: 6 }, '$(2^2)^3 = 2^6$.', 'La arista se multiplica tres veces.', { b: 2 }),
    S('¿Cuáles leyes están bien aplicadas?', [['(a + b)² = a² + b²', 0], ['(ab)³ = a³b³', 1], ['a² · b² = (ab)⁴', 0], ['a⁵/a⁵ = 1', 1], ['(a/b)² = a²/b²', 1]], 'El exponente entra a productos y cocientes, no a sumas.', 'Prueba con a = 2 y b = 3.'),
    V('Lanza con el exponente que falta.', -6, 12, [['$x^8 \\cdot x^{\\square} = x^3$', -5, '8 - 5 = 3'], ['$(x^{\\square})^4 = x^{12}$', 3, '3 \\cdot 4 = 12'], ['$\\tfrac{x^2}{x^{-5}} = x^{\\square}$', 7, '2 + 5 = 7']], 'Plantea la suma, la resta o el producto de exponentes.', 'Restar un exponente negativo es sumar.'),
  ]);
  leccion('alg-22a', 'cohete', [
    M('Un tablero cuadrado tiene **64** casillas. Mueve el lado.', 'cuadrado', [['s', 1, 10, 'lado']], { s: 1 }, { s: 8 }, '$8 \\cdot 8 = 64$.', 'Busca el número que por sí mismo da 64.'),
    F('Pon el valor de cada raíz.', 'texto', ['√144', '∜16', '³√−64'], ['12', '2', '−4'], ['72', '4', '8'], '$12^2$, $2^4$ y $(-4)^3$.', 'Pregunta qué número elevado al índice da el de adentro.', { cap: '¿qué número elevado?' }),
    F('Pon el resultado de cada exponente fraccionario.', 'texto', ['25^½', '64^⅔', '32^⅖'], ['5', '16', '4'], ['12.5', '8', '64'], 'Abajo va el índice y arriba la potencia.', 'Saca primero la raíz y después eleva.', { cap: 'raíz y luego potencia' }),
    T('¿Cuáles **no existen** en los reales?', [['√−9', 1], ['³√−27', 0], ['√0', 0], ['∜−16', 1], ['−√9', 0]], 'Índice par con número negativo adentro.', 'Mira el índice y el signo de adentro.'),
    S('¿Cuáles igualdades con raíces son ciertas?', [['√(9 · 49) = 3 · 7', 1], ['√(25 + 144) = 5 + 12', 0], ['√(x²) = |x|', 1], ['√(25/4) = 5/2', 1]], 'La raíz se reparte en productos y cocientes, no en sumas.', 'Calcula los dos lados por separado.'),
    M('Un cubo tiene volumen **216**. La escena dibuja una de sus caras: mueve la arista.', 'cuadrado', [['s', 1, 9, 'arista']], { s: 2 }, { s: 6 }, '$6^3 = 216$.', 'Busca el número que tres veces como factor da 216.'),
    V('Lanza con el resultado.', -6, 20, [['$\\sqrt{9 \\cdot 16}$', 12, '3 \\cdot 4 = 12'], ['$\\sqrt{25 - 9}$', 4, '\\sqrt{16} = 4'], ['$\\sqrt[3]{-125}$', -5, '(-5)^3 = -125']], 'Con sumas o restas, primero lo de adentro.', 'Solo los productos se pueden separar.'),
  ]);
  leccion('alg-22b', 'cohete', [
    F('$\\sqrt{75}$ simplificada al máximo: pon lo de afuera y lo de adentro.', 'factores', ['afuera', 'adentro'], ['5', '3'], ['25', '15'], '$\\sqrt{25 \\cdot 3} = 5\\sqrt3$.', 'De cada pareja de factores iguales sale uno.', { l: ['3', '5', '5'] }),
    F('$\\sqrt{45} + \\sqrt{20}$: simplifica cada una y suma.', 'texto', ['√45', '√20', 'suma'], ['3√5', '2√5', '5√5'], ['√65', '9√5', '5√10'], 'Tres y dos de $\\sqrt5$.', 'Busca el cuadrado que divide a cada número.', { cap: 'las mismas por dentro' }),
    T('¿Cuáles ya están **simplificadas**?', [['√15', 1], ['√28', 0], ['2√7', 1], ['√49', 0], ['3√8', 0], ['√30', 1]], 'Sin parejas de factores adentro.', 'Descompón cada una: ¿hay algún factor repetido?'),
    F('Racionaliza $\\tfrac{10}{\\sqrt5}$: pon el denominador que queda al multiplicar y el resultado.', 'texto', ['abajo', 'resultado'], ['5', '2√5'], ['25', '10√5', '√2'], '$\\tfrac{10\\sqrt5}{5} = 2\\sqrt5$.', 'Multiplica arriba y abajo por la misma raíz.', { cap: '10/√5 · √5/√5' }),
    F('Racionaliza $\\tfrac{6}{\\sqrt7 - 1}$: pon el conjugado, el denominador y el resultado.', 'texto', ['conjugado', 'abajo', 'resultado'], ['√7 + 1', '6', '√7 + 1'], ['√7 − 1', '8', '√8'], '$(\\sqrt7)^2 - 1^2 = 6$.', 'El conjugado cambia el signo de en medio.', { cap: 'diferencia de cuadrados' }),
    S('¿Cuáles pasos con radicales son válidos?', [['2√3 + 4√3 = 6√3', 1], ['√2 + √5 = √7', 0], ['√6 · √6 = 6', 1], ['4√3 = √48', 1]], 'Se suman iguales; los productos se juntan.', 'Para meter un número a la raíz, elévalo al cuadrado.'),
    V('Lanza con el número que falta.', 0, 20, [['$\\sqrt{18} = \\square\\sqrt2$', 3, '\\sqrt{9 \\cdot 2} = 3\\sqrt2'], ['$7\\sqrt3 - 2\\sqrt3 = \\square\\sqrt3$', 5, '7 - 2 = 5'], ['$(\\sqrt{10} + 1)(\\sqrt{10} - 1)$', 9, '10 - 1 = 9']], 'Saca parejas, resta iguales y usa el conjugado.', 'Busca el cuadrado escondido en cada raíz.'),
  ]);

  // ============================================================================================= 5 · Sucesiones
  leccion('alg-14', 'puente', [
    M('El primero es **2** y suma siempre lo mismo. Mueve la diferencia para que el **sexto** sea **27**.', 'escalera', [['d', 1, 8, 'diferencia']], { d: 1 }, { d: 5 }, '$2 + 5 \\cdot 5 = 27$.', 'De la primera a la sexta hay cinco saltos.', { a: 2, n: 6, top: 42 }),
    F('En 8, 14, 20, 26… pon la diferencia y el término **15**.', 'escalera', ['diferencia', 'término 15'], ['6', '92'], ['98', '90', '14'], '$8 + 14 \\cdot 6 = 92$.', 'Un salto menos que el puesto.', { a: 8, d: 6, n: 4, ver: [0, 1, 2, 3] }),
    T('¿Cuáles son **aritméticas**?', [['3, 7, 11, 15', 1], ['2, 4, 8, 16', 0], ['9, 5, 1, −3', 1], ['1, 4, 9, 16', 0], ['½, 1, 1½, 2', 1]], 'Entre vecinos se suma siempre lo mismo.', 'Resta cada término del que sigue.'),
    F('El tercero es 10 y el séptimo, 34. Pon los saltos, la diferencia y el primero.', 'recta', ['saltos', 'd', 'primero'], ['4', '6', '−2'], ['24', '7', '2'], '$24 \\div 4 = 6$ y $10 - 12 = -2$.', 'Del tercero al séptimo; luego dos saltos hacia atrás.', { r: [1, 9], paso: 1, pts: [3, 7] }),
    F('¿En qué puesto está el **60** en 4, 11, 18, …? Pon los saltos y el puesto.', 'escalera', ['saltos', 'puesto'], ['8', '9'], ['7', '56', '10'], 'Faltan 56, de a siete.', 'Cuenta los saltos y recuerda el primero.', { a: 4, d: 7, n: 4, ver: [0, 1, 2] }),
    S('Para $a_n = 5n - 2$, ¿cuáles son ciertas?', [['a₁ = 3', 1], ['la diferencia es −2', 0], ['a₁₀ = 48', 1], ['el 20 está en la lista', 0]], 'La diferencia es 5; $5n - 2 = 20$ no da entero.', 'Cambia n por cada puesto.'),
    V('Extiende el puente con la respuesta.', -10, 50, [['$a_1 = 3$, $d = 4$: ¿$a_{10}$?', 39, '3 + 9 \\cdot 4 = 39'], ['20, 17, 14, …: ¿$a_{9}$?', -4, '20 - 8 \\cdot 3 = -4'], ['$a_5 = 22$, $d = 3$: ¿$a_1$?', 10, '22 - 12 = 10']], 'Primero más los saltos.', 'Cuenta saltos, no términos.'),
  ]);
  leccion('alg-14b', 'puente', [
    F('$4 + 9 + 14 + \\cdots + 49$ tiene 10 términos. Pon primero más último y la suma.', 'escalera', ['1.º + último', 'suma'], ['53', '265'], ['530', '45', '490'], '$\\tfrac{10 \\cdot 53}{2} = 265$.', 'Diez columnas de ese alto, y la mitad.', { a: 4, d: 5, n: 6, ver: [0, 1, 2] }),
    F('$12 + 15 + \\cdots + 60$. Pon los saltos, los términos y la suma.', 'texto', ['saltos', 'términos', 'suma'], ['16', '17', '612'], ['15', '576', '48'], '$\\tfrac{17 \\cdot 72}{2} = 612$.', 'De 12 a 60 de a tres; hay un término más que saltos.', { cap: '12, 15, 18, …, 60' }),
    M('Siete términos en progresión aritmética van de **3** a **27**. Mueve la diferencia.', 'escalera', [['d', 1, 8, 'diferencia']], { d: 1 }, { d: 4 }, '$24 \\div 6 = 4$; y suman $7 \\cdot 15 = 105$.', 'Siete términos tienen seis saltos.', { a: 3, n: 7, top: 51 }),
    T('¿Cuáles sumas dan **más de 100**?', [['1 + 2 + … + 14', 1], ['2 + 4 + … + 18', 0], ['10 con promedio 11', 1], ['1 + 3 + … + 19', 0]], 'La primera es 105; la tercera, 110.', 'Multiplica la cantidad por el promedio.'),
    F('Los primeros **n** impares suman $n^2$. Pon cada suma.', 'cuadrado', ['1+3+5+7', 'primeros 9'], ['16', '81'], ['18', '17', '90'], '$4^2$ y $9^2$.', 'Cuenta cuántos impares son y eleva al cuadrado.', { s: 3 }),
    S('¿Cuáles son ciertas sobre sumas aritméticas?', [['1 + 2 + … + 100 = 5050', 1], ['suma = promedio · cantidad', 1], ['de 5 a 25 de 5 en 5 hay 4 términos', 0], ['si d = 0, la suma es n · a₁', 1]], 'De 5 a 25 de cinco en cinco hay cinco.', 'Cuenta los términos con cuidado.'),
    V('Extiende con la suma.', 0, 100, [['$1 + 2 + \\cdots + 12$', 78, '\\tfrac{12 \\cdot 13}{2} = 78'], ['$5 + 10 + 15 + 20 + 25$', 75, '5 \\cdot 15 = 75'], ['8 términos, de 2 a 16', 72, '\\tfrac{8 \\cdot 18}{2} = 72']], 'Cantidad por la suma de las puntas, a la mitad.', 'Suma el primero y el último.', 1),
  ]);
  leccion('alg-14c', 'puente', [
    M('Empieza en **4** y el **tercero** es **100**. Mueve la razón.', 'escalera', [['d', 1, 6, 'razón']], { d: 1 }, { d: 5 }, '$4 \\cdot 5^2 = 100$.', 'Divide 100 entre 4: es la razón al cuadrado.', { geo: 1, a: 4, n: 3, top: 110 }),
    F('En 3, 12, 48… pon la razón y el quinto término.', 'escalera', ['razón', 'quinto'], ['4', '768'], ['9', '192', '84'], '$3 \\cdot 4^4 = 768$.', 'Cuatro saltos hasta el quinto.', { geo: 1, a: 3, d: 4, n: 3, ver: [0, 1, 2] }),
    T('¿Cuáles son **geométricas**?', [['5, 10, 20, 40', 1], ['5, 10, 15, 20', 0], ['81, 27, 9, 3', 1], ['2, −6, 18, −54', 1], ['1, 4, 9, 16', 0]], 'El cociente entre vecinos no cambia.', 'Divide cada término entre el anterior.'),
    F('El segundo es 15 y el quinto, 405. Pon $r^3$, r y el primero.', 'recta', ['r³', 'r', 'primero'], ['27', '3', '5'], ['390', '9', '45'], '$405 \\div 15 = 27$.', 'Tres saltos multiplicando.', { r: [1, 6], paso: 1, pts: [2, 5] }),
    F('Pon dos términos entre **7** y **56** para que la lista sea geométrica.', 'escalera', ['segundo', 'tercero'], ['14', '28'], ['21', '23', '39'], '$r^3 = 8$: razón 2.', 'De 7 a 56 se multiplica tres veces por lo mismo.', { geo: 1, a: 7, d: 2, n: 4, top: 60, ver: [0, 3] }),
    S('¿Cuáles son ciertas en una geométrica?', [['con r = 1 todos son iguales', 1], ['con r negativa alternan de signo', 1], ['con 0 < r < 1 crecen', 0], ['aₙ = a₁ · rⁿ', 0]], 'El exponente es $n - 1$ y entre 0 y 1 se encogen.', 'Prueba con 8 y razón un medio.'),
    V('Extiende con la respuesta.', -30, 70, [['$a_1 = 1$, $r = 4$: ¿$a_4$?', 64, '4^3 = 64'], ['$a_1 = 48$, $r = \\tfrac12$: ¿$a_5$?', 3, '48 \\div 16 = 3'], ['$a_1 = -3$, $r = -2$: ¿$a_4$?', 24, '-3 \\cdot (-8) = 24']], 'El primero por la razón a los saltos.', 'Multiplica un salto a la vez.'),
  ]);
  leccion('alg-14d', 'puente', [
    F('$S = 5 + 10 + 20 + 40$. Multiplica por 2 y resta: pon el que sobra y S.', 'escalera', ['sobra', 'S'], ['80', '75'], ['40', '70', '150'], '$2S - S = 80 - 5$.', 'El siguiente sería 80; quita el primero.', { geo: 1, a: 5, d: 2, n: 4, ver: [0, 1, 2, 3] }),
    F('$20 + 10 + 5 + \\cdots$ infinita. Pon r, $1 - r$ y la suma.', 'cinta', ['r', '1 − r', 'suma'], ['1/2', '1/2', '40'], ['2', '35', '30'], '$20 \\div \\tfrac12 = 40$.', 'El primero entre lo que le falta a r para 1.', { r: 0.5 }),
    T('¿Cuáles series infinitas **tienen suma**?', [['9 + 3 + 1 + …', 1], ['1 + 2 + 4 + …', 0], ['8 − 4 + 2 − …', 1], ['5 + 5 + 5 + …', 0], ['1 + 0.1 + 0.01 + …', 1]], 'Cuando la razón está entre −1 y 1.', 'Halla la razón de cada una.'),
    F('Pon cada decimal como fracción simplificada.', 'texto', ['0.777…', '0.1515…'], ['7/9', '5/33'], ['7/10', '15/100', '1/9'], '$\\tfrac{15}{99} = \\tfrac{5}{33}$.', 'El período sobre tantos nueves como cifras.', { cap: 'tantos nueves como cifras' }),
    M('La suma infinita $a_1 + \\tfrac{a_1}{3} + \\cdots$ es **18**. Mueve el primero.', 'escalera', [['a', 1, 18, 'primero']], { a: 1 }, { a: 12 }, '$12 \\div \\tfrac23 = 18$.', 'La suma es el primero entre lo que le falta a la razón para llegar a 1.', { geo: 1, d: 1 / 3, n: 5, top: 18, ver: [] }),
    S('¿Cuáles son ciertas sobre sumas geométricas?', [['1 + 2 + 4 + 8 = 15', 1], ['0.999… = 1', 1], ['si r = 1 la suma infinita es 1', 0], ['1/3 + 1/9 + 1/27 + … = 1/2', 1]], 'Con $r = 1$ los términos no se encogen: no hay suma.', 'En las infinitas, divide el primero entre 1 menos la razón.'),
    V('Extiende con la suma.', 0, 64, [['$1 + 3 + 9 + 27$', 40, '\\tfrac{81 - 1}{2} = 40'], ['$12 + 6 + 3 + \\cdots$', 24, '12 \\div \\tfrac12 = 24'], ['$1 + 2 + 4 + \\cdots + 32$', 63, '64 - 1 = 63']], 'Multiplica y resta, o divide entre $1 - r$.', 'Piensa cuál sería el siguiente término.'),
  ]);
  leccion('alg-15', 'puente', [
    F('$\\sum_{k=1}^{3}(5k - 2)$: pon los términos y la suma.', 'texto', ['k = 1', 'k = 2', 'k = 3', 'suma'], ['3', '8', '13', '24'], ['5', '30', '10'], '$3 + 8 + 13 = 24$.', 'Cambia k por cada número y suma.', { cap: 'Σ (5k − 2),  k de 1 a 3' }),
    F('$\\sum_{k=1}^{20}(2k + 3)$. La suma de 1 a 20 es 210. Pon cada parte y el total.', 'texto', ['2 Σ k', 'Σ 3', 'total'], ['420', '60', '480'], ['210', '3', '423'], '$2 \\cdot 210 + 20 \\cdot 3$.', 'El 3 se suma veinte veces.', { cap: '2 Σ k + Σ 3' }),
    T('¿Cuáles valen lo mismo que **2 + 4 + 6 + 8**?', [['Σ 2k, k de 1 a 4', 1], ['2 Σ k, k de 1 a 4', 1], ['Σ 2k, k de 0 a 4', 1], ['Σ k, k de 2 a 8', 0], ['Σ 2k, k de 1 a 8', 0]], 'Empezar en 0 solo agrega un cero.', 'Escribe los términos de cada una.'),
    F('$\\sum_{k=1}^{6}\\left(\\tfrac1k - \\tfrac1{k+1}\\right)$: pon el que queda al principio, lo que se resta y la suma.', 'texto', ['queda', 'se resta', 'suma'], ['1', '1/7', '6/7'], ['1/6', '5/6', '0'], 'Los de en medio se cancelan.', 'Escribe los primeros términos y mira qué se cancela.', { cap: 'telescópica' }),
    F('Pon cada factorial o producto.', 'texto', ['4!', '6!/5!', 'Π 2, 5 veces'], ['24', '6', '32'], ['10', '30', '120'], '$6! = 6 \\cdot 5!$ y $2^5 = 32$.', 'El factorial multiplica de 1 hasta el número.', { cap: 'Π multiplica' }),
    S('¿Cuáles reglas de la sumatoria son ciertas?', [['Σ (aₖ + bₖ) = Σ aₖ + Σ bₖ', 1], ['Σ 5, k de 1 a 10, es 5', 0], ['Σ 3aₖ = 3 Σ aₖ', 1], ['Σ aₖbₖ = Σ aₖ · Σ bₖ', 0]], 'La suma se parte y el número sale; el producto no se parte.', 'Prueba con dos términos.'),
    V('Extiende con el resultado.', 0, 60, [['$\\sum_{k=1}^{5} k$', 15, '\\tfrac{5 \\cdot 6}{2} = 15'], ['$\\sum_{k=1}^{4} k^2$', 30, '1 + 4 + 9 + 16 = 30'], ['$\\sum_{k=1}^{7} 8$', 56, '7 \\cdot 8 = 56']], 'Escribe los términos y suma.', 'Una constante se suma tantas veces como términos haya.'),
  ]);

  // ============================================================================================= 6 · Polinomios
  leccion('alg-23a', 'tren', [
    M('Arma $(2x^2 + x) + (x^2 + 4x)$ con baldosas.', 'tiles', [['a', 0, 5, 'cuadrados'], ['b', 0, 8, 'barras']], { a: 1, b: 1 }, { a: 3, b: 5 }, '$3x^2 + 5x$.', 'Cuadrados con cuadrados y barras con barras.'),
    F('$(6x^2 - 2x + 5) - (2x^2 + 3x - 4)$: pon los coeficientes.', 'texto', ['x²', 'x', 'número'], ['4', '−5', '9'], ['8', '1', '−9'], 'El menos cambia los tres signos.', 'Cambia todos los signos del segundo y junta.', { cap: 'el menos entra a todos' }),
    T('¿Cuáles son **semejantes** a $5x^2$?', [['−x²', 1], ['5x', 0], ['2x³', 0], ['x²/3', 1], ['7x²', 1], ['5', 0]], 'La misma letra con el mismo exponente.', 'El número de adelante no importa.'),
    F('$(x + 5)(x + 7)$: pon lo que falta en el área.', 'area4', ['de x', 'número'], ['12', '35'], ['2', '57', '24'], '$x^2 + 12x + 35$.', 'Junta las dos barras; la esquina es un producto.', { t: ['x²', '', '', ''], lados: ['x', 'x', '7', '5'] }),
    F('$(2x - 3)(x + 4)$: pon los tres coeficientes.', 'texto', ['x²', 'x', 'número'], ['2', '5', '−12'], ['−5', '1', '12'], '$2x^2 + 8x - 3x - 12$.', 'Todos con todos, con sus signos.', { cap: 'todos con todos' }),
    S('¿Cuáles son ciertas sobre el grado?', [['x³ · x⁴ tiene grado 7', 1], ['x³ + x⁴ tiene grado 7', 0], ['el grado de 5 es 0', 1], ['(x² + 1)³ tiene grado 6', 1]], 'Al multiplicar se suman; al sumar, queda el mayor.', 'Busca el exponente más grande después de operar.'),
    V('Engancha el tren con el número que falta.', -15, 30, [['$(x + 3)(x + 8)$: número', 24, '3 \\cdot 8 = 24'], ['$(x - 6)(x + 2)$: de x', -4, '2 - 6 = -4'], ['si $P(x) = x^2 - 3x$, $P(5)$', 10, '25 - 15 = 10']], 'Suma para la x, producto para el número.', 'Llena el rectángulo o reemplaza con cuidado.'),
  ]);
  leccion('alg-3', 'tren', [
    F('$(x + 7)^2$: pon lo que falta.', 'area4', ['de x', 'número'], ['14', '49'], ['7', '28', '77'], '$x^2 + 14x + 49$.', 'Hay dos rectángulos iguales y una esquina.', { t: ['x²', '', '', ''], lados: ['x', 'x', '7', '7'] }),
    F('$(3x - 2)^2$: pon los tres coeficientes.', 'texto', ['x²', 'x', 'número'], ['9', '−12', '4'], ['3', '−6', '−4'], '$9x^2 - 12x + 4$.', 'El 3 también se eleva; los rectángulos se quitan.', { cap: '(a − b)² = a² − 2ab + b²' }),
    F('Calcula con diferencia de cuadrados: $41 \\cdot 39$.', 'texto', ['40²', '1²', 'resultado'], ['1600', '1', '1599'], ['1601', '80', '1560'], '$(40 + 1)(40 - 1)$.', 'Eleva al cuadrado el número del medio y réstale el cuadrado de lo que se alejan.', { cap: '(40 + 1)(40 − 1)' }),
    T('¿Cuáles son **cuadrados perfectos**?', [['x² + 6x + 9', 1], ['x² + 5x + 25', 0], ['x² − 8x + 16', 1], ['x² + 36', 0], ['4x² + 4x + 1', 1]], 'El término de la mitad es el doble del producto.', 'Saca las raíces de las puntas y duplica su producto.'),
    F('$(x + 2)^3$: pon los coeficientes que siguen a $x^3$.', 'texto', ['x²', 'x', 'número'], ['6', '12', '8'], ['2', '4', '3'], '$3 \\cdot 2$, $3 \\cdot 4$ y $2^3$.', 'Uno, tres, tres, uno con potencias de 2.', { cap: '1, 3, 3, 1' }),
    S('¿Cuáles identidades son ciertas?', [['(a − b)(a + b) = a² − b²', 1], ['(a + b)² = a² + b²', 0], ['(a − b)² = (b − a)²', 1], ['(x + 1)³ = x³ + 1', 0]], 'El cuadrado borra el signo, pero no los rectángulos.', 'Prueba con números pequeños.'),
    V('Engancha con el número que falta.', -40, 40, [['$(x - 5)^2$: de x', -10, '-2 \\cdot 5 = -10'], ['$(x + 6)(x - 6)$: número', -36, '-6^2 = -36'], ['$(x + \\square)^2 = x^2 + 16x + 64$', 8, '2 \\cdot 8 = 16']], 'Doble producto y cuadrados.', 'Mira si es cuadrado de suma, de resta o diferencia.'),
  ]);
  leccion('alg-24c', 'tren', [
    F('La fila 6 es 1, 6, 15, 20, 15, 6, 1. Pon los tres primeros de la fila **7**.', 'pascal', ['1.º', '2.º', '3.º'], ['1', '7', '21'], ['6', '15', '35'], 'Cada uno es suma de los dos de arriba: $1 + 6$ y $6 + 15$.', 'Empieza en 1; después suma vecinos de la fila 6.', { f: 5 }),
    F('Pon cada combinación.', 'pascal', ['C(3, 1)', 'C(4, 3)', 'C(4, 4)'], ['3', '4', '1'], ['6', '2', '12'], 'Están en las dos últimas filas dibujadas.', 'La punta es la fila 0, y en cada fila el puesto también se cuenta desde 0.', { f: 5 }),
    F('En $(x + 5)^3$, pon las maneras y el coeficiente de x.', 'texto', ['maneras', 'coeficiente'], ['3', '75'], ['15', '25', '125'], '$3 \\cdot 5^2 = 75$.', 'Para quedar una x, el 5 se escoge dos veces.', { cap: '(x + 5)³' }),
    T('¿Cuáles son iguales a **C(9, 2)**?', [['36', 1], ['18', 0], ['C(9, 7)', 1], ['72', 0], ['9 · 8 / 2', 1]], 'Escoger dos es dejar siete.', 'Multiplica dos números y divide entre dos.'),
    F('Escoge comités: de **10** personas, ¿cuántos de 2 y cuántos de 3?', 'texto', ['de 2', 'de 3'], ['45', '120'], ['90', '20', '720'], '$\\tfrac{10 \\cdot 9}{2}$ y $\\tfrac{10 \\cdot 9 \\cdot 8}{6}$.', 'Sin orden: divide por las maneras de ordenar el grupo.', { cap: 'sin importar el orden' }),
    S('¿Cuáles son ciertas sobre $(a + b)^n$?', [['tiene n + 1 términos', 1], ['los coeficientes suman 2ⁿ', 1], ['los exponentes de cada término suman n', 1], ['el coeficiente del medio es n', 0]], 'En a = b = 1 se suman los coeficientes.', 'Míralo en las filas de Pascal.'),
    V('Engancha con el coeficiente.', -30, 60, [['$(x + 1)^6$: de $x^5$', 6, '\\binom61 = 6'], ['$(x + 3)^4$: de $x^3$', 12, '4 \\cdot 3 = 12'], ['$(x - 2)^4$: de $x^2$', 24, '6 \\cdot 4 = 24']], 'Maneras por la potencia del número.', 'El signo de −2 al cuadrado se borra.'),
  ]);
  leccion('alg-24b', 'tren', [
    M('Factoriza $x^2 + 9x + 20$ repartiendo las barras (más al lado).', 'rect', [['p', 1, 8, 'al lado'], ['q', 1, 4, 'abajo']], { p: 1, q: 1 }, { p: 5, q: 4 }, '$(x + 5)(x + 4)$.', 'Dos números que sumen 9 y multipliquen 20.'),
    F('$12x^2 - 18x = \\square(\\square x - \\square)$: saca el mayor factor común y pon las piezas.', 'texto', ['afuera', 'de x', 'número'], ['6x', '2', '3'], ['6', '12', '18'], '$6x(2x - 3)$.', 'Busca el mayor número y la mayor potencia que comparten.', { cap: '12x² − 18x' }),
    T('¿Cuáles tienen a **(x − 4)** como factor?', [['x² − 16', 1], ['x² + 16', 0], ['x² − 4x', 1], ['x² − 8x + 16', 1], ['x² + 4x', 0]], 'En 4 valen cero.', 'Factoriza o reemplaza x por 4.'),
    F('$x^2 - 3x - 10$: pon los dos números, el mayor primero.', 'texto', ['mayor', 'menor'], ['2', '−5'], ['5', '−2', '10'], '$(x + 2)(x - 5)$.', 'Multiplican −10 y suman −3: signos distintos.', { cap: '(x + □)(x + □)' }),
    F('$x^3 + 3x^2 + 4x + 12$ por agrupación: pon los dos factores.', 'texto', ['grado 1', 'grado 2'], ['x + 3', 'x² + 4'], ['x + 4', 'x² + 3'], '$x^2(x + 3) + 4(x + 3)$.', 'Agrupa de a dos y saca lo que se repite.', { cap: 'agrupa de a dos' }),
    S('¿Cuáles factorizaciones son correctas?', [['x² + 2x = x(x + 2)', 1], ['x² + 9 = (x + 3)²', 0], ['2x² − 8 = 2(x − 2)(x + 2)', 1], ['x² − x − 6 = (x − 3)(x + 2)', 1]], 'Se comprueba multiplicando de vuelta.', 'Multiplica los factores y compara.'),
    V('Engancha con el número que falta.', -15, 15, [['$x^2 + 7x + 12 = (x + 3)(x + \\square)$', 4, '3 \\cdot 4 = 12'], ['$x^2 - 81 = (x + 9)(x + \\square)$', -9, '9 \\cdot (-9) = -81'], ['$x^2 - 11x = x(x + \\square)$', -11, 'x(x - 11) = x^2 - 11x']], 'Suma y producto.', 'Multiplica de vuelta para comprobar.'),
  ]);
}
;
//#archivo js/alg-practica-3.js
// Ejercicios de Álgebra, mundos 7 (Parábolas y Complejos), 8 (Raíces de Polinomios), 9 (Fracciones Algebraicas) y 10 (Crecimiento
// Exponencial). Ver alg-practica.js.
{
  const { M, F, T, S, V, leccion } = AP;
  // ============================================================================================= 7 · Parábolas y complejos
  leccion('alg-23c', 'arco', [
    M('Lleva la flecha morada a $(3 + i) + (2 + 3i)$.', 'complejo', [['x', -8, 8, 'real'], ['y', -5, 5, 'imaginaria']], { x: 0, y: 1 }, { x: 5, y: 4 }, 'Real con real e imaginaria con imaginaria.', 'Suma por separado las dos partes.', { z: [3, 1] }),
    F('Pon cada potencia de i.', 'texto', ['i⁹', 'i¹⁴', 'i⁴⁰'], ['i', '−1', '1'], ['−i', '0'], 'Se repiten cada cuatro: residuos 1, 2 y 0.', 'Divide el exponente entre 4 y mira el residuo.', { cap: 'i, −1, −i, 1, …' }),
    M('La flecha amarilla es $4 - 2i$. Lleva la otra a su **conjugado**.', 'complejo', [['x', -8, 8, 'real'], ['y', -5, 5, 'imaginaria']], { x: 1, y: 1 }, { x: 4, y: 2 }, 'El conjugado refleja sobre el eje real.', 'Cambia solo el signo de la parte imaginaria.', { z: [4, -2] }),
    F('$(2 + 3i)(1 - 2i)$: pon la parte real y la imaginaria.', 'texto', ['real', 'imaginaria'], ['8', '−1'], ['2', '−6', '−4'], '$2 - 4i + 3i - 6i^2 = 8 - i$.', 'Multiplica todos con todos y cambia i² por −1.', { cap: 'i² = −1' }),
    T('¿Cuáles tienen módulo **5**?', [['3 + 4i', 1], ['5i', 1], ['2 + 3i', 0], ['−4 + 3i', 1], ['5 + 5i', 0]], 'Pitágoras con las dos partes.', 'Suma los cuadrados: debe dar 25.'),
    S('¿Cuáles son ciertas sobre los complejos?', [['z por su conjugado es real', 1], ['i³ = i', 0], ['todo real es complejo', 1], ['√−9 = 3i', 1]], '$z\\bar z = a^2 + b^2$.', 'Escribe z = a + bi y calcula.'),
    V('Lanza el balón con el número.', -12, 30, [['$|6 + 8i|$', 10, '\\sqrt{36 + 64} = 10'], ['$(5 + 2i)(5 - 2i)$', 29, '25 + 4 = 29'], ['parte real de $(1 + 3i)^2$', -8, '1 - 9 = -8']], 'Pitágoras y $i^2 = -1$.', 'Desarrolla con calma y cambia i² por −1.'),
  ]);
  leccion('alg-1', 'arco', [
    F('La balanza muestra $3x + 2 = x + 10$. Pon lo que queda en cada paso.', 'balanza', ['2x =', 'x ='], ['8', '4'], ['12', '6', '3'], 'Se quitan una caja y dos bolitas de cada lado.', 'Quita lo mismo de los dos lados.', { x: 3, u: 2, y: 1, w: 10 }),
    M('Prueba valores hasta equilibrar $4x - 5 = 2x + 9$.', 'balanzaX', [['n', 0, 10, 'x']], { n: 1 }, { n: 7 }, '$28 - 5 = 23 = 14 + 9$.', 'Quita 2x de los dos lados y después suma 5.', { x: 4, u: -5, y: 2, w: 9, izq: '4x − 5', der: '2x + 9' }),
    F('$\\tfrac{x}{3} + \\tfrac{x}{5} = 16$: pon el mcm, las x juntas y x.', 'texto', ['mcm', '? · x = 240', 'x'], ['15', '8', '30'], ['5', '2', '20'], '$5x + 3x = 240$.', 'Multiplica todos los términos por el mcm de 3 y 5.', { cap: 'por el mcm' }),
    T('¿Cuáles tienen solución **x = 2**?', [['3x = 6', 1], ['x + 5 = 8', 0], ['2(x − 1) = 2', 1], ['4x = 10', 0], ['7 − x = 5', 1]], 'Al poner 2 se cumple la igualdad.', 'Reemplaza x por 2 en cada una.'),
    F('¿Cuántas soluciones tiene cada ecuación?', 'texto', ['5x = 5x + 1', '3(x+2) = 3x+6', '2x = x'], ['ninguna', 'todas', 'una'], ['dos'], 'Queda 0 = 1; 6 = 6; y x = 0.', 'Quita las x iguales y mira lo que queda.', { cap: '¿una, ninguna o todas?' }),
    S('¿Cuáles pasos **no cambian las soluciones** de una ecuación?', [['restar 4 a los dos lados', 1], ['multiplicar un solo lado por 2', 0], ['dividir los dos entre 3', 1], ['multiplicar los dos por 0', 0]], 'Por cero se borraría todo.', 'Piensa si del resultado se puede volver.'),
    V('Lanza con el valor de x.', -10, 20, [['$2x + 7 = 31$', 12, '2x = 24'], ['$5 - x = 11$', -6, 'x = 5 - 11'], ['tres seguidos suman 45: el menor', 14, '14 + 15 + 16 = 45']], 'Deja sola la x.', 'Deshaz la última operación primero.'),
  ]);
  leccion('alg-4a', 'arco', [
    M('Lleva la parábola sobre la punteada.', 'parab', [['h', -4, 4, 'h'], ['k', -4, 5, 'k']], { h: 0, k: 0 }, { h: -2, k: -3 }, '$y = (x + 2)^2 - 3$.', 'Mira dónde está el vértice de la punteada.', { sombra: [1, -2, -3] }),
    M('Cambia **a** hasta cubrir la punteada.', 'parab', [['a', -2, 2, 'a', 0.5]], { a: 1 }, { a: -0.5 }, 'Está volteada y más abierta: $a = -\\tfrac12$.', 'Si abre hacia abajo, a es negativa. Más abierta: menor que 1.', { b0: { h: 1, k: 5 }, sombra: [-0.5, 1, 5] }),
    F('$y = x^2 + 10x + 18$: pon h y k.', 'texto', ['h', 'k'], ['−5', '−7'], ['5', '18', '7'], '$(x + 5)^2 - 7$.', 'La mitad de 10, con signo contrario; luego evalúa.', { cap: 'h = −b / 2a' }),
    T('¿Cuáles parábolas tienen **máximo**?', [['y = −x² + 3', 1], ['y = 2x² − 5', 0], ['y = 4x − x²', 1], ['y = (x − 1)²', 0], ['y = −3(x + 2)²', 1]], 'Las que abren hacia abajo.', 'Mira el signo del término con x².'),
    F('Lee la parábola: pon las raíces y el eje. (Cada cuadro vale 1.)', 'curva', ['menor', 'mayor', 'eje x ='], ['−1', '3', '1'], ['−3', '2', '−4'], 'El eje está en la mitad de las raíces.', 'Mira dónde corta el eje horizontal y toma la mitad.', { fx: x => x * x - 2 * x - 3, ej: [-5, 5, -5, 5] }),
    S('Para $y = (x - 4)^2 + 1$, ¿cuáles son ciertas?', [['el vértice es (4, 1)', 1], ['corta el eje x dos veces', 0], ['el mínimo es 1', 1], ['es simétrica respecto a x = −4', 0]], 'Está por encima del eje: no lo corta.', 'Dibuja el vértice y mira hacia dónde abre.'),
    V('Lanza con el valor pedido.', -10, 30, [['eje de $y = x^2 - 12x$', 6, '\\tfrac{12}{2} = 6'], ['máximo de $x(6 - x)$', 9, '3 \\cdot 3 = 9'], ['mínimo de $(x + 3)^2 - 8$', -8, 'k = -8']], 'El vértice manda.', 'El eje es la mitad de las raíces.'),
  ]);
  leccion('alg-4', 'arco', [
    M('Lleva los cortes a las soluciones de $x^2 + 2x - 8 = 0$ (la menor primero).', 'raices', [['r', -5, 0, 'menor'], ['s', 0, 5, 'mayor']], { r: -1, s: 1 }, { r: -4, s: 2 }, '$(x + 4)(x - 2) = 0$.', 'Dos números que multipliquen −8 y sumen 2; las raíces llevan el signo contrario.', { ej: [-6, 6, -10, 8] }),
    F('$x^2 - 6x + 7 = 0$: pon el discriminante y cuántas reales hay.', 'texto', ['b² − 4ac', 'reales'], ['8', '2'], ['64', '1', '−8'], '$36 - 28 = 8 > 0$.', 'Calcula y mira el signo.', { cap: 'b² − 4ac' }),
    T('¿Cuáles tienen **dos** soluciones reales?', [['x² = 9', 1], ['x² + 4 = 0', 0], ['x² − 10x + 25 = 0', 0], ['x² = 5x', 1], ['x² + x − 1 = 0', 1]], 'El discriminante es positivo.', 'Factoriza o calcula el discriminante.'),
    F('$3x^2 + 5x - 2 = 0$: pon el discriminante y las raíces, la menor primero.', 'texto', ['b² − 4ac', 'menor', 'mayor'], ['49', '−2', '1/3'], ['1', '2', '−1/3'], '$x = \\tfrac{-5 \\pm 7}{6}$.', 'Cuidado: −4 por 3 por −2 es positivo.', { cap: '3x² + 5x − 2 = 0' }),
    F('Las raíces de $x^2 - 9x + 14$: pon su suma, su producto y la mayor.', 'curva', ['suma', 'producto', 'mayor'], ['9', '14', '7'], ['−9', '2', '5'], 'Suma 9 y producto 14: 2 y 7.', 'La suma es el opuesto del de x; el producto, el número.', { fx: x => x * x - 9 * x + 14, ej: [0, 10, -8, 8] }),
    S('¿Cuáles son ciertas sobre cuadráticas?', [['si una raíz es 0, c = 0', 1], ['toda cuadrática tiene dos reales', 0], ['x² = 16 da solo x = 4', 0], ['b² = 4ac da una sola raíz', 1]], '$x^2 = 16$ también da −4.', 'Piensa en dónde corta la parábola el eje.'),
    V('Lanza con la solución **positiva**.', 0, 20, [['$x^2 - 3x = 40$', 8, '64 - 24 = 40'], ['$x(x + 4) = 60$', 6, '6 \\cdot 10 = 60'], ['$x^2 = 121$', 11, '11^2 = 121']], 'Factoriza y descarta la negativa.', 'Busca dos números con ese producto.'),
  ]);

  // ============================================================================================= 8 · Raíces de polinomios
  leccion('alg-23b', 'bola', [
    F('$x^2 + 8x + 17$ entre $x + 3$: el cociente es $x + \\square$. Pon el número y el residuo.', 'texto', ['x + ?', 'residuo'], ['5', '2'], ['8', '11', '14'], '$(x + 3)(x + 5) + 2$.', 'Quita 3x de 8x; luego 3 por lo que pusiste.', { cap: 'divisor · cociente + residuo' }),
    F('Se divide un polinomio de grado **9** entre uno de grado **4**. Pon el grado del cociente y el mayor grado posible del residuo.', 'texto', ['cociente', 'residuo'], ['5', '3'], ['13', '4', '36'], '$9 - 4 = 5$ y el residuo tiene grado menor que 4.', 'Resta los grados; el residuo queda por debajo del divisor.', { cap: 'se restan los grados' }),
    T('¿Cuáles divisiones son **exactas**?', [['(x² − 9) ÷ (x + 3)', 1], ['(x² + 9) ÷ (x + 3)', 0], ['(x² + 5x) ÷ x', 1], ['(x² + 1) ÷ x', 0], ['(x³ − 1) ÷ (x − 1)', 1]], 'No sobra residuo.', 'Evalúa en el número que anula al divisor.'),
    F('$(x + 4)(x + k) = x^2 + 11x + m$. Pon k y m.', 'area4', ['k', 'm'], ['7', '28'], ['15', '44', '11'], '$4 + k = 11$ y $m = 4 \\cdot 7$.', 'Compara el coeficiente de x y después el número.', { t: ['x²', 'kx', '4x', 'm'], lados: ['x', 'x', 'k', '4'] }),
    F('$ax^2 + bx + 8 = 5x^2 - 3x + c$ para toda x. Pon a, b y c.', 'texto', ['a', 'b', 'c'], ['5', '−3', '8'], ['3', '−5', '0'], 'Coeficiente a coeficiente.', 'Los de x² con los de x², y así cada uno.', { cap: 'los mismos coeficientes' }),
    S('En la división $P = D \\cdot Q + R$, ¿cuáles son ciertas?', [['R tiene menos grado que D', 1], ['si R = 0, D es factor de P', 1], ['el grado de Q es grado P − grado D', 1], ['R siempre es un número', 0]], 'El residuo es número solo si el divisor es de grado uno.', 'Piensa en un divisor de grado dos.'),
    V('Echa la bola con el número.', -10, 20, [['$x^2 + 6x + 8$ entre $x + 2$: $x + \\square$', 4, '2 \\cdot 4 = 8'], ['residuo de $x^2 + 5$ entre $x - 1$', 6, '1 + 5 = 6'], ['residuo de $2x + 1$ entre $x + 3$', -5, '-6 + 1 = -5']], 'El residuo es el valor en el número que anula al divisor.', 'Reemplaza x por ese número.'),
  ]);
  const p92 = x => x ** 3 - x * x - 10 * x - 8;
  leccion('alg-92', 'bola', [
    M('$P(x) = x^3 - x^2 - 10x - 8$. Mueve la sonda a la raíz **positiva**.', 'sonda', [['x', -4, 5, 'x']], { x: 0 }, { x: 4 }, '$64 - 16 - 40 - 8 = 0$.', 'Prueba los divisores positivos de 8.', { fx: p92, ej: [-5, 6, -20, 20], gy: 5 }),
    F('$P(x) = x^3 - 5x + 1$. Pon el residuo de dividir entre cada uno.', 'texto', ['x − 2', 'x + 1', 'x'], ['−1', '5', '1'], ['3', '−3', '0'], 'Se evalúa en 2, en −1 y en 0.', 'Usa el número que anula al divisor.', { cap: 'residuo = P(c)' }),
    F('Divide $x^3 - 6x^2 + 11x - 6$ entre $x - 1$: completa la fila de abajo.', 'texto', ['1.º', '2.º', '3.º', 'residuo'], ['1', '−5', '6', '0'], ['−7', '5', '−6'], '$x^2 - 5x + 6$, exacto.', 'Baja, multiplica por 1 y suma.', { cap: '1, −6, 11, −6' }),
    T('¿Cuáles son **factores** de $x^3 - 4x$?', [['x', 1], ['x − 2', 1], ['x + 2', 1], ['x − 4', 0], ['x + 1', 0]], '$x(x - 2)(x + 2)$.', 'Reemplaza el número que anula a cada uno.'),
    F('$x - 3$ es factor de $x^2 + kx - 12$. Pon $9 - 12$ y k.', 'texto', ['sin k', 'k'], ['−3', '1'], ['3', '−1', '4'], '$9 + 3k - 12 = 0$.', 'Reemplaza x por 3 e iguala a cero.', { cap: 'P(3) = 0' }),
    S('¿Cuáles son ciertas sobre residuos y factores?', [['si P(5) = 0, x − 5 es factor', 1], ['para x + 2 se evalúa en 2', 0], ['si falta una potencia se pone 0', 1], ['el residuo entre x es el término suelto', 1]], 'Para $x + 2$ se usa −2.', 'Mira qué número anula al divisor.'),
    V('Echa la bola con el residuo.', -20, 20, [['$x^2 - 3x$ entre $x - 5$', 10, '25 - 15 = 10'], ['$x^3 + 1$ entre $x + 2$', -7, '-8 + 1 = -7'], ['$2x^2 - 8$ entre $x - 2$', 0, '8 - 8 = 0']], 'Evalúa el polinomio.', 'Reemplaza x por el número que anula al divisor.'),
  ]);
  leccion('alg-93', 'bola', [
    F('Lee las raíces de la curva, de menor a mayor. (Cada columna vale 1.)', 'cubica', ['1.ª', '2.ª', '3.ª'], ['−3', '1', '2'], ['−1', '0', '3'], 'Cruza el eje en −3, 1 y 2.', 'El eje vertical es el 0: cuenta columnas desde ahí.', { fx: x => (x + 3) * (x - 1) * (x - 2), ej: [-5, 5, -16, 16] }),
    F('$x^2(x - 2)^3(x + 6)^2$: pon el grado y qué hace en 0 y en 2.', 'texto', ['grado', 'en 0', 'en 2'], ['7', 'rebota', 'cruza'], ['12', 'nada'], 'Impar cruza y par rebota.', 'Suma los exponentes y mira si cada uno es par.', { cap: 'x² (x − 2)³ (x + 6)²' }),
    T('¿Cuáles son **candidatas** a raíz entera de $x^3 + x - 10$?', [['2', 1], ['3', 0], ['−5', 1], ['10', 1], ['4', 0], ['−1', 1]], 'Los divisores de 10, con los dos signos.', 'Una raíz entera divide al término suelto.'),
    F('$x^3 - 7x + 6$ tiene la raíz 1. Al bajar de grado queda $x^2 + x - 6$. Pon las otras dos, la menor primero.', 'texto', ['menor', 'mayor'], ['−3', '2'], ['3', '−2', '6'], '$(x + 3)(x - 2)$.', 'Factoriza la cuadrática que quedó.', { cap: 'x² + x − 6 = 0' }),
    F('Un polinomio real de grado 4 tiene raíces 2, $-1$ y $4 + 3i$. Pon la que falta y el producto de las complejas.', 'texto', ['falta', 'producto'], ['4 − 3i', '25'], ['−4 − 3i', '7', '1'], '$16 + 9 = 25$.', 'Las complejas vienen en pareja con su conjugada.', { cap: 'coeficientes reales' }),
    S('¿Cuáles son ciertas sobre raíces?', [['grado 5 real tiene al menos una real', 1], ['grado 4 siempre tiene una real', 0], ['las complejas vienen en parejas', 1], ['en una raíz doble la curva rebota', 1]], '$x^4 + 1$ no tiene raíces reales.', 'Piensa en los extremos de la gráfica.'),
    V('Echa la bola con la raíz **entera positiva**.', 0, 12, [['$x^3 - 27$', 3, '3^3 = 27'], ['$x^3 - 5x^2$', 5, 'x^2(x - 5)'], ['$(x + 1)(x^2 - 8x + 16)$', 4, '(x - 4)^2']], 'Factoriza o prueba divisores.', 'Iguala a cero y busca el número que cumple.'),
  ]);

  // ============================================================================================= 9 · Fracciones algebraicas
  leccion('alg-25a', 'bote', [
    M('Mueve el río hasta el valor prohibido de $\\tfrac{2}{x + 4}$.', 'rio', [['q', -5, 5, 'prohibido']], { q: 0 }, { q: -4 }, '$x + 4 = 0$ en $x = -4$.', 'Iguala el denominador a cero.'),
    F('Prohibidos de $\\tfrac{x}{x^2 - 7x + 10}$, el menor primero.', 'texto', ['menor', 'mayor'], ['2', '5'], ['−2', '−5', '10'], '$(x - 2)(x - 5) = 0$.', 'Factoriza el denominador.', { cap: 'denominador = 0' }),
    F('$\\tfrac{x^2 - 36}{x + 6}$ simplificada, y su prohibido.', 'texto', ['queda', 'x ≠'], ['x − 6', '−6'], ['x + 6', '6', 'x'], 'Se cancela $x + 6$, pero −6 sigue prohibido.', 'Arriba hay una diferencia de cuadrados.', { cap: '(x² − 36) / (x + 6)' }),
    T('¿En cuáles se puede **cancelar** la x?', [['5x / 2x', 1], ['(x + 3) / x', 0], ['x² / x', 1], ['(x − 1) / (x + 1)', 0], ['x(x + 2) / 4x', 1]], 'Solo si es factor de todo arriba y de todo abajo.', 'Pregunta si la x multiplica a todo.'),
    F('$\\tfrac{(x + 1)(x - 3)}{(x - 3)(x + 8)}$: di qué hay en cada prohibido.', 'texto', ['en 3', 'en −8'], ['hueco', 'río'], ['nada'], 'El factor de 3 se cancela; el de −8 queda.', 'Mira cuál factor del denominador desaparece.', { cap: 'hueco o río' }),
    S('¿Cuáles son ciertas sobre fracciones algebraicas?', [['x/x = 1 para x ≠ 0', 1], ['(x + 2)/2 = x', 0], ['(3 − x)/(x − 3) = −1', 1], ['1/(x² + 1) no tiene prohibidos', 1]], '$x^2 + 1$ nunca es cero.', 'Prueba cada una con un número.'),
    V('Rema hasta el valor prohibido (el mayor si hay dos).', -10, 12, [['$\\tfrac{1}{2x - 14}$', 7, '2x = 14'], ['$\\tfrac{x}{x^2 - 16}$', 4, 'x = \\pm4'], ['$\\tfrac{3}{x + 9}$', -9, 'x = -9']], 'Donde el denominador es cero.', 'Iguala a cero y despeja.'),
  ]);
  leccion('alg-25b', 'bote', [
    F('$\\tfrac{3}{x} + \\tfrac{4}{x + 1}$ sobre $x(x + 1)$: arriba queda $\\square x + \\square$.', 'texto', ['de x', 'número'], ['7', '3'], ['4', '12', '1'], '$3(x + 1) + 4x$.', 'A cada una le falta el denominador de la otra.', { cap: '3/x + 4/(x + 1)' }),
    F('$\\tfrac{9x + 1}{x - 2} - \\tfrac{4x - 6}{x - 2}$: arriba queda $\\square x + \\square$.', 'texto', ['de x', 'número'], ['5', '7'], ['−5', '13', '−7'], '$9x + 1 - 4x + 6$.', 'El menos entra a los dos términos.', { cap: 'la raya es un paréntesis' }),
    F('$\\tfrac{x}{8} \\div \\tfrac{x^3}{12}$: pon arriba y abajo, simplificado.', 'texto', ['arriba', 'abajo'], ['3', '2x²'], ['x', '3x²', '2'], '$\\tfrac{12x}{8x^3}$.', 'Voltea la segunda y cancela.', { cap: 'voltea y multiplica' }),
    T('¿Cuáles son **denominador común** de $\\tfrac1x$ y $\\tfrac1{x-5}$?', [['x(x − 5)', 1], ['x − 5', 0], ['2x(x − 5)', 1], ['2x − 5', 0], ['x²(x − 5)', 1]], 'Los que se dividen entre los dos; el primero es el menor.', 'Tiene que ser múltiplo de x y de x − 5.'),
    F('$\\dfrac{1 + \\tfrac1x}{\\tfrac1x}$ por $\\tfrac{x}{x}$: pon arriba y abajo.', 'texto', ['arriba', 'abajo'], ['x + 1', '1'], ['x', '1 + x²', '0'], 'Cada término se multiplica por x.', 'Multiplica arriba y abajo por x para borrar las fracciones.', { cap: 'por x/x' }),
    S('¿Cuáles operaciones están bien?', [['a/b · c/d = ac/bd', 1], ['a/b + c/b = (a + c)/2b', 0], ['a/b ÷ c = a/(bc)', 1], ['1/a + 1/b = 2/(a + b)', 0]], 'El tamaño de las partes no se suma.', 'Prueba con 1, 2, 3 y 4.'),
    V('Rema hasta el número que falta.', -10, 20, [['$\\tfrac2x + \\tfrac5x = \\tfrac{\\square}{x}$', 7, '2 + 5 = 7'], ['$\\tfrac{x}{4} \\cdot \\tfrac{12}{x} = \\square$', 3, '\\tfrac{12}{4} = 3'], ['$\\tfrac{1}{x} - \\tfrac{4}{x} = \\tfrac{\\square}{x}$', -3, '1 - 4 = -3']], 'Mismo tamaño: se suman los de arriba.', 'Cancela antes de multiplicar.'),
  ]);
  leccion('alg-101', 'bote', [
    M('Lleva el punto al cruce de $y = x + 1$ y $y = -2x + 10$.', 'cruce', [['x', 0, 8, 'x'], ['y', 0, 8, 'y']], { x: 1, y: 1 }, { x: 3, y: 4 }, '$x + 1 = -2x + 10$.', 'Debe cumplir las dos ecuaciones.', { l: [[1, 1], [-2, 10]] }),
    F('$4x + y = 22$ y $x - y = 3$. Pon 5x, x, y.', 'texto', ['5x =', 'x', 'y'], ['25', '5', '2'], ['19', '4', '8'], 'Al sumar se va la y.', 'Suma las ecuaciones y vuelve con x.', { cap: 'suma las dos' }),
    F('$y = 3x - 4$ y $2x + y = 16$. Pon 5x, x, y.', 'texto', ['5x =', 'x', 'y'], ['20', '4', '8'], ['12', '6', '16'], '$2x + (3x - 4) = 16$.', 'Reemplaza y por su paquete.', { cap: 'reemplaza el paquete' }),
    T('¿Cuáles puntos cumplen **las dos**: x + y = 7 y x − y = 1?', [['(4, 3)', 1], ['(5, 2)', 0], ['(3, 4)', 0], ['(6, 1)', 0]], 'Solo uno está en las dos rectas.', 'Prueba cada punto en las dos ecuaciones.'),
    M('Mueve la pendiente para que el sistema con la roja **no tenga** solución.', 'linea2', [['m', -2, 2, 'pendiente', 0.5]], { m: -1 }, { m: 0.5 }, 'Paralelas: la misma pendiente y distinta altura.', 'Dos rectas no se cruzan si tienen la misma inclinación.', { b: 3, o: [0.5, -1], ej: [-5, 5, -5, 6] }),
    S('¿Cuáles son ciertas sobre sistemas?', [['si al eliminar queda 0 = 5, no hay solución', 1], ['si queda 0 = 0, hay infinitas', 1], ['dos rectas se cortan en dos puntos', 0], ['se puede multiplicar una ecuación por 3', 1]], 'Dos rectas distintas se cortan a lo más una vez.', 'Piensa en dos rectas dibujadas.'),
    V('Rema hasta el valor de x.', -10, 20, [['$x + y = 20$, $x - y = 4$', 12, '2x = 24'], ['$y = 2x$, $x + y = 18$', 6, '3x = 18'], ['$3x + y = 1$, $y = 10$', -3, '3x = -9']], 'Elimina o sustituye.', 'Suma las ecuaciones o reemplaza y.'),
  ]);
  leccion('alg-102', 'bote', [
    M('Sube la recta $y = 2x + b$ hasta que uno de sus cruces con $y = x^2$ sea **(3, 9)**.', 'corta', [['b', -2, 5, 'b']], { b: -1 }, { b: 3 }, '$9 = 6 + 3$.', 'El punto debe cumplir la ecuación de la recta.', { fx: x => x * x, m: 2, ej: [-4, 5, -3, 12], gy: 2 }),
    F('$y = x^2$ con $y = x + 12$: pon las x de los cruces, la menor primero.', 'curva', ['menor', 'mayor'], ['−3', '4'], ['3', '−4', '12'], '$x^2 - x - 12 = 0$.', 'Iguala las dos y factoriza.', { fx: x => x * x, ej: [-5, 5, -2, 18], gy: 2 }),
    F('$\\tfrac{9x + 3}{x(x + 3)} = \\tfrac{A}{x} + \\tfrac{B}{x + 3}$. Pon A y B.', 'texto', ['A', 'B'], ['1', '8'], ['3', '9', '−8'], 'En 0: $3 = 3A$. En −3: $-24 = -3B$.', 'Escoge el valor que apaga una letra.', { cap: 'A/x + B/(x + 3)' }),
    T('¿Cuáles puntos están en la circunferencia **x² + y² = 25**?', [['(3, 4)', 1], ['(5, 5)', 0], ['(0, −5)', 1], ['(−4, 3)', 1], ['(2, 3)', 0]], 'Los cuadrados suman 25.', 'Eleva cada coordenada y suma.'),
    F('$\\tfrac{6x + 5}{(x - 1)^2} = \\tfrac{A}{x - 1} + \\tfrac{B}{(x - 1)^2}$. Pon A y B.', 'texto', ['A', 'B'], ['6', '11'], ['5', '1', '−6'], '$6(x - 1) + 11$.', 'A sale de los de x; B, evaluando en 1.', { cap: 'una por cada potencia' }),
    S('¿Cuáles son ciertas sobre cruces y fracciones parciales?', [['recta y parábola: a lo más 2 cruces', 1], ['(x − 2)² pide una sola fracción', 0], ['x² + 1 abajo pide Bx + C arriba', 1], ['dos circunferencias: hasta 2 cruces', 1]], 'Un factor repetido pide una por cada potencia.', 'Imagina las curvas dibujadas.'),
    V('Rema hasta el número pedido.', -10, 15, [['números con suma 13 y producto 40: el mayor', 8, '8 \\cdot 5 = 40'], ['$y = x^2$, $y = 4x$: la x que no es 0', 4, 'x^2 = 4x'], ['$\\tfrac{5x}{x(x+2)}$: A de $\\tfrac{A}{x+2}$', 5, '\\tfrac{5}{x + 2}']], 'Iguala y resuelve, o cancela.', 'Convierte cada caso en una ecuación.'),
  ]);

  // ============================================================================================= 10 · Exponenciales
  leccion('alg-71', 'planta', [
    M('Mueve **a** hasta cubrir la punteada $y = a \\cdot 2^x$.', 'expo', [['a', 1, 8, 'a']], { a: 1 }, { a: 5 }, 'En 0 la curva vale a: 5.', 'Mira dónde corta la punteada el eje vertical.', { base: 2, sombra: [5, 0] }),
    M('Mueve el **piso** hasta cubrir la punteada $y = 2^x + k$.', 'expo', [['k', -1, 5, 'k']], { k: 0 }, { k: 2 }, 'El piso está en 2.', '¿A qué altura se acerca la punteada por la izquierda?', { base: 2, sombra: [1, 2] }),
    F('$y = 4 \\cdot 3^x$: pon cada valor.', 'texto', ['x = 0', 'x = 2', 'x = −1'], ['4', '36', '4/3'], ['12', '144', '0'], 'Primero la potencia y después por 4.', 'Calcula la potencia antes de multiplicar.', { cap: 'y = 4 · 3ˣ' }),
    T('¿Cuáles funciones **crecen**?', [['3ˣ', 1], ['(1/4)ˣ', 0], ['2⁻ˣ', 0], ['1.02ˣ', 1], ['(5/3)ˣ', 1], ['0.9ˣ', 0]], 'Las de base mayor que 1.', 'Escribe $2^{-x}$ como $(\\tfrac12)^x$.'),
    F('Un café se enfría según $T = 60 \\cdot 0.5^t + 20$ (°C). Pon T en 0, en 1 y el piso.', 'texto', ['t = 0', 't = 1', 'piso'], ['80', '50', '20'], ['60', '40', '0'], '$60 \\cdot 0.5 + 20 = 50$.', 'Reemplaza t; el piso es lo que se suma.', { cap: 'T = 60 · 0.5ᵗ + 20' }),
    S('Sobre $y = b^x$, ¿cuáles son ciertas?', [['pasa por (0, 1)', 1], ['corta el eje x', 0], ['b puede ser negativa', 0], ['bˣ⁺¹ = b · bˣ', 1]], 'Nunca vale cero y la base es positiva.', 'Piensa en la gráfica de $2^x$.'),
    V('Haz crecer la planta con el valor.', 0, 100, [['$2 \\cdot 3^3$', 54, '2 \\cdot 27 = 54'], ['$96 \\cdot (\\tfrac12)^4$', 6, '96 \\div 16 = 6'], ['$5 \\cdot 2^4$', 80, '5 \\cdot 16 = 80']], 'Potencia primero.', 'Multiplica o parte un paso a la vez.', 1),
  ]);
  leccion('alg-13b', 'planta', [
    F('**200** mil al **6 %** anual **simple**. Pon lo que gana por año y el monto a los 5 años (miles).', 'ahorro', ['por año', '5 años'], ['12', '260'], ['6', '268', '230'], '$12 \\cdot 5 = 60$.', 'Cada año gana la misma cantidad.', { C: 200, i: 0.06 }),
    F('**800** mil al **5 %** anual **compuesto**. Pon el monto tras 1 y tras 2 años (miles).', 'ahorro', ['1 año', '2 años'], ['840', '882'], ['880', '805', '900'], '$840 \\cdot 1.05 = 882$.', 'El segundo año gana sobre 840.', { C: 800, i: 0.05 }),
    F('**18 %** nominal anual, capitaliza **mensual**, 3 años. Pon la tasa del mes y los períodos.', 'texto', ['tasa', 'períodos'], ['1.5 %', '36'], ['6 %', '3', '54 %'], '$18 \\div 12$ y $3 \\cdot 12$.', 'Reparte la tasa y cuenta los meses.', { cap: 'por mes' }),
    T('¿Cuáles son interés **compuesto**?', [['100, 110, 121', 1], ['100, 110, 120', 0], ['50, 100, 200', 1], ['80, 100, 120', 0]], 'Se multiplica siempre por lo mismo.', 'Divide cada monto entre el anterior.'),
    M('Con interés simple, un ahorro de **20** sube **3** por año. ¿En cuántos años llega a **41**?', 'recta', [['x', 0, 10, 'años']], { x: 0 }, { x: 7 }, '$21 \\div 3 = 7$.', '¿Cuánto le falta? ¿Cuántas veces cabe el 3?', { r: [0, 10], paso: 1 }),
    S('¿Cuáles son ciertas sobre intereses?', [['el primer año simple y compuesto son iguales', 1], ['a largo plazo gana el compuesto', 1], ['al 10 % compuesto se duplica en 10 años justos', 0], ['M = C(1 + i)ᵗ es compuesto', 1]], 'Al 10 % se duplica en poco más de 7 años.', 'Compara los primeros años.'),
    V('Haz crecer hasta el monto (en miles).', 0, 100, [['50 al 10 % simple, 4 años', 70, '50 + 20 = 70'], ['40 al 50 % compuesto, 2 años', 90, '40 \\cdot 2.25 = 90'], ['interés de 60 al 20 % en 1 año', 12, '60 \\cdot 0.2 = 12']], 'Simple suma, compuesto multiplica.', 'Escribe el factor o lo que gana por año.', 1),
  ]);
  leccion('alg-72', 'planta', [
    M('Lleva el punto a la altura de $\\log_2 16$.', 'logv', [['y', -3, 5, 'log']], { y: 0 }, { y: 4 }, '$2^4 = 16$.', '¿A qué exponente va el 2?', { base: 2, x: 16 }),
    F('Pon el valor de cada logaritmo.', 'texto', ['log₃ 27', 'log₂ 1/8', 'log₇ 1'], ['3', '−3', '0'], ['9', '−4', '1'], '$3^3$, $2^{-3}$ y $7^0$.', 'Pregunta siempre por el exponente.', { cap: '¿a qué exponente?' }),
    F('Si $\\log 2 = a$ y $\\log 5 = b$, pon cada uno.', 'texto', ['log 10', 'log 25', 'log 2/5'], ['a + b', '2b', 'a − b'], ['ab', 'b²', 'b − a'], 'Producto suma, potencia multiplica, cociente resta.', 'Escribe cada número con 2 y 5.', { cap: 'log 2 = a ; log 5 = b' }),
    T('¿Cuáles **existen**?', [['log₂ 5', 1], ['log₃ 0', 0], ['log₂ (−4)', 0], ['log₅ 0.2', 1], ['log₁₀ 1', 1]], 'Solo hay logaritmos de números positivos.', 'Mira si el de adentro es positivo.'),
    F('$\\log_4 32$ en base 2: pon arriba, abajo y el resultado.', 'texto', ['log₂ 32', 'log₂ 4', 'resultado'], ['5', '2', '5/2'], ['8', '3', '16'], '$4^{5/2} = 2^5$.', 'Escribe 32 y 4 como potencias de 2.', { cap: 'cambio de base' }),
    S('¿Cuáles reglas de logaritmos son ciertas?', [['log x² = 2 log x (x > 0)', 1], ['log (x + y) = log x + log y', 0], ['log (xy) = log x + log y', 1], ['log x / log y = log (x/y)', 0]], 'La suma es del producto, no de la suma.', 'Prueba con x = 10 y y = 100.'),
    V('Haz crecer hasta el valor.', -5, 12, [['$\\log_2 64$', 6, '2^6 = 64'], ['$\\log_{10} 0.001$', -3, '10^{-3}'], ['$\\log_2 8 + \\log_2 32$', 8, '3 + 5 = 8']], 'El logaritmo es un exponente.', 'Suma exponentes cuando hay producto.'),
  ]);
  leccion('alg-73', 'planta', [
    F('$8^{x} = 32$: pon el exponente de 2 a cada lado y x.', 'texto', ['izquierda', 'derecha', 'x'], ['3x', '5', '5/3'], ['x³', '4', '3/5'], '$2^{3x} = 2^5$.', 'Escribe 8 y 32 como potencias de 2.', { cap: 'misma base' }),
    M('Mueve x hasta que $3^x$ llegue a **27**.', 'torre', [['e', 0, 4, 'x']], { e: 0 }, { e: 3 }, '$3^3 = 27$.', 'Multiplica por tres contando.', { b: 3 }),
    F('$2^x = 50$: ¿entre qué enteros seguidos está x?', 'texto', ['más que', 'menos que'], ['5', '6'], ['25', '4', '7'], '$32 < 50 < 64$.', 'Escribe las potencias de 2 hasta pasar de 50.', { cap: '2ˣ = 50' }),
    T('¿Cuáles ecuaciones tienen solución **3**?', [['2ˣ = 8', 1], ['5ˣ = 15', 0], ['log₃ x = 1', 1], ['4ˣ⁻¹ = 16', 1], ['log₂ x = 3', 0]], 'Al poner 3 se cumple.', 'Reemplaza x por 3 en cada una.'),
    F('$\\log_6 x + \\log_6 (x - 5) = 2$: pon $x(x - 5)$, x y la que se descarta.', 'texto', ['x(x−5)', 'x', 'se descarta'], ['36', '9', '−4'], ['12', '4', '−9'], '$x^2 - 5x - 36 = (x - 9)(x + 4)$.', 'Junta en un solo logaritmo; no acepta negativos.', { cap: 'log₆ x(x − 5) = 2' }),
    S('¿Cuáles pasos son válidos al resolver?', [['2ˣ = 2⁵ da x = 5', 1], ['log x = 2 da x = 100', 1], ['3ˣ = 12 da x = 4', 0], ['5ˣ = −5 no tiene solución', 1]], '3 a la x no es 3 por x.', 'Una potencia de base positiva nunca es negativa.'),
    V('Haz crecer la planta hasta x.', -5, 30, [['$2^{x-1} = 32$', 6, 'x - 1 = 5'], ['$\\log_5 x = 2$', 25, '5^2 = 25'], ['$9^x = \\tfrac{1}{81}$', -2, '9^{-2}']], 'Iguala exponentes o sube el logaritmo.', 'Busca primero una base común.'),
  ]);
}
;
//#archivo js/exercises.js
// Tipos de ejercicio: opción múltiple, respuesta numérica, deslizador interactivo y ordenar pasos.
// Cada uno devuelve { check() → { ok, solution }, lock(ok), key?(n), destroy?() }.

function shuffle(a) {
  a = [...a];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Acepta "2.5", "2,5", "-3" o fracciones "3/4".
function parseNum(s) {
  s = String(s).trim().replace(/\s/g, '').replace(',', '.');
  if (!s) return NaN;
  const fr = s.match(/^(-?\d*\.?\d+)\/(-?\d*\.?\d+)$/);
  return fr ? +fr[1] / +fr[2] : Number(s);
}

const EX_KIND = { mc: 'Elige la respuesta', input: 'Escribe la respuesta', slider: 'Experimenta', order: 'Ordena', play: 'Juega' };

const EX = {
  mc(area, ex, ready) {
    const order = shuffle(ex.options.map((_, i) => i));
    let sel = null;
    area.innerHTML = `<div class="opts">${order.map((i, k) =>
      `<button class="opt" data-i="${i}"><span class="key">${k + 1}</span><span>${tex(ex.options[i])}</span></button>`).join('')}</div>`;
    const btns = [...area.querySelectorAll('.opt')];
    btns.forEach(b => b.addEventListener('click', () => {
      btns.forEach(x => x.classList.toggle('sel', x === b));
      sel = +b.dataset.i;
      ready(true); Sfx.tap();
    }));
    return {
      check: () => ({ ok: sel === ex.answer, solution: ex.options[ex.answer] }),
      key: k => btns[+k - 1]?.click(),
      lock() {
        btns.forEach(b => {
          b.disabled = true;
          if (+b.dataset.i === ex.answer) b.classList.add('right');
          else if (b.classList.contains('sel')) b.classList.add('wrong');
        });
      },
    };
  },

  input(area, ex, ready) {
    area.innerHTML = `<label class="num">${ex.prefix ? `<span>${tex(ex.prefix)}</span>` : ''}
      <input inputmode="decimal" autocomplete="off" enterkeyhint="done" placeholder="Tu respuesta" aria-label="Respuesta">
      ${ex.suffix ? `<span class="unit">${esc(ex.suffix)}</span>` : ''}</label>
      <p class="hint">Puedes escribir decimales o fracciones (ej. 3/4).</p>`;
    const inp = area.querySelector('input');
    inp.addEventListener('input', () => ready(inp.value.trim() !== ''));
    setTimeout(() => { if (typeof guideOpen === 'undefined' || !guideOpen) inp.focus({ preventScroll: true }); }, 300);   // con la guía abierta, el teclado espera
    return {
      check() {
        // «400.000» con puntos de miles: si la respuesta es un entero grande, los puntos separan miles.
        const raw = inp.value.trim(), miles = Number.isInteger(ex.answer) && Math.abs(ex.answer) >= 1000 && /^-?\d{1,3}(\.\d{3})+$/.test(raw);
        const v = miles ? +raw.replace(/\./g, '') : parseNum(inp.value), tol = ex.tol ?? 0.001 * Math.max(1, Math.abs(ex.answer));
        return { ok: Math.abs(v - ex.answer) <= tol, solution: ex.answerText || `$${ex.answer}$${ex.suffix ? ' ' + ex.suffix : ''}` };
      },
      lock(ok) { inp.disabled = true; inp.parentElement.classList.add(ok ? 'right' : 'wrong'); },
    };
  },

  slider(area, ex, ready) {
    area.innerHTML = `<div class="play"><div class="game-stage">
      <div class="sim"><canvas aria-hidden="true"></canvas></div>
      <div class="sim-controls">
        <input type="range" class="range" min="${ex.min}" max="${ex.max}" step="${ex.step}" value="${ex.init}" aria-label="Valor de la simulación">
        <div class="range-ends"><span>${ex.min}</span><span>${ex.max}</span></div>
        <output class="readout"></output>
      </div></div></div>`;
    const cv = area.querySelector('canvas'), ctx = cv.getContext('2d');
    const range = area.querySelector('.range'), readout = area.querySelector('.readout');
    let val = +ex.init;
    const fill = () => range.style.setProperty('--fill', ((val - ex.min) / (ex.max - ex.min)) * 100 + '%');
    const draw = () => {
      const r = cv.getBoundingClientRect(), dpr = Math.min(2, devicePixelRatio || 1);
      if (!r.width) return;
      cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = PALETTE.card; ctx.fillRect(0, 0, r.width, r.height);
      const pad = Math.max(30, r.width * 0.08);
      drawViz(ctx, ex.viz, 1, { x: pad, y: 14, w: r.width - pad - 14, h: r.height - 38 }, val, PALETTE);
    };
    const update = () => { readout.innerHTML = tex(ex.readout ? ex.readout(val) : String(val)); fill(); draw(); };
    range.addEventListener('input', () => { val = +range.value; update(); ready(true); });
    const ro = new ResizeObserver(draw);
    ro.observe(cv);
    const theme = new MutationObserver(draw);
    theme.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    update();
    const game = area.querySelector('.play');
    return {
      check: () => ({ ok: ex.check(val), solution: ex.answerText }),
      lock(ok) { range.disabled = true; game.classList.add(ok ? 'right' : 'wrong'); },
      guideHost: game,
      destroy() { ro.disconnect(); theme.disconnect(); },
    };
  },

  order(area, ex, ready) {
    let pool = shuffle(ex.items.map((_, i) => i));
    while (ex.items.length > 1 && pool.every((v, i) => v === i)) pool = shuffle(pool);
    const picked = [];
    let locked = false;
    const tile = (i, from) => `<button class="tile" data-i="${i}" data-from="${from}"${locked ? ' disabled' : ''}>${tex(ex.items[i])}</button>`;
    const render = () => {
      area.innerHTML = `<div class="slots">${picked.length
        ? picked.map((i, k) => `<div class="slot"><span class="slot-n">${k + 1}</span>${tile(i, 'picked')}</div>`).join('')
        : '<span class="slots-hint">Toca las fichas en el orden correcto</span>'}</div>
        <div class="bank">${pool.map(i => tile(i, 'pool')).join('')}</div>`;
      area.querySelectorAll('.tile').forEach(b => b.addEventListener('click', () => {
        const i = +b.dataset.i;
        const [from, to] = b.dataset.from === 'pool' ? [pool, picked] : [picked, pool];
        from.splice(from.indexOf(i), 1); to.push(i);
        Sfx.tap(); render(); ready(pool.length === 0);
      }));
    };
    render();
    return {
      check: () => ({ ok: picked.every((v, i) => v === i), solution: ex.items.join(' → ') }),
      lock(ok) { locked = true; render(); area.querySelector('.slots').classList.add(ok ? 'right' : 'wrong'); },
    };
  },
};

// El enunciado sin TeX, para el nombre accesible del lienzo: las fracciones se leen «a sobre b».
function texLeido(q) {
  return String(q || '').replace(/\\[dt]?frac\{([^{}]*)\}\{([^{}]*)\}/g, '$1 sobre $2').replace(/\\[,;:! ]/g, ' ').replace(/\$|\\[a-zA-Z]+|[{}]/g, ' ').replace(/\s+/g, ' ').trim();
}

// Minijuego de p5.js: adapta GAMES[ex.game] (js/games/) al contrato de los demás ejercicios.
EX.play = (area, ex, ready) => {
  const game = GAMES[ex.game];
  area.innerHTML = '<div class="play"><div class="game-stage"></div></div>';
  const box = area.querySelector('.play');
  const stage = box.firstElementChild;
  if (!game) {
    stage.innerHTML = '<p class="play-msg">Este juego no está disponible.</p>';
    return { check: () => ({ ok: false, solution: '' }), lock() {}, destroy() {} };
  }
  let inst, disposed = false;
  function launch() {
    stage.replaceChildren();
    stage.setAttribute('aria-busy', 'true');
    ready(false);
    const guideAuto = !ex.exam && (typeof S === 'undefined' || S.guideAuto !== false);
    stage.dataset.guideAuto = String(guideAuto);
    if (ex.exam || box.closest('.exam')) stage.dataset.examen = '1'; else delete stage.dataset.examen;
    // En una lección con explicación Explora, los juegos suenan como ella.
    const sfx = typeof XP_SFX !== 'undefined' && box.closest('.xp-lesson') ? XP_SFX : Sfx;
    stage.dataset.label = `Juego: ${texLeido(ex.q).slice(0, 200)}`;
    const next = inst = game.create(stage, ex.params, { ready, sfx, palette: PALETTE, tex, guideAuto });
    Promise.resolve(next.loaded).then(() => {
      if (!disposed && inst === next) stage.removeAttribute('aria-busy');
    }, () => {
      if (disposed || inst !== next) return;
      next.destroy();
      inst = null;
      stage.removeAttribute('aria-busy');
      stage.innerHTML = '<div class="play-msg"><p role="status">El juego no pudo cargar.</p><button type="button" class="hint-btn">Reintentar</button></div>';
      stage.querySelector('button').onclick = launch;
      ready(false);
    });
  }
  launch();
  return {
    check: () => game.grade(inst.getState(), ex.params),
    lock: ok => { inst.lock(ok); box.classList.add(ok ? 'right' : 'wrong'); playFx(box, ok); },
    destroy: () => { disposed = true; inst?.destroy(); },
    demo: () => inst?.demo?.(),
    guideHost: box,
  };
};

// Pista: un botón bajo el enunciado que, al tocarlo, deja ver un empujón (sin regalar la respuesta).
function hintBlock(ex) {
  const guide = typeof guideButton === 'function' ? guideButton(ex) : '';
  if (!ex.hint && !guide) return '';
  return `<div class="ex-hint"><div class="ex-tools">${guide}${ex.hint ? `<button type="button" class="hint-btn hint-open">${ICON.bulb}<span>Ver pista</span></button>` : ''}</div>`
    + (ex.hint ? `<p class="hint-text" hidden>${ICON.bulb}<span>${tex(ex.hint)}</span></p>` : '') + '</div>';
}

// Bajo el enunciado van «Cómo se juega» y «Ver pista». En los juegos la ayuda comparte el área de trabajo.
function renderExercise(el, ex, ready) {
  const practice = ex.type === 'play' || ex.type === 'slider';
  const exam = ex.exam || !!el.closest('.exam');
  const kind = !practice || exam ? `<p class="ex-kind">${ex.kind || EX_KIND[ex.type]}</p>` : '';
  el.innerHTML = `<div class="ex${practice ? ' practice' : ''}"><header class="ex-head">${kind}<h2 class="ex-q">${tex(ex.q)}</h2></header>${hintBlock(ex)}<div class="ex-area"></div></div>`;
  const gb = el.querySelector('.guide-btn');
  const focusInput = () => el.querySelector('.num input:not(:disabled)')?.focus({ preventScroll: true });
  let guide = null, closePractice;
  if (!practice && typeof guideWanted === 'function' && guideWanted(ex)) guide = openGuide(ex, { auto: true, onClose: focusInput });
  const hb = el.querySelector('.hint-open');
  if (hb) hb.onclick = () => { hb.hidden = true; el.querySelector('.hint-text').hidden = false; Sfx.tap(); };
  const area = el.querySelector('.ex-area'), h = EX[ex.type](area, { ...ex, exam }, ready), destroy = h.destroy;
  if (gb && practice) {
    const replay = GAMES[ex.game]?.demo ? h.demo : undefined;
    closePractice = mountPracticeGuide(h.guideHost || area, gb, { ...ex, exam }, !exam && guideWanted(ex), replay);
  } else if (gb) {
    gb.onclick = () => { Sfx.tap(); guide = openGuide(ex); };
  }
  h.destroy = () => { closePractice?.(); if (guide && guideOpen === guide) guide.close(true); destroy?.(); };
  return h;
}
;
//#archivo js/exam.js
// Evaluaciones de fin de unidad (spec 2026-11-12-evaluaciones-algebra-u1-u3).
// unit.exam = { id, title, minutes, items: [{ lesson, review, ex }] }. Durante la evaluación corre un
// cronómetro, no se dice si cada respuesta es correcta, se puede saltar y la pista hace que la pregunta
// valga la mitad. Al final, examReport arma el informe: lo que se domina y lo que hay que repasar.

const EXAM_LEVELS = [
  { key: 'top', min: 90, title: '¡Dominas la unidad!', msg: 'Tus respuestas muestran que entiendes las ideas de esta unidad.' },
  { key: 'good', min: 70, title: '¡Vas muy bien!', msg: 'Entiendes casi todo. Repasa los temas marcados para afianzarlos.' },
  { key: 'mid', min: 50, title: 'Vas por buen camino', msg: 'Ya tienes una base. Repasa las lecciones marcadas y vuelve a intentarlo.' },
  { key: 'low', min: 0, title: 'Necesitas repasar', msg: 'Vuelve a las lecciones marcadas, mira sus videos y repite la evaluación cuando estés listo.' },
];
const HINT_NOTE = 'Lo resolviste con pista: inténtalo de nuevo sin ella.';

// results[i] = { ok, hint, blank }. Correcta = 1 punto; con pista = ½; mal o en blanco = 0.
function examReport(exam, results) {
  const items = exam.items.map((it, i) => {
    const r = results[i] || {};
    const state = r.ok ? (r.hint ? 'hint' : 'ok') : r.blank ? 'blank' : 'bad';
    return { lesson: it.lesson, review: it.review, state, pts: state === 'ok' ? 1 : state === 'hint' ? 0.5 : 0 };
  });
  const n = items.length, pts = items.reduce((s, x) => s + x.pts, 0);
  const pct = n ? Math.round((100 * pts) / n) : 0;
  const lessons = [...new Set(items.map(x => x.lesson))];
  const mastered = lessons.filter(l => items.filter(x => x.lesson === l).every(x => x.state === 'ok'));
  const review = lessons.filter(l => !mastered.includes(l)).map(l => ({
    lesson: l,
    notes: [...new Set(items.filter(x => x.lesson === l && x.state !== 'ok').map(x => (x.state === 'hint' ? HINT_NOTE : x.review)))],
  }));
  return { pct, n, correct: items.filter(x => x.pts > 0).length, items, mastered, review, level: EXAM_LEVELS.find(lv => pct >= lv.min) };
}

const fmtClock = s => { s = Math.max(0, Math.ceil(s)); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };

// Respuesta correcta de una pregunta, sin necesidad de haberla mostrado.
function examSolution(ex) {
  if (ex.type === 'play') return GAMES[ex.game]?.grade({}, ex.params).solution || '';
  if (ex.type === 'input') return ex.answerText || `$${ex.answer}$${ex.suffix ? ' ' + ex.suffix : ''}`;
  if (ex.type === 'mc') return ex.options[ex.answer];
  return ex.answerText || '';
}

const examUnlocked = u => S.unlockAll || u.lessons.every(isDone);

function openExamSheet(c, u) {
  const E = u.exam, best = S.exams[E.id]?.best, open = examUnlocked(u);
  openSheet(`<div class="ls exam-sheet" style="--c:${c.color}">
    <p class="eyebrow">Evaluación del mundo</p><h3>${esc(E.title)}</h3>
    <p class="ls-meta"><span>${ICON.clock} ${E.minutes} min</span><span>${ICON.target} ${E.items.length} preguntas</span>${best != null ? `<span>${ICON.trophy} Mejor: ${best}%</span>` : ''}</p>
    <ul class="exam-rules">
      <li>No verás si aciertas hasta el final: ahí recibes tu informe.</li>
      <li>Puedes saltar una pregunta y volver a ella después.</li>
      <li>Cada pregunta tiene pista, pero si la usas esa pregunta vale la mitad.</li>
      <li>Cuando se acaba el tiempo, la evaluación se entrega sola.</li>
    </ul>
    ${open ? `<button class="btn" data-go>${best != null ? 'Repetir evaluación' : 'Empezar evaluación'}</button>`
      : '<p class="muted">Completa todas las lecciones del mundo para abrir la evaluación.</p><button class="btn" disabled>Bloqueada</button>'}
  </div>`, sh => sh.querySelector('[data-go]')?.addEventListener('click', () => { closeSheet(false); startExam(c, u); }));
}

function startExam(c, u) {
  const E = u.exam, n = E.items.length, back = tab;
  setGameCourse(c.id);   // paleta del curso en los juegos de la evaluación
  cleanup?.(); cleanup = null;
  const results = E.items.map(() => ({ ok: false, hint: false, blank: true }));
  const queue = E.items.map((_, i) => i), skipped = new Set();
  const t0 = Date.now(), deadline = t0 + E.minutes * 60000;
  let handle = null, finished = false, timer = null;

  const ov = $('#overlay');
  ov.innerHTML = `<div class="lesson exam" style="--c:${c.color}">
    <div class="lesson-top">
      <button class="icon-btn" data-close aria-label="Salir">${ICON.x}</button>
      <div class="exam-dots" aria-hidden="true">${E.items.map(() => '<i></i>').join('')}</div>
      <span class="exam-clock" role="timer" aria-label="Tiempo restante">${ICON.clock}<b>${fmtClock(E.minutes * 60)}</b></span>
    </div>
    <div class="lesson-body"></div>
    <div class="lesson-foot exam-foot"><button class="btn ghost skip" type="button">Saltar</button><button class="btn main" type="button">Responder</button></div>
  </div>`;
  ov.classList.add('open');
  document.body.classList.add('in-lesson');
  const root = $('.lesson', ov), body = $('.lesson-body', ov), btn = $('.btn.main', ov), skip = $('.btn.skip', ov);
  const clock = $('.exam-clock', ov), dots = [...ov.querySelectorAll('.exam-dots i')];

  function teardown() { handle?.destroy?.(); handle = null; }
  function close(to) {
    if (!finished) {
      return ask({ title: '¿Salir de la evaluación?', text: 'No se guardará tu resultado.', ok: 'Salir', cancel: 'Seguir', danger: true })
        .then(yes => { if (yes && lessonClose === close) { finished = true; close(to); } });
    }
    finished = true; clearInterval(timer); teardown();
    document.removeEventListener('keydown', onKey);
    ov.classList.remove('open'); ov.innerHTML = '';
    document.body.classList.remove('in-lesson');
    lessonClose = null;
    go(typeof to === 'string' ? to : back);
  }
  lessonClose = close;
  ov.querySelectorAll('[data-close]').forEach(b => { b.onclick = () => close(); });

  function paintDots() {
    dots.forEach((d, i) => {
      d.className = i === queue[0] && !finished ? 'cur' : !results[i].blank ? 'done' : skipped.has(i) && queue.includes(i) ? 'skip' : queue.includes(i) ? '' : 'blank';
    });
  }

  function tick() {
    const left = (deadline - Date.now()) / 1000;
    clock.querySelector('b').textContent = fmtClock(left);
    clock.classList.toggle('low', left <= 60);
    if (left <= 0) finish(true);
  }

  function step() {
    teardown();
    body.scrollTop = 0;
    if (!queue.length) return finish(false);
    const i = queue[0], it = E.items[i];
    handle = renderExercise(body, it.ex, ok => { btn.disabled = !ok; });
    $('.ex-kind', body).textContent = `Pregunta ${i + 1} de ${n} · ${it.ex.kind || EX_KIND[it.ex.type]}`;
    const hb = $('.hint-open', body);   // el de la pista, no «Cómo se juega» (también es .hint-btn)
    if (hb) {
      $('span', hb).textContent = results[i].hint ? 'Ver pista' : 'Ver pista · la pregunta vale la mitad';
      if (results[i].hint) { hb.hidden = true; $('.hint-text', body).hidden = false; }
      hb.addEventListener('click', () => { results[i].hint = true; });
    }
    btn.textContent = 'Responder'; btn.disabled = true;
    skip.textContent = skipped.has(i) || queue.length === 1 ? 'Dejar en blanco' : 'Saltar';
    paintDots();
  }

  btn.onclick = () => {
    if (finished || btn.disabled) return;
    const i = queue.shift(), r = handle.check();
    results[i] = { ok: r.ok, hint: results[i].hint, blank: false };
    Sfx.tap(); step();
  };
  skip.onclick = () => {
    if (finished) return;
    const i = queue.shift();
    if (skipped.has(i) || !queue.length) results[i].blank = true;
    else { skipped.add(i); queue.push(i); }
    Sfx.tap(); step();
  };

  function finish(timeUp) {
    if (finished) return;
    finished = true; clearInterval(timer); teardown();
    dismissDialog();   // si se acabó el tiempo con «¿Salir?» abierto: el resultado ya se guarda y se muestra
    const used = Math.min(E.minutes * 60, Math.round((Date.now() - t0) / 1000));
    const rep = examReport(E, results), prev = S.exams[E.id];
    // Primera vez: hasta 25 XP según el resultado. Al repetir, solo lo que se mejore (y 2 XP por practicar).
    const xp = prev ? 2 + Math.max(0, Math.round((rep.pct - (prev.best ?? 0)) / 5)) : (rep.pct > 0 ? 5 : 0) + Math.round(rep.pct / 5);
    S.exams[E.id] = { best: Math.max(prev?.best ?? 0, rep.pct), last: rep.pct, at: Date.now() };
    addXP(xp); markStreak(); save();
    const title = id => findLesson(id)?.l.title || id;
    const lessonNo = id => { const k = u.lessons.findIndex(l => l.id === id); return k >= 0 ? `Nivel ${c.units.indexOf(u) + 1}-${k + 1}` : ''; };
    const ICONS = { ok: ICON.check, hint: '½', bad: ICON.x, blank: '–' };
    const LABEL = { ok: 'Correcta', hint: 'Correcta con pista', bad: 'Incorrecta', blank: 'Sin responder' };
    const R = 54, L = 2 * Math.PI * R;
    root.classList.add('exam-done');
    clock.classList.remove('low');
    dots.forEach((d, i) => { d.className = rep.items[i].state; });
    body.innerHTML = `<div class="exam-report lv-${rep.level.key}">
      ${rep.pct >= 70 ? '<canvas class="confetti"></canvas>' : ''}
      ${timeUp ? `<p class="er-timeup">${ICON.clock} Se acabó el tiempo: lo que faltaba cuenta como sin responder.</p>` : ''}
      <div class="er-ring" role="img" aria-label="Resultado: ${rep.pct}%">
        <svg viewBox="0 0 128 128"><circle cx="64" cy="64" r="${R}" class="er-track"/><circle cx="64" cy="64" r="${R}" class="er-val"
          stroke-dasharray="${L}" stroke-dashoffset="${L * (1 - rep.pct / 100)}"/></svg><b>${rep.pct}%</b></div>
      <h2>${rep.level.title}</h2><p class="muted">${rep.level.msg}</p>
      <div class="done-stats">
        <div class="ds acc"><small>Correctas</small><b>${rep.correct}/${rep.n}</b></div>
        <div class="ds time"><small>Tiempo</small><b>${fmtClock(used)}</b></div>
        <div class="ds xp"><small>XP</small><b>${ICON.bolt}+${xp}</b></div>
      </div>
      ${rep.mastered.length ? `<section class="er-sec er-good"><h3>${ICON.check} Lo que dominas</h3><ul>
        ${rep.mastered.map(id => `<li><small>${lessonNo(id)}</small>${esc(title(id))}</li>`).join('')}</ul></section>` : ''}
      ${rep.review.length ? `<section class="er-sec er-rev"><h3>${ICON.bulb} Para repasar</h3>
        ${rep.review.map(r => `<div class="er-card"><p><small>${lessonNo(r.lesson)}</small><b>${esc(title(r.lesson))}</b></p>
          <ul>${r.notes.map(t => `<li>${tex(t)}</li>`).join('')}</ul>
          <button class="btn sm ghost" type="button" data-lesson="${r.lesson}">Repasar esta lección ${ICON.right}</button></div>`).join('')}</section>` : ''}
      <section class="er-sec"><h3>${ICON.target} Pregunta por pregunta</h3>
        ${E.items.map((it, i) => { const s = rep.items[i].state; return `<details class="er-q ${s}">
          <summary><span class="er-ic">${ICONS[s]}</span><span><small>Pregunta ${i + 1} · ${LABEL[s]}</small>${esc(title(it.lesson))}</span></summary>
          <div class="er-q-body"><p>${tex(it.ex.q)}</p>
            <p class="fb-label">Respuesta correcta:</p><div class="fb-sol">${tex(window.katex && typeof texify === 'function' ? texify(examSolution(it.ex)) : examSolution(it.ex))}</div>
            ${it.ex.explain ? `<p class="fb-exp">${tex(it.ex.explain)}</p>` : ''}</div></details>`; }).join('')}
      </section>
      <button class="btn ghost er-again" type="button">Repetir evaluación</button>
    </div>`;
    skip.hidden = true;
    btn.textContent = 'Continuar'; btn.disabled = false; btn.onclick = () => close();
    body.querySelectorAll('[data-lesson]').forEach(b => b.onclick = () => {
      const found = findLesson(b.dataset.lesson); close(); if (found) startLesson(found.c, found.l);
    });
    $('.er-again', body).onclick = () => { close(); startExam(c, u); };
    rep.pct >= 70 ? Sfx.win() : Sfx.tap();
    const cv = $('.confetti', body);
    if (cv) requestAnimationFrame(() => confetti(cv));
  }

  function onKey(e) {
    // En el informe Enter no cierra (sirve para abrir cada pregunta); tampoco cuando el foco está en otro botón.
    if (e.key === 'Enter' && !finished && !btn.disabled && !e.target.closest?.('button, summary, a, details')) { e.preventDefault(); btn.click(); }
  }
  document.addEventListener('keydown', onKey);
  timer = setInterval(tick, 500);
  step();
}
;
//#archivo js/update.js
// Aviso de versión nueva. El service worker nuevo queda en espera (sw.js ya no se salta la
// espera) y aquí se detecta: o ya estaba esperando al abrir la app (el usuario dijo «más tarde»
// la vez anterior) o acaba de instalarse mientras otra versión controla la página. En los dos
// casos se llama a show(apply, dismiss): apply le manda SKIP_WAITING al SW en espera y recarga
// la página una sola vez cuando toma el control; dismiss solo oculta el aviso hasta la próxima
// apertura. La primera instalación (sin controlador) no avisa.

function watchUpdates(reg, sw, show, reload = () => location.reload()) {
  let accepted = false, reloaded = false;
  sw.addEventListener('controllerchange', () => {
    if (!accepted || reloaded) return;
    reloaded = true;
    reload();
  });
  const offer = worker => show(() => { accepted = true; worker.postMessage('SKIP_WAITING'); }, () => {});
  if (reg.waiting) offer(reg.waiting);
  reg.addEventListener('updatefound', () => {
    const w = reg.installing;
    if (!w) return;
    w.addEventListener('statechange', () => {
      if (w.state === 'installed' && sw.controller) offer(w);
    });
  });
}

// Una app que vive en «recientes» no vuelve a cargar la página: al volver a primer plano se busca versión nueva, a lo
// sumo una vez por hora. Si la hay, el aviso de arriba la ofrece.
function checkOnReturn(reg, doc = document, now = Date.now, cada = 3600000) {
  let ultima = now();
  doc.addEventListener('visibilitychange', () => {
    if (doc.visibilityState !== 'visible' || now() - ultima < cada) return;
    ultima = now();
    try { Promise.resolve(reg.update()).catch(() => {}); } catch (e) { /* sin red no pasa nada */ }
  });
}
;
//#archivo js/pwa.js
// Piezas de PWA que no son el service worker (spec 2026-11-13-revision-pwa; pruebas tests/pwa.test.js).
// - tabFromURL: los atajos del icono instalado (manifest.json → shortcuts) abren index.html?tab=…
// - watchConnection: avisa cuando se va o vuelve la red, en vez de fallar en silencio.
// - keepData: pide al navegador que no borre el progreso (localStorage) cuando falte espacio.

const TABS = ['home', 'cursos', 'learn', 'gym', 'clips', 'tienda', 'tutorias', 'profile'];

function tabFromURL(search) {
  const m = /[?&]tab=([^&#]*)/.exec(search || '');
  return m && TABS.includes(m[1]) ? m[1] : 'home';
}

function watchConnection(win, body, say) {
  const update = announce => {
    const off = win.navigator.onLine === false;
    body.classList.toggle('offline', off);
    if (!announce) return;
    say(off
      ? 'Sin conexión: las lecciones y los juegos siguen funcionando; los videos esperan la red.'
      : 'Volvió la conexión.');
  };
  win.addEventListener('offline', () => update(true));
  win.addEventListener('online', () => update(true));
  update(win.navigator.onLine === false);
}

async function keepData(nav) {
  const st = nav && nav.storage;
  if (!st || !st.persist) return false;
  try {
    if (st.persisted && await st.persisted()) return true;
    return await st.persist();
  } catch (e) { return false; }
}
;
//#archivo js/back.js
// Botón «atrás» del celular (y del navegador). La app deja dos entradas en el historial: la base y,
// encima, una «tapa». Cada atrás saca la tapa; aquí se decide qué cerrar y se vuelve a poner la tapa.
// En la pantalla principal (Aprender, mapa de mundos) el primer atrás deja la app en la base y pregunta
// si quieres salir; el segundo atrás ya lo atiende el sistema: cierra la app instalada (o, en el
// navegador, vuelve a la página anterior). «Quedarme» vuelve a poner la tapa.

// Qué hace un atrás según lo que está abierto, de lo más encima a lo más abajo.
function backStep(s) {
  if (s.exitAsk) return 'exit';        // se estaba preguntando si salir: segundo atrás
  if (s.dialog) return 'dialog';       // diálogo abierto: se cancela
  if (s.tour) return 'tour';           // recorrido guiado (js/tour.js): se salta
  if (s.guide) return 'guide';         // guía «Cómo se juega» (js/guia.js): se cierra
  if (s.sheet) return 'sheet';         // hoja inferior: se cierra
  if (s.lesson) return 'lesson';       // lección o evaluación: se sale (pregunta si hay progreso)
  if (s.world) return 'world';         // dentro de un mundo: vuelve al mapa
  if (s.tab !== 'home') return 'tab';  // un curso vuelve a Mis cursos; otra pestaña, a Inicio (spec 2026-11-19-inicio-mis-cursos)
  return 'ask-exit';
}

// Instalada (pantalla completa) la app no puede cerrarse sola: ahí la pregunta solo invita a
// presionar atrás otra vez. En el navegador «Salir» vuelve a la página anterior.
const isInstalledApp = () => matchMedia('(display-mode: standalone)').matches || navigator.standalone === true;

function setupBack() {
  if (!history.pushState) return;
  let exitAsk = false;
  const cover = () => history.pushState({ zuka: 'top' }, '');
  // Al recargar (o al actualizar la versión) la tapa ya existe: no se apilan bases nuevas.
  if (history.state?.zuka !== 'top') { history.replaceState({ zuka: 'base' }, ''); cover(); }

  addEventListener('popstate', e => {
    // Al entrar por un enlace del correo, Supabase limpia el «#…» y eso también avisa aquí, con una entrada sin
    // marca: no es un «atrás». Se vuelve la tapa y no se pregunta nada.
    if (!e.state) { history.replaceState({ zuka: 'top' }, '', location.pathname + location.search); return; }
    if (typeof presentacionAtras === 'function' && presentacionAtras()) { cover(); return; }   // js/presentacion.js
    if (typeof tiendaAtras === 'function' && tiendaAtras()) { cover(); return; }   // js/tienda.js y js/lector.js
    if (typeof portalAtras === 'function' && portalAtras()) { cover(); return; }   // js/portal.js
    const step = backStep({
      exitAsk, tab, dialog: dialogOpen(), tour: tourOpen(), guide: typeof guideOpen !== 'undefined' && !!guideOpen, sheet: sheetIsOpen,
      lesson: !!lessonClose, world: (tab === 'learn' && (!!openWorld || !!openBlock)) || (tab === 'profile' && !!profileSub),   // Ajustes vuelve al Perfil por su [data-back]
    });
    if (step === 'exit') { exitAsk = false; dismissDialog(); history.back(); return; }
    if (step === 'ask-exit') {
      // Sin volver a poner la tapa: el próximo atrás sale de la app.
      exitAsk = true;
      const installed = isInstalledApp();
      ask({ title: '¿Quieres salir de Zuka?',
        text: installed ? 'Tu progreso queda guardado. Presiona atrás otra vez para salir.' : 'Tu progreso queda guardado.',
        ok: installed ? null : 'Salir', cancel: 'Quedarme' })
        .then(yes => {
          if (!exitAsk) return;
          exitAsk = false;
          if (yes) history.back(); else cover();
        });
      return;
    }
    cover();
    if (step === 'dialog') dismissDialog();
    else if (step === 'tour') endTour();
    else if (step === 'guide') closeGuide();
    else if (step === 'sheet') closeSheet();
    else if (step === 'lesson') lessonClose();
    else if (step === 'world') { const b = $('[data-back]', view); if (b) b.click(); else if (tab === 'profile') { profileSub = null; renderProfile(); } else { openWorld = null; openBlock = null; renderLearn(); } }   // como «Mundos» o «Componentes»: un paso atrás
    else go(tab === 'learn' ? 'cursos' : tab === 'gym' ? 'learn' : 'home');
  });
}
;
//#archivo js/tour.js
// Recorrido guiado de bienvenida: la primera vez que se abre la app, una capa oscurece la pantalla,
// deja un hueco iluminado sobre el elemento real del que se habla y lo explica en una tarjeta.
// Diseño: docs/superpowers/specs/2026-11-12-recorrido-guiado.md.

// `target`: selectores que se prueban en orden (el primero que exista); sin target, la tarjeta va centrada
// con su arte (`mascot`, `video` o `ex`). `review`: texto para el modo revisión (`S.unlockAll`). `view`: lo que debe verse detrás (mapa de mundos o un mundo).
const TOUR_STEPS = [
  { id: 'hola', view: 'map', art: 'mascot', title: 'Te damos la bienvenida',
    text: 'En un minuto verás cómo se usa Zuka: elegir tu curso, ver los videos y resolver los ejercicios.' },
  { id: 'curso', view: 'map', target: ['.course-head'], title: 'Tu curso',
    text: 'Esta es la portada de tu curso. Para cambiar de curso o inscribirte en otro, ve a Inicio o a Mis cursos: tu avance se guarda aparte en cada uno.' },
  { id: 'mundos', view: 'map', target: ['.wnode.current', '.wnode'], title: 'El camino de mundos',
    text: 'Cada curso es un camino y cada mundo, un tema. Toca un mundo para entrar y ver sus niveles.' },
  { id: 'niveles', view: 'world', target: ['.path .node.current', '.path .node'], title: 'Cada nivel es una lección',
    text: 'Toca un nivel y luego «Empezar». Cada lección trae un video corto y después ejercicios para practicar lo que viste.' },
  { id: 'video', view: 'world', art: 'video', title: 'Primero, el video',
    text: 'Toca la pantalla para pausar y arrastra la barra de abajo para repetir una parte. Para pasar a los ejercicios, desliza hacia arriba.' },
  { id: 'ejercicios', view: 'world', art: 'ex', title: 'Después, los ejercicios',
    text: 'Casi todos son juegos: arrastra, toca o escribe tu respuesta y pulsa «Comprobar». Si te trabas, busca «Ver pista»: te orienta sin darte la respuesta.' },
  { id: 'progreso', view: 'world', target: ['.tb-stats'], title: 'Racha y experiencia',
    text: 'La llama cuenta tus días seguidos y el rayo tu experiencia (XP). Dentro de cada lección verás tus vidas: cada error cuesta una y vuelven solas con el tiempo.',
    review: 'La llama cuenta tus días seguidos y el rayo tu experiencia (XP). Tus vidas están dentro de cada lección; en modo revisión, como ahora, no las pierdes al fallar.' },
  { id: 'gimnasio', view: 'world', target: ['.gym-fab'], title: 'Gimnasio: entrena con guía',
    text: 'En cada curso flota este botón: retos un poco más difíciles sobre lo que ya viste, con un entrenador que te sugiere el procedimiento paso a paso.' },
  { id: 'tutorias', view: 'world', target: ['#tabbar [data-tab="tutorias"]'], title: 'Tutorías: ayuda en vivo',
    text: '¿Te trabaste? Separa una asesoría virtual: eliges la materia, los temas que quieres reforzar, el día y la hora.' },
  { id: 'perfil', view: 'world', target: ['#tabbar [data-tab="profile"]'], title: 'Tú',
    text: 'Aquí ves tu racha y tu experiencia y pones tu nombre. En el piñón de arriba están los ajustes: meta diaria, tema claro u oscuro y repetir este recorrido.' },
  { id: 'fin', view: 'world', target: ['.path .node.current', '.path .node'], art: 'mascot', title: '¡Todo listo!',
    text: 'Toca este nivel para empezar la lección y avanza a tu ritmo. ¡Mucho éxito!' },
];

// Solo para quien abre la app por primera vez: sin recorrido hecho y sin ningún progreso.
function tourShouldStart(s) {
  return !s.tourDone && !s.xp && !Object.keys(s.done || {}).length;
}

// Hueco iluminado alrededor del elemento (con margen), sin salirse de la pantalla. Sin elemento se
// cierra en el centro: la sombra del hueco oscurece todo.
function tourHole(rect, vw, vh, pad = 6, edge = 4) {
  if (!rect) return { left: vw / 2, top: vh / 2, width: 0, height: 0 };
  const cl = (v, max) => Math.max(edge, Math.min(max - edge, v));
  const l = cl(rect.left - pad, vw), t = cl(rect.top - pad, vh);
  const r = cl(rect.left + rect.width + pad, vw), b = cl(rect.top + rect.height + pad, vh);
  return { left: l, top: t, width: Math.max(0, r - l), height: Math.max(0, b - t) };
}

// Dónde va la tarjeta: debajo del hueco si cabe, si no arriba, y si no donde haya más espacio.
// `bounds` son los bordes izquierdo y derecho de la columna de la app. `arrow`: posición horizontal
// de la flecha dentro de la tarjeta, apuntando al centro del hueco.
function tourTipPos(hole, tipW, tipH, vw, vh, bounds, gap = 14, edge = 8) {
  const bw = bounds.right - bounds.left;
  const clampX = x => (tipW > bw - 2 * edge ? bounds.left + (bw - tipW) / 2
    : Math.max(bounds.left + edge, Math.min(bounds.right - tipW - edge, x)));
  const clampY = y => Math.max(edge, Math.min(vh - tipH - edge, y));
  if (!hole.width && !hole.height) {
    return { side: 'center', left: clampX(bounds.left + (bw - tipW) / 2), top: Math.max(edge, (vh - tipH) / 2), arrow: tipW / 2 };
  }
  const cx = hole.left + hole.width / 2, below = hole.top + hole.height + gap, above = hole.top - gap - tipH;
  let side, top;
  if (below + tipH <= vh - edge) { side = 'below'; top = clampY(below); }
  else if (above >= edge) { side = 'above'; top = clampY(above); }
  else if (vh - (hole.top + hole.height) >= hole.top) { side = 'below'; top = clampY(below); }
  else { side = 'above'; top = clampY(above); }
  const left = clampX(cx - tipW / 2);
  return { side, left, top, arrow: Math.max(18, Math.min(tipW - 18, cx - left)) };
}

const TOUR_ART = {
  mascot: () => mascotSVG('cheer', 'tour-mascot'),   // el personaje (js/mascota.js)
  // Los videos siempre son oscuros: la ilustración usa colores fijos, como el reproductor.
  video: () => `<div class="tour-video" aria-hidden="true"><span class="tv-skip">Ejercicios →</span>
    <span class="tv-play">${ICON.play}</span><span class="tv-seek"><b></b></span></div>`,
  ex: () => `<div class="tour-ex" aria-hidden="true">
    <div class="te-row"><span class="te-chip">3</span><span class="te-chip drag">5</span><span class="te-slot"></span></div>
    <div class="te-row"><span class="te-hint">${ICON.bulb}Ver pista</span><span class="te-check">Comprobar</span></div></div>`,
};

let tourEnd = null;
const tourOpen = () => !!tourEnd;
function endTour() { tourEnd?.(); }

// Deja detrás la vista que el paso necesita: el mapa de mundos o el mundo donde va el estudiante.
function tourView(v) {
  if (sheetIsOpen) closeSheet();
  const c = courseById(S.course), cur = currentLesson(c);
  // Con componentes (c.blocks) el mapa vive dentro de un componente: se abre el de la lección que toca.
  const needBlock = !!c.blocks && openBlock?.course !== c.id;
  if (needBlock) openBlock = { course: c.id, id: (cur && blockOf(c, cur)) || c.blocks[0].id };
  if (v === 'map') {
    if (tab !== 'learn' || openWorld || needBlock) { openWorld = null; go('learn'); }
    return;
  }
  if (tab === 'learn' && openWorld?.course === c.id) return;
  openWorld = { course: c.id, i: Math.max(0, c.units.findIndex(u => u.lessons.includes(cur))) };
  go('learn');
}

function startTour() {
  if (tourEnd || typeof lessonClose === 'function') return;
  const PASOS = TOUR_STEPS.filter(p => p.id !== 'tutorias' || !cuentaDeColegio()), n = PASOS.length;   // sin asesorías si las maneja su institución
  const layer = document.createElement('div');
  layer.className = 'tour';
  layer.innerHTML = `<div class="tour-hole"></div>
    <div class="tour-tip" role="dialog" aria-modal="true" aria-labelledby="tour-title" aria-describedby="tour-text">
      <button class="icon-btn tour-x" type="button" aria-label="Saltar el recorrido">${ICON.x}</button>
      <div class="tour-art"></div>
      <p class="eyebrow tour-count"></p>
      <h3 id="tour-title"></h3><p id="tour-text"></p>
      <div class="tour-dots" aria-hidden="true">${PASOS.map(() => '<i></i>').join('')}</div>
      <div class="tour-actions"><button class="btn ghost" type="button" data-prev></button><button class="btn" type="button" data-next></button></div>
      <i class="tour-arrow" aria-hidden="true"></i>
    </div>`;
  const hole = $('.tour-hole', layer), tip = $('.tour-tip', layer);
  const prevBtn = $('[data-prev]', layer), nextBtn = $('[data-next]', layer);
  const inert = ['#app', '#overlay', '#sheet'].map(q => $(q)).filter(el => el && !el.inert);
  const before = document.activeElement;
  let i = 0, timer = null;

  const targetOf = step => (step.target || []).map(q => document.querySelector(q)).find(Boolean) || null;

  // Coloca el hueco y la tarjeta según dónde está el elemento ahora (la app puede volver a pintarse
  // o cambiar de tamaño mientras el recorrido está abierto).
  function place() {
    const el = targetOf(PASOS[i]);
    let r = el?.getBoundingClientRect();
    // Si la app se volvió a pintar o la pantalla giró y el elemento quedó fuera de la vista, se trae de vuelta.
    if (r && r.width && (r.bottom < 0 || r.top > innerHeight)) { el.scrollIntoView({ block: 'center', inline: 'nearest' }); r = el.getBoundingClientRect(); }
    const h = tourHole(r && r.width ? r : null, innerWidth, innerHeight);
    const centered = !h.width && !h.height;
    layer.classList.toggle('center', centered);
    let radius = '50%';
    if (!centered) {
      const br = getComputedStyle(el).borderTopLeftRadius;
      radius = br.endsWith('%') ? br : `${Math.max(14, (parseFloat(br) || 0) + 6)}px`;
    }
    Object.assign(hole.style, { left: `${h.left}px`, top: `${h.top}px`, width: `${h.width}px`, height: `${h.height}px`, borderRadius: radius });
    const app = $('#app').getBoundingClientRect();
    const p = tourTipPos(h, tip.offsetWidth, tip.offsetHeight, innerWidth, innerHeight, { left: app.left, right: app.right });
    tip.dataset.side = p.side;
    Object.assign(tip.style, { left: `${p.left}px`, top: `${p.top}px` });
    tip.style.setProperty('--arrow', `${p.arrow}px`);
    // ¿La tarjeta quedó sin tapar el hueco?
    return centered || (p.side === 'below' ? p.top >= h.top + h.height : p.top + tip.offsetHeight <= h.top);
  }

  function show(k) {
    i = Math.max(0, Math.min(n - 1, k));
    const step = PASOS[i];
    tourView(step.view);
    $('.tour-art', layer).innerHTML = step.art ? TOUR_ART[step.art]() : '';
    $('.tour-count', layer).textContent = `Paso ${i + 1} de ${n}`;
    $('#tour-title', layer).textContent = step.title;
    $('#tour-text', layer).textContent = S.unlockAll && step.review ? step.review : step.text;
    layer.querySelectorAll('.tour-dots i').forEach((d, j) => d.classList.toggle('on', j === i));
    prevBtn.textContent = i === 0 ? 'Saltar' : 'Atrás';
    nextBtn.textContent = i === 0 ? 'Empezar' : i === n - 1 ? '¡A aprender!' : 'Siguiente';
    // El elemento va al centro; si en una pantalla baja la tarjeta lo taparía, se lleva al fondo
    // para dejarle sitio arriba.
    targetOf(step)?.scrollIntoView({ block: 'center', inline: 'nearest' });
    if (!place()) { targetOf(step).scrollIntoView({ block: 'end', inline: 'nearest' }); place(); }
    nextBtn.focus({ preventScroll: true });
  }

  const next = () => (i === n - 1 ? finish() : show(i + 1));
  const prev = () => (i === 0 ? finish() : show(i - 1));

  // Ninguna tecla llega a la app de atrás: flechas y Enter recorren los pasos, Esc lo salta.
  function key(e) {
    if (dialogOpen()) return;
    e.stopPropagation();
    const onButton = document.activeElement?.tagName === 'BUTTON';
    if (e.key === 'Escape') { e.preventDefault(); finish(); }
    else if (e.key === 'ArrowRight' || (e.key === 'Enter' && !onButton)) { e.preventDefault(); next(); }
    else if (e.key === 'ArrowLeft' && i > 0) { e.preventDefault(); prev(); }
    else if (e.key === 'Tab') {
      const bs = [...tip.querySelectorAll('button')], at = bs.indexOf(document.activeElement);
      e.preventDefault(); bs[(at + (e.shiftKey ? bs.length - 1 : 1)) % bs.length].focus();
    }
  }

  function finish() {
    if (tourEnd !== finish) return;
    tourEnd = null;
    S.tourDone = true; save();
    clearInterval(timer);
    document.removeEventListener('keydown', key, true);
    removeEventListener('resize', place);
    inert.forEach(el => { el.inert = false; });
    layer.classList.remove('open');
    setTimeout(() => layer.remove(), 250);
    (document.querySelector('.path .node.current') || (before?.isConnected ? before : null))?.focus?.({ preventScroll: true });
  }

  // Los toques se quedan en la capa (la app de atrás no se mueve); tocar el hueco avanza.
  ['mousedown', 'mouseup', 'touchstart', 'touchend', 'pointerdown', 'pointerup']
    .forEach(t => layer.addEventListener(t, e => e.stopPropagation()));
  // En el último paso el hueco está sobre el primer nivel: tocarlo cierra el recorrido y abre ese nivel.
  hole.onclick = () => {
    const el = i === n - 1 && targetOf(PASOS[i]);
    next();
    if (el) el.click();
  };
  nextBtn.onclick = next;
  prevBtn.onclick = prev;
  $('.tour-x', layer).onclick = finish;

  tourEnd = finish;
  inert.forEach(el => { el.inert = true; });
  document.addEventListener('keydown', key, true);
  addEventListener('resize', place);
  document.body.appendChild(layer);
  show(0);
  timer = setInterval(place, 400);
  requestAnimationFrame(() => layer.classList.add('open'));
}
;
//#archivo js/tutorias.js
// Pestaña Tutorías: el estudiante separa una asesoría virtual eligiendo la materia, los temas que quiere
// reforzar (las lecciones de esa materia en la app), el día y la hora. No hay nombres de tutores.
// Diseño: docs/superpowers/specs/2026-11-12-tutorias.md.
//
// La app no tiene servidor: la reserva se guarda en el celular (S.tutorias). Con `whatsapp` puesto, la
// confirmación ofrece avisar a coordinación con el mensaje ya escrito.
const TUTORIAS = {
  whatsapp: '',    // WhatsApp de coordinación, solo dígitos con indicativo (p. ej. '573001234567'); vacío = sin aviso
  mins: 60,        // duración de una asesoría
  leadMin: 60,     // anticipación mínima para separar, en minutos
  days: 7,         // cuántos días hacia adelante se ofrecen
  max: 3,          // asesorías pendientes a la vez
  maxTopics: 4,    // temas por asesoría
  // Horario de atención: día de la semana (0 = domingo … 6 = sábado) → horas de inicio, hora local del celular.
  hours: {
    1: ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
    2: ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
    3: ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
    4: ['14:00', '15:00', '16:00', '17:00', '18:00', '19:00'],
    5: ['14:00', '15:00', '16:00', '17:00', '18:00'],
    6: ['09:00', '10:00', '11:00'],
  },
};

// ---- lógica pura (se prueba en Node; `now` es un número de milisegundos) ----
const TU_DOW = ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'];
const TU_MON = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
const tuPad = n => String(n).padStart(2, '0');
const tuKey = d => `${d.getFullYear()}-${tuPad(d.getMonth() + 1)}-${tuPad(d.getDate())}`;
function tuDate(date, time = '00:00') {
  const [y, m, d] = date.split('-').map(Number), [h, mi] = time.split(':').map(Number);
  return new Date(y, m - 1, d, h, mi);
}
// Los cupos son en hora de Colombia (UTC−5, sin horario de verano), esté donde esté el estudiante.
const tuStart = b => { const [y, m, d] = b.date.split('-').map(Number), [h, mi] = b.time.split(':').map(Number); return Date.UTC(y, m - 1, d, h + 5, mi); };
const tuHoy = now => { const d = new Date(now - 5 * 3600000); return new Date(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()); };   // el día de hoy en Colombia
const tuEnd = b => tuStart(b) + (b.mins || TUTORIAS.mins) * 60000;
// Lo que venga dañado del almacenamiento (o del formato viejo, sin temas) se descarta en vez de romper la pestaña.
const tuValid = b => !!b && typeof b === 'object' && /^\d{4}-\d\d-\d\d$/.test(b.date) && /^\d\d:\d\d$/.test(b.time)
  && typeof b.course === 'string' && Array.isArray(b.topics) && typeof b.id === 'string'
  && (b.mins == null || (Number.isFinite(b.mins) && b.mins > 0 && b.mins <= 240));
const tuList = mine => (Array.isArray(mine) ? mine.filter(tuValid) : []);

// Asesorías que no han terminado, de la más cercana a la más lejana.
function activeTutorias(mine, now) {
  return tuList(mine).filter(b => tuEnd(b) > now).sort((a, b) => tuStart(a) - tuStart(b));
}

// Los próximos días: [{ date, slots: [{ time, free }] }]. Solo cupos que aún se pueden separar; `free` es
// false si choca con otra asesoría del estudiante.
function tutoriaDays(now, mine, hours = TUTORIAS.hours) {
  const busy = activeTutorias(mine, now), first = tuHoy(now), out = [];
  for (let i = 0; i < TUTORIAS.days; i++) {
    const d = new Date(first.getFullYear(), first.getMonth(), first.getDate() + i), date = tuKey(d);
    const slots = (hours[d.getDay()] || []).map(time => {
      const s = { date, time, mins: TUTORIAS.mins };
      return { time, start: tuStart(s), free: !busy.some(b => tuStart(b) < tuEnd(s) && tuStart(s) < tuEnd(b)) };
    }).filter(s => s.start - now >= TUTORIAS.leadMin * 60000).map(({ time, free }) => ({ time, free }));
    out.push({ date, slots });
  }
  return out;
}

function nextFree(now, mine, hours = TUTORIAS.hours) {
  for (const d of tutoriaDays(now, mine, hours)) {
    const s = d.slots.find(x => x.free);
    if (s) return { date: d.date, time: s.time };
  }
  return null;
}

// Qué temas (ids de lección) tiene cada materia: { algebra: ['alg-0a', …], … }.
function tutoriaCatalog(courses) {
  return Object.fromEntries(courses.map(c => [c.id, c.units.flatMap(u => u.lessons.map(l => l.id))]));
}

// Marca o desmarca un tema; el que pasaría del máximo no entra.
function toggleTopic(topics, id) {
  if (topics.includes(id)) return topics.filter(t => t !== id);
  return topics.length >= TUTORIAS.maxTopics ? topics : [...topics, id];
}

// Separa una asesoría. `req`: { course, topics: [ids de lección], date, time, note }.
// Errores: 'course', 'topics', 'slot' (no existe o ya no se alcanza), 'max', 'busy'.
function bookTutoria(mine, req, now, catalog, hours = TUTORIAS.hours) {
  const list = tuList(mine), lessons = catalog[req.course];
  if (!lessons) return { ok: false, error: 'course' };
  const topics = [...new Set(Array.isArray(req.topics) ? req.topics : [])];
  if (!topics.length || topics.length > TUTORIAS.maxTopics || !topics.every(t => lessons.includes(t))) return { ok: false, error: 'topics' };
  const slot = tutoriaDays(now, list, hours).find(d => d.date === req.date)?.slots.find(s => s.time === req.time);
  if (!slot) return { ok: false, error: 'slot' };
  if (activeTutorias(list, now).length >= TUTORIAS.max) return { ok: false, error: 'max' };
  if (!slot.free) return { ok: false, error: 'busy' };
  const booking = {
    id: `tu-${now.toString(36)}-${list.length}`, course: req.course, topics, date: req.date, time: req.time, mins: TUTORIAS.mins,
    note: String(req.note ?? '').trim().slice(0, 140), made: now,
  };
  return { ok: true, booking, list: [...list, booking] };
}

const cancelTutoria = (mine, id) => (Array.isArray(mine) ? mine : []).filter(b => b && b.id !== id);

// «Hoy», «Mañana» o «lun 16 nov».
function dayLabel(date, now) {
  const d = tuDate(date), diff = Math.round((d - tuHoy(now)) / 86400000);
  return diff === 0 ? 'Hoy' : diff === 1 ? 'Mañana' : `${TU_DOW[d.getDay()]} ${d.getDate()} ${TU_MON[d.getMonth()]}`;
}
// '16:00' → «4:00 p. m.»
function hourLabel(time) {
  const [h, m] = time.split(':').map(Number);
  return `${h % 12 || 12}:${tuPad(m)} ${h < 12 ? 'a. m.' : 'p. m.'}`;
}

// Mensaje para coordinación y su enlace de WhatsApp ('' si no hay número).
function tutoriaText(b, name, courseName, topicTitles, now) {
  return `Hola, soy ${name || 'estudiante de Zuka'}. Quiero una asesoría virtual de ${courseName}: `
    + `${dayLabel(b.date, now)} (${b.date}) a las ${hourLabel(b.time)}, ${b.mins} min. Temas: ${topicTitles.join('; ')}.`
    + (b.note ? ` Nota: ${b.note}.` : '');
}
function tutoriaLink(text, phone = TUTORIAS.whatsapp) {
  const n = String(phone || '').replace(/\D/g, '');
  return n ? `https://wa.me/${n}?text=${encodeURIComponent(text)}` : '';
}

// ---- interfaz (usa S, view, save, openSheet, ask, toast, esc, ICON, COURSES, courseArt y findLesson de la app) ----
const tuCourse = id => COURSES.find(c => c.id === id);
const tuTitles = b => b.topics.map(id => findLesson(id)?.l.title).filter(Boolean);
const TU_ERRORS = {
  slot: 'Ese cupo ya no está disponible. Elige otra hora.',
  busy: 'Ya tienes una asesoría a esa hora.',
  max: `Puedes tener hasta ${TUTORIAS.max} asesorías pendientes. Cancela una para separar otra.`,
  topics: 'Elige al menos un tema para reforzar.',
  saldo: 'No te quedan horas para esta materia.',
  curso: 'Las asesorías son de los cursos que tienes comprados y vigentes.',
};

// Con cuenta, las asesorías están en la base y gastan horas (spec 2026-11-24-tienda-libros); sin candados (desarrollo) y en la
// cuenta administradora siguen guardadas en el dispositivo, para probar.
const tuServidor = () => typeof Cuenta !== 'undefined' && !!Cuenta.sb && !!Cuenta.user && !Cuenta.user.offline && !SIN_CANDADOS && !cuentaEsAdmin();
const tuTipo = id => (['calc', 'fis', 'int', 'lin'].includes(id) ? 'universidad' : 'general');   // igual que privado.tipo_asesoria
const tuSaldo = id => (typeof Tienda === 'undefined' ? 0 : Tienda.saldo[tuTipo(id)] || 0);
// Fila de la base → asesoría de la app (hora de Colombia).
function tuDeFila(r) {
  const d = new Date(new Date(r.inicio).getTime() - 5 * 3600000).toISOString();
  return { id: `srv-${r.id}`, course: r.curso, topics: r.temas, date: d.slice(0, 10), time: d.slice(11, 16), mins: r.minutos, note: r.nota, enlace: r.enlace, ok: r.estado === 'confirmada' };
}
async function asesoriasCarga() {
  if (!tuServidor()) return false;
  const uid = Cuenta.user.id, { data, error } = await Cuenta.sb.from('asesorias').select('*').eq('usuario', uid);
  if (error || !Cuenta.user || Cuenta.user.id !== uid) return false;
  S.tutorias = data.filter(r => ['pendiente', 'confirmada'].includes(r.estado)).map(tuDeFila); save();
  return true;
}

// ---- arma tu clase (spec 2026-11-25-tutorias-agenda): materia, hora y temas en la misma página, y un boleto que se llena ----
// Lo que falta para una asesoría: { d, h, m } o null si ya empezó. Pura.
function tuFalta(ms) {
  if (ms <= 0) return null;
  const m = Math.ceil(ms / 60000);
  return { d: Math.floor(m / 1440), h: Math.floor(m % 1440 / 60), m: m % 60 };
}
// La semana en rejilla: horas (filas) y días con atención (columnas). Cada casilla: 'libre', 'tuya' o '' (no hay o ya pasó). Pura.
function tuRejilla(days, hours = TUTORIAS.hours) {
  const dias = days.filter(d => (hours[tuDate(d.date).getDay()] || []).length), filas = [...new Set(dias.flatMap(d => hours[tuDate(d.date).getDay()]))].sort();
  return { dias, filas, celda: (d, t) => { const x = d.slots.find(y => y.time === t); return x ? (x.free ? 'libre' : 'tuya') : ''; } };
}
// Enlace para guardarla en Google Calendar (horas en UTC). Pura.
function tuCalendario(b, titulo, detalle) {
  const f = t => new Date(t).toISOString().replace(/[-:]|\.\d{3}/g, '');
  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(titulo)}&dates=${f(tuStart(b))}/${f(tuEnd(b))}&details=${encodeURIComponent(detalle)}`;
}
// Borrador: se conserva al cambiar de pestaña. `hecha`: la que se acaba de separar.
const tuNuevo = () => ({ c: '', unit: 0, topics: [], date: null, time: null, note: '', hecha: null });
let tuB = tuNuevo(), tuDe = null, tuOcupado = false;   // tuDe: de qué cuenta es el borrador
const tuUid = () => (typeof Cuenta !== 'undefined' && Cuenta.user?.id) || '';
const tuDeInst = c => !!accesoCursoFila(c.id)?.institucion;   // el contrato de una institución no trae asesorías
const tuCursos = () => cursosVisibles().filter(c => cursoComprado(c, true) && !tuDeInst(c)).sort((a, b) => (b.id === S.course) - (a.id === S.course));
function tuElige(c) {
  tuB = { ...tuB, c: c.id, topics: [], hecha: null, unit: Math.max(0, c.units.findIndex(u => u.lessons.some(l => !S.done[l.id]))) };
}
const tuHuso = () => (new Date().getTimezoneOffset() === 300 ? '' : ' · hora de Colombia');

// La próxima, en grande y con cuenta regresiva; las demás, debajo.
function tuProximaHTML(mine, now) {
  if (!mine.length) return '';
  const una = (b, grande) => {
    const c = tuCourse(b.course), titles = tuTitles(b), n = c?.name || 'Asesoría';
    return `<article class="tu-prox${grande ? ' grande' : ''}" style="--c:${c?.color || 'var(--brand)'}">
      ${c ? courseArt(c, grande ? 'xl' : 'lg') : ''}<div class="tp-txt">${grande ? '<p class="tp-eyebrow">Tu próxima clase</p>' : ''}<h2>${esc(n)}</h2><p class="tp-cuando"><b>${esc(dayLabel(b.date, now))}, ${hourLabel(b.time)}</b>${tuHuso()}${b.ok ? '<span class="tu-ok">Confirmada</span>' : ''}</p>
        ${titles.length || b.note ? `<p class="tp-temas">${esc(titles.join(' · '))}${b.note ? `${titles.length ? ' · ' : ''}«${esc(b.note)}»` : ''}</p>` : ''}
        <div class="tp-acts">${/^https:/.test(b.enlace || '') ? `<a class="btn brand" href="${esc(b.enlace)}" target="_blank" rel="noopener">Entrar a la reunión</a>` : ''}<a class="tu-link" href="${esc(tuCalendario(b, `Asesoría Zuka: ${n}`, titles.join('; ')))}" target="_blank" rel="noopener">Guardar en mi calendario</a><button class="tu-link mal" type="button" data-cancel="${esc(b.id)}" aria-label="Cancelar la asesoría de ${esc(n)}">Cancelar</button></div></div>
      ${grande ? `<div class="tp-reloj" data-inicio="${tuStart(b)}" role="timer" aria-label="Lo que falta"></div>` : ''}</article>`;
  };
  return `<section class="tu-mias" aria-label="Tus asesorías">${una(mine[0], true)}${mine.length > 1 ? `<div class="tu-otras">${mine.slice(1).map(b => una(b, false)).join('')}</div>` : ''}</section>`;
}
function tuRelojPinta(el) {
  const f = tuFalta(+el.dataset.inicio - Date.now());
  el.innerHTML = f ? [[f.d, f.d === 1 ? 'día' : 'días'], [f.h, f.h === 1 ? 'hora' : 'horas'], [f.m, 'min']].filter((x, i) => i || x[0]).map(([n, t]) => `<span><b>${n}</b><small>${t}</small></span>`).join('') : '<span class="ya"><b>¡Ya empezó!</b></span>';
}
let tuReloj = 0;

function renderTutorias() {
  const now = Date.now(), mine = activeTutorias(S.tutorias, now);
  if (!Array.isArray(S.tutorias) || mine.length !== S.tutorias.length) { S.tutorias = mine; save(); }   // las que ya pasaron se van
  if (tuDe !== tuUid()) { tuB = tuNuevo(); tuDe = tuUid(); }
  // Un repintado desde afuera (vuelve a la app, llega el pago) no mueve la página ni quita el foco de la nota.
  const nota = $('#tu-nota', view), sel = nota && document.activeElement === nota ? [nota.selectionStart, nota.selectionEnd] : null, y = $('.tu', view) ? view.scrollTop : 0;
  const courses = tuCursos(), srv = tuServidor();
  if (!courses.some(c => c.id === tuB.c)) { if (courses[0]) tuElige(courses[0]); else tuB.c = ''; }
  const fichas = (n, t) => `<span class="tu-saldo"><span aria-hidden="true">${Array.from({ length: Math.min(8, n) }, () => ICON.clock).join('')}</span><b>${n}</b> ${t}</span>`;
  view.innerHTML = `<div class="tutorias"><div class="tu">
    <header class="tu-head"><div><h1>Tutorías</h1><p class="muted">Una hora con un profe, en vivo, sobre lo que más te cuesta.</p></div>
      ${srv && (courses.length || Tienda.saldo.general + Tienda.saldo.universidad) ? `<div class="tu-horas">${fichas(Tienda.saldo.general, Tienda.saldo.general === 1 ? 'hora general' : 'horas generales')}${Tienda.saldo.universidad ? fichas(Tienda.saldo.universidad, 'de universidad') : ''}<button class="btn sm ghost" type="button" data-horas>Comprar horas</button></div>` : ''}</header>
    ${tuProximaHTML(mine, now)}
    ${courses.length ? `<section class="tu-arma" aria-label="Arma tu clase"><h2 class="tu-t">${mine.length ? 'Arma otra clase' : 'Arma tu clase'}</h2><div class="tu-cols"><div class="tu-pasos"></div><aside class="tu-boleto" aria-label="Tu boleto"></aside></div></section>`
    : `<div class="m-empty tu-vacio">${mascotSVG('think')}<p>Las asesorías son de los cursos que tienes comprados. Compra uno y sepáralas aquí.</p><button class="btn brand" type="button" data-cursos>Ver los cursos</button></div>`}
    ${srv || tutoriaLink('x') ? '' : '<p class="tu-note">Por ahora la asesoría se guarda solo en este dispositivo.</p>'}
  </div></div>`;
  $('[data-cursos]', view)?.addEventListener('click', () => openTienda('cursos'));
  $('[data-horas]', view)?.addEventListener('click', () => openTienda('asesorias'));
  clearInterval(tuReloj);
  const reloj = $('.tp-reloj', view);
  if (reloj) { tuRelojPinta(reloj); tuReloj = setInterval(() => (reloj.isConnected ? tuRelojPinta(reloj) : clearInterval(tuReloj)), 15000); }
  view.querySelectorAll('[data-cancel]').forEach(b => b.onclick = () => tuCancela(b.dataset.cancel));
  if (courses.length) tuPinta(courses);
  view.scrollTop = y;
  if (sel && $('#tu-nota', view)) { $('#tu-nota', view).focus({ preventScroll: true }); $('#tu-nota', view).setSelectionRange(...sel); }
}
function tuCancela(id) {
  const bk = S.tutorias.find(x => x.id === id);
  if (!bk) return renderTutorias();
  if (tuServidor() && !bk.id.startsWith('srv-')) return asesoriasCarga().catch(() => false).then(ok => { if (tab === 'tutorias') renderTutorias(); toast(ok ? 'Listo: ya puedes cancelarla.' : 'No se pudo cargar. Revisa tu conexión.'); });
  if (bk.id.startsWith('srv-') && !tuServidor()) return toast('Necesitas conexión para cancelarla.');
  ask({ title: '¿Cancelar esta asesoría?', text: `${tuCourse(bk.course)?.name || 'Asesoría'}: ${dayLabel(bk.date, Date.now())}, ${hourLabel(bk.time)}. ${!tuServidor() ? 'Puedes separar otra cuando quieras.' : tuStart(bk) - Date.now() >= 12 * 3600000 ? 'La hora vuelve a tu saldo.' : 'Faltan menos de 12 horas: la hora no vuelve a tu saldo.'}`, ok: 'Sí, cancelar', cancel: 'Conservarla', danger: true })
    .then(async yes => {
      if (!yes) return;
      if (tuB.hecha?.id === bk.id || tuB.hecha?.date === bk.date && tuB.hecha?.time === bk.time) tuB.hecha = null;
      if (tuServidor()) {
        const r = await Cuenta.sb.rpc('cancelar_asesoria', { p_id: Number(bk.id.slice(4)) }).then(x => x, x => ({ error: x }));
        if (r.error) return toast('No se pudo cancelar. Revisa tu conexión.');
        await Promise.all([asesoriasCarga(), tiendaMios()]); if (tab === 'tutorias') renderTutorias();
        return toast(r.data && r.data.vuelve ? 'Cancelada: la hora volvió a tu saldo.' : 'Asesoría cancelada.');
      }
      S.tutorias = cancelTutoria(S.tutorias, bk.id); save(); if (tab === 'tutorias') renderTutorias(); toast('Asesoría cancelada.');
    });
}
// Los tres pasos y el boleto. Cambiar algo redibuja solo lo suyo.
function tuPinta(courses) {
  const pasos = $('.tu-pasos', view), boleto = $('.tu-boleto', view), now = Date.now(), days = tutoriaDays(now, S.tutorias), R = tuRejilla(days);
  const lleno = activeTutorias(S.tutorias, now).length >= TUTORIAS.max, c = () => tuCourse(tuB.c);
  const dia = () => days.find(d => d.date === tuB.date), sigue = () => dia()?.slots.some(s => s.time === tuB.time && s.free);
  if (!tuB.hecha && tuB.time && !sigue()) { tuB.date = tuB.time = null; }
  const hayCupo = R.dias.some(d => d.slots.some(s => s.free));
  pasos.innerHTML = `<section class="tu-paso"><h3><i>1</i>La materia</h3><div class="tu-materias" role="radiogroup" aria-label="Materia">${courses.map(x => `<button type="button" class="tu-mat" role="radio" data-mat="${x.id}" style="--c:${x.color}">${courseArt(x, 'lg')}<b>${esc(x.name)}</b></button>`).join('')}</div></section>
    <section class="tu-paso"><h3><i>2</i>El día y la hora<small>${tuHuso().slice(3)}</small></h3>${lleno ? `<p class="tu-aviso">Ya tienes ${TUTORIAS.max} asesorías pendientes. Cancela una para separar otra.</p>` : !hayCupo ? '<p class="tu-aviso">No quedan cupos esta semana.</p>' : `<div class="tu-ficha-fila"><span class="tu-ficha" aria-hidden="true"></span><p>Toca una casilla, o arrastra la ficha hasta la hora que te sirva.</p></div>
      <div class="tu-semana" role="group" aria-label="Horas de la semana" style="--n:${R.dias.length}"><span></span>${R.dias.map(d => { const x = tuDate(d.date), l = dayLabel(d.date, now); return `<span class="ts-dia${l === 'Hoy' ? ' hoy' : ''}"><small>${l === 'Hoy' ? 'hoy' : TU_DOW[x.getDay()]}</small><b>${x.getDate()}</b></span>`; }).join('')}
      ${R.filas.map(t => `<span class="ts-hora">${hourLabel(t).replace(':00', '').replace('a. m.', 'am').replace('p. m.', 'pm')}</span>${R.dias.map(d => { const e = R.celda(d, t); return e === 'libre' ? `<button type="button" class="ts-c" data-d="${d.date}" data-t="${t}" aria-label="${esc(dayLabel(d.date, now))}, ${hourLabel(t)}"></button>` : `<span class="ts-c ${e}"${e ? ` title="Ya tienes una asesoría a esa hora"` : ''}></span>`; }).join('')}`).join('')}</div>`}</section>
    <section class="tu-paso"><h3><i>3</i>Los temas<small class="tu-cuenta"></small></h3><div class="tu-unis" role="group" aria-label="Mundo"></div><div class="tu-lecs" role="group" aria-label="Temas"></div>
      <label class="tu-nota" for="tu-nota">¿Algo más que deba saber el profe? (opcional)</label><textarea id="tu-nota" class="ag-topic" rows="2" maxlength="140" placeholder="Ej.: tengo parcial el viernes y me enredo con los signos">${esc(tuB.note)}</textarea></section>`;
  const q = s => $(s, pasos), qa = s => [...pasos.querySelectorAll(s)];
  const pintaMat = () => { qa('[data-mat]').forEach(b => { const on = b.dataset.mat === tuB.c; b.setAttribute('aria-checked', on); b.tabIndex = on ? 0 : -1; }); $('.tu-arma', view).style.setProperty('--c', c().color); const f = q('.tu-ficha'); if (f) f.innerHTML = courseArt(c(), 'md'); };
  const pintaHora = () => qa('button.ts-c').forEach(b => { const on = !tuB.hecha && b.dataset.d === tuB.date && b.dataset.t === tuB.time; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); b.innerHTML = on ? courseArt(c(), 'md') : ''; });
  const pintaTemas = () => {
    const us = c().units, x = q('.tu-unis').scrollLeft, lleno4 = tuB.topics.length >= TUTORIAS.maxTopics;
    q('.tu-unis').innerHTML = us.map((u, i) => { const w = WORLDS[u.world] || { name: u.title }, n = u.lessons.filter(l => tuB.topics.includes(l.id)).length; return `<button type="button" class="tu-uni" data-uni="${i}" aria-pressed="${i === tuB.unit}" style="--c:${c().color}"><span class="world-art" aria-hidden="true">${w.art || ''}</span><span>${esc(w.name)}</span>${n ? `<b>${n}<span class="tu-sr"> elegidos</span></b>` : ''}</button>`; }).join('');
    q('.tu-unis').scrollLeft = x;
    q('.tu-lecs').innerHTML = us[tuB.unit].lessons.map(l => { const on = tuB.topics.includes(l.id); return `<button type="button" class="tu-lec" data-lec="${l.id}" aria-pressed="${on}"${!on && lleno4 ? ' disabled' : ''}><i>${on ? ICON.check : ''}</i><span>${esc(l.title)}</span></button>`; }).join('');
    q('.tu-cuenta').textContent = `${tuB.topics.length} de ${TUTORIAS.maxTopics}`;
  };
  const pintaBoleto = (nuevo = '') => {
    if (tuOcupado) { if (!boleto.firstChild) boleto.innerHTML = '<p role="status">Separando tu asesoría…</p>'; return; }   // el boleto no cambia
    const h = tuB.hecha, b = h || tuB, x = h ? tuCourse(h.course) : c(), sin = tuServidor() && !h && tuSaldo(x.id) < 1, ts = h ? tuTitles(h) : tuB.topics.map(id => findLesson(id)?.l.title || '');
    const fecha = b.date && b.time, falta = lleno ? 'Ya tienes el máximo de asesorías.' : sin ? 'No te quedan horas para esta materia.' : !fecha ? 'Elige el día y la hora.' : !tuB.topics.length ? 'Elige al menos un tema.' : '';
    boleto.style.setProperty('--c', x.color); boleto.classList.toggle('listo', !h && !falta); boleto.classList.toggle('hecha', !!h);
    boleto.innerHTML = `<div class="tb-cab">${courseArt(x, 'lg')}<div><small>Asesoría virtual · ${b.mins || TUTORIAS.mins} min</small><b>${esc(x.name)}</b></div></div>
      <div class="tb-corte" aria-hidden="true"></div>
      <dl><div class="${nuevo === 'hora' ? 'pop' : ''}"><dt>Cuándo</dt><dd>${fecha ? `<b>${esc(dayLabel(b.date, now))}</b>, ${hourLabel(b.time)}` : '<i>Por elegir</i>'}</dd></div></dl>
      <ul class="tb-temas" aria-label="Temas">${Array.from({ length: h ? ts.length : TUTORIAS.maxTopics }, (_, i) => (ts[i] ? `<li class="${nuevo === 'tema' && i === ts.length - 1 ? 'pop' : ''}"><span>${esc(ts[i])}</span>${h ? '' : `<button type="button" data-quita="${esc(tuB.topics[i])}" aria-label="Quitar ${esc(ts[i])}">${ICON.x}</button>`}</li>` : `<li class="hueco"><span>${i ? '' : 'Tu primer tema'}</span></li>`)).join('')}</ul>
      ${h ? `<span class="tb-sello" aria-hidden="true">Separada</span><div class="tb-pie" role="status"><p><b class="tu-fin" tabindex="-1">¡Asesoría separada!</b> ${h.wa ? 'Avísale a coordinación por WhatsApp para confirmar tu cupo y recibir el enlace.' : h.srv ? 'Te confirmamos y te enviamos el enlace. Lo verás arriba.' : 'Quedó guardada en este dispositivo. Todavía no le avisa a ningún tutor.'}</p>
        ${h.wa ? `<a class="btn brand" href="${esc(h.wa)}" target="_blank" rel="noopener">Avisar por WhatsApp</a>` : ''}<button class="btn ghost" type="button" data-otra>Armar otra</button></div>`
        : `<div class="tb-pie"><p role="status">${falta || 'Todo listo.'}</p>${sin ? '<button class="btn brand" type="button" data-horas2>Comprar horas</button>' : `<button class="btn brand" type="button" data-ok${falta ? ' disabled' : ''}>Separar asesoría</button>`}</div>`}`;
    const z = s => $(s, boleto);
    boleto.querySelectorAll('[data-quita]').forEach(k => { k.onclick = () => { if (tuOcupado) return; tuB.topics = toggleTopic(tuB.topics, k.dataset.quita); pintaTemas(); pintaBoleto(); (z('[data-quita]') || q('.tu-lec:not(:disabled)'))?.focus({ preventScroll: true }); }; });
    if (z('[data-ok]')) z('[data-ok]').onclick = () => tuSepara();
    if (z('[data-horas2]')) z('[data-horas2]').onclick = () => openTienda('asesorias');
    if (z('[data-otra]')) z('[data-otra]').onclick = () => { tuB = { ...tuB, hecha: null, topics: [], date: null, time: null, note: '' }; renderTutorias(); $('.tu-mat[aria-checked="true"]', view)?.focus({ preventScroll: true }); };
  };
  const limpia = () => { if (tuB.hecha) tuB.hecha = null; };
  const mat = id => { if (tuOcupado) return; tuElige(tuCourse(id)); pintaMat(); pintaHora(); pintaTemas(); pintaBoleto(); q('.tu-unis').scrollLeft = Math.max(0, (q('.tu-uni[aria-pressed="true"]')?.offsetLeft || 0) - q('.tu-unis').offsetLeft - 16); };
  const hora = (d, t) => { if (tuOcupado) return; limpia(); tuB.date = d; tuB.time = t; pintaHora(); pintaBoleto('hora'); };
  pasos.onclick = e => {
    const b = e.target.closest('button'); if (!b || b.disabled || tuOcupado) return;
    const d = b.dataset;
    if (d.mat) return mat(d.mat);
    if (d.t) return hora(d.d, d.t);
    if (d.uni) { tuB.unit = +d.uni; pintaTemas(); return q(`[data-uni="${d.uni}"]`).focus({ preventScroll: true }); }
    if (d.lec) { limpia(); const n = tuB.topics.length; tuB.topics = toggleTopic(tuB.topics, d.lec); pintaTemas(); pintaBoleto(tuB.topics.length > n ? 'tema' : ''); q(`[data-lec="${d.lec}"]`)?.focus({ preventScroll: true }); }
  };
  q('.tu-materias').onkeydown = e => { const k = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]; if (!k) return; e.preventDefault(); const i = (courses.findIndex(x => x.id === tuB.c) + k + courses.length) % courses.length; mat(courses[i].id); q(`[data-mat="${courses[i].id}"]`).focus({ preventScroll: true }); };
  // La semana con flechas: se salta a la casilla libre más cercana en esa dirección.
  const sem = q('.tu-semana');
  if (sem) sem.onkeydown = e => {
    const k = { ArrowRight: [1, 0], ArrowLeft: [-1, 0], ArrowDown: [0, 1], ArrowUp: [0, -1] }[e.key], b = e.target.closest('button.ts-c'); if (!k || !b) return;
    e.preventDefault(); let x = R.dias.findIndex(d => d.date === b.dataset.d), y = R.filas.indexOf(b.dataset.t);
    for (let n = 0; n < 12; n++) { x += k[0]; y += k[1]; if (x < 0 || y < 0 || x >= R.dias.length || y >= R.filas.length) return; const o = q(`button.ts-c[data-d="${R.dias[x].date}"][data-t="${R.filas[y]}"]`); if (o) return o.focus(); }
  };
  $('#tu-nota', pasos).oninput = e => { tuB.note = e.target.value; };
  // La ficha se arrastra a una casilla.
  const f = q('.tu-ficha');
  if (f) {
    let id = null, cop = null, sobre = null;
    const marca = o => { if (sobre === o) return; sobre?.classList.remove('sobre'); sobre = o; sobre?.classList.add('sobre'); };
    const fin = e => { if (e.pointerId !== id) return; id = null; cop?.remove(); cop = null; f.classList.remove('fuera'); sem.classList.remove('espera'); const o = e.type === 'pointerup' ? sobre : null; marca(null); if (o) hora(o.dataset.d, o.dataset.t); };
    f.onpointerdown = e => { if (e.button) return; id = e.pointerId; f.setPointerCapture(id); cop = f.cloneNode(true); cop.classList.add('vuela'); document.body.append(cop); f.classList.add('fuera'); sem.classList.add('espera'); f.onpointermove(e); };
    f.onpointermove = e => { if (e.pointerId !== id || !cop) return; if (!f.isConnected) { cop.remove(); cop = null; id = null; return; } cop.style.left = `${e.clientX / zk()}px`; cop.style.top = `${e.clientY / zk()}px`; marca(document.elementFromPoint(e.clientX, e.clientY)?.closest('button.ts-c') || null); };
    f.onpointerup = fin; f.onpointercancel = fin; f.onlostpointercapture = fin;
    f.addEventListener('touchstart', e => e.preventDefault(), { passive: false });
  }
  document.querySelectorAll('body > .tu-ficha').forEach(x => x.remove());
  pintaMat(); pintaHora(); pintaTemas(); pintaBoleto();
  q('.tu-unis').scrollLeft = Math.max(0, (q('.tu-uni[aria-pressed="true"]')?.offsetLeft || 0) - q('.tu-unis').offsetLeft - 16);
}
async function tuSepara() {
  const c = tuCourse(tuB.c), ok = $('.tu-boleto [data-ok]', view), n = Date.now();
  if (!c || !ok || ok.disabled || tuOcupado) return;
  if (!cursoComprado(c, true) || tuDeInst(c)) return toast(TU_ERRORS.curso);
  if (typeof planMotivo === 'function' && planMotivo('tutorias')) return openBloqueo('tutorias');   // tutorías: con horas en el saldo
  const req = { course: c.id, topics: tuB.topics, date: tuB.date, time: tuB.time, note: tuB.note }, r = bookTutoria(S.tutorias, req, n, tutoriaCatalog(COURSES));
  if (!r.ok) { toast(TU_ERRORS[r.error] || TU_ERRORS.slot); if (r.error === 'slot' || r.error === 'busy') { tuB.date = tuB.time = null; } return renderTutorias(); }
  const srv = tuServidor(), uid = tuUid();
  if (srv) {
    tuOcupado = true; ok.disabled = true; ok.textContent = 'Un momento…';
    const x = await Cuenta.sb.rpc('separar_asesoria', { p: { curso: req.course, temas: req.topics, fecha: req.date, hora: req.time, nota: req.note } }).then(y => y, y => ({ error: y }));
    const [cargo] = await Promise.all([asesoriasCarga().catch(() => false), tiendaMios().catch(() => {})]);
    tuOcupado = false;
    if (uid !== tuUid()) { if (tab === 'tutorias') renderTutorias(); return; }   // cambió de cuenta mientras tanto
    // Se separó pero no se pudo recargar: queda a la vista hasta la próxima carga.
    if (!x.error && cargo !== true) { S.tutorias = r.list; save(); }
    if (x.error) { toast(TU_ERRORS[x.error.message] || 'No se pudo separar. Revisa tu conexión.'); if (tab === 'tutorias') renderTutorias(); return; }
  } else { S.tutorias = r.list; save(); }
  const b = r.booking, wa = tutoriaLink(tutoriaText(b, S.name, c.name, tuTitles(b), n), (typeof Cuenta !== 'undefined' && Cuenta.ajustes.whatsapp) || TUTORIAS.whatsapp);
  tuB = { ...tuB, hecha: { ...b, wa, srv }, topics: [], date: null, time: null, note: '' };
  if (tab !== 'tutorias') return;
  const y = view.scrollTop; renderTutorias(); view.scrollTop = y;
  $('.tu-fin', view)?.focus(); $('.tu-boleto', view)?.scrollIntoView({ block: 'nearest', behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}
;
//#archivo js/conceptos.js
// Conceptos animados del gimnasio (spec 2026-11-20-preuda-razonamiento-diez). Cuando el estudiante se atasca en un paso de
// un reto, «Recordar el concepto» abre una tarjeta con una animación corta: un dibujo que se arma por tiempos, cada uno con su
// rótulo. Un concepto es solo datos: CONCEPTOS[id] = { title, scene, beats: [texto con $TeX$ por tiempo] }.
// La escena es SVG (320 × 170). Cada pieza lleva `b`: el tiempo en que aparece (0 = desde el inicio). Tipos de escena:
//   barra   { bars: [{ label, b, segs: [{ w (0–1), t, c, b }] }] }             partes de un todo, lo que queda, porcentajes
//   recta   { min, max, ticks: [n], hops: [{ from, to, t, c, b }], dots: [{ v, t, c, b }] }       saltos en la recta
//   venn    { a, b, regs: { a: {t, b}, ab: {t, b}, b: {t, b}, out: {t, b} } }                      dos conjuntos
//   arbol   { levels: [{ n, labels, b }], foot: { t, b } }                      ramas que se multiplican
//   tabla   { cols, rows, cells: [[texto]], hl: [{ r, c, col, b }] }            tabla con casillas que se encienden
//   ciclo   { items: [texto], marks: [{ i, b, c }], center: { t, b } }          rueda de un patrón que se repite
//   figura  { shapes: [{ k: 'poly' | 'line' | 'circle' | 'rect' | 'text', … , c, fill, b }] }     dibujo libre
//   pasos   { lines: [texto] }                                                  un renglón por tiempo
// Colores `c`: 'a' (el del curso), 'g' (dorado), 'f' (naranja), 'ok', 'bad', 'ink', 'mute'.
const CONCEPTOS = {};

const CON = (() => {
  const W = 320, H = 170;
  const COL = { a: 'var(--c-ink, var(--brand))', g: 'var(--gold)', f: 'var(--fire)', ok: 'var(--ok)', bad: 'var(--bad)', ink: 'var(--ink)', mute: 'var(--mute)' };
  const col = c => COL[c] || COL.a;
  const e = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
  const at = (b, fx = 'pop') => ` data-b="${b || 0}" data-fx="${fx}"`;
  const txt = (t, x, y, o = {}) => `<text x="${x}" y="${y}" font-size="${o.s || 12}" font-weight="${o.w || 500}" text-anchor="${o.a || 'middle'}" style="fill:${col(o.c || 'ink')}"${at(o.b)}>${e(t)}</text>`;
  const fill = (c, k = 26) => `color-mix(in srgb, ${col(c)} ${k}%, transparent)`;

  const build = {
    barra(s) {
      const n = s.bars.length, h = n > 2 ? 26 : 32, gap = (H - 24 - n * h) / (n + 1), x0 = 22, w = W - 44;
      return s.bars.map((bar, i) => {
        const y = 12 + gap * (i + 1) + h * i + (bar.label ? 8 : 0);
        let x = x0 + (bar.x || 0) * w;
        const segs = bar.segs.map(g => {
          const sw = g.w * w, r = `<g${at(g.b ?? bar.b)}><rect x="${x + 1}" y="${y}" width="${Math.max(0, sw - 2)}" height="${h}" rx="5" style="fill:${fill(g.c, g.dim ? 8 : 30)};stroke:${col(g.c)}" stroke-width="1.2"${g.dim ? ' stroke-dasharray="3 3"' : ''}/>${g.t ? `<text x="${x + sw / 2}" y="${y + h / 2 + 4}" font-size="${sw < 46 ? 10 : 11.5}" font-weight="600" text-anchor="middle" style="fill:var(--ink)">${e(g.t)}</text>` : ''}</g>`;
          x += sw; return r;
        }).join('');
        return `${bar.label ? txt(bar.label, x0, y - 6, { a: 'start', s: 10.5, c: 'mute', b: bar.b }) : ''}${segs}`;
      }).join('');
    },
    recta(s) {
      const x0 = 26, w = W - 52, y = 112, px = v => x0 + (v - s.min) / (s.max - s.min) * w;
      const ticks = (s.ticks || []).map(v => `<line x1="${px(v)}" y1="${y - 5}" x2="${px(v)}" y2="${y + 5}" style="stroke:var(--mute)" stroke-width="1.2"/>${txt(v, px(v), y + 20, { s: 11, c: 'mute' })}`).join('');
      const hops = (s.hops || []).map(h => {
        const a = px(h.from), b = px(h.to), top = y - Math.min(58, 16 + Math.abs(b - a) * .42), up = h.down ? 2 * y - top : top;
        return `<path d="M${a} ${y} Q${(a + b) / 2} ${up} ${b} ${y}" fill="none" style="stroke:${col(h.c)}" stroke-width="2.2" stroke-linecap="round"${at(h.b, 'draw')}/>${h.t ? txt(h.t, (a + b) / 2, h.down ? (y + up) / 2 + 20 : (y + up) / 2 - 7, { s: 11.5, w: 600, c: h.c, b: h.b }) : ''}`;
      }).join('');
      const dots = (s.dots || []).map(d => `<g${at(d.b)}><circle cx="${px(d.v)}" cy="${y}" r="5.5" style="fill:${col(d.c)}"/>${d.t ? `<text x="${px(d.v)}" y="${y + 36}" font-size="11.5" font-weight="600" text-anchor="middle" style="fill:${col(d.c)}">${e(d.t)}</text>` : ''}</g>`).join('');
      return `<line x1="${x0 - 8}" y1="${y}" x2="${x0 + w + 8}" y2="${y}" style="stroke:var(--mute)" stroke-width="1.5" stroke-linecap="round"/>${ticks}${hops}${dots}`;
    },
    venn(s) {
      const R = s.regs, cy = 88, r = 54, ax = 124, bx = 196;
      const reg = (k, x, y, c) => (R[k] ? txt(R[k].t, x, y, { s: 15, w: 600, c: R[k].c || c, b: R[k].b }) : '');
      return `<rect x="14" y="14" width="${W - 28}" height="${H - 28}" rx="12" fill="none" style="stroke:var(--line)" stroke-width="1.2"/>
        <circle cx="${ax}" cy="${cy}" r="${r}" style="fill:${fill('a', 14)};stroke:${col('a')}" stroke-width="1.6"/><circle cx="${bx}" cy="${cy}" r="${r}" style="fill:${fill('g', 14)};stroke:${col('g')}" stroke-width="1.6"/>
        ${txt(s.a, ax - 30, 30, { s: 11, c: 'a', w: 600 })}${txt(s.b, bx + 30, 30, { s: 11, c: 'g', w: 600 })}
        ${reg('a', ax - 24, cy + 5, 'ink')}${reg('ab', (ax + bx) / 2, cy + 5, 'ink')}${reg('b', bx + 24, cy + 5, 'ink')}${reg('out', W - 40, H - 24, 'mute')}`;
    },
    arbol(s) {
      const L = s.levels, x0 = 30, dx = (W - 76) / L.length;
      const yc = s.foot ? 94 : 82;
      let nodes = [[x0, yc]], out = `<circle cx="${x0}" cy="${yc}" r="4" style="fill:var(--ink)"/>`, span = s.foot ? 112 : 132;
      L.forEach((lv, li) => {
        const next = [], each = span / nodes.length;
        nodes.forEach(([x, y]) => {
          for (let k = 0; k < lv.n; k++) {
            const yy = y + (k - (lv.n - 1) / 2) * (each / lv.n), xx = x + dx, c = lv.c?.[k] || (k % 2 ? 'g' : 'a');
            out += `<path d="M${x + 5} ${y} L${xx - 8} ${yy}" fill="none" style="stroke:${col(c)}" stroke-width="1.6" stroke-linecap="round" opacity=".75"${at(lv.b, 'draw')}/><circle cx="${xx}" cy="${yy}" r="${nodes.length * lv.n > 8 ? 3 : 4.5}" style="fill:${col(c)}"${at(lv.b)}/>`;
            if (lv.labels && nodes.length * lv.n <= 8) out += txt(lv.labels[k], xx, yy - 8, { s: 10.5, w: 600, c, b: lv.b });
            next.push([xx, yy]);
          }
        });
        if (lv.name) out += txt(lv.name, x0 + dx * (li + 1), 162, { s: 10, c: 'mute', b: lv.b });
        nodes = next;
      });
      return out + (s.foot ? txt(s.foot.t, W - 14, 19, { a: 'end', s: 12.5, w: 600, c: s.foot.c || 'ok', b: s.foot.b }) : '');
    },
    tabla(s) {
      const nc = s.cols.length, nr = s.rows.length, hw = s.hw ?? 46, cw = Math.min(46, (W - 28 - hw) / nc), ch = Math.min(26, (H - 44) / nr), x0 = (W - hw - cw * nc) / 2 + hw, y0 = Math.max(32, (H - (s.foot ? 20 : 0) - nr * ch) / 2 + 8);
      let out = s.cols.map((c, j) => txt(c, x0 + cw * (j + .5), y0 - 8, { s: 10.5, c: 'a', w: 600 })).join('') + s.rows.map((r, i) => txt(r, x0 - 8, y0 + ch * (i + .5) + 4, { s: 10.5, c: 'g', w: 600, a: 'end' })).join('');
      (s.hl || []).forEach(h => { out += `<rect x="${x0 + cw * h.c + 1.5}" y="${y0 + ch * h.r + 1.5}" width="${cw * (h.cs || 1) - 3}" height="${ch * (h.rs || 1) - 3}" rx="5" style="fill:${fill(h.col || 'ok', 34)};stroke:${col(h.col || 'ok')}" stroke-width="1.4"${at(h.b)}/>`; });
      for (let i = 0; i < nr; i++) for (let j = 0; j < nc; j++) {
        out += `<rect x="${x0 + cw * j}" y="${y0 + ch * i}" width="${cw}" height="${ch}" fill="none" style="stroke:var(--line)" stroke-width="1"/>`;
        const v = s.cells?.[i]?.[j]; if (v != null && v !== '') out += txt(v.t ?? v, x0 + cw * (j + .5), y0 + ch * (i + .5) + 4, { s: 11, b: v.b });
      }
      return out + (s.foot ? txt(s.foot.t, W / 2, H - 6, { s: 12, w: 600, c: s.foot.c || 'ok', b: s.foot.b }) : '');
    },
    ciclo(s) {
      const n = s.items.length, cx = W / 2, cy = 86, R = 56, P = i => [cx + R * Math.sin(2 * Math.PI * i / n), cy - R * Math.cos(2 * Math.PI * i / n)];
      let out = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" style="stroke:var(--line)" stroke-width="1.5" stroke-dasharray="2 5"/>`;
      (s.marks || []).forEach(m => { const [x, y] = P(m.i); out += `<circle cx="${x}" cy="${y}" r="17" style="fill:${fill(m.c || 'ok', 36)};stroke:${col(m.c || 'ok')}" stroke-width="1.8"${at(m.b)}/>`; });
      s.items.forEach((t, i) => { const [x, y] = P(i); out += `<circle cx="${x}" cy="${y}" r="13" style="fill:var(--card);stroke:${col('a')}" stroke-width="1.3"${at(s.b?.[i])}/>${txt(t, x, y + 4.5, { s: 12.5, w: 600, b: s.b?.[i] })}`; });
      return out + (s.center ? txt(s.center.t, cx, cy + 5, { s: 13, w: 600, c: s.center.c || 'a', b: s.center.b }) : '') + (s.foot ? txt(s.foot.t, cx, H - 5, { s: 12, w: 600, c: s.foot.c || 'ok', b: s.foot.b }) : '');
    },
    figura(s) {
      return s.shapes.map(h => {
        const st = `fill:${h.fill ? fill(h.fill, h.k2 || 26) : 'none'};stroke:${col(h.c)}`, sw = ` stroke-width="${h.sw || 1.8}" stroke-linejoin="round" stroke-linecap="round"${h.dash ? ' stroke-dasharray="4 4"' : ''}`;
        if (h.k === 'poly') return `<path d="M${h.pts.map(p => p.join(' ')).join(' L')}${h.open ? '' : ' Z'}" style="${st}"${sw}${at(h.b, h.fill ? 'pop' : 'draw')}/>`;
        if (h.k === 'line') return `<path d="M${h.pts[0].join(' ')} L${h.pts[1].join(' ')}" style="${st}"${sw}${at(h.b, 'draw')}/>`;
        if (h.k === 'circle') return `<circle cx="${h.at[0]}" cy="${h.at[1]}" r="${h.r}" style="${st}"${sw}${at(h.b)}/>`;
        if (h.k === 'rect') return `<rect x="${h.at[0]}" y="${h.at[1]}" width="${h.w}" height="${h.h}" rx="${h.rx ?? 4}" style="${st}"${sw}${at(h.b)}/>`;
        return txt(h.t, h.at[0], h.at[1], { s: h.s || 12, w: h.w || 600, c: h.c || 'ink', a: h.a, b: h.b });
      }).join('');
    },
    pasos(s) {
      const n = s.lines.length, dy = Math.min(34, (H - 30) / n), y0 = (H - dy * (n - 1)) / 2 + 5;
      return s.lines.map((l, i) => txt(l.t ?? l, W / 2, y0 + dy * i, { s: l.s || (i === n - 1 ? 17 : 15), w: 600, c: l.c || (i === n - 1 ? 'ok' : 'ink'), b: l.b ?? i })).join('');
    },
  };

  const svg = id => { const c = CONCEPTOS[id]; return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${e(c.title)}">${build[c.scene.type](c.scene)}</svg>`; };
  // Tiempos que usa el dibujo (para la prueba: ninguno debe pasar del último rótulo).
  const maxBeat = id => Math.max(0, ...[...svg(id).matchAll(/data-b="(\d+)"/g)].map(m => +m[1]));

  // Abre la tarjeta sobre `root` (la pantalla del reto). Devuelve la función que la cierra.
  function open(root, id) {
    const c = CONCEPTOS[id];
    if (!c) return () => {};
    const still = !window.anime || matchMedia('(prefers-reduced-motion: reduce)').matches;
    const veil = document.createElement('div');
    veil.className = 'con-veil';
    veil.innerHTML = `<div class="con-card" role="dialog" aria-modal="true" aria-label="${e(c.title)}">
      <div class="con-top"><div><small>Recuerda el concepto</small><h3>${e(c.title)}</h3></div></div>
      <div class="con-stage">${svg(id)}</div>
      <p class="con-cap" aria-live="polite"></p>
      <div class="con-dots">${c.beats.map(() => '<i></i>').join('')}</div>
      <div class="con-row"><button type="button" class="btn ghost" data-again>Repetir</button><button type="button" class="btn main" data-ok>Entendido</button></div>
    </div>`;
    root.appendChild(veil);
    const cap = veil.querySelector('.con-cap'), dots = [...veil.querySelectorAll('.con-dots i')], parts = [...veil.querySelectorAll('[data-b]')];
    const T = s => { s = s.replace(/(\d) %/g, '$1 %'); return typeof tex === 'function' ? tex(s) : s; };
    let timer = 0, alive = true;
    const hide = el => { el.style.opacity = 0; if (el.dataset.fx === 'draw') { const n = el.getTotalLength?.() || 200; el.style.strokeDasharray = n; el.style.strokeDashoffset = n; el.style.opacity = 1; } };
    function beat(k) {
      if (!alive) return;
      cap.innerHTML = T(c.beats[k]);
      dots.forEach((d, i) => d.classList.toggle('on', i <= k));
      const now = parts.filter(p => +p.dataset.b === k);
      if (still) now.forEach(p => { p.style.opacity = 1; p.style.strokeDashoffset = 0; });
      else {
        anime({ targets: cap, opacity: [0, 1], translateY: [6, 0], duration: 320, easing: 'easeOutQuad' });
        anime({ targets: now.filter(p => p.dataset.fx === 'draw'), strokeDashoffset: 0, duration: 700, delay: anime.stagger(90), easing: 'easeInOutSine' });
        anime({ targets: now.filter(p => p.dataset.fx !== 'draw'), opacity: [0, 1], translateY: [7, 0], duration: 460, delay: anime.stagger(70, { start: 120 }), easing: 'easeOutCubic' });
      }
      if (k + 1 < c.beats.length) timer = setTimeout(() => beat(k + 1), still ? 0 : 1500 + c.beats[k].replace(/\$[^$]*\$/g, 'xxxx').length * 42);
    }
    const play = () => { clearTimeout(timer); if (!still) { window.anime.remove(parts); parts.forEach(hide); } beat(0); };
    const close = () => { if (!alive) return; alive = false; clearTimeout(timer); window.anime?.remove(parts); veil.classList.remove('open'); setTimeout(() => veil.remove(), 220); };
    veil.addEventListener('click', ev => { if (ev.target === veil || ev.target.closest('[data-ok]')) close(); else if (ev.target.closest('[data-again]')) play(); });
    requestAnimationFrame(() => { veil.classList.add('open'); play(); veil.querySelector('[data-ok]').focus({ preventScroll: true }); });
    return close;
  }
  return { svg, maxBeat, open, types: Object.keys(build) };
})();
;
//#archivo js/gimnasio.js
// Gimnasio (spec 2026-11-19-gimnasio, pruebas tests/gimnasio.test.js): retos un poco más difíciles que los de las lecciones,
// guiados por un entrenador. Cada reto es un problema de varios pasos; cada paso es un juego gráfico ya existente con una sola
// ronda armada para ese paso, una sugerencia del entrenador (qué hacer y por qué) y dos ayudas que salen al fallar. Lo que sale
// bien queda escrito en el cuaderno: al final se ve el procedimiento completo y la estrategia. Aquí no se pierden vidas.
// Reto nuevo = solo datos en GYM_RETOS; `after` son las lecciones que lo abren (basta una hecha).

if (typeof ICON !== 'undefined') ICON.gym = svg('<path d="M6.5 6v12M17.5 6v12M3.5 9v6M20.5 9v6M6.5 12h11"/>');

const GYM_RETOS = [
  {
    id: 'gym-concreto', after: ['alg-12', 'alg-12e', 'pu-pr-1'], level: 2,
    title: 'Concreto para la losa', strategy: 'Partes iguales y después el factor',
    problem: 'Para una losa se mezclan cemento, arena y grava en la razón $1 : 3 : 4$ y se preparan 480 kg. El ingeniero pide un 25 % más de mezcla, con la misma receta. ¿Cuánta arena habrá en total?',
    steps: [
      { title: 'Cuenta las partes', coach: 'Una razón de tres números parte el total en partes iguales. Súmalas, mira cuánto pesa una sola y reparte.',
        ex: play('reparto', 'Reparte los 480 kg en la razón 1 : 3 : 4', { total: 480, parts: [1, 3, 4], tol: 0.02 },
          'Son $1 + 3 + 4 = 8$ partes de 60 kg: 60 de cemento, 180 de arena y 240 de grava.', { hint: '¿En cuántas partes iguales se corta la barra?' }),
        hints: ['Suma los números de la razón: así sabes en cuántas partes iguales se corta la barra.', 'Cada parte pesa 480 ÷ 8. La arena se lleva tres de esas partes.'],
        note: 'Una parte: 480 ÷ 8 = 60 kg. Cemento 60, arena 180, grava 240' },
      { title: 'Aplica el aumento', coach: 'Un aumento del 25 % no se suma a ojo: es quedarse con el 100 % y agregarle su cuarta parte. Estira la barra de la arena.',
        ex: play('estira-barra', 'Estira la arena un 25 % más', { max: 200, rounds: [{ base: 180, text: 'La arena con 25 % más', pct: 125 }] },
          'Un 25 % más es el 125 %: $180 \\cdot 1.25 = 225$ kg.', { hint: 'Más del 100 %: el 100 % es lo que ya había.' }),
        hints: ['La barra punteada es el 100 %. ¿Hasta qué porcentaje llega si le sumas un 25 %?', 'Lleva la barra al 125 %: el factor es 1.25.'],
        note: 'Arena con 25 % más: 180 · 1.25 = 225 kg' },
      { title: 'Comprueba por otro camino', coach: 'Un buen hábito: verificar con otra ruta. Ahora el aumento va primero, sobre toda la mezcla, y después se reparte con la misma receta: la arena debe dar lo mismo.',
        ex: play('reparto', 'Reparte la mezcla completa (480 kg + 25 %) en 1 : 3 : 4', { total: 600, parts: [1, 3, 4], tol: 0.02 },
          '480 kg con 25 % más son 600 kg; en 8 partes de 75 kg: 75, 225 y 300. La arena coincide.', { hint: 'El total nuevo es 480 · 1.25.' }),
        hints: ['Reparte el total nuevo en las mismas 8 partes de la receta.', 'Son 600 kg: cada parte pesa 75 kg y la arena se lleva tres.'],
        note: 'Comprobación: 600 ÷ 8 = 75; la arena es 3 · 75 = 225 kg' },
    ],
    answer: 'Habrá 225 kg de arena.',
    wrap: 'Con una razón de varios números: primero las partes iguales (total ÷ suma de la razón), luego cada cantidad. Un cambio porcentual se aplica como un factor, y da igual hacerlo antes o después de repartir.',
  },
  {
    id: 'gym-obra', after: ['alg-12f', 'pu-pr-2'], level: 3,
    title: 'La obra que se adelanta', strategy: 'Contar el trabajo en obreros·día',
    problem: '6 obreros harían una obra en 30 días. Después de 10 días de trabajo, el dueño pide entregarla 8 días antes de lo previsto. ¿Cuántos obreros hay que contratar además de los que hay?',
    steps: [
      { title: 'Separa lo hecho de lo que falta', coach: 'No mezcles todo el problema a la vez: parte la obra en lo que ya se hizo y lo que falta. Los días pasados son una parte de los 30.',
        ex: play('barra-razon', 'Parte los 30 días: hechos y por hacer', { rounds: [{ T: 30, p: 1, q: 2, A: 'días hechos', B: 'días que faltan' }] },
          'Pasaron 10 de 30 días: $10 : 20 = 1 : 2$. A los 6 obreros les faltan 20 días de trabajo.', { hint: 'Ya pasaron 10 días.' }),
        hints: ['Ya pasaron 10 días del plan. Deja ese tramo a un lado de la manija.', 'Corta la cinta en 10: quedan 10 hechos y 20 por hacer.'],
        note: 'Faltan 20 días de 6 obreros: 6 · 20 = 120 obreros·día' },
      { title: 'Ajusta al nuevo plazo', coach: 'El trabajo que falta no cambia: se mide en obreros·día. Con menos días hacen falta más obreros, de modo que el producto se mantenga. El juego ya muestra el plazo nuevo: comprueba que sea lo que faltaba menos lo que se adelanta.',
        ex: play('la-obra', 'Deja los obreros justos para el trabajo que falta', { workers: 6, days: 20, askDays: 12, max: 20 },
          'Quedan $20 - 8 = 12$ días: $120 \\div 12 = 10$ obreros.', { hint: 'Al plazo de 20 días le quitan 8.' }),
        hints: ['El producto obreros × días debe seguir igual al trabajo que falta.', 'Quedan 12 días: divide los 120 obreros·día entre 12.'],
        note: 'En 12 días: 120 ÷ 12 = 10 obreros' },
    ],
    answer: 'Hacen falta 10 obreros: hay que contratar 10 − 6 = 4 más.',
    wrap: 'Cuando cambian los trabajadores o el plazo a mitad del camino, mide el trabajo en una unidad que no cambie (obreros·día), separa lo hecho de lo que falta y reparte solo lo que falta. Al final, relee qué se pregunta: aquí, los que hay que contratar además.',
  },
  {
    id: 'gym-bus', after: ['pu-pr-3', 'alg-12f'], level: 2,
    title: 'Alcanzar al bus', strategy: 'Ventaja ÷ diferencia de velocidades',
    problem: 'Un bus sale de Medellín a 60 km/h. Hora y media después sale un carro por la misma vía a 90 km/h. ¿Cuánto tarda el carro en alcanzarlo y a cuántos kilómetros de Medellín?',
    steps: [
      { title: 'Mide la ventaja', coach: 'Antes de que salga el carro, el bus ya avanzó. Esa ventaja es lo que el carro debe descontar. A velocidad fija, distancia y tiempo son directamente proporcionales.',
        ex: play('duplica-magnitud', 'La ventaja del bus', { rounds: [{ text: 'El bus va a 60 km/h. ¿Cuánto avanza en la hora y media que le lleva al carro?', nx: 'horas', ny: 'km', uy: 'km', x0: 1, y0: 60, x1: 1.5, y1: 90, step: 5, ymax: 120 }] },
          'En 1.5 h el bus recorre $60 \\cdot 1.5 = 90$ km.', { hint: 'En una hora son 60 km.' }),
        hints: ['Si en una hora avanza 60 km, en media hora avanza la mitad de eso.', 'Hora y media es una hora más media: 60 + 30.'],
        note: 'Ventaja del bus: 60 · 1.5 = 90 km' },
      { title: 'Descuenta la diferencia', coach: 'No hace falta seguir a los dos por separado: cada hora el carro le quita al bus la diferencia de velocidades. ¿Cuántas horas tarda en borrar la ventaja? (En el juego, el bus es el carro que va adelante.)',
        ex: play('persecucion', '¿Cuándo lo alcanza?', { rounds: [{ head: 90, v1: 60, v2: 90 }] },
          'Se acerca $90 - 60 = 30$ km por hora: $90 \\div 30 = 3$ h.', { hint: 'Resta las velocidades.' }),
        hints: ['Cada hora la distancia entre ellos baja lo que el carro va más rápido que el bus.', 'Se acercan 30 km por hora y la ventaja es de 90 km.'],
        note: 'Se acercan 90 − 60 = 30 km/h: lo alcanza en 90 ÷ 30 = 3 h' },
      { title: 'Ubica el encuentro', coach: 'Ya sabes cuánto viaja el carro. Su distancia a Medellín sale de su velocidad y ese tiempo. Comprueba con el bus: él lleva hora y media más de viaje.',
        ex: play('duplica-magnitud', '¿Dónde lo alcanza?', { rounds: [{ text: 'El carro va a 90 km/h durante las horas que tarda en alcanzar al bus.', nx: 'horas', ny: 'km', uy: 'km', x0: 1, y0: 90, x1: 3, y1: 270, step: 10, ymax: 300 }] },
          '$90 \\cdot 3 = 270$ km. El bus lleva $4.5$ h: $60 \\cdot 4.5 = 270$ km. Coinciden.', { hint: 'Usa el tiempo del paso anterior.' }),
        hints: ['Multiplica la velocidad del carro por las horas que encontraste en el paso anterior.', 'Son 3 horas a 90 km/h.'],
        note: 'Encuentro: 90 · 3 = 270 km (el bus: 60 · 4.5 = 270 km)' },
    ],
    answer: 'Lo alcanza 3 horas después de salir, a 270 km de Medellín.',
    wrap: 'En una persecución: calcula la ventaja, divídela entre la diferencia de velocidades y obtienes el tiempo. La posición sale de cualquiera de los dos; calcularla con los dos es la mejor comprobación.',
  },
  {
    id: 'gym-muro', after: ['pu-pr-3', 'alg-12f'], level: 3,
    title: 'Pintar a dos manos', strategy: 'Sumar rapideces, no tiempos',
    problem: 'Ana pinta un muro sola en 6 horas y Beto en 3 horas. Pintan juntos durante una hora y luego Beto se va. ¿Cuánto tarda Ana en terminar sola?',
    steps: [
      { title: 'Mide la rapidez del equipo', coach: 'La trampa es sumar las horas. Lo que se suma es lo que hace cada uno en una hora. Prueba cuánto tardarían juntos el muro completo.',
        ex: play('trabajo-conjunto', 'Juntos se suman las rapideces', { rounds: [{ who: ['Ana', 'Beto'], a: 6, b: 3 }] },
          'En una hora: $\\tfrac16 + \\tfrac13 = \\tfrac12$ del muro. Juntos tardarían 2 h.', { hint: 'Cada hora, Ana hace 1/6 y Beto 1/3.' }),
        hints: ['En una hora Ana pinta 1/6 del muro y Beto 1/3. Súmalos: eso hacen juntos por hora.', 'Juntos hacen la mitad del muro por hora.'],
        note: 'Juntos: 1/6 + 1/3 = 1/2 del muro por hora (todo en 2 h)' },
      { title: 'Lo que dejan pintado', coach: 'Piensa el muro en franjas iguales para no pelear con fracciones: con 6 franjas, Ana pinta 1 por hora y Beto 2. Reparte lo que pintan en la hora juntos según lo que aporta cada uno y cuenta cuántas quedan sin pintar.',
        ex: play('barra-razon', 'Lo que pintan en la hora juntos: Ana frente a Beto', { rounds: [{ T: 3, p: 1, q: 2, A: 'Ana', B: 'Beto' }] },
          'En la hora juntos pintan $1 + 2 = 3$ de las 6 franjas: Ana 1 y Beto 2. Quedan 3 sin pintar.', { hint: 'Beto va al doble de rápido que Ana.' }),
        hints: ['Beto pinta el doble que Ana en el mismo tiempo: su tramo de la cinta debe ser el doble.', 'Ana 1 franja y Beto 2.'],
        note: 'Tras 1 h juntos: 3 de 6 franjas pintadas; faltan 3' },
      { title: 'Ana termina sola', coach: 'Ahora solo trabaja Ana, a su ritmo. Más franjas, más tiempo, en la misma proporción.',
        ex: play('duplica-magnitud', 'Ana termina sola', { rounds: [{ text: 'Ana sola pinta 1 franja por hora. ¿Cuántas horas para las franjas que faltan?', nx: 'franjas', ny: 'horas', uy: 'h', x0: 1, y0: 1, x1: 3, y1: 3, step: 0.5, ymax: 6 }] },
          'Ana pinta 1 franja por hora: las 3 que faltan le toman 3 h.', { hint: 'Directa: el doble de franjas, el doble de horas.' }),
        hints: ['Mira cuántas franjas faltan y cuántas pinta Ana en una hora.', 'Le faltan 3 franjas y pinta una por hora.'],
        note: 'Ana sola: 3 franjas a 1 por hora = 3 h' },
    ],
    answer: 'Ana tarda 3 horas más (4 horas en total desde que empezaron).',
    wrap: 'En trabajo conjunto se suman las rapideces (lo hecho en una hora). Si el equipo cambia a mitad del trabajo, parte el trabajo en unidades iguales, cuenta lo hecho y reparte lo que falta con la rapidez del nuevo equipo.',
  },
  {
    id: 'gym-tele', after: ['alg-13c', 'alg-13d', 'pu-pr-5'], level: 2,
    title: 'Sube y luego rebaja', strategy: 'Encadenar factores',
    problem: 'Una tienda sube un 20 % el precio de un televisor de 1 500 000 pesos y una semana después lo anuncia con 20 % de descuento. ¿Quedó al precio de antes? ¿Cuál fue el cambio total?',
    steps: [
      { title: 'Convierte el aumento en factor', coach: 'Cada cambio porcentual es una multiplicación: subir un porcentaje es tomar más del 100 % del precio que había en ese momento.',
        ex: play('estira-barra', 'El precio con el aumento', { max: 200, rounds: [{ base: 1500000, text: 'El televisor con 20 % más', pct: 120 }] },
          'Un 20 % más es el 120 %: $1\\,500\\,000 \\cdot 1.2 = 1\\,800\\,000$.', { hint: 'Más del 100 %.' }),
        hints: ['La barra punteada es el 100 % del precio. Súmale el 20 %.', 'Lleva la barra al 120 %: el factor es 1.2.'],
        note: 'Con el aumento: 1 500 000 · 1.2 = 1 800 000' },
      { title: 'Encadena el descuento', coach: 'El descuento se calcula sobre el precio nuevo, no sobre el de antes: por eso los porcentajes no se cancelan. Pega los dos cambios y busca el cambio único que los reemplaza.',
        ex: play('cascada', 'Aplica los dos cambios y halla el cambio único', { price: 1500000, changes: [20, -20], step: 1 },
          'Los factores se multiplican: $1.2 \\cdot 0.8 = 0.96$, un descuento único del 4 %.', { hint: 'Multiplica los dos factores.' }),
        hints: ['Escribe cada cambio como factor (subir 20 % y bajar 20 %) y multiplícalos.', 'El producto da 0.96: ¿cuánto le falta para el 100 %?'],
        note: 'Factores: 1.2 · 0.8 = 0.96 → descuento único del 4 %' },
      { title: 'Comprueba deshaciendo', coach: 'Para comprobar, haz el camino de vuelta: si solo vieras el precio final con el descuento, ¿podrías recuperar el precio inflado? Deshacer un porcentaje es dividir por su factor, no sumar el porcentaje.',
        ex: play('precio-original', 'Recupera el precio antes del descuento', { rounds: [{ r: -20, now: 1440, step: 100, max: 2400 }] },
          'El precio final es $1\\,500\\,000 \\cdot 0.96 = 1\\,440\\,000$, y $1\\,440 \\div 0.8 = 1\\,800$ mil: el precio inflado.', { hint: 'Divide entre el factor del descuento.' }),
        hints: ['Con 20 % de descuento se paga el 80 %: el precio final es el 80 % del de antes.', 'Divide 1 440 entre 0.8.'],
        note: 'Vuelta: 1 440 000 ÷ 0.8 = 1 800 000' },
    ],
    answer: 'No: queda en 1 440 000 pesos, un 4 % menos que al principio.',
    wrap: 'Varios cambios porcentuales seguidos se encadenan multiplicando sus factores (1 + p/100). Por eso subir y bajar el mismo porcentaje nunca deja el precio igual. Para deshacer un cambio se divide por su factor.',
  },
  {
    id: 'gym-chaqueta', after: ['alg-13c', 'pu-pr-5'], level: 3,
    title: 'La chaqueta con impuesto y rebaja', strategy: 'Deshacer los cambios en reversa',
    problem: 'A una chaqueta le sumaron un 25 % de impuesto y después, en temporada de rebajas, le quitaron un 30 %. Pagaste 70 mil pesos. ¿Cuál era su precio sin impuesto?',
    steps: [
      { title: 'Deshaz el último cambio', coach: 'Como al quitarse la ropa: lo último que se puso sale primero. El último cambio fue la rebaja; el 30 % se calculó sobre el precio con impuesto, así que no basta con sumarlo a 70.',
        ex: play('precio-original', 'Quita la rebaja', { rounds: [{ r: -30, now: 70, step: 5, max: 150 }] },
          'Pagaste el 70 %: $70 \\div 0.7 = 100$ mil con impuesto.', { hint: 'Con la rebaja pagaste el 70 % del precio.' }),
        hints: ['Con un 30 % de descuento pagas el 70 % de lo que costaba. Divide entre ese factor.', '70 es el 70 % de cuánto: 70 ÷ 0.7.'],
        note: 'Sin la rebaja: 70 ÷ 0.7 = 100 mil' },
      { title: 'Deshaz el impuesto', coach: 'Ahora el impuesto. Ese precio es el 125 % del precio base: vuelve a dividir por el factor, no restes el porcentaje.',
        ex: play('precio-original', 'Quita el impuesto', { rounds: [{ r: 25, now: 100, step: 5, max: 150 }] },
          'Con impuesto es el 125 %: $100 \\div 1.25 = 80$ mil.', { hint: 'Restarle el 25 % no sirve.' }),
        hints: ['El precio con impuesto es el 125 % del base. Divide entre el factor de ese aumento.', 'Divide 100 entre 1.25.'],
        note: 'Sin el impuesto: 100 ÷ 1.25 = 80 mil' },
    ],
    answer: 'El precio sin impuesto era 80 mil pesos (80 · 1.25 · 0.7 = 70).',
    wrap: 'Para volver al principio de una cadena de cambios porcentuales, deshazlos en orden inverso y dividiendo por cada factor. Restar o sumar el porcentaje al final da otro número, porque cada porcentaje se calculó sobre un precio distinto.',
  },

  // ---- Ecuaciones con contexto (Preuniversitario mundo 13; Álgebra: ecuaciones lineales y sistemas) ----
  {
    id: 'gym-hermanas', after: ['pu-ec-1', 'alg-1'], level: 2,
    title: 'Las tres hermanas', strategy: 'Una sola incógnita para todo',
    problem: 'Sara tiene 4 años más que Lina, y Eva tiene el doble de la edad de Lina. Entre las tres suman 48 años. ¿Qué edad tiene cada una? ¿Dentro de cuántos años sumarán 72?',
    steps: [
      { title: 'Escribe todo con una x', coach: 'Toma como x a la que sirve de referencia: las otras dos se describen a partir de Lina, así queda una sola incógnita. La cinta ya pone a Lina como x y a las otras a partir de ella: desliza x hasta llenarla justo.',
        ex: play('cinta-ecuacion', 'La cinta de las tres edades', { rounds: [{ say: 'Lina: x · Sara: 4 más · Eva: el doble de Lina. Suman 48', parts: [[1, 0, 'Lina'], [1, 4, 'Sara'], [2, 0, 'Eva']], total: 48, lo: 0, hi: 20 }] },
          '$x + (x + 4) + 2x = 4x + 4 = 48$: $x = 11$. Lina tiene 11, Sara 15 y Eva 22.', { hint: 'Junta todas las x y todos los números sueltos.' }),
        hints: ['Junta las x (hay 1 + 1 + 2 de ellas) y aparte los años sueltos.', 'Cuatro x más 4 deben dar 48: cuatro x son 44.'],
        note: 'Lina x, Sara x + 4, Eva 2x: 4x + 4 = 48 → Lina 11, Sara 15, Eva 22' },
      { title: 'Despeja el futuro', coach: 'Cada año que pasa, cada una cumple uno: la suma de las tres crece de a tres por año. El juego trae la suma dentro de t años ya planteada (llama x a la t): compruébala y despeja deshaciendo en orden inverso.',
        ex: play('despeja-x', 'Despeja los años que faltan', { rounds: [{ a: 3, b: 48, c: 72, cards: [['+', -48], ['+', 48], ['×', 1 / 3], ['×', 3]] }] },
          '$48 + 3t = 72$: se quita 48 a los dos lados, $3t = 24$, y se divide entre 3: $t = 8$.', { hint: 'Primero quita lo que se suma.' }),
        hints: ['Lo último que le pasó a la incógnita fue sumarle 48: eso se deshace primero.', 'Resta 48 a los dos lados y luego multiplica por 1/3.'],
        note: 'Dentro de t años: 48 + 3t = 72 → 3t = 24 → t = 8' },
    ],
    answer: 'Lina tiene 11 años, Sara 15 y Eva 22. Dentro de 8 años sumarán 72 (19 + 23 + 30).',
    wrap: 'Con varias cantidades relacionadas, nombra x a la que sirve de referencia y escribe las demás con ella: queda una sola ecuación. Se despeja deshaciendo en orden inverso y se comprueba sumando.',
  },
  {
    id: 'gym-madre', after: ['pu-ec-2', 'alg-1'], level: 3,
    title: 'La madre y el hijo', strategy: 'El tiempo pasa igual para todos',
    problem: 'Una madre tiene el triple de la edad de su hijo. Dentro de 12 años tendrá el doble. ¿Qué edades tienen hoy? ¿Hace cuántos años la madre tenía cinco veces la edad del hijo?',
    steps: [
      { title: 'Plantea con barras', coach: 'Dibuja las edades como barras: el hijo es x y la madre, una barra tres veces más larga. La trampa: dentro de 12 años a los dos se les suma lo mismo; el doble se toma de las edades futuras.',
        ex: play('edades-barras', 'Las edades hoy y dentro de 12 años', { rounds: [{ k1: 3, L: 12, k2: 2 }] },
          '$3x + 12 = 2(x + 12)$ da $x = 12$: el hijo tiene 12 y la madre 36.', { hint: 'Dentro de 12 años, los dos tienen 12 años más.' }),
        hints: ['Dentro de 12 años la madre tiene 3x + 12 y el hijo x + 12. La madre debe tener el doble del hijo.', '3x + 12 = 2x + 24: quita 2x y 12 de los dos lados.'],
        note: 'Hoy: 3x + 12 = 2(x + 12) → hijo 12, madre 36' },
      { title: 'Mira hacia atrás', coach: 'Hace t años los dos tenían t años menos. Plantea «madre = 5 · hijo», abre el paréntesis y pasa las t al lado donde queden sumando. El juego te deja la ecuación ya ordenada (llama x a la t): compruébala y despeja.',
        ex: play('despeja-x', 'Despeja los años hacia atrás', { rounds: [{ a: 4, b: 36, c: 60, cards: [['+', -36], ['+', 36], ['×', 1 / 4], ['×', 4]] }] },
          '$36 - t = 5(12 - t)$ es $36 - t = 60 - 5t$; sumando $5t$ a los dos lados: $4t + 36 = 60$, así que $t = 6$. Hace 6 años tenían 30 y 6.', { hint: 'Primero quita el número que se suma.' }),
        hints: ['Abre el paréntesis: 5(12 − t) = 60 − 5t. Al sumar 5t a los dos lados queda 4t + 36 = 60.', 'Resta 36 y luego multiplica por 1/4.'],
        note: 'Hace t años: 36 − t = 5(12 − t) → 4t + 36 = 60 → t = 6 (madre 30, hijo 6)' },
    ],
    answer: 'Hoy el hijo tiene 12 años y la madre 36. Hace 6 años tenían 6 y 30: cinco veces.',
    wrap: 'En problemas de edades el tiempo pasa igual para todos: se suma (o se resta) el mismo número a cada edad, y la diferencia entre ellas nunca cambia. Escribe cada edad «en ese momento» antes de plantear la relación.',
  },
  {
    id: 'gym-cafe', after: ['pu-ec-2'], level: 2,
    title: 'La mezcla de café', strategy: 'El valor total se conserva',
    problem: 'Un tostador mezcla café de 12 mil pesos el kilo con café de 8 mil para tener 20 kg que valgan 9 mil el kilo. ¿Cuántos kilos pone de cada uno? Si después le añade 4 kg más del café caro, ¿a cuánto debe vender el kilo para no perder?',
    steps: [
      { title: 'Plantea el valor de la mezcla', coach: 'Al mezclar, el dinero no se pierde: lo que vale la mezcla es lo que vale el caro más lo que vale el barato. Si x son los kilos del caro, el resto hasta 20 es del barato.',
        ex: play('mezcla-precio', 'Los kilos de cada café', { rounds: [{ a: ['café de 12 mil', 12000], b: ['café de 8 mil', 8000], total: 20, target: 9000, step: 1 }] },
          '$12\\,000x + 8\\,000(20 - x) = 9\\,000 \\cdot 20$ da $4\\,000x = 20\\,000$: 5 kg del caro y 15 del barato.', { hint: 'El precio de la mezcla queda entre los dos.' }),
        hints: ['El precio buscado está más cerca del barato que del caro: lleva poco café caro.', 'Con solo barato valdría 160 mil; faltan 20 mil y cada kilo caro aporta 4 mil más.'],
        note: 'x kg caros: 12x + 8(20 − x) = 9 · 20 → 5 kg de 12 mil y 15 kg de 8 mil' },
      { title: 'Mezcla la mezcla', coach: 'Los 20 kg ya hechos son como un solo café de 9 mil. Al añadir café caro el precio sube, pero poco: es un promedio en el que pesa más lo que tiene más kilos. Aquí cada bloque es un kilo y los precios van en miles (9 es 9 mil).',
        ex: play('balanza-promedio', 'El precio nuevo como promedio ponderado', { rounds: [{ groups: [{ lab: 'mezcla de 9 mil', n: 20, mean: 9 }, { lab: 'café de 12 mil', n: 4, mean: 12 }], lo: 8, hi: 13 }] },
          '$\\tfrac{20 \\cdot 9 + 4 \\cdot 12}{24} = \\tfrac{228}{24} = 9.5$ mil el kilo.', { hint: 'Hay muchos más kilos de mezcla que de café caro.' }),
        hints: ['Multiplica cada precio por sus kilos, suma, y divide entre todos los kilos.', 'Valor total: 180 + 48 mil en 24 kg.'],
        note: 'Promedio: (20 · 9 + 4 · 12) ÷ 24 = 9.5 mil el kilo' },
    ],
    answer: 'Pone 5 kg del café de 12 mil y 15 kg del de 8 mil. Con los 4 kg extra, debe vender el kilo a 9 500 pesos.',
    wrap: 'En las mezclas se conserva el valor total: kilos por precio de cada parte suman lo de la mezcla. Una mezcla ya hecha se trata como un solo ingrediente con su precio promedio.',
  },
  {
    id: 'gym-recibos', after: ['pu-ec-3', 'alg-101'], level: 2,
    title: 'Los dos recibos', strategy: 'Comparar para eliminar',
    problem: 'En una panadería, 3 panes y 2 jugos cuestan 12 mil pesos; 1 pan y 2 jugos cuestan 8 mil. ¿Cuánto vale un pan y cuánto un jugo?',
    steps: [
      { title: 'Compara los recibos', coach: 'Los dos recibos tienen los mismos jugos. Si a un recibo le restas el otro, los jugos se van y queda una ecuación con una sola incógnita (x es el pan, y el jugo).',
        ex: play('elimina-variable', 'Borra los jugos', { rounds: [{ e1: [3, 2, 12], e2: [1, 2, 8] }] },
          'Restar el segundo recibo del primero ($k = -1$) borra los jugos: $2x = 4$, el pan vale 2 mil.', { hint: 'Busca el número que borra la y.' }),
        hints: ['Multiplica el segundo recibo por un número y súmalo al primero: la y debe desaparecer.', 'Con k = −1 los jugos se cancelan.'],
        note: 'Restando: (3x + 2y) − (x + 2y) = 12 − 8 → 2x = 4 → pan a 2 mil' },
      { title: 'Sustituye', coach: 'Con el precio del pan, el recibo más corto te da el del jugo. Ajusta los dos precios hasta que los dos recibos cuadren (en el juego, a es el pan y b el jugo).',
        ex: play('dos-compras', 'Los dos precios', { rounds: [{ names: ['pan', 'jugo'], e1: [3, 2, 12], e2: [1, 2, 8], max: 8 }] },
          'Con el pan a 2 mil: $2 + 2y = 8$, el jugo vale 3 mil. Revisa: $3 \\cdot 2 + 2 \\cdot 3 = 12$.', { hint: 'Empieza por el pan.' }),
        hints: ['Pon el pan en el precio que hallaste: en el segundo recibo, los 2 jugos cuestan lo que falta para 8.', 'Dos jugos valen 6 mil.'],
        note: 'Sustituyendo: 2 + 2y = 8 → jugo a 3 mil' },
      { title: 'Comprueba en el plano', coach: 'Cada recibo es una recta de precios posibles. Si tus precios están bien, el punto (pan, jugo) cae justo en el cruce de las dos rectas.',
        ex: play('dos-rectas', 'El cruce de los dos recibos', { rounds: [{ e1: [3, 2, 12], e2: [1, 2, 8] }] },
          'El único punto que cumple los dos recibos es el cruce $(2, 3)$.', { hint: 'Cada recibo es una recta: busca dónde se cruzan.' }),
        hints: ['Lleva el punto hasta una de las rectas y muévelo a lo largo de ella hasta que también quede sobre la otra.', 'Es el punto con x = precio del pan y y = precio del jugo.'],
        note: 'Cruce de las rectas: (2, 3)' },
    ],
    answer: 'El pan vale 2 mil pesos y el jugo 3 mil.',
    wrap: 'Con dos incógnitas y dos datos, compara las ecuaciones: si una incógnita aparece igual en las dos, al restarlas desaparece. El valor hallado se sustituye en la ecuación más sencilla, y el cruce de las rectas confirma la respuesta.',
  },

  // ---- Conteo y combinatoria (Preuniversitario mundo 5) ----
  {
    id: 'gym-claves', after: ['pu-co-4'], level: 2,
    title: 'Contraseñas de la app', strategy: 'Casillas y complemento',
    problem: 'Una app pide contraseñas de 4 caracteres: dos letras (de 26, se pueden repetir) y luego dos dígitos distintos. ¿Cuántas contraseñas hay? ¿Cuántas tienen al menos una letra A?',
    steps: [
      { title: 'Cuenta casilla por casilla', coach: 'Dibuja una casilla por carácter y pregúntate, en orden, cuántas opciones caben en cada una con lo que dice la regla. Como las elecciones van una tras otra, las opciones se multiplican.',
        ex: play('placas-codigo', 'Las opciones de cada casilla', { rounds: [{ ask: '¿Cuántas contraseñas hay?', slots: ['letra', 'letra', 'dígito', 'dígito'], rule: '2 letras (pueden repetirse) y 2 dígitos distintos.', want: [26, 26, 10, 9], tray: [26, 26, 25, 10, 10, 9] }] },
          'Las letras pueden repetirse: 26 y 26. Los dígitos no: 10 para el primero y 9 para el segundo. $26 \\cdot 26 \\cdot 10 \\cdot 9 = 60\\,840$.', { hint: '«Distintos» quita una opción a la segunda casilla de dígitos.' }),
        hints: ['Las letras se pueden repetir; los dígitos no: el segundo dígito tiene una opción menos que el primero.', 'Letras: 26 y 26. Dígitos: 10 y 9.'],
        note: 'Todas: 26 · 26 · 10 · 9 = 60 840' },
      { title: 'Cuenta lo contrario', coach: '«Al menos una A» tiene muchos casos (A al principio, al final, en las dos…). Es más corto contar las que no tienen ninguna A y restarlas del total. Arriba van todas; abajo, las que prohíben la A.',
        ex: play('complemento-conteo', 'Todas menos las que no tienen A', { rounds: [{ ask: 'Contraseñas con al menos una A', slots: ['letra', 'letra', 'dígito', 'dígito'], all: [26, 26, 10, 9], none: [25, 25, 10, 9], tray: [26, 25, 10, 9, 8] }] },
          'Sin ninguna A: $25 \\cdot 25 \\cdot 10 \\cdot 9 = 56\\,250$. Con al menos una A: $60\\,840 - 56\\,250 = 4\\,590$.', { hint: 'Abajo, las letras no pueden ser A.' }),
        hints: ['Para no tener ninguna A, cada casilla de letra pierde una opción. Los dígitos no cambian.', 'Abajo: 25, 25, 10 y 9.'],
        note: 'Al menos una A: 60 840 − 25 · 25 · 10 · 9 = 60 840 − 56 250 = 4 590' },
    ],
    answer: 'Hay 60 840 contraseñas, y 4 590 tienen al menos una A.',
    wrap: 'Para contar arreglos, una casilla por elección y se multiplican las opciones de cada una (lo que no se repite pierde una opción). Cuando piden «al menos uno», cuenta el contrario («ninguno») y réstalo del total.',
  },
  {
    id: 'gym-papaya', after: ['pu-co-2'], level: 2,
    title: 'Las letras de PAPAYA', strategy: 'Contar como distintas y dividir por las repeticiones',
    problem: '¿De cuántas maneras se pueden ordenar las letras de la palabra PAPAYA? ¿Cuántos de esos ordenamientos empiezan por Y?',
    steps: [
      { title: 'Imagina que son distintas', coach: 'Haz como si todas las letras fueran diferentes (P₁, A₁, P₂…): cada posición es una casilla, y la letra usada ya no está para las siguientes.',
        ex: play('placas-codigo', 'Las letras como si fueran distintas', { rounds: [{ ask: '¿Cuántas filas si las letras fueran distintas?', slots: ['1.ª', '2.ª', '3.ª', '4.ª', '5.ª', '6.ª'], rule: 'Cada letra se usa una vez.', want: [6, 5, 4, 3, 2, 1], tray: [6, 6, 5, 4, 3, 2, 1] }] },
          'Seis letras distintas: $6 \\cdot 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1 = 6! = 720$ filas.', { hint: 'Cada casilla tiene una letra menos para escoger.' }),
        hints: ['¿Cuántas letras puedes poner en la primera casilla? ¿Y en la segunda, si una ya se usó?', 'Las casillas van de 6 hasta 1.'],
        note: 'Si fueran distintas: 6 · 5 · 4 · 3 · 2 · 1 = 720' },
      { title: 'Divide por las repeticiones', coach: 'Las tres A son iguales: intercambiarlas no cambia la palabra, así que cada palabra quedó contada 3! veces por ellas. Lo mismo pasa con las dos P. Pon en el denominador un k! por cada letra que se repite k veces.',
        ex: play('anagramas', 'Ordenamientos de PAPAYA', { rounds: [{ word: 'PAPAYA' }] },
          'A se repite 3 veces y P 2: $\\tfrac{6!}{3! \\cdot 2!} = \\tfrac{720}{12} = 60$.', { hint: 'Cuenta cuántas veces aparece cada letra.' }),
        hints: ['Cuenta cuántas veces sale cada letra; las que salen una sola vez no se dividen.', 'La A sale tres veces y la P dos: el denominador es 3! · 2!.'],
        note: 'Repetidas A (3) y P (2): 720 ÷ (3! · 2!) = 60' },
      { title: 'Fija la primera letra', coach: 'Si la Y va primero, ya no se mueve: solo se ordenan las otras cinco letras, con sus mismas repeticiones. Es el mismo método con una palabra más corta.',
        ex: play('anagramas', 'Lo que queda detrás de la Y', { rounds: [{ word: 'PAPAA' }] },
          'Detrás de la Y van P, A, P, A, A: $\\tfrac{5!}{3! \\cdot 2!} = \\tfrac{120}{12} = 10$.', { hint: 'Las mismas letras repetidas de antes.' }),
        hints: ['Sin la Y, ¿qué letras se siguen repitiendo y cuántas veces?', 'Quedan tres A y dos P: el denominador vuelve a ser 3! · 2!.'],
        note: 'Empiezan por Y: 5! ÷ (3! · 2!) = 10' },
    ],
    answer: 'PAPAYA se ordena de 60 maneras, y 10 de ellas empiezan por Y.',
    wrap: 'Con objetos repetidos, cuenta como si todos fueran distintos (n!) y divide por las veces que se cuenta cada arreglo: k! por cada objeto que se repite k veces. Si una posición está fija, se ordena solo el resto.',
  },
  {
    id: 'gym-comite', after: ['pu-co-3'], level: 3,
    title: 'El comité del curso', strategy: 'Elegir es ordenar «sí» y «no»',
    problem: 'De 7 estudiantes se va a elegir un comité de 3 personas, sin cargos (da igual en qué orden se elijan). ¿Cuántos comités distintos se pueden formar?',
    steps: [
      { title: 'Primero con orden', coach: 'Empieza por lo fácil: cuenta como si importara el orden (presidente, secretario, vocal). Es el principio de las casillas, y nadie puede ocupar dos puestos.',
        ex: play('placas-codigo', 'Si importara el orden', { rounds: [{ ask: '¿Cuántas listas ordenadas hay?', slots: ['1.º', '2.º', '3.º'], rule: '7 personas; nadie ocupa dos puestos.', want: [7, 6, 5], tray: [7, 7, 6, 5, 4] }] },
          'Con orden: $7 \\cdot 6 \\cdot 5 = 210$ listas.', { hint: 'Cada puesto tiene una persona menos para escoger.' }),
        hints: ['¿Cuántas personas quedan para el segundo puesto si el primero ya está ocupado?', 'Las casillas son 7, 6 y 5.'],
        note: 'Con orden: 7 · 6 · 5 = 210' },
      { title: 'Ahora el orden no importa', coach: 'Un truco potente: un comité es una fila de 7 letras con tres S (sí entra) y cuatro N (no entra). Cada forma de ordenar esas letras es un comité distinto, y las S entre sí, igual que las N, son iguales.',
        ex: play('anagramas', 'Comités como palabras de S y N', { rounds: [{ word: 'SSSNNNN' }] },
          '$\\tfrac{7!}{3! \\cdot 4!} = \\tfrac{5040}{144} = 35$. Es lo mismo que $210 \\div 3!$: cada comité salía 6 veces en la lista con orden.', { hint: 'Las S se repiten 3 veces y las N 4.' }),
        hints: ['En la palabra hay dos letras repetidas: S y N. Pon un factorial por cada una.', 'El denominador es 3! · 4!.'],
        note: 'Sin orden: 7! ÷ (3! · 4!) = 35 (o 210 ÷ 3!)' },
      { title: 'Comprueba con la lista', coach: 'Elegir quién entra es lo mismo que elegir quién se queda por fuera. Compruébalo sin usar el 3: busca en la lista el tamaño de los que se quedan afuera y mira que da la misma cantidad de grupos.',
        ex: play('elige-comite', 'Grupos de 7 personas: los que se quedan afuera', { rounds: [{ n: 7, ways: 35 }] },
          '$C(7, 3) = C(7, 4) = 35$: escoger los 3 que entran es escoger los 4 que no.', { hint: 'Si 3 entran, ¿cuántos se quedan?' }),
        hints: ['Desliza el tamaño del grupo hasta el de los que no entran y mira cuántos grupos lista el juego.', 'De 7, si entran 3 se quedan 4.'],
        note: 'C(7, 3) = C(7, 4) = 35' },
    ],
    answer: 'Se pueden formar 35 comités.',
    wrap: 'Cuando el orden no importa, cuenta primero con orden y divide por las formas de ordenar a los elegidos; o piensa el grupo como una palabra de «sí» y «no». Escoger los que entran es lo mismo que escoger los que no: C(n, k) = C(n, n − k).',
  },

  // ---- Aritmética y promedios (Preuniversitario mundo 12) ----
  {
    id: 'gym-prima', after: ['pu-ar-1'], level: 2,
    title: 'La prima de Laura', strategy: 'Lo que queda, y luego de atrás hacia adelante',
    problem: 'Laura recibe una prima. Gasta $\\tfrac13$ en ropa y después $\\tfrac34$ de lo que le quedó en un viaje. Al final le quedan 100 000 pesos. ¿De cuánto era la prima?',
    steps: [
      { title: 'Qué parte sobrevive', coach: 'Cada gasto es una fracción de lo que había en ese momento, no del total. Antes de pensar en pesos, mira qué parte de la prima sobrevive a los dos gastos.',
        ex: play('area-queda', 'La parte de la prima que queda', { rounds: [{ a: [1, 3], b: [3, 4] }] },
          'Tras la ropa queda $\\tfrac23$; el viaje se lleva $\\tfrac34$ de eso y deja $\\tfrac14$: $\\tfrac23 \\cdot \\tfrac14 = \\tfrac16$.', { hint: 'Pinta lo que queda, no lo que se gasta.' }),
        hints: ['Pinta lo que queda tras la ropa y, de eso, lo que queda tras el viaje.', 'Quedan dos de las tres columnas y una de las cuatro filas.'],
        note: 'Queda 2/3 · 1/4 = 1/6 de la prima' },
      { title: 'Vuelve al principio', coach: 'Ya sabes qué fracción de la prima es lo que le quedó. Ahora piensa al revés: ¿de qué número es lo que quedó esa fracción? Deshacer una fracción es multiplicar por su inverso.',
        ex: play('total-original', '¿De cuánto era la prima?', { rounds: [{ steps: [[1, 3, 'total'], [3, 4, 'resto']], left: 100000, step: 50000, max: 800000 }] },
          'Lo que queda es $\\tfrac16$ de la prima: $100\\,000 \\cdot 6 = 600\\,000$.', { hint: '¿Cuántas veces cabe lo que queda en la prima?' }),
        hints: ['Si lo que queda es una parte de la prima, ¿cuántas de esas partes caben en la prima entera?', 'Lo que queda es la sexta parte: multiplica por 6.'],
        note: 'Prima: 100 000 ÷ (1/6) = 100 000 · 6 = 600 000' },
      { title: 'Comprueba hacia adelante', coach: 'Con la prima que hallaste, corta cada gasto sobre lo que quedaba en ese momento y mira si al final sobra justo lo que dice el enunciado.',
        ex: play('corta-lo-que-queda', 'Los gastos de la prima, uno tras otro', { rounds: [{ total: 600000, steps: [[1, 3, 'total'], [3, 4, 'resto']] }] },
          'Ropa: $600\\,000 \\div 3 = 200\\,000$, quedan $400\\,000$. Viaje: $\\tfrac34$ de $400\\,000$ son $300\\,000$, quedan $100\\,000$. Cuadra.', { hint: 'La segunda fila se parte sobre lo que quedó.' }),
        hints: ['La primera fila se parte en tercios de la prima; la segunda, en cuartos de lo que quedó.', 'Corta 1 de 3 partes y luego 3 de 4.'],
        note: 'Comprobación: ropa 200 000, viaje 300 000, y quedan los del enunciado' },
    ],
    answer: 'La prima era de 600 000 pesos.',
    wrap: 'Cuando cada gasto es una fracción de lo que queda, multiplica las fracciones que quedan para saber qué parte del total sobrevive. Para volver al principio, divide lo que queda entre esa fracción, y comprueba haciendo el camino hacia adelante.',
  },
  {
    id: 'gym-examen', after: ['pu-ar-2'], level: 2,
    title: 'El quinto examen', strategy: 'Promedio × cantidad = suma',
    problem: 'Juan lleva cuatro exámenes con notas 2.5, 4.5, 3.0 y 4.0. ¿Cuál es su promedio? ¿Cuánto debe sacar en el quinto examen para que su promedio suba a 3.7?',
    steps: [
      { title: 'El promedio es nivelar', coach: 'El promedio es la altura a la que quedarían todas las barras si se nivelaran: lo que le sobra a las altas llena exactamente lo que les falta a las bajas.',
        ex: play('nivela-datos', 'Nivela las cuatro notas', { rounds: [{ data: [2.5, 4.5, 3, 4], hi: 5, step: 1 }] },
          'Las notas suman 14 y son 4: $14 \\div 4 = 3.5$. Por encima sobran $1 + 0.5 = 1.5$ y por debajo faltan $1 + 0.5 = 1.5$: se compensan.', { hint: 'Que sobre por arriba lo mismo que falta por abajo.' }),
        hints: ['Mueve la línea hasta que lo que sobresale por encima sea igual a lo que falta por debajo.', 'Suma las cuatro notas y divide entre 4.'],
        note: 'Promedio: (2.5 + 4.5 + 3 + 4) ÷ 4 = 14 ÷ 4 = 3.5' },
      { title: 'Convierte el promedio en suma', coach: 'No promedies promedios: el promedio guarda la suma. Con cinco exámenes y el promedio que quiere, la suma de las cinco notas queda fija; el quinto examen debe aportar lo que falte.',
        ex: play('dato-faltante', 'La nota del quinto examen', { rounds: [{ data: [2.5, 4.5, 3, 4, null], mean: 3.7, hi: 5, step: 0.5 }] },
          'Con promedio 3.7 en cinco exámenes, la suma es $3.7 \\cdot 5 = 18.5$. Ya tiene 14: le faltan $18.5 - 14 = 4.5$.', { hint: 'Promedio por cantidad da la suma.' }),
        hints: ['Multiplica el promedio que quiere por la cantidad de exámenes: esa es la suma que necesita.', 'Necesita una suma de 18.5 y ya tiene 14.'],
        note: 'Suma necesaria: 3.7 · 5 = 18.5; el quinto: 18.5 − 14 = 4.5' },
    ],
    answer: 'Su promedio es 3.5, y necesita 4.5 en el quinto examen.',
    wrap: 'El promedio guarda la suma: suma = promedio × cantidad. Para hallar un dato que falta, calcula la suma que pide el promedio deseado y resta lo que ya hay. Promediar es nivelar: lo que sobra arriba llena lo que falta abajo.',
  },
  {
    id: 'gym-peor', after: ['pu-ar-4'], level: 3,
    title: 'Bolas y dulces', strategy: 'Pensar en el caso extremo',
    problem: 'En una bolsa oscura hay 6 bolas rojas, 4 azules y 3 verdes. ¿Cuántas hay que sacar sin mirar para estar seguros de tener 2 del mismo color? ¿Y para tener 2 rojas? Después se reparten 18 dulces entre 4 niños: cada uno recibe al menos uno y todos cantidades distintas. ¿Cuánto es lo máximo que puede recibir uno? ¿Y lo menos que puede recibir el que más recibe?',
    steps: [
      { title: 'Gánale a la peor suerte', coach: 'Estar seguro es ganarle a la peor suerte. Imagina que la bolsa se empeña en no darte lo que pides: ¿cuántas puedes sacar sin que se cumpla? Una más ya lo asegura. Son dos pestañas: dos iguales y dos rojas.',
        ex: play('peor-caso-bolsa', 'Para estar seguros', { rounds: [{ bag: [['coral', 6], ['sky', 4], ['mint', 3]], kind: 'iguales', k: 2 }, { bag: [['coral', 6], ['sky', 4], ['mint', 3]], kind: 'color', k: 2, color: 'coral' }] },
          'Dos iguales: la peor suerte saca una de cada color (3); la cuarta repite. Dos rojas: la peor suerte saca antes las 7 azules y verdes y una roja; la siguiente asegura: $4 + 3 + 2 = 9$.', { hint: '¿Cuántas puedes sacar SIN que se cumpla?' }),
        hints: ['Para dos iguales, la peor suerte saca una de cada color antes de repetir. Para dos rojas, saca antes todas las de otros colores.', 'Dos iguales: 3 + 1. Dos rojas: 4 + 3 + 2.'],
        note: 'Dos iguales: 3 + 1 = 4. Dos rojas: 4 + 3 + 2 = 9' },
      { title: 'Lleva el reparto al extremo', coach: 'Para que uno reciba lo más posible, los demás reciben lo menos que pueden (al menos uno), sin repetir cantidades. Para que el que más recibe tenga lo menos posible es al revés: lo más parejo que permitan las cantidades distintas. Son dos pestañas.',
        ex: play('reparto-extremo', 'Repartos con extremos', { rounds: [{ n: 4, total: 18, ask: 'max' }, { n: 4, total: 18, ask: 'minmax' }] },
          'Máximo: los otros tres reciben 1, 2 y 3, y le quedan $18 - 6 = 12$. Menor máximo: cantidades seguidas, $6 + 5 + 4 + 3 = 18$; con 5 no alcanza, porque $5 + 4 + 3 + 2 = 14$ no llega a 18.', { hint: 'Los demás tienen que ser distintos.' }),
        hints: ['Los otros tres reciben lo mínimo con cantidades distintas: empieza en 1. Para lo más parejo, prueba cantidades seguidas.', 'Máximo: 18 − (1 + 2 + 3). Menor máximo: 6 + 5 + 4 + 3.'],
        note: 'Máximo: 18 − (1 + 2 + 3) = 12; menor máximo: 6 + 5 + 4 + 3 = 18 → 6' },
    ],
    answer: 'Hay que sacar 4 bolas para tener dos del mismo color y 9 para tener dos rojas. En el reparto, uno puede recibir hasta 12 dulces, y lo menos que puede recibir el que más recibe es 6.',
    wrap: 'En los problemas de «estar seguro» o de «lo máximo / lo mínimo», imagina el caso extremo: la peor suerte posible, o que los demás reciben lo menos que pueden. Lo que se resuelve en ese extremo es la respuesta.',
  },

  // ---- Azar y probabilidad (Preuniversitario mundo 16) ----
  {
    id: 'gym-dados', after: ['pu-pb-2'], level: 2,
    title: 'Dos dados', strategy: 'Contar lo contrario y no contar dos veces',
    problem: 'Se lanzan dos dados. ¿Qué probabilidad hay de que el producto de los dos sea mayor que 6? ¿Y de que la suma sea 7 o salga algún 6?',
    steps: [
      { title: 'Cuenta lo contrario', coach: 'Los 36 resultados de la tabla son igual de probables. El juego mide lo contrario de lo que se pregunta: marca los que NO cumplen (producto 6 o menos), que son menos y están juntos, y al final réstalos de todos.',
        ex: play('tabla-dados', 'Lo contrario: producto 6 o menos', { rounds: [{ say: 'el producto es 6 o menos', f: (a, b) => a * b <= 6 }] },
          'Con el 1 sirven los seis; con el 2, del 1 al 3; con el 3, el 1 y el 2; con 4, 5 o 6, solo el 1: $6 + 3 + 2 + 1 + 1 + 1 = 14$. Producto mayor que 6: $1 - \\tfrac{14}{36} = \\tfrac{22}{36} = \\tfrac{11}{18}$.', { hint: 'Recorre fila por fila: ¿hasta qué número del otro dado sirve?' }),
        hints: ['Recorre fila por fila: si el primer dado es 1, sirven todos; si es más grande, sirven menos.', 'Fila 1: seis casillas; fila 2: tres; fila 3: dos; filas 4, 5 y 6: una cada una.'],
        note: 'Producto ≤ 6: 14 de 36; producto > 6: 1 − 14/36 = 22/36 = 11/18' },
      { title: '«O»: no cuentes dos veces', coach: 'Para «A o B» se cuentan las casillas que cumplen alguna de las dos. Si una casilla cumple las dos a la vez, al sumar los dos grupos queda contada dos veces: hay que descontarla.',
        ex: play('tabla-dados', 'Suma 7 o algún 6', { rounds: [{ say: 'la suma es 7 o sale algún 6', f: (a, b) => a + b === 7 || a === 6 || b === 6 }] },
          'Suma 7: 6 casillas. Algún 6: 11 (la fila y la columna del 6, que comparten el (6, 6)). Las dos a la vez: (1, 6) y (6, 1). Total: $6 + 11 - 2 = 15$, así que $\\tfrac{15}{36} = \\tfrac{5}{12}$.', { hint: 'La suma 7 es una diagonal; «algún 6» es una fila y una columna.' }),
        hints: ['Marca la diagonal de la suma 7 y la fila y la columna del 6. ¿Qué casillas están en las dos?', 'Se cruzan en (1, 6) y (6, 1).'],
        note: 'Suma 7 (6) + algún 6 (11) − las dos (2) = 15 de 36 = 5/12' },
    ],
    answer: 'El producto es mayor que 6 con probabilidad $\\tfrac{11}{18}$, y la suma es 7 o sale algún 6 con probabilidad $\\tfrac{5}{12}$.',
    wrap: 'Con resultados igual de probables, P = casos favorables ÷ casos posibles. Si lo pedido abarca casi todo, cuenta lo contrario y réstalo de 1. En un «o», suma los casos y descuenta los que se cuentan dos veces.',
  },
  {
    id: 'gym-urna', after: ['pu-pb-2'], level: 3,
    title: 'La urna con devolución', strategy: 'El árbol multiplica por camino y suma caminos',
    problem: 'En una urna hay 8 bolas azules. ¿Cuántas rojas hay que echar para que la probabilidad de sacar una roja sea $\\tfrac37$? Con esa urna se saca una bola, se mira, se devuelve y se saca otra. ¿Qué probabilidad hay de que las dos sean del mismo color? ¿Y de sacar al menos una roja?',
    steps: [
      { title: 'Arma la urna', coach: 'La probabilidad es rojas ÷ total, y el total también crece con cada roja que echas. Piensa en la urna por grupos de 7: de cada 7 bolas, cuántas deben ser rojas y cuántas azules.',
        ex: play('urna-fraccion', 'Rojas para que $P = \\tfrac37$', { rounds: [{ color: 'coral', others: [['sky', 8]], target: [3, 7] }] },
          'Con $k$ rojas: $\\tfrac{k}{k + 8} = \\tfrac37$, así que $7k = 3k + 24$ y $k = 6$: 6 rojas de 14.', { hint: 'Con k rojas, el total es k + 8: ¿qué parte es k?' }),
        hints: ['Si las rojas son 3 de cada 7 bolas, las azules son las otras 4 de cada 7.', 'Por cada 4 azules van 3 rojas, y hay 8 azules: dos grupos.'],
        note: 'k ÷ (k + 8) = 3/7 → 7k = 3k + 24 → 6 rojas' },
      { title: 'Recorre el árbol', coach: 'Como la bola se devuelve, la segunda sacada no depende de la primera. Cada camino del árbol multiplica sus ramas; marca los caminos que sirven y suma sus probabilidades. Son dos pestañas.',
        ex: play('arbol-caminos', 'Dos sacadas con devolución', { rounds: [
          { steps: [[['R', 3, 7], ['A', 4, 7]], [['R', 3, 7], ['A', 4, 7]]], say: 'las dos son del mismo color', f: pa => pa[0] === pa[1] },
          { steps: [[['R', 3, 7], ['A', 4, 7]], [['R', 3, 7], ['A', 4, 7]]], say: 'sale al menos una roja', f: pa => pa.includes(0) },
        ] }, 'Mismo color: $\\tfrac37 \\cdot \\tfrac37 + \\tfrac47 \\cdot \\tfrac47 = \\tfrac{9}{49} + \\tfrac{16}{49} = \\tfrac{25}{49}$. Al menos una roja: todos menos azul-azul, $1 - \\tfrac{16}{49} = \\tfrac{33}{49}$.', { hint: 'Cada camino es una pareja de colores.' }),
        hints: ['«Mismo color» son dos caminos. Para «al menos una roja», piensa qué camino no tiene ninguna.', 'El único camino sin rojas es azul-azul.'],
        note: 'Mismo color: 9/49 + 16/49 = 25/49; al menos una roja: 1 − 16/49 = 33/49' },
    ],
    answer: 'Hay que echar 6 rojas. Mismo color: $\\tfrac{25}{49}$. Al menos una roja: $\\tfrac{33}{49}$.',
    wrap: 'Para dos sacadas, dibuja el árbol: la probabilidad de un camino es el producto de sus ramas y la de un suceso es la suma de sus caminos. «Al menos uno» suele ser más corto como 1 menos el camino donde no pasa nada.',
  },
  {
    id: 'gym-adivina', after: ['pu-pb-2'], level: 2,
    title: 'Adivinar el examen', strategy: 'Al menos uno = 1 − ninguno',
    problem: 'Un examen tiene 3 preguntas, cada una con 4 opciones y una sola correcta. Pedro no estudió y responde todas al azar. ¿Qué probabilidad tiene de acertar al menos una? ¿Y de acertar al menos dos?',
    steps: [
      { title: 'Cuenta todas y las de ningún acierto', coach: 'Primero cuenta las formas de responder: una casilla por pregunta. Luego cuenta las formas de fallar todas (en cada pregunta, solo valen las opciones malas). La resta son las que aciertan al menos una.',
        ex: play('complemento-conteo', 'Respuestas con al menos un acierto', { rounds: [{ ask: 'Formas de responder con al menos un acierto', slots: ['preg. 1', 'preg. 2', 'preg. 3'], all: [4, 4, 4], none: [3, 3, 3], tray: [4, 3, 2, 1] }] },
          'Todas: $4^3 = 64$. Sin ningún acierto: $3^3 = 27$. Con al menos uno: $64 - 27 = 37$.', { hint: 'Fallar una pregunta deja las opciones malas.' }),
        hints: ['Arriba, cuántas opciones tiene cada pregunta. Abajo, cuántas de esas son malas.', 'Arriba 4, 4, 4; abajo 3, 3, 3.'],
        note: 'Todas 4³ = 64; ninguna buena 3³ = 27; al menos una: 64 − 27 = 37 de 64' },
      { title: 'Al menos dos, en el árbol', coach: 'B es acertar (1 de 4) y M fallar (3 de 4). «Al menos dos» ya no es todo menos un camino: marca los caminos con dos o tres B y suma lo que vale cada uno.',
        ex: play('arbol-caminos', 'Tres preguntas al azar', { rounds: [{ steps: [[['B', 1, 4], ['M', 3, 4]], [['B', 1, 4], ['M', 3, 4]], [['B', 1, 4], ['M', 3, 4]]], say: 'acierta al menos dos', f: pa => pa.filter(i => i === 0).length >= 2 }] },
          'Con dos aciertos hay tres caminos (B‑B‑M, B‑M‑B, M‑B‑B), cada uno $\\tfrac14 \\cdot \\tfrac14 \\cdot \\tfrac34 = \\tfrac{3}{64}$; con tres, B‑B‑B: $\\tfrac{1}{64}$. Total: $\\tfrac{9}{64} + \\tfrac{1}{64} = \\tfrac{10}{64} = \\tfrac{5}{32}$.', { hint: 'Cuenta las B de cada camino.' }),
        hints: ['Recorre cada camino y cuenta cuántas B tiene: sirven los de dos o tres.', 'Son cuatro caminos: tres con dos B y el de tres B.'],
        note: 'Dos aciertos: 3 · 3/64 = 9/64; tres: 1/64; al menos dos: 10/64 = 5/32' },
    ],
    answer: 'Acierta al menos una con probabilidad $\\tfrac{37}{64}$, un poco más de la mitad; al menos dos, solo $\\tfrac{5}{32}$.',
    wrap: 'Cuando piden «al menos uno», calcula la probabilidad de «ninguno» (un solo caso: fallar todo) y réstala de 1. Cuando piden «al menos dos», ese atajo ya no basta: en el árbol, cada camino multiplica sus ramas y se suman los caminos que sirven.',
  },
];

// Mundos del curso con retos: [{ unit, ui, retos }] en el orden del curso. Un reto va en el primer mundo del curso que tiene
// alguna de sus lecciones `after`.
function gymRetos(c) {
  const out = [], seen = new Set();
  c.units.forEach((u, ui) => {
    const ids = new Set(u.lessons.map(l => l.id));
    const retos = GYM_RETOS.filter(r => !seen.has(r.id) && r.after.some(id => ids.has(id)));
    retos.forEach(r => seen.add(r.id));
    if (retos.length) out.push({ unit: u, ui, retos });
  });
  return out;
}
const gymOpen = (r, done, unlockAll) => !!unlockAll || r.after.some(id => !!(done || {})[id]);
// helps: ayudas usadas en cada paso (3 = se mostró la solución del paso).
const gymStars = helps => (helps.some(h => h >= 3) ? 1 : helps.some(h => h > 0) ? 2 : 3);
const gymStarsHTML = n => `<span class="gym-stars" aria-label="${n} de 3 estrellas">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}">★</i>`).join('')}</span>`;

// ---- Gimnasio cerebral por niveles (spec 2026-11-19-gimnasio-niveles) ----
const GYM_LEVELS = [
  { n: 1, name: 'Calentamiento', desc: 'Juegos de tus lecciones para entrar en calor. Cambian cada vez que repites.' },
  { n: 2, name: 'Fuerza', desc: 'Retos guiados un poco más difíciles que las lecciones. El entrenador te sugiere cada paso.' },
  { n: 3, name: 'Élite', desc: 'Los retos más exigentes: varios pasos y una estrategia completa.' },
];
// Barra con n discos por lado (más discos, más peso). Colores con --lc (el del nivel).
function gymPlates(n) {
  const p = [];
  for (let i = 0; i < n; i++) {
    const h = 20 - i * 5, y = 12 - h / 2;
    p.push(`<rect class="gp-plate" x="${15 - i * 5}" y="${y}" width="3.6" height="${h}" rx="1.4"/>`, `<rect class="gp-plate" x="${29.4 + i * 5}" y="${y}" width="3.6" height="${h}" rx="1.4"/>`);
  }
  return `<svg class="gym-plates" viewBox="0 0 48 24" aria-hidden="true"><rect class="gp-bar" x="2" y="10.6" width="44" height="2.8" rx="1.4"/>${p.join('')}</svg>`;
}
// Juegos que no van en el calentamiento: los de evaluación y, si hay otros, los «aburridos» (CLAUDE.md).
const GYM_NO_WARM = new Set(['pregunta-examen', 'laberinto-valor', 'domino-equivalencias', 'piramide-numerica', 'detective-pasos']);
const GYM_DULL = new Set(['arma-la-cuenta', 'escala-solucion', 'une-parejas', 'clasifica-cartas', 'ordena-terminos']);
// Calentamiento del mundo ui: tres juegos de las lecciones hechas (todas en modo revisión), intercalados por lección; n = veces
// superado, así al repetirlo salen otros.
function gymWarmup(c, ui, done, unlockAll, n = 0) {
  const u = c.units[ui], w = (typeof WORLDS !== 'undefined' && WORLDS[u.world]) || { name: u.title };
  const ls = u.lessons.filter(l => unlockAll || (done || {})[l.id]);
  const pick = ok => ls.map(l => l.ex.filter(e => e.type === 'play' && !GYM_NO_WARM.has(e.game) && ok(e)).map(ex => ({ l, ex })));
  let pools = pick(e => !GYM_DULL.has(e.game));
  if (!pools.some(p => p.length)) pools = pick(() => true);
  const flat = [];
  for (let k = 0; pools.some(p => p[k]); k++) pools.forEach(p => p[k] && flat.push(p[k]));
  // tres juegos distintos; al repetir, otros (o, si no hay más de tres, en otro orden)
  const start = flat.length > 3 ? n * 3 : n, steps = [], games = new Set(), seen = {};
  for (let i = 0; i < flat.length && steps.length < 3; i++) {
    const { l, ex } = flat[(start + i) % flat.length];
    if (games.has(ex.game)) continue;
    games.add(ex.game);
    seen[l.id] = (seen[l.id] || 0) + 1;
    let first = String(ex.explain || '').split(/\.\s/)[0];
    if ((first.match(/\$/g) || []).length % 2) first = '';   // no cortar dentro de una fórmula
    steps.push({
      title: seen[l.id] > 1 ? `${l.title} (${seen[l.id]})` : l.title,
      coach: `Calentamiento con «${l.title}». Antes de mover nada, recuerda la idea del video y lee bien qué pide el enunciado.`,
      hints: [ex.hint || 'Lee el enunciado otra vez: ¿qué te pide exactamente?', `La idea está en el video de «${l.title}»: piensa cómo la usaba allí.`],
      note: first && first.length <= 180 ? `«${l.title}»: ${first.replace(/\.$/, '')}.` : `Repasaste «${l.title}».`,
      ex,
    });
  }
  return {
    id: gymCal(c, ui), level: 1, warm: true, ui, after: u.lessons.map(l => l.id), open: steps.length > 0,
    title: `Calentamiento · ${w.name}`, strategy: 'Recuerda la idea del video antes de mover nada.',
    problem: 'Tres juegos de las lecciones que ya hiciste en este mundo, para entrar en calor antes de los retos.',
    answer: '', wrap: 'Ya calentaste. Cuando quieras, sube a Fuerza: retos más largos con el entrenador a tu lado.', steps,
  };
}
// El número del mundo en el curso entero: un docente ve el curso recortado (js/portal.js) y la marca debe ser la misma.
function gymCal(c, ui) { return `cal-${c.id}-${c.entero ? c.entero.units.indexOf(c.units[ui]) : ui}`; }
// Un reto guiado o un calentamiento por su id.
function gymFind(c, id, done, unlockAll, mine) {
  if (done === undefined && typeof S !== 'undefined') ({ done, unlockAll, gym: mine } = S);
  mine ||= {};
  const m = /^cal-.+-(\d+)$/.exec(id);
  if (m) { const ui = c.units.indexOf((c.entero || c).units[+m[1]]); return ui >= 0 ? gymWarmup(c, ui, done, unlockAll, mine[id]?.n || 0) : undefined; }
  return GYM_RETOS.find(r => r.id === id);
}
// Mundos del componente de ui hasta ui o hasta el último donde ya hizo alguna lección (si se adelantó), en orden.
function gymUpTo(c, ui, done = {}) {
  const same = c.units.map((u, i) => i).filter(i => c.units[i].block === c.units[ui]?.block);
  const top = Math.max(ui, ...same.filter(i => c.units[i].lessons.some(l => done[l.id])));
  return same.filter(i => i <= top);
}
// Tu nivel: calentar el mundo, luego el primer reto de Fuerza sin superar, luego Élite; todo superado: calentar.
function gymRecommend(c, ui, done, unlockAll, mine = {}) {
  const near = gymUpTo(c, ui, done || {}).reverse();
  const warmOf = i => gymWarmup(c, i, done, unlockAll, mine[gymCal(c, i)]?.n || 0);
  const mineW = warmOf(ui);
  // si su mundo aún no tiene lecciones hechas, el calentamiento abierto más cercano
  const warm = mineW.open ? mineW : near.map(warmOf).find(w => w.open) || mineW;
  if (warm.open && !mine[warm.id]) return { level: 1, item: warm };
  const groups = gymRetos(c).filter(g => near.includes(g.ui)).sort((a, b) => b.ui - a.ui);
  for (const lv of [2, 3]) {
    const r = groups.flatMap(g => g.retos).find(x => x.level === lv && gymOpen(x, done, unlockAll) && !mine[x.id]);
    if (r) return { level: lv, item: r };
  }
  return { level: 1, item: warm };
}

// Primer ejercicio de una lista: abierto y sin superar; si todos lo están, el que tiene menos estrellas. Pura.
function gymSiguiente(items, mine = {}, isOpen = () => true) {
  const ab = items.filter(isOpen);
  return ab.find(r => !mine[r.id]) || ab.slice().sort((a, b) => (mine[a.id]?.best || 0) - (mine[b.id]?.best || 0))[0] || null;
}
// Pasa el filtro «Por hacer» o «Superados». Pura.
const gymFiltra = (items, f, mine = {}) => items.filter(r => (f === 'hacer' ? !mine[r.id] : f === 'hechos' ? !!mine[r.id] : true));
// La barra que sube el personaje: hasta tres discos por lado; los que no van con el nivel esperan afuera.
const GYM_BARRA = `<svg class="gb-svg" viewBox="0 0 340 100" aria-hidden="true"><rect class="gb-rod" x="6" y="46" width="328" height="8" rx="4"/>${[0, 1, 2].map(i => {
  const h = 88 - i * 20, w = 17, y = 50 - h / 2, xi = 74 - i * 20;
  return [[xi, 'izq'], [340 - xi - w, 'der']].map(([x, l]) => `<g class="gb-p p${i + 1} ${l}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6"/><rect class="br" x="${x + 3}" y="${y + 7}" width="3.500" height="${h - 14}" rx="1.700"/></g>`).join('');
}).join('')}<rect class="gb-tope" x="93" y="40" width="7" height="20" rx="2.500"/><rect class="gb-tope" x="240" y="40" width="7" height="20" rx="2.500"/></svg>`;
const GYM_DADO = '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="4"/><path d="M9 9v.01M15 9v.01M12 12v.01M9 15v.01M15 15v.01"/></svg>';
const gymDisco = n => `<svg viewBox="0 0 64 64" aria-hidden="true"><circle class="gd-a" cx="32" cy="32" r="29"/><circle class="gd-b" cx="32" cy="32" r="20"/><circle class="gd-c" cx="32" cy="32" r="11"/><text x="32" y="37">${n}</text></svg>`;

// gymFocus: curso, mundo del nivel del estudiante, nivel elegido y filtro; lo pone el botón de las pesas.
let gymFocus = null;

function renderGym() {
  const c = courseById(S.course), mine = S.gym || {};
  const ui = gymFocus?.course === c.id && c.units[gymFocus.ui] ? gymFocus.ui : courseLevelUi(c, null, { done: S.done, last: S.lastLesson });
  const rec = gymRecommend(c, ui, S.done, S.unlockAll, mine);
  gymFocus = { course: c.id, ui, lvl: gymFocus?.course === c.id && gymFocus.lvl ? gymFocus.lvl : rec.level, ver: (gymFocus?.course === c.id && gymFocus.ver) || 'todos' };
  const u = c.units[ui], blockName = c.blocks?.find(b => b.id === u.block)?.name;
  const worlds = gymUpTo(c, ui, S.done || {}), block = c.units.map((x, i) => i).filter(i => c.units[i].block === u.block);
  const warms = worlds.map(i => gymWarmup(c, i, S.done, S.unlockAll, mine[gymCal(c, i)]?.n || 0)).filter(w => w.open || w.ui === ui);
  const groups = gymRetos(c).filter(g => block.includes(g.ui));
  const byLevel = lv => (lv === 1 ? warms.slice().reverse() : groups.flatMap(g => g.retos).filter(r => r.level === lv));
  const isOpen = r => (r.warm ? r.open : gymOpen(r, S.done, S.unlockAll));
  const all = [1, 2, 3].flatMap(byLevel), passed = all.filter(r => mine[r.id]).length;
  const stars = all.reduce((t, r) => t + (mine[r.id]?.best || 0), 0);
  const uiDe = r => (r.warm ? r.ui : groups.find(g => g.retos.includes(r))?.ui ?? ui);
  const W = i => WORLDS[c.units[i].world] || { name: c.units[i].title };
  const wName = i => W(i).name;
  // Lo que toca en un nivel: en el recomendado, lo de hoy; en los otros, lo primero abierto y sin superar (de tu mundo hacia atrás).
  const toca = lv => (lv === rec.level && isOpen(rec.item) ? rec.item : gymSiguiente(lv === 1 ? byLevel(1) : byLevel(lv).slice().sort((a, b) => (uiDe(a) > ui) - (uiDe(b) > ui) || Math.abs(uiDe(a) - ui) - Math.abs(uiDe(b) - ui)), mine, isOpen));

  const item = r => {
    const open = isOpen(r), best = mine[r.id]?.best, key = !r.warm && lessonsOf(c).find(l => r.after.includes(l.id)), i = uiDe(r);
    const sub = open ? (r.warm ? `${r.steps.length} juegos de tus lecciones` : esc(r.strategy))
      : r.warm ? 'Haz una lección de este mundo para abrirlo' : `Termina «${esc(key?.title || 'la lección')}» para abrirlo`;
    return `<button class="gym-item lv${r.level}${open ? '' : ' locked'}${best ? ' done' : ''}" data-reto="${r.id}"${open ? '' : ' aria-disabled="true"'}>
      <span class="gi-art world-art" aria-hidden="true">${W(i).art || ''}<span class="gi-lv">${open ? gymPlates(r.level) : ICON.lock}</span>${best ? `<span class="gi-ok">${ICON.check}</span>` : ''}</span>
      <span class="gi-body"><b>${esc(r.warm ? wName(r.ui) : r.title)}</b><small>${sub}</small>
      <span class="gi-end">${gymStarsHTML(best || 0)}<span>${r.steps.length} ${r.warm ? 'juegos' : 'pasos'}</span></span></span></button>`;
  };
  const lista = lv => {
    const ver = gymFocus.ver, its = gymFiltra(byLevel(lv), ver, mine);
    if (!byLevel(lv).length) return `<div class="gym-soon lv${lv}">${mascotSVG('think', 'm-soon')}<p><b>Pronto llegan retos de este nivel</b> a ${esc(blockName || c.name)}. Mientras tanto, calienta con los juegos de tus lecciones.</p>
      <button class="btn ghost" data-lv="1">Ir al calentamiento</button></div>`;
    if (!its.length) return `<p class="gym-nada">${ver === 'hechos' ? 'Aún no has superado ninguno de este nivel.' : '¡Los superaste todos! Puedes repetirlos para ganar más estrellas.'}</p>`;
    if (lv === 1) return `<div class="gym-list">${its.map(item).join('')}</div>`;
    return groups.map(g => ({ ui: g.ui, rs: g.retos.filter(r => its.includes(r)) })).filter(g => g.rs.length)
      .map(g => `<section class="gym-world"><h2><small>Mundo ${worldNo(c, g.ui)}${g.ui === ui ? '<span class="gw-here">Tu mundo</span>' : ''}</small>${esc(wName(g.ui))}</h2><div class="gym-list">${g.rs.map(item).join('')}</div></section>`).join('');
  };

  view.innerHTML = `<div class="gym" style="${gymFabColors(c)}">
    <header class="gym-top">
      <button class="world-back" data-back-course>${ICON.back}<span>Volver al curso</span></button>
      <div class="gym-tit"><span class="gh-art">${GYM_3D}</span><div><h1>Gimnasio cerebral</h1><p>${esc(c.name)}${blockName ? ` · ${esc(blockName)}` : ''}</p></div></div>
      <div class="gh-stats"><span><b>${passed}<small>/${all.length}</small></b>superados</span><span><b><i class="gh-star">★</i>${stars}</b>estrellas</span></div>
    </header>
    <section class="gym-hero" aria-label="Elige el peso y entrena">
      <div class="gb-escena"><span class="gb-luz"></span><div class="gb-lev"><div class="gb-barra">${GYM_BARRA}</div><div class="gb-mono">${mascotSVG('cheer')}</div></div><span class="gb-piso"></span></div>
      <div class="gym-today"><p class="gt-eyebrow"></p><h2></h2><p class="gt-sub"></p>
        <div class="gt-acts"><button class="btn" type="button" data-ir></button><button class="gt-dado" type="button" data-dado aria-label="Sorpréndeme: un reto al azar">${GYM_DADO}</button></div>
        <p class="gt-pista">También puedes levantar la barra con el dedo.</p></div>
      <div class="gym-levels" role="group" aria-label="Niveles del gimnasio">${GYM_LEVELS.map(x => {
        const its = byLevel(x.n), d = its.filter(r => mine[r.id]).length;
        return `<button class="gym-lv lv${x.n}" type="button" data-lv="${x.n}" aria-pressed="false" style="--p:${its.length ? d / its.length : 0}">
          <span class="gd">${gymDisco(x.n)}</span><b>${x.name}</b><small>${its.length ? `${d} de ${its.length}` : 'Pronto'}</small>${x.n === rec.level ? '<span class="glv-tag">Tu nivel</span>' : ''}</button>`;
      }).join('')}</div>
    </section>
    <div class="gym-barra2"><h2 class="gym-h"></h2><div class="gym-ver" role="group" aria-label="Qué retos ver">${[['todos', 'Todos'], ['hacer', 'Por hacer'], ['hechos', 'Superados']].map(([k, t]) => `<button type="button" data-ver="${k}">${t}</button>`).join('')}</div></div>
    <div class="gym-lista"></div>
  </div>`;
  const G = $('.gym', view), q = s => $(s, G), hero = q('.gym-hero'), lev = q('.gb-lev'), quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let actual = null;
  const abre = (id, quien) => {
    const r = id && gymFind(c, id);
    if (!r || !isOpen(r)) {
      if (quien) { quien.classList.remove('no'); void quien.offsetWidth; quien.classList.add('no'); }
      return toast(r?.warm ? 'Haz una lección de este mundo para calentar aquí.' : r ? 'Termina la lección de este tema para abrir el reto.' : 'Haz una lección de este mundo y vuelve a calentar.');
    }
    startReto(c, r);
  };
  const pintaLista = () => {
    q('.gym-lista').innerHTML = lista(gymFocus.lvl);
    G.querySelectorAll('[data-ver]').forEach(b => b.setAttribute('aria-pressed', b.dataset.ver === gymFocus.ver));
    q('.gym-lista').querySelectorAll('[data-reto]').forEach(b => { b.onclick = () => abre(b.dataset.reto, b); });
    const lv = $('[data-lv]', q('.gym-lista')); if (lv) lv.onclick = () => { pon(1, true); q('.gym-lv.lv1').focus({ preventScroll: true }); };
  };
  const pon = (lv, anima) => {
    gymFocus.lvl = lv;
    const L = GYM_LEVELS[lv - 1]; actual = toca(lv);
    hero.className = `gym-hero lv${lv}`;
    G.querySelectorAll('.gym-lv').forEach(b => { const on = +b.dataset.lv === lv; b.classList.toggle('on', on); b.setAttribute('aria-pressed', on); });
    q('.gt-eyebrow').textContent = lv === rec.level ? `Tu entrenamiento de hoy · ${L.name}` : `Nivel ${lv} · ${L.name}`;
    q('.gym-today h2').textContent = actual ? actual.title : byLevel(lv).length ? 'Aún está cerrado' : 'Pronto llegan retos de este nivel';
    q('.gt-sub').textContent = actual ? (actual.warm ? `${actual.steps.length} juegos de las lecciones que ya hiciste.` : `${actual.steps.length} pasos con tu entrenador. Estrategia: ${actual.strategy}`) : byLevel(lv).length ? 'Haz las lecciones de este mundo para abrir este nivel.' : 'Mientras tanto, calienta con los juegos de tus lecciones.';
    const b = q('[data-ir]'); b.innerHTML = `Entrenar ${ICON.right}`; b.disabled = !actual;
    q('[data-dado]').disabled = byLevel(lv).filter(isOpen).length < 2;
    q('.gt-pista').hidden = !actual; hero.classList.toggle('cerrado', !actual);
    q('.gym-h').textContent = lv === 1 ? 'Calienta por mundos' : `Retos de ${L.name}`;
    pintaLista();
    if (anima && !quieto) { lev.classList.remove('sube'); void lev.offsetWidth; lev.classList.add('sube'); }
  };
  $('[data-back-course]', view).onclick = () => go('learn');
  q('[data-ir]').onclick = () => actual && abre(actual.id);
  q('[data-dado]').onclick = () => { const ab = byLevel(gymFocus.lvl).filter(r => isOpen(r) && r.id !== actual?.id); if (ab.length) abre(ab[Math.floor(Math.random() * ab.length)].id); };
  G.querySelectorAll('[data-ver]').forEach(b => { b.onclick = () => { gymFocus.ver = b.dataset.ver; pintaLista(); }; });
  // Los discos: se tocan o se arrastran hasta la barra.
  G.querySelectorAll('.gym-lv').forEach(b => {
    let id = null, x0 = 0, y0 = 0, cop = null, movio = false;
    const quita = () => { cop?.remove(); cop = null; hero.classList.remove('espera'); };
    b.onpointerdown = e => { if (e.button) return; id = e.pointerId; x0 = e.clientX; y0 = e.clientY; movio = false; };
    b.onpointermove = e => {
      if (e.pointerId !== id) return;
      if (!cop && Math.hypot(e.clientX - x0, e.clientY - y0) > 9) {
        movio = true; b.setPointerCapture(id); hero.classList.add('espera');
        cop = b.querySelector('.gd').cloneNode(true); cop.className = `gd gd-vuela lv${b.dataset.lv}`; G.append(cop);
      }
      if (cop) { cop.style.left = `${e.clientX / zk()}px`; cop.style.top = `${e.clientY / zk()}px`; }
    };
    b.onpointerup = e => {
      if (e.pointerId !== id) return;
      id = null; if (!cop) return;
      const r = q('.gb-escena').getBoundingClientRect(), dentro = e.clientX > r.left && e.clientX < r.right && e.clientY > r.top && e.clientY < r.bottom + 30;
      quita(); if (dentro) pon(+b.dataset.lv, true);
    };
    b.onpointercancel = () => { id = null; movio = false; quita(); };
    b.onclick = () => { if (movio) { movio = false; return; } pon(+b.dataset.lv, true); };
  });
  // La barra se levanta con el dedo: arriba del todo, empieza el entrenamiento.
  const barra = q('.gb-barra'); let bid = null, by = 0, sube = 0;
  barra.onpointerdown = e => { if (e.button || !actual) return; bid = e.pointerId; by = e.clientY; sube = 0; barra.setPointerCapture(bid); lev.classList.remove('sube'); lev.classList.add('mano'); };
  barra.onpointermove = e => { if (e.pointerId !== bid) return; sube = Math.max(0, Math.min(1, (by - e.clientY) / 70)); lev.style.setProperty('--sube', sube.toFixed(3)); hero.classList.toggle('arriba', sube >= 1); };
  const suelta = e => { if (e.pointerId !== bid) return; bid = null; const ya = e.type === 'pointerup' && sube >= 1; lev.classList.remove('mano'); lev.style.setProperty('--sube', 0); hero.classList.remove('arriba'); if (ya) abre(actual.id); };
  barra.onpointerup = suelta; barra.onpointercancel = suelta;
  barra.addEventListener('touchstart', e => e.preventDefault(), { passive: false });   // subir la barra no desplaza la página
  pon(gymFocus.lvl, true);
}

// ---- un reto guiado ----
function startReto(c, r) {
  if (typeof planMotivo === 'function' && r.after.length && r.after.every(id => planMotivo(id))) return openBloqueo(r.after[0]);   // su lección no está en el plan
  setGameCourse(c.id);
  const back = tab;
  cleanup?.(); cleanup = null;
  const helps = r.steps.map(() => 0), notes = [];
  let pos = -1, handle = null, finished = false;

  const ov = $('#overlay');
  ov.innerHTML = `<div class="lesson gym-run" style="${typeof gymFabColors === 'function' ? gymFabColors(c) : `--c:${c.color}`}">
    <div class="lesson-top">
      <button class="icon-btn" data-close aria-label="Salir">${ICON.x}</button>
      <ol class="gym-seg" aria-label="Pasos del reto">${r.steps.map((s, i) => `<li><span class="pz-sr-gym">Paso ${i + 1}: ${esc(s.title)}</span></li>`).join('')}</ol>
      <span class="tb-stat gym-badge" title="Gimnasio">${ICON.gym}</span>
    </div>
    <div class="lesson-body"></div>
    <div class="lesson-foot"><button class="btn main">Empezar</button></div>
    <div class="feedback" role="status"></div>
  </div>`;
  ov.classList.add('open');
  document.body.classList.add('in-lesson');
  const root = $('.lesson', ov), body = $('.lesson-body', ov), btn = $('.btn.main', ov), fb = $('.feedback', ov), segs = [...ov.querySelectorAll('.gym-seg li')];
  const avanza = n => segs.forEach((s, i) => { s.className = i < n ? (helps[i] ? 'ok ayuda' : 'ok') : i === n ? 'now' : ''; if (i === n) s.setAttribute('aria-current', 'step'); else s.removeAttribute('aria-current'); });

  let closeConcept = null;
  const conceptOf = s => (s.concept && typeof CONCEPTOS !== 'undefined' && CONCEPTOS[s.concept]) || null;
  const teardown = () => { closeConcept?.(); closeConcept = null; handle?.destroy?.(); handle = null; };
  function close(to) {
    if (!finished && pos >= 0) {
      return ask({ title: '¿Salir del reto?', text: 'Lo que llevas de este reto no se guarda.', ok: 'Salir', cancel: 'Seguir entrenando', danger: true })
        .then(yes => { if (yes && lessonClose === close) { finished = true; close(to); } });
    }
    teardown();
    document.removeEventListener('keydown', onKey);
    ov.classList.remove('open'); ov.innerHTML = '';
    document.body.classList.remove('in-lesson');
    lessonClose = null;
    go(typeof to === 'string' ? to : back);
  }
  lessonClose = close;
  ov.querySelectorAll('[data-close]').forEach(b => { b.onclick = () => close(); });

  const plan = cur => `<ol class="gym-plan">${r.steps.map((s, i) => `<li class="${i < cur ? 'ok' : i === cur ? 'now' : ''}"><span>${i < cur ? ICON.check : i + 1}</span>${esc(s.title)}</li>`).join('')}</ol>`;
  const notebook = () => (notes.length ? `<section class="gym-notes"><h3>Tu cuaderno</h3><ol>${notes.map(n => `<li>${tex(n)}</li>`).join('')}</ol></section>` : '');
  const strat = () => `<div class="gym-strat"><small>Estrategia</small><b>${esc(r.strategy)}</b></div>`;

  function intro() {
    body.className = 'lesson-body';
    body.innerHTML = `<div class="gym-intro">
      <p class="gym-eyebrow lv${r.level}">${gymPlates(r.level)}${r.warm ? 'Calentamiento' : `Reto guiado · Nivel ${r.level}, ${GYM_LEVELS[r.level - 1].name}`}</p>
      <h2>${esc(r.title)}</h2>
      <div class="gym-cols"><div class="gym-problem">${tex(r.problem)}</div>
      <div class="gym-ruta">${strat()}<h3>El plan</h3>${plan(-1)}</div></div>
      <p class="gym-calma"><span>${mascotSVG('think')}</span>Voy contigo en cada paso. Si te equivocas no pierdes vidas: te doy una ayuda y lo intentas otra vez.</p>
    </div>`;
    btn.textContent = 'Empezar'; btn.disabled = false;
    btn.onclick = () => { pos = 0; step(); };
  }

  function coach(text, label) {
    $('.coach p', body).innerHTML = tex(text);
    $('.coach small', body).textContent = label;
    const k = $('.coach', body); k.classList.remove('nudge'); void k.offsetWidth; k.classList.add('nudge');
  }

  function step() {
    teardown();
    root.classList.remove('fb-open');
    fb.className = 'feedback';
    body.className = 'lesson-body';
    body.style.paddingBottom = '';
    body.scrollTop = 0;
    avanza(pos);
    if (pos >= r.steps.length) return finish();
    const s = r.steps[pos];
    // Un solo contenedor: mountSketch (kit.js) mide el primer hijo de .lesson-body para achicar el juego si no cabe.
    body.innerHTML = `<div class="gym-step"><div class="gym-lado"><details class="gym-reto"${esEscritorio() && innerHeight / zk() > 760 ? ' open' : ''}><summary><span>El reto</span><span class="gr-n">Paso ${pos + 1} de ${r.steps.length}</span></summary><div>${tex(r.problem)}</div></details>
      <div class="coach" role="note"><span class="coach-av">${mascotSVG('think')}</span><div><small>Paso ${pos + 1} · ${esc(s.title)}</small><p></p>${conceptOf(s) ? `<button type="button" class="con-btn" data-concept>${ICON.bulb}Recordar el concepto</button>` : ''}</div></div>
      ${notebook()}</div><div class="gym-ex"></div></div>`;
    const cb = $('[data-concept]', body);
    if (cb) cb.onclick = () => { cb.classList.remove('pulse'); closeConcept?.(); closeConcept = CON.open(root, s.concept); };
    coach(s.coach, `Paso ${pos + 1} · ${s.title}`);
    btn.textContent = 'Comprobar'; btn.disabled = true;
    handle = renderExercise($('.gym-ex', body), s.ex, ok => { btn.disabled = !ok; });
    btn.onclick = check;
  }

  function showFb(kind, html, label, then) {
    fb.className = `feedback show ${kind}`;
    fb.innerHTML = `<div class="fb-in">${html}<button class="btn">${label}</button></div>`;
    root.classList.add('fb-open');
    $('.btn', fb).focus({ preventScroll: true });
    body.style.paddingBottom = `${Math.max(0, fb.offsetHeight - $('.lesson-foot', ov).offsetHeight) + 24}px`;
    const t0 = Date.now();   // un doble toque en «Comprobar» no cierra la ayuda sin leerla
    $('.btn', fb).onclick = () => { if (Date.now() - t0 < 350) return; fb.classList.remove('show'); root.classList.remove('fb-open'); body.style.paddingBottom = ''; then(); };
  }

  function check() {
    const s = r.steps[pos], res = handle.check();
    if (res.ok) {
      handle.lock(true); Sfx.ok();
      notes.push(s.note);
      return showFb('ok', `<div class="fb-head"><span class="fb-icon">${ICON.check}</span><h4>¡Paso logrado!</h4></div>
        ${s.ex.explain ? `<p class="fb-exp">${tex(s.ex.explain)}</p>` : ''}
        <p class="gym-noted"><small>Al cuaderno</small>${tex(s.note)}</p>`, pos + 1 < r.steps.length ? 'Siguiente paso' : 'Ver el resultado', () => { pos++; step(); });
    }
    Sfx.bad();
    helps[pos]++;
    if (helps[pos] <= s.hints.length) {
      const h = s.hints[helps[pos] - 1];
      $('[data-concept]', body)?.classList.add('pulse');   // atascado: el concepto está a un toque
      return showFb('bad', `<div class="fb-head"><span class="fb-icon">${ICON.bulb}</span><h4>Todavía no. Te ayudo</h4></div>
        <p class="fb-exp">${tex(h)}</p>`, 'Intentar de nuevo', () => { btn.disabled = true; coach(h,`Ayuda ${helps[pos]} de ${s.hints.length} · ${s.title}`); });
    }
    handle.lock(false);
    notes.push(s.note);
    showFb('bad', `<div class="fb-head"><span class="fb-icon">${ICON.bulb}</span><h4>Así se resuelve este paso</h4></div>
      <div class="fb-sol">${tex(typeof texify === 'function' ? texify(res.solution) : res.solution)}</div>
      ${s.ex.explain ? `<p class="fb-exp">${tex(s.ex.explain)}</p>` : ''}
      <p class="gym-noted"><small>Al cuaderno</small>${tex(s.note)}</p>`, pos + 1 < r.steps.length ? 'Siguiente paso' : 'Ver el resultado', () => { pos++; step(); });
  }

  function finish() {
    finished = true;
    S.gym ||= {};
    // XP completa la primera vez o al mejorar las estrellas; repetir el mismo resultado da 5.
    // Un calentamiento repetido no da XP (son juegos de lecciones ya hechas): así no se llena la meta repitiéndolo.
    const stars = gymStars(helps), prev = S.gym[r.id]?.best || 0;
    const xp = stars > prev ? (r.warm ? 5 : stars === 3 ? 15 : 10) : r.warm ? 0 : 5;
    S.gym[r.id] = { best: Math.max(prev, stars), at: Date.now(), n: (S.gym[r.id]?.n || 0) + 1 };
    let newStreak = false;
    if (xp) { addXP(xp); newStreak = markStreak(); }
    save();
    avanza(r.steps.length);
    body.innerHTML = `<div class="gym-done"><canvas class="confetti"></canvas>
      <div class="gb-lev gb-win lv${r.level} sube"><div class="gb-barra">${GYM_BARRA}</div><div class="gb-mono">${mascotSVG('cheer')}</div></div>
      <h2>${stars === 3 ? '¡Reto superado sin ayudas!' : '¡Reto superado!'}</h2>
      <p class="muted">${esc(r.title)}</p>
      <div class="gym-done-stats">${gymStarsHTML(stars)}${xp ? `<b>${ICON.bolt}+${xp} XP</b>` : ''}</div>
      ${r.answer ? `<div class="gym-answer"><small>Respuesta</small><p>${tex(r.answer)}</p></div>` : ''}
      ${strat()}
      <p class="gym-wrap">${tex(r.wrap)}</p>
      <section class="gym-notes"><h3>Tu procedimiento</h3><ol>${notes.map(n => `<li>${tex(n)}</li>`).join('')}</ol></section>
      ${newStreak ? `<p class="streak-up">${ICON.flame} ¡Racha de ${S.streak} ${S.streak === 1 ? 'día' : 'días'}!</p>` : ''}
    </div>`;
    btn.textContent = 'Volver al gimnasio'; btn.disabled = false; btn.onclick = () => close();
    Sfx.win();
    requestAnimationFrame(() => confetti($('.confetti', body)));
  }

  function onKey(e) {
    if (e.key !== 'Enter' || e.target.closest?.('input, textarea')) return;
    const target = fb.classList.contains('show') ? $('.btn', fb) : !btn.disabled && btn;
    // Enter sobre otro control (la X, «El reto», «Ver pista»…) hace lo suyo, no comprueba.
    if (e.target !== target && e.target.closest?.('button, summary, a, details')) return;
    if (target) { e.preventDefault(); target.click(); }
  }
  document.addEventListener('keydown', onKey);
  intro();
}
;
//#archivo js/gimnasio-razonamiento.js
// Gimnasio del Preuniversitario, razonamiento lógico (spec 2026-11-20-preuda-razonamiento-diez): los conceptos animados que
// el estudiante puede recordar dentro de un paso (CONCEPTOS, motor en js/conceptos.js), los retos guiados de los mundos que
// no tenían y el concepto de cada paso de los retos que ya existían (GYM_CONCEPT_DE). Va después de js/gimnasio.js.
const CONCEPTOS_PU = {
  'fraccion-a-porcentaje': {
    title: 'De fracción a porcentaje',
    scene: { type: 'barra', bars: [
      { label: 'el todo en 5 partes', b: 0, segs: [{ w: .2, t: '1/5', c: 'a' }, { w: .2, t: '1/5', c: 'a' }, { w: .2, t: '', c: 'mute', dim: 1 }, { w: .2, t: '', c: 'mute', dim: 1 }, { w: .2, t: '', c: 'mute', dim: 1 }] },
      { label: 'el mismo todo son 100', b: 1, segs: [{ w: .2, t: '20', c: 'g' }, { w: .2, t: '20', c: 'g' }, { w: .2, t: '20', c: 'mute', dim: 1 }, { w: .2, t: '20', c: 'mute', dim: 1 }, { w: .2, t: '20', c: 'mute', dim: 1 }] },
      { label: '2 partes de 20', b: 2, segs: [{ w: .4, t: '40 %', c: 'ok' }] },
    ] },
    beats: ['$\\tfrac25$ es tomar 2 de 5 partes iguales.', 'Un porcentaje reparte el mismo todo en 100: cada quinto vale 20.', 'Dos quintos son $2 \\cdot 20 = 40$ de cada 100: el 40 %.'],
  },
  'lo-que-queda-de-cien': {
    title: 'Lo que queda del 100 %',
    scene: { type: 'barra', bars: [
      { label: 'el grupo completo', b: 0, segs: [{ w: 1, t: '100 %', c: 'a' }] },
      { label: 'se quitan las partes conocidas', b: 1, segs: [{ w: .4, t: '40 %', c: 'g' }, { w: .25, t: '25 %', c: 'f' }, { w: .35, t: '?', c: 'ok', b: 2 }] },
    ] },
    beats: ['Todo grupo completo es el 100 %.', 'Las partes que ya conoces ocupan su pedazo de la barra.', 'Lo que falta es el resto: $100 - 40 - 25 = 35\\,\\%$.'],
  },
  'porcentaje-por-pedazos': {
    title: 'Un porcentaje por pedazos',
    scene: { type: 'barra', bars: [
      { label: '40 personas', b: 0, segs: [{ w: 1, t: '100 %  →  40', c: 'a' }] },
      { label: 'la décima parte', b: 1, segs: [{ w: .1, t: '4', c: 'g' }, { w: .1, t: '4', c: 'g' }, { w: .1, t: '4', c: 'g' }, { w: .05, t: '2', c: 'f', b: 2 }] },
      { label: '30 % + 5 %', b: 3, segs: [{ w: .35, t: '35 %  →  14', c: 'ok' }] },
    ] },
    beats: ['El 100 % son las 40 personas.', 'El 10 % es la décima parte: 4. Tres pedazos de esos son el 30 %.', 'El 5 % es la mitad del 10 %: 2 personas.', '$35\\,\\% = 30\\,\\% + 5\\,\\%$: $12 + 2 = 14$ personas.'],
  },
  'area-por-resta': {
    title: 'Un área por resta',
    scene: { type: 'figura', shapes: [
      { k: 'rect', at: [110, 18], w: 100, h: 100, c: 'a', fill: 'a', b: 0 },
      { k: 'text', t: '12 · 12 = 144', at: [160, 136], c: 'a', s: 12, b: 0 },
      { k: 'circle', at: [160, 68], r: 33, c: 'g', fill: 'g', k2: 40, b: 1 },
      { k: 'text', t: '16π', at: [160, 73], c: 'ink', s: 13, b: 1 },
      { k: 'text', t: 'pasto = 144 − 16π', at: [160, 160], c: 'ok', s: 14, b: 2 },
    ] },
    beats: ['El jardín completo es un cuadrado: lado por lado.', 'La fuente es un círculo: $\\pi$ por el radio al cuadrado.', 'Lo sombreado no tiene fórmula propia: es el todo menos lo de adentro.'],
  },
  'orden-ancla': {
    title: 'Primero el dato fijo',
    scene: { type: 'tabla', hw: 8, cols: ['1.º', '2.º', '3.º', '4.º', '5.º'], rows: [''],
      cells: [[{ t: 'G', b: 2 }, { t: 'H', b: 2 }, { t: 'F', b: 0 }, '', '']],
      hl: [{ r: 0, c: 2, col: 'a', b: 0 }, { r: 0, c: 0, cs: 2, col: 'g', b: 1 }, { r: 0, c: 3, cs: 2, col: 'g', b: 1 }, { r: 0, c: 0, cs: 2, col: 'ok', b: 2 }],
      foot: { t: 'una sola opción sobrevive', b: 2 } },
    beats: ['Empieza por quien tiene puesto seguro: ese dato no se mueve.', 'Una pareja «justo después» ocupa dos casillas seguidas: mira dónde cabe.', 'Las pistas negativas tachan opciones hasta dejar una sola.'],
  },
  'razon-en-partes': {
    title: 'Una razón son partes iguales',
    scene: { type: 'barra', bars: [
      { label: 'razón 1 : 3 : 4', b: 0, segs: [{ w: 1 / 8, t: '1', c: 'a' }, { w: 3 / 8, t: '3', c: 'g' }, { w: 4 / 8, t: '4', c: 'f' }] },
      { label: '8 partes iguales de 60', b: 1, segs: [1, 2, 3, 4, 5, 6, 7, 8].map(() => ({ w: 1 / 8, t: '60', c: 'mute', dim: 1 })) },
      { label: 'cada cantidad', b: 2, segs: [{ w: 1 / 8, t: '60', c: 'a' }, { w: 3 / 8, t: '180', c: 'g' }, { w: 4 / 8, t: '240', c: 'f' }] },
    ] },
    beats: ['Una razón $1 : 3 : 4$ corta el total en $1 + 3 + 4 = 8$ partes iguales.', 'Cada parte vale el total entre 8: $480 \\div 8 = 60$.', 'Cada cantidad es su número de partes: 60, 180 y 240.'],
  },
  'aumento-como-factor': {
    title: 'Un aumento es un factor',
    scene: { type: 'barra', bars: [
      { label: 'antes', b: 0, segs: [{ w: .64, t: '100 %', c: 'a' }] },
      { label: 'se le suma su cuarta parte', b: 1, segs: [{ w: .64, t: '100 %', c: 'a' }, { w: .16, t: '+25 %', c: 'g' }] },
      { label: 'después', b: 2, segs: [{ w: .8, t: '125 %  →  × 1.25', c: 'ok' }] },
    ] },
    beats: ['El valor de antes es siempre el 100 %.', 'Aumentar un 25 % es agregarle su cuarta parte.', 'Queda el 125 %: multiplicar por 1.25. Un descuento del 25 % sería por 0.75.'],
  },
  'cambios-en-cadena': {
    title: 'Dos cambios seguidos',
    scene: { type: 'barra', bars: [
      { label: 'precio inicial', b: 0, segs: [{ w: .66, t: '100', c: 'a' }] },
      { label: 'sube el 20 % de 100', b: 1, segs: [{ w: .792, t: '120', c: 'g' }] },
      { label: 'baja el 20 % de 120', b: 2, segs: [{ w: .634, t: '96', c: 'ok' }, { w: .158, t: '−24', c: 'bad', dim: 1 }] },
    ] },
    beats: ['Empieza con 100: así los porcentajes se leen directo.', 'El aumento del 20 % se calcula sobre 100: sube a 120.', 'El descuento del 20 % se calcula sobre 120: baja 24, no 20. Queda en 96.'],
  },
  'inversa-constante': {
    title: 'Obreros por días no cambia',
    scene: { type: 'pasos', lines: ['6 obreros · 20 días = 120', 'menos días  →  más obreros', '120 ÷ 12 días = 10 obreros'] },
    beats: ['El trabajo que falta se mide en obreros por días: ese producto no cambia.', 'Si el plazo se acorta, el mismo trabajo se reparte entre más obreros.', 'Divide el trabajo entre los días que quedan.'],
  },
  'alcance': {
    title: 'Alcanzar es cerrar la ventaja',
    scene: { type: 'recta', min: 0, max: 270, ticks: [0, 90, 180, 270],
      dots: [{ v: 0, t: 'carro', c: 'a', b: 0 }, { v: 90, t: 'bus', c: 'g', b: 0 }, { v: 270, t: 'km 270', c: 'ok', b: 2 }],
      hops: [{ from: 0, to: 90, t: 'carro +90', c: 'a', b: 1 }, { from: 90, to: 150, t: 'bus +60', c: 'g', b: 1 }] },
    beats: ['Cuando el carro arranca, el bus ya lleva 90 km de ventaja.', 'Cada hora el carro avanza 90 y el bus 60: la ventaja se achica 30 km.', 'La ventaja de 90 se acaba en $90 \\div 30 = 3$ horas, en el kilómetro 270.'],
  },
  'trabajo-por-hora': {
    title: 'Se suma lo que hacen por hora',
    scene: { type: 'barra', bars: [
      { label: 'el muro completo', b: 0, segs: [{ w: 1, t: '1 muro', c: 'mute', dim: 1 }] },
      { label: 'en una hora', b: 1, segs: [{ w: 1 / 5, t: 'Ana', c: 'a' }, { w: 1 / 20, t: '', c: 'g' }, { w: 3 / 4, t: '', c: 'mute', dim: 1 }] },
      { label: 'juntos', b: 2, segs: [{ w: 1 / 4, t: '1/4 por hora', c: 'ok' }] },
    ] },
    beats: ['No se suman los tiempos: se suma lo que hace cada uno en una hora.', 'Si Ana tarda 5 horas y Beto 20, en una hora Ana pinta $\\tfrac15$ y Beto $\\tfrac{1}{20}$.', 'Juntos pintan $\\tfrac15 + \\tfrac{1}{20} = \\tfrac14$ del muro cada hora: 4 horas.'],
  },
  'deshacer-porcentaje': {
    title: 'Deshacer un porcentaje',
    scene: { type: 'pasos', lines: ['precio · 0.70 = 70', 'se deshace dividiendo', '70 ÷ 0.70 = 100'] },
    beats: ['Quitar el 30 % fue multiplicar el precio por 0.70.', 'Para volver atrás se hace la operación contraria: dividir entre el mismo factor.', 'Sumarle el 30 % al precio final no sirve: ese 30 % era de otro número.'],
  },
  'casillas-multiplican': {
    title: 'Las casillas se multiplican',
    scene: { type: 'arbol', levels: [{ n: 2, b: 0, name: '1.ª casilla' }, { n: 3, b: 1, name: '2.ª casilla' }], foot: { t: '2 · 3 = 6', b: 2 } },
    beats: ['Cada casilla abre tantas ramas como opciones tiene.', 'La casilla siguiente abre sus opciones desde cada rama.', 'Por eso las opciones de cada casilla se multiplican.'],
  },
  'complemento': {
    title: 'Al menos uno, por resta',
    scene: { type: 'barra', bars: [
      { label: 'todos los casos', b: 0, segs: [{ w: 1, t: 'todos', c: 'a' }] },
      { label: 'los que NO sirven', b: 1, segs: [{ w: .3, t: 'ninguno', c: 'bad' }, { w: .7, t: '', c: 'mute', dim: 1 }] },
      { label: 'los que sirven', b: 2, segs: [{ w: .3, t: '', c: 'mute', dim: 1 }, { w: .7, t: 'todos − ninguno', c: 'ok' }] },
    ] },
    beats: ['Contar «al menos uno» caso por caso es largo: hay muchos casos.', 'Lo contrario es un solo caso fácil: «ninguno».', 'Al menos uno = todos menos ninguno.'],
  },
  'repetidas-dividen': {
    title: 'Las letras repetidas dividen',
    scene: { type: 'pasos', lines: ['A₁ A₂  =  A₂ A₁', 'cada palabra se contó 2! veces', 'n! ÷ repeticiones'] },
    beats: ['Si las letras repetidas fueran distintas, cada palabra saldría varias veces.', 'Dos letras iguales se cambian entre sí de $2!$ maneras sin que la palabra cambie.', 'Por eso se divide $n!$ entre el factorial de cada repetición.'],
  },
  'orden-no-importa': {
    title: 'Cuando el orden no importa',
    scene: { type: 'pasos', lines: [{ t: 'A B C    A C B    B A C', s: 14 }, { t: 'B C A    C A B    C B A', s: 14 }, '6 filas  =  1 comité', 'se divide entre 3! = 6'] },
    beats: ['Con orden, un mismo grupo aparece varias veces.', 'Tres personas se pueden ordenar de $3! = 6$ maneras.', 'Las seis filas son un solo comité.', 'Sin orden: los ordenamientos se dividen entre 6.'],
  },
  'cubo-pintado': {
    title: 'El cubo pintado, por posición',
    scene: { type: 'tabla', hw: 52, cols: ['3 caras', '2 caras', '1 cara', 'ninguna'], rows: ['dónde', 'cuántos'],
      cells: [[{ t: 'esquina', b: 0 }, { t: 'arista', b: 1 }, { t: 'centro', b: 2 }, { t: 'adentro', b: 3 }], [{ t: '8', b: 0 }, { t: '24', b: 1 }, { t: '24', b: 2 }, { t: '8', b: 3 }]],
      hl: [{ r: 0, c: 0, rs: 2, col: 'a', b: 0 }, { r: 0, c: 1, rs: 2, col: 'g', b: 1 }, { r: 0, c: 2, rs: 2, col: 'f', b: 2 }, { r: 0, c: 3, rs: 2, col: 'ok', b: 3 }] },
    beats: ['Las esquinas tocan tres caras del cubo: siempre son 8.', 'En cada arista, sin contar las esquinas, quedan cubitos con dos caras pintadas.', 'En el centro de cada cara están los de una sola cara pintada.', 'Adentro queda un cubo más pequeño, sin nada de pintura.'],
  },
  'ciclo-residuo': {
    title: 'En un ciclo manda el residuo',
    scene: { type: 'ciclo', items: ['3', '9', '7', '1'], marks: [{ i: 1, b: 2, c: 'ok' }], center: { t: 'ciclo de 4', b: 1 }, foot: { t: '50 = 4 · 12 + 2', b: 2 } },
    beats: ['Las últimas cifras de $3^1, 3^2, 3^3, 3^4$ son 3, 9, 7 y 1, y se repiten.', 'El ciclo tiene 4 cifras: cada 4 potencias se vuelve al comienzo.', 'El residuo de dividir el exponente entre 4 dice el lugar: residuo 2, la segunda cifra.'],
  },
  'cesar': {
    title: 'La clave es el salto',
    scene: { type: 'pasos', lines: ['S  →  V', 'O  →  R', 'cada letra avanza 3', 'descifrar: retroceder 3'] },
    beats: ['Compara una letra con su versión cifrada.', 'Todas las letras se mueven lo mismo.', 'Ese número de puestos es la clave.', 'Para leer el mensaje, cada letra se devuelve los mismos puestos.'],
  },
  'cambio-porcentual': {
    title: 'El cambio, sobre el valor de antes',
    scene: { type: 'pasos', lines: ['cambio = después − antes', 'se compara con el de antes', '10 ÷ 100 = 10 %'] },
    beats: ['Primero se halla cuánto cambió la cantidad.', 'Ese cambio se compara siempre con el valor de antes, que es el 100 %.', 'Diez ciclistas más sobre cien que había: un aumento del 10 %.'],
  },
  'proporcion-no-cantidad': {
    title: 'Más cantidad no es más proporción',
    scene: { type: 'barra', bars: [
      { label: 'antes: 100 de 400', b: 0, segs: [{ w: .2, t: '25 %', c: 'a' }, { w: .6, t: '', c: 'mute', dim: 1 }] },
      { label: 'ahora: 110 de 500', b: 1, segs: [{ w: .22, t: '22 %', c: 'g' }, { w: .78, t: '', c: 'mute', dim: 1 }] },
      { label: 'la parte creció menos que el todo', b: 2, segs: [{ w: .25, t: '25 %', c: 'a' }, { w: .22, t: '22 %', c: 'g' }] },
    ] },
    beats: ['Antes, 100 de 400 estudiantes: la cuarta parte del colegio.', 'Ahora hay más ciclistas, pero el colegio creció más: 110 de 500.', 'La cantidad subió y la proporción bajó: son dos preguntas distintas.'],
  },
  'suponer': {
    title: 'Suponer y buscar el choque',
    scene: { type: 'pasos', lines: [{ t: 'supón: N dice la verdad', s: 14 }, { t: '→  L y M dicen la verdad', s: 14 }, { t: '→  M afirma: «N miente»', s: 14 }, 'contradicción: N miente'] },
    beats: ['Escoge a alguien y supón que dice la verdad.', 'Saca todo lo que se sigue de esa suposición.', 'Si aparece algo que choca con lo supuesto, hay una contradicción.', 'Una suposición que lleva a contradicción se descarta: era falsa.'],
  },
  'operador-receta': {
    title: 'Un operador es una receta',
    scene: { type: 'pasos', lines: [{ t: 'a ★ b = 3a − b', s: 15 }, { t: '2 ★ 1 = 3·2 − 1 = 5', s: 15 }, { t: '(2 ★ 1) ★ 4 = 5 ★ 4', s: 15 }, '5 ★ 4 = 3·5 − 4 = 11'] },
    beats: ['El operador es una receta: el triple del primero menos el segundo.', 'Se reemplaza cada letra por el número que ocupa su lugar.', 'Con paréntesis, el resultado de adentro pasa a ser el primer número.', 'Se aplica la receta otra vez con los números nuevos.'],
  },
  'fraccion-del-resto': {
    title: 'Una fracción de lo que queda',
    scene: { type: 'barra', bars: [
      { label: 'la prima completa', b: 0, segs: [{ w: 1, t: '1', c: 'a' }] },
      { label: 'gasta 1/5 del total', b: 1, segs: [{ w: 1 / 5, t: '1/5', c: 'bad', dim: 1 }, { w: 4 / 5, t: 'queda 4/5', c: 'a' }] },
      { label: 'gasta 1/2 de lo que queda', b: 2, segs: [{ w: 1 / 5, t: '', c: 'mute', dim: 1 }, { w: 2 / 5, t: '1/2 del resto', c: 'bad', dim: 1 }, { w: 2 / 5, t: '2/5', c: 'ok' }] },
    ] },
    beats: ['La barra completa es la prima.', 'El primer gasto se quita del total: quedan $\\tfrac45$.', 'El segundo gasto es una fracción de lo que queda, no del total: sobrevive $\\tfrac12$ de $\\tfrac45$, que es $\\tfrac25$.'],
  },
  'promedio-suma': {
    title: 'Todo promedio esconde una suma',
    scene: { type: 'pasos', lines: ['promedio · cantidad = suma', '3.7 · 5 = 18.5', 'falta: 18.5 − 14 = 4.5'] },
    beats: ['Todo promedio esconde una suma: el promedio por la cantidad de datos.', 'Para el promedio que se quiere, calcula la suma que hace falta.', 'El dato que falta es esa suma menos lo que ya se lleva.'],
  },
  'peor-caso': {
    title: 'Gánale a la peor suerte',
    scene: { type: 'pasos', lines: [{ t: 'peor suerte: roja, azul, verde', s: 14 }, { t: 'la siguiente repite color', s: 14 }, '3 + 1 = 4'] },
    beats: ['Imagina la peor suerte posible: cada bola sale de un color distinto.', 'Cuando ya salió una de cada color, la siguiente tiene que repetir.', 'Para estar seguros: el peor caso y una más.'],
  },
  'todo-con-una-x': {
    title: 'Todo con una sola x',
    scene: { type: 'barra', bars: [
      { label: 'Lina', b: 0, segs: [{ w: .3, t: 'x', c: 'a' }] },
      { label: 'Sara: 4 más', b: 1, segs: [{ w: .3, t: 'x', c: 'a' }, { w: .12, t: '4', c: 'g' }] },
      { label: 'Eva: el doble', b: 2, segs: [{ w: .3, t: 'x', c: 'a' }, { w: .3, t: 'x', c: 'a' }] },
    ] },
    beats: ['Elige como $x$ la cantidad de la que dependen las demás: la edad de Lina.', 'Sara tiene 4 más: su barra es $x + 4$.', 'Eva tiene el doble: $2x$. Las tres barras juntas suman 48.'],
  },
  'edades-tiempo': {
    title: 'Edades: hoy y después',
    scene: { type: 'tabla', hw: 52, cols: ['hoy', 'después'], rows: ['hijo', 'madre'],
      cells: [[{ t: 'x', b: 0 }, { t: 'x + 12', b: 1 }], [{ t: '3x', b: 0 }, { t: '3x + 12', b: 1 }]],
      hl: [{ r: 0, c: 1, rs: 2, col: 'ok', b: 2 }], foot: { t: '3x + 12 = 2(x + 12)', b: 2 } },
    beats: ['Hoy: el hijo tiene $x$ años y la madre, el triple.', 'El tiempo pasa igual para los dos: a cada edad se le suman 12.', 'La condición del futuro se escribe con las edades del futuro.'],
  },
  'mezcla-valor': {
    title: 'En una mezcla se suman valores',
    scene: { type: 'pasos', lines: ['valor = kilos · precio', { t: '12x + 8(20 − x) = 9 · 20', s: 15 }, 'se suman valores, no precios'] },
    beats: ['Cada café aporta su valor: sus kilos por su precio.', 'El valor de la mezcla es la suma de los dos valores.', 'Nunca se promedian los precios sin mirar los kilos de cada uno.'],
  },
  'eliminar': {
    title: 'Restar para eliminar',
    scene: { type: 'pasos', lines: ['3 panes + 2 jugos = 12', '1 pan + 2 jugos = 8', 'se restan: 2 panes = 4'] },
    beats: ['Dos recibos con las mismas cosas, en cantidades distintas.', 'Los dos recibos tienen la misma cantidad de jugos.', 'Al restar los recibos, los jugos desaparecen y queda una sola incógnita.'],
  },
  'venn-dos': {
    title: 'Una encuesta en dos círculos',
    scene: { type: 'venn', a: 'prensa', b: 'televisión', regs: { out: { t: '20', b: 0, c: 'mute' }, ab: { t: '15', b: 1, c: 'ok' }, a: { t: '30', b: 2 }, b: { t: '15', b: 2 } } },
    beats: ['Los 20 que no hacen nada quedan fuera de los dos círculos: adentro hay 60.', 'Las listas suman $45 + 30 = 75$. Sobran 15: están en los dos círculos.', 'Lo que queda de cada lista va en su zona de «solo»: 30 y 15.'],
  },
  'mcm-coincidir': {
    title: 'Coincidir es buscar el MCM',
    scene: { type: 'recta', min: 0, max: 24, ticks: [0, 8, 12, 16, 24],
      hops: [{ from: 0, to: 8, c: 'a', b: 0 }, { from: 8, to: 16, c: 'a', b: 0 }, { from: 16, to: 24, c: 'a', b: 0 }, { from: 0, to: 12, c: 'g', b: 1, down: true }, { from: 12, to: 24, c: 'g', b: 1, down: true }],
      dots: [{ v: 24, t: 'coinciden', c: 'ok', b: 2 }] },
    beats: ['Un faro destella cada 8 segundos: 8, 16, 24…', 'El otro, cada 12 segundos: 12, 24…', 'El primer instante que está en las dos listas es el mínimo común múltiplo: 24.'],
  },
  'contar-contrario': {
    title: 'Contar lo contrario',
    scene: { type: 'pasos', lines: [{ t: 'todos los resultados, igual de probables', s: 13 }, { t: 'si lo contrario es más corto, cuéntalo', s: 13 }, 'P = 1 − P(lo contrario)'] },
    beats: ['Primero el total de resultados, todos igual de probables.', 'A veces lo que NO sirve es una lista mucho más corta.', 'La probabilidad buscada es 1 menos la de lo contrario.'],
  },
  'no-contar-dos': {
    title: 'Con «o», no cuentes dos veces',
    scene: { type: 'venn', a: 'dobles', b: 'suma 6', regs: { a: { t: '5', b: 0 }, b: { t: '4', b: 0 }, ab: { t: '1', b: 1, c: 'ok' }, out: { t: '26', b: 2, c: 'mute' } } },
    beats: ['Con dos dados, «dobles» tiene 6 resultados y «suma 6» tiene 5.', 'El (3, 3) está en las dos listas: se cuenta una sola vez.', 'La unión tiene $6 + 5 - 1 = 10$ resultados: $P = \\tfrac{10}{36}$.'],
  },
  'arbol-multiplica': {
    title: 'En el árbol: por y más',
    scene: { type: 'arbol', levels: [{ n: 2, b: 0, labels: ['R', 'A'], name: '1.ª' }, { n: 2, b: 1, labels: ['R', 'A'], name: '2.ª' }], foot: { t: '× en el camino, + entre caminos', b: 2 } },
    beats: ['Cada extracción abre ramas, cada una con su probabilidad.', 'A lo largo de un camino, las probabilidades se multiplican.', 'Si sirven varios caminos, sus resultados se suman.'],
  },
};
if (typeof CONCEPTOS !== 'undefined') Object.assign(CONCEPTOS, CONCEPTOS_PU);

GYM_RETOS.push(
  {
    id: 'gym-transporte', after: ['pu-cm-2', 'pu-cm-3'], level: 2,
    title: 'Cómo llega el curso', strategy: 'Todo a porcentaje y después la cantidad',
    problem: 'En un curso de 40 estudiantes, $\\tfrac25$ llegan a pie, el 25 % llega en bus y el resto en bicicleta. ¿Cuántos estudiantes llegan en bicicleta?',
    steps: [
      { title: 'Pasa la fracción a porcentaje', concept: 'fraccion-a-porcentaje',
        coach: 'Los datos vienen en dos idiomas: una fracción y un porcentaje. Para juntarlos, pásalos al mismo. Pinta en la cuadrícula los que llegan a pie.',
        ex: play('cuadricula-cien', 'Pinta la parte del curso que llega a pie', { rounds: [{ ask: '2/5', count: 40 }] },
          '$\\tfrac25 = \\tfrac{40}{100}$: el 40 % del curso llega a pie.', { hint: 'La cuadrícula tiene 100 casillas: ¿cuánto vale un quinto de 100?' }),
        hints: ['Parte las 100 casillas en 5 grupos iguales: cada quinto son 20 casillas.', 'Dos quintos son dos de esos grupos: 40 casillas.'],
        note: 'A pie: 2/5 = 40 %' },
      { title: 'Halla el resto del 100 %', concept: 'lo-que-queda-de-cien',
        coach: 'Ahora todo está en porcentaje. El curso completo es el 100 %: quita lo que ya conoces y lo que queda es la bicicleta.',
        ex: play('estira-barra', 'Deja en la barra solo la parte de la bicicleta', { max: 200, rounds: [{ base: 100, text: 'Lo que queda del 100 % al quitar 40 % y 25 %', pct: 35 }] },
          '$100 - 40 - 25 = 35$: el 35 % llega en bicicleta.', { hint: 'Suma primero lo que ya conoces y quítalo del 100 %.' }),
        hints: ['A pie y en bus suman 40 % + 25 %. ¿Cuánto falta para el 100 %?', 'Juntos son el 65 %. Encoge la barra hasta el 35 %.'],
        note: 'Bicicleta: 100 % − 40 % − 25 % = 35 %' },
      { title: 'Del porcentaje a la cantidad', concept: 'porcentaje-por-pedazos',
        coach: 'Falta lo que pregunta el problema: cuántos estudiantes. Arma el 35 % con pedazos fáciles: el 10 % y su mitad.',
        ex: play('pinta-personas', 'Pinta a los que llegan en bicicleta', { rounds: [{ total: 40, pct: 35, what: 'llegan en bicicleta' }] },
          'El 10 % de 40 es 4; el 30 % son 12 y el 5 % son 2. En total, 14.', { hint: 'Halla el 10 % del curso y arma con él el 35 %.' }),
        hints: ['El 10 % de 40 es 4 estudiantes. ¿Cuántos son el 30 %? ¿Y el 5 %?', 'El 30 % son 12 y el 5 % son 2: pinta 14.'],
        note: '35 % de 40: 12 + 2 = 14 estudiantes' },
    ],
    answer: 'Llegan en bicicleta 14 estudiantes.',
    wrap: 'Cuando un problema mezcla fracciones y porcentajes, pásalos todos a porcentaje, halla el que falta como el resto del 100 % y solo al final conviértelo en cantidad.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-jardin', after: ['pu-ge-4', 'pu-ge-5'], level: 2,
    title: 'El pasto del jardín', strategy: 'El todo menos lo de adentro',
    problem: 'Un jardín cuadrado de 12 m de lado tiene en el centro una fuente circular de 4 m de radio. En el resto se siembra pasto, que cuesta 5 000 pesos por metro cuadrado. Con $\\pi \\approx 3$, ¿cuánto cuesta sembrar el pasto?',
    steps: [
      { title: 'Lo grande menos lo de adentro', concept: 'area-por-resta',
        coach: 'El pasto no tiene una fórmula propia: es el cuadrado completo menos el círculo de la fuente. Arma esa resta en la figura.',
        ex: play('sombreado-resta', 'Halla el área del pasto', { rounds: [{ s: 12, kind: 'circ', target: [144, 16] }] },
          'El cuadrado mide $12 \\cdot 12 = 144$ y la fuente $\\pi \\cdot 4^2 = 16\\pi$: el pasto ocupa $144 - 16\\pi$ m².', { hint: 'Los dos datos que necesitas son el lado del jardín y el radio de la fuente.' }),
        hints: ['El área del cuadrado es lado por lado. La de la fuente es $\\pi$ por el radio al cuadrado.', 'Cuadrado: $12 \\cdot 12$. Fuente: $\\pi \\cdot 4^2$. Lo sombreado es la resta.'],
        note: 'Pasto: cuadrado menos fuente, 144 − 16π m²' },
      { title: 'Pasa a números y cobra',
        coach: 'Ya tienes el área con $\\pi$. Ahora reemplaza $\\pi$ por el valor que da el problema y multiplica por el precio de cada metro cuadrado.',
        ex: play('completa-solucion', 'Completa la cuenta del pasto', { q: 'El pasto ocupa $144 - 16\\pi$ m² y cada metro cuadrado cuesta 5 000 pesos. Con $\\pi \\approx 3$, ¿cuánto cuesta sembrarlo?',
          lines: ['La fuente mide $16 \\cdot 3 =$ [[48]] m²', 'El pasto ocupa $144 - 48 =$ [[96]] m²', 'Costo: $96 \\cdot 5\\,000 =$ [[480 000]] pesos'], extra: ['720 000', '192', '240 000'] },
          'Con $\\pi \\approx 3$ la fuente mide 48 m² y el pasto 96 m². A 5 000 pesos el metro, cuesta 480 000 pesos.', { hint: 'Primero el área de la fuente en números, después la resta y al final el precio.' }),
        hints: ['Reemplaza $\\pi$ por 3 solo en la parte de la fuente y después resta.', 'La fuente son 48 m². Resta eso del jardín completo y multiplica por el precio.'],
        note: 'Costo: 96 · 5 000 = 480 000 pesos' },
    ],
    answer: 'Sembrar el pasto cuesta 480 000 pesos.',
    wrap: 'Cuando una región no tiene fórmula propia, búscala como una resta: la figura grande menos lo que se le quita. Deja $\\pi$ como letra hasta el final y reemplázala una sola vez.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-podio', after: ['pu-or-1', 'pu-or-4'], level: 2,
    title: 'La carrera sin empates', strategy: 'Dato fijo, pareja pegada y descarte',
    problem: 'Dario, Elena, Felipe, Gloria y Hernán corrieron una carrera sin empates. Felipe llegó tercero. Hernán llegó justo después de Gloria. Elena llegó antes que Dario. Hernán no fue el último. ¿Quién ganó la carrera y quién llegó de último?',
    steps: [
      { title: 'Ubica el dato fijo y la pareja', concept: 'orden-ancla',
        coach: 'No pruebes todos los órdenes: son demasiados. Empieza por quien tiene puesto seguro y mira en qué casillas cabe la pareja que llegó seguida.',
        ex: play('completa-solucion', 'Completa el razonamiento', { q: 'Felipe llegó tercero, Hernán llegó justo después de Gloria y Hernán no fue el último. ¿Qué puestos ocupan Gloria y Hernán?',
          lines: ['Felipe ocupa el puesto [[3]]: quedan libres 1, 2, 4 y 5', 'Gloria y Hernán van seguidos: caben en 1 y 2, o en 4 y [[5]]', 'Como Hernán no fue el último, Gloria y Hernán ocupan los puestos 1 y [[2]]'], extra: ['4', '6'] },
          'Con Felipe en el centro, una pareja seguida solo cabe adelante o atrás. Atrás, Hernán sería el último: van adelante.', { hint: 'Dibuja cinco casillas y marca primero la de Felipe.' }),
        hints: ['Con el centro ocupado, dos puestos seguidos solo quedan al comienzo o al final de la fila.', 'Si la pareja fuera al final, Hernán llegaría de último, y eso no puede ser.'],
        note: 'Felipe en el centro; Gloria y Hernán seguidos y adelante' },
      { title: 'Acomoda a todos',
        coach: 'Con la pareja adelante quedan dos casillas atrás para dos personas. La pista que falta dice quién va primero de esas dos.',
        ex: play('carrera-llegada', 'Arma el orden de llegada', { rounds: [{ names: ['Dario', 'Elena', 'Felipe', 'Gloria', 'Hernán'], clues: [
          { t: 'at', a: 'Felipe', i: 2, say: 'Felipe llegó tercero' }, { t: 'justBefore', a: 'Gloria', b: 'Hernán', say: 'Hernán llegó justo después de Gloria' },
          { t: 'before', a: 'Elena', b: 'Dario', say: 'Elena llegó antes que Dario' }, { t: 'notAt', a: 'Hernán', i: 4, say: 'Hernán no fue el último' }] }] },
          'Gloria, Hernán, Felipe, Elena y Dario: cada pista se cumple y no hay otro orden posible.', { hint: 'Pon primero a Felipe y a la pareja; después usa la pista de Elena y Dario.' }),
        hints: ['Atrás quedan dos puestos para Elena y Dario. ¿Cuál de los dos llegó antes?', 'Elena va antes que Dario: ella es cuarta y él quinto.'],
        note: 'Orden de llegada: Gloria, Hernán, Felipe, Elena, Dario' },
    ],
    answer: 'Ganó Gloria y Dario llegó de último.',
    wrap: 'En un acertijo de orden: primero el dato que fija un puesto, después las parejas que van pegadas (ocupan dos casillas seguidas) y al final las pistas negativas, que descartan. Así casi nunca hay que probar todos los casos.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-cubo', after: ['pu-es-2'], level: 2,
    title: 'El cubo pintado de rojo', strategy: 'Clasificar por posición y comprobar con el total',
    problem: 'Un cubo de madera de 4 cm de arista se pinta de rojo por fuera y luego se corta en cubitos de 1 cm de arista. ¿Cuántos cubitos tienen pintura en exactamente dos caras? ¿Cuántos no tienen pintura?',
    steps: [
      { title: 'Clasifica por posición', concept: 'cubo-pintado',
        coach: 'No cuentes cubito por cubito. Cada cubito queda en una de cuatro posiciones: esquina, arista, centro de cara o interior. La posición dice cuántas caras pintadas tiene.',
        ex: play('cubo-pintado', 'Clasifica los cubitos del cubo de 4', { rounds: [{ n: 4 }] },
          'Las aristas (sin las esquinas) dan los de dos caras: $12 \\cdot 2 = 24$. Adentro queda un cubo de arista 2: $2^3 = 8$ sin pintura.', { hint: 'Fíjate en dónde está el cubito: de eso depende cuántas caras le quedaron pintadas.' }),
        hints: ['Un cubito de esquina toca tres caras del cubo grande; uno de arista, dos; uno del centro de una cara, una sola.', 'Cada arista tiene 4 cubitos: quita los 2 de las esquinas. Adentro, la arista se acorta 2 cm.'],
        note: 'Dos caras: los 24 de las aristas. Sin pintura: los del cubo de adentro, 8' },
      { title: 'Comprueba con el total',
        coach: 'Un buen cierre: sumar todas las clases y ver que dan el total de cubitos. Si no cuadra, alguna clase quedó mal contada.',
        ex: play('completa-solucion', 'Completa la comprobación', { q: 'El cubo de 4 cm se cortó en cubitos de 1 cm. Cuenta cada clase de cubito y comprueba que entre todas completan el cubo.',
          lines: ['Esquinas, con 3 caras pintadas: [[8]]', 'Aristas sin esquinas, con 2 caras: $12 \\cdot 2 =$ [[24]]', 'Centros de las caras, con 1 cara: $6 \\cdot 4 =$ [[24]]', 'Adentro, sin pintura: $2^3 =$ [[8]]. Entre todos suman [[64]], que es $4^3$'], extra: ['12', '16', '27'] },
          '$8 + 24 + 24 + 8 = 64 = 4^3$: no sobra ni falta ningún cubito.', { hint: 'Usa los números del cubo: cuántas esquinas, cuántas aristas y cuántas caras tiene.' }),
        hints: ['Un cubo tiene 8 esquinas, 12 aristas y 6 caras. En cada arista, quita los dos cubitos de las esquinas.', 'En cada cara, los de una sola cara pintada forman un cuadrado de $2 \\times 2$.'],
        note: 'Comprobación: 8 + 24 + 24 + 8 = 64 cubitos' },
    ],
    answer: 'Hay 24 cubitos con dos caras pintadas y 8 sin pintura.',
    wrap: 'En los problemas de cubos pintados no se cuenta de a uno: se clasifica por posición (esquinas, aristas, centros de cara e interior) y se comprueba que las clases sumen el total, $n^3$.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-potencias', after: ['pu-se-3'], level: 3,
    title: 'La última cifra de una suma enorme', strategy: 'Buscar el ciclo y usar el residuo',
    problem: '¿En qué cifra termina el número $3^{50} + 7^{50}$?',
    steps: [
      { title: 'El ciclo del 3', concept: 'ciclo-residuo',
        coach: 'Nadie calcula ese número: es enorme. Pero sus últimas cifras se repiten en un ciclo corto. Encuentra el ciclo y mira en qué lugar cae el exponente.',
        ex: play('ultima-cifra', 'Halla la última cifra de la primera potencia', { rounds: [{ a: 3, n: 50 }] },
          'Las últimas cifras del 3 son 3, 9, 7, 1. Como $50 = 4 \\cdot 12 + 2$, es la segunda del ciclo: 9.', { hint: 'Divide el exponente entre el largo del ciclo: el residuo dice el lugar.' }),
        hints: ['Escribe las últimas cifras de las primeras potencias hasta que alguna se repita.', 'El ciclo es 3, 9, 7, 1. Divide 50 entre 4 y mira el residuo.'],
        note: 'Última cifra de 3⁵⁰ = 9' },
      { title: 'El ciclo del 7',
        coach: 'Repite la idea con la otra base: su ciclo tiene otras cifras, pero el mismo largo.',
        ex: play('ultima-cifra', 'Halla la última cifra de la segunda potencia', { rounds: [{ a: 7, n: 50 }] },
          'Las últimas cifras del 7 son 7, 9, 3, 1. Con residuo 2 es la segunda: 9.', { hint: 'Busca el ciclo de las últimas cifras del 7.' }),
        hints: ['El ciclo del 7 también tiene cuatro cifras. Halla el residuo del exponente al dividirlo entre el largo del ciclo.', 'El ciclo es 7, 9, 3, 1 y el residuo es el mismo de antes.'],
        note: 'Última cifra de 7⁵⁰ = 9' },
      { title: 'Suma solo las unidades',
        coach: 'La última cifra de una suma depende solo de las últimas cifras de los sumandos. Súmalas y quédate con las unidades.',
        ex: play('completa-solucion', 'Completa el cierre', { q: 'El número $3^{50}$ termina en 9 y el número $7^{50}$ también termina en 9. ¿En qué cifra termina su suma?',
          lines: ['Las unidades de los sumandos son [[9]] y [[9]]', 'Esas unidades suman [[18]]', 'La suma termina en [[8]]: la decena que sobra no cambia las unidades'], extra: ['6', '0', '81'] },
          '$9 + 9 = 18$: la suma termina en 8.', { hint: 'Suma las dos últimas cifras y mira en qué termina el resultado.' }),
        hints: ['Para saber en qué termina una suma basta sumar las unidades de cada número.', 'Las dos unidades son iguales. Súmalas y mira solo la cifra final.'],
        note: 'Unidades: 9 + 9 = 18, la suma termina en 8' },
    ],
    answer: 'El número termina en 8.',
    wrap: 'Las últimas cifras de las potencias se repiten en ciclos cortos. Con potencias enormes: halla el ciclo, divide el exponente entre su largo y usa el residuo. En sumas y productos solo cuentan las unidades.',
  },
  {
    id: 'gym-mensaje', after: ['pu-cd-1', 'pu-cd-2'], level: 2,
    title: 'El mensaje interceptado', strategy: 'Sacar la clave de un ejemplo y deshacerla',
    problem: 'Se interceptó un mensaje cifrado que dice FDVD. Se sabe que, con la misma clave, la palabra SOL se escribe VRO. ¿Qué dice el mensaje?',
    steps: [
      { title: 'Descubre la clave con el ejemplo', concept: 'cesar',
        coach: 'Un ejemplo resuelto es la llave: compara letra por letra la palabra y su versión cifrada y mira cuántos puestos se movió cada una.',
        ex: play('completa-solucion', 'Completa el razonamiento', { q: 'Con cierta clave, la palabra SOL se escribe VRO. ¿Cuál es la clave y cómo se descifra un mensaje?',
          lines: ['De la S a la V se avanza [[3]] letras; de la O a la R, lo mismo', 'Para descifrar se hace lo contrario: se [[retrocede]] esa cantidad', 'La F del mensaje viene de la [[C]]'], extra: ['avanza', '4', 'I'] },
          'S, T, U, V: tres puestos. Todas las letras se movieron igual, así que descifrar es retroceder tres.', { hint: 'Compara la primera letra de la palabra con la primera de su cifrado.' }),
        hints: ['Cuenta en el alfabeto los puestos que hay de la S a la V.', 'Son tres puestos hacia adelante. Para leer el mensaje hay que ir hacia atrás.'],
        note: 'Clave: cada letra avanzó tres puestos; para leer, se retrocede' },
      { title: 'Descifra el mensaje',
        coach: 'Con la clave en la mano, pon la rueda en la posición que deshace el salto y lee letra por letra.',
        ex: play('rueda-cesar', 'Gira la rueda y descifra', { rounds: [{ pair: ['SOL', 'VRO'], msg: 'FDVD' }] },
          'Retrocediendo tres puestos: F → C, D → A, V → S, D → A. El mensaje dice CASA.', { hint: 'Usa el ejemplo para ubicar la rueda y después lee el mensaje.' }),
        hints: ['Alinea la rueda para que la S quede frente a la V, como en el ejemplo.', 'Cada letra del mensaje se devuelve tres puestos: la F pasa a C.'],
        note: 'FDVD se descifra como CASA' },
    ],
    answer: 'El mensaje dice CASA.',
    wrap: 'En los problemas de códigos, la regla se saca de un ejemplo resuelto, se comprueba con todas sus letras y después se aplica al revés para descifrar.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-ciclistas', after: ['pu-gr-1', 'pu-gr-3'], level: 2,
    title: 'El anuncio del rector', strategy: 'Separar cantidad y proporción',
    problem: 'Un colegio pasó de 400 a 500 estudiantes, y los que llegan en bicicleta pasaron de 100 a 110. El rector anuncia: «cada vez más estudiantes prefieren la bicicleta». ¿En qué porcentaje aumentó el número de ciclistas? ¿Aumentó también su proporción en el colegio?',
    steps: [
      { title: 'Mide el cambio de la cantidad', concept: 'cambio-porcentual',
        coach: 'Primero mira la cantidad: cuántos ciclistas había y cuántos hay. El cambio se mide comparándolo con el valor de antes.',
        ex: play('variacion-barras', 'Halla la variación de los ciclistas', { rounds: [{ from: 100, to: 110, what: 'Ciclistas' }] },
          'Hay 10 ciclistas más sobre los 100 de antes: un aumento del 10 %.', { hint: 'Divide lo que cambió entre el valor de antes.' }),
        hints: ['El aumento son los ciclistas nuevos. Compáralos con los que había al comienzo, no con los de ahora.', 'Los ciclistas nuevos son la décima parte de los que había.'],
        note: 'Ciclistas: de 100 a 110, un aumento del 10 %' },
      { title: 'Compara las proporciones', concept: 'proporcion-no-cantidad',
        coach: 'Ahora mira la proporción: qué parte del colegio va en bicicleta antes y ahora. Si el total crece más rápido que la parte, la proporción baja.',
        ex: play('tabla-doble', 'Compara la proporción de antes con la de ahora', { rounds: [{ rows: [['antes', 100, 400], ['ahora', 110, 500]], what: 'llega en bicicleta' }] },
          'Antes: $100 \\div 400 = 25\\,\\%$. Ahora: $110 \\div 500 = 22\\,\\%$. La proporción bajó.', { hint: 'Compara las dos filas en porcentaje, no en cantidad.' }),
        hints: ['En cada fila, divide los ciclistas entre el total de estudiantes de ese momento.', 'Antes eran la cuarta parte del colegio. Ahora, 110 de 500 es un poco menos.'],
        note: 'Proporción de ciclistas: bajó (del 25 % al 22 %)' },
    ],
    answer: 'Los ciclistas aumentaron un 10 %, pero su proporción bajó del 25 % al 22 %.',
    wrap: 'Ante una afirmación sobre datos, separa dos preguntas: ¿cambió la cantidad? y ¿cambió la proporción? Cuando el total también cambia, las dos respuestas pueden ir en sentidos contrarios.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-testigos', after: ['pu-lo-5'], level: 3,
    title: 'Los tres testigos', strategy: 'Suponer y buscar la contradicción',
    problem: 'Tres testigos declaran. Lucas dice: «Mateo miente». Mateo dice: «Nadia miente». Nadia dice: «Lucas y Mateo dicen la verdad». ¿Quién dice la verdad y quién miente?',
    steps: [
      { title: 'Supón y busca el choque', concept: 'suponer',
        coach: 'No adivines. Escoge a la persona cuya frase dice más cosas, supón que dice la verdad y mira si todo encaja o si algo choca.',
        ex: play('completa-solucion', 'Completa el razonamiento', { q: 'Lucas dice: «Mateo miente». Mateo dice: «Nadia miente». Nadia dice: «Lucas y Mateo dicen la verdad». Supón que Nadia dice la verdad. ¿Qué pasa?',
          lines: ['Si Nadia dice la verdad, entonces Lucas y Mateo [[dicen la verdad]]', 'Pero Mateo afirma que Nadia [[miente]]: eso choca con lo que se supuso', 'Hay una [[contradicción]]: la suposición era falsa y Nadia miente'], extra: ['mienten', 'coincidencia'] },
          'Suponer que Nadia dice la verdad obliga a creerle a Mateo, y Mateo dice que Nadia miente. Las dos cosas no pueden pasar a la vez.', { hint: 'Si Nadia dice la verdad, su frase es cierta: ¿qué dice su frase sobre los otros dos?' }),
        hints: ['La frase de Nadia habla de Lucas y de Mateo. Si es cierta, ¿qué pasa con lo que dice Mateo?', 'Mateo estaría diciendo la verdad, y Mateo afirma que Nadia miente.'],
        note: 'Suponer que Nadia dice la verdad lleva a una contradicción: Nadia miente' },
      { title: 'Encadena lo que queda',
        coach: 'Ya hay un dato firme. Úsalo para revisar la frase de quien habló de esa persona, y después la del que falta.',
        ex: play('quien-miente', 'Marca quién miente y quién dice la verdad', { rounds: [{ people: [
          { name: 'Lucas', say: 'Mateo miente', f: t => !t[1] }, { name: 'Mateo', say: 'Nadia miente', f: t => !t[2] }, { name: 'Nadia', say: 'Lucas y Mateo dicen la verdad', f: t => t[0] && t[1] }] }] },
          'Nadia miente, así que Mateo (que lo afirma) dice la verdad. Y Lucas, que acusa a Mateo de mentir, miente.', { hint: 'Empieza por quien habló de la persona que ya sabes que miente.' }),
        hints: ['Mateo afirma algo que ya comprobaste. ¿Dice la verdad?', 'Mateo dice la verdad. Lucas afirma lo contrario de eso.'],
        note: 'Nadia miente, Mateo dice la verdad y Lucas miente' },
    ],
    answer: 'Solo Mateo dice la verdad; Lucas y Nadia mienten.',
    wrap: 'En los problemas de verdad y mentira: supón que alguien dice la verdad, saca las consecuencias y busca un choque. Si lo hay, esa persona miente, y ese dato firme destraba a los demás.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-operador', after: ['pu-op-1', 'pu-op-2'], level: 2,
    title: 'El operador estrella', strategy: 'Reemplazar con la receta, de adentro hacia afuera',
    problem: 'En los números enteros se define la operación $a \\star b = 3a - b$. Calcula $(2 \\star 1) \\star 4$ y halla el valor de $x$ para el cual $x \\star 5 = 16$.',
    steps: [
      { title: 'Resuelve el anidado', concept: 'operador-receta',
        coach: 'Un operador nuevo es una receta: dice qué hacer con el primer número y qué con el segundo. Cuando hay paréntesis, se resuelve primero lo de adentro y su resultado ocupa ese lugar.',
        ex: play('anida-operador', 'Calcula de adentro hacia afuera', { rounds: [{ sym: '\\star', tex: '3a - b', f: (a, b) => 3 * a - b, expr: [[2, 1], 4] }] },
          '$2 \\star 1 = 6 - 1 = 5$ y luego $5 \\star 4 = 15 - 4 = 11$.', { hint: 'Empieza por el paréntesis y usa su resultado como primer número.' }),
        hints: ['Resuelve primero el paréntesis con la receta: el triple del primero menos el segundo.', 'El paréntesis vale 5. Ahora aplica la receta con 5 de primero y 4 de segundo.'],
        note: 'Anidado: (2 ★ 1) ★ 4 = 5 ★ 4 = 11' },
      { title: 'Despeja la x del operador',
        coach: 'Ahora la incógnita está dentro del operador. Reemplaza con la receta, como si la x fuera un número, y te queda una ecuación corriente.',
        ex: play('busca-x-operador', 'Halla la x', { rounds: [{ sym: '\\star', tex: '3a - b', f: (a, b) => 3 * a - b, k: 5, side: 'left', target: 16, lo: -5, hi: 10 }] },
          'Al reemplazar queda $3x - 5 = 16$: $3x = 21$ y $x = 7$.', { hint: 'Escribe la receta con la x en el primer lugar y despeja.' }),
        hints: ['La x ocupa el primer lugar: la receta le pide su triple. El 5 ocupa el segundo.', 'La ecuación es $3x - 5 = 16$. Suma 5 a los dos lados y divide entre 3.'],
        note: 'Ecuación: 3x − 5 = 16, así que x = 7' },
    ],
    answer: 'El anidado vale 11, y la ecuación se cumple con x = 7.',
    wrap: 'Con un operador definido no hay nada que memorizar: se reemplaza cada letra por lo que ocupa su lugar. Los paréntesis van primero, y una incógnita dentro del operador se convierte en una ecuación corriente.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-noticias', after: ['pu-cj-1', 'pu-cj-2'], level: 2,
    title: 'La encuesta de las noticias', strategy: 'Quitar a los de afuera y buscar lo que sobra',
    problem: 'En una encuesta a 80 personas, 45 leen prensa digital, 30 ven noticieros de televisión y 20 no hacen ninguna de las dos cosas. ¿Cuántas personas hacen las dos? ¿Cuántas solo leen prensa digital?',
    steps: [
      { title: 'Halla la intersección', concept: 'venn-dos',
        coach: 'Empieza por quitar a los que no hacen nada: los demás están en al menos una de las dos listas. Si al sumar las dos listas sobra gente, los que sobran se contaron dos veces.',
        ex: play('solapa-barras', 'Solapa las barras hasta que todo cuadre', { rounds: [{ labels: ['prensa digital', 'televisión'], total: 80, a: 45, b: 30, none: 20 }] },
          'Hacen algo $80 - 20 = 60$ personas. Las listas suman 75: sobran 15, que están en las dos.', { hint: 'Compara la suma de las dos listas con los que hacen al menos una cosa.' }),
        hints: ['Resta del total a los que no hacen ninguna: esa es la unión.', 'La unión tiene 60 personas y las dos listas juntas suman 75.'],
        note: 'Los dos: 45 + 30 − 60 = 15' },
      { title: 'Llena las zonas y comprueba',
        coach: 'Con la intersección en la mano, llena el diagrama de adentro hacia afuera y comprueba que todas las zonas juntas dan el total de encuestados.',
        ex: play('completa-solucion', 'Completa el diagrama', { q: 'De 80 encuestados, 45 leen prensa digital, 30 ven noticieros de televisión, 15 hacen las dos cosas y 20 no hacen ninguna. Llena las zonas del diagrama.',
          lines: ['Solo prensa digital: $45 - 15 =$ [[30]]', 'Solo televisión: $30 - 15 =$ [[15]]', 'Las cuatro zonas suman $30 + 15 + 15 + 20 =$ [[80]]: cuadra con el total'], extra: ['45', '60', '75'] },
          'A cada lista se le quitan los que están en las dos. Las zonas (30, 15, 15 y 20) completan los 80 encuestados.', { hint: 'Empieza por el centro del diagrama y resta.' }),
        hints: ['A cada lista quítale los que están en las dos.', 'Solo prensa son 30. Haz lo mismo con la otra lista y suma las cuatro zonas.'],
        note: 'Zonas: 30 solo prensa, 15 los dos, 15 solo televisión y 20 ninguna = 80' },
    ],
    answer: 'Hacen las dos cosas 15 personas, y 30 solo leen prensa digital.',
    wrap: 'En una encuesta de dos listas: quita a los que no están en ninguna, compara la suma de las listas con lo que queda (el exceso es la intersección) y llena el diagrama del centro hacia afuera. Al final, las zonas deben sumar el total.',
  },
);

GYM_RETOS.push(
  {
    id: 'gym-faros', after: ['pu-nu-2'], level: 2,
    title: 'Los dos faros', strategy: 'Coincidir es un múltiplo común',
    problem: 'Dos faros destellan juntos a medianoche. El faro norte destella cada 8 segundos y el faro sur cada 12 segundos. ¿Cada cuánto tiempo vuelven a destellar juntos? ¿Cuántas veces coinciden en los 2 minutos siguientes, sin contar el instante inicial?',
    steps: [
      { title: 'Busca el primer instante común', concept: 'mcm-coincidir',
        coach: 'Cada faro destella en los múltiplos de su tiempo. Coinciden cuando un instante es múltiplo de los dos a la vez: busca el primero.',
        ex: play('ritmos-mcm', 'Avanza hasta que los dos destellen juntos', { rounds: [{ a: 8, b: 12, max: 30, labels: ['faro norte', 'faro sur'] }] },
          'Múltiplos de 8: 8, 16, 24. Múltiplos de 12: 12, 24. El primero que comparten es 24.', { hint: 'Avanza el tiempo hasta que los dos destellos caigan en el mismo instante.' }),
        hints: ['Escribe los primeros múltiplos de cada número y busca el primero que aparece en las dos listas.', 'El faro sur destella a los 12 segundos y otra vez 12 después. ¿Ese instante es múltiplo de 8?'],
        note: 'Coinciden cada MCM(8, 12) = 24 segundos' },
      { title: 'Cuenta las coincidencias',
        coach: 'Ya sabes cada cuánto coinciden. Pasa el tiempo total a segundos y cuenta cuántos de esos tramos caben.',
        ex: play('completa-solucion', 'Completa la cuenta', { q: 'Los dos faros coinciden cada 24 segundos. ¿Cuántas veces coinciden en los 2 minutos siguientes, sin contar el instante inicial? ¿Cuántas veces destella el faro norte en ese tiempo?',
          lines: ['Dos minutos son [[120]] segundos', 'Coinciden una vez cada 24 segundos: $120 \\div 24 =$ [[5]] veces', 'En ese tiempo, el faro norte destella $120 \\div 8 =$ [[15]] veces'], extra: ['6', '10', '96'] },
          '$120 \\div 24 = 5$ coincidencias, la última justo al cumplirse los dos minutos.', { hint: 'Todo en la misma unidad: segundos.' }),
        hints: ['Convierte los minutos a segundos antes de dividir.', 'Son 120 segundos. Divide entre el tiempo que pasa de una coincidencia a la siguiente.'],
        note: 'En 2 minutos: 120 ÷ 24 = 5 coincidencias' },
    ],
    answer: 'Destellan juntos cada 24 segundos y coinciden 5 veces en los 2 minutos siguientes.',
    wrap: 'Cuando dos cosas se repiten con ritmos distintos, coinciden en los múltiplos comunes, y la primera vez es el mínimo común múltiplo. Si el problema pide partir sin que sobre, lo que se busca es el máximo común divisor.',
  },
);

// Concepto de cada paso de los retos que ya existían: { reto: [concepto del paso 1, del paso 2, …] } (null = sin concepto).
const GYM_CONCEPT_DE = {
  'gym-concreto': ['razon-en-partes', 'aumento-como-factor', null],
  'gym-obra': [null, 'inversa-constante'],
  'gym-bus': [null, 'alcance', null],
  'gym-muro': ['trabajo-por-hora', null, null],
  'gym-tele': [null, 'cambios-en-cadena', null],
  'gym-chaqueta': ['deshacer-porcentaje', null],
  'gym-claves': ['casillas-multiplican', 'complemento'],
  'gym-papaya': [null, 'repetidas-dividen', null],
  'gym-comite': [null, 'orden-no-importa', null],
  'gym-prima': ['fraccion-del-resto', null, null],
  'gym-examen': [null, 'promedio-suma'],
  'gym-peor': ['peor-caso', null],
  'gym-hermanas': ['todo-con-una-x', null],
  'gym-madre': ['edades-tiempo', null],
  'gym-cafe': ['mezcla-valor', null],
  'gym-recibos': ['eliminar', null, null],
  'gym-dados': ['contar-contrario', 'no-contar-dos'],
  'gym-urna': [null, 'arbol-multiplica'],
  'gym-adivina': ['contar-contrario', 'arbol-multiplica'],
  // (los mundos siguientes añaden aquí)
};
for (const r of GYM_RETOS) (GYM_CONCEPT_DE[r.id] || []).forEach((c, i) => { if (c && r.steps[i]) r.steps[i].concept = c; });
;
//#archivo js/gimnasio-escenas.js
// Gimnasio de Razonamiento lógico del Preuniversitario con los ejercicios dibujados de las lecciones (spec
// 2026-11-25-gimnasio-escenas, pruebas tests/gimnasio-escenas.test.js): dos retos por mundo, con otros números. Va después de
// gimnasio-razonamiento.js: los retos viejos dejan de abrirse en el Preuniversitario (los que también son de Álgebra siguen allá).
{
  if (typeof CONCEPTOS !== 'undefined') {
    CONCEPTOS['lados-al-cuadrado'] = { title: 'Los lados al cuadrado', scene: { type: 'barra', bars: [{ label: 'el lado largo al cuadrado', b: 0, segs: [{ w: 1, t: 'h²', c: 'a' }] }, { label: 'los dos cortos al cuadrado', b: 1, segs: [{ w: .36, t: 'a²', c: 'g' }, { w: .64, t: 'b²', c: 'g' }] }, { label: 'si falta uno corto', b: 2, segs: [{ w: .36, t: 'a²', c: 'mute', dim: 1 }, { w: .64, t: 'h² − a²', c: 'ok' }] }] }, beats: ['En un triángulo rectángulo, el lado largo es la hipotenusa.', 'Su cuadrado vale lo mismo que los dos cuadrados cortos juntos.', 'Si falta un lado corto, se resta y se saca la raíz.'] };
    CONCEPTOS['primero-y-saltos'] = { title: 'Primero más los saltos', scene: { type: 'barra', bars: [{ label: 'el primero', b: 0, segs: [{ w: .2, t: '1.º', c: 'a' }] }, { label: 'cada salto suma lo mismo', b: 1, segs: [{ w: .2, t: '1.º', c: 'a' }, { w: .2, t: '+ d', c: 'g' }, { w: .2, t: '+ d', c: 'g' }, { w: .2, t: '+ d', c: 'g' }] }, { label: 'un salto menos que términos', b: 2, segs: [{ w: .2, t: '1.º', c: 'mute', dim: 1 }, { w: .6, t: 'saltos · d', c: 'ok' }] }] }, beats: ['Se empieza en el primer término.', 'De cada término al siguiente se suma siempre lo mismo.', 'Para llegar al término n hay n − 1 saltos.'] };
  }
  for (const r of GYM_RETOS) r.after = r.after.filter(id => !/^pu-/.test(id));
  for (let i = GYM_RETOS.length - 1; i >= 0; i--) if (!GYM_RETOS[i].after.length) GYM_RETOS.splice(i, 1);

  // Un paso: [título, entrenador, juego, enunciado, datos, explicación, [ayuda, ayuda], nota]. Los de fichas sin avisos propios
  // mandan a la ayuda del entrenador.
  const paso = ([title, coach, game, q, params, explain, hints, note], concept) => {
    if (params.metas && !params.mira) params = { ...params, mira: params.metas.map(() => 'Esta parte no cuadra: vuelve a lo que dice el entrenador.'), trampas: params.trampas || {}, ok: params.ok || explain.replace(/\$/g, '') };
    return { title, coach, ...(concept ? { concept } : {}), ex: play(game, q, params, explain, { hint: hints[0] }), hints, note };
  };
  const reto = (id, after, level, title, strategy, problem, concept, steps, answer, wrap) => GYM_RETOS.push({ id: `gym-z-${id}`, after, level, title, strategy, problem, steps: steps.map((s, i) => paso(s, i === 0 ? concept : null)), answer, wrap });

  // ---------------------------------------------------------------------------------------------------- cálculo mental
  reto('curso', ['pu-cm-2', 'pu-cm-3'], 2, 'Cómo llega el curso', 'Cada porcentaje, con su todo',
    'De 40 estudiantes, el 30 % llega en bus. De los que quedan, 14 llegan a pie. ¿Qué porcentaje de los que no van en bus camina?', 'fraccion-a-porcentaje', [
      ['Los del bus', 'El todo son los 40 estudiantes. Píntalos en la cuadrícula: el 10 % es una parte fácil de ver.', 'rejilla-otra', 'Pinta el **30 %** de las 40 sillas.', { cols: 8, filas: 5, pct: 30 }, 'El 10 % de 40 son 4; el 30 %, $3 \\cdot 4 = 12$.', ['El 10 % de 40 son cuatro estudiantes.', 'Tres veces ese 10 %.'], 'En bus: 30 % de 40 = 12; quedan 40 − 12 = 28'],
      ['Los que caminan', 'El todo cambió: ahora son los que no van en bus. Compara los que caminan con ese grupo.', 'que-porcentaje', 'De 28 que no van en bus, **14** caminan. ¿Qué porcentaje es?', { parte: 14, todo: 28 }, 'Catorce de 28 es la mitad: 50 %.', ['Piensa qué fracción de 28 son los que caminan.', 'Es justo la mitad.'], 'Caminan 14 de 28 = 50 %']],
    'Camina el 50 % de los que no van en bus.', 'Antes de calcular un porcentaje, di de qué grupo es. Cuando el grupo cambia, el mismo número de personas es otro porcentaje.');
  reto('cadena', ['pu-cm-3', 'pu-cm-4'], 3, 'Sube, baja y se multiplica', 'Los cambios se multiplican',
    'Un precio sube 20 % y después baja 30 %. ¿Cuánto queda de cada 100? Y algo que empieza en 1 y se duplica en cada ronda, ¿en cuántas rondas llega a 64?', 'cambios-en-cadena', [
      ['Un factor por cambio', 'Cada cambio es un número que multiplica. No los sumes: el segundo actúa sobre lo que dejó el primero.', 'factor-final', 'De cada 100 pesos, ¿cuántos quedan si **sube 20 %** y después **baja 30 %**?', { cambios: [20, -30], min: 70, max: 100, ini: 100 }, '$100 \\cdot 1.2 = 120$ y $120 \\cdot 0.7 = 84$.', ['Primero llega a 120; el 30 % se le quita a eso.', 'Quita el 30 % de 120, que es 36.'], '100 · 1.2 · 0.7 = 84'],
      ['Duplicar y duplicar', 'Aquí el factor es siempre el mismo. Cuenta cuántas veces hay que aplicarlo.', 'crece-factor', 'Empieza en **uno** y se duplica en cada ronda. ¿En cuántas rondas llega a **64**?', { base: 2, meta: 64, max: 8 }, '$2^6 = 64$: seis rondas.', ['Escribe 2, 4, 8… y cuenta las rondas.', '32 es la quinta; falta una.'], 'Duplicar hasta 64: 2⁶, rondas = 6']],
    'Quedan 84 de cada 100; y 64 llega a las 6 rondas.', 'Cambios seguidos: multiplica los factores. Si el factor se repite, es una potencia.');

  // ---------------------------------------------------------------------------------------------------------- geometría
  reto('marco', ['pu-ge-4', 'pu-ge-5'], 2, 'El marco y su hueco', 'Área grande menos hueco',
    'A una lámina de 10 por 7 se le abre un hueco cuadrado y deben quedar 54 cuadros. ¿Cuánto mide el lado del hueco? Luego un jardín de 8 por 5 se rodea con un andén parejo de 30 cuadros: ¿qué ancho tiene?', 'area-por-resta', [
      ['El hueco', 'No midas lo que queda: mide la lámina completa y quita el hueco.', 'marco-hueco', 'Ajusta el hueco **cuadrado** hasta que queden **54** cuadros.', { w: 10, h: 7, area: 54 }, 'La lámina tiene $10 \\cdot 7 = 70$; sobran 16, que es un cuadrado de lado 4.', ['La lámina entera son 70 cuadros.', 'El hueco debe tener 16 cuadros.'], 'Hueco: 70 − 54 = 16; su lado = 4'],
      ['El andén', 'El andén es el rectángulo de afuera menos el jardín. Al ensancharlo, crece por los cuatro lados.', 'anden-ancho', 'El jardín de 8 por 5 lleva un andén parejo por todo el borde. Ensánchalo hasta que **el andén** mida **30** cuadros.', { w: 8, h: 5, area: 30 }, 'Con ancho 1, el de afuera es $10 \\cdot 7 = 70$ y $70 - 40 = 30$.', ['El jardín solo ocupa 40.', 'Prueba: afuera mide dos anchos más en cada dirección.'], 'Afuera 10 · 7 = 70; 70 − 40 = 30, con ancho = 1']],
    'El hueco mide 4 de lado y el andén, 1 de ancho.', 'Cuando una figura tiene hueco o borde, se resta: lo grande menos lo que no cuenta.');
  reto('cables', ['pu-ge-2', 'pu-ge-3'], 3, 'Los cables y la sombra', 'Busca el triángulo escondido',
    'Un cable de 25 m va de la punta de un mástil a una estaca a 7 m del pie. ¿Qué altura tiene el mástil? A esa hora, una vara de 2 m da 3 m de sombra y un poste, 12 m: ¿cuánto mide el poste?', 'lados-al-cuadrado', [
      ['El mástil', 'El cable, el piso y el mástil forman un triángulo rectángulo. El cable es el lado largo.', 'cateto-falta', 'Un cable de **25 m** llega a **7 m** del pie. Dale al mástil su altura.', { c: 25, b: 7 }, '$25^2 - 7^2 = 625 - 49 = 576$, y su raíz es 24.', ['Se restan los cuadrados, porque el cable es la hipotenusa.', '625 menos 49.'], '625 − 49 = 576; altura = 24'],
      ['La sombra', 'A la misma hora, todo objeto y su sombra guardan la misma razón.', 'sombra-poste', 'La vara de 2 m da 3 m de sombra. Dale la altura al poste que da **12 m**.', { h0: 2, s0: 3, s: 12 }, 'La sombra es 4 veces la de la vara; el poste mide $4 \\cdot 2 = 8$ m.', ['¿Cuántas veces cabe la sombra de la vara en la otra?', 'Es cuatro veces más grande.'], '12 ÷ 3 = 4; poste: 4 · 2 = 8']],
    'El mástil mide 24 m y el poste, 8 m.', 'Un mástil con cable es Pitágoras; dos objetos con su sombra, semejanza.');

  // --------------------------------------------------------------------------------------------------------------- orden
  reto('fila', ['pu-or-1', 'pu-or-2'], 2, 'La fila y la mesa', 'Empieza por la pista que fija un puesto',
    'Cinco personas hacen fila para un bus. ¿En qué orden van? Y en una ronda de 10 sillas, ¿a cuál se llega desde la 6 con 27 pasos?', 'orden-ancla', [
      ['La fila', 'Pon primero a quien tiene puesto fijo. Las otras pistas se acomodan alrededor.', 'fila-cine', 'Pon a cada quien en su puesto.', { fichas: ['Lina', 'Memo', 'Olga', 'Pipe', 'Rita'], pistas: [{ t: 'Olga es la segunda.', r: ['en', 'Olga', 1] }, { t: 'Rita está justo detrás de Pipe.', r: ['sig', 'Pipe', 'Rita'] }, { t: 'Lina está antes que Olga.', r: ['antes', 'Lina', 'Olga'] }, { t: 'Memo es el último.', r: ['en', 'Memo', 4] }] }, 'Olga va de segunda y Lina antes, de primera; Memo, al final; Pipe y Rita ocupan el tercero y el cuarto.', ['Olga tiene puesto fijo y Lina solo cabe antes.', 'Quedan dos puestos seguidos para Pipe y Rita.'], 'Fila: Lina, Olga, Pipe, Rita, Memo'],
      ['La ronda', 'Dar una vuelta completa deja en el mismo lugar: quita las vueltas enteras y camina lo que sobra.', 'vuelta-silla', 'Hay 10 sillas en ronda. Desde la **6** se avanzan **27** pasos en el sentido del reloj. Lleva el señalador.', { n: 10, de: 6, pasos: 27 }, 'Veintisiete son dos vueltas y 7 pasos: de la 6 se llega a la 3.', ['Dos vueltas completas son 20 pasos.', 'Camina siete desde la seis; después de la 10 sigue la 1.'], '27 = 2 vueltas y 7 pasos; silla = 3']],
    'La fila es Lina, Olga, Pipe, Rita, Memo; y se llega a la silla 3.', 'Primero lo fijo, después lo que depende. En una ronda, las vueltas enteras no cuentan.');
  reto('equipo', ['pu-or-4'], 3, 'Quién tiene que ir', 'Sigue las reglas en cadena',
    'Primero, una regla del tipo «si no va uno, va el otro». Después, de cinco personas se arma un equipo de tres con condiciones. ¿A quién no se puede dejar por fuera?', 'orden-ancla', [
      ['Los casos que se pueden', 'Una regla «si no va uno, va el otro» solo prohíbe un caso. Búscalo.', 'casos-si', 'La regla dice: «si **no** va Dora, entonces va Esteban». Toca **todos** los casos que se pueden.', { a: 'Dora', b: 'Esteban', r: ['o', 'Dora', 'Esteban'] }, 'Lo único prohibido es que falten los dos.', ['¿Qué caso rompe la regla?', 'La rompe que no vaya ninguno.'], 'Se prohíbe solo que falten los dos'],
      ['Quién es fijo', 'Imagina que alguien no va y sigue las reglas. Si no alcanzan a ser tres, esa persona tiene que ir.', 'quien-seguro', 'Se escogen **tres** de cinco. Toca a quien **tiene que** ir.', { gente: ['Ema', 'Fito', 'Gala', 'Hugo', 'Ivo'], son: 3, pistas: [{ t: 'Si va Ema, va Gala.', r: ['si', 'Ema', 'Gala'] }, { t: 'Si va Hugo, va Gala.', r: ['si', 'Hugo', 'Gala'] }, { t: 'Ivo va solo si va Hugo.', r: ['si', 'Ivo', 'Hugo'] }] }, 'Sin Gala no van Ema, Hugo ni Ivo: solo quedaría Fito. Gala tiene que ir.', ['Quita a una persona y mira quiénes caen con ella.', 'Sin una de ellas se caen otras tres.'], 'Sin Gala caen Ema, Hugo e Ivo: Gala es fija']],
    'Gala tiene que ir.', 'Para saber si alguien es indispensable, quítalo y sigue la cadena.');

  // ---------------------------------------------------------------------------------------------------------- proporción
  reto('reparto', ['pu-pr-1', 'pu-pr-2'], 2, 'El pago del trabajo', 'Cuánto vale una parte',
    'Tres amigas se reparten 120 mil en razón 3 : 4 : 5. ¿Cuánto recibe cada una? Y si 6 personas hacen un trabajo en 10 horas, ¿cuántas horas tardan 5?', 'razon-en-partes', [
      ['El reparto', 'Suma las partes y mira cuánto vale una sola.', 'corta-reparto', 'Reparte **120** mil en razón **3 : 4 : 5**. Pon los cortes.', { r: [3, 4, 5], total: 120, paso: 5, que: 'mil' }, 'Son 12 partes de 10: 30, 40 y 50.', ['Suma las partes de la razón.', 'Son doce partes iguales.'], '3 + 4 + 5 = 12 partes; cada una = 10'],
      ['Más manos, menos horas', 'El trabajo total no cambia: personas por horas. Si hay más personas, las horas bajan.', 'rectangulo-trabajo', '**6** personas tardan **10** horas. ¿Cuántas horas tardan **5**?', { a1: 6, b1: 10, a2: 5, ea: 'personas', eb: 'horas', max: 20 }, '$6 \\cdot 10 = 60$ y $60 \\div 5 = 12$.', ['Multiplica personas por horas: eso se mantiene.', 'Son 60 horas de trabajo entre cinco.'], '6 · 10 = 60; 60 ÷ 5 = 12']],
    'Reciben 30, 40 y 50 mil; y cinco personas tardan 12 horas.', 'Reparto: una parte. Trabajo: el producto no cambia.');
  reto('viaje', ['pu-pr-3', 'pu-pr-5'], 3, 'Alcanzar y volver al precio', 'Compara con lo que se acerca',
    'Un carro a 100 km/h persigue a otro que va a 70 km/h y le lleva 90 km. ¿A las cuántas horas lo alcanza? El pasaje, con 25 % de descuento, quedó en 60 mil: ¿cuánto valía?', 'alcance', [
      ['La persecución', 'Cada hora se acerca la diferencia de velocidades. ¿Cuántas horas para borrar la ventaja?', 'reloj-caza', 'El de atrás va a 100 y el de adelante a 70, con **90 km** de ventaja. ¿A las cuántas horas lo alcanza?', { D: 600, va: 70, vb: 100, vent: 90, max: 6 }, 'Se acerca 30 km cada hora: $90 \\div 30 = 3$.', ['Resta las velocidades.', 'Se acerca 30 cada hora.'], '100 − 70 = 30; 90 ÷ 30 = 3'],
      ['El precio de antes', 'El precio nuevo es el viejo con un cuarto menos. Deshaz la multiplicación, no sumes el 25 %.', 'vuelta-atras', 'Tras **bajar 25 %**, el pasaje quedó en **60** mil. Arrastra su precio de **antes**.', { q: 60, c: -25, min: 60, max: 110, paso: 5 }, '$60 \\div 0.75 = 80$.', ['¿De qué número 60 es el 75 %?', 'Reparte 60 en tres partes: el viejo son cuatro.'], '60 ÷ 0.75 = 80']],
    'Lo alcanza a las 3 horas y el pasaje valía 80 mil.', 'Persecución: ventaja entre diferencia. Precio anterior: se divide por el factor.');

  // --------------------------------------------------------------------------------------------------------------- conteo
  reto('claves', ['pu-co-1', 'pu-co-4'], 2, 'Las claves del taller', 'Una casilla por decisión',
    'Una clave lleva dos vocales distintas y, al final, un dígito par (0, 2, 4, 6 u 8). ¿Cuántas hay? ¿Y cuántas claves de 2 dígitos tienen algún 7?', 'casillas-multiplican', [
      ['Las casillas', 'Cada decisión es una casilla. Ojo: la segunda vocal no puede repetir la primera.', 'placa-casillas', 'La clave lleva dos **vocales distintas** y, al final, un **dígito par** (0, 2, 4, 6 u 8). Completa.', { modelo: ['A', 'E', '4'], et: ['vocal 1', 'vocal 2', 'dígito', 'claves'], ops: ['·', '·', '='], metas: ['5', '4', '5', '100'], fichas: ['5', '4', '5', '100', '125', '14', '10'] }, '$5 \\cdot 4 \\cdot 5 = 100$.', ['La segunda vocal tiene una opción menos.', 'Cinco, cuatro y cinco, multiplicadas.'], '5 · 4 · 5 = 100'],
      ['Al menos una vez', 'Contar «algún 7» de frente repite casos. Cuenta todas y quita las que no tienen.', 'todos-ninguno', 'Claves de **2 dígitos**, del 00 al 99. ¿Cuántas hay, cuántas **sin** 7 y cuántas con **algún** 7?', { puestos: 2, et: ['todas', 'sin 7', 'con algún 7'], ops: ['−', '='], metas: ['100', '81', '19'], fichas: ['100', '81', '19', '20', '90', '18'] }, '$100 - 9 \\cdot 9 = 19$.', ['Sin 7, cada puesto tiene nueve opciones.', 'A cien réstale nueve por nueve.'], '100 − 81 = 19']],
    'Hay 100 claves, y 19 con algún 7.', 'Casillas que se multiplican; y para «alguno», todas menos ninguna.');
  reto('comite', ['pu-co-2', 'pu-co-3'], 3, 'Fotos y comités', '¿Importa el orden?',
    '¿De cuántas maneras se ordenan las letras de CASAS, se eligen 2 de 8 personas sin cargos y se ponen en fila 5 fotos distintas si dos van juntas?', 'orden-no-importa', [
      ['Letras que se repiten', 'Las letras iguales no distinguen órdenes: se divide por los que se repiten.', 'repetidas-divide', '¿De cuántas maneras se ordenan las letras de **CASAS**?', { palabra: 'CASAS', et: ['cinco letras', 'se divide entre', 'órdenes'], ops: ['÷', '='], metas: ['120', '4', '30'], fichas: ['120', '4', '30', '60', '2', '24'] }, '$120 \\div (2 \\cdot 2) = 30$.', ['Hay dos letras A y dos letras S.', 'Ciento veinte entre dos por dos.'], '120 ÷ 4 = 30'],
      ['Un par sin cargos', 'Sin cargos, escoger a Ana y Beto es lo mismo que a Beto y Ana.', 'divide-ordenes', 'De **8** personas se eligen **2** sin cargos. Completa.', { n: 8, k: 2, et: ['con orden', 'órdenes', 'parejas'], ops: ['÷', '='], metas: ['56', '2', '28'], fichas: ['56', '2', '28', '16', '64', '4'] }, '$8 \\cdot 7 = 56$ y $56 \\div 2 = 28$.', ['Primero con orden: ocho por siete.', 'Cada pareja salió dos veces.'], '56 ÷ 2 = 28'],
      ['Las que van juntas', 'Amarra las que van juntas: son un solo paquete que además se ordena por dentro.', 'paquete-juntos', 'Cinco fotos distintas van en fila y **dos** de ellas, siempre las mismas, quedan **juntas**. Completa.', { n: 5, k: 2, et: ['paquetes', 'adentro', 'filas'], ops: ['·', '='], metas: ['24', '2', '48'], fichas: ['24', '2', '48', '120', '6', '12'] }, 'Cuatro paquetes: $4! = 24$; por 2 de adentro, 48.', ['El paquete cuenta como una sola foto.', 'Quedan cuatro cosas por ordenar.'], '24 · 2 = 48']],
    'Son 30 órdenes, 28 parejas y 48 filas.', 'Repetidas dividen, sin orden se divide, juntas se amarran.');

  // -------------------------------------------------------------------------------------------------------------- espacial
  reto('cubos', ['pu-es-1', 'pu-es-2'], 2, 'Cuadras y cubitos', 'Cuenta por partes',
    'Un cubo de arista 6 se pinta por fuera y se corta en cubitos de arista 1: ¿cuántos tienen 3, 2, 1 y 0 caras pintadas? Y una ciclista anda 6 cuadras al norte, 2 al este, 9 al sur y 3 al este: ¿cómo vuelve?', 'cubo-pintado', [
      ['La pintura', 'Las esquinas, las aristas, las caras y el interior se cuentan aparte.', 'pintura-lugar', 'Un cubo de arista **6** se pinta por fuera y se corta en cubitos de arista 1. ¿Cuántos tienen 3, 2, 1 y 0 caras pintadas?', { n: 6, et: ['3 caras', '2 caras', '1 cara', 'ninguna'], metas: ['8', '48', '96', '64'], fichas: ['8', '48', '96', '64', '72', '120', '24'] }, 'Esquinas 8; aristas $12 \\cdot 4 = 48$; caras $6 \\cdot 16 = 96$; adentro $4^3 = 64$.', ['En cada arista, quita las dos esquinas.', 'Doce aristas de cuatro, seis caras de cuatro por cuatro.'], '8 + 48 + 96 + 64 = 216'],
      ['El recorrido', 'Los rumbos contrarios se cancelan: norte con sur, este con oeste.', 'regresa-ya', 'La ciclista anduvo, en cuadras, **6 al norte, 2 al este, 9 al sur y 3 al este**. Pon lo que le falta para volver al punto de partida.', { ms: [['N', 6], ['E', 2], ['S', 9], ['E', 3]], metas: ['3 al norte', '5 al oeste'], fichas: ['3 al norte', '5 al oeste', '3 al sur', '5 al este', '1 al oeste', '15 al norte'], mismo: ['3 al sur', '5 al este'] }, 'Quedó 3 al sur y 5 al este: vuelve 3 al norte y 5 al oeste.', ['¿Cuánto más al sur que al norte caminó?', 'Vuelve con los rumbos contrarios.'], 'Sur 9 − 6 = 3; este 2 + 3 = 5']],
    'Los cubitos son 8, 48, 96 y 64; y vuelve con 3 al norte y 5 al oeste.', 'Separa por lugar o por rumbo, y después junta.');
  reto('dado', ['pu-es-3', 'pu-es-4'], 3, 'El dado y el papel', 'Lo que no cambia',
    'De un dado corriente se ven 6 arriba, 2 al frente y 4 a la derecha: ¿qué caras se esconden? Y una hoja se dobla 4 veces y se perfora 2 veces, lejos de los dobleces: ¿cuántos huecos salen?', 'cubo-pintado', [
      ['Las escondidas', 'En un dado corriente, las caras opuestas suman siempre lo mismo.', 'dado-escondidas', 'Se ven **6** arriba, **2** al frente y **4** a la derecha. Pon las escondidas.', { ve: [6, 2, 4], et: ['abajo', 'atrás', 'izquierda'], metas: ['1', '5', '3'], fichas: ['1', '5', '3', '2', '4', '6'] }, 'Cada una completa 7: 1, 5 y 3.', ['Frente y atrás suman siete.', 'Réstale a siete lo que se ve.'], '7 − 6 = 1, 7 − 2 = 5 y 7 − 4 = 3'],
      ['El papel doblado', 'Cada doblez duplica las capas, y la perforación atraviesa todas.', 'dobla-y-cuenta', 'Una hoja se dobla **4** veces y se hacen **2** perforaciones, lejos de los dobleces. ¿Cuántas capas hay y cuántos huecos salen? Y si **una sola** se hiciera **sobre el último doblez**, lejos de las esquinas, ¿cuántos saldrían de ella?', { d: 4, np: 2, et: ['capas', 'huecos', 'sobre doblez'], metas: ['16', '32', '8'], fichas: ['16', '32', '8', '4', '10', '64'] }, 'Son $2^4 = 16$ capas y $2 \\cdot 16 = 32$ huecos; sobre el último doblez las capas van unidas de a dos y salen 8.', ['Con cada doblez las capas se duplican.', 'Cuatro dobleces: dos, cuatro, ocho…'], 'Capas 2⁴ = 16; huecos 2 · 16; sobre doblez = 8']],
    'Las escondidas son 1, 5 y 3; quedan 32 huecos.', 'Busca lo que no cambia: la suma 7 o la regla de duplicar.');

  // ---------------------------------------------------------------------------------------------------------- secuencias
  reto('salto', ['pu-se-1', 'pu-se-2'], 2, 'El término lejano', 'Primero más los saltos',
    'La sucesión 6, 13, 20, 27… sigue sumando lo mismo. ¿Cuál es su término 30? Y unas figuras tienen 5, 8 y 11 cuadros y siguen creciendo igual: ¿cuántos tiene la figura 20?', 'primero-y-saltos', [
      ['Los saltos', 'Del primero al trigésimo hay un salto menos que términos.', 'termino-lejano', 'La sucesión es **6, 13, 20, 27…** Arma el término **30**.', { t: [6, 13, 20, 27], et: ['saltos', 'avanzan', 'término 30'], metas: ['29', '203', '209'], fichas: ['29', '203', '209', '30', '210', '216'] }, '$29 \\cdot 7 = 203$ y $6 + 203 = 209$.', ['Hay un salto menos que términos.', 'Cada salto avanza siete.'], '29 · 7 = 203; 6 + 203 = 209'],
      ['Fijo y crece', 'En las figuras hay una parte que se repite y otra que crece: sepáralas.', 'fijo-y-crece', 'Las figuras tienen **5, 8 y 11** cuadros y siguen creciendo igual. Pon cuánto se agrega, la parte **fija** y la figura 20.', { t: [5, 8, 11], fijo: 2, et: ['se agrega', 'parte fija', 'figura 20'], metas: ['3', '2', '62'], fichas: ['3', '2', '62', '5', '60', '65'] }, 'Crecen de a 3 y hay 2 fijos: $3 \\cdot 20 + 2 = 62$.', ['¿Cuánto sube de una a otra?', 'Quítale ese crecimiento a la primera: lo que queda es fijo.'], '3 · 20 + 2 = 62']],
    'El término 30 es 209 y la figura 20 tiene 62 cuadros.', 'Lejano: primero más saltos. Figuras: fijo más lo que crece.');
  reto('ciclo', ['pu-se-3'], 3, 'La última cifra y la letra lejana', 'El residuo dice el lugar',
    '¿En qué termina 3 elevado a 46? ¿Qué letra ocupa el lugar 73 si se escribe PLAZA sin parar?', 'ciclo-residuo', [
      ['El ciclo', 'Las últimas cifras se repiten. Mira cuántas son y reparte el exponente en vueltas.', 'ultima-ciclo', 'Las potencias de 3 terminan en 3, 9, 7, 1… ¿En qué termina $3^{46}$?', { base: 3, et: ['largo del ciclo', 'residuo', 'cifra'], metas: ['4', '2', '9'], fichas: ['4', '2', '9', '3', '7', '1'] }, '46 entre 4 deja 2: la segunda del ciclo es 9.', ['El ciclo tiene cuatro cifras.', 'Cuarenta y seis entre cuatro sobra dos.'], '46 = 11 · 4 + 2; termina en 9'],
      ['La letra', 'Es el mismo truco: cuántas letras tiene una vuelta y cuántas sobran.', 'vueltas-sobran', 'Se escribe **PLAZA** una y otra vez. ¿Qué letra ocupa el lugar **73**?', { palabra: 'PLAZA', et: ['vueltas', 'residuo', 'letra'], metas: ['14', '3', 'A'], fichas: ['14', '3', 'A', '15', 'Z', 'L', '2'] }, '73 = 14 · 5 + 3: la tercera letra es A.', ['Cada vuelta tiene cinco letras.', 'Setenta son catorce vueltas.'], '73 = 14 · 5 + 3']],
    'Termina en 9 y la letra es la A.', 'Lo que se repite se divide: el residuo dice el lugar.');

  // ---------------------------------------------------------------------------------------------------------------- códigos
  reto('mensaje', ['pu-cd-1'], 2, 'El mensaje corrido', 'Descifrar es devolver',
    'Una clave avanza 3 lugares cada letra. Llegó OXQD: ¿qué palabra era? Y si A = 1, B = 2… Z = 26 (sin Ñ), ¿cuánto vale FARO?', 'cesar', [
      ['Descifrar', 'Si al cifrar cada letra avanzó, para leer hay que hacer lo contrario.', 'descifra-mensaje', 'Para cifrar, cada letra **avanzó 3** lugares (sin Ñ). Llegó **OXQD**. ¿Qué palabra era?', { w: 'OXQD', metas: ['L', 'U', 'N', 'A'], fichas: ['L', 'U', 'N', 'A', 'R', 'T', 'G', 'M'] }, 'Tres atrás: O→L, X→U, Q→N, D→A.', ['Cada letra vuelve tres lugares.', 'La O vuelve a la L.'], 'OXQD, tres atrás: LUNA'],
      ['El valor', 'Cada letra vale su lugar en el alfabeto. Súmalas con calma.', 'suma-letras', 'A = 1… Z = 26 (sin Ñ). Pon el valor de cada letra de **FARO** y el total.', { w: 'FARO', metas: ['6', '1', '18', '15', '40'], fichas: ['6', '1', '18', '15', '40', '16', '19', '41'] }, '$6 + 1 + 18 + 15 = 40$.', ['Cuenta el lugar de cada letra.', 'La R es la dieciocho.'], '6 + 1 + 18 + 15 = 40']],
    'El mensaje era LUNA y FARO vale 40.', 'Para descifrar se anda al revés; para pesar, se cuentan lugares.');
  reto('maquina', ['pu-cd-2'], 3, 'La máquina escondida', 'Una regla que sirva siempre',
    'Una máquina multiplica por un número y suma otro: convierte 3 en 17, 5 en 27 y 8 en 42. ¿Qué sale con 10? Otra convierte MUNDO en OMUND. ¿En qué convierte RATON?', 'cesar', [
      ['Dos pasos', 'Compara dos ejemplos: cuánto sube lo que sale cuando lo que entra sube.', 'maquina-dos-pasos', 'Multiplica por un número y después **suma** otro. Pon los dos y lo que sale con 10.', { e: [['3', '17'], ['5', '27'], ['8', '42']], et: ['por', 'más', 'con 10'], metas: ['5', '2', '52'], fichas: ['5', '2', '52', '3', '7', '50'] }, 'Al subir 2 sube 10: por 5. $3 \\cdot 5 + 2 = 17$. Con 10: 52.', ['De 3 a 5, ¿cuánto sube lo que sale?', 'Sube diez por cada dos que entran.'], '3 · 5 + 2 = 17; con 10: 10 · 5 + 2 = 52'],
      ['Los puestos', 'Aquí no cambian las letras: cambia el lugar. Sigue a cada una.', 'puestos-cambian', 'El código cambia **MUNDO** por **OMUND**. Escribe **RATON** en ese código.', { de: 'MUNDO', a: 'OMUND', ask: 'RATON', rot: 'con la misma regla', metas: ['N', 'R', 'A', 'T', 'O'], fichas: ['R', 'A', 'T', 'O', 'N'] }, 'La última pasa al principio: NRATO.', ['¿A dónde se fue la última letra?', 'Las demás se corren un puesto.'], 'RATON → NRATO']],
    'La máquina multiplica por 5 y suma 2; RATON queda NRATO.', 'Una regla vale si sirve con todos los ejemplos.');

  // ---------------------------------------------------------------------------------------------------------------- gráficas
  reto('anuncio', ['pu-gr-1', 'pu-gr-3'], 2, 'El anuncio con truco', 'Compara los números, no el dibujo',
    'Un anuncio muestra ventas de 120 y 150 con el eje cortado, y dice que un gasto pasó de 40 a 50 y volvió a 40. ¿Qué porcentaje cambió cada cosa?', 'cambio-porcentual', [
      ['El eje cortado', 'Lee los números. Para el porcentaje, la diferencia se compara con lo de antes.', 'diferencia-real', 'Mira dónde empieza el eje. Pon cuánto **más** vendió B y qué **porcentaje** más.', { vals: [120, 150], rot: ['A: 120', 'B: 150'], hi: 160, st: 10, lo: 110, et: ['unidades', 'porcentaje'], metas: ['30', '25 %'], fichas: ['30', '25 %', '20 %', '30 %', '125 %', '40'] }, '$150 - 120 = 30$ y $30 \\div 120 = 25\\,\\%$.', ['La diferencia se divide entre lo que había antes.', 'Treinta es la cuarta parte de 120.'], '30 ÷ 120 = 25 %'],
      ['Ida y vuelta', 'Subir y bajar lo mismo no da el mismo porcentaje: cambió el punto de partida.', 'ida-vuelta-porciento', 'Un gasto pasa de 40 a 50 y vuelve a 40. Pon cada **cambio en porcentaje**.', { a: 40, b: 50, et: ['40 → 50', '50 → 40'], metas: ['+25 %', '−20 %'], fichas: ['+25 %', '−20 %', '+20 %', '−25 %', '+10 %', '−10 %'] }, '10 de 40 es 25 %; 10 de 50 es 20 %.', ['La primera se compara con 40.', 'La segunda se compara con 50.'], '10 ÷ 40 = 25 % y 10 ÷ 50 = 20 %']],
    'B vendió 25 % más; el gasto sube 25 % y baja 20 %.', 'Un porcentaje siempre se compara con el de antes.');
  reto('datos', ['pu-gr-2'], 3, 'El centro de los datos', 'El promedio reparte, la mediana parte',
    'Halla el promedio, la mediana y la moda de 8, 3, 9, 3, 12 y 7. Y si Nico promedió 4 libros en 5 meses y, con 3 meses más, el promedio de los 8 fue 6, ¿cuántos leyó en esos tres?', 'proporcion-no-cantidad', [
      ['Tres centros', 'Ordena primero. Con cantidad par, la mediana está entre los dos del medio.', 'centros-par', 'Pon el **promedio**, la **mediana** y la **moda**.', { d: [8, 3, 9, 3, 12, 7], et: ['promedio', 'mediana', 'moda'], metas: ['7', '7.5', '3'], fichas: ['7', '7.5', '3', '8', '42', '9'] }, 'Suma 42 entre 6: 7. En el medio, 7 y 8: 7.5. Se repite el 3.', ['Suma todo y reparte entre seis.', 'Los del medio son siete y ocho.'], '42 ÷ 6 = 7; mediana (7 + 8) ÷ 2; moda = 3'],
      ['Los meses nuevos', 'Promedio por cantidad da la suma. Resta las dos sumas.', 'meses-mas', 'En **5** meses Nico promedió **4** libros. Con **3** meses más, el promedio de los 8 fue **6**. Completa.', { n: 5, mas: 3, et: ['en 5', 'en 8', 'en los 3'], metas: ['20', '48', '28'], fichas: ['20', '48', '28', '24', '30', '2'] }, '$8 \\cdot 6 - 5 \\cdot 4 = 48 - 20 = 28$.', ['Cada promedio, por sus meses, da una suma.', 'Cuarenta y ocho menos veinte.'], '8 · 6 = 48; 48 − 20 = 28']],
    'Promedio 7, mediana 7.5, moda 3; y leyó 28 en los tres meses.', 'Con promedios se trabaja sumando: promedio por cantidad.');

  // ------------------------------------------------------------------------------------------------------------------ lógica
  reto('negar', ['pu-lo-1', 'pu-lo-2'], 2, 'Negar sin equivocarse', 'Basta que falle una parte',
    'Una regla dice «cerré la llave y apagué la luz». ¿Qué significa que sea falsa? Y con p falsa, q verdadera y r verdadera, ¿cuánto vale «(p → r) ∨ (q ∧ ¬r)»?', 'suponer', [
      ['La negación', 'Una «y» se cae si falla una sola parte, cualquiera. La negación tiene que decir eso.', 'niega-y', 'Arma la negación, **en el mismo orden** de la frase.', { frase: '«cerré la llave y apagué la luz»', metas: ['no cerré la llave', 'o', 'no apagué la luz'], fichas: ['no cerré la llave', 'o', 'no apagué la luz', 'y', 'cerré la llave', 'apagué la luz'] }, 'Se niega cada parte y «y» pasa a «o».', ['¿Cuántas partes tienen que fallar para que sea falsa?', 'Con una basta: niega las dos y únelas con «o».'], 'No cerré la llave o no apagué la luz'],
      ['La frase larga', 'Resuelve primero los pedazos. El «si… entonces» solo falla de verdad a falso.', 'frase-larga', 'p es F, q es V y r es V. Pon cada pedazo y la frase completa.', { et: ['p → r', 'q ∧ ¬r', '(p → r) ∨ (q ∧ ¬r)'], metas: ['V', 'F', 'V'], fichas: ['V', 'F', 'V', 'V', 'F', 'F'] }, 'p → r es V; q ∧ ¬r es F; con «o», V.', ['Mira primero cuánto vale lo que está antes de la flecha.', '¬r es falsa, y una «y» con algo falso se cae.'], 'V ∨ F: la frase vale V']],
    'La negación es «no cerré la llave o no apagué la luz»; la frase vale V.', 'Negar cambia «y» por «o». Las frases largas, por pedazos.');
  reto('si', ['pu-lo-3', 'pu-lo-4'], 3, 'Lo que se concluye y lo que no', 'Solo dos caminos seguros',
    '«Si el filtro está sucio, suena la alarma». ¿Qué se sabe con cada dato? Y si todo colibrí es ave, toda ave es animal y ningún animal es piedra, ¿cómo quedan los cuatro grupos?', 'suponer', [
      ['Qué se concluye', 'De «si p, entonces q» solo se avanza con p, o se devuelve con «no q».', 'deduce-seguro', '«**Si está sucio, suena**». ¿Qué se concluye de cada dato?', { et: ['está sucio', 'no suena', 'suena', 'está limpio'], metas: ['suena', 'está limpio', 'no se sabe', 'no se sabe'], fichas: ['suena', 'está limpio', 'no se sabe', 'no se sabe', 'está sucio', 'no suena'] }, 'Sucio: suena. No suena: está limpio. Lo demás no se sabe.', ['Que suene puede ser por otra cosa.', 'Si no suena, no puede estar sucio.'], 'Con «suena» o «está limpio», no se sabe'],
      ['La cadena', 'Cada «todo» mete un círculo dentro de otro. El «ninguno» lo deja afuera.', 'cadena-todos', '«Todo **colibrí** es ave. Toda **ave** es animal. Ningún **animal** es piedra». Pon cada nombre.', { metas: ['colibríes', 'aves', 'animales', 'piedras'], fichas: ['colibríes', 'aves', 'animales', 'piedras'] }, 'Colibríes dentro de aves, aves dentro de animales, y piedras aparte.', ['El más pequeño va más adentro.', '«Ningún» separa.'], 'Colibríes ⊂ aves ⊂ animales; piedras, afuera']],
    'Solo «sucio» y «no suena» permiten concluir; los colibríes son animales.', 'De un «si» hay dos caminos seguros; de los «todos», una cadena.');

  // --------------------------------------------------------------------------------------------------------------- operadores
  reto('receta', ['pu-op-1'], 2, 'La receta del operador', 'Cada número en su lugar',
    'Con a ★ b = 4a − b², halla 5 ★ 3 y 3 ★ 5. Después, una máquina que hace a · b − b²: ¿qué sale si entran a = −5 y b = −2?', 'operador-receta', [
      ['Dos órdenes', 'La primera letra es el primer número. Reemplaza antes de calcular.', 'arma-receta', 'Con $a \\star b = 4a - b^2$: calcula $5 \\star 3$ y $3 \\star 5$.', { et: ['5 ★ 3', '3 ★ 5'], metas: ['5', '3', '11', '3', '5', '−13'], fichas: ['5', '5', '3', '3', '11', '−13', '13', '14'] }, '$20 - 9 = 11$ y $12 - 25 = -13$.', ['El primer número va donde está la a.', 'Cuatro por el primero, menos el cuadrado del segundo.'], '4 · 5 − 3² = 11 y 4 · 3 − 5² = −13'],
      ['Con negativos', 'Pon paréntesis a los negativos para no perder signos.', 'entran-negativos', 'La máquina hace $a \\star b = a \\cdot b - b^2$. Entran $a = -5$ y $b = -2$. Llena cada parte.', { a: '−5', b: '−2', et: ['a · b', 'b²', 'sale'], ops: ['−', '='], metas: ['10', '4', '6'], fichas: ['10', '−10', '4', '−4', '6', '14', '−6'] }, '$(-5)(-2) = 10$, $(-2)^2 = 4$, y $10 - 4 = 6$.', ['Negativo por negativo da positivo.', 'El cuadrado de un negativo es positivo.'], '10 − 4 = 6']],
    '5 ★ 3 = 11, 3 ★ 5 = −13 y la máquina entrega 6.', 'Reemplaza con paréntesis; el orden puede cambiarlo todo.');
  reto('anidado', ['pu-op-2'], 3, 'Operadores dentro de operadores', 'De adentro hacia afuera',
    'Con a ★ b = a·b + 2, compara (1 ★ 3) ★ 2 con 1 ★ (3 ★ 2). Después halla x si (x ★ 3) ★ 2 = 36.', 'operador-receta', [
      ['Los paréntesis', 'Se resuelve primero lo de adentro. Escribe cada resultado en su renglón.', 'dos-parentesis', 'Con $a \\star b = a \\cdot b + 2$: llena cada renglón.', { et: ['1 ★ 3', '(1 ★ 3) ★ 2', '3 ★ 2', '1 ★ (3 ★ 2)'], metas: ['5', '12', '8', '10'], fichas: ['5', '12', '8', '10', '7', '6', '14'] }, '$1 \\cdot 3 + 2 = 5$, $5 \\cdot 2 + 2 = 12$, $3 \\cdot 2 + 2 = 8$, $1 \\cdot 8 + 2 = 10$.', ['Primero lo que está entre paréntesis.', 'Uno por tres, más dos.'], '(1 ★ 3) ★ 2 = 12 y 1 ★ (3 ★ 2) = 10'],
      ['Hacia atrás', 'Para deshacer «por y más», primero quita lo que se sumó y después divide.', 'deshace-operador', 'Con $a \\star b = a \\cdot b + 2$: $(x \\star 3) \\star 2 = 36$. Ve **hacia atrás**.', { s: ['★ 3', '★ 2'], sale: '36', metas: ['5', '17'], fichas: ['5', '17', '19', '6', '34', '38', '12'] }, '$(36 - 2) \\div 2 = 17$ y $(17 - 2) \\div 3 = 5$.', ['Quita el dos que se sumó y divide.', 'De 36 se llega a 34 y de ahí a su mitad.'], '17 = 5 · 3 + 2; 36 = 17 · 2 + 2; x = 5']],
    'Los paréntesis dan 12 y 10; x vale 5.', 'De adentro hacia afuera para calcular; al revés para deshacer.');

  // --------------------------------------------------------------------------------------------------------------- aritmética
  reto('resto', ['pu-ar-1', 'pu-ar-2'], 2, 'Gastar de lo que queda', 'Cada gasto estrena un todo',
    'De 180 mil se gasta un tercio y después un cuarto de lo que queda. ¿Qué fracción queda? Y si cinco datos promedian 12 y un 6 se cambia por un 16, ¿cuál es el promedio nuevo?', 'lo-que-queda-de-cien', [
      ['Lo que va quedando', 'El segundo gasto no es del total: es de lo que dejó el primero.', 'queda-producto', 'De 180 mil se gasta $\\tfrac13$ y después $\\tfrac14$ de lo que queda. ¿Qué fracción **queda**?', { n: 6, et: ['queda del total', 'queda de eso', 'queda al final'], ops: ['·', '='], metas: ['2/3', '3/4', '1/2'], fichas: ['2/3', '3/4', '1/2', '1/3', '1/4', '5/12'] }, '$\\tfrac23 \\cdot \\tfrac34 = \\tfrac12$: quedan 90 mil.', ['Si se va un tercio, quedan dos.', 'Multiplica lo que queda cada vez.'], '2/3 · 3/4 = 1/2'],
      ['Cambia un dato', 'El promedio sube lo que sube la suma, repartido entre todos.', 'cambia-uno', '**Cinco** datos promedian **12**. Un **6** se cambia por un **16**. Halla el promedio nuevo.', { n: 5, c: '6 → 16', et: ['suma', 'suma nueva', 'promedio'], ops: ['→', '→'], metas: ['60', '70', '14'], fichas: ['60', '70', '14', '76', '22', '15'] }, 'La suma pasa de 60 a 70, y $70 \\div 5 = 14$.', ['La suma sube diez.', 'Reparte esos diez entre cinco.'], '60 + 10 = 70; 70 ÷ 5 = 14']],
    'Queda la mitad (90 mil) y el promedio sube a 14.', 'De lo que queda se multiplica; en los promedios se mueve la suma.');
  reto('peor', ['pu-ar-3', 'pu-ar-4'], 3, 'La peor suerte', 'Supón lo peor y suma uno',
    'En una bolsa hay 4 colores con 8 fichas de cada uno. ¿Cuántas hay que sacar sin mirar para tener seguro 3 del mismo color? ¿Y qué número de dos cifras, que suman 11, baja 27 al voltearlas?', 'peor-caso', [
      ['Lo peor', 'Imagina que la suerte te lleva la contraria todo lo que puede, y después una más.', 'peor-suerte', '**4 colores**, ocho de cada uno. ¿Cuántas hay que sacar sin mirar para tener **seguro 3** del mismo color?', { g: [8, 8, 8, 8], et: ['por color', 'colores', 'peor caso', 'seguro'], ops: ['·', '=', '→'], metas: ['2', '4', '8', '9'], fichas: ['2', '4', '8', '9', '3', '12', '16'] }, 'Dos de cada color son 8; la novena completa tres.', ['¿Cuántas de cada color puedes tener sin llegar a tres?', 'Dos de cada uno, y una más.'], '2 · 4 = 8; seguro 8 + 1 = 9'],
      ['Voltear cifras', 'Al voltear un número de dos cifras, cambia nueve veces la diferencia de sus cifras.', 'bloques-volteo', 'Las dos cifras de un número suman **11** y, al voltearlas, el número **baja 27**. Ármalo.', { s: 11, d: 27 }, 'La diferencia es $27 \\div 9 = 3$; 7 y 4 suman 11: es 74.', ['¿Qué diferencia de cifras hace bajar 27?', 'Dos cifras que suman once y se llevan tres.'], '27 ÷ 9 = 3; 74 − 47 = 27, el número es 74']],
    'Hay que sacar 9; y el número es 74.', 'Lo peor más uno. Voltear mueve nueve veces la diferencia.');

  // --------------------------------------------------------------------------------------------------------------- ecuaciones
  reto('edades', ['pu-ec-1', 'pu-ec-2'], 2, 'Todo con una x', 'Escribe lo demás con la misma letra',
    'Cinco enteros seguidos suman 105: ¿cuáles son? Y un papá de 45 años tiene una hija de 15: ¿hace cuántos años tenía seis veces la edad de ella?', 'todo-con-una-x', [
      ['Los seguidos', 'En una cantidad impar de seguidos, el del medio es el promedio.', 'cinco-seguidos', '**Cinco** enteros seguidos suman **105**. Encuentra estos tres.', { n: 5, et: ['el del medio', 'el menor', 'el mayor'], metas: ['21', '19', '23'], fichas: ['21', '19', '23', '20', '17', '25'] }, '$105 \\div 5 = 21$; dos antes y dos después: 19 y 23.', ['¿Entre cuántos números se reparte la suma?', 'El del medio es la suma entre cinco; a cada lado hay dos.'], '105 ÷ 5 = 21; del 19 al 23'],
      ['El tiempo', 'La diferencia de edades no cambia nunca. Úsala.', 'hace-cuantos', 'Hoy un papá tiene **45** años y su hija **15**. Retrocede hasta que él tuviera **seis veces** la edad de ella.', { a: 45, b: 15, k: 6, na: 'papá', nb: 'hija' }, 'Se llevan 30: cinco veces la edad de ella. Tenía 6, hace 9 años.', ['Se llevan siempre 30 años.', 'Cuando él tenga seis veces, la diferencia son cinco veces.'], '30 ÷ 5 = 6 años; hace 15 − 6 = 9']],
    'Van del 19 al 23; y fue hace 9 años.', 'El del medio, o la diferencia que no cambia: eso simplifica todo.');
  reto('recibos', ['pu-ec-2', 'pu-ec-3'], 3, 'Recibos y mezclas', 'Compara y resta',
    '2 cafés y 3 panes valen 17 mil; 2 cafés y 6 panes valen 26 mil. ¿Cuánto vale cada uno? Y si se venden 18 boletos, unos de 3 mil y otros de 8 mil, por 79 mil en total, ¿cuántos son de cada uno?', 'eliminar', [
      ['Los recibos', 'Mira qué tienen igual. La diferencia de precio se debe solo a lo distinto.', 'resta-recibos', 'Los cuadros son **cafés** y los círculos **panes**. Compara los recibos.', { f: [[2, 3, 17], [2, 6, 26]], et: ['más panes', 'más precio', 'un pan', 'un café'], metas: ['3', '9', '3', '4'], fichas: ['3', '3', '9', '4', '5', '8', '26'] }, 'Tres panes más cuestan 9: un pan 3. Un café: $(17 - 9) \\div 2 = 4$.', ['Los cafés son iguales en los dos.', 'Tres panes hacen la diferencia.'], '9 ÷ 3 = 3; café (17 − 9) ÷ 2 = 4'],
      ['Todos iguales', 'Supón que todos fueran del barato y mira cuánto falta.', 'todos-iguales', 'Se venden **18** boletos, unos de **3** mil y otros de **8** mil, por **79** mil en total. Completa.', { n: 18, et: ['todos de 3', 'faltan', 'de 8 mil', 'de 3 mil'], metas: ['54', '25', '5', '13'], fichas: ['54', '25', '5', '13', '144', '10', '8'] }, 'Todos de 3 son 54; faltan 25, y cada cambio agrega 5: cinco de 8.', ['Supón que los dieciocho fueran de tres mil.', 'Cada boleto caro agrega cinco.'], '79 − 54 = 25; 25 ÷ 5 = 5 de 8; de 3 mil = 13']],
    'El pan vale 3 mil, el café 4 mil; hay 5 boletos de 8 mil y 13 de 3 mil.', 'Restar recibos deja una incógnita; suponer todos iguales, también.');

  // ---------------------------------------------------------------------------------------------------------------- conjuntos
  reto('encuesta', ['pu-cj-1', 'pu-cj-2'], 2, 'La encuesta del barrio', 'Empieza por los dos',
    'De 90 vecinos, 52 tienen perro, 35 gato y 15 los dos. ¿Cuántos no tienen ninguno? Y si de 65 personas 40 tienen A, 28 tienen B y 9 ninguno, ¿cuántas tienen los dos?', 'venn-dos', [
      ['El diagrama', 'Pon primero la intersección. Lo demás se calcula quitándola.', 'llena-encuesta', 'De **90**, **52** tienen perro, **35** gato y **15** los dos. Llena.', { a: 'perro', b: 'gato', metas: ['37', '15', '20', '18'], fichas: ['37', '15', '20', '18', '52', '35', '3'] }, 'Solo perro 37, solo gato 20, y $90 - 72 = 18$ ninguno.', ['A los de perro quítales los dos.', 'Suma las tres zonas y réstalas de noventa.'], '37 + 15 + 20 = 72; ninguno = 18'],
      ['Al revés', 'Con los totales y los de afuera, lo que sobra al sumar es lo contado dos veces.', 'desde-los-totales', 'De **65** personas, **40** tienen A, **28** B y **9** ninguno. Completa.', { a: 'A: 40', b: 'B: 28', et: ['alguno', 'solo B', 'los dos', 'solo A'], metas: ['56', '16', '12', '28'], fichas: ['56', '16', '12', '28', '40', '68', '3'] }, 'Alguno $65 - 9 = 56$; $40 + 28 - 56 = 12$ los dos.', ['Quita primero los de afuera.', 'Lo que se pasa al sumar está en los dos.'], '40 + 28 − 56 = 12; solo A = 28']],
    'Ninguno: 18. En la otra, 12 tienen los dos.', 'La intersección primero; y si no la dan, sale de lo contado dos veces.');
  reto('tres', ['pu-cj-2'], 3, 'Nadan y trotan', 'Lo que sobra se solapa',
    'De 100 personas, 63 nadan, 49 trotan y 12 no hacen ninguna de las dos. ¿Cuántas hacen las dos? Y si el 70 % cocina, el 45 % cose y el 10 % ninguna, ¿qué porcentaje hace solo una?', 'venn-dos', [
      ['El solape', 'Las dos barras no caben en los que hacen algo: lo que se pasa es lo que se monta.', 'corre-solape', 'De **100** personas, **63** nadan, **49** trotan y **12** no hacen ninguna de las dos. Solapa las barras: ¿cuántas hacen **las dos** cosas?', { T: 100, a: 63, b: 49, n: 12, na: 'nadan', nb: 'trotan' }, 'Algo: 88; $63 + 49 - 88 = 24$.', ['Los que hacen algo son cien menos los que no.', 'Suma las barras y mira cuánto se pasan de 88.'], '63 + 49 − 88 = 24'],
      ['En porcentajes', 'Es lo mismo con cien: los que hacen algo, los dos y lo que queda.', 'porciento-comun', 'El **70 %** cocina, el **45 %** cose y el **10 %** ninguna. Completa.', { a: 'cocina', b: 'cose', et: ['algo', 'las dos', 'solo cose', 'solo una'], metas: ['90', '25', '20', '65'], fichas: ['90', '25', '20', '65', '45', '115', '35'] }, 'Algo 90; $70 + 45 - 90 = 25$; solo cose 20 y solo cocina 45: 65.', ['Quita el diez por ciento.', 'Se pasa veinticinco: están en las dos.'], '70 + 45 − 90 = 25; solo una 45 + 20 = 65']],
    'Hacen las dos 24 personas; y el 65 % solo una.', 'Suma, compara con los que hacen algo, y lo que sobra está en los dos.');

  // ----------------------------------------------------------------------------------------------------------------- números
  reto('coinciden', ['pu-nu-1', 'pu-nu-2'], 2, 'Juntos otra vez', 'Coincidir es mínimo común múltiplo',
    'Dos ranas salen juntas: en cada salto una avanza 12 y la otra 18. ¿Cuál es el primer lugar donde coinciden? Y con 48 galletas y 60 dulces, ¿cuál es la mayor cantidad de bolsas iguales sin que sobre nada?', 'mcm-coincidir', [
      ['Cuándo coinciden', 'Coinciden en un múltiplo de los dos. Busca el primero.', 'saltos-cada-una', 'Dos ranas salen juntas: en cada salto una avanza **12** y la otra **18**. Mueve los saltos hasta el **primer** lugar donde coinciden.', { a: 12, b: 18, max: 12 }, 'El primero es 36: tres saltos y dos saltos.', ['Escribe los múltiplos de cada una.', 'El primer múltiplo común es 36.'], '3 · 12 = 36 y 2 · 18 = 36'],
      ['Bolsas iguales', 'Repartir sin que sobre, con la mayor cantidad de bolsas, es el mayor divisor común.', 'paquetes-iguales', 'Hay **48** galletas y **60** dulces. Se arman bolsas **iguales**, la mayor cantidad posible, sin que sobre nada. Completa.', { et: ['bolsas', 'galletas c/u', 'dulces c/u'], metas: ['12', '4', '5'], fichas: ['12', '4', '5', '6', '8', '10', '240'] }, 'El MCD de 48 y 60 es 12: 4 galletas y 5 dulces.', ['¿Qué número divide a los dos y es el mayor?', 'Los dos se dejan dividir entre doce.'], '12 · 4 = 48 y 12 · 5 = 60']],
    'Coinciden en el 36 y salen 12 bolsas.', 'Coincidir: MCM. Repartir en iguales: MCD.');
  reto('residuos', ['pu-nu-1', 'pu-nu-3'], 3, 'Residuos y divisores', 'Los residuos también se operan',
    '¿Qué residuo deja 47 · 33 entre 6? ¿Cuántos divisores tiene 200?', 'ciclo-residuo', [
      ['El residuo', 'No hagas el producto: multiplica los residuos y vuelve a dividir.', 'opera-residuos', '¿Qué residuo deja $47 \\cdot 33$ entre **6**?', { s: '47 · 33', et: ['de 47', 'de 33', 'del producto'], metas: ['5', '3', '3'], fichas: ['5', '3', '3', '15', '1', '0'] }, '47 deja 5 y 33 deja 3; $5 \\cdot 3 = 15$, que deja 3.', ['Cuarenta y siete está cerca de 42.', 'Quince entre seis: ¿cuánto sobra?'], '5 · 3 = 15; 15 entre 6 deja 3'],
      ['Los divisores', 'Un divisor escoge cuántos de cada primo lleva, también ninguno.', 'opciones-divisor', '$200 = 2^3 \\cdot 5^2$. ¿Cuántas opciones da cada primo y cuántos **divisores** hay?', { s: '2³ · 5²', et: ['el 2', 'el 5', 'divisores'], ops: ['·', '='], metas: ['4', '3', '12'], fichas: ['4', '3', '12', '2', '6', '7'] }, '$(3 + 1)(2 + 1) = 12$.', ['Puede llevar cero, uno, dos o tres doses.', 'Exponente más uno, y se multiplica.'], '4 · 3 = 12']],
    'Deja 3 y tiene 12 divisores.', 'Opera residuos en vez de números grandes; y cada primo da exponente más uno.');

  // ------------------------------------------------------------------------------------------------------------ probabilidad
  reto('dados', ['pu-pb-1'], 2, 'Dados y personas', 'Casos que sirven sobre todos',
    'Se lanzan dos dados. ¿Con qué probabilidad suman 5? ¿Y 10, o 12, o salen iguales? Y de 12 mujeres (2 con gafas) y 18 hombres (3 con gafas) se escoge a alguien al azar: ¿con qué probabilidad es mujer, usa gafas o es hombre sin gafas?', 'no-contar-dos', [
      ['Las parejas', 'Son seis por seis parejas, todas igual de posibles; no once sumas.', 'cuantas-parejas', 'Se lanzan dos dados. Pon cada probabilidad.', { et: ['la suma es 5', 'la suma es 10', 'los dos iguales', 'la suma es 12'], metas: ['4/36', '3/36', '6/36', '1/36'], fichas: ['4/36', '3/36', '6/36', '1/36', '5/36', '2/36', '1/11'] }, 'Suma 5: 4 parejas; suma 10: 3; iguales: 6; suma 12: 1.', ['Cuenta las parejas una por una: 1+4 y 4+1 son distintas.', 'Para suma 5 empieza por 1+4 y sigue.'], '4, 3, 6 y 1 de 36'],
      ['El grupo', 'Escoge el todo: a la persona se la saca de entre todas.', 'grupo-gafas', 'Hay **12** mujeres y **18** hombres. Usan gafas **2** mujeres y **3** hombres. Se escoge a una persona al azar (la raya son las gafas). Pon cada probabilidad.', { n: 30, m: 12, mg: 2, hg: 3, et: ['mujer', 'usa gafas', 'hombre sin gafas'], metas: ['2/5', '1/6', '1/2'], fichas: ['2/5', '1/6', '1/2', '3/5', '2/3', '5/6'] }, '12 de 30, 5 de 30 y 15 de 30.', ['El total son treinta personas.', 'Hombres sin gafas: los 18 menos los que usan.'], '12/30 = 2/5, 5/30 = 1/6, 15/30 = 1/2']],
    'Suma 5: 4/36; suma 10: 3/36; suma 12: 1/36; iguales: 6/36. Y en el grupo: 2/5, 1/6 y 1/2.', 'Cuenta los casos que sirven y divide entre todos los posibles.');
  reto('urna', ['pu-pb-2'], 3, 'La urna y las alarmas', 'Alguna es 1 menos ninguna',
    'De una bolsa con 3 naranjas y 5 verdes se sacan dos sin devolver. ¿Qué probabilidades lleva la segunda sacada? Y dos alarmas, sin afectarse, suenan con 1/3 y 1/2: ¿con qué probabilidad suena alguna?', 'arbol-multiplica', [
      ['El árbol', 'Sin devolver, la segunda sacada es de otra bolsa: cambia el total y el color que se fue.', 'arbol-bolsa', 'Bolsa con **3** naranjas y **5** verdes; dos **sin devolver**. Pon las ramas.', { n: 3, v: 5, p1: ['3/8', '5/8'], metas: ['2/7', '5/7', '3/7', '4/7'], fichas: ['2/7', '5/7', '3/7', '4/7', '3/8', '5/8', '1/7'] }, 'Si salió naranja quedan 2 y 5; si salió verde, 3 y 4, siempre de 7.', ['Después de una, quedan siete.', 'Quita la que salió.'], 'Ramas 2/7, 5/7, 3/7 y 4/7'],
      ['Alguna', '«Alguna» se cuenta al revés: lo que le falta a «ninguna».', 'fallan-todos', 'Una alarma suena con probabilidad $\\tfrac13$ y otra con $\\tfrac12$, sin afectarse. Completa.', { x: 'suena 1/3', y: 'suena 1/2', et: ['calla la 1.ª', 'calla la 2.ª', 'callan ambas', 'suena alguna'], metas: ['2/3', '1/2', '1/3', '2/3'], fichas: ['2/3', '2/3', '1/2', '1/3', '1/6', '5/6'] }, '$\\tfrac23 \\cdot \\tfrac12 = \\tfrac13$; alguna: $1 - \\tfrac13$.', ['Lo que le falta a cada una para 1.', 'Multiplica las de callar.'], '1 − 1/3 = 2/3']],
    'Las ramas son 2/7, 5/7, 3/7 y 4/7; alguna suena con 2/3.', 'Sin devolver cambia la bolsa; «alguna» es 1 menos «ninguna».');
}
