let enabled = true;
let delay = 500;
let intervalId = null;

function startBot() {
    if (intervalId) return;
    console.log("FPS Auto-Join Started (Persistent Mode)...");
    
    intervalId = setInterval(() => {
        if (!enabled) return;

        // 1. Check if we are ALREADY in the queue (Look for "Cancel Search")
        // If "Cancel Search" exists, we do nothing and wait for the next cycle
        const isSearching = [...document.querySelectorAll("button, div, span")]
            .some(el => el.innerText.includes("Cancel Search"));

        if (isSearching) {
            // We are in queue, so we just wait. 
            // We don't stop the interval, so it checks again in 500ms.
            return; 
        }

        // 2. If not in queue, look for the matchmaking button
        // We target the main area and ignore the top navigation bar
        const mainContent = document.querySelector('main') || document.querySelector('.content') || document.body;
        const buttons = mainContent.querySelectorAll("button, .btn, div[role='button'], span");
        
        let playButton = null;

        for (let btn of buttons) {
            const text = btn.innerText ? btn.innerText.trim().toUpperCase() : "";
            
            if (text === "+ PLAY" || text === "PLAY") {
                // Ignore the top navigation links
                if (btn.closest('nav') || btn.closest('header')) continue;
                
                // Get the actual clickable element if it's a nested span
                playButton = btn.closest('button') || btn;
                break;
            }
        }
        
        if (playButton) {
            console.log("Match ended or queue missed. Clicking + Play...");
            playButton.click();
            // Trigger extra events to ensure the site registers the click
            playButton.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
            playButton.dispatchEvent(new MouseEvent('mouseup', { bubbles: true }));
        }
    }, delay);
}

function stopBot() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

// Initial configuration fetch
chrome.storage.local.get(["enabled", "delay"], res => {
    enabled = res.enabled ?? true;
    delay = res.delay ?? 500;
    if (enabled) startBot();
});

// Listener for manual ON/OFF toggle from your popup
chrome.storage.onChanged.addListener((changes) => {
    if (changes.enabled) {
        enabled = changes.enabled.newValue;
        enabled ? startBot() : stopBot();
    }
    if (changes.delay) {
        delay = changes.delay.newValue;
        stopBot();
        if (enabled) startBot();
    }
});