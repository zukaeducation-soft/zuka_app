# Portal del gestor más claro (2026-11-26)

Pedido: mejorar la interfaz del gestor, organizar los menús, más intuitiva, interactiva y profesional.

- **Menú por secciones** (`SECCIONES` en `instituciones/portal/gestor.js`): Resumen · Personas (Estudiantes, Equipo, Docentes responsables) ·
  Aprendizaje (Cursos y lecciones, Metas) · Preicfes (Preicfes, Simulacros, Avisos) · Institución (Contrato). Igual en la hoja «Más» del celular.
- **Resumen** (`vPanorama`): cabecera con saludo, el estado en una frase y las acciones; **Puesta en marcha** (registrar, que entren, docentes
  del Preicfes, primera meta, primer simulacro; cada paso lleva a donde se hace y desaparece cuando todo está listo); periodo en botones; indicadores
  con icono y tendencia; «Para hablar hoy» con el motivo; grupos como tarjetas que filtran; podio de los que más avanzaron.
- **Equipo**: tarjetas por persona con papel, estado de entrada, grupos y componentes; grupos con sus docentes; línea de cambios.
- **Contrato**: cupos, días, equipo y cursos; línea de vigencia con «hoy»; cursos con estudiantes y lecciones.
- Pruebas: `tests/portal-gestor.test.js`.
