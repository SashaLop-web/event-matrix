import { defineEventHandler } from 'h3'
import { db } from '~/server/database/db'

export default defineEventHandler(async event => {
	try {
		const departments = await db('departments').select('id', 'name')
		return { departments }
	} catch (error: any) {
		event.res.statusCode = 500
		return { error: 'Ошибка при получении отделов' }
	}
})