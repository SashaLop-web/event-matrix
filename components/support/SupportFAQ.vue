<template>
    <section class="faq-section">
      <div class="container">
        <h2>Часто задаваемые вопросы</h2>
        <div class="faq-list">
          <div
            v-for="(item, index) in faqItems"
            :key="index"
            class="faq-item"
            @click="toggleAnswer(index)"
          >
            <div class="faq-question">
              {{ item.question }}
              <span class="icon">{{ openIndex === index ? '▼' : '▶' }}</span>
            </div>
            <transition name="slide">
              <div v-show="openIndex === index" class="faq-answer">
                {{ item.answer }}
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  
  const openIndex = ref(null)
  
  const toggleAnswer = (index) => {
    openIndex.value = openIndex.value === index ? null : index
  }
  
  const faqItems = [
  {
    question: 'Как создать мероприятие?',
    answer: 'Мероприятие может создать админ или менеджер: нажмите кнопку "Создать мероприятие" в модальном окне, заполните анкету и опубликуйте его.'
  },
  {
    question: 'Кто может редактировать мероприятие после создания?',
    answer: 'Редактировать мероприятие могут только администраторы или создатель мероприятия до его начала.'
  },
  {
    question: 'Есть ли у вас поддержка на выходных?',
    answer: 'Да, наша команда доступна 24/7.'
  },
  {
    question: 'Как узнать, кто подтвердил участие в мероприятии?',
    answer: 'В карточке мероприятия отображается список приглашённых и их статус: “Подтверждён”, “Отклонён” или “Ожидается”.'
  },
  {
    question: 'Предоставляете ли вы обучение перед использованием?',
    answer: 'Нет, отдельного обучения не требуется — интерфейс интуитивно понятен. Однако при необходимости мы предоставим краткую инструкцию.'
  }
]

  </script>
<style scoped>
.faq-section {
  background-color: #fff;
  padding: 80px 20px;
}

.container {
  max-width: 900px;
  margin: 0 auto;
  text-align: center;
}

.faq-section h2 {
  font-size: 36px;
  color: #1a1a1a;
  margin-bottom: 40px;
  font-weight: 700;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 700px;
  margin: 0 auto;
  text-align: left;
}

.faq-item {
  background-color: #f9f9f9;
  border-left: 4px solid #ff9800;
  border-radius: 8px;
  padding: 20px 25px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.faq-item:hover {
  background-color: #f5f5f5;
}

.faq-question {
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  position: relative;
  padding-right: 24px;
}

.faq-question .icon {
  position: absolute;
  right: 0;
  top: 0;
  font-size: 14px;
  transition: transform 0.3s ease;
}

.faq-item[open] .faq-question .icon,
.faq-item.active .faq-question .icon {
  transform: rotate(180deg);
}

.faq-answer {
  font-size: 15px;
  color: #555;
  margin-top: 10px;
  line-height: 1.6;
}
@media (max-width: 768px) {
  .faq-section h2 {
    font-size: 28px;
    margin-bottom: 30px;
  }

  .faq-question {
    font-size: 16px;
  }

  .faq-answer {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .faq-list {
    gap: 16px;
  }

  .faq-question {
    font-size: 15px;
  }

  .faq-answer {
    font-size: 13px;
  }
}
</style>