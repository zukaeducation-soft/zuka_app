// Preicfes · Ciencias Naturales, mundo 13 «Ciencia y Sociedad», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  const r2 = x => Math.round(x * 100) / 100;

  // Microscopio y lo que se ve en el círculo: k 1 bacterias, 2 un virus junto a una célula, 3 anticuerpos.
  const virus = (x, y, r) => { let q = `<circle cx="${x}" cy="${y}" r="${r}" fill="#9b6ad0" stroke="#5b3590"/>`; for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; q += `<line x1="${r2(x + r * Math.cos(a))}" y1="${r2(y + r * Math.sin(a))}" x2="${r2(x + (r + 3) * Math.cos(a))}" y2="${r2(y + (r + 3) * Math.sin(a))}" stroke="#5b3590" stroke-width="1.4"/><circle cx="${r2(x + (r + 3.5) * Math.cos(a))}" cy="${r2(y + (r + 3.5) * Math.sin(a))}" r="1.3" fill="#c9a4ef"/>`; } return q; };
  const anti = (x, y, g) => `<g transform="rotate(${g} ${x} ${y})" stroke="#ffffff" stroke-width="2" fill="none" stroke-linecap="round"><path d="M${x} ${y + 7} V${y} L${x - 5} ${y - 6} M${x} ${y} L${x + 5} ${y - 6}"/></g>`;
  const micro = (v, K) => {
    const k = v.k || 0, cx = 238, cy = 90;
    let s = X.microscopio(84, 168, 1);
    if (k >= 1) {
      s += `<path d="M78 46 L${cx - 62} ${cy - 20}" stroke="#fff" stroke-opacity=".7" stroke-dasharray="4 4"/><circle cx="${cx}" cy="${cy}" r="64" fill="#f3efe0" stroke="#3b4247" stroke-width="3"/>`;
      [[-30, -28, 20], [-8, -38, -30], [18, -22, 60], [-36, 6, 80], [30, 10, 10], [-14, 30, -50], [10, 40, 35]].forEach(([dx, dy, g]) => { s += `<rect x="${cx + dx - 11}" y="${cy + dy - 5}" width="22" height="10" rx="5" fill="#7cc46a" stroke="#3e8a32" transform="rotate(${g} ${cx + dx} ${cy + dy})"/>`; });
      if (k >= 2) s += virus(cx + 38, cy - 34, 4) + virus(cx + 44, cy - 22, 4) + X.rot(cx, cy + 54, 'virus: casi invisibles');
      if (k >= 3) [[-22, -12, 30], [6, -6, -20], [-20, 20, 70], [20, 26, -40]].forEach(([dx, dy, g]) => { s += anti(cx + dx, cy + dy, g); });
    }
    return X.foto(s + (v.r ? X.rot(140, 28, v.r, 'oscuro') : ''), 200, 'lab');
  };
  // Grupo de 20 (5 × 4): v = 1 vacunados 16; el contagio avanza s pasos desde la persona 7.
  const SIN = [7, 3, 15, 19];
  const grupo = (v, K) => {
    const vac = i => (v.v || 0) > 0.5 && !SIN.includes(i), pasos = Math.floor(v.s || 0), enf = new Set([7]);
    for (let p = 0; p < pasos; p++) [...enf].forEach(i => { const r = Math.floor(i / 5), c = i % 5; [[r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]].forEach(([a, b]) => { const j = a * 5 + b; if (a >= 0 && a < 4 && b >= 0 && b < 5 && !vac(j)) enf.add(j); }); });
    let h = '';
    for (let i = 0; i < 20; i++) { const x = 70 + (i % 5) * 50, y = 30 + Math.floor(i / 5) * 34; h += K.c(x, y, 12, enf.has(i) ? 'fF' : vac(i) ? 'fo' : 'fc'); if (vac(i)) h += K.t(x, y + 4, '✓', 's'); }
    return h + K.t(170, 172, v.t || '', 'ta');
  };

  xpAmplia('icf-cn-cts-1', {
    conecta: 'icf-cn-herencia-3',
    desde: [
      ['Desde cero: microbios y defensas',
        xpMira('dibujo', 'Antes de la tecnología: hay seres diminutos que causan enfermedades, los **microbios**. Conocerlos dice qué remedio sirve.', { dib: micro, v: { k: 0, r: '' }, alto: 200 }, [
          ['En la lección de selección viste que el ambiente escoge a los que resisten.', {}],
          ['Con un microscopio se ven las bacterias: seres vivos de una sola célula.', { k: 1, r: 'bacterias: células vivas' }],
          ['Los virus son mucho más pequeños y solo se multiplican dentro de una célula.', { k: 2, r: 'virus: dentro de células' }],
          ['El cuerpo tiene defensas: el sistema inmune fabrica anticuerpos.', { k: 3, r: 'anticuerpos' }],
          ['La vacuna enseña a las defensas antes de que llegue el microbio.', { k: 3, r: 'vacuna: enseña' }],
          ['El antibiótico ataca bacterias; contra los virus no sirve.', { k: 3, r: 'antibiótico: bacterias' }],
        ], 'Bacteria: célula viva. Virus: necesita una célula. La vacuna enseña a las defensas; el antibiótico ataca bacterias.'),
        xpHaz('hoja', 'Pon al margen qué es cada uno.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['bacteria', 'virus'], meta: [1, 0], paras: [['Solo se multiplica dentro de una célula.'], ['Ser vivo de una sola célula que se reproduce solo.']], pista: 'Alguna no va ahí: ¿puede vivir por su cuenta?' }, 'El virus necesita una célula; la bacteria es una célula.')],
    ],
    despues: [
      ['Más difícil: la protección de grupo',
        xpMira('dibujo', 'Un paso más: una vacuna protege a quien la recibe, pero cuando casi todos la tienen, también protege a **los demás**.', { dib: grupo, v: { v: 0, s: 0, t: '' }, alto: 184 }, [
          ['Llega un enfermo a un grupo donde nadie está vacunado.', { v: 0, s: 0, t: '1 enfermo' }],
          ['Contagia a sus vecinos, y ellos a los suyos.', { v: 0, s: 4, t: 'se riega por el grupo' }],
          ['Ahora casi todos están vacunados.', { v: 1, s: 0, t: '16 de 20 vacunados' }],
          ['El enfermo no encuentra a quién pasarle el virus.', { v: 1, s: 4, t: 'el contagio se detiene' }],
          ['Hasta los pocos sin vacuna quedan protegidos.', { v: 1, s: 4, t: 'protección de grupo' }],
        ], 'Si casi todos están vacunados, el microbio no encuentra a quién pasar: protege también a los no vacunados.'),
        xpHaz('hoja', 'En un barrio de 100 personas se vacunan 90. Subraya quiénes quedan **más protegidos**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Solo los 90 vacunados.'], ['Nadie: la vacuna solo sirve en el laboratorio.'], ['También los 10 sin vacuna, porque el virus circula menos.']], pista: 'Piensa en el grupo de 20: ¿a quién podía contagiar el enfermo?' }, 'Con pocos contagiables, el virus casi no circula.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En un colegio, de 200 que se lavaban las manos se enfermaron 6; de 50 que no se las lavaban, 8. ¿Qué conclusión es **correcta**?', { letras: ['A', 'B', 'C', 'D'], paras: [['Lavarse no sirve, porque igual hubo 6 enfermos.'], ['Sin lavado el riesgo fue mayor: 16 % frente a 3 %.'], ['El riesgo fue casi igual, porque 6 y 8 se parecen.'], ['Hubo más enfermos sin lavado porque eran más estudiantes.']] }, [
        ['Antes de leer, divide cada caso entre su grupo.', {}, '$6 \\div 200 = 3\\%$'],
        ['Sin lavado fueron 8 de 50.', {}, '$8 \\div 50 = 16\\%$'],
        ['La A exige cero enfermos: proteger no es garantizar.', { luz: [0], nota: { 0: 'absoluto' } }],
        ['La C compara totales, no proporciones.', { luz: [2], nota: { 2: 'totales' } }],
        ['La D usa un dato falso: sin lavado eran menos.', { luz: [3], nota: { 3: 'dato falso' } }],
        ['La B compara bien: más de cinco veces el riesgo.', { luz: [1], nota: { 1: 'sirve' } }],
      ], 'Compara riesgos con el porcentaje de cada grupo; desconfía de los totales y de los absolutos.'),
      xpHaz('hoja', 'Con un jarabe la gripa dura 5 días; sin él, también 5 días, en grupos parecidos. Subraya la afirmación con **evidencia**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['El jarabe cura la gripa.'], ['El jarabe es peligroso.'], ['Con estos datos, el jarabe no acorta la gripa.'], ['La gripa la causa una bacteria.']], pista: 'Compara los dos grupos: ¿hubo alguna diferencia?' }, 'Sin diferencia entre grupos, no hay evidencia de que sirva.')],
    cierre: 'La vacuna previene, el antibiótico solo sirve contra bacterias, y los riesgos se comparan en proporción.',
  });

  // Sol, embalse, represa con turbina, torre y casa: k 1 embalse, 2 turbina, 3 la casa se ilumina.
  const represa = (v, K) => {
    const k = v.k || 0;
    let s = X.sol(38, 34, 16) + `<path d="M0 132 Q60 124 150 130 V172 H0Z" fill="#4f97c9" opacity="${k >= 1 ? 0.95 : 0.6}"/><path d="M0 136 Q60 128 150 134" stroke="#bfe3f7" stroke-width="1.4" fill="none" opacity=".7"/>` +
      `<path d="M150 112 L170 112 L178 172 L150 172Z" fill="#b9c0c4" stroke="#6f787e"/><path d="M178 172 Q200 162 236 172Z" fill="#4f97c9"/>`;
    if (k >= 2) { s += `<circle cx="188" cy="160" r="9" fill="url(#xlb-metal)" stroke="#4d565c"/>`; for (let i = 0; i < 4; i++) { const a = i * Math.PI / 2 + 0.4; s += `<line x1="188" y1="160" x2="${r2(188 + 8 * Math.cos(a))}" y2="${r2(160 + 8 * Math.sin(a))}" stroke="#2f3539" stroke-width="2"/>`; } }
    s += `<path d="M236 172 L246 78 L256 172 M240 120 H252 M238 140 H254 M243 96 H249" stroke="#5b646a" stroke-width="2" fill="none"/>` + X.cable([[194, 152], [246, 82], [296, 110]], '#2b2f33');
    s += X.edificio(300, 172, 58, 'casa');
    if (k >= 3) s += `<circle cx="300" cy="148" r="16" fill="url(#xlb-luz)"/>`;
    return X.foto(s + (v.r ? X.rot(110, 26, v.r, 'oscuro') : ''), 200, 'campo', 172);
  };

  xpAmplia('icf-cn-cts-2', {
    conecta: 'icf-cn-ecosistemas-2',
    desde: [
      ['Desde cero: de dónde sale la energía',
        xpMira('dibujo', 'Antes de comparar: la luz de tu casa sale de algún lado. En Colombia, buena parte viene del agua de los ríos.', { dib: represa, v: { k: 0, r: '' }, alto: 200 }, [
          ['En la lección de ciclos viste que el carbono pasa del aire a los seres vivos y vuelve.', {}],
          ['Un recurso es algo de la naturaleza que usamos: agua, sol, petróleo.', { r: 'recursos' }],
          ['La represa guarda el agua del río en un embalse.', { k: 1, r: 'embalse' }],
          ['El agua cae, mueve una turbina y se produce electricidad.', { k: 2, r: 'turbina: electricidad' }],
          ['Los cables la llevan hasta las casas.', { k: 3, r: 'la casa se ilumina' }],
          ['El agua vuelve con la lluvia: es renovable. El petróleo no vuelve: no renovable.', { k: 3, r: 'renovable o no' }],
        ], 'Recurso renovable: se repone, como el agua y el sol. No renovable: se acaba, como el petróleo y el carbón.'),
        xpHaz('hoja', 'Pon al margen qué tipo de recurso es cada uno.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['renovable', 'no renovable'], meta: [1, 0], paras: [['Gas natural sacado de un pozo.'], ['Viento que mueve un molino.']], pista: 'Alguna no va ahí: ¿se repone solo o se acaba?' }, 'El viento vuelve a soplar; el gas del pozo se acaba.')],
    ],
    despues: [
      ['Más difícil: comparar fuentes en una tabla',
        xpMira('hoja', 'Un paso más: muchas veces te dan una **tabla** de emisiones por cada kWh. Ninguna fuente sale en cero si se cuenta su fabricación.', { paras: [['Carbón: cerca de 1 000 g de CO₂ por kWh'], ['Gas: cerca de 450 g'], ['Solar: cerca de 40 g'], ['Agua de represa: cerca de 20 g'], ['«La solar no contamina nada»']] }, [
          ['El carbón es el que más gas suelta por cada kWh.', { luz: [0] }],
          ['El gas suelta menos de la mitad.', { luz: [1] }],
          ['La solar no suelta humo al funcionar, pero fabricar paneles sí.', { luz: [2], nota: { 2: 'fabricación' } }],
          ['La represa suelta poco gas, pero inunda tierra.', { luz: [3], nota: { 3: 'otro costo' } }],
          ['Por eso «nada» es una trampa: todas tienen algún costo.', { luz: [4], tacha: [4] }],
        ], 'Compara por kWh y con todo el ciclo; ninguna fuente es gratis para el ambiente.'),
        xpHaz('fichas', 'Una casa gasta 150 kWh al mes. Con la tabla, pon los kg de CO₂ al mes si la energía viene del carbón y si viene de la represa.', { slots: fila('carbón (kg)', 'represa (kg)'), fichas: ['150', '3', '15', '30', '1 000'], meta: ['150', '3'], alto: 96, pista: 'Multiplica los kWh por los gramos de cada fuente y pasa a kilos.' }, '$150 \\cdot 1\\,000$ g son 150 kg; $150 \\cdot 20$ g son 3 kg.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Al construir una represa se inunda un bosque. ¿Cuál es la consecuencia **más directa** sobre el ambiente?', { letras: ['A', 'B', 'C', 'D'], paras: [['Se acaba para siempre el agua del río.'], ['Sube de inmediato la temperatura de todo el planeta.'], ['Se pierde el hábitat de las plantas y animales del bosque.'], ['La represa empieza a producir petróleo.']] }, [
        ['La pregunta pide lo más directo, no lo más lejano.', {}],
        ['La A usa un absoluto: el río sigue, solo se represa.', { luz: [0], nota: { 0: 'absoluto' } }],
        ['La B es una consecuencia lejana y exagerada.', { luz: [1], nota: { 1: 'lejana' } }],
        ['La D no tiene nada que ver con una represa.', { luz: [3], nota: { 3: 'sin relación' } }],
        ['La C sale directo del dato: el bosque queda bajo el agua.', { luz: [2], nota: { 2: 'sirve' } }],
      ], 'Distingue la consecuencia directa de la lejana, y desconfía de «para siempre» y «todo».'),
      xpHaz('hoja', 'Un colegio quiere bajar la basura de botellas plásticas. Subraya la acción que más **reduce**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['Reciclar todas las botellas.'], ['Quemar las botellas en el patio.'], ['Enterrar las botellas.'], ['Instalar un filtro de agua y usar termos propios.']], pista: 'Reducir es que la botella ni siquiera llegue.' }, 'Sin botellas compradas no hay residuo que reciclar.')],
    cierre: 'Toda fuente tiene ventajas y costos en su ciclo; el exceso de gases calienta, y reducir va primero.',
  });

  // Testimonio y evidencia: una persona con cartel; luego dos grupos de 5 (remedio y placebo) y los que mejoran.
  const evidencia = (v, K) => {
    const k = v.k || 0;
    let s = X.persona(48, 172, 1.1, '#8a5aa8', k >= 1 ? { cartel: '¡Me sirvió!' } : {});
    if (k >= 2) {
      for (let i = 0; i < 5; i++) s += X.persona(128 + i * 18, 172, 0.68, k >= 3 && i < 4 ? '#43a047' : '#9aa3a8') + X.persona(232 + i * 18, 172, 0.68, k >= 3 && i < 2 ? '#43a047' : '#9aa3a8');
      s += X.rot(164, 100, 'remedio') + X.rot(268, 100, 'placebo');
    }
    return X.foto(s + (v.r ? X.rot(216, 26, v.r, 'oscuro') : ''), 200, 'lab');
  };

  xpAmplia('icf-cn-cts-3', {
    conecta: 'icf-cn-indaga-2',
    desde: [
      ['Desde cero: qué es una evidencia',
        xpMira('dibujo', 'Antes de decidir: no todo lo que se dice es una prueba. Una **evidencia** es algo medido que cualquiera puede revisar.', { dib: evidencia, v: { k: 0, r: '' }, alto: 200 }, [
          ['En la lección de datos viste que importa hacia dónde van todos los datos, no uno suelto.', {}],
          ['Una persona asegura: «a mí me sirvió». Eso es un testimonio.', { k: 1, r: 'testimonio' }],
          ['Una evidencia es un dato medido que se puede revisar.', { k: 1, r: 'evidencia: medida' }],
          ['Para medir se arman dos grupos parecidos: uno con remedio y otro con placebo.', { k: 2, r: 'dos grupos' }],
          ['El placebo es una pastilla falsa que se ve igual.', { k: 2, r: 'placebo: falsa' }],
          ['Se cuentan los que mejoran en cada grupo y se comparan.', { k: 3, r: '4 de 5 frente a 2 de 5' }],
        ], 'Testimonio: lo que alguien cuenta. Evidencia: datos medidos en grupos que se comparan.'),
        xpHaz('hoja', 'Subraya la que es una **evidencia** medida.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['«Siento que el té me quita el estrés».'], ['«Mi abuela dice que funciona».'], ['«En 50 personas, la presión bajó 10 puntos con el ejercicio».']], pista: 'Busca la que tiene números que alguien midió.' }, 'Datos medidos en un grupo: evidencia.')],
    ],
    despues: [
      ['Más difícil: ir juntos no es causar',
        xpMira('hoja', 'Un paso más: que dos cosas **suban juntas** no prueba que una cause la otra. Puede haber una tercera detrás.', { paras: [['En el mes que más helados se venden…'], ['…hay más quemaduras de sol'], ['«Los helados queman la piel»'], ['La causa común: días de mucho sol']] }, [
          ['Los datos muestran que las dos cosas suben juntas.', { luz: [0, 1] }],
          ['La conclusión apurada: una causa la otra.', { luz: [2] }],
          ['Pero el helado no tiene nada que ver con la piel al sol.', { luz: [2], tacha: [2] }],
          ['Hay una causa común: los días soleados traen las dos.', { luz: [3], nota: { 3: 'tercera causa' } }],
          ['Para probar una causa se necesita un experimento con control.', {}],
        ], 'Ir juntos no es causar: busca una tercera causa o un experimento con control.'),
        xpHaz('hoja', 'Los niños con más libros en casa sacan mejores notas. Subraya la conclusión **más cuidadosa**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Comprar libros sube las notas, seguro.'], ['Van juntos, pero puede haber otra causa, como el tiempo que les dedican.'], ['Los libros bajan las notas.']], pista: 'Van juntos: ¿eso solo prueba que uno causa el otro?' }, 'Correlación no es causa: puede haber otra explicación.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Un anuncio dice: «9 de cada 10 dentistas recomiendan la crema X». ¿Qué haría falta para **confiar** en ese dato?', { letras: ['A', 'B', 'C', 'D'], paras: [['Nada: si lo dicen dentistas, es cierto.'], ['Saber de qué color es la crema.'], ['Que la crema sea la más cara.'], ['Saber a cuántos dentistas preguntaron y quién pagó la encuesta.']] }, [
        ['Pregúntate: ¿cuántos casos hay y quién los contó?', {}],
        ['La A acepta por autoridad, sin mirar los datos.', { luz: [0], nota: { 0: 'autoridad' } }],
        ['La B no tiene que ver con la pregunta.', { luz: [1], nota: { 1: 'no importa' } }],
        ['La C confunde precio con calidad.', { luz: [2], nota: { 2: 'no importa' } }],
        ['La D pide el tamaño de la muestra y quién pagó: eso decide.', { luz: [3], nota: { 3: 'sirve' } }],
      ], 'Ante un dato, pregunta cuántos casos hubo, cómo se escogieron y quién pagó el estudio.'),
      xpHaz('hoja', 'Un concejo debe decidir si fumigar un barrio contra el zancudo. Subraya la pregunta que la ciencia responde **midiendo**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [3], paras: [['¿Es justo que paguen los vecinos?'], ['¿Qué barrio es más bonito?'], ['¿A quién le gusta el olor?'], ['¿Cuántos zancudos hay antes y después, comparado con un barrio sin fumigar?']], pista: 'Busca la que se responde con un conteo y una comparación.' }, 'Contar y comparar con un control: eso lo responde la ciencia.')],
    cierre: 'Un testimonio no es prueba: compara grupos con control, desconfía de la correlación y decide con datos y valores.',
  });
}
