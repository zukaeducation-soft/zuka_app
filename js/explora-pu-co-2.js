// Preuniversitario · pu-co-2 «Permutaciones» (Explora). Los ejemplos no son los de los ejercicios.
{
  const fila = (n, y, w = 54) => Array.from({ length: n }, (_, i) => ({ x: 170 + (i - (n - 1) / 2) * (w + 10), y, w }));
  const FAC = [1, 1, 2, 6, 24, 120, 720, 5040, 40320];
  // n puestos con las opciones que quedan en cada uno.
  const puestos = (v, K) => {
    const n = Math.round(v.n), w = Math.min(50, 290 / n); let h = '';
    for (let i = 0; i < n; i++) h += K.r(170 + (i - n / 2) * w + 2, 50, w - 4, 46, 'fa', 8) + K.t(170 + (i - n / 2 + 0.5) * w, 80, n - i, 'b ta');
    return h + K.t(170, 32, `${n} personas, ${n} puestos`, 'tm');
  };

  xpLec('pu-co-2', [
    ['Ordenar a todos',
      xpMira('fichas', 'Empecemos por la idea: al ordenar, cada puesto **gasta** una opción.', { slots: fila(4, 90), fichas: ['A', 'B', 'C', 'D'], alto: 130, fondo: (K, v) => K.t(170, 32, v.p || '', 'b ta') }, [
        ['Cuatro cuadros distintos en una pared. ¿De cuántas maneras se cuelgan en fila?', {}],
        ['Para el primer puesto hay 4 opciones. Ponemos uno.', { pon: { 0: 'C' }, v: { p: '4' } }],
        ['Para el segundo ya solo quedan 3.', { pon: { 1: 'A' }, v: { p: '4 · 3' } }],
        ['Luego 2, y al final 1.', { pon: { 2: 'D', 3: 'B' }, v: { p: '4 · 3 · 2 · 1' } }],
        ['Se multiplican: 24 órdenes. Se escribe 4! y se lee «cuatro factorial».', { v: { p: '4! = 24' } }, '$4! = 4 \\cdot 3 \\cdot 2 \\cdot 1 = 24$'],
      ], 'Ordenar n cosas distintas: $n! = n \\cdot (n-1) \\cdots 2 \\cdot 1$ maneras.'),
      xpHaz('dibujo', 'Un grupo de amigos puede hacer fila de 5 040 maneras. Arrastra hasta descubrir cuántos son.', { dib: puestos, v: { n: 2 }, metas: { n: 7 }, alto: 170, manijas: [{ k: 'n', min: 2, max: 8, paso: 1, et: 'amigos' }],
        lee: v => `$${v.n}! = ${FAC[v.n]}$`, dice: v => `Con ${v.n} amigos hay ${FAC[v.n]} filas distintas.` }, '$7! = 5\\,040$: son siete.')],
    ['Solo algunos puestos',
      xpMira('fichas', 'Segunda idea: si solo hay **algunos puestos**, se deja de multiplicar antes.', { slots: fila(3, 90, 62), fichas: ['Ana', 'Beto', 'Ciro', 'Dora', 'Eva', 'Fito'], alto: 130, fondo: (K, v) => K.t(170, 32, v.p || '', 'b ta') }, [
        ['Seis amigos, y en la mesa hay tres cargos: capitán, portero y árbitro.', {}],
        ['Para capitán hay 6 opciones.', { pon: { 0: 'Dora' }, v: { p: '6' } }],
        ['Portero: quedan 5. Árbitro: quedan 4.', { pon: { 1: 'Ana', 2: 'Fito' }, v: { p: '6 · 5 · 4' } }],
        ['Y ahí se para: no hay más puestos. Son 120 repartos.', { v: { p: '6 · 5 · 4 = 120' } }, '$6 \\cdot 5 \\cdot 4 = 120$'],
        ['Aquí el orden importa: Ana de portera y Dora de capitana no es lo mismo que al revés.', { marca: [0, 1] }],
      ], 'Con k puestos se multiplican k números que bajan de uno en uno desde n.'),
      xpHaz('fichas', 'De 7 candidatos se elige presidente y secretario. Pon las opciones de cada cargo y el total.', { slots: [{ x: 70, y: 56, w: 76, et: 'presidente' }, { x: 166, y: 56, w: 76, et: 'secretario' }, { x: 270, y: 56, w: 80, et: 'total' }], fichas: ['7', '6', '42', '49', '21', '2'], meta: ['7', '6', '42'], alto: 104, fondo: K => K.t(118, 61, '·', 'b') + K.t(218, 61, '=', 'b'), pista: 'Quien es presidente no puede ser también secretario.' }, '$7 \\cdot 6 = 42$.')],
    ['Letras repetidas',
      xpMira('fichas', 'Tercera idea: si hay cosas **iguales**, algunos órdenes se ven idénticos.', { slots: fila(3, 88), fichas: ['A₁', 'L', 'A₂', 'A', 'A'], alto: 128, fondo: (K, v) => K.t(170, 32, v.p || '', 'b ta') }, [
        ['Las letras de ALA. Si las dos A fueran distintas, habría 3! = 6 órdenes.', { pon: { 0: 'A₁', 1: 'L', 2: 'A₂' }, v: { p: '3! = 6' } }],
        ['Pero al cambiar una A por la otra, la palabra se ve igual.', { saca: [0, 2], pon: { 0: 'A₂', 2: 'A₁' } }],
        ['Cada palabra se contó 2 veces: una por cada orden de las dos A.', { saca: [0, 2], pon: { 0: 'A', 2: 'A' }, v: { p: '6 ÷ 2' } }],
        ['Entonces se divide entre 2!: quedan 3 palabras. ALA, AAL y LAA.', { v: { p: '3! ÷ 2! = 3' } }, '$\\tfrac{3!}{2!} = 3$'],
      ], 'Con repetidas: el factorial del total entre el factorial de cada grupo de iguales.'),
      xpHaz('fichas', '¿Cuántos órdenes distintos tienen las letras de COCO? Completa la cuenta.', { slots: [{ x: 66, y: 60, w: 80, et: '4!' }, { x: 170, y: 60, w: 80, et: '2! · 2!' }, { x: 276, y: 60, w: 80, et: 'órdenes' }], fichas: ['24', '4', '6', '12', '2', '8'], meta: ['24', '4', '6'], alto: 108, fondo: K => K.t(118, 65, '÷', 'b') + K.t(223, 65, '=', 'b'), pista: 'Hay dos C iguales y dos O iguales: 2! por 2!.' }, '$\\tfrac{4!}{2! \\cdot 2!} = \\tfrac{24}{4} = 6$.')],
    ['Los que van juntos',
      xpMira('fichas', 'Cuarta idea: los que van **juntos** se atan y cuentan como uno.', { slots: fila(4, 90), fichas: ['M', 'N', 'P', 'Q'], alto: 130, fondo: (K, v) => K.t(170, 32, v.p || '', 'b ta') + K.f(v.b || 0, K.r(42 + (v.bx || 0) * 64, 62, 128, 56, 'fg', 12)) }, [
        ['Cuatro fichas en fila, con una condición: M y N van pegadas.', {}],
        ['Las atamos en un paquete. Ahora se ordenan 3 cosas: el paquete, P y Q.', { v: { b: 1, bx: 0, p: '3! = 6' }, pon: { 0: 'M', 1: 'N', 2: 'P', 3: 'Q' } }],
        ['Pero dentro del paquete también hay orden: M-N o N-M, 2 maneras.', { saca: [0, 1], pon: { 0: 'N', 1: 'M' }, v: { p: '3! · 2!' } }],
        ['En total, 6 por 2: doce.', { v: { p: '6 · 2 = 12' } }, '$3! \\cdot 2! = 12$'],
      ], 'Ata a los que van juntos, ordena los paquetes y multiplica por los órdenes de adentro.'),
      xpHaz('fichas', 'Cinco libros en fila, y tres son de una saga que va junta. Completa: paquetes, orden adentro y total.', { slots: [{ x: 66, y: 60, w: 80, et: 'paquetes' }, { x: 170, y: 60, w: 80, et: 'adentro' }, { x: 276, y: 60, w: 80, et: 'total' }], fichas: ['6', '6', '36', '120', '24', '12'], meta: ['6', '6', '36'], alto: 108, fondo: K => K.t(118, 65, '·', 'b') + K.t(223, 65, '=', 'b'), pista: 'La saga es un paquete: con los otros dos libros son 3 cosas. Adentro hay 3 tomos.' }, '$3! \\cdot 3! = 6 \\cdot 6 = 36$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Con 1, 3, 4, 6 y 7, sin repetir, se forman números de 3 cifras que terminen en impar. Llena las casillas en orden y el total.', { slots: [{ x: 50, y: 60, w: 70, et: 'última' }, { x: 134, y: 60, w: 70, et: 'primera' }, { x: 218, y: 60, w: 70, et: 'del medio' }, { x: 300, y: 60, w: 70, et: 'total' }], fichas: ['3', '4', '3', '36', '60', '5', '2'], meta: ['3', '4', '3', '36'], alto: 108, fondo: K => K.t(92, 65, '·', 'b') + K.t(176, 65, '·', 'b') + K.t(259, 65, '=', 'b'), pista: 'La última es la exigente: solo 1, 3 o 7.' }, '$3 \\cdot 4 \\cdot 3 = 36$: primero la casilla exigente.')],
  ], 'Factorial, puestos que se agotan, repetidas que se dividen y paquetes que van juntos.');
}
