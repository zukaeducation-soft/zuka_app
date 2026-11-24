-- Si se borra la cuenta de un código (p. ej. con la función vieja delete_account), el código queda en pausa: no se puede
-- estrenar otra vez para empezar de cero los días.
create function privado.codigo_huerfano() returns trigger
language plpgsql security definer set search_path = ''
as $$
begin
  if old.usado_por is not null and new.usado_por is null then new.bloqueado := true; end if;
  return new;
end $$;
revoke execute on function privado.codigo_huerfano() from public, anon, authenticated;
create trigger zuka_codigo_huerfano before update of usado_por on public.codigos
  for each row execute function privado.codigo_huerfano();
