import { defineEventHandler } from 'h3'
import jwt from 'jsonwebtoken'
import { db } from '~/server/database/db'

interface JwtPayload {
	id: number
	email: string
	role: string
}

export default defineEventHandler(async event => {
	try {
		const rawToken = event.headers.get('Authorization')
		if (!rawToken?.startsWith('Bearer ')) {
			event.res.statusCode = 401
			return {
				status: 'error',
				message: 'Токен отсутствует или некорректный формат',
			}
		}

		const token = rawToken.split(' ')[1]
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || 'fallback-secret'
		) as JwtPayload

		const id = Number(event.context.params?.id)
		if (!id || isNaN(id)) {
			event.res.statusCode = 400
			return { status: 'error', message: 'Некорректный ID мероприятия' }
		}

		// Получаем данные мероприятия перед удалением
		const eventData = await db('events').where({ id }).first()
		if (!eventData) {
			event.res.statusCode = 404
			return { status: 'error', message: 'Мероприятие не найдено' }
		}

		// Получаем пользователей, которые были связаны с этим мероприятием
		const relatedUsers = await db('notifications')
			.where('event_id', id)
			.select('user_id')

		// Удаляем мероприятие
		const deleted = await db('events').where({ id }).del()
		if (!deleted) {
			event.res.statusCode = 404
			return {
				status: 'error',
				message: 'Мероприятие не найдено или уже удалено',
			}
		}

		// Добавляем уведомления об отмене
		if (relatedUsers.length > 0) {
			const inserts = relatedUsers.map(({ user_id }) => ({
				user_id,
				event_id: id,
				message: `Мероприятие "${eventData.title}" было отменено.`,
				type: 'event_cancelled',
				is_read: false,
				created_at: new Date().toISOString(),
			}))
			await db('notifications').insert(inserts)
		}

		return {
			status: 'success',
			message: 'Мероприятие удалено и сотрудники уведомлены',
		}
	} catch (error: any) {
		console.error('Ошибка удаления:', error.message)
		event.res.statusCode = 500
		return { status: 'error', message: error.message || 'Ошибка сервера' }
	}
})
