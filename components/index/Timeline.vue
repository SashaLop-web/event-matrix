<template>
  <section class="how-it-works">
    <div class="container">
      <h2>Как это работает</h2>
      <div class="steps-container">
        <div v-for="(step, index) in steps" :key="index" class="step">
          <div class="step-number">Шаг {{ index + 1 }}</div>
          <div class="step-header">
            <img :src="step.icon" :alt="step.iconName" class="step-icon" />
            {{ step.title }}
          </div>
          <div class="step-description">
            {{ step.description }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Импорт иконок
import calendar from '~/assets/img/icons/index/calendar.svg';
import mail from '~/assets/img/icons/index/mail.svg';
import checkCircle from '~/assets/img/icons/index/check-circle.svg';
import monitor from '~/assets/img/icons/index/monitor.svg';
import chart from '~/assets/img/icons/index/chart.svg';

const steps = [ 
  {
    title: 'Создание мероприятия',
    description: 'Заполните базовые данные: название, дата, место, описание, целевая аудитория.',
    iconName: 'calendar',
    icon: calendar,
  },
  {
    title: 'Рассылка приглашений',
    description: 'Выберите список участников, настройте шаблон письма, добавьте персональное сообщение.',
    iconName: 'mail',
    icon: mail,
  },
  {
    title: 'Подтверждение участия',
    description: 'Гости получают ссылку для подтверждения участия, могут указать дополнительные данные (например, диетические предпочтения).',
    iconName: 'check-circle',
    icon: checkCircle,
  },
  {
    title: 'Мониторинг и управление',
    description: 'В режиме реального времени отслеживайте, кто принял участие, кто ещё не ответил, и отправляйте автоматические напоминания.',
    iconName: 'monitor',
    icon: monitor,
  },
  {
    title: 'Завершение и анализ',
    description: 'После мероприятия соберите обратную связь, загрузите фотоотчёт и получите аналитику по посещаемости и удовлетворённости.',
    iconName: 'chart',
    icon: chart,
  },
];

const hoveredIndex = ref(null);
</script>

<style scoped>
.how-it-works {
  width: 100%;
  background-color: #ebebeb;
  padding: 80px 0;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.how-it-works h2 {
  font-size: 36px;
  text-align: center;
  margin-bottom: 40px;
  color: #222;
}

.steps-container {
  display: flex;
  flex-direction: column;
  gap: 24px;
 
}

.step {
  background-color: #fff;
  padding: 34px 32px;
  border-radius: 12px;
  transition: transform 0.3s ease, background-color 0.3s ease;
}



.step-number {
  font-size: 14px;
  color: #999;
  font-weight: 500;
  margin-bottom: 15px;
}

.step-header {
  font-weight: 600;
  font-size: 22px;
  color: #222;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.step-icon {
  width: 28px;
  height: 28px;
  object-fit: contain;
}

.step-description {
  font-size: 14px;
  color: #666;
}
</style>