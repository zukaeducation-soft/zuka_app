"""
Clase C7 · Operaciones y composición de funciones (Cálculo diferencial, 9:16, fondo de Cálculo).

Sin voz ni subtítulos ni preguntas al espectador. Sumar funciones apilando alturas (f(x) = x + 1,
g(x) = x², zoom a la barra apilada en x = 1), producto y cociente con su dominio, la composición como
cadena de máquinas (g(f(3)) = 16), el orden importa (f(g(3)) = 10 y las dos gráficas) y desarmar
(2x + 1)³ en capas. Cronograma, clase 6.

    manimgl composicion.py S03_Cadena -w -l
"""
from calc_fx import *

F = lambda x: x + 1
G = lambda x: x * x


class S00_Portada(TrigPortada):
    part_tag = "Cálculo · Clase C7"
    title = "Operaciones y composición"
    subtitle = "Alturas que se apilan y máquinas en cadena"


def machine(label_tex, color):
    body = RoundedRectangle(width=2.0, height=1.3, corner_radius=0.22).set_fill(PEACH, 1).set_stroke(color, 4)
    return VGroup(body, M(label_tex, size=36, color=color).move_to(body))


def ball(value, color):
    b = VGroup(Circle(radius=0.34).set_fill(color, 1).set_stroke(width=0), M(str(value), size=28, color=BG_COLOR))
    b[1].move_to(b[0])
    return b


class S01_Alturas(MBScene):
    def construct(self):
        self.mark("Sumar funciones")
        self.set_header(R"f + g", "Sumar", C_COS, P_COS)
        self.say("Sumar dos funciones es apilar alturas: en cada x, la altura de f más la altura de g. Como poner un bloque encima de otro.", fox=True)
        plane = get_plane((-2, 2), (-1, 7), 0.85).move_to(1.6 * UP)
        ax = plane.axes
        self.play(ShowCreation(plane), run_time=1.0)
        cf, cg = curve(ax, F, -2, 2, C_COS), curve(ax, G, -2, 2, C_ANG)
        lf = M(R"f(x) = x + 1", size=28, color=C_COS).move_to(ax.c2p(-1.1, 6.2))
        lg = M(R"g(x) = x^2", size=28, color=C_ANG).move_to(ax.c2p(1.1, 6.2))
        self.play(ShowCreation(cf), ShowCreation(cg), FadeIn(lf), FadeIn(lg))
        bars = VGroup()
        for x in (-1, 0, 1, 1.5):
            w = 0.18
            b1 = Rectangle(width=w, height=abs(F(x)) * 0.85 or 0.01).set_fill(C_COS, 0.6).set_stroke(width=0)
            b1.move_to(ax.c2p(x, F(x) / 2))
            b2 = Rectangle(width=w, height=G(x) * 0.85 or 0.01).set_fill(C_ANG, 0.6).set_stroke(width=0)
            b2.move_to(ax.c2p(x, F(x) + G(x) / 2))
            bars.add(VGroup(b1, b2))
        self.play(LaggedStartMap(FadeIn, bars, lag_ratio=0.3), run_time=1.6)
        self.mark("Zoom a una barra")
        top = dot(ax, 1, 3, C_TAN)
        calc = M(R"(f + g)(1) = 2 + 1 = 3", size=22, color=C_TAN).next_to(top, RIGHT, buff=0.12)
        self.zoom_to(VGroup(bars[2], top, calc), scale=0.4)
        self.play(FadeIn(top, scale=0.5), Write(calc))
        self.hold()
        self.zoom_reset()
        self.say("Uniendo las cimas de todas las barras aparece la gráfica de f más g: x cuadrado más x más uno.")
        s = curve(ax, lambda x: F(x) + G(x), -2, 2, C_TAN)
        ls = M(R"(f + g)(x) = x^2 + x + 1", size=34, color=C_TAN).move_to(3.4 * DOWN)
        self.play(ShowCreation(s), Write(ls), run_time=1.6)
        self.hold(0.5)
        self.end_section()


class S02_Producto(MBScene):
    def construct(self):
        self.mark("Producto y cociente")
        self.set_header(R"f \cdot g", "Multiplicar", C_ANG, P_ANG)
        self.say("Restar, multiplicar o dividir funciones también se hace punto a punto, con las alturas de cada x.", fox=True)
        rows = VGroup(
            M(R"(f - g)(x) = f(x) - g(x)", size=38),
            M(R"(f \cdot g)(x) = f(x)\, g(x)", size=38),
            M(R"\left(\frac{f}{g}\right)(x) = \frac{f(x)}{g(x)}", size=38),
        ).arrange(DOWN, buff=0.45).move_to(2.8 * UP)
        self.play(LaggedStartMap(FadeIn, rows, shift=0.2 * DOWN, lag_ratio=0.4), run_time=1.6)
        ex = M(R"(f \cdot g)(2) = 3 \cdot 4 = 12", size=36, color=C_ANG).move_to(0.2 * DOWN)
        self.play(Write(ex))
        self.hold()
        self.mark("El dominio")
        self.say("Ojo con el dominio: la nueva función solo existe donde existen las dos. Y en el cociente, además, hay que quitar los x donde g vale cero.")
        note = boxed(VGroup(T("dominio de f/g:", size=30, color=INK), M(R"x^2 \ne 0 \;\Rightarrow\; x \ne 0", size=36, color=C_SEN)).arrange(DOWN, buff=0.2), color=C_SEN).move_to(2.4 * DOWN)
        self.play(FadeIn(note, shift=0.2 * UP))
        self.hold(0.5)
        self.end_section()


class S03_Cadena(MBScene):
    def construct(self):
        self.mark("Máquinas en cadena")
        self.set_header(R"g \circ f", "Composición", C_SEN, P_SEN)
        self.say("Componer es conectar máquinas: lo que sale de la primera entra a la segunda. Aquí f suma uno y g eleva al cuadrado.", fox=True)
        mf = machine(R"f: +1", C_COS).move_to(1.6 * LEFT + 2.2 * UP)
        mg = machine(R"g: (\;)^2", C_ANG).move_to(1.6 * RIGHT + 2.2 * UP)
        pipe = Arrow(mf.get_right(), mg.get_left(), buff=0.1).set_color(MUTED)
        self.play(FadeIn(mf), FadeIn(mg), GrowArrow(pipe))
        b = ball(3, C_TAN).next_to(mf, UP, buff=0.5).shift(1.0 * LEFT)
        self.play(FadeIn(b, scale=0.5))
        self.play(b.animate.move_to(mf), run_time=0.7)
        b4 = ball(4, C_TAN).move_to(mf)
        self.remove(b); self.add(b4)
        self.play(b4.animate.move_to(mg), run_time=0.9)
        b16 = ball(16, C_TAN).move_to(mg)
        self.remove(b4); self.add(b16)
        self.play(b16.animate.next_to(mg, DOWN, buff=0.5), run_time=0.7)
        eq = M(R"g(f(3)) = g(4) = 16", size=40, color=C_TAN).move_to(0.6 * DOWN)
        self.play(Write(eq))
        self.say("Se escribe g compuesta con f, o g de f de x: se lee de adentro hacia afuera. Primero actúa f, la que está pegada a la x.")
        gen = M(R"(g \circ f)(x) = g(f(x)) = (x + 1)^2", size=38, color=INK).move_to(2.4 * DOWN)
        self.play(Write(gen))
        self.hold(0.5)
        self.end_section()


class S04_Orden(MBScene):
    def construct(self):
        self.mark("El orden importa")
        self.set_header(R"f \circ g", "El orden", C_TAN, P_TAN)
        self.say("Si cambiamos el orden de las máquinas, cambia todo. Ponerse las medias y después los zapatos no es lo mismo que al revés.", fox=True)
        mg = machine(R"g: (\;)^2", C_ANG).move_to(1.6 * LEFT + 4.0 * UP)
        mf = machine(R"f: +1", C_COS).move_to(1.6 * RIGHT + 4.0 * UP)
        self.play(FadeIn(mg), FadeIn(mf), GrowArrow(Arrow(mg.get_right(), mf.get_left(), buff=0.1).set_color(MUTED)))
        eq = M(R"f(g(3)) = f(9) = 10 \ne 16", size=38, color=C_COS).move_to(2.5 * UP)
        self.play(Write(eq))
        self.hold()
        self.say("En gráficas: x más uno al cuadrado es la parábola corrida a la izquierda; x cuadrado más uno es la parábola subida. Son funciones distintas.")
        plane = get_plane((-3, 2), (-1, 5), 0.8).move_to(0.6 * DOWN)
        ax = plane.axes
        self.play(ShowCreation(plane), run_time=0.8)
        a = curve(ax, lambda x: (x + 1) ** 2, -3, 2, C_SEN)
        b = curve(ax, lambda x: x * x + 1, -3, 2, C_COS)
        la = M(R"(g \circ f)(x) = (x + 1)^2", size=28, color=C_SEN).next_to(plane, DOWN, buff=0.25).shift(1.6 * LEFT)
        lb = M(R"(f \circ g)(x) = x^2 + 1", size=28, color=C_COS).next_to(plane, DOWN, buff=0.25).shift(1.8 * RIGHT)
        self.play(ShowCreation(a), FadeIn(la))
        self.play(ShowCreation(b), FadeIn(lb))
        self.hold(0.5)
        self.end_section()


class S05_Desarmar(MBScene):
    def construct(self):
        self.mark("Desarmar una compuesta")
        self.set_header(R"h = f \circ g", "Desarmar", C_COS, P_COS)
        self.say("A veces hay que hacer lo contrario: ver una función como una cebolla y pelarla en capas. La capa de adentro es lo primero que se calcula.", fox=True)
        h = M(R"h(x) = (2x + 1)^3", size=52, color=INK, t2c={"2x + 1": C_ANG}).move_to(3.4 * UP)
        self.play(Write(h))
        inner = h.select_part("2x + 1")
        box_in = SurroundingRectangle(inner, buff=0.08).set_stroke(C_ANG, 3)
        self.play(ShowCreation(box_in))
        box_out = SurroundingRectangle(h[5:], buff=0.16).set_stroke(C_SEN, 3)
        self.play(ShowCreation(box_out))
        parts = VGroup(
            M(R"\text{adentro: } g(x) = 2x + 1", size=38, color=C_ANG),
            M(R"\text{afuera: } f(u) = u^3", size=38, color=C_SEN),
            M(R"h = f \circ g", size=44, color=INK),
        ).arrange(DOWN, buff=0.45).move_to(0.6 * UP)
        self.play(LaggedStartMap(FadeIn, parts, shift=0.2 * DOWN, lag_ratio=0.5), run_time=2)
        self.hold()
        self.mark("Zoom a la capa de adentro")
        self.zoom_to(VGroup(h, box_out), scale=0.4)
        self.say("Primero se dobla y se suma uno; con ese resultado, se eleva al cubo. Esta lectura por capas será la base de la regla de la cadena en las derivadas.")
        self.hold()
        self.zoom_reset()
        self.end_section()


class S06_Cierre(TrigCierre):
    recap = [
        ("Operaciones", "(f + g)(x) = f(x) + g(x) · punto a punto", C_COS),
        ("Dominio", "donde existen las dos · en f/g, g(x) ≠ 0", C_ANG),
        ("Composición", "(g ∘ f)(x) = g(f(x)): primero f", C_SEN),
        ("El orden importa", "en general g ∘ f ≠ f ∘ g", C_TAN),
    ]
    recap_say = ("Repasemos: las funciones se operan punto a punto; el dominio es donde existen las dos; "
                 "componer es encadenar máquinas, primero la de adentro; y el orden importa.")
    practice = "Ahora: apila alturas,\narma tuberías de máquinas\ny calcula composiciones"
