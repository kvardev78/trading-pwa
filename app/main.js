// ---------------------------
// Restore last active tab
// ---------------------------
const lastTab = localStorage.getItem("activeTab");
if (lastTab) {
    document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
    const saved = document.getElementById(lastTab);
    if (saved) saved.classList.add("active");
}
// Activate correct nav button on load
if (lastTab) {
    document.querySelectorAll(".nav-btn").forEach(btn => {
        btn.classList.toggle('active', btn.dataset.target === lastTab);
    });
}

// ---------------------------
// TradingView Chart
// ---------------------------
function initTradingView() {
    const tv = new TradingView.widget({
        "theme": "dark",
        "style": "1",
        "locale": "bg",
        "container_id": "chart-container",
        "autosize": true
    });
}

// ---------------------------
// Switch Tabs
// ---------------------------
function switchTab(targetId) {
    const tabs = document.querySelectorAll('.tab');
    const buttons = document.querySelectorAll('.nav-btn');

    // Save active tab
    localStorage.setItem("activeTab", targetId);

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

// ---------------------------
// Navigation Buttons
// ---------------------------
window.addEventListener('load', () => {
    const buttons = document.querySelectorAll('.nav-btn');

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.target;
            switchTab(target);
        });
    });

    // If no saved tab → default to chart
    if (!lastTab) {
        switchTab('tab-chart');
    }
});

// ---------------------------
// FLOW DATA (Bybit Public API)
// ---------------------------
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
