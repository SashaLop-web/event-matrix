import { defineNuxtConfig } from 'nuxt/config'
import 'dotenv/config'

export default defineNuxtConfig({
	css: ['@/assets/styles/main.scss'],

	vite: {
		ssr: {
			noExternal: ['sqlite3'],
		},
	},

	runtimeConfig: {
		jwtSecret: process.env.JWT_SECRET || 'default_fallback_key',
		public: {
			apiBase: process.env.API_BASE || '/api',
		},
	},

	modules: ['@pinia/nuxt'],
	plugins: ['~/plugins/auth.ts'],

	// 👇 Добавить это
	server: {
		port: process.env.PORT || 3000,
		host: '0.0.0.0',
	},

	nitro: {
		preset: 'node',
	},

	compatibilityDate: '2024-11-01',

	devtools: {
		enabled: true,
	},

	typescript: {
		strict: true,
		shim: false,
	},
})
