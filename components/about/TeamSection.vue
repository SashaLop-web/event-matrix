<template>
    <section class="team-section">
      <div class="container">
        <h2 class="section-title">Наша команда</h2>
        <p class="section-description">
          Мы собрали опытных специалистов, чтобы сделать организацию мероприятий простой и эффективной:
        </p>
  
        <div class="team-members">
          <div v-for="(member, index) in team" :key="index" class="member-card">
            <!-- Фото -->
            <div class="member-image">
              <img :src="member.image" :alt="member.name" />
            </div>
  
            <!-- Информация -->
            <h4 class="member-name">{{ member.name }}</h4>
            <p class="member-role">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
<script setup>
  
import anna from '~/assets/img/icons/about/automation.svg'
import dmitry from '~/assets/img/icons/about/automation.svg'
import elena from '~/assets/img/icons/about/automation.svg'
import artem from '~/assets/img/icons/about/automation.svg'
import sveta from '~/assets/img/icons/about/automation.svg'

const team = [
  {
    name: 'Анна Иванова',
    role: 'CEO, 10 лет в MICE-индустрии',
    image: anna
  },
  {
    name: 'Дмитрий Петров',
    role: 'CTO, разработчик B2B-платформ',
    image: dmitry
  },
  {
    name: 'Елена Смирнова',
    role: 'Руководитель продукта, UX-эксперт',
    image: elena
  },
  {
    name: 'Артём Лебедев',
    role: 'HR-менеджер, построение корпоративной культуры',
    image: artem
  },
  {
    name: 'Светлана Кузнецова',
    role: 'Маркетолог, эксперт по digital-стратегиям',
    image: sveta
  }
]

</script>



  <style scoped>
  .team-section {
  background-color: #fff;
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

.team-members {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 40px;
  justify-items: center;
}

.member-card {
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 260px;
}

.member-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.member-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 20px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #e0e0e0;
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.member-name {
  font-size: 20px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 8px;
}

.member-role {
  font-size: 14px;
  color: #777;
}
@media (max-width: 768px) {
  .section-title {
    font-size: 28px;
  }

  .section-description {
    font-size: 16px;
  }

  .member-image {
    width: 90px;
    height: 90px;
    margin-bottom: 15px;
  }

  .member-name {
    font-size: 18px;
  }

  .member-role {
    font-size: 13px;
  }
}

@media (max-width: 480px) {
  .team-members {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .member-image {
    margin: 0 auto 15px;
  }

  .member-name {
    font-size: 16px;
  }

  .member-role {
    font-size: 12px;
  }
}
</style>