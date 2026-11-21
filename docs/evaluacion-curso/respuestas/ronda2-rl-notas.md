# Ronda 2 · Razonamiento lógico · Notas de Mateo (examen B, preguntas 1 a 30)

Mateo leyó las escenas de los videos (`preuda-videos.js`, o las de respaldo de `preuda-razonamiento.js` en las lecciones sin video) y los ejercicios que de verdad ve: los bloques `diezLesson` con su `sol`, `err` y `opc`, la ronda que conserva cada juego y la pista heredada. También leyó las evaluaciones de cada mundo (`addExam`). Estas son las notas por lección, de lo más grave a lo menos grave.

## Errores o explicaciones que llevan a una respuesta equivocada

- **pu-es-4 (Giros, espejos y dobleces), evaluación del mundo.** La pregunta «una hoja cuadrada se dobla por la mitad dos veces y se le hace un corte pequeño en una esquina» da como correcta la respuesta de **4 cortes**, y la explicación dice «el corte queda repetido 4 veces». Eso depende de cuál esquina se corte. Si es la esquina donde se juntan los dos dobleces (la que cae en el centro de la hoja), al abrir queda **un solo agujero, en el centro**. Si es la esquina de los bordes sueltos, se recortan las esquinas de la hoja y no queda ningún agujero. La lección solo enseña «un agujero por capa» (`dobla-papel`, el caza-error de los 5 dobleces), así que Mateo contestó A en la pregunta 13 y probablemente falló. Falta un ejercicio que muestre **dónde** quedan los agujeros según el punto del corte (sobre un doblez, en la esquina de los dobleces, en el centro).
- **pu-ar-4 (Máximos y mínimos), caza-error de las medias.** Su explicación termina con «Las cantidades de cada color no importan aquí: solo cuántos colores hay». Es cierto para «dos del mismo color», pero Mateo lo generalizó y casi responde 4 en la pregunta 24 («al menos dos **rojas**»). La ronda que enseñaba ese caso (`peor-caso-bolsa` con `kind: 'color'`, «dos rojas: 9 de otros colores y una roja, 11») quedó fuera de la lección de diez ejercicios: solo se conserva la ronda 2 (tres del mismo color). Recomendación: volver a poner esa ronda o un `sol` de «al menos k de un color dado», y precisar que la frase vale solo para «dos del mismo color».

## Huecos de método (Mateo tuvo que improvisar)

- **pu-cm-3 y pu-cm-4 (Decimales y porcentajes; Potencias y raíces).** No hay potencias ni raíces de decimales: ni $0.2^3$ ni $\sqrt{0.16}$. Mateo sacó la pregunta 2 juntando piezas de otros mundos (el $2.5 \cdot 2.5 = 6.25$ de pu-ge-4 y el $0.2 \cdot 0.2 = 0.04$ de pu-pb-2). Con su base débil, un $\sqrt{0.16} = 0.04$ o un $0.2^3 = 0.8$ es muy probable. Falta un juego o un `sol` de «cuántas cifras decimales tiene el resultado» ($0.2^3 = 0.008$, $\sqrt{0.16} = 0.4$ porque $0.4 \cdot 0.4 = 0.16$).
- **pu-gr-1 (Leer gráficas), diagrama circular.** Siempre se va de grados a cantidad (90° → 45 estudiantes; 60° → 40 empleados). Nunca se hace lo contrario: de cantidad a ángulo del sector (fracción del total × 360°), que es lo que pide la pregunta 19. `rueda-porcentaje` da el porcentaje, pero no lo pasa a grados.
- **pu-pb-2 (Complemento e independencia).** «Al menos uno» se practica solo con dos intentos ($0.2 \cdot 0.2$). Con tres ($0.4^3 = 0.064$) Mateo dudó al multiplicar decimales tres veces. Basta con una ronda de tres intentos.
- **pu-es-2 (Vistas y cubos).** El video explica que cada vista muestra «la columna más alta de cada fila de mirada», pero ningún ejercicio pide **contar los cuadrados que se ven** en una vista ni aclara qué fila de la cuadrícula queda al frente. Mateo lo dedujo; un estudiante más flojo podría sumar todos los cubos de la fila de adelante.
- **pu-se-1 (Sucesiones numéricas).** En el video, «dos reglas turnándose» significa operaciones que se alternan (× 2, − 1). La idea de **dos sucesiones intercaladas** (la escena de respaldo «Alternadas», que el video reemplazó) solo aparece en el juego `alterna-dos`. Son dos sentidos distintos de «alternada» y ninguno se nombra aparte.

## Calcos (inflan el puntaje del examen B)

Con estos, Mateo solo cambió números de un problema que ya había visto resuelto:

- Pregunta 8 = reto del video de **pu-pr-3** (dos llaves de 6 h y 3 h y un desagüe de 4 h: los mismos números).
- Pregunta 14 = reto del video de **pu-se-2** (A, C, F, J, O → U: la misma sucesión).
- Pregunta 23 = `nota-ponderada` de **pu-ar-2** (30 % / 30 % / 40 %, notas 3 y 4; solo cambia la meta, 3.9 en vez de 3.6).
- Pregunta 10 = caza-error de CARRERA en **pu-co-2** (7 letras, una repetida 3 veces y otra 2: el mismo 420).
- Pregunta 9 = escena «Llegan en bicicleta» de **pu-pr-4**; pregunta 28 = pregunta en formato real de **pu-cj-2** (turistas); pregunta 30 = completa-solución del arquero en **pu-pb-2**; pregunta 26 = `mezcla-precio` de **pu-ec-2**; pregunta 27 = pares y múltiplos de 3 con $(A \cup B)^c$ en **pu-cj-1**; pregunta 22 = la misma operación $a * b = ab - (a + b)$ de **pu-op-2**; pregunta 20 = pregunta en formato real de **pu-lo-3**, con el mismo juego de cuatro opciones; pregunta 4 = las diagonales del decágono (35), resueltas en pu-co-3 y en pu-co-5.

Si el examen B debe medir transferencia, conviene cambiar el contexto **o** la estructura de estas preguntas, o quitar del curso los casos idénticos (sobre todo los retos de los videos de pu-pr-3 y pu-se-2).

## Otras observaciones menores

- **pu-ge-1.** El video enseña el polígono de interior 150° → 12 lados. No hay ejercicio de ese tipo con otro ángulo; Mateo lo sacó, pero por analogía con un único ejemplo.
- **pu-cm-1.** La jerarquía está bien enseñada. Un caso como $4 \div (-2) \cdot 3$ (división y luego producto con un negativo, de izquierda a derecha) solo aparece en el juego `capas-operacion` ($-12 + 18 \div -3 \cdot 2$). Alcanzó.
- **pu-or-2.** Revisé la pregunta en formato real de la ronda de cinco niños: la respuesta (Dany) es correcta.
- **pu-op-2.** En el caza-error, el operador $a \oplus b = a + b - ab$ se parece mucho al del completa-solución ($ab - (a + b)$). Para un estudiante flojo es fácil confundirlos; vale la pena un aviso de «mira bien la regla de cada problema».
