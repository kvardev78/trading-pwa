// =========================
// AI RENDER MODULE
// Форматира и визуализира AI анализа
// =========================

// Основна функция за визуализация
export function renderAIAnalysis(text) {
    const output = document.getElementById("ai-output");
    if (!output) return;

    // Почистване
    output.innerHTML = "";

    // Разделяне по секции
    const lines = text.split("\n");

    lines.forEach(line => {
        line = line.trim();
        if (line.length === 0) return;

        // Заглавия
        if (line.startsWith("1)") || line.startsWith("2)") || line.startsWith("3)") ||
            line.startsWith("4)") || line.startsWith("5)") || line.startsWith("6)") ||
            line.startsWith("7)") || line.startsWith("8)") || line.startsWith("9)") ||
            line.startsWith("10)") || line.startsWith("11)") || line.startsWith("12)") ||
            line.startsWith("13)")) {

            const h = document.createElement("h3");
            h.textContent = line;
            h.style.marginTop = "20px";
            h.style.color = "#4caf50";
            output.appendChild(h);
            return;
        }

        // Подзаглавия
        if (line.endsWith(":")) {
            const h = document.createElement("h4");
            h.textContent = line;
            h.style.marginTop = "12px";
            h.style.color = "#66b0ff";
            output.appendChild(h);
            return;
        }

        // Нормален текст
        const p = document.createElement("p");
        p.textContent = line;
        p.style.margin = "6px 0";
        output.appendChild(p);
    });
}

// Свързване с бутона
document.addEventListener("DOMContentLoaded", () => {
    const btn = document.getElementById("generate-ai");
    if (!btn) return;

    btn.addEventListener("click", async () => {
        const output = document.getElementById("ai-output");
        output.textContent = "Генерирам анализ...";

        try {
            const response = await fetch("/api/analysis", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: "ETH анализ" })
            });

            const data = await response.json();
            renderAIAnalysis(data.analysis || "Няма резултат.");
        } catch (err) {
            output.textContent = "Грешка при AI анализа.";
        }
    });
});

