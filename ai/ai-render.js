import { formatAIStructure } from "./ai-structure.js";

export function renderAIAnalysis(text) {
    const output = document.getElementById("ai-output");

    if (!text) {
        output.innerHTML = "<p>Няма анализ.</p>";
        return;
    }

    // Новият професионален рендер — 13 секции, структурирани
    output.innerHTML = formatAIStructure(text);

    // Автоматично скролване към резултата
    output.scrollIntoView({ behavior: "smooth" });
}
