// Preicfes · Ciencias Naturales · mundo 5 «Ecosistemas y Energía» (spec 2026-11-25-preicfes-estructura). Casos y datos escritos para Zuka.
PI_MUNDOS.push((() => {
  const { leccion, mundo, x, F, T, P, S, sol, err, opc, guion } = ICF;

  const LAGUNA = {
    id: 'icf-laguna', title: 'Quién se come a quién en la laguna',
    ficha: { autor: 'Grupo ecológico escolar', fuente: 'Guía de campo', fecha: 'Febrero de 2026' },
    paras: [
      'En la laguna de Chircal, las algas y las plantas fabrican su alimento con la luz del sol: son productores. Los caracoles y los renacuajos comen algas: son consumidores primarios. Las mojarras se comen a los renacuajos: son consumidoras secundarias. La garza, que se come a las mojarras, es consumidora terciaria.',
      'La flecha de una cadena trófica va de quien es comido hacia quien come, porque muestra hacia dónde pasa la energía: alga → renacuajo → mojarra → garza. Varias cadenas que se cruzan forman una red. La garza también come caracoles; en esa cadena es consumidora secundaria.',
      'Los hongos y las bacterias descomponen hojas, heces y animales muertos. No están al final de la fila: reciben materia de todos los niveles y devuelven al agua nutrientes que las algas vuelven a usar. La materia da vueltas; la energía, no.',
      'El grupo calculó la energía de cada nivel por metro cuadrado al año: algas, 8 000 kilocalorías; consumidores primarios, 800; mojarras, 80; garzas, 8. De un nivel al siguiente pasa, más o menos, la décima parte. El resto se gasta en respirar, moverse y mantenerse vivos, y sale en forma de calor, o queda en partes que nadie se come.',
      'Por eso hay muchas algas y pocas garzas, y por eso las cadenas casi nunca tienen más de cinco eslabones: no queda energía para uno más. También por eso alimentar a una población con granos exige menos terreno que alimentarla con carne de animales que comieron granos.',
      'Un verano alguien soltó truchas que se comieron casi todos los renacuajos. Las algas, casi sin quien las comiera, cubrieron la laguna de verde. De noche, al respirar y descomponerse, gastaron el oxígeno, y en la mañana aparecieron mojarras muertas. Cambiar un solo eslabón movió toda la red.',
    ],
  };
  const l1 = leccion('icf-cn-ecosistemas-1', 'Cadenas y pirámides tróficas', guion(
    ['Niveles', 'Productores, consumidores primarios, secundarios, terciarios; y descomponedores.'],
    ['La flecha', 'Va hacia quien come: por ahí pasa la energía.'],
    ['La décima parte', 'De un nivel al siguiente pasa cerca del 10 %; el resto sale como calor o no se come.'],
    ['Una red', 'Cambiar un eslabón mueve a los demás.']), [
    x('pista-tipo', 'Ata cada nivel a su organismo en la cadena alga → renacuajo → mojarra → garza.', { doc: LAGUNA, lineas: ['alga', 'renacuajo', 'mojarra', 'garza'],
      ...T(['productor', 0, '¿Cuál fabrica su alimento con luz?'], ['consumidor primario', 1, '¿Cuál come productores?'], ['consumidor secundario', 2, '¿Cuál come al que come algas?'], ['consumidor terciario', 3, '¿Cuál está al final de esta cadena?']), bien: 'De la luz a la garza.' },
      'El alga produce, el renacuajo come algas, la mojarra lo come y la garza cierra la cadena.', 'Sigue la flecha desde el organismo que usa la luz.'),
    x('genero-o-cita', '¿Es la **materia** o la **energía** de la laguna?', { doc: LAGUNA, rot: ['la materia', 'la energía'],
      ...F(['Da vueltas y se vuelve a usar', 0, '¿Cuál reciclan los hongos?'], ['Entra con la luz y sale como calor', 1, '¿Cuál se va y no regresa?'], ['Los nutrientes que las algas toman otra vez', 0, '¿Son sustancias o algo que se pierde en calor?'], ['Pasa a otro nivel cerca de la décima parte', 1, '¿Qué midieron en kilocalorías?']), bien: 'Una circula, la otra pasa.' },
      'Los nutrientes circulan; la energía entra con la luz, pasa en parte y sale como calor.', 'Relee el final del párrafo 3 y piensa en el calor.'),
    x('mayor-tramo', 'La gráfica cuenta garzas en cuatro años. Toca el tramo en que más crecieron **en porcentaje**.', { v: [10, 16, 24, 33] },
      'De 10 a 16 crece 60 %; de 16 a 24, 50 %; de 24 a 33, 37.5 %. El último suma más garzas, no más porcentaje.', 'Divide lo que creció cada tramo entre el valor con que empezó.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: LAGUNA, nums: [2, 3, 4], pregunta: 'Queda en pie', queda: 'La garza puede ocupar dos niveles distintos.',
      ...T(['La flecha va hacia quien es comido.', 0, 'Busca hacia dónde apunta la flecha.'], ['Los hongos solo reciben materia de las garzas.', [3, 4], 'Busca de qué niveles reciben.'], ['Casi toda la energía pasa al nivel siguiente.', [6, 7, 8], 'Busca qué parte pasa.']), bien: 'Flecha, hongos y décima parte.' },
      'La flecha va hacia quien come, los hongos reciben de todos y pasa cerca de la décima parte.', 'Saca la palabra clave: flecha, hongos, energía.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo que muestra el texto.', { doc: LAGUNA, filas: [{ antes: 'Sin renacuajos, las algas', topes: ['disminuyeron', 'aumentaron', 'no cambiaron'], va: 1 }, { antes: 'De algas a primarios pasó', topes: ['la mitad', 'todo', 'la décima parte'], va: 2 }, { antes: 'Las mojarras murieron por falta de', topes: ['oxígeno', 'agua', 'luz'], va: 0 }], mira: ['Relee qué pasó sin quien las comiera.', 'Compara 8 000 con 800.', 'Relee lo que ocurrió de noche.'], luz: [[6, 'cubrieron la laguna de verde'], [4, 'la décima parte'], [6, 'gastaron el oxígeno']], bien: 'Más algas, un décimo y sin oxígeno.' },
      'Las algas aumentaron, pasó la décima parte y faltó oxígeno.', 'Busca el dato de cada perilla antes de moverla.'),
    x('lee-escala', 'La gráfica muestra la masa de tres niveles de otra laguna (en kg). Pon cada una y cuánto **más** pesan los productores que los primarios.', { vals: [180, 45, 15], rot: ['productores', 'primarios', 'secundarios'], hi: 200, st: 40, et: ['productores', 'primarios', 'secundarios', 'más'], ops: ['', '', ''], metas: ['180', '45', '15', '135'], fichas: ['180', '45', '15', '135', '165', '20', '225'],
      mira: ['Está a mitad de camino entre 160 y 200.', 'Está un poco por encima de 40.', 'Está por debajo de la mitad del primer tramo.', 'Resta los primarios a los productores.'], trampas: { '0:165': 'Cada línea vale 40: la mitad son 20.', '2:20': 'Eso sería justo la mitad del primer tramo.', '3:225': 'Eso es la suma.' }, ok: 'Abajo hay mucho más que arriba.' },
      'Las líneas van de 40 en 40: 180, 45 y 15. La diferencia es $180 - 45 = 135$ kg.', 'Mira cuánto vale cada línea antes de leer.'),
    sol('En un pastizal, los productores tienen 50 000 kcal. Si a cada nivel pasa la décima parte, ¿cuánto llega al consumidor terciario?', ['Al primario llegan [[5 000]] kcal', 'Al secundario, [[500]] kcal', 'Al terciario, [[50]] kcal'], ['10 000', '5', '25 000'], 'Se toma la décima parte tres veces.', 'Cuenta los niveles: son tres pasos.'),
    err('Alguien explica por qué hay pocas águilas en un bosque.', ['El águila está en el último nivel', 'A cada nivel pasa parte de la energía', 'El águila recibe toda la energía de las plantas'], 2, ['Al águila le llega muy poca de la energía de las plantas', 'El águila fabrica su energía con la luz', 'El águila devuelve la energía a las plantas'], 'En cada nivel se pierde casi todo: al último llega muy poca.', '¿Qué parte pasa en cada nivel?'),
    opc('Un insecticida que no se degrada se acumula en los organismos. La mayor concentración se espera en:', ['Las algas', 'Los renacuajos', 'Las garzas, que comen muchos organismos contaminados', 'El agua'], 2, 'Cada nivel come muchos del anterior y guarda lo que no se degrada: arriba se concentra.', 'Piensa cuántas mojarras come una garza y cuántos renacuajos comió cada mojarra.'),
  ]);

  const CICLO = {
    id: 'icf-compost', title: 'El cuaderno del compost',
    ficha: { autor: 'Huerta escolar', fuente: 'Cuaderno de observación', fecha: 'Marzo de 2026' },
    paras: [
      'Los átomos de la Tierra son casi siempre los mismos: lo que cambia es dónde están y con quién se juntan. El carbono que hoy está en una hoja estuvo ayer en el aire. A ese ir y venir entre los seres vivos, el aire, el agua y el suelo se le llama ciclo.',
      'En el ciclo del carbono, las plantas toman dióxido de carbono del aire y, con agua y luz, fabrican azúcares y liberan oxígeno: es la fotosíntesis. Plantas, animales, hongos y bacterias usan esos azúcares y devuelven dióxido de carbono al aire: es la respiración. Quemar leña, carbón o gasolina también lo devuelve, pero mucho más rápido, y desde depósitos que tardaron millones de años en formarse.',
      'El nitrógeno es casi cuatro quintas partes del aire y, sin embargo, las plantas no pueden usarlo así. Necesitan que ciertas bacterias, muchas de ellas en las raíces del fríjol y otras leguminosas, lo conviertan en formas que se disuelven en el suelo. Otras bacterias hacen lo contrario y lo regresan al aire.',
      'La huerta hizo una prueba. En la cama A sembró maíz; en la B, maíz con fríjol; en la C, maíz con abono químico. Las tres recibieron la misma agua y la misma luz. A los tres meses, las matas medían en promedio 140, 168 y 175 centímetros. En el agua que escurrió de C había nueve veces los nitratos de A; en la de B, casi los mismos de A.',
      'Ese exceso llega a la quebrada y alimenta las algas, que crecen sin control; al morir, las bacterias que las descomponen consumen el oxígeno. La cama B creció casi lo mismo que C sin ese problema: el nitrógeno del fríjol se va soltando despacio.',
      'Con los restos de la cosecha hicieron compost. Los descomponedores calentaron la pila hasta 58 °C: era su respiración. La masa bajó de 40 a 22 kilogramos. No se destruyó: casi todo lo que falta se fue al aire como dióxido de carbono y vapor de agua.',
    ],
  };
  const l2 = leccion('icf-cn-ecosistemas-2', 'Ciclos de la materia', guion(
    ['La materia circula', 'Los mismos átomos pasan por aire, agua, suelo y seres vivos.'],
    ['Carbono', 'La fotosíntesis lo toma del aire; la respiración y la quema lo devuelven.'],
    ['Nitrógeno', 'Las bacterias lo vuelven útil para las plantas.'],
    ['Exceso', 'Demasiados nutrientes en el agua acaban con el oxígeno.']), [
    x('genero-o-cita', '¿**Toma** dióxido de carbono del aire o lo **devuelve**?', { doc: CICLO, rot: ['lo toma', 'lo devuelve'],
      ...F(['La fotosíntesis del maíz', 0, '¿Qué usa la planta para hacer azúcar?'], ['La respiración de un hongo', 1, '¿Qué sale al usar azúcares?'], ['Quemar gasolina', 1, '¿Qué sale por el exhosto?'], ['La pila de compost caliente', 1, '¿Qué están haciendo los descomponedores?']), bien: 'Una lo guarda, las otras lo sueltan.' },
      'Solo la fotosíntesis lo toma; respirar, quemar y descomponer lo devuelven.', 'Pregunta si se fabrica azúcar o si se gasta.'),
    x('pasos-del-proceso', 'Ordena cómo un exceso de abono deja sin oxígeno una quebrada. El primer paso está en su puesto.', { doc: CICLO, que: 'la cadena', de: 'Del abono a la quebrada', fija: 1, ini: [0, 3, 1, 4, 2], tiras: ['Sobran nitratos en el suelo.', 'El agua los lleva a la quebrada.', 'Las algas crecen sin control.', 'Mueren y las bacterias las descomponen.', 'Se agota el oxígeno.'], mira: ['', 'Llegan con el agua que escurre.', 'Crecen cuando ya tienen nutrientes.', 'Se descomponen después de morir.', 'Es el resultado final.'], bien: 'Sobra, escurre, crece, muere y falta.' },
      'Los nitratos escurren, las algas crecen, mueren, se descomponen y se agota el oxígeno.', 'Sigue el párrafo 5 de la primera palabra a la última.'),
    x('voz-de-la-fuente', 'Ata cada papel a lo que le corresponde en la prueba.', { ayuda: 'Tira un hilo desde cada papel hasta lo que le corresponde.', doc: CICLO, portadas: [['Cama A', 'experimento'], ['Qué se siembra o abona', 'experimento'], ['Altura de las matas', 'experimento'], ['Agua y luz', 'experimento']],
      ...T(['el control', 0, '¿Con cuál se comparan las otras?'], ['lo que se cambió', 1, '¿Qué es distinto entre las camas?'], ['lo que se midió', 2, '¿Qué se anotó a los tres meses?'], ['lo que se mantuvo igual', 3, '¿Qué recibieron las tres por igual?']), bien: 'Control, cambio, medida e igualdad.' },
      'A es el control, se cambió lo sembrado o abonado, se midió la altura y agua y luz fueron iguales.', 'Relee el párrafo que cuenta la prueba de las camas.'),
    x('dice-deduce', 'Lleva cada afirmación a su escalón.', { doc: CICLO, nums: [4, 6], rot: ['lo dice', 'se deduce', 'ni lo dice ni se deduce'],
      ...F(['Las matas de C midieron en promedio 175 cm.', 0, 'Léela junto a los datos.'], ['El fríjol ayudó al maíz a crecer.', 1, 'Compara A con B.'], ['Unos 18 kg de la pila pasaron al aire, sobre todo.', 1, 'Compara la masa de antes y la de después.'], ['El fríjol de B dio más cosecha que el maíz.', 2, '¿Se midió la cosecha?']),
      luz: [[4, '140, 168 y 175'], [6, 'de 40 a 22 kilogramos']], bien: 'Comparar y restar.' },
      'Los 175 están escritos; la ayuda del fríjol y los 18 kg se deducen; la cosecha no se midió.', 'Haz la comparación o la resta con los datos.'),
    x('comprueba-apuesta', 'Subraya en el párrafo 3 la oración que explica **cómo** llega el nitrógeno a las plantas.', { doc: CICLO, nums: [3], apuesta: 'Ciertas bacterias lo vuelven útil.', ...S(['3.1'], { '3.0': 'Dice que está en el aire y que así no sirve.', '3.2': 'Dice cómo vuelve al aire.' }), bien: 'Bacterias en la raíz.' },
      'La segunda oración dice que las bacterias lo convierten en formas que se disuelven.', 'Busca la oración donde algo se convierte en otra cosa útil.'),
    x('mayor-tramo', 'La gráfica muestra la altura (en cm) de una mata de maíz en cuatro semanas. Toca el tramo que más creció **en porcentaje**.', { v: [16, 20, 30, 42] },
      'De 16 a 20 crece 25 %; de 20 a 30, 50 %; de 30 a 42, 40 %. El último crece más centímetros, no más porcentaje.', 'Divide lo que subió cada tramo entre el valor con que empezó.'),
    sol('En la prueba, A midió 140 cm, B 168 y C 175. ¿Cuánto más creció B que A, en porcentaje, y cuánto le faltó para igualar a C?', ['B creció $168 - 140 =$ [[28]] cm más', 'Comparado con los 140 de A es un [[20]] % más', 'Le faltaron [[7]] cm para igualar a C'], ['35', '25', '17'], '28 de 140 son el 20 %; $175 - 168 = 7$.', 'El porcentaje se calcula sobre la altura de A.'),
    err('Alguien explica la pérdida de masa del compost.', ['Los descomponedores respiran', 'Al respirar usan los azúcares', 'La materia que falta se destruyó'], 2, ['La materia que falta se fue, sobre todo, como dióxido de carbono y vapor', 'La materia que falta se volvió energía de la luz', 'La materia que falta se volvió nitrógeno del fríjol'], 'La materia no se destruye: salió al aire.', '¿Puede desaparecer la materia en un ciclo?'),
    opc('Para reducir los nitratos que llegan a la quebrada sin perder mucho crecimiento del maíz, la huerta debería:', ['Doblar el abono químico', 'Sembrar maíz con fríjol', 'Quitar toda el agua', 'Sembrar solo maíz'], 1, 'B creció casi lo mismo que C sin el exceso de nitratos.', 'Compara las alturas y lo que escurre de cada cama.'),
  ]);

  const ISLA = {
    id: 'icf-parejas', title: 'Vecinos obligados',
    ficha: { autor: 'Reserva natural «El Roble»', fuente: 'Cartilla para visitantes', fecha: 'Abril de 2026' },
    paras: [
      'Ninguna especie vive sola. En un mismo árbol de la reserva se cruzan al menos cinco maneras de convivir, y se distinguen por una pregunta: ¿quién gana, quién pierde y a quién le da igual?',
      'En el mutualismo ganan los dos. El colibrí toma néctar y lleva polen de una flor a otra. Los hongos de las raíces le dan agua y minerales al roble y reciben azúcares. En el comensalismo uno gana y al otro le da igual: una bromelia se apoya en una rama alta para recibir luz sin quitarle nada al árbol.',
      'En el parasitismo uno gana y el otro pierde, casi siempre sin morir de inmediato. El muérdago hunde sus raíces en la rama y le roba savia. En la depredación el que gana mata: el gavilán caza ratones. La competencia es distinta: pierden los dos, porque gastan energía disputando lo mismo, como dos aves que buscan el mismo hueco para anidar.',
      'Los depredadores y sus presas suben y bajan juntos, con un poco de retraso. La reserva contó cada año ratones y gavilanes: 400 y 8; 700 y 10; 500 y 18; 250 y 12. Cuando hay muchos ratones, los gavilanes crían más; cuando hay muchos gavilanes, los ratones disminuyen; y entonces los gavilanes, sin comida, también.',
      'Todo lugar tiene un límite. La capacidad de carga es el número de individuos que un ambiente puede sostener con su comida, su agua y su espacio. Una población que la supera agota los recursos y baja.',
      'Hace cinco años llegó una rana de otro país. No tenía depredadores en la reserva y comía los mismos insectos que las ranas de aquí. Hoy, de cada diez ranas que se oyen de noche, siete son las nuevas. Es una especie invasora: no por ser extranjera, sino por crecer desplazando a las demás. La reserva no propone acabarlas de golpe, porque ya hay culebras que se alimentan de ellas.',
    ],
  };
  const l3 = leccion('icf-cn-ecosistemas-3', 'Relaciones entre especies', guion(
    ['La pregunta', '¿Quién gana, quién pierde y a quién le da igual?'],
    ['Nombres', 'Mutualismo, comensalismo, parasitismo, depredación y competencia.'],
    ['Suben y bajan', 'Presas y depredadores se siguen con retraso.'],
    ['Límite e invasoras', 'La capacidad de carga y las especies que desplazan a otras.']), [
    x('pinta-tipos', 'Pinta cada caso con su relación.', { doc: ISLA, plumas: ['mutualismo', 'comensalismo', 'parasitismo'],
      ...P(['El colibrí lleva polen y toma néctar.', 0, '¿Ganan los dos, a uno le da igual o uno pierde?'], ['El muérdago roba savia.', 2, '¿Ganan los dos, a uno le da igual o uno pierde?'], ['La bromelia se apoya en la rama.', 1, '¿Ganan los dos, a uno le da igual o uno pierde?'], ['El hongo da minerales y recibe azúcares.', 0, '¿Ganan los dos, a uno le da igual o uno pierde?'], ['Una garrapata chupa sangre de un perro.', 2, '¿Ganan los dos, a uno le da igual o uno pierde?']), bien: 'Gana-gana, gana-igual y gana-pierde.' },
      'Colibrí y hongo: ganan los dos; bromelia: al árbol le da igual; muérdago y garrapata: el otro pierde.', 'Di qué le pasa a cada uno de los dos seres vivos.'),
    x('donde-mirar', 'Lleva cada pregunta al párrafo donde la buscarías.', { doc: ISLA,
      ...F(['¿Cuántos gavilanes se contaron?', 3, 'Busca el comienzo que nombra depredadores.'], ['¿Qué es la capacidad de carga?', 4, 'Busca el comienzo que habla de un límite.'], ['¿Cuándo llegó la rana?', 5, 'Busca el comienzo que habla de años.']),
      luz: [[4, '400 y 8'], [5, 'La capacidad de carga'], [6, 'Hace cinco años']], bien: 'Conteo, límite y llegada.' },
      'El conteo está en el 4, el límite en el 5 y la rana en el 6.', 'Lee solo los comienzos de los párrafos y decide.'),
    x('balanza-tesis', 'Afirmación: «la rana nueva desplaza a las de aquí». ¿Qué hace cada dato?', { doc: ISLA, tesis: 'La rana nueva desplaza a las de aquí',
      ...F(['Comen los mismos insectos.', 0, '¿Compiten por algo?'], ['Siete de cada diez que se oyen son nuevas.', 0, '¿Quién domina hoy?'], ['El número de ranas de aquí no ha bajado.', 1, '¿Las desplazó de verdad?'], ['La rana nueva es verde clara.', 2, '¿Cambia quién desplaza?']), bien: 'Comer lo mismo apoya; si no bajan, no.' },
      'Competir y ser mayoría la apoyan; que no bajaran la debilitaría; el color no pesa.', 'Pregunta si el dato muestra que las otras pierden algo.'),
    x('ajusta-alcance', 'Mueve cada perilla hasta que diga lo mismo que el texto.', { doc: ISLA, filas: [{ antes: 'Después de que hubo más ratones, los gavilanes', topes: ['bajaron', 'subieron', 'no cambiaron'], va: 1 }, { antes: 'Una especie es invasora por', topes: ['venir de lejos', 'ser fea', 'crecer desplazando'], va: 2 }, { antes: 'En la competencia', topes: ['pierden los dos', 'ganan los dos', 'gana uno siempre'], va: 0 }], mira: ['Compara 10 con 18.', 'Busca «no por… sino por».', 'Relee el final del párrafo 3.'], luz: [[4, '500 y 18'], [6, 'crecer desplazando'], [3, 'pierden los dos']], bien: 'Suben después, desplazan y pierden.' },
      'Los gavilanes subieron al año siguiente, invade quien desplaza y en la competencia pierden los dos.', 'Busca en el texto el dato de cada perilla.'),
    x('descarta-prueba', 'Estas tres opciones son falsas. Ata cada una a la oración que la desmiente.', { doc: ISLA, nums: [3, 5, 6], pregunta: 'Queda en pie', queda: 'Una población que supera el límite baja.',
      ...T(['El parásito mata siempre de inmediato.', 0, 'Busca qué le pasa al que pierde.'], ['Toda especie extranjera es invasora.', 10, 'Busca por qué es invasora.'], ['La reserva quiere acabar ya las ranas nuevas.', 11, 'Busca qué no propone la reserva.']), bien: 'Casi siempre, sino y no propone.' },
      'El parásito casi nunca mata enseguida, invade quien desplaza y la reserva no las acaba de golpe.', 'Saca la palabra clave: parásito, extranjera, reserva.'),
    x('lee-escala', 'La gráfica muestra los ratones de tres años de otra reserva. Pon cada valor y cuántos **menos** hay en el tercero que en el segundo.', { vals: [350, 600, 200], rot: ['año 1', 'año 2', 'año 3'], hi: 800, st: 200, et: ['año 1', 'año 2', 'año 3', 'menos'], ops: ['', '', ''], metas: ['350', '600', '200', '400'], fichas: ['350', '600', '200', '400', '300', '250', '800'],
      mira: ['Está a tres cuartos del camino entre 200 y 400.', 'Mira en qué línea termina.', 'Mira en qué línea termina.', 'Resta el año 3 al año 2.'], trampas: { '0:300': 'Pasa de la mitad del tramo.', '0:250': 'Eso es un cuarto del tramo.', '3:800': 'Eso es la suma.' }, ok: 'Sube y baja.' },
      'Las líneas van de 200 en 200: 350, 600 y 200. Hay $600 - 200 = 400$ menos.', 'Mira cuánto vale cada línea y qué parte alcanza la barra.'),
    sol('Un potrero puede sostener 4 vacas por hectárea. Tiene 15 hectáreas y hoy hay 72 vacas. ¿Cuántas sobran?', ['La capacidad de carga es $4 \\cdot 15 =$ [[60]] vacas', 'De las 72 que hay, sobran [[12]]', 'Si siguen así, el pasto se [[agota]]'], ['19', '132', 'recupera'], 'La capacidad es 60; sobran 12 y el pasto se agota.', 'Multiplica lo que aguanta una hectárea por las que hay.'),
    err('Alguien clasifica la relación entre una abeja y una flor.', ['La abeja toma néctar', 'La flor recibe polen de otra flor', 'Como la abeja se lleva algo, es parasitismo'], 2, ['Como ganan las dos, es mutualismo', 'Como a la flor le da igual, es comensalismo', 'Como compiten, es competencia'], 'La abeja se alimenta y la flor se poliniza: mutualismo.', '¿La flor pierde o gana?'),
    opc('Si una enfermedad acaba con la mayoría de los ratones, lo más probable a corto plazo es que los gavilanes:', ['Aumenten, porque hay más espacio', 'No cambien, porque comen plantas', 'Se vuelvan productores', 'Disminuyan o busquen otra presa'], 3, 'Sin su alimento, bajan o cambian de presa.', 'Mira qué pasa con los gavilanes cuando hay pocos ratones.'),
  ]);

  const BOSQUE = {
    id: 'icf-lobos', title: 'El regreso de las dantas',
    paras: [
      'La danta es el mamífero terrestre más grande de nuestras selvas. Come hojas y frutos y, al caminar, reparte las semillas en sus heces, a veces a varios kilómetros.',
      'En un bosque donde desaparecieron por la caza, los árboles de semilla grande dejaron de nacer lejos de sus padres. Los brotes, apiñados, competían por la luz y casi todos morían.',
      'Hace diez años soltaron quince dantas con collar de rastreo. Hoy son treinta y dos. En las parcelas que visitan hay cinco veces más brotes de semilla grande que en las que no.',
      'Las heces también alimentan a escarabajos que entierran el abono y airean el suelo. Los escarabajos son comida de aves y ranas.',
      'El bosque tiene espacio y frutos para unas cuarenta dantas. Los guardias calculan que se llegará a ese número en pocos años y que después la población se mantendrá cerca de él.',
    ],
  };
  const pl = (g, q, p, e, h) => play(g, q, { doc: BOSQUE, ...p }, e, { hint: h });
  return mundo('icf-cn-ecosistemas', 'Ecosistemas y Energía', 'ciencias', [l1, l2, l3], [
    ['icf-cn-ecosistemas-1', 'La danta come hojas y frutos: es consumidora primaria.', pl('donde-buscar', '¿A qué párrafo vuelves para responder?', { cards: [['¿Qué come la danta?', [1]], ['¿Cuántas dantas hay hoy?', [3]], ['¿Quién come escarabajos?', [4]]] }, 'La dieta está en el 1, el número en el 3 y los escarabajos en el 4.', 'Busca la palabra clave de cada pregunta.')],
    ['icf-cn-ecosistemas-1', 'Una cadena sigue a quien come a quien.', pl('lupa-evidencia', '¿Lo dice, se deduce o no lo dice?', { cards: [['Los escarabajos son comida de aves.', 0], ['Con más dantas, las ranas pueden tener más comida.', 1], ['Las dantas tienen collar de rastreo.', 0], ['Las ranas comen semillas.', 2]] }, 'Aves y collar están escritos; lo de las ranas se deduce por los escarabajos; las semillas no.', 'Sigue la cadena: danta, heces, escarabajo, rana.')],
    ['icf-cn-ecosistemas-1', 'Los consumidores primarios comen productores.', opc('En este bosque, la danta ocupa el nivel de:', ['Productor', 'Consumidor secundario', 'Consumidor primario', 'Descomponedor'], 2, 'Come hojas y frutos: se alimenta de productores.', 'Mira de qué se alimenta la danta.')],
    ['icf-cn-ecosistemas-2', 'El abono devuelve materia al suelo.', pl('caso-nuevo', 'La idea del texto, en otros casos', { principle: 'Los restos de unos seres vuelven al suelo y sirven a otros.', cards: [['Hojas secas que se pudren y abonan un árbol', true], ['Estiércol que fertiliza un cultivo', true], ['La luz del sol que calienta una piedra', false], ['El agua que se evapora de un charco', false]] }, 'Hojas y estiércol devuelven materia; la piedra y el charco no son restos de seres vivos.', 'Busca restos de seres vivos que otro aprovecha.')],
    ['icf-cn-ecosistemas-2', 'Enterrar el abono mantiene los nutrientes en el suelo.', pl('resume-parrafo', 'Cada párrafo en una frase', { paras: [4, 5], options: ['Las heces alimentan escarabajos que mejoran el suelo.', 'El bosque sostiene a unas cuarenta dantas.', 'Los escarabajos dañan el suelo.', 'La población crecerá sin parar.'], key: [0, 1] }, 'El 4 habla de los escarabajos y el 5 del límite; las otras dicen lo contrario.', 'El resumen no puede contradecir el párrafo.')],
    ['icf-cn-ecosistemas-2', 'La materia circula: lo que uno desecha, otro lo usa.', opc('Los escarabajos ayudan al ciclo de la materia porque:', ['Crean nutrientes de la nada', 'Hacen fotosíntesis', 'Destruyen el carbono', 'Llevan al suelo los nutrientes de las heces'], 3, 'Entierran las heces y sus nutrientes quedan disponibles.', 'Piensa adónde va el abono.')],
    ['icf-cn-ecosistemas-3', 'Los brotes apiñados compiten por la luz.', pl('intruso-excepto', 'La opción que no corresponde a la danta', { ask: 'Según el texto, las dantas hacen todo esto, EXCEPTO:', cards: [['Comer frutos', [1]], ['Repartir semillas', [1]], ['Alimentar escarabajos', [4]], ['Cazar ranas', null]] }, 'Comer, repartir y alimentar están en el texto; cazar ranas no.', 'Busca cada acción en el texto.')],
    ['icf-cn-ecosistemas-3', 'Capacidad de carga: cuántos sostiene el lugar.', pl('mapa-del-texto', 'Ponle a cada párrafo lo que hace', { labels: ['presenta al animal', 'cuenta qué pasó sin él', 'muestra datos del regreso', 'sigue otro efecto en la red', 'explica hasta dónde crecerá', 'enseña a cazar dantas'], key: [0, 1, 2, 3, 4] }, 'Presenta, cuenta la ausencia, da datos, sigue la red y explica el límite.', 'Mira qué agrega cada párrafo.')],
    ['icf-cn-ecosistemas-3', 'Cerca del límite, la población deja de crecer.', opc('Los guardias esperan que la población se mantenga cerca de cuarenta porque:', ['Las dantas dejan de respirar', 'Es la capacidad de carga del bosque', 'Los collares lo impiden', 'Las ranas se las comen'], 1, 'El bosque tiene espacio y frutos para unas cuarenta.', 'Relee el último párrafo.')],
  ]);
})());
