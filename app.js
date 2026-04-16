const statusText = document.getElementById('status');
const refreshButton = document.getElementById('refreshButton');

function updateStatus() {
    statusText.textContent = 'Обновяване...';
    setTimeout(() => {
        statusText.textContent = 'Обновено';
    }, 800);
}

refreshButton.addEventListener('click', updateStatus);

// първоначално състояние
updateStatus();
