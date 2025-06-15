<template>
  <div class="news-create-page">
    <h1>Создать новость</h1>

    <form @submit.prevent="createNews" class="news-form" enctype="multipart/form-data">
      <!-- Заголовок -->
      <div class="form-field">
        <label for="title">Заголовок:</label>
        <input
          type="text"
          id="title"
          v-model="formData.title"
          required
          placeholder="Введите заголовок"
        />
      </div>

      <!-- Содержание -->
      <div class="form-field">
        <label for="content">Содержание:</label>
        <textarea
          id="content"
          v-model="formData.content"
          required
          placeholder="Введите содержание"
        ></textarea>
      </div>

      <!-- Мероприятие -->
      <div class="form-field">
        <label for="event_id">Мероприятие:</label>
        <select id="event_id" v-model="formData.event_id">
          <option :value="null">Нет привязки к мероприятию</option>
          <option v-for="event in events" :key="event.id" :value="event.id">
            {{ event.title }}
          </option>
        </select>
      </div>

      <!-- Изображение -->
      <div class="form-field">
        <label for="image">Изображение:</label>
        <input type="file" id="image" @change="handleFileUpload" accept="image/*" />
        <small v-if="selectedFileName">Выбрано: {{ selectedFileName }}</small>
      </div>

      <!-- Кнопка -->
      <button type="submit" class="submit-btn">Создать новость</button>
    </form>

    <!-- Сообщение -->
    <div v-if="message" :class="['message', message.type]">
      {{ message.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'
import { useRouter } from 'vue-router'

interface EventItem {
  id: number
  title: string
}

interface ApiResponse {
  status: string
  message?: string
  newsId?: number
}

const router = useRouter()

const formData = ref({
  title: '',
  content: '',
  event_id: null as number | null,
  image: null as File | null
})

const selectedFileName = ref('')
const message = ref<{ type: 'success' | 'error'; text: string } | null>(null)
const events = ref<EventItem[]>([])

onMounted(async () => {
  try {
    const token = localStorage.getItem('authToken')
    const { data, error } = await useFetch<{ status: string; data: EventItem[] }>('/api/events', {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (error.value || !data.value?.data) {
      throw new Error('Ошибка получения мероприятий')
    }

    events.value = data.value.data
  } catch (err: any) {
    console.error('Ошибка загрузки мероприятий:', err.message)
    message.value = { type: 'error', text: 'Не удалось загрузить мероприятия' }
  }
})

function handleFileUpload(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    formData.value.image = file
    selectedFileName.value = file.name
  }
}

async function createNews() {
  try {
    message.value = null
    const token = localStorage.getItem('authToken')
    if (!token) throw new Error('Вы не авторизованы')

    const form = new FormData()
    form.append('title', formData.value.title)
    form.append('content', formData.value.content)
    if (formData.value.event_id !== null) {
      form.append('event_id', formData.value.event_id.toString())
    }
    if (formData.value.image) {
      form.append('image', formData.value.image)
    }

    const response = await fetch('/api/news', {
      method: 'POST',
      body: form,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const result: ApiResponse = await response.json()

    if (!response.ok || result.status !== 'success') {
      throw new Error(result.message || 'Ошибка создания новости')
    }

    router.push('/news')
  } catch (err: any) {
    message.value = { type: 'error', text: err.message }
  }
}
</script>



<style scoped>
.news-create-page {
  max-width: 640px;
  margin: 100px auto;
  padding: 30px;
  background-color: #ffffff;
  border-left: 6px solid #ff9800;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  font-family: 'Segoe UI', sans-serif;
  color: #111;
}

h1 {
  font-size: 26px;
  margin-bottom: 20px;
  color: #222;
}

.news-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.form-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-weight: 600;
  color: #444;
}

input,
select,
textarea {
  padding: 10px 12px;
  border: 1px solid #bbb;
  border-radius: 6px;
  font-size: 15px;
  background-color: #f9f9f9;
  color: #222;
}

input:focus,
select:focus,
textarea:focus {
  outline: none;
  border-color: #ff9800;
  background-color: #fff;
}

textarea {
  resize: vertical;
  min-height: 100px;
}

small {
  font-size: 12px;
  color: #777;
}

.submit-btn {
  background-color: #ff9800;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.submit-btn:hover {
  background-color: #fb8c00;
}

.message {
  margin-top: 20px;
  padding: 12px;
  border-radius: 6px;
  font-size: 14px;
}

.message.success {
  background-color: #e0f2f1;
  color: #00695c;
}

.message.error {
  background-color: #ffebee;
  color: #c62828;
}
</style>

