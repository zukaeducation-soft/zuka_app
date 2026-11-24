// Ejercicios de «Conteo y combinatoria» (pu-co-1 a pu-co-5) con las escenas de la explicación: árboles, casillas, grupos, cuadrículas
// y calles. Armazones en js/games/figura-kit.js y js/games/logica-kit.js (spec 2026-11-24-ejercicios-explora).
(() => {
  const R = Math.round, C = ['fa', 'fg', 'ff', 'fo'];
  const fac = n => (n < 2 ? 1 : n * fac(n - 1));

  // Cuenta por casillas: se llena cada una con su número.  params { et, ops, metas, fichas, mira: [aviso por casilla], trampas?, ok }
  //   (metas en el orden de las casillas; ops: lo que va entre casilla y casilla)
  function cuenta(name, alto, escena) {
    const ancho = p => Math.min(84, 324 / p.et.length - 18), X = (p, i) => 170 + (i - (p.et.length - 1) / 2) * (324 / p.et.length);
    XG.rotula(name, {
      slots: p => p.et.map((_, i) => ({ x: R(X(p, i)), y: alto + 22, w: R(ancho(p)), h: 38 })), fichas: p => p.fichas, metas: p => p.metas, alto: () => alto + 64,
      texto: p => p.metas.map((m, i) => `${p.et[i]}: ${m}`).join('; '),
      fondo: (K, p, f) => escena(K, p, f) + p.et.map((t, i) => K.t(X(p, i), alto + 58, t, 's tm') + (p.ops?.[i] ? K.t((X(p, i) + X(p, i + 1)) / 2, alto + 28, p.ops[i], 'b') : '')).join(''),
      aviso(q, p) { const i = p.metas.findIndex((m, k) => q[k][0] !== m); return p.trampas?.[`${i}:${q[i][0]}`] || p.mira[i]; },
      bien: p => p.ok,
    });
  }
  const persona = (K, x, y, cls, t) => K.c(x, y, 12, cls) + (t ? K.t(x, y + 5, t, 's') : '');
  const gente = (K, n, y, sel = 0) => Array.from({ length: n }, (_, i) => persona(K, 170 + (i - (n - 1) / 2) * Math.min(32, 300 / n), y, i < sel ? 'fa' : 'fc', 'ABCDEFGHIJKL'[i])).join('');
  const cajon = (K, n, y, w = 46) => Array.from({ length: n }, (_, i) => K.r(170 + (i - n / 2) * (w + 6) + 3, y, w, 44, 'fc', 8)).join('');

  // Frases que se tocan.  params { casos: [{ t, si }], no, falta, ok }
  function frases(name, pie) {
    const si = p => p.casos.map((_, i) => i).filter(i => p.casos[i].si);
    XG.marca(name, {
      sitios: p => p.casos.map((_, i) => ({ x: 170, y: 24 + i * 44, w: 324, h: 38 })), cara: (K, p, i) => K.t(170, 29 + i * 44, p.casos[i].t, 's'), alto: p => p.casos.length * 44 + 6,
      sol: si, aviso: (on, p) => (on.some((x, i) => x && !p.casos[i].si) ? p.no : p.falta), bien: p => p.ok, texto: p => si(p).map(i => p.casos[i].t).join('; '), pie,
    });
  }
  // Fichas cortas que se tocan.  params { fichas, … }
  function fichas(name, vale, d) {
    const si = p => p.fichas.map((_, i) => i).filter(i => vale(p.fichas[i], p));
    XG.marca(name, {
      sitios: p => p.fichas.map((_, i) => ({ x: 62 + (i % 3) * 108, y: d.y + Math.floor(i / 3) * 54, w: 96, h: 44 })), cara: (K, p, i) => K.t(62 + (i % 3) * 108, d.y + 6 + Math.floor(i / 3) * 54, p.fichas[i], 'b'),
      alto: p => d.y + Math.ceil(p.fichas.length / 3) * 54 - 24, fondo: d.fondo, sol: si, aviso: (on, p) => (on.some((x, i) => x && !vale(p.fichas[i], p)) ? d.no(p.fichas[on.findIndex((x, i) => x && !vale(p.fichas[i], p))], p) : d.falta), bien: d.bien, texto: p => si(p).map(i => p.fichas[i]).join(', '), pie: d.pie,
    });
  }
  // Casillas de una cuadrícula que se tocan.
  function celdas(name, d) {
    const u = p => Math.min(d.max || 40, 316 / p.cols), x0 = p => (d.x0 ?? 170 - p.cols * u(p) / 2), y0 = d.y0 ?? 10;
    const si = p => Array.from({ length: p.filas * p.cols }, (_, i) => i).filter(i => d.vale(Math.floor(i / p.cols), i % p.cols, p));
    XG.marca(name, {
      sitios: p => Array.from({ length: p.filas * p.cols }, (_, i) => ({ x: x0(p) + (i % p.cols + 0.5) * u(p), y: y0 + (Math.floor(i / p.cols) + 0.5) * u(p), w: u(p) - 4, h: u(p) - 4 })),
      cara: (K, p, i) => K.t(x0(p) + (i % p.cols + 0.5) * u(p), y0 + (Math.floor(i / p.cols) + 0.5) * u(p) + 5, d.cara ? d.cara(Math.floor(i / p.cols), i % p.cols, p) : '', d.cls || ''),
      fondo: (K, p) => (d.fondo ? d.fondo(K, p, x0(p), y0, u(p)) : ''), alto: p => y0 + p.filas * u(p) + 6, sol: si, nombre: d.nombre,
      aviso(on, p) { const s = si(p), mal = on.findIndex((x, i) => x && !s.includes(i)); return mal >= 0 ? d.no(Math.floor(mal / p.cols), mal % p.cols, p) : d.falta(p); }, bien: d.bien, texto: p => `son ${si(p).length}`, pie: d.pie,
    });
  }
  // En movimiento: el ascensor sube el número de pisos que se le dé y debe parar en el de la respuesta.
  function ascensor(name, max, paso = 1) {
    XG.tiros(name, {
      perilla: () => ({ et: 'Cantidad', min: 0, max: max / paso, cara: v => v * paso, lee: v => `${v * paso}` }), meta: t => t.r / paso, alto: 150, ms: 1600,
      dib(t, v, K, p, f) {
        const m = t.r / paso, k = v == null ? 0 : (v === m ? 1 : v < m ? 0.68 : 1.3) * f, y = q => 128 - q * 78; let h = K.l(136, 8, 136, 144, 'lm') + K.l(204, 8, 204, 144, 'lm');
        for (let i = 0; i < 7; i++) h += K.l(136, 128 - i * 20, 130, 128 - i * 20, 'lm') + K.l(204, 128 - i * 20, 210, 128 - i * 20, 'lm');
        return h + K.l(210, y(1), 262, y(1), f >= 1 && v === m ? 'lo gr' : 'lg d gr') + K.t(270, y(1) + 5, 'aquí', 's tm', 'start') + K.l(170, 4, 170, y(k) - 16, 'lm') + K.r(142, y(k) - 16, 56, 32, f >= 1 && v !== m ? 'ff' : f >= 1 ? 'fo' : 'fa', 5) + K.t(170, y(k) + 6, v == null ? '' : v * paso, 'b');
      },
      falla: (t, v) => t.e?.[v * paso] || (v * paso > t.r ? 'Subió de más: se contó algo repetido o de sobra.' : 'Le faltó subir: quedaron casos sin contar.'), cuenta: t => `$${t.c} = ${t.r}$`, pie: 'Estira hasta tu cuenta y suelta: el ascensor sube.',
    });
  }
  ascensor('sube-arbol', 40); ascensor('sube-orden', 150, 5); ascensor('sube-grupo', 48); ascensor('sube-casos', 40); ascensor('sube-figuras', 44);

  // -------------------------------------------------------------------------------------- pu-co-1 · multiplicar o sumar
  // Árbol: a ramas, cada una se abre en n, y cada una en c.  v { n }
  XG.figura('arbol-ramas', {
    ini: () => ({ n: 1 }), manijas: p => [{ k: 'n', min: 1, max: p.max, paso: 1, et: p.et }], ok: (v, p) => p.a * v.n * p.c === p.total, sol: p => ({ n: p.total / (p.a * p.c) }),
    texto: p => `$${p.a} \\cdot ${p.total / (p.a * p.c)} \\cdot ${p.c} = ${p.total}$`, alto: () => 236, ms: 1900, pie: 'Mueve la perilla. Al comprobar se abre todo el árbol.',
    dib(v, K, p, f) {
      const n = R(v.n); let h = K.c(22, 92, 6, 'fk');
      for (let i = 0; i < p.a; i++) {
        const y = 92 + (i - (p.a - 1) / 2) * (164 / p.a); h += K.l(22, 92, 88, y, 'lm') + K.c(88, y, 8, C[i]);
        if (f) for (let j = 0; j < n; j++) { const yy = y + (j - (n - 1) / 2) * (164 / p.a / n); h += K.f(f * 2, K.l(96, y, 180, yy, 'lm') + K.c(180, yy, Math.min(6, 60 / p.a / n), C[i])); for (let k = 0; k < p.c; k++) { const z = yy + (k - (p.c - 1) / 2) * (164 / p.a / n / p.c); h += K.f(f * 2 - 1, K.l(186, yy, 262, z, 'lm') + K.c(264, z, Math.min(2.4, 60 / (p.a * n * p.c)), C[i])); } }
        else h += K.t(112, y + 5, '…', 'tm', 'start');
      }
      return h + K.f(f * 2 - 1, K.t(284, 98, p.a * n * p.c, 'b ta', 'start'));
    },
    lee: (v, p) => `$${p.a} \\cdot ${R(v.n)} \\cdot ${p.c} = ${p.a * R(v.n) * p.c}$`,
    aviso: (v, p) => (p.a + v.n + p.c === p.total ? 'Sumaste; las tres decisiones se toman juntas y se multiplican.' : p.a * v.n === p.total ? 'Faltó la última decisión, que abre más ramas.' : p.a * v.n * p.c > p.total ? 'Salen más combinaciones.' : 'Salen menos combinaciones.'), bien: (v, p) => `${p.a * v.n * p.c} puntas en el árbol.`,
  });
  frases('se-multiplica', 'Toca todas las que se multiplican.');
  cuenta('placa-casillas', 80, (K, p) => K.r(60, 14, 220, 58, 'fc', 10) + p.modelo.map((t, i) => K.t(170 + (i - (p.modelo.length - 1) / 2) * 56, 52, t, 'b ta')).join(''));
  cuenta('tira-colores', 80, (K, p, f) => p.modelo.map((_, i) => K.r(170 + (i - p.modelo.length / 2) * 54, 16, 54, 54, f ? p.modelo[i] : 'fc', 0)).join(''));
  celdas('rejilla-permitida', {
    max: 52, x0: 100, y0: 30, vale: (r, c, p) => !p.veta.some(([a, b]) => a === r && b === c), fondo: (K, p, x, y, u) => p.ef.map((t, i) => K.t(x - 8, y + (i + 0.5) * u + 5, t, 's', 'end')).join('') + p.ec.map((t, i) => K.t(x + (i + 0.5) * u, y - 8, t, 's')).join(''),
    nombre: (p, i) => `${p.ef[Math.floor(i / p.cols)]}, ${p.ec[i % p.cols]}`, no: (r, c, p) => `${p.ef[r]} con ${p.ec[c]} no está permitido.`, falta: () => 'Falta alguna: recorre fila por fila.', bien: p => `De ${p.filas} por ${p.cols}, ${p.filas * p.cols}, se quitan ${p.veta.length}.`, pie: 'Toca todas las que se pueden.',
  });
  XG.figura('interruptores', {
    ini: () => ({ n: 1 }), manijas: p => [{ k: 'n', min: 1, max: p.max, paso: 1, et: 'interruptores' }], ok: (v, p) => 2 ** v.n === p.total, sol: p => ({ n: Math.log2(p.total) }), texto: p => `$2^{${Math.log2(p.total)}} = ${p.total}$`, alto: () => 172, pie: 'Mueve la perilla.',
    dib: (v, K, p, f) => Array.from({ length: R(v.n) }, (_, i) => { const x = 170 + (i - (R(v.n) - 1) / 2) * Math.min(36, 300 / p.max); return K.r(x - 10, 22, 20, 38, 'fc', 10) + K.c(x, i % 2 ? 50 : 32, 7, i % 2 ? 'fM' : 'fA') + K.f(f * R(v.n) - i, K.t(x, 84, 2 ** (i + 1), 's ta')); }).join(''),
    lee: v => `$2^{${R(v.n)}} = ${2 ** R(v.n)}$`, aviso: (v, p) => (2 * v.n === p.total ? 'No se suman: cada uno duplica los estados.' : 2 ** v.n > p.total ? 'Salen más estados: cada interruptor los duplica.' : 'Salen menos estados: cada interruptor los duplica.'), bien: () => 'Cada interruptor duplica lo que había.',
  });
  cuenta('rutas-tramos', 106, (K, p, f) => { const A = [34, 60], B = [170, 24], Z = [306, 60], arco = (P, Q, n, cls, abajo) => Array.from({ length: n }, (_, i) => { const d = (i - (n - 1) / 2) * 13, mx = (P[0] + Q[0]) / 2, my = (P[1] + Q[1]) / 2 + (abajo ? 34 : 0) + d; return `<path class="xl ${cls}" d="M${P} Q${mx} ${my} ${Q}"/>`; }).join(''); return arco(A, B, p.ab, 'la') + arco(B, Z, p.bz, 'lg') + arco(A, Z, p.az, 'lf', true) + [[A, 'A'], [B, 'B'], [Z, 'C']].map(([q, t]) => K.c(...q, 13, 'fc') + K.t(q[0], q[1] + 5, t)).join(''); });

  // ------------------------------------------------------------------------------------------------ pu-co-2 · ordenar
  cuenta('fila-factorial', 70, (K, p) => Array.from({ length: p.et.length - 1 }, (_, i) => K.r(170 + (i - (p.et.length - 1) / 2) * 40 + 6, 12, 28, 50, C[i % 4], 4)).join(''));
  cuenta('podio-puestos', 84, (K, p) => gente(K, p.n, 24) + K.r(100, 58, 44, 26, 'fg', 3) + K.r(148, 46, 44, 38, 'fa', 3) + K.r(196, 64, 44, 20, 'ff', 3) + K.t(122, 76, '2', 's') + K.t(170, 70, '1', 's') + K.t(218, 79, '3', 's'));
  const junta = s => [...s].sort().join('');
  fichas('palabras-distintas', (t, p) => junta(t) === junta(p.letras), {
    y: 96, fondo: (K, p) => [...p.letras].map((l, i) => K.r(170 + (i - p.letras.length / 2) * 44 + 2, 14, 40, 44, 'fa', 8) + K.t(170 + (i - (p.letras.length - 1) / 2) * 44, 42, l, 'b')).join(''),
    no: (t, p) => `«${t}» no lleva las mismas letras: cuenta cuántas hay de cada una.`, falta: 'Falta una: corre de lugar la letra que no se repite.', bien: p => `Son ${fac(p.letras.length)} órdenes entre ${fac(2)}: las repetidas no cambian la palabra.`, pie: 'Toca todas las palabras que salen de esas letras.',
  });
  cuenta('repetidas-divide', 70, (K, p) => { const vis = {}; return [...p.palabra].map((l, i) => { const rep = [...p.palabra].filter(x => x === l).length > 1; return K.r(170 + (i - p.palabra.length / 2) * 42 + 2, 14, 38, 44, rep ? (vis[l] ||= C[Object.keys(vis).length]) : 'fc', 8) + K.t(170 + (i - (p.palabra.length - 1) / 2) * 42, 42, l, 'b'); }).join(''); });
  cuenta('paquete-juntos', 74, (K, p, f) => Array.from({ length: p.n }, (_, i) => K.r(170 + (i - p.n / 2) * 42 + 3, 18, 36, 42, i < p.k ? 'fa' : 'fc', 6)).join('') + K.f(0.4 + 0.6 * f, K.r(170 - p.n / 2 * 42 - 2, 11, p.k * 42 + 3, 56, 'fn gr', 12)));
  cuenta('casilla-exigente', 74, (K, p) => K.t(170, 22, p.digitos.join('   '), 'ta') + cajon(K, p.cifras, 30));
  XG.figura('cuantos-candidatos', {
    ini: () => ({ n: 2 }), manijas: p => [{ k: 'n', min: 2, max: p.max, paso: 1, et: 'candidatos' }], ok: (v, p) => v.n * (v.n - 1) === p.total, sol(p) { for (let n = 2; n <= p.max; n++) if (n * (n - 1) === p.total) return { n }; return null; },
    texto(p) { const n = (1 + Math.sqrt(1 + 4 * p.total)) / 2; return `$${n} \\cdot ${n - 1} = ${p.total}$`; }, alto: () => 190, pie: 'Mueve la perilla.',
    dib: (v, K, p, f) => gente(K, R(v.n), 28) + p.cargos.map((t, i) => K.r(76 + i * 106, 58, 82, 44, 'fc', 8) + K.t(117 + i * 106, 118, t, 's tm') + K.f(f * 2 - i, K.t(117 + i * 106, 87, R(v.n) - i, 'b ta'))).join(''),
    lee: v => `$${R(v.n)} \\cdot ${R(v.n) - 1} = ${R(v.n) * (R(v.n) - 1)}$`, aviso: (v, p) => (2 * v.n === p.total ? 'No se suma: cada quien puede ir con cada otro.' : v.n * (v.n - 1) > p.total ? 'Habría más repartos.' : 'Habría menos repartos.'), bien: () => 'El segundo cargo tiene una opción menos.',
  });

  // ------------------------------------------------------------------------------------------------ pu-co-3 · escoger
  fichas('mismo-grupo', (t, p) => junta(t) === junta(p.grupo), {
    y: 86, fondo: (K, p) => K.t(170, 18, 'grupo', 's tm') + [...p.grupo].map((l, i) => persona(K, 170 + (i - (p.grupo.length - 1) / 2) * 34, 42, 'fa', l)).join(''),
    no: (t, p) => (new Set(t).size < t.length ? `En «${t}» alguien está repetido.` : `«${t}» tiene a otra persona.`), falta: 'Falta una: son las mismas personas en otro orden.', bien: () => 'Mismas personas en otro orden: es un solo grupo.', pie: 'Toca todas las que son ese mismo grupo.',
  });
  frases('orden-no-importa', 'Toca todas en las que el orden no importa.');
  cuenta('divide-ordenes', 62, (K, p) => gente(K, p.n, 34, p.k));
  cuenta('elige-deja', 62, (K, p) => gente(K, p.n, 34, p.k));
  cuenta('comite-mixto', 84, (K, p) => Array.from({ length: p.a }, (_, i) => persona(K, 170 + (i - (p.a - 1) / 2) * 34, 22, 'fa')).join('') + Array.from({ length: p.b }, (_, i) => persona(K, 170 + (i - (p.b - 1) / 2) * 34, 60, 'fg')).join(''));
  cuenta('con-o-sin', 62, (K, p) => persona(K, 60, 34, 'ff', 'Ana') + Array.from({ length: p.n - 1 }, (_, i) => persona(K, 110 + i * 32, 34, 'fc', 'BCDEFGH'[i])).join(''));
  const puntos = (K, n, cy, r) => Array.from({ length: n }, (_, i) => K.at(170, cy, r, 90 + i * 360 / n));
  const lineas = (K, P, salta) => { let h = ''; const n = P.length; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) if (!salta || (j - i > 1 && !(i === 0 && j === n - 1))) h += K.l(...P[i], ...P[j], 'lr'); return h; };
  XG.figura('cuantos-saludos', {
    ini: () => ({ n: 3 }), manijas: p => [{ k: 'n', min: 3, max: p.max, paso: 1, et: 'personas' }], ok: (v, p) => v.n * (v.n - 1) / 2 === p.total, sol: p => ({ n: (1 + Math.sqrt(1 + 8 * p.total)) / 2 }),
    texto(p) { const n = (1 + Math.sqrt(1 + 8 * p.total)) / 2; return `$\\tfrac{${n} \\cdot ${n - 1}}{2} = ${p.total}$`; }, alto: () => 240, pie: 'Mueve la perilla.',
    dib(v, K, p, f) { const P = puntos(K, R(v.n), 88, 72); return K.f(f, lineas(K, P)) + P.map(q => K.c(...q, 8, 'fa')).join(''); },
    lee: v => `$\\tfrac{${R(v.n)} \\cdot ${R(v.n) - 1}}{2} = ${R(v.n) * (R(v.n) - 1) / 2}$`, aviso: (v, p) => (v.n * (v.n - 1) / 2 < p.total && (v.n + 1) * v.n >= p.total ? 'Cada saludo es de dos personas: así salen menos.' : v.n * (v.n - 1) / 2 > p.total ? 'Se saludarían más veces.' : 'Se saludarían menos veces.'), bien: () => 'Cada pareja se saluda una sola vez.',
  });

  // -------------------------------------------------------------------------------------- pu-co-4 · casos y complemento
  celdas('cruce-numeros', { max: 39, vale: (r, c, p) => { const n = r * p.cols + c + 1; return n % p.a === 0 || n % p.b === 0; }, cara: (r, c, p) => r * p.cols + c + 1, no: (r, c, p) => `El ${r * p.cols + c + 1} no es múltiplo de ${p.a} ni de ${p.b}.`, falta: () => 'Falta alguno: recorre los de un número y luego los del otro.', bien: p => `Los múltiplos de ambos, como el ${p.ambos}, se pintan una sola vez.`, pie: 'Toca todos los que cumplen.' });
  cuenta('suma-y-resta', 92, (K, p, f) => K.c(146, 48, 46, 'fa') + K.c(194, 48, 46, 'fg') + K.t(122, 53, p.ea, 's') + K.t(218, 53, p.eb, 's') + K.t(170, 53, 'ambos', 's'));
  XG.figura('cruce-barras', {
    ini: () => ({ x: 0 }), manijas: p => [{ k: 'x', min: 0, max: p.max, paso: 1, et: 'están en los dos grupos' }], ok: (v, p) => p.a + p.b - v.x === p.total, sol: p => ({ x: p.a + p.b - p.total }), texto: p => `$${p.a} + ${p.b} - ${p.total} = ${p.a + p.b - p.total}$`, alto: () => 206, pie: 'Mueve la perilla.',
    dib(v, K, p, f) { const u = 300 / (p.a + p.b), x = f ? v.x : 0; return K.r(20, 26, p.a * u, 26, 'fa') + K.t(26, 44, `${p.a} ${p.ea}`, 's ta', 'start') + K.r(20 + (p.a - x * f) * u, 80, p.b * u, 26, 'fg') + K.t(14 + (p.a + p.b - x * f) * u, 98, `${p.b} ${p.eb}`, 's tg', 'end') + K.f(f, K.r(20 + (p.a - x) * u, 26, x * u, 80, 'fn d') + K.l(20 + p.total * u, 18, 20 + p.total * u, 124, 'lo gr') + K.t(20 + p.total * u, 138, `${p.total} en total`, 's to')); },
    lee: (v, p) => `$${p.a} + ${p.b} - ${R(v.x)} = ${p.a + p.b - R(v.x)}$`, aviso: (v, p) => (p.a + p.b - v.x > p.total ? 'Quedarían más personas de las que hay: hay más en los dos.' : 'Quedarían menos personas de las que hay: hay menos en los dos.'), bien: () => 'Lo que sobra al sumar se contó dos veces.',
  });
  cuenta('todos-ninguno', 74, (K, p) => cajon(K, p.puestos, 18));
  celdas('ruletas-alguno', { max: 42, x0: 110, y0: 30, vale: (r, c, p) => r + 1 === p.n || c + 1 === p.n, cara: (r, c) => `${r + 1}${c + 1}`, fondo: (K, p, x, y, u) => K.t(x + p.cols * u / 2, 16, 'segunda ruleta', 's tm') + K.t(x - 12, y + p.filas * u / 2 + 5, 'primera', 's tm', 'end'), no: (r, c, p) => `En ${r + 1}${c + 1} no sale ningún ${p.n}.`, falta: p => `Falta alguno: el ${p.n} puede salir en la primera, en la segunda o en las dos.`, bien: p => `$${p.filas * p.cols} - ${(p.filas - 1) * (p.cols - 1)} = ${p.filas + p.cols - 1}$`.replace(/\$/g, ''), pie: 'Toca todos los resultados que cumplen.' });
  cuenta('parte-casos', 74, (K, p) => K.t(170, 22, p.digitos.join('   '), 'ta') + cajon(K, p.cifras, 30));
  frases('lo-contrario', 'Toca todas las que dicen lo contrario.');

  // ------------------------------------------------------------------------------------------- pu-co-5 · figuras y caminos
  const malla = (K, f, c, u, y) => { let h = ''; for (let i = 0; i < f; i++) for (let j = 0; j < c; j++) h += K.r(170 + (j - c / 2) * u, y + i * u, u, u, 'fc', 0); return h; };
  cuenta('cuadrados-tamano', 112, (K, p, f) => malla(K, p.f, p.c, 32, 8) + K.f(f, K.r(170 - p.c / 2 * 32 + 2, 10, 60, 60, 'fa', 3)));
  celdas('donde-cabe', { max: 54, vale: (r, c, p) => r + p.s <= p.filas && c + p.s <= p.cols, no: (r, c, p) => 'Desde esa casilla, el cuadrado se sale de la cuadrícula.', falta: () => 'Cabe en otro lugar: córrelo a lo ancho y a lo alto.', bien: p => `Cabe en ${p.cols - p.s + 1} lugares a lo ancho y ${p.filas - p.s + 1} a lo alto.`, pie: 'Toca cada casilla que puede ser su esquina de arriba a la izquierda.', nombre: (p, i) => `fila ${Math.floor(i / p.cols) + 1}, columna ${i % p.cols + 1}` });
  XG.figura('lados-diagonales', {
    ini: () => ({ n: 4 }), manijas: p => [{ k: 'n', min: 3, max: p.max, paso: 1, et: 'lados' }], ok: (v, p) => v.n * (v.n - 3) / 2 === p.total, sol: p => ({ n: (3 + Math.sqrt(9 + 8 * p.total)) / 2 }),
    texto(p) { const n = (3 + Math.sqrt(9 + 8 * p.total)) / 2; return `$\\tfrac{${n} \\cdot ${n - 3}}{2} = ${p.total}$`; }, alto: () => 240, pie: 'Mueve la perilla.',
    dib(v, K, p, f) { const P = puntos(K, R(v.n), 88, 76); return K.f(f, lineas(K, P, true)) + K.p(P, 'fn') + P.map(q => K.c(...q, 4, 'fk')).join(''); },
    lee: v => `$\\tfrac{${R(v.n)} \\cdot ${R(v.n) - 3}}{2} = ${R(v.n) * (R(v.n) - 3) / 2}$`, aviso: (v, p) => (v.n * (v.n - 3) === p.total ? 'Cada diagonal tiene dos puntas: la contaste dos veces.' : v.n * (v.n - 3) / 2 > p.total ? 'Salen más diagonales.' : 'Salen menos diagonales.'), bien: v => `De cada vértice salen ${v.n - 3}, y cada una se comparte entre dos.`,
  });
  // Calles con una esquina cerrada; se llenan las que faltan.  params { a, b, cierra: [x, y], faltan: [[x, y]] }
  const caminos = p => { const m = {}; for (let y = 0; y <= p.b; y++) for (let x = 0; x <= p.a; x++) m[`${x},${y}`] = p.cierra[0] === x && p.cierra[1] === y ? 0 : x + y === 0 ? 1 : (m[`${x - 1},${y}`] || 0) + (m[`${x},${y - 1}`] || 0); return m; };
  const EX = (p, x) => 170 + (x - p.a / 2) * 84, EY = y => 166 - y * 62;
  XG.rotula('esquina-cerrada', {
    slots: p => p.faltan.map(([x, y]) => ({ x: R(EX(p, x)), y: EY(y), w: 48, h: 36 })), fichas: p => p.fichas, metas: p => p.faltan.map(q => String(caminos(p)[q.join()])), texto: p => `${p.faltan.map(q => caminos(p)[q.join()]).join(', ')}`, alto: () => 194,
    fondo(K, p) { let h = ''; const m = caminos(p); for (let x = 0; x <= p.a; x++) h += K.l(EX(p, x), EY(0), EX(p, x), EY(p.b), 'lm'); for (let y = 0; y <= p.b; y++) h += K.l(EX(p, 0), EY(y), EX(p, p.a), EY(y), 'lm'); for (let y = 0; y <= p.b; y++) for (let x = 0; x <= p.a; x++) { if (p.faltan.some(q => q[0] === x && q[1] === y)) continue; const c = p.cierra[0] === x && p.cierra[1] === y; h += K.c(EX(p, x), EY(y), 14, c ? 'ff' : 'fc') + K.t(EX(p, x), EY(y) + 5, c ? '✗' : x + y === 0 ? 'A' : m[`${x},${y}`], c ? 'tf' : 's'); } return h; },
    aviso(q, p) { const m = caminos(p), i = p.faltan.findIndex((e, k) => q[k][0] !== String(m[e.join()])), [x, y] = p.faltan[i]; return (p.cierra[0] === x - 1 && p.cierra[1] === y) || (p.cierra[0] === x && p.cierra[1] === y - 1) ? 'Por la esquina cerrada no llega nadie: aporta 0.' : 'Suma lo que llega desde la izquierda y desde abajo.'; }, bien: () => 'La esquina cerrada aporta 0 a sus vecinas.',
  });
  cuenta('tira-larga', 62, (K, p, f) => malla(K, 1, p.n, 36, 14) + K.f(f, K.r(170 - p.n / 2 * 36 + 3, 17, 66, 30, 'fa', 4)));
  XG.figura('triangulos-abanico', {
    ini: () => ({ n: 1 }), manijas: p => [{ k: 'n', min: 1, max: p.max, paso: 1, et: 'triángulos pequeños' }], ok: (v, p) => v.n * (v.n + 1) / 2 === p.total, sol: p => ({ n: (-1 + Math.sqrt(1 + 8 * p.total)) / 2 }),
    texto(p) { const n = (-1 + Math.sqrt(1 + 8 * p.total)) / 2; return `$${Array.from({ length: n }, (_, i) => n - i).join(' + ')} = ${p.total}$`; }, alto: () => 232, pie: 'Mueve la perilla.',
    dib(v, K, p, f) { const n = R(v.n), T = [170, 12], X = i => 50 + i * 240 / n; let h = ''; for (let i = 0; i < n; i++) h += K.p([T, [X(i), 140], [X(i + 1), 140]], 'fc'); return h + K.f(f, Array.from({ length: n }, (_, k) => K.t(50 + (k + 0.5) * 240 / n, 162, n - k, 's ta') + (k ? K.t(50 + k * 240 / n, 162, '+', 's tm') : '')).join('')); },
    lee: v => { const n = R(v.n); return `$${Array.from({ length: n }, (_, i) => n - i).join(' + ')} = ${n * (n + 1) / 2}$`; }, aviso: (v, p) => (v.n === p.total ? 'Faltó contar los grandes, que juntan varios pequeños.' : v.n * (v.n + 1) / 2 > p.total ? 'Salen más triángulos: los grandes también cuentan.' : 'Salen menos triángulos.'), bien: () => 'De un pedazo, de dos pedazos, de tres… hasta el grande.',
  });
  fichas('palabra-camino', (t, p) => [...t].filter(x => x === 'E').length === p.e && [...t].filter(x => x === 'N').length === p.n, {
    y: 128, fondo(K, p) { let h = ''; const u = 30, x0 = 170 - p.e * u / 2, y0 = 92; for (let i = 0; i <= p.e; i++) h += K.l(x0 + i * u, y0, x0 + i * u, y0 - p.n * u, 'lm'); for (let j = 0; j <= p.n; j++) h += K.l(x0, y0 - j * u, x0 + p.e * u, y0 - j * u, 'lm'); return h + K.c(x0, y0, 5, 'fA') + K.c(x0 + p.e * u, y0 - p.n * u, 5, 'fF') + K.t(x0 - 12, y0 + 6, 'A') + K.t(x0 + p.e * u + 14, y0 - p.n * u + 6, 'B'); },
    no: (t, p) => { const e = [...t].filter(x => x === 'E').length; return `«${t}» camina ${e} al este y ${t.length - e} al norte: no llega a B.`; }, falta: 'Falta uno: son las mismas cuadras en otro orden.', bien: p => `Todos tienen ${p.e} E y ${p.n} N; solo cambia el orden.`, pie: 'Toca todos los que llegan de A hasta B.',
  });
})();
