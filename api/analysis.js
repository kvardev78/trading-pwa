export default async function handler(req, res) {
  try {
    let body = {};
    try {
      body = JSON.parse(req.body || "{}");
    } catch {}

    const prompt = body.prompt || "ETH анализ";

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                { text: "Ти си професионален крипто анализатор." },
                { text: prompt }
              ]
            }
          ]
        })
      }
    );

    const data = await response.json();
    console.log("GEMINI RESPONSE:", data);

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Няма резултат.";

    res.status(200).json({ analysis: text });

  } catch (err) {
    res.status(500).json({ error: "AI backend error", details: err.message });
  }
}
