import React from "react";
import {
    LayoutGrid,
    List,
    Grid,
    Filter,
    ArrowUpDown,
    Search,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

export function PropertyToolbar({
    viewMode,
    onViewModeChange,
    onFilterClick,
    activeFiltersCount,
    sortConfig,
    onSortChange,
    searchQuery,
    onSearchChange,
}) {
    return (
        <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center justify-between gap-4 flex-wrap">
                {/* Left: Filters */}
                <div className="flex items-center gap-3 flex-1 min-w-[300px]">
                    <Button
                        variant="outline"
                        className="gap-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
                        onClick={onFilterClick}
                    >
                        <Filter className="h-4 w-4" />
                        Filters
                        {activeFiltersCount > 0 && (
                            <Badge variant="secondary" className="ml-1 h-5 px-1.5 bg-slate-100 text-slate-700">
                                {activeFiltersCount}
                            </Badge>
                        )}
                    </Button>
                </div>

                {/* Right: Sort, View Toggle, Add Button */}
                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2 border-slate-200 text-slate-700">
                                <ArrowUpDown className="h-4 w-4" />
                                Sort
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px]">
                            <DropdownMenuItem onClick={() => onSortChange({ key: 'name', direction: 'asc' })}>
                                Name (A-Z)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSortChange({ key: 'name', direction: 'desc' })}>
                                Name (Z-A)
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onSortChange({ key: 'createdAt', direction: 'desc' })}>
                                Newest First
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSortChange({ key: 'createdAt', direction: 'asc' })}>
                                Oldest First
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onSortChange({ key: 'rent', direction: 'desc' })}>
                                Highest Rent
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSortChange({ key: 'rent', direction: 'asc' })}>
                                Lowest Rent
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="h-8 w-[1px] bg-slate-200 mx-1" />

                    <ToggleGroup
                        type="single"
                        value={viewMode}
                        onValueChange={(val) => val && onViewModeChange(val)}
                        className="border border-slate-200 rounded-md p-1 bg-slate-50 gap-1"
                    >
                        <ToggleGroupItem value="card" aria-label="Card view" className="h-8 w-8 p-0 data-[state=on]:bg-white data-[state=on]:shadow-sm">
                            <LayoutGrid className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="table" aria-label="Table view" className="h-8 w-8 p-0 data-[state=on]:bg-white data-[state=on]:shadow-sm">
                            <List className="h-4 w-4" />
                        </ToggleGroupItem>
                        <ToggleGroupItem value="grid" aria-label="Grid view" className="h-8 w-8 p-0 data-[state=on]:bg-white data-[state=on]:shadow-sm">
                            <Grid className="h-4 w-4" />
                        </ToggleGroupItem>
                    </ToggleGroup>

                    <Button className="ml-2 bg-[#635bff] hover:bg-[#5851ea] text-white gap-2 shadow-sm">
                        <Plus className="h-4 w-4" />
                        Add Property
                    </Button>
                </div>
            </div>
        </div>
    );
}
