#!/bin/sh
# Espera la llave de Gemini en ~/.zuka/gemini_key.txt y pone la voz a los videos del Preuniversitario (mundos 2 a 16).
# Código de salida: 0 terminó, 3 llave agotada, 4 llave inválida. Volver a correrlo sigue donde iba.
cd "$(dirname "$0")/.." || exit 1
K="$HOME/.zuka/gemini_key.txt"
until [ -s "$K" ]; do sleep 15; done
exec ../.venv-audio/Scripts/python.exe -X utf8 tools/voz.py "$@"
