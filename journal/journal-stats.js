// =======================================
// JOURNAL STATISTICS ENGINE v1.0
// =======================================

export function calculateStats(entries) {
    if (!entries.length) {
        return {
            totalTrades: 0,
            winrate: 0,
            avgRR: 0,
            avgPnL: 0,
            totalPnL: 0,
            longCount: 0,
            shortCount: 0,
            biggestWin: 0,
            biggestLoss: 0,
            avgLeverage: 0,
            equityCurve: []
        };
    }

    let wins = 0;
    let losses = 0;
    let totalPnL = 0;
    let rrSum = 0;
    let pnlSum = 0;
    let biggestWin = -999999;
    let biggestLoss = 999999;
    let longCount = 0;
    let shortCount = 0;
    let leverageSum = 0;

    const equityCurve = [];
    let runningEquity = 0;

    entries.forEach(e => {
        const entry = parseFloat(e.entry);
        const exit = parseFloat(e.exit);
        const size = parseFloat(e.size);
        const leverage = parseFloat(e.leverage);

        // PnL
        let pnl = 0;
        if (e.direction.toLowerCase() === "long") {
            pnl = (exit - entry) * size * leverage;
            longCount++;
        } else {
            pnl = (entry - exit) * size * leverage;
            shortCount++;
        }

        totalPnL += pnl;
        pnlSum += pnl;

        // Win / Loss
        if (pnl >= 0) wins++;
        else losses++;

        // Biggest win/loss
        if (pnl > biggestWin) biggestWin = pnl;
        if (pnl < biggestLoss) biggestLoss = pnl;

        // R/R (ако имаме entry/exit)
        const rr = Math.abs((exit - entry) / entry);
        rrSum += rr;

        // Leverage
        leverageSum += leverage;

        // Equity curve
        runningEquity += pnl;
        equityCurve.push(runningEquity);
    });

    return {
        totalTrades: entries.length,
        winrate: (wins / entries.length) * 100,
        avgRR: rrSum / entries.length,
        avgPnL: pnlSum / entries.length,
        totalPnL,
        longCount,
        shortCount,
        biggestWin,
        biggestLoss,
        avgLeverage: leverageSum / entries.length,
        equityCurve
    };
}
