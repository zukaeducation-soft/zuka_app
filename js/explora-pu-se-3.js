// Preuniversitario · pu-se-3 «Patrones cíclicos» (Explora). Los ejemplos no son los de los ejercicios.
{
  const CC = ['fF', 'fG', 'fA', 'fM'];
  // Tira de cuentas en filas de c (el largo del ciclo) hasta la n.
  const filas = (v, K) => { const c = v.c, n = Math.round(v.n), u = Math.min(22, 170 / Math.ceil(v.max / c)); let h = ''; for (let i = 0; i < n; i++) { const r = Math.floor(i / c), x = 120 + (i % c) * 34, y = 24 + r * u; h += K.c(x, y, u * 0.4, i === n - 1 && v.ult ? 'fn gr' : CC[i % c]) + (i === n - 1 ? K.c(x, y, u * 0.4, CC[i % c]) + K.c(x, y, u * 0.62, 'fn') + K.t(x + 18, y + 5, n, 's', 'start') : ''); } return h; };
  const DIAS = ['lun', 'mar', 'mié', 'jue', 'vie', 'sáb', 'dom'];
  // Rueda de n rótulos con un señalador en k (se puede pasar de una vuelta).
  const rueda = (K, R, k, de) => { const n = R.length, cy = 112; let h = K.c(170, cy, 84, 'fn'); R.forEach((t, i) => { const [x, y] = K.at(170, cy, 84, 90 - i * 360 / n), on = ((Math.round(k) % n) + n) % n === i; h += K.c(x, y, 19, on ? 'fA' : i === de ? 'fg' : 'fc') + K.t(x, y + 5, t, on ? 'tc s' : 's'); }); const p = K.at(170, cy, 52, 90 - k * 360 / n); return h + K.ar(170, cy, ...p, 'la gr'); };
  const faros = (v, K) => { const X = t => 24 + t * 12.2; let h = ''; [[v.a, 60, 'fF', 'tf'], [v.b, 112, 'fG', 'tg']].forEach(([m, y, cl, tc]) => { h += K.l(X(0), y, X(24), y, 'lm') + K.t(334, y - 14, `cada ${m} s`, `s ${tc}`, 'end'); for (let t = 0; t <= 24; t += m) h += K.c(X(t), y, 6, t <= v.t + 1e-9 ? cl : 'fc'); }); return h + K.l(X(v.t), 38, X(v.t), 128, 'la') + K.t(X(v.t), 30, `${K.sig(v.t)} s`, 'ta'); };

  xpLec('pu-se-3', [
    ['Lo que se repite, sobra',
      xpMira('dibujo', 'Empecemos por la idea: en un ciclo, las **vueltas completas** no cambian nada.', { dib: filas, v: { c: 4, n: 4, max: 30 }, alto: 205 }, [
        ['Un collar repite naranja, amarillo, verde y gris. Cuatro cuentas son una vuelta.', {}],
        ['Ponemos cada vuelta en una fila. La cuenta 8 vuelve a ser gris.', { n: 8 }],
        ['¿De qué color es la 30? Veintiocho son siete vueltas completas.', { n: 28 }, '$28 = 7 \\cdot 4$'],
        ['Sobran dos: la 30 es como la segunda. Amarilla.', { n: 30 }, '$30 = 7 \\cdot 4 + 2$'],
        ['Lo único que importa es el residuo. Si es 0, es el último del ciclo.', {}],
      ], 'Divide entre el largo del ciclo: el **residuo** dice el lugar. Residuo 0 es el último.'),
      xpHaz('dibujo', 'Hoy es martes. Gira la flecha hasta el día que será dentro de 38 días.', { dib: (v, K) => rueda(K, DIAS, v.k, 1), v: { k: 1 }, cumple: v => ((v.k % 7) + 7) % 7 === 4, sol: { k: 4 }, alto: 226,
        manijas: [{ k: 'k', min: -7, max: 46, paso: 1, r: 10, en: v => XPK.at(170, 112, 52, 90 - v.k * 360 / 7), de: (x, y, v) => { const k = (90 - Math.atan2(112 - y, x - 170) * 180 / Math.PI) / (360 / 7); return v.k + ((((k - v.k) % 7) + 10.5) % 7) - 3.5; } }],
        lee: () => '$38 = 5 \\cdot 7 + 3$', dice: () => 'Cinco semanas no cambian el día. Solo cuentan los días que sobran.' }, 'Sobran 3 días: de martes a viernes.')],
    ['La última cifra',
      xpMira('dibujo', 'Segunda idea: las **últimas cifras** de las potencias también dan vueltas.', { dib: (v, K) => rueda(K, ['3', '9', '7', '1'], v.k, -1) + K.t(8, 24, v.p, 'b ta', 'start'), v: { k: 0, p: '3¹ = 3' }, alto: 226 }, [
        ['Potencias de 3. La primera termina en 3.', {}],
        ['3 por 3 son 9. Luego 27, que termina en 7.', { k: 2, p: '3³ = 27' }],
        ['27 por 3 son 81: termina en 1.', { k: 3, p: '3⁴ = 81' }],
        ['81 por 3 son 243: otra vez 3. El ciclo es 3, 9, 7, 1, de largo 4.', { k: 4, p: '3⁵ = 243' }],
        ['Para 3 a la 50: 50 entre 4 deja residuo 2. Termina como 3 a la 2, en 9.', { k: 5, p: '3⁵⁰ → …9' }, '$50 = 12 \\cdot 4 + 2$'],
      ], 'Escribe las últimas cifras hasta que se repitan y usa el residuo del exponente.'),
      xpHaz('fichas', 'Las potencias de 8 terminan en 8, 4, 2, 6 y se repite. ¿En qué termina $8^{23}$? Pon el residuo y la cifra.', { slots: [{ x: 110, y: 58, w: 110, et: 'residuo de 23 ÷ 4' }, { x: 240, y: 58, w: 100, et: 'última cifra' }], fichas: ['3', '2', '1', '4', '6', '8'], meta: ['3', '2'], alto: 106, pista: '23 son 5 vueltas de 4 y sobran 3. La tercera del ciclo es…' }, '$23 = 5 \\cdot 4 + 3$: la tercera, 2.')],
    ['Dos ciclos a la vez',
      xpMira('dibujo', 'Tercera idea: dos ciclos **coinciden** cada cierto tiempo.', { dib: faros, v: { a: 4, b: 10, t: 0 }, alto: 145 }, [
        ['Dos faros se encienden juntos. Uno alumbra cada 4 segundos; el otro, cada 10.', {}],
        ['A los 4 y a los 8 alumbra solo el primero.', { t: 8 }],
        ['A los 10, solo el segundo. A los 12 y a los 16, solo el primero.', { t: 16 }],
        ['A los 20 alumbran los dos: es el primer múltiplo común de 4 y 10.', { t: 20 }, '$\\text{mcm}(4, 10) = 20$'],
      ], 'Dos ciclos vuelven a coincidir en el mínimo común múltiplo de sus largos.'),
      xpHaz('dibujo', 'Dos campanas suenan juntas al empezar: una cada 6 s y otra cada 9 s. Mueve el tiempo hasta que vuelvan a coincidir.', { dib: faros, v: { a: 6, b: 9, t: 3 }, metas: { t: 18 }, alto: 195, manijas: [{ k: 't', min: 1, max: 24, paso: 1, et: 'segundos' }],
        lee: v => `$${v.t} \\div 6 ${v.t % 6 ? '\\text{ no}' : '\\text{ sí}'} \\qquad ${v.t} \\div 9 ${v.t % 9 ? '\\text{ no}' : '\\text{ sí}'}$`, dice: v => (v.t % 6 === 0 && v.t % 9 === 0 ? 'Suenan las dos.' : v.t % 6 === 0 ? 'Suena solo la primera.' : v.t % 9 === 0 ? 'Suena solo la segunda.' : 'Ninguna suena en este segundo.') }, 'El primer múltiplo común de 6 y 9 es 18.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Un letrero escribe PERAPERAPERA… sin parar. ¿Qué letra ocupa el lugar 63? Pon las vueltas completas, el residuo y la letra.', { slots: [{ x: 62, y: 58, w: 92, et: 'vueltas' }, { x: 170, y: 58, w: 92, et: 'residuo' }, { x: 278, y: 58, w: 92, et: 'letra' }], fichas: ['15', '3', 'R', 'A', 'E', '16', '2'], meta: ['15', '3', 'R'], alto: 106, pista: '15 vueltas son 60 letras. Faltan 3.' }, '$63 = 15 \\cdot 4 + 3$: la tercera letra de PERA, la R.')],
  ], 'Las vueltas completas sobran, el residuo manda, y dos ciclos coinciden en el mínimo común múltiplo.');
}
