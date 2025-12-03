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

    if (mode === "grid") {
        return (
            <div
                className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={onClick}
            >
                <div className="aspect-square bg-slate-50 relative overflow-hidden flex items-center justify-center group-hover:bg-slate-100 transition-colors">
                    <Package className="h-10 w-10 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    <div className="absolute top-3 right-3">
                        <Badge variant="secondary" className={cn("font-medium shadow-sm backdrop-blur-sm bg-white/90", getStatusColor(status))}>
                            {status}
                        </Badge>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-slate-900 truncate group-hover:text-indigo-600 transition-colors" title={name}>{name}</h3>
                    <p className="text-sm text-slate-500 truncate mt-1">{make}</p>
                </div>
            </div>
        );
    }

    // Card View (Minimal & Premium)
    return (
        <div
            className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col"
            onClick={onClick}
        >
            <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-hover:scale-110 transition-transform duration-300">
                            <Package className="h-6 w-6" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 text-lg group-hover:text-indigo-600 transition-colors">{name}</h3>
                            <p className="text-sm text-slate-500 font-medium">{make}</p>
                        </div>
                    </div>
                    <Badge variant="secondary" className={cn("px-2.5 py-0.5 font-medium border", getStatusColor(status))}>
                        {status}
                    </Badge>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex flex-col">
                        <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Expiry Date</span>
                        <div className="flex items-center gap-2 mt-1">
                            <Calendar className="h-3.5 w-3.5 text-slate-400" />
                            <span className="text-sm font-semibold text-slate-700">{expiry}</span>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 font-medium group-hover:translate-x-1 transition-transform">
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    );
}
