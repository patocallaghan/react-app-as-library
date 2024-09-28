import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { build } from 'vite'
import path from 'path'

// Custom plugin to build the library during development
function buildLibraryDuringDev() {
  return {
    name: 'build-library-during-dev',
    configureServer(server) {
      const buildLib = async () => {
        await build({
          configFile: false,
          build: {
            lib: {
              entry: 'src/index.ts',
              name: 'ReactAppAsLibrary',
              fileName: (format) => `react-app-as-library.${format}.js`
            },
            rollupOptions: {
              external: ['react', 'react-dom'],
              output: {
                globals: {
                  react: 'React',
                  'react-dom': 'ReactDOM'
                }
              }
            }
          }
        })
      }

      // Initial build
      server.httpServer?.once('listening', buildLib)

      // Watch for file changes and rebuild
      const watcher = server.watcher
      watcher.on('change', async (filePath) => {
        if (filePath.startsWith(path.resolve(__dirname, 'src'))) {
          await buildLib()
        }
      })
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), buildLibraryDuringDev()],
  build: {
    lib: {
      entry: 'src/main.tsx', // Adjust the entry point as needed
      name: 'ReactAppAsLibrary',
      fileName: (format) => `react-app-as-library.${format}.js`
    },
    rollupOptions: {
      // Ensure to externalize deps that shouldn't be bundled into the library
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    }
  }
})
