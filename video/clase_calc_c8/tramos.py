"""
Clase C8 · Funciones a tramos y valor absoluto (Cálculo diferencial, 9:16, fondo de Cálculo).

Sin voz ni subtítulos ni preguntas al espectador. La tarifa de un parqueadero como escalera (zoom al
salto con punto lleno y vacío), una función de dos tramos x² y 3 − x, el valor absoluto como dos tramos
(la V), doblar hacia arriba lo negativo de x² − 4 para obtener |x² − 4| (zoom al doblez) y las funciones
algebraicas. Cronograma, clase 7.

    manimgl tramos.py S04_Doblar -w -l
"""
from calc_fx import *


class S00_Portada(TrigPortada):
    part_tag = "Cálculo · Clase C8"
    title = "Funciones a tramos\ny valor absoluto"
    subtitle = "Escaleras, cortes y dobleces"


class S01_Parqueadero(MBScene):
    def construct(self):
        self.mark("La tarifa del parqueadero")
        self.set_header(R"\{", "A tramos", C_ANG, P_ANG)
        self.say("Un parqueadero cobra dos mil pesos la primera hora, tres mil hasta las tres horas y cinco mil si te quedas más. Una regla distinta en cada tramo de tiempo.", fox=True)
        rule = M(R"P(t) = \begin{cases} 2 & 0 < t \le 1 \\ 3 & 1 < t \le 3 \\ 5 & t > 3 \end{cases}", size=36, color=INK).move_to(4.0 * UP)
        self.play(Write(rule), run_time=1.6)
        plane = get_plane((0, 5), (0, 6), 0.95).move_to(0.2 * DOWN)
        ax = plane.axes
        self.play(ShowCreation(plane), run_time=0.8)
        steps = [(0, 1, 2), (1, 3, 3), (3, 5, 5)]
        segs = VGroup()
        for a, b, y in steps:
            seg = Line(ax.c2p(a, y), ax.c2p(b, y)).set_stroke(C_ANG, 6)
            opn = dot(ax, a, y, C_ANG, filled=False)
            cls = dot(ax, b, y, C_ANG, filled=True) if b < 5 else VGroup()
            segs.add(VGroup(seg, opn, cls))
        self.play(LaggedStartMap(ShowCreation, VGroup(*[s[0] for s in segs]), lag_ratio=0.5), run_time=1.6)
        self.play(*[FadeIn(VGroup(s[1], s[2]), scale=0.5) for s in segs])
        lab = T("horas", size=24, color=MUTED).next_to(ax.c2p(5, 0), DOWN, buff=0.35)
        self.play(FadeIn(lab))
        self.mark("Zoom al salto")
        self.zoom_to(VGroup(segs[0][2], segs[1][1], Dot(ax.c2p(1, 1.4)), Dot(ax.c2p(1, 3.6))), scale=0.35)
        self.say("En t igual a uno, ¿cuánto pagas? El punto lleno dice que una hora exacta todavía cuesta dos mil; el vacío, que el tres mil empieza justo después.")
        self.hold()
        self.zoom_reset()
        self.end_section()


class S02_Trozos(MBScene):
    def construct(self):
        self.mark("Graficar por trozos")
        self.set_header(R"x < 1", "Por trozos", C_COS, P_COS)
        self.say("Para graficar una función a tramos se dibuja cada fórmula solo en su pedazo del eje, como armar un rompecabezas.", fox=True)
        rule = M(R"f(x) = \begin{cases} x^2 & x < 1 \\ 3 - x & x \ge 1 \end{cases}", size=40, color=INK, t2c={"x^2": C_COS, "3 - x": C_SEN}).move_to(4.0 * UP)
        self.play(Write(rule))
        plane = get_plane((-2, 4), (-1, 5), 0.95).move_to(0.2 * DOWN)
        ax = plane.axes
        self.play(ShowCreation(plane), run_time=0.8)
        cut = DashedLine(ax.c2p(1, -1), ax.c2p(1, 5), dash_length=0.1).set_stroke(MUTED, 2)
        self.play(ShowCreation(cut))
        p1 = curve(ax, lambda x: x * x, -2, 1, C_COS)
        h1 = dot(ax, 1, 1, C_COS, filled=False)
        self.play(ShowCreation(p1), FadeIn(h1))
        self.say("El primer trozo es la parábola hasta x igual a uno, sin incluirlo: punto vacío. El segundo empieza en uno con punto lleno y baja.")
        p2 = curve(ax, lambda x: 3 - x, 1, 4, C_SEN)
        f2 = dot(ax, 1, 2, C_SEN, filled=True)
        self.play(ShowCreation(p2), FadeIn(f2))
        val = M(R"f(1) = 3 - 1 = 2", size=38, color=C_SEN).move_to(3.6 * DOWN)
        self.play(Write(val))
        self.say("Para evaluar, primero se mira en qué tramo cae la x. Y aquí hay un salto: la gráfica se rompe en x igual a uno.")
        self.hold(0.5)
        self.end_section()


class S03_Absoluto(MBScene):
    def construct(self):
        self.mark("El valor absoluto")
        self.set_header(R"|x|", "Valor absoluto", C_TAN, P_TAN)
        self.say("El valor absoluto mide distancia al cero, así que nunca es negativo. Y es una función a tramos: deja igual a los positivos y le quita el signo a los negativos.", fox=True)
        rule = M(R"|x| = \begin{cases} x & x \ge 0 \\ -x & x < 0 \end{cases}", size=42, color=INK).move_to(4.0 * UP)
        self.play(Write(rule))
        plane = get_plane((-4, 4), (-1, 5), 0.85).move_to(0.2 * DOWN)
        ax = plane.axes
        self.play(ShowCreation(plane), run_time=0.8)
        r = curve(ax, lambda x: x, 0, 4, C_TAN)
        l = curve(ax, lambda x: -x, -4, 0, C_SEN)
        self.play(ShowCreation(r))
        self.play(ShowCreation(l))
        pts = VGroup(dot(ax, -3, 3, C_ANG), dot(ax, 3, 3, C_ANG))
        lab = M(R"|-3| = |3| = 3", size=38, color=C_ANG).move_to(3.6 * DOWN)
        self.play(FadeIn(pts, scale=0.5), Write(lab))
        self.say("Las dos rectas forman una V con la punta en el origen. Es una función par: espejo en el eje y.")
        self.hold(0.5)
        self.end_section()


class S04_Doblar(MBScene):
    def construct(self):
        self.mark("Doblar lo negativo")
        self.set_header(R"|g(x)|", "Doblar", C_SEN, P_SEN)
        self.say("¿Y el valor absoluto de una función? Imagina la gráfica dibujada en papel: lo que queda bajo el eje x se dobla hacia arriba, como una hoja.", fox=True)
        plane = get_plane((-3, 3), (-5, 5), 0.85).move_to(1.4 * UP)
        ax = plane.axes
        self.play(ShowCreation(plane), run_time=0.8)
        g = lambda x: x * x - 4
        left = curve(ax, g, -3, -2, C_COS)
        mid = curve(ax, g, -2, 2, C_SEN)
        right = curve(ax, g, 2, 3, C_COS)
        lg = M(R"g(x) = x^2 - 4", size=34, color=C_COS).next_to(plane, DOWN, buff=0.3)
        self.play(ShowCreation(VGroup(left, mid, right)), FadeIn(lg), run_time=1.6)
        shade = Rectangle(width=ax.c2p(3, 0)[0] - ax.c2p(-3, 0)[0], height=ax.c2p(0, 0)[1] - ax.c2p(0, -5)[1])
        shade.set_fill(C_I, 0.12).set_stroke(width=0).move_to(ax.c2p(0, -2.5))
        self.play(FadeIn(shade))
        self.say("Entre menos dos y dos la parábola está bajo el eje: ese trozo es el que se voltea. Lo de afuera ya es positivo y se queda igual.")
        self.mark("Zoom al doblez")
        self.zoom_to(VGroup(mid, Dot(ax.c2p(0, 4.2))), scale=0.55)
        self.play(mid.animate.flip(RIGHT, about_point=ax.c2p(0, 0)).set_stroke(C_TAN), run_time=2)
        self.hold()
        self.zoom_reset()
        lab = M(R"|x^2 - 4|", size=40, color=C_TAN).move_to(3.6 * DOWN)
        self.play(FadeOut(lg), FadeOut(shade), Write(lab))
        self.say("Así queda la gráfica de valor absoluto de x cuadrado menos cuatro: una M con las puntas en menos dos y en dos.")
        self.hold(0.5)
        self.end_section()


class S05_Algebraica(MBScene):
    def construct(self):
        self.mark("Funciones algebraicas")
        self.set_header(R"\sqrt{\;}", "Algebraicas", C_ANG, P_ANG)
        self.say("Una función algebraica se arma con sumas, restas, productos, cocientes y raíces de x. Los polinomios y las racionales son casos particulares.", fox=True)
        ex = VGroup(M(R"\sqrt{x}", size=44, color=C_COS), M(R"\frac{x}{x + 1}", size=44, color=C_SEN), M(R"x\sqrt{x + 3}", size=44, color=C_ANG)).arrange(RIGHT, buff=0.8).move_to(3.6 * UP)
        self.play(LaggedStartMap(FadeIn, ex, shift=0.2 * DOWN, lag_ratio=0.4))
        self.say("Su dominio sale con las reglas de siempre: nada de dividir entre cero ni raíces pares de negativos. Para x por raíz de x más tres, x debe ser mayor o igual que menos tres.")
        plane = get_plane((-4, 2), (-3, 4), 0.9).move_to(0.4 * DOWN)
        ax = plane.axes
        self.play(ShowCreation(plane), run_time=0.8)
        c = curve(ax, lambda x: x * (x + 3) ** 0.5 if x >= -3 else None, -3, 2, C_ANG)
        st = dot(ax, -3, 0, C_ANG)
        self.play(ShowCreation(c), FadeIn(st, scale=0.5), run_time=1.6)
        dl = M(R"D = [-3, \infty)", size=38, color=C_ANG).move_to(4.0 * DOWN)
        self.play(Write(dl))
        self.hold(0.5)
        self.end_section()


class S06_Cierre(TrigCierre):
    recap = [
        ("A tramos", "una fórmula por tramo · primero ubica la x", C_ANG),
        ("Puntos del corte", "lleno: pertenece · vacío: no", C_COS),
        ("Valor absoluto", "|x| = x si x ≥ 0, −x si x < 0", C_TAN),
        ("|g(x)|", "dobla hacia arriba lo que está bajo el eje", C_SEN),
    ]
    recap_say = ("Repasemos: una función a tramos usa una fórmula en cada parte; en los cortes, lleno es incluido y vacío no; "
                 "el valor absoluto es un caso a tramos; y para graficar el valor absoluto de una función se dobla lo negativo.")
    practice = "Ahora: arma tramos,\ndobla lo negativo\ny paga el taxi"
