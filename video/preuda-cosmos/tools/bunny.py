# Sube a Bunny Stream (biblioteca 811556) los videos con voz del Preuniversitario: Downloads/Zuka_Preuniversitario/<NN>/<nombre>_con_audio.mp4,
# desde el mundo 02. Los deja en la colección «Preuniversitario · Razonamiento», con título «<lección> · <título de la película>».
# Guarda en video/preuda-cosmos/out/voz/bunny.json el ID de cada video y, cuando Bunny termina de codificarlo, su duración (la que
# hay que poner en clip.duration). Un video ya subido no se vuelve a subir.
#
# La llave de la API de Bunny NUNCA va al repositorio: archivo C:\Users\<usuario>\.zuka\bunny_key.txt (la «API Key» de la biblioteca,
# no la de solo lectura).
#   python -X utf8 tools/bunny.py           sube lo que haya listo
#   python -X utf8 tools/bunny.py --watch   sigue subiendo mientras la cola de voz produce videos, y termina cuando ella termina
import json, re, subprocess, sys, time
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
        ok = False
        for intento in range(5):                       # Bunny a veces responde 500 o corta: se reintenta con espera creciente
            try:
                with open(p, 'rb') as f:
                    r = c.put(f'{API}/videos/{e["guid"]}', content=f, headers={'Content-Type': 'application/octet-stream'}, timeout=900)
                if r.status_code < 300: ok = True; break
                log(f'  Bunny respondió {r.status_code}; reintento')
            except httpx.HTTPError as x: log(f'  fallo de red ({type(x).__name__}); reintento')
            time.sleep(30 * (intento + 1))
        if not ok: log(f'  no se pudo subir {p.name}; queda para la próxima vuelta'); continue
        e['uploaded'] = time.strftime('%Y-%m-%d %H:%M'); save(db); n += 1
    return n

CDN = 'https://vz-1a76d229-c83.b-cdn.net'
def hls_length(guid):
    """Duración exacta: suma de los #EXTINF del HLS (la biblioteca pide Referer de la app o de localhost)."""
    h = {'Referer': 'http://localhost:5173/'}
    try:
        top = httpx.get(f'{CDN}/{guid}/playlist.m3u8', headers=h, timeout=30).text
        var = [l.strip() for l in top.splitlines() if l.strip() and not l.startswith('#')]
        sub = var[0] if var else '720p/video.m3u8'
        txt = httpx.get(f'{CDN}/{guid}/{sub}', headers=h, timeout=30).text
        tot = sum(float(m) for m in re.findall(r'#EXTINF:([\d.]+)', txt))
        return round(tot, 2) if tot > 0 else None
    except Exception: return None

def check_lengths(c, db):
    new = 0
    for name, e in db.items():
        if name.startswith('_') or not e.get('uploaded') or e.get('length'): continue
        r = c.get(f'{API}/videos/{e["guid"]}')
        if r.status_code != 200: continue
        j = r.json()
        if j.get('status') == 4 and j.get('length'):
            e['length'] = hls_length(e['guid']) or j['length']; new += 1; log(f'  {name}: codificado, {e["length"]} s')
        elif j.get('status') in (5, 6): log(f'  {name}: Bunny reporta error de codificación (estado {j["status"]})')
    save(db)
    return new

REPO = HERE.parent.parent
def git(*a): return subprocess.run(['git', *a], cwd=REPO, capture_output=True, text=True, encoding='utf8', errors='replace')

def publish():
    """Pone los videos codificados en sus lecciones (js/courses/preuda-videos.js), prueba, sube VERSION y hace commit y push."""
    r = subprocess.run(['node', str(HERE / 'tools' / 'app-videos.js')], cwd=REPO, capture_output=True, text=True, encoding='utf8')
    if r.returncode: log('  app-videos falló:', r.stderr[-400:]); return
    t = subprocess.run(['node', '--test', 'tests/preuda.test.js', 'tests/preuda-videos.test.js', 'tests/registro.test.js', 'tests/acceso.test.js'],
                       cwd=REPO, capture_output=True, text=True, encoding='utf8', errors='replace')
    if t.returncode: log('  las pruebas fallan; no subo a la app:', t.stdout[-600:]); return
    sw = REPO / 'sw.js'; s = sw.read_text(encoding='utf8')
    s = re.sub(r"zuka-v(\d+)", lambda m: f'zuka-v{int(m.group(1)) + 1}', s, count=1); sw.write_text(s, encoding='utf8')
    git('add', 'js/courses/preuda-videos.js', 'sw.js')
    msg = f'Preuniversitario: videos con voz en las lecciones ({r.stdout.strip()})\n\nCo-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>'
    if git('commit', '-q', '-m', msg).returncode == 0:
        for _ in range(3):
            if git('push', '-q', 'origin', 'main').returncode == 0: log(f'  en la app: {r.stdout.strip()}'); break
            time.sleep(20)

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
            try:
                n = upload_ready(c, db)
                if check_lengths(c, db): publish()
            except httpx.HTTPError as x:
                log(f'  fallo hablando con Bunny ({str(x)[:150]}); sigo en un minuto')
            if not watch: break
            if voz_done() and not any(not db.get(p.stem.removesuffix('_con_audio'), {}).get('uploaded') for p in pending()):
                for _ in range(30):                                   # espera a que Bunny termine de codificar los últimos
                    if all(e.get('length') for k, e in db.items() if not k.startswith('_')): break
                    time.sleep(60)
                    if check_lengths(c, db): publish()
                break
            time.sleep(60)
    up = [k for k, e in db.items() if not k.startswith('_') and e.get('uploaded')]
    log(f'TERMINÓ: {len(up)} videos en Bunny.')

if __name__ == '__main__':
    main()
