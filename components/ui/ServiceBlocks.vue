<template>
  <div class="services-container">
    <!-- Блок с колонками -->
    <div class="services-block">
      <!-- Цикл для создания блоков -->
      <div v-for="(block, index) in blocks" :key="index" class="service-column">
        <div class="category-header">
          <!-- Иконка -->
          <img :src="block.icon" alt="Иконка" class="category-icon" />
          <!-- Текстовый контент -->
          <div class="text-content">
            <h3>{{ block.title }}</h3>
            <ul>
              <li v-for="(service, idx) in block.services" :key="idx">{{ service }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// Импортируем изображения
import loader from "@/assets/img/icons/components-page/loader.png";
import workers from "@/assets/img/icons/components-page/workers.png";
import personal from "@/assets/img/icons/components-page/personal.png";
import truck from "@/assets/img/icons/components-page/truck.png";
import moving from "@/assets/img/icons/components-page/moving.png";
import crane from "@/assets/img/icons/components-page/crane.png";
import business from "@/assets/img/icons/components-page/business.png";
import office from "@/assets/img/icons/components-page/office.png";

export default {
  name: "ServiceBlocks", // Название компонента
  data() {
    return {
      // Массив данных для блоков
      blocks: [
        {
          title: "ГРУЗЧИКИ",
          icon: loader,
          services: [
            "Подъем/спуск на этаж",
            "Стоимость грузчиков",
            "Вывоз мусора/материалов",
            "Грузчики на производство",
            "Грузчики на разовую работу",
            "Грузчики на погрузочно-разгрузочные работы",
          ],
        },
        {
          title: "РАЗНОРАБОЧИЕ",
          icon: workers,
          services: [
            "Уборка территории",
            "Разнорабочие на стройку",
            "Рытье траншей и ям",
            "Уборка листьев",
            "Уборка снега",
          ],
        },
        {
          title: "ФИЗИЧЕСКИМ ЛИЦАМ",
          icon: personal,
          services: [
            "Перевозка вещей",
            "Перевозка мебели",
            "Перевозка бытовой техники",
            "Вывоз строительного мусора",
            "Перевозка мебели на дачу",
            "Упаковка мебели",
            "Перевозка холодильника",
          ],
        },
        {
          title: "ГРУЗОПЕРЕВОЗКИ",
          icon: truck,
          services: [
            "Доставка и экспедирование грузов",
            "Городские перевозки",
            "Доставка по городу",
            "Междугородние",
            "Негабаритные",
            "Газель для перевозки мебели",
            "Перевозка строительных материалов",
          ],
        },
        {
          title: "ПЕРЕЕЗД",
          icon: moving,
          services: [
            "Переезд под ключ",
            "Переезд Газелью",
            "Квартирный переезд",
            "Переезд дома/коттеджа",
            "Дачный переезд",
            "Хранение вещей",
            "Газель для междугородних перевозок",
          ],
        },
        {
          title: "ОФИСНЫЙ ПЕРЕЕЗД",
          icon: crane,
          services: [
            "Газель для междугородних перевозок",
            "Упаковка хрупких вещей",
          ],
        },
        {
          title: "ЮРИДИЧЕСКИМ ЛИЦАМ",
          icon: business,
          services: [
            "Транспортным компаниям",
            "Аутсорсинг персонала",
            "Складские работы",
            "Маркировочные работы",
          ],
        },
        {
          title: "ТАКЕЛАЖНЫЕ РАБОТЫ",
          icon: office,
          services: [
            "Промышленный такелаж",
            "Перевозка банкоматов",
            "Такелаж оборудования и станков",
            "Перевозка сейфов и железной мебели",
            "Перевозка пианино и рояля",
            "Такелаж оборудования",
            "Такелаж медицинского оборудования",
            "Такелаж станков",
          ],
        },
      ],
    };
  },
};
</script>
<style scoped>
/* Общий контейнер */
.services-container {
  max-width: 1217px; /* Максимальная ширина контейнера */
  margin: 0 auto; /* Центрирование контейнера */
}

/* Блок с колонками */
.services-block {
  display: flex;
  flex-wrap: wrap; /* Блоки будут переноситься на новую строку */
  gap: 20px; /* Расстояние между блоками */
  margin: 48px 0 0 19px; /* Отступ сверху */

  
}

/* Каждый блок */
.service-column {
  width: 295px; /* Ширина блока */
  box-sizing: border-box; /* Учитываем padding и border в ширине */
  margin-right: 45px;
}

/* Заголовок категории */
.category-header {
  display: flex;
  align-items: flex-start; /* Выравнивание по верхней границе */
}

/* Иконка */


/* Текстовый контент */
.text-content {
  margin-left: 10px ; /* Отступ между иконкой и текстом */
}

/* Заголовок */
.service-column h3 {
  height: 38px; /* Фиксированная высота */
  display: flex; /* Применяем Flexbox */
  align-items: center; /* Выравнивание по центру по вертикали */
  justify-content: flex-start; /* Текст выравнивается слева */
  font-size: 16px;
  font-weight: 600;
  color: #7e7e7e; /* Серый цвет текста */
  letter-spacing: 0.1px; /* Расстояние между буквами */
  margin-bottom: 10px; /* Отступ между заголовком и списком */
}

/* Список услуг */
.service-column ul {
  list-style-type: none; /* Убираем маркеры */
  padding: 0; /* Убираем отступы */
  margin: 0; /* Убираем внешние отступы */
}

/* Элемент списка */
.service-column li {
  font-size: 15px;
  color: #000000; /* Темно-серый цвет текста */
  font-weight: 400;
  margin-bottom: 13px; /* Отступ между пунктами */
}
</style>