import { defineEventHandler, readBody } from 'h3'
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

		const body = await readBody(event)
		const { id, status } = body

		if (!id || !['accepted', 'declined'].includes(status)) {
			event.res.statusCode = 400
			throw new Error('Некорректные данные запроса')
		}

		const updated = await db('notifications')
			.where('id', id)
			.andWhere('user_id', decoded.id)
			.update({
				response_status: status,
			})

		if (updated === 0) {
			event.res.statusCode = 404
			throw new Error('Уведомление не найдено или недоступно для пользователя')
		}

		return { status: 'success', message: 'Ответ сохранён' }
	} catch (e: any) {
		return {
			status: 'error',
			message: e.message || 'Ошибка при сохранении ответа',
		}
	}
})
