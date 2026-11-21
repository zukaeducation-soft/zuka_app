# Parche único (2026-11-20): aplica las correcciones de la revisión independiente de claves (dos revisores).
import os, re
T = os.path.join(os.path.dirname(__file__), '..', 'tex')
R = r'''
l1-geometria.tex
\sol{A. Base $16 \times 10$, altura 2.}
\sol{C. Base $16 \times 10$, altura 2: $16 \cdot 10 \cdot 2 = 320$ cm$^3$.}
@@
l1-operadores.tex
\opciones{$\tfrac12 + \tfrac13$}{$\tfrac56$}{$\tfrac65$}{las dos primeras}
\opciones{$\tfrac56$}{$5$}{$\tfrac65$}{$\tfrac16$}
@@
l1-operadores.tex
\sol{D. $\tfrac{5}{6} = \tfrac12 + \tfrac13$: la regla es la suma de los inversos. (3.1)}
\sol{A. $\tfrac{2 + 3}{2 \cdot 3} = \tfrac56 = \tfrac12 + \tfrac13$: la regla es la suma de los inversos. (3.1)}
@@
l2-orden.tex
{Si no se elige X, se eligen Y y Z.}
{Si no se elige Y, se elige W.}
@@
l1-aritmetica.tex
La A es la respuesta con suerte, y la D confunde con «asegurar una de cada color».
La A es la respuesta con suerte, y la D ($10 + 1$) responde otra pregunta: asegurar una media que no sea negra.
@@
l1-proporcion.tex
La A ($8 \cdot 6 / 8$) olvida el segundo tanque y la B olvida que hay menos grifos.
La B ($48 \div 4 = 12$) olvida el segundo tanque.
@@
l1-proporcion.tex
La D sale de usar la diferencia de velocidades, que es para persecuciones.
La D ($360 \div 70 \approx 5$) solo tiene en cuenta el bus rápido; usar la diferencia de velocidades, que es para persecuciones, daría 18 horas.
@@
l1-calculo.tex
La trampa es la C: quien calcula los $6$ grados que subió y olvida que partía de $-18$.
La D sale de suponer un grado por minuto ($-18 + 3$) y la B de sumar al inicio los 4 grados finales ($-18 + 4$).
@@
examen-rl.tex
Las opciones traen $-3$ (quien hizo $(-3)^2$).
Las opciones traen $3$ (quien hizo $(-3)^2$).
@@
analogias-rl.tex
La raíz hace el camino de vuelta: si hay ocho capas, ¿cuántos dobleces hubo?
La raíz hace el camino de vuelta: si tres dobleces iguales dieron 8 capas, ¿por cuánto multiplicó cada doblez? Por 2, porque $2 \cdot 2 \cdot 2 = 8$.
@@
examen-rl.tex
{«Deja residuo 2 al dividir entre 3, 4 y 5»: MCM $+ 2 = 62$.}
{«El menor número de dos cifras que deja residuo 2 al dividir entre 3, 4 y 5»: MCM $+ 2 = 62$.}
@@
l2-orden.tex
\item Con $n$ puestos (par), frente al puesto $k$ está el $k + \tfrac n2$.
\item Con $n$ puestos (par), frente al puesto $k$ está el $k + \tfrac n2$ (si se pasa de $n$, se le resta $n$).
@@
l2-anexos.tex
frente a $k$ está $k + \tfrac n2$.
frente a $k$ está $k \pm \tfrac n2$.
@@
zuka-figuras.tex
Frente al puesto $k$ está el $k + 3$.
Frente al puesto $k$ está el $k \pm 3$.
@@
l2-secuencias.tex
¿cuántas veces coinciden en el primer minuto (incluido $t = 0$)?
¿cuántas veces coinciden desde $t = 0$ hasta $t = 60$ s, ambos incluidos?
@@
l1-anexos.tex
{9:96}
{9:12}
@@
l2-logica.tex
\sol{«Si no apruebo, no estudié».}
\sol{«Si no apruebo, no estudio».}
@@
l4-inferencia.tex
{Laura perdió el tren y esperará el siguiente.}
{Laura cuenta con esperar un buen rato.}
@@
zuka-figuras.tex
\textbf{inferencia:} el tren ya pasó y la espera será larga
\textbf{inferencia:} Laura se prepara para una espera larga
@@
l4-inferencia.tex
{La nueva biblioteca del colegio}
{Carta sobre la biblioteca del colegio}
@@
l4-inferencia.tex
\item La frase «el cine era para que la gente saliera de la casa» presupone que
\item La frase «el cine era para que la gente saliera de la casa» \pf{3} permite inferir que
@@
l4-inferencia.tex
\sol{B. (1.2)}
\sol{B. (1.1)}
@@
l4-anexos.tex
\item La frase «no estoy seguro de que lo sea» (texto 1, \S\,1) presupone que
\item La frase «Parece un avance. No estoy seguro de que lo sea» (texto 1, \S\,1) da a entender que
@@
l4-anexos.tex
\sol{A. (1.2)}
\sol{A. (1.1)}
@@
l4-anexos.tex
{Está de moda elogiar el aburrimiento.}
{Hay personas que elogian el aburrimiento.}
@@
l4-anexos.tex
\sol{A. (3.1)}
\sol{A. (4.1)}
@@
l4-dostextos.tex
\item El tono de ambos textos es \opcionesd{argumentativo}{narrativo}{humorístico}{instructivo} \sol{A.}
\item Por su tipología, ambos textos son predominantemente
\opcionesd{argumentativos}{narrativos}{humorísticos}{instructivos}
\sol{A. Cada uno defiende una tesis con razones.}
@@
l4-dostextos.tex
\item ¿Qué propuesta podría aceptar el autor de cada texto?
\item ¿Qué propuesta podrían aceptar los autores de los dos textos?
@@
l4-dostextos.tex
\bien{B}{En que hay tareas que no deberían depender de la ayuda de los padres.}
\bien{B}{En que la tarea que depende de la ayuda de los padres es un problema.}
@@
l4-figurado.tex
\sol{A. Ironía de situación en la promesa. (5.2)}
\sol{A. Humor por inversión: la lluvia, que es la razón para usar el paraguas, aparece como si fuera un obstáculo. (5.2)}
@@
l3-referencia.tex
\pa El sistema maya tenía, además, un símbolo para el cero, una idea que en Europa tardó siglos en aceptarse. \emph{Esa ausencia} hizo que las cuentas romanas fueran lentas y difíciles de escribir.
\pa El sistema maya tenía, además, un símbolo para el cero; el romano no lo tenía, y en Europa esa idea tardó siglos en aceptarse. \emph{Esa ausencia}, junto con un sistema que no era posicional, hizo que las cuentas romanas fueran lentas y difíciles de escribir.
@@
l3-referencia.tex
La diferencia no era un capricho: los primeros usaban
La diferencia no era un capricho: probablemente los primeros usaban
@@
l3-anexos.tex
\item Según el \S\,3, todas son consecuencias o costos de la adaptación EXCEPTO
\item Según el \S\,3, todas son costos del ruido urbano para las aves EXCEPTO
@@
l3-conectores.tex
\item Los dos puntos no aparecen en el \S\,2, pero el punto y coma en «nombra lo que no tenía nombre; ordena el dolor…» sirve para
\item En el \S\,2, el punto y coma en «Nombra lo que no tenía nombre; ordena el dolor…» sirve para
@@
examen-cl.tex
{La que no contradice a ninguno.}
{La que se apoya en los dos textos, no la que simplemente ninguno contradice.}
@@
l3-estrategias.tex
{La ciudad que aprendió a mirar el cielo}
{El pueblo que aprendió a mirar el cielo}
@@
l3-estrategias.tex
Las opciones B y A de la segunda pregunta
Las opciones A y B de la segunda pregunta
@@
analogias-cl.tex
Si a un amigo alto le dicen «el Flaco»
Si a un amigo muy alto le dicen «el Enano»
@@
analogias-cl.tex
sabes que alguien llegó y que afuera llueve, aunque nadie te lo haya dicho.
sabes que alguien llegó y que venía de un lugar mojado, aunque nadie te lo haya dicho.
@@
l3-tipos.tex
\figura{tipologias}{Cinco intenciones, cinco tipos de texto.}
\figura{tipologias}{Cinco intenciones principales y sus tipos de texto.}
@@
l3-tipos.tex
\figura{estructuras}{Los cuatro esqueletos más comunes de un texto.}
\figura{estructuras}{Cuatro esqueletos frecuentes de un texto.}
@@
l3-vocabulario.tex
la masa \emph{leve}
la masa \emph{leude}
@@
l3-vocabulario.tex
Cuidado con los falsos amigos:
Cuidado con las piezas aparentes:
@@
l3-vocabulario.tex
\sol{B. (4.3)}
\sol{B. Sentido figurado. (4.2)}
'''
miss = 0
for blk in R.strip().split('\n@@\n'):
    f, old, new = blk.split('\n', 2)
    p = os.path.join(T, f)
    s = open(p, encoding='utf8').read()
    pat = r'\s+'.join(re.escape(w) for w in old.split())
    m = re.search(pat, s)
    if not m:
        miss += 1; print('NO ENCONTRADO', f, '|', old[:70]); continue
    s = s[:m.start()] + new + s[m.end():]
    open(p, 'w', encoding='utf8').write(s)
print('faltaron', miss)
