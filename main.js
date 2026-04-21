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

new TradingView.widget({
  autosize: true,
  symbol: "BINANCE:ETHUSDT",
  interval: "15",
  timezone: "Etc/UTC",
  theme: "dark",
  style: "1",
  locale: "bg",
  container_id: "tradingview_chart"
});

// FLOW PLACEHOLDERS
document.getElementById("cvd-value").textContent = "Очаква данни...";
document.getElementById("delta-value").textContent = "Очаква данни...";
document.getElementById("volume-flow-value").textContent = "Очаква данни...";
document.getElementById("liquidity-value").textContent = "Очаква данни...";

// AI ANALYSIS BUTTON
document.getElementById("generate-ai").addEventListener("click", () => {
  document.getElementById("ai-analysis").textContent = "Генерирам анализ...";

  setTimeout(() => {
    document.getElementById("ai-analysis").textContent =
      "ETH е в консолидация. Очаква се пробив при силен обем. Следи ликвидните зони и реакцията около тях.";
  }, 1200);
});
