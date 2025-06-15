import knex from 'knex'

// Если в продакшене будет PostgreSQL, можешь добавить проверку на process.env.DATABASE_URL
export const db = knex({
	client: 'pg',
	connection: process.env.DATABASE_URL,
	pool: {
		min: 0,
		max: 10,
	},
})

// Создание таблиц
async function createPositionsTable() {
	await db.schema.createTable('positions', table => {
		table.increments('id').primary()
		table.string('name').notNullable().unique()
	})
}

async function createDepartmentsTable() {
	await db.schema.createTable('departments', table => {
		table.increments('id').primary()
		table.string('name').notNullable()
		table
			.integer('manager_id')
			.unsigned()
			.references('id')
			.inTable('users')
			.onDelete('SET NULL')
		table.text('description').nullable()
		table.text('contact_info').nullable()
		table.timestamp('created_at').defaultTo(db.fn.now())
	})
}

async function createUsersTable() {
	await db.schema.createTable('users', table => {
		table.increments('id').primary()
		table.string('email').notNullable().unique()
		table.string('password').notNullable()
		table.string('full_name').notNullable()
		table
			.integer('position_id')
			.unsigned()
			.references('id')
			.inTable('positions')
			.onDelete('SET NULL')
		table
			.integer('department_id')
			.unsigned()
			.references('id')
			.inTable('departments')
			.onDelete('SET NULL')
		table
			.integer('manager_id')
			.unsigned()
			.references('id')
			.inTable('users')
			.onDelete('SET NULL')
		table.enu('role', ['admin', 'manager', 'employee']).defaultTo('employee')
		table.string('avatar_url').nullable()
		table.timestamp('created_at').defaultTo(db.fn.now())
		table.timestamp('last_login').nullable()
	})
}

async function createEventsTable() {
	await db.schema.createTable('events', table => {
		table.increments('id').primary()
		table.string('title').notNullable()
		table
			.enu('type', ['meeting', 'conference', 'workshop'])
			.defaultTo('meeting')
		table.text('description').nullable()
		table
			.integer('organizer_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
		table.string('location').nullable()
		table.text('location_comment').nullable()
		table.timestamp('event_date').notNullable()
		table.boolean('is_announced').defaultTo(false)
		table.timestamp('created_at').defaultTo(db.fn.now())
	})
}

async function createInvitationsTable() {
	await db.schema.createTable('invitations', table => {
		table.increments('id').primary()
		table
			.integer('event_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('events')
			.onDelete('CASCADE')
		table
			.integer('user_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
		table
			.enu('status', ['pending', 'accepted', 'declined'])
			.defaultTo('pending')
		table.text('comment').nullable()
		table.timestamp('created_at').defaultTo(db.fn.now())
		table.timestamp('updated_at').defaultTo(db.fn.now())
	})
}

async function createNotificationsTable() {
	await db.schema.createTable('notifications', table => {
		table.increments('id').primary()
		table
			.integer('user_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
		table
			.integer('event_id')
			.unsigned()
			.nullable()
			.references('id')
			.inTable('events')
			.onDelete('SET NULL')
		table.text('message').notNullable()
		table.string('type').notNullable()
		table.boolean('is_read').defaultTo(false)
		table.timestamp('scheduled_time').nullable()
		table.timestamp('created_at').defaultTo(db.fn.now())
	})
}

async function createNewsTable() {
	await db.schema.createTable('news', table => {
		table.increments('id').primary()
		table.string('title').notNullable()
		table.text('content').notNullable()
		table
			.integer('event_id')
			.unsigned()
			.nullable()
			.references('id')
			.inTable('events')
			.onDelete('SET NULL')
		table.string('image_url').nullable()
		table
			.integer('author_id')
			.unsigned()
			.notNullable()
			.references('id')
			.inTable('users')
			.onDelete('CASCADE')
		table.timestamp('published_at').defaultTo(db.fn.now())
	})
}

async function createSupportRequestsTable() {
	await db.schema.createTable('support_requests', table => {
		table.increments('id').primary()
		table.string('name').notNullable()
		table.string('email').notNullable()
		table.string('topic').notNullable()
		table.text('message').notNullable()
		table.timestamp('created_at').defaultTo(db.fn.now())
	})
}

export async function initDB() {
	try {
		console.log('🛠️ Initializing database...')
		await createPositionsTable()
		await createDepartmentsTable()
		await createUsersTable()
		await createEventsTable()
		await createInvitationsTable()
		await createNotificationsTable()
		await createNewsTable()
		await createSupportRequestsTable()
		console.log('✅ All tables created successfully')
	} catch (error) {
		console.error('❌ Database initialization error:', error)
		throw error
	}
}

export async function closeDB() {
	try {
		await db.destroy()
		console.log('✅ Database connection closed')
	} catch (error) {
		console.error('❌ Error closing database connection:', error)
	}
}

process.on('SIGINT', async () => {
	console.log('\nShutting down server...')
	await closeDB()
	process.exit(0)
})
