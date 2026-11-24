-- Tienda: paquetes, libros físicos y digitales, envíos, pedidos y horas de asesoría.
-- Spec: docs/superpowers/specs/2026-11-24-tienda-libros.md. Los precios se editan en el panel.

-- ---------- precios sugeridos de los cursos (solo donde no había) ----------
update public.productos p set precio = v.precio from (values ('preuda-1', 39900), ('preuda-3', 89900), ('preuda-6', 139900),
  ('algebra-6', 39900), ('trig-6', 29900), ('calc-6', 39900), ('geo-6', 39900)) v(id, precio)
where p.id = v.id and p.precio is null;

-- ---------- tablas ----------
create table public.libros (
  id integer primary key check (id between 1 and 99),
  titulo text not null, subtitulo text not null default '',
  paginas integer not null default 0 check (paginas between 0 and 2000),
  muestra integer not null default 8 check (muestra between 0 and 60),   -- primeras páginas que ve cualquiera con cuenta
  version integer not null default 0,                                     -- carpeta de las páginas: libros/<id>/v<version>/0001.webp
  indice jsonb not null default '[]',
  publicado boolean not null default false
);
insert into public.libros (id, titulo, subtitulo, paginas) values
  (1, 'Número y forma', 'Razonamiento lógico', 143), (2, 'Orden, lógica y azar', 'Razonamiento lógico', 137),
  (3, 'Leer lo que dice', 'Comprensión lectora', 115), (4, 'Leer lo que quiere decir', 'Comprensión lectora', 91);

-- `da`: lo que entrega al pagarse. { cursos: [], dias, libros: [digitales], fisicos: [], horas, horas_tipo }
create table public.articulos (
  id text primary key check (char_length(id) <= 40),
  tipo text not null check (tipo in ('paquete', 'fisico', 'digital', 'asesoria')),
  nombre text not null check (char_length(nombre) between 1 and 80),
  detalle text not null default '' check (char_length(detalle) <= 240),
  precio integer check (precio >= 0),
  precio_plan integer check (precio_plan >= 0),   -- para quien tiene un curso pagado y vigente
  activo boolean not null default true,
  destacado boolean not null default false,
  orden integer not null default 0,
  da jsonb not null default '{}'
);
insert into public.articulos (id, tipo, nombre, detalle, precio, precio_plan, destacado, orden, da) values
  ('paq-digital', 'paquete', 'Digital', 'Preuniversitario completo por 6 meses y los 4 libros para leer en la app.', 169900, null, true, 1, '{"cursos": ["preuda"], "dias": 180, "libros": [1, 2, 3, 4]}'),
  ('paq-completo', 'paquete', 'Completo', 'Preuniversitario por 6 meses, los 4 libros impresos en tu casa, los 4 digitales y 1 hora de asesoría.', 319900, null, false, 2, '{"cursos": ["preuda"], "dias": 180, "libros": [1, 2, 3, 4], "fisicos": [1, 2, 3, 4], "horas": 1, "horas_tipo": "general"}'),
  ('paq-alg-trig', 'paquete', 'Álgebra y Trigonometría', 'Los dos cursos completos por 6 meses.', 59900, null, false, 3, '{"cursos": ["algebra", "trig"], "dias": 180}'),
  ('fis-juego', 'fisico', 'Los 4 libros impresos', 'Impresos a color, con envío. Incluye los 4 digitales.', 179900, null, true, 1, '{"fisicos": [1, 2, 3, 4], "libros": [1, 2, 3, 4]}'),
  ('fis-1', 'fisico', 'Libro 1 · Número y forma', 'Impreso a color, con envío.', 59900, null, false, 2, '{"fisicos": [1]}'),
  ('fis-2', 'fisico', 'Libro 2 · Orden, lógica y azar', 'Impreso a color, con envío.', 59900, null, false, 3, '{"fisicos": [2]}'),
  ('fis-3', 'fisico', 'Libro 3 · Leer lo que dice', 'Impreso a color, con envío.', 49900, null, false, 4, '{"fisicos": [3]}'),
  ('fis-4', 'fisico', 'Libro 4 · Leer lo que quiere decir', 'Impreso a color, con envío.', 49900, null, false, 5, '{"fisicos": [4]}'),
  ('dig-juego', 'digital', 'Los 4 libros digitales', 'Para leer en la app durante 12 meses.', 59900, 39900, true, 1, '{"libros": [1, 2, 3, 4]}'),
  ('dig-1', 'digital', 'Libro 1 · Número y forma', 'Para leer en la app durante 12 meses.', 19900, null, false, 2, '{"libros": [1]}'),
  ('dig-2', 'digital', 'Libro 2 · Orden, lógica y azar', 'Para leer en la app durante 12 meses.', 19900, null, false, 3, '{"libros": [2]}'),
  ('dig-3', 'digital', 'Libro 3 · Leer lo que dice', 'Para leer en la app durante 12 meses.', 19900, null, false, 4, '{"libros": [3]}'),
  ('dig-4', 'digital', 'Libro 4 · Leer lo que quiere decir', 'Para leer en la app durante 12 meses.', 19900, null, false, 5, '{"libros": [4]}'),
  ('ase-1', 'asesoria', '1 hora', 'Preuniversitario, Álgebra, Trigonometría y Geometría.', 45000, 40000, false, 1, '{"horas": 1, "horas_tipo": "general"}'),
  ('ase-4', 'asesoria', '4 horas', 'Para usarlas cuando quieras. $ 40.000 cada una.', 160000, null, true, 2, '{"horas": 4, "horas_tipo": "general"}'),
  ('ase-8', 'asesoria', '8 horas', 'El mejor precio por hora: $ 36.250.', 290000, null, false, 3, '{"horas": 8, "horas_tipo": "general"}'),
  ('ase-uni', 'asesoria', '1 hora · Cálculo, Física o Álgebra Lineal', 'Para materias de universidad.', 55000, null, false, 4, '{"horas": 1, "horas_tipo": "universidad"}'),
  ('ase-grupo', 'asesoria', '1 hora en grupo de 3', 'Precio por persona. La hora se acuerda por WhatsApp.', 25000, null, false, 5, '{"horas": 1, "horas_tipo": "grupo"}');

create table public.envios (
  id text primary key check (char_length(id) <= 30),
  nombre text not null check (char_length(nombre) between 1 and 80),
  detalle text not null default '' check (char_length(detalle) <= 160),
  precio integer not null check (precio >= 0),
  activo boolean not null default true,
  orden integer not null default 0
);
insert into public.envios (id, nombre, detalle, precio, orden) values
  ('medellin', 'Medellín y área metropolitana', 'De 2 a 4 días hábiles después de impreso.', 12000, 1),
  ('antioquia', 'Antioquia y ciudades cercanas', 'De 3 a 5 días hábiles después de impreso.', 16000, 2),
  ('nacional', 'Resto del país', 'De 3 a 7 días hábiles después de impreso.', 20000, 3),
  ('especial', 'Zonas especiales', 'Municipios apartados o de difícil acceso.', 46000, 4);

create table public.pedidos (
  id bigint generated always as identity (start with 1001) primary key,
  usuario uuid references auth.users (id) on delete set null,
  nombre text not null default '', telefono text not null default '', codigo text not null default '',
  items jsonb not null,                       -- [{ id, nombre, tipo, precio, cantidad, da }], con el precio del momento
  subtotal integer not null, envio integer not null default 0, total integer not null,
  zona text not null default '', direccion jsonb not null default '{}',
  estado text not null default 'pendiente' check (estado in ('pendiente', 'pagado', 'preparando', 'enviado', 'entregado', 'cancelado')),
  transportadora text not null default '' check (char_length(transportadora) <= 40),
  guia text not null default '' check (char_length(guia) <= 60),
  creado_en timestamptz not null default now(), pagado_en timestamptz, enviado_en timestamptz, entregado_en timestamptz,
  clave text check (char_length(clave) <= 60),   -- la pone la app: si el envío se repite, es el mismo pedido
  unique (usuario, clave)
);
create index pedidos_usuario_idx on public.pedidos (usuario);
create index pedidos_estado_idx on public.pedidos (estado, creado_en);

create table public.libros_acceso (
  usuario uuid not null references auth.users (id) on delete cascade,
  libro integer not null references public.libros (id) on delete cascade,
  desde timestamptz not null default now(), hasta timestamptz not null,
  primary key (usuario, libro)
);
create index libros_acceso_libro_idx on public.libros_acceso (libro);

create table public.asesorias (
  id bigint generated always as identity primary key,
  usuario uuid not null references auth.users (id) on delete cascade,
  curso text not null references public.cursos (id),
  temas jsonb not null default '[]',
  inicio timestamptz not null, minutos integer not null default 60,
  nota text not null default '' check (char_length(nota) <= 140),
  tipo text not null check (tipo in ('general', 'universidad')),
  estado text not null default 'pendiente' check (estado in ('pendiente', 'confirmada', 'hecha', 'cancelada')),
  enlace text not null default '' check (char_length(enlace) <= 300),
  creado_en timestamptz not null default now()
);
create index asesorias_usuario_idx on public.asesorias (usuario);
create index asesorias_inicio_idx on public.asesorias (inicio);
create index asesorias_curso_idx on public.asesorias (curso);

-- Horas de asesoría: cada fila suma o resta; el saldo es la suma.
create table public.horas (
  id bigint generated always as identity primary key,
  usuario uuid not null references auth.users (id) on delete cascade,
  tipo text not null check (tipo in ('general', 'universidad', 'grupo')),
  cambio integer not null check (cambio <> 0 and abs(cambio) <= 100),
  motivo text not null default '' check (char_length(motivo) <= 120),
  creado_en timestamptz not null default now()
);
create index horas_usuario_idx on public.horas (usuario, tipo);

-- ---------- filas ----------
alter table public.libros enable row level security;
alter table public.articulos enable row level security;
alter table public.envios enable row level security;
alter table public.pedidos enable row level security;
alter table public.libros_acceso enable row level security;
alter table public.asesorias enable row level security;
alter table public.horas enable row level security;
revoke all on public.libros, public.articulos, public.envios, public.pedidos, public.libros_acceso, public.asesorias, public.horas from anon, authenticated;
grant select on public.libros, public.articulos, public.envios to anon, authenticated;
grant select on public.pedidos, public.libros_acceso, public.asesorias, public.horas to authenticated;
create policy libros_ver on public.libros for select to anon, authenticated using (true);
create policy articulos_ver on public.articulos for select to anon, authenticated using (true);
create policy envios_ver on public.envios for select to anon, authenticated using (true);
create policy pedidos_ver on public.pedidos for select to authenticated using (usuario = (select auth.uid()) or (select public.es_admin()));
create policy libros_acceso_ver on public.libros_acceso for select to authenticated using (usuario = (select auth.uid()) or (select public.es_admin()));
create policy asesorias_ver on public.asesorias for select to authenticated using (usuario = (select auth.uid()) or (select public.es_admin()));
create policy horas_ver on public.horas for select to authenticated using (usuario = (select auth.uid()) or (select public.es_admin()));

-- ---------- estudiante ----------
create function privado.con_plan(p_uid uuid) returns boolean
language sql stable security definer set search_path = ''
as $$ select exists (select 1 from public.accesos where usuario = p_uid and tipo = 'pago' and hasta > now()) $$;

create function privado.saldo_horas(p_uid uuid, p_tipo text) returns integer
language sql stable security definer set search_path = ''
as $$ select coalesce(sum(cambio), 0)::integer from public.horas where usuario = p_uid and tipo = p_tipo $$;

-- El precio lo pone la base: del navegador solo llegan los artículos, la zona y la dirección.
create function privado.crear_pedido(p jsonb) returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare
  v_uid uuid := auth.uid(); u public.perfiles; x jsonb; a public.articulos; z public.envios; v public.pedidos;
  v_items jsonb := '[]'; v_sub integer := 0; v_fis integer := 0; v_n integer; v_precio integer; v_plan boolean; v_dir jsonb := '{}'; k text;
begin
  if v_uid is null then raise exception 'Entra con tu código' using errcode = '42501'; end if;
  select * into u from public.perfiles where id = v_uid for update;
  if not found or u.bloqueado then raise exception 'Tu acceso está en pausa' using errcode = '42501'; end if;
  if coalesce(p ->> 'clave', '') <> '' then
    select * into v from public.pedidos where usuario = v_uid and clave = p ->> 'clave';
    if found then return to_jsonb(v); end if;
  end if;
  if jsonb_typeof(p -> 'items') is distinct from 'array' or jsonb_array_length(p -> 'items') not between 1 and 20 then
    raise exception 'Elige al menos un artículo' using errcode = '22023';
  end if;
  if (select count(*) from public.pedidos where usuario = v_uid and estado = 'pendiente') >= 5 then
    raise exception 'Tienes varios pedidos por pagar. Cancela uno para hacer otro.' using errcode = '22023';
  end if;
  v_plan := privado.con_plan(v_uid);
  for x in select * from jsonb_array_elements(p -> 'items') loop
    select * into a from public.articulos where id = x ->> 'id' and activo;
    if not found or a.precio is null then raise exception 'Un artículo ya no está disponible' using errcode = '22023'; end if;
    -- Lo digital no se vende hasta que sus libros estén subidos y publicados.
    if exists (select 1 from jsonb_array_elements_text(coalesce(a.da -> 'libros', '[]')) t where not exists (
      select 1 from public.libros b where b.id = t::integer and b.publicado and b.version > 0 and b.paginas > 0)) then
      raise exception 'Un artículo ya no está disponible' using errcode = '22023';
    end if;
    v_n := least(greatest(coalesce((x ->> 'cantidad')::integer, 1), 1), case when a.tipo in ('fisico', 'asesoria') then 10 else 1 end);
    v_precio := case when v_plan then coalesce(a.precio_plan, a.precio) else a.precio end;
    v_sub := v_sub + v_precio * v_n;
    v_fis := v_fis + v_n * coalesce(jsonb_array_length(a.da -> 'fisicos'), 0);
    v_items := v_items || jsonb_build_array(jsonb_build_object('id', a.id, 'nombre', a.nombre, 'tipo', a.tipo, 'precio', v_precio, 'cantidad', v_n, 'da', a.da));
  end loop;
  if v_fis > 0 then
    select * into z from public.envios where id = p ->> 'zona' and activo;
    if not found then raise exception 'Elige a dónde enviamos' using errcode = '22023'; end if;
    foreach k in array array['nombre', 'telefono', 'departamento', 'ciudad', 'direccion'] loop
      if btrim(coalesce(p -> 'direccion' ->> k, '')) = '' then raise exception 'Faltan datos del envío' using errcode = '22023'; end if;
    end loop;
    foreach k in array array['nombre', 'telefono', 'documento', 'departamento', 'ciudad', 'direccion', 'detalle'] loop
      v_dir := v_dir || jsonb_build_object(k, left(btrim(coalesce(p -> 'direccion' ->> k, '')), 120));
    end loop;
  end if;
  insert into public.pedidos (usuario, clave, nombre, telefono, codigo, items, subtotal, envio, total, zona, direccion)
  values (v_uid, nullif(left(coalesce(p ->> 'clave', ''), 60), ''), coalesce(nullif(u.nombre, ''), v_dir ->> 'nombre', ''), coalesce(nullif(u.telefono, ''), v_dir ->> 'telefono', ''), coalesce(privado.mi_codigo(), ''), v_items, v_sub,
    case when v_fis > 0 then z.precio * ceil(v_fis / 8.0)::integer else 0 end, v_sub + case when v_fis > 0 then z.precio * ceil(v_fis / 8.0)::integer else 0 end,
    case when v_fis > 0 then z.nombre else '' end, v_dir)
  returning * into v;
  return to_jsonb(v);
end $$;
create function public.crear_pedido(p jsonb) returns jsonb language sql volatile security invoker set search_path = '' as $$ select privado.crear_pedido(p) $$;

create function privado.cancelar_pedido(p_id bigint) returns void
language plpgsql security definer set search_path = ''
as $$
begin
  update public.pedidos set estado = 'cancelado' where id = p_id and usuario = auth.uid() and estado = 'pendiente';
  if not found then raise exception 'Ese pedido ya no se puede cancelar aquí' using errcode = '22023'; end if;
end $$;
create function public.cancelar_pedido(p_id bigint) returns void language sql volatile security invoker set search_path = '' as $$ select privado.cancelar_pedido(p_id) $$;

create function privado.mi_saldo() returns jsonb
language sql stable security definer set search_path = ''
as $$ select jsonb_build_object('general', privado.saldo_horas(auth.uid(), 'general'), 'universidad', privado.saldo_horas(auth.uid(), 'universidad'), 'grupo', privado.saldo_horas(auth.uid(), 'grupo')) $$;
create function public.mi_saldo() returns jsonb language sql stable security invoker set search_path = '' as $$ select privado.mi_saldo() $$;

create function privado.tipo_asesoria(p_curso text) returns text
language sql immutable set search_path = '' as $$ select case when p_curso in ('calc', 'fis', 'int', 'lin') then 'universidad' else 'general' end $$;

create function privado.separar_asesoria(p jsonb) returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare v_uid uuid := auth.uid(); u public.perfiles; v_ini timestamptz; v_tipo text := privado.tipo_asesoria(p ->> 'curso'); v public.asesorias;
begin
  if v_uid is null then raise exception 'Entra con tu código' using errcode = '42501'; end if;
  select * into u from public.perfiles where id = v_uid for update;
  if not found or u.bloqueado then raise exception 'Tu acceso está en pausa' using errcode = '42501'; end if;
  v_ini := ((p ->> 'fecha') || ' ' || (p ->> 'hora'))::timestamp at time zone 'America/Bogota';
  if v_ini < now() + interval '55 minutes' or v_ini > now() + interval '9 days' or extract(minute from v_ini) <> 0 then raise exception 'slot' using errcode = '22023'; end if;
  -- El mismo horario de TUTORIAS.hours (js/tutorias.js).
  if not (case extract(dow from v_ini at time zone 'America/Bogota')::integer when 0 then false when 6 then extract(hour from v_ini at time zone 'America/Bogota') between 9 and 11
    when 5 then extract(hour from v_ini at time zone 'America/Bogota') between 14 and 18 else extract(hour from v_ini at time zone 'America/Bogota') between 14 and 19 end) then raise exception 'slot' using errcode = '22023'; end if;
  if not exists (select 1 from public.cursos where id = p ->> 'curso') or jsonb_typeof(p -> 'temas') is distinct from 'array'
    or jsonb_array_length(p -> 'temas') not between 1 and 4 then raise exception 'topics' using errcode = '22023'; end if;
  if (select count(*) from public.asesorias where usuario = v_uid and estado in ('pendiente', 'confirmada') and inicio > now()) >= 3 then raise exception 'max' using errcode = '22023'; end if;
  if exists (select 1 from public.asesorias where usuario = v_uid and estado in ('pendiente', 'confirmada')
    and inicio < v_ini + interval '1 hour' and inicio + make_interval(mins => minutos) > v_ini) then raise exception 'busy' using errcode = '22023'; end if;
  if privado.saldo_horas(v_uid, v_tipo) < 1 then raise exception 'saldo' using errcode = '22023'; end if;
  insert into public.asesorias (usuario, curso, temas, inicio, nota, tipo)
  values (v_uid, p ->> 'curso', (select jsonb_agg(left(t, 80)) from jsonb_array_elements_text(p -> 'temas') t), v_ini, left(btrim(coalesce(p ->> 'nota', '')), 140), v_tipo)
  returning * into v;
  insert into public.horas (usuario, tipo, cambio, motivo) values (v_uid, v_tipo, -1, 'Asesoría del ' || (p ->> 'fecha') || ' ' || (p ->> 'hora'));
  return to_jsonb(v);
end $$;
create function public.separar_asesoria(p jsonb) returns jsonb language sql volatile security invoker set search_path = '' as $$ select privado.separar_asesoria(p) $$;

-- Con 12 horas o más de anticipación la hora vuelve al saldo.
create function privado.cancelar_asesoria(p_id bigint) returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare v public.asesorias; v_vuelve boolean;
begin
  update public.asesorias set estado = 'cancelada' where id = p_id and usuario = auth.uid() and estado in ('pendiente', 'confirmada') and inicio > now() returning * into v;
  if not found then raise exception 'Esa asesoría ya no se puede cancelar' using errcode = '22023'; end if;
  v_vuelve := v.inicio >= now() + interval '12 hours';
  if v_vuelve then insert into public.horas (usuario, tipo, cambio, motivo) values (v.usuario, v.tipo, 1, 'Asesoría cancelada a tiempo'); end if;
  return jsonb_build_object('vuelve', v_vuelve);
end $$;
create function public.cancelar_asesoria(p_id bigint) returns jsonb language sql volatile security invoker set search_path = '' as $$ select privado.cancelar_asesoria(p_id) $$;

-- ---------- panel ----------
create function privado.dar_libros(p_uid uuid, p_libros jsonb, p_dias integer) returns void
language sql volatile security definer set search_path = ''
as $$
  insert into public.libros_acceso as l (usuario, libro, hasta)
  select p_uid, t::integer, now() + make_interval(days => p_dias) from jsonb_array_elements_text(coalesce(p_libros, '[]')) t
  where exists (select 1 from public.libros b where b.id = t::integer)
  on conflict (usuario, libro) do update set hasta = greatest(l.hasta, now()) + make_interval(days => p_dias);
$$;

create function privado.tienda_admin(p_accion text, p jsonb) returns jsonb
language plpgsql volatile security definer set search_path = ''
as $$
declare v public.pedidos; s public.asesorias; x jsonb; c text; v_n integer; v_uid uuid := nullif(p ->> 'usuario', '')::uuid; v_fis boolean;
begin
  if not privado.es_admin() then raise exception 'Solo administradores' using errcode = '42501'; end if;
  p := coalesce(p, '{}');
  if p_accion = 'pedidos' then
    return (select coalesce(jsonb_agg(to_jsonb(t) order by (t.estado = 'pendiente') desc, t.creado_en desc), '[]') from public.pedidos t);
  elsif p_accion = 'asesorias' then
    return (select coalesce(jsonb_agg(to_jsonb(t) || jsonb_build_object('nombre', q.nombre, 'telefono', q.telefono) order by t.inicio desc), '[]')
      from public.asesorias t join public.perfiles q on q.id = t.usuario);
  elsif p_accion = 'usuario' then
    return jsonb_build_object(
      'libros', (select coalesce(jsonb_agg(to_jsonb(l) order by l.libro), '[]') from public.libros_acceso l where l.usuario = v_uid),
      'saldo', jsonb_build_object('general', privado.saldo_horas(v_uid, 'general'), 'universidad', privado.saldo_horas(v_uid, 'universidad'), 'grupo', privado.saldo_horas(v_uid, 'grupo')),
      'pedidos', (select coalesce(jsonb_agg(to_jsonb(t) order by t.creado_en desc), '[]') from public.pedidos t where t.usuario = v_uid));
  elsif p_accion = 'conteo' then
    return jsonb_build_object('pedidos', (select count(*) from public.pedidos where estado in ('pendiente', 'pagado', 'preparando')),
      'asesorias', (select count(*) from public.asesorias where estado = 'pendiente' and inicio > now()));
  end if;

  insert into public.auditoria (admin, accion, detalle) values (auth.uid(), p_accion, p);

  -- Confirmar el pago: abre cursos y libros, suma horas, anota la venta y, si hay algo impreso, queda por preparar.
  if p_accion = 'pedido_pagar' then
    select * into v from public.pedidos where id = (p ->> 'id')::bigint for update;
    if not found or v.estado <> 'pendiente' then raise exception 'Ese pedido ya no está por pagar' using errcode = '22023'; end if;
    if v.usuario is null then raise exception 'La cuenta de ese pedido ya no existe' using errcode = '22023'; end if;
    perform 1 from public.perfiles where id = v.usuario for update;
    v_fis := false;
    for x in select * from jsonb_array_elements(v.items) loop
      v_n := (x ->> 'cantidad')::integer;
      for c in select jsonb_array_elements_text(coalesce(x -> 'da' -> 'cursos', '[]')) loop
        perform privado.conceder(v.usuario, c, 'pago', (x -> 'da' ->> 'dias')::integer);
      end loop;
      perform privado.dar_libros(v.usuario, x -> 'da' -> 'libros', 365);
      if coalesce((x -> 'da' ->> 'horas')::integer, 0) > 0 then
        insert into public.horas (usuario, tipo, cambio, motivo) values (v.usuario, x -> 'da' ->> 'horas_tipo', (x -> 'da' ->> 'horas')::integer * v_n, 'Pedido ' || v.id);
      end if;
      if coalesce(jsonb_array_length(x -> 'da' -> 'fisicos'), 0) > 0 then v_fis := true; end if;
    end loop;
    update public.pedidos set estado = case when v_fis then 'pagado' else 'entregado' end, pagado_en = now(), entregado_en = case when v_fis then null else now() end where id = v.id;
    insert into public.pagos (usuario, nombre, codigo, curso, dias, valor, metodo, nota)
    values (v.usuario, v.nombre, v.codigo, 'Pedido ' || v.id, 0, v.total, left(coalesce(p ->> 'metodo', ''), 40),
      left((select string_agg(case when (e ->> 'cantidad')::integer > 1 then (e ->> 'cantidad') || ' × ' else '' end || (e ->> 'nombre'), ', ') from jsonb_array_elements(v.items) e), 200));

  elsif p_accion = 'pedido_estado' then
    if p ->> 'estado' not in ('preparando', 'enviado', 'entregado', 'cancelado', 'pendiente') then raise exception 'Estado no válido' using errcode = '22023'; end if;
    update public.pedidos set estado = p ->> 'estado', transportadora = left(coalesce(p ->> 'transportadora', transportadora), 40), guia = left(coalesce(p ->> 'guia', guia), 60),
      enviado_en = case when p ->> 'estado' = 'enviado' then coalesce(enviado_en, now()) else enviado_en end,
      entregado_en = case when p ->> 'estado' = 'entregado' then coalesce(entregado_en, now()) else entregado_en end
    where id = (p ->> 'id')::bigint and estado = case p ->> 'estado' when 'cancelado' then 'pendiente' when 'pendiente' then 'cancelado'   -- reabrir uno cancelado por error
      when 'preparando' then 'pagado' when 'enviado' then 'preparando' else 'enviado' end;
    if not found then raise exception 'Ese pedido no puede pasar a ese estado' using errcode = '22023'; end if;

  elsif p_accion = 'articulo_guardar' then
    update public.articulos set nombre = left(p ->> 'nombre', 80), detalle = left(coalesce(p ->> 'detalle', ''), 240), precio = nullif(p ->> 'precio', '')::integer,
      precio_plan = nullif(p ->> 'precio_plan', '')::integer, activo = (p ->> 'activo')::boolean, destacado = coalesce((p ->> 'destacado')::boolean, destacado) where id = p ->> 'id';
  elsif p_accion = 'envio_guardar' then
    update public.envios set nombre = left(p ->> 'nombre', 80), detalle = left(coalesce(p ->> 'detalle', ''), 160), precio = (p ->> 'precio')::integer, activo = (p ->> 'activo')::boolean where id = p ->> 'id';
  elsif p_accion = 'libro_guardar' then
    update public.libros set titulo = left(coalesce(p ->> 'titulo', titulo), 80), subtitulo = left(coalesce(p ->> 'subtitulo', subtitulo), 80), muestra = coalesce((p ->> 'muestra')::integer, muestra),
      publicado = coalesce((p ->> 'publicado')::boolean, publicado), paginas = coalesce((p ->> 'paginas')::integer, paginas), version = coalesce((p ->> 'version')::integer, version),
      indice = coalesce(p -> 'indice', indice) where id = (p ->> 'id')::integer;
  elsif p_accion = 'libros_dar' then
    if (p ->> 'dias')::integer not between 1 and 3650 then raise exception 'Los días deben estar entre 1 y 3650' using errcode = '22023'; end if;
    perform privado.dar_libros(v_uid, p -> 'libros', (p ->> 'dias')::integer);
  elsif p_accion = 'libro_quitar' then
    delete from public.libros_acceso where usuario = v_uid and libro = (p ->> 'libro')::integer;
  elsif p_accion = 'horas_ajustar' then
    perform 1 from public.perfiles where id = v_uid for update;
    if privado.saldo_horas(v_uid, p ->> 'tipo') + (p ->> 'cambio')::integer < 0 then raise exception 'El saldo no puede quedar negativo' using errcode = '22023'; end if;
    insert into public.horas (usuario, tipo, cambio, motivo) values (v_uid, p ->> 'tipo', (p ->> 'cambio')::integer, left(coalesce(nullif(p ->> 'motivo', ''), 'Ajuste'), 120));
  elsif p_accion = 'asesoria_estado' then
    select * into s from public.asesorias where id = (p ->> 'id')::bigint for update;
    if not found or s.estado in ('hecha', 'cancelada') then raise exception 'Esa asesoría ya se cerró' using errcode = '22023'; end if;
    update public.asesorias set estado = p ->> 'estado', enlace = left(coalesce(p ->> 'enlace', enlace), 300) where id = s.id;
    if p ->> 'estado' = 'cancelada' then   -- la cancela Zuka: la hora siempre vuelve
      insert into public.horas (usuario, tipo, cambio, motivo) values (s.usuario, s.tipo, 1, 'Asesoría cancelada por Zuka');
    end if;
  else
    raise exception 'Acción desconocida: %', p_accion using errcode = '22023';
  end if;
  return jsonb_build_object('ok', true);
end $$;
create function public.tienda_admin(p_accion text, p jsonb default '{}') returns jsonb
language sql volatile security invoker set search_path = '' as $$ select privado.tienda_admin(p_accion, p) $$;

-- Al unir dos cuentas, sus compras pasan a la que queda (antes de que se borre la otra).
create function privado.unir_compras() returns trigger
language plpgsql security definer set search_path = ''
as $$
declare v_de uuid; v_a uuid;
begin
  if new.accion <> 'usuario_unir' then return new; end if;
  v_de := (new.detalle ->> 'usuario')::uuid; v_a := (new.detalle ->> 'hacia')::uuid;
  if v_de is null or v_a is null or v_de = v_a or (select count(*) from public.perfiles where id in (v_de, v_a) and rol = 'estudiante') <> 2 then return new; end if;
  update public.pedidos set usuario = v_a where usuario = v_de;
  update public.horas set usuario = v_a where usuario = v_de;
  update public.asesorias set usuario = v_a where usuario = v_de;
  insert into public.libros_acceso as l (usuario, libro, desde, hasta) select v_a, libro, desde, hasta from public.libros_acceso where usuario = v_de
  on conflict (usuario, libro) do update set hasta = case when l.hasta > now() and excluded.hasta > now() then l.hasta + (excluded.hasta - now()) else greatest(l.hasta, excluded.hasta) end;
  return new;
end $$;
create trigger zuka_unir_compras after insert on public.auditoria for each row execute function privado.unir_compras();

-- ---------- páginas de los libros (Storage, carpeta privada) ----------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('libros', 'libros', false, 2097152, array['image/webp']) on conflict (id) do nothing;

-- ¿Puede ver esta página? Quien tiene el libro; las de muestra, cualquiera con cuenta.
create function privado.puede_leer(p_ruta text) returns boolean
language plpgsql stable security definer set search_path = ''
as $$
declare m text[] := regexp_match(p_ruta, '^(\d{1,2})/v(\d{1,10})/(\d{4})\.webp$');
begin
  if m is null then return false; end if;
  return exists (select 1 from public.perfiles q where q.id = auth.uid() and not q.bloqueado and (q.rol = 'admin'
    or exists (select 1 from public.libros b where b.id = m[1]::integer and b.publicado and (m[3]::integer <= b.muestra
      or exists (select 1 from public.libros_acceso l where l.usuario = q.id and l.libro = b.id and l.hasta > now())))));
end $$;
create policy libros_paginas_leer on storage.objects for select to authenticated using (bucket_id = 'libros' and privado.puede_leer(name));
create policy libros_paginas_subir on storage.objects for insert to authenticated with check (bucket_id = 'libros' and (select public.es_admin()));
create policy libros_paginas_cambiar on storage.objects for update to authenticated using (bucket_id = 'libros' and (select public.es_admin()));
create policy libros_paginas_borrar on storage.objects for delete to authenticated using (bucket_id = 'libros' and (select public.es_admin()));

-- ---------- funciones: quién las llama ----------
revoke execute on function privado.con_plan(uuid), privado.saldo_horas(uuid, text), privado.crear_pedido(jsonb), public.crear_pedido(jsonb), privado.cancelar_pedido(bigint), public.cancelar_pedido(bigint),
  privado.mi_saldo(), public.mi_saldo(), privado.tipo_asesoria(text), privado.separar_asesoria(jsonb), public.separar_asesoria(jsonb), privado.cancelar_asesoria(bigint), public.cancelar_asesoria(bigint),
  privado.dar_libros(uuid, jsonb, integer), privado.tienda_admin(text, jsonb), public.tienda_admin(text, jsonb), privado.unir_compras(), privado.puede_leer(text) from public, anon, authenticated;
grant execute on function privado.crear_pedido(jsonb), public.crear_pedido(jsonb), privado.cancelar_pedido(bigint), public.cancelar_pedido(bigint), privado.mi_saldo(), public.mi_saldo(),
  privado.separar_asesoria(jsonb), public.separar_asesoria(jsonb), privado.cancelar_asesoria(bigint), public.cancelar_asesoria(bigint),
  privado.tienda_admin(text, jsonb), public.tienda_admin(text, jsonb), privado.puede_leer(text) to authenticated;
