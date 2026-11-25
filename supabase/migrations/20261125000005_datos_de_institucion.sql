-- Los datos de docentes y estudiantes de una institución los cambian el gestor (desde el portal) o Zuka, no ellos. Y la app sabe qué mostrar
-- en «Tú» (spec 2026-11-25-roles-de-institucion). Se puede correr más de una vez.

-- ¿Sus datos los maneja su institución? Miembro activo con contrato sin terminar. Quien además compró un curso por su cuenta y lo tiene
-- vigente sigue manejando los suyos (es un cliente propio).
create or replace function privado.inst_fija(p_uid uuid) returns boolean
language sql stable security definer set search_path = ''
as $$
  select (exists (select 1 from public.codigos k join public.inst_estudiantes e on e.codigo = k.codigo and e.activo join public.instituciones i on i.id = e.institucion
      where k.usado_por = p_uid and i.hasta >= (now() at time zone 'America/Bogota')::date)
      and not exists (select 1 from public.accesos a where a.usuario = p_uid and a.tipo = 'pago' and a.hasta > now()))
    or exists (select 1 from public.codigos k join public.inst_gestores g on g.codigo = k.codigo and g.activo join public.instituciones i on i.id = g.institucion
      where k.usado_por = p_uid and i.hasta >= (now() at time zone 'America/Bogota')::date)
$$;
revoke all on function privado.inst_fija(uuid) from public, anon, authenticated;

create or replace function privado.perfil_fijo() returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  if (select auth.uid()) = new.id and coalesce(current_setting('zuka.equipo', true), '') <> '1' and not privado.es_admin()
    and (new.nombre, new.telefono, new.correo, new.genero, new.edad, new.ciudad, new.ocupacion, new.institucion, new.meta, new.presentacion, new.horas, new.dificultad, new.medio)
      is distinct from (old.nombre, old.telefono, old.correo, old.genero, old.edad, old.ciudad, old.ocupacion, old.institucion, old.meta, old.presentacion, old.horas, old.dificultad, old.medio)
    and not (old.nombre = '' and (new.telefono, new.correo, new.genero, new.edad, new.ciudad, new.ocupacion, new.institucion, new.meta) is not distinct from (old.telefono, old.correo, old.genero, old.edad, old.ciudad, old.ocupacion, old.institucion, old.meta))
    and privado.inst_fija(new.id) then
    raise exception 'Tus datos los cambia el gestor de tu institución' using errcode = '42501';
  end if;
  return new;
end $$;
revoke all on function privado.perfil_fijo() from public, anon, authenticated;
drop trigger if exists perfil_fijo on public.perfiles;
create trigger perfil_fijo before update on public.perfiles for each row execute function privado.perfil_fijo();

-- Lo que el gestor (o Zuka) cambia en el portal es lo que ve la persona: su nombre pasa a su cuenta.
-- ¿La cuenta es la de esa persona de la institución? (no una cuenta propia con su código añadido)
create or replace function privado.inst_nombra(p_uid uuid, p_codigo text, p_equipo boolean) returns boolean
language sql stable security definer set search_path = ''
as $$
  select privado.inst_fija(p_uid) and case when p_equipo
    then exists (select 1 from public.perfiles q where q.id = p_uid and q.rol = 'gestor') and not exists (select 1 from public.codigos k join public.inst_gestores g on g.codigo = k.codigo and g.activo where k.usado_por = p_uid and k.codigo <> p_codigo)
    else not privado.inst_ajena(p_uid, p_codigo) end
$$;
revoke all on function privado.inst_nombra(uuid, text, boolean) from public, anon, authenticated;
create or replace function privado.inst_nombre() returns trigger
language plpgsql security definer set search_path = ''
as $$
declare v_uid uuid;
begin
  if tg_op = 'UPDATE' and new.nombre = old.nombre and new.codigo is not distinct from old.codigo and new.activo = old.activo then return null; end if;
  if not new.activo then return null; end if;   -- un retirado ya maneja lo suyo
  select k.usado_por into v_uid from public.codigos k where k.codigo = new.codigo;
  if v_uid is not null and privado.inst_nombra(v_uid, new.codigo, tg_table_name = 'inst_gestores') then
    perform set_config('zuka.equipo', '1', true);
    update public.perfiles set nombre = new.nombre where id = v_uid and nombre is distinct from new.nombre;
    perform set_config('zuka.equipo', '', true);
  end if;
  return null;
end $$;
revoke all on function privado.inst_nombre() from public, anon, authenticated;
drop trigger if exists inst_nombre on public.inst_estudiantes;
create trigger inst_nombre after insert or update of nombre, codigo, activo on public.inst_estudiantes for each row execute function privado.inst_nombre();
drop trigger if exists inst_nombre on public.inst_gestores;
create trigger inst_nombre after insert or update of nombre, codigo, activo on public.inst_gestores for each row execute function privado.inst_nombre();

-- La app: qué institución, qué persona y qué contrato.
create or replace function privado.mi_institucion() returns jsonb
language sql stable security definer set search_path = ''
as $$
  with yo as (select e.*, i.nombre as colegio, i.cursos as contrato from public.codigos k
      join public.inst_estudiantes e on e.codigo = k.codigo and e.activo join public.instituciones i on i.id = e.institucion and privado.inst_vigente(i) where k.usado_por = (select auth.uid()))
  select jsonb_build_object(
    'fija', privado.inst_fija((select auth.uid())),
    'equipo', coalesce((select jsonb_agg(jsonb_build_object('institucion', i.nombre, 'ciudad', i.ciudad, 'papel', g.papel, 'nombre', g.nombre, 'correo', g.correo, 'grupos', g.grupos,
        'componentes', (select coalesce(jsonb_agg(distinct a.componente), '[]') from public.inst_asignaciones a where a.gestor = g.id))
        || case when g.papel = 'gestor' then jsonb_build_object('tipo', i.tipo, 'nit', i.nit, 'correo_inst', i.correo, 'telefono', i.telefono, 'contacto', i.contacto, 'desde', i.desde, 'hasta', i.hasta, 'vigente', privado.inst_vigente(i), 'cupos', i.cupos, 'cursos', i.cursos,
          'usados', (select count(*) from public.inst_estudiantes s where s.institucion = i.id and s.activo), 'docentes', (select count(*) from public.inst_gestores d where d.institucion = i.id and d.activo and d.papel = 'docente')) else '{}' end order by g.id)
      from public.codigos k join public.inst_gestores g on g.codigo = k.codigo and g.activo join public.instituciones i on i.id = g.institucion where k.usado_por = (select auth.uid()) and not k.bloqueado), '[]'),
    'persona', (select jsonb_build_object('nombre', y.nombre, 'grupo', y.grupo, 'documento', y.identificador, 'institucion', y.colegio) from yo y order by y.id limit 1),
    'instituciones', coalesce((select jsonb_agg(distinct colegio) from yo), '[]'),
    'accesos', coalesce((select jsonb_agg(jsonb_build_object('curso', t.curso, 'tipo', 'pago', 'desde', t.desde::timestamp at time zone 'America/Bogota', 'hasta', (t.hasta + 1)::timestamp at time zone 'America/Bogota' - interval '1 second', 'institucion', i.nombre))
      from (select distinct on (curso) * from privado.inst_cursos((select auth.uid())) order by curso, hasta desc) t join public.instituciones i on i.id = t.institucion), '[]'),
    'metas', coalesce((select jsonb_agg(jsonb_build_object('id', m.id, 'titulo', m.titulo, 'curso', m.curso, 'lecciones', m.lecciones, 'hasta', m.hasta, 'institucion', e.colegio) order by m.hasta)
      from yo e join public.inst_metas m on m.institucion = e.institucion and (m.grupo = '' or m.grupo = e.grupo) and m.curso = any (e.cursos) and m.curso = any (e.contrato)
        and m.hasta >= (now() at time zone 'America/Bogota')::date - 3), '[]'),
    'simulacros', coalesce((select jsonb_agg(jsonb_build_object('id', s.id, 'titulo', s.titulo, 'componente', s.componente, 'n', s.n, 'minutos', s.minutos, 'abre', s.abre, 'cierra', s.cierra, 'autor', s.autor, 'muestra', s.muestra,
        'estado', case when r.simulacro is null then 'nuevo' when r.fin is null and r.limite >= now() then 'curso' else 'entregado' end,
        'limite', case when r.fin is null then r.limite end, 'ver', s.muestra = 'entregar' or (s.muestra = 'cerrar' and now() >= s.cierra),
        'aciertos', case when r.simulacro is not null and (r.fin is not null or r.limite < now()) and (s.muestra = 'entregar' or (s.muestra = 'cerrar' and now() >= s.cierra)) then r.aciertos end) order by s.cierra)
      from yo e join public.inst_simulacros s on s.institucion = e.institucion and s.cierra > now() - interval '21 days' and 'preicfes' = any (e.cursos) and 'preicfes' = any (e.contrato)
      left join public.inst_resultados r on r.simulacro = s.id and r.estudiante = e.id
      where e.grupo = any (s.grupos) or r.simulacro is not null), '[]'),
    'avisos', coalesce((select jsonb_agg(jsonb_build_object('id', a.id, 'componente', a.componente, 'texto', a.texto, 'autor', a.autor, 'en', a.creado_en) order by a.creado_en desc)
      from yo e join public.inst_avisos a on a.institucion = e.institucion and a.hasta >= (now() at time zone 'America/Bogota')::date and 'preicfes' = any (e.cursos) and 'preicfes' = any (e.contrato) and (a.estudiante = e.id or (a.estudiante is null and e.grupo = any (a.grupos)))), '[]'))
$$;

-- Un código trae nombre y celular cuando se añade: eso no es cambiar los datos. Y las evaluaciones dicen cuál son (el docente ve las suyas).
do $$
declare v_def text; v_a text := 'update public.perfiles set nombre = case when nombre = '''' then v.nombre else nombre end,'; v_b text := 'where id = p_uid;'; v_i integer;
begin
  v_def := replace(pg_get_functiondef('privado.codigo_vincular(text, uuid)'::regprocedure), chr(13), '');
  if position('zuka.equipo' in v_def) = 0 then
    v_i := position(v_a in v_def); if v_i = 0 then raise exception 'privado.codigo_vincular: no se encontró dónde'; end if;
    v_def := left(v_def, v_i - 1) || 'perform set_config(''zuka.equipo'', ''1'', true);' || chr(10) || '  ' || regexp_replace(substr(v_def, v_i), v_b, v_b || ' perform set_config(''zuka.equipo'', '''', true);');
    execute v_def;
  end if;
  v_def := replace(pg_get_functiondef('privado.institucion(text, jsonb)'::regprocedure), chr(13), '');
  if position('''id'', l.id, ''titulo'', l.titulo, ''curso'', l.curso, ''nota''' in v_def) = 0 then
    if position('jsonb_build_object(''titulo'', l.titulo, ''curso'', l.curso, ''nota''' in v_def) = 0 then raise exception 'privado.institucion: no se encontraron las evaluaciones'; end if;
    execute replace(v_def, 'jsonb_build_object(''titulo'', l.titulo, ''curso'', l.curso, ''nota''', 'jsonb_build_object(''id'', l.id, ''titulo'', l.titulo, ''curso'', l.curso, ''nota''');
  end if;
end $$;

-- Los nombres que ya están.
do $$
begin
  perform set_config('zuka.equipo', '1', true);
  update public.perfiles p set nombre = t.nombre from (
    select k.usado_por, e.nombre, e.codigo, false as equipo from public.inst_estudiantes e join public.codigos k on k.codigo = e.codigo where e.activo and k.usado_por is not null
    union all select k.usado_por, g.nombre, g.codigo, true from public.inst_gestores g join public.codigos k on k.codigo = g.codigo where g.activo and k.usado_por is not null) t
  where p.id = t.usado_por and p.nombre is distinct from t.nombre and privado.inst_nombra(t.usado_por, t.codigo, t.equipo);
  perform set_config('zuka.equipo', '', true);
end $$;
notify pgrst, 'reload schema';
