/* eslint-disable tailwindcss/no-custom-classname */
import React from 'react';
import '@src/SidePanel.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { usePageInfo } from './hooks/usePageInfo';
import { Summary } from './components/Summary';
// import MdPreview from './components/MdPreview';
// import ChatWindow from './components/ChatWindow';

const SidePanel: React.FC = () => {
  const pageInfo = usePageInfo();

  return (
    <div className="sidepanel-wrapper flex h-screen flex-col bg-gray-100">
      <div className="sidepanel-summary flex-none overflow-y-auto">
        <Summary {...pageInfo} />
      </div>
      {/* Uncomment this section if you want to include MdPreview */}
      {/* <div  className="flex-none overflow-y-auto">
        <MdPreview markdown={pageInfo.content} />
      </div> */}

      <div className="sidepanel-chat grow">
        {' '}
        {/* Use flex-grow to take remaining height */}
        {/* <ChatWindow /> */}
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div>Loading...</div>), <div>Error Occurred</div>);
