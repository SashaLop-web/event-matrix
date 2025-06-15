// knexfile.js

module.exports = {
	development: {
		client: 'sqlite3',
		connection: {
			filename: './database.sqlite',
		},
		useNullAsDefault: true,
		migrations: {
			tableName: 'knex_migrations',
			directory: './migrations',
		},
		seeds: {
			directory: './seeds',
		},
		pool: {
			afterCreate: (conn, done) => {
				conn.run('PRAGMA foreign_keys = ON', done)
			},
		},
	},

	production: {
		client: 'pg', // PostgreSQL
		connection: process.env.DATABASE_URL, // URL от Railway
		migrations: {
			tableName: 'knex_migrations',
			directory: './migrations',
		},
		seeds: {
			directory: './seeds',
		},
	},
}
