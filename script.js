//Стартовый парсинг и объявление глобальных переменных
let Input_Mattress_Width = parseInt(document.getElementById('input-mattress-width').value) || 0;
let Input_Mattress_Length = parseInt(document.getElementById('input-mattress-length').value) || 0;
let Input_Mattress_Bold = parseInt(document.getElementById('input-mattress-bold').value) || 0;
let Input_Mattress_Amount = parseInt(document.getElementById('input-mattress-amount').value) || 0;
let Input_Textile_Width = parseInt(document.getElementById('input-textile-width').value) || 0;
let Input_Textile_Cost = parseInt(document.getElementById('input-textile-cost').value) || 0;
let Material_First_Layer = parseInt(document.getElementById('material-first-layer').value) || 0;
let Bold_First_Layer = parseInt(document.getElementById('bold-first-layer').value) || 0;
let Material_Second_Layer = parseInt(document.getElementById('material-second-layer').value) || 0;
let Cost_First_Layer = 0;
let Cost_Second_Layer = 0;
let Cost_Third_Layer = 0;
let Bold_Second_Layer = parseInt(document.getElementById('bold-second-layer').value) || 0;
let Material_Third_Layer = parseInt(document.getElementById('material-third-layer').value) || 0;
let Bold_Third_Layer = parseInt(document.getElementById('bold-third-layer').value) || 0;
let Input_Cant_Value = 0; 
let Input_Bort_Value = 0; 
let ScaleUp = 20;
const Cost_Foam = {
    HR3030: 540,
    HR3020: 560,
    VE3508: 535,
    NP2300: 318,
};

calculate()
// Динамический парсинг при изменении значений в полях ввода
document.getElementById('input-mattress-width').addEventListener('blur', () => {
    const widthValue = document.getElementById('input-mattress-width').value;
    const lengthValue = document.getElementById('input-mattress-length').value;

    // Проверяем, что оба поля не пустые
    if (widthValue && lengthValue) {
        Input_Mattress_Width = parseInt(widthValue) || 0;
        Input_Mattress_Length = parseInt(lengthValue) || 0;

        if (Input_Mattress_Width > Input_Mattress_Length) {
            // Меняем значения местами, если ширина больше длины
            [Input_Mattress_Width, Input_Mattress_Length] = [Input_Mattress_Length, Input_Mattress_Width];
            document.getElementById('input-mattress-width').value = Input_Mattress_Width;
            document.getElementById('input-mattress-length').value = Input_Mattress_Length;
        }

        calculate();
    }
});

document.getElementById('input-textile-cost').addEventListener('input', () => {
    Input_Textile_Cost = parseInt(document.getElementById('input-textile-cost').value) || 0;
    calculate();
});

document.getElementById('input-mattress-length').addEventListener('blur', () => {
    const widthValue = document.getElementById('input-mattress-width').value;
    const lengthValue = document.getElementById('input-mattress-length').value;

    // Проверяем, что оба поля не пустые
    if (widthValue && lengthValue) {
        Input_Mattress_Width = parseInt(widthValue) || 0;
        Input_Mattress_Length = parseInt(lengthValue) || 0;

        if (Input_Mattress_Length < Input_Mattress_Width) {
            // Меняем значения местами, если длина меньше ширины
            [Input_Mattress_Width, Input_Mattress_Length] = [Input_Mattress_Length, Input_Mattress_Width];
            document.getElementById('input-mattress-width').value = Input_Mattress_Width;
            document.getElementById('input-mattress-length').value = Input_Mattress_Length;
        }

        calculate();
    }
});

function updateMattressBold() {
    // Считаем сумму толщин слоёв пены
    let totalBold = Bold_First_Layer + Bold_Second_Layer + Bold_Third_Layer;

    // Устанавливаем значение ползунка и текстового вывода
    Input_Mattress_Bold = totalBold;
    document.getElementById('input-mattress-bold').value = Input_Mattress_Bold;
    document.getElementById('input-mattress-bold-output').textContent = Input_Mattress_Bold;

    calculate(); // Пересчитываем все значения
}

// document.getElementById('input-mattress-bold').addEventListener('input', function() {
//     Input_Mattress_Bold = parseInt(this.value) || 0;

//     document.getElementById('input-mattress-bold-output').textContent = Input_Mattress_Bold;
//     calculate();
// });

document.getElementById('input-mattress-amount').addEventListener('input', () => {
    Input_Mattress_Amount = parseInt(document.getElementById('input-mattress-amount').value) || 0;
    calculate();
});

document.getElementById('input-textile-width').addEventListener('input', function() {
    Input_Textile_Width = parseInt(this.value) || 0;

    document.getElementById('input-textile-width-output').textContent = Input_Textile_Width;
    calculate();
});

document.getElementById('input-cant').addEventListener('change', function() {
    const cantImage = document.getElementById('cant-image');
    const bortSwitch = document.getElementById('input-bort');

    if (this.checked) {
        // Если "Кант" включен, включаем и "Борт"
        Input_Cant_Value = 1; 
        Input_Bort_Value = 1; 
        ScaleUp = 50;
        cantImage.src = 'cant+bort.jpg'; // Путь к картинке, когда и "Кант", и "Борт" включены
        bortSwitch.checked = true; // Обновляем состояние переключателя "Борт"
    } else {
        // Если "Кант" выключен, но "Борт" включен
        Input_Cant_Value = 0;
        ScaleUp = 20;
        if (bortSwitch.checked) {
            cantImage.src = 'only-bort.jpeg'; // Путь к картинке, когда только "Борт" включен
        } else {
            cantImage.src = 'cant-bort.jpg'; // Путь к картинке, когда и "Кант", и "Борт" выключены
        }
    }
    calculate();
});

document.getElementById('input-bort').addEventListener('change', function() {
    const cantSwitch = document.getElementById('input-cant');
    const cantImage = document.getElementById('cant-image');

    if (this.checked) {
        // Если "Борт" включен, проверяем, нужен ли "Кант"
        Input_Bort_Value = 1;
        if (cantSwitch.checked) {
            ScaleUp = 50;
            cantImage.src = 'cant+bort.jpg'; // Путь к картинке, когда и "Кант", и "Борт" включены
        } else {
            ScaleUp = 20;
            cantImage.src = 'only-bort.jpeg'; // Путь к картинке, когда только "Борт" включен
        }
    } else {
        // Если "Борт" выключен, обязательно выключаем "Кант"
        Input_Bort_Value = 0;
        Input_Cant_Value = 0;
        ScaleUp = 20;
        cantSwitch.checked = false; // Обновляем состояние переключателя "Кант"
        cantImage.src = 'cant-bort.jpg'; // Путь к картинке, когда и "Кант", и "Борт" выключены
    }
    calculate();
});



//Динамический парсинг выбора материала первого слоя
document.getElementById('material-first-layer').addEventListener('input', () => {
    Material_First_Layer = parseInt(document.getElementById('material-first-layer').value) || 0;

    const SelectedFirstMaterialText = document.querySelector('#material-first-layer option:checked').textContent.trim();
    Cost_First_Layer = Cost_Foam[SelectedFirstMaterialText] || 0;
    calculate();
});

//Динамический парсинг выбора толщины первого слоя
document.getElementById('bold-first-layer').addEventListener('input', () => {
    Bold_First_Layer = parseInt(document.getElementById('bold-first-layer').value) || 0;
    calculate();
    updateMattressBold()
});

//Динамический парсинг выбора материала второго стлоя
document.getElementById('material-second-layer').addEventListener('input', () => {
    Material_Second_Layer = parseInt(document.getElementById('material-second-layer').value) || 0;
    const SelectedSecondMaterialText = document.querySelector('#material-second-layer option:checked').textContent.trim();
    Cost_Second_Layer = Cost_Foam[SelectedSecondMaterialText] || 0;
    calculate();
});
//Динамический парсинг толщины второго слоя
document.getElementById('bold-second-layer').addEventListener('input', () => {
    Bold_Second_Layer = parseInt(document.getElementById('bold-second-layer').value) || 0;
    calculate();
    updateMattressBold()
});

//Динамический парсинг выбора материала третьего стлоя
document.getElementById('material-third-layer').addEventListener('input', () => {
    Material_Third_Layer = parseInt(document.getElementById('material-third-layer').value) || 0;
    const SelectedThirdMaterialText = document.querySelector('#material-third-layer option:checked').textContent.trim();
    Cost_Third_Layer = Cost_Foam[SelectedThirdMaterialText] || 0
    calculate();
});
//Динамический парсинг толщины третьего слоя
document.getElementById('bold-third-layer').addEventListener('input', () => {
    Bold_Third_Layer = parseInt(document.getElementById('bold-third-layer').value) || 0;
    calculate();
    updateMattressBold()
});
// Динамический парсинг при изменении значений в полях ввода




// Функция расчета всех значений и вывод на фронт
function calculate() {

    // Считаем объем матраса
    let Mattress_Volume = Math.round(((Input_Mattress_Width / 1000) * (Input_Mattress_Length / 1000) * (Input_Mattress_Bold / 1000) * Input_Mattress_Amount) * 1000) / 1000;
    let details = countDetails();
    let BF_Out = bestFit(Input_Textile_Width, details);

    // Рассчитываем стоимость слоев
    
    let Full_Cost_First_Layer = (Input_Mattress_Length/1000)*(Input_Mattress_Width/1000)*(Bold_First_Layer/1000)*(Material_First_Layer)*Cost_First_Layer;
    let Full_Cost_Second_Layer = (Input_Mattress_Length/1000)*(Input_Mattress_Width/1000)*(Bold_Second_Layer/1000)*(Material_Second_Layer)*Cost_Second_Layer;
    let Full_Cost_Third_Layer = (Input_Mattress_Length/1000)*(Input_Mattress_Width/1000)*(Bold_Third_Layer/1000)*(Material_Third_Layer)*Cost_Third_Layer;
    let Full_Cost_Foam = Math.round((Full_Cost_First_Layer + Full_Cost_Second_Layer + Full_Cost_Third_Layer)*1000)/1000;

    //Расчёт стоимости ткани
    let Full_Textile_Cost = Input_Textile_Cost * (BF_Out.rollLength/1000);
    let Full_Cost_Mattress = Full_Textile_Cost + Full_Cost_Foam;


    // Выводим результат на фронт
    document.getElementById('mattress-volume').textContent = `Объём матраса: ${Mattress_Volume} м³`;
    document.getElementById('textile-length').textContent = `Длина рулона: ${BF_Out.rollLength} мм`;
    // document.getElementById('details-list').textContent = `Детали: ${details.map(d => d.join(' x ')).join(', ')}`;
    document.getElementById('cost-foam').textContent = `Цена пены: ${Full_Cost_Foam} ₽`; // Убедитесь, что этот элемент существует на странице
    document.getElementById('full-textile-cost').textContent = `Цена рулона: ${Full_Textile_Cost} ₽`; // Убедитесь, что этот элемент существует на странице
    document.getElementById('full-cost-mattress').textContent = `Цена изделия: ${Full_Cost_Mattress} ₽`; // Убедитесь, что этот элемент существует на странице
}



//Раскладка деталей матраса исходя из размеров
function countDetails() {
    let details = [];
    
    if (Input_Mattress_Width < Input_Textile_Width) {
        for (let i = 0; i < Input_Mattress_Amount * 2; i++) {
            details.push([Input_Mattress_Width + ScaleUp, Input_Mattress_Length + ScaleUp]);
            details.push([Input_Mattress_Width + ScaleUp, Input_Mattress_Bold + ScaleUp]);
            details.push([Input_Mattress_Bold + ScaleUp, Input_Mattress_Length + ScaleUp]);
        }
    } else {
        for (let i = 0; i < Input_Mattress_Amount * 2; i++) {
            details.push([(Input_Mattress_Width / 2) + ScaleUp, Input_Mattress_Length + ScaleUp]);
            details.push([(Input_Mattress_Width / 2) + ScaleUp, Input_Mattress_Length + ScaleUp]);
            details.push([Input_Mattress_Width + ScaleUp, Input_Mattress_Bold + ScaleUp]);
            details.push([Input_Mattress_Bold + ScaleUp, Input_Mattress_Length + ScaleUp]);
        }
    }
    
    return details;
}

function bestFit(width, parts) {
    // Сортируем детали по ширине и высоте, используя First Fit Decreasing
    parts.sort((a, b) => Math.max(b[0], b[1]) - Math.max(a[0], a[1]));

    let currentHeight = 0; // Текущая высота рулона
    const rows = [];        // Массив для хранения рядов с деталями
    const details = [];     // Массив для хранения всех деталей с координатами

    for (const [partWidth, partHeight] of parts) {
        let placed = false;

        // Пытаемся разместить деталь в существующих рядах
        for (const row of rows) {
            if (row.width + partWidth <= width) {
                const x = row.width;
                const y = row.y;
                details.push([x, y, partWidth, partHeight]);

                row.width += partWidth;
                row.height = Math.max(row.height, partHeight);
                placed = true;
                break;
            }
        }

        // Если деталь не удалось разместить в существующих рядах, создаём новый ряд
        if (!placed) {
            const x = 0;
            const y = currentHeight;
            details.push([x, y, partWidth, partHeight]);

            rows.push({ width: partWidth, height: partHeight, y: currentHeight });
            currentHeight += partHeight;
        }
    }

    // Возвращаем список деталей и общую длину рулона
    return {
        details: details,
        rollLength: currentHeight
    };
}



//Всякая декоративная вещь

// Функция для копирования текста в буфер обмена
function copyToClipboard(text) {
    const tempInput = document.createElement('input');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert(`Скопировано в буфер обмена: ${text}`);
}

// Добавление обработчика событий для каждого <p> внутри #results
document.querySelectorAll('#results p').forEach(p => {
    p.addEventListener('click', function() {
        copyToClipboard(this.textContent);
    });
});


function visualize() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    // Генерируем детали с учетом введенных пользователем данных
    const details = countDetails();
    const inputTextile = Input_Textile_Width;

    // Получаем позиции деталей для визуализации
    const { details: detailPositions } = bestFit(inputTextile, details);

    // Настраиваем размеры холста
    canvas.width = inputTextile;
    canvas.height = detailPositions.reduce((max, pos) => Math.max(max, pos[1] + pos[3]), 0) + 20; // Добавляем немного места для легенды

    // Очищаем холст перед рисованием
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Настройки сетки
    const gridSize = 10;
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 0.5;

    // Рисуем координатную сетку
    for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }

    // Массив для цветов и объект для хранения цветов одинаковых размеров
    const colors = ['#FF6347', '#4682B4', '#32CD32', '#FFD700', '#FF69B4', '#8A2BE2', '#FF4500', '#DAA520'];
    const sizeToColorMap = {};
    let colorIndex = 0;

    // Рисуем детали
    detailPositions.forEach(([x, y, width, height]) => {
        const sizeKey = `${width}x${height}`; // Создаем уникальный ключ на основе размера

        if (!sizeToColorMap[sizeKey]) {
            // Если для такого размера еще не было цвета, назначаем новый
            sizeToColorMap[sizeKey] = colors[colorIndex % colors.length];
            colorIndex++;
        }

        const color = sizeToColorMap[sizeKey];
        ctx.fillStyle = color;
        ctx.fillRect(x, y, width, height);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 1;
        ctx.strokeRect(x, y, width, height);

        // Добавляем размеры деталей
        ctx.fillStyle = '#000';
        ctx.font = '12px Arial';
        ctx.fillText(`${width}x${height}`, x + 5, y + 15);
    });

    // Добавляем интерактивность: отображение размеров при наведении
    canvas.addEventListener('mousemove', function (e) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        // Очищаем холст и перерисовываем детали
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#ddd';
        ctx.lineWidth = 0.5;

        // Рисуем сетку
        for (let x = 0; x <= canvas.width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
            ctx.stroke();
        }
        for (let y = 0; y <= canvas.height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
            ctx.stroke();
        }

        detailPositions.forEach(([x, y, width, height], index) => {
            const sizeKey = `${width}x${height}`;
            const color = sizeToColorMap[sizeKey];

            ctx.fillStyle = color;
            ctx.fillRect(x, y, width, height);
            ctx.strokeStyle = '#000';
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, width, height);

            // Если мышь над деталью, отображаем размеры
            if (mouseX > x && mouseX < x + width && mouseY > y && mouseY < y + height) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fillRect(x, y - 20, 100, 20); // Полупрозрачный фон для текста
                ctx.fillStyle = '#000';
                ctx.fillText(`Размер: ${width}x${height}`, x + 5, y - 5);
            } else {
                ctx.fillStyle = '#000';
                ctx.fillText(`${width}x${height}`, x + 5, y + 15);
            }
        });
    });

    // Масштабирование холста с помощью колесика мыши
    let scale = 1;
    canvas.addEventListener('wheel', function (e) {
        e.preventDefault();
        const scaleAmount = 0.1;
        scale += e.deltaY < 0 ? scaleAmount : -scaleAmount;
        scale = Math.min(Math.max(0.5, scale), 2); // Ограничение масштаба от 0.5 до 2

        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        visualize(); // Перерисовываем холст с новым масштабом
    });
}

    // Масштабирование холста с помощью колесика мыши
    let scale = 1;
    canvas.addEventListener('wheel', function (e) {
        e.preventDefault();
        const scaleAmount = 0.1;
        scale += e.deltaY < 0 ? scaleAmount : -scaleAmount;
        scale = Math.min(Math.max(0.5, scale), 2); // Ограничение масштаба от 0.5 до 2

        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        visualize(); // Перерисовываем холст с новым масштабом
    });

    


// Активируем кнопку "Визуализировать", если все расчеты выполнены
document.getElementById('visualize-button').disabled = false;
