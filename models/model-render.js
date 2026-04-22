// =========================
// MODEL RENDER MODULE
// Визуализира резултатите от моделите
// =========================

export function renderModelOutput(result) {
    const box = document.getElementById("models-output");
    if (!box) return;

    box.innerHTML = `
        <h3>Model Engine</h3>

        <div class="model-section">
            <h4>Trend Model</h4>
            <p>Trend: <strong>${result.trendModel.trend}</strong></p>
            <p>Confidence: ${result.trendModel.confidence}%</p>
        </div>

        <div class="model-section">
            <h4>Volatility Model</h4>
            <p>Volatility: <strong>${result.volatilityModel.volatility}</strong></p>
            <p>Confidence: ${result.volatilityModel.confidence}%</p>
        </div>

        <div class="model-section">
            <h4>Liquidity Path Model</h4>
            <p>Direction: <strong>${result.liquidityPathModel.direction}</strong></p>
            <p>Confidence: ${result.liquidityPathModel.confidence}%</p>
        </div>

        <div class="model-section">
            <h4>Regime Model</h4>
            <p>Regime: <strong>${result.regimeModel.regime}</strong></p>
            <p>Confidence: ${result.regimeModel.confidence}%</p>
        </div>

        <div class="model-section">
            <h4>Combined Score</h4>
            <p><strong>${result.combinedScore.toFixed(1)}</strong> / 100</p>
        </div>
    `;
}

// Автоматично зареждане (placeholder)
document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById("models-output");
    if (!box) return;

    box.innerHTML = "Моделите са готови за работа.";
});

