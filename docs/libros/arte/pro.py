# Parche aplicado una vez (2026-11-24, spec 2026-11-24-libros-profesional): pone las lecciones del mundo 1 por pasos
# (arte/mundo1.txt), las páginas de entrada con el enfoque nuevo y la capa zuka-pro en la plantilla.
import os, re
H = os.path.dirname(os.path.abspath(__file__))
T = os.path.join(H, '..', 'tex')


def lee(f):
    return open(os.path.join(T, f), encoding='utf8', newline='').read().replace('\r\n', '\n')


def pon(f, t):
    open(os.path.join(T, f), 'w', encoding='utf8', newline='\n').write(t)


t = lee('l1-calculo.tex')
partes = {}
for p in open(os.path.join(H, 'mundo1.txt'), encoding='utf8').read().split('@@ ')[1:]:
    k, cuerpo = p.split('\n', 1)
    partes[k.strip()] = cuerpo.strip() + '\n'
for n in '1234':
    i = 'pu-cm-' + n
    a = t.index('\\leccion{' + i + '}')
    a = t.index('\n\n', a) + 2
    b = t.index('\\begin{regla}', a)
    t = t[:a] + partes[i + ' ideas'] + '\n' + t[b:]
    c = t.index('\\taller', a)
    t = t[:c] + partes[i + ' armar'] + '\n' + t[c:]
pon('l1-calculo.tex', t)

s = lee('zuka-libro.sty')
if 'zuka-pro' not in s:
    s = s.rstrip() + '\n% estilo editorial, marca y ruta de la app (2026-11-24)\n\\input{zuka-pro}\n'
pon('zuka-libro.sty', s)

c = lee('comun-rl.tex')
a = c.index('Este libro y la aplicación')
b = c.index('\\clearpage', a)
fila = lambda x, y: f'{x} & {y}\\\\[4pt]\n'
nuevo = ('''Este libro y la aplicación \\marca\\ son dos mitades de un mismo curso. En la app cada lección es una explicación que se
construye con el dedo, paso a paso; el libro sigue \\textbf{la misma ruta} y va más despacio y más hondo: explica \\emph{por qué}
funciona cada idea, resuelve ejemplos completos y te deja papel y lápiz para practicar como en el examen.

\\vspace{4pt}
\\begin{tabularx}{\\linewidth}{@{}>{\\leavevmode\\sffamily\\small\\bfseries\\color{zolive}}p{32mm}X@{}}
'''
 + fila('La ruta', 'Abre la lección: los pasos que vas a recorrer, los mismos de la app. El último es siempre un problema.')
 + fila('La analogía', 'Una comparación con algo cotidiano para entender la idea antes de cualquier fórmula.')
 + fila('La idea', 'La intuición, con un dibujo que la hace ver. Primero se entiende; la fórmula viene después.')
 + fila('Tu turno', 'Enseguida de una idea, un ejercicio corto con el mismo dibujo. Si sale, sigue; si no, relee el paso. Las respuestas están en las claves.')
 + fila('La regla', 'El recuadro con lo que hay que llevarse. Si solo tienes cinco minutos antes del examen, lee los recuadros.')
 + fila('Ejemplos', 'Problemas resueltos. En cada uno hay una línea de tijera: tapa desde ahí, resuélvelo tú y luego compara.')
 + fila('Ahora sí, un problema', 'Un reto tipo examen. Escribe tu respuesta y qué tan seguro estás; debajo, «Así se usó el concepto» muestra cómo se aplica.')
 + fila('Arma la respuesta', 'No se pide un resultado: se pide construir algo que cumpla una condición. Las claves dicen el error que descubre.')
 + fila('Lo que construiste', 'Las ideas de la lección, para marcar las que podrías explicar.')
 + fila('Taller', 'Tres pisos: \\textbf{Calienta}, \\textbf{Entrena} y \\textbf{Como en el examen} (opción múltiple A–D).')
 + fila('Evaluación', 'Cada mundo termina con una prueba como la del examen, con tiempo.')
 + '''\\end{tabularx}
{\\small\\color{zmute}Según la lección encontrarás también trampas (el error que más se repite), atajos y «Para ir más lejos». Las piezas «Tu
turno» y «Arma la respuesta» empiezan en el mundo 1, Cálculo mental.\\par}

''')
c = c[:a] + nuevo + c[b:]
pon('comun-rl.tex', c)
for f, r in [('l1-anexos.tex', [('su video y sus\njuegos en Zuka (20 minutos)', 'su\nexplicación y sus ejercicios en Zuka (20 minutos)')]),
             ('l2-anexos.tex', [('su video y sus juegos en Zuka', 'su explicación y sus ejercicios en Zuka')])]:
    x = lee(f)
    for p, q in r:
        assert p in x, (f, p)
        x = x.replace(p, q)
    pon(f, x)
