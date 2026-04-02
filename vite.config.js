import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: './',   // 👈 ADD THIS LINE (VERY IMPORTANT)

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'api': path.resolve(__dirname, './src/api'),
      'assets': path.resolve(__dirname, './src/assets'),
      'components': path.resolve(__dirname, './src/components'),
      'constants': path.resolve(__dirname, './src/constants'),
      'features': path.resolve(__dirname, './src/features'),
      'hooks': path.resolve(__dirname, './src/hooks'),
      'pages': path.resolve(__dirname, './src/pages'),
      'routes': path.resolve(__dirname, './src/routes'),
      'styles': path.resolve(__dirname, './src/styles'),
      'utils': path.resolve(__dirname, './src/utils'),
      'context': path.resolve(__dirname, './src/context'),
    },
  },
})