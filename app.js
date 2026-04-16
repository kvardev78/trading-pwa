const statusText = document.querySelector('#refresh p');
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
