// Preuniversitario · pu-pr-5 «Aumentos, descuentos e IVA» (Explora, escena «dibujo»). Los ejemplos no son los de los ejercicios.
{
  const N = x => String(Math.round(x * 100) / 100);
  // Barras: cada una con su valor y su rótulo; u píxeles por unidad.
  const bars = (v, K) => {
    const u = v.u ?? 2;
    const fila = (x, y, cls, tcls, et, o = 1) => K.f(o, K.r(20, y, x * u, 30, cls) + K.t(20 + x * u + (v.m ? 18 : 8), y + 20, N(x), tcls, 'start') + K.t(20, y - 6, et, 's tm', 'start'));
    return fila(v.a, 26, 'fa', 'ta', v.ea ?? 'antes') + fila(v.b, 88, 'fg', 'tg', v.eb ?? 'después', v.fb ?? 1) + (v.c != null ? fila(v.c, 150, 'ff', 'tf', v.ec ?? 'al final', v.fc ?? 1) : '');
  };

  xpLec('pu-pr-5', [
    ['Subir y bajar es multiplicar',
      xpMira('dibujo', 'Empecemos por la idea: un aumento o un descuento es **un solo factor**.', { dib: bars, v: { a: 100, b: 100, u: 1.9, fb: 1 }, alto: 135 }, [
        ['Algo vale 100: es el 100 %, o sea 1 vez el precio.', {}, '$100\\,\\% = 1$'],
        ['Sube un 20 %: ahora es el 120 %, que es multiplicar por 1.2.', { b: 120 }, '$100 \\cdot 1.2 = 120$'],
        ['Si baja un 20 %, queda el 80 %: multiplicar por 0.8.', { b: 80 }, '$100 \\cdot 0.8 = 80$'],
        ['Baja un 5 %: queda el 95 %, por 0.95.', { b: 95 }, '$100 \\cdot 0.95 = 95$'],
        ['Sube un 50 %: por 1.5. El factor es 1 más o menos el porcentaje.', { b: 150 }, '$100 \\cdot 1.5 = 150$'],
      ], 'Aumentar r % es multiplicar por $1 + \\tfrac{r}{100}$; descontar, por $1 - \\tfrac{r}{100}$.'),
      xpHaz('dibujo', 'Unos zapatos de 80 mil bajan un 35 %. Arrastra hasta el precio nuevo.', { dib: bars, v: { a: 80, b: 72, u: 3, m: 1 }, metas: { b: 52 }, alto: 135, manijas: [{ k: 'b', min: 8, max: 80, paso: 4, en: v => [20 + v.b * 3, 103], de: x => (x - 20) / 3, r: 10 }],
        lee: v => `$\\tfrac{${v.b}}{80} = ${N(v.b / 80)}$`, dice: v => `${v.b} es el ${N(v.b / 0.8)} % de 80: bajó un ${N(100 - v.b / 0.8)} %.` }, 'Queda el 65 %: $80 \\cdot 0.65 = 52$ mil.')],
    ['Uno tras otro',
      xpMira('dibujo', 'Segunda idea: los cambios seguidos **se multiplican**, no se suman.', { dib: bars, v: { a: 100, b: 100, c: 100, u: 1.9, fb: 0, fc: 0, eb: 'sube 50 %', ec: 'ahora vale' }, alto: 195 }, [
        ['Una acción vale 100 y sube un 50 %.', { fb: 1, b: 150 }, '$100 \\cdot 1.5 = 150$'],
        ['Después baja un 50 %. Pero ahora el 50 % es de 150, no de 100.', { fc: 1, c: 150 }, '$50\\,\\% \\text{ de } 150 = 75$'],
        ['Queda en 75: no volvió a 100. Se perdió una cuarta parte.', { c: 75, ec: 'baja 50 %' }, '$150 \\cdot 0.5 = 75$'],
        ['Juntos son un solo factor: 1.5 por 0.5, que da 0.75.', {}, '$1.5 \\cdot 0.5 = 0.75$'],
        ['Y el orden no importa: al revés también queda en 75.', { b: 50, eb: 'baja 50 %', ec: 'sube 50 %' }, '$0.5 \\cdot 1.5 = 0.75$'],
      ], 'Porcentajes sucesivos: multiplica los factores. Cada cambio se calcula sobre el valor nuevo.'),
      xpHaz('dibujo', 'Un arriendo de 100 sube 10 % y al otro año 20 %. ¿Cuánto subió en total? Estira la barra del final.', { dib: bars, v: { a: 100, b: 110, c: 112, u: 1.8, m: 1, eb: 'sube 10 %', ec: 'sube 20 % más' }, metas: { c: 132 }, alto: 195, manijas: [{ k: 'c', min: 100, max: 150, paso: 2, en: v => [20 + v.c * 1.8, 165], de: x => (x - 20) / 1.8, r: 10 }],
        lee: v => `$\\tfrac{${v.c}}{110} \\approx ${N(v.c / 110)} \\qquad \\text{en total } +${v.c - 100}\\,\\%$`, dice: v => `De 110 a ${v.c} subió ${N(v.c - 110)}. El 20 % de 110 es 22.` }, '$1.1 \\cdot 1.2 = 1.32$: subió 32 %, no 30 %.')],
    ['Devolverse: IVA y precio de antes',
      xpMira('dibujo', 'Tercera idea: para volver al precio de antes, se **divide** entre el factor.', { dib: bars, v: { a: 50, b: 50, u: 3.8, ea: 'sin IVA', eb: 'con IVA del 19 %', fb: 0 }, alto: 135 }, [
        ['Un libro vale 50 sin IVA. Con el 19 % de IVA se multiplica por 1.19.', { fb: 1, b: 59.5 }, '$50 \\cdot 1.19 = 59.5$'],
        ['Si solo conoces el precio con IVA, el camino de vuelta es dividir.', {}, '$59.5 \\div 1.19 = 50$'],
        ['Quitarle el 19 % a 59.5 no sirve: daría 48.2, porque el 19 % era de 50.', { a: 48.2 }, '$59.5 \\cdot 0.81 \\approx 48.2$'],
        ['Igual con un descuento: si algo quedó en 40 tras bajar 20 %, antes valía 40 entre 0.8.', { a: 50, b: 40, ea: 'antes', eb: 'con 20 % menos' }, '$40 \\div 0.8 = 50$'],
      ], 'Adelante se multiplica por el factor; atrás se divide. Nunca se quita el mismo porcentaje.'),
      xpHaz('dibujo', 'Con IVA del 19 %, un mueble vale 178.5 mil. Arrastra su precio sin IVA hasta que cuadre.', { dib: (v, K) => bars({ ...v, b: v.a * 1.19, ea: 'sin IVA', eb: 'con IVA del 19 %' }, K), v: { a: 110, u: 1.1, m: 1 }, metas: { a: 150 }, alto: 135, manijas: [{ k: 'a', min: 100, max: 200, paso: 10, en: v => [20 + v.a * 1.1, 41], de: x => (x - 20) / 1.1, r: 10 }],
        lee: v => `$${v.a} \\cdot 1.19 = ${N(v.a * 1.19)}$`, dice: v => `Sin IVA ${v.a}; con IVA ${N(v.a * 1.19)}. Debe dar 178.5.` }, '$178.5 \\div 1.19 = 150$ mil.')],
    ['Ahora sí, un problema',
      xpHaz('dibujo', 'Con un descuento del 25 %, un celular quedó en 450 mil. Arrastra el precio de antes hasta que cuadre.', { dib: (v, K) => bars({ ...v, b: v.a * 0.75, ea: 'antes', eb: 'con 25 % menos' }, K), v: { a: 450, u: 0.36, m: 1 }, metas: { a: 600 }, alto: 135, manijas: [{ k: 'a', min: 400, max: 800, paso: 25, en: v => [20 + v.a * 0.36, 41], de: x => (x - 20) / 0.36, r: 10 }],
        lee: v => `$${v.a} \\cdot 0.75 = ${N(v.a * 0.75)}$`, dice: v => `Si antes valía ${v.a}, ahora valdría ${N(v.a * 0.75)}.` }, '450 son el 75 %: $450 \\div 0.75 = 600$ mil.')],
  ], 'Un factor por cada cambio, los factores se multiplican, y para devolverse se divide.');
}
