-- El docente responsable ve en la app solo el Preicfes y sus componentes (spec 2026-11-25-portal-en-la-app). Se puede correr más de una vez.

-- Igual que antes; el docente que responde por algún componente recibe solo el Preicfes.
create or replace function privado.inst_cursos(p_uid uuid) returns table (institucion uuid, curso text, desde date, hasta date)
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
    and (c = 'preicfes' or g.papel = 'gestor' or not exists (select 1 from public.inst_asignaciones a where a.gestor = g.id))
$$;
revoke all on function privado.inst_cursos(uuid) from public, anon, authenticated;

-- mi_institucion dice además qué hace en el equipo: la app muestra el portal y, al docente, solo sus componentes.
do $$
declare v_def text; v_new text;
begin
  v_def := replace(pg_get_functiondef('privado.mi_institucion()'::regprocedure), chr(13), '');
  if position('''equipo''' in v_def) > 0 then return; end if;
  v_new := replace(v_def, '''instituciones'', coalesce(', '''equipo'', coalesce((select jsonb_agg(jsonb_build_object(''institucion'', i.nombre, ''papel'', g.papel, ''nombre'', g.nombre,
        ''componentes'', (select coalesce(jsonb_agg(distinct a.componente), ''[]'') from public.inst_asignaciones a where a.gestor = g.id)) order by g.id)
      from public.codigos k join public.inst_gestores g on g.codigo = k.codigo and g.activo join public.instituciones i on i.id = g.institucion where k.usado_por = (select auth.uid()) and not k.bloqueado), ''[]''),
    ''instituciones'', coalesce(');
  if v_new = v_def then raise exception 'privado.mi_institucion: no se encontró dónde'; end if;
  execute replace(v_new, chr(13), '');
end $$;
notify pgrst, 'reload schema';
