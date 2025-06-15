import {
	defineNuxtRouteMiddleware,
	navigateTo,
	useRoute,
	useRuntimeConfig,
} from '#app'
import { useUserStore } from '~/stores/user'

export default defineNuxtRouteMiddleware(to => {
	const userStore = useUserStore()
	const user = userStore.user

	// ✅ Если пользователь не авторизован
	if (!user) {
		// Сохраняем, куда он пытался попасть
		const redirectPath = encodeURIComponent(to.fullPath)
		return navigateTo(`/login?redirect=${redirectPath}`)
	}

	// ✅ Проверка ролей, если они указаны в meta
	const allowedRoles = (to.meta.roles as string[]) || []

	if (allowedRoles.length && !allowedRoles.includes(user.role)) {
		// Перенаправляем на общую страницу или показываем ошибку
		return navigateTo('/403') // сделай такую страницу или измени путь
	}
})
