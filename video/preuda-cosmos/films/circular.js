// «Orden circular» · escenas de la lección pu-or-2. Motor en kit.js, preu.js y piezas.js; guion en circular.data.js.
// Cada pareja con un color (Jaime y Karen ámbar, Santiago y Tatiana cian, Ricardo y Natalia violeta); lo seguro en verde,
// lo que se hace ahora en lima.
const NOW = C.lime, RES = C.green, BAD = C.mag;
const COL = { Jaime: C.amber, Karen: C.amber, Santiago: C.cyan, Tatiana: C.cyan, Ricardo: C.violet, Natalia: C.violet };
// Puesto k de una mesa de n alrededor de O (k = 0 abajo; k + 1 es el vecino en sentido contrario a las agujas, visto desde arriba).
const seatP = (O, R, n, k) => at(O, 270 + 360 / n * k, R);
function table(O, r, n, R, o = {}) {
  X.save(); X.fillStyle = 'rgba(30,40,80,.5)'; X.beginPath(); X.arc(O[0], O[1], r, 0, 7); X.fill(); X.restore();
  ring(O[0], O[1], r, 'rgba(225,232,255,.7)', 3, o.k ?? 1);
  for (let k = 0; k < n; k++) { const p = seatP(O, R, n, k); stroke('rgba(160,180,240,.4)', 2, () => X.arc(p[0], p[1], 44, 0, 7), { g: 0, dash: [6, 6] }); }
}
const guest = (p, name, o = {}) => pill(p[0], p[1], o.w || 160, 64, o.c || COL[name] || C.ink, name, { s: o.s || 28, fill: .2 });
const S = {
  // 1 · El reto: tres parejas en una mesa redonda.
  reto(t) {
    stars(t, .6);
    examCard(t, { tag: 'RETO', y: 262, t0: 1, lines: ['Tres parejas de esposos juegan cartas alrededor de una mesa', 'redonda, y cada esposo queda frente a su pareja: Jaime y', 'Karen, Santiago y Tatiana, Ricardo y Natalia. Tatiana está', 'al lado de Ricardo y Natalia está justo a la derecha de', 'Jaime. La persona a la izquierda de Santiago es:'], opts: ['Ricardo', 'Natalia', 'Karen', 'Jaime'], ok: 1 });
    fade(A(t, 9.6, .6), () => {
      const O = [CX, 1170]; table(O, 130, 6, 230);
      ['Jaime', 'Karen', 'Santiago', 'Tatiana', 'Ricardo', 'Natalia'].forEach((n, i) => fade(A(t, 10.2 + i * .3, .4), () => pill(130 + (i % 3) * 410, 940 + Math.floor(i / 3) * 470, 170, 56, COL[n], n, { s: 26, fill: .14 })));
      fade(A(t, 20.4, .5), () => { const p = seatP(O, 230, 6, 2); mono('?', p[0], p[1] + 12, NOW, { s: 40 }); });
    });
  },
  // 2 · Girar no cambia nada: se fija a uno.
  fija(t) {
    stars(t, .3);
    const O = [CX, 880], R = 250, rot = 60 * eio(seg(t, 2, 4)) + 60 * eio(seg(t, 5, 7)), names = ['Ana', 'Beto', 'Ciro', 'Dora', 'Eva', 'Fito'], cols = [C.amber, C.cyan, C.violet, C.blue, C.mag, C.green];
    table(O, 160, 6, R);
    names.forEach((n, k) => { const p = at(O, 270 + 60 * k + rot, R); pill(p[0], p[1], 140, 60, cols[k], n, { s: 28, fill: .2 }); });
    fade(A(t, 9.2, .5), () => mono('mismos vecinos, misma mesa', CX, 1250, NOW, { s: 28 }));
    fade(A(t, 18.2, .5), () => { const p = at(O, 270 + rot, R); stroke(NOW, 4, () => X.roundRect(p[0] - 84, p[1] - 44, 168, 88, 30), { g: 18 }); mono('fija', p[0], p[1] + 80, NOW, { s: 26 }); });
  },
  // 3 · La fila se cierra en una mesa.
  vecinos(t) {
    stars(t, .3);
    const m = eio(seg(t, 9.2, 12)), O = [CX, 860], R = 250, cols = [C.amber, C.cyan, C.violet, C.blue, C.mag, C.green];
    for (let k = 0; k < 6; k++) { const line = [140 + k * 160, 760], circ = at(O, 270 + 60 * k, R), p = mid(line, circ, m); pill(p[0], p[1], 120, 60, cols[k], 'ABCDEF'[k], { s: 30, fill: .2 }); }
    fade(1 - m, () => { mono('un vecino', 140, 860, BAD, { s: 22 }); mono('un vecino', 940, 860, BAD, { s: 22 }); });
    fade(A(t, 12.2, .5), () => { arcA(O, R, 210, 270, NOW, eo(seg(t, 12.2, 13.2)), { lw: 5 }); mono('A y F, juntos', CX, 1210, NOW, { s: 26 }); });
    fade(A(t, 18.2, .5), () => mono('cada «junto a» tiene dos lados posibles', CX, 1290, C.ink, { s: 26 }));
  },
  // 4 · Frente a frente: seis y cuatro puestos.
  frente(t) {
    stars(t, .3);
    fade(win(t, .6, 17.6), () => {
      const O = [CX, 720]; table(O, 120, 6, 210);
      const a = seatP(O, 210, 6, 0), b = seatP(O, 210, 6, 3); guest(a, 'Ana', { c: C.amber, w: 130 }); guest(b, 'Beto', { c: C.amber, w: 130 });
      fade(A(t, 1.6, .5), () => { segL(a, b, NOW, eo(seg(t, 1.6, 3)), 3, { dash: [8, 8] }); mono('3 puestos', O[0] + 180, O[1] + 10, NOW, { s: 22 }); });
      fade(A(t, 9.2, .5), () => {
        const Q = [CX, 1270], s = 140; X.save(); X.fillStyle = 'rgba(30,40,80,.5)'; X.fillRect(Q[0] - s, Q[1] - s, 2 * s, 2 * s); X.restore(); stroke('rgba(225,232,255,.7)', 3, () => X.rect(Q[0] - s, Q[1] - s, 2 * s, 2 * s));
        const P = [[Q[0], Q[1] + s + 50], [Q[0] + s + 80, Q[1]], [Q[0], Q[1] - s - 50], [Q[0] - s - 80, Q[1]]];
        P.forEach((p, i) => pill(p[0], p[1], 120, 56, i % 2 ? C.cyan : C.violet, String(i + 1), { s: 28, fill: .15 }));
        segL(P[0], P[2], NOW, eo(seg(t, 10.4, 11.6)), 3, { dash: [8, 8] }); segL(P[1], P[3], NOW, eo(seg(t, 11, 12.2)), 3, { dash: [8, 8] }); mono('2 puestos', Q[0] + 120, Q[1] - 40, NOW, { s: 22 });
      });
    });
    fade(A(t, 18, .5), () => { const O = [CX, 860]; table(O, 140, 6, 250); [[0, 3, C.amber], [1, 4, C.cyan], [2, 5, C.violet]].forEach(([i, j, c], n) => fade(A(t, 18.4 + n * .8, .4), () => { segL(seatP(O, 250, 6, i), seatP(O, 250, 6, j), c, 1, 3); dot(...seatP(O, 250, 6, i), 14, c); dot(...seatP(O, 250, 6, j), 14, c); })); mono('tres parejas de opuestos', CX, 1240, NOW, { s: 26 }); });
  },
  // 5 · Izquierda y derecha mirando al centro.
  derecha(t) {
    stars(t, .3);
    const O = [CX, 880], R = 260; table(O, 160, 6, R);
    const person = (k, name, col) => { const p = seatP(O, R, 6, k), face = angOf(p, O); pill(p[0], p[1], 140, 60, col, name, { s: 26, fill: .2 }); arrow(...at(p, face, 40), ...at(p, face, 90), hexA(col, .7), 1, 2.5, { h: 10 }); return { p, face }; };
    const lo = person(0, 'Abajo', C.amber);
    fade(A(t, 1.6, .5), () => { const r = at(lo.p, lo.face - 90, 120); arrow(...at(lo.p, lo.face - 90, 80), ...r, NOW, eo(seg(t, 2, 3)), 4, { h: 14 }); mono('su derecha', r[0] + 10, r[1] + 46, NOW, { s: 22 }); });
    fade(A(t, 10, .5), () => { stroke(NOW, 3, () => X.arc(O[0], O[1], R + 90, Math.PI * .62, Math.PI * .2, true)); const e = at(O, -36, R + 90); arrow(e[0] - 30, e[1] + 30, e[0], e[1], NOW, 1, 3, { h: 14 }); mono('contra las agujas del reloj', CX, O[1] + R + 190, NOW, { s: 24 }); });
    fade(A(t, 20, .5), () => { const up = person(3, 'Arriba', C.cyan); const r = at(up.p, up.face - 90, 120); arrow(...at(up.p, up.face - 90, 80), ...r, C.cyan, eo(seg(t, 20.4, 21.4)), 4, { h: 14 }); mono('su derecha', r[0] - 10, r[1] - 26, C.cyan, { s: 22 }); });
  },
  // 6 · Cuatro amigos.
  amigos(t) {
    stars(t, .3);
    const O = [CX, 860], R = 250, n = 4; table(O, 150, 4, R);
    guest(seatP(O, R, n, 0), 'Ana', { c: C.amber });
    fade(A(t, 1.8, .5), () => { guest(seatP(O, R, n, 2), 'Beto', { c: C.amber }); segL(seatP(O, R, n, 0), seatP(O, R, n, 2), hexA(C.amber, .5), 1, 2, { dash: [8, 8] }); });
    const side = t < 13 ? 1 : 3;
    fade(A(t, 9.4, .5), () => { guest(seatP(O, R, n, 1), t < 13 ? 'Ciro' : '', { c: t < 13 ? C.cyan : C.dim }); guest(seatP(O, R, n, 3), t >= 13 ? 'Ciro' : '', { c: t >= 13 ? C.cyan : C.dim }); });
    fade(A(t, 18.2, .5), () => { const d = side === 1 ? 3 : 1; guest(seatP(O, R, n, d), 'Dora', { c: C.violet }); segL(seatP(O, R, n, side), seatP(O, R, n, d), RES, 1, 3, { dash: [8, 8] }); mono('Dora frente a Ciro: seguro', CX, 1260, RES, { s: 26 }); });
  },
  // 7 · Problema: la mesa cuadrada de los instrumentos.
  cuadrada(t) {
    stars(t, .3);
    examCard(t, { y: 262, t0: .8, s: 34, lh: 50, lines: ['Sara, Tomás, Valeria y Nicolás se sientan alrededor de una', 'mesa cuadrada, uno por lado, y cada uno toca un instrumento:', 'guitarra, piano, violín o flauta. Quien toca el piano está', 'frente a Tomás; Sara y Nicolás están juntos; quien toca la', 'guitarra está junto a Valeria, y Tomás no toca la flauta.', 'Quien toca la guitarra es:'], opts: ['Tomás', 'Sara', 'Nicolás', 'Valeria'], ok: 0, rv: 23 });
    fade(A(t, 9.8, .5), () => {
      const Q = [CX, 1240], s = 120; X.save(); X.fillStyle = 'rgba(30,40,80,.5)'; X.fillRect(Q[0] - s, Q[1] - s, 2 * s, 2 * s); X.restore(); stroke('rgba(225,232,255,.7)', 3, () => X.rect(Q[0] - s, Q[1] - s, 2 * s, 2 * s));
      const P = { T: [Q[0], Q[1] + s + 50], N: [Q[0] + s + 110, Q[1]], S: [Q[0], Q[1] - s - 50], V: [Q[0] - s - 110, Q[1]] };
      pill(...P.T, 160, 60, C.amber, 'Tomás', { s: 28, fill: .2 });
      fade(A(t, 10.6, .5), () => { pill(...P.S, 160, 60, C.cyan, 'Sara', { s: 28, fill: .2 }); pill(...P.N, 160, 60, C.cyan, 'Nicolás', { s: 28, fill: .2 }); mono('juntos', Q[0] + 150, Q[1] - 150, C.cyan, { s: 22 }); });
      fade(A(t, 12.6, .5), () => { pill(...P.V, 160, 60, C.violet, 'Valeria', { s: 28, fill: .2 }); mono('piano', P.S[0] + 120, P.S[1] + 8, NOW, { s: 24, a: 'l' }); });
      fade(A(t, 20.4, .5), () => { stroke(RES, 3, () => { X.moveTo(P.V[0] + 40, P.V[1] + 40); X.lineTo(P.T[0] - 90, P.T[1] - 10); }, { g: 10 }); mono('guitarra', P.T[0], P.T[1] + 70, RES, { s: 26 }); mono('vecinos de Valeria: Tomás y el pianista', CX, 1500, C.mute, { s: 22 }); });
    });
  },
  // 8 · El método.
  pasos(t) {
    stars(t, .3);
    [['1', 'Fijar a quien más se nombra', 1], ['2', 'Poner las parejas de enfrente', 9.2], ['3', 'Vecinos, con la derecha mirando al centro', 18.2]].forEach(([n, s, t0], i) => fade(A(t, t0, .6), () => {
      const y = 560 + i * 260; nodeC(170, y, 60, [NOW, C.cyan, C.amber][i], n, { s: 54 }); jT(s, 260, y + 14, C.ink, 38, { a: 'l', max: 760 });
      if (i) arrow(170, y - 190, 170, y - 70, hexA(NOW, .6), 1, 2.5, { h: 10 });
    }));
  },
  // 9 · Las parejas resueltas.
  resolver(t) {
    stars(t, .3);
    const O = [CX, 880], R = 270, seat = k => seatP(O, R, 6, k); table(O, 160, 6, R);
    guest(seat(0), 'Jaime');
    fade(A(t, 1.6, .5), () => guest(seat(3), 'Karen'));
    fade(A(t, 3.4, .5), () => { guest(seat(1), 'Natalia'); mono('derecha de Jaime', seat(1)[0] + 40, seat(1)[1] + 70, C.violet, { s: 20 }); });
    fade(A(t, 5.6, .5), () => guest(seat(4), 'Ricardo'));
    fade(A(t, 10.4, .5), () => guest(seat(5), 'Tatiana'));
    fade(A(t, 12.6, .5), () => guest(seat(2), 'Santiago'));
    fade(A(t, 20.2, .5), () => { const s = seat(2), l = seat(1); arrow(...mid(s, l, .25), ...mid(s, l, .75), RES, eo(seg(t, 20.4, 21.4)), 4, { h: 14 }); stroke(RES, 4, () => X.roundRect(l[0] - 90, l[1] - 40, 180, 80, 30), { g: 16 }); mono('izquierda de Santiago', CX, 1300, RES, { s: 26 }); });
  },
  // 10 · Cierre: la opción B, resumen y tarjeta final.
  cierre(t) {
    stars(t, .8);
    closeOpts(t, ['Ricardo', 'Natalia', 'Karen', 'Jaime'], 1, 'Jaime fijo → Natalia a su derecha → Santiago enfrente de Tatiana', { s: 44, fs: 32 });
    fade(A(t, 11, .6), () => {
      summary(t, 11.4, [[[['fijar a uno', 'r']], 'girar no cambia'], [[['sin extremos', 'r']], 'dos vecinos'], [[['n/2 puestos', 'r']], 'enfrente'], [[['mirar al centro', 'r']], 'izquierda y derecha']], 420, 170, 40);
      endCard(t, 19.6, D.TITLE, D.LINE, [C.amber, NOW, C.cyan]);
    });
  },
};
