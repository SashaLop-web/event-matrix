import { defineEventHandler, readBody } from 'h3'
import { db } from '~/server/database/db' // 🔁 заменили getDB на db

export default defineEventHandler(async event => {
	try {
		const body = await readBody(event)

		if (!body || typeof body !== 'object') {
			throw new Error('Пустое или некорректное тело запроса')
		}

		const { event_id, user_id, status, comment } = body

		if (!event_id || !user_id) {
			throw new Error('Недостаточно данных для создания приглашения')
		}

		// 🔁 убрали getDB
		const [invitationId] = await db('invitations').insert({
			event_id,
			user_id,
			status: status || 'pending',
			comment: comment || null,
		})

		return {
			status: 'success',
			message: 'Приглашение успешно создано',
			invitationId,
		}
	} catch (error: any) {
		console.error('Ошибка создания приглашения:', error.message)
		event.res.statusCode = 400
		return {
			status: 'error',
			message: error.message || 'Ошибка сервера',
		}
	}
})
