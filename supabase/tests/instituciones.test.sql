-- Aislamiento entre dos colegios (pgTAP). Corre con `supabase test db` o en pglite (ver docs/instituciones/verificacion.md).
-- Cada prueba llama como el rol real (`authenticated` o `anon`) con la sesión de una persona concreta.
begin;
select no_plan();

-- ---------- dos colegios, cada uno con gestor, docente y estudiantes ----------
create temp table quien (k text primary key, v text);
grant all on quien to anon, authenticated;
create function pg_temp.de(p text) returns text language sql as $$ select v from quien where k = p $$;
create function pg_temp.soy(p text) returns void language sql as $$ select set_config('request.jwt.claim.sub', coalesce((select v from quien where k = p), ''), true) $$;
create function pg_temp.nuevo(p text) returns void language plpgsql as $$
declare u uuid; begin insert into auth.users (email, email_confirmed_at) values (gen_random_uuid() || '@codigo.invalid', now()) returning id into u; insert into quien values (p, u::text); end $$;
create function pg_temp.entra(p text, c text) returns void language plpgsql as $$ begin perform pg_temp.nuevo(p); perform public.codigo_vincular(c, pg_temp.de(p)::uuid); end $$;
create function pg_temp.inst(a text, p jsonb default '{}') returns jsonb language sql as $$ select public.institucion(a, p) $$;

select pg_temp.nuevo('zuka'); update public.perfiles set rol = 'admin' where id = pg_temp.de('zuka')::uuid;
update public.cursos set publicado = true where id in ('algebra', 'trig');
select pg_temp.soy('zuka');
insert into quien select 'A', r ->> 'id' from (select public.institucion_admin('guardar', jsonb_build_object('nombre', 'Colegio A', 'cupos', 5, 'cursos', '["algebra"]'::jsonb, 'desde', current_date - 1, 'hasta', current_date + 90, 'gestor', 'Gestora A')) r) t;
insert into quien select 'B', r ->> 'id' from (select public.institucion_admin('guardar', jsonb_build_object('nombre', 'Colegio B', 'cupos', 5, 'cursos', '["trig"]'::jsonb, 'desde', current_date - 1, 'hasta', current_date + 90, 'gestor', 'Gestor B')) r) t;
select pg_temp.entra('gA', (select codigo from public.inst_gestores where institucion = pg_temp.de('A')::uuid));
select pg_temp.entra('gB', (select codigo from public.inst_gestores where institucion = pg_temp.de('B')::uuid));
select pg_temp.soy('gA'); select pg_temp.inst('alta', '{"acepta":true,"cursos":["algebra"],"lista":[{"nombre":"Ana Uno","grupo":"10"},{"nombre":"Beto Dos","grupo":"11"}]}');
select pg_temp.inst('equipo_guardar', '{"nombre":"Docente A","papel":"docente","grupos":["10"]}');
select pg_temp.soy('gB'); select pg_temp.inst('alta', '{"acepta":true,"cursos":["trig"],"lista":[{"nombre":"Caro Tres","grupo":"10"}]}');
select pg_temp.inst('equipo_guardar', '{"nombre":"Docente B","papel":"docente","grupos":["10"]}');
insert into quien select 'e' || nombre, id::text from public.inst_estudiantes;
select pg_temp.entra('uAna', (select codigo from public.inst_estudiantes where nombre = 'Ana Uno'));
select pg_temp.entra('uCaro', (select codigo from public.inst_estudiantes where nombre = 'Caro Tres'));
select pg_temp.entra('dA', (select codigo from public.inst_gestores where nombre = 'Docente A'));
insert into public.uso_diario (usuario, dia, segundos, lecciones, ejercicios, aciertos) select pg_temp.de(k)::uuid, current_date, 600, 1, 12, 9 from quien where k in ('uAna', 'uCaro');
select pg_temp.soy('gB'); select pg_temp.inst('meta_guardar', jsonb_build_object('titulo', 'Meta B', 'curso', 'trig', 'grupo', '10', 'hasta', current_date + 5, 'lecciones', (select jsonb_agg(id) from (select id from public.lecciones where curso = 'trig' and tipo = 'leccion' limit 2) t)));
insert into quien select 'mB', id::text from public.inst_metas;
insert into quien select 'eqB', id::text from public.inst_gestores where nombre = 'Docente B';

-- ---------- tablas: nadie las lee directo ----------
select ok(c.relrowsecurity, 'RLS en ' || c.relname) from pg_class c where c.oid in ('public.instituciones'::regclass, 'public.inst_gestores'::regclass, 'public.inst_estudiantes'::regclass, 'public.inst_metas'::regclass, 'public.inst_registro'::regclass, 'public.inst_cotizaciones'::regclass);
set local role authenticated; select pg_temp.soy('gA');
select throws_ok('select * from public.' || t, '42501', null, 'un gestor no lee la tabla ' || t) from unnest(array['instituciones', 'inst_gestores', 'inst_estudiantes', 'inst_metas', 'inst_registro', 'inst_cotizaciones']) t;
select throws_ok('insert into public.inst_estudiantes (institucion, nombre) values (''' || pg_temp.de('A') || ''', ''Colado'')', '42501', null, 'ni escribe en ella');
select throws_ok(q, '42501', null, 'sin permiso: ' || q) from unnest(array['select privado.inst_codigo(''x'',''y'')', 'select privado.inst_renueva(''ABCDEFGHJK'')', 'select privado.inst_ajena(auth.uid(),''x'')', 'select * from privado.inst_cursos(auth.uid())', 'select public.codigo_entrar(''A'',''1'',''d'',''n'')', 'select public.codigo_vincular(''ABCDEFGHJK'', auth.uid())', 'select privado.conceder(auth.uid(),''algebra'',''pago'',30)']) q;
set local role anon; select pg_temp.soy('nadie');
select throws_ok(q, '42501', null, 'anónimo: ' || q) from unnest(array['select public.institucion(''panel'',''{}'')', 'select public.institucion_admin(''lista'',''{}'')', 'select public.mi_institucion()', 'select * from public.inst_estudiantes']) q;

-- ---------- gestor A frente al colegio B ----------
set local role authenticated; select pg_temp.soy('gA');
select is(pg_temp.inst('panel') -> 'institucion' ->> 'nombre', 'Colegio A', 'el gestor A ve su colegio');
select is(pg_temp.inst('panel', jsonb_build_object('institucion', pg_temp.de('B'))) -> 'institucion' ->> 'nombre', 'Colegio A', 'pedir el id de B no cambia de colegio');
select ok(position('Caro' in pg_temp.inst('panel')::text) = 0, 'su panel no trae a nadie de B');
select ok(position(pg_temp.de('uCaro') in pg_temp.inst('panel')::text) = 0, 'ni identificadores de cuentas de B');
select is((select count(*) from jsonb_object_keys(pg_temp.inst('panel') -> 'uso')), 1::bigint, 'el uso es solo el de su estudiante');
select throws_ok(format('select public.institucion(%L, %L)', a, p), '22023', null, 'A no puede ' || a || ' en B') from (values
  ('estudiante', jsonb_build_object('id', pg_temp.de('eCaro Tres'))), ('editar', jsonb_build_object('ids', jsonb_build_array(pg_temp.de('eCaro Tres')), 'nombre', 'Robada')),
  ('retirar', jsonb_build_object('ids', jsonb_build_array(pg_temp.de('eCaro Tres')))), ('reactivar', jsonb_build_object('ids', jsonb_build_array(pg_temp.de('eCaro Tres')))),
  ('codigo', jsonb_build_object('ids', jsonb_build_array(pg_temp.de('eCaro Tres')))), ('dispositivos', jsonb_build_object('ids', jsonb_build_array(pg_temp.de('eCaro Tres')))),
  ('meta_borrar', jsonb_build_object('id', pg_temp.de('mB'))), ('equipo_codigo', jsonb_build_object('id', pg_temp.de('eqB'))), ('equipo_estado', jsonb_build_object('id', pg_temp.de('eqB'), 'si', false)),
  ('equipo_guardar', jsonb_build_object('id', pg_temp.de('eqB'), 'nombre', 'Otro', 'papel', 'gestor')),
  ('alta', '{"acepta":true,"cursos":["trig"],"lista":[{"nombre":"Curso Ajeno"}]}'::jsonb)) t(a, p);
select lives_ok('select public.institucion(''grupo_renombrar'',''{"grupo":"10","nuevo":"10X"}'')', 'renombrar su grupo 10…');
reset role;
select is((select grupo from public.inst_estudiantes where nombre = 'Caro Tres'), '10', '…no toca el grupo 10 de B');
select is((select nombre from public.inst_gestores where id = pg_temp.de('eqB')::bigint), 'Docente B', 'ni el equipo de B');
select is((select count(*) from public.inst_metas where id = pg_temp.de('mB')::bigint), 1::bigint, 'ni sus metas');

set local role authenticated; select pg_temp.soy('gA');
select throws_ok('select public.institucion(''alta'',''{"cursos":["algebra"],"lista":[{"nombre":"Sin Permiso"}]}'')', '22023', 'Falta confirmar la autorización', 'sin autorización no se registra');
select throws_ok('select public.institucion(''alta'',''{"acepta":"quizá","cursos":["algebra"],"lista":[{"nombre":"Sin Permiso"}]}'')', '22023', null, 'ni con otra cosa');
reset role; select is((select autoriza from public.inst_estudiantes where nombre = 'Ana Uno'), 'Gestora A', 'queda quién autorizó');

-- ---------- docente, estudiante y Zuka ----------
set local role authenticated; select pg_temp.soy('dA');
select is(jsonb_array_length(pg_temp.inst('panel') -> 'estudiantes'), 1, 'el docente ve solo su grupo');
select ok(position('"codigo": "' in pg_temp.inst('panel')::text) = 0, 'y ningún código de acceso');
select throws_ok(format('select public.institucion(%L, %L)', a, p), c, null, 'el docente no puede: ' || a) from (values
  ('alta', '{"acepta":true,"cursos":["algebra"],"lista":[{"nombre":"Zeta"}]}'::jsonb, '42501'), ('retirar', jsonb_build_object('ids', jsonb_build_array(pg_temp.de('eAna Uno'))), '42501'), ('equipo_guardar', '{"nombre":"Yo","papel":"gestor"}'::jsonb, '42501'),
  ('codigo', jsonb_build_object('ids', jsonb_build_array(pg_temp.de('eAna Uno'))), '42501'), ('estudiante', jsonb_build_object('id', pg_temp.de('eBeto Dos')), '22023')) t(a, p, c);
select pg_temp.soy('uAna');
select throws_ok('select public.institucion(''panel'',''{}'')', '42501', null, 'un estudiante no abre el portal');
select throws_ok(format('select public.institucion(''panel'', %L)', jsonb_build_object('institucion', pg_temp.de('A'))), '42501', null, 'ni con el id de su colegio');
select throws_ok('select public.institucion_admin(''lista'',''{}'')', '42501', null, 'ni el panel de Zuka');
select throws_ok('update public.perfiles set rol = ''gestor'' where id = auth.uid()', '42501', null, 'ni se cambia el rol');
select ok(position('Colegio B' in public.mi_institucion()::text) = 0, 'su app no nombra a B');
select ok(privado.puede('algebra', false) and not privado.puede('trig', false), 'abre los cursos de A y no los de B');
select pg_temp.soy('uCaro'); select is(jsonb_array_length(public.mi_institucion() -> 'metas'), 1, 'la meta de B le llega a B');
select pg_temp.soy('gB'); select throws_ok('select public.institucion_admin(''estado'',''{}'')', '42501', null, 'un gestor no entra al panel de Zuka');

-- ---------- pausar un colegio no toca al otro ----------
select pg_temp.soy('zuka'); select lives_ok(format('select public.institucion_admin(''estado'', %L)', jsonb_build_object('id', pg_temp.de('A'), 'estado', 'pausa')), 'Zuka pausa A');
select pg_temp.soy('uAna'); select ok(not privado.puede('algebra', false), 'A queda cerrada');
select pg_temp.soy('uCaro'); select ok(privado.puede('trig', false), 'B sigue abierta');

select * from finish();
rollback;
