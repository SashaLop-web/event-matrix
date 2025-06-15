<template>
  <div class="profile-container">
    <div class="profile-card" v-if="user">
      <div class="avatar-placeholder"></div>

      <h2>{{ user.full_name }}</h2>
      <p class="role">Роль: <strong>{{ formatRole(user.role) }}</strong></p>

      <ul class="details">
        <li><strong>Email:</strong> {{ user.email }}</li>
        <li><strong>Создан:</strong> {{ formatDate(user.created_at) }}</li>
      </ul>

      <button class="logout-button" @click="logout">Выйти</button>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFetch } from '#app'

interface User {
  id: number
  full_name: string
  email: string
  role: 'admin' | 'manager' | 'employee'
  created_at?: string
  last_login?: string
  avatar_url?: string
}

const router = useRouter()
const user = ref<User | null>(null)

onMounted(async () => {
  try {
    const token = localStorage.getItem('authToken')
    if (!token) throw new Error('Токен не найден')

    const { data, error } = await useFetch<{ user: User }>('/api/auth/verify-token', {
      method: 'POST',
      body: { token }
    })

    if (error.value) throw new Error(error.value.data?.message || 'Ошибка авторизации')

    user.value = data.value?.user ?? null
    if (!user.value) throw new Error('Пользователь не найден')
  } catch (err: any) {
    console.error('Ошибка загрузки профиля:', err.message)
    alert('Ошибка загрузки профиля. Пожалуйста, войдите снова.')
    localStorage.removeItem('authToken')
    router.push('/login')
  }
})

const logout = () => {
  localStorage.removeItem('authToken')
  localStorage.removeItem('user')
  router.push('/login')
}

function formatDate(date?: string): string {
  return date ? new Date(date).toLocaleString('ru-RU') : 'не указано'
}

function formatRole(role: string): string {
  const map: Record<string, string> = {
    admin: 'Администратор',
    manager: 'Менеджер',
    employee: 'Сотрудник'
  }
  return map[role] || 'Неизвестно'
}
</script>


<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  margin-top: 120px;
  padding: 20px;
}

.profile-card {
  background: #ffffff;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 100%;
  text-align: center;
}

.avatar-placeholder {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #ccc;
  display: inline-block;
}


h2 {
  margin-bottom: 6px;
  font-size: 22px;
  color: #333;
}

.role {
  color: #888;
  font-size: 15px;
  margin-bottom: 20px;
}

.details {
  text-align: left;
  list-style: none;
  padding: 0;
  margin-bottom: 25px;
  color: #555;
  font-size: 15px;
}

.details li {
  margin-bottom: 8px;
}

.logout-button {
  background-color: #ff4d4f;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 15px;
}

.logout-button:hover {
  background-color: #d9363e;
}
</style>
