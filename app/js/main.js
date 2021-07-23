// Линейный график
const ctx = document.getElementById('myChart').getContext('2d');
ctx.canvas.parentNode.style.height = 'auto';
ctx.canvas.parentNode.style.maxWidth = '100%';
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: '',
            data: [700, 900, 600, 900, 1050, 1570, 650, 1100, 600, 630, 550, 1480],
            backgroundColor: [
                'rgba(161, 7, 7, 0.8)',
            ],
            pointBorderColor: [
                'rgba(255, 247, 247, 1)',
            ],
            borderColor: [
                'rgba(163, 163, 163, 0.8)',
            ],
            borderWidth: 3,
            pointBorderWidth: 2
        }]
    },
    options: {
        plugins: {
            legend: false,
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Month'
                }
            },
            y: {
                title: {
                    display: true,
                    text: 'Value'
                },
                min: 500,
                max: 2000,
                ticks: {
                    stepSize: 500
                }
            },
        },
        maintainAspectRatio: false,
    },

});
// Круговой график
const ctx1 = document.getElementById('myChart1').getContext('2d');
ctx1.canvas.parentNode.style.height = 'auto';
ctx1.canvas.parentNode.style.maxWidth = '100%';
const myChart1 = new Chart(ctx1, {
    type: 'pie',
    data: {
        labels: ['Domestic', 'Long Haul', 'Regional'],
        datasets: [{
            label: '',
            data: [30, 30, 30],
            backgroundColor: [
                'rgb(109, 24, 9)',
                'rgb(0, 10, 95)',
                'rgb(0, 24, 245)',
            ],
            borderWidth: 0
        }]
    },
    options: {
        maintainAspectRatio: false,
        animations: {
            tension: {
                duration: 2000,
                easing: 'easeInBack',
                from: 1,
                to: 0,
                loop: true
            }
        },
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
            }
        },
    }
});

// Добавление нового графика на страницу

// Кнопка добавления и div куда рендерится график
const btnAddChart = document.querySelector('.btn-addChart');
const addChartDiv = document.querySelector('.addChart'); 

// Функция апроса к "БД"
const getData = (url, callback) => {
    const request = new XMLHttpRequest();
    request.open('GET', url);
    request.send();
    request.addEventListener('readystatechange', () => {
        if (request.readyState !== 4) return;
        if (request.status === 200) {
            const response = JSON.parse(request.response);
            callback(response);
        } else {
            console.error(new Error('Ошибка:' + request.status));
        }
    });
};

// Добавление графика
const addChart = () => {
    // Обработка данных с "сервера" и запуск создания графика
    const mapData = (data) => {
        const country = data.map(item => item.country);
        const value = data.map(item => item.value);
        createBarChart(country, value);
    }

    const createBarChart = (country, value) => {
        // добавление разметки на страницу
        addChartDiv.innerHTML = `
            <div class="myChart myChart--bar h-100">
                <canvas id="myChart2"></canvas>
            </div>
        `;
        const ctx2 = document.getElementById('myChart2').getContext('2d');
        ctx2.canvas.parentNode.style.height = 'auto';
        ctx2.canvas.parentNode.style.maxWidth = '100%';
        const myChart2 = new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: country,
                datasets: [{
                    label: 'Ticket sales per month',
                    data: value,
                    backgroundColor: [
                        'rgb(199, 64, 19)',
                        'rgb(10, 30, 95)',
                        'rgb(30, 24, 645)',
                        'rgb(149, 34, 54)',
                        'rgb(78, 20, 125)',
                        'rgb(890, 84, 545)',
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                maintainAspectRatio: false,
                animations: {
                    tension: {
                        duration: 2000,
                        easing: 'easeInBack',
                        from: 1,
                        to: 0,
                        loop: true
                    }
                },
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                    }
                },
            }
        });
    };

    getData('db/db.json', mapData);

    // Если нужно единичное построение графика - снимаем "прослушку" и отключаем клик по кнопке
    // btnAddChart.removeEventListener('click', addChart);
    // btnAddChart.disabled = true;
};
// Обработчик события для клика на кнопку
btnAddChart.addEventListener('click', addChart);