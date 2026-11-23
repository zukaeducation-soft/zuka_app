# Hoja de contacto de páginas que contienen un texto. Uso:
#   python -X utf8 docs/libros/arte/ver_paginas.py libro3 "Tu mapa del texto" [cuántas=2] [dpi=55] [salida=rev.png]
import subprocess, sys, os, glob
from PIL import Image
D = os.path.join(os.path.dirname(__file__), '..', 'tex', 'salida')
libro, needle = sys.argv[1], sys.argv[2]
n = int(sys.argv[3]) if len(sys.argv) > 3 else 2
dpi = sys.argv[4] if len(sys.argv) > 4 else '55'
out = sys.argv[5] if len(sys.argv) > 5 else 'rev.png'
pdf = os.path.join(D, libro + '.pdf')
raw = subprocess.run(['pdftotext', '-layout', '-enc', 'UTF-8', pdf, '-'], capture_output=True).stdout.decode('utf8', 'replace')
pages = [i + 1 for i, p in enumerate(raw.split('\f')) if needle.lower() in p.lower()]
print('páginas:', pages[:12])
for f in glob.glob(os.path.join(D, 'vp-*.png')):
    os.remove(f)
p0 = pages[0]
subprocess.run(['pdftoppm', '-r', dpi, '-png', '-f', str(p0), '-l', str(p0 + n - 1), pdf, os.path.join(D, 'vp')])
ims = [Image.open(f) for f in sorted(glob.glob(os.path.join(D, 'vp-*.png')))]
w, h = ims[0].size
s = Image.new('RGB', (w * len(ims) + 10 * (len(ims) - 1), h), 'white')
for k, im in enumerate(ims):
    s.paste(im, (k * (w + 10), 0))
s.save(os.path.join(D, out))
