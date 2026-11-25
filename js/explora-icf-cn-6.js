// Preicfes · Ciencias Naturales, mundo 6 «Energía y Calor» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Rampa: h de 1 (arriba) a 0 (abajo); barras de potencial, cinética y calor (c).
  const rampa = (v, K) => { const x = 40 + (1 - v.h) * 120, y = 60 + (1 - v.h) * 84; const P = v.h * 100, Q = v.c * 100, C = Math.max(0, 100 - P - Q); return K.l(30, 60, 160, 150, 'lm') + K.l(160, 150, 200, 150, 'lm') + K.c(x + 4, y - 10, 9, 'fA') + [[P, 'pot', 'fa'], [C, 'cin', 'fg'], [Q, 'calor', 'ff']].map(([n, t, c], i) => K.r(222 + i * 34, 150 - n, 24, n, c, 2) + K.t(234 + i * 34, 168, t, 's tm')).join('') + K.t(120, 26, v.t || '', 'ta'); };
  // Dos bloques: temperaturas a y b, flecha de calor.
  const par = (v, K) => K.r(60, 60, 90, 70, v.a > v.b + 1 ? 'ff' : 'fg', 6) + K.r(190, 60, 90, 70, v.b > v.a + 1 ? 'ff' : 'fa', 6) + K.t(105, 100, `${Math.round(v.a)}°`, 'b') + K.t(235, 100, `${Math.round(v.b)}°`, 'b') + (v.a > v.b + 1 ? K.ar(153, 95, 187, 95, 'lf gr') : '') + K.t(170, 166, v.t || '', 'ta');
  const barras = (v, K) => [['agua', v.x, 'fa'], ['arena', v.y, 'fg']].map(([s, n, c], i) => K.r(90, 40 + i * 60, n * 2, 34, c, 3) + K.t(82, 62 + i * 60, s, 's tm', 'end') + K.t(98 + n * 2, 62 + i * 60, `${Math.round(n)}°`, 's', 'start')).join('') + K.t(170, 176, v.t || '', 'ta');

  xpLec('icf-cn-energia-1', [
    ['Dos formas',
      xpMira('dibujo', 'Empecemos por la idea: en alto hay energía **potencial**; en movimiento, **cinética**.', { dib: rampa, v: { h: 1, c: 0, t: '' }, alto: 180 }, [
        ['Arriba y quieta: toda es potencial.', { t: 'potencial 100' }],
        ['Al bajar, una parte se vuelve cinética.', { h: 0.5, t: '50 y 50' }],
        ['Abajo va más rápido: toda es cinética.', { h: 0, t: 'cinética 100' }],
        ['La suma no cambió en ningún momento.', {}],
        ['A esa suma se le llama energía mecánica.', { h: 0.7, t: '70 y 30' }],
      ], 'Sin roce, potencial más cinética siempre da lo mismo.'),
      xpHaz('fichas', 'Una bola tiene 60 J arriba, quieta. Sin roce, a cierta altura le quedan 45 de potencial. Pon la cinética ahí y la que tendrá abajo.', { slots: fila('ahí', 'abajo'), fichas: ['15', '60', '45', '105', '30'], meta: ['15', '60'], alto: 96, pista: 'Las dos deben sumar 60.' }, '$60 - 45 = 15$; abajo, toda: 60.')],
    ['Con roce',
      xpMira('dibujo', 'Segunda idea: con **roce**, una parte pasa a calor; nada desaparece.', { dib: rampa, v: { h: 1, c: 0, t: '' }, alto: 180 }, [
        ['Arranca con cien, toda potencial.', {}],
        ['El roce calienta un poco la pista.', { h: 0.5, c: 0.1, t: '50 + 40 + 10' }],
        ['Abajo le queda menos cinética.', { h: 0, c: 0.2, t: '80 + 20' }, '$100 - 20 = 80$'],
        ['Si sube, no llega a la misma altura.', {}],
        ['La total sigue siendo cien: parte es calor.', { t: 'total 100' }],
      ], 'La energía total se conserva; la mecánica, solo sin roce.'),
      xpHaz('hoja', 'Un columpio se va frenando solo. Subraya adónde va su energía.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Desaparece.'], ['Pasa al aire y a las cadenas como calor.'], ['Se vuelve altura.']], pista: 'Nada se pierde: se transforma.' }, 'El roce la convierte en calor.')],
    ['El cuadrado',
      xpMira('fichas', 'Tercera idea: la cinética va con el **cuadrado** de la velocidad.', { slots: fila('v: 1', 'v: 2', 'v: 3'), fichas: ['1', '4', '9'], alto: 96 }, [
        ['A cierta velocidad tiene una unidad.', { pon: { 0: '1' } }],
        ['Al doble de velocidad, cuatro.', { pon: { 1: '4' } }, '$2^2 = 4$'],
        ['Al triple de velocidad, nueve.', { pon: { 2: '9' } }, '$3^2 = 9$'],
        ['Por eso frenar cuesta mucho más.', {}],
        ['En cambio, con la masa es parejo: doble masa, doble energía.', {}],
      ], 'Doble velocidad: cuatro veces. Doble masa: dos veces.'),
      xpHaz('fichas', 'Una moto va a 20 y pasa a 80 km/h. Pon por cuánto se multiplica su velocidad y por cuánto su energía cinética.', { slots: fila('velocidad', 'energía'), fichas: ['4', '16', '8', '2', '60'], meta: ['4', '16'], alto: 96, pista: 'La energía va con el cuadrado.' }, '$80 \\div 20 = 4$ y $4^2 = 16$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un bloque de 3 kg está a 4 m de altura (gravedad 10). Cae y llega con 90 J de cinética. Pon su potencial al comienzo y lo que pasó a calor.', { slots: fila('potencial', 'calor'), fichas: ['120', '30', '90', '12', '210'], meta: ['120', '30'], alto: 96, pista: 'Masa por gravedad por altura; después, resta.' }, '$3 \\cdot 10 \\cdot 4 = 120$ y $120 - 90 = 30$.')],
  ], 'Se transforma, se conserva y la velocidad pesa al cuadrado.');

  xpLec('icf-cn-energia-2', [
    ['No son lo mismo',
      xpMira('dibujo', 'Empecemos por la idea: el **calor** pasa de lo más caliente a lo más frío hasta igualarse.', { dib: par, v: { a: 80, b: 20, t: '' }, alto: 178 }, [
        ['Dos bloques iguales: uno a 80 y otro a 20.', {}],
        ['El calor pasa del caliente al frío.', { a: 70, b: 30, t: 'pasa calor' }],
        ['Uno baja lo mismo que el otro sube.', { a: 60, b: 40 }],
        ['Cuando se igualan, deja de pasar.', { a: 50, b: 50, t: 'equilibrio' }, '$(80 + 20) \\div 2 = 50$'],
        ['Temperatura es lo que marcan; calor, lo que pasó.', {}],
      ], 'Temperatura se tiene; calor pasa, hasta el equilibrio.'),
      xpHaz('fichas', 'Se juntan dos bloques iguales, a 90 y a 30 grados, sin perder calor. Pon el equilibrio y cuánto baja el caliente.', { slots: fila('equilibrio', 'baja'), fichas: ['60', '30', '120', '45', '90'], meta: ['60', '30'], alto: 96, pista: 'Son iguales: el punto medio.' }, '$(90 + 30) \\div 2 = 60$ y $90 - 60 = 30$.')],
    ['Tres caminos',
      xpMira('hoja', 'Segunda idea: el calor viaja por **conducción**, **convección** o **radiación**.', { paras: [['Plancha que toca la camisa'], ['Agua de la olla que sube y baja'], ['Sol que calienta la acera'], ['Cobija con aire quieto']] }, [
        ['Por contacto, de partícula en partícula.', { luz: [0], nota: { 0: 'conducción' } }],
        ['Por un fluido que se mueve.', { luz: [1], nota: { 1: 'convección' } }],
        ['En ondas, aun en el vacío.', { luz: [2], nota: { 2: 'radiación' } }],
        ['El aire quieto casi no lo deja pasar.', { luz: [3], nota: { 3: 'aislante' } }],
        ['El metal, en cambio, lo conduce muy bien.', { luz: [0] }],
      ], 'Contacto, fluido u ondas; el aire quieto frena.'),
      xpHaz('hoja', 'Pon al margen el camino del calor.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['convección', 'radiación', 'conducción'], meta: [2, 0, 1], paras: [['Sartén sobre la hornilla, contacto directo'], ['Aire caliente que sube en una chimenea'], ['Calor de una bombilla sin tocarla, de lado']], pista: 'Alguna no va ahí: ¿contacto, fluido u ondas?' }, 'La sartén por contacto, el aire sube y la bombilla radia.')],
    ['Unos cuestan más',
      xpMira('dibujo', 'Tercera idea: el **calor específico** dice cuánto cuesta subir un grado.', { dib: barras, v: { x: 0, y: 0, t: '' }, alto: 186 }, [
        ['Un kilo de agua y uno de arena, con el mismo fuego.', {}],
        ['La arena sube rápido.', { x: 4, y: 21, t: 'mismo calor' }],
        ['El agua sube despacio: pide más calor por grado.', { x: 12, y: 63 }],
        ['Al enfriarse ocurre igual: la arena baja primero.', { x: 10, y: 30, t: 'de noche' }],
        ['Por eso el mar cambia poco de temperatura.', {}],
      ], 'Mayor calor específico: cambia más despacio.'),
      xpHaz('fichas', 'A 1 kg de agua se le dan 12 600 J. Si cada grado pide 4 200, pon cuánto sube y cuánto subirían 3 kg con el mismo calor.', { slots: fila('1 kg', '3 kg'), fichas: ['3', '1', '9', '6', '12'], meta: ['3', '1'], alto: 96, pista: 'Con el triple de agua, el calor se reparte en más.' }, '$12\\,600 \\div 4\\,200 = 3$; con el triple de masa, 1.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Una banca de metal y una de madera llevan toda la noche afuera. La de metal se siente más fría. Subraya la explicación.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['El metal está a menor temperatura.'], ['La madera produce calor.'], ['El metal se lleva más rápido el calor del cuerpo.']], pista: 'Llevan horas en el mismo lugar.' }, 'Tienen igual temperatura; el metal conduce mejor.')],
  ], 'El calor pasa, por tres caminos, y unos se calientan más fácil.');
}
