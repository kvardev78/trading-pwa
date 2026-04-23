// =========================
// ALERTS ENGINE
// Управлява аларми, условия и push логика
// =========================

// Списък с активни аларми
let alerts = [];

// Добавяне на аларма
export function addAlert(condition) {
    alerts.push(condition);
    console.log("Добавена аларма:", condition);
}

// Премахване на аларма
export function removeAlert(index) {
    alerts.splice(index, 1);
}

// Проверка на условията
export function checkAlerts(context = {}) {
    const { price, flowData = {} } = context;

    alerts.forEach((alert, index) => {
        let triggered = false;

        // --- Примерни условия (placeholder) ---

        // Аларма за цена
        if (alert.type === "price-above" && price >= alert.value) {
            triggered = true;
        }

        if (alert.type === "price-below" && price <= alert.value) {
            triggered = true;
        }

        // Аларма за funding
        if (alert.type === "funding-above" && flowData.funding >= alert.value) {
            triggered = true;
        }

        if (alert.type === "funding-below" && flowData.funding <= alert.value) {
            triggered = true;
        }

        // Аларма за OI
        if (alert.type === "oi-drop" && flowData.oi < alert.value) {
            triggered = true;
        }

        if (triggered) {
            console.log("Аларма активирана:", alert);

            // Placeholder за push нотификация
            try {
                new Notification("Trading Alert", {
                    body: `Условие изпълнено: ${alert.type} → ${alert.value}`
                });
            } catch (e) {
                console.warn("Push нотификациите не са разрешени.");
            }

            removeAlert(index);
        }
    });
}

// Автоматична проверка на всеки 5 секунди
setInterval(() => {
    checkAlerts({});
}, 5000);

