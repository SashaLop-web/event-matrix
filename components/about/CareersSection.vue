<template>
    <section class="careers-section">
      <div class="container">
        <h2 class="section-title">Вакансии</h2>
        <p class="section-description">
          Присоединяйтесь к команде, которая меняет корпоративную культуру!
        </p>
  
        <div class="vacancies-grid">
          <div v-for="(vacancy, index) in vacancies" :key="index" class="vacancy-card">
            <h4 class="vacancy-title">{{ vacancy.title }}</h4>
            <p class="vacancy-description">{{ vacancy.description }}</p>
            <NuxtLink :to="vacancy.link" class="vacancy-more">Подробнее</NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const vacancies = [
    {
      title: 'Frontend-разработчик (React)',
      description:
        'Работайте над масштабной платформой, которая меняет подход к корпоративным мероприятиям.',
      link: '/vacancies/frontend-developer'
    },
    {
      title: 'HR-специалист',
      description:
        'Станьте частью команды, которая строит внутреннюю культуру и помогает другим создавать события.',
      link: '/vacancies/hr'
    },
    {
      title: 'Product Manager',
      description:
        'Управляйте развитием продукта, взаимодействуйте с командой и клиентами.',
      link: '/vacancies/product-manager'
    },
    {
      title: 'UX/UI Дизайнер',
      description:
        'Создавайте интерфейсы, которые упрощают организацию мероприятий и делают их яркими',
      link: '/vacancies/ux-ui-designer'
    }
  ]
  </script>
  <style scoped>
  .careers-section {
  background-color: #f9f9f9;
  padding: 80px 20px;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}

.section-title {
  font-size: 36px;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 20px;
}

.section-description {
  font-size: 18px;
  color: #555;
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.vacancies-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 30px;
  justify-items: center;
}

.vacancy-card {
  background-color: #fff;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: left;
}

.vacancy-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.vacancy-title {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-top: 0;
  margin-bottom: 10px;
}

.vacancy-description {
  font-size: 14px;
  color: #555;
  margin-bottom: 15px;
  line-height: 1.5;
}

.vacancy-more {
  font-size: 14px;
  color: #ff9800;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    color: #f48024;
  }
}
@media (max-width: 768px) {
  .section-title {
    font-size: 28px;
  }

  .section-description {
    font-size: 16px;
  }

  .vacancy-title {
    font-size: 18px;
  }

  .vacancy-description {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .vacancies-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .vacancy-title {
    font-size: 16px;
  }

  .vacancy-description {
    font-size: 12px;
  }
}
  </style>