<template>
  <div class="personal-account-modal" v-if="isOpen" @click="closeModal">
    <div class="modal-content" @click.stop>
      <template v-if="!user">
        <h3>Войдите в аккаунт</h3>
        <p>Чтобы получить доступ к личному кабинету</p>
        <button class="custom-button" @click="handleLogin">Войти</button>
        <button class="custom-button" @click="handleRegister">Зарегистрироваться</button>
      </template>

      <template v-else>
        <h3>Здравствуйте, {{ user.full_name }}!</h3>
        <p class="role">Роль: <strong>{{ roleLabel }}</strong></p>



        <!-- Роли: admin -->
        <div v-if="user.role === 'admin'" class="settings">
          <button class="custom-button" @click="goToProfile">Админ-панель</button>
          <button class="custom-button" @click="createNews">Создать новость</button>
          <button class="custom-button" @click="createEvent">Создать мероприятие</button>
          <button class="custom-button" @click="openSettings">Настройки</button>
        </div>

        <!-- Роли: manager -->
        <div v-else-if="user.role === 'manager'" class="settings">
          <button class="custom-button" @click="goToProfile">Панель менеджера</button>
          <button class="custom-button" @click="createEvent">Создать мероприятие</button>
          <button class="custom-button" @click="goToNotifications">Уведомления</button>
        </div>

        <!-- Роли: employee -->
        <div v-else class="settings">
          <button class="custom-button" @click="goToProfile">Личный кабинет</button>
          <button class="custom-button" @click="goToNotifications">Уведомления</button>
        </div>

        <hr />
        <button class="custom-button logout" @click="logout">Выйти</button>
      </template>
    </div>
  </div>
</template>


<script setup>
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
})

const emit = defineEmits(['close'])

const closeModal = () => {
  emit('close')
}

const handleLogin = () => {
  closeModal()
  router.push('/login')
}

const handleRegister = () => {
  closeModal()
  router.push('/register')
}

const logout = async () => {
  await userStore.clearUser()
  localStorage.removeItem('authToken')
  closeModal()
  router.push('/login')
}

const openSettings = () => {
  alert('Настройки ещё не реализованы')
}

const goToProfile = () => {
  closeModal()
  switch (user.value?.role) {
    case 'admin':
      router.push('/admin-dashboard')
      break
    case 'manager':
      router.push('/manager-dashboard')
      break
    case 'employee':
      router.push('/profile')
      break
    default:
      console.warn('Неизвестная роль')
  }
}

const createNews = () => {
  closeModal()
  router.push('/news/create')
}

const createEvent = () => {
  closeModal()
  router.push('/events/create')
}

const roleLabel = computed(() => {
  switch (user.value?.role) {
    case 'admin':
      return 'Администратор'
    case 'manager':
      return 'Менеджер'
    case 'employee':
      return 'Сотрудник'
    default:
      return 'Неизвестная роль'
  }
})
const goToNotifications = () => {
  closeModal()
  router.push('/notifications/')
}

</script>

<style scoped>
.personal-account-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  z-index: 999;
  padding-top: 84px;
}

@media (max-width: 768px) {
  .personal-account-modal {
    padding-top: 60px;
  }
}

.modal-content {
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 340px;
  margin-right: 16px;
  padding: 24px;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

h3 {
  text-align: center;
  margin-bottom: 10px;
  font-size: 20px;
  color: #333;
}

p {
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
}

.role {
  font-style: italic;
  color: #777;
}

.settings {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.custom-button {
  background-color: #ed9121;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 999px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.custom-button:hover {
  background-color: #d7831b;
}

.logout {
  background-color: #ff4d4d;
}

.logout:hover {
  background-color: #e03333;
}

hr {
  margin: 20px 0;
  border: none;
  border-top: 1px solid #eee;
}
</style>
