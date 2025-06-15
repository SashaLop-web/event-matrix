import { defineEventHandler } from 'h3'
import { db } from '~/server/database/db' // ✅ заменили getDB на db

export default defineEventHandler(async event => {
	try {
		const events = await db('events')
			.select(
				'id',
				'title',
				'type',
				'description',
				'organizer_id',
				'location',
				'location_comment',
				'event_date',
				'is_announced',
				'created_at'
			)
			.orderBy('event_date', 'asc')

		return {
			status: 'success',
			data: Array.isArray(events) ? events : [],
		}
	} catch (error: any) {
		console.error('Ошибка получения мероприятий:', error.message)
		event.res.statusCode = 500
		return {
			status: 'error',
			message: error.message || 'Ошибка сервера при получении мероприятий',
		}
	}
})
