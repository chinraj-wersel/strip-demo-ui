import React, { useState, useMemo } from "react";
import { useProperty } from "@/features/property/context/PropertyContext";
import { PropertyToolbar } from "./PropertyToolbar";
import { PropertyTable, defaultPropertyColumns } from "./PropertyTable";
import { PropertyCardGrid } from "./PropertyCardGrid";
import { PropertyFilters } from "./PropertyFilters";
import { PageHeader } from "@/components/ui/page-header";
import { Building2 } from "lucide-react";

export function PropertyDashboard() {
    const { portfolio } = useProperty();
    const [viewMode, setViewMode] = useState("table"); // table, card, grid
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filters, setFilters] = useState({
        status: [],
        type: [],
        rentRange: [0, 10000],
        location: [],
    });
    const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });

    // Transform data to match new UI requirements
    const transformedData = useMemo(() => {
        if (!portfolio) return [];

        return portfolio.map(p => {
            // Calculate derived metrics
            const unitCount = p.units ? p.units.length : (p.assets ? p.assets.length : 0);
            const occupiedCount = p.units ? p.units.filter(u => u.status === 'Occupied').length : 0;
            const occupancyRate = unitCount > 0 ? Math.round((occupiedCount / unitCount) * 100) : 0;

            // Mock rent for demo (sum of units or random base)
            const totalRent = p.units
                ? p.units.reduce((sum, u) => sum + (parseFloat(u.rent) || 0), 0)
                : (Math.random() * 5000 + 2000);

            return {
                id: p.id,
                name: p.propertyName || p.address.split(',')[0],
                address: p.address,
                type: p.type,
                status: p.status,
                units: unitCount,
                occupancy: occupancyRate,
                rent: totalRent,
                image: p.image || null, // Assuming image might exist or be null
                original: p, // Keep original for actions
            };
        });
    }, [portfolio]);

    // Filter and Sort
    const filteredData = useMemo(() => {
        let data = [...transformedData];

        // Search
        if (searchQuery) {
            const q = searchQuery.toLowerCase();
            data = data.filter(p =>
                p.name.toLowerCase().includes(q) ||
                p.address.toLowerCase().includes(q)
            );
        }

        // Filters
        if (filters.status.length > 0) {
            data = data.filter(p => filters.status.includes(p.status));
        }
        if (filters.type.length > 0) {
            data = data.filter(p => filters.type.includes(p.type));
        }
        // Rent range
        data = data.filter(p => p.rent >= filters.rentRange[0] && p.rent <= filters.rentRange[1]);

        // Location (simple string match for now)
        if (filters.location.length > 0) {
            data = data.filter(p => filters.location.some(loc => p.address.includes(loc)));
        }

        // Sort
        data.sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];

            if (typeof aVal === 'string') {
                return sortConfig.direction === 'asc'
                    ? aVal.localeCompare(bVal)
                    : bVal.localeCompare(aVal);
            }
            return sortConfig.direction === 'asc' ? aVal - bVal : bVal - aVal;
        });

        return data;
    }, [transformedData, searchQuery, filters, sortConfig]);

    const activeFiltersCount =
        filters.status.length +
        filters.type.length +
        filters.location.length +
        (filters.rentRange[0] > 0 || filters.rentRange[1] < 10000 ? 1 : 0);

    return (
        <div>
            <PageHeader
                icon={Building2}
                title="Properties"
                description="Manage your real estate assets, view occupancy, and track revenue."
                showSearch={false}
            />

            <div className="max-w-[1600px] mx-auto mt-4 px-8">
                <PropertyToolbar
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    onFilterClick={() => setIsFilterOpen(true)}
                    activeFiltersCount={activeFiltersCount}
                    sortConfig={sortConfig}
                    onSortChange={setSortConfig}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                />

                {viewMode === "table" && (
                    <PropertyTable
                        data={filteredData}
                        columns={defaultPropertyColumns}
                        onRowClick={(row) => console.log("Clicked row", row)}
                    />
                )}

                {(viewMode === "card" || viewMode === "grid") && (
                    <PropertyCardGrid
                        data={filteredData}
                        mode={viewMode}
                        onCardClick={(item) => console.log("Clicked card", item)}
                    />
                )}
            </div>

            <PropertyFilters
                open={isFilterOpen}
                onOpenChange={setIsFilterOpen}
                filters={filters}
                onFilterChange={(key, val) => setFilters(prev => ({ ...prev, [key]: val }))}
                onClearFilters={() => setFilters({
                    status: [],
                    type: [],
                    rentRange: [0, 10000],
                    location: [],
                })}
            />
        </div>
    );
}
