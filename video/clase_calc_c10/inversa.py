"""
Clase C10 · Función biyectiva e inversa (Cálculo diferencial, 9:16, fondo de Cálculo).

Sin voz ni subtítulos ni preguntas al espectador. Inyectiva con la recta horizontal (x³ pasa, x² falla:
zoom a los dos cortes), biyectiva, deshacer en orden contrario (medias y zapatos), despejar
y = 2x + 3, el espejo y = x que lleva (1, 5) a (5, 1) (zoom) y restringir x² a x ≥ 0 para tener √x.
Cronograma, clase 9.

    manimgl inversa.py S04_Espejo -w -l
"""
from calc_fx import *


class S00_Portada(TrigPortada):
    part_tag = "Cálculo · Clase C10"
    title = "Función biyectiva\ne inversa"
    subtitle = "Deshacer lo que hace una función"


class S01_Horizontal(MBScene):
    def construct(self):
        self.mark("Inyectiva")
        self.set_header(R"y = c", "Inyectiva", C_COS, P_COS)
        self.say("Para poder deshacer una función, cada salida debe venir de una sola entrada. Se prueba con una recta horizontal: si nunca corta dos veces, la función es inyectiva.", fox=True)
        plane = get_plane((-3, 3), (-4, 5), 0.8).move_to(1.6 * UP)
        ax = plane.axes
        self.play(ShowCreation(plane), run_time=0.8)
        cube = curve(ax, lambda x: x ** 3 / 2, -2.5, 2.5, C_COS)
        self.play(ShowCreation(cube))
        yt = ValueTracker(-3)
        hl = always_redraw(lambda: Line(ax.c2p(-3, yt.get_value()), ax.c2p(3, yt.get_value())).set_stroke(C_ANG, 4))
        self.add(hl)
        self.play(yt.animate.set_value(4), run_time=2.4)
        ok = check_mark(C_Q, 60).move_to(ax.c2p(-2.2, 3.6))
        self.play(FadeIn(ok, scale=0.5))
        self.hold()
        self.mark("La parábola falla")
        self.say("Con x cuadrado, la recta y igual a cuatro la corta en dos y en menos dos: dos entradas con la misma salida. No es inyectiva.")
        self.play(FadeOut(cube), FadeOut(ok))
        par = curve(ax, lambda x: x * x, -2.3, 2.3, C_SEN)
        self.play(ShowCreation(par), yt.animate.set_value(4))
        hl.clear_updaters()
        d1, d2 = dot(ax, -2, 4, C_I), dot(ax, 2, 4, C_I)
        l1 = M(R"(-2, 4)", size=24, color=C_I).next_to(d1, DOWN, buff=0.12)
        l2 = M(R"(2, 4)", size=24, color=C_I).next_to(d2, DOWN, buff=0.12)
        self.play(FadeIn(d1, scale=0.5), FadeIn(d2, scale=0.5), FadeIn(l1), FadeIn(l2))
        self.zoom_to(VGroup(d1, d2, l1, l2), scale=0.5)
        self.hold()
        self.zoom_reset()
        self.say("Si además alcanza todas las salidas del codominio, se llama biyectiva. Esas son las funciones que tienen inversa.")
        note = boxed(T("biyectiva = inyectiva + sobreyectiva", size=28, color=C_COS), color=C_COS).move_to(3.6 * DOWN)
        self.play(FadeIn(note, shift=0.2 * UP))
        self.hold(0.5)
        self.end_section()


class S02_Deshacer(MBScene):
    def construct(self):
        self.mark("Deshacer en orden contrario")
        self.set_header(R"f^{-1}", "Deshacer", C_SEN, P_SEN)
        self.say("La inversa deshace lo que hace f. Por la mañana te pones primero las medias y luego los zapatos; por la noche te los quitas al revés: primero zapatos, luego medias.", fox=True)
        do = VGroup(T("medias", size=32, color=C_COS), T("→", size=32, color=MUTED), T("zapatos", size=32, color=C_ANG)).arrange(RIGHT, buff=0.3).move_to(3.6 * UP)
        undo = VGroup(T("quitar zapatos", size=32, color=C_ANG), T("→", size=32, color=MUTED), T("quitar medias", size=32, color=C_COS)).arrange(RIGHT, buff=0.3).move_to(2.6 * UP)
        self.play(FadeIn(do, shift=0.2 * RIGHT))
        self.play(FadeIn(undo, shift=0.2 * LEFT))
        self.hold()
        self.say("Con f de x igual a dos x más tres: f primero multiplica por dos y luego suma tres. La inversa resta tres y luego divide entre dos.")
        f_ops = VGroup(M(R"x", size=40), M(R"\xrightarrow{\times 2}", size=40, color=C_COS), M(R"2x", size=40), M(R"\xrightarrow{+3}", size=40, color=C_ANG), M(R"2x + 3", size=40)).arrange(RIGHT, buff=0.15).move_to(0.6 * UP)
        f_ops.set_max_width(7.2)
        inv = VGroup(M(R"\frac{x - 3}{2}", size=40), M(R"\xleftarrow{\div 2}", size=40, color=C_COS), M(R"x - 3", size=40), M(R"\xleftarrow{-3}", size=40, color=C_ANG), M(R"x", size=40)).arrange(RIGHT, buff=0.15).move_to(1.2 * DOWN)
        inv.set_max_width(7.2)
        self.play(LaggedStartMap(FadeIn, f_ops, lag_ratio=0.3), run_time=1.6)
        self.play(LaggedStartMap(FadeIn, inv[::-1], lag_ratio=0.3), run_time=1.6)
        res = boxed(M(R"f^{-1}(f(x)) = x", size=40, color=C_SEN), color=C_SEN).move_to(3.4 * DOWN)
        self.play(FadeIn(res, shift=0.2 * UP))
        self.hold(0.5)
        self.end_section()


class S03_Despejar(MBScene):
    def construct(self):
        self.mark("Despejar")
        self.set_header(R"x = ?", "Despejar", C_ANG, P_ANG)
        self.say("La receta algebraica: escribe y igual a f de x y despeja la x. Lo que quede es la máquina que devuelve la entrada a partir de la salida.", fox=True)
        steps = VGroup(
            M(R"y = 2x + 3", size=46),
            M(R"y - 3 = 2x", size=46),
            M(R"x = \frac{y - 3}{2}", size=46, color=C_ANG),
            M(R"f^{-1}(x) = \frac{x - 3}{2}", size=48, color=C_SEN),
        ).arrange(DOWN, buff=0.5).move_to(1.6 * UP)
        for s in steps:
            self.play(FadeIn(s, shift=0.2 * DOWN), run_time=0.8)
            self.wait(0.4)
        self.say("Al final se cambia el nombre de la variable a x, porque así se escriben las funciones. Comprobación: f de uno es cinco, y la inversa de cinco es uno.")
        check = M(R"f(1) = 5 \qquad f^{-1}(5) = \frac{5 - 3}{2} = 1", size=36, color=C_TAN).move_to(3.4 * DOWN)
        self.play(Write(check))
        self.hold(0.5)
        self.end_section()


class S04_Espejo(MBScene):
    def construct(self):
        self.mark("El espejo y = x")
        self.set_header(R"y = x", "El espejo", C_TAN, P_TAN)
        self.say("En la gráfica, la inversa intercambia entradas y salidas: el punto uno, cinco de f pasa a ser el punto cinco, uno de la inversa. Eso es reflejar en la recta y igual a x.", fox=True)
        plane = get_plane((-2, 7), (-2, 7), 0.72).move_to(1.4 * UP)
        ax = plane.axes
        self.play(ShowCreation(plane), run_time=0.8)
        mirror = DashedLine(ax.c2p(-2, -2), ax.c2p(7, 7), dash_length=0.12).set_stroke(C_TAN, 3)
        ml = M(R"y = x", size=28, color=C_TAN).next_to(ax.c2p(6.3, 6.3), DR, buff=0.1)
        self.play(ShowCreation(mirror), FadeIn(ml))
        f = curve(ax, lambda x: 2 * x + 3, -2, 2, C_COS)
        lf = M(R"f", size=32, color=C_COS).next_to(ax.c2p(1.6, 6.2), LEFT, buff=0.1)
        self.play(ShowCreation(f), FadeIn(lf))
        P = dot(ax, 1, 5, C_ANG)
        lp = M(R"(1, 5)", size=24, color=C_ANG).next_to(P, LEFT, buff=0.1)
        self.play(FadeIn(P, scale=0.5), FadeIn(lp))
        Q = dot(ax, 5, 1, C_ANG)
        lq = M(R"(5, 1)", size=24, color=C_ANG).next_to(Q, DOWN, buff=0.12)
        link = DashedLine(P.get_center(), Q.get_center(), dash_length=0.08).set_stroke(C_ANG, 2)
        self.mark("Zoom al reflejo")
        self.zoom_to(VGroup(P, Q, lp, lq), scale=0.5)
        self.play(ShowCreation(link), TransformFromCopy(P, Q), FadeIn(lq))
        self.hold()
        self.zoom_reset()
        self.say("Haciendo lo mismo con toda la recta aparece la gráfica de la inversa: el reflejo de f en el espejo.")
        fi = f.copy()
        self.play(fi.animate.flip(np.array([1, -1, 0]), about_point=ax.c2p(0, 0)).set_stroke(C_SEN), run_time=2)
        lfi = M(R"f^{-1}", size=32, color=C_SEN).next_to(ax.c2p(6.2, 1.6), UP, buff=0.1)
        self.play(FadeIn(lfi))
        self.hold(0.5)
        self.end_section()


class S05_Restringir(MBScene):
    def construct(self):
        self.mark("Restringir el dominio")
        self.set_header(R"x \ge 0", "Restringir", C_COS, P_COS)
        self.say("¿Y x cuadrado, que no es inyectiva? Se le quita media gráfica: si solo usamos x mayor o igual que cero, cada salida tiene una sola entrada.", fox=True)
        plane = get_plane((-3, 5), (-1, 5), 0.8).move_to(1.4 * UP)
        ax = plane.axes
        self.play(ShowCreation(plane), run_time=0.8)
        left = curve(ax, lambda x: x * x, -2.2, 0, C_COS)
        right = curve(ax, lambda x: x * x, 0, 2.2, C_COS)
        self.play(ShowCreation(left), ShowCreation(right))
        self.play(left.animate.set_stroke(opacity=0.15), run_time=1.0)
        mirror = DashedLine(ax.c2p(-1, -1), ax.c2p(5, 5), dash_length=0.12).set_stroke(C_TAN, 3)
        self.play(ShowCreation(mirror))
        root = right.copy()
        self.play(root.animate.flip(np.array([1, -1, 0]), about_point=ax.c2p(0, 0)).set_stroke(C_SEN), run_time=2)
        lab = M(R"x^2,\ x \ge 0 \;\longleftrightarrow\; \sqrt{x}", size=38, color=INK).move_to(3.4 * DOWN)
        self.play(Write(lab))
        self.say("Su reflejo es la raíz cuadrada. Así nacen muchas inversas famosas, como el logaritmo, que es la inversa de la exponencial.")
        self.hold(0.5)
        self.end_section()


class S06_Cierre(TrigCierre):
    recap = [
        ("Inyectiva", "ninguna recta horizontal corta dos veces", C_COS),
        ("Inversa", "deshace en orden contrario · f⁻¹(f(x)) = x", C_SEN),
        ("Despejar", "y = f(x) ⟹ x = … ⟹ cambia el nombre", C_ANG),
        ("Espejo", "(a, b) ⟷ (b, a): reflejo en y = x", C_TAN),
    ]
    recap_say = ("Repasemos: una función con inversa es inyectiva; la inversa deshace en orden contrario; se halla despejando la x; "
                 "y su gráfica es el reflejo en la recta y igual a x.")
    practice = "Ahora: refleja puntos,\nabre cofres con llaves\ny restringe una parábola"
