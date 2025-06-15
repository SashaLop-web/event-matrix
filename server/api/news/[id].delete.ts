import { defineEventHandler, getRouterParam } from 'h3'
import { db } from '~/server/database/db'
import jwt from 'jsonwebtoken'

interface JwtPayload {
	id: number
	role: string
}

export default defineEventHandler(async event => {
	try {
		const rawToken = event.headers.get('Authorization')
		if (!rawToken?.startsWith('Bearer ')) {
			event.res.statusCode = 401
			throw new Error('Нет токена')
		}

		const token = rawToken.split(' ')[1]
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || 'secret'
		) as JwtPayload

		const id = Number(getRouterParam(event, 'id'))
		if (isNaN(id)) throw new Error('Неверный ID')

		const existing = await db('news').where('id', id).first()
		if (!existing) throw new Error('Новость не найдена')

		// Только автор или админ
		if (decoded.role !== 'admin' && existing.author_id !== decoded.id) {
			event.res.statusCode = 403
			throw new Error('Нет прав на удаление')
		}

		await db('news').where('id', id).delete()

		return { status: 'success', message: 'Новость удалена' }
	} catch (e: any) {
		return { status: 'error', message: e.message || 'Ошибка удаления' }
	}
})
