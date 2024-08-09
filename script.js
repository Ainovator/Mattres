let details = [];
let mattressList = [];

function bestFit(width, parts) {
    parts.sort((a, b) => b[1] - a[1]);
    let currentHeight = 0;
    const rows = [];

    for (const [partWidth, partHeight] of parts) {
        let placed = false;
        for (const row of rows) {
            if (row.width + partWidth <= width) {
                row.details.push([row.width, currentHeight, partWidth, partHeight]);
                row.width += partWidth;
                row.height = Math.max(row.height, partHeight);
                placed = true;
                break;
            }
        }
        if (!placed) {
            rows.push({ width: partWidth, height: partHeight, details: [[0, currentHeight, partWidth, partHeight]] });
            currentHeight += partHeight;
        }
    }

    const totalHeight = currentHeight;
    const detailPositions = [];
    for (const row of rows) {
        detailPositions.push(...row.details);
    }
    return { totalHeight, detailPositions };
}

function getInputParams() {
    const inputCant = document.getElementById('input-cant').checked ? 'y' : 'n';
    const inputWidth = parseInt(document.getElementById('input-width').value);
    const inputLength = parseInt(document.getElementById('input-length').value);
    const inputBold = parseInt(document.getElementById('input-bold').value);
    const inputAmount = parseInt(document.getElementById('input-amount').value);
    const inputTextile = parseInt(document.getElementById('input-textile').value);
    const inputTextileCost = parseInt(document.getElementById('input-textile-cost').value);
    return { inputCant, inputWidth, inputLength, inputBold, inputAmount, inputTextile, inputTextileCost};
}

function checkCant(inputCant) {
    if (inputCant === 'y' || inputCant === 'n') {
        return inputCant === 'y' ? 50 : 20;
    } else {
        alert("Введено неверное значение канта");
        return 0;
    }
}

function calculateTextileCost(inputTextileCost, totalHeight){
    const totalTextileCost = inputTextileCost * (totalHeight / 1000);
    return totalTextileCost;
}

function countDetails(inputWidth, inputLength, inputBold, inputAmount, scaleUp, inputTextile) {
    let details = [];
    if (inputWidth < inputTextile) {
        for (let i = 0; i < inputAmount * 2; i++) {
            details.push([inputWidth + scaleUp, inputLength + scaleUp]);
            details.push([inputWidth + scaleUp, inputBold + scaleUp]);
            details.push([inputBold + scaleUp, inputLength + scaleUp]);
        }
    } else {
        for (let i = 0; i < inputAmount * 2; i++) {
            details.push([(inputWidth / 2) + scaleUp, inputLength + scaleUp]);
            details.push([(inputWidth / 2) + scaleUp, inputLength + scaleUp]);
            details.push([inputWidth + scaleUp, inputBold + scaleUp]);
            details.push([inputBold + scaleUp, inputLength + scaleUp]);
        }
    }
    return details;
}

function addMattress() {
    const { inputCant, inputWidth, inputLength, inputBold, inputAmount, inputTextile, inputTextileCost } = getInputParams();
    const scaleUp = checkCant(inputCant);
    if (scaleUp === 0) {
        return;
    }
    const mattressDetails = countDetails(inputWidth, inputLength, inputBold, inputAmount, scaleUp, inputTextile);
    
    mattressList.push({
        inputCant,
        inputWidth,
        inputLength,
        inputBold,
        inputAmount,
        inputTextile,
        inputTextileCost,
        details: mattressDetails
    });

    updateMattressList();
    checkFormCompletion();
}

function updateMattressList() {
    const mattressListElement = document.getElementById('mattress-list');
    mattressListElement.innerHTML = '';
    mattressList.forEach((mattress, index) => {
        const mattressElement = document.createElement('p');
        mattressElement.textContent = `Матрас ${index + 1}: Ширина - ${mattress.inputWidth}, Длина - ${mattress.inputLength}, Толщина - ${mattress.inputBold}, Количество - ${mattress.inputAmount}, Кант - ${mattress.inputCant}, Ширина ткани - ${mattress.inputTextile}`;
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = '×';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => {
            mattressList.splice(index, 1);
            updateMattressList();
        };
        
        mattressElement.appendChild(deleteBtn);
        mattressListElement.appendChild(mattressElement);
    });
}

function calculate() {
    details = [];
    
    mattressList.forEach(mattress => {
        details.push(...mattress.details);
    });

    const inputTextile = mattressList.length > 0 ? mattressList[0].inputTextile : 0;
    const totalHeight = bestFit(inputTextile, details).totalHeight;

    // Взяли новую стоимость из поля ввода
    const inputTextileCost = parseInt(document.getElementById('input-textile-cost').value);

    const totalTextileCost = calculateTextileCost(inputTextileCost, totalHeight);
    document.getElementById('total-height').textContent = `Необходимая длина рулона: ${totalHeight}`;
    
    const detailsFormatted = details.map(d => `${d[0]}*${d[1]}`).join(', ');
    document.getElementById('details-list').textContent = `Детали: ${detailsFormatted}`;
    
    document.getElementById('total-details').textContent = `Общее количество деталей: ${details.length}`;

    document.getElementById('textile-cost').textContent = `Цена за рулон: ${totalTextileCost} руб.`;

    document.getElementById('visualize-button').disabled = false;
}

function visualize() {
    const inputTextile = mattressList.length > 0 ? mattressList[0].inputTextile : 0;
    const { detailPositions } = bestFit(inputTextile, details);

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = inputTextile;
    canvas.height = detailPositions.reduce((max, pos) => Math.max(max, pos[1] + pos[3]), 0);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const gridSize = 10;

    // Рисуем координатную сетку
    ctx.strokeStyle = '#ddd';
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

    // Рисуем детали
    ctx.strokeStyle = '#007bff';
    ctx.lineWidth = 2;
    detailPositions.forEach(([x, y, width, height]) => {
        ctx.strokeRect(x, y, width, height);
        ctx.fillText(`${width}x${height}`, x + 5, y + 15);
    });
}

function checkFormCompletion() {
    const { inputWidth, inputLength, inputBold, inputAmount } = getInputParams();
    const addButton = document.getElementById('add-button');
    
    if (inputWidth && inputLength && inputBold && inputAmount) {
        addButton.disabled = false;
    } else {
        addButton.disabled = true;
    }
}

document.getElementById('input-width').addEventListener('input', checkFormCompletion);
document.getElementById('input-length').addEventListener('input', checkFormCompletion);
document.getElementById('input-bold').addEventListener('input', (event) => {
    document.getElementById('input-bold-output').value = event.target.value;
    checkFormCompletion();
});
document.getElementById('input-amount').addEventListener('input', checkFormCompletion);
document.getElementById('input-textile').addEventListener('input', (event) => {
    document.getElementById('input-textile-output').value = event.target.value;
    checkFormCompletion();
});

// Важное изменение: добавляем обработчик на изменение цены ткани, но не пересчитываем автоматически
document.getElementById('input-textile-cost').addEventListener('input', () => {
    document.getElementById('textile-cost').textContent = ''; // Сбрасываем предыдущую стоимость
});
