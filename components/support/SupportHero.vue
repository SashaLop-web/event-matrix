<template>
    <section class="support-hero">
      <img class="bg" :src="backgroundImage" alt="Фоновое изображение">
      <div class="hero-overlay">
        <!-- Декоративные линии -->
        <img class="line left" src="@/assets/img/background/black-line-right.png" alt="Черная линия">
        <img class="line right" src="@/assets/img/background/orange-line-left.png" alt="Оранжевая линия">
  
        <!-- Основной контент -->
        <div class="hero-content">
          <h1>Центр поддержки</h1>
          <p>Нужна помощь? Мы всегда рядом.</p>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import backgroundImage from '@/assets/img/background/HomeHeroSection-bg.png'
  </script>
<style scoped>
.support-hero {
  position: relative;
  width: 100%;
  height: 600px;
  background-color: #f4f4f4;
  overflow: hidden;
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

.hero-overlay {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  z-index: 1;
}

.line.right {
  position: absolute;
  left: 0;
  margin-bottom: 250px;
  width: auto;
  height: auto;
}

.line.left {
  position: absolute;
  right: 0;
  margin-top: 215px;
  width: auto;
  height: auto;
}

.hero-content {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  padding: 40px 20px;
  max-width: 1100px;
  width: 100%;
}

.hero-content h1 {
  font-size: 50px;
  font-weight: 700;
  line-height: 1.2;
  max-width: 900px;
  margin: 0 auto;
  color: #1a1a1a;
}

.hero-content p {
  font-size: 20px;
  font-weight: 300;
  color: #555;
  max-width: 700px;
  margin: 0 auto;
}
@media (max-width: 1024px) {
  .support-hero {
    height: 430px;
  }

  .hero-content h1 {
    font-size: 46px;
  }

  .line {
    display: none;
  }
}

@media (max-width: 768px) {
  .support-hero {
    height: 400px;
  }

  .hero-content {
    gap: 20px;
    padding: 20px;
  }

  .hero-content h1 {
    font-size: 32px;
    max-width: 100%;
  }

  .hero-content p {
    font-size: 16px;
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .support-hero {
    height: 400px;
  }

  .hero-content h1 {
    font-size: 26px;
  }

  .hero-content p {
    font-size: 14px;
  }
}
</style>