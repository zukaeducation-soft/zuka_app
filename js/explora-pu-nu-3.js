// Preuniversitario · pu-nu-3 «Paridad, residuos y última cifra» (Explora). Los ejemplos no son los de los ejercicios.
{
  // Puntos en parejas: grupos a y b; si j = 1 los sueltos se juntan.
  const parejas = (v, K) => { const f = (n, x, y, c, rev) => { let h = ''; const k = Math.ceil(n / 2); for (let i = 0; i < n; i++) { const col = Math.floor(i / 2); h += K.c(x + (rev ? k - 1 - col : col) * 26, y + (i % 2) * 24, 9, n % 2 && i === n - 1 ? 'fF' : c); } return h; }; const b = Math.round(v.b); const A = Math.round(v.a); return f(A, 40, 60, 'fA') + (b ? f(b, 200, 60, 'fG', 1) : '') + K.t(80, 126, `${Math.round(v.a)}`, 'b ta') + (b ? K.t(240, 126, `${b}`, 'b tg') : '') + K.t(170, 30, v.p || '', 'b') + (v.j > 0.5 ? K.l(40 + Math.floor((A - 1) / 2) * 26 + 12, 60, 188, 60, 'lo d') : ''); };
  // n puntos en grupos de d; lo que sobra va aparte.
  const grupos = (v, K) => { const d = v.d, n = Math.round(v.n), q = Math.floor(n / d) - (v.s > 0.5 ? 1 : 0), r = n - d * q; let h = ''; for (let g = 0; g < q; g++) { const x = 24 + (g % 5) * 58, y = 44 + Math.floor(g / 5) * 46; h += K.r(x, y, 50, 36, 'fc', 8); for (let i = 0; i < d; i++) h += K.c(x + 9 + (i % 4) * 11, y + 11 + Math.floor(i / 4) * 14, 4.4, 'fA'); } for (let i = 0; i < r; i++) h += K.c(40 + i * 20, 156, 6, 'fF'); return h + K.t(170, 28, `${n} = ${d} · ${q} + ${r}`, 'b ta') + K.t(330, 161, r ? `${v.s > 0.5 ? "sobran" : "residuo"} ${r}` : 'sin residuo', r ? 'tf' : 'to', 'end'); };
  const texto = (v, K) => v.l.map((t, i) => K.f(Math.max(0, Math.min(1, v.n - i)), K.t(170, 44 + i * 40, t, i === v.l.length - 1 ? 'B ta' : 'b'))).join('');
  const Z = [{ x: 88, y: 76, w: 160, h: 112, n: 4, et: 'par', ey: -62 }, { x: 252, y: 76, w: 160, h: 112, n: 4, et: 'impar', ey: -62 }];

  xpLec('pu-nu-3', [
    ['Par o impar',
      xpMira('dibujo', 'Empecemos por la idea: par es **todo en parejas**; impar es que sobra uno.', { dib: parejas, v: { a: 8, b: 0, j: 0, p: '' }, alto: 145 }, [
        ['El 8 se acomoda en parejas exactas: es par.', {}],
        ['El 7 deja uno suelto: es impar.', { a: 7 }],
        ['Si se suman dos impares, 7 y 5, los dos sueltos hacen pareja: la suma es par.', { b: 5, j: 1, p: '7 + 5 = 12' }, '$\\text{impar} + \\text{impar} = \\text{par}$'],
        ['Con un impar y un par, el suelto sigue solo: impar.', { b: 6, j: 0, p: '7 + 6 = 13' }, '$\\text{impar} + \\text{par} = \\text{impar}$'],
        ['Al multiplicar, basta un factor par para que todo salga en parejas.', { a: 14, b: 0, p: '7 · 2 = 14' }, '$\\text{par} \\cdot \\text{lo que sea} = \\text{par}$'],
      ], 'Suma: impar con impar da par. Producto: solo impar por impar da impar.'),
      xpHaz('fichas', 'Sin hacer la cuenta, di si el resultado es par o impar.', { slots: Z, fichas: ['37 · 48', '95 + 61', '21 · 33', '84 + 19'], meta: [['37 · 48', '95 + 61'], ['21 · 33', '84 + 19']], alto: 138, pista: 'Mira solo si cada número es par o impar.' }, 'Un factor par da par; dos impares sumados dan par; impar por impar, impar; par más impar, impar.')],
    ['Los residuos se suman y se multiplican',
      xpMira('dibujo', 'Segunda idea: el **residuo** es lo que sobra al hacer grupos.', { dib: grupos, v: { n: 17, d: 5, s: 0 }, alto: 175 }, [
        ['17 en grupos de 5: tres grupos y sobran 2. El residuo es 2.', {}, '$17 = 5 \\cdot 3 + 2$'],
        ['24 en grupos de 5: sobran 4.', { n: 24 }, '$24 = 5 \\cdot 4 + 4$'],
        ['Si se suman, 17 más 24, los sobrantes también: 2 más 4 son 6.', { n: 41, s: 1 }, '$2 + 4 = 6$'],
        ['Con 6 sobrantes se hace otro grupo de 5 y sobra 1. Por eso 41 deja residuo 1.', { s: 0 }, '$6 = 5 + 1$'],
        ['Con productos pasa igual: se multiplican los residuos y se vuelve a dividir.', { n: 8 }, '$2 \\cdot 4 = 8 \\to 3$'],
      ], 'Cambia cada número por su residuo, haz la cuenta con ellos y saca el residuo otra vez.'),
      xpHaz('fichas', 'Residuo de $38 + 29$ entre 5, sin sumar: pon el de cada uno y el de la suma.', { slots: [{ x: 66, y: 58, w: 84, et: 'de 38' }, { x: 170, y: 58, w: 84, et: 'de 29' }, { x: 274, y: 58, w: 84, et: 'de la suma' }], fichas: ['3', '4', '2', '1', '7', '0'], meta: ['3', '4', '2'], alto: 106, pista: '3 más 4 son 7, y 7 todavía tiene un grupo de 5.' }, '$3 + 4 = 7$, y 7 deja residuo 2.')],
    ['La última cifra',
      xpMira('dibujo', 'Tercera idea: la última cifra de un producto **solo depende de las últimas cifras**.', { dib: texto, v: { l: ['47 · 83', '7 · 3 = 21', 'termina en 1'], n: 1 }, alto: 145 }, [
        ['¿En qué termina 47 por 83? No hace falta multiplicar todo.', {}],
        ['Las decenas solo aportan decenas. Importan el 7 y el 3.', { n: 2 }, '$7 \\cdot 3 = 21$'],
        ['21 termina en 1: el producto también.', { n: 3 }, '$47 \\cdot 83 = 3\\,901$'],
        ['Con 47 al cuadrado: 7 por 7 son 49, termina en 9.', { l: ['47 · 47', '7 · 7 = 49', 'termina en 9'] }],
        ['La última cifra es el residuo al dividir entre 10.', {}],
      ], 'Para la última cifra de sumas, productos y potencias basta usar las últimas cifras.'),
      xpHaz('fichas', '¿En qué termina $123 \\cdot 456$? Pon el producto de las últimas cifras y la respuesta.', { slots: [{ x: 110, y: 58, w: 110, et: 'últimas cifras' }, { x: 240, y: 58, w: 92, et: 'termina en' }], fichas: ['18', '8', '9', '1', '6'], meta: ['18', '8'], alto: 106, pista: 'Multiplica 3 por 6 y mira en qué termina.' }, '$3 \\cdot 6 = 18$: termina en 8.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Busca el número menor que 20 que deja residuo 2 entre 3 y residuo 3 entre 4.', { dib: (v, K) => K.t(170, 40, v.n, 'B') + K.t(100, 90, `entre 3: ${v.n % 3}`, v.n % 3 === 2 ? 'b to' : 'b tf') + K.t(240, 90, `entre 4: ${v.n % 4}`, v.n % 4 === 3 ? 'b to' : 'b tf'), v: { n: 4 }, metas: { n: 11 }, alto: 165, manijas: [{ k: 'n', min: 1, max: 19, paso: 1, et: 'número' }],
        lee: v => `$${v.n} = 3 \\cdot ${Math.floor(v.n / 3)} + ${v.n % 3} = 4 \\cdot ${Math.floor(v.n / 4)} + ${v.n % 4}$`, dice: () => 'Si le sumaras 1, sería múltiplo de 3 y de 4.' }, 'Le falta 1 para ser múltiplo de 3 y de 4: $12 - 1 = 11$.')],
  ], 'Parejas y sueltos, sobrantes que se operan, y últimas cifras que mandan.');
}
