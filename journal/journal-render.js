// ===============================
// JOURNAL RENDER ENGINE
// ===============================

import { deleteJournalEntry } from "./journal.js";

export function renderJournal(entries) {
    const container = document.getElementById("journal-list");
    container.innerHTML = "";

    if (!entries.length) {
        container.innerHTML = "<p>Няма записани сделки.</p>";
        return;
    }

    entries.forEach((e, index) => {
        const card = document.createElement("div");
        card.className = "journal-entry";

        card.innerHTML = `
            <div class="jr-row">
                <div><strong>${e.pair}</strong></div>
                <div class="journal-tag ${e.direction.toLowerCase()}">${e.direction}</div>
            </div>

            <div class="jr-tags">
                <span class="journal-tag lev">${e.leverage}x</span>
                <span class="journal-tag size">${e.size} ETH</span>
            </div>

            <div class="jr-info">
                Entry: ${e.entry}<br>
                Exit: ${e.exit}<br>
                Дата: ${e.date}
            </div>

            <button class="primary" data-del="${index}">Изтрий</button>
        `;

        container.appendChild(card);
    });

    // Delete buttons
    document.querySelectorAll("[data-del]").forEach(btn => {
        btn.addEventListener("click", () => {
            deleteJournalEntry(btn.dataset.del);
            renderJournal(JSON.parse(localStorage.getItem("journal") || "[]"));
        });
    });
}

