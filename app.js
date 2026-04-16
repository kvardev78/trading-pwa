// Основна логика на Trading PWA

const statusBox = document.getElementById("status");
const refreshBtn = document.getElementById("refresh");

// Функция за симулиране на обновяване на данни
function updateStatus() {
    statusBox.textContent = "Обновяване...";
    
    setTimeout(() => {
        const now = new Date().toLocaleTimeString();
        statusBox.textContent = "Данните са обновени в " + now;
    }, 800);
}

// Обновяване при натискане на бутона
refreshBtn.addEventListener("click", updateStatus);

// Автоматично обновяване при зареждане
updateStatus();
