window.addEventListener('load', () => {
    const statusText = document.getElementById('status');
    const refreshButton = document.getElementById('refreshButton');

    function updateStatus() {
        statusText.textContent = 'Обновяване...';
        setTimeout(() => {
            statusText.textContent = 'Обновено';
        }, 800);
    }

    refreshButton.addEventListener('click', updateStatus);
    updateStatus();

    new TradingView.widget({
        "width": "100%",
        "height": 500,
        "symbol": "BINANCE:ETHUSDT",
        "interval": "15",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "bg",
        "container_id": "chart-container"
    });
});
