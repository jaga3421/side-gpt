import { Readability } from '@mozilla/readability';
import TurndownService from 'turndown';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  codeBlockStyle: 'fenced',
  emDelimiter: '*',
  bulletListMarker: '-',
  strongDelimiter: '**',
  linkStyle: 'inlined',
  linkReferenceStyle: 'full',
  br: '  \n', // This ensures that line breaks are preserved
});

// Customize turndown to ignore images and other unwanted elements
turndownService.remove(['script', 'style']);
turndownService.addRule('removeImages', {
  filter: ['img', 'a'],
  replacement: function (content, node) {
    // If it's an anchor tag with text content, return the text
    if (node.nodeName === 'A' && node.textContent) {
      return node.textContent;
    }
    // For images or empty links, return an empty string
    return '';
  },
});

// Add a custom rule for handling paragraphs with proper line breaks
turndownService.addRule('paragraph', {
  filter: 'p',
  replacement: function (content) {
    return '\n\n' + content + '\n\n';
  },
});

// Add a custom rule for handling line breaks within other elements
turndownService.addRule('lineBreak', {
  filter: 'br',
  replacement: function (content, node, options) {
    return options.br + '\n';
  },
});

function extractContent() {
  const documentClone = document.cloneNode(true) as Document;
  const article = new Readability(documentClone).parse();

  if (article && article.content) {
    let markdown = turndownService.turndown(article.content);
    // Remove excessive newlines
    markdown = markdown.replace(/\n{3,}/g, '\n\n');
    return markdown;
  }
  return '';
}

function extractPageData() {
  const metadata = {
    description: document.querySelector('meta[name="description"]')?.getAttribute('content') || '',
    keywords:
      document
        .querySelector('meta[name="keywords"]')
        ?.getAttribute('content')
        ?.split(',')
        .map(k => k.trim()) || [],
    content: extractContent(),
  };
  return metadata;
}

export { extractPageData, extractContent };
