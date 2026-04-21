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

// LOAD JOURNAL FROM LOCALSTORAGE
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

// FLOW PLACEHOLDERS
document.getElementById("cvd-value").textContent = "Очаква данни...";
document.getElementById("delta-value").textContent = "Очаква данни...";
document.getElementById("volume-flow-value").textContent = "Очаква данни...";
document.getElementById("liquidity-value").textContent = "Очаква данни...";

// AI ANALYSIS BUTTON
document.getElementById("generate-ai").addEventListener("click", () => {
  document.getElementById("ai-analysis").textContent = "Генерирам анализ...";
});

// JOURNAL SAVE
document.getElementById("jr-save").addEventListener("click", () => {
    const now = new Date();
    const date = document.getElementById("jr-date").value || now.toISOString().slice(0, 10);
    const time = document.getElementById("jr-time").value || now.toTimeString().slice(0, 5);
    const dir = document.getElementById("jr-direction").value;
    const entry = document.getElementById("jr-entry").value;
    const exit = document.getElementById("jr-exit").value;
    const size = document.getElementById("jr-size").value;
    const lev = document.getElementById("jr-lev").value;
    const notes = document.getElementById("jr-notes").value;

    // PnL calculation
    let pnl = null;
    if (entry && exit && size) {
        const e = parseFloat(entry);
        const x = parseFloat(exit);
        const s = parseFloat(size);

        if (dir === "Long") pnl = (x - e) * s;
        if (dir === "Short") pnl = (e - x) * s;
    }

    const box = document.createElement("div");
    box.className = "journal-entry";

    box.innerHTML = `
        <strong>${date} ${time}</strong>

        <div class="jr-tags">
            <div class="journal-tag ${dir === "Long" ? "long" : dir === "Short" ? "short" : ""}">
                ${dir || "-"}
            </div>
            <div class="journal-tag lev">${lev ? lev + "x" : "-"}</div>
            <div class="journal-tag size">${size ? size + " ETH" : "-"}</div>
        </div>

        <div>Вход: <b>${entry || "-"}</b> | Изход: <b>${exit || "-"}</b></div>

    <div style="
    margin-top:6px;
    font-weight:700;
    font-size:16px;
    color:${pnl > 0 ? '#00d26a' : pnl < 0 ? '#ff3b30' : '#9e9e9e'};
">
    PnL: ${pnl !== null ? pnl.toFixed(3) + " ETH" : "-"}
</div>

        <div style="margin-top:6px;">
            Бележки: ${notes || "-"}
        </div>
    `;

    document.getElementById("journal-list").prepend(box);
  
  // SAVE TO LOCALSTORAGE
const saved = JSON.parse(localStorage.getItem("journal") || "[]");
saved.unshift(box.innerHTML);
localStorage.setItem("journal", JSON.stringify(saved));
});
