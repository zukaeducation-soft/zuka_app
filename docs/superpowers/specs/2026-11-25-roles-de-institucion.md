# Docentes y gestores en la app; datos de institución (2026-11-25)

- **Inicio docente:** saludo según la hora y «Docente (nombre)», y sus cursos con sus componentes. **Inicio gestor:** saludo, nombre y los cursos
  del contrato. Sin metas, racha ni XP (`js/equipo.js`). «Mis cursos» ya sale solo con esos cursos.
- **Tú:** docente: institución, componentes, grupos. Gestor: sus datos, los de la institución y el contrato (cupos, días, docentes, cursos). Estudiante
  de institución: nombre, grupo y documento, sin edición.
- **Portal del docente responsable:** todas las vistas con solo el Preicfes y las lecciones de sus componentes (`cargaDocencia`).
- **«Calienta la mente»** se quitó del Inicio de todos.
- **Datos:** de estudiantes y docentes de institución solo los cambian su gestor (portal) o Zuka (portal con `?i=`). En la base, `perfil_fijo` lo impide
  en `perfiles`; `inst_nombre` lleva el nombre del portal a la cuenta (migración `20261125000005`). Excepción: quien compró un curso por su cuenta y lo
  tiene vigente. `instFija` repite la regla en la app.
