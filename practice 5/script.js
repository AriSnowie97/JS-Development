"use strict";

const displayArea = document.getElementById('display-area');
const inputField = document.getElementById('poke-name');

// 1. Основна асинхронна функція для отримання даних
async function getPokemonData(nameOrId) {
    displayArea.innerHTML = "<p>Завантаження...</p>";
    
    try {
        // Fetch API запит
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${nameOrId.toLowerCase()}`);
        
        // Перевірка статусу (Завдання 6.4)
        if (!response.ok) {
            throw new Error("Покемона не знайдено!");
        }

        const data = await response.json();
        renderPokemon(data);
        
    } catch (error) {
        // Обробка помилок (Завдання 9)
        displayArea.innerHTML = `<p style="color: #ffde00;">⚠️ Помилка: ${error.message}</p>`;
        console.error("Помилка запиту:", error);
    }
}

// 2. Функція відображення (DOM маніпуляції)
function renderPokemon(pokemon) {
    const { name, sprites, height, weight, types } = pokemon; // Деструктуризація
    
    displayArea.innerHTML = `
        <article>
            <img src="${sprites.front_default}" alt="${name}">
            <h2>${name.toUpperCase()}</h2>
            <p>Тип: ${types.map(t => t.type.name).join(', ')}</p>
            <p>Ріст: ${height/10} м | Вага: ${weight/10} кг</p>
        </article>
    `;
}

// 3. Обробники подій
document.getElementById('fetch-btn').addEventListener('click', () => {
    const query = inputField.value.trim();
    if (query) getPokemonData(query);
});

document.getElementById('random-btn').addEventListener('click', () => {
    const randomId = Math.floor(Math.random() * 150) + 1;
    getPokemonData(randomId);
});

// Додатково: Пошук по Enter
inputField.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') getPokemonData(inputField.value);
});

console.log("Async Script Loaded: Практична 5 активована.");