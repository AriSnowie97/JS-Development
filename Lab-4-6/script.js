"use strict";

const API_URL = "https://api.tvmaze.com/shows";
const movieGrid = document.getElementById('movie-grid');
const searchInput = document.getElementById('search-input');
const sortSelect = document.getElementById('sort-select');
const paginationContainer = document.getElementById('pagination');

// Глобальний стан додатку
let allMovies = [];      // Кеш для початкових 250 серіалів
let currentMovies = [];  // Активний список серіалів для відображення
let currentPage = 1;     // Поточна сторінка
const limit = 12;        // Кількість елементів на сторінку (ідеально для сітки)

// 3. Отримання даних з АРІ (async/await)
async function fetchMovies(query = '') {
    try {
        movieGrid.innerHTML = '<p>Завантаження фільмів...</p>';
        paginationContainer.innerHTML = '';
        
        let data;
        const trimmedQuery = query.trim();
        
        if (trimmedQuery === '') {
            // Якщо пошуковий запит порожній — використовуємо кеш або завантажуємо початковий список
            if (allMovies.length > 0) {
                currentMovies = [...allMovies];
                currentPage = 1;
                filterAndSort();
                return;
            }
            
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error("Помилка завантаження даних з TV Maze API");
            
            allMovies = await response.json();
            currentMovies = [...allMovies];
        } else {
            // Якщо є пошуковий запит — шукаємо по всій базі даних API
            const response = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(trimmedQuery)}`);
            if (!response.ok) throw new Error("Помилка завантаження результатів пошуку");
            
            const searchData = await response.json();
            // Перетворюємо структуру результатів пошуку під загальний формат
            currentMovies = searchData.map(entry => entry.show);
        }
        
        currentPage = 1; // Скидаємо на першу сторінку при новому запиті
        filterAndSort();
    } catch (error) {
        movieGrid.innerHTML = `<p style="color: #ff4d4d;">Сталася помилка: ${error.message}</p>`;
        console.error("Fetch error:", error);
    }
}

// 4. Сортування даних
function filterAndSort() {
    const sortBy = sortSelect.value;
    let sorted = [...currentMovies];

    if (sortBy === 'name-asc') {
        sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'rating-desc') {
        sorted.sort((a, b) => (b.rating.average || 0) - (a.rating.average || 0));
    }

    currentMovies = sorted;
    renderMoviesPage(currentPage);
}

// 5. Відображення конкретної сторінки (ES6 Деструктуризація та Шаблонні рядки)
function renderMoviesPage(page) {
    movieGrid.innerHTML = ''; // Очищення перед рендером
    
    if (currentMovies.length === 0) {
        movieGrid.innerHTML = '<p>Нічого не знайдено :(</p>';
        paginationContainer.innerHTML = '';
        return;
    }

    // Обчислюємо межі елементів для поточної сторінки
    const startIndex = (page - 1) * limit;
    const endIndex = Math.min(startIndex + limit, currentMovies.length);
    const pageMovies = currentMovies.slice(startIndex, endIndex);

    pageMovies.forEach(({ name, image, rating, genres, language }) => {
        // Деструктуризація об'єкта серіалу прямо в циклі
        const movieCard = document.createElement('article');
        const imgUrl = image ? image.medium : 'https://via.placeholder.com/210x295?text=No+Poster';
        const formattedRating = rating && rating.average ? `⭐ ${rating.average}` : '⭐ N/A';
        const formattedGenres = genres && genres.length > 0 ? genres.slice(0, 2).join(', ') : 'N/A';
        const formattedLanguage = language || 'N/A';
        
        movieCard.innerHTML = `
            <img src="${imgUrl}" alt="${name}">
            <h3>${name}</h3>
            <p><span class="rating">${formattedRating}</span></p>
            <p>${formattedGenres} | ${formattedLanguage}</p>
        `;
        movieGrid.appendChild(movieCard);
    });

    renderPaginationControls();
}

// 6. Відображення елементів керування пагінацією
function renderPaginationControls() {
    paginationContainer.innerHTML = '';
    
    const totalPages = Math.ceil(currentMovies.length / limit);
    if (totalPages <= 1) return; // Якщо сторінка лише одна — ховаємо пагінацію

    // Кнопка "Назад"
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '← Назад';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderMoviesPage(currentPage);
            // Прокрутка до верху сітки для кращого UX
            movieGrid.scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Індикатор сторінок
    const pageInfo = document.createElement('span');
    pageInfo.textContent = `Сторінка ${currentPage} з ${totalPages}`;

    // Кнопка "Вперед"
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Вперед →';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderMoviesPage(currentPage);
            // Прокрутка до верху сітки для кращого UX
            movieGrid.scrollIntoView({ behavior: 'smooth' });
        }
    });

    paginationContainer.appendChild(prevBtn);
    paginationContainer.appendChild(pageInfo);
    paginationContainer.appendChild(nextBtn);
}

// 7. Дебаунс (Debounce) для зменшення частоти API-запитів при пошуку
function debounce(func, delay = 500) {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

// Event Listeners з дебаунсом для введення
searchInput.addEventListener('input', debounce((e) => {
    fetchMovies(e.target.value);
}, 500));

sortSelect.addEventListener('change', filterAndSort);

// Початковий запуск при завантаженні
fetchMovies();