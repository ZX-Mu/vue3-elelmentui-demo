import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const pathSrc = path.resolve(__dirname, 'src')

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) =>{
    const env = loadEnv(mode, process.cwd(), '')

    return {
        plugins: [
            vue(),
            vueJsx(),
            VueDevTools(),
            AutoImport({
                dts: path.resolve(pathSrc, 'types', 'auto-imports.d.ts'),
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [
                    ElementPlusResolver({
                        importStyle: 'sass',
                    }),
                ],
                dts: path.resolve(pathSrc, 'types', 'components.d.ts'),
            }),
        ],
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
            port: Number(env.VITE_APP_PORT),
            proxy: {
                [env.VITE_APP_BASE_API]: {
                    target: env.VITE_APP_API_URL,
                    rewrite: (path) => path.replace(new RegExp("^" + env.VITE_APP_BASE_API), ""),
                }
            }
        }
    }
})
