// Preuniversitario · pu-ec-2 «Edades, mezclas y monedas» (Explora). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Dos edades que crecen juntas.
  const edades = (v, K) => { const u = v.u ?? 4, A = v.a + v.t, B = v.b + v.t; return K.t(24, 42, v.ea, 's tm', 'start') + K.r(24, 48, v.a * u, 30, 'fa') + K.r(24 + v.a * u, 48, v.t * u, 30, 'ff') + K.t(24 + A * u + 8, 69, N(A), 'ta', 'start') + K.t(24, 106, v.eb, 's tm', 'start') + K.r(24, 112, v.b * u, 30, 'fg') + K.r(24 + v.b * u, 112, v.t * u, 30, 'ff') + K.t(24 + B * u + 8, 133, N(B), 'tg', 'start') + K.f(v.d ?? 0, K.cota(24 + B * u, 156, 24 + A * u, 156, `diferencia ${v.a - v.b}`, 'tf')); };
  // n monedas: k de las grandes.
  const monedas = (v, K) => { let h = ''; for (let i = 0; i < v.n; i++) { const g = i < Math.round(v.k), x = 36 + (i % 8) * 38, y = 50 + Math.floor(i / 8) * 42; h += K.c(x, y, g ? 17 : 13, g ? 'fG' : 'fA') + K.t(x, y + 4, g ? v.G : v.P, 'tc s'); } return h + K.t(170, 142, v.t ?? `total ${v.n * v.P + Math.round(v.k) * (v.G - v.P)}`, 'b ta'); };
  // Mezcla: dos frascos y el precio por kilo del resultado.
  const mezcla = (v, K) => { const m = (v.a * v.pa + v.b * v.pb) / (v.a + v.b), u = 13; return K.r(50, 150 - v.a * u, 70, v.a * u, 'fa') + K.t(85, 168, `${N(v.a)} ${v.un}`, 's') + K.t(85, 140 - v.a * u, v.pa, 'ta') + K.r(220, 150 - v.b * u, 70, v.b * u, 'fg') + K.t(255, 168, `${N(v.b)} ${v.un}`, 's') + K.t(255, 140 - v.b * u, v.pb, 'tg') + K.t(170, 100, N(m), 'B tf') + K.t(170, 122, 'la mezcla', 's tm'); };

  xpLec('pu-ec-2', [
    ['Las edades crecen juntas',
      xpMira('dibujo', 'Empecemos por la idea: pasan los años y la **diferencia** de edades no cambia.', { dib: edades, v: { a: 34, b: 10, t: 0, d: 0, ea: 'tía', eb: 'sobrino' }, alto: 185 }, [
        ['Una tía tiene 34 años y su sobrino 10. Se llevan 24.', { d: 1 }, '$34 - 10 = 24$'],
        ['Pasan 6 años: los dos crecen igual, 40 y 16. Se siguen llevando 24.', { t: 6 }, '$40 - 16 = 24$'],
        ['¿Cuándo tendrá la tía el doble? Cuando la diferencia sea igual a la edad del sobrino.', {}, '$2x - x = 24$'],
        ['Es decir, cuando él tenga 24 y ella 48: dentro de 14 años.', { t: 14 }, '$24 - 10 = 14$'],
        ['Con ecuación: 34 más t es el doble de 10 más t.', {}, '$34 + t = 2(10 + t)$'],
      ], 'A los dos se les suman los mismos años. La diferencia es siempre la misma.'),
      xpHaz('dibujo', 'Un padre tiene 38 años y su hija 10. Mueve los años hasta que él tenga el **doble** que ella.', { dib: edades, v: { a: 38, b: 10, t: 2, u: 3.9, d: 0, ea: 'padre', eb: 'hija' }, metas: { t: 18 }, alto: 205, manijas: [{ k: 't', min: 0, max: 24, paso: 1, et: 'años que pasan' }],
        lee: v => `$38 + ${v.t} = ${38 + v.t} \\qquad 2 \\cdot (10 + ${v.t}) = ${2 * (10 + v.t)}$`, dice: v => `Él tendría ${38 + v.t} y ella ${10 + v.t}.` }, '$38 + t = 20 + 2t$: $t = 18$, con 56 y 28 años.')],
    ['Cambiar una por otra',
      xpMira('dibujo', 'Segunda idea: supón que **todas son iguales** y cambia de a una.', { dib: monedas, v: { n: 10, k: 0, G: 5, P: 2 }, alto: 155 }, [
        ['Diez billetes, unos de 2 mil y otros de 5 mil, suman 38 mil. ¿Cuántos hay de cada uno?', { t: 'deben ser 38' }],
        ['Supongamos que todos son de 2 mil: serían 20 mil.', { t: null }, '$10 \\cdot 2 = 20$'],
        ['Cada vez que se cambia uno de 2 por uno de 5, el total sube 3.', { k: 1 }, '$20 + 3 = 23$'],
        ['Faltan 18 desde 20 hasta 38: son seis cambios.', { k: 6 }, '$18 \\div 3 = 6$'],
        ['Seis de 5 mil y cuatro de 2 mil: 30 más 8.', {}, '$6 \\cdot 5 + 4 \\cdot 2 = 38$'],
      ], 'Supón que todas valen lo menos; cada cambio sube la diferencia entre las dos.'),
      xpHaz('dibujo', 'Quince monedas de 1 y de 5 suman 39. Cambia monedas hasta lograrlo.', { dib: monedas, v: { n: 15, k: 0, G: 5, P: 1 }, metas: { k: 6 }, alto: 210, manijas: [{ k: 'k', min: 0, max: 15, paso: 1, et: 'monedas de 5' }],
        lee: v => `$5 \\cdot ${v.k} + ${15 - v.k} = ${15 + 4 * v.k}$`, dice: v => `Cada cambio sube 4. Van ${15 + 4 * v.k}.` }, 'Todas de 1 son 15; faltan 24 y cada cambio sube 4: seis monedas de 5.')],
    ['Mezclas',
      xpMira('dibujo', 'Tercera idea: en una mezcla se suma lo que **vale** cada parte.', { dib: mezcla, v: { a: 3, pa: 4, b: 3, pb: 10, un: 'kg' }, alto: 180 }, [
        ['Tres kilos de 4 mil y tres kilos de 10 mil. Mitad y mitad: la mezcla vale 7 mil el kilo.', {}, '$\\tfrac{3 \\cdot 4 + 3 \\cdot 10}{6} = 7$'],
        ['Si se pone más del barato, 6 kilos, el precio baja hacia 4.', { a: 6 }, '$\\tfrac{6 \\cdot 4 + 3 \\cdot 10}{9} = 6$'],
        ['Se suma lo que vale cada parte y se divide entre todos los kilos.', {}, '$\\tfrac{24 + 30}{9} = 6$'],
        ['El precio de la mezcla siempre queda entre los dos.', {}, '$4 < 6 < 10$'],
      ], 'Valor de la mezcla = (cantidad × precio de cada parte, sumado) ÷ cantidad total.'),
      xpHaz('dibujo', 'Hay 2 kg de maní de 8 mil. ¿Cuántos kilos de uno de 5 mil se le agregan para que la mezcla valga 6 mil?', { dib: (v, K) => mezcla({ a: 2, pa: 8, b: v.b, pb: 5, un: 'kg' }, K), v: { b: 1 }, metas: { b: 4 }, alto: 230, manijas: [{ k: 'b', min: 1, max: 8, paso: 1, et: 'kilos de 5 mil' }],
        lee: v => `$\\tfrac{2 \\cdot 8 + ${v.b} \\cdot 5}{${2 + v.b}} = ${N((16 + 5 * v.b) / (2 + v.b))}$`, dice: v => `La mezcla valdría ${N((16 + 5 * v.b) / (2 + v.b))} mil el kilo.` }, '$\\tfrac{16 + 20}{6} = 6$: cuatro kilos.')],
    ['Ahora sí, un problema',
      xpHaz('fichas', 'Hay 14 asientos entre bancos de 3 patas y sillas de 4, y 48 patas en total. Pon las patas si todos fueran bancos, las sillas y los bancos.', { slots: [{ x: 62, y: 58, w: 96, et: 'todos bancos' }, { x: 170, y: 58, w: 96, et: 'sillas' }, { x: 278, y: 58, w: 96, et: 'bancos' }], fichas: ['42', '6', '8', '56', '7', '12'], meta: ['42', '6', '8'], alto: 106, pista: 'Cada banco que se cambia por silla agrega 1 pata. Faltan 48 − 42.' }, '$14 \\cdot 3 = 42$; faltan 6 patas, una por silla: 6 sillas y 8 bancos.')],
  ], 'Los mismos años para todos, cambios de uno por otro, y sumar lo que vale cada parte.');
}
