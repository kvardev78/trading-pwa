import { calculateStats } from "./journal-stats.js";

export function renderStats(entries) {
    const stats = calculateStats(entries);
    const container = document.getElementById("journal-stats");

    container.innerHTML = `
        <div class="journal-entry">
            <div><strong>Общо сделки:</strong> ${stats.totalTrades}</div>
            <div><strong>Winrate:</strong> ${stats.winrate.toFixed(1)}%</div>
            <div><strong>Среден R/R:</strong> ${stats.avgRR.toFixed(3)}</div>
            <div><strong>Среден PnL:</strong> ${stats.avgPnL.toFixed(2)}</div>
            <div><strong>Общ PnL:</strong> ${stats.totalPnL.toFixed(2)}</div>
            <div><strong>Long:</strong> ${stats.longCount}</div>
            <div><strong>Short:</strong> ${stats.shortCount}</div>
            <div><strong>Най-голяма печалба:</strong> ${stats.biggestWin.toFixed(2)}</div>
            <div><strong>Най-голяма загуба:</strong> ${stats.biggestLoss.toFixed(2)}</div>
            <div><strong>Среден ливъридж:</strong> ${stats.avgLeverage.toFixed(1)}x</div>
        </div>
    `;
}
