# Parche único (2026-11-20): cambia los dibujos sueltos de los capítulos por \figura{nombre}{pie} (kit zuka-figuras.tex).
import os, re
T = os.path.join(os.path.dirname(__file__), '..', 'tex')
B, E = '\\begin{tikzpicture}', '\\end{tikzpicture}'
BC, EC = '\\begin{center}', '\\end{center}'
# archivo: [(índice del primer tikzpicture, cuántos abarca, nombre, pie)]
PLAN = {
 'l1-calculo.tex': [(0, 1, 'fracciones', 'El denominador corta, el numerador cuenta.'), (1, 1, 'cien', 'Veinticinco casillas de cien: la misma cantidad con tres nombres.')],
 'l1-aritmetica.tex': [(0, 1, 'atras', 'El camino de ida (gris) y el de regreso (verde), con las operaciones contrarias.'), (1, 1, 'barraresto', 'La barra en sextos: un tercio gastado, un cuarto del resto y lo que queda.'), (2, 1, 'promedio', 'Nivelar las torres: lo que sobra en unas llena lo que falta en otras.')],
 'l1-ecuaciones.tex': [(0, 1, 'balanza', 'Lo que se hace en un platillo se hace en el otro.'), (1, 1, 'desigualdad', 'La solución de una desigualdad es un tramo de la recta.')],
 'l1-geometria.tex': [(0, 1, 'paralelas', 'Dos paralelas y una transversal: ocho ángulos, solo dos medidas.'), (1, 1, 'pitagoras', 'Las baldosas de los dos cuadrados pequeños llenan justo el grande.'), (2, 1, 'tales', 'Una paralela a un lado forma un triángulo semejante al original.'), (3, 1, 'cuartos', 'Cuatro cuartos de círculo equivalen a un círculo completo.'), (4, 1, 'cuadricula', 'Encerrar en un rectángulo y restar los triángulos de las esquinas.'), (5, 1, 'solidos', 'Cilindro, cono y esfera: el cono es la tercera parte del cilindro.')],
 'l1-numeros.tex': [(0, 1, 'factores', 'El árbol de factores de 360: en verde, los primos.')],
 'l1-operadores.tex': [(0, 1, 'maquina', 'Un operador es una máquina: cada entrada ocupa su lugar en la regla.')],
 'l1-proporcion.tex': [(0, 1, 'razon', 'Razón 3 : 5 en barras: conocer una parte es conocerlo todo.'), (1, 2, 'dirinv', 'Directa: una recta que pasa por el origen. Inversa: una curva que baja.'), (3, 1, 'encuentro', 'Al acercarse de frente, las velocidades se suman.'), (4, 1, 'factor', 'Poner el IVA es multiplicar; quitarlo es dividir por el mismo factor.')],
 'l2-orden.tex': [(0, 1, 'fila', 'Bloques fijos y dos casillas libres: quedan dos filas posibles.'), (1, 1, 'mesa', 'Una mesa de seis puestos con una persona fija.')],
 'l2-logica.tex': [(0, 1, 'euler', 'Las premisas dibujadas: basta un músico dentro del círculo de ingenieros.')],
 'l2-conjuntos.tex': [(0, 1, 'vennops', 'Cuatro operaciones, cuatro maneras de pintar las zonas.'), (1, 1, 'vennencuesta', 'La encuesta se llena del centro hacia afuera.')],
 'l2-conteo.tex': [(0, 1, 'arbolconteo', 'Cada camisa se combina con cada pantalón: las ramas se multiplican.'), (1, 1, 'caminos', 'En cada esquina, el número de caminos que llegan a ella.')],
 'l2-probabilidad.tex': [(0, 1, 'arbolprob', 'Sin reposición: la segunda rama se calcula con lo que quedó en la urna.')],
 'l2-secuencias.tex': [(0, 1, 'diferencias', 'Cuando las segundas diferencias son constantes, la sucesión es cuadrática.'), (1, 1, 'giro', 'Una sola característica cambia: la posición del punto.'), (2, 1, 'ciclo', 'El ciclo del semáforo dura 80 segundos.')],
 'l2-espacial.tex': [(0, 1, 'recorrido', 'El recorrido del robot, paso a paso.'), (2, 1, 'cubos', 'La misma pila en perspectiva y vista desde arriba.'), (4, 1, 'desarrollo', 'En un desarrollo, las caras opuestas tienen otra en medio.'), (5, 1, 'espejo', 'El espejo voltea izquierda y derecha; el giro, todo.')],
 'l2-graficas.tex': [(1, 1, 'lineas', 'En una gráfica de líneas, la pendiente dice qué tan rápido cambia.')],
 'l3-estrategias.tex': [(0, 1, 'mapatexto', 'El mapa del texto: una función por párrafo y una idea que las reúne.')],
 'l4-inferencia.tex': [(0, 1, 'pistas', 'Una inferencia se apoya en pistas que sí están en el texto.'), (1, 1, 'cadena', 'Una cadena causal: cada hecho empuja al siguiente.')],
 'l4-argumentacion.tex': [(0, 1, 'arbolarg', 'El árbol de un argumento: la tesis arriba y sus razones debajo.')],
}
for f, items in PLAN.items():
    p = os.path.join(T, f)
    s = open(p, encoding='utf8').read()
    spans = []
    i = 0
    while True:
        a = s.find(B, i)
        if a < 0:
            break
        b = s.index(E, a) + len(E)
        spans.append((a, b)); i = b
    for idx, n, name, cap in sorted(items, reverse=True):
        a, b = spans[idx][0], spans[idx + n - 1][1]
        ca = s.rfind(BC, 0, a)
        if ca >= 0 and re.fullmatch(r'(\\small|\\scriptsize|\s)*', s[ca + len(BC):a]):
            ce = s.find(EC, b)
            if ce >= 0 and re.fullmatch(r'(\\hspace\{[^}]*\}|\s)*', s[b:ce]):
                a, b = ca, ce + len(EC)
        s = s[:a] + '\\figura{%s}{%s}' % (name, cap) + s[b:]
    open(p, 'w', encoding='utf8').write(s)
    print(f, len(items))
