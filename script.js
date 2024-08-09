let layerCount = 1;

document.getElementById('input-length').addEventListener('input', updateAllLayerWeights);
document.getElementById('input-width').addEventListener('input', updateAllLayerWeights);

function updateLayerWeight(layerId) {
    const layerThickness = parseInt(document.getElementById(`layer-thickness-${layerId}`).value);
    const mattressLength = parseInt(document.getElementById('input-length').value);
    const mattressWidth = parseInt(document.getElementById('input-width').value);
    const material = document.getElementById(`layer-material-${layerId}`).value;
    const inputAmount = parseInt(document.getElementById('input-amount').value);
    const inputCost = parseInt(document.getElementById('input-amount').value);

    if (!isNaN(layerThickness) && !isNaN(mattressLength) && !isNaN(mattressWidth)) {
        const weight = calculateCost(layerThickness, mattressLength, mattressWidth, material, inputAmount);
        document.getElementById(`layer-weight-${layerId}`).value = weight.toFixed(2);
    } else {
        document.getElementById(`layer-weight-${layerId}`).value = '';
    }
}

function updateAllLayerWeights() {
    for (let i = 1; i <= layerCount; i++) {
        updateLayerWeight(i);
    }
}

function calculateCost(layerThickness, mattressLength, mattressWidth, material,inputAmount) {
    // Извлекаем первые две цифры из названия материала
    const density = parseInt(material.substring(2, 4), 10);

    // Рассчитываем вес
    const weight = (layerThickness / 1000) * (mattressLength / 1000) * (mattressWidth / 1000) * inputAmount * density;
    
    return weight;
}

function addLayer() {
    layerCount++;
    const layerContainer = document.getElementById('layer-container');
    const layerGroup = document.createElement('div');
    layerGroup.className = 'layer-button';
    layerGroup.id = `layer-group-${layerCount}`;

    layerGroup.innerHTML = `
        <div class="form-group-2">
            <div class="field-group">
                <label for="layer-material-${layerCount}">Материал слоя ${layerCount}:</label>
                <select id="layer-material-${layerCount}" class="form-control">
                    <option value="HR3030">HR3030</option>
                    <option value="VE3508">VE3508</option>
                    <option value="HR3020">HR3020</option>
                    <option value="LR2545">LR2545</option>
                    <option value="LR4065">LR4065</option>
                </select>
            </div>
            <div class="field-group">
                <label for="layer-thickness-${layerCount}">Толщина слоя ${layerCount}:</label>
                <select id="layer-thickness-${layerCount}" class="form-control">
                    <option value="50">50</option>
                    <option value="100">100</option>
                    <option value="150">150</option>
                    <option value="200">200</option>
                </select>
            </div>
            <div class="field-group">
                <label for="layer-weight-${layerCount}">Цена за кг${layerCount} (кг):</label>
                <input type="number" id="input-cost-${layerCount}" class="form-control">
            </div>
            
        </div>
        <button class="delete-btn" onclick="removeLayer(${layerCount})">×</button>
    `;
    
    layerContainer.appendChild(layerGroup);

    document.getElementById(`layer-thickness-${layerCount}`).addEventListener('change', () => updateLayerWeight(layerCount));
    document.getElementById(`layer-material-${layerCount}`).addEventListener('change', () => updateLayerWeight(layerCount));
}

function removeLayer(layerId) {
    const layerGroup = document.getElementById(`layer-group-${layerId}`);
    layerGroup.remove();
    updateAllLayerWeights();
}

document.getElementById('layer-thickness-1').addEventListener('change', () => updateLayerWeight(1));
document.getElementById('layer-material-1').addEventListener('change', () => updateLayerWeight(1));

function addMattress() {
    const inputCant = document.getElementById('input-cant').checked ? 'y' : 'n';
    const inputWidth = parseInt(document.getElementById('input-width').value);
    const inputLength = parseInt(document.getElementById('input-length').value);
    const inputBold = parseInt(document.getElementById('input-bold').value);
    const inputAmount = parseInt(document.getElementById('input-amount').value);
    const inputTextile = parseInt(document.getElementById('input-textile').value);

    if (inputLength < inputWidth) {
        alert("Длина не может быть меньше ширины.");
        return;
    }

    const totalLayerThickness = Array.from(document.querySelectorAll('.field-group select[id^="layer-thickness-"]'))
        .reduce((sum, select) => sum + parseInt(select.value), 0);

    if (totalLayerThickness > inputBold) {
        alert("Суммарная толщина слоев не может быть больше толщины матраса.");
        return;
    }

    const layers = [];
    for (let i = 1; i <= layerCount; i++) {
        const layerThickness = parseInt(document.getElementById(`layer-thickness-${i}`).value);
        const layerMaterial = document.getElementById(`layer-material-${i}`).value;
        const layerWeight = parseFloat(document.getElementById(`layer-weight-${i}`).value);
        layers.push({ layerThickness, layerMaterial, layerWeight });
    }

    const mattress = {
        inputCant,
        inputWidth,
        inputLength,
        inputBold,
        inputAmount,
        inputTextile,
        layers
    };

    addMattressToList(mattress);
}

function addMattressToList(mattress) {
    const mattressList = document.getElementById('mattress-list');
    const mattressItem = document.createElement('p');
    mattressItem.innerHTML = `
        Матрас: Ширина - ${mattress.inputWidth}, Длина - ${mattress.inputLength}, Толщина - ${mattress.inputBold}, Количество - ${mattress.inputAmount}
        <button class="delete-btn" onclick="removeMattress(this)">×</button>
    `;
    mattressList.appendChild(mattressItem);
}

function removeMattress(button) {
    button.parentElement.remove();
}

function calculate() {
    details = [];
    mattressList.forEach(mattress => {
        details.push(...mattress.details);
    });

    const inputTextile = mattressList.length > 0 ? mattressList[0].inputTextile : 0;
    const totalHeight = bestFit(inputTextile, details);
    document.getElementById('total-height').textContent = `Необходимая длина рулона: ${totalHeight.totalHeight}`;
    
    const detailsFormatted = details.map(d => `${d[0]}*${d[1]}`).join(', ');
    document.getElementById('details-list').textContent = `Детали: ${detailsFormatted}`;
    
    document.getElementById('total-details').textContent = `Общее количество деталей: ${details.length}`;

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

// Пример вызова функции при изменении значений
updateAllLayerWeights();
