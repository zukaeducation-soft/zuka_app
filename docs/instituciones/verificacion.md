# Verificación del módulo de instituciones (2026-11-25)

Qué se comprobó con material primario, qué falló, qué se corrigió y qué no se puede comprobar todavía.

## 1. Materia prima

| Fuente | Qué se encontró |
|---|---|
| Base real (`uso_diario`, `progreso`, `estado_app`) | 1 estudiante, 2 filas de uso: **14 805 segundos con 0 ejercicios y 0 lecciones**. 0 instituciones. No alcanza para validar ninguna alerta |
| Base real (`lecciones`) | **Desactualizada**: 11 lecciones de Preicfes y la app tiene 97; 9 evaluaciones y la app tiene 73. El portal habría mostrado avances falsos |
| SECOP II, contratos electrónicos ([datos.gov.co jbjy-vk9h](https://www.datos.gov.co/resource/jbjy-vk9h.json)) | 108 contratos de preparación Saber 11 o preuniversitario firmados en 2025 y 2026 (lista en `secop.csv`; búsqueda por palabras: incluye Saber 11/preicfes/preuniversitario y preparación, capacitación, fortalecimiento, simulacro, curso o programa; excluye premios, equipos, transporte e impresión. Otro filtro daría otro número: es una muestra, no un censo) |
| [Decreto 1377 de 2013, art. 12](https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=53646) | Texto leído (hoy art. 2.2.2.25.2.9 del Decreto 1074 de 2015) |
| SIC | No se encontró un concepto sobre plataformas contratadas por colegios. **Sin comprobar** |
| [Supabase](https://supabase.com/pricing.md) · [Bunny Stream](https://bunny.net/pricing/stream/) · [Vercel](https://vercel.com/docs/pricing) | Tarifas públicas. Las facturas propias no se recibieron |
| Lista real de un colegio | No se recibió. Se probó con los formatos que se conocen, no con un archivo real |

## 2. Qué decisión toma cada cifra

| Cifra | Decisión |
|---|---|
| Cupos, libres, días de contrato | registrar más, pedir cupos, renovar |
| Ya entraron | repartir otra vez los códigos |
| Estudiaron (un ejercicio o cinco minutos en un día) | hablar con un grupo o cambiar el horario de uso |
| Minutos por estudiante | igual; solo es útil si mide estudio de verdad (ver 5) |
| Lecciones nuevas | ajustar el ritmo de las metas |
| Actividad por día | ver si se usó el día acordado |
| Necesitan una mano | a quién llamar hoy |
| Grupos y avance por curso | dónde poner apoyo |
| Los que más avanzaron | a quién reconocer |
| Mapa de lecciones | qué repasar en clase |
| Metas | a quién recordar antes de la fecha |

Se quitó del resumen «Aciertos» de toda la institución: mezcla cursos y grados y no lleva a ninguna acción (queda en cada estudiante).

## 3. Alertas

Los umbrales (3 días sin entrar, 7 de ausencia, 50 % de aciertos, mitad del avance de su grupo) **no están validados**. Se corrigió que
compararan con toda la institución: ahora, con su grupo si tiene cinco o más activos.

**Cómo medirlas en el primer piloto** (4 semanas, mínimo 120 estudiantes):
1. Al cierre de la semana 4, cada docente marca en papel, **sin abrir el portal**, quién va mal en el curso.
2. Zuka guarda ese día los avisos del portal.
3. `instMide(avisos, mal, todos)` (`js/instituciones.js`) da precisión, cobertura y su intervalo de Wilson al 95 %.
4. Se repite moviendo `INST_UMBRAL`. **Pasa** si se observa precisión ≥ 0.70 y cobertura ≥ 0.67 **y** el límite inferior de ambos intervalos no baja
   de 0.5. Eso exige unos 30 avisos (21 de 30) y unos 36 estudiantes que de verdad van mal (24 de 36): con 10 avisos, un 70 % observado es
   compatible con 40 % y con 89 %. Si el piloto no alcanza, se informa como no concluyente.
5. Los umbrales que se escojan con un piloto se comprueban **con otro**: calibrar y validar con los mismos datos engaña.

## 4. Permisos, carga y accesibilidad

- **Permisos:** `supabase/tests/instituciones.test.sql` (pgTAP), 65 pruebas con dos colegios; pasan todas. Se rompió la base a propósito de 13
  maneras y las pruebas detectaron las 13. Falta que lo repita **alguien externo**.
- **Carga, 1 000 estudiantes, 60 000 días de uso, 44 333 lecciones:** la consulta tardaba 2.5 a 4.2 s y pesaba 451 KB comprimida; con la migración
  `20261125000002`, 0.8 a 1.0 s y 122 KB (PostgreSQL en WebAssembly, en este equipo). En el servidor real, la pieza más pesada corrió
  unas 3 veces más rápido (240 ms frente a 753 ms). k6 no se corrió: no está instalado y no se carga la base de producción.
- **axe-core 4.10 (WCAG 2.2 AA):** siete vistas del portal en claro y oscuro y la página pública a 1440 y 375 px, más los diálogos de registrar y de meta y la entrada en
  claro. Había contraste insuficiente (hasta 2.53:1) en varias; corregido, 0 avisos. NVDA y personas con lector de pantalla: **sin comprobar**.
- Correrlas: `npm i @electric-sql/pglite@0.3.14` en una carpeta aparte, aplicar `supabase/migrations/` y ejecutar el archivo de pruebas, o
  `supabase test db` si se instala su CLI.

## 5. Tiempo de estudio

La app contaba todo el tiempo a la vista, hubiera o no alguien. Ahora cuenta si hubo un toque o tecla en los últimos tres minutos o corre un
video. Lo anterior a este cambio no es comparable. También cuenta mirar una escena o un video y oír la voz de una explicación; los clips en bucle no.

## 6. Precio

**Costo variable por estudiante (tarifas públicas):** si viera una vez las 57 películas del Preuniversitario, unas 3.2 horas. Con 1 GB por hora
(supuesto; no se pudo medir porque los videos no responden, ver 9), 3.2 GB × 0.045 USD = **0.15 USD**. La base y la web casi no suman. Fijo:
Supabase Pro 25 USD al mes y Vercel Pro según la cuenta. **No incluye** impuestos, soporte, ventas ni producción: son el costo que manda y no
los conocemos.

| Precio al estudiante (Preuniversitario, 6 meses) | COP |
|---|---|
| Base | 139 900 |
| −10 % (30) | 125 900 |
| −20 % (100) | 111 900 |
| −30 % (300) | 97 900 |

**Lo que paga el sector público (SECOP II):** mediana 29.0 millones por contrato; la mitad entre 15.0 y 51.0. Casi ninguno dice cuántos
estudiantes. Los dos que sí:
- Jardín (Antioquia), 2025: 15 000 000 por 80 estudiantes en el **Preuniversitario Virtual de la UdeA** = **187 500 por estudiante**
  (CO1.PCCNTR.7893767). Es el competidor directo.
- Copacabana, 2023 (fuera de la lista, es anterior): 290 000 000 por 800 = 362 500 (CO1.PCCNTR.5167617); incluye más servicios.

Lectura: el precio base está por debajo del único comparable directo, así que **un 30 % de descuento no se justifica con estos datos**. Y casi
toda la demanda es **Saber 11**, justo el curso (Preicfes) que en Zuka no tiene precio.

**Encuesta Van Westendorp** (rectores y coordinadores, mínimo 30; no a quienes ya cotizaron). Mostrar 3 minutos del portal de ejemplo y preguntar,
por estudiante y por 6 meses: ¿a qué precio sería tan barato que dudarías de la calidad?, ¿a qué precio sería una buena compra?, ¿a qué precio
empezaría a parecer caro, pero lo pensarías?, ¿a qué precio sería tan caro que no lo comprarías? Más: número de estudiantes, público o privado,
qué pagan hoy y quién firma. Se cruzan las cuatro curvas acumuladas. Con menos de 30 respuestas, solo orienta.

## 7. Prueba de uso con cinco gestores

Cinco personas que no conozcan Zuka (dos coordinadores, dos docentes, una secretaria), una por una, con su computador, sin ayuda. Cronómetro y
grabación con permiso. Cuenta de prueba en un colegio de prueba; la lista de 30 nombres la lleva en **su** formato.
1. «Entra con este código y registra a tus estudiantes.»
2. «Reparte los códigos de 11A.»
3. «Es lunes. Dime a quién llamarías hoy y por qué.»
4. «¿Qué lección repasarías en clase?»
5. «Pon una meta para 11A antes del viernes.»
6. «Se retiró Juan y llegó Ana.»

Anotar: termina o no, minutos, dónde duda, qué palabra no entiende. **Pasa** si cuatro de cinco hacen 1 y 3 sin ayuda en menos de 10 minutos.

## 8. Datos de menores (para el abogado)

El artículo 12 pide que autorice el **representante legal** y que antes se **escuche al menor**. El texto del registro decía solo «acudientes»:
se corrigió. Con la migración `20261125000002` la base exige confirmarlo y guarda en cada estudiante quién lo hizo y cuándo. Queda por resolver con un abogado:
- No hay **política de tratamiento** ni aviso de privacidad publicados (arts. 13 y 14).
- Quién es responsable y quién encargado, y el contrato de transmisión de datos con el colegio.
- Modelo de autorización del representante y constancia de haber oído al estudiante.
- Supabase y Bunny están fuera del país: transferencia o transmisión internacional.
- Hasta cuándo se guardan los datos de un retirado.

## 9. Resultado

| Criterio | Estado |
|---|---|
| Cuatro de cinco gestores en 10 minutos | sin comprobar: faltan personas |
| Alertas ≥ 70 % y sin perder más de un tercio | sin comprobar: no hay datos |
| Cero lecturas cruzadas | pasa aquí; falta el tercero externo |
| Panel < 2 s con 1 000 | pasa en la medición local; falta con red y servidor reales, y aplicar la migración 2 |
| Lista real sin daños | falla corregida con formatos conocidos (apellidos y nombres separados se dañaban); falta el archivo real |
| Abogado | sin comprobar |

**Fuera del módulo, urgente:** el 2026-11-25 los dos servidores de video de Bunny Stream respondían 403 «Domain suspended or not configured».
