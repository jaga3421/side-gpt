import 'webextension-polyfill';
import { exampleThemeStorage } from '@extension/storage';

exampleThemeStorage.get().then(theme => {
  console.log('theme', theme);
});

chrome.action.onClicked.addListener(() => {
  console.log('onClicked');
  chrome.sidePanel
    .setOptions({ path: 'side-panel/index.html', enabled: true })
    .then(() => console.log('Side panel opened successfully'))
    .catch(error => console.error('Error opening side panel:', error));
});

// Add this to check if the side panel is supported
chrome.runtime.onInstalled.addListener(() => {
  if (chrome.sidePanel) {
    console.log('Side panel is supported');
  } else {
    console.log('Side panel is not supported');
  }
});
