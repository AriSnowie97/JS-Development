"use strict"; // Суворий режим за вимогою [cite: 209]

// --- 4.1 Комплексне завдання: Бібліотека користувачів ---

// Базовий клас User [cite: 256, 293]
class User {
    constructor(name, age, profession) {
        this._name = name; // Інкапсуляція (угода про приватність) [cite: 316]
        this._age = Number(age); 
        this.profession = profession;
    }

    // Геттери та сеттери для інкапсуляції [cite: 262, 270, 322]
    get age() { return this._age; }
    set age(value) {
        if (value > 0) this._age = value; // Валідація 
    }

    display() {
        return `Користувач: ${this._name}, Вік: ${this._age}, Професія: ${this.profession}`;
    }
}

// Клас Admin, що наслідується від User [cite: 243, 294]
class Admin extends User {
    constructor(name, age, profession, role) {
        super(name, age, profession); // Виклик конструктора батька [cite: 245, 312]
        this.role = role;
    }

    // Перевизначення методу (Поліморфізм) 
    display() {
        return `[ADMIN] ${this._name} (Роль: ${this.role}), Вік: ${this._age}`;
    }
}

// Логіка інтерфейсу
const log = document.getElementById('users-log');

function addToLog(text) {
    const entry = document.createElement('div');
    entry.textContent = `> ${text}`;
    log.appendChild(entry);
    console.log(text);
}

// Обробка створення користувача через prompt [cite: 296, 304]
document.getElementById('add-user-btn').addEventListener('click', () => {
    const name = prompt("Ім'я користувача:");
    const age = prompt("Вік:");
    const prof = prompt("Професія:");

    if (name && !isNaN(Number(age)) && Number(age) > 0) {
        const newUser = new User(name, age, prof);
        addToLog(newUser.display());
        alert("Користувача додано!");
    } else {
        alert("Помилка валідації!");
    }
});

document.getElementById('add-admin-btn').addEventListener('click', () => {
    const name = prompt("Ім'я адміна:");
    const age = prompt("Вік:");
    const role = prompt("Роль (напр. Superadmin):");

    if (name && !isNaN(Number(age))) {
        const newAdmin = new Admin(name, age, "Адміністратор", role);
        addToLog(newAdmin.display());
        alert("Адміністратора додано!");
    }
});

console.log("Підключено JavaScript для Практичної роботи №3"); // [cite: 210]