# Parche único (2026-11-20): inserta las figuras nuevas (zuka-figuras2.tex) antes de «La regla» de su lección.
import os, glob
T = os.path.join(os.path.dirname(__file__), '..', 'tex')
PLAN = {
 'pu-el-1': ('prelectura', 'Lo que se mira en la prelectura, en orden.'),
 'pu-el-3': ('excepto', 'En una pregunta EXCEPTO se tacha lo que el texto sí dice.'),
 'pu-tt-1': ('tipologias', 'Cinco intenciones, cinco tipos de texto.'),
 'pu-tt-3': ('estructuras', 'Los cuatro esqueletos más comunes de un texto.'),
 'pu-ie-1': ('ancla', 'La palabra ancla lleva directo a la oración que responde.'),
 'pu-ie-2': ('parafrasis', 'Una paráfrasis conserva el sentido; el distractor cambia una pieza.'),
 'pu-ie-3': ('trescajas', 'Frente a cada opción hay tres cajas, no dos.'),
 'pu-ie-4': ('voces', 'Cada idea tiene dueño: un color por voz.'),
 'pu-vo-1': ('reemplazo', 'La prueba del reemplazo: solo un sinónimo le queda bien a la frase.'),
 'pu-vo-2': ('polisemia', 'Una palabra, varios sentidos: las vecinas dicen cuál.'),
 'pu-vo-4': ('piezas', 'Las palabras se arman con piezas que se repiten.'),
 'pu-rf-1': ('referente', 'El pronombre señala hacia atrás, a su referente.'),
 'pu-cn-1': ('senales', 'Los conectores son las señales del camino.'),
 'pu-in-2': ('presupuesto', 'Bajo cada frase hay algo que se da por sentado.'),
 'pu-in-4': ('intensidad', 'La actitud se nombra con la intensidad justa.'),
 'pu-ap-1': ('principio', 'Del ejemplo se extrae el principio, y el principio se lleva al caso nuevo.'),
 'pu-ap-2': ('analogia', 'En una analogía se repite la relación, no las cosas.'),
 'pu-fu-1': ('paraque', 'Las tres razones por las que un autor trae una cita.'),
 'pu-fu-2': ('fuente', 'Tres preguntas para pesar una fuente.'),
 'pu-ag-2': ('tono', 'Cinco tonos frecuentes y la pista que los delata.'),
 'pu-ag-3': ('hechoopinion', 'El termómetro da un hecho; lo que cada uno siente es opinión.'),
 'pu-lf-2': ('ironia', 'La ironía aparece cuando lo dicho choca con lo que pasa.'),
 'pu-dt-1': ('dostextos', 'Dos textos que se oponen pueden compartir un punto.'),
 'pu-cm-4': ('potencias', 'Una potencia no suma: duplica en cada paso.'),
 'pu-ar-4': ('palomar', 'El principio del palomar con tres colores de medias.'),
 'pu-pr-4': ('barracien', 'La barra del cien por ciento.'),
 'pu-nu-2': ('mcm', 'Dos ritmos distintos que coinciden cada cierto tiempo.'),
 'pu-nu-3': ('relojciclo', 'Las últimas cifras de las potencias de 3 dan vueltas.'),
 'pu-or-3': ('tablalogica', 'La tabla de doble entrada, resuelta.'),
 'pu-lo-1': ('circuitos', 'La conjunción y la disyunción como circuitos.'),
 'pu-lo-3': ('cartas', 'Las cuatro cartas: solo dos pueden romper la regla.'),
 'pu-co-3': ('ordenimporta', 'Permutación y combinación: la misma gente, distinta pregunta.'),
 'pu-gr-2': ('mediana', 'Seis salarios: cinco bajos y uno muy alto.'),
 'pu-cd-1': ('cesar', 'Un código de desplazamiento: cada letra avanza un lugar.'),
}
done = set()
for p in glob.glob(os.path.join(T, 'l?-*.tex')):
    s = open(p, encoding='utf8').read(); o = s
    for lid, (name, cap) in PLAN.items():
        i = s.find('\\leccion{%s}' % lid)
        if i < 0 or ('\\figura{%s}' % name) in s:
            continue
        j = s.find('\\begin{regla}', i)
        s = s[:j] + '\\figura{%s}{%s}\n\n' % (name, cap) + s[j:]
        done.add(lid)
    if s != o:
        open(p, 'w', encoding='utf8').write(s)
print(len(done), 'figuras insertadas; faltan:', sorted(set(PLAN) - done))
