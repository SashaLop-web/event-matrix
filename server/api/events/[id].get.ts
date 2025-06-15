import { defineEventHandler, getRouterParam } from 'h3'
import { db } from '~/server/database/db'
import jwt from 'jsonwebtoken'

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
			throw new Error('Токен отсутствует или некорректный формат')
		}

		const token = rawToken.split(' ')[1]
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || 'fallback-secret'
		) as JwtPayload

		const id = Number(getRouterParam(event, 'id'))
		if (isNaN(id)) {
			event.res.statusCode = 400
			throw new Error('Некорректный ID мероприятия')
		}

		const eventData = await db('events').where('id', id).first()
		if (!eventData) {
			event.res.statusCode = 404
			throw new Error('Мероприятие не найдено')
		}

		if (decoded.role !== 'admin' && eventData.organizer_id !== decoded.id) {
			event.res.statusCode = 403
			throw new Error('Недостаточно прав для просмотра')
		}

		// Получаем участников вместе с названием отдела
		const participants = await db('notifications')
			.join('users', 'notifications.user_id', 'users.id')
			.leftJoin('departments', 'users.department_id', 'departments.id')
			.where('notifications.event_id', id)
			.select(
				'users.id as user_id',
				'users.full_name',
				'users.email',
				'users.role',
				'departments.name as department',
				'notifications.response_status'
			)

		return {
			status: 'success',
			event: eventData,
			participants,
		}
	} catch (e: any) {
		return {
			status: 'error',
			message: e.message || 'Ошибка при получении мероприятия',
		}
	}
})
