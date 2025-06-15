import { defineEventHandler, readBody } from 'h3'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { db } from '~/server/database/db' // ✅ заменили getDB на db
import { validateEmail } from '~/server/utils/validators'

interface User {
	id: number
	email: string
	password: string
	full_name: string
	role: string
}

function createServerError(message: string, statusCode: number = 500): Error {
	const error = new Error(message)
	;(error as any).statusCode = statusCode
	return error
}

export default defineEventHandler(async event => {
	try {
		const body = await readBody(event)

		if (!body || typeof body !== 'object') {
			throw createServerError('Пустой или некорректный запрос', 400)
		}

		const { email, password } = body

		if (!email || !password) {
			throw createServerError('Все поля обязательны для заполнения', 400)
		}

		if (!validateEmail(email)) {
			throw createServerError('Некорректный формат email', 400)
		}

		const user: User | undefined = await db('users')
			.select('id', 'email', 'password', 'full_name', 'role')
			.where({ email })
			.first()

		if (!user) {
			throw createServerError('Пользователь не найден', 404)
		}

		const isPasswordValid = await bcrypt.compare(password, user.password)
		if (!isPasswordValid) {
			throw createServerError('Неверный пароль', 401)
		}

		const token = jwt.sign(
			{ id: user.id, email: user.email, role: user.role },
			process.env.JWT_SECRET || 'fallback-secret',
			{ expiresIn: '1h' }
		)

		return {
			status: 'success',
			message: 'Вход выполнен успешно',
			token,
			user: {
				id: user.id,
				email: user.email,
				full_name: user.full_name,
				role: user.role,
			},
		}
	} catch (error: any) {
		console.error('Ошибка входа:', error.message)
		event.res.statusCode = error?.statusCode || 500
		return {
			status: 'error',
			message: error.message || 'Внутренняя ошибка сервера',
		}
	}
})
