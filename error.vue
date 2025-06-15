<template>
  <NuxtLayout>
    <div class="error">
      <div class="error__content">
        <div class="error__code">
          {{ error?.statusCode || 'Ошибка' }}
        </div>
        <div class="error__message">
          {{ messages[error?.statusCode] || 'Произошла непредвиденная ошибка' }}
        </div>
        <NuxtLink to="/" class="error__back">
          На главную
        </NuxtLink>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const { error } = defineProps({
  error: {
    type: Object,
    default: () => ({}),
  },
})

const messages = {
  404: 'Страница не найдена',
  500: 'Внутренняя ошибка сервера',
  401: 'Доступ запрещён. Требуется авторизация',
}
</script>

<style lang="scss">
.error {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  min-height: 80vh;

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  &__code {
    font-size: 100px;
    font-weight: 700;
    line-height: 100%;
    margin: 0 0 10px 0;
  }

  &__message {
    font-size: 16px;
    line-height: 140%;
    margin: 0 0 20px 0;
    text-align: center;
    max-width: 300px;
  }

  &__back {
    color: #42b983;
    text-decoration: underline;
    font-weight: 500;
  }
}
</style>
