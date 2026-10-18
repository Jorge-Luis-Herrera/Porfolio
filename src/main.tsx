import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource/space-grotesk/latin-500.css'
import '@fontsource/space-grotesk/latin-700.css'
import '@fontsource/inter/latin-400.css'
import '@fontsource/inter/latin-500.css'
import '@fontsource/inter/latin-600.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/great-vibes/latin-400.css'
import './index.css'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'

/*
 * The portfolio always opens on the hero. Two things would otherwise drop the
 * visitor in the middle of the page:
 *   1. browser scroll restoration after a reload;
 *   2. a leftover "#projects" hash written by in-page anchor clicks.
 * Both are neutralised here, before React mounts and before first paint.
 */
if ('scrollRestoration' in window.history) {
  window.history.scrollRestoration = 'manual'
}

if (window.location.hash) {
  window.history.replaceState(null, '', window.location.pathname + window.location.search)
}

const rootElement = document.documentElement
const previousScrollBehavior = rootElement.style.scrollBehavior
rootElement.style.scrollBehavior = 'auto'
window.scrollTo(0, 0)
rootElement.style.scrollBehavior = previousScrollBehavior

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </StrictMode>,
)
