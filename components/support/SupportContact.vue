<template>
    <section class="contact-support-section">
      <div class="container">
        <h2>Свяжитесь с нами</h2>
  
        <div class="contact-info">
          <p><strong>Email:</strong> <a href="mailto:support@eventmatrix.com">support@eventmatrix.com</a></p>
          <p><strong>Телефон:</strong> <a href="tel:+78001234567">+7 (800) 123-45-67</a></p>
          <p><strong>Telegram:</strong> <a href="https://t.me/EventMatrixSupportBot " target="_blank">@EventMatrixSupportBot</a></p>
          <p><strong>Часы работы:</strong> Ежедневно c 00:00 до 23:59</p>
  
          <button @click="openChat" class="chat-button">Написать онлайн</button>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const openChat = () => {
    // Здесь можно открыть виджет чата, например Tawk.to, Crisp или Zendesk
    alert('Открываем онлайн-чат...');
  }
  </script>
<style scoped>  
.contact-support-section {
  background-color: #EBEBEBFF;
  padding: 60px 20px 100px 20px;
  text-align: center;
}

.container {
  max-width: 700px;
  margin: 0 auto;
  padding: 0 20px;
}

.contact-support-section h2 {
  font-size: 36px;
  color: #1a1a1a;
  margin-bottom: 40px;
  font-weight: 700;
}

.contact-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  background-color: #f9f9f9;
  border-radius: 12px;
  padding: 30px;
  max-width: 600px;
  margin: 0 auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.contact-info p {
  font-size: 16px;
  color: #333;
  margin: 0;
}

.contact-info a {
  color: #ff9800;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-info a:hover {
  color: #f48024;
}

.chat-button {
  margin-top: 20px;
  padding: 14px 20px;
  background-color: #ff9800;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  width: fit-content;
}

.chat-button:hover {
  background-color: #f48024;
}
@media (max-width: 768px) {
  .contact-support-section h2 {
    font-size: 28px;
    margin-bottom: 30px;
  }

  .contact-info {
    padding: 20px;
    gap: 12px;
  }

  .contact-info p {
    font-size: 15px;
  }

  .chat-button {
    width: 100%;
    font-size: 14px;
    padding: 12px;
  }
}

@media (max-width: 480px) {
  .contact-support-section h2 {
    font-size: 24px;
  }

  .contact-info p {
    font-size: 14px;
  }

  .contact-info a {
    word-break: break-all;
  }
}
</style>