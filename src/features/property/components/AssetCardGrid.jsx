import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Package,
    MapPin,
    Calendar,
    Tag
} from "lucide-react";
import { cn } from "@/lib/utils";

export function AssetCardGrid({ data, mode = "card", onCardClick }) {
    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-slate-300 rounded-lg bg-slate-50">
                <Package className="h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-900">No assets found</h3>
                <p className="text-slate-500 max-w-sm mt-2">
                    Try adjusting your filters or search query to find what you're looking for.
                </p>
            </div>
        );
    }

    return (
        <div className={cn(
            "grid gap-6",
            mode === "grid"
                ? "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
                : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        )}>
            {data.map((asset, index) => (
                <AssetCard
                    key={asset.id || index}
                    asset={asset}
                    mode={mode}
                    onClick={() => onCardClick && onCardClick(asset)}
                />
            ))}
        </div>
    );
}

function AssetCard({ asset, mode, onClick }) {
    const {
        name,
        make,
        property,
        expiry,
        status
    } = asset;

    const getStatusColor = (status) => {
        switch (status) {
            case "Valid": return "bg-emerald-50 text-emerald-700 border-emerald-100";
            case "Expiring Soon": return "bg-yellow-50 text-yellow-700 border-yellow-100";
            case "Expired": return "bg-red-50 text-red-700 border-red-100";
            default: return "bg-slate-100 text-slate-600 border-slate-200";
        }
    };

    const getPropertyName = (prop) => {
        if (!prop) return "Unknown Property";
        const parts = prop.split(',');
        return parts[0];
    };

    if (mode === "grid") {
        // Visual Grid View (Thumbnail focused)
        return (
            <div
                className="group relative bg-white border border-slate-300 rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer"
                onClick={onClick}
            >
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden flex items-center justify-center">
                    <Package className="h-12 w-12 text-slate-300" />
                    <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className={cn("font-medium shadow-sm backdrop-blur-sm bg-white/90", getStatusColor(status))}>
                            {status}
                        </Badge>
                    </div>
                </div>
                <div className="p-3 border-t border-slate-100">
                    <h3 className="font-semibold text-slate-900 truncate" title={name}>{name}</h3>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{make}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                        <span className="text-xs font-medium text-slate-600 truncate max-w-[100px]" title={getPropertyName(property)}>
                            {getPropertyName(property)}
                        </span>
                        <span className="text-xs font-bold text-slate-900">
                            {expiry}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    // Card View (Detailed)
    return (
        <div
            className="bg-white border border-slate-300 rounded-lg overflow-hidden hover:shadow-md hover:-translate-y-[2px] transition-all duration-200 cursor-pointer flex flex-col"
            onClick={onClick}
        >
            <div className="p-5 flex-1">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0 flex items-center justify-center">
                            <Package className="h-6 w-6 text-slate-400" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 text-base">{name}</h3>
                            <div className="flex items-center text-slate-500 text-xs mt-1">
                                <Tag className="h-3 w-3 mr-1" />
                                {make}
                            </div>
                        </div>
                    </div>
                    <Badge variant="outline" className={cn("font-medium", getStatusColor(status))}>
                        {status}
                    </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-slate-50">
                    <div className="flex flex-col gap-1">
                        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Property</span>
                        <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-slate-400" />
                            <span className="text-sm font-medium text-slate-700 truncate max-w-[120px]" title={getPropertyName(property)}>
                                {getPropertyName(property)}
                            </span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Expiry Date</span>
                        <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                            <span className="text-sm font-medium text-slate-700">
                                {expiry}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Last updated recently</span>
                <Button variant="ghost" size="sm" className="h-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 -mr-2">
                    View Details
                </Button>
            </div>
        </div>
    );
}
