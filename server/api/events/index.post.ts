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
		if (!rawToken || !rawToken.startsWith('Bearer ')) {
			throw new Error('Некорректный или отсутствующий токен')
		}

		const decoded = jwt.verify(
			rawToken.split(' ')[1],
			process.env.JWT_SECRET || 'fallback-secret'
		) as JwtPayload

		const body = await readBody(event)

		if (!body || typeof body !== 'object') {
			throw new Error('Пустое или некорректное тело запроса')
		}

		const {
			title,
			event_date,
			type,
			description,
			location,
			location_comment,
			is_announced,
			participants,
			notifyAll,
			department_id,
		} = body

		if (!title || !event_date) {
			throw new Error('Недостаточно данных для создания мероприятия')
		}

		const [eventId] = await db('events').insert({
			title,
			type: type || 'meeting',
			description: description || null,
			organizer_id: decoded.id,
			location: location || null,
			location_comment: location_comment || null,
			event_date,
			is_announced: is_announced || false,
		})

		const invitedUserIds = new Set<number>()

		// === Приглашения для индивидуальной встречи ===
		if (type === 'meeting_individual') {
			if (!Array.isArray(participants) || participants.length === 0) {
				throw new Error(
					'Для индивидуальной встречи необходимо указать участников'
				)
			}

			const validParticipants = participants
				.map((id: any) => Number(id))
				.filter((id: number) => !isNaN(id))

			for (const userId of validParticipants) {
				invitedUserIds.add(userId)
				await db('invitations').insert({
					event_id: eventId,
					user_id: userId,
					status: 'pending',
					comment: null,
				})

				await db('notifications').insert({
					user_id: userId,
					event_id: eventId,
					message: `Вас пригласили на мероприятие: "${title}"`,
					type: 'event_invite',
					is_read: false,
					scheduled_time: null,
					created_at: new Date().toISOString(),
				})
			}
		}

		// === Приглашения для встречи по отделу ===
		if (type === 'meeting_department') {
			if (!department_id) {
				throw new Error('Для встречи с отделом необходимо выбрать отдел')
			}

			const deptUsers = await db('users')
				.select('id')
				.where({ department_id: department_id })

			for (const { id } of deptUsers) {
				invitedUserIds.add(id)

				await db('invitations').insert({
					event_id: eventId,
					user_id: id,
					status: 'pending',
					comment: null,
				})

				await db('notifications').insert({
					user_id: id,
					event_id: eventId,
					message: `Вы приглашены на встречу отдела: "${title}"`,
					type: 'event_invite',
					is_read: false,
					scheduled_time: null,
					created_at: new Date().toISOString(),
				})
			}
		}

		// === Оповещение всех сотрудников ===
		if (
			notifyAll &&
			!['meeting_individual', 'meeting_department'].includes(type)
		) {
			const employees = await db('users')
				.select('id')
				.where({ role: 'employee' })

			for (const { id } of employees) {
				if (!invitedUserIds.has(id)) {
					await db('notifications').insert({
						user_id: id,
						event_id: eventId,
						message: `Новое корпоративное мероприятие: "${title}"`,
						type: 'event_announce',
						is_read: false,
						scheduled_time: null,
						created_at: new Date().toISOString(),
					})
				}
			}
		}

		return {
			status: 'success',
			message: 'Мероприятие успешно создано',
			eventId,
		}
	} catch (error: any) {
		console.error('Ошибка создания мероприятия:', error.message)
		event.res.statusCode = 400
		return {
			status: 'error',
			message: error.message || 'Ошибка сервера',
		}
	}
})
