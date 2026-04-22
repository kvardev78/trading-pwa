// =========================
// API: AI ANALYSIS ENDPOINT
// Получава промпт → връща анализ
// =========================

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Методът не е позволен." });
    }

    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: "Липсващ промпт." });
    }

    try {
        // Изпращане към OpenAI / LLM
        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "Ти си професионален трейдинг анализатор." },
                    { role: "user", content: prompt }
                ],
                temperature: 0.2
            })
        });

        const data = await response.json();

        return res.status(200).json({
            analysis: data.choices?.[0]?.message?.content || "Няма резултат."
        });

    } catch (err) {
        console.error("AI Error:", err);
        return res.status(500).json({ error: "Грешка при AI анализа." });
    }
}
