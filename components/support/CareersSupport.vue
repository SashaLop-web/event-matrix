<template>
    <section class="careers-support-section">
      <div class="container">
        <h2>Присоединяйтесь к команде поддержки</h2>
        <p>Мы ищем тех, кто любит помогать людям и разбирается в технологиях.</p>
        <NuxtLink to="/support" class="cta-link">Смотреть вакансии</NuxtLink>
      </div>
    </section>
  </template>
  
  <script setup>
  // Можно добавить логику, если потребуется
  </script>
<style scoped>
.careers-support-section {
  background-color: #EBEBEBFF;
  padding: 80px 20px;
  text-align: center;
}

.container {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 20px;
}

.careers-support-section h2 {
  font-size: 36px;
  color: #1a1a1a;
  font-weight: 700;
  margin-bottom: 20px;
}

.careers-support-section p {
  font-size: 18px;
  color: #555;
  margin-bottom: 30px;
}

.cta-link {
  display: inline-block;
  padding: 14px 28px;
  background-color: #ff9800;
  color: #fff;
  border-radius: 50px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.cta-link:hover {
  background-color: #f48024;
}
@media (max-width: 768px) {
  .careers-support-section h2 {
    font-size: 28px;
  }

  .careers-support-section p {
    font-size: 16px;
  }

  .cta-link {
    padding: 12px 24px;
    font-size: 15px;
  }
}

@media (max-width: 480px) {
  .careers-support-section {
    padding: 60px 20px;
  }

  .careers-support-section h2 {
    font-size: 24px;
  }

  .careers-support-section p {
    font-size: 14px;
  }

  .cta-link {
    width: 100%;
    text-align: center;
    font-size: 14px;
    padding: 12px 20px;
  }
}
</style>