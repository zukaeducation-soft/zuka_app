// Preicfes · Sociales y Ciudadanas, mundo 4 «Fuentes y Argumentos», paso a paso (spec 2026-11-28-preicfes-paso-a-paso): cada
// explicación empieza desde cero, sube hasta lo más difícil y termina mostrando cómo lo pregunta el examen. Fotos dibujadas con XLAB.
{
  const X = XLAB;
  // Un escritorio de archivo: una carta vieja, un periódico y la lupa.
  const archivo = v => X.foto((v.doc ? X.documento(14, 16, 140, 112, ['Querida madre:', 'aquí en la mina', 'todo es duro.'], { titulo: 'Carta', fecha: '1885' }) : '') +
    (v.per ? X.periodico(184, 20, 140, 112, 'Llega el tren', { foto: 1 }) : '') + (v.lupa ? X.lupa(150, 150, 20) : '') +
    (v.r ? X.rot(250, 172, v.r, 'oscuro') : ''), 196, 'papel');
  // Un periódico con su titular y la encuesta en que se apoya.
  const prueba = v => X.foto((v.per ? X.periodico(14, 18, 146, 116, 'Todos quieren ciclorrutas') : '') +
    (v.doc ? X.documento(190, 18, 136, 104, ['200 personas', 'solo barrio Norte', '70 % dice sí'], { titulo: 'Encuesta' }) : '') +
    (v.lupa ? X.lupa(176, 150, 20) : '') + (v.r ? X.rot(250, 168, v.r, 'oscuro') : ''), 196, 'papel');
  // Una caricatura: un político enorme y la gente diminuta.
  const caricatura = v => X.foto((v.per ? X.periodico(12, 14, 118, 96, 'Opinión', { nombre: 'LA VOZ' }) : '') +
    (v.big ? X.persona(238, 178, 1.5, '#2b3440') + X.rot(238, 30, 'Lo prometo todo') : '') +
    (v.chicos ? X.persona(170, 182, 0.42, '#3f9b6a') + X.persona(190, 182, 0.42, '#b5493f') + X.persona(306, 182, 0.42, '#3f6fb5') : '') +
    (v.r ? X.rot(110, 150, v.r, 'oscuro') : ''), 206, 'ciudad');

  xpAmplia('icf-sc-fuentes-1', {
    conecta: 'icf-sc-perspectivas-2',
    desde: [
      ['Desde cero: qué es una fuente',
        xpMira('dibujo', 'Desde el principio: una **fuente** es todo lo que nos deja saber algo del pasado. Hay que leerla como a un testigo.', { dib: archivo, v: { doc: 1 }, alto: 196 }, [
          ['En la lección de cosmovisiones viste que cada quien mira con su lente.', { doc: 1 }],
          ['Una fuente es toda huella del pasado: cartas, fotos, periódicos, cuentas, objetos.', { doc: 1, per: 1 }],
          ['Quien la hizo también tenía su lente, y eso queda en lo que escribió.', { doc: 1, per: 1, r: '¿quién la hizo?' }],
          ['Leerla es como oír un chisme: preguntas quién lo cuenta, cuándo y para qué.', { doc: 1, per: 1, lupa: 1 }],
          ['Por eso, lo primero que se busca es el autor y la fecha.', { doc: 1, per: 1, lupa: 1, r: 'autor y fecha' }],
        ], 'Fuente: huella del pasado. Lo primero: quién la hizo, cuándo y desde qué lente.'),
        xpHaz('hoja', 'Subraya lo que **sí** es una fuente para estudiar la vida en una hacienda del siglo XIX.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El libro de cuentas de la hacienda, escrito en esa época.'], ['Una película de acción estrenada este año.'], ['Tu opinión sobre las haciendas.']], pista: 'Una fuente es una huella que dejó ese tiempo. ¿Cuál viene de entonces?' }, 'El libro de cuentas es una huella de la época.')],
    ],
    despues: [
      ['Más difícil: la misma fuente, dos usos',
        xpMira('hoja', 'Un paso más: una fuente con interés puede ser mala para un dato y **muy buena** para otra pregunta.', { paras: [['Un afiche oficial de hace 80 años dice: «En nuestro país no hay pobres».'], ['Como prueba de que no había pobres, sirve poco.'], ['Como prueba de cómo quería verse el gobierno, sirve mucho.'], ['Todo depende de la pregunta que le hagas.']] }, [
          ['El afiche se hizo para convencer, no para informar.', { luz: [0], nota: { 0: 'propaganda' } }],
          ['Si preguntas si había pobres, no le puedes creer sin más.', { luz: [1], nota: { 1: 'débil' } }],
          ['Si preguntas qué quería mostrar el gobierno, es una prueba directa.', { luz: [2], nota: { 2: 'fuerte' } }],
          ['La utilidad de una fuente cambia con la pregunta.', { luz: [3] }],
          ['Trampa: botar una fuente por tener interés. Hasta lo que exagera dice algo.', {}],
        ], 'Una fuente interesada puede fallar en un dato y servir para entender a quien la hizo.'),
        xpHaz('hoja', 'El diario de un capataz dice que «los peones trabajan felices». Subraya para qué **sí** sirve bien.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Para probar que los peones eran felices.'], ['Para saber cómo veía el capataz a los peones.'], ['Para saber cuánto ganan hoy los peones.']], pista: 'El capataz tenía interés en que todo se viera bien. ¿De quién habla mejor su diario?' }, 'El diario muestra la mirada del capataz.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **¿la fuente le sirve a la investigadora?** con opciones de Sí y No y su porqué.', { letras: ['A', 'B', 'C', 'D'], paras: [['Sí, porque es una fuente primaria de la época.'], ['Sí, porque los registros oficiales siempre dicen la verdad.'], ['No, porque toda fuente vieja es falsa.'], ['No del todo, porque la fuente no registra a las mujeres; habría que buscar otras.']] }, [
          ['El caso: quiere saber cómo vivían las mujeres de un pueblo minero hacia 1900 y solo tiene la nómina de la mina.', {}],
          ['Ser de la época no basta: hay que ver si habla del tema.', { luz: [0], nota: { 0: 'no basta' } }],
          ['«Siempre» y «oficial» son trampa: aceptar por autoridad.', { luz: [1], nota: { 1: 'autoridad' } }],
          ['«Toda fuente vieja» generaliza: lo viejo no es falso.', { luz: [2], nota: { 2: 'generaliza' } }],
          ['La nómina solo pagaba a hombres: las mujeres no aparecen. Falta buscar más.', { luz: [3], nota: { 3: 'sirve' } }],
        ], 'Pregunta si la fuente habla de lo que se investiga y a quién deja por fuera.'),
      xpHaz('hoja', 'Un historiador quiere saber qué mercancías entraban al puerto de Cartagena hacia 1780. Subraya la fuente que **más** le sirve.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Una novela de piratas escrita hace poco.'], ['Los libros de impuestos del puerto de esa época, que anotaban cada carga.'], ['La opinión de un turista que visita hoy la ciudad.'], ['Un mapa actual de Cartagena.']], pista: 'Busca la fuente que es de ese tiempo y que mide justo lo que él pregunta.' }, 'Es de la época y anota cada carga.')],
    cierre: 'De cuándo es, quién la hizo y para qué, de quién habla y de quién calla, y qué pregunta le haces.',
  });

  xpAmplia('icf-sc-fuentes-2', {
    conecta: 'icf-sc-fuentes-1',
    desde: [
      ['Desde cero: qué es una prueba',
        xpMira('dibujo', 'Desde el principio: una **prueba** es lo que hace más creíble una afirmación. Pero cada fuente prueba poco.', { dib: prueba, v: { per: 1 }, alto: 196 }, [
          ['En la lección anterior viste que una fuente sirve según la pregunta que le hagas.', { per: 1 }],
          ['Una prueba es lo que vuelve más creíble una afirmación.', { per: 1, doc: 1 }],
          ['Pero una fuente solo prueba lo que midió, y donde lo midió.', { per: 1, doc: 1, r: '¿qué midió?' }],
          ['El titular habla de «todos», y la encuesta fue en un solo barrio.', { per: 1, doc: 1, r: '¿dónde?' }],
          ['Es como probar la sopa con una cucharada: sirve si la revolviste bien.', { per: 1, doc: 1, lupa: 1 }],
        ], 'Una fuente prueba lo que midió, donde lo midió: ni un paso más.'),
        xpHaz('hoja', 'En la encuesta del barrio Norte, el 70 % quiere ciclorrutas. Subraya lo que queda **probado**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['Que toda la ciudad quiere ciclorrutas.'], ['Que la mayoría de los encuestados del barrio Norte las quiere.'], ['Que las ciclorrutas bajan los accidentes.']], pista: 'Mira a quién preguntaron y qué les preguntaron. No digas más que eso.' }, 'Solo se preguntó en un barrio, y solo por el gusto.')],
    ],
    despues: [
      ['Más difícil: apoya, debilita o no pesa',
        xpMira('hoja', 'Un paso más: el examen pone una **tesis** y varios datos. Cada dato la apoya, la debilita o no pesa.', { paras: [['Tesis: la ciclorruta bajó los accidentes de la avenida.'], ['Tras abrirla, los accidentes bajaron de 40 a 22 al año.'], ['En otra avenida sin ciclorruta, los accidentes no cambiaron.'], ['Ese mismo año pusieron cámaras de velocidad en la avenida.'], ['A los ciclistas les gusta el color de la ciclorruta.']] }, [
          ['Pon cada dato junto a la tesis: ¿la deja más firme o más débil?', { luz: [0], nota: { 0: 'tesis' } }],
          ['Bajar de 40 a 22 apoya la tesis.', { luz: [1], nota: { 1: 'apoya' } }],
          ['Que la otra avenida no cambiara la apoya más: es una comparación.', { luz: [2], nota: { 2: 'apoya' } }],
          ['Las cámaras son otra explicación posible: la debilitan.', { luz: [3], nota: { 3: 'debilita' } }],
          ['El color no dice nada de accidentes: no pesa.', { luz: [4], nota: { 4: 'no pesa' } }],
          ['Trampa: un dato verdadero no siempre sirve para la tesis.', {}],
        ], 'Cada dato apoya, debilita o no pesa; otra causa posible siempre debilita.'),
        xpHaz('hoja', 'Tesis: «el comedor escolar mejoró la asistencia». Subraya el dato que la **debilita**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['La asistencia subió del 80 % al 92 %.'], ['Ese mismo año empezó un bus gratis al colegio.'], ['Los niños dicen que la comida es rica.']], pista: 'Busca el dato que ofrece otra explicación para la misma subida.' }, 'El bus también pudo subir la asistencia.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **¿qué haría falta para sostener la conclusión?** Busca lo que separa las explicaciones.', { letras: ['A', 'B', 'C', 'D'], paras: [['Saber si la gente dejó de denunciar, por ejemplo porque cerraron la estación.'], ['Que el alcalde lo repita en televisión.'], ['Que un 30 % es un número grande.'], ['Nada, porque las cifras oficiales no se discuten.']] }, [
          ['El caso: las denuncias por robo bajaron 30 % y la alcaldía concluye que hay menos robos.', {}],
          ['Repetirlo no lo vuelve cierto: es aceptar por autoridad.', { luz: [1], nota: { 1: 'autoridad' } }],
          ['El tamaño del número no separa las dos explicaciones.', { luz: [2], nota: { 2: 'no pesa' } }],
          ['Toda cifra se puede revisar: «no se discute» es trampa.', { luz: [3], nota: { 3: 'absoluto' } }],
          ['Denuncias no son robos: si la gente dejó de denunciar, la conclusión cae.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'Pregunta qué midió la fuente y qué otra cosa pudo producir el mismo número.'),
      xpHaz('hoja', 'Un estudio halla que quienes desayunan sacan mejores notas. Subraya la lectura **prudente**.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [2], paras: [['Desayunar causa buenas notas en todos.'], ['El estudio es falso porque habla de comida.'], ['Van juntos, pero puede haber otra causa, como el apoyo de la familia.'], ['Hay que obligar a todos a desayunar.']], pista: 'Que dos cosas vayan juntas, ¿prueba cuál causa cuál? Busca la que no dice de más.' }, 'Juntas no es por: falta descartar otras causas.')],
    cierre: 'Qué mide la fuente, dónde lo midió, si cada dato apoya o debilita y qué otra explicación cabe.',
  });

  xpAmplia('icf-sc-fuentes-3', {
    conecta: 'icf-sc-fuentes-1',
    desde: [
      ['Desde cero: un dibujo que opina',
        xpMira('dibujo', 'Desde el principio: una **caricatura** no es una foto. Es un dibujo hecho para dar una opinión.', { dib: caricatura, v: { per: 1 }, alto: 206 }, [
          ['En la lección de fuentes viste que toda fuente tiene autor, fecha y propósito.', { per: 1 }],
          ['Una caricatura es un dibujo que opina: no informa, toma partido.', { per: 1, big: 1 }],
          ['Exagera lo que quiere criticar: aquí, el político es enorme.', { per: 1, big: 1, r: 'exagera' }],
          ['Y lo compara con algo: la gente se ve diminuta a su lado.', { per: 1, big: 1, chicos: 1 }],
          ['Leerla es preguntar qué agranda, qué achica y qué quiere que pienses.', { per: 1, big: 1, chicos: 1, r: '¿qué agranda?' }],
        ], 'La caricatura opina exagerando y comparando: pregunta qué agranda y qué achica.'),
        xpHaz('hoja', 'En la caricatura hay un político gigante y gente diminuta. Subraya la **opinión**.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [0], paras: [['El político se siente muy por encima de la gente.'], ['El político es muy alto en la vida real.'], ['A la gente le gusta mirar hacia arriba.']], pista: 'La caricatura no mide estaturas: el tamaño es un símbolo. ¿De qué?' }, 'El tamaño simboliza poder y distancia.')],
    ],
    despues: [
      ['Más difícil: qué sostiene un discurso',
        xpMira('hoja', 'Un paso más: en un discurso se mezclan **datos**, citas famosas y ataques. Solo unos sostienen la propuesta.', { paras: [['«Como dijo un premio Nobel, la educación lo cambia todo».'], ['«El año pasado, 3 de cada 10 jóvenes de las veredas dejaron el colegio».'], ['«Mi rival nunca estudió en un colegio público».'], ['«Por eso propongo transporte escolar gratis en las veredas».']] }, [
          ['Citar a un famoso adorna, pero no prueba la propuesta.', { luz: [0], nota: { 0: 'autoridad' } }],
          ['Este es un dato que se puede revisar: sí es una razón.', { luz: [1], nota: { 1: 'dato' } }],
          ['Esto ataca a la persona; no discute la idea.', { luz: [2], nota: { 2: 'ataque' } }],
          ['Esta es la propuesta: el dato le da apoyo; la cita y el ataque, no.', { luz: [3], nota: { 3: 'propuesta' } }],
          ['Trampa: aceptar una idea solo porque la dijo alguien importante.', {}],
        ], 'Solo los datos revisables apoyan la propuesta; citas famosas y ataques no la prueban.'),
        xpHaz('hoja', 'Subraya la frase que **sí** da una razón revisable.', { modo: 'toca', letras: ['A', 'B', 'C'], meta: [1], paras: [['«Un gran pensador estaría de acuerdo conmigo».'], ['«En el barrio hay un solo médico para 9 000 personas».'], ['«Mis rivales son unos mentirosos».']], pista: 'Una razón revisable se puede contar o comprobar. Las otras se apoyan en alguien.' }, 'Médicos y personas se pueden contar.')],
    ],
    examen: ['Así lo pregunta el examen',
      xpMira('hoja', 'Pregunta típica: **¿qué critica la caricatura?** La respuesta junta la imagen con la frase.', { letras: ['A', 'B', 'C', 'D'], paras: [['Que la publicidad oficial dice lo contrario de lo que se ve.'], ['Que todos los ríos del país están sucios.'], ['Que los carteles de la orilla son feos.'], ['Que la gente no debe bañarse en el río.']] }, [
          ['La imagen: un río lleno de basura y un cartel que dice «Río limpio, gracias a nosotros».', {}],
          ['Esta generaliza: el dibujo muestra un río, no todos.', { luz: [1], nota: { 1: 'generaliza' } }],
          ['Esta se queda en lo literal: no habla del choque.', { luz: [2], nota: { 2: 'literal' } }],
          ['Esta da un consejo que el dibujo no da.', { luz: [3], nota: { 3: 'fuera' } }],
          ['La frase choca con la escena: critica la propaganda que no cumple.', { luz: [0], nota: { 0: 'sirve' } }],
        ], 'En la caricatura, la crítica está en el choque entre lo que se dice y lo que se ve.'),
      xpHaz('hoja', 'Un candidato dice: «O aprueban mi plan, o el barrio se hunde en el caos». Subraya la **estrategia** que usa.', { modo: 'toca', letras: ['A', 'B', 'C', 'D'], meta: [1], paras: [['Da un dato verificable sobre el barrio.'], ['Presenta solo dos salidas, como si no hubiera otras.'], ['Cita a una autoridad reconocida.'], ['Reconoce los argumentos de su rival.']], pista: 'Cuenta las salidas que deja la frase. ¿Hay de verdad solo esas?' }, 'Es una falsa elección: deja solo dos caminos.')],
    cierre: 'Qué exagera, con qué choca la frase y qué queda cuando quitas citas famosas y ataques.',
  });
}
