# Parche único (2026-11-20): pasa la plantilla a diseño claro, sin fondos negros. Se deja como registro.
import re, io, os
T = os.path.join(os.path.dirname(__file__), '..', 'tex')
p = os.path.join(T, 'zuka-libro.sty')
s = open(p, encoding='utf8').read()


def between(a, b, new, incl_b=False):
    global s
    i = s.index(a); j = s.index(b, i)
    s = s[:i] + new + s[j:]


# ---- apertura de mundo ----
between(r'\newcommand{\mundo}[4]{%', r'% red de nodos', r'''\newcommand{\mundo}[4]{%
  \cleardoublepage
  \stepcounter{mundo}\setcounter{section}{0}%
  \renewcommand{\zuka@mundoactual}{Mundo \themundo\ · #1}%
  \thispagestyle{vacia}%
  \phantomsection\addcontentsline{toc}{chapter}{\protect\numberline{\themundo}#1}%
  \begin{tikzpicture}[remember picture,overlay]
    \fill[zsoft] (current page.north west) rectangle ([yshift=-96mm]current page.north east);
    % ventana con un trozo del arte de la portada, distinto en cada mundo
    \begin{scope}
      \clip ([xshift=-78mm,yshift=-14mm]current page.north east) [rounded corners=4mm] rectangle ++(64mm,-68mm);
      \pgfmathsetmacro{\zdx}{-40-mod(\themundo*37,90)}\pgfmathsetmacro{\zdy}{60+mod(\themundo*53,150)}
      \node[anchor=north west,inner sep=0] at ([xshift=-78mm+\zdx mm,yshift=-14mm+\zdy mm]current page.north east)
        {\includegraphics[width=300mm]{arte/portada\zuka@num.jpg}};
    \end{scope}
    \draw[zolive,line width=.6pt,rounded corners=4mm] ([xshift=-78mm,yshift=-14mm]current page.north east) rectangle ++(64mm,-68mm);
    \node[anchor=north west,font=\sffamily\firathin\fontsize{64}{64}\selectfont,text=zmoss]
      at ([xshift=17mm,yshift=-16mm]current page.north west) {\two@digits{\themundo}};
    \node[anchor=north west,font=\sffamily\scriptsize\bfseries,text=zolive]
      at ([xshift=19mm,yshift=-44mm]current page.north west) {MUNDO \themundo\ \,·\, EN LA APP: #2};
    \node[anchor=north west,text width=72mm,align=left,font=\sffamily\fontsize{25}{28}\selectfont\firalight,text=zink]
      at ([xshift=18mm,yshift=-50mm]current page.north west) {#1};
    \draw[zlime,line width=2pt] ([xshift=19mm,yshift=-90mm]current page.north west) -- ++(18mm,0);
  \end{tikzpicture}%
  \par\vspace*{82mm}%
  {\large #3\par}\vspace{6mm}%
  \begin{tcolorbox}[enhanced,colback=white,colframe=zline,boxrule=.5pt,arc=3pt,left=5mm,right=5mm,top=3mm,bottom=3mm]
    \kicker{En este mundo}\par\vspace{2pt}
    \begin{itemize}[leftmargin=1.2em,itemsep=3pt]#4\end{itemize}
  \end{tcolorbox}
  \vspace{3mm}
  {\sffamily\small\color{zmute}En la app Zuka este mundo está en \textbf{Preuniversitario UdeA}
   \,›\, \textbf{\zuka@comp}. Cada lección del libro tiene allá su video y sus juegos: lee aquí, juega allá y
   vuelve al taller.\par}
  \immediate\write\zuka@sol{\noexpand\solmun{Mundo \themundo\ · \unexpanded{#1}}}%
}

''')

# ---- reto en claro ----
between(r'\newenvironment{reto}{%', r'\newenvironment{regla}', r'''\newenvironment{reto}{%
  \begin{tcolorbox}[zbase,colback=zlime!13,left=5mm,
    overlay={\fill[zmoss] (frame.north west) rectangle ([xshift=1.4mm]frame.south west);}]
  {\sffamily\scriptsize\bfseries\color{zolive}EL RETO\quad}{\sffamily\scriptsize\color{zmute}se resuelve al final de la lección}\par\vspace{2pt}}
  {\end{tcolorbox}\zuka@poneanalogia}

% analogía de la lección: se define con \analogiade{id}{título}{texto} y sale sola después del reto
\newcommand{\analogiade}[3]{\expandafter\gdef\csname zana@#1\endcsname{\zuka@cajaanalogia{#2}{#3}}}
\newcommand{\zuka@poneanalogia}{\ifcsname zana@\zuka@lid\endcsname\csname zana@\zuka@lid\endcsname
  \expandafter\global\expandafter\let\csname zana@\zuka@lid\endcsname\relax\fi}
\newcommand{\zuka@bombillo}{\begin{tikzpicture}[x=1mm,y=1mm,baseline=1mm]
  \draw[zsun,line width=.8pt,fill=zsun!25] (0,2.1) circle (2.1);
  \draw[zsun,line width=.8pt] (-.9,-.3) -- (.9,-.3) (-.7,-1) -- (.7,-1);
  \foreach \a in {20,55,90,125,160}{\draw[zsun,line width=.6pt] (0,2.1) ++(\a:2.8) -- ++(\a:1.1);}
\end{tikzpicture}}
\newcommand{\zuka@cajaanalogia}[2]{%
  \begin{tcolorbox}[zbase,colback=zsun!7,left=4mm,right=5mm,top=3mm,bottom=3mm,
    overlay={\fill[zsun] (frame.north west) rectangle ([xshift=1mm]frame.south west);}]
  \zuka@bombillo\ \ {\sffamily\scriptsize\bfseries\color{zsun!80!black}LA ANALOGÍA\quad}{\sffamily\small\bfseries\color{zink}#1}\par\vspace{3pt}
  {\itshape #2}\end{tcolorbox}}

''')

# ---- evaluación en claro + cabecera reutilizable ----
between(r'\newcommand{\evaluacion}{%', r'% ---------- índice', r'''\newcommand{\cabecera}[3]{%
  \noindent\begin{tikzpicture}
    \fill[zsoft,rounded corners=3pt] (0,0) rectangle (\linewidth,15mm);
    \fill[zmoss,rounded corners=1pt] (0,0) rectangle (1.6mm,15mm);
    \node[anchor=west,font=\sffamily\scriptsize\bfseries,text=zolive] at (6mm,10mm) {#1};
    \node[anchor=west,font=\sffamily\large\firalight,text=zink] at (6mm,4.6mm) {#2};
    \node[anchor=east,font=\sffamily\scriptsize,text=zmute,align=right] at ([xshift=-5mm]\linewidth,7.5mm) {#3};
  \end{tikzpicture}\par}
\newcommand{\evaluacion}{%
  \clearpage\setcounter{ej}{0}%
  \immediate\write\zuka@sol{\noexpand\solcab{Evaluación del mundo \themundo}}%
  \cabecera{EVALUACIÓN DEL MUNDO \themundo}{\zuka@mundoactual}{Sin calculadora · 1.5 min por pregunta\\Como en el examen de admisión}
  \vspace{4pt}
  {\small\color{zmute}Responde todas antes de mirar las claves. Puntaje: \rule[-1pt]{8mm}{.4pt} de
   \rule[-1pt]{8mm}{.4pt}. Si fallas una, la lección indicada en la clave te dice dónde volver, en el libro y en la app.\par}}

''')

# ---- marca, portada y contraportada en claro ----
between(r'\newcommand{\zuka@cerebro}{%', r'\newcommand{\creditos}', r'''\newcommand{\zuka@cerebro}{% marca: cerebro en malla, a línea fina
  \begin{scope}[line width=.55pt,draw=zolive]
    \coordinate (a) at (0,0);\coordinate (b) at (.55,.35);\coordinate (c) at (1.1,.42);\coordinate (d) at (1.6,.22);
    \coordinate (e) at (1.85,-.25);\coordinate (f) at (1.55,-.7);\coordinate (g) at (1.0,-.82);\coordinate (h) at (.45,-.7);
    \coordinate (i) at (.05,-.42);\coordinate (m1) at (.6,-.2);\coordinate (m2) at (1.15,-.15);\coordinate (m3) at (.95,-.5);
    \draw (a)--(b)--(c)--(d)--(e)--(f)--(g)--(h)--(i)--cycle;
    \draw (a)--(m1)--(b) (m1)--(c)--(m2)--(d) (m2)--(e) (m2)--(f) (m2)--(m3)--(g) (m3)--(h)--(m1)--(i) (m1)--(m3) (m1)--(m2);
    \draw (m3)--(f);
    \foreach \p in {a,b,c,d,e,f,g,h,i,m1,m2,m3}{\fill[zolive] (\p) circle (.035);}
    \fill[zmoss] (m2) circle (.07);
  \end{scope}}

\newcommand{\portada}{%
  \thispagestyle{vacia}%
  \begin{tikzpicture}[remember picture,overlay]
    \node[inner sep=0] at (current page.center) {\includegraphics[width=\paperwidth,height=\paperheight]{arte/portada\zuka@num.jpg}};
    \begin{scope}[shift={([xshift=16mm,yshift=-19mm]current page.north west)},scale=.62]\zuka@cerebro\end{scope}
    \node[anchor=west,font=\sffamily\bfseries\fontsize{15}{15}\selectfont,text=zink]
      at ([xshift=30mm,yshift=-20.2mm]current page.north west) {Z\,U\,K\,A};
    \node[anchor=east,font=\sffamily\scriptsize\bfseries,text=zolive]
      at ([xshift=-16mm,yshift=-20mm]current page.north east) {LIBRO \zuka@num\ DE 4};
    \draw[zink,opacity=.25,line width=.4pt] ([xshift=16mm,yshift=-28mm]current page.north west) -- ([xshift=-16mm,yshift=-28mm]current page.north east);
    \node[anchor=north west,font=\sffamily\small\bfseries,text=zolive]
      at ([xshift=16mm,yshift=-36mm]current page.north west) {PREUNIVERSITARIO UdeA};
    \node[anchor=north west,text width=135mm,align=left,font=\sffamily\fontsize{34}{36}\selectfont\firalight,text=zink]
      at ([xshift=15mm,yshift=-43mm]current page.north west) {\zuka@comp};
    \node[anchor=north west,text width=135mm,align=left,font=\sffamily\fontsize{20}{23}\selectfont\fontseries{sb}\selectfont,text=zolive]
      at ([xshift=16mm,yshift=-60mm]current page.north west) {\zuka@tit};
    \node[anchor=north west,text width=92mm,align=left,font=\sffamily\small,text=zmute]
      at ([xshift=16mm,yshift=-71mm]current page.north west) {\zuka@sub};
    \node[anchor=north east,font=\sffamily\firathin\fontsize{96}{96}\selectfont,text=zolive]
      at ([xshift=-14mm,yshift=-38mm]current page.north east) {\zuka@num};
    \fill[zpaper,opacity=.9] (current page.south west) rectangle ([yshift=27mm]current page.south east);
    \draw[zink,opacity=.25,line width=.4pt] ([xshift=16mm,yshift=27mm]current page.south west) -- ([xshift=-16mm,yshift=27mm]current page.south east);
    \node[anchor=north west,text width=100mm,align=left,font=\sffamily\scriptsize,text=zmute]
      at ([xshift=16mm,yshift=23mm]current page.south west) {\zuka@mundos};
    \node[anchor=north east,align=right,font=\sffamily\scriptsize,text=zmute]
      at ([xshift=-16mm,yshift=23mm]current page.south east) {Teoría · ejemplos resueltos\\talleres · evaluaciones\\{\color{zolive}\bfseries con la app Zuka}};
  \end{tikzpicture}%
  \null\clearpage}

''')
between(r'\newcommand{\contraportada}{%', r'\newcommand{\parte}', r'''\newcommand{\contraportada}{%
  \cleardoublepage\thispagestyle{vacia}%
  \begin{tikzpicture}[remember picture,overlay]
    \fill[zpaper] (current page.south west) rectangle (current page.north east);
    \begin{scope}
      \clip ([xshift=20mm,yshift=-20mm]current page.north west) [rounded corners=4mm] rectangle ++(130mm,-78mm);
      \node[anchor=north west,inner sep=0] at ([xshift=-10mm,yshift=40mm]current page.north west)
        {\includegraphics[width=215mm]{arte/portada\zuka@num.jpg}};
    \end{scope}
    \node[anchor=north west,text width=120mm,align=left,font=\sffamily\fontsize{17}{21}\selectfont\firalight,text=zink]
      at ([xshift=20mm,yshift=-110mm]current page.north west)
      {Lee aquí. Juega allá.\\{\color{zolive}Vuelve al taller.}};
    \node[anchor=north west,text width=115mm,align=left,font=\small,text=zink]
      at ([xshift=20mm,yshift=-132mm]current page.north west)
      {Cuatro libros y una aplicación para preparar la prueba de admisión de la Universidad de Antioquia: dos de
      Razonamiento lógico y dos de Comprensión lectora. Cada lección del libro tiene en Zuka su video y sus juegos;
      el libro va más hondo, con analogías, ejemplos resueltos paso a paso, trampas, atajos y talleres, y cada mundo
      cierra con una evaluación como la del examen.};
    \foreach \n/\t in {1/Número y forma,2/{Orden, lógica y azar},3/Leer lo que dice,4/Leer lo que quiere decir}{%
      \node[anchor=west,font=\sffamily\scriptsize,text=zink] at ([xshift=20mm,yshift=40mm-\n*6mm]current page.south west)
        {{\color{zolive}\bfseries Libro \n}\quad \t};}
    \begin{scope}[shift={([xshift=-38mm,yshift=22mm]current page.south east)},scale=.62]\zuka@cerebro\end{scope}
    \node[anchor=west,font=\sffamily\bfseries\small,text=zink] at ([xshift=-24mm,yshift=22mm]current page.south east) {ZUKA};
  \end{tikzpicture}}

''')
# \creditos quedó entre portada y contraportada: se conserva (between cortó hasta \creditos). Quita motivos viejos si quedaron.
open(p, 'w', encoding='utf8').write(s)

# ---- archivos de contenido: cabeceras oscuras y trazos blancos ----
hdr = re.compile(r'\\noindent\\begin\{tikzpicture\}\s*\\fill\[znight.*?\{(SIMULACRO[^}]*)\};.*?\\firalight,text=white\] at \(5mm,4\.6mm\) \{([^}]*)\};.*?7\.5mm\)\s*\{(.*?)\};\s*\\end\{tikzpicture\}\\par', re.S)
for f in os.listdir(T):
    if not f.endswith('.tex'):
        continue
    q = os.path.join(T, f)
    t = open(q, encoding='utf8').read(); o = t
    t = hdr.sub(lambda m: '\\cabecera{%s}{%s}{%s}' % (m.group(1), m.group(2), m.group(3)), t)
    t = t.replace(r'\draw[white,line width=.6pt]', r'\draw[zink,line width=.6pt]')
    t = t.replace('tick label style={font=\\scriptsize,color=white},axis line style={white}', 'tick label style={font=\\scriptsize,color=zink},axis line style={zink}')
    t = t.replace('every node near coord/.append style={font=\\scriptsize,color=white}', 'every node near coord/.append style={font=\\scriptsize,color=zink}')
    t = t.replace('\\addplot[fill=zlime,draw=none]', '\\addplot[fill=zmoss,draw=none]')
    if f.startswith('comun-'):
        t = t.replace('colback=znight,coltext=white', 'colback=zsoft,coltext=zink')
        t = t.replace('\\color{zlime}', '\\color{zolive}').replace('text=white', 'text=zink').replace('\\color{white!65}', '\\color{zmute}')
        t = t.replace('draw=zlime,circle', 'draw=zolive,circle').replace('\\draw[zice,', '\\draw[zolive,')
    if t != o:
        open(q, 'w', encoding='utf8').write(t); print('cambiado', f)
print('ok')
