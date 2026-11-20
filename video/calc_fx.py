"""
Ayudas para los videos de funciones de Cálculo (unidad 2): plano cartesiano con cuadrícula y números,
curvas recortadas a la ventana (se cortan en saltos y donde la función no existe), puntos llenos o
vacíos y tarjetas. Se copia a cada carpeta clase_calc_c5 … c10 (cada clase se renderiza desde la suya).
"""
from trig_scenes import *


def boxed(mob, color=BORDER, fill=PEACH, **kw):
    """Tarjeta con su contenido (get_card solo dibuja el fondo)."""
    return VGroup(get_card(mob, color=color, fill=fill, **kw), mob)


def get_plane(x_range, y_range, unit, numbers=True, step=1, size=20):
    """Plano con cuadrícula entera, ejes y (opcional) números cada `step`."""
    axes = Axes(x_range=(x_range[0], x_range[1], 1), y_range=(y_range[0], y_range[1], 1),
                width=(x_range[1] - x_range[0]) * unit, height=(y_range[1] - y_range[0]) * unit,
                axis_config=dict(stroke_color=MUTED, stroke_width=2, include_tip=False))
    grid = VGroup()
    for x in range(int(x_range[0]), int(x_range[1]) + 1):
        grid.add(Line(axes.c2p(x, y_range[0]), axes.c2p(x, y_range[1])).set_stroke(BORDER, 1))
    for y in range(int(y_range[0]), int(y_range[1]) + 1):
        grid.add(Line(axes.c2p(x_range[0], y), axes.c2p(x_range[1], y)).set_stroke(BORDER, 1))
    labels = VGroup()
    if numbers:
        for x in range(int(x_range[0]) + 1, int(x_range[1])):
            if x != 0 and x % step == 0:
                labels.add(T(str(x).replace("-", "−"), size=size, color=MUTED).next_to(axes.c2p(x, 0), DOWN, buff=0.08))
        for y in range(int(y_range[0]) + 1, int(y_range[1])):
            if y != 0 and y % step == 0:
                labels.add(T(str(y).replace("-", "−"), size=size, color=MUTED).next_to(axes.c2p(0, y), LEFT, buff=0.08))
    plane = VGroup(grid, axes, labels)
    plane.axes = axes
    return plane


def curve(axes, f, a, b, color, width=5, n=240):
    """Gráfica de f entre a y b, partida donde sale de la ventana o no existe."""
    lo, hi = axes.y_range[0], axes.y_range[1]
    pieces, cur = VGroup(), []

    def flush():
        if len(cur) >= 2:
            pieces.add(VMobject().set_points_as_corners(cur).set_stroke(color, width))
        cur.clear()

    prev = None
    for k in range(n + 1):
        x = a + (b - a) * k / n
        try:
            y = f(x)
        except (ValueError, ZeroDivisionError, OverflowError):
            y = None
        if y is None or isinstance(y, complex) or y != y or y < lo - 0.02 or y > hi + 0.02 or (prev is not None and abs(y - prev) > (hi - lo)):
            flush()
            prev = None if y is None or isinstance(y, complex) or y != y else y
            continue
        cur.append(axes.c2p(x, y))
        prev = y
    flush()
    return pieces


def dot(axes, x, y, color, filled=True, r=0.1):
    d = Dot(axes.c2p(x, y), radius=r).set_fill(color if filled else BG_COLOR, 1).set_stroke(color, 3)
    return d


def tag(text, color, size=28):
    """Etiqueta de texto (Text, admite acentos y símbolos)."""
    return T(text, size=size, color=color)
