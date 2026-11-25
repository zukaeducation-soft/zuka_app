// Preicfes · Sociales y Ciudadanas, mundo 9 «Economía y Globalización» (Explora, escenas «dibujo» y «hoja»).
{
  // Oferta y demanda: o y d corren las curvas; e enciende el equilibrio.
  const curvas = (v, K) => { const x0 = 70, x1 = 270, X = (x0 + x1) / 2 + (v.o + v.d) / 2, Y = 96 + (v.o - v.d) / 2; return K.l(60, 20, 60, 176, 'lm') + K.l(60, 176, 290, 176, 'lm') + K.t(54, 18, 'precio', 's tm', 'start') + K.t(290, 190, 'cantidad', 's tm', 'end') + K.l(110 + v.o, 156, 230 + v.o, 36, 'la gr') + K.t(234 + v.o, 34, 'oferta', 's ta', 'start') + K.l(110 + v.d, 36, 230 + v.d, 156, 'lg gr') + K.t(234 + v.d, 166, 'demanda', 's tg', 'start') + K.f(v.e, K.l(60, Y, X, Y, 'lm') + K.c(X, Y, 6, 'fF')); };

  xpLec('icf-sc-economia-1', [
    ['Oferta y demanda',
      xpMira('dibujo', 'Empecemos por la idea: el precio sale del cruce entre **oferta** y **demanda**.', { dib: curvas, v: { o: 0, d: 0, e: 0 }, alto: 198 }, [
        ['Si sube el precio, se quiere comprar menos.', {}],
        ['Y se quiere vender más.', {}],
        ['Donde coinciden está el equilibrio.', { e: 1 }],
        ['Si se daña la cosecha, la oferta baja: sube el precio.', { o: -36 }],
        ['Si todos lo buscan, sube la demanda: también sube.', { o: 0, d: 36 }],
      ], 'Menos oferta o más demanda: sube el precio.'),
      xpHaz('hoja', 'Hubo tanta piña que se dañaba en los camiones. Subraya qué pasó con su precio.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Subió'], ['Bajó'], ['Quedó igual']], pista: '¿Aumentó lo que se ofrece o lo que se quiere?' }, 'Más oferta con la misma demanda: baja.')],
    ['Quién manda',
      xpMira('hoja', 'Segunda idea: importa **cuántos venden** y si **se ponen de acuerdo**.', { paras: [['Muchos puestos de jugo'], ['Una sola empresa de luz'], ['Cuatro fábricas pactan el precio'], ['El Estado vigila']] }, [
        ['Con muchos, ninguno manda.', { luz: [0], nota: { 0: 'competencia' } }],
        ['Con uno solo, no hay a dónde ir.', { luz: [1], nota: { 1: 'monopolio' } }],
        ['Este pacto secreto es ilegal.', { luz: [2], nota: { 2: 'cartel' } }],
        ['Por eso hay reglas y multas.', { luz: [3] }],
        ['También hay daños que pagan otros: externalidades.', {}],
      ], 'Competencia, monopolio y cartel.'),
      xpHaz('hoja', 'Pon al margen qué es cada caso.', { modo: 'margen', letras: ['A', 'B', 'C'], rotulos: ['cartel', 'externalidad', 'monopolio'], meta: [2, 0, 1], paras: [['Un solo tren lleva a la isla.'], ['Dos cines acuerdan subir la boleta.'], ['El ruido de un bar no deja dormir al barrio.']], pista: 'Alguna no va ahí: ¿un vendedor, un pacto o un daño?' }, 'Uno solo, un pacto y un daño a terceros.')],
    ['Impuestos',
      xpMira('hoja', 'Tercera idea: pregunta **cuándo se paga** y **a quién le pesa más**.', { paras: [['Renta: según lo que se gana'], ['IVA: al comprar'], ['Cobra más proporción a quien más tiene'], ['Pesa más sobre quien menos tiene']] }, [
        ['Este depende de la persona.', { luz: [0], nota: { 0: 'directo' } }],
        ['Este lo paga cualquiera que compre.', { luz: [1], nota: { 1: 'indirecto' } }],
        ['Así, el que más tiene pone más.', { luz: [2], nota: { 2: 'progresivo' } }],
        ['Así, al que menos tiene le duele más.', { luz: [3], nota: { 3: 'regresivo' } }],
        ['Igual en pesos no es igual en peso.', {}],
      ], 'Directo o indirecto; progresivo o regresivo.'),
      xpHaz('hoja', 'Subraya el cobro **más progresivo**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['50 mil por persona'], ['5 % a todos'], ['2 % al que gana poco y 20 % al que gana mucho']], pista: 'Busca el que cobra mayor proporción al que más gana.' }, 'La proporción aumenta con el ingreso.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Se fija la libra de queso en la mitad de lo que cuesta producirla. Subraya lo más probable.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Escasez y venta a escondidas'], ['Más queso en las tiendas'], ['Mejor queso']], pista: '¿Qué harán los que venden?' }, 'Los vendedores ofrecen menos a ese precio.')],
  ], 'El cruce, cuántos venden y a quién le pesa.');

  xpLec('icf-sc-economia-2', [
    ['Inflación',
      xpMira('hoja', 'Empecemos por la idea: hay **inflación** cuando sube **casi todo**.', { letras: ['1', '2', '3', '4'], paras: [['Canasta de ayer: 200 mil'], ['Canasta de hoy: 216 mil'], ['Sueldo: sigue en un millón'], ['Alcanza para menos']] }, [
        ['La misma canasta, un año después.', { luz: [0, 1] }],
        ['Subió ocho de cada cien.', { luz: [1], nota: { 1: '+8 %' } }, '$16 \\div 200 = 0.08$'],
        ['El recibo dice lo mismo.', { luz: [2], nota: { 2: 'nominal' } }],
        ['Pero ahora compra menos cosas.', { luz: [3], nota: { 3: 'real' } }],
        ['Para quedar igual, debía subir 8 %.', {}],
      ], 'Nominal es en pesos; real, en compras.'),
      xpHaz('hoja', 'El sueldo subió 6 % y los precios 9 %. Subraya lo que pasó con el salario **real**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Subió'], ['Bajó'], ['Quedó igual']], pista: '¿Qué subió más rápido?' }, 'Los precios corrieron más que el sueldo.')],
    ['Quién es desempleado',
      xpMira('hoja', 'Segunda idea: cuenta como **desempleado** quien **busca y no encuentra**.', { paras: [['Busca y no encuentra'], ['Trabaja sin contrato'], ['No trabaja ni busca'], ['Tasa = desempleados ÷ fuerza laboral']] }, [
        ['Este sí cuenta: es desempleado.', { luz: [0], nota: { 0: 'desempleado' } }],
        ['Este trabaja, pero es informal.', { luz: [1], nota: { 1: 'ocupado' } }],
        ['Este no entra en la cuenta.', { luz: [2], tacha: [2] }],
        ['La fuerza laboral son los dos primeros.', { luz: [0, 1, 3] }],
        ['Si muchos dejan de buscar, la tasa baja sin empleos.', {}],
      ], 'Buscar y no encontrar.'),
      xpHaz('hoja', 'En un pueblo, 90 trabajan, 10 buscan y 50 no buscan. Subraya la tasa de desempleo.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['40 %'], ['10 %'], ['60 %']], pista: 'Los que no buscan no entran.' }, '$10 \\div 100 = 10$ %.')],
    ['Pobreza y reparto',
      xpMira('hoja', 'Tercera idea: **cuánto falta** y **cómo se reparte** son preguntas distintas.', { paras: [['¿Alcanza la canasta?'], ['¿Hay agua, escuela y salud?'], ['¿Cómo se reparte?'], ['Promedio: 10. Uno tiene 91 y nueve tienen 1']] }, [
        ['Esta mira solo el ingreso.', { luz: [0], nota: { 0: 'pobreza monetaria' } }],
        ['Mira las condiciones de vida.', { luz: [1], nota: { 1: 'multidimensional' } }],
        ['Y esta mira las diferencias.', { luz: [2], nota: { 2: 'desigualdad' } }],
        ['El promedio esconde el reparto.', { luz: [3] }, '$(91 + 9) \\div 10 = 10$'],
        ['El Gini va de 0, todos igual, a 1.', { luz: [2] }],
      ], 'Lo que falta y cómo se reparte.'),
      xpHaz('hoja', 'El Gini de A es 0.28 y el de B, 0.55. Subraya el país más **desigual**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['A'], ['B'], ['No se puede saber']], pista: 'Más cerca de 1, más desigual.' }, '0.55 está más lejos del reparto igual.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'El banco central baja la tasa de interés. Subraya el efecto más probable.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [2], paras: [['Se gasta menos'], ['Los préstamos son más caros'], ['Se gasta más y los precios pueden subir']], pista: 'Piensa en los préstamos.' }, 'Créditos baratos: más gasto y más presión en los precios.')],
  ], 'Lo que alcanza, quién busca y cómo se reparte.');

  xpLec('icf-sc-economia-3', [
    ['Una red',
      xpMira('hoja', 'Empecemos por la idea: un objeto puede ser hecho por **muchos países**.', { paras: [['Metal de Chile'], ['Pantalla de Corea'], ['Programas de Irlanda'], ['Armado en México'], ['Vendido en Pasto']] }, [
        ['Un celular empieza en una mina.', { luz: [0] }],
        ['La pantalla llega de otro continente.', { luz: [1] }],
        ['Los programas viajan por internet.', { luz: [2] }],
        ['Lo arman en otro lugar.', { luz: [3] }],
        ['Y lo compra alguien en Nariño.', { luz: [4] }],
      ], 'Comercio, dinero, información y personas.'),
      xpHaz('hoja', 'Subraya lo que **más** aceleró esa red.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['Transporte e internet más baratos'], ['Que nació el comercio'], ['Que hay menos países']], pista: 'El comercio es muy antiguo.' }, 'La velocidad es lo nuevo.')],
    ['Abrir la puerta',
      xpMira('hoja', 'Segunda idea: al bajar los **aranceles**, unos ganan y otros arriesgan.', { paras: [['Arancel: se cobra al entrar'], ['Vende afuera'], ['Compra más barato'], ['Compite con gigantes']] }, [
        ['Sin él, lo de afuera entra más barato.', { luz: [0] }],
        ['El exportador encuentra clientes.', { luz: [1], nota: { 1: 'gana' } }],
        ['El comprador ahorra un poco.', { luz: [2], nota: { 2: 'gana' } }],
        ['El pequeño productor puede quebrar.', { luz: [3], nota: { 3: 'arriesga' } }],
        ['La pregunta es quién lo prepara y lo apoya.', {}],
      ], 'La puerta se abre en los dos sentidos.'),
      xpHaz('hoja', 'Entran zapatos muy baratos sin arancel. Pon al margen quién gana y quién arriesga.', { modo: 'margen', letras: ['A', 'B'], rotulos: ['arriesga', 'gana'], meta: [1, 0], paras: [['Quien compra zapatos'], ['El taller que los hace en el barrio']], pista: 'Alguna no va ahí: ¿le baja el precio o le llega competencia?' }, 'El comprador ahorra; el taller compite.')],
    ['También viajan',
      xpMira('hoja', 'Tercera idea: viajan **costumbres**, **reglas** y **problemas**.', { paras: [['Música y comidas'], ['Empresas en muchos países'], ['Crisis y virus'], ['ONU, FMI, OMC']] }, [
        ['Se mezclan: a eso le dicen glocal.', { luz: [0] }],
        ['Buscan mercado y costos bajos.', { luz: [1] }],
        ['Lo de allá golpea acá.', { luz: [2] }],
        ['Estos intentan coordinar respuestas.', { luz: [3] }],
        ['Y no todos los países pesan igual allí.', { luz: [3] }],
      ], 'Lo bueno y lo malo cruzan fronteras.'),
      xpHaz('hoja', 'Subraya el ejemplo de lo **glocal**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Un carro importado'], ['Rap en lengua nasa'], ['Un arancel']], pista: 'Busca algo mundial mezclado con algo local.' }, 'Un género mundial en una lengua local.')],
    ['Ahora sí, un problema',
      xpHaz('hoja', 'Un país baja sus reglas ambientales para atraer fábricas. Subraya el mejor argumento en **contra**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El daño lo pagan sus habitantes'], ['Llegan empleos'], ['Las fábricas son grandes']], pista: 'Piensa quién asume el costo.' }, 'Es una externalidad: otros pagan el daño.')],
  ], 'Red, puertas y cosas que cruzan.');
}
