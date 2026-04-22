document.getElementById("generate-ai").addEventListener("click", async () => {
    const output = document.getElementById("ai-output");

    // Показваме loading
    output.textContent = "Генерирам анализ…";

    try {
        const response = await fetch("/api/analyze", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                text: "Генерирай пълен ETH анализ по 13-те секции."
            })
        });

        const data = await response.json();

        if (!data || !data.result) {
            output.textContent = "Грешка: няма резултат от AI.";
            return;
        }

        // Взимаме текста от Gemini
        const aiText =
            data.result.candidates?.[0]?.content?.parts?.[0]?.text ||
            "Няма анализ.";

        // Показваме резултата
        output.textContent = aiText;

    } catch (err) {
        console.error(err);
        output.textContent = "Грешка при генериране на анализа.";
    }
});
