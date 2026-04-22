// =========================
// IMPORT MODULES
// =========================

import { initChart } from "./chart/chart.js";
import { loadIndicators } from "./chart/indicators.js";
import { updateFlowPanel } from "./chart/flow.js";

import { saveTrade, loadJournal, loadLastTrade } from "./journal/journal.js";
import { calculateJournalStats } from "./journal/journal-stats.js";

import { generateAIAnalysis } from "./ai/ai.js";
import { renderAIAnalysis } from "./ai/ai-render.js";

import { generateSignals, renderSignals } from "./signals/signals.js";
import { addAlert, checkAlerts } from "./signals/alerts.js";

import { runModels } from "./models/model.js";
import { renderModelOutput } from "./models/model-render.js";


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
// INITIALIZATION
// =========================

document.addEventListener("DOMContentLoaded", async () => {

    // TradingView
    initChart();
    loadIndicators();

    // Flow
    updateFlowPanel();

    // Journal
    loadJournal();
    loadLastTrade();

    // Signals
    const signal = generateSignals({});
    renderSignals(signal);

    // Models
    const modelResult = runModels({});
    renderModelOutput(modelResult);
});


// =========================
// AI ANALYSIS BUTTON
// =========================

document.getElementById("generate-ai").addEventListener("click", async () => {
    const output = document.getElementById("ai-output");
    output.textContent = "Генерирам анализ...";

    try {
        const analysis = await generateAIAnalysis({});
        renderAIAnalysis(analysis);
    } catch (err) {
        output.textContent = "Грешка при AI анализа.";
    }
});


// =========================
// JOURNAL SAVE BUTTON
// =========================

document.getElementById("jr-save").addEventListener("click", saveTrade);
