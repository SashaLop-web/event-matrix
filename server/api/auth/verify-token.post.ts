import { defineEventHandler, readBody, createError } from 'h3'
import jwt from 'jsonwebtoken'
import { db } from '~/server/database/db'

interface JwtPayload {
	id: number
	email: string
	role: string
}

export default defineEventHandler(async event => {
	try {
		const body = await readBody(event)
		const token = body?.token

		if (!token) {
			throw createError({
				statusCode: 400,
				message: 'Токен не предоставлен',
			})
		}

		const decoded = jwt.verify(
			token,
			process.env.JWT_SECRET || 'fallback-secret'
		) as JwtPayload

		const user = await db('users')
			.select('id', 'full_name', 'email', 'role', 'created_at')
			.where({ id: decoded.id })
			.first()

		if (!user) {
			throw createError({
				statusCode: 404,
				message: 'Пользователь не найден',
			})
		}

		return {
			status: 'success',
			user,
		}
	} catch (error: any) {
		console.error('Ошибка в /api/verify-token:', error)

		return {
			status: 'error',
			message: error.message || 'Ошибка проверки токена',
		}
	}
})
