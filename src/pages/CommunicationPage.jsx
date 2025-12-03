import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { MessageSquare } from 'lucide-react';

export const CommunicationPage = () => {
  return (
    <div>
      <PageHeader
        icon={MessageSquare}
        title="Communication"
        showSearch={false}
      />
    </div>
  );
};

