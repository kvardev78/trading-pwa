// Навигация между табовете
const buttons = document.querySelectorAll(".bottom-nav button");
const tabs = document.querySelectorAll(".tab");
const headerTitle = document.getElementById("header-title");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    const tab = btn.dataset.tab;

    tabs.forEach(t => t.classList.remove("active"));
    document.getElementById(`tab-${tab}`).classList.add("active");

    headerTitle.textContent = btn.textContent;
  });
});

// TradingView widget
new TradingView.widget({
  "autosize": true,
  "symbol": "BINANCE:ETHUSDT",
  "interval": "15",
  "timezone": "Etc/UTC",
  "theme": "dark",
  "style": "1",
  "locale": "bg",
  "container_id": "tradingview-widget"
});
