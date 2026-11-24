# Acceso por código, por curso (2026-11-24)

Reemplaza los planes Básico / Medio / Pro de `2026-11-17-usuarios-planes-admin`. Nadie se registra: se entra con un
**código de acceso** que genera el administrador y se envía por WhatsApp.

## Reglas

- El **código es la cuenta**. La primera vez que se usa nace un usuario de Supabase; después, en cualquier dispositivo, el
  mismo código abre la misma cuenta con su avance. El administrador no se registra con código: entra con correo.
- El acceso es **por curso** (`accesos`: usuario + curso), de tipo `prueba` (el primer mundo del curso; con componentes, el
  primer mundo de cada uno) o `pago` (todo, hasta `hasta`). Un pago que vence conserva el primer mundo y el avance.
- **Comprar no cambia de cuenta ni de código**: el administrador activa el curso en el código que la persona ya tiene. Si
  renueva antes de vencer, los días se suman. Un código sin estrenar también se puede activar: cuenta desde que se estrena.
- **Duraciones**: Preuniversitario 1, 3 y 6 meses (4 meses existe apagado); los demás cursos, 6 meses. Se editan en el
  panel (tabla `productos`); sin precio, la app dice «Precio por WhatsApp». Se paga por fuera y se confirma en el panel.
- Con un curso pagado y vigente los **datos personales son obligatorios** (`datosFaltan`): pantalla que no se puede saltar.
- Se ven los cursos asignados más los publicados (estos, con candado y opción de compra).
- El avance sube completo a la nube: lecciones (`progreso`) y XP, racha, evaluaciones, gimnasio… (`estado_app`, `Estado.mezcla`).
- Máximo de dispositivos por código (ajuste `max_dispositivos`, 3); el administrador los puede liberar. Diez códigos
  fallidos desde una red en 15 minutos la detienen otros 15.

## Piezas

- `supabase/migrations/20261124000001_acceso_codigo.sql`: tablas y funciones. Todo lo del panel pasa por
  `admin(p_accion, p)`, que comprueba `es_admin()` y deja rastro en `auditoria`.
- `supabase/functions/entrar-codigo`: cambia un código por una sesión (la llave de servicio nunca sale del servidor).
- `js/acceso.js` (reglas puras), `js/cuenta.js` (sesión, entrada, Mi plan, compra), `js/datos.js` (datos personales),
  `js/estado.js` (avance completo), `admin/`.
- `lecciones.prueba` dice qué abre un código de prueba: al añadir lecciones, `node tools/sync-lecciones.js`.
- Pruebas: `tests/acceso.test.js`, `tests/estado.test.js`.
