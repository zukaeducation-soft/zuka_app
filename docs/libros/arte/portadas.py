# Arte de las portadas de los libros de Zuka Preuniversitario (fondo claro, sin negros).
# Uso: python -X utf8 docs/libros/arte/portadas.py [1 2 3 4]   -> docs/libros/tex/arte/portadaN.jpg
# 1: conjunto de Mandelbrot · 2: atractor de Clifford · 3: libro abierto del que salen letras · 4: árbol de letras con raíces
import sys, os, math, random
import numpy as np
from PIL import Image, ImageDraw, ImageFont, ImageFilter

W, H = 2008, 2835            # 170 x 240 mm a 300 ppp
OUT = os.path.join(os.path.dirname(__file__), '..', 'tex', 'arte')
os.makedirs(OUT, exist_ok=True)
PAPER = np.array([250, 250, 244], float)
STOPS = [  # posición, color (papel -> lima -> verde -> azul tinta)
    (0.00, (250, 250, 244)), (0.18, (226, 240, 190)), (0.38, (163, 230, 53)), (0.58, (77, 150, 60)),
    (0.78, (22, 90, 110)), (1.00, (18, 42, 92))]


def ramp(t):
    t = np.clip(t, 0, 1)
    out = np.zeros(t.shape + (3,))
    for (p0, c0), (p1, c1) in zip(STOPS, STOPS[1:]):
        m = (t >= p0) & (t <= p1)
        u = ((t - p0) / (p1 - p0))[m][:, None]
        out[m] = np.array(c0) * (1 - u) + np.array(c1) * u
    return out


def fade_top(img, start=0.30, end=0.52):
    """Deja limpia la parte de arriba (para el título): mezcla con papel."""
    a = np.asarray(img).astype(float)
    y = np.linspace(0, 1, a.shape[0])[:, None, None]
    k = np.clip((y - start) / (end - start), 0, 1) ** 1.5
    return Image.fromarray((PAPER * (1 - k) + a * k).astype(np.uint8))


def save(img, n):
    img.convert('RGB').save(os.path.join(OUT, f'portada{n}.jpg'), quality=93)
    print('portada', n)


def mandelbrot():
    """Conjunto de Julia de c = -0.7269 + 0.1889i, de pie: espirales encadenadas, casi sin interior."""
    w, h = W, H
    c = complex(-0.7269, 0.1889)
    re = np.linspace(-1.62, 1.62, int(h * 0.68))        # eje real a lo alto
    im = np.linspace(-1.02, 1.02, w)                      # eje imaginario a lo ancho
    N = 300
    out = np.zeros((len(re), w))
    for r0 in range(0, len(re), 200):
        R, I = np.meshgrid(re[r0:r0 + 200], im, indexing='ij')
        Z = R + 1j * I
        it = np.full(Z.shape, float(N)); alive = np.ones(Z.shape, bool)
        for i in range(N):
            Z[alive] = Z[alive] ** 2 + c
            esc = alive & (np.abs(Z) > 32)
            it[esc] = i + 1 - np.log2(np.log(np.abs(Z[esc])))
            alive &= ~esc
        out[r0:r0 + 200] = it
    t = np.clip(np.log(out + 1) / np.log(N + 1), 0, 1)
    t = np.clip((t - 0.30) / 0.70, 0, 1) ** 1.25
    art = ramp(t)
    full = np.tile(PAPER, (h, w, 1))
    y0 = h - len(re) - int(h * 0.02)
    full[y0:y0 + len(re)] = art
    return Image.fromarray(full.astype(np.uint8))


def clifford():
    a, b, c, d = -1.7, 1.8, -1.9, -0.4
    n, k = 400000, 60
    rng = np.random.default_rng(7)
    x = rng.uniform(-1, 1, n); y = rng.uniform(-1, 1, n)
    s = 2
    hist = np.zeros((H * s // 2, W * s // 2))
    for i in range(k):
        x, y = np.sin(a * y) + c * np.cos(a * x), np.sin(b * x) + d * np.cos(b * y)
        if i > 8:
            px = ((x + 3.0) / 6.0 * hist.shape[1]).astype(int)
            py = ((y + 2.15) / 4.3 * hist.shape[1] + hist.shape[0] * 0.36).astype(int)
            ok = (px >= 0) & (px < hist.shape[1]) & (py >= 0) & (py < hist.shape[0])
            np.add.at(hist, (py[ok], px[ok]), 1)
    t = np.log1p(hist) / np.log1p(hist.max())
    img = Image.fromarray(ramp(t ** 0.8).astype(np.uint8)).resize((W, H), Image.LANCZOS)
    return img.filter(ImageFilter.GaussianBlur(0.6))


def font(size, italic=False):
    for f in (['palai.ttf', 'georgiai.ttf'] if italic else ['pala.ttf', 'georgia.ttf']):
        try:
            return ImageFont.truetype('C:/Windows/Fonts/' + f, size)
        except OSError:
            pass
    return ImageFont.load_default()


INK, OLIVE, LIME, TEAL = (18, 42, 92), (63, 98, 18), (132, 204, 22), (22, 110, 120)
LETRAS = 'aábcdeéfghiíjklmnñoópqrstuúvxyz¿?¡!;,:«»'


def libro():
    S = 2
    im = Image.new('RGB', (W * S, H * S), tuple(PAPER.astype(int)))
    d = ImageDraw.Draw(im)
    random.seed(11)
    cx, base = W * S // 2, int(H * S * 0.84)
    # hojas del libro abierto: curvas que se abren en abanico
    for side in (-1, 1):
        for i in range(46):
            u = i / 45
            ang = math.radians(8 + 74 * u)
            L = W * S * (0.47 - 0.05 * u)
            pts = []
            for k in range(60):
                v = k / 59
                bend = math.sin(v * math.pi) * (1 - u) * 90 * S
                pts.append((cx + side * (v * L * math.cos(ang) * 1.0), base - v * L * math.sin(ang) * 0.42 - bend * 0.5 + (1 - u) * 60 * S * v))
            col = tuple(int(PAPER[j] * (1 - (0.35 + 0.6 * u)) + INK[j] * (0.35 + 0.6 * u)) for j in range(3))
            d.line(pts, fill=col if i % 5 else OLIVE, width=S * (3 if i % 5 else 5))
    d.line([(cx, base + 30 * S), (cx, base - 120 * S)], fill=INK, width=4 * S)
    # letras que suben en espiral y se dispersan
    for i in range(520):
        u = random.random() ** 0.8
        yy = base - 160 * S - u * H * S * 0.40
        spread = (0.05 + 0.42 * u) * W * S
        xx = cx + math.sin(u * 9 + random.uniform(-0.5, 0.5)) * spread * random.uniform(0.2, 1)
        size = int((26 + 120 * random.random() ** 2.2) * S * (0.5 + 0.7 * u))
        col = random.choice([INK, INK, OLIVE, TEAL, LIME])
        alpha = 1 - 0.75 * u
        col = tuple(int(PAPER[j] * (1 - alpha) + col[j] * alpha) for j in range(3))
        ch = random.choice(LETRAS)
        tile = Image.new('RGBA', (size * 2, size * 2), (0, 0, 0, 0))
        ImageDraw.Draw(tile).text((size // 2, size // 4), ch, font=font(size, random.random() < 0.4), fill=col + (255,))
        tile = tile.rotate(random.uniform(-35, 35) * u, resample=Image.BICUBIC)
        im.paste(tile, (int(xx - size), int(yy - size)), tile)
    return im.resize((W, H), Image.LANCZOS)


def arbol():
    S = 2
    im = Image.new('RGB', (W * S, H * S), tuple(PAPER.astype(int)))
    d = ImageDraw.Draw(im)
    random.seed(5)
    ground = int(H * S * 0.75)
    hojas = []

    def rama(x, y, ang, L, depth, up=True):
        if depth == 0 or L < 14 * S:
            hojas.append((x, y, up))
            return
        x2, y2 = x + L * math.cos(ang), y - L * math.sin(ang)
        col = INK if up else tuple(int(PAPER[j] * 0.45 + TEAL[j] * 0.55) for j in range(3))
        d.line([(x, y), (x2, y2)], fill=col, width=max(S, int(depth * 1.7 * S)))
        n = 2 if random.random() < 0.75 else 3
        for i in range(n):
            da = random.uniform(0.25, 0.62) * (1 if i % 2 else -1) + random.uniform(-0.12, 0.12)
            rama(x2, y2, ang + da, L * random.uniform(0.68, 0.8), depth - 1, up)

    cx = W * S // 2
    rama(cx, ground, math.pi / 2, H * S * 0.086, 10, True)
    for a0 in (-math.pi / 2 - 0.5, -math.pi / 2, -math.pi / 2 + 0.5):
        rama(cx, ground, a0, H * S * 0.045, 8, False)
    # renglón de «texto» en la superficie
    x = int(W * S * 0.08)
    while x < W * S * 0.92:
        w = random.randint(40, 170) * S
        d.line([(x, ground), (min(x + w, int(W * S * 0.92)), ground)], fill=OLIVE, width=5 * S)
        x += w + 26 * S
    for (x, y, up) in hojas:
        if random.random() < (0.55 if up else 0.25):
            size = int(random.uniform(22, 62) * S)
            col = random.choice([OLIVE, LIME, LIME, TEAL, INK]) if up else TEAL
            tile = Image.new('RGBA', (size * 2, size * 2), (0, 0, 0, 0))
            ImageDraw.Draw(tile).text((size // 2, size // 4), random.choice(LETRAS), font=font(size, random.random() < 0.5),
                                      fill=col + (235 if up else 150,))
            tile = tile.rotate(random.uniform(-40, 40), resample=Image.BICUBIC)
            im.paste(tile, (int(x - size), int(y - size)), tile)
    return im.resize((W, H), Image.LANCZOS)


if __name__ == '__main__':
    todo = sys.argv[1:] or ['1', '2', '3', '4']
    for n, f in (('1', mandelbrot), ('2', clifford), ('3', libro), ('4', arbol)):
        if n in todo:
            save(f(), n)
