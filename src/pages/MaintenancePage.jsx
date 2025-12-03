import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Wrench } from 'lucide-react';

export const MaintenancePage = () => {
  return (
    <div>
      <PageHeader
        icon={Wrench}
        title="Maintenance"
        showSearch={false}
      />
    </div>
  );
};

