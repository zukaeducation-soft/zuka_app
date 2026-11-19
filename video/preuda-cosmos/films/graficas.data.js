// «Leer gráficas» · Preuniversitario, razonamiento lógico, mundo 9 (Tablas y gráficas), lección pu-gr-1. Datos puros.
// Reto: la lluvia de enero a junio (40, 50, 90, 120, 80, 40 mm); el mayor aumento porcentual es marzo (+80 %). En medio: leer
// los ejes, aumento absoluto frente a porcentual, la producción de café (30, 45, 36, 45, 60: el mayor aumento porcentual es
// 2020, +50 %), el diagrama circular (sector = ángulo / 360), los 180 estudiantes (baloncesto 90° → 45) y las líneas.
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LA LLUVIA DEL SEMESTRE', dur: 30,
      caps: [[1.0, 9.4, 'Lluvia de enero a junio', '40, 50, 90, 120, 80 y 40 mm'], [10.0, 19.4, 'El mayor aumento porcentual', 'respecto al mes anterior'], [20.0, 29.4, 'Cuatro meses posibles', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Una gráfica de barras muestra la lluvia de un municipio de enero a junio.'], [10.0, 19.4, 'Hay que hallar el mes con el mayor aumento porcentual de lluvia respecto al mes anterior.'], [20.0, 29.4, 'La barra que más sube a simple vista no siempre es la del mayor porcentaje. Al final lo resolvemos.']] },
    { id: 'ejes', name: 'LEER LOS EJES', dur: 28,
      caps: [[0.8, 8.4, 'Primero, qué mide cada eje', 'abajo los meses; al lado, milímetros'], [9.0, 17.4, 'La escala: de 20 en 20', 'cada raya vale 20 mm'], [18.0, 26.4, 'Leer con una regla imaginaria', 'del techo de la barra al eje']],
      narr: [[0.8, 8.4, 'Antes de leer una gráfica, se mira qué mide cada eje: abajo, los meses; al lado, los milímetros de lluvia.'], [9.0, 17.4, 'Luego, la escala: aquí las rayas van de veinte en veinte. Cada una vale veinte milímetros.'], [18.0, 26.4, 'Para leer una barra, se lleva una línea imaginaria desde su techo hasta el eje.']] },
    { id: 'absoluto', name: 'CUÁNTO SUBE', dur: 28,
      caps: [[0.8, 8.4, 'Aumento absoluto: la resta', 'febrero +10, marzo +40, abril +30'], [9.0, 17.4, 'Porcentual: sobre lo de antes', 'resta ÷ valor anterior'], [18.0, 26.4, 'Abril sube 30 sobre 90', 'marzo sube 40 sobre 50']],
      narr: [[0.8, 8.4, 'El aumento absoluto es la resta: febrero sube diez, marzo cuarenta y abril treinta.'], [9.0, 17.4, 'El aumento porcentual compara esa subida con lo que había antes: la resta entre el valor anterior.'], [18.0, 26.4, 'No es lo mismo subir treinta sobre noventa que subir cuarenta sobre cincuenta. El punto de partida cambia todo.']] },
    { id: 'cafe', name: 'LA COOPERATIVA DE CAFÉ', dur: 30,
      caps: [[0.8, 9.4, 'Producción: 30, 45, 36, 45, 60 t', 'de 2019 a 2023'], [10.0, 19.4, '2020: +15 sobre 30 = +50 %', '2022: +9 sobre 36 = +25 %'], [20.0, 29.4, '2023: +15 sobre 45 ≈ +33 %', 'el mayor aumento porcentual: 2020']],
      narr: [[0.8, 9.4, 'Otro problema: una cooperativa produjo treinta, cuarenta y cinco, treinta y seis, cuarenta y cinco y sesenta toneladas de café. Hay que hallar el año de mayor aumento porcentual.'], [10.0, 19.4, 'En dos mil veinte sube quince sobre treinta: cincuenta por ciento. En dos mil veintidós sube nueve sobre treinta y seis: veinticinco por ciento.'], [20.0, 29.4, 'En dos mil veintitrés sube quince sobre cuarenta y cinco, un tercio. El mayor es dos mil veinte, aunque dos mil veintitrés tenga la barra más alta.']] },
    { id: 'circular', name: 'EL DIAGRAMA CIRCULAR', dur: 28,
      caps: [[0.8, 8.4, 'La torta completa es el total', '360° son el 100 %'], [9.0, 17.4, 'Un sector de 90°', 'es 90 / 360 = un cuarto'], [18.0, 26.4, 'Fracción del círculo · total', 'así se pasa de grados a personas']],
      narr: [[0.8, 8.4, 'En un diagrama circular, la torta completa es el total: trescientos sesenta grados son el cien por ciento.'], [9.0, 17.4, 'Un sector de noventa grados es noventa sobre trescientos sesenta: un cuarto del total.'], [18.0, 26.4, 'Para pasar de grados a cantidad, se multiplica esa fracción por el total.']] },
    { id: 'deporte', name: 'EL DEPORTE FAVORITO', dur: 30,
      caps: [[0.8, 9.4, '180 estudiantes, cuatro deportes', 'fútbol 150°, baloncesto 90°, natación 72°'], [10.0, 19.4, 'Baloncesto: 90 / 360 = 1/4', 'un cuarto de los 180'], [20.0, 29.4, '180 / 4 = 45 estudiantes', 'prefieren el baloncesto']],
      narr: [[0.8, 9.4, 'Otro problema: a ciento ochenta estudiantes se les preguntó su deporte favorito. En el diagrama, el baloncesto ocupa noventa grados.'], [10.0, 19.4, 'Noventa grados de trescientos sesenta es un cuarto del círculo.'], [20.0, 29.4, 'Un cuarto de ciento ochenta: cuarenta y cinco estudiantes prefieren el baloncesto.']] },
    { id: 'lineas', name: 'GRÁFICAS DE LÍNEAS', dur: 28,
      caps: [[0.8, 8.4, 'Una línea muestra un cambio', 'en el tiempo: sube, baja o se queda plana'], [9.0, 17.4, 'Más empinada, cambio más rápido', 'plana: no cambia'], [18.0, 26.4, 'Comparar tramos de igual ancho', 'la pendiente se ve sin calcular']],
      narr: [[0.8, 8.4, 'Una gráfica de líneas muestra cómo cambia algo con el tiempo: sube, baja o se queda plana.'], [9.0, 17.4, 'Donde la línea es más empinada, el cambio es más rápido. Un tramo plano significa que no cambió.'], [18.0, 26.4, 'Al comparar tramos del mismo ancho, el más inclinado es el de mayor cambio, sin hacer cuentas.']] },
    { id: 'cuidado', name: 'TRES CUIDADOS', dur: 28,
      caps: [[0.8, 8.4, '1. El eje no siempre empieza en 0', 'una diferencia pequeña parece enorme'], [9.0, 17.4, '2. Absoluto o porcentual', 'leer qué pide la pregunta'], [18.0, 26.4, '3. Porcentaje de qué', 'del total, del grupo o del mes anterior']],
      narr: [[0.8, 8.4, 'Tres cuidados. Primero: si el eje no empieza en cero, una diferencia pequeña puede verse enorme.'], [9.0, 17.4, 'Segundo: saber si la pregunta pide un aumento absoluto o porcentual.'], [18.0, 26.4, 'Tercero: preguntarse siempre porcentaje de qué: del total, de un grupo o del valor anterior.']] },
    { id: 'resolver', name: 'LA LLUVIA, RESUELTA', dur: 30,
      caps: [[0.8, 9.4, 'Febrero: 10 / 40 = 25 %', 'marzo: 40 / 50 = 80 %'], [10.0, 19.4, 'Abril: 30 / 90 ≈ 33 %', 'mayo y junio bajan'], [20.0, 29.4, 'El mayor: marzo, +80 %', 'aunque abril tenga la barra más alta']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Febrero sube diez sobre cuarenta, veinticinco por ciento. Marzo sube cuarenta sobre cincuenta, ochenta por ciento.'], [10.0, 19.4, 'Abril sube treinta sobre noventa, un tercio. Mayo y junio bajan, así que no cuentan.'], [20.0, 29.4, 'El mayor aumento porcentual es el de marzo, aunque la barra más alta sea la de abril.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Marzo: +80 %', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: marzo. El porcentaje se calcula sobre el mes anterior.'], [11.0, 20.4, 'Leer los ejes y la escala, distinguir absoluto de porcentual, y en el círculo, grados sobre trescientos sesenta.'], [21.0, 29.4, 'Cada porcentaje mira hacia atrás.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 9', TITLE = 'LEER GRÁFICAS', LINE = 'Cada porcentaje mira hacia atrás.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-gr-1', KEYS: ['lluvia', 'café', 'natación'] };
})();
if (typeof module !== 'undefined') module.exports = D;
