<template>
  <button class="custom-button">
    <span>Организовать мероприятие</span>
  </button>
</template>

<script>
export default {
  name: 'CallBtn',
};
</script>

<style scoped>
.custom-button {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ed9121;
  border: none;
  border-radius: 999px;
  width: 200px;
  height: 60px;
  cursor: pointer;
  font-family: Arial, sans-serif;
  transition: background-color 0.3s ease;
}

.custom-button:hover {
  background-color: #e0851a;
}

.custom-button span {
  color: white;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.1px;
}
</style>