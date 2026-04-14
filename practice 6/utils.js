// Стрілочна функція з параметрами за замовчуванням
export const greet = (name = "Гість") => `Вітаємо, ${name}!`;

// Використання Rest оператора для суми будь-якої кількості чисел
export const sumAll = (...nums) => nums.reduce((acc, n) => acc + n, 0);

// Звичайна математична функція
export const multiply = (a, b) => a * b;