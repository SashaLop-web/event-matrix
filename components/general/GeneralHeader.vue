<template>
  <header class="header">
    <div class="container">
      <!-- Логотип -->
      <div class="logo">
        <img src="/assets/img/icons/header/logo.svg" alt="Логотип компании">
      </div>

      <!-- Навигация -->
      <nav class="nav" :class="{ active: isMenuOpen }">
        <NuxtLink to="/" class="nav-link">Главная</NuxtLink>
        <NuxtLink to="/about" class="nav-link">О компании</NuxtLink>
        <NuxtLink to="/news" class="nav-link">Новости</NuxtLink>
        <NuxtLink to="/support" class="nav-link">Поддержка</NuxtLink>
      </nav>

      <!-- Кнопка бургера для мобильных устройств -->
      <div class="menu-toggle" @click="toggleMenu">
        <img src="/assets/img/icons/header/menu.svg" alt="Меню">
      </div>

      <!-- Правая часть -->
      <div class="right-side">
        <CallBtn class="CallBtn"  :width="'210px'" :fontSize="'14px'"/>
        <div class="personal">
          <div class="notice" @click="openNotice">
            <img src="/assets/img/icons/header/notice.svg" alt="Уведомление">
          </div>
          <div class="office" @click="openAccount">
            <img src="/assets/img/icons/header/user.svg" alt="Личный кабинет" class="user-icon">
          </div>
        </div>
      </div>
    </div>

    <!-- Модальные окна -->
    <Notice
      v-if="isNoticeOpen"
      :notifications="notifications"
      @close="closeNotice"
    />

    <PersonalAccount
      v-if="isAccountOpen"
      :isOpen="isAccountOpen"
      @close="closeAccount"
      @login="handleLogin"
      @register="handleRegister"
    />
  </header>
</template>

<script setup>
import { ref } from 'vue';
import { useFetch } from '#app';
import Notice from '@/components/ui/Notice.vue';
import PersonalAccount from '@/components/ui/PersonalAccount.vue';
import CallBtn from '@/components/ui/CallBtn.vue';

// Состояния модальных окон
const isNoticeOpen = ref(false);
const isAccountOpen = ref(false);
const isMenuOpen = ref(false); // Для бургер-меню
const notifications = ref([]); // даже если их ещё нет

// Загрузка уведомлений при открытии модалки
const fetchNotifications = async () => {
  try {
    const token = localStorage.getItem('authToken');
    if (!token) throw new Error('Не авторизован');

    const { data, error } = await useFetch('/api/notifications', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!error.value && data.value?.notifications) {
      notifications.value = data.value.notifications;
    } else {
      notifications.value = [];
    }
  } catch (err) {
    console.error('Ошибка загрузки уведомлений:', err);
    notifications.value = [];
  }
};

// Управление меню
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

// Управление уведомлениями
const openNotice = async () => {
  await fetchNotifications();
  isNoticeOpen.value = true;
  isAccountOpen.value = false;
};

const closeNotice = () => {
  isNoticeOpen.value = false;
};

// Управление аккаунтом
const openAccount = () => {
  isAccountOpen.value = true;
  isNoticeOpen.value = false;
};

const closeAccount = () => {
  isAccountOpen.value = false;
};

// Обработчики авторизации
const handleLogin = () => {
  console.log('Переход на страницу входа');
  closeAccount();
};

const handleRegister = () => {
  console.log('Переход на страницу регистрации');
  closeAccount();
};
</script>

<style src="~/components/general/GeneralHeader.scss" lang="scss" scoped></style>
