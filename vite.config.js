import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import base44 from "@base44/vite-plugin"
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

function githubPagesSpa() {
  return {
    name: 'github-pages-spa',
    closeBundle() {
      const index = resolve('dist/index.html')
      if (existsSync(index)) {
        copyFileSync(index, resolve('dist/404.html'))
        writeFileSync(resolve('dist/.nojekyll'), '')
      }
    },
  }
}

export default defineConfig(({ command, isPreview }) => {
  const isDev = command === 'serve' && !isPreview
  const pagesBase = process.env.VITE_BASE ?? (isDev ? '/' : '/b2g-global-nexus/')

  return {
    base: pagesBase,
    plugins: [
      base44({
        // Support for legacy code that imports the base44 SDK with @/integrations, @/entities, etc.
        // can be removed if the code has been updated to use the new SDK imports from @base44/sdk
        legacySDKImports: process.env.BASE44_LEGACY_SDK_IMPORTS === 'true',
        hmrNotifier: isDev,
        navigationNotifier: isDev,
        analyticsTracker: false,
        visualEditAgent: false,
      }),
      react(),
      githubPagesSpa(),
    ],
  }
});
