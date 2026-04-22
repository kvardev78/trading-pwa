// =========================
// FLOW MODULE
// Управлява CVD, Delta, OI, Funding, Liquidity, Heatmap
// =========================

// Placeholder функция за бъдещи API заявки
async function fetchFlowData() {
    return {
        cvd: "—",
        delta: "—",
        volumeFlow: "—",
        liquidity: "—",
        funding: "—",
        oi: "—",
        liquidations: "—",
        heatmap: "—"
    };
}

// Обновяване на UI
export async function updateFlowPanel() {
    const data = await fetchFlowData();

    document.getElementById("cvd-value").textContent = data.cvd;
    document.getElementById("delta-value").textContent = data.delta;
    document.getElementById("volume-flow-value").textContent = data.volumeFlow;
    document.getElementById("liquidity-value").textContent = data.liquidity;
    document.getElementById("funding-value").textContent = data.funding;
    document.getElementById("oi-value").textContent = data.oi;
    document.getElementById("liq-value").textContent = data.liquidations;
    document.getElementById("heatmap-value").textContent = data.heatmap;
}

// Автоматично обновяване на всеки 10 секунди
setInterval(updateFlowPanel, 10000);

// Първоначално зареждане
document.addEventListener("DOMContent
