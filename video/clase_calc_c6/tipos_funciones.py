"""
Clase C6 · Tipos de funciones (Cálculo diferencial, 9:16, fondo de Cálculo).

Sin voz ni subtítulos ni preguntas al espectador. Galería de funciones: constante (tarifa fija) y lineal
(taxímetro), cuadrática (la parábola que se voltea con el signo de a), polinómica (x + 1)(x − 2)² con la
raíz doble que rebota (zoom), potencias pares e impares y √x, y racional 1/x con sus asíntotas (zoom a
la curva que se pega a la asíntota) y 1/(x − 2) + 1. Cronograma, clase 5.

    manimgl tipos_funciones.py S03_Polinomio -w -l
"""
from calc_fx import *


class S00_Portada(TrigPortada):
    part_tag = "Cálculo · Clase C6"
    title = "Tipos de funciones"
    subtitle = "Una galería de curvas"


class S01_Rectas(MBScene):
    def construct(self):
        self.mark("Constante y lineal")
        self.set_header(R"mx + b", "Rectas", C_COS, P_COS)
        self.say("Empecemos la galería. Un bus cobra lo mismo sin importar cuánto viajes: eso es una función constante, una recta horizontal.", fox=True)
        plane = get_plane((-1, 5), (-2, 8), 0.75).move_to(1.4 * UP)
        ax = plane.axes
        self.play(ShowCreation(plane), run_time=1.0)
        c = curve(ax, lambda x: 3, -1, 5, C_ANG)
        cl = M(R"f(x) = 3", size=34, color=C_ANG).next_to(ax.c2p(4, 3), UP, buff=0.12)
        self.play(ShowCreation(c), FadeIn(cl))
        self.hold()
        self.say("Un taxímetro, en cambio, sube lo mismo por cada kilómetro: es una función lineal, una recta inclinada de pendiente m.")
        lin = curve(ax, lambda x: 2 * x - 1, -1, 5, C_COS)
        ll = M(R"f(x) = 2x - 1", size=34, color=C_COS).next_to(ax.c2p(4, 7), LEFT, buff=0.15)
        self.play(ShowCreation(lin), FadeIn(ll))
        stp = VGroup(DashedLine(ax.c2p(1, 1), ax.c2p(2, 1), dash_length=0.08).set_stroke(C_SEN, 4),
                     DashedLine(ax.c2p(2, 1), ax.c2p(2, 3), dash_length=0.08).set_stroke(C_TAN, 4))
        sl = M(R"+2", size=28, color=C_TAN).next_to(stp[1], RIGHT, buff=0.1)
        self.play(ShowCreation(stp), FadeIn(sl))
        note = boxed(M(R"f(x) = c \qquad f(x) = mx + b", size=36), color=C_COS).move_to(3.4 * DOWN)
        self.play(FadeIn(note, shift=0.2 * UP))
        self.hold(0.5)
        self.end_section()


class S02_Parabola(MBScene):
    def construct(self):
        self.mark("Cuadrática")
        self.set_header(R"ax^2", "Cuadrática", C_TAN, P_TAN)
        self.say("Si lanzas una pelota, su camino es una parábola: la gráfica de una función cuadrática, a x cuadrado más b x más c.", fox=True)
        plane = get_plane((-3, 3), (-5, 5), 0.8).move_to(1.4 * UP)
        ax = plane.axes
        self.play(ShowCreation(plane), run_time=1.0)
        a = ValueTracker(1)
        par = always_redraw(lambda: curve(ax, lambda x: a.get_value() * x * x, -3, 3, C_TAN))
        lab = always_redraw(lambda: M(Rf"a = {a.get_value():.1f}", size=34, color=C_TAN).move_to(2.6 * DOWN))
        self.add(par, lab)
        self.hold()
        self.say("El número a manda: si es positivo la parábola abre hacia arriba, como una sonrisa; si es negativo se voltea. Y entre más grande, más cerrada.")
        self.play(a.animate.set_value(2.5), run_time=1.5)
        self.play(a.animate.set_value(0.4), run_time=1.5)
        self.play(a.animate.set_value(-1), run_time=2)
        self.hold(0.5)
        par.clear_updaters(); lab.clear_updaters()
        self.end_section()


class S03_Polinomio(MBScene):
    def construct(self):
        self.mark("Polinómica")
        self.set_header(R"(x - r)", "Polinomios", C_SEN, P_SEN)
        self.say("Una función polinómica suma potencias enteras de x. Escrita en factores, se leen sus raíces: cada factor x menos r es un corte con el eje en r.", fox=True)
        fm = M(R"f(x) = (x + 1)(x - 2)^2", size=42, color=INK).move_to(4.4 * UP)
        self.play(Write(fm))
        plane = get_plane((-2, 4), (-4, 5), 0.85).move_to(0.6 * UP)
        ax = plane.axes
        f = lambda x: (x + 1) * (x - 2) ** 2
        self.play(ShowCreation(plane), run_time=1.0)
        g = curve(ax, f, -1.6, 3.3, C_SEN)
        self.play(ShowCreation(g), run_time=2)
        r1, r2 = dot(ax, -1, 0, C_ANG), dot(ax, 2, 0, C_ANG)
        self.play(FadeIn(r1, scale=0.5), FadeIn(r2, scale=0.5))
        self.say("En menos uno la curva cruza el eje. En dos, el factor está al cuadrado: es una raíz doble y la curva solo lo toca y rebota.")
        self.mark("Zoom a la raíz doble")
        self.zoom_to(VGroup(r2, Dot(ax.c2p(1.2, 1.2)), Dot(ax.c2p(2.8, -0.6))), scale=0.5)
        bounce = M(R"\text{rebota}", size=20, color=C_ANG).next_to(r2, DOWN, buff=0.12)
        self.play(FadeIn(bounce))
        self.hold()
        self.zoom_reset()
        self.say("Lejos, a la derecha, manda el término de mayor grado: x al cubo con coeficiente positivo, así que la curva se va hacia arriba.")
        arrow = Arrow(ax.c2p(2.9, 2.5), ax.c2p(3.2, 4.6), buff=0).set_color(C_TAN)
        self.play(GrowArrow(arrow))
        self.hold(0.5)
        self.end_section()


class S04_Potencias(MBScene):
    def construct(self):
        self.mark("Funciones potencia")
        self.set_header(R"x^n", "Potencias", C_ANG, P_ANG)
        self.say("Las funciones potencia son x elevado a un número fijo. Con exponente par, la gráfica es simétrica respecto al eje y, como una copa.", fox=True)
        plane = get_plane((-2, 2), (-4, 4), 0.95).move_to(1.0 * UP)
        ax = plane.axes
        self.play(ShowCreation(plane), run_time=1.0)
        x2 = curve(ax, lambda x: x ** 2, -2, 2, C_COS)
        x4 = curve(ax, lambda x: x ** 4, -1.42, 1.42, C_COS, width=3)
        l2 = M(R"x^2,\; x^4", size=34, color=C_COS).move_to(ax.c2p(-1.3, 3.4))
        self.play(ShowCreation(x2), ShowCreation(x4), FadeIn(l2))
        self.hold()
        self.say("Con exponente impar se parece a una ese acostada: sube por la derecha, baja por la izquierda y es simétrica respecto al origen.")
        x3 = curve(ax, lambda x: x ** 3, -1.6, 1.6, C_SEN)
        x5 = curve(ax, lambda x: x ** 5, -1.32, 1.32, C_SEN, width=3)
        l3 = M(R"x^3,\; x^5", size=34, color=C_SEN).move_to(ax.c2p(1.3, -3.4))
        self.play(ShowCreation(x3), ShowCreation(x5), FadeIn(l3))
        self.hold()
        self.say("Y el exponente puede ser una fracción: x a la un medio es la raíz cuadrada, que solo existe desde cero.")
        self.play(*[m.animate.set_stroke(opacity=0.25) for m in (x2, x4, x3, x5)], l2.animate.set_opacity(0.3), l3.animate.set_opacity(0.3))
        sq = curve(ax, lambda x: x ** 0.5 if x >= 0 else None, 0, 2, C_TAN)
        ls = M(R"x^{1/2} = \sqrt{x}", size=34, color=C_TAN).move_to(3.6 * DOWN)
        self.play(ShowCreation(sq), FadeIn(ls))
        self.hold(0.5)
        self.end_section()


class S05_Racional(MBScene):
    def construct(self):
        self.mark("Racional")
        self.set_header(R"\frac{P}{Q}", "Racionales", C_COS, P_COS)
        self.say("Una función racional es un polinomio dividido entre otro. La más sencilla es uno sobre x: compartir una pizza entre x amigos.", fox=True)
        plane = get_plane((-4, 4), (-4, 4), 0.85).move_to(1.4 * UP)
        ax = plane.axes
        self.play(ShowCreation(plane), run_time=1.0)
        g1 = curve(ax, lambda x: 1 / x, -4, -0.01, C_COS, n=400)
        g2 = curve(ax, lambda x: 1 / x, 0.01, 4, C_COS, n=400)
        self.play(ShowCreation(g1), ShowCreation(g2), run_time=1.6)
        self.say("Con más amigos, cada porción se acerca a cero sin llegar nunca: la recta y igual a cero es una asíntota horizontal. Y con x igual a cero no se puede dividir: asíntota vertical.")
        va = DashedLine(ax.c2p(0, -4), ax.c2p(0, 4), dash_length=0.12).set_stroke(C_SEN, 4)
        ha = DashedLine(ax.c2p(-4, 0), ax.c2p(4, 0), dash_length=0.12).set_stroke(C_ANG, 4)
        self.play(ShowCreation(va), ShowCreation(ha))
        self.mark("Zoom a la asíntota")
        self.zoom_to(VGroup(Dot(ax.c2p(1.2, 1.2)), Dot(ax.c2p(4, -0.4))), scale=0.5)
        self.hold()
        self.zoom_reset()
        self.clear_scene()
        self.mark("La cruz se mueve")
        self.say("Si corremos todo: uno sobre x menos dos, más uno. La cruz de asíntotas se va a x igual a dos y y igual a uno, y la curva viaja con ella.")
        plane2 = get_plane((-2, 6), (-3, 5), 0.85).move_to(1.4 * UP)
        ax2 = plane2.axes
        self.play(ShowCreation(plane2), run_time=0.8)
        f = lambda x: 1 / (x - 2) + 1
        h1 = curve(ax2, f, -2, 1.99, C_COS, n=400)
        h2 = curve(ax2, f, 2.01, 6, C_COS, n=400)
        v2 = DashedLine(ax2.c2p(2, -3), ax2.c2p(2, 5), dash_length=0.12).set_stroke(C_SEN, 4)
        hz = DashedLine(ax2.c2p(-2, 1), ax2.c2p(6, 1), dash_length=0.12).set_stroke(C_ANG, 4)
        self.play(ShowCreation(v2), ShowCreation(hz))
        self.play(ShowCreation(h1), ShowCreation(h2), run_time=1.4)
        lab = M(R"f(x) = \frac{1}{x - 2} + 1", size=38, color=C_COS).move_to(3.5 * DOWN)
        self.play(Write(lab))
        self.hold(0.5)
        self.end_section()


class S06_Cierre(TrigCierre):
    recap = [
        ("Constante y lineal", "f(x) = c · f(x) = mx + b", C_COS),
        ("Cuadrática y polinómica", "raíz r ⟹ factor (x − r) · raíz doble: rebota", C_SEN),
        ("Potencia", "xⁿ: par como copa, impar como ese · x^½ = √x", C_ANG),
        ("Racional", "polinomio / polinomio · asíntotas", C_TAN),
    ]
    recap_say = ("Repasemos la galería: constantes y lineales son rectas; las cuadráticas son parábolas y los polinomios se leen por sus raíces; "
                 "las potencias pares e impares tienen simetrías distintas; las racionales tienen asíntotas.")
    practice = "Ahora: pon imanes en las raíces,\nmueve la cruz de asíntotas\ny clasifica funciones"
