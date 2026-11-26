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
