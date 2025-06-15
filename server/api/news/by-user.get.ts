import { defineEventHandler, getQuery } from 'h3'
import { db } from '~/server/database/db' // ✅ заменили getDB на db

export default defineEventHandler(async event => {
	try {
		const query = getQuery(event)
		const authorId = Number(query.author_id)

		if (!authorId || isNaN(authorId)) {
			throw new Error('Некорректный author_id')
		}

		const news = await db('news')
			.where('author_id', authorId)
			.orderBy('published_at', 'desc')

		return {
			status: 'success',
			news,
		}
	} catch (error: any) {
		console.error('Ошибка получения новостей:', error.message)
		event.res.statusCode = 400
		return {
			status: 'error',
			message: error.message || 'Ошибка при получении новостей',
		}
	}
})
