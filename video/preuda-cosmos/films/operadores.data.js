// «Operaciones nuevas» · Preuniversitario, razonamiento lógico, mundo 11 (Operadores definidos), lección pu-op-1. Datos puros.
// Reto: a # b = aᵇ − bᵃ; 3 # 2 + 4 # 2 = 1 + 0 = 1. En medio: la regla como máquina (a ∗ b = a·b + a: 4 ∗ 3 = 16), los
// paréntesis con negativos ((−2) ∗ 3 = −8), el orden importa (3 ∗ 4 = 15), la operación por tabla ((a∘b)∘(b∘b) = a), la regla por
// casos (el mayor menos el menor), la parte entera (⌊7/2⌋ + ⌊−7/2⌋ = −1) y el neutro de a ▲ b = a + b + 5 (e = −5).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'UNA RESTA DE POTENCIAS', dur: 30,
      caps: [[1.0, 9.4, 'a # b = a a la b, menos b a la a', 'por ejemplo, 2 # 3 = 8 − 9 = −1'], [10.0, 19.4, 'Se pide 3 # 2 más 4 # 2', 'cada uno con su regla'], [20.0, 29.4, 'El orden de a y b importa', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. A numeral b es a elevado a la b, menos b elevado a la a. Dos numeral tres es ocho menos nueve.'], [10.0, 19.4, 'Hay que hallar tres numeral dos más cuatro numeral dos.'], [20.0, 29.4, 'Cuidado: el ejemplo usa dos y tres, y la pregunta tres y dos. Al final lo resolvemos.']] },
    { id: 'maquina', name: 'LA REGLA ES UNA MÁQUINA', dur: 28,
      caps: [[0.8, 8.4, 'a ∗ b = a · b + a', 'el símbolo es nuevo; la regla lo explica'], [9.0, 17.4, 'El primero por a, el segundo por b', '4 ∗ 3: a = 4 y b = 3'], [18.0, 26.4, '4 · 3 + 4 = 16', 'reemplazar y calcular']],
      narr: [[0.8, 8.4, 'Una operación definida es una máquina con una regla. Por ejemplo, a asterisco b es a por b más a.'], [9.0, 17.4, 'El primer número entra por a y el segundo por b. En cuatro asterisco tres, a es cuatro y b es tres.'], [18.0, 26.4, 'Se reemplaza y se calcula: cuatro por tres más cuatro, dieciséis.']] },
    { id: 'parentesis', name: 'PARÉNTESIS AL REEMPLAZAR', dur: 28,
      caps: [[0.8, 8.4, '(−2) ∗ 3 = (−2) · 3 + (−2)', 'el negativo entra con su paréntesis'], [9.0, 17.4, '−6 − 2 = −8', 'sin paréntesis, los signos se pierden'], [18.0, 26.4, 'Si la regla tiene a²', 'con a = −3: (−3)² = 9, no −9']],
      narr: [[0.8, 8.4, 'Al reemplazar un negativo, entra con su paréntesis: menos dos asterisco tres es menos dos por tres, más menos dos.'], [9.0, 17.4, 'Menos seis menos dos: menos ocho. Sin paréntesis, los signos se pierden.'], [18.0, 26.4, 'Con potencias es más grave: si la regla tiene a al cuadrado y a es menos tres, da nueve, no menos nueve.']] },
    { id: 'orden', name: 'EL ORDEN IMPORTA', dur: 28,
      caps: [[0.8, 8.4, '4 ∗ 3 = 16', 'pero 3 ∗ 4 = 3 · 4 + 3 = 15'], [9.0, 17.4, 'Cambiar el orden cambia el resultado', 'la operación no es conmutativa'], [18.0, 26.4, 'Solo si la regla es simétrica', 'como a + b o a · b, el orden no importa']],
      narr: [[0.8, 8.4, 'Cuatro asterisco tres dio dieciséis. Pero tres asterisco cuatro es tres por cuatro más tres: quince.'], [9.0, 17.4, 'Cambiar el orden cambió el resultado: esta operación no es conmutativa.'], [18.0, 26.4, 'El orden solo da igual si la regla trata igual a las dos letras, como a más b o a por b.']] },
    { id: 'tabla', name: 'LA OPERACIÓN EN TABLA', dur: 30,
      caps: [[0.8, 9.4, 'x ∘ y: fila de x, columna de y', 'la tabla es la regla'], [10.0, 19.4, 'a ∘ b = c y b ∘ b = a', 'primero cada paréntesis'], [20.0, 29.4, 'c ∘ a = a', 'el resultado es a']],
      narr: [[0.8, 9.4, 'Otro problema: en el conjunto a, b, c, una tabla define la operación círculo. X círculo y está en la fila de x y la columna de y.'], [10.0, 19.4, 'Se pide a círculo b, operado con b círculo b. Primero cada paréntesis: a círculo b es c, y b círculo b es a.'], [20.0, 29.4, 'Falta c círculo a: fila de c, columna de a. El resultado es a.']] },
    { id: 'casos', name: 'UNA REGLA POR CASOS', dur: 28,
      caps: [[0.8, 8.4, 'a ⋄ b: el mayor menos el menor', 'la regla mira primero cuál es mayor'], [9.0, 17.4, '7 ⋄ 2 = 7 − 2 = 5', '2 ⋄ 7 = 7 − 2 = 5'], [18.0, 26.4, 'Primero se decide el caso', 'luego se usa la fórmula de ese caso']],
      narr: [[0.8, 8.4, 'Algunas reglas tienen casos. Por ejemplo, a rombo b es el mayor menos el menor: antes de calcular, se mira cuál es mayor.'], [9.0, 17.4, 'Siete rombo dos es siete menos dos, cinco. Y dos rombo siete también es siete menos dos.'], [18.0, 26.4, 'El orden de trabajo es fijo: primero se decide en qué caso se está, y después se usa la fórmula de ese caso.']] },
    { id: 'piso', name: 'LA PARTE ENTERA', dur: 30,
      caps: [[0.8, 9.4, '⌊x⌋: el mayor entero hasta x', '⌊2.7⌋ = 2'], [10.0, 19.4, '⌊3.5⌋ = 3', 'pero ⌊−3.5⌋ = −4: el entero de abajo'], [20.0, 29.4, '3 + (−4) = −1', 'en la recta, siempre hacia la izquierda']],
      narr: [[0.8, 9.4, 'Otro problema: el piso de x es el mayor entero que no pasa de x. Se pide el piso de siete medios más el de menos siete medios.'], [10.0, 19.4, 'Siete medios es tres coma cinco: su piso es tres. Pero el piso de menos tres coma cinco es menos cuatro, el entero que queda debajo.'], [20.0, 29.4, 'Tres más menos cuatro: menos uno. En la recta, el piso siempre baja hacia la izquierda.']] },
    { id: 'neutro', name: 'EL QUE NO CAMBIA NADA', dur: 28,
      caps: [[0.8, 8.4, 'a ▲ b = a + b + 5', 'hay un número e que deja todo igual'], [9.0, 17.4, 'a ▲ e = a', 'a + e + 5 = a'], [18.0, 26.4, 'e = −5', 'comprobación: 8 ▲ (−5) = 8']],
      narr: [[0.8, 8.4, 'Algunas operaciones tienen un neutro, un número que no cambia nada. Con a triángulo b igual a a más b más cinco, se busca.'], [9.0, 17.4, 'El neutro e cumple a triángulo e igual a a. Reemplazando: a más e más cinco igual a a.'], [18.0, 26.4, 'Se cancela a y queda e más cinco igual a cero: e es menos cinco. Ocho triángulo menos cinco da ocho.']] },
    { id: 'resolver', name: 'LA RESTA, RESUELTA', dur: 30,
      caps: [[0.8, 9.4, '3 # 2 = 3² − 2³', '9 − 8 = 1'], [10.0, 19.4, '4 # 2 = 4² − 2⁴', '16 − 16 = 0'], [20.0, 29.4, '1 + 0 = 1', 'distinto de 2 # 3 = −1']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Tres numeral dos: a es tres y b es dos. Tres al cuadrado menos dos al cubo: nueve menos ocho, uno.'], [10.0, 19.4, 'Cuatro numeral dos: cuatro al cuadrado menos dos a la cuarta. Dieciséis menos dieciséis, cero.'], [20.0, 29.4, 'La suma es uno. Y fíjate: tres numeral dos da uno, pero dos numeral tres daba menos uno.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, '3 # 2 + 4 # 2 = 1', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: uno. Reemplazar con cuidado y en el orden correcto.'], [11.0, 20.4, 'El primero entra por a, los negativos con paréntesis, el orden importa, la tabla se lee por fila y columna, y los casos se deciden primero.'], [21.0, 29.4, 'Un símbolo nuevo es solo una regla nueva.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 11', TITLE = 'OPERACIONES NUEVAS', LINE = 'Un símbolo nuevo es solo una regla.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-op-1', KEYS: ['⌊', 'a^b', '▲'] };
})();
if (typeof module !== 'undefined') module.exports = D;
