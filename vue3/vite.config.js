import { defineConfig } from 'vite';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig(({ command, mode }) => {
    return {
        resolve: {
            alias: {
                "~": resolve(__dirname, "plugins"),
                "@": resolve(__dirname, "src"),
            },
        },
        server: {
            open: true,
            // host: '0.0.0.0',
            proxy: {
                '^/api': {
                    target: 'http://localhost:8083/'
                }
            },
        },
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData: `
                        @use "@/assets/css/index.scss" as *;
                    `,
                },
            },
        },
        plugins: [
            vue(),
            AutoImport({
                resolvers: [
                    ElementPlusResolver(
                        {
                            importStyle: 'sass',
                        }
                    )
                ],
            }),
            Components({
                extensions: ['vue'],
                include: [/\.vue$/, /\.vue\?vue/],
                resolvers: [
                    ElementPlusResolver({
                        importStyle: 'sass',
                    }),
                ],
                dts: 'src/components.d.ts',
            }),
            ElementPlus({
                useSource: true
            })
        ],
    };
});
