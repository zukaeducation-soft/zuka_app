-- Solo se separan asesorías de cursos comprados y vigentes (pedido del 2026-11-24). Cambia una línea de separar_asesoria.
do $$
declare v_def text; v_new text;
begin
  v_def := pg_get_functiondef('privado.separar_asesoria(jsonb)'::regprocedure);
  if v_def like '%''curso'' using errcode%' then return; end if;   -- ya estaba
  v_new := replace(v_def, 'if privado.saldo_horas(v_uid, v_tipo) < 1 then',
    'if not exists (select 1 from public.accesos where usuario = v_uid and curso = p ->> ''curso'' and tipo = ''pago'' and hasta > now()) then raise exception ''curso'' using errcode = ''22023''; end if;
  if privado.saldo_horas(v_uid, v_tipo) < 1 then');
  if v_new = v_def then raise exception 'separar_asesoria: no se encontró la línea del saldo'; end if;
  execute v_new;
end $$;
