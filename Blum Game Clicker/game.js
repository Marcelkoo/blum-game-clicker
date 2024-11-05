window.SETTINGS = window.GAME_SETTINGS || {
    bombProbability: 0.01,  
    flowerProbability: 0.72,  
    iceProbability: 0.80,
    trumpProbability: 0.99,
    harrisProbability: 0.99,
    gameEnded: false,
    isScriptEnabled: true
};

console.log("Текущие настройки при запуске игры:", window.SETTINGS);

if (window.SETTINGS.isScriptEnabled) {
    try {
        const originalArrayPush = Array.prototype.push;
        Array.prototype.push = function (...items) {
            items.forEach(item => processGameItem(item));
            return originalArrayPush.apply(this, items);
        };

        function processGameItem(item) {
            if (!item || !item.asset) return;

            const { assetType } = item.asset;
            switch (assetType) {
                case "CLOVER":
                    handleFlower(item);
                    break;
                case "BOMB":
                    handleBomb(item);
                    break;
                case "FREEZE":
                    handleFreeze(item);
                    break;
                case "TRUMP":
                    handleTrump(item);
                    break;
                case "HARRIS":
                    handleHarris(item);
                    break;
            }
        }

        function handleFlower(item) {
            if (Math.random() < window.SETTINGS.flowerProbability) {
                triggerClick(item);
            }
        }

        function handleBomb(item) {
            if (Math.random() < window.SETTINGS.bombProbability) {
                triggerClick(item);
            }
        }

        function handleFreeze(item) {
            if (Math.random() < window.SETTINGS.iceProbability) {
                triggerClick(item);
            }
        }

        function handleTrump(item) {
            if (Math.random() < window.SETTINGS.trumpProbability) {
                triggerClick(item);
            }
        }

        function handleHarris(item) {
            if (Math.random() < window.SETTINGS.harrisProbability) {
                triggerClick(item);
            }
        }

        function triggerClick(item) {
            setTimeout(() => {
                if (typeof item.onClick === 'function') {
                    item.onClick(item);
                } else {
                    console.log("item.onClick не определен.");
                }
                item.isExplosion = true;
                item.addedAt = performance.now();
            }, calculateDelay());
        }

        function calculateDelay() {
            const min = 500;
            const max = 1000;
            return Math.random() * (max - min) + min;
        }

        function detectGameEnd() {
            const rewardElement = document.querySelector('#app > div > div > div.content > div.reward');
            if (rewardElement && !window.SETTINGS.gameEnded) {
                window.SETTINGS.gameEnded = true;
                resetGameData();
            }
        }

        function resetGameData() {
            window.SETTINGS.gameEnded = false;
        }

        function autoStartGame() {
            const buttons = document.querySelectorAll('button.kit-button.is-large.is-primary, a.play-btn[href="/game"], button.kit-button.is-large.is-primary');
            buttons.forEach(btn => {
                if (/Play/.test(btn.textContent) || /Continue/.test(btn.textContent) || /Играть/.test(btn.textContent)) {
                    setTimeout(() => {
                        btn.click();
                        window.SETTINGS.gameEnded = false;
                    }, calculateDelay());
                }
            });
        }

        function monitorPlayButton() {
            autoStartGame();
            setTimeout(monitorPlayButton, 2500);
        }

        const mutationObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    detectGameEnd();
                }
            });
        });

        const appRoot = document.querySelector('#app');
        if (appRoot) {
            mutationObserver.observe(appRoot, { childList: true, subtree: true });
        }

        monitorPlayButton();

        window.updateGameSettings = function(newSettings) {
            window.SETTINGS = newSettings;
            console.log("Настройки обновлены:", window.SETTINGS);
        };

    } catch (error) {
        console.error("Ошибка в Blum AutoPlayer:", error);
    }
} else {
    console.log("Скрипт отключен через настройки.");
}
