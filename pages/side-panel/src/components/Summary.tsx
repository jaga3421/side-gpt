import React, { useState } from 'react';

interface SummaryProps {
  title: string;
  description: string;
  domain: string;
  favicon: string;
  keywords: string[];
}

export const Summary: React.FC<SummaryProps> = ({ title, description, domain, favicon, keywords }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showAllKeywords, setShowAllKeywords] = useState(false);

  const truncateDescription = (text: string, limit: number) => {
    if (text.length <= limit) return text;
    return text.slice(0, limit) + '...';
  };

  const truncateKeyword = (keyword: string, wordLimit: number) => {
    const words = keyword.split(' ');
    if (words.length <= wordLimit) return keyword;
    return words.slice(0, wordLimit).join(' ') + '...';
  };

  const visibleDescription = showFullDescription ? description : truncateDescription(description, 200);
  const visibleKeywords = showAllKeywords ? keywords : keywords.slice(0, 5);

  return (
    <div className="bg-white p-4 shadow-sm">
      <div className="mb-4 flex items-center">
        <img src={favicon} alt="Favicon" className="mr-3 size-8" />
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="mb-3">
        <p className="text-sm text-gray-600">{visibleDescription}</p>
        {description.length > 200 && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="mt-1 text-xs text-blue-600 hover:underline">
            {showFullDescription ? 'See less' : 'See more'}
          </button>
        )}
      </div>
      <div className="mb-2 inline-block rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500">{domain}</div>
      <div className="mt-2">
        {visibleKeywords.map((keyword, index) => (
          <span
            key={index}
            className="mb-2 mr-2 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-600"
            title={keyword}>
            {truncateKeyword(keyword, 3)}
          </span>
        ))}
        {keywords.length > 5 && (
          <button
            onClick={() => setShowAllKeywords(!showAllKeywords)}
            className="text-xs text-blue-600 hover:underline">
            {showAllKeywords ? 'See less' : `See ${keywords.length - 5} more`}
          </button>
        )}
      </div>
    </div>
  );
};
