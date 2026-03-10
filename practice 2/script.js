"use strict"; // Суворий режим [cite: 33]

// 1. Замикання: Функція-лічильник [cite: 70, 71, 72]
function createCounter() {
    let count = 0; // Приватна змінна [cite: 73]
    return function() {
        count++; // Збільшення [cite: 75]
        return count; // Повернення значення [cite: 76]
    };
}
const counter = createCounter();

// Прив'язка до кнопки без onclick в HTML
document.getElementById('count-btn').addEventListener('click', () => {
    document.getElementById('counter-val').value = counter();
});

// 2. Каррінг: Конвертер температур [cite: 91, 116, 122, 123, 126]
function createConverter(factor, offset) {
    return function(temp) {
        return (temp * factor) + offset; // Формула конвертації [cite: 122]
    };
}

const toFahrenheit = createConverter(1.8, 32); // C to F [cite: 126]

document.getElementById('convert-btn').addEventListener('click', () => {
    const val = Number(prompt("Введіть температуру в градусах Цельсія:")); // Перетворення типів [cite: 106, 120, 147]
    if (!isNaN(val)) {
        const res = toFahrenheit(val);
        alert(`${val}°C дорівнює ${res.toFixed(1)}°F`); // Вивід через alert [cite: 110, 124]
        console.log(`Конвертація: ${val}C -> ${res}F`); // Вивід у консоль [cite: 124]
    }
});

// 3. Комплексна анкета [cite: 101, 103]
function createSurvey() {
    const name = prompt("Введіть ваше ім'я:"); // Отримання даних [cite: 105]
    const age = Number(prompt("Ваш вік:")); // Перетворення на число [cite: 106, 147]
    const city = prompt("Ваше місто:");

    return {
        name,
        age,
        city,
        isAdult: age >= 18 // Перевірка повноліття [cite: 107]
    };
}

document.getElementById('survey-btn').addEventListener('click', () => {
    const surveyData = createSurvey();
    // Використання шаблонних рядків для виводу [cite: 110]
    alert(`Користувач: ${surveyData.name}\nМісто: ${surveyData.city}\nСтатус: ${surveyData.isAdult ? "Повнолітній" : "Неповнолітній"}`);
});