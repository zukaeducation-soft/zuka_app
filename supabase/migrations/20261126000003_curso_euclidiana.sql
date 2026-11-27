-- Curso Geometría Euclidiana (spec docs/superpowers/specs/2026-11-26-curso-euclidiana.md): nace sin publicar, en borrador,
-- hasta la revisión docente. El administrador lo publica desde el panel.
insert into public.cursos (id, nombre, orden, publicado) values
  ('euc', 'Geometría Euclidiana', 10, false)
on conflict (id) do nothing;
