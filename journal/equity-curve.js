// =======================================
// EQUITY CURVE ENGINE v1.0
// =======================================

export function renderEquityCurve(equityData) {
    const canvas = document.getElementById("equity-curve");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!equityData || equityData.length === 0) {
        ctx.fillStyle = "#777";
        ctx.font = "14px Inter";
        ctx.fillText("Няма достатъчно данни за Equity Curve", 10, 40);
        return;
    }

    const w = canvas.width;
    const h = canvas.height;

    const max = Math.max(...equityData);
    const min = Math.min(...equityData);

    const range = max - min || 1;

    // Normalize points
    const points = equityData.map((v, i) => {
        const x = (i / (equityData.length - 1)) * w;
        const y = h - ((v - min) / range) * h;
        return { x, y };
    });

    // Line shadow
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = "rgba(76, 141, 255, 0.25)";
    ctx.lineWidth = 6;
    ctx.stroke();

    // Main line
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    points.forEach(p => ctx.lineTo(p.x, p.y));
    ctx.strokeStyle = "#4c8dff";
    ctx.lineWidth = 3;
    ctx.stroke();

    // Last point dot
    const last = points[points.length - 1];
    ctx.beginPath();
    ctx.arc(last.x, last.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#4c8dff";
    ctx.fill();
}
