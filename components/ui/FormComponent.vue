<template>
  <div v-if="isVisible" class="form-container">
    <h1 class="form-title">Заказать консультацию</h1>

    <!-- Поле для ввода имени -->
    <input
      type="text"
      placeholder="Имя"
      class="input-field"
      v-model="name"
    />

    <!-- Поле для ввода телефона -->
    <input
      type="text"
      placeholder="Телефон"
      class="input-field"
      v-model="phone"
      @input="formatPhone"
    />

    <!-- Кнопка отправки -->
    <button class="submit-button" @click="submitForm">
      Отправить
    </button>

    <!-- Текст соглашения -->
   <p class="agreement-text">
  Отправляя заявку, вы соглашаетесь с 
  <span class="underline-text">политикой обработки персональных данных</span></p>
    <img
      src="@/assets/img/icons/components-page/close.png"
      alt="Закрыть"
      class="block__close"
      @click="closeMessage"
    >
  </div>
</template>

<script>
export default {
  name: 'FormComponent',
  data() {
    return {
      name: '', // Значение поля "Имя"
      phone: '', // Значение поля "Телефон"
      isVisible: true,
    };
  },
  methods: {
    formatPhone() {
      // Убираем все символы, кроме цифр
      let cleaned = ('' + this.phone).replace(/\D/g, '');

      // Если введено меньше 1 цифры, добавляем "+7"
      if (cleaned.length === 0) {
        this.phone = '';
        return;
      }

      // Форматируем номер: +7 ___ ___-__-__
      let formatted = '+7 ';
      if (cleaned.length > 1) {
        formatted += cleaned.slice(1, 4); // Первые 3 цифры
      }
      if (cleaned.length > 4) {
        formatted += ' ' + cleaned.slice(4, 7); // Следующие 3 цифры
      }
      if (cleaned.length > 7) {
        formatted += '-' + cleaned.slice(7, 9); // Следующие 2 цифры
      }
      if (cleaned.length > 9) {
        formatted += '-' + cleaned.slice(9, 11); // Последние 2 цифры
      }

      this.phone = formatted;
    },
    submitForm() {
      // Простая проверка на заполнение полей
      if (!this.name || !this.phone) {
        alert('Пожалуйста, заполните все поля.');
        return;
      }

      // Логика отправки данных (например, через API)
      console.log('Отправлено:', { name: this.name, phone: this.phone });
      alert('Форма успешно отправлена!');
      
    },
    closeMessage() {
      this.isVisible = false; // Скрываем блок
    },
  },
};
</script>

<style scoped>
.form-container {
    position: relative;
  width: 488px; /* Ширина блока */
  height: 374px; /* Высота блока */
  background-color: #ffffff; /* Белый фон */
  border-radius: 20px; /* Закругленные края */
  padding: 20px; /* Внутренние отступы */
  
  display: flex;
  flex-direction: column;
  align-items: center;
}

.form-title {
   
    padding-top: 6px;
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 26px;
  color: #000000; /* Цвет текста */
}

.input-field {
   

  width: 387px; /* Ширина поля ввода */
  height: 60px; /* Высота поля ввода */
  border: 1px solid #cecece; /* Граница */
  border-radius: 29.5px; /* Закругленные края */
  padding: 10px 15px; /* Внутренние отступы */
  margin-bottom: 16px;
  font-size: 16px; /* Размер шрифта */
  outline: none; /* Убираем стандартное выделение при фокусе */
  transition: border-color 0.3s ease; /* Плавное изменение цвета границы */
}
.input-field::placeholder{
    position: absolute;
    color: #000000;
    left: 30px;
    font-weight: 500;
}

.input-field:focus {
  border-color: #9B9B9B; /* Изменение цвета границы при фокусе */
}

.submit-button {
   
  width: 387px; /* Ширина кнопки */
  height: 60px; /* Высота кнопки */
  background-color: #ED9121; /* Цвет фона */
  color: #ffffff; /* Цвет текста */
  border: none; /* Без границ */
  border-radius: 100px; /* Закругленные края */
  font-weight: 500; /* Жирный текст */
  font-size: 16px; /* Размер шрифта */
  cursor: pointer; /* Курсор "рука" */
  transition: background-color 0.3s ease; /* Плавное изменение цвета фона */
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px; /* Расстояние между элементами внутри кнопки */
  padding: 16px 18px; /* Отступы внутри кнопки */
}


.agreement-text {
  font-weight: 400;
  font-size: 12px;
  line-height: 100%; /* Высота строки */
  letter-spacing: 0%; /* Межбуквенное расстояние */
  color: #00000088; /* Серый цвет текста */
  text-align: center; /* Выравнивание по центру */
  margin-top: 19px; /* Отступ сверху */
  width: 387px;
  text-align: start;
  line-height: 15px;
}
.underline-text {
  text-decoration: underline;
 
  text-underline-offset: 4px; /* Расстояние между текстом и линией */
  cursor: pointer; /* Курсор "рука" */

}
.block__close {
  position: absolute; /* Абсолютное позиционирование */
  top: 20px; /* Отступ сверху */
  right: 20px; /* Отступ справа */
  cursor: pointer; /* Указатель мыши "рука" */
}
</style>