console.log('content script loaded');
import { extractContent, extractPageData } from './extractPageData';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getMetadata') {
    const data = extractPageData();
    console.log('metadata', data);
    sendResponse(data);
  }
  return true;
});

const sendContentUpdate = () => {
  const content = extractContent();
  chrome.runtime.sendMessage({ action: 'contentUpdate', content });
};

const observer = new MutationObserver(sendContentUpdate);
observer.observe(document.body, { childList: true, subtree: true });

// Initial content send
sendContentUpdate();
