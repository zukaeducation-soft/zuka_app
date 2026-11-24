// Preuniversitario · pu-cd-1 «Claves de sustitución» (Explora). Los ejemplos no son los de los ejercicios.
{
  const ABC = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', cif = (w, k) => [...w].map(l => ABC[(ABC.indexOf(l) + k + 26) % 26]).join('');
  // Disco: afuera el alfabeto normal; adentro, el corrido k lugares (debajo de A está la letra A + k).
  const disco = (v, K) => {
    let h = K.c(170, 118, 106, 'fn') + K.c(170, 118, 82, 'fn') + K.c(170, 118, 58, 'fn');
    for (let i = 0; i < 26; i++) { const a = 90 - i * 360 / 26, p = K.at(170, 118, 94, a), q = K.at(170, 118, 70, a + v.k * 360 / 26); h += K.t(p[0], p[1] + 4, ABC[i], 's') + K.t(q[0], q[1] + 4, ABC[i], 's ta'); }
    return h + K.t(170, 112, v.t ?? '', 's tm') + K.t(170, 134, v.c ?? '', 'ta');
  };
  const focos = (v, K) => [16, 8, 4, 2, 1].map((n, i) => K.c(50 + i * 60, 80, 22, v.b[i] === '1' ? 'fG' : 'fc') + K.t(50 + i * 60, 86, n, v.b[i] === '1' ? 'tc' : 'tm') + K.t(50 + i * 60, 126, v.b[i], 'b')).join('') + K.t(170, 34, v.p || '', 'ta');
  const tira = (v, K) => [...v.w].map((l, i) => { const x = 170 + (i - (v.w.length - 1) / 2) * 66; return K.r(x - 27, 34, 54, 48, 'fa', 10) + K.t(x, 66, l, 'B') + K.f(v.n, K.t(x, 112, ABC.indexOf(l) + 1, 'b tg')); }).join('') + K.t(170, 152, v.p || '', 'b ta');

  xpLec('pu-cd-1', [
    ['El alfabeto corrido',
      xpMira('dibujo', 'Empecemos por la idea: una clave antigua **corre** el alfabeto unos lugares.', { dib: disco, v: { k: 0, t: '', c: '' }, alto: 232 }, [
        ['Dos discos con el alfabeto. Sin girar, cada letra va consigo misma.', {}],
        ['Giramos el de adentro 5 lugares: ahora A va con F, B va con G.', { k: 5, t: 'A → F' }],
        ['Para cifrar SOL se busca cada letra afuera y se lee la de adentro: X, T, Q.', { t: 'SOL', c: 'XTQ' }],
        ['Para descifrar se hace al revés: de adentro hacia afuera. Se devuelven los 5 lugares.', { t: 'XTQ', c: 'SOL' }],
        ['Después de la Z sigue la A: la Y corrida 5 lugares es D.', { t: 'Y → D', c: '' }],
      ], 'Cifrar: avanzar k lugares. Descifrar: devolverse k. Después de Z sigue A.'),
      xpHaz('dibujo', 'En una clave, la H se cifra con N. Gira el disco de adentro hasta que coincidan.', { dib: (v, K) => disco({ k: v.k, t: 'MAR', c: cif('MAR', v.k) }, K), v: { k: 1 }, metas: { k: 6 }, alto: 232,
        manijas: [{ k: 'k', min: 0, max: 25, paso: 1, r: 10, en: v => XPK.at(170, 118, 44, 90 + v.k * 360 / 26), de: (x, y, v) => { const k = (Math.atan2(118 - y, x - 170) * 180 / Math.PI - 90) / (360 / 26); return v.k + ((((k - v.k) % 26) + 39) % 26) - 13; } }],
        lee: v => `$\\text{H} \\to \\text{${cif('H', v.k)}}$`, dice: v => `Corrido ${v.k} ${v.k === 1 ? 'lugar' : 'lugares'}: MAR se escribe ${cif('MAR', v.k)}.` }, 'De H a N hay 6 lugares: es la clave de todas las letras.')],
    ['Letras con valor',
      xpMira('dibujo', 'Segunda idea: otras claves cambian cada letra por su **número**.', { dib: tira, v: { w: 'SOL', n: 0, p: '' }, alto: 168 }, [
        ['A vale 1, B vale 2… hasta Z, que vale 26. ¿Cuánto vale SOL?', {}],
        ['S es la letra 19, O es la 15 y L es la 12.', { n: 1 }],
        ['Se suman: 19 más 15 más 12 son 46.', { p: '46' }, '$19 + 15 + 12 = 46$'],
        ['Atajo para contar: E es 5, J es 10, O es 15, T es 20 y Y es 25.', { p: 'E 5 · J 10 · O 15 · T 20 · Y 25' }],
      ], 'Memoriza E 5, J 10, O 15, T 20 y cuenta desde la más cercana.'),
      xpHaz('fichas', 'Pon el valor de cada letra de MESA y el total.', { slots: [0, 1, 2, 3].map(i => ({ x: 46 + i * 62, y: 92, w: 56 })).concat([{ x: 302, y: 92, w: 64, et: 'total' }]), fichas: ['13', '5', '19', '1', '38', '37', '12'], meta: ['13', '5', '19', '1', '38'], alto: 140, fondo: K => [...'MESA'].map((l, i) => K.t(46 + i * 62, 58, l, 'B ta')).join(''), pista: 'M está después de la J (10): K 11, L 12, M 13.' }, '$13 + 5 + 19 + 1 = 38$.')],
    ['Bombillos: el binario',
      xpMira('dibujo', 'Tercera idea: con **bombillos** prendidos y apagados se escribe cualquier número.', { dib: focos, v: { b: '00000', p: '' }, alto: 150 }, [
        ['Cinco bombillos que valen 16, 8, 4, 2 y 1. Cada uno vale el doble del de su derecha.', {}],
        ['Prendemos el 8, el 4 y el 1: suman 13.', { b: '01101', p: '8 + 4 + 1 = 13' }, '$01101 \\to 13$'],
        ['Para escribir el 6: ¿cabe el 16? No. ¿El 8? No. El 4 sí, y quedan 2.', { b: '00100', p: '6 − 4 = 2' }],
        ['El 2 también: 4 más 2 son 6. Cada número se escribe de una sola manera.', { b: '00110', p: '4 + 2 = 6' }, '$00110 \\to 6$'],
      ], 'Empieza por el bombillo más grande que quepa y sigue con lo que falta.'),
      xpHaz('rejilla', 'Prende los bombillos que suman 19.', { f: 1, c: 5, cw: 60, ch: 56, celda: (i) => String([16, 8, 4, 2, 1][i]), unoAUno: true, meta: [0, 3, 4], lee: c => `$${[16, 8, 4, 2, 1].filter((_, i) => c[i]).join(' + ') || 0} = ${[16, 8, 4, 2, 1].reduce((a, n, i) => a + n * c[i], 0)}$`, dice: c => `El tablero dice ${c.join(' ')}.` }, '$16 + 2 + 1 = 19$: se escribe 1 0 0 1 1.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Cada letra se cambió por la que está 2 lugares después. Descifra NWB: ¿qué palabra era?', { slots: [0, 1, 2].map(i => ({ x: 108 + i * 64, y: 104, w: 56 })), fichas: ['L', 'U', 'Z', 'P', 'Y', 'D', 'A'], meta: ['L', 'U', 'Z'], alto: 136, fondo: K => [...'NWB'].map((l, i) => K.t(108 + i * 64, 44, l, 'B tg') + K.ar(108 + i * 64, 54, 108 + i * 64, 78, 'lm')).join(''), pista: 'Descifrar es devolverse 2. Antes de la A está la Z.' }, 'N − 2 = L, W − 2 = U y B − 2 = Z: LUZ.')],
  ], 'Correr el alfabeto, sumar el valor de las letras y prender bombillos que duplican.');
}
