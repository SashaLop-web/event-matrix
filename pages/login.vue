<template>
  <div class="login-container">
    <h1>Вход в систему</h1>
    <form @submit.prevent="handleLogin" class="login-form">
      <!-- Поле для email -->
      <div class="form-group">
        <label>Email:</label>
        <input
          v-model="email"
          type="email"
          placeholder="Введите email"
          required
          class="form-input"
        />
      </div>

      <!-- Поле для пароля -->
      <div class="form-group">
        <label>Пароль:</label>
        <input
          v-model="password"
          type="password"
          placeholder="Введите пароль"
          required
          class="form-input"
        />
      </div>

      <!-- Кнопка "Войти" -->
      <button type="submit" class="submit-btn" :disabled="loading">
        {{ loading ? 'Вход...' : 'Войти' }}
      </button>

      <!-- Сообщение об ошибке -->
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <!-- Ссылка на страницу регистрации -->
      <div class="register-link">
        Нет аккаунта? <NuxtLink to="/register">Зарегистрируйтесь</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'
import { useFetch } from '#app'

const router = useRouter()
const userStore = useUserStore()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const loading = ref(false)

const handleLogin = async () => {
  try {
    loading.value = true
    errorMessage.value = ''

    const { data, error } = await useFetch('/api/auth/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    })

    if (error.value || !data.value) {
      throw new Error(error.value?.data?.message || 'Ошибка входа')
    }

    const { token, user } = data.value

    localStorage.setItem('authToken', token)
    localStorage.setItem('user', JSON.stringify(user))
    userStore.setUser(user)

    const routeMap: Record<string, string> = {
      admin: '/admin-dashboard',
      manager: '/manager-dashboard',
      employee: '/profile',
    }

    await router.push(routeMap[user.role] || '/profile')
  } catch (err: any) {
    errorMessage.value = err.message || 'Произошла ошибка'
    console.error('Ошибка входа:', err)
  } finally {
    loading.value = false
  }
}
</script>


<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background: #ffffff;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-input {
  padding: 0.8rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: #42b983;
  outline: none;
}

.submit-btn {
  background: #42b983;
  color: white;
  padding: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.submit-btn:hover {
  background: #369f6e;
}

.submit-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #ff4444;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

.register-link {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 0.9rem;
}

.register-link a {
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
}

.register-link a:hover {
  text-decoration: underline;
}
</style>
