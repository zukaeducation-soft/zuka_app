# Entrada única (2026-11-26)

Pedido del usuario: «unifica el inicio de sesión en la plataforma, no quiero que haya una vista separada para instituciones;
quiero un solo login y que la app ya sepa cuándo un código es de un estudiante independiente, una institución, un estudiante de
una institución, un docente de una institución, un gestor o un administrador de Zuka».

## Antes

- La app (`/`): pantalla «Entra con tu código» y, aparte, «Entrar con correo» (botón que cambia de pantalla).
- El portal (`/instituciones/portal/`): su propio formulario «Portal de instituciones» con el código de gestor o docente.
- El panel (`/admin`): su propio formulario «Entrar al panel» con correo y contraseña.

## Ahora

Una sola pantalla de entrada, la de la app. Un solo campo, **«Código o correo»**:

- Si se escribe un código (diez letras y números), se entra con `entrar-codigo`, como siempre.
- Si se escribe un correo (lleva «@»), aparecen en el mismo formulario la contraseña y «Olvidé mi contraseña». Es para las cuentas
  de administración: la base no deja entrar a un administrador solo con un código (`codigo_entrar` responde `es_admin`), porque
  los códigos viajan por WhatsApp. Esa barrera se queda; el aviso lo explica y el estudiante no ve nada distinto.

Al entrar, la app mira qué cuenta es (`tipoCuenta(perfil, inst)` en `js/acceso.js`, pura) y la lleva a lo suyo:

| Tipo | Cómo se sabe | Adónde va |
|---|---|---|
| `admin` (administración de Zuka) | `perfil.rol = 'admin'` | el panel `/admin/` |
| `gestor` (la institución) | en `inst.equipo` con papel `gestor`, o `perfil.rol = 'gestor'` sin equipo | la pestaña Portal |
| `docente` de una institución | en `inst.equipo`, solo con papel `docente` | la pestaña Portal |
| `colegio` (estudiante de una institución) | `inst.nombres` no vacío | Inicio |
| `independiente` | ninguna de las anteriores | Inicio |

El código de la institución es el del gestor: la institución entra por él. Al entrar desde el formulario sale un aviso corto
(«Entraste como docente de Colegio San José»); el independiente no lo necesita.

Las otras dos puertas dejan de tener formulario:

- `/instituciones/portal/` sin marco (ni `?demo` ni `?i=`) se va siempre a `/?portal`: la entrada de la app, que lleva al Portal.
  Con sesión que no es de una institución, «Entrar con otra cuenta» cierra la sesión y va a `/?portal`.
- `/admin` sin sesión se va a `/?admin`; con sesión que no es de administración, «Entrar con otra cuenta» hace lo mismo.
  «Salir» cierra la sesión y vuelve a `/`.
- `?admin`, `?portal` y `?entrar` saltan la presentación y abren la entrada; en `localhost` también la piden (sin ellos no hay
  candados ni entrada).
- Los enlaces «Entrar al portal» de la página de instituciones y de la presentación llevan a `/?portal`.

Pruebas: `tests/entrada-unica.test.js`.
