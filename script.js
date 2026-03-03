document.getElementById('start-btn').addEventListener('click', function() {
    // 8.1 Демонстрація базових вікон (Event Loop Placeholder)
    alert("Welcome!");
    
    // Збір даних
    let name = prompt("Введіть ваше ім'я:");
    let ageInput = prompt("Скільки вам років?");
    let city = prompt("З якого ви міста?");
    let color = prompt("Ваш улюблений колір?");
    let isWorking = confirm("Ви зараз працюєте?");

    // Перетворення віку на число
    let age = Number(ageInput);

    // Перевірка на повноліття
    let isAdult = age >= 18;
    let adultStatus = isAdult ? "Повнолітній" : "Неповнолітній";

    // Формування об'єкта з типами даних
    const userData = {
        name: { value: name, type: typeof name },
        age: { value: age, type: typeof age },
        city: { value: city, type: typeof city },
        color: { value: color, type: typeof color },
        isWorking: { value: isWorking, type: typeof isWorking }
    };

    // Вивід у консоль (як просили в ТЗ)
    console.log("Користувач ввів ім'я:", name);
    console.log("Підтвердження роботи:", isWorking);
    console.table(userData);

    // Відображення результату через alert
    alert(`Користувач: ${name}\nСтатус: ${adultStatus}\nВік (тип): ${typeof age}`);

    // Вивід результатів на сторінку
    const output = document.getElementById('output');
    output.textContent = JSON.stringify(userData, null, 2);
    document.getElementById('results').classList.remove('hidden');
});