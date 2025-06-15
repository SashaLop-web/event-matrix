// knexfile.js
module.exports = {
	development: {
		client: 'sqlite3', // Используем SQLite как базу данных
		connection: {
			filename: './database.sqlite', // Путь к файлу базы данных
		},
		useNullAsDefault: true, // SQLite требует явного указания NULL для отсутствующих значений
		migrations: {
			tableName: 'knex_migrations', // Таблица для отслеживания миграций
			directory: './migrations', // Папка для хранения файлов миграций
		},
		seeds: {
			directory: './seeds', // Папка для хранения seed-файлов (начальные данные)
		},
		pool: {
			afterCreate: (conn, done) => {
				// Включение поддержки внешних ключей в SQLite
				conn.run('PRAGMA foreign_keys = ON', done)
			},
		},
	},

	production: {
		client: 'sqlite3', // Можно изменить на другую БД (например, PostgreSQL) для production
		connection: {
			filename: './database.sqlite', // Путь к файлу базы данных
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
				// Включение поддержки внешних ключей в SQLite
				conn.run('PRAGMA foreign_keys = ON', done)
			},
		},
	},
}
