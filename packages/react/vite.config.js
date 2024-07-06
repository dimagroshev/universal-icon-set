import { defineConfig } from 'vite'
import path from 'path'
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react-swc'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/icons/main.js'),
      fileName: 'main',
      formats: ['es']
    }
  }
})
