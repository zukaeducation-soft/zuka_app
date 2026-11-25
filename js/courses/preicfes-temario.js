// Preicfes Saber 11 · temario completo (spec 2026-11-25-preicfes-estructura): los mundos y lecciones de cada componente, en el orden
// en que se estudian. Sale de los marcos de referencia, las infografías y los niveles de desempeño del examen, y de lo que más se
// pregunta en los cuadernillos. Un mundo que aún no tiene su archivo sale en el mapa como «En preparación» (COURSE_PREICFES.soon).
// [id, nombre, [lecciones], qué practica del examen]
const PI_TEMARIO = {
  matematicas: [
    ['icf-ma-datos', 'Datos y Gráficas', ['Leer tablas y gráficas', 'Promedio, mediana y moda', 'Muestras y conclusiones'], 'Estadística'],
    ['icf-ma-proporcion', 'Proporciones y Porcentajes', ['Razones y escalas', 'Porcentajes y cambios', 'Regla de tres directa e inversa', 'Tasas: velocidad, precio y moneda'], 'Álgebra y cálculo'],
    ['icf-ma-azar', 'Conteo y Probabilidad', ['Sumar o multiplicar casos', 'Permutaciones y combinaciones', 'Probabilidad simple', 'Tablas y eventos dependientes'], 'Estadística'],
    ['icf-ma-medida', 'Perímetros, Áreas y Volúmenes', ['Perímetro y área', 'Figuras compuestas y círculos', 'Volumen y capacidad'], 'Geometría'],
    ['icf-ma-lineal', 'Funciones Lineales', ['Pendiente como razón de cambio', 'De la situación a la ecuación', 'Comparar planes'], 'Álgebra y cálculo'],
    ['icf-ma-forma', 'Triángulos y Semejanza', ['Ángulos y desigualdad triangular', 'Pitágoras', 'Tales y semejanza', 'Razones trigonométricas'], 'Geometría'],
    ['icf-ma-ecuaciones', 'Ecuaciones en Contexto', ['Plantear ecuaciones', 'Expresiones algebraicas', 'Sistemas', 'Desigualdades'], 'Álgebra y cálculo'],
    ['icf-ma-argumenta', 'Validar Procedimientos', ['¿Es correcto el razonamiento?', 'Contraejemplos', '¿Alcanza la información?'], 'Argumentación'],
    ['icf-ma-finanzas', 'Dinero y Créditos', ['Interés simple y compuesto', 'Cuotas, IVA y descuentos'], 'Álgebra y cálculo'],
    ['icf-ma-curvas', 'Funciones que Curvan', ['Cuadráticas: trayectorias y máximos', 'Exponenciales y logarítmicas', 'Trigonométricas y periódicas', 'Dominio, rango y cortes'], 'Álgebra y cálculo'],
    ['icf-ma-espacio', 'Movimientos y Vistas', ['Traslación, rotación, reflexión y homotecia', 'Vistas y desarrollos planos', 'Coordenadas cartesianas, polares y en 3D'], 'Geometría'],
    ['icf-ma-dispersion', 'Dispersión y Comparación', ['Rango, varianza y desviación', 'Percentiles y cajas', 'Correlación'], 'Estadística'],
    ['icf-ma-numeros', 'Números, Conjuntos y Sucesiones', ['Fracciones, decimales y notación científica', 'Conjuntos y diagramas', 'Sucesiones y sus límites'], 'Álgebra y cálculo'],
  ],
  lectura: [
    ['icf-lc-literal', 'Lo que Dice el Texto', ['Datos e ideas del texto', 'Palabras y referencias'], 'Contenidos locales'],
    ['icf-lc-estructura', 'Cómo se Arma un Texto', ['Función de cada párrafo', 'Conectores y relaciones', 'Voces del texto'], 'Sentido global'],
    ['icf-lc-argumento', 'Tesis y Argumentos', ['Tesis y razones', 'Fortalecer y debilitar'], 'Sentido global'],
    ['icf-lc-literario', 'Textos Literarios', ['Narrador y personajes', 'Figuras y sentido', 'Poemas y canciones'], 'Sentido global'],
    ['icf-lc-filosofico', 'Textos Filosóficos', ['La pregunta del filósofo', 'Conceptos y ejemplos'], 'Sentido global'],
    ['icf-lc-discontinuo', 'Textos Discontinuos', ['Infografías, tablas y etiquetas', 'Cómics y caricaturas', 'Textos que mezclan formatos'], 'Sentido global'],
    ['icf-lc-evalua', 'Evaluar un Texto', ['Supuestos e intención', 'Validez de un enunciado', 'Valores y visión del mundo'], 'Reflexionar y evaluar'],
    ['icf-lc-comparar', 'Comparar Textos', ['Dos textos, un tema', 'Posturas que se cruzan'], 'Reflexionar y evaluar'],
  ],
  sociales: [
    ['icf-sc-constitucion', 'Constitución y Estado', ['Estado social de derecho y ramas del poder', 'Derechos y mecanismos de protección'], 'Pensamiento social'],
    ['icf-sc-participacion', 'Participación y Control', ['Voto y mecanismos de participación', 'Organismos de control', 'Reformar la Constitución'], 'Pensamiento social'],
    ['icf-sc-perspectivas', 'Perspectivas e Intereses', ['Actores de un conflicto', 'Cosmovisiones y prejuicios', 'Soluciones y quién las acepta'], 'Interpretación y análisis de perspectivas'],
    ['icf-sc-fuentes', 'Fuentes y Argumentos', ['Leer una fuente en su contexto', 'Qué prueba y qué no una fuente', 'Caricaturas y discursos'], 'Interpretación y análisis de perspectivas'],
    ['icf-sc-sistemico', 'Problemas con Muchas Dimensiones', ['Causas y consecuencias', 'Dimensiones en choque', 'Efectos de una intervención'], 'Pensamiento reflexivo y sistémico'],
    ['icf-sc-historia', 'Historia de Colombia', ['De la Colonia a la República', 'Siglo XIX', 'Siglo XX y conflicto armado'], 'Pensamiento social'],
    ['icf-sc-mundo', 'Historia del Mundo', ['Revoluciones y democracia', 'Guerras y Guerra Fría', 'Descolonización y movimientos sociales'], 'Pensamiento social'],
    ['icf-sc-geografia', 'Territorio y Ambiente', ['Regiones, mapas y población', 'Recursos, ambiente y desarrollo'], 'Pensamiento social'],
    ['icf-sc-economia', 'Economía y Globalización', ['Mercado, precios e impuestos', 'Inflación, desempleo y pobreza', 'Globalización'], 'Pensamiento social'],
    ['icf-sc-modelos', 'Modelos de las Ciencias Sociales', ['Conceptos básicos', 'Modelos y decisiones públicas'], 'Pensamiento reflexivo y sistémico'],
  ],
  ciencias: [
    ['icf-cn-indaga', 'Indagación Científica', ['Preguntas, variables y control', 'Datos y conclusiones'], 'Indagación'],
    ['icf-cn-celula', 'Célula y Organismos', ['Célula y transporte', 'Sistemas del cuerpo y homeostasis', 'Del ADN a la proteína'], 'Biológico'],
    ['icf-cn-movimiento', 'Movimiento y Fuerzas', ['Posición, velocidad y aceleración', 'Fuerzas y equilibrio', 'Gravedad'], 'Físico'],
    ['icf-cn-materia', 'Materia y Mezclas', ['Estados y propiedades', 'Mezclas y separación', 'Solubilidad'], 'Químico'],
    ['icf-cn-ecosistemas', 'Ecosistemas y Energía', ['Cadenas y pirámides tróficas', 'Ciclos de la materia', 'Relaciones entre especies'], 'Biológico'],
    ['icf-cn-energia', 'Energía y Calor', ['Energía mecánica', 'Calor y temperatura'], 'Físico'],
    ['icf-cn-atomo', 'Átomo y Enlaces', ['El átomo y la tabla periódica', 'Tipos de enlace'], 'Químico'],
    ['icf-cn-herencia', 'Herencia y Evolución', ['Genes y cruces', 'Reproducción', 'Selección natural'], 'Biológico'],
    ['icf-cn-reacciones', 'Reacciones y Cantidades', ['Reacciones y conservación', 'Estequiometría', 'Ácidos, bases y pH'], 'Químico'],
    ['icf-cn-ondas', 'Ondas, Luz y Sonido', ['Frecuencia y longitud', 'Reflexión y refracción'], 'Físico'],
    ['icf-cn-gases', 'Gases y Disoluciones', ['Leyes de los gases', 'Concentración'], 'Químico'],
    ['icf-cn-electrico', 'Electricidad y Magnetismo', ['Circuitos', 'Cargas e imanes'], 'Físico'],
    ['icf-cn-cts', 'Ciencia, Tecnología y Sociedad', ['Salud y tecnología', 'Recursos y ambiente', 'Decisiones con evidencia'], 'CTS'],
  ],
  ingles: [
    ['icf-en-avisos', 'Avisos y Vocabulario', ['Signs and notices', 'Words and meanings'], 'Partes 1 y 2 · Pre A1 y A1'],
    ['icf-en-dialogos', 'Conversaciones Cortas', ['Everyday replies', 'Polite answers', 'Feelings and plans'], 'Parte 3 · Pre A1 a A2'],
    ['icf-en-gramatica', 'Gramática en Contexto', ['Verbs and tenses', 'Small words that matter', 'Comparing things'], 'Parte 4 · A1 y A2'],
    ['icf-en-corto', 'Textos Cortos', ['Short messages', 'What the text says'], 'Parte 5 · A2'],
    ['icf-en-largo', 'Textos Largos', ['Main idea and details', 'The writer and the reader'], 'Parte 6 · B1'],
    ['icf-en-vocabulario', 'Vocabulario en Contexto', ['Choosing the right word', 'Word families and connectors'], 'Parte 7 · A2 y B1'],
    ['icf-en-inferencia', 'Inferir y Opinar', ['Reading between the lines', 'Opinions and facts'], 'Partes 5 y 6 · B1'],
  ],
};
// Mundos que faltan por escribir, con la forma que usa el mapa.
const piPendientes = hechos => Object.entries(PI_TEMARIO).flatMap(([block, l]) => l.filter(([w]) => !hechos.some(u => u.world === w)).map(([world, title, lessons, area]) => ({ block, world, title, lessons, area })));
