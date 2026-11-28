// Preicfes · Ciencias Naturales, mundo 9 «Reacciones y Cantidades», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const r2 = x => Math.round(x * 100) / 100;

  // Pastilla efervescente que cae (c de 0 a 1) en un vaso, burbujea (b) y se deshace (d); un clavo que se oxida (o).
  const pastilla = (v, K) => {
    const c = v.c || 0, d = v.d || 0, o = v.o || 0, y = 40 + c * 92, rr = 13 * (1 - d * 0.85);
    let s = X.vaso(120, 166, 84, 104, 0.65, 'agua', { burbujas: Math.round((v.b || 0) * 16) });
    if (rr > 1.5) s += `<ellipse cx="120" cy="${r2(y)}" rx="${r2(rr)}" ry="${r2(rr * 0.4)}" fill="#f7f7f2" stroke="#b9b6aa"/>`;
    if ((v.b || 0) > 0.5) for (let i = 0; i < 6; i++) s += `<circle cx="${100 + i * 8}" cy="${92 - (i % 3) * 7}" r="1.8" fill="none" stroke="#ffffff" stroke-width=".9"/>`;
    s += `<path d="M232 158 L300 150" stroke="#6f787e" stroke-width="7" stroke-linecap="round"/><path d="M232 158 L300 150" stroke="url(#xlb-metal)" stroke-width="5" stroke-linecap="round"/><rect x="296" y="142" width="7" height="18" rx="2" fill="#8d969c" transform="rotate(-7 300 151)"/>`;
    if (o > 0.01) s += `<path d="M236 157 L298 150" stroke="#a0522d" stroke-width="6" stroke-linecap="round" opacity="${r2(0.9 * o)}" stroke-dasharray="7 3"/>`;
    return X.foto(s + (v.r ? X.rot(250, 40, v.r, 'oscuro') : ''), 200, 'lab');
  };
  // Matraz con agua y pastilla sobre una balanza; con tapón (tap) el gas no sale. l = lectura.
  const balanza = (v, K) => {
    const tap = (v.tap || 0) > 0.5, b = (v.b || 0) > 0.5;
    let s = X.balanza(170, 168, v.l || '0.0 g') + X.matraz(170, 146, 0.9, 0.4, 'agua', { tapon: tap, burbujas: b ? 7 : 0 });
    if (b && !tap) s += `<circle cx="166" cy="62" r="2.4" fill="none" stroke="#fff"/><circle cx="174" cy="50" r="3" fill="none" stroke="#fff"/><circle cx="168" cy="38" r="3.4" fill="none" stroke="#fff"/>` + X.flecha(196, 64, 220, 30);
    return X.foto(s + (v.r ? X.rot(270, 40, v.r, 'oscuro') : ''), 200, 'lab');
  };

  xpAmplia('icf-cn-reacciones-1', {
    conecta: 'icf-cn-atomo-2',
    desde: [
      ['Desde cero: qué es una reacción',
        xpMira('dibujo', 'Antes de las ecuaciones: una **reacción química** es cuando unas sustancias se convierten en otras distintas. Se nota en el vaso.', { dib: pastilla, v: { c: 0, b: 0, d: 0, o: 0, r: '' }, alto: 200 }, [
          ['En la lección de enlaces viste que los átomos se unen regalando o compartiendo electrones.', {}],
          ['Una pastilla efervescente cae al agua.', { c: 1 }],
          ['Salen burbujas de un gas que no estaba: dióxido de carbono.', { c: 1, b: 1, d: 0.5, r: 'gas nuevo' }],
          ['Los átomos de la pastilla rompen sus enlaces y se unen de otra forma.', { c: 1, b: 1, d: 1, r: 'enlaces nuevos' }],
          ['Lo que entra se llama reactivo; lo que sale, producto.', { c: 1, b: 1, d: 1, r: 'reactivos → productos' }],
          ['El clavo que se oxida también es una reacción, solo que lenta.', { c: 1, b: 1, d: 1, o: 1, r: 'óxido: sustancia nueva' }],
        ], 'Reacción: los átomos rompen enlaces y forman otros. Entran reactivos, salen productos nuevos.'),
        xpHaz('hoja', 'Pon al margen qué es cada cosa en la pastilla que burbujea.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['reactivo', 'producto'], meta: [1, 0], paras: [['El gas de las burbujas'], ['La pastilla antes de caer']], pista: 'Alguna no va ahí: ¿estaba antes o apareció después?' }, 'La pastilla entra; el gas sale.')],
    ],
    despues: [
      ['Más difícil: abierto o cerrado',
        xpMira('dibujo', 'Un paso más: se compara una reacción **abierta** con una **cerrada** sobre una balanza. La diferencia es si el gas escapa.', { dib: balanza, v: { tap: 0, b: 0, l: '150.0 g', r: '' }, alto: 200 }, [
          ['Matraz abierto con agua y una pastilla: la balanza marca 150.0 g.', { tap: 0, b: 0, l: '150.0 g' }],
          ['Burbujea y el gas se escapa por la boca.', { b: 1, l: '149.2 g' }],
          ['Baja la lectura, pero la materia no se destruyó: se fue al aire.', { b: 1, l: '149.2 g', r: 'el gas salió' }],
          ['Se repite con tapón: el gas queda adentro.', { tap: 1, b: 1, l: '150.0 g', r: 'nada sale' }],
          ['Con todo encerrado, la masa no cambia: se conserva.', { tap: 1, b: 1, l: '150.0 g', r: 'masa igual' }],
        ], 'Si un gas escapa, la balanza baja; con todo cerrado, la masa se conserva.'),
        xpHaz('fichas', 'En un frasco cerrado se mezclan 80 g de reactivos y sale gas. Pon la masa final cerrado, y la que marca abierto si escapan 6 g.', { slots: fila('cerrado', 'abierto'), fichas: ['80', '74', '86', '6', '0'], meta: ['80', '74'], alto: 96, pista: 'Cerrado no sale nada; abierto, resta lo que escapó.' }, 'Cerrado: 80 g. Abierto: $80 - 6 = 74$ g.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una vela encendida en un plato pesa 30 g al empezar y 21 g al apagarse. ¿Qué conclusión es **correcta**?', { letras: ['A', 'B', 'C', 'D'], paras: [['Se destruyeron 9 g de materia.'], ['Fue un cambio físico, porque la vela solo se derritió.'], ['La parafina que falta se volvió gases que salieron al aire.'], ['La vela pesa menos porque el fuego la empujó hacia arriba.']] }, [
        ['Recuerda: la masa no se destruye, pero puede escaparse.', {}],
        ['La A contradice la conservación de la masa.', { luz: [0], nota: { 0: 'imposible' } }],
        ['La B mira solo la cera derretida; la que ardió formó gases nuevos.', { luz: [1], nota: { 1: 'incompleta' } }],
        ['La D suena a física, pero no explica la masa que falta.', { luz: [3], nota: { 3: 'suena bien' } }],
        ['La C: se formaron dióxido de carbono y vapor que se fueron.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'Si la masa baja en un sistema abierto, busca qué gas se escapó.'),
      xpHaz('hoja', 'Se disuelve azúcar en agua y nada nuevo aparece; se calienta azúcar sola y queda un carbón negro. Subraya lo **correcto**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Los dos son químicos, porque el azúcar desaparece.'], ['Disolver es químico, porque ya no se ve el azúcar.'], ['Disolver es físico; calentar hasta carbón es químico.'], ['Calentar es físico, porque solo cambia el color.']], pista: 'Pregunta en cada caso si apareció una sustancia que no estaba.' }, 'El azúcar disuelto sigue siendo azúcar; el carbón es nuevo.')],
    cierre: 'Sustancias nuevas, los mismos átomos reacomodados y la misma masa si nada se escapa.',
  });

  // Cartón de huevos, balanza con carbón (k = 2) o con hierro (k = 3).
  const paquetes = (v, K) => {
    const k = v.k || 0;
    let s = '';
    if (k >= 1) { s += `<path d="M22 150 H118 L112 166 H28Z" fill="#b9ad97" stroke="#7d7360"/>`; for (let i = 0; i < 12; i++) s += `<ellipse cx="${30 + (i % 6) * 15}" cy="${146 - Math.floor(i / 6) * 9}" rx="6.5" ry="8" fill="#f3e3c3" stroke="#c9b48c" stroke-width=".7"/>`; }
    s += X.balanza(220, 168, v.l || '0.0 g');
    if (k >= 2 && k < 3) s += `<path d="M190 146 Q220 120 250 146Z" fill="#2b2b2b"/><path d="M200 140 Q215 130 226 138" stroke="#555" fill="none"/>`;
    if (k >= 3) for (let i = 0; i < 6; i++) s += `<path d="M${194 + i * 9} 146 L${200 + i * 9} 118" stroke="#6f787e" stroke-width="4" stroke-linecap="round"/><path d="M${194 + i * 9} 146 L${200 + i * 9} 118" stroke="url(#xlb-metal)" stroke-width="2.6"/>`;
    return X.foto(s + (v.r ? X.rot(170, 34, v.r, 'oscuro') : ''), 200, 'mesa', 168);
  };

  xpAmplia('icf-cn-reacciones-2', {
    conecta: 'icf-cn-reacciones-1',
    desde: [
      ['Desde cero: contar por paquetes',
        xpMira('dibujo', 'Antes de las cuentas: los químicos cuentan átomos **por paquetes**, como los huevos por docenas. Ese paquete se llama **mol**.', { dib: paquetes, v: { k: 0, l: '0.0 g', r: '' }, alto: 200 }, [
          ['En la lección anterior viste que una ecuación se balancea contando átomos.', {}],
          ['Los huevos se cuentan por docenas: un paquete de 12.', { k: 1, r: '1 docena = 12 huevos' }],
          ['Los átomos son tantos que se cuentan por moles, un paquete gigante.', { k: 1, r: '1 mol ≈ 6 · 10²³ partículas' }],
          ['Un mol de carbono pesa 12 gramos.', { k: 2, l: '12.0 g', r: '1 mol de carbono' }],
          ['Un mol de hierro pesa casi 56 gramos: sus átomos pesan más.', { k: 3, l: '55.8 g', r: '1 mol de hierro' }],
          ['Mismo número de partículas, distinta masa: cada átomo pesa diferente.', { k: 3, l: '55.8 g', r: 'igual número, otra masa' }],
        ], 'Un mol es un paquete con el mismo número de partículas; su masa en gramos sale de sumar los átomos.'),
        xpHaz('hoja', 'Subraya lo que tienen **igual** un mol de hierro y un mol de agua.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La masa en gramos.'], ['El número de partículas.'], ['El color.']], pista: 'Una docena de huevos y una de naranjas no pesan igual. ¿Qué tienen igual?' }, 'Un mol de lo que sea tiene el mismo número de partículas.')],
    ],
    despues: [
      ['Más difícil: de gramos a gramos',
        xpMira('fichas', 'Un paso más: te dan **gramos** de un reactivo y piden **gramos** de producto. Hay que pasar por moles: 2H₂ + O₂ → 2H₂O.', { slots: fila('mol H₂', 'mol H₂O', 'g H₂O'), fichas: ['4', '4', '72'], alto: 96 }, [
          ['Hay 8 gramos de hidrógeno, H₂, que pesa 2 gramos por mol.', { pon: { 0: '4' } }, '$8 \\div 2 = 4$'],
          ['La receta dice: 2 de H₂ dan 2 de agua.', {}],
          ['Entonces 4 moles de H₂ dan 4 moles de agua.', { pon: { 1: '4' } }],
          ['Cada mol de agua pesa 18 gramos.', { pon: { 2: '72' } }, '$4 \\cdot 18 = 72$'],
          ['Gramos, moles, receta y otra vez gramos.', {}],
        ], 'Gramos a moles, la receta en moles, y de vuelta a gramos.'),
        xpHaz('fichas', 'C + O₂ → CO₂, con C = 12 y O = 16. Con 60 g de carbono, pon los moles de CO₂ y sus gramos.', { slots: fila('mol CO₂', 'g CO₂'), fichas: ['5', '220', '60', '44', '1'], meta: ['5', '220'], alto: 96, pista: 'Pasa los 60 g a moles; un mol de CO₂ pesa 44 g.' }, '$60 \\div 12 = 5$ y $5 \\cdot 44 = 220$.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un estudiante calcula el oxígeno que sale al separar 54 g de agua: 2H₂O → 2H₂ + O₂. ¿En qué paso está el **error**?', { letras: ['A', 'B', 'C', 'D'], paras: [['Paso 1: un mol de agua pesa 18 g.'], ['Paso 2: 54 g de agua son 3 moles.'], ['Paso 3: 3 moles de agua dan 3 moles de O₂.'], ['Paso 4: 3 moles de O₂ pesan 96 g.']] }, [
        ['Revisa cada paso con tu propia cuenta, de arriba abajo.', {}],
        ['El paso 1 está bien: dos hidrógenos de 1 más un oxígeno de 16.', { luz: [0], nota: { 0: 'bien' } }, '$2 + 16 = 18$'],
        ['El paso 2 también: 54 entre 18.', { luz: [1], nota: { 1: 'bien' } }, '$54 \\div 18 = 3$'],
        ['El 3 copia mal la receta: 2 de agua dan solo 1 de O₂.', { luz: [2], nota: { 2: 'error' } }],
        ['El 4 hace bien su cuenta, pero arrastra el error anterior.', { luz: [3], nota: { 3: 'arrastra' } }],
      ], 'En «¿en qué paso está el error?», la respuesta es el primer paso que falla, aunque los siguientes cuadren.'),
      xpHaz('hoja', 'N₂ + 3H₂ → 2NH₃. Hay 6 moles de H₂ y nitrógeno de sobra. Subraya cuántos moles de NH₃ salen y por qué.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['6, porque sale lo mismo que entra.'], ['2, porque ese es el coeficiente.'], ['12, porque se multiplica 6 por 2.'], ['4, porque cada 3 de H₂ dan 2 de NH₃.']], pista: '6 moles de H₂ alcanzan para hacer la receta dos veces.' }, 'Receta doble: 6 de H₂ dan 4 de NH₃.')],
    cierre: 'El mol es un paquete; los coeficientes, la receta en moles; y el que se acaba primero decide.',
  });

  // Tres tubos (limón, agua, jabón) y sus tiras de tornasol; k: 1 limón, 2 jabón, 3 agua.
  const tornasol = (v, K) => {
    const k = v.k || 0;
    let s = X.gradilla(96, 166, [[0.6, 'aceite'], [0.6, 'agua'], [0.6, 'leche']]);
    [[200, 'limón', 1, '#e0473f'], [248, 'agua', 3, '#8d63b8'], [296, 'jabón', 2, '#3a64c9']].forEach(([x, et, desde, col]) => {
      s += `<rect x="${x - 7}" y="64" width="14" height="66" rx="1.5" fill="#efe6cf" stroke="#b9ab88" stroke-width=".7"/>`;
      if (k >= desde) s += `<rect x="${x - 7}" y="96" width="14" height="34" rx="1.5" fill="${col}"/>`;
      s += X.rot(x, 150, et);
    });
    return X.foto(s + (v.r ? X.rot(248, 34, v.r, 'oscuro') : ''), 200, 'lab');
  };
  // pH mientras se agrega base (x de 0 a 20 mL): sube despacio, salta cerca de 10 mL y termina básico.
  const ph = x => 2 + 10 / (1 + Math.exp(-(x - 10) * 1.3));
  const curvaPH = (v, K) => {
    const X0 = 50, Y0 = 156, gx = x => X0 + x * 12.5, gy = p => Y0 - p * 9.6, x = Math.max(0, Math.min(20, v.x || 0));
    let h = K.l(X0, Y0, 310, Y0, 'lm') + K.l(X0, Y0, X0, 14, 'lm') + K.l(X0, gy(7), 310, gy(7), 'ls d') + K.t(X0 - 6, gy(7) + 4, '7', 's tm', 'end') + K.t(X0 - 6, gy(14) + 8, '14', 's tm', 'end') + K.t(X0 - 6, Y0 + 4, '0', 's tm', 'end') +
      K.t(180, Y0 + 18, 'base agregada (mL)', 's tm') + K.t(X0 + 4, 14, 'pH', 's tm', 'start');
    const pts = []; for (let i = 0; i <= 40; i++) { const xx = x * i / 40; pts.push([gx(xx), gy(ph(xx))]); }
    if (x > 0.05) h += K.pl(pts, 'la gr');
    h += K.c(gx(x), gy(ph(x)), 5, 'fA');
    return h + K.t(190, 190, v.t || '', 'ta');
  };

  xpAmplia('icf-cn-reacciones-3', {
    conecta: 'icf-cn-reacciones-1',
    desde: [
      ['Desde cero: ácido, básico y neutro',
        xpMira('dibujo', 'Antes del número: hay sustancias **ácidas**, **básicas** y **neutras**. Se reconocen con un papel que cambia de color, el indicador.', { dib: tornasol, v: { k: 0, r: '' }, alto: 200 }, [
          ['En la lección de reacciones viste que al reaccionar aparecen sustancias nuevas.', {}],
          ['El limón y el vinagre saben agrios: son ácidos.', { k: 1, r: 'ácido: agrio' }],
          ['El jabón se siente resbaloso: es una base.', { k: 2, r: 'base: resbalosa' }],
          ['El agua pura no es ni lo uno ni lo otro: es neutra.', { k: 3, r: 'neutra' }],
          ['El papel tornasol avisa: rojo con ácido, azul con base.', { k: 3, r: 'indicador' }],
          ['Nunca se prueba con la lengua: para eso está el indicador.', { k: 3, r: 'sin probar' }],
        ], 'Ácido: agrio, como el limón. Base: resbalosa, como el jabón. Neutra: el agua pura. El indicador lo muestra.'),
        xpHaz('hoja', 'Pon al margen qué es cada sustancia según su tornasol.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['ácida', 'básica'], meta: [1, 0], paras: [['Agua con cal: el papel se pone azul.'], ['Jugo de naranja: el papel se pone rojo.']], pista: 'Alguna no va ahí: rojo es ácido; azul, básico.' }, 'Azul: básica. Rojo: ácida.')],
    ],
    despues: [
      ['Más difícil: la curva de una neutralización',
        xpMira('dibujo', 'Un paso más: una gráfica muestra cómo cambia el pH mientras se agrega una base. Mira dónde empieza, dónde salta y dónde termina.', { dib: curvaPH, v: { x: 0, t: '' }, alto: 198 }, [
          ['Un vaso con ácido: el pH empieza en 2.', { x: 0, t: 'empieza ácido' }],
          ['Se agrega base poco a poco: al principio casi no sube.', { x: 8, t: 'sube despacio' }],
          ['Cerca del punto neutro, unas gotas lo hacen saltar.', { x: 10, t: 'pH 7: neutro' }],
          ['Si se sigue echando base, pasa de 7 y queda básico.', { x: 20, t: 'se pasó: básico' }],
          ['Por eso se neutraliza gota a gota, midiendo.', { x: 20, t: 'gota a gota' }],
        ], 'Al neutralizar, el pH cambia poco, salta cerca de 7 y, si sobra base, termina básico.'),
        xpHaz('hoja', 'A un limpiador de pH 12 se le agrega vinagre gota a gota. Subraya cómo cambia el pH.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Sube hasta 14.'], ['Se queda en 12.'], ['Baja y, si sobra vinagre, pasa de 7 a ácido.']], pista: 'El vinagre es ácido: ¿hacia qué lado empuja?' }, 'Ahora va al revés: de básico a neutro y luego a ácido.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Una hormiga pica y deja ácido en la piel. Hay leche de magnesia (pH 10), vinagre (pH 3), agua (pH 7) y limpiador (pH 13). ¿Qué conviene aplicar?', { letras: ['A', 'B', 'C', 'D'], paras: [['Vinagre, porque es un líquido que limpia.'], ['Agua, porque neutraliza cualquier cosa.'], ['Leche de magnesia, una base suave.'], ['Limpiador, porque es la base más fuerte.']] }, [
        ['Qué se pide: algo que neutralice un ácido sin dañar la piel.', {}],
        ['La A agrega más ácido: empeora.', { luz: [0], nota: { 0: 'más ácido' } }],
        ['La B confunde diluir con neutralizar.', { luz: [1], nota: { 1: 'diluye' } }],
        ['La D sí es una base, pero tan fuerte que quema.', { luz: [3], nota: { 3: 'demasiado' } }],
        ['La C es base y suave: neutraliza sin hacer daño.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'Para neutralizar se usa lo contrario, pero suave: una opción puede ser cierta y aun así peligrosa.'),
      xpHaz('hoja', 'El agua de un acuario tiene pH 8 y los peces necesitan pH 7. Subraya la acción **correcta**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['Agregar bicarbonato, que es básico.'], ['Agregar sal de cocina.'], ['Esperar a que el pH llegue solo a 7.'], ['Agregar poco a poco algo ácido y medir otra vez.']], pista: 'Está básica: ¿qué la mueve hacia 7 sin pasarse?' }, 'Para bajar el pH, un ácido en pequeñas cantidades, midiendo.')],
    cierre: 'Menos de 7, ácido; más de 7, básico; cada paso es por diez, y se neutraliza con lo contrario, despacio.',
  });
}
