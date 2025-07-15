import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  // Ya no necesitamos una base porque todo se sirve desde la raíz
  base: '/', 
  build: {
    rollupOptions: {
      input: {
        // Define los dos archivos HTML como puntos de entrada
        main: resolve(__dirname, 'index.html'),
        asistente: resolve(__dirname, 'asistente.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.'),
    }
  }
});