-- Zuka para instituciones: cotizaciones, contratos con cupos, gestores, docentes, estudiantes y metas.
-- Spec: docs/superpowers/specs/2026-11-25-instituciones.md. Todo pasa por funciones; las tablas no se leen directo.

-- ---------- tablas ----------
alter table public.perfiles drop constraint perfiles_rol_check;
alter table public.perfiles add constraint perfiles_rol_check check (rol in ('estudiante', 'admin', 'gestor'));

create table public.inst_cotizaciones (
  id bigint generated always as identity primary key,
  institucion uuid,
  nombre text not null check (char_length(nombre) between 2 and 120),
  tipo text not null default '' check (char_length(tipo) <= 40),
  ciudad text not null default '' check (char_length(ciudad) <= 80),
  contacto text not null check (char_length(contacto) between 2 and 80),
  cargo text not null default '' check (char_length(cargo) <= 60),
  correo text not null check (char_length(correo) <= 120),
  telefono text not null check (char_length(telefono) <= 30),
  estudiantes integer not null check (estudiantes between 1 and 20000),
  meses integer not null check (meses in (6, 12)),
  cursos text[] not null default '{}',
  extras text[] not null default '{}',
  mensaje text not null default '' check (char_length(mensaje) <= 800),
  estimado jsonb not null default '{}',
  estado text not null default 'nueva' check (estado in ('nueva', 'contactada', 'propuesta', 'ganada', 'perdida')),
  nota text not null default '' check (char_length(nota) <= 600),
  ip text not null default '',
  creado_en timestamptz not null default now()
);
create index inst_cotizaciones_creado_idx on public.inst_cotizaciones (creado_en);

create table public.instituciones (
  id uuid primary key default gen_random_uuid(),
  nombre text not null check (char_length(nombre) between 2 and 120),
  tipo text not null default '' check (char_length(tipo) <= 40),
  nit text not null default '' check (char_length(nit) <= 30),
  ciudad text not null default '' check (char_length(ciudad) <= 80),
  contacto text not null default '' check (char_length(contacto) <= 80),
  correo text not null default '' check (char_length(correo) <= 120),
  telefono text not null default '' check (char_length(telefono) <= 30),
  cupos integer not null check (cupos between 1 and 20000),
  cursos text[] not null check (cardinality(cursos) > 0),
  desde date not null,
  hasta date not null,
  valor bigint not null default 0 check (valor >= 0),
  estado text not null default 'activa' check (estado in ('activa', 'pausa')),
  nota text not null default '' check (char_length(nota) <= 600),
  cotizacion bigint references public.inst_cotizaciones (id) on delete set null,
  creado_en timestamptz not null default now(),
  check (hasta >= desde)
);
create index instituciones_cotizacion_idx on public.instituciones (cotizacion);
alter table public.inst_cotizaciones add constraint inst_cotizaciones_institucion_fkey foreign key (institucion) references public.instituciones (id) on delete set null;
create index inst_cotizaciones_institucion_idx on public.inst_cotizaciones (institucion);

create table public.inst_gestores (
  id bigint generated always as identity primary key,
  institucion uuid not null references public.instituciones (id) on delete cascade,
  nombre text not null check (char_length(nombre) between 2 and 80),
  correo text not null default '' check (char_length(correo) <= 120),
  papel text not null default 'gestor' check (papel in ('gestor', 'docente')),
  grupos text[] not null default '{}',        -- docente: los que ve
  codigo text unique references public.codigos (codigo) on update cascade on delete set null,
  activo boolean not null default true,
  pausa boolean not null default false,       -- el portal pausó su código (no Zuka)
  creado_en timestamptz not null default now()
);
create index inst_gestores_institucion_idx on public.inst_gestores (institucion);

create table public.inst_estudiantes (
  id bigint generated always as identity primary key,
  institucion uuid not null references public.instituciones (id) on delete cascade,
  nombre text not null check (char_length(nombre) between 2 and 80),
  grupo text not null default '' check (char_length(grupo) <= 40),
  identificador text not null default '' check (char_length(identificador) <= 40),
  cursos text[] not null default '{}',
  nota text not null default '' check (char_length(nota) <= 400),
  codigo text unique references public.codigos (codigo) on update cascade on delete set null,
  activo boolean not null default true,
  pausa boolean not null default false,
  creado_en timestamptz not null default now(),
  retirado_en timestamptz
);
create index inst_estudiantes_institucion_idx on public.inst_estudiantes (institucion, activo);
create unique index inst_estudiantes_identificador_idx on public.inst_estudiantes (institucion, lower(identificador)) where identificador <> '' and activo;

create table public.inst_metas (
  id bigint generated always as identity primary key,
  institucion uuid not null references public.instituciones (id) on delete cascade,
  titulo text not null check (char_length(titulo) between 2 and 100),
  curso text not null references public.cursos (id),
  lecciones text[] not null check (cardinality(lecciones) between 1 and 120),
  grupo text not null default '' check (char_length(grupo) <= 40),   -- vacío: todos
  hasta date not null,
  creado_por text not null default '',
  creado_en timestamptz not null default now()
);
create index inst_metas_institucion_idx on public.inst_metas (institucion);
create index inst_metas_curso_idx on public.inst_metas (curso);

create table public.inst_registro (
  id bigint generated always as identity primary key,
  institucion uuid not null references public.instituciones (id) on delete cascade,
  quien text not null default '',
  accion text not null,
  detalle jsonb not null default '{}',
  creado_en timestamptz not null default now()
);
create index inst_registro_institucion_idx on public.inst_registro (institucion, creado_en);

alter table public.inst_cotizaciones enable row level security;
alter table public.instituciones enable row level security;
alter table public.inst_gestores enable row level security;
alter table public.inst_estudiantes enable row level security;
alter table public.inst_metas enable row level security;
alter table public.inst_registro enable row level security;
revoke all on public.inst_cotizaciones, public.instituciones, public.inst_gestores, public.inst_estudiantes, public.inst_metas, public.inst_registro from anon, authenticated;

insert into public.ajustes (clave, valor) values ('inst_precios', '{"tramos":[[1,0],[30,10],[100,20],[300,30]],"anio":10}') on conflict do nothing;

-- ---------- acceso ----------
create function privado.inst_vigente(i public.instituciones) returns boolean
language sql stable set search_path = ''
as $$ select i.estado = 'activa' and (now() at time zone 'America/Bogota')::date between i.desde and i.hasta $$;

-- Cursos que le abre su institución a una cuenta (estudiante activo, gestor o docente) con contrato vigente.
create function privado.inst_cursos(p_uid uuid) returns table (institucion uuid, curso text, desde date, hasta date)
language sql stable security definer set search_path = ''
as $$
  select i.id, c, i.desde, i.hasta from public.codigos k
    join public.inst_estudiantes e on e.codigo = k.codigo and e.activo
    join public.instituciones i on i.id = e.institucion and privado.inst_vigente(i)
    cross join lateral unnest(e.cursos) c
  where k.usado_por = p_uid and c = any (i.cursos)
  union
  select i.id, c, i.desde, i.hasta from public.codigos k
    join public.inst_gestores g on g.codigo = k.codigo and g.activo
    join public.instituciones i on i.id = g.institucion and privado.inst_vigente(i)
    cross join lateral unnest(i.cursos) c
  where k.usado_por = p_uid and not k.bloqueado
$$;

create or replace function privado.puede(p_curso text, p_prueba boolean) returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.perfiles p where p.id = (select auth.uid()) and not p.bloqueado and (p.rol = 'admin' or exists (
      select 1 from public.accesos a where a.usuario = p.id and a.curso = p_curso and (
        (a.tipo = 'pago' and a.hasta > now())
        or (p_prueba and (a.tipo = 'pago' or a.hasta is null or a.hasta > now()))))
      or exists (select 1 from privado.inst_cursos(p.id) t where t.curso = p_curso)))
$$;

-- ¿La cuenta es más que este código? (correo propio, otros códigos, compras…) Entonces la institución no puede tener una llave de ella.
create function privado.inst_ajena(p_uid uuid, p_codigo text) returns boolean
language sql stable security definer set search_path = ''
as $$
  select p_uid is not null and (
    exists (select 1 from public.perfiles p where p.id = p_uid and (p.rol <> 'estudiante' or p.datos_en is not null))
    or exists (select 1 from auth.users u where u.id = p_uid and coalesce(u.email, '') not like '%@codigo.invalid')
    or exists (select 1 from public.codigos k where k.usado_por = p_uid and k.codigo <> p_codigo)
    or exists (select 1 from public.accesos a where a.usuario = p_uid) or exists (select 1 from public.pedidos d where d.usuario = p_uid)
    or exists (select 1 from public.libros_acceso l where l.usuario = p_uid) or exists (select 1 from public.horas h where h.usuario = p_uid))
$$;
-- Al estrenar (o al pasar a otra cuenta) un código de institución:
--  · de gestor: su cuenta, recién nacida, no es de estudiante; una que ya estudia no se vuelve gestora;
--  · de estudiante en una cuenta que ya era suya: da el curso, pero el código no sirve para entrar (la institución lo conoce).
create function privado.inst_estrena() returns trigger
language plpgsql security definer set search_path = ''
as $$
declare v_nueva boolean;
begin
  if new.usado_por is null or new.usado_por is not distinct from old.usado_por then return new; end if;
  v_nueva := old.usado_por is null and not privado.inst_ajena(new.usado_por, new.codigo)
    and exists (select 1 from public.perfiles p where p.id = new.usado_por and p.creado_en > now() - interval '10 minutes');
  if exists (select 1 from public.inst_gestores g where g.codigo = new.codigo) then
    if not v_nueva then raise exception 'Ese código es de un gestor: se usa en el portal de instituciones, con la sesión cerrada' using errcode = '22023'; end if;
    update public.perfiles set rol = 'gestor' where id = new.usado_por;
  elsif not v_nueva and exists (select 1 from public.inst_estudiantes e where e.codigo = new.codigo) then
    new.bloqueado := true;
  end if;
  return new;
end $$;
create trigger zuka_inst_estrena before update of usado_por on public.codigos
  for each row execute function privado.inst_estrena();

-- Lo que la app del estudiante (o del gestor) necesita: cursos que le abre, quién ve su avance y sus metas.
create function privado.mi_institucion() returns jsonb
language sql stable security definer set search_path = ''
as $$
  select jsonb_build_object(
    'instituciones', coalesce((select jsonb_agg(distinct i.nombre) from public.codigos k
      join public.inst_estudiantes e on e.codigo = k.codigo and e.activo join public.instituciones i on i.id = e.institucion and privado.inst_vigente(i) where k.usado_por = (select auth.uid())), '[]'),
    'accesos', coalesce((select jsonb_agg(jsonb_build_object('curso', t.curso, 'tipo', 'pago', 'desde', t.desde::timestamp at time zone 'America/Bogota', 'hasta', (t.hasta + 1)::timestamp at time zone 'America/Bogota' - interval '1 second', 'institucion', i.nombre))
      from (select distinct on (curso) * from privado.inst_cursos((select auth.uid())) order by curso, hasta desc) t join public.instituciones i on i.id = t.institucion), '[]'),
    'metas', coalesce((select jsonb_agg(jsonb_build_object('id', m.id, 'titulo', m.titulo, 'curso', m.curso, 'lecciones', m.lecciones, 'hasta', m.hasta, 'institucion', i.nombre) order by m.hasta)
      from public.codigos k join public.inst_estudiantes e on e.codigo = k.codigo and e.activo
      join public.instituciones i on i.id = e.institucion and privado.inst_vigente(i)
      join public.inst_metas m on m.institucion = i.id and (m.grupo = '' or m.grupo = e.grupo) and m.curso = any (e.cursos) and m.curso = any (i.cursos)
        and m.hasta >= (now() at time zone 'America/Bogota')::date - 3
      where k.usado_por = (select auth.uid())), '[]'))
$$;
create function public.mi_institucion() returns jsonb
language sql stable security invoker set search_path = '' as $$ select privado.mi_institucion() $$;

-- ---------- precios y cotización ----------
-- La misma cuenta de js/instituciones.js (instPrecio).
create function privado.inst_estimado(p_cursos text[], p_n integer, p_meses integer) returns jsonb
language plpgsql stable security definer set search_path = ''
as $$
declare v jsonb; v_desc numeric := 0; v_anio numeric := 0; t jsonb; v_base bigint; v_sin text[]; v_uno bigint;
begin
  begin select valor::jsonb into v from public.ajustes where clave = 'inst_precios'; exception when others then v := null; end;
  for t in select * from jsonb_array_elements(coalesce(v -> 'tramos', '[]')) loop
    if p_n >= (t ->> 0)::integer then v_desc := greatest(v_desc, least((t ->> 1)::numeric, 90)); end if;
  end loop;
  if p_meses = 12 then v_anio := least(coalesce((v ->> 'anio')::numeric, 0), 90); end if;
  select coalesce(sum(r.precio), 0), coalesce(array_agg(c) filter (where r.precio is null), '{}') into v_base, v_sin
  from unnest(p_cursos) c left join public.productos r on r.curso = c and r.meses = 6 and r.activo;
  v_base := v_base * (case when p_meses = 12 then 2 else 1 end);
  v_uno := round(v_base * (100 - v_desc) / 100 * (100 - v_anio) / 100 / 100) * 100;
  return jsonb_build_object('base', v_base, 'descuento', v_desc, 'anio', v_anio, 'unitario', v_uno, 'total', v_uno * p_n, 'sin_precio', to_jsonb(v_sin));
end $$;

create function privado.pedir_cotizacion(p jsonb) returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare v_ip text; v_h json; v_cursos text[]; v_extras text[]; v_n integer; v_m integer; v_est jsonb; v_id bigint; k text;
begin
  begin v_h := current_setting('request.headers', true)::json; exception when others then v_h := null; end;
  v_ip := left(coalesce(v_h ->> 'cf-connecting-ip', split_part(coalesce(v_h ->> 'x-forwarded-for', ''), ',', 1), ''), 60);
  if octet_length(p::text) > 8000 then raise exception 'La solicitud es muy larga' using errcode = '22023'; end if;
  perform pg_advisory_xact_lock(hashtext('zuka_cotizacion'));
  if (v_ip <> '' and (select count(*) from public.inst_cotizaciones where ip = v_ip and creado_en > now() - interval '1 hour') >= 6)
    or (select count(*) from public.inst_cotizaciones where creado_en > now() - interval '1 day') >= 1500 then
    return jsonb_build_object('ok', false, 'error', 'demasiadas');
  end if;
  foreach k in array array['nombre', 'contacto', 'correo', 'telefono'] loop
    if char_length(btrim(coalesce(p ->> k, ''))) < 2 then raise exception 'Falta %', k using errcode = '22023'; end if;
  end loop;
  if p ->> 'correo' !~ '^\S+@\S+\.\S+$' then raise exception 'Correo no válido' using errcode = '22023'; end if;
  if length(regexp_replace(p ->> 'telefono', '\D', '', 'g')) not between 7 and 15 then raise exception 'Teléfono no válido' using errcode = '22023'; end if;
  if (p ->> 'acepta')::boolean is distinct from true then raise exception 'Falta la autorización' using errcode = '22023'; end if;
  if coalesce(p ->> 'estudiantes', '') !~ '^\d{1,5}$' then raise exception 'Revisa el número de estudiantes' using errcode = '22023'; end if;
  if coalesce(p ->> 'meses', '') not in ('6', '12') then raise exception 'Revisa la duración' using errcode = '22023'; end if;
  if jsonb_typeof(coalesce(p -> 'cursos', '[]')) <> 'array' or jsonb_typeof(coalesce(p -> 'extras', '[]')) <> 'array' then raise exception 'Revisa la solicitud' using errcode = '22023'; end if;
  v_n := (p ->> 'estudiantes')::integer; v_m := (p ->> 'meses')::integer;
  if v_n is null or v_n not between 1 and 20000 then raise exception 'Revisa el número de estudiantes' using errcode = '22023'; end if;
  if v_m is null or v_m not in (6, 12) then raise exception 'Revisa la duración' using errcode = '22023'; end if;
  v_cursos := privado.cursos_validos(p -> 'cursos');
  if exists (select 1 from unnest(v_cursos) x join public.cursos c on c.id = x where not c.publicado) then raise exception 'Hay un curso que no está a la venta' using errcode = '22023'; end if;
  select coalesce(array_agg(distinct left(x, 60)), '{}') into v_extras from (select x from jsonb_array_elements_text(coalesce(p -> 'extras', '[]')) x limit 10) t;
  v_est := privado.inst_estimado(v_cursos, v_n, v_m);
  insert into public.inst_cotizaciones (nombre, tipo, ciudad, contacto, cargo, correo, telefono, estudiantes, meses, cursos, extras, mensaje, estimado, ip)
  values (left(btrim(p ->> 'nombre'), 120), left(coalesce(p ->> 'tipo', ''), 40), left(btrim(coalesce(p ->> 'ciudad', '')), 80), left(btrim(p ->> 'contacto'), 80),
    left(btrim(coalesce(p ->> 'cargo', '')), 60), left(lower(btrim(p ->> 'correo')), 120), left(btrim(p ->> 'telefono'), 30), v_n, v_m, v_cursos, v_extras,
    left(btrim(coalesce(p ->> 'mensaje', '')), 800), v_est, v_ip) returning id into v_id;
  return jsonb_build_object('ok', true, 'id', v_id, 'estimado', v_est);
end $$;
create function public.pedir_cotizacion(p jsonb) returns jsonb
language sql volatile security invoker set search_path = '' as $$ select privado.pedir_cotizacion(p) $$;

-- ---------- ayudas ----------
create function privado.inst_codigo(p_nombre text, p_nota text) returns text
language plpgsql security definer set search_path = ''
as $$
declare c text := privado.codigo_nuevo();
begin
  insert into public.codigos (codigo, concede, nombre, nota, creado_por) values (c, '[]', left(p_nombre, 80), left(p_nota, 200), auth.uid());
  return c;
end $$;
-- Otro código para la misma cuenta: el viejo deja de servir y se cierran sus sesiones.
create function privado.inst_renueva(p_codigo text) returns text
language plpgsql security definer set search_path = ''
as $$
declare c text := privado.codigo_nuevo(); u uuid;
begin
  update public.codigos set codigo = c where codigo = p_codigo and not bloqueado returning usado_por into u;
  if not found then raise exception 'Ese código está en pausa: escríbele a Zuka' using errcode = '22023'; end if;
  update public.pagos set codigo = c where codigo = p_codigo;
  if u is not null and not privado.es_admin_id(u) then
    delete from auth.sessions where user_id = u;
    delete from public.dispositivos where usuario = u;
  end if;
  return c;
end $$;

-- ---------- portal ----------
create function privado.institucion(p_accion text, p jsonb) returns jsonb
language plpgsql volatile security definer set search_path = ''
as $$
declare
  v_hoy date := (now() at time zone 'America/Bogota')::date;
  i public.instituciones; g public.inst_gestores; v_admin boolean := privado.es_admin();
  v_todo boolean; v_ids bigint[]; v_cursos text[]; v_out jsonb := '[]'; x jsonb; e public.inst_estudiantes; v_usados integer; v_n integer; v_cod text; v_uid uuid; v_rep text[] := '{}';
  v_grupos text[]; m public.inst_metas; v_g public.inst_gestores;
begin
  p := coalesce(p, '{}');
  select g1.* into g from public.inst_gestores g1 join public.codigos k on k.codigo = g1.codigo and not k.bloqueado
    join public.perfiles q on q.id = k.usado_por and not q.bloqueado
    where k.usado_por = auth.uid() and g1.activo order by g1.id limit 1;
  if v_admin and coalesce(p ->> 'institucion', '') <> '' then
    select * into i from public.instituciones where id = (p ->> 'institucion')::uuid;
  elsif g.id is not null then
    select * into i from public.instituciones where id = g.institucion;
  end if;
  if i.id is null then raise exception 'Esta cuenta no administra una institución' using errcode = '42501'; end if;
  v_todo := (v_admin and (g.id is null or g.institucion <> i.id)) or g.papel = 'gestor';   -- el docente solo ve sus grupos
  v_grupos := case when v_todo then null else g.grupos end;

  -- ---- consultas ----
  if p_accion = 'panel' then
    return jsonb_build_object(
      'institucion', (to_jsonb(i) - 'nota' - 'cotizacion' - 'valor') || jsonb_build_object('vigente', privado.inst_vigente(i),
        'usados', (select count(*) from public.inst_estudiantes where institucion = i.id and activo)),
      'yo', jsonb_build_object('nombre', coalesce(g.nombre, 'Zuka'), 'papel', case when v_todo then case when v_admin and g.id is null then 'zuka' else 'gestor' end else 'docente' end, 'grupos', coalesce(to_jsonb(v_grupos), '[]')),
      'hoy', v_hoy,
      'cursos', (select coalesce(jsonb_agg(jsonb_build_object('id', c.id, 'nombre', c.nombre) order by c.orden), '[]') from public.cursos c where c.id = any (i.cursos)),
      'lecciones', (select coalesce(jsonb_agg(jsonb_build_object('id', l.id, 'curso', l.curso, 'titulo', l.titulo) order by l.curso, l.orden), '[]') from public.lecciones l where l.tipo = 'leccion' and l.curso = any (i.cursos)),
      'estudiantes', (select coalesce(jsonb_agg(jsonb_build_object('id', s.id, 'nombre', s.nombre, 'grupo', s.grupo, 'identificador', s.identificador, 'cursos', s.cursos, 'activo', s.activo,
          'codigo', case when v_todo and s.activo and not coalesce(k.bloqueado, false) and not privado.inst_ajena(k.usado_por, s.codigo) then s.codigo end, 'propia', privado.inst_ajena(k.usado_por, s.codigo), 'alta', (s.creado_en at time zone 'America/Bogota')::date, 'entro', k.usado_por is not null,
          'ultima', case when s.activo and q.ultima_vez >= s.creado_en and v_hoy <= i.hasta then q.ultima_vez end) order by s.nombre), '[]')
        from public.inst_estudiantes s left join public.codigos k on k.codigo = s.codigo left join public.perfiles q on q.id = k.usado_por
        where s.institucion = i.id and (v_grupos is null or s.grupo = any (v_grupos))),
      'uso', (select coalesce(jsonb_agg(jsonb_build_array(s.id, d.dia, d.segundos, d.ejercicios, d.aciertos)), '[]')
        from public.inst_estudiantes s join public.codigos k on k.codigo = s.codigo join public.uso_diario d on d.usuario = k.usado_por
        where s.institucion = i.id and s.activo and (v_grupos is null or s.grupo = any (v_grupos)) and d.dia > v_hoy - 120 and d.dia >= (s.creado_en at time zone 'America/Bogota')::date and d.dia <= i.hasta),
      'hechas', (select coalesce(jsonb_agg(jsonb_build_array(s.id, l.id, (pr.completada_en at time zone 'America/Bogota')::date)), '[]')
        from public.inst_estudiantes s join public.codigos k on k.codigo = s.codigo join public.progreso pr on pr.usuario = k.usado_por and pr.completada
        join public.lecciones l on l.id = pr.leccion and l.tipo = 'leccion' and l.curso = any (s.cursos) and l.curso = any (i.cursos)
        where s.institucion = i.id and s.activo and (v_grupos is null or s.grupo = any (v_grupos)) and (pr.completada_en is null or (pr.completada_en at time zone 'America/Bogota')::date <= i.hasta)),
      'metas', (select coalesce(jsonb_agg(to_jsonb(t) - 'institucion' order by t.hasta desc), '[]') from public.inst_metas t where t.institucion = i.id and (v_grupos is null or t.grupo = any (v_grupos) or t.grupo = '')),
      'equipo', case when v_todo then (select coalesce(jsonb_agg(jsonb_build_object('id', t.id, 'nombre', t.nombre, 'correo', t.correo, 'papel', t.papel, 'grupos', t.grupos, 'activo', t.activo, 'codigo', case when k.usado_por is null then t.codigo end,
          'entro', k.usado_por is not null, 'ultima', q.ultima_vez, 'yo', t.id = g.id) order by t.papel desc, t.nombre), '[]')
        from public.inst_gestores t left join public.codigos k on k.codigo = t.codigo left join public.perfiles q on q.id = k.usado_por where t.institucion = i.id) else '[]' end,
      'registro', case when v_todo then (select coalesce(jsonb_agg(r.j), '[]') from (select jsonb_build_object('quien', t.quien, 'accion', t.accion, 'detalle', t.detalle, 'en', t.creado_en) j
        from public.inst_registro t where t.institucion = i.id order by t.creado_en desc limit 60) r) else '[]' end);

  elsif p_accion = 'estudiante' then
    select s.* into e from public.inst_estudiantes s where s.id = (p ->> 'id')::bigint and s.institucion = i.id and (v_grupos is null or s.grupo = any (v_grupos));
    if e.id is null then raise exception 'No existe ese estudiante' using errcode = '22023'; end if;
    select k.usado_por into v_uid from public.codigos k where k.codigo = e.codigo and e.activo and v_hoy <= i.hasta;   -- retirado o vencido: sin datos nuevos
    return jsonb_build_object('nota', case when v_todo then e.nota else '' end,
      'dispositivos', (select count(*) from public.dispositivos d where d.usuario = v_uid),
      'evaluaciones', (select coalesce(jsonb_agg(jsonb_build_object('titulo', l.titulo, 'curso', l.curso, 'nota', round((t.value ->> 'best')::numeric)) order by l.curso, l.orden), '[]')
        from public.estado_app s cross join lateral jsonb_each(case when jsonb_typeof(s.datos -> 'exams') = 'object' then s.datos -> 'exams' else '{}' end) t
        join public.lecciones l on l.id = t.key and l.tipo = 'evaluacion' and l.curso = any (e.cursos) and l.curso = any (i.cursos)
        where s.usuario = v_uid and jsonb_typeof(t.value -> 'best') = 'number'),
      'tiempo', (select coalesce(jsonb_agg(jsonb_build_array(pr.leccion, pr.segundos_vistos, pr.completada)), '[]') from public.progreso pr
        join public.lecciones l on l.id = pr.leccion and l.tipo = 'leccion' and l.curso = any (e.cursos) and l.curso = any (i.cursos) where pr.usuario = v_uid));
  end if;

  -- ---- cambios ----
  if not privado.inst_vigente(i) and not v_admin then raise exception 'El contrato no está vigente: puedes consultar, pero no hacer cambios' using errcode = '22023'; end if;
  if octet_length(p::text) > 200000 then raise exception 'La lista es muy larga: envíala por partes' using errcode = '22023'; end if;
  if exists (select 1 from unnest(array['lista', 'ids', 'cursos', 'grupos', 'lecciones']) k where p ? k and jsonb_typeof(p -> k) <> 'array') then raise exception 'Revisa los datos' using errcode = '22023'; end if;
  delete from public.inst_registro where institucion = i.id and creado_en < now() - interval '1 year';
  insert into public.inst_registro (institucion, quien, accion, detalle) values (i.id, coalesce(g.nombre, 'Zuka'), p_accion,   -- sin datos de estudiantes
    jsonb_strip_nulls(jsonb_build_object('cuantos', case when p ? 'lista' then jsonb_array_length(p -> 'lista') when p ? 'ids' then jsonb_array_length(p -> 'ids') end,
      'nombre', case when p_accion like 'equipo%' then left(p ->> 'nombre', 80) when p_accion = 'meta_guardar' then left(p ->> 'titulo', 100) end)));

  -- metas: también los docentes, para sus grupos
  if p_accion = 'meta_guardar' then
    if v_grupos is not null and (coalesce(p ->> 'grupo', '') = '' or not ((p ->> 'grupo') = any (v_grupos))) then raise exception 'Elige uno de tus grupos' using errcode = '22023'; end if;
    if not (coalesce(p ->> 'curso', '') = any (i.cursos)) then raise exception 'Ese curso no está en el contrato' using errcode = '22023'; end if;
    select array_agg(l.id order by l.orden) into v_cursos from public.lecciones l where l.curso = p ->> 'curso' and l.tipo = 'leccion'
      and l.id in (select jsonb_array_elements_text(coalesce(p -> 'lecciones', '[]')));
    if v_cursos is null or cardinality(v_cursos) > 120 then raise exception 'Elige entre 1 y 120 lecciones' using errcode = '22023'; end if;
    if char_length(btrim(coalesce(p ->> 'titulo', ''))) < 2 then raise exception 'Escribe el nombre de la meta' using errcode = '22023'; end if;
    if (p ->> 'hasta')::date < v_hoy then raise exception 'La fecha ya pasó' using errcode = '22023'; end if;
    if (select count(*) from public.inst_metas where institucion = i.id) >= 300 then raise exception 'Hay demasiadas metas: borra las viejas' using errcode = '22023'; end if;
    insert into public.inst_metas (institucion, titulo, curso, lecciones, grupo, hasta, creado_por)
    values (i.id, left(btrim(p ->> 'titulo'), 100), p ->> 'curso', v_cursos, left(coalesce(p ->> 'grupo', ''), 40), (p ->> 'hasta')::date, coalesce(g.nombre, 'Zuka'));
    return jsonb_build_object('ok', true);
  elsif p_accion = 'meta_borrar' then
    delete from public.inst_metas t where t.id = (p ->> 'id')::bigint and t.institucion = i.id and (v_grupos is null or (t.grupo <> '' and t.grupo = any (v_grupos)));
    if not found then raise exception 'No puedes borrar esa meta' using errcode = '22023'; end if;
    return jsonb_build_object('ok', true);
  end if;
  if not v_todo then raise exception 'Solo el gestor puede hacer este cambio' using errcode = '42501'; end if;

  if p ? 'cursos' then
    select array_agg(distinct c) into v_cursos from jsonb_array_elements_text(p -> 'cursos') c;
    if v_cursos is null or not v_cursos <@ i.cursos then raise exception 'Elige cursos del contrato' using errcode = '22023'; end if;
  end if;
  if p ? 'ids' then
    select array_agg(s.id) into v_ids from public.inst_estudiantes s where s.institucion = i.id and s.id in (select t::bigint from jsonb_array_elements_text(p -> 'ids') t);
    if v_ids is null then raise exception 'Elige al menos un estudiante' using errcode = '22023'; end if;
  end if;

  if p_accion in ('editar', 'retirar', 'reactivar', 'codigo', 'dispositivos') and v_ids is null then raise exception 'Elige al menos un estudiante' using errcode = '22023'; end if;
  if p_accion in ('codigo', 'dispositivos') then
    select s.* into e from public.inst_estudiantes s where s.id = v_ids[1];
    select k.usado_por into v_uid from public.codigos k where k.codigo = e.codigo;
    if not e.activo then raise exception 'Primero reactiva al estudiante' using errcode = '22023'; end if;
    if privado.inst_ajena(v_uid, e.codigo) then raise exception 'Este estudiante usa su cuenta personal: su código lo cambia él mismo con Zuka' using errcode = '22023'; end if;
  end if;

  if p_accion in ('alta', 'reactivar') then
    select * into i from public.instituciones where id = i.id for update;   -- dos altas a la vez no pasan de los cupos
    select count(*) into v_usados from public.inst_estudiantes where institucion = i.id and activo;
  end if;

  if p_accion = 'alta' then
    v_n := jsonb_array_length(coalesce(p -> 'lista', '[]'));
    if v_n not between 1 and 500 then raise exception 'Registra entre 1 y 500 estudiantes a la vez' using errcode = '22023'; end if;
    if v_cursos is null then raise exception 'Elige al menos un curso' using errcode = '22023'; end if;
    for x in select * from jsonb_array_elements(p -> 'lista') loop
      if char_length(btrim(coalesce(x ->> 'nombre', ''))) < 2 then raise exception 'Hay un estudiante sin nombre' using errcode = '22023'; end if;
      if coalesce(btrim(x ->> 'identificador'), '') <> '' and exists (select 1 from public.inst_estudiantes s where s.institucion = i.id and s.activo and lower(s.identificador) = lower(left(btrim(x ->> 'identificador'), 40))) then
        v_rep := v_rep || btrim(x ->> 'nombre'); continue;
      end if;
      if v_usados >= i.cupos then raise exception 'No alcanzan los cupos: quedan %', i.cupos - (select count(*) from public.inst_estudiantes where institucion = i.id and activo) + jsonb_array_length(v_out) using errcode = '22023'; end if;
      v_usados := v_usados + 1;
      v_cod := privado.inst_codigo(btrim(x ->> 'nombre'), left(i.nombre, 120));
      insert into public.inst_estudiantes (institucion, nombre, grupo, identificador, cursos, codigo)
      values (i.id, left(btrim(x ->> 'nombre'), 80), left(btrim(coalesce(x ->> 'grupo', '')), 40), left(btrim(coalesce(x ->> 'identificador', '')), 40), v_cursos, v_cod) returning * into e;
      v_out := v_out || jsonb_build_array(jsonb_build_object('id', e.id, 'nombre', e.nombre, 'grupo', e.grupo, 'codigo', e.codigo));
    end loop;
    return jsonb_build_object('ok', true, 'nuevos', v_out, 'repetidos', to_jsonb(v_rep));

  elsif p_accion = 'editar' then
    begin
    update public.inst_estudiantes s set
      nombre = case when cardinality(v_ids) = 1 and char_length(btrim(coalesce(p ->> 'nombre', ''))) >= 2 then left(btrim(p ->> 'nombre'), 80) else s.nombre end,
      identificador = case when cardinality(v_ids) = 1 and p ? 'identificador' then left(btrim(p ->> 'identificador'), 40) else s.identificador end,
      nota = case when cardinality(v_ids) = 1 and p ? 'nota' then left(p ->> 'nota', 400) else s.nota end,
      grupo = case when p ? 'grupo' then left(btrim(p ->> 'grupo'), 40) else s.grupo end,
      cursos = coalesce(v_cursos, s.cursos)
    where s.id = any (v_ids);
    exception when unique_violation then raise exception 'Ya hay un estudiante activo con ese documento' using errcode = '22023'; end;

  elsif p_accion = 'retirar' then
    update public.inst_estudiantes set activo = false, retirado_en = now() where id = any (v_ids) and activo;
    with q as (update public.codigos k set bloqueado = true from public.inst_estudiantes s where s.id = any (v_ids) and k.codigo = s.codigo and k.usado_por is null and not k.bloqueado returning k.codigo)
      update public.inst_estudiantes set pausa = true where codigo in (select codigo from q);

  elsif p_accion = 'reactivar' then
    if v_usados + (select count(*) from public.inst_estudiantes where id = any (v_ids) and not activo) > i.cupos then raise exception 'No alcanzan los cupos: quedan %', i.cupos - v_usados using errcode = '22023'; end if;
    begin
      update public.inst_estudiantes set activo = true, retirado_en = null where id = any (v_ids);
    exception when unique_violation then raise exception 'Ya hay un estudiante activo con ese documento' using errcode = '22023'; end;
    update public.codigos k set bloqueado = false from public.inst_estudiantes s where s.id = any (v_ids) and s.pausa and k.codigo = s.codigo;
    update public.inst_estudiantes set pausa = false where id = any (v_ids);

  elsif p_accion = 'codigo' then
    if e.codigo is null then
      v_cod := privado.inst_codigo(e.nombre, left(i.nombre, 120));
      update public.inst_estudiantes set codigo = v_cod where id = e.id;
    else v_cod := privado.inst_renueva(e.codigo); end if;
    return jsonb_build_object('ok', true, 'codigo', v_cod);

  elsif p_accion = 'dispositivos' then
    delete from public.dispositivos where usuario = v_uid;
    delete from auth.sessions where user_id = v_uid and not privado.es_admin_id(v_uid);

  elsif p_accion = 'grupo_renombrar' then
    if btrim(coalesce(p ->> 'nuevo', '')) = '' or coalesce(p ->> 'grupo', '') = '' then raise exception 'Escribe el nombre del grupo' using errcode = '22023'; end if;
    update public.inst_estudiantes set grupo = left(btrim(p ->> 'nuevo'), 40) where institucion = i.id and grupo = p ->> 'grupo';
    update public.inst_metas set grupo = left(btrim(p ->> 'nuevo'), 40) where institucion = i.id and grupo = p ->> 'grupo' and grupo <> '';
    update public.inst_gestores set grupos = array_replace(grupos, p ->> 'grupo', left(btrim(p ->> 'nuevo'), 40)) where institucion = i.id;

  elsif p_accion = 'equipo_guardar' then
    select coalesce(array_agg(distinct left(t, 40)), '{}') into v_grupos from (select btrim(x1) t from jsonb_array_elements_text(coalesce(p -> 'grupos', '[]')) x1) q1 where t <> '';
    if char_length(btrim(coalesce(p ->> 'nombre', ''))) < 2 then raise exception 'Escribe el nombre' using errcode = '22023'; end if;
    if coalesce(p ->> 'papel', '') not in ('gestor', 'docente') then raise exception 'Elige el papel' using errcode = '22023'; end if;
    if p ->> 'papel' = 'docente' and cardinality(v_grupos) = 0 then raise exception 'Elige al menos un grupo para el docente' using errcode = '22023'; end if;
    if coalesce(p ->> 'id', '') = '' then
      -- El equipo ve los cursos sin gastar cupo: por eso tiene tope, y cuenta quien ya entró aunque esté sin acceso.
      perform 1 from public.instituciones where id = i.id for update;
      if (select count(*) from public.inst_gestores t left join public.codigos k on k.codigo = t.codigo where t.institucion = i.id and (t.activo or k.usado_por is not null)) >= greatest(5, ceil(i.cupos * 0.15)) then
        raise exception 'Tu equipo llegó al máximo (%). Escríbele a Zuka para ampliarlo', greatest(5, ceil(i.cupos * 0.15)) using errcode = '22023';
      end if;
      v_cod := privado.inst_codigo(btrim(p ->> 'nombre'), left(i.nombre || ' · ' || (p ->> 'papel'), 120));
      insert into public.inst_gestores (institucion, nombre, correo, papel, grupos, codigo)
      values (i.id, left(btrim(p ->> 'nombre'), 80), left(lower(btrim(coalesce(p ->> 'correo', ''))), 120), p ->> 'papel', case when p ->> 'papel' = 'docente' then v_grupos else '{}' end, v_cod) returning * into v_g;
      return jsonb_build_object('ok', true, 'codigo', v_cod);
    end if;
    if (p ->> 'id')::bigint = g.id and p ->> 'papel' <> 'gestor' then raise exception 'No puedes quitarte el papel de gestor' using errcode = '22023'; end if;
    update public.inst_gestores set nombre = left(btrim(p ->> 'nombre'), 80), correo = left(lower(btrim(coalesce(p ->> 'correo', ''))), 120), papel = p ->> 'papel',
      grupos = case when p ->> 'papel' = 'docente' then v_grupos else '{}' end where id = (p ->> 'id')::bigint and institucion = i.id;
    if not found then raise exception 'No existe esa persona' using errcode = '22023'; end if;

  elsif p_accion = 'equipo_estado' then
    if (p ->> 'id')::bigint = g.id then raise exception 'No puedes desactivarte' using errcode = '22023'; end if;
    update public.inst_gestores set activo = (p ->> 'si')::boolean where id = (p ->> 'id')::bigint and institucion = i.id returning * into v_g;
    if v_g.id is null then raise exception 'No existe esa persona' using errcode = '22023'; end if;
    if not v_g.activo then
      update public.codigos set bloqueado = true where codigo = v_g.codigo and not bloqueado returning usado_por into v_uid;
      if found then update public.inst_gestores set pausa = true where id = v_g.id; end if;
    elsif v_g.pausa then
      update public.codigos set bloqueado = false where codigo = v_g.codigo;
      update public.inst_gestores set pausa = false where id = v_g.id;
    end if;
    if not v_g.activo and v_uid is not null then delete from auth.sessions where user_id = v_uid and not privado.es_admin_id(v_uid); end if;

  elsif p_accion = 'equipo_codigo' then
    select * into v_g from public.inst_gestores where id = (p ->> 'id')::bigint and institucion = i.id and activo;
    if v_g.id is null then raise exception 'Esa persona no tiene acceso' using errcode = '22023'; end if;
    if v_g.codigo is null then
      v_cod := privado.inst_codigo(v_g.nombre, left(i.nombre || ' · ' || v_g.papel, 120));
      update public.inst_gestores set codigo = v_cod where id = v_g.id;
      return jsonb_build_object('ok', true, 'codigo', v_cod);
    end if;
    return jsonb_build_object('ok', true, 'codigo', privado.inst_renueva(v_g.codigo));

  elsif p_accion = 'pedir_cupos' then
    v_n := coalesce((p ->> 'estudiantes')::integer, 0);
    if v_n not between 1 and 20000 then raise exception 'Revisa el número de cupos' using errcode = '22023'; end if;
    if (select count(*) from public.inst_cotizaciones where institucion = i.id and creado_en > now() - interval '1 day') >= 5 then raise exception 'Ya tenemos tu solicitud: te escribimos pronto' using errcode = '22023'; end if;
    insert into public.inst_cotizaciones (institucion, nombre, tipo, ciudad, contacto, cargo, correo, telefono, estudiantes, meses, cursos, mensaje, estimado)
    values (i.id, i.nombre, i.tipo, i.ciudad, left(coalesce(g.nombre, i.contacto, 'Gestor'), 80), 'Gestor', coalesce(nullif(g.correo, ''), i.correo), i.telefono, v_n,
      case when (p ->> 'meses')::integer = 12 then 12 else 6 end, coalesce(v_cursos, i.cursos), left(btrim(coalesce(p ->> 'mensaje', '')), 800),
      privado.inst_estimado(coalesce(v_cursos, i.cursos), v_n, case when (p ->> 'meses')::integer = 12 then 12 else 6 end));
  else
    raise exception 'Acción desconocida: %', p_accion using errcode = '22023';
  end if;
  return jsonb_build_object('ok', true);
end $$;
create function public.institucion(p_accion text, p jsonb default '{}') returns jsonb
language sql volatile security invoker set search_path = '' as $$ select privado.institucion(p_accion, p) $$;

-- ---------- panel de Zuka ----------
create function privado.institucion_admin(p_accion text, p jsonb) returns jsonb
language plpgsql volatile security definer set search_path = ''
as $$
declare v_id uuid := nullif(p ->> 'id', '')::uuid; i public.instituciones; v_cursos text[]; v_cod text; g public.inst_gestores; v_n integer;
begin
  if not privado.es_admin() then raise exception 'Solo administradores' using errcode = '42501'; end if;
  if p_accion = 'lista' then
    return jsonb_build_object(
      'cotizaciones', (select coalesce(jsonb_agg(to_jsonb(c) - 'ip' order by (c.estado = 'nueva') desc, c.creado_en desc), '[]') from public.inst_cotizaciones c),
      'instituciones', (select coalesce(jsonb_agg(to_jsonb(t) || jsonb_build_object('vigente', privado.inst_vigente(t),
          'usados', (select count(*) from public.inst_estudiantes s where s.institucion = t.id and s.activo),
          'entraron', (select count(*) from public.inst_estudiantes s join public.codigos k on k.codigo = s.codigo and k.usado_por is not null where s.institucion = t.id and s.activo),
          'activos_7', (select count(distinct d.usuario) from public.inst_estudiantes s join public.codigos k on k.codigo = s.codigo join public.uso_diario d on d.usuario = k.usado_por
            where s.institucion = t.id and s.activo and d.dia > (now() at time zone 'America/Bogota')::date - 7 and d.segundos > 0),
          'gestores', (select coalesce(jsonb_agg(jsonb_build_object('id', q.id, 'nombre', q.nombre, 'correo', q.correo, 'papel', q.papel, 'codigo', q.codigo, 'activo', q.activo, 'entro', k.usado_por is not null) order by q.id), '[]')
            from public.inst_gestores q left join public.codigos k on k.codigo = q.codigo where q.institucion = t.id)) order by t.nombre), '[]') from public.instituciones t));
  elsif p_accion = 'conteo' then
    return jsonb_build_object('nuevas', (select count(*) from public.inst_cotizaciones where estado = 'nueva'));
  elsif p_accion = 'de_estudiantes' then
    return (select coalesce(jsonb_object_agg(k.usado_por, t.nombre), '{}') from public.inst_estudiantes s join public.codigos k on k.codigo = s.codigo and k.usado_por is not null
      join public.instituciones t on t.id = s.institucion where s.activo);
  end if;

  insert into public.auditoria (admin, accion, detalle) values (auth.uid(), 'inst_' || p_accion, p);
  if p_accion = 'guardar' then
    v_cursos := privado.cursos_validos(p -> 'cursos');
    if (p ->> 'hasta')::date < (p ->> 'desde')::date then raise exception 'La fecha final va después de la inicial' using errcode = '22023'; end if;
    if v_id is null then
      insert into public.instituciones (nombre, tipo, nit, ciudad, contacto, correo, telefono, cupos, cursos, desde, hasta, valor, nota, cotizacion)
      values (btrim(p ->> 'nombre'), coalesce(p ->> 'tipo', ''), coalesce(p ->> 'nit', ''), coalesce(p ->> 'ciudad', ''), coalesce(p ->> 'contacto', ''), lower(coalesce(p ->> 'correo', '')), coalesce(p ->> 'telefono', ''),
        (p ->> 'cupos')::integer, v_cursos, (p ->> 'desde')::date, (p ->> 'hasta')::date, coalesce(nullif(p ->> 'valor', '')::bigint, 0), coalesce(p ->> 'nota', ''), nullif(p ->> 'cotizacion', '')::bigint) returning * into i;
      update public.inst_cotizaciones set estado = 'ganada', institucion = i.id where id = i.cotizacion;
    else
      perform 1 from public.instituciones where id = v_id for update;
      select count(*) into v_n from public.inst_estudiantes where institucion = v_id and activo;
      if (p ->> 'cupos')::integer < v_n then raise exception 'Ya hay % estudiantes activos: los cupos no pueden ser menos', v_n using errcode = '22023'; end if;
      update public.instituciones set nombre = btrim(p ->> 'nombre'), tipo = coalesce(p ->> 'tipo', ''), nit = coalesce(p ->> 'nit', ''), ciudad = coalesce(p ->> 'ciudad', ''), contacto = coalesce(p ->> 'contacto', ''),
        correo = lower(coalesce(p ->> 'correo', '')), telefono = coalesce(p ->> 'telefono', ''), cupos = (p ->> 'cupos')::integer, cursos = v_cursos, desde = (p ->> 'desde')::date, hasta = (p ->> 'hasta')::date,
        valor = coalesce(nullif(p ->> 'valor', '')::bigint, 0), nota = coalesce(p ->> 'nota', '') where id = v_id returning * into i;
      if i.id is null then raise exception 'No existe esa institución' using errcode = '22023'; end if;
    end if;
    -- El primer gestor, de una vez.
    if char_length(btrim(coalesce(p ->> 'gestor', ''))) >= 2 and not exists (select 1 from public.inst_gestores where institucion = i.id) then
      v_cod := privado.inst_codigo(btrim(p ->> 'gestor'), left(i.nombre || ' · gestor', 120));
      insert into public.inst_gestores (institucion, nombre, correo, papel, codigo) values (i.id, left(btrim(p ->> 'gestor'), 80), left(lower(coalesce(p ->> 'correo', '')), 120), 'gestor', v_cod);
    end if;
    return jsonb_build_object('ok', true, 'id', i.id, 'codigo', v_cod);
  elsif p_accion = 'estado' then
    update public.instituciones set estado = p ->> 'estado' where id = v_id;
  elsif p_accion = 'gestor' then
    select * into i from public.instituciones where id = v_id;
    if i.id is null then raise exception 'No existe esa institución' using errcode = '22023'; end if;
    v_cod := privado.inst_codigo(btrim(p ->> 'nombre'), left(i.nombre || ' · gestor', 120));
    insert into public.inst_gestores (institucion, nombre, correo, papel, codigo) values (i.id, left(btrim(p ->> 'nombre'), 80), left(lower(coalesce(p ->> 'correo', '')), 120), 'gestor', v_cod);
    return jsonb_build_object('ok', true, 'codigo', v_cod);
  elsif p_accion = 'gestor_codigo' then
    select * into g from public.inst_gestores where id = (p ->> 'gestor')::bigint;
    if g.id is null then raise exception 'No existe esa persona' using errcode = '22023'; end if;
    if g.codigo is null then
      v_cod := privado.inst_codigo(g.nombre, 'Gestor de institución');
      update public.inst_gestores set codigo = v_cod where id = g.id;
      return jsonb_build_object('ok', true, 'codigo', v_cod);
    end if;
    return jsonb_build_object('ok', true, 'codigo', privado.inst_renueva(g.codigo));
  elsif p_accion = 'cotizacion' then
    update public.inst_cotizaciones set estado = coalesce(p ->> 'estado', estado), nota = left(coalesce(p ->> 'nota', nota), 600) where id = (p ->> 'cotizacion')::bigint;
  elsif p_accion = 'cotizacion_borrar' then
    delete from public.inst_cotizaciones where id = (p ->> 'cotizacion')::bigint;
  elsif p_accion = 'precios' then
    if jsonb_typeof(p -> 'tramos') is distinct from 'array' or exists (select 1 from jsonb_array_elements(p -> 'tramos') t where (t ->> 0)::integer < 1 or (t ->> 1)::numeric not between 0 and 90) or (p ->> 'anio')::numeric not between 0 and 90 then
      raise exception 'Revisa los descuentos: de 0 a 90 %%' using errcode = '22023';
    end if;
    update public.ajustes set valor = jsonb_build_object('tramos', p -> 'tramos', 'anio', (p ->> 'anio')::numeric)::text where clave = 'inst_precios';
  else
    raise exception 'Acción desconocida: %', p_accion using errcode = '22023';
  end if;
  return jsonb_build_object('ok', true);
end $$;
create function public.institucion_admin(p_accion text, p jsonb default '{}') returns jsonb
language sql volatile security invoker set search_path = '' as $$ select privado.institucion_admin(p_accion, p) $$;

-- ---------- funciones: quién las llama ----------
revoke execute on function privado.inst_ajena(uuid, text), privado.inst_vigente(public.instituciones), privado.inst_cursos(uuid), privado.inst_estrena(), privado.mi_institucion(), public.mi_institucion(),
  privado.inst_estimado(text[], integer, integer), privado.pedir_cotizacion(jsonb), public.pedir_cotizacion(jsonb), privado.inst_codigo(text, text), privado.inst_renueva(text),
  privado.institucion(text, jsonb), public.institucion(text, jsonb), privado.institucion_admin(text, jsonb), public.institucion_admin(text, jsonb) from public, anon, authenticated;
grant execute on function privado.pedir_cotizacion(jsonb), public.pedir_cotizacion(jsonb) to anon, authenticated;
grant execute on function privado.mi_institucion(), public.mi_institucion(), privado.institucion(text, jsonb), public.institucion(text, jsonb),
  privado.institucion_admin(text, jsonb), public.institucion_admin(text, jsonb) to authenticated;

-- ---------- lo de antes, con el rol nuevo ----------
-- Bloquear y borrar sirven también para gestores; un estudiante de institución no es «sin acceso» ni su código uno por vender.
do $$
declare v_def text; v_new text; x text[];
begin
  v_def := pg_get_functiondef('privado.admin(text, jsonb)'::regprocedure); v_new := v_def;
  foreach x slice 1 in array array[
    ['where id = v_uid and rol = ''estudiante'';', 'where id = v_uid and rol <> ''admin'';'],
    ['where id = v_uid and rol = ''estudiante'') then', 'where id = v_uid and rol <> ''admin'') then'],
    ['where q.rol = ''estudiante'' and not exists (select 1 from public.accesos a where a.usuario = q.id)),', 'where q.rol = ''estudiante'' and not exists (select 1 from public.accesos a where a.usuario = q.id) and not exists (select 1 from public.codigos k join public.inst_estudiantes e on e.codigo = k.codigo where k.usado_por = q.id)),'],
    ['from public.codigos where usado_por is null and not bloqueado)', 'from public.codigos k where k.usado_por is null and not k.bloqueado and not exists (select 1 from public.inst_estudiantes e where e.codigo = k.codigo) and not exists (select 1 from public.inst_gestores g where g.codigo = k.codigo))']
  ] loop
    if position(x[1] in v_new) = 0 then raise exception 'privado.admin: no se encontró %', x[1]; end if;
    v_new := replace(v_new, x[1], x[2]);
  end loop;
  execute v_new;
end $$;
