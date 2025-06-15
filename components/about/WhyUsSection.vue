<template>
    <section class="why-us-section">
      <div class="container">
        <h2 class="section-title">Почему выбирают нас</h2>
        <ul class="advantages-list">
          <li v-for="(advantage, index) in advantages" :key="index" class="advantage-item">
            <span class="advantage-icon">✔</span>
            {{ advantage.text }}
          </li>
        </ul>
      </div>
    </section>
  </template>
  
  <script setup>
  const advantages = [
    {
      text: '98% клиентов возвращаются к нам снова'
    },
    {
      text: '100% автоматизация рассылок и аналитики'
    },
    {
      text: 'Поддержка 24/7'
    },
    {
      text: 'Интеграция с CRM и внутренними системами'
    },
    {
      text: 'Безопасность данных по ISO и GDPR'
    }
  ]
  </script>
  <style scoped> 
  .why-us-section {
  background-color: #ebebeb;
  padding: 80px 20px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
  text-align: center;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 40px;
}

.advantages-list {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
}

.advantage-item {
  font-size: 18px;
  color: #222;
  position: relative;
  padding-left: 30px;
  line-height: 1.5;
}

.advantage-icon {
  position: absolute;
  left: 0;
  top: 0;
  color: #ff9800;
  font-size: 20px;
  font-weight: bold;
}
@media (max-width: 768px) {
  .section-title {
    font-size: 28px;
  }

  .advantages-list {
    gap: 16px;
  }

  .advantage-item {
    font-size: 16px;
  }

  .advantage-icon {
    font-size: 18px;
    left: -2px;
  }
}

@media (max-width: 480px) {
  .section-title {
    font-size: 24px;
  }

  .advantages-list {
    max-width: 100%;
  }

  .advantage-item {
    font-size: 15px;
    padding-left: 26px;
  }

  .advantage-icon {
    font-size: 16px;
  }
}
  </style>