// Preuniversitario · pu-nu-2 «MCM y MCD» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Dos saltadores: múltiplos de a y de b hasta t.
  const saltos = (v, K) => { const M = v.max, X = t => 20 + t * 300 / M; let h = ''; [[v.a, 70, 'la', 'fA', 'ta'], [v.b, 130, 'lg', 'fG', 'tg']].forEach(([m, y, l, f, tc]) => { h += K.l(X(0), y, X(M), y, 'lm') + K.t(330, y - 30, `de ${m} en ${m}`, `s ${tc}`, 'end'); for (let t = 0; t + m <= v.t + 1e-6; t += m) h += `<path class="xl ${l}" d="M${K.n(X(t))} ${y} Q${K.n(X(t + m / 2))} ${y - 34} ${K.n(X(t + m))} ${y}"/>` + K.c(X(t + m), y, 4, f) + K.t(X(t + m), y + 17, t + m, 's'); }); return h + (v.ok > 0.99 ? K.l(X(v.t), 30, X(v.t), 66, 'lo d') + K.l(X(v.t), 92, X(v.t), 126, 'lo d') : ''); };
  // Dos cuerdas cortadas en pedazos de s.
  const cuerdas = (v, K) => { const u = 290 / Math.max(v.a, v.b), s = Math.max(1, Math.round(v.s)); return [[v.a, 50, 'fa'], [v.b, 112, 'fg']].map(([L, y, c]) => { let h = K.t(24, y - 8, `${L} ${v.un || 'm'}`, 's tm', 'start'); for (let x = 0; x + s <= L; x += s) h += K.r(24 + x * u + 0.8, y, s * u - 1.6, 28, c, 3); const r = L % s; return h + (r ? K.r(24 + (L - r) * u, y, r * u, 28, 'ff', 2) + K.t(24 + L * u, y + 44, `sobran ${r}`, 's tf', 'end') : K.t(24 + L * u, y + 44, `${L / s} pedazos`, 's to', 'end')); }).join(''); };
  const fact = (v, K) => [['24', ['2', '2', '2', '3'], 60], ['36', ['2', '2', '3', '3'], 116]].map(([n, f, y], j) => K.t(52, y + 6, `${n} =`, 'b', 'end') + f.map((p, i) => { const com = j === 0 ? [0, 1, 3].includes(i) : [0, 1, 2].includes(i); return K.c(88 + i * 44, y, 17, v.c > 0.5 && com ? 'fA' : v.m > 0.5 && (j === 0 ? i < 3 : i > 1) ? 'fG' : 'fc') + K.t(88 + i * 44, y + 5, p, (v.c > 0.5 && com) || (v.m > 0.5 && (j === 0 ? i < 3 : i > 1)) ? 'tc' : ''); }).join('')).join('') + K.t(170, 172, v.p || '', 'b ta');

  xpLec('pu-nu-2', [
    ['MCM: cuándo coinciden',
      xpMira('dibujo', 'Empecemos por la idea: el **mínimo común múltiplo** es el primer lugar donde coinciden.', { dib: saltos, v: { a: 6, b: 8, t: 0, max: 30, ok: 0 }, alto: 165 }, [
        ['Dos ranas salen juntas. Una salta de 6 en 6 y la otra de 8 en 8.', {}],
        ['Una pisa 6 y 12; la otra, 8. Aún no coinciden.', { t: 12 }],
        ['Ya van por 18 y por 16: tampoco.', { t: 18 }],
        ['En 24 pisan las dos: es el primer múltiplo común.', { t: 24, ok: 1 }, '$\\text{mcm}(6, 8) = 24$'],
        ['Después vuelven a coincidir en 48, 72… los múltiplos de 24.', {}],
      ], 'MCM: el menor número que es múltiplo de los dos. Sirve para «¿cuándo vuelven a coincidir?».'),
      xpHaz('dibujo', 'Una rana salta de 9 en 9 y otra de 15 en 15. Avanza hasta el primer lugar donde coinciden.', { dib: (v, K) => saltos({ ...v, ok: v.t % 9 === 0 && v.t % 15 === 0 ? 1 : 0 }, K), v: { a: 9, b: 15, t: 3, max: 60 }, metas: { t: 45 }, alto: 215, manijas: [{ k: 't', min: 3, max: 60, paso: 3, et: 'lugar' }],
        lee: v => `$${v.t} \\div 9 ${v.t % 9 ? '\\text{ no}' : '\\text{ sí}'} \\qquad ${v.t} \\div 15 ${v.t % 15 ? '\\text{ no}' : '\\text{ sí}'}$`, dice: () => 'Busca el primer número que sea de 9 y de 15.' }, 'Múltiplos de 15: 15, 30, **45**; y $45 = 9 \\cdot 5$.')],
    ['MCD: el pedazo más grande',
      xpMira('dibujo', 'Segunda idea: el **máximo común divisor** es el pedazo más grande que cabe en los dos.', { dib: cuerdas, v: { a: 20, b: 30, s: 1 }, alto: 170 }, [
        ['Dos cuerdas, de 20 y 30 metros. Se cortan en pedazos iguales, sin que sobre nada.', {}],
        ['Con pedazos de 4, en la segunda sobran 2. No sirve.', { s: 4 }],
        ['Con pedazos de 5 no sobra en ninguna: el 5 divide a los dos.', { s: 5 }],
        ['Con pedazos de 10 tampoco, y son más largos.', { s: 10 }, '$\\text{mcd}(20, 30) = 10$'],
        ['Más largos no se puede: 10 es el mayor divisor común.', { s: 15 }],
      ], 'MCD: el mayor número que divide a los dos. Sirve para repartir o cortar sin que sobre.'),
      xpHaz('dibujo', 'Dos cintas de 28 y 42 cm se cortan en pedazos iguales, lo más largos posible y sin sobrantes. ¿De cuánto?', { dib: cuerdas, v: { a: 28, b: 42, s: 3, un: 'cm' }, metas: { s: 14 }, alto: 220, manijas: [{ k: 's', min: 1, max: 21, paso: 1, et: 'largo del pedazo' }],
        lee: v => `$28 \\div ${v.s} ${28 % v.s ? '\\text{ no}' : '\\text{ sí}'} \\qquad 42 \\div ${v.s} ${42 % v.s ? '\\text{ no}' : '\\text{ sí}'}$`, dice: v => (28 % v.s || 42 % v.s ? 'Sobra en alguna.' : v.s < 14 ? 'No sobra, pero hay uno más largo.' : 'No sobra, y no hay uno más largo.') }, '14 divide a 28 y a 42, y ninguno mayor lo hace.')],
    ['Con factores primos',
      xpMira('dibujo', 'Tercera idea: con los **primos** salen los dos de una vez.', { dib: fact, v: { c: 0, m: 0, p: '' }, alto: 185 }, [
        ['24 es 2 · 2 · 2 · 3 y 36 es 2 · 2 · 3 · 3.', {}],
        ['Los que comparten son dos doses y un tres.', { c: 1 }],
        ['Su producto es el MCD: 2 por 2 por 3, doce.', { p: 'MCD = 2 · 2 · 3 = 12' }, '$\\text{mcd}(24, 36) = 12$'],
        ['Para el MCM se toman todos, cada primo las veces que más aparece: tres doses y dos treses.', { c: 0, m: 1, p: 'MCM = 2 · 2 · 2 · 3 · 3 = 72' }, '$2^3 \\cdot 3^2 = 72$'],
        ['Un chequeo: el MCD por el MCM da el producto de los dos números.', {}, '$12 \\cdot 72 = 24 \\cdot 36$'],
      ], 'MCD: primos comunes. MCM: todos los primos, con el mayor exponente.'),
      xpHaz('fichas', '$40 = 2^3 \\cdot 5$ y $60 = 2^2 \\cdot 3 \\cdot 5$. Pon el MCD y el MCM.', { slots: [{ x: 110, y: 56, w: 92, et: 'MCD' }, { x: 230, y: 56, w: 92, et: 'MCM' }], fichas: ['20', '120', '10', '60', '240'], meta: ['20', '120'], alto: 104, pista: 'Comunes: dos doses y un cinco. Todos: tres doses, un tres y un cinco.' }, 'MCD $2^2 \\cdot 5 = 20$ y MCM $2^3 \\cdot 3 \\cdot 5 = 120$.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', '¿Con qué se resuelve cada pregunta?', { slots: [{ x: 88, y: 76, w: 160, h: 112, n: 4, et: 'MCM', ey: -62 }, { x: 252, y: 76, w: 160, h: 112, n: 4, et: 'MCD', ey: -62 }], fichas: ['¿cuándo coinciden?', 'cortar sin sobras', '¿otra vez juntos?', 'bolsas iguales'], meta: [['¿cuándo coinciden?', '¿otra vez juntos?'], ['cortar sin sobras', 'bolsas iguales']], alto: 138, pista: 'Coincidir mira hacia adelante (múltiplos); repartir mira hacia adentro (divisores).' }, 'Coincidir es MCM; cortar o repartir por igual es MCD.')],
  ], 'Coincidir es MCM, repartir sin sobras es MCD, y los primos dan los dos.');
}
