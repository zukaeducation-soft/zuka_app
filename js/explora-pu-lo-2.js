// Preuniversitario · pu-lo-2 «Negación y De Morgan» (Explora). Los ejemplos no son los de los ejercicios.
{
  const VF = ['', 'V', 'F'];
  // Dos conjuntos: zonas por máscara (1 = A, 2 = B, 3 = ambas, 0 = afuera) que se pintan.
  const AX = 135, BX = 205, CY = 92, R = 62;
  const venn = (v, K) => {
    // Afuera de la unión: se pinta todo y se tapan los círculos.
    let h = K.r(20, 10, 300, 166, v.fuera > 0.5 ? 'fa' : 'fc', 8);
    h += v.i > 0.5 ? '<path class="xf fop" d="M170 40.8 A62 62 0 0 1 170 143.2 A62 62 0 0 1 170 40.8 Z"/>' : K.c(AX, CY, R, 'fop') + K.c(BX, CY, R, 'fop');
    return h + K.c(AX, CY, R, v.A > 0.5 ? 'fa' : 'fn') + K.c(BX, CY, R, v.B > 0.5 ? 'fg' : 'fn') + K.t(AX - 34, CY - 68, v.ta, 's') + K.t(BX + 34, CY - 68, v.tb, 's') + K.t(170, 168, v.t || '', 'ta');
  };
  const focos = (v, K) => v.b.map((x, i) => K.c(50 + i * 60, 70, 21, x ? 'fG' : 'fc')).join('') + K.t(170, 128, v.t || '', 'b ta');
  const T = (cols, o) => ({ f: 4, c: 4, cols, estados: 3, rot: VF, unoAUno: true, cw: 70, ch: 38, dados: { 0: 1, 1: 1, 4: 1, 5: 2, 8: 2, 9: 1, 12: 2, 13: 2 }, ...o });

  xpLec('pu-lo-2', [
    ['Negar es decir lo contrario, completo',
      xpMira('dibujo', 'Empecemos por la idea: negar una frase es decir cuándo **deja de ser verdad**.', { dib: venn, v: { s: 0, i: 0, A: 1, B: 1, fuera: 0, ta: 'llueve', tb: 'hace frío', t: 'llueve o hace frío' }, alto: 184 }, [
        ['«Llueve o hace frío» es verdad en cualquiera de los dos círculos.', {}],
        ['¿Cuándo es falsa? Solo afuera de los dos: ni llueve ni hace frío.', { A: 0, B: 0, fuera: 1, t: 'no llueve y no hace frío' }],
        ['La negación de una «o» es una «y» de negaciones.', {}, '$\\neg(p \\vee q) = \\neg p \\wedge \\neg q$'],
        ['Con «llueve y hace frío» pasa al revés: basta que falle una para que sea falsa.', { t: 'no llueve o no hace frío', i: 1 }, '$\\neg(p \\wedge q) = \\neg p \\vee \\neg q$'],
        ['Son las leyes de De Morgan: se niega cada parte y se cambia el conectivo.', {}],
      ], 'De Morgan: niega cada parte y cambia «y» por «o» o «o» por «y».'),
      xpHaz('fichas', 'Arma la negación de «**compré pan o leche**».', { slots: [{ x: 170, y: 32, w: 190 }, { x: 170, y: 78, w: 60 }, { x: 170, y: 124, w: 190 }], fichas: ['no compré pan', 'no compré leche', 'y', 'o', 'compré pan'], cumple: q => q[1][0] === 'y' && [...q[0], ...q[2]].sort().join() === 'no compré leche,no compré pan', sol: ['no compré pan', 'y', 'no compré leche'], alto: 150, pista: 'Para que «pan o leche» sea falso deben faltar los dos.' }, 'No compré pan **y** no compré leche: tienen que faltar los dos.')],
    ['Comprobarlo con la tabla',
      xpMira('rejilla', 'Segunda idea: dos frases dicen lo mismo si sus columnas **coinciden**.', T(['p', 'q', '¬(p∧q)', '¬p∨¬q']), [
        ['Comparemos «no es cierto que p y q» con «no p o no q».', {}],
        ['«p y q» solo es verdad en la primera fila. Su negación, solo falsa ahí.', { x: [2], on: [6, 10, 14] }],
        ['Ahora «no p o no q»: en la primera fila las dos son verdaderas, así que es F.', { x: [3] }],
        ['En las demás alguna es falsa, y con eso basta: V, V y V.', { on: [7, 11, 15] }],
        ['Las dos columnas son iguales: dicen lo mismo.', { luz: [2, 3, 6, 7, 10, 11, 14, 15] }],
      ], 'Si las columnas coinciden en todas las filas, las frases son equivalentes.'),
      xpHaz('rejilla', 'La columna de $\\neg(p \\vee q)$ ya está. Llena la de $\\neg p \\wedge \\neg q$ y compara.', T(['p', 'q', '¬(p∨q)', '¬p∧¬q'], { dados: { 0: 1, 1: 1, 2: 2, 4: 1, 5: 2, 6: 2, 8: 2, 9: 1, 10: 2, 12: 2, 13: 2, 14: 1 }, meta: { 3: 2, 7: 2, 11: 2, 15: 1 }, dice: () => 'Es V solo si p es F y q es F.', lleno: c => [3, 7, 11, 15].every(i => c[i]), pista: 'Solo una fila tiene p falsa y q falsa.' }), 'F, F, F, V: igual que la otra columna.')],
    ['Todos, alguno, ninguno',
      xpMira('dibujo', 'Tercera idea: para tumbar un «**todos**» basta un solo caso.', { dib: focos, v: { b: [1, 1, 1, 1, 1], t: 'todos prendidos' }, alto: 145 }, [
        ['«Todos los bombillos están prendidos». Ahora es verdad.', {}],
        ['¿Qué es lo mínimo para que sea falsa? Apagar uno.', { b: [1, 1, 0, 1, 1], t: 'alguno apagado' }],
        ['Su negación es «alguno está apagado», no «todos están apagados».', {}],
        ['Ahora «alguno está prendido». Para tumbarla hay que apagarlos todos.', { b: [0, 0, 0, 0, 0], t: 'ninguno prendido' }],
        ['Todos contra alguno no; alguno contra ninguno. Esas son las parejas.', { t: 'alguno ↔ ninguno' }],
      ], 'La negación de «todos son» es «alguno no es». La de «alguno es», «ninguno es».'),
      xpHaz('rejilla', 'Un cartel dice «**ningún** bombillo está prendido». Vuélvelo falso tocando lo mínimo.', { f: 1, c: 6, cw: 50, ch: 50, rot: ['○', '●'], unoAUno: true, cumple: c => c.reduce((a, b) => a + b, 0) === 1, sol: [2], dice: c => { const n = c.reduce((a, b) => a + b, 0); return n === 0 ? 'Todos apagados: el cartel dice la verdad.' : n === 1 ? 'Con uno basta: ya es falso.' : 'Prendiste de más: con menos también era falso.'; } }, 'Con uno prendido ya es falso: la negación es «**alguno** está prendido».')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Arma la negación de «**todos pagaron y ninguno llegó tarde**».', { slots: [{ x: 170, y: 32, w: 190 }, { x: 170, y: 78, w: 60 }, { x: 170, y: 124, w: 190 }], fichas: ['alguno no pagó', 'alguno llegó tarde', 'o', 'y', 'nadie pagó'], cumple: q => q[1][0] === 'o' && [...q[0], ...q[2]].sort().join() === 'alguno llegó tarde,alguno no pagó', sol: ['alguno no pagó', 'o', 'alguno llegó tarde'], alto: 150, pista: 'La «y» pasa a «o»; «todos» pasa a «alguno no», y «ninguno», a «alguno».' }, 'Alguno no pagó **o** alguno llegó tarde: basta que falle una parte.')],
  ], 'Negar cada parte, cambiar el conectivo, y tumbar un «todos» con un solo caso.');
}
