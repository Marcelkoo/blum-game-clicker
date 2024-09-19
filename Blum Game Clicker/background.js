chrome.webNavigation.onCompleted.addListener(function(details) {
    if (details.url.includes("telegram.blum.codes") || details.url.includes("web.telegram.org")) {
        chrome.tabs.executeScript(details.tabId, {
            file: "content.js",
            allFrames: true
        });
    }
}, {
    url: [
        { urlMatches: 'https://telegram.blum.codes/*' },
        { urlMatches: 'https://web.telegram.org/*' }
    ]
});
