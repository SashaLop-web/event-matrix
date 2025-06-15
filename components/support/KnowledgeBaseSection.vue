<template>
    <section class="knowledge-base-section">
      <div class="container">
        <h2>База знаний</h2>
        <p class="kb-description">Найдите ответы на частые вопросы или изучите инструкции по работе с платформой</p>
  
        <ul class="kb-list">
          <li v-for="(article, index) in knowledgeBase" :key="index" class="kb-item">
            <NuxtLink :to="article.link" class="kb-link">{{ article.title }}</NuxtLink>
          </li>
        </ul>
      </div>
    </section>
  </template>
  
  <script setup>
  const knowledgeBase = [
    {
      title: 'Как создать мероприятие',
      link: '#'
    },
    {
      title: 'Как добавить участников',
      link: '#'
    },
    {
      title: 'Как получить аналитику',
      link: '#'
    },
    {
      title: 'Интеграции с CRM',
      link: '#'
    },
    {
      title: 'Безопасность данных',
      link: '#'
    }
  ]
  </script>
<style scoped>
.knowledge-base-section {
  background-color: #f4f4f4;
  padding: 80px 20px;
}

.container {
  max-width: 1100px;
  margin: 0 auto;
  text-align: center;
  padding: 0 20px;
}

.knowledge-base-section h2 {
  font-size: 36px;
  color: #1a1a1a;
  font-weight: 700;
  margin-bottom: 20px;
}

.kb-description {
  font-size: 18px;
  color: #555;
  margin-bottom: 40px;
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.kb-list {
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 20px;
  justify-items: center;
  padding: 0;
  margin: 0 auto;
  max-width: 900px;
}

.kb-item {
  background-color: #fff;
  border-radius: 10px;
  padding: 16px 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 100%;
  max-width: 300px;
}

.kb-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.kb-link {
  font-size: 16px;
  color: #333;
  text-decoration: none;
  display: block;
  transition: color 0.3s ease;
}

.kb-link:hover {
  color: #ff9800;
}
@media (max-width: 768px) {
  .knowledge-base-section h2 {
    font-size: 28px;
  }

  .kb-description {
    font-size: 16px;
    margin-bottom: 30px;
  }

  .kb-list {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .kb-item {
    max-width: 100%;
  }
}

@media (max-width: 480px) {
  .kb-description {
    font-size: 14px;
    margin-bottom: 24px;
  }

  .kb-link {
    font-size: 15px;
  }
}
</style>