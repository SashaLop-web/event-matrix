import { defineNuxtPlugin } from '#app'
import { useUserStore } from '~/stores/user'

interface VerifyResponse {
	status: string
	user: {
		id: number
		email: string
		full_name: string
		role: string
	}
}

export default defineNuxtPlugin(async () => {
	if (!process.client) return

	const userStore = useUserStore()
	const token = localStorage.getItem('authToken')
	const refreshToken = localStorage.getItem('refreshToken')

	const verifyUser = async (tokenToVerify: string): Promise<boolean> => {
		try {
			const data = await $fetch<VerifyResponse>('/api/auth/verify-token', {
				method: 'POST',
				body: { token: tokenToVerify },
				headers: { 'Content-Type': 'application/json' },
			})

			if (data?.user) {
				userStore.setUser(data.user)
				return true
			}
		} catch (err) {
			console.warn('Ошибка проверки токена:', err)
		}
		return false
	}

	const tryRefreshToken = async (): Promise<boolean> => {
		try {
			const refreshRes = await $fetch<{ token: string }>(
				'/api/auth/refresh-token',
				{
					method: 'POST',
					body: { refreshToken },
					headers: { 'Content-Type': 'application/json' },
				}
			)

			const newToken = refreshRes?.token
			if (newToken) {
				localStorage.setItem('authToken', newToken)
				return await verifyUser(newToken)
			}
		} catch (err) {
			console.error('Ошибка обновления токена:', err)
		}
		return false
	}

	const valid = token ? await verifyUser(token) : false
	if (!valid && refreshToken) {
		const refreshed = await tryRefreshToken()
		if (!refreshed) {
			userStore.clearUser()
			localStorage.removeItem('authToken')
			localStorage.removeItem('refreshToken')
		}
	}
})
