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
Ти си професионален трейдър. Направи анализ на ETH според следната структура:

1) Ликвидни зони (стопове, TP натрупвания)
2) Обеми и buy/sell pressure
3) Ликвидации и капиталови потоци
4) Позициониране на големите играчи
5) Market depth и liquidity path projection
6) Volume imbalance
7) Multi‑TF alignment
8) Smart money bias
9) Risk compression zones
10) Directional confidence score (0–100%)
11) 7‑степенна вероятностна таблица
12) Master Checklist
13) Финален вердикт: LONG / SHORT / WAIT

Потребителски вход:
${userText}
`;
}
