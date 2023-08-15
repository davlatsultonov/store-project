import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig(({ command, mode, ssrBuild }) => {
  const isProduction = mode === 'production';

  return {
    plugins: [react()],
    base: isProduction ? '/store-project/' : '',
  }
});