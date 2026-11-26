# Libros del Preicfes Saber 11: uno por componente (2026-11-26)

Pedido: diseñar los libros de cada componente del Preicfes, con el mismo enfoque de los libros dibujados del Preuniversitario
(spec `2026-11-25-libros-dibujados`).

## Cinco libros

| Archivo | Libro | Componente | Mundos | Lecciones |
|---|---|---|---|---|
| `libro5.tex` | 1 de 5 | Matemáticas · «Pensar con números» | 13 | 43 |
| `libro6.tex` | 2 de 5 | Lectura Crítica · «Leer, entender y evaluar» | 8 | 20 |
| `libro7.tex` | 3 de 5 | Sociales y Ciudadanas · «Pensar el país y el mundo» | 10 | 27 |
| `libro8.tex` | 4 de 5 | Ciencias Naturales · «Mirar como científico» | 13 | 33 |
| `libro9.tex` | 5 de 5 | Inglés · «Read, understand, answer» | 7 | 16 |

Todo sale de los datos del curso en la app (`arte/icfes.js` escribe `tex/salida/icf/`): si la app cambia, el libro se pone al día
al compilar. Color del curso: el fucsia de la app (`zuka-icfes.tex`, portadas 5–9 en `arte/portadas.py`).

## Cada lección

1. Ruta y capítulos dibujados cuadro por cuadro (Explora), con la idea y «Tu turno» con su dibujo (soluciones dibujadas al final).
2. Matemáticas y Ciencias: **problema resuelto paso a paso** (la `completa-solucion` de la lección, con lo de cada hueco
   resaltado y «Por qué funciona»), **¿Dónde está el error?** (la `caza-error`, clave en las claves) y **Así sale en el examen**
   (la `opcion-examen`).
3. Lectura, Sociales e Inglés: **una pregunta del examen comentada** con su texto (la primera pregunta de la evaluación del mundo
   que es de esa lección), con cómo pensarla, la respuesta explicada y lo que hay que llevarse.
4. «Lo que construiste».

Cada mundo cierra con su **evaluación**: las preguntas A–D de la evaluación de la app que se pueden responder en papel, con su
texto cuando lo tienen y la lección a repasar en la clave. Las preguntas de evaluación que son juegos (86 en Matemáticas, 66 en
Ciencias) se quedan solo en la app.

`sh docs/libros/build.sh 5 6 7 8 9` deja `docs/libros/pdf/Zuka_Preicfes_Libro_N.pdf` (N de 1 a 5).

## Pendiente

Ejemplos resueltos con dibujos propios del libro (como los del Preuniversitario) y revisión de una persona antes de vender.
