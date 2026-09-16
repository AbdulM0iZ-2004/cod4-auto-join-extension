# COD4 Auto-Join Queue Extension

A Chrome (Manifest V3) extension that automates queue-joining for COD4 5v5 SD matches on [FPSChallenge.eu](https://fpschallenge.eu/solo-queue/).

It watches the solo-queue page, and when it detects you're idle (not already searching for a match), it automatically clicks **+ PLAY** for you — so you don't have to babysit the tab between games.

## Features

- 🟢🔴 **ON/OFF toggle** via the extension popup, with a live badge indicator on the toolbar icon
- ⏱️ **Configurable poll delay** (default 500ms)
- 🔍 **Resilient DOM detection** — looks for text content ("Cancel Search", "+ PLAY") rather than brittle CSS selectors, so it tolerates the site changing class names
- 💾 Settings persisted via `chrome.storage.local`

## Installation (unpacked / dev mode)

1. Clone this repo:
```bash
   git clone https://github.com/AbdulM0iZ-2004/cod4-auto-join-extension.git
```
2. Open Chrome and go to `chrome://extensions`
3. Enable **Developer mode** (top right toggle)
4. Click **Load unpacked** and select the cloned folder
5. Pin the extension icon, open the popup, and toggle **Enable Bot** on
6. Navigate to `https://fpschallenge.eu/solo-queue/` — the badge will show green (ON) and the bot will auto-click **+ PLAY** whenever you're idle

## File structure

| File | Purpose |
|---|---|
| `manifest.json` | MV3 config — permissions, content script matching |
| `background.js` | Service worker — manages ON/OFF badge state |
| `content.js` | Injected into the solo-queue page — polls DOM and clicks Play |
| `popup.html` / `popup.js` | Popup UI for toggling the bot and setting poll delay |

## ⚠️ Disclaimer

This automates interaction with a third-party site. Automating matchmaking/queue actions may violate FPSChallenge's terms of service — use at your own discretion and risk. This project is for personal/educational use.
