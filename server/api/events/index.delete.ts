import { defineEventHandler } from 'h3'
import { db } from '~/server/database/db' // ✅ заменили getDB на db

export default defineEventHandler(async event => {
	try {
		const rawId = event.context.params?.id

		if (!rawId || isNaN(Number(rawId))) {
			throw new Error('Некорректный ID мероприятия')
		}

		const id = Number(rawId)

		const existingEvent = await db('events').where({ id }).first()
		if (!existingEvent) {
			throw new Error('Мероприятие не найдено')
		}

		await db('events').where({ id }).del()

		return {
			status: 'success',
			message: 'Мероприятие успешно удалено',
		}
	} catch (error: any) {
		console.error('Ошибка удаления мероприятия:', error.message)
		event.res.statusCode = 400
		return {
			status: 'error',
			message: error.message || 'Ошибка сервера',
		}
	}
})
