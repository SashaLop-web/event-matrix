<template>
  <div class="menu-container" v-if="isMenuOpen" :class="{ 'closing': isClosing }">
    <!-- Левая область -->
    <div class="left-area">
      <!-- 1. Ваш город -->
      <div class="city-block">
        <span class="city-label">Ваш город:</span>
        <img src="@/assets/img/icons/components-page/location-icon.png" alt="Иконка" class="location-icon" />
        <span class="city-name">{{ selectedCity }}</span>
      </div>

      <!-- 2. Логотип -->
      <NuxtLink to="/" class="NuxtLink" @click="closeMenu">
        <div class="logo-block">
          <img src="@/assets/img/icons/components-page/logo.png" alt="Логотип" class="logo" />
        </div>
      </NuxtLink>

      <!-- 3. Линия -->
      <div class="divider"></div>

      <!-- 4. Блок с номерами телефонов -->
      <div class="phone-block">
        <img src="@/assets/img/icons/components-page/phone-icon.png" alt="Иконка" class="icon" />
        <div class="phone-numbers">
          <span class="number1">8 (800) 700-51-53</span>
          <span class="number2">+7 (965) 226-57-90</span>
        </div>
      </div>

      <!-- 5. Блок с временем работы -->
      <div class="work-time-block">
        <img src="@/assets/img/icons/components-page/service-icon.png" alt="Иконка" class="icon" />
        <span>Принимаем звонки ежедневно с 8:00 до 20:00 (по МСК)</span>
      </div>

      <!-- 6. Блок с электронной почтой -->
      <div class="email-block">
        <img src="@/assets/img/icons/components-page/email-icon.png" alt="Иконка" class="icon" />
        <span>info@standart-express.ru</span>
      </div>

      <!-- 7. Блок с режимом работы -->
      <div class="work-mode-block">
        <img src="@/assets/img/icons/components-page/clock-icon.png" alt="Иконка" class="icon" />
        <span>Выполняем заказы: 24/7</span>
      </div>

      <!-- 8. Линия -->
      <div class="divider"></div>

      <!-- 9. Блок с текстом и изображениями -->
      <div class="text-block">
        <div class="text-item">
          <img src="@/assets/img/icons/components-page/WhatsApp.png" alt="Иконка" class="icon" />
          <span >WhatsApp</span>
        </div>
        <div class="text-item">
          <img src="@/assets/img/icons/components-page/Telegram.png" alt="Иконка" class="icon" />
          <span >Telegram</span>
        </div>
      </div>

      <!-- 10. Кнопка -->
      <CallBtn class="call-btn" />

      <!-- 11. Политика конфиденциальности -->
      
      <div class="legal-info">
        <!-- Политика конфиденциальности -->
        <div class="policy-link">
          <span>Политика конфиденциальности</span>
        </div>

        <!-- Пользовательское соглашение -->
        <div class="terms-link">
          <span>Пользовательское соглашение</span>
        </div>

        <!-- Копирайт -->
        <div class="copyright">
          <span>© 2024 Стандарт Экспресс. Все права защищены</span>
        </div>
      </div>
    </div>

    <!-- Правая область -->
    <div class="right-area">
      <ServiceBlocks/>
      <img
      src="~/assets/img/icons/components-page/close-big.png"
      class="close"
      alt="Закрыть"
      @click="closeMenu"
    />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CallBtn from './CallBtn.vue';
import ServiceBlocks from './ServiceBlocks.vue';
import { selectedCity } from '~/composables/global';

// Определение props
const props = defineProps({
  isMenuOpen: {
    type: Boolean,
    required: true,
    default: false,
    },
});

const isClosing = ref(false);

const emit = defineEmits(['close']);

function closeMenu() {
  // Устанавливаем флаг закрытия
  isClosing.value = true;

  // Ждём завершения анимации (1500ms)
  setTimeout(() => {
    isClosing.value = false;
    emit('close'); // Уведомляем родителя о закрытии
  }, 950);
}

</script>

<style scoped>


.menu-container {
  display: flex;
  position: absolute;
  width: 1600px;
  max-height: 100vh;
  overflow-y: auto;
  animation: 1500ms ease slide-in;
  top: 0;
  left: 0;
}

.menu-container.closing {
  /* Анимация исчезновения */
  animation: 1000ms ease slide-out;
}

/* Левая область */
.left-area {
  width: 385px;
  height: 1040px;
  background-color: #242424;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 20px;
  color: #ffffff;
}

.city-block {
  margin-top: 28px;
  margin-left: 2px;
  display: flex;
  align-items: center;
  gap: 5px;
  color: #ffffffb2;
}

.city-label {
  margin-right: 9px;
  font-size: 16px;
  font-weight: lighter;
}

.location-icon {
  margin-top: 2px;
  margin-right: 1px;
}

.city-name {
  position: relative; /* Для позиционирования линии */
  cursor: pointer; /* Курсор "рука" */
  font-size: 18px;
  font-weight: 400;
  color: #ffffffb2;
}

.city-name::after {
  content: ''; /* Создаем псевдоэлемент для линии */
  position: absolute;
  left: 50%; /* Начинаем от центра родительского элемента */
  bottom: -2px; /* Расположение линии под текстом */
  width: 94%; /* Линия короче длины текста */
  height: 2px; /* Толщина линии */
  background-image: linear-gradient(
    to right,
    #ffffff96 75%, /* Цветная часть (50% ширины) */
    transparent 25% /* Прозрачная часть (50% ширины) */
  );
  background-size: 6px 2px; /* Размер одного пунктира (3px цвет + 3px пробел) */
  transform: translateX(-50%); /* Сдвигаем линию влево на 50% её ширины */
}

.logo-block {
  margin: 7px 0 11px 1px ;
  transition: all 450ms ease;
}
.logo-block:hover {
  transform: scale(1.1) translate(15px, 3px);
}

.divider {
  width: 339px;
  height: 1px;
  background-color: #5b5b5b;
}
.icon{
    margin-left: 1px;
}
.phone-block,
.work-time-block,
.email-block,
.work-mode-block {
    
    display: flex;
    align-items: center;
    gap: 10px;
}
.phone-block{
    margin-top: 12px;
}
.phone-numbers {
  display: flex;
  flex-direction: column;
  font-size: 18px;
  letter-spacing: 0.1px;
  color: #ffffff;
  font-weight: 400;
}
.number1{
    margin-left: 10px;
}
.number2{
    margin-top: 5px;
    margin-left: 2px;
}

.work-time-block span,
.work-mode-block span {
  font-weight: 300;
  font-size: 14px;
  color: #ffffffa8;
  width: 215px;
}
.work-time-block span{
    margin-left: 2px;
}
.work-time-block img{
    margin-bottom: 10px;
}
.email-block span{
  font-weight: 400;
    font-size: 18px;
    margin-left: 2px;
    letter-spacing: 0.1px;
}
.work-mode-block{
    margin-bottom: 11px ;
}
.work-mode-block img{
 margin-left: -1px;
}
.work-mode-block span{
    margin-top: 1px;
    /* letter-spacing: 0.1px; */
}
.text-block {
  display: flex;
  gap: 11px; /* Расстояние между элементами */
}

.text-item {
    margin: 13px 0 0 1px;
  display: flex;
  align-items: center;
  justify-content: flex-start; /* Выравнивание по центру */
  gap: 10px;
  width: 141px; /* Фиксированная ширина */
  height: 49px; /* Фиксированная высота */
  font-size: 14px;
  color: #ffffffda;
  background-color: transparent; /* Прозрачный фон по умолчанию */
  border-radius: 100px; /* Закругленные края */
  cursor: pointer; /* Курсор "рука" */
  transition: all 0.3s ease; /* Плавное изменение */
}

.text-item:hover {
  background-color: #363636; /* Темно-серый фон при наведении */
  border-color: #363636; /* Изменение цвета границы */
}
.text-item img{
  margin-left: 13px;
  margin-top: -1px;
}
.text-item span {
 
  font-weight: 300;
}

.call-btn {
  margin: 11px 0 0 2px;
  width: 338px;
  height: 50px;
}
.legal-info {
  display: flex;
  flex-direction: column; /* Размещаем элементы вертикально */
  gap: 9px; /* Расстояние между элементами */
}
.policy-link,
.terms-link,
.copyright {
  margin: 7px 0 0 5px ;
  font-size: 12px;
  color: #ffffffd4;
   font-weight: 300;
   
}

.policy-link span,
.terms-link span {
  position: relative; /* Для позиционирования подчёркивания */
  text-decoration: none; /* Убираем стандартное подчёркивание */
}

.policy-link span::after,
.terms-link span::after {
  content: ""; /* Создаем псевдоэлемент */
  position: absolute;
  left: 0;
  bottom: -1px; /* Расстояние между текстом и чертой */
  width: 100%; /* Ширина линии равна ширине текста */
  height: 1px; /* Толщина линии */
  background-color: currentColor; /* Цвет линии совпадает с цветом текста */
}
.copyright{
  margin-top: 13px;
}
/* Правая область */
.right-area {
  position: relative;
  width: 1217px;
  height: 1040px;
  background-color: #ffffff;
}
.close{
position: absolute;
top: 23px;
right: 29px;
cursor: pointer;

}
</style>