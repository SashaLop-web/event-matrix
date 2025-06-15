import { defineEventHandler, getRouterParam } from 'h3'
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
			throw new Error('Некорректный ID уведомления')
		}

		const notification = await db('notifications')
			.leftJoin('events', 'notifications.event_id', 'events.id')
			.where('notifications.user_id', decoded.id)
			.andWhere('notifications.id', id)
			.first()
			.select(
				'notifications.id',
				'notifications.message',
				'notifications.is_read',
				'notifications.response_status',
				'notifications.created_at',
				'notifications.type',
				'events.title as event_title',
				'events.type as event_type',
				'events.event_date',
				'events.location',
				'events.location_comment'
			)
			  

		if (!notification) {
			event.res.statusCode = 404
			throw new Error('Уведомление не найдено')
		}

		return { status: 'success', notification }
	} catch (e: any) {
		return {
			status: 'error',
			message: e.message || 'Ошибка получения уведомления',
		}
	}
})
