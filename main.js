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

  // JOURNAL SAVE
document.getElementById("jr-save").addEventListener("click", () => {
  const date = document.getElementById("jr-date").value;
  const time = document.getElementById("jr-time").value;
  const dir = document.getElementById("jr-direction").value;
  const entry = document.getElementById("jr-entry").value;
  const exit = document.getElementById("jr-exit").value;
  const size = document.getElementById("jr-size").value;
  const lev = document.getElementById("jr-lev").value;
  const notes = document.getElementById("jr-notes").value;

  const box = document.createElement("div");
  box.className = "journal-entry";

  box.innerHTML = `
    <strong>${date} ${time}</strong><br>
    Посока: ${dir || "-"}<br>
    Вход: ${entry || "-"} | Изход: ${exit || "-"}<br>
    Размер: ${size || "-"} ETH | Ливъридж: ${lev || "-"}<br>
    Бележки: ${notes || "-"}
  `;

  document.getElementById("journal-list").prepend(box);
});


  setTimeout(() => {
    document.getElementById("ai-analysis").textContent =
      "ETH е в консолидация. Очаква се пробив при силен обем. Следи ликвидните зони и реакцията около тях.";
  }, 1200);
});
