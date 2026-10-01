import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { siteMeta } from './data/site'

// Cookieless, privacy-friendly visit counter. No-op until a code is set in site.ts.
// Skipped on localhost so dev sessions don't pollute the stats.
const code = siteMeta.goatCounterCode
if (code && /^[a-z0-9-]+$/i.test(code) && location.hostname !== 'localhost') {
  const script = document.createElement('script')
  script.async = true
  script.src = 'https://gc.zgo.at/count.js'
  script.dataset.goatcounter = `https://${code}.goatcounter.com/count`
  document.head.appendChild(script)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
