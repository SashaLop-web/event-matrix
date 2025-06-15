<template>
  <button
    type="button"
    class="custom-button"
    :style="buttonStyle"
    @click="handleClick"
    :disabled="isProcessing"
  >
    <span class="label" :style="textStyle">
      {{ buttonLabel }}
    </span>
  </button>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'
import { computed, ref } from 'vue'

const props = defineProps<{
  width?: string
  height?: string
  fontSize?: string
  label?: string
}>()

const buttonWidth = computed(() => props.width || '300px')
const buttonHeight = computed(() => props.height || '60px')
const buttonFontSize = computed(() => props.fontSize || '16px')
const buttonLabel = computed(() => props.label || 'Организовать мероприятие')

const router = useRouter()
const userStore = useUserStore()
const user = computed(() => userStore.user)
const isProcessing = ref(false)

const handleClick = async () => {
  if (isProcessing.value) return
  isProcessing.value = true

  try {
    if (!user.value) {
      return router.push('/register')
    }

    const isAllowed = user.value.role === 'admin' || user.value.role === 'manager'
    if (!isAllowed) {
      alert('Только администраторы и менеджеры могут организовывать мероприятия.')
      return
    }

    router.push('/events/create')
  } finally {
    isProcessing.value = false
  }
}

const buttonStyle = computed(() => ({
  width: buttonWidth.value,
  height: buttonHeight.value,
}))

const textStyle = computed(() => ({
  fontSize: buttonFontSize.value,
}))
</script>

<style scoped>
.custom-button {
  display: flex;
  align-items: center;
  max-width: 100%;

  justify-content: center;
  background-color: #ed9121;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  font-family: Arial, sans-serif;
  transition: background-color 0.3s ease;
  padding: 0 20px;
}

.custom-button:hover {
  background-color: #e0851a;
}

.custom-button:disabled {
  background-color: #bbb;
  cursor: not-allowed;
}

.label {
  color: white;
  font-weight: 500;
  letter-spacing: 0.1px;
  white-space: normal; /* ← разрешаем перенос строк */
  text-align: center;   /* выравниваем по центру */
  line-height: 1.3;     /* чуть больше межстрочный интервал */
}


/* адаптивность для маленьких экранов */
@media (max-width: 480px) {
  .custom-button {
    width: 100% !important;
    height: 48px !important;
  }

  .label {
    font-size: 14px !important;
  }
}
</style>
