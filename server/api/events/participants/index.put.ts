import { defineEventHandler, readBody } from 'h3'
import { db } from '~/server/database/db' // 🔁 заменили getDB на db

export default defineEventHandler(async event => {
	try {
		const id = event.context.params?.id
		if (!id) {
			throw new Error('ID приглашения не указан')
		}

		const body = await readBody(event)

		if (!body || typeof body !== 'object') {
			throw new Error('Пустое или некорректное тело запроса')
		}

		const { status } = body

		if (!status || !['accepted', 'declined'].includes(status)) {
			throw new Error('Недопустимый статус приглашения')
		}

		// 🔁 заменили getDB на прямую работу с db
		const updated = await db('invitations')
			.where({ id: Number(id) })
			.update({
				status,
				updated_at: db.fn.now(),
			})

		if (!updated) {
			throw new Error('Приглашение с таким ID не найдено')
		}

		return {
			status: 'success',
			message: 'Статус приглашения успешно обновлён',
		}
	} catch (error: any) {
		console.error('Ошибка обновления приглашения:', error.message)
		event.res.statusCode = 400
		return {
			status: 'error',
			message: error.message || 'Ошибка сервера',
		}
	}
})
