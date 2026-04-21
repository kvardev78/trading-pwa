export default async function handler(req, res) {
    try {
        const body = await req.json();
        const prompt = body.prompt || "ETH анализ";

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.GEMINI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "Ти си професионален крипто анализатор." },
                    { role: "user", content: prompt }
                ]
            })
        });

        const data = await response.json();
        const text = data.choices?.[0]?.message?.content || "Няма резултат.";

        res.status(200).json({ analysis: text });

    } catch (err) {
        res.status(500).json({ error: "AI backend error" });
    }
}
