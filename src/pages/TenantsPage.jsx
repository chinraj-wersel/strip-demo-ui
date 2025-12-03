import React from 'react';
import { PageHeader } from '@/components/ui/page-header';
import { Users } from 'lucide-react';

export const TenantsPage = () => {
  return (
    <div>
      <PageHeader
        icon={Users}
        title="Tenants"
        showSearch={false}
      />
    </div>
  );
};

