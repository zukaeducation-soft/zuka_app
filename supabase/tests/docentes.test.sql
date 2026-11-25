-- Docentes responsables, simulacros, observaciones y avisos (pgTAP): quién ve y hace qué, entre colegios y entre docentes.
begin;
select no_plan();
create temp table quien (k text primary key, v text);
grant all on quien to anon, authenticated;
create function pg_temp.de(p text) returns text language sql as $$ select v from quien where k = p $$;
create function pg_temp.soy(p text) returns void language sql as $$ select set_config('request.jwt.claim.sub', coalesce((select v from quien where k = p), ''), true) $$;
create function pg_temp.entra(p text, c text) returns void language plpgsql as $$
declare u uuid; begin insert into auth.users (email, email_confirmed_at) values (gen_random_uuid() || '@codigo.invalid', now()) returning id into u; insert into quien values (p, u::text); if c <> '' then perform public.codigo_vincular(c, u); end if; end $$;
create function pg_temp.inst(a text, p jsonb default '{}') returns jsonb language sql as $$ select public.institucion(a, p) $$;
create function pg_temp.doc(a text, p jsonb default '{}') returns jsonb language sql as $$ select public.docencia(a, p) $$;
create function pg_temp.sim(a text, p jsonb default '{}') returns jsonb language sql as $$ select public.simulacro(a, p) $$;
create function pg_temp.mas(d interval) returns text language sql as $$ select to_char((now() + d) at time zone 'America/Bogota', 'YYYY-MM-DD"T"HH24:MI:SS') $$;

select pg_temp.entra('zuka', ''); update public.perfiles set rol = 'admin' where id = pg_temp.de('zuka')::uuid;
select pg_temp.soy('zuka');
insert into quien select 'A', r ->> 'id' from (select public.institucion_admin('guardar', jsonb_build_object('nombre', 'Colegio A', 'cupos', 20, 'cursos', '["preicfes"]'::jsonb, 'desde', current_date - 1, 'hasta', current_date + 90, 'gestor', 'Gestora A')) r) t;
insert into quien select 'B', r ->> 'id' from (select public.institucion_admin('guardar', jsonb_build_object('nombre', 'Colegio B', 'cupos', 20, 'cursos', '["preicfes"]'::jsonb, 'desde', current_date - 1, 'hasta', current_date + 90, 'gestor', 'Gestor B')) r) t;
select pg_temp.entra('gA', (select codigo from public.inst_gestores where nombre = 'Gestora A'));
select pg_temp.entra('gB', (select codigo from public.inst_gestores where nombre = 'Gestor B'));
select pg_temp.soy('gB'); select pg_temp.inst('alta', '{"acepta":true,"cursos":["preicfes"],"lista":[{"nombre":"Caro Tres","grupo":"11A"}]}');
select pg_temp.soy('gA'); select pg_temp.inst('alta', '{"acepta":true,"cursos":["preicfes"],"lista":[{"nombre":"Ana Uno","grupo":"11A"},{"nombre":"Beto Dos","grupo":"11B"}]}');
insert into quien select 'r', pg_temp.inst('equipo_guardar', '{"nombre":"Mate A","papel":"docente","grupos":["11A"]}') ->> 'id';
insert into quien select 'r2', pg_temp.inst('equipo_guardar', '{"nombre":"Lectura A","papel":"docente","grupos":["11A"]}') ->> 'id';
select isnt(pg_temp.de('r'), null, 'crear el código dice de quién es');
insert into quien select nombre, id::text from public.inst_estudiantes;
select pg_temp.entra('uAna', (select codigo from public.inst_estudiantes where nombre = 'Ana Uno'));
select pg_temp.entra('uBeto', (select codigo from public.inst_estudiantes where nombre = 'Beto Dos'));
select pg_temp.entra('uCaro', (select codigo from public.inst_estudiantes where nombre = 'Caro Tres'));
select pg_temp.entra('dM', (select codigo from public.inst_gestores where nombre = 'Mate A'));
select pg_temp.entra('dL', (select codigo from public.inst_gestores where nombre = 'Lectura A'));

select ok(c.relrowsecurity, 'RLS en ' || c.relname) from pg_class c where c.relname in ('inst_asignaciones', 'inst_simulacros', 'inst_resultados', 'inst_observaciones', 'inst_avisos');
set local role authenticated;
select pg_temp.soy('gA');
select throws_ok('select * from public.' || t, '42501', null, 'no se lee directo ' || t) from unnest(array['inst_asignaciones', 'inst_simulacros', 'inst_resultados', 'inst_observaciones', 'inst_avisos']) t;
select throws_ok('select privado.simulacro_mio(auth.uid(), null)', '42501', null, 'auxiliar cerrada');
set local role anon; select throws_ok('select public.docencia(''datos'')', '42501', null, 'anónimo no'); select throws_ok('select public.simulacro(''empezar'')', '42501', null, 'anónimo no'); set local role authenticated;

-- ---------- responsables ----------
select pg_temp.soy('dM');
select throws_ok('select pg_temp.doc(''asignar'', ''{"componente":"matematicas","grupos":["11A"],"gestor":1}'')', '42501', null, 'un docente no asigna');
select pg_temp.soy('gA');
select lives_ok(format('select pg_temp.doc(''asignar'', ''{"componente":"matematicas","grupos":["11A","11B"],"gestor":%s}'')', pg_temp.de('r')), 'el gestor asigna');
select lives_ok(format('select pg_temp.doc(''asignar'', ''{"componente":"lectura","grupos":["11A"],"gestor":%s}'')', pg_temp.de('r2')), 'y otro componente');
select throws_ok(format('select pg_temp.doc(''asignar'', ''{"componente":"lectura","grupos":["99"],"gestor":%s}'')', pg_temp.de('r2')), '22023', null, 'grupo que no existe');
select throws_ok(format('select pg_temp.doc(''asignar'', ''{"componente":"latin","grupos":["11A"],"gestor":%s}'')', pg_temp.de('r2')), '22023', null, 'componente que no existe');
reset role; select is((select grupos from public.inst_gestores where nombre = 'Mate A'), '{11A,11B}', 'gana el grupo asignado'); set local role authenticated;
select pg_temp.soy('gB');
select throws_ok(format('select pg_temp.doc(''asignar'', ''{"componente":"lectura","grupos":["11A"],"gestor":%s}'')', pg_temp.de('r2')), '22023', null, 'B no asigna gente de A');
select is(pg_temp.doc('datos') -> 'asignaciones', '[]', 'B no ve lo de A');
select pg_temp.soy('dL'); select is(jsonb_array_length(pg_temp.doc('datos') -> 'asignaciones'), 1, 'un docente ve solo lo suyo');

-- ---------- simulacros ----------
insert into quien values ('P', '[{"k":"a","m":"w","l":"l1","q":"Dos mas dos","o":["4","5","6","7"],"r":0,"e":"suma"},{"k":"b","q":"Uno mas uno","o":["1","2","3","4"],"r":1,"d":0}]');
create function pg_temp.nuevo(c text, gr text, a interval, z interval, m text default 'cerrar') returns text language sql as $$ select jsonb_build_object('componente', c, 'titulo', 'Simulacro 1', 'grupos', gr::jsonb, 'preguntas', pg_temp.de('P')::jsonb, 'textos', '[{"title":"T","paras":["p"]}]'::jsonb, 'minutos', 30, 'abre', pg_temp.mas(a), 'cierra', pg_temp.mas(z), 'muestra', m)::text $$;
select pg_temp.soy('dL');
select throws_ok(format('select pg_temp.doc(''simulacro_crear'', %L)', pg_temp.nuevo('matematicas', '["11A"]', '-1 hour', '1 day')), '42501', null, 'lectura no crea de matemáticas');
select throws_ok(format('select pg_temp.doc(''simulacro_crear'', %L)', pg_temp.nuevo('lectura', '["11A","11B"]', '-1 hour', '1 day')), '42501', null, 'ni para otro grupo');
select pg_temp.soy('dM');
select throws_ok(format('select pg_temp.doc(''simulacro_crear'', %L)', pg_temp.nuevo('matematicas', '["11A"]', '2 day', '1 day')), '22023', null, 'cierre antes de apertura');
select throws_ok(format('select pg_temp.doc(''simulacro_crear'', %L)', replace(pg_temp.nuevo('matematicas', '["11A"]', '-1 hour', '1 day'), '"r": 0', '"r": 9')), '22023', null, 'respuesta fuera de rango');
select throws_ok(format('select pg_temp.doc(''simulacro_crear'', %L)', replace(pg_temp.nuevo('matematicas', '["11A"]', '-1 hour', '1 day'), '"d": 0', '"d": 5')), '22023', null, 'texto que no existe');
insert into quien select 's', pg_temp.doc('simulacro_crear', pg_temp.nuevo('matematicas', '["11A"]', '-1 hour', '1 day')::jsonb) ->> 'id';
select isnt(pg_temp.de('s'), null, 'el responsable lo crea');
insert into quien select 'sf', pg_temp.doc('simulacro_crear', pg_temp.nuevo('matematicas', '["11A"]', '1 day', '2 day')::jsonb) ->> 'id';
select is(jsonb_array_length(pg_temp.doc('datos') -> 'simulacros'), 2, 'lo ve en su lista');
select pg_temp.soy('dL'); select is(pg_temp.doc('datos') -> 'simulacros', '[]', 'el de lectura no');
select throws_ok(format('select pg_temp.doc(''simulacro'', ''{"id":%s}'')', pg_temp.de('s')), '22023', null, 'ni lo abre');
select throws_ok(format('select pg_temp.doc(''simulacro_borrar'', ''{"id":%s}'')', pg_temp.de('s')), '22023', null, 'ni lo borra');
select pg_temp.soy('gB'); select throws_ok(format('select pg_temp.doc(''simulacro'', ''{"id":%s}'')', pg_temp.de('s')), '22023', null, 'B tampoco');
select pg_temp.soy('uAna');
select throws_ok('select pg_temp.doc(''datos'')', '42501', null, 'un estudiante no entra a docencia');
select is(jsonb_array_length(public.mi_institucion() -> 'simulacros'), 2, 'Ana ve los suyos');
select is((select x ->> 'estado' from jsonb_array_elements(public.mi_institucion() -> 'simulacros') x where x ->> 'id' = pg_temp.de('s')), 'nuevo', 'sin presentar');
select throws_ok(format('select pg_temp.sim(''empezar'', ''{"id":%s}'')', pg_temp.de('sf')), '22023', null, 'no abre antes');
select throws_ok(format('select pg_temp.sim(''entregar'', ''{"id":%s,"respuestas":[0,1]}'')', pg_temp.de('s')), '22023', null, 'no entrega sin empezar');
insert into quien select 'x', pg_temp.sim('empezar', jsonb_build_object('id', pg_temp.de('s')))::text;
select ok(position('"r"' in pg_temp.de('x')) = 0 and position('suma' in pg_temp.de('x')) = 0, 'no viaja la respuesta');
select ok((pg_temp.de('x')::jsonb ->> 'segundos')::integer between 1795 and 1800, 'trae su tiempo');
select throws_ok(format('select pg_temp.sim(''revisar'', ''{"id":%s}'')', pg_temp.de('s')), '22023', null, 'no revisa sin entregar');
select throws_ok(format('select pg_temp.sim(''guardar'', ''{"id":%s,"respuestas":[0]}'')', pg_temp.de('s')), '22023', null, 'faltan respuestas');
select lives_ok(format('select pg_temp.sim(''guardar'', ''{"id":%s,"respuestas":[0,"z"],"salidas":2}'')', pg_temp.de('s')), 'guarda a medias');
select is(pg_temp.sim('empezar', jsonb_build_object('id', pg_temp.de('s'))) -> 'respuestas', '[0,-1]', 'y al volver sigue ahí');
select is(pg_temp.sim('entregar', jsonb_build_object('id', pg_temp.de('s'), 'respuestas', '[0,1]'::jsonb)) ->> 'ver', 'false', 'al entregar no se ve si es al cierre');
select lives_ok(format('select pg_temp.sim(''entregar'', ''{"id":%s,"respuestas":[3,3]}'')', pg_temp.de('s')), 'entregar otra vez no falla');
select throws_ok(format('select pg_temp.sim(''empezar'', ''{"id":%s}'')', pg_temp.de('s')), '22023', null, 'un solo intento');
select throws_ok(format('select pg_temp.sim(''revisar'', ''{"id":%s}'')', pg_temp.de('s')), '22023', null, 'ni ve respuestas antes del cierre');
select is((select x -> 'aciertos' from jsonb_array_elements(public.mi_institucion() -> 'simulacros') x where x ->> 'id' = pg_temp.de('s')), 'null', 'ni la nota');
select pg_temp.soy('uBeto'); select throws_ok(format('select pg_temp.sim(''empezar'', ''{"id":%s}'')', pg_temp.de('s')), '42501', null, 'otro grupo no');
select pg_temp.soy('uCaro'); select throws_ok(format('select pg_temp.sim(''empezar'', ''{"id":%s}'')', pg_temp.de('s')), '42501', null, 'otro colegio con el mismo grupo tampoco'); select is(public.mi_institucion() -> 'simulacros', '[]', 'ni lo ve');
select pg_temp.soy('dM');
select is(pg_temp.doc('datos') -> 'resultados' -> 0 -> 3, '2', 'la base califica (y no valió el segundo envío)');
select is(pg_temp.doc('datos') -> 'resultados' -> 0 -> 5, '2', 'y guarda las salidas');
select is(pg_temp.doc('simulacro', jsonb_build_object('id', pg_temp.de('s'))) -> 'resultados' -> 0 -> 'respuestas', '[0,1]', 'con lo que marcó');
select lives_ok(format('select pg_temp.doc(''simulacro_editar'', ''{"id":%s,"muestra":"entregar"}'')', pg_temp.de('s')), 'publica resultados');
select pg_temp.soy('uAna'); select is(pg_temp.sim('revisar', jsonb_build_object('id', pg_temp.de('s'))) ->> 'aciertos', '2', 'y Ana los ve');
select pg_temp.soy('dM'); select lives_ok(format('select pg_temp.doc(''intento_nuevo'', ''{"id":%s,"estudiante":%s}'')', pg_temp.de('s'), pg_temp.de('Ana Uno')), 'da otro intento');
select pg_temp.soy('uAna'); select lives_ok(format('select pg_temp.sim(''empezar'', ''{"id":%s}'')', pg_temp.de('s')), 'y Ana empieza de nuevo');
select pg_temp.sim('guardar', jsonb_build_object('id', pg_temp.de('s'), 'respuestas', '[0,0]'::jsonb));
reset role; update public.inst_resultados set limite = now() - interval '5 minutes'; set local role authenticated;
select lives_ok(format('select pg_temp.sim(''entregar'', ''{"id":%s,"respuestas":[0,1]}'')', pg_temp.de('s')), 'entrega tarde');
select is(pg_temp.sim('revisar', jsonb_build_object('id', pg_temp.de('s'))) ->> 'aciertos', '1', 'vale lo guardado a tiempo');

-- la clave no se ve mientras todavía se reciben respuestas
reset role; update public.inst_resultados set fin = null, limite = now() - interval '5 seconds'; set local role authenticated;
select lives_ok(format('select pg_temp.sim(''revisar'', ''{"id":%s}'')', pg_temp.de('s')), 'acabado el tiempo, revisa');
select is(pg_temp.sim('entregar', jsonb_build_object('id', pg_temp.de('s'), 'respuestas', '[0,1]'::jsonb)) ->> 'guardado', 'false', 'y ya no se recibe nada');
select is(pg_temp.sim('revisar', jsonb_build_object('id', pg_temp.de('s'))) ->> 'aciertos', '1', 'la nota no cambió');

-- ---------- observaciones y avisos ----------
select pg_temp.soy('dM');
select lives_ok(format('select pg_temp.doc(''observacion_guardar'', ''{"componente":"matematicas","estudiante":%s,"tipo":"logro","texto":"Va muy bien"}'')', pg_temp.de('Ana Uno')), 'observa');
select throws_ok(format('select pg_temp.doc(''observacion_guardar'', ''{"componente":"lectura","estudiante":%s,"texto":"xx"}'')', pg_temp.de('Ana Uno')), '22023', null, 'no en otro componente');
select throws_ok(format('select pg_temp.doc(''observacion_guardar'', ''{"componente":"matematicas","estudiante":%s,"texto":"xx"}'')', pg_temp.de('Caro Tres')), '22023', null, 'ni a otro colegio');
select lives_ok(format('select pg_temp.doc(''aviso_guardar'', ''{"componente":"matematicas","grupos":["11B"],"texto":"Traer regla","hasta":"%s"}'')', current_date + 3), 'avisa a 11B');
select lives_ok(format('select pg_temp.doc(''aviso_guardar'', ''{"componente":"matematicas","estudiante":%s,"texto":"Solo Ana","hasta":"%s"}'')', pg_temp.de('Ana Uno'), current_date + 3), 'y a Ana');
insert into quien select 'ob', pg_temp.doc('datos') -> 'observaciones' -> 0 ->> 'id'; insert into quien select 'av', pg_temp.doc('datos') -> 'avisos' -> 0 ->> 'id';
select pg_temp.soy('dL'); select is(pg_temp.doc('datos') -> 'observaciones', '[]', 'lectura no lee las de matemáticas'); select is(pg_temp.doc('datos') -> 'avisos', '[]', 'ni los avisos');
select throws_ok(format('select pg_temp.doc(''observacion_borrar'', ''{"id":%s}'')', pg_temp.de('ob')), '22023', null, 'ni las borra'); select throws_ok(format('select pg_temp.doc(''aviso_borrar'', ''{"id":%s}'')', pg_temp.de('av')), '22023', null, 'ni el aviso');
select pg_temp.soy('gB'); select throws_ok(format('select pg_temp.doc(''observacion_borrar'', ''{"id":%s}'')', pg_temp.de('ob')), '22023', null, 'B tampoco');
select pg_temp.soy('uBeto'); select is(public.mi_institucion() -> 'avisos' -> 0 ->> 'texto', 'Traer regla', 'Beto ve el de su grupo'); select is(jsonb_array_length(public.mi_institucion() -> 'avisos'), 1, 'y no el de Ana');
select ok(position('Va muy bien' in public.mi_institucion()::text) = 0, 'las observaciones no llegan al estudiante');

-- ---------- el docente en la app (migración 4) ----------
reset role; update public.instituciones set cursos = '{preicfes,algebra}' where id = pg_temp.de('A')::uuid; set local role authenticated;
select pg_temp.soy('dM'); select is((select string_agg(x ->> 'curso', ',') from jsonb_array_elements(public.mi_institucion() -> 'accesos') x), 'preicfes', 'responsable: solo el Preicfes');
select is(public.mi_institucion() -> 'equipo' -> 0 -> 'componentes', '["matematicas"]', 'y su componente');
select pg_temp.soy('gA'); select is(jsonb_array_length(public.mi_institucion() -> 'accesos'), 2, 'el gestor, todo el contrato'); select is(public.mi_institucion() -> 'equipo' -> 0 ->> 'papel', 'gestor', 'y su papel');
select pg_temp.soy('uAna'); select is(public.mi_institucion() -> 'equipo', '[]', 'un estudiante no es del equipo');
select throws_ok('select * from privado.inst_cursos(auth.uid())', '42501', null, 'auxiliar cerrada');

-- ---------- cambios de grupo y de equipo ----------
select pg_temp.soy('dM'); insert into quien select 'sd', pg_temp.doc('simulacro_crear', pg_temp.nuevo('matematicas', '["11A","11B"]', '-1 hour', '1 day')::jsonb) ->> 'id';
select pg_temp.soy('gA'); select pg_temp.doc('asignar', jsonb_build_object('componente', 'matematicas', 'grupos', '["11B"]'::jsonb, 'gestor', pg_temp.de('r2')));
select pg_temp.soy('dM'); select throws_ok(format('select pg_temp.doc(''simulacro_borrar'', ''{"id":%s}'')', pg_temp.de('sd')), '22023', null, 'no borra lo que otro también responde');
select pg_temp.soy('gA'); select pg_temp.doc('simulacro_borrar', jsonb_build_object('id', pg_temp.de('sd'))); select pg_temp.doc('asignar', jsonb_build_object('componente', 'matematicas', 'grupos', '["11B"]'::jsonb, 'gestor', pg_temp.de('r')));
select pg_temp.soy('gA'); select pg_temp.inst('grupo_renombrar', '{"grupo":"11A","nuevo":"11-1"}');
select pg_temp.soy('dM'); select ok(pg_temp.doc('datos') -> 'asignaciones' @> '[{"grupo":"11-1"}]', 'sigue responsable al renombrar'); select is(jsonb_array_length(pg_temp.doc('datos') -> 'simulacros'), 2, 'y con sus simulacros');
select pg_temp.soy('gA'); select pg_temp.inst('equipo_guardar', jsonb_build_object('id', pg_temp.de('r'), 'nombre', 'Mate A', 'papel', 'docente', 'grupos', '["11B"]'::jsonb));
select pg_temp.soy('dM'); select is(pg_temp.doc('datos') -> 'simulacros', '[]', 'sin el grupo ya no ve sus simulacros'); select is(pg_temp.doc('datos') -> 'resultados', '[]', 'ni resultados');
select throws_ok(format('select pg_temp.doc(''simulacro_editar'', ''{"id":%s,"titulo":"Otro"}'')', pg_temp.de('s')), '22023', null, 'ni lo edita');
select pg_temp.soy('gA'); select pg_temp.inst('equipo_estado', jsonb_build_object('id', pg_temp.de('r2'), 'si', false));
select pg_temp.soy('dL'); select throws_ok('select pg_temp.doc(''datos'')', '42501', null, 'sin acceso no entra');
select pg_temp.soy('gA'); select ok(not (pg_temp.doc('datos') -> 'asignaciones' @> '[{"componente":"lectura"}]'), 'ni figura como responsable');
select pg_temp.inst('grupo_renombrar', '{"grupo":"11-1","nuevo":"11B"}');
select ok(not exists (select 1 from jsonb_array_elements(pg_temp.doc('datos') -> 'simulacros') x where (select count(*) <> count(distinct q) from jsonb_array_elements_text(x -> 'grupos') q)), 'juntar grupos no repite');
select lives_ok('select pg_temp.doc(''asignar'', ''{"componente":"matematicas","grupos":["11-1"]}'')', 'se puede quitar un grupo que ya no existe');
reset role; update public.instituciones set estado = 'pausa' where id = pg_temp.de('A')::uuid; set local role authenticated;
select pg_temp.soy('dM'); select lives_ok('select pg_temp.doc(''datos'')', 'en pausa consulta'); select throws_ok(format('select pg_temp.doc(''aviso_guardar'', ''{"componente":"matematicas","grupos":["11B"],"texto":"hola","hasta":"%s"}'')', current_date + 3), '22023', null, 'pero no cambia');
select pg_temp.soy('uAna'); select throws_ok(format('select pg_temp.sim(''empezar'', ''{"id":%s}'')', pg_temp.de('sf')), '42501', null, 'en pausa no hay simulacros');
select * from finish();
rollback;
