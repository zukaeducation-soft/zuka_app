// Gimnasio del Preicfes, onceavos mundos y Electricidad (spec 2026-11-25-preicfes-estructura): Fuerza y Élite por mundo. Va después de gimnasio-icf-10.js.
{
  const { F } = ICF;
  const reto = (id, after, level, title, strategy, problem, steps, answer, wrap) => GYM_RETOS.push({ id: `gym-i-${id}`, after, level, title, strategy, problem, answer, wrap,
    steps: steps.map(([t, coach, game, q, params, explain, hints, note]) => ({ title: t, coach, ex: play(game, q, params, explain, { hint: hints[0] }), hints, note })) });
  const D = (id, title, paras) => ({ id: `gym-icf-${id}`, title, paras });

  reto('espa-1', ['icf-ma-espacio-1', 'icf-ma-espacio-2'], 2, 'El logo y la pila', 'Un movimiento a la vez', 'Un logo se mueve en el plano y una pila de cajas se mira de frente.', [
    ['El giro', 'Igual distancia al centro.', 'rota-punto', 'El logo gira **180°** alrededor del punto resaltado. Arrastra el punto a donde queda **A**.', { A: [3, -2], otros: [[5, -2], [3, 2]], g: 180 }, 'En media vuelta cambian los dos signos: $(-3, 2)$.', ['La imagen queda al lado opuesto del centro.', 'Cambia el signo de las dos coordenadas.'], '(−3, 2)'],
    ['La pila', 'La más alta de cada columna.', 'vista-frente', 'Plano desde arriba con la altura de cada torre. Toca lo que se ve **de frente**.', { h: [[1, 3, 1], [2, 1, 1], [1, 2, 4]], alto: 4 }, 'Se ven 2, 3 y 4.', ['Mira columna por columna.', 'De cada columna se ve la torre más alta.'], '2, 3, 4']],
    'A queda en (−3, 2) y de frente se ven 2, 3 y 4.', 'Signos para el giro; la más alta para la vista.');
  reto('espa-2', ['icf-ma-espacio-3'], 3, 'El terreno', 'Restar y promediar', 'Un terreno con forma de paralelogramo y un pozo en su centro.', [
    ['La esquina', 'Los lados opuestos van igual.', 'cuarto-vertice', 'A, B y C son esquinas **seguidas** del terreno. Arrastra **D**.', { A: [-5, 1], B: [-1, 4], C: [5, 2] }, 'De B a A: 4 a la izquierda y 3 abajo; desde C: $(1, -1)$.', ['D está junto a A y a C.', 'Repite desde C lo que se camina de B a A.'], '(1, −1)'],
    ['El pozo', 'El centro es el medio de una diagonal.', 'punto-medio', 'El pozo está en el medio de la diagonal que va de **A** a **B**. Arrástralo.', { A: [-5, 1], B: [5, 3] }, '$\\tfrac{-5 + 5}{2} = 0$ y $\\tfrac{1 + 3}{2} = 2$.', ['Promedia las dos coordenadas de lado.', 'Promedia también las dos alturas.'], '(0, 2)']],
    'D queda en (1, −1) y el pozo en (0, 2).', 'Restar para copiar un lado, promediar para el medio.');

  reto('gas-1', ['icf-cn-gases-1'], 2, 'El pistón y el globo', 'Qué queda fijo', 'Un gas en dos situaciones. Mira qué no cambia.', [
    ['El pistón', 'El producto no cambia.', 'boyle-embolo', 'Un gas ocupa **8 L** a **3 atm**. Con la misma temperatura pasa a **4 atm**. Mueve el émbolo.', { P: 3, V: 8, P2: 4, max: 12, paso: 1 }, '$3 \\cdot 8 = 24$ y $24 \\div 4 = 6$ L.', ['Multiplica la presión por el volumen de antes.', 'Ese producto debe dar igual con la presión nueva.'], '24 ÷ 4 = 6 L'],
    ['El globo', 'Volumen y kelvin.', 'charles-globo', 'Un globo de **4 L** a **200 K** pasa a **350 K** con la misma presión. Mueve su volumen.', { V: 4, T: 200, T2: 350, max: 10, paso: 0.5 }, '$4 \\cdot \\tfrac{350}{200} = 7$ L.', ['Compara los kelvin de antes y de después.', 'Cada 50 K de antes corresponden a un litro.'], '350 ÷ 50 = 7 L']],
    'El gas queda en 6 L y el globo, en 7 L.', 'Primero mira qué queda fijo.');
  reto('gas-2', ['icf-cn-gases-2'], 3, 'La limonada del bazar', 'Mismo soluto', 'Se prepara limonada y después se suaviza.', [
    ['Preparar', 'Soluto entre disolución.', 'concentra-agua', 'Hay **90 g** de azúcar. Mueve el volumen para que quede a **40 g/L**.', { g: 90, meta: 40, max: 4, paso: 0.25 }, '$90 \\div 40 = 2.25$ L.', ['Cada litro debe llevar 40 gramos.', 'Divide los gramos que hay entre los que lleva cada litro.'], '90 ÷ 40 = 2.25 L'],
    ['Suavizar', 'Los gramos no cambian.', 'diluye-agua', 'Quedan **1.5 L** a **40 g/L**. Mueve el agua que se **agrega** para dejarla a **30 g/L**.', { V: 1.5, C: 40, C2: 30, max: 3, paso: 0.25 }, 'Hay 60 g: a 30 g/L llenan 2 L. Se agrega 0.5 L.', ['Halla cuántos gramos de azúcar quedan.', 'Al volumen final réstale lo que ya había.'], '2 − 1.5 = 0.5 L']],
    'Se preparan 2.25 L y se agrega medio litro de agua.', 'El azúcar es la misma; cambia el volumen.');

  reto('elec-1', ['icf-cn-electrico-1'], 2, 'La linterna', 'Ohm y camino', 'Una linterna con una pila y dos resistencias.', [
    ['La corriente', 'Voltaje entre resistencia.', 'corriente-resistor', 'La pila es de **9 V** y la resistencia, de **6 Ω**. Mueve la corriente.', { V: 9, R: 6, max: 4, paso: 0.25 }, '$9 \\div 6 = 1.5$ A.', ['La corriente por la resistencia da el voltaje.', 'Divide el voltaje entre la resistencia.'], '9 ÷ 6 = 1.5 A'],
    ['La otra', 'En serie se suman.', 'serie-resistencia', 'Con **30 V** pasan **3 A** por dos resistencias en serie. Una es de **6 Ω**. Mueve la otra.', { V: 30, I: 3, R1: 6, max: 12 }, '$30 \\div 3 = 10$ y $10 - 6 = 4$ Ω.', ['Halla la resistencia de todo el camino.', 'Quítale la que ya conoces.'], '10 − 6 = 4 Ω']],
    'Pasan 1.5 A y la otra resistencia es de 4 Ω.', 'Ohm para todo el camino y después resta.');
  const CLIPS = D('clips', 'El clavo y los clips', [
    'Un grupo enrolló alambre en un clavo de hierro y lo conectó a una pila. Con 20 vueltas atrajo 4 clips; con 40, 8 clips; con 60, 12 clips. Sin pila no atrajo ninguno.',
    'Después usó una barra de madera con 60 vueltas: atrajo uno.']);
  reto('elec-2', ['icf-cn-electrico-2'], 3, 'El clavo y los clips', 'Comparar con y sin', 'Un grupo prueba electroimanes. Interpreta sus datos.', [
    ['Deducir', 'Usa los datos.', 'dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CLIPS, nums: [1, 2], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'], ...F(['Con 40 vueltas atrajo 8 clips.', 0, 'Búscala en el párrafo 1.'], ['Con 50 vueltas atraería unos 10 clips.', 1, 'Mira cuántos clips hay por vuelta.'], ['El hierro ayuda a atraer más.', 1, 'Compara 60 vueltas con hierro y con madera.'], ['Los clips eran rojos.', 2, '¿Se dice el color?']), luz: [[1, 'con 40, 8 clips'], [2, 'atrajo uno']], bien: 'Proporción y comparación.' }, 'Los 8 están escritos; los 10 y el hierro se deducen; el color no.', ['Busca cuántos clips corresponden a cada diez vueltas.', 'Compara los dos casos de 60 vueltas.'], '2 clips por cada 10 vueltas'],
    ['La fuerza', 'La distancia, al cuadrado.', 'fuerza-cambia', 'Dos cargas se repelen con fuerza **72**. ¿Cuánto vale en cada cambio?', { et: ['al doble de distancia', 'al triple de distancia', 'una carga a la mitad'], metas: ['18', '8', '36'], fichas: ['18', '8', '36', '24', '144'], mira: ['Al doble, cuatro veces menor.', 'Al triple, nueve veces menor.', 'La fuerza baja igual que la carga.'], trampas: { '1:24': 'La distancia va al cuadrado.' }, ok: 'Cuadrado para la distancia.' }, '$72 \\div 4 = 18$; $72 \\div 9 = 8$; y $72 \\div 2 = 36$.', ['La distancia cuenta al cuadrado.', 'La carga cuenta sin cuadrado.'], '18, 8 y 36']],
    'Más vueltas y hierro atraen más; la distancia va al cuadrado.', 'Compara casos en los que cambia una sola cosa.');
}
