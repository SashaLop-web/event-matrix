<template>
  <div class="notification-detail" v-if="notification">
    <h1>Уведомление</h1>
    <p class="message">{{ notification.message }}</p>

    <div class="info">
      <p v-if="notification.event_title"><strong>Мероприятие:</strong> {{ notification.event_title }}</p>
      <p v-if="notification.event_type"><strong>Тип:</strong> {{ formatType(notification.event_type) }}</p>
      <p v-if="notification.event_date"><strong>Дата:</strong> {{ formatDate(notification.event_date) }}</p>
      <p v-if="notification.location"><strong>Место:</strong> {{ notification.location }}</p>
      <p v-if="notification.location_comment"><strong>Комментарий:</strong> {{ notification.location_comment }}</p>
      <p class="created"><small>Создано: {{ formatDate(notification.created_at) }}</small></p>
      <p v-if="notification.response_status" class="response">
        <strong>Ваш ответ:</strong>
        {{ notification.response_status === 'accepted' ? '✅ Подтверждено' : '❌ Отклонено' }}
      </p>
    </div>

    <div v-if="!notification.response_status && notification.type !== 'event_cancelled'" class="actions">
  <button class="accept-btn" @click="respond('accepted')">Подтвердить</button>
  <button class="decline-btn" @click="respond('declined')">Отклонить</button>
</div>

    <button class="back-button" @click="goBack">
      ← Назад ко всем уведомлениям
    </button>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'

interface NotificationDetail {
  id: number
  message: string
  is_read: boolean
  created_at?: string
  type?: string
  event_title?: string
  event_type?: string
  event_date?: string
  location?: string
  location_comment?: string
  response_status?: 'accepted' | 'declined' | null
}

const route = useRoute()
const router = useRouter()
const id = route.params.id
const notification = ref<NotificationDetail | null>(null)

onMounted(async () => {
  try {
    const token = localStorage.getItem('authToken')
    if (!token) throw new Error('Токен не найден')

    const { data, error } = await useFetch<{ notification: NotificationDetail }>(
      `/api/notifications/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    if (error.value) {
      console.error('Ошибка при загрузке уведомления:', error.value)
      return
    }

    notification.value = data.value?.notification ?? null
  } catch (err: any) {
    console.error('Ошибка:', err.message)
  }
})

const respond = async (decision: 'accepted' | 'declined') => {
  try {
    const token = localStorage.getItem('authToken')
    if (!token) throw new Error('Токен не найден')

    const response = await fetch(`/api/notifications/respond`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ id, status: decision })
    })

    const result = await response.json()
    if (result.status === 'success') {
      if (notification.value) {
        notification.value.response_status = decision
      }
    } else {
      throw new Error(result.message || 'Ошибка при ответе')
    }
  } catch (err) {
    console.error('Ошибка при ответе:', err)
  }
}

const goBack = () => {
  router.push('/notifications')
}

const formatDate = (d?: string) =>
  d
    ? new Date(d).toLocaleString('ru-RU', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : ''

const formatType = (type?: string) => {
  const map: Record<string, string> = {
    meeting_individual: 'Встреча с сотрудниками',
    meeting_department: 'Встреча по отделу',
    teambuilding: 'Тимбилдинг',
    training: 'Обучение / Воркшоп',
    corporate: 'Корпоративный праздник',
    presentation: 'Презентация / Конференция'
  }
  return type ? map[type] || type : ''
}
</script>

<style scoped>
.notification-detail {
  max-width: 680px;
  margin: 100px auto;
  padding: 28px 36px;
  background: #fff;
  border-left: 6px solid #ff9800;
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
}

h1 {
  font-size: 28px;
  color: #222;
  margin-bottom: 20px;
  border-bottom: 1px solid #ddd;
  padding-bottom: 8px;
}

.message {
  font-size: 18px;
  font-weight: 600;
  color: #111;
  margin-bottom: 20px;
}

.info p {
  font-size: 15px;
  color: #333;
  margin: 6px 0;
}

.created {
  margin-top: 14px;
  font-size: 13px;
  color: #777;
}

.response {
  margin-top: 14px;
  font-size: 16px;
  font-weight: bold;
  color: #444;
}

.actions {
  margin-top: 24px;
  display: flex;
  gap: 12px;
}

.accept-btn,
.decline-btn {
  padding: 10px 18px;
  font-size: 15px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.accept-btn {
  background-color: #4caf50;
  color: white;
}

.accept-btn:hover {
  background-color: #43a047;
}

.decline-btn {
  background-color: #f44336;
  color: white;
}

.decline-btn:hover {
  background-color: #d32f2f;
}

.back-button {
  margin-top: 30px;
  padding: 10px 20px;
  background-color: #ff9800;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button:hover {
  background-color: #fb8c00;
}
</style>
