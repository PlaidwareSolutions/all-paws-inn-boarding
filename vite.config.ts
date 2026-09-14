import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'
import { readdirSync } from 'node:fs'

const IGNORED = ['node_modules', 'dist', 'public', 'src', '.git']

/* Each page is a directory holding an index.html, so it is served at a clean extensionless
   URL (/services/dog-boarding/). Adding a page means adding the folder — nothing here
   needs touching. */
const input = Object.fromEntries(
  readdirSync(__dirname, { recursive: true, encoding: 'utf8' })
    .map(f => f.replace(/\\/g, '/'))
    .filter(f => f.endsWith('index.html') && !IGNORED.some(d => f.startsWith(`${d}/`)))
    .map(f => [f === 'index.html' ? 'main' : f.replace(/\/index\.html$/, ''), resolve(__dirname, f)]),
)

export default defineConfig({
  plugins: [react()],
  build: { rollupOptions: { input } },
})
