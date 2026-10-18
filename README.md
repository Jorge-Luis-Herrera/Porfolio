# Portafolio — Jorge Luis Herrera

Portafolio personal de software: proyectos reales de GitHub, habilidades y contacto.
Construido con **React 19 + TypeScript + Vite + Tailwind CSS + Framer Motion**.

## Estructura

```
src/
├── components/
│   ├── sections/     # Hero, Proyectos, Habilidades, Sobre mí, Contacto
│   └── ui/           # Navbar (con drawer móvil)
├── context/          # ThemeContext (dark/light) y LanguageContext (ES/EN)
├── data/projects.ts  # Fuente única de los proyectos del portafolio
└── index.css         # Design tokens (colores, tipografía, componentes)
public/
├── cv.html / cv-en.html               # Hojas de vida
├── cover-letter.html / -en.html       # Cartas de presentación
└── favicon.svg, og-image.jpg          # Identidad y previsualización social
```

## Desarrollo local

```bash
npm install
npm run dev        # servidor de desarrollo
npm run build      # build de producción (tsc -b && vite build)
npm run lint       # ESLint
npm run preview    # previsualizar el build
```

## Temas e idioma

- **Tema**: oscuro por defecto, con toggle a claro. Se guarda en `localStorage` y se
  aplica antes del primer paint para evitar parpadeo.
- **Idioma**: español por defecto, toggle a inglés. Actualiza `document.lang`.
- Todos los textos viven en `src/context/LanguageContext.tsx`; los proyectos en
  `src/data/projects.ts`.

## Cómo añadir un proyecto

Edita `src/data/projects.ts` y añade una entrada:

```ts
{
  id: 'mi-proyecto',
  category: 'featured', // featured | backend | automation | academic
  title: 'Mi Proyecto',
  description: { es: '...', en: '...' },
  tech: ['React', 'Node.js'],
  repo: 'https://github.com/Jorge-Luis-Herrera/mi-proyecto',
  liveLink: 'https://opcional.com', // solo si está en línea
}
```

## Despliegue

Ambos canales están configurados sobre la rama `master`:

- **GitHub Pages** — `.github/workflows/deploy.yml` publica el build en
  `https://jorge-luis-herrera.github.io/Porfolio/`.
- **Azure Static Web Apps** — workflow generado por Azure con `dist/` como output y
  `package.json` en la raíz. Guía: `.agent/workflows/azure-deploy.md`.

> Recuerda: `vite.config.ts` define `base: '/Porfolio/'` para Pages. Si el nombre del
> repositorio cambia, actualiza ese valor.
