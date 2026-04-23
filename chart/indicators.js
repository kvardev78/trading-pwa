// =========================
// INDICATORS MODULE
// Управлява EMA, RSI, VWAP, Volume, Supertrend
// =========================

import { tvWidget } from "./chart.js";

// Проверка дали графиката е заредена
function waitForChart(callback) {
    if (tvWidget && tvWidget.chart) {
        callback();
    } else {
        setTimeout(() => waitForChart(callback), 300);
    }
}

// Добавяне на индикатори
export function loadIndicators() {
    waitForChart(() => {
        const chart = tvWidget.chart();

        // EMA 20
        chart.createStudy("Moving Average", false, false, [20], null, {
            "Plot.color": "#4caf50"
        });

        // EMA 50
        chart.createStudy("Moving Average", false, false, [50], null, {
            "Plot.color": "#ff9800"
        });

        // EMA 200
        chart.createStudy("Moving Average", false, false, [200], null, {
            "Plot.color": "#e91e63"
        });

        // RSI
        chart.createStudy("Relative Strength Index", false, true);

        // VWAP
        chart.createStudy("VWAP", false, false);

        // Volume
        chart.createStudy("Volume", false, true);

        // Supertrend (ако TradingView го поддържа)
        try {
            chart.createStudy("Supertrend", false, false);
        } catch (e) {
            console.warn("Supertrend не е наличен в този widget.");
        }

        console.log("Индикаторите са заредени.");
    });
}

// Автоматично зареждане
document.addEventListener("DOMContentLoaded", () => {
    loadIndicators();
});

