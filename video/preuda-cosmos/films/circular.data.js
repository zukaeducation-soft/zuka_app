// «Orden circular» · Preuniversitario, razonamiento lógico, mundo 3 (Acertijos de orden), lección pu-or-2. Datos puros.
// Reto: tres parejas de esposos alrededor de una mesa redonda, cada esposo frente a su pareja (a la izquierda de Santiago
// está Natalia; sale lo mismo con cualquier convención de izquierda y derecha). En medio: fijar a uno, la mesa se cierra,
// frente a frente, izquierda y derecha mirando al centro, cuatro amigos y la mesa cuadrada de los instrumentos (Tomás).
const D = (() => {
  const SCENES = [
    { id: 'reto', name: 'TRES PAREJAS', dur: 30,
      caps: [[1.0, 9.4, 'Una mesa redonda de seis', 'cada esposo frente a su pareja'], [10.0, 19.4, 'Dos pistas más', 'Tatiana junto a Ricardo; Natalia a la derecha de Jaime'], [20.0, 29.4, 'A la izquierda de Santiago', 'quién está ahí: al final lo resolvemos']],
      narr: [[1.0, 9.4, 'Un problema para empezar. Tres parejas de esposos juegan cartas en una mesa redonda, y cada esposo queda frente a su pareja.'], [10.0, 19.4, 'Las parejas son Jaime y Karen, Santiago y Tatiana, Ricardo y Natalia. Tatiana está junto a Ricardo. Y Natalia está justo a la derecha de Jaime.'], [20.0, 29.4, 'Hay que decir quién está a la izquierda de Santiago. En una mesa redonda las reglas cambian un poco. Al final lo resolvemos.']] },
    { id: 'fija', name: 'FIJAR A UNO', dur: 28,
      caps: [[0.8, 8.4, 'Si todos giran un puesto', 'nadie cambia de vecinos'], [9.0, 17.4, 'Las posiciones exactas no importan', 'importa quién está junto a quién'], [18.0, 26.4, 'Se fija a una persona', 'y las demás se ubican respecto a ella']],
      narr: [[0.8, 8.4, 'En una mesa redonda, si todos se corren un puesto, cada uno sigue con los mismos vecinos: la mesa es la misma.'], [9.0, 17.4, 'Por eso no hay silla uno: no importan los lugares exactos, sino quién queda junto a quién y quién queda enfrente.'], [18.0, 26.4, 'El primer paso es fijar a una persona en cualquier puesto y ubicar a las demás respecto a ella.']] },
    { id: 'vecinos', name: 'LA MESA SE CIERRA', dur: 28,
      caps: [[0.8, 8.4, 'En una fila, los extremos', 'tienen un solo vecino'], [9.0, 17.4, 'En una mesa, todos tienen dos', 'el primero y el último quedan juntos'], [18.0, 26.4, 'No hay extremos', 'cada pista de «junto a» tiene dos lados']],
      narr: [[0.8, 8.4, 'En una fila, quien está en un extremo tiene un solo vecino.'], [9.0, 17.4, 'Si la fila se dobla hasta cerrarse en una mesa, el primero y el último quedan juntos: todos tienen dos vecinos.'], [18.0, 26.4, 'En la mesa no hay extremos. Cada pista de junto a deja dos posibilidades: un lado o el otro.']] },
    { id: 'frente', name: 'FRENTE A FRENTE', dur: 28,
      caps: [[0.8, 8.4, 'Mesa de seis', 'enfrente: tres puestos más allá'], [9.0, 17.4, 'Mesa de cuatro', 'enfrente: dos puestos más allá'], [18.0, 26.4, 'Los opuestos van por parejas', 'si sabes uno, sabes el otro']],
      narr: [[0.8, 8.4, 'En una mesa de seis, frente a una persona está la que queda tres puestos más allá, por cualquiera de los dos lados.'], [9.0, 17.4, 'En una mesa de cuatro, como una mesa cuadrada con uno por lado, enfrente está la que queda a dos puestos.'], [18.0, 26.4, 'Los opuestos se ubican por parejas: si una persona queda fija, su pareja de enfrente también.']] },
    { id: 'derecha', name: 'IZQUIERDA Y DERECHA', dur: 30,
      caps: [[0.8, 9.4, 'Todos miran al centro', 'la derecha depende de dónde se sienta'], [10.0, 19.4, 'Desde arriba, la derecha', 'va contra las agujas del reloj'], [20.0, 29.4, 'Abajo y arriba se invierten', 'por eso se gira con la persona']],
      narr: [[0.8, 9.4, 'En una mesa todos miran hacia el centro. La derecha de cada uno depende de dónde está sentado.'], [10.0, 19.4, 'Vista la mesa desde arriba, la derecha de quien mira al centro queda en el sentido contrario a las agujas del reloj.'], [20.0, 29.4, 'Quien está abajo tiene su derecha hacia el lado derecho de la pantalla; quien está arriba, hacia el izquierdo. Hay que girar con la persona.']] },
    { id: 'amigos', name: 'CUATRO AMIGOS', dur: 28,
      caps: [[0.8, 8.4, 'Ana frente a Beto', 'se fija a Ana; Beto queda enfrente'], [9.0, 17.4, 'Ciro junto a Ana', 'cualquiera de los dos lados'], [18.0, 26.4, 'Dora, en el puesto que queda', 'frente a Ciro']],
      narr: [[0.8, 8.4, 'Cuatro amigos en una mesa. Ana está frente a Beto: se fija a Ana y Beto queda enfrente.'], [9.0, 17.4, 'Ciro está junto a Ana. Da igual el lado: con la mesa fija, los dos lados son simétricos.'], [18.0, 26.4, 'Dora ocupa el único puesto libre, y queda frente a Ciro. Eso es seguro, sin importar el lado que se eligió.']] },
    { id: 'cuadrada', name: 'LA MESA DE LOS INSTRUMENTOS', dur: 30,
      caps: [[0.8, 9.4, 'Cuatro músicos, una mesa cuadrada', 'Sara y Nicolás están juntos'], [10.0, 19.4, 'Tomás y Valeria no quedan enfrente', 'si así fuera, Sara y Nicolás quedarían opuestos'], [20.0, 29.4, 'La guitarra es de Tomás', 'Valeria tiene a Tomás y al pianista al lado']],
      narr: [[0.8, 9.4, 'Otro problema: Sara, Tomás, Valeria y Nicolás, en una mesa cuadrada, cada uno con un instrumento. Hay que saber quién toca la guitarra.'], [10.0, 19.4, 'Sara y Nicolás están juntos, así que frente a Tomás está Sara o Nicolás, y ese toca el piano. Valeria queda enfrente del otro.'], [20.0, 29.4, 'Los vecinos de Valeria son Tomás y el pianista. Quien toca la guitarra está junto a Valeria y no es el pianista: es Tomás.']] },
    { id: 'pasos', name: 'EL MÉTODO', dur: 28,
      caps: [[0.8, 8.4, '1. Fijar a quien más se nombra', 'su puesto no importa'], [9.0, 17.4, '2. Poner los opuestos', 'parejas frente a frente'], [18.0, 26.4, '3. Usar «junto a» y los lados', 'izquierda y derecha mirando al centro']],
      narr: [[0.8, 8.4, 'Primero, fijar a la persona que aparece en más pistas. Su puesto da igual.'], [9.0, 17.4, 'Segundo, ubicar a quienes están frente a frente: cada uno arrastra a su pareja.'], [18.0, 26.4, 'Tercero, usar las pistas de junto a y los lados, siempre con la derecha de quien mira al centro.']] },
    { id: 'resolver', name: 'LAS PAREJAS, RESUELTAS', dur: 30,
      caps: [[0.8, 9.4, 'Jaime fijo; Karen enfrente', 'Natalia a su derecha, Ricardo frente a ella'], [10.0, 19.4, 'Tatiana junto a Ricardo', 'Santiago enfrente de Tatiana'], [20.0, 29.4, 'A la izquierda de Santiago: Natalia', 'y con la convención contraria, también']],
      narr: [[0.8, 9.4, 'Volvamos al reto. Se fija a Jaime y Karen queda enfrente. Natalia va a la derecha de Jaime y su esposo Ricardo, frente a ella.'], [10.0, 19.4, 'Quedan dos puestos opuestos para Santiago y Tatiana. Tatiana va junto a Ricardo y Santiago enfrente.'], [20.0, 29.4, 'A la izquierda de Santiago está Natalia. Si se usara la convención contraria, todo se refleja y la respuesta no cambia.']] },
    { id: 'cierre', name: 'CIERRE', dur: 30,
      caps: [[0.8, 10.4, 'A la izquierda de Santiago, Natalia', 'la opción B']],
      narr: [[0.8, 10.4, 'La respuesta era la B: Natalia. Fijar a uno, poner los opuestos y luego los vecinos.'], [11.0, 20.4, 'En la mesa no hay extremos, enfrente está la mitad de la vuelta y la derecha se mira desde la silla.'], [21.0, 29.4, 'En la mesa no hay primero: se fija a uno.']] },
  ];
  const WORLD = 'RAZONAMIENTO LÓGICO · MUNDO 3', TITLE = 'ORDEN CIRCULAR', LINE = 'En la mesa no hay primero: se fija a uno.';
  let t = 0; const SC = [], NARR = [];
  for (const s of SCENES) {
    SC.push({ id: s.id, name: s.name, t0: t, t1: t + s.dur });
    for (const n of s.narr) NARR.push([+(t + n[0]).toFixed(2), +(t + n[1]).toFixed(2), n[2]]);
    t += s.dur;
  }
  return { DUR: t, SCENES, SC, NARR, WORLD, TITLE, LINE, LESSON: 'pu-or-2', KEYS: ['Natalia', 'Tatiana', 'Santiago', 'Valeria'] };
})();
if (typeof module !== 'undefined') module.exports = D;
