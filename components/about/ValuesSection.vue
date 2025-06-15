<template>
    <section class="values-section">
      <img class="bg" src="@/assets/img/background/HomeHeroSection-bg.png" alt="Фоновое изображение">
      <div class="container">
        <h2>Наши ценности</h2>
        <div class="value-cards">
          <div 
            v-for="(value, index) in values" 
            :key="index" 
            class="card"
          >
            <div class="card-icon">
              <img 
                :src="value.icon" 
                :alt="value.title" 
                class="icon-img"
              />
            </div>
            <h3>{{ value.title }}</h3>
            <p>{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import automation from '~/assets/img/icons/about/automation.svg';
  import transparency from '~/assets/img/icons/about/transparency.svg';
  import security from '~/assets/img/icons/about/security.svg';
  
  const values = [
    {
      icon: automation,
      title: 'Автоматизация',
      description: 'Мы верим, что рутина должна оставаться за кадром — пусть люди фокусируются на общении.',
    },
    {
      icon: transparency,
      title: 'Прозрачность',
      description: 'Все данные доступны в реальном времени, а аналитика помогает принимать решения.',
    },
    {
      icon: security,
      title: 'Безопасность',
      description: 'Все данные защищены, соответствуют стандартам ISO и GDPR.',
    }
  ];
  </script>
  
<style lang="scss" scoped>
 .values-section {
  background-color: #212121;
  padding: 80px 20px;
}
.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.1;
  z-index: 0;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
}
.values-section h2 {
  font-size: 36px;
  font-weight: 700;
  color: #ebebeb;
  margin-bottom: 40px;
}

.value-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.card {
  background-color: #ebebeb;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-align: left;
  color: #212121;
}



.card-icon {
  width: 60px;
  height: 60px;
  
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.card-icon .icon-img {
  width: 40px;
  height: 40px;
  object-fit: contain;
}

.card h3 {
  font-size: 22px;
  font-weight: 600;
  color: #1a1a1a;
  margin-top: 0;
  margin-bottom: 15px;
}

.card p {
  font-size: 15px;
  color: #666;
  line-height: 1.6;
}
  @media (max-width: 768px) {
  .values-section h2 {
    font-size: 28px;
    margin-bottom: 30px;
  }

  .card {
    padding: 25px;
  }

  .card-icon {
    width: 50px;
    height: 50px;
  }

  .card-icon .icon-img {
    width: 24px;
    height: 24px;
  }
}

@media (max-width: 480px) {
  .values-section h2 {
    font-size: 24px;
  }

  .card {
    padding: 20px;
  }

  .card h3 {
    font-size: 20px;
  }

  .card p {
    font-size: 14px;
  }
}
</style>