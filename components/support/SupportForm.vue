<template>
  <section class="support-form-section">
    <img class="bg" src="@/assets/img/background/HomeHeroSection-bg.png" alt="Фоновое изображение">
    <div class="container">
      <h2>Остались вопросы?</h2>
      <p>Заполните форму ниже и мы ответим в ближайшее время</p>

      <form @submit.prevent="submitTicket" class="support-form">
        <input type="text" placeholder="Ваше имя" v-model="form.name" required />
        <input type="email" placeholder="Email" v-model="form.email" required />
        <select v-model="form.topic" required>
          <option disabled value="">Выберите тему</option>
          <option value="bug">Ошибка в работе</option>
          <option value="question">Общий вопрос</option>
          <option value="feature">Предложить функцию</option>
          <option value="other">Другое</option>
        </select>
        <textarea
          v-model="form.message"
          placeholder="Опишите вашу проблему или запрос"
          rows="5"
        ></textarea>

        <button type="submit" :disabled="isSubmitting" class="submit-btn">
          {{ isSubmitting ? 'Отправка...' : 'Отправить запрос' }}
        </button>

        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const form = ref({
  name: '',
  email: '',
  topic: '',
  message: ''
})

const isSubmitting = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

const submitTicket = async () => {
  errorMessage.value = ''
  successMessage.value = ''

  if (!form.value.name || !form.value.email || !form.value.message || !form.value.topic) {
    errorMessage.value = 'Пожалуйста, заполните все поля'
    return
  }

  isSubmitting.value = true

  try {
    const res = await fetch('https://formspree.io/f/mnnvdyjn', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form.value),
    })

    if (!res.ok) throw new Error('Ошибка при отправке. Попробуйте позже.')

    successMessage.value = 'Спасибо! Ваш запрос успешно отправлен.'
    form.value = { name: '', email: '', topic: '', message: '' }
  } catch (err) {
    errorMessage.value = err.message || 'Не удалось отправить форму'
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.support-form-section {
  background-color: #212121;
  padding: 80px 20px;
  position: relative;
  overflow: hidden;
  text-align: center;
  color: #f5f5f5;
}

.support-form-section .bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.1;
  z-index: 0;
}

.support-form-section .container {
  position: relative;
  max-width: 700px;
  margin: 0 auto;
  padding: 0 20px;
  z-index: 1;
}

.support-form-section h2 {
  font-size: 36px;
  font-weight: 700;
  color: #ebebeb;
  margin-bottom: 20px;
}

.support-form-section p {
  color: #ccc;
  margin-bottom: 30px;
}

.support-form {
  display: flex;
  flex-direction: column;
  gap: 20px;

  border-radius: 12px;
  padding: 30px;
  text-align: left;
  color: #212121;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.support-form input,
.support-form select,
.support-form textarea {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid #bbb;
  border-radius: 8px;
  font-size: 15px;
  background-color: #fff;
  color: #212121;
  transition: border-color 0.3s ease;
}

.support-form input::placeholder,
.support-form textarea::placeholder {
  color: #888;
}

.support-form input:focus,
.support-form select:focus,
.support-form textarea:focus {
  border-color: #ff9800;
  outline: none;
}

.support-form button.submit-btn {
  padding: 14px;
  background-color: #ff9800;
  color: #fff;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.support-form button.submit-btn:hover {
  background-color: #f48024;
}

.support-form button.submit-btn:disabled {
  background-color: #888;
  cursor: not-allowed;
}

.success-message {
  margin-top: 10px;
  color: #4caf50;
  font-weight: 500;
}

.error-message {
  margin-top: 10px;
  color: #f44336;
  font-weight: 500;
}

@media (max-width: 768px) {
  .support-form-section h2 {
    font-size: 28px;
  }

  .support-form {
    padding: 25px;
  }

  .support-form input,
  .support-form select,
  .support-form textarea {
    font-size: 14px;
  }

  .support-form button.submit-btn {
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .support-form {
    padding: 20px;
  }

  .support-form h3 {
    font-size: 20px;
  }

  .support-form p {
    font-size: 14px;
  }

  .support-form input,
  .support-form select,
  .support-form textarea {
    padding: 12px 14px;
  }
}


</style>
