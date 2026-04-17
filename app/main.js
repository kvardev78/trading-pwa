// ---------------------------
// NAVIGATION
// ---------------------------
const tabs = document.querySelectorAll(".tab");
const navButtons = document.querySelectorAll(".nav-btn");

navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-target");

        tabs.forEach(tab => tab.classList.remove("active"));
        navButtons.forEach(b => b.classList.remove("active"));

        document.getElementById(target).classList.add("active");
        btn.classList.add("active");

        localStorage.setItem("activeTab", target);
    });
});

const savedTab = localStorage.getItem("activeTab");
if (savedTab) {
    document.getElementById(savedTab).classList.add("active");
    document.querySelector(`[data-target="${savedTab}"]`).classList.add("active");
}

// ---------------------------
// TRADINGVIEW CHART
// ---------------------------
new TradingView.widget({
    "autosize": true,
    "symbol": "BINANCE:ETHUSDT",
    "interval": "15",
    "timezone": "Etc/UTC",
    "theme": "dark",
    "style": "1",
    "locale": "bg",
    "toolbar_bg": "#000000",
    "enable_publishing": false,
    "hide_top_toolbar": false,
    "hide_legend": false,
    "save_image": false,
    "container_id": "chart-container"
});

// ---------------------------
// FLOW API FETCH
// ---------------------------
async function fetchFlow() {
    try {
        const res = await fetch("https://api.coinalyze.net/v1/eth/flow");
        const data = await res.json();

        document.getElementById("flow-volume").innerText = data.volume || "—";
        document.getElementById("flow-oi").innerText = data.oi || "—";
        document.getElementById("flow-funding").innerText = data.funding || "—";
        document.getElementById("flow-summary").innerText = data.summary || "—";
        document.getElementById("flow-delta").innerText = data.delta || "—";
        document.getElementById("flow-cvd").innerText = data.cvd || "—";
        document.getElementById("flow-liquidations").innerText = data.liquidations || "—";
        document.getElementById("flow-heatmap").innerText = data.heatmap || "—";

        drawMiniCVD(data.cvdHistory || []);
    } catch (e) {
        console.log("Flow API error:", e);
    }
}

setInterval(fetchFlow, 5000);
fetchFlow();

// ---------------------------
// MINI CVD CHART
// ---------------------------
function drawMiniCVD(values) {
    const canvas = document.getElementById("cvd-chart");
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!values.length) return;

    ctx.beginPath();
    ctx.strokeStyle = "#00ff99";
    ctx.lineWidth = 2;

    const step = canvas.width / (values.length - 1);

    values.forEach((v, i) => {
        const x = i * step;
        const y = canvas.height - (v * canvas.height);
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });

    ctx.stroke();
}
