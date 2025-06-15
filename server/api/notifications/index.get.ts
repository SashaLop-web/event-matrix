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
			throw new Error('Токен отсутствует')
		}

		const decoded = jwt.verify(
			rawToken.split(' ')[1],
			process.env.JWT_SECRET || 'fallback-secret'
		) as JwtPayload

		const notifications = await db('notifications')
			.leftJoin('events', 'notifications.event_id', 'events.id')
			.where('notifications.user_id', decoded.id)
			.orderBy('notifications.created_at', 'desc')
			.select(
				'notifications.id',
				'notifications.message',
				'notifications.type',
				'notifications.is_read',
				'notifications.created_at',
				'events.title as event_title',
				'events.event_date',
				'events.location',
				'events.location_comment',
				'events.type as event_type',
				'events.description as event_description'
			)

		return { status: 'success', notifications }
	} catch (error: any) {
		event.res.statusCode = 401
		return {
			status: 'error',
			message: error.message || 'Ошибка получения уведомлений',
		}
	}
})
