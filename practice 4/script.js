"use strict";

const todoForm = document.querySelector('#todo-form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#task-list');

// Функція для створення нового елемента списку
function createInputTask(text) {
    const li = document.createElement('li');
    li.innerHTML = `
        <span>${text}</span>
        <button class="delete-btn">Видалити</button>
    `;
    return li;
}

// 1. Обробка надсилання форми
todoForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Запобігаємо перезавантаженню

    const taskText = taskInput.value.trim(); // Використання trim() згідно з ТЗ

    if (taskText !== "") {
        const newTask = createInputTask(taskText);
        taskList.appendChild(newTask);
        taskInput.value = ""; // Очищення поля
    } else {
        alert("Будь ласка, введіть текст завдання!");
    }
});

// 2. ДЕЛЕГУВАННЯ ПОДІЙ (Event Delegation)
// Замість того, щоб вішати слухача на кожну кнопку, вішаємо один на весь список <ul>
taskList.addEventListener('click', (event) => {
    // Перевіряємо, чи клікнули саме по кнопці видалення
    if (event.target.classList.contains('delete-btn')) {
        const itemToDelete = event.target.parentElement;
        itemToDelete.style.opacity = '0';
        
        // Плавне видалення після анімації
        setTimeout(() => {
            itemToDelete.remove();
        }, 300);
    }
});

console.log("DOM Script loaded: Робота з подіями активована.");