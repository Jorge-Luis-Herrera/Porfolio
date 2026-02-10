---
description: Deploy the portfolio to GitHub Pages
---

Para desplegar tu porfolio en **GitHub Pages** de forma automática (siempre que hagas `push`), sigue estos pasos:

### 1. Configurar el Repositorio
Asegúrate de que tu repositorio en GitHub sea **Público**. GitHub Pages es gratuito para repositorios públicos.

### 2. Ajustar `vite.config.ts`
Vite necesita saber en qué subcarpeta vivirá tu web. Si tu repo se llama `portafolio-web`, añade la propiedad `base`:

```typescript
export default defineConfig({
  plugins: [react()],
  base: '/portafolio-web/', // Reemplaza con el nombre exacto de tu repo en GitHub
})
```

### 3. Crear el Workflow de Despliegue
Crea un archivo en tu proyecto en la ruta: `.github/workflows/deploy.yml` e inserta este contenido:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: ["master"] # O "main", según como se llame tu rama principal

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build_site:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'
      - name: Install dependencies
        run: npm install
      - name: Build
        run: npm run build
      - name: Upload Artifacts
        uses: actions/upload-pages-artifact@v3
        with:
          path: 'dist/' # Carpeta que genera Vite

  deploy:
    needs: build_site
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy
        id: deployment
        uses: actions/deploy-pages@v4
```

### 4. Activar en GitHub
1. Ve a tu repositorio en GitHub Web.
2. Ve a **Settings (Ajustes)** -> **Pages**.
3. En **Build and deployment** -> **Source**, selecciona **GitHub Actions**.

### 5. Push!
Sube los cambios a GitHub:
```bash
git add .
git commit -m "Add GitHub Pages deployment"
git push
```

GitHub detectará el archivo `.yml` y empezará a construir y publicar tu web automáticamente.
