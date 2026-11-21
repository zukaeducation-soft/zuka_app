# Califica una ronda del estudiante simulado. Uso: python -X utf8 docs/evaluacion-curso/calificar.py A 1
import json, os, sys
D = os.path.dirname(__file__)
forma, ronda = sys.argv[1], sys.argv[2]
clave = {c['n']: c for c in json.load(open(os.path.join(D, 'claves', f'clave-{forma}.json'), encoding='utf8'))}
tot = {}
fallos = []
for comp in ('rl', 'cl'):
    resp = json.load(open(os.path.join(D, 'respuestas', f'ronda{ronda}-{comp}.json'), encoding='utf8'))
    ok = 0; cob = {'completa': 0, 'parcial': 0, 'ninguna': 0}
    for r in resp:
        c = clave[r['n']]
        cob[r.get('cobertura', 'ninguna')] = cob.get(r.get('cobertura', 'ninguna'), 0) + 1
        if r['respuesta'] == c['respuesta']:
            ok += 1
        else:
            fallos.append((r['n'], comp, c['tema'], c.get('habilidad', ''), r['respuesta'], c['respuesta'], r.get('cobertura'), r.get('leccion'), r.get('falto', '')))
    tot[comp] = (ok, len(resp), cob)
for comp, (ok, n, cob) in tot.items():
    print(f"{comp.upper()}: {ok}/{n} = {100*ok/n:.0f} %   cobertura {cob}")
ok = sum(t[0] for t in tot.values()); n = sum(t[1] for t in tot.values())
print(f"TOTAL: {ok}/{n} = {100*ok/n:.0f} %")
print('\nFALLOS')
for f in fallos:
    print(f"  P{f[0]} [{f[1]}] {f[2]} / {f[3]}: respondió {f[4]}, era {f[5]} · cobertura {f[6]} · {f[7]} · {f[8][:160]}")
out = os.path.join(D, 'respuestas', f'ronda{ronda}-resultado.json')
json.dump({'forma': forma, 'ronda': ronda, 'totales': {k: {'aciertos': v[0], 'preguntas': v[1], 'cobertura': v[2]} for k, v in tot.items()},
           'fallos': [dict(zip(('n', 'comp', 'tema', 'habilidad', 'respondio', 'correcta', 'cobertura', 'leccion', 'falto'), f)) for f in fallos]},
          open(out, 'w', encoding='utf8'), ensure_ascii=False, indent=1)
