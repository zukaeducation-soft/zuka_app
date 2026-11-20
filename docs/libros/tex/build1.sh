#!/bin/sh
# compila un libro: sh build1.sh N  (deja salida/libroN.pdf)
cd "$(dirname "$0")"; mkdir -p salida
n=$1
for i in 1 2; do timeout 600 pdflatex -interaction=nonstopmode -halt-on-error -output-directory=salida libro$n.tex > salida/c$n.txt 2>&1 || { grep -A6 "^!" salida/libro$n.log | head -14; exit 1; }; done
echo "ok: $(pdfinfo salida/libro$n.pdf | grep Pages)  overfull: $(grep -c Overfull salida/libro$n.log)"
