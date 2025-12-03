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
        rent
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
                className="group relative bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-[#635bff] transition-all duration-300 cursor-pointer"
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
                    <div className="absolute top-3 right-3 z-10">
                        <Badge variant="secondary" className={cn("font-medium shadow-sm backdrop-blur-md bg-white/90", getStatusColor(status))}>
                            {status}
                        </Badge>
                    </div>
                </div>
                <div className="p-4">
                    <h3 className="font-semibold text-slate-900 truncate group-hover:text-[#635bff] transition-colors" title={name}>{name}</h3>
                    <p className="text-sm text-slate-500 truncate mt-1">{address}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-50">
                        <span className="text-xs font-medium text-slate-500">Monthly Rent</span>
                        <span className="text-sm font-bold text-slate-900">
                            {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(rent)}
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    // Card View (Minimal & Premium)
    return (
        <div
            className="group bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-[#635bff] transition-all duration-300 cursor-pointer flex flex-col relative"
            onClick={onClick}
        >
            <div className="p-6 flex-1">
                <div className="flex items-start justify-between mb-6 relative z-10">
                    <div className="flex items-center gap-4 overflow-hidden flex-1">
                        <div className="h-16 w-16 rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden flex-shrink-0 shadow-sm group-hover:shadow-md transition-all duration-300">
                            {image ? (
                                <img src={image} alt="" className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                    <Building2 className="h-8 w-8 text-slate-400 group-hover:text-[#635bff] transition-colors" />
                                </div>
                            )}
                        </div>
                        <div className="min-w-0 flex-1">
                            <h3 className="font-semibold text-slate-900 text-lg group-hover:text-[#635bff] transition-colors truncate pr-2">{name}</h3>
                            <div className="flex items-center text-slate-500 text-sm mt-1">
                                <MapPin className="h-3.5 w-3.5 mr-1.5 flex-shrink-0" />
                                <span className="truncate">{address}</span>
                            </div>
                        </div>
                    </div>
                    <Badge variant="secondary" className={cn("px-2.5 py-1 font-medium border shrink-0 z-10", getStatusColor(status))}>
                        {status}
                    </Badge>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <div className="flex flex-col">
                        <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Total Revenue</span>
                        <div className="flex items-center gap-1 mt-1">
                            <span className="text-sm font-semibold text-slate-900">
                                {new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(rent)}
                            </span>
                            <span className="text-xs text-slate-400 font-normal">/ month</span>
                        </div>
                    </div>

                    <Button variant="ghost" size="sm" className="text-[#635bff] hover:text-[#5851ea] hover:bg-indigo-50 font-medium group-hover:translate-x-1 transition-transform">
                        View Details
                    </Button>
                </div>
            </div>
        </div>
    );
}
