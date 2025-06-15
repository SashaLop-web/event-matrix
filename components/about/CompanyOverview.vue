<template>
    <section class="company-overview">
      <div class="container">
        <div class="content-block">
          <h2>О нас</h2>
          <p>
            EventMatrix — это цифровой инструмент для управления корпоративными мероприятиями.
            Мы помогаем HR-отделам и организаторам событий свести к минимуму рутину и максимизировать результат.
          </p>
          <ul>
            <li>Создана в 2022 году</li>
            <li>Более 500 компаний уже используют нашу платформу</li>
            <li>Интеграция с популярными CRM и внутренними системами</li>
          </ul>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  // Можно добавить логику, если нужно
  </script>
  
  <style scoped>
 .company-overview {
  background-color: #ebebeb;
  padding: 80px 20px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: center;
}

.content-block {
  background-color: #fff;
  padding: 60px 60px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  text-align: center;
  width: 100%;
  max-width: 1000px;
}

.company-overview h2 {
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.company-overview p {
  font-size: 18px;
  font-weight: 300;
  color: #555;
  max-width: 800px;
  margin: 0 auto 40px;
}

.company-overview ul {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 700px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  text-align: left;
}

.company-overview li {
  font-size: 16px;
  color: #333;
  position: relative;
  padding-left: 24px;
}

.company-overview li::before {
  content: '✔';
  position: absolute;
  left: 0;
  top: 0;
  color: #ff9800;
  font-size: 18px;
}
@media (max-width: 768px) {
  .content-block {
    padding: 30px 20px;
  }

  .company-overview h2 {
    font-size: 28px;
  }

  .company-overview p,
  .company-overview li {
    font-size: 15px;
  }

  .company-overview ul {
    gap: 16px;
  }
}

@media (max-width: 480px) {
  .content-block {
    padding: 20px;
    margin: 0 10px;
  }

  .company-overview h2 {
    font-size: 24px;
  }

  .company-overview p {
    font-size: 14px;
  }

  .company-overview li {
    font-size: 14px;
  }
}
</style>