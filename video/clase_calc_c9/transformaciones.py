"""
Clase C9 · Transformaciones de funciones (Cálculo diferencial, 9:16, fondo de Cálculo).

Sin voz ni subtítulos ni preguntas al espectador. La gráfica como una calcomanía que se mueve: subir y
bajar (x² + 2), correr a los lados al revés del signo ((x − 3)², zoom al vértice que llega a 3),
estirar (2x²) y reflejar (−x² y √(−x)), y el orden importa: 2√x + 1 frente a 2(√x + 1).
Cronograma, clase 8.

    manimgl transformaciones.py S02_Correr -w -l
"""
from calc_fx import *


class S00_Portada(TrigPortada):
    part_tag = "Cálculo · Clase C9"
    title = "Transformaciones\nde funciones"
    subtitle = "Mover, estirar y voltear una gráfica"


def base_plane(xr=(-4, 5), yr=(-3, 7), unit=0.75, center=1.4 * UP):
    plane = get_plane(xr, yr, unit).move_to(center)
    return plane, plane.axes


class S01_Subir(MBScene):
    def construct(self):
        self.mark("Subir y bajar")
        self.set_header(R"f(x) + k", "Subir y bajar", C_COS, P_COS)
        self.say("Piensa en la gráfica como una calcomanía que se puede mover sin deformarla. Sumar un número por fuera de f la sube: todas las alturas crecen igual.", fox=True)
        plane, ax = base_plane()
        self.play(ShowCreation(plane), run_time=0.8)
        k = ValueTracker(0)
        ghost = curve(ax, lambda x: x * x, -3, 3, MUTED, width=3)
        g = always_redraw(lambda: curve(ax, lambda x: x * x + k.get_value(), -3, 3, C_COS))
        lab = always_redraw(lambda: M(Rf"y = x^2 {'+' if k.get_value() >= 0 else '-'} {abs(k.get_value()):.0f}", size=40, color=C_COS).move_to(3.4 * DOWN))
        self.add(ghost, g, lab)
        self.play(k.animate.set_value(2), run_time=1.6)
        self.hold()
        self.say("Restar la baja. Lo que está afuera de f actúa en vertical, y tal como se lee.")
        self.play(k.animate.set_value(-2), run_time=1.6)
        self.play(k.animate.set_value(2), run_time=1.2)
        g.clear_updaters(); lab.clear_updaters()
        self.hold(0.5)
        self.end_section()


class S02_Correr(MBScene):
    def construct(self):
        self.mark("Correr a los lados")
        self.set_header(R"f(x - h)", "Correr", C_SEN, P_SEN)
        self.say("Ahora el número va adentro, junto a la x: x menos tres, al cuadrado. Uno pensaría que va a la izquierda, pero la parábola se corre tres a la derecha.", fox=True)
        plane, ax = base_plane(xr=(-2, 6), yr=(-1, 7))
        self.play(ShowCreation(plane), run_time=0.8)
        ghost = curve(ax, lambda x: x * x, -2, 2.6, MUTED, width=3)
        h = ValueTracker(0)
        g = always_redraw(lambda: curve(ax, lambda x: (x - h.get_value()) ** 2, -2, 6, C_SEN))
        v = always_redraw(lambda: dot(ax, h.get_value(), 0, C_ANG, r=0.12))
        self.add(ghost, g, v)
        self.play(h.animate.set_value(3), run_time=2.2)
        g.clear_updaters(); v.clear_updaters()
        lab = M(R"y = (x - 3)^2", size=40, color=C_SEN).move_to(3.4 * DOWN)
        self.play(Write(lab))
        self.mark("Zoom al vértice")
        why = M(R"x = 3 \Rightarrow (3 - 3)^2 = 0", size=22, color=C_ANG).next_to(ax.c2p(3, 0), UR, buff=0.15)
        self.zoom_to(VGroup(v, why, Dot(ax.c2p(2, 1.5)), Dot(ax.c2p(4, -0.6))), scale=0.4)
        self.play(Write(why))
        self.say("¿Por qué? El vértice está donde lo de adentro vale cero, y x menos tres vale cero cuando x es tres. Adentro, todo va al revés de lo que parece.")
        self.hold()
        self.zoom_reset()
        self.end_section()


class S03_Estirar(MBScene):
    def construct(self):
        self.mark("Estirar y encoger")
        self.set_header(R"a\,f(x)", "Estirar", C_TAN, P_TAN)
        self.say("Multiplicar por fuera estira en vertical: con dos x cuadrado, cada altura se duplica y la parábola se ve más angosta, como un resorte jalado.", fox=True)
        plane, ax = base_plane(xr=(-3, 3), yr=(-1, 7), unit=0.85)
        self.play(ShowCreation(plane), run_time=0.8)
        a = ValueTracker(1)
        ghost = curve(ax, lambda x: x * x, -3, 3, MUTED, width=3)
        g = always_redraw(lambda: curve(ax, lambda x: a.get_value() * x * x, -3, 3, C_TAN))
        lab = always_redraw(lambda: M(Rf"y = {a.get_value():.1f}\,x^2", size=40, color=C_TAN).move_to(3.4 * DOWN))
        self.add(ghost, g, lab)
        self.play(a.animate.set_value(2), run_time=1.6)
        arrows = VGroup(*[Arrow(ax.c2p(x, x * x), ax.c2p(x, 2 * x * x), buff=0).set_color(C_ANG) for x in (-1.5, 1.5)])
        self.play(GrowArrow(arrows[0]), GrowArrow(arrows[1]))
        self.hold()
        self.say("Con un número entre cero y uno la encoge, y la parábola se abre.")
        self.play(FadeOut(arrows), a.animate.set_value(0.5), run_time=1.6)
        g.clear_updaters(); lab.clear_updaters()
        self.hold(0.5)
        self.end_section()


class S04_Reflejar(MBScene):
    def construct(self):
        self.mark("Reflejar")
        self.set_header(R"-f(x)", "Reflejar", C_COS, P_COS)
        self.say("Un signo menos afuera voltea la gráfica sobre el eje x, como su reflejo en un lago: menos x cuadrado abre hacia abajo.", fox=True)
        plane, ax = base_plane(xr=(-4, 4), yr=(-4, 4), unit=0.8)
        self.play(ShowCreation(plane), run_time=0.8)
        g = curve(ax, lambda x: x * x, -2, 2, C_COS)
        self.play(ShowCreation(g))
        self.play(g.animate.flip(RIGHT, about_point=ax.c2p(0, 0)), run_time=1.6)
        l1 = M(R"y = -x^2", size=34, color=C_COS).move_to(ax.c2p(2.6, -3.2))
        self.play(FadeIn(l1))
        self.hold()
        self.say("Un signo menos adentro, junto a la x, la refleja sobre el eje y: la raíz de menos x existe para los x negativos.")
        s = curve(ax, lambda x: x ** 0.5 if x >= 0 else None, 0, 4, C_SEN)
        self.play(ShowCreation(s))
        self.play(s.animate.flip(UP, about_point=ax.c2p(0, 0)), run_time=1.6)
        l2 = M(R"y = \sqrt{-x}", size=34, color=C_SEN).move_to(ax.c2p(-2.6, 2.6))
        self.play(FadeIn(l2))
        note = boxed(T("afuera: vertical · adentro: horizontal", size=28, color=INK), color=C_COS).move_to(3.6 * DOWN)
        self.play(FadeIn(note, shift=0.2 * UP))
        self.hold(0.5)
        self.end_section()


class S05_Orden(MBScene):
    def construct(self):
        self.mark("El orden importa")
        self.set_header(R"1\!\to\!2", "El orden", C_ANG, P_ANG)
        self.say("Cuando se combinan, el orden importa. Partimos de raíz de x. Si primero estiramos por dos y luego subimos uno, llegamos a dos raíz de x más uno.", fox=True)
        plane, ax = base_plane(xr=(-1, 5), yr=(-1, 7), unit=0.85, center=1.8 * UP)
        self.play(ShowCreation(plane), run_time=0.8)
        sq = lambda x: x ** 0.5 if x >= 0 else None
        base = curve(ax, sq, 0, 5, MUTED, width=3)
        self.play(ShowCreation(base))
        a = curve(ax, lambda x: 2 * x ** 0.5 + 1 if x >= 0 else None, 0, 5, C_ANG)
        la = M(R"\times 2,\ +1:\ 2\sqrt{x} + 1", size=32, color=C_ANG).move_to(2.0 * DOWN)
        self.play(ShowCreation(a), FadeIn(la))
        self.hold()
        self.say("Si primero subimos uno y después estiramos, el estiramiento también duplica la subida: dos por raíz de x más uno, que es dos raíz de x más dos.")
        b = curve(ax, lambda x: 2 * x ** 0.5 + 2 if x >= 0 else None, 0, 5, C_SEN)
        lb = M(R"+1,\ \times 2:\ 2(\sqrt{x} + 1) = 2\sqrt{x} + 2", size=32, color=C_SEN).next_to(la, DOWN, buff=0.3)
        self.play(ShowCreation(b), FadeIn(lb))
        self.mark("Zoom a la diferencia")
        gap = DoubleArrow(ax.c2p(0, 1), ax.c2p(0, 2), buff=0).set_color(C_TAN)
        self.zoom_to(VGroup(dot(ax, 0, 1, C_ANG), dot(ax, 0, 2, C_SEN), Dot(ax.c2p(1.6, 3.5)), Dot(ax.c2p(-0.6, 0.4))), scale=0.4)
        self.play(GrowFromCenter(gap), FadeIn(dot(ax, 0, 1, C_ANG)), FadeIn(dot(ax, 0, 2, C_SEN)))
        self.hold()
        self.zoom_reset()
        self.end_section()


class S06_Cierre(TrigCierre):
    recap = [
        ("Subir y bajar", "f(x) + k · afuera: vertical, tal como se lee", C_COS),
        ("Correr", "f(x − h): h a la derecha · adentro: al revés", C_SEN),
        ("Estirar", "a·f(x): a > 1 estira · 0 < a < 1 encoge", C_TAN),
        ("Reflejar", "−f(x) en el eje x · f(−x) en el eje y", C_ANG),
    ]
    recap_say = ("Repasemos: lo que está afuera de f mueve en vertical, tal como se lee; lo que está adentro mueve en horizontal y al revés; "
                 "multiplicar estira o encoge; un signo menos refleja; y el orden de los pasos importa.")
    practice = "Ahora: usa los sellos,\nune fórmulas y efectos\ny sigue los puntos"
