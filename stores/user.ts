import { defineStore } from 'pinia'

interface User {
	id: number
	email: string
	full_name: string
	role: 'admin' | 'manager' | 'employee' | string
}

export const useUserStore = defineStore('user', {
	state: () => ({
		user: null as User | null,
	}),

	getters: {
		// Проверка, авторизован ли пользователь
		isLoggedIn: state => !!state.user,

		// Получение роли пользователя
		userRole: state => state.user?.role ?? null,

		// Получение имени пользователя
		userName: state => state.user?.full_name ?? 'Гость',
	},

	actions: {
		// Установка данных пользователя
		setUser(userData: User) {
			this.user = userData
		},

		// Очистка данных пользователя
		clearUser() {
			this.user = null
		},

		// Выход из системы
		logout() {
			this.clearUser()
			if (process.client) {
				localStorage.removeItem('authToken') // Только на клиенте
			}
		},
	},
})
