// 1. Класи для частин резюме
class PersonalInfo {
    constructor(name, age, contacts) {
        this.name = name;
        this.age = Number(age); // Обробка даних: переведення у число
        this.contacts = contacts;
    }
}

class Experience { constructor(desc) { this.desc = desc || "Без досвіду"; } }
class Education { constructor(desc) { this.desc = desc || "Не вказано"; } }
class Skills { 
    constructor(list) { 
        this.list = list.split(',').map(s => s.trim()).filter(s => s !== ""); 
    } 
}

// 2. Головний клас Resume
class Resume {
    constructor(personal, exp, edu, skills) {
        this.personal = personal;
        this.experience = exp;
        this.education = edu;
        this.skills = skills;
    }

    // Метод для відображення резюме за допомогою DOM-методів
    render(containerId) {
        const container = document.getElementById(containerId);
        container.innerHTML = ''; // Очистка
        container.classList.remove('hidden');

        // Створення елементів через DOM
        const header = document.createElement('div');
        header.className = 'resume-header';
        header.innerHTML = `<h2>${this.personal.name}</h2><p>Вік: ${this.personal.age} | Email: ${this.personal.contacts}</p>`;

        const body = document.createElement('div');
        body.innerHTML = `
            <div class="resume-section"><h4>Освіта</h4><p>${this.education.desc}</p></div>
            <div class="resume-section"><h4>Досвід роботи</h4><p>${this.experience.desc}</p></div>
            <div class="resume-section"><h4>Навички</h4><p>${this.skills.list.join(' • ')}</p></div>
        `;

        container.appendChild(header);
        container.appendChild(body);
        
        // Додатково: збереження в localStorage
        localStorage.setItem('savedResume', JSON.stringify(this));
    }
}

// 3. Логіка взаємодії
document.getElementById('resume-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Збір та валідація
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const contacts = document.getElementById('contacts').value;

    if (age < 0 || age > 120) {
        alert("Введіть коректний вік!");
        return;
    }

    // Створення об'єктів (ООП)
    const pInfo = new PersonalInfo(name, age, contacts);
    const exp = new Experience(document.getElementById('experience').value);
    const edu = new Education(document.getElementById('education').value);
    const skills = new Skills(document.getElementById('skills').value);

    const myResume = new Resume(pInfo, exp, edu, skills);
    myResume.render('resume-output');
});

// Кнопка очищення
document.getElementById('clear-btn').addEventListener('click', () => {
    localStorage.removeItem('savedResume');
    location.reload();
});