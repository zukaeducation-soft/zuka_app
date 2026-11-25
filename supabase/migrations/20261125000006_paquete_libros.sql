-- Los libros no se venden sueltos: solo el paquete de los 4, impreso o digital. Precio según sus páginas (283 + 281 + 185 + 145 = 894; antes 496):
-- el mismo precio por página de antes (impreso 363, digital 121), redondeado a 900. Spec 2026-11-25-paquete-libros. Se puede correr más de una vez;
-- repetirlo vuelve a poner estos precios.
update public.articulos set activo = false where id in ('fis-1', 'fis-2', 'fis-3', 'fis-4', 'dig-1', 'dig-2', 'dig-3', 'dig-4');
update public.articulos set nombre = 'Paquete de 4 libros impresos', detalle = 'Impresos a color, con envío. Incluye los 4 digitales.', precio = 323900, precio_plan = null, activo = true where id = 'fis-juego';
update public.articulos set nombre = 'Paquete de 4 libros digitales', detalle = 'Para leer en la app durante 12 meses.', precio = 107900, precio_plan = 71900, activo = true where id = 'dig-juego';
update public.articulos set precio = 209900 where id = 'paq-digital';
update public.articulos set precio = 449900 where id = 'paq-completo';

-- Ni por error: un libro suelto no puede quedar a la venta.
create or replace function privado.libro_suelto() returns trigger
language plpgsql set search_path = ''
as $$
begin
  if new.activo and new.tipo in ('fisico', 'digital') and (jsonb_array_length(coalesce(new.da -> 'fisicos', '[]')) = 1 or (new.tipo = 'digital' and jsonb_array_length(coalesce(new.da -> 'libros', '[]')) = 1)) then
    raise exception 'Los libros se venden solo en el paquete de 4' using errcode = '22023';
  end if;
  return new;
end $$;
revoke all on function privado.libro_suelto() from public, anon, authenticated;
drop trigger if exists libro_suelto on public.articulos;
create trigger libro_suelto before insert or update on public.articulos for each row execute function privado.libro_suelto();
