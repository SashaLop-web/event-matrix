import { defineEventHandler, readBody } from 'h3'
import jwt from 'jsonwebtoken'

interface JwtPayload {
	id: number
	email: string
	role: string
}

export default defineEventHandler(async event => {
	try {
		const body = await readBody(event)

		if (!body || typeof body !== 'object') {
			throw new Error('Пустое или некорректное тело запроса')
		}

		const { refreshToken } = body

		if (!refreshToken) {
			throw new Error('Refresh token не предоставлен')
		}

		let decoded: JwtPayload
		try {
			decoded = jwt.verify(
				refreshToken,
				process.env.REFRESH_TOKEN_SECRET || 'fallback-refresh-secret'
			) as JwtPayload
		} catch {
			throw new Error('Недействительный refresh token')
		}

		const newToken = jwt.sign(
			{ id: decoded.id, email: decoded.email, role: decoded.role },
			process.env.JWT_SECRET || 'fallback-secret',
			{ expiresIn: '1h' }
		)

		return {
			status: 'success',
			message: 'Токен успешно обновлён',
			token: newToken,
		}
	} catch (error: any) {
		console.error('Ошибка обновления токена:', error.message)
		event.res.statusCode = 401
		return {
			status: 'error',
			message: error.message || 'Ошибка обновления токена',
		}
	}
})
