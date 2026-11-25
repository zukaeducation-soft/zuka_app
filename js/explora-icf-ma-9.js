// Preicfes · Matemáticas, mundo 9 «Dinero y Créditos» (Explora, escenas «dibujo», «fichas» y «hoja»). Ejemplos propios.
{
  const fila = (...et) => et.map((e, i) => ({ x: 340 * (i + 1) / (et.length + 1), y: 46, w: 84, et: e }));
  // Columnas de saldo: s es simple, c compuesto (años mostrados n).
  const cols = (v, K) => { let h = K.l(20, 150, 320, 150, 'lm'); for (let i = 0; i <= 4; i++) { const a = 200 * (1 + 0.5 * i) / 12, b = 200 * 1.5 ** i / 12, x = 34 + i * 60; h += K.f(v.n - i + 1, K.r(x, 150 - a, 20, a, 'fa', 2) + K.f(v.c, K.r(x + 23, 150 - b, 20, b, 'fg', 2)) + K.t(x + 20, 166, i, 's tm')); } return h + K.t(170, 20, v.t, 'ta'); };
  // Barra de precio: q es el porcentaje que queda.
  const barra = (v, K) => K.r(50, 60, 240, 46, 'fc', 3) + K.r(50, 60, v.q * 2.4, 46, 'fa', 3) + K.t(50 + v.q * 1.2, 89, `${Math.round(v.q)} %`, 'b') + K.t(170, 30, v.t, 'ta');

  xpLec('icf-ma-finanzas-1', [
    ['Simple: suma lo mismo',
      xpMira('fichas', 'Empecemos por la idea: con interés **simple** cada periodo **suma lo mismo**.', { slots: fila('mes 1', 'mes 2', 'mes 3'), fichas: ['206', '212', '218'], alto: 96 }, [
        ['Se prestan 200 mil al 3 % mensual simple.', {}],
        ['El interés de un mes son seis mil.', {}, '$0.03 \\cdot 200 = 6$'],
        ['Al primer mes se deben 206 mil.', { pon: { 0: '206' } }],
        ['Al segundo se suman otros seis.', { pon: { 1: '212' } }],
        ['Y al tercero, los mismos seis.', { pon: { 2: '218' } }, '$200 + 3 \\cdot 6 = 218$'],
      ], 'Capital por tasa por tiempo: siempre lo mismo.'),
      xpHaz('fichas', 'Se prestan 150 mil al 4 % mensual simple. Pon el interés de un mes y el de cinco.', { slots: fila('un mes', 'cinco meses'), fichas: ['6', '30', '4', '20', '180'], meta: ['6', '30'], alto: 96, pista: 'Saca el 4 % de 150 y repítelo.' }, '$0.04 \\cdot 150 = 6$ y $5 \\cdot 6 = 30$.')],
    ['Compuesto: multiplica',
      xpMira('dibujo', 'Segunda idea: con interés **compuesto** cada periodo **multiplica** lo que hay.', { dib: cols, v: { n: 0, c: 0, t: '200 mil al 50 %' }, alto: 176 }, [
        ['Hoy hay 200 mil en los dos ahorros.', { n: 0, c: 1 }],
        ['Al año 1 dan lo mismo: 300 mil.', { n: 1 }, '$200 \\cdot 1.5 = 300$'],
        ['Al año 2 el compuesto ya va adelante.', { n: 2 }, '$300 \\cdot 1.5 = 450$'],
        ['El simple suma cien; el otro gana sobre lo ganado.', { n: 3 }],
        ['Cada año la distancia es mayor.', { n: 4, t: 'simple y compuesto' }],
      ], 'El interés también gana interés.'),
      xpHaz('fichas', 'Se ponen 1 000 al 10 % anual compuesto. Pon el saldo de los años 1 y 2.', { slots: fila('año 1', 'año 2'), fichas: ['1 100', '1 210', '1 200', '1 010', '1 300'], meta: ['1 100', '1 210'], alto: 96, pista: 'El segundo año se saca el 10 % de lo que ya había.' }, '$1\\,000 \\cdot 1.1 \\cdot 1.1 = 1\\,210$.')],
    ['El mismo periodo',
      xpMira('hoja', 'Tercera idea: la **tasa** y el **tiempo** deben hablar del mismo periodo.', { paras: [['2 % mensual, por 6 meses'], ['2 % mensual, por 1 año'], ['12 % anual, por 1 mes'], ['2 % · 1']] }, [
        ['Mes con mes: son seis veces.', { luz: [0], nota: { 0: '12 %' } }],
        ['Un año son doce meses: doce veces.', { luz: [1], nota: { 1: '24 %' } }],
        ['Con interés simple, un mes es la doceava parte.', { luz: [2], nota: { 2: '1 %' } }],
        ['Usar un uno cuando son meses es el error típico.', { luz: [3], tacha: [3] }],
        ['Primero se cuentan los periodos.', {}],
      ], 'Cuenta cuántos periodos de la tasa caben en el tiempo.'),
      xpHaz('hoja', '5 % trimestral simple durante un año. Subraya el total.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['5 %'], ['60 %'], ['20 %']], pista: '¿Cuántos trimestres tiene un año?' }, '$4 \\cdot 5 = 20$ %.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'A: 100 mil al 12 % anual simple. B: 100 mil al 11 % anual compuesto. Subraya quién tiene más a los **2 años**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['A'], ['B'], ['Igual']], pista: 'Calcula los dos saldos del año 2.' }, 'A tiene 124; B, $100 \\cdot 1.11^2 = 123.21$.')],
  ], 'Sumar lo mismo, multiplicar por lo mismo y cuidar el periodo.');

  xpLec('icf-ma-finanzas-2', [
    ['El IVA',
      xpMira('fichas', 'Empecemos por la idea: con IVA del 19 % se multiplica por 1.19; para **volver** se **divide**.', { slots: fila('sin IVA', 'IVA', 'con IVA'), fichas: ['300', '57', '357'], alto: 96 }, [
        ['Sin IVA cuesta 300 mil.', { pon: { 0: '300' } }],
        ['El IVA son 57 mil.', { pon: { 1: '57' } }, '$0.19 \\cdot 300 = 57$'],
        ['Con IVA se pagan 357 mil.', { pon: { 2: '357' } }, '$300 \\cdot 1.19 = 357$'],
        ['Para volver, se divide entre 1.19.', {}, '$357 \\div 1.19 = 300$'],
        ['Quitar el 19 % de 357 no devuelve a 300.', {}],
      ], 'Ir: por 1.19. Volver: entre 1.19.'),
      xpHaz('fichas', 'Con un impuesto del 10 % se pagan 550 mil. Pon el precio sin impuesto y el impuesto.', { slots: fila('sin impuesto', 'impuesto'), fichas: ['500', '50', '495', '55', '540'], meta: ['500', '50'], alto: 96, pista: 'Divide entre 1.1.' }, '$550 \\div 1.1 = 500$: el impuesto son 50.')],
    ['Descuento sobre descuento',
      xpMira('dibujo', 'Segunda idea: el segundo descuento se hace sobre **lo que quedó**.', { dib: barra, v: { q: 100, t: 'precio completo' }, alto: 130 }, [
        ['El precio completo es el 100 %.', {}],
        ['Con 50 % queda la mitad.', { q: 50, t: '50 % menos' }],
        ['Otro 20 % se saca de esa mitad.', { q: 40, t: 'y 20 % de lo que quedó' }, '$0.5 \\cdot 0.8 = 0.4$'],
        ['Queda el 40 %: un descuento del 60 %.', { t: 'descuento total: 60 %' }],
        ['No es el 70 %: los porcentajes no se suman.', {}],
      ], 'Se multiplican las partes que quedan.'),
      xpHaz('fichas', '10 % de descuento y después otro 10 %. Pon el porcentaje que queda y el descuento total.', { slots: fila('queda', 'descuento'), fichas: ['81', '19', '80', '20', '90'], meta: ['81', '19'], alto: 96, pista: 'Multiplica 0.9 por 0.9.' }, '$0.9 \\cdot 0.9 = 0.81$: descuento del 19 %.')],
    ['La cuota',
      xpMira('fichas', 'Tercera idea: cada cuota paga **interés** y **abona** a la deuda.', { slots: fila('interés', 'abono', 'queda'), fichas: ['9', '50', '250'], alto: 96 }, [
        ['Se deben 300 mil al 3 % mensual.', {}],
        ['El interés del mes son nueve mil.', { pon: { 0: '9' } }, '$0.03 \\cdot 300 = 9$'],
        ['Además se abonan cincuenta a la deuda.', { pon: { 1: '50' } }, '$9 + 50 = 59$'],
        ['Solo el abono baja la deuda.', { pon: { 2: '250' } }, '$300 - 50 = 250$'],
        ['El mes siguiente el interés será menor.', {}, '$0.03 \\cdot 250 = 7.5$'],
      ], 'Interés de lo que se debe, más lo que se abona.'),
      xpHaz('hoja', 'Se deben 400 mil y se paga una cuota de 60, de los cuales 12 son interés. Subraya lo que queda debiendo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['340 mil'], ['352 mil'], ['388 mil']], pista: 'Separa el interés del abono.' }, 'Se abonan 48: $400 - 48 = 352$.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Una moto vale 4 000 mil. Subraya la forma de pago en que se **paga menos**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['12 cuotas de 350'], ['5 % de descuento de contado'], ['1 000 ya y 10 cuotas de 290']], pista: 'Halla el total de cada una.' }, '4 200, 3 800 y 3 900: gana la de contado.')],
  ], 'Dividir para volver, multiplicar lo que queda y separar el interés.');
}
