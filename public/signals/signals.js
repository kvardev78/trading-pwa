// =========================
// SIGNALS ENGINE
// Генерира входове, стопове, TP и вероятности
// =========================

// Placeholder логика за бъдещи сигнали
export function generateSignals(context = {}) {
    const {
        price = null,
        flowData = {},
        indicators = {},
        aiBias = null
    } = context;

    // Базов сигнален обект
    const signal = {
        direction: "WAIT",
        confidence: 0,
        entry: null,
        stop: null,
        tp1: null,
        tp2: null,
        tp3: null,
        reason: []
    };

    // --- Примерни условия (placeholder) ---

    // Ако AI bias е силен
    if (aiBias === "LONG") {
        signal.direction = "LONG";
        signal.confidence += 30;
        signal.reason.push("AI bias → LONG");
    }

    if (aiBias === "SHORT") {
        signal.direction = "SHORT";
        signal.confidence += 30;
        signal.reason.push("AI bias → SHORT");
    }

    // Ако funding е силно негативен → често е LONG setup
    if (flowData.funding && flowData.funding < 0) {
        signal.confidence += 10;
        signal.reason.push("Negative funding → LONG pressure");
    }

    // Ако OI пада → често е контра-тренд
    if (flowData.oi && flowData.oi < 0) {
        signal.confidence += 10;
        signal.reason.push("OI decreasing → weak trend");
    }

    // Placeholder вход/стоп/TP
    if (price) {
        signal.entry = price;
        signal.stop = price * 0.99;
        signal.tp1 = price * 1.01;
        signal.tp2 = price * 1.015;
        signal.tp3 = price * 1.02;
    }

    return signal;
}

// Рендериране в UI
export function renderSignals(signal) {
    const box = document.getElementById("signals-output");
    if (!box) return;

    box.innerHTML = `
        <h3>Сигнал: ${signal.direction}</h3>
        <p>Confidence: ${signal.confidence}%</p>
        <p>Entry: ${signal.entry}</p>
        <p>Stop: ${signal.stop}</p>
        <p>TP1: ${signal.tp1}</p>
        <p>TP2: ${signal.tp2}</p>
        <p>TP3: ${signal.tp3}</p>
        <h4>Причини:</h4>
        <ul>
            ${signal.reason.map(r => `<li>${r}</li>`).join("")}
        </ul>
    `;
}

// Автоматично зареждане (placeholder)
document.addEventListener("DOMContentLoaded", () => {
    const signal = generateSignals({});
    renderSignals(signal);
});

