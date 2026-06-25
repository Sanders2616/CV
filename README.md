# Sandra Aguilar Santos — Portfolio

Sitio personal de Sandra Aguilar Santos (Full Stack Developer, Back-End Developer, AI Orchestrator). Construido con Astro 7, islas de Svelte 5 y Tailwind CSS 4. Estética "dark neumorphism" con acentos rosa/lila y un header con partículas de datos.

---

## Stack

- **Astro 7** — generador de sitio estático, renderiza todo a HTML en build y solo hidrata los componentes interactivos.
- **Svelte 5** — usado únicamente para las piezas con estado/animación (canvas del hero, cursor, texto rotativo). Todo lo demás es Astro puro, sin JS en cliente.
- **Tailwind CSS 4** — vía `@tailwindcss/vite`, configurado con `@theme` en `src/styles/global.css` (sin archivo `tailwind.config.js`, todo vive en CSS).
- **@astrojs/sitemap** — genera `sitemap-index.xml` en cada build.

## Estructura de carpetas

```
curriculum sandra/
├── astro.config.mjs        configuración de Astro: integraciones, site/base para GitHub Pages
├── package.json
├── tsconfig.json
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── data/
│   │   └── content.ts      fuente única de verdad: toda la info real de Sandra (experiencia, stack, contacto, etc.)
│   ├── layouts/
│   │   └── BaseLayout.astro  <head> con SEO (meta, OG, JSON-LD), fuentes, monta el cursor y los scripts globales
│   ├── pages/
│   │   └── index.astro     ensambla todas las secciones en la página única
│   ├── components/
│   │   ├── Header.astro        nav fija + badge de disponibilidad
│   │   ├── Hero.astro          contenedor del hero: texto, CTAs, monta HeroCanvas y RoleCycler
│   │   ├── HeroCanvas.svelte    canvas de partículas/datos cayendo + swarm que sigue al cursor
│   │   ├── RoleCycler.svelte    texto de rol con efecto de máquina de escribir
│   │   ├── Marquee.astro       dos cintas de texto en scroll infinito (roles / stack técnico)
│   │   ├── About.astro         resumen + stats con contador animado
│   │   ├── Experience.astro    timeline de experiencia (Xpertme, NC Tech)
│   │   ├── DataFocus.astro     bloque "Backend & Datos"
│   │   ├── Stack.astro         tech stack, herramientas de IA, design systems
│   │   ├── Education.astro     formación y certificaciones
│   │   ├── Contact.astro       canales de contacto
│   │   ├── Footer.astro
│   │   └── CustomCursor.svelte  cursor personalizado (punto + anillo) para todo el sitio
│   ├── scripts/             JS plano, sin framework, importado desde BaseLayout
│   │   ├── reveal.js           fade-in de elementos `.reveal` al entrar en viewport
│   │   ├── tilt.js             inclinación 3D de las tarjetas `.neu-card` siguiendo el mouse
│   │   ├── magnetic.js          atracción magnética de los botones `.btn` hacia el cursor
│   │   ├── counters.js          animación de conteo en los stats numéricos de About
│   │   └── scroll-progress.js   barra de progreso de scroll fija arriba
│   └── styles/
│       └── global.css      tokens de diseño (`@theme`), utilidades (`.neu-card`, `.neu-pressed`, `.tag`, `.btn`, `.reveal`, `.section-num`)
└── .github/workflows/
    └── deploy.yml           build y deploy automático a GitHub Pages en cada push a main
```

## Contenido: una sola fuente de verdad

Todo el texto del sitio (nombre, experiencia, stack, formación, contacto) vive en `src/data/content.ts`. Ningún componente tiene texto real hardcodeado salvo títulos editoriales de cada sección. Si algo cambia en el CV de Sandra, se actualiza ahí y se refleja en todo el sitio sin tocar componentes.

La fuente original de ese contenido es `sandra_cv_rose_tech.html` (el CV en HTML que ya existía en esta carpeta antes de construir el sitio).

## Sistema de diseño

Definido en `src/styles/global.css` mediante el bloque `@theme` de Tailwind 4:

- **Colores**: `--color-bg` / `--color-bg2` (fondo oscuro grafito-morado en dos tonos para alternar secciones), `--color-accent` / `--color-accent2` / `--color-accent3` (rosa, rosa claro, lila).
- **Tipografía**: Quicksand para títulos, Plus Jakarta Sans para cuerpo y textos destacados, Space Mono reservado solo para micro-labels (fechas, tags, badges).
- **Neumorphism**: las superficies (`.neu-card`, `.neu-pressed`) no usan bordes. La profundidad se logra con una sombra doble (`--neu-light` / `--neu-dark`) que simula que la tarjeta está extruida o hundida del mismo fondo.

## Animación e interacción

Todo lo interactivo respeta `prefers-reduced-motion` (se desactiva o se vuelve instantáneo) y los efectos de cursor/mouse se limitan a dispositivos con puntero fino (`pointer: fine`), así que no interfieren en touch.

- Partículas de datos cayendo en el hero + swarm de orbes que persigue al cursor (`HeroCanvas.svelte`).
- Cursor personalizado en todo el sitio que crece sobre elementos interactivos (`CustomCursor.svelte`).
- Revelado en cascada (`stagger`) de tarjetas y listas al hacer scroll, vía la variable CSS `--reveal-delay`.
- Inclinación 3D y atracción magnética en tarjetas y botones.
- Línea de tiempo de experiencia que se dibuja al entrar en viewport.
- Contadores numéricos animados en los stats.
- Glitch RGB periódico en el nombre del hero.

## Desarrollo

```bash
pnpm install      # instalar dependencias
pnpm dev          # servidor de desarrollo → http://localhost:4321
pnpm build        # build estático → /dist
pnpm preview      # previsualizar el build
```

## Deploy a GitHub Pages

El workflow en `.github/workflows/deploy.yml` construye y publica el sitio en cada push a `main` usando `withastro/action`.

Antes de publicar por primera vez hay que ajustar `astro.config.mjs`:

```js
site: 'https://<usuario>.github.io',   // o el dominio propio si se usa uno
base: '/',                              // '/<repo>/' si es un project site, '/' si es user/root site
```

Pendiente: reemplazar el placeholder actual (`sandra-aguilar.github.io`) por el usuario/repo real de GitHub, y agregar `public/og-image.png` (1200x630) para que las previsualizaciones en redes sociales se vean bien.
