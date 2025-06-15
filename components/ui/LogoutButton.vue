<template>
    <button @click="logout" class="logout-button">
      Выйти
    </button>
  </template>
  
  <script setup lang="ts">
  import { useUserStore } from '~/stores/user';
  import { useRouter } from 'vue-router';
  
  const userStore = useUserStore();
  const router = useRouter();
  
  function logout() {
    userStore.clearUser(); // Очищаем данные пользователя
    router.push('/login'); // Перенаправляем на страницу входа
  }
  </script>
  
  <style scoped>
  .logout-button {
    margin-top: 20px;
    padding: 10px 20px;
    background-color: #ff4d4d;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .logout-button:hover {
    background-color: #e63939;
  }
  </style>