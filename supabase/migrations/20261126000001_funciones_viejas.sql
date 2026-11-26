-- Auditoría de seguridad del 2026-11-26 (docs/auditoria-2026-11-26.md, hallazgo 10; threat model T-006).
-- Del primer esquema, en inglés, quedaban cuatro funciones SECURITY DEFINER que cualquier estudiante con sesión podía
-- llamar por la API (/rest/v1/rpc/…) y un disparador que seguía creando una fila en `profiles` por cada cuenta nueva.
-- La app no las usa desde el 2026-11-17 (ninguna referencia en js/, admin/ ni instituciones/). `delete_account` dejaba
-- al estudiante borrar su cuenta, con lo que su código quedaba en pausa (privado.codigo_huerfano).
-- Las tablas viejas (profiles, lessons, lesson_progress…) no se tocan aquí: tienen RLS y no guardan nada que la app lea.
drop trigger if exists on_auth_user_created on auth.users;
drop function if exists public.handle_new_user();
drop function if exists public.add_xp(integer);
drop function if exists public.merge_xp(integer);
drop function if exists public.delete_account();
drop function if exists public.reset_progress();
