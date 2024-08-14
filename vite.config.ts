import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import { wrapperEnv } from './build/getEnv'
import { createProxy } from './build/proxy'
import { createVitePlugins } from './build/plugins'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const viteEnv = wrapperEnv(env)

  return {
    base: viteEnv.VITE_PUBLIC_PATH,
    plugins: createVitePlugins(viteEnv),
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/variables.scss" as *;`,
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      proxy: createProxy(viteEnv.VITE_PROXY),
    },
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : [],
    },
  }
})
