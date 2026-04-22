// =========================
// JOURNAL STATISTICS MODULE
// Изчислява winrate, R:R, средни стойности
// =========================

// Парсване на сделка от HTML
function parseTrade(entryHTML) {
    const temp = document.createElement("div");
    temp.innerHTML = entryHTML;

    const entry = temp.querySelector(".journal-entry");
    if (!entry) return null;

    const dir = entry.querySelector(".journal-tag").textContent.trim();
    const entryPrice = parseFloat(
        entry.querySelector("div:nth-child(3)").textContent.split("Вход:")[1].split("|")[0]
    );
    const exitPrice = entry.querySelector("div:nth-child(3)").textContent.includes("Изход:")
        ? parseFloat(entry.querySelector("div:nth-child(3)").textContent.split("Изход:")[1])
        : null;

    const size = parseFloat(entry.querySelector(".size").textContent.replace("ETH", ""));
    const lev = parseFloat(entry.querySelector(".lev").textContent.replace("x", ""));

    return {
        dir,
        entryPrice,
        exitPrice,
        size,
        lev
    };
}

// Изчисляване на статистики
export function calculateJournalStats() {
    const saved = JSON.parse(localStorage.getItem("journal") || "[]");
    if (saved.length === 0) return null;

    let wins = 0;
    let losses = 0;
    let totalRR = 0;
    let rrCount = 0;
    let totalProfit = 0;
    let totalLoss = 0;

    saved.forEach(entryHTML => {
        const trade = parseTrade(entryHTML);
        if (!trade || !trade.exitPrice) return;

        const { dir, entryPrice, exitPrice, size } = trade;

        let pnl = 0;

        if (dir === "Long") {
            pnl = (exitPrice - entryPrice) * size;
        } else {
            pnl = (entryPrice - exitPrice) * size;
        }

        if (pnl > 0) {
            wins++;
            totalProfit += pnl;
        } else {
            losses++;
            totalLoss += pnl;
        }

        // R:R (placeholder — ще го разширим)
        const rr = pnl !== 0 ? pnl / (size * 0.01 * entryPrice) : 0;
        totalRR += rr;
        rrCount++;
    });

    return {
        totalTrades: saved.length,
        wins,
        losses,
        winrate: wins + losses > 0 ? (wins / (wins + losses)) * 100 : 0,
        avgWin: wins > 0 ? totalProfit / wins : 0,
        avgLoss: losses > 0 ? totalLoss / losses : 0,
        avgRR: rrCount > 0 ? totalRR / rrCount : 0
    };
}

