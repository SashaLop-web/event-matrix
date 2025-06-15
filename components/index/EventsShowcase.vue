<template>
    <section class="events-section">
      <div class="container">
        <h2 class="section-title">Примеры наших мероприятий</h2>
        
        <div class="events-grid">
          <div 
            v-for="(event, index) in events"
            :key="index"
            class="event-card"
            @mouseenter="hoverIndex = index"
            @mouseleave="hoverIndex = null"
          >
            <div class="image-wrapper">
              <img 
                :src="event.image" 
                :alt="event.title"
                class="event-image"
              >
            </div>
            
            <div class="content">
              <h3 class="event-title">{{ event.title }}</h3>
              <p class="event-description">{{ event.description }}</p>
            </div>
  
            <transition name="fade">
              <div v-if="hoverIndex === index" class="stats-overlay">
                <div class="stats-content">
                  
                  <p class="stats-text">{{ event.stats }}</p>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
import { ref } from 'vue'

// Импортируем изображения
import conference from '~/assets/img/icons/index/conference.jpg'
import teamBuilding from '~/assets/img/icons/index/teambuilding.jpg'
import party from '~/assets/img/icons/index/party.jpg'
import webinar from '~/assets/img/icons/index/webinar.jpg'

const hoverIndex = ref(null)

const events = [
  {
    image: conference,
    title: 'Конференции и форумы',
    description: 'Организация профессиональных встреч любого масштаба',
    stats: '87% гостей подтвердили участие за 48 часов'
  },
  {
    image: teamBuilding,
    title: 'Тимбилдинг-активности',
    description: 'Сплочение коллектива через нестандартные мероприятия',
    stats: '95% участников отметили улучшение коммуникаций'
  },
  {
    image: party,
    title: 'Корпоративные праздники',
    description: 'Запоминающиеся события для вашей команды',
    stats: 'На 40% повысилась лояльность сотрудников'
  },
  {
    image: webinar,
    title: 'Обучающие вебинары',
    description: 'Интерактивные образовательные сессии',
    stats: 'Средняя посещаемость 92% от зарегистрированных'
  }
]
</script>
  
<style lang="scss" scoped>
.events-section {
  padding: 80px 0;
  background: #212121;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  font-size: 36px;
  margin-bottom: 60px;
  color: white;
}

.events-grid {
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  transition: all 0.3s ease;
}

.event-card {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
}

.image-wrapper {
  position: relative;
  padding-top: 60%;
}

.event-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content {
  padding: 20px;
  background: #fff;
}

.event-title {
  font-size: 22px;
  margin-bottom: 20px;
  color: #1a1a1a;
  height: 50px;
}

.event-description {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}

.stats-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.stats-content {
  text-align: center;
  color: #fff;
}

.stats-text {
  font-size: 16px;
  line-height: 1.4;
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
@media (max-width: 768px) {
  .section-title {
    font-size: 28px;
  }

  .events-grid {
    grid-template-columns: 1fr; // Один столбец
    overflow-x: visible;
  }
}
</style>
  