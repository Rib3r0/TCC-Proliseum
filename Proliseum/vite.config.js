import { fileURLToPath, URL } from 'node:url'
import vitePluginSingleSpa from 'vite-plugin-single-spa';


import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), vitePluginSingleSpa({
      type: 'root'
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
