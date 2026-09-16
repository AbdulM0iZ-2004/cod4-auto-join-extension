function updateBadge(enabled) {
    if (enabled) {
        chrome.action.setBadgeText({ text: "ON" });
        chrome.action.setBadgeBackgroundColor({ color: "#22c55e" }); // Green
    } else {
        chrome.action.setBadgeText({ text: "OFF" });
        chrome.action.setBadgeBackgroundColor({ color: "#ef4444" }); // Red
    }
}

// Set initial state on load
chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get(["enabled"], (res) => {
        updateBadge(res.enabled ?? true);
    });
});

// Watch for changes to update the badge globally
chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) {
        updateBadge(changes.enabled.newValue);
    }
});