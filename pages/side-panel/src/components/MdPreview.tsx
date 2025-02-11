/* eslint-disable react/no-children-prop */
/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react'; // Import useState
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface MdPreviewProps {
  markdown: string;
}

const MdPreview: React.FC<MdPreviewProps> = ({ markdown }) => {
  return (
    <div className="m-1 mt-3 scroll-m-1 rounded bg-gray-200 p-1">
      <div className="markdown-preview overflow-y-auto p-1">
        <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} />
      </div>
    </div>
  );
};

export default MdPreview;
