// =========================
// CHART MODULE
// Управлява TradingView графиката
// =========================

export let tvWidget = null;

// Инициализация на графиката
export function initChart() {
    tvWidget = new TradingView.widget({
        autosize: true,
        symbol: "BINANCE:ETHUSDT",
        interval: "15",
        timezone: "Etc/UTC",
        theme: "dark",
        style: "1",
        locale: "bg",
        container_id: "tradingview_chart",
        studies_overrides: {},
        overrides: {
            "paneProperties.background": "#0d0d0d",
            "paneProperties.vertGridProperties.color": "#222",
            "paneProperties.horzGridProperties.color": "#222",
            "scalesProperties.textColor": "#AAA"
        }
    });
}

// Автоматично стартиране при зареждане
document.addEventListener("DOMContentLoaded", () => {
    initChart();
});

