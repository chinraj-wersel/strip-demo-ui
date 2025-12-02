import { useMemo } from 'react';
import { useProperty } from '../context/PropertyContext';
import { PropertyTable } from '@/features/properties/components/PropertyTable';
import { PageHeader } from '@/components/ui/page-header';
import { Package } from 'lucide-react';

export const AssetsRegistry = () => {
  const { portfolio } = useProperty();

  const getStatusBadge = (status) => {
    const badges = {
      'Valid': { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-800 dark:text-green-300' },
      'Expired': { bg: 'bg-red-100 dark:bg-red-900/50', text: 'text-red-800 dark:text-red-300' },
      'Expiring Soon': { bg: 'bg-yellow-100 dark:bg-yellow-900/50', text: 'text-yellow-800 dark:text-yellow-300' }
    };
    return badges[status] || { bg: 'bg-muted', text: 'text-muted-foreground' };
  };

  const getPropertyName = (property) => {
    const addressParts = property.split(',');
    return addressParts[0] || property;
  };

  // Define columns for PropertyTable
  const columns = useMemo(() => [
    {
      id: 'assetName',
      accessorKey: 'name',
      header: 'Asset Name',
      size: 200,
      cell: ({ row }) => {
        return (
          <div className="font-medium text-slate-900">{row.original.name}</div>
        );
      },
    },
    {
      id: 'makeModel',
      accessorKey: 'make',
      header: 'Make/Model',
      size: 150,
      cell: ({ row }) => {
        return (
          <div className="text-sm text-slate-600">{row.original.make}</div>
        );
      },
    },
    {
      id: 'property',
      accessorKey: 'property',
      header: 'Property',
      size: 250,
      cell: ({ row }) => {
        return (
          <div className="text-sm text-slate-600 max-w-xs truncate">
            {getPropertyName(row.original.property)}
          </div>
        );
      },
    },
    {
      id: 'expiry',
      accessorKey: 'expiry',
      header: 'Expiry',
      size: 150,
      cell: ({ row }) => {
        return (
          <div className="text-sm text-slate-600">{row.original.expiry}</div>
        );
      },
    },
    {
      id: 'status',
      accessorKey: 'status',
      header: 'Status',
      size: 180,
      cell: ({ row }) => {
        const statusBadge = getStatusBadge(row.original.status);
        return (
          <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${statusBadge.bg} ${statusBadge.text}`}>
            {row.original.status}
          </span>
        );
      },
    },
  ], []);

  // Transform assets data for table
  const tableData = useMemo(() => {
    return portfolio.flatMap(p =>
      p.assets.map(a => ({ ...a, property: p.address }))
    );
  }, [portfolio]);

  return (
    <div>
      {/* Header with Title and Search */}
      <PageHeader
        icon={Package}
        title="Assets"
        showSearch={false}
      />

      {/* Property Table */}
      <div className="max-w-[1600px] mx-auto mt-4 px-8">
        <PropertyTable
          data={tableData}
          columns={columns}
        />
      </div>
    </div>
  );
};

