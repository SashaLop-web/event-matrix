import { defineEventHandler } from 'h3'
import { db } from '~/server/database/db'

export default defineEventHandler(async event => {
	try {
		const news = await db('news')
			.select(
				'id',
				'title',
				'content',
				'event_id',
				'image_url',
				'author_id',
				'published_at'
			)
			.orderBy('published_at', 'desc')

		return {
			status: 'success',
			data: Array.isArray(news) ? news : [],
		}
	} catch (error: any) {
		console.error('Ошибка получения новостей:', error.message)
		event.res.statusCode = 500
		return {
			status: 'error',
			message: error.message || 'Ошибка сервера при получении новостей',
		}
	}
})
