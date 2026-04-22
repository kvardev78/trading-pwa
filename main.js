// =========================
// NAVIGATION TABS
// =========================

const buttons = document.querySelectorAll("button[data-tab]");
const tabs = document.querySelectorAll(".tab");
const headerTitle = document.getElementById("header-title");

buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        const tab = btn.dataset.tab;

        tabs.forEach(t => t.classList.remove("active"));
        document.getElementById(`tab-${tab}`).classList.add("active");

        headerTitle.textContent = btn.textContent;

        localStorage.setItem("activeTab", tab);
    });
});

const savedTab = localStorage.getItem("activeTab");
if (savedTab) {
    tabs.forEach(t => t.classList.remove("active"));
    document.getElementById(`tab-${savedTab}`).classList.add("active");

    const activeBtn = document.querySelector(`button[data-tab="${savedTab}"]`);
    if (activeBtn) headerTitle.textContent = activeBtn.textContent;
}

// =========================
// TRADINGVIEW CHART
// =========================

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

// =========================
// FLOW PLACEHOLDERS
// =========================

document.getElementById("cvd-value").textContent = "Очаква данни...";
document.getElementById("delta-value").textContent = "Очаква данни...";
document.getElementById("volume-flow-value").textContent = "Очаква данни...";
document.getElementById("liquidity-value").textContent = "Очаква данни...";
document.getElementById("funding-value").textContent = "Очаква данни...";
document.getElementById("oi-value").textContent = "Очаква данни...";
document.getElementById("liq-value").textContent = "Очаква данни...";
document.getElementById("heatmap-value").textContent = "Очаква данни...";

// =========================
// JOURNAL LOAD
// =========================

function loadJournal() {
    const saved = JSON.parse(localStorage.getItem("journal") || "[]");
    const list = document.getElementById("journal-list");

    saved.forEach(entryHTML => {
        const box = document.createElement("div");
        box.className = "journal-entry";
        box.innerHTML = entryHTML;
        list.prepend(box);
    });
}

loadJournal();

// =========================
// JOURNAL AUTO-FILL
// =========================

function loadLastTrade() {
    const saved = JSON.parse(localStorage.getItem("journal") || "[]");
    if (saved.length === 0) return;

    const temp = document.createElement("div");
    temp.innerHTML = saved[0];

    const lastEntry = temp.querySelector(".journal-entry");
    if (!lastEntry) return;

    const dir = lastEntry.querySelector(".journal-tag").textContent.trim();
    const lev = lastEntry.querySelector(".lev").textContent.replace("x", "").trim();
    const size = lastEntry.querySelector(".size").textContent.replace("ETH", "").trim();

    const entryText = lastEntry.querySelector("div:nth-child(3)").textContent;
    const lastExit = entryText.split("Изход:")[1].trim();

    document.getElementById("jr-direction").value = dir === "Long" ? "Short" : "Long";
    document.getElementById("jr-lev").value = lev || "";
    document.getElementById("jr-size").value = size || "";
    document.getElementById("jr-entry").value = lastExit !== "-" ? lastExit : "";
}

loadLastTrade();

// =========================
// JOURNAL SAVE
// =========================

document.getElementById("jr-save").addEventListener("click", () => {
    const now = new Date();
    const date = document.getElementById("jr-date").value || now.toISOString().slice(0, 10);
    const time = document.getElementById("jr-time").value || now.toTimeString().slice(0, 5);
    const dir = document.getElementById("jr-direction").value;
    const entry = document.getElementById("jr-entry").value;
    const exit = document.getElementById("jr-exit").value || "-";
    const size = document.getElementById("jr-size").value;
    const lev = document.getElementById("jr-lev").value;
    const notes = document.getElementById("jr-notes").value;

    const html = `
        <div class="journal-entry">
            <div><strong>${date}</strong> ${time}</div>
            <div class="journal-tag ${dir.toLowerCase()}">${dir}</div>
            <div>Вход: ${entry} | Изход: ${exit}</div>
            <div><span class="size">${size}ETH</span> @ <span class="lev">${lev}x</span></div>
            <div class="notes">${notes}</div>
        </div>
    `;

    const saved = JSON.parse(localStorage.getItem("journal") || "[]");
    saved.unshift(html);
    localStorage.setItem("journal", JSON.stringify(saved));

    const list = document.getElementById("journal-list");
    const box = document.createElement("div");
    box.className = "journal-entry";
    box.innerHTML = html;
    list.prepend(box);

    loadLastTrade();
});

// =========================
// AI ANALYSIS BUTTON
// =========================

document.getElementById("generate-ai").addEventListener("click", async () => {
    document.getElementById("ai-output").textContent = "Генерирам анализ...";

    try {
        const response = await fetch("/api/analysis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ prompt: "ETH анализ" })
        });

        const data = await response.json();
        document.getElementById("ai-output").textContent =
            data.analysis || "Няма резултат.";
    } catch (err) {
        document.getElementById("ai-output").textContent =
            "Грешка при AI анализа.";
    }
});

// =========================
// SIGNALS PLACEHOLDER
// =========================

document.getElementById("signals-output").textContent =
    "Сигналният модул ще бъде активен след интеграцията на signals.js.";
