import { defineEventHandler } from 'h3'
import jwt from 'jsonwebtoken'
import { db } from '~/server/database/db' // ✅ заменили getDB на db

interface JwtPayload {
	id: number
	email: string
	role: string
}

export default defineEventHandler(async event => {
	try {
		const rawToken = event.headers.get('Authorization')

		if (!rawToken?.startsWith('Bearer ')) {
			throw new Error('Некорректный или отсутствующий токен')
		}

		const token = rawToken.split(' ')[1]
		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || 'fallback-secret'
		) as JwtPayload

		const organizer = await db('users')
			.select('department_id')
			.where({ id: decoded.id })
			.first()

		if (!organizer || !organizer.department_id) {
			throw new Error('Отдел текущего пользователя не найден')
		}

		const users = await db('users')
			.where({
				role: 'employee',
				department_id: organizer.department_id,
			})
			.select('id', 'full_name')

		return {
			status: 'success',
			users,
		}
	} catch (error: any) {
		console.error('Ошибка получения пользователей:', error.message)
		event.res.statusCode = 401
		return {
			status: 'error',
			message: error.message || 'Ошибка получения пользователей',
		}
	}
})
