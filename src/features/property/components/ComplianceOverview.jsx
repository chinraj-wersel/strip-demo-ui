import { useMemo } from 'react';
import { useProperty } from '../context/PropertyContext';
import { PropertyTable } from '@/features/properties/components/PropertyTable';
import { LayoutGrid } from 'lucide-react';
import { PageHeader } from '@/components/ui/page-header';

export const ComplianceOverview = () => {
  const { portfolio } = useProperty();

  const getPropertyName = (property) => {
    const addressParts = property.address.split(',');
    return addressParts[0] || property.address;
  };

  const getComplianceBadge = (status, type) => {
    if (type === 'fireRisk' && status === 'Expired') {
      return { bg: 'bg-red-100', text: 'text-red-800', label: 'Expired' };
    }
    if (type === 'epc') {
      return { bg: 'bg-blue-100', text: 'text-blue-800', label: 'C Rating' };
    }
    return { bg: 'bg-green-100', text: 'text-green-800', label: 'Valid' };
  };

  // Define columns for PropertyTable
  const columns = useMemo(() => [
    {
      id: 'property',
      accessorKey: 'address',
      header: 'Property',
      size: 250,
      cell: ({ row }) => {
        return (
          <div className="font-medium text-slate-900">{getPropertyName(row.original)}</div>
        );
      },
    },
    {
      id: 'gasSafety',
      accessorKey: 'gasSafety',
      header: 'Gas Safety',
      size: 150,
      cell: ({ row }) => {
        const badge = getComplianceBadge('Valid', 'gasSafety');
        return (
          <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${badge.bg} ${badge.text}`}>
            {badge.label}
          </span>
        );
      },
    },
    {
      id: 'eicr',
      accessorKey: 'eicr',
      header: 'EICR',
      size: 150,
      cell: ({ row }) => {
        const badge = getComplianceBadge('Valid', 'eicr');
        return (
          <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${badge.bg} ${badge.text}`}>
            {badge.label}
          </span>
        );
      },
    },
    {
      id: 'epc',
      accessorKey: 'epc',
      header: 'EPC',
      size: 150,
      cell: ({ row }) => {
        const badge = getComplianceBadge('C Rating', 'epc');
        return (
          <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${badge.bg} ${badge.text}`}>
            {badge.label}
          </span>
        );
      },
    },
    {
      id: 'fireRisk',
      accessorKey: 'fireRisk',
      header: 'Fire Risk',
      size: 150,
      cell: ({ row }) => {
        const status = row.original.id === 'P002' ? 'Expired' : 'Valid';
        const badge = getComplianceBadge(status, 'fireRisk');
        return (
          <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${badge.bg} ${badge.text}`}>
            {badge.label}
          </span>
        );
      },
    },
  ], []);

  // Transform portfolio data for table
  const tableData = useMemo(() => portfolio, [portfolio]);

  return (
    <div>
      {/* Header with Title and Search */}
      <PageHeader
        icon={LayoutGrid}
        title="Compliance Overview"
        showSearch={false}
      />

      {/* Stats Cards */}
      <div className="max-w-[1600px] mx-auto mt-4 px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-green-50 p-4 rounded-lg border border-green-500">
            <div className="font-bold text-green-700 text-xl mb-1">92% Compliant</div>
            <div className="text-sm text-slate-600">Overall Score</div>
          </div>
          <div className="bg-red-50 p-4 rounded-lg border border-red-500">
            <div className="font-bold text-red-700 text-xl mb-1">1 Critical</div>
            <div className="text-sm text-slate-600">Immediate Action Required</div>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-500">
            <div className="font-bold text-yellow-700 text-xl mb-1">2 Expiring Soon</div>
            <div className="text-sm text-slate-600">Next 30 Days</div>
          </div>
        </div>

        {/* Property Table */}
        <div>
          <PropertyTable
            data={tableData}
            columns={columns}
          />
        </div>
      </div>
    </div>
  );
};

