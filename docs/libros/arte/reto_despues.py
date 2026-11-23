# Parche único (2026-11-23, pedido del usuario): en cada lección, primero los conceptos y después el reto.
# Saca el bloque reto y el bloque retoresuelto de su lugar y los pone juntos justo antes de \taller.
import os, glob, re
T = os.path.join(os.path.dirname(__file__), '..', 'tex')
B1, E1 = '\\begin{reto}', '\\end{reto}'
B2, E2 = '\\begin{retoresuelto}', '\\end{retoresuelto}'
total = 0
for p in sorted(glob.glob(os.path.join(T, 'l?-*.tex'))):
    s = open(p, encoding='utf8').read()
    parts = re.split(r'(?=\\leccion\{)', s)
    out = []
    for part in parts:
        if not part.startswith('\\leccion{') or B1 not in part:
            out.append(part); continue
        a = part.index(B1); b = part.index(E1, a) + len(E1)
        reto = part[a:b]
        part = part[:a] + part[b:]
        res = ''
        if B2 in part:
            c = part.index(B2); d = part.index(E2, c) + len(E2)
            res = part[c:d]
            part = part[:c] + part[d:]
        t = part.index('\\taller') if '\\taller' in part else part.index('\\bitacora')
        bloque = reto + ('\n\n' + res if res else '') + '\n\n'
        part = part[:t] + bloque + part[t:]
        part = re.sub(r'\n{3,}', '\n\n', part)
        out.append(part); total += 1
    open(p, 'w', encoding='utf8').write(''.join(out))
print('lecciones reordenadas:', total)
