import { useState, useMemo } from 'react';
import { useProperty } from '../context/PropertyContext';
import { PropertyTable } from '@/features/properties/components/PropertyTable';
import { PageHeader } from '@/components/ui/page-header';
import { Package } from 'lucide-react';
import { AssetToolbar } from './AssetToolbar';
import { AssetCardGrid } from './AssetCardGrid';
import { AssetFilters } from './AssetFilters';
import { useResponsive } from '@/hooks/useResponsive';

export const AssetsRegistry = () => {
  const { portfolio } = useProperty();
  const { isMobile } = useResponsive();

  // State for View, Filter, Sort
  const [viewMode, setViewMode] = useState("card"); // table, card, grid
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    status: [],
    properties: [],
  });
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

  const getStatusBadge = (status) => {
    const badges = {
      'Valid': { bg: 'bg-green-100 dark:bg-green-900/50', text: 'text-green-800 dark:text-green-300' },
      'Expired': { bg: 'bg-red-100 dark:bg-red-900/50', text: 'text-red-800 dark:text-red-300' },
      'Expiring Soon': { bg: 'bg-yellow-100 dark:bg-yellow-900/50', text: 'text-yellow-800 dark:text-yellow-300' }
    };
    return badges[status] || { bg: 'bg-muted', text: 'text-muted-foreground' };
  };

  const getPropertyName = (property) => {
    if (!property) return "";
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
  const rawData = useMemo(() => {
    if (!portfolio) return [];
    return portfolio.flatMap(p =>
      (p.assets || []).map(a => ({ ...a, property: p.address }))
    );
  }, [portfolio]);

  // Filter and Sort Logic
  const filteredData = useMemo(() => {
    let data = [...rawData];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      data = data.filter(item =>
        item.name?.toLowerCase().includes(q) ||
        item.make?.toLowerCase().includes(q) ||
        item.property?.toLowerCase().includes(q)
      );
    }

    // Filters
    if (filters.status.length > 0) {
      data = data.filter(item => filters.status.includes(item.status));
    }
    if (filters.properties.length > 0) {
      data = data.filter(item => {
        const propName = getPropertyName(item.property);
        return filters.properties.includes(propName);
      });
    }

    // Sort
    data.sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];

      if (!aVal) return 1;
      if (!bVal) return -1;

      if (typeof aVal === 'string') {
        return sortConfig.direction === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
    });

    return data;
  }, [rawData, searchQuery, filters, sortConfig]);

  // Get unique properties for filter
  const uniqueProperties = useMemo(() => {
    const props = new Set(rawData.map(item => getPropertyName(item.property)));
    return Array.from(props).sort();
  }, [rawData]);

  const activeFiltersCount = filters.status.length + filters.properties.length;

  return (
    <div>
      {/* Header with Title */}
      <PageHeader
        icon={Package}
        title="Assets"
        showSearch={false}
      />

      <div className="max-w-[1600px] mx-auto mt-4 px-8">
        {/* Toolbar */}
        <AssetToolbar
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onFilterClick={() => setIsFilterOpen(true)}
          activeFiltersCount={activeFiltersCount}
          sortConfig={sortConfig}
          onSortChange={setSortConfig}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Table View */}
        {viewMode === "table" && !isMobile && (
          <PropertyTable
            data={filteredData}
            columns={columns}
          />
        )}

        {/* Card/Grid View (or Mobile Table fallback) */}
        {(viewMode === "card" || viewMode === "grid" || (viewMode === "table" && isMobile)) && (
          <AssetCardGrid
            data={filteredData}
            mode={viewMode === "table" && isMobile ? "card" : viewMode}
            onCardClick={(item) => console.log("Clicked asset", item)}
          />
        )}
      </div>

      {/* Filters Sheet */}
      <AssetFilters
        open={isFilterOpen}
        onOpenChange={setIsFilterOpen}
        filters={filters}
        onFilterChange={(key, val) => setFilters(prev => ({ ...prev, [key]: val }))}
        onClearFilters={() => setFilters({
          status: [],
          properties: [],
        })}
        properties={uniqueProperties}
      />
    </div>
  );
};

