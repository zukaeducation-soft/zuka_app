// Preuniversitario · mundo 14 «Conjuntos»: lecciones y evaluación (spec 2026-11-18-preuda-razonamiento-completo). Reutiliza los
// juegos de conjuntos de Álgebra (pinta-venn, reparte-venn, descifra-zona, mueve-circulos, orbita-conjuntos) con datos nuevos.
PU_JUEGOS.push(({ setLesson, setExam }) => {
  setLesson('pu-cj-1', [
    play('pinta-venn', 'Pinta la operación', { rounds: [
      { text: 'A ∪ B', n: 2, f: (a, b) => a || b },
      { text: '(A ∩ B) ∪ C', n: 3, f: (a, b, c) => (a && b) || c },
      { text: 'A − (B ∪ C)', n: 3, f: (a, b, c) => a && !(b || c) },
    ] }, 'La unión junta todas las zonas de A y de B. $(A \\cap B) \\cup C$ es la parte común de A y B más todo C. $A - (B \\cup C)$ es lo de A que no toca ni a B ni a C.',
      { hint: 'Revisa zona por zona: ¿está en A? ¿en B? ¿en C? Y aplica la operación.' }),
    play('reparte-venn', 'Ubica cada número', { rounds: [{ U: ['2', '3', '4', '5', '6', '8', '9', '10'], A: ['2', '4', '6', '8', '10'], B: ['3', '6', '9'] }] },
      'A son los pares y B los múltiplos de 3: el 6 está en los dos, el 5 en ninguno.',
      { hint: 'Pregunta por cada número: ¿es par? ¿es múltiplo de 3?' }),
    play('descifra-zona', 'Nombra la zona', { rounds: [{ title: 'Operaciones', items: [{ zones: [2] }, { zones: [1, 2] }, { zones: [0] }] }] },
      'Solo B es $B - A$. Las dos lunas son la diferencia simétrica $A \\triangle B$. Lo de afuera es $(A \\cup B)^c$.',
      { hint: 'Mira si la zona rayada está dentro o fuera de cada círculo.' }),
    play('encuesta-tres', 'Tres conjuntos, del centro hacia afuera', { rounds: [{ labels: ['fútbol', 'tenis', 'natación'], z: { abc: 2, ab: 3, ac: 4, bc: 1, a: 10, b: 5, c: 6, none: 4 } }] },
      'Primero el centro (los tres: 2); luego cada pareja menos el centro; luego cada deporte menos lo que ya está en sus zonas compartidas; al final, los de ninguno.',
      { hint: 'Empieza por el centro: cada zona de dos se calcula restando lo del centro.' }),
    play('mueve-circulos', 'Cómo se relacionan', { rounds: [{ A: '{a, e, i, o, u}', B: '{a, e}', rB: 0.5, rel: 'sub' }, { A: '{1, 2, 3}', B: '{4, 5}', rB: 0.7, rel: 'disjoint' }] },
      '{a, e} está dentro de las vocales: subconjunto. {1, 2, 3} y {4, 5} no comparten nada: disjuntos.',
      { hint: 'Revisa si todos los de B están en A, o si no comparten ninguno.' }),
    play('arma-negacion', 'Escribe la operación', { rounds: [
      { ask: 'Escribe con símbolos', show: 'lo que está en A pero no en B', tray: ['$A$', '$B$', '$-$', '$\\cup$', '$\\cap$', '$C$'], need: [0, 2, 1] },
      { ask: 'Escribe con símbolos', show: 'lo que está en B y también en C', tray: ['$A$', '$B$', '$-$', '$\\cup$', '$\\cap$', '$C$'], need: [1, 4, 5], alt: [[5, 4, 1]] },
    ] }, '«Pero no» es diferencia: $A - B$. «Y también» es intersección: $B \\cap C$.',
      { hint: '«O» es unión, «y» es intersección, «pero no» es diferencia.' }),
    play('orbita-conjuntos', 'Marca los que cumplen', { rounds: [{ title: 'Relaciones', items: [
      { kind: 'sub', A: ['1', '2', '3', '4'], sets: [['1', '2'], ['5'], ['2', '4'], ['1', '6'], [], ['3', '4', '1']] },
      { kind: 'disj', A: ['a', 'b', 'c'], sets: [['d'], ['a', 'd'], ['e', 'f'], ['c'], ['b', 'g'], ['h']] },
    ] }] }, 'Son subconjuntos de A los que solo tienen elementos de A (también el vacío). Son disjuntos de A los que no comparten nada con él.',
      { hint: 'Revisa cada conjunto elemento por elemento.' }),
  ]);

  setLesson('pu-cj-2', [
    play('solapa-barras', 'Los que están en los dos', { rounds: [
      { labels: ['leen', 'dibujan'], total: 50, a: 30, b: 25, none: 10 },
      { labels: ['café', 'té'], total: 60, a: 35, b: 20, none: 13 },
    ] }, 'La unión es el total menos los de ninguno: $50 - 10 = 40$. Como $30 + 25 = 55$, sobran 15: esos están en los dos. En la otra: $60 - 13 = 47$ y $55 - 47 = 8$.',
      { hint: 'Si sumas los dos grupos, los de la intersección quedan contados dos veces.' }),
    play('encuesta-tres', 'La encuesta de tres materias', { rounds: [{ labels: ['Mat', 'Fís', 'Quí'], z: { abc: 3, ab: 5, ac: 2, bc: 4, a: 8, b: 6, c: 7, none: 5 } }] },
      'Del centro hacia afuera: los tres, luego cada pareja sin el centro, luego cada materia sola, y al final los de ninguna.',
      { hint: 'Cada dato de dos materias incluye a los del centro: réstalos.' }),
    play('complemento-conteo', 'Al menos uno = todos menos ninguno', { rounds: [{ ask: 'Números de 2 cifras con al menos un 4', slots: ['decenas', 'unidades'], all: [9, 10], none: [8, 9], tray: [10, 9, 8, 7] }] },
      'Todos los de dos cifras son $9 \\cdot 10 = 90$; sin ningún 4 son $8 \\cdot 9 = 72$; con al menos un 4: $90 - 72 = 18$.',
      { hint: 'Cuenta los que no tienen ningún 4 y réstalos del total.' }),
    play('cinta-ecuacion', 'La encuesta con una incógnita', { rounds: [{ say: 'De 40: 25 en A, 22 en B, 3 en ninguno. Los dos son x', parts: [[-1, 25, 'solo A'], [1, 0, 'los dos'], [-1, 22, 'solo B'], [0, 3, 'ninguno']], total: 40, lo: 0, hi: 20 }] },
      '$(25 - x) + x + (22 - x) + 3 = 40$ da $50 - x = 40$: $x = 10$.',
      { hint: 'Solo A es A menos los de los dos.' }),
    play('tabla-doble', 'Comparar grupos', { rounds: [{ rows: [['hombres', 12, 30], ['mujeres', 27, 45]], what: 'practica deporte' }] },
      'Hay más mujeres que practican (27 frente a 12) y también en proporción: 60 % frente a 40 %.',
      { hint: 'Divide entre el total de cada grupo.' }),
    play('pinta-venn', 'Solo y exactamente', { rounds: [{ text: 'solo A', n: 2, f: (a, b) => a && !b }, { text: 'exactamente dos de los tres', n: 3, f: (a, b, c) => a + b + c === 2 }] },
      '«Solo A» es la luna de A sin B. «Exactamente dos» son las tres zonas de parejas, sin el centro.',
      { hint: '«Exactamente dos» no incluye a los que están en los tres.' }),
    play('rompe-cambios', 'Manda la pelota a la cuenta de la encuesta', { miss: 'la intersección no se cuenta dos veces', rounds: [{ title: 'Encuestas', items: [
      { ask: '30 en A, 20 en B, 8 en los dos: la unión', options: ['42', '50', '58'], answer: 0 },
      { ask: 'Total 50 y unión 42: ninguno', options: ['8', '42', '92'], answer: 0 },
      { ask: 'A tiene 30 y 8 están en los dos: solo A', options: ['22', '38', '30'], answer: 0 },
    ] }] }, '$30 + 20 - 8 = 42$. $50 - 42 = 8$. $30 - 8 = 22$.',
      { hint: 'Unión = A + B − los dos.' }),
  ]);

  setExam('pu-conjuntos', 'Conjuntos', [
    ['pu-cj-1', 'Cada operación es un grupo de zonas del diagrama.',
      play('pinta-venn', 'Operación', { rounds: [{ text: '(A ∪ B) − C', n: 3, f: (a, b, c) => (a || b) && !c }] }, 'Lo de A o B que no toca C.', { hint: 'Zona por zona.' })],
    ['pu-cj-1', 'Con tres conjuntos se llena del centro hacia afuera.',
      play('encuesta-tres', 'Tres', { rounds: [{ labels: ['A', 'B', 'C'], z: { abc: 1, ab: 2, ac: 3, bc: 2, a: 4, b: 5, c: 3, none: 2 } }] }, 'Primero el centro (1), luego cada pareja menos el centro y después cada conjunto solo.', { hint: 'Centro.' })],
    ['pu-cj-2', '$n(A \\cup B) = n(A) + n(B) - n(A \\cap B)$.',
      play('solapa-barras', 'Solapa', { rounds: [{ labels: ['A', 'B'], total: 40, a: 22, b: 15, none: 9 }] }, 'Unión 31; los dos: $37 - 31 = 6$.', { hint: 'Doble conteo.' })],
    ['pu-cj-2', 'Los de ninguno son el total menos la unión.',
      play('cinta-ecuacion', 'Incógnita', { rounds: [{ say: 'De 30: 18 en A, 14 en B, 4 en ninguno. Los dos son x', parts: [[-1, 18, 'solo A'], [1, 0, 'los dos'], [-1, 14, 'solo B'], [0, 4, 'ninguno']], total: 30, lo: 0, hi: 14 }] }, '$36 - x = 30$: $x = 6$.', { hint: 'Solo A.' })],
  ]);
});

// Mundo 14 con el estándar de diez (spec 2026-11-20-preuda-razonamiento-diez): una ronda por juego, contexto y zona de examen.
PU_JUEGOS.push(({ diezLesson, addExam, sol, err, opc }) => {
  diezLesson('pu-cj-1', [
    ['pinta-venn', 2, 'Pinta la operación $A - (B \\cup C)$', 'Son los elementos de A que no están en B ni en C: la parte de A que no toca a los otros dos círculos.'],
    ['reparte-venn', 0, 'A son los pares y B los múltiplos de 3. Ubica cada número en su zona', 'El 6 es par y múltiplo de 3: va en el centro. El 5 no es ninguna de las dos cosas: queda afuera.'],
    ['descifra-zona', 0, 'Nombra cada zona rayada con una operación'],
    ['encuesta-tres', 0, 'Una encuesta sobre tres deportes. Llena el diagrama del centro hacia afuera'],
    ['mueve-circulos', 0, 'Acomoda los círculos según cómo se relacionan $\\{a, e\\}$ y las vocales', 'Todos los elementos de $\\{a, e\\}$ son vocales: es un subconjunto y su círculo queda adentro.'],
    ['arma-negacion', 0, 'Escribe con símbolos: «lo que está en A pero no en B»', 'Es la diferencia: $A - B$. Se quita de A todo lo que también está en B.'],
    ['orbita-conjuntos', 0, 'Marca los conjuntos que cumplen la relación'],
  ], [
    sol('Sean $A = \\{1, 2, 3, 4, 5, 6\\}$ y $B = \\{4, 5, 6, 7, 8\\}$, y el universo $U$ formado por los números del 1 al 10. ¿Cuántos elementos tienen $A \\cap B$, $A \\cup B$, $A - B$ y $(A \\cup B)^c$?',
      ['$A \\cap B$ son los que están en los dos: 4, 5 y 6. Tiene [[3]] elementos', '$A \\cup B$ junta todo sin repetir: del 1 al 8. Tiene [[8]] elementos', '$A - B$ son los de A que no están en B: 1, 2 y 3. Tiene [[3]] elementos', '$(A \\cup B)^c$ es lo que queda del universo: 9 y 10. Tiene [[2]] elementos'],
      ['11', '5', '10'],
      'La unión no suma los tamaños (serían 11): los tres elementos comunes se cuentan una sola vez. El complemento se toma siempre respecto al universo.',
      'Dibuja los dos círculos y escribe primero los elementos comunes en el centro.'),
    err('En un diagrama de Venn de dos conjuntos, A tiene 12 elementos, B tiene 9 y la intersección tiene 4. ¿Cuántos elementos tiene $A \\cup B$?',
      ['Solo en A: $12 - 4 = 8$', 'Solo en B: $9 - 4 = 5$', 'En la unión: $12 + 9 = 21$'], 2,
      ['En la unión: $8 + 4 + 5 = 17$', 'En la unión: $12 + 9 + 4 = 25$', 'En la unión: $8 + 5 = 13$'],
      'La unión son las tres zonas: solo A, los dos y solo B: $8 + 4 + 5 = 17$. Al sumar $12 + 9$ los 4 del centro quedan contados dos veces.',
      'Los dos primeros pasos ya separaron las zonas. ¿Cuántas zonas tiene la unión?'),
    opc('Si $A = \\{2, 4, 6, 8\\}$ y $B = \\{3, 6, 9\\}$, entonces el conjunto $(A \\cup B) - (A \\cap B)$ tiene:',
      ['7 elementos', '6 elementos', '5 elementos', '1 elemento'], 2,
      'La unión es $\\{2, 3, 4, 6, 8, 9\\}$ y la intersección es $\\{6\\}$. Al quitar el 6 quedan 5 elementos.',
      'Halla primero la unión y la intersección, y después quita una de la otra.'),
  ]);

  diezLesson('pu-cj-2', [
    ['solapa-barras', 1, 'De 60 personas, 35 toman café, 20 toman té y 13 no toman ninguno. Solapa las barras para hallar los que toman los dos', 'Toman algo $60 - 13 = 47$. Como $35 + 20 = 55$, sobran 8: los que toman las dos bebidas.'],
    ['encuesta-tres', 0, 'Una encuesta sobre tres materias. Llena el diagrama del centro hacia afuera'],
    ['complemento-conteo', 0, 'Cuenta los números de 2 cifras que tienen al menos un 4', 'Todos: $9 \\cdot 10 = 90$. Sin ningún 4: $8 \\cdot 9 = 72$. Con al menos un 4: 18.'],
    ['cinta-ecuacion', 0, 'De 40 encuestados, 25 están en A, 22 en B y 3 en ninguno. Halla los que están en los dos', '$(25 - x) + x + (22 - x) + 3 = 40$ da $50 - x = 40$: en los dos hay 10.'],
    ['tabla-doble', 0, 'Practican deporte 12 de 30 hombres y 27 de 45 mujeres. ¿En qué grupo es mayor la proporción?', '$12 \\div 30 = 40\\,\\%$ y $27 \\div 45 = 60\\,\\%$: es mayor entre las mujeres.'],
    ['pinta-venn', 1, 'Pinta en el diagrama: «exactamente dos de los tres»', 'Son las tres zonas donde se cruzan solo dos círculos. El centro no cuenta: ahí están los que cumplen las tres.'],
    ['rompe-cambios', 0, 'Manda la pelota a la cuenta de la encuesta', 'Unión: $30 + 20 - 8 = 42$. Ninguno: $50 - 42 = 8$. Solo A: $30 - 8 = 22$.'],
  ], [
    sol('En un curso, el 70 % de los estudiantes aprobó matemáticas, el 60 % aprobó física y el 10 % no aprobó ninguna de las dos materias. ¿Qué porcentaje aprobó las dos materias? ¿Qué porcentaje aprobó solo matemáticas?',
      ['Aprobó al menos una materia el $100 - 10 =$ [[90]] % del curso', 'Las dos listas suman $70 + 60 =$ [[130]] %', 'Lo que sobra son los que se contaron dos veces: $130 - 90 =$ [[40]] % aprobó las dos', 'Solo matemáticas: $70 - 40 =$ [[30]] %'],
      ['20', '100', '10'],
      'La suma de las dos listas pasa de la unión porque los que aprobaron las dos están en ambas. Ese exceso es justo la intersección.',
      'Quita primero a los que no aprobaron nada: ¿qué porcentaje aprobó al menos una?'),
    err('De 60 personas, 35 leen prensa, 28 oyen radio y 15 hacen las dos cosas. ¿Cuántas personas no hacen ninguna de las dos?',
      ['Solo leen prensa: $35 - 15 = 20$', 'Solo oyen radio: $28 - 15 = 13$', 'Hacen al menos una de las dos: $20 + 13 = 33$', 'No hacen ninguna: $60 - 33 = 27$'], 2,
      ['Hacen al menos una de las dos: $20 + 13 + 15 = 48$', 'Hacen al menos una de las dos: $35 + 28 = 63$', 'Hacen al menos una de las dos: $35 + 28 + 15 = 78$'],
      'Los que hacen las dos cosas también hacen «al menos una»: la unión tiene tres zonas, $20 + 13 + 15 = 48$. No hacen ninguna 12 personas.',
      '¿En cuál zona del diagrama están las 15 personas que hacen las dos cosas? ¿Se contaron?'),
    opc('En un grupo de 40 turistas, 22 visitaron el museo, 18 visitaron el jardín botánico y 6 no visitaron ninguno de los dos sitios. La cantidad de turistas que visitó exactamente uno de los dos sitios es:',
      ['34', '6', '22', '28'], 3,
      'Visitaron algún sitio $40 - 6 = 34$. Como $22 + 18 = 40$, los dos sitios los visitaron 6. Exactamente uno: $34 - 6 = 28$.',
      'Halla primero cuántos visitaron los dos sitios; «exactamente uno» deja por fuera a esos.'),
  ]);

  addExam('pu-conjuntos', [
    ['pu-cj-1', 'En la unión, los elementos comunes se cuentan una sola vez.',
      opc('Si el conjunto A tiene 10 elementos, el conjunto B tiene 7 y $A \\cap B$ tiene 3, entonces $A \\cup B$ tiene:', ['17 elementos', '14 elementos', '20 elementos', '11 elementos'], 1,
        '$10 + 7 - 3 = 14$.', 'Suma los dos conjuntos y quita lo que se contó dos veces.')],
    ['pu-cj-2', 'Lo que sobra al sumar las dos listas son los que están en las dos.',
      opc('De 30 estudiantes, 18 juegan baloncesto, 15 juegan voleibol y 5 no juegan ninguno de los dos. La cantidad de estudiantes que juega los dos deportes es:', ['8', '3', '13', '5'], 0,
        'Juegan algo $30 - 5 = 25$. Como $18 + 15 = 33$, sobran 8.', 'Quita primero a los que no juegan nada.')],
  ]);
});
