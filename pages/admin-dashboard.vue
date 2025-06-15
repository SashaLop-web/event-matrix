<template>
  <div class="admin-dashboard">
    <h1>Админ-панель</h1>
    <p>Добро пожаловать, {{ user?.full_name || 'администратор' }}!</p>

    <div class="section">
      <h2>Ближайшие мероприятия</h2>
      <ul v-if="upcomingEvents.length" class="event-list">
        <li
          v-for="event in upcomingEvents"
          :key="event.id"
          class="event-card"
          @click="goToEvent(event.id)"
          style="cursor: pointer"
        >
          <div class="card-header">
            <h3>{{ event.title }}</h3>
            <button class="delete-btn" @click.stop="deleteEvent(event.id)">Удалить</button>
          </div>
          <p>📅 {{ formatDateTime(event.event_date) }}</p>
          <p>🏷️ Тип: {{ formatEventType(event.type) }}</p>
          <p>📍 Место: {{ event.location || 'не указано' }}</p>
          <p v-if="event.location_comment">💬 {{ event.location_comment }}</p>
          <p v-if="event.description">📝 {{ event.description }}</p>
        </li>
      </ul>
      <p v-else>Нет запланированных мероприятий.</p>
    </div>

    <div class="section" v-if="pastEvents.length">
      <h2>Прошедшие мероприятия</h2>
      <ul class="event-list">
        <li
          v-for="event in pastEvents"
          :key="event.id"
          class="event-card past"
          @click="goToEvent(event.id)"
          style="cursor: pointer"
        >
          <div class="card-header">
            <h3>{{ event.title }}</h3>
            <button class="delete-btn" @click.stop="deleteEvent(event.id)">Удалить</button>
          </div>
          <p>📅 {{ formatDateTime(event.event_date) }}</p>
          <p>🏷️ Тип: {{ formatEventType(event.type) }}</p>
          <p>📍 Место: {{ event.location || 'не указано' }}</p>
          <p v-if="event.location_comment">💬 {{ event.location_comment }}</p>
          <p v-if="event.description">📝 {{ event.description }}</p>
        </li>
      </ul>
    </div>

    <div class="section">
      <h2>Мои новости</h2>
      <ul v-if="news.length" class="news-list">
        <li v-for="n in sortedNews" :key="n.id" class="news-card">
          <div class="news-header">
            <h3>{{ n.title }}</h3>
            <button class="delete-news-btn" @click="deleteNews(n.id)">Удалить</button>
          </div>
          <p class="news-date">📅 {{ formatDate(n.published_at || n.created_at) }}</p>
          <p class="news-content">{{ truncateText(n.content, 160) }}</p>
          <p v-if="n.event_title" class="news-event">🔗 Связано с мероприятием: <strong>{{ n.event_title }}</strong></p>
        </li>

      </ul>
      <p v-else>Вы ещё не публиковали новости.</p>
    </div>

    <LogoutButton />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore } from '~/stores/user'
import { storeToRefs } from 'pinia'
import { useFetch, definePageMeta, useRouter } from '#imports'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const events = ref<any[]>([])
const news = ref<any[]>([])
const router = useRouter()

const now = new Date()

const upcomingEvents = computed(() =>
  events.value.filter(e => new Date(e.event_date) >= now)
    .sort((a, b) => new Date(a.event_date).getTime() - new Date(b.event_date).getTime())
)

const pastEvents = computed(() =>
  events.value.filter(e => new Date(e.event_date) < now)
    .sort((a, b) => new Date(b.event_date).getTime() - new Date(a.event_date).getTime())
)

const sortedNews = computed(() =>
  news.value.slice().sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
)

const formatDate = (d: string) =>
  new Date(d).toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })

const formatDateTime = (d: string) =>
  new Date(d).toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })

const formatEventType = (type: string): string => {
  const map: Record<string, string> = {
    meeting_individual: 'Встреча с сотрудниками',
    meeting_department: 'Встреча по отделу',
    teambuilding: 'Тимбилдинг',
    training: 'Обучение / Воркшоп',
    corporate: 'Корпоративный праздник',
    presentation: 'Презентация / Конференция'
  }
  return map[type] || type
}

function truncateText(text: string, maxLength: number) {
  return text.length <= maxLength ? text : text.slice(0, maxLength) + '...'
}

const fetchDashboardData = async () => {
  const token = localStorage.getItem('authToken')
  const currentUser = JSON.parse(localStorage.getItem('user') || '{}')
  if (!token || !currentUser.id) return

  try {
    const { data: eventData } = await useFetch<{ events: any[] }>('/api/events/by-user', {
      query: { organizer_id: currentUser.id },
      headers: { Authorization: `Bearer ${token}` }
    })
    events.value = eventData.value?.events || []

    const { data: newsData } = await useFetch<{ news: any[] }>('/api/news/by-user', {
      query: { author_id: currentUser.id },
      headers: { Authorization: `Bearer ${token}` }
    })
    news.value = newsData.value?.news || []
  } catch (err) {
    console.error('Ошибка загрузки данных:', err)
  }
}

const deleteEvent = async (eventId: number) => {
  if (!confirm('Вы уверены, что хотите удалить это мероприятие?')) return

  try {
    const token = localStorage.getItem('authToken')
    await $fetch(`/api/events/${eventId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    events.value = events.value.filter(e => e.id !== eventId)
  } catch (err) {
    console.error('Ошибка удаления:', err)
    alert('Ошибка при удалении мероприятия')
  }
}
const deleteNews = async (newsId: number) => {
  if (!confirm('Вы уверены, что хотите удалить эту новость?')) return

  try {
    const token = localStorage.getItem('authToken')
    await $fetch(`/api/news/${newsId}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
    news.value = news.value.filter(n => n.id !== newsId)
  } catch (err) {
    console.error('Ошибка удаления новости:', err)
    alert('Ошибка при удалении новости')
  }
}

const goToEvent = (id: number) => {
  router.push(`/events/${id}`)
}

onMounted(fetchDashboardData)

definePageMeta({
  middleware: ['auth-middleware'],
  roles: ['admin']
})
</script>


<style scoped>
.admin-dashboard {
  max-width: 900px;
  margin: 120px auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
  color: #222;
}

.section {
  margin-top: 40px;
}

h2 {
  font-size: 22px;
  margin-bottom: 15px;
  color: #111;
}

.event-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 15px;
}

.event-card {
  background: #ffffff;
  border-left: 5px solid #ff9800;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  transition: background 0.2s ease;
}

.event-card:hover {
  background: #fdf5e6;
}

.event-card.past {
  background: #f4f4f4;
  border-left-color: #999;
  opacity: 0.9;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s ease;
}

.delete-btn:hover {
  background: #d32f2f;
}

.news-list {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 15px;
}

.news-card {
  background: #fefefe;
  border-left: 4px solid #ff9800;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.news-card h3 {
  margin-bottom: 6px;
  font-size: 18px;
  color: #1a1a1a;
}

.news-date {
  font-size: 13px;
  color: #999;
}

.news-content {
  margin: 10px 0;
  font-size: 14px;
  color: #444;
}

.news-event {
  font-size: 13px;
  color: #f57c00;
  font-weight: 500;
}
.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.delete-news-btn {
  background: #f44336;
  color: white;
  border: none;
  padding: 6px 10px;
  font-size: 13px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.delete-news-btn:hover {
  background: #d32f2f;
}

</style>

