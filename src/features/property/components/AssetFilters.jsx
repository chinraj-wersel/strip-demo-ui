import React from "react";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

export function AssetFilters({
    open,
    onOpenChange,
    filters,
    onFilterChange,
    onClearFilters,
    properties = []
}) {
    const hasActiveFilters =
        filters.status?.length > 0 ||
        filters.properties?.length > 0;

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader className="pb-6 border-b border-slate-100">
                    <SheetTitle className="text-xl font-semibold text-slate-900">Filters</SheetTitle>
                    <SheetDescription>
                        Refine your asset list by status, property, and more.
                    </SheetDescription>
                </SheetHeader>

                <div className="py-6 space-y-8">
                    {/* Status Filter */}
                    <div className="space-y-4">
                        <Label className="text-base font-medium text-slate-900">Status</Label>
                        <div className="flex flex-wrap gap-2">
                            {["Valid", "Expiring Soon", "Expired"].map((status) => (
                                <FilterChip
                                    key={status}
                                    label={status}
                                    selected={filters.status?.includes(status)}
                                    onClick={() => {
                                        const current = filters.status || [];
                                        const next = current.includes(status)
                                            ? current.filter(s => s !== status)
                                            : [...current, status];
                                        onFilterChange("status", next);
                                    }}
                                />
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Property Filter */}
                    <div className="space-y-4">
                        <Label className="text-base font-medium text-slate-900">Property</Label>
                        <div className="grid grid-cols-1 gap-2">
                            {properties.map((property) => (
                                <div key={property} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`prop-${property}`}
                                        checked={filters.properties?.includes(property)}
                                        onCheckedChange={(checked) => {
                                            const current = filters.properties || [];
                                            const next = checked
                                                ? [...current, property]
                                                : current.filter(p => p !== property);
                                            onFilterChange("properties", next);
                                        }}
                                    />
                                    <label
                                        htmlFor={`prop-${property}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700"
                                    >
                                        {property}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <SheetFooter className="pt-6 border-t border-slate-100 sm:justify-between">
                    <Button
                        variant="ghost"
                        className="text-slate-500 hover:text-slate-900 px-0 hover:bg-transparent"
                        onClick={onClearFilters}
                        disabled={!hasActiveFilters}
                    >
                        Clear all
                    </Button>
                    <div className="flex gap-2">
                        <SheetClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </SheetClose>
                        <Button onClick={() => onOpenChange(false)} className="bg-[#635bff] hover:bg-[#5851ea] text-white">
                            Show Assets
                        </Button>
                    </div>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

function FilterChip({ label, selected, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`
        inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-colors border
        ${selected
                    ? "bg-indigo-50 text-indigo-700 border-indigo-200"
                    : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                }
      `}
        >
            {label}
            {selected && <X className="ml-1.5 h-3.5 w-3.5" />}
        </button>
    );
}
