"use strict";

console.log("Підключено JavaScript для Практичної роботи №7");

// ==========================================
// ЗАВДАННЯ 2 & 3: Демонстрація роботи з JSON та масивами
// ==========================================
document.getElementById("loadData").addEventListener("click", () => {
    const output = document.getElementById("output");
    let logText = "";

    const jsonString = '{"name": "Іван", "age": 30}';
    
    let user;
    try {
        user = JSON.parse(jsonString);
        logText += `Розпарсені дані: ${JSON.stringify(user)}\n`;
    } catch (error) {
        console.error("Помилка парсингу JSON", error);
    }

    const newJson = JSON.stringify(user, null, 2);
    logText += `Відформатований JSON:\n${newJson}\n\n`;

    localStorage.setItem("username", "Іван");
    logText += `Зчитано з localStorage (username): ${localStorage.getItem("username")}\n\n`;

    const numbers = [1, 2, 3, 4, 5];
    
    const squares = numbers.map(num => num * num);
    logText += `Квадрати чисел (map): ${squares}\n`;

    const evenNumbers = numbers.filter(num => num % 2 === 0);
    logText += `Парні числа (filter): ${evenNumbers}\n`;

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    logText += `Сума чисел (reduce): ${sum}\n`;

    output.textContent = logText;
});

// ==========================================
// ЗАВДАННЯ 4: Комплексне завдання (To-do list)
// ==========================================
const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTask");
const taskList = document.getElementById("taskList");

function loadTasks() {
    const tasksJSON = localStorage.getItem("tasks");
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}

function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function displayTasks() {
    const tasks = loadTasks();
    taskList.innerHTML = "";
    
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.textContent = task;
        li.setAttribute("data-index", index);
        
        const deleteSpan = document.createElement("span");
        deleteSpan.textContent = "❌";
        deleteSpan.className = "delete-btn";
        
        li.appendChild(deleteSpan);
        taskList.appendChild(li);
    });
}

addTaskButton.addEventListener("click", function() {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
        const tasks = loadTasks();
        tasks.push(taskText);
        saveTasks(tasks);
        displayTasks();
        taskInput.value = "";
    }
});

taskInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTaskButton.click();
    }
});

taskList.addEventListener("click", function(event) {
    const li = event.target.closest("li");
    
    if (li && taskList.contains(li)) {
        const index = li.getAttribute("data-index");
        let tasks = loadTasks();
        
        tasks.splice(index, 1);
        saveTasks(tasks);
        displayTasks();
        console.log("Завдання видалено");
    }
});

displayTasks();