<template>
    <section class="advantages-section">
      <div class="container">
        <h2 class="section-title">Почему выбирают нас</h2>
        
        <div class="advantages-grid">
          <div 
            v-for="(advantage, index) in advantages"
            :key="index"
            class="advantage-card"
          >
            <div class="advantage-icon">
              <img 
                :src="advantage.icon" 
                :alt="advantage.title"
                class="icon-img"
              >
            </div>
            <h3 class="advantage-title">{{ advantage.title }}</h3>
            <p class="advantage-description">{{ advantage.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import calendar from "~/assets/img/icons/index/calendar.svg";
  import mail from "~/assets/img/icons/index/mail.svg";
  import chart from "~/assets/img/icons/index/chart.svg";
  import instructions from "~/assets/img/icons/index/instructions.svg";

  const advantages = [
    {
      icon: calendar,
      title: 'Автоматизация всех этапов',
      description: 'Полный цикл организации мероприятия от планирования до завершения'
    },
    {
      icon: mail,
      title: 'Умная рассылка приглашений',
      description: 'Персонализированные приглашения с автоматическим отслеживанием ответов'
    },
    {
      icon: chart,
      title: 'Аналитика в реальном времени',
      description: 'Мониторинг посещаемости и интерактивная статистика мероприятия'
    },
    {
      icon: instructions,
      title: 'Интеграция с системами',
      description: 'Совместимость с популярными CRM и корпоративными решениями'
    }
  ]
  </script>
  
  <style lang="scss" scoped>
  .advantages-section {
    padding: 60px 0;
    background: #EBEBEB;
  
}
    
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }
  
  .section-title {
    text-align: center;
    font-size: 36px;
    margin-bottom: 60px;
    
  }
  
  .advantages-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 40px;
  }
  
  .advantage-card {
    background: rgb(245, 245, 245);
    padding: 40px 25px;
    border-radius: 12px;
    text-align: center;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    
    
  }
  
  .advantage-icon {
    width: 85px;
    height: 85px;
    margin: 0 auto 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    border-radius: 50%;
  }
  
  .icon-img {
    width: 40px;
    height: 40px;
    object-fit: contain;
  }
  
  .advantage-title {
    font-size: 22px;
    margin-bottom: 25px;
    color: #1f2937;
  }
  
  .advantage-description {
    font-size: 14px;
    line-height: 1.5;
    color: #1f2937;
  }
  
  @media (max-width: 768px) {
    .advantages-section {
      padding: 60px 0;
    }
    
    .section-title {
      font-size: 28px;
      margin-bottom: 40px;
    }
    
    .advantages-grid {
      gap: 20px;
    }
    
    .advantage-card {
      padding: 30px 20px;
    }
    
    .icon-img {
      width: 35px;
      height: 35px;
    }
  }
  @media (max-width: 480px) {
    .advantages-section{
      padding: 30px 0;
    }
  }
  </style>