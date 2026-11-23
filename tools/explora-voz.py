# Voz de una explicación Explora con Gemini TTS (spec 2026-11-23-explora-leccion-interactiva, sección «Voz»).
# Uso (desde la raíz del repositorio, con el Python de video/.venv-audio):
#   node tools/explora-frases.js pu-cm-1 > media/voz/pu-cm-1/frases.json
#   video/.venv-audio/Scripts/python.exe -X utf8 tools/explora-voz.py pu-cm-1
# Deja media/voz/<lección>/<clave>.m4a (AAC mono) y voz.json { "<texto en pantalla>": { "f": archivo, "d": segundos } }.
# Los audios no van a GitHub (.gitignore): hay que alojarlos aparte. Lo ya generado no se vuelve a pedir (la clave sale del
# modelo, la voz y el texto hablado). Llave: GEMINI_API_KEY o ~/.zuka/gemini_key.txt (nunca en el repositorio).
import hashlib, io, json, os, re, subprocess, sys, time
from pathlib import Path
import numpy as np, soundfile as sf

MODEL, VOICE, TEMP = 'gemini-3.8-flash-tts', 'Nika', 1.0
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

def main(lid):
    out = ROOT / 'media' / 'voz' / lid
    out.mkdir(parents=True, exist_ok=True)
    frases = json.loads((out / 'frases.json').read_text(encoding='utf8'))
    man_p = out / 'voz.json'
    man = json.loads(man_p.read_text(encoding='utf8')) if man_p.exists() else {}
    from google import genai
    from google.genai import types, errors
    client = genai.Client(api_key=api_key(), http_options={'api_version': 'v1beta'})
    hechas = set()
    for n, fr in enumerate(frases, 1):
        clave = hashlib.sha1(f'{MODEL}|{VOICE}|{TEMP}|{fr["h"]}'.encode()).hexdigest()[:12]
        f = out / f'{clave}.m4a'
        hechas.add(f.name)
        if f.exists() and man.get(fr['t'], {}).get('f') == f.name: continue
        print(f'[{n}/{len(frases)}] {fr["h"][:70]}', flush=True)
        while True:
            try: x, r = tts(client, types, errors, fr['h']); break
            except Agotada as e:
                print('  ' + str(e)[:160], flush=True)
                if not otra_llave(): sys.exit('Todas las llaves de la lista están agotadas: vuelve a correrlo mañana (sigue donde iba).')
                client = genai.Client(api_key=api_key(), http_options={'api_version': 'v1beta'})
        x = recorta(x, r); x = x * (0.9 / (np.abs(x).max() or 1))
        wav = out / f'{clave}.wav'
        sf.write(wav, x, r, subtype='PCM_16')
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', str(wav), '-ac', '1', '-c:a', 'aac', '-b:a', '48k', '-movflags', '+faststart', str(f)], check=True)
        wav.unlink()
        man[fr['t']] = {'f': f.name, 'd': round(len(x) / r, 2)}
        man_p.write_text(json.dumps(man, ensure_ascii=False, indent=1), encoding='utf8')   # se guarda a cada paso: se puede seguir donde iba
    vivos = {fr['t'] for fr in frases}
    man = {t: v for t, v in man.items() if t in vivos}
    man_p.write_text(json.dumps(man, ensure_ascii=False, indent=1), encoding='utf8')
    for g in out.glob('*.m4a'):
        if g.name not in hechas: g.unlink()   # audios de frases que ya no existen
    print(f'Listo: {len(man)} frases, {sum(v["d"] for v in man.values()):.0f} s de voz en {out}', flush=True)

if __name__ == '__main__':
    main(sys.argv[1] if len(sys.argv) > 1 else 'pu-cm-1')
