import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Building2,
    Users,
    DollarSign,
    MoreHorizontal,
    MapPin
} from "lucide-react";
import { cn } from "@/lib/utils";

export function PropertyCardGrid({ data, mode = "card", onCardClick }) {
    if (!data || data.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-slate-300 rounded-lg bg-slate-50">
                <Building2 className="h-12 w-12 text-slate-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-900">No properties found</h3>
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
            {data.map((property) => (
                <PropertyCard
                    key={property.id}
                    property={property}
                    mode={mode}
                    onClick={() => onCardClick && onCardClick(property)}
                />
            ))}
        </div>
    );
}

function PropertyCard({ property, mode, onClick }) {
    const {
        name,
        address,
        image,
        status,
        units,
        occupancy,
        rent,
        type
    } = property;

    const getStatusColor = (status) => {
        switch (status) {
            case "Active": return "bg-emerald-50 text-emerald-700 border-emerald-100";
            case "Leased": return "bg-emerald-50 text-emerald-700 border-emerald-100";
            case "Vacant": return "bg-amber-50 text-amber-700 border-amber-100";
            case "Maintenance": return "bg-red-50 text-red-700 border-red-100";
            default: return "bg-slate-100 text-slate-600 border-slate-200";
        }
    };

    if (mode === "grid") {
        // Visual Grid View (Thumbnail focused)
        return (
            <div
                className="group relative bg-white border border-slate-300 rounded-lg overflow-hidden hover:shadow-md transition-all cursor-pointer"
                onClick={onClick}
            >
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                    {image ? (
                        <img
                            src={image}
                            alt={name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300">
                            <Building2 className="h-12 w-12" />
                        </div>
                    )}
                    <div className="absolute top-2 right-2">
                        <Badge variant="secondary" className={cn("font-medium shadow-sm backdrop-blur-sm bg-white/90", getStatusColor(status))}>
                            {status}
                        </Badge>
                    </div>
                </div>
                <div className="p-3 border-t border-slate-100">
                    <h3 className="font-semibold text-slate-900 truncate" title={name}>{name}</h3>
                    <p className="text-xs text-slate-500 truncate mt-0.5">{address}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                        <span className="text-xs font-medium text-slate-600">{units} Units</span>
                        <span className="text-xs font-bold text-slate-900">
                            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(rent)}
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
                        <div className="h-12 w-12 rounded-lg bg-slate-100 border border-slate-200 overflow-hidden flex-shrink-0">
                            {image ? (
                                <img src={image} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Building2 className="h-6 w-6 text-slate-400" />
                                </div>
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold text-slate-900 text-base">{name}</h3>
                            <div className="flex items-center text-slate-500 text-xs mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {address}
                            </div>
                        </div>
                    </div>
                    <Badge variant="outline" className={cn("font-medium", getStatusColor(status))}>
                        {status}
                    </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 py-4 border-t border-b border-slate-50">
                    <div className="flex flex-col gap-1">
                        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Occupancy</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-slate-700">{occupancy}%</span>
                            <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden max-w-[60px]">
                                <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${occupancy}%` }} />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Total Revenue</span>
                        <span className="text-sm font-medium text-slate-700">
                            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(rent)}
                        </span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Units</span>
                        <div className="flex items-center gap-1 text-sm font-medium text-slate-700">
                            <Building2 className="h-3.5 w-3.5 text-slate-400" />
                            {units}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Type</span>
                        <span className="text-sm font-medium text-slate-700 capitalize">{type}</span>
                    </div>
                </div>
            </div>

            <div className="bg-slate-50 px-5 py-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Last updated 2 days ago</span>
                <Button variant="ghost" size="sm" className="h-8 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 -mr-2">
                    Manage Property
                </Button>
            </div>
        </div>
    );
}
