<template>
  <div class="news-detail" v-if="news">
    <h1>{{ news.title }}</h1>
    <p class="published">Опубликовано: {{ formatDate(news.published_at) }}</p>

    <img
      v-if="news.image_url"
      :src="news.image_url"
      :alt="news.title"
      class="news-image"
    />

    <p class="content">{{ news.content }}</p>

    <div v-if="news.event_id" class="event-info">
      <h2>Связанное мероприятие:</h2>
      <ul>
        <li v-if="news.event_date">
  <strong>📅 Дата и время:</strong> {{ formatDateTime(news.event_date) }}
</li>

        <li><strong>🏷️ Тип:</strong> {{ formatEventType(news.event_type) }}</li>
        <li><strong>📍 Место:</strong> {{ news.event_location || 'не указано' }}</li>
        <li v-if="news.event_location_comment">
          <strong>🗒️ Комментарий:</strong> {{ news.event_location_comment }}
        </li>
        <li v-if="news.event_description">
          <strong>📝 Описание:</strong> {{ news.event_description }}
        </li>
        <li><strong>👤 Организатор ID:</strong> {{ news.organizer_id }}</li>
      </ul>
    </div>
  </div>

  <p v-else-if="pending">Загрузка...</p>
  <p v-else-if="errorMessage" class="error-message">{{ errorMessage }}</p>
</template>

<script setup lang="ts">
import { useRoute, useFetch, showError } from '#imports'

interface News {
  id: number
  title: string
  content: string
  published_at: string
  image_url?: string
  event_id?: number
  event_date?: string
  event_type?: string
  event_location?: string
  event_location_comment?: string
  event_description?: string
  organizer_id?: number
}

interface ApiResponse {
  status: string
  data: News
}

const route = useRoute()
const id = route.params.id?.toString()

if (!id || isNaN(Number(id))) {
  throw showError({ statusCode: 400, message: 'Некорректный ID новости' })
}

const { data, pending, error } = await useFetch<ApiResponse>(`/api/news/${id}`)

if (error.value) {
  throw showError({
    statusCode: (error.value as any)?.statusCode || 500,
    message: (error.value as any)?.data?.message || 'Новость не найдена'
  })
}

const news = data.value?.data ?? null

function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

function formatEventType(type?: string): string {
  const types: Record<string, string> = {
    meeting_individual: 'Встреча с сотрудниками',
    meeting_department: 'Встреча по отделу',
    teambuilding: 'Тимбилдинг',
    training: 'Обучение / Воркшоп',
    corporate: 'Корпоративный праздник',
    presentation: 'Презентация / Конференция'
  }
  return types[type || ''] || 'Неизвестно'
}
</script>



<style scoped>
.news-detail {
  max-width: 800px;
  margin: 140px auto;
  padding: 20px;
  font-family: 'Segoe UI', sans-serif;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
}

.news-detail h1 {
  font-size: 28px;
  margin-bottom: 10px;
  color: #222;
}

.published {
  font-size: 14px;
  color: #888;
  margin-bottom: 20px;
}

.news-image {
  max-width: 100%;
  border-radius: 8px;
  margin: 20px 0;
  object-fit: cover;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.content {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  white-space: pre-line;
  margin-bottom: 30px;
}

.event-info {
  background: #f8fcf8;
  border-left: 4px solid #4caf50;
  padding: 20px 25px;
  border-radius: 10px;
  margin-top: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.event-info h2 {
  margin-bottom: 12px;
  font-size: 20px;
  color: #333;
}

.event-info ul {
  list-style: none;
  padding-left: 0;
  margin: 0;
}

.event-info li {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  margin-bottom: 10px;
  font-size: 15px;
  color: #444;
  line-height: 1.4;
}

.event-info li strong {
  min-width: 150px;
  display: inline-block;
  color: #2e7d32;
}

.error-message {
  color: #d33;
  text-align: center;
  margin-top: 50px;
  font-size: 16px;
}

</style>
