-- Panel más liviano y autorización exigida también en la base (spec 2026-11-25-instituciones). Medido con 1.000 estudiantes: el uso y lo hecho
-- viajaban como 104.000 listas (3.6 MB); ahora va un texto por estudiante. Lo abre instAbre (js/instituciones.js).
-- Quién confirmó la autorización y cuándo, en cada estudiante (dura lo que dure su registro).
alter table public.inst_estudiantes add column if not exists autoriza text not null default '', add column if not exists autorizado_en timestamptz;

do $$
declare v_def text; v_new text; x text[];
begin
  v_def := replace(pg_get_functiondef('privado.institucion(text, jsonb)'::regprocedure), chr(13), ''); v_new := v_def;
  if position('autorizado_en' in v_def) > 0 then return; end if;   -- ya está aplicada
  foreach x slice 1 in array array[
    ['''uso'', (select coalesce(jsonb_agg(jsonb_build_array(s.id, d.dia, d.segundos, d.ejercicios, d.aciertos)), ''[]'')', '''uso'', (select coalesce(jsonb_object_agg(t.id, t.v), ''{}'') from (select s.id, string_agg((v_hoy - d.dia) || '','' || d.segundos || '','' || d.ejercicios || '','' || d.aciertos, '';'') v'],
    ['and d.dia <= i.hasta),', 'and d.dia <= i.hasta group by s.id) t),'],
    ['''hechas'', (select coalesce(jsonb_agg(jsonb_build_array(s.id, l.id, (pr.completada_en at time zone ''America/Bogota'')::date)), ''[]'')', '''hechas'', (select coalesce(jsonb_object_agg(t.id, t.v), ''{}'') from (select s.id, string_agg(l.id || '','' || coalesce((v_hoy - (pr.completada_en at time zone ''America/Bogota'')::date)::text, ''''), '';'') v'],
    ['(pr.completada_en at time zone ''America/Bogota'')::date <= i.hasta)),', '(pr.completada_en at time zone ''America/Bogota'')::date <= i.hasta) group by s.id) t),'],
    ['raise exception ''Elige al menos un curso'' using errcode = ''22023''; end if;', 'raise exception ''Elige al menos un curso'' using errcode = ''22023''; end if;
    if (p ->> ''acepta'') is distinct from ''true'' then raise exception ''Falta confirmar la autorización'' using errcode = ''22023''; end if;'],
    ['insert into public.inst_estudiantes (institucion, nombre, grupo, identificador, cursos, codigo)', 'insert into public.inst_estudiantes (institucion, nombre, grupo, identificador, cursos, codigo, autoriza, autorizado_en)'],
    ['v_cursos, v_cod) returning * into e;', 'v_cursos, v_cod, coalesce(g.nombre, ''Zuka''), now()) returning * into e;']
  ] loop
    if position(x[1] in v_new) = 0 then raise exception 'privado.institucion: no se encontró %', x[1]; end if;
    v_new := replace(v_new, x[1], x[2]);
  end loop;
  execute v_new;
end $$;
