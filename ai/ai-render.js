export function renderAIAnalysis(text) {
    const output = document.getElementById("ai-output");

    if (!text) {
        output.innerHTML = "<p>Няма анализ.</p>";
        return;
    }

    // Разделяме по нови редове
    const lines = text.split("\n");

    let html = "";

    for (let line of lines) {
        line = line.trim();

        if (line === "") continue;

        // Ако започва с число + )
        if (/^\d+\)/.test(line)) {
            html += `<h3 style="margin-top:18px; font-weight:700;">${line}</h3>`;
        }
        // Ако започва с тире или •
        else if (/^[-•]/.test(line)) {
            html += `<div style="margin-left:12px; margin-bottom:4px;">${line}</div>`;
        }
    // Финален вердикт
else if (line.toLowerCase().includes("long")) {
    html += `<p style="margin-bottom:6px; font-weight:700; color:#4caf50;">${line}</p>`;
}
else if (line.toLowerCase().includes("short")) {
    html += `<p style="margin-bottom:6px; font-weight:700; color:#ff5252;">${line}</p>`;
}
else if (line.toLowerCase().includes("wait") || line.toLowerCase().includes("hold")) {
    html += `<p style="margin-bottom:6px; font-weight:700; color:#ffca28;">${line}</p>`;
}
// Нормален текст
else {
    html += `<p style="margin-bottom:6px;">${line}</p>`;
}
    }

    output.innerHTML = html;
}
