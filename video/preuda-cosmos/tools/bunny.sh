#!/bin/sh
# Espera la llave de Bunny en ~/.zuka/bunny_key.txt y sube los videos con voz mientras la cola de voz los produce.
cd "$(dirname "$0")/.." || exit 1
K="$HOME/.zuka/bunny_key.txt"
until [ -s "$K" ]; do sleep 15; done
exec ../.venv-audio/Scripts/python.exe -X utf8 tools/bunny.py --watch
