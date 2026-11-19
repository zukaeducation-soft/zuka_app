// «Perímetros, áreas y círculos» · Preuniversitario, razonamiento lógico, mundo 2 (Geometría), lección pu-ge-4. Datos puros.
// Reto: la pista de atletismo (rectángulo 100 × 60 con dos semicírculos: borde 200 + 60π). En medio: borde frente a relleno,
// paralelogramo, triángulo y trapecio armados desde el rectángulo, π al desenrollar, el área del círculo y la ventana
// (rectángulo 2 × 1 con medio círculo: 2 + π/2).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LA PISTA DE ATLETISMO', dur: 30,
      caps: [[1.0, 9.4, 'Una pista de atletismo', 'un rectángulo con dos semicírculos'], [10.0, 19.4, '100 m de largo, 60 m de ancho', 'falta el largo del borde'], [20.0, 29.4, 'Cuatro opciones', 'al final la resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Una pista de atletismo es un rectángulo con un semicírculo pegado a cada extremo.'], [10.0, 19.4, 'El rectángulo mide cien metros de largo y sesenta de ancho. Hay que hallar la longitud del borde de la pista.'], [20.0, 29.4, 'Las opciones traen pi: hay que saber medir curvas. Antes, un repaso de bordes y de áreas. Al final la resolvemos.']] },
    { id: 'perimetro', name: 'BORDE Y RELLENO', dur: 28,
      caps: [[0.8, 8.4, 'El perímetro es el borde', 'lo que mide la cerca: 6 + 4 + 6 + 4 = 20'], [9.0, 17.4, 'El área es el relleno', 'las baldosas que caben: 6 · 4 = 24'], [18.0, 26.4, 'Uno se mide en m, otro en m²', 'metros de cerca frente a baldosas']],
      narr: [[0.8, 8.4, 'Un patio de seis por cuatro. Su perímetro es lo que mide el borde, la cerca que lo rodea: veinte metros.'], [9.0, 17.4, 'Su área es lo que cabe adentro: veinticuatro baldosas de un metro por un metro.'], [18.0, 26.4, 'Son preguntas distintas. El perímetro se mide en metros y el área en metros cuadrados. Confundirlas es una trampa frecuente.']] },
    { id: 'paralelogramo', name: 'EL PARALELOGRAMO', dur: 28,
      caps: [[0.8, 8.4, 'Un paralelogramo inclinado', 'base 7, altura 5'], [9.0, 17.4, 'Se corta y se pega al otro lado', 'queda un rectángulo de 7 por 5'], [18.0, 26.4, 'Área = base · altura', 'la altura es la recta que baja, no el lado']],
      narr: [[0.8, 8.4, 'Un paralelogramo con base siete y altura cinco. Su lado inclinado engaña: no es la altura.'], [9.0, 17.4, 'Se recorta el triángulo de un extremo y se pega en el otro. La figura se convierte en un rectángulo, sin perder ni ganar nada.'], [18.0, 26.4, 'Por eso su área es base por altura: treinta y cinco. La altura es la distancia recta entre las bases.']] },
    { id: 'triangulo', name: 'EL TRIÁNGULO', dur: 28,
      caps: [[0.8, 8.4, 'Dos triángulos iguales', 'base 9 y altura 4'], [9.0, 17.4, 'Juntos forman un paralelogramo', 'de área 9 · 4 = 36'], [18.0, 26.4, 'Área = base · altura / 2', 'cada triángulo es la mitad: 18']],
      narr: [[0.8, 8.4, 'Un triángulo de base nueve y altura cuatro. Se hace una copia y se gira media vuelta.'], [9.0, 17.4, 'Las dos copias encajan y forman un paralelogramo de base nueve y altura cuatro: treinta y seis.'], [18.0, 26.4, 'Cada triángulo es la mitad: base por altura sobre dos, dieciocho.']] },
    { id: 'trapecio', name: 'EL TRAPECIO', dur: 28,
      caps: [[0.8, 8.4, 'Bases de 11 y 5, altura 4', 'dos lados paralelos de distinto largo'], [9.0, 17.4, 'Dos copias: un paralelogramo', 'de base 11 + 5 = 16'], [18.0, 26.4, '(B + b) · h / 2', '16 · 4 / 2 = 32']],
      narr: [[0.8, 8.4, 'Un trapecio tiene dos bases paralelas de distinto largo: once y cinco, con altura cuatro.'], [9.0, 17.4, 'Con una copia girada se forma un paralelogramo. Su base es la suma de las dos bases: dieciséis.'], [18.0, 26.4, 'El trapecio es la mitad: base mayor más base menor, por la altura, sobre dos. Treinta y dos.']] },
    { id: 'pi', name: 'π AL DESENROLLAR', dur: 30,
      caps: [[0.8, 9.4, 'Una rueda da una vuelta', 'el borde se desenrolla sobre el piso'], [10.0, 19.4, 'Un poco más de tres diámetros', 'esa razón es π ≈ 3.14'], [20.0, 29.4, 'L = π · d = 2π · r', 'el diámetro es el doble del radio']],
      narr: [[0.8, 9.4, 'Una rueda da una vuelta completa sobre el piso y deja marcado lo que mide su borde.'], [10.0, 19.4, 'Ese camino mide un poco más de tres diámetros, en cualquier círculo. Esa razón es pi, más o menos tres coma catorce.'], [20.0, 29.4, 'La circunferencia mide pi por el diámetro, o dos pi por el radio. El error típico es usar el diámetro donde va el radio.']] },
    { id: 'circulo', name: 'EL ÁREA DEL CÍRCULO', dur: 30,
      caps: [[0.8, 9.4, 'Se corta en tajadas', 'como una pizza de muchas porciones'], [10.0, 19.4, 'Se acomodan alternadas', 'casi un rectángulo de πr por r'], [20.0, 29.4, 'A = π · r²', 'radio 7: área 49π']],
      narr: [[0.8, 9.4, 'Un círculo se corta en muchas tajadas delgadas, como una pizza.'], [10.0, 19.4, 'Se acomodan una hacia arriba y otra hacia abajo. Queda casi un rectángulo: de largo, media circunferencia, pi por r; de alto, el radio.'], [20.0, 29.4, 'Su área es pi por r por r: pi por r al cuadrado. Un círculo de radio siete tiene área cuarenta y nueve pi.']] },
    { id: 'ventana', name: 'LA VENTANA', dur: 30,
      caps: [[0.8, 9.4, 'Rectángulo de 2 m por 1 m', 'con un semicírculo encima'], [10.0, 19.4, 'Se suman las piezas', 'rectángulo 2 · 1 = 2'], [20.0, 29.4, 'Medio círculo de radio 1', 'π · 1² / 2 = π/2: total 2 + π/2']],
      narr: [[0.8, 9.4, 'Otro problema: una ventana es un rectángulo de dos metros de ancho y uno de alto, con un semicírculo encima. Hay que hallar su área.'], [10.0, 19.4, 'Se suma pieza por pieza. El rectángulo aporta dos por uno: dos metros cuadrados.'], [20.0, 29.4, 'El semicírculo tiene diámetro dos, así que su radio es uno: aporta medio pi. El área es dos más pi medios.']] },
    { id: 'resolver', name: 'LA PISTA, RESUELTA', dur: 30,
      caps: [[0.8, 9.4, 'Dos rectas de 100 m', 'los lados de 60 m no son borde'], [10.0, 19.4, 'Dos semicírculos', 'juntos forman un círculo de diámetro 60'], [20.0, 29.4, '200 + 60π metros', 'π · d = 60π']],
      narr: [[0.8, 9.4, 'Volvamos al reto. El borde de la pista tiene dos tramos rectos de cien metros. Los lados de sesenta quedan adentro: no son borde.'], [10.0, 19.4, 'Las dos curvas son dos semicírculos de diámetro sesenta. Juntos forman una circunferencia completa.'], [20.0, 29.4, 'Esa circunferencia mide pi por sesenta. El borde es doscientos más sesenta pi metros, unos trescientos ochenta y ocho.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'El borde mide 200 + 60π', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: doscientos más sesenta pi. Dos medias vueltas hacen una vuelta.'], [11.0, 20.4, 'Borde frente a relleno; rectángulo, paralelogramo, triángulo y trapecio; pi por el diámetro y pi por el radio al cuadrado.'], [21.0, 29.4, 'El borde se camina; el área se embaldosa.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 2', TITLE = 'PERÍMETROS, ÁREAS Y CÍRCULOS', LINE = 'El borde se camina; el área se embaldosa.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-ge-4', KEYS: ['60π', 'π/2', '35', '49π'] };
})();
if (typeof module !== 'undefined') module.exports = D;
