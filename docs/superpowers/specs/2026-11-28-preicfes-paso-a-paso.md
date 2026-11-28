# Preicfes · explicaciones paso a paso, de lo básico a lo complejo

Pedido del usuario (2026-11-28): las explicaciones del Preicfes van muy rápido. Que vayan de lo más básico a lo más complejo, aunque
la lección quede más larga; suponer que el estudiante sabe poco; que cada lección se conecte con las demás dentro de su componente; en
las materias distintas de Matemáticas, imágenes más realistas para los experimentos y los conceptos; y secciones nuevas sacadas del
análisis de lo que pregunta el examen, para subir la probabilidad de un puntaje alto. Completa `2026-11-25-preicfes-estructura`.

## Qué cambia en cada explicación

Antes: tres ideas (explicación + «tu turno») y un problema. Ahora, en este orden:

1. **«Desde cero: …»** (uno o dos capítulos). Arranca sin suponer nada: qué es la cosa con palabras de todos los días, el vocabulario
   mínimo que la lección usa y, desde la segunda lección del componente, lo que se trae de una lección anterior (`conecta`).
2. **Las tres ideas de siempre**, sin tocar (pueden llevar capítulos `entre` para un paso intermedio que faltaba).
3. **«Más difícil: …»** (uno o dos capítulos): el caso que mezcla ideas, el dato que despista, la variante que el examen prefiere.
4. **«Así lo pregunta el examen»**: una explicación sobre una pregunta A–D original con el formato real del área (cuál diseño sirve,
   «Sí/No, porque…», cuál gráfica representa, qué actor se opone, dónde se ve el aviso…) que marca por qué cada opción falsa es una
   trampa, y una práctica A–D (`letras: ['A','B','C','D']`).
5. **El problema** de siempre y el cierre, con una idea final que resume la lección.

Cada capítulo nuevo cumple el molde de Explora (`tests/explora-estructura.test.js`): abre con `xpMira` de 4 a 7 momentos (4 a 22
palabras cada uno, ≤ 115 letras), sigue un `xpHaz` («Tu turno» se añade solo), textos ≤ 170 letras e ideas ≤ 135. Todo original:
nada copiado de los cuadernillos, y nunca se dice de qué examen o año sale algo.

## Cómo se escribe

`xpAmplia(id, { conecta, desde, entre, despues, examen, cierre })` (en `js/explora-escenas.js`) rehace `EXPLORA[id]` con los
capítulos nuevos alrededor de los de siempre y marca `XP_PASOS[id]` (así el empaquetador manda el archivo al paquete del curso). Un
archivo por archivo de explicación: `js/explora-icf-<área>[-N]-pasos.js`, registrado en `index.html` justo después de su original.

## Imágenes realistas

`js/explora-lab.js` (`XLAB`, va antes de las explicaciones del Preicfes): piezas SVG con luz, sombra y volumen para la escena `dibujo`,
dentro de un marco de foto con su propio fondo (`XLAB.foto(cuerpo, alto, fondo)`: `lab`, `mesa`, `campo`, `ciudad`, `papel`, `noche`,
`agua`), así que se ven igual en tema claro y oscuro; los rótulos van en placas (`XLAB.rot`). Laboratorio: `vaso`, `tubo`, `gradilla`,
`probeta`, `matraz` (con `globo` o `tapon`), `mechero`, `soporte`, `termometro`, `balanza`, `hielo`, `gota`, `planta`, `arbol`, `sol`,
`lampara`, `resorte`, `iman`, `pila`, `bombillo`, `cable`, `microscopio`, `celula` (animal o vegetal), `lupa`, `cronometro`, `regla`,
`pez`. Sociales: `documento` (papel viejo con sello), `periodico`, `urna`, `edificio` (`capitolio`, `fabrica`, `casa`, `colegio`,
`hospital`), `persona` (con `cartel`), `moneda`, `billete`, `rio`. Inglés: `aviso` (`metal`, `verde`, `peligro`, `papel`, `rojo`,
`azul`, con `poste`). Ciencias y Sociales llevan al menos una por lección.

**Fotos reales** (autorizadas por el usuario el 2026-11-28): cada lección de Ciencias y Sociales abre su primer capítulo con una foto de
Wikimedia Commons (60 fotos, 4.8 MB en `media/fotos/<idLección>.webp`) que la cámara recorre (`XLAB.real`: acercamiento `z`, centro
`cx`/`cy`, aro `m` en `mx`/`my`, rótulo `r`) con el crédito abajo. Se escriben con `xpFotoReal(id, foto, texto, momentos, idea)` en
`js/explora-icf-cn-fotos.js` y `js/explora-icf-sc-fotos.js` (después de todos los `-pasos.js`). Solo dominio público, CC0, CC BY y
CC BY-SA. `node tools/fotos-commons.js busca "consulta"`, `toma <id> "File:…"` (baja, comprime a < 130 KB y apunta autor, licencia
y página en `media/fotos/creditos.json`; rehace `js/explora-fotos-datos.js`, que no se edita a mano) y `mira <id>`.

## Lo que pregunta el examen (análisis de los cuadernillos 2024-2 y 2025-2)

Casi nunca se pregunta un dato suelto: todo parte de un contexto y muchas veces la respuesta está en el estímulo. Opciones largas con
«Sí/No, porque…» o «afirmación + justificación».

- **Matemáticas.** Tablas (lo más frecuente), barras, tortas, líneas, procedimientos por pasos, planos y figuras compuestas. Piden
  cuál gráfica o tabla representa algo, si un procedimiento es correcto, en qué paso está el error, qué dato falta, por qué una muestra
  no representa. Trampas: total frente a valor por persona, unitario sin multiplicar, unidades mezcladas, promedio mal dividido,
  gráfica con la forma buena y el punto de partida malo, radio frente a diámetro, justificación cierta con conclusión falsa.
  Estrategia: qué pide y en qué unidad; en gráficas mirar punto de partida, tipo de cambio y valor final; decidir el Sí/No con la cuenta
  propia antes de leer los «porque».
- **Lectura Crítica.** Ensayos y columnas, cómics e infografías, citas que se comparan. Supuestos, sustituir una palabra, mismo
  sentido, estrategia argumentativa, para qué se cita a alguien, función de un fragmento, intención, voz en el cómic. Trampas: mismas
  palabras con la relación lógica cambiada, sinónimos fuera de contexto, absolutos, opinión del citado atribuida al autor, tema frente a
  tesis, resumen frente a conclusión, lo cierto en el mundo que el texto no dice.
- **Sociales.** Situaciones con varios actores, citas, discursos, fuentes históricas. Qué conflicto surge, efecto no esperado, solución
  incompatible con un grupo, qué apoya un argumento, si una fuente sirve a un objetivo, dimensión de un plan, prejuicio implícito,
  contexto histórico. Trampas: posición frente a razones, invertir quién está a favor, generalizar, aceptar por autoridad, opciones
  moralmente atractivas fuera de la pregunta, consecuencia directa frente a lejana. Estrategia: tabla de actor, qué quiere y por qué.
- **Ciencias.** Experimentos con hipótesis y resultado, tablas, gráficas (calentamiento, crecimiento, gases), montajes (filtración,
  destilación, decantación, tubos con espuma, plastilina que flota, resortes, circuitos, acuarios, polinizadores). Qué gráfica
  representa, si la conclusión tiene evidencia, qué pregunta se responde con los datos, qué pasa si cambia una variable, separación de
  mezclas. Trampas: correlación por causa, concluir con un solo caso, lo que cambia frente a lo constante, mesetas de cambio de fase,
  calor en sentido equivocado, justificaciones que suenan científicas pero no salen del experimento.
- **Inglés.** Siete partes: palabras y definiciones, avisos (dónde se ven), diálogos, gramática en un texto, lectura literal,
  opinión (propósito, inferencia, mejor título) y vocabulario y conectores. Trampas: respuesta que repite una palabra de la pregunta sin
  sentido social, lugar que comparte una palabra con el aviso, formas verbales parecidas, few/little, still/already, who/where/which,
  títulos demasiado amplios o estrechos.

## Estado

**Hechas las 139 lecciones** de los cinco componentes (7 u 8 capítulos y 6 o 7 explicaciones cada una; `conecta` en cada lección
salvo la primera de cada componente). Ciencias y Sociales con fotos dibujadas en «Desde cero»; Inglés con avisos realistas.
`xpAmplia` hace arrancar en 0 los valores de un dibujo que aparecen en un momento (`desde0`). Las pruebas `explora-estructura` y
`explora-escenas` cargan las explicaciones en el orden de `index.html` (los `-pasos.js` van después de su original). Con esto el paquete
del Preicfes pasó de 1 MB: `tools/empaquetar.js` parte un curso grande en trozos seguidos (`zuka-preicfes`, `zuka-preicfes2`, tope
900 KB) y `ZUKA_PAQUETES.cursos[id]` puede ser un arreglo, que `js/carga.js` pide en orden.
Pendiente: revisión docente de los datos (historia, Constitución, emisiones por kWh).
