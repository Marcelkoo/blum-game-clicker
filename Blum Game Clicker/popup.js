document.addEventListener('DOMContentLoaded', function() {
    const flowerInput = document.getElementById('flower-probability');
    const bombInput = document.getElementById('bomb-probability');
    const iceInput = document.getElementById('ice-probability');
    const trumpInput = document.getElementById('trump-probability');
    const harrisInput = document.getElementById('harris-probability');
    const applyButton = document.getElementById('apply-button');
    const enableScriptCheckbox = document.getElementById('enable-script');
  
    chrome.storage.sync.get(['flowerProbability', 'bombProbability', 'iceProbability', 'trumpProbability', 'harrisProbability', 'isScriptEnabled'], function(settings) {
      flowerInput.value = settings.flowerProbability || 72;
      bombInput.value = settings.bombProbability || 1;
      iceInput.value = settings.iceProbability || 80;
      trumpInput.value = settings.trumpProbability || 99;
      harrisInput.value = settings.harrisProbability || 99;
      enableScriptCheckbox.checked = settings.isScriptEnabled !== false;
    });
  
    applyButton.addEventListener('click', function() {
      const flowerProbability = parseFloat(flowerInput.value);
      const bombProbability = parseFloat(bombInput.value);
      const iceProbability = parseFloat(iceInput.value);
      const trumpProbability = parseFloat(trumpInput.value);
      const harrisProbability = parseFloat(harrisInput.value);
      const isScriptEnabled = enableScriptCheckbox.checked;
  
      chrome.storage.sync.set({
        flowerProbability: flowerProbability,
        bombProbability: bombProbability,
        iceProbability: iceProbability,
        trumpProbability: trumpProbability,
        harrisProbability: harrisProbability,
        isScriptEnabled: isScriptEnabled
      }, function() {
        chrome.runtime.sendMessage({
          flowerProbability: flowerProbability,
          bombProbability: bombProbability,
          iceProbability: iceProbability,
          trumpProbability: trumpProbability,
          harrisProbability: harrisProbability,
          isScriptEnabled: isScriptEnabled
        });
  
        alert('Settings applied!');
      });
    });
});
