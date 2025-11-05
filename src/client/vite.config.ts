import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(),],    
    build: {
        outDir: "dist",
        emptyOutDir: true,
        rollupOptions: {
            output: {
              assetFileNames: 'assets/[name]-[hash][extname]',
              chunkFileNames: 'assets/[name]-[hash].js',
              entryFileNames: 'assets/[name]-[hash].js',
              manualChunks: {
                vendor: ['react', 'react-dom'],
              },
            },
          },
        
        minify: 'esbuild',
        target: 'esnext',
    },
    server: {
        port: 5173,
        proxy: {
          '/api': {
            target: 'https://localhost:5000',
            changeOrigin: true,
            secure: false,
          },
        },
    },
})
