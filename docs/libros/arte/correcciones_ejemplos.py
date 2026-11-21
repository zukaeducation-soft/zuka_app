# Parche único (2026-11-20): correcciones de la revisión independiente de ejemplos-rl.tex y ejemplos-cl.tex.
import os
T = os.path.join(os.path.dirname(__file__), '..', 'tex')
FIX = {
 'ejemplos-rl.tex': {
  r'\ejx{Presupuesto}': r'\ejx{Presupuesto}{Con \$50\,000 se quieren comprar cuadernos de \$4\,500 después de pagar \$8\,000 de transporte. ¿Cuántos cuadernos, como máximo?}{$8\,000 + 4\,500n \le 50\,000$: $4\,500n \le 42\,000$, $n \le 9.33\ldots$ Máximo 9 cuadernos.}',
  r'\ejx{La cifra que falta}': r'\ejx{La cifra que falta}{¿Qué valores puede tomar la cifra $d$ para que $\overline{2d6}$ sea divisible entre 4?}{Las dos últimas cifras, $\overline{d6}$, deben formar un múltiplo de 4: 16, 36, 56, 76, 96. $d$ puede ser 1, 3, 5, 7 o 9.}',
  r'\ejx{Cuatro en la mesa}': r'\ejx{Cuatro en la mesa}{Inés, Joel, Karen y Luis se sientan en una mesa cuadrada, uno por lado. Inés está frente a Joel y Karen no está a la derecha de Inés. ¿Quién está a la derecha de Inés?}{Los dos lados libres, a la izquierda y a la derecha de Inés, son para Karen y Luis. Como Karen no está a la derecha de Inés, ahí está Luis.}',
  r'\ejx{Ocho puestos}': r'\ejx{Ocho puestos}{En una mesa redonda de 8 puestos, Mario está frente a Nora y Olga está dos puestos a la derecha de Mario. Contando por el lado más corto, ¿cuántos puestos hay entre Olga y Nora?}{Numerando: Mario en el 1, Nora en el 5 y Olga en el 3 (o en el 7, según el sentido; el caso es simétrico). Entre el 3 y el 5 queda solo el 4: hay un puesto entre ellas.}',
  r'\ejx{Con una obligatoria}': r'\ejx{Con tres obligatorias}{Y si las tres primeras son obligatorias, ¿de cuántas maneras?}{Faltan 5 de las otras 7: $\binom75 = 21$.}',
  r'\ejx{Rectángulos}': r'\ejx{Rectángulos}{¿Cuántos rectángulos (de cualquier tamaño) hay en una cuadrícula de $3 \times 3$ cuadros?}{Hay 4 rayas horizontales y 4 verticales; un rectángulo se forma al elegir 2 de cada una: $\binom42 \cdot \binom42 = 36$.}',
  r'\ejx{Tres semáforos}{La probabilidad': r'\ejx{Tres semáforos}{La probabilidad de encontrar en verde cada uno de tres semáforos independientes es $\tfrac12$. ¿Probabilidad de que al menos uno no esté en verde?}{Todos en verde: $\left(\tfrac12\right)^3 = \tfrac18$. Al menos uno que no esté en verde: $1 - \tfrac18 = \tfrac78$.}',
  r'\ejx{Tres frases}': r'\ejx{Tres frases}{«zu ka» = «luz verde»; «ka mi» = «verde claro»; «ro zu» = «mucha luz». ¿Cómo se dice «mucha»?}{«ka» es la palabra común a las dos primeras frases, como «verde». Entonces, en la primera, zu = luz. En la tercera, zu = luz y ro = mucha.}',
 },
 'ejemplos-cl.tex': {
  r'\ejx{Conservar el grado}': r'\ejx{Conservar el grado}{\frag{Es probable que el eclipse se vea en buena parte del país.}¿Cuál es la paráfrasis correcta: «el eclipse se verá en todo el país» o «probablemente el eclipse se verá en gran parte del país»?}{La segunda: conserva la probabilidad («probablemente») y la extensión («gran parte»). La primera cambia la probabilidad por certeza y la parte por el todo.}',
  r'\ejx{Las tres cajas}': r'\ejx{Las tres cajas}{\frag{En la encuesta, la mayoría de los jóvenes dijo preferir los libros impresos.}Clasifica cada afirmación en «lo dice», «lo niega» o «no lo dice»: a) más de la mitad de los jóvenes encuestados dijo preferir el papel; b) ningún joven encuestado prefiere los libros impresos; c) los jóvenes leen más que los adultos.}{a) Lo dice: «la mayoría» es más de la mitad. b) Lo niega: la mayoría sí los prefiere. c) No lo dice: el texto no habla de los adultos.}',
  r'\ejx{Género y número}': r'\ejx{Género y número}{\frag{Los profesores entregaron los boletines a las familias; estas los recibieron con sorpresa.}¿A quién se refiere «estas»? ¿Y «los»?}{«Estas»: las familias (femenino plural; «profesores» y «boletines» son masculinos). «Los»: los boletines (masculino plural, lo que se recibe).}',
  r'\ejx{«También»}': r'\ejx{«También»}{\frag{Este año Lucía también ganó la beca.}¿Qué presupone?}{Que alguien más ganó la beca, o que Lucía ya la había ganado antes. «También» siempre suma a algo que se da por sabido.}',
  r'\ejx{El punto común}': r'\ejx{El punto común}{Texto A: «Los zoológicos son cárceles». Texto B: «Los zoológicos modernos salvan especies». ¿En qué podrían coincidir?}{En que a los dos les importa la suerte de los animales: A la mira en cada animal encerrado y B en la supervivencia de las especies. Tesis opuestas pueden compartir un valor.}',
 },
}
for f, fx in FIX.items():
    p = os.path.join(T, f)
    lines = open(p, encoding='utf8').read().split('\n')
    n = 0
    for key, new in fx.items():
        for i, ln in enumerate(lines):
            if ln.startswith(key):
                extra = ln.count('}') - ln.count('{')          # 1 si la línea cierra además el bloque \masejemplosde
                lines[i] = new + ('}' * extra); n += 1; break
        else:
            print('NO ENCONTRADO', f, key)
    open(p, 'w', encoding='utf8').write('\n'.join(lines))
    print(f, n)
