<template>
  <div class="manager-dashboard">
    <h1>Панель менеджера</h1>
    <p>Добро пожаловать, {{ user?.full_name || 'менеджер' }}!</p>

    <div class="section">
      <h2>Ваши мероприятия</h2>
      <ul v-if="events.length > 0" class="data-list">
        <li v-for="event in events" :key="event.id">
          <strong>{{ event.title }}</strong> — {{ formatDate(event.event_date) }}
        </li>
      </ul>
      <p v-else>У вас пока нет мероприятий.</p>
    </div>

    <div class="section">
      <h2>Ваши новости</h2>
      <ul v-if="news.length > 0" class="data-list">
        <li v-for="item in news" :key="item.id">
          <strong>{{ item.title }}</strong> — {{ formatDate(item.published_at) }}
        </li>
      </ul>
      <p v-else>Вы пока не публиковали новости.</p>
    </div>

    <!-- Пример кнопок -->
    <div class="actions">
      <button @click="navigateToTasks">Управление задачами</button>
      <button @click="navigateToReports">Генерация отчетов</button>
    </div>

    <LogoutButton />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import { useFetch, definePageMeta } from '#imports'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const events = ref<{ id: number; title: string; event_date: string }[]>([])
const news = ref<{ id: number; title: string; created_at?: string }[]>([])

const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const fetchManagerData = async () => {
  const token = localStorage.getItem('authToken')
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
  const id = currentUser?.id

  if (!token || !id) return

  try {
    const { data: eventData } = await useFetch<{ events: typeof events.value }>(
      '/api/events/by-user',
      {
        query: { organizer_id: id },
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    events.value = eventData.value?.events || []

    const { data: newsData } = await useFetch<{ news: typeof news.value }>(
      '/api/news/by-user',
      {
        query: { author_id: id },
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    news.value = newsData.value?.news || []
  } catch (err) {
    console.error('Ошибка загрузки данных:', err)
  }
}

onMounted(fetchManagerData)

definePageMeta({
  middleware: ['auth-middleware'],
  roles: ['manager']
})

function navigateToTasks() {
  alert('Переход к управлению задачами...')
}

function navigateToReports() {
  alert('Генерация отчетов...')
}
</script>


<style scoped>
.manager-dashboard {
  max-width: 700px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.section {
  margin: 30px 0;
}

.data-list {
  list-style: none;
  padding: 0;
  margin-top: 10px;
}

.data-list li {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

.actions button {
  margin: 10px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.actions button:hover {
  background-color: #3aa876;
}
</style>
