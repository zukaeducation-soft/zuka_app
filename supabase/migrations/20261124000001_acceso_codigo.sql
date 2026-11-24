-- Acceso por código y por curso. Spec: docs/superpowers/specs/2026-11-24-acceso-por-codigo.md
-- Las funciones que escriben viven en `privado` (SECURITY DEFINER); en public, envoltorios SECURITY INVOKER.

-- ---------- tablas ----------
alter table public.perfiles
  add column correo text not null default '' check (char_length(correo) <= 120),
  add column genero text not null default '' check (char_length(genero) <= 20),
  add column edad text not null default '' check (char_length(edad) <= 20),
  add column ciudad text not null default '' check (char_length(ciudad) <= 80),
  add column ocupacion text not null default '' check (char_length(ocupacion) <= 30),
  add column institucion text not null default '' check (char_length(institucion) <= 120),
  add column meta text not null default '' check (char_length(meta) <= 120),
  add column presentacion text not null default '' check (char_length(presentacion) <= 30),
  add column horas text not null default '' check (char_length(horas) <= 20),
  add column dificultad text not null default '' check (char_length(dificultad) <= 120),
  add column medio text not null default '' check (char_length(medio) <= 30),
  add column acepta_mensajes boolean not null default false,
  add column datos_en timestamptz,          -- cuándo completó sus datos y autorizó su tratamiento
  add column bloqueado boolean not null default false;
-- Nota del administrador sobre un estudiante: aparte, para que el estudiante no la vea.
create table public.perfil_notas (
  usuario uuid primary key references auth.users (id) on delete cascade,
  nota text not null default '' check (char_length(nota) <= 400)
);

create table public.accesos (
  usuario uuid not null references auth.users (id) on delete cascade,
  curso text not null references public.cursos (id),
  tipo text not null check (tipo in ('prueba', 'pago')),
  desde timestamptz not null default now(),
  hasta timestamptz,                         -- null: prueba sin vencimiento
  dias integer check (dias > 0),
  actualizado_en timestamptz not null default now(),
  primary key (usuario, curso),
  check (tipo = 'prueba' or hasta is not null)
);
create index accesos_curso_idx on public.accesos (curso);
create index accesos_hasta_idx on public.accesos (hasta);

-- Lo que concede un código al estrenarse: [{ "curso": "preuda", "tipo": "prueba", "dias": null }, …]
alter table public.codigos alter column nivel drop not null, alter column duracion drop not null, alter column dias drop not null;
alter table public.codigos
  add column concede jsonb not null default '[]',
  add column nombre text not null default '' check (char_length(nombre) <= 80),
  add column celular text not null default '' check (char_length(celular) <= 30),
  add column bloqueado boolean not null default false;

create table public.productos (
  id text primary key check (char_length(id) <= 40),
  curso text not null references public.cursos (id) on delete cascade,
  meses integer not null check (meses between 1 and 24),
  dias integer not null check (dias between 1 and 800),
  precio integer check (precio >= 0),        -- null: se consulta por WhatsApp
  activo boolean not null default true,
  unique (curso, meses)
);

create table public.solicitudes (
  id bigint generated always as identity primary key,
  usuario uuid not null references auth.users (id) on delete cascade,
  curso text not null references public.cursos (id) on delete cascade,
  meses integer not null,
  precio integer,
  estado text not null default 'pendiente' check (estado in ('pendiente', 'pagada', 'descartada')),
  creado_en timestamptz not null default now()
);
create index solicitudes_usuario_idx on public.solicitudes (usuario);
create index solicitudes_curso_idx on public.solicitudes (curso);
create unique index solicitudes_una_idx on public.solicitudes (usuario, curso) where estado = 'pendiente';

create table public.pagos (
  id bigint generated always as identity primary key,
  usuario uuid references auth.users (id) on delete set null,   -- el pago queda aunque se borre la cuenta
  nombre text not null default '',
  codigo text not null default '',
  curso text not null,
  dias integer not null,
  valor integer not null default 0 check (valor >= 0),
  metodo text not null default '' check (char_length(metodo) <= 40),
  nota text not null default '' check (char_length(nota) <= 200),
  creado_en timestamptz not null default now()
);
create index pagos_usuario_idx on public.pagos (usuario);
create index pagos_creado_idx on public.pagos (creado_en);

create table public.ajustes (clave text primary key, valor text not null default '' check (char_length(valor) <= 600));
create table public.estado_app (
  usuario uuid primary key default auth.uid() references auth.users (id) on delete cascade,
  datos jsonb not null default '{}' check (octet_length(datos::text) <= 300000),
  actualizado_en timestamptz not null default now()
);
create table public.dispositivos (
  usuario uuid not null references auth.users (id) on delete cascade,
  id text not null check (char_length(id) <= 60),
  nombre text not null default '' check (char_length(nombre) <= 80),
  visto_en timestamptz not null default now(),
  primary key (usuario, id)
);
create table public.intentos_codigo (
  id bigint generated always as identity primary key,
  ip text not null, creado_en timestamptz not null default now()
);
create index intentos_codigo_ip_idx on public.intentos_codigo (ip, creado_en);
create table public.auditoria (
  id bigint generated always as identity primary key,
  admin uuid references auth.users (id) on delete set null,
  accion text not null, detalle jsonb not null default '{}', creado_en timestamptz not null default now()
);
create index auditoria_admin_idx on public.auditoria (admin);
create index auditoria_creado_idx on public.auditoria (creado_en);

alter table public.lecciones add column prueba boolean not null default false;

insert into public.ajustes (clave, valor) values ('whatsapp', ''), ('max_dispositivos', '3'), ('pago_info', '')
on conflict do nothing;
insert into public.productos (id, curso, meses, dias, activo) values
  ('preuda-1', 'preuda', 1, 30, true), ('preuda-3', 'preuda', 3, 90, true), ('preuda-4', 'preuda', 4, 120, false), ('preuda-6', 'preuda', 6, 180, true);
insert into public.productos (id, curso, meses, dias)
select c.id || '-6', c.id, 6, 180 from public.cursos c where c.id <> 'preuda';

-- Lo vendido antes se conserva en los cursos que ya estaban abiertos: un plan (vigente o vencido) con su fecha, y un código
-- sin usar, con sus días. Quien tenía cuenta sin plan queda con la prueba. Un código viejo ya canjeado era desechable: no
-- sirve para entrar (esas cuentas siguen entrando con su correo).
insert into public.accesos (usuario, curso, tipo, desde, hasta, dias)
select p.id, c.id, 'pago', coalesce(p.acceso_desde, now()), p.acceso_hasta, 30
from public.perfiles p cross join public.cursos c where p.rol = 'estudiante' and p.acceso_hasta is not null and (c.publicado or c.id in ('algebra', 'trig'));
insert into public.accesos (usuario, curso, tipo)
select p.id, c.id, 'prueba' from public.perfiles p cross join public.cursos c
where p.rol = 'estudiante' and p.acceso_hasta is null and (c.publicado or c.id in ('algebra', 'trig'));
update public.codigos k set concede = (select jsonb_agg(jsonb_build_object('curso', c.id, 'tipo', 'pago', 'dias', k.dias) order by c.orden)
  from public.cursos c where c.publicado or c.id in ('algebra', 'trig')), bloqueado = k.usado_por is not null;

-- ---------- permisos ----------
create or replace function privado.puede(p_curso text, p_prueba boolean) returns boolean
language sql stable security definer set search_path = ''
as $$
  select exists (
    select 1 from public.perfiles p where p.id = (select auth.uid()) and not p.bloqueado and (p.rol = 'admin' or exists (
      select 1 from public.accesos a where a.usuario = p.id and a.curso = p_curso and (
        (a.tipo = 'pago' and a.hasta > now())
        or (p_prueba and (a.tipo = 'pago' or a.hasta is null or a.hasta > now()))))))
$$;

create or replace function privado.acceso_video(p_video text) returns boolean
language sql stable security definer set search_path = ''
as $$
  select coalesce((select bool_or(l.tipo = 'clip' or privado.puede(l.curso, l.prueba))
    from public.lecciones l where l.videos @> array[p_video]), false)
$$;

-- Concede un curso. Un pago vigente no lo baja una prueba; si se renueva antes de vencer, los días se suman.
create function privado.conceder(p_uid uuid, p_curso text, p_tipo text, p_dias integer) returns void
language plpgsql security definer set search_path = ''
as $$
declare v public.accesos;
begin
  select * into v from public.accesos where usuario = p_uid and curso = p_curso for update;
  if p_tipo = 'prueba' then
    -- Ni baja un pago ni acorta una prueba.
    if found and (v.tipo = 'pago' or v.hasta is null or (p_dias is not null and v.hasta >= now() + make_interval(days => p_dias))) then return; end if;
    insert into public.accesos (usuario, curso, tipo, desde, hasta, dias)
    values (p_uid, p_curso, 'prueba', now(), now() + make_interval(days => p_dias), p_dias)
    on conflict (usuario, curso) do update set hasta = excluded.hasta, dias = excluded.dias, actualizado_en = now();
  else
    insert into public.accesos (usuario, curso, tipo, desde, hasta, dias)
    values (p_uid, p_curso, 'pago', now(), now() + make_interval(days => p_dias), p_dias)
    on conflict (usuario, curso) do update set tipo = 'pago', dias = excluded.dias, actualizado_en = now(),
      desde = case when public.accesos.tipo = 'pago' and public.accesos.hasta > now() then public.accesos.desde else now() end,
      hasta = case when public.accesos.tipo = 'pago' and public.accesos.hasta > now() then public.accesos.hasta else now() end + make_interval(days => p_dias);
  end if;
end $$;

-- Estrena un código: lo ata al usuario (una sola vez) y concede sus cursos.
create function privado.codigo_vincular(p_codigo text, p_uid uuid) returns boolean
language plpgsql security definer set search_path = ''
as $$
declare v public.codigos; x jsonb;
begin
  update public.codigos set usado_por = p_uid, usado_en = now()
  where codigo = p_codigo and usado_por is null and not bloqueado returning * into v;
  if not found then return false; end if;
  for x in select * from jsonb_array_elements(v.concede) loop
    perform privado.conceder(p_uid, x ->> 'curso', x ->> 'tipo', (x ->> 'dias')::integer);
  end loop;
  update public.perfiles set nombre = case when nombre = '' then v.nombre else nombre end,
    telefono = case when telefono = '' then v.celular else telefono end where id = p_uid;
  update public.pagos g set usuario = p_uid, nombre = case when g.nombre = '' then v.nombre else g.nombre end
  where g.codigo = p_codigo and g.usuario is null;   -- lo que se pagó antes de estrenarlo
  return true;
end $$;

-- Las cuentas de código no tienen contraseña ni cambian de correo: si no, quien entró una vez podría seguir entrando
-- aunque el código se cambie o se pause.
create function privado.cuenta_de_codigo() returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  if old.email like '%@codigo.invalid' then
    new.encrypted_password := old.encrypted_password;
    new.email := old.email;
  end if;
  return new;
end $$;
create trigger zuka_cuenta_de_codigo before update of encrypted_password, email on auth.users
  for each row execute function privado.cuenta_de_codigo();

-- Primer paso de la entrada con código (solo la función entrar-codigo, con la llave de servicio).
create function privado.codigo_entrar(p_codigo text, p_ip text, p_disp text, p_disp_nombre text) returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare v public.codigos; u public.perfiles; v_max integer; v_mail text;
begin
  delete from public.intentos_codigo where creado_en < now() - interval '1 day';
  if (select count(*) from public.intentos_codigo where ip = p_ip and creado_en > now() - interval '15 minutes') >= 10 then
    return jsonb_build_object('ok', false, 'error', 'demasiados_intentos');
  end if;
  select * into v from public.codigos where codigo = p_codigo;
  if not found then
    insert into public.intentos_codigo (ip) values (p_ip);
    return jsonb_build_object('ok', false, 'error', 'no_existe');
  end if;
  if v.bloqueado then return jsonb_build_object('ok', false, 'error', 'bloqueado'); end if;
  if v.usado_por is null then return jsonb_build_object('ok', true, 'nuevo', true); end if;
  select * into u from public.perfiles where id = v.usado_por for update;
  if not found or u.bloqueado then return jsonb_build_object('ok', false, 'error', 'bloqueado'); end if;
  if u.rol = 'admin' then return jsonb_build_object('ok', false, 'error', 'es_admin'); end if;
  if p_disp <> '' and not exists (select 1 from public.dispositivos where usuario = u.id and id = p_disp) then
    select coalesce((select nullif(regexp_replace(valor, '\D', '', 'g'), '')::integer from public.ajustes where clave = 'max_dispositivos'), 3) into v_max;
    if v_max > 0 and (select count(*) from public.dispositivos where usuario = u.id) >= v_max then
      return jsonb_build_object('ok', false, 'error', 'dispositivos');
    end if;
  end if;
  if p_disp <> '' then
    insert into public.dispositivos (usuario, id, nombre) values (u.id, left(p_disp, 60), left(p_disp_nombre, 80))
    on conflict (usuario, id) do update set visto_en = now(), nombre = excluded.nombre;
  end if;
  select email into v_mail from auth.users where id = u.id;
  return jsonb_build_object('ok', true, 'nuevo', false, 'uid', u.id, 'email', v_mail);
end $$;

create function public.codigo_entrar(p_codigo text, p_ip text, p_disp text, p_disp_nombre text) returns jsonb
language sql volatile security invoker set search_path = ''
as $$ select privado.codigo_entrar(p_codigo, p_ip, p_disp, p_disp_nombre) $$;
create function public.codigo_vincular(p_codigo text, p_uid uuid) returns boolean
language sql volatile security invoker set search_path = ''
as $$ select privado.codigo_vincular(p_codigo, p_uid) $$;

-- Con la sesión ya abierta: añade a esta cuenta lo que trae otro código sin estrenar (el avance no se toca).
create or replace function privado.canjear_codigo(p_codigo text, p_confirmar boolean default false) returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  v_uid uuid := auth.uid();
  v_codigo text := upper(regexp_replace(coalesce(p_codigo, ''), '[^A-Za-z0-9]', '', 'g'));
  v public.codigos; v_rol text; v_bloq boolean;
begin
  if v_uid is null then return jsonb_build_object('ok', false, 'error', 'sin_sesion'); end if;
  select rol, bloqueado into v_rol, v_bloq from public.perfiles where id = v_uid for update;
  if not found then return jsonb_build_object('ok', false, 'error', 'sin_perfil'); end if;
  if v_rol = 'admin' then return jsonb_build_object('ok', false, 'error', 'es_admin'); end if;
  if v_bloq then return jsonb_build_object('ok', false, 'error', 'bloqueado'); end if;
  if (select count(*) from public.intentos_canje where usuario = v_uid and creado_en > now() - interval '15 minutes') >= 5 then
    return jsonb_build_object('ok', false, 'error', 'demasiados_intentos');
  end if;
  select * into v from public.codigos where codigo = v_codigo;
  if not found then
    insert into public.intentos_canje (usuario) values (v_uid);
    return jsonb_build_object('ok', false, 'error', 'no_existe');
  end if;
  if v.usado_por = v_uid then return jsonb_build_object('ok', false, 'error', 'es_tuyo'); end if;
  if v.bloqueado then return jsonb_build_object('ok', false, 'error', 'bloqueado'); end if;
  if not privado.codigo_vincular(v_codigo, v_uid) then return jsonb_build_object('ok', false, 'error', 'ya_usado'); end if;
  return jsonb_build_object('ok', true, 'concede', v.concede);
end $$;

-- ---------- estudiante: datos personales, compra y mis códigos ----------
create function privado.guardar_datos(p jsonb) returns void
language plpgsql security definer set search_path = ''
as $$
declare v_uid uuid := auth.uid(); k text;
begin
  if v_uid is null then raise exception 'Hay que iniciar sesión' using errcode = '42501'; end if;
  foreach k in array array['nombre', 'correo', 'telefono', 'genero', 'edad', 'ciudad', 'ocupacion'] loop
    if btrim(coalesce(p ->> k, '')) = '' then raise exception 'Falta %', k using errcode = '22023'; end if;
  end loop;
  if p ->> 'correo' !~ '^\S+@\S+\.\S+$' then raise exception 'Correo no válido' using errcode = '22023'; end if;
  if length(regexp_replace(p ->> 'telefono', '\D', '', 'g')) not between 7 and 15 then raise exception 'Celular no válido' using errcode = '22023'; end if;
  if (p ->> 'acepta')::boolean is distinct from true then raise exception 'Falta la autorización' using errcode = '22023'; end if;
  update public.perfiles set nombre = left(btrim(p ->> 'nombre'), 80), correo = left(lower(btrim(p ->> 'correo')), 120),
    telefono = left(btrim(p ->> 'telefono'), 30), genero = left(p ->> 'genero', 20), edad = left(p ->> 'edad', 20),
    ciudad = left(btrim(p ->> 'ciudad'), 80), ocupacion = left(p ->> 'ocupacion', 30),
    institucion = left(btrim(coalesce(p ->> 'institucion', '')), 120), meta = left(btrim(coalesce(p ->> 'meta', '')), 120),
    presentacion = left(coalesce(p ->> 'presentacion', ''), 30), horas = left(coalesce(p ->> 'horas', ''), 20),
    dificultad = left(btrim(coalesce(p ->> 'dificultad', '')), 120), medio = left(coalesce(p ->> 'medio', ''), 30),
    acepta_mensajes = coalesce((p ->> 'acepta_mensajes')::boolean, false), datos_en = coalesce(datos_en, now())
  where id = v_uid;
end $$;
create function public.guardar_datos(p jsonb) returns void
language sql volatile security invoker set search_path = '' as $$ select privado.guardar_datos(p) $$;

create function privado.pedir_compra(p_producto text) returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare v_uid uuid := auth.uid(); r public.productos;
begin
  if v_uid is null then raise exception 'Hay que iniciar sesión' using errcode = '42501'; end if;
  select * into r from public.productos where id = p_producto and activo;
  if not found then raise exception 'Ese plan ya no está disponible' using errcode = '22023'; end if;
  insert into public.solicitudes (usuario, curso, meses, precio) values (v_uid, r.curso, r.meses, r.precio)
  on conflict (usuario, curso) where estado = 'pendiente' do update set meses = excluded.meses, precio = excluded.precio, creado_en = now();
  return jsonb_build_object('ok', true);
end $$;
create function public.pedir_compra(p_producto text) returns jsonb
language sql volatile security invoker set search_path = '' as $$ select privado.pedir_compra(p_producto) $$;

-- El código con el que se entra (para verlo en «Tú» y mandarlo al comprar).
create function privado.mi_codigo() returns text
language sql stable security definer set search_path = ''
as $$ select codigo from public.codigos where usado_por = (select auth.uid()) and not bloqueado order by usado_en limit 1 $$;
create function public.mi_codigo() returns text
language sql stable security invoker set search_path = '' as $$ select privado.mi_codigo() $$;

-- ---------- panel ----------
drop function public.generar_codigos(integer, text, text, text);
drop function privado.generar_codigos(integer, text, text, text);
drop function public.admin_codigos();
drop function privado.admin_codigos();
drop function public.admin_acceso(uuid, text, text, text, integer);
drop function privado.admin_acceso(uuid, text, text, text, integer);
drop function public.admin_usuarios();
drop function privado.admin_usuarios();

create function privado.codigo_nuevo() returns text
language plpgsql volatile security definer set search_path = ''
as $$
declare
  v_abc constant text := 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  b bytea; c text;
begin
  loop
    b := extensions.gen_random_bytes(10); c := '';
    for i in 0..9 loop c := c || substr(v_abc, (get_byte(b, i) % 32) + 1, 1); end loop;
    exit when not exists (select 1 from public.codigos where codigo = c);
  end loop;
  return c;
end $$;

create function privado.cursos_validos(p jsonb) returns text[]
language plpgsql stable security definer set search_path = ''
as $$
declare v text[];
begin
  select array_agg(distinct x) into v from jsonb_array_elements_text(coalesce(p, '[]')) x;
  if v is null then raise exception 'Elige al menos un curso' using errcode = '22023'; end if;
  if exists (select 1 from unnest(v) x where not exists (select 1 from public.cursos c where c.id = x)) then
    raise exception 'Hay un curso que no existe' using errcode = '22023';
  end if;
  return v;
end $$;

create function privado.dias_validos(p_tipo text, p_dias integer) returns void
language plpgsql immutable set search_path = ''
as $$
begin
  if p_tipo is null or p_tipo not in ('prueba', 'pago') then raise exception 'Tipo de acceso no válido' using errcode = '22023'; end if;
  if (p_tipo = 'pago' and p_dias is null) or p_dias < 1 or p_dias > 3650 then
    raise exception 'Los días deben estar entre 1 y 3650' using errcode = '22023';
  end if;
end $$;

create function privado.admin(p_accion text, p jsonb) returns jsonb
language plpgsql volatile security definer set search_path = ''
as $$
declare
  v_hoy date := (now() at time zone 'America/Bogota')::date;
  v_uid uuid := nullif(p ->> 'usuario', '')::uuid;
  v_cod public.codigos; v_per public.perfiles; v_cursos text[]; v_cur text; v_tipo text := p ->> 'tipo';
  v_dias integer := nullif(p ->> 'dias', '')::integer; v_valor integer := coalesce(nullif(p ->> 'valor', '')::integer, 0);
  v_out jsonb := '[]'; v_txt text; v_ids uuid[]; v_n integer; x jsonb;
begin
  if not privado.es_admin() then raise exception 'Solo administradores' using errcode = '42501'; end if;
  p := coalesce(p, '{}');

  -- consultas
  if p_accion = 'resumen' then
    return privado.admin_resumen() || jsonb_build_object(
      'pago', (select count(distinct a.usuario) from public.accesos a join public.perfiles q on q.id = a.usuario and q.rol = 'estudiante' where a.tipo = 'pago' and a.hasta > now()),
      'prueba', (select count(*) from public.perfiles q where q.rol = 'estudiante'
        and exists (select 1 from public.accesos a where a.usuario = q.id and a.tipo = 'prueba' and (a.hasta is null or a.hasta > now()))
        and not exists (select 1 from public.accesos a where a.usuario = q.id and a.tipo = 'pago')),
      'vencidos', (select count(*) from public.perfiles q where q.rol = 'estudiante'
        and exists (select 1 from public.accesos a where a.usuario = q.id and a.tipo = 'pago')
        and not exists (select 1 from public.accesos a where a.usuario = q.id and a.tipo = 'pago' and a.hasta > now())),
      'sin_acceso', (select count(*) from public.perfiles q where q.rol = 'estudiante' and not exists (select 1 from public.accesos a where a.usuario = q.id)),
      'solicitudes', (select count(*) from public.solicitudes where estado = 'pendiente'),
      'codigos_libres', (select count(*) from public.codigos where usado_por is null and not bloqueado),
      'ventas_30', (select coalesce(sum(valor), 0) from public.pagos where creado_en > now() - interval '30 days'),
      'pagos_30', (select count(*) from public.pagos where creado_en > now() - interval '30 days'),
      'ventas_mes', (select coalesce(jsonb_agg(jsonb_build_object('mes', t.mes, 'valor', t.valor) order by t.mes), '[]') from (
        select to_char(creado_en at time zone 'America/Bogota', 'YYYY-MM') mes, sum(valor) valor from public.pagos
        where creado_en > now() - interval '180 days' group by 1) t),
      'por_curso', (select coalesce(jsonb_agg(jsonb_build_object('curso', c.id, 'nombre', c.nombre, 'publicado', c.publicado,
          'pago', (select count(*) from public.accesos a join public.perfiles q on q.id = a.usuario and q.rol = 'estudiante' where a.curso = c.id and a.tipo = 'pago' and a.hasta > now()),
          'prueba', (select count(*) from public.accesos a join public.perfiles q on q.id = a.usuario and q.rol = 'estudiante' where a.curso = c.id and a.tipo = 'prueba' and (a.hasta is null or a.hasta > now())),
          'completadas', (select count(*) from public.lecciones l join public.progreso g on g.leccion = l.id and g.completada
            join public.perfiles q on q.id = g.usuario and q.rol = 'estudiante' where l.curso = c.id and l.tipo = 'leccion')) order by c.orden), '[]') from public.cursos c),
      'vencen_7', (select coalesce(jsonb_agg(jsonb_build_object('id', q.id, 'nombre', q.nombre, 'telefono', q.telefono, 'curso', a.curso, 'hasta', a.hasta) order by a.hasta), '[]')
        from public.accesos a join public.perfiles q on q.id = a.usuario and q.rol = 'estudiante'
        where a.tipo = 'pago' and a.hasta > now() and a.hasta <= now() + interval '7 days'));

  elsif p_accion = 'usuarios' then
    return (select coalesce(jsonb_agg(to_jsonb(t) order by t.creado_en desc), '[]') from (
      select q.id, q.nombre, coalesce(nullif(q.correo, ''), case when u.email like '%@codigo.invalid' then '' else u.email::text end) correo, q.telefono, q.rol,
        q.bloqueado, q.datos_en, q.creado_en, q.ultima_vez, q.ciudad, q.genero, q.edad, q.ocupacion, q.institucion, q.meta, q.presentacion, q.horas, q.dificultad, q.medio, q.acepta_mensajes, q.xp, coalesce((select n.nota from public.perfil_notas n where n.usuario = q.id), '') nota,
        (select k.codigo from public.codigos k where k.usado_por = q.id order by k.usado_en limit 1) codigo,
        (select coalesce(jsonb_agg(jsonb_build_object('curso', a.curso, 'tipo', a.tipo, 'desde', a.desde, 'hasta', a.hasta) order by a.curso), '[]') from public.accesos a where a.usuario = q.id) accesos,
        (select count(*) from public.progreso g where g.usuario = q.id and g.completada) lecciones,
        coalesce((select round(sum(d.segundos) / 60.0) from public.uso_diario d where d.usuario = q.id and d.dia > v_hoy - 7), 0) minutos_7
      from public.perfiles q join auth.users u on u.id = q.id) t);

  elsif p_accion = 'usuario' then
    return privado.admin_usuario(v_uid) || jsonb_build_object(
      'nota', coalesce((select n.nota from public.perfil_notas n where n.usuario = v_uid), ''),
      'correo_contacto', (select q.correo from public.perfiles q where q.id = v_uid),
      'accesos', (select coalesce(jsonb_agg(to_jsonb(a) order by a.curso), '[]') from public.accesos a where a.usuario = v_uid),
      'pagos', (select coalesce(jsonb_agg(to_jsonb(g) order by g.creado_en desc), '[]') from public.pagos g where g.usuario = v_uid),
      'solicitudes', (select coalesce(jsonb_agg(to_jsonb(s) order by s.creado_en desc), '[]') from public.solicitudes s where s.usuario = v_uid),
      'dispositivos', (select coalesce(jsonb_agg(to_jsonb(d) order by d.visto_en desc), '[]') from public.dispositivos d where d.usuario = v_uid),
      'codigos', (select coalesce(jsonb_agg(to_jsonb(k) order by k.usado_en), '[]') from public.codigos k where k.usado_por = v_uid));

  elsif p_accion = 'codigos' then
    return (select coalesce(jsonb_agg(to_jsonb(k) || jsonb_build_object('usado_nombre', q.nombre, 'usado_bloqueado', q.bloqueado,
        'accesos', (select coalesce(jsonb_agg(jsonb_build_object('curso', a.curso, 'tipo', a.tipo, 'hasta', a.hasta) order by a.curso), '[]') from public.accesos a where a.usuario = k.usado_por)) order by k.creado_en desc, k.codigo), '[]')
      from public.codigos k left join public.perfiles q on q.id = k.usado_por);

  elsif p_accion = 'solicitudes' then
    return (select coalesce(jsonb_agg(to_jsonb(s) || jsonb_build_object('nombre', q.nombre, 'telefono', q.telefono,
        'codigo', (select k.codigo from public.codigos k where k.usado_por = s.usuario order by k.usado_en limit 1)) order by (s.estado = 'pendiente') desc, s.creado_en desc), '[]')
      from public.solicitudes s join public.perfiles q on q.id = s.usuario);

  elsif p_accion = 'pagos' then
    return (select coalesce(jsonb_agg(to_jsonb(g) order by g.creado_en desc), '[]') from public.pagos g);

  elsif p_accion = 'auditoria' then
    return (select coalesce(jsonb_agg(t.j), '[]') from (select to_jsonb(a) || jsonb_build_object('quien', u.email) j
      from public.auditoria a left join auth.users u on u.id = a.admin order by a.creado_en desc limit 200) t);
  end if;

  -- cambios: todos dejan rastro
  insert into public.auditoria (admin, accion, detalle) values (auth.uid(), p_accion, p);

  if p_accion = 'generar' then
    v_n := coalesce((p ->> 'cantidad')::integer, 1);
    if v_n not between 1 and 200 then raise exception 'La cantidad debe estar entre 1 y 200' using errcode = '22023'; end if;
    perform privado.dias_validos(v_tipo, v_dias);
    v_cursos := privado.cursos_validos(p -> 'cursos');
    for i in 1..v_n loop
      insert into public.codigos (codigo, concede, nombre, celular, nota, dias, creado_por) values (privado.codigo_nuevo(),
        (select jsonb_agg(jsonb_build_object('curso', c, 'tipo', v_tipo, 'dias', v_dias)) from unnest(v_cursos) c),
        left(coalesce(p ->> 'nombre', ''), 80), left(coalesce(p ->> 'celular', ''), 30), left(coalesce(p ->> 'nota', ''), 200), v_dias, auth.uid())
      returning * into v_cod;
      v_out := v_out || jsonb_build_array(to_jsonb(v_cod));
      -- Un código que ya se vendió al generarlo entra en las ventas.
      if v_tipo = 'pago' and v_valor > 0 then
        insert into public.pagos (nombre, codigo, curso, dias, valor, metodo, nota)
        select v_cod.nombre, v_cod.codigo, c, v_dias, case when o = 1 then v_valor else 0 end, left(coalesce(p ->> 'metodo', ''), 40), left(coalesce(p ->> 'nota', ''), 200)
        from unnest(v_cursos) with ordinality t(c, o);
      end if;
    end loop;
    return v_out;

  -- Activa cursos en un código (estrenado o no) o en uno o varios usuarios, y anota el pago.
  elsif p_accion = 'activar' then
    perform privado.dias_validos(v_tipo, v_dias);
    v_cursos := privado.cursos_validos(p -> 'cursos');
    if coalesce(p ->> 'codigo', '') <> '' then
      select * into v_cod from public.codigos where codigo = p ->> 'codigo' for update;
      if not found then raise exception 'No existe ese código' using errcode = '22023'; end if;
      v_ids := case when v_cod.usado_por is null then '{}' else array[v_cod.usado_por] end;
      if v_cod.usado_por is null then
        -- Igual que en una cuenta: pago + pago suma los días y una prueba no baja un pago.
        update public.codigos set concede = (
          select coalesce(jsonb_agg(e), '[]') from jsonb_array_elements(v_cod.concede) e where not (e ->> 'curso' = any (v_cursos)))
          || (select jsonb_agg(case when ya.tipo = 'pago' and v_tipo = 'prueba' then jsonb_build_object('curso', c, 'tipo', 'pago', 'dias', ya.dias)
              else jsonb_build_object('curso', c, 'tipo', v_tipo, 'dias', v_dias + case when ya.tipo = 'pago' then ya.dias else 0 end) end)
            from unnest(v_cursos) c left join lateral (select e ->> 'tipo' tipo, (e ->> 'dias')::integer dias
              from jsonb_array_elements(v_cod.concede) e where e ->> 'curso' = c limit 1) ya on true)
        where codigo = v_cod.codigo;
      end if;
    else
      select array_agg(t::uuid) into v_ids from jsonb_array_elements_text(p -> 'usuarios') t;
      if v_ids is null then raise exception 'Elige al menos un usuario' using errcode = '22023'; end if;
    end if;
    foreach v_uid in array v_ids loop
      select * into v_per from public.perfiles where id = v_uid for update;
      if not found then raise exception 'No existe ese usuario' using errcode = '22023'; end if;
      foreach v_cur in array v_cursos loop perform privado.conceder(v_uid, v_cur, v_tipo, v_dias); end loop;
    end loop;
    if v_tipo = 'pago' then
      foreach v_uid in array (case when cardinality(v_ids) = 0 then array[null::uuid] else v_ids end) loop
        insert into public.pagos (usuario, nombre, codigo, curso, dias, valor, metodo, nota)
        select v_uid, coalesce((select nombre from public.perfiles where id = v_uid), v_cod.nombre),
          coalesce((select k.codigo from public.codigos k where k.usado_por = v_uid order by k.usado_en limit 1), v_cod.codigo, ''),
          c, v_dias, case when o = 1 then v_valor else 0 end, left(coalesce(p ->> 'metodo', ''), 40), left(coalesce(p ->> 'nota', ''), 200)
        from unnest(v_cursos) with ordinality t(c, o);
        update public.solicitudes set estado = 'pagada' where usuario = v_uid and curso = any (v_cursos) and estado = 'pendiente';
      end loop;
    end if;
    return jsonb_build_object('ok', true);

  elsif p_accion = 'acceso_fecha' then
    if nullif(p ->> 'hasta', '') is null or (p ->> 'hasta')::date not between date '2024-01-01' and date '2100-01-01' then
      raise exception 'Elige una fecha válida' using errcode = '22023';
    end if;
    update public.accesos set hasta = ((p ->> 'hasta')::date + 1)::timestamp at time zone 'America/Bogota' - interval '1 second', actualizado_en = now()
    where usuario = v_uid and curso = p ->> 'curso';

  elsif p_accion = 'acceso_quitar' then
    delete from public.accesos where usuario = v_uid and curso = p ->> 'curso';

  elsif p_accion = 'usuario_editar' then
    update public.perfiles set nombre = left(coalesce(p ->> 'nombre', nombre), 80), telefono = left(coalesce(p ->> 'telefono', telefono), 30),
      correo = left(coalesce(p ->> 'correo', correo), 120) where id = v_uid;
    if p ? 'nota' then
      insert into public.perfil_notas (usuario, nota) values (v_uid, left(p ->> 'nota', 400)) on conflict (usuario) do update set nota = excluded.nota;
    end if;

  elsif p_accion = 'usuario_bloquear' then
    update public.perfiles set bloqueado = (p ->> 'si')::boolean where id = v_uid and rol = 'estudiante';
    if not found then raise exception 'Una cuenta administradora no se bloquea' using errcode = '22023'; end if;
    if (p ->> 'si')::boolean then delete from auth.sessions where user_id = v_uid; end if;

  elsif p_accion = 'usuario_borrar' then
    if not exists (select 1 from public.perfiles where id = v_uid and rol = 'estudiante') then
      raise exception 'Una cuenta administradora no se elimina' using errcode = '22023';
    end if;
    delete from public.codigos where usado_por = v_uid;   -- si no, el código quedaría libre otra vez
    delete from auth.users where id = v_uid;

  -- Pasa avance, accesos, códigos y pagos de una cuenta a otra y borra la primera (dos códigos de la misma persona).
  elsif p_accion = 'usuario_unir' then
    if v_uid is null or v_uid = (p ->> 'hacia')::uuid then raise exception 'Elige dos cuentas distintas' using errcode = '22023'; end if;
    if (select count(*) from public.perfiles where id in (v_uid, (p ->> 'hacia')::uuid) and rol = 'estudiante') <> 2 then
      raise exception 'Solo se unen cuentas de estudiantes' using errcode = '22023';
    end if;
    insert into public.progreso as g (usuario, leccion, completada, segundos_vistos, actualizado_en, completada_en)
    select (p ->> 'hacia')::uuid, leccion, completada, segundos_vistos, actualizado_en, completada_en from public.progreso where usuario = v_uid
    on conflict (usuario, leccion) do update set completada = g.completada or excluded.completada,
      segundos_vistos = greatest(g.segundos_vistos, excluded.segundos_vistos), completada_en = coalesce(g.completada_en, excluded.completada_en);
    insert into public.accesos as a (usuario, curso, tipo, desde, hasta, dias)
    select (p ->> 'hacia')::uuid, curso, tipo, desde, hasta, dias from public.accesos where usuario = v_uid
    on conflict (usuario, curso) do update set tipo = excluded.tipo, dias = excluded.dias,
      desde = case when a.tipo = 'pago' and a.hasta > now() then a.desde else excluded.desde end,
      -- Dos pagos vigentes del mismo curso: se suman los días que quedaban en cada uno.
      hasta = case when a.tipo = 'pago' and excluded.tipo = 'pago' and a.hasta > now() and excluded.hasta > now() then a.hasta + (excluded.hasta - now())
        when a.tipo = 'pago' then greatest(a.hasta, excluded.hasta) else excluded.hasta end
      where excluded.tipo = 'pago';
    -- El resto del avance lo junta la app (js/estado.js) la próxima vez que abra: aquí solo se le deja a mano.
    insert into public.estado_app as s (usuario, datos) select (p ->> 'hacia')::uuid, datos from public.estado_app where usuario = v_uid
    on conflict (usuario) do update set datos = s.datos || jsonb_build_object('_unir', coalesce(s.datos -> '_unir', '[]') || jsonb_build_array(excluded.datos - '_unir') || coalesce(excluded.datos -> '_unir', '[]'));
    update public.perfiles h set nombre = coalesce(nullif(h.nombre, ''), o.nombre), telefono = coalesce(nullif(h.telefono, ''), o.telefono), correo = coalesce(nullif(h.correo, ''), o.correo),
      genero = coalesce(nullif(h.genero, ''), o.genero), edad = coalesce(nullif(h.edad, ''), o.edad), ciudad = coalesce(nullif(h.ciudad, ''), o.ciudad),
      ocupacion = coalesce(nullif(h.ocupacion, ''), o.ocupacion), institucion = coalesce(nullif(h.institucion, ''), o.institucion), meta = coalesce(nullif(h.meta, ''), o.meta),
      presentacion = coalesce(nullif(h.presentacion, ''), o.presentacion), horas = coalesce(nullif(h.horas, ''), o.horas), dificultad = coalesce(nullif(h.dificultad, ''), o.dificultad),
      medio = coalesce(nullif(h.medio, ''), o.medio), acepta_mensajes = case when h.datos_en is null then o.acepta_mensajes else h.acepta_mensajes end, datos_en = coalesce(h.datos_en, o.datos_en)
    from public.perfiles o where h.id = (p ->> 'hacia')::uuid and o.id = v_uid;
    insert into public.perfil_notas as n (usuario, nota) select (p ->> 'hacia')::uuid, nota from public.perfil_notas where usuario = v_uid
    on conflict (usuario) do update set nota = left(concat_ws(' · ', nullif(n.nota, ''), nullif(excluded.nota, '')), 400);
    update public.solicitudes s set usuario = (p ->> 'hacia')::uuid where s.usuario = v_uid and not (s.estado = 'pendiente' and exists (
      select 1 from public.solicitudes t where t.usuario = (p ->> 'hacia')::uuid and t.curso = s.curso and t.estado = 'pendiente'));
    insert into public.uso_diario as d (usuario, dia, segundos, lecciones, ejercicios, aciertos)
    select (p ->> 'hacia')::uuid, dia, segundos, lecciones, ejercicios, aciertos from public.uso_diario where usuario = v_uid
    on conflict (usuario, dia) do update set segundos = least(d.segundos + excluded.segundos, 86400), lecciones = d.lecciones + excluded.lecciones,
      ejercicios = d.ejercicios + excluded.ejercicios, aciertos = d.aciertos + excluded.aciertos;
    update public.codigos set usado_por = (p ->> 'hacia')::uuid where usado_por = v_uid;
    update public.pagos set usuario = (p ->> 'hacia')::uuid where usuario = v_uid;
    delete from auth.users where id = v_uid;

  elsif p_accion = 'dispositivos_borrar' then
    delete from public.dispositivos where usuario = v_uid and (coalesce(p ->> 'id', '') = '' or id = p ->> 'id');
    delete from auth.sessions where user_id = v_uid and not privado.es_admin_id(v_uid);   -- no se sabe cuál es la suya: los demás vuelven a entrar con el código

  elsif p_accion = 'codigo_editar' then
    update public.codigos set nombre = left(coalesce(p ->> 'nombre', nombre), 80), celular = left(coalesce(p ->> 'celular', celular), 30),
      nota = left(coalesce(p ->> 'nota', nota), 200), bloqueado = coalesce((p ->> 'bloqueado')::boolean, bloqueado) where codigo = p ->> 'codigo'
    returning * into v_cod;
    if v_cod.bloqueado and v_cod.usado_por is not null and p ? 'bloqueado' then
      delete from auth.sessions where user_id = v_cod.usado_por and not privado.es_admin_id(v_cod.usado_por);
    end if;

  elsif p_accion = 'codigo_borrar' then
    delete from public.codigos where codigo = p ->> 'codigo' and usado_por is null;
    if not found then raise exception 'Solo se borra un código sin estrenar; si ya se usó, bloquéalo' using errcode = '22023'; end if;

  -- Cambia el código por otro (si se filtró): misma cuenta, mismo avance; el viejo deja de servir.
  elsif p_accion = 'codigo_renovar' then
    v_txt := privado.codigo_nuevo();
    update public.codigos set codigo = v_txt where codigo = p ->> 'codigo' returning * into v_cod;
    if not found then raise exception 'No existe ese código' using errcode = '22023'; end if;
    update public.pagos set codigo = v_txt where codigo = p ->> 'codigo';
    if v_cod.usado_por is not null and not privado.es_admin_id(v_cod.usado_por) then
      delete from auth.sessions where user_id = v_cod.usado_por;
      delete from public.dispositivos where usuario = v_cod.usado_por;
    end if;
    return to_jsonb(v_cod);

  elsif p_accion = 'solicitud_estado' then
    update public.solicitudes set estado = p ->> 'estado' where id = (p ->> 'id')::bigint;
  elsif p_accion = 'pago_borrar' then
    delete from public.pagos where id = (p ->> 'id')::bigint;

  elsif p_accion = 'producto_guardar' then
    insert into public.productos (id, curso, meses, dias, precio, activo)
    values ((p ->> 'curso') || '-' || (p ->> 'meses'), p ->> 'curso', (p ->> 'meses')::integer, coalesce(v_dias, (p ->> 'meses')::integer * 30), nullif(p ->> 'precio', '')::integer, coalesce((p ->> 'activo')::boolean, true))
    on conflict (curso, meses) do update set precio = excluded.precio, activo = excluded.activo, dias = excluded.dias;
  elsif p_accion = 'producto_borrar' then
    delete from public.productos where id = p ->> 'id';
  elsif p_accion = 'ajustes_guardar' then
    for v_txt in select k from jsonb_object_keys(p) k loop
      update public.ajustes set valor = left(p ->> v_txt, 600) where clave = v_txt;
    end loop;
  else
    raise exception 'Acción desconocida: %', p_accion using errcode = '22023';
  end if;
  return jsonb_build_object('ok', true);
end $$;

create function privado.es_admin_id(p_id uuid) returns boolean
language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.perfiles where id = p_id and rol = 'admin') $$;

create function public.admin(p_accion text, p jsonb default '{}') returns jsonb
language sql volatile security invoker set search_path = '' as $$ select privado.admin(p_accion, p) $$;

-- ---------- filas ----------
alter table public.accesos enable row level security;
alter table public.productos enable row level security;
alter table public.solicitudes enable row level security;
alter table public.pagos enable row level security;
alter table public.ajustes enable row level security;
alter table public.estado_app enable row level security;
alter table public.dispositivos enable row level security;
alter table public.intentos_codigo enable row level security;
alter table public.auditoria enable row level security;
alter table public.perfil_notas enable row level security;
revoke all on public.accesos, public.productos, public.solicitudes, public.pagos, public.ajustes, public.estado_app,
  public.dispositivos, public.intentos_codigo, public.auditoria, public.perfil_notas from anon, authenticated;
grant select on public.productos, public.ajustes to anon, authenticated;
grant select on public.accesos, public.solicitudes, public.pagos, public.dispositivos, public.intentos_codigo, public.auditoria, public.perfil_notas to authenticated;
grant select, insert, update on public.estado_app to authenticated;
create policy productos_ver on public.productos for select to anon, authenticated using (true);
create policy ajustes_ver on public.ajustes for select to anon, authenticated using (true);
create policy accesos_ver on public.accesos for select to authenticated using (usuario = (select auth.uid()) or (select public.es_admin()));
create policy solicitudes_ver on public.solicitudes for select to authenticated using (usuario = (select auth.uid()) or (select public.es_admin()));
create policy pagos_ver on public.pagos for select to authenticated using ((select public.es_admin()));
create policy dispositivos_ver on public.dispositivos for select to authenticated using (usuario = (select auth.uid()) or (select public.es_admin()));
create policy intentos_codigo_ver on public.intentos_codigo for select to authenticated using ((select public.es_admin()));
create policy auditoria_ver on public.auditoria for select to authenticated using ((select public.es_admin()));
create policy perfil_notas_ver on public.perfil_notas for select to authenticated using ((select public.es_admin()));
create policy estado_ver on public.estado_app for select to authenticated using (usuario = (select auth.uid()));
create policy estado_crear on public.estado_app for insert to authenticated with check (usuario = (select auth.uid()));
create policy estado_editar on public.estado_app for update to authenticated using (usuario = (select auth.uid())) with check (usuario = (select auth.uid()));
-- ---------- funciones: quién las llama ----------
revoke execute on function privado.puede(text, boolean), privado.conceder(uuid, text, text, integer), privado.codigo_vincular(text, uuid),
  privado.codigo_entrar(text, text, text, text), public.codigo_entrar(text, text, text, text), public.codigo_vincular(text, uuid),
  privado.guardar_datos(jsonb), public.guardar_datos(jsonb), privado.pedir_compra(text), public.pedir_compra(text), privado.mi_codigo(), public.mi_codigo(),
  privado.cuenta_de_codigo(), privado.codigo_nuevo(), privado.cursos_validos(jsonb), privado.dias_validos(text, integer), privado.admin(text, jsonb), public.admin(text, jsonb), privado.es_admin_id(uuid)
  from public, anon, authenticated;
grant execute on function privado.puede(text, boolean) to anon, authenticated;
grant execute on function privado.guardar_datos(jsonb), public.guardar_datos(jsonb), privado.pedir_compra(text), public.pedir_compra(text),
  privado.mi_codigo(), public.mi_codigo(), privado.admin(text, jsonb), public.admin(text, jsonb) to authenticated;
grant execute on function privado.codigo_entrar(text, text, text, text), public.codigo_entrar(text, text, text, text),
  privado.codigo_vincular(text, uuid), public.codigo_vincular(text, uuid) to service_role;
