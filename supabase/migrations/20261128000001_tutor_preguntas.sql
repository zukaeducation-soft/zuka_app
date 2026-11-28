-- Tutor de dudas (spec 2026-11-28-tutor-de-dudas): cada pregunta al tutor queda aquí. Solo la escribe la función `tutor`
-- (llave de servicio) por medio de tutor_reserva, que bloquea al usuario, cuenta las de las últimas 24 horas y guarda la nueva
-- antes de llamar a Gemini: así ni las peticiones en paralelo ni una falla dejan pasar más del tope (ajuste `tutor_diario`;
-- 0 apaga el tutor). Desde la app solo la lee la administración.
create table public.tutor_preguntas (
  id bigint generated always as identity primary key,
  usuario uuid not null references auth.users (id) on delete cascade,
  creado_en timestamptz not null default now(),
  curso text not null default '' check (char_length(curso) <= 80),
  leccion text not null default '' check (char_length(leccion) <= 40),
  tipo text not null default 'explica' check (tipo in ('explica', 'ejercicio')),
  pregunta text not null check (char_length(pregunta) <= 300),
  largo integer not null default 0
);
create index tutor_preguntas_usuario_fecha on public.tutor_preguntas (usuario, creado_en desc);
alter table public.tutor_preguntas enable row level security;
create policy tutor_preguntas_admin on public.tutor_preguntas for select to authenticated using (public.es_admin());
revoke all on public.tutor_preguntas from anon, authenticated;
grant select on public.tutor_preguntas to authenticated;   -- la política deja ver solo a la administración

insert into public.ajustes (clave, valor) values ('tutor_diario', '20') on conflict (clave) do nothing;

-- { ok, id, quedan } o { ok: false, error: 'limite', quedan: 0 }. Solo la llama la función del servidor.
create function public.tutor_reserva(p_uid uuid, p_curso text, p_leccion text, p_tipo text, p_pregunta text) returns jsonb
language plpgsql security definer set search_path = ''
as $$
declare v_tope integer; v_usadas integer; v_id bigint;
begin
  perform pg_advisory_xact_lock(hashtext('tutor:' || p_uid::text));
  select coalesce((select nullif(regexp_replace(valor, '\D', '', 'g'), '')::integer from public.ajustes where clave = 'tutor_diario'), 20) into v_tope;
  select count(*) into v_usadas from public.tutor_preguntas where usuario = p_uid and creado_en > now() - interval '24 hours';
  if v_usadas >= v_tope then return jsonb_build_object('ok', false, 'error', 'limite', 'quedan', 0); end if;
  insert into public.tutor_preguntas (usuario, curso, leccion, tipo, pregunta)
  values (p_uid, left(coalesce(p_curso, ''), 80), left(coalesce(p_leccion, ''), 40), case when p_tipo = 'ejercicio' then 'ejercicio' else 'explica' end, left(p_pregunta, 300))
  returning id into v_id;
  return jsonb_build_object('ok', true, 'id', v_id, 'quedan', v_tope - v_usadas - 1);
end $$;
revoke execute on function public.tutor_reserva(uuid, text, text, text, text) from public, anon, authenticated;
grant execute on function public.tutor_reserva(uuid, text, text, text, text) to service_role;
