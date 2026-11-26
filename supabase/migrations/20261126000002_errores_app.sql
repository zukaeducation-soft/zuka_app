-- Auditoría del 2026-11-26 (docs/auditoria-2026-11-26.md, hallazgo 15): los errores de la app en el celular del
-- estudiante quedan aquí (js/errores.js). Solo mensaje, archivo y línea. Nadie la lee por la API salvo el administrador;
-- se escribe solo por la función, con tope por estudiante y por día, y se borra sola a los 60 días.
create table public.errores_app (
  id bigint generated always as identity primary key,
  creado_en timestamptz not null default now(),
  usuario uuid,
  mensaje text not null check (char_length(mensaje) between 1 and 300),
  origen text not null default '' check (char_length(origen) <= 200),
  linea integer,
  agente text not null default '' check (char_length(agente) <= 200)
);
create index errores_app_creado on public.errores_app (creado_en);
create index errores_app_usuario on public.errores_app (usuario, creado_en);
alter table public.errores_app enable row level security;
create policy errores_app_ver on public.errores_app for select to authenticated using ((select public.es_admin()));

create function privado.registrar_error(p jsonb) returns void
language plpgsql security definer set search_path = ''
as $$
declare v_u uuid := auth.uid(); v_h json; v_m text;
begin
  v_m := left(btrim(coalesce(p ->> 'mensaje', '')), 300);
  if v_u is null or v_m = '' or octet_length(p::text) > 4000 then return; end if;
  if (select count(*) from public.errores_app where usuario = v_u and creado_en > now() - interval '1 day') >= 20
    or (select count(*) from public.errores_app where creado_en > now() - interval '1 day') >= 2000 then return; end if;
  begin v_h := current_setting('request.headers', true)::json; exception when others then v_h := null; end;
  insert into public.errores_app (usuario, mensaje, origen, linea, agente)
  values (v_u, v_m, left(coalesce(p ->> 'origen', ''), 200), case when p ->> 'linea' ~ '^\d{1,7}$' then (p ->> 'linea')::integer end, left(coalesce(v_h ->> 'user-agent', ''), 200));
  delete from public.errores_app where creado_en < now() - interval '60 days';
end $$;

create function public.registrar_error(p jsonb) returns void
language sql volatile security invoker set search_path = '' as $$ select privado.registrar_error(p) $$;

revoke all on function privado.registrar_error(jsonb), public.registrar_error(jsonb) from public, anon, authenticated;
grant execute on function privado.registrar_error(jsonb), public.registrar_error(jsonb) to authenticated;
