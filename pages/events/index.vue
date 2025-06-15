<template>
  <div class="events-list-page">
    <h1>Список мероприятий</h1>

    <!-- Список мероприятий -->
    <ul v-if="events.length > 0" class="events-list">
      <li v-for="event in events" :key="event.id" class="event-item">
        <h3>{{ event.title }}</h3>
        <p><strong>Тип:</strong> {{ event.type }}</p>
        <p><strong>Дата:</strong> {{ formatDate(event.event_date) }}</p>
        <p><strong>Место:</strong> {{ event.location || 'Не указано' }}</p>
      </li>
    </ul>

    <!-- Сообщение, если мероприятий нет -->
    <p v-else>Список мероприятий пуст.</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'

interface EventItem {
  id: number
  title: string
  type: string
  event_date: string
  location?: string | null
}

interface ApiResponse {
  status: string
  data: EventItem[]
}

const events = ref<EventItem[]>([])
const loading = ref(true)
const errorMessage = ref('')

onMounted(async () => {
  try {
    const { data, error } = await useFetch<ApiResponse>('/api/events')

    if (error.value) {
      throw new Error(error.value.data?.message || 'Ошибка получения мероприятий')
    }

    events.value = data.value?.data || []
  } catch (err: any) {
    errorMessage.value = err.message
    console.error('Ошибка загрузки мероприятий:', err)
  } finally {
    loading.value = false
  }
})

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>


<style scoped>
.events-list-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.events-list {
  list-style: none;
  padding: 0;
}

.event-item {
  background: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 15px;
  margin-bottom: 15px;
}

.event-item h3 {
  margin: 0 0 10px;
}

.event-item p {
  margin: 5px 0;
}
</style>
