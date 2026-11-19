// «El condicional» · Preuniversitario, razonamiento lógico, mundo 10 (Lógica), lección pu-lo-3. Datos puros.
// Reto: cuatro tarjetas A, K, 4 y 7 y la regla «si hay vocal por un lado, hay un número par por el otro»; solo hay que voltear la A
// y el 7. En medio: la promesa del paraguas (solo falla si llueve y no lo llevo), Camila (equivale al contrarrecíproco), Medellín y
// Antioquia (el recíproco no equivale), el banco en festivo (modus tollens), lo que no se puede concluir, el «o» como condicional
// (estudio o repruebo) y la negación del condicional (llueve y voy al parque).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'LAS CUATRO TARJETAS', dur: 30,
      caps: [[1.0, 9.4, 'Letra de un lado, número del otro', 'se ven A, K, 4 y 7'], [10.0, 19.4, 'Regla: si hay vocal por un lado', 'hay un número par por el otro'], [20.0, 29.4, 'Cuáles hay que voltear', 'al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Cuatro tarjetas tienen una letra por un lado y un número por el otro. Se ven A, K, cuatro y siete.'], [10.0, 19.4, 'Alguien afirma: si una tarjeta tiene una vocal por un lado, tiene un número par por el otro.'], [20.0, 29.4, 'Hay que voltear solo las tarjetas necesarias para comprobar la regla. Al final lo resolvemos.']] },
    { id: 'promesa', name: 'UNA PROMESA', dur: 28,
      caps: [[0.8, 8.4, '«Si llueve, llevo paraguas»', 'p → q: p es la condición'], [9.0, 17.4, 'Cuatro casos posibles', 'solo uno rompe la promesa'], [18.0, 26.4, 'Llueve y no llevo paraguas', 'si no llueve, la promesa no se rompe']],
      narr: [[0.8, 8.4, 'Un condicional es una promesa: si llueve, llevo paraguas. Llover es la condición y llevar paraguas es lo prometido.'], [9.0, 17.4, 'Hay cuatro casos posibles, y solo uno rompe la promesa.'], [18.0, 26.4, 'Que llueva y no lleve paraguas. Si no llueve, lleve o no lleve paraguas, la promesa sigue en pie.']] },
    { id: 'camila', name: 'EL EQUIVALENTE DE CAMILA', dur: 30,
      caps: [[0.8, 9.4, '«Si Camila estudia, aprueba»', 'cuál frase dice lo mismo'], [10.0, 19.4, 'Si no aprueba', 'es que no estudió'], [20.0, 29.4, 'Contrarrecíproco: ¬q → ¬p', 'es el único equivalente']],
      narr: [[0.8, 9.4, 'Otro problema: hay que hallar la frase que dice lo mismo que si Camila estudia, entonces aprueba el curso.'], [10.0, 19.4, 'Si Camila no aprobó, no pudo haber estudiado: si hubiera estudiado, habría aprobado.'], [20.0, 29.4, 'Si no aprueba, entonces no estudió. Es el contrarrecíproco: se niegan las dos partes y se invierten.']] },
    { id: 'reciproco', name: 'EL RECÍPROCO ENGAÑA', dur: 28,
      caps: [[0.8, 8.4, '«Si es de Medellín, es antioqueño»', 'Medellín queda dentro de Antioquia'], [9.0, 17.4, 'Recíproco: si es antioqueño...', 'puede ser de Envigado: no equivale'], [18.0, 26.4, 'Contrario: si no es de Medellín...', 'tampoco equivale']],
      narr: [[0.8, 8.4, 'Si una persona es de Medellín, es antioqueña. En un dibujo, Medellín queda dentro de Antioquia.'], [9.0, 17.4, 'El recíproco dice al revés: si es antioqueña, es de Medellín. Falso: puede ser de Envigado.'], [18.0, 26.4, 'El contrario niega las dos partes sin invertir: si no es de Medellín, no es antioqueña. Tampoco equivale.']] },
    { id: 'festivo', name: 'EL BANCO EN FESTIVO', dur: 30,
      caps: [[0.8, 9.4, 'Si hoy es festivo, el banco no abre', 'y hoy el banco abrió'], [10.0, 19.4, 'Si fuera festivo, no habría abierto', 'pero abrió'], [20.0, 29.4, 'Hoy no es festivo', 'pasa lo contrario de q: no pasó p']],
      narr: [[0.8, 9.4, 'Otro problema: se sabe que si hoy es festivo, el banco no abre. Y hoy el banco abrió.'], [10.0, 19.4, 'Si hoy fuera festivo, el banco no habría abierto. Pero abrió.'], [20.0, 29.4, 'Así que hoy no es festivo. Cuando lo prometido no pasa, la condición tampoco pasó.']] },
    { id: 'nosabe', name: 'LO QUE NO SE CONCLUYE', dur: 28,
      caps: [[0.8, 8.4, 'Si hoy el banco no abrió', 'no se sabe si es festivo'], [9.0, 17.4, 'Pudo cerrar por otra razón', 'un domingo, un daño'], [18.0, 26.4, 'Pasa q: no se sabe p', 'no pasa p: no se sabe q']],
      narr: [[0.8, 8.4, 'Al revés, si hoy el banco no abrió, no se puede concluir que sea festivo.'], [9.0, 17.4, 'El banco pudo cerrar por otra razón: un domingo, un daño en la puerta.'], [18.0, 26.4, 'Que pase lo prometido no prueba la condición. Y que no pase la condición no dice nada de lo prometido.']] },
    { id: 'oequiv', name: 'EL «O» ES UN CONDICIONAL', dur: 28,
      caps: [[0.8, 8.4, '«Estudio o repruebo el curso»', 'al menos una de las dos pasa'], [9.0, 17.4, 'Si no estudio...', 'la otra tiene que pasar: repruebo'], [18.0, 26.4, 'p ∨ q equivale a ¬p → q', 'y p → q equivale a ¬p ∨ q']],
      narr: [[0.8, 8.4, 'Un o también es un condicional disfrazado. Estudio o repruebo el curso: al menos una de las dos pasa.'], [9.0, 17.4, 'Si no estudio, la otra parte tiene que cumplirse: repruebo. Si no estudio, entonces repruebo.'], [18.0, 26.4, 'P o q equivale a si no p, entonces q. Y al revés, si p entonces q es lo mismo que no p o q.']] },
    { id: 'negar', name: 'NEGAR UN CONDICIONAL', dur: 28,
      caps: [[0.8, 8.4, '«Si llueve, no voy al parque»', 'cuándo es falsa'], [9.0, 17.4, 'Solo cuando llueve', 'y aun así voy al parque'], [18.0, 26.4, '¬(p → q) = p ∧ ¬q', 'la negación no lleva «si»']],
      narr: [[0.8, 8.4, 'Para negar un condicional, como si llueve, no voy al parque, se busca el único caso en que falla.'], [9.0, 17.4, 'Falla cuando llueve y, aun así, voy al parque.'], [18.0, 26.4, 'Su negación es llueve y voy al parque. La negación de un condicional no es otro condicional: es un y.']] },
    { id: 'resolver', name: 'LAS TARJETAS, RESUELTAS', dur: 30,
      caps: [[0.8, 9.4, 'La A: si atrás hay un impar, falla', 'hay que voltearla'], [10.0, 19.4, 'La K y el 4 no pueden romperla', 'la regla no dice nada de ellas'], [20.0, 29.4, 'El 7: si atrás hay una vocal, falla', 'contrarrecíproco: impar → consonante']],
      narr: [[0.8, 9.4, 'Volvamos al reto. La regla solo falla con una vocal y un impar. La A es vocal: si atrás hay un impar, falla. Se voltea.'], [10.0, 19.4, 'La K no es vocal: la regla no dice nada. El cuatro es par: detrás puede haber cualquier letra, pensar lo contrario es el recíproco.'], [20.0, 29.4, 'El siete es impar: si detrás hay una vocal, la regla falla. Se voltea. Son la A y el siete.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'Hay que voltear la A y el 7', 'la opción A']],
      narr: [[0.8, 10.4, 'La respuesta era la A: la A y el siete. Son las únicas que pueden romper la regla.'], [11.0, 20.4, 'El condicional solo falla con la condición y sin lo prometido; equivale a su contrarrecíproco, no al recíproco.'], [21.0, 29.4, 'Un si solo se rompe de una manera.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 10', TITLE = 'EL CONDICIONAL', LINE = 'Un «si» solo se rompe de una manera.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-lo-3', KEYS: ['Camila', 'festivo', 'paraguas', 'tarjeta'] };
})();
if (typeof module !== 'undefined') module.exports = D;
