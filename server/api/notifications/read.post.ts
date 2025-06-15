import { defineEventHandler, readBody } from 'h3'
import jwt from 'jsonwebtoken'
import { db } from '~/server/database/db'

interface JwtPayload {
	id: number
	email?: string
	role?: string
}

export default defineEventHandler(async event => {
	try {
		const rawToken = event.headers.get('Authorization')
		if (!rawToken?.startsWith('Bearer ')) {
			throw new Error('Токен отсутствует или некорректный формат')
		}

		const token = rawToken.split(' ')[1]
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || 'fallback-secret'
		) as JwtPayload

		const body = await readBody(event)
		const ids = Array.isArray(body.ids)
			? body.ids.map(Number).filter(Boolean)
			: []

		if (!ids.length) {
			throw new Error(
				'Передайте массив ID уведомлений для пометки как прочитанные'
			)
		}

		await db('notifications')
			.whereIn('id', ids)
			.andWhere('user_id', decoded.id)
			.update({ is_read: true })

		return {
			status: 'success',
			message: `Обновлено уведомлений: ${ids.length}`,
		}
	} catch (error: any) {
		event.res.statusCode = 400
		return {
			status: 'error',
			message: error.message || 'Ошибка обработки запроса',
		}
	}
})
