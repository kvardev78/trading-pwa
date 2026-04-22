document.getElementById("generate-ai").addEventListener("click", async () => {
    const output = document.getElementById("ai-output");

    // Показваме loading
    output.textContent = "Генерирам анализ…";
    document.getElementById("ai-loader").style.display = "block";

    try {
        const response = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
           body: JSON.stringify({
    text: `
Генерирай професионален ETH анализ, разделен на 13 ясно маркирани секции (### Заглавие).

1) Liquidity Zones — маркирай стопове, TP клъстери, ликвидни джобове.
2) Volume Imbalance — отклонения, агресия, доминация.
3) Buy/Sell Pressure — кой контролира пазара.
4) Liquidations — къде са натрупани ликвидации.
5) Capital Flow — входящ/изходящ капитал.
6) Market Depth — дебелина на книгата, дисбаланси.
7) Smart Money Bias — посока на големите играчи.
8) Multi‑TF Alignment — M1, M5, M15, H1, H4, D1.
9) Market Regime — trending, ranging, compression.
10) Risk Compression Zones — зони на натиск.
11) Liquidity Path Projection — най‑вероятен маршрут.
12) Directional Confidence Score — процент вероятност.
13) Финално заключение — LONG / SHORT / WAIT.

Форматирай всяка секция като:

### [Име на секцията]
[2–4 изречения професионален анализ]

Не използвай списъци, само параграфи.
`
})
        });

        const data = await response.json();

        // СКРИВАМЕ loader-а след успешен отговор
        document.getElementById("ai-loader").style.display = "none";

        if (!data || !data.result) {
            output.textContent = "Грешка: няма резултат от AI.";
            return;
        }

        // Взимаме текста от Gemini
        const aiText =
            data.result.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Няма анализ.";

        // Показваме резултата
        renderAIAnalysis(aiText);

    } catch (err) {
        console.error(err);

        // СКРИВАМЕ loader-а и при грешка
        document.getElementById("ai-loader").style.display = "none";

        output.textContent = "Грешка при генериране на анализа.";
    }
});

import { renderAIAnalysis } from "./ai-render.js";
