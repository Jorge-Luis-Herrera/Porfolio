---
description: Deploy the portfolio to Azure Static Web Apps
---

Para realizar un despliegue automatizado (CI/CD) de tu portfolio en Azure, la mejor opción es usar **Azure Static Web Apps**. Aquí tienes los pasos exactos:

### 1. Preparación en GitHub
Asegúrate de que tu código esté en un repositorio de GitHub.

### 2. Creación del Recurso en Azure
1. Ve al [Portal de Azure](https://portal.azure.com).
2. Busca y selecciona **Static Web Apps**.
3. Haz clic en **Create**.
4. Configura los detalles básicos:
   - **Resource Group**: Crea uno nuevo o usa uno existente.
   - **Name**: `portfolio-jorge`.
   - **Plan type**: Free (ideal para portfolios).
   - **Region**: Selecciona una cercana (ej. East US 2).
5. En **Deployment details**, selecciona **GitHub** e inicia sesión.
6. Selecciona tu Organización, Repositorio y la rama `main`.

### 3. Configuración del Build
Azure detectará que es un proyecto Vite/React. Asegúrate de poner estos valores:
- **Build Presets**: `Vite` (o Custom si no aparece).
- **App location**: `/` (donde está el `package.json`).
- **Api location**: (Déjalo vacío si no tienes carpeta de backend integrada).
- **Output location**: `dist` (es la carpeta que genera `npm run build`).

### 4. Automatización con GitHub Actions
Al finalizar el asistente, Azure creará automáticamente un archivo en tu repositorio bajo:
`.github/workflows/azure-static-web-apps-<random-name>.yml`

Este archivo contiene un `deployment_token` secreto que Azure guarda en tus **GitHub Secrets**.

### 5. Verificación
Cada vez que hagas un `git push` a la rama `main`, GitHub Actions:
1. Instalará las dependencias.
2. Correrá `npm run build`.
3. Subirá la carpeta `dist` directamente a Azure.

### Solución de Errores Comunes

#### Error: `RequestDisallowedByAzure`
Si ves este error al crear el recurso, significa que tu suscripción tiene restringida la región seleccionada (ej. East US 2).
- **Solución**: Intenta cambiar la región a **East US**, **West US 2** o **West Europe**. Azure suele limitar las suscripciones gratuitas o de estudiante a regiones específicas para optimizar recursos.

// turbo
### Comandos Útiles para verificar localmente
```bash
npm run build
```
Esto te permite ver antes de subir si hay errores en el empaquetado.