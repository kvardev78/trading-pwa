export function formatAIStructure(text) {
    const sections = text.split("###").slice(1);

    return sections.map(section => {
        const lines = section.trim().split("\n");
        const title = lines.shift().trim();
        const body = lines.join(" ").trim();

        return `
            <div class="ai-block">
                <div class="ai-block-title">${title}</div>
                <div class="ai-block-body">${body}</div>
            </div>
        `;
    }).join("");
}
