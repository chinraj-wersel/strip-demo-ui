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
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { X } from "lucide-react";

export function PropertyFilters({
    open,
    onOpenChange,
    filters,
    onFilterChange,
    onClearFilters
}) {
    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
                <SheetHeader className="pb-6 border-b border-slate-100">
                    <div className="flex items-center justify-between">
                        <SheetTitle className="text-xl font-semibold text-slate-900">Filters</SheetTitle>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-slate-500 hover:text-slate-900"
                            onClick={onClearFilters}
                        >
                            Clear all
                        </Button>
                    </div>
                    <SheetDescription>
                        Refine your property list by status, type, rent range, and more.
                    </SheetDescription>
                </SheetHeader>

                <div className="py-6 space-y-8">
                    {/* Status Filter */}
                    <div className="space-y-4">
                        <Label className="text-base font-medium text-slate-900">Property Status</Label>
                        <div className="flex flex-wrap gap-2">
                            {["Active", "Vacant", "Leased", "Maintenance", "Archived"].map((status) => (
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

                    {/* Property Type Filter */}
                    <div className="space-y-4">
                        <Label className="text-base font-medium text-slate-900">Property Type</Label>
                        <div className="grid grid-cols-2 gap-4">
                            {["Apartment", "Single Family", "Commercial", "Condo", "Townhouse", "Industrial"].map((type) => (
                                <div key={type} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`type-${type}`}
                                        checked={filters.type?.includes(type)}
                                        onCheckedChange={(checked) => {
                                            const current = filters.type || [];
                                            const next = checked
                                                ? [...current, type]
                                                : current.filter(t => t !== type);
                                            onFilterChange("type", next);
                                        }}
                                    />
                                    <label
                                        htmlFor={`type-${type}`}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-slate-700"
                                    >
                                        {type}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <Separator />

                    {/* Rent Range Filter */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label className="text-base font-medium text-slate-900">Monthly Rent Range</Label>
                            <span className="text-sm text-slate-500 font-medium">
                                ${filters.rentRange?.[0] || 0} - ${filters.rentRange?.[1] || 10000}+
                            </span>
                        </div>
                        <Slider
                            defaultValue={[0, 10000]}
                            value={filters.rentRange || [0, 10000]}
                            max={10000}
                            step={100}
                            onValueChange={(val) => onFilterChange("rentRange", val)}
                            className="py-4"
                        />
                        <div className="flex justify-between text-xs text-slate-400">
                            <span>$0</span>
                            <span>$2,500</span>
                            <span>$5,000</span>
                            <span>$7,500</span>
                            <span>$10k+</span>
                        </div>
                    </div>

                    <Separator />

                    {/* Location / City */}
                    <div className="space-y-4">
                        <Label className="text-base font-medium text-slate-900">Location</Label>
                        <div className="grid grid-cols-2 gap-2">
                            {["New York", "Los Angeles", "Chicago", "Houston", "Miami", "Seattle"].map((city) => (
                                <FilterChip
                                    key={city}
                                    label={city}
                                    selected={filters.location?.includes(city)}
                                    onClick={() => {
                                        const current = filters.location || [];
                                        const next = current.includes(city)
                                            ? current.filter(c => c !== city)
                                            : [...current, city];
                                        onFilterChange("location", next);
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <SheetFooter className="pt-6 border-t border-slate-100">
                    <SheetClose asChild>
                        <Button variant="outline" className="mr-2">Cancel</Button>
                    </SheetClose>
                    <Button onClick={() => onOpenChange(false)} className="bg-[#635bff] hover:bg-[#5851ea] text-white">
                        Show Properties
                    </Button>
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
