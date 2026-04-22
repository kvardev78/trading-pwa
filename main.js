import { saveJournalEntry, loadJournalEntries, deleteJournalEntry } from "./journal/journal.js";
import { renderJournal } from "./journal/journal-render.js";
import { renderStats } from "./journal/journal-stats-render.js";
import { calculateStats } from "./journal/journal-stats.js";
import { renderEquityCurve } from "./journal/equity-curve.js";

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

    document.getElementById("ai-loader").style.display = "block";
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

/* ============================
   JOURNAL ENGINE INIT
============================ */

import { saveJournalEntry, loadJournalEntries } from "./journal.js";
import { renderJournal } from "./journal-render.js";

// Записване на сделка
document.getElementById("jr-save").addEventListener("click", () => {
    const entry = {
        date: document.getElementById("jr-date").value,
        pair: document.getElementById("jr-pair").value,
        direction: document.getElementById("jr-direction").value,
        size: document.getElementById("jr-size").value,
        leverage: document.getElementById("jr-leverage").value,
        entry: document.getElementById("jr-entry").value,
        exit: document.getElementById("jr-exit").value
    };

    // Запис
    saveJournalEntry(entry);

    // Презареждане на списъка
    renderJournal(loadJournalEntries());

    // Изчистване на формата
    document.getElementById("jr-date").value = "";
    document.getElementById("jr-size").value = "";
    document.getElementById("jr-leverage").value = "";
    document.getElementById("jr-entry").value = "";
    document.getElementById("jr-exit").value = "";
});

// Зареждане при стартиране
renderJournal(loadJournalEntries());

function refreshJournal() {
    const entries = loadJournalEntries();

    renderJournal(entries);
    renderStats(entries);

    const stats = calculateStats(entries);
    renderEquityCurve(stats.equityCurve);
}

refreshJournal();
