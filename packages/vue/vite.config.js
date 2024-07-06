import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url';
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/icons/main.js'),
      fileName: 'main',
      formats: ['es']
    }
  }
})
