# Portfolio Web

Frontend construido con `React + Vite` y desplegado en `GitHub Pages`.

## Desarrollo local

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview
```

## Deploy automático

El deploy se realiza con GitHub Actions usando:

- Workflow: `.github/workflows/deploy-portfolio.yml`
- Rama de trigger: `master`
- Carpeta publicada: `portafolio-web/dist`

Cada push a `master` que cambie `portafolio-web/**` dispara el despliegue.

## URL esperada

Con tu configuración actual (`base: '/Porfolio/'`), la URL final es:

`https://jorge-luis-herrera.github.io/Porfolio/`
