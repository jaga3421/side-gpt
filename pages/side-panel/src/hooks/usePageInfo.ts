import { useState, useEffect } from 'react';

interface PageInfo {
  title: string;
  description: string;
  domain: string;
  favicon: string;
  keywords: string[];
  content: string;
}

export const usePageInfo = () => {
  const [pageInfo, setPageInfo] = useState<PageInfo>({
    title: '',
    description: '',
    domain: '',
    favicon: '',
    keywords: [],
    content: '',
  });

  useEffect(() => {
    const extractMetadata = async () => {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (!tab.id) throw new Error('No active tab');

        const result = await chrome.tabs.sendMessage(tab.id, { action: 'getMetadata' });
        console.log('result', result);

        const description = result.description || 'No description available';
        const keywords = result.keywords || [];
        const content = result.content || '';

        return { description, keywords, content };
      } catch (error) {
        console.error('Error getting metadata:', error);
        return { description: 'Unable to fetch description', keywords: [], content: '' };
      }
    };

    const updatePageInfo = async (tab: chrome.tabs.Tab) => {
      if (tab.url) {
        const url = new URL(tab.url);
        const { description, keywords, content } = await extractMetadata();
        setPageInfo({
          title: tab.title || 'No Title',
          description,
          domain: url.hostname,
          favicon: `https://www.google.com/s2/favicons?domain=${url.hostname}&sz=64`,
          keywords,
          content,
        });
      }
    };

    const handleTabUpdate = (tabId: number, changeInfo: chrome.tabs.TabChangeInfo, tab: chrome.tabs.Tab) => {
      if (changeInfo.status === 'complete') {
        chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
          if (tabs[0] && tabs[0].id === tabId) {
            updatePageInfo(tab);
          }
        });
      }
    };

    const handleTabActivated = (activeInfo: chrome.tabs.TabActiveInfo) => {
      chrome.tabs.get(activeInfo.tabId, tab => {
        if (tab) {
          updatePageInfo(tab);
        }
      });
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleContentUpdate = (message: any) => {
      if (message.action === 'contentUpdate') {
        setPageInfo(prevInfo => ({ ...prevInfo, content: message.content }));
      }
    };

    chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
      if (tabs[0]) {
        updatePageInfo(tabs[0]);
      }
    });

    chrome.tabs.onUpdated.addListener(handleTabUpdate);
    chrome.tabs.onActivated.addListener(handleTabActivated);
    chrome.runtime.onMessage.addListener(handleContentUpdate);

    return () => {
      chrome.tabs.onUpdated.removeListener(handleTabUpdate);
      chrome.tabs.onActivated.removeListener(handleTabActivated);
      chrome.runtime.onMessage.removeListener(handleContentUpdate);
    };
  }, []);

  return pageInfo;
};
