// Подключаем Font Awesome
if (!document.querySelector('link[href*="font-awesome"]')) {
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css';
    document.head.appendChild(fontAwesome);
}

// ========== СЧЕТЧИК ОТНОШЕНИЙ ==========
function updateRelationshipCounter() {
    const startDate = new Date('2025-02-18T00:00:00'); // Начало отношений
    const currentDate = new Date(); // Текущая дата (14.02.2026)
    
    // Устанавливаем конкретную дату 14.02.2026 для тестирования
    // Закомментируйте следующую строку, чтобы считать от текущей даты
    const valentine2026 = new Date('2026-02-14T12:00:00');
    const today = valentine2026; // Замените на currentDate для реального отсчета
    
    // Разница в миллисекундах
    const diffTime = Math.abs(today - startDate);
    
    // Вычисляем дни, месяцы, недели, часы
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffMonths = Math.floor(diffDays / 30.44); // Среднее количество дней в месяце
    const diffWeeks = Math.floor(diffDays / 7);
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    // Обновляем отображение
    document.getElementById('daysCounter').textContent = diffDays.toLocaleString();
    document.getElementById('monthsCounter').textContent = diffMonths;
    document.getElementById('weeksCounter').textContent = diffWeeks;
    document.getElementById('hoursCounter').textContent = diffHours.toLocaleString();
    
    // Добавляем анимацию при обновлении счетчика
    const counterValue = document.getElementById('daysCounter');
    counterValue.style.transform = 'scale(1.1)';
    setTimeout(() => {
        counterValue.style.transform = 'scale(1)';
    }, 300);
}

// Обновляем счетчик каждую секунду
setInterval(updateRelationshipCounter, 1000);
updateRelationshipCounter(); // Первоначальный запуск

// ========== ПАДАЮЩИЕ СЕРДЕЧКИ ==========
function createHearts() {
    const container = document.getElementById('heartContainer');
    const heartCount = 25;

    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';

        // Случайные параметры
        const size = Math.random() * 25 + 15;
        const startPosition = Math.random() * 100;
        const animationDuration = Math.random() * 8 + 10;
        const delay = Math.random() * 5;

        heart.style.left = `${startPosition}%`;
        heart.style.fontSize = `${size}px`;
        heart.style.animationDuration = `${animationDuration}s`;
        heart.style.animationDelay = `${delay}s`;

        // Случайный цвет
        const colors = ['#ff3366', '#ff6b9d', '#ffafbd', '#d81b60'];
        heart.style.color = colors[Math.floor(Math.random() * colors.length)];

        container.appendChild(heart);

        // Удаляем сердечко после анимации
        setTimeout(() => {
            heart.remove();
        }, (animationDuration + delay) * 1000);
    }
}

// Создаем сердечки каждые 500мс
setInterval(createHearts, 500);
createHearts();

// ========== КНОПКА ЛЮБВИ ==========
document.getElementById('loveButton').addEventListener('click', function() {
    const button = this;
    const secretMessage = document.getElementById('secretMessage');

    // Анимация кнопки
    button.style.transform = 'scale(0.95)';
    button.innerHTML = '<i class="fas fa-heart"></i> ЛЮБОВЬ ЗАПУЩЕНА! <i class="fas fa-heart"></i>';
    button.style.background = 'linear-gradient(to right, #ff6b9d, #ff3366, #ff0066)';

    // Взрыв сердечек
    for(let i = 0; i < 30; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '💖';
            heart.style.position = 'fixed';
            heart.style.fontSize = '30px';
            heart.style.zIndex = '9999';
            heart.style.pointerEvents = 'none';

            const buttonRect = button.getBoundingClientRect();
            const startX = buttonRect.left + buttonRect.width / 2;
            const startY = buttonRect.top + buttonRect.height / 2;

            heart.style.left = `${startX}px`;
            heart.style.top = `${startY}px`;

            document.body.appendChild(heart);

            // Анимация взрыва
            const angle = Math.random() * Math.PI * 2;
            const velocity = 2 + Math.random() * 3;
            const distance = 100 + Math.random() * 150;

            let x = 0, y = 0;
            const animation = setInterval(() => {
                x += Math.cos(angle) * velocity;
                y += Math.sin(angle) * velocity;

                heart.style.left = `${startX + x}px`;
                heart.style.top = `${startY + y}px`;
                heart.style.opacity = 1 - (Math.sqrt(x*x + y*y) / distance);

                if (Math.sqrt(x*x + y*y) > distance) {
                    clearInterval(animation);
                    heart.remove();
                }
            }, 16);
        }, i * 30);
    }

    // Обновляем сообщение
    secretMessage.innerHTML = '💖 I LOVE YOU БЕСКОНЕЧНО! 💖';
    secretMessage.style.fontSize = '1.8em';
    secretMessage.style.color = '#ff0066';
    secretMessage.style.animation = 'pulse 1s infinite';

    // Звуковой эффект
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.5);
    } catch (e) {
        console.log("Аудио не поддерживается");
    }

    // Восстанавливаем кнопку
    setTimeout(() => {
        button.style.transform = '';
        button.innerHTML = '<i class="fas fa-heartbeat"></i> ЛЮБОВЬ АКТИВИРОВАНА! <i class="fas fa-heartbeat"></i>';
        button.style.background = 'linear-gradient(to right, #ff3366, #ff6b9d)';
    }, 1500);
});

// ========== АНИМАЦИЯ ФОТО ==========
document.getElementById('mainPhoto').addEventListener('mouseover', function() {
    this.style.transform = 'scale(1.08)';
});

document.getElementById('mainPhoto').addEventListener('mouseout', function() {
    this.style.transform = 'scale(1)';
});

// ========== МЕРЦАНИЕ ЗАГОЛОВКА ==========
setInterval(() => {
    const title = document.querySelector('h1');
    title.style.textShadow = `3px 3px 0px rgba(${Math.random()*255}, ${Math.random()*100}, ${Math.random()*150}, 0.5)`;
}, 2000);

// ========== АВТОМАТИЧЕСКОЕ ОБНОВЛЕНИЕ СЧЕТЧИКА ==========
// Обновляем счетчик каждую минуту для точности
setInterval(updateRelationshipCounter, 60000);