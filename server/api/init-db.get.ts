import { defineEventHandler } from 'h3'
import { initDB } from '~/server/database/db'

export default defineEventHandler(async () => {
	try {
		await initDB()
		return { success: true, message: 'База данных инициализирована 🛠️' }
	} catch (e) {
		return { success: false, error: (e as Error).message }
	}
})
