import React, { useState } from 'react';
import MdPreview from './MdPreview';

interface TalkToNodeProps {
  summary: string; // Define summary as a string prop
}

const TalkToNode: React.FC<TalkToNodeProps> = ({ summary }) => {
  // Accept summary as a prop
  const [isSummarizing, setIsSummarizing] = useState(false);
  const [responseSummary, setResponseSummary] = useState(''); // Renamed to avoid conflict

  const handleSummarize = async () => {
    setIsSummarizing(true);
    try {
      const response = await fetch('http://localhost:3000/api/v1/sidegpt', {
        method: 'POST', // Change to POST
        headers: {
          'Content-Type': 'application/json', // Set content type
        },
        body: JSON.stringify({
          messages: [
            {
              role: 'user',
              content: summary, // Use the summary prop
            },
          ],
        }),
      });
      const data = await response.json();
      console.log(data);
      setResponseSummary(data.response); // Update state with response
    } catch (error) {
      console.error('Error summarizing:', error);
    } finally {
      setIsSummarizing(false);
    }
  };

  return (
    <div className="mt-4">
      <button
        onClick={handleSummarize}
        className={`bg-blue-600 p-3 text-xs text-white ${isSummarizing ? 'cursor-not-allowed opacity-50' : 'hover:underline'}`}>
        {isSummarizing ? 'Summarizing...' : 'Summarize'}
      </button>
      {responseSummary && <MdPreview markdown={responseSummary} />}
    </div>
  );
};

export default TalkToNode;
