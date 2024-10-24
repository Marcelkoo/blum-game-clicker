document.addEventListener('DOMContentLoaded', function() {
    const flowerInput = document.getElementById('flower-probability');
    const bombInput = document.getElementById('bomb-probability');
    const iceInput = document.getElementById('ice-probability');
    const dogsInput = document.getElementById('dogs-probability');
    const applyButton = document.getElementById('apply-button');
    const enableScriptCheckbox = document.getElementById('enable-script');
  
    chrome.storage.sync.get(['flowerProbability', 'bombProbability', 'iceProbability', 'dogsProbability', 'isScriptEnabled'], function(settings) {
      flowerInput.value = settings.flowerProbability || 72;
      bombInput.value = settings.bombProbability || 1;
      iceInput.value = settings.iceProbability || 80;
      dogsInput.value = settings.dogsProbability || 99;
      enableScriptCheckbox.checked = settings.isScriptEnabled !== false;
    });
  
    applyButton.addEventListener('click', function() {
      const flowerProbability = parseFloat(flowerInput.value);
      const bombProbability = parseFloat(bombInput.value);
      const iceProbability = parseFloat(iceInput.value);
      const dogsProbability = parseFloat(dogsInput.value);
      const isScriptEnabled = enableScriptCheckbox.checked;
  
      chrome.storage.sync.set({
        flowerProbability: flowerProbability,
        bombProbability: bombProbability,
        iceProbability: iceProbability,
        dogsProbability: dogsProbability,
        isScriptEnabled: isScriptEnabled
      }, function() {
        chrome.runtime.sendMessage({
          flowerProbability: flowerProbability,
          bombProbability: bombProbability,
          iceProbability: iceProbability,
          dogsProbability: dogsProbability,
          isScriptEnabled: isScriptEnabled
        });
  
        alert('Settings applied!');
      });
    });
});
