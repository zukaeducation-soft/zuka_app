"""
Clase C5 · Funciones: dominio, rango y simetría (Cálculo diferencial, 9:16, fondo de Cálculo).

Sin voz ni subtítulos ni preguntas al espectador. La función como máquina (una salida por entrada), el
criterio de la recta vertical (la circunferencia falla: zoom a los dos cortes), el dominio natural de
1/(x − 2) y √(x + 1) (la máquina se atasca), el rango como sombra de x² − 1 (zoom al vértice), par e impar
como espejo y media vuelta, y crecer/decrecer como subir y bajar una colina. Cronograma, clase 4.

    manimgl funciones.py S03_Dominio -w -l
"""
from calc_fx import *


class S00_Portada(TrigPortada):
    part_tag = "Cálculo · Clase C5"
    title = "Funciones: dominio,\nrango y simetría"
    subtitle = "Máquinas, sombras y espejos"


def machine(label_tex, color=C_COS, width=3.0):
    body = RoundedRectangle(width=width, height=1.5, corner_radius=0.25).set_fill(PEACH, 1).set_stroke(color, 4)
    label = M(label_tex, size=40, color=INK).move_to(body)
    funnel = Polygon(LEFT * 0.45 + UP * 0.35, RIGHT * 0.45 + UP * 0.35, RIGHT * 0.2 + DOWN * 0.1, LEFT * 0.2 + DOWN * 0.1)
    funnel.set_fill(color, 0.6).set_stroke(color, 2).next_to(body, LEFT, buff=-0.05).shift(0.1 * UP)
    spout = Rectangle(0.45, 0.3).set_fill(color, 0.6).set_stroke(color, 2).next_to(body, RIGHT, buff=-0.02).shift(0.25 * DOWN)
    return VGroup(funnel, spout, body, label)


class S01_Maquina(MBScene):
    def construct(self):
        self.mark("La función como máquina")
        self.set_header(R"f(x)", "La máquina", C_COS, P_COS)
        self.say("Una función es como una máquina de jugos: le metes una fruta y sale un jugo. Lo importante es que cada entrada da exactamente una salida.", fox=True)
        mach = machine(R"f(x) = 2x + 1").move_to(2.6 * UP)
        self.play(FadeIn(mach, shift=0.2 * UP))
        rows = VGroup()
        for i, (x, y) in enumerate([(3, 7), (0, 1), (-2, -3)]):
            ball = VGroup(Circle(radius=0.32).set_fill(C_ANG, 1).set_stroke(width=0), M(str(x), size=30, color=BG_COLOR))
            ball[1].move_to(ball[0])
            ball.move_to(mach.get_left() + 1.1 * LEFT + 0.8 * UP)
            self.play(FadeIn(ball, scale=0.6), run_time=0.4)
            self.play(ball.animate.move_to(mach[2].get_center()).scale(0.4).set_opacity(0), run_time=0.6)
            out = VGroup(Circle(radius=0.32).set_fill(C_TAN, 1).set_stroke(width=0), M(str(y), size=30, color=BG_COLOR))
            out[1].move_to(out[0])
            out.move_to(mach[1].get_center())
            self.play(out.animate.move_to(mach.get_right() + 0.9 * RIGHT + 0.9 * DOWN), run_time=0.6)
            row = M(Rf"f({x}) = {y}", size=36, color=INK)
            rows.add(row)
            row.move_to(0.2 * UP + i * 0.75 * DOWN)
            self.play(FadeIn(row, shift=0.2 * LEFT), FadeOut(out), run_time=0.5)
        self.hold()
        self.mark("Una entrada, una salida")
        self.say("En diagrama: cada elemento de la izquierda manda exactamente una flecha. Si alguno manda dos, ya no es función.")
        self.play(FadeOut(rows), FadeOut(mach))
        good, bad = self.diagram(True).move_to(1.6 * LEFT + 0.6 * UP), self.diagram(False).move_to(1.9 * RIGHT + 0.6 * UP)
        self.play(FadeIn(good), FadeIn(bad))
        ok = check_mark(C_Q, 70).next_to(good, DOWN, buff=0.3)
        no = ex_mark(C_I, 70).next_to(bad, DOWN, buff=0.3)
        self.play(FadeIn(ok, scale=0.5), FadeIn(no, scale=0.5))
        self.hold(0.5)
        self.end_section()

    def diagram(self, ok):
        L = Ellipse(width=1.2, height=2.6).set_stroke(C_COS, 3)
        R = Ellipse(width=1.2, height=2.6).set_stroke(C_TAN, 3).next_to(L, RIGHT, buff=0.8)
        xs = VGroup(*[M(s, size=30) for s in "123"]).arrange(DOWN, buff=0.45).move_to(L)
        ys = VGroup(*[M(s, size=30) for s in "abc"]).arrange(DOWN, buff=0.45).move_to(R)
        pairs = [(0, 1), (1, 1), (2, 0)] if ok else [(0, 0), (0, 2), (1, 1), (2, 1)]
        arrows = VGroup(*[Arrow(xs[i].get_right(), ys[j].get_left(), buff=0.12, stroke_width=3).set_color(C_I if (not ok and i == 0) else C_ANG) for i, j in pairs])
        return VGroup(L, R, xs, ys, arrows)


class S02_RectaVertical(MBScene):
    def construct(self):
        self.mark("Criterio de la recta vertical")
        self.set_header(R"x = a", "Recta vertical", C_SEN, P_SEN)
        self.say("En una gráfica, la regla se ve con una recta vertical: si ninguna vertical la corta dos veces, cada x tiene una sola y. Es función.", fox=True)
        plane = get_plane((-4, 4), (-4, 5), 0.8).move_to(1.4 * UP)
        ax = plane.axes
        par = curve(ax, lambda x: x * x / 2 - 2, -4, 4, C_COS)
        self.play(ShowCreation(plane), run_time=1.0)
        self.play(ShowCreation(par))
        xt = ValueTracker(-3)
        vline = always_redraw(lambda: Line(ax.c2p(xt.get_value(), -4), ax.c2p(xt.get_value(), 5)).set_stroke(C_SEN, 4))
        hit = always_redraw(lambda: Dot(ax.c2p(xt.get_value(), xt.get_value() ** 2 / 2 - 2), radius=0.11).set_fill(C_ANG, 1))
        self.add(vline, hit)
        self.play(xt.animate.set_value(3), run_time=3)
        self.hold()
        self.mark("La circunferencia falla")
        self.say("Una circunferencia no pasa la prueba: la vertical en x igual a uno la corta arriba y abajo. Ese x tendría dos salidas.")
        self.play(FadeOut(par), FadeOut(hit))
        circ = Circle(radius=3 * 0.8).move_to(ax.c2p(0, 0)).set_stroke(C_TAN, 5)
        self.play(ShowCreation(circ), xt.animate.set_value(1))
        y = (9 - 1) ** 0.5
        d1, d2 = Dot(ax.c2p(1, y), radius=0.12).set_fill(C_I, 1), Dot(ax.c2p(1, -y), radius=0.12).set_fill(C_I, 1)
        l1 = M(R"(1, \sqrt{8})", size=24, color=C_I).next_to(d1, RIGHT, buff=0.1)
        l2 = M(R"(1, -\sqrt{8})", size=24, color=C_I).next_to(d2, RIGHT, buff=0.1)
        self.play(FadeIn(d1, scale=0.5), FadeIn(d2, scale=0.5), FadeIn(l1), FadeIn(l2))
        self.zoom_to(VGroup(d1, d2, l1, l2), scale=0.55)
        self.hold()
        self.zoom_reset()
        vline.clear_updaters()
        note = boxed(T("dos cortes ⟹ no es función", size=30, color=C_I), color=C_I).move_to(3.4 * DOWN)
        self.play(FadeIn(note, shift=0.2 * UP))
        self.hold(0.5)
        self.end_section()


class S03_Dominio(MBScene):
    def construct(self):
        self.mark("Dominio natural")
        self.set_header(R"D_f", "Dominio", C_ANG, P_ANG)
        self.say("El dominio son las entradas que la máquina acepta. Hay dos cosas que la atascan: dividir entre cero y sacar raíz cuadrada de un negativo.", fox=True)
        mach = machine(R"\frac{1}{x - 2}", color=C_ANG, width=2.6).move_to(3.3 * UP)
        self.play(FadeIn(mach))
        ball = VGroup(Circle(radius=0.32).set_fill(C_I, 1).set_stroke(width=0), M("2", size=30, color=BG_COLOR))
        ball[1].move_to(ball[0]); ball.move_to(mach.get_left() + 1.0 * LEFT + 0.8 * UP)
        self.play(FadeIn(ball, scale=0.6), run_time=0.4)
        self.play(ball.animate.move_to(mach[2]).scale(0.4).set_opacity(0), run_time=0.6)
        smoke = T("¡÷ 0!", size=34, color=C_I).next_to(mach, UP, buff=0.15)
        self.play(FadeIn(smoke, shift=0.3 * UP), WiggleOutThenIn(mach), run_time=1.0)
        self.say("Con x igual a dos el denominador vale cero: la máquina se atasca. El dominio es todo real menos el dos.")
        line = get_number_line((-2, 6, 1), width=6.4).move_to(1.2 * UP)
        ray = VGroup(Line(line.n2p(-2), line.n2p(2)).set_stroke(C_ANG, 7), Line(line.n2p(2), line.n2p(6)).set_stroke(C_ANG, 7))
        hole = Dot(line.n2p(2), radius=0.12).set_fill(BG_COLOR, 1).set_stroke(C_ANG, 4)
        dl = M(R"D = \mathbb{R} \setminus \{2\}", size=38, color=C_ANG).next_to(line, DOWN, buff=0.55)
        self.play(ShowCreation(line))
        self.play(ShowCreation(ray), FadeIn(hole, scale=0.5), Write(dl))
        self.hold()
        self.mark("La raíz cuadrada")
        self.say("Con la raíz de x más uno, lo de adentro no puede ser negativo: x más uno mayor o igual que cero, o sea x desde menos uno.")
        self.play(FadeOut(VGroup(ball, smoke, line, ray, hole, dl)), FadeOut(mach))
        mach2 = machine(R"\sqrt{x + 1}", color=C_COS, width=2.6).move_to(3.3 * UP)
        self.play(FadeIn(mach2))
        cond = M(R"x + 1 \ge 0 \;\Rightarrow\; x \ge -1", size=40, color=INK).move_to(1.6 * UP)
        self.play(Write(cond))
        line2 = get_number_line((-4, 4, 1), width=6.4).move_to(0.2 * DOWN)
        ray2 = Line(line2.n2p(-1), line2.n2p(4)).set_stroke(C_COS, 7)
        full = Dot(line2.n2p(-1), radius=0.12).set_fill(C_COS, 1)
        dl2 = M(R"D = [-1, \infty)", size=40, color=C_COS).next_to(line2, DOWN, buff=0.55)
        self.play(ShowCreation(line2))
        self.play(ShowCreation(ray2), FadeIn(full, scale=0.5), Write(dl2))
        self.zoom_to(VGroup(line2, dl2), scale=0.5)
        self.say("El menos uno sí entra: la raíz de cero es cero. Por eso el punto va lleno.")
        self.hold()
        self.zoom_reset()
        self.end_section()


class S04_Rango(MBScene):
    def construct(self):
        self.mark("El rango como sombra")
        self.set_header(R"R_f", "Rango", C_TAN, P_TAN)
        self.say("Imagina una linterna que alumbra la gráfica desde un lado: su sombra sobre el eje y son todas las salidas. Eso es el rango.", fox=True)
        plane = get_plane((-3, 3), (-2, 7), 0.85).move_to(1.6 * UP)
        ax = plane.axes
        g = curve(ax, lambda x: x * x - 1, -3, 3, C_TAN)
        fl = M(R"f(x) = x^2 - 1", size=36, color=C_TAN).next_to(plane, DOWN, buff=0.3)
        self.play(ShowCreation(plane), run_time=1.0)
        self.play(ShowCreation(g), FadeIn(fl))
        lamp = VGroup(Circle(radius=0.22).set_fill(C_ANG, 1).set_stroke(width=0), T("☀", size=30, color=C_ANG))
        lamp.move_to(ax.c2p(3, 3) + 0.9 * RIGHT)
        beams = VGroup(*[DashedLine(lamp.get_center(), ax.c2p(0, y), dash_length=0.08).set_stroke(C_ANG, 1.5, opacity=0.6) for y in (-1, 1, 3, 5)])
        self.play(FadeIn(lamp), ShowCreation(beams))
        shadow = Line(ax.c2p(0, -1), ax.c2p(0, 7)).set_stroke(C_TAN, 12, opacity=0.7)
        self.play(ShowCreation(shadow), run_time=1.4)
        rl = M(R"R = [-1, \infty)", size=40, color=C_TAN).move_to(3.4 * DOWN)
        self.play(Write(rl))
        self.mark("Zoom al vértice")
        self.zoom_to(VGroup(dot(ax, 0, -1, C_TAN), ax.c2p(1.2, 0.2), ax.c2p(-1.2, -1.6)), scale=0.4)
        v = dot(ax, 0, -1, C_ANG)
        vl = M(R"(0, -1)", size=22, color=C_ANG).next_to(v, DR, buff=0.06)
        self.play(FadeIn(v, scale=0.5), FadeIn(vl))
        self.say("La sombra empieza en menos uno, el punto más bajo de la parábola, y sube sin fin.")
        self.hold()
        self.zoom_reset()
        self.say("Y la sombra sobre el eje x, desde arriba, es el dominio: aquí cubre todo el eje, porque cualquier x se puede elevar al cuadrado.")
        dshadow = Line(ax.c2p(-3, 0), ax.c2p(3, 0)).set_stroke(C_COS, 12, opacity=0.6)
        self.play(ShowCreation(dshadow))
        self.hold(0.5)
        self.end_section()


class S05_Simetria(MBScene):
    def construct(self):
        self.mark("Funciones pares")
        self.set_header(R"f(-x)", "Simetría", C_SEN, P_SEN)
        self.say("Algunas gráficas tienen espejo. Si doblas la de x cuadrado por el eje y, las dos mitades coinciden: f de menos x es igual a f de x. Es par.", fox=True)
        plane = get_plane((-3, 3), (-1, 6), 0.8).move_to(2.2 * UP)
        ax = plane.axes
        self.play(ShowCreation(plane), run_time=1.0)
        right = curve(ax, lambda x: x * x / 1.6, 0, 3, C_SEN)
        self.play(ShowCreation(right))
        left = right.copy()
        self.play(left.animate.flip(UP, about_point=ax.c2p(0, 0)), run_time=1.4)
        p1, p2 = dot(ax, 2, 4 / 1.6, C_ANG), dot(ax, -2, 4 / 1.6, C_ANG)
        lab = M(R"f(-2) = f(2)", size=34, color=C_ANG).next_to(plane, DOWN, buff=0.3)
        self.play(FadeIn(p1), FadeIn(p2), Write(lab))
        self.hold()
        self.clear_scene()
        self.mark("Funciones impares")
        self.say("Con x al cubo no hay espejo, pero sí media vuelta: si la giras ciento ochenta grados alrededor del origen, cae sobre sí misma. f de menos x es menos f de x. Es impar.")
        plane2 = get_plane((-3, 3), (-4, 4), 0.75).move_to(1.6 * UP)
        ax2 = plane2.axes
        self.play(ShowCreation(plane2), run_time=0.8)
        half = curve(ax2, lambda x: x ** 3 / 3, 0, 2.3, C_COS)
        self.play(ShowCreation(half))
        other = half.copy()
        self.play(Rotate(other, PI, about_point=ax2.c2p(0, 0)), run_time=1.8)
        q1, q2 = dot(ax2, 1.5, 1.125, C_ANG), dot(ax2, -1.5, -1.125, C_ANG)
        lab2 = M(R"f(-x) = -f(x)", size=36, color=C_COS).next_to(plane2, DOWN, buff=0.3)
        self.play(FadeIn(q1), FadeIn(q2), Write(lab2))
        self.hold(0.5)
        self.end_section()


class S06_Crece(MBScene):
    def construct(self):
        self.mark("Crecer y decrecer")
        self.set_header(R"\nearrow\searrow", "Crece y decrece", C_TAN, P_TAN)
        self.say("Una gráfica es un camino que se recorre de izquierda a derecha. Donde el caminante sube, la función crece; donde baja, decrece.", fox=True)
        plane = get_plane((-2, 4), (-2, 5), 0.85).move_to(1.6 * UP)
        ax = plane.axes
        f = lambda x: 3 - (x - 1) ** 2
        up = curve(ax, f, -1.2, 1, C_TAN)
        down = curve(ax, f, 1, 3.2, C_SEN)
        self.play(ShowCreation(plane), run_time=0.8)
        self.play(ShowCreation(up), ShowCreation(down), run_time=1.6)
        t = ValueTracker(-1.2)
        walker = always_redraw(lambda: Dot(ax.c2p(t.get_value(), f(t.get_value())), radius=0.14).set_fill(C_TAN if t.get_value() < 1 else C_SEN, 1))
        self.add(walker)
        self.play(t.animate.set_value(1), run_time=1.6, rate_func=linear)
        lu = M(R"\text{crece en } (-\infty, 1]", size=32, color=C_TAN).move_to(2.0 * DOWN)
        self.play(FadeIn(lu))
        self.play(t.animate.set_value(3.2), run_time=1.6, rate_func=linear)
        ld = M(R"\text{decrece en } [1, \infty)", size=32, color=C_SEN).next_to(lu, DOWN, buff=0.3)
        self.play(FadeIn(ld))
        walker.clear_updaters()
        self.say("La cima, en x igual a uno, es donde cambia: allí deja de subir y empieza a bajar. Ese punto de cambio será clave en la derivada.")
        top = dot(ax, 1, 3, C_ANG, r=0.13)
        self.play(FadeIn(top, scale=0.4))
        self.hold(0.5)
        self.end_section()


class S07_Cierre(TrigCierre):
    recap = [
        ("Función", "a cada entrada, una sola salida · recta vertical", C_COS),
        ("Dominio", "sin dividir entre 0 ni raíz par de negativos", C_ANG),
        ("Rango", "la sombra de la gráfica sobre el eje y", C_TAN),
        ("Par · impar", "espejo en el eje y · media vuelta en el origen", C_SEN),
    ]
    recap_say = ("Repasemos: una función da una sola salida por entrada; el dominio evita dividir entre cero y las raíces de negativos; "
                 "el rango es la sombra sobre el eje y; las pares son espejo y las impares, media vuelta.")
    practice = "Ahora: proyecta sombras,\ncompleta simetrías\ny calcula valores"
