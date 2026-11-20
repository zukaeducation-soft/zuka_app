// Preuniversitario · mundo 3 «Acertijos de orden y asignación»: lecciones y evaluación (spec 2026-11-18-preuda-razonamiento-completo).
// Pistas de orden: orden-kit.js. Cada acertijo tiene una sola solución (lo comprueba tests/preuda-razonamiento.test.js).
PU_JUEGOS.push(({ setLesson, setExam }) => {
  const K = (t, a, b, say, x = {}) => ({ t, a, b, say, ...x });
  const at = (a, i, say) => ({ t: 'at', a, i, say }), notAt = (a, i, say) => ({ t: 'notAt', a, i, say });

  setLesson('pu-or-1', [
    play('fila-pistas', 'Acomoda la fila con las pistas', { rounds: [
      { names: ['Pablo', 'Quino', 'Rosa', 'Sara'], clues: [at('Rosa', 2, 'Rosa es la tercera'), K('justBefore', 'Pablo', 'Quino', 'Quino va justo después de Pablo'), notAt('Sara', 0, 'Sara no es la primera')] },
      { names: ['Tito', 'Uma', 'Vera', 'Walter', 'Xime'], clues: [at('Uma', 2, 'Uma está en el centro'), K('before', 'Vera', 'Tito', 'Tito está a la derecha de Vera'), K('justBefore', 'Walter', 'Xime', 'Xime va justo después de Walter'), notAt('Vera', 0, 'Vera no es la primera')] },
    ] }, 'Se empieza por la pista más firme: un puesto fijo. En la primera, Rosa es la 3.ª; Pablo y Quino necesitan dos puestos seguidos, y como Sara no es la primera, solo caben en 1.º y 2.º. En la segunda, Uma en el centro deja dos puestos a cada lado; si Walter y Xime fueran 4.º y 5.º, Vera quedaría de primera.',
      { hint: 'Ubica primero a quien tiene un puesto fijo; luego busca dónde caben las parejas que van juntas.' }),
    play('edificio-pisos', '¿Quién vive en cada piso?', { rounds: [
      { names: ['Ana', 'Beto', 'Ceci', 'Dani'], clues: [at('Ceci', 3, 'Ceci vive en el último piso'), K('justBefore', 'Dani', 'Ana', 'Ana vive justo encima de Dani'), K('before', 'Beto', 'Dani', 'Beto vive más abajo que Dani')] },
      { names: ['Elsa', 'Fede', 'Gabi', 'Hugo', 'Inés'], clues: [at('Hugo', 1, 'Hugo vive en el piso 2'), at('Gabi', 4, 'Gabi vive en el último piso'), K('justBefore', 'Inés', 'Fede', 'Fede vive justo encima de Inés')] },
    ] }, 'Un edificio es una fila de pie: «más arriba» es «después». Ceci arriba del todo; Beto debajo de Dani y Ana justo encima de Dani: Beto 1, Dani 2, Ana 3. En el otro, con Hugo en el 2 y Gabi en el 5, la pareja Inés-Fede solo cabe en 3 y 4, y Elsa queda en el 1.',
      { hint: 'Pon primero los pisos fijos; las parejas «justo encima» necesitan dos pisos seguidos libres.' }),
    play('carrera-llegada', 'El orden de llegada', { rounds: [
      { names: ['Juan', 'Kiara', 'Leo', 'Mila'], clues: [at('Leo', 3, 'Leo llegó de último'), K('before', 'Kiara', 'Juan', 'Kiara llegó antes que Juan'), notAt('Mila', 0, 'Mila no ganó'), K('notAdj', 'Juan', 'Kiara', 'Juan y Kiara no llegaron seguidos')] },
      { names: ['Nico', 'Olga', 'Pía', 'Raúl', 'Sol'], clues: [at('Pía', 2, 'Pía llegó tercera'), K('justBefore', 'Raúl', 'Sol', 'Sol llegó justo después de Raúl'), K('before', 'Olga', 'Nico', 'Olga llegó antes que Nico'), notAt('Sol', 4, 'Sol no fue la última')] },
    ] }, 'Con Leo último quedan tres puestos. Mila no ganó; si Mila fuera 3.ª, Kiara y Juan llegarían seguidos. Así: Kiara, Mila, Juan, Leo. En la otra, Raúl y Sol no caben al final (Sol no fue última): van 1.º y 2.º, y Olga y Nico ocupan 4.º y 5.º.',
      { hint: 'Prueba las dos opciones que deja una pista y descarta la que choca con otra.' }),
    play('dias-semana', 'La agenda de la semana', { rounds: [
      { names: ['Teatro', 'Música', 'Pintura', 'Baile', 'Cocina'], clues: [at('Música', 1, 'Música es el martes'), K('end', 'Cocina', null, 'Cocina es el primer o el último día'), notAt('Cocina', 0, 'Cocina no es el lunes'), K('justBefore', 'Baile', 'Pintura', 'Pintura es el día siguiente a Baile'), K('before', 'Teatro', 'Baile', 'Teatro es antes que Baile')] },
    ] }, 'Música el martes y Cocina el viernes (es un extremo y no es el lunes). Quedan lunes, miércoles y jueves: Baile y Pintura necesitan dos días seguidos (miércoles y jueves) y Teatro, antes que Baile, va el lunes.',
      { hint: 'Fija los días seguros y mira qué días seguidos quedan para la pareja.' }),
    play('descarta-casos', 'Tacha los acomodos imposibles', { rounds: [
      { cands: [['Lía', 'Max', 'Oto', 'Noa'], ['Max', 'Oto', 'Noa', 'Lía'], ['Oto', 'Max', 'Noa', 'Lía'], ['Lía', 'Noa', 'Oto', 'Max']], clues: [K('before', 'Max', 'Noa', 'Max va antes que Noa'), K('notEnd', 'Oto', null, 'Oto no está en un extremo'), K('end', 'Lía', null, 'Lía está en un extremo'), notAt('Noa', 3, 'Noa no es la última')] },
    ] }, 'Cada acomodo cae con una pista: el primero pone a Noa de última, el tercero a Oto en un extremo y el cuarto a Noa antes que Max. Solo queda Max, Oto, Noa, Lía.',
      { hint: 'Revisa cada tarjeta contra cada pista: basta una que no se cumpla para tacharla.' }),
    play('tren-ordenado', 'Ordena de menor a mayor estatura', { rounds: [
      { items: [{ label: 'Ana 1.62', v: 1.62 }, { label: 'Beto 1.75', v: 1.75 }, { label: 'Ciro 1.58', v: 1.58 }, { label: 'Dora 1.70', v: 1.70 }, { label: 'Eli 1.66', v: 1.66 }] },
    ] }, 'Ordenar es comparar de a dos: 1.58 < 1.62 < 1.66 < 1.70 < 1.75. Ciro, Ana, Eli, Dora y Beto.',
      { hint: 'Compara primero los decimales; todos empiezan en 1.' }),
    play('rompe-cambios', 'Manda la pelota a la respuesta', { miss: 'revisa las pistas una por una', rounds: [
      { title: 'Filas', items: [
        { ask: 'A antes que B y B antes que C: ¿quién va primero?', options: ['A', 'B', 'C'], answer: 0 },
        { ask: '5 en fila; X es la del centro: ¿qué puesto?', options: ['3.º', '2.º', '4.º'], answer: 0 },
        { ask: 'P justo antes de Q y Q es la 4.ª: ¿P?', options: ['3.ª', '5.ª', '2.ª'], answer: 0 },
      ] },
    ] }, '«Antes que» encadena: si A va antes que B y B antes que C, A va primero. En una fila de 5 el centro es el 3.º, y si Q es la 4.ª, P va justo antes: 3.ª.',
      { hint: 'Dibuja la fila en tu cabeza y pon a cada uno donde dice la pista.' }),
  ]);

  setLesson('pu-or-2', [
    play('mesa-redonda', 'Sienta a todos alrededor de la mesa', { rounds: [
      { names: ['Gil', 'Hana', 'Iván', 'Jade', 'Kai', 'Luz'], clues: [K('opp', 'Gil', 'Hana', 'Hana está frente a Gil'), K('right', 'Gil', 'Iván', 'Iván está justo a la derecha de Gil'), K('opp', 'Iván', 'Luz', 'Luz está frente a Iván'), K('adj', 'Jade', 'Hana', 'Jade está junto a Hana'), K('notAdj', 'Kai', 'Iván', 'Kai no está junto a Iván')] },
      { names: ['Mar', 'Ned', 'Oli', 'Pau'], clues: [K('opp', 'Mar', 'Oli', 'Oli está frente a Mar'), K('right', 'Oli', 'Pau', 'Pau está justo a la derecha de Oli')] },
    ] }, 'Con Gil fijo arriba, «frente a» es la silla opuesta: Hana abajo. Iván a su derecha y Luz frente a Iván. Jade junto a Hana en la silla libre de ese lado, y Kai, que no puede tocar a Iván, en la última.',
      { hint: 'Con la primera persona fija, «frente a» y «justo a la derecha» dan sillas exactas: empieza por ellas.' }),
    play('collar-cuentas', 'Ensarta el collar', { rounds: [
      { names: ['roja', 'azul', 'verde', 'negra', 'blanca'], clues: [K('right', 'roja', 'azul', 'la azul va justo después de la roja'), K('adj', 'negra', 'roja', 'la negra toca a la roja'), K('notAdj', 'verde', 'azul', 'la verde no toca a la azul')] },
      { names: ['gris', 'café', 'rosa', 'lila', 'oro', 'plata'], clues: [K('opp', 'gris', 'oro', 'el oro está frente al gris'), K('right', 'oro', 'rosa', 'la rosa va justo después del oro'), K('adj', 'café', 'gris', 'el café toca al gris'), K('notAdj', 'lila', 'rosa', 'la lila no toca a la rosa'), K('right', 'lila', 'plata', 'la plata va justo después de la lila')] },
    ] }, 'La primera cuenta queda fija y las demás se ponen respecto a ella. La azul va después de la roja; la negra, que toca a la roja, solo cabe al otro lado; la verde no toca a la azul, así que la blanca queda entre ellas.',
      { hint: 'Ubica primero las pistas de «justo después»; las de «no toca» sirven al final para descartar.' }),
    play('brujula-casas', 'Las casas alrededor de la plaza', { rounds: [
      { names: ['Rita', 'Saúl', 'Tere', 'Ugo'], clues: [at('Rita', 0, 'Rita vive al norte'), K('opp', 'Rita', 'Saúl', 'Saúl vive frente a Rita'), K('right', 'Rita', 'Tere', 'Tere vive justo después de Rita, en el sentido del reloj')] },
      { names: ['Vale', 'Wil', 'Yeni', 'Zoe'], clues: [at('Wil', 3, 'Wil vive al oeste'), K('opp', 'Wil', 'Zoe', 'Zoe vive frente a Wil'), notAt('Vale', 2, 'Vale no vive al sur')] },
    ] }, 'Aquí sí importa dónde está cada casa: el norte es el norte. Frente al norte está el sur; en el sentido del reloj, después del norte viene el este. Frente al oeste está el este, y si Vale no vive al sur, vive al norte.',
      { hint: 'Ubica primero la casa con punto cardinal fijo; «frente a» es el punto opuesto.' }),
    play('ronda-saltos', '¿Quién queda en la ronda?', { rounds: [{ n: 6, k: 2 }, { n: 7, k: 3 }, { n: 5, k: 2 }] },
      'Se cuenta en el sentido del reloj y se saca a cada k-ésimo, siguiendo desde el siguiente. Con 6 y de 2 en 2 salen 2, 4, 6, 3, 1 y queda el 5. Con 7 y de 3 en 3 queda el 4; con 5 y de 2 en 2, el 3.',
      { hint: 'Haz la cuenta despacio: tacha a cada uno que sale y no lo vuelvas a contar.' }),
    play('gira-mesa', 'Girar la mesa no cambia el acomodo', { rounds: [{ left: ['Sol', 'Mar', 'Río', 'Luz', 'Cielo'], shift: 2 }, { left: ['Ana', 'Beto', 'Ciro', 'Dora', 'Eva', 'Fede'], shift: 4 }] },
      'En una mesa redonda lo que cuenta es quién tiene a quién al lado. Si todos se corren las mismas sillas, el acomodo es el mismo: por eso se fija a una persona y se ubica a las demás respecto a ella.',
      { hint: 'Busca a una persona en las dos mesas y gira hasta que quede en la misma silla.' }),
    play('descarta-casos', 'Tacha las mesas imposibles', { rounds: [
      { circ: true, cands: [['Pilar', 'Quique', 'Rafa', 'Susi'], ['Pilar', 'Rafa', 'Quique', 'Susi'], ['Pilar', 'Susi', 'Rafa', 'Quique'], ['Pilar', 'Quique', 'Susi', 'Rafa']], clues: [K('opp', 'Pilar', 'Rafa', 'Rafa está frente a Pilar'), K('right', 'Pilar', 'Quique', 'Quique está justo a la derecha de Pilar')] },
    ] }, 'Leídas en el sentido del reloj desde Pilar, solo la primera mesa tiene a Quique justo después de ella y a Rafa en la silla opuesta.',
      { hint: 'En una mesa de cuatro, «frente a» es dos sillas más allá.' }),
    play('vuela-precios', 'Vuela a la respuesta', { rounds: [
      { title: 'Mesas redondas', items: [
        { ask: 'mesa de 8: silla frente a la 3', options: ['7', '5', '4'], answer: 0 },
        { ask: 'mesa de 6: vecinos de la silla 1', options: ['2 y 6', '2 y 3', '6 y 5'], answer: 0 },
        { ask: 'mesa de 10: silla frente a la 9', options: ['4', '1', '5'], answer: 0 },
      ] },
    ] }, 'En una mesa de $n$ sillas, la de enfrente está $n/2$ sillas más allá: frente a la 3 de 8 está la 7, y frente a la 9 de 10, la 4 (se da la vuelta). La silla 1 tiene de vecinas a la 2 y a la última.',
      { hint: 'Suma la mitad de las sillas y, si te pasas del total, da la vuelta.' }),
  ]);

  setLesson('pu-or-3', [
    play('tabla-cruces', 'Un ✓ por fila y por columna', { rounds: [
      { rows: ['Tomás', 'Vilma', 'Yago'], cols: ['Medicina', 'Derecho', 'Arte'], clues: [{ t: 'not', a: 0, v: 0 }, { t: 'not', a: 0, v: 1 }, { t: 'not', a: 1, v: 0 }] },
      { rows: ['Ema', 'Fran', 'Gus', 'Ivo'], cols: ['perro', 'gato', 'loro', 'pez'], clues: [{ t: 'not', a: 0, v: 0 }, { t: 'not', a: 0, v: 1 }, { t: 'not', a: 0, v: 2 }, { t: 'not', a: 2, v: 2 }, { t: 'not', a: 2, v: 3 }, { t: 'is', a: 1, v: 0, say: 'Fran tiene el perro' }] },
    ] }, 'Cada ✗ es una pista negativa. Una fila con un solo hueco libre tiene ahí su ✓, y esa columna se tacha para los demás. Tomás solo puede Arte; Vilma, Derecho; Yago, Medicina. En la otra: Fran el perro, Ema el pez, Gus el gato e Ivo el loro.',
      { hint: 'Busca la fila (o la columna) que tiene un solo hueco sin ✗: ese es su ✓.' }),
    play('casilleros', '¿Qué guarda cada uno?', { rounds: [
      { people: ['Bea', 'Coco', 'Dino'], names: ['mochila', 'balón', 'casco'], clues: [at('balón', 2, 'el balón es de Dino'), notAt('mochila', 0, 'la mochila no es de Bea')] },
      { people: ['Edu', 'Fer', 'Gala', 'Hilda'], names: ['libro', 'gorra', 'raqueta', 'termo'], clues: [at('raqueta', 1, 'la raqueta es de Fer'), notAt('libro', 0, 'el libro no es de Edu'), notAt('libro', 3, 'el libro no es de Hilda'), notAt('gorra', 0, 'la gorra no es de Edu')] },
    ] }, 'Con lo seguro primero: el balón es de Dino; la mochila no es de Bea, así que es de Coco, y a Bea le queda el casco. En la otra, Edu no tiene libro ni gorra ni raqueta: tiene el termo; el libro solo puede ser de Gala y la gorra, de Hilda.',
      { hint: 'Mira qué persona tiene tachadas casi todas las cosas: la que le queda es la suya.' }),
    play('tres-listas', 'Color y mascota de cada uno', { rounds: [
      { people: ['Iris', 'Joel', 'Kim'], A: ['rojo', 'azul', 'verde'], B: ['perro', 'gato', 'pez'], clues: [{ t: 'link', a: 'rojo', b: 'perro', say: 'quien viste de rojo tiene el perro' }, { t: 'isB', p: 1, v: 'gato', say: 'Joel tiene el gato' }, { t: 'notA', p: 0, v: 'rojo', say: 'Iris no viste de rojo' }, { t: 'notA', p: 0, v: 'verde', say: 'Iris no viste de verde' }] },
    ] }, 'Joel tiene el gato, así que no viste de rojo (el rojo va con el perro); Iris tampoco: el rojo y el perro son de Kim. Iris, sin verde, viste de azul y Joel de verde; a Iris le queda el pez.',
      { hint: 'Las pistas que unen dos listas («quien viste de rojo tiene el perro») sirven para tachar en las dos.' }),
    play('descarta-casos', 'Tacha los repartos imposibles', { rounds: [
      { cands: [['té', 'café', 'jugo'], ['café', 'jugo', 'té'], ['jugo', 'té', 'café'], ['café', 'té', 'jugo']], clues: [notAt('café', 0, 'Ana no toma café'), at('jugo', 2, 'Ciro toma jugo')] },
    ] }, 'Cada tarjeta dice qué toma Ana, Beto y Ciro en ese orden. Las que le dan café a Ana o no le dan el jugo a Ciro se tachan: queda té, café, jugo.',
      { hint: 'Lee cada tarjeta como Ana · Beto · Ciro y compárala con las dos pistas.' }),
    play('dias-semana', '¿Qué día atiende cada médico?', { rounds: [
      { names: ['Gómez', 'Ríos', 'Pardo', 'Vélez'], clues: [notAt('Gómez', 0, 'Gómez no atiende el lunes'), K('before', 'Ríos', 'Gómez', 'Ríos atiende antes que Gómez'), at('Vélez', 3, 'Vélez atiende el jueves'), notAt('Pardo', 1, 'Pardo no atiende el martes'), notAt('Pardo', 0, 'Pardo no atiende el lunes')] },
    ] }, 'Vélez el jueves. Gómez no el lunes y después de Ríos; Pardo no el martes. Si Gómez fuera el martes, Ríos sería el lunes y Pardo el miércoles: cumple todo. Si Gómez fuera el miércoles, a Pardo solo le quedarían lunes o martes, y no puede ninguno.',
      { hint: 'Prueba los días posibles de Gómez y mira si los demás todavía caben.' }),
    play('edificio-pisos', 'Cada uno en su piso', { rounds: [
      { names: ['Raúl', 'Sonia', 'Tobi', 'Uriel'], clues: [notAt('Raúl', 0, 'Raúl no vive en el piso 1'), notAt('Raúl', 3, 'Raúl no vive en el último piso'), K('before', 'Raúl', 'Sonia', 'Sonia vive más arriba que Raúl'), at('Tobi', 1, 'Tobi vive en el piso 2')] },
    ] }, 'Tobi en el 2. Raúl no está ni abajo ni arriba del todo, y el 2 está ocupado: vive en el 3. Sonia, más arriba, en el 4, y Uriel en el 1.',
      { hint: 'Tacha para Raúl los pisos que no puede tener: le queda uno solo.' }),
    play('rompe-cambios', 'Manda la pelota al reparto correcto', { miss: 'tacha con las pistas negativas', rounds: [
      { title: 'Tablas', items: [
        { ask: '3 personas y 3 deportes: X no juega fútbol ni tenis', options: ['X juega el tercero', 'no se sabe', 'X juega fútbol'], answer: 0 },
        { ask: 'Y tiene el gato y Z no tiene pez (gato, pez, perro)', options: ['Z tiene el perro', 'Z tiene el pez', 'no se sabe'], answer: 0 },
      ] },
    ] }, 'Con tres opciones, tachar dos deja la tercera. Si Y tiene el gato y Z no el pez, a Z solo le queda el perro.',
      { hint: 'Cuenta cuántas opciones le quedan a cada persona después de tachar.' }),
  ]);

  setLesson('pu-or-4', [
    play('comite-reglas', 'Arma un comité que cumpla las reglas', { rounds: [
      { names: ['F', 'G', 'H', 'J', 'K'], k: 3, need: ['H'], rules: [K('ifNot', 'F', 'G', 'si F va, G no'), K('onlyIf', 'H', 'J', 'H va solo si J va'), K('out', 'K', null, 'K no va')] },
      { names: ['P', 'Q', 'R', 'S', 'T'], k: 3, need: ['R'], rules: [K('either', 'P', 'Q', 'va P o va Q'), K('ifNot', 'P', 'R', 'si P va, R no'), K('out', 'T', null, 'T no va')] },
    ] }, 'Un «si A, entonces no B» solo prohíbe tenerlos juntos. «H va solo si J va»: con H, J tiene que ir. Así, con H van J y uno de F o G. En la otra, con R no puede ir P, así que va Q; el tercero es S.',
      { hint: 'Empieza por quien tiene que ir y mira qué te obliga a meter o a dejar por fuera.' }),
    play('tiene-podria', 'Tiene que, podría o no puede', { rounds: [
      { names: ['L', 'M', 'N', 'O'], k: 2, rules: [K('ifNot', 'L', 'M', 'si L va, M no'), K('onlyIf', 'N', 'O', 'N va solo si O va')], claims: [{ t: 'in', a: 'O', say: 'O va' }, { t: 'in', a: 'L', say: 'L va' }, { t: 'both', a: 'L', b: 'M', say: 'L y M van' }, { t: 'in', a: 'M', say: 'M va' }] },
    ] }, 'Los comités posibles son LO, MO y NO. O está en todos: tiene que ir. L y M aparecen en alguno: podrían. L y M juntos no aparecen nunca.',
      { hint: 'Arriba arma los comités que cumplen y anótalos; una afirmación es «tiene que» si está en todos.' }),
    play('descarta-casos', 'Tacha los horarios imposibles', { rounds: [
      { cands: [['Arte', 'Cine', 'Danza', 'Baile'], ['Cine', 'Arte', 'Danza', 'Baile'], ['Arte', 'Baile', 'Danza', 'Cine'], ['Baile', 'Arte', 'Cine', 'Danza']], clues: [K('before', 'Arte', 'Cine', 'si hay Arte y Cine, Arte va antes'), at('Danza', 2, 'Danza es el miércoles'), K('notAdj', 'Arte', 'Cine', 'Arte y Cine no van seguidos')] },
    ] }, 'Cada tarjeta es lunes, martes, miércoles y jueves. Se tacha la que pone Cine antes de Arte, la que no tiene Danza el miércoles y la que pone Arte y Cine seguidos: queda Arte, Baile, Danza, Cine.',
      { hint: 'Revisa primero Danza el miércoles; luego el orden de Arte y Cine.' }),
    play('dias-semana', 'Organiza las charlas', { rounds: [
      { names: ['Agua', 'Bosques', 'Clima', 'Desiertos', 'Energía'], clues: [at('Clima', 2, 'Clima es el miércoles'), K('end', 'Energía', null, 'Energía es el lunes o el viernes'), K('before', 'Agua', 'Bosques', 'Agua va antes que Bosques'), K('justBefore', 'Clima', 'Desiertos', 'Desiertos es justo después de Clima'), K('notAt', 'Energía', null, 'Energía no es el viernes', { i: 4 })] },
    ] }, 'Clima el miércoles y Desiertos el jueves. Energía va en un extremo pero no el viernes: el lunes. Quedan martes y viernes para Agua y Bosques, en ese orden.',
      { hint: 'Encadena: una pista fija a Clima y otra pega a Desiertos justo después.' }),
    play('fila-pistas', 'La fila del banco', { rounds: [
      { names: ['Abi', 'Bruno', 'Cata', 'Dilan'], clues: [K('notAdj', 'Abi', 'Bruno', 'Abi y Bruno no están juntos'), at('Cata', 0, 'Cata es la primera'), K('before', 'Bruno', 'Abi', 'Bruno va antes que Abi')] },
    ] }, 'Con Cata primera quedan 2.º, 3.º y 4.º. Bruno antes que Abi y sin estar juntos: Bruno 2.º y Abi 4.º; Dilan 3.º.',
      { hint: 'Si dos no pueden estar juntos y quedan tres puestos seguidos, van a los extremos.' }),
    play('casilleros', '¿De quién es cada maleta?', { rounds: [
      { people: ['Iñaki', 'Jaz', 'Kevin'], names: ['roja', 'azul', 'negra'], clues: [notAt('roja', 0, 'la roja no es de Iñaki'), notAt('roja', 1, 'la roja no es de Jaz'), notAt('azul', 0, 'la azul no es de Iñaki')] },
    ] }, 'La roja solo puede ser de Kevin. La azul no es de Iñaki ni de Kevin (ya tiene la roja): es de Jaz, e Iñaki tiene la negra.',
      { hint: 'Empieza por la maleta que tiene más personas tachadas.' }),
    play('vuela-precios', 'Vuela a lo que se puede afirmar', { rounds: [
      { title: 'Condiciones', items: [
        { ask: '«si llueve, no hay partido» y no llueve', options: ['puede haber partido o no', 'hay partido', 'no hay partido'], answer: 0 },
        { ask: '«X va solo si Y va» y X va', options: ['Y va', 'Y no va', 'no se sabe'], answer: 0 },
        { ask: 'algo pasa en todas las soluciones', options: ['tiene que ser', 'podría ser', 'no puede ser'], answer: 0 },
      ] },
    ] }, 'Un «si… no…» no dice nada cuando no se cumple la condición: si no llueve, puede haber partido o no. «X solo si Y» obliga a Y cuando X está. Y lo que pasa en todas las soluciones es necesario.',
      { hint: 'Fíjate qué dice la regla y en qué caso aplica: fuera de ese caso no obliga nada.' }),
  ]);

  setExam('pu-orden', 'Acertijos de orden y asignación', [
    ['pu-or-1', 'En una fila se ubican primero las pistas firmes y luego las parejas.',
      play('fila-pistas', 'Acomoda la fila', { rounds: [{ names: ['Elio', 'Fina', 'Gabo', 'Hilda'], clues: [at('Gabo', 1, 'Gabo es el segundo'), K('justBefore', 'Hilda', 'Elio', 'Elio va justo después de Hilda'), notAt('Fina', 3, 'Fina no es la última')] }] }, 'Gabo 2.º; Hilda y Elio solo caben en 3.º y 4.º; Fina 1.ª.', { hint: 'Primero el puesto fijo.' })],
    ['pu-or-1', 'Tacha cada caso con la pista que lo contradice.',
      play('descarta-casos', 'Descarta', { rounds: [{ cands: [['A', 'B', 'C'], ['B', 'A', 'C'], ['C', 'A', 'B']], clues: [K('before', 'A', 'C', 'A va antes que C'), notAt('A', 0, 'A no es el primero')] }] }, 'Solo B, A, C cumple.', { hint: 'Una pista basta para tachar.' })],
    ['pu-or-2', 'En una mesa redonda se fija a uno y se ubica a los demás.',
      play('mesa-redonda', 'La mesa', { rounds: [{ names: ['Iris', 'Juan', 'Kira', 'Lalo'], clues: [K('right', 'Iris', 'Kira', 'Kira está justo a la derecha de Iris'), K('opp', 'Kira', 'Lalo', 'Lalo está frente a Kira')] }] }, 'Kira a la derecha de Iris, Lalo frente a Kira y Juan frente a Iris.', { hint: 'Con Iris fija.' })],
    ['pu-or-2', 'En la ronda se cuenta en un sentido y se saca a cada k-ésimo.',
      play('ronda-saltos', 'La ronda', { rounds: [{ n: 9, k: 2 }] }, 'Con 9 y de 2 en 2 queda el 3.', { hint: 'Tacha despacio.' })],
    ['pu-or-3', 'Un solo ✓ por fila y por columna.',
      play('tabla-cruces', 'La tabla', { rounds: [{ rows: ['Ana', 'Bea', 'Cami'], cols: ['bus', 'metro', 'bici'], clues: [{ t: 'not', a: 1, v: 0 }, { t: 'not', a: 1, v: 1 }, { t: 'not', a: 2, v: 0 }] }] }, 'Bea en bici, Cami en metro, Ana en bus.', { hint: 'La fila con un solo hueco.' })],
    ['pu-or-3', 'Las pistas que unen dos listas tachan en las dos.',
      play('casilleros', 'Casilleros', { rounds: [{ people: ['Leo', 'Mía', 'Nel'], names: ['flauta', 'violín', 'tambor'], clues: [at('tambor', 0, 'el tambor es de Leo'), notAt('flauta', 1, 'la flauta no es de Mía')] }] }, 'Leo tambor, Nel flauta, Mía violín.', { hint: 'Lo seguro primero.' })],
    ['pu-or-4', 'Necesario: en todos los casos; posible: en alguno.',
      play('tiene-podria', 'Tiene que o podría', { rounds: [{ names: ['P', 'Q', 'R'], k: 2, rules: [K('either', 'P', 'Q', 'va P o va Q')], claims: [{ t: 'in', a: 'R', say: 'R va' }, { t: 'both', a: 'P', b: 'Q', say: 'P y Q van' }] }] }, 'Casos PQ, PR, QR: R podría, P y Q juntos podrían.', { hint: 'Lista los tres casos.' })],
    ['pu-or-4', '«A solo si B»: si A está, B tiene que estar.',
      play('comite-reglas', 'Comité', { rounds: [{ names: ['U', 'V', 'W', 'X'], k: 2, need: ['U'], rules: [K('onlyIf', 'U', 'W', 'U va solo si W va')] }] }, 'Con U tiene que ir W.', { hint: 'Mira qué exige U.' })],
  ]);
});

// Mundo 3 con el estándar de diez (spec 2026-11-20-preuda-razonamiento-diez): una ronda por juego, contexto y zona de examen.
PU_JUEGOS.push(({ diezLesson, addExam, sol, err, opc }) => {
  diezLesson('pu-or-1', [
    ['fila-pistas', 1, 'Cinco personas hacen fila en una taquilla. Acomódalas con las pistas', 'Uma va en el centro. Walter y Xime van seguidos: si fueran 4.º y 5.º, Vera quedaría de primera, y no puede. Entonces: Walter, Xime, Uma, Vera, Tito.'],
    ['edificio-pisos', 0, 'Cuatro vecinos viven en un edificio de cuatro pisos. ¿Quién vive en cada piso?', 'Ceci arriba. Ana va justo encima de Dani y Beto debajo de Dani: Beto, Dani, Ana y Ceci, de abajo hacia arriba.'],
    ['carrera-llegada', 1, 'Cinco atletas corrieron sin empates. Arma el orden de llegada', 'Pía es tercera. Raúl y Sol van seguidos y Sol no es la última: son 1.º y 2.º. Olga llegó antes que Nico: 4.ª y 5.º.'],
    ['dias-semana', 0, 'Un centro cultural programa un taller por día, de lunes a viernes. Arma la agenda', 'Cocina va en un extremo y no es lunes: viernes. Música el martes. Baile y Pintura van seguidos y Teatro antes: lunes Teatro, miércoles Baile, jueves Pintura.'],
    ['descarta-casos', 0, 'Cuatro amigos se acomodan para una foto. Tacha los acomodos imposibles', 'Cada pista tacha un acomodo: Noa no es la última, Oto no va en un extremo y Max va antes que Noa. Queda Max, Oto, Noa, Lía.'],
    ['tren-ordenado', 0, 'Cinco jugadores de un equipo se miden. Ordena el tren del más bajo al más alto', 'Ciro 1.58, Ana 1.62, Eli 1.66, Dora 1.70 y Beto 1.75: se comparan primero las décimas y después las centésimas.'],
    ['rompe-cambios', 0, 'Manda la pelota a la respuesta', 'Si A va antes que B y B antes que C, A va primero. En una fila de 5 el centro es el puesto 3. Justo antes de la 4.ª va la 3.ª.'],
  ], [
    sol('En una carrera de cinco atletas no hubo empates. Paula llegó de segunda. Lucía llegó justo después de Marta. Nora llegó dos puestos antes que Olga. ¿Quién ganó la carrera?',
      ['Paula ocupa el puesto [[2]]: quedan libres 1, 3, 4 y 5', 'Marta y Lucía van seguidas: solo caben en 3 y 4, o en 4 y 5', 'Nora y Olga quedan a dos puestos: tienen que ser 1 y [[3]]; entonces Marta y Lucía son [[4]] y [[5]]', 'La ganadora es [[Nora]]'],
      ['Olga', 'Marta', '1'],
      'Se empieza por el dato fijo (Paula, 2.ª). Si Marta y Lucía fueran 3.ª y 4.ª, a Nora y Olga les quedarían 1 y 5, que no están a dos puestos. El orden es Nora, Paula, Olga, Marta, Lucía.',
      'Dibuja cinco casillas, pon primero a quien tiene puesto seguro y prueba dónde cabe la pareja que va seguida.'),
    err('Cinco familias viven en un edificio de cinco pisos, una en cada piso. Los Vélez viven en el piso 1 y los García en el 5. Los López viven justo debajo de los Ríos. Los Mora viven más arriba que los Ríos. ¿En qué piso viven los López?',
      ['Vélez en el piso 1 y García en el 5: quedan los pisos 2, 3 y 4', 'López vive justo debajo de Ríos: ocupan dos pisos seguidos, López abajo', 'Los Mora viven más arriba que los Ríos, así que los Mora van en el piso 2', 'Entonces Ríos y López ocupan los pisos 4 y 3'], 2,
      ['Los Mora viven más arriba que los Ríos, así que los Mora van en el piso 4', 'Los Mora viven más arriba que los Ríos, así que los Mora van en el piso 3', 'Los Mora viven más arriba que los Ríos, así que los Mora van en el piso 5'],
      '«Más arriba» es un piso de número mayor. Con López, Ríos y Mora en 2, 3 y 4, los Mora quedan en el 4, los Ríos en el 3 y los López en el 2.',
      'Vuelve a leer cada pista contra el paso que la usa: ¿el piso que le dieron a esa familia cumple lo que dice?'),
    opc('Sara, Tomás, Úrsula y Víctor hacen fila. Sara está antes que Tomás, Úrsula está antes que Sara y Víctor no es el último. De las siguientes afirmaciones, de la única que se tiene certeza es:',
      ['Úrsula es la primera', 'Víctor está antes que Sara', 'Tomás es el último', 'Sara es la segunda'], 2,
      'Úrsula, Sara y Tomás van en ese orden y Víctor puede ir en tres lugares, menos al final. En todos los casos el último es Tomás; las otras afirmaciones fallan en algún caso.',
      'Escribe todas las filas posibles. «Certeza» es lo que se cumple en todas, no en una sola.'),
  ]);

  diezLesson('pu-or-2', [
    ['mesa-redonda', 0, 'Seis compañeros se sientan a almorzar en una mesa redonda. Siéntalos con las pistas', 'Gil y Hana quedan frente a frente; Iván a la derecha de Gil y Luz frente a Iván. Jade va junto a Hana y Kai en la silla que queda, lejos de Iván.'],
    ['collar-cuentas', 0, 'Una artesana ensarta cinco cuentas en un collar cerrado. Ordénalas', 'Negra, roja y azul van seguidas. La verde no toca a la azul: después de la azul va la blanca, y la verde cierra el collar junto a la negra.'],
    ['brujula-casas', 1, 'Cuatro casas rodean una plaza, una en cada punto cardinal. Ubícalas', 'Wil al oeste y Zoe frente a él, al este. Vale no vive al sur: va al norte, y Yeni al sur.'],
    ['ronda-saltos', 1, 'Siete niños juegan en ronda y sale uno cada tres cuentas. ¿Quién queda de último?', 'Se cuenta de 3 en 3 y sale quien recibe el 3; la ronda se cierra y se sigue contando desde el siguiente. Hay que repetirlo hasta que quede uno solo.'],
    ['gira-mesa', 0, 'Dos fotos muestran la misma mesa girada. Gira hasta que coincidan', 'Si todos se corren el mismo número de sillas, cada uno conserva sus vecinos: en una mesa redonda es el mismo acomodo.'],
    ['descarta-casos', 0, 'Cuatro amigos juegan cartas en una mesa redonda. Tacha las mesas imposibles', 'Solo en una mesa Rafa queda frente a Pilar y Quique a su derecha. En una mesa de 4, frente a cada puesto está el que queda dos sillas más allá.'],
    ['vuela-precios', 0, 'Vuela a la respuesta', 'En una mesa de 8 la silla de enfrente está 4 puestos más allá: frente a la 3 está la 7. En una de 10, 5 puestos: frente a la 9 está la 4. Los vecinos de la 1 son la 2 y la última.'],
  ], [
    sol('Seis amigos se sientan en una mesa redonda con sillas numeradas del 1 al 6 en el sentido del reloj. Andrés está en la silla 1. Beatriz está frente a Andrés. Carlos ocupa la silla siguiente a la de Beatriz. Daniela está frente a Carlos. Emilio no está junto a Andrés. ¿En qué silla está Felipe?',
      ['En una mesa de 6, la silla de enfrente está 3 puestos más allá: Beatriz está en la [[4]]', 'Carlos va en la siguiente, la [[5]], y Daniela frente a él, en la [[2]]', 'Quedan las sillas 3 y 6. Junto a Andrés están la 2 y la 6: Emilio va en la [[3]] y Felipe en la [[6]]'],
      ['1', '7', '8'],
      'Frente a la silla $n$ está la $n + 3$ (y se vuelve a empezar después de la 6). Las dos sillas libres se reparten con la última pista: Emilio no puede ir en la 6, que es vecina de la 1.',
      'Dibuja el círculo con las seis sillas y pon primero a quien tiene silla fija. «Frente a» es media vuelta.'),
    err('Ocho personas se sientan en una mesa redonda con sillas numeradas del 1 al 8. ¿Qué silla queda frente a la 3 y cuáles son las vecinas de la 8?',
      ['En una mesa de 8, la silla de enfrente está 4 puestos más allá', 'Frente a la silla 3 está la $3 + 4 = 7$', 'Las vecinas de la silla 8 son la 7 y la 9'], 2,
      ['Las vecinas de la silla 8 son la 7 y la 1', 'Las vecinas de la silla 8 son la 7 y la 4', 'Las vecinas de la silla 8 son la 6 y la 7'],
      'La mesa se cierra: después de la silla 8 viene la 1. No existe la silla 9.',
      'En un círculo no hay primero ni último: ¿qué silla sigue después de la más alta?'),
    opc('Cinco niños forman una ronda en este orden, en el sentido del reloj: Ana, Beto, Caro, Dany y Eli. Empezando por Ana cuentan «uno, dos, tres» y sale el niño al que le toca el tres; se sigue contando desde el siguiente. El último niño que queda en la ronda es:',
      ['Ana', 'Beto', 'Eli', 'Dany'], 3,
      'Sale Caro; contando desde Dany sale Ana; desde Beto sale Eli; desde Beto otra vez (Beto, Dany, Beto) sale Beto. Queda Dany.',
      'Hazlo paso a paso tachando nombres: después de cada salida la cuenta empieza en el siguiente.'),
  ]);

  diezLesson('pu-or-3', [
    ['tabla-cruces', 0, 'Tres amigos se presentan a tres carreras distintas. Marca un ✓ por fila y por columna', 'Tomás no va a Medicina ni a Derecho: Arte. Vilma no va a Medicina: Derecho. A Yago le queda Medicina.'],
    ['casilleros', 1, 'Cuatro deportistas dejaron sus cosas en el vestier. ¿Qué guardó cada uno?', 'La raqueta es de Fer. El libro no es de Edu ni de Hilda: es de Gala. La gorra no es de Edu: es de Hilda. A Edu le queda el termo.'],
    ['tres-listas', 0, 'Tres vecinos: cada uno viste un color y tiene una mascota. Arma la tabla', 'Iris no viste de rojo ni de verde: azul. Joel tiene el gato, así que el de rojo con perro es Kim. Joel viste de verde e Iris tiene el pez.'],
    ['descarta-casos', 0, 'Tres amigos piden bebidas distintas. Tacha los repartos imposibles', 'El jugo va en el tercer puesto y el café no va en el primero: queda té, café, jugo.'],
    ['dias-semana', 0, 'Cuatro médicos atienden un día cada uno, de lunes a jueves. ¿Qué día atiende cada uno?', 'Vélez el jueves. Pardo no atiende lunes ni martes: miércoles. Ríos va antes que Gómez: lunes y martes.'],
    ['edificio-pisos', 0, 'Cuatro inquilinos, uno por piso. Ubícalos con las pistas', 'Tobi en el piso 2. Raúl no vive en el 1 ni en el 4: vive en el 3. Sonia más arriba: en el 4. Uriel, en el 1.'],
    ['rompe-cambios', 0, 'Manda la pelota al reparto correcto', 'Si X no juega dos de tres deportes, juega el tercero. Si Y tiene el gato y Z no tiene el pez, a Z le queda el perro.'],
  ], [
    sol('Laura, Mónica y Paola estudian Biología, Química y Música, una carrera cada una, y viven en Bello, Envigado e Itagüí, cada una en un municipio. Mónica vive en Itagüí. Laura no vive en Bello. La que vive en Envigado estudia Música. Mónica no estudia Química. ¿Qué estudia Paola?',
      ['Mónica vive en Itagüí y Laura no vive en Bello: Laura vive en [[Envigado]]', 'La de Envigado estudia Música: Laura estudia [[Música]]', 'A Paola le queda vivir en [[Bello]]', 'Mónica no estudia Química: estudia [[Biología]], y Paola estudia [[Química]]'],
      ['Itagüí', 'Derecho'],
      'En una tabla de doble entrada cada dato tacha casillas. Los municipios quedan primero, y con ellos se resuelve la carrera de Laura; las otras dos se reparten con la última pista.',
      'Haz dos tablas: una de personas y municipios y otra de personas y carreras. Empieza por el dato que da un ✓ directo.'),
    err('Andrés, Bárbara, César y David pidieron cada uno una bebida distinta: café, té, jugo y agua. Bárbara pidió té. David no pidió café ni jugo. Andrés no toma café ni té. ¿Qué pidió César?',
      ['Bárbara pidió té: nadie más lo pide', 'David no pidió café ni jugo, y el té ya está: David pidió agua', 'Andrés no toma café ni té, y el agua es de David: Andrés pidió jugo', 'A César le queda el agua'], 3,
      ['A César le queda el café', 'A César le queda el jugo', 'A César le queda el té'],
      'Cada bebida es de una sola persona: té de Bárbara, agua de David y jugo de Andrés. La única que queda es el café.',
      'Al final de la tabla debe haber un solo ✓ en cada fila y en cada columna. ¿Qué bebida quedó repetida?'),
    opc('Hugo, Iván y Julia practican cada uno un deporte distinto: natación, tenis y ajedrez. Hugo no practica natación. Julia no practica tenis ni natación. Entonces Iván practica:',
      ['natación', 'tenis', 'ajedrez', 'no se puede determinar'], 0,
      'Julia solo puede practicar ajedrez. A Hugo, que no nada, le queda el tenis. Iván practica natación.',
      'Empieza por la persona que tiene más casillas tachadas.'),
  ]);

  diezLesson('pu-or-4', [
    ['comite-reglas', 0, 'Un grupo debe enviar tres delegados y H tiene que ir. Arma un comité que cumpla las reglas', 'H obliga a J. K no va, y F y G no pueden ir juntos: el tercero es F o es G, pero no los dos.'],
    ['tiene-podria', 0, 'Se escogen dos de cuatro candidatos. Decide qué tiene que pasar, qué podría y qué no puede', 'Las parejas posibles son L y O, M y O, y N y O. O está en todas: tiene que ir. L o M podrían ir. L y M juntos no pueden.'],
    ['descarta-casos', 0, 'Una academia arma su horario de lunes a jueves. Tacha los horarios imposibles', 'Danza es el miércoles, Arte va antes que Cine y no van seguidos: queda Arte, Baile, Danza, Cine.'],
    ['dias-semana', 0, 'Un colegio organiza cinco charlas, una por día. Ubícalas', 'Clima el miércoles y Desiertos el jueves. Energía va en un extremo y no es viernes: lunes. Agua antes que Bosques: martes y viernes.'],
    ['fila-pistas', 0, 'Cuatro clientes esperan en la fila del banco. Acomódalos', 'Cata es la primera. Bruno va antes que Abi y no están juntos: Bruno es el segundo y Abi la cuarta, con Dilan en medio.'],
    ['casilleros', 0, 'Tres viajeros recogen sus maletas. ¿De quién es cada una?', 'La roja no es de Iñaki ni de Jaz: es de Kevin. La azul no es de Iñaki: es de Jaz. A Iñaki le queda la negra.'],
    ['vuela-precios', 0, 'Vuela a lo que se puede afirmar', 'Si no llueve, la regla no dice nada: puede haber partido o no. «X solo si Y» con X adentro obliga a Y. Lo que pasa en todas las soluciones tiene que ser.'],
  ], [
    sol('Para un torneo se deben escoger exactamente 3 jugadoras entre Ana, Bea, Clara, Dora y Eva. Eva tiene que ir. Si va Ana, no va Bea. Clara va solo si va Dora. ¿Cuántos equipos distintos se pueden armar y quién, además de Eva, está en todos?',
      ['Eva va siempre: faltan [[2]] jugadoras entre las otras cuatro', 'Ana y Bea no pueden ir juntas, y Clara necesita que vaya [[Dora]]', 'Las parejas que sirven son Ana y Dora, Bea y Dora, y Clara y Dora: [[3]] equipos', 'En todos los equipos está [[Dora]]: ella también tiene que ir'],
      ['Clara', '6', '4'],
      'De las 6 parejas posibles, las reglas tachan tres: Ana con Bea, Ana con Clara y Bea con Clara (en estas dos, Clara iría sin Dora). Lo que aparece en todas las soluciones «tiene que» pasar.',
      'Haz la lista de todas las parejas que acompañarían a Eva y tacha las que rompen alguna regla.'),
    err('En un comité hay una regla: «si va Mario, entonces va Nubia». Se sabe que Nubia va. ¿Qué se puede concluir sobre Mario?',
      ['La regla dice que Mario adentro obliga a Nubia adentro', 'La regla no dice nada sobre lo que pasa cuando Mario no va', 'Como Nubia va, Mario tiene que ir'], 2,
      ['Como Nubia va, Mario podría ir o no ir: no se sabe', 'Como Nubia va, Mario no puede ir', 'Como Nubia va, la regla quedó incumplida'],
      'La regla solo corre en un sentido. Nubia puede ir con Mario o sin él, y en los dos casos la regla se cumple: de que Nubia vaya no se deduce nada sobre Mario.',
      'Prueba los dos casos, Mario adentro y Mario afuera, y mira si alguno rompe la regla.'),
    opc('Para una exposición se eligen exactamente tres de cinco cuadros: P, Q, R, S y T. Si se elige P, no se elige Q. R se elige solo si se elige S. T no se elige. De las siguientes afirmaciones, la única que tiene que ser verdadera es:',
      ['Se elige P', 'Se eligen R y S', 'Se elige Q', 'No se elige R'], 1,
      'Sin T quedan P, Q, R y S, y hay que elegir tres. P y Q no van juntos, así que sale uno de ellos: las ternas posibles son P, R, S y Q, R, S. En las dos están R y S.',
      'Escribe todas las ternas que cumplen las reglas y busca lo que se repite en todas.'),
  ]);

  addExam('pu-orden', [
    ['pu-or-1', 'Un puesto contado desde adelante y desde atrás suma una persona de más.',
      opc('En una fila de 7 personas, Rosa es la tercera contando desde adelante. Contando desde atrás, Rosa es la:', ['cuarta', 'quinta', 'tercera', 'sexta'], 1,
        'Detrás de Rosa hay $7 - 3 = 4$ personas, así que desde atrás es la quinta.', 'Dibuja las siete casillas y cuenta desde el otro extremo.')],
    ['pu-or-2', 'En una mesa redonda de n sillas, enfrente queda la silla que está a n/2 puestos.',
      opc('En una mesa redonda hay 10 sillas numeradas en orden. La silla que queda frente a la 7 es la:', ['2', '3', '12', '5'], 0,
        'Enfrente está 5 puestos más allá: $7 + 5 = 12$, y después de la 10 se vuelve a empezar: la 2.', 'Media vuelta en una mesa de 10 son 5 puestos; después de la 10 sigue la 1.')],
    ['pu-or-3', 'En una tabla de doble entrada cada pista negativa tacha casillas hasta dejar un ✓ por fila.',
      opc('Marta, Nelly y Olga tienen un perro, un gato y un loro, una mascota cada una. Marta no tiene el perro. Olga no tiene el perro ni el gato. La mascota de Marta es:', ['el perro', 'el loro', 'no se puede saber', 'el gato'], 3,
        'Olga tiene el loro. A Marta, que no tiene el perro, le queda el gato, y a Nelly el perro.', 'Empieza por la persona con más casillas tachadas.')],
    ['pu-or-4', '«A solo si B»: sin B no puede estar A.',
      opc('Una regla dice: «Luis va al paseo solo si va Karen». Se sabe que Karen no va. Entonces:', ['Luis va al paseo', 'Luis podría ir o no ir', 'Luis no va al paseo', 'La regla no se cumple'], 2,
        'Karen es condición necesaria para Luis: sin Karen, Luis no puede ir.', '«Solo si» señala lo que hace falta para que lo otro pase.')],
  ]);
});
