const toggle = document.getElementById("toggle");
const delayInput = document.getElementById("delay");
const statusText = document.getElementById("status");

function load() {
    chrome.storage.local.get(["enabled", "delay"], res => {
        const enabled = res.enabled ?? true;
        toggle.checked = enabled;
        delayInput.value = res.delay ?? 500;
        updateStatus(enabled);
    });
}

function updateStatus(enabled) {
    if (enabled) {
        statusText.innerHTML = '<span class="pulse">🟢 ENABLED</span>';
    } else {
        statusText.innerHTML = '🔴 DISABLED';
    }
}

toggle.addEventListener("change", () => {
    const enabled = toggle.checked;
    chrome.storage.local.set({ enabled }, () => {
        updateStatus(enabled);
    });
});

delayInput.addEventListener("change", () => {
    chrome.storage.local.set({
        delay: parseInt(delayInput.value) || 500
    });
});

load();