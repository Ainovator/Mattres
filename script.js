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
    Input_Mattress_Width = parseInt(document.getElementById('input-mattress-width').value) || 0;

    if (Input_Mattress_Width > Input_Mattress_Length && Input_Mattress_Length !== 0 && Input_Mattress_Width !== 0) {
        // Меняем значения местами
        const temp = Input_Mattress_Length;
        Input_Mattress_Length = Input_Mattress_Width;
        Input_Mattress_Width = temp;

        // Обновляем значения в полях ввода
        document.getElementById('input-mattress-width').value = Input_Mattress_Width;
        document.getElementById('input-mattress-length').value = Input_Mattress_Length;

        console.log('Значения ширины и длины были изменены местами.');
    }

    calculate();
});

document.getElementById('input-textile-cost').addEventListener('input', () => {
    Input_Textile_Cost = parseInt(document.getElementById('input-textile-cost').value) || 0;
    calculate();
});

document.getElementById('input-mattress-length').addEventListener('blur', () => {
    Input_Mattress_Length = parseInt(document.getElementById('input-mattress-length').value) || 0;

    if (Input_Mattress_Length < Input_Mattress_Width && Input_Mattress_Length !== 0 && Input_Mattress_Width !== 0) {
        // Меняем значения местами
        const temp = Input_Mattress_Width;
        Input_Mattress_Width = Input_Mattress_Length;
        Input_Mattress_Length = temp;

        // Обновляем значения в полях ввода
        document.getElementById('input-mattress-width').value = Input_Mattress_Width;
        document.getElementById('input-mattress-length').value = Input_Mattress_Length;

        console.log('Значения длины и ширины были изменены местами.');
    }

    console.log('Length:', Input_Mattress_Length);
    calculate();
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
    console.log('Amount:', Input_Mattress_Amount);
    calculate();
});

document.getElementById('input-textile-width').addEventListener('input', function() {
    Input_Textile_Width = parseInt(this.value) || 0;

    document.getElementById('input-textile-width-output').textContent = Input_Textile_Width;
    calculate();
});

document.getElementById('input-cant').addEventListener('change', function() {
    if (this.checked) {
        Input_Cant_Value = 1; 
        ScaleUp = 50;
    } else {
        Input_Cant_Value = 0; 
        ScaleUp=20;
    }
    calculate();

});

//Динамический парсинг выбора материала первого слоя
document.getElementById('material-first-layer').addEventListener('input', () => {
    Material_First_Layer = parseInt(document.getElementById('material-first-layer').value) || 0;
    console.log('Density:', Material_First_Layer);

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
    console.log('Density:', Material_Second_Layer);
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
    console.log('Calculating with:', Input_Mattress_Width, Input_Mattress_Length, Input_Mattress_Bold, Input_Mattress_Amount);

    // Считаем объем матраса
    let Mattress_Volume = Math.round(((Input_Mattress_Width / 1000) * (Input_Mattress_Length / 1000) * (Input_Mattress_Bold / 1000) * Input_Mattress_Amount) * 1000) / 1000;
    let details = countDetails();
    let BF_Out = bestFit(Input_Textile_Width, details);

    // Рассчитываем стоимость слоев
    
    let Full_Cost_First_Layer = (Input_Mattress_Length/1000)*(Input_Mattress_Width/1000)*(Bold_First_Layer/1000)*(Material_First_Layer)*Cost_First_Layer;
    console.log(Cost_First_Layer, Full_Cost_First_Layer);
    let Full_Cost_Second_Layer = (Input_Mattress_Length/1000)*(Input_Mattress_Width/1000)*(Bold_Second_Layer/1000)*(Material_Second_Layer)*Cost_Second_Layer;
    console.log(Cost_Second_Layer, Full_Cost_Second_Layer)
    let Full_Cost_Third_Layer = (Input_Mattress_Length/1000)*(Input_Mattress_Width/1000)*(Bold_Third_Layer/1000)*(Material_Third_Layer)*Cost_Third_Layer;
    console.log(Cost_Third_Layer, Full_Cost_Third_Layer);
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
    console.log(Full_Cost_Foam);
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

//Раскладка деталей на рулоне
function bestFit(width, parts) {
    // Сортируем детали по высоте (в порядке убывания)
    parts.sort((a, b) => b[1] - a[1]);
    
    let currentHeight = 0; // Текущая высота рулона
    const rows = [];        // Массив для хранения рядов с деталями
    const details = [];     // Массив для хранения всех деталей с координатами

    for (const [partWidth, partHeight] of parts) {
        let placed = false;
        
        // Попытка разместить деталь в существующих рядах
        for (const row of rows) {
            if (row.width + partWidth <= width) {
                // Добавляем деталь в ряд
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








