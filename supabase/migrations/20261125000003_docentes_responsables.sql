-- Docente responsable de cada componente del Preicfes: asignaciones, simulacros, observaciones y avisos.
-- Spec: docs/superpowers/specs/2026-11-25-docente-responsable.md. Se puede correr más de una vez.

-- ---------- tablas ----------
create table if not exists public.inst_asignaciones (
  institucion uuid not null references public.instituciones (id) on delete cascade,
  componente text not null check (componente in ('matematicas', 'lectura', 'sociales', 'ciencias', 'ingles')),
  grupo text not null check (char_length(grupo) between 1 and 40),
  gestor bigint not null references public.inst_gestores (id) on delete cascade,
  creado_en timestamptz not null default now(),
  primary key (institucion, componente, grupo)        -- un responsable por componente y grupo
);
create index if not exists inst_asignaciones_gestor_idx on public.inst_asignaciones (gestor);

create table if not exists public.inst_simulacros (
  id bigint generated always as identity primary key,
  institucion uuid not null references public.instituciones (id) on delete cascade,
  componente text not null check (componente in ('matematicas', 'lectura', 'sociales', 'ciencias', 'ingles')),
  titulo text not null check (char_length(titulo) between 2 and 100),
  preguntas jsonb not null,                           -- [{ k, m, l, q, o: [4], r, e, d }]: copia fija; d apunta a textos
  textos jsonb not null default '[]',                 -- [{ title, paras: [] }]
  n integer not null check (n between 1 and 60),
  minutos integer not null check (minutos between 5 and 240),
  grupos text[] not null check (cardinality(grupos) between 1 and 60),
  abre timestamptz not null,
  cierra timestamptz not null,
  muestra text not null default 'cerrar' check (muestra in ('entregar', 'cerrar', 'nunca')),
  gestor bigint references public.inst_gestores (id) on delete set null,
  autor text not null default '',
  creado_en timestamptz not null default now(),
  check (cierra > abre)
);
create index if not exists inst_simulacros_institucion_idx on public.inst_simulacros (institucion, cierra);
create index if not exists inst_simulacros_gestor_idx on public.inst_simulacros (gestor);

create table if not exists public.inst_resultados (
  simulacro bigint not null references public.inst_simulacros (id) on delete cascade,
  estudiante bigint not null references public.inst_estudiantes (id) on delete cascade,
  inicio timestamptz not null default now(),
  limite timestamptz not null,                        -- inicio + minutos, sin pasar del cierre
  fin timestamptz,
  respuestas integer[] not null,                      -- una por pregunta: 0 a 3, o -1 en blanco
  aciertos integer not null default 0,
  guardado_en timestamptz,
  salidas integer not null default 0,                 -- veces que salió de la pantalla
  primary key (simulacro, estudiante)
);
create index if not exists inst_resultados_estudiante_idx on public.inst_resultados (estudiante);

create table if not exists public.inst_observaciones (
  id bigint generated always as identity primary key,
  institucion uuid not null references public.instituciones (id) on delete cascade,
  estudiante bigint not null references public.inst_estudiantes (id) on delete cascade,
  componente text not null check (componente in ('matematicas', 'lectura', 'sociales', 'ciencias', 'ingles')),
  tipo text not null default 'nota' check (tipo in ('nota', 'logro', 'compromiso', 'llamada')),
  texto text not null check (char_length(texto) between 2 and 600),
  gestor bigint references public.inst_gestores (id) on delete set null,
  autor text not null default '',
  creado_en timestamptz not null default now()
);
create index if not exists inst_observaciones_estudiante_idx on public.inst_observaciones (estudiante);
create index if not exists inst_observaciones_institucion_idx on public.inst_observaciones (institucion);
create index if not exists inst_observaciones_gestor_idx on public.inst_observaciones (gestor);

create table if not exists public.inst_avisos (
  id bigint generated always as identity primary key,
  institucion uuid not null references public.instituciones (id) on delete cascade,
  componente text not null check (componente in ('matematicas', 'lectura', 'sociales', 'ciencias', 'ingles')),
  grupos text[] not null default '{}',
  estudiante bigint references public.inst_estudiantes (id) on delete cascade,   -- o solo para uno
  texto text not null check (char_length(texto) between 2 and 400),
  hasta date not null,
  gestor bigint references public.inst_gestores (id) on delete set null,
  autor text not null default '',
  creado_en timestamptz not null default now()
);
create index if not exists inst_avisos_institucion_idx on public.inst_avisos (institucion, hasta);
create index if not exists inst_avisos_estudiante_idx on public.inst_avisos (estudiante);
create index if not exists inst_avisos_gestor_idx on public.inst_avisos (gestor);

alter table public.inst_asignaciones enable row level security;
alter table public.inst_simulacros enable row level security;
alter table public.inst_resultados enable row level security;
alter table public.inst_observaciones enable row level security;
alter table public.inst_avisos enable row level security;
revoke all on public.inst_asignaciones, public.inst_simulacros, public.inst_resultados, public.inst_observaciones, public.inst_avisos from public, anon, authenticated;

-- Si a un docente le quitan un grupo, deja de ser responsable ahí.
create or replace function privado.inst_docente_grupos() returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  if not new.activo then delete from public.inst_asignaciones where gestor = new.id; end if;   -- sin acceso ya no responde
  if new.papel = 'docente' then delete from public.inst_asignaciones where gestor = new.id and not (grupo = any (new.grupos)); end if;
  return null;
end $$;
drop trigger if exists inst_docente_grupos on public.inst_gestores;
create trigger inst_docente_grupos after update of grupos, papel, activo on public.inst_gestores for each row execute function privado.inst_docente_grupos();

-- ---------- lo que ya existía ----------
do $$
declare v_def text; v_new text; x text[];
begin
  v_def := replace(pg_get_functiondef('privado.institucion(text, jsonb)'::regprocedure), chr(13), ''); v_new := v_def;
  if position('inst_asignaciones' in v_def) > 0 then return; end if;   -- ya está aplicada
  foreach x slice 1 in array array[
    -- el código nuevo dice de quién es, para asignarle su componente enseguida
    ['return jsonb_build_object(''ok'', true, ''codigo'', v_cod);
    end if;
    if (p ->> ''id'')::bigint = g.id', 'return jsonb_build_object(''ok'', true, ''codigo'', v_cod, ''id'', v_g.id);
    end if;
    if (p ->> ''id'')::bigint = g.id'],
    ['''grupos'', coalesce(to_jsonb(v_grupos), ''[]'')),', '''grupos'', coalesce(to_jsonb(v_grupos), ''[]''), ''id'', g.id),'],
    -- renombrar o juntar grupos: los responsables y los simulacros van con el grupo (antes de tocar al docente)
    ['    update public.inst_gestores set grupos = array_replace(grupos, p ->> ''grupo'', left(btrim(p ->> ''nuevo''), 40)) where institucion = i.id;', '    delete from public.inst_asignaciones a where a.institucion = i.id and a.grupo = p ->> ''grupo'' and left(btrim(p ->> ''nuevo''), 40) <> p ->> ''grupo''
      and exists (select 1 from public.inst_asignaciones b where b.institucion = i.id and b.componente = a.componente and b.grupo = left(btrim(p ->> ''nuevo''), 40));
    update public.inst_asignaciones set grupo = left(btrim(p ->> ''nuevo''), 40) where institucion = i.id and grupo = p ->> ''grupo'';
    update public.inst_simulacros set grupos = (select array_agg(distinct t) from unnest(array_replace(grupos, p ->> ''grupo'', left(btrim(p ->> ''nuevo''), 40))) t) where institucion = i.id and p ->> ''grupo'' = any (grupos);
    update public.inst_avisos set grupos = (select array_agg(distinct t) from unnest(array_replace(grupos, p ->> ''grupo'', left(btrim(p ->> ''nuevo''), 40))) t) where institucion = i.id and p ->> ''grupo'' = any (grupos);
    update public.inst_gestores set grupos = (select array_agg(distinct t) from unnest(array_replace(grupos, p ->> ''grupo'', left(btrim(p ->> ''nuevo''), 40))) t) where institucion = i.id and p ->> ''grupo'' = any (grupos);']
  ] loop
    x := array[replace(x[1], chr(13), ''), replace(x[2], chr(13), '')];   -- el archivo puede traer saltos de Windows
    if position(x[1] in v_new) = 0 then raise exception 'privado.institucion: no se encontró %', x[1]; end if;
    v_new := replace(v_new, x[1], x[2]);
  end loop;
  execute v_new;
end $$;

-- ---------- docentes y gestores ----------
create or replace function privado.docencia(p_accion text, p jsonb) returns jsonb
language plpgsql volatile security definer set search_path = ''
as $$
declare
  v_hoy date := (now() at time zone 'America/Bogota')::date;
  i public.instituciones; g public.inst_gestores; v_admin boolean := privado.es_admin(); v_todo boolean;
  v_comp text; v_gs text[]; v_g public.inst_gestores; s public.inst_simulacros; e public.inst_estudiantes; x jsonb; v_n integer; v_id bigint; v_a timestamptz; v_c timestamptz; v_pre jsonb := '[]'; v_tx integer;
begin
  p := coalesce(p, '{}');
  select g1.* into g from public.inst_gestores g1 join public.codigos k on k.codigo = g1.codigo and not k.bloqueado
    join public.perfiles q on q.id = k.usado_por and not q.bloqueado
    where k.usado_por = auth.uid() and g1.activo order by g1.id limit 1;
  if v_admin and coalesce(p ->> 'institucion', '') <> '' then select * into i from public.instituciones where id = (p ->> 'institucion')::uuid;
  elsif g.id is not null then select * into i from public.instituciones where id = g.institucion; end if;
  if i.id is null then raise exception 'Esta cuenta no administra una institución' using errcode = '42501'; end if;
  v_todo := (v_admin and (g.id is null or g.institucion <> i.id)) or g.papel = 'gestor';

  -- ---- consultas ----
  if p_accion = 'datos' then
    return jsonb_build_object(
      'asignaciones', (select coalesce(jsonb_agg(jsonb_build_object('componente', a.componente, 'grupo', a.grupo, 'gestor', a.gestor, 'nombre', t.nombre) order by a.componente, a.grupo), '[]')
        from public.inst_asignaciones a join public.inst_gestores t on t.id = a.gestor where a.institucion = i.id and (v_todo or a.gestor = g.id)),
      'simulacros', (select coalesce(jsonb_agg(jsonb_build_object('id', t.id, 'componente', t.componente, 'titulo', t.titulo, 'n', t.n, 'minutos', t.minutos, 'grupos', t.grupos, 'abre', t.abre, 'cierra', t.cierra, 'muestra', t.muestra, 'autor', t.autor, 'mio', v_todo or (coalesce(t.gestor = g.id, false) and not exists (select 1 from unnest(t.grupos) q where not exists (select 1 from public.inst_asignaciones a where a.gestor = g.id and a.componente = t.componente and a.grupo = q)))) order by t.cierra desc), '[]')
        from public.inst_simulacros t where t.institucion = i.id and t.cierra > now() - interval '2 years'
          and (v_todo or exists (select 1 from public.inst_asignaciones a where a.gestor = g.id and a.componente = t.componente and a.grupo = any (t.grupos)))),
      -- [simulacro, estudiante, 0 en curso | 1 entregado, aciertos, segundos, salidas]
      'resultados', (select coalesce(jsonb_agg(jsonb_build_array(r.simulacro, r.estudiante, case when r.fin is not null or r.limite < now() then 1 else 0 end, r.aciertos, round(extract(epoch from coalesce(r.fin, r.limite) - r.inicio))::integer, r.salidas)), '[]')
        from public.inst_resultados r join public.inst_simulacros t on t.id = r.simulacro and t.institucion = i.id and t.cierra > now() - interval '2 years'
        join public.inst_estudiantes k on k.id = r.estudiante and k.activo
        where v_todo or exists (select 1 from public.inst_asignaciones a where a.gestor = g.id and a.componente = t.componente and a.grupo = k.grupo)),
      'observaciones', (select coalesce(jsonb_agg(jsonb_build_object('id', o.id, 'estudiante', o.estudiante, 'componente', o.componente, 'tipo', o.tipo, 'texto', o.texto, 'autor', o.autor, 'en', o.creado_en, 'mia', v_todo or coalesce(o.gestor = g.id, false)) order by o.creado_en desc), '[]')
        from public.inst_observaciones o join public.inst_estudiantes k on k.id = o.estudiante
        where o.institucion = i.id and (v_todo or exists (select 1 from public.inst_asignaciones a where a.gestor = g.id and a.componente = o.componente and a.grupo = k.grupo))),
      'avisos', (select coalesce(jsonb_agg(jsonb_build_object('id', t.id, 'componente', t.componente, 'grupos', t.grupos, 'estudiante', t.estudiante, 'texto', t.texto, 'hasta', t.hasta, 'autor', t.autor, 'en', t.creado_en, 'mio', v_todo or coalesce(t.gestor = g.id, false)) order by t.creado_en desc), '[]')
        from public.inst_avisos t left join public.inst_estudiantes k on k.id = t.estudiante
        where t.institucion = i.id and t.hasta >= v_hoy - 60 and (v_todo or exists (select 1 from public.inst_asignaciones a where a.gestor = g.id and a.componente = t.componente and (a.grupo = any (t.grupos) or a.grupo = k.grupo)))));

  elsif p_accion = 'simulacro' then
    select t.* into s from public.inst_simulacros t where t.id = (p ->> 'id')::bigint and t.institucion = i.id
      and (v_todo or exists (select 1 from public.inst_asignaciones a where a.gestor = g.id and a.componente = t.componente and a.grupo = any (t.grupos)));
    if s.id is null then raise exception 'No existe ese simulacro' using errcode = '22023'; end if;
    return jsonb_build_object('id', s.id, 'preguntas', s.preguntas, 'textos', s.textos,
      'resultados', (select coalesce(jsonb_agg(jsonb_build_object('estudiante', r.estudiante, 'entregado', r.fin is not null or r.limite < now(), 'respuestas', r.respuestas, 'aciertos', r.aciertos, 'segundos', round(extract(epoch from coalesce(r.fin, r.limite) - r.inicio))::integer, 'salidas', r.salidas, 'inicio', r.inicio)), '[]')
        from public.inst_resultados r join public.inst_estudiantes k on k.id = r.estudiante and k.activo
        where r.simulacro = s.id and (v_todo or exists (select 1 from public.inst_asignaciones a where a.gestor = g.id and a.componente = s.componente and a.grupo = k.grupo))));
  end if;

  -- ---- cambios ----
  if not privado.inst_vigente(i) and not v_admin then raise exception 'El contrato no está vigente: puedes consultar, pero no hacer cambios' using errcode = '22023'; end if;
  if octet_length(p::text) > 600000 then raise exception 'El simulacro es muy largo: usa menos preguntas' using errcode = '22023'; end if;
  if exists (select 1 from unnest(array['grupos', 'preguntas', 'textos']) k where p ? k and jsonb_typeof(p -> k) <> 'array') then raise exception 'Revisa los datos' using errcode = '22023'; end if;
  if p ? 'grupos' then select array_agg(distinct left(btrim(t), 40)) into v_gs from jsonb_array_elements_text(p -> 'grupos') t where btrim(t) <> ''; end if;
  v_comp := p ->> 'componente';
  if v_comp is not null and v_comp not in ('matematicas', 'lectura', 'sociales', 'ciencias', 'ingles') then raise exception 'Elige el componente' using errcode = '22023'; end if;
  if p_accion in ('simulacro_crear', 'aviso_guardar', 'observacion_guardar', 'asignar') and not ('preicfes' = any (i.cursos)) then raise exception 'El Preicfes no está en el contrato' using errcode = '22023'; end if;

  if p_accion = 'asignar' then
    if not v_todo then raise exception 'Solo el gestor puede hacer este cambio' using errcode = '42501'; end if;
    if v_comp is null or v_gs is null then raise exception 'Elige el componente y al menos un grupo' using errcode = '22023'; end if;
    if coalesce(p ->> 'gestor', '') <> '' and exists (select 1 from unnest(v_gs) t where not exists (select 1 from public.inst_estudiantes k where k.institucion = i.id and k.grupo = t)) then raise exception 'Ese grupo no existe' using errcode = '22023'; end if;
    if coalesce(p ->> 'gestor', '') = '' then
      delete from public.inst_asignaciones where institucion = i.id and componente = v_comp and grupo = any (v_gs);
    else
      select * into v_g from public.inst_gestores where id = (p ->> 'gestor')::bigint and institucion = i.id and activo;
      if v_g.id is null then raise exception 'Esa persona no tiene acceso' using errcode = '22023'; end if;
      if v_g.papel = 'docente' then update public.inst_gestores set grupos = (select array_agg(distinct t) from unnest(grupos || v_gs) t) where id = v_g.id and not (v_gs <@ grupos); end if;
      insert into public.inst_asignaciones (institucion, componente, grupo, gestor) select i.id, v_comp, t, v_g.id from unnest(v_gs) t
        on conflict (institucion, componente, grupo) do update set gestor = excluded.gestor, creado_en = now();
    end if;

  elsif p_accion = 'simulacro_crear' then
    if v_comp is null or v_gs is null then raise exception 'Elige al menos un grupo' using errcode = '22023'; end if;
    if not v_todo and exists (select 1 from unnest(v_gs) t where not exists (select 1 from public.inst_asignaciones a where a.gestor = g.id and a.componente = v_comp and a.grupo = t)) then raise exception 'Solo puedes asignarlo a los grupos de tu componente' using errcode = '42501'; end if;
    if char_length(btrim(coalesce(p ->> 'titulo', ''))) < 2 then raise exception 'Escribe el nombre del simulacro' using errcode = '22023'; end if;
    v_n := coalesce(jsonb_array_length(p -> 'preguntas'), 0); v_tx := coalesce(jsonb_array_length(p -> 'textos'), 0);
    if v_n not between 1 and 60 then raise exception 'Elige entre 1 y 60 preguntas' using errcode = '22023'; end if;
    for x in select * from jsonb_array_elements(p -> 'preguntas') loop
      if jsonb_typeof(x) <> 'object' or coalesce(jsonb_typeof(x -> 'q'), '') <> 'string' or char_length(x ->> 'q') not between 3 and 4000 or coalesce(jsonb_typeof(x -> 'o'), '') <> 'array' or coalesce(x ->> 'r', '') !~ '^[0-3]$' then raise exception 'Hay una pregunta incompleta' using errcode = '22023'; end if;
      if jsonb_array_length(x -> 'o') <> 4 or exists (select 1 from jsonb_array_elements(x -> 'o') o where jsonb_typeof(o) <> 'string' or char_length(o #>> '{}') not between 1 and 1200) then raise exception 'Cada pregunta lleva cuatro opciones' using errcode = '22023'; end if;
      if coalesce(x ->> 'd', '') <> '' and (x ->> 'd' !~ '^\d{1,2}$' or (x ->> 'd')::integer >= v_tx) then raise exception 'Hay una pregunta sin su texto' using errcode = '22023'; end if;
      v_pre := v_pre || jsonb_build_array(jsonb_build_object('k', left(coalesce(x ->> 'k', ''), 80), 'm', left(coalesce(x ->> 'm', ''), 60), 'l', left(coalesce(x ->> 'l', ''), 60), 'q', x ->> 'q', 'o', x -> 'o', 'r', (x ->> 'r')::integer, 'e', left(coalesce(x ->> 'e', ''), 2000), 'd', case when coalesce(x ->> 'd', '') <> '' then (x ->> 'd')::integer end));
    end loop;
    if exists (select 1 from jsonb_array_elements(coalesce(p -> 'textos', '[]')) t where jsonb_typeof(t) <> 'object' or coalesce(jsonb_typeof(t -> 'paras'), '') <> 'array') then raise exception 'Revisa los textos' using errcode = '22023'; end if;
    begin v_a := (p ->> 'abre')::timestamp at time zone 'America/Bogota'; v_c := (p ->> 'cierra')::timestamp at time zone 'America/Bogota';
    exception when others then raise exception 'Revisa las fechas' using errcode = '22023'; end;
    if v_a is null or v_c is null or v_c <= v_a or v_c <= now() then raise exception 'El cierre debe ser después de la apertura y de hoy' using errcode = '22023'; end if;
    if coalesce(p ->> 'minutos', '') !~ '^\d{1,3}$' or (p ->> 'minutos')::integer not between 5 and 240 then raise exception 'El tiempo va de 5 a 240 minutos' using errcode = '22023'; end if;
    if (select count(*) from public.inst_simulacros where institucion = i.id) >= 400 then raise exception 'Hay demasiados simulacros: borra los viejos' using errcode = '22023'; end if;
    insert into public.inst_simulacros (institucion, componente, titulo, preguntas, textos, n, minutos, grupos, abre, cierra, muestra, gestor, autor)
    values (i.id, v_comp, left(btrim(p ->> 'titulo'), 100), v_pre, (select coalesce(jsonb_agg(jsonb_build_object('title', left(coalesce(t ->> 'title', ''), 200), 'paras', t -> 'paras') order by o), '[]') from jsonb_array_elements(coalesce(p -> 'textos', '[]')) with ordinality u(t, o)),
      v_n, (p ->> 'minutos')::integer, v_gs, v_a, v_c, case when p ->> 'muestra' in ('entregar', 'cerrar', 'nunca') then p ->> 'muestra' else 'cerrar' end, case when g.institucion = i.id then g.id end, coalesce(case when g.institucion = i.id then g.nombre end, 'Zuka')) returning id into v_id;
    insert into public.inst_registro (institucion, quien, accion, detalle) values (i.id, coalesce(g.nombre, 'Zuka'), p_accion, jsonb_build_object('nombre', left(btrim(p ->> 'titulo'), 100)));
    return jsonb_build_object('ok', true, 'id', v_id);

  elsif p_accion in ('simulacro_editar', 'simulacro_borrar', 'intento_nuevo') then
    select t.* into s from public.inst_simulacros t where t.id = (p ->> 'id')::bigint and t.institucion = i.id
      and (v_todo or (t.gestor = g.id and not exists (select 1 from unnest(t.grupos) q where not exists (select 1 from public.inst_asignaciones a where a.gestor = g.id and a.componente = t.componente and a.grupo = q))));   -- si otro responde por alguno de esos grupos, solo el gestor
    if s.id is null then raise exception 'No puedes cambiar ese simulacro' using errcode = '22023'; end if;
    if p_accion = 'simulacro_borrar' then delete from public.inst_simulacros where id = s.id;
    elsif p_accion = 'intento_nuevo' then
      delete from public.inst_resultados r using public.inst_estudiantes k where r.simulacro = s.id and r.estudiante = (p ->> 'estudiante')::bigint and k.id = r.estudiante and k.institucion = i.id
        and (v_todo or exists (select 1 from public.inst_asignaciones a where a.gestor = g.id and a.componente = s.componente and a.grupo = k.grupo));
      if not found then raise exception 'Ese estudiante no lo ha presentado' using errcode = '22023'; end if;
    else
      begin v_c := (p ->> 'cierra')::timestamp at time zone 'America/Bogota'; v_a := (p ->> 'abre')::timestamp at time zone 'America/Bogota';
      exception when others then raise exception 'Revisa las fechas' using errcode = '22023'; end;
      if coalesce(v_c, s.cierra) <= coalesce(v_a, s.abre) then raise exception 'El cierre debe ser después de la apertura' using errcode = '22023'; end if;
      update public.inst_simulacros set titulo = case when char_length(btrim(coalesce(p ->> 'titulo', ''))) >= 2 then left(btrim(p ->> 'titulo'), 100) else titulo end,
        abre = coalesce(v_a, abre), cierra = coalesce(v_c, cierra), muestra = case when p ->> 'muestra' in ('entregar', 'cerrar', 'nunca') then p ->> 'muestra' else muestra end where id = s.id;
      -- quien lo esté presentando no pasa del cierre nuevo, y recupera tiempo si se amplía
      update public.inst_resultados r set limite = least(r.inicio + make_interval(mins => s.minutos), coalesce(v_c, s.cierra)) where r.simulacro = s.id and r.fin is null and r.limite > now();
    end if;

  elsif p_accion = 'observacion_guardar' then
    select k.* into e from public.inst_estudiantes k where k.id = (p ->> 'estudiante')::bigint and k.institucion = i.id and (v_todo or exists (select 1 from public.inst_asignaciones a where a.gestor = g.id and a.componente = v_comp and a.grupo = k.grupo));
    if e.id is null or v_comp is null then raise exception 'No puedes escribir sobre ese estudiante' using errcode = '22023'; end if;
    if char_length(btrim(coalesce(p ->> 'texto', ''))) < 2 then raise exception 'Escribe la observación' using errcode = '22023'; end if;
    if (select count(*) from public.inst_observaciones where estudiante = e.id) >= 200 then raise exception 'Hay demasiadas observaciones: borra las viejas' using errcode = '22023'; end if;
    insert into public.inst_observaciones (institucion, estudiante, componente, tipo, texto, gestor, autor)
    values (i.id, e.id, v_comp, case when p ->> 'tipo' in ('nota', 'logro', 'compromiso', 'llamada') then p ->> 'tipo' else 'nota' end, left(btrim(p ->> 'texto'), 600), case when g.institucion = i.id then g.id end, coalesce(g.nombre, 'Zuka'));
    return jsonb_build_object('ok', true);   -- sin registro: es dato del estudiante

  elsif p_accion = 'observacion_borrar' then
    delete from public.inst_observaciones where id = (p ->> 'id')::bigint and institucion = i.id and (v_todo or gestor = g.id);
    if not found then raise exception 'No puedes borrar esa observación' using errcode = '22023'; end if;
    return jsonb_build_object('ok', true);

  elsif p_accion = 'aviso_guardar' then
    if char_length(btrim(coalesce(p ->> 'texto', ''))) < 2 then raise exception 'Escribe el aviso' using errcode = '22023'; end if;
    if coalesce(p ->> 'estudiante', '') <> '' then
      select k.* into e from public.inst_estudiantes k where k.id = (p ->> 'estudiante')::bigint and k.institucion = i.id and k.activo and (v_todo or exists (select 1 from public.inst_asignaciones a where a.gestor = g.id and a.componente = v_comp and a.grupo = k.grupo));
      if e.id is null or v_comp is null then raise exception 'No puedes escribirle a ese estudiante' using errcode = '22023'; end if;
      v_gs := '{}';
    elsif v_comp is null or v_gs is null then raise exception 'Elige al menos un grupo' using errcode = '22023';
    elsif not v_todo and exists (select 1 from unnest(v_gs) t where not exists (select 1 from public.inst_asignaciones a where a.gestor = g.id and a.componente = v_comp and a.grupo = t)) then raise exception 'Solo puedes escribir a los grupos de tu componente' using errcode = '42501'; end if;
    begin v_a := (coalesce(p ->> 'hasta', ''))::date; exception when others then raise exception 'Elige la fecha' using errcode = '22023'; end;
    if v_a::date < v_hoy or v_a::date > v_hoy + 90 then raise exception 'La fecha va de hoy a 90 días' using errcode = '22023'; end if;
    if (select count(*) from public.inst_avisos where institucion = i.id and hasta >= v_hoy) >= 300 then raise exception 'Hay demasiados avisos: borra los viejos' using errcode = '22023'; end if;
    insert into public.inst_avisos (institucion, componente, grupos, estudiante, texto, hasta, gestor, autor)
    values (i.id, v_comp, v_gs, e.id, left(btrim(p ->> 'texto'), 400), (p ->> 'hasta')::date, case when g.institucion = i.id then g.id end, coalesce(g.nombre, 'Zuka'));

  elsif p_accion = 'aviso_borrar' then
    delete from public.inst_avisos where id = (p ->> 'id')::bigint and institucion = i.id and (v_todo or gestor = g.id);
    if not found then raise exception 'No puedes borrar ese aviso' using errcode = '22023'; end if;
  else
    raise exception 'Acción desconocida: %', p_accion using errcode = '22023';
  end if;
  insert into public.inst_registro (institucion, quien, accion, detalle) values (i.id, coalesce(g.nombre, 'Zuka'), p_accion, jsonb_strip_nulls(jsonb_build_object('nombre', coalesce(s.titulo, v_g.nombre))));
  return jsonb_build_object('ok', true);
end $$;
create or replace function public.docencia(p_accion text, p jsonb default '{}') returns jsonb
language sql volatile security invoker set search_path = '' as $$ select privado.docencia(p_accion, p) $$;

-- ---------- estudiante ----------
-- Su registro vigente en la institución de ese simulacro (o ninguno).
create or replace function privado.simulacro_mio(p_uid uuid, s public.inst_simulacros) returns public.inst_estudiantes
language sql stable security definer set search_path = ''
as $$
  select e from public.codigos k join public.perfiles q on q.id = k.usado_por and not q.bloqueado join public.inst_estudiantes e on e.codigo = k.codigo and e.activo
    join public.instituciones i on i.id = e.institucion and privado.inst_vigente(i) and 'preicfes' = any (i.cursos)
  where k.usado_por = p_uid and e.institucion = s.institucion and 'preicfes' = any (e.cursos) and (e.grupo = any (s.grupos) or exists (select 1 from public.inst_resultados r where r.simulacro = s.id and r.estudiante = e.id))
  order by e.id limit 1
$$;

create or replace function privado.simulacro(p_accion text, p jsonb) returns jsonb
language plpgsql volatile security definer set search_path = ''
as $$
declare s public.inst_simulacros; e public.inst_estudiantes; r public.inst_resultados; v_resp integer[]; v_ver boolean;
begin
  p := coalesce(p, '{}');
  select t.* into s from public.inst_simulacros t where t.id = (p ->> 'id')::bigint;
  if s.id is not null then e := privado.simulacro_mio(auth.uid(), s); end if;
  if e.id is null then raise exception 'Este simulacro no es tuyo o ya no está' using errcode = '42501'; end if;
  select t.* into r from public.inst_resultados t where t.simulacro = s.id and t.estudiante = e.id for update;

  if p_accion = 'empezar' then
    if r.simulacro is null then
      if now() < s.abre then raise exception 'Todavía no abre' using errcode = '22023'; end if;
      if now() >= s.cierra then raise exception 'Ya cerró' using errcode = '22023'; end if;
      insert into public.inst_resultados (simulacro, estudiante, limite, respuestas) values (s.id, e.id, least(now() + make_interval(mins => s.minutos), s.cierra), array_fill(-1, array[s.n])) on conflict do nothing;
      select t.* into r from public.inst_resultados t where t.simulacro = s.id and t.estudiante = e.id;
    end if;
    if r.fin is not null or r.limite < now() then raise exception 'Ya lo entregaste' using errcode = '22023'; end if;
    return jsonb_build_object('id', s.id, 'titulo', s.titulo, 'componente', s.componente, 'segundos', greatest(0, round(extract(epoch from r.limite - now())))::integer, 'inicio', r.inicio, 'marca', r.guardado_en, 'respuestas', r.respuestas, 'textos', s.textos,
      'preguntas', (select jsonb_agg(jsonb_build_object('q', t -> 'q', 'o', t -> 'o', 'd', t -> 'd') order by o) from jsonb_array_elements(s.preguntas) with ordinality u(t, o)));   -- sin la respuesta

  elsif p_accion in ('guardar', 'entregar') then
    if r.simulacro is null then raise exception 'Aún no lo empiezas' using errcode = '22023'; end if;
    if r.fin is null and now() <= r.limite + interval '45 seconds' then   -- margen de red; después vale lo último guardado
      if coalesce(jsonb_typeof(p -> 'respuestas'), '') <> 'array' or jsonb_array_length(p -> 'respuestas') <> s.n then raise exception 'Revisa las respuestas' using errcode = '22023'; end if;
      select array_agg(case when t #>> '{}' ~ '^[0-3]$' then (t #>> '{}')::integer else -1 end order by o) into v_resp from jsonb_array_elements(p -> 'respuestas') with ordinality u(t, o);
      update public.inst_resultados set respuestas = v_resp, guardado_en = clock_timestamp(), fin = case when p_accion = 'entregar' then least(now(), r.limite) end,
        salidas = greatest(salidas, case when coalesce(p ->> 'salidas', '') ~ '^\d{1,3}$' then (p ->> 'salidas')::integer else 0 end),
        aciertos = (select count(*) from jsonb_array_elements(s.preguntas) with ordinality u(t, o) where (t ->> 'r')::integer = v_resp[o::integer])
      where simulacro = s.id and estudiante = e.id returning * into r;
      return jsonb_build_object('ok', true, 'guardado', true, 'segundos', greatest(0, round(extract(epoch from r.limite - now())))::integer, 'marca', r.guardado_en, 'ver', s.muestra = 'entregar' or (s.muestra = 'cerrar' and now() >= s.cierra));
    elsif r.fin is null then
      update public.inst_resultados set fin = r.limite where simulacro = s.id and estudiante = e.id;
    end if;
    return jsonb_build_object('ok', true, 'guardado', false, 'segundos', 0, 'ver', s.muestra = 'entregar' or (s.muestra = 'cerrar' and now() >= s.cierra));

  elsif p_accion = 'revisar' then
    if r.simulacro is null or (r.fin is null and r.limite >= now()) then raise exception 'Aún no lo entregas' using errcode = '22023'; end if;
    v_ver := s.muestra = 'entregar' or (s.muestra = 'cerrar' and now() >= s.cierra);
    if not v_ver then raise exception 'Tu docente aún no muestra los resultados' using errcode = '22023'; end if;
    if r.fin is null then update public.inst_resultados set fin = r.limite where simulacro = s.id and estudiante = e.id; end if;   -- vista la clave, ya no se recibe nada
    return jsonb_build_object('id', s.id, 'titulo', s.titulo, 'componente', s.componente, 'n', s.n, 'aciertos', r.aciertos, 'segundos', round(extract(epoch from coalesce(r.fin, r.limite) - r.inicio))::integer, 'respuestas', r.respuestas, 'textos', s.textos, 'preguntas', s.preguntas);
  end if;
  raise exception 'Acción desconocida' using errcode = '22023';
end $$;
create or replace function public.simulacro(p_accion text, p jsonb default '{}') returns jsonb
language sql volatile security invoker set search_path = '' as $$ select privado.simulacro(p_accion, p) $$;

-- Lo de antes, más sus simulacros y avisos.
create or replace function privado.mi_institucion() returns jsonb
language sql stable security definer set search_path = ''
as $$
  with yo as (select e.*, i.nombre as colegio, i.cursos as contrato from public.codigos k
      join public.inst_estudiantes e on e.codigo = k.codigo and e.activo join public.instituciones i on i.id = e.institucion and privado.inst_vigente(i) where k.usado_por = (select auth.uid()))
  select jsonb_build_object(
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

-- ---------- permisos ----------
revoke all on function privado.inst_docente_grupos() from public, anon, authenticated;
revoke all on function privado.simulacro_mio(uuid, public.inst_simulacros) from public, anon, authenticated;
revoke all on function privado.docencia(text, jsonb), public.docencia(text, jsonb), privado.simulacro(text, jsonb), public.simulacro(text, jsonb) from public, anon, authenticated;
grant execute on function privado.docencia(text, jsonb), public.docencia(text, jsonb), privado.simulacro(text, jsonb), public.simulacro(text, jsonb) to authenticated;
notify pgrst, 'reload schema';
