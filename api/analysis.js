export default async function handler(req, res) {
  try {
    const body = await req.json();
    const prompt = body.prompt || "ETH анализ";

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: "Ти си професионален крипто анализатор. Дай кратък и точен анализ." },
                { text: prompt }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Няма резултат.";

    res.status(200).json({ analysis: text });

  } catch (err) {
    res.status(500).json({ error: "AI backend error" });
  }
}
