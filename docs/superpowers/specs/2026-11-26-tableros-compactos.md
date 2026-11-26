# Tableros compactos para Zuka y para el gestor (2026-11-26)

Pedido: que el administrador de Zuka y el gestor de cada institución vean su información más compacta, para seguir todo con eficiencia, con
tableros intuitivos y profesionales (referencia: tableros de tarjetas tipo «bento»), que se vean bien en computador, tableta y celular.

- **Rejilla común** `admin/bento.css` (clases `bx-`): 12 columnas desde 1180 px, 2 en tableta, 1 en celular; tarjetas `bx-c` con título y enlace,
  indicadores en fila `bx-ks` (icono, cifra, rótulo, tendencia), atajos `bx-a`, filas con barra `bx-filas`, tabla compacta `bx-t` (en celular cada
  fila es una ficha), anillo pequeño `bx-aro`, barras `bx-barras`.
- **Inicio de Zuka** (`vInicio`, admin/panel.js): saludo; por atender (solicitudes, pedidos, asesorías, cotizaciones); seis indicadores; minutos por
  día; vencen en 7 días; **instituciones** en una tabla (cupos, entraron, activos de la semana, días de contrato, enlace al portal); ventas por mes;
  cursos con plan y prueba.
- **Resumen del gestor** (`vPanorama`, instituciones/portal/gestor.js): saludo y filtros en una línea; atajos; cupos; puesta en marcha; cuatro
  indicadores; actividad; «Para hablar hoy»; grupos en tabla que filtra; metas que vienen; avance por curso; los que más avanzaron.
- El tablero completo de Zuka (`#tablero`) no cambió. Pruebas: `tests/portal-gestor.test.js`.

## Inicio sobrio del panel (2026-11-26, segunda pasada)

Pedido: compactar el inicio como en un tablero de referencia y que «no parezca hecho por IA». Cambios en `vInicio` (admin/panel.js) y al
final de `admin/bento.css` (clases `ini-`, solo del panel; el portal de instituciones no cambia):

- Un solo acento (`--brand`); el color queda para estados (vencidos en rojo, pendientes con punto dorado). Fuera los seis colores de los
  indicadores y los cuadros de icono rellenos.
- Las seis cifras en una franja partida por líneas finas (`ini-ks`, enlaces a su sección).
- «Por atender» pasa de fila de tarjetas grandes a lista compacta junto a la gráfica (`ini-pend`).
- Gráfica por día con eje y líneas de referencia; la barra de hoy resaltada (`iniBarras`). Ventas por mes con el total arriba (`iniMeses`).
- Buscador de estudiantes en la cabecera (lleva a Estudiantes con el texto puesto). Saludo sin «así va Zuka».
- Maqueta con datos inventados: `tests/admin-maqueta.html` (abre la página real con un Supabase falso). Pruebas: `tests/admin-inicio.test.js`.

## Pulido unslop del panel completo (2026-11-26, tercera pasada)

Con la skill unslop (Damir Sokolovsky, CC BY 4.0). El panel tenía poca «basura de IA» (sin emojis, degradados ni brillos), así que fue
modo pulido. Dirección: panel para quien vende accesos por código y sigue el estudio; ordenado, exacto, de libreta de cuentas; acento
el azul hielo de Zuka; los momentos son las gráficas de minutos y de ventas; firma: el código de acceso como tecla.

- Inicio: el título dice «Inicio» (no saluda).
- Iniciales neutras en todo el panel (antes cada nombre tenía su color).
- Encabezados de tabla sin mayúsculas ni espaciado; píldoras en peso 600.
- El código de acceso se ve como una tecla con borde fino (`span.pn-code`).
- Códigos: «Activar» deja de ser botón principal en cada fila.
- Ventas: cifras en la franja `ini-ks c4` (sin verde de adorno) y meses con el mes en curso resaltado (`iniMeses`, hasta 12).
- Pruebas: `tests/admin-unslop.test.js`.

## El panel con el diseño de la plataforma de estudio (2026-11-26, cuarta pasada)

Pedido: que las interfaces de administración sigan el mismo diseño de la plataforma de estudio (cursos, rutas, gimnasio). Al final de
`admin/bento.css`, con las medidas de `css/escritorio.css` y `css/inicio.css`:

- Menú lateral igual al de la app: 244 px, filas de 13 × 14 px en 16,5 px, esquinas de 14, iconos de 22 y el elegido en azul al 16 %.
- Tarjetas con las esquinas de las tarjetas de curso (26 px) y títulos en Jost 500 de 20 px; títulos de página en Jost 500.
- Portada del inicio = la `.hm-hero` de la app (fondo azul y coral, esquinas de 28): saludo pequeño con la fecha, «Así va Zuka hoy» y una
  línea con quiénes entraron y cuántos frentes hay por atender (reemplaza el «sin saludo» de la pasada anterior).
- Filtros como las píldoras `.hm-filtros`: sin borde, la elegida en azul al 18 %.
- Pruebas: `tests/admin-estilo-app.test.js`.

## Fallos de la auditoría Hallmark, corregidos (2026-11-26, quinta pasada)

Auditoría con la skill Hallmark (`/hallmark audit`, gates «Floor» del panel). Corregido:

- 63: ningún dato unido con «·» (21 líneas en panel.js, tienda.js, instituciones.js y tablero.js): comas, «y», «por», «de», «hasta el».
- 48: los colores escritos a mano pasan a variables `--pn-*` en un bloque `:root` al inicio de `admin/bento.css` (coral de la portada,
  aviso, tintas sobre oro y sobre color, velo de los diálogos, sombras).
- 10a: las barras del Tablero crecen con `transform: scaleX(var(--s))` (y `--s` desde tablero.js) en lugar de animar `width`.
- 67: el código de acceso a .03em; los encabezados de `.bx-t` sin mayúsculas en la regla base (también en el portal de instituciones).
- Pantallas de trabajo: los filtros de Estudiantes y Códigos viven en la dirección (`#estudiantes?estado=pago&q=ana`, `filtrosDeUrl`,
  `filtrosAUrl` con `history.replaceState`). F3: títulos con `text-wrap: balance`.
- Queda el aviso 56 (dos menús fijos), falso: uno es del celular y otro del computador. La silueta de carga y el espaciado de 4 px
  no se tocaron (el espaciado copia las medidas de la plataforma de estudio).
- Pruebas: `tests/admin-hallmark.test.js`.
