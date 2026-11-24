# ALFIN 2026 — Capacitación en Publicación Científica

Plataforma de **LD SmartLab** para capacitar al personal de salud pública de Cuba en publicación científica: normas de citación (Vancouver, APA, MLA y Harvard), ORCID, bases de datos, uso responsable de la IA en investigación y revistas científicas cubanas e internacionales.

## Estructura del proyecto

- Páginas HTML en la raíz: `index.html`, `aprende-publicar.html`, `tipos-articulos.html`, `revistas-cubanas.html`, `revistas-internacionales.html`, `normas-vancouver.html`, `normas-apa.html`, `normas-mla.html`, `normas-harvard.html`, `orcid.html`, `bases-datos.html`, `ia-investigacion.html`, `cursos-ldsmartlab.html`, `galeria.html`, `contacto.html` y `aviso-legal.html`.
- `css/estilos.css`: estilos del sitio.
- `js/app.js`: comportamiento del sitio (navegación, filtros de galería, marcadores de imágenes pendientes).
- `assets/img/`: logo e imágenes del sitio.
- `aprende-a-publicar.pdf`: PDF disponible en la raíz.
- `Estructura ALFIN2026.txt`: estructura planificada del proyecto.

## Cómo verlo en local

Abrir `index.html` en el navegador, o servir el proyecto con:

```bash
python3 -m http.server
```

Y abrir <http://localhost:8000>.

## Qué falta por completar

- Subir los 11 PDF de `docs/` que enlazan las páginas (normas, ORCID, bases de datos, IA, revistas y tipos de artículos). Hoy solo existe `aprende-a-publicar.pdf`, en la raíz.
- Subir el vídeo `assets/video/intro.mp4` (en Inicio y Galería se muestra un aviso mientras tanto).
- Subir las fotos de hero (`assets/img/hero-1.jpg`, `hero-2.jpg`, `hero-3.jpg`), cursos (`assets/img/cursos/`) y galería (`assets/img/galeria/`). Hoy solo existen las versiones SVG de las imágenes hero.
- Eliminar los duplicados SVG/PNG de la raíz, idénticos a sus copias en `assets/img/`.
