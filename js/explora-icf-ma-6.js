// Preicfes · Matemáticas, mundo 6 «Triángulos y Semejanza» (Explora, escenas «dibujo» y «fichas»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Recta con un rayo a g grados.
  const rayo = (v, K) => { const [x, y] = K.at(170, 150, 120, v.g); return K.l(30, 150, 310, 150, 'lm gr') + K.sec(170, 150, 50, 0, v.g, 'fa') + K.f(v.f, K.sec(170, 150, 40, v.g, 180, 'fg')) + K.l(170, 150, x, y, 'la gr') + K.t(170, 182, v.t || '', 'ta'); };
  // Triángulo con ángulos a y b en la base.
  const tri = (v, K) => { const L = 220, ta = Math.tan(v.a * Math.PI / 180), tb = Math.tan(v.b * Math.PI / 180), h = L / (1 / ta + 1 / tb), x = h / ta, A = [60, 160], B = [280, 160], C = [60 + x, 160 - h]; return K.p([A, B, C], 'fn') + K.ang(A, B, C, 26, `${Math.round(v.a)}°`, 'fa') + K.ang(B, A, C, 26, `${Math.round(v.b)}°`, 'fg') + K.f(v.f, K.ang(C, A, B, 22, `${Math.round(180 - v.a - v.b)}°`, 'ff')) + K.t(170, 192, v.t || '', 'ta'); };
  // Tres varillas.
  const vara = (v, K) => [[v.a, 'fa'], [v.b, 'fg'], [v.c, 'ff']].map(([n, c], i) => K.r(50, 30 + i * 40, n * 18, 24, c, 2) + K.t(42, 47 + i * 40, Math.round(n), 's tm', 'end')).join('') + K.t(170, 170, v.t || '', 'ta');
  // Cuadrados sobre los lados: 3, 4 y 5.
  const pit = (v, K) => { const u = v.u, x = 130, y = 130; return K.p([[x, y], [x + 4 * u, y], [x, y - 3 * u]], 'fn') + K.f(v.p, K.r(x - 3 * u, y - 3 * u, 3 * u, 3 * u, 'fa', 0) + K.t(x - 1.5 * u, y - 1.5 * u + 5, '9')) + K.f(v.q, K.r(x, y, 4 * u, 4 * u, 'fg', 0) + K.t(x + 2 * u, y + 2 * u + 5, '16')) + K.f(v.r, K.p([[x, y - 3 * u], [x + 4 * u, y], [x + 7 * u, y - 4 * u], [x + 3 * u, y - 7 * u]], 'ff') + K.t(x + 3.5 * u, y - 3.5 * u + 5, '25')) + K.t(170, 216, v.t || '', 'ta'); };
  // Dos triángulos semejantes: palo y árbol.
  const som = (v, K) => K.l(20, 160, 320, 160, 'lm') + K.p([[50, 160], [50 + 2 * 14, 160], [50, 160 - 14 * 3]], 'fa') + K.t(40, 144, '3', 's tm', 'end') + K.t(64, 178, '2', 's tm') + K.p([[150, 160], [150 + 2 * 14 * v.k, 160], [150, 160 - 14 * 3 * v.k]], 'fg') + K.t(150 + 14 * v.k, 178, Math.round(2 * v.k), 's tm') + K.f(v.f, K.t(144, 160 - 21 * v.k, Math.round(3 * v.k), 's tg', 'end')) + K.t(250, 24, v.t || '', 'ta');
  // Cuadrado k × k.
  const cuad = (v, K) => { const n = Math.round(v.k), u = 24; let s = ''; for (let i = 0; i < n; i++) for (let j = 0; j < n; j++) s += K.r(170 + (i - n / 2) * u, 24 + j * u, u - 1, u - 1, 'fa', 1); return s + K.t(170, 186, v.t || '', 'ta'); };
  // Triángulo rectángulo con θ a la izquierda.
  const rec = (v, K) => { const x = 70, y = 150, b = 40 * v.e, h = 30 * v.e; return K.p([[x, y], [x + b, y], [x + b, y - h]], 'fn') + K.l(x, y, x + b, y, 'lg gr') + K.l(x + b, y, x + b, y - h, 'lf gr') + K.l(x, y, x + b, y - h, 'la gr') + K.t(x + 24, y - 6, 'θ', 's') + K.f(v.f, K.t(x + b / 2, y + 18, `ady ${4 * Math.round(v.e)}`, 's tg') + K.t(x + b + 8, y - h / 2, `op ${3 * Math.round(v.e)}`, 's tf', 'start') + K.t(x + b / 2 - 14, y - h / 2 - 8, `hip ${5 * Math.round(v.e)}`, 's ta', 'end')) + K.t(170, 190, v.t || '', 'ta'); };

  xpLec('icf-ma-forma-1', [
    ['Media vuelta',
      xpMira('dibujo', 'Empecemos por la idea: dos ángulos vecinos sobre una recta completan **180°**.', { dib: rayo, v: { g: 60, f: 0, t: '' }, alto: 194 }, [
        ['Un rayo sobre la recta abre sesenta grados.', { t: '60°' }],
        ['El que falta completa la media vuelta.', { f: 1, t: '60° + 120°' }, '$180 - 60 = 120$'],
        ['Si el rayo se abre, el vecino se cierra.', { g: 110, t: '110° + 70°' }, '$180 - 110 = 70$'],
        ['En la mitad, los dos miden noventa.', { g: 90, t: '90° + 90°' }],
        ['Al cruzarse dos rectas, los de enfrente son iguales.', {}],
      ], 'Vecinos: suman 180°. Opuestos: iguales.'),
      xpHaz('dibujo', 'Gira el rayo hasta que el vecino mida **45°**.', { dib: (v, K) => rayo({ g: v.g, f: 1 }, K), v: { g: 60 }, metas: { g: 135 }, alto: 250, manijas: [{ k: 'g', min: 15, max: 165, paso: 15, et: 'ángulo' }], lee: v => `$180 - ${v.g} = ${180 - v.g}$`, dice: () => 'Los dos llenan media vuelta.' }, '$180 - 45 = 135$.')],
    ['Tres ángulos',
      xpMira('dibujo', 'Segunda idea: los tres ángulos de un triángulo suman **180°**.', { dib: tri, v: { a: 60, b: 50, f: 0, t: '' }, alto: 200 }, [
        ['Uno mide sesenta y otro, cincuenta.', {}],
        ['El tercero completa media vuelta.', { f: 1, t: '60 + 50 + 70' }, '$180 - 110 = 70$'],
        ['Si cambia uno, los otros se acomodan.', { a: 40, t: '40 + 50 + 90' }, '$180 - 90 = 90$'],
        ['Nunca se pasa ni falta.', { a: 50, b: 50, t: '50 + 50 + 80' }],
        ['El exterior de una punta suma los otros dos.', {}],
      ], 'Interiores: 180°. Exterior: la suma de los dos lejanos.'),
      xpHaz('fichas', 'En un triángulo, dos ángulos miden 35° y 85°. Pon el tercero y el exterior que está junto a él.', { slots: fila('tercero', 'su exterior'), fichas: ['60', '120', '50', '95', '145'], meta: ['60', '120'], alto: 96, pista: 'El exterior es vecino del tercero, o la suma de los otros dos.' }, '$180 - 120 = 60$ y $35 + 85 = 120$.')],
    ['¿Cierra?',
      xpMira('dibujo', 'Tercera idea: un lado no puede ser tan largo como **los otros dos juntos**.', { dib: vara, v: { a: 5, b: 4, c: 6, t: '' }, alto: 182 }, [
        ['Cinco y cuatro juntas hacen nueve.', { t: '5 + 4 = 9' }],
        ['La de seis es menor que nueve: cierra.', { t: '6 < 9: cierra' }],
        ['Con diez, las otras no la alcanzan.', { c: 10, t: '10 > 9: no cierra' }],
        ['Con nueve queda una línea, sin triángulo.', { c: 9, t: '9 = 9: no cierra' }],
        ['Y con una muy corta la de cinco y la de cuatro no se juntan.', { c: 1, t: '4 + 1 = 5: no cierra' }],
      ], 'El tercer lado va entre la resta y la suma de los otros.'),
      xpHaz('fichas', 'Dos lados miden 8 y 3. Pon el entero más corto y el más largo que sirven.', { slots: fila('más corto', 'más largo'), fichas: ['6', '10', '5', '11', '3'], meta: ['6', '10'], alto: 96, pista: 'Más que la resta y menos que la suma.' }, 'Entre 5 y 11, sin tocarlos: de 6 a 10.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un triángulo isósceles tiene dos lados de 4 y 9. Pon el lado que se repite y el perímetro.', { slots: fila('se repite', 'perímetro'), fichas: ['9', '22', '4', '17', '13'], meta: ['9', '22'], alto: 96, pista: 'Prueba si 4, 4 y 9 cierra.' }, '4, 4 y 9 no cierra: es 9, 9 y 4, que suma 22.')],
  ], 'Media vuelta, tres ángulos y el largo que cierra.');

  xpLec('icf-ma-forma-2', [
    ['Cuadrados sobre los lados',
      xpMira('dibujo', 'Empecemos por la idea: en un triángulo **rectángulo**, dos cuadrados llenan el tercero.', { dib: pit, v: { u: 15, p: 0, q: 0, r: 0, t: '' }, alto: 224 }, [
        ['Los catetos miden tres y cuatro.', {}],
        ['El cuadrado sobre el de tres tiene nueve.', { p: 1 }, '$3^2 = 9$'],
        ['El cuadrado sobre el de cuatro, dieciséis.', { q: 1 }, '$4^2 = 16$'],
        ['Juntos llenan el de la hipotenusa: veinticinco.', { r: 1 }, '$9 + 16 = 25$'],
        ['Entonces la hipotenusa mide cinco.', { t: '3, 4 y 5' }, '$5^2 = 25$'],
      ], 'Hipotenusa al cuadrado = suma de los catetos al cuadrado.'),
      xpHaz('fichas', 'Los catetos miden 5 y 12. Pon la suma de sus cuadrados y la hipotenusa.', { slots: fila('suma', 'hipotenusa'), fichas: ['169', '13', '17', '119', '84'], meta: ['169', '13'], alto: 96, pista: 'Eleva cada uno, suma y busca qué número al cuadrado da eso.' }, '$25 + 144 = 169 = 13^2$.')],
    ['Falta un cateto',
      xpMira('fichas', 'Segunda idea: para un **cateto** se resta.', { slots: fila('hipotenusa²', 'cateto²', 'otro²', 'otro').map(s => ({ ...s, w: 66 })), fichas: ['100', '36', '64', '8'], alto: 96 }, [
        ['La hipotenusa mide diez y un cateto, seis.', {}],
        ['El cuadrado grande tiene cien.', { pon: { 0: '100' } }, '$10^2 = 100$'],
        ['El del cateto, treinta y seis.', { pon: { 1: '36' } }, '$6^2 = 36$'],
        ['Lo que falta para llenar el grande.', { pon: { 2: '64' } }, '$100 - 36 = 64$'],
        ['Y el cateto mide ocho.', { pon: { 3: '8' } }, '$8^2 = 64$'],
      ], 'Hipotenusa: suma. Cateto: resta.'),
      xpHaz('fichas', 'Hipotenusa 15 y cateto 9. Pon la resta de los cuadrados y el otro cateto.', { slots: fila('resta', 'cateto'), fichas: ['144', '12', '6', '306', '17'], meta: ['144', '12'], alto: 96, pista: 'Quita el cuadrado del cateto al de la hipotenusa.' }, '$225 - 81 = 144 = 12^2$.')],
    ['Familias y atajos',
      xpMira('fichas', 'Tercera idea: los múltiplos de una **familia** también sirven.', { slots: fila('3·k', '4·k', '5·k'), fichas: ['30', '40', '50'], alto: 96 }, [
        ['Toma tres, cuatro y cinco.', {}],
        ['Multiplica por diez el primero.', { pon: { 0: '30' } }],
        ['Y los otros dos también.', { pon: { 1: '40', 2: '50' } }],
        ['Sigue siendo rectángulo: se agrandó parejo.', {}, '$900 + 1\\,600 = 2\\,500$'],
        ['Otras familias: 5, 12, 13 y 8, 15, 17.', {}],
      ], 'Reconoce 3-4-5, 5-12-13, 8-15-17 y sus múltiplos.'),
      xpHaz('fichas', 'Un parque mide 24 m por 32 m. Pon lo que mide la diagonal y cuánto ahorra cruzar por ella.', { slots: fila('diagonal', 'ahorro'), fichas: ['40', '16', '56', '8', '28'], meta: ['40', '16'], alto: 96, pista: 'Es la familia 3-4-5 por ocho.' }, '$8 \\cdot 5 = 40$ y $56 - 40 = 16$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un árbol se quiebra a 5 m del suelo y la punta cae a 12 m del pie. Pon la parte caída y la altura que tenía.', { slots: fila('parte caída', 'altura'), fichas: ['13', '18', '17', '12', '7'], meta: ['13', '18'], alto: 96, pista: 'La parte caída es la hipotenusa.' }, '$25 + 144 = 13^2$ y $5 + 13 = 18$.')],
  ], 'Dos cuadrados llenan el tercero: suma o resta.');

  xpLec('icf-ma-forma-3', [
    ['Misma forma',
      xpMira('dibujo', 'Empecemos por la idea: en figuras **semejantes** todo crece por el mismo número.', { dib: som, v: { k: 1, f: 0, t: '' }, alto: 190 }, [
        ['Un palo de 3 da una sombra de 2.', {}],
        ['Un poste da una sombra de 6: el triple.', { k: 3, t: 'sombra × 3' }, '$6 \\div 2 = 3$'],
        ['El Sol llega igual: los ángulos no cambian.', {}],
        ['Entonces la altura también es el triple.', { f: 1, t: 'altura × 3' }, '$3 \\cdot 3 = 9$'],
        ['No se suma: se multiplica.', {}],
      ], 'Halla por cuánto creció un lado y úsalo en los demás.'),
      xpHaz('fichas', 'Dos triángulos son semejantes: 5, 7 y 9; y 20, ?, ?. Pon los otros dos.', { slots: fila('el de 7', 'el de 9'), fichas: ['28', '36', '22', '24', '35'], meta: ['28', '36'], alto: 96, pista: 'Mira por cuánto se multiplicó el 5.' }, 'Por 4: $7 \\cdot 4 = 28$ y $9 \\cdot 4 = 36$.')],
    ['Paralelas',
      xpMira('fichas', 'Segunda idea: las **paralelas** parten dos rectas en la misma razón.', { slots: fila('4', '6', '10', '?').map((s, i) => ({ ...s, w: 64, et: ['trozo 1', 'trozo 2', 'otra, 1', 'otra, 2'][i] })), fichas: ['4', '6', '10', '15'], alto: 96 }, [
        ['En una recta los trozos miden 4 y 6.', { pon: { 0: '4', 1: '6' } }],
        ['El segundo es uno y medio veces el primero.', {}, '$6 \\div 4 = 1.5$'],
        ['En la otra recta, el primero mide 10.', { pon: { 2: '10' } }],
        ['El segundo guarda la razón.', { pon: { 3: '15' } }, '$10 \\cdot 1.5 = 15$'],
        ['A eso se le llama teorema de Tales.', {}],
      ], 'Tales: la razón entre los trozos es la misma.'),
      xpHaz('fichas', 'Los trozos de una recta miden 3 y 12; en la otra, el primero mide 5. Pon la razón y el segundo trozo.', { slots: fila('razón', 'segundo'), fichas: ['4', '20', '14', '9', '15'], meta: ['4', '20'], alto: 96, pista: 'Divide el segundo entre el primero.' }, '$12 \\div 3 = 4$ y $5 \\cdot 4 = 20$.')],
    ['Al escalar',
      xpMira('dibujo', 'Tercera idea: si los lados crecen por k, el **área** crece por k².', { dib: cuad, v: { k: 1, t: '' }, alto: 196 }, [
        ['Un cuadrado de lado uno: una baldosa.', { t: 'lado 1: 1' }],
        ['Con el lado doble, cuatro baldosas.', { k: 2, t: 'lado 2: 4' }, '$2^2 = 4$'],
        ['Con el triple, nueve.', { k: 3, t: 'lado 3: 9' }, '$3^2 = 9$'],
        ['Un cubo crece con el factor al cubo.', {}, '$3^3 = 27$'],
        ['El perímetro crece igual que el lado.', {}],
      ], 'Largo: k. Área: k². Volumen: k³.'),
      xpHaz('fichas', 'Una maqueta crece por 5. Pon por cuánto se multiplican su pintura y su volumen.', { slots: fila('pintura', 'volumen'), fichas: ['25', '125', '5', '10', '15'], meta: ['25', '125'], alto: 96, pista: 'La pintura cubre superficie.' }, '$5^2 = 25$ y $5^3 = 125$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'En un plano 1 : 50 una sala mide 8 cm por 6 cm. Pon su largo real en metros y su área real en m².', { slots: fila('largo (m)', 'área (m²)'), fichas: ['4', '12', '24', '3', '48'], meta: ['4', '12'], alto: 96, pista: 'Cada centímetro son 50 cm: medio metro.' }, '8 cm son 4 m y 6 cm son 3 m: $4 \\cdot 3 = 12$.')],
  ], 'Un mismo factor para los lados; su cuadrado para el área.');

  xpLec('icf-ma-forma-4', [
    ['Tres nombres',
      xpMira('dibujo', 'Empecemos por la idea: los lados se nombran **desde θ**.', { dib: rec, v: { e: 3, f: 0, t: '' }, alto: 198 }, [
        ['Este es el ángulo desde el que miramos.', {}],
        ['El cateto de enfrente es el opuesto; el que lo toca, el adyacente.', { f: 1 }],
        ['La hipotenusa está frente al ángulo recto.', {}],
        ['Seno: opuesto sobre hipotenusa.', { t: 'sen θ = 9/15' }, '$\\tfrac{9}{15} = 0.6$'],
        ['Coseno: adyacente sobre hipotenusa.', { t: 'cos θ = 12/15' }, '$\\tfrac{12}{15} = 0.8$'],
        ['Tangente: opuesto sobre adyacente.', { t: 'tan θ = 9/12' }, '$\\tfrac{9}{12} = 0.75$'],
      ], 'Seno op/hip, coseno ady/hip, tangente op/ady.'),
      xpHaz('fichas', 'Opuesto 8, adyacente 6, hipotenusa 10. Pon el seno y la tangente.', { slots: fila('sen', 'tan'), fichas: ['8/10', '8/6', '6/10', '6/8', '10/8'], meta: ['8/10', '8/6'], alto: 96, pista: 'El seno lleva abajo la hipotenusa; la tangente, el adyacente.' }, 'sen = 8/10 y tan = 8/6.')],
    ['Solo importa el ángulo',
      xpMira('dibujo', 'Segunda idea: al agrandar el triángulo la **razón** no cambia.', { dib: rec, v: { e: 1, f: 0, t: '' }, alto: 198 }, [
        ['Uno pequeño: opuesto 3 e hipotenusa 5.', { f: 1, t: '3/5 = 0.6' }],
        ['Al doble: seis y diez.', { e: 2, t: '6/10 = 0.6' }],
        ['Al triple: nueve y quince.', { e: 3, t: '9/15 = 0.6' }],
        ['Los lados cambian; el seno, no.', {}],
        ['Por eso basta saber el ángulo para saber la razón.', {}],
      ], 'Cada ángulo tiene su seno, su coseno y su tangente.'),
      xpHaz('fichas', 'La tangente de un ángulo es 3/4. Si el adyacente mide 20, pon el opuesto y la hipotenusa.', { slots: fila('opuesto', 'hipotenusa'), fichas: ['15', '25', '19', '35', '12'], meta: ['15', '25'], alto: 96, pista: 'Todo creció por cinco.' }, 'Por 5: 15, 20 y 25.')],
    ['Medir sin llegar',
      xpMira('fichas', 'Tercera idea: con un **ángulo** y un lado se halla otro.', { slots: fila('distancia', 'tan', 'altura'), fichas: ['60', '0.7', '42'], alto: 96 }, [
        ['Desde sesenta metros se mira la punta de un cerro.', { pon: { 0: '60' } }],
        ['La tangente de ese ángulo es 0.7.', { pon: { 1: '0.7' } }],
        ['Altura sobre distancia es la tangente.', {}, '$\\tfrac{h}{60} = 0.7$'],
        ['Entonces la altura es distancia por tangente.', { pon: { 2: '42' } }, '$60 \\cdot 0.7 = 42$'],
        ['Si tienes la hipotenusa, usa el seno.', {}],
      ], 'Escoge la razón que une lo que tienes con lo que buscas.'),
      xpHaz('fichas', 'Una rampa de 12 m forma 30° con el piso (seno 0.5). Pon la altura que sube y la de una de 20 m igual de inclinada.', { slots: fila('de 12 m', 'de 20 m'), fichas: ['6', '10', '24', '12', '15'], meta: ['6', '10'], alto: 96, pista: 'La rampa es la hipotenusa.' }, '$12 \\cdot 0.5 = 6$ y $20 \\cdot 0.5 = 10$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'A 40 m de un edificio se ve el techo a 45° (tangente 1), con los ojos a 1.5 m del piso. Pon lo que sube desde los ojos y la altura total.', { slots: fila('desde los ojos', 'total'), fichas: ['40', '41.5', '38.5', '45', '60'], meta: ['40', '41.5'], alto: 96, pista: 'Falta sumar la altura de los ojos.' }, '$40 \\cdot 1 = 40$ y $40 + 1.5 = 41.5$.')],
  ], 'Nombra los lados desde θ y escoge la razón.');
}
