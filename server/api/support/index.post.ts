import { db } from '~/server/database/db'
import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async event => {
	const body = await readBody(event)

	if (!body.name || !body.email || !body.message || !body.topic) {
		return {
			statusCode: 400,
			message: 'Все поля обязательны',
		}
	}

	try {
		await db('support_requests').insert({
			name: body.name,
			email: body.email,
			topic: body.topic,
			message: body.message,
			created_at: new Date().toISOString(),
		})

		return { success: true, message: 'Запрос сохранён в базе' }
	} catch (error: any) {
		console.error('Ошибка сохранения в БД:', error.message)
		return { statusCode: 500, message: 'Ошибка при сохранении запроса' }
	}
})
