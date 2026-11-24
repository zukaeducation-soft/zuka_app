// Ejercicios del mundo «Acertijos de orden y asignación» (pu-or-1 a pu-or-4) con las escenas de la explicación. Armazones en
// js/games/logica-kit.js y js/games/figura-kit.js.
(() => {
  // ------------------------------------------------------------------------------------------------ pu-or-1 · en línea
  const fila = (n, y = 46) => Array.from({ length: n }, (_, i) => { const w = Math.min(72, 330 / n - 4); return { x: 170 + (i - (n - 1) / 2) * (w + 4), y, w, h: 42, et: String(i + 1) }; });
  const linea = { slots: p => fila(p.fichas.length), alto: () => 92, fondo: (K, p) => K.t(8, 14, p.izq || 'primero', 's tm', 'start') + K.t(332, 14, p.der || 'último', 's tm', 'end') };
  XG.puestos('fila-cine', { ...linea, orden: 'de primero a último: ' });
  XG.puestos('llegada-carrera', { ...linea, orden: 'de primero a último: ' });
  XG.puestos('un-cambio', { ...linea, orden: 'de izquierda a derecha: ' });
  // Edificio: el piso 1 está abajo.
  XG.puestos('pisos-edificio', {
    orden: 'del piso 1 hacia arriba: ',
    slots: p => p.fichas.map((_, i) => ({ x: 182, y: 26 + (p.fichas.length - 1 - i) * 37, w: 110, h: 33 })),
    alto: p => p.fichas.length * 37 + 14,
    fondo(K, p) { const n = p.fichas.length; let h = K.r(110, 6, 144, n * 37 + 2, 'fc', 4); for (let i = 0; i < n; i++) h += K.t(96, 31 + (n - 1 - i) * 37, `piso ${i + 1}`, 's tm', 'end'); return h + K.l(60, n * 37 + 9, 300, n * 37 + 9); },
  });

  // Filas completas: se tocan las imposibles.  params { filas: [[…]], pistas }
  const imposible = (p, i) => p.pistas.some(x => !XG.regla(x.r, p.filas[i]));
  XG.marca('tacha-filas', {
    sitios: p => p.filas.map((_, i) => ({ x: 170, y: 22 + i * 40, w: 300, h: 34 })),
    cara: (K, p, i, on) => K.t(170, 27 + i * 40, p.filas[i].join(' · ')) + (on ? K.l(50, 22 + i * 40, 290, 22 + i * 40, 'lf') : ''),
    alto: p => p.filas.length * 40 + 6, pistas: p => p.pistas,
    sol: p => p.filas.map((_, i) => i).filter(i => imposible(p, i)),
    aviso: (on, p) => (on.some((x, i) => x && !imposible(p, i)) ? 'Tachaste una fila que cumple todas las pistas.' : 'Quedó sin tachar una fila que rompe alguna pista.'),
    bien: () => 'Cada fila tachada rompe al menos una pista.',
    texto: p => `quedan ${p.filas.filter((_, i) => !imposible(p, i)).map(f => f.join(' · ')).join(' y ')}`, pie: 'Toca las filas imposibles para tacharlas.',
  });

  // En qué puestos podría estar alguien.  params { names, quien, pistas }
  const donde = p => [...new Set(XG.perms(p.names).filter(o => p.pistas.every(x => XG.regla(x.r, o))).map(o => o.indexOf(p.quien)))].sort((a, b) => a - b);
  XG.marca('puestos-posibles', {
    sitios: p => fila(p.names.length).map(s => ({ ...s, y: 34, h: 44 })), cara: (K, p, i) => K.t(fila(p.names.length)[i].x, 40, i + 1, 'b'),
    alto: () => 66, pistas: p => p.pistas, sol: donde,
    aviso: (on, p) => (on.some((x, i) => x && !donde(p).includes(i)) ? `En uno de esos puestos, ${p.quien} rompe alguna pista.` : `${p.quien} tiene otro puesto posible.`),
    bien: p => `En esos puestos, y solo en esos, ${p.quien} cumple todo.`, texto: p => `puestos ${donde(p).map(i => i + 1).join(' y ')}`, pie: 'Toca todos los puestos posibles.',
  });

  XG.cartas('pistas-justas', { lee: o => o.join(' · '), pie: 'Son todas las filas posibles. Escoge las pistas que dejan una sola.' });

  // En movimiento: el corredor avanza hasta la casilla de su puesto.
  XG.tiros('corre-puesto', {
    perilla: (t, p) => ({ et: 'Puesto', min: 0, max: p.n, lee: v => `puesto ${v}` }), meta: t => t.r, alto: 92, ms: 1400,
    dib(t, v, K, p, f) {
      const w = 320 / p.n, X = k => 10 + (k - 0.5) * w; let h = '';
      for (let k = 1; k <= p.n; k++) h += K.r(X(k) - w / 2 + 2, 34, w - 4, 34, t.fijo?.[k] ? 'fg' : f >= 1 && k === t.r && v === t.r ? 'fo' : 'fc', 6) + K.t(X(k), 84, k, 's tm') + (t.fijo?.[k] ? K.t(X(k), 56, t.fijo[k], 's') : '');
      const x = v == null ? 0 : v * f;
      return v == null ? h : h + K.c(Math.max(12, X(x)), 51 - 22 * Math.abs(Math.sin(Math.PI * v * f)), 9, f >= 1 && v !== t.r ? 'fF' : 'fA');
    },
    falla: (t, v) => t.e?.[v] || (v > t.r ? 'Quedó muy atrás en la fila.' : 'Quedó muy adelante en la fila.'),
    cuenta: t => t.c, pie: 'Estira hasta el puesto y suelta.',
  });

  // ------------------------------------------------------------------------------------------------ pu-or-2 · en círculo
  const mesa = (n, cy = 106, r = 78, w = 62) => Array.from({ length: n }, (_, i) => { const a = (90 - i * 360 / n) * Math.PI / 180; return { x: Math.round(170 + r * 1.35 * Math.cos(a)), y: Math.round(cy - r * Math.sin(a)), w, h: 38 }; });
  const tablero = K => K.c(170, 106, 42, 'fc') + K.arc(170, 106, 28, 60, -60, 'lm') + K.ar(...K.at(170, 106, 28, -50), ...K.at(170, 106, 28, -62), 'lm');
  const redonda = { slots: p => mesa(p.fichas.length + Object.keys(p.fijas || {}).length), alto: () => 212, fondo: tablero, orden: 'en el sentido del reloj: ' };
  XG.puestos('mesa-amigos', redonda);
  XG.puestos('collar-cerrado', redonda);
  XG.puestos('cambia-mesa', redonda);

  // Cuatro mesas: se tocan las que son la misma del modelo, girada.
  const gira = (a, b) => a.some((_, k) => a.every((x, i) => b[(i + k) % b.length] === x));
  const rueda = (K, x, y, o, r) => K.c(x, y, r * 0.5, 'fc') + o.map((t, i) => { const [a, b] = K.at(x, y, r, 90 - i * 360 / o.length); return K.t(a, b + 5, t); }).join('');
  XG.marca('misma-mesa', {
    nombre: (p, i) => `mesa ${p.mesas[i].join(', ')}`,
    sitios: () => [0, 1, 2, 3].map(i => ({ x: 90 + (i % 2) * 160, y: 170 + Math.floor(i / 2) * 106, w: 146, h: 100 })),
    cara: (K, p, i) => rueda(K, 90 + (i % 2) * 160, 170 + Math.floor(i / 2) * 106, p.mesas[i], 37),
    fondo: (K, p) => K.t(170, 16, 'modelo', 's tm') + rueda(K, 170, 66, p.modelo, 38), alto: () => 332,
    sol: p => p.mesas.map((_, i) => i).filter(i => gira(p.modelo, p.mesas[i])),
    aviso: (on, p) => (on.some((x, i) => x && !gira(p.modelo, p.mesas[i])) ? 'Una de las que tocaste cambia los vecinos o el sentido.' : 'Falta una: gírala y mira que cada uno conserva sus vecinos.'),
    bien: () => 'Girar no cambia quién sigue a quién.', texto: () => 'las que conservan el mismo orden en el sentido del reloj',
  });

  // Anillo numerado.  v { k }
  const aro = (K, n, R, cy, cls) => Array.from({ length: n }, (_, i) => { const [x, y] = K.at(170, cy, R, 90 - i * 360 / n); return K.c(x, y, 14, cls(i + 1)) + K.t(x, y + 5, i + 1, 's'); }).join('');
  const llega = p => (p.de - 1 + p.pasos) % p.n + 1;
  XG.figura('vuelta-silla', {
    ini: p => ({ k: p.de }),
    manijas: p => [{ k: 'k', min: 1, max: p.n, paso: 1, r: 12, inv: false, en: v => XPK.at(170, 114, 62, 90 - (v.k - 1) * 360 / p.n), de: (x, y) => { const g = (90 - Math.atan2(114 - y, x - 170) * 180 / Math.PI + 720) % 360; return Math.round(g / 360 * p.n) % p.n + 1; } }],
    ok: (v, p) => v.k === llega(p), sol: p => ({ k: llega(p) }),
    texto: p => `$${p.de} + ${p.pasos} = ${p.de + p.pasos}$, menos las vueltas de ${p.n}: silla $${llega(p)}$`,
    alto: () => 232, ms: 2200, pie: 'Arrastra el señalador hasta la silla donde termina.',
    dib(v, K, p, f) {
      const n = p.n, c = f ? (Math.round(p.de - 1 + p.pasos * f)) % n + 1 : 0;
      return aro(K, n, 96, 114, i => (f >= 1 && i === llega(p) ? 'fo' : i === c ? 'fA' : i === p.de ? 'fg' : 'fc')) + K.l(170, 114, ...K.at(170, 114, 62, 90 - (Math.round(v.k) - 1) * 360 / n), 'la') + (f ? K.c(170, 114, 31, 'fop') + K.t(170, 116, Math.round(p.pasos * f), 'b ta') + K.t(170, 133, 'pasos', 's tm') : '');
    },
    lee: (v, p) => `$${p.de} + ${p.pasos} = ${p.de + p.pasos} \\to ${p.de + p.pasos} - ${Math.floor((p.de + p.pasos - 1) / p.n) * p.n} = ${llega(p)}$`,
    aviso: (v, p) => (v.k === (llega(p) % p.n) + 1 || v.k === (llega(p) + p.n - 2) % p.n + 1 ? 'Por una: el primer paso es la silla siguiente.' : 'Cada vuelta completa no mueve nada: réstala.'),
    bien: p => 'Las vueltas completas no cambian la silla: solo cuenta lo que sobra.',
  });

  const otra = (a, n) => (a - 1 + n / 2) % n + 1;
  XG.rotula('frente-silla', {
    slots: () => [{ x: 298, y: 36, w: 56, h: 36 }, { x: 298, y: 96, w: 56, h: 36 }, { x: 298, y: 156, w: 56, h: 36 }],
    fichas: p => p.fichas, metas: p => p.de.map(a => String(otra(a, p.n))),
    texto: p => p.de.map(a => `frente a la ${a}, la ${otra(a, p.n)}`).join('; '), alto: () => 196,
    fondo(K, p, f) {
      const P = i => K.at(96, 98, 78, 90 - (i - 1) * 360 / p.n);
      let h = K.c(96, 98, 78, 'fn');
      for (let i = 1; i <= p.n; i++) h += K.c(...P(i), 4, 'fM');
      h += p.de.map((a, k) => { const [x, y] = P(a), cls = ['fa', 'fg', 'ff'][k], [u, w] = P(otra(a, p.n)); return (f ? K.l(x, y, x + (u - x) * f, y + (w - y) * f, ['la', 'lg', 'lf'][k]) : '') + K.c(x, y, 13, cls) + K.t(x, y + 5, a, 's'); }).join('');
      return h + p.de.map((a, k) => K.t(267, 41 + 60 * k, `frente a la ${a}`, 's', 'end')).join('') + K.t(96, 103, `${p.n} sillas`, 's tm');
    },
    aviso: (q, p) => (p.de.some((a, k) => q[k][0] === String(p.n - a) && q[k][0] !== String(otra(a, p.n))) ? 'Enfrente no es lo que le falta al total: es avanzar la mitad.' : p.de.some((a, k) => +q[k][0] > p.n) ? 'Esa silla no existe: al pasar la última se vuelve a la 1.' : 'Enfrente es media mesa: avanza la mitad de las sillas.'),
    bien: p => `Media mesa son ${p.n / 2} sillas, por cualquiera de los dos lados.`,
  });

  // Sillas a cierta distancia de otra: por los dos lados.
  const lejos = p => Array.from({ length: p.n }, (_, i) => i).filter(i => { const d = Math.abs(i + 1 - p.de); return Math.min(d, p.n - d) === p.d; });
  const sitio = (p, i) => { const a = (90 - i * 360 / p.n) * Math.PI / 180; return { x: Math.round(170 + 88 * Math.cos(a)), y: Math.round(108 - 88 * Math.sin(a)), w: 36, h: 36, red: true }; };
  XG.marca('dos-lados', {
    sitios: p => Array.from({ length: p.n }, (_, i) => sitio(p, i)), cara: (K, p, i) => { const s = sitio(p, i); return K.t(s.x, s.y + 5, i + 1); },
    fondo: (K, p) => { const s = sitio(p, p.de - 1); return K.c(s.x, s.y, 24, 'fg') + K.t(170, 104, p.quien, 'tg') + K.t(170, 124, `silla ${p.de}`, 's tm'); },
    alto: () => 216, sol: lejos,
    aviso: (on, p) => (on.filter(Boolean).length === 1 && lejos(p).some(i => on[i]) ? 'Contaste solo hacia un lado.' : 'Cuenta los pasos desde la silla siguiente, por un lado y por el otro.'),
    bien: () => 'A la misma distancia hay una silla por cada lado.', texto: p => `sillas ${lejos(p).map(i => i + 1).join(' y ')}`, pie: 'Toca todas las sillas posibles.',
  });

  // En movimiento: la ruleta avanza los pasos que se le den.
  XG.tiros('gira-ruleta', {
    perilla: () => ({ et: 'Pasos', min: 0, max: 12, lee: v => `${v} ${v === 1 ? 'paso' : 'pasos'}` }), meta: t => t.r, alto: 214, ms: 1900,
    dib(t, v, K, p, f) {
      const n = t.n, cy = 107, k = t.de - 1 + (v || 0) * f, c = Math.round(k) % n + 1;
      return aro(K, n, 88, cy, i => (f >= 1 && i === c ? ((v - t.r) % n === 0 ? 'fo' : 'ff') : i === t.de ? 'fg' : 'fc')) + K.ar(170, cy, ...K.at(170, cy, 60, 90 - k * 360 / n), 'la gr');
    },
    falla: (t, v) => t.e?.[v] || ((v - t.r) % t.n === 0 ? 'Llegó, pero dio una vuelta de más.' : v > t.r ? 'Se pasó. Cuenta desde la silla siguiente.' : 'No alcanzó a llegar.'),
    cuenta: t => t.c, pie: 'Estira los pasos y suelta: gira en el sentido del reloj.',
  });

  // ------------------------------------------------------------------------------------------------ pu-or-3 · tablas
  XG.tabla('tabla-oficios');
  XG.tabla('tabla-dos-datos');
  const cel = (n, i, c = 46, x0 = 84, y0 = 30) => ({ x: x0 + (i % n + 0.5) * c, y: y0 + (Math.floor(i / n) + 0.5) * c, w: c - 4, h: c - 4 });
  const cabezas = (K, p, c = 46) => p.cols.map((t, i) => K.t(84 + (i + 0.5) * c, 22, t, 's')).join('') + p.filas.map((t, i) => K.t(76, 30 + (i + 0.5) * c + 5, t, 's', 'end')).join('');
  const celda = (p, i) => `${p.filas[Math.floor(i / p.cols.length)]}, ${p.cols[i % p.cols.length]}`;
  const base = { alto: p => 36 + 46 * p.filas.length, fondo: cabezas, sitios: p => Array.from({ length: p.filas.length * p.cols.length }, (_, i) => cel(p.cols.length, i)) };
  const simb = (K, p, i, t, cls) => { const s = cel(p.cols.length, i); return K.t(s.x, s.y + 7, t, `b ${cls}`); };

  // Un ✓ tacha su fila y su columna: se tocan las casillas que tacha.
  const cruz = p => Array.from({ length: p.filas.length * p.cols.length }, (_, i) => i).filter(i => { const n = p.cols.length, [r, c] = [Math.floor(i / n), i % n], [R, C] = p.si; return (r === R) !== (c === C); });
  XG.marca('tacha-cruz', {
    ...base, nombre: celda, sol: cruz,
    cara: (K, p, i, on) => (i === p.si[0] * p.cols.length + p.si[1] ? simb(K, p, i, '✓', 'to') : on ? simb(K, p, i, '✗', 'tf') : ''),
    aviso(on, p) { const n = p.cols.length, f = cruz(p).filter(i => on[i]), soloF = f.length && f.every(i => Math.floor(i / n) === p.si[0]), soloC = f.length && f.every(i => i % n === p.si[1]); return on.some((x, i) => x && !cruz(p).includes(i)) ? 'Tachaste una casilla que todavía es posible.' : soloF ? 'Falta la columna: nadie más puede tener eso.' : soloC ? 'Falta la fila: esa persona ya no puede tener otro.' : 'Faltan casillas en la fila o en la columna del ✓.'; },
    bien: () => 'Toda su fila y toda su columna, menos el ✓.', texto: () => 'el resto de la fila y de la columna del ✓', pie: 'Toca las casillas que quedan tachadas.',
  });

  // Tabla con ✗: se tocan los ✓ que ya son seguros.
  const seguros = p => { const n = p.cols.length, x = i => p.x.includes(i), out = []; for (let i = 0; i < n * n; i++) { if (x(i)) continue; const r = Math.floor(i / n), c = i % n, F = Array.from({ length: n }, (_, k) => r * n + k), C = Array.from({ length: n }, (_, k) => k * n + c); if (F.every(k => k === i || x(k)) || C.every(k => k === i || x(k))) out.push(i); } return out; };
  XG.marca('hueco-unico', {
    ...base, nombre: celda, sol: seguros, cara: (K, p, i, on) => (p.x.includes(i) ? simb(K, p, i, '✗', 'tf') : on ? simb(K, p, i, '✓', 'to') : ''),
    aviso: (on, p) => (on.some((x, i) => x && p.x.includes(i)) ? 'Una casilla tachada no puede ser ✓.' : on.some((x, i) => x && !seguros(p).includes(i)) ? 'En esa fila y en esa columna queda más de un hueco: todavía no es seguro.' : seguros(p).some(i => !on[i] && Array.from({ length: p.cols.length }, (_, k) => Math.floor(i / p.cols.length) * p.cols.length + k).every(k => k === i || p.x.includes(k))) ? 'Falta uno: hay una fila con un solo hueco.' : 'Falta uno: hay una columna con un solo hueco.'),
    bien: () => 'Donde queda un solo hueco, en una fila o en una columna, va el ✓.', texto: p => seguros(p).map(i => `${p.filas[Math.floor(i / p.cols.length)]}: ${p.cols[i % p.cols.length]}`).join('; '), pie: 'Toca los ✓ que ya son seguros.',
  });

  // Tabla llena por otro: se tocan los ✓ que rompen una pista.
  const ve = p => (r, c) => p.si[r] === c;
  const malos = p => p.si.map((c, r) => r * p.cols.length + c).filter((i, r) => p.pistas.some(x => x.r[1] === r && !XG.reglaTb(x.r, ve(p), p.filas.length)));
  XG.marca('tabla-ajena', {
    ...base, nombre: celda, sol: malos, pistas: p => p.pistas, cara: (K, p, i, on) => (p.si[Math.floor(i / p.cols.length)] === i % p.cols.length ? simb(K, p, i, '✓', on ? 'tf' : 'to') : ''),
    aviso: (on, p) => (on.some((x, i) => x && p.si[Math.floor(i / p.cols.length)] !== i % p.cols.length) ? 'Solo se tocan casillas con ✓.' : on.some((x, i) => x && !malos(p).includes(i)) ? 'Tocaste un ✓ que cumple sus pistas.' : 'Queda otro ✓ que rompe una pista.'),
    bien: () => 'Esos ✓ contradicen una pista; los demás cumplen.', texto: p => malos(p).map(i => `${p.filas[Math.floor(i / p.cols.length)]} con ${p.cols[i % p.cols.length]}`).join('; '), pie: 'Toca los ✓ que rompen alguna pista.',
  });

  XG.cartas('pista-falta', { lee: o => o.join(' · '), cab: p => p.gente.join(' · '), pie: 'Los apagados ya los tachó la pista de la gorra.' });

  // Tres casas, con dos datos cada una.
  XG.puestos('casas-datos', {
    orden: 'arriba las paredes y abajo las bebidas: ', slots: () => [0, 1, 2, 3, 4, 5].map(i => ({ x: 100 + (i % 3) * 94, y: 58 + Math.floor(i / 3) * 52, w: 80, h: 40 })), alto: () => 146,
    fondo: K => [0, 1, 2].map(i => K.r(54 + i * 94, 30, 92, 108, 'fc', 4) + K.pl([[50 + i * 94, 30], [100 + i * 94, 8], [150 + i * 94, 30]], 'lm') + K.t(100 + i * 94, 27, i + 1, 's tm')).join('') + K.t(50, 62, 'pared', 's tm', 'end') + K.t(50, 114, 'toman', 's tm', 'end'),
  });

  // En movimiento: la bola cae en una de las cajas.
  const cajas = (t, v, K, f) => {
    const n = t.cajas.length, w = 320 / n, X = k => 10 + (k - 0.5) * w; let h = '';
    t.cajas.forEach((c, i) => { h += K.r(X(i + 1) - w / 2 + 4, 92, w - 8, 44, f >= 1 && i + 1 === t.r && v === t.r ? 'fo' : f >= 1 && v === i + 1 ? 'ff' : 'fc', 6) + K.t(X(i + 1), 156, c, 's') + K.t(X(i + 1), 120, i + 1, 's tm'); });
    const a = Math.min(1, f * 1.6), b = Math.max(0, f * 2.6 - 1.6);
    return h + K.l(10, 34, 330, 34, 'lm') + (v == null ? K.c(16, 24, 9, 'fA') : K.c(16 + (X(v) - 16) * a, 24 + Math.min(1, b) * 84, 9, 'fA'));
  };
  for (const nombre of ['cae-caja', 'cae-zona']) XG.tiros(nombre, {
    perilla: t => ({ et: 'Caja', min: 0, max: t.cajas.length, lee: v => t.cajas[v - 1] }), meta: t => t.r, alto: 166, ms: 1300,
    dib: (t, v, K, p, f) => cajas(t, v, K, f), falla: (t, v) => t.e?.[v] || 'Esa no: vuelve a leer las pistas.', cuenta: t => t.c, pie: 'Estira hasta la caja y suelta la bola.',
  });

  // ------------------------------------------------------------------------------------------------ pu-or-4 · condiciones
  // Los cuatro casos de dos personas.  params { a, b, r, regla }
  const CASOS = p => [[p.a, p.b], [p.a], [p.b], []];
  const pasa = p => CASOS(p).map((s, i) => [s, i]).filter(([s]) => XG.reglaEq(p.r, s)).map(([, i]) => i);
  XG.marca('casos-si', {
    sitios: () => [0, 1, 2, 3].map(i => ({ x: 90 + (i % 2) * 160, y: 36 + Math.floor(i / 2) * 64, w: 150, h: 56 })),
    cara: (K, p, i) => K.t(90 + (i % 2) * 160, 41 + Math.floor(i / 2) * 64, [`${p.a} y ${p.b}`, `solo ${p.a}`, `solo ${p.b}`, 'ninguno'][i]),
    alto: () => 136, sol: pasa,
    aviso: (on, p) => (on.some((x, i) => x && !pasa(p).includes(i)) ? 'Uno de esos casos rompe la regla.' : 'Falta un caso: si no rompe la regla, se puede.'),
    bien: () => 'La regla solo prohíbe un caso.', texto: p => pasa(p).map(i => [`${p.a} y ${p.b}`, `solo ${p.a}`, `solo ${p.b}`, 'ninguno'][i]).join(', '), pie: 'Toca todos los casos que se pueden.',
  });

  // Frases que dicen lo mismo que la regla.  params { frases: [{ t, ok }] }  (dos renglones con «|»)
  XG.marca('misma-regla', {
    sitios: p => p.frases.map((_, i) => ({ x: 170, y: 28 + i * 52, w: 310, h: 44 })), cara: (K, p, i) => K.t(170, 33 + i * 52, p.frases[i].t, 's'), alto: p => p.frases.length * 52 + 6,
    sol: p => p.frases.map((_, i) => i).filter(i => p.frases[i].ok),
    aviso: (on, p) => (on.some((x, i) => x && !p.frases[i].ok) ? 'Una de esas invierte la regla: tener el permiso no obliga.' : 'Falta una frase que dice lo mismo.'),
    bien: () => '«Solo si» es «si va, tiene el permiso»; y sin permiso no va.', texto: p => p.frases.filter(x => x.ok).map(x => `«${x.t}»`).join(' y '), pie: 'Toca todas las frases que dicen lo mismo.',
  });

  // Equipos: se toca quién va.  params { gente, cuantos?, pistas }
  const van = (on, p) => p.gente.filter((_, i) => on[i]);
  const todosEq = p => Array.from({ length: 2 ** p.gente.length }, (_, m) => p.gente.map((_, i) => !!(m >> i & 1))).filter(on => (!p.cuantos || van(on, p).length === p.cuantos) && p.pistas.every(x => XG.reglaEq(x.r, van(on, p))));
  const aIdx = on => on.map((x, i) => (x ? i : -1)).filter(i => i >= 0);
  const gente = {
    sitios: p => p.gente.map((_, i) => { const n = p.gente.length, f = n > 4 ? Math.ceil(n / 2) : n, r = Math.floor(i / f), k = r ? n - f : f; return { x: 170 + (i % f - (k - 1) / 2) * 104, y: 34 + r * 58, w: 92, h: 48 }; }),
    cara(K, p, i) { const s = this.sitios(p)[i]; return K.t(s.x, s.y + 5, p.gente[i]); },
    alto: p => (p.gente.length > 4 ? 122 : 66), pistas: p => p.pistas,
  };
  const equipo = (nombre, d) => XG.marca(nombre, {
    ...gente, cara: (K, p, i) => gente.cara(K, p, i), cumple: (on, p) => p.pistas.map(x => XG.reglaEq(x.r, van(on, p))), vale: (on, p) => todosEq(p).some(o => o.join() === on.join()), sol: p => aIdx(todosEq(p)[0]),
    aviso: () => 'Las pistas marcadas no se cumplen.', texto: p => van(todosEq(p)[0], p).join(', '), pie: 'Toca a quienes van.', ...d,
  });
  equipo('equipo-justo', { bien: () => 'Ese equipo cumple todas las reglas.' });
  equipo('rompe-regla', { bien: () => 'Para romper un «si…» tiene que ir el primero sin el segundo.', texto: p => todosEq(p).map(o => van(o, p).join(', ')).join(' o ') });
  // El grupo más grande que cumple.
  const tope = p => Math.max(...todosEq(p).map(o => van(o, p).length));
  equipo('maximo-grupo', {
    vale: (on, p) => van(on, p).length === tope(p) && todosEq(p).some(o => o.join() === on.join()), sol: p => aIdx(todosEq(p).find(o => van(o, p).length === tope(p))), texto: p => van(todosEq(p).find(o => van(o, p).length === tope(p)), p).join(', '),
    aviso: (on, p) => (todosEq(p).some(o => o.join() === on.join()) ? `Cumple, pero hay un grupo de ${tope(p)}.` : 'Las pistas marcadas no se cumplen.'), bien: p => `Son ${tope(p)}: con uno más se rompe alguna regla.`,
  });
  // Quién tiene que ir: está en todos los equipos posibles.
  const fijos = p => p.gente.map((_, i) => i).filter(i => todosEq({ ...p, cuantos: p.son }).every(o => o[i]));
  XG.marca('quien-seguro', {
    ...gente, cara: (K, p, i) => gente.cara(K, p, i), sol: fijos,
    aviso: (on, p) => (on.some((x, i) => x && !fijos(p).includes(i)) ? 'Hay un equipo que cumple sin alguno de los que tocaste.' : 'Falta alguien que está en todos los equipos.'),
    bien: p => `Los equipos posibles son ${todosEq({ ...p, cuantos: p.son }).map(o => van(o, p).join('-')).join(', ')}.`, texto: p => fijos(p).map(i => p.gente[i]).join(', '), pie: 'Toca a quien tiene que ir, en cualquier equipo posible.',
  });

  // Afirmaciones en tres zonas.  params { equipos: [[…]], dichos: [{ t, van: […] }] }
  const zonaDe = (x, p) => { const k = p.equipos.filter(e => x.van.every(v => e.includes(v))).length; return k === p.equipos.length ? 0 : k ? 1 : 2; };
  const igual = (a, b) => [...a].sort().join('|') === [...b].sort().join('|');
  const metasZ = p => [0, 1, 2].map(z => p.dichos.filter(x => zonaDe(x, p) === z).map(x => x.t));
  XG.juego('tres-zonas', {
    zonas: true, metasZ,
    ini: () => ({ q: [[], [], []] }), listo: (s, p) => s.q.reduce((n, l) => n + l.length, 0) === p.dichos.length,
    ok: (s, p) => metasZ(p).every((m, i) => igual(m, s.q[i])), sol: p => ({ q: metasZ(p) }),
    texto: p => metasZ(p).map((m, i) => `${['tiene que', 'podría', 'no puede'][i]}: ${m.join(', ')}`).join('; '),
    monta(stage, p, ui) {
      stage.innerHTML = '<div class="xg-lona xg-rot"></div>';
      const box = stage.firstChild; let esc = null, jz = null;
      const slots = ['tiene que', 'podría', 'no puede'].map((et, i) => ({ x: 60 + i * 110, y: 118, w: 108, h: 146, n: 4, et, ey: -80 }));
      const monta = s => { esc?.(); esc = XPD.fichas(box, { slots, fichas: p.dichos.map(x => x.t), alto: 196, cumple: () => true, fondo: K => K.t(170, 18, `equipos: ${p.equipos.map(e => e.join('-')).join('  ·  ')}`, 's ta') + (jz ? slots.map((z, i) => K.r(z.x - 56, 43, 112, 150, jz[i] ? 'bien' : 'mal', 12)).join('') : '') }, s, { set: n => { ui.set(n); ui.nota(''); }, nota() {} }); };
      monta(ui.s); ui.limpia(() => esc?.()); ui.nota('Lleva cada afirmación a su zona. Un toque la pasa de zona.');
      box.addEventListener('keydown', e => { if (!ui.locked && e.target.closest('.xfi-ch') && /^(Enter| |Arrow.*)$/.test(e.key)) e.stopPropagation(); });
      return ok => {
        box.inert = true; jz = metasZ(p).map((m, i) => igual(m, ui.s.q[i])); monta({ q: ui.s.q.map(l => [...l]) });
        if (ok) { XS.merge(); return ui.nota('En todos, en alguno o en ninguno.'); }
        XS.nope(); ui.nota('Cuenta en cuántos equipos se cumple: en todos, en alguno o en ninguno.');
        ui.espera(2800, () => { const b = { q: metasZ(p) }; ui.muestra(b); jz = [true, true, true]; monta(b); ui.nota('Así quedan.'); });
      };
    },
  });
})();
