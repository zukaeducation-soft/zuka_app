# Zuka para instituciones (2026-11-25)

Pedido: que colegios e instituciones conozcan los servicios, vean precios y coticen; y que, con contrato, un gestor registre a sus
estudiantes según los cupos y los cursos contratados, y les haga seguimiento.

## Piezas

| Dónde | Qué |
|---|---|
| Landing (`js/presentacion.js`) | entrada «Instituciones» en el menú, una lámina y la sección `#pz-inst` con el cálculo en vivo |
| `/instituciones/` | página pública: servicios, cómo funciona, precios y cotizador (solicitud que llega a Zuka e imprime la cotización en PDF) |
| `/instituciones/portal/` | portal del gestor y de los docentes: se entra con un código, como los estudiantes |
| `/admin` → Instituciones | Zuka atiende cotizaciones, crea contratos (cupos, cursos, fechas), da códigos de gestor, cambia precios |
| `supabase/migrations/20261125000001_instituciones.sql` | tablas `instituciones`, `inst_gestores`, `inst_estudiantes`, `inst_metas`, `inst_cotizaciones`, `inst_registro` |

Pruebas: `tests/instituciones.test.js`. `js/instituciones.js` tiene las cuentas puras (precio, lectura de listas, alertas).

## Precios

Por estudiante: suma del plan de 6 meses de cada curso (`productos`, los de la tienda) menos el descuento por cantidad. Un año son dos
periodos con un descuento más. Los descuentos están en `ajustes.inst_precios` y se cambian en el panel: **son una propuesta inicial** (0 %
hasta 29 estudiantes, 10 % desde 30, 20 % desde 100, 30 % desde 300; 10 % más por año). Un curso sin precio «se cotiza». La base repite la
cuenta al recibir la solicitud (`privado.inst_estimado`): lo que manda el navegador no vale.

## Permisos

- Nadie lee las tablas: todo pasa por funciones (`institucion`, `institucion_admin`, `mi_institucion`, `pedir_cotizacion`) que comprueban
  quién llama. RLS activo y sin políticas.
- El acceso de un estudiante **no se copia** a `accesos`: `privado.puede` lo mira en el contrato. Pausar, vencer, retirar o quitar un curso
  surte efecto al momento, y lo que el estudiante haya comprado por su cuenta no se toca.
- Un **gestor** ve y administra su institución; un **docente** ve solo sus grupos y pone metas. Su cuenta es `rol = 'gestor'`: no cuenta como
  estudiante ni gasta cupo, y ve los cursos contratados.
- Un cupo es un estudiante activo. Retirar lo libera (su cuenta y su avance quedan); la base bloquea la fila del contrato al contar.
- El gestor ve nombre, grupo, uso y avance **en los cursos del contrato**. No ve celular, correo, compras ni nada anterior a la matrícula
  en el uso diario. Al estudiante se le dice en Tú quién ve su avance. A estos estudiantes no se les pide el formulario de datos personales:
  la institución responde por la autorización (Ley 1581 de 2012), y así se le recuerda al registrarlos.

## Seguimiento

Resumen (cupos, activos, minutos, aciertos, avance, días de contrato), actividad por día, avance por curso y por grupo, quién necesita una
mano (no ha entrado, 7 días sin entrar, pocos aciertos, va muy atrás de su grupo), mapa lección por lección, metas con fecha (el estudiante
las ve en Inicio), ficha del estudiante, listas para Excel y tarjetas con el código para imprimir.

## Llaves de las cuentas

La institución conoce el código que reparte. Por eso: si un estudiante lo añade a **su cuenta personal**, le abre el curso pero no sirve para
entrar, y el portal no muestra ni cambia códigos de una cuenta con algo propio (correo, otro código, compras). Un código que Zuka pausó no lo
reactiva el portal. El equipo tiene tope (5 personas o el 15 % de los cupos) porque ve los cursos sin gastar cupo. Vencido el contrato o
retirado el estudiante, el portal deja de recibir datos nuevos suyos. El tiempo de estudio es de toda la app desde la matrícula; el avance,
solo de los cursos del contrato. El registro de cambios no guarda datos de estudiantes y se borra al año.
