import { ref } from 'vue';

export const cities = [
  'Москва',
  'Санкт-Петербург',
  'Нижний Новгород',
  'Екатеринбург',
  'Казань',
  'Краснодар',
  'Ростов-на-Дону',
  'Воронеж',
  'Курск',
  'Саратов',
  'Ярославль',
  'Орехово-Зуево',
  'Белгород',
];

// Глобальная переменная для выбранного города
export const selectedCity = ref<string>('Москва');

// Функция для установки выбранного города
export function setSelectedCity(city: string) {
  selectedCity.value = city;
}
// Функция для получения выбранного города
export function getSelectedCity() {
  return selectedCity.value;
}

// Функция, ставящая название города в предложный падеж
export function cityToPrepositional() {
  const cityName = selectedCity.value;
  if (cityName == 'Нижний Новгород') return 'Нижнем Новгороде'
  else if (cityName == 'Казань') return 'Казани'
  else if (cityName == 'Ростов-на-Дону') return 'Ростове-на-Дону'
  else if (cityName == 'Орехово-Зуево') return 'Орехово-Зуеве'
  else if (cityName.slice(-1) == 'а' || cityName.slice(-1) == 'ь') return cityName.slice(0, -1) + 'е'
  else return cityName + 'е'
}