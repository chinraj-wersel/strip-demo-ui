import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Folder } from 'lucide-react';

export const FilesPage = () => {
  return (
    <div>
      <PageHeader
        icon={Folder}
        title="Files"
        showSearch={false}
      />
    </div>
  );
};

