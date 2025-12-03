import React from "react";
import {
    LayoutGrid,
    List,
    Grid,
    Filter,
    ArrowUpDown,
    Plus,
    Search
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export function AssetToolbar({
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
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                {/* Left: Filters */}
                <div className="flex items-center gap-3 w-full sm:w-auto flex-1">
                    <Button
                        variant="outline"
                        className="gap-2 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 shrink-0"
                        onClick={onFilterClick}
                    >
                        <Filter className="h-4 w-4" />
                        <span className="hidden sm:inline">Filters</span>
                        {activeFiltersCount > 0 && (
                            <Badge variant="secondary" className="ml-1 h-5 px-1.5 bg-slate-100 text-slate-700">
                                {activeFiltersCount}
                            </Badge>
                        )}
                    </Button>
                </div>

                {/* Right: Sort, View Toggle, Add Button */}
                <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-end">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2 border-slate-200 text-slate-700 px-3 sm:px-4">
                                <ArrowUpDown className="h-4 w-4" />
                                <span className="hidden sm:inline">Sort</span>
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
                            <DropdownMenuItem onClick={() => onSortChange({ key: 'expiry', direction: 'asc' })}>
                                Expiry (Earliest)
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onSortChange({ key: 'expiry', direction: 'desc' })}>
                                Expiry (Latest)
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => onSortChange({ key: 'status', direction: 'asc' })}>
                                Status (A-Z)
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                    <div className="hidden sm:block h-8 w-[1px] bg-slate-200 mx-1" />

                    <ToggleGroup
                        type="single"
                        value={viewMode}
                        onValueChange={(val) => val && onViewModeChange(val)}
                        className="hidden sm:flex border border-slate-200 rounded-md p-1 bg-slate-50 gap-1"
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

                    <Button className="ml-2 bg-[#635bff] hover:bg-[#5851ea] text-white gap-2 shadow-sm px-3 sm:px-4">
                        <Plus className="h-4 w-4" />
                        <span className="hidden sm:inline">Add Asset</span>
                        <span className="sm:hidden">Add</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}
