export default async function handler(req, res) {
    try {
        const { text } = req.body;

        if (!text) {
            return res.status(400).json({ error: "Missing text input." });
        }

        // Gemini API call
        const response = await fetch(
            "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: generatePrompt(text)
                                }
                            ]
                        }
                    ]
                })
            }
        );

        const data = await response.json();

        return res.status(200).json({ result: data });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Server error." });
    }
}

function generatePrompt(userText) {
    return `
Ти си институционален трейдинг анализатор. Изготви професионален ETH анализ по строго определена структура. 
Винаги връщай всички секции. Не пропускай нищо. Не добавяй нови секции.

Форматът трябва да бъде точно този:

1) Ликвидни зони  
- Опиши зоните със събрани стопове  
- TP натрупвания  
- Къде е най-близката ликвидност  

2) Обеми и Buy/Sell Pressure  
- Обеми по време  
- Доминантна страна  
- Промяна в натиска  

3) Ликвидации и Капиталови потоци  
- Къде са ликвидационните клъстери  
- Поток на капитала (inflow/outflow)  

4) Позициониране на големите играчи  
- Дълги/къси позиции  
- Агрегирани нива  
- Реакция на големите  

5) Market Depth и Liquidity Path Projection  
- Дълбочина на пазара  
- Къде е най-вероятният liquidity grab  

6) Volume Imbalance  
- Дисбаланси  
- Зони за ретест  

7) Multi‑TF Alignment  
- 1m / 5m / 15m / 1h / 4h  
- Къде има съвпадение на тренда  

8) Smart Money Bias  
- SMC структура  
- BOS / CHoCH  
- Premium/Discount зони  

9) Risk Compression Zones  
- Зони на компресия  
- Потенциал за експлозивен ход  

10) Directional Confidence Score (0–100%)  
- Колко е вероятно движението да продължи  

11) 7‑степенна вероятностна таблица  
- 1: Много ниска  
- 2: Ниска  
- 3: Умерена  
- 4: Средна  
- 5: Повишена  
- 6: Висока  
- 7: Много висока  

12) Master Checklist  
- Всички ключови точки в кратък списък  

13) Финален Вердикт  
- LONG / SHORT / WAIT  
- Кратко обяснение защо  

Потребителски вход:
${userText}
`;
}
