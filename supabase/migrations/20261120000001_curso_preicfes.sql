-- Curso Preicfes Saber 11 (spec docs/superpowers/specs/2026-11-20-curso-preicfes.md): nace sin publicar, en borrador,
-- hasta la revisión docente de sus textos y ejercicios. El administrador lo publica desde el panel.
insert into public.cursos (id, nombre, orden, publicado) values
  ('preicfes', 'Preicfes Saber 11', 9, false)
on conflict (id) do nothing;
