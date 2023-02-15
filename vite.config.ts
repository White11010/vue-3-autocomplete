// vite.config.js
import path from 'path'
import { defineConfig } from 'vite'
import vue from'@vitejs/plugin-vue'

export default defineConfig({
	server: {
		open: '/demo/index.html',
	},
	build: {
		lib: {
			entry: path.resolve(__dirname, 'src/main.ts'),
			name: 'vue-3-autocomplete',
			fileName: (format) => `vue-3-autocomplete.${format}.js`,
		},
		rollupOptions: {
			external: ['vue'],
			output: {
				globals: {
					vue: 'Vue',
				},
			},
		},
	},
	plugins: [vue()],
})

