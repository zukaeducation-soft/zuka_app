// Preicfes · Ciencias Naturales · mundo 9 «Reacciones y Cantidades» (spec 2026-11-25-preicfes-estructura). Textos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, S, sol, err, opc, guion } = ICF;

  const FRASCO = {
    id: 'icf-frasco-cerrado', title: 'El frasco que no cambió de peso',
    ficha: { autor: 'Club de ciencias', fuente: 'Cuaderno de laboratorio', fecha: 'Marzo de 2026' },
    paras: [
      'En un cambio físico, la sustancia sigue siendo la misma: el hielo derretido es agua. En un cambio químico, o reacción, unas sustancias se convierten en otras con propiedades distintas. Las que se gastan se llaman reactivos; las que aparecen, productos.',
      'Hay señales que hacen sospechar una reacción: sale un gas, cambia el color, aparece un sólido en un líquido, se libera o se absorbe calor. Son pistas, no pruebas. El agua que hierve también suelta burbujas, y no es una reacción: el vapor sigue siendo agua.',
      'El club quemó un trozo de madera en una balanza. La masa bajó de 50 a 4 gramos y alguien dijo que el resto se había destruido. Después echaron vinagre y bicarbonato en un frasco con tapa. Salió gas y, sin embargo, la balanza marcó lo mismo antes y después. Cuando abrieron la tapa, la masa bajó.',
      'La explicación es que en una reacción los átomos no se crean ni se destruyen: se sueltan de unos y se unen a otros. Por eso la masa total se conserva. La madera parecía perder masa porque los gases se iban; y con un clavo ocurre lo contrario: al oxidarse pesa más, porque se le unen átomos de oxígeno del aire.',
      'Una ecuación química cuenta esa historia. A la izquierda de la flecha van los reactivos; a la derecha, los productos. Debe haber los mismos átomos de cada clase en los dos lados. Para lograrlo se cambian los coeficientes, que dicen cuántas moléculas hay; nunca los subíndices, porque eso cambiaría la sustancia: el agua es H₂O y el agua oxigenada, H₂O₂.',
      'Las reacciones pueden clasificarse. En una síntesis, varias sustancias forman una sola. En una descomposición, una sola da varias. En una combustión, una sustancia se une con oxígeno y libera energía en forma de calor y luz. Si la reacción libera calor es exotérmica; si lo absorbe, endotérmica. Encender una estufa es lo primero; la compresa que se enfría al golpearla, lo segundo. Las plantas también absorben energía, la del Sol, para formar azúcar.',
    ],
  };
  const l1 = leccion('icf-cn-reacciones-1', 'Reacciones y conservación', guion(
    ['Físico o químico', 'En una reacción aparecen sustancias nuevas.'],
    ['La masa se conserva', 'Los átomos no se crean ni se destruyen: se reacomodan.'],
    ['Balancear', 'Se cambian los coeficientes, nunca los subíndices.'],
    ['Clases', 'Síntesis, descomposición y combustión; exotérmica o endotérmica.']), [
    x('genero-o-cita', '¿Es un cambio **físico** o **químico**?', { doc: FRASCO, rot: ['físico', 'químico'],
      ...F(['Se derrite un helado', 0, '¿Aparece una sustancia nueva?'], ['Se quema un papel', 1, '¿Aparece una sustancia nueva?'], ['Se disuelve azúcar en agua', 0, '¿Aparece una sustancia nueva?'], ['Se oxida una reja', 1, '¿Aparece una sustancia nueva?'], ['Se agria la leche', 1, '¿Aparece una sustancia nueva?']), bien: 'Misma sustancia o sustancia nueva.' },
      'Derretir y disolver no cambian la sustancia; quemar, oxidar y agriar, sí.', 'Pregunta si al final hay una sustancia que antes no estaba.'),
    x('balancea-atomos', 'Balancea la formación del **agua**: $H_2 + O_2 \\to H_2O$. Mueve cuántas moléculas hay de cada una, con los números **más pequeños**.', { izq: [['H₂', { H: 2 }], ['O₂', { O: 2 }]], der: [['H₂O', { H: 2, O: 1 }]], sol: [2, 1, 2], max: 6 },
      'Con $2H_2 + O_2 \\to 2H_2O$ hay 4 hidrógenos y 2 oxígenos en cada lado.', 'Empieza por el oxígeno: ¿cuántas moléculas de agua usan los dos?'),
    x('conserva-atomos', 'Toca **todas** las ecuaciones que están **balanceadas**.', { casos: [{ t: 'C + O₂ → CO₂', si: true }, { t: 'N₂ + H₂ → NH₃', no: 'Hay 2 nitrógenos antes y 1 después.' }, { t: '2Mg + O₂ → 2MgO', si: true }, { t: 'CH₄ + O₂ → CO₂ + 2H₂O', no: 'Hay 2 oxígenos antes y 4 después.' }, { t: '2H₂O₂ → 2H₂O + O₂', si: true }], falta: 'Falta otra: cuenta átomo por átomo en los dos lados.', ok: 'Los mismos átomos antes y después.' },
      'Carbono, magnesio y agua oxigenada cuadran; en las otras sobran o faltan átomos.', 'Multiplica el coeficiente por el subíndice de cada átomo.'),
    x('masa-cerrada', 'En frascos **cerrados**, pon la masa que falta, en gramos.', { et: ['24 + 32 → ?', '10 + ? → 26', '? → 44 + 56', '7 + 3 → 4 + ?'], metas: ['56', '16', '100', '6'], fichas: ['56', '16', '100', '6', '36', '12', '8'], mira: ['Suma los reactivos.', 'Lo que falta completa el producto.', 'Suma los productos.', 'Los dos lados deben pesar igual.'], trampas: { '1:36': 'Sumaste: los reactivos juntos deben dar 26.', '2:12': 'Restaste: un solo reactivo dio los dos productos.' }, ok: 'La masa total es la misma.' },
      'Los dos lados pesan igual: 56, 16, 100 y 6 gramos.', 'Suma todo lo de un lado e iguálalo con el otro.'),
    x('pista-tipo', 'Ata cada clase de reacción a su ejemplo.', { doc: FRASCO, lineas: ['hierro y azufre forman un solo sólido', 'el agua oxigenada da agua y oxígeno', 'el gas de la estufa arde con oxígeno', 'una compresa química se pone helada'],
      ...T(['síntesis', 0, '¿En cuál varias dan una sola?'], ['descomposición', 1, '¿En cuál una sola da varias?'], ['combustión', 2, '¿En cuál hay llama?'], ['endotérmica', 3, '¿En cuál se absorbe calor?']), bien: 'Cuántas entran, cuántas salen y qué pasa con el calor.' },
      'Juntarse es síntesis, partirse es descomposición, arder es combustión y enfriar es absorber calor.', 'Cuenta los reactivos y los productos, y mira el calor.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: FRASCO, nums: [2, 4, 5], pregunta: 'Queda en pie', queda: 'Un clavo pesa más al oxidarse.',
      ...T(['Si hay burbujas, hay una reacción.', 2, 'Busca otra cosa que también suelta burbujas.'], ['Al quemarse, los átomos de la madera desaparecen.', 3, 'Busca qué no les pasa a los átomos.'], ['Para balancear se cambian los subíndices.', 9, 'Busca qué se cambia y qué nunca.']), bien: 'Burbujas, átomos y coeficientes.' },
      'El agua que hierve suelta burbujas, los átomos no se destruyen y se cambian los coeficientes.', 'Saca la palabra clave: burbujas, desaparecen, subíndices.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: FRASCO, nums: [3, 4], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['La madera pasó de 50 a 4 gramos en la balanza.', 0, 'Léela junto al primer experimento.'], ['Los gases de la madera se llevaron más de la mitad de la masa que marcaba.', 1, 'Compara lo que había con lo que quedó.'], ['El frasco abierto perdió gas.', 1, '¿Por qué bajó la masa al abrir la tapa?'], ['El vinagre pesaba 30 gramos.', 2, '¿Se dice cuánto pesaba?']),
      luz: [[3, 'La masa bajó de 50 a 4 gramos'], [4, 'los gases se iban'], [3, 'Cuando abrieron la tapa']], bien: 'Comparar y explicar.' },
      'Los 50 y 4 están escritos; los gases se deducen; el peso del vinagre no aparece.', 'Une lo que midieron con la explicación del párrafo 4.'),
    sol('Balancea $CH_4 + O_2 \\to CO_2 + H_2O$ y cuenta los oxígenos.', ['El metano trae 4 hidrógenos: salen [[2]] moléculas de agua', 'A la derecha hay $2 + 2 =$ [[4]] oxígenos', 'Hacen falta [[2 moléculas]] de $O_2$'], ['3', '1', '4 moléculas'], '$CH_4 + 2O_2 \\to CO_2 + 2H_2O$.', 'Cuadra primero carbono e hidrógeno y deja el oxígeno para el final.'),
    err('Alguien balancea la reacción del hidrógeno con el oxígeno.', ['Se escribe $H_2 + O_2 \\to H_2O$', 'Falta un oxígeno a la derecha', 'Se cambia la fórmula: $H_2 + O_2 \\to H_2O_2$'], 2, ['Se cambian los coeficientes: $2H_2 + O_2 \\to 2H_2O$', 'Se quita un oxígeno: $H_2 + O \\to H_2O$', 'Se agrega un oxígeno suelto a la derecha'], '$H_2O_2$ es otra sustancia: el agua oxigenada. Los subíndices no se tocan.', '¿Sigue siendo agua lo que quedó a la derecha?'),
    opc('Una vela encendida dentro de un frasco sellado se apaga a los pocos segundos. Si se pesa el frasco completo antes y después, la masa:', ['Es la misma, porque nada entra ni sale', 'Disminuye, porque la vela se gastó', 'Aumenta, porque se forma humo', 'Disminuye, porque el oxígeno desaparece'], 0, 'Los átomos siguen dentro del frasco: la masa se conserva.', 'Piensa si algún átomo salió del frasco.'),
  ]);

  const RECETA = {
    id: 'icf-receta-moles', title: 'La receta de los átomos',
    ficha: { autor: 'Profesora de química', fuente: 'Hoja de clase', fecha: 'Abril de 2026' },
    paras: [
      'Para hacer un sándwich se necesitan dos panes y una tajada de queso. Con diez panes y cuatro tajadas salen cuatro sándwiches: se acaba el queso y sobran dos panes. El queso es lo que limita. En química pasa lo mismo, pero no se cuentan panes sino moléculas.',
      'Las moléculas son demasiado pequeñas para contarlas una por una. Por eso se cuentan por paquetes llamados moles. Un mol tiene 6.02 · 10²³ partículas, así como una docena tiene doce. Un mol de cualquier sustancia tiene el mismo número de partículas, pero no pesa lo mismo: una docena de huevos no pesa lo que una docena de sandías.',
      'La masa molar dice cuántos gramos pesa un mol. Se obtiene sumando las masas de los átomos: si el hidrógeno pesa 1 y el oxígeno 16, un mol de agua, H₂O, pesa 18 gramos. Con 36 gramos de agua se tienen dos moles.',
      'La ecuación balanceada es la receta. En N₂ + 3H₂ → 2NH₃, un mol de nitrógeno necesita tres moles de hidrógeno y produce dos de amoníaco. Los coeficientes dan proporciones entre moles, no entre gramos: un mol de nitrógeno pesa 28 gramos y tres de hidrógeno, apenas 6. Suman 34, que es justo lo que pesan los dos moles de amoníaco.',
      'El reactivo que se acaba primero se llama reactivo límite y decide cuánto producto sale. El otro queda en exceso. Si hay dos moles de nitrógeno y tres de hidrógeno, el hidrógeno alcanza solo para gastar un mol de nitrógeno: salen dos moles de amoníaco y sobra un mol de nitrógeno. El límite no es siempre el que pesa menos, ni el que tiene menos moles: depende de la receta.',
      'En la vida real casi nunca sale todo lo calculado. Parte se pierde, parte no reacciona. El rendimiento compara lo que se obtuvo con lo que se esperaba: si se calculaban 20 gramos y salieron 15, fue del 75 %. Las fábricas gastan mucho dinero para subirlo unos pocos puntos.',
    ],
  };
  const l2 = leccion('icf-cn-reacciones-2', 'Estequiometría', guion(
    ['El mol', 'Un paquete de partículas, como la docena.'],
    ['La receta', 'Los coeficientes dan proporciones entre moles.'],
    ['El que limita', 'El reactivo que se acaba primero decide cuánto sale.'],
    ['Rendimiento', 'Lo que se obtuvo comparado con lo que se esperaba.']), [
    x('paquetes-limite', 'La receta $N_2 + 3H_2 \\to 2NH_3$ usa **1** de $N_2$ y **3** de $H_2$. Hay **5** de $N_2$ y **12** de $H_2$. Mueve cuántas veces se completa la receta.', { hay: [['N₂', 5, 1], ['H₂', 12, 3]], que: 'recetas', max: 8 },
      'El hidrógeno alcanza para $12 \\div 3 = 4$ recetas; sobra 1 de nitrógeno.', 'Divide lo que hay de cada uno entre lo que pide la receta.'),
    x('relacion-moles', 'En $N_2 + 3H_2 \\to 2NH_3$, pon los **moles** que faltan.', { et: ['con 2 de N₂, hidrógeno', 'con 2 de N₂, amoníaco', 'con 9 de H₂, nitrógeno', 'para 10 de NH₃, hidrógeno'], metas: ['6', '4', '3', '15'], fichas: ['6', '4', '3', '15', '2', '30', '27'], mira: ['Por cada nitrógeno van tres.', 'Por cada nitrógeno salen dos.', 'Por cada tres hidrógenos va uno.', 'Halla cuántas recetas dan 10.'], trampas: { '3:30': 'Cada receta da 2 de amoníaco, no 1.', '2:27': 'Multiplicaste: aquí se divide entre 3.', '0:2': 'La receta es 1 a 3.' }, ok: 'Los coeficientes son la receta.' },
      'La receta 1 : 3 : 2 da 6, 4, 3 y 15 moles.', 'Cuenta primero cuántas veces se hace la receta.'),
    x('sube-moles', 'Sube a la cantidad que responde. Puedes fallar **una** vez.', { tiros: [
      { q: 'Un mol de $CO_2$, con C = 12 y O = 16, ¿cuántos **gramos** pesa?', r: 44, c: '12 + 2 \\cdot 16', e: { 28: 'Hay dos oxígenos.' } },
      { q: 'Se esperaban **50 g** y salieron **40 g**. ¿De qué **porcentaje** fue el rendimiento?', r: 80, c: '40 \\div 50 \\cdot 100', e: { 40: 'Esos son los gramos.' } },
      { q: 'En $2Mg + O_2 \\to 2MgO$, con Mg = 24 y O = 16, ¿cuántos **gramos** de $O_2$ gastan **48 g** de Mg?', r: 32, c: '1 \\cdot 32', e: { 16: 'El oxígeno viene en pares: $O_2$.', 48: 'Los coeficientes hablan de moles, no de gramos.' } }] },
      '$12 + 32 = 44$ g; $40 \\div 50 = 80\\%$; 48 g son 2 moles de Mg, que gastan 1 mol de $O_2$: 32 g.', 'Pasa los gramos a moles antes de usar la receta.'),
    x('balancea-atomos', 'Balancea la formación del **amoníaco**: $N_2 + H_2 \\to NH_3$, con los números **más pequeños**.', { izq: [['N₂', { N: 2 }], ['H₂', { H: 2 }]], der: [['NH₃', { N: 1, H: 3 }]], sol: [1, 3, 2], max: 6 },
      'Dos nitrógenos dan 2 amoníacos, que llevan 6 hidrógenos: $3H_2$.', 'Cuadra primero el nitrógeno y después el hidrógeno.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: RECETA, filas: [{ antes: 'Un mol de agua y un mol de hierro tienen', topes: ['la misma masa', 'el mismo volumen', 'el mismo número de partículas'], va: 2 }, { antes: 'Los coeficientes dan proporciones entre', topes: ['gramos', 'moles', 'litros'], va: 1 }, { antes: 'El reactivo límite es el que', topes: ['se acaba primero', 'pesa menos', 'cuesta más'], va: 0 }], mira: ['Relee la comparación con la docena.', 'Relee qué dicen los coeficientes.', 'Relee cómo se llama el que se acaba.'], luz: [[2, 'el mismo número de partículas'], [4, 'proporciones entre moles'], [5, 'se acaba primero']], bien: 'Partículas, moles y el que se acaba.' },
      'Igual número de partículas, proporciones entre moles y se acaba primero.', 'Busca en el texto la oración exacta de cada perilla.'),
    x('lee-escala', 'La gráfica muestra los gramos de producto en tres intentos. Pon cada valor y cuánto **aumentó** del primero al último.', { vals: [12, 18, 27], rot: ['primero', 'segundo', 'tercero'], hi: 30, st: 6, et: ['primero', 'segundo', 'tercero', 'aumentó'], ops: ['', '', ''], metas: ['12', '18', '27', '15'], fichas: ['12', '18', '27', '15', '25', '39', '13'],
      mira: ['Mira en qué línea termina.', 'Mira en qué línea termina.', 'Está a mitad de camino entre 24 y 30.', 'Resta el primero al último.'], trampas: { '2:25': 'Cada línea vale 6: la mitad son 3.', '3:39': 'Eso es la suma.' }, ok: 'De 12 a 27.' },
      'Las líneas van de 6 en 6: 12, 18 y 27. Aumentó $27 - 12 = 15$ g.', 'Mira cuánto vale cada línea antes de leer.'),
    x('balanza-tesis', 'Afirmación: «en este experimento, el oxígeno era el reactivo límite». ¿Qué hace cada dato?', { doc: RECETA, tesis: 'El oxígeno era el límite',
      ...F(['Al agregar más oxígeno salió más producto.', 0, '¿Qué pasa si se agrega del que limita?'], ['Al final sobró oxígeno.', 1, '¿Sobra el que limita?'], ['El frasco era azul.', 2, '¿Cambia las cantidades?']), bien: 'El que limita se acaba.' },
      'Que salga más al agregarlo la apoya; que sobre la debilita; el color no pesa.', 'Recuerda qué le pasa al reactivo límite al final.'),
    sol('En $2H_2 + O_2 \\to 2H_2O$ se tienen 8 moles de $H_2$ y 3 de $O_2$. ¿Cuántos moles de agua salen?', ['El hidrógeno alcanza para $8 \\div 2 =$ [[4]] recetas', 'El oxígeno alcanza para [[3]] recetas: es el límite', 'Salen $3 \\cdot 2 =$ [[6]] moles de agua'], ['8', '2', '11'], 'El oxígeno limita: 3 recetas de 2 moles de agua.', 'Cuenta cuántas recetas permite cada reactivo.'),
    err('Se tienen 10 moles de A y 6 de B para la receta $2A + B \\to C$. Alguien busca el límite.', ['Para 6 de B harían falta 12 de A', 'Solo hay 10 de A', 'B tiene menos moles: B es el límite'], 2, ['No alcanza A para todo B: A es el límite', 'Como hay más A, sobra A', 'Los dos se acaban a la vez'], 'A alcanza para 5 recetas y B, para 6: limita A, aunque tenga más moles.', '¿Cuántas recetas permite cada uno?'),
    opc('Si en $C + O_2 \\to CO_2$ se queman 24 g de carbono (C = 12, O = 16), la masa de $CO_2$ que se produce es:', ['24 g', '44 g', '56 g', '88 g'], 3, '24 g son 2 moles: 2 moles de $CO_2$ pesan $2 \\cdot 44 = 88$ g.', 'Pasa los gramos de carbono a moles.'),
  ]);

  const PH = {
    id: 'icf-repollo', title: 'El repollo que cambia de color',
    ficha: { autor: 'Club de ciencias', fuente: 'Feria escolar', fecha: 'Mayo de 2026' },
    paras: [
      'El jugo del repollo morado cambia de color según lo que se le eche. Con limón se vuelve rojo; con agua pura queda morado; con jabón, verde. Una sustancia que hace eso se llama indicador.',
      'Los ácidos, como el limón o el vinagre, liberan iones de hidrógeno, H⁺, cuando están en agua. Las bases, como el jabón o la leche de magnesia, liberan iones OH⁻ o atrapan los H⁺. Los ácidos suaves saben agrios y las bases se sienten jabonosas, pero probar o tocar una sustancia desconocida es peligroso: los ácidos y las bases fuertes queman.',
      'El pH mide qué tan ácida es una disolución. Va, por lo general, de 0 a 14: menos de 7 es ácida, 7 es neutra y más de 7 es básica. La escala no avanza de uno en uno, sino por diez: una disolución de pH 3 tiene diez veces más H⁺ que una de pH 4 y cien veces más que una de pH 5.',
      'El club midió varias cosas. El jugo de limón marcó 2; el café, 5; la leche, 6.5; la sangre ronda 7.4; el agua con jabón, 10; el blanqueador, 12. Al agregarle agua al jugo de limón, el pH subió hacia 7, pero por más agua que echaron nunca pasó de 7.',
      'Cuando un ácido y una base se mezclan en la proporción justa, se neutralizan: los H⁺ y los OH⁻ forman agua, y queda una sal. Por eso un antiácido, que es una base suave, alivia la acidez del estómago, y por eso se echa cal a los suelos muy ácidos. Si se echa base de más, la mezcla queda básica.',
      'El pH importa en todas partes. La sangre tiene sustancias que impiden que cambie mucho, porque con pocas décimas de más o de menos el cuerpo falla. La lluvia normal tiene pH cercano a 5.6, porque disuelve dióxido de carbono; la lluvia ácida, por gases de fábricas y carros, puede bajar de 4.5 y daña hojas, lagos y estatuas de mármol.',
    ],
  };
  const l3 = leccion('icf-cn-reacciones-3', 'Ácidos, bases y pH', guion(
    ['Ácidos y bases', 'Los ácidos liberan H⁺; las bases, OH⁻ o atrapan H⁺.'],
    ['La escala', 'Menos de 7 ácida, 7 neutra, más de 7 básica; cada paso es por 10.'],
    ['Neutralizar', 'Ácido y base en la proporción justa dan agua y sal.'],
    ['Diluir', 'Con agua, el pH se acerca a 7 sin pasarlo.']), [
    x('nivel-ph', 'La muestra A tiene pH **6**. Mueve la muestra B, que es **mil veces más ácida**.', { base: 6, k: -3 },
      'Mil es $10^3$: tres pasos hacia lo ácido, pH 3.', 'Cada paso de pH es por diez: cuenta cuántos hacen mil.'),
    x('genero-o-cita', '¿La sustancia es **ácida** o **básica**?', { doc: PH, rot: ['ácida', 'básica'],
      ...F(['Jugo de limón, pH 2', 0, 'Compara su pH con 7.'], ['Agua con jabón, pH 10', 1, 'Compara su pH con 7.'], ['Café, pH 5', 0, 'Compara su pH con 7.'], ['Sangre, pH 7.4', 1, 'Compara su pH con 7.'], ['Lluvia normal, pH 5.6', 0, 'Compara su pH con 7.']), bien: 'Menos o más de 7.' },
      'Limón, café y lluvia están por debajo de 7; jabón y sangre, por encima.', 'El 7 es el punto neutro: mira de qué lado está cada una.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: PH, nums: [3, 4, 5], pregunta: 'Queda en pie', queda: 'Un antiácido es una base suave.',
      ...T(['Un pH de 3 es apenas un poco más ácido que uno de 4.', 2, 'Busca cómo avanza la escala.'], ['Con mucha agua, el limón se vuelve básico.', 5, 'Busca de qué número nunca pasó.'], ['Al mezclar ácido y base, la mezcla siempre queda neutra.', 8, 'Busca qué pasa si se echa base de más.']), bien: 'Por diez, hasta 7 y sin pasarse.' },
      'La escala va por diez, el limón diluido nunca pasó de 7 y con base de más queda básica.', 'Saca la palabra clave: poco, agua, siempre.'),
    x('lee-escala', 'La gráfica muestra el pH de tres suelos. Pon cada valor y cuánto **subió** el primero para igualar al último.', { vals: [4, 5, 7], rot: ['suelo 1', 'suelo 2', 'suelo 3'], hi: 8, st: 2, et: ['suelo 1', 'suelo 2', 'suelo 3', 'subió'], ops: ['', '', ''], metas: ['4', '5', '7', '3'], fichas: ['4', '5', '7', '3', '6.5', '11', '2'],
      mira: ['Mira en qué línea termina.', 'Está a mitad de camino entre 4 y 6.', 'Está a mitad de camino entre 6 y 8.', 'Resta el primero al último.'], trampas: { '2:6.5': 'Cada línea vale 2: la mitad es 1.', '3:11': 'Eso es la suma.' }, ok: 'De 4 a 7.' },
      'Las líneas van de 2 en 2: 4, 5 y 7. Subió 3 pasos: mil veces menos H⁺.', 'Mira cuánto vale cada línea antes de leer.'),
    x('pista-tipo', 'Ata cada explicación a lo que se observó.', { doc: PH, lineas: ['el jugo de repollo se vuelve rojo', 'el antiácido alivia el estómago', 'al echar agua, el pH del limón sube hacia 7', 'el pH de la sangre casi no cambia'],
      ...T(['le echaron un ácido', 0, '¿Cuál habla del color?'], ['se neutralizan ácido y base', 1, '¿Cuál mezcla un ácido con una base suave?'], ['se diluye', 2, '¿Cuál agrega agua?'], ['hay sustancias que lo regulan', 3, '¿Cuál se mantiene estable?']), bien: 'Indicador, neutralizar, diluir y regular.' },
      'El rojo indica ácido, el antiácido neutraliza, el agua diluye y la sangre se regula.', 'Pregunta qué se agregó en cada caso y qué cambió.'),
    x('balanza-tesis', 'Hipótesis: «el lago está muriendo por la lluvia ácida». ¿Qué hace cada dato?', { doc: PH, tesis: 'El lago muere por la lluvia ácida',
      ...F(['Su pH bajó de 6.8 a 4.6 en veinte años de lluvias ácidas.', 0, '¿Hay acidez como se esperaba?'], ['Su pH no ha cambiado y apareció una fuga de petróleo.', 1, '¿Hay acidez? ¿Hay otra causa?'], ['El lago tiene forma de pera.', 2, '¿Dice algo de la acidez?']), bien: 'La causa debe dejar huella.' },
      'Que el pH baje la apoya; sin cambio y con otra causa se debilita; la forma no pesa.', 'Piensa qué debería medirse si la causa fuera esa.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 5 la oración que explica **qué ocurre con los iones** al neutralizar.', { doc: PH, nums: [5], apuesta: 'Los iones se juntan y forman agua.', ...S(['5.0'], { '5.1': 'Da dos usos de la neutralización.', '5.2': 'Dice qué pasa si se echa de más.' }), bien: 'H⁺ y OH⁻ forman agua.' },
      'La primera oración lo explica: los H⁺ y los OH⁻ forman agua, y queda una sal.', 'Busca la oración que nombra los dos iones.'),
    sol('Una muestra de pH 9 se lleva a pH 7. ¿Cómo cambia la cantidad de H⁺?', ['La muestra de pH 9 es [[básica]]', 'De 9 a 7 hay [[2]] pasos', 'La cantidad de H⁺ se multiplica por [[100]]'], ['ácida', '20', '16'], 'Cada paso hacia lo ácido multiplica por 10: $10 \\cdot 10 = 100$.', 'Recuerda: a menor pH, más H⁺.'),
    err('Alguien quiere subir el pH de un suelo de pH 4.', ['Un suelo de pH 4 es ácido', 'Para neutralizarlo hace falta una base', 'Se le echa vinagre, que tiene pH 3'], 2, ['Se le echa cal, que es una base', 'Se le echa jugo de limón, que tiene pH 2', 'Se le echa más tierra de pH 4'], 'El vinagre es un ácido y bajaría el pH: la cal lo sube.', '¿De qué lado de 7 está lo que se le echa?'),
    opc('La muestra P tiene pH 2 y la muestra Q, pH 4. Es correcto afirmar que:', ['Q es el doble de ácida que P', 'P es cien veces más ácida que Q', 'P es el doble de ácida que Q', 'Las dos son básicas'], 1, 'Dos pasos de pH: $10 \\cdot 10 = 100$ veces.', 'Cada paso de la escala es por diez.'),
  ]);

  const ARREPA = {
    id: 'icf-levadura', title: 'Por qué crece el pan',
    paras: [
      'Las levaduras son hongos diminutos que se alimentan del azúcar de la masa. Sin oxígeno, transforman cada molécula de azúcar en dos de alcohol y dos de dióxido de carbono. La ecuación es C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂.',
      'El gas queda atrapado en la masa y la infla. Si la masa se deja en un recipiente abierto, pierde un poco de masa, porque parte del gas se escapa; en uno cerrado, la balanza no cambia.',
      'En el horno, el alcohol se evapora, las burbujas se agrandan con el calor y las levaduras mueren. La corteza se dora por otras reacciones entre azúcares y proteínas.',
      'Hay otra forma de inflar: el polvo de hornear. Trae bicarbonato, que es una base, y un ácido seco. Al mojarse reaccionan y sueltan dióxido de carbono. Con exceso de bicarbonato la torta queda con sabor a jabón.',
      'Una panadera pesó: con 180 gramos de azúcar, que es un mol, esperaba 88 gramos de dióxido de carbono, que son dos moles. Obtuvo 66, porque no toda el azúcar alcanzó a fermentar.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: ARREPA, ...p }, e, { hint: h });
  return mundo('icf-cn-reacciones', 'Reacciones y Cantidades', 'ciencias', [l1, l2, l3], [
    ['icf-cn-reacciones-1', 'En la fermentación aparecen sustancias nuevas.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Qué produce la levadura?', [1]], ['¿Por qué cambia la masa en un recipiente abierto?', [2]], ['¿Cuánto gas se obtuvo?', [5]]] }, 'Los productos están en el 1, el recipiente en el 2 y lo obtenido en el 5.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-reacciones-1', 'Los átomos se conservan.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['Cada azúcar da dos moléculas de dióxido de carbono.', 0], ['En un recipiente cerrado el gas sigue adentro.', 1], ['La masa perdida es la del gas que salió.', 1], ['La levadura es de color café.', 2]] }, 'Las dos moléculas están escritas; lo del gas se deduce; el color no aparece.', 'Une el párrafo 2 con la conservación de la masa.')],
    ['icf-cn-reacciones-1', 'Evaporarse es un cambio físico.', opc('Según el texto, en el horno ocurren cambios físicos y químicos. Un cambio físico es:', ['El dorado de la corteza', 'La fermentación', 'La evaporación del alcohol', 'La reacción del bicarbonato'], 2, 'El alcohol evaporado sigue siendo alcohol.', 'Busca dónde no aparece una sustancia nueva.')],
    ['icf-cn-reacciones-2', 'Los coeficientes son la receta.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Se obtuvo menos producto del que permitía la receta.', cards: [['Se esperaban 40 g y salieron 30', true], ['Parte del reactivo no reaccionó', true], ['Salió justo lo calculado', false], ['Se pesó el frasco vacío', false]] }, '30 de 40 y lo que no reaccionó muestran un rendimiento menor; los otros no.', 'Busca casos en que salga menos de lo esperado.')],
    ['icf-cn-reacciones-2', 'La masa de los productos viene de los reactivos.', pl('intruso-excepto', 'La opción que no aparece en el texto', { ask: 'Del dióxido de carbono se dice todo esto, EXCEPTO:', cards: [['Infla la masa', [2]], ['También lo suelta el polvo de hornear', [4]], ['Se esperaban 88 gramos', [5]], ['Huele a limón', null]] }, 'Las tres primeras están en el 2, el 4 y el 5; la última no.', 'Busca cada una en su párrafo.')],
    ['icf-cn-reacciones-2', 'Rendimiento: obtenido sobre esperado.', opc('El rendimiento de la fermentación que midió la panadera fue del:', ['75 %', '22 %', '66 %', '133 %'], 0, 'Se divide lo obtenido: $66 \\div 88 = 0.75$.', 'Divide lo que obtuvo entre lo que esperaba.')],
    ['icf-cn-reacciones-3', 'Ácido y base reaccionan.', pl('resume-parrafo', 'Cada párrafo en una frase', { paras: [4, 3], options: ['Un ácido y una base sueltan el gas que infla.', 'El calor termina el trabajo.', 'El bicarbonato es un ácido.', 'El horno enfría la masa.'], key: [0, 1] }, 'El 4 habla del polvo de hornear; el 3, del horno; las otras dicen lo contrario.', 'El resumen no puede contradecir el párrafo.')],
    ['icf-cn-reacciones-3', 'Con base de más, la mezcla queda básica.', pl('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { labels: ['presenta la reacción', 'explica qué pasa con la masa', 'cuenta lo que hace el horno', 'muestra otra forma de inflar', 'da una medición', 'compara panaderías'], key: [0, 1, 2, 3, 4] }, 'Reacción, masa, horno, otra forma y medición; no hay panaderías.', 'Mira qué agrega cada párrafo.')],
    ['icf-cn-reacciones-3', 'El sabor a jabón delata una base.', opc('La torta con exceso de bicarbonato sabe a jabón porque:', ['Quedó ácida', 'Se evaporó el alcohol', 'Murió la levadura', 'Quedó básica'], 3, 'El bicarbonato sobrante es una base.', 'Recuerda qué clase de sustancia es el bicarbonato.')],
  ]);
})());
