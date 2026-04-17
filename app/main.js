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
    const symbol = localStorage.getItem("symbol") || "ETHUSDT";

    new TradingView.widget({
        "symbol": `BINANCE:${symbol}`,
        "interval": "15",
        "timezone": "Etc/UTC",
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

    if (!lastTab) {
        switchTab('tab-chart');
    }

    const savedSymbol = localStorage.getItem("symbol") || "ETHUSDT";
    const select = document.getElementById("symbol-select");
    if (select) select.value = savedSymbol;
});

// ---------------------------
// REAL ORDERFLOW (Delta + CVD)
// ---------------------------
async function loadOrderflow(symbol) {
    try {
        const res = await fetch(`https://api.bybit.com/v5/market/recent-trade?category=linear&symbol=${symbol}&limit=1000`);
        const json = await res.json();

        if (!json.result || !json.result.list) return;

        let buyVol = 0;
        let sellVol = 0;

        json.result.list.forEach(t => {
            const qty = Number(t.qty);
            if (t.side === "Buy") buyVol += qty;
            else sellVol += qty;
        });

        const delta = buyVol - sellVol;

        const cvdKey = `cvd_${symbol}`;
        const prevCvd = Number(localStorage.getItem(cvdKey)) || 0;
        const newCvd = prevCvd + delta;
        localStorage.setItem(cvdKey, newCvd);

        document.getElementById("flow-delta").innerText = `Delta: ${delta.toFixed(2)}`;
        document.getElementById("flow-cvd").innerText = `CVD: ${newCvd.toFixed(2)}`;

        updateCvdChart(newCvd);

    } catch (err) {
        console.log("Orderflow error:", err);
    }
}

// ---------------------------
// LIQUIDATIONS (Bybit)
// ---------------------------
async function loadLiquidations(symbol) {
    try {
        const res = await fetch(`https://api.bybit.com/v5/market/liquidation?category=linear&symbol=${symbol}&limit=20`);
        const json = await res.json();

        if (!json.result || !json.result.list) return;

        const list = json.result.list.slice(0, 10);

        const box = document.getElementById("flow-liquidations");
        if (!box) return;

        box.innerHTML = "";

        list.forEach(liq => {
            const side = liq.side === "Buy" ? "LONG" : "SHORT";
            const color = liq.side === "Buy" ? "#00ff99" : "#ff4444";

            const price = Number(liq.price).toFixed(2);
            const qty = Number(liq.qty).toLocaleString();

            const row = document.createElement("div");
            row.style.marginBottom = "4px";
            row.style.color = color;
            row.style.fontSize = "14px";

            row.innerText = `${side} • ${qty} • @ ${price}`;
            box.appendChild(row);
        });

    } catch (err) {
        console.log("Liquidations error:", err);
    }
}

// ---------------------------
// MINI CVD CHART
// ---------------------------
let cvdHistory = [];

function updateCvdChart(value) {
    const canvas = document.getElementById("cvd-chart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    cvdHistory.push(value);
    if (cvdHistory.length > 100) cvdHistory.shift();

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.beginPath();
    ctx.strokeStyle = "#00ff99";
    ctx.lineWidth = 2;

    cvdHistory.forEach((v, i) => {
        const x = (i / 100) * canvas.width;
        const y = canvas.height - ((v - Math.min(...cvdHistory)) /
            (Math.max(...cvdHistory) - Math.min(...cvdHistory) || 1)) * canvas.height;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });

    ctx.stroke();
}

// ---------------------------
// FLOW DATA (Bybit Public API)
// ---------------------------
async function loadFlowData() {
  try {
    const symbol = localStorage.getItem("symbol") || "ETHUSDT";

    const res = await fetch(`https://api.bybit.com/v5/market/tickers?category=linear&symbol=${symbol}`);
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

    document.getElementById("flow-summary").innerText = `Bias: ${bias}`;

    const buyPressure = Math.max(0, priceChange * 100);
    const sellPressure = Math.max(0, -priceChange * 100);
    const total = buyPressure + sellPressure || 1;

    document.querySelector(".buy-bar").style.width = `${(buyPressure / total) * 100}%`;
    document.querySelector(".sell-bar").style.width = `${(sellPressure / total) * 100}%`;

    // REAL ORDERFLOW
    loadOrderflow(symbol);

    // LIQUIDATIONS
    loadLiquidations(symbol);

  } catch (err) {
    console.log("Flow error:", err);
  }
}

window.addEventListener("load", () => {
  loadFlowData();
});

// ---------------------------
// Symbol Dropdown Listener
// ---------------------------
const symbolSelect = document.getElementById("symbol-select");
if (symbolSelect) {
    symbolSelect.addEventListener("change", (e) => {
        const newSymbol = e.target.value;
        localStorage.setItem("symbol", newSymbol);
        loadFlowData();
        initTradingView();
    });
}
