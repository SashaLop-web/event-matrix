<template>
  <div class="register-container">
    <h2>Регистрация</h2>
    <form @submit.prevent="handleRegister" class="register-form">
      <!-- Email -->
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

      <!-- Полное имя -->
      <div class="form-group">
        <label>Полное имя:</label>
        <input
          v-model="full_name"
          type="text"
          placeholder="Введите полное имя"
          required
          class="form-input"
        />
      </div>

      <!-- ID должности -->
      <div class="form-group">
        <label>ID должности:</label>
        <input
          v-model="position_id"
          type="number"
          placeholder="Введите ID должности"
          required
          class="form-input"
        />
      </div>

      <!-- ID отдела -->
      <div class="form-group">
        <label>ID отдела (опционально):</label>
        <input
          v-model="department_id"
          type="number"
          placeholder="Введите ID отдела"
          class="form-input"
        />
      </div>

      <!-- Пароль -->
      <div class="form-group">
        <label>Пароль:</label>
        <input
          v-model="password"
          type="password"
          placeholder="Введите пароль"
          required
          minlength="6"
          class="form-input"
        />
      </div>

      <!-- Подтверждение пароля -->
      <div class="form-group">
        <label>Подтвердите пароль:</label>
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Повторите пароль"
          required
          class="form-input"
        />
      </div>

      <!-- Роль -->
      <div class="form-group">
        <label>Роль пользователя:</label>
        <select v-model="role" class="form-input">
          <option value="employee">Сотрудник</option>
          <option value="manager">Менеджер</option>
          <option value="admin">Администратор</option>
        </select>
      </div>

      <button
        type="submit"
        class="submit-btn"
        :disabled="loading || !isFormValid"
      >
        {{ loading ? 'Регистрация...' : 'Зарегистрироваться' }}
      </button>

      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>

      <div class="login-link">
        Уже есть аккаунт? <NuxtLink to="/login">Войти</NuxtLink>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useFetch } from '#app'

const router = useRouter()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const full_name = ref('')
const position_id = ref('')
const department_id = ref('')
const role = ref<'employee' | 'manager' | 'admin'>('employee')

const errorMessage = ref('')
const loading = ref(false)

const isFormValid = computed(() => {
  return (
    email.value.trim() &&
    password.value &&
    confirmPassword.value &&
    full_name.value.trim() &&
    position_id.value &&
    password.value === confirmPassword.value &&
    password.value.length >= 6 &&
    (!department_id.value || !isNaN(Number(department_id.value)))
  )
})

const validateForm = (): boolean => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = 'Пароли не совпадают'
    return false
  }
  if (password.value.length < 6) {
    errorMessage.value = 'Пароль должен быть не менее 6 символов'
    return false
  }
  if (department_id.value && isNaN(Number(department_id.value))) {
    errorMessage.value = 'ID отдела должен быть числом'
    return false
  }
  if (!position_id.value || isNaN(Number(position_id.value))) {
    errorMessage.value = 'ID должности должен быть числом'
    return false
  }
  errorMessage.value = ''
  return true
}

const handleRegister = async () => {
  if (!validateForm()) return

  try {
    loading.value = true

    const { data, error } = await useFetch('/api/auth/register', {
      method: 'POST',
      body: {
        email: email.value.trim(),
        password: password.value,
        full_name: full_name.value.trim(),
        position_id: Number(position_id.value),
        department_id: department_id.value ? Number(department_id.value) : null,
        role: role.value
      }
    })

    if (error.value) {
      throw new Error(error.value.data?.message || 'Ошибка регистрации')
    }

    alert('Вы успешно зарегистрировались!')
    await router.push('/login')
  } catch (err: any) {
    errorMessage.value = err.message.includes('email')
      ? 'Пользователь с таким email уже существует'
      : err.message || 'Ошибка сервера'
    console.error('Ошибка регистрации:', err)
  } finally {
    loading.value = false
  }
}
</script>


<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 100px;
}

.register-form {
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
  box-shadow: 0 0 5px rgba(66, 185, 131, 0.5);
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

.submit-btn:disabled {
  background: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: #ff4444;
  margin-top: 1rem;
  text-align: center;
}

.login-link {
  margin-top: 1.5rem;
  text-align: center;
}

.login-link a {
  color: #42b983;
  text-decoration: none;
  font-weight: 500;
}

@media (max-width: 600px) {
  .register-container {
    padding: 1rem;
    margin-top: 50px;
  }

  .form-input {
    font-size: 0.9rem;
    padding: 0.7rem;
  }

  .submit-btn {
    font-size: 0.9rem;
    padding: 0.8rem;
  }
}
</style>