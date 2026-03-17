"use strict";

const API_URL = "https://api.tvmaze.com/shows";
const movieGrid = document.getElementById('movie-grid');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');

let allMovies = []; // Локальне сховище для фільтрації

// 3. Отримання даних з АРІ (async/await)
async function fetchMovies() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("Помилка завантаження даних");
        
        allMovies = await response.json();
        renderMovies(allMovies);
    } catch (error) {
        movieGrid.innerHTML = `<p style="color: #ff4d4d;">Сталася помилка: ${error.message}</p>`;
        console.error("Fetch error:", error);
    }
}

// 4. Відображення даних (ES6 Деструктуризація та Шаблонні рядки)
function renderMovies(movies) {
    movieGrid.innerHTML = ''; // Очищення
    
    if (movies.length === 0) {
        movieGrid.innerHTML = '<p>Нічого не знайдено :(</p>';
        return;
    }

    movies.forEach(({ name, image, rating, genres, language }) => {
        // Деструктуризація об'єкта фільму прямо в циклі
        const movieCard = document.createElement('article');
        const imgUrl = image ? image.medium : 'https://via.placeholder.com/210x295?text=No+Poster';
        
        movieCard.innerHTML = `
            <img src="${imgUrl}" alt="${name}">
            <h3>${name}</h3>
            <p><span class="rating">⭐ ${rating.average || 'N/A'}</span></p>
            <p>${genres.slice(0, 2).join(', ')} | ${language}</p>
        `;
        movieGrid.appendChild(movieCard);
    });
}

// 5. Фільтрація та сортування
function filterAndSort() {
    const searchTerm = searchInput.value.toLowerCase();
    const sortBy = sortSelect.value;

    let filtered = allMovies.filter(movie => 
        movie.name.toLowerCase().includes(searchTerm)
    );

    if (sortBy === 'name-asc') {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'rating-desc') {
        filtered.sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0));
    }

    renderMovies(filtered);
}

// Event Listeners
searchInput.addEventListener('input', filterAndSort);
sortSelect.addEventListener('change', filterAndSort);

// Запуск при завантаженні
fetchMovies();