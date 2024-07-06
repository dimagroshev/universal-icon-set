import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url';
import vue2 from '@vitejs/plugin-vue2'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue2()
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/icons/main.js'),
      fileName: 'main',
      formats: ['es']
    },
  },
})
