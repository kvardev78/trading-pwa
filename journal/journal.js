// =======================================
// JOURNAL ENGINE v2.0 (обектен формат)
// =======================================

// Зареждане на всички записи
export function loadJournalEntries() {
    return JSON.parse(localStorage.getItem("journal") || "[]");
}

// Записване на нов запис
export function saveJournalEntry(entry) {
    const saved = loadJournalEntries();
    saved.push(entry);
    localStorage.setItem("journal", JSON.stringify(saved));
}

// Изтриване на запис
export function deleteJournalEntry(index) {
    const saved = loadJournalEntries();
    saved.splice(index, 1);
    localStorage.setItem("journal", JSON.stringify(saved));
}
