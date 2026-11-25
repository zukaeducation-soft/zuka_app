# Recorta las páginas de escenas de lectura a lo que ocupan y anota su alto (lo llama escenas.mjs).
import json, os, sys
import pymupdf
b = sys.argv[1]
d = pymupdf.open(b + '.pdf')
j = json.load(open(b + '.json', encoding='utf8'))
for m in j['man']:
    if not m.get('pag'):
        continue
    g = d[m['pag'] - 1]
    if m.get('hj'):
        ys = [x['rect'].y1 for x in g.get_drawings() if x['rect'].y1 < g.rect.height - 2] + [k[3] for k in g.get_text('blocks')]
        g.set_cropbox(pymupdf.Rect(0, 0, g.rect.width, min(g.rect.height, max(ys) + 3)))
    m['w'], m['h'] = round(g.rect.width, 1), round(g.rect.height, 1)
assert len(d) == max(m.get('pag', 0) for m in j['man']), (len(d), 'páginas de más')
d.save(b + '-r.pdf', garbage=3, deflate=True)
d.close()
os.replace(b + '-r.pdf', b + '.pdf')
json.dump(j, open(b + '.json', 'w', encoding='utf8'), ensure_ascii=False)
