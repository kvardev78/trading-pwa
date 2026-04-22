// =========================
// AI ANALYSIS ENGINE
// Изпълнява пълния търговски протокол
// =========================

// Основна функция за анализ
export async function generateAIAnalysis(context = {}) {
    const {
        price = "неизвестна",
        chartData = "няма графични данни",
        flowData = {},
        journalStats = {}
    } = context;

    // Съставяне на промпта според протокола
    const prompt = `
Активирай се като Старши количествен анализатор, експерт по ликвидност, микро-структура и управление на риска.
Използвай пълния професионален модел за ETH анализ.

--- 1) Пазарна информация ---
Цена: ${price}
Графични данни: ${chartData}

--- 2) Потокови данни ---
CVD: ${flowData.cvd || "—"}
Delta: ${flowData.delta || "—"}
Liquidity: ${flowData.liquidity || "—"}
Funding: ${flowData.funding || "—"}
OI: ${flowData.oi || "—"}
Liquidations: ${flowData.liquidations || "—"}

--- 3) Статистики от журнала ---
Winrate: ${journalStats.winrate || "—"}%
Средна печалба: ${journalStats.avgWin || "—"}
Средна загуба: ${journalStats.avgLoss || "—"}
Среден R:R: ${journalStats.avgRR || "—"}

Следвай протокола:

1) Пазарна информация  
2) Макро контекст  
3) Ликвидност  
4) Микро-структура  
5) Multi-TF Alignment  
6) Smart Money Bias  
7) Сценарии (bull/bear/neutral)  
8) 7-степенна вероятностна таблица  
9) Directional Confidence Score  
10) Точни входове и изходи  
11) Master Checklist  
12) Тактическо заключение  
13) Финално човешко обяснение

Генерирай пълен, структуриран анализ.
`;

    // Изпращане към backend API
    const response = await fetch("/api/analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    return data.analysis || "Грешка при AI анализа.";
}

