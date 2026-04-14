"use strict";
import { userData } from './data.js';
import * as Utils from './utils.js';

const userOut = document.getElementById('user-output');
const mathOut = document.getElementById('math-output');

// 1. Деструктуризація та Шаблонні рядки (Завдання 2.1)
const { name, age, city } = userData;
userOut.textContent = `${Utils.greet(name)}. Вік: ${age}, Місто: ${city}`;

// 2. Spread оператор (Завдання 2.2)
const additionalSkills = ["Git", "TypeScript"];
const allSkills = [...userData.skills, ...additionalSkills];
console.log("Всі навички (Spread):", allSkills);

// 3. Обробка подій
document.getElementById('calc-sum').addEventListener('click', () => {
    // Приклад Rest оператора
    const result = Utils.sumAll(10, 20, 30, 40);
    mathOut.textContent = `Сума (10, 20, 30, 40) = ${result}`;
});

document.getElementById('calc-mult').addEventListener('click', () => {
    const result = Utils.multiply(5, 10);
    mathOut.textContent = `Добуток 5 x 10 = ${result}`;
});