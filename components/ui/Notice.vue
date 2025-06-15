<template>
  <Teleport to="body">
    <div 
      class="backdrop"
      @click.self="close"
      @keydown.esc="close"
      role="dialog"
      aria-modal="true"
    >
      <transition name="modal">
        <div class="modal">
          <button class="close-btn" @click="close" aria-label="Закрыть">
            &times;
          </button>
          <div class="content">
            <h2 class="modal-title">Ваши уведомления</h2>
            <div v-if="notifications.length === 0">
              <p class="empty">На данный момент нет уведомлений.</p>
            </div>
            <ul v-else class="notification-list">
              <li
                v-for="n in notifications"
                :key="n.id"
                class="notification-item"
                :class="{ unread: !n.is_read }"
                @click="markAsReadAndGo(n.id)"
              >
                <p class="message">{{ n.message }}</p>
                <p v-if="n.title" class="title">Мероприятие: <strong>{{ n.title }}</strong></p>
                <p v-if="n.event_date" class="date">Дата: {{ formatDateTime(n.event_date) }}</p>
                <small v-if="n.created_at" class="timestamp">{{ new Date(n.created_at).toLocaleString('ru-RU') }}</small>
              </li>
            </ul>

            <button class="all-notifications-btn" @click="goToNotifications">
              Перейти ко всем уведомлениям
            </button>
          </div>
        </div>
      </transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface Notification {
  id: number
  message: string
  is_read: boolean
  created_at?: string
  event_date?: string
  title?: string
}

const props = defineProps<{ notifications: Notification[] }>()
const emit = defineEmits(['close'])

const close = () => emit('close')

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Escape') close()
}

const lockScroll = () => {
  document.body.style.overflow = 'hidden'
}
const unlockScroll = () => {
  document.body.style.overflow = ''
}

const goToNotifications = () => {
  close()
  router.push('/notifications/')
}

const markAsReadAndGo = async (id: number) => {
  try {
    const token = localStorage.getItem('authToken')
    if (token) {
      await fetch('/api/notifications/read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ ids: [id] })
      })
    }
  } catch (err) {
    console.error('Ошибка при отметке как прочитанного:', err)
  } finally {
    close()
    router.push(`/notifications/${id}`)
  }
}

const formatDateTime = (dateStr?: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(() => {
  lockScroll()
  window.addEventListener('keydown', handleKeydown)
})

onBeforeUnmount(() => {
  unlockScroll()
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped lang="scss">
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding-top: 40px;
  z-index: 1000;
}

.modal {
  background: #fff;
  color: #222;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  position: relative;
  margin-top: 60px;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.close-btn {
  position: absolute;
  top: 12px;
  right: 12px;
  font-size: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #888;
}
.close-btn:hover {
  color: #111;
}

.modal-title {
  font-size: 22px;
  text-align: center;
  margin-bottom: 20px;
  color: #111;
}

.notification-list {
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 300px;
  overflow-y: auto;
}

.notification-item {
  padding: 12px 10px;
  border-bottom: 1px solid #ddd;
  font-size: 15px;
  background: #f5f5f5;
  border-radius: 6px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &.unread {
    background: #fff3e0;
    border-left: 4px solid #ff9800;
    font-weight: 500;
  }

  &:hover {
    background-color: #e0e0e0;
  }

  .message {
    color: #222;
  }

  .title,
  .date {
    margin: 2px 0;
    font-size: 14px;
    color: #444;
  }

  .timestamp {
    display: block;
    margin-top: 6px;
    font-size: 12px;
    color: #999;
    text-align: right;
  }
}

.empty {
  text-align: center;
  color: #666;
  font-size: 14px;
}

.all-notifications-btn {
  margin-top: 20px;
  background-color: #ff9800;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.all-notifications-btn:hover {
  background-color: #fb8c00;
}
</style>
