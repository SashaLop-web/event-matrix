<template>
    <section class="about-hero">
      <!-- Фоновое изображение -->
      <img class="bg" src="@/assets/img/background/HomeHeroSection-bg.png" alt="Фоновое изображение">
  
      <!-- Декоративные линии -->
      <img class="line left" src="@/assets/img/background/black-line-right.png" alt="Чёрная линия">
      <img class="line right" src="@/assets/img/background/orange-line-left.png" alt="Оранжевая линия">
  
      <!-- Основное содержимое -->
      <div class="container">
        <div class="hero-content">
          <h1>О платформе EventMatrix</h1>
          <p>Как мы помогаем компаниям организовывать идеальные корпоративные мероприятия.</p>
          <CallBtn @click="startOrganization"/>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
    import CallBtn from '@/components/ui/CallBtn.vue';
  const startOrganization = () => {
    // Навигация к созданию мероприятия
    useRouter().push('/create-event')
  }
  </script>
  
<style scoped>
  .about-hero {
  position: relative;
  width: 100%;
  height: 600px;
  background-color: #f4f4f4;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  z-index: 0;
}

.line {
  position: absolute;
  z-index: 1;
}

.line.right {
  left: 0;
  margin-bottom: 250px;
}

.line.left {
  right: 0;
  margin-top: 215px;
}

.container {
  position: relative;
  z-index: 2;
  max-width: 1100px;
  text-align: center;
  padding: 40px 20px;
  z-index: 2;
}

.hero-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
}

.hero-content h1 {
  font-size: 50px;
  font-weight: 700;
  line-height: 1.2;
  max-width: 900px;
  margin: 0 auto;
}

.hero-content p {
  font-size: 20px;
  font-weight: 300;
  max-width: 700px;
  margin: 0 auto;
}

.cta-button {
  display: inline-block;
  padding: 14px 28px;
  background-color: #ff9800;
  color: #fff;
  border: none;
  border-radius: 50px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.cta-button:hover {
  background-color: #f48024;
}
@media (max-width: 1024px) {
  .about-hero {
    height: 430px;
  }

  .line {
    display: none;
  }
}

@media (max-width: 768px) {
  .about-hero {
    height: 400px;
  }

  .hero-content h1 {
    font-size: 32px;
    max-width: 100%;
  }

  .hero-content p {
    font-size: 16px;
    max-width: 100%;
  }

  .cta-button {
    width: 100%;
    max-width: 300px;
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .about-hero {
    height: 400px;
    padding: 0 20px;
  }

  .hero-content h1 {
    font-size: 26px;
  }

  .hero-content p {
    font-size: 14px;
  }

  .cta-button {
    font-size: 14px;
    padding: 12px 20px;
  }
}
</style>