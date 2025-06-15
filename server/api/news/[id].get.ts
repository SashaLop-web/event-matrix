import { defineEventHandler } from 'h3'
import { db } from '~/server/database/db'

export default defineEventHandler(async event => {
	try {
		const rawId = event.context.params?.id

		if (!rawId) {
			event.res.statusCode = 400
			return {
				status: 'error',
				message: 'ID новости не указан',
			}
		}

		const id = parseInt(rawId)

		if (isNaN(id)) {
			event.res.statusCode = 400
			return {
				status: 'error',
				message: 'ID должен быть числом',
			}
		}

		const newsItem = await db('news')
			.leftJoin('events', 'news.event_id', 'events.id')
			.select(
				'news.id',
				'news.title',
				'news.content',
				'news.published_at',
				'news.image_url',
				'news.event_id',
				'events.title as event_title',
				'events.event_date',
				'events.type as event_type',
				'events.location as event_location',
				'events.location_comment as event_location_comment',
				'events.description as event_description',
				'events.organizer_id'
			)
			.where('news.id', id)
			.first()

		if (!newsItem) {
			event.res.statusCode = 404
			return {
				status: 'error',
				message: 'Новость не найдена',
			}
		}

		return {
			status: 'success',
			data: newsItem,
		}
	} catch (error: any) {
		console.error('Ошибка получения новости:', error.message)
		event.res.statusCode = 500
		return {
			status: 'error',
			message: error.message || 'Ошибка сервера',
		}
	}
})
