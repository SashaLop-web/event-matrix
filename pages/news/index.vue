<template>
  <div class="news-list-page">
    <h1 class="page-title">Последние новости</h1>

    <div v-if="pending" class="loader">Загрузка новостей...</div>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <p v-else-if="!news.length && !pending" class="no-news">Новостей пока нет.</p>

    <transition-group name="fade" tag="ul" class="news-list" v-else>
      <li v-for="item in news" :key="item.id" class="news-item">
        <NuxtLink :to="`/news/${item.id}`" class="news-link">
          <div class="news-card">
            <div class="news-content">
              <h3 class="news-title">{{ item.title }}</h3>
              <p class="news-preview">{{ truncateText(item.content, 200) }}</p>
            </div>
            <div class="news-footer">
              <span class="news-date">🕒 {{ formatDate(item.published_at) }}</span>
            </div>
          </div>
        </NuxtLink>
      </li>
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useFetch } from '#app'

interface NewsItem {
  id: number
  title: string
  content: string
  published_at: string
}

const { data, pending, error } = await useFetch<{ status: string; data: NewsItem[] }>('/api/news')
const news = computed(() => data.value?.data || [])
const errorMessage = computed(() => error.value?.data?.message || null)

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

function truncateText(text: string, maxLength: number): string {
  const clean = text.replace(/\s+/g, ' ').trim()
  return clean.length <= maxLength ? clean : clean.slice(0, maxLength) + '…'
}
</script>

<style scoped>
.news-list-page {
  max-width: 900px;
  margin: 140px auto 60px;
  padding: 0 20px;
  font-family: 'Segoe UI', sans-serif;
}

.page-title {
  text-align: center;
  font-size: 32px;
  color: #333;
  margin-bottom: 40px;
}

.loader,
.no-news,
.error-message {
  text-align: center;
  font-size: 18px;
  color: #888;
}

.error-message {
  color: #d33;
}

.news-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  padding: 0;
  margin: 0;
}

.news-item {
  list-style: none;
}

.news-link {
  text-decoration: none;
  color: inherit;
  display: block;
  height: 100%;
}

.news-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff;
  border: 1px solid #e0e0e0;
  transition: box-shadow 0.3s ease;
  box-sizing: border-box;
}

.news-card:hover {
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.news-title {
  font-size: 18px;
  margin-bottom: 10px;
  font-weight: 600;
  color: #222;
}

.news-preview {
  font-size: 14px;
  color: #555;
  line-height: 1.5;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
}

.news-footer {
  margin-top: auto;
  font-size: 13px;
  color: #888;
  padding-top: 10px;
}
</style>
