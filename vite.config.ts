import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages cannot send custom response headers, so the CSP is delivered
// as a meta tag. Build-only: the dev server needs inline scripts / websockets.
// goatcounter hosts are allowed for the (optional) cookieless analytics.
const csp = [
  "default-src 'self'",
  "script-src 'self' https://gc.zgo.at",
  "style-src 'self'",
  "img-src 'self' data: https://*.goatcounter.com",
  "connect-src 'self' https://*.goatcounter.com",
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'none'",
].join('; ')

const cspPlugin = () => ({
  name: 'inject-csp',
  apply: 'build' as const,
  transformIndexHtml: () => [
    {
      tag: 'meta',
      attrs: { 'http-equiv': 'Content-Security-Policy', content: csp },
      injectTo: 'head-prepend' as const,
    },
  ],
})

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), cspPlugin()],
  base: '/',
})
