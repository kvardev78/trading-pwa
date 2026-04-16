// Основна логика на Trading PWA

const statusBox = document.getElementById('status');
const refreshBtn = document.getElementById('refresh');

function updateStatus() {
    statusBox.textContent = 'Обновяване...';
    setTimeout(() => {
        statusBox.textContent = 'Обновено';
    }, 800);
}

// Обновяване при натискане
refreshBtn.addEventListener('click', updateStatus);

// Първоначално обновяване
updateStatus();
