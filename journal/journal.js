// =========================
// JOURNAL MODULE
// Управлява запис, зареждане и auto-fill
// =========================

// Зареждане на журнала
export function loadJournal() {
    const saved = JSON.parse(localStorage.getItem("journal") || "[]");
    const list = document.getElementById("journal-list");

    list.innerHTML = "";

    saved.forEach(entryHTML => {
        const box = document.createElement("div");
        box.className = "journal-entry";
        box.innerHTML = entryHTML;
        list.prepend(box);
    });
}

// Auto-fill на последната сделка
export function loadLastTrade() {
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

// Запис на сделка
export function saveTrade() {
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

    loadJournal();
    loadLastTrade();
}

// Автоматично стартиране
document.addEventListener("DOMContentLoaded", () => {
    loadJournal();
    loadLastTrade();

    const saveBtn = document.getElementById("jr-save");
    if (saveBtn) saveBtn.addEventListener("click", saveTrade);
});

