let tvWidgetInitialized = false;

function initTradingView() {
    if (tvWidgetInitialized || typeof TradingView === 'undefined') return;

    tvWidgetInitialized = true;

    new TradingView.widget({
        "width": "100%",
        "height": window.innerHeight - 100,
        "symbol": "BINANCE:ETHUSDT",
        "interval": "15",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "bg",
        "container_id": "chart-container",
        "autosize": true
    });
}

function switchTab(targetId) {
    const tabs = document.querySelectorAll('.tab');
    const buttons = document.querySelectorAll('.nav-btn');

    tabs.forEach(tab => {
        tab.classList.toggle('active', tab.id === targetId);
    });

    buttons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.target === targetId);
    });

    if (targetId === 'tab-chart') {
        initTradingView();
    }
}

window.addEventListener('load', () => {
    const buttons = document.querySelectorAll('.nav-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            switchTab(target);
        });
    });

    switchTab('tab-chart');
});
