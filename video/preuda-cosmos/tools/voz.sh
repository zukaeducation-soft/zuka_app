#!/bin/sh
# Espera la llave de Gemini en ~/.zuka/gemini_key.txt y pone la voz a los videos del Preuniversitario (mundos 2 a 16).
# Si la llave se agota (3) o no sirve (4), prueba sola las de ~/.zuka/gemini_keys.txt (una por renglón) que no haya usado.
# Código de salida: 0 terminó, 3 todas las llaves agotadas, 4 ninguna sirve. Volver a correrlo sigue donde iba.
cd "$(dirname "$0")/.." || exit 1
K="$HOME/.zuka/gemini_key.txt"
LIST="$HOME/.zuka/gemini_keys.txt"
USED="$HOME/.zuka/gemini_keys_usadas.txt"
until [ -s "$K" ]; do sleep 15; done
while :; do
  ../.venv-audio/Scripts/python.exe -X utf8 tools/voz.py "$@"; rc=$?
  [ "$rc" = 3 ] || [ "$rc" = 4 ] || exit "$rc"
  tr -d '\r\n ' < "$K" >> "$USED"; echo >> "$USED"
  next=""
  if [ -s "$LIST" ]; then
    while IFS= read -r k; do
      k=$(printf '%s' "$k" | tr -d '\r ')
      [ -n "$k" ] && ! grep -qxF "$k" "$USED" 2>/dev/null && { next="$k"; break; }
    done < "$LIST"
  fi
  [ -n "$next" ] || exit "$rc"
  printf '%s' "$next" > "$K"
  echo "$(date +%H:%M:%S) cambio de llave: pruebo otra de la lista" >> out/voz/voz.log
done
