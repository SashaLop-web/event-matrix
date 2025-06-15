<template>
  <div class="employee-dashboard">
    <h1>Здравствуйте, {{ user?.full_name }}!</h1>

    <section class="section">
      <h2>Ваши приглашения</h2>
      <ul v-if="invitations.length" class="list">
        <li v-for="invite in invitations" :key="invite.id">
          <strong>{{ invite.event_title }}</strong> - {{ formatDate(invite.event_date) }} -
          <span :class="invite.status">{{ invite.status }}</span>
        </li>
      </ul>
      <p v-else>У вас нет активных приглашений.</p>
    </section>

    <section class="section">
      <h2>Уведомления</h2>
      <ul v-if="notifications.length" class="list">
        <li v-for="note in notifications" :key="note.id" :class="{ unread: !note.is_read }">
          {{ note.message }} <br />
          <small>{{ formatDate(note.created_at) }}</small>
        </li>
      </ul>
      <p v-else>У вас нет уведомлений.</p>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'

const { user } = storeToRefs(useUserStore())

interface Invitation {
  id: number
  event_title: string
  event_date: string
  status: string
}

interface Notification {
  id: number
  message: string
  is_read: boolean
  created_at: string
}

const invitations = ref<Invitation[]>([])
const notifications = ref<Notification[]>([])

onMounted(async () => {
  try {
    const token = localStorage.getItem('authToken')
    if (!token) throw new Error('authToken не найден')

    const [invResp, notifResp] = await Promise.all([
      useFetch<{ invitations: Invitation[] }>('/api/my-invitations', {
        headers: { Authorization: `Bearer ${token}` }
      }),
      useFetch<{ notifications: Notification[] }>('/api/notifications', {
        headers: { Authorization: `Bearer ${token}` }
      })
    ])

    invitations.value = invResp.data.value?.invitations || []
    notifications.value = notifResp.data.value?.notifications || []
  } catch (err: any) {
    console.error('Ошибка загрузки данных:', err.message)
  }
})

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return d.toLocaleString()
}
</script>

<style scoped>
.employee-dashboard {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.section {
  margin-top: 30px;
}

.section h2 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.list {
  list-style: none;
  padding: 0;
}

.list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.unread {
  font-weight: bold;
}

.accepted {
  color: green;
}
.pending {
  color: orange;
}
.declined {
  color: red;
}
</style>
