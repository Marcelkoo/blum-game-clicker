function injectScriptWithSettings(file, settings, node) {
    const th = document.getElementsByTagName(node)[0];
    const s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    
    s.innerHTML = `window.GAME_SETTINGS = ${JSON.stringify(settings)};`;
    th.appendChild(s);

    const script = document.createElement('script');
    script.setAttribute('src', chrome.runtime.getURL(file));
    th.appendChild(script);
}

chrome.storage.sync.get(['flowerProbability', 'bombProbability', 'iceProbability', 'trumpProbability', 'harrisProbability', 'isScriptEnabled'], function(settings) {
    const loadedSettings = {
        bombProbability: (settings.bombProbability || 1) / 100,
        flowerProbability: (settings.flowerProbability || 72) / 100,
        iceProbability: (settings.iceProbability || 80) / 100,
        trumpProbability: (settings.trumpProbability || 99) / 100,
        harrisProbability: (settings.harrisProbability || 99) / 100,
        isScriptEnabled: settings.isScriptEnabled !== false
    };

    console.log('Настройки загружены перед запуском:', loadedSettings);

    injectScriptWithSettings('game.js', loadedSettings, 'body');
});

chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    const updatedSettings = {
        bombProbability: message.bombProbability / 100,
        flowerProbability: message.flowerProbability / 100,
        iceProbability: message.iceProbability / 100,
        trumpProbability: message.trumpProbability / 100,
        harrisProbability: message.harrisProbability / 100,
        isScriptEnabled: message.isScriptEnabled
    };

    console.log('Настройки обновлены:', updatedSettings);

    if (typeof window.updateGameSettings === 'function') {
        window.updateGameSettings(updatedSettings);
    }

    sendResponse({ status: 'OK' });
});
