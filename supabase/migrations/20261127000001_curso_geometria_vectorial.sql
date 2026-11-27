-- Curso Geometría Vectorial y Analítica rehecho con escenas (spec docs/superpowers/specs/2026-11-27-curso-geometria-vectorial.md):
-- sigue sin publicar, en borrador, hasta la revisión docente. El administrador lo publica desde el panel.
insert into public.cursos (id, nombre, orden, publicado) values
  ('geo', 'Geometría Vectorial y Analítica', 4, false)
on conflict (id) do nothing;
