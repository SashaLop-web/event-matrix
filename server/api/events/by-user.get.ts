import { defineEventHandler, getQuery } from 'h3'
import { db } from '~/server/database/db' // ✅ заменили getDB на db

export default defineEventHandler(async event => {
	try {
		const query = getQuery(event)
		const organizerId = Number(query.organizer_id)

		if (!organizerId || isNaN(organizerId)) {
			throw new Error('Некорректный organizer_id')
		}

		const events = await db('events')
			.where('organizer_id', organizerId)
			.orderBy('event_date', 'desc')

		return {
			status: 'success',
			events,
		}
	} catch (error: any) {
		console.error('Ошибка получения мероприятий:', error.message)
		event.res.statusCode = 400
		return {
			status: 'error',
			message: error.message || 'Ошибка при получении мероприятий',
		}
	}
})
