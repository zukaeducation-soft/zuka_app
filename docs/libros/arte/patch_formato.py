# Parche único (2026-11-23): libros en A4 con márgenes de 2 cm (diseño de los resúmenes) y capa «aprender haciendo».
import os
T = os.path.join(os.path.dirname(__file__), '..', 'tex')
p = os.path.join(T, 'zuka-libro.sty')
s = open(p, encoding='utf8').read()
a = s.index('\\RequirePackage[paperwidth=170mm')
b = s.index(']{geometry}', a) + len(']{geometry}')
s = s[:a] + ('\\RequirePackage[a4paper,inner=20mm,outer=20mm,top=24mm,bottom=22mm,marginparwidth=0mm,marginparsep=0mm,'
             'headheight=14pt,headsep=7mm,footskip=10mm]{geometry}') + s[b:]
if '\\input{zuka-hacer}' not in s:
    s = s.rstrip('\n') + '\n\\input{zuka-hacer}\n'
open(p, 'w', encoding='utf8').write(s)
for n in (1, 2, 3, 4):
    q = os.path.join(T, f'libro{n}.tex')
    t = open(q, encoding='utf8').read().replace('[10pt,twoside', '[11pt,twoside')
    open(q, 'w', encoding='utf8').write(t)
print('ok')
