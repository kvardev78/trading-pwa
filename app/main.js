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
async function loadFlowData() {
  try {
    const res = await fetch("https://api.bybit.com/v5/market/tickers?category=linear&symbol=ETHUSDT");
    const json = await res.json();

    if (json.retCode !== 0 || !json.result || !json.result.list || !json.result.list.length) {
      console.log("No data from Bybit", json);
      return;
    }

    const t = json.result.list[0];

    const volume24h = t.turnover24h;
    const price = t.lastPrice;
    const priceChange = t.price24hPcnt;
    const fundingRate = t.fundingRate;
    const openInterest = t.openInterest;

    document.getElementById("flow-volume").innerText =
      `Цена: ${price}\n24h Обем: ${Number(volume24h).toLocaleString()} $`;

    document.getElementById("flow-oi").innerText =
      `Open Interest: ${Number(openInterest).toLocaleString()}`;

    document.getElementById("flow-funding").innerText =
      `Funding: ${(Number(fundingRate) * 100).toFixed(4)} %\n24h Δ: ${(Number(priceChange) * 100).toFixed(2)} %`;

    let bias = "Неутрален";
    if (priceChange > 0 && fundingRate > 0) bias = "Long bias / агресивни купувачи";
    if (priceChange < 0 && fundingRate < 0) bias = "Short bias / агресивни продавачи";

    document.getElementById("flow-summary").innerText =
      `Bias: ${bias}`;
  } catch (err) {
    console.log("Flow error:", err);
  }
}

window.addEventListener("load", () => {
  loadFlowData();
});
