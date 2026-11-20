# Sube a Bunny Stream (biblioteca 811556) los videos con voz del Preuniversitario: Downloads/Zuka_Preuniversitario/<NN>/<nombre>_con_audio.mp4,
# desde el mundo 02. Los deja en la colección «Preuniversitario · Razonamiento», con título «<lección> · <título de la película>».
# Guarda en video/preuda-cosmos/out/voz/bunny.json el ID de cada video y, cuando Bunny termina de codificarlo, su duración (la que
# hay que poner en clip.duration). Un video ya subido no se vuelve a subir.
#
# La llave de la API de Bunny NUNCA va al repositorio: archivo C:\Users\<usuario>\.zuka\bunny_key.txt (la «API Key» de la biblioteca,
# no la de solo lectura).
#   python -X utf8 tools/bunny.py           sube lo que haya listo
#   python -X utf8 tools/bunny.py --watch   sigue subiendo mientras la cola de voz produce videos, y termina cuando ella termina
import json, re, sys, time
from pathlib import Path
import httpx

HOME = Path.home()
SRC = HOME / 'Downloads' / 'Zuka_Preuniversitario'
HERE = Path(__file__).resolve().parent.parent
DB = HERE / 'out' / 'voz' / 'bunny.json'
VOZLOG = HERE / 'out' / 'voz' / 'voz.log'
KEYFILE = HOME / '.zuka' / 'bunny_key.txt'
LIB = 811556
API = f'https://video.bunnycdn.com/library/{LIB}'
COLLECTION = 'Preuniversitario · Razonamiento'

def log(*a):
    msg = time.strftime('%H:%M:%S ') + ' '.join(str(x) for x in a)
    print(msg, flush=True)
    with open(HERE / 'out' / 'voz' / 'bunny.log', 'a', encoding='utf8') as f: f.write(msg + '\n')

def key():
    k = KEYFILE.read_text(encoding='utf8').strip() if KEYFILE.exists() else ''
    if not k: sys.exit(f'Falta la llave de Bunny en {KEYFILE}')
    return k

def load(): return json.loads(DB.read_text(encoding='utf8')) if DB.exists() else {}
def save(d): DB.write_text(json.dumps(d, ensure_ascii=False, indent=1), encoding='utf8')

def film_info(name):
    f = HERE / 'films' / f'{name}.data.js'
    if not f.exists(): return '', name
    s = f.read_text(encoding='utf8')
    les = re.search(r"LESSON: '([^']+)'", s); tit = re.search(r"TITLE = '([^']+)'", s)
    return (les.group(1) if les else ''), (tit.group(1).capitalize() if tit else name)

def collection(c, db):
    if db.get('_collection'): return db['_collection']
    r = c.get(f'{API}/collections', params={'search': COLLECTION, 'itemsPerPage': 100}); r.raise_for_status()
    hit = [x for x in r.json().get('items', []) if x.get('name') == COLLECTION]
    guid = hit[0]['guid'] if hit else c.post(f'{API}/collections', json={'name': COLLECTION}).raise_for_status().json()['guid']
    db['_collection'] = guid; save(db); return guid

def pending():
    return sorted(p for d in sorted(SRC.iterdir()) if d.is_dir() and d.name[:2].isdigit() and int(d.name[:2]) >= 2
                  for p in d.glob('*_con_audio.mp4'))

def upload_ready(c, db):
    col, n = collection(c, db), 0
    for p in pending():
        name = p.stem.removesuffix('_con_audio')
        if db.get(name, {}).get('uploaded'): continue
        if time.time() - p.stat().st_mtime < 20: continue          # todavía se está escribiendo
        lesson, title = film_info(name)
        e = db.get(name) or {}
        if not e.get('guid'):
            r = c.post(f'{API}/videos', json={'title': f'{lesson} · {title}' if lesson else title, 'collectionId': col}); r.raise_for_status()
            e = {'guid': r.json()['guid'], 'lesson': lesson, 'world': p.parent.name, 'file': p.name}; db[name] = e; save(db)
        log(f'subo {p.parent.name}/{p.name} ({p.stat().st_size / 1e6:.1f} MB) → {e["guid"]}')
        with open(p, 'rb') as f:
            r = c.put(f'{API}/videos/{e["guid"]}', content=f, headers={'Content-Type': 'application/octet-stream'}, timeout=900)
        r.raise_for_status()
        e['uploaded'] = time.strftime('%Y-%m-%d %H:%M'); save(db); n += 1
    return n

def check_lengths(c, db):
    for name, e in db.items():
        if name.startswith('_') or not e.get('uploaded') or e.get('length'): continue
        r = c.get(f'{API}/videos/{e["guid"]}')
        if r.status_code != 200: continue
        j = r.json()
        if j.get('status') == 4 and j.get('length'): e['length'] = j['length']; log(f'  {name}: codificado, {j["length"]} s')
        elif j.get('status') in (5, 6): log(f'  {name}: Bunny reporta error de codificación (estado {j["status"]})')
    save(db)

def voz_done():
    if not VOZLOG.exists(): return False
    last = VOZLOG.read_text(encoding='utf8').strip().split('\n')[-1]
    return 'TERMINÓ' in last or 'LLAVE' in last

def main():
    watch = '--watch' in sys.argv
    with httpx.Client(headers={'AccessKey': key(), 'accept': 'application/json'}, timeout=60) as c:
        r = c.get(f'{API}/collections', params={'itemsPerPage': 1})
        if r.status_code in (401, 403): sys.exit('La llave de Bunny no sirve (401/403): revisa que sea la «API Key» de la biblioteca 811556.')
        db = load()
        while True:
            n = upload_ready(c, db); check_lengths(c, db)
            if not watch: break
            if voz_done() and not any(not db.get(p.stem.removesuffix('_con_audio'), {}).get('uploaded') for p in pending()):
                for _ in range(20):                                   # espera a que Bunny termine de codificar los últimos
                    if all(e.get('length') for k, e in db.items() if not k.startswith('_')): break
                    time.sleep(60); check_lengths(c, db)
                break
            time.sleep(60)
    up = [k for k, e in db.items() if not k.startswith('_') and e.get('uploaded')]
    log(f'TERMINÓ: {len(up)} videos en Bunny.')

if __name__ == '__main__':
    main()
