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
let Bold_Second_Layer = parseInt(document.getElementById('bold-second-layer').value) || 0;
let Material_Third_Layer = parseInt(document.getElementById('material-third-layer').value) || 0;
let Bold_Third_Layer = parseInt(document.getElementById('bold-third-layer').value) || 0;
let Input_Cant_Value = 0; 
let Input_Bort_Value = 0; 
let Cost_First_Layer = 0;
let Cost_Second_Layer = 0;
let Cost_Third_Layer = 0;
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
    let details = countDetails();
    let BF_Out = bestFit(Input_Textile_Width, details);

    // Рассчитываем стоимость слоев
    
    let Full_Cost_First_Layer = (Input_Mattress_Length/1000)*(Input_Mattress_Width/1000)*(Bold_First_Layer/1000)*(Material_First_Layer)*Cost_First_Layer;
    let Full_Cost_Second_Layer = (Input_Mattress_Length/1000)*(Input_Mattress_Width/1000)*(Bold_Second_Layer/1000)*(Material_Second_Layer)*Cost_Second_Layer;
    let Full_Cost_Third_Layer = (Input_Mattress_Length/1000)*(Input_Mattress_Width/1000)*(Bold_Third_Layer/1000)*(Material_Third_Layer)*Cost_Third_Layer;
    let Full_Cost_Foam = Math.round((Full_Cost_First_Layer + Full_Cost_Second_Layer + Full_Cost_Third_Layer)*1000)/1000;

    //Расчёт стоимости ткани
    let Full_Textile_Cost = Math.round((Input_Textile_Cost * (BF_Out.rollLength/1000)*1000)/1000);
    let Full_Cost_Mattress = Math.round((((Full_Textile_Cost + Full_Cost_Foam)*1.2*1.6*1.3)*1000)/1000);


    // Выводим результат на фронт
    document.getElementById('textile-length').textContent = `Длина рулона: ${BF_Out.rollLength} мм`;
    document.getElementById('cost-foam').textContent = `Цена пены: ${Full_Cost_Foam} ₽`; // Убедитесь, что этот элемент существует на странице
    document.getElementById('full-textile-cost').textContent = `Цена рулона: ${Full_Textile_Cost} ₽`; // Убедитесь, что этот элемент существует на странице
    document.getElementById('full-cost-mattress').textContent = `Цена изделия: ${Full_Cost_Mattress} ₽`; // Убедитесь, что этот элемент существует на странице
}



//Раскладка деталей матраса исходя из размеров
function countDetails() {
    let details = [];
    
    if (Input_Mattress_Width < Input_Textile_Width) {
        for (let i = 0; i < Input_Mattress_Amount * 2; i++) {
            details.push([Input_Mattress_Width + ScaleUp*2, Input_Mattress_Length + ScaleUp]);
            details.push([Input_Mattress_Width + ScaleUp*2, Input_Mattress_Bold + ScaleUp]);
            details.push([Input_Mattress_Bold + ScaleUp*2, Input_Mattress_Length + ScaleUp]);
        }
    } else {
        for (let i = 0; i < Input_Mattress_Amount * 2; i++) {
            details.push([(Input_Mattress_Width / 2) + ScaleUp*2, Input_Mattress_Length + ScaleUp]);
            details.push([(Input_Mattress_Width / 2) + ScaleUp*2, Input_Mattress_Length + ScaleUp]);
            details.push([(Input_Mattress_Width/2) + ScaleUp*2, Input_Mattress_Bold + ScaleUp]);
            details.push([Input_Mattress_Bold + ScaleUp*2, Input_Mattress_Length + ScaleUp]);
        }
    }
    
    console.log("Список деталей:", details); // Добавляем вывод для проверки
    return details;
}


function bestFit(width, parts) {
    let minRollLength = Infinity;
    let bestArrangement = [];

    class Node {
        constructor(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
            this.used = false;
            this.right = null;
            this.down = null;
        }

        insert(partWidth, partHeight) {
            if (this.used) {
                return this.right.insert(partWidth, partHeight) || this.down.insert(partWidth, partHeight);
            } else if (partWidth <= this.width && partHeight <= this.height) {
                this.used = true;
                this.right = new Node(this.x + partWidth, this.y, this.width - partWidth, partHeight);
                this.down = new Node(this.x, this.y + partHeight, this.width, this.height - partHeight);
                return this;
            } else {
                return null;
            }
        }
    }

    function fit(parts, width) {
        const root = new Node(0, 0, width, Infinity);
        let maxY = 0;

        parts.sort((a, b) => b[1] - a[1]); // Сортируем по высоте

        for (let part of parts) {
            const node = root.insert(part[0], part[1]);
            if (node) {
                part.x = node.x;
                part.y = node.y;
                maxY = Math.max(maxY, node.y + part[1]);
            } else {
                return Infinity;
            }
        }
        return maxY;
    }

    const rollLength = fit(parts, width);

    if (rollLength < minRollLength) {
        minRollLength = rollLength;
        bestArrangement = parts.map(part => ({
            x: part.x,
            y: part.y,
            width: part[0],
            height: part[1]
        }));
    }

    return {
        details: bestArrangement,
        rollLength: minRollLength
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
    canvas.height = detailPositions.reduce((max, pos) => Math.max(max, pos.y + pos.height), 0) + 20; // Добавляем немного места для легенды

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
    detailPositions.forEach(({ x, y, width, height }) => {
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


}


    


// Активируем кнопку "Визуализировать", если все расчеты выполнены
document.getElementById('visualize-button').disabled = false;