// Preicfes · Ciencias Naturales, mundo 5 «Ecosistemas y Energía», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB, n = x => Math.round(x * 100) / 100;
  // Piezas propias: conejo, hongo, colibrí y nube.
  const conejo = (x, y, s = 1) => `<ellipse cx="${n(x)}" cy="${n(y + 3)}" rx="${n(20 * s)}" ry="3" fill="#000" opacity=".25"/>` +
    `<ellipse cx="${n(x)}" cy="${n(y - 10 * s)}" rx="${n(18 * s)}" ry="${n(12 * s)}" fill="#b7a58f" stroke="#7d6a52" stroke-width=".8"/><circle cx="${n(x - 17 * s)}" cy="${n(y - 8 * s)}" r="${n(4 * s)}" fill="#f4efe6"/>` +
    `<circle cx="${n(x + 17 * s)}" cy="${n(y - 20 * s)}" r="${n(8 * s)}" fill="#b7a58f" stroke="#7d6a52" stroke-width=".8"/><ellipse cx="${n(x + 14 * s)}" cy="${n(y - 34 * s)}" rx="${n(3 * s)}" ry="${n(9 * s)}" fill="#b7a58f" stroke="#7d6a52" stroke-width=".8"/>` +
    `<ellipse cx="${n(x + 21 * s)}" cy="${n(y - 33 * s)}" rx="${n(3 * s)}" ry="${n(9 * s)}" fill="#b7a58f" stroke="#7d6a52" stroke-width=".8"/><circle cx="${n(x + 20 * s)}" cy="${n(y - 21 * s)}" r="${n(1.3 * s)}" fill="#1d2328"/>`;
  const hongo = (x, y, s = 1) => `<rect x="${n(x - 4 * s)}" y="${n(y - 16 * s)}" width="${n(8 * s)}" height="${n(16 * s)}" rx="2" fill="#f1e7d2" stroke="#b9a988" stroke-width=".7"/>` +
    `<path d="M${n(x - 16 * s)} ${n(y - 14 * s)} Q${n(x)} ${n(y - 36 * s)} ${n(x + 16 * s)} ${n(y - 14 * s)} Z" fill="#c0392b" stroke="#7d1e15" stroke-width=".8"/>` +
    `<circle cx="${n(x - 6 * s)}" cy="${n(y - 22 * s)}" r="${n(2 * s)}" fill="#fff"/><circle cx="${n(x + 5 * s)}" cy="${n(y - 25 * s)}" r="${n(1.6 * s)}" fill="#fff"/>`;
  const colibri = (x, y, s = 1) => `<ellipse cx="${n(x)}" cy="${n(y)}" rx="${n(9 * s)}" ry="${n(5 * s)}" fill="#2e9e6a" stroke="#1d5f40" stroke-width=".6"/><circle cx="${n(x + 8 * s)}" cy="${n(y - 3 * s)}" r="${n(4 * s)}" fill="#2e9e6a"/>` +
    `<path d="M${n(x + 11 * s)} ${n(y - 3 * s)} L${n(x + 22 * s)} ${n(y - 1 * s)}" stroke="#1d2328" stroke-width="1.2"/><path d="M${n(x - 2 * s)} ${n(y - 3 * s)} L${n(x - 8 * s)} ${n(y - 15 * s)} L${n(x + 4 * s)} ${n(y - 4 * s)} Z" fill="#7fd3a8" opacity=".85"/>` +
    `<path d="M${n(x - 8 * s)} ${n(y)} L${n(x - 16 * s)} ${n(y + 4 * s)}" stroke="#1d5f40" stroke-width="2"/><circle cx="${n(x + 9 * s)}" cy="${n(y - 4 * s)}" r=".9" fill="#1d2328"/>`;
  const nube = (x, y, s = 1, gris = 0) => [[0, 0, 18], [-18, 6, 13], [18, 6, 14], [-6, 10, 14], [8, -8, 13]].map(([a, b, r]) => `<circle cx="${n(x + a * s)}" cy="${n(y + b * s)}" r="${n(r * s)}" fill="${gris ? '#b9c3cb' : '#ffffff'}"/>`).join('');

  // Campo: el Sol, una planta (productor), un conejo (consumidor) y un hongo (descomponedor).
  const campo = (v, K) => {
    const k = v.k || 0;
    let s = X.sol(44, 36, 18) + X.planta(110, 166, 46, 1, { hojas: 7 });
    if (k >= 1) s += X.flecha(70, 52, 100, 86, '#ffe25a') + X.rot(110, 188, 'productor');
    if (k >= 2) s += conejo(206, 162, 1.1) + X.rot(206, 188, 'consumidor');
    if (k >= 3) s += `<rect x="262" y="154" width="54" height="10" rx="4" fill="#6b4423"/>` + hongo(276, 156, 0.9) + hongo(298, 156, 0.7) + X.rot(288, 188, 'descomponedor');
    if (v.t) s += X.rot(200, 24, v.t, 'oscuro');
    return X.foto(s, 200, 'campo', 166);
  };

  xpAmplia('icf-cn-ecosistemas-1', {
    conecta: 'icf-cn-celula-2',
    desde: [
      ['Desde cero: quién fabrica la comida',
        xpMira('dibujo', 'Todo ser vivo necesita energía para vivir. La pregunta de esta lección es **de dónde sale** y cómo pasa de uno a otro.', { dib: campo, v: { k: 0 }, alto: 200 }, [
          ['En la lección de sistemas viste que el alimento se rompe y la sangre lo lleva a las células.', {}],
          ['Esa energía casi siempre empieza en el Sol.', { t: 'la energía empieza en el Sol' }],
          ['Las plantas usan la luz para fabricar azúcar: son los productores.', { k: 1 }],
          ['Quien no fabrica su comida se come a otro: son los consumidores.', { k: 2 }],
          ['Hongos y bacterias deshacen lo muerto: son los descomponedores.', { k: 3 }],
          ['Ecosistema: un lugar con sus seres vivos, su suelo, su agua y su aire.', { k: 3, t: 'ecosistema' }],
        ], 'Productores fabrican con luz, consumidores comen a otros y descomponedores reciclan lo muerto.'),
        xpHaz('hoja', 'Subraya el **productor**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un hongo en un tronco podrido'], ['Un helecho al sol'], ['Una mariposa']], pista: 'Ese se alimenta de otros seres o de lo muerto. ¿Cuál fabrica su comida con luz?' }, 'El helecho hace fotosíntesis: fabrica su alimento.')],
    ],
    despues: [
      ['Más difícil: comer en dos niveles',
        xpMira('hoja', 'Las cadenas reales se cruzan y forman **redes**. Un mismo animal puede ocupar dos niveles distintos.', { paras: [['Papa → persona'], ['Pasto → vaca → persona'], ['Al comer papa, la persona es consumidor primario.'], ['Al comer carne de res, es secundario.']] }, [
          ['Dos cadenas que terminan en la misma persona.', { luz: [0, 1] }],
          ['Al comer la planta, está en el primer nivel de consumidores.', { luz: [2], nota: { 2: 'primario' } }],
          ['Al comer al que comió la planta, sube un nivel.', { luz: [3], nota: { 3: 'secundario' } }],
          ['Y como pasa la décima parte por nivel, comer más abajo rinde más.', { luz: [0] }],
          ['Por eso el mismo terreno alimenta más personas con papa que con carne.', { luz: [0, 1] }],
        ], 'En una red, un animal cambia de nivel según lo que coma; más abajo, más energía disponible.'),
        xpHaz('hoja', 'Con el mismo terreno sembrado, subraya lo que alimenta a **más** personas.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Sembrar maíz y comerlo.'], ['Sembrar maíz, dárselo a cerdos y comer los cerdos.'], ['Da lo mismo.']], pista: 'Cada paso de un nivel al otro pierde cerca de nueve décimas partes. ¿Cuál tiene menos pasos?' }, 'Un paso menos: no se pierde la energía que gastaría el cerdo.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'En un potrero: pasto → grillo → rana → garza. Una fumigación mata casi todos los grillos. ¿Qué pasa **primero**?', { letras: ['A', 'B', 'C', 'D'], paras: [['Aumentan las ranas, porque tienen menos competencia.'], ['Disminuyen las ranas, porque pierden su alimento.'], ['Disminuye el pasto, porque lo comen más.'], ['Aumentan las garzas, porque hay más ranas.']] }, [
        ['Mira quién comía grillos y a quién se comían los grillos.', {}],
        ['Esta invierte el efecto: sin alimento, las ranas no suben.', { luz: [0], nota: { 0: 'al revés' } }],
        ['Esta también va al revés: sin grillos, el pasto descansa.', { luz: [2], nota: { 2: 'al revés' } }],
        ['Esta salta dos eslabones y además se equivoca de sentido.', { luz: [3], nota: { 3: 'lejana y falsa' } }],
        ['El efecto directo: las ranas pierden su comida.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Busca el efecto directo: primero cambia quien se comía al afectado y quien era su comida.'),
      xpHaz('hoja', 'En un lago, el fitoplancton guarda 50 000 kcal. Si en cada nivel pasa cerca del 10 %, ¿cuánto llega a los **consumidores secundarios**?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['5 000 kcal'], ['500 kcal'], ['50 kcal'], ['45 000 kcal']], pista: 'Cuenta los pasos: productores a primarios es uno; a secundarios, otro. Divide entre 10 en cada uno.' }, '$50\\,000 \\div 10 \\div 10 = 500$.')],
    cierre: 'La energía entra con el Sol, pasa por niveles perdiendo cerca del 90 % y los cambios recorren la red.',
  });

  // Ciclo del agua: mar, Sol, nube y lluvia (k: 1 evapora, 2 nube, 3 llueve, 4 vuelve por el río).
  const ciclo = (v, K) => {
    const k = v.k || 0;
    let s = X.sol(40, 34, 16) + `<path d="M0 150 Q60 140 120 152 V166 H0Z" fill="url(#xlb-l-agua)"/>` + `<path d="M190 166 L260 92 L330 166Z" fill="#8a9a7a"/><path d="M247 106 L260 92 L274 108 L266 104 L260 110 L252 104Z" fill="#ffffff"/>`;
    if (k >= 1) s += [36, 66, 96].map(x => X.flecha(x, 144, x, 104, '#e8f4fb')).join('') + X.rot(66, 92, 'evaporación');
    if (k >= 2) s += nube(250, 42, 1, k >= 3) + X.rot(176, 34, 'condensación');
    if (k >= 3) s += [232, 248, 264, 280].map((x, i) => X.gota(x, 74 + (i % 2) * 10, 4, 'agua')).join('') + X.rot(300, 110, 'lluvia');
    if (k >= 4) s += `<path d="M262 120 C240 140 200 136 170 150 S120 156 110 156" stroke="#4f97c9" stroke-width="5" fill="none" stroke-linecap="round"/>` + X.rot(170, 186, 'el río vuelve al mar');
    if (v.t) s += X.rot(170, 186, v.t, 'oscuro');
    return X.foto(s, 200, 'campo', 166);
  };
  // Tres tubos con indicador: con planta a la luz, con planta a oscuras y sin planta.
  const ramita = x => `<path d="M${x} 154 V92" stroke="#2f7d2a" stroke-width="2"/>` + [100, 114, 128, 142].map((y, i) => `<path d="M${x} ${y} q${i % 2 ? 9 : -9} -5 ${i % 2 ? 12 : -12} 2 q${i % 2 ? -5 : 5} 3 ${i % 2 ? -12 : 12} -2Z" fill="url(#xlb-hoja)"/>`).join('');
  const tubos = (v, K) => {
    let s = `<circle cx="110" cy="100" r="60" fill="url(#xlb-luz)"/><circle cx="270" cy="100" r="60" fill="url(#xlb-luz)"/>`;
    [[110, v.c1 || 'verde', 1], [190, v.c2 || 'verde', 1], [270, v.c3 || 'verde', 0]].forEach(([x, c, p]) => { s += X.tubo(x, 160, 104, 0.82, c, { r: 13 }) + (p ? ramita(x) : ''); });
    s += `<rect x="173" y="50" width="34" height="114" rx="6" fill="url(#xlb-metal)" opacity="${v.ver ? 0.25 : 0.95}"/>`;
    s += X.rot(110, 188, 'planta, luz') + X.rot(190, 188, 'planta, oscuras') + X.rot(274, 188, 'sin planta');
    if (v.t) s += X.rot(190, 22, v.t, 'oscuro');
    return X.foto(s, 200, 'lab');
  };

  xpAmplia('icf-cn-ecosistemas-2', {
    conecta: 'icf-cn-ecosistemas-1',
    desde: [
      ['Desde cero: la materia da vueltas',
        xpMira('dibujo', 'La energía entra y se va como calor. La **materia** no: los mismos átomos dan vueltas. El ciclo más fácil de ver es el del agua.', { dib: ciclo, v: { k: 0 }, alto: 200 }, [
          ['En la lección de cadenas viste que la energía se pierde en cada paso y no vuelve.', {}],
          ['La materia es distinta: no se gasta, cambia de lugar y de forma.', { t: 'la materia da vueltas' }],
          ['El Sol calienta el mar y el agua se evapora.', { k: 1 }],
          ['Arriba se enfría y forma nubes: se condensa.', { k: 2 }],
          ['Las gotas crecen y caen como lluvia.', { k: 3 }],
          ['Los ríos la devuelven al mar, y el ciclo empieza otra vez.', { k: 4 }],
        ], 'La energía fluye y se va; la materia circula: el agua se evapora, se condensa, llueve y vuelve.'),
        xpHaz('hoja', 'Pon al margen qué le pasa al agua en cada caso.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['se condensa', 'se evapora', 'se precipita'], meta: [1, 0, 2], paras: [['El charco que se seca al sol'], ['Las gotitas que se forman en la nube'], ['El aguacero sobre la montaña']], pista: 'Alguno no va ahí: ¿pasa a vapor, vuelve a gotas o cae?' }, 'Seca: evapora. Nube: condensa. Aguacero: precipita.')],
    ],
    despues: [
      ['Más difícil: la planta hace las dos cosas',
        xpMira('dibujo', 'Un montaje típico: tubos con agua y un **indicador** verde que se pone amarillo con mucho CO₂ y azul con poco.', { dib: tubos, v: {}, alto: 200 }, [
          ['Tres tubos con el mismo indicador verde.', { t: 'verde al comienzo' }],
          ['Con planta y luz se pone azul: la planta tomó CO₂.', { c1: 'azul' }],
          ['Con planta a oscuras se pone amarillo: solo respiró.', { c1: 'azul', c2: 'aceite', ver: 1 }],
          ['Sin planta sigue verde: es el control.', { c1: 'azul', c2: 'aceite', ver: 1, t: 'el control no cambia' }],
          ['La planta siempre respira; con luz, la fotosíntesis gana.', { c1: 'azul', c2: 'aceite', ver: 1 }],
        ], 'La planta respira siempre; a la luz toma más CO₂ del que suelta. El tubo sin planta es el control.'),
        xpHaz('hoja', 'Un caracol solo, en un tubo con indicador verde, pasa una hora a la luz. Subraya qué color esperas.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Azul, porque la luz le hace tomar CO₂.'], ['Amarillo, porque respira y suelta CO₂.'], ['Verde, porque con luz no respira.']], pista: 'El caracol no hace fotosíntesis, con luz o sin ella. ¿Qué hace todo el tiempo?' }, 'Solo respira: suelta CO₂ y el indicador se pone amarillo.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Se quiere saber si la **luz** hace que una planta acuática tome CO₂. El examen pregunta qué par de tubos sirve.', { letras: ['A', 'B', 'C', 'D'], paras: [['Planta a la luz y caracol a oscuras.'], ['Planta a la luz y planta igual a oscuras.'], ['Una planta a la luz, sola.'], ['Planta a la luz y tubo sin planta a oscuras.']] }, [
        ['La pregunta es sobre la luz: solo la luz debe cambiar.', {}],
        ['Esta cambia la luz y el ser vivo: dos cosas.', { luz: [0], nota: { 0: 'dos cambios' } }],
        ['Esta no tiene con qué comparar.', { luz: [2], nota: { 2: 'sin comparar' } }],
        ['Esta cambia la luz y quita la planta: otra vez dos.', { luz: [3], nota: { 3: 'dos cambios' } }],
        ['Misma planta, misma agua; solo cambia la luz.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'En los montajes, el par correcto cambia solo la variable de la pregunta.'),
      xpHaz('hoja', 'Un agricultor siembra arveja un año y maíz al siguiente en el mismo lote, sin abono, y el maíz crece bien. ¿Qué lo explica?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [0], paras: [['Las bacterias de la raíz de la arveja dejaron nitrógeno que el maíz puede usar.'], ['La arveja sacó el nitrógeno del suelo y lo devolvió al aire.'], ['El maíz toma el nitrógeno directo del aire.'], ['La arveja dejó azúcar en el suelo.']], pista: 'Recuerda quién convierte el nitrógeno del aire y dónde viven esas bacterias.' }, 'La arveja, con sus bacterias, deja nitrógeno en una forma útil.')],
    cierre: 'La materia circula: agua, carbono y nitrógeno van y vuelven, y cada montaje cambia una sola cosa.',
  });

  // Un colibrí, una población de colibríes y la comunidad entera.
  const vecinos = (v, K) => {
    const k = v.k || 0;
    let s = '';
    if (k >= 3) s += X.arbol(60, 166, 1.3) + X.planta(250, 166, 30, 1, { flor: 1, hojas: 4 }) + conejo(160, 164, 0.9) + hongo(310, 166, 0.8);
    const B = k >= 2 ? [[150, 60], [190, 44], [230, 70], [120, 92], [270, 40]] : k >= 1 ? [[190, 60]] : [];
    B.forEach(([x, y]) => { s += colibri(x, y, 1.1); });
    if (v.t) s += X.rot(170, 188, v.t, 'oscuro');
    return X.foto(s, 200, 'campo', 166);
  };

  xpAmplia('icf-cn-ecosistemas-3', {
    conecta: 'icf-cn-ecosistemas-1',
    desde: [
      ['Desde cero: especie, población y comunidad',
        xpMira('dibujo', 'Para hablar de cómo se relacionan los seres vivos hacen falta tres palabras que el examen usa sin explicar.', { dib: vecinos, v: { k: 0 }, alto: 200 }, [
          ['En la lección de cadenas viste que en un ecosistema unos se comen a otros.', {}],
          ['Especie: seres parecidos que pueden tener crías fértiles entre sí.', { k: 1, t: 'especie: un tipo de colibrí' }],
          ['Todos los de una especie que viven en un lugar forman una población.', { k: 2, t: 'población: los colibríes de aquí' }],
          ['Todas las poblaciones del lugar juntas forman la comunidad.', { k: 3, t: 'comunidad: todos los que viven aquí' }],
          ['Y comerse no es la única relación: también se ayudan o se estorban.', { k: 3 }],
        ], 'Especie: un tipo de ser. Población: los de una especie en un lugar. Comunidad: todas las poblaciones.'),
        xpHaz('hoja', 'Pon al margen qué es cada grupo.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['comunidad', 'población', 'especie'], meta: [1, 0, 2], paras: [['Todas las vacas de una finca'], ['Las vacas, el pasto, las garzas y los hongos de la finca'], ['Las vacas en general, que pueden tener crías entre sí']], pista: 'Alguno no va ahí: ¿una especie en un lugar, muchas especies juntas o el tipo de ser?' }, 'Vacas de la finca: población. Todos juntos: comunidad. El tipo: especie.')],
    ],
    despues: [
      ['Más difícil: cuando una relación sostiene a otra',
        xpMira('hoja', 'Las relaciones se encadenan. El caso que más sale: los **polinizadores** y las cosechas.', { paras: [['La abeja toma néctar de la flor del aguacate.'], ['Al pasar de flor en flor, lleva el polen.'], ['Sin ese polen, la flor no forma fruto.'], ['Si un veneno mata las abejas, baja la cosecha.']] }, [
          ['La abeja gana comida: el néctar.', { luz: [0], nota: { 0: 'gana la abeja' } }],
          ['La planta gana quien le lleve el polen.', { luz: [1], nota: { 1: 'gana la planta' } }],
          ['Ganan las dos: es mutualismo.', { luz: [0, 1] }],
          ['Y del fruto dependen otros: animales y agricultores.', { luz: [2] }],
          ['Matar un polinizador toca a toda la red, no solo a la abeja.', { luz: [3], nota: { 3: 'efecto en cadena' } }],
        ], 'Un mutualismo puede sostener a muchos: si cae el polinizador, caen los frutos y quienes los usan.'),
        xpHaz('hoja', 'Un murciélago come néctar de una flor que solo él poliniza. Desaparecen los murciélagos. Subraya lo más probable.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La planta forma más frutos.'], ['La planta deja de formar frutos y su población baja.'], ['A la planta no le pasa nada.']], pista: 'Si nadie más lleva su polen, ¿cómo forma frutos y semillas?' }, 'Sin polinizador no hay frutos ni semillas nuevas.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Dos escarabajos que comen semillas: cada uno solo llega a 300 individuos. Juntos, uno llega a 250 y el otro a 40. ¿Qué relación es más probable?', { letras: ['A', 'B', 'C', 'D'], paras: [['Mutualismo, porque viven juntos.'], ['Competencia, porque juntos los dos quedan con menos.'], ['Depredación, porque uno se comió al otro.'], ['Comensalismo, porque a uno no le pasa nada.']] }, [
        ['Compara cada uno solo y acompañado: los dos bajan.', {}],
        ['Vivir juntos no es ayudarse: aquí los dos pierden.', { luz: [0], nota: { 0: 'no se ayudan' } }],
        ['Nada dice que se coman: los dos comen semillas.', { luz: [2], nota: { 2: 'sin evidencia' } }],
        ['A los dos les pasa algo: de 300 a 250 y a 40.', { luz: [3], nota: { 3: 'falso' } }],
        ['Los dos pierden porque usan lo mismo: competencia.', { luz: [1], nota: { 1: 'correcta' } }],
      ], 'Compara cada especie sola y acompañada: si las dos bajan, compiten.'),
      xpHaz('hoja', 'Una orquídea crece sobre un árbol sin quitarle agua ni comida; solo usa la altura para recibir luz. ¿Qué relación es?', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Parasitismo, porque vive encima de otro.'], ['Comensalismo: ella gana y al árbol le da igual.'], ['Mutualismo, porque los dos ganan.'], ['Competencia, porque los dos pierden.']], pista: 'Pregunta qué gana o pierde cada uno. ¿Al árbol le quitan algo?' }, 'La orquídea gana luz y el árbol no gana ni pierde.')],
    cierre: 'Especie, población y comunidad; pregunta qué gana o pierde cada uno y sigue el efecto por la red.',
  });
}
