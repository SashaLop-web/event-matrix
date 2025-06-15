<template>
  <footer class="footer">
    <div class="bottom">
      <!-- Логотип -->
      <div class="logo-wrapper">
        <img src="/assets/img/icons/footer/logo.svg" alt="Логотип EventMatrix" class="logo" />
      </div>

      <!-- Ссылки -->
      <div class="links">
        <h3>Ссылки</h3>
        <ul class="nav-list">
          <li><NuxtLink to="/" class="nav-link">Главная</NuxtLink></li>
          <li><NuxtLink to="/#timeline" class="nav-link">Как это работает</NuxtLink></li>
          <li><NuxtLink to="/" class="nav-link">Примеры мероприятий</NuxtLink></li>
          <li><NuxtLink to="/" class="nav-link">О платформе</NuxtLink></li>
          <li><NuxtLink to="/" class="nav-link">Новости</NuxtLink></li>
          <li><NuxtLink to="/" class="nav-link">Поддержка</NuxtLink></li>
        </ul>
      </div>

      <!-- Контакты -->
      <div class="contacts">
        <h3>Контакты</h3>
        <ul>
          <li><a href="mailto:info@eventmatrix.com">info@eventmatrix.com</a></li>
          <li><a href="tel:+78001234567">+7 (800) 123-45-67</a></li>
          <li>г. Москва, ул. Технологическая, д. 10</li>
        </ul>
      </div>

      <!-- Соцсети -->
      <div class="social">
        <h3>Мы в соцсетях</h3>
        <div class="social-icons">
          <a href="#"><img src="/assets/img/icons/footer/telegram.svg" alt="Telegram"></a>
          <a href="#"><img src="/assets/img/icons/footer/viber.svg" alt="Viber"></a>
          <a href="#"><img src="/assets/img/icons/footer/vk.svg" alt="VK"></a>
        </div>
      </div>
    </div>

    <!-- Нижний колонтитул -->
    <div class="copyright">
      <p>© 2024 EventMatrix. Все права защищены</p>
      <nav>
        <NuxtLink to="/" class="policy-link">Политика конфиденциальности</NuxtLink>
        <NuxtLink to="/" class="policy-link">Пользовательское соглашение</NuxtLink>
      </nav>
      <div class="company-details">
        <p>ООО «ЭвентМатрикс»</p>
        <p>ОГРН 1234567890123</p>
        <p>ИНН 1234567890</p>
      </div>
    </div>
  </footer>
</template>
<style src="~/components/general/GeneralFooter.scss" lang="scss" scoped></style>