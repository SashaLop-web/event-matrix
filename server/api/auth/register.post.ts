import { defineEventHandler, readBody } from 'h3'
import bcrypt from 'bcryptjs'
import { db } from '~/server/database/db' // ✅ заменили getDB на db

export default defineEventHandler(async event => {
	try {
		const body = await readBody(event)

		if (!body || typeof body !== 'object') {
			throw new Error('Пустое или некорректное тело запроса')
		}

		const { email, password, full_name, position_id, department_id, role } =
			body

		if (!email || !password || !full_name || !position_id) {
			throw new Error('Все обязательные поля должны быть заполнены')
		}

		const exists = await db('users').where({ email }).first()
		if (exists) {
			throw new Error('Пользователь с таким email уже существует')
		}

		const hashedPassword = await bcrypt.hash(password, 10)

		await db('users').insert({
			email,
			password: hashedPassword,
			full_name,
			position_id: Number(position_id),
			department_id: department_id ? Number(department_id) : null,
			role: role || 'employee',
		})

		return {
			status: 'success',
			message: 'Пользователь успешно зарегистрирован',
		}
	} catch (error: any) {
		console.error('Ошибка регистрации:', error.message)
		event.res.statusCode = 400
		return {
			status: 'error',
			message: error.message || 'Ошибка регистрации',
		}
	}
})
