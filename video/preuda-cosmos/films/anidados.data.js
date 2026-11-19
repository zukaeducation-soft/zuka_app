// «Anidados y ecuaciones» · Preuniversitario, razonamiento lógico, mundo 11 (Operadores definidos), lección pu-op-2. Datos puros.
// Reto: a ⊗ b = a² − ab si a ≥ b y b² − ab si a < b; (3 ⊗ 5) ⊗ (4 ⊗ 2) = 10 ⊗ 8 = 20. En medio: de adentro hacia afuera
// (⟨n⟩ = n² − n: ⟨⟨3⟩⟩ = 30), (5 ∗ 3) ∗ 2 con a ∗ b = (a + b)/(a − b) → 3, la función que se aplica tres veces (f(f(f(11))) = 10),
// la regla que se usa a sí misma (f(1) = 2, f(n + 1) = 2f(n) − 1 → f(5) = 17), x ▽ 3 = 9 con a ▽ b = ab − a − b → 6, comprobar
// (x ⊕ 2 = −5 con a ⊕ b = a + b − ab → 7) y la x a los dos lados (x ∘ 1 = 3 ∘ x con a ∘ b = 2a + b → 5).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'UNA OPERACIÓN CON DOS CASOS', dur: 30,
      caps: [[1.0, 9.4, 'a ⊗ b = a² − ab si a ≥ b', 'y b² − ab si a < b'], [10.0, 19.4, 'Se pide (3 ⊗ 5) ⊗ (4 ⊗ 2)', 'una operación dentro de otra'], [20.0, 29.4, 'Cada paréntesis con su caso', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Para empezar, una operación con dos casos: si a no es menor que b, a al cuadrado menos a b; si no, b al cuadrado menos a b.'], [10.0, 19.4, 'Hay que calcular tres círculo cruz cinco, operado con cuatro círculo cruz dos.'], [20.0, 29.4, 'Hay operaciones dentro de otra, y cada una puede caer en un caso distinto. Al final lo resolvemos.']] },
    { id: 'adentro', name: 'DE ADENTRO HACIA AFUERA', dur: 28,
      caps: [[0.8, 8.4, '⟨n⟩ = n² − n', 'se pide ⟨⟨3⟩⟩'], [9.0, 17.4, 'Primero el de adentro', '⟨3⟩ = 9 − 3 = 6'], [18.0, 26.4, 'Ese resultado entra al de afuera', '⟨6⟩ = 36 − 6 = 30']],
      narr: [[0.8, 8.4, 'Una operación dentro de otra se trabaja de adentro hacia afuera. Aquí la regla es n al cuadrado menos n, aplicada dos veces al tres.'], [9.0, 17.4, 'Primero la de adentro: tres al cuadrado menos tres, seis.'], [18.0, 26.4, 'Ese seis entra a la de afuera: treinta y seis menos seis, treinta.']] },
    { id: 'cociente', name: 'UN COCIENTE ANIDADO', dur: 30,
      caps: [[0.8, 9.4, 'a ∗ b = (a + b) ÷ (a − b)', 'se pide (5 ∗ 3) ∗ 2'], [10.0, 19.4, '5 ∗ 3 = 8 ÷ 2 = 4', 'el paréntesis primero'], [20.0, 29.4, '4 ∗ 2 = 6 ÷ 2 = 3', 'el resultado es 3']],
      narr: [[0.8, 9.4, 'Otro problema: a asterisco b es a más b, dividido entre a menos b. Se pide cinco asterisco tres, operado con dos.'], [10.0, 19.4, 'Primero el paréntesis: cinco más tres es ocho, cinco menos tres es dos. Ocho entre dos, cuatro.'], [20.0, 29.4, 'Ahora cuatro asterisco dos: seis entre dos, tres.']] },
    { id: 'tresveces', name: 'LA MISMA REGLA TRES VECES', dur: 28,
      caps: [[0.8, 8.4, 'f(n) = n ÷ 2 si n es par', 'y n + 3 si n es impar'], [9.0, 17.4, 'f(f(f(11)))', '11 → 14 → 7 → 10'], [18.0, 26.4, 'En cada paso se mira el caso', 'par o impar, de nuevo']],
      narr: [[0.8, 8.4, 'Una regla puede aplicarse varias veces seguidas. Si n es par, f de n es su mitad; si es impar, se le suman tres.'], [9.0, 17.4, 'Se pide f aplicada tres veces al once. Once es impar: catorce. Catorce es par: siete. Siete es impar: diez.'], [18.0, 26.4, 'En cada paso se vuelve a mirar el caso: el número cambió, y el caso puede cambiar.']] },
    { id: 'escalera', name: 'LA REGLA QUE SE USA A SÍ MISMA', dur: 28,
      caps: [[0.8, 8.4, 'f(1) = 2 y f(n + 1) = 2 · f(n) − 1', 'cada valor sale del anterior'], [9.0, 17.4, '2 → 3 → 5 → 9 → 17', 'f(5) = 17'], [18.0, 26.4, 'Se sube peldaño a peldaño', 'sin saltarse ninguno']],
      narr: [[0.8, 8.4, 'Otras reglas se usan a sí mismas: f de uno es dos, y cada valor es el doble del anterior menos uno.'], [9.0, 17.4, 'Dos, luego tres, luego cinco, nueve y diecisiete. F de cinco es diecisiete.'], [18.0, 26.4, 'Es una escalera: para llegar a un peldaño hay que pasar por todos los de abajo.']] },
    { id: 'ecuacion', name: 'LA X DENTRO DEL OPERADOR', dur: 30,
      caps: [[0.8, 9.4, 'a ▽ b = ab − a − b', 'y x ▽ 3 = 9'], [10.0, 19.4, 'x entra por a, 3 por b', '3x − x − 3 = 9'], [20.0, 29.4, '2x = 12', 'x = 6']],
      narr: [[0.8, 9.4, 'Otro problema: a triángulo b es a por b menos a menos b. Se sabe que equis triángulo tres da nueve.'], [10.0, 19.4, 'Equis entra por a y tres por b: tres equis menos equis menos tres, igual a nueve.'], [20.0, 29.4, 'Dos equis menos tres es nueve, así que dos equis es doce y equis es seis.']] },
    { id: 'comprobar', name: 'COMPROBAR SIEMPRE', dur: 28,
      caps: [[0.8, 8.4, '6 ▽ 3 = 18 − 6 − 3 = 9', 'la respuesta cumple'], [9.0, 17.4, 'a ⊕ b = a + b − ab y x ⊕ 2 = −5', 'x + 2 − 2x = −5'], [18.0, 26.4, '−x = −7, x = 7', '7 + 2 − 14 = −5: cumple']],
      narr: [[0.8, 8.4, 'La respuesta se comprueba metiéndola en la regla: seis triángulo tres es dieciocho menos seis menos tres. Nueve: cumple.'], [9.0, 17.4, 'Otro ejemplo: a círculo más b es a más b menos a por b, y equis círculo más dos da menos cinco.'], [18.0, 26.4, 'Queda menos equis más dos igual a menos cinco: equis es siete. Y siete más dos menos catorce da menos cinco.']] },
    { id: 'doslados', name: 'LA X A LOS DOS LADOS', dur: 28,
      caps: [[0.8, 8.4, 'a ∘ b = 2a + b', 'y x ∘ 1 = 3 ∘ x'], [9.0, 17.4, '2x + 1 = 6 + x', 'en un lado x va por a; en el otro, por b'], [18.0, 26.4, 'x = 5', '11 = 11: cumple']],
      narr: [[0.8, 8.4, 'La equis puede salir a los dos lados. Con la regla dos a más b, equis círculo uno es igual a tres círculo equis.'], [9.0, 17.4, 'A la izquierda, equis va por a: dos equis más uno. A la derecha, va por b: seis más equis.'], [18.0, 26.4, 'Dos equis más uno igual a seis más equis da equis igual a cinco. Los dos lados dan once.']] },
    { id: 'resolver', name: 'LOS DOS CASOS, RESUELTOS', dur: 30,
      caps: [[0.8, 9.4, '3 ⊗ 5: 3 < 5, segundo caso', '5² − 3 · 5 = 25 − 15 = 10'], [10.0, 19.4, '4 ⊗ 2: 4 ≥ 2, primer caso', '4² − 4 · 2 = 16 − 8 = 8'], [20.0, 29.4, '10 ⊗ 8: primer caso', '100 − 80 = 20']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Tres círculo cruz cinco: tres es menor que cinco, segundo caso. Cinco al cuadrado menos tres por cinco: diez.'], [10.0, 19.4, 'Cuatro círculo cruz dos: cuatro es mayor, primer caso. Cuatro al cuadrado menos cuatro por dos: ocho.'], [20.0, 29.4, 'Falta diez círculo cruz ocho: diez es mayor, primer caso. Cien menos ochenta: veinte.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, '(3 ⊗ 5) ⊗ (4 ⊗ 2) = 20', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: veinte. Tres operaciones, cada una con su caso.'], [11.0, 20.4, 'De adentro hacia afuera, el caso en cada paso, la escalera peldaño a peldaño, y la equis se reemplaza, se despeja y se comprueba.'], [21.0, 29.4, 'Primero lo de adentro, y siempre comprobar.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 11', TITLE = 'ANIDADOS Y ECUACIONES', LINE = 'Primero lo de adentro; después, comprobar.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-op-2', KEYS: ['▽', '⟨', '⊗'] };
})();
if (typeof module !== 'undefined') module.exports = D;
