/* ---------------------------
   NAVIGATION BETWEEN TABS
---------------------------- */

const navButtons = document.querySelectorAll(".nav-btn");
const tabSections = document.querySelectorAll(".tab-section");

navButtons.forEach(btn => {
    btn.addEventListener("click", () => {
        const tab = btn.getAttribute("data-tab");

        // Update active button
        navButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        // Show correct tab
        tabSections.forEach(section => {
            section.classList.remove("active");
            if (section.id === "tab-" + tab) {
                section.classList.add("active");
            }
        });
    });
});


/* ---------------------------
   TRADINGVIEW CHART
---------------------------- */

function loadTradingViewChart() {
    new TradingView.widget({
        "width": "100%",
        "height": 500,
        "symbol": "BINANCE:ETHUSDT",
        "interval": "15",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "style": "1",
        "locale": "bg",
        "toolbar_bg": "#0d1117",
        "enable_publishing": false,
        "hide_top_toolbar": false,
        "hide_legend": false,
        "container_id": "chart-container"
    });
}

loadTradingViewChart();


/* ---------------------------
   LANDSCAPE MODE FOR CHART
---------------------------- */

function adjustForOrientation() {
    const chartContainer = document.getElementById("chart-container");

    if (window.matchMedia("(orientation: landscape)").matches) {
        chartContainer.style.height = "100vh";
    } else {
        chartContainer.style.height = "500px";
    }
}

window.addEventListener("orientationchange", adjustForOrientation);
window.addEventListener("resize", adjustForOrientation);


/* ---------------------------
   FLOW DATA (PLACEHOLDERS)
---------------------------- */

function updateFlowData() {
    document.getElementById("flow-pressure").innerText = "Buy/Sell: зареждане...";
    document.getElementById("flow-delta").innerText = "Delta: зареждане...";
    document.getElementById("flow-cvd").innerText = "CVD: зареждане...";
    document.getElementById("flow-liquidations").innerText = "Ликвидации: зареждане...";
}

updateFlowData();


/* ---------------------------
   DELTA DATA (PLACEHOLDERS)
---------------------------- */

function updateDeltaData() {
    document.getElementById("delta-total").innerText = "Обща делта: зареждане...";
    document.getElementById("delta-imbalance").innerText = "Imbalance: зареждане...";
}

updateDeltaData();


/* ---------------------------
   AI ANALYSIS (HYBRID MODEL)
---------------------------- */

document.getElementById("ai-refresh").addEventListener("click", () => {
    document.getElementById("ai-output").innerText = "Генериране на AI анализ...";

    // Тук ще вкараме връзката към хибридния AI слой
    setTimeout(() => {
        document.getElementById("ai-output").innerText =
            "AI анализът е готов. (Тук ще се появява твоят истински анализ.)";
    }, 1500);
});


/* ---------------------------
   JOURNAL SYSTEM
---------------------------- */

document.getElementById("journal-save").addEventListener("click", () => {
    const text = document.getElementById("journal-input").value.trim();
    if (text === "") return;

    const entry = document.createElement("div");
    entry.classList.add("entry");
    entry.innerText = text;

    document.getElementById("journal-entries").prepend(entry);
    document.getElementById("journal-input").value = "";
});
