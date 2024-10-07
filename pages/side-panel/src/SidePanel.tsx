import React from 'react';
import '@src/SidePanel.css';
import { withErrorBoundary, withSuspense } from '@extension/shared';
import { usePageInfo } from './hooks/UsePageInfo';
import { Summary } from './components/Summary';

const SidePanel: React.FC = () => {
  const pageInfo = usePageInfo();

  return (
    <div className="flex h-screen flex-col bg-gray-100">
      <div className="flex-1 overflow-y-auto">
        <Summary {...pageInfo} />
        {pageInfo.content}
      </div>
    </div>
  );
};

export default withErrorBoundary(withSuspense(SidePanel, <div>Loading...</div>), <div>Error Occurred</div>);
