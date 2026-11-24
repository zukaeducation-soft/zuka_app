// Preuniversitario · pu-pr-2 «Regla de tres simple y compuesta» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Directa: dos barras que crecen a la vez.
  const dir = (v, K) => {
    const ux = 270 / v.X, uy = 270 / v.Y, x = v.x, y = v.y ?? v.x * v.k;
    return K.t(30, 36, v.ex, 's tm', 'start') + K.r(30, 44, x * ux, 32, 'fa') + K.t(30 + x * ux + 8, 66, N(x), 'ta', 'start') + K.t(30, 112, v.ey, 's tm', 'start') + K.r(30, 120, y * uy, 32, 'fg') + K.t(30 + y * uy + (v.m ? 20 : 8), 142, v.oc ? '?' : N(y), 'tg', 'start');
  };
  // Inversa: rectángulo de área fija.
  const inv = (v, K) => {
    const ux = v.ux, uy = v.uy, w = v.a * ux, h = v.b * uy, y = 190, x = 60;
    let s = K.r(x, y - h, w, h, 'fa');
    for (let i = 1; i < Math.round(v.a); i++) s += K.l(x + i * ux, y, x + i * ux, y - h, 'lr');
    return s + K.l(x, y, 325, y, 'lm') + K.l(x, y, x, 20, 'lm') + K.t(x + w / 2, y + 17, `${N(v.a)} ${v.ea}`, 'ta') + K.t(x - 8, y - h / 2 + 5, N(v.b), 'tg', 'end') + K.t(x - 8, y - h / 2 + 20, v.eb, 's tm', 'end');
  };
  // Trabajo: filas = horas, columnas = personas o máquinas; cada cuadro, una hora de una.
  const tra = (v, K) => {
    const a = Math.round(v.a), b = Math.round(v.b), u = 30, x = 170 - a * u / 2 + 10, y = 26; let s = '';
    for (let i = 0; i < a; i++) for (let j = 0; j < b; j++) s += K.r(x + i * u + 1, y + j * u + 1, u - 2, u - 2, 'fa') + K.f(v.val ?? 0, K.t(x + (i + 0.5) * u, y + (j + 0.5) * u + 4, v.c, 's'));
    return s + K.t(x + a * u / 2, 18, `${a} ${v.ea}`, 'ta') + K.t(x - 8, y + b * u / 2 + 5, `${b} h`, 'tg', 'end');
  };

  xpLec('pu-pr-2', [
    ['Directa: crecen a la vez',
      xpMira('dibujo', 'Empecemos por la idea: en una relación **directa**, las dos crecen igual.', { dib: dir, v: { X: 10, Y: 40, x: 2, k: 4, ex: 'cuadernos', ey: 'precio (miles)' }, alto: 170 }, [
        ['Dos cuadernos cuestan 8 mil pesos.', {}, '$8 \\div 2 = 4$'],
        ['Con el doble de cuadernos, el doble de precio: 4 cuadernos, 16 mil.', { x: 4 }, '$16 \\div 4 = 4$'],
        ['Con siete, 28 mil. El cociente no cambia: cada cuaderno vale 4 mil.', { x: 7 }, '$28 \\div 7 = 4$'],
        ['Por eso el camino más corto es buscar cuánto vale uno y multiplicar.', { x: 1 }, '$1 \\to 4$'],
        ['Nueve cuadernos: 9 por 4, son 36 mil.', { x: 9 }, '$9 \\cdot 4 = 36$'],
      ], 'Directa: el cociente no cambia. Halla cuánto vale **uno** y multiplica.'),
      xpHaz('dibujo', 'Cinco metros de tela cuestan 40 mil. Estira el precio hasta el de 8 metros.', { dib: dir, v: { X: 10, Y: 100, x: 8, y: 30, ex: 'metros de tela', ey: 'precio (miles)', m: 1 }, metas: { y: 64 }, alto: 170, manijas: [{ k: 'y', min: 4, max: 90, paso: 4, en: v => [30 + v.y * 2.7, 136], de: x => (x - 30) / 2.7, r: 11 }],
        lee: v => `$\\tfrac{40}{5} = 8 \\qquad \\tfrac{${v.y}}{8} = ${N(v.y / 8)}$`, dice: v => `A ese precio, cada metro saldría a ${N(v.y / 8)} mil.` }, 'Cada metro vale 8 mil: $8 \\cdot 8 = 64$ mil.')],
    ['Inversa: una sube, la otra baja',
      xpMira('dibujo', 'Segunda idea: en una relación **inversa**, lo que no cambia es el producto.', { dib: inv, v: { a: 6, b: 10, ux: 18, uy: 8, ea: 'obreros', eb: 'días' }, alto: 215 }, [
        ['Seis obreros terminan una obra en 10 días. El área es el trabajo: 60 jornadas.', {}, '$6 \\cdot 10 = 60$'],
        ['Si van menos obreros, 4, tienen que trabajar más días: 15. El trabajo es el mismo.', { a: 4, b: 15 }, '$4 \\cdot 15 = 60$'],
        ['Con 12 obreros bastan 5 días. El rectángulo se aplasta, pero ocupa lo mismo.', { a: 12, b: 5 }, '$12 \\cdot 5 = 60$'],
        ['Doble de obreros, mitad de días. Por eso se multiplica, no se divide.', {}, '$a \\cdot b = 60$'],
        ['Pregúntate siempre: si una crece, ¿la otra crece o baja? Eso decide qué cuenta hacer.', {}],
      ], 'Inversa: el producto no cambia. Si una se duplica, la otra queda a la mitad.'),
      xpHaz('dibujo', 'El pasto alcanza para 6 vacas durante 14 días. Son 7 vacas: baja los días hasta gastar lo mismo.', { dib: inv, v: { a: 7, b: 16, ux: 18, uy: 8.5, ea: 'vacas', eb: 'días' }, metas: { b: 12 }, alto: 215, manijas: [{ k: 'b', min: 2, max: 18, paso: 1, en: v => [123, 190 - v.b * 8.5], de: (x, y) => (190 - y) / 8.5, r: 11 }],
        lee: v => `$6 \\cdot 14 = 84 \\qquad 7 \\cdot ${v.b} = ${7 * v.b}$`, dice: v => `7 vacas por ${v.b} días son ${7 * v.b} raciones.` }, 'Son 84 raciones: $84 \\div 7 = 12$ días.')],
    ['Compuesta: cuenta el trabajo',
      xpMira('dibujo', 'Tercera idea: con **tres datos**, cuenta cuadritos de trabajo.', { dib: tra, v: { a: 2, b: 3, ea: 'sastres', c: '4', val: 0 }, alto: 190 }, [
        ['Dos sastres en 3 horas hacen 24 botones. ¿Cuántos hacen 4 sastres en 5 horas?', {}],
        ['Cada cuadro es un sastre trabajando una hora: hay 2 por 3, seis cuadros.', {}, '$2 \\cdot 3 = 6$'],
        ['Los seis cuadros dan 24 botones: cada cuadro hace 4.', { val: 1 }, '$24 \\div 6 = 4$'],
        ['Con 4 sastres y 5 horas hay 20 cuadros.', { a: 4, b: 5 }, '$4 \\cdot 5 = 20$'],
        ['Veinte cuadros de 4 botones: son 80.', {}, '$20 \\cdot 4 = 80$'],
      ], 'Compuesta: reduce a **uno solo en una hora** y luego multiplica por los cuadros que haya.'),
      xpHaz('dibujo', 'Dos hornos en 3 horas hacen 30 panes. Ajusta las horas para que 4 hornos hagan 100 panes.', { dib: tra, v: { a: 4, b: 1, ea: 'hornos', c: '5', val: 1 }, metas: { b: 5 }, alto: 250, manijas: [{ k: 'b', min: 1, max: 6, paso: 1, et: 'horas' }],
        lee: v => `$4 \\cdot ${v.b} \\cdot 5 = ${20 * v.b}$`, dice: v => `${4 * v.b} cuadros de 5 panes: ${20 * v.b}.` }, 'Un horno hace 5 panes por hora; 4 hornos, 20. Para 100 hacen falta 5 horas.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Con 6 litros de pintura se cubren 48 m². Estira los litros hasta cubrir 80 m².', { dib: (v, K) => dir({ ...v, x: v.y * 8, ex: 'm² cubiertos', ey: 'litros' }, K), v: { X: 110, Y: 12, y: 2, m: 1 }, metas: { y: 10 }, alto: 170, manijas: [{ k: 'y', min: 1, max: 12, paso: 1, en: v => [30 + v.y * 22.5, 136], de: x => (x - 30) / 22.5, r: 11 }],
        lee: v => `$48 \\div 6 = 8 \\qquad ${v.y} \\cdot 8 = ${8 * v.y}$`, dice: v => `${v.y} ${v.y === 1 ? 'litro cubre' : 'litros cubren'} ${8 * v.y} m².` }, 'Es directa: cada litro cubre 8 m², y $80 \\div 8 = 10$ litros.')],
  ], 'Directa guarda el cociente, inversa guarda el producto, y en la compuesta se cuentan cuadros de trabajo.');
}
