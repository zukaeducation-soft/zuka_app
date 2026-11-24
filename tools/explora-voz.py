# Voz de una explicación Explora con Gemini TTS (spec 2026-11-23-explora-leccion-interactiva, sección «Voz»).
# Uso (desde la raíz del repositorio, con el Python de video/.venv-audio):
#   node tools/explora-frases.js pu-cm-1 > media/voz/pu-cm-1/frases.json
#   video/.venv-audio/Scripts/python.exe -X utf8 tools/explora-voz.py pu-cm-1
# Deja media/voz/<lección>/<clave>.m4a (AAC mono) y voz.json { "<texto en pantalla>": { "f": archivo, "d": segundos } }.
# Los audios no van a GitHub (.gitignore): se suben a Bunny con node tools/subir-voz.js <lección>. Lo ya generado no se vuelve a pedir (la clave sale del
# modelo, la voz y el texto hablado). Llave: GEMINI_API_KEY o ~/.zuka/gemini_key.txt (nunca en el repositorio).
import hashlib, io, json, os, re, subprocess, sys, time
from pathlib import Path
import numpy as np, soundfile as sf

MODEL, VOICE, TEMP = 'gemini-3.8-flash-tts', 'Cruz', 1.45
ROOT = Path(__file__).resolve().parent.parent
KEYFILE = Path.home() / '.zuka' / 'gemini_key.txt'
LISTA, USADAS = Path.home() / '.zuka' / 'gemini_keys.txt', Path.home() / '.zuka' / 'gemini_keys_usadas.txt'

class Agotada(Exception): pass

def otra_llave():
    # Igual que video/preuda-cosmos/tools/voz.sh: la llave agotada pasa a «usadas» y se prueba la siguiente de la lista.
    actual = KEYFILE.read_text(encoding='utf8').strip() if KEYFILE.exists() else ''
    with USADAS.open('a', encoding='utf8') as f: f.write(actual + '\n')
    usadas = {x.strip() for x in USADAS.read_text(encoding='utf8').splitlines()} if USADAS.exists() else set()
    for k in (LISTA.read_text(encoding='utf8').splitlines() if LISTA.exists() else []):
        k = k.strip()
        if k and k not in usadas:
            KEYFILE.write_text(k, encoding='utf8'); print('  cambio de llave: pruebo otra de la lista', flush=True); return True
    return False

def api_key():
    k = os.environ.get('GEMINI_API_KEY', '').strip() or (KEYFILE.read_text(encoding='utf8').strip() if KEYFILE.exists() else '')
    if not k: sys.exit(f'No hay llave: crea {KEYFILE}')
    return k

def tts(client, types, errors, text):
    cfg = types.GenerateContentConfig(temperature=TEMP, response_modalities=['audio'],
        speech_config=types.SpeechConfig(voice_config=types.VoiceConfig(prebuilt_voice_config=types.PrebuiltVoiceConfig(voice_name=VOICE))))
    contents = [types.Content(role='user', parts=[types.Part.from_text(text='## Transcript:\n' + text)])]
    for intento in range(8):
        try:
            data, mime = bytearray(), ''
            for chunk in client.models.generate_content_stream(model=MODEL, contents=contents, config=cfg):
                if chunk.parts is None: continue
                d = chunk.parts[0].inline_data
                if d and d.data: data.extend(d.data); mime = d.mime_type
            if not data: raise RuntimeError('Gemini no devolvió audio')
            if 'wav' in (mime or ''):
                x, r = sf.read(io.BytesIO(bytes(data)), dtype='float32'); return (x if x.ndim == 1 else x.mean(1)), r
            m = re.search(r'rate=(\d+)', mime or '')
            return np.frombuffer(bytes(data), dtype='<i2').astype(np.float32) / 32768, int(m.group(1)) if m else 24000
        except errors.APIError as e:
            code, msg = getattr(e, 'code', 0), str(e)
            if code in (401, 403) or 'API key not valid' in msg: raise Agotada('la llave no sirve: ' + msg[:200])
            if code == 429 or 'RESOURCE_EXHAUSTED' in msg:
                if re.search(r'PerDay|per day|daily|check your plan', msg, re.I): raise Agotada(msg[:200])
                w = re.search(r'retry in ([\d.]+)s', msg); s = float(w.group(1)) + 2 if w else 65
                print(f'  límite por minuto: espero {s:.0f} s', flush=True); time.sleep(s); continue
            if code and code >= 500 and intento < 7:
                s = min(120, 15 * 2 ** intento); print(f'  error {code}; reintento en {s} s', flush=True); time.sleep(s); continue
            raise

def recorta(x, r):
    # Silencio de los bordes fuera (deja 80 ms), para que el ritmo lo marque la frase y no el aire.
    a = np.abs(x); u = max(0.01, a.max() * 0.02); idx = np.where(a > u)[0]
    if len(idx) == 0: return x
    m = int(0.08 * r); return x[max(0, idx[0] - m): min(len(x), idx[-1] + m)]

def parte(x, r, n, palabras):
    # Corta una tanda leída de corrido en sus n frases: los n − 1 silencios más largos (entre frases la voz respira más
    # que en una coma). Devuelve None si algún pedazo no se parece a su frase (segundos por palabra fuera de lo normal):
    # entonces esas frases se piden una por una.
    if n == 1: return [x]
    v = int(0.02 * r); e = np.array([np.sqrt(np.mean(x[k:k + v] ** 2)) for k in range(0, len(x) - v, v)])
    calla = e < max(1e-4, e.max() * 0.03)
    huecos, k = [], 0
    while k < len(calla):
        if calla[k]:
            j = k
            while j < len(calla) and calla[j]: j += 1
            if k > 0 and j < len(calla): huecos.append((j - k, (k + j) // 2))
            k = j
        else: k += 1
    if len(huecos) < n - 1: return None
    cortes = sorted(c for _, c in sorted(huecos, reverse=True)[:n - 1])
    lim = [0] + [c * v for c in cortes] + [len(x)]
    trozos = [x[a:b] for a, b in zip(lim, lim[1:])]
    for t, w in zip(trozos, palabras):
        sp = len(recorta(t, r)) / r / max(1, w)
        if not 0.2 <= sp <= 0.9: return None
    return trozos

def parte_whisper(x, r, tanda):
    # Segundo intento de corte: transcribe la tanda con Whisper (las funciones de video/preuda-cosmos/tools/voz.py) y corta
    # entre la última palabra de una frase y la primera de la siguiente. Devuelve (trozos, frecuencia) o None.
    import importlib.util
    spec = importlib.util.spec_from_file_location('vozpu', ROOT / 'video' / 'preuda-cosmos' / 'tools' / 'voz.py')
    vz = importlib.util.module_from_spec(spec); spec.loader.exec_module(vz)
    x24 = vz.resample(x, r)
    iv, _, _ = vz.split_phrases(x24, [{'text': fr['h']} for fr in tanda], vz.transcribe(x24))
    trozos = [x24[int(a * vz.SR):int(b * vz.SR)] for a, b in iv]
    for t, fr in zip(trozos, tanda):
        sp = len(recorta(t, vz.SR)) / vz.SR / max(1, len(fr['h'].split()))
        if not 0.2 <= sp <= 0.9: return None
    return trozos, vz.SR

def main(lid):
    out = ROOT / 'media' / 'voz' / lid
    out.mkdir(parents=True, exist_ok=True)
    frases = json.loads((out / 'frases.json').read_text(encoding='utf8'))
    man_p = out / 'voz.json'
    man = json.loads(man_p.read_text(encoding='utf8')) if man_p.exists() else {}
    # Si cambió la voz (o el texto), lo viejo sale de la lista de una vez: nunca suenan dos voces en la misma lección.
    claves = {fr['t']: hashlib.sha1(f'{MODEL}|{VOICE}|{TEMP}|{fr["h"]}'.encode()).hexdigest()[:12] + '.m4a' for fr in frases}
    man = {t: v for t, v in man.items() if claves.get(t) == v.get('f')}
    man_p.write_text(json.dumps(man, ensure_ascii=False, indent=1), encoding='utf8')
    from google import genai
    from google.genai import types, errors
    client = genai.Client(api_key=api_key(), http_options={'api_version': 'v1beta'})
    hechas, faltan = set(), []
    for fr in frases:
        fr['clave'] = hashlib.sha1(f'{MODEL}|{VOICE}|{TEMP}|{fr["h"]}'.encode()).hexdigest()[:12]
        f = out / f'{fr["clave"]}.m4a'
        hechas.add(f.name)
        if not (f.exists() and man.get(fr['t'], {}).get('f') == f.name): faltan.append(fr)

    def pide(texto):
        nonlocal client
        while True:
            try: return tts(client, types, errors, texto)
            except Agotada as e:
                print('  ' + str(e)[:160], flush=True)
                if not otra_llave(): sys.exit('Todas las llaves de la lista están agotadas: vuelve a correrlo mañana (sigue donde iba).')
                client = genai.Client(api_key=api_key(), http_options={'api_version': 'v1beta'})

    def guarda(fr, x, r):
        x = recorta(x, r); x = x * (0.9 / (np.abs(x).max() or 1))
        f, wav = out / f'{fr["clave"]}.m4a', out / f'{fr["clave"]}.wav'
        sf.write(wav, x, r, subtype='PCM_16')
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(wav), '-ac', '1', '-c:a', 'aac', '-b:a', '48k', '-movflags', '+faststart', str(f)], check=True)
        wav.unlink()
        man[fr['t']] = {'f': f.name, 'd': round(len(x) / r, 2)}
        man_p.write_text(json.dumps(man, ensure_ascii=False, indent=1), encoding='utf8')   # se guarda a cada paso: se puede seguir donde iba

    # Las cuentas gratuitas permiten pocas llamadas al día: se piden tandas de hasta 10 frases (unas 1000 letras) leídas de
    # corrido, una por párrafo, y se cortan en los silencios. Si el corte no cuadra, esa tanda se pide frase por frase.
    tandas, t = [], []
    for fr in faltan:
        if t and (len(t) == 10 or sum(len(x['h']) for x in t) + len(fr['h']) > 1000): tandas.append(t); t = []
        t.append(fr)
    if t: tandas.append(t)
    for k, tanda in enumerate(tandas, 1):
        print(f'[tanda {k}/{len(tandas)}] {len(tanda)} frases: {tanda[0]["h"][:50]}…', flush=True)
        # El audio de la tanda se guarda: si el corte falla o se acaba la cuota, no hay que volver a pedirlo.
        texto = '\n\n'.join(fr['h'] for fr in tanda)
        tw = out / 'tandas' / (hashlib.sha1(f'{MODEL}|{VOICE}|{TEMP}|{texto}'.encode()).hexdigest()[:12] + '.wav')
        if tw.exists(): x, r = sf.read(tw, dtype='float32'); print('  tanda guardada: no se pide otra vez', flush=True)
        else:
            x, r = pide(texto); tw.parent.mkdir(exist_ok=True); sf.write(tw, x, r, subtype='PCM_16')
        trozos = parte(x, r, len(tanda), [len(fr['h'].split()) for fr in tanda])
        if trozos is None:
            print('  los silencios no alcanzan: corto con Whisper', flush=True)
            w = parte_whisper(x, r, tanda)
            if w: trozos, r = w
        if trozos is None:
            print('  el corte no cuadra: frase por frase', flush=True)
            for fr in tanda: guarda(fr, *pide(fr['h']))
            continue
        for fr, tz in zip(tanda, trozos): guarda(fr, tz, r)
    vivos = {fr['t'] for fr in frases}
    man = {t: v for t, v in man.items() if t in vivos}
    man_p.write_text(json.dumps(man, ensure_ascii=False, indent=1), encoding='utf8')
    for g in out.glob('*.m4a'):
        if g.name not in hechas: g.unlink()   # audios de frases que ya no existen
    print(f'Listo: {len(man)} frases, {sum(v["d"] for v in man.values()):.0f} s de voz en {out}', flush=True)

if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'pu-cm-1')
