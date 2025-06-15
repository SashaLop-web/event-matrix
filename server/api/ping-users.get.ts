import { db } from '~/server/database/db'
import { defineEventHandler } from 'h3'

export default defineEventHandler(async () => {
	try {
		const users = await db.select('*').from('users').limit(5)
		return {
			success: true,
			message: 'Подключение к базе данных успешно 🔌',
			users,
		}
	} catch (error) {
		return {
			success: false,
			error: (error as Error).message,
		}
	}
})
