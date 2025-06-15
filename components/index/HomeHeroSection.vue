<template>
  <section class="hero-section">
    <img class="bg" src="@/assets/img/background/HomeHeroSection-bg.png" alt="Фоновое изображение" />

    <div class="hero-overlay">
      <img class="line left" src="@/assets/img/background/black-line-right.png" alt="Фоновое изображение" />
      <img class="line right" src="@/assets/img/background/orange-line-left.png" alt="Фоновое изображение" />

      <div class="hero-content">
        <h1 class="hero-title">
          Организуйте идеальные корпоративные события в пару кликов
        </h1>

        <p class="hero-subtitle">
          Полный цикл управления: от рассылки приглашений до анализа результатов
        </p>

        <CallBtn :width="'300px'" :fontSize="'16px'" />
      </div>
    </div>
  </section>
</template>

<script setup>
import CallBtn from '@/components/ui/CallBtn.vue'
</script>

<style lang="scss" scoped>
.hero-section {
  display: flex;
  width: 100%;
  height: 600px;
  background-color: #f4f4f4;
  overflow: hidden;
  position: relative;
}

.hero-overlay {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
}

.bg {
  position: absolute;
  width: 100%;
  opacity: 0.3;
  z-index: 0;
}

.line.right {
  position: absolute;
  left: 0;
  margin-bottom: 250px;
}
.line.left {
  position: absolute;
  right: 0;
  margin-top: 215px;
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

.hero-title {
  font-size: 50px;
  font-weight: 700;
  line-height: 1.2;
  max-width: 900px;
  margin: 0 auto;
}

.hero-subtitle {
  font-size: 20px;
  font-weight: 300;
  max-width: 700px;
  margin: 0 auto;
}

@media (max-width: 1024px) {
  .hero-section {
    height: 430px;
  }

  .hero-title {
    font-size: 46px;
  }

  .line {
    display: none;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 400px;
  }

  .hero-content {
    gap: 20px;
    padding: 20px;
  }

  .hero-title {
    font-size: 32px;
  }

  .hero-subtitle {
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .hero-section {
    height: 400px;
  }

  .hero-title {
    font-size: 26px;
  }

  .hero-subtitle {
    font-size: 14px;
  }
}
</style>
